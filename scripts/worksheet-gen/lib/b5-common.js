/**
 * b5-common.js — shared helpers for the nt10-E (b5) printable families.
 * Additive beside lib/b2-common.js (never edited); every b5 spec reads its
 * OWN generated bank `data/b5/<key>.js` at render, and the helpers here are
 * the only other data doors:
 *
 *   approvedWords(loc)          entries[] of the phonics pipeline's gated output
 *                               scripts/v2-data/verify-syllable-boundaries/output/
 *                               approved-words-<loc>.json ({key, word, split[],
 *                               count, chunks, sources_agreed[], policy_managed?})
 *   approvedByKey(loc)          Map vocabKey → entry
 *   texPool(loc)                the entries whose boundary TeX agreed on
 *                               ('TeX' in sources_agreed) — README ruling: any
 *                               face that PRINTS or GRADES a syllable boundary
 *                               draws only from these (EN approved boundaries
 *                               are often rule-only: ac-orn, cam-el)
 *   daStrict(entry)             the da K-1 pool = policy_managed ABSENT (measured:
 *                               policy_managed:false never occurs)
 *   hasChunkLayer(loc)          de/nl/sv/no carry a verified grapheme `chunks`
 *                               layer; elsewhere chunks is a flat copy of split
 *   bank(name, loc)             data/b5/<name>.js <NAME>[loc] — throws a REFUSAL
 *                               (never a silent en fallback) when the locale
 *                               block is absent
 *   ordinalFor(loc, k, gender)  data/b5/ordinals.js notation[k] / notationF[k]
 *                               (K-320 contract; throws outside 1..10 or on a
 *                               missing feminine)
 *   nfdBase(s)                  NFD with combining marks stripped, lowercased —
 *                               the "foil is free of the base letter" rule
 */
'use strict';
const path = require('path');
const platform = require('./platform/index.js');   // disk reads go through the platform (the makers run this in a browser)

const OUT = path.resolve(__dirname, '..', '..', 'v2-data', 'verify-syllable-boundaries', 'output');
const _approved = new Map();
const CHUNK_LAYER = new Set(['de', 'nl', 'sv', 'no']);

function approvedWords(loc) {
  if (!_approved.has(loc)) {
    const f = path.join(OUT, 'approved-words-' + loc + '.json');
    if (!platform.exists(f)) throw new Error('b5-common: no approved-words file for ' + loc + ' (' + f + ')');
    const j = platform.readJson(f);
    if (!Array.isArray(j.entries) || !j.entries.length) throw new Error('b5-common: approved-words-' + loc + '.json has no entries');
    _approved.set(loc, j.entries);
  }
  return _approved.get(loc);
}
function approvedByKey(loc) {
  const m = new Map();
  for (const e of approvedWords(loc)) if (!m.has(e.key)) m.set(e.key, e);
  return m;
}
function texAgreed(e) { return Array.isArray(e.sources_agreed) && e.sources_agreed.includes('TeX'); }
function texPool(loc) { return approvedWords(loc).filter(texAgreed); }
function daStrict(e) { return e.policy_managed === undefined; }
function hasChunkLayer(loc) { return CHUNK_LAYER.has(String(loc).slice(0, 2)); }

const _banks = new Map();
const BANK_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
/**
 * Locale blocks authored by the native panels live OUTSIDE the bank module, as
 * GENERATED data/b5/locales/<bank>.<loc>.json (tools/apply-b5-locale.js), and are
 * merged here. The module keeps the hand-authored en block plus whatever the gates
 * import from it (validateBank, SETS, FACES …) — rewriting it wholesale, as the b2
 * apply did, would delete those. Two sources for one locale is refused. The dir is
 * overridable (B5_LOCALES_DIR) so validate-b5-draft.js can probe a draft in a temp
 * dir without touching the tree.
 */
const LOCALES_DIR = () => (typeof process !== 'undefined' && process.env && process.env.B5_LOCALES_DIR) || path.join(__dirname, '..', 'data', 'b5', 'locales');
const MERGED = Symbol.for('lcs.bank.mergedLocales.b5');
function bankModule(name) {
  if (!_banks.has(name)) {
    const f = path.join(__dirname, '..', 'data', 'b5', name + '.js');
    if (!platform.exists(f)) throw new Error('b5-common: data/b5/' + name + '.js is absent (author the EN block / run apply-b5-locale.js)');
    const mod = platform.requireData(f);
    const exportName = Object.keys(mod)[0];
    const all = mod[exportName];
    const dir = LOCALES_DIR();
    const merged = all[MERGED] || (all[MERGED] = new Set());
    // one look per locale (a browser cannot list a folder; the locale files are only ever written for these 11 — the
    // same reading as b3-common, 2026-11-02: the Shapes & Geometry maker bundles the b5 2D-shapes types)
    for (const loc of BANK_LOCALES) {
      const file = name + '.' + loc + '.json';
      if (!platform.exists(path.join(dir, file))) continue;
      if (loc === 'en') throw new Error('b5-common: data/b5/locales/' + file + ' — the en block is authored in the module, never generated');
      // a block this loader (or another copy of it: the slots gate loads HEAD beside the working tree) already merged is
      // not a second source
      if (merged.has(loc)) continue;
      const block = platform.readJson(path.join(dir, file));
      // the same block, merged by an older copy of this loader into the shared module, is that one source again
      if (all[loc] && JSON.stringify(all[loc]) === JSON.stringify(block)) { merged.add(loc); continue; }
      if (all[loc]) throw new Error('b5-common: data/b5/' + name + '.js already has a ' + loc + ' block AND data/b5/locales/' + file + ' exists — two sources, refuse');
      all[loc] = block;
      merged.add(loc);
    }
    _banks.set(name, all);
  }
  return _banks.get(name);
}
/** The locale block of a b5 bank; absence is a REFUSAL, never a fallback to en. */
function bank(name, loc) {
  const all = bankModule(name);
  const l = String(loc).slice(0, 2);
  if (!all[l]) throw new Error('b5-common: data/b5/' + name + '.js has no ' + l + ' block — the ' + l + ' panel has not authored it (refuse, never fall back to en)');
  return all[l];
}

function nfdBase(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

module.exports = { approvedWords, approvedByKey, texAgreed, texPool, daStrict, hasChunkLayer, bank, bankModule, nfdBase };
