/**
 * WebAuthn Database Operations
 *
 * Handles storing and retrieving authenticators from the database
 */

import { PrismaClient } from '@prisma/client';
import type { StoredAuthenticator } from './webauthn';

const prisma = new PrismaClient();

/**
 * Get all authenticators for a user
 */
export async function getUserAuthenticators(
  userEmail: string
): Promise<StoredAuthenticator[]> {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      authenticators: true,
    },
  });

  if (!user) {
    return [];
  }

  return user.authenticators.map((auth) => ({
    credentialID: Buffer.from(auth.credentialID, 'base64url'),
    credentialPublicKey: Buffer.from(auth.credentialPublicKey, 'base64url'),
    counter: auth.counter,
    transports: auth.transports as AuthenticatorTransport[],
    type: auth.authenticatorType as any,
    name: auth.name || 'Unnamed Authenticator',
    registeredAt: auth.registeredAt,
    lastUsedAt: auth.lastUsedAt || undefined,
    aaguid: auth.aaguid || undefined,
    credentialDeviceType: auth.credentialDeviceType || undefined,
    credentialBackedUp: auth.credentialBackedUp,
  }));
}

/**
 * Get authenticator by credential ID
 */
export async function getAuthenticatorByCredentialID(
  credentialID: Uint8Array
): Promise<(StoredAuthenticator & { userId: string }) | null> {
  const credentialIDBase64 = Buffer.from(credentialID).toString('base64url');

  const auth = await prisma.authenticator.findUnique({
    where: { credentialID: credentialIDBase64 },
  });

  if (!auth) {
    return null;
  }

  return {
    credentialID: Buffer.from(auth.credentialID, 'base64url'),
    credentialPublicKey: Buffer.from(auth.credentialPublicKey, 'base64url'),
    counter: auth.counter,
    transports: auth.transports as AuthenticatorTransport[],
    type: auth.authenticatorType as any,
    name: auth.name || 'Unnamed Authenticator',
    registeredAt: auth.registeredAt,
    lastUsedAt: auth.lastUsedAt || undefined,
    aaguid: auth.aaguid || undefined,
    credentialDeviceType: auth.credentialDeviceType || undefined,
    credentialBackedUp: auth.credentialBackedUp,
    userId: auth.userId,
  };
}

/**
 * Update authenticator counter (after successful authentication)
 */
export async function updateAuthenticatorCounter(
  credentialID: Uint8Array,
  newCounter: number
): Promise<void> {
  const credentialIDBase64 = Buffer.from(credentialID).toString('base64url');

  await prisma.authenticator.update({
    where: { credentialID: credentialIDBase64 },
    data: {
      counter: newCounter,
      lastUsedAt: new Date(),
    },
  });
}

/**
 * Delete an authenticator
 */
export async function deleteAuthenticator(authenticatorId: string): Promise<void> {
  await prisma.authenticator.delete({
    where: { id: authenticatorId },
  });
}

/**
 * List all authenticators for a user (for management UI)
 */
export async function listUserAuthenticators(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: {
      authenticators: {
        orderBy: {
          lastUsedAt: 'desc',
        },
      },
    },
  });

  if (!user) {
    return [];
  }

  return user.authenticators.map((auth) => ({
    id: auth.id,
    type: auth.authenticatorType,
    name: auth.name,
    registeredAt: auth.registeredAt,
    lastUsedAt: auth.lastUsedAt,
    transports: auth.transports,
  }));
}
