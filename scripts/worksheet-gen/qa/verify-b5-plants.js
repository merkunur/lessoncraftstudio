#!/usr/bin/env node
/**
 * verify-b5-plants.js — the G1-376 `plants` family gate (design
 * docs/worksheet-gen/b5-designs/G1-376-plants.md §5; the nt10-E build brief deliverable 4).
 * BASE build (2026-09-23): sections 0-5 below. FACES (Phase 2, 2026-09-23): section 6 — the five
 * CODE faces K-376 needs · G1-388 cycle · G2-363 eat · G2-364 jobs · G3-392 flower (record
 * docs/worksheet-gen/b5-designs/_work/G1-376-faces.md).
 *
 *   node scripts/worksheet-gen/qa/verify-b5-plants.js [--quick]
 *
 * 0. the primitive's node gate (qa/verify-plant-figure.js) must PASS.
 * 1. NEUTRAL — validateNeutral(PLANTS_NEUTRAL): §5 rules 4-6 (every EAT item: part ∈ PARTS,
 *    allow >= 2 and ∌ part, noun ∉ EAT_BLOCKED, picOpened, fileUri resolves, a vocab key;
 *    root items never allow leaf/stem, flower items never stem/leaf, tomato / cucumber /
 *    eggplant / pepper never seed/flower; the d2 eat mix reachable; NON_NEEDS disjoint from
 *    NEEDS + NON_NEED_FORBIDDEN, picOpened, >= 10; the need pictures resolve, never space/sun).
 * 2. BANK — validateBank(block, loc) (exported; tools/validate-b5-draft.js calls it for every
 *    panel draft): §5 rules 1-3 and 7-12 + rule 5 per locale (refuseItems -> mixNoStem).
 * 3. RENDER through the REAL pipeline (render/render-instance.js, file:// fonts): d1/d2/d3 en,
 *    then d2 under the 722 chrome (3-line title + 3-line instruction) AND the 677 chrome
 *    (4-line fi title) + the widest bank (the design's de literals, one row); asserts verify()
 *    empty, qa/lints.js clean and the floors ITSELF (no size lint exists): the plant 600 px,
 *    rows >= 64 (the G1 floor 44), bank words 18 px unclipped one row, tag discs >= 28 px with
 *    18 px numerals, every answer surface empty; body height measured per chrome.
 * 4. SWEEP — 20 seeds x d2 render distinct pages (anchor choice, numbering, bank order vary),
 *    each verify-clean; a node sweep of 400 seeds proves the numbering is never y-sorted
 *    and the bank never equals the tag order / its reverse, and the draw is locale-neutral;
 *    an unauthored locale REFUSES. (--quick renders 5 seeds.)
 * 5. POISON — each must FAIL for its OWN reason (no fail = SILENT, another fail = WRONG
 *    REASON; either exits 1); the correct EN bank is the control. Design §5 P1-P14 +
 *    the base render poisons PR7 PR8 PR9 PR13.
 * 6. FACES — per face: the emitted spec (layout, band, strings === the bank), an unauthored
 *    locale and a bank.refuse REFUSE; a 400-seed node sweep (0 position tells: F1 winner side,
 *    F2 derangement, F3 answer slot, F4 job order, F5 decoy position; the draw locale-neutral);
 *    d2 en + the worst chrome (fi 4-line title) render verify/lint clean and every apparatus
 *    word of the instruction is drawn on the page; a render sweep of distinct pages. Poisons:
 *    PR1-PR6 PR10-PR12 (design §5), PS-<face> (SPARSE, the stage pushed off the top), PA1/PA2
 *    (an instruction naming apparatus the face does not draw), P15 (corn allows flower).
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { vocab } = require('../lib/b2-common.js');
const { fileUri } = require('../image-cache/resolve.js');
const freeClaim = require('../../lib/free-claim.js');
const P = require('../primitives/plant-figure.js');
const bankMod = require('../data/b5/plants.js');
const figureGate = require('./verify-plant-figure.js');
const TAX = require('../../../frontend/config/topics-taxonomy.json');
const TYPE = require('../types/g1/G1-376-parts-of-a-plant.js');

const OUT = path.join(__dirname, '..', 'out', 'dev', 'G1-376-gate');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LAYOUTS = ['needs', 'cycle', 'eat', 'jobs', 'flower'];
const BAND = { base: 'G1', needs: 'K', cycle: 'G1', eat: 'G2', jobs: 'G2', flower: 'G3' };
const WORKSHEET_WORD = /worksheet|arbeitsblatt|werkblad|arbetsblad|arbejdsark|arbeidsark|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med fasit|vastauksineen/i;
/** §4 wrong-register literals, the floor every locale's `forbidden` list is merged over. */
const FORBIDDEN_FLOOR = {
  en: ['vegetable', 'veggie'], de: ['Blume', 'Stengel', 'Stamm', 'Obst'], es: ['fruta'], pt: ['fruta', 'tronco'], it: ['frutta'],
  nl: ['fruit'], fr: ['semence', 'pépin'], sv: ['roten', 'stjälken', 'bladet', 'blomman', 'frukten', 'fröet'], da: ['roden', 'stænglen', 'bladet', 'blomsten', 'frugten', 'frøet'],
  no: ['roten', 'stilken', 'bladet', 'blomsten', 'frukten', 'frøet'], fi: [],
};
/** "life cycle" heads that must never stand without the plant / seed word (rule 9). */
const LIFE_CYCLE = {
  en: [/life ?cycles?/i, /plant|seed/i], de: [/lebenszyklus/i, /pflanze|samen/i], es: [/ciclo de vida/i, /planta|semilla/i], pt: [/ciclo de vida/i, /planta|semente/i],
  fr: [/cycle de vie/i, /plante|graine/i], it: [/ciclo (?:vitale|di vita)/i, /pianta|seme/i], nl: [/levenscyclus/i, /plant|zaad/i], sv: [/livscykel/i, /växt|frö/i],
  da: [/livscyklus/i, /plante|frø/i], no: [/livssyklus/i, /plante|frø/i], fi: [/elinkaari/i, /kasvi|siemen/i],
};
/** Rule 10 per-face instruction bans (en source; the panels add their locale's list as `instructionBans` in the draft). */
const INSTR_BANS_EN = {
  base: [/circle/i, /colou?r/i, /(?<!\p{L})cut(?!\p{L})/iu, /letter box/i], flower: [/circle/i, /colou?r/i, /(?<!\p{L})cut(?!\p{L})/iu, /letter box/i],
  needs: [/(?<!\p{L})words?(?!\p{L})/iu, /write/i], eat: [/vegetable/i], jobs: [/word bank/i], cycle: [],
};
const INSTR_MUST_EN = { cycle: [/(?<!\p{L})cut(?!\p{L})/iu, /glue/i] };
const SPARSE_MAX = 40;   // nt10-D SPARSE ruling (coordinator review 2026-09-23): bank bottom -> first drawn element
const MIX_D2 = { root: 2, leaf: 2, flower: 1, stem: 1, seed: 1, fruit: 1 };
const MIX_NO_STEM = { root: 2, leaf: 2, flower: 1, seed: 1, fruit: 2 };

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);
const wordRe = (w) => new RegExp(`(?<!\\p{L})${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'iu');

/* ---------------------------------------------------------------- 1. neutral */
function validateNeutral(N) {
  const f = [];
  const push = (m) => f.push(m);
  const manifest = require('../cache/manifest.json');
  const V = vocab();
  const pic = (t, n, what) => {
    try { fileUri(t, n); } catch (e) { push(`${what} ${t}/${n}: the picture does not resolve (rule 4)`); return; }
    const e = manifest.themes[t] && manifest.themes[t].nouns[n];
    if (!e || !e.vocabKey || !V[e.vocabKey]) push(`${what} ${t}/${n}: no vocab key (rule 4)`);
    if (/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s|\d|$)/i.test(t)) push(`${what} ${t}/${n}: a B&W theme`);
  };
  for (const it of N.EAT) {
    const what = `EAT ${it.noun}`;
    if (!N.PARTS.includes(it.part)) push(`${what}: part "${it.part}" ∉ PARTS (rule 4)`);
    if (!Array.isArray(it.allow) || it.allow.length < 2) push(`${what}: allow has ${it.allow ? it.allow.length : 0} distractors (< 2, rule 4)`);
    if ((it.allow || []).includes(it.part)) push(`${what}: allow contains the answer (rule 4)`);
    for (const a of it.allow || []) if (!N.PARTS.includes(a)) push(`${what}: allow "${a}" ∉ PARTS (rule 4)`);
    if (N.EAT_BLOCKED.includes(it.noun)) push(`${what}: a blocked noun (rule 4)`);
    if (it.picOpened !== true) push(`${what}: picOpened is not true (rule 4)`);
    if (it.part === 'root' && (it.allow || []).some((a) => a === 'leaf' || a === 'stem')) push(`${what}: a root item allows leaf/stem (leafy tops shown; rule 4)`);
    if (it.part === 'flower' && (it.allow || []).some((a) => a === 'stem' || a === 'leaf')) push(`${what}: a flower item allows stem/leaf (rule 4)`);
    if (['tomato', 'cucumber', 'eggplant', 'pepper'].includes(it.noun) && (it.allow || []).some((a) => a === 'seed' || a === 'flower')) push(`${what}: a fruit item allows seed/flower (rule 4)`);
    if (it.noun === 'corn' && (it.allow || []).includes('flower')) push(`${what}: allows flower (an ear of corn IS an inflorescence and baby corn is eaten whole; faces build, rule 4)`);
    pic(it.theme, it.noun, what);
  }
  const nouns = N.EAT.map((x) => x.theme + '/' + x.noun);
  if (new Set(nouns).size !== nouns.length) push('EAT: a picture repeats');
  const count = (p) => N.EAT.filter((x) => x.part === p).length;
  for (const [p, n] of Object.entries(MIX_D2)) if (count(p) < n) push(`EAT: the d2 mix needs ${n} ${p}, the pool has ${count(p)} (rule 5)`);
  for (const [p, n] of Object.entries(MIX_NO_STEM)) if (count(p) < n) push(`EAT: mixNoStem needs ${n} ${p}, the pool has ${count(p)} (rule 5)`);
  // needs
  if (N.NEEDS.join() !== 'sun,raindrop') push('NEEDS ≠ [sun, raindrop]');
  for (const k of N.NEEDS) { const p = N.NEED_PICS[k]; if (!p || !p.picOpened) push(`NEED_PICS.${k} missing / not opened`); else { if (p.theme === 'space') push(`NEED_PICS.${k}: space/* is BLOCKED`); pic(p.theme, p.noun, `NEED_PICS.${k}`); } }
  if (N.NON_NEEDS.length < 10) push(`NON_NEEDS has ${N.NON_NEEDS.length} (< 10, rule 6)`);
  for (const x of N.NON_NEEDS) {
    if (N.NEEDS.includes(x.noun) || N.NON_NEED_FORBIDDEN.includes(x.noun)) push(`NON_NEEDS ${x.theme}/${x.noun}: a need or a need-cue (rule 6)`);
    if (x.picOpened !== true) push(`NON_NEEDS ${x.noun}: picOpened is not true (rule 6)`);
    pic(x.theme, x.noun, 'NON_NEEDS');
  }
  if (N.PARTS.join() !== 'root,stem,leaf,flower,fruit,seed') push('PARTS ≠ the six');
  if (N.JOB_PARTS.includes('fruit')) push('JOB_PARTS carries fruit without a validator-clean literal');
  return f;
}

/* ---------------------------------------------------------------- 2. bank */
function validateBank(b, loc) {
  const f = [];
  const push = (m) => f.push(`${loc}: ${m}`);
  if (!b || typeof b !== 'object') return [`${loc}: no block`];
  const N = bankMod.PLANTS_NEUTRAL;
  const lit = (obj, k, what) => {
    const v = obj && obj[k];
    if (typeof v !== 'string' || !v.trim()) { push(`${what}.${k} missing (rule 1)`); return null; }
    if (v !== v.trim()) push(`${what}.${k} "${v}" not trimmed (rule 1)`);
    if (/[{}]/.test(v)) push(`${what}.${k} "${v}" carries a slot (rule 1)`);
    if (/\d/.test(v)) push(`${what}.${k} "${v}" carries a digit (rule 1)`);
    return v;
  };
  const PW = {}, FW = {}, JB = {};
  for (const k of N.PARTS) PW[k] = lit(b.partWords, k, 'partWords');
  for (const k of N.FLOWER_PARTS) { if (k === 'ovary' && !(b.flowerWords && b.flowerWords.ovary)) continue; FW[k] = lit(b.flowerWords, k, 'flowerWords'); }
  for (const k of N.JOB_PARTS) JB[k] = lit(b.jobs, k, 'jobs');
  // rule 2: distinct
  const pw = N.PARTS.map((k) => PW[k] && low(PW[k], loc));
  for (let i = 0; i < pw.length; i++) for (let j = i + 1; j < pw.length; j++) if (pw[i] && pw[i] === pw[j]) push(`partWords.${N.PARTS[i]} === partWords.${N.PARTS[j]} "${PW[N.PARTS[i]]}" (rule 2)`);
  const fk = Object.keys(FW);
  for (let i = 0; i < fk.length; i++) for (let j = i + 1; j < fk.length; j++) if (FW[fk[i]] && low(FW[fk[i]], loc) === low(FW[fk[j]], loc)) push(`flowerWords.${fk[i]} === flowerWords.${fk[j]} (rule 2)`);
  for (const k of fk) if (k !== 'stalk' && FW[k] && pw.includes(low(FW[k], loc))) push(`flowerWords.${k} "${FW[k]}" repeats a part word (only stalk may, rule 2)`);
  // rule 3: forbidden
  const forb = [...(FORBIDDEN_FLOOR[loc] || []), ...((b.forbidden) || [])].map((x) => low(x, loc));
  for (const k of N.PARTS) if (PW[k] && forb.includes(low(PW[k], loc))) push(`partWords.${k} "${PW[k]}" is a forbidden register word (rule 3)`);
  for (const k of fk) if (FW[k] && forb.includes(low(FW[k], loc))) push(`flowerWords.${k} "${FW[k]}" is a forbidden register word (rule 3)`);
  // rule 7: jobs
  const leak = [...N.PARTS.map((k) => PW[k]), ...(b.partStems || [])].filter(Boolean);
  for (const k of N.JOB_PARTS) {
    const j = JB[k]; if (!j) continue;
    if (j.length > 90) push(`jobs.${k} ${j.length} chars > 90 (rule 7)`);
    for (const w of leak) if (wordRe(low(w, loc)).test(low(j, loc))) push(`jobs.${k} "${j}" contains the part word "${w}" (rule 7)`);
  }
  if (!Array.isArray(b.partStems) || b.partStems.length < 3) push('partStems lists < 3 forms (rule 7)');
  // rule 8: the F5 decoy (root) never inside a flower word
  if (PW.root) for (const k of fk) if (FW[k] && low(FW[k], loc).includes(low(PW.root, loc))) push(`the decoy partWords.root "${PW.root}" is inside flowerWords.${k} "${FW[k]}" (rule 8)`);
  // rule 11: capitalisation
  for (const [what, obj] of [['partWords', PW], ['flowerWords', FW]]) for (const [k, v] of Object.entries(obj)) {
    if (!v) continue;
    const cap = /^\p{Lu}/u.test(v);
    if (loc === 'de' && !cap) push(`${what}.${k} "${v}": a German noun is capitalised (rule 11)`);
    if (loc !== 'de' && cap) push(`${what}.${k} "${v}": capitalised (a vocab citation form leaking in, rule 11)`);
  }
  // rule 5: the eat mix per locale
  const refused = new Set(b.refuseItems || []);
  for (const r of refused) if (!N.EAT.some((x) => x.noun === r)) push(`refuseItems names an unknown item "${r}"`);
  const pool = N.EAT.filter((x) => !refused.has(x.noun));
  const mix = pool.some((x) => x.part === 'stem') ? MIX_D2 : MIX_NO_STEM;
  for (const [p, n] of Object.entries(mix)) if (pool.filter((x) => x.part === p).length < n) push(`the eat mix needs ${n} ${p}, the ${loc} pool has ${pool.filter((x) => x.part === p).length} (rule 5)`);
  // rules 9, 10, 12: strings
  const S = b.strings || {};
  const want = ['base', ...LAYOUTS];
  if (Object.keys(S).sort().join() !== want.slice().sort().join()) push(`strings ids [${Object.keys(S).join()}] ≠ [${want.join()}] (rule 12)`);
  const themeWords = ['flowers', 'tree', 'vegetables', 'fruits', 'spring'].flatMap((t) => { const a = TAX.axes.theme[t]; return a ? [a.name && a.name[loc], a.slug && a.slug[loc]].filter(Boolean) : []; }).map((x) => low(x, loc));
  const byBand = {};
  for (const id of want) {
    const s = S[id]; if (!s) { push(`strings.${id} missing (rule 12)`); continue; }
    const t = s.title || '', ins = s.instruction || '';
    if (!t || t.length > 70) push(`strings.${id} title length ${t.length} (1..70, rule 9)`);
    if (WORKSHEET_WORD.test(t)) push(`strings.${id} title carries a worksheet word (rule 9)`);
    if (themeWords.includes(low(t, loc))) push(`strings.${id} title "${t}" is a bare theme name (rule 9)`);
    const lc = LIFE_CYCLE[loc];
    if (lc && lc[0].test(t) && !lc[1].test(t.replace(lc[0], ''))) push(`strings.${id} title "${t}" carries a bare life-cycle head without the plant or the seed (rule 9)`);
    if (!ins || ins.length > 150) push(`strings.${id} instruction length ${ins.length} (1..150, rule 9)`);
    for (const x of [t, ins]) { const h = freeClaim.hit(x); if (h) push(`strings.${id} claims free ("${h}", rule 9)`); if (ANSWERS_WORD.test(x)) push(`strings.${id} promises answers (rule 9)`); }
    const bans = loc === 'en' ? INSTR_BANS_EN[id] : ((b.instructionBans && b.instructionBans[id]) || []).map((w) => wordRe(w));
    for (const re of bans || []) if (re.test(ins)) push(`strings.${id} instruction names "${ins.match(re)[0]}" — not apparatus of this face (rule 10)`);
    if (loc === 'en') for (const re of INSTR_MUST_EN[id] || []) if (!re.test(ins)) push(`strings.${id} instruction lacks ${re} (rule 10)`);
    const band = BAND[id];
    (byBand[band] = byBand[band] || []).push([id, low(t, loc)]);
  }
  for (const list of Object.values(byBand)) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) if (list[i][1] === list[j][1]) push(`strings.${list[i][0]} and ${list[j][0]} share a title in one band (rule 9)`);
  const toks = want.filter((id) => S[id]).map((id) => [id, new Set(low(S[id].title, loc).split(/[^\p{L}]+/u).filter(Boolean))]);
  for (let i = 0; i < toks.length; i++) for (let j = i + 1; j < toks.length; j++) { const a = toks[i][1], c = toks[j][1]; if ([...a].every((x) => c.has(x)) && [...c].every((x) => a.has(x))) push(`strings.${toks[i][0]} / ${toks[j][0]} titles share every token (rule 12)`); }
  if (S.base && !/(^|\s)/.test(S.base.title)) push('base title empty');
  return f;
}

/* ---------------------------------------------------------------- 3. render */
async function renderWith(page, type, { difficulty = 2, baseName, strings, seedEpoch, locale = 'en' }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="plants"]');
    const body = document.querySelector('.ws-body'), head = document.querySelector('.ws-head'), foot = document.querySelector('.ws-foot');
    const plant = root && root.querySelector('svg[data-lcs-plant]');
    const rows = root ? [...root.querySelectorAll('[data-lcs-row-n]')].map((r) => rect(r)) : [];
    const words = root ? [...root.querySelectorAll('[data-lcs-bank-banner] [data-lcs-bank]')] : [];
    const discs = root ? [...root.querySelectorAll('[data-lcs-tag-disc]')].map((d) => rect(d)) : [];
    const nums = root ? [...root.querySelectorAll('g[data-lcs-tag] text')].map((t) => parseFloat(getComputedStyle(t).fontSize) * (plant ? plant.getBoundingClientRect().height / 600 : 1)) : [];
    const banner = root && root.querySelector('[data-lcs-bank-banner]');
    return {
      body: body ? rect(body) : null, headH: head ? rect(head).h : 0, foot: foot ? rect(foot).top : 0,
      plant: plant ? rect(plant) : null, rows, discs, nums,
      words: words.map((w) => ({ id: w.dataset.lcsBank, text: w.textContent.trim(), px: parseFloat(getComputedStyle(w).fontSize), top: Math.round(w.getBoundingClientRect().top), clipped: w.scrollWidth > w.clientWidth + 0.6 })),
      banner: banner ? rect(banner) : null,
      lowest: Math.max(0, ...[...(root ? root.querySelectorAll('*') : [])].map((e) => e.getBoundingClientRect().bottom)),
      // base FILL: the bottom of the INK (plant part groups, tags, the label card, the bank), never of the grown svg box
      ink: root ? Math.max(0, ...[...root.querySelectorAll('svg[data-lcs-plant] g[data-lcs-part], svg[data-lcs-plant] g[data-lcs-tag], svg[data-lcs-plant] rect[data-lcs-soil="box"], [data-lcs-label-card], [data-lcs-bank-banner]')].map((e) => e.getBoundingClientRect().bottom)) : 0,
      stamps: root ? { numbers: root.dataset.lcsNumbers, picks: root.dataset.lcsPicks } : null,
      // SPARSE: the blank band between the bank's bottom and the stage's FIRST DRAWN element (plant parts, tags, the card)
      sparseGap: (() => {
        if (!banner || !plant) return null;
        const drawn = [...plant.querySelectorAll('g[data-lcs-part], g[data-lcs-tag]'), ...root.querySelectorAll('[data-lcs-label-card]')];
        const top = Math.min(...drawn.map((e) => e.getBoundingClientRect().top));
        return top - banner.getBoundingClientRect().bottom;
      })(),
    };
  });
  return { out, m, verify: out.qa.verify, lints: out.qa.lints };
}
const BASE_FILL_MIN = 0.85;   // _FACE-BRIEF.md FILL: content bottom >= 85 % of the body at the 814 chrome, inside the body at 677
function assertRender(name, r, { bank = true, rowsWant = 6, rowH = 64, body, fill, figureMax = TYPE.difficulty[2].figureMax } = {}) {
  ok(!r.verify.length, `${name}: verify ${JSON.stringify(r.verify.slice(0, 4))}`);
  ok(!r.lints.length, `${name}: lints ${JSON.stringify(r.lints.slice(0, 4))}`);
  const m = r.m;
  ok(m.plant && m.plant.h >= TYPE.difficulty[2].figureH - 1 && m.plant.h <= figureMax + 1, `${name}: the plant is ${m.plant && m.plant.h.toFixed(1)} px, outside [${TYPE.difficulty[2].figureH}, ${figureMax}]`);
  const share = (m.ink - m.body.top) / m.body.h;
  if (fill === 'one') ok(share >= BASE_FILL_MIN, `${name}: FILL — the content ends at ${(share * 100).toFixed(1)} % of the body (< ${BASE_FILL_MIN * 100} %): grow the plant, not the whitespace`);
  ok(m.ink <= m.body.bottom + 0.6 && m.ink <= m.foot + 0.6, `${name}: FILL overflow — the content ends ${(m.ink - m.body.bottom).toFixed(0)} px past the body`);
  ok(m.rows.length === rowsWant, `${name}: ${m.rows.length} rows ≠ ${rowsWant}`);
  for (const rr of m.rows) ok(rr.h >= Math.max(44, rowH) - 0.6 && rr.w >= 204, `${name}: a row ${rr.w.toFixed(0)} x ${rr.h.toFixed(0)} < 205 x ${rowH}`);
  ok(m.discs.every((d) => d.w >= 28), `${name}: a tag disc under 28 px`);
  ok(m.nums.every((x) => x >= 17.5), `${name}: a tag numeral under 18 px (${m.nums.map((x) => x.toFixed(1))})`);
  if (bank) {
    ok(m.words.length === rowsWant && m.words.every((w) => w.px >= 18 && !w.clipped), `${name}: bank words not ${rowsWant} x 18 px unclipped`);
    ok(new Set(m.words.map((w) => w.top)).size === 1, `${name}: the bank wraps to a second row`);
  } else ok(!m.banner, `${name}: a bank on a no-bank level`);
  ok(m.lowest <= m.foot + 0.6, `${name}: content reaches the footer (${m.lowest.toFixed(0)} > ${m.foot.toFixed(0)})`);
  if (body) ok(m.body.h <= body + 0.6, `${name}: body ${m.body.h.toFixed(0)} px — the fixture did not squeeze it to <= ${body}`);
  if (bank) ok(m.sparseGap != null && m.sparseGap >= 0 && m.sparseGap <= SPARSE_MAX, `${name}: SPARSE — ${m.sparseGap == null ? '?' : m.sparseGap.toFixed(0)} px blank band between the bank and the first drawn element (> ${SPARSE_MAX}; the slack must fall below the stage)`);
}

const LONG = {
  de: { title: 'Teile der Pflanze: Wurzeln, Stängel, Blätter, Blüten, Früchte und Samen', instruction: 'Folge jedem nummerierten Anhänger zu einem Teil der Pflanze und schreibe den Namen dieses Teils aus der Wörterliste auf die Zeile mit derselben Nummer.', body: 722 },
  fi: { title: 'Kasvin osat: juuret, varsi, lehdet, kukat, hedelmät ja siemenet kuvassa ja lapuissa numeroituina tarkasti', instruction: 'Seuraa jokaista numeroitua lappua kasvin osaan asti ja kirjoita sen osan nimi sanapankista viivalle, jolla on sama numero kuin lapussa, huolellisesti.', body: 677 },
};
/** A type whose build injects a synthetic block (the widest-bank fixture); the node cross-check is expected to name it. */
function withBlock(block, extra = {}) {
  return { ...TYPE, build({ difficulty }, ctx) { return this._buildWith(block, { ...this.difficulty[difficulty], ...extra }, { locale: 'en' }, ctx); } };
}


/* ================================================================ 6. FACES (Phase 2, 2026-09-23)
 * The five CODE faces (layout knob) through the real pipeline at d2 en + the worst legal chrome;
 * verify() re-derives every answer from the stamps (it also measures SPARSE, the per-page position
 * tells, the floors and the node literal cross-check); this section adds the apparatus-in-instruction
 * lint, the node tell sweeps, the refusals and the deferred face poisons (PR1-PR6, PR10-PR12) + one
 * SPARSE poison per face (align-content:end = the stage pushed off the top). */
const FACE_IDS = { needs: 'K-376', cycle: 'G1-388', eat: 'G2-363', jobs: 'G2-364', flower: 'G3-392' };
/** Coordinator review (2026-09-23, the nt10-D "a short face grows its elements to fill" rule): F4 + F5 must
 *  END at >= 85 % of the body at the default chrome and stay inside it at the worst (677) chrome. */
const FILL_FACES = ['jobs', 'flower'], FILL_MIN = 0.85;
const FACE_DIR = { needs: 'k', cycle: 'g1', eat: 'g2', jobs: 'g2', flower: 'g3' };
function loadFace(L) {
  const fs = require('fs');
  const dir = path.join(__dirname, '..', 'types', FACE_DIR[L]);
  const f = fs.readdirSync(dir).find((x) => x.startsWith(FACE_IDS[L] + '-'));
  if (!f) throw new Error('face spec missing: ' + FACE_IDS[L]);
  return require(path.join(dir, f));
}
/**
 * Apparatus-in-instruction (nt10-E addition 4): every apparatus noun the EN instruction names must be
 * PRESENT on that face's page. Each entry = [the word, the selector that proves the thing is drawn].
 */
const APPARATUS_EN = [
  [/(?<!\p{L})tags?(?!\p{L})/iu, 'g[data-lcs-tag]'],
  [/word bank|(?<!\p{L})bank(?!\p{L})/iu, '[data-lcs-bank-banner]'],
  [/(?<!\p{L})lines?(?!\p{L})/iu, 'svg[data-lcs-prim="writing-row"]'],
  [/(?<!\p{L})box(es)?(?!\p{L})/iu, '.ws-blankbox, [data-lcs-slot]'],
  [/(?<!\p{L})arrows?(?!\p{L})/iu, '[data-lcs-arrow], [data-lcs-gift-arrow]'],
  [/(?<!\p{L})pots?(?!\p{L})/iu, '[data-lcs-pot]'],
  [/(?<!\p{L})pictures?(?!\p{L})/iu, '[data-lcs-cut-card], img'],
  [/(?<!\p{L})food(s)?(?!\p{L})/iu, '[data-lcs-food]'],
  [/(?<!\p{L})cut(?!\p{L})/iu, '[data-lcs-cutlines]'],
  [/(?<!\p{L})glue(?!\p{L})/iu, '[data-lcs-slot]'],
  [/(?<!\p{L})words?(?!\p{L})/iu, '[data-lcs-bank-banner], [data-lcs-chip-text]'],
  // "the part of the plant that we eat" (F3): the plant is present as its drawn PART icons on the chips
  [/(?<!\p{L})plants?(?!\p{L})/iu, 'svg[data-lcs-plant], svg[data-lcs-figure^="plant-"], svg[data-lcs-part-icon]'],
  [/(?<!\p{L})flowers?(?!\p{L})/iu, 'svg[data-lcs-figure="flower"], svg[data-lcs-plant] g[data-lcs-part="flower"]'],
  [/(?<!\p{L})seeds?(?!\p{L})/iu, '[data-lcs-seed], [data-lcs-seed-coat]'],
  [/(?<!\p{L})numbers?(?!\p{L})|numbered/iu, 'g[data-lcs-tag], [data-lcs-row-badge]'],
];
async function apparatusFindings(page) {
  return page.evaluate((rules) => {
    const out = [];
    const ins = document.querySelector('.ws-instruction');
    const text = ins ? ins.textContent.replace(/\s+/g, ' ').trim() : '';
    for (const [src, flags, sel] of rules) {
      const re = new RegExp(src, flags);
      if (re.test(text) && !document.querySelector('[data-ws-content] ' + sel.split(', ').join(', [data-ws-content] '))) out.push(`the instruction names "${text.match(re)[0]}" but the page draws no ${sel}`);
    }
    return out;
  }, APPARATUS_EN.map(([re, sel]) => [re.source, re.flags, sel]));
}

async function faceSection(page, judge, log, quick, banks) {
  const N = bankMod.PLANTS_NEUTRAL;
  const FACES = {};
  for (const L of LAYOUTS) FACES[L] = loadFace(L);
  // the emitted specs: id, band, knob, strings === the bank's
  for (const L of LAYOUTS) {
    const F = FACES[L];
    ok(F.difficulty[2].layout === L, `${FACE_IDS[L]}: difficulty.layout ${F.difficulty[2].layout} ≠ ${L}`);
    ok(F.gradeBand === BAND[L], `${FACE_IDS[L]}: gradeBand ${F.gradeBand} ≠ ${BAND[L]}`);
    ok(F.i18n.en.title === banks.en.strings[L].title && F.i18n.en.instruction === banks.en.strings[L].instruction, `${FACE_IDS[L]}: i18n.en ≠ PLANTS.en.strings.${L}`);
    ok(F.exerciseType === 'plants' && F.themeAxis.applicable === false, `${FACE_IDS[L]}: exerciseType / themeAxis`);
    // an unauthored locale refuses; a bank.refuse of this face refuses
    {
      const U = require('./b5-unauthored.js');
      const p = U.refusalProbe('plants', 'sv', () => F.build({ difficulty: 2, locale: 'sv' }, { rng: makeRng('x') }));
      ok(U.refused(p.hidden, /no sv block/), `${FACE_IDS[L]}: an unauthored sv REFUSES (got ${p.hidden})`);
      ok(!U.refused(p.real, /no sv block/), `${FACE_IDS[L]}: poison — the authored sv page passed the unauthored-refusal check (got ${p.real})`);
    }
    let m = null; try { F._buildWith({ ...banks.en, refuse: [L] }, F.difficulty[2], { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; } ok(m && /refuses the/.test(m), `${FACE_IDS[L]}: bank.refuse [${L}] must REFUSE (got ${m})`);
  }
  // node sweeps over 400 seeds: no tell on ANY seed, and the draw is locale-neutral
  {
    const synth = { ...banks.en, partWords: { root: 'Wurzeln', stem: 'Stängel', leaf: 'Blatt', flower: 'Blüte', fruit: 'Frucht', seed: 'Samen' },
      flowerWords: { petal: 'Kronblatt', sepal: 'Kelchblatt', stamen: 'Staubblatt', pistil: 'Stempel', stalk: 'Stiel' },
      jobs: { root: 'nimmt Wasser aus der Erde auf', stem: 'hält die Pflanze aufrecht', leaf: 'macht mit Sonnenlicht Nahrung', flower: 'lockt mit bunten Farben Bienen an', seed: 'kann zu einer neuen Pflanze wachsen' }, partStems: ['Pflanzenteil'] };
    const tells = { needs: 0, cycle: 0, eat: 0, jobs: 0, flower: 0 }, neutral = { ...tells };
    const seenCorn = new Set();
    for (let s = 1; s <= 400; s++) {
      for (const L of LAYOUTS) {
        const F = FACES[L], rng = () => makeRng(`${FACE_IDS[L]}-sweep-${s}`);
        const a = F._buildWith(banks.en, F.difficulty[2], { locale: 'en' }, { rng: rng() });
        const b = F._buildWith(synth, F.difficulty[2], { locale: 'de' }, { rng: rng() });
        const strip = (h) => h.replace(/data-lcs-locale="\w+"/, '').replace(/>[^<]*</g, '><');   // words differ, structure must not
        if (JSON.stringify(a.meta) !== JSON.stringify(b.meta) || (L !== 'flower' && L !== 'eat' && L !== 'jobs' && strip(a.bodyHtml) !== strip(b.bodyHtml))) neutral[L]++;
        const m = a.meta;
        if (L === 'needs') { const sd = m.sides; const nl = sd.filter((x) => x === 'L').length; if (Math.abs(2 * nl - sd.length) > 1 || new Set(sd).size < 2 || sd.every((x, i) => !i || x !== sd[i - 1])) tells.needs++; }
        if (L === 'cycle') { const rest = F.difficulty[2].stages.slice(1); if (m.strip.some((x, i) => x === rest[i]) || m.strip.join() === rest.slice().reverse().join()) tells.cycle++; }
        if (L === 'eat') { const sl = m.slots, cnt = [0, 0, 0]; sl.forEach((x) => cnt[x]++); if (cnt.some((c) => c < 2 || c > 3) || [1, -1].some((d) => sl.every((x, i) => x === ((sl[0] + d * i) % 3 + 3) % 3))) tells.eat++; for (const it of m.items) if (it === 'corn') seenCorn.add(s); }
        if (L === 'jobs') { const to = F.difficulty[2].parts.slice().sort((x, y) => m.numbers[x] - m.numbers[y]); if (m.jobs.join() === to.join() || m.jobs.join() === to.slice().reverse().join()) tells.jobs++; }
        if (L === 'flower') { if (m.bank[0] === 'decoy' || m.bank[m.bank.length - 1] === 'decoy') tells.flower++; }
      }
    }
    for (const L of LAYOUTS) { ok(tells[L] === 0, `node sweep ${L}: ${tells[L]} position tells in 400 seeds`); ok(neutral[L] === 0, `node sweep ${L}: ${neutral[L]} seeds draw differently per locale`); }
    ok(seenCorn.size > 0, 'node sweep eat: corn never drawn (the seed bucket is not exercised)');
    console.log(`faces node sweep 400 seeds: tells ${JSON.stringify(tells)} locale-draw diffs ${JSON.stringify(neutral)}`);
  }
  // renders: d2 en at the default chrome and the worst legal chrome (fi 4-line title + 3-line instruction)
  const faceRender = async (L, name, opts = {}) => {
    const out = await renderInstance({ type: opts.type || FACES[L], theme: null, difficulty: 2, locale: 'en', page, outDir: OUT, baseName: `G1-376-gate-face-${name}`, strings: opts.strings, seedEpoch: opts.seedEpoch });
    const app = await apparatusFindings(page);
    const body = await page.evaluate(() => { const b = document.querySelector('.ws-body'); return b ? b.getBoundingClientRect().height : 0; });
    // FILL: the lowest DRAWN thing (cards + the figure's own part groups, never an svg box) as a share of the body
    const fill = await page.evaluate(() => {
      const b = document.querySelector('.ws-body').getBoundingClientRect(), foot = document.querySelector('.ws-foot');
      const els = [...document.querySelectorAll('[data-ws-content] [data-lcs-fill], [data-ws-content] svg g[data-lcs-part], [data-ws-content] [data-lcs-block]:not([data-lcs-plant-stage]):not([data-lcs-flower-stage])')];
      const low = Math.max(...els.map((e) => e.getBoundingClientRect().bottom));
      return { share: (low - b.top) / b.height, low, bodyBottom: b.bottom, foot: foot ? foot.getBoundingClientRect().top : Infinity };
    });
    const fillF = [];
    if (FILL_FACES.includes(L)) {
      if (fill.share < FILL_MIN) fillF.push(`FILL — the content ends at ${(fill.share * 100).toFixed(0)} % of the body (< ${FILL_MIN * 100} %: a short face floats a small stage)`);
      if (fill.low > fill.bodyBottom + 0.6 || fill.low > fill.foot + 0.6) fillF.push(`FILL overflow — the content ends ${(fill.low - fill.bodyBottom).toFixed(0)} px past the body`);
    }
    return { verify: out.qa.verify, lints: out.qa.lints, app, body, fill, fillF };
  };
  for (const L of LAYOUTS) {
    const r = await faceRender(L, `${L}-d2`);
    ok(!r.verify.length && !r.lints.length && !r.app.length && !r.fillF.length, `${FACE_IDS[L]} d2: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${r.lints.length} apparatus ${JSON.stringify(r.app)} fill ${JSON.stringify(r.fillF)}`);
    const w = await faceRender(L, `${L}-d2-worstchrome`, { strings: { ...LONG.fi, instruction: LONG.fi.instruction } });
    ok(!w.verify.length && !w.lints.length && !w.fillF.length, `${FACE_IDS[L]} worst chrome: verify ${JSON.stringify(w.verify.slice(0, 3))} lints ${JSON.stringify(w.lints.slice(0, 2))} fill ${JSON.stringify(w.fillF)}`);
    ok(w.body <= 677.6, `${FACE_IDS[L]} worst chrome: body ${w.body.toFixed(0)} — the fixture did not squeeze to <= 677`);
    console.log(`face ${FACE_IDS[L]} (${L}): d2 body ${r.body.toFixed(0)} fill ${(r.fill.share * 100).toFixed(0)} % verify ${r.verify.length} lints ${r.lints.length} apparatus ${r.app.length} · worst chrome body ${w.body.toFixed(0)} fill ${(w.fill.share * 100).toFixed(0)} % verify ${w.verify.length} lints ${w.lints.length}`);
    const pages = new Set();
    const n = quick ? 3 : 8;
    for (let s = 1; s <= n; s++) {
      const q = await faceRender(L, `${L}-sweep-${s}`, { seedEpoch: s });
      ok(!q.verify.length && !q.lints.length, `${FACE_IDS[L]} sweep ${s}: ${JSON.stringify(q.verify.slice(0, 2))}`);
      pages.add(await page.evaluate(() => document.querySelector('[data-lcs-type="plants"]').innerHTML.length + ':' + [...document.querySelectorAll('[data-lcs-gifts],[data-lcs-cut-card],[data-lcs-food],[data-lcs-job],[data-lcs-bank]')].map((e) => e.getAttribute('data-lcs-gifts') || e.getAttribute('data-lcs-stage') || e.getAttribute('data-lcs-food') || e.getAttribute('data-lcs-job') || e.getAttribute('data-lcs-bank')).join()));
    }
    // F2's only free draw is the strip order: 4 cards have 9 derangements, one of them the reverse ->
    // exactly 8 legal pages, so a seed sweep must COLLIDE; assert it varies, not that it never repeats.
    const want = L === 'cycle' ? Math.min(n, 2) : n;
    ok(pages.size >= want, `${FACE_IDS[L]} sweep: ${pages.size} distinct pages of ${n} (want >= ${want})`);
  }

  // poisons — the deferred face poisons of §5 + per-face SPARSE + apparatus + data
  const fp = async (name, L, patch, re, opts = {}) => {
    const F = FACES[L];
    const t = { ...F, build(o, ctx) { const d = { ...F.difficulty[o.difficulty], ...(patch.config || {}) }; const r = F._buildWith(bankMod.PLANTS.en, d, { locale: 'en' }, ctx); if (patch.html) r.bodyHtml = patch.html(r.bodyHtml); return r; } };
    const r = await faceRender(L, 'poison-' + name.split(' ')[0], { type: t, strings: opts.strings });
    judge(name, [...r.verify, ...r.lints.map((l) => JSON.stringify(l)), ...r.app, ...r.fillF], re);
  };
  await fp('PR1 two winners in a row', 'needs', { config: { forceGrows: true } }, /one winner per row/);
  await fp('PR2 alternating winner side', 'needs', { config: { forceSides: ['L', 'R', 'L', 'R', 'L'] } }, /alternating tell/);
  await fp('PR3 strip = slot order', 'cycle', { config: { forceStrip: ['sprout', 'seedling', 'flowering', 'fruiting'] } }, /not a derangement/);
  await fp('PR4 return arrow removed', 'cycle', { config: { dropReturn: true } }, /cycle not closed/);
  await fp('PR5 answer staircase', 'eat', { config: { forceSlots: [0, 1, 2, 0, 1, 2, 0, 1] } }, /staircase \(slot tell\)/);
  await fp('PR6 food caption printed', 'eat', { config: { forceCaption: true } }, /food name in body/);
  await fp('PR10 part word in a job', 'jobs', { config: { forceLeak: 'the roots' } }, /job \w+ leak: .* names the part word/);
  await fp('PR11 decoy first in the bank', 'flower', { config: { forceBank: ['decoy', 'petal', 'sepal', 'stamen', 'pistil', 'stalk'] } }, /decoy position tell/);
  await fp('PR12 answerBox on the jobs face', 'jobs', { config: { forceAnswerBox: true } }, /data-lcs-answer="undefined"/);
  for (const L of LAYOUTS) {
    // F4/F5 FILL their body (a 1fr row), so the pushed-off-the-top poison must first undo the growth
    const sparse = (h) => (FILL_FACES.includes(L) ? h.replace(/minmax\((\d+)px,1fr\)/, '$1px') : h).replace('align-content:start', 'align-content:end');
    await fp(`PS-${L} stage pushed off the top (sparse)`, L, { html: sparse }, /SPARSE — \d+ px blank band/);
  }
  // FILL, poisoned BOTH ways: (a) the pre-review fixed stage (no growth) floats at the default chrome;
  // (b) a stage forced taller than the worst body runs past it at the 677 chrome
  const noGrow = (h) => h.replace(/minmax\((\d+)px,1fr\)/, '$1px').replace(/;height:100%">/g, '">');
  await fp('PF-jobs fixed stage (under-fill)', 'jobs', { html: noGrow }, /FILL — the content ends at \d+ %/);
  await fp('PF-flower fixed stage (under-fill)', 'flower', { html: (h) => h.replace(/minmax\((\d+)px,1fr\)/, '$1px') }, /FILL — the content ends at \d+ %/);
  // (jobs has no bank: its whole body is the row, so it needs a row > 667 to overflow; flower's row sits under a 69 px bank)
  await fp('PO-jobs stage past the 677 body', 'jobs', { html: (h) => h.replace(/minmax\((\d+)px,1fr\)/, 'minmax(700px,1fr)') }, /FILL overflow|reaches the footer/, { strings: LONG.fi });
  await fp('PO-flower stage past the 677 body', 'flower', { html: (h) => h.replace(/minmax\((\d+)px,1fr\)/, 'minmax(640px,1fr)') }, /FILL overflow|reaches the footer/, { strings: LONG.fi });
  // apparatus: an instruction that names a thing this face does not draw
  await fp('PA1 needs names a word bank + lines', 'needs', {}, /the instruction names "(word|line)/i, { strings: { title: 'What Plants Need to Grow', instruction: 'Write the word from the word bank on the line.' } });
  await fp('PA2 jobs names the word bank', 'jobs', {}, /the instruction names "(word bank|bank)"/i, { strings: { title: 'Parts of a Plant and Their Functions', instruction: 'Choose a name from the word bank for each job.' } });
  log.push(`  PA control: every shipped face instruction names only its own apparatus (asserted above)`);
  // data: corn never allows flower (an ear of corn IS an inflorescence)
  const n = JSON.parse(JSON.stringify(N)); n.EAT.find((x) => x.noun === 'corn').allow.push('flower');
  judge('P15 corn allows flower', validateNeutral(n), /corn: allows flower/);
}

async function main() {
  const quick = process.argv.includes('--quick');
  const banks = bankMod.PLANTS;
  const N = bankMod.PLANTS_NEUTRAL;
  freeClaim.selfTest();
  // 0. primitive gate
  { const before = console.log; const lines = []; console.log = (...a) => lines.push(a.join(' ')); let p = false; try { p = figureGate.main(); } finally { console.log = before; } ok(p, 'qa/verify-plant-figure.js FAILED:\n    ' + lines.slice(-6).join('\n    ')); console.log('plant-figure gate: ' + (lines.find((l) => /^(PASS|FAIL)/.test(l)) || '?')); }
  // 1-2. data
  const nf = validateNeutral(N); nf.forEach((x) => ok(false, 'neutral: ' + x)); ok(true, 'neutral');
  console.log(`neutral: ${nf.length} findings (EAT ${N.EAT.length}, NON_NEEDS ${N.NON_NEEDS.length})`);
  for (const loc of Object.keys(banks)) { const bf = validateBank(banks[loc], loc); bf.forEach((x) => ok(false, x)); console.log(`bank ${loc}: ${bf.length} findings`); }
  ok(banks.en.strings.base.title === TYPE.i18n.en.title && banks.en.strings.base.instruction === TYPE.i18n.en.instruction, 'the bank\'s base strings ≠ the spec\'s i18n.en');
  // unauthored locale refuses
  {
    const U = require('./b5-unauthored.js');
    const p = U.refusalProbe('plants', 'sv', () => TYPE.build({ difficulty: 2, locale: 'sv' }, { rng: makeRng('seed-1') }));
    ok(U.refused(p.hidden, /no sv block/), `an unauthored sv REFUSES (got ${p.hidden})`);
    ok(!U.refused(p.real, /no sv block/), `poison — the authored sv page passed the unauthored-refusal check (got ${p.real})`);
  }
  // node sweep: numbering / bank tells, locale-neutral draw
  {
    let tells = 0, bankTells = 0; const picks = new Set();
    const synth = { ...banks.en, partWords: { root: 'Wurzeln', stem: 'Stängel', leaf: 'Blatt', flower: 'Blüte', fruit: 'Frucht', seed: 'Samen' } };
    for (let s = 1; s <= 400; s++) {
      const r = TYPE._buildWith(banks.en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('G1-376-sweep-' + s) });
      const r2 = TYPE._buildWith(synth, TYPE.difficulty[2], { locale: 'de' }, { rng: makeRng('G1-376-sweep-' + s) });
      if (JSON.stringify([r.meta.numbers, r.meta.anchorPick, r.meta.bank]) !== JSON.stringify([r2.meta.numbers, r2.meta.anchorPick, r2.meta.bank])) ok(false, `seed ${s}: the draw is not locale-neutral`);
      const byY = r.meta.parts.slice().sort((a, b) => P.ANCHORS[a][r.meta.anchorPick[a]].slot.y - P.ANCHORS[b][r.meta.anchorPick[b]].slot.y).map((p) => r.meta.numbers[p]).join();
      if (byY === '1,2,3,4,5,6' || byY === '6,5,4,3,2,1') tells++;
      const tagOrder = r.meta.parts.slice().sort((a, b) => r.meta.numbers[a] - r.meta.numbers[b]);
      if (r.meta.bank.join() === tagOrder.join() || r.meta.bank.join() === tagOrder.slice().reverse().join()) bankTells++;
      picks.add(JSON.stringify(r.meta.anchorPick));
    }
    ok(tells === 0, `node sweep: ${tells} y-sorted numberings`); ok(bankTells === 0, `node sweep: ${bankTells} bank orders equal to the tag order`);
    ok(picks.size === 16, `node sweep: ${picks.size} of the 16 anchor combinations drawn`);
    console.log(`node sweep 400 seeds: y-sorted ${tells}, bank tells ${bankTells}, anchor combos ${picks.size}/16`);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  try {
    // 3. renders
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-376-gate-d${d}-en` });
      assertRender(`d${d}`, r, { bank: d !== 3, rowsWant: d === 1 ? 4 : 6, rowH: d === 1 ? 72 : 64, fill: 'one', figureMax: TYPE.difficulty[d].figureMax });
      console.log(`render d${d}: fill ${(100 * (r.m.ink - r.m.body.top) / r.m.body.h).toFixed(1)} % gap ${r.m.sparseGap == null ? '-' : r.m.sparseGap.toFixed(0)} verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)} plant ${r.m.plant.h.toFixed(0)} rows ${r.m.rows.length}x${r.m.rows[0] && r.m.rows[0].h.toFixed(0)} lowest ${r.m.lowest.toFixed(0)} foot ${r.m.foot.toFixed(0)}`);
    }
    for (const k of Object.keys(LONG)) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-376-gate-d2-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d2 long chrome ${k}`, r, { body: LONG[k].body });
      console.log(`render d2 long chrome ${k}: fill ${(100 * (r.m.ink - r.m.body.top) / r.m.body.h).toFixed(1)} % gap ${r.m.sparseGap.toFixed(0)} verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)} (head ${r.m.headH.toFixed(0)}) lowest ${r.m.lowest.toFixed(0)} foot ${r.m.foot.toFixed(0)}`);
    }
    {
      const de = { ...banks.en, partWords: { root: 'Wurzeln', stem: 'Stängel', leaf: 'Blatt', flower: 'Blüte', fruit: 'Frucht', seed: 'Samen' } };
      const r = await renderWith(page, withBlock(de), { difficulty: 2, baseName: 'G1-376-gate-d2-widest-bank-fi-chrome', strings: LONG.fi });
      r.verify = r.verify.filter((x) => !/bank word \w+ prints/.test(x));   // the synthetic block is not the en bank (expected)
      assertRender('d2 widest bank + fi chrome', r, { body: 677 });
      console.log(`render widest bank: ${r.m.words.map((w) => w.text).join(' ')} banner ${r.m.banner.w.toFixed(0)} px one row ${new Set(r.m.words.map((w) => w.top)).size === 1}`);
    }
    // 4. sweep
    const pages = new Set();
    for (let s = 1; s <= (quick ? 5 : 20); s++) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-376-gate-sweep-${s}`, seedEpoch: s });
      ok(!r.verify.length && !r.lints.length, `sweep ${s}: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${r.lints.length}`);
      pages.add(r.m.stamps.numbers + r.m.stamps.picks + r.m.words.map((w) => w.id).join());
    }
    ok(pages.size === (quick ? 5 : 20), `sweep: ${pages.size} distinct pages of ${quick ? 5 : 20}`);
    console.log(`sweep: ${pages.size} distinct pages`);

    // 5. poisons — data
    const clone = (o) => JSON.parse(JSON.stringify(o));
    const nPoison = (fn) => { const n = clone(N); fn(n); return validateNeutral(n); };
    judge('P1 carrot allows leaf', nPoison((n) => { n.EAT.find((x) => x.noun === 'carrot').allow.push('leaf'); }), /carrot: a root item allows leaf/);
    judge('P2 celery one distractor', nPoison((n) => { n.EAT.find((x) => x.noun === 'celery').allow = ['root']; }), /celery: allow has 1 distractors/);
    judge('P3 asparagus', nPoison((n) => { n.EAT.push({ theme: 'vegetables', noun: 'asparagus', part: 'stem', allow: ['root', 'fruit'], picOpened: true }); }), /asparagus: a blocked noun/);
    judge('P4 bell_pepper', nPoison((n) => { n.EAT.push({ theme: 'vegetables', noun: 'bell_pepper', part: 'fruit', allow: ['root', 'leaf'], picOpened: true }); }), /bell_pepper: (a blocked noun|the picture does not resolve|no vocab key)/);
    const locBlock = (loc, words, extra = {}) => ({ ...clone(banks.en), partWords: words, forbidden: [], ...extra });
    const DE = { root: 'Wurzel', stem: 'Stängel', leaf: 'Blatt', flower: 'Blüte', fruit: 'Frucht', seed: 'Samen' };
    const deFlower = { petal: 'Kronblatt', sepal: 'Kelchblatt', stamen: 'Staubblatt', pistil: 'Stempel', stalk: 'Stiel' };
    const deCtl = locBlock('de', DE, { flowerWords: deFlower, jobs: { root: 'nimmt Wasser aus der Erde auf', stem: 'hält die Pflanze aufrecht', leaf: 'macht mit Sonnenlicht Nahrung', flower: 'lockt mit bunten Farben Bienen an', seed: 'kann zu einer neuen Pflanze wachsen' }, partStems: ['Wurzeln', 'Blätter', 'Blüten', 'Früchte', 'Pflanzenteil'] });
    const deCtlF = validateBank(deCtl, 'de'); log.push(`  control de draft: ${deCtlF.length} findings${deCtlF.length ? ' — ' + deCtlF.slice(0, 3).join(' | ') : ''}`); ok(!deCtlF.length, 'the de control draft must be clean');
    judge('P5 de flower Blume', validateBank({ ...deCtl, partWords: { ...DE, flower: 'Blume' } }, 'de'), /partWords\.flower "Blume" is a forbidden/);
    judge('P6 es fruit fruta', validateBank(locBlock('es', { root: 'raíz', stem: 'tallo', leaf: 'hoja', flower: 'flor', fruit: 'fruta', seed: 'semilla' }, { flowerWords: { petal: 'pétalo', sepal: 'sépalo', stamen: 'estambre', pistil: 'pistilo', stalk: 'tallo' } }), 'es'), /partWords\.fruit "fruta" is a forbidden/);
    judge('P7 sv leaf === root', validateBank(locBlock('sv', { root: 'blad', stem: 'stjälk', leaf: 'blad', flower: 'blomma', fruit: 'frukt', seed: 'frö' }), 'sv'), /partWords\.root === partWords\.leaf "blad"/);
    judge('P8 en flower job names seed', validateBank({ ...clone(banks.en), jobs: { ...banks.en.jobs, flower: 'makes the seeds' } }, 'en'), /jobs\.flower "makes the seeds" contains the part word/);
    judge('P9 fi root job names juuri', validateBank(locBlock('fi', { root: 'juuri', stem: 'varsi', leaf: 'lehti', flower: 'kukka', fruit: 'hedelmä', seed: 'siemen' }, { jobs: { ...banks.en.jobs, root: 'juuri ottaa vettä' } }), 'fi'), /jobs\.root "juuri ottaa vettä" contains the part word "juuri"/);
    judge('P10 de decoy in Wurzelblatt', validateBank({ ...deCtl, flowerWords: { ...deFlower, petal: 'Wurzelblatt' } }, 'de'), /decoy partWords\.root "Wurzel" is inside flowerWords\.petal/);
    judge('P11 water bottle as a non-need', nPoison((n) => { n.NON_NEEDS.push({ theme: 'At the Supermarket', noun: 'water', picOpened: true }); }), /NON_NEEDS At the Supermarket\/water: a need or a need-cue/);
    judge('P12 bare "Life Cycle" title', validateBank({ ...clone(banks.en), strings: { ...banks.en.strings, cycle: { ...banks.en.strings.cycle, title: 'Life Cycle' } } }, 'en'), /strings\.cycle title "Life Cycle" carries a bare life-cycle head/);
    judge('P13 base "Circle the parts"', validateBank({ ...clone(banks.en), strings: { ...banks.en.strings, base: { ...banks.en.strings.base, instruction: 'Circle the parts of the plant.' } } }, 'en'), /strings\.base instruction names "Circle"/);
    judge('P14 EAT picOpened false', nPoison((n) => { n.EAT[0].picOpened = false; }), /carrot: picOpened is not true/);

    // 5. poisons — render
    const rp = async (name, type, re, opts = {}) => { const r = await renderWith(page, type, { difficulty: 2, baseName: 'G1-376-gate-poison-' + name.split(' ')[0], ...opts }); judge(name, [...r.verify, ...r.lints.map((l) => JSON.stringify(l)), ...(opts.extra ? opts.extra(r) : [])], re); };
    {
      // PR7: a y-sorted numbering through the gate seam
      const d = TYPE.difficulty[2];
      const picks = { root: 0, stem: 0, leaf: 0, flower: 0 };
      void picks;
      const sorted = await (async () => { const r0 = TYPE._buildWith(banks.en, d, { locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: 2, seedEpoch: 1 })) }); const ap = r0.meta.anchorPick; const byY = d.parts.slice().sort((a, b) => P.ANCHORS[a][ap[a]].slot.y - P.ANCHORS[b][ap[b]].slot.y); return Object.fromEntries(byY.map((p, i) => [p, i + 1])); })();
      await rp('PR7 y-sorted numbering', withBlock(banks.en, { forceNumbers: sorted }), /tag numbers run top-to-bottom/);
    }
    {
      // PR8: a thread end moved 20 px off its anchor (doctored markup)
      const t = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); r.bodyHtml = r.bodyHtml.replace(/(<line [^>]*x2=")([\d.]+)("[^>]*data-lcs-thread="stem")/, (m, a, x, b) => a + (+x + 20) + b); return r; } };
      await rp('PR8 thread off anchor', t, /stem: thread ends [\d.]+ px from the anchor/);
    }
    {
      // PR9: the root anchor lifted above the soil line (the primitive table, both anchors)
      const A = P.ANCHORS.root, save = A.map((a) => ({ ...a }));
      A.forEach((a) => { a.y = 430; });
      try { await rp('PR9 root above soil', TYPE, /root anchor above the soil line/); } finally { save.forEach((s, i) => Object.assign(A[i], s)); }
    }
    {
      // PS: the SPARSE poison — the plant frozen at its minimum and the slack spread BETWEEN the bank and the stage (space-between) at the 814 chrome
      const centred = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); const h = r.bodyHtml.replace(/grid-template-rows:auto minmax\((\d+)px,\d+px\);align-content:start/, 'grid-template-rows:auto $1px;align-content:space-between'); if (h === r.bodyHtml) throw new Error('PS: the base root style changed shape'); r.bodyHtml = h; return r; } };
      const r = await renderWith(page, centred, { difficulty: 2, baseName: 'G1-376-gate-poison-PS' });
      const f = [];
      const before = fails.length; assertRender('PS centred stage', r); f.push(...fails.splice(before));
      judge('PS centred stage (sparse)', f, /SPARSE — \d+ px blank band/);
      log.push(`  PS control: the shipped d2 gap ${(await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-376-gate-ps-control' })).m.sparseGap.toFixed(0)} px (<= ${SPARSE_MAX})`);
    }
    {
      // base FILL, poisoned BOTH ways (base review 2026-09-23): (a) the plant frozen at its 592 minimum ends high at the
      // 814 chrome (the pre-review page, ~83 %); (b) the plant forced past the 667 fi body leaves the page.
      const frozen = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); const h = r.bodyHtml.replace(/minmax\((\d+)px,\d+px\);align-content:start/, '$1px;align-content:start'); if (h === r.bodyHtml) throw new Error('FL: the base root style changed shape'); r.bodyHtml = h; return r; } };
      for (const d of [2, 3]) {
        const r = await renderWith(page, frozen, { difficulty: d, baseName: `G1-376-gate-poison-FL-d${d}` });
        const before = fails.length; assertRender(`FL d${d}`, r, { bank: d !== 3, fill: 'one', figureMax: TYPE.difficulty[d].figureMax }); const f = fails.splice(before);
        judge(`FL-d${d} plant frozen at its minimum (content ends high at 814)`, f, /FILL — the content ends at/);
      }
      const grown = { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); const h = r.bodyHtml.replace(/minmax\((\d+)px,\d+px\);align-content:start/, 'minmax(640px,640px);align-content:start'); if (h === r.bodyHtml) throw new Error('FG: the base root style changed shape'); r.bodyHtml = h; return r; } };
      const r = await renderWith(page, grown, { difficulty: 2, baseName: 'G1-376-gate-poison-FG', strings: LONG.fi });
      const before = fails.length; assertRender('FG', r, { figureMax: 700 }); const f = [...fails.splice(before), ...r.verify];
      judge('FG plant grown past the 667 fi body', f, /FILL overflow|reaches the footer/);
      const c = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-376-gate-fill-control' });
      log.push(`  FILL control: the shipped d2 ends at ${(100 * (c.m.ink - c.m.body.top) / c.m.body.h).toFixed(1)} % of the ${c.m.body.h.toFixed(0)} px body (>= ${BASE_FILL_MIN * 100} %)`);
    }
    {
      // PR13: a two-row bank at the fi 677 chrome
      const wide = { ...banks.en, partWords: { root: 'Wurzelwerkteile', stem: 'Stängelabschnitt', leaf: 'Laubblattfläche', flower: 'Blütenköpfchen', fruit: 'Fruchtkapselhülle', seed: 'Samenkörnchen' } };
      await rp('PR13 two-row bank', withBlock(wide), /word bank wraps|footer|reaches the footer|overflow/i, { strings: LONG.fi });
    }
    // 6. faces
    await faceSection(page, judge, log, quick, banks);
  } finally { await browser.close(); }

  console.log('poison:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, validateNeutral };
