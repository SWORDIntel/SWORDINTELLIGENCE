import { Hero } from '@/components/hero';
import { ServiceCard } from '@/components/service-card';
import { StatsShowcase } from '@/components/stats-showcase';
import { Search, Zap, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const services = [
    {
      title: 'Intelligence',
      description: 'Proactive threat hunting, OSINT, on-chain forensics, and adversary profiling. We map infrastructures, personas, and flows before they strike.',
      outcome: 'Attribution that stands up. Evidence aligned to evidentiary standards.',
      icon: Search,
      href: '/services/intelligence',
      features: [
        'OSINT & dark-web monitoring',
        'On-chain analytics & blockchain forensics',
        'Threat actor mapping & attribution',
        'Structured reporting for legal use',
      ],
    },
    {
      title: 'Response',
      description: 'When incidents hit, speed matters. DFIR, malware triage, takedown coordination, and lawful referrals to authorities through proper channels.',
      outcome: 'Rapid containment. Coordinated recovery. Admissible evidence.',
      icon: Zap,
      href: '/services/response',
      features: [
        'Digital forensics & incident response',
        'Malware analysis & reverse engineering',
        'Takedown coordination & asset recovery',
        'Law enforcement liaison (proper process)',
      ],
    },
    {
      title: 'Resilience',
      description: 'Hardened systems, secure operations, and executive protection. Memory-safe paths, namespace isolation, identity fragmentation for high-risk principals.',
      outcome: 'Defensible posture. Reduced attack surface. Operational continuity.',
      icon: ShieldCheck,
      href: '/services/resilience',
      features: [
        'Executive cyber protection (UHNWI/C-suite)',
        'Hardened infrastructure & secure enclaves',
        'Identity & operational security (OPSEC)',
        'Security audits & continuous monitoring',
      ],
    },
  ];

  return (
    <>
      <Hero />

      {/* Services Grid */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
              Core Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Three Pillars of Protection
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Intelligence. Response. Resilience. A complete framework for managing
              high-stakes threats across Web3 and traditional infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Showcase */}
      <StatsShowcase />

      {/* Evidence Engine Section */}
      <section className="relative py-24 border-y border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-background"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-12">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-xl blur-xl"></div>
                <TrendingUp className="relative w-6 h-6 text-accent" />
              </div>
              <h2 className="text-4xl font-bold">Evidence Engine</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group p-8 rounded-xl border border-border bg-gradient-to-br from-surface to-surface/50 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 space-y-4">
                <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors">Insights Feed</h3>
                <p className="text-muted leading-relaxed">
                  Real-world case studies, threat intelligence, and operational guidance.
                  Learn from anonymized engagements and stay ahead of emerging tactics.
                </p>
                <Button asChild variant="outline" className="group/btn">
                  <Link href="/insights">
                    Browse Insights
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="group p-8 rounded-xl border border-border bg-gradient-to-br from-surface to-surface/50 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 space-y-4">
                <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors">Case Snapshots</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3 group/item">
                    <span className="text-accent text-lg mt-0.5">▸</span>
                    <span className="text-muted group-hover/item:text-foreground transition-colors">$18M recovered via cross-chain tracing & asset freezes</span>
                  </li>
                  <li className="flex items-start space-x-3 group/item">
                    <span className="text-accent text-lg mt-0.5">▸</span>
                    <span className="text-muted group-hover/item:text-foreground transition-colors">APT attribution leading to coordinated takedowns (3 jurisdictions)</span>
                  </li>
                  <li className="flex items-start space-x-3 group/item">
                    <span className="text-accent text-lg mt-0.5">▸</span>
                    <span className="text-muted group-hover/item:text-foreground transition-colors">Executive protection: prevented targeted phishing campaign (Fortune 500 C-suite)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiator Section */}
      <section className="relative py-24 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Why SWORD When Stakes Are High
            </h2>
            <p className="text-xl text-muted leading-relaxed">
              We blend real-world tradecraft knowledge with lawful methods and defensible
              reporting. Independent, not bound by government secrecy obligations—
              we answer to clients and applicable law.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="group p-8 rounded-xl border border-border bg-gradient-to-br from-background to-surface hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">Lawful Cooperation</h3>
                <p className="text-sm text-muted leading-relaxed">
                  We coordinate with authorities through proper legal channels when necessary,
                  ensuring evidence remains admissible.
                </p>
              </div>
              <div className="group p-8 rounded-xl border border-border bg-gradient-to-br from-background to-surface hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">Independent Posture</h3>
                <p className="text-sm text-muted leading-relaxed">
                  No government secrecy acts or standing NDAs. Our commitments are to
                  clients, professional ethics, and the law.
                </p>
              </div>
              <div className="group p-8 rounded-xl border border-border bg-gradient-to-br from-background to-surface hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">Defensible Methods</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Chain-of-custody, least-intrusive-means principle, and structured
                  reporting that stands up to scrutiny.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <Button asChild size="lg" className="group shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30">
                <Link href="/contact">
                  Schedule Secure Briefing
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
