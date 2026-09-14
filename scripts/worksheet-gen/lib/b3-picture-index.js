/**
 * b3-picture-index.js — the cross-theme picture door for THEMELESS b3 types
 * (README cross-type ruling: K-317, G1-306, G1-307, G2-315, G2-317 … any
 * type whose per-theme pool measured below its floor draws from the whole
 * cached library instead of one wave theme; their landings carry
 * coordinate.theme:'').
 *
 *   pictureIndex()            Map vocabKey → [{theme, noun, px}] built from
 *                             image-cache manifest().themes[t].nouns[n].vocabKey,
 *                             SKIPPING every BW directory (/\bbw$/i — the 9
 *                             cached BW dirs are all "<theme> bw"), in a
 *                             deterministic (theme, noun) order
 *   hasPicture(key, loc)      true when a colour picture exists and the key is
 *                             not excluded for the locale (lib/b2-common.js
 *                             B2_EXCLUDE — the operator-locked vocab guard)
 *   pictureFor(rng, key, loc) one {theme, noun, px, src} for the key — the
 *                             first candidate when the key has one picture, an
 *                             rng.pick when several themes hold it; throws
 *                             (never substitutes) when none exists — a spec
 *                             REFUSES an item without a picture, it never
 *                             prints a word over blank space
 */
'use strict';
const resolve = require('../image-cache/resolve.js');
const { excluded, fileUri } = require('./b2-common.js');

// opened-picture rulings from the design session (memory project_nt20c_design):
// 'space/sun' renders as a black square — never a usable picture of the sun.
const BLOCKED = new Set(['space/sun']);

let _index = null;
function pictureIndex() {
  if (_index) return _index;
  const m = resolve.manifest();
  const idx = new Map();
  for (const theme of Object.keys(m.themes).sort()) {
    if (/\bbw$/i.test(theme)) continue;
    const nouns = m.themes[theme].nouns || {};
    for (const noun of Object.keys(nouns).sort()) {
      const n = nouns[noun];
      if (!n || !n.vocabKey) continue;
      if (BLOCKED.has(theme + '/' + noun)) continue;
      if (!idx.has(n.vocabKey)) idx.set(n.vocabKey, []);
      idx.get(n.vocabKey).push({ theme, noun, px: n.px || null });
    }
  }
  _index = idx;
  return idx;
}
function candidates(key, loc) {
  if (loc && excluded(key, loc)) return [];
  return pictureIndex().get(key) || [];
}
function hasPicture(key, loc) { return candidates(key, loc).length > 0; }
function pictureFor(rng, key, loc) {
  const c = candidates(key, loc);
  if (!c.length) throw new Error('b3-picture-index: no colour picture for vocab key "' + key + '"' + (loc ? ' in ' + loc : '') + ' — refuse the item');
  const pick = c.length === 1 ? c[0] : rng.pick(c);
  return Object.assign({ src: fileUri(pick.theme, pick.noun) }, pick);
}
module.exports = { pictureIndex, hasPicture, pictureFor, candidates };
