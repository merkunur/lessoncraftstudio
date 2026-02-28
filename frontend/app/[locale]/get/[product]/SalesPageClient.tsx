'use client';

import { useState } from 'react';
import Script from 'next/script';
import type { SalesPageConfig } from '@/config/sales-pages';

interface Props {
  config: SalesPageConfig;
  locale: string;
}

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */

const PUZZLE_SAMPLES = {
  portrait: '/samples/english/wordsearch/wordsearch%20portrait.jpeg',
  landscape: '/samples/english/wordsearch/wordsearch%20landscape.jpeg',
  custom: '/samples/english/wordsearch/custom%20word%20list.jpeg',
  answerKey: '/samples/english/wordsearch/wordsearch%20portrait%20answer_key.jpeg',
  german: '/samples/german/wordsearch/Worter%20suchen%201.jpeg',
  french: '/samples/french/wordsearch/Mots%20Caches%201.jpeg',
};

const LIBRARY_IMAGES = [
  // Animals (real library: 36 images)
  { src: '/image-library/animals/cat.png', label: 'Cat' },
  { src: '/image-library/animals/dog.png', label: 'Dog' },
  { src: '/image-library/animals/elephant.png', label: 'Elephant' },
  { src: '/image-library/animals/penguin.png', label: 'Penguin' },
  // Fruits
  { src: '/image-library/fruits/apple.png', label: 'Apple' },
  { src: '/image-library/fruits/banana.png', label: 'Banana' },
  { src: '/image-library/fruits/cherry.png', label: 'Cherry' },
  { src: '/image-library/fruits/kiwi.png', label: 'Kiwi' },
  // Vegetables
  { src: '/image-library/vegetables/carrot.png', label: 'Carrot' },
  { src: '/image-library/vegetables/broccoli.png', label: 'Broccoli' },
  { src: '/image-library/vegetables/corn.png', label: 'Corn' },
  { src: '/image-library/vegetables/eggplant.png', label: 'Eggplant' },
  // Christmas
  { src: '/image-library/christmas/candy cane.png', label: 'Candy Cane' },
  { src: '/image-library/christmas/gingerbread.png', label: 'Gingerbread' },
  { src: '/image-library/christmas/bell.png', label: 'Bell' },
  { src: '/image-library/christmas/angel.png', label: 'Angel' },
];

const FLAG_EMOJI: Record<string, string> = {
  gb: '\ud83c\uddec\ud83c\udde7', de: '\ud83c\udde9\ud83c\uddea', fr: '\ud83c\uddeb\ud83c\uddf7',
  es: '\ud83c\uddea\ud83c\uddf8', pt: '\ud83c\uddf5\ud83c\uddf9', it: '\ud83c\uddee\ud83c\uddf9',
  nl: '\ud83c\uddf3\ud83c\uddf1', se: '\ud83c\uddf8\ud83c\uddea', dk: '\ud83c\udde9\ud83c\uddf0',
  no: '\ud83c\uddf3\ud83c\uddf4', fi: '\ud83c\uddeb\ud83c\uddee',
};

/* ═══════════════════════════════════════════
   SVG ICON PATHS (Heroicons Outline 24x24)
   ═══════════════════════════════════════════ */

export const PATHS: Record<string, string> = {
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
  gift: 'M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
  star: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
};

/* ═══════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════ */

export function Icon({ name, className, weight }: { name: string; className?: string; weight?: number }) {
  return (
    <svg className={className || 'w-6 h-6'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={weight || 1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={PATHS[name] || PATHS.grid} />
    </svg>
  );
}

function CTAButton({ text, href, variant = 'orange', size = 'lg' }: {
  text: string; href: string; variant?: 'orange' | 'teal'; size?: 'lg' | 'md';
}) {
  const isExternal = href.startsWith('http');
  const sz = size === 'lg' ? 'px-10 py-5 text-lg' : 'px-8 py-4 text-base';
  const bg = variant === 'orange'
    ? 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40'
    : 'bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40';

  return (
    <a
      href={href || '#'}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center justify-center gap-2 ${sz} ${bg} rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
    >
      {text}
      <Icon name="arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" weight={2} />
    </a>
  );
}

function FAQItem({ question, answer, idx }: { question: string; answer: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-teal-700/20 ${idx === 0 ? 'border-t' : ''}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left cursor-pointer group">
        <span className="text-lg font-semibold text-white pr-4 group-hover:text-teal-100 transition-colors">{question}</span>
        <span className={`flex-shrink-0 text-teal-200 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <Icon name="chevron-down" className="w-5 h-5" weight={2} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-teal-100/80 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function WPBuyButton({ config }: { config: SalesPageConfig }) {
  if (config.wpButtonImg) {
    return (
      <div className="flex justify-center">
        <a
          href={config.checkoutUrl}
          className="inline-block transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <img src={config.wpButtonImg} alt="Buy Now" />
        </a>
      </div>
    );
  }
  const ctaText = `${config.hero.ctaPrimary} \u2014 $${config.pricing.price}`;
  return <CTAButton text={ctaText} href={config.checkoutUrl || '#'} />;
}

export function WPDisclaimer({ config }: { config?: SalesPageConfig } = {}) {
  // Extract funnel ID from checkout URL (e.g. /o2/buy/{funnelId}/...)
  const funnelId = config?.checkoutUrl?.match(/\/o2\/buy\/([^/]+)/)?.[1] || 'pxf0ht';
  return (
    <>
      <Script src={`https://warriorplus.com/o2/disclaimer/${funnelId}`} strategy="lazyOnload" />
      <div className="wplus_spdisclaimer mt-6 text-center text-sm text-slate-500" />
    </>
  );
}

export function ComplianceFooter({ locale }: { locale: string }) {
  return (
    <footer className="bg-stone-100 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <p className="text-sm text-slate-500 leading-relaxed">
          <span className="font-semibold text-slate-600">Income Disclaimer:</span> Results shown on this page are not guaranteed. Individual results vary based on effort, experience, and market conditions. Income examples are illustrative only.
        </p>
        <p className="text-sm text-slate-500">
          Support: <a href="mailto:support@lessoncraftstudio.com" className="text-slate-600 underline hover:text-slate-800">support@lessoncraftstudio.com</a>
        </p>
        <p className="text-sm text-slate-500">
          <a href={`/${locale}/privacy`} className="text-slate-600 underline hover:text-slate-800">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href={`/${locale}/terms`} className="text-slate-600 underline hover:text-slate-800">Terms of Service</a>
        </p>
        <p className="text-xs text-slate-400">&copy; 2027 LessonCraftStudio. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   FE LAYOUT — 21-Section Sales Page
   ═══════════════════════════════════════════ */

function FELayout({ config, locale }: Props) {
  const { pricing } = config;

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            {config.hero.badge && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold tracking-wide mb-6 border border-teal-200">
                {config.hero.badge}
              </span>
            )}
            <h1 className="sp-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              {config.hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
              {config.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <WPBuyButton config={config} />
            </div>
            {config.hero.trustBadges && (
              <div className="flex flex-wrap justify-center gap-4">
                {config.hero.trustBadges.map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Icon name="check" className="w-4 h-4 text-teal-600" weight={2.5} />
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Fanned puzzle screenshots */}
          <div className="relative flex items-center justify-center h-[340px] md:h-[440px] mt-4">
            <div className="absolute w-[220px] md:w-[280px] rounded-xl shadow-2xl overflow-hidden border-4 border-white transition-transform hover:scale-105 hover:z-20" style={{ transform: 'rotate(-8deg) translateX(-60px)', zIndex: 1 }}>
              <img src={PUZZLE_SAMPLES.landscape} alt="Landscape word search puzzle" className="w-full" loading="eager" />
            </div>
            <div className="absolute w-[220px] md:w-[280px] rounded-xl shadow-2xl overflow-hidden border-4 border-white transition-transform hover:scale-105 hover:z-20" style={{ zIndex: 3 }}>
              <img src={PUZZLE_SAMPLES.portrait} alt="Portrait word search puzzle" className="w-full" loading="eager" />
            </div>
            <div className="absolute w-[220px] md:w-[280px] rounded-xl shadow-2xl overflow-hidden border-4 border-white transition-transform hover:scale-105 hover:z-20" style={{ transform: 'rotate(8deg) translateX(60px)', zIndex: 2 }}>
              <img src={PUZZLE_SAMPLES.custom} alt="Custom word list puzzle" className="w-full" loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TESTIMONIAL ───────────────────────────── */}
      {config.testimonial && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <div className="relative bg-stone-50 rounded-2xl p-8 md:p-10 border-l-4 border-teal-500">
              <Icon name="star" className="w-8 h-8 text-amber-400 mb-4" />
              <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed italic mb-6">
                &ldquo;{config.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-slate-900">{config.testimonial.name}</p>
                <p className="text-sm text-slate-500">{config.testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. FEATURES GRID ─────────────────────────── */}
      {config.features && (
        <section className="py-16 md:py-20 bg-stone-50">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
              Everything You Need to Create &amp; Sell
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">Professional tools. Zero learning curve.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.features.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-stone-100">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                    <Icon name={f.icon} className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. MARKET STATS ──────────────────────────── */}
      {config.marketStats && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">{config.marketStats.headline}</h2>
            <p className="text-slate-600 mb-12 max-w-2xl mx-auto">{config.marketStats.description}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {config.marketStats.stats.map((s) => (
                <div key={s.label} className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                  <p className="text-3xl md:text-4xl font-bold text-teal-700 mb-2">{s.value}</p>
                  <p className="text-sm text-slate-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. INCOME POTENTIAL ───────────────────────── */}
      {config.incomePotential && (
        <section className="py-16 md:py-20 bg-stone-50">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">{config.incomePotential.headline}</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">{config.incomePotential.description}</p>
            <div className="bg-white rounded-2xl p-8 shadow-md border border-teal-100">
              <p className="text-xl md:text-2xl font-bold text-teal-700 font-mono tracking-tight">{config.incomePotential.calculation}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. MID-PAGE CTA ──────────────────────────── */}
      <section className="py-12 bg-teal-700">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-bold text-white">Ready to start creating?</p>
            <p className="text-teal-100 text-sm">One-time payment. Lifetime access. Full commercial rights.</p>
          </div>
          <WPBuyButton config={config} />
        </div>
      </section>

      {/* ── 7. OBSTACLES ─────────────────────────────── */}
      {config.obstacles && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">{config.obstacles.headline}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {config.obstacles.problems.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <Icon name="xmark" className="w-3.5 h-3.5 text-red-500" weight={2.5} />
                    </span>
                    <p className="text-slate-700">{p}</p>
                  </div>
                ))}
              </div>
              <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="check" className="w-6 h-6 text-teal-600" weight={2.5} />
                  <h3 className="font-semibold text-teal-800">The Solution</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">{config.obstacles.solution}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 8. PRODUCT INTRODUCTION ──────────────────── */}
      {config.productIntro && (
        <section className="py-16 md:py-20 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">{config.productIntro.headline}</h2>
            <p className="text-slate-600 text-center mb-10 max-w-3xl mx-auto leading-relaxed">{config.productIntro.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {config.productIntro.differentiators.map((d) => (
                <div key={d} className="flex items-start gap-3 bg-white rounded-xl p-5 border border-stone-100">
                  <Icon name="check" className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" weight={2.5} />
                  <p className="text-slate-700">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9. BEFORE / AFTER ────────────────────────── */}
      {config.beforeAfter && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">Before vs. After</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl p-6 bg-red-50 border border-red-100">
                <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                  <Icon name="xmark" className="w-5 h-5" weight={2.5} />
                  Without Word Search Studio Pro
                </h3>
                <ul className="space-y-3">
                  {config.beforeAfter.before.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-slate-700">
                      <span className="text-red-400 mt-1">&bull;</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-6 bg-green-50 border border-green-100">
                <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                  <Icon name="check" className="w-5 h-5" weight={2.5} />
                  With Word Search Studio Pro
                </h3>
                <ul className="space-y-3">
                  {config.beforeAfter.after.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-slate-700">
                      <Icon name="check" className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" weight={2.5} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 10. OWNERSHIP / RIGHTS ───────────────────── */}
      {config.ownership && (
        <section className="py-16 md:py-20 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">Your Rights, Your Business</h2>
            <p className="text-slate-600 mb-10">Full commercial rights included with every purchase.</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {config.ownership.map((o) => (
                <div key={o.title} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 text-center">
                  <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                    <Icon name={o.icon} className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{o.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{o.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 11. REAL PRODUCT DEMO ────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">See What You Can Create</h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">Real output from Word Search Studio Pro. Every puzzle is print-ready at 300 DPI.</p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Portrait puzzle in browser frame */}
            <div className="rounded-xl overflow-hidden shadow-xl border border-stone-200">
              <div className="bg-stone-100 px-4 py-2.5 flex items-center gap-2 border-b border-stone-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 text-center">lessoncraftstudio.com/apps/word-search</div>
              </div>
              <img src={PUZZLE_SAMPLES.portrait} alt="Portrait word search puzzle with animal images" className="w-full" loading="lazy" />
            </div>
            {/* Landscape puzzle in browser frame */}
            <div className="rounded-xl overflow-hidden shadow-xl border border-stone-200">
              <div className="bg-stone-100 px-4 py-2.5 flex items-center gap-2 border-b border-stone-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 text-center">lessoncraftstudio.com/apps/word-search</div>
              </div>
              <img src={PUZZLE_SAMPLES.landscape} alt="Landscape word search puzzle" className="w-full" loading="lazy" />
            </div>
          </div>
          <div className="text-center mt-8">
            <WPBuyButton config={config} />
          </div>
        </div>
      </section>

      {/* ── 12. IMAGE LIBRARY SHOWCASE ────────────────── */}
      <section className="py-16 md:py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">Professional Image Library Included</h2>
          <p className="text-slate-600 mb-10 max-w-2xl mx-auto">319 professionally curated, child-friendly images across 10 themes. Every image is ready for commercial use.</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-8">
            {LIBRARY_IMAGES.map((img) => (
              <div key={img.label} className="aspect-square bg-white rounded-xl p-2 shadow-sm border border-stone-100 hover:shadow-md hover:scale-105 transition-all">
                <img src={img.src} alt={img.label} className="w-full h-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500">Showing 16 of 319 images across Animals, Fruits, Vegetables &amp; Christmas themes</p>
        </div>
      </section>

      {/* ── 13. HOW IT WORKS ─────────────────────────── */}
      {config.steps && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {config.steps.map((s) => (
                <div key={s.number} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">{s.number}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 14. WHAT YOU CAN CREATE ──────────────────── */}
      {config.showcase && (
        <section className="py-16 md:py-20 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">{config.showcase.headline}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {config.showcase.items.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-teal-700 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 15. PERFECT FOR ──────────────────────────── */}
      {config.audiences && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">Perfect For</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {config.audiences.map((a) => (
                <div key={a.title} className="flex items-start gap-4 bg-stone-50 rounded-2xl p-6 border border-stone-100">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Icon name={a.icon} className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{a.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 16. VALUE STACK ───────────────────────────── */}
      <section className="py-16 md:py-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">{config.valueStack.headline}</h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-teal-500">
            <ul className="space-y-4 mb-8">
              {config.valueStack.items.map((item) => (
                <li key={item.name} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <span className="flex items-center gap-2 text-slate-700">
                    <Icon name="check" className="w-5 h-5 text-teal-600" weight={2.5} />
                    {item.name}
                  </span>
                  <span className="text-slate-400 line-through text-sm">${item.value}</span>
                </li>
              ))}
            </ul>
            <div className="text-center border-t border-stone-200 pt-6">
              <p className="text-slate-500 mb-1">Total Value: <span className="line-through">${config.valueStack.totalValue}</span></p>
              <div className="inline-block bg-orange-500 text-white text-3xl font-bold px-8 py-3 rounded-xl shadow-lg shadow-orange-500/25">
                Today: ${config.valueStack.yourPrice}
              </div>
              <p className="text-sm text-slate-500 mt-3">{pricing.label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 17. BONUSES ──────────────────────────────── */}
      {config.bonuses && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">Free Bonuses Included</h2>
            <div className="space-y-4">
              {config.bonuses.map((b) => (
                <div key={b.name} className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Icon name="gift" className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-slate-900">{b.name}</h3>
                      <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">${b.value} value</span>
                    </div>
                    <p className="text-sm text-slate-600">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 18. GUARANTEE ────────────────────────────── */}
      <section className="py-16 md:py-20 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="bg-teal-700 rounded-2xl p-8 md:p-10 text-center text-white">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="shield" className="w-8 h-8 text-teal-200" />
            </div>
            <h2 className="sp-display text-2xl md:text-3xl font-bold mb-2">{config.guarantee.days}-Day Money-Back Guarantee</h2>
            <p className="text-teal-100 leading-relaxed max-w-xl mx-auto">{config.guarantee.text}</p>
          </div>
        </div>
      </section>

      {/* ── 19. URGENCY ──────────────────────────────── */}
      {config.urgency && (
        <section className="py-12 md:py-16 bg-gradient-to-r from-orange-500 to-amber-500">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Icon name="clock" className="w-6 h-6 text-white" weight={2} />
              <h2 className="text-2xl md:text-3xl font-bold text-white">{config.urgency.headline}</h2>
            </div>
            <p className="text-white/90 mb-6">{config.urgency.text}</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/70 line-through text-2xl">${config.urgency.regularPrice}</span>
              <span className="bg-white text-orange-600 text-3xl font-bold px-6 py-2 rounded-xl">${pricing.price}</span>
            </div>
          </div>
        </section>
      )}

      {/* ── 20. FAQ ──────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-teal-800">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="sp-display text-3xl md:text-4xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
          <div>
            {config.faq.map((item, i) => (
              <FAQItem key={item.question} question={item.question} answer={item.answer} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 21. FINAL CTA + P.S. ────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 mb-6">Start Creating Today</h2>
          <div className="flex flex-col items-center gap-4 mb-10">
            <WPBuyButton config={config} />
            <div className="flex flex-wrap justify-center gap-4">
              {pricing.includes.slice(0, 4).map((inc) => (
                <span key={inc} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Icon name="check" className="w-4 h-4 text-teal-600" weight={2.5} />
                  {inc}
                </span>
              ))}
            </div>
            <WPDisclaimer config={config} />
          </div>
          {config.closingPs && (
            <div className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-100 text-left">
              <p className="text-sm text-slate-500 font-semibold mb-2">P.S.</p>
              <p className="text-slate-700 leading-relaxed">{config.closingPs}</p>
            </div>
          )}
        </div>
      </section>

      <ComplianceFooter locale={locale} />
    </>
  );
}

/* ═══════════════════════════════════════════
   OTO LAYOUT — Upsell Pages (OTO1 + OTO2)
   ═══════════════════════════════════════════ */

function OTOLayout({ config, locale }: Props) {
  const { pricing } = config;
  const isOto1 = !!config.comparison;

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          {config.hero.badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold tracking-wide mb-6 border border-orange-200">
              {config.hero.badge}
            </span>
          )}
          <h1 className="sp-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">{config.hero.headline}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">{config.hero.subheadline}</p>
          <WPBuyButton config={config} />
          {config.hero.trustBadges && (
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {config.hero.trustBadges.map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Icon name="check" className="w-4 h-4 text-teal-600" weight={2.5} />
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 2. COMPARISON (OTO1) ─────────────────────── */}
      {config.comparison && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl p-6 bg-stone-50 border border-stone-200">
                <h3 className="text-lg font-bold text-slate-500 mb-4">{config.comparison.current.label}</h3>
                <ul className="space-y-3">
                  {config.comparison.current.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-600">
                      <span className="text-slate-400">&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-6 bg-teal-50 border-2 border-teal-500 relative">
                <span className="absolute -top-3 right-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">UPGRADE</span>
                <h3 className="text-lg font-bold text-teal-800 mb-4">{config.comparison.upgrade.label}</h3>
                <ul className="space-y-3">
                  {config.comparison.upgrade.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-700">
                      <Icon name="check" className="w-4 h-4 text-teal-600 flex-shrink-0" weight={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 2b. HOW IT WORKS (OTO2) ──────────────────── */}
      {config.steps && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {config.steps.map((s) => (
                <div key={s.number} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">{s.number}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. REAL IMAGE GRID (OTO1) ────────────────── */}
      {isOto1 && (
        <section className="py-16 md:py-20 bg-stone-50">
          <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">Preview the Image Quality</h2>
            <p className="text-slate-600 mb-10 max-w-2xl mx-auto">Every image is professionally designed, child-friendly, and ready for commercial use.</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-8">
              {LIBRARY_IMAGES.map((img) => (
                <div key={img.label} className="aspect-square bg-white rounded-xl p-2 shadow-sm border border-stone-100 hover:shadow-md hover:scale-105 transition-all">
                  <img src={img.src} alt={img.label} className="w-full h-full object-contain" loading="lazy" />
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">16 of 3,000+ images across 104 themes</p>
          </div>
        </section>
      )}

      {/* ── 3b. MULTI-LANGUAGE PROOF (OTO2) ──────────── */}
      {config.languagesGrid && (
        <section className="py-16 md:py-20 bg-stone-50">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">Real Multi-Language Output</h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">Same quality, different languages. Here are real puzzles generated in English, German, and French.</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl overflow-hidden shadow-lg border border-stone-200">
                <div className="bg-stone-100 px-3 py-2 text-center border-b border-stone-200">
                  <span className="text-sm font-semibold text-slate-700">{FLAG_EMOJI.gb} English</span>
                </div>
                <img src={PUZZLE_SAMPLES.portrait} alt="English word search puzzle" className="w-full" loading="lazy" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg border border-stone-200">
                <div className="bg-stone-100 px-3 py-2 text-center border-b border-stone-200">
                  <span className="text-sm font-semibold text-slate-700">{FLAG_EMOJI.de} Deutsch</span>
                </div>
                <img src={PUZZLE_SAMPLES.german} alt="German word search puzzle" className="w-full" loading="lazy" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg border border-stone-200">
                <div className="bg-stone-100 px-3 py-2 text-center border-b border-stone-200">
                  <span className="text-sm font-semibold text-slate-700">{FLAG_EMOJI.fr} Français</span>
                </div>
                <img src={PUZZLE_SAMPLES.french} alt="French word search puzzle" className="w-full" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. THEME CATEGORIES (OTO1) ───────────────── */}
      {config.themeCategories && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">{config.themeCategories.headline}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {config.themeCategories.categories.map((cat) => (
                <div key={cat.name} className="bg-stone-50 rounded-xl px-4 py-3 border border-stone-100 text-center">
                  <p className="font-medium text-slate-800 text-sm">{cat.name}</p>
                  {cat.count > 0 && <p className="text-xs text-slate-500">{cat.count} images</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4b. LANGUAGES GRID (OTO2) ────────────────── */}
      {config.languagesGrid && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">{config.languagesGrid.headline}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {config.languagesGrid.languages.map((lang) => (
                <div key={lang.name} className="bg-stone-50 rounded-xl px-4 py-4 border border-stone-100 text-center flex items-center justify-center gap-3">
                  <span className="text-2xl">{FLAG_EMOJI[lang.flag] || lang.flag}</span>
                  <span className="font-medium text-slate-800">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. CONTENT MATH (OTO1) / MARKET EXPANSION (OTO2) ── */}
      {(config.contentMath || config.marketExpansion) && (
        <section className="py-16 md:py-20 bg-stone-50">
          <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
            <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {config.contentMath?.headline || config.marketExpansion?.headline}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {config.contentMath?.description || config.marketExpansion?.description}
            </p>
          </div>
        </section>
      )}

      {/* ── 6. VALUE STACK ───────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="sp-display text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10">{config.valueStack.headline}</h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border-2 border-teal-500">
            <ul className="space-y-4 mb-8">
              {config.valueStack.items.map((item) => (
                <li key={item.name} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <span className="flex items-center gap-2 text-slate-700">
                    <Icon name="check" className="w-5 h-5 text-teal-600" weight={2.5} />
                    {item.name}
                  </span>
                  <span className="text-slate-400 line-through text-sm">${item.value}</span>
                </li>
              ))}
            </ul>
            <div className="text-center border-t border-stone-200 pt-6">
              <p className="text-slate-500 mb-1">Total Value: <span className="line-through">${config.valueStack.totalValue}</span></p>
              <p className="text-3xl font-bold text-orange-500 mb-4">Add for ${config.valueStack.yourPrice}</p>
              <WPBuyButton config={config} />
              <p className="text-sm text-slate-500 mt-3">{pricing.label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. GUARANTEE ─────────────────────────────── */}
      <section className="py-12 md:py-16 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="bg-teal-700 rounded-2xl p-6 md:p-8 text-center text-white">
            <Icon name="shield" className="w-10 h-10 text-teal-200 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">{config.guarantee.days}-Day Money-Back Guarantee</h3>
            <p className="text-teal-100 text-sm leading-relaxed">{config.guarantee.text}</p>
          </div>
        </div>
      </section>

      {/* ── 7b. FAQ ──────────────────────────────────── */}
      {config.faq.length > 0 && (
        <section className="py-16 md:py-20 bg-teal-800">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="sp-display text-2xl md:text-3xl font-bold text-white text-center mb-8">Questions?</h2>
            <div>
              {config.faq.map((item, i) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} idx={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. FINAL CTA / DECLINE ───────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <WPBuyButton config={config} />
          <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
            {pricing.includes.slice(0, 3).map((inc) => (
              <span key={inc} className="flex items-center gap-1.5 text-sm text-slate-500">
                <Icon name="check" className="w-4 h-4 text-teal-600" weight={2.5} />
                {inc}
              </span>
            ))}
          </div>
          <WPDisclaimer />
          {config.declineText && (
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600 underline transition-colors mt-4 inline-block">
              {config.declineText}
            </a>
          )}
        </div>
      </section>

      <ComplianceFooter locale={locale} />
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */

export function SalesPageClient({ config, locale }: Props) {
  return (
    <div className="sp min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .sp { font-family: 'DM Sans', system-ui, sans-serif; }
        .sp .sp-display { font-family: 'Playfair Display', Georgia, serif; }
      `}</style>
      {config.isOto ? <OTOLayout config={config} locale={locale} /> : <FELayout config={config} locale={locale} />}
    </div>
  );
}
