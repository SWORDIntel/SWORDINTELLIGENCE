#!/usr/bin/env tsx

/**
 * OSINT Feed Sync Worker
 *
 * Background worker that continuously syncs OSINT threat intelligence feeds.
 *
 * Usage:
 *   npm run osint:sync        # Run continuous sync service
 *   npm run osint:sync:once   # Run one-time sync
 *
 * Environment Variables:
 *   OSINT_SYNC_INTERVAL - Minutes between sync cycles (default: 60)
 */

import { osintSyncService } from '../lib/intelligence/osint-sync-service';

const SYNC_INTERVAL = parseInt(process.env.OSINT_SYNC_INTERVAL || '60', 10);
const RUN_ONCE = process.argv.includes('--once');

async function main() {
  console.log('');
  console.log('🔍 OSINT Feed Sync Worker');
  console.log('========================');
  console.log('');

  if (RUN_ONCE) {
    console.log('Running one-time sync...');
    await osintSyncService.syncAllFeeds();
    console.log('✅ Sync complete');
    process.exit(0);
  } else {
    console.log(`Mode: Continuous (every ${SYNC_INTERVAL} minutes)`);
    console.log('Press Ctrl+C to stop');
    console.log('');

    await osintSyncService.start(SYNC_INTERVAL);

    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n\n⏹️  Stopping sync service...');
      osintSyncService.stop();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\n\n⏹️  Stopping sync service...');
      osintSyncService.stop();
      process.exit(0);
    });

    // Keep process alive
    process.stdin.resume();
  }
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
