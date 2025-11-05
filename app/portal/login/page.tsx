'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [showMfa, setShowMfa] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        mfaCode: showMfa ? mfaCode : undefined,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === 'MFA code required') {
          setShowMfa(true);
          setError('Please enter your MFA code');
        } else {
          setError(result.error);
        }
      } else if (result?.ok) {
        router.push('/portal/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 mb-4">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Client Portal</h1>
          <p className="text-muted">Secure access to your intelligence operations</p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-lg border border-border bg-surface">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* MFA Code (conditional) */}
            {showMfa && (
              <div>
                <label htmlFor="mfaCode" className="block text-sm font-medium mb-2">
                  MFA Code
                </label>
                <input
                  id="mfaCode"
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  required
                  disabled={loading}
                  maxLength={6}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 text-center font-mono text-2xl tracking-widest"
                  placeholder="000000"
                />
                <p className="text-xs text-muted mt-2 text-center">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? 'Authenticating...' : showMfa ? 'Verify & Sign In' : 'Sign In'}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 pt-6 border-t border-border text-center space-y-2">
            <p className="text-sm text-muted">
              Need access?{' '}
              <a href="/contact" className="text-accent hover:underline">
                Request an account
              </a>
            </p>
            <p className="text-xs text-muted">
              This portal uses post-quantum encryption (Dilithium + Kyber)
            </p>
          </div>
        </div>

        {/* Demo Credentials (remove in production!) */}
        <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/30">
          <p className="text-xs text-accent font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-muted">
            Email: demo@client.com<br />
            Password: demo123
          </p>
          <p className="text-xs text-muted mt-2">
            (Remove this in production!)
          </p>
        </div>
      </div>
    </div>
  );
}
