/* TeachMomentV6 — tick 1 on the Lesson Line: the front of the room.

   The 47 instruments, presented as apparatus, not a product category:
   one LIVE tool (click-to-activate — see LiveToolEmbedV6's meter note),
   six featured instrument cards with their own verbatim taglines from
   manipulatives.ts (native in all 11 locales). */

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { MANIPULATIVES } from '@/lib/manipulatives';
import { getToolSlugMap, TOOL_KEYS, TOOL_MINI_URL, type ToolKey } from '@/lib/seo/tool-content';
import LiveToolEmbedV6 from './LiveToolEmbedV6';

interface Props {
  locale: string;
}

/* Matches the tool-page iframe contract (app/[locale]/tools/[tool]/page.tsx). */
const TOOL_WRAPPER_VERSION = '7.57';

/* Curated for tagline strength + preview quality + breadth of subject:
   number sense, time, chance, symmetry, vocabulary, reasoning. */
const FEATURED_TOOLS: ToolKey[] = [
  'number-balance',
  'learning-clock',
  'draw-bag',
  'folding-sheet',
  'picture-word-wall',
  'wodb',
];

const LIVE_TOOL: ToolKey = 'rekenrek';

export default async function TeachMomentV6({ locale }: Props) {
  const [t, tTicks, tLive] = await Promise.all([
    getTranslations({ locale, namespace: 'homepageV6.teach' }),
    getTranslations({ locale, namespace: 'homepageV6.ticks' }),
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
  const toolCount = TOOL_KEYS.length;

  const toolHref = (key: string) =>
    toolSlugs[key] ? `/${locale}/tools/${toolSlugs[key]}` : `/${locale}/tools`;

  return (
    <section id="teach" className="pt-24 md:pt-32 pb-6">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* The moment mark: a bead threaded ON the wire + a wooden sign. */}
        <div className="hv6-mark mb-12 md:mb-16">
          <span className="hv6-bead" aria-hidden="true">1</span>
          <span className="hv6-hang hv6-sign-hang">
            <span className="hv6-sign">{tTicks('teach')}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-14 items-start">
          {/* Body copy rides hung paper, never the raw board. */}
          <div className="hv6-paper hv6-hang2 is-vee" style={{ '--drop': '64px' } as React.CSSProperties}>
            <h2 className="font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.375rem] md:text-[2.75rem]">
              {t('heading')}
            </h2>
            <p className="mt-5 font-lcsBody text-lg text-[#3d574f] leading-relaxed">
              {t('body', { count: toolCount })}
            </p>
            <p className="mt-5 font-lcsBody text-sm text-[#3d574f]">{t('caption', { count: toolCount })}</p>
            <div className="mt-7">
              <Link href={`/${locale}/tools`} className="hv6-cta hv6-cta-ghost text-base px-6 py-3">
                {t('seeAll', { count: toolCount })}
                <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 10h10M11 5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* One instrument, genuinely live — a hung screen (two threads,
              dead level). Click-gated (meter honesty). */}
          <div className="hv6-hang2" style={{ '--drop': '48px' } as React.CSSProperties}>
            <LiveToolEmbedV6
              src={`${TOOL_MINI_URL[LIVE_TOOL]}?v=${TOOL_WRAPPER_VERSION}&lang=${locale}&embed=1`}
              name={liveName}
              previewUrl={`/mini-tools/tool-previews/${LIVE_TOOL}.webp`}
              ctaLabel={tLive('cta')}
              note={tLive('note')}
              liveTag={t('liveTag')}
            />
          </div>
        </div>

        {/* The gallery: six framed instruments at varied drops off a branch
            dowel — each speaking its own line. */}
        <div className="mt-16 md:mt-24">
          <div className="hv6-branch" aria-hidden="true" />
          <div className="hv6-gallery grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {FEATURED_TOOLS.map((key) => {
              const m = byId.get(key);
              if (!m) return null;
              return (
                <Link key={key} href={toolHref(key)} className="hv6-tool-card hv6-hang group">
                  <div className="hv6-tool-img">
                    <img
                      src={`/mini-tools/tool-previews/${key}.webp`}
                      alt={m.title[locale] ?? m.title.en}
                      width={480}
                      height={360}
                      loading="lazy"
                    />
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
        </div>

      </div>
    </section>
  );
}
