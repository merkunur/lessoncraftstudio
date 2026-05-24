/* Pillar 5 — Tools. Tier 2, the smallest pillar. Operator: keep it MODEST,
   no big "toolkit" framing — it's a small set, present it honestly.
   Three tools, each with a tiny icon-mark, short description, link.
   Compact 3-column row on desktop; stacked on mobile. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Sparkle } from './DoodleAccents';

interface PillarToolsProps {
  locale: string;
}

/* Tool icons — clean flat illustrations in the teal palette. Each renders
   at ~80px square inside its tile, sized to match the visual weight of the
   pillar text and the Direction A polish. Coral accent for filled counters
   on ten-frame; teal everywhere else. Name/desc text comes from i18n
   (see component body); only the icons + hrefs are module-level. */
const TOOL_ICONS = [
  {
    href: '/mini-tools/ten-frame.html',
    icon: (
      <svg viewBox="0 0 120 64" className="w-20 h-12">
        <rect x="2" y="2" width="116" height="60" rx="8" fill="#FBE3D8" />
        {/* Two rows × 5 cells; first row 3 filled with coral counters */}
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 8 + i * 22;
          return (
            <g key={`r1-${i}`}>
              <rect x={x} y={9} width={18} height={20} rx="3" fill="#FBF3E4" stroke="#146B5E" strokeWidth="1.6" />
              {i < 3 && <circle cx={x + 9} cy={19} r={5.5} fill="#F2784B" />}
            </g>
          );
        })}
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 8 + i * 22;
          return (
            <rect key={`r2-${i}`} x={x} y={33} width={18} height={20} rx="3" fill="#FBF3E4" stroke="#146B5E" strokeWidth="1.6" />
          );
        })}
      </svg>
    ),
  },
  {
    href: '/mini-tools/number-line.html',
    icon: (
      <svg viewBox="0 0 120 64" className="w-20 h-12">
        <rect x="2" y="2" width="116" height="60" rx="8" fill="#E3EEEB" />
        {/* Horizontal axis */}
        <line x1="12" y1="36" x2="108" y2="36" stroke="#146B5E" strokeWidth="2.4" strokeLinecap="round" />
        {/* Ticks + numerals */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
          const x = 12 + i * 9.6;
          const major = i % 5 === 0;
          return (
            <g key={i}>
              <line x1={x} y1={major ? 26 : 30} x2={x} y2={major ? 46 : 42} stroke="#146B5E" strokeWidth={major ? 2 : 1.4} strokeLinecap="round" />
              {major && (
                <text x={x} y={58} textAnchor="middle" fontSize="9" fontWeight="700" fill="#146B5E" fontFamily="ui-monospace, monospace">{i}</text>
              )}
            </g>
          );
        })}
        {/* Coral jump arc — visual hint that this is for "jumps" */}
        <path d="M 21.6 28 Q 50 8 88.4 28" stroke="#F2784B" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="0" />
        <circle cx="88.4" cy="28" r="2.4" fill="#F2784B" />
      </svg>
    ),
  },
  {
    href: '/mini-tools/ruler.html',
    icon: (
      <svg viewBox="0 0 120 64" className="w-20 h-12">
        <rect x="2" y="2" width="116" height="60" rx="8" fill="#FBE3D8" opacity="0.5" />
        {/* Ruler body — wood-tone parchment */}
        <rect x="10" y="22" width="100" height="20" rx="3" fill="#FBF3E4" stroke="#146B5E" strokeWidth="1.8" />
        {/* Tick marks */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
          const x = 12 + i * 9.6;
          const major = i % 5 === 0;
          return (
            <line
              key={i}
              x1={x}
              y1={22}
              x2={x}
              y2={major ? 36 : 30}
              stroke="#146B5E"
              strokeWidth={major ? 2 : 1.4}
              strokeLinecap="round"
            />
          );
        })}
        {/* Numerals at major ticks */}
        {[0, 5, 10].map((n, idx) => {
          const x = 12 + idx * 5 * 9.6;
          return (
            <text key={n} x={x} y={50} textAnchor="middle" fontSize="9" fontWeight="700" fill="#146B5E" fontFamily="ui-monospace, monospace">{n}</text>
          );
        })}
        {/* Coral measurement bracket overhead */}
        <line x1="12" y1="16" x2="60" y2="16" stroke="#F2784B" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="13" x2="12" y2="19" stroke="#F2784B" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="13" x2="60" y2="19" stroke="#F2784B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default async function PillarTools({ locale }: PillarToolsProps) {
  const t = await getTranslations({ locale, namespace: 'homepageV3.pillar05' });

  const tools = [
    { name: t('tool1Name'), desc: t('tool1Desc'), href: TOOL_ICONS[0].href, icon: TOOL_ICONS[0].icon },
    { name: t('tool2Name'), desc: t('tool2Desc'), href: TOOL_ICONS[1].href, icon: TOOL_ICONS[1].icon },
    { name: t('tool3Name'), desc: t('tool3Desc'), href: TOOL_ICONS[2].href, icon: TOOL_ICONS[2].icon },
  ];

  return (
    <section id="tools" className="hv3-section-teal relative overflow-hidden pt-20 md:pt-28 pb-24 md:pb-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-2xl mb-10 md:mb-12">
          <div className="flex items-center gap-4 mb-3">
            <span className="hv3-pillar-num-cream">05</span>
            <span className="hv3-eyebrow text-lcs-cream/85">{t('eyebrow')}</span>
          </div>
          <h2 className="font-lcsDisplay font-bold text-lcs-cream leading-[1.05] tracking-tight text-[1.875rem] sm:text-[2.5rem] md:text-[3rem]">
            {t('h2Line1')}<br />
            <span className="text-lcs-coral">{t('h2Line2')}</span>
          </h2>
          <p className="mt-5 font-lcsBody text-base md:text-lg text-lcs-cream/80 leading-relaxed">
            {t('body')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {tools.map((tool, i) => {
            const tint = i === 0 ? '' : i === 1 ? 'hv3-card-tinted-warm' : 'hv3-card-tinted-sage';
            return (
            <a
              key={tool.name}
              href={tool.href}
              className={`hv3-card hv3-card-on-color ${tint} p-6 md:p-7 group hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className="hv3-icon-stage mb-5" aria-hidden="true">
                {tool.icon}
              </div>
              <h3 className="font-lcsDisplay font-bold text-xl text-lcs-teal mb-2 relative flex items-center gap-2">
                {tool.name}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkle className="text-lcs-coral" size={14} rotate={18} />
                </span>
              </h3>
              <p className="font-lcsBody text-sm text-lcs-teal/75 leading-relaxed">{tool.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-lcsBody text-xs font-bold text-lcs-coral-deep uppercase tracking-wider group-hover:gap-2.5 transition-all">
                {t('perTileCta')}
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </span>
            </a>
            );
          })}
        </div>

        <div className="mt-10 md:mt-12 flex justify-start">
          <Link
            href={`/${locale}/tools`}
            className="hv3-cta-cream-outline inline-flex items-center justify-center font-lcsDisplay font-semibold text-base md:text-lg px-6 py-3"
          >
            {t('cta')}
            <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 10h10M11 5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
