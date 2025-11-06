/**
 * OSINT Feeds API
 *
 * Endpoints for accessing threat intelligence from OSINT feeds
 * Now reads from cached database instead of external APIs
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { PrismaClient } from '@prisma/client';
import { auditLog } from '@/lib/admin/audit-log';

const prisma = new PrismaClient();

/**
 * GET /api/osint/feeds
 * List all configured OSINT feeds with their status
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Get statistics from database
    if (action === 'stats') {
      const [totalFeeds, enabledFeeds, totalIndicators, bySeverity, byCategory] =
        await Promise.all([
          prisma.oSINTFeed.count(),
          prisma.oSINTFeed.count({ where: { enabled: true } }),
          prisma.oSINTIndicator.count(),
          prisma.oSINTIndicator.groupBy({
            by: ['severity'],
            _count: true,
          }),
          prisma.oSINTFeed.groupBy({
            by: ['category'],
            _count: true,
          }),
        ]);

      const stats = {
        totalFeeds,
        enabledFeeds,
        totalIndicators,
        bySeverity: Object.fromEntries(
          bySeverity.map((s) => [s.severity, s._count])
        ),
        byCategory: Object.fromEntries(
          byCategory.map((c) => [c.category, c._count])
        ),
      };

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

    // List all feeds from database with their metadata
    const feeds = await prisma.oSINTFeed.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        enabled: true,
        lastFetchedAt: true,
        lastSuccessAt: true,
        lastErrorAt: true,
        lastErrorMessage: true,
        fetchCount: true,
        indicatorCount: true,
        updatedAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

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
