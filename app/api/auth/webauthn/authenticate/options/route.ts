/**
 * WebAuthn Authentication Options Endpoint
 *
 * Generate options for authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateAuthenticationOptionsForUser } from '@/lib/auth/webauthn';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    const options = await generateAuthenticationOptionsForUser(userId);

    return NextResponse.json({
      success: true,
      options,
    });
  } catch (error: any) {
    console.error('Failed to generate WebAuthn authentication options:', error);
    return NextResponse.json(
      { error: 'Failed to generate authentication options' },
      { status: 500 }
    );
  }
}
