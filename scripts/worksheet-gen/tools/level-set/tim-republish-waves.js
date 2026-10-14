#!/usr/bin/env node
/**
 * tim-republish-waves.js — Telling Time review fixes (walk #64, 2026-10-14): pinned waves that rebuild EXACTLY the live
 * decks carrying a corrected mistake, under their own wave ids (same deck ids → same slugs), into
 * waves/republish-tim/<waveId>.json, plus the {deckId: liveSlug} map for publish-wave --updates-manifest.
 *   G1-149 (all 11)       every clock half past ("Half Past What?" over o'clock clocks)
 *   G3-356 (all 11)       a true minus sign (a hyphen was printed); fr "3 h 45", fi "3.45" answers
 *   G3-355 (10, not en)   the 12-hour form with the part of the day (English AM/PM printed); es "a. m. / p. m."; Encierra
 *   G1-148 es pt no · G2-249 / G2-250 / G3-354 es · G3-344 fr nl · G1-150 fi · G1-212 / G1-233..237 es   wording fixes
 * Input: out/tmp/tt/tim-live.tsv (from /root/tim-live.js). Output: the wave files + out/tmp/tt/republish-map.json.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const JUNE = { w1: 'en', w2: 'de', w3: 'es', w4: 'nl', w5: 'fr', w6: 'it', w7: 'pt', w8: 'sv', w9: 'da', w10: 'no', w11: 'fi' };
const PICK = {
  'G1-149': LOCS, 'G3-356': LOCS, 'G3-355': LOCS.filter((l) => l !== 'en'),
  'G1-148': ['es', 'pt', 'no'], 'G2-249': ['es'], 'G2-250': ['es'], 'G3-354': ['es'], 'G3-344': ['fr', 'nl'], 'G1-150': ['fi'],
  'G1-212': ['es'], 'G1-233': ['es'], 'G1-234': ['es'], 'G1-235': ['es'], 'G1-236': ['es'], 'G1-237': ['es'],
};
const rows = fs.readFileSync(path.join(ROOT, 'out/tmp/tt/tim-live.tsv'), 'utf8').trim().split('\n').map((l) => l.split('\t'));
const waves = {}, map = {};
for (const [deckId, slug, , , loc, idx] of rows) {
  const m = /^wsg-(w[a-z0-9]+?)-g(\d)(\d{3})-nothm-d2-([a-z]{2})(?:-v(\d+))?$/.exec(deckId);
  if (!m) throw new Error('unparsed deck id ' + deckId);
  const id = 'G' + m[2] + '-' + m[3];
  if (!(PICK[id] || []).includes(loc)) continue;
  if (idx !== 'idx') throw new Error(deckId + ' is not an indexable live page');
  const short = m[1], v = +(m[5] || 1);
  const waveId = JUNE[short] ? 'wave-' + String(short.slice(1)).padStart(3, '0')
    : short === 'wtime' + loc ? 'wave-time-' + loc : short === 'wnt20' + loc ? 'wave-nt20-' + loc : short === 'wvarcore' + loc ? 'wave-var-core-' + loc : null;
  if (!waveId) throw new Error('unknown wave for ' + deckId);
  const w = waves[waveId] = waves[waveId] || { id: waveId, _note: 'Telling Time review fixes 2026-10-14 (walk #64): the live pages of this wave that carry a corrected mistake, pinned', seedEpoch: 1, locales: [loc], themes: [], themesPerType: 1, difficulties: [2], types: [], levels: {} };
  if (!w.types.includes(id)) { w.types.push(id); w.levels[id] = { 2: [] }; }
  w.levels[id][2].push({ copy: v, unit: null, seedVariant: v });
  if (map[deckId]) throw new Error('twice: ' + deckId);
  map[deckId] = slug;
}
const dir = path.join(ROOT, 'waves', 'republish-tim');
fs.mkdirSync(dir, { recursive: true });
for (const w of Object.values(waves)) { for (const t of w.types) w.levels[t][2].sort((a, b) => a.copy - b.copy); fs.writeFileSync(path.join(dir, w.id + '.json'), JSON.stringify(w, null, 1) + '\n'); }
fs.writeFileSync(path.join(ROOT, 'out/tmp/tt/republish-map.json'), JSON.stringify(map, null, 1));
const byLoc = {}; for (const [d] of Object.entries(map)) { const l = d.slice(-2).replace(/\d/g, ''); byLoc[d.match(/-([a-z]{2})(?:-v\d+)?$/)[1]] = (byLoc[d.match(/-([a-z]{2})(?:-v\d+)?$/)[1]] || 0) + 1; }
console.log(Object.keys(waves).length, 'waves,', Object.keys(map).length, 'live decks:', JSON.stringify(byLoc));
