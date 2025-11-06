/**
 * OSINT Sync API
 *
 * Endpoints for managing OSINT feed synchronization
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { osintSyncService } from '@/lib/intelligence/osint-sync-service';
import { auditLog } from '@/lib/admin/audit-log';

/**
 * GET /api/osint/sync
 * Get sync statistics and status
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await osintSyncService.getStatistics();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Failed to get sync statistics:', error);
    return NextResponse.json(
      { error: 'Failed to get sync statistics' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/osint/sync
 * Trigger manual sync
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admins can trigger manual sync
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !['admin', 'superadmin'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { feedId, action } = body;

    auditLog.log({
      userId: session.user.email,
      action: 'osint.manual_sync_triggered',
      severity: 'info',
      success: true,
      metadata: { feedId, action },
    });

    if (action === 'cleanup') {
      // Clean up expired indicators
      const deletedCount = await osintSyncService.cleanupExpired();

      return NextResponse.json({
        success: true,
        message: `Cleaned up ${deletedCount} expired indicators`,
        deletedCount,
      });
    }

    if (feedId) {
      // Sync specific feed
      await osintSyncService.syncFeed(feedId);

      return NextResponse.json({
        success: true,
        message: `Feed ${feedId} synced successfully`,
      });
    } else {
      // Sync all feeds
      await osintSyncService.syncAllFeeds();

      return NextResponse.json({
        success: true,
        message: 'All feeds synced successfully',
      });
    }
  } catch (error) {
    console.error('Failed to trigger sync:', error);
    return NextResponse.json(
      { error: 'Failed to trigger sync' },
      { status: 500 }
    );
  }
}
