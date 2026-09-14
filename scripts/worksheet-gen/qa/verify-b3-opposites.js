#!/usr/bin/env node
/**
 * verify-b3-opposites.js — the G1-307 `opposites` gate (design file
 * docs/worksheet-gen/b3-designs/G1-307-opposites.md §5; brief deliverable 4).
 *
 *   node scripts/worksheet-gen/qa/verify-b3-opposites.js [--quick]
 *
 * 1. BANK — every locale block of data/b3/opposites.js against the §5
 *    validator rules (the `tools/validate-b3-draft.js` opposites block, folded
 *    in here and exported as `validateBank`):
 *    (1) `pairs` is a BIJECTION (every word in exactly one pair, a ≠ b, ids
 *        unique, exclusiveWith ids exist and are symmetric); (2) members
 *        /^[\p{L}\- ]+$/u, <= 14 glyphs, lowercase (de too); (3) every `pic`
 *        resolves via fileUri, noun ∉ B2_EXCLUDE, no localized B&W marker on
 *        the theme, `scale` has two scales at ratio >= 1.3, picOpened:true, AND
 *        the (theme/noun) is in OPENED for that pair member — the record of the
 *        pictures the builder opened, so a picture that merely RESOLVES
 *        (weather/cold: a penguin in a hat) fails: the human open IS the gate;
 *        two pictured pairs sharing a noun must be exclusiveWith each other
 *        (the F1 one-noun-per-page rule at bank level); (4) >= 6 pictured
 *        pairs after exclusiveWith + one scale pair, else F1 is REPORTED
 *        refused (not a failure); (5) frames: the text prints exactly one
 *        member (word-bounded), never the answer, the answer is the other
 *        member or a declared `forms` entry, {name} only under nameSlot, each
 *        sentence <= 45 chars, >= 6 frames, distinct answers; (6) syn.a ≠ a,
 *        ≠ b, ∉ alt.b (the P5 second-right-chip class), ≠ far; far = a member
 *        of a pair in ANOTHER family; >= 8 pairs with syn else F4 reported
 *        refused; (7) prefix items: expected = prefix + base or endsWith(base)
 *        with a listed prefix, base ∉ ban, >= 8 items else F5 reported
 *        refused; (8) a member that is a word-classes.js adjective is spelled
 *        as that bank spells it (or carries `override`); (9) strings: title
 *        <= 70 without the worksheet word, instruction <= 150, en === the
 *        spec's i18n.en.
 *    The gate MAY read the vocab / word-classes / manifest; the spec never does.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1/d2/d3 en, plus d1/d2/d3 under a 70-char de title + 150-char
 *    instruction and a 70-char fi title (the README 722 floor and below).
 *    Asserts verify() empty, qa/lints.js clean, the G1 floors ITSELF (every
 *    `.ws-icon` >= 44, every printed word >= 26 px, every lane glyphH >= 26 and
 *    >= 56 px high, card count === config, bank <= 2 rows and <= 112 px + its
 *    margin, every card above the footer), and the NODE cross-check: every
 *    stamped (pair, a, b) is a bank pair VERBATIM and no two stamped pairs are
 *    exclusiveWith each other (the design's `tools/gate-opposites-data.js`,
 *    folded in).
 * 3. SWEEP — 20 seeds × d1/d2/d3 (build only): bank never in card order, pair
 *    ids unique, both directions >= minPerDir, no exclusiveWith co-occurrence,
 *    d1 cue keys === pairs and cued === min(maxCue, pictured), >= 2 distinct
 *    pair sets (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1). The correct EN
 *    bank is the control. Design §5 poisons:
 *      P1  `small` in two pairs                         → bank rule 1 + the spec refuses
 *      P2  frame "The elephant is not small. It is big." → bank rule 5 (answer printed)
 *      P3  pic.b = weather/cold (the penguin; resolves) → bank rule 3 (OPENED)
 *      P4  sv item rolig → orolig with rolig banned      → bank rule 7 (synthetic sv block)
 *      P5  syn.a = 'little' on big-small                → bank rule 6 (a second correct chip)
 *      P6  `sun` backing day-night AND a sunny-cloudy pair → bank rule 3 (one noun, two pairs, not exclusive)
 *      P7  a `zoo animals bw` noun                       → bank rule 3 (B&W marker)
 *      P8  es frame with {name}                         → bank rule 5 (synthetic es block, nameSlot:false)
 *    plus the base's own, from the design's verify() list:
 *      PL  a card stamped small → little                → verify() (given ≠ b) + the node cross-check
 *      PA  the answer printed on its card               → verify()
 *      PB  the bank in card order                       → verify()
 *      PD  every card in one direction                  → the spec re-roll guard + verify()
 *      PX  heavy-light and bright-dark on one page      → the node cross-check
 *      PI  a 36 px cue icon                             → pairCard's floor + the gate's own floor
 *      PC  a 5-card page                                → the spec guard + verify()
 *      PW  a bank word equal to a given word            → verify()
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b3-common.js');
const { excluded, fileUri } = require('../lib/b2-common.js');
const { candidates } = require('../lib/b3-picture-index.js');
const tokens = require('../primitives/_tokens.js');
const { cardGrid } = require('../templates/layouts/card-grid.js');
const { wordBank } = require('../templates/components-b2.js');
const { oppositeCard } = require('../templates/components-b3.js');

const TYPE = require('../types/g1/G1-307-opposites.js');
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const MIN_ICON = tokens.density.G1.minElement;   // 44
const MIN_WORD = tokens.density.G1.fontChoice;   // 26
const MIN_GLYPH = 26;                            // brief: G1 handwriting floor
const MAX_BANK_H = 112;                          // design §2: the bank is the slack; never a 3rd row
const WORD_RE = /^[\p{L}\- ]+$/u;
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä/i;
const NAMESLOT_FALSE = ['es', 'pt', 'it', 'fr'];
let WORD_CLASSES = null;
try { WORD_CLASSES = require('../data/b2/word-classes.js').WORD_CLASSES; } catch (e) { WORD_CLASSES = null; }

/**
 * The pictures OPENED 2026-09-14 (contact sheet out/dev/G1-307-pictures-sheet.png, every candidate of every
 * key) and the pair member each honestly shows. A pair picture outside this record FAILS — the human open is
 * the gate. Refused (opened, wrong): weather/hot = a smiling sun · weather/cold = a penguin in a hat ·
 * space/sun = an orange sun on an opaque black square (BLOCKED in the index) · colors/black + white = paint
 * drops · every `* bw` dir.
 */
const OPENED = {
  'animals/dog': ['big-small:scale'], 'farm animals/dog': ['big-small:scale'], 'pets/dog': ['big-small:scale'],
  'camping/campfire': ['hot-cold:a'], 'summer/campfire': ['hot-cold:a'],
  'weather/snowflake': ['hot-cold:b'], 'winter/snowflake': ['hot-cold:b'],
  'emotions/happy': ['happy-sad:a'], 'emotions/sad': ['happy-sad:b'],
  'zoo animals/cheetah': ['fast-slow:a'],
  'forest creatures/snail': ['fast-slow:b'], 'insects and bugs/snail': ['fast-slow:b'], 'spring/snail': ['fast-slow:b'],
  'zoo animals/elephant': ['heavy-light:a'], 'animals/elephant': ['heavy-light:a'],
  'easter/feather': ['heavy-light:b'],
  'weather/sun': ['day-night:a', 'sunny-cloudy:a'], 'beach/sun': ['day-night:a'], 'spring/sun': ['day-night:a'],
  'space/moon': ['day-night:b'], 'camping/moon': ['day-night:b'],
  'around the house/pillow': ['soft-hard:a'],
  'camping/rock': ['soft-hard:b'], 'beach/rock': ['soft-hard:b'],
  'At the Supermarket/candy': ['sweet-sour:a'], 'easter/candy': ['sweet-sour:a'],
  'fruits/lemon': ['sweet-sour:b'], 'At the Supermarket/lemon': ['sweet-sour:b'],
  'weather/cloudy': ['sunny-cloudy:b'],
  // opened and REFUSED — present so a bank pin fails on "not what its name says", not on "unknown"
  'weather/hot': [], 'weather/cold': [], 'space/sun': [], 'colors/black': [], 'colors/white': [], 'weather/sunny': [],
};

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
const wordRe = (w) => new RegExp('(?<!\\p{L})' + String(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u');

/* ------------------------------------------------------------------ bank */
function validateBank(bank, loc) {
  const f = [];
  const notes = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  const pairs = Array.isArray(bank.pairs) ? bank.pairs : [];
  if (!pairs.length) { push('no pairs'); return { fails: f, notes }; }
  if (typeof bank.nameSlot !== 'boolean') push('nameSlot missing');
  else if (NAMESLOT_FALSE.includes(loc) && bank.nameSlot) push('nameSlot must be false in ' + loc);
  const ids = new Set(pairs.map((p) => p.id));
  const byId = new Map(pairs.map((p) => [p.id, p]));
  const wordOwner = new Map();
  const memberSet = new Set();
  const lower = (s) => String(s).toLocaleLowerCase(loc);
  // rules 1, 2, 6, 8
  for (const p of pairs) {
    const tag = (x) => `pair ${p.id}: ${x}`;
    if (!p.id || pairs.filter((q) => q.id === p.id).length > 1) push(tag('missing or duplicate id'));
    if (![1, 2].includes(p.tier)) push(tag(`tier ${p.tier}`));
    if (!['adj', 'noun'].includes(p.pos)) push(tag(`pos "${p.pos}"`));
    if (!p.family) push(tag('family missing'));
    for (const [role, m] of [['a', p.a], ['b', p.b]]) {
      if (typeof m !== 'string' || !WORD_RE.test(m)) { push(tag(`${role} "${m}" is not letters/hyphen/space`)); continue; }
      if ([...m].length > 14) push(tag(`${role} "${m}" > 14 glyphs`));
      if (m !== lower(m)) push(tag(`${role} "${m}" is not lowercase (adjectives never are, de included)`));
      const lw = lower(m);
      if (wordOwner.has(lw) && wordOwner.get(lw) !== p.id) push(tag(`"${m}" is also a member of ${wordOwner.get(lw)} — not a bijection`));
      wordOwner.set(lw, p.id); memberSet.add(lw);
      // rule 8 — word-classes spelling
      const adjs = WORD_CLASSES && WORD_CLASSES[loc] && WORD_CLASSES[loc].adjectives;
      if (adjs && !p.override) {
        const hit = adjs.find((x) => lower(x.w) === lw || lower(x.w).normalize('NFD') === lw.normalize('NFD'));
        if (hit && hit.w !== m) push(tag(`"${m}" is spelled "${hit.w}" in word-classes.js (declare override to diverge)`));
      }
    }
    if (lower(p.a) === lower(p.b)) push(tag('a === b'));
    for (const x of p.exclusiveWith || []) {
      if (!ids.has(x)) push(tag(`exclusiveWith "${x}" is not a pair id`));
      else if (!(byId.get(x).exclusiveWith || []).includes(p.id)) push(tag(`exclusiveWith "${x}" is not symmetric`));
    }
    if (!p.alt || !Array.isArray(p.alt.a) || !Array.isArray(p.alt.b)) push(tag('alt must be {a:[], b:[]}'));
  }
  for (const p of pairs) {
    const tag = (x) => `pair ${p.id}: ${x}`;
    if (p.syn != null) {
      const s = p.syn && p.syn.a;
      if (typeof s !== 'string' || !WORD_RE.test(s)) push(tag(`syn.a "${s}" is not a word`));
      else {
        if (lower(s) === lower(p.a) || lower(s) === lower(p.b)) push(tag(`syn.a "${s}" is a member of the pair`));
        if (p.alt && (p.alt.b || []).map(lower).includes(lower(s))) push(tag(`syn.a "${s}" is an accepted answer for "${p.b}" — a second correct chip`));
        if (p.far && lower(s) === lower(p.far)) push(tag(`syn.a "${s}" equals far`));
      }
    }
    if (p.far != null) {
      const owner = wordOwner.get(lower(p.far));
      if (!owner) push(tag(`far "${p.far}" is not a bank word`));
      else if (owner === p.id) push(tag(`far "${p.far}" is a member of the pair itself`));
      else if (byId.get(owner).family === p.family) push(tag(`far "${p.far}" is from the same family (${p.family})`));
    }
  }
  // rule 3 — pictures
  const nounPairs = new Map();
  const pictured = [];
  for (const p of pairs) {
    const tag = (x) => `pair ${p.id}: ${x}`;
    if (p.pic == null) continue;
    if (p.picOpened !== true) push(tag('picOpened is not true'));
    const refs = [];
    if (p.pic.kind === 'scale') {
      refs.push({ theme: p.pic.theme, noun: p.pic.noun, key: p.pic.key, slot: 'scale' });
      const sc = p.pic.scales;
      if (!Array.isArray(sc) || sc.length !== 2 || !(sc[0] / sc[1] >= 1.3)) push(tag(`scale pic needs two scales at ratio >= 1.3, got ${JSON.stringify(sc)}`));
    } else if (p.pic.kind === 'two') {
      refs.push({ ...p.pic.a, slot: 'a' }); refs.push({ ...p.pic.b, slot: 'b' });
      if (p.pic.a && p.pic.b && p.pic.a.noun === p.pic.b.noun) push(tag('a two-picture cue with the same noun twice'));
    } else push(tag(`pic.kind "${p.pic.kind}"`));
    for (const r of refs) {
      const ref = `${r.theme}/${r.noun}`;
      if (BW_MARKER.test(String(r.theme))) push(tag(`picture ${ref} is in a B&W dir (localized marker)`));
      if (excluded(r.key || r.noun, loc)) push(tag(`picture ${ref} is B2_EXCLUDE'd in ${loc}`));
      try { fileUri(r.theme, r.noun); } catch (e) { push(tag(`picture ${ref} does not resolve: ${e.message}`)); }
      if (!candidates(r.key || r.noun, loc).some((c) => c.theme === r.theme && c.noun === r.noun)) push(tag(`picture ${ref} is not a colour-index candidate for "${r.key || r.noun}"`));
      const opened = OPENED[ref];
      if (!opened) push(tag(`picture ${ref} was never OPENED by the build (the human open is the gate)`));
      else if (!opened.includes(`${p.id}:${r.slot}`)) push(tag(`picture ${ref} was opened and is NOT an honest "${p.id}:${r.slot}" (opened as: ${opened.join('/') || 'refused'})`));
      if (!nounPairs.has(r.noun)) nounPairs.set(r.noun, new Set());
      nounPairs.get(r.noun).add(p.id);
    }
    pictured.push(p);
  }
  for (const [noun, set] of nounPairs) {
    const arr = [...set];
    for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) {
      const A = byId.get(arr[i]), B = byId.get(arr[j]);
      if (!(A.exclusiveWith || []).includes(B.id)) push(`noun "${noun}" backs two pairs (${A.id}, ${B.id}) that are not exclusiveWith — one noun per page`);
    }
  }
  // rule 4 — F1 pool (report)
  const scaleCount = pictured.filter((p) => p.pic.kind === 'scale').length;
  const f1Pool = pictured.length - Math.max(0, scaleCount - 1);
  if (f1Pool < 6) notes.push(`F1 refused in ${loc}: ${f1Pool} usable pictured pairs < 6`);
  // rule 5 — frames
  const frames = Array.isArray(bank.frames) ? bank.frames : [];
  const answers = new Set();
  for (const fr of frames) {
    const tag = (x) => `frame ${fr.pair}: ${x}`;
    const p = byId.get(fr.pair);
    if (!p) { push(tag('unknown pair')); continue; }
    if (typeof fr.text !== 'string') { push(tag('text missing')); continue; }
    if (!fr.text.includes('___')) push(tag('text must carry the ___ blank'));
    const hasA = wordRe(p.a).test(fr.text), hasB = wordRe(p.b).test(fr.text);
    if (hasA === hasB) push(tag(`text must print exactly one member (a ${hasA}, b ${hasB})`));
    const given = hasA ? p.a : p.b, other = hasA ? p.b : p.a;
    const forms = Array.isArray(p.forms) ? p.forms : [];
    if (fr.answer !== other && !forms.includes(fr.answer)) push(tag(`answer "${fr.answer}" is not the other member "${other}" (or a declared form)`));
    if (wordRe(fr.answer).test(fr.text)) push(tag(`the answer "${fr.answer}" is printed in the text`));
    if (fr.text.includes('{name}') && !bank.nameSlot) push(tag('{name} in a nameSlot:false locale'));
    if (/\{(?!name\})/.test(fr.text)) push(tag('an unknown slot'));
    for (const sent of fr.text.split(/(?<=[.!?])\s+/)) if ([...sent].length > 45) push(tag(`sentence "${sent}" > 45 chars`));
    if (answers.has(fr.answer)) push(tag(`answer "${fr.answer}" repeats`)); answers.add(fr.answer);
    if (fr.pic) {
      try { fileUri(fr.pic.theme, fr.pic.noun); } catch (e) { push(tag(`pic does not resolve: ${e.message}`)); }
      if (BW_MARKER.test(String(fr.pic.theme))) push(tag('pic in a B&W dir'));
      if (given === other) {/* unreachable */}
    }
  }
  if (frames.length < 6) push(`${frames.length} frames < 6`);
  // rule 6 — F4 pool (report)
  const synCount = pairs.filter((p) => p.syn && p.syn.a).length;
  if (synCount < 8) notes.push(`F4 refused in ${loc}: ${synCount} pairs with syn < 8`);
  // rule 7 — prefix
  const pre = bank.prefix || {};
  const prefixes = Array.isArray(pre.prefixes) ? pre.prefixes : [];
  const items = Array.isArray(pre.items) ? pre.items : [];
  const ban = new Set((pre.ban || []).map(lower));
  if (!prefixes.length) push('prefix.prefixes missing');
  for (const it of items) {
    const tag = (x) => `prefix item ${it.base}: ${x}`;
    if (!prefixes.includes(it.prefix)) push(tag(`prefix "${it.prefix}" not in ${JSON.stringify(prefixes)}`));
    if (typeof it.expected !== 'string' || !it.expected.endsWith(it.base)) push(tag(`expected "${it.expected}" does not end with the base`));
    else if (it.expected !== it.prefix + it.base && !it.literal) push(tag(`expected "${it.expected}" ≠ ${it.prefix}+${it.base} (declare literal:true for a stored join)`));
    if (ban.has(lower(it.base))) push(tag('base is BANNED (prefix.ban)'));
    if (memberSet.has(lower(it.base))) notes.push(`prefix base "${it.base}" is also a member of ${wordOwner.get(lower(it.base))} — that pair leaves the F5 page`);
  }
  if (items.length < 8) notes.push(`F5 refused in ${loc}: ${items.length} prefix items < 8`);
  // rule 9 — strings
  const s = bank.strings && bank.strings['G1-307'];
  if (!s) push('strings G1-307 missing');
  else {
    if (!s.title || [...s.title].length > 70) push('title > 70 chars');
    if (WORKSHEET_WORD.test(s.title || '')) push('title carries the worksheet word');
    if (!s.instruction || [...s.instruction].length > 150) push('instruction > 150 chars');
    if (loc === 'en' && (s.title !== TYPE.i18n.en.title || s.instruction !== TYPE.i18n.en.instruction)) push('en strings ≠ the spec i18n.en');
  }
  return { fails: f, notes, counts: { pairs: pairs.length, pictured: pictured.length, f1Pool, syn: synCount, frames: frames.length, prefix: items.length, tier1: pairs.filter((p) => p.tier === 1).length, tier2: pairs.filter((p) => p.tier === 2).length } };
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { difficulty, baseName, strings, locale }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: locale || 'en', page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-opposites]');
    const cards = [...document.querySelectorAll('[data-lcs-opposites] .ws-card')].map((c) => {
      const st = c.querySelector('[data-lcs-pair]');
      const given = c.querySelector('[data-lcs-given]');
      const lane = c.querySelector('[data-lcs-prim="writing-row"]');
      const cue = c.querySelector('[data-lcs-cue-key]');
      return {
        pair: st && st.dataset.lcsPair, a: st && st.dataset.lcsA, b: st && st.dataset.lcsB, dir: st && st.dataset.lcsDir,
        given: given ? given.textContent.trim() : '', givenW: given ? given.getBoundingClientRect().width : 0, wordPx: given ? parseFloat(getComputedStyle(given).fontSize) : 0,
        lane: lane ? rect(lane) : null, laneH: lane ? +lane.getAttribute('height') : 0,
        cueKey: cue ? cue.dataset.lcsCueKey : null, cue: cue ? rect(cue) : null, ...rect(c),
      };
    });
    const icons = [...document.querySelectorAll('.ws-icon')].map((el) => { const r = rect(el); return Math.min(r.w, r.h); });
    const bank = document.querySelector('[data-lcs-bank-banner]');
    const pills = bank ? [...bank.querySelectorAll('[data-lcs-bank-word]')].map((e) => ({ word: e.textContent.trim(), ...rect(e) })) : [];
    const bankBox = bank ? rect(bank) : null;
    const bankRows = bank ? new Set(pills.map((p) => Math.round(p.top))).size : 0;
    const bankMargin = bank ? parseFloat(getComputedStyle(bank).marginBottom) : 0;
    return { cards, icons, pills, bank: bankBox, bankRows, bankMargin, stamp: root ? +root.dataset.lcsCards : -1,
      body: rect(document.querySelector('[data-lcs-body]')), foot: document.querySelector('.ws-foot').getBoundingClientRect().top, titleH: rect(document.querySelector('.ws-head')).h };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

/** The design's node-side cross-check: every stamped (pair, a, b) is a bank pair VERBATIM; no two stamped pairs are exclusiveWith. */
function crossCheck(name, cards, bank) {
  const byId = new Map((bank.pairs || []).map((p) => [p.id, p]));
  const out = [];
  for (const c of cards) {
    const p = byId.get(c.pair);
    if (!p) { out.push(`${name}: stamped pair "${c.pair}" is not a bank pair`); continue; }
    if (p.a !== c.a || p.b !== c.b) out.push(`${name}: stamped ${c.pair} = (${c.a}, ${c.b}) ≠ bank (${p.a}, ${p.b}) — not verbatim`);
    const expectGiven = c.dir === 'ab' ? p.a : p.b;
    if (c.given !== expectGiven) out.push(`${name}: card ${c.pair} prints "${c.given}" ≠ the bank's ${c.dir === 'ab' ? 'a' : 'b'} "${expectGiven}"`);
  }
  for (const c of cards) for (const d of cards) {
    if (c === d) continue;
    const p = byId.get(c.pair);
    if (p && (p.exclusiveWith || []).includes(d.pair)) out.push(`${name}: ${c.pair} and ${d.pair} are exclusiveWith and share the page`);
  }
  return out;
}

function assertRender(name, r, d, bank, opts) {
  const cfg = TYPE.difficulty[d];
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.cards.length === cfg.cards && r.m.stamp === cfg.cards, `${name}: ${r.m.cards.length} cards / stamp ${r.m.stamp} ≠ config ${cfg.cards}`);
  const minIcon = r.m.icons.length ? Math.min(...r.m.icons) : Infinity;
  if (r.m.icons.length) ok(minIcon >= MIN_ICON, `${name}: cue icon ${minIcon} px < G1 floor ${MIN_ICON}`);
  ok(cfg.glyphH >= MIN_GLYPH, `${name}: config glyphH ${cfg.glyphH} < ${MIN_GLYPH}`);
  for (const c of r.m.cards) {
    ok(c.wordPx >= MIN_WORD - 0.6, `${name}: card ${c.pair} word ${c.wordPx} px < ${MIN_WORD}`);
    ok(!!c.lane && c.laneH >= 56 && c.laneH === cfg.laneH, `${name}: card ${c.pair} lane ${c.laneH} px (config ${cfg.laneH}, floor 56)`);
    ok(!!c.lane && c.lane.left >= c.left - 0.6 && c.lane.right <= c.right + 0.6 && c.lane.bottom <= c.bottom + 0.6, `${name}: card ${c.pair} lane outside its card`);
    // the grid fills the body, so the last row ends exactly at the footer's top edge by construction (the
    // attribution rule sits 10 px lower, inside .ws-foot's padding); qa/lints.js uses the same +0.6 rule
    ok(c.bottom <= r.m.foot + 0.6, `${name}: card ${c.pair} reaches into the footer (${Math.round(c.bottom)} vs ${Math.round(r.m.foot)})`);
    ok(!c.lane || c.lane.bottom <= r.m.foot - 8, `${name}: card ${c.pair} lane ${Math.round(c.lane.bottom)} within 8 px of the footer ${Math.round(r.m.foot)}`);
    ok(c.left >= r.m.body.left - 0.6 && c.right <= r.m.body.right + 0.6, `${name}: card ${c.pair} outside the body column`);
    if (c.cue) ok(c.cue.right <= c.right + 0.6 && c.cue.bottom <= c.bottom + 0.6 && c.cueKey === c.pair, `${name}: cue on ${c.pair} outside its card or mis-keyed (${c.cueKey})`);
  }
  // the lanes of a page share one y (line 1 is uniform) — measured per grid row
  const rows = new Map();
  for (const c of r.m.cards) { const k = Math.round(c.top); if (!rows.has(k)) rows.set(k, []); rows.get(k).push(c); }
  for (const [k, cs] of rows) ok(cs.every((c) => Math.abs(c.lane.top - cs[0].lane.top) < 1), `${name}: lanes in the card row at y ${k} are not aligned`);
  if (cfg.bank) {
    ok(!!r.m.bank, `${name}: no bank`);
    if (r.m.bank) {
      ok(r.m.bankRows <= 2, `${name}: bank wraps to ${r.m.bankRows} rows`);
      ok(r.m.bank.h + r.m.bankMargin <= MAX_BANK_H + 10, `${name}: bank ${Math.round(r.m.bank.h)} + margin ${r.m.bankMargin} > ${MAX_BANK_H + 10}`);
      const words = r.m.pills.map((p) => p.word);
      const answers = r.m.cards.map((c) => (c.dir === 'ab' ? c.b : c.a));
      ok([...words].sort().join('|') === [...answers].sort().join('|'), `${name}: bank ${JSON.stringify(words)} ≠ answers ${JSON.stringify(answers)}`);
      ok(words.join('|') !== answers.join('|'), `${name}: bank in card order`);
    }
  } else ok(!r.m.bank, `${name}: a bank on a no-bank page`);
  if (cfg.cue === 'pic') {
    const pictured = r.m.cards.filter((c) => { const p = (bank.pairs || []).find((x) => x.id === c.pair); return p && p.pic; }).length;
    const cued = r.m.cards.filter((c) => c.cueKey).length;
    ok(cued === Math.min(cfg.maxCue, pictured), `${name}: ${cued} cued cards ≠ min(maxCue ${cfg.maxCue}, pictured ${pictured})`);
  } else ok(r.m.cards.every((c) => !c.cueKey), `${name}: a cue on a no-cue page`);
  const dirs = r.m.cards.map((c) => c.dir);
  ok(dirs.filter((x) => x === 'ab').length >= cfg.minPerDir && dirs.filter((x) => x === 'ba').length >= cfg.minPerDir, `${name}: directions ${dirs.join('')} below minPerDir ${cfg.minPerDir}`);
  const xc = crossCheck(name, r.m.cards, bank);
  ok(xc.length === 0, xc.join('\n    '));
  return { minIcon: r.m.icons.length ? minIcon : null, bankH: r.m.bank ? Math.round(r.m.bank.h) : 0 };
}

/* ----------------------------------------------------------------- poison */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
function buildRefusal(bank, d, type) {
  try { (type || TYPE)._buildWith(bank, { difficulty: d, locale: 'en' }, { rng: makeRng('poison') }); return []; } catch (e) { return [e.message]; }
}
/** A page built from EXPLICIT cards (past the spec's guards) — the seam for the verify()/node poisons. */
function pageFrom(cards, d, opts = {}) {
  const cfg = TYPE.difficulty[d];
  return Object.assign({}, TYPE, { build() {
    const html = cards.map((c) => oppositeCard({ given: c.given, pair: c.pair, a: c.a, b: c.b, dir: c.dir, wordPx: cfg.wordPx, laneW: 302, laneH: cfg.laneH, glyphH: cfg.glyphH, cue: c.cue || null, line1H: opts.line1H }));
    const answers = cards.map((c) => (c.dir === 'ab' ? c.b : c.a));
    const order = opts.bankOrder || answers.map((_, i) => (i + 1) % answers.length);
    const bank = opts.bank === false ? '' : wordBank({ words: (opts.bankWords || order.map((i) => answers[i])).map((w) => ({ word: w })), wordPx: 18 });
    const rows = Math.ceil(cards.length / 2);
    return { bodyHtml: `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-opposites data-lcs-cards="${cards.length}" data-lcs-min-per-dir="${cfg.minPerDir}"${opts.bank === false ? '' : ' data-lcs-has-bank="1"'}>` + bank + cardGrid({ cards: html, cols: 2, rows }) + '</div>', meta: {} };
  } });
}
async function gateFindings(page, type, d, baseName, bank) {
  const r = await renderWith(page, type, { difficulty: d, baseName });
  const before = fails.length, saved = assertions;
  assertRender(baseName, r, d, bank);
  const own = fails.splice(before);
  assertions = saved;
  return { r, own };
}

/**
 * Long-chrome fixtures: a 70-char title + a 150-char instruction, both legal. de wraps the title to 3 lines;
 * fi's long words wrap it to 4 (K-319 measured body 733 / 700 under them — the README 722 is neither).
 */
const LONG = {
  de: { title: 'Gegenteile: Schreibe zu jedem Wort das passende Gegenteil in die Zeile',
    instruction: 'Lies das Wort auf jeder Karte ganz genau. Suche in der Wortbank das Wort, das genau das Gegenteil bedeutet, und schreibe es sauber auf die Linie dort.' },
  fi: { title: 'Vastakohtaisuustehtävä: kirjoita vastakohtaisuussana kirjoitusviivalle',
    instruction: 'Lue jokaisen kortin sana tarkasti. Etsi sanapankista se sana, joka tarkoittaa täsmälleen päinvastaista, ja kirjoita se huolellisesti kortin viivoille.' },
};

async function main() {
  const banks = bankModule('opposites');
  const locales = Object.keys(banks);
  for (const loc of locales) {
    const v = validateBank(banks[loc], loc);
    ok(v.fails.length === 0, `bank ${loc}: ${v.fails.length} findings\n    ` + v.fails.slice(0, 12).join('\n    '));
    console.log(`bank ${loc}: ${v.counts.pairs} pairs (tier1 ${v.counts.tier1} / tier2 ${v.counts.tier2}), ${v.counts.pictured} pictured (F1 pool ${v.counts.f1Pool}), ${v.counts.syn} with syn, ${v.counts.frames} frames, ${v.counts.prefix} prefix items${v.notes.length ? '\n  notes: ' + v.notes.join(' · ') : ''}`);
  }
  const en = banks.en;
  for (const k of Object.keys(LONG)) ok([...LONG[k].title].length === 70 && [...LONG[k].instruction].length === 150, `long-chrome fixture ${k} is ${[...LONG[k].title].length}/${[...LONG[k].instruction].length} chars, want 70/150`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  const TOTAL = 16;
  let killed = 0;
  try {
    // 2. renders through the real pipeline
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-307-gate-d${d}-en` });
      const s = assertRender(`d${d}`, r, d, en);
      pngs.push(r.png);
      const lowest = Math.round(Math.max(...r.m.cards.map((c) => c.bottom)));
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} cards ${r.m.cards.length} icons ${s.minIcon === null ? '-' : s.minIcon} bank ${s.bankH}${r.m.bank ? '+' + r.m.bankMargin : ''} rows ${r.m.bankRows} body ${Math.round(r.m.body.h)} px, lowest card ${lowest} vs foot ${Math.round(r.m.foot)}, words ${r.m.cards.map((c) => c.given + ' ' + c.givenW.toFixed(1)).join(', ')}`);
    }
    for (const k of Object.keys(LONG)) for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-307-gate-d${d}-en-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d${d} long chrome ${k}`, r, d, en);
      pngs.push(r.png);
      // de = a 3-line title (measured 733); fi = a 4-line title of long words (measured 700) — the fixture must
      // actually squeeze the body, or it proves nothing about the stack
      ok(r.m.body.h <= (k === 'fi' ? 705 : 740), `d${d} long chrome ${k}: body ${Math.round(r.m.body.h)} px — the fixture did not squeeze the body to <= ${k === 'fi' ? 705 : 740} (head ${Math.round(r.m.titleH)} px)`);
      const inner = Math.round(r.m.cards[0].h - 28);
      console.log(`render d${d} long chrome ${k}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px (head ${Math.round(r.m.titleH)} px) card inner ${inner} px, lowest card ${Math.round(Math.max(...r.m.cards.map((c) => c.bottom)))} vs foot ${Math.round(r.m.foot)}`);
    }
    // a locale without a bank block REFUSES (never an en fallback)
    let refused = false;
    try { TYPE.build({ theme: null, difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { refused = /no de block/.test(e.message); }
    ok(refused, 'an unauthored locale must REFUSE (throw), not fall back to en');

    // 3. seed sweep (build only)
    if (!QUICK) {
      const sets = { 1: new Set(), 2: new Set(), 3: new Set() };
      const byId = new Map(en.pairs.map((p) => [p.id, p]));
      let cuedTotal = 0;
      for (let k = 1; k <= 20; k++) for (const d of [1, 2, 3]) {
        const cfg = TYPE.difficulty[d];
        const rng = makeRng(instanceSeed({ typeId: 'G1-307', theme: null, difficulty: d, seedEpoch: k }));
        const b = TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
        const m = b.meta;
        ok(m.pairs.length === cfg.cards && new Set(m.pairs).size === cfg.cards, `sweep seed ${k} d${d}: ${m.pairs.length} pairs, ${new Set(m.pairs).size} distinct`);
        const nAb = m.dirs.filter((x) => x === 'ab').length;
        ok(nAb >= cfg.minPerDir && m.dirs.length - nAb >= cfg.minPerDir, `sweep seed ${k} d${d}: directions ${m.dirs.join('')}`);
        if (cfg.bank) ok(m.bankOrder.every((v, i) => v !== i), `sweep seed ${k} d${d}: bank order ${JSON.stringify(m.bankOrder)} has an answer at its own card`);
        for (const id of m.pairs) for (const x of byId.get(id).exclusiveWith || []) ok(!m.pairs.includes(x), `sweep seed ${k} d${d}: ${id} with ${x}`);
        for (const id of m.pairs) ok([...byId.get(id).a].length <= cfg.maxLetters && [...byId.get(id).b].length <= cfg.maxLetters, `sweep seed ${k} d${d}: ${id} over maxLetters ${cfg.maxLetters}`);
        if (cfg.cue === 'pic') {
          const pictured = m.pairs.filter((id) => byId.get(id).pic).length;
          ok(m.cued === Math.min(cfg.maxCue, pictured) && m.uncuedForWidth === 0, `sweep seed ${k} d1: cued ${m.cued} / pictured ${pictured} / uncued-for-width ${m.uncuedForWidth}`);
          cuedTotal += m.cued;
          ok((b.bodyHtml.match(/data-lcs-cue-key="([^"]+)"/g) || []).every((x) => m.pairs.includes(x.slice(18, -1))), `sweep seed ${k} d1: a cue key outside the page's pairs`);
        }
        sets[d].add(m.pairs.slice().sort().join(','));
      }
      for (const d of [1, 2, 3]) ok(sets[d].size >= 2, `sweep d${d}: only ${sets[d].size} distinct pair sets over 20 seeds`);
      console.log(`sweep: distinct pair sets d1 ${sets[1].size} / d2 ${sets[2].size} / d3 ${sets[3].size} over 20 seeds; d1 cued cards ${cuedTotal}/20 pages; 0 bank-in-card-order, 0 exclusiveWith clashes`);
    }

    // 4. poisons
    killed = 0;
    const gate = (b, loc) => validateBank(b, loc || 'en').fails;
    // P1 — small in two pairs
    {
      const b = clone(en); b.pairs.find((p) => p.id === 'tall-short').b = 'small';
      const a = judge('P1 bank', gate(b), /"small" is also a member of big-small — not a bijection/);
      const c = judge('P1 build', buildRefusal(b, 2), /"small" is a member of two pairs/, 'the spec refused the poisoned bank');
      if (a && c) killed++;
    }
    // P2 — a frame that prints its answer
    {
      const b = clone(en); b.frames[0].text = 'The elephant is not small. It is big.';
      const f = gate(b);
      if (judge('P2', f, /frame big-small: the answer "big" is printed in the text/)) killed++;
    }
    // P3 — the penguin: weather/cold resolves and is a colour-index candidate, but was opened as NOT cold
    {
      const b = clone(en); b.pairs.find((p) => p.id === 'hot-cold').pic.b = { theme: 'weather', noun: 'cold' };
      let resolves = false; try { fileUri('weather', 'cold'); resolves = true; } catch (e) { /* absent */ }
      if (judge('P3', gate(b), /picture weather\/cold was opened and is NOT an honest "hot-cold:b"/, resolves ? 'the picture resolves' : 'picture absent')) killed++;
    }
    // P4 — sv rolig → orolig with rolig banned (synthetic sv block: en pairs, sv prefix)
    {
      const b = clone(en); b.prefix = { prefixes: ['o'], items: [{ base: 'rolig', prefix: 'o', expected: 'orolig' }], ban: ['rolig'] };
      if (judge('P4', gate(b, 'sv'), /prefix item rolig: base is BANNED/)) killed++;
    }
    // P5 — syn.a = little for target big (a second correct chip)
    {
      const b = clone(en); b.pairs.find((p) => p.id === 'big-small').syn = { a: 'little' };
      if (judge('P5', gate(b), /syn\.a "little" is an accepted answer for "small" — a second correct chip/)) killed++;
    }
    // P6 — sun backing day-night AND a sunny-cloudy pair that is not exclusiveWith it
    {
      const b = clone(en); b.pairs.push({ id: 'sunny-cloudy', a: 'sunny', b: 'cloudy', tier: 2, pos: 'adj', family: 'weather', alt: { a: [], b: [] }, exclusiveWith: [], syn: null, far: 'big',
        pic: { kind: 'two', a: { theme: 'weather', noun: 'sun' }, b: { theme: 'weather', noun: 'cloudy' } }, picOpened: true });
      if (judge('P6', gate(b), /noun "sun" backs two pairs \(day-night, sunny-cloudy\) that are not exclusiveWith/)) killed++;
    }
    // P7 — a noun from a B&W dir
    {
      const b = clone(en); b.pairs.find((p) => p.id === 'heavy-light').pic.a = { theme: 'zoo animals bw', noun: 'elephant' };
      if (judge('P7', gate(b), /picture zoo animals bw\/elephant is in a B&W dir/)) killed++;
    }
    // P8 — an es frame with {name} (synthetic es block: nameSlot false)
    {
      const b = clone(en); b.nameSlot = false; b.frames.push({ pair: 'big-small', text: '{name} no es pequeño. Es ___.', answer: 'big', pic: null });
      if (judge('P8', gate(b, 'es'), /\{name\} in a nameSlot:false locale/)) killed++;
    }
    // PL — a card stamped small → little (given ≠ the bank's b)
    {
      const cards = [
        { pair: 'big-small', a: 'big', b: 'little', dir: 'ba', given: 'little' }, { pair: 'hot-cold', a: 'hot', b: 'cold', dir: 'ab', given: 'hot' },
        { pair: 'fast-slow', a: 'fast', b: 'slow', dir: 'ba', given: 'slow' }, { pair: 'day-night', a: 'day', b: 'night', dir: 'ab', given: 'day' },
        { pair: 'wet-dry', a: 'wet', b: 'dry', dir: 'ba', given: 'dry' }, { pair: 'old-new', a: 'old', b: 'new', dir: 'ab', given: 'old' },
        { pair: 'full-empty', a: 'full', b: 'empty', dir: 'ba', given: 'empty' }, { pair: 'high-low', a: 'high', b: 'low', dir: 'ab', given: 'high' },
      ];
      const { r, own } = await gateFindings(page, pageFrom(cards, 2), 2, 'G1-307-gate-poison-PL', en);
      // verify() runs in the page and cannot see the bank (the stamps agree with the card); the design's
      // node-side cross-check is the arbiter for this class
      if (judge('PL node', own, /stamped big-small = \(big, little\) ≠ bank \(big, small\) — not verbatim/, `verify ${r.verify.length} (page-side, bank-blind by design)`)) killed++;
    }
    // PA — the answer printed on its card
    {
      const good = TYPE._buildWith(en, { difficulty: 2, locale: 'en' }, { rng: makeRng('pa') });
      const t = Object.assign({}, TYPE, { build() { const out = clone(good); out.bodyHtml = out.bodyHtml.replace(/(data-lcs-given="([^"]+)">)([^<]+)(<\/span>)/, (m0, p1, g, txt, p4) => p1 + txt + ' ' + (good.meta.answers[0]) + p4); return out; } });
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'G1-307-gate-poison-PA' });
      if (judge('PA', r.verify, /card 1: the answer ".*" is printed on the card|card 1: card text .* is not only the given word/)) killed++;
    }
    // PB — the bank in card order
    {
      const good = TYPE._buildWith(en, { difficulty: 2, locale: 'en' }, { rng: makeRng('pb') });
      const t = Object.assign({}, TYPE, { build() { const out = clone(good); out.bodyHtml = out.bodyHtml.replace(/<div class="ws-scene-banner ws-bank"[\s\S]*?<\/div>/, wordBank({ words: good.meta.answers.map((w) => ({ word: w })), wordPx: 18 })); return out; } });
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'G1-307-gate-poison-PB' });
      if (judge('PB', r.verify, /bank is in card order/)) killed++;
    }
    // PD — every card in one direction: the spec's re-roll guard makes it unreachable; a page built past it fails verify()
    {
      const t = Object.assign({}, TYPE, { difficulty: { ...TYPE.difficulty, 2: { ...TYPE.difficulty[2], minPerDir: 5 } } });
      const a = judge('PD guard', buildRefusal(en, 2, t), /minPerDir 5 cannot be met twice on 8 cards/);
      const cards = en.pairs.filter((p) => p.tier === 1 && !p.exclusiveWith.length).slice(0, 8).map((p) => ({ pair: p.id, a: p.a, b: p.b, dir: 'ab', given: p.a }));
      const r = await renderWith(page, pageFrom(cards, 2), { difficulty: 2, baseName: 'G1-307-gate-poison-PD' });
      const c = judge('PD verify', r.verify, /directions ab 8 \/ ba 0 below minPerDir 3/);
      if (a && c) killed++;
    }
    // PX — heavy-light and bright-dark on one page (light is the answer of one, a plausible answer of the other)
    {
      const ids = ['heavy-light', 'bright-dark', 'hot-cold', 'fast-slow', 'day-night', 'wet-dry', 'old-new', 'full-empty'];
      const cards = ids.map((id, i) => { const p = en.pairs.find((x) => x.id === id); const dir = i % 2 ? 'ba' : 'ab'; return { pair: id, a: p.a, b: p.b, dir, given: dir === 'ab' ? p.a : p.b }; });
      const { own } = await gateFindings(page, pageFrom(cards, 2), 2, 'G1-307-gate-poison-PX', en);
      if (judge('PX', own, /heavy-light and bright-dark are exclusiveWith and share the page/)) killed++;
    }
    // PI — a 36 px cue icon: pairCard refuses; a page that forces it past pairCard fails the gate's floor
    {
      let guard = [];
      try { require('../templates/components-b3.js').pairCard({ picA: { src: 'x' }, picB: { src: 'x' }, transformB: 'none', size: 50, cueKey: 'big-small' }); } catch (e) { guard = [e.message]; }
      const a = judge('PI guard', guard, /icon 36 px below the G1 floor 44/);
      const good = TYPE._buildWith(en, { difficulty: 1, locale: 'en' }, { rng: makeRng('pi') });
      const t = Object.assign({}, TYPE, { build() { const out = clone(good); out.bodyHtml = out.bodyHtml.replace(/width:46px;height:46px/g, 'width:36px;height:36px').replace(/width:64px;height:64px/g, 'width:36px;height:36px').replace(/width:44px;height:44px/g, 'width:36px;height:36px'); return out; } });
      const { r, own } = await gateFindings(page, t, 1, 'G1-307-gate-poison-PI', en);
      const c = judge('PI floor', own, /cue icon 36 px < G1 floor 44/, `verify ${r.verify.length} (its own 44 floor fires too)`);
      if (a && c) killed++;
    }
    // PC — a 5-card page: the spec guard refuses; a page that reaches verify() with 5 cards fails there
    {
      const t = Object.assign({}, TYPE, { difficulty: { ...TYPE.difficulty, 2: { ...TYPE.difficulty[2], cards: 5, cols: 1, rows: 5 } } });
      const a = judge('PC guard', buildRefusal(en, 2, t), /cards 5 outside the G1 page rule 6..12/);
      const cards = en.pairs.slice(0, 5).map((p, i) => ({ pair: p.id, a: p.a, b: p.b, dir: i % 2 ? 'ba' : 'ab', given: i % 2 ? p.b : p.a }));
      const r = await renderWith(page, pageFrom(cards, 2), { difficulty: 2, baseName: 'G1-307-gate-poison-PC' });
      const c = judge('PC verify', r.verify, /5 cards outside the G1 rule 6..12/);
      if (a && c) killed++;
    }
    // PW — a bank word equal to a given word (the bank leaks nothing, but a given in the bank is a wrong bank)
    {
      const cards = en.pairs.filter((p) => p.tier === 1 && !p.exclusiveWith.length).slice(0, 8).map((p, i) => ({ pair: p.id, a: p.a, b: p.b, dir: i % 2 ? 'ba' : 'ab', given: i % 2 ? p.b : p.a }));
      const answers = cards.map((c) => (c.dir === 'ab' ? c.b : c.a));
      const bankWords = answers.slice(); bankWords[0] = cards[0].given;
      const r = await renderWith(page, pageFrom(cards, 2, { bankWords }), { difficulty: 2, baseName: 'G1-307-gate-poison-PW' });
      if (judge('PW', r.verify, /bank word ".*" is a given word/)) killed++;
    }

    console.log('poison:\n' + poisonLog.join('\n'));
    ok(killed === TOTAL, `poisons killed ${killed}/${TOTAL}`);
    console.log('renders: ' + pngs.map((p) => path.basename(p)).join(' '));
  } finally {
    await browser.close();
  }
  if (fails.length) console.log('FAILS:\n' + fails.join('\n'));
  console.log(fails.length ? `FAIL (${assertions} assertions, ${fails.length} failed, ${killed}/${TOTAL} poisons killed)` : `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed)`);
  process.exit(fails.length ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, OPENED, crossCheck };
