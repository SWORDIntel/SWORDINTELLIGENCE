import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// In production, this would connect to your database
// For now, this is a mock user store
interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'client' | 'admin';
  mfaEnabled: boolean;
  mfaSecret?: string;
}

// Mock user database (replace with real database in production)
const users: User[] = [
  {
    id: '1',
    email: 'demo@client.com',
    name: 'Demo Client',
    password: '$2a$10$Xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // hashed 'demo123'
    role: 'client',
    mfaEnabled: false,
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        mfaCode: { label: 'MFA Code', type: 'text', optional: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        // Find user in database
        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          throw new Error('Invalid credentials');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error('Invalid credentials');
        }

        // Check MFA if enabled
        if (user.mfaEnabled) {
          if (!credentials.mfaCode) {
            throw new Error('MFA code required');
          }

          // In production, verify MFA code with speakeasy
          // const verified = speakeasy.totp.verify({
          //   secret: user.mfaSecret,
          //   encoding: 'base32',
          //   token: credentials.mfaCode,
          // });

          // if (!verified) {
          //   throw new Error('Invalid MFA code');
          // }
        }

        // Return user object (will be encoded in JWT)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes
  },
  pages: {
    signIn: '/portal/login',
    error: '/portal/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
};
