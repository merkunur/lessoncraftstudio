/**
 * The hero's strings, built ONCE for both routes that render GrandHall
 * (app/[locale]/page.tsx and app/[locale]/preview/homepage-v10/page.tsx).
 *
 * The preview route is the visual-diff safety net and the target of the
 * hero gates; when the two routes assembled this object by hand they could
 * drift apart, and a gate pointed at the preview would then measure a
 * composition the live page no longer had. One builder, two callers.
 *
 * Every key lives at `homepageV6.hero.*`, natively authored in all eleven
 * locales. `pillar1Count` is the ONE string on the whole marketing surface
 * that may carry a numeral (the operator's scoped override of the no-counts
 * law, 2026-09-03): the size of the worksheet library, written with each
 * locale's own thousands separator. `scripts/audit-hero-copy.js` enforces
 * that no other hero key carries a digit and none carries a price word.
 */
export type HeroPillar = {
  /** The large numeral on the lead card only ("40,000+"). */
  count?: string;
  label: string;
  gloss: string;
};

export type HeroStrings = {
  h1: string;
  /** aria-label for the poster (role="img"). */
  hallLabel: string;
  /** Small scope line under the CTAs: grade band + language, in words. */
  scope: string;
  ctaWorksheets: string;
  ctaActivities: string;
  pillars: [HeroPillar, HeroPillar, HeroPillar, HeroPillar];
};

export function heroStrings(t: (key: string) => string): HeroStrings {
  return {
    h1: t('hero.h1'),
    hallLabel: t('hero.fanLabel'),
    scope: t('hero.scope'),
    ctaWorksheets: t('hero.ctaWorksheets'),
    ctaActivities: t('hero.ctaActivities'),
    pillars: [
      { count: t('hero.pillar1Count'), label: t('hero.pillar1Label'), gloss: t('hero.pillar1Gloss') },
      { label: t('hero.pillar2Label'), gloss: t('hero.pillar2Gloss') },
      { label: t('hero.pillar3Label'), gloss: t('hero.pillar3Gloss') },
      { label: t('hero.pillar4Label'), gloss: t('hero.pillar4Gloss') },
    ],
  };
}
