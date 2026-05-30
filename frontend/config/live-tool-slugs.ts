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

// Tool keys present in every tool-content file. Kept local (not imported from
// tool-content.ts) so this module has zero runtime deps beyond the JSON — safe
// for the Edge middleware bundle.
const TOOL_KEYS = ['ten-frame', 'number-line', 'ruler'] as const;

const FILES = [en, de, es, fr, it, pt, nl, sv, da, no, fi] as unknown as Array<
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
  return set;
}

/** Every native-language tool slug that should render (and NOT 410). */
export const LIVE_TOOL_SLUGS: Set<string> = collectSlugs();
