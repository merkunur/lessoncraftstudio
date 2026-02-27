'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { SalesPageConfig } from '@/config/sales-pages';

interface Props {
  config: SalesPageConfig;
  locale: string;
}

/* ─── SVG Icon Paths (Heroicons Outline 24x24) ─── */

const PATHS: Record<string, string> = {
  grid: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
  images: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z',
  edit: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM19.5 7.125L16.862 4.487M12 15.75h6.75',
  download: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
  type: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
  shield: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  palette: 'M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z',
  sliders: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75',
  rocket: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
  store: 'M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z',
  book: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
  users: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
  check: 'M5 13l4 4L19 7',
  'chevron-down': 'M19 9l-7 7-7-7',
  'arrow-right': 'M17 8l4 4m0 0l-4 4m4-4H3',
  xmark: 'M6 18L18 6M6 6l12 12',
  clock: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  sparkles: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z',
  globe: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
};

function Icon({ name, className, weight }: { name: string; className?: string; weight?: number }) {
  return (
    <svg className={className || 'w-6 h-6'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={weight || 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={PATHS[name] || PATHS.grid} />
    </svg>
  );
}

/* ─── Static Word Search Mockup Data ─── */

const MOCKUP_ROWS = ['CATXRBME', 'DOGSAPLF', 'WHZJBTNI', 'BIRDQOFS', 'MKQYIVGH', 'PFROTAXZ', 'VCOWNDHL', 'SNAKETUR'];
const MOCKUP_HL = new Set(['0,0','0,1','0,2','1,0','1,1','1,2','3,0','3,1','3,2','3,3','6,1','6,2','6,3','7,0','7,1','7,2','7,3','7,4']);
const MOCKUP_WORDS = [{ word: 'CAT', found: true }, { word: 'DOG', found: true }, { word: 'BIRD', found: false }, { word: 'COW', found: false }, { word: 'SNAKE', found: false }];

const FLAG_EMOJI: Record<string, string> = {
  gb: '\ud83c\uddec\ud83c\udde7', de: '\ud83c\udde9\ud83c\uddea', fr: '\ud83c\uddeb\ud83c\uddf7',
  es: '\ud83c\uddea\ud83c\uddf8', pt: '\ud83c\uddf5\ud83c\uddf9', it: '\ud83c\uddee\ud83c\uddf9',
  nl: '\ud83c\uddf3\ud83c\uddf1', se: '\ud83c\uddf8\ud83c\uddea', dk: '\ud83c\udde9\ud83c\uddf0',
  no: '\ud83c\uddf3\ud83c\uddf4', fi: '\ud83c\uddeb\ud83c\uddee',
};

/* ─── Common Styles ─── */

const headingFont = { fontFamily: 'var(--font-poppins), system-ui, sans-serif' };

/* ─── CTA Button ─── */

function CTAButton({ text, price, href, variant = 'gradient', size = 'lg' }: {
  text: string; price: number; href: string; variant?: 'gradient' | 'solid'; size?: 'lg' | 'md';
}) {
  const isExternal = href.startsWith('http');
  const sz = size === 'lg' ? 'px-10 py-5 text-lg' : 'px-8 py-4 text-base';
  const bg = variant === 'gradient'
    ? { background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)', boxShadow: '0 0 40px rgba(6,182,212,0.3), 0 0 80px rgba(168,85,247,0.15)' }
    : { background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', boxShadow: '0 0 30px rgba(6,182,212,0.3)' };

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group relative inline-flex items-center justify-center gap-3 ${sz} rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
      style={bg}
    >
      <span className="relative z-10 flex items-center gap-2">
        {text} &mdash; ${price}
        <Icon name="arrow-right" className="w-5 h-5" weight={2} />
      </span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </a>
  );
}

/* ─── FAQ Item ─── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left cursor-pointer">
        <span className="text-lg font-semibold text-white/90 pr-4">{question}</span>
        <span className={`flex-shrink-0 text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <Icon name="chevron-down" className="w-5 h-5" weight={2} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-white/60 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════ */

export function SalesPageClient({ config, locale }: Props) {
  if (config.isOto) {
    return <OTOLayout config={config} />;
  }
  return <FELayout config={config} locale={locale} />;
}

/* ═══════════════════════════════════════════════════
   FE LAYOUT — 21-SECTION SALES PAGE
═══════════════════════════════════════════════════ */

function FELayout({ config, locale }: Props) {
  const ctaHref = config.checkoutUrl || '#pricing';

  return (
    <div className="min-h-screen">

      {/* ═══ 1. HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #030305 0%, #0a0a1a 25%, #0f0f2a 50%, #0a1628 75%, #051020 100%)' }} />
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', top: '-25%', right: '-15%', animation: 'pulse 8s ease-in-out infinite' }} />
          <div className="absolute w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)', bottom: '-15%', left: '-10%', animation: 'pulse 10s ease-in-out infinite reverse' }} />
        </div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            {config.hero.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.15) 100%)', border: '1px solid rgba(6,182,212,0.25)' }}>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-medium text-cyan-300">{config.hero.badge}</span>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6" style={headingFont}>
              <span className="text-white">Create Professional </span>
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)' }}>Word Search Puzzles</span>
              <br />
              <span className="text-white">in Minutes</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">{config.hero.subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <CTAButton text={config.hero.ctaPrimary} price={config.pricing.price} href={ctaHref} />
              {config.hero.ctaSecondary && (
                <Link href={config.freeAppUrl} className="group px-8 py-4 rounded-xl font-semibold text-white/80 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
                  {config.hero.ctaSecondary}
                  <Icon name="arrow-right" className="w-5 h-5" weight={2} />
                </Link>
              )}
            </div>
            {config.hero.trustBadges && (
              <div className="flex flex-wrap gap-6 justify-center">
                {config.hero.trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                    <Icon name="check" className="w-4 h-4 text-emerald-400" weight={2} />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0a1a]" />
      </section>

      {/* ═══ 2. TESTIMONIAL ═══ */}
      {config.testimonial && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-5xl text-cyan-400/30 mb-4 leading-none">&ldquo;</div>
              <blockquote className="text-xl sm:text-2xl text-white/80 italic leading-relaxed mb-6">{config.testimonial.quote}</blockquote>
              <p className="font-semibold text-white">{config.testimonial.name}</p>
              <p className="text-white/50 text-sm">{config.testimonial.role}</p>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 3. FEATURES GRID ═══ */}
      {config.features && (
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 30%, #fde68a 60%, #fef3c7 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-amber-200/50 border border-amber-300">
                <Icon name="sparkles" className="w-4 h-4 text-amber-700" />
                <span className="text-sm font-medium text-amber-800">What You Get</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4" style={headingFont}>Everything Included</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">One purchase. All features. No upsells for basic functionality.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {config.features.map((f, i) => (
                <div key={i} className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon name={f.icon} />
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-3" style={headingFont}>{f.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-600">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 4. MARKET STATS ═══ */}
      {config.marketStats && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={headingFont}>{config.marketStats.headline}</h2>
              <p className="text-lg text-white/50 mb-12">{config.marketStats.description}</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {config.marketStats.stats.map((s, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-3xl font-black text-cyan-400 mb-2">{s.value}</div>
                    <div className="text-sm text-white/50">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 5. INCOME POTENTIAL ═══ */}
      {config.incomePotential && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-6" style={headingFont}>{config.incomePotential.headline}</h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">{config.incomePotential.description}</p>
              <div className="inline-block bg-white rounded-2xl px-8 py-6 shadow-lg border border-stone-200">
                <p className="text-xl sm:text-2xl font-black text-emerald-600">{config.incomePotential.calculation}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 6. MID-PAGE CTA ═══ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0f0f2a 0%, #0a0a1a 100%)' }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)', top: '-40%', left: '20%' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CTAButton text={config.hero.ctaPrimary} price={config.pricing.price} href={ctaHref} />
          <p className="mt-4 text-white/30 text-sm">{config.guarantee.days}-Day Money-Back Guarantee &middot; {config.pricing.label}</p>
        </div>
      </section>

      {/* ═══ 7. OBSTACLES ═══ */}
      {config.obstacles && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fffbeb 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-8 text-center" style={headingFont}>{config.obstacles.headline}</h2>
              <div className="space-y-4 mb-8">
                {config.obstacles.problems.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/60 rounded-xl p-4">
                    <Icon name="xmark" className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" weight={2} />
                    <span className="text-stone-700">{p}</span>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-2">The Solution:</h3>
                <p className="text-emerald-700 leading-relaxed">{config.obstacles.solution}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 8. PRODUCT INTRODUCTION ═══ */}
      {config.productIntro && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center" style={headingFont}>{config.productIntro.headline}</h2>
              <p className="text-lg text-white/60 leading-relaxed mb-10 text-center">{config.productIntro.description}</p>
              <div className="space-y-4">
                {config.productIntro.differentiators.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <Icon name="check" className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" weight={2} />
                    <span className="text-white/70">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 9. BEFORE / AFTER ═══ */}
      {config.beforeAfter && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="rounded-2xl p-6 bg-red-50 border border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-5">Without This Tool</h3>
                {config.beforeAfter.before.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3">
                    <Icon name="xmark" className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" weight={2} />
                    <span className="text-red-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-6 bg-emerald-50 border border-emerald-200">
                <h3 className="text-xl font-bold text-emerald-800 mb-5">With Word Search Generator</h3>
                {config.beforeAfter.after.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3">
                    <Icon name="check" className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" weight={2} />
                    <span className="text-emerald-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 10. OWNERSHIP / RIGHTS ═══ */}
      {config.ownership && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {config.ownership.map((card, i) => {
                const colors = ['from-cyan-500 to-blue-600', 'from-violet-500 to-purple-600', 'from-pink-500 to-rose-600'];
                return (
                  <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[i]} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                      <Icon name={card.icon} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-sm text-white/50">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 11. STATIC DEMO ═══ */}
      {config.demo && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 30%, #f8fafc 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4" style={headingFont}>See What You Can Create</h2>
              <p className="text-lg text-stone-600">A word search puzzle generated in under 3 minutes.</p>
            </div>
            <div className="max-w-lg mx-auto">
              {/* Browser chrome */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-stone-200">
                <div className="flex items-center gap-2 px-5 py-3 bg-stone-100 border-b border-stone-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-stone-400 max-w-xs mx-auto text-center border border-stone-200">
                      lessoncraftstudio.com
                    </div>
                  </div>
                </div>
                {/* Puzzle mockup */}
                <div className="bg-white p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-stone-800 mb-4 text-center">Animals Word Search</h3>
                  <div className="grid grid-cols-8 gap-1 max-w-xs mx-auto mb-4">
                    {MOCKUP_ROWS.map((row, r) =>
                      row.split('').map((letter, c) => (
                        <div
                          key={`${r},${c}`}
                          className={`aspect-square flex items-center justify-center font-mono font-bold text-xs sm:text-sm rounded ${
                            MOCKUP_HL.has(`${r},${c}`) ? 'bg-cyan-100 text-cyan-700' : 'bg-stone-50 text-stone-500'
                          }`}
                        >
                          {letter}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {MOCKUP_WORDS.map((w, i) => (
                      <span key={i} className={`text-sm font-medium px-2 py-1 rounded ${w.found ? 'bg-cyan-50 text-cyan-600 line-through' : 'text-stone-500'}`}>
                        {w.word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Try free link */}
              {config.demo.freeUrl && (
                <div className="text-center mt-6">
                  <Link href={config.demo.freeUrl} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-cyan-700 bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 transition-colors">
                    Try It Free
                    <Icon name="arrow-right" className="w-4 h-4" weight={2} />
                  </Link>
                  <p className="text-stone-400 text-xs mt-2">Free version adds a watermark to exports</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 12. HOW IT WORKS (STEPS) ═══ */}
      {config.steps && (
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fffbeb 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4" style={headingFont}>How Simple Is It?</h2>
              <p className="text-lg text-stone-600">From idea to sellable PDF in under 3 minutes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {config.steps.map((step) => (
                <div key={step.number} className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl mx-auto mb-6 border-4 border-white">
                    {step.number}
                  </div>
                  {step.number < (config.steps?.length || 0) && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-amber-300 to-orange-300" />
                  )}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-700 mx-auto mb-4">
                      <Icon name={step.icon} />
                    </div>
                    <h3 className="text-xl font-bold text-stone-800 mb-3">{step.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 13. SHOWCASE ═══ */}
      {config.showcase && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center" style={headingFont}>{config.showcase.headline}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {config.showcase.items.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 14. AUDIENCES ═══ */}
      {config.audiences && (
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4" style={headingFont}>Built for Creators Who Sell</h2>
              <p className="text-lg text-stone-600">Whether you sell digital products, publish books, or create classroom materials.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {config.audiences.map((a, i) => {
                const gradients = ['from-cyan-500 to-blue-600', 'from-violet-500 to-purple-600', 'from-pink-500 to-rose-600', 'from-amber-500 to-orange-600'];
                return (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center text-white mb-4 shadow-lg`}>
                      <Icon name={a.icon} />
                    </div>
                    <h3 className="text-lg font-bold text-stone-800 mb-2">{a.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{a.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 15-16. VALUE STACK + BONUSES (Pricing Card) ═══ */}
      <section id="pricing" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 70%, #0f172a 100%)' }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)', top: '-20%', right: '-10%' }} />
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)', bottom: '-15%', left: '-5%' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="relative rounded-3xl p-1" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)' }}>
              <div className="bg-[#0f0f2a] rounded-[1.35rem] p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center" style={headingFont}>{config.valueStack.headline}</h2>

                {/* Value items */}
                {config.valueStack.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Icon name="check" className="w-4 h-4 text-emerald-400 flex-shrink-0" weight={2} />
                      <span className="text-white/80 text-sm truncate">{item.name}</span>
                    </div>
                    <span className="text-white/40 text-sm ml-4 flex-shrink-0">${item.value} value</span>
                  </div>
                ))}

                {/* Bonus items */}
                {config.bonuses?.map((bonus, i) => (
                  <div key={`b${i}`} className="flex items-center justify-between py-3 border-b border-amber-500/20">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Icon name="sparkles" className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-amber-300 text-sm truncate">BONUS: {bonus.name}</span>
                    </div>
                    <span className="text-amber-400/60 text-sm ml-4 flex-shrink-0">${bonus.value} value</span>
                  </div>
                ))}

                {/* Totals */}
                <div className="mt-6 pt-4 border-t-2 border-cyan-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/40">Total Value:</span>
                    <span className="text-white/40 line-through text-lg">
                      ${config.valueStack.totalValue + (config.bonuses?.reduce((s, b) => s + b.value, 0) || 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-xl">Your Price Today:</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/30 line-through">${config.pricing.comparePrice}</span>
                      <span className="text-4xl font-black text-cyan-400">${config.valueStack.yourPrice}</span>
                    </div>
                  </div>
                  <p className="text-white/30 text-xs mt-1 text-right">{config.pricing.label}</p>
                </div>

                {/* CTA */}
                <div className="text-center mt-8">
                  <CTAButton text={config.hero.ctaPrimary} price={config.pricing.price} href={ctaHref} size="md" />
                </div>

                {/* Guarantee badge */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <Icon name="shield" className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">{config.guarantee.days}-Day Money-Back Guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary link */}
            {config.freeAppUrl && (
              <div className="text-center mt-6">
                <Link href={config.freeAppUrl} className="text-white/40 hover:text-white/60 text-sm underline underline-offset-4 transition-colors">
                  Or try free with watermark first
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ 17. GUARANTEE ═══ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0a0a1a 100%)' }} />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 mb-6">
              <Icon name="shield" className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={headingFont}>
              {config.guarantee.days}-Day Money-Back Guarantee
            </h3>
            <p className="text-white/60 leading-relaxed">{config.guarantee.text}</p>
          </div>
        </div>
      </section>

      {/* ═══ 18. URGENCY ═══ */}
      {config.urgency && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #451a03 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Icon name="clock" className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={headingFont}>{config.urgency.headline}</h3>
            <p className="text-amber-200/80 max-w-xl mx-auto mb-6">{config.urgency.text}</p>
            <div className="inline-flex items-center gap-4">
              <span className="text-amber-400/60 line-through text-xl">${config.urgency.regularPrice}</span>
              <span className="text-4xl font-black text-white">${config.pricing.price}</span>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 19. FAQ ═══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #030305 100%)' }} />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center" style={headingFont}>Frequently Asked Questions</h2>
            <div>
              {config.faq.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 20-21. P.S. + FINAL CTA ═══ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030305 0%, #0a0a1a 50%, #0f0f2a 100%)' }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)', bottom: '-20%', right: '10%' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {config.closingPs && (
              <div className="mb-12">
                <p className="text-sm font-bold text-white/40 mb-3">P.S.</p>
                <p className="text-white/60 leading-relaxed">{config.closingPs}</p>
              </div>
            )}
            <CTAButton text={config.hero.ctaPrimary} price={config.pricing.price} href={ctaHref} />
            <p className="mt-4 text-white/30 text-sm">
              {config.guarantee.days}-Day Money-Back Guarantee &middot; {config.pricing.label}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   OTO LAYOUT — CONDENSED FUNNEL PAGE
═══════════════════════════════════════════════════ */

function OTOLayout({ config }: { config: SalesPageConfig }) {
  const ctaHref = config.checkoutUrl || '#pricing';

  return (
    <div className="min-h-screen" style={{ background: '#030305' }}>

      {/* ═══ OTO HERO ═══ */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #030305 0%, #0a0a1a 30%, #0f0f2a 60%, #0a1628 100%)' }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', top: '-30%', right: '-15%', animation: 'pulse 8s ease-in-out infinite' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {config.hero.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.15) 100%)', border: '1px solid rgba(6,182,212,0.25)' }}>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-medium text-cyan-300">{config.hero.badge}</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-white mb-6" style={headingFont}>
              {config.hero.headline}
            </h1>
            <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">{config.hero.subheadline}</p>
            <CTAButton text={config.hero.ctaPrimary} price={config.pricing.price} href={ctaHref} variant="solid" />
            {config.hero.trustBadges && (
              <div className="flex flex-wrap gap-4 justify-center mt-6">
                {config.hero.trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                    <Icon name="check" className="w-4 h-4 text-emerald-400" weight={2} />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ OTO: COMPARISON (OTO1) ═══ */}
      {config.comparison && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Current */}
              <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold text-white/60 mb-4">{config.comparison.current.label}</h3>
                {config.comparison.current.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 mb-3 text-white/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              {/* Upgrade */}
              <div className="rounded-2xl p-6 bg-cyan-500/10 border border-cyan-500/30">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">{config.comparison.upgrade.label}</h3>
                {config.comparison.upgrade.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 mb-3 text-white/80">
                    <Icon name="check" className="w-4 h-4 text-cyan-400 flex-shrink-0" weight={2} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ OTO: STEPS (OTO2 — How It Works) ═══ */}
      {config.steps && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center" style={headingFont}>How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {config.steps.map((step) => (
                <div key={step.number} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ OTO: THEME CATEGORIES (OTO1) ═══ */}
      {config.themeCategories && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0f0f2a 0%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center" style={headingFont}>{config.themeCategories.headline}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {config.themeCategories.categories.map((cat, i) => (
                <div key={i} className={`px-4 py-3 rounded-xl text-center ${cat.count > 0 ? 'bg-white/5 border border-white/10' : 'bg-cyan-500/10 border border-cyan-500/20'}`}>
                  <span className="text-white/80 text-sm font-medium">{cat.name}</span>
                  {cat.count > 0 && <span className="text-white/40 text-xs ml-1">({cat.count})</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ OTO: LANGUAGES GRID (OTO2) ═══ */}
      {config.languagesGrid && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0f0f2a 0%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center" style={headingFont}>{config.languagesGrid.headline}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {config.languagesGrid.languages.map((lang, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-2xl">{FLAG_EMOJI[lang.flag] || ''}</span>
                  <span className="text-white/80 font-medium text-sm">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ OTO: CONTENT MATH (OTO1) ═══ */}
      {config.contentMath && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={headingFont}>{config.contentMath.headline}</h2>
              <p className="text-white/60 leading-relaxed">{config.contentMath.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* ═══ OTO: MARKET EXPANSION (OTO2) ═══ */}
      {config.marketExpansion && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={headingFont}>{config.marketExpansion.headline}</h2>
              <p className="text-white/60 leading-relaxed">{config.marketExpansion.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* ═══ OTO: VALUE STACK ═══ */}
      <section id="pricing" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f172a 100%)' }} />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="relative rounded-3xl p-1" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' }}>
              <div className="bg-[#0f0f2a] rounded-[1.35rem] p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center" style={headingFont}>{config.valueStack.headline}</h2>
                {config.valueStack.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Icon name="check" className="w-4 h-4 text-emerald-400 flex-shrink-0" weight={2} />
                      <span className="text-white/80 text-sm">{item.name}</span>
                    </div>
                    <span className="text-white/40 text-sm ml-4 flex-shrink-0">${item.value} value</span>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t-2 border-cyan-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/40">Total Value:</span>
                    <span className="text-white/40 line-through text-lg">${config.valueStack.totalValue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-lg">Your Price:</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/30 line-through">${config.pricing.comparePrice}</span>
                      <span className="text-4xl font-black text-cyan-400">${config.valueStack.yourPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <CTAButton text={config.hero.ctaPrimary} price={config.pricing.price} href={ctaHref} variant="solid" size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OTO: GUARANTEE ═══ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0a0a1a 100%)' }} />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 mb-4">
              <Icon name="shield" className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{config.guarantee.days}-Day Money-Back Guarantee</h3>
            <p className="text-white/50 text-sm leading-relaxed">{config.guarantee.text}</p>
          </div>
        </div>
      </section>

      {/* ═══ OTO: FAQ ═══ */}
      {config.faq.length > 0 && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)' }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8 text-center" style={headingFont}>Questions?</h2>
              {config.faq.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ OTO: FINAL CTA + DECLINE ═══ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030305 0%, #0a0a1a 100%)' }} />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <CTAButton text={config.hero.ctaPrimary} price={config.pricing.price} href={ctaHref} variant="solid" />
            <p className="mt-4 text-white/30 text-sm">{config.guarantee.days}-Day Money-Back Guarantee &middot; {config.pricing.label}</p>
            {config.declineText && (
              <div className="mt-8">
                <a href="#" className="text-white/40 hover:text-white/60 text-sm underline underline-offset-4 transition-colors">
                  {config.declineText}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
