#!/usr/bin/env node
/**
 * verify-b5-animal-life-cycles.js — the G1-377 `animal-life-cycles` family gate (design
 * docs/worksheet-gen/b5-designs/G1-377-animal-life-cycles.md §5; nt10-E build brief deliverable 4).
 * BASE build (2026-09-23): sections 0-5 below; the face renders / face poisons (PR5, PR6,
 * PR8-PR14) join in Phase E with the faces.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-animal-life-cycles.js [--quick]
 *
 * 0. the primitive gate (qa/verify-life-stage.js) must PASS (PR7 "froglet stub dropped" is its L1).
 * 1. NEUTRAL — validateNeutral(ALC) against this gate's OWN biology: STAGES / STAGE_COUNT / YOUNG /
 *    SORT_EXCLUDE / COMPARE truths, ARRANGEMENTS === the set this gate RE-ENUMERATES over all 24
 *    corner placements with the two tell tests (rule 4), LIBRARY_PICTURES empty (rule 12).
 * 2. BANK — validateBank(block, loc) (exported; tools/validate-b5-draft.js runs it on every panel
 *    draft): §5 rules 1-12. Rule 6's two-line measurement is wired in section 3 (en statements at
 *    359 px Nunito 700 17 px, in Chromium).
 * 3. RENDER through the REAL pipeline (render/render-instance.js, file:// fonts): d1 / d2 / d3 en,
 *    then d2 under the 722 chrome (3-line title + 3-line instruction) AND the fi 4-line-title chrome;
 *    asserts verify() empty, qa/lints.js clean and the floors ITSELF (lenses = config >= 132 at d2,
 *    boxes 56, given numeral 32 px, loop lens 104, G1 44); every rendered lens passes the primitive's
 *    part counts; SPARSE: no blank band > 40 px between consecutive blocks (body top -> plate ->
 *    rule -> loop row) at every chrome; body scrollWidth <= clientWidth; the lowest element clears
 *    the footer.
 * 4. SWEEP — every one of the 4 ARRANGEMENTS forced and rendered (tethers disjoint, on their spots,
 *    tell-free, verify-clean); 20 seeds x d2 rendered (verify-clean; all 4 arrangements appear —
 *    the base has exactly 4 legal pages, so "20 distinct pages" is unreachable by construction);
 *    a 400-seed node sweep: locale-neutral draw, pooled share per arrangement, and the PER-PAGE
 *    answer placement (every corner holds a distinct rank, every open answer 2..4 in its own corner,
 *    the given egg on each of the 4 corners across the set); an unauthored locale REFUSES.
 * 5. POISON — each must FAIL for its OWN reason (no fail = SILENT, another = WRONG REASON; both exit 1);
 *    the correct EN bank is the control. §5 P1-P12 + base render PR1-PR4, PR15 + PS (sparse).
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng } = require('../lib/rng.js');
const { vocab } = require('../lib/b2-common.js');
const freeClaim = require('../../lib/free-claim.js');
const { answerBox } = require('../templates/components.js');
const bankMod = require('../data/b5/animal-life-cycles.js');
const stageGate = require('./verify-life-stage.js');
const TAX = require('../../../frontend/config/topics-taxonomy.json');
const TYPE = require('../types/g1/G1-377-butterfly-life-cycle.js');

const OUT = path.join(__dirname, '..', 'out', 'dev', 'G1-377-gate');
const ID = 'G1-377';
const FACES = ['frog-cut-paste', 'label', 'metamorphosis', 'compare', 'next'];
const BAND = { 'G1-377': 'G1', 'frog-cut-paste': 'G1', next: 'G1', label: 'G2', metamorphosis: 'G2', compare: 'G3' };
const WORKSHEET_WORD = /worksheet|arbeitsblatt|werkblad|arbetsblad|arbejdsark|arbeidsark|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med fasit|vastauksineen/i;
const SPARSE_MAX = 40;

/* ---- this gate's OWN ground truth (never read from the bank) */
const BIOLOGY = { butterfly: ['egg', 'larva', 'pupa', 'adult'], frog: ['spawn', 'tadpole', 'legged', 'froglet', 'adult'], ladybird: ['egg', 'larva', 'pupa', 'adult'] };
const TRUTH = { egg: 'bf', change: 'bf', pupa: 'b', wings: 'b', sixlegs: 'b', nectar: 'b', tail: 'f', water: 'f', nolegs: 'f', fourlegs: 'f', insects: 'f' };
const YOUNG = ['butterfly.larva', 'butterfly.pupa', 'frog.spawn', 'frog.tadpole', 'frog.legged', 'frog.froglet', 'ladybird.larva', 'ladybird.pupa'];
/** rule 3 floor: the locale's cocoon error */
const FORBIDDEN_FLOOR = { en: ['cocoon'], de: ['Kokon'], es: ['capullo'], pt: ['casulo'], fr: ['cocon'], it: ['bozzolo'], nl: ['cocon'], sv: ['kokong'], da: ['kokon'], no: ['kokong', 'kokon'], fi: [] };
/** rule 8 floor: the bare genre word */
const GENRE_FLOOR = { en: ['life cycle'], de: ['Lebenszyklus'], es: ['ciclo de vida'], pt: ['ciclo de vida'], fr: ['cycle de vie'], it: ['ciclo vitale', 'ciclo di vita'], nl: ['levenscyclus'], sv: ['livscykel'], da: ['livscyklus'], no: ['livssyklus'], fi: ['elämänkierto'] };
/** rule 10, en: per-face bans (word boundaries by Unicode letters, never \b) */
const W = (w) => new RegExp(`(?<!\\p{L})${w}(?!\\p{L})`, 'iu');
const INSTR_BANS_EN = {
  'G1-377': [W('cut'), W('glue'), W('tick'), W('circle'), W('letters?')],
  'frog-cut-paste': [W('write'), W('tick'), W('circle')],
  label: [W('cut'), W('tick'), W('circle')],
  metamorphosis: [W('cut'), W('tick'), W('circle'), W('numbers?')],
  compare: [W('circle'), W('cut'), W('write')],
  next: [W('write'), W('tick'), W('cut')],
};
const INSTR_MUST_EN = { 'frog-cut-paste': [W('cut'), W('glue')] };

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);
const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const wordRe = (w) => new RegExp(`(?<!\\p{L})${esc(w)}(?!\\p{L})`, 'iu');
const startRe = (w) => new RegExp(`(?<!\\p{L})${esc(w)}`, 'iu');

/* ---------------------------------------------------------------- the tell rule, independently */
const POS = ['TL', 'TR', 'BL', 'BR'];
const ORDERS = [['TL', 'TR', 'BL', 'BR'], ['TR', 'TL', 'BR', 'BL'], ['BL', 'BR', 'TL', 'TR'], ['BR', 'BL', 'TR', 'TL'], ['TL', 'BL', 'TR', 'BR'], ['TR', 'BR', 'TL', 'BL'], ['BL', 'TL', 'BR', 'TR'], ['BR', 'TR', 'BL', 'TL']];
function tellFree(A, stages) {
  const R = Object.fromEntries(POS.map((p) => [p, stages.indexOf(A[p]) + 1]));
  if (!(A.TL === 'adult' || A.TR === 'adult')) return false;
  if (ORDERS.some((o) => o.map((p) => R[p]).join() === '1,2,3,4')) return false;
  const ring = ['TL', 'TR', 'BR', 'BL'], e = ring.findIndex((p) => R[p] === 1);
  for (const dir of [1, -1]) if ([0, 1, 2, 3].map((k) => R[ring[(e + dir * k + 8) % 4]]).join() === '1,2,3,4') return false;
  return true;
}
function enumerateArrangements(stages) {
  const out = [];
  const perm = (a, k = 0) => { if (k === a.length) { const A = Object.fromEntries(POS.map((p, i) => [p, a[i]])); if (tellFree(A, stages)) out.push(A); return; } for (let i = k; i < a.length; i++) { [a[k], a[i]] = [a[i], a[k]]; perm(a, k + 1); [a[k], a[i]] = [a[i], a[k]]; } };
  perm(stages.slice());
  return out;
}
const placeKey = (A) => POS.map((p) => A[p]).join(',');

/* ---------------------------------------------------------------- 1. neutral */
function validateNeutral(N) {
  const f = [];
  for (const a of Object.keys(BIOLOGY)) {
    if (!N.STAGES[a] || N.STAGES[a].join() !== BIOLOGY[a].join()) f.push(`STAGES.${a} [${N.STAGES[a]}] ≠ the biology [${BIOLOGY[a]}] (rule 4)`);
    if (N.STAGE_COUNT[a] !== (N.STAGES[a] || []).length) f.push(`STAGE_COUNT.${a} ${N.STAGE_COUNT[a]} ≠ STAGES length (rule 4)`);
  }
  if (Object.keys(N.STAGES).sort().join() !== Object.keys(BIOLOGY).sort().join()) f.push('STAGES animals ≠ butterfly, frog, ladybird');
  if (N.YOUNG.slice().sort().join() !== YOUNG.slice().sort().join()) f.push('YOUNG ≠ the eight young stages');
  if (N.SORT_EXCLUDE.slice().sort().join() !== 'butterfly.egg,ladybird.egg') f.push('SORT_EXCLUDE ≠ the two leaf eggs');
  for (const y of N.YOUNG) if (N.SORT_EXCLUDE.includes(y)) f.push(`YOUNG carries excluded ${y}`);
  const got = new Set(N.ARRANGEMENTS.map(placeKey)), want = new Set(enumerateArrangements(BIOLOGY.butterfly).map(placeKey));
  if (got.size !== N.ARRANGEMENTS.length || [...got].some((k) => !want.has(k)) || [...want].some((k) => !got.has(k))) f.push(`ARRANGEMENTS {${[...got].join(' | ')}} ≠ the re-enumerated tell-free set {${[...want].join(' | ')}} (rule 4)`);
  for (const c of N.COMPARE) {
    const t = (c.truth.includes('butterfly') ? 'b' : '') + (c.truth.includes('frog') ? 'f' : '');
    if (TRUTH[c.id] === undefined) f.push(`COMPARE ${c.id}: an unreviewed statement`);
    else if (TRUTH[c.id] !== t) f.push(`COMPARE ${c.id}: tick truth [${c.truth}] ≠ the biology review`);
  }
  if (N.COMPARE.length !== Object.keys(TRUTH).length) f.push(`COMPARE has ${N.COMPARE.length} statements ≠ 11`);
  if (!Array.isArray(N.LIBRARY_PICTURES) || N.LIBRARY_PICTURES.length) f.push(`LIBRARY_PICTURES not empty [${N.LIBRARY_PICTURES}] (rule 12: one art source)`);
  if (!N.SPAWN_FORM || N.SPAWN_FORM.default !== 'clump') f.push('SPAWN_FORM.default ≠ clump');
  return f;
}

/* ---------------------------------------------------------------- 2. bank */
function animalWords(b, loc) {
  const V = vocab();
  const out = [];
  for (const k of ['butterfly', 'frog', 'ladybug']) { const e = V[k] && V[k][loc]; if (e) out.push(e[0], e[1]); }
  const sw = b.stageWords && b.stageWords.butterfly;
  if (sw && sw.adult) out.push(sw.adult);
  const lw = b.landingWords || {};
  if (lw.frog && lw.frog.adult) out.push(lw.frog.adult);
  if (lw.ladybird && lw.ladybird.adult) out.push(lw.ladybird.adult);
  return [...new Set(out.filter(Boolean).map((x) => low(x, loc)))];
}
function validateBank(b, loc) {
  const f = [];
  const push = (m) => f.push(`${loc}: ${m}`);
  if (!b || typeof b !== 'object') return [`${loc}: no block`];
  const N = bankMod.ALC;
  const lit = (v, what, digitsOk = false) => {
    if (typeof v !== 'string' || !v.trim()) { push(`${what} missing (rule 1)`); return null; }
    if (v !== v.trim()) push(`${what} "${v}" not trimmed (rule 1)`);
    if (/[{}]/.test(v)) push(`${what} "${v}" carries a slot (rule 1)`);
    if (!digitsOk && /\d/.test(v)) push(`${what} "${v}" carries a digit (rule 1)`);
    return v;
  };
  // rule 4 (per locale): exactly the butterfly stage keys
  const sw = (b.stageWords && b.stageWords.butterfly) || {};
  const keys = Object.keys(sw);
  if (keys.slice().sort().join() !== N.STAGES.butterfly.slice().sort().join()) push(`stageWords.butterfly keys [${keys}] ≠ the ${N.STAGES.butterfly.length} biology stages (rule 4: a locale never adds or drops a stage)`);
  for (const a of ['frog', 'ladybird']) { const lw = (b.landingWords && b.landingWords[a]) || {}; if (Object.keys(lw).slice().sort().join() !== N.STAGES[a].slice().sort().join()) push(`landingWords.${a} keys [${Object.keys(lw)}] ≠ its stages (rule 4)`); for (const s of N.STAGES[a]) lit(lw[s], `landingWords.${a}.${s}`); }
  const SW = {};
  for (const s of N.STAGES.butterfly) SW[s] = lit(sw[s], `stageWords.butterfly.${s}`);
  const decoy = lit(b.decoy && b.decoy['frog.tadpole'], 'decoy.frog.tadpole');
  const ST = {};
  for (const c of N.COMPARE) ST[c.id] = lit(b.statements && b.statements[c.id], `statements.${c.id}`);
  lit(b.familyName, 'familyName');
  // rule 2
  const stageLows = N.STAGES.butterfly.map((s) => SW[s] && low(SW[s], loc));
  for (let i = 0; i < stageLows.length; i++) for (let j = i + 1; j < stageLows.length; j++) if (stageLows[i] && stageLows[i] === stageLows[j]) push(`stageWords ${N.STAGES.butterfly[i]} === ${N.STAGES.butterfly[j]} "${SW[N.STAGES.butterfly[i]]}" (rule 2)`);
  if (decoy) { const d = low(decoy, loc); for (const [i, s] of stageLows.entries()) if (s && (s === d || s.includes(d))) push(`the decoy "${decoy}" is (inside) the butterfly stage word ${N.STAGES.butterfly[i]} "${SW[N.STAGES.butterfly[i]]}" (rule 2)`); }
  // rule 3
  const forb = [...(FORBIDDEN_FLOOR[loc] || []), ...(b.forbidden || [])];
  const texts = [...Object.entries(SW).map(([k, v]) => [`stageWords.${k}`, v]), ['decoy', decoy], ...Object.entries(ST).map(([k, v]) => [`statements.${k}`, v])];
  for (const [id, s] of Object.entries(b.strings || {})) texts.push([`strings.${id}.title`, s && s.title], [`strings.${id}.instruction`, s && s.instruction]);
  for (const [what, v] of texts) { if (!v) continue; for (const w of forb) if (wordRe(low(w, loc)).test(low(v, loc))) push(`${what} "${v}" contains the forbidden "${w}" (rule 3)`); }
  // rule 5 + 6
  const aw = animalWords(b, loc);
  const cap = loc === 'fi' ? 95 : 80;
  for (const [id, s] of Object.entries(ST)) {
    if (!s) continue;
    for (const w of aw) if (startRe(w).test(low(s, loc))) push(`statements.${id} "${s}" names an animal ("${w}", rule 5)`);
    if (s.length > cap) push(`statements.${id} ${s.length} chars > ${cap} (rule 6)`);
  }
  // rule 7
  const drop = new Set(b.drop || []);
  for (const x of drop) if (!N.COMPARE.some((c) => c.id === x)) push(`drop names an unknown statement "${x}"`);
  for (const cls of ['butterfly', 'frog']) { const n = N.COMPARE.filter((c) => !drop.has(c.id) && c.truth.length === 1 && c.truth[0] === cls).length; if (n < 3) push(`the ${cls} class keeps ${n} statements after drops (< 3, rule 7)`); }
  if (N.COMPARE.filter((c) => !drop.has(c.id) && c.truth.length === 2).length < 2) push('the both class keeps < 2 statements (rule 7)');
  // rules 8-10: strings
  const S = b.strings || {};
  const want = [ID, ...FACES];
  if (Object.keys(S).slice().sort().join() !== want.slice().sort().join()) push(`strings ids [${Object.keys(S)}] ≠ [${want}] (rule 9)`);
  const genre = [...(GENRE_FLOOR[loc] || []), ...(b.genreBare || [])].map((g) => low(g, loc));
  const ssName = TAX.axes['exercise-type']['science-sequence'];
  const ssBad = [ssName.name[loc], ssName.slug[loc]].filter(Boolean).map((x) => low(x, loc));
  const byBand = {};
  for (const id of want) {
    const s = S[id]; if (!s) { push(`strings.${id} missing (rule 9)`); continue; }
    const t = lit(s.title, `strings.${id}.title`) || '', ins = lit(s.instruction, `strings.${id}.instruction`, id === ID) || '';
    if (t.length > 70) push(`strings.${id} title ${t.length} chars > 70 (rule 9)`);
    if (WORKSHEET_WORD.test(t)) push(`strings.${id} title carries a worksheet word (rule 9)`);
    if (ssBad.includes(low(t, loc))) push(`strings.${id} title "${t}" equals the science-sequence name (rule 8)`);
    for (const x of [t, ins]) {
      const lx = low(x, loc);
      for (const g of genre) if (lx.includes(g) && !aw.some((w) => startRe(w).test(lx))) push(`strings.${id} "${x}" carries the bare genre "${g}" without an animal (rule 8)`);
      const h = freeClaim.hit(x); if (h) push(`strings.${id} claims free ("${h}", rule 10)`);
      if (ANSWERS_WORD.test(x)) push(`strings.${id} promises answers (rule 10)`);
    }
    if (ins.length > 150) push(`strings.${id} instruction ${ins.length} chars > 150 (rule 10)`);
    if (/[.!?]\s+\p{Lu}/u.test(ins)) push(`strings.${id} instruction is more than one sentence (rule 10)`);
    const bans = loc === 'en' ? INSTR_BANS_EN[id] : ((b.instructionBans && b.instructionBans[id]) || []).map(wordRe);
    for (const re of bans || []) if (re.test(ins)) push(`strings.${id} instruction names "${ins.match(re)[0]}" — not apparatus of this face (rule 10)`);
    if (loc === 'en') for (const re of INSTR_MUST_EN[id] || []) if (!re.test(ins)) push(`strings.${id} instruction lacks ${re} (rule 10)`);
    if (id === ID) {
      if (!b.pictureWord || !startRe(low(b.pictureWord, loc)).test(low(ins, loc))) push(`strings.${ID} instruction does not name the "${b.pictureWord}" (the number of the PICTURE after the adult, rule 10)`);
    }
    (byBand[BAND[id]] = byBand[BAND[id]] || []).push([id, low(t, loc)]);
  }
  for (const list of Object.values(byBand)) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) if (list[i][1] === list[j][1]) push(`strings.${list[i][0]} / ${list[j][0]} share a title in one band (rule 9)`);
  const toks = want.filter((id) => S[id] && S[id].title).map((id) => [id, new Set(low(S[id].title, loc).split(/[^\p{L}]+/u).filter(Boolean))]);
  for (let i = 0; i < toks.length; i++) for (let j = i + 1; j < toks.length; j++) { const a = toks[i][1], c = toks[j][1]; if ([...a].every((x) => c.has(x)) && [...c].every((x) => a.has(x))) push(`strings.${toks[i][0]} / ${toks[j][0]} titles share every token (rule 9)`); }
  if (b.familyName) {
    if (ssBad.includes(low(b.familyName, loc))) push(`familyName "${b.familyName}" equals the science-sequence name (rule 8)`);
    for (const id of want) if (S[id] && low(S[id].title, loc) === low(b.familyName, loc)) push(`familyName equals the ${id} title (rule 9)`);
  }
  // rule 11
  for (const [what, v] of [...Object.entries(SW).map(([k, v]) => [`stageWords.${k}`, v]), ['decoy', decoy]]) {
    if (!v) continue;
    const capd = /^\p{Lu}/u.test(v);
    if (loc === 'de' && !capd) push(`${what} "${v}": a German noun is capitalised (rule 11)`);
    if (loc !== 'de' && capd) push(`${what} "${v}": capitalised (a vocab citation form leaking in, rule 11)`);
  }
  // rule 12
  if (!['clump', 'string'].includes(b.spawnForm)) push(`spawnForm "${b.spawnForm}" (clump | string, rule 12)`);
  if (b.spawnForm === 'string' && loc !== 'pt') push(`spawnForm "string" outside pt (rule 12)`);
  if (N.LIBRARY_PICTURES.length) push('LIBRARY_PICTURES not empty (rule 12)');
  return f;
}

/* ---------------------------------------------------------------- 3. render */
async function renderWith(page, type, { difficulty = 2, baseName, strings, seedEpoch, locale = 'en' }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="G1-377"]');
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot');
    const blocks = root ? [...root.children].map((c) => rect(c)) : [];
    const gaps = [];
    if (root && blocks.length) {
      gaps.push(blocks[0].top - body.getBoundingClientRect().top);
      for (let i = 1; i < blocks.length; i++) gaps.push(blocks[i].top - blocks[i - 1].bottom);
    }
    const lensSvgs = root ? [...root.querySelectorAll('[data-lcs-lens] svg[data-lcs-prim="life-stage"]')].map((s) => ({ figure: s.dataset.lcsFigure, size: +s.dataset.lcsSize, html: s.outerHTML, w: s.getBoundingClientRect().width })) : [];
    const given = root ? [...root.querySelectorAll('[data-lcs-given]')].map((g) => parseFloat(getComputedStyle(g).fontSize)) : [];
    return {
      body: body ? rect(body) : null, foot: foot ? rect(foot).top : 0,
      bodyScroll: body ? body.scrollWidth - body.clientWidth : 0,
      blocks, gaps, lensSvgs, given,
      boxes: root ? [...root.querySelectorAll('[data-lcs-box]')].map((b) => rect(b).w) : [],
      lowest: Math.max(0, ...[...(root ? root.querySelectorAll('*') : [])].map((e) => e.getBoundingClientRect().bottom)),
      arrangement: root && root.querySelector('[data-lcs-plate]') ? root.querySelector('[data-lcs-plate]').dataset.lcsArrangement : null,
    };
  });
  return { out, m, verify: out.qa.verify, lints: out.qa.lints };
}
function assertRender(name, r, { d, body } = {}) {
  ok(!r.verify.length, `${name}: verify ${JSON.stringify(r.verify.slice(0, 4))}`);
  ok(!r.lints.length, `${name}: lints ${JSON.stringify(r.lints.slice(0, 4))}`);
  const m = r.m;
  const plateLens = m.lensSvgs.filter((x) => x.size === d.lensD);
  ok(plateLens.length === 4 && plateLens.every((x) => Math.abs(x.w - d.lensD) < 0.6), `${name}: plate lenses not 4 x ${d.lensD} px`);
  ok(d.lensD >= 124 && m.lensSvgs.every((x) => x.w >= 90), `${name}: a lens under the 90 px primitive floor`);
  if (d.loop) ok(m.lensSvgs.some((x) => x.size === d.loopLensD && x.figure === 'life-butterfly-adult'), `${name}: the loop lens is not the ${d.loopLensD} px adult`);
  ok(m.boxes.length === (d.loop ? 5 : 4) && m.boxes.every((w) => Math.abs(w - d.boxPx) < 0.6 && w >= 44), `${name}: boxes ${m.boxes.map((w) => w.toFixed(0))} ≠ ${d.loop ? 5 : 4} x ${d.boxPx}`);
  ok(m.given.length === d.anchors.length && m.given.every((px) => px >= 32 - 0.01), `${name}: given numerals ${m.given} (want ${d.anchors.length} x 32 px)`);
  for (const l of m.lensSvgs) { const [, a, s] = /life-(\w+)-(\w+)/.exec(l.figure); stageGate.checkStage(l.html, `${a}.${s}`, l.size).forEach((x) => ok(false, `${name}: rendered lens ${x}`)); }
  ok(m.bodyScroll <= 0.5, `${name}: the body scrolls horizontally (${m.bodyScroll})`);
  ok(m.lowest <= m.foot + 0.6, `${name}: content reaches the footer (${m.lowest.toFixed(0)} > ${m.foot.toFixed(0)})`);
  if (body) ok(m.body.h <= body + 0.6, `${name}: body ${m.body.h.toFixed(0)} px — the fixture did not squeeze it to <= ${body}`);
  const worst = Math.max(...m.gaps);
  ok(m.gaps.length >= 1 && worst <= SPARSE_MAX && Math.min(...m.gaps) >= -0.5, `${name}: SPARSE — a ${worst.toFixed(0)} px blank band between consecutive blocks (> ${SPARSE_MAX}; slack must fall below the content) [${m.gaps.map((g) => g.toFixed(0))}]`);
}

const LONG = {
  de: { title: 'Die Entwicklung des Schmetterlings: vom Ei über die Raupe bis zum Falter', instruction: 'Das Ei ist 1: Schreibe 2, 3 und 4 in die Kästchen, so wie das Tier wächst, und in das letzte Kästchen die Nummer des Bildes, das nach dem Schmetterling kommt, ganz sorgfältig.', body: 722 },
  fi: { title: 'Perhosen kehitysvaiheet: munasta toukaksi, toukasta koteloksi ja kotelosta perhoseksi kasvin lehdillä ja kukan päällä', instruction: 'Muna on 1: kirjoita ruutuihin 2, 3 ja 4 sitä mukaa kuin eläin kasvaa, ja viimeiseen ruutuun sen kuvan numero, joka tulee perhosen jälkeen, huolellisesti ja tarkasti.', body: 677 },
};
function withCfg(extra = {}, block = bankMod.ANIMAL_LIFE_CYCLES.en) {
  return { ...TYPE, build({ difficulty }, ctx) { return this._buildWith(block, { ...this.difficulty[difficulty], ...extra }, { locale: 'en' }, ctx); } };
}
function doctored(fn) { return { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); r.bodyHtml = fn(r.bodyHtml); return r; } }; }

/** A realistic non-en control draft (the design's §1 proposals) for the rule poisons. */
function draft(loc, over = {}) {
  const en = JSON.parse(JSON.stringify(bankMod.ANIMAL_LIFE_CYCLES.en));
  const P = {
    de: { sw: ['Ei', 'Raupe', 'Puppe', 'Schmetterling'], decoy: 'Kaulquappe', frog: 'Frosch', lady: 'Marienkäfer', pic: 'Bild', fam: 'Entwicklung der Tiere', stmtIt: 'Es schlüpft aus einem Ei.' },
    pt: { sw: ['ovo', 'lagarta', 'crisálida', 'borboleta'], decoy: 'girino', frog: 'sapo', lady: 'joaninha', pic: 'figura', fam: 'Ciclos de vida dos animais', stmtIt: 'Nasce de um ovo.' },
    sv: { sw: ['ägg', 'larv', 'puppa', 'fjäril'], decoy: 'grodyngel', frog: 'groda', lady: 'nyckelpiga', pic: 'bild', fam: 'Djurens livscykler', stmtIt: 'Det kläcks ur ett ägg.' },
    fi: { sw: ['muna', 'toukka', 'kotelo', 'perhonen'], decoy: 'nuijapää', frog: 'sammakko', lady: 'leppäkerttu', pic: 'kuva', fam: 'Eläinten kehitysvaiheet', stmtIt: 'Se kuoriutuu munasta.' },
    fr: { sw: ['œuf', 'chenille', 'chrysalide', 'papillon'], decoy: 'têtard', frog: 'grenouille', lady: 'coccinelle', pic: 'image', fam: 'Le cycle de vie des animaux', stmtIt: 'Il sort d\'un œuf.' },
  }[loc];
  const b = en;
  b.stageWords.butterfly = { egg: P.sw[0], larva: P.sw[1], pupa: P.sw[2], adult: P.sw[3] };
  b.decoy['frog.tadpole'] = P.decoy;
  b.landingWords.frog.adult = P.frog; b.landingWords.ladybird.adult = P.lady;
  b.pictureWord = P.pic; b.familyName = P.fam; b.forbidden = []; b.genreBare = [];
  // one plain statement per id, animal-free (content is irrelevant to the rule under test)
  for (const [i, k] of Object.keys(b.statements).entries()) b.statements[k] = P.stmtIt.replace(/\.$/, '') + ['', ' heute', ' oft', ' leise', ' gern', ' dort', ' hier', ' schnell', ' langsam', ' früh', ' spät'][i] + '.';
  const T0 = { 'G1-377': `${P.sw[3]} ${P.pic}`, 'frog-cut-paste': `${P.frog} a`, label: `${P.sw[3]} b`, metamorphosis: `${P.lady} c`, compare: `${P.frog} ${P.sw[3]} d`, next: `${P.lady} ${P.frog} e` };
  for (const id of Object.keys(b.strings)) b.strings[id] = { title: T0[id], instruction: id === 'G1-377' ? `1, 2, 3 ${P.pic}.` : `${P.pic} ${id}.` };
  b.instructionBans = {};
  return Object.assign(b, over);
}

async function main() {
  const quick = process.argv.includes('--quick');
  const banks = bankMod.ANIMAL_LIFE_CYCLES;
  const N = bankMod.ALC;
  freeClaim.selfTest();
  // 0. primitive gate
  {
    const before = console.log; const lines = []; console.log = (...a) => lines.push(a.join(' '));
    let p = false; try { process.argv.push('--no-sheet'); p = await stageGate.main(); } finally { console.log = before; process.argv.pop(); }
    ok(p, 'qa/verify-life-stage.js FAILED:\n    ' + lines.slice(-8).join('\n    '));
    console.log('life-stage gate: ' + (lines.find((l) => /^(PASS|FAIL)/.test(l)) || '?'));
  }
  // 1-2. data
  const nf = validateNeutral(N); nf.forEach((x) => ok(false, 'neutral: ' + x)); ok(true, 'neutral');
  console.log(`neutral: ${nf.length} findings (ARRANGEMENTS re-enumerated: ${enumerateArrangements(BIOLOGY.butterfly).map(placeKey).join(' | ')})`);
  for (const loc of Object.keys(banks)) { const bf = validateBank(banks[loc], loc); bf.forEach((x) => ok(false, x)); console.log(`bank ${loc}: ${bf.length} findings`); }
  ok(banks.en.strings[ID].title === TYPE.i18n.en.title && banks.en.strings[ID].instruction === TYPE.i18n.en.instruction, 'the bank\'s G1-377 strings ≠ the spec\'s i18n.en');
  for (const loc of ['de', 'pt', 'sv', 'fi', 'fr']) { const cf = validateBank(draft(loc), loc); ok(!cf.length, `the synthetic ${loc} control draft must be clean: ${cf.slice(0, 3).join(' | ')}`); }
  { let m = null; try { TYPE.build({ difficulty: 2, locale: 'sv' }, { rng: makeRng('seed-1') }); } catch (e) { m = e.message; } ok(m && /no sv block|refuse/.test(m), `an unauthored sv REFUSES (got ${m})`); }
  // node sweep: locale-neutral, pooled share, per-page answer placement
  {
    const share = {}; const eggAt = new Set(); let perPageBad = 0;
    const synth = draft('de');
    for (let s = 1; s <= 400; s++) {
      const r = TYPE._buildWith(banks.en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('G1-377-sweep-' + s) });
      const r2 = TYPE._buildWith(synth, TYPE.difficulty[2], { locale: 'de' }, { rng: makeRng('G1-377-sweep-' + s) });
      if (r.meta.arrangement !== r2.meta.arrangement) ok(false, `seed ${s}: the draw is not locale-neutral`);
      share[r.meta.arrangement] = (share[r.meta.arrangement] || 0) + 1;
      const P = r.meta.placement, ranks = POS.map((p) => BIOLOGY.butterfly.indexOf(P[p]) + 1);
      const open = POS.filter((p) => !TYPE.difficulty[2].anchors.includes(P[p]));
      if (new Set(ranks).size !== 4 || open.length !== 3 || new Set(open).size !== 3 || !tellFree(P, BIOLOGY.butterfly)) perPageBad++;
      eggAt.add(POS.find((p) => P[p] === 'egg'));
    }
    ok(perPageBad === 0, `node sweep: ${perPageBad} pages with a repeated / tell answer placement`);
    ok(Object.keys(share).length === 4 && Object.values(share).every((n) => n >= 70), `node sweep: arrangement share ${JSON.stringify(share)} (want all 4, each >= 70 of 400)`);
    ok(eggAt.size === 4, `node sweep: the given egg sits on ${[...eggAt]} (want every corner across the set)`);
    console.log(`node sweep 400 seeds: share ${JSON.stringify(share)}, egg corners ${[...eggAt].join(',')}, per-page placement failures ${perPageBad}`);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  try {
    // rule 6 wired: en statements at 359 px Nunito 700 17 px, <= 2 lines
    {
      const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${require('url').pathToFileURL(path.join(__dirname, '..', 'assets', 'fonts', 'fonts.css')).href}"></head><body>` +
        Object.entries(banks.en.statements).map(([k, s]) => `<div data-k="${k}" style="width:359px;font:700 17px 'Nunito';line-height:22px">${s}</div>`).join('') + '</body></html>';
      require('fs').mkdirSync(OUT, { recursive: true });
      const f = path.join(OUT, 'G1-377-statements.html'); require('fs').writeFileSync(f, html);
      await page.goto(require('url').pathToFileURL(f).href, { waitUntil: 'networkidle0' }); await page.evaluate(() => document.fonts.ready);
      const lines = await page.evaluate(() => [...document.querySelectorAll('[data-k]')].map((d) => [d.dataset.k, Math.round(d.getBoundingClientRect().height / 22)]));
      for (const [k, n] of lines) ok(n <= 2, `rule 6: statements.${k} measures ${n} lines at 359 px (> 2)`);
      console.log(`rule 6 (en, 359 px 17 px): lines ${lines.map(([k, n]) => k + ':' + n).join(' ')}`);
    }
    // 3. renders
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-377-gate-d${d}-en` });
      assertRender(`d${d}`, r, { d: TYPE.difficulty[d] });
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)} gaps [${r.m.gaps.map((g) => g.toFixed(0))}] lowest ${r.m.lowest.toFixed(0)} foot ${r.m.foot.toFixed(0)} arrangement ${r.m.arrangement}`);
    }
    for (const k of Object.keys(LONG)) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-377-gate-d2-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d2 long chrome ${k}`, r, { d: TYPE.difficulty[2], body: LONG[k].body });
      console.log(`render d2 long chrome ${k}: body ${r.m.body.h.toFixed(0)} px (target <= ${LONG[k].body}) gaps [${r.m.gaps.map((g) => g.toFixed(0))}] lowest ${r.m.lowest.toFixed(0)} foot ${r.m.foot.toFixed(0)}`);
    }
    // 4. sweep: every arrangement forced, then the seeds
    for (const A of N.ARRANGEMENTS) {
      const r = await renderWith(page, withCfg({ forceArrangement: A }), { difficulty: 2, baseName: `G1-377-gate-arr-${A.id}` });
      assertRender(`arrangement ${A.id}`, r, { d: TYPE.difficulty[2] });
    }
    console.log(`arrangements: ${N.ARRANGEMENTS.map((a) => a.id).join(' ')} rendered, tethers + tells verified`);
    const seen = new Set();
    for (let s = 1; s <= (quick ? 5 : 20); s++) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-377-gate-sweep-${s}`, seedEpoch: s });
      ok(!r.verify.length && !r.lints.length, `sweep ${s}: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${r.lints.length}`);
      seen.add(r.m.arrangement);
    }
    if (!quick) ok(seen.size === 4, `sweep: ${seen.size} of the 4 arrangements drawn in 20 seeds`);
    console.log(`sweep: ${quick ? 5 : 20} seeds verify-clean, arrangements drawn ${[...seen].sort().join(' ')}`);

    // 5. poisons — data
    const clone = (o) => JSON.parse(JSON.stringify(o));
    const en = banks.en;
    const nPoison = (fn) => { const n = clone(N); fn(n); return validateNeutral(n); };
    judge('P1 en pupa "cocoon"', validateBank({ ...clone(en), stageWords: { butterfly: { ...en.stageWords.butterfly, pupa: 'cocoon' } } }, 'en'), /contains the forbidden "cocoon" \(rule 3\)/);
    judge('P2 pt pupa "casulo"', validateBank(draft('pt', { stageWords: { butterfly: { egg: 'ovo', larva: 'lagarta', pupa: 'casulo', adult: 'borboleta' } } }), 'pt'), /contains the forbidden "casulo" \(rule 3\)/);
    judge('P3 frog legged before tadpole', nPoison((n) => { n.STAGES.frog = ['spawn', 'legged', 'tadpole', 'froglet', 'adult']; }), /STAGES\.frog .* ≠ the biology .* \(rule 4\)/);
    judge('P4 a 5th butterfly stage', validateBank({ ...clone(en), stageWords: { butterfly: { ...en.stageWords.butterfly, prepupa: 'prepupa' } } }, 'en'), /stageWords\.butterfly keys .* \(rule 4/);
    judge('P5 decoy "caterpillar"', validateBank({ ...clone(en), decoy: { 'frog.tadpole': 'caterpillar' } }, 'en'), /the decoy "caterpillar" is \(inside\) the butterfly stage word larva .* \(rule 2\)/);
    { const b = draft('de'); b.strings.compare = { ...b.strings.compare, title: 'Lebenszyklus vergleichen' }; judge('P6 de bare "Lebenszyklus"', validateBank(b, 'de'), /bare genre "lebenszyklus" without an animal \(rule 8\)/); }
    judge('P7 sv familyName = the science-sequence name', validateBank(draft('sv', { familyName: 'Ordningsföljd och livscykler' }), 'sv'), /familyName .* equals the science-sequence name \(rule 8\)/);
    { const b = draft('fi'); b.statements.wings = 'Aikuisella perhonen on siivet.'; judge('P8 fi statement names "perhonen"', validateBank(b, 'fi'), /statements\.wings .* names an animal \("perhonen", rule 5\)/); }
    judge('P9 base instruction without "picture"', validateBank({ ...clone(en), strings: { ...en.strings, [ID]: { ...en.strings[ID], instruction: 'The egg is 1: write 2, 3 and 4 in the boxes as it grows, and in the last box the number that comes after the butterfly.' } } }, 'en'), /does not name the "picture"/);
    judge('P10 base "Cut out the pictures"', validateBank({ ...clone(en), strings: { ...en.strings, [ID]: { ...en.strings[ID], instruction: 'Cut out the pictures and put the number of each picture in its box.' } } }, 'en'), /instruction names "Cut" .* \(rule 10\)/);
    judge('P11 a library picture', nPoison((n) => { n.LIBRARY_PICTURES = ['insects and bugs/caterpillar']; }), /LIBRARY_PICTURES not empty/);
    judge('P12 fr spawnForm "string"', validateBank(draft('fr', { spawnForm: 'string' }), 'fr'), /spawnForm "string" outside pt \(rule 12\)/);

    // 5. poisons — render
    const rp = async (name, type, re, opts = {}) => { const r = await renderWith(page, type, { difficulty: 2, baseName: 'G1-377-gate-poison-' + name.split(' ')[0], ...opts }); const f = [...r.verify, ...r.lints.map((l) => JSON.stringify(l))]; if (opts.assert) { const before = fails.length; assertRender(name, r, { d: TYPE.difficulty[2] }); f.push(...fails.splice(before)); } judge(name, f, re); };
    await rp('PR1 clockwise-readable arrangement', withCfg({ forceArrangement: { id: 'X', TL: 'egg', TR: 'adult', BL: 'larva', BR: 'pupa' } }), /arrangement tell/);
    await rp('PR2 loop box expects 5', doctored((h) => h.replace('data-lcs-loop data-lcs-answer="1"', 'data-lcs-loop data-lcs-answer="5"')), /cycle: the box after the adult expects "5"/);
    await rp('PR3 box 2 printed', doctored((h) => h.replace(/(data-lcs-answer="2"[^>]*>)(<\/span>)/, '$12$2')), /answer printed: the larva box shows "2"/);
    await rp('PR4 tether 20 px off its spot', doctored((h) => h.replace(/(<line [^>]*x2=")([\d.]+)("[^>]*data-lcs-tether="pupa")/, (m, a, x, b) => a + (+x + 20) + b)), /tether off spot: the pupa tether/);
    await rp('PR15 answerBox in place of blankNumeralBox', doctored((h) => h.replace(/<span class="ws-blankbox" (data-lcs-box data-lcs-pos="(\w\w)") data-lcs-answer="3" style="([^"]*)"><\/span>/, (m, a, p, st) => answerBox({ w: 56, h: 56 }).replace('class="ws-answerbox" style="', `class="ws-answerbox" ${a} style="${st.replace(/width:[^;]*;height:[^;]*;flex:[^;]*/, '')};`))), /expects "undefined"/);
    await rp('PS space-between (sparse)', doctored((h) => h.replace('justify-content:flex-start', 'justify-content:space-between')), /SPARSE — a \d+ px blank band/, { assert: true });
    log.push('  PR7 froglet stub dropped: covered by the primitive gate (section 0, L1 KILLED); the base draws no frog');
    log.push('  PR5 PR6 PR8-PR14: deferred to Phase E (faces not built)');
  } finally { await browser.close(); }

  console.log('poison:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, validateNeutral, enumerateArrangements };
