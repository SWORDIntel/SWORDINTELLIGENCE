'use client';

import Link from 'next/link';
import {
  Lock,
  Shield,
  HardDrive,
  Cloud,
  Key,
  Eye,
  EyeOff,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Code,
  Download,
  Monitor
} from 'lucide-react';

export default function KyberlockPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b border-border bg-gradient-to-br from-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-4">KYBERLOCK</h1>
              <p className="text-2xl text-accent">
                Post-Quantum File Encryption with Hidden Volumes
              </p>
            </div>
          </div>
          <p className="text-xl text-muted leading-relaxed max-w-4xl">
            High-performance file encryption combining CRYSTALS-Kyber (ML-KEM) post-quantum cryptography
            with traditional algorithms to protect your data against both current and future quantum computing
            threats. Features hidden volumes, plausible deniability, and secure cloud synchronization.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <span className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-500 text-sm font-semibold">
              ML-KEM-768
            </span>
            <span className="px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-semibold">
              Hidden Volumes
            </span>
            <span className="px-4 py-2 rounded-lg bg-green-500/10 text-green-500 text-sm font-semibold">
              Cross-Platform
            </span>
            <span className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-500 text-sm font-semibold">
              Pure C
            </span>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12">Core Capabilities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quantum-Resistant Encryption */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Quantum-Resistant</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>CRYSTALS-Kyber (ML-KEM-768) post-quantum KEM</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Hybrid mode: ML-KEM-768 + X25519</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>NIST FIPS 203 compliant implementation</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Protection against quantum computing threats</span>
              </li>
            </ul>
          </div>

          {/* Hidden Volumes */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
              <EyeOff className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Hidden Volumes</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Concealed encrypted volumes within containers</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Plausible deniability protection</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Multiple password support (outer + hidden)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Indistinguishable from random data</span>
              </li>
            </ul>
          </div>

          {/* Cloud Synchronization */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
              <Cloud className="w-6 h-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Cloud Sync</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Secure S3-compatible storage integration</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>WebDAV protocol support</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Zero-knowledge cloud providers</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Encrypted data never leaves your device unprotected</span>
              </li>
            </ul>
          </div>

          {/* Cross-Platform */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Cross-Platform</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Native Windows (x64) application</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>macOS (Universal Binary) support</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Linux (AppImage, DEB, RPM)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Consistent experience across platforms</span>
              </li>
            </ul>
          </div>

          {/* Modern GUI */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Modern Interface</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>GTK3-based responsive GUI</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Dark mode and light mode support</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Command-line interface for automation</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>C API for programmatic access</span>
              </li>
            </ul>
          </div>

          {/* Advanced Key Management */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Key Management</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Hardware token support (YubiKey, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Argon2id memory-hard key derivation</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>HKDF-SHA256 for key expansion</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Hardware TRNG with CSPRNG fallback</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Security Architecture */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">Security Architecture</h2>
        <p className="text-muted mb-12 max-w-3xl">
          KYBERLOCK implements defense-in-depth with multiple encryption layers, combining post-quantum
          and classical cryptography in a hybrid configuration for maximum security.
        </p>

        <div className="p-8 rounded-lg bg-surface border border-border mb-12">
          <h3 className="text-xl font-bold mb-6">Encryption Flow</h3>
          <div className="font-mono text-sm space-y-2 text-muted">
            <div className="flex items-center space-x-2">
              <span className="text-accent">→</span>
              <span>User Password</span>
            </div>
            <div className="flex items-center space-x-2 pl-6">
              <span className="text-accent">→</span>
              <span>Argon2id (Memory-Hard KDF)</span>
            </div>
            <div className="flex items-center space-x-2 pl-12">
              <span className="text-accent">→</span>
              <span>HKDF-SHA256 (Key Expansion)</span>
            </div>
            <div className="flex items-center space-x-2 pl-18">
              <span className="text-accent">→</span>
              <span>Hybrid Key Exchange</span>
            </div>
            <div className="flex items-center space-x-2 pl-24">
              <span className="text-purple-500">├─</span>
              <span className="text-purple-500">ML-KEM-768 (Post-Quantum)</span>
            </div>
            <div className="flex items-center space-x-2 pl-24">
              <span className="text-accent">└─</span>
              <span>X25519 (Classical ECDH)</span>
            </div>
            <div className="flex items-center space-x-2 pl-18">
              <span className="text-accent">↓</span>
            </div>
            <div className="flex items-center space-x-2 pl-12">
              <span className="text-green-500">→</span>
              <span className="text-green-500">AES-256-XTS (Container Encryption)</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Cryptographic Specifications</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Post-Quantum KEM:</strong> CRYSTALS-Kyber (ML-KEM-768, NIST FIPS 203)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Classical KEM:</strong> X25519 (Curve25519 ECDH)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Symmetric Encryption:</strong> AES-256 in XTS mode</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Key Derivation:</strong> Argon2id + HKDF-SHA256</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Authentication:</strong> HMAC-SHA256</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Random Generation:</strong> Hardware TRNG with CSPRNG fallback</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Security Features</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Defense-in-depth with multiple encryption layers</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Plausible deniability with hidden volumes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Quantum-safe cryptography (ML-KEM-768)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Memory-hard key derivation (Argon2id)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Hardware token integration</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Secure random data generation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hidden Volumes Explanation */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <div className="p-8 rounded-lg bg-orange-500/5 border border-orange-500/20">
          <div className="flex items-start space-x-4 mb-6">
            <EyeOff className="w-8 h-8 text-orange-500 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold mb-4">Hidden Volumes & Plausible Deniability</h2>
              <p className="text-muted leading-relaxed mb-6">
                KYBERLOCK supports hidden volumes, allowing you to create a concealed encrypted volume within
                another encrypted container. This provides plausible deniability - if coerced to reveal your
                password, you can provide the outer volume password while keeping the hidden volume secret.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">Dual-Password System</div>
                <div className="text-sm text-muted">Outer password for decoy data, hidden password for sensitive data</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">Indistinguishable</div>
                <div className="text-sm text-muted">Hidden volume appears as random unused space</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">Legal Protection</div>
                <div className="text-sm text-muted">Cryptographic protection against coercion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">Usage Examples</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2 text-accent" />
              Command Line Interface
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted mb-2">Create encrypted container:</div>
                <code className="block px-4 py-3 rounded bg-background text-accent font-mono text-xs">
                  kyberlock create -s 1G -a kyber768-hybrid container.kbl
                </code>
              </div>
              <div>
                <div className="text-sm text-muted mb-2">Create with hidden volume:</div>
                <code className="block px-4 py-3 rounded bg-background text-accent font-mono text-xs">
                  kyberlock create -s 1G --hidden -hs 100M container.kbl
                </code>
              </div>
              <div>
                <div className="text-sm text-muted mb-2">Mount container:</div>
                <code className="block px-4 py-3 rounded bg-background text-accent font-mono text-xs">
                  kyberlock mount container.kbl /mnt/secure
                </code>
              </div>
              <div>
                <div className="text-sm text-muted mb-2">Unmount:</div>
                <code className="block px-4 py-3 rounded bg-background text-accent font-mono text-xs">
                  kyberlock unmount /mnt/secure
                </code>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-accent" />
              GUI Quick Start
            </h3>
            <ol className="space-y-3 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2 font-bold">1.</span>
                <span>Launch <code className="px-1 py-0.5 rounded bg-background text-accent">kyberlock-gui</code></span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2 font-bold">2.</span>
                <span>Click "Create New Container"</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2 font-bold">3.</span>
                <span>Select encryption algorithm (recommended: Hybrid ML-KEM-768 + X25519)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2 font-bold">4.</span>
                <span>Choose container size and location</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2 font-bold">5.</span>
                <span>(Optional) Enable hidden volume with separate password</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2 font-bold">6.</span>
                <span>Set strong passwords for outer and hidden volumes</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2 font-bold">7.</span>
                <span>Wait for secure random data generation</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2 font-bold">8.</span>
                <span>Mount and use your encrypted container</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Installation Options */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">Installation Options</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2 text-accent" />
              Pre-built Binaries
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>• Windows (x64) - Installer & Portable</li>
              <li>• macOS (Universal Binary) - DMG</li>
              <li>• Linux (AppImage) - Run anywhere</li>
              <li>• Linux (DEB/RPM) - Package managers</li>
            </ul>
          </div>

          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2 text-accent" />
              Package Managers
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-muted mb-1">Ubuntu/Debian:</div>
                <code className="block px-2 py-1 rounded bg-background text-accent font-mono text-xs">
                  apt install kyberlock
                </code>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">Fedora:</div>
                <code className="block px-2 py-1 rounded bg-background text-accent font-mono text-xs">
                  dnf install kyberlock
                </code>
              </div>
              <div>
                <div className="text-xs text-muted mb-1">macOS (Homebrew):</div>
                <code className="block px-2 py-1 rounded bg-background text-accent font-mono text-xs">
                  brew install kyberlock
                </code>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-accent" />
              Build from Source
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>• Full source code available</li>
              <li>• CMake or GNU Make support</li>
              <li>• Comprehensive test suite</li>
              <li>• Security audit documentation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Dependencies & Requirements */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">Technical Requirements</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Build Dependencies</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Compiler:</strong> GCC 9+ or Clang 10+</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Build System:</strong> CMake 3.15+ or GNU Make</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>liboqs:</strong> 0.11.0+ (post-quantum crypto library)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>OpenSSL:</strong> 3.0+ (classical cryptography)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>GTK3:</strong> GUI framework (optional)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>libargon2:</strong> Memory-hard KDF</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>libsodium:</strong> Modern cryptography library</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Runtime Requirements</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Operating System:</strong> Windows 10+, macOS 10.15+, Linux kernel 4.4+</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Architecture:</strong> x86-64 (64-bit)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>RAM:</strong> 512MB minimum (1GB+ recommended)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Storage:</strong> Variable (depends on container size)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Hardware Token:</strong> Optional (YubiKey, etc.)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">Use Cases</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold mb-3">Sensitive Data Protection</h3>
            <p className="text-sm text-muted">
              Secure storage for personal documents, financial records, medical information,
              and intellectual property with quantum-resistant encryption.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
              <EyeOff className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold mb-3">Journalist/Activist Protection</h3>
            <p className="text-sm text-muted">
              Hidden volumes provide plausible deniability for source protection,
              whistleblower communications, and sensitive investigations.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
              <Cloud className="w-6 h-6 text-cyan-500" />
            </div>
            <h3 className="text-lg font-bold mb-3">Secure Cloud Backup</h3>
            <p className="text-sm text-muted">
              Encrypt data before uploading to cloud storage providers,
              maintaining zero-knowledge security with convenient synchronization.
            </p>
          </div>
        </div>
      </section>

      {/* Download/Access Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Enterprise & Government Access</h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            KYBERLOCK is available to SWORD Intelligence clients for secure file encryption
            with post-quantum protection. Contact us for enterprise licensing, custom
            deployment options, and integration support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors font-semibold"
            >
              Request Access
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-border hover:bg-surface transition-colors font-semibold"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-border">
        <div className="p-6 rounded-lg bg-surface border border-border">
          <h3 className="text-lg font-bold mb-4">🔒 Security Notice</h3>
          <div className="text-sm text-muted space-y-2">
            <p>
              <strong>Security Audit:</strong> KYBERLOCK has undergone independent security auditing.
              Review the full security audit report and implementation details in the documentation.
            </p>
            <p>
              <strong>Open Source:</strong> The complete source code is available for review and audit.
              We encourage security researchers to examine the implementation.
            </p>
            <p>
              <strong>Best Practices:</strong> Use strong, unique passwords for both outer and hidden volumes.
              Enable hardware token support when available. Regularly update to the latest version.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
