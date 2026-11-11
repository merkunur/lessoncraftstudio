/**
 * Names the curriculum registry proved wrong (Daily Teaching System, Part 2, 2026-11-11). For each registry a
 * teacher-reviewer of that country read the official text (frontend/content/curricula/<loc>/framework.json) beside
 * the names in strand-names.ts and changed a name only where a heading of the official text proves another one; the
 * reason of each change is in docs/daily-teaching-system/curricula/REVIEW-NOTES.<loc>.md.
 *
 * The OLD name stays in STRAND_NAMES on purpose: the meta descriptions of indexed pages (/standards/<code>) are
 * built from it, and an indexed page's title and description must not change (PLAN.md §5 rule 1). Everything a
 * visitor SEES (chips, headings, facet names) and the JSON-LD use `strandLabel()` of strand-names.ts, which reads this
 * table first. When a page's metadata is ever rewritten for another reason, move the name into STRAND_NAMES and
 * delete it here.
 *
 * WHY A FILE OF ITS OWN: several scripts read strand-names.ts as text and take every block of the shape
 * "  'Key': {" for a row of STRAND_NAMES (scripts/verify-level-set-pathways.js, scripts/curricula/brief.js, the
 * worksheet-gen apply-*-locale tools). A second table of that shape in the same file made the Level Set pathway gate
 * read "Measurement & Data" as named in three languages only and stop a deploy (2026-11-11).
 */
export const STRAND_LABEL_CORRECTIONS: Record<string, Partial<Record<string, string>>> = {
  'Science': {
    es: 'Saberes y Pensamiento Científico', // the campo formativo that holds all natural-science content (Plan de Estudio 2022); the old name was the 2011 plan's subject
    nl: 'Natuur en techniek', // the kerndoelen on plants, animals, the body, materials and weather stand under this heading; the leergebied's name alone does not tell science from social studies
  },
  'Social Studies': {
    es: 'Ética, Naturaleza y Sociedades', // the campo's official spelling
    fr: 'Histoire-géographie', // the cycle 2 programme of 2026 that replaces « Questionner l'espace et le temps »; the old name left out the history half
  },
  'Reading: Foundational Skills': {
    es: 'Convenciones de la escritura', // contenido « Uso de convenciones de la escritura »; « Comprensión lectora » means understanding texts, not decoding
  },
  'Measurement & Data': {
    nl: 'Meten en data', // the kerndoelen Rekenen en wiskunde of 2026 say « data », not « gegevens »
    da: 'Måling og statistik', // Fælles Mål says « statistik »: the competence areas are « Geometri og måling » and « Statistik og sandsynlighed »
    it: 'Relazioni, dati e previsioni', // the nucleo of the Indicazioni nazionali under which both measuring and data stand
  },
  'Number & Operations—Fractions': {
    nl: 'Breuken', // the kerndoelen of 2026 keep « breuken » apart from « verhoudingen » (procenten, schaal)
  },
};
