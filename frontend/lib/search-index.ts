/**
 * Platform search index — covers activities + manipulatives ONLY.
 *
 * Scope discipline (operator-locked 2026-05-21): decks are NOT in this
 * index. ~9,000 published decks would dwarf the ~88 activity+tool entries
 * and a search box that can't find them would look broken. Search is
 * explicitly and visibly limited to "activities + tools" — the placeholder
 * copy and "no results" message reflect this.
 *
 * Cross-locale (operator-locked 2026-05-21): the index now contains
 * entries for ALL 11 locales as a single flat array. Each entry carries
 * its own `locale` field. Filtering by current locale + ranking is the
 * client's responsibility — the API delivers the full ~88-entry payload
 * to every caller, CDN-cached for 1h. This lets a teacher on /en/ find
 * German content via search without first switching locale.
 *
 * Match algorithm: tokenized substring AND match (all query tokens must
 * appear somewhere in label + hint). Ranked by label-prefix > label-
 * substring > hint-substring, plus a current-locale bonus the client
 * applies before sorting.
 */
import { listAllActivities, ActivityRow } from "@/lib/activities";
import { MANIPULATIVES } from "@/lib/manipulatives";

export interface SearchEntry {
  id: string;
  type: "activity" | "manipulative";
  /** Locale this entry lives in — used for the locale badge + ranking bonus. */
  locale: string;
  label: string;
  url: string;
  /** Short context — CC code + grade for activities, tagline for manipulatives. */
  hint: string;
}

/**
 * Grade-letter → localized short form. Mirrors CLAUDE.md §17.4.3 but uses
 * the parenthetical-free short form so the hint stays compact. K = the
 * locale's kindergarten/last-pre-K1 form.
 *
 * Tier 3+4 (sv/da/no/fi + fr/it/pt) authored from operator-best-effort;
 * Nordic NSR-flagged per §17.5.1.
 */
const GRADE_LABELS: Record<string, Record<string, string>> = {
  K: {
    en: "Kindergarten",
    de: "Kindergarten",
    es: "Jardín infantil",
    fr: "Maternelle",
    it: "Infanzia",
    pt: "Pré-escola",
    nl: "Kleuterklas",
    sv: "Förskoleklass",
    da: "Børnehaveklasse",
    no: "Barnehage",
    fi: "Esiopetus",
  },
  // 1/2/3 reserved for future Common Core grade-1+ activities; falls back
  // to "Grade {n}" English form via the resolver below when the table
  // doesn't yet contain a locale entry.
};

/**
 * CC strand → localized form. Two strands appear in current activities;
 * add more as activities expand into other strands. Falls back to English
 * source value if the locale or key is missing.
 *
 * Tier 1+2 (en/de/es/nl) operator-strong; Tier 3 Nordic + fi NSR-flagged
 * per §17.5.1; Tier 4 Romance operator-best-effort.
 */
const STRAND_LABELS: Record<string, Record<string, string>> = {
  "Counting & Cardinality": {
    en: "Counting & Cardinality",
    de: "Zählen und Kardinalität",
    es: "Conteo y cardinalidad",
    fr: "Comptage et cardinalité",
    it: "Conteggio e cardinalità",
    pt: "Contagem e cardinalidade",
    nl: "Tellen en kardinaliteit",
    sv: "Räkning och kardinalitet",
    da: "Tælling og kardinalitet",
    no: "Telling og kardinalitet",
    fi: "Laskeminen ja kardinaaliluvut",
  },
  "Number & Operations in Base Ten": {
    en: "Number & Operations in Base Ten",
    de: "Zahlen und Operationen im Zehnersystem",
    es: "Números y operaciones en base diez",
    fr: "Nombres et opérations en base dix",
    it: "Numeri e operazioni in base dieci",
    pt: "Números e operações na base dez",
    nl: "Getallen en bewerkingen in het tientallig stelsel",
    sv: "Tal och operationer i tiosystemet",
    da: "Tal og operationer i titalssystemet",
    no: "Tall og operasjoner i tisystemet",
    fi: "Luvut ja kymmenjärjestelmän operaatiot",
  },
};

function localizeGrade(grade: string, locale: string): string {
  const table = GRADE_LABELS[grade];
  if (table) return table[locale] ?? table.en ?? grade;
  // Unknown grade letter — fall back to "Grade {grade}" English.
  return `Grade ${grade}`;
}

function localizeStrand(strand: string, locale: string): string {
  const table = STRAND_LABELS[strand];
  if (table) return table[locale] ?? table.en ?? strand;
  // Unknown strand — fall back to the manifest's English source value.
  return strand;
}

let _cache: SearchEntry[] | null = null;

/**
 * Build the global search index. Cached for server lifetime.
 */
export async function buildSearchIndex(): Promise<SearchEntry[]> {
  if (_cache) return _cache;

  const out: SearchEntry[] = [];
  const locales = ["en", "de", "es", "fr", "it", "pt", "nl", "sv", "da", "no", "fi"];

  // Activities
  let activities: ActivityRow[] = [];
  try {
    activities = await listAllActivities();
  } catch (err) {
    console.warn("[search-index] activities load failed:", (err as Error).message);
  }
  for (const a of activities) {
    for (const loc of locales) {
      const slug = a.slug[loc];
      const title = a.page_title[loc];
      if (!slug || !title) continue;
      const gradeLabel = localizeGrade(a.alignment.grade, loc);
      const strandLabel = localizeStrand(a.alignment.strand, loc);
      out.push({
        id: `activity.${a.id}.${loc}`,
        type: "activity",
        locale: loc,
        label: title,
        url: `/${loc}/activities/${slug}/`,
        hint: `${a.alignment.code} · ${gradeLabel} · ${strandLabel}`,
      });
    }
  }

  // Manipulatives
  for (const m of MANIPULATIVES) {
    for (const loc of locales) {
      const title = m.title[loc] ?? m.title.en;
      const tagline = m.tagline[loc] ?? m.tagline.en;
      out.push({
        id: `manipulative.${m.id}.${loc}`,
        type: "manipulative",
        locale: loc,
        label: title,
        url: `/${loc}/tools/`,
        hint: tagline,
      });
    }
  }

  _cache = out;
  return out;
}

/**
 * Tokenize + lowercase + diacritic-fold so "addicion" matches "Adición"
 * etc. Naive NFD decomposition + strip combining marks; good enough for
 * the 11 Latin-script locales we support.
 */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Match query against entries. Returns top N matches, ranked by
 * exact-prefix > label-substring > hint-substring > alphabetical.
 * Current-locale entries get a +20 bonus so they bubble above
 * other-locale matches with equivalent text overlap.
 */
export function searchEntries(
  entries: SearchEntry[],
  query: string,
  currentLocale: string,
  limit = 10
): SearchEntry[] {
  const q = normalize(query);
  if (!q) return [];

  const tokens = q.split(" ").filter(Boolean);
  if (tokens.length === 0) return [];

  const scored: Array<{ entry: SearchEntry; score: number }> = [];

  for (const entry of entries) {
    const label = normalize(entry.label);
    const hint = normalize(entry.hint);
    const haystack = label + " " + hint;

    const allTokensMatch = tokens.every((t) => haystack.includes(t));
    if (!allTokensMatch) continue;

    let score = 0;
    if (label.startsWith(q)) score += 100;
    else if (label.includes(q)) score += 50;
    if (hint.includes(q)) score += 10;
    for (const t of tokens) {
      if (label.includes(t)) score += 5;
      if (hint.includes(t)) score += 1;
    }
    if (entry.locale === currentLocale) score += 20;
    scored.push({ entry, score });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.entry.label.localeCompare(b.entry.label);
  });

  return scored.slice(0, limit).map((s) => s.entry);
}
