'use client';

import Link from 'next/link';
import { Shield, Eye, Lock, Radio, Search, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-background"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
              Research & Development
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              SWORD Intelligence Programs
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              Classified research and development initiatives leveraging advanced cryptography,
              intelligence tradecraft, and cutting-edge security technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-12">
          {/* CRYPTOGRAM */}
          <div className="group relative p-8 rounded-xl border border-border bg-gradient-to-br from-surface to-surface/50 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-6 mb-6">
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-xl blur-xl"></div>
                <Shield className="relative w-8 h-8 text-purple-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">CRYPTOGRAM</h2>
                <p className="text-lg text-accent font-medium">Post-Quantum Cryptography Initiative</p>
              </div>
            </div>
            <div className="pl-22 space-y-4">
              <p className="text-muted leading-relaxed text-base">
                Advanced cryptographic research program focused on quantum-resistant security primitives
                and hybrid encryption systems.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">ML-KEM-1024: NIST-approved key encapsulation mechanism (FIPS 203)</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">ML-DSA-87: Digital signature algorithm with NIST Level 5 security (FIPS 204)</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">AES-256-GCM: Authenticated symmetric encryption</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Double ratchet protocol: Forward secrecy with per-message keys</span>
                </li>
              </ul>
              <div className="pt-6 flex items-center gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Operational
                </span>
              </div>
            </div>
          </div>

          {/* DIRECTEYE */}
          <div className="group relative p-8 rounded-xl border border-border bg-gradient-to-br from-surface to-surface/50 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-6 mb-6">
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-xl blur-xl"></div>
                <Eye className="relative w-8 h-8 text-blue-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">DIRECTEYE</h2>
                <p className="text-lg text-accent font-medium">Open-Source Intelligence Collection Platform</p>
              </div>
            </div>
            <div className="pl-22 space-y-4">
              <p className="text-muted leading-relaxed text-base">
                Automated OSINT aggregation and threat intelligence pipeline with database-backed caching
                and real-time feed synchronization.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">18 integrated threat intelligence feeds (URLhaus, Feodo, PhishTank, OTX, VirusTotal)</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Background synchronization service with automatic deduplication</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Database persistence for indicator caching and historical analysis</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Multi-category coverage: malware, phishing, C2 infrastructure, narcotics, darknet markets</span>
                </li>
              </ul>
              <div className="pt-6 flex items-center gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Operational
                </span>
              </div>
            </div>
          </div>

          {/* KYBERLOCK */}
          <div className="group relative p-8 rounded-xl border border-border bg-gradient-to-br from-surface to-surface/50 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-6 mb-6">
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-xl blur-xl"></div>
                <Lock className="relative w-8 h-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">KYBERLOCK</h2>
                <p className="text-lg text-accent font-medium">Post-Quantum File Encryption with Hidden Volumes</p>
              </div>
            </div>
            <div className="pl-22 space-y-4">
              <p className="text-muted leading-relaxed text-base">
                High-performance file encryption combining CRYSTALS-Kyber (ML-KEM-768) with traditional
                algorithms for quantum-resistant data protection. Features hidden volumes and plausible deniability.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Hybrid encryption: ML-KEM-768 (post-quantum) + X25519 (classical)</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Hidden volumes with plausible deniability protection</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Cross-platform: Windows, macOS, Linux with GTK3 GUI</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Cloud sync support: S3, WebDAV, zero-knowledge providers</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Hardware token support with Argon2id key derivation</span>
                </li>
              </ul>
              <div className="pt-6 flex items-center gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Operational
                </span>
                <Link
                  href="/programs/kyberlock"
                  className="inline-flex items-center text-sm text-accent hover:text-accent/80 font-medium group/link transition-colors"
                >
                  View Details
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* SWORDCOMM */}
          <div className="group relative p-8 rounded-xl border border-border bg-gradient-to-br from-surface to-surface/50 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-6 mb-6">
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-xl blur-xl"></div>
                <Radio className="relative w-8 h-8 text-cyan-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">SWORDCOMM</h2>
                <p className="text-lg text-accent font-medium">APT-Level Secure Mobile Communications</p>
              </div>
            </div>
            <div className="pl-22 space-y-4">
              <p className="text-muted leading-relaxed text-base">
                Military-grade secure messaging for Android/iOS with on-device real-time translation,
                post-quantum encryption, and hypervisor-level threat detection. Fully functional offline.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Kyber-1024 post-quantum encryption with forward secrecy</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">EL2 hypervisor detection with adaptive countermeasures (99% accuracy)</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">On-device Danish-English translation (no server required, optional network offload)</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Signal Protocol-based with enhanced anti-surveillance features</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Intimate Protection Mode: per-contact maximum security</span>
                </li>
              </ul>
              <div className="pt-6 flex items-center gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Operational
                </span>
                <Link
                  href="/programs/swordcomm"
                  className="inline-flex items-center text-sm text-accent hover:text-accent/80 font-medium group/link transition-colors"
                >
                  View Details
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* SPINDEX */}
          <div className="group relative p-8 rounded-xl border border-border bg-gradient-to-br from-surface to-surface/50 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-6 mb-6">
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent rounded-xl blur-xl"></div>
                <Search className="relative w-8 h-8 text-green-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">SPINDEX</h2>
                <p className="text-lg text-accent font-medium">High-Performance Modular Data Indexing Engine</p>
              </div>
            </div>
            <div className="pl-22 space-y-4">
              <p className="text-muted leading-relaxed text-base">
                Enterprise-grade data indexing tool for massive datasets (500+ TB) with AVX-512 optimizations,
                ML-powered content classification, and Elasticsearch integration.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Pure C implementation with AVX-512 optimized phrase search</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Plugin architecture: automatic module discovery and integration</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">OpenVINO ML integration for ambiguous content classification</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">15+ file formats: text, office docs, databases, archives, medical imaging</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Elasticsearch/Kibana integration with RBAC and E2E encryption</span>
                </li>
              </ul>
              <div className="pt-6 flex items-center gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Operational
                </span>
                <Link
                  href="/programs/spindex"
                  className="inline-flex items-center text-sm text-accent hover:text-accent/80 font-medium group/link transition-colors"
                >
                  View Details
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* KP14 */}
          <div className="group relative p-8 rounded-xl border border-border bg-gradient-to-br from-surface to-surface/50 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-6 mb-6">
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-xl blur-xl"></div>
                <AlertTriangle className="relative w-8 h-8 text-red-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">KP14</h2>
                <p className="text-lg text-accent font-medium">Advanced Malware Analysis & Steganographic Intelligence</p>
              </div>
            </div>
            <div className="pl-22 space-y-4">
              <p className="text-muted leading-relaxed text-base">
                Enterprise-grade platform for analyzing sophisticated malware and steganographic payloads.
                Originally designed for APT41's KeyPlug, now capable of decompiling most modern malware.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Static binary analysis: PE parsing, disassembly (Capstone + Radare2), entropy analysis</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Steganography detection: LSB, DCT coefficients, polyglot files (ZIP/JAR, JPEG/PE)</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Cryptographic analysis: XOR, AES, RC4, ChaCha20, custom APT41 algorithms</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Hardware acceleration: Intel NPU (3-10× speedup), GPU support, OpenVINO integration</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="text-accent mr-3 mt-0.5">▸</span>
                  <span className="group-hover/item:text-foreground transition-colors">Detection rules: Auto-generate YARA, Suricata, Snort, Sigma with MITRE ATT&CK mapping</span>
                </li>
              </ul>
              <div className="pt-6 flex items-center gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Operational
                </span>
                <Link
                  href="/programs/kp14"
                  className="inline-flex items-center text-sm text-accent hover:text-accent/80 font-medium group/link transition-colors"
                >
                  View Details
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative p-12 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
          <div className="relative">
            <h3 className="text-3xl font-bold mb-4">Access Restricted</h3>
            <p className="text-muted mb-8 max-w-2xl leading-relaxed">
              These programs are available exclusively to vetted clients with active engagements.
              All prospective clients undergo identity verification, sanctions screening, and business legitimacy assessment.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-accent text-white hover:bg-accent/90 transition-all duration-300 font-semibold shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              Request Access
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
