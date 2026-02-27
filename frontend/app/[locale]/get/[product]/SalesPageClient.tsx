'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { SalesPageConfig } from '@/config/sales-pages';

interface Props {
  config: SalesPageConfig;
  locale: string;
}

/* ─── Icon Components ─── */

function GridIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}
function ImagesIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
    </svg>
  );
}
function EditIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM19.5 7.125L16.862 4.487M12 15.75h6.75" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}
function TypeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}
function PaletteIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  );
}
function SlidersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  );
}
function RocketIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}
function StoreIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className || 'w-5 h-5'} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

const featureIconMap: Record<string, () => JSX.Element> = {
  grid: GridIcon,
  images: ImagesIcon,
  edit: EditIcon,
  download: DownloadIcon,
  type: TypeIcon,
  shield: ShieldIcon,
};
const stepIconMap: Record<string, () => JSX.Element> = {
  palette: PaletteIcon,
  sliders: SlidersIcon,
  rocket: RocketIcon,
};
const audienceIconMap: Record<string, () => JSX.Element> = {
  store: StoreIcon,
  book: BookIcon,
  users: UsersIcon,
};

/* ─── CTA Button (reused in hero + pricing) ─── */
function CTAButton({ config, size = 'lg' }: { config: SalesPageConfig; size?: 'lg' | 'md' }) {
  const href = config.checkoutUrl || '#pricing';
  const isExternal = config.checkoutUrl.startsWith('http');
  const sizeClasses = size === 'lg'
    ? 'px-10 py-5 text-lg'
    : 'px-8 py-4 text-base';

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group relative inline-flex items-center justify-center gap-3 ${sizeClasses} rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
      style={{
        background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
        boxShadow: '0 0 40px rgba(6,182,212,0.3), 0 0 80px rgba(168,85,247,0.15)',
      }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {config.hero.ctaPrimary} &mdash; ${config.pricing.price}
        <ArrowRightIcon />
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
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="text-lg font-semibold text-white/90 pr-4">{question}</span>
        <span className={`flex-shrink-0 text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="text-white/60 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ─── Main Sales Page ─── */
export function SalesPageClient({ config, locale }: Props) {
  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════
          SECTION 1: HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Deep gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg,
              #030305 0%,
              #0a0a1a 25%,
              #0f0f2a 50%,
              #0a1628 75%,
              #051020 100%
            )`,
          }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)',
              top: '-25%',
              right: '-15%',
              animation: 'pulse 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0.03) 40%, transparent 70%)',
              bottom: '-15%',
              left: '-10%',
              animation: 'pulse 10s ease-in-out infinite reverse',
            }}
          />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.15) 100%)',
                border: '1px solid rgba(6,182,212,0.25)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-medium text-cyan-300">
                Word Search Generator
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
            >
              <span className="text-white">Create Professional </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
                }}
              >
                Word Search Puzzles
              </span>
              <br />
              <span className="text-white">in Minutes</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              {config.hero.subheadline}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <CTAButton config={config} size="lg" />
              <Link
                href={config.freeAppUrl}
                className="group px-8 py-4 rounded-xl font-semibold text-white/80 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
              >
                {config.hero.ctaSecondary}
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 justify-center">
              {config.hero.trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                  <CheckIcon className="w-4 h-4 text-emerald-400" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0a0a1a]" />
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2: LIVE DEMO / PREVIEW
      ═══════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f2a 50%, #0a0a1a 100%)',
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
            >
              See It in Action
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Try the free version right now. The paid version removes the watermark and unlocks full commercial rights.
            </p>
          </div>

          {/* Embedded app preview */}
          <div className="max-w-5xl mx-auto">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3 bg-black/30 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white/10 rounded-lg px-4 py-1.5 text-xs text-white/40 max-w-md mx-auto text-center">
                    lessoncraftstudio.com/en/apps/word-search-worksheets
                  </div>
                </div>
              </div>

              {/* App iframe */}
              <div className="relative bg-white" style={{ height: '600px' }}>
                <iframe
                  src="/worksheet-generators/wordsearch.html?lang=en&embed=1"
                  className="w-full h-full border-0"
                  title="Word Search Generator Preview"
                  loading="lazy"
                />
              </div>
            </div>

            <p className="text-center text-white/40 text-sm mt-4">
              This is the actual generator. Try it now — create a puzzle in under 3 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3: WHAT YOU GET (Feature Grid)
      ═══════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        {/* Warm gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg,
              #fffbeb 0%,
              #fef3c7 30%,
              #fde68a 60%,
              #fef3c7 100%
            )`,
          }}
        />

        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-amber-200/50 border border-amber-300">
              <span className="text-amber-700">&#x2728;</span>
              <span className="text-sm font-medium text-amber-800">What You Get</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
              style={{ fontFamily: 'var(--font-poppins), Georgia, serif' }}
            >
              Everything Included
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              One purchase. All features. No upsells for basic functionality.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {config.features.map((feature, index) => {
              const IconComponent = featureIconMap[feature.icon] || GridIcon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <IconComponent />
                  </div>
                  <h3
                    className="text-xl font-bold text-stone-800 mb-3"
                    style={{ fontFamily: 'var(--font-poppins), Georgia, serif' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4: HOW IT WORKS (3 Steps)
      ═══════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg,
              #fef3c7 0%,
              #fffbeb 30%,
              #f8fafc 70%,
              #f1f5f9 100%
            )`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-stone-100 border border-stone-200">
              <span className="text-stone-600">&#x1F680;</span>
              <span className="text-sm font-medium text-stone-700">How It Works</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
              style={{ fontFamily: 'var(--font-poppins), Georgia, serif' }}
            >
              3 Steps to Your First Puzzle
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              From idea to sellable PDF in under 3 minutes. No design skills required.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {config.steps.map((step) => {
              const IconComponent = stepIconMap[step.icon] || PaletteIcon;
              return (
                <div key={step.number} className="relative text-center">
                  {/* Step number */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl mx-auto mb-6 border-4 border-white">
                    {step.number}
                  </div>

                  {/* Connector line (desktop) */}
                  {step.number < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-amber-300 to-orange-300" />
                  )}

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-700 mx-auto mb-4">
                      <IconComponent />
                    </div>
                    <h3 className="text-xl font-bold text-stone-800 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5: WHO IS THIS FOR (Audience Cards)
      ═══════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg,
              #f1f5f9 0%,
              #e2e8f0 50%,
              #f1f5f9 100%
            )`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-slate-200/60 border border-slate-300">
              <span className="text-slate-600">&#x1F3AF;</span>
              <span className="text-sm font-medium text-slate-700">Perfect For</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
              style={{ fontFamily: 'var(--font-poppins), Georgia, serif' }}
            >
              Built for Creators Who Sell
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Whether you sell digital products, publish books, or create classroom materials.
            </p>
          </div>

          {/* Audience cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {config.audiences.map((audience, index) => {
              const IconComponent = audienceIconMap[audience.icon] || UsersIcon;
              const gradients = [
                'from-cyan-500 to-blue-600',
                'from-violet-500 to-purple-600',
                'from-pink-500 to-rose-600',
              ];
              return (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-8 shadow-lg border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    <IconComponent />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-3">
                    {audience.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {audience.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6: PRICING / CTA
      ═══════════════════════════════════════ */}
      <section id="pricing" className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg,
              #0a0a0a 0%,
              #1a1a2e 40%,
              #16213e 70%,
              #0f172a 100%
            )`,
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
              top: '-20%',
              right: '-10%',
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
              bottom: '-15%',
              left: '-5%',
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            {/* Pricing card */}
            <div
              className="relative rounded-3xl p-1"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
              }}
            >
              <div className="bg-[#0f0f2a] rounded-[1.35rem] p-8 sm:p-10">
                <div className="text-center mb-8">
                  <h2
                    className="text-3xl sm:text-4xl font-bold text-white mb-2"
                    style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                  >
                    Word Search Generator
                  </h2>
                  <p className="text-white/50">{config.pricing.label}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl text-white/30 line-through">
                      {config.pricing.currency}{config.pricing.comparePrice}
                    </span>
                    <span
                      className="text-6xl font-black text-white"
                      style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                    >
                      {config.pricing.currency}{config.pricing.price}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm">One-time payment. Lifetime access.</p>
                </div>

                {/* Includes list */}
                <div className="space-y-3 mb-8">
                  {config.pricing.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                  <CTAButton config={config} size="md" />
                </div>

                {/* Guarantee */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <ShieldIcon />
                    <span className="text-sm font-medium text-emerald-400">
                      {config.pricing.guarantee}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary link */}
            <div className="text-center mt-6">
              <Link
                href={config.freeAppUrl}
                className="text-white/40 hover:text-white/60 text-sm underline underline-offset-4 transition-colors"
              >
                Or try free with watermark first
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 7: FAQ
      ═══════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #0a0a1a 50%, #030305 100%)',
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            {/* FAQ items */}
            <div>
              {config.faq.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>

            {/* Final CTA */}
            <div className="mt-16 text-center">
              <CTAButton config={config} size="lg" />
              <p className="mt-4 text-white/30 text-sm">
                {config.pricing.guarantee} &middot; {config.pricing.label}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
