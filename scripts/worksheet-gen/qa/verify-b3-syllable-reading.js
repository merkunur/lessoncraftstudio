#!/usr/bin/env node
/**
 * verify-b3-syllable-reading.js — the G1-306 `syllable-reading` gate
 * (design file §5, the base-face rules of gate-syllable-reading-data.js +
 * the browser half, in ONE script) + the FIVE FACES (Phase 2, 2026-09-14:
 * G1-330 Circle · G1-331 Join · G1-332 Carpet · G1-333 Complex · G1-334
 * Syllabified — emitted by tools/gen-b3var-specs.js from
 * tools/b3var-rows/syllable-reading.js; the gate loads them from types/g1 and
 * FAILS when one is missing). Renders through the REAL pipeline
 * (render/render-instance.js: fonts load from file://; never a bare page).
 *
 *   node qa/verify-b3-syllable-reading.js [--quick] [--locale=en] [--verbose]
 *
 * DATA (node, over data/b3/syllable-reading.js joined to approved-words):
 *   1  every fanned word is approved, word === the approved word, 'TeX' in
 *      sources_agreed (texPool: the printed boundary is TeX-agreed)
 *   2  the unit is a cell of ITS row exactly once, printed verbatim; the cells
 *      of a row are exactly its pictured words ∪ its readOnly cells; cells
 *      distinct across every carpet the ladder can print
 *   3  R: word === onset + rime, count === 1, the rime matches `simpleRime`
 *      (no r-controlled / long-vowel family on a simple page)
 *   4  B: chunks all length 1 and join === word; a strictPool block only
 *      carries words whose approved entry has policy_managed ABSENT
 *   8  COMPLEX rows: every cell 'blend|rime' with the blend ∈ `blends` and the
 *      rime matching `complexRime`; no shared row rime (a shared rime IS a
 *      simple row); words approved / TeX / count 1 / pictured; the union of
 *      complex words EQUALS the approved derivation (diff both ways)
 *   6/9 MULTI pool (Join + Syllabified): every entry approved, TeX, split ===
 *      the approved split, count 2-3, ≤ 10 letters, pictured, not banned;
 *      the set EQUALS the approved derivation; with refuse.finalMuteE no entry
 *      ends in a mute e (fr)
 *  10  node re-derivation: the bank's word list per rime EQUALS the set the
 *      approved file yields (count 1, TeX, pictured, consonant onset) — diff,
 *      never trust; the rendered data-lcs-unit / -split equals the re-derived value
 *  12  readOnly cells are NOT pictured; no BW-directory picture; excluded()
 *  13  pool >= poolMin per (unit, difficulty) or the build THROWS (refusal) —
 *      the feasibility matrix is printed for the base AND every carpet face;
 *      the exemplar must build at d1-d3 (base) / d2 (faces)
 * RENDER (puppeteer; --quick = the exemplar renders + the poisons only):
 *   verify() empty · qa/lints.js clean · G1 floors MEASURED (picture, cell,
 *   lane, pill, tile, ring, number box >= 44 px; glyphH + every task font >=
 *   26) · rule 11: widest cell advance <= cellW - 8 and lane writable >= 60
 *   (getComputedTextLength in the real font) · row width <= 651 · no BW
 *   picture · the answer word appears in no text node outside the carpet /
 *   the pills (Circle) · every card's content INSIDE its card box (cards clip
 *   with overflow:hidden, so the page lints cannot see it) · the Syllabified
 *   bank on ONE line · every face at the WORST LEGAL CHROME (3-line title +
 *   2-line instruction, body 733)
 * SWEEPS (full run): 20 seeds at d2 on the base exemplar + 10 per face (the
 *   union of words grows past one page; the row order never moves; the Circle
 *   answer column never freezes; every feasible (unit, d) renders clean).
 * POISONS (each must FAIL; the correct bank is the control; a silent poison
 *   exits 1): the base's 16 + 36 face poisons (C1-C7 Circle, J1-J8 Join, K1-K6
 *   Carpet, X1-X6 Complex, S1-S9 Syllabified) — --verbose prints WHICH fault
 *   killed each.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { approvedByKey, texAgreed } = require('../lib/b3-common.js');
const { hasPicture, candidates } = require('../lib/b3-picture-index.js');
const { excluded } = require('../lib/b2-common.js');
const { manifest } = require('../image-cache/resolve.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const tokens = require('../primitives/_tokens.js');
const spec = require('../types/g1/G1-306-syllable-reading.js');
const bankMod = require('../data/b3/syllable-reading.js');
const BANK = bankMod[Object.keys(bankMod)[0]];

const QUICK = process.argv.includes('--quick');
const VERBOSE = process.argv.includes('--verbose');
const LOC = (process.argv.find((a) => a.startsWith('--locale=')) || '--locale=en').slice(9);
const OUT = path.join(__dirname, '..', 'out', 'dev');
const FLOOR = { element: 44, answer: 26 };   // primitives/_tokens.js density.G1
const CONSONANT_ONSET = /^[bcdfghjklmnpqrstvwxyz]+$/;
const MULTI_MAX_LETTERS = 10;                 // the bank's documented derivation rule (design §3 Face 6)

// the five faces, by id (design §3; ids fixed by _records/b3var-id-allocation.json)
const FACE_IDS = { circle: 'G1-330', join: 'G1-331', carpet: 'G1-332', complex: 'G1-333', syllabified: 'G1-334' };
function loadFace(id) {
  const dir = path.join(__dirname, '..', 'types', 'g1');
  const f = fs.readdirSync(dir).find((x) => x.startsWith(id + '-'));
  if (!f) throw new Error(`face spec ${id} is not on disk — run node tools/gen-b3var-specs.js`);
  return require(path.join(dir, f));
}
const FACES = {};
for (const [face, id] of Object.entries(FACE_IDS)) FACES[face] = loadFace(id);
// worst legal chrome: a 3-line title + a 2-line instruction (README budgets; the base record measured body 733)
const WORST = {
  title: 'Word Families with Blends: Read the Whole Carpet, Then Find Every Picture and Write',
  instruction: 'Read every word on the carpet out loud, one row at a time. Then say each picture word, find that word on the carpet, and write the letters it starts with on the line below.',
};

let assertions = 0;
function check(cond, msg, fails) { assertions++; if (!cond) fails.push(msg); }

function parseCell(cell) {
  const s = String(cell); const i = s.indexOf('|');
  return i < 0 ? { onset: null, rime: null, text: s } : { onset: s.slice(0, i), rime: s.slice(i + 1), text: s.slice(0, i) + s.slice(i + 1) };
}
function rowsOf(cfg) { return cfg.shape === 'rime' ? cfg.rimes : cfg.units; }
const lettersOnly = (s) => /^\p{L}+$/u.test(String(s));

/* ------------------------------------------------------------------ DATA (base) */
function dataChecks(loc, cfg) {
  const fails = [];
  const approved = approvedByKey(loc);
  const rows = rowsOf(cfg) || [];
  check(rows.length > 0, `${loc}: no rows`, fails);
  check(rows.some((r) => r.id === cfg.exemplar), `${loc}: exemplar "${cfg.exemplar}" is not a row id`, fails);
  const banned = new Set(cfg.ban || []);
  let wordsChecked = 0;
  const cellSeen = new Map();
  for (const row of rows) {
    const cells = row.cells.map(parseCell);
    const cellTexts = cells.map((c) => c.text.toLocaleLowerCase(loc));
    check(new Set(cellTexts).size === cellTexts.length, `${loc} ${row.id}: duplicate cell`, fails);
    for (const t of cellTexts) cellSeen.set(t, (cellSeen.get(t) || 0) + 1);
    for (const c of cells) check(/^\p{L}+$/u.test(c.text), `${loc} ${row.id}: cell "${c.text}" is not letters`, fails);
    const wordTexts = new Set();
    for (const w of row.words || []) {
      wordsChecked++;
      const e = approved.get(w.key);
      check(!!e, `${loc} ${row.id}: "${w.word}" (${w.key}) is not an approved word`, fails);                                 // rule 1
      if (e) {
        check(e.word.toLocaleLowerCase(loc) === String(w.word).toLocaleLowerCase(loc), `${loc} ${row.id}: bank word "${w.word}" != approved "${e.word}"`, fails);
        check(texAgreed(e), `${loc} ${row.id}: "${w.word}" boundary is not TeX-agreed (${(e.sources_agreed || []).join('/')})`, fails);
        if (cfg.shape === 'rime' || cfg.shape === 'soundout') check(e.count === 1, `${loc} ${row.id}: "${w.word}" count ${e.count} != 1`, fails);   // rule 3
        if (cfg.shape === 'syllable') check(Array.isArray(w.split) && JSON.stringify(w.split) === JSON.stringify(e.split), `${loc} ${row.id}: "${w.word}" split differs from approved`, fails);
        if (cfg.strictPool === 'policy_managed_absent') check(e.policy_managed === undefined, `${loc} ${row.id}: "${w.word}" is policy-managed (da strict pool)`, fails);   // rule 4
      }
      check(/^\p{L}+$/u.test(String(w.word)), `${loc} ${row.id}: word "${w.word}" is not letters`, fails);
      check(!banned.has(w.key), `${loc} ${row.id}: banned key "${w.key}" is fanned`, fails);
      check(hasPicture(w.key, loc), `${loc} ${row.id}: "${w.word}" has no colour picture`, fails);                              // rule 12
      check(!excluded(w.key, loc), `${loc} ${row.id}: "${w.key}" is B2-excluded in ${loc}`, fails);
      if (w.pictureTheme) check(candidates(w.key, loc).some((c) => c.theme === w.pictureTheme), `${loc} ${row.id}: "${w.word}" pictureTheme "${w.pictureTheme}" holds no picture of it`, fails);
      // rule 2: the unit is a cell of its row exactly once
      let hits;
      if (cfg.shape === 'rime') {
        check(w.unit + row.rime === w.word, `${loc} ${row.id}: "${w.unit}" + "${row.rime}" != "${w.word}"`, fails);           // rule 3
        check(CONSONANT_ONSET.test(w.unit), `${loc} ${row.id}: onset "${w.unit}" is not consonants`, fails);
        hits = cells.filter((c) => c.onset === w.unit && c.rime === row.rime);
      } else if (cfg.shape === 'syllable') {
        check(Array.isArray(w.split) && w.split[0].toLocaleLowerCase(loc) === String(w.unit).toLocaleLowerCase(loc), `${loc} ${row.id}: unit != split[0] for "${w.word}"`, fails);
        hits = cells.filter((c) => c.text.toLocaleLowerCase(loc) === String(w.unit).toLocaleLowerCase(loc));
      } else {
        check(String(w.unit).toLocaleLowerCase(loc) === String(w.word).toLocaleLowerCase(loc), `${loc} ${row.id}: sound-out unit != word "${w.word}"`, fails);
        const ch = Array.isArray(w.chunks) ? w.chunks.flat() : null;
        check(!!ch && ch.length > 0, `${loc} ${row.id}: "${w.word}" has no chunks`, fails);                                    // rule 4
        if (ch) {
          check(ch.every((g) => [...g].length === 1), `${loc} ${row.id}: "${w.word}" has a multigraph chunk (${ch.join('·')})`, fails);
          check(ch.join('').toLocaleLowerCase(loc) === String(w.word).toLocaleLowerCase(loc), `${loc} ${row.id}: chunks of "${w.word}" do not join to the word`, fails);
        }
        hits = cells.filter((c) => c.text.toLocaleLowerCase(loc) === String(w.word).toLocaleLowerCase(loc));
      }
      check(hits.length === 1, `${loc} ${row.id}: "${w.word}" matches ${hits.length} cells of its row (want 1)`, fails);
      wordTexts.add(cfg.shape === 'syllable' ? String(w.unit).toLocaleLowerCase(loc) : String(w.word).toLocaleLowerCase(loc));
    }
    if (cfg.shape === 'rime') {
      check(cfg.simpleRime instanceof RegExp, `${loc}: no simpleRime regex`, fails);
      if (cfg.simpleRime instanceof RegExp) check(cfg.simpleRime.test(row.rime), `${loc} ${row.id}: rime "-${row.rime}" is not a simple short-vowel rime`, fails);   // rule 3
      for (const ro of row.readOnly || []) {
        check(ro.endsWith(row.rime) && CONSONANT_ONSET.test(ro.slice(0, -row.rime.length)), `${loc} ${row.id}: readOnly "${ro}" is not consonant onset + rime`, fails);
        check(!hasPicture(ro, loc) && !(approved.get(ro) && hasPicture(approved.get(ro).key, loc)), `${loc} ${row.id}: readOnly "${ro}" IS pictured`, fails);   // rule 12
        check(cells.some((c) => c.text === ro), `${loc} ${row.id}: readOnly "${ro}" is not a cell`, fails);
      }
      // the cells are exactly words ∪ readOnly (a dropped cell or an orphan cell fails)
      const expect = new Set([...wordTexts, ...(row.readOnly || []).map((r) => r.toLocaleLowerCase(loc))]);
      check(cellTexts.length === expect.size && cellTexts.every((t) => expect.has(t)), `${loc} ${row.id}: cells [${cellTexts.join(' ')}] != words ∪ readOnly [${[...expect].join(' ')}]`, fails);   // rule 2
      // rule 10: re-derive the row's word set from the approved file and diff
      const derived = new Set();
      for (const e of approved.values()) {
        if (e.count !== 1 || !texAgreed(e) || !/^\p{L}+$/u.test(e.word)) continue;
        if (!e.word.endsWith(row.rime) || e.word === row.rime) continue;
        if (!CONSONANT_ONSET.test(e.word.slice(0, -row.rime.length))) continue;
        if (!hasPicture(e.key, loc) || banned.has(e.key)) continue;
        derived.add(e.word);
      }
      const bankWords = new Set((row.words || []).map((w) => w.word));
      const missing = [...derived].filter((w) => !bankWords.has(w));
      const extra = [...bankWords].filter((w) => !derived.has(w));
      check(!missing.length && !extra.length, `${loc} ${row.id}: bank words differ from the approved derivation (missing [${missing.join(' ')}] extra [${extra.join(' ')}])`, fails);
    }
  }
  for (const [t, n] of cellSeen) check(n === 1, `${loc}: cell "${t}" appears in ${n} rows`, fails);
  check(wordsChecked > 0, `${loc}: 0 words checked`, fails);
  return fails;
}

/* ------------------------------------------------------------------ DATA (Complex rows, rule 8) */
function complexDataChecks(loc, cfg) {
  const fails = [];
  const approved = approvedByKey(loc);
  const rows = cfg.complexUnits;
  if (!Array.isArray(rows) || !rows.length) { check(false, `${loc}: no complexUnits (the Complex face is refused for ${loc})`, fails); return fails; }
  check(rows.some((r) => r.id === cfg.complexExemplar), `${loc}: complexExemplar "${cfg.complexExemplar}" is not a complex row id`, fails);
  const banned = new Set(cfg.ban || []);
  const blends = new Set(cfg.blends || []);
  const rimeRe = cfg.complexRime instanceof RegExp ? cfg.complexRime : cfg.simpleRime;
  check(rimeRe instanceof RegExp, `${loc}: no complexRime / simpleRime regex`, fails);
  const cellSeen = new Map();
  const allWords = new Set();
  let n = 0;
  for (const row of rows) {
    check(row.rime == null, `${loc} complex ${row.id}: carries a shared rime "-${row.rime}" — a shared rime is a SIMPLE row`, fails);
    const cells = row.cells.map(parseCell);
    const cellTexts = cells.map((c) => c.text.toLocaleLowerCase(loc));
    check(new Set(cellTexts).size === cellTexts.length, `${loc} complex ${row.id}: duplicate cell`, fails);
    for (const t of cellTexts) cellSeen.set(t, (cellSeen.get(t) || 0) + 1);
    if (cfg.shape === 'rime') {
      const onsets = cells.map((c) => c.onset);
      check(new Set(onsets).size === onsets.length, `${loc} complex ${row.id}: a blend repeats within the row (${onsets.join(' ')})`, fails);
      for (const c of cells) {
        check(c.onset != null, `${loc} complex ${row.id}: cell "${c.text}" has no onset|rime seam`, fails);
        if (c.onset == null) continue;
        check(blends.has(c.onset), `${loc} complex ${row.id}: onset "${c.onset}" of "${c.text}" is not a blend`, fails);
        if (rimeRe instanceof RegExp) check(rimeRe.test(c.rime), `${loc} complex ${row.id}: rime "-${c.rime}" of "${c.text}" is not short-vowel closed (complexRime)`, fails);
      }
    }
    const wordTexts = new Set();
    for (const w of row.words || []) {
      n++;
      const e = approved.get(w.key);
      check(!!e, `${loc} complex ${row.id}: "${w.word}" (${w.key}) is not an approved word`, fails);
      if (e) {
        check(e.word.toLocaleLowerCase(loc) === String(w.word).toLocaleLowerCase(loc), `${loc} complex ${row.id}: bank word "${w.word}" != approved "${e.word}"`, fails);
        check(texAgreed(e), `${loc} complex ${row.id}: "${w.word}" is not TeX-agreed`, fails);
        if (cfg.shape !== 'syllable') check(e.count === 1, `${loc} complex ${row.id}: "${w.word}" count ${e.count} != 1`, fails);
      }
      check(lettersOnly(w.word), `${loc} complex ${row.id}: word "${w.word}" is not letters`, fails);
      check(!banned.has(w.key), `${loc} complex ${row.id}: banned key "${w.key}" is fanned`, fails);
      check(hasPicture(w.key, loc), `${loc} complex ${row.id}: "${w.word}" has no colour picture`, fails);
      if (w.pictureTheme) check(candidates(w.key, loc).some((c) => c.theme === w.pictureTheme), `${loc} complex ${row.id}: "${w.word}" pictureTheme "${w.pictureTheme}" holds no picture of it`, fails);
      let hits;
      if (cfg.shape === 'rime') {
        const rime = String(w.word).slice(String(w.unit).length);
        check(String(w.word).startsWith(String(w.unit)), `${loc} complex ${row.id}: "${w.word}" does not start with its unit "${w.unit}"`, fails);
        hits = cells.filter((c) => c.onset === w.unit && c.rime === rime);
      } else {
        const u = String(w.unit).toLocaleLowerCase(loc);
        hits = cells.filter((c) => c.text.toLocaleLowerCase(loc) === (cfg.shape === 'syllable' ? u : String(w.word).toLocaleLowerCase(loc)));
      }
      check(hits.length === 1, `${loc} complex ${row.id}: "${w.word}" matches ${hits.length} cells of its row (want 1)`, fails);
      wordTexts.add(cfg.shape === 'syllable' ? String(w.unit).toLocaleLowerCase(loc) : String(w.word).toLocaleLowerCase(loc));
      allWords.add(String(w.word).toLocaleLowerCase(loc));
    }
    for (const ro of row.readOnly || []) {
      check(!hasPicture(ro, loc) && !(approved.get(ro) && hasPicture(approved.get(ro).key, loc)), `${loc} complex ${row.id}: readOnly "${ro}" IS pictured`, fails);
      check(cells.some((c) => c.text === ro), `${loc} complex ${row.id}: readOnly "${ro}" is not a cell`, fails);
    }
    const expect = new Set([...wordTexts, ...(row.readOnly || []).map((r) => r.toLocaleLowerCase(loc))]);
    check(cellTexts.length === expect.size && cellTexts.every((t) => expect.has(t)), `${loc} complex ${row.id}: cells [${cellTexts.join(' ')}] != words ∪ readOnly [${[...expect].join(' ')}]`, fails);
  }
  for (const [t, k] of cellSeen) check(k === 1, `${loc}: complex cell "${t}" appears in ${k} rows`, fails);
  // derivation (R): every approved count-1 TeX pictured word with a blend onset + a complexRime rime, minus ban
  if (cfg.shape === 'rime' && rimeRe instanceof RegExp) {
    const derived = new Set();
    for (const e of approved.values()) {
      if (e.count !== 1 || !texAgreed(e) || !lettersOnly(e.word)) continue;
      const m = /^([bcdfghjklmnpqrstvwxyz]+)([aeiou].*)$/.exec(e.word);
      if (!m || !blends.has(m[1]) || !rimeRe.test(m[2])) continue;
      if (!hasPicture(e.key, loc) || banned.has(e.key)) continue;
      derived.add(e.word);
    }
    const missing = [...derived].filter((w) => !allWords.has(w));
    const extra = [...allWords].filter((w) => !derived.has(w));
    check(!missing.length && !extra.length, `${loc}: complex words differ from the approved derivation (missing [${missing.join(' ')}] extra [${extra.join(' ')}])`, fails);
  }
  check(n > 0, `${loc}: 0 complex words checked`, fails);
  return fails;
}

/* ------------------------------------------------------------------ DATA (the multi pool: Join + Syllabified, rules 6 / 9) */
function multiDataChecks(loc, cfg) {
  const fails = [];
  const approved = approvedByKey(loc);
  const pool = cfg.multi;
  if (!Array.isArray(pool) || !pool.length) { check(false, `${loc}: no multi pool (Join + Syllabified refused for ${loc})`, fails); return fails; }
  const banned = new Set(cfg.ban || []);
  const muteE = !!(cfg.refuse && cfg.refuse.finalMuteE);
  const seen = new Set();
  const words = new Set();
  for (const w of pool) {
    const e = approved.get(w.key);
    check(!!e, `${loc} multi: "${w.word}" (${w.key}) is not an approved word`, fails);
    check(!seen.has(w.key), `${loc} multi: key "${w.key}" listed twice`, fails);
    seen.add(w.key);
    if (e) {
      check(e.word.toLocaleLowerCase(loc) === String(w.word).toLocaleLowerCase(loc), `${loc} multi: bank word "${w.word}" != approved "${e.word}"`, fails);
      check(texAgreed(e), `${loc} multi: "${w.word}" boundary is not TeX-agreed (${(e.sources_agreed || []).join('/')})`, fails);
      check(Array.isArray(w.split) && JSON.stringify(w.split) === JSON.stringify(e.split), `${loc} multi: "${w.word}" split [${(w.split || []).join('|')}] differs from approved [${(e.split || []).join('|')}]`, fails);
      check(e.count >= 2 && e.count <= 3, `${loc} multi: "${w.word}" count ${e.count} outside 2-3`, fails);
      if (cfg.strictPool === 'policy_managed_absent') check(e.policy_managed === undefined, `${loc} multi: "${w.word}" is policy-managed (da strict pool)`, fails);
    }
    check(lettersOnly(w.word), `${loc} multi: word "${w.word}" is not letters`, fails);
    check([...String(w.word)].length <= MULTI_MAX_LETTERS, `${loc} multi: "${w.word}" has more than ${MULTI_MAX_LETTERS} letters`, fails);
    check(Array.isArray(w.split) && w.split.join('').toLocaleLowerCase(loc) === String(w.word).toLocaleLowerCase(loc), `${loc} multi: split of "${w.word}" does not join to the word`, fails);
    check(!banned.has(w.key), `${loc} multi: banned key "${w.key}" is listed`, fails);
    check(hasPicture(w.key, loc), `${loc} multi: "${w.word}" has no colour picture`, fails);
    check(!excluded(w.key, loc), `${loc} multi: "${w.key}" is B2-excluded in ${loc}`, fails);
    if (w.pictureTheme) check(candidates(w.key, loc).some((c) => c.theme === w.pictureTheme), `${loc} multi: "${w.word}" pictureTheme "${w.pictureTheme}" holds no picture of it`, fails);
    if (muteE && Array.isArray(w.split)) check(!/e$/i.test(w.split[w.split.length - 1]), `${loc} multi: "${w.word}" ends in a mute e but refuse.finalMuteE is set`, fails);
    words.add(String(w.word).toLocaleLowerCase(loc));
  }
  // derivation: every approved count-2/3 TeX pictured letters-only word ≤ MULTI_MAX_LETTERS, minus ban
  const derived = new Set();
  for (const e of approved.values()) {
    if (!(e.count === 2 || e.count === 3) || !texAgreed(e) || !lettersOnly(e.word)) continue;
    if ([...e.word].length > MULTI_MAX_LETTERS) continue;
    if (!hasPicture(e.key, loc) || banned.has(e.key) || excluded(e.key, loc)) continue;
    if (cfg.strictPool === 'policy_managed_absent' && e.policy_managed !== undefined) continue;
    derived.add(e.word.toLocaleLowerCase(loc));
  }
  const missing = [...derived].filter((w) => !words.has(w));
  const extra = [...words].filter((w) => !derived.has(w));
  check(!missing.length && !extra.length, `${loc}: multi pool differs from the approved derivation (missing [${missing.join(' ')}] extra [${extra.join(' ')}])`, fails);
  check(pool.length > 0, `${loc}: 0 multi words checked`, fails);
  return fails;
}

/* ------------------------------------------------------------------ rule 13: feasibility, base + faces */
function tryBuild(type, d, unit, loc, tag, fails) {
  const rng = makeRng(instanceSeed({ typeId: type.id, theme: null, difficulty: d, seedEpoch: 1, unit: unit || null }));
  try {
    const b = type.build({ theme: null, difficulty: d, locale: loc, unit: unit || null }, { rng });
    const dd = type.difficulty[d];
    const items = (b.bodyHtml.match(/data-lcs-word=/g) || []).length;
    const want = dd.mode === 'syllabified' ? dd.lines : dd.cards;
    check(items === want, `${tag}: ${items} items != ${want}`, fails);
    check(b.meta.pool >= dd.poolMin, `${tag}: built with pool ${b.meta.pool} < floor ${dd.poolMin} (FILLED, not refused)`, fails);
    return `ok pool=${b.meta.pool}` + (b.meta.cellW ? ` cellW=${b.meta.cellW} font=${b.meta.fontPx} rows=${b.meta.rows.join('+')}` : '');
  } catch (e) {
    return 'REFUSED: ' + String(e.message).replace(/^G1-306[^:]*: /, '').slice(0, 90);
  }
}
function feasibility(loc, cfg) {
  const rows = rowsOf(cfg) || [];
  const matrix = [];
  const fails = [];
  for (const row of rows) for (const d of [1, 2, 3]) matrix.push({ face: 'base', unit: row.id, d, res: tryBuild(spec, d, row.id, loc, `${loc} ${row.id} d${d}`, fails) });
  for (const d of [1, 2, 3]) {
    const m = matrix.find((x) => x.face === 'base' && x.unit === cfg.exemplar && x.d === d);
    check(m && m.res.startsWith('ok'), `${loc}: exemplar "${cfg.exemplar}" does not build at d${d} (${m && m.res})`, fails);
  }
  // faces at d2 (the level every b3 wave ships)
  for (const face of ['circle', 'carpet']) for (const row of rows) matrix.push({ face, unit: row.id, d: 2, res: tryBuild(FACES[face], 2, row.id, loc, `${loc} ${face} ${row.id}`, fails) });
  for (const row of cfg.complexUnits || []) matrix.push({ face: 'complex', unit: row.id, d: 2, res: tryBuild(FACES.complex, 2, row.id, loc, `${loc} complex ${row.id}`, fails) });
  for (const face of ['join', 'syllabified']) matrix.push({ face, unit: '-', d: 2, res: tryBuild(FACES[face], 2, null, loc, `${loc} ${face}`, fails) });
  const exemplarOf = { circle: cfg.exemplar, carpet: cfg.exemplar, complex: cfg.complexExemplar, join: '-', syllabified: '-' };
  for (const face of Object.keys(FACES)) {
    const m = matrix.find((x) => x.face === face && x.unit === exemplarOf[face] && x.d === 2);
    check(m && m.res.startsWith('ok'), `${loc}: face ${face} does not build on its exemplar "${exemplarOf[face]}" at d2 (${m && m.res})`, fails);
  }
  return { matrix, fails };
}

/* ---------------------------------------------------------------- RENDER */
async function measure(page) {
  return page.evaluate(({ FLOOR, codeColors }) => {
    const f = [];
    const root = document.querySelector('[data-lcs-sr]');
    const face = root.dataset.lcsFace || 'base';
    const carpet = root.querySelector('[data-lcs-carpet]');
    const inside = (r, box, what) => {
      if (r.left < box.left - 0.6 || r.right > box.right + 0.6 || r.top < box.top - 0.6 || r.bottom > box.bottom + 0.6) f.push(`${what} outside its box (${Math.round(r.left)}-${Math.round(r.right)} × ${Math.round(r.top)}-${Math.round(r.bottom)} vs ${Math.round(box.left)}-${Math.round(box.right)} × ${Math.round(box.top)}-${Math.round(box.bottom)})`);
    };
    // floors: pictures (cards + bank)
    root.querySelectorAll('img').forEach((img, i) => {
      const r = img.getBoundingClientRect();
      if (r.width < FLOOR.element || r.height < FLOOR.element) f.push(`picture ${i + 1} ${Math.round(r.width)}x${Math.round(r.height)} < ${FLOOR.element}`);
      const src = decodeURIComponent(img.getAttribute('src') || '');
      if (/\bbw[\/\\]/i.test(src)) f.push('BW-directory picture: ' + src.slice(-40));
    });
    // every card's content sits INSIDE its card (cards clip with overflow:hidden — the page lints cannot see it)
    root.querySelectorAll('.ws-card').forEach((card, i) => {
      const box = card.getBoundingClientRect();
      card.querySelectorAll('.ws-card-stage *').forEach((el) => {
        if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        inside(r, box, `card ${i + 1} <${el.tagName.toLowerCase()}>`);
      });
    });
    if (carpet) {
      carpet.querySelectorAll('g[data-lcs-cell] rect').forEach((rc) => {
        const r = rc.getBoundingClientRect();
        if (r.width < FLOOR.element || r.height < FLOOR.element) f.push(`cell ${Math.round(r.width)}x${Math.round(r.height)} < ${FLOOR.element}`);
      });
      // rule 11: the widest cell text advance vs the cell width, in the real font
      carpet.querySelectorAll('svg[data-lcs-row]').forEach((svg, ri) => {
        const cellW = +svg.dataset.lcsCellW;
        const fontPx = +svg.dataset.lcsFont;
        if (fontPx < FLOOR.answer) f.push(`row ${ri + 1} cell font ${fontPx} < ${FLOOR.answer}`);
        svg.querySelectorAll('g[data-lcs-cell]').forEach((g) => {
          const t = g.querySelector('text');
          const adv = t.getComputedTextLength();
          const fs = parseFloat(t.getAttribute('font-size'));
          if (fs !== fontPx) f.push(`cell "${g.dataset.lcsCell}" font ${fs} != row font ${fontPx}`);
          if (adv > cellW - 8 + 0.01) f.push(`cell "${g.dataset.lcsCell}" advance ${adv.toFixed(1)} > cellW ${cellW} - 8`);
          const fam = getComputedStyle(t).fontFamily;
          if (!/Baloo 2/.test(fam)) f.push(`cell "${g.dataset.lcsCell}" font-family ${fam}`);
        });
        const w = svg.getBoundingClientRect().width;
        if (w > 651 + 0.6) f.push(`row ${ri + 1} width ${Math.round(w)} > 651`);
      });
    }
    // lanes (base / complex): height floor, glyphH floor, the printed rime leaves >= 60 px to write on (measured)
    root.querySelectorAll('[data-lcs-syllable-lane]').forEach((l, i) => {
      const r = l.getBoundingClientRect();
      if (r.height < FLOOR.element) f.push(`lane ${i + 1} height ${Math.round(r.height)} < ${FLOOR.element}`);
      if (+l.dataset.lcsGlyphH < FLOOR.answer) f.push(`lane ${i + 1} glyphH ${l.dataset.lcsGlyphH} < ${FLOOR.answer}`);
      const t = l.querySelector('text[data-lcs-lane-printed]');
      const textW = t ? t.getComputedTextLength() : 0;
      if (r.width - textW - 12 < 60) f.push(`lane ${i + 1} writable ${(r.width - textW - 12).toFixed(1)} < 60`);
      if (t && t.getComputedTextLength() === 0) f.push(`lane ${i + 1} printed text measures 0`);
    });
    // circle: pills ≥ 44 tall, font ≥ 26, the text fits the pill
    root.querySelectorAll('[data-lcs-choice]').forEach((p, i) => {
      const r = p.getBoundingClientRect();
      if (r.height < FLOOR.element) f.push(`pill ${i + 1} height ${Math.round(r.height)} < ${FLOOR.element}`);
      const fs = parseFloat(getComputedStyle(p).fontSize);
      if (fs < FLOOR.answer) f.push(`pill ${i + 1} font ${fs} < ${FLOOR.answer}`);
      if (p.scrollWidth > p.clientWidth + 0.6) f.push(`pill "${p.dataset.lcsChoice}" text ${p.scrollWidth} wider than its pill ${p.clientWidth}`);
    });
    // join: tiles ≥ 44 tall, font ≥ 26, the tile row inside the card (measured above), ruling row height + glyph
    root.querySelectorAll('.ws-tile').forEach((t, i) => {
      const r = t.getBoundingClientRect();
      if (r.height < FLOOR.element) f.push(`tile ${i + 1} height ${Math.round(r.height)} < ${FLOOR.element}`);
      const fs = parseFloat(getComputedStyle(t).fontSize);
      if (fs < FLOOR.answer) f.push(`tile ${i + 1} font ${fs} < ${FLOOR.answer}`);
      if (t.scrollWidth > t.clientWidth + 0.6) f.push(`tile "${t.textContent.trim()}" text wider than its tile`);
    });
    root.querySelectorAll('[data-lcs-ruling-row]').forEach((row, i) => {
      const r = row.getBoundingClientRect();
      if (r.height < FLOOR.element) f.push(`ruling row ${i + 1} height ${Math.round(r.height)} < ${FLOOR.element}`);
    });
    // carpet face: rings ≥ 44 and filled with a code colour
    root.querySelectorAll('[data-lcs-colour]').forEach((ring, i) => {
      if (!(ring instanceof SVGElement)) return;
      const r = ring.getBoundingClientRect();
      if (r.width < FLOOR.element || r.height < FLOOR.element) f.push(`ring ${i + 1} ${Math.round(r.width)}x${Math.round(r.height)} < ${FLOOR.element}`);
      const c = ring.querySelector('circle');
      const fill = (c && c.getAttribute('fill') || '').toUpperCase();
      if (!Object.values(codeColors).map((x) => x.toUpperCase()).includes(fill)) f.push(`ring ${i + 1} fill ${fill} is not a codeColor`);
    });
    // syllabified: the bank on ONE line, boxes ≥ 44, rows ≥ 44, word font ≥ 26 and inside the row
    const bank = root.querySelector('[data-lcs-numbered-bank]');
    if (bank) {
      const tops = [...bank.querySelectorAll('[data-lcs-bank-index]')].map((it) => Math.round(it.getBoundingClientRect().top));
      if (new Set(tops).size > 1) f.push(`the picture bank wraps to ${new Set(tops).size} lines`);
      root.querySelectorAll('[data-lcs-sr-row]').forEach((row, i) => {
        const r = row.getBoundingClientRect();
        if (r.height < FLOOR.element) f.push(`row ${i + 1} height ${Math.round(r.height)} < ${FLOOR.element}`);
        const box = row.querySelector('[data-lcs-number-box]');
        const b = box ? box.getBoundingClientRect() : null;
        if (!b || b.width < FLOOR.element || b.height < FLOOR.element) f.push(`row ${i + 1} number box ${b ? Math.round(b.width) + 'x' + Math.round(b.height) : 'missing'} < ${FLOOR.element}`);
        const word = row.querySelector('[data-lcs-printed]');
        if (word) {
          const fs = parseFloat(getComputedStyle(word).fontSize);
          if (fs < FLOOR.answer) f.push(`row ${i + 1} word font ${fs} < ${FLOOR.answer}`);
          const wr = word.getBoundingClientRect();
          inside(wr, r, `row ${i + 1} word`);
          if (b && wr.right > b.left - 8) f.push(`row ${i + 1} word runs into the number box`);
        }
      });
    }
    // rule 10 (browser): the answer word appears in no text node outside the carpet cells / the Circle pills
    const words = [...root.querySelectorAll('[data-lcs-word]')].map((c) => c.dataset.lcsWord.toLowerCase());
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const txt = node.textContent.trim().toLowerCase();
      if (!txt) continue;
      if (node.parentElement.closest('[data-lcs-carpet]')) continue;
      if (face === 'circle' && node.parentElement.closest('[data-lcs-choice]')) continue;
      if (words.includes(txt)) f.push(`answer "${txt}" printed outside the carpet`);
    }
    // stamps for the node diff
    const cards = [...root.querySelectorAll('[data-lcs-word]')].map((c) => ({
      word: c.dataset.lcsWord, unit: c.dataset.lcsUnit || null, rime: c.dataset.lcsRime || null, key: c.dataset.lcsVocab, row: c.dataset.lcsRowId || null,
      split: c.dataset.lcsSplit || null, answer: c.dataset.lcsAnswer || null, pos: c.querySelector('[data-lcs-choice]') ? [...c.querySelectorAll('[data-lcs-choice]')].findIndex((p) => p.dataset.lcsChoice === c.dataset.lcsAnswer) : null,
      pic: c.dataset.lcsPic || null, colour: c.dataset.lcsColour || null,
    }));
    const rows = carpet ? [...carpet.querySelectorAll('svg[data-lcs-row]')].map((s) => s.dataset.lcsRow) : [];
    return { fails: f, cards, rows, face };
  }, { FLOOR, codeColors: tokens.codeColors });
}

async function renderOne(page, { d, unit, variant, type, tag, strings }) {
  const t = type || spec;
  const baseName = `G1-306-gate-${tag || ''}${t.id !== 'G1-306' ? t.id + '-' : ''}d${d}-${LOC}` + (unit ? '-u' + unit : '') + (variant > 1 ? '-v' + variant : '');
  const out = await renderInstance({ type: t, theme: null, difficulty: d, locale: LOC, unit: unit || null, variant, page, outDir: OUT, baseName, strings });
  const m = await measure(page);
  return { out, m, baseName };
}

/** rule 10: the rendered stamps equal the bank's re-derived units / splits. */
function stampDiff(cfg, m, fails, tag) {
  if (m.face === 'join' || m.face === 'syllabified') {
    for (const c of m.cards) {
      const w = (cfg.multi || []).find((x) => x.key === c.key);
      check(!!w, `${tag}: "${c.word}" (${c.key}) is not in the multi pool`, fails);
      if (!w) continue;
      check(c.split === w.split.join('|'), `${tag}: "${c.word}" stamps split "${c.split}", the bank says "${w.split.join('|')}"`, fails);
    }
    return;
  }
  const rows = m.structure === 'complex' ? cfg.complexUnits : rowsOf(cfg);
  for (const c of m.cards) {
    const row = rows.find((r) => r.id === c.row);
    check(!!row, `${tag}: card row "${c.row}" is not a bank row`, fails);
    if (!row) continue;
    const w = (row.words || []).find((x) => x.key === c.key);
    check(!!w, `${tag}: card "${c.word}" (${c.key}) is not a word of row ${row.id}`, fails);
    if (!w) continue;
    const expectRime = cfg.shape === 'rime' ? (row.rime || c.word.slice(String(w.unit).length)) : null;
    const expectUnit = cfg.shape === 'rime' ? c.word.slice(0, c.word.length - expectRime.length) : (cfg.shape === 'syllable' ? String(w.split[0]).toLocaleLowerCase(LOC) : w.word);
    check(c.unit === expectUnit, `${tag}: card "${c.word}" stamps unit "${c.unit}", re-derived "${expectUnit}"`, fails);
    if (cfg.shape === 'rime') check(c.rime === expectRime, `${tag}: card "${c.word}" rime "${c.rime}" != ${expectRime}`, fails);
    if (m.face === 'circle') check(c.answer === (cfg.shape === 'syllable' ? expectUnit : c.word), `${tag}: card "${c.word}" answer "${c.answer}" is not its own cell`, fails);
  }
  const expectRows = [];
  const f = rows.findIndex((r) => r.id === m.unitId);
  for (const r of rows.slice(f, f + m.rows.length)) expectRows.push(r.cells.map((x) => parseCell(x).text).join('|'));
  check(JSON.stringify(m.rows) === JSON.stringify(expectRows), `${tag}: carpet rows ${JSON.stringify(m.rows)} != bank order ${JSON.stringify(expectRows)}`, fails);
}

/* ---------------------------------------------------------------- POISON */
function deepClone(o) { return JSON.parse(JSON.stringify(o, (k, v) => (v instanceof RegExp ? { __re: v.source, __fl: v.flags } : v)), (k, v) => (v && v.__re != null ? new RegExp(v.__re, v.__fl) : v)); }
function restore(from) {
  for (const k of Object.keys(BANK)) delete BANK[k];
  Object.assign(BANK, deepClone(from));
}
/** A spec whose build() output is rewritten by `fn(html)` (a needle that matches nothing THROWS — a poison must poison). */
function rewriting(type, fn) {
  return Object.assign({}, type, { build(...a) { const r = type.build.apply(type, a); const h = fn(r.bodyHtml); if (h === r.bodyHtml) throw new Error('poison needle matched nothing'); r.bodyHtml = h; return r; } });
}

async function main() {
  const fails = [];
  const pristine = deepClone(BANK);
  const cfg = BANK[LOC];
  if (!cfg) { console.log(`FAIL: no ${LOC} block in data/b3/syllable-reading.js`); process.exit(1); }

  // ---- data
  fails.push(...dataChecks(LOC, cfg));
  fails.push(...complexDataChecks(LOC, cfg));
  fails.push(...multiDataChecks(LOC, cfg));
  const { matrix, fails: ff } = feasibility(LOC, cfg);
  fails.push(...ff);
  console.log('feasibility (face × unit × difficulty):');
  for (const m of matrix) console.log(`  ${m.face.padEnd(11)} ${String(m.unit).padEnd(5)} d${m.d}  ${m.res}`);
  const multiN = (cfg.multi || []).length;
  console.log(`multi pool: ${multiN} words (${(cfg.multi || []).filter((w) => w.split.length === 3).length} three-syllable); complex ladders: ${(cfg.complexUnits || []).length}`);

  // ---- render
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  const unitOf = { base: cfg.exemplar, circle: cfg.exemplar, carpet: cfg.exemplar, complex: cfg.complexExemplar, join: null, syllabified: null };
  const typeOf = { base: spec, ...FACES };
  const runRender = async ({ face, d, unit, variant, tag, strings }) => {
    const { out, m, baseName } = await renderOne(page, { d, unit, variant, type: typeOf[face], tag, strings });
    m.unitId = unit; m.structure = face === 'complex' ? 'complex' : 'simple';
    check(out.qa.lints.length === 0, `${baseName}: lints ${out.qa.lints.join(' | ')}`, fails);
    check(out.qa.verify.length === 0, `${baseName}: verify ${out.qa.verify.join(' | ')}`, fails);
    for (const x of m.fails) check(false, `${baseName}: ${x}`, fails);
    assertions += 1;
    stampDiff(cfg, m, fails, baseName);
    return { out, m, baseName };
  };
  let renderCount = 0;
  try {
    const feasible = matrix.filter((m) => m.res.startsWith('ok'));
    const renderSet = QUICK
      ? [1, 2, 3].map((d) => ({ face: 'base', d, unit: cfg.exemplar })).concat(Object.keys(FACES).map((face) => ({ face, d: 2, unit: unitOf[face] })))
      : feasible.map((m) => ({ face: m.face, d: m.d, unit: m.unit === '-' ? null : m.unit }));
    for (const r of renderSet) { const { out } = await runRender(r); pngs.push(out.pngPath); renderCount++; }
    // every face at the worst legal chrome (3-line title + 2-line instruction)
    for (const face of ['base', ...Object.keys(FACES)]) {
      await runRender({ face, d: 2, unit: unitOf[face], variant: 1, tag: 'worst-', strings: WORST });
      renderCount++;
    }
    // sweeps
    if (!QUICK) {
      const union = new Set();
      let rowSig = null;
      for (let v = 1; v <= 20; v++) {
        const { m, baseName } = await runRender({ face: 'base', d: 2, unit: cfg.exemplar, variant: v, tag: 'sweep-' });
        m.cards.forEach((c) => union.add(c.word));
        const sig = m.rows.join('/');
        if (rowSig == null) rowSig = sig;
        check(sig === rowSig, `${baseName}: carpet row order moved (${sig})`, fails);
        if (v > 1) for (const ext of ['.html', '.pdf', '.png']) { try { fs.unlinkSync(path.join(OUT, baseName + ext)); } catch (e) { /* noop */ } }
      }
      const pool = feasible.find((m) => m.face === 'base' && m.unit === cfg.exemplar && m.d === 2);
      const poolN = +(/pool=(\d+)/.exec(pool.res) || [])[1];
      check(union.size === poolN, `sweep: ${union.size} distinct words over 20 seeds != pool ${poolN} (some word never surfaces)`, fails);
      // faces: 10 seeds each — the union grows past one page; Circle's answer column never freezes
      for (const face of Object.keys(FACES)) {
        const u = new Set();
        const posSeen = new Set();
        for (let v = 1; v <= 10; v++) {
          const { m, baseName } = await runRender({ face, d: 2, unit: unitOf[face], variant: v, tag: 'sweep-' });
          m.cards.forEach((c) => { u.add(c.word); if (c.pos != null) posSeen.add(c.pos); });
          if (v > 1) for (const ext of ['.html', '.pdf', '.png']) { try { fs.unlinkSync(path.join(OUT, baseName + ext)); } catch (e) { /* noop */ } }
        }
        const items = face === 'syllabified' ? FACES[face].difficulty[2].lines : FACES[face].difficulty[2].cards;
        check(u.size > items, `${face} sweep: ${u.size} distinct words over 10 seeds — no wider than one page`, fails);
        if (face === 'circle') check(posSeen.size === FACES.circle.difficulty[2].choices, `circle sweep: answer positions seen ${[...posSeen].join(',')}`, fails);
      }
    }

    // ---- poisons: each must FAIL on the correct instrument; silence exits 1
    const mainAssertions = assertions;
    const poisonResults = [];
    async function poison(name, mutate, detect) {
      restore(pristine);
      let fired = false, note = '';
      try { mutate(BANK[LOC]); const r = await detect(BANK[LOC]); fired = r.fired; note = r.note || ''; } catch (e) { fired = false; note = 'threw: ' + e.message.slice(0, 80); }
      restore(pristine);
      poisonResults.push({ name, fired, note });
    }
    const rowOf = (c, id) => rowsOf(c).find((r) => r.id === id);
    const cxRowOf = (c, id) => c.complexUnits.find((r) => r.id === id);
    const dataFired = (c) => { const f = dataChecks(LOC, c); return { fired: f.length > 0, note: f[0] || '' }; };
    const cxFired = (want) => (c) => { const f = complexDataChecks(LOC, c); const hit = want ? f.find((x) => want.test(x)) : f[0]; return { fired: !!hit, note: hit || f[0] || '' }; };
    const multiFired = (want) => (c) => { const f = multiDataChecks(LOC, c); const hit = want ? f.find((x) => want.test(x)) : f[0]; return { fired: !!hit, note: hit || f[0] || '' }; };
    const renderFired = async (c, opts, want) => {
      const face = (opts && opts.face) || 'base';
      const { out, m } = await renderOne(page, Object.assign({ d: 2, unit: unitOf[face], variant: 1, tag: 'poison-', type: typeOf[face] }, opts || {}));
      const all = [...out.qa.verify, ...out.qa.lints, ...m.fails];
      const hit = want ? all.find((x) => want.test(x)) : all[0];
      return { fired: !!hit, note: hit || (all[0] ? 'only: ' + all[0] : '') };
    };
    const buildThrows = (type, c, d, unit) => {
      const rng = makeRng(instanceSeed({ typeId: type.id, theme: null, difficulty: d, seedEpoch: 1, unit: unit || null }));
      try { const b = type.build({ theme: null, difficulty: d, locale: LOC, unit: unit || null }, { rng }); return { fired: false, note: 'built with pool ' + b.meta.pool }; }
      catch (e) { return { fired: /REFUSED|refuse|not built/.test(e.message), note: e.message.slice(0, 80) }; }
    };
    const firstCard = (html) => /data-lcs-word="([^"]+)"/.exec(html)[1];

    /* ---- the base's 16 */
    await poison('unapproved word (sebra)', (c) => { rowOf(c, 'an').words.push({ key: 'zebra', word: 'sebra', unit: 's' }); rowOf(c, 'an').cells.push('s|ebra'); }, dataFired);
    await poison('TeX-less word (acorn)', (c) => { rowOf(c, 'an').words.push({ key: 'acorn', word: 'acorn', unit: 'ac' }); }, dataFired);
    await poison('dropped cell c|at, cat fanned — data', (c) => { const r = rowOf(c, 'at'); r.cells = r.cells.filter((x) => x !== 'c|at'); }, dataFired);
    await poison('dropped cell — render (the first card cell cut out of the carpet html)', () => {}, async (c) => {
      const cut = rewriting(spec, (h) => { const w = firstCard(h); const re = new RegExp('<g data-lcs-cell="' + w + '"[^]*?</g>'); /* [^] = any char; a `\s` inside a string degrades to `s` */ return h.replace(re, ''); });
      return renderFired(c, { type: cut }, /matches 0 cells/);
    });
    await poison('car under -ar (r-controlled)', (c) => { c.rimes.push({ id: 'ar', label: '-ar', rime: 'ar', cells: ['c|ar', 'j|ar', 'st|ar'], readOnly: [], words: [{ key: 'car', word: 'car', unit: 'c' }, { key: 'jar', word: 'jar', unit: 'j' }, { key: 'star', word: 'star', unit: 'st' }] }); }, dataFired);
    await poison('B multigraph chunk (boek sch/oe)', (c) => { c.shape = 'soundout'; c.units = [{ id: 'oe', cells: ['boek'], words: [{ key: 'book', word: 'boek', unit: 'boek', chunks: ['b', 'oe', 'k'] }] }]; }, dataFired);
    await poison('da policy-managed word (hund)', (c) => { c.shape = 'soundout'; c.strictPool = 'policy_managed_absent'; c.units = [{ id: 'u', cells: ['hund'], words: [{ key: 'dog', word: 'hund', unit: 'hund', chunks: ['h', 'u', 'n', 'd'] }] }]; }, (c) => { const f = dataChecks('da', c); return { fired: f.some((x) => /policy-managed/.test(x)), note: f.find((x) => /policy-managed/.test(x)) || f[0] }; });
    await poison('wrong onset stamp (the first card data-lcs-unit rewritten)', () => {}, async (c) => {
      const bad = rewriting(spec, (h) => { const m = /data-lcs-unit="([^"]+)"/.exec(h); return h.replace(m[0], 'data-lcs-unit="' + (m[1] === 'b' ? 'h' : 'b') + '"'); });
      return renderFired(c, { type: bad }, /onset .* != /);
    });
    await poison('answer printed on its card', () => {}, async (c) => {
      const leaky = rewriting(spec, (h) => { const w = firstCard(h); return h.replace('</div></section>', `<span>${w}</span></div></section>`); });
      return renderFired(c, { type: leaky }, /visible text|answer .* printed/);
    });
    await poison('30 px swan forced into a 64 cell', () => {}, async (c) => {
      await renderOne(page, { d: 2, unit: c.exemplar, variant: 1, tag: 'poison-' });
      await page.evaluate(() => {
        document.querySelectorAll('svg[data-lcs-row]').forEach((svg) => { svg.dataset.lcsCellW = '64'; svg.dataset.lcsFont = '30'; svg.querySelectorAll('g[data-lcs-cell] rect').forEach((r) => r.setAttribute('width', '64')); svg.querySelectorAll('g[data-lcs-cell] text').forEach((t) => t.setAttribute('font-size', '30')); });
      });
      const m = await measure(page);
      return { fired: m.fails.some((x) => /advance/.test(x)), note: m.fails.find((x) => /advance/.test(x)) || '' };
    });
    await poison('BW-directory picture', () => {}, async (c) => {
      await renderOne(page, { d: 2, unit: c.exemplar, variant: 1, tag: 'poison-' });
      const t = manifest().themes['zoo animals bw'];
      const noun = Object.keys(t.nouns)[0];
      const uri = require('url').pathToFileURL(path.join(__dirname, '..', 'cache', 'themes', 'zoo animals bw', t.nouns[noun].files[0])).href;
      await page.evaluate((u) => { document.querySelector('.ws-card-stage img').setAttribute('src', u); }, uri);
      const m = await measure(page);
      const v = await spec.verify(page);
      return { fired: m.fails.some((x) => /BW-directory/.test(x)) && v.some((x) => /BW-directory/.test(x)), note: m.fails.find((x) => /BW/.test(x)) || '' };
    });
    await poison('7-word unit must throw, never fill (swan removed)', (c) => { const r = rowOf(c, 'an'); r.words = r.words.filter((w) => w.key !== 'swan'); r.cells = r.cells.filter((x) => x !== 'sw|an'); }, (c) => buildThrows(spec, c, 2, c.exemplar));
    await poison('pictureTheme pin names a dir without the word (pan → space)', (c) => { rowOf(c, 'an').words.find((w) => w.key === 'pan').pictureTheme = 'space'; }, dataFired);
    await poison('read-only cells over a third (four readOnly stamps forced on the render)', () => {}, async (c) => {
      const ro = rewriting(spec, (h) => { let n = 0; return h.replace(/<g data-lcs-cell="([^"]+)"/g, (m0) => (n++ < 4 ? m0 + ' data-lcs-readonly="1"' : m0)); });
      return renderFired(c, { type: ro }, /exceed a third/);
    });
    await poison('pictured readOnly cell (bat)', (c) => { const r = rowOf(c, 'at'); r.readOnly.push('bat'); }, dataFired);
    await poison('duplicate cell across rows (c|an in -at)', (c) => { rowOf(c, 'at').cells.push('c|an'); }, dataFired);

    /* ---- C: Circle (G1-330) */
    const circleHtml = (fn) => rewriting(FACES.circle, fn);
    await poison('C1 the answer pill removed', () => {}, (c) => renderFired(c, { face: 'circle', type: circleHtml((h) => { const a = /data-lcs-answer="([^"]+)"/.exec(h)[1]; return h.replace(new RegExp('<span class="ws-pill"[^>]*data-lcs-choice="' + a + '"[^]*?</span></span>'), ''); }) }, /0 pills equal the answer|pills != /));
    await poison('C2 two pills equal (a distractor rewritten to the answer)', () => {}, (c) => renderFired(c, { face: 'circle', type: circleHtml((h) => {
      const a = /data-lcs-answer="([^"]+)"/.exec(h)[1];
      const re = /<span class="ws-pill"[^>]*data-lcs-choice="([^"]+)" data-lcs-pos="(\d)">[^]*?<\/span><\/span>/;
      let done = false;
      return h.replace(/<span class="ws-pill"[^>]*data-lcs-choice="([^"]+)" data-lcs-pos="(\d)">[^]*?<\/span><\/span>/g, (m0, choice, pos) => { if (done || choice === a) return m0; done = true; return `<span class="ws-pill" style="width:100px;height:44px;padding:0;font-size:26px;line-height:1" data-lcs-choice="${a}" data-lcs-pos="${pos}"><span>${a}</span></span>`; });
    }) }, /2 pills equal|not distinct/));
    await poison('C3 a pill from the OTHER carpet row (bat → can)', () => {}, (c) => renderFired(c, { face: 'circle', type: circleHtml((h) => {
      // the first card's answer row is either -an or -at; take a cell from the other row as the distractor
      const a = /data-lcs-answer="([^"]+)"/.exec(h)[1];
      const other = a.endsWith('an') ? 'cat' : 'can';
      let done = false;
      return h.replace(/<span class="ws-pill"([^>]*)data-lcs-choice="([^"]+)" data-lcs-pos="(\d)">[^]*?<\/span><\/span>/g, (m0, style, choice, pos) => { if (done || choice === a) return m0; done = true; return `<span class="ws-pill"${style}data-lcs-choice="${other}" data-lcs-pos="${pos}"><span>${other}</span></span>`; });
    }) }, /not a cell of the card's row/));
    await poison('C4 the answer always in position 0 (the position shuffle disabled)', () => {}, (c) => {
      // the position sequence is the ONE shuffle over plain numbers (sample() shuffles entries through this.shuffle)
      const constant = Object.assign({}, FACES.circle, { build(o, ctx) { const rng = ctx.rng; const sh = rng.shuffle; const wrapped = Object.assign({}, rng, { shuffle: (arr) => (arr.length && arr.every((x) => typeof x === 'number') ? arr.map(() => 0) : sh(arr)) }); return FACES.circle.build.call(FACES.circle, o, { rng: wrapped }); } });
      return renderFired(c, { face: 'circle', type: constant }, /answer position 0 used/);
    });
    await poison('C5 a lane on a circle card', () => {}, (c) => renderFired(c, { face: 'circle', type: circleHtml((h) => h.replace('</div></section>', '<div data-lcs-syllable-lane data-lcs-writable="100" data-lcs-glyph-h="30" style="width:100px;height:44px"></div></div></section>')) }, /lanes rendered/));
    await poison('C6 a pill prints a different word than it stamps', () => {}, (c) => renderFired(c, { face: 'circle', type: circleHtml((h) => h.replace(/(data-lcs-choice="[^"]+" data-lcs-pos="0">)<span style="color:#3A3530">([a-z]+)<\/span>/, '$1<span style="color:#3A3530">x$2</span>')) }, /prints .* but stamps/));
    await poison('C7 a distractor that extends the answer (cat → cats)', () => {}, (c) => renderFired(c, { face: 'circle', type: circleHtml((h) => {
      const a = /data-lcs-answer="([^"]+)"/.exec(h)[1];
      let done = false;
      return h.replace(/<span class="ws-pill"([^>]*)data-lcs-choice="([^"]+)" data-lcs-pos="(\d)">[^]*?<\/span><\/span>/g, (m0, style, choice, pos) => { if (done || choice === a) return m0; done = true; return `<span class="ws-pill"${style}data-lcs-choice="${a}s" data-lcs-pos="${pos}"><span>${a}s</span></span>`; });
    }) }, /spelled prefix/));

    /* ---- J: Join (G1-331) */
    const joinHtml = (fn) => rewriting(FACES.join, fn);
    await poison('J1 tiles shuffled (the first card\'s two tiles swapped)', () => {}, (c) => renderFired(c, { face: 'join', type: joinHtml((h) => h.replace(/data-lcs-tile="0">([^<]+)<\/span>(<span aria-hidden[^]*?<\/span>)<span class="ws-tile"([^>]*)data-lcs-tile="1">([^<]+)<\/span>/, 'data-lcs-tile="0">$4</span>$2<span class="ws-tile"$3data-lcs-tile="1">$1</span>')) }, /order/));
    await poison('J2 the whole word printed on the card', () => {}, (c) => renderFired(c, { face: 'join', type: joinHtml((h) => { const w = firstCard(h); return h.replace('</div></section>', `<span>${w}</span></div></section>`); }) }, /whole word is printed|text .* outside the tiles|answer .* printed/));
    await poison('J3 a split that is not the approved split (tractor → trac|t|or)', (c) => { c.multi.find((w) => w.key === 'tractor').split = ['trac', 't', 'or']; }, multiFired(/split .* differs from approved/));
    await poison('J4 refuse.finalMuteE set with mute-e words in the pool', (c) => { c.refuse.finalMuteE = true; }, multiFired(/mute e/));
    await poison('J5 a derived word missing from the pool (tractor dropped)', (c) => { c.multi = c.multi.filter((w) => w.key !== 'tractor'); }, multiFired(/missing \[tractor/));
    await poison('J6 a rule-only word listed (acorn)', (c) => { c.multi.push({ key: 'acorn', word: 'acorn', split: ['ac', 'orn'] }); }, multiFired(/not TeX-agreed/));
    await poison('J7 the ruling row removed', () => {}, (c) => renderFired(c, { face: 'join', type: joinHtml((h) => h.replace(/<div data-lcs-ruling-row="1">[^]*?<\/svg><\/div>/, '')) }, /0 ruling rows/));
    await poison('J8 a 7-word pool must throw, never fill', (c) => { c.multi = c.multi.filter((w) => w.split.length === 2).slice(0, 7); }, (c) => buildThrows(FACES.join, c, 2, null));

    /* ---- K: Carpet (G1-332) */
    const carpetHtml = (fn) => rewriting(FACES.carpet, fn);
    await poison('K1 a target cell printed twice on the carpet', () => {}, (c) => renderFired(c, { face: 'carpet', type: carpetHtml((h) => { const w = firstCard(h); const m = new RegExp('<g data-lcs-cell="' + w + '"[^]*?</g>').exec(h); return h.replace(m[0], m[0] + m[0]); }) }, /printed 2 times/));
    await poison('K2 two rings the same colour', () => {}, (c) => renderFired(c, { face: 'carpet', type: carpetHtml((h) => { const cols = [...h.matchAll(/data-lcs-colour="([^"]+)"/g)].map((m) => m[1]); const a = cols[0], b = cols[2]; return h.split(`data-lcs-colour="${b}"`).join(`data-lcs-colour="${a}"`); }) }, /colour .* twice/));
    await poison('K3 a cell pre-coloured', () => {}, (c) => renderFired(c, { face: 'carpet', type: carpetHtml((h) => h.replace(/(<g data-lcs-cell="[^"]+"[^>]*><rect[^>]*fill=")#FFFFFF/, '$1' + tokens.codeColors.codeRed)) }, /want white/));
    await poison('K4 every target from one row (row-id stamps rewritten)', () => {}, (c) => renderFired(c, { face: 'carpet', type: carpetHtml((h) => h.replace(/data-lcs-row-id="[^"]+"/g, 'data-lcs-row-id="an"')) }, /targets come from 1 rows/));
    await poison('K5 a lane on a colour card', () => {}, (c) => renderFired(c, { face: 'carpet', type: carpetHtml((h) => h.replace('</div></section>', '<div data-lcs-syllable-lane data-lcs-writable="100" data-lcs-glyph-h="30" style="width:100px;height:44px"></div></div></section>')) }, /lanes rendered/));
    await poison('K6 reps:2 must refuse (a carpet prints every cell once)', () => {}, (c) => { const two = Object.assign({}, FACES.carpet, { difficulty: { 2: { ...FACES.carpet.difficulty[2], reps: 2 } } }); return buildThrows(two, c, 2, c.exemplar); });

    /* ---- X: Complex (G1-333) */
    await poison('X1 a single-consonant word in a complex row (c|at cat)', (c) => { const r = cxRowOf(c, 'l1'); r.cells.push('c|at'); r.words.push({ key: 'cat', word: 'cat', unit: 'c' }); }, cxFired(/is not a blend/));
    await poison('X2 a complex row carrying a shared rime', (c) => { cxRowOf(c, 'l1').rime = 'ag'; }, cxFired(/shared rime/));
    await poison('X3 a derived complex word missing (truck dropped)', (c) => { const r = cxRowOf(c, 'l2'); r.cells = r.cells.filter((x) => x !== 'tr|uck'); r.words = r.words.filter((w) => w.key !== 'truck'); }, cxFired(/missing \[truck/));
    await poison('X4 crow fanned (-ow is not short-vowel closed)', (c) => { const r = cxRowOf(c, 'l4'); r.cells.push('cr|ow'); r.words.push({ key: 'crow', word: 'crow', unit: 'cr' }); }, cxFired(/not short-vowel closed/));
    await poison('X5 a complex ladder listed as a SIMPLE row (control the other way)', (c) => { c.rimes.push({ id: 'l1x', label: 'blends', cells: ['fl|ag', 'cr|ab'], readOnly: [], words: [{ key: 'flag', word: 'flag', unit: 'fl' }, { key: 'crab', word: 'crab', unit: 'cr' }] }); }, (c) => { const f = dataChecks(LOC, c); const hit = f.find((x) => /not a simple short-vowel rime|!= "/.test(x)); return { fired: !!hit, note: hit || f[0] || '' }; });
    await poison('X6 wrong blend stamp on the complex render', () => {}, (c) => renderFired(c, { face: 'complex', type: rewriting(FACES.complex, (h) => { const m = /data-lcs-unit="([^"]+)"/.exec(h); return h.replace(m[0], 'data-lcs-unit="' + (m[1] === 'fl' ? 'cr' : 'fl') + '"'); }) }, /onset .* != /));

    /* ---- S: Syllabified (G1-334) */
    const sylHtml = (fn) => rewriting(FACES.syllabified, fn);
    const rowVocab = (h) => /data-lcs-sr-row="1"[^>]*data-lcs-vocab="([^"]+)"/.exec(h)[1];
    await poison('S1 no bank picture for row 1 (its bank item re-keyed)', () => {}, (c) => renderFired(c, { face: 'syllabified', type: sylHtml((h) => { const v = rowVocab(h); return h.replace(new RegExp('(data-lcs-bank-index="\\d+" data-lcs-vocab=")' + v + '"'), '$1nothing"'); }) }, /matches 0 bank pictures/));
    await poison('S2 two bank pictures for row 1 (a distractor re-keyed)', () => {}, (c) => renderFired(c, { face: 'syllabified', type: sylHtml((h) => {
      const v = rowVocab(h);
      const used = new Set([...h.matchAll(/data-lcs-sr-row="\d+"[^>]*data-lcs-vocab="([^"]+)"/g)].map((m) => m[1]));
      const items = [...h.matchAll(/data-lcs-bank-index="(\d+)" data-lcs-vocab="([^"]+)"/g)];
      const dis = items.find((m) => !used.has(m[2]));
      return h.replace(dis[0], `data-lcs-bank-index="${dis[1]}" data-lcs-vocab="${v}"`);
    }) }, /matches 2 bank pictures|twice/));
    await poison('S3 the rows re-ordered so the answers ascend', () => {}, (c) => renderFired(c, { face: 'syllabified', type: sylHtml((h) => {
      const rows = [...h.matchAll(/<div class="ws-lane" data-lcs-sr-row="\d+"[^]*?<\/div>/g)].map((m) => m[0]);
      const sorted = rows.slice().sort((a, b) => +/data-lcs-pic="(\d+)"/.exec(a)[1] - +/data-lcs-pic="(\d+)"/.exec(b)[1]);
      let out = h;
      rows.forEach((r, i) => { out = out.replace(r, '\u0000' + i + '\u0000'); });
      sorted.forEach((r, i) => { out = out.replace('\u0000' + i + '\u0000', r); });
      return out;
    }) }, /ascending order/));
    await poison('S4 a picture twice in the bank (item 2 re-keyed to item 1)', () => {}, (c) => renderFired(c, { face: 'syllabified', type: sylHtml((h) => { const items = [...h.matchAll(/data-lcs-bank-index="(\d+)" data-lcs-vocab="([^"]+)"/g)]; return h.replace(items[1][0], `data-lcs-bank-index="2" data-lcs-vocab="${items[0][2]}"`); }) }, /twice/));
    await poison('S5 the number box filled', () => {}, (c) => renderFired(c, { face: 'syllabified', type: sylHtml((h) => h.replace(/(<span data-lcs-number-box[^>]*>)<\/span>/, '$13</span>')) }, /not empty/));
    await poison('S6 no boundary printed (row 1 printed as the whole word)', () => {}, (c) => renderFired(c, { face: 'syllabified', type: sylHtml((h) => { const m = /(data-lcs-sr-row="1"[^>]*data-lcs-word="([^"]+)"[^]*?data-lcs-printed[^>]*>)([^<]+)</.exec(h); return h.replace(m[0], m[1] + m[2] + '<'); }) }, /one text node|printed .* !=/));
    await poison('S7 six bank pictures (the two distractors removed)', () => {}, (c) => renderFired(c, { face: 'syllabified', type: sylHtml((h) => {
      const used = new Set([...h.matchAll(/data-lcs-sr-row="\d+"[^>]*data-lcs-vocab="([^"]+)"/g)].map((m) => m[1]));
      return h.replace(/<span style="position:relative[^>]*data-lcs-bank-index="\d+" data-lcs-vocab="([^"]+)">[^]*?<\/span><\/span>/g, (m0, v) => (used.has(v) ? m0 : ''));
    }) }, /bank 6 != 8|unreferenced/));
    await poison('S8 an 11-letter word on the page (row 1 word stamp rewritten)', () => {}, (c) => renderFired(c, { face: 'syllabified', type: sylHtml((h) => h.replace(/(data-lcs-sr-row="1"[^>]*data-lcs-word=")[^"]+"/, '$1screwdriver"')) }, /letters > 10/));
    await poison('S9 a 7-word pool must throw, never fill', (c) => { c.multi = c.multi.slice(0, 7); }, (c) => buildThrows(FACES.syllabified, c, 2, null));

    restore(pristine);
    // control: the correct bank is clean on every instrument the poisons used
    const ctrl = [dataChecks(LOC, BANK[LOC]), complexDataChecks(LOC, BANK[LOC]), multiDataChecks(LOC, BANK[LOC])].flat();
    const ctrlRender = await renderFired(BANK[LOC], { tag: 'control-' });
    check(ctrl.length === 0 && !ctrlRender.fired, `control: correct bank fails (${ctrl[0] || ctrlRender.note})`, fails);
    for (const face of Object.keys(FACES)) {
      const r = await renderFired(BANK[LOC], { face, tag: 'control-' });
      check(!r.fired, `control: correct ${face} face fails (${r.note})`, fails);
    }

    console.log('poisons:');
    let silent = 0;
    for (const p of poisonResults) {
      if (VERBOSE || !p.fired) console.log(`  ${p.fired ? 'FIRED ' : 'SILENT'} ${p.name}${p.note ? '  — ' + p.note.slice(0, 110) : ''}`);
      if (!p.fired) silent++;
    }
    if (!VERBOSE) console.log(`  ${poisonResults.length - silent} fired, ${silent} silent (--verbose lists each)`);
    for (const f of ['control-', 'poison-']) for (const x of fs.readdirSync(OUT)) if (x.startsWith('G1-306-gate-' + f)) fs.unlinkSync(path.join(OUT, x));

    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('renders: ' + pngs.map((p) => path.relative(path.join(__dirname, '..'), p)).join(', '));
    const ok = fails.length === 0 && silent === 0;
    console.log(ok
      ? `ALL CHECKS PASS (${mainAssertions} assertions, ${renderCount} renders${QUICK ? ', --quick' : ' + seed sweeps'}, ${poisonResults.length}/${poisonResults.length} poisons killed)`
      : `FAIL (${fails.length} failures, ${silent} silent poisons)`);
    process.exit(ok ? 0 : 1);
  } finally {
    await browser.close();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
