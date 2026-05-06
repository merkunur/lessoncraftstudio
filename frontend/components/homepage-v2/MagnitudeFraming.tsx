import { getTranslations } from 'next-intl/server';

/**
 * MagnitudeFraming — Alt A above-the-fold magnitude line.
 *
 * Static design-target framing per operator update (2026-05-06):
 * "100+ exercise types × 100+ themes × 11 languages = 55,000+ worksheets".
 * Replaces the prior dynamic axis-product derivation from getCatalogAxes()
 * with a single localized static line, dropping the population footnote
 * entirely. Aligns with §1 magnitude-via-structural-axes-not-population
 * doctrine: design-target framing > current-state inventory count.
 *
 * The "100+" / "100+" / "55,000+" numerics encode operator design intent
 * (each app has 3+ modes → exercise-type count scales past 29; theme-axis
 * has growth runway past 100; 55K is the operator-stated long-term ceiling
 * per CLAUDE.md §1). Updates to these magnitudes are localized JSON edits;
 * no axes-data dependency at the component level.
 */
export default async function MagnitudeFraming({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.magnitudeFraming' });

  return (
    <section
      id="magnitude-framing"
      className="container mx-auto px-4 max-w-6xl py-8 md:py-10"
      aria-labelledby="magnitude-framing-heading"
    >
      <p
        id="magnitude-framing-heading"
        className="font-display font-semibold text-2xl md:text-3xl lg:text-4xl text-ink-900 leading-snug tracking-tight text-center max-w-4xl mx-auto"
      >
        {t('headline')}
      </p>
    </section>
  );
}
