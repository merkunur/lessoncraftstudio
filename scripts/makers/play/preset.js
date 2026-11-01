/**
 * Deck → maker preset (ARCHITECTURE §13 step 3, task 2 of the ten): a published deck's manifest names everything the
 * maker needs to open the SAME page — the template, the level, the theme, the word and the copy number (the page is
 * built from the same seed rule, lib/rng.js). Pure: the website API (frontend/lib/makers/link-store.ts presetForDeck)
 * and the local stand-in (scripts/makers/local-store.js) both call it.
 *
 *   presetFromManifest(manifest, makerOf) → { maker, lang, template, level, theme, unit, variant, deckId, title } | null
 *
 * The manifest's theme is the taxonomy key ('farm_animals'); the maker offers the cache name ('farm animals'). A deck
 * made with a fresh-seed retry (cli.js seedVariant) is not in the manifest: the maker's gate ladder replays the same
 * retries in the same order, so such a deck lands on the same attempt when the first attempts fail the same gates —
 * the common case, not a guarantee (recorded in the handoff).
 */
'use strict';

function presetFromManifest(m, makerOf) {
  if (!m || typeof m !== 'object' || !m.settings) return null;
  const template = m.settings.worksheet_type;
  const level = Number(m.settings.difficulty);
  const lang = m.language;
  if (typeof template !== 'string' || !/^[A-Z]\d?-\d{3}$/.test(template) || !Number.isInteger(level) || !/^[a-z]{2}$/.test(String(lang))) return null;
  const maker = makerOf(template);
  if (!maker) return null;
  return {
    maker, lang, template, level,
    theme: m.theme ? String(m.theme).replace(/_/g, ' ') : null,
    unit: m.unit || null,
    variant: Number.isInteger(m.variant) && m.variant > 0 ? m.variant : 1,
    deckId: m.deck_id || null,
    title: (m.title && m.title[lang]) || null,
  };
}

module.exports = { presetFromManifest };
