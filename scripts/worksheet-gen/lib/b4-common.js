/**
 * b4-common.js — shared helpers for the nt10-D (b4) printable families.
 * Additive beside lib/b2-common.js (never edited); every b4 spec reads its
 * OWN generated bank `data/b4/<key>.js` at render, and the helpers here are
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
 *   bank(name, loc)             data/b4/<name>.js <NAME>[loc] — throws a REFUSAL
 *                               (never a silent en fallback) when the locale
 *                               block is absent
 *   ordinalFor(loc, k, gender)  data/b4/ordinals.js notation[k] / notationF[k]
 *                               (K-320 contract; throws outside 1..10 or on a
 *                               missing feminine)
 *   nfdBase(s)                  NFD with combining marks stripped, lowercased —
 *                               the "foil is free of the base letter" rule
 */
'use strict';
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', '..', 'v2-data', 'verify-syllable-boundaries', 'output');
const _approved = new Map();
const CHUNK_LAYER = new Set(['de', 'nl', 'sv', 'no']);

function approvedWords(loc) {
  if (!_approved.has(loc)) {
    const f = path.join(OUT, 'approved-words-' + loc + '.json');
    if (!fs.existsSync(f)) throw new Error('b4-common: no approved-words file for ' + loc + ' (' + f + ')');
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    if (!Array.isArray(j.entries) || !j.entries.length) throw new Error('b4-common: approved-words-' + loc + '.json has no entries');
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
/**
 * Locale blocks authored by the native panels live OUTSIDE the bank module, as
 * GENERATED data/b4/locales/<bank>.<loc>.json (tools/apply-b4-locale.js), and are
 * merged here. The module keeps the hand-authored en block plus whatever the gates
 * import from it (validateBank, SETS, FACES …) — rewriting it wholesale, as the b2
 * apply did, would delete those. Two sources for one locale is refused. The dir is
 * overridable (B4_LOCALES_DIR) so validate-b4-draft.js can probe a draft in a temp
 * dir without touching the tree.
 */
const LOCALES_DIR = () => process.env.B4_LOCALES_DIR || path.join(__dirname, '..', 'data', 'b4', 'locales');
function bankModule(name) {
  if (!_banks.has(name)) {
    const f = path.join(__dirname, '..', 'data', 'b4', name + '.js');
    if (!fs.existsSync(f)) throw new Error('b4-common: data/b4/' + name + '.js is absent (author the EN block / run apply-b4-locale.js)');
    const mod = require(f);
    const exportName = Object.keys(mod)[0];
    const all = mod[exportName];
    const dir = LOCALES_DIR();
    if (fs.existsSync(dir)) {
      for (const file of fs.readdirSync(dir)) {
        const m = new RegExp('^' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\.([a-z]{2})\\.json$').exec(file);
        if (!m) continue;
        const loc = m[1];
        if (loc === 'en') throw new Error('b4-common: data/b4/locales/' + file + ' — the en block is authored in the module, never generated');
        if (all[loc]) throw new Error('b4-common: data/b4/' + name + '.js already has a ' + loc + ' block AND data/b4/locales/' + file + ' exists — two sources, refuse');
        all[loc] = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
      }
    }
    _banks.set(name, all);
  }
  return _banks.get(name);
}
/** The locale block of a b4 bank; absence is a REFUSAL, never a fallback to en. */
function bank(name, loc) {
  const all = bankModule(name);
  const l = String(loc).slice(0, 2);
  if (!all[l]) throw new Error('b4-common: data/b4/' + name + '.js has no ' + l + ' block — the ' + l + ' panel has not authored it (refuse, never fall back to en)');
  return all[l];
}

function nfdBase(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

module.exports = { approvedWords, approvedByKey, texAgreed, texPool, daStrict, hasChunkLayer, bank, bankModule, nfdBase };
