/* eslint-disable @next/next/no-img-element */
/**
 * AdditionShowcase — 4 rich visual sections for the English addition app detail page.
 * Inspired by TPT thumbnail designs. Pure Tailwind CSS, no external fonts, no JS animations.
 * Only rendered when wpAppId === 'addition' && locale === 'en'.
 */

// ─── Section 1: Worksheet Showcase (warm orange gradient, staircase layout) ───
export function WorksheetShowcase() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 30%, #fdba74 60%, #fb923c 100%)' }}>
      {/* Floating plus signs */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <span className="absolute text-6xl font-bold text-orange-300/30 top-[8%] left-[5%] rotate-12">+</span>
        <span className="absolute text-5xl font-bold text-orange-200/25 top-[60%] left-[12%] -rotate-6">+</span>
        <span className="absolute text-7xl font-bold text-orange-300/20 top-[15%] right-[8%] rotate-45">+</span>
        <span className="absolute text-4xl font-bold text-orange-200/30 bottom-[12%] right-[15%] -rotate-12">+</span>
        <span className="absolute text-5xl font-bold text-orange-300/25 bottom-[25%] left-[40%] rotate-20">+</span>
        {/* Sparkle dots */}
        <span className="absolute w-2 h-2 rounded-full bg-yellow-300/60 top-[20%] left-[25%]" />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200/50 top-[40%] right-[20%]" />
        <span className="absolute w-2.5 h-2.5 rounded-full bg-amber-300/40 bottom-[30%] left-[60%]" />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300/50 top-[70%] left-[80%]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/80 text-orange-700 shadow-sm mb-4">
            Grades K-2
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Learn Math with Pictures!
          </h2>
          <p className="text-lg text-orange-900/70 max-w-xl mx-auto">
            Professional addition worksheets your students will love
          </p>
        </div>

        {/* Staircase worksheet layout */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {/* Worksheet 1 — lowest step */}
          <div className="w-full md:w-1/3 md:self-end">
            <div className="rounded-xl overflow-hidden shadow-xl bg-white border-2 border-orange-200 transform md:translate-y-8">
              <img
                src="/samples/english/addition/sample-1.webp"
                alt="Addition worksheet with themed pictures — beginner level"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* Golden connector circle */}
          <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg text-white font-bold text-xl flex-shrink-0 mb-8">
            +
          </div>

          {/* Worksheet 2 — middle step */}
          <div className="w-full md:w-1/3">
            <div className="rounded-xl overflow-hidden shadow-xl bg-white border-2 border-orange-200 transform md:translate-y-0">
              <img
                src="/samples/english/addition/sample-2.webp"
                alt="Addition worksheet with themed pictures — intermediate level"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* Golden connector circle */}
          <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg text-white font-bold text-xl flex-shrink-0 mb-16">
            +
          </div>

          {/* Worksheet 3 — highest step */}
          <div className="w-full md:w-1/3 md:self-start">
            <div className="rounded-xl overflow-hidden shadow-xl bg-white border-2 border-orange-200 transform md:-translate-y-8">
              <img
                src="/samples/english/addition/sample-3.webp"
                alt="Addition worksheet with themed pictures — advanced level"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            { label: 'Pictures + Numbers', icon: '🖼' },
            { label: 'Answer Keys', icon: '✓' },
            { label: 'Print-Ready', icon: '🖨' },
            { label: 'Free Trial with Watermark', icon: '★' },
          ].map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-white/90 text-orange-800 shadow-sm border border-orange-200/50"
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

// ─── Section 2: Difficulty Levels (sunrise gradient, 3 tiers) ───
export function DifficultyLevels() {
  const levels = [
    {
      name: 'Beginner',
      color: 'from-emerald-400 to-green-500',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      suns: 1,
      desc: 'Simple picture counting with numbers 1-5',
      image: '/samples/english/addition/sample-1.webp',
      imageAlt: 'Beginner addition worksheet — simple picture counting',
    },
    {
      name: 'Explorer',
      color: 'from-blue-400 to-indigo-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      suns: 2,
      desc: 'Mixed images with sums up to 10',
      image: '/samples/english/addition/sample-3.webp',
      imageAlt: 'Explorer addition worksheet — mixed images with sums to 10',
    },
    {
      name: 'Expert',
      color: 'from-amber-400 to-orange-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
      suns: 3,
      desc: 'Multi-step problems with sums up to 20',
      image: '/samples/english/addition/sample-5.webp',
      imageAlt: 'Expert addition worksheet — multi-step problems',
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: 'linear-gradient(180deg, #dbeafe 0%, #fef3c7 40%, #fed7aa 70%, #fecaca 100%)' }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/80 text-indigo-700 shadow-sm mb-4">
            Skill Levels
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Differentiated Learning for Every Child
          </h2>
          <p className="text-lg text-gray-700/80 max-w-xl mx-auto">
            Three difficulty tiers that grow with your students
          </p>
        </div>

        {/* Levels grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10">
          {levels.map((level, i) => (
            <div key={level.name} className="flex flex-col items-center">
              {/* Level badge */}
              <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r ${level.color} text-white font-bold text-sm shadow-md mb-4`}>
                {/* Sun rating icons */}
                {Array.from({ length: 3 }).map((_, si) => (
                  <svg key={si} className={`w-4 h-4 ${si < level.suns ? 'opacity-100' : 'opacity-30'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-1">{level.name}</span>
              </div>

              {/* Worksheet card */}
              <div className={`rounded-xl overflow-hidden shadow-lg bg-white border-2 ${level.borderColor} w-full`}>
                <img
                  src={level.image}
                  alt={level.imageAlt}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              {/* Description */}
              <p className={`mt-3 text-sm font-medium ${level.textColor} text-center`}>
                {level.desc}
              </p>

              {/* Connecting arrow (except last) */}
              {i < 2 && (
                <div className="hidden md:block absolute" style={{ display: 'none' }}>
                  {/* Arrows handled by layout flow */}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trophy badge at bottom */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 shadow-md text-amber-700 font-semibold text-sm border border-amber-200">
            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v1a2 2 0 002 2h1v1H5a2 2 0 00-2 2v1a2 2 0 002 2h.5l-.5 3h10l-.5-3H15a2 2 0 002-2v-1a2 2 0 00-2-2h-1V7h1a2 2 0 002-2V4a2 2 0 00-2-2H5z" clipRule="evenodd" />
            </svg>
            Every child can succeed at their own pace
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Fun Factor (circus theme, bunting flags, confetti) ───
export function FunFactor() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)' }}>
      {/* Bunting flags along the top */}
      <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1200 48" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L40 0 L20 40 Z" fill="#f87171" opacity="0.7" />
          <path d="M40 0 L80 0 L60 40 Z" fill="#60a5fa" opacity="0.7" />
          <path d="M80 0 L120 0 L100 40 Z" fill="#fbbf24" opacity="0.7" />
          <path d="M120 0 L160 0 L140 40 Z" fill="#34d399" opacity="0.7" />
          <path d="M160 0 L200 0 L180 40 Z" fill="#a78bfa" opacity="0.7" />
          <path d="M200 0 L240 0 L220 40 Z" fill="#f87171" opacity="0.7" />
          <path d="M240 0 L280 0 L260 40 Z" fill="#60a5fa" opacity="0.7" />
          <path d="M280 0 L320 0 L300 40 Z" fill="#fbbf24" opacity="0.7" />
          <path d="M320 0 L360 0 L340 40 Z" fill="#34d399" opacity="0.7" />
          <path d="M360 0 L400 0 L380 40 Z" fill="#a78bfa" opacity="0.7" />
          <path d="M400 0 L440 0 L420 40 Z" fill="#f87171" opacity="0.7" />
          <path d="M440 0 L480 0 L460 40 Z" fill="#60a5fa" opacity="0.7" />
          <path d="M480 0 L520 0 L500 40 Z" fill="#fbbf24" opacity="0.7" />
          <path d="M520 0 L560 0 L540 40 Z" fill="#34d399" opacity="0.7" />
          <path d="M560 0 L600 0 L580 40 Z" fill="#a78bfa" opacity="0.7" />
          <path d="M600 0 L640 0 L620 40 Z" fill="#f87171" opacity="0.7" />
          <path d="M640 0 L680 0 L660 40 Z" fill="#60a5fa" opacity="0.7" />
          <path d="M680 0 L720 0 L700 40 Z" fill="#fbbf24" opacity="0.7" />
          <path d="M720 0 L760 0 L740 40 Z" fill="#34d399" opacity="0.7" />
          <path d="M760 0 L800 0 L780 40 Z" fill="#a78bfa" opacity="0.7" />
          <path d="M800 0 L840 0 L820 40 Z" fill="#f87171" opacity="0.7" />
          <path d="M840 0 L880 0 L860 40 Z" fill="#60a5fa" opacity="0.7" />
          <path d="M880 0 L920 0 L900 40 Z" fill="#fbbf24" opacity="0.7" />
          <path d="M920 0 L960 0 L940 40 Z" fill="#34d399" opacity="0.7" />
          <path d="M960 0 L1000 0 L980 40 Z" fill="#a78bfa" opacity="0.7" />
          <path d="M1000 0 L1040 0 L1020 40 Z" fill="#f87171" opacity="0.7" />
          <path d="M1040 0 L1080 0 L1060 40 Z" fill="#60a5fa" opacity="0.7" />
          <path d="M1080 0 L1120 0 L1100 40 Z" fill="#fbbf24" opacity="0.7" />
          <path d="M1120 0 L1160 0 L1140 40 Z" fill="#34d399" opacity="0.7" />
          <path d="M1160 0 L1200 0 L1180 40 Z" fill="#a78bfa" opacity="0.7" />
          <line x1="0" y1="0" x2="1200" y2="0" stroke="#7c3aed" strokeWidth="2" />
        </svg>
      </div>

      {/* Confetti dots */}
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

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 mt-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-3">
            Addition Fun!
          </h2>
          <span className="inline-block px-5 py-1.5 rounded-full text-sm font-bold bg-purple-600 text-white shadow-md">
            Math Made Joyful!
          </span>
        </div>

        {/* Spotlight worksheet */}
        <div className="max-w-sm mx-auto">
          {/* Golden border frame */}
          <div className="p-1.5 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 shadow-2xl">
            <div className="rounded-xl overflow-hidden bg-white">
              <img
                src="/samples/english/addition/sample-1.webp"
                alt="Featured addition worksheet — colorful themed pictures for joyful math learning"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <p className="text-center text-lg font-semibold text-purple-800/80 mt-8 mb-6">
          Welcome to the World of Numbers!
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Print Instantly!',
            'Pictures for Math',
            'With Answer Keys',
          ].map((text) => (
            <span
              key={text}
              className="px-5 py-2 rounded-full text-sm font-semibold bg-white/80 text-purple-700 shadow-sm border border-purple-200/60"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Professional Quality (museum gallery, linen + copper) ───
export function ProfessionalQuality() {
  const worksheets = [
    {
      image: '/samples/english/addition/sample-1.webp',
      label: 'Worksheet',
      alt: 'Professional addition worksheet — clean layout with themed images',
    },
    {
      image: '/samples/english/addition/sample-2.webp',
      label: 'Worksheet',
      alt: 'Professional addition worksheet — intermediate difficulty with themed visuals',
    },
    {
      image: '/samples/english/addition/sample-1-answer.webp',
      label: 'Answer Key',
      alt: 'Professional addition answer key — complete solutions included',
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: 'linear-gradient(180deg, #fefcf3 0%, #fdf6e3 50%, #f5edd6 100%)' }}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-800 mb-3">
            The Art of Math
          </h2>
          <p className="text-lg text-stone-600 max-w-xl mx-auto">
            Professional worksheets crafted with care and precision
          </p>
        </div>

        {/* Gallery grid with copper frames */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {worksheets.map((ws) => (
            <div key={ws.label + ws.image} className="flex flex-col items-center">
              {/* Copper L-corners + framed worksheet */}
              <div className="relative w-full">
                {/* Corner accents */}
                <div className="absolute -top-1.5 -left-1.5 w-8 h-8 border-t-[3px] border-l-[3px] rounded-tl-sm" style={{ borderColor: '#b87333' }} />
                <div className="absolute -top-1.5 -right-1.5 w-8 h-8 border-t-[3px] border-r-[3px] rounded-tr-sm" style={{ borderColor: '#b87333' }} />
                <div className="absolute -bottom-1.5 -left-1.5 w-8 h-8 border-b-[3px] border-l-[3px] rounded-bl-sm" style={{ borderColor: '#b87333' }} />
                <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 border-b-[3px] border-r-[3px] rounded-br-sm" style={{ borderColor: '#b87333' }} />

                {/* Worksheet image */}
                <div className="rounded-lg overflow-hidden shadow-lg bg-white border border-stone-200">
                  <img
                    src={ws.image}
                    alt={ws.alt}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Plaque label */}
              <div className="mt-3 px-4 py-1 rounded text-xs font-semibold tracking-wide uppercase text-center" style={{ background: 'linear-gradient(135deg, #cd9b5a, #b87333)', color: '#fefcf3' }}>
                {ws.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature pills — frosted glass style */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            'Print-Ready',
            'No Prep Required',
            'Answers Included',
            'Differentiated',
          ].map((text) => (
            <span
              key={text}
              className="px-5 py-2 rounded-full text-sm font-semibold shadow-sm border"
              style={{
                background: 'rgba(255,255,255,0.75)',
                borderColor: 'rgba(184,115,51,0.3)',
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
