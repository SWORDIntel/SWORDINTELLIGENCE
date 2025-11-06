/**
 * WebAuthn Authenticators Management API
 *
 * List and manage registered authenticators
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { listUserAuthenticators, deleteAuthenticator } from '@/lib/auth/webauthn-db';
import { auditLog } from '@/lib/admin/audit-log';

/**
 * GET /api/auth/webauthn/authenticators
 * List all authenticators for current user
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authenticators = await listUserAuthenticators(session.user.email);

    return NextResponse.json({
      success: true,
      authenticators,
    });
  } catch (error) {
    console.error('Failed to list authenticators:', error);
    return NextResponse.json(
      { error: 'Failed to list authenticators' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/webauthn/authenticators
 * Delete an authenticator
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const authenticatorId = searchParams.get('id');

    if (!authenticatorId) {
      return NextResponse.json(
        { error: 'Authenticator ID required' },
        { status: 400 }
      );
    }

    await deleteAuthenticator(authenticatorId);

    auditLog.log({
      userId: session.user.email,
      action: 'webauthn.authenticator_deleted',
      severity: 'info',
      success: true,
      metadata: {
        authenticatorId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Authenticator deleted successfully',
    });
  } catch (error) {
    console.error('Failed to delete authenticator:', error);
    return NextResponse.json(
      { error: 'Failed to delete authenticator' },
      { status: 500 }
    );
  }
}
