/**
 * WebAuthn Manager Component
 *
 * UI for managing hardware authenticators:
 * - YubiKey
 * - CAC (Common Access Card)
 * - Fingerprint readers
 * - Platform authenticators (Touch ID, Face ID, Windows Hello)
 */

'use client';

import { useState, useEffect } from 'react';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';
import type {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/types';
import { Shield, Key, Fingerprint, CreditCard, Smartphone, Trash2, CheckCircle } from 'lucide-react';

interface Authenticator {
  type: 'yubikey' | 'cac' | 'platform' | 'fingerprint' | 'generic';
  name: string;
  registeredAt: string;
  lastUsedAt?: string;
}

export default function WebAuthnManager() {
  const [authenticators, setAuthenticators] = useState<Authenticator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load user's authenticators
  useEffect(() => {
    loadAuthenticators();
  }, []);

  const loadAuthenticators = async () => {
    // TODO: Fetch from API
    // For now, mock data
    setAuthenticators([]);
  };

  /**
   * Register new authenticator
   */
  const registerAuthenticator = async (type?: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Get registration options from server
      const optionsResponse = await fetch('/api/auth/webauthn/register/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authenticatorType: type }),
      });

      if (!optionsResponse.ok) {
        throw new Error('Failed to get registration options');
      }

      const { options } = await optionsResponse.json();

      // Start WebAuthn registration ceremony
      const attestationResponse = await startRegistration(options);

      // Verify registration with server
      const verificationResponse = await fetch('/api/auth/webauthn/register/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: attestationResponse,
          authenticatorName: `${type || 'Authenticator'} (${new Date().toLocaleDateString()})`,
        }),
      });

      if (!verificationResponse.ok) {
        const errorData = await verificationResponse.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const { authenticator } = await verificationResponse.json();

      setSuccess(`Successfully registered ${authenticator.type}!`);
      await loadAuthenticators();
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Test authentication with existing authenticator
   */
  const testAuthentication = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Get authentication options from server
      const optionsResponse = await fetch('/api/auth/webauthn/authenticate/options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'current-user' }),
      });

      if (!optionsResponse.ok) {
        throw new Error('Failed to get authentication options');
      }

      const { options } = await optionsResponse.json();

      // Start WebAuthn authentication ceremony
      const assertionResponse = await startAuthentication(options);

      // Verify authentication with server
      const verificationResponse = await fetch('/api/auth/webauthn/authenticate/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'current-user',
          response: assertionResponse,
        }),
      });

      if (!verificationResponse.ok) {
        const errorData = await verificationResponse.json();
        throw new Error(errorData.error || 'Authentication failed');
      }

      const { authenticator } = await verificationResponse.json();

      setSuccess(`Successfully authenticated with ${authenticator.type}!`);
      await loadAuthenticators();
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get icon for authenticator type
   */
  const getAuthenticatorIcon = (type: string) => {
    switch (type) {
      case 'yubikey':
        return <Key className="w-5 h-5 text-blue-500" />;
      case 'cac':
        return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'platform':
        return <Smartphone className="w-5 h-5 text-purple-500" />;
      case 'fingerprint':
        return <Fingerprint className="w-5 h-5 text-orange-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  /**
   * Get label for authenticator type
   */
  const getAuthenticatorLabel = (type: string) => {
    switch (type) {
      case 'yubikey':
        return 'YubiKey';
      case 'cac':
        return 'CAC/PIV Card';
      case 'platform':
        return 'Platform Authenticator';
      case 'fingerprint':
        return 'Fingerprint Reader';
      default:
        return 'Generic Authenticator';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Hardware Authenticators</h2>
        <p className="text-gray-400">
          Manage YubiKeys, CAC cards, fingerprint readers, and platform authenticators
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-green-500">{success}</p>
        </div>
      )}

      {/* Registration Options */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Register New Authenticator</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* YubiKey */}
          <button
            onClick={() => registerAuthenticator('yubikey')}
            disabled={loading}
            className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg p-4 flex items-center gap-3 transition-colors disabled:opacity-50"
          >
            <Key className="w-6 h-6 text-blue-500" />
            <div className="text-left">
              <div className="font-semibold text-white">YubiKey</div>
              <div className="text-sm text-gray-400">USB, NFC, Lightning</div>
            </div>
          </button>

          {/* CAC/PIV */}
          <button
            onClick={() => registerAuthenticator('cac')}
            disabled={loading}
            className="bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg p-4 flex items-center gap-3 transition-colors disabled:opacity-50"
          >
            <CreditCard className="w-6 h-6 text-green-500" />
            <div className="text-left">
              <div className="font-semibold text-white">CAC/PIV Card</div>
              <div className="text-sm text-gray-400">Smart card reader</div>
            </div>
          </button>

          {/* Platform Authenticator */}
          <button
            onClick={() => registerAuthenticator('platform')}
            disabled={loading}
            className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg p-4 flex items-center gap-3 transition-colors disabled:opacity-50"
          >
            <Smartphone className="w-6 h-6 text-purple-500" />
            <div className="text-left">
              <div className="font-semibold text-white">Platform Authenticator</div>
              <div className="text-sm text-gray-400">Touch ID, Face ID, Windows Hello</div>
            </div>
          </button>

          {/* Fingerprint Reader */}
          <button
            onClick={() => registerAuthenticator('fingerprint')}
            disabled={loading}
            className="bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-lg p-4 flex items-center gap-3 transition-colors disabled:opacity-50"
          >
            <Fingerprint className="w-6 h-6 text-orange-500" />
            <div className="text-left">
              <div className="font-semibold text-white">Fingerprint Reader</div>
              <div className="text-sm text-gray-400">USB biometric scanner</div>
            </div>
          </button>
        </div>
      </div>

      {/* Registered Authenticators */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Registered Authenticators</h3>

        {authenticators.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No authenticators registered</p>
            <p className="text-sm">Register a hardware authenticator above for enhanced security</p>
          </div>
        ) : (
          <div className="space-y-3">
            {authenticators.map((auth, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {getAuthenticatorIcon(auth.type)}
                  <div>
                    <div className="font-semibold text-white">{auth.name}</div>
                    <div className="text-sm text-gray-400">
                      Registered: {new Date(auth.registeredAt).toLocaleDateString()}
                      {auth.lastUsedAt && (
                        <span className="ml-3">
                          Last used: {new Date(auth.lastUsedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                  title="Remove authenticator"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Test Authentication */}
      {authenticators.length > 0 && (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Test Authentication</h3>
          <button
            onClick={testAuthentication}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Hardware Authenticator'}
          </button>
          <p className="text-sm text-gray-400 mt-2">
            Verify your authenticator is working correctly
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <h4 className="font-semibold text-blue-400 mb-2">Security Information</h4>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Hardware authenticators provide phishing-resistant authentication</li>
          <li>• YubiKeys support FIDO2/WebAuthn, U2F, OTP, and PIV protocols</li>
          <li>• CAC cards require a compatible smart card reader</li>
          <li>• Platform authenticators use device biometrics (Touch ID, Face ID)</li>
          <li>• All authenticators use public-key cryptography (no shared secrets)</li>
        </ul>
      </div>
    </div>
  );
}
