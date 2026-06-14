/**
 * LIVE_TOOL_SLUGS — the native-language URL slugs of every live per-tool
 * landing page (`/[locale]/tools/<slug>/`), derived automatically from the
 * tool-content files. SINGLE SOURCE OF TRUTH for the middleware 410-teardown
 * carve-out.
 *
 * Why this exists: the `/tools` prefix is a seller-era teardown that 410s
 * `/tools/<anything>` (CLAUDE.md §17.1). The 3 live manipulatives' native
 * slugs must be carved out of that 410 so they render. This file derives the
 * carve-out set from `@/messages/tool-content/<locale>.json` at build time, so
 * adding a tool or a locale slug NEVER requires hand-editing middleware again
 * (the historical sync bug — a hand-maintained Set that drifted from the
 * content files and 410'd live pages).
 *
 * Static imports (not dynamic) so the set is build-time constant and usable in
 * the Edge middleware runtime, which cannot do async/dynamic import.
 */
import en from '@/messages/tool-content/en.json';
import de from '@/messages/tool-content/de.json';
import es from '@/messages/tool-content/es.json';
import fr from '@/messages/tool-content/fr.json';
import it from '@/messages/tool-content/it.json';
import pt from '@/messages/tool-content/pt.json';
import nl from '@/messages/tool-content/nl.json';
import sv from '@/messages/tool-content/sv.json';
import da from '@/messages/tool-content/da.json';
import no from '@/messages/tool-content/no.json';
import fi from '@/messages/tool-content/fi.json';

// SEO RESCUE Part 1 — the worksheet-MAKER landings also live under /tools/<slug>
// and must be carved out of the 410 teardown the same way. Their slugs come
// from @/messages/maker-content/<locale>.json (pilot locales only — add a
// locale's import here in the same commit that adds its maker-content file).
import makerEn from '@/messages/maker-content/en.json';
import makerDe from '@/messages/maker-content/de.json';
import makerEs from '@/messages/maker-content/es.json';
import makerFr from '@/messages/maker-content/fr.json';
import makerIt from '@/messages/maker-content/it.json';
import makerPt from '@/messages/maker-content/pt.json';
import makerNl from '@/messages/maker-content/nl.json';
import makerSv from '@/messages/maker-content/sv.json';
import makerDa from '@/messages/maker-content/da.json';
import makerNo from '@/messages/maker-content/no.json';
import makerFi from '@/messages/maker-content/fi.json';

// Tool keys present in every tool-content file. Kept local (not imported from
// tool-content.ts) so this module has zero runtime deps beyond the JSON — safe
// for the Edge middleware bundle.
const TOOL_KEYS = ['ten-frame', 'number-line', 'ruler'] as const;
// Maker keys present in every maker-content file (all 33, §maker-content.ts).
const MAKER_KEYS = [
  'addition', 'subtraction', 'code-addition', 'more-less', 'math-puzzle', 'math-worksheet',
  'alphabet-train', 'prepositions', 'word-guess', 'word-scramble', 'wordsearch', 'cryptogram', 'writing',
  'big-small', 'pattern-train', 'pattern-worksheet', 'draw-and-color', 'drawing-lines', 'coloring', 'chart-count',
  'matching', 'grid-match', 'shadow-match', 'bingo', 'picture-sort',
  'missing-pieces', 'odd-one-out', 'sudoku', 'picture-path',
  'find-and-count', 'find-objects', 'crossword', 'treasure-hunt',
] as const;

const FILES = [en, de, es, fr, it, pt, nl, sv, da, no, fi] as unknown as Array<
  Record<string, { slug?: string }>
>;

const MAKER_FILES = [makerEn, makerDe, makerEs, makerFr, makerIt, makerPt, makerNl, makerSv, makerDa, makerNo, makerFi] as unknown as Array<
  Record<string, { slug?: string }>
>;

function collectSlugs(): Set<string> {
  const set = new Set<string>();
  for (const file of FILES) {
    for (const key of TOOL_KEYS) {
      const entry = file[key];
      if (entry && typeof entry.slug === 'string' && entry.slug) set.add(entry.slug);
    }
  }
  for (const file of MAKER_FILES) {
    for (const key of MAKER_KEYS) {
      const entry = file[key];
      if (entry && typeof entry.slug === 'string' && entry.slug) set.add(entry.slug);
    }
  }
  return set;
}

/** Every native-language tool slug that should render (and NOT 410). */
export const LIVE_TOOL_SLUGS: Set<string> = collectSlugs();
