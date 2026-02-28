'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { SalesPageConfig } from '@/config/sales-pages';
import { Icon, WPBuyButton, WPDisclaimer, ComplianceFooter } from './SalesPageClient';

interface Props {
  config: SalesPageConfig;
  locale: string;
}

/* ═══════════════════════════════════════════════════════
   ANIMATED PUZZLE GRID — Hero visual
   ═══════════════════════════════════════════════════════ */

const PUZZLE_EQUATIONS = [
  { eq: '7 + 5', ans: 12 },
  { eq: '12 \u2212 3', ans: 9 },
  { eq: '8 + 6', ans: 14 },
  { eq: '15 \u2212 7', ans: 8 },
  { eq: '3 + 9', ans: 12 },
  { eq: '11 \u2212 4', ans: 7 },
  { eq: '6 + 8', ans: 14 },
  { eq: '16 \u2212 9', ans: 7 },
  { eq: '4 + 7', ans: 11 },
];

function PuzzleGrid() {
  return (
    <div className="mp-puzzle-grid" aria-hidden="true">
      <div className="mp-grid-inner">
        {PUZZLE_EQUATIONS.map((p, i) => (
          <div key={i} className="mp-piece" style={{ animationDelay: `${i * 0.15}s` }}>
            <span className="mp-piece-num">#{p.ans}</span>
            <span className="mp-piece-eq">{p.eq} = ?</span>
          </div>
        ))}
      </div>
      <div className="mp-grid-shimmer" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
   ═══════════════════════════════════════════════════════ */

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref}
      className={`${className} mp-reveal ${visible ? 'mp-revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FAQ ACCORDION — indigo palette
   ═══════════════════════════════════════════════════════ */

function MathFAQItem({ question, answer, idx }: { question: string; answer: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-indigo-300/20 ${idx === 0 ? 'border-t' : ''}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left cursor-pointer group">
        <span className="text-lg font-semibold text-white pr-4 group-hover:text-amber-200 transition-colors">{question}</span>
        <span className={`flex-shrink-0 text-indigo-300 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <Icon name="chevron-down" className="w-5 h-5" weight={2} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
        <p className="text-indigo-200/80 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INLINE CTA — reusable amber button
   ═══════════════════════════════════════════════════════ */

function AmberCTA({ config }: { config: SalesPageConfig }) {
  if (config.wpButtonImg) {
    return <WPBuyButton config={config} />;
  }
  const text = `${config.hero.ctaPrimary} \u2014 ${config.pricing.currency}${config.pricing.price}`;
  return (
    <a
      href={config.checkoutUrl || '#'}
      className="group inline-flex items-center justify-center gap-2 px-10 py-5 text-lg bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 rounded-xl font-bold text-indigo-950 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
    >
      {text}
      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function MathPuzzleSalesClient({ config, locale }: Props) {
  const { pricing } = config;

  return (
    <>
      {/* ── GLOBAL STYLES ──────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        .mp-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .mp-sans  { font-family: 'Outfit', system-ui, sans-serif; }

        /* Reveal animation */
        .mp-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mp-revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* Puzzle grid */
        .mp-puzzle-grid {
          position: relative;
          width: 100%;
          max-width: 340px;
          aspect-ratio: 1;
          margin: 0 auto;
        }
        .mp-grid-inner {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
        }
        .mp-piece {
          background: linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 8px;
          backdrop-filter: blur(8px);
          animation: mp-float 3s ease-in-out infinite alternate;
        }
        .mp-piece-num {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
          color: rgba(251, 191, 36, 0.9);
          line-height: 1;
        }
        .mp-piece-eq {
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        @keyframes mp-float {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }
        .mp-grid-shimmer {
          position: absolute;
          inset: -20%;
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(251, 191, 36, 0.06) 45%,
            rgba(251, 191, 36, 0.10) 50%,
            rgba(251, 191, 36, 0.06) 55%,
            transparent 70%
          );
          animation: mp-shimmer 4s ease-in-out infinite;
          pointer-events: none;
          z-index: 2;
        }
        @keyframes mp-shimmer {
          0%, 100% { transform: translateX(-100%); }
          50%      { transform: translateX(100%); }
        }

        /* Feature card hover */
        .mp-feature-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .mp-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(79, 70, 229, 0.15);
        }

        /* Diagonal grain overlay */
        .mp-grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Step connector line */
        .mp-step-line {
          position: absolute;
          top: 28px;
          left: calc(10% + 28px);
          right: calc(10% + 28px);
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #a78bfa, #6366f1);
          opacity: 0.3;
        }

        @media (max-width: 768px) {
          .mp-puzzle-grid { max-width: 260px; }
          .mp-piece-num { font-size: 0.95rem; }
          .mp-piece-eq  { font-size: 0.65rem; }
        }
      `}</style>

      {/* ═══ 1. HERO ═══════════════════════════════════════════ */}
      <section className="mp-sans relative overflow-hidden bg-indigo-950 py-16 md:py-24 lg:py-28">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(99,102,241,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(168,85,247,0.12),transparent_60%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            {config.hero.badge && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-semibold tracking-wide mb-6 border border-amber-500/20">
                {config.hero.badge}
              </span>
            )}
            <h1 className="mp-serif text-4xl md:text-5xl lg:text-[3.4rem] font-normal text-white mb-6 leading-[1.12] tracking-tight">
              {config.hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-indigo-200/80 leading-relaxed mb-10 max-w-xl">
              {config.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <AmberCTA config={config} />
            </div>
            {config.hero.trustBadges && (
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {config.hero.trustBadges.map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-sm text-indigo-300/70">
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right — Animated Puzzle Grid */}
          <div className="flex items-center justify-center lg:justify-end">
            <PuzzleGrid />
          </div>
        </div>
      </section>

      {/* ═══ 2. HOW IT WORKS ═══════════════════════════════════ */}
      {config.steps && (
        <Reveal className="mp-sans py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 text-center mb-4">How It Works</h2>
            <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">Five steps from blank canvas to sellable product.</p>

            {/* Desktop: horizontal timeline */}
            <div className="hidden md:block relative">
              <div className="mp-step-line" />
              <div className="grid grid-cols-5 gap-4">
                {config.steps.map((s) => (
                  <div key={s.number} className="text-center relative">
                    <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg shadow-indigo-600/20 relative z-10">
                      {s.number}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1.5">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical */}
            <div className="md:hidden space-y-8">
              {config.steps.map((s) => (
                <div key={s.number} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-indigo-600/20">
                      {s.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 3. FEATURES GRID ══════════════════════════════════ */}
      {config.features && (
        <Reveal className="mp-sans py-20 md:py-28 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 text-center mb-4">Everything You Need to Create &amp; Sell</h2>
            <p className="text-slate-500 text-center mb-14 max-w-2xl mx-auto">Professional tools. Zero learning curve.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {config.features.map((f) => (
                <div key={f.title} className="mp-feature-card bg-white rounded-2xl p-6 border border-slate-100">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                    <Icon name={f.icon} className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-[1.05rem] font-semibold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 4. MARKET STATS ═══════════════════════════════════ */}
      {config.marketStats && (
        <Reveal className="mp-sans py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 mb-4">{config.marketStats.headline}</h2>
            <p className="text-slate-500 mb-14 max-w-2xl mx-auto">{config.marketStats.description}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {config.marketStats.stats.map((s) => (
                <div key={s.label} className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/60">
                  <p className="mp-serif text-3xl md:text-4xl text-indigo-700 mb-2">{s.value}</p>
                  <p className="text-sm text-slate-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 5. INCOME POTENTIAL ═══════════════════════════════ */}
      {config.incomePotential && (
        <Reveal className="mp-sans py-20 md:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 mb-4">{config.incomePotential.headline}</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">{config.incomePotential.description}</p>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-indigo-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-400" />
              <p className="mp-serif text-xl md:text-2xl text-indigo-700 tracking-tight">{config.incomePotential.calculation}</p>
            </div>
            <p className="text-xs text-slate-400 mt-4">* Illustrative example only. Individual results vary.</p>
          </div>
        </Reveal>
      )}

      {/* ═══ MID-PAGE CTA ══════════════════════════════════════ */}
      <section className="mp-sans py-10 bg-indigo-700">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-bold text-white">Ready to start creating?</p>
            <p className="text-indigo-200 text-sm">One-time payment. Lifetime access. Full commercial rights.</p>
          </div>
          <AmberCTA config={config} />
        </div>
      </section>

      {/* ═══ 6. OBSTACLES ══════════════════════════════════════ */}
      {config.obstacles && (
        <Reveal className="mp-sans relative mp-grain py-20 md:py-28 bg-indigo-950">
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="mp-serif text-3xl md:text-4xl text-white text-center mb-14">{config.obstacles.headline}</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                {config.obstacles.problems.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                      <Icon name="xmark" className="w-3.5 h-3.5 text-red-400" weight={2.5} />
                    </span>
                    <p className="text-indigo-200/70 line-through decoration-red-400/40">{p}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-indigo-900/80 to-indigo-800/50 rounded-2xl p-6 border border-indigo-700/40">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="font-semibold text-amber-300">The Solution</h3>
                </div>
                <p className="text-indigo-100/80 leading-relaxed">{config.obstacles.solution}</p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 7. PRODUCT INTRO ══════════════════════════════════ */}
      {config.productIntro && (
        <Reveal className="mp-sans py-20 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 text-center mb-4">{config.productIntro.headline}</h2>
            <p className="text-slate-500 text-center mb-12 max-w-3xl mx-auto leading-relaxed">{config.productIntro.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.productIntro.differentiators.map((d) => (
                <div key={d} className="flex items-start gap-3 bg-indigo-50/60 rounded-xl p-5 border border-indigo-100/60">
                  <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-slate-700 text-[0.94rem]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 8. BEFORE / AFTER ═════════════════════════════════ */}
      {config.beforeAfter && (
        <Reveal className="mp-sans py-20 md:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 text-center mb-14">Before vs. After</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6 bg-red-50/70 border border-red-200/60">
                <h3 className="text-base font-bold text-red-700 mb-4 flex items-center gap-2">
                  <Icon name="xmark" className="w-5 h-5" weight={2.5} />
                  Without Math Puzzle Studio Pro
                </h3>
                <ul className="space-y-3">
                  {config.beforeAfter.before.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-slate-600 text-[0.94rem]">
                      <span className="text-red-300 mt-1">&bull;</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-6 bg-emerald-50/70 border border-emerald-200/60">
                <h3 className="text-base font-bold text-emerald-700 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  With Math Puzzle Studio Pro
                </h3>
                <ul className="space-y-3">
                  {config.beforeAfter.after.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-slate-700 text-[0.94rem]">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 9. DEMO — Static Mockup ══════════════════════════ */}
      {config.demo && (
        <Reveal className="mp-sans py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 text-center mb-4">See What You Can Create</h2>
            <p className="text-slate-500 text-center mb-14 max-w-2xl mx-auto">Real output from Math Puzzle Studio Pro. Every worksheet is print-ready.</p>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Puzzle Worksheet mockup */}
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200">
                <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 text-center">lessoncraftstudio.com/apps/math-puzzle</div>
                </div>
                {/* Placeholder for actual screenshot */}
                <div className="bg-gradient-to-b from-indigo-50 to-white p-8 text-center min-h-[320px] flex flex-col items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 mb-4 mx-auto" style={{ maxWidth: '200px' }}>
                    {['3+4=?', '7-2=?', '5+1=?', '8-3=?', '2+6=?', '9-4=?', '1+7=?', '6-1=?', '4+5=?'].map((eq, i) => (
                      <div key={i} className="bg-white border border-indigo-200 rounded-lg p-2 text-xs text-indigo-700 font-medium shadow-sm">{eq}</div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Math Puzzle Worksheet</p>
                </div>
              </div>
              {/* Answer Key mockup */}
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200">
                <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 text-center">Answer Key</div>
                </div>
                <div className="bg-gradient-to-b from-emerald-50 to-white p-8 text-center min-h-[320px] flex flex-col items-center justify-center">
                  <div className="grid grid-cols-3 gap-2 mb-4 mx-auto" style={{ maxWidth: '200px' }}>
                    {[7, 5, 6, 5, 8, 5, 8, 5, 9].map((ans, i) => (
                      <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-xs text-emerald-700 font-bold shadow-sm flex items-center justify-center">
                        <svg className="w-3 h-3 mr-1 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {ans}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Auto-Generated Answer Key</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <AmberCTA config={config} />
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 10. SHOWCASE ══════════════════════════════════════ */}
      {config.showcase && (
        <Reveal className="mp-sans py-20 md:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 text-center mb-12">{config.showcase.headline}</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {config.showcase.items.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-[1.05rem] font-semibold text-indigo-700 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 11. OWNERSHIP / RIGHTS ════════════════════════════ */}
      {config.ownership && (
        <Reveal className="mp-sans py-20 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 mb-4">Your Rights, Your Business</h2>
            <p className="text-slate-500 mb-12">Full commercial rights included with every purchase.</p>
            <div className="grid sm:grid-cols-3 gap-5">
              {config.ownership.map((o) => (
                <div key={o.title} className="bg-gradient-to-b from-indigo-50/50 to-white rounded-2xl p-6 border border-indigo-100/50 text-center">
                  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                    <Icon name={o.icon} className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{o.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{o.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 12. AUDIENCES ═════════════════════════════════════ */}
      {config.audiences && (
        <Reveal className="mp-sans py-20 md:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 text-center mb-12">Perfect For</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {config.audiences.map((a) => (
                <div key={a.title} className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Icon name={a.icon} className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1">{a.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 13. VALUE STACK ═══════════════════════════════════ */}
      <Reveal className="mp-sans relative mp-grain py-20 md:py-28 bg-indigo-950">
        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="mp-serif text-3xl md:text-4xl text-white text-center mb-12">{config.valueStack.headline}</h2>
          <div className="bg-indigo-900/50 rounded-2xl p-6 md:p-8 border border-indigo-700/40">
            <ul className="space-y-4 mb-8">
              {config.valueStack.items.map((item) => (
                <li key={item.name} className="flex items-center justify-between py-2.5 border-b border-indigo-700/30 last:border-0">
                  <span className="flex items-center gap-2 text-indigo-100">
                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item.name}
                  </span>
                  <span className="text-indigo-400 line-through text-sm">{pricing.currency}{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="text-center border-t border-indigo-700/40 pt-6">
              <p className="text-indigo-300 mb-2">Total Value: <span className="line-through">{pricing.currency}{config.valueStack.totalValue}</span></p>
              <div className="inline-block bg-amber-500 text-indigo-950 text-3xl font-bold px-8 py-3 rounded-xl shadow-lg shadow-amber-500/20">
                Today: {pricing.currency}{config.valueStack.yourPrice}
              </div>
              <p className="text-sm text-indigo-400 mt-3">{pricing.label}</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <AmberCTA config={config} />
          </div>
        </div>
      </Reveal>

      {/* ═══ 14. BONUSES ═══════════════════════════════════════ */}
      {config.bonuses && (
        <Reveal className="mp-sans py-20 md:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 text-center mb-12">Free Bonuses Included</h2>
            <div className="space-y-4">
              {config.bonuses.map((b) => (
                <div key={b.name} className="bg-amber-50/70 rounded-2xl p-6 border-2 border-amber-200/60 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Icon name="gift" className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-semibold text-slate-900">{b.name}</h3>
                      <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">{pricing.currency}{b.value} value</span>
                    </div>
                    <p className="text-sm text-slate-500">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ═══ 15. GUARANTEE ═════════════════════════════════════ */}
      <Reveal className="mp-sans py-20 md:py-28 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-indigo-700 to-indigo-800 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Icon name="shield" className="w-8 h-8 text-amber-300" />
              </div>
              <h2 className="mp-serif text-2xl md:text-3xl mb-2">{config.guarantee.days}-Day Money-Back Guarantee</h2>
              <p className="text-indigo-200 leading-relaxed max-w-xl mx-auto">{config.guarantee.text}</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ═══ 16. URGENCY ═══════════════════════════════════════ */}
      {config.urgency && (
        <section className="mp-sans py-12 md:py-16 bg-gradient-to-r from-amber-500 to-orange-500">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Icon name="clock" className="w-6 h-6 text-white" weight={2} />
              <h2 className="mp-serif text-2xl md:text-3xl text-white">{config.urgency.headline}</h2>
            </div>
            <p className="text-white/90 mb-6">{config.urgency.text}</p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-white/60 line-through text-2xl">{pricing.currency}{config.urgency.regularPrice}</span>
              <span className="bg-white text-amber-600 text-3xl font-bold px-6 py-2 rounded-xl shadow-lg">{pricing.currency}{pricing.price}</span>
            </div>
            <AmberCTA config={config} />
          </div>
        </section>
      )}

      {/* ═══ 17. FAQ ═══════════════════════════════════════════ */}
      <section className="mp-sans py-20 md:py-28 bg-indigo-900">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="mp-serif text-3xl md:text-4xl text-white text-center mb-12">Frequently Asked Questions</h2>
          <div>
            {config.faq.map((item, i) => (
              <MathFAQItem key={item.question} question={item.question} answer={item.answer} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 18. CLOSING P.S. ═════════════════════════════════ */}
      <section className="mp-sans py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="mp-serif text-3xl md:text-4xl text-slate-900 mb-8">Start Creating Today</h2>
          <div className="flex flex-col items-center gap-4 mb-10">
            <AmberCTA config={config} />
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {pricing.includes.slice(0, 4).map((inc) => (
                <span key={inc} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {inc}
                </span>
              ))}
            </div>
            <WPDisclaimer />
          </div>
          {config.closingPs && (
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 text-left">
              <p className="text-sm text-indigo-600 font-semibold mb-2">P.S.</p>
              <p className="text-slate-600 leading-relaxed">{config.closingPs}</p>
            </div>
          )}
        </div>
      </section>

      <ComplianceFooter locale={locale} />
    </>
  );
}
