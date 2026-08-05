/**
 * Anchor text for the two crawlable backlinks inside an embed snippet.
 *
 * Every embed a teacher copies carries a visible caption OUTSIDE the iframe:
 *
 *     <prefix> <a href="…">LessonCraftStudio</a> — <a href="…"><keyword></a>
 *
 * An iframe passes no link equity, so those two `<a>` are the entire SEO
 * surface of the embed flywheel (CLAUDE.md §1). `prefix` carries the brand
 * anchor, `keyword` the keyword anchor — anchor diversity, so the two links
 * do not read as one over-optimised pattern.
 *
 * WHY THIS IS ITS OWN MODULE. These eleven pairs used to live inside a
 * route-local `UI_STRINGS` map in app/[locale]/worksheets/[slug]/page.tsx,
 * unexported. The homepage now builds the same snippet, and copying the
 * strings across would have created a second hand-maintained copy of the same
 * table — the exact shape of the §21.8-A defect, where `buildHreflangAlternates`
 * existed twice and fixing one changed nothing on the live site. One table,
 * two consumers.
 *
 * All eleven are natively authored. Nothing here is machine-translated, and
 * this file must not gain a locale without a native pass (§A.13.48).
 */
export interface EmbedAnchorText {
  /** Leads the caption, e.g. "Worksheet from". */
  prefix: string;
  /** Keyword anchor pointing at the homepage, e.g. "free printable worksheets". */
  keyword: string;
}

export const EMBED_ANCHOR: Record<string, EmbedAnchorText> = {
  en: { prefix: 'Worksheet from', keyword: 'free printable worksheets' },
  de: { prefix: 'Arbeitsblatt von', keyword: 'kostenlose druckbare Arbeitsblätter' },
  es: { prefix: 'Hoja de trabajo de', keyword: 'hojas de trabajo imprimibles gratis' },
  sv: { prefix: 'Arbetsblad från', keyword: 'gratis utskrivbara arbetsblad' },
  nl: { prefix: 'Werkblad van', keyword: 'gratis printbare werkbladen' },
  da: { prefix: 'Arbejdsark fra', keyword: 'gratis printbare arbejdsark' },
  it: { prefix: 'Scheda di', keyword: 'schede stampabili gratuite' },
  no: { prefix: 'Arbeidsark fra', keyword: 'gratis utskrivbare arbeidsark' },
  fr: { prefix: 'Fiche de', keyword: 'fiches gratuites à imprimer' },
  pt: { prefix: 'Atividade de', keyword: 'atividades grátis para imprimir' },
  fi: { prefix: 'Tehtävä:', keyword: 'ilmaiset tulostettavat tehtävät' },
};

export function embedAnchor(locale: string): EmbedAnchorText {
  return EMBED_ANCHOR[locale] || EMBED_ANCHOR.en;
}
