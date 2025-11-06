# SWORD Intelligence

**Independent private intelligence firm specializing in Web3 and cyber threats.**

> Adversaries don't play fair. We do what's lawful—and effective.

---

## 🎯 Mission

SWORD Intelligence helps funds, founders, enterprises, and government clients prevent loss, hunt threat actors, and respond to high-stakes incidents across Web3 and traditional cyber infrastructure.

### Core Focus Areas

- **Counter-Narcotics Intelligence**: Fighting synthetic opioid supply chains (fentanyl, nitazenes)
- **Web3 & Crypto Crime**: DeFi exploits, ransomware payments, asset tracing
- **Cyber Threat Intelligence**: APT tracking, nation-state operations, infrastructure analysis
- **Executive Protection**: UHNWI and C-suite cyber security (OPSEC, identity fragmentation)

---

## 🏗️ Technical Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom theme system
- **Components**: shadcn/ui + custom components

### Backend & Infrastructure
- **Database**: PostgreSQL with Prisma ORM
- **Real-Time**: WebSocket server (ws) with Redis pub/sub
- **Caching**: Redis for multi-instance coordination
- **Authentication**: NextAuth with MFA support

### Security
- **Post-Quantum Cryptography**: Dilithium-3 signatures + Kyber-768 KEMs
- **Encryption**: AES-256-GCM with forward secrecy (double ratchet)
- **Steganography**: LSB (Least Significant Bit) image encoding
- **Searchable Encryption**: HMAC-based SSE for privacy-preserving search
- **Headers**: CSP with nonce, HSTS, COOP/COEP, strict referrers

### Privacy & Compliance
- **Baseline**: U.S./Iowa with regional compliance switches
- **Audit**: Comprehensive tamper-evident logging
- **Vetting**: KYC/KYB with sanctions screening

---

## 🚀 Features

### Public Site

- **Dual Theme System**: Special-Ops (dark) and Advisory (light) themes with instant switching
- **Service Pages**: Intelligence, Response, Resilience with detailed capability breakdowns
- **Live Threat Intel Feed**: Real-time threat data across multiple categories:
  - Nation-state APT operations (APT28, APT41, Lazarus Group)
  - Critical infrastructure incidents
  - Web3/DeFi exploits and crypto crime
  - **Narcotics trafficking** (fentanyl precursors, ultra-potent opioids, darknet markets)
  - Supply chain vulnerabilities
- **Animated Stats**: Scroll-triggered counters showing operational track record
- **Methods & Compliance**: Transparent lawful methodologies and client vetting procedures
- **Secure Contact**: PGP-encrypted contact forms with progressive profiling

### Strategic Capabilities (Public)

- **Shenzhen Supply Chain Intelligence**: Full access to electronics manufacturing ecosystem
- **Russian Technology Access**: Procurement and analysis capability for dual-use tech (lawful purposes, rigorous vetting)
- **Global Rapid Response**: UK-based with 24-hour deployment capability worldwide
- **Intelligence Community Coordination**: Relationships with government/IC partners (details classified)

### 🔐 Client Portal - Secure Operations Center

#### Authentication & Access Control
- **Post-Quantum Encryption**: Dilithium-3 digital signatures + Kyber-768 key encapsulation
- **Multi-Factor Authentication**: TOTP, SMS, hardware keys (YubiKey/WebAuthn)
- **Session Management**: Secure token rotation with automatic timeout

#### 🗂️ Encrypted Document Vault
- **Hybrid Encryption**: AES-256-GCM + Post-Quantum KEMs
- **File Organization**: Tags, metadata, versioning
- **Secure Sharing**: Time-limited share links with access logs
- **Client-Side Encryption**: Files encrypted before upload
- **Canary Tokens**: Honeypot documents for breach detection

#### 💬 Secure Messaging (APT-Level Tradecraft)
- **Real-Time WebSocket**: Production server with database persistence
- **End-to-End Encryption**: Double ratchet with forward secrecy
- **Traffic Obfuscation**: APT41-inspired techniques
  - Message padding to uniform sizes
  - Random decoy message generation
  - Timing randomization
  - Constant-rate traffic shaping
- **Room-Based Chat**: Private channels with member management
- **Ephemeral Messages**: Burn-after-reading, auto-expiration
- **Typing Indicators**: Obfuscated timing for OPSEC
- **Presence Tracking**: Online/offline status with privacy controls
- **Security Monitoring**: Screenshot/clipboard detection alerts

#### 📨 Dead Drop System (Cold War Tradecraft)
- **Time-Based Release**: Schedule messages for future delivery
- **Heartbeat Triggers**: Auto-deliver if no check-in for N hours
- **Geographic Triggers**: Deliver when entering/leaving region (Haversine distance)
- **Composite Triggers**: AND/OR logic for complex conditions
- **Self-Destruct**: Automatic payload deletion after delivery
- **Confirmation Required**: Optional recipient acknowledgment
- **Delivery Tracking**: Full audit trail of trigger evaluations

#### 🖼️ Steganographic Attachments (LSB Encoding)
- **Image Embedding**: Hide files in PNG images using Least Significant Bit
- **Encryption Layer**: AES-256-GCM encryption of payload before embedding
- **Format Support**: PNG carrier images, any file type payload
- **Capacity Analysis**: Pre-flight checks for sufficient carrier capacity
- **Checksum Verification**: SHA-256 integrity validation
- **Metadata Preservation**: File type, name, size embedded with payload
- **Extraction**: Decrypt and extract hidden files from carrier images

#### 🔍 Encrypted Message Search
- **Searchable Symmetric Encryption (SSE)**: Privacy-preserving search without decryption
- **HMAC-Based Indexing**: Keywords encrypted with keyed hash
- **Trapdoor Queries**: Generate search tokens without exposing terms
- **Fuzzy Matching**:
  - Porter stemming (running → run)
  - Soundex phonetic matching (Smith → S530)
  - Levenshtein distance for typo tolerance
- **Stop Word Filtering**: Remove common words for efficiency
- **Bloom Filters**: Fast index lookups
- **Privacy-Preserving**: Server never sees plaintext search terms or message content

#### 👑 Admin Panel (Oversight & Control)
- **Role-Based Access Control**: 4 tiers (user, analyst, admin, super_admin)
- **Permission System**: 25+ granular permissions
- **Audit Logging**: 40+ event types with tamper-evident logs
- **Risk Scoring**: Automated suspicious activity detection
- **System-Wide Oversight**:
  - User management (roles, permissions, disable/enable)
  - Vault document monitoring and quarantine
  - Canary token tracking and alert management
  - Message metadata analysis (no content access)
  - Search activity monitoring
  - Dead drop trigger oversight
- **Metrics Dashboard**: Real-time operational statistics
- **Security Events**: Centralized alert console

#### 📊 Intelligence Reporting
- **ICD-203 Compliant**: Intelligence Community Directive formatting
- **Digital Signatures**: Dilithium post-quantum signatures
- **Confidence Levels**: Structured analytic assessments
- **Source Attribution**: SIGINT, OSINT, HUMINT tagging
- **Distribution Controls**: TLP (Traffic Light Protocol) markings

### 🏗️ Production Infrastructure

#### Database Layer
- **PostgreSQL**: Enterprise-grade persistence
- **Prisma ORM**: Type-safe database operations
- **Schema**: 20+ models covering all entities
  - Users & authentication
  - Messages & rooms
  - Search indexes
  - Dead drops & triggers
  - Heartbeats & locations
  - Documents & shares
  - Canary tokens
  - Audit logs
  - Threat intelligence
- **Connection Pooling**: Automatic resource management
- **Health Checks**: Monitoring and diagnostics
- **Fallback Support**: In-memory adapter for development

#### WebSocket Server
- **Standalone Service**: Independent WebSocket server (port 8080)
- **Authentication**: Token-based auth with JWT validation
- **Redis Pub/Sub**: Multi-instance horizontal scaling
- **Rate Limiting**: 60 messages/minute per client
- **Heartbeat Monitoring**: 30-second intervals, 60-second timeout
- **Message Persistence**: All messages stored to database
- **Graceful Shutdown**: Clean connection termination
- **Error Recovery**: Automatic reconnection with exponential backoff

#### Scalability & Reliability
- **Multi-Instance**: Deploy N instances with Redis coordination
- **Load Balancing**: Sticky sessions or Redis pub/sub routing
- **Offline Support**: Message queuing for disconnected clients
- **Message History**: Paginated history loading from database
- **Database Replication**: Read replicas for scaling
- **High Availability**: Redis Sentinel for failover

---

## 📂 Project Structure

```
├── app/                      # Next.js app directory
│   ├── about/               # Company information, capabilities
│   ├── contact/             # Secure intake forms
│   ├── insights/            # Blog / case studies
│   ├── intel-feed/          # Live threat intelligence dashboard
│   ├── methods/             # Compliance & methodologies
│   ├── portal/              # Secure client portal (auth-gated)
│   │   ├── admin/           # Admin oversight panel
│   │   ├── canary/          # Canary token management
│   │   ├── messages/        # Real-time secure messaging
│   │   ├── reports/         # Intelligence reports
│   │   └── vault/           # Encrypted document storage
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── search/          # Encrypted search API
│   │   └── ...              # Other API routes
│   ├── privacy/             # Privacy notice
│   ├── services/            # Service detail pages
│   └── terms/               # Terms of service
├── components/              # React components
│   ├── ui/                  # Base UI components (shadcn)
│   ├── admin/               # Admin panel components
│   ├── messaging/           # Chat components
│   ├── vault/               # Document vault components
│   └── ...                  # Other components
├── lib/                     # Utilities and libraries
│   ├── admin/               # Admin logic & audit logging
│   ├── auth/                # Authentication logic
│   ├── crypto/              # Post-quantum cryptography
│   ├── db/                  # Database adapters (Prisma)
│   ├── intelligence/        # Threat feed data
│   ├── messaging/           # WebSocket, dead drops, security
│   ├── search/              # Searchable encryption (SSE)
│   ├── steganography/       # LSB encoding/decoding
│   └── vault/               # Document encryption
├── server/                  # Backend servers
│   └── websocket.ts         # Production WebSocket server
├── prisma/                  # Database schema
│   └── schema.prisma        # Prisma models
├── hooks/                   # React hooks
│   ├── useSecureWebSocket.ts # WebSocket client hook
│   └── ...                  # Other hooks
├── docs/                    # Documentation
│   └── PRODUCTION_INFRASTRUCTURE.md
└── public/                  # Static assets
```

---

## 🔒 Security & Privacy

### Cryptographic Primitives

**Post-Quantum Cryptography:**
- **Dilithium-3**: Digital signatures (NIST PQC standard)
- **Kyber-768**: Key encapsulation mechanism
- **Hybrid Mode**: PQC + classical (RSA/ECDSA) for defense-in-depth

**Symmetric Encryption:**
- **AES-256-GCM**: Authenticated encryption with associated data
- **PBKDF2**: Key derivation (100,000 iterations)
- **ChaCha20-Poly1305**: Alternative stream cipher

**Hashing & MAC:**
- **SHA-256/SHA-512**: Cryptographic hashing
- **HMAC-SHA256**: Message authentication codes

### Forward Secrecy
- **Double Ratchet**: Signal Protocol-inspired key rotation
- **Per-Message Keys**: Unique key for each message
- **Chain Key Advancement**: Automatic key evolution
- **Root Key Rotation**: Periodic ephemeral key agreement

### Traffic Analysis Resistance (APT41 TTPs)
- **Uniform Message Sizes**: Padding to 1024 bytes
- **Decoy Messages**: Random fake traffic (10% probability)
- **Timing Obfuscation**: Randomized delays (100-300ms)
- **Constant-Rate Traffic**: Shaping to resist statistical analysis
- **Connection Fingerprinting**: Anti-fingerprinting headers

### Security Headers

- **CSP**: Content Security Policy with nonce-based script execution
- **HSTS**: Strict-Transport-Security with preload
- **COOP/COEP**: Cross-Origin-Opener-Policy and Embedder-Policy
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Restrictive feature policy

### Privacy Compliance

- **U.S./Iowa Baseline**: Clear privacy notice with opt-out mechanisms
- **First-Party Analytics**: Prefer self-hosted, minimal tracking
- **Do-Not-Track**: Honor DNT and GPC signals
- **Regional Switches**: Feature flags for GDPR/CCPA compliance
- **Audit Logs**: Tamper-evident consent/opt-out tracking

### Client Vetting

All prospective clients undergo:
- Identity & beneficial ownership verification (KYC/KYB)
- Sanctions screening (OFAC SDN, UK, EU, BIS)
- Business legitimacy assessment
- End-use and intent analysis

**Threat Actor Protocol**: Anyone suspected of attempting to acquire technology for hostile nation-states will be treated as a threat actor (intelligence collection, TTP documentation, IC coordination).

### Client-Side Security Monitoring
- **Screenshot Detection**: Alerts on capture attempts
- **Clipboard Monitoring**: Tracks sensitive data copying
- **Screen Recording Detection**: Identifies recording software
- **Security Events**: Real-time alerts to server and logs

---

## 🌍 Operational Posture

- **Independence**: Not subject to government secrecy obligations; operate under client confidentiality and applicable law
- **NATO Alignment**: Share values and operational philosophy with NATO member states
- **Global Business**: Open to lawful engagements globally (including Russia, China) subject to sanctions compliance
- **UK-Based**: Rapid deployment capability (24 hours to nearly anywhere)
- **IC Coordination**: Ongoing relationships with government and intelligence community partners

---

## 🚧 Development Roadmap

### ✅ Completed

**Public Site:**
- [x] Core site structure (Home, About, Services, Methods, Contact)
- [x] Dual theme system (Special-Ops / Advisory)
- [x] Privacy & compliance pages
- [x] Live threat intelligence feed with narcotics tracking
- [x] Animated stats showcase
- [x] Client vetting procedures documentation
- [x] Security headers implementation

**Client Portal - Security:**
- [x] Post-quantum cryptography (Dilithium + Kyber)
- [x] Multi-factor authentication (TOTP)
- [x] Session management with NextAuth

**Client Portal - Features:**
- [x] Encrypted document vault with AES-256-GCM + PQC
- [x] Secure file sharing with time-limited links
- [x] Canary token system (honeypot documents)
- [x] Real-time WebSocket messaging
- [x] APT-level traffic obfuscation
- [x] Dead drop system (time/heartbeat/geographic triggers)
- [x] LSB steganography for file hiding
- [x] Searchable symmetric encryption (SSE)
- [x] Admin panel with full oversight

**Infrastructure:**
- [x] PostgreSQL database with Prisma ORM
- [x] Production WebSocket server
- [x] Redis pub/sub for multi-instance support
- [x] Database persistence for all features
- [x] Message history and offline support
- [x] Audit logging infrastructure

### 🔄 In Progress

- [ ] Hardware security key integration (YubiKey/WebAuthn)
- [ ] Biometric authentication (fingerprint, Face ID)
- [ ] Advanced OSINT pipeline automation

### 📋 Planned

**Intelligence Gathering:**
- [ ] Real-time threat intel pipeline (Skyvern-AI integration)
- [ ] Automated intel sources:
  - PRC cyberwarfare operations tracking
  - International fentanyl/nitazenes seizures (DEA, FBI, Europol feeds)
  - NATO intelligence leaks monitoring
  - Critical infrastructure incidents (e.g., Spanish power grid)
  - Darknet market monitoring (Tor, I2P)
- [ ] Cryptocurrency tracing integration
- [ ] Blockchain analytics for ransomware payments

**Advanced Security:**
- [ ] End-to-end encrypted voice/video calls (WebRTC + PQC)
- [ ] Blockchain-based audit trail (immutable logs)
- [ ] Air-gapped key ceremony for master keys
- [ ] Hardware security module (HSM) integration
- [ ] Zero-knowledge proof authentication

**Operations:**
- [ ] Incident response playbooks (automated)
- [ ] Threat hunting dashboard
- [ ] SIEM integration (Splunk, ELK)
- [ ] Export/import functionality for data portability
- [ ] Mobile apps (iOS/Android) with PQC
- [ ] API for threat intel feed (authenticated)
- [ ] Webhook notifications for security events

**Compliance & Reporting:**
- [ ] SOC 2 Type II compliance
- [ ] ISO 27001 certification tracking
- [ ] Automated compliance reporting
- [ ] Client-specific SLAs and metrics

---

## 🏃 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** 15+ (for production)
- **Redis** 7+ (for WebSocket multi-instance)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/SWORDIntel/SWORDINTELLIGENCE.git
cd SWORDINTELLIGENCE

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations (if PostgreSQL available)
npx prisma generate
npx prisma migrate dev

# Run development server (Next.js + WebSocket)
npm run dev:all

# Or run separately:
npm run dev        # Next.js only (port 3000)
npm run dev:ws     # WebSocket server only (port 8080)
```

### Build for Production

```bash
# Build Next.js app
npm run build

# Build WebSocket server
npm run build:ws

# Start production servers
npm run start:all

# Or run separately:
npm start          # Next.js (port 3000)
npm run start:ws   # WebSocket (port 8080)
```

### Docker Deployment (Recommended for Production)

```bash
# Build and run with Docker Compose
docker-compose up -d

# Services:
# - app: Next.js frontend (port 3000)
# - websocket: WebSocket server (port 8080)
# - db: PostgreSQL database (port 5432)
# - redis: Redis cache (port 6379)
```

### Environment Variables

Required variables in `.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sword_intel

# Redis
REDIS_URL=redis://localhost:6379

# WebSocket
WS_PORT=8080
WS_HOST=0.0.0.0
NEXT_PUBLIC_WS_URL=ws://localhost:8080

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-secure-random-string-here

# Security
AUDIT_LOG_RETENTION_DAYS=2555  # 7 years
SESSION_TIMEOUT_HOURS=24
```

See `docs/PRODUCTION_INFRASTRUCTURE.md` for detailed setup instructions.

---

## 📚 Documentation

- **[Production Infrastructure](docs/PRODUCTION_INFRASTRUCTURE.md)**: Complete guide to database, WebSocket server, scaling, and deployment
- **[Searchable Encryption](lib/search/searchable-encryption.ts)**: SSE implementation details
- **[Steganography](lib/steganography/lsb-engine.ts)**: LSB encoding technical docs
- **[Dead Drops](lib/messaging/dead-drop.ts)**: Trigger system architecture
- **[Admin Panel](app/portal/admin/)**: Oversight and control documentation
- **[WebSocket Protocol](server/websocket.ts)**: Message types and authentication flow

---

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run type checks
npx tsc --noEmit

# Lint code
npm run lint

# View database in Prisma Studio
npx prisma studio
```

---

## 📜 License

Proprietary - © 2024 SWORD Intelligence. All rights reserved.

---

## 🤝 Contact

- **Secure Intake**: [Contact Page](/contact)
- **PGP Email**: secure@sword-intel.example
- **Emergency Hotline**: +1 (XXX) XXX-XXXX (24/7)
- **Documentation**: [Production Infrastructure](docs/PRODUCTION_INFRASTRUCTURE.md)

---

## ⚠️ Legal Disclaimer

SWORD Intelligence operates as an independent private intelligence firm. We are not affiliated with any government entity. All services comply with applicable UK and U.S. law. Engagements involving controlled technologies, strategic market access, or sensitive intelligence are conducted with rigorous client vetting and coordination with appropriate authorities.

**"dot air force" is a personal moniker and does not imply affiliation with the United States Air Force.**

---

## 🛡️ Code of Conduct

We maintain strict ethical standards:

- **Lawful Operations**: All methodologies comply with applicable laws
- **Client Confidentiality**: Need-to-know principles and encryption
- **No Sanctions Evasion**: Zero tolerance for proliferation or export control violations
- **Threat Actor Protocol**: Hostile nation-state actors attempting to misuse our services will be investigated and reported
- **Cooperation with Authorities**: Coordinate with law enforcement and IC partners through proper legal channels
- **Responsible Disclosure**: Security vulnerabilities reported through proper channels
- **Privacy First**: User data minimization and encryption by default

---

## 🏆 Technical Achievements

**Security Engineering:**
- Post-quantum cryptography implementation (NIST standards)
- Double ratchet forward secrecy (Signal Protocol)
- APT-level traffic obfuscation (APT41 TTPs)
- Searchable symmetric encryption (privacy-preserving search)
- LSB steganography with authenticated encryption
- Multi-factor authentication with TOTP/WebAuthn

**Infrastructure:**
- Production WebSocket server with Redis clustering
- PostgreSQL with Prisma ORM (20+ models)
- Multi-instance horizontal scaling
- Database persistence with offline support
- Comprehensive audit logging (40+ event types)

**Intelligence Operations:**
- Real-time threat feed (nation-states, narcotics, Web3)
- Dead drop system with complex triggers
- Canary token honeypots
- Geographic proximity triggers (Haversine)
- Heartbeat monitoring for dead man's switch

**Privacy & Compliance:**
- HMAC-encrypted search indexes
- Tamper-evident audit logs
- Client-side security monitoring
- Screenshot/clipboard detection
- End-to-end encrypted messaging

---

*Last Updated: November 6, 2024*
*Version: 2.0 - Production Infrastructure Release*
