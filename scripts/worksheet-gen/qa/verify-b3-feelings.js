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
 *    P3 P4 P5 P9 P13 are F1 / F3 / F4 poisons — PHASE 2 (2026-09-14), sections 5-7 below.
 *
 * PHASE 2 — THE FACES (types/k/): K-331 scene · K-332 draw · K-333 valence
 * sort (handwritten factory instance) · K-334 choice · K-335 check-in.
 *
 * 5. RENDER — every face through the real pipeline at d2 en, plus the two
 *    long-chrome fixtures (3-line de title → body 733; 4-line fi title → 700):
 *    verify() empty, qa/lints.js clean, and the gate's OWN floors: every
 *    `.ws-icon` >= 56 (token) and === the face's facePx / objPx (72 / 88;
 *    F3 78 from the factory's formula), choice tiles === 84 (F5 100×108),
 *    everything above the footer; per face the NODE cross-checks the page
 *    cannot make (verify runs in page.evaluate, no require):
 *      F1 every card's data-lcs-answer === the bank scene's feeling, its
 *         objects === the bank scene's objects, no tile ∈ alsoPlausible;
 *      F3 the spec's ITEMS literal ≡ the bank's valence set, every strip
 *         face filed under its bank valence, bin labels === bank.bins;
 *      F4 every row's word === bank word; F5 every label === bank word,
 *         today/draw literals === bank.checkin, every label inside its tile (96 px inner).
 *    F1 ODD-GRID CONTROL: a bank with veto:['syringe'] fills 5 cards (2+1+2),
 *    the fifth centred under the grid — verify 0, lints 0 (a legal K page).
 * 6. SWEEP (skipped by --quick) — 20 seeds: F1 >= 2 distinct scene sets, the
 *    correct tile in >= 2 positions and no feeling on > 2 cards every seed;
 *    F4 all 3 positions every seed; F2 >= 2 distinct orders.
 * 7. POISON — the five §5 poisons the base deferred, plus face-structure ones:
 *      P3  F1 `present` with tiles [happy, surprised, tired]  → node gate (alsoPlausible)
 *      P4  F1 page with `happy` on 4 of 6 cards                → verify() maxPerFeeling
 *      P5  F3 `tired` filed under `bad`                         → verify() valence + node bank cross-check
 *      P9  F4 row `scared` with distractor `surprised`          → verify() confusable
 *      P13 F3 perBin:4                                          → the spec guard + the strip wraps past it
 *      PX  F1 correct tile in position 1 on every card          → verify()
 *      PO  F1 the same object on two cards                      → verify()
 *      PS  F1 six cards, two feelings only                      → verify() minFeelings
 *      PM  F2 a model face printed beside the word              → verify() (the child draws it)
 *      PL  F5 a label wider than its tile                       → verify() clipped label
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
/** Run assertions and RETURN their findings instead of counting them (a poisoned page judged by the gate's own checks). */
ok.collect = (fn) => { const before = fails.length, saved = assertions; fn(); const own = fails.splice(before); assertions = saved; return own; };

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
  // rule 6 — strings: the base + the five faces (Phase 2 ids), titles distinct within the family
  const titles = new Set();
  for (const id of ['K-319', 'K-331', 'K-332', 'K-333', 'K-334', 'K-335']) {
    const s = bank.strings && bank.strings[id];
    if (!s) { push(`strings ${id} missing`); continue; }
    if (!s.title || [...s.title].length > 70) push(`${id} title > 70 chars`);
    if (WORKSHEET_WORD.test(s.title || '')) push(`${id} title carries the worksheet word`);
    if (!s.instruction || [...s.instruction].length > 150) push(`${id} instruction > 150 chars`);
    const t = (s.title || '').toLocaleLowerCase(loc);
    if (titles.has(t)) push(`${id} title "${s.title}" duplicates a sibling face`); titles.add(t);
  }
  // F5 label size: optional, 17 or 18 (a panel declares 17 when its widest word overflows the 94 px tile at 18)
  if (c.labelPx != null && ![17, 18].includes(c.labelPx)) push(`checkin.labelPx ${c.labelPx} is not 17 or 18`);
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


/* ====================================================================== PHASE 2 — the faces (sections 5-7) */
const { loadType } = require('../lib/load-types.js');
const { makeScienceCategorySort } = require('../types/_shared/science-category-sort.js');
const C3 = require('../templates/components-b3.js');   // the face components (feelingScene*/feelingChoice*/feelingDrawCard)

const FACES = { scene: 'K-331', draw: 'K-332', valence: 'K-333', choice: 'K-334', checkin: 'K-335' };

function src(id) { return fileUri('emotions', id); }

/* ------------------------------------------------------------ measure */
async function measure(page) {
  return page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-feelings]');
    const layout = root ? root.dataset.lcsLayout : (document.querySelector('.sci-sort') ? 'valence' : null);
    const icons = [...document.querySelectorAll('.ws-icon')].map((el) => { const r = rect(el); return { px: Math.min(r.w, r.h), obj: el.dataset.lcsSceneObj || null, choice: el.closest('[data-lcs-choice]') ? el.closest('[data-lcs-choice]').dataset.lcsChoice : null }; });
    const tiles = [...document.querySelectorAll('[data-lcs-choice]')].map((el) => { const l = el.querySelector('[data-lcs-label]'); return { id: el.dataset.lcsChoice, ...rect(el), label: l ? l.textContent.trim() : null, labelW: l ? l.scrollWidth : 0, labelInner: l ? l.clientWidth : 0 }; });
    const cards = [...document.querySelectorAll('[data-lcs-scene]')].map((c) => ({
      id: c.dataset.lcsScene, answer: c.dataset.lcsAnswer, correct: +c.dataset.lcsCorrect,
      objects: [...c.querySelectorAll('[data-lcs-scene-obj]')].map((o) => o.dataset.lcsSceneObj),
      tiles: [...c.querySelectorAll('[data-lcs-choice]')].map((t) => t.dataset.lcsChoice),
      ...rect(c.closest('.ws-card')),
    }));
    const rows = [...document.querySelectorAll('[data-lcs-row]')].map((r) => { const w = r.querySelector('[data-lcs-targetword]'); return { target: r.dataset.lcsTarget, correct: +r.dataset.lcsCorrect, word: w.textContent.trim(), wordW: w.scrollWidth, wordInner: w.clientWidth, tiles: [...r.querySelectorAll('[data-lcs-choice]')].map((t) => t.dataset.lcsChoice), ...rect(r) }; });
    const draws = [...document.querySelectorAll('[data-lcs-drawcard]')].map((c) => { const w = c.querySelector('[data-lcs-word]'); const f = c.querySelector('[data-lcs-blankface]'); return { id: w ? w.dataset.lcsWord : null, word: w ? w.textContent.trim() : null, d: f ? +f.dataset.lcsBlankface : 0, face: f ? rect(f) : null, ...rect(c) }; });
    const sci = [...document.querySelectorAll('[data-sci-item]')].map((i) => { const im = i.querySelector('img'); return { bin: i.dataset.sciItem, noun: decodeURIComponent(im.src).split('/').pop().replace(/@3x\.webp$/, ''), top: Math.round(i.getBoundingClientRect().top) }; });
    const binLabels = [...document.querySelectorAll('.sci-bin-label')].map((l) => l.textContent.trim());
    const today = document.querySelector('[data-lcs-today-literal]'), draw = document.querySelector('[data-lcs-draw-literal]');
    // the lowest INK on the page: pictures, choice tiles, text, the blank face, ruling rows, bins — never a layout
    // box (a flex container legitimately ends ON the footer's top edge, as the base's .ws-match does; the lint
    // guards the band itself, this measures the printed content's margin above it)
    const INK = '[data-lcs-body] img, [data-lcs-body] [data-lcs-choice], [data-lcs-body] span:not(.ws-card-badge), [data-lcs-body] [data-lcs-blankface], [data-lcs-body] [data-lcs-ruling-row], [data-lcs-body] .sci-bin, [data-lcs-body] .sci-item';
    const all = [...document.querySelectorAll(INK)].filter((e) => e.getBoundingClientRect().height > 0);
    const lowest = all.length ? Math.max(...all.map((e) => e.getBoundingClientRect().bottom)) : 0;
    return {
      layout, icons, tiles, cards, rows, draws, sci, binLabels,
      today: today ? today.textContent.trim() : null, draw: draw ? draw.textContent.trim() : null,
      ruling: document.querySelectorAll('[data-lcs-ruling-row]').length,
      body: rect(document.querySelector('[data-lcs-body]')), foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
      titleH: rect(document.querySelector('.ws-head')).h, lowest,
    };
  });
}

async function renderFace(page, type, { baseName, strings, difficulty }) {
  const out = await renderInstance({ type, theme: null, difficulty: difficulty || 2, locale: 'en', page, outDir: OUT, baseName, strings });
  const m = await measure(page);
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

/* ------------------------------------------------------- assertions */
function assertCommon(ok, name, r, { icons }) {
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.icons.length > 0, `${name}: no pictures on the page`);
  for (const ic of r.m.icons) ok(ic.px >= MIN_ICON, `${name}: icon ${Math.round(ic.px)} px < K floor ${MIN_ICON}`);
  if (icons) for (const ic of r.m.icons) {
    const want = ic.obj ? icons.obj : icons.face;
    ok(Math.abs(ic.px - want) < 1, `${name}: ${ic.obj ? 'object ' + ic.obj : 'face ' + ic.choice} icon ${Math.round(ic.px)} ≠ ${want}`);
  }
  ok(r.m.lowest <= r.m.foot - 0.6, `${name}: content reaches ${Math.round(r.m.lowest)} against the footer at ${Math.round(r.m.foot)}`);
}

function assertScene(ok, name, r, bank, cfg) {
  assertCommon(ok, name, r, { icons: { face: cfg.facePx, obj: cfg.objPx } });
  const veto = new Set(bank.veto || []);
  const scenes = Object.fromEntries(bank.scenes.map((s) => [s.id, s]));
  ok(r.m.cards.length === cfg.expectCards, `${name}: ${r.m.cards.length} cards, want ${cfg.expectCards}`);
  for (const t of r.m.tiles) ok(Math.abs(t.w - cfg.tilePx) < 1 && Math.abs(t.h - cfg.tilePx) < 1, `${name}: tile ${t.id} ${Math.round(t.w)}×${Math.round(t.h)} ≠ ${cfg.tilePx}`);
  const per = {};
  r.m.cards.forEach((c, i) => {
    const s = scenes[c.id];
    ok(!!s, `${name}: card ${i + 1} scene "${c.id}" is not in the bank`);
    if (!s) return;
    ok(!veto.has(c.id), `${name}: card ${i + 1} scene "${c.id}" is vetoed`);
    ok(c.answer === s.feeling, `${name}: card ${i + 1} answer "${c.answer}" ≠ bank scene ${c.id} → ${s.feeling}`);
    ok(c.objects.join('|') === s.objects.map((o) => `${o.theme}/${o.noun}`).join('|'), `${name}: card ${i + 1} objects ${c.objects.join('|')} ≠ bank ${s.objects.map((o) => `${o.theme}/${o.noun}`).join('|')}`);
    for (const ap of s.alsoPlausible || []) ok(!c.tiles.includes(ap), `${name}: card ${i + 1} (${c.id}) offers "${ap}", alsoPlausible for ${s.feeling} — two right answers`);
    ok(c.tiles.length === cfg.choices, `${name}: card ${i + 1} has ${c.tiles.length} tiles`);
    per[c.answer] = (per[c.answer] || 0) + 1;
    ok(c.bottom <= r.m.foot + 0.6 && c.left >= r.m.body.left - 0.6 && c.right <= r.m.body.right + 0.6, `${name}: card ${i + 1} outside the body`);
  });
  for (const [f, k] of Object.entries(per)) ok(k <= cfg.maxPerFeeling, `${name}: "${f}" answers ${k} cards > ${cfg.maxPerFeeling}`);
  ok(Object.keys(per).length >= cfg.minFeelings, `${name}: ${Object.keys(per).length} distinct answers < ${cfg.minFeelings}`);
  ok(new Set(r.m.cards.map((c) => c.correct)).size >= 2, `${name}: the correct tile sits in one position on every card`);
}

function assertDraw(ok, name, r, bank, cfg) {
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.icons.length === 0, `${name}: ${r.m.icons.length} pictures on an open-ended draw page`);
  ok(r.m.draws.length === cfg.cards, `${name}: ${r.m.draws.length} cards ≠ ${cfg.cards}`);
  r.m.draws.forEach((c, i) => {
    const b = bank.feelings.find((x) => x.id === c.id);
    ok(!!b && b.word === c.word, `${name}: card ${i + 1} prints "${c.word}" ≠ bank "${b && b.word}"`);
    ok(cfg.pool.includes(c.id), `${name}: card ${i + 1} "${c.id}" outside the draw pool`);
    ok(c.d === cfg.d && c.face && Math.abs(c.face.w - cfg.d) < 1, `${name}: card ${i + 1} blank face ${c.d}/${c.face && Math.round(c.face.w)} ≠ ${cfg.d}`);
    ok(c.face && c.face.bottom <= c.bottom + 0.6 && c.face.top >= c.top - 0.6, `${name}: card ${i + 1} blank face outside its card`);
  });
  ok(r.m.lowest <= r.m.foot - 0.6, `${name}: content reaches the footer`);
}

function assertValence(ok, name, r, bank, spec) {
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  const val = Object.fromEntries(bank.feelings.filter((f) => f.valence).map((f) => [f.face.noun, f.valence]));
  // the spec's locale-neutral ITEMS literal ≡ the bank's valence set
  const specSet = spec.items.map((i) => `${i.noun}=${i.bin}`).sort().join(',');
  const bankSet = Object.entries(val).map(([n, v]) => `${n}=${v}`).sort().join(',');
  ok(specSet === bankSet, `${name}: spec ITEMS ${specSet} ≠ bank valence ${bankSet}`);
  ok(r.m.sci.length === 6, `${name}: ${r.m.sci.length} faces on the strip, want 6`);
  ok(new Set(r.m.sci.map((i) => i.top)).size === 1, `${name}: the strip wraps (${new Set(r.m.sci.map((i) => i.top)).size} rows)`);
  for (const it of r.m.sci) ok(val[it.noun] === it.bin, `${name}: strip face "${it.noun}" filed under "${it.bin}", bank valence "${val[it.noun]}"`);
  const good = r.m.sci.filter((i) => i.bin === 'good').length;
  ok(good === 3 && r.m.sci.length - good === 3, `${name}: ${good} good / ${r.m.sci.length - good} bad, want 3 / 3`);
  for (const ic of r.m.icons) ok(Math.abs(ic.px - 78) < 1, `${name}: face icon ${Math.round(ic.px)} ≠ the factory's 78 at six items`);
  ok(r.m.binLabels.join('|') === `${bank.bins.good.label}|${bank.bins.bad.label}`, `${name}: bin labels ${r.m.binLabels.join('|')} ≠ bank`);
  ok(r.m.lowest <= r.m.foot - 0.6, `${name}: content reaches the footer`);
}

function assertChoice(ok, name, r, bank, cfg, opts) {
  assertCommon(ok, name, r, { icons: { face: cfg.facePx } });
  ok(r.m.rows.length === cfg.rows, `${name}: ${r.m.rows.length} rows ≠ ${cfg.rows}`);
  for (const t of r.m.tiles) ok(Math.abs(t.w - cfg.tilePx) < 1 && Math.abs(t.h - cfg.tilePx) < 1, `${name}: tile ${t.id} ${Math.round(t.w)}×${Math.round(t.h)} ≠ ${cfg.tilePx}`);
  const minRow = cfg.minRow;   // the grid's minmax floor holds under every chrome (the rows GROW at 778, never shrink below it)
  void opts;
  r.m.rows.forEach((row, i) => {
    const b = bank.feelings.find((x) => x.id === row.target);
    ok(!!b && b.word === row.word, `${name}: row ${i + 1} prints "${row.word}" ≠ bank "${b && b.word}"`);
    ok(row.wordW <= row.wordInner + 0.6, `${name}: row ${i + 1} word "${row.word}" ${row.wordW} px wider than its ${row.wordInner} px column`);
    ok(row.h >= minRow - 0.6, `${name}: row ${i + 1} ${Math.round(row.h)} px < ${minRow}`);
    ok(row.tiles.length === cfg.choices, `${name}: row ${i + 1} ${row.tiles.length} tiles`);
    ok(row.bottom <= r.m.foot + 0.6, `${name}: row ${i + 1} past the footer's top edge`);
  });
  ok(new Set(r.m.rows.map((x) => x.correct)).size === cfg.choices, `${name}: the correct tile takes ${new Set(r.m.rows.map((x) => x.correct)).size} of ${cfg.choices} positions`);
}

function assertCheckin(ok, name, r, bank, cfg) {
  assertCommon(ok, name, r, { icons: { face: cfg.facePx } });
  ok(r.m.tiles.length === cfg.faces, `${name}: ${r.m.tiles.length} faces ≠ ${cfg.faces}`);
  r.m.tiles.forEach((t, i) => {
    ok(Math.abs(t.w - 100) < 1 && Math.abs(t.h - 108) < 1, `${name}: tile ${t.id} ${Math.round(t.w)}×${Math.round(t.h)} ≠ 100×108`);
    const b = bank.feelings.find((x) => x.id === t.id);
    ok(!!b && b.word === t.label, `${name}: tile ${i + 1} label "${t.label}" ≠ bank "${b && b.word}"`);
    ok(t.labelW <= t.labelInner + 0.6, `${name}: label "${t.label}" ${t.labelW} px > the tile's ${t.labelInner} px inner width (declare checkin.labelPx 17 for this locale)`);
  });
  ok(r.m.today === bank.checkin.today && r.m.draw === bank.checkin.draw, `${name}: literals "${r.m.today}" / "${r.m.draw}" ≠ bank`);
  ok(r.m.draws.length === 1 && r.m.draws[0].d === cfg.d, `${name}: blank face ${r.m.draws[0] && r.m.draws[0].d} ≠ ${cfg.d}`);
  ok(r.m.ruling === cfg.rows, `${name}: ${r.m.ruling} ruling rows ≠ ${cfg.rows}`);
}

/* ----------------------------------------------------------- poison seams */
/** A type whose build returns an EXPLICIT body (past every spec guard) with the base's verify(). */
function fixedPage(base, bodyHtml) { return Object.assign({}, base, { build() { return { bodyHtml, meta: {} }; } }); }
function sceneRoot(inner, n, cfg) {
  return `<div style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0" data-ws-content data-lcs-feelings data-lcs-layout="scene" data-lcs-cards="${n}" data-lcs-choices="${cfg.choices}" data-lcs-minfeelings="${cfg.minFeelings}" data-lcs-maxper="${cfg.maxPerFeeling}">${inner}</div>`;
}
function sceneCards(list, cfg) {
  return list.map((c) => C3.feelingSceneCard({ sceneId: c.id, answer: c.answer, correct: c.tiles.indexOf(c.answer), objects: c.objects.map((ref) => ({ ref, src: fileUri(ref.split('/')[0], ref.split('/')[1]) })), faces: c.tiles.map((id) => ({ id, src: src(id) })), objPx: cfg.objPx, tilePx: cfg.tilePx, facePx: cfg.facePx }));
}
function choiceRoot(lanes, cfg) {
  return `<div style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0" data-ws-content data-lcs-feelings data-lcs-layout="choice" data-lcs-rows="${lanes.length}" data-lcs-choices="${cfg.choices}" data-lcs-confusable="0">${C3.feelingChoicePage({ lanes, minRow: cfg.minRow })}</div>`;
}

/* ================================================================== run */
async function runFaces({ page, ok, judge, banks, LONG, QUICK, typeWithBank }) {
  const en = banks.en;
  const T = Object.fromEntries(Object.entries(FACES).map(([k, id]) => [k, loadType(id)]));
  const cfg = { scene: T.scene.difficulty[2], draw: T.draw.difficulty[2], choice: T.choice.difficulty[2], checkin: T.checkin.difficulty[2] };
  const pngs = [];
  const results = {};

  // 5. renders — en chrome + both long-chrome fixtures
  const fixtures = [['en', null], ['de', LONG.de], ['fi', LONG.fi]];
  for (const [layout, id] of Object.entries(FACES)) {
    for (const [fx, strings] of fixtures) {
      const name = `${id} ${layout}${fx === 'en' ? '' : ' long chrome ' + fx}`;
      const r = await renderFace(page, T[layout], { baseName: `${id}-gate-d2-en${fx === 'en' ? '' : '-longchrome-' + fx}`, strings });
      pngs.push(r.png);
      if (strings) ok(r.m.body.h <= LONG[fx].body, `${name}: body ${Math.round(r.m.body.h)} px — the fixture did not squeeze the body to <= ${LONG[fx].body}`);
      if (layout === 'scene') assertScene(ok, name, r, en, { ...cfg.scene, expectCards: 6 });
      else if (layout === 'draw') assertDraw(ok, name, r, en, cfg.draw);
      else if (layout === 'valence') assertValence(ok, name, r, en, T.valence);
      else if (layout === 'choice') assertChoice(ok, name, r, en, cfg.choice, { squeezed: !!strings });
      else assertCheckin(ok, name, r, en, cfg.checkin);
      if (fx === 'en') results[layout] = r;
      console.log(`render ${name}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}` +
        (layout === 'scene' ? ` cards ${r.m.cards.length} answers ${r.m.cards.map((c) => c.answer).join('/')} positions ${r.m.cards.map((c) => c.correct).join('')}` : '') +
        (layout === 'choice' ? ` rows ${r.m.rows.length} × ${Math.round(r.m.rows[0].h)} px positions ${r.m.rows.map((x) => x.correct).join('')}` : '') +
        (layout === 'valence' ? ` strip ${r.m.sci.map((i) => i.noun + '=' + i.bin).join(' ')}` : '') +
        (layout === 'checkin' ? ` labels ${r.m.tiles.map((t) => Math.round(t.labelW)).join('/')} px` : ''));
    }
  }
  // an unauthored locale REFUSES on every face
  for (const [layout, id] of Object.entries(FACES)) {
    let refused = false;
    try { T[layout].build({ theme: null, difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /no de block/.test(e.message); }
    ok(refused, `${id} ${layout}: an unauthored locale must REFUSE (throw), not fall back to en`);
  }
  // F1 odd-grid CONTROL: the syringe veto → 5 cards (2 + 1 + 2), the fifth centred; still a legal K page
  {
    const b = clone(en); b.veto = ['syringe'];
    const t = Object.assign({}, T.scene, { build(args, ctx) { return T.scene._buildWith(b, args, ctx); } });
    const r = await renderFace(page, t, { baseName: 'K-331-gate-d2-en-veto-syringe' });
    pngs.push(r.png);
    assertScene(ok, 'K-331 scene veto control', r, b, { ...cfg.scene, expectCards: 5 });
    const last = r.m.cards[4], first = r.m.cards[0];
    ok(last && first && last.left > first.left + 20 && last.right < r.m.body.right - 20, `K-331 veto control: the fifth card is not centred (${last && Math.round(last.left)}…${last && Math.round(last.right)})`);
    ok(r.m.cards.filter((c) => c.answer === 'scared').length === 1, 'K-331 veto control: scared should keep exactly one scene');
    const rfi = await renderFace(page, t, { baseName: 'K-331-gate-d2-en-veto-syringe-longchrome-fi', strings: LONG.fi });
    assertScene(ok, 'K-331 scene veto control long chrome fi', rfi, b, { ...cfg.scene, expectCards: 5 });
    console.log(`render K-331 veto control: cards ${r.m.cards.length} answers ${r.m.cards.map((c) => c.answer).join('/')} fifth card x ${Math.round(last.left)}…${Math.round(last.right)}; long chrome fi lowest ${Math.round(rfi.m.lowest)} vs foot ${Math.round(rfi.m.foot)}`);
  }

  // 6. sweep
  if (!QUICK) {
    const sets = new Set(), orders = new Set();
    for (let k = 1; k <= 20; k++) {
      const rs = makeRng(instanceSeed({ typeId: 'K-331', theme: null, difficulty: 2, seedEpoch: k }));
      const s = T.scene.build({ theme: null, difficulty: 2, locale: 'en' }, { rng: rs });
      sets.add(s.meta.scenes.slice().sort().join(','));
      ok(s.meta.scenes.length === 6, `sweep F1 seed ${k}: ${s.meta.scenes.length} cards`);
      ok(new Set(s.meta.correct).size >= 2, `sweep F1 seed ${k}: correct positions ${s.meta.correct.join('')}`);
      const per = {}; s.meta.answers.forEach((a) => { per[a] = (per[a] || 0) + 1; });
      ok(Object.values(per).every((n) => n <= 2) && Object.keys(per).length >= 3, `sweep F1 seed ${k}: answers ${JSON.stringify(per)}`);
      const rc = makeRng(instanceSeed({ typeId: 'K-334', theme: null, difficulty: 2, seedEpoch: k }));
      const c = T.choice.build({ theme: null, difficulty: 2, locale: 'en' }, { rng: rc });
      ok(new Set(c.meta.correct).size === 3, `sweep F4 seed ${k}: correct positions ${c.meta.correct.join('')}`);
      const rd = makeRng(instanceSeed({ typeId: 'K-332', theme: null, difficulty: 2, seedEpoch: k }));
      orders.add(T.draw.build({ theme: null, difficulty: 2, locale: 'en' }, { rng: rd }).meta.words.join(','));
    }
    ok(sets.size >= 2, `sweep F1: only ${sets.size} distinct scene sets over 20 seeds`);
    ok(orders.size >= 2, `sweep F2: only ${orders.size} distinct orders over 20 seeds`);
    console.log(`sweep faces: F1 ${sets.size} distinct scene sets, F2 ${orders.size} distinct orders, F4 all 3 positions on every seed`);
  }

  // 7. poisons
  let killed = 0;
  const TOTAL = 10;
  const sc = cfg.scene, ch = cfg.choice;
  const good6 = [   // the control page (2 happy + 2 scared + 2 tired, positions spread)
    { id: 'present', answer: 'happy', objects: ['christmas/present'], tiles: ['happy', 'sad', 'tired'] },
    { id: 'thunderstorm', answer: 'scared', objects: ['weather/thunderstorm'], tiles: ['sad', 'scared', 'happy'] },
    { id: 'bed', answer: 'tired', objects: ['furniture/bed'], tiles: ['happy', 'sad', 'tired'] },
    { id: 'balloon', answer: 'happy', objects: ['toys/balloon'], tiles: ['angry', 'happy', 'tired'] },
    { id: 'syringe', answer: 'scared', objects: ['hospital/syringe'], tiles: ['scared', 'tired', 'happy'] },
    { id: 'pillow-moon', answer: 'tired', objects: ['around the house/pillow', 'space/moon'], tiles: ['tired', 'angry', 'happy'] },
  ];
  const render6 = async (list, baseName) => {
    const t = fixedPage(T.scene, sceneRoot(C3.feelingSceneGrid({ cards: sceneCards(list, sc), cols: 2 }), list.length, sc));
    return renderFace(page, t, { baseName });
  };
  // control: the hand-built page passes verify + the node gate (so a poison below fails for its OWN reason)
  {
    const r = await render6(good6, 'K-331-gate-poison-control');
    assertScene(ok, 'K-331 poison control', r, en, { ...sc, expectCards: 6 });
  }
  // P3 — `present` with tiles [happy, surprised, tired]: surprised is alsoPlausible → two right answers (node gate)
  {
    const list = clone(good6); list[0].tiles = ['happy', 'surprised', 'tired'];
    const r = await render6(list, 'K-331-gate-poison-P3');
    const own = ok.collect(() => assertScene(ok, 'P3', r, en, { ...sc, expectCards: 6 }));
    if (judge('P3', own, /offers "surprised", alsoPlausible for happy/, `verify ${r.verify.length} (the page cannot see the bank)`)) killed++;
  }
  // P4 — happy on 4 of 6 cards → verify() maxPerFeeling
  {
    const list = clone(good6);
    list[2] = { id: 'medal', answer: 'happy', objects: ['accessories/medal'], tiles: ['happy', 'sad', 'tired'] };
    list[5] = { id: 'teddy', answer: 'happy', objects: ['toys/teddy_bear'], tiles: ['sad', 'happy', 'angry'] };
    const r = await render6(list, 'K-331-gate-poison-P4');
    if (judge('P4', r.verify, /"happy" is the answer on 4 cards > 2/)) killed++;
  }
  // PX — the correct tile in position 1 on every card → verify()
  {
    const list = clone(good6).map((c) => { const d = c.tiles.filter((x) => x !== c.answer); return { ...c, tiles: [d[0], c.answer, d[1]] }; });
    const r = await render6(list, 'K-331-gate-poison-PX');
    if (judge('PX', r.verify, /the correct tile sits in position 1 on every card/)) killed++;
  }
  // PO — the same object on two cards → verify()
  {
    const list = clone(good6); list[3] = { id: 'pajamas-moon', answer: 'tired', objects: ['clothing/pajamas', 'space/moon'], tiles: ['angry', 'happy', 'tired'] };
    const r = await render6(list, 'K-331-gate-poison-PO');
    if (judge('PO', r.verify, /object space\/moon already on another card/)) killed++;
  }
  // PS — six cards, two feelings only → verify() minFeelings
  {
    const list = clone(good6);
    list[1] = { id: 'medal', answer: 'happy', objects: ['accessories/medal'], tiles: ['sad', 'happy', 'tired'] };
    list[4] = { id: 'pajamas-moon', answer: 'tired', objects: ['clothing/pajamas', 'space/moon'], tiles: ['tired', 'angry', 'happy'] };
    list[5] = { id: 'bed', answer: 'tired', objects: ['furniture/bed'], tiles: ['sad', 'happy', 'tired'] };
    list[2] = { id: 'teddy', answer: 'happy', objects: ['toys/teddy_bear'], tiles: ['happy', 'sad', 'angry'] };
    // 3 happy + 3 tired: both maxPer AND minFeelings fire — judge on minFeelings
    const r = await render6(list, 'K-331-gate-poison-PS');
    if (judge('PS', r.verify, /2 distinct answers < 3/)) killed++;
  }
  // P5 — F3 `tired` filed under `bad` → verify() valence + the node bank cross-check
  {
    const items = T.valence.items.map((i) => (i.noun === 'sad' ? { theme: 'emotions', noun: 'tired', bin: 'bad' } : i));
    const poisoned = Object.assign({}, T.valence, { items, build(args, ctx) {
      const f = makeScienceCategorySort({ id: 'K-333', slug: 'x', gradeBand: 'K', exerciseType: 'feelings', data: { bins: [{ key: 'good', label: { en: 'Feels good' } }, { key: 'bad', label: { en: 'Feels bad' } }], items }, difficulty: { 2: { perBin: 3 } }, i18n: T.valence.i18n });
      // force tired onto the strip: sample the bad bin from [tired, angry, scared] only
      const rng = makeRng('p5-tired');
      return f.build(args, { rng: { ...rng, sample: (arr, n) => arr.filter((x) => x.bin === 'good' ? true : ['tired', 'angry', 'scared'].includes(x.noun)).slice(0, n), shuffle: rng.shuffle } });
    } });
    const r = await renderFace(page, poisoned, { baseName: 'K-333-gate-poison-P5' });
    const a = judge('P5 verify', r.verify, /"tired" has no unmistakable valence/);
    const own = ok.collect(() => assertValence(ok, 'P5', r, en, poisoned));
    const c = judge('P5 node', own, /spec ITEMS .* ≠ bank valence|strip face "tired" filed under "bad", bank valence "undefined"/);
    if (a && c) killed++;
  }
  // P13 — F3 perBin 4: the spec guard refuses; a page built past it wraps the strip → the gate's one-row assertion + verify()
  {
    let guard = [];
    const four = Object.assign({}, T.valence, { difficulty: { 1: { perBin: 4 }, 2: { perBin: 4 }, 3: { perBin: 4 } } });
    try { four.build({ theme: null, difficulty: 2, locale: 'en' }, { rng: makeRng('p13') }); } catch (e) { guard = [e.message]; }
    const a = judge('P13 guard', guard, /perBin 4 > 3 wraps the one-row strip/);
    const past = makeScienceCategorySort({ id: 'K-333', slug: 'x', gradeBand: 'K', exerciseType: 'feelings', data: { bins: [{ key: 'good', label: { en: 'Feels good' } }, { key: 'bad', label: { en: 'Feels bad' } }], items: T.valence.items }, difficulty: { 2: { perBin: 4 } }, i18n: T.valence.i18n });
    const pastT = Object.assign({}, past, { verify: T.valence.verify });
    const r = await renderFace(page, pastT, { baseName: 'K-333-gate-poison-P13' });
    const b = judge('P13 verify', r.verify, /the strip wraps: 2 rows of faces/, `${r.m.sci.length} faces, ${new Set(r.m.sci.map((i) => i.top)).size} rows`);
    if (a && b) killed++;
  }
  // P9 — F4 row `scared` with distractor `surprised` → verify() confusable
  {
    const lanes = ACCEPTED_MATCH.map((t, i) => {
      const others = ACCEPTED_MATCH.filter((x) => x !== t && !(t === 'scared' && x === 'surprised') && !(t === 'surprised' && x === 'scared'));
      let tiles;
      if (t === 'scared') tiles = ['surprised', 'scared', 'sad'];       // the poison row
      else { const d = others.slice(0, 2); tiles = d.slice(); tiles.splice(i % 3, 0, t); }
      return C3.feelingChoiceLane({ id: t, word: en.feelings.find((x) => x.id === t).word, wordPx: ch.wordPx, wordW: ch.wordW, correct: tiles.indexOf(t), faces: tiles.map((id) => ({ id, src: src(id) })), tilePx: ch.tilePx, facePx: ch.facePx });
    });
    const r = await renderFace(page, fixedPage(T.choice, choiceRoot(lanes, ch)), { baseName: 'K-334-gate-poison-P9' });
    if (judge('P9', r.verify, /distractor "surprised" is confusable with "scared"/)) killed++;
  }
  // PM — F2 a model face printed beside the word → verify() (the child draws it; a model is d1 copy, not this face)
  {
    const cards = cfg.draw.pool.map((id) => C3.feelingDrawCard({ id, word: en.feelings.find((x) => x.id === id).word, wordPx: cfg.draw.wordPx, d: cfg.draw.d })
      .replace('</div>', `<img class="ws-icon" src="${src(id)}" alt="" style="width:56px;height:56px"></div>`));
    const body = `<div style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0" data-ws-content data-lcs-feelings data-lcs-layout="draw" data-lcs-cards="4">${C3.feelingSceneGrid({ cards, cols: 2, rows: 2 })}</div>`;
    const r = await renderFace(page, fixedPage(T.draw, body), { baseName: 'K-332-gate-poison-PM' });
    if (judge('PM', r.verify, /a model face is printed/)) killed++;
  }
  // PL — F5 a label wider than its tile → verify() clipped label
  {
    const b = clone(en); b.feelings.find((x) => x.id === 'surprised').word = 'surprisedsurprised';
    const t = Object.assign({}, T.checkin, { build(args, ctx) { return T.checkin._buildWith(b, args, ctx); } });
    const r = await renderFace(page, t, { baseName: 'K-335-gate-poison-PL' });
    if (judge('PL', r.verify, /label "surprisedsurprised" clipped in its tile/)) killed++;
  }
  return { killed, TOTAL, pngs };
}

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
    // 5-7. the FACES (Phase 2): renders + node cross-checks + veto control + sweep + 10 poisons
    const faces = await runFaces({ page, ok, judge, banks, LONG, QUICK, typeWithBank });
    killed += faces.killed;
    const GRAND = TOTAL + faces.TOTAL;
    pngs.push(...faces.pngs);
    console.log('poison:\n' + poisonLog.join('\n'));
    const allKilled = killed === GRAND;
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && allKilled;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${GRAND} poisons killed${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/${GRAND} poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateBank, OPENED_CUES };
