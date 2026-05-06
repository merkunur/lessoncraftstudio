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

  // Arc 2 polish: typographic hierarchy on the magnitude-framing line.
  // Per Arc 2 commission scope: "typographic hierarchy on the numerals
  // (29 / 100 / 11) so they read as magnitudes at-a-glance; population
  // footnote rendered small + muted." Rather than re-author the existing
  // 11-locale ICU templates with rich-text markup (would need updates to
  // all 11 messages files for tag wrapping), we lift the whole headline
  // into display-grade typography — the numerals are intrinsically
  // typographically distinctive (digits cluster, prose flows around) so
  // they jump out at display sizes without per-numeral wrappers.
  // Footnote stays subordinate via small + muted color.

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
        {t('headline', {
          exerciseTypes: axes.exerciseTypes.count,
          themes: axes.themes.totalRegistered,
          locales: axes.locales.count,
          variants: axes.combinatorialSpace.total.toLocaleString(),
        })}
      </p>
      <p
        className="mt-3 text-xs md:text-sm text-ink-500 text-center leading-relaxed max-w-2xl mx-auto"
        aria-label={t('footnoteLabel')}
      >
        {t('footnote', {
          publishedDecks: axes.currentPopulation.publishedDeckCount.toLocaleString(),
          combinatorialTotal: axes.combinatorialSpace.total.toLocaleString(),
        })}
      </p>
    </section>
  );
}
