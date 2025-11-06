'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/theme-provider';
import { ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const { theme } = useTheme();

  return (
    <section className={`relative ${theme === 'ops' ? 'grid-effect' : ''} min-h-[85vh] flex items-center overflow-hidden`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

      {theme === 'ops' && (
        <div className="scanline absolute inset-0 pointer-events-none" />
      )}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Mission Statement */}
          <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm shadow-lg shadow-accent/5">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-mono text-accent font-semibold">TACTICAL INTELLIGENCE // WEB3 & CYBER</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Adversaries don&apos;t play fair.{' '}
            <span className="bg-gradient-to-br from-accent to-accent/70 bg-clip-text text-transparent">
              We do what&apos;s lawful
            </span>
            —and effective.
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            SWORD Intelligence helps funds, founders, and enterprises prevent loss,
            hunt threat actors, and respond fast across Web3 and traditional infrastructure.
          </p>

          {/* Who We Protect Bar */}
          <div className="pt-8">
            <p className="text-sm uppercase tracking-wider text-muted mb-6 font-semibold">Who We Protect</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-mono">
              {['UHNWIs', 'Funds', 'Exchanges', 'Enterprises', 'Government'].map((item) => (
                <span
                  key={item}
                  className="px-5 py-2.5 rounded-lg border border-border bg-gradient-to-br from-surface to-surface/50 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button asChild size="lg" className="group shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30">
              <Link href="/contact">
                Book Secure Briefing
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover:bg-accent/5">
              <Link href="/services">
                Explore Capabilities
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 flex flex-wrap justify-center gap-8 text-sm text-muted">
            <div className="flex items-center space-x-2 group">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
              <span className="group-hover:text-foreground transition-colors">ICD-203 Standards</span>
            </div>
            <div className="flex items-center space-x-2 group">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
              <span className="group-hover:text-foreground transition-colors">Chain-of-Custody</span>
            </div>
            <div className="flex items-center space-x-2 group">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
              <span className="group-hover:text-foreground transition-colors">Lawful Methodologies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
