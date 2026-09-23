#!/usr/bin/env node
/**
 * verify-b5-maps.js — the G1-379 `maps` family gate (design
 * docs/worksheet-gen/b5-designs/G1-379-maps.md §5; the nt10-E build brief deliverable 4).
 * BASE build (2026-09-23): sections 0-5 below; the face renders and the face poisons (PR5-PR8,
 * PR13-PR16) join in Phase 2 with the faces — their PRIMITIVES are already gated in section 0.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-maps.js [--quick]
 *
 * 0. PRIMITIVES — each gate must PASS (run as its own process, sheets off): verify-map-symbols
 *    (PR3 PR4), verify-island-map (PR2), verify-compass-rose (PR7 PR8), verify-top-side-view
 *    (PR6), verify-world-map (PR9 PR10 PR11 PR12 PR20); build-island-slots --check;
 *    build-world-map --check.
 * 1. NEUTRAL — MAPS: the symbol ids === primitives/map-symbol.js, the near-miss pair, the
 *    clockwise DIRS, the REGIONS / OCEAN_IDS / LEADER_MEMBERS, the REFUSED library pictures.
 * 2. BANK — validateBank(block, loc) (exported; tools/validate-b5-draft.js calls it for every
 *    panel draft): §5 rules 1-12 (rule 8's render half is measured in section 3).
 * 3. RENDER through the REAL pipeline (render/render-instance.js, file:// fonts): d1/d2/d3 en; d2
 *    under the 722 chrome (3-line title + 3-line instruction) and the 677 chrome (4-line fi
 *    title); asserts verify() empty, qa/lints.js clean and the floors ITSELF (no size lint
 *    exists): symbols 44 px on the map AND in the key, boxes 64 x 48, words 17 px on <= 2 lines;
 *    SPARSE — the blank band between consecutive blocks (body top -> sheet, sheet -> cards)
 *    <= 40 px at 814 / 722 / 677 (the slack falls BELOW the cards); rule 8 measured: every
 *    symbol word <= 2 lines in 103 px (card) and 134 px (key), no single token wider than the
 *    box, keyTitle <= 260 px at Baloo 2 700 16.
 * 4. SWEEP + TELLS — 20 seeds x d2 render distinct verify-clean pages (--quick 5); a node sweep of
 *    400 seeds per level measures the answer-position tells PER PAGE (the seed carries no locale,
 *    so a tell ships to all 11): the card order is never the key order and never count-sorted, no
 *    two adjacent equal answers; the largest answer's card position and the per-position mean
 *    answer are near-uniform; the key-rank / card-rank correlation is near 0; the unasked key
 *    entry is never last; capacity >= placed + 4; the draw is locale-neutral; an unauthored
 *    locale REFUSES.
 * 5. POISON — each must FAIL for its OWN reason (no fail = SILENT, another fail = WRONG REASON;
 *    either exits 1); the correct EN bank is the control. §5 P1-P13 + the base render poisons
 *    PR1 PR2 PR17 PR18 PR19 + PS (a sparse band) + PT (the card order = the key order).
 * 6. FACES (Phase E, 2026-09-23) — qa/b5-maps-faces.js: K-377 top-view · G2-369 compass-rose ·
 *    G2-370 continents · G3-396 continents-oceans · G2-371 directions-on-map. Strings = bank, node
 *    sweeps + per-page tells, renders at the own / 814 / 722 / 677 chromes (FILL at 814), 20-seed
 *    render sweeps, and the face poisons PR5 PR7 PR8 PR11-PR16 + SPARSE / FILL / answer-tell /
 *    apparatus per face + P11b (PR6 is killed by verify-top-side-view in section 0).
 */
'use strict';
/** the probe for 'an unauthored locale refuses': the first locale no panel has applied yet (sv was the probe until its panel landed) */
const UNAUTH = ['fi', 'no', 'da', 'sv', 'nl', 'it', 'fr', 'es', 'pt', 'de'].find((l) => !Object.keys(require('../lib/b5-common.js').bankModule('maps')).includes(l)) || 'xx';
const path = require('path');
const { spawnSync } = require('child_process');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng } = require('../lib/rng.js');
const freeClaim = require('../../lib/free-claim.js');
const MS = require('../primitives/map-symbol.js');
const IM = require('../primitives/island-map.js');
const bankMod = require('../data/b5/maps.js');
const TAX = require('../../../frontend/config/topics-taxonomy.json');
const TYPE = require('../types/g1/G1-379-map-skills.js');

const OUT = path.join(__dirname, '..', 'out', 'dev', 'G1-379-gate');
const LAYOUTS = ['top-view', 'compass-rose', 'continents', 'continents-oceans', 'directions-on-map'];
const BAND = { base: 'G1', 'top-view': 'K', 'compass-rose': 'G2', continents: 'G2', 'continents-oceans': 'G3', 'directions-on-map': 'G2' };
const WORKSHEET_WORD = /worksheet|arbeitsblatt|werkblad|arbetsblad|arbejdsark|arbeidsark|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med fasit|vastauksineen/i;
/** rule 9: the en per-face apparatus bans / musts (the panels add `instructionBans` per locale) */
const INSTR_BANS_EN = {
  base: [/circle/i, /(?<!\p{L})lines?(?!\p{L})/iu], 'top-view': [/write/i, /(?<!\p{L})words?(?!\p{L})/iu],
  // F3 "never number" means the ANSWER is never a number; the design's own "each NUMBERED continent" names the map's markers
  // (a word-bounded ban: `/number/i` condemned the design's correct source — poisoned both ways below)
  continents: [/(?<!\p{L})numbers?(?!\p{L})/iu],
  'directions-on-map': [/(?<!\p{L})steps?(?!\p{L})/iu, /square/i, /(?<!\p{L})left(?!\p{L})/iu, /(?<!\p{L})right(?!\p{L})/iu],
  'compass-rose': [], 'continents-oceans': [],
};
/** Phase E (faces): an instruction names ONLY apparatus its own page prints (nt10-E addition 4) —
 *  F1 has no map and nothing to write; F2 has no map, no line, nothing to circle; F3 nothing to
 *  circle; F4 no line, nothing to circle; F5 no line and nothing to write (the child circles a chip). */
for (const [k, extra] of Object.entries({
  'top-view': [/(?<!\p{L})maps?(?!\p{L})/iu],
  'compass-rose': [/(?<!\p{L})maps?(?!\p{L})/iu, /circle/i, /(?<!\p{L})lines?(?!\p{L})/iu],
  continents: [/circle/i],
  'continents-oceans': [/circle/i, /(?<!\p{L})lines?(?!\p{L})/iu],
  'directions-on-map': [/write/i, /(?<!\p{L})lines?(?!\p{L})/iu],
})) INSTR_BANS_EN[k] = [...INSTR_BANS_EN[k], ...extra];
const INSTR_MUST_EN = { 'compass-rose': [/compass rose/i], 'continents-oceans': [/number/i] };
// + en `compass` (Phase E): the English title may not say "compass" at all — treasure-hunt owns that query
const COMPASS_WORD = /(?<!\p{L})(compass|kompass|boussole|bússola|bussola|kompas)(?!\p{L})/iu;
const SPARSE_MAX = 40;
const graphemes = (s) => [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(s)].length;
const firstGrapheme = (s) => { const it = new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(s)[Symbol.iterator]().next(); return it.done ? '' : it.value.segment; };
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/* ---------------------------------------------------------------- 1. neutral */
function validateNeutral(N) {
  const f = [];
  if (N.SYMBOLS.join() !== MS.SYMBOL_IDS.join()) f.push(`SYMBOLS [${N.SYMBOLS}] ≠ primitives/map-symbol.js [${MS.SYMBOL_IDS}]`);
  if (JSON.stringify(N.NEAR_MISS) !== JSON.stringify([['tree', 'bush']])) f.push('NEAR_MISS ≠ [[tree, bush]]');
  if (N.DIRS.join() !== 'n,e,s,w') f.push('DIRS ≠ n e s w (clockwise)');
  if (N.REGIONS.join() !== 'northAmerica,southAmerica,europe,asia,africa,oceania,antarctica') f.push('REGIONS ≠ the seven');
  if (N.OCEAN_IDS.join() !== 'pacific,atlantic,indian,arctic,southern') f.push('OCEAN_IDS ≠ the five');
  for (const p of ['camping/compass', 'camping/map', 'classroom/map']) if (!N.REFUSED_PICS.includes(p)) f.push(`REFUSED_PICS lacks ${p}`);
  for (const k of N.KEY_POOL) if (!N.SYMBOLS.includes(k) || k === 'tree' || k === 'bush') f.push(`KEY_POOL ${k} invalid`);
  if (N.LAYOUTS.join() !== LAYOUTS.join()) f.push('LAYOUTS ≠ the five faces');
  return f;
}

/* ---------------------------------------------------------------- 2. bank */
function validateBank(b, loc) {
  const f = [];
  const push = (m) => f.push(`${loc}: ${m}`);
  if (!b || typeof b !== 'object') return [`${loc}: no block`];
  const N = bankMod.MAPS;
  const lit = (obj, k, what) => {
    const v = obj && obj[k];
    if (typeof v !== 'string' || !v.trim()) { push(`${what}.${k} missing (rule 1)`); return null; }
    if (v !== v.trim()) push(`${what}.${k} "${v}" not trimmed (rule 1)`);
    if (v !== v.normalize('NFC')) push(`${what}.${k} "${v}" not NFC (rule 1)`);
    if (/[{}]/.test(v)) push(`${what}.${k} "${v}" carries a slot (rule 1)`);
    return v;
  };
  lit(b, 'keyTitle', 'bank');
  const SW = {}, DW = {}, DL = {};
  for (const k of N.SYMBOLS) SW[k] = lit(b.symbolWords, k, 'symbolWords');
  for (const d of N.DIRS) { DW[d] = lit(b.dirWords, d, 'dirWords'); DL[d] = lit(b.dirLetters, d, 'dirLetters'); }
  // rule 2: the letter is the word's first grapheme, upper-cased in the locale
  for (const d of N.DIRS) if (DW[d] && DL[d] && DL[d] !== firstGrapheme(DW[d]).toLocaleUpperCase(loc)) push(`dirLetters.${d} "${DL[d]}" ≠ the initial of dirWords.${d} "${DW[d]}" (rule 2)`);
  // rule 3
  const letters = N.DIRS.map((d) => DL[d]).filter(Boolean), words = N.DIRS.map((d) => DW[d] && low(DW[d], loc)).filter(Boolean);
  if (new Set(letters).size !== letters.length) push(`the direction letters [${letters}] are not pairwise distinct (rule 3)`);
  if (new Set(words).size !== words.length) push('the direction words are not pairwise distinct (rule 3)');
  // rule 4
  const set = Array.isArray(b.continentSet) ? b.continentSet : [];
  const seen = {};
  for (const m of set) for (const r of m.regions || []) { if (!N.REGIONS.includes(r)) push(`continentSet ${m.id}: unknown region ${r} (rule 4)`); seen[r] = (seen[r] || 0) + 1; }
  for (const r of N.REGIONS) {
    if ((seen[r] || 0) > 1) push(`region ${r} is in ${seen[r]} members (rule 4)`);
    if (!seen[r] && r !== 'antarctica') push(`region ${r} is in no member (rule 4)`);
  }
  // rule 5
  const names = set.map((m) => lit(b.continentNames, m.id, 'continentNames')).filter(Boolean);
  if (set.length < 5 || set.length > 7) push(`continentSet has ${set.length} members (5..7, rule 5)`);
  if (Object.keys(b.continentNames || {}).length !== set.length) push(`continentNames has ${Object.keys(b.continentNames || {}).length} names ≠ ${set.length} members (rule 5)`);
  if (new Set(names.map((n) => low(n, loc))).size !== names.length) push('continent names not pairwise distinct (rule 5)');
  for (const n of names) if (graphemes(n) > 18) push(`continent name "${n}" is ${graphemes(n)} graphemes (> 18, rule 5)`);
  // rule 6
  const oceans = Array.isArray(b.oceanSet) ? b.oceanSet : [];
  for (const o of oceans) if (!N.OCEAN_IDS.includes(o)) push(`oceanSet: unknown ocean ${o} (rule 6)`);
  if (oceans.length < 3 || oceans.length > 5) push(`oceanSet has ${oceans.length} oceans (3..5, rule 6)`);
  if (!oceans.includes('pacific')) push('oceanSet lacks the Pacific (rule 6)');
  if (oceans.includes('southern') && !seen.antarctica) push('the Southern Ocean without Antarctica (rule 6)');
  const onames = oceans.map((o) => lit(b.oceanNames, o, 'oceanNames')).filter(Boolean);
  // rule 7
  for (const o of onames) if (names.some((n) => low(n, loc) === low(o, loc))) push(`ocean name "${o}" equals a continent name (rule 7)`);
  // rule 8 (node half)
  const sw = N.SYMBOLS.map((k) => SW[k] && low(SW[k], loc));
  for (let i = 0; i < sw.length; i++) for (let j = i + 1; j < sw.length; j++) if (sw[i] && sw[i] === sw[j]) push(`symbolWords.${N.SYMBOLS[i]} === symbolWords.${N.SYMBOLS[j]} "${SW[N.SYMBOLS[i]]}" (rule 8)`);
  for (const k of N.SYMBOLS) if (SW[k] && /\d/.test(SW[k])) push(`symbolWords.${k} carries a digit (rule 8)`);
  // rules 9, 10, 12
  const S = b.strings || {};
  const want = ['base', ...LAYOUTS];
  if (Object.keys(S).sort().join() !== want.slice().sort().join()) push(`strings ids [${Object.keys(S).join()}] ≠ [${want.join()}] (rule 12)`);
  const modeNames = ['compass', 'cardinal-arrows'].map((m) => TAX.axes['exercise-mode'][m] && TAX.axes['exercise-mode'][m].name[loc]).filter(Boolean).map((x) => low(x, loc));
  const byBand = {};
  for (const id of want) {
    const s = S[id]; if (!s) { push(`strings.${id} missing (rule 12)`); continue; }
    const t = s.title || '', ins = s.instruction || '';
    if (!t || t.length > 70) push(`strings.${id} title length ${t.length} (1..70, rule 10)`);
    if (WORKSHEET_WORD.test(t)) push(`strings.${id} title carries a worksheet word (rule 10)`);
    if (modeNames.includes(low(t, loc))) push(`strings.${id} title "${t}" equals a treasure-hunt mode name (rule 10)`);
    if (COMPASS_WORD.test(t)) push(`strings.${id} title "${t}" uses the standalone word "${t.match(COMPASS_WORD)[0]}" (treasure-hunt's, rule 10)`);
    if (loc === 'fr' && /dans l['’]espace/i.test(t)) push(`strings.${id} title says "dans l'espace" (position-words, rule 10)`);
    if (loc === 'sv' && /vädersymbol/i.test(t)) push(`strings.${id} title contains "Vädersymbol" (K-356, rule 10)`);
    if (!ins || ins.length > 150) push(`strings.${id} instruction length ${ins.length} (1..150, rule 9)`);
    for (const x of [t, ins]) { const h = freeClaim.hit(x); if (h) push(`strings.${id} claims free ("${h}", rule 9)`); if (ANSWERS_WORD.test(x)) push(`strings.${id} promises answers (rule 9)`); }
    const wre = (w) => new RegExp(`(?<!\\p{L})${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'iu');
    const bans = loc === 'en' ? INSTR_BANS_EN[id] : ((b.instructionBans && b.instructionBans[id]) || []).map(wre);
    for (const re of bans || []) if (re.test(ins)) push(`strings.${id} instruction names "${ins.match(re)[0]}" — not apparatus of this face (rule 9)`);
    if (loc === 'en') for (const re of INSTR_MUST_EN[id] || []) if (!re.test(ins)) push(`strings.${id} instruction lacks ${re} (rule 9)`);
    (byBand[BAND[id]] = byBand[BAND[id]] || []).push([id, low(t, loc)]);
  }
  for (const list of Object.values(byBand)) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) if (list[i][1] === list[j][1]) push(`strings.${list[i][0]} and ${list[j][0]} share a title in one band (rule 10)`);
  const toks = want.filter((id) => S[id]).map((id) => [id, new Set(low(S[id].title, loc).split(/[^\p{L}]+/u).filter(Boolean))]);
  for (let i = 0; i < toks.length; i++) for (let j = i + 1; j < toks.length; j++) { const a = toks[i][1], c = toks[j][1]; if ([...a].every((x) => c.has(x)) && [...c].every((x) => a.has(x))) push(`strings.${toks[i][0]} / ${toks[j][0]} titles share every token (rule 12)`); }
  // rule 11
  if (typeof b.setSource !== 'string' || !b.setSource.trim()) push('setSource is empty — the continent / ocean count must be cited (rule 11)');
  return f;
}

/* ---------------------------------------------------------------- 3. render */
async function renderWith(page, type, { difficulty = 2, baseName, strings, seedEpoch, locale = 'en' }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const R = (el) => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="maps"]');
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot');
    if (!root) return null;
    const sheet = root.querySelector('[data-lcs-map-sheet]'), strip = root.querySelector('[data-lcs-count-strip]');
    const field = root.querySelector('.mp-field svg');
    const ctm = field.getScreenCTM();
    const symW = [...field.querySelectorAll('svg[data-lcs-sym]')].map((s) => ctm.a * +s.getAttribute('width'));
    const keySymW = [...root.querySelectorAll('[data-lcs-legend] svg[data-lcs-symbol]')].map((s) => s.getBoundingClientRect().width);
    const boxes = [...root.querySelectorAll('[data-lcs-count-box]')].map((b) => R(b));
    const words = [...root.querySelectorAll('[data-lcs-row-word], [data-lcs-key-word]')].map((w) => parseFloat(getComputedStyle(w).fontSize));
    // base FILL: the bottom of the INK (the sheet, the cards, their boxes), never of an elastic container
    const ink = Math.max(R(sheet).bottom, ...[...root.querySelectorAll('.mp-card, [data-lcs-count-box]')].map((e) => e.getBoundingClientRect().bottom));
    return {
      body: body ? R(body) : null, foot: foot ? R(foot).top : 0, sheet: R(sheet), strip: R(strip), root: R(root), ink,
      bands: [R(sheet).top - R(body).top, R(strip).top - R(sheet).bottom],
      symW, keySymW, boxes, words, stamps: root.dataset.lcsKey + '|' + [...root.querySelectorAll('[data-lcs-row]')].map((c) => c.dataset.lcsRow).join() + '|' + [...field.querySelectorAll('svg[data-lcs-sym]')].map((s) => s.dataset.lcsX + ',' + s.dataset.lcsY).join(';'),
    };
  });
  return { out, m, verify: out.qa.verify, lints: out.qa.lints };
}
const BASE_FILL_MIN = 0.85;   // _FACE-BRIEF.md FILL (base review 2026-09-23): >= 85 % of the body at the en chrome, inside at 677
function assertRender(name, r, { symPx = 44, body, fill } = {}) {
  ok(!r.verify.length, `${name}: verify ${JSON.stringify(r.verify.slice(0, 4))}`);
  ok(!r.lints.length, `${name}: lints ${JSON.stringify(r.lints.slice(0, 4))}`);
  const m = r.m;
  if (!ok(!!m, `${name}: no maps root`)) return;
  ok(m.symW.length > 0 && m.symW.every((w) => Math.abs(w - symPx) < 0.6), `${name}: a map symbol ≠ ${symPx} px`);
  ok(m.keySymW.every((w) => Math.abs(w - symPx) < 0.6), `${name}: a key symbol ≠ ${symPx} px (the key must show the map's size)`);
  // the numeral boxes GROW with the strip (FILL): never under 64 x 48, never taller than 4:3 of their width
  ok(m.boxes.length > 0 && m.boxes.every((b) => b.w >= 64 - 0.6 && b.h >= 48 - 0.6 && b.h <= b.w * 0.75 + 0.6), `${name}: a numeral box under 64 x 48 or not 4:3 [${m.boxes.map((b) => b.w.toFixed(0) + "x" + b.h.toFixed(0))}]`);
  const share = (m.ink - m.body.top) / m.body.h;
  if (fill === 'one') ok(share >= BASE_FILL_MIN, `${name}: FILL — the content ends at ${(share * 100).toFixed(1)} % of the body (< ${BASE_FILL_MIN * 100} %): grow the cards, not the whitespace`);
  ok(m.ink <= m.body.bottom + 0.6, `${name}: FILL overflow — the content ends ${(m.ink - m.body.bottom).toFixed(0)} px past the body`);
  ok(m.words.every((px) => px >= 17), `${name}: a word under 17 px`);
  ok(m.bands.every((b) => b >= 0 && b <= SPARSE_MAX), `${name}: SPARSE — blank bands [${m.bands.map((b) => b.toFixed(0))}] px between blocks (> ${SPARSE_MAX}; the slack must fall below the cards)`);
  ok(m.strip.bottom <= m.foot + 0.6, `${name}: the cards reach the footer`);
  if (body) ok(m.body.h <= body + 0.6, `${name}: body ${m.body.h.toFixed(0)} px — the fixture did not squeeze it to <= ${body}`);
}
const LONG = {
  de: { title: 'Karten lesen: Kartenzeichen, Legende und Himmelsrichtungen auf der Insel', instruction: 'Schau dir die Legende an. Finde jedes Ding auf der Karte der Insel, zähle, wie viele es sind, und schreibe die Zahl in das Kästchen darunter.', body: 722 },
  fi: { title: 'Karttamerkit ja kartan selitykset: saaren kartan merkit, tiet, joet, sillat, polut ja lammet tarkasti luettuina ja laskettuina', instruction: 'Katso kartan selitystä. Etsi jokainen asia saaren kartalta, laske ne ja kirjoita lukumäärä sen alla olevaan laatikkoon huolellisesti.', body: 677 },
};
function withBlock(block, extra = {}) {
  return { ...TYPE, build({ difficulty }, ctx) { return this._buildWith(block, { ...this.difficulty[difficulty], ...extra }, { locale: 'en' }, ctx); } };
}
function withExtra(extra) { return withBlock(bankMod.MAPS_LOC.en, extra); }
/** rule 8's render half: each symbol word <= 2 lines in 103 (card) and 134 (key) at Nunito 800 17, no token wider than the box; keyTitle <= 260 at Baloo 16 */
async function measureWords(page, block) {
  const html = Object.entries(block.symbolWords).map(([k, w]) => [103, 134].map((W) => `<span data-k="${k}" data-w="${W}" style="display:block;width:${W}px;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;line-height:1.2;overflow-wrap:normal;word-break:normal;hyphens:manual">${w}</span>`).join('')).join('') +
    `<span id="kt" style="font-family:'Baloo 2',cursive;font-weight:700;font-size:16px;white-space:nowrap">${block.keyTitle}</span>`;
  const H = require('./b5-maps-harness.js');
  await H.openDoc(page, 'words-measure', html);
  return page.evaluate(() => {
    const f = [];
    for (const s of document.querySelectorAll('[data-k]')) {
      const W = +s.dataset.w, rg = document.createRange(); rg.selectNodeContents(s);
      const rects = [...rg.getClientRects()], lines = new Set(rects.map((q) => Math.round(q.top))).size;
      if (lines > 2) f.push(`symbolWords.${s.dataset.k} "${s.textContent}" runs to ${lines} lines at ${W} px (rule 8)`);
      if (rects.some((q) => q.width > W + 0.5)) f.push(`symbolWords.${s.dataset.k} "${s.textContent}" has a token wider than ${W} px (rule 8)`);
    }
    const kt = document.getElementById('kt').getBoundingClientRect().width;
    if (kt > 260) f.push(`keyTitle is ${kt.toFixed(0)} px wide (> 260, rule 8)`);
    return f;
  });
}

function runGate(file, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, file), ...args], { encoding: 'utf8', timeout: 600000 });
  const last = (r.stdout || '').trim().split('\n').pop();
  return { pass: r.status === 0, last, out: r.stdout + r.stderr };
}

async function main() {
  const quick = process.argv.includes('--quick');
  freeClaim.selfTest();
  // 0. primitives
  for (const [file, args] of [['verify-map-symbols.js', ['--no-sheet']], ['verify-island-map.js', ['--no-sheet']], ['verify-compass-rose.js', ['--no-sheet']], ['verify-top-side-view.js', ['--no-sheet']], ['verify-world-map.js', ['--no-sheet']], ['../tools/build-island-slots.js', ['--check']], ['../tools/build-world-map.js', ['--check']]]) {
    const r = runGate(file, args);
    ok(r.pass, `${file} FAILED: ${r.out.split('\n').slice(-8).join(' | ')}`);
    console.log(`${file}: ${r.last}`);
  }
  // 1-2. data
  const nf = validateNeutral(bankMod.MAPS); nf.forEach((x) => ok(false, 'neutral: ' + x)); ok(true, 'neutral');
  const banks = bankMod.MAPS_LOC;
  for (const loc of Object.keys(banks)) { const bf = validateBank(banks[loc], loc); bf.forEach((x) => ok(false, x)); console.log(`bank ${loc}: ${bf.length} findings`); }
  ok(banks.en.strings.base.title === TYPE.i18n.en.title && banks.en.strings.base.instruction === TYPE.i18n.en.instruction, 'the bank\'s base strings ≠ the spec\'s i18n.en');
  { let m = null; try { TYPE.build({ difficulty: 2, locale: UNAUTH }, { rng: makeRng('seed-1') }); } catch (e) { m = e.message; } ok(m && new RegExp('no ' + UNAUTH + ' block|refuse').test(m), `an unauthored ${UNAUTH} REFUSES (got ${m})`); }
  // 4 (node). tells per PAGE, 400 seeds per level
  for (const d of [1, 2, 3]) {
    const cfg = TYPE.difficulty[d];
    const n = cfg.asked, maxAt = new Array(n).fill(0), sumAt = new Array(n).fill(0), unaskedLast = { n: 0 };
    let keyOrderTells = 0, sorted = 0, adj = 0, cap = 0, rho = 0, total = 0, neutral = 0, sumAll = 0, lastKeyPos = new Array(cfg.keySize).fill(0);
    const synth = { ...banks.en, symbolWords: { house: 'Haus', tree: 'Baum', bush: 'Strauch', pond: 'Teich', bench: 'Bank', tent: 'Zelt', flowerBed: 'Blumenbeet', bridge: 'Brücke' }, dirLetters: { n: 'N', e: 'O', s: 'S', w: 'W' } };
    for (let s = 1; s <= 400; s++) {
      const r = TYPE._buildWith(banks.en, cfg, { locale: 'en' }, { rng: makeRng('G1-379-sweep-' + d + '-' + s) }).meta;
      const r2 = TYPE._buildWith(synth, cfg, { locale: 'de' }, { rng: makeRng('G1-379-sweep-' + d + '-' + s) }).meta;
      if (JSON.stringify([r.keyOrder, r.cards, r.counts, r.symbols]) !== JSON.stringify([r2.keyOrder, r2.cards, r2.counts, r2.symbols])) neutral++;
      const vals = r.cards.map((k) => r.counts[k]);
      const keyAsked = r.keyOrder.filter((k) => r.asked.includes(k));
      if (r.cards.join() === keyAsked.join()) keyOrderTells++;
      if (vals.every((v, i) => !i || v >= vals[i - 1]) || vals.every((v, i) => !i || v <= vals[i - 1])) sorted++;
      if (vals.some((v, i) => i && v === vals[i - 1])) adj++;
      if (r.capacity < r.symbols.length + 4) cap++;
      if (r.unasked.includes(r.keyOrder[r.keyOrder.length - 1])) unaskedLast.n++;
      const mx = Math.max(...vals); maxAt[vals.indexOf(mx)]++;
      vals.forEach((v, i) => { sumAt[i] += v; sumAll += v; });
      const kr = r.cards.map((k) => keyAsked.indexOf(k)), mean = (n - 1) / 2;
      let num = 0, den = 0; kr.forEach((k, i) => { num += (k - mean) * (i - mean); den += (i - mean) ** 2; }); rho += num / den;
      lastKeyPos[r.keyOrder.indexOf('tree')]++;
      total++;
    }
    const meanAll = sumAll / (total * n);
    ok(!neutral, `d${d}: ${neutral} draws are not locale-neutral`);
    ok(!keyOrderTells && !sorted && !adj, `d${d}: tells — card order = key order ${keyOrderTells}, count-sorted ${sorted}, adjacent equal ${adj}`);
    ok(!cap, `d${d}: ${cap} pages place more than capacity − 4`);
    ok(!unaskedLast.n, `d${d}: ${unaskedLast.n} pages put the unasked key entry last`);
    ok(maxAt.every((c) => c / total <= 0.4 && c / total >= 0.08), `d${d}: the largest answer's card position is not near-uniform [${maxAt.map((c) => (c / total * 100).toFixed(0) + '%')}]`);
    ok(sumAt.every((sm) => Math.abs(sm / total - meanAll) <= 0.6), `d${d}: a card position's mean answer drifts [${sumAt.map((sm) => (sm / total).toFixed(2))}] vs ${meanAll.toFixed(2)}`);
    ok(Math.abs(rho / total) <= 0.3, `d${d}: key-rank / card-rank correlation ${(rho / total).toFixed(2)} (|r| > 0.3)`);
    console.log(`tells d${d} (400 pages): max-answer position ${maxAt.map((c) => (c / total * 100).toFixed(0) + '%').join('/')} · mean answer by position ${sumAt.map((sm) => (sm / total).toFixed(2)).join('/')} (all ${meanAll.toFixed(2)}) · key↔card r ${(rho / total).toFixed(3)} · tree key cell ${lastKeyPos.map((c) => (c / total * 100).toFixed(0) + '%').join('/')} · key-order ${keyOrderTells} sorted ${sorted} adjacent ${adj} capacity ${cap} non-neutral ${neutral}`);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  try {
    // 3. renders
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-379-gate-d${d}-en` });
      assertRender(`d${d}`, r, { symPx: TYPE.difficulty[d].symPx, fill: 'one' });
      console.log(`render d${d}: fill ${(100 * (r.m.ink - r.m.body.top) / r.m.body.h).toFixed(1)} % boxes ${r.m.boxes[0].w.toFixed(0)}x${r.m.boxes[0].h.toFixed(0)} verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)} sheet ${r.m.sheet.h.toFixed(0)} strip ${r.m.strip.h.toFixed(0)} bands ${r.m.bands.map((b) => b.toFixed(0))} slack below ${(r.m.foot - r.m.strip.bottom).toFixed(0)}`);
    }
    for (const k of Object.keys(LONG)) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-379-gate-d2-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d2 long chrome ${k}`, r, { body: LONG[k].body });
      console.log(`render d2 long chrome ${k}: fill ${(100 * (r.m.ink - r.m.body.top) / r.m.body.h).toFixed(1)} % boxes ${r.m.boxes[0].w.toFixed(0)}x${r.m.boxes[0].h.toFixed(0)} verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)} bands ${r.m.bands.map((b) => b.toFixed(0))} stack ${(r.m.strip.bottom - r.m.sheet.top).toFixed(0)} slack below ${(r.m.foot - r.m.strip.bottom).toFixed(0)}`);
    }
    const wf = await measureWords(page, banks.en); wf.forEach((x) => ok(false, 'en ' + x)); ok(true, 'words measured');
    // 4. sweep
    const pages = new Set();
    for (let s = 1; s <= (quick ? 5 : 20); s++) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-379-gate-sweep-${s}`, seedEpoch: s });
      ok(!r.verify.length && !r.lints.length, `sweep ${s}: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${r.lints.length}`);
      pages.add(r.m.stamps);
    }
    ok(pages.size === (quick ? 5 : 20), `sweep: ${pages.size} distinct pages of ${quick ? 5 : 20}`);
    console.log(`sweep: ${pages.size} distinct pages`);

    // 5. poisons — data (validateBank; each for its own rule)
    const clone = (o) => JSON.parse(JSON.stringify(o));
    const en = banks.en;
    const loc = (l, patch) => ({ ...clone(en), ...patch, setSource: patch.setSource !== undefined ? patch.setSource : 'test source', strings: clone(en.strings) });
    const W = (n, e, s, w) => ({ n, e, s, w });
    const deCtl = loc('de', { dirWords: W('Norden', 'Osten', 'Süden', 'Westen'), dirLetters: W('N', 'O', 'S', 'W'), symbolWords: { house: 'Haus', tree: 'Baum', bush: 'Strauch', pond: 'Teich', bench: 'Bank', tent: 'Zelt', flowerBed: 'Blumenbeet', bridge: 'Brücke' } });
    // (Phase E) the control titles no longer embed the layout key: 'Karte compass-rose' now reads the standalone en `compass`
    deCtl.strings = Object.fromEntries(Object.entries(en.strings).map(([k, v], i) => [k, { title: 'Karte ' + 'abcdef'[i], instruction: v.instruction }]));
    const deF = validateBank(deCtl, 'de'); log.push(`  control de draft: ${deF.length} findings${deF.length ? ' — ' + deF.slice(0, 3).join(' | ') : ''}`); ok(!deF.length, 'the de control draft must be clean');
    judge('P1 pt dirLetters.e "E"', validateBank(loc('pt', { dirWords: W('norte', 'leste', 'sul', 'oeste'), dirLetters: W('N', 'E', 'S', 'O') }), 'pt'), /dirLetters\.e "E" ≠ the initial of dirWords\.e "leste" \(rule 2\)/);
    judge('P2 de dirLetters.e "E"', validateBank({ ...deCtl, dirLetters: W('N', 'E', 'S', 'W') }, 'de'), /dirLetters\.e "E" ≠ the initial of dirWords\.e "Osten" \(rule 2\)/);
    judge('P3 fi letters N E S W', validateBank(loc('fi', { dirWords: W('pohjoinen', 'itä', 'etelä', 'länsi'), dirLetters: W('N', 'E', 'S', 'W') }), 'fi'), /dirLetters\.n "N" ≠ the initial of dirWords\.n "pohjoinen" \(rule 2\)/);
    judge('P4 es oriente / E', validateBank(loc('es', { dirWords: W('norte', 'oriente', 'sur', 'oeste'), dirLetters: W('N', 'E', 'S', 'O') }), 'es'), /dirLetters\.e "E" ≠ the initial of dirWords\.e "oriente" \(rule 2\)/);
    judge('P5 sv dirLetters.e "O"', validateBank(loc('sv', { dirWords: W('norr', 'öster', 'söder', 'väster'), dirLetters: W('N', 'O', 'S', 'V') }), 'sv'), /dirLetters\.e "O" ≠ the initial of dirWords\.e "öster" \(rule 2\)/);
    judge('P6 fr northAmerica in two members', validateBank(loc('fr', { continentSet: [...clone(en.continentSet), { id: 'amerique', regions: ['northAmerica', 'southAmerica'] }], continentNames: { ...en.continentNames, amerique: 'Amérique' } }), 'fr'), /region northAmerica is in 2 members \(rule 4\)/);
    judge('P7 southern without Antarctica', validateBank(loc('en', { continentSet: en.continentSet.filter((m) => m.id !== 'antarctica'), continentNames: Object.fromEntries(Object.entries(en.continentNames).filter(([k]) => k !== 'antarctica')) }), 'en'), /Southern Ocean without Antarctica \(rule 6\)/);
    judge('P8 nl ocean name = continent name', validateBank(loc('nl', { oceanNames: { ...en.oceanNames, atlantic: 'Europe' } }), 'nl'), /ocean name "Europe" equals a continent name \(rule 7\)/);
    judge('P9 de "Australien und Ozeanien"', validateBank({ ...deCtl, continentNames: { ...en.continentNames, oceania: 'Australien und Ozeanien' } }, 'de'), /"Australien und Ozeanien" is 23 graphemes \(> 18, rule 5\)/);
    judge('P10 tree = bush', validateBank(loc('en', { symbolWords: { ...en.symbolWords, bush: 'tree' } }), 'en'), /symbolWords\.tree === symbolWords\.bush "tree" \(rule 8\)/);
    judge('P11 en title "Compass Directions"', validateBank({ ...clone(en), strings: { ...clone(en.strings), 'compass-rose': { ...en.strings['compass-rose'], title: 'Compass Directions' } } }, 'en'), /equals a treasure-hunt mode name \(rule 10\)/);
    { const sv = loc('sv', { dirWords: W('norr', 'öster', 'söder', 'väster'), dirLetters: W('N', 'Ö', 'S', 'V') }); sv.strings = Object.fromEntries(Object.entries(en.strings).map(([k, v]) => [k, { title: 'Kartor ' + k, instruction: v.instruction }])); sv.strings.base.title = 'Karta med kompass';
      judge('P12 sv title "Karta med kompass"', validateBank(sv, 'sv'), /standalone word "kompass" \(treasure-hunt's, rule 10\)/); }
    judge('P-ban F3 "write the number" (must fire; the en "numbered" is the must-pass control)', validateBank({ ...clone(en), strings: { ...clone(en.strings), continents: { ...en.strings.continents, instruction: 'Write the number of each continent on its line.' } } }, 'en'), /strings\.continents instruction names "number"/);
    judge('P13 empty setSource', validateBank(loc('en', { setSource: '' }), 'en'), /setSource is empty .* \(rule 11\)/);
    { const long = { ...clone(en), symbolWords: { ...en.symbolWords, flowerBed: 'Blumenbeetumrandungskante' } };
      judge('P-rule8 a token wider than the card', await measureWords(page, long), /token wider than 103 px \(rule 8\)/); }

    // 5. poisons — render
    const rp = async (name, type, re, opts = {}) => { const r = await renderWith(page, type, { difficulty: 2, baseName: 'G1-379-gate-poison-' + name.split(' ')[0], ...opts }); const f = [...r.verify, ...r.lints.map((l) => JSON.stringify(l)), ...(opts.extra ? opts.extra(r) : [])]; judge(name, f, re); };
    await rp('PR1 card prints its symbol at d2', withExtra({ forceShowSymbol: true }), /prints its symbol \(rowsShowSymbol is false\)/);
    {
      const g = IM.islandGeometry(); const pt = g.river[Math.floor(g.river.length * 0.35)];
      const t = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); r.bodyHtml = r.bodyHtml.replace(/(<svg x=")[\d.]+(" y=")[\d.]+(" width="([\d.]+)"[^>]*data-lcs-sym="(?!bridge)\w+")/, (m, a, b, c, w) => `${a}${(pt[0] - w / 2).toFixed(2)}${b}${(pt[1] - w / 2).toFixed(2)}${c}`); return r; } };
      await rp('PR2 a symbol on the river band', t, /from the river band/);
    }
    { const t = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); r.bodyHtml = r.bodyHtml.replace('<div class="mp-field"', '<img src="../cache/themes/camping/compass@2x.webp" alt=""><div class="mp-field"'); return r; } };
      await rp('PR17 a library picture on the page', t, /an <img> on the base/); }
    { const t = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); r.bodyHtml = r.bodyHtml.replace('<rect x="0" y="0" width="640" height="360"', '<text x="4" y="20" font-size="14">A</text><text x="4" y="60" font-size="14">1</text><rect x="0" y="0" width="640" height="360"'); return r; } };
      await rp('PR18 an edge label "A / 1"', t, /a digit is printed on the base/); }
    { const t = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); r.bodyHtml = r.bodyHtml.replace(/data-lcs-answer="\d+"/, 'data-lcs-answer="undefined"'); return r; } };
      await rp('PR19 answerBox (no answer) in place of blankNumeralBox', t, /answer stamp "undefined" is not a count/); }
    // PK (landing round 1, 2026-09-23): the old d2 key — 6 symbols, 5 count boxes (one symbol "unasked") -> every key
    // symbol must have its count box; the shipped d2 (5 / 5) is the control above
    { const t = { ...TYPE, build(o, ctx) { return TYPE._buildWith(require('../lib/b5-common.js').bank('maps', 'en'), { ...TYPE.difficulty[2], keySize: 6, asked: 5, unasked: 1, unaskedMax: 3 }, { locale: 'en' }, ctx); } };
      await rp('PK the key lists a symbol with no count box (6 symbols, 5 boxes)', t, /key symbol \w+ has no count box/); }
    { const t = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); r.bodyHtml = r.bodyHtml.replace(/gap:20px">/, 'gap:150px">'); return r; } };
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'G1-379-gate-poison-PS' });
      const before = fails.length; assertRender('PS', r); const f = fails.splice(before);
      judge('PS a 150 px band between the sheet and the cards (sparse)', [...f, ...r.verify], /SPARSE/);
      const c = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-379-gate-ps-control' });
      log.push(`  PS control: the shipped d2 bands [${c.m.bands.map((b) => b.toFixed(0))}] px (<= ${SPARSE_MAX})`); }
    {
      // base FILL, poisoned BOTH ways: (a) the strip frozen at its minimum ends high at the en chrome (the pre-review
      // page, ~83 %); (b) the strip forced past the 667 fi body leaves the page.
      const shape = /flex:1 1 (\d+)px;min-height:\1px;max-height:\d+px;container-type:size/;
      const frozen = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); const h = r.bodyHtml.replace(shape, 'flex:0 0 $1px;height:$1px;container-type:size'); if (h === r.bodyHtml) throw new Error('FL: the strip changed shape'); r.bodyHtml = h; return r; } };
      for (const d of [2, 3]) {
        const r = await renderWith(page, frozen, { difficulty: d, baseName: `G1-379-gate-poison-FL-d${d}` });
        const before = fails.length; assertRender(`FL d${d}`, r, { symPx: TYPE.difficulty[d].symPx, fill: 'one' }); judge(`FL-d${d} strip frozen at its minimum (content ends high)`, fails.splice(before), /FILL — the content ends at/);
      }
      const grown = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); const h = r.bodyHtml.replace(shape, 'flex:0 0 200px;height:200px;container-type:size'); if (h === r.bodyHtml) throw new Error('FG: the strip changed shape'); r.bodyHtml = h; return r; } };
      const r = await renderWith(page, grown, { difficulty: 2, baseName: 'G1-379-gate-poison-FG', strings: LONG.fi });
      const before = fails.length; assertRender('FG', r); judge('FG strip grown past the 667 fi body', [...fails.splice(before), ...r.verify], /FILL overflow|reach the footer|leaves the body/);
      const c = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-379-gate-fill-control' });
      log.push(`  FILL control: the shipped d2 ends at ${(100 * (c.m.ink - c.m.body.top) / c.m.body.h).toFixed(1)} % of the ${c.m.body.h.toFixed(0)} px body (>= ${BASE_FILL_MIN * 100} %)`);
    }
    {
      const probe = TYPE._buildWith(banks.en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng(require('../lib/rng.js').instanceSeed({ typeId: TYPE.id, theme: null, difficulty: 2, seedEpoch: 1 })) }).meta;
      const keyAsked = probe.keyOrder.filter((k) => probe.asked.includes(k));
      await rp('PT the card order = the key order', withExtra({ forceCards: keyAsked }), /the card order equals the key order/, { seedEpoch: 1 });
    }
    // 6. FACES (Phase E) — the five faces: strings, node sweeps + tells, renders at 814 / 722 / 677, poisons
    await require('./b5-maps-faces.js').faceGate({ page, ok, judge, fails, log, validateBank, quick });
  } finally { await browser.close(); }

  console.log('poison:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, validateNeutral };
