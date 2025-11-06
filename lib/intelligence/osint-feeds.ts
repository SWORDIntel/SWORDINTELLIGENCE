/**
 * OSINT Feed Integration System
 *
 * Integrates multiple free and open-source threat intelligence feeds:
 * - Abuse.ch (URLhaus, MalwareBazaar, ThreatFox)
 * - CIRCL (MISP feeds)
 * - AlienVault OTX
 * - OpenPhish
 * - TRM Labs (crypto sanctions)
 * - Dark web monitoring
 * - APT tracking
 */

/**
 * OSINT Feed Source Configuration
 */
export interface OSINTFeedSource {
  id: string;
  name: string;
  category: 'malware' | 'phishing' | 'crypto' | 'apt' | 'darkweb' | 'narcotics' | 'infrastructure';
  url: string;
  format: 'json' | 'csv' | 'txt' | 'xml';
  apiKey?: string;
  rateLimit?: number; // requests per hour
  updateInterval: number; // minutes
  enabled: boolean;
  description: string;
}

/**
 * Threat Indicator from OSINT feed
 */
export interface ThreatIndicator {
  id: string;
  source: string;
  type: 'ip' | 'domain' | 'url' | 'hash' | 'email' | 'wallet' | 'onion' | 'cve';
  value: string;
  confidence: number; // 0-100
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  tags: string[];
  firstSeen: Date;
  lastSeen: Date;
  description?: string;
  metadata?: Record<string, any>;
}

/**
 * Pre-configured OSINT feed sources (all free/public)
 */
export const OSINT_FEEDS: OSINTFeedSource[] = [
  // === MALWARE & BOTNET FEEDS ===
  {
    id: 'abuse-urlhaus',
    name: 'Abuse.ch URLhaus',
    category: 'malware',
    url: 'https://urlhaus-api.abuse.ch/v1/urls/recent/',
    format: 'json',
    updateInterval: 60,
    enabled: true,
    description: 'Malware distribution URLs, C2 infrastructure',
  },
  {
    id: 'abuse-malwarebazaar',
    name: 'Abuse.ch MalwareBazaar',
    category: 'malware',
    url: 'https://mb-api.abuse.ch/api/v1/',
    format: 'json',
    updateInterval: 120,
    enabled: true,
    description: 'Malware samples and hashes (MD5, SHA256)',
  },
  {
    id: 'abuse-threatfox',
    name: 'Abuse.ch ThreatFox',
    category: 'malware',
    url: 'https://threatfox-api.abuse.ch/api/v1/',
    format: 'json',
    updateInterval: 60,
    enabled: true,
    description: 'IOCs from ThreatFox database',
  },
  {
    id: 'abuse-sslbl',
    name: 'Abuse.ch SSL Blacklist',
    category: 'infrastructure',
    url: 'https://sslbl.abuse.ch/blacklist/sslblacklist.csv',
    format: 'csv',
    updateInterval: 180,
    enabled: true,
    description: 'Malicious SSL certificates and JA3 fingerprints',
  },

  // === PHISHING FEEDS ===
  {
    id: 'openphish',
    name: 'OpenPhish',
    category: 'phishing',
    url: 'https://openphish.com/feed.txt',
    format: 'txt',
    updateInterval: 120,
    enabled: true,
    description: 'Active phishing URLs (free tier: 50 URLs)',
  },
  {
    id: 'phishtank',
    name: 'PhishTank',
    category: 'phishing',
    url: 'https://data.phishtank.com/data/online-valid.json',
    format: 'json',
    updateInterval: 180,
    rateLimit: 10,
    enabled: true,
    description: 'Verified phishing sites from community submissions',
  },

  // === APT & NATION-STATE TRACKING ===
  {
    id: 'mitre-attack',
    name: 'MITRE ATT&CK',
    category: 'apt',
    url: 'https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json',
    format: 'json',
    updateInterval: 1440, // daily
    enabled: true,
    description: 'APT tactics, techniques, and procedures (TTPs)',
  },
  {
    id: 'circl-osint',
    name: 'CIRCL OSINT Feed',
    category: 'apt',
    url: 'https://www.circl.lu/doc/misp/feed-osint/',
    format: 'json',
    updateInterval: 240,
    enabled: true,
    description: 'OSINT threat intelligence from CIRCL Luxembourg',
  },

  // === CRYPTOCURRENCY & WEB3 ===
  {
    id: 'trm-sanctions',
    name: 'TRM Labs Sanctions Screening',
    category: 'crypto',
    url: 'https://api.trmlabs.com/public/v1/sanctions/screenAddress',
    format: 'json',
    apiKey: process.env.TRM_API_KEY,
    rateLimit: 100,
    updateInterval: 360,
    enabled: !!process.env.TRM_API_KEY,
    description: 'Sanctioned crypto addresses across 25 blockchains',
  },
  {
    id: 'ransomwhere',
    name: 'Ransomwhere Tracker',
    category: 'crypto',
    url: 'https://ransomwhe.re/api/export',
    format: 'json',
    updateInterval: 360,
    enabled: true,
    description: 'Ransomware Bitcoin addresses and payments',
  },

  // === DARK WEB MONITORING ===
  {
    id: 'darksearch',
    name: 'DarkSearch API',
    category: 'darkweb',
    url: 'https://darksearch.io/api/search',
    format: 'json',
    apiKey: process.env.DARKSEARCH_API_KEY,
    rateLimit: 30,
    updateInterval: 360,
    enabled: !!process.env.DARKSEARCH_API_KEY,
    description: 'Tor-indexed dark web search and monitoring',
  },
  {
    id: 'tor-exit-nodes',
    name: 'Tor Exit Node List',
    category: 'darkweb',
    url: 'https://check.torproject.org/torbulkexitlist',
    format: 'txt',
    updateInterval: 180,
    enabled: true,
    description: 'Current Tor exit node IP addresses',
  },

  // === VULNERABILITY DATABASES ===
  {
    id: 'nvd-cve',
    name: 'NVD CVE Feed',
    category: 'infrastructure',
    url: 'https://services.nvd.nist.gov/rest/json/cves/2.0',
    format: 'json',
    rateLimit: 50,
    updateInterval: 360,
    enabled: true,
    description: 'National Vulnerability Database CVE feed',
  },
  {
    id: 'cisa-kev',
    name: 'CISA Known Exploited Vulnerabilities',
    category: 'infrastructure',
    url: 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json',
    format: 'json',
    updateInterval: 360,
    enabled: true,
    description: 'CISA catalog of actively exploited vulnerabilities',
  },

  // === NARCOTICS & LAW ENFORCEMENT ===
  {
    id: 'dea-nflis',
    name: 'DEA NFLIS Data',
    category: 'narcotics',
    url: 'https://www.nflis.deadiversion.usdoj.gov/DesktopModules/ReportDownloads/Reports/',
    format: 'json',
    updateInterval: 1440, // daily
    enabled: false, // Manual scraping required, no API
    description: 'National Forensic Laboratory Information System (requires manual extraction)',
  },
];

/**
 * OSINT Feed Manager
 */
export class OSINTFeedManager {
  private feeds: Map<string, OSINTFeedSource> = new Map();
  private cache: Map<string, ThreatIndicator[]> = new Map();
  private lastUpdate: Map<string, Date> = new Map();

  constructor() {
    OSINT_FEEDS.forEach((feed) => {
      if (feed.enabled) {
        this.feeds.set(feed.id, feed);
      }
    });
  }

  /**
   * Fetch indicators from a specific feed
   */
  async fetchFeed(feedId: string): Promise<ThreatIndicator[]> {
    const feed = this.feeds.get(feedId);
    if (!feed) {
      throw new Error(`Feed ${feedId} not found or not enabled`);
    }

    // Check cache and update interval
    const lastUpdate = this.lastUpdate.get(feedId);
    if (lastUpdate) {
      const minutesSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60);
      if (minutesSinceUpdate < feed.updateInterval) {
        const cached = this.cache.get(feedId);
        if (cached) {
          console.log(`[OSINT] Using cached data for ${feed.name}`);
          return cached;
        }
      }
    }

    console.log(`[OSINT] Fetching fresh data from ${feed.name}...`);

    try {
      const indicators = await this.fetchAndParse(feed);
      this.cache.set(feedId, indicators);
      this.lastUpdate.set(feedId, new Date());
      return indicators;
    } catch (error) {
      console.error(`[OSINT] Failed to fetch ${feed.name}:`, error);
      // Return cached data if available
      return this.cache.get(feedId) || [];
    }
  }

  /**
   * Fetch and parse feed based on format
   */
  private async fetchAndParse(feed: OSINTFeedSource): Promise<ThreatIndicator[]> {
    const headers: Record<string, string> = {
      'User-Agent': 'SWORD-Intelligence/2.0 (Threat Intelligence Platform)',
    };

    if (feed.apiKey) {
      headers['Authorization'] = `Bearer ${feed.apiKey}`;
    }

    const response = await fetch(feed.url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();

    switch (feed.format) {
      case 'json':
        return this.parseJSON(feed, text);
      case 'csv':
        return this.parseCSV(feed, text);
      case 'txt':
        return this.parseTXT(feed, text);
      default:
        return [];
    }
  }

  /**
   * Parse JSON feed
   */
  private parseJSON(feed: OSINTFeedSource, data: string): ThreatIndicator[] {
    const indicators: ThreatIndicator[] = [];
    const json = JSON.parse(data);

    switch (feed.id) {
      case 'abuse-urlhaus':
        if (json.urls) {
          json.urls.forEach((item: any) => {
            indicators.push({
              id: `${feed.id}-${item.id}`,
              source: feed.name,
              type: 'url',
              value: item.url,
              confidence: 85,
              severity: item.threat === 'malware_download' ? 'high' : 'medium',
              tags: [item.threat, ...(item.tags || [])],
              firstSeen: new Date(item.date_added),
              lastSeen: new Date(item.date_added),
              description: `URLhaus: ${item.threat}`,
              metadata: {
                urlStatus: item.url_status,
                reporter: item.reporter,
              },
            });
          });
        }
        break;

      case 'abuse-threatfox':
        if (json.data) {
          json.data.forEach((item: any) => {
            indicators.push({
              id: `${feed.id}-${item.id}`,
              source: feed.name,
              type: item.ioc_type === 'sha256_hash' ? 'hash' : 'domain',
              value: item.ioc,
              confidence: parseInt(item.confidence_level) || 50,
              severity: 'high',
              tags: [item.malware, item.ioc_type],
              firstSeen: new Date(item.first_seen),
              lastSeen: new Date(item.last_seen || item.first_seen),
              description: item.comment,
              metadata: {
                malwareFamily: item.malware,
                reporter: item.reporter,
              },
            });
          });
        }
        break;

      case 'phishtank':
        if (Array.isArray(json)) {
          json.forEach((item: any) => {
            indicators.push({
              id: `${feed.id}-${item.phish_id}`,
              source: feed.name,
              type: 'url',
              value: item.url,
              confidence: item.verified === 'yes' ? 90 : 60,
              severity: 'high',
              tags: ['phishing', item.target || 'unknown'],
              firstSeen: new Date(item.submission_time),
              lastSeen: new Date(item.verification_time || item.submission_time),
              description: `Phishing targeting: ${item.target || 'unknown'}`,
            });
          });
        }
        break;

      case 'ransomwhere':
        if (json.result) {
          json.result.forEach((item: any) => {
            indicators.push({
              id: `${feed.id}-${item.address}`,
              source: feed.name,
              type: 'wallet',
              value: item.address,
              confidence: 95,
              severity: 'critical',
              tags: ['ransomware', item.family],
              firstSeen: new Date(item.createdAt),
              lastSeen: new Date(item.updatedAt || item.createdAt),
              description: `Ransomware: ${item.family}`,
              metadata: {
                family: item.family,
                amount: item.amount,
                status: item.status,
              },
            });
          });
        }
        break;

      case 'cisa-kev':
        if (json.vulnerabilities) {
          json.vulnerabilities.forEach((vuln: any) => {
            indicators.push({
              id: `${feed.id}-${vuln.cveID}`,
              source: feed.name,
              type: 'cve',
              value: vuln.cveID,
              confidence: 100,
              severity: 'critical',
              tags: ['actively-exploited', vuln.vendorProject],
              firstSeen: new Date(vuln.dateAdded),
              lastSeen: new Date(vuln.dateAdded),
              description: vuln.shortDescription,
              metadata: {
                vendor: vuln.vendorProject,
                product: vuln.product,
                requiredAction: vuln.requiredAction,
                dueDate: vuln.dueDate,
              },
            });
          });
        }
        break;
    }

    return indicators;
  }

  /**
   * Parse CSV feed
   */
  private parseCSV(feed: OSINTFeedSource, data: string): ThreatIndicator[] {
    const indicators: ThreatIndicator[] = [];
    const lines = data.trim().split('\n');

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('#')) continue;

      const parts = line.split(',');

      if (feed.id === 'abuse-sslbl' && parts.length >= 3) {
        indicators.push({
          id: `${feed.id}-${i}`,
          source: feed.name,
          type: 'hash',
          value: parts[0], // SHA1 hash
          confidence: 90,
          severity: 'high',
          tags: ['ssl-blacklist', 'malicious-certificate'],
          firstSeen: new Date(parts[1]),
          lastSeen: new Date(),
          description: `Malicious SSL certificate: ${parts[2]}`,
        });
      }
    }

    return indicators;
  }

  /**
   * Parse TXT feed (line-delimited)
   */
  private parseTXT(feed: OSINTFeedSource, data: string): ThreatIndicator[] {
    const indicators: ThreatIndicator[] = [];
    const lines = data.trim().split('\n');

    lines.forEach((line, index) => {
      const value = line.trim();
      if (!value || value.startsWith('#')) return;

      let type: ThreatIndicator['type'] = 'domain';

      // Detect type
      if (/^\d+\.\d+\.\d+\.\d+$/.test(value)) {
        type = 'ip';
      } else if (/^https?:\/\//.test(value)) {
        type = 'url';
      } else if (/\.onion$/.test(value)) {
        type = 'onion';
      }

      indicators.push({
        id: `${feed.id}-${index}`,
        source: feed.name,
        type,
        value,
        confidence: 80,
        severity: feed.category === 'phishing' ? 'high' : 'medium',
        tags: [feed.category],
        firstSeen: new Date(),
        lastSeen: new Date(),
        description: `${feed.name} indicator`,
      });
    });

    return indicators;
  }

  /**
   * Fetch all enabled feeds
   */
  async fetchAllFeeds(): Promise<Map<string, ThreatIndicator[]>> {
    const results = new Map<string, ThreatIndicator[]>();

    for (const [feedId] of this.feeds) {
      try {
        const indicators = await this.fetchFeed(feedId);
        results.set(feedId, indicators);
      } catch (error) {
        console.error(`[OSINT] Error fetching ${feedId}:`, error);
        results.set(feedId, []);
      }
    }

    return results;
  }

  /**
   * Get all indicators across all feeds
   */
  async getAllIndicators(): Promise<ThreatIndicator[]> {
    const feedResults = await this.fetchAllFeeds();
    const allIndicators: ThreatIndicator[] = [];

    for (const indicators of feedResults.values()) {
      allIndicators.push(...indicators);
    }

    return allIndicators;
  }

  /**
   * Search indicators by value
   */
  async searchIndicator(value: string): Promise<ThreatIndicator[]> {
    const allIndicators = await this.getAllIndicators();
    return allIndicators.filter((ind) =>
      ind.value.toLowerCase().includes(value.toLowerCase())
    );
  }

  /**
   * Get statistics
   */
  getStatistics(): {
    totalFeeds: number;
    enabledFeeds: number;
    cachedIndicators: number;
    feedsByCategory: Record<string, number>;
  } {
    const feedsByCategory: Record<string, number> = {};

    for (const feed of this.feeds.values()) {
      feedsByCategory[feed.category] = (feedsByCategory[feed.category] || 0) + 1;
    }

    let totalCached = 0;
    for (const indicators of this.cache.values()) {
      totalCached += indicators.length;
    }

    return {
      totalFeeds: OSINT_FEEDS.length,
      enabledFeeds: this.feeds.size,
      cachedIndicators: totalCached,
      feedsByCategory,
    };
  }
}

/**
 * Singleton instance
 */
export const osintFeedManager = new OSINTFeedManager();
