/* eslint-disable @next/next/no-img-element */
/**
 * ShowcaseSections — 4 reusable visual showcase section templates.
 * Config-driven: each app provides its own colors, images, copy, and decorative elements.
 * Pure Tailwind CSS, no external fonts, no JS animations.
 */

// ─── Static class map — Tailwind JIT needs literal strings to generate CSS ───

type AccentClasses = {
  floatLg: string; floatMd: string; floatSm: string; floatXs: string; floatMid: string;
  badge: string; sub: string; border: string; pillText: string; pillBorder: string;
  heading900: string; tagBg: string; spotPillText: string; spotPillBorder: string;
};

const ac: Record<string, AccentClasses> = {
  amber:   { floatLg: 'text-amber-300/30',   floatMd: 'text-amber-200/25',   floatSm: 'text-amber-300/20',   floatXs: 'text-amber-200/30',   floatMid: 'text-amber-300/25',   badge: 'text-amber-700',   sub: 'text-amber-900/70',   border: 'border-amber-200',   pillText: 'text-amber-800',   pillBorder: 'border-amber-200/50',   heading900: 'text-amber-900',   tagBg: 'bg-amber-600',   spotPillText: 'text-amber-700',   spotPillBorder: 'border-amber-200/60' },
  blue:    { floatLg: 'text-blue-300/30',    floatMd: 'text-blue-200/25',    floatSm: 'text-blue-300/20',    floatXs: 'text-blue-200/30',    floatMid: 'text-blue-300/25',    badge: 'text-blue-700',    sub: 'text-blue-900/70',    border: 'border-blue-200',    pillText: 'text-blue-800',    pillBorder: 'border-blue-200/50',    heading900: 'text-blue-900',    tagBg: 'bg-blue-600',    spotPillText: 'text-blue-700',    spotPillBorder: 'border-blue-200/60' },
  cyan:    { floatLg: 'text-cyan-300/30',    floatMd: 'text-cyan-200/25',    floatSm: 'text-cyan-300/20',    floatXs: 'text-cyan-200/30',    floatMid: 'text-cyan-300/25',    badge: 'text-cyan-700',    sub: 'text-cyan-900/70',    border: 'border-cyan-200',    pillText: 'text-cyan-800',    pillBorder: 'border-cyan-200/50',    heading900: 'text-cyan-900',    tagBg: 'bg-cyan-600',    spotPillText: 'text-cyan-700',    spotPillBorder: 'border-cyan-200/60' },
  emerald: { floatLg: 'text-emerald-300/30', floatMd: 'text-emerald-200/25', floatSm: 'text-emerald-300/20', floatXs: 'text-emerald-200/30', floatMid: 'text-emerald-300/25', badge: 'text-emerald-700', sub: 'text-emerald-900/70', border: 'border-emerald-200', pillText: 'text-emerald-800', pillBorder: 'border-emerald-200/50', heading900: 'text-emerald-900', tagBg: 'bg-emerald-600', spotPillText: 'text-emerald-700', spotPillBorder: 'border-emerald-200/60' },
  green:   { floatLg: 'text-green-300/30',   floatMd: 'text-green-200/25',   floatSm: 'text-green-300/20',   floatXs: 'text-green-200/30',   floatMid: 'text-green-300/25',   badge: 'text-green-700',   sub: 'text-green-900/70',   border: 'border-green-200',   pillText: 'text-green-800',   pillBorder: 'border-green-200/50',   heading900: 'text-green-900',   tagBg: 'bg-green-600',   spotPillText: 'text-green-700',   spotPillBorder: 'border-green-200/60' },
  indigo:  { floatLg: 'text-indigo-300/30',  floatMd: 'text-indigo-200/25',  floatSm: 'text-indigo-300/20',  floatXs: 'text-indigo-200/30',  floatMid: 'text-indigo-300/25',  badge: 'text-indigo-700',  sub: 'text-indigo-900/70',  border: 'border-indigo-200',  pillText: 'text-indigo-800',  pillBorder: 'border-indigo-200/50',  heading900: 'text-indigo-900',  tagBg: 'bg-indigo-600',  spotPillText: 'text-indigo-700',  spotPillBorder: 'border-indigo-200/60' },
  orange:  { floatLg: 'text-orange-300/30',  floatMd: 'text-orange-200/25',  floatSm: 'text-orange-300/20',  floatXs: 'text-orange-200/30',  floatMid: 'text-orange-300/25',  badge: 'text-orange-700',  sub: 'text-orange-900/70',  border: 'border-orange-200',  pillText: 'text-orange-800',  pillBorder: 'border-orange-200/50',  heading900: 'text-orange-900',  tagBg: 'bg-orange-600',  spotPillText: 'text-orange-700',  spotPillBorder: 'border-orange-200/60' },
  pink:    { floatLg: 'text-pink-300/30',    floatMd: 'text-pink-200/25',    floatSm: 'text-pink-300/20',    floatXs: 'text-pink-200/30',    floatMid: 'text-pink-300/25',    badge: 'text-pink-700',    sub: 'text-pink-900/70',    border: 'border-pink-200',    pillText: 'text-pink-800',    pillBorder: 'border-pink-200/50',    heading900: 'text-pink-900',    tagBg: 'bg-pink-600',    spotPillText: 'text-pink-700',    spotPillBorder: 'border-pink-200/60' },
  purple:  { floatLg: 'text-purple-300/30',  floatMd: 'text-purple-200/25',  floatSm: 'text-purple-300/20',  floatXs: 'text-purple-200/30',  floatMid: 'text-purple-300/25',  badge: 'text-purple-700',  sub: 'text-purple-900/70',  border: 'border-purple-200',  pillText: 'text-purple-800',  pillBorder: 'border-purple-200/50',  heading900: 'text-purple-900',  tagBg: 'bg-purple-600',  spotPillText: 'text-purple-700',  spotPillBorder: 'border-purple-200/60' },
  red:     { floatLg: 'text-red-300/30',     floatMd: 'text-red-200/25',     floatSm: 'text-red-300/20',     floatXs: 'text-red-200/30',     floatMid: 'text-red-300/25',     badge: 'text-red-700',     sub: 'text-red-900/70',     border: 'border-red-200',     pillText: 'text-red-800',     pillBorder: 'border-red-200/50',     heading900: 'text-red-900',     tagBg: 'bg-red-600',     spotPillText: 'text-red-700',     spotPillBorder: 'border-red-200/60' },
  rose:    { floatLg: 'text-rose-300/30',    floatMd: 'text-rose-200/25',    floatSm: 'text-rose-300/20',    floatXs: 'text-rose-200/30',    floatMid: 'text-rose-300/25',    badge: 'text-rose-700',    sub: 'text-rose-900/70',    border: 'border-rose-200',    pillText: 'text-rose-800',    pillBorder: 'border-rose-200/50',    heading900: 'text-rose-900',    tagBg: 'bg-rose-600',    spotPillText: 'text-rose-700',    spotPillBorder: 'border-rose-200/60' },
  sky:     { floatLg: 'text-sky-300/30',     floatMd: 'text-sky-200/25',     floatSm: 'text-sky-300/20',     floatXs: 'text-sky-200/30',     floatMid: 'text-sky-300/25',     badge: 'text-sky-700',     sub: 'text-sky-900/70',     border: 'border-sky-200',     pillText: 'text-sky-800',     pillBorder: 'border-sky-200/50',     heading900: 'text-sky-900',     tagBg: 'bg-sky-600',     spotPillText: 'text-sky-700',     spotPillBorder: 'border-sky-200/60' },
  teal:    { floatLg: 'text-teal-300/30',    floatMd: 'text-teal-200/25',    floatSm: 'text-teal-300/20',    floatXs: 'text-teal-200/30',    floatMid: 'text-teal-300/25',    badge: 'text-teal-700',    sub: 'text-teal-900/70',    border: 'border-teal-200',    pillText: 'text-teal-800',    pillBorder: 'border-teal-200/50',    heading900: 'text-teal-900',    tagBg: 'bg-teal-600',    spotPillText: 'text-teal-700',    spotPillBorder: 'border-teal-200/60' },
  violet:  { floatLg: 'text-violet-300/30',  floatMd: 'text-violet-200/25',  floatSm: 'text-violet-300/20',  floatXs: 'text-violet-200/30',  floatMid: 'text-violet-300/25',  badge: 'text-violet-700',  sub: 'text-violet-900/70',  border: 'border-violet-200',  pillText: 'text-violet-800',  pillBorder: 'border-violet-200/50',  heading900: 'text-violet-900',  tagBg: 'bg-violet-600',  spotPillText: 'text-violet-700',  spotPillBorder: 'border-violet-200/60' },
  yellow:  { floatLg: 'text-yellow-300/30',  floatMd: 'text-yellow-200/25',  floatSm: 'text-yellow-300/20',  floatXs: 'text-yellow-200/30',  floatMid: 'text-yellow-300/25',  badge: 'text-yellow-700',  sub: 'text-yellow-900/70',  border: 'border-yellow-200',  pillText: 'text-yellow-800',  pillBorder: 'border-yellow-200/50',  heading900: 'text-yellow-900',  tagBg: 'bg-yellow-600',  spotPillText: 'text-yellow-700',  spotPillBorder: 'border-yellow-200/60' },
};

// ─── Types ───

export interface ShowcaseImage {
  src: string;
  alt: string;
}

export interface HeroShowcaseConfig {
  gradient: string;
  accentColor: string;       // Tailwind color name (e.g., 'orange', 'pink', 'indigo')
  badge: string;             // e.g., 'Grades K-2'
  heading: string;
  subheading: string;
  images: [ShowcaseImage, ShowcaseImage, ShowcaseImage];
  pills: Array<{ label: string; icon: string }>;
  decorativeSymbol: string;  // e.g., '+', '−', '★', 'A'
}

export interface TierConfig {
  name: string;
  gradientClass: string;     // e.g., 'from-emerald-400 to-green-500'
  textColorClass: string;
  borderColorClass: string;
  stars: number;
  image: ShowcaseImage;
  desc: string;
}

export interface TieredShowcaseConfig {
  gradient: string;
  badge: string;
  heading: string;
  subheading: string;
  tiers: [TierConfig, TierConfig, TierConfig];
  trophyText: string;
}

export interface SpotlightConfig {
  gradient: string;
  heading: string;
  tagline: string;
  image: ShowcaseImage;
  pills: string[];
  hasBunting: boolean;
  hasConfetti: boolean;
  accentColor: string;
}

export interface GalleryItem {
  image: ShowcaseImage;
  label: string;
}

export interface GalleryConfig {
  gradient: string;
  heading: string;
  subheading: string;
  items: [GalleryItem, GalleryItem, GalleryItem];
  pills: string[];
  frameColor: string;        // CSS hex color for frame accents
}

// ─── Section 1: Hero Worksheet Showcase (staircase layout, 3 images) ───

export function WorksheetShowcaseSection({ config }: { config: HeroShowcaseConfig }) {
  const { gradient, accentColor, badge, heading, subheading, images, pills, decorativeSymbol } = config;
  const c = ac[accentColor] ?? ac.orange;

  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: gradient }}>
      {/* Floating decorative symbols */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <span className={`absolute text-6xl font-bold ${c.floatLg} top-[8%] left-[5%] rotate-12`}>{decorativeSymbol}</span>
        <span className={`absolute text-5xl font-bold ${c.floatMd} top-[60%] left-[12%] -rotate-6`}>{decorativeSymbol}</span>
        <span className={`absolute text-7xl font-bold ${c.floatSm} top-[15%] right-[8%] rotate-45`}>{decorativeSymbol}</span>
        <span className={`absolute text-4xl font-bold ${c.floatXs} bottom-[12%] right-[15%] -rotate-12`}>{decorativeSymbol}</span>
        <span className={`absolute text-5xl font-bold ${c.floatMid} bottom-[25%] left-[40%]`} style={{ transform: 'rotate(20deg)' }}>{decorativeSymbol}</span>
        {/* Sparkle dots */}
        <span className="absolute w-2 h-2 rounded-full bg-yellow-300/60 top-[20%] left-[25%]" />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200/50 top-[40%] right-[20%]" />
        <span className="absolute w-2.5 h-2.5 rounded-full bg-amber-300/40 bottom-[30%] left-[60%]" />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300/50 top-[70%] left-[80%]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/80 ${c.badge} shadow-sm mb-4`}>
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {heading}
          </h2>
          <p className={`text-lg ${c.sub} max-w-xl mx-auto`}>
            {subheading}
          </p>
        </div>

        {/* Staircase worksheet layout */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {/* Worksheet 1 — lowest step */}
          <div className="w-full md:w-1/3 md:self-end">
            <div className={`rounded-xl overflow-hidden shadow-xl bg-white border-2 ${c.border} transform md:translate-y-8`}>
              <img src={images[0].src} alt={images[0].alt} width={400} height={566} className="w-full h-auto" loading="eager" decoding="async" fetchPriority="high" />
            </div>
          </div>

          {/* Golden connector circle */}
          <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg text-white font-bold text-xl flex-shrink-0 mb-8">
            {decorativeSymbol}
          </div>

          {/* Worksheet 2 — middle step */}
          <div className="w-full md:w-1/3">
            <div className={`rounded-xl overflow-hidden shadow-xl bg-white border-2 ${c.border} transform md:translate-y-0`}>
              <img src={images[1].src} alt={images[1].alt} width={400} height={566} className="w-full h-auto" loading="lazy" decoding="async" />
            </div>
          </div>

          {/* Golden connector circle */}
          <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg text-white font-bold text-xl flex-shrink-0 mb-16">
            {decorativeSymbol}
          </div>

          {/* Worksheet 3 — highest step */}
          <div className="w-full md:w-1/3 md:self-start">
            <div className={`rounded-xl overflow-hidden shadow-xl bg-white border-2 ${c.border} transform md:-translate-y-8`}>
              <img src={images[2].src} alt={images[2].alt} width={400} height={566} className="w-full h-auto" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {pills.map((pill) => (
            <span
              key={pill.label}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-white/90 ${c.pillText} shadow-sm border ${c.pillBorder}`}
            >
              <span aria-hidden="true">{pill.icon}</span>
              {pill.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: Tiered Showcase (3-column tiers with star ratings) ───

export function TieredShowcaseSection({ config }: { config: TieredShowcaseConfig }) {
  const { gradient, badge, heading, subheading, tiers, trophyText } = config;

  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: gradient }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/80 text-indigo-700 shadow-sm mb-4">
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {heading}
          </h2>
          <p className="text-lg text-gray-700/80 max-w-xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Tiers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10">
          {tiers.map((tier) => (
            <div key={tier.name} className="flex flex-col items-center">
              {/* Tier badge */}
              <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r ${tier.gradientClass} text-white font-bold text-sm shadow-md mb-4`}>
                {Array.from({ length: 3 }).map((_, si) => (
                  <svg key={si} className={`w-4 h-4 ${si < tier.stars ? 'opacity-100' : 'opacity-30'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-1">{tier.name}</span>
              </div>

              {/* Worksheet card */}
              <div className={`rounded-xl overflow-hidden shadow-lg bg-white border-2 ${tier.borderColorClass} w-full`}>
                <img src={tier.image.src} alt={tier.image.alt} width={400} height={566} className="w-full h-auto" loading="lazy" decoding="async" />
              </div>

              {/* Description */}
              <p className={`mt-3 text-sm font-medium ${tier.textColorClass} text-center`}>
                {tier.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trophy badge */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 shadow-md text-amber-700 font-semibold text-sm border border-amber-200">
            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v1a2 2 0 002 2h1v1H5a2 2 0 00-2 2v1a2 2 0 002 2h.5l-.5 3h10l-.5-3H15a2 2 0 002-2v-1a2 2 0 00-2-2h-1V7h1a2 2 0 002-2V4a2 2 0 00-2-2H5z" clipRule="evenodd" />
            </svg>
            {trophyText}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Spotlight (single centered image, golden frame) ───

export function SpotlightSection({ config }: { config: SpotlightConfig }) {
  const { gradient, heading, tagline, image, pills, hasBunting, hasConfetti, accentColor } = config;
  const c = ac[accentColor] ?? ac.orange;

  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: gradient }}>
      {/* Bunting flags */}
      {hasBunting && (
        <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1200 48" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 30 }).map((_, i) => {
              const colors = ['#f87171', '#60a5fa', '#fbbf24', '#34d399', '#a78bfa'];
              return <path key={i} d={`M${i * 40} 0 L${i * 40 + 40} 0 L${i * 40 + 20} 40 Z`} fill={colors[i % 5]} opacity="0.7" />;
            })}
            <line x1="0" y1="0" x2="1200" y2="0" stroke="#7c3aed" strokeWidth="2" />
          </svg>
        </div>
      )}

      {/* Confetti dots */}
      {hasConfetti && (
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <span className="absolute w-3 h-3 rounded-full bg-pink-300/40 top-[15%] left-[10%]" />
          <span className="absolute w-2 h-2 rounded-full bg-blue-300/40 top-[25%] right-[15%]" />
          <span className="absolute w-2.5 h-2.5 rounded-full bg-yellow-300/50 top-[45%] left-[8%]" />
          <span className="absolute w-2 h-2 rounded-full bg-green-300/40 bottom-[20%] right-[10%]" />
          <span className="absolute w-3 h-3 rounded-full bg-purple-300/30 bottom-[35%] left-[20%]" />
          <span className="absolute w-2 h-2 rounded-full bg-red-300/40 top-[60%] right-[25%]" />
          <span className="absolute w-1.5 h-1.5 rounded-full bg-amber-300/50 top-[35%] left-[45%]" />
          <span className="absolute w-2 h-2 rounded-full bg-teal-300/40 bottom-[15%] left-[55%]" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 mt-4">
          <h2 className={`text-4xl md:text-5xl font-extrabold ${c.heading900} mb-3`}>
            {heading}
          </h2>
          <span className={`inline-block px-5 py-1.5 rounded-full text-sm font-bold ${c.tagBg} text-white shadow-md`}>
            {tagline}
          </span>
        </div>

        {/* Spotlight worksheet */}
        <div className="max-w-sm mx-auto">
          <div className="p-1.5 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 shadow-2xl">
            <div className="rounded-xl overflow-hidden bg-white">
              <img src={image.src} alt={image.alt} width={400} height={566} className="w-full h-auto" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {pills.map((text) => (
            <span
              key={text}
              className={`px-5 py-2 rounded-full text-sm font-semibold bg-white/80 ${c.spotPillText} shadow-sm border ${c.spotPillBorder}`}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Gallery (museum gallery, 3 framed images) ───

export function GallerySection({ config }: { config: GalleryConfig }) {
  const { gradient, heading, subheading, items, pills, frameColor } = config;

  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: gradient }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 mb-3">
            {heading}
          </h2>
          <p className="text-lg text-stone-600 max-w-xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Gallery grid with copper-style frames */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto" role="group" aria-label={heading}>
          {items.map((item) => (
            <figure key={item.label + item.image.src} className="flex flex-col items-center">
              {/* Corner accents + framed image */}
              <div className="relative w-full">
                <div className="absolute -top-1.5 -left-1.5 w-8 h-8 border-t-[3px] border-l-[3px] rounded-tl-sm" style={{ borderColor: frameColor }} />
                <div className="absolute -top-1.5 -right-1.5 w-8 h-8 border-t-[3px] border-r-[3px] rounded-tr-sm" style={{ borderColor: frameColor }} />
                <div className="absolute -bottom-1.5 -left-1.5 w-8 h-8 border-b-[3px] border-l-[3px] rounded-bl-sm" style={{ borderColor: frameColor }} />
                <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 border-b-[3px] border-r-[3px] rounded-br-sm" style={{ borderColor: frameColor }} />

                <div className="rounded-lg overflow-hidden shadow-lg bg-white border border-stone-200">
                  <img src={item.image.src} alt={item.image.alt} width={400} height={566} className="w-full h-auto" loading="lazy" decoding="async" />
                </div>
              </div>

              {/* Plaque label */}
              <figcaption className="mt-3 px-4 py-1 rounded text-xs font-semibold tracking-wide uppercase text-center" style={{ background: `linear-gradient(135deg, ${frameColor}dd, ${frameColor})`, color: '#fefcf3' }}>
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Feature pills — frosted glass */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {pills.map((text) => (
            <span
              key={text}
              className="px-5 py-2 rounded-full text-sm font-semibold shadow-sm border"
              style={{
                background: 'rgba(255,255,255,0.75)',
                borderColor: `${frameColor}4d`,
                color: '#78350f',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
