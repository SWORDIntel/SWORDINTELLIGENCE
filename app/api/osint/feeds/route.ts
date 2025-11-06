/**
 * OSINT Feeds API
 *
 * Endpoints for accessing threat intelligence from OSINT feeds
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { osintFeedManager, OSINT_FEEDS } from '@/lib/intelligence/osint-feeds';
import { auditLog } from '@/lib/admin/audit-log';

/**
 * GET /api/osint/feeds
 * List all configured OSINT feeds
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Get statistics
    if (action === 'stats') {
      const stats = osintFeedManager.getStatistics();

      auditLog.log({
        userId: session.user.email,
        action: 'osint.stats_viewed',
        severity: 'info',
        success: true,
        metadata: stats,
      });

      return NextResponse.json({
        success: true,
        stats,
      });
    }

    // List all feeds
    const feeds = OSINT_FEEDS.map((feed) => ({
      id: feed.id,
      name: feed.name,
      category: feed.category,
      enabled: feed.enabled,
      updateInterval: feed.updateInterval,
      description: feed.description,
      requiresApiKey: !!feed.apiKey,
    }));

    return NextResponse.json({
      success: true,
      feeds,
      total: feeds.length,
      enabled: feeds.filter((f) => f.enabled).length,
    });
  } catch (error) {
    console.error('Failed to list OSINT feeds:', error);
    return NextResponse.json({ error: 'Failed to list feeds' }, { status: 500 });
  }
}
