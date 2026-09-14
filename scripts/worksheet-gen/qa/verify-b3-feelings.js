#!/usr/bin/env node
/**
 * verify-b3-feelings.js — the K-319 `feelings` gate (design file
 * docs/worksheet-gen/b3-designs/K-319-emotions.md §5, read with the
 * 2026-09-14 ruling: family key `feelings`; brief deliverable 4).
 *
 *   node scripts/worksheet-gen/qa/verify-b3-feelings.js [--quick]
 *
 * 1. BANK — every locale block of data/b3/feelings.js against the §5
 *    validator rules: (1) every face.noun is an `emotions` noun with a
 *    vocabKey, `matchable:true` === exactly {happy sad angry scared surprised
 *    tired}, valence ids ⊆ GOOD ∪ BAD on the right side, faceOpened:true;
 *    (2) word = letters/apostrophe/space, <= 14 glyphs, distinct, lowercase in
 *    de unless capital:true, cross-checked case-insensitively against
 *    image-vocabulary.js[vocabKey][loc][0] or a declared `override`, wordF in
 *    es/pt/it/fr unless invariant:true; (3) every scene object resolves via
 *    fileUri from a pinned COLOUR dir with no localized BW marker, teddy_bear
 *    MUST be `toys`, bed MUST be `furniture`, noun ∉ B2_EXCLUDE, <= 2 objects,
 *    sceneOpened:true, feeling accepted, alsoPlausible ⊂ ids minus feeling,
 *    >= 4 decoy candidates, after vetoes >= 3 feelings with a scene and >= 4
 *    scenes, AND the (theme, noun) is in OPENED_CUES with the feeling it
 *    honestly cues — the record of the pictures the builder opened, so a cue
 *    that merely RESOLVES (miscellaneous/ghost: a smiling ghost) fails: the
 *    human open IS the gate; (4) F3 bank >= 3 faces per bin; (5) checkin.today
 *    has no `{` and ends in … or :, because is one word or null; (6) title
 *    <= 70 without the worksheet word, instruction <= 150.
 *    The gate MAY read the vocab and the manifest; the spec never does.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1/d2/d3 en, plus d1 and d2 under a 3-line title + 150-char
 *    instruction (the README 722 px body floor). Asserts verify() empty,
 *    qa/lints.js clean, and ITSELF: every `.ws-icon` >= tokens.density.K
 *    .minElement (56) AND >= the type floor 72 (qa/lints.js has no size lint),
 *    tiles === config (tileL × itemH / tileR × itemH) and >= 84, row count ===
 *    pairs, both columns inside the body and above the footer, every word
 *    literal fits its tile, and the NODE cross-check: every [data-lcs-word]
 *    text === FEELINGS[loc].feelings[id].word (the design's
 *    tools/gate-emotions-data.js rule, folded in here).
 * 3. SWEEP — 20 seeds at d2 (build only): the right column is never in
 *    fixed-point order and >= 2 distinct derangements appear; d3: >= 2
 *    distinct left orders (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1). The correct EN
 *    bank is the control. Design §5 poisons that the BASE can carry:
 *      P1  excited.matchable:true                      → bank rule 1 + the spec refuses
 *      P2  scene miscellaneous/ghost → scared (resolves) → bank rule 3 (OPENED_CUES)
 *      P6  object {theme:'zoo animals bw', noun:'lion'} → bank rule 3 (BW marker)
 *      P7  de word `Wütend`                            → bank rule 2 (case)
 *      P8  sv `glad` on two feelings                   → bank rule 2 + the spec refuses
 *      P10 base with 3 pairs                           → the spec guard + verify() on a 3-row page
 *      P11 {theme:'hospital', noun:'bed'}              → bank rule 3 (pinned furniture)
 *      P12 {theme:'toys bw', noun:'teddy_bear'}        → bank rule 3 (BW + pinned toys)
 *      P14 checkin today 'Hoy me siento {word}'        → bank rule 5
 *      P15 the old 760 stack under 3-line chrome       → qa/lints.js footer lint
 *    plus three the base needs that the design lists under verify():
 *      PF  a fixed point in the right column           → verify()
 *      PI  face icon forced to 48 px                   → the spec guard + the gate's own floor
 *      PW  a word tile printing another feeling's word → verify() + the node cross-check
 *    P3 P4 P5 P9 P13 are F1 / F3 / F4 poisons (Phase 2).
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b3-common.js');
const { vocab, excluded, fileUri } = require('../lib/b2-common.js');
const resolve = require('../image-cache/resolve.js');
const tokens = require('../primitives/_tokens.js');
const { feelingMatch } = require('../templates/components-b3.js');

const TYPE = require('../types/k/K-319-feelings.js');
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const MIN_ICON = tokens.density.K.minElement;   // 56
const TYPE_FLOOR = 72;                           // design §2: faces legible on the mono sheet
const MIN_TILE = 84;
const ACCEPTED_MATCH = ['happy', 'sad', 'angry', 'scared', 'surprised', 'tired'];
const ACCEPTED_GOOD = ['happy', 'merry', 'content', 'excited'];
const ACCEPTED_BAD = ['sad', 'angry', 'scared', 'capricious', 'disgusted'];
const GENDERED = ['es', 'pt', 'it', 'fr'];
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä/i;
/** The scene cues OPENED 2026-09-14 (contact sheet k319-cues.png) and the feeling each honestly cues. */
const OPENED_CUES = {
  'christmas/present': ['happy'], 'toys/balloon': ['happy'], 'accessories/medal': ['happy'], 'toys/teddy_bear': ['happy'],
  'weather/thunderstorm': ['scared'], 'hospital/syringe': ['scared'], 'furniture/bed': ['tired'],
  'around the house/pillow': ['tired'], 'space/moon': ['tired'], 'clothing/pajamas': ['tired'],
  'desserts and sweets/cake': ['happy'],
};
const PINNED = { teddy_bear: 'toys', bed: 'furniture' };

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }

/* ------------------------------------------------------------------ bank */
function validateBank(bank, loc) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  const emo = resolve.manifest().themes.emotions.nouns;
  const v = vocab();
  const feelings = Array.isArray(bank.feelings) ? bank.feelings : [];
  if (!feelings.length) { push('no feelings'); return f; }
  const ids = new Set();
  const matchable = [];
  const seenWord = new Set();
  let good = 0, bad = 0;
  for (const fe of feelings) {
    const tag = (x) => `feeling ${fe.id}: ${x}`;
    if (!fe.id || ids.has(fe.id)) push(tag('missing or duplicate id')); ids.add(fe.id);
    // rule 1 — face
    if (!fe.face || fe.face.theme !== 'emotions') push(tag(`face theme "${fe.face && fe.face.theme}" is not the emotions dir`));
    const n = fe.face && emo[fe.face.noun];
    if (!n) push(tag(`face noun "${fe.face && fe.face.noun}" is not a cached emotions noun`));
    else if (!n.vocabKey) push(tag(`face noun "${fe.face.noun}" has no vocabKey`));
    if (fe.faceOpened !== true) push(tag('faceOpened is not true'));
    if (fe.matchable === true) matchable.push(fe.id);
    if (fe.valence != null) {
      if (fe.valence === 'good') { if (!ACCEPTED_GOOD.includes(fe.id)) push(tag('valence good outside ACCEPTED_GOOD')); else good++; }
      else if (fe.valence === 'bad') { if (!ACCEPTED_BAD.includes(fe.id)) push(tag('valence bad outside ACCEPTED_BAD')); else bad++; }
      else push(tag(`valence "${fe.valence}"`));
    }
    for (const c of fe.confusable || []) if (!feelings.some((x) => x.id === c)) push(tag(`confusable "${c}" is not a feeling id`));
    // rule 2 — word
    const w = fe.word;
    if (typeof w !== 'string' || !/^[\p{L}' ]+$/u.test(w)) push(tag(`word "${w}" is not letters/apostrophe/space`));
    else {
      if ([...w].length > 14) push(tag(`word "${w}" > 14 glyphs`));
      const lw = w.toLocaleLowerCase(loc);
      if (seenWord.has(lw)) push(tag(`word "${w}" is printed by two feelings`)); seenWord.add(lw);
      if (loc === 'de' && fe.capital !== true && w !== lw) push(tag(`de word "${w}" is capitalised (adjectives never are; declare capital:true)`));
      const key = n && n.vocabKey;
      const cite = key && v[key] && v[key][loc] && v[key][loc][0];
      if (fe.override != null) { if (typeof fe.override !== 'string' || !fe.override.trim()) push(tag('override must be a non-empty string')); }
      else if (!cite) push(tag(`no vocab citation for key ${key} in ${loc}`));
      else if (cite.toLocaleLowerCase(loc) !== lw) push(tag(`word "${w}" ≠ vocab "${cite}" (declare override to diverge)`));
    }
    if (GENDERED.includes(loc) && fe.invariant !== true && (typeof fe.wordF !== 'string' || !fe.wordF)) push(tag('wordF missing (es/pt/it/fr need it unless invariant:true)'));
  }
  if ([...matchable].sort().join() !== [...ACCEPTED_MATCH].sort().join()) push(`matchable ids ${JSON.stringify(matchable)} ≠ the six accepted faces`);
  // rule 4 — F3 bank
  if (good < 3) push(`${good} good faces < 3 (F3 bin)`);
  if (bad < 3) push(`${bad} bad faces < 3 (F3 bin)`);
  // rule 3 — scenes
  const scenes = Array.isArray(bank.scenes) ? bank.scenes : [];
  const veto = new Set(bank.veto || []);
  const sceneIds = new Set();
  const perFeeling = {};
  let live = 0;
  for (const s of scenes) {
    const tag = (x) => `scene ${s.id}: ${x}`;
    if (!s.id || sceneIds.has(s.id)) push(tag('missing or duplicate id')); sceneIds.add(s.id);
    const objs = Array.isArray(s.objects) ? s.objects : [];
    if (objs.length < 1 || objs.length > 2) push(tag(`${objs.length} objects (1..2)`));
    for (const o of objs) {
      const ref = `${o.theme}/${o.noun}`;
      if (BW_MARKER.test(String(o.theme))) push(tag(`object ${ref} is in a B&W dir (localized marker)`));
      if (PINNED[o.noun] && o.theme !== PINNED[o.noun]) push(tag(`object ${ref} must be pinned to "${PINNED[o.noun]}"`));
      if (excluded(o.noun, loc)) push(tag(`object ${ref} is B2_EXCLUDE'd in ${loc}`));
      try { fileUri(o.theme, o.noun); } catch (e) { push(tag(`object ${ref} does not resolve: ${e.message}`)); }
      const opened = OPENED_CUES[ref];
      if (!opened) push(tag(`object ${ref} was never OPENED by the build (the human open is the gate)`));
      else if (!opened.includes(s.feeling)) push(tag(`object ${ref} does not honestly cue "${s.feeling}" (opened: ${opened.join('/')})`));
    }
    if (s.sceneOpened !== true) push(tag('sceneOpened is not true'));
    if (!ACCEPTED_MATCH.includes(s.feeling)) push(tag(`feeling "${s.feeling}" is not an accepted face`));
    const ap = Array.isArray(s.alsoPlausible) ? s.alsoPlausible : [];
    for (const a of ap) if (!ACCEPTED_MATCH.includes(a)) push(tag(`alsoPlausible "${a}" is not an accepted face`));
    if (ap.includes(s.feeling)) push(tag('alsoPlausible contains the feeling'));
    const decoys = ACCEPTED_MATCH.filter((x) => x !== s.feeling && !ap.includes(x)).length;
    if (decoys < 4) push(tag(`${decoys} decoy candidates < 4`));
    if (veto.has(s.id) && s.vetoable !== true) push(tag('vetoed but not vetoable'));
    if (!veto.has(s.id)) { live++; perFeeling[s.feeling] = (perFeeling[s.feeling] || 0) + 1; }
  }
  const feelingsWithScene = Object.keys(perFeeling).length;
  if (feelingsWithScene < 3) push(`after vetoes ${feelingsWithScene} feelings have a scene < 3 (F1 refused)`);
  if (live < 4) push(`after vetoes ${live} scenes < 4 (F1 refused)`);
  // rule 5 — checkin
  const c = bank.checkin || {};
  if (typeof c.today !== 'string' || !c.today.trim()) push('checkin.today missing');
  else {
    if (c.today.includes('{')) push(`checkin.today "${c.today}" carries a slot (an adjective frame is banned)`);
    if (!/[…:]$/.test(c.today.trim())) push(`checkin.today "${c.today}" does not end in … or :`);
  }
  if (typeof c.draw !== 'string' || !c.draw.trim()) push('checkin.draw missing');
  if (c.because != null && !/^\p{L}+$/u.test(c.because)) push(`checkin.because "${c.because}" is not one word`);
  // bins
  if (!bank.bins || !bank.bins.good || !bank.bins.bad || !bank.bins.good.label || !bank.bins.bad.label) push('bins.good/bad labels missing');
  // rule 6 — strings
  const s = bank.strings && bank.strings['K-319'];
  if (!s) push('strings K-319 missing');
  else {
    if (!s.title || [...s.title].length > 70) push('title > 70 chars');
    if (WORKSHEET_WORD.test(s.title || '')) push('title carries the worksheet word');
    if (!s.instruction || [...s.instruction].length > 150) push('instruction > 150 chars');
  }
  return f;
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { difficulty, baseName, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: 'en', page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-feelings]');
    const faces = [...document.querySelectorAll('[data-lcs-face]')].map((e) => ({ id: e.dataset.lcsFace, ...rect(e) }));
    const words = [...document.querySelectorAll('[data-lcs-word]')].map((e) => {
      const span = e.querySelector('span:not(.ws-match-dot)');
      return { id: e.dataset.lcsWord, text: span ? span.textContent.trim() : '', textW: span ? span.scrollWidth : 0, inner: e.clientWidth, ...rect(e) };
    });
    const icons = [...document.querySelectorAll('.ws-icon')].map((el) => { const r = rect(el); return Math.min(r.w, r.h); });
    const body = rect(document.querySelector('[data-lcs-body]'));
    return { pairs: root ? +root.dataset.lcsPairs : -1, faces, words, icons, body, foot: document.querySelector('.ws-foot').getBoundingClientRect().top, titleH: rect(document.querySelector('.ws-head')).h };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath };
}

function assertRender(name, r, d, bank, opts) {
  const cfg = TYPE.difficulty[d];
  const squeezed = !!(opts && opts.squeezed);   // long chrome: rows may shrink evenly down to the shared floor
  const minH = Math.max(cfg.picPx + 16, cfg.wordPx + 24);
  const rowOk = (h) => squeezed ? (h >= minH - 0.6 && h <= cfg.itemH + 0.6) : Math.abs(h - cfg.itemH) < 1;
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.pairs === cfg.pairs && r.m.faces.length === cfg.pairs && r.m.words.length === cfg.pairs, `${name}: ${r.m.faces.length} faces / ${r.m.words.length} words / stamp ${r.m.pairs} ≠ config ${cfg.pairs}`);
  ok(r.m.icons.length === cfg.pairs, `${name}: ${r.m.icons.length} icons, want ${cfg.pairs}`);
  const minIcon = r.m.icons.length ? Math.min(...r.m.icons) : 0;
  ok(minIcon >= MIN_ICON, `${name}: face icon ${minIcon} px < K floor ${MIN_ICON}`);
  ok(minIcon >= TYPE_FLOOR, `${name}: face icon ${minIcon} px < type floor ${TYPE_FLOOR}`);
  ok(Math.abs(minIcon - cfg.picPx) < 1, `${name}: face icon ${minIcon} ≠ config ${cfg.picPx}`);
  for (const t of r.m.faces) {
    ok(Math.abs(t.w - cfg.tileL) < 1 && rowOk(t.h), `${name}: face tile ${t.id} ${t.w}×${t.h} ≠ ${cfg.tileL}×${cfg.itemH}${squeezed ? ' (floor ' + minH + ')' : ''}`);
    ok(Math.min(t.w, t.h) >= MIN_TILE, `${name}: face tile ${t.id} below ${MIN_TILE}`);
  }
  for (const t of r.m.words) {
    ok(Math.abs(t.w - cfg.tileR) < 1 && rowOk(t.h), `${name}: word tile ${t.id} ${t.w}×${t.h} ≠ ${cfg.tileR}×${cfg.itemH}${squeezed ? ' (floor ' + minH + ')' : ''}`);
    ok(t.textW <= t.inner + 0.6, `${name}: word "${t.text}" ${t.textW} px wider than its tile ${t.inner}`);
    const b = (bank.feelings || []).find((x) => x.id === t.id);
    ok(!!b && b.word === t.text, `${name}: word tile ${t.id} prints "${t.text}" ≠ bank "${b && b.word}"`);
  }
  // the rows stay aligned: face i and word i share top and bottom (the dots face each other)
  r.m.faces.forEach((t, i) => {
    const w = r.m.words[i];
    ok(!!w && Math.abs(w.top - t.top) < 1 && Math.abs(w.bottom - t.bottom) < 1, `${name}: row ${i + 1} misaligned (face ${Math.round(t.top)}-${Math.round(t.bottom)} vs word ${w && Math.round(w.top)}-${w && Math.round(w.bottom)})`);
  });
  for (const t of [...r.m.faces, ...r.m.words]) {
    ok(t.left >= r.m.body.left - 0.6 && t.right <= r.m.body.right + 0.6, `${name}: tile ${t.id} outside the body column`);
    ok(t.bottom <= r.m.foot - 0.6, `${name}: tile ${t.id} reaches the footer (${Math.round(t.bottom)} vs ${Math.round(r.m.foot)})`);
  }
  return minIcon;
}

/* ----------------------------------------------------------------- poison */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function typeWithBank(bank) {
  return Object.assign({}, TYPE, { build(args, ctx) { return TYPE._buildWith(bank, args, ctx); } });
}
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
/** A page built from EXPLICIT columns (past the spec's own guards) — the seam for the verify()/node poisons. */
function pageFrom(left, right, d) {
  const cfg = TYPE.difficulty[d];
  return Object.assign({}, TYPE, { build() {
    return { bodyHtml: feelingMatch({
      left: left.map((id) => ({ id, src: fileUri('emotions', id) })),
      right: right.map((x) => ({ id: x.id, word: x.word })),
      tileL: cfg.tileL, tileR: cfg.tileR, itemH: cfg.itemH, picPx: cfg.picPx, wordPx: cfg.wordPx,
    }), meta: {} };
  } });
}
function buildRefusal(bank, d) {
  try { TYPE._buildWith(bank, { difficulty: d, locale: 'en' }, { rng: makeRng('poison') }); return []; } catch (e) { return [e.message]; }
}
/** Render a poisoned type and collect the gate's OWN findings without counting them against the control. */
async function gateFindings(page, type, d, baseName, bank) {
  const r = await renderWith(page, type, { difficulty: d, baseName });
  const before = fails.length, saved = assertions;
  assertRender(baseName, r, d, bank);
  const own = fails.splice(before);
  assertions = saved;
  return { r, own };
}
/**
 * Long-chrome fixtures (70-char title + 150-char instruction, both legal). Measured 2026-09-14 in
 * the real render: en chrome → body 778; the de fixture wraps the title to 3 lines → 733; the fi
 * fixture (long words in the ~375 px title column) wraps it to 4 lines → 700. The README's flat
 * "722" is neither; the stack must clear the footer at 700.
 */
const LONG = {
  de: { title: 'Gefühle erkennen: Verbinde jedes Gesicht mit dem passenden Gefühlswort',
    instruction: 'Schau dir jedes Gesicht genau an, überlege dir, wie es sich gerade fühlt, und ziehe dann mit dem Bleistift eine Linie zu dem Gefühlswort, das dazu passt.'.slice(0, 150), body: 735 },
  fi: { title: 'Tunteet: yhdistä jokaiset kasvot oikeaan tunnesanaan viivalla ja mieti',
    instruction: 'Katso jokaisia kasvoja tarkasti, mieti, miltä niistä tuntuu, ja piirrä sitten lyijykynällä viiva kasvoista siihen tunnesanaan, joka kuvaa tunnetta parhaiten.'.slice(0, 150), body: 705 },
};

async function main() {
  const banks = bankModule('feelings');
  const locales = Object.keys(banks);
  for (const loc of locales) {
    const f = validateBank(banks[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    const b = banks[loc];
    console.log(`bank ${loc}: ${b.feelings.filter((x) => x.matchable).length} matchable / ${b.feelings.length} faces, ${b.scenes.length} scenes (veto ${b.veto.length}), good ${b.feelings.filter((x) => x.valence === 'good').length} bad ${b.feelings.filter((x) => x.valence === 'bad').length}`);
  }
  const en = banks.en;
  for (const k of Object.keys(LONG)) ok([...LONG[k].title].length === 70 && [...LONG[k].instruction].length === 150, `long-chrome fixture ${k} is ${[...LONG[k].title].length}/${[...LONG[k].instruction].length} chars, want 70/150`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    // 2. renders through the real pipeline
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `K-319-gate-d${d}-en` });
      const mi = assertRender(`d${d}`, r, d, en);
      pngs.push(r.png);
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} icons ${mi} pairs ${r.m.pairs} body ${Math.round(r.m.body.h)} px, lowest tile ${Math.round(Math.max(...r.m.faces.map((t) => t.bottom)))} vs foot ${Math.round(r.m.foot)}`);
    }
    for (const k of Object.keys(LONG)) for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `K-319-gate-d${d}-en-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d${d} long chrome ${k}`, r, d, en, { squeezed: true });
      pngs.push(r.png);
      ok(r.m.body.h <= LONG[k].body, `d${d} long chrome ${k}: body ${Math.round(r.m.body.h)} px — the fixture did not squeeze the body to <= ${LONG[k].body} (head ${Math.round(r.m.titleH)} px)`);
      const rows = Math.round(r.m.faces[0].h * 10) / 10;
      console.log(`render d${d} long chrome ${k}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px (head ${Math.round(r.m.titleH)} px) rows ${rows} px`);
    }
    // a locale without a bank block REFUSES (never an en fallback)
    let refused = false;
    try { TYPE.build({ theme: null, difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /no de block/.test(e.message); }
    ok(refused, 'an unauthored locale must REFUSE (throw), not fall back to en');

    // 3. seed sweep (build only)
    if (!QUICK) {
      const orders = new Set(), lefts = new Set();
      for (let k = 1; k <= 20; k++) {
        const rng = makeRng(instanceSeed({ typeId: 'K-319', theme: null, difficulty: 2, seedEpoch: k }));
        const b = TYPE.build({ theme: null, difficulty: 2, locale: 'en' }, { rng });
        ok(b.meta.order.every((v, i) => v !== i), `sweep seed ${k}: fixed point in ${JSON.stringify(b.meta.order)}`);
        ok(b.meta.pairs.length === 6, `sweep seed ${k}: ${b.meta.pairs.length} pairs`);
        orders.add(b.meta.order.join(','));
        const rng3 = makeRng(instanceSeed({ typeId: 'K-319', theme: null, difficulty: 3, seedEpoch: k }));
        lefts.add(TYPE.build({ theme: null, difficulty: 3, locale: 'en' }, { rng: rng3 }).meta.pairs.join(','));
      }
      ok(orders.size >= 2, `sweep: only ${orders.size} distinct derangements over 20 seeds`);
      ok(lefts.size >= 2, `sweep d3: only ${lefts.size} distinct left orders over 20 seeds`);
      console.log(`sweep: ${orders.size} distinct derangements at d2, ${lefts.size} distinct left orders at d3, 0 fixed points`);
    }

    // 4. poisons
    let killed = 0;
    const TOTAL = 13;
    // P1 — excited.matchable:true (a second happy face: two right answers)
    {
      const b = clone(en); b.feelings.find((x) => x.id === 'excited').matchable = true;
      const a = judge('P1 bank', validateBank(b, 'en'), /matchable ids .* ≠ the six accepted faces/);
      const c = judge('P1 build', buildRefusal(b, 2), /bank marks "excited" matchable; only/, 'the spec refused the poisoned bank');
      if (a && c) killed++;
    }
    // P2 — a scene that RESOLVES but was never opened (the ghost smiles)
    {
      const b = clone(en); b.scenes.push({ id: 'ghost', objects: [{ theme: 'miscellaneous', noun: 'ghost' }], feeling: 'scared', alsoPlausible: [], vetoable: false, sceneOpened: true, alt: { en: 'a ghost' } });
      let resolves = false; try { fileUri('miscellaneous', 'ghost'); resolves = true; } catch (e) { /* absent */ }
      if (judge('P2', validateBank(b, 'en'), /object miscellaneous\/ghost was never OPENED/, resolves ? 'the picture resolves' : 'picture absent from the cache')) killed++;
    }
    // P6 — an object from a B&W dir
    {
      const b = clone(en); b.scenes[0].objects = [{ theme: 'zoo animals bw', noun: 'lion' }];
      if (judge('P6', validateBank(b, 'en'), /object zoo animals bw\/lion is in a B&W dir/)) killed++;
    }
    // P7 — de `Wütend` (the vocab capitalises; adjectives never are)
    {
      const b = clone(en); b.feelings.forEach((x) => { const cite = vocab()[x.face.noun].de[0]; x.word = x.id === 'angry' ? 'Wütend' : cite.toLocaleLowerCase('de'); });
      if (judge('P7', validateBank(b, 'de'), /de word "Wütend" is capitalised/)) killed++;
    }
    // P8 — sv `glad` on two feelings
    {
      const b = clone(en); b.feelings.forEach((x) => { x.word = vocab()[x.face.noun].sv[0].toLocaleLowerCase('sv'); });
      b.feelings.find((x) => x.id === 'surprised').word = 'glad'; b.feelings.find((x) => x.id === 'surprised').override = 'glad';
      const a = judge('P8 bank', validateBank(b, 'sv'), /word "glad" is printed by two feelings/);
      const c = judge('P8 build', buildRefusal(b, 2), /two feelings print the same word "glad"/, 'the spec refused the poisoned bank');
      if (a && c) killed++;
    }
    // P10 — a 3-pair page: the spec guard refuses; a page that reaches verify() with 3 rows fails there
    {
      const t = Object.assign({}, TYPE, { difficulty: { ...TYPE.difficulty, 2: { ...TYPE.difficulty[2], pairs: 3, pool: ['happy', 'sad', 'angry'] } } });
      let guard = []; try { t._buildWith(en, { difficulty: 2, locale: 'en' }, { rng: makeRng('p10') }); } catch (e) { guard = [e.message]; }
      const a = judge('P10 guard', guard, /pairs 3 outside the K page rule 4..8/);
      const three = pageFrom(['happy', 'sad', 'angry'], [{ id: 'sad', word: 'sad' }, { id: 'angry', word: 'angry' }, { id: 'happy', word: 'happy' }], 2);
      const r = await renderWith(page, three, { difficulty: 2, baseName: 'K-319-gate-poison-P10' });
      const c = judge('P10 verify', r.verify, /3 pairs outside 4..8/, `${r.m.faces.length} faces on the page`);
      if (a && c) killed++;
    }
    // P11 — the hospital bed (a wheeled hospital bed = sick, not tired)
    {
      const b = clone(en); b.scenes.find((s) => s.id === 'bed').objects = [{ theme: 'hospital', noun: 'bed' }];
      if (judge('P11', validateBank(b, 'en'), /object hospital\/bed must be pinned to "furniture"/)) killed++;
    }
    // P12 — teddy_bear from the toys bw dir
    {
      const b = clone(en); b.scenes.find((s) => s.id === 'teddy').objects = [{ theme: 'toys bw', noun: 'teddy_bear' }];
      const f = validateBank(b, 'en');
      if (judge('P12', f, /object toys bw\/teddy_bear is in a B&W dir/) && judge('P12 pin', f, /object toys bw\/teddy_bear must be pinned to "toys"/)) killed++;
    }
    // P14 — an adjective slot in the check-in literal
    {
      const b = clone(en); b.checkin.today = 'Hoy me siento {word}';
      if (judge('P14', validateBank(b, 'en'), /checkin\.today .* carries a slot/)) killed++;
    }
    // P15 — the old RIGID 760 stack (6 × 118 + 5 × 12 = 768, no shrink floor) under the 4-line chrome → the footer lint
    {
      const rigid = Object.assign({}, TYPE, { build(args, ctx) {
        const out = TYPE._buildWith(en, args, ctx);
        out.bodyHtml = out.bodyHtml.replace(/height:108px;min-height:\d+px;flex:0 1 auto/g, 'height:118px;min-height:118px;flex:0 0 auto');
        return out;
      } });
      const r = await renderWith(page, rigid, { difficulty: 2, baseName: 'K-319-gate-poison-P15', strings: LONG.fi });
      if (judge('P15', r.lints, /footer overlap/, `body ${Math.round(r.m.body.h)} px, rows ${Math.round(r.m.faces[0].h)}`)) killed++;
    }
    // PF — a fixed point in the right column (row 1 = its own word)
    {
      const ids = ACCEPTED_MATCH;
      const fixed = pageFrom(ids, ids.map((id) => ({ id, word: en.feelings.find((x) => x.id === id).word })), 2);   // identity order: every row a fixed point
      const r = await renderWith(page, fixed, { difficulty: 2, baseName: 'K-319-gate-poison-PF' });
      if (judge('PF', r.verify, /row 1: ".*" sits straight across from its word \(fixed point\)/)) killed++;
    }
    // PI — a 48 px face: the spec guard refuses; past the guard the gate's OWN floor fires
    {
      const t = Object.assign({}, TYPE, { difficulty: { ...TYPE.difficulty, 2: { ...TYPE.difficulty[2], picPx: 48 } } });
      let guard = []; try { t._buildWith(en, { difficulty: 2, locale: 'en' }, { rng: makeRng('pi') }); } catch (e) { guard = [e.message]; }
      const a = judge('PI guard', guard, /picPx 48 < the type floor 72/);
      const shrunk = Object.assign({}, TYPE, { build(args, ctx) { const out = TYPE._buildWith(en, args, ctx); out.bodyHtml = out.bodyHtml.replace(/width:80px;height:80px/g, 'width:48px;height:48px'); return out; } });
      const { r, own } = await gateFindings(page, shrunk, 2, 'K-319-gate-poison-PI', en);
      const c = judge('PI floor', own, /face icon 48 px < K floor 56/, `verify ${r.verify.length} (its 72 floor also fires) lints ${r.lints.length}`);
      if (a && c) killed++;
    }
    // PW — a word tile printing another feeling's word (the id stays right: only the text is wrong)
    {
      const ids = ACCEPTED_MATCH;
      const right = [5, 0, 1, 2, 3, 4].map((i) => ({ id: ids[i], word: ids[i] === 'tired' ? 'happy' : en.feelings.find((x) => x.id === ids[i]).word }));
      const swapped = pageFrom(ids, right, 2);
      const { r, own } = await gateFindings(page, swapped, 2, 'K-319-gate-poison-PW', en);
      const a = judge('PW verify', r.verify, /two word tiles print the same word/);
      const c = judge('PW node', own, /word tile tired prints "happy" ≠ bank "tired"/);
      if (a && c) killed++;
    }
    console.log('poison:\n' + poisonLog.join('\n'));
    const allKilled = killed === TOTAL;
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && allKilled;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/${TOTAL} poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateBank, OPENED_CUES };
