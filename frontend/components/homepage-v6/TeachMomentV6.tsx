/* TeachMomentV6 (v9 "Morning Lessons, Running") — the front of the room,
   with the machines RUNNING. The live rekenrek embed (click-gated, meter
   honesty) plus six tool cards whose art is a WORKING pure-CSS vignette:
   the balance settles, the clock turns, the sieve dims, the lid flips,
   the planks morph, the bag draws. Names + links come from MANIPULATIVES
   (11-locale). A beetle walks the seam into the next band. */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { MANIPULATIVES } from '@/lib/manipulatives';
import { getToolSlugMap, TOOL_MINI_URL, type ToolKey } from '@/lib/seo/tool-content';
import LiveToolEmbedV6 from './LiveToolEmbedV6';
import ToolVignette, { type VignetteVariant } from './ToolVignette';
import SeamInstrument from './SeamInstrument';

interface Props {
  locale: string;
}

/* Matches the tool-page iframe contract (app/[locale]/tools/[tool]/page.tsx). */
const TOOL_WRAPPER_VERSION = '7.57';

const FEATURED_TOOLS: ToolKey[] = [
  'number-balance',
  'learning-clock',
  'number-sieve',
  'lids',
  'comparison-planks',
  'draw-bag',
];

/* Each card's art is the instrument itself, working. */
const CARD_VIGNETTE: Record<string, VignetteVariant> = {
  'number-balance': 'balance',
  'learning-clock': 'clock',
  'number-sieve': 'sieve',
  lids: 'lids',
  'comparison-planks': 'planks',
  'draw-bag': 'draw-bag',
};

const LIVE_TOOL: ToolKey = 'rekenrek';

const TOOL_TILTS = ['hv7-tilt-c', 'hv7-tilt-b', 'hv7-tilt-a', 'hv7-tilt-d', 'hv7-tilt-c', 'hv7-tilt-b'];

export default async function TeachMomentV6({ locale }: Props) {
  const [t, tLive] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.teach' }),
    getTranslations({ locale, namespace: 'homepageV6.live' }),
  ]);

  let toolSlugs: Record<string, string> = {};
  try {
    toolSlugs = await getToolSlugMap(locale);
  } catch {
    /* content files unreachable — cards fall back to the /tools hub */
  }

  const byId = new Map(MANIPULATIVES.map((m) => [m.id, m]));
  const liveTool = byId.get(LIVE_TOOL);
  const liveName = liveTool?.title[locale] ?? liveTool?.title.en ?? 'Rekenrek';

  const toolHref = (key: string) =>
    toolSlugs[key] ? `/${locale}/tools/${toolSlugs[key]}` : `/${locale}/tools`;

  return (
    <section id="teach" className="pt-10 md:pt-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,0.8fr)_1.2fr] gap-8 lg:gap-12 items-start">
          <div className="lg:pt-6">
            <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.25rem] md:text-[2.5rem]">
              {t('heading')}
            </h2>
            <p className="mt-4 font-lcsBody text-lg text-[#3d574f] leading-relaxed">
              {t('body')}
            </p>
            <p className="mt-4 font-lcsBody text-sm text-[#5a6b64]">{t('caption')}</p>
            <div className="mt-6">
              <Link href={`/${locale}/tools`} className="hv6-cta hv6-cta-ghost text-base px-6 py-3">
                {t('seeAll')}
                <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* The live instrument — the band's dominant mass. Click-gated
              (meter honesty); logic untouched. */}
          <LiveToolEmbedV6
            src={`${TOOL_MINI_URL[LIVE_TOOL]}?v=${TOOL_WRAPPER_VERSION}&lang=${locale}&embed=1`}
            name={liveName}
            previewUrl={`/mini-tools/tool-previews/${LIVE_TOOL}.webp`}
            ctaLabel={tLive('cta')}
            note={tLive('note')}
            liveTag={t('liveTag')}
          />
        </div>

        {/* Six real instruments, flat on the paper, each speaking its own
            line. */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {FEATURED_TOOLS.map((key, i) => {
            const m = byId.get(key);
            if (!m) return null;
            return (
              <Link
                key={key}
                href={toolHref(key)}
                className={`hv6-tool-card hv7-lift ${TOOL_TILTS[i]} group`}
              >
                {/* live machine as card art (aria-hidden; the title below
                    is the accessible name). --vphase spreads the phases so
                    the six never move in step. */}
                <div
                  className="hv9-vig-art"
                  style={{ '--vphase': `-${i * 3}s` } as React.CSSProperties}
                  aria-hidden="true"
                >
                  <ToolVignette variant={CARD_VIGNETTE[key]} />
                </div>
                <div className="px-4 py-3.5">
                  <p className="font-lcsDisplay font-bold text-[#14322D] text-[15px] leading-snug">
                    {m.title[locale] ?? m.title.en}
                  </p>
                  <p className="mt-1 font-lcsBody text-[13px] text-[#3d574f] leading-snug">
                    {m.tagline[locale] ?? m.tagline.en}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* the beetle walks the seam into the wall of worksheets */}
        <SeamInstrument variant="beetle" />
      </div>
    </section>
  );
}
