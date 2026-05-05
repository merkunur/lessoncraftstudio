import { getTranslations } from 'next-intl/server';
import { getCatalogAxes } from '@/lib/catalog-axes';

/**
 * MagnitudeFraming — Alt A above-the-fold copy-line per
 * `docs/homepage-acquisition-arc-2026-05-05.md` Alt A architectural lock.
 *
 * Renders the axis-product magnitude framing copy. Per the recon's framing
 * shift: catalog magnitude is communicated by axis-product (29 exercise
 * types × 100 themes × 11 languages = 14,487 publish-eligible variants),
 * NOT by current-population count (884 decks at HEAD fba33939 — stale at
 * 500/day cadence).
 *
 * Reads counts from getCatalogAxes() catalog-axes module so the framing
 * stays in sync with the SoT axis-list. ISR-cached at the lib layer.
 *
 * Arc 1 substrate: scaffold-only. Operator may lock final copy in Arc 2;
 * this component renders the operator-spec'd axis-product framing as the
 * default until then.
 */
export default async function MagnitudeFraming({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.magnitudeFraming' });
  const axes = await getCatalogAxes();

  return (
    <section
      id="magnitude-framing"
      className="container mx-auto px-4 max-w-6xl py-6 md:py-8"
      aria-labelledby="magnitude-framing-heading"
    >
      <p
        id="magnitude-framing-heading"
        className="text-lg md:text-xl text-ink-700 font-medium leading-relaxed text-center"
      >
        {t('headline', {
          exerciseTypes: axes.exerciseTypes.count,
          themes: axes.themes.totalRegistered,
          locales: axes.locales.count,
          variants: axes.combinatorialSpace.total.toLocaleString(),
        })}
      </p>
      <p className="mt-2 text-sm text-ink-500 text-center" aria-label={t('footnoteLabel')}>
        {t('footnote', {
          publishedDecks: axes.currentPopulation.publishedDeckCount.toLocaleString(),
          combinatorialTotal: axes.combinatorialSpace.total.toLocaleString(),
        })}
      </p>
    </section>
  );
}
