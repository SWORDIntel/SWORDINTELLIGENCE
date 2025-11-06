/**
 * OSINT Indicators API
 *
 * Fetch threat indicators from OSINT feeds
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { osintFeedManager } from '@/lib/intelligence/osint-feeds';
import { auditLog } from '@/lib/admin/audit-log';

/**
 * GET /api/osint/indicators
 * Fetch indicators from OSINT feeds
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

    // Search for specific indicator
    if (search) {
      const indicators = await osintFeedManager.searchIndicator(search);

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
        indicators,
        total: indicators.length,
        query: search,
      });
    }

    // Fetch specific feed
    if (feedId) {
      const indicators = await osintFeedManager.fetchFeed(feedId);

      // Apply filters
      let filtered = indicators;

      if (category) {
        filtered = filtered.filter((ind) => ind.tags.includes(category));
      }

      if (severity) {
        filtered = filtered.filter((ind) => ind.severity === severity);
      }

      auditLog.log({
        userId: session.user.email,
        action: 'osint.feed_fetched',
        severity: 'info',
        success: true,
        metadata: {
          feedId,
          indicators: filtered.length,
        },
      });

      return NextResponse.json({
        success: true,
        feedId,
        indicators: filtered,
        total: filtered.length,
      });
    }

    // Fetch all feeds
    const allIndicators = await osintFeedManager.getAllIndicators();

    // Apply filters
    let filtered = allIndicators;

    if (category) {
      filtered = filtered.filter((ind) => ind.tags.includes(category));
    }

    if (severity) {
      filtered = filtered.filter((ind) => ind.severity === severity);
    }

    // Group by severity for summary
    const bySeverity = {
      critical: filtered.filter((i) => i.severity === 'critical').length,
      high: filtered.filter((i) => i.severity === 'high').length,
      medium: filtered.filter((i) => i.severity === 'medium').length,
      low: filtered.filter((i) => i.severity === 'low').length,
      info: filtered.filter((i) => i.severity === 'info').length,
    };

    auditLog.log({
      userId: session.user.email,
      action: 'osint.all_indicators_fetched',
      severity: 'info',
      success: true,
      metadata: {
        total: filtered.length,
        bySeverity,
      },
    });

    return NextResponse.json({
      success: true,
      indicators: filtered.slice(0, 1000), // Limit to 1000 for performance
      total: filtered.length,
      summary: {
        bySeverity,
        byType: this.groupByType(filtered),
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

function groupByType(indicators: any[]): Record<string, number> {
  const byType: Record<string, number> = {};
  indicators.forEach((ind) => {
    byType[ind.type] = (byType[ind.type] || 0) + 1;
  });
  return byType;
}
