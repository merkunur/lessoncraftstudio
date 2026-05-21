/**
 * Platform search index — covers activities + manipulatives ONLY.
 *
 * Scope discipline (operator-locked 2026-05-21): decks are NOT in this
 * index. ~9,000 published decks would dwarf the ~88 activity+tool entries
 * and a search box that can't find them would look broken. Search is
 * explicitly and visibly limited to "activities + tools" — the placeholder
 * copy and "no results" message reflect this.
 *
 * Per-locale payload built at request time (server function called by
 * PlatformSearch on mount via a Next.js Route Handler, OR — preferred —
 * loaded at build time as a static module since the source data is static
 * JSON + in-code TS).
 *
 * Match algorithm: tokenized substring AND match (all query tokens must
 * appear somewhere in label + hint). Ranked by exact label prefix match,
 * then label substring, then hint substring.
 */
import { listAllActivities, ActivityRow } from "@/lib/activities";
import { MANIPULATIVES } from "@/lib/manipulatives";

export interface SearchEntry {
  id: string;
  type: "activity" | "manipulative";
  label: string;
  url: string;
  /** Short context — CC code + grade for activities, tagline for manipulatives. */
  hint: string;
}

let _cache: Record<string, SearchEntry[]> | null = null;

/**
 * Build the per-locale index. Cached for server lifetime.
 */
export async function buildSearchIndex(): Promise<Record<string, SearchEntry[]>> {
  if (_cache) return _cache;

  const out: Record<string, SearchEntry[]> = {};
  const locales = ["en", "de", "es", "fr", "it", "pt", "nl", "sv", "da", "no", "fi"];
  for (const loc of locales) out[loc] = [];

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
      out[loc].push({
        id: `activity.${a.id}.${loc}`,
        type: "activity",
        label: title,
        url: `/${loc}/activities/${slug}/`,
        hint: `${a.alignment.code} · Grade ${a.alignment.grade} · ${a.alignment.strand}`,
      });
    }
  }

  // Manipulatives
  for (const m of MANIPULATIVES) {
    for (const loc of locales) {
      const title = m.title[loc] ?? m.title.en;
      const tagline = m.tagline[loc] ?? m.tagline.en;
      out[loc].push({
        id: `manipulative.${m.id}.${loc}`,
        type: "manipulative",
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
 * Match query against entries for a locale. Returns top N matches, ranked
 * by exact-prefix > label-substring > hint-substring > alphabetical.
 */
export function searchEntries(
  entries: SearchEntry[],
  query: string,
  limit = 8
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
    // bonus for matching all tokens at the start of the label
    for (const t of tokens) {
      if (label.includes(t)) score += 5;
      if (hint.includes(t)) score += 1;
    }
    scored.push({ entry, score });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.entry.label.localeCompare(b.entry.label);
  });

  return scored.slice(0, limit).map((s) => s.entry);
}
