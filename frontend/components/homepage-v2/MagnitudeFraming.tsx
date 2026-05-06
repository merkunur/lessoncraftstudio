import { getTranslations } from 'next-intl/server';

/**
 * MagnitudeFraming — Alt A above-the-fold magnitude line.
 *
 * Structured-equation layout (2026-05-06): four operand columns separated
 * by × × = symbols, each operand stacking a display-grade numeral above a
 * small-caps locale-natural label. Replaces the prior single-string ICU-
 * template treatment that rendered as one running headline; the equation
 * structure communicates magnitude at-a-glance and matches modern axis-
 * product display patterns (Stripe/Linear).
 *
 * Numerals are static design-target framing per operator update:
 *   100+ × 100+ × 11 = 55,000+
 * The 55,000 is locale-natural-formatted via Intl.NumberFormat (comma in
 * en; period in de/es/nl/it/pt/da; non-breaking space in fr/sv/no/fi).
 *
 * Aligns with §1 magnitude-via-structural-axes-not-population doctrine:
 * design-target framing > current-state inventory count. No DB / axes
 * call; static values.
 *
 * Mobile: operands stack vertically (flex-col) with operators between
 * each pair as compact separators. Desktop (md+): horizontal flex row.
 */
export default async function MagnitudeFraming({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'homepage.magnitudeFraming' });
  const worksheetCount = new Intl.NumberFormat(locale).format(55000) + '+';
  const srHeadline =
    `100+ ${t('exerciseTypesLabel')} × 100+ ${t('themesLabel')} × 11 ` +
    `${t('languagesLabel')} = ${worksheetCount} ${t('worksheetsLabel')}`;

  return (
    <section
      id="magnitude-framing"
      className="container mx-auto px-4 max-w-6xl py-10 md:py-14"
      aria-labelledby="magnitude-framing-heading"
    >
      <h2 id="magnitude-framing-heading" className="sr-only">
        {srHeadline}
      </h2>
      <div
        aria-hidden="true"
        className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 lg:gap-8 max-w-5xl mx-auto"
      >
        <Operand numeral="100+" label={t('exerciseTypesLabel')} />
        <Operator symbol="×" />
        <Operand numeral="100+" label={t('themesLabel')} />
        <Operator symbol="×" />
        <Operand numeral="11" label={t('languagesLabel')} />
        <Operator symbol="=" />
        <Operand numeral={worksheetCount} label={t('worksheetsLabel')} />
      </div>
    </section>
  );
}

function Operand({ numeral, label }: { numeral: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-none tabular-nums">
        {numeral}
      </span>
      <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 text-center max-w-[14ch] leading-tight">
        {label}
      </span>
    </div>
  );
}

function Operator({ symbol }: { symbol: string }) {
  return (
    <span
      className="font-display text-xl md:text-3xl lg:text-4xl text-ink-400 font-light leading-none select-none"
      aria-hidden="true"
    >
      {symbol}
    </span>
  );
}
