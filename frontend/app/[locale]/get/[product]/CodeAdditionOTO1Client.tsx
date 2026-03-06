'use client';

import { useState } from 'react';
import type { SalesPageConfig } from '@/config/sales-pages';
import { Icon, WPBuyButton, WPDisclaimer, ComplianceFooter } from './SalesPageClient';

interface Props {
  config: SalesPageConfig;
  locale: string;
}

/* ═══════════════════════════════════════════════════════
   SAMPLE IMAGE PATHS — Regular vs Word Reveal comparison
   ═══════════════════════════════════════════════════════ */

const CODE_ADDITION_SAMPLES = {
  regularWorksheet: '/samples/english/code%20addition/Code%20Breaker%20Addition%201.webp',
  wordRevealWorksheet: '/samples/english/code%20addition/Code%20Breaker%20Addition%203.webp',
};

/* ═══════════════════════════════════════════════════════
   FAQ ACCORDION — teal palette
   ═══════════════════════════════════════════════════════ */

function CodeFAQItem({ question, answer, idx }: { question: string; answer: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-teal-300/20 ${idx === 0 ? 'border-t' : ''}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left cursor-pointer group">
        <span className="text-lg font-semibold text-white pr-4 group-hover:text-amber-200 transition-colors">{question}</span>
        <span className={`flex-shrink-0 text-teal-300 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <Icon name="chevron-down" className="w-5 h-5" weight={2} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
        <p className="text-teal-200/80 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   AMBER CTA — reusable inline button
   ═══════════════════════════════════════════════════════ */

function AmberCTA({ config }: { config: SalesPageConfig }) {
  if (config.wpButtonImg) {
    return <WPBuyButton config={config} />;
  }
  const text = `${config.hero.ctaPrimary} \u2014 ${config.pricing.currency}${config.pricing.price}`;
  return (
    <a
      href={config.checkoutUrl || '#'}
      className="group inline-flex items-center justify-center gap-2 px-10 py-5 text-lg bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 rounded-xl font-bold text-teal-950 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
    >
      {text}
      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT — OTO1: Word Reveal Mode
   ═══════════════════════════════════════════════════════ */

export default function CodeAdditionOTO1Client({ config, locale }: Props) {
  const { pricing } = config;

  return (
    <>
      {/* ── GLOBAL STYLES ──────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        .ca-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .ca-sans  { font-family: 'Outfit', system-ui, sans-serif; }

        .ca-grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* ═══ 1. HERO ═══════════════════════════════════════════ */}
      <section className="ca-sans relative overflow-hidden bg-teal-950 py-16 md:py-24 lg:py-28">
        {/* Radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(13,148,136,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(20,184,166,0.12),transparent_60%)]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center">
          {config.hero.badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-semibold tracking-wide mb-6 border border-amber-500/20">
              {config.hero.badge}
            </span>
          )}
          <h1 className="ca-serif text-4xl md:text-5xl lg:text-[3.4rem] font-normal text-white mb-6 leading-[1.12] tracking-tight">
            {config.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-teal-200/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            {config.hero.subheadline}
          </p>
          <div className="flex flex-col items-center gap-4 mb-8">
            <AmberCTA config={config} />
          </div>
          {config.hero.trustBadges && (
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              {config.hero.trustBadges.map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-sm text-teal-300/70">
                  <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ 2. COMPARISON ═════════════════════════════════════ */}
      {config.comparison && (
        <section className="ca-sans py-20 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Current (limited) */}
              <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-slate-500 mb-5 flex items-center gap-2">
                  <Icon name="xmark" className="w-5 h-5 text-red-400" weight={2.5} />
                  {config.comparison.current.label}
                </h3>
                <ul className="space-y-3">
                  {config.comparison.current.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                        <Icon name="xmark" className="w-3 h-3 text-red-400" weight={2.5} />
                      </span>
                      <span className="text-slate-500 text-[0.94rem]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upgrade (full) */}
              <div className="rounded-2xl p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200">
                <h3 className="text-base font-bold text-teal-700 mb-5 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {config.comparison.upgrade.label}
                </h3>
                <ul className="space-y-3">
                  {config.comparison.upgrade.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-slate-800 font-medium text-[0.94rem]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 3. WORD REVEAL DEMO — Unique to this OTO ════════ */}
      <section className="ca-sans py-20 md:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 text-center mb-4">See the Difference</h2>
          <p className="text-slate-500 text-center mb-14 max-w-2xl mx-auto">Regular Mode creates standard code breaker worksheets. Word Reveal Mode adds a secret word puzzle layer that combines math with literacy.</p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Regular Mode */}
            <div>
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-sm font-semibold">Regular Mode (Included)</span>
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200">
                <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 text-center">Regular Mode</div>
                </div>
                <img src={CODE_ADDITION_SAMPLES.regularWorksheet} alt="Regular mode code breaker worksheet" className="w-full" loading="lazy" />
              </div>
              <p className="text-sm text-slate-500 text-center mt-3">Students solve equations to decode images</p>
            </div>

            {/* Word Reveal Mode */}
            <div>
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold border border-amber-200">Word Reveal Mode (Upgrade)</span>
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl border-2 border-teal-300">
                <div className="bg-teal-50 px-4 py-2.5 flex items-center gap-2 border-b border-teal-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-teal-600 text-center font-medium">Word Reveal Mode</div>
                </div>
                <img src={CODE_ADDITION_SAMPLES.wordRevealWorksheet} alt="Word Reveal mode code breaker worksheet" className="w-full" loading="lazy" />
              </div>
              <p className="text-sm text-teal-700 text-center mt-3 font-medium">Students solve equations to reveal a secret word</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <AmberCTA config={config} />
          </div>
        </div>
      </section>

      {/* ═══ 4. VALUE STACK ═══════════════════════════════════ */}
      <section className="ca-sans relative ca-grain py-20 md:py-28 bg-teal-950">
        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="ca-serif text-3xl md:text-4xl text-white text-center mb-12">{config.valueStack.headline}</h2>
          <div className="bg-teal-900/50 rounded-2xl p-6 md:p-8 border border-teal-700/40">
            <ul className="space-y-4 mb-8">
              {config.valueStack.items.map((item) => (
                <li key={item.name} className="flex items-center justify-between py-2.5 border-b border-teal-700/30 last:border-0">
                  <span className="flex items-center gap-2 text-teal-100">
                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item.name}
                  </span>
                  <span className="text-teal-400 line-through text-sm">{pricing.currency}{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="text-center border-t border-teal-700/40 pt-6">
              <p className="text-teal-300 mb-2">Total Value: <span className="line-through">{pricing.currency}{config.valueStack.totalValue}</span></p>
              <div className="inline-block bg-amber-500 text-teal-950 text-3xl font-bold px-8 py-3 rounded-xl shadow-lg shadow-amber-500/20">
                Add for {pricing.currency}{config.valueStack.yourPrice}
              </div>
              <p className="text-sm text-teal-400 mt-3">{pricing.label}</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <AmberCTA config={config} />
          </div>
        </div>
      </section>

      {/* ═══ 5. GUARANTEE ═════════════════════════════════════ */}
      <section className="ca-sans py-20 md:py-28 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Icon name="shield" className="w-8 h-8 text-amber-300" />
              </div>
              <h2 className="ca-serif text-2xl md:text-3xl mb-2">{config.guarantee.days}-Day Money-Back Guarantee</h2>
              <p className="text-teal-200 leading-relaxed max-w-xl mx-auto">{config.guarantee.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. FAQ ═══════════════════════════════════════════ */}
      <section className="ca-sans py-20 md:py-28 bg-teal-900">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="ca-serif text-3xl md:text-4xl text-white text-center mb-12">Frequently Asked Questions</h2>
          <div>
            {config.faq.map((item, i) => (
              <CodeFAQItem key={item.question} question={item.question} answer={item.answer} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. FINAL CTA + DECLINE ══════════════════════════ */}
      <section className="ca-sans py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 mb-4">Unlock Word Reveal Mode</h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">Math meets literacy. Secret word puzzles. One-time upgrade.</p>
          <div className="flex flex-col items-center gap-4 mb-6">
            <AmberCTA config={config} />
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {pricing.includes.slice(0, 4).map((inc) => (
                <span key={inc} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {inc}
                </span>
              ))}
            </div>
            <WPDisclaimer config={config} />
          </div>
          {config.declineText && (
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600 underline transition-colors">
              {config.declineText}
            </a>
          )}
        </div>
      </section>

      <ComplianceFooter locale={locale} />
    </>
  );
}
