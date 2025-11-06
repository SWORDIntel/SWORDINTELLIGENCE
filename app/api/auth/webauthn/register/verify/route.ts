/**
 * WebAuthn Registration Verification Endpoint
 *
 * Verify and store a newly registered authenticator
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { verifyRegistrationResponseForUser } from '@/lib/auth/webauthn';
import { PrismaClient } from '@prisma/client';
import { auditLog } from '@/lib/admin/audit-log';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { response, authenticatorName } = body;

    const verification = await verifyRegistrationResponseForUser(
      session.user.email,
      response,
      authenticatorName
    );

    if (!verification.verified || !verification.authenticator) {
      auditLog.log({
        userId: session.user.email,
        action: 'webauthn.registration_failed',
        severity: 'warning',
        success: false,
        metadata: {
          error: verification.error,
        },
      });

      return NextResponse.json(
        {
          error: verification.error || 'Registration verification failed',
        },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Store authenticator in database
    const auth = verification.authenticator;
    const storedAuthenticator = await prisma.authenticator.create({
      data: {
        userId: user.id,
        credentialID: auth.credentialID.toString('base64url'),
        credentialPublicKey: auth.credentialPublicKey.toString('base64url'),
        counter: auth.counter,
        credentialDeviceType: auth.credentialDeviceType,
        credentialBackedUp: auth.credentialBackedUp,
        transports: auth.transports || [],
        authenticatorType: auth.type,
        name: auth.name,
        aaguid: auth.aaguid,
      },
    });

    auditLog.log({
      userId: session.user.email,
      action: 'webauthn.authenticator_registered',
      severity: 'info',
      success: true,
      metadata: {
        authenticatorId: storedAuthenticator.id,
        authenticatorType: auth.type,
        authenticatorName: auth.name,
      },
    });

    return NextResponse.json({
      success: true,
      authenticator: {
        id: storedAuthenticator.id,
        type: storedAuthenticator.authenticatorType,
        name: storedAuthenticator.name,
        registeredAt: storedAuthenticator.registeredAt,
      },
    });
  } catch (error: any) {
    console.error('Failed to verify WebAuthn registration:', error);
    return NextResponse.json(
      { error: 'Failed to verify registration' },
      { status: 500 }
    );
  }
}
