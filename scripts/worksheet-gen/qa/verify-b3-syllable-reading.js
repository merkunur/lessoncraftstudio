#!/usr/bin/env node
/**
 * verify-b3-syllable-reading.js — the G1-306 `syllable-reading` gate
 * (design file §5, the base-face rules of gate-syllable-reading-data.js +
 * the browser half, in ONE script). Renders through the REAL pipeline
 * (render/render-instance.js: fonts load from file://; never a bare page).
 *
 *   node qa/verify-b3-syllable-reading.js [--quick] [--locale=en]
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
 *  10  node re-derivation: the bank's word list per rime EQUALS the set the
 *      approved file yields (count 1, TeX, pictured, consonant onset) — diff,
 *      never trust; the rendered data-lcs-unit equals the re-derived onset
 *  12  readOnly cells are NOT pictured; no BW-directory picture; excluded()
 *  13  pool >= poolMin per (unit, difficulty) or the build THROWS (refusal) —
 *      the feasibility matrix is printed; the exemplar must build at d1-d3
 * RENDER (puppeteer, exemplar × d1-3; --quick skips the sweeps):
 *   verify() empty · qa/lints.js clean · G1 floors MEASURED (picture, cell,
 *   lane >= 44 px; glyphH + cell font >= 26) · rule 11: widest cell advance
 *   <= cellW - 8 and lane writable >= 60 (getComputedTextLength in the real
 *   font) · row width <= 651 · no BW picture · the answer word appears in no
 *   text node outside the carpet
 * SWEEPS: 20 variants at d2 (all clean; the union of words = the pool; the row
 *   order never moves) + every feasible (unit, d) renders clean.
 * POISONS (each must FAIL; the correct bank is the control; a silent poison
 *   exits 1): unapproved word · TeX-less word · dropped cell with its word
 *   fanned · `car` under -ar · B multigraph chunk · da policy-managed word ·
 *   wrong onset stamp · the answer printed on a card · a 30 px `swan` forced
 *   into a 64 cell · a BW-dir picture · a 7-word unit (must throw) · a
 *   pictured readOnly cell.
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
const spec = require('../types/g1/G1-306-syllable-reading.js');
const bankMod = require('../data/b3/syllable-reading.js');
const BANK = bankMod[Object.keys(bankMod)[0]];

const QUICK = process.argv.includes('--quick');
const LOC = (process.argv.find((a) => a.startsWith('--locale=')) || '--locale=en').slice(9);
const OUT = path.join(__dirname, '..', 'out', 'dev');
const FLOOR = { element: 44, answer: 26 };   // primitives/_tokens.js density.G1
const CONSONANT_ONSET = /^[bcdfghjklmnpqrstvwxyz]+$/;

let assertions = 0;
function check(cond, msg, fails) { assertions++; if (!cond) fails.push(msg); }

function parseCell(cell) {
  const s = String(cell); const i = s.indexOf('|');
  return i < 0 ? { onset: null, rime: null, text: s } : { onset: s.slice(0, i), rime: s.slice(i + 1), text: s.slice(0, i) + s.slice(i + 1) };
}
function rowsOf(cfg) { return cfg.shape === 'rime' ? cfg.rimes : cfg.units; }

/* ------------------------------------------------------------------ DATA */
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

/** rule 13: every (unit, d) either builds or THROWS a refusal — never a filler. */
function feasibility(loc, cfg) {
  const rows = rowsOf(cfg) || [];
  const matrix = [];
  const fails = [];
  for (const row of rows) for (const d of [1, 2, 3]) {
    const rng = makeRng(instanceSeed({ typeId: spec.id, theme: null, difficulty: d, seedEpoch: 1, unit: row.id }));
    let res;
    try {
      const b = spec.build({ theme: null, difficulty: d, locale: loc, unit: row.id }, { rng });
      const cards = (b.bodyHtml.match(/data-lcs-word=/g) || []).length;
      check(cards === spec.difficulty[d].cards, `${loc} ${row.id} d${d}: ${cards} cards != ${spec.difficulty[d].cards}`, fails);
      check(b.meta.pool >= spec.difficulty[d].poolMin, `${loc} ${row.id} d${d}: built with pool ${b.meta.pool} < floor ${spec.difficulty[d].poolMin} (FILLED, not refused)`, fails);
      res = `ok pool=${b.meta.pool} cellW=${b.meta.cellW} font=${b.meta.fontPx} rows=${b.meta.rows.join('+')}`;
    } catch (e) {
      res = 'REFUSED: ' + String(e.message).replace(/^G1-306: /, '').slice(0, 90);
    }
    matrix.push({ unit: row.id, d, res });
  }
  for (const d of [1, 2, 3]) {
    const m = matrix.find((x) => x.unit === cfg.exemplar && x.d === d);
    check(m && m.res.startsWith('ok'), `${loc}: exemplar "${cfg.exemplar}" does not build at d${d} (${m && m.res})`, fails);
  }
  return { matrix, fails };
}

/* ---------------------------------------------------------------- RENDER */
async function measure(page) {
  return page.evaluate(({ FLOOR }) => {
    const f = [];
    const root = document.querySelector('[data-lcs-sr]');
    const carpet = root.querySelector('[data-lcs-carpet]');
    // floors
    root.querySelectorAll('.ws-card-stage img').forEach((img, i) => {
      const r = img.getBoundingClientRect();
      if (r.width < FLOOR.element || r.height < FLOOR.element) f.push(`picture ${i + 1} ${Math.round(r.width)}x${Math.round(r.height)} < ${FLOOR.element}`);
    });
    carpet.querySelectorAll('g[data-lcs-cell] rect').forEach((rc) => {
      const r = rc.getBoundingClientRect();
      if (r.width < FLOOR.element || r.height < FLOOR.element) f.push(`cell ${Math.round(r.width)}x${Math.round(r.height)} < ${FLOOR.element}`);
    });
    root.querySelectorAll('[data-lcs-syllable-lane]').forEach((l, i) => {
      const r = l.getBoundingClientRect();
      if (r.height < FLOOR.element) f.push(`lane ${i + 1} height ${Math.round(r.height)} < ${FLOOR.element}`);
      if (+l.dataset.lcsGlyphH < FLOOR.answer) f.push(`lane ${i + 1} glyphH ${l.dataset.lcsGlyphH} < ${FLOOR.answer}`);
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
    // lane: the printed rime leaves >= 60 px to write on (measured)
    root.querySelectorAll('[data-lcs-syllable-lane]').forEach((l, i) => {
      const w = l.getBoundingClientRect().width;
      const t = l.querySelector('text[data-lcs-lane-printed]');
      const textW = t ? t.getComputedTextLength() : 0;
      if (w - textW - 12 < 60) f.push(`lane ${i + 1} writable ${(w - textW - 12).toFixed(1)} < 60`);
      if (t && t.getComputedTextLength() === 0) f.push(`lane ${i + 1} printed text measures 0`);
    });
    // no BW picture; excluded handled at data time
    root.querySelectorAll('img').forEach((img) => {
      const src = decodeURIComponent(img.getAttribute('src') || '');
      if (/\bbw[\/\\]/i.test(src)) f.push('BW-directory picture: ' + src.slice(-40));
    });
    // rule 10 (browser): the answer word appears in no text node outside the carpet cells
    const words = [...root.querySelectorAll('[data-lcs-word]')].map((c) => c.dataset.lcsWord.toLowerCase());
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const txt = node.textContent.trim().toLowerCase();
      if (!txt) continue;
      if (node.parentElement.closest('[data-lcs-carpet]')) continue;
      if (words.includes(txt)) f.push(`answer "${txt}" printed outside the carpet`);
    }
    // stamps for the node diff
    const cards = [...root.querySelectorAll('[data-lcs-word]')].map((c) => ({ word: c.dataset.lcsWord, unit: c.dataset.lcsUnit, rime: c.dataset.lcsRime || null, key: c.dataset.lcsVocab, row: c.dataset.lcsRowId }));
    const rows = [...carpet.querySelectorAll('svg[data-lcs-row]')].map((s) => s.dataset.lcsRow);
    return { fails: f, cards, rows };
  }, { FLOOR });
}

async function renderOne(page, { d, unit, variant, type, tag }) {
  const baseName = `G1-306-gate-${tag || ''}d${d}-${LOC}` + (unit ? '-u' + unit : '') + (variant > 1 ? '-v' + variant : '');
  const out = await renderInstance({ type: type || spec, theme: null, difficulty: d, locale: LOC, unit: unit || null, variant, page, outDir: OUT, baseName });
  const m = await measure(page);
  return { out, m, baseName };
}

/** rule 10: the rendered stamps equal the bank's re-derived units. */
function stampDiff(cfg, m, fails, tag) {
  const rows = rowsOf(cfg);
  for (const c of m.cards) {
    const row = rows.find((r) => r.id === c.row);
    check(!!row, `${tag}: card row "${c.row}" is not a bank row`, fails);
    if (!row) continue;
    const w = (row.words || []).find((x) => x.key === c.key);
    check(!!w, `${tag}: card "${c.word}" (${c.key}) is not a word of row ${row.id}`, fails);
    if (!w) continue;
    const expectUnit = cfg.shape === 'rime' ? c.word.slice(0, -row.rime.length) : (cfg.shape === 'syllable' ? String(w.split[0]).toLocaleLowerCase(LOC) : w.word);
    check(c.unit === expectUnit, `${tag}: card "${c.word}" stamps unit "${c.unit}", re-derived "${expectUnit}"`, fails);
    if (cfg.shape === 'rime') check(c.rime === row.rime, `${tag}: card "${c.word}" rime "${c.rime}" != row ${row.rime}`, fails);
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

async function main() {
  const fails = [];
  const pristine = deepClone(BANK);
  const cfg = BANK[LOC];
  if (!cfg) { console.log(`FAIL: no ${LOC} block in data/b3/syllable-reading.js`); process.exit(1); }

  // ---- data
  const df = dataChecks(LOC, cfg);
  fails.push(...df);
  const { matrix, fails: ff } = feasibility(LOC, cfg);
  fails.push(...ff);
  console.log('feasibility (unit × difficulty):');
  for (const m of matrix) console.log(`  ${m.unit.padEnd(5)} d${m.d}  ${m.res}`);

  // ---- render
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    const exemplar = cfg.exemplar;
    const feasible = matrix.filter((m) => m.res.startsWith('ok'));
    const renderSet = QUICK ? [1, 2, 3].map((d) => ({ d, unit: exemplar })) : feasible.map((m) => ({ d: m.d, unit: m.unit }));
    for (const { d, unit } of renderSet) {
      const { out, m, baseName } = await renderOne(page, { d, unit, variant: 1 });
      m.unitId = unit;
      check(out.qa.lints.length === 0, `${baseName}: lints ${out.qa.lints.join(' | ')}`, fails);
      check(out.qa.verify.length === 0, `${baseName}: verify ${out.qa.verify.join(' | ')}`, fails);
      for (const x of m.fails) check(false, `${baseName}: ${x}`, fails);
      assertions += 1;
      stampDiff(cfg, m, fails, baseName);
      pngs.push(out.pngPath);
    }
    // sweep: 20 variants at d2 on the exemplar
    if (!QUICK) {
      const union = new Set();
      let rowSig = null;
      for (let v = 1; v <= 20; v++) {
        const { out, m, baseName } = await renderOne(page, { d: 2, unit: exemplar, variant: v, tag: 'sweep-' });
        m.unitId = exemplar;
        check(out.qa.lints.length === 0 && out.qa.verify.length === 0 && m.fails.length === 0, `${baseName}: ${[...out.qa.lints, ...out.qa.verify, ...m.fails].join(' | ')}`, fails);
        stampDiff(cfg, m, fails, baseName);
        m.cards.forEach((c) => union.add(c.word));
        const sig = m.rows.join('/');
        if (rowSig == null) rowSig = sig;
        check(sig === rowSig, `${baseName}: carpet row order moved (${sig})`, fails);
        // the seed sweep's files are the same coordinate — keep only the first
        if (v > 1) for (const ext of ['.html', '.pdf', '.png']) { try { fs.unlinkSync(path.join(OUT, baseName + ext)); } catch (e) { /* noop */ } }
      }
      const pool = feasible.find((m) => m.unit === exemplar && m.d === 2);
      const poolN = +(/pool=(\d+)/.exec(pool.res) || [])[1];
      check(union.size === poolN, `sweep: ${union.size} distinct words over 20 seeds != pool ${poolN} (some word never surfaces)`, fails);
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
    const dataFired = (c) => { const f = dataChecks(LOC, c); return { fired: f.length > 0, note: f[0] || '' }; };
    const renderFired = async (c, opts, want) => {
      const { out, m } = await renderOne(page, Object.assign({ d: 2, unit: c.exemplar, variant: 1, tag: 'poison-' }, opts || {}));
      const all = [...out.qa.verify, ...out.qa.lints, ...m.fails];
      const hit = want ? all.find((x) => want.test(x)) : all[0];
      return { fired: !!hit, note: hit || (all[0] ? 'only: ' + all[0] : '') };
    };
    const buildThrows = (c, d) => {
      const rng = makeRng(instanceSeed({ typeId: spec.id, theme: null, difficulty: d, seedEpoch: 1, unit: c.exemplar }));
      try { const b = spec.build({ theme: null, difficulty: d, locale: LOC, unit: c.exemplar }, { rng }); return { fired: false, note: 'built with pool ' + b.meta.pool }; }
      catch (e) { return { fired: /REFUSED|refuse/.test(e.message), note: e.message.slice(0, 80) }; }
    };

    await poison('unapproved word (sebra)', (c) => { rowOf(c, 'an').words.push({ key: 'zebra', word: 'sebra', unit: 's' }); rowOf(c, 'an').cells.push('s|ebra'); }, dataFired);
    await poison('TeX-less word (acorn)', (c) => { rowOf(c, 'an').words.push({ key: 'acorn', word: 'acorn', unit: 'ac' }); }, dataFired);
    await poison('dropped cell c|at, cat fanned — data', (c) => { const r = rowOf(c, 'at'); r.cells = r.cells.filter((x) => x !== 'c|at'); }, dataFired);
    await poison('dropped cell — render (the first card cell cut out of the carpet html)', () => {}, async (c) => {
      const cut = Object.assign({}, spec, { build(...a) { const r = spec.build.apply(spec, a); const w = /data-lcs-word="([^"]+)"/.exec(r.bodyHtml)[1]; const re = new RegExp('<g data-lcs-cell="' + w + '"[^]*?</g>'); /* [^] = any char; a `\s` inside a string degrades to `s` */ if (!re.test(r.bodyHtml)) throw new Error('poison needle matched nothing'); r.bodyHtml = r.bodyHtml.replace(re, ''); return r; } });
      return renderFired(c, { type: cut }, /matches 0 cells/);
    });
    await poison('car under -ar (r-controlled)', (c) => { c.rimes.push({ id: 'ar', label: '-ar', rime: 'ar', cells: ['c|ar', 'j|ar', 'st|ar'], readOnly: [], words: [{ key: 'car', word: 'car', unit: 'c' }, { key: 'jar', word: 'jar', unit: 'j' }, { key: 'star', word: 'star', unit: 'st' }] }); }, dataFired);
    await poison('B multigraph chunk (boek sch/oe)', (c) => { c.shape = 'soundout'; c.units = [{ id: 'oe', cells: ['boek'], words: [{ key: 'book', word: 'boek', unit: 'boek', chunks: ['b', 'oe', 'k'] }] }]; }, dataFired);
    await poison('da policy-managed word (hund)', (c) => { c.shape = 'soundout'; c.strictPool = 'policy_managed_absent'; c.units = [{ id: 'u', cells: ['hund'], words: [{ key: 'dog', word: 'hund', unit: 'hund', chunks: ['h', 'u', 'n', 'd'] }] }]; }, (c) => { const f = dataChecks('da', c); return { fired: f.some((x) => /policy-managed/.test(x)), note: f.find((x) => /policy-managed/.test(x)) || f[0] }; });
    await poison('wrong onset stamp (the first card data-lcs-unit rewritten)', () => {}, async (c) => {
      const bad = Object.assign({}, spec, { build(...a) { const r = spec.build.apply(spec, a); const m = /data-lcs-unit="([^"]+)"/.exec(r.bodyHtml); if (!m) throw new Error('poison needle matched nothing'); r.bodyHtml = r.bodyHtml.replace(m[0], 'data-lcs-unit="' + (m[1] === 'b' ? 'h' : 'b') + '"'); return r; } });
      return renderFired(c, { type: bad }, /onset .* != /);
    });
    await poison('answer printed on its card', () => {}, async (c) => {
      const leaky = Object.assign({}, spec, { build(...a) { const r = spec.build.apply(spec, a); const w = /data-lcs-word="([^"]+)"/.exec(r.bodyHtml)[1]; if (!r.bodyHtml.includes('</div></section>')) throw new Error('poison needle matched nothing'); r.bodyHtml = r.bodyHtml.replace('</div></section>', `<span>${w}</span></div></section>`); return r; } });
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
    await poison('7-word unit must throw, never fill (swan removed)', (c) => { const r = rowOf(c, 'an'); r.words = r.words.filter((w) => w.key !== 'swan'); r.cells = r.cells.filter((x) => x !== 'sw|an'); }, (c) => buildThrows(c, 2));
    await poison('pictureTheme pin names a dir without the word (pan → space)', (c) => { rowOf(c, 'an').words.find((w) => w.key === 'pan').pictureTheme = 'space'; }, dataFired);
    await poison('read-only cells over a third (four readOnly stamps forced on the render)', () => {}, async (c) => {
      const ro = Object.assign({}, spec, { build(...a) { const r = spec.build.apply(spec, a); let n = 0; r.bodyHtml = r.bodyHtml.replace(/<g data-lcs-cell="([^"]+)"/g, (m0) => (n++ < 4 ? m0 + ' data-lcs-readonly="1"' : m0)); if (n < 4) throw new Error('poison needle matched nothing'); return r; } });
      return renderFired(c, { type: ro }, /exceed a third/);
    });
    await poison('pictured readOnly cell (bat)', (c) => { const r = rowOf(c, 'at'); r.readOnly.push('bat'); }, dataFired);
    await poison('duplicate cell across rows (c|an in -at)', (c) => { rowOf(c, 'at').cells.push('c|an'); }, dataFired);

    restore(pristine);
    // control: the correct bank is clean on every instrument the poisons used
    const ctrlData = dataChecks(LOC, BANK[LOC]);
    const ctrlRender = await renderFired(BANK[LOC], { tag: 'control-' });
    check(ctrlData.length === 0 && !ctrlRender.fired, `control: correct bank fails (${ctrlData[0] || ctrlRender.note})`, fails);

    console.log('poisons:');
    let silent = 0;
    for (const p of poisonResults) {
      console.log(`  ${p.fired ? 'FIRED ' : 'SILENT'} ${p.name}${p.note ? '  — ' + p.note.slice(0, 100) : ''}`);
      if (!p.fired) silent++;
    }
    for (const f of ['control-', 'poison-']) for (const x of fs.readdirSync(OUT)) if (x.startsWith('G1-306-gate-' + f)) fs.unlinkSync(path.join(OUT, x));

    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('renders: ' + pngs.map((p) => path.relative(path.join(__dirname, '..'), p)).join(', '));
    const ok = fails.length === 0 && silent === 0;
    console.log(ok
      ? `ALL CHECKS PASS (${mainAssertions} assertions, ${renderSet.length} renders${QUICK ? ', --quick' : ' + 20-seed sweep'}, ${poisonResults.length}/${poisonResults.length} poisons killed)`
      : `FAIL (${fails.length} failures, ${silent} silent poisons)`);
    process.exit(ok ? 0 : 1);
  } finally {
    await browser.close();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
