/**
 * OSINT Indicators API
 *
 * Fetch threat indicators from cached database
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { PrismaClient, Prisma } from '@prisma/client';
import { auditLog } from '@/lib/admin/audit-log';

const prisma = new PrismaClient();

/**
 * GET /api/osint/indicators
 * Fetch indicators from database cache
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const feedId = searchParams.get('feedId');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const severity = searchParams.get('severity');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '1000', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Build query filters
    const where: Prisma.OSINTIndicatorWhereInput = {
      // Remove expired indicators
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    };

    if (feedId) {
      where.feedId = feedId;
    }

    if (search) {
      where.value = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (category) {
      where.feed = {
        category: category,
      };
    }

    if (severity) {
      where.severity = severity;
    }

    if (type) {
      where.type = type;
    }

    // Search for specific indicator
    if (search) {
      const indicators = await prisma.oSINTIndicator.findMany({
        where,
        include: {
          feed: {
            select: {
              name: true,
              category: true,
            },
          },
        },
        take: limit,
        orderBy: [
          { confidence: 'desc' },
          { lastSeenAt: 'desc' },
        ],
      });

      auditLog.log({
        userId: session.user.email,
        action: 'osint.indicator_searched',
        severity: 'info',
        success: true,
        metadata: {
          query: search,
          results: indicators.length,
        },
      });

      return NextResponse.json({
        success: true,
        indicators: indicators.map(formatIndicator),
        total: indicators.length,
        query: search,
      });
    }

    // Get total count
    const total = await prisma.oSINTIndicator.count({ where });

    // Fetch indicators with pagination
    const indicators = await prisma.oSINTIndicator.findMany({
      where,
      include: {
        feed: {
          select: {
            name: true,
            category: true,
          },
        },
      },
      take: limit,
      skip: offset,
      orderBy: [
        { severity: 'desc' }, // Critical first
        { confidence: 'desc' },
        { lastSeenAt: 'desc' },
      ],
    });

    // Get summary statistics
    const [bySeverity, byType] = await Promise.all([
      prisma.oSINTIndicator.groupBy({
        where,
        by: ['severity'],
        _count: true,
      }),
      prisma.oSINTIndicator.groupBy({
        where,
        by: ['type'],
        _count: true,
      }),
    ]);

    auditLog.log({
      userId: session.user.email,
      action: feedId ? 'osint.feed_fetched' : 'osint.all_indicators_fetched',
      severity: 'info',
      success: true,
      metadata: {
        feedId,
        total,
        limit,
        offset,
      },
    });

    return NextResponse.json({
      success: true,
      indicators: indicators.map(formatIndicator),
      total,
      limit,
      offset,
      summary: {
        bySeverity: Object.fromEntries(
          bySeverity.map((s) => [s.severity, s._count])
        ),
        byType: Object.fromEntries(
          byType.map((t) => [t.type, t._count])
        ),
      },
    });
  } catch (error) {
    console.error('Failed to fetch OSINT indicators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch indicators' },
      { status: 500 }
    );
  }
}

/**
 * Format indicator for API response
 */
function formatIndicator(ind: any) {
  return {
    id: ind.id,
    type: ind.type,
    value: ind.value,
    severity: ind.severity,
    confidence: ind.confidence,
    description: ind.description,
    tags: ind.tags,
    metadata: ind.metadata,
    source: ind.feed.name,
    category: ind.feed.category,
    firstSeenAt: ind.firstSeenAt,
    lastSeenAt: ind.lastSeenAt,
    expiresAt: ind.expiresAt,
  };
}
