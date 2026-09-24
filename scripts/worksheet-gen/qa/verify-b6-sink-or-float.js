#!/usr/bin/env node
/**
 * verify-b6-sink-or-float.js — the G1-399 `sink-or-float` family gate (design
 * docs/worksheet-gen/b6-designs/G1-399-sink-or-float.md §5; the nt5-F build brief deliverable 4).
 * BASE build (2026-09-23): sections 0-5. The face sections (F1-F5 renders, their node tell
 * sweeps and the face poisons PR2-PR4, PR6-PR9, PR11) land with the faces in Phase E.
 *
 *   node scripts/worksheet-gen/qa/verify-b6-sink-or-float.js [--quick]
 *
 * 0. the primitive gates qa/verify-b6-water-tank.js + qa/verify-b6-clay-form.js must PASS.
 * 1. NEUTRAL — validateNeutral(SINK_OR_FLOAT_NEUTRAL): §5 rules 1, 2, 3, 4 (truth vs claims), 9.
 * 2. BANK — validateBank(block, loc) (exported; tools/b6-probe-child.js runs it for every panel
 *    draft): §5 rules 4 (per locale), 5, 6, 7, 8, 10.
 * 3. RENDER through the REAL pipeline (render/render-instance.js, file:// fonts): d1/d2/d3 en,
 *    then d2 under the 722 chrome (3-line title + 3-line instruction) AND the 677 chrome (4-line
 *    fi title) + the widest words (the design's de literals); asserts verify() empty,
 *    qa/lints.js clean and the floors ITSELF (no size lint exists): picture >= 60 at d2 (the
 *    gate floor 56), rings >= 24, the star 40, labels one line >= 14 px, legend words 18 px;
 *    FILL — d2 content bottom >= 85 % of the body at the 814 chrome and inside it at 677;
 *    body height measured per chrome.
 * 4. SWEEP — 20 seeds render (5 with --quick) verify-clean and distinct; a node sweep of 400
 *    seeds: float share per row POSITION 50 % ± 5 (both directions), every order rule holds,
 *    mustInclude holds, the draw is locale-neutral; the SHIPPED seed's sequence is recorded;
 *    an unauthored locale REFUSES (and, the poison direction, the authored en does not).
 * 5. POISON — each must FAIL for its OWN reason (no fail = SILENT, another fail = WRONG REASON;
 *    either exits 1); the correct EN bank is the control. Design §5 P1-P14 + the base render
 *    poisons PR1 PR5 PR10 + FILL / SPARSE both ways; lead review 2026-09-23: rule 11 (no label contains an
 *    apparatus word) P15-P18, ring geometry PR12 (sink ring lifted) + PR13 (float ring under water).
 * 6. FACES (Phase E) — per face: the emitted spec (layout, band, strings === the bank), refusals; 400-seed node
 *    sweeps (F1 floater-left / tilt-left / heavier-floats, F2 ball-left / transfer floater-left, F3 TRUE per row;
 *    locale-neutral draws); renders at d2 en + the 722 / 677 chromes + the 814 chrome (FILL >= 85 %); the
 *    apparatus-in-instruction check; poisons PR2 PR3 PR4 PR6 PR7 PR8 PR9 PR11, PA1 PA2, FL-<face>, SP-truth,
 *    SP-draw, PF1-PF3.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { vocab } = require('../lib/b2-common.js');
const { bankModule } = require('../lib/b6-common.js');
const { fileUri } = require('../image-cache/resolve.js');
const freeClaim = require('../../lib/free-claim.js');
const bankMod = require('../data/b6/sink-or-float.js');
const tankGate = require('./verify-b6-water-tank.js');
const clayGate = require('./verify-b6-clay-form.js');
const TYPE = require('../types/g1/G1-399-sink-or-float.js');

const OUT = path.join(__dirname, '..', 'out', 'dev', 'G1-399-gate');
const ID = 'G1-399';
const WORKSHEET_WORD = /worksheet|arbeitsblatt|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med fasit|vastauksineen/i;
const ANIMAL_THEMES = new Set(['animals', 'animals bw', 'farm animals', 'farm animals bw', 'zoo animals', 'zoo animals bw', 'pets', 'birds', 'birds 2', 'ocean life', 'sea life bw', 'forest creatures', 'insects and bugs', 'reptiles and Amphibians', 'dinosaurs']);
const FACES_OWN = new Set(['base', 'scale', 'shape', 'truth', 'draw', 'report']);
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);
const norm = (s, loc) => low(s, loc).replace(/[^\p{L} ]+/gu, ' ').replace(/\s+/g, ' ').trim();
const wordRe = (w) => new RegExp(`(?<!\\p{L})${String(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'iu');

/** fix round 2: the faces that run no test (their titles may not claim an experiment, rule 7b) */
// fix round 3 (da + fi landing panels): G1-408's scales are drawn already tipped; nothing is weighed or tested.
const NO_TEST = new Set(['G2-383', 'K-384', 'G1-408']);
/** fix round 2 (rule 7c): the lead of a title = the text before its first ':' / '?' (a leading '¿' dropped) */
const leadOf = (t) => String(t).replace(/^[¿¡]/, '').split(/[:?]/)[0];
/** function words that do not make a title its own question (conjunctions + interrogatives, all 11 locales) */
const FN_WORDS = new Set(['oder', 'eller', 'what', 'hvad', 'mikä', 'mitä', 'cosa', 'quoi', 'wat', 'vad', 'hva', 'que', 'qué', 'qui', 'was', 'o', 'ou', 'or', 'of', 'vai', 'og', 'och', 'und', 'and', 'et', 'e', 'y', 'en', 'ja', 'ce', 'het', 'se', 'lo', 'il', 'the', 'a', 'an']);
/** content stems (first 4 letters of each non-function word of >= 4 letters) */
const stems = (s, loc) => new Set(low(s, loc).replace(/[^\p{L} ]+/gu, ' ').split(/\s+/).filter((w) => w.length >= 4 && !FN_WORDS.has(w)).map((w) => w.slice(0, 4)));
/** true when the lead's content stems are >= 2 and every one of them is a content stem of the G1-204 title */
function sameQuestion(lead, g1204, loc) { const a = stems(lead, loc), b = stems(g1204, loc); return a.size >= 2 && [...a].every((x) => b.has(x)); }

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/* ---------------------------------------------------------------- 1. neutral */
function validateNeutral(N) {
  const f = []; const push = (m) => f.push(m);
  const manifest = require('../cache/manifest.json');
  const V = vocab();
  const byId = Object.fromEntries(N.CLAIMS.map((c) => [c.id, c]));
  const excluded = new Set(N.EXCLUDED);
  const ids = N.CLAIMS.map((c) => c.id);
  if (new Set(ids).size !== ids.length) push('CLAIMS: an id repeats');
  for (const c of N.CLAIMS) {
    const what = `CLAIM ${c.id} (${c.theme}/${c.noun})`;
    if (c.picOpened !== true) push(`${what}: picOpened is not true (rule 1)`);
    if (excluded.has(`${c.theme}/${c.noun}`)) push(`${what}: an EXCLUDED picture (rule 1)`);
    try { fileUri(c.theme, c.noun); } catch (e) { push(`${what}: the picture does not resolve (rule 1)`); }
    const e = manifest.themes[c.theme] && manifest.themes[c.theme].nouns[c.noun];
    if (!e || !e.vocabKey || !V[e.vocabKey]) push(`${what}: no vocab key (rule 1)`);
    if (/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s|\d|$)/i.test(c.theme)) push(`${what}: a B&W theme`);
    if (c.id === 'orange') { if (c.result !== null || c.use.join() !== 'report') push(`${what}: the orange is the F5 QUESTION (result null, use report only) (rule 1)`); }
    else if (c.result !== 'float' && c.result !== 'sink') push(`${what}: result "${c.result}" ∉ {float, sink} (rule 1)`);
    for (const u of c.use || []) if (!FACES_OWN.has(u)) push(`${what}: unknown use "${u}"`);
    if ((c.use || []).some((u) => ['scale', 'shape', 'truth'].includes(u)) && c.conf !== 'high') push(`${what}: a closed face on a conf "${c.conf}" row (rule 2)`);
    if ((c.use || []).includes('base') && c.testable !== true) push(`${what}: base on a non-testable row (rule 2)`);
    if (['key', 'scissors', 'banana', 'toyboat'].includes(c.id) && (c.use || []).some((u) => u !== 'base')) push(`${what}: ${c.id} is a base-only picture (rule 2)`);
    if (c.id === 'bolt' && (c.use || []).includes('scale')) push(`${what}: the bolt never goes on the scale (its art is huge) (rule 2)`);
    if (ANIMAL_THEMES.has(c.theme)) push(`${what}: an animal picture (rule 9)`);
  }
  // rule 3 pairs
  let P = 0, Q = 0; const pairNouns = new Set();
  for (const p of N.PAIRS) {
    const a = byId[p.a], b = byId[p.b];
    if (!a || !b) { push(`PAIR ${p.id}: an unknown claim (rule 3)`); continue; }
    for (const x of [a, b]) if (!(x.use || []).includes('scale')) push(`PAIR ${p.id}: ${x.id} is not a scale row (rule 2/3)`);
    if (a.result !== 'float' || b.result !== 'sink') push(`PAIR ${p.id}: a must float and b must sink (rule 3)`);
    const cls = p.id[0];
    if (cls === 'P' && p.heavier !== 'a') push(`PAIR ${p.id}: a P pair's heavier side is the floater (rule 3)`);
    if (cls === 'Q' && p.heavier !== 'b') push(`PAIR ${p.id}: a Q pair's heavier side is the sinker (rule 3)`);
    if (cls === 'P') P++; else if (cls === 'Q') Q++; else push(`PAIR ${p.id}: neither P nor Q`);
    pairNouns.add(p.a); pairNouns.add(p.b);
  }
  if (P < 2 || Q < 2) push(`PAIRS: ${P} P / ${Q} Q (< 2 each, rule 3)`);
  // rule 4 truth vs claims
  for (const [id, t] of Object.entries(N.TF)) {
    if (!['T', 'F'].includes(t.truth) || !['spec', 'gen'].includes(t.kind)) push(`TF ${id}: truth/kind malformed`);
    if (t.kind === 'spec' && !(t.objects || []).length) push(`TF ${id}: a spec sentence names no object`);
    for (const o of t.objects || []) {
      const c = byId[o];
      if (!c) { push(`TF ${id}: unknown object ${o}`); continue; }
      if (!(c.use || []).includes('truth')) push(`TF ${id}: ${o} is not a truth row (rule 2)`);
      const said = t.claims && t.claims[o];
      if (!said) push(`TF ${id}: no claim for ${o}`);
      else if ((said === c.result) !== (t.truth === 'T')) push(`TF ${id}: marked ${t.truth} but says ${o} ${said} while the CLAIM table says ${c.result} (rule 4)`);
    }
  }
  if (!Object.values(N.TF).some((t) => t.truth === 'F' && t.misconception)) push('TF: no misconception F (rule 4)');
  // rule 9 shapes
  const sk = Object.keys(N.SHAPES).sort().join();
  if (sk !== 'ball,boat') push(`SHAPES [${sk}] ≠ ball, boat (rule 9)`);
  if (N.SHAPES.ball !== 'sink' || N.SHAPES.boat !== 'float') push('SHAPES outcomes wrong (ball sinks, boat floats)');
  if (N.QUESTIONS.join() !== 'orange,cargo') push('QUESTIONS ≠ orange, cargo');
  return f;
}

/* ---------------------------------------------------------------- 2. bank */
function stringsOf(loc) { try { return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', `strings.${loc}.json`), 'utf8')); } catch (e) { return {}; } }
function validateBank(b, loc, N = bankMod.SINK_OR_FLOAT_NEUTRAL) {
  const f = []; const push = (m) => f.push(m);
  if (!b || typeof b !== 'object') return ['no block'];
  const V = vocab();
  const manifest = require('../cache/manifest.json');
  const forb = (b.forbidden || []).map((x) => low(x, loc));
  const hitForb = (s) => forb.find((x) => low(s, loc).includes(x));
  const str = (v, what) => { if (typeof v !== 'string' || !v.trim()) { push(`${what} missing`); return ''; } if (/[{}]/.test(v)) push(`${what} carries a slot`); return v; };
  // rule 6 words
  const fw = str(b.floatWord, 'floatWord'), sw = str(b.sinkWord, 'sinkWord');
  if (fw && sw && low(fw, loc) === low(sw, loc)) push('floatWord === sinkWord (rule 6)');
  const tw = str(b.trueWord, 'trueWord'), fa = str(b.falseWord, 'falseWord');
  if (tw && fa && low(tw, loc) === low(fa, loc)) push('trueWord === falseWord (rule 6)');
  str(b.clayWord, 'clayWord');
  for (const k of ['guess', 'test', 'surprise']) str(b.heads && b.heads[k], `heads.${k}`);
  // labels
  const labels = b.labels || {};
  for (const [id, lab] of Object.entries(labels)) {
    const c = N.CLAIMS.find((x) => x.id === id);
    if (!c) { push(`labels.${id}: not a CLAIM row`); continue; }
    if (typeof lab !== 'string' || !lab.trim()) { push(`labels.${id} empty (rule 6)`); continue; }
    if (loc !== 'de' && lab !== low(lab, loc)) push(`labels.${id} "${lab}" is not lower-case (rule 6)`);
    const traps = N.LABEL_TRAPS[id] || [];
    const e = manifest.themes[c.theme] && manifest.themes[c.theme].nouns[c.noun];
    const vs = e && V[e.vocabKey] && V[e.vocabKey][loc] && V[e.vocabKey][loc][0];
    if (traps.includes(loc) && vs && low(lab, loc) === low(vs, loc)) push(`labels.${id} "${lab}" is the vocab trap "${vs}" (the picture is not that) (rule 6)`);
  }
  // the base pool must fill every level
  const pool = N.CLAIMS.filter((c) => c.use.includes('base') && c.testable && labels[c.id]);
  const fl = pool.filter((c) => c.result === 'float'), sk = pool.filter((c) => c.result === 'sink');
  if (fl.length < 4 || sk.length < 4 || fl.filter((c) => c.big).length < 2 || sk.filter((c) => c.small).length < 2) push(`the labelled base pool (float ${fl.length} / sink ${sk.length}) cannot fill d3 (refuse the base or add labels)`);
  // rule 4 per locale (only when the locale authored tf)
  if (b.tf) {
    const ids = Object.keys(b.tf).filter((id) => N.TF[id] && !N.TF[id].retired && !N.TF[id].needsExperiment);   // fix round 2: only the drawable pool counts
    for (const id of Object.keys(b.tf)) if (!N.TF[id]) push(`tf.${id}: unknown id`);
    for (const side of ['T', 'F']) {
      const s = ids.filter((id) => N.TF[id].truth === side);
      if (s.length < 4) push(`tf: ${s.length} ${side} sentences (< 4, rule 4)`);
      if (!s.some((id) => N.TF[id].kind === 'spec') || !s.some((id) => N.TF[id].kind === 'gen')) push(`tf: the ${side} side lacks a spec or a gen sentence (rule 4)`);
    }
    if (!ids.some((id) => N.TF[id].truth === 'F' && N.TF[id].misconception)) push('tf: no misconception F survives (rule 4)');
    for (const id of ids) { const t = b.tf[id]; if (typeof t !== 'string' || !t.trim()) push(`tf.${id} empty`); else if (N.TF[id].truth === 'T' && hitForb(t)) push(`tf.${id} TRUE sentence "${t}" says "${hitForb(t)}" (forbidden, rule 5)`); }
  }
  // rule 5 on every visible literal (F sentences exempt)
  const vis = [['floatWord', fw], ['sinkWord', sw], ...Object.entries(b.heads || {}).map(([k, v]) => [`heads.${k}`, v]), ...Object.entries(labels).map(([k, v]) => [`labels.${k}`, v])];
  const S = b.strings || {};
  for (const [id, s] of Object.entries(S)) vis.push([`strings.${id}.title`, s.title], [`strings.${id}.instruction`, s.instruction]);
  for (const [w, v] of vis) if (typeof v === 'string' && hitForb(v)) push(`${w} "${v}" says "${hitForb(v)}" (forbidden, rule 5)`);
  // rules 7, 8, 10 — strings
  for (const id of Object.keys(N.FACE_OF_ID)) if (!S[id]) push(`strings.${id} missing (rule 10)`);
  for (const id of Object.keys(S)) if (!N.FACE_OF_ID[id]) push(`strings.${id}: not a G1-399 base / face id (rule 10)`);
  const g1204 = stringsOf(loc)['G1-204'];
  const existing = stringsOf(loc);
  const expWords = (b.experimentWords || []).map((x) => low(x, loc));
  if (!expWords.length) push('experimentWords empty (rule 7)');
  const bans = b.instructionBans || {};
  for (const [id, s] of Object.entries(S)) {
    const t = (s && s.title) || '', ins = (s && s.instruction) || '';
    if (!t || t.length > 70) push(`strings.${id} title length ${t.length} (1..70, rule 7)`);
    if (WORKSHEET_WORD.test(t)) push(`strings.${id} title carries a worksheet word (rule 7)`);
    if (g1204 && norm(t, loc) === norm(g1204.title, loc)) push(`strings.${id} title "${t}" equals the G1-204 title "${g1204.title}" (rule 7, the science-sort fence)`);
    // fix round 2 (en + de panels): a face that runs NO test (truth, draw) must not be titled an experiment; every other must be
    if (NO_TEST.has(id)) { const w = expWords.find((x) => low(t, loc).includes(x)); if (w) push(`strings.${id} title "${t}" claims an experiment ("${w}") but the page runs no test (rule 7b)`); }
    else if (!expWords.some((w) => low(t, loc).includes(w))) push(`strings.${id} title "${t}" carries none of the experimentWords (rule 7)`);
    // fix round 2 (de panel): the DRAW face is the one a teacher can mistake for the G1-204 float / sink sort, so its title's
    // lead (before the first ':' / '?') must not be the G1-204 question in other words
    if (g1204 && id === 'K-384' && sameQuestion(leadOf(t), g1204.title, loc)) push(`strings.${id} title lead "${leadOf(t)}" restates the G1-204 title "${g1204.title}" (rule 7c, the science-sort fence)`);
    if (loc === 'es' && /flotaci/i.test(t)) push(`strings.${id} title "${t}" says flotación (rule 7)`);
    const band = id.split('-')[0];
    for (const [oid, os] of Object.entries(existing)) if (oid !== id && oid.split('-')[0] === band && os && os.title && low(os.title, loc) === low(t, loc)) push(`strings.${id} title "${t}" collides with ${oid} in band ${band} (rule 7)`);
    if (!ins || ins.length > 150) push(`strings.${id} instruction length ${ins.length} (1..150, rule 8)`);
    if (!/[.!?。]$/.test(ins.trim())) push(`strings.${id} instruction does not end a sentence (rule 8)`);
    if ((ins.match(/[.!?](\s|$)/g) || []).length > 1) push(`strings.${id} instruction is more than one sentence (rule 8)`);
    for (const x of [t, ins]) { const h = freeClaim.hit(x); if (h) push(`strings.${id} claims free ("${h}", rule 8)`); if (ANSWERS_WORD.test(x)) push(`strings.${id} promises answers (rule 8)`); }
    const face = N.FACE_OF_ID[id];
    for (const w of (face && bans[face]) || []) if (wordRe(w).test(ins)) push(`strings.${id} instruction names "${w}" — not apparatus of this page (rule 8)`);
  }
  if (!bans.base || !bans.base.length) push('instructionBans.base empty (rule 8)');
  // rule 11 (lead review 2026-09-23): the apparatus words the instruction names are the bank's literals; no picture label
  // may equal or contain one ("colour a RING" over a picture labelled "ring"), and the base instruction must name ring + tank
  const app = b.apparatus || {};
  if (!app.ring || !app.tank || !app.star || !app.spot) push('apparatus.{ring,tank,star,spot} missing (rule 11)');
  for (const [id, lab] of Object.entries(labels)) for (const [k, w] of Object.entries(app)) if (w && typeof lab === 'string' && low(lab, loc).includes(low(w, loc))) push(`labels.${id} "${lab}" contains the apparatus word "${w}" (${k}) — a picture named like the page's own apparatus (rule 11)`);
  // fix round 1: each face's instruction NAMES the apparatus the child acts on (the bank literal): base + F2 colour a
  // RING in a TANK / draw in the big TANK; F4 draws in the dashed SPOTS
  const MUST_NAME = { 'G1-399': ['ring', 'tank'], 'G2-382': ['ring', 'tank'], 'K-384': ['spot'] };
  for (const [fid, keys] of Object.entries(MUST_NAME)) { const ins = S[fid] && S[fid].instruction; if (ins) for (const k of keys) if (app[k] && !low(ins, loc).includes(low(app[k], loc))) push(`strings.${fid} instruction does not name the apparatus "${app[k]}" (rule 11: the child acts on it)`); }
  // fix round 1: the F5 "I learned" heading and its writing-row starter must not repeat each other
  // fix round 2 (de / fr / nl panels): the G2-382 rows each carry a head; the steel head names the circle task
  const H = b.shapeHeads || {};
  for (const k of ['clay', 'steel']) { const v = str(H[k], `shapeHeads.${k}`); if (v && hitForb(v)) push(`shapeHeads.${k} "${v}" says "${hitForb(v)}" (forbidden, rule 5)`); if (v && v.length > 70) push(`shapeHeads.${k} is ${v.length} chars (> 70, one line)`); }
  const R = b.report || {};
  if (R.learned && R.starter && (low(R.starter, loc).includes(low(R.learned, loc)) || low(R.learned, loc).includes(low(R.starter, loc)))) push(`report.starter "${R.starter}" repeats the heading report.learned "${R.learned}"`);
  return f;
}

/* ---------------------------------------------------------------- 3. render */
const LONG = {
  de: { title: 'Schwimmen und Sinken: Versuch mit Vermutung, Beobachtung und Überraschung im Wasser', instruction: 'Male vor dem Versuch einen Ring im ersten Becken aus, nach dem Versuch einen Ring im zweiten Becken und den Stern, wenn du überrascht warst, bitte.', body: 722 },
  // the worst LEGAL chrome (4-line title + 3-line instruction) — the G1-376 fixture, measured there at a 667 px body
  fi: { title: 'Kasvin osat: juuret, varsi, lehdet, kukat, hedelmät ja siemenet kuvassa ja lapuissa numeroituina tarkasti', instruction: 'Seuraa jokaista numeroitua lappua kasvin osaan asti ja kirjoita sen osan nimi sanapankista viivalle, jolla on sama numero kuin lapussa, huolellisesti.', body: 677 },
};
function withBlock(block, extra = {}, loc = 'en') {
  return { ...TYPE, build({ difficulty }, ctx) { return this._buildWith(block, { ...this.difficulty[difficulty], ...extra }, { locale: loc }, ctx); } };
}
function withHtml(fn, base = TYPE) {
  return { ...base, build(o, ctx) { const r = base.build.call(base, o, ctx); const h = fn(r.bodyHtml); if (h === r.bodyHtml) throw new Error('poison: the markup changed shape (needle missed)'); r.bodyHtml = h; return r; } };
}
async function renderWith(page, type, { difficulty = 2, baseName, strings, seedEpoch, locale = 'en' }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="sink-or-float"]');
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot');
    const q = (s) => root ? [...root.querySelectorAll(s)] : [];
    return {
      body: body ? rect(body) : null, foot: foot ? rect(foot).top : 0,
      pics: q('img[data-lcs-pic]').map((x) => rect(x).w),
      rings: q('circle[data-lcs-slot]').map((x) => rect(x).w),
      stars: q('svg[data-lcs-star]').map((x) => rect(x).w),
      labels: q('[data-lcs-label]').map((x) => ({ t: x.textContent, px: parseFloat(getComputedStyle(x).fontSize), h: rect(x).h, clip: x.scrollWidth > x.clientWidth + 0.6 })),
      words: q('[data-lcs-legend-word]').map((x) => ({ t: x.textContent, px: parseFloat(getComputedStyle(x).fontSize), clip: x.scrollWidth > x.clientWidth + 0.6 })),
      ink: Math.max(0, ...q('svg, img, [data-lcs-tile], [data-lcs-sof-legend]').map((e) => e.getBoundingClientRect().bottom)),
      seq: q('[data-lcs-row]').map((r) => r.dataset.lcsClaim).join(','),
    };
  });
  return { out, m, verify: out.qa.verify, lints: out.qa.lints };
}
const FILL_MIN = 0.85;
/** The 814 chrome (one-line title + one-line instruction): the FILL rule is measured HERE (_FACE-BRIEF FILL). */
const SHORT = { title: 'Sink or Float', instruction: 'Color the rings and the star.' };
function assertRender(name, r, { rows, pic, fill, body } = {}) {
  ok(!r.verify.length, `${name}: verify ${JSON.stringify(r.verify.slice(0, 4))}`);
  ok(!r.lints.length, `${name}: lints ${JSON.stringify(r.lints.slice(0, 4))}`);
  const m = r.m;
  ok(m.pics.length === rows && m.pics.every((w) => w >= pic - 0.6 && w >= 44), `${name}: pictures ${m.pics.map((x) => x.toFixed(0))} (want ${rows} x >= ${pic})`);
  ok(m.rings.length === rows * 4 && m.rings.every((w) => w >= 24 - 0.6), `${name}: rings ${m.rings.length} (want ${rows * 4} x >= 24 px)`);
  ok(m.stars.every((w) => w >= 39.4), `${name}: a star under 40 px`);
  ok(m.labels.every((l) => l.px >= 14 && !l.clip && l.h <= l.px * 1.6), `${name}: a label clipped / wrapped / under 14 px (${JSON.stringify(m.labels.filter((l) => l.clip || l.h > l.px * 1.6))})`);
  ok(m.words.length === 2 && m.words.every((w) => w.px >= 18 && !w.clip), `${name}: legend words not 2 x 18 px unclipped`);
  const share = (m.ink - m.body.top) / m.body.h;
  if (fill) ok(share >= FILL_MIN, `${name}: FILL — the content ends at ${(share * 100).toFixed(1)} % of the body (< ${FILL_MIN * 100} %)`);
  ok(m.ink <= m.body.bottom + 0.6 && m.ink <= m.foot + 0.6, `${name}: FILL overflow — the content ends ${(m.ink - m.body.bottom).toFixed(0)} px past the body`);
  if (body) ok(m.body.h <= body + 0.6, `${name}: body ${m.body.h.toFixed(0)} px — the fixture did not squeeze it to <= ${body}`);
  return share;
}


/* ================================================================ 6. FACES (Phase E, 2026-09-23)
 * The five CODE faces (layout knob) through the real pipeline at d2 en + the 722 / 677 chromes + the 814 chrome
 * (FILL >= 85 %); verify() re-derives every answer from the stamps; this section adds the apparatus-in-instruction
 * check, the 400-seed node tell sweeps, the refusals, and the face poisons PR2-PR4 PR6-PR9 PR11 + FILL / SPARSE /
 * apparatus poisons. The base (layout undefined) is the control of every face poison. */
const FACE_IDS = { scale: 'G1-408', shape: 'G2-382', truth: 'G2-383', draw: 'K-384', report: 'G3-400' };
const FACE_DIR = { scale: 'g1', shape: 'g2', truth: 'g2', draw: 'k', report: 'g3' };
const FACE_BAND = { scale: 'G1', shape: 'G2', truth: 'G2', draw: 'K', report: 'G3' };
function loadFace(L) {
  const dir = path.join(__dirname, '..', 'types', FACE_DIR[L]);
  const f = fs.readdirSync(dir).find((x) => x.startsWith(FACE_IDS[L] + '-'));
  if (!f) throw new Error(`face ${FACE_IDS[L]} not emitted (run tools/gen-b6var-specs.js)`);
  return require(path.join(dir, f));
}
/** en apparatus word -> the selector that must be ON the page when an instruction names it (nt5-F lesson 4). */
const APPARATUS_EN = [
  [/(?<!\p{L})rings?(?!\p{L})/iu, 'circle[data-lcs-slot]'], [/(?<!\p{L})tanks?(?!\p{L})/iu, 'svg[data-lcs-tank-mode]'], [/(?<!\p{L})star(?!\p{L})/iu, 'svg[data-lcs-star]'],
  [/(?<!\p{L})scales?(?!\p{L})/iu, 'svg[data-lcs-prim="balance"]'], [/(?<!\p{L})clay(?!\p{L})/iu, 'svg[data-lcs-clay]'], [/on the water/iu, 'svg[data-lcs-tank-mode]'],
  [/(?<!\p{L})sentences?(?!\p{L})/iu, '[data-lcs-claim-row]'], [/true or false/iu, '[data-lcs-truth-chip]'], [/(?<!\p{L})questions?(?!\p{L})/iu, '[data-lcs-question]'],
  [/(?<!\p{L})boat(?!\p{L})/iu, 'svg[data-lcs-form="boat"], svg[data-lcs-tank-mode="empty"]'], [/(?<!\p{L})bottom(?!\p{L})/iu, '[data-lcs-floor-top]'], [/dashed box/iu, '[data-lcs-spot]'], [/big tank/iu, '[data-lcs-draw-tank] svg[data-lcs-tank-mode="empty"]'],
];
async function apparatusFindings(page, instruction) {
  const f = [];
  for (const [re, sel] of APPARATUS_EN) if (re.test(instruction)) { const n = await page.evaluate((s) => document.querySelectorAll(`[data-lcs-type="sink-or-float"] ${s.split(', ').join(', [data-lcs-type="sink-or-float"] ')}`).length, sel); if (!n) f.push(`the instruction names "${instruction.match(re)[0]}" but the page draws no ${sel}`); }
  return f;
}
async function faceRender(page, L, name, opts = {}) {
  const type = opts.type || loadFace(L);
  const out = await renderInstance({ type, theme: null, difficulty: 2, locale: 'en', page, outDir: OUT, baseName: `G1-399-gate-face-${name}`, strings: opts.strings, seedEpoch: opts.seedEpoch });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-lcs-type="sink-or-float"]'), body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot');
    const ink = Math.max(0, ...[...root.querySelectorAll('svg, img, .ws-card, [data-lcs-claim-row], [data-lcs-shelf]')].filter((e) => !e.closest('svg') || e.tagName === 'svg').map((e) => e.getBoundingClientRect().bottom));
    const b = body.getBoundingClientRect();
    return { body: { top: b.top, bottom: b.bottom, h: b.height }, ink, foot: foot ? foot.getBoundingClientRect().top : 0 };
  });
  const ins = (opts.strings && opts.strings.instruction) || type.i18n.en.instruction;
  const app = await apparatusFindings(page, ins);
  return { out, m, verify: out.qa.verify, lints: out.qa.lints, app, share: (m.ink - m.body.top) / m.body.h };
}

async function faceSection(page, judge, log, quick, banks) {
  const N = bankMod.SINK_OR_FLOAT_NEUTRAL;
  const S = banks.en.strings;
  // specs: the emitted face = its layout, its band, strings === the bank
  for (const L of Object.keys(FACE_IDS)) {
    const F = loadFace(L);
    ok(F.id === FACE_IDS[L] && F.difficulty[2].layout === L && F.gradeBand === FACE_BAND[L], `${FACE_IDS[L]}: the emitted spec is not layout ${L} / band ${FACE_BAND[L]}`);
    ok(F.i18n.en.title === S[F.id].title && F.i18n.en.instruction === S[F.id].instruction, `${F.id}: the spec's i18n.en ≠ strings.${F.id}`);
    ok(N.FACE_OF_ID[F.id] === L, `${F.id}: FACE_OF_ID ≠ ${L}`);
    // a bank.refuse of this face and an unauthored locale REFUSE
    let m = null; try { F._buildWith({ ...banks.en, refuse: [L] }, F.difficulty[2], { locale: 'en' }, { rng: makeRng('r') }); } catch (e) { m = e.message; }
    ok(m && /refuses the/.test(m), `${F.id}: bank.refuse [${L}] did not refuse (${m})`);
  }
  {
    // the faces that READ words refuse a block without them
    const tryB = (L, blk) => { try { loadFace(L)._buildWith(blk, loadFace(L).difficulty[2], { locale: 'en' }, { rng: makeRng('r') }); return null; } catch (e) { return e.message; } };
    const noTf = { ...banks.en }; delete noTf.tf;
    ok(/no tf block/.test(tryB('truth', noTf) || ''), 'truth: a block without tf does not refuse');
    const noQ = { ...banks.en }; delete noQ.questions;
    ok(/no questions/.test(tryB('report', noQ) || ''), 'report: a block without questions does not refuse');
    const noLab = { ...banks.en, labels: { ...banks.en.labels } }; for (const k of ['pumpkin', 'log', 'ball', 'apple', 'lemon']) delete noLab.labels[k];
    ok(/scale pool P .* cannot fill/.test(tryB('scale', noLab) || ''), 'scale: a block whose panel refused every P picture does not refuse');
  }
  // node sweeps (400 seeds): position tells both directions + locale-neutral draws
  {
    const synth = { ...banks.en, floatWord: 'schwimmt oben', sinkWord: 'geht unter', labels: Object.fromEntries(Object.keys(banks.en.labels).map((k) => [k, 'X' + k])), tf: Object.fromEntries(Object.keys(banks.en.tf).map((k) => [k, 'Satz ' + k])) };
    const n = 400;
    const F1 = loadFace('scale'), F2 = loadFace('shape'), F3 = loadFace('truth');
    let flL = 0, tlL = 0, heavyFl = 0, cardsN = 0, neutral = 0, ballL = 0, trL = 0;
    const tPos = Array(6).fill(0);
    for (let s = 1; s <= n; s++) {
      const rng = () => makeRng('G1-399-face-sweep-' + s);
      const a = F1._buildWith(banks.en, F1.difficulty[2], { locale: 'en' }, { rng: rng() }), a2 = F1._buildWith(synth, F1.difficulty[2], { locale: 'de' }, { rng: rng() });
      if (JSON.stringify(a.meta) !== JSON.stringify(a2.meta)) neutral++;
      for (const c of a.meta.cards) { const p = N.PAIRS.find((x) => x.id === c.pair); cardsN++; if (c.floats === 'L') flL++; const heavy = p.heavier === 'a' ? c.floats : (c.floats === 'L' ? 'R' : 'L'); if (heavy === 'L') tlL++; if (heavy === c.floats) heavyFl++; }
      const b = F2._buildWith(banks.en, F2.difficulty[2], { locale: 'en' }, { rng: rng() }), b2 = F2._buildWith(synth, F2.difficulty[2], { locale: 'de' }, { rng: rng() });
      if (JSON.stringify(b.meta) !== JSON.stringify(b2.meta)) neutral++;
      if (b.meta.forms[0] === 'ball') ballL++; if (b.meta.transfer.floats === 'L') trL++;
      const c = F3._buildWith(banks.en, F3.difficulty[2], { locale: 'en' }, { rng: rng() }), c2 = F3._buildWith(synth, F3.difficulty[2], { locale: 'de' }, { rng: rng() });
      if (JSON.stringify(c.meta) !== JSON.stringify(c2.meta)) neutral++;
      c.meta.order.forEach((id, i) => { if (N.TF[id].truth === 'T') tPos[i]++; });
    }
    const share = (k, d) => Math.abs(k / d - 0.5);
    ok(share(flL, cardsN) <= 0.05 && share(tlL, cardsN) <= 0.05 && share(heavyFl, cardsN) <= 0.05, `F1 sweep: floater-left ${(100 * flL / cardsN).toFixed(1)} % · tilt-left ${(100 * tlL / cardsN).toFixed(1)} % · heavier-floats ${(100 * heavyFl / cardsN).toFixed(1)} % (each 50 ± 5)`);
    ok(share(ballL, n) <= 0.05 && share(trL, n) <= 0.05, `F2 sweep: ball-left ${(100 * ballL / n).toFixed(1)} % · transfer floater-left ${(100 * trL / n).toFixed(1)} % (50 ± 5)`);
    tPos.forEach((k, i) => ok(share(k, n) <= 0.06, `F3 sweep: row ${i + 1} TRUE share ${(100 * k / n).toFixed(1)} % (50 ± 6)`));
    ok(neutral === 0, `face sweeps: ${neutral} draws depend on the locale`);
    console.log(`face node sweeps (400 seeds): F1 floater-left ${(100 * flL / cardsN).toFixed(1)} % tilt-left ${(100 * tlL / cardsN).toFixed(1)} % heavier-floats ${(100 * heavyFl / cardsN).toFixed(1)} % · F2 ball-left ${(100 * ballL / n).toFixed(1)} % transfer-floater-left ${(100 * trL / n).toFixed(1)} % · F3 TRUE per row ${tPos.map((k) => (100 * k / n).toFixed(1) + '%').join(' ')} · locale-dependent ${neutral}`);
    const shipped = (F) => F._buildWith(banks.en, F.difficulty[2], { locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: F.id, theme: null, difficulty: 2, seedEpoch: 1 })) }).meta;
    console.log(`shipped: F1 ${shipped(F1).cards.map((c) => c.pair + c.floats).join(' ')} · F2 ${JSON.stringify(shipped(F2))} · F3 ${shipped(F3).order.join(',')}`);
  }
  // renders: d2 en (the shipped seed), the 722 + 677 chromes, the 814 chrome (FILL)
  for (const L of Object.keys(FACE_IDS)) {
    const r = await faceRender(page, L, `${L}-d2`);
    ok(!r.verify.length && !r.lints.length && !r.app.length, `${FACE_IDS[L]} d2: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${JSON.stringify(r.lints.slice(0, 2))} apparatus ${JSON.stringify(r.app)}`);
    const w = {};
    for (const k of Object.keys(LONG)) {
      const x = await faceRender(page, L, `${L}-d2-long-${k}`, { strings: LONG[k] });
      ok(!x.verify.length && !x.lints.length, `${FACE_IDS[L]} ${k} chrome: verify ${JSON.stringify(x.verify.slice(0, 3))} lints ${JSON.stringify(x.lints.slice(0, 2))}`);
      ok(x.m.ink <= x.m.body.bottom + 0.6, `${FACE_IDS[L]} ${k} chrome: FILL overflow (${(x.m.ink - x.m.body.bottom).toFixed(0)} px past the body)`);
      ok(x.m.body.h <= LONG[k].body + 0.6, `${FACE_IDS[L]} ${k} chrome: body ${x.m.body.h.toFixed(0)} did not squeeze to ${LONG[k].body}`);
      w[k] = x.m.body.h;
    }
    const f8 = await faceRender(page, L, `${L}-d2-814`, { strings: SHORT });
    ok(!f8.verify.length && !f8.lints.length, `${FACE_IDS[L]} 814 chrome: verify ${JSON.stringify(f8.verify.slice(0, 3))}`);
    ok(f8.share >= FILL_MIN, `${FACE_IDS[L]} 814 chrome: FILL — the content ends at ${(100 * f8.share).toFixed(1)} % of the body (< 85 %)`);
    console.log(`face ${FACE_IDS[L]} (${L}): d2 body ${r.m.body.h.toFixed(0)} fill ${(100 * r.share).toFixed(1)} % · 814 fill ${(100 * f8.share).toFixed(1)} % · bodies de ${w.de.toFixed(0)} fi ${w.fi.toFixed(0)} · verify ${r.verify.length} lints ${r.lints.length} apparatus ${r.app.length}`);
    // render sweep: distinct verify-clean pages
    const pages = new Set();
    for (let s = 2; s <= (quick ? 3 : 6); s++) { const x = await faceRender(page, L, `${L}-sweep-${s}`, { seedEpoch: s }); ok(!x.verify.length && !x.lints.length, `${FACE_IDS[L]} sweep ${s}: verify ${JSON.stringify(x.verify.slice(0, 2))}`); pages.add(x.out.html.length + ':' + x.out.html.slice(-2000)); }
  }

  // face poisons (each must fail for its OWN reason; the real face is the control above)
  const withD = (L, extra) => { const F = loadFace(L); return { ...F, difficulty: { 1: { ...F.difficulty[2], ...extra }, 2: { ...F.difficulty[2], ...extra }, 3: { ...F.difficulty[2], ...extra } } }; };
  const fp = async (name, L, extra, re, opts = {}) => { const t = opts.type || withD(L, extra); const r = await faceRender(page, L, 'poison-' + name.split(' ')[0], { type: t, strings: opts.strings }); judge(name, [...r.verify, ...r.lints.map((l) => JSON.stringify(l)), ...r.app, ...(opts.extra ? opts.extra(r) : [])], re); };
  await fp('PR2 F1 tilt opposite the heavier side', 'scale', { forceTiltLie: true }, /tilt lies/);
  await fp('PR3 F1 heavier floats on all 4 cards', 'scale', { forceCards: [{ pair: 'P1', floats: 'L' }, { pair: 'P2', floats: 'R' }, { pair: 'P3', floats: 'L' }, { pair: 'P4', floats: 'R' }] }, /cards where the heavier thing floats ≠ the mix/);
  await fp('PR4 F1 floater drawn smaller on a P card', 'scale', { forceFloaterSmall: true }, /size does not follow mass/);
  await fp('PR14 F1 the old placement (objects centred on the beam end)', 'scale', { forceOldPlacement: true }, /does not rest in its pan|the beam crosses the [LR] object/);
  await fp('PR6 F3 a picture inside a TRUE row', 'truth', { forcePictureInTrue: true }, /picture inside a row/);
  await fp('PR7 F3 shelf missing a FALSE row\'s object', 'truth', { forceOrder: ['T1', 'F1', 'T6', 'F5', 'F6', 'T8'], forceDropShelf: 'potato' }, /shelf \[.*\] ≠ the union/);
  await fp('PR8 F4 a second tank (two labelled tanks = the G1-204 sort)', 'draw', { forceTwoTanks: true }, /ONE class tub/);
  {
    const F = loadFace('shape');
    const r = F._buildWith(banks.en, { ...F.difficulty[2], forceHalfBoat: true }, { locale: 'en' }, { rng: makeRng('pr9') });
    const svg = /<svg [^>]*data-lcs-form="boat"[^>]*>[\s\S]*?<\/svg>/.exec(r.bodyHtml)[0];
    judge('PR9 F2 boat with half the clay', clayGate.checkForm(svg, 'boat', 120, 3634).f, /clay area/);
    const c = F._buildWith(banks.en, F.difficulty[2], { locale: 'en' }, { rng: makeRng('pr9') });
    const ctl = clayGate.checkForm(/<svg [^>]*data-lcs-form="boat"[^>]*>[\s\S]*?<\/svg>/.exec(c.bodyHtml)[0], 'boat', 120, 3634).f;
    log.push(`  PR9 control (the shipped boat): ${ctl.length} findings`); ok(!ctl.length, 'PR9 control: the shipped boat fails the clay gate');
  }
  // de panel: a long tag word in the OLD fixed 159 px tag must overflow (poison); the auto-sized tag is the control
  {
    const F = loadFace('draw');
    const deWord = { ...banks.en, floatWord: 'schwimmt oben', sinkWord: 'geht unter' };
    const mk = (extra) => ({ ...F, build(o, ctx) { return this._buildWith(deWord, { ...this.difficulty[2], ...extra }, { locale: 'en' }, ctx); } });
    const c = await faceRender(page, 'draw', 'tag-control', { type: mk({}) });
    const cf = c.verify.filter((v) => !/≠ the bank/.test(v)); ok(!cf.length, `draw tag control (schwimmt oben): ${JSON.stringify(cf.slice(0, 3))}`);
    log.push(`  draw tag control ("schwimmt oben" auto-sized): ${cf.length} findings`);
    const x = await faceRender(page, 'draw', 'poison-tag-fixed', { type: mk({ forceTagWidth: 159 }) });
    judge('PR15 F4 the old fixed 159 px tag with "schwimmt oben"', x.verify, /tag word "schwimmt oben" overflows its tag/);
  }
  await fp('PR11 F5 answerBox without an answer', 'report', { forceAnswerBox: true }, /data-lcs-answer="undefined"/);
  await fp('PA1 F1 instruction names a tank', 'scale', {}, /instruction names "tank"/, { strings: { title: S['G1-408'].title, instruction: 'Color a ring in the tank for the thing that floats.' } });
  await fp('PA2 F3 instruction names a star', 'truth', {}, /instruction names "star"/, { strings: { title: S['G2-383'].title, instruction: 'Read each sentence and colour the star.' } });
  // FILL both ways: rows frozen at their minimum end high at 814; SPARSE: a gap between blocks
  const frozen = (L, from, to) => { const F = loadFace(L); return { ...F, build(o, ctx) { const r = F.build.call(F, o, ctx); const h = r.bodyHtml.replace(from, to); if (h === r.bodyHtml) throw new Error('FL poison needle missed: ' + L); r.bodyHtml = h; return r; } }; };
  for (const [L, from, to] of [['scale', /minmax\(154px,1fr\)/, '154px'], ['truth', /minmax\(80px,114px\)/, '80px'], ['draw', /minmax\(520px,1fr\)/, '520px'], ['shape', /minmax\(180px,1fr\)/, '180px']]) {
    const x = await faceRender(page, L, `poison-FL-${L}`, { type: frozen(L, from, to), strings: SHORT });
    judge(`FL-${L} rows frozen at their minimum (content ends high at 814)`, [...(x.share < FILL_MIN ? [`FILL — the content ends at ${(100 * x.share).toFixed(1)} %`] : []), ...x.verify.filter((v) => /FILL/.test(v))], /FILL — the (content|tub) ends/);
  }
  {
    const x = await faceRender(page, 'truth', 'poison-SP-truth', { type: frozen('truth', /row-gap:8px/, 'row-gap:52px'), strings: SHORT });
    judge('SP-truth a 52 px gap between claim rows', x.verify, /SPARSE — a \d+ px blank band/);
    const y = await faceRender(page, 'draw', 'poison-SP-draw', { type: frozen('draw', /margin:-24px auto 0/, 'margin:40px auto 0'), strings: SHORT });
    judge('SP-draw the tub pushed down 40 px', y.verify, /SPARSE — a \d+ px blank band above the tub/);
  }
  // data poisons of the face strings (rule 8 per face, rule 10)
  const clone = (o) => JSON.parse(JSON.stringify(o));
  judge('PF1 K-384 instruction says circle', validateBank({ ...clone(banks.en), strings: { ...banks.en.strings, 'K-384': { ...banks.en.strings['K-384'], instruction: 'Circle two things that float.' } } }, 'en'), /strings\.K-384 instruction names "circle"/);
  judge('PF2 G1-408 instruction says colour', validateBank({ ...clone(banks.en), strings: { ...banks.en.strings, 'G1-408': { ...banks.en.strings['G1-408'], instruction: 'Colour the thing that floats.' } } }, 'en'), /strings\.G1-408 instruction names "colou?r"/);
  // fix round 1 poisons: one sentence (en + a de block), the named apparatus (F2 ring, F4 dashed boxes), the F5 starter
  judge('PS1 en G3-400 instruction in two sentences', validateBank({ ...clone(banks.en), strings: { ...banks.en.strings, 'G3-400': { ...banks.en.strings['G3-400'], instruction: 'Choose a question. Then write what you think.' } } }, 'en'), /strings\.G3-400 instruction is more than one sentence/);
  { const de = clone(banks.en); de.strings['K-384'] = { ...de.strings['K-384'], instruction: 'Male zwei Dinge in die gestrichelten Kästen. Male dann zwei weitere.' }; judge('PS2 a second locale block with two sentences', validateBank(de, 'de'), /strings\.K-384 instruction is more than one sentence/); }
  judge('PN1 G2-382 instruction without the ring', validateBank({ ...clone(banks.en), strings: { ...banks.en.strings, 'G2-382': { ...banks.en.strings['G2-382'], instruction: 'Color where each clay shape ends up, circle the thing that floats, then draw your own clay boat in the big tank.' } } }, 'en'), /strings\.G2-382 instruction does not name the apparatus "ring"/);
  judge('PN2 K-384 instruction without the dashed boxes', validateBank({ ...clone(banks.en), strings: { ...banks.en.strings, 'K-384': { ...banks.en.strings['K-384'], instruction: 'Draw two things that float on the water and two things that sink to the bottom.' } } }, 'en'), /strings\.K-384 instruction does not name the apparatus "dashed box"/);
  judge('PN3 F5 starter repeats its heading', validateBank({ ...clone(banks.en), report: { ...banks.en.report, starter: 'I learned that' } }, 'en'), /report\.starter "I learned that" repeats the heading/);
  { const t = clone(banks.en); t.apparatus = { ...t.apparatus }; delete t.apparatus.spot; judge('PN4 a block without apparatus.spot', validateBank(t, 'en'), /apparatus\.\{ring,tank,star,spot\} missing/); }
  // (5) French typography: an fr block with ? : and -t-elle renders through the fr shell and verifies clean; a real text mismatch still fails
  {
    const all = bankModule('sink-or-float'); const had = Object.prototype.hasOwnProperty.call(all, 'fr'), saved = all.fr;
    all.fr = { ...clone(banks.en), questions: { orange: 'Une orange flotte-t-elle avec sa peau ? Et sans sa peau ?', cargo: 'Combien de cubes un bateau en pâte à modeler porte-t-il avant de couler ?' },
      report: { question: 'Ma question : je choisis', predict: 'Je prévois', result: 'Ce qui se passe', learned: 'J’ai appris', starter: 'Maintenant je sais que' } };
    try {
      const F = loadFace('report');
      const fr = { title: 'Mon compte rendu d’expérience : flotte ou coule', instruction: 'Choisis une question, écris ce que tu prévois, teste et écris ce que tu as appris.' };
      const r = await renderInstance({ type: F, theme: null, difficulty: 2, locale: 'fr', page, outDir: OUT, baseName: 'G1-399-gate-fr-typo-control', strings: fr });
      const nbsp = await page.evaluate(() => /\u00A0\?/.test(document.querySelector('[data-lcs-question-text]').textContent));
      ok(nbsp, 'fr control: the shell did not add U+00A0 before ? (the typography the normaliser exists for)');
      ok(!r.qa.verify.length, `fr typography control: verify ${JSON.stringify(r.qa.verify.slice(0, 3))}`);
      log.push(`  fr typography control (U+00A0 before ? in the page): ${r.qa.verify.length} findings`);
      const bad = { ...F, build(o, ctx) { const x = F.build.call(F, o, ctx); x.bodyHtml = x.bodyHtml.replace('Et sans sa peau', 'Et avec sa peau'); return x; } };
      const r2 = await renderInstance({ type: bad, theme: null, difficulty: 2, locale: 'fr', page, outDir: OUT, baseName: 'G1-399-gate-fr-typo-poison', strings: fr });
      judge('PT-fr a real question mismatch under French typography', r2.qa.verify, /question orange .* ≠ the bank/);
    } finally { if (had) all.fr = saved; else delete all.fr; }
  }
  { const b = clone(banks.en); delete b.strings['G3-400']; judge('PF3 a face string missing', validateBank(b, 'en'), /strings\.G3-400 missing \(rule 10\)/); }
  // ---- fix round 2 (the landing-audit panels): each new rule, poisoned; the shipped face / the en bank is its control
  judge('PF4 G2-383 titled an experiment (the page runs no test)', validateBank({ ...clone(banks.en), strings: { ...banks.en.strings, 'G2-383': { ...banks.en.strings['G2-383'], title: 'Sink or Float Experiment: True or False' } } }, 'en'), /strings\.G2-383 title .* claims an experiment/);
  judge('PF4b G1-408 titled a test (the scales are drawn, nothing is weighed)', validateBank({ ...clone(banks.en), strings: { ...banks.en.strings, 'G1-408': { ...banks.en.strings['G1-408'], title: 'Heavy or Light? A Sink or Float Scale Test' } } }, 'en'), /strings\.G1-408 title .* claims an experiment/);
  judge('PF5 K-384 titled an experiment (one drawing tub, no test)', validateBank({ ...clone(banks.en), strings: { ...banks.en.strings, 'K-384': { ...banks.en.strings['K-384'], title: 'Draw What Floats and Sinks: A Sink or Float Experiment' } } }, 'en'), /strings\.K-384 title .* claims an experiment/);
  {
    const de = clone(banks.en); de.experimentWords = ['versuch']; de.strings = { ...de.strings, ...FACE_STRINGS.de, 'G1-399': { title: 'Schwimmen und Sinken: Versuch mit Vermutung', instruction: de.strings['G1-399'].instruction } };
    const ctl = validateBank(de, 'de').filter((x) => /rule 7[bc]/.test(x)); log.push(`  rule 7b/7c control (de fixture K-384 "${FACE_STRINGS.de['K-384'].title}"): ${ctl.length} findings`); ok(!ctl.length, `rule 7c control: ${ctl.join(' | ')}`);
    de.strings['K-384'] = { ...de.strings['K-384'], title: 'Was schwimmt, was sinkt? Ein Bild' };
    judge('PF6 de K-384 lead restates G1-204 "Schwimmt oder sinkt?"', validateBank(de, 'de'), /strings\.K-384 title lead .* restates the G1-204 title/);
  }
  { const b = clone(banks.en); delete b.shapeHeads.steel; judge('PF7 a block without shapeHeads.steel', validateBank(b, 'en'), /shapeHeads\.steel missing/); }
  await fp('PR16 F2 the lump drawn at 72 px beside its 120 px shapes (more clay)', 'shape', { forceLumpW: 72 }, /the clay is not conserved on the page/);
  { let m = null; const F = loadFace('shape'); try { F._buildWith(banks.en, { ...F.difficulty[2], lumpW: 72 }, { locale: 'en' }, { rng: makeRng('pr16b') }); } catch (e) { m = e.message; } judge('PR16b F2 builder refuses lumpW ≠ formW', m ? [m] : [], /lumpW 72 ≠ formW 120/); }
  await fp('PR17 F2 the steel strip without its own head', 'shape', { forceNoSteelHead: true }, /the steel strip has no head of its own/);
  await fp('PR18 F2 the trial tanks without the float / sink key', 'shape', { forceNoLegend: true }, /no float \/ sink key/);
  await fp('PR19 F3 the clay sentence T6 on a page with no clay', 'truth', { forceOrder: ['T6', 'F1', 'T1', 'F5', 'F6', 'T8'] }, /tf T6: needs the clay experiment/);
  await fp('PR20 F3 the retired F8 ("floats because it is light")', 'truth', { forceOrder: ['T4', 'F8', 'T1', 'F2', 'F6', 'T7'] }, /tf F8: retired/);
  await fp('PR23 F3 a light-things sentence without its sinking witness on the shelf', 'truth', { forceOrder: ['T1', 'F6', 'T5', 'F3', 'F5', 'T7'], forceDropShelf: 'nail' }, /shelf \[.*\] ≠ the union/);
  await fp('PR21 F5 one result tank for a two-test question', 'report', { forceResultTanks: 1 }, /draws 1 tank\(s\) but a question needs 2 tests/);
}

/** Control drafts carry all six strings (rule 10): the five face strings, written from the design §6 heads. */
const FACE_STRINGS = {
  de: {
    'G1-408': { title: 'Schwer oder leicht? Schwimmen und Sinken an der Waage', instruction: 'Die Waage zeigt, was schwerer ist: kreise ein, was im Wasser oben schwimmt.' },
    'G2-382': { title: 'Knete schwimmt: Versuch mit dem Knetboot', instruction: 'Male den Ring aus, wo jede Knetform landet, kreise ein, was schwimmt, und male dein Knetboot ins große Becken.' },
    // gate FIXTURES (never shipped): fix round 2 — G2-383 / K-384 claim no experiment (rule 7b), K-384 does not restate G1-204 (7c); fix round 3 — G1-408 too
    'G2-383': { title: 'Warum schwimmt etwas? Richtig oder falsch', instruction: 'Lies jeden Satz und kreise richtig oder falsch ein.' },
    'K-384': { title: 'Male Dinge im Wasser: oben und am Boden', instruction: 'Male zwei Dinge, die oben schwimmen, in die Kästchen am Wasser und zwei, die sinken, in die Kästchen am Boden.' },
    'G3-400': { title: 'Versuchsprotokoll: Schwimmen und Sinken', instruction: 'Wähle eine Frage, schreib deine Vermutung auf, mach den Versuch und schreib, was du gelernt hast.' },
  },
  fr: {
    'G1-408': { title: "Lourd ou léger ? Flotte ou coule sur la balance", instruction: 'La balance montre ce qui est le plus lourd : entoure ce qui flotte.' },
    'G2-382': { title: "La pâte à modeler qui flotte : l'expérience de la forme", instruction: "Colorie l'anneau où finit chaque forme, entoure ce qui flotte et dessine ton bateau dans le grand bassin." },
    'G2-383': { title: 'Pourquoi ça flotte ? Vrai ou faux', instruction: 'Lis chaque phrase et entoure vrai ou faux.' },
    'K-384': { title: 'Dessine les objets dans le bassin : mon dessin', instruction: "Dessine deux choses qui flottent dans les cases sur l'eau et deux qui coulent dans les cases au fond." },
    'G3-400': { title: "Mon compte rendu d'expérience : flotte ou coule", instruction: 'Choisis une question, écris ce que tu prévois, teste et écris ce que tu as appris.' },
  },
  es: {
    'G1-408': { title: '¿Pesado o ligero? Flota o se hunde en la balanza', instruction: 'La balanza muestra qué pesa más: encierra lo que flota en el agua.' },
    'G2-382': { title: 'La plastilina que flota: experimento de la forma', instruction: 'Colorea el anillo donde queda cada forma, encierra lo que flota y dibuja tu barco en el tanque grande.' },
    'G2-383': { title: '¿Por qué flota? Verdadero o falso', instruction: 'Lee cada oración y encierra verdadero o falso.' },
    'K-384': { title: 'Objetos que flotan y se hunden: mi dibujo', instruction: 'Dibuja dos cosas que flotan en los recuadros del agua y dos que se hunden en los recuadros del fondo.' },
    'G3-400': { title: 'Mi reporte del experimento: flota o se hunde', instruction: 'Elige una pregunta, escribe lo que predices, pruébalo y escribe lo que aprendiste.' },
  },
};
/* ---------------------------------------------------------------- main */
async function main() {
  const quick = process.argv.includes('--quick');
  const N = bankMod.SINK_OR_FLOAT_NEUTRAL;
  const banks = bankMod.SINK_OR_FLOAT;
  freeClaim.selfTest();
  // 0. primitive gates
  for (const [name, g] of [['water-tank', tankGate], ['clay-form', clayGate]]) {
    const before = console.log; const lines = []; console.log = (...a) => lines.push(a.join(' '));
    let p = false; try { p = g.main(); } finally { console.log = before; }
    ok(p, `qa/verify-b6-${name}.js FAILED:\n    ` + lines.slice(-6).join('\n    '));
    console.log(`${name} gate: ` + (lines.find((l) => /^(PASS|FAIL)/.test(l)) || '?'));
  }
  // 1-2. data
  const nf = validateNeutral(N); nf.forEach((x) => ok(false, 'neutral: ' + x));
  console.log(`neutral: ${nf.length} findings (CLAIMS ${N.CLAIMS.length}, PAIRS ${N.PAIRS.length}, TF ${Object.keys(N.TF).length})`);
  for (const loc of Object.keys(banks)) { const bf = validateBank(banks[loc], loc); bf.forEach((x) => ok(false, `bank ${loc}: ` + x)); console.log(`bank ${loc}: ${bf.length} findings`); }
  ok(banks.en.strings[ID].title === TYPE.i18n.en.title && banks.en.strings[ID].instruction === TYPE.i18n.en.instruction, 'the bank\'s base strings ≠ the spec\'s i18n.en');
  {
    const base = N.CLAIMS.filter((c) => c.use.includes('base'));
    console.log(`base pool: ${base.filter((c) => c.result === 'float').length} float / ${base.filter((c) => c.result === 'sink').length} sink`);
  }
  // unauthored locale refuses; the authored en does not (the poison direction)
  {
    const all = bankModule('sink-or-float');
    const probe = (loc) => { const had = Object.prototype.hasOwnProperty.call(all, loc), saved = all[loc]; delete all[loc]; try { TYPE.build({ difficulty: 2, locale: loc }, { rng: makeRng('u') }); return null; } catch (e) { return e.message; } finally { if (had) all[loc] = saved; } };
    const msg = probe('en');
    ok(msg && /has no en block/.test(msg), `an unauthored locale REFUSES (got ${msg})`);
    let real = null; try { TYPE.build({ difficulty: 2, locale: 'en' }, { rng: makeRng('u') }); } catch (e) { real = e.message; }
    ok(!real, `poison — the authored en refused (${real})`);
  }
  // 4a. node sweep: per-position float share, the order rules, mustInclude, locale neutrality
  {
    const synth = { ...banks.en, floatWord: 'schwimmt oben', sinkWord: 'geht unter', labels: Object.fromEntries(Object.keys(banks.en.labels).map((k) => [k, 'X' + k])) };
    const pos = Array(6).fill(0); let bad = 0, neutral = 0; const pages = new Set();
    for (let s = 1; s <= 400; s++) {
      const r = TYPE._buildWith(banks.en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('G1-399-sweep-' + s) });
      const r2 = TYPE._buildWith(synth, TYPE.difficulty[2], { locale: 'de' }, { rng: makeRng('G1-399-sweep-' + s) });
      if (r.meta.items.join() !== r2.meta.items.join()) neutral++;
      r.meta.results.forEach((x, i) => { if (x === 'float') pos[i]++; });
      if (!TYPE.orderOk(r.meta.results)) bad++;
      const cs = r.meta.items.map((id) => N.CLAIMS.find((c) => c.id === id));
      if (!cs.some((c) => c.big && c.result === 'float') || !cs.some((c) => c.small && c.result === 'sink')) bad++;
      pages.add(r.meta.items.join());
    }
    pos.forEach((n, i) => ok(Math.abs(n / 400 - 0.5) <= 0.05, `node sweep: row ${i + 1} float share ${(n / 4).toFixed(1)} % (50 ± 5, both directions)`));
    ok(bad === 0, `node sweep: ${bad} pages break an order rule / mustInclude`);
    ok(neutral === 0, `node sweep: ${neutral} draws differ by locale`);
    ok(pages.size >= 380, `node sweep: only ${pages.size} distinct pages of 400`);
    console.log(`node sweep 400 seeds: float share per row ${pos.map((n) => (n / 4).toFixed(1) + '%').join(' ')} · rule breaks ${bad} · locale-dependent ${neutral} · distinct ${pages.size}`);
    const shipped = TYPE._buildWith(banks.en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: ID, theme: null, difficulty: 2, seedEpoch: 1 })) });
    console.log(`shipped seed (epoch 1): ${shipped.meta.items.join(',')} = ${shipped.meta.results.map((x) => x[0].toUpperCase()).join('')}`);
    ok(TYPE.orderOk(shipped.meta.results), 'the shipped instance breaks an order rule');
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  try {
    // 3. renders
    for (const d of [1, 2, 3]) {
      const c = TYPE.difficulty[d];
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-399-gate-d${d}-en` });
      const share = assertRender(`d${d}`, r, { rows: c.items, pic: c.pic });
      const s8 = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-399-gate-d${d}-en-814`, strings: SHORT });
      const share8 = assertRender(`d${d} 814 chrome`, s8, { rows: c.items, pic: c.pic, fill: d === 2 });
      console.log(`render d${d} at the 814 chrome: body ${s8.m.body.h.toFixed(0)} · fill ${(share8 * 100).toFixed(1)} %`);
      console.log(`render d${d}: body ${r.m.body.h.toFixed(0)} · fill ${(share * 100).toFixed(1)} % · verify ${r.verify.length} · lints ${r.lints.length} · rows ${r.m.seq}`);
      if (d === 2) ok(r.m.pics.every((w) => w >= 56), 'd2: a picture under the gate floor 56');
    }
    for (const k of Object.keys(LONG)) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-399-gate-d2-longchrome-${k}`, strings: LONG[k] });
      const share = assertRender(`d2 long chrome ${k}`, r, { rows: 6, pic: 60, body: LONG[k].body });
      console.log(`render d2 long chrome ${k}: body ${r.m.body.h.toFixed(0)} · fill ${(share * 100).toFixed(1)} % · verify ${r.verify.length} · lints ${r.lints.length}`);
    }
    {
      const de = { ...banks.en, floatWord: 'schwimmt oben', sinkWord: 'geht unter', heads: { guess: 'Ich vermute', test: 'Der Versuch', surprise: 'Überrascht?' },
        labels: { ...banks.en.labels, pinecone: 'Tannenzapfen', potato: 'Kartoffel', scissors: 'Schere', toyboat: 'Spielzeugboot', pumpkin: 'Kürbis', hammer: 'Hammer', ball: 'Ball', nail: 'Nagel', log: 'Holzscheit', pencil: 'Bleistift', feather: 'Feder', pliers: 'Zange', lemon: 'Zitrone', banana: 'Banane', apple: 'Apfel', leaf: 'Blatt', key: 'Schlüssel', rock: 'Stein', bolt: 'Schraube' } };
      const fr = { ...banks.en, labels: { ...banks.en.labels, potato: 'pomme de terre', pinecone: 'pomme de pin', toyboat: 'bateau jouet' }, heads: { guess: 'Je prévois', test: 'Je vérifie', surprise: 'Surprise ?' } };
      for (const [name, blk] of [['de', de], ['fr', fr]]) {
        const t = withBlock(blk, { forceOrder: ['pinecone', 'potato', 'scissors', 'toyboat', 'pumpkin', 'nail'] });
        const r = await renderWith(page, t, { difficulty: 2, baseName: `G1-399-gate-widest-${name}`, strings: LONG.fi });
        r.verify = r.verify.filter((x) => !/label ".*" ≠ labels\.|the legend words ≠ the bank/.test(x));   // the synthetic block is not the en bank (expected)
        assertRender(`widest ${name} words + fi chrome`, r, { rows: 6, pic: 60, body: 677 });
        console.log(`render widest ${name}: labels ${r.m.labels.map((l) => l.t).join(' / ')} · verify ${r.verify.length}`);
      }
    }
    // 4b. render sweep
    const pages = new Set();
    for (let s = 1; s <= (quick ? 5 : 20); s++) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-399-gate-sweep-${s}`, seedEpoch: s });
      ok(!r.verify.length && !r.lints.length, `sweep ${s}: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${r.lints.length}`);
      pages.add(r.m.seq);
    }
    ok(pages.size === (quick ? 5 : 20), `sweep: ${pages.size} distinct pages`);
    console.log(`render sweep: ${pages.size} distinct verify-clean pages`);

    // 5. poisons — data
    const clone = (o) => JSON.parse(JSON.stringify(o));
    const nP = (fn) => { const n = clone(N); fn(n); return validateNeutral(n); };
    const bP = (fn, loc = 'en', base = banks.en) => { const b = clone(base); fn(b); return validateBank(b, loc); };
    judge('P1 christmas/candle in CLAIMS', nP((n) => n.CLAIMS.push({ id: 'candle', theme: 'christmas', noun: 'candle', result: 'float', conf: 'high', testable: true, use: ['base'], picOpened: true })), /candle .*EXCLUDED picture/);
    judge('P2 kitchen tools/spoon as sink', nP((n) => n.CLAIMS.push({ id: 'spoon', theme: 'kitchen tools', noun: 'spoon', result: 'sink', conf: 'high', testable: true, use: ['base'], picOpened: true })), /spoon .*EXCLUDED picture/);
    judge('P3 orange on the scale', nP((n) => { n.CLAIMS.find((c) => c.id === 'orange').use = ['scale']; }), /orange .*QUESTION|conf "question"/);
    judge('P4 a claim not opened', nP((n) => { n.CLAIMS.find((c) => c.id === 'lemon').picOpened = false; }), /lemon .*picOpened is not true/);
    judge('P5 a base-only picture (scissors) in a PAIR', nP((n) => n.PAIRS.push({ id: 'Q6', a: 'pencil', b: 'scissors', heavier: 'b' })), /PAIR Q6: scissors is not a scale row/);   // the design's P5 used the key, excluded in fix round 1
    judge('P19 the pink key back in CLAIMS (fix round 1)', nP((n) => n.CLAIMS.push({ id: 'key', theme: 'around the house', noun: 'key', result: 'sink', conf: 'high', testable: true, use: ['base'], picOpened: true, small: true })), /key .*EXCLUDED picture/);
    judge('P6 Q1 pencil heavier', nP((n) => { n.PAIRS.find((p) => p.id === 'Q1').heavier = 'a'; }), /PAIR Q1: a Q pair's heavier side/);
    judge('P7 "A potato floats." marked T', nP((n) => { n.TF.F1.truth = 'T'; }), /TF F1: marked T but says potato float/);
    const deBlock = { ...clone(banks.en), floatWord: 'schwimmt oben', sinkWord: 'geht unter', forbidden: ['schwere dinge sinken', 'dichte', 'leichte dinge schwimmen'], experimentWords: ['versuch', 'vermutung'],
      labels: { ...banks.en.labels, rock: 'Stein', nail: 'Nagel', log: 'Holzscheit', pumpkin: 'Kürbis' }, strings: { [ID]: { title: 'Schwimmen und Sinken: Versuch mit Vermutung', instruction: 'Male vor dem Versuch einen Ring im ersten Becken aus.' } }, instructionBans: { base: ['Linie', 'Gruppe', 'Kreis'] }, apparatus: { ring: 'Ring', tank: 'Becken', star: 'Stern', spot: 'Kästchen' } };
    deBlock.strings = { ...deBlock.strings, ...FACE_STRINGS.de };
    const deCtl = validateBank(deBlock, 'de'); log.push(`  control de draft: ${deCtl.length} findings${deCtl.length ? ' — ' + deCtl.slice(0, 3).join(' | ') : ''}`); ok(!deCtl.length, 'the de control draft must be clean');
    judge('P8 de TRUE "Schwere Dinge sinken."', validateBank({ ...deBlock, tf: { ...banks.en.tf, T7: 'Schwere Dinge sinken.' } }, 'de'), /tf\.T7 TRUE sentence .*forbidden/);
    const frBlock = { ...clone(banks.en), labels: { ...banks.en.labels, rock: 'caillou', nail: 'clou' }, experimentWords: ['expérience', 'prévois'], forbidden: ['densité'], apparatus: { ring: 'anneau', tank: 'bassin', star: 'étoile', spot: 'case' }, strings: { [ID]: { title: 'Flotte ou coule : je prévois, je vérifie', instruction: 'Colorie un anneau dans le premier bassin avant l\'expérience.' } } };
    frBlock.strings = { ...frBlock.strings, ...FACE_STRINGS.fr };
    const frCtl = validateBank(frBlock, 'fr'); log.push(`  control fr draft: ${frCtl.length} findings${frCtl.length ? ' — ' + frCtl.slice(0, 3).join(' | ') : ''}`); ok(!frCtl.length, 'the fr control draft must be clean');
    judge('P9 fr base title "Flotte ou coule ?"', validateBank({ ...frBlock, strings: { [ID]: { ...frBlock.strings[ID], title: 'Flotte ou coule ?' } } }, 'fr'), /equals the G1-204 title/);
    const esBlock = { ...clone(banks.en), labels: { ...banks.en.labels, rock: 'piedra', nail: 'clavo' }, experimentWords: ['experimento', 'predice'], forbidden: ['flotación'], apparatus: { ring: 'anillo', tank: 'tanque', star: 'estrella', spot: 'recuadro' }, strings: { [ID]: { title: 'Experimento flota o se hunde: predice y comprueba', instruction: 'Colorea un anillo en el primer tanque antes de la prueba.' } } };
    esBlock.strings = { ...esBlock.strings, ...FACE_STRINGS.es };
    const esCtl = validateBank(esBlock, 'es'); log.push(`  control es draft: ${esCtl.length} findings${esCtl.length ? ' — ' + esCtl.slice(0, 3).join(' | ') : ''}`); ok(!esCtl.length, 'the es control draft must be clean');
    judge('P10 es "Experimento de flotación"', validateBank({ ...esBlock, strings: { [ID]: { ...esBlock.strings[ID], title: 'Experimento de flotación' } } }, 'es'), /says flotación/);
    judge('P11 en "Draw a line to the group"', bP((b) => { b.strings[ID].instruction = 'Draw a line to the group.'; }), /instruction names "line"/);
    judge('P12 SHAPES.pancake', nP((n) => { n.SHAPES.pancake = 'float'; }), /SHAPES \[.*pancake.*\] ≠ ball, boat/);
    judge('P13 es label nail "uña"', validateBank({ ...esBlock, labels: { ...esBlock.labels, nail: 'uña' } }, 'es'), /labels\.nail "uña" is the vocab trap/);
    judge('P15 a label containing the apparatus word', bP((b) => { b.labels.nail = 'nail ring'; }), /labels\.nail "nail ring" contains the apparatus word "ring"/);
    judge('P16 the jewellery ring re-labelled into the pool', bP((b) => { b.labels.key = 'ring'; }), /labels\.key "ring" contains the apparatus word/);
    { let m = null; const b = clone(banks.en); b.labels.pencil = 'pencil ring'; try { TYPE._buildWith(b, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('p17') }); } catch (e) { m = e.message; } judge('P17 builder refuses an apparatus-word label', m ? [m] : [], /contains the apparatus word "ring"/); }
    judge('P18 accessories/ring back in CLAIMS', nP((n) => n.CLAIMS.push({ id: 'ring', theme: 'accessories', noun: 'ring', result: 'sink', conf: 'high', testable: true, use: ['base'], picOpened: true })), /ring .*EXCLUDED picture/);
    judge('P14 animals/duck in CLAIMS', nP((n) => n.CLAIMS.push({ id: 'duck', theme: 'animals', noun: 'duck', result: 'float', conf: 'high', testable: true, use: ['base'], picOpened: true })), /duck .*an animal picture/);

    // 5. poisons — render
    const rp = async (name, type, re, opts = {}) => { const r = await renderWith(page, type, { difficulty: 2, baseName: 'G1-399-gate-poison-' + name.split(' ')[0], ...opts }); judge(name, [...r.verify, ...r.lints.map((l) => JSON.stringify(l))], re); };
    await rp('PR1 a base ring pre-filled', withHtml((h) => h.replace(/(<circle [^>]*?)fill="#FFFFFF"([^>]*data-lcs-slot="floor")/, '$1fill="#146B5E"$2')), /pre-filled .*answer printed|rings differ/);
    {
      const d = TYPE.difficulty[2];
      const r0 = TYPE._buildWith(banks.en, d, { locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: ID, theme: null, difficulty: 2, seedEpoch: 1 })) });
      const f = r0.meta.items.filter((id, i) => r0.meta.results[i] === 'float'), s = r0.meta.items.filter((id, i) => r0.meta.results[i] === 'sink');
      await rp('PR5 rows F,F,F,S,S,S', withBlock(banks.en, { forceOrder: [...f, ...s] }), /three float in a row|entirely before/);
    }
    await rp('PR12 sink ring lifted off the gravel', withHtml((h) => h.replace(/(<circle [^>]*cy=")([\d.]+)("[^>]*data-lcs-slot="floor")/, (m, a, v, c) => a + (+v - 6) + c)), /sink ring does not rest on the floor/);
    // fix round 2: the pre-round-2 TANGENT floor ring (bottom 1 px into the gravel line) must now fail; the settled ring is the control
    await rp('PR22 base sink ring only tangent to the gravel line', withHtml((h) => h.replace(/(<circle [^>]*cy=")([\d.]+)("[^>]*data-lcs-slot="floor")/, (m, a, v, c) => a + Math.round((+v - (0.06 * 85 - 1)) * 100) / 100 + c)), /sink ring does not rest on the floor/);
    await rp('PR13 float ring fully under water', withHtml((h) => h.replace(/(<circle [^>]*cy=")([\d.]+)("[^>]*data-lcs-slot="top")/, (m, a, v, c) => a + (+v + 18) + c)), /float ring is not centred on the waterline/);
    await rp('PR10 a float word under a picture', withHtml((h) => h.replace(/(<span data-lcs-label[^>]*>[^<]*<\/span>)/, `$1<span style="font-size:14px">${banks.en.floatWord}</span>`)), /outcome printed/);
    // FILL both ways + SPARSE
    {
      const frozen = withHtml((h) => h.replace(/minmax\((\d+)px,(\d+)px\)\);row-gap/, '$1px);row-gap'));
      const r = await renderWith(page, frozen, { difficulty: 2, baseName: 'G1-399-gate-poison-FL', strings: SHORT });
      const before = fails.length; assertRender('FL', r, { rows: 6, pic: 60, fill: true }); const f = fails.splice(before);
      judge('FL rows frozen at their minimum (content ends high at 814)', f, /FILL — the content ends at/);
      const grown = withHtml((h) => h.replace(/minmax\((\d+)px,(\d+)px\)\);row-gap/, 'minmax(100px,100px));row-gap'));
      const g = await renderWith(page, grown, { difficulty: 2, baseName: 'G1-399-gate-poison-FG', strings: LONG.fi });
      const b2 = fails.length; assertRender('FG', g, { rows: 6, pic: 60 }); const f2 = [...fails.splice(b2), ...g.verify];
      judge('FG rows grown past the 677 fi body', f2, /FILL overflow|reaches the footer/);
      const loose = withHtml((h) => h.replace(/minmax\((\d+)px,(\d+)px\)\);row-gap/, 'minmax($1px,1fr));row-gap'));
      const t = { ...loose, build(o, ctx) { return loose.build.call(loose, { ...o, difficulty: 1 }, ctx); } };
      const sp = await renderWith(page, t, { difficulty: 1, baseName: 'G1-399-gate-poison-SP', strings: SHORT });
      judge('SP d1 rows uncapped (1fr)', sp.verify, /SPARSE — a \d+ px blank band/);
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
