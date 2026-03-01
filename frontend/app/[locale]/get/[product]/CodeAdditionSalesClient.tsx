'use client';

import { useState } from 'react';
import type { SalesPageConfig } from '@/config/sales-pages';
import { Icon, WPBuyButton, WPDisclaimer, ComplianceFooter } from './SalesPageClient';

interface Props {
  config: SalesPageConfig;
  locale: string;
}

/* ═══════════════════════════════════════════════════════
   SAMPLE IMAGE PATHS — served from isolated storage via nginx
   ═══════════════════════════════════════════════════════ */

const CODE_ADDITION_SAMPLES = {
  // Regular mode (image-based) — what FE buyers actually get
  worksheet1: '/samples/english/code%20addition/image_addition_worksheet%20(1).jpeg',
  worksheet2: '/samples/english/code%20addition/image_addition_worksheet%20(2).jpeg',
  worksheet3: '/samples/english/code%20addition/image_addition_worksheet%20(3).jpeg',
  worksheet4: '/samples/english/code%20addition/image_addition_worksheet%20(4).jpeg',
  answerKey1: '/samples/english/code%20addition/image_addition_answer_key%20(1).jpeg',
  answerKey2: '/samples/english/code%20addition/image_addition_answer_key%20(2).jpeg',
};

const LIBRARY_IMAGES = [
  { src: '/image-library/animals/cat.png', label: 'Cat' },
  { src: '/image-library/animals/dog.png', label: 'Dog' },
  { src: '/image-library/animals/elephant.png', label: 'Elephant' },
  { src: '/image-library/animals/fox.png', label: 'Fox' },
  { src: '/image-library/fruits/apple.png', label: 'Apple' },
  { src: '/image-library/fruits/banana.png', label: 'Banana' },
  { src: '/image-library/fruits/cherry.png', label: 'Cherry' },
  { src: '/image-library/fruits/kiwi.png', label: 'Kiwi' },
  { src: '/image-library/vegetables/carrot.png', label: 'Carrot' },
  { src: '/image-library/vegetables/broccoli.png', label: 'Broccoli' },
  { src: '/image-library/vehicles/car.png', label: 'Car' },
  { src: '/image-library/vehicles/airplane.png', label: 'Airplane' },
  { src: '/image-library/dinosaurs/brachiosaurus.png', label: 'Brachiosaurus' },
  { src: '/image-library/space/astronaut.png', label: 'Astronaut' },
  { src: '/image-library/birds/owl.png', label: 'Owl' },
  { src: '/image-library/ocean%20life/octopus.png', label: 'Octopus' },
];

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
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function CodeAdditionSalesClient({ config, locale }: Props) {
  const { pricing } = config;

  return (
    <>
      {/* ── GLOBAL STYLES ──────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        .ca-serif { font-family: 'DM Serif Display', Georgia, serif; }
        .ca-sans  { font-family: 'Outfit', system-ui, sans-serif; }

        /* Feature card hover */
        .ca-feature-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .ca-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -12px rgba(13, 148, 136, 0.15);
        }

        /* Diagonal grain overlay */
        .ca-grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* Step connector line */
        .ca-step-line {
          position: absolute;
          top: 28px;
          left: calc(10% + 28px);
          right: calc(10% + 28px);
          height: 2px;
          background: linear-gradient(90deg, #0d9488, #5eead4, #0d9488);
          opacity: 0.3;
        }

        /* Hero cascading stack */
        .ca-hero-stack {
          position: relative;
          width: 100%;
          max-width: 380px;
          margin: 0 auto;
        }
        .ca-hero-stack-card {
          position: absolute;
          width: 70%;
          border-radius: 12px;
          overflow: hidden;
          border: 3px solid white;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
        }
        .ca-hero-stack-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 30px 60px -15px rgba(0,0,0,0.5) !important;
          z-index: 10 !important;
        }
        .ca-hero-stack-card img { width: 100%; display: block; }
        .ca-stack-back {
          top: 0; left: 0; z-index: 1;
          box-shadow: 0 10px 30px -8px rgba(0,0,0,0.3);
        }
        .ca-stack-mid {
          top: 28px; left: 14%; z-index: 2;
          box-shadow: 0 15px 40px -10px rgba(0,0,0,0.35);
        }
        .ca-stack-front {
          top: 56px; left: 28%; z-index: 3;
          box-shadow: 0 20px 50px -12px rgba(0,0,0,0.4);
        }
        @media (min-width: 768px) {
          .ca-hero-stack { max-width: 440px; }
        }
      `}</style>

      {/* ═══ 1. HERO ═══════════════════════════════════════════ */}
      <section className="ca-sans relative overflow-hidden bg-teal-950 py-16 md:py-24 lg:py-28">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(13,148,136,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(20,184,166,0.12),transparent_60%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div>
            {config.hero.badge && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-semibold tracking-wide mb-6 border border-amber-500/20">
                {config.hero.badge}
              </span>
            )}
            <h1 className="ca-serif text-4xl md:text-5xl lg:text-[3.4rem] font-normal text-white mb-6 leading-[1.12] tracking-tight">
              {config.hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-teal-200/80 leading-relaxed mb-10 max-w-xl">
              {config.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <AmberCTA config={config} />
            </div>
            {config.hero.trustBadges && (
              <div className="flex flex-wrap gap-x-5 gap-y-2">
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

          {/* Right — Cascading worksheet stack */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="ca-hero-stack" style={{ aspectRatio: '1 / 1.1' }}>
              <div className="ca-hero-stack-card ca-stack-back">
                <img src={CODE_ADDITION_SAMPLES.worksheet2} alt="Code breaker addition worksheet variation" loading="eager" />
              </div>
              <div className="ca-hero-stack-card ca-stack-mid">
                <img src={CODE_ADDITION_SAMPLES.worksheet4} alt="Code breaker addition worksheet variation" loading="eager" />
              </div>
              <div className="ca-hero-stack-card ca-stack-front">
                <img src={CODE_ADDITION_SAMPLES.worksheet1} alt="Code breaker addition worksheet" loading="eager" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. HOW IT WORKS ═══════════════════════════════════ */}
      {config.steps && (
        <section className="ca-sans py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 text-center mb-4">How It Works</h2>
            <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">Five steps from blank canvas to sellable product.</p>

            {/* Desktop: horizontal timeline */}
            <div className="hidden md:block relative">
              <div className="ca-step-line" />
              <div className="grid grid-cols-5 gap-4">
                {config.steps.map((s) => (
                  <div key={s.number} className="text-center relative">
                    <div className="w-14 h-14 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg shadow-teal-600/20 relative z-10">
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
                    <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-teal-600/20">
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
        </section>
      )}

      {/* ═══ 3. FEATURES GRID ══════════════════════════════════ */}
      {config.features && (
        <section className="ca-sans py-20 md:py-28 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 text-center mb-4">Everything You Need to Create &amp; Sell</h2>
            <p className="text-slate-500 text-center mb-14 max-w-2xl mx-auto">Professional tools. Zero learning curve.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {config.features.map((f) => (
                <div key={f.title} className="ca-feature-card bg-white rounded-2xl p-6 border border-slate-100">
                  <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                    <Icon name={f.icon} className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-[1.05rem] font-semibold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 4. MARKET STATS ═══════════════════════════════════ */}
      {config.marketStats && (
        <section className="ca-sans py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 mb-4">{config.marketStats.headline}</h2>
            <p className="text-slate-500 mb-14 max-w-2xl mx-auto">{config.marketStats.description}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {config.marketStats.stats.map((s) => (
                <div key={s.label} className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100/60">
                  <p className="ca-serif text-3xl md:text-4xl text-teal-700 mb-2">{s.value}</p>
                  <p className="text-sm text-slate-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 5. INCOME POTENTIAL ═══════════════════════════════ */}
      {config.incomePotential && (
        <section className="ca-sans py-20 md:py-28 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 mb-4">{config.incomePotential.headline}</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">{config.incomePotential.description}</p>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-teal-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-400" />
              <p className="ca-serif text-xl md:text-2xl text-teal-700 tracking-tight">{config.incomePotential.calculation}</p>
            </div>
            <p className="text-xs text-slate-400 mt-4">* Illustrative example only. Individual results vary.</p>
          </div>
        </section>
      )}

      {/* ═══ MID-PAGE CTA ══════════════════════════════════════ */}
      <section className="ca-sans py-10 bg-teal-700">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-bold text-white">Ready to start creating?</p>
            <p className="text-teal-200 text-sm">One-time payment. Lifetime access. Full commercial rights.</p>
          </div>
          <AmberCTA config={config} />
        </div>
      </section>

      {/* ═══ 6. OBSTACLES ══════════════════════════════════════ */}
      {config.obstacles && (
        <section className="ca-sans relative ca-grain py-20 md:py-28 bg-teal-950">
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="ca-serif text-3xl md:text-4xl text-white text-center mb-14">{config.obstacles.headline}</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                {config.obstacles.problems.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                      <Icon name="xmark" className="w-3.5 h-3.5 text-red-400" weight={2.5} />
                    </span>
                    <p className="text-teal-200/70 line-through decoration-red-400/40">{p}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-teal-900/80 to-teal-800/50 rounded-2xl p-6 border border-teal-700/40">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="font-semibold text-amber-300">The Solution</h3>
                </div>
                <p className="text-teal-100/80 leading-relaxed">{config.obstacles.solution}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 7. PRODUCT INTRO ══════════════════════════════════ */}
      {config.productIntro && (
        <section className="ca-sans py-20 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 text-center mb-4">{config.productIntro.headline}</h2>
            <p className="text-slate-500 text-center mb-12 max-w-3xl mx-auto leading-relaxed">{config.productIntro.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.productIntro.differentiators.map((d) => (
                <div key={d} className="flex items-start gap-3 bg-teal-50/60 rounded-xl p-5 border border-teal-100/60">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-slate-700 text-[0.94rem]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 8. BEFORE / AFTER ═════════════════════════════════ */}
      {config.beforeAfter && (
        <section className="ca-sans py-20 md:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 text-center mb-14">Before vs. After</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6 bg-red-50/70 border border-red-200/60">
                <h3 className="text-base font-bold text-red-700 mb-4 flex items-center gap-2">
                  <Icon name="xmark" className="w-5 h-5" weight={2.5} />
                  Without Code Addition Studio Pro
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
                  With Code Addition Studio Pro
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
        </section>
      )}

      {/* ═══ 9. DEMO — Static Mockup ══════════════════════════ */}
      {config.demo && (
        <section className="ca-sans py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 text-center mb-4">See What You Can Create</h2>
            <p className="text-slate-500 text-center mb-14 max-w-2xl mx-auto">Real output from Code Addition Studio Pro. Every worksheet is print-ready.</p>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Worksheet — real screenshot */}
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200">
                <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 text-center">lessoncraftstudio.com/apps/code-addition</div>
                </div>
                <img src={CODE_ADDITION_SAMPLES.worksheet4} alt="Code breaker addition worksheet with colorful images" className="w-full" loading="lazy" />
              </div>
              {/* Answer Key — real screenshot */}
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200">
                <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 text-center">Answer Key</div>
                </div>
                <img src={CODE_ADDITION_SAMPLES.answerKey1} alt="Auto-generated answer key" className="w-full" loading="lazy" />
              </div>
            </div>
            <div className="text-center mt-10">
              <AmberCTA config={config} />
            </div>
          </div>
        </section>
      )}

      {/* ═══ 9b. IMAGE LIBRARY SHOWCASE ═════════════════════════ */}
      <section className="ca-sans py-20 md:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 mb-4">Professional Image Library Included</h2>
          <p className="text-slate-500 mb-10 max-w-2xl mx-auto">300 professionally curated, child-friendly images across 10 themes. Every image is ready for commercial use.</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-8">
            {LIBRARY_IMAGES.map((img) => (
              <div key={img.label} className="aspect-square bg-white rounded-xl p-2 shadow-sm border border-slate-100 hover:shadow-md hover:scale-105 transition-all">
                <img src={img.src} alt={img.label} className="w-full h-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500">Showing 16 of 300 images across Animals, Fruits, Vegetables, Vehicles &amp; more</p>
        </div>
      </section>

      {/* ═══ 9c. MULTI-LANGUAGE SUPPORT ════════════════════════════ */}
      <section className="ca-sans py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 mb-4">11 Languages Built In</h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto">Every worksheet element — instructions, labels, number words — automatically translates. Sell to customers worldwide.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['English', 'Deutsch', 'Fran\u00e7ais', 'Espa\u00f1ol', 'Portugu\u00eas', 'Italiano', 'Nederlands', 'Svenska', 'Dansk', 'Norsk', 'Suomi'].map((lang) => (
              <span key={lang} className="px-5 py-2.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100">{lang}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. SHOWCASE ══════════════════════════════════════ */}
      {config.showcase && (
        <section className="ca-sans py-20 md:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 text-center mb-12">{config.showcase.headline}</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {config.showcase.items.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="text-[1.05rem] font-semibold text-teal-700 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 11. OWNERSHIP / RIGHTS ════════════════════════════ */}
      {config.ownership && (
        <section className="ca-sans py-20 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 mb-4">Your Rights, Your Business</h2>
            <p className="text-slate-500 mb-12">Full commercial rights included with every purchase.</p>
            <div className="grid sm:grid-cols-3 gap-5">
              {config.ownership.map((o) => (
                <div key={o.title} className="bg-gradient-to-b from-teal-50/50 to-white rounded-2xl p-6 border border-teal-100/50 text-center">
                  <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    <Icon name={o.icon} className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{o.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{o.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 12. AUDIENCES ═════════════════════════════════════ */}
      {config.audiences && (
        <section className="ca-sans py-20 md:py-28 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 text-center mb-12">Perfect For</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {config.audiences.map((a) => (
                <div key={a.title} className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Icon name={a.icon} className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1">{a.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 13. VALUE STACK ═══════════════════════════════════ */}
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
                Today: {pricing.currency}{config.valueStack.yourPrice}
              </div>
              <p className="text-sm text-teal-400 mt-3">{pricing.label}</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <AmberCTA config={config} />
          </div>
        </div>
      </section>

      {/* ═══ 14. BONUSES ═══════════════════════════════════════ */}
      {config.bonuses && (
        <section className="ca-sans py-20 md:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 text-center mb-12">Free Bonuses Included</h2>
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
        </section>
      )}

      {/* ═══ 15. GUARANTEE ═════════════════════════════════════ */}
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

      {/* ═══ 16. URGENCY ═══════════════════════════════════════ */}
      {config.urgency && (
        <section className="ca-sans py-12 md:py-16 bg-gradient-to-r from-amber-500 to-orange-500">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Icon name="clock" className="w-6 h-6 text-white" weight={2} />
              <h2 className="ca-serif text-2xl md:text-3xl text-white">{config.urgency.headline}</h2>
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

      {/* ═══ 18. CLOSING P.S. ═════════════════════════════════ */}
      <section className="ca-sans py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="ca-serif text-3xl md:text-4xl text-slate-900 mb-8">Start Creating Today</h2>
          <div className="flex flex-col items-center gap-4 mb-10">
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
          {config.closingPs && (
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 text-left">
              <p className="text-sm text-teal-600 font-semibold mb-2">P.S.</p>
              <p className="text-slate-600 leading-relaxed">{config.closingPs}</p>
            </div>
          )}
        </div>
      </section>

      <ComplianceFooter locale={locale} />
    </>
  );
}
