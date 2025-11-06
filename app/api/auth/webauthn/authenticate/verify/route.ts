/**
 * WebAuthn Authentication Verification Endpoint
 *
 * Verify authentication with registered authenticator
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthenticationResponseForUser } from '@/lib/auth/webauthn';
import { auditLog } from '@/lib/admin/audit-log';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, response } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const verification = await verifyAuthenticationResponseForUser(
      userId,
      response
    );

    if (!verification.verified) {
      auditLog.log({
        userId,
        action: 'webauthn.authentication_failed',
        severity: 'warning',
        success: false,
        metadata: {
          error: verification.error,
        },
      });

      return NextResponse.json(
        {
          error: verification.error || 'Authentication verification failed',
        },
        { status: 400 }
      );
    }

    auditLog.log({
      userId,
      action: 'webauthn.authentication_success',
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
        lastUsedAt: verification.authenticator?.lastUsedAt,
      },
    });
  } catch (error: any) {
    console.error('Failed to verify WebAuthn authentication:', error);
    return NextResponse.json(
      { error: 'Failed to verify authentication' },
      { status: 500 }
    );
  }
}
