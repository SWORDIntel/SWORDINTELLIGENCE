/**
 * WebAuthn Registration Verification Endpoint
 *
 * Verify and store a newly registered authenticator
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { verifyRegistrationResponseForUser } from '@/lib/auth/webauthn';
import { auditLog } from '@/lib/admin/audit-log';

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

    if (!verification.verified) {
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

    auditLog.log({
      userId: session.user.email,
      action: 'webauthn.authenticator_registered',
      severity: 'info',
      success: true,
      metadata: {
        authenticatorType: verification.authenticator?.type,
        authenticatorName: verification.authenticator?.name,
      },
    });

    return NextResponse.json({
      success: true,
      authenticator: {
        type: verification.authenticator?.type,
        name: verification.authenticator?.name,
        registeredAt: verification.authenticator?.registeredAt,
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
