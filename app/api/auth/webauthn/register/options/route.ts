/**
 * WebAuthn Registration Options Endpoint
 *
 * Generate options for registering a new authenticator
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { generateRegistrationOptionsForUser } from '@/lib/auth/webauthn';
import { auditLog } from '@/lib/admin/audit-log';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { authenticatorType } = body;

    const options = await generateRegistrationOptionsForUser(
      session.user.email,
      session.user.name || session.user.email,
      authenticatorType
    );

    auditLog.log({
      userId: session.user.email,
      action: 'webauthn.registration_options_generated',
      severity: 'info',
      success: true,
      metadata: {
        authenticatorType: authenticatorType || 'any',
      },
    });

    return NextResponse.json({
      success: true,
      options,
    });
  } catch (error: any) {
    console.error('Failed to generate WebAuthn registration options:', error);
    return NextResponse.json(
      { error: 'Failed to generate registration options' },
      { status: 500 }
    );
  }
}
