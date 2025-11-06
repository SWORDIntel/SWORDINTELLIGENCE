'use client';

import Link from 'next/link';
import {
  Radio,
  Shield,
  Smartphone,
  Lock,
  Zap,
  Eye,
  Cpu,
  Battery,
  AlertTriangle,
  CheckCircle2,
  Download,
  Github
} from 'lucide-react';

export default function SwordcommPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b border-border bg-gradient-to-br from-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Radio className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-4">SWORDCOMM</h1>
              <p className="text-2xl text-accent">
                APT-Level Secure Mobile Communications
              </p>
            </div>
          </div>
          <p className="text-xl text-muted leading-relaxed max-w-4xl">
            Military-grade secure messaging for Android and iOS with on-device real-time translation,
            post-quantum encryption, and advanced countermeasures against nation-state surveillance.
            Built on Signal Protocol with hypervisor-level threat detection. Fully functional offline with no server dependencies.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <span className="px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-semibold">
              Android 10+
            </span>
            <span className="px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-semibold">
              iOS 14+ (Coming Soon)
            </span>
            <span className="px-4 py-2 rounded-lg bg-green-500/10 text-green-500 text-sm font-semibold">
              Post-Quantum Secure
            </span>
            <span className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 text-sm font-semibold">
              EL2 Detection
            </span>
          </div>
        </div>
      </section>

      {/* Security Warning */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/30">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-2">Security-First Design</h3>
              <p className="text-muted leading-relaxed">
                SWORDCOMM implements aggressive countermeasures against sophisticated surveillance.
                Designed for users under active nation-state surveillance with confirmed EL2
                (hypervisor-level) compromise. This system will consume significant battery, generate
                heat, and use considerable resources to protect your communications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12">Core Capabilities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Post-Quantum Encryption */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Post-Quantum Encryption</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Kyber-1024 key exchange (NIST PQC)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Forward secrecy with 5-minute key rotation</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>AES-256-GCM + HMAC-SHA256</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>End-to-end encrypted by default</span>
              </li>
            </ul>
          </div>

          {/* Real-Time Translation */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-Time Translation</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Danish-English translation (more languages coming)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span><strong>On-device AI primary</strong> with INT8 quantization (MarianMT/OPUS)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Optional network offloading to secure servers (fallback to on-device if unavailable)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Encrypted translation caching for performance</span>
              </li>
            </ul>
          </div>

          {/* EL2 Hypervisor Detection */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Hypervisor Detection</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Hardware performance counter analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Multi-vector threat analysis (99% accuracy)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Memory forensics and cache monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Timing deviation detection (μs precision)</span>
              </li>
            </ul>
          </div>

          {/* Adaptive Countermeasures */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Adaptive Countermeasures</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Chaos intensity scaling (10-200%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Memory scrambling and secure wiping</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Cache poisoning for side-channel prevention</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Decoy operations (10-90% fake traffic)</span>
              </li>
            </ul>
          </div>

          {/* Input Security */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Input Security</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Secure wrapper for FlorisBoard keyboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>FUTO Voice Input integration</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Keystroke timing randomization</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Real-time threat response during input</span>
              </li>
            </ul>
          </div>

          {/* Hardware Acceleration */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Hardware Acceleration</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Optimized for Google Tensor NPU</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Pixel 6A: 3.2 TOPS (Tensor G1)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>Pixel 8A: 5.1 TOPS (Tensor G3)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                <span>ARM64-v8a architecture required</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Threat Response Levels */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">Adaptive Threat Response</h2>
        <p className="text-muted mb-12 max-w-3xl">
          SWORDCOMM automatically adjusts security countermeasures based on detected threat level.
          Higher threat levels activate more aggressive defensive measures.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-border rounded-lg">
            <thead className="bg-surface">
              <tr>
                <th className="text-left p-4 border-b border-border">Threat Level</th>
                <th className="text-left p-4 border-b border-border">Chaos %</th>
                <th className="text-left p-4 border-b border-border">Decoy Traffic</th>
                <th className="text-left p-4 border-b border-border">Memory Defense</th>
                <th className="text-left p-4 border-b border-border">Cache Poisoning</th>
                <th className="text-left p-4 border-b border-border">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-border">
                <td className="p-4">0-35% (Baseline)</td>
                <td className="p-4">10%</td>
                <td className="p-4">10%</td>
                <td className="p-4">No</td>
                <td className="p-4">No</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs">
                    Monitoring
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4">35-65% (Elevated)</td>
                <td className="p-4">60%</td>
                <td className="p-4">30%</td>
                <td className="p-4">Yes</td>
                <td className="p-4">No</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs">
                    Enhanced
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4">65-85% (High)</td>
                <td className="p-4">100%</td>
                <td className="p-4">50%</td>
                <td className="p-4">Yes</td>
                <td className="p-4">Yes</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded bg-orange-500/10 text-orange-500 text-xs">
                    High Security
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="p-4">85-95% (Critical)</td>
                <td className="p-4">150%</td>
                <td className="p-4">70%</td>
                <td className="p-4">Yes</td>
                <td className="p-4">Yes</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded bg-red-500/10 text-red-500 text-xs">
                    Maximum
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-4">95-100% (Nuclear)</td>
                <td className="p-4">200%</td>
                <td className="p-4">90%</td>
                <td className="p-4">Yes</td>
                <td className="p-4">Yes</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded bg-red-500/20 text-red-500 text-xs font-bold">
                    NUCLEAR
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">Performance Metrics</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pixel 8A */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Smartphone className="w-5 h-5 mr-2 text-accent" />
              Google Pixel 8A (Tensor G3)
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU Usage</span>
                  <span className="text-accent">10% → 45%</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memory</span>
                  <span className="text-accent">200MB → 4GB</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Battery Life</span>
                  <span className="text-red-500">24hr → 16hr (-33%)</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Temperature</span>
                  <span className="text-orange-500">32°C → 42°C</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Translation Latency</span>
                  <span className="text-accent">50ms → 200ms</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pixel 6A */}
          <div className="p-6 rounded-lg border border-border bg-surface">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Smartphone className="w-5 h-5 mr-2 text-accent" />
              Google Pixel 6A (Tensor G1)
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU Usage</span>
                  <span className="text-accent">12% → 55%</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '55%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memory</span>
                  <span className="text-accent">250MB → 3GB</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Battery Life</span>
                  <span className="text-red-500">22hr → 14hr (-36%)</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '64%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Temperature</span>
                  <span className="text-orange-500">33°C → 44°C</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '73%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Translation Latency</span>
                  <span className="text-accent">100ms → 400ms</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '50%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Effectiveness */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">Countermeasure Effectiveness</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="text-4xl font-bold text-green-500 mb-2">99%</div>
            <div className="text-sm text-muted">EL2 Detection Rate</div>
          </div>
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="text-4xl font-bold text-green-500 mb-2">90-97%</div>
            <div className="text-sm text-muted">Data Exfiltration Degradation</div>
          </div>
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="text-4xl font-bold text-green-500 mb-2">87-93%</div>
            <div className="text-sm text-muted">Timing Analysis Disruption</div>
          </div>
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="text-4xl font-bold text-green-500 mb-2">88-94%</div>
            <div className="text-sm text-muted">Cache Attack Prevention</div>
          </div>
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="text-4xl font-bold text-green-500 mb-2">85-92%</div>
            <div className="text-sm text-muted">Memory Forensics Resistance</div>
          </div>
          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="text-4xl font-bold text-accent mb-2">5min</div>
            <div className="text-sm text-muted">Key Rotation Interval</div>
          </div>
        </div>
      </section>

      {/* Intimate Protection Mode */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <div className="p-8 rounded-lg bg-accent/5 border border-accent/20">
          <h2 className="text-3xl font-bold mb-6">Intimate Protection Mode</h2>
          <p className="text-muted mb-6 leading-relaxed">
            Apply maximum security countermeasures to specific conversations without impacting
            battery life across all communications. Perfect for protecting sensitive contacts under
            active surveillance while maintaining normal operation for routine messages.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">Per-Contact Security</div>
                <div className="text-sm text-muted">Enable maximum protection for specific conversations</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">Battery Optimization</div>
                <div className="text-sm text-muted">Other contacts remain at normal security level</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">One-Touch Activation</div>
                <div className="text-sm text-muted">Long-press contact name to enable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">Technical Specifications</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Platform Requirements</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Android 10 (API 29) or higher</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>ARM64-v8a architecture</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>4GB RAM minimum (6GB+ recommended)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>500MB free storage for models</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Google Tensor NPU (recommended)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Security Features</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Kyber-1024 post-quantum key exchange</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>AES-256-GCM authenticated encryption</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Hardware performance counter analysis</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Memory scrambling and secure wiping</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Timing obfuscation and decoy traffic</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">Development Roadmap</h2>
        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-green-500/30 bg-green-500/5">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <h3 className="text-xl font-semibold">v1.0 - Released</h3>
            </div>
            <ul className="space-y-1 text-sm text-muted ml-8">
              <li>• Danish-English translation with MarianMT</li>
              <li>• EL2 hypervisor detection and countermeasures</li>
              <li>• Kyber-1024 post-quantum encryption</li>
              <li>• FlorisBoard and FUTO Voice security wrapper</li>
              <li>• Intimate Protection Mode</li>
            </ul>
          </div>

          <div className="p-6 rounded-lg border border-accent/30 bg-accent/5">
            <div className="flex items-center space-x-3 mb-3">
              <Battery className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">v1.5 - In Development</h3>
            </div>
            <ul className="space-y-1 text-sm text-muted ml-8">
              <li>• iOS version (Signal-iOS based)</li>
              <li>• Additional language pairs (Spanish, Arabic, Mandarin)</li>
              <li>• Enhanced battery optimization</li>
              <li>• Advanced threat detection ML models</li>
            </ul>
          </div>

          <div className="p-6 rounded-lg border border-border bg-surface">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-5 h-5 text-muted" />
              <h3 className="text-xl font-semibold">v2.0 - Planned</h3>
            </div>
            <ul className="space-y-1 text-sm text-muted ml-8">
              <li>• Voice call encryption with PQC</li>
              <li>• Video call support</li>
              <li>• Enhanced NPU acceleration for newer Tensor chips</li>
              <li>• Integration with SWORD Intelligence platform</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Download/Access Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Restricted Access</h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">
            SWORDCOMM is available exclusively to vetted SWORD Intelligence clients.
            All prospective users undergo identity verification, sanctions screening,
            and threat assessment before access is granted.
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

      {/* Legal Notice */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-border">
        <div className="p-6 rounded-lg bg-surface border border-border">
          <h3 className="text-lg font-bold mb-4">⚖️ Legal & Export Control Notice</h3>
          <div className="text-sm text-muted space-y-2">
            <p>
              <strong>Export Control:</strong> This software includes cryptographic components
              that may be subject to export restrictions under U.S. law (EAR, ITAR) and
              international regulations.
            </p>
            <p>
              <strong>Intended Use:</strong> SWORDCOMM is designed for lawful defensive security
              purposes only. Users are responsible for complying with all applicable laws and
              regulations in their jurisdiction.
            </p>
            <p>
              <strong>No Warranty:</strong> This software is provided "as is" without warranty
              of any kind, express or implied.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
