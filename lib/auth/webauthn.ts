/**
 * WebAuthn / FIDO2 Authentication
 *
 * Supports:
 * - YubiKey (USB, NFC, Lightning)
 * - CAC (Common Access Card) via smart card readers
 * - Platform authenticators (Touch ID, Face ID, Windows Hello)
 * - Fingerprint readers (USB, built-in)
 *
 * Uses @simplewebauthn for FIDO2/WebAuthn protocol
 */

import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import type {
  GenerateRegistrationOptionsOpts,
  GenerateAuthenticationOptionsOpts,
  VerifyRegistrationResponseOpts,
  VerifyAuthenticationResponseOpts,
  VerifiedRegistrationResponse,
  VerifiedAuthenticationResponse,
} from '@simplewebauthn/server';
import type {
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
  AuthenticatorDevice,
} from '@simplewebauthn/types';

/**
 * Configuration
 */
const RP_NAME = process.env.WEBAUTHN_RP_NAME || 'SWORD Intelligence';
const RP_ID = process.env.WEBAUTHN_RP_ID || 'localhost';
const ORIGIN = process.env.WEBAUTHN_ORIGIN || 'http://localhost:3000';

/**
 * Authenticator types
 */
export type AuthenticatorType =
  | 'yubikey'           // YubiKey hardware tokens
  | 'cac'               // Common Access Card (PIV/CAC)
  | 'platform'          // Touch ID, Face ID, Windows Hello
  | 'fingerprint'       // USB fingerprint readers
  | 'generic';          // Other FIDO2 authenticators

/**
 * Stored authenticator device
 */
export interface StoredAuthenticator {
  credentialID: Uint8Array;
  credentialPublicKey: Uint8Array;
  counter: number;
  transports?: AuthenticatorTransport[];
  type: AuthenticatorType;
  name: string;
  registeredAt: Date;
  lastUsedAt?: Date;
  aaguid?: string; // Authenticator Attestation GUID
}

/**
 * User authenticators storage (in-memory, replace with database)
 */
const userAuthenticators = new Map<string, StoredAuthenticator[]>();
const currentChallenges = new Map<string, string>();

/**
 * Detect authenticator type from AAGUID and attestation
 */
export function detectAuthenticatorType(
  aaguid: string | undefined,
  transports: AuthenticatorTransport[] | undefined
): AuthenticatorType {
  // YubiKey AAGUIDs (well-known)
  const yubikeyAAGUIDs = [
    'f8a011f3-8c0a-4d15-8006-17111f9edc7d', // YubiKey 5 Series
    '2fc0579f-8113-47ea-b116-bb5a8db9202a', // YubiKey 5 NFC
    '6d44ba9b-f6ec-2e49-b930-0c8fe920cb73', // YubiKey 5Ci
    'ee882879-721c-4913-9775-3dfcce97072a', // YubiKey 5 Bio
  ];

  // PIV/CAC smart card AAGUIDs
  const cacAAGUIDs = [
    '00000000-0000-0000-0000-000000000000', // Generic PIV
  ];

  if (aaguid && yubikeyAAGUIDs.includes(aaguid)) {
    return 'yubikey';
  }

  if (aaguid && cacAAGUIDs.includes(aaguid)) {
    return 'cac';
  }

  // Platform authenticators
  if (transports?.includes('internal')) {
    return 'platform';
  }

  // USB devices could be fingerprint readers
  if (transports?.includes('usb') && transports.length === 1) {
    return 'fingerprint';
  }

  return 'generic';
}

/**
 * Generate registration options for new authenticator
 */
export async function generateRegistrationOptionsForUser(
  userId: string,
  userName: string,
  authenticatorType?: AuthenticatorType
): Promise<any> {
  // Get user's existing authenticators
  const existingAuthenticators = userAuthenticators.get(userId) || [];

  // Exclude existing credentials to prevent re-registration
  const excludeCredentials = existingAuthenticators.map((auth) => ({
    id: auth.credentialID,
    type: 'public-key' as const,
    transports: auth.transports,
  }));

  // Authenticator selection criteria
  let authenticatorSelection: any = {
    residentKey: 'preferred', // Allow resident keys (passwordless)
    userVerification: 'preferred', // Prefer biometric/PIN
  };

  // Specific settings for authenticator types
  if (authenticatorType === 'platform') {
    authenticatorSelection = {
      authenticatorAttachment: 'platform', // Force platform authenticators
      residentKey: 'required',
      userVerification: 'required',
    };
  } else if (authenticatorType === 'yubikey' || authenticatorType === 'cac') {
    authenticatorSelection = {
      authenticatorAttachment: 'cross-platform', // Force external devices
      residentKey: 'preferred',
      userVerification: 'preferred',
    };
  }

  const options = await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID: RP_ID,
    userID: userId,
    userName: userName,
    timeout: 60000, // 1 minute
    attestationType: 'direct', // Get authenticator details
    excludeCredentials,
    authenticatorSelection,
    // Request attestation for enterprise use cases
    extensions: {
      credProps: true,
    },
  });

  // Store challenge for verification
  currentChallenges.set(userId, options.challenge);

  return options;
}

/**
 * Verify registration response
 */
export async function verifyRegistrationResponseForUser(
  userId: string,
  response: RegistrationResponseJSON,
  authenticatorName?: string
): Promise<{
  verified: boolean;
  authenticator?: StoredAuthenticator;
  error?: string;
}> {
  const expectedChallenge = currentChallenges.get(userId);

  if (!expectedChallenge) {
    return {
      verified: false,
      error: 'Challenge not found or expired',
    };
  }

  try {
    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge,
      expectedOrigin: ORIGIN,
      expectedRPID: RP_ID,
      requireUserVerification: false, // Allow security keys without PIN
    });

    if (!verification.verified || !verification.registrationInfo) {
      return {
        verified: false,
        error: 'Verification failed',
      };
    }

    const { registrationInfo } = verification;
    const {
      credentialPublicKey,
      credentialID,
      counter,
      aaguid,
      credentialDeviceType,
      credentialBackedUp,
    } = registrationInfo;

    // Detect authenticator type
    const type = detectAuthenticatorType(
      aaguid,
      response.response.transports as AuthenticatorTransport[]
    );

    // Store authenticator
    const authenticator: StoredAuthenticator = {
      credentialID,
      credentialPublicKey,
      counter,
      transports: response.response.transports as AuthenticatorTransport[],
      type,
      name: authenticatorName || `${type} (${new Date().toLocaleDateString()})`,
      registeredAt: new Date(),
      aaguid,
    };

    const existingAuthenticators = userAuthenticators.get(userId) || [];
    existingAuthenticators.push(authenticator);
    userAuthenticators.set(userId, existingAuthenticators);

    // Clear challenge
    currentChallenges.delete(userId);

    console.log(
      `[WebAuthn] Registered ${type} authenticator for user ${userId}`
    );

    return {
      verified: true,
      authenticator,
    };
  } catch (error: any) {
    console.error('[WebAuthn] Registration verification failed:', error);
    return {
      verified: false,
      error: error.message || 'Verification failed',
    };
  }
}

/**
 * Generate authentication options
 */
export async function generateAuthenticationOptionsForUser(
  userId?: string
): Promise<any> {
  let allowCredentials: any[] | undefined;

  // If userId provided, only allow their registered authenticators
  if (userId) {
    const authenticators = userAuthenticators.get(userId) || [];
    allowCredentials = authenticators.map((auth) => ({
      id: auth.credentialID,
      type: 'public-key' as const,
      transports: auth.transports,
    }));
  }

  const options = await generateAuthenticationOptions({
    rpID: RP_ID,
    timeout: 60000,
    allowCredentials,
    userVerification: 'preferred',
  });

  // Store challenge
  const challengeKey = userId || 'anonymous';
  currentChallenges.set(challengeKey, options.challenge);

  return options;
}

/**
 * Verify authentication response
 */
export async function verifyAuthenticationResponseForUser(
  userId: string,
  response: AuthenticationResponseJSON
): Promise<{
  verified: boolean;
  authenticator?: StoredAuthenticator;
  error?: string;
}> {
  const expectedChallenge = currentChallenges.get(userId);

  if (!expectedChallenge) {
    return {
      verified: false,
      error: 'Challenge not found or expired',
    };
  }

  // Find authenticator by credential ID
  const authenticators = userAuthenticators.get(userId) || [];
  const authenticator = authenticators.find((auth) => {
    const credID = Buffer.from(auth.credentialID).toString('base64url');
    return credID === response.id;
  });

  if (!authenticator) {
    return {
      verified: false,
      error: 'Authenticator not found',
    };
  }

  try {
    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge,
      expectedOrigin: ORIGIN,
      expectedRPID: RP_ID,
      authenticator: {
        credentialPublicKey: authenticator.credentialPublicKey,
        credentialID: authenticator.credentialID,
        counter: authenticator.counter,
        transports: authenticator.transports,
      },
      requireUserVerification: false,
    });

    if (!verification.verified) {
      return {
        verified: false,
        error: 'Verification failed',
      };
    }

    // Update counter and last used
    authenticator.counter = verification.authenticationInfo.newCounter;
    authenticator.lastUsedAt = new Date();

    // Clear challenge
    currentChallenges.delete(userId);

    console.log(
      `[WebAuthn] Authenticated with ${authenticator.type} for user ${userId}`
    );

    return {
      verified: true,
      authenticator,
    };
  } catch (error: any) {
    console.error('[WebAuthn] Authentication verification failed:', error);
    return {
      verified: false,
      error: error.message || 'Verification failed',
    };
  }
}

/**
 * Get user's registered authenticators
 */
export function getUserAuthenticators(userId: string): StoredAuthenticator[] {
  return userAuthenticators.get(userId) || [];
}

/**
 * Remove authenticator
 */
export function removeAuthenticator(
  userId: string,
  credentialID: Uint8Array
): boolean {
  const authenticators = userAuthenticators.get(userId) || [];
  const filtered = authenticators.filter(
    (auth) =>
      Buffer.from(auth.credentialID).toString('base64') !==
      Buffer.from(credentialID).toString('base64')
  );

  if (filtered.length < authenticators.length) {
    userAuthenticators.set(userId, filtered);
    return true;
  }

  return false;
}

/**
 * CAC-specific utilities
 */
export namespace CAC {
  /**
   * Validate CAC certificate (PIV authentication)
   */
  export function validateCACCertificate(
    attestation: any
  ): {
    valid: boolean;
    subject?: string;
    issuer?: string;
    error?: string;
  } {
    try {
      // In production, verify:
      // - Certificate chain to DoD root CA
      // - Certificate not revoked (CRL/OCSP)
      // - Certificate within validity period
      // - Certificate purpose includes authentication

      // For now, basic validation
      if (!attestation) {
        return { valid: false, error: 'No attestation provided' };
      }

      // TODO: Implement full PIV certificate validation
      return {
        valid: true,
        subject: 'CAC Subject',
        issuer: 'DoD CA',
      };
    } catch (error: any) {
      return {
        valid: false,
        error: error.message,
      };
    }
  }
}
