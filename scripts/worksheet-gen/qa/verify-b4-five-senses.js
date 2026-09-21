#!/usr/bin/env node
/**
 * verify-b4-five-senses.js — the K-355 `five-senses` gate (design file §5;
 * _BUILD-BRIEF.md deliverable 4). BASE commission (2026-09-21): the global
 * concept bank, every authored locale block, the base renders at d1 / d2 / d3
 * under the en chrome AND the long-chrome fixture, the 722 / 677 stack checks
 * measured on the REAL render, a 20-seed sweep, and the §5 data + base render
 * poisons — each must FAIL for its OWN reason, the correct EN bank is the
 * control. PHASE 2 (2026-09-21) adds sections 5-6 + the face poisons below.
 *
 *   node scripts/worksheet-gen/qa/verify-b4-five-senses.js [--quick]
 *
 * Exports validateBank(block, loc) → string[] (the tools/b4-probe-child.js
 * contract) + validateGlobal(global) + the width measurer.
 *
 * 1. BANK
 *    global (data/science/five-senses.json), rules 1-4:
 *    (1) senses === the 5 keys; organOf maps each to one of eye ear nose
 *        tongue hand, each organ once; every organ resolves via
 *        fileUri('body parts', organ) and has a vocab singular + plural x11;
 *        the three ORGAN_OF copies (json / data module / components) agree;
 *    (2) every item resolves via fileUri, its theme dir carries no localized
 *        B&W marker, picOpened:true, a non-null vocabKey, present in
 *        entriesFor(theme, loc) AND hasPicture(vocabKey, loc) in all 11
 *        locales, not `excluded` anywhere, sense ∈ senses, confidence ∈
 *        {strong, signed}, a signed item carries a note;
 *    (3) boundary fences (the neighbour banks read HERE, never on the page):
 *        no item theme/noun or vocabKey in hot-vs-cold.json, food-groups.json
 *        or summer-vs-winter-clothes.json; no item noun is a `body parts`
 *        noun; no noun twice;
 *    (4) per sense strong >= 5 AND co-occurrable strong (each family collapsed
 *        to one) >= 3; every majorityRows sense >= 6 co-occurrable and
 *        majorityRows[s] <= floor(co/3); every family ⊆ one sense.
 *    locale block (data/b4/five-senses.js en + data/b4/locales/*), rules 5-10:
 *    (5) verbs: 5 distinct non-empty literals, no `{`, no digit, <= 14 chars,
 *        none equal (toLocaleLowerCase) to the vocab singular / plural of any
 *        organ or item noun in that locale (the organ-noun fence: "Ohr" FAILS);
 *        the widest at Baloo 2 700 17 + 29 <= 123 (MEASURED in the render);
 *    (6) locale bans, poison-tested both ways: fr verbs.touch !== 'sentir' and
 *        no touch starter contains `sens`; it: sentir / sento / senti in NO
 *        literal; pt verbs.smell !== 'sentir'; de: no Gehör / Geruch / Gesicht;
 *    (7) starters: 5 literals ending in "..." or ":", no `{slot}`, rendered
 *        width at starterFontPx({h:46, glyphH:30}).px (Nunito 700) <= 280;
 *    (8) signedOk ⊆ the signed nouns; every face's d2 pool reaches its config
 *        (base 5 x 1 · sort 5 x 2 with smell co-occurrable >= 2 · which
 *        {2,2,2,1,1} · odd majorityRows + 5 odds · label 5 · write 5) else
 *        `refuse` names the face;
 *    (9) titles <= 70, no worksheet word, unique in the block, never a
 *        neighbour family's axis name (science-sort / visual-discrimination /
 *        odd-one-out / human-body) nor any axes.theme slug / name in that
 *        locale; nl F3 title contains "zintuig"; fi titles never head with
 *        the bare "Aistit"; nl titles carry no digit; instructions <= 150;
 *        the six titles differ pairwise by >= 1 token; no visible free-claim;
 *   (10) strings ids === {K-355, G1-357..G1-361}; a missing face id must be
 *        named in `refuse` (by its mode).
 * 2. RENDER — through render/render-instance.js (file:// fonts): d1 / d2 / d3
 *    per authored locale under the en chrome + the long-chrome fixture (a
 *    3-line de title + a 150-char instruction: the tallest chrome the 70 /
 *    150 limits produce, body 733 measured). Asserts verify() empty,
 *    qa/lints.js clean, and ITSELF: every `.ws-icon` >= the K floor 56 AND
 *    === the config px, `pairs` items each side at 170 x itemH, the line zone
 *    between the dots >= 200 (design 203), the stage inside the body / above
 *    the footer; then the 722 AND 677 stack checks: the body is pinned to each
 *    budget in the live page and the lowest item must stay inside it (the
 *    fi four-line-title stack the chrome limits cannot reach in en); NODE
 *    cross-checks: every left item is a bank item whose sense === the stamp
 *    with a confidence the resolved pool admits, every right organ ===
 *    _organOf(sense), the family fence + maxPerSense hold. The verb / starter
 *    widths of every authored locale are measured with the shell fonts here
 *    (rules 5 / 7).
 * 3. SWEEP — 20 seeds x d2 (build only, skipped by --quick): distinct senses,
 *    all five senses, a derangement, the family fence, >= 2 distinct item
 *    sets, >= 2 distinct organ orders.
 * 4. POISON — each must FAIL for its OWN reason (WRONG REASON / SILENT both
 *    exit 1); the correct EN bank is the control:
 *      P1  weather/sun as a see item                 → rule 3 (K-211)
 *      P2  At the Supermarket/cheese as smell         → rule 3 (G1-207)
 *      P3  toys/teddy_bear as touch                   → rule 2 (vocabKey null)
 *      P4  organOf.touch = 'skin'                     → rule 1 (no picture)
 *      P5  majorityRows += smell                      → rule 4 (co-occurrable 3 < 6)
 *      P6  de verbs.hear = 'Ohr'                      → rule 5
 *      P7  fr verbs.touch = 'sentir' MUST_FIRE; fr 'toucher' PASSES (control) → rule 6
 *      P8  it starters.hear = 'Sento ...' MUST_FIRE; it 'Ascolto ...' PASSES  → rule 6
 *      P9  de starters.taste = 'Ich kann schmecken: ' → rule 7 (327 > 280, measured);
 *          de 'Ich schmecke ...' PASSES (control)
 *      P10 fi starters.hear = 'Kuulen {noun}'         → rule 7 (slot)
 *      P11 nl F3 title 'Wat hoort er niet bij?'       → rule 9
 *      P12 fi base title 'Aistit'                     → rule 9
 *      P13 sv strings without the F4 id and no refuse → rule 10
 *      P14 a second `rock` item (beach)               → rule 3
 *      P6b de verbs.hear = 'hören' PASSES (control); pt 'cheirar' PASSES; de 'Gehör' FIRES
 *      P15 d3 (organWords) with a block missing verbs → the spec REFUSES
 *      PR1 the organ column with a row straight across → verify() derangement
 *      PR2 two hear objects                            → verify() "not distinct"
 *      PR13 the base built with makeSciencePairMatch's 720 stack under the
 *           677 budget                                 → the stack check (overflow)
 * 5. FACES (Phase 2, tools/b4var-rows/five-senses.js → types/g1/G1-357..361):
 *    rows module ≡ emitted spec ≡ bank strings (ONE source; d2 = base d2 +
 *    the overrides; the three levels one config; gradeBand G1; themeless);
 *    each face rendered at d2 en (one-line chrome, body ~811) AND under a
 *    69-char 3-line de title + 150-char instruction (body 733) AND with the
 *    body PINNED to 722 / 677 (verify() re-run on the re-flowed layout, the
 *    lowest content inside the pinned body); asserts verify() empty, lints
 *    clean, the stage inside the body / at its top (≤ 8 px: never a floating
 *    stage) / above the footer; floors: F1 tiles === 64 + the bin organ === 44
 *    (the nose ruling), pills one client rect, bins 185, the FIXED line zone
 *    (block === config 260, dot-to-pill 200..266, stage ≥ 630, slack under the
 *    bins ≤ 180 — the K-357 SPARSE ruling); F2 pictures === 60, chips 5 x
 *    (60 / 46), fixed order, object ≥ 0.7 of its row, the grid fills the body;
 *    F3 pictures ≥ 72 in boxes 96..120 (they GROW with the fractional row),
 *    picture ≥ 0.5 of the card, the grid fills the body; F4 organs === 72,
 *    glyphH 36, rows 112..128, bank one row, slack ≤ 180; F5 organs === 56,
 *    starters === starterFontPx 34.5 and ≤ 0.5 x the 560 row (gate D), lanes
 *    126..140, slack ≤ 180. NODE cross-checks with the bank: every picture a
 *    bank item of the stamped sense admitted by the pool, no picture twice,
 *    the family fence, maxPerSense; F1 pill === verbs[sense] + bin organ ===
 *    _organOf; F2 exactly one chip === _organOf(sense), counts {2,2,2,1,1};
 *    F3 row-sense multiset === majorityRows, intruders under maxPerSense;
 *    F4 bank set === verbs, bank order ≠ row order in ≥ 3 positions; F5
 *    starter literal === starters[sense] per organ.
 * 6. FACE SWEEP — 20 seeds x d2 per face (build only): no picture twice, the
 *    family fence, F1 ≥ 2 item sets + the smell bin over ≥ 3 pairs + never
 *    the canonical bin order, F2 counts 1,1,2,2,2 + ≥ 2 answer sequences,
 *    F3 ≥ 2 odd-column vectors + ≥ 2 row orders + intruders ≤ 2 per sense,
 *    F4 ≥ 2 bank orders never following the rows, F5 the senses order.
 * 7. FACE POISONS (each for its OWN reason; the five d2 renders are the controls):
 *      PR3  F1 a pill "Nase"                            → node gate "pill ≠ verbs.smell"
 *      PR4  F1 two flower-family tiles (rose + lilac)   → node gate family fence
 *      PR12 F1 one flex-wrap row of ten tiles          → verify "strip row wraps"
 *      PS1  F1 the zone stretched to 425 (space-between) → verify "zone > 266 SPARSE" + "not the stamped 260"
 *      PR5  F2 a row with 4 chips                      → verify "4 chips ≠ 5"
 *      PR6  F2 the ear chip pre-ringed                 → verify "chip pre-marked"
 *      PR11 F2 chipOrder 'random'                      → the spec guard (config, never the level index); d3's
 *           shuffled config re-pointed to level 2 builds shuffled strips (control)
 *      PS2  F2 rows fixed at 76, grid not filling      → verify "the rows do not fill the page (sparse)"
 *      PR7  F3 row 1 = 3 smell + 1 hear                → verify "majority ∉ config"
 *      PR8  F3 every intruder in column 4              → verify "position leak" (cap + run)
 *      PS3  F3 the design's fixed 96 / 72 boxes        → verify "does not grow to min(boxMax, stage) (sparse)"
 *      PR9  F4 the bank in the row order               → node gate "order leak"
 *      PS4  F4 the stage centred in the body           → verify "the stage floats"
 *      PR10 F5 starters at 0.9 x glyphH = 27 px        → "starter sized 27 ≠ starterFontPx 34.5"
 *      PR14 F5 the design's 430 row + draw box + de "Ich kann …" → verify gate D (327 > 215)
 *      PS5  F5 the lanes centred in the body           → verify "the stage floats"
 *      PR15 an unauthored locale (sv)                  → every face REFUSES (never en)
 *      PR16 the touch pool emptied                     → sort / which REFUSE (no filler)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b4-common.js');
const { vocab, excluded, fileUri, entriesFor } = require('../lib/b2-common.js');
const { hasPicture } = require('../lib/b3-picture-index.js');
const resolve = require('../image-cache/resolve.js');
const tokens = require('../primitives/_tokens.js');
const { starterFontPx } = require('../templates/components-b2.js');
const C4 = require('../templates/components-b4.js');
const freeClaim = require('../../lib/free-claim.js');

const TYPE = require('../types/k/K-355-five-senses.js');
const GLOBAL = require('../data/science/five-senses.json');
const DATA_MOD = require('../data/b4/five-senses.js');
const TAX = require('../../../frontend/config/topics-taxonomy.json');

const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const SENSES = ['hear', 'see', 'smell', 'taste', 'touch'];
const ORGANS = ['eye', 'ear', 'nose', 'tongue', 'hand'];
const ORGAN_OF = { hear: 'ear', see: 'eye', smell: 'nose', taste: 'tongue', touch: 'hand' };
const ORGAN_THEME = 'body parts';
const BASE_ID = 'K-355';
const FACE_IDS = { 'G1-357': 'sort', 'G1-358': 'which', 'G1-359': 'odd', 'G1-360': 'label', 'G1-361': 'write' };
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const NEIGHBOUR_FAMILIES = ['science-sort', 'visual-discrimination', 'odd-one-out', 'human-body'];
const MIN_ICON = tokens.density.K.minElement;   // 56
const PILL_MAX = 123, PILL_PAD = 29;             // §5 rule 5: verb + 24 padding + 5 border <= the 123 bin
const STARTER_MAX = 280;                         // §5 rule 7: 0.5 x the 560 row (verify-ruling-starters gate D)
const STARTER_PX = starterFontPx({ h: 46, glyphH: 30 }).px;   // 34.5 (measured metrics)
const NEIGHBOUR_BANKS = ['hot-vs-cold', 'food-groups', 'summer-vs-winter-clothes'];
const WEBP_THEMES = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'image-library-webp', 'themes');   // the served library: every picture a face keeps must exist here as <theme>/<noun>@2x.webp

freeClaim.selfTest();

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
const nfd = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const rx = (x) => String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function clone(o) { return JSON.parse(JSON.stringify(o)); }

/* ------------------------------------------------------------------ bank: global */
function vocabKeyOf(theme, noun) {
  try { const e = resolve.manifest().themes[theme]; return e && e.nouns[noun] ? e.nouns[noun].vocabKey || null : undefined; } catch (e) { return undefined; }
}
let _neigh = null;
function neighbourRefs() {
  if (_neigh) return _neigh;
  const refs = new Set(), keys = new Set();
  for (const f of NEIGHBOUR_BANKS) {
    const j = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'science', f + '.json'), 'utf8'));
    for (const it of j.items) { refs.add(it.theme + '/' + it.noun); const k = vocabKeyOf(it.theme, it.noun); if (k) keys.add(k); }
  }
  _neigh = { refs, keys };
  return _neigh;
}
function bodyPartNouns() { return new Set(Object.keys(resolve.manifest().themes[ORGAN_THEME].nouns)); }
function familyOf(global, noun) { const i = (global.families || []).findIndex((f) => f.includes(noun)); return i >= 0 ? i : null; }
/** Strong items of a sense with every family collapsed to one member. */
function coOccurrable(global, sense) {
  const seenFam = new Set();
  return (global.items || []).filter((it) => it.sense === sense && it.confidence === 'strong').filter((it) => {
    const f = familyOf(global, it.noun);
    if (f === null) return true;
    if (seenFam.has(f)) return false;
    seenFam.add(f);
    return true;
  });
}

function validateGlobal(global) {
  const f = [];
  const push = (m) => f.push(`[global] ${m}`);
  if (!global) { push('absent'); return f; }
  // rule 1
  if (!Array.isArray(global.senses) || global.senses.join() !== SENSES.join()) push(`senses ${JSON.stringify(global.senses)} ≠ ${SENSES.join(',')}`);
  const oo = global.organOf || {};
  const organsUsed = [];
  for (const s of SENSES) {
    const o = oo[s];
    if (!ORGANS.includes(o)) { push(`organOf.${s} = "${o}" is not one of ${ORGANS.join(' ')}`); continue; }
    organsUsed.push(o);
    try { fileUri(ORGAN_THEME, o); } catch (e) { push(`organ ${o}: no picture in ${ORGAN_THEME}`); }
    const key = vocabKeyOf(ORGAN_THEME, o);
    const V = vocab();
    if (!key || !V[key] || !LOCALES.every((l) => V[key][l] && V[key][l][0] && V[key][l][1])) push(`organ ${o}: vocab singular + plural missing in a locale`);
  }
  if (new Set(organsUsed).size !== organsUsed.length) push('an organ answers two senses');
  const same = (m) => m && SENSES.every((s) => m[s] === ORGAN_OF[s]) && Object.keys(m).length === SENSES.length;
  if (!same(oo)) push('organOf ≠ the constant ORGAN_OF');
  if (!same(DATA_MOD.ORGAN_OF)) push('data/b4/five-senses.js ORGAN_OF ≠ the constant');
  if (!same(C4.ORGAN_OF)) push('components-b4 ORGAN_OF ≠ the constant');
  if (global.organFallback && JSON.stringify(global.organFallback) !== JSON.stringify({ taste: 'mouth' })) push('organFallback may only be {taste:mouth}');
  // rule 2 + 3
  const items = Array.isArray(global.items) ? global.items : [];
  if (!items.length) push('no items');
  const nb = neighbourRefs();
  const bodyNouns = bodyPartNouns();
  const nouns = new Set();
  for (const it of items) {
    const tag = (x) => `item ${it && it.theme}/${it && it.noun}: ${x}`;
    if (!it || typeof it.theme !== 'string' || typeof it.noun !== 'string') { push('an item without theme/noun'); continue; }
    if (BW_MARKER.test(it.theme)) push(tag('theme dir carries a localized B&W marker'));
    let resolves = true;
    try { fileUri(it.theme, it.noun); } catch (e) { push(tag('does not resolve via fileUri')); resolves = false; }
    if (it.picOpened !== true) push(tag('not picOpened:true'));
    const key = vocabKeyOf(it.theme, it.noun);
    if (!key) push(tag('vocabKey null in cache/manifest.json (rule 2 cannot pass)'));
    else {
      for (const l of LOCALES) {
        if (!entriesFor(it.theme, l).some((e) => e.noun === it.noun)) push(tag(`absent from entriesFor(${it.theme}, ${l})`));
        if (!hasPicture(key, l)) push(tag(`hasPicture(${key}, ${l}) false`));
        if (excluded(key, l)) push(tag(`vocab key ${key} is excluded in ${l}`));
      }
      if (nb.keys.has(key)) push(tag(`vocab key ${key} belongs to a neighbour bank (${NEIGHBOUR_BANKS.join(' / ')})`));
    }
    if (!SENSES.includes(it.sense)) push(tag(`sense "${it.sense}"`));
    if (!['strong', 'signed'].includes(it.confidence)) push(tag(`confidence "${it.confidence}"`));
    if (it.confidence === 'signed' && !(typeof it.note === 'string' && it.note.trim())) push(tag('a signed item needs a note'));
    if (nb.refs.has(it.theme + '/' + it.noun)) push(tag('is an item of a neighbour bank (hot-vs-cold / food-groups / summer-vs-winter-clothes)'));
    if (bodyNouns.has(it.noun)) push(tag('is a body parts noun'));
    if (nouns.has(it.noun)) push(tag('noun appears in two items'));
    nouns.add(it.noun);
    void resolves;
  }
  // rule 4
  for (const s of SENSES) {
    const strong = items.filter((it) => it.sense === s && it.confidence === 'strong').length;
    const co = coOccurrable(global, s).length;
    if (strong < 5) push(`sense ${s}: ${strong} strong items < 5`);
    if (co < 3) push(`sense ${s}: ${co} co-occurrable strong items < 3`);
  }
  const mr = (global.pageRules && global.pageRules.majorityRows) || {};
  for (const [s, n] of Object.entries(mr)) {
    if (!SENSES.includes(s)) { push(`majorityRows.${s} is not a sense`); continue; }
    const co = coOccurrable(global, s).length;
    if (co < 6) push(`majorityRows.${s}: ${co} co-occurrable strong items < 6 (two disjoint triples)`);
    if (n > Math.floor(co / 3)) push(`majorityRows.${s} = ${n} > floor(${co} / 3)`);
  }
  for (const fam of global.families || []) {
    const senses = new Set(fam.map((n) => { const it = items.find((x) => x.noun === n); return it ? it.sense : 'MISSING'; }));
    if (senses.size !== 1) push(`family ${fam.join('/')} spans ${[...senses].join(',')} (must be one sense)`);
  }
  return f;
}

/* ------------------------------------------------------------------ bank: locale block */
function organNounForms(loc) {
  const V = vocab();
  const out = new Set();
  const add = (theme, noun) => { const k = vocabKeyOf(theme, noun); const e = k && V[k] && V[k][loc]; if (e) { if (e[0]) out.add(String(e[0]).toLocaleLowerCase(loc)); if (e[1]) out.add(String(e[1]).toLocaleLowerCase(loc)); } };
  for (const o of [...ORGANS, 'mouth']) add(ORGAN_THEME, o);
  for (const it of GLOBAL.items) add(it.theme, it.noun);
  return out;
}
const SIGNED_NOUNS = () => new Set(GLOBAL.items.filter((it) => it.confidence === 'signed').map((it) => it.noun));
function tokensOf(s) { return new Set(nfd(s).split(/[^\p{L}\p{N}]+/u).filter(Boolean)); }

/** Rules 5-10 on ONE locale block (node only; the widths of rules 5 / 7 are measured in the render phase). */
function validateBank(block, loc) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  if (!block || typeof block !== 'object') { push('absent'); return f; }
  const V = vocab();
  // rule 5
  const verbs = block.verbs || {};
  const forms = organNounForms(loc);
  const seen = new Set();
  for (const s of SENSES) {
    const v = verbs[s];
    if (typeof v !== 'string' || !v.trim()) { push(`verbs.${s} missing`); continue; }
    if (/[{}]/.test(v)) push(`verbs.${s} "${v}" carries a slot brace`);
    if (/\p{N}/u.test(v)) push(`verbs.${s} "${v}" carries a digit`);
    if ([...v].length > 14) push(`verbs.${s} "${v}" > 14 chars`);
    const lc = v.trim().toLocaleLowerCase(loc);
    if (seen.has(lc)) push(`verbs.${s} "${v}" repeats another verb`);
    seen.add(lc);
    if (forms.has(lc)) push(`verbs.${s} "${v}" equals the vocab singular or plural of an organ / item noun (the organ-noun fence)`);
  }
  // rule 6 (bans; the MUST_PASS controls are the poison section's job)
  const starters = block.starters || {};
  const allLiterals = [...Object.values(verbs), ...Object.values(starters), ...Object.values(block.strings || {}).flatMap((s) => [s && s.title, s && s.instruction])].filter((x) => typeof x === 'string');
  if (loc === 'fr') {
    if (typeof verbs.touch === 'string' && verbs.touch.trim().toLocaleLowerCase('fr') === 'sentir') push('verbs.touch = "sentir" (touch is never sentir in fr)');
    if (typeof starters.touch === 'string' && /sens/i.test(starters.touch)) push(`starters.touch "${starters.touch}" contains "sens"`);
  }
  if (loc === 'it') for (const lit of allLiterals) if (/(?<!\p{L})(sentir\p{L}*|sento|senti)(?!\p{L})/iu.test(lit)) push(`literal "${lit}" prints sentire / sento / senti (banned on the type in it)`);
  if (loc === 'pt' && typeof verbs.smell === 'string' && verbs.smell.trim().toLocaleLowerCase('pt') === 'sentir') push('verbs.smell = "sentir" (pt smell is cheirar)');
  if (loc === 'de') for (const lit of [...Object.values(verbs), ...Object.values(starters)].filter((x) => typeof x === 'string')) if (/(?<!\p{L})(Gehör|Geruch|Gesicht)(?!\p{L})/u.test(lit)) push(`literal "${lit}" is a sense NOUN (Gehör / Geruch / Gesicht), not a verb`);
  // rule 7 (shape; width in the render phase)
  for (const s of SENSES) {
    const st = starters[s];
    if (typeof st !== 'string' || !st.trim()) { push(`starters.${s} missing`); continue; }
    if (/[{}]/.test(st)) push(`starters.${s} "${st}" carries a {slot}`);
    if (!/(\.\.\.|…|:)\s*$/.test(st)) push(`starters.${s} "${st}" does not end in "..." or ":"`);
  }
  // rule 8
  const signed = SIGNED_NOUNS();
  const signedOk = Array.isArray(block.signedOk) ? block.signedOk : null;
  if (!signedOk) push('signedOk must be an array');
  else for (const n of signedOk) if (!signed.has(n)) push(`signedOk "${n}" is not a signed noun`);
  const refuse = Array.isArray(block.refuse) ? block.refuse : [];
  for (const r of refuse) if (!Object.values(FACE_IDS).includes(r)) push(`refuse "${r}" is not a face mode`);
  const co = Object.fromEntries(SENSES.map((s) => [s, coOccurrable(GLOBAL, s).length]));
  const need = {
    sort: SENSES.every((s) => co[s] >= 2),
    which: SENSES.filter((s) => co[s] >= 2).length >= 3 && SENSES.every((s) => co[s] >= 1),
    odd: Object.entries((GLOBAL.pageRules && GLOBAL.pageRules.majorityRows) || {}).every(([s, n]) => co[s] >= 3 * n) && SENSES.every((s) => co[s] >= 1),
    label: SENSES.every((s) => typeof verbs[s] === 'string' && verbs[s].trim()),
    write: SENSES.every((s) => typeof starters[s] === 'string' && starters[s].trim()),
  };
  if (!SENSES.every((s) => co[s] >= 1)) push('the base cannot fill five senses from the strong items');
  for (const [face, okk] of Object.entries(need)) if (!okk && !refuse.includes(face)) push(`face ${face}: the d2 pool / literals do not reach its config and refuse does not name it`);
  // rule 9
  const strings = block.strings || {};
  const titles = [];
  const themeWords = new Set();
  for (const t of Object.values(TAX.axes.theme || {})) { if (t.slug && t.slug[loc]) themeWords.add(nfd(t.slug[loc])); if (t.name && t.name[loc]) themeWords.add(nfd(t.name[loc])); }
  const neighbourNames = new Set(NEIGHBOUR_FAMILIES.map((k) => TAX.axes['exercise-type'][k] && TAX.axes['exercise-type'][k].name && TAX.axes['exercise-type'][k].name[loc]).filter(Boolean).map(nfd));
  for (const [id, s] of Object.entries(strings)) {
    const title = (s && s.title) || '';
    if (!title || [...title].length > 70) push(`${id} title "${title}" empty or > 70 chars`);
    if (WORKSHEET_WORD.test(title)) push(`${id} title "${title}" carries the worksheet word`);
    if (/with answers|mit lösungen|con respuestas|com respostas|avec (les )?réponses|con (le )?risposte|met antwoorden|med facit|med svar|med fasit|vastauksineen/i.test(title + ' ' + ((s && s.instruction) || ''))) push(`${id} promises an answer key (printable decks ship none)`);
    if (neighbourNames.has(nfd(title))) push(`${id} title "${title}" equals a neighbour family's name`);
    if (themeWords.has(nfd(title))) push(`${id} title "${title}" equals a theme slug / name`);
    if (loc === 'nl' && id === 'G1-359' && !/zintuig/i.test(title)) push(`nl F3 title "${title}" must contain "zintuig"`);
    if (loc === 'nl' && /\p{N}/u.test(title)) push(`nl title "${title}" carries a numeral`);
    if (loc === 'fi' && /^aistit(?!\p{L})/iu.test(title.trim())) push(`fi title "${title}" heads with the bare "Aistit"`);
    const claim = freeClaim.hit(title + ' ' + ((s && s.instruction) || ''));
    if (claim) push(`${id} visible copy claims free ("${claim}")`);
    if (titles.some((t) => t.t === nfd(title))) push(`${id} title "${title}" repeats another face's title`);
    for (const prev of titles) {
      const a = tokensOf(title), b = tokensOf(prev.title);
      const diff = [...a].some((x) => !b.has(x)) || [...b].some((x) => !a.has(x));
      if (!diff) push(`${id} and ${prev.id} titles share every token`);
    }
    titles.push({ id, t: nfd(title), title });
    const ins = (s && s.instruction) || '';
    if (!ins || [...ins].length > 150) push(`${id} instruction empty or > 150 chars`);
    if (/[{}]/.test(ins)) push(`${id} instruction carries a slot`);
  }
  // rule 10
  if (!strings[BASE_ID]) push(`strings ${BASE_ID} missing`);
  for (const [id, mode] of Object.entries(FACE_IDS)) if (!strings[id] && !refuse.includes(mode)) push(`strings ${id} (${mode}) missing and refuse does not name "${mode}"`);
  for (const id of Object.keys(strings)) if (id !== BASE_ID && !FACE_IDS[id]) push(`strings carries an unknown id ${id}`);
  if (typeof block.strand !== 'string' || !block.strand.trim()) push('no strand literal');
  else if (/common core/i.test(block.strand) && loc !== 'en') push('strand names Common Core outside en');
  // organOf override
  for (const [k, v] of Object.entries(block.organOf || {})) if (!(k === 'taste' && v === 'mouth')) push(`organOf override ${k}:${v} — only {taste:'mouth'} is allowed`);
  void V;
  return f;
}

/* ------------------------------------------------------------------ render */
/** Widths of the verb pills (Baloo 2 700 17) and the starters (Nunito 700 at STARTER_PX) measured with the shell fonts on a rendered page. */
async function measureLiterals(page, block) {
  return page.evaluate(({ verbs, starters, px }) => {
    const m = (text, font) => { const s = document.createElement('span'); s.style.cssText = `position:absolute;left:-9999px;top:0;white-space:nowrap;font:${font}`; s.textContent = text; document.body.appendChild(s); const w = s.getBoundingClientRect().width; s.remove(); return w; };
    const out = { verbs: {}, starters: {} };
    for (const [k, v] of Object.entries(verbs || {})) out.verbs[k] = m(v, "700 17px 'Baloo 2'");
    for (const [k, v] of Object.entries(starters || {})) out.starters[k] = m(v, `700 ${px}px 'Nunito'`);
    return out;
  }, { verbs: block.verbs, starters: block.starters, px: STARTER_PX });
}
function assertWidths(name, block, w) {
  for (const s of SENSES) {
    if (typeof (block.verbs || {})[s] === 'string') ok(w.verbs[s] + PILL_PAD <= PILL_MAX + 0.6, `${name}: verb "${block.verbs[s]}" ${w.verbs[s].toFixed(1)} + ${PILL_PAD} > the ${PILL_MAX} bin`);
    if (typeof (block.starters || {})[s] === 'string') ok(w.starters[s] <= STARTER_MAX + 0.6, `${name}: starter "${block.starters[s]}" ${w.starters[s].toFixed(1)} px > ${STARTER_MAX} at ${STARTER_PX} px (rule 7 / gate D)`);
  }
}

async function renderWith(page, type, { difficulty, locale, baseName, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: locale || 'en', page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-ws-content][data-lcs-five-senses]');
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const items = root ? [...root.querySelectorAll('.ws-match-item')] : [];
    const ld = root && root.querySelector('[data-lcs-col="objects"] .ws-match-dot--right'), rd = root && root.querySelector('[data-lcs-col="organs"] .ws-match-dot--left');
    return {
      stamps: root ? { ...root.dataset } : null,
      body: rect(document.querySelector('[data-lcs-body]')), foot,
      stage: root ? rect(root) : null,
      icons: items.map((el) => { const im = el.querySelector('.ws-icon'); return im ? Math.min(im.offsetWidth, im.offsetHeight) : 0; }),
      items: items.map((el) => ({ ...rect(el), item: el.dataset.lcsItem || null, organ: el.dataset.lcsOrgan || null, sense: el.dataset.lcsSense, word: (el.querySelector('.fs-organ-word') || {}).textContent || null })),
      zone: ld && rd ? rd.getBoundingClientRect().left - ld.getBoundingClientRect().right : null,
      lowest: items.reduce((y, el) => Math.max(y, el.getBoundingClientRect().bottom), 0),
      /* the 722 / 677 stack checks: pin the body to each budget and re-measure the lowest item against it */
      stacks: [722, 677].map((h) => {
        const b = document.querySelector('[data-lcs-body]');
        const saved = b.style.cssText;
        b.style.cssText = saved + `;flex:0 0 ${h}px;height:${h}px;max-height:${h}px;overflow:visible`;
        const bb = b.getBoundingClientRect();
        const low = items.reduce((y, el) => Math.max(y, el.getBoundingClientRect().bottom), 0);
        const high = items.reduce((y, el) => Math.min(y, el.getBoundingClientRect().top), Infinity);
        b.style.cssText = saved;
        return { budget: h, bodyH: bb.height, fits: low <= bb.bottom + 0.6 && high >= bb.top - 0.6, stack: low - high };
      }),
      bodyH: body.height,
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath };
}

function nodeGate(name, r, block, loc, d) {
  const left = r.m.items.filter((it) => it.item), right = r.m.items.filter((it) => it.organ);
  const fams = new Set(); const per = {};
  for (const it of left) {
    const [theme, noun] = it.item.split('/');
    const bi = GLOBAL.items.find((x) => x.theme === theme && x.noun === noun);
    ok(!!bi, `${name}: node gate — ${it.item} is not a bank item`);
    if (!bi) continue;
    ok(bi.sense === it.sense, `${name}: node gate — ${it.item} stamped ${it.sense} but the bank says ${bi.sense}`);
    const admitted = TYPE._itemsFor(GLOBAL, block, bi.sense, d.pool, loc).some((x) => x.noun === noun);
    ok(admitted, `${name}: node gate — ${it.item} (${bi.confidence}) is not admitted by pool ${d.pool} in ${loc}`);
    const f = familyOf(GLOBAL, noun);
    if (f !== null) { ok(!fams.has(f), `${name}: node gate — two items of family ${f} on the page`); fams.add(f); }
    per[it.sense] = (per[it.sense] || 0) + 1;
  }
  for (const [s, c] of Object.entries(per)) ok(c <= d.maxPerSense, `${name}: node gate — ${c} items of ${s} > maxPerSense ${d.maxPerSense}`);
  for (const it of right) {
    ok(it.organ === TYPE._organOf(block, loc, it.sense), `${name}: node gate — organ ${it.organ} ≠ _organOf(${it.sense})`);
    if (d.organWords) ok(it.word && it.word.trim() === TYPE._verb(block, loc, it.sense), `${name}: node gate — organ word "${it.word}" ≠ verbs.${it.sense}`);
    else ok(!it.word, `${name}: node gate — an organ word printed at a wordless level`);
  }
}

function assertRender(name, r, d, opts) {
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.stamps && r.m.stamps.lcsLayout === 'base' && +r.m.stamps.lcsPairs === d.pairs, `${name}: root stamps ${JSON.stringify(r.m.stamps)} ≠ base / pairs ${d.pairs}`);
  const left = r.m.items.filter((it) => it.item), right = r.m.items.filter((it) => it.organ);
  ok(left.length === d.pairs && right.length === d.pairs, `${name}: ${left.length} objects / ${right.length} organs ≠ ${d.pairs}`);
  ok(r.m.items.every((it) => Math.abs(it.w - 170) < 0.6 && Math.abs(it.h - d.itemH) < 0.6), `${name}: items ${JSON.stringify(r.m.items.map((it) => [Math.round(it.w), Math.round(it.h)]))} ≠ 170 x ${d.itemH}`);
  const minIcon = r.m.icons.length ? Math.min(...r.m.icons) : 0;
  ok(minIcon >= MIN_ICON, `${name}: icon ${minIcon} px < the K floor ${MIN_ICON}`);
  ok(r.m.icons.every((px) => Math.abs(px - d.iconPx) < 0.6), `${name}: icons ${JSON.stringify(r.m.icons)} ≠ config ${d.iconPx}`);
  ok(r.m.zone != null && r.m.zone >= 200, `${name}: line zone ${r.m.zone && Math.round(r.m.zone)} px < 200 (design 203)`);
  ok(r.m.stage && r.m.stage.left >= r.m.body.left - 0.6 && r.m.stage.right <= r.m.body.right + 0.6, `${name}: stage outside the body column`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: an item reaches ${Math.round(r.m.lowest)} into the footer band at ${Math.round(r.m.foot)}`);
  for (const s of r.m.stacks) ok(s.fits, `${name}: the stack (${Math.round(s.stack)} px of items) overflows the ${s.budget} budget (body pinned to ${Math.round(s.bodyH)})`);
  if (opts && opts.block) nodeGate(name, r, opts.block, opts.loc, d);
  return { minIcon, zone: r.m.zone == null ? null : Math.round(r.m.zone), body: Math.round(r.m.bodyH), stack: Math.round(r.m.stacks[1].stack) };
}

/* ------------------------------------------------------------------ poison */
function typeWith(global, block) {
  return Object.assign({}, TYPE, { build(args, ctx) { return this._buildWith({ global, block }, args, ctx); } });
}
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
function control(name, findings) {
  const pass = findings.length === 0;
  poisonLog.push(`  ${name}: ${pass ? 'PASSES (control)' : 'FAILS — ' + JSON.stringify(findings.slice(0, 3))}`);
  return pass;
}
function collect(fn) {
  const before = fails.length, saved = assertions;
  fn();
  const found = fails.splice(before);
  assertions = saved;
  return found;
}
/** A locale block derived from EN with the literal a poison needs (the panels author the real ones). */
function blockFor(en, loc, patch) {
  const b = clone(en);
  Object.assign(b, patch || {});
  return b;
}
/** The factory's fixed-720 stack (science-pair-match.js:49) rebuilt on this type's stamps — the PR13 needle. */
function factoryStackType(global, en) {
  return Object.assign({}, TYPE, { build(args, ctx) {
    const out = TYPE._buildWith({ global, block: en }, args, ctx);
    const n = 5, itemH = Math.floor((720 - (n - 1) * 14) / n);   // 132
    out.bodyHtml = out.bodyHtml.replace(/height:122px/g, `height:${itemH}px`).replace(/data-lcs-item-h="122"/, `data-lcs-item-h="${itemH}"`);
    return out;
  } });
}


/* ------------------------------------------------------------------ faces (Phase 2) */
const FACE_ROWS = require('../tools/b4var-rows/five-senses.js').ROWS;
/** The longest legal en/de chrome for a FACE: a 69-char 3-line title + a 150-char instruction (the base's fixture, re-cut for the faces). */
const LONG_FACE = { title: 'Die fünf Sinne: Ordne jedes Bild dem Körperteil zu, mit dem du es wahrnimmst', instruction: 'Schau dir jedes Bild genau an und zeichne eine Linie von seinem Punkt zu dem Kasten des Sinnes, mit dem du es hörst, siehst, riechst, schmeckst oder fühlst.'.slice(0, 150) };
const faceRenders = {};

/** Render a face and measure it: root stamps, the stage vs the body / footer, the face's own numbers, and verify() re-run with the body PINNED to 722 and 677. */
async function renderFace(page, type, { locale, baseName, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty: 2, locale: locale || 'en', page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-ws-content][data-lcs-five-senses]');
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const px = (el) => { const im = el && el.querySelector('img'); return im ? Math.min(im.getBoundingClientRect().width, im.getBoundingClientRect().height) : 0; };
    const lowest = root ? [...root.querySelectorAll('*')].reduce((y, el) => { const r = el.getBoundingClientRect(); return r.width && r.height ? Math.max(y, r.bottom) : y; }, 0) : 0;
    const face = {};
    const layout = root ? root.dataset.lcsLayout : null;
    if (layout === 'sort') {
      face.tiles = [...root.querySelectorAll('[data-lcs-tile]')].map((t) => ({ item: t.dataset.lcsItem, sense: t.dataset.lcsTile, px: px(t), top: Math.round(t.getBoundingClientRect().top) }));
      face.bins = [...root.querySelectorAll('[data-lcs-bin]')].map((b) => { const p = b.querySelector('[data-lcs-bin-label]'), o = b.querySelector('[data-lcs-bin-organ]'); return { sense: b.dataset.lcsBin, pill: p ? p.textContent.trim() : null, pillRects: p ? p.getClientRects().length : 0, organ: o ? o.dataset.lcsBinOrgan : null, organPx: px(o), h: b.getBoundingClientRect().height, bottom: b.getBoundingClientRect().bottom }; });
      const z = root.querySelector('[data-lcs-line-zone]');
      face.zoneBlock = z ? z.getBoundingClientRect().height : null;
      const rows = [...root.querySelectorAll('[data-lcs-strip-row]')];
      const lastDots = rows.length ? [...rows[rows.length - 1].querySelectorAll('.fs-dot')].map((d) => d.getBoundingClientRect().bottom) : [0];
      const pillTop = Math.min(...face.bins.map((b) => { const p = root.querySelector(`[data-lcs-bin="${b.sense}"] [data-lcs-bin-label]`); return p ? p.getBoundingClientRect().top : Infinity; }));
      face.zone = pillTop - Math.max(...lastDots);
      face.stageH = Math.max(...face.bins.map((b) => b.bottom)) - Math.min(...face.tiles.map((t) => t.top));
      face.slack = foot - Math.max(...face.bins.map((b) => b.bottom));
    } else if (layout === 'which') {
      face.rows = [...root.querySelectorAll('[data-lcs-row]')].map((r) => ({ item: r.dataset.lcsItem, sense: r.dataset.lcsSense, picPx: px(r.querySelector('.fs-object')), h: r.getBoundingClientRect().height, objH: r.querySelector('.fs-object').getBoundingClientRect().height,
        chipOrder: (r.querySelector('[data-lcs-chips]') || {}).dataset ? r.querySelector('[data-lcs-chips]').dataset.lcsChipOrder : null,
        chips: [...r.querySelectorAll('[data-lcs-chip]')].map((c) => ({ organ: c.dataset.lcsChip, px: px(c), tile: Math.min(c.getBoundingClientRect().width, c.getBoundingClientRect().height) })) }));
      face.slack = foot - Math.max(...face.rows.map((_, i) => root.querySelectorAll('[data-lcs-row]')[i].getBoundingClientRect().bottom));
    } else if (layout === 'odd') {
      face.cards = [...root.querySelectorAll('[data-lcs-row-sense]')].map((c) => ({ sense: c.dataset.lcsRowSense, h: c.getBoundingClientRect().height, items: [...c.querySelectorAll('[data-lcs-item]')].map((b) => ({ item: b.dataset.lcsItem, sense: b.dataset.lcsItemSense, odd: b.dataset.lcsOdd === '1', px: px(b), box: Math.min(b.getBoundingClientRect().width, b.getBoundingClientRect().height) })) }));
      face.slack = foot - Math.max(...[...root.querySelectorAll('[data-lcs-row-sense]')].map((c) => c.getBoundingClientRect().bottom));
    } else if (layout === 'label') {
      face.rows = [...root.querySelectorAll('[data-lcs-organ]')].map((r) => ({ organ: r.dataset.lcsOrgan, h: r.getBoundingClientRect().height, organPx: px(r.querySelector('.fs-organ')), text: r.textContent.trim(), starters: r.querySelectorAll('[data-lcs-starter]').length, writingRows: r.querySelectorAll('[data-lcs-prim="writing-row"]').length }));
      face.bank = [...root.querySelectorAll('[data-lcs-bank-word]')].map((w) => w.textContent.trim());
      const bn = root.querySelector('[data-lcs-bank-banner]');
      face.bankH = bn ? bn.getBoundingClientRect().height : 0;
      face.slack = foot - Math.max(...[...root.querySelectorAll('[data-lcs-organ]')].map((r) => r.getBoundingClientRect().bottom));
    } else if (layout === 'write') {
      face.lanes = [...root.querySelectorAll('[data-lcs-organ]')].map((l) => { const st = l.querySelector('[data-lcs-starter]'); const wr = l.querySelector('[data-lcs-prim="writing-row"]'); return { organ: l.dataset.lcsOrgan, h: l.getBoundingClientRect().height, organPx: px(l.querySelector('.fs-organ')), starter: st ? st.textContent : null, starterPx: st ? +st.dataset.lcsStarterPx : null, starterW: st ? (st.getBBox ? st.getBBox().width : st.getBoundingClientRect().width) : null, rowW: wr ? wr.getBoundingClientRect().width : null, rows: l.querySelectorAll('[data-lcs-prim="writing-row"]').length, draws: l.querySelectorAll('[data-lcs-drawbox]').length }; });
      face.slack = foot - Math.max(...[...root.querySelectorAll('[data-lcs-organ]')].map((r) => r.getBoundingClientRect().bottom));
    }
    return { stamps: root ? { ...root.dataset } : null, body: rect(document.querySelector('[data-lcs-body]')), foot, stage: root ? rect(root) : null, lowest, face, bodyH: body.height };
  });
  // the 722 / 677 pins: pin the body, re-run verify() on the re-flowed layout, measure the lowest content against the pinned body
  const pins = [];
  for (const h of [722, 677]) {
    await page.evaluate((hh) => { const b = document.querySelector('[data-lcs-body]'); b.dataset.savedCss = b.style.cssText; b.style.cssText = b.dataset.savedCss + `;flex:0 0 ${hh}px;height:${hh}px;max-height:${hh}px;overflow:visible`; }, h);
    const v = await type.verify(page);
    const mm = await page.evaluate(() => {
      const root = document.querySelector('[data-ws-content][data-lcs-five-senses]');
      const b = document.querySelector('[data-lcs-body]').getBoundingClientRect();
      const low = root ? [...root.querySelectorAll('*')].reduce((y, el) => { const r = el.getBoundingClientRect(); return r.width && r.height ? Math.max(y, r.bottom) : y; }, 0) : 0;
      return { bodyH: b.height, inside: low <= b.bottom + 0.6, low: low - b.top };
    });
    await page.evaluate(() => { const b = document.querySelector('[data-lcs-body]'); b.style.cssText = b.dataset.savedCss; delete b.dataset.savedCss; });
    pins.push({ budget: h, bodyH: mm.bodyH, verify: v, inside: mm.inside, stack: mm.low, ok: v.length === 0 && mm.inside && Math.abs(mm.bodyH - h) < 1 });
  }
  m.pins = pins;
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, html: out.html };
}

function bankItem(ref) { const [theme, noun] = String(ref).split('/'); return GLOBAL.items.find((x) => x.theme === theme && x.noun === noun) || null; }
/** The page rule on every face: every picture a bank item of the stamped sense admitted by the pool, no picture twice, the family fence, maxPerSense (on the given set). */
function pageRule(name, refs, d, block, loc) {
  const nouns = new Set(), fams = new Set(), per = {};
  for (const { item, sense } of refs) {
    const bi = bankItem(item);
    ok(!!bi, `${name}: node gate — ${item} is not a bank item`);
    if (!bi) continue;
    ok(bi.sense === sense, `${name}: node gate — ${item} stamped ${sense} but the bank says ${bi.sense}`);
    ok(TYPE._itemsFor(GLOBAL, block, bi.sense, d.pool, loc).some((x) => x.noun === bi.noun), `${name}: node gate — ${item} (${bi.confidence}) is not admitted by pool ${d.pool} in ${loc}`);
    ok(!nouns.has(bi.noun), `${name}: node gate — ${bi.noun} twice on the page`);
    nouns.add(bi.noun);
    const f = familyOf(GLOBAL, bi.noun);
    if (f !== null) { ok(!fams.has(f), `${name}: node gate — two items of family ${f} on the page`); fams.add(f); }
    per[sense] = (per[sense] || 0) + 1;
  }
  return per;
}

/** The gate's own assertions per face (beyond verify + lints): stamps, floors, the stage vs the body, the pins, the node cross-checks with the bank. */
function assertFace(name, r, d, face, opts) {
  const { block, loc } = opts;
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.stamps && r.m.stamps.lcsLayout === face, `${name}: root layout stamp ${r.m.stamps && r.m.stamps.lcsLayout} ≠ ${face}`);
  ok(r.m.stage && r.m.stage.left >= r.m.body.left - 0.6 && r.m.stage.right <= r.m.body.right + 0.6, `${name}: stage outside the body column`);
  ok(r.m.stage && r.m.stage.top <= r.m.body.top + 8, `${name}: the stage floats ${Math.round(r.m.stage.top - r.m.body.top)} px under the body top`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: content reaches ${Math.round(r.m.lowest)} into the footer band at ${Math.round(r.m.foot)}`);
  for (const p of r.m.pins) ok(p.ok, `${name}: with the body pinned to ${p.budget} (${Math.round(p.bodyH)}): verify ${JSON.stringify(p.verify.slice(0, 3))}, inside ${p.inside} (stack ${Math.round(p.stack)})`);
  const F = r.m.face;
  let note = '';
  if (face === 'sort') {
    const want = SENSES.reduce((n, s) => n + (s === 'smell' ? Math.min(d.perBin, 2) : d.perBin), 0);
    ok(F.tiles.length === want, `${name}: ${F.tiles.length} tiles ≠ ${want}`);
    ok(F.tiles.every((t) => Math.abs(t.px - d.iconPx) < 0.6) && d.iconPx >= 44, `${name}: tile pictures ${JSON.stringify(F.tiles.map((t) => Math.round(t.px)))} ≠ ${d.iconPx} (≥ 44)`);
    ok(F.bins.length === 5 && F.bins.every((b) => b.organPx >= 44 - 0.6 && b.organPx <= 44.6), `${name}: bin organs ${JSON.stringify(F.bins.map((b) => Math.round(b.organPx)))} ≠ 44 (the nose ruling: never below 44)`);
    ok(F.bins.every((b) => b.pillRects === 1), `${name}: a pill wraps`);
    ok(F.bins.map((b) => b.sense).join() !== 'see,hear,smell,taste,touch', `${name}: bins in the canonical order`);
    for (const b of F.bins) {
      ok(b.pill === TYPE._verb(block, loc, b.sense), `${name}: node gate — pill "${b.pill}" ≠ verbs.${b.sense} "${TYPE._verb(block, loc, b.sense)}"`);
      ok(b.organ === TYPE._organOf(block, loc, b.sense), `${name}: node gate — bin organ ${b.organ} ≠ _organOf(${b.sense})`);
      ok(Math.abs(b.h - 185) < 0.6, `${name}: bin ${Math.round(b.h)} ≠ 185`);
    }
    const per = pageRule(name, F.tiles, d, block, loc);
    for (const [s, c] of Object.entries(per)) ok(c <= d.maxPerSense, `${name}: node gate — ${c} tiles of ${s} > maxPerSense ${d.maxPerSense}`);
    ok(Math.abs(F.zoneBlock - d.zone) < 0.6, `${name}: zone block ${Math.round(F.zoneBlock)} ≠ config ${d.zone}`);
    ok(F.zone >= 200 && F.zone <= 266, `${name}: dot-to-pill zone ${Math.round(F.zone)} outside 200..266 (above = SPARSE)`);
    ok(F.stageH >= 630, `${name}: stage ${Math.round(F.stageH)} < 630 (sparse)`);
    ok(F.slack <= 180 && F.slack >= -0.6, `${name}: slack under the bins ${Math.round(F.slack)} (> 180 = sparse)`);
    note = `zone ${Math.round(F.zone)} stageH ${Math.round(F.stageH)} bins ${F.bins.map((b) => b.pill).join('/')}`;
  } else if (face === 'which') {
    ok(F.rows.length === d.items, `${name}: ${F.rows.length} rows ≠ ${d.items}`);
    ok(F.rows.every((x) => Math.abs(x.picPx - d.pic) < 0.6) && d.pic >= 44, `${name}: object pictures ${JSON.stringify(F.rows.map((x) => Math.round(x.picPx)))} ≠ ${d.pic}`);
    ok(F.rows.every((x) => x.chips.length === 5 && x.chips.every((c) => Math.abs(c.px - d.chipPx) < 0.6 && Math.abs(c.tile - d.tile) < 0.6)) && d.chipPx >= 44, `${name}: chips not 5 x (${d.tile} tile / ${d.chipPx} picture)`);
    ok(F.rows.every((x) => x.chipOrder === d.chipOrder), `${name}: chip-order stamps ≠ ${d.chipOrder}`);
    for (const x of F.rows) {
      const answer = x.chips.filter((c) => c.organ === TYPE._organOf(block, loc, x.sense));
      ok(answer.length === 1, `${name}: node gate — ${answer.length} chips === _organOf(${x.sense}) on the ${x.item} row`);
      if (d.chipOrder === 'fixed') ok(x.chips.map((c) => c.organ).join() === C4.ORGANS.map((o) => TYPE._organOf(block, loc, o.sense)).join(), `${name}: node gate — strip ${x.chips.map((c) => c.organ).join(',')} is not the canonical order`);
      ok(x.objH / x.h >= 0.7, `${name}: object ${Math.round(x.objH)} in a ${Math.round(x.h)} row (< 0.7 sparse)`);
    }
    const per = pageRule(name, F.rows, d, block, loc);
    const counts = SENSES.map((s) => per[s] || 0).sort().join(',');
    ok(counts === '1,1,2,2,2', `${name}: node gate — sense counts ${counts} ≠ 1,1,2,2,2`);
    ok(Math.abs(r.m.stage.bottom - r.m.body.bottom) <= 2, `${name}: the grid does not fill the body (sparse)`);
    note = `rows ${F.rows.map((x) => Math.round(x.h)).join('/')} senses ${F.rows.map((x) => x.sense).join(',')}`;
  } else if (face === 'odd') {
    ok(F.cards.length === d.rows, `${name}: ${F.cards.length} rows ≠ ${d.rows}`);
    const all = F.cards.flatMap((c) => c.items);
    ok(all.every((it) => it.px >= d.pic - 0.6 && it.box >= d.box - 0.6), `${name}: a picture / box under the floors ${d.pic} / ${d.box}: ${JSON.stringify(all.map((it) => Math.round(it.px)))}`);
    ok(all.every((it) => it.box <= (d.boxMax || 120) + 0.6), `${name}: a box over boxMax ${d.boxMax || 120}`);
    ok(F.cards.every((c) => c.items.filter((it) => it.odd).length === 1 && c.items.length === d.items), `${name}: rows are not ${d.items} pictures with one intruder`);
    const got = {}; F.cards.forEach((c) => { got[c.sense] = (got[c.sense] || 0) + 1; });
    ok(JSON.stringify(Object.entries(got).sort()) === JSON.stringify(Object.entries(d.majorityRows).sort()), `${name}: node gate — row senses ${JSON.stringify(got)} ≠ majorityRows ${JSON.stringify(d.majorityRows)}`);
    const per = pageRule(name, all, d, block, loc);
    void per;
    const oddPer = {}; all.filter((it) => it.odd).forEach((it) => { oddPer[it.sense] = (oddPer[it.sense] || 0) + 1; });
    for (const [s, c] of Object.entries(oddPer)) ok(c <= d.maxPerSense, `${name}: node gate — ${c} intruders of ${s} > maxPerSense ${d.maxPerSense}`);
    for (const c of F.cards) ok(c.items.every((it) => it.odd ? it.sense !== c.sense : it.sense === c.sense), `${name}: node gate — a ${c.sense} row's senses ${c.items.map((it) => it.sense).join(',')}`);
    ok(F.cards.every((c) => c.items.every((it) => it.px / c.h >= 0.5)), `${name}: a picture under half its card height (sparse): ${JSON.stringify(F.cards.map((c) => [Math.round(c.h), Math.round(c.items[0].px)]))}`);
    ok(Math.abs(r.m.stage.bottom - r.m.body.bottom) <= 2, `${name}: the card grid does not fill the body (sparse)`);
    note = `cards ${F.cards.map((c) => Math.round(c.h)).join('/')} pics ${Math.round(all[0].px)} rows ${F.cards.map((c) => c.sense).join(',')} odd cols ${F.cards.map((c) => c.items.findIndex((it) => it.odd) + 1).join('')}`;
  } else if (face === 'label') {
    ok(F.rows.length === d.organs, `${name}: ${F.rows.length} rows ≠ ${d.organs}`);
    ok(F.rows.every((x) => Math.abs(x.organPx - d.organPx) < 0.6) && d.organPx >= 44, `${name}: organ pictures ${JSON.stringify(F.rows.map((x) => Math.round(x.organPx)))} ≠ ${d.organPx}`);
    ok(+r.m.stamps.lcsGlyphH === d.glyphH && d.glyphH >= 36, `${name}: glyphH ${r.m.stamps.lcsGlyphH} ≠ ${d.glyphH} (≥ 36)`);
    ok(F.rows.every((x) => x.writingRows === 1 && x.starters === (d.starter ? 1 : 0) && (d.starter || x.text === '')), `${name}: a lane is not one empty writing row`);
    ok(F.rows.every((x) => x.h >= (d.rowMin || 112) - 0.6 && x.h <= (d.rowMax || 128) + 0.6), `${name}: rows ${JSON.stringify(F.rows.map((x) => Math.round(x.h)))} outside ${d.rowMin || 112}..${d.rowMax || 128}`);
    const organs = F.rows.map((x) => x.organ);
    ok([...organs].sort().join() === SENSES.map((s) => TYPE._organOf(block, loc, s)).sort().join(), `${name}: node gate — organs ${organs.join(',')} are not the five`);
    const verbs = SENSES.map((s) => TYPE._verb(block, loc, s));
    if (d.bank) {
      ok([...F.bank].sort().join('|') === [...verbs].sort().join('|'), `${name}: node gate — bank ${F.bank.join('/')} ≠ verbs ${verbs.join('/')}`);
      const rowVerbs = organs.map((o) => TYPE._verb(block, loc, C4.SENSE_OF[o] || 'taste'));
      const diff = rowVerbs.filter((v, i) => F.bank[i] !== v).length;
      ok(diff >= 3, `${name}: node gate — the bank order ${F.bank.join('/')} differs from the row order ${rowVerbs.join('/')} in only ${diff} positions (order leak)`);
      ok(F.bankH >= 50 && F.bankH <= 70, `${name}: bank ${Math.round(F.bankH)} px (one row = 60)`);
    } else ok(F.bank.length === 0, `${name}: a bank at bank:false`);
    ok(F.slack <= 180 && F.slack >= -0.6, `${name}: slack under the last row ${Math.round(F.slack)} (> 180 = sparse)`);
    note = `rows ${F.rows.map((x) => Math.round(x.h)).join('/')} organs ${organs.join(',')} bank ${F.bank.join('/')} slack ${Math.round(F.slack)}`;
  } else if (face === 'write') {
    ok(F.lanes.length === 5, `${name}: ${F.lanes.length} lanes`);
    ok(F.lanes.every((l) => Math.abs(l.organPx - d.organPx) < 0.6) && d.organPx >= 44, `${name}: organ pictures ${JSON.stringify(F.lanes.map((l) => Math.round(l.organPx)))} ≠ ${d.organPx}`);
    ok(F.lanes.map((l) => l.organ).join() === SENSES.map((s) => TYPE._organOf(block, loc, s)).join(), `${name}: lanes ${F.lanes.map((l) => l.organ).join(',')} are not the organs in the senses order`);
    ok(+r.m.stamps.lcsGlyphH === d.glyphH && d.glyphH >= 26, `${name}: glyphH ${r.m.stamps.lcsGlyphH}`);
    for (const l of F.lanes) {
      const s = C4.SENSE_OF[l.organ] || 'taste';
      ok(l.starter === TYPE._starter(block, loc, s), `${name}: node gate — lane ${l.organ} starter "${l.starter}" ≠ starters.${s} "${TYPE._starter(block, loc, s)}"`);
      ok(l.rows === d.rowsPerSense, `${name}: lane ${l.organ} ${l.rows} rows ≠ ${d.rowsPerSense}`);
      ok(Math.abs(l.starterPx - STARTER_PX) < 0.01, `${name}: lane ${l.organ} starter sized ${l.starterPx} ≠ starterFontPx ${STARTER_PX} (the G1-306 class: a starter sized by a guessed factor of glyphH)`);
      ok(l.starterW <= 0.5 * l.rowW + 0.6, `${name}: lane ${l.organ} starter "${l.starter}" ${Math.round(l.starterW)} px > 0.5 x the ${Math.round(l.rowW)} row (gate D)`);
      ok(l.draws === (d.draw ? 1 : 0), `${name}: lane ${l.organ} ${l.draws} draw boxes`);
      ok(l.h >= (d.rowMin || 126) - 0.6 && l.h <= (d.rowMax || 140) + 0.6, `${name}: lane ${l.organ} ${Math.round(l.h)} outside ${d.rowMin || 126}..${d.rowMax || 140}`);
    }
    ok(F.slack <= 180 && F.slack >= -0.6, `${name}: slack under the last lane ${Math.round(F.slack)} (> 180 = sparse)`);
    note = `lanes ${F.lanes.map((l) => Math.round(l.h)).join('/')} starters ${F.lanes.map((l) => Math.round(l.starterW)).join('/')} px slack ${Math.round(F.slack)}`;
  }
  return { body: Math.round(r.m.bodyH), stage: r.m.stage ? Math.round(r.m.stage.h) : 0, lowest: Math.round(r.m.lowest), foot: Math.round(r.m.foot), slack: F.slack == null ? '-' : Math.round(F.slack), note };
}
/** A face type built over an injected bank whose bodyHtml a poison then mutates. */
function faceType(face, mutate, block) {
  const spec = faceRenders[face].spec;
  return Object.assign({}, spec, { build(args, ctx) { const out = spec._buildWith({ global: GLOBAL, block: block || en_ }, args, ctx); if (mutate) out.bodyHtml = mutate(out.bodyHtml, out.meta); return out; } });
}
let en_ = null;

/* ------------------------------------------------------------------ main */
async function main() {
  const mod = bankModule('five-senses');
  const locales = Object.keys(mod);
  const en = mod.en;
  en_ = en;
  let killed = 0;
  const TOTAL = 38;   // 20 base + 18 face poisons
  // 1. bank (control)
  {
    const f = validateGlobal(GLOBAL);
    ok(f.length === 0, `global: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`global: ${GLOBAL.items.length} items = ${GLOBAL.items.filter((i) => i.confidence === 'strong').length} strong + ${GLOBAL.items.filter((i) => i.confidence === 'signed').length} signed; per sense ` +
      SENSES.map((s) => `${s} ${GLOBAL.items.filter((i) => i.sense === s && i.confidence === 'strong').length}/${coOccurrable(GLOBAL, s).length} co`).join(' · '));
  }
  for (const loc of locales) {
    const f = validateBank(mod[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`bank ${loc}: verbs ${SENSES.map((s) => mod[loc].verbs[s]).join(' / ')}; starters ${SENSES.map((s) => JSON.stringify(mod[loc].starters[s])).join(' ')}; refuse ${JSON.stringify(mod[loc].refuse)}; strand "${mod[loc].strand}"`);
  }

  // 2. renders
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    for (const loc of locales) {
      for (const d of [1, 2, 3]) {
        const strings = mod[loc].strings[BASE_ID];
        const r = await renderWith(page, TYPE, { difficulty: d, locale: loc, baseName: `K-355-gate-d${d}-${loc}`, strings });
        const s = assertRender(`d${d} ${loc}`, r, TYPE.difficulty[d], { block: mod[loc], loc });
        pngs.push(r.png);
        console.log(`render d${d} ${loc}: verify ${r.verify.length} lints ${r.lints.length} icons ${s.minIcon} zone ${s.zone} body ${s.body} stack ${s.stack} (fits 722 ${r.m.stacks[0].fits} / 677 ${r.m.stacks[1].fits})`);
      }
      // rules 5 / 7 widths with the shell fonts (the last render's page carries them)
      const w = await measureLiterals(page, mod[loc]);
      assertWidths(`widths ${loc}`, mod[loc], w);
      console.log(`widths ${loc}: verbs ${SENSES.map((s) => Math.round(w.verbs[s])).join('/')} (+${PILL_PAD} <= ${PILL_MAX}); starters ${SENSES.map((s) => Math.round(w.starters[s])).join('/')} (<= ${STARTER_MAX} at ${STARTER_PX} px)`);
    }
    // the long-chrome fixture: a 3-line de title + a 150-char instruction (the tallest chrome the 70 / 150 limits produce)
    const LONG = { title: 'Die fünf Sinne: Verbinde jedes Bild mit dem Körperteil, mit dem du es', instruction: 'Zeichne von jedem Bild eine Linie zu dem Körperteil, mit dem du es hörst, siehst, riechst, schmeckst oder fühlst. Jedes Bild bekommt genau eine Linie zu genau einem Teil.'.slice(0, 150) };
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, locale: 'en', baseName: `K-355-gate-d${d}-en-longchrome`, strings: LONG });
      const s = assertRender(`d${d} long chrome`, r, TYPE.difficulty[d], { block: en, loc: 'en' });
      pngs.push(r.png);
      console.log(`render d${d} long chrome (title ${[...LONG.title].length} / instruction ${[...LONG.instruction].length} chars): verify ${r.verify.length} lints ${r.lints.length} body ${s.body} zone ${s.zone} stack ${s.stack}`);
    }

    // 3. seed sweep (build only)
    if (!QUICK) {
      const sets = new Set(), orders = new Set();
      for (let k = 1; k <= 20; k++) {
        const rng = makeRng(instanceSeed({ typeId: BASE_ID, theme: null, difficulty: 2, seedEpoch: k }));
        const b = TYPE.build({ theme: null, difficulty: 2, locale: 'en' }, { rng });
        ok(new Set(b.meta.senses).size === 5, `sweep seed ${k}: senses ${b.meta.senses.join(',')} are not the five`);
        ok(!b.meta.order.some((v, i) => v === i), `sweep seed ${k}: an organ sits straight across`);
        const fams = b.meta.pairs.map((p) => familyOf(GLOBAL, p.split('/')[1].split('→')[0])).filter((f) => f !== null);
        ok(new Set(fams).size === fams.length, `sweep seed ${k}: two items of one family`);
        sets.add(b.meta.pairs.map((p) => p.split('→')[0]).sort().join(','));
        orders.add(b.meta.organs.join(','));
      }
      ok(sets.size >= 2, `sweep: only ${sets.size} distinct item sets over 20 seeds`);
      ok(orders.size >= 2, `sweep: only ${orders.size} distinct organ orders over 20 seeds`);
      console.log(`sweep: 20 seeds clean, ${sets.size} distinct item sets, ${orders.size} distinct organ orders`);
    }


    // 5. THE FACES (Phase 2): rows module ≡ emitted spec ≡ bank strings; each face rendered at d2 en, under the
    //    long de chrome, and with the body PINNED to 722 / 677 (verify re-run on the pinned layout); floors; node gates
    for (const row of FACE_ROWS) {
      const [dir, id, slug, , src, over, title, instr, extra] = row;
      const face = FACE_IDS[id];
      const spec = require(path.join(__dirname, '..', 'types', dir, `${id}-${slug}.js`));
      const d = spec.difficulty[2];
      ok(spec.id === id && spec.gradeBand === 'G1' && extra && extra.gradeBand === 'G1', `${id}: emitted spec id / gradeBand (${spec.id} / ${spec.gradeBand})`);
      ok(spec.themeAxis && spec.themeAxis.applicable === false, `${id}: not themeless`);
      ok(d.layout === face && over.layout === face, `${id}: layout ${d.layout} / ${over.layout} ≠ ${face}`);
      ok(JSON.stringify(d) === JSON.stringify({ ...TYPE.difficulty[src], ...over }), `${id}: the emitted d2 config is not base.d${src} + the row's overrides`);
      ok(JSON.stringify(spec.difficulty[1]) === JSON.stringify(d) && JSON.stringify(spec.difficulty[3]) === JSON.stringify(d), `${id}: the three levels are not one config`);
      ok(spec.i18n.en.title === title && en.strings[id] && en.strings[id].title === title, `${id}: title is not ONE source (spec "${spec.i18n.en.title}" / row "${title}" / bank "${en.strings[id] && en.strings[id].title}")`);
      ok(spec.i18n.en.instruction === instr && en.strings[id] && en.strings[id].instruction === instr, `${id}: instruction is not ONE source`);
      ok(!/worksheet/i.test(title) && [...instr].length <= 150, `${id}: title carries "worksheet" or the instruction > 150`);
      ok(!/[{}]/.test(title + instr), `${id}: a slot brace in the strings`);
      // the en render (one-line chrome) + the long de chrome + the two pins
      const r1 = await renderFace(page, spec, { locale: 'en', baseName: `${id}-gate-d2-en`, strings: en.strings[id] });
      const s1 = assertFace(`${id} ${face} en`, r1, d, face, { block: en, loc: 'en' });
      pngs.push(r1.png);
      console.log(`render ${id} ${face}: verify ${r1.verify.length} lints ${r1.lints.length} body ${s1.body} stage ${s1.stage} lowest ${s1.lowest} vs foot ${s1.foot} slack ${s1.slack} ${s1.note} (pins 722 ${r1.m.pins[0].ok ? 'ok' : 'FAIL'} / 677 ${r1.m.pins[1].ok ? 'ok' : 'FAIL'})`);
      const r2 = await renderFace(page, spec, { locale: 'en', baseName: `${id}-gate-d2-en-longchrome`, strings: LONG_FACE });
      const s2 = assertFace(`${id} ${face} long chrome`, r2, d, face, { block: en, loc: 'en' });
      pngs.push(r2.png);
      console.log(`render ${id} ${face} long chrome: verify ${r2.verify.length} lints ${r2.lints.length} body ${s2.body} stage ${s2.stage} slack ${s2.slack} ${s2.note} (pins 722 ${r2.m.pins[0].ok ? 'ok' : 'FAIL'} / 677 ${r2.m.pins[1].ok ? 'ok' : 'FAIL'})`);
      faceRenders[face] = { spec, d, r: r1 };
    }
    // every picture the five faces keep — and every bank item + organ — exists ON DISK in the served library as <theme>/<noun>@2x.webp
    {
      const refs = new Set(GLOBAL.items.map((it) => it.theme + '/' + it.noun).concat([...ORGANS, 'mouth'].map((o) => ORGAN_THEME + '/' + o)));
      const F = faceRenders;
      F.sort.r.m.face.tiles.forEach((t) => refs.add(t.item));
      F.which.r.m.face.rows.forEach((x) => refs.add(x.item));
      F.odd.r.m.face.cards.forEach((c) => c.items.forEach((it) => refs.add(it.item)));
      let missing = 0;
      for (const ref of refs) { const [theme, noun] = ref.split('/'); const p = path.join(WEBP_THEMES, theme, noun + '@2x.webp'); if (!ok(fs.existsSync(p), `picture on disk: ${p} is absent`)) missing++; }
      console.log(`pictures on disk: ${refs.size} refs (45 bank items + 6 organs + every face picture) checked as <theme>/<noun>@2x.webp under image-library-webp/themes, ${missing} missing`);
    }
    // the F5 starters through the shell font at the stamped size (rule 7 / gate D on the REAL row)
    {
      const st = faceRenders.write.r.m.face.lanes;
      for (const l of st) {
        ok(Math.abs(l.starterPx - STARTER_PX) < 0.01, `G1-361: lane ${l.organ} starter sized ${l.starterPx} ≠ starterFontPx ${STARTER_PX}`);
        ok(l.starterW <= 0.5 * l.rowW + 0.6, `G1-361: lane ${l.organ} starter "${l.starter}" ${Math.round(l.starterW)} px > 0.5 x the ${Math.round(l.rowW)} row (gate D)`);
      }
      console.log(`G1-361 starters at ${STARTER_PX} px: ` + st.map((l) => `${l.organ} "${l.starter}" ${Math.round(l.starterW)}/${Math.round(l.rowW)}`).join(' · '));
    }

    // 6. face seed sweep (build only; skipped by --quick)
    if (!QUICK) {
      const seen = { sort: new Set(), sortSmell: new Set(), which: new Set(), odd: new Set(), oddOrder: new Set(), label: new Set() };
      for (let k = 1; k <= 20; k++) {
        for (const face of Object.keys(faceRenders)) {
          const { spec } = faceRenders[face];
          const rng = makeRng(instanceSeed({ typeId: spec.id, theme: null, difficulty: 2, seedEpoch: k }));
          const b = spec.build({ theme: null, difficulty: 2, locale: 'en' }, { rng });
          const items = face === 'odd' ? b.meta.items.flat() : (b.meta.items || []);
          const nouns = items.map((x) => x.split('/')[1]);
          ok(new Set(nouns).size === nouns.length, `sweep ${face} seed ${k}: a picture twice`);
          const fams = nouns.map((n) => familyOf(GLOBAL, n)).filter((f) => f !== null);
          ok(new Set(fams).size === fams.length, `sweep ${face} seed ${k}: two items of one family`);
          if (face === 'sort') { seen.sort.add(nouns.slice().sort().join(',')); seen.sortSmell.add(items.filter((x) => GLOBAL.items.find((it) => it.theme + '/' + it.noun === x && it.sense === 'smell')).sort().join('+')); ok(b.meta.bins.join() !== 'see,hear,smell,taste,touch', `sweep sort seed ${k}: canonical bin order`); }
          if (face === 'which') { seen.which.add(b.meta.senses.join(',')); const c = Object.values(b.meta.counts).sort().join(','); ok(c === '1,1,2,2,2', `sweep which seed ${k}: counts ${c}`); }
          if (face === 'odd') { seen.odd.add(b.meta.oddCols.join(',')); seen.oddOrder.add(b.meta.rowSenses.join(',')); const per = {}; b.meta.odds.forEach((x) => { const it = GLOBAL.items.find((i) => i.theme + '/' + i.noun === x); per[it.sense] = (per[it.sense] || 0) + 1; }); ok(Object.values(per).every((n) => n <= 2), `sweep odd seed ${k}: an intruder sense > maxPerSense`); }
          if (face === 'label') { seen.label.add(b.meta.bank.join(',')); const rowVerbs = b.meta.senses.map((s) => en.verbs[s]); ok(rowVerbs.filter((v, i) => b.meta.bank[i] === v).length <= 2, `sweep label seed ${k}: the bank follows the row order`); }
          if (face === 'write') ok(b.meta.senses.join() === SENSES.join(), `sweep write seed ${k}: lanes not in the senses order`);
        }
      }
      ok(seen.sort.size >= 2, `sweep sort: ${seen.sort.size} distinct item sets`);
      ok(seen.sortSmell.size >= 3, `sweep sort: the smell bin only varies over ${seen.sortSmell.size} pairs (11 legal)`);
      ok(seen.which.size >= 2, `sweep which: ${seen.which.size} distinct answer sequences`);
      ok(seen.odd.size >= 2 && seen.oddOrder.size >= 2, `sweep odd: ${seen.odd.size} odd-column vectors / ${seen.oddOrder.size} row orders`);
      ok(seen.label.size >= 2, `sweep label: ${seen.label.size} distinct bank orders`);
      console.log(`sweep faces: sort ${seen.sort.size} item sets (smell bin ${seen.sortSmell.size} pairs) · which ${seen.which.size} answer sequences · odd ${seen.odd.size} column vectors / ${seen.oddOrder.size} row orders · label ${seen.label.size} bank orders`);
    }

    // 4. poisons
    // P1 — weather/sun as a see item (K-211's item)
    { const g = clone(GLOBAL); g.items.push({ theme: 'weather', noun: 'sun', sense: 'see', confidence: 'strong', picOpened: true });
      if (judge('P1', validateGlobal(g), /weather\/sun: is an item of a neighbour bank/)) killed++; }
    // P2 — At the Supermarket/cheese as smell (G1-207's item)
    { const g = clone(GLOBAL); g.items.push({ theme: 'At the Supermarket', noun: 'cheese', sense: 'smell', confidence: 'strong', picOpened: true });
      if (judge('P2', validateGlobal(g), /cheese: is an item of a neighbour bank/)) killed++; }
    // P3 — toys/teddy_bear as touch (vocabKey null)
    { const g = clone(GLOBAL); g.items.push({ theme: 'toys', noun: 'teddy_bear', sense: 'touch', confidence: 'strong', picOpened: true });
      if (judge('P3', validateGlobal(g), /teddy_bear: vocabKey null/)) killed++; }
    // P4 — organOf.touch = 'skin'
    { const g = clone(GLOBAL); g.organOf.touch = 'skin';
      if (judge('P4', validateGlobal(g), /organOf\.touch = "skin" is not one of/)) killed++; }
    // P5 — majorityRows += smell
    { const g = clone(GLOBAL); g.pageRules.majorityRows.smell = 1;
      if (judge('P5', validateGlobal(g), /majorityRows\.smell: 3 co-occurrable strong items < 6/)) killed++; }
    // P6 — de verbs.hear = 'Ohr' (the organ noun) FAILS; de 'hören' PASSES; de 'Gehör' FIRES (rule 6)
    { const de = blockFor(en, 'de', { verbs: { hear: 'hören', see: 'sehen', smell: 'riechen', taste: 'schmecken', touch: 'fühlen' }, starters: { hear: 'Ich höre ...', see: 'Ich sehe ...', smell: 'Ich rieche ...', taste: 'Ich schmecke ...', touch: 'Ich fühle ...' }, strand: 'Sachunterricht' });
      const a = judge('P6 Ohr', validateBank(blockFor(de, 'de', { verbs: { ...de.verbs, hear: 'Ohr' } }), 'de'), /verbs\.hear "Ohr" equals the vocab singular or plural of an organ/);
      const b = control('P6 hören', validateBank(de, 'de'));
      const c = judge('P6 Gehör', validateBank(blockFor(de, 'de', { verbs: { ...de.verbs, hear: 'Gehör' } }), 'de'), /"Gehör" is a sense NOUN/);
      if (a && b && c) killed++;
      // P9 — de starters.taste = 'Ich kann schmecken: ' → rule 7 (327 > 280, measured with the shell font); 'Ich schmecke ...' PASSES
      const bad = blockFor(de, 'de', { starters: { ...de.starters, taste: 'Ich kann schmecken: ' } });
      const w1 = await measureLiterals(page, bad), w2 = await measureLiterals(page, de);
      const f1 = collect(() => assertWidths('P9', bad, w1)), f2 = collect(() => assertWidths('P9 control', de, w2));
      const p9 = judge('P9', f1, /"Ich kann schmecken: " \d+(\.\d+)? px > 280/, `measured ${w1.starters.taste.toFixed(1)} px`);
      const p9c = control('P9 Ich schmecke', f2);
      if (p9 && p9c) killed++;
    }
    // P7 — fr verbs.touch = 'sentir' MUST_FIRE; 'toucher' PASSES
    { const fr = blockFor(en, 'fr', { verbs: { hear: 'entendre', see: 'voir', smell: 'sentir', taste: 'goûter', touch: 'toucher' }, starters: { hear: "J'entends ...", see: 'Je vois ...', smell: 'Je sens ...', taste: 'Je goûte ...', touch: 'Je touche ...' }, strand: 'Questionner le monde' });
      const a = judge('P7 sentir', validateBank(blockFor(fr, 'fr', { verbs: { ...fr.verbs, touch: 'sentir' } }), 'fr'), /verbs\.touch = "sentir"/);
      const b = control('P7 toucher', validateBank(fr, 'fr'));
      if (a && b) killed++; }
    // P8 — it starters.hear = 'Sento ...' MUST_FIRE; 'Ascolto ...' PASSES
    { const it = blockFor(en, 'it', { verbs: { hear: 'ascoltare', see: 'vedere', smell: 'annusare', taste: 'assaggiare', touch: 'toccare' }, starters: { hear: 'Ascolto ...', see: 'Vedo ...', smell: 'Annuso ...', taste: 'Assaggio ...', touch: 'Tocco ...' }, strand: 'Scienze' });
      const a = judge('P8 Sento', validateBank(blockFor(it, 'it', { starters: { ...it.starters, hear: 'Sento ...' } }), 'it'), /literal "Sento \.\.\." prints sentire \/ sento \/ senti/);
      const b = control('P8 Ascolto', validateBank(it, 'it'));
      if (a && b) killed++;
      // rule 6 pt: 'sentir' for smell FIRES, 'cheirar' PASSES
      const pt = blockFor(en, 'pt', { verbs: { hear: 'ouvir', see: 'ver', smell: 'cheirar', taste: 'provar', touch: 'tocar' }, starters: { hear: 'Eu ouço ...', see: 'Eu vejo ...', smell: 'Eu cheiro ...', taste: 'Eu provo ...', touch: 'Eu toco ...' }, strand: 'Ciências' });
      const c = judge('P8b pt sentir', validateBank(blockFor(pt, 'pt', { verbs: { ...pt.verbs, smell: 'sentir' } }), 'pt'), /verbs\.smell = "sentir"/);
      const d = control('P8b pt cheirar', validateBank(pt, 'pt'));
      if (c && d) killed++; }
    // P10 — fi starters.hear = 'Kuulen {noun}' → rule 7 (slot); P12 — fi base title 'Aistit' → rule 9
    { const fi = blockFor(en, 'fi', { verbs: { hear: 'kuulla', see: 'nähdä', smell: 'haistaa', taste: 'maistaa', touch: 'tuntea' }, starters: { hear: 'Kuulen ...', see: 'Näen ...', smell: 'Haistan ...', taste: 'Maistan ...', touch: 'Tunnen ...' }, strand: 'Ympäristöoppi' });
      const c0 = control('P10/P12 fi', validateBank(fi, 'fi'));
      const a = judge('P10', validateBank(blockFor(fi, 'fi', { starters: { ...fi.starters, hear: 'Kuulen {noun}' } }), 'fi'), /starters\.hear "Kuulen \{noun\}" carries a \{slot\}/);
      const s2 = clone(fi.strings); s2[BASE_ID] = { title: 'Aistit', instruction: fi.strings[BASE_ID].instruction };
      const b = judge('P12', validateBank(blockFor(fi, 'fi', { strings: s2 }), 'fi'), /fi title "Aistit" heads with the bare "Aistit"/);
      if (c0 && a) killed++;
      if (c0 && b) killed++; }
    // P11 — nl F3 title 'Wat hoort er niet bij?' → rule 9
    { const nl = blockFor(en, 'nl', { verbs: { hear: 'horen', see: 'zien', smell: 'ruiken', taste: 'proeven', touch: 'voelen' }, starters: { hear: 'Ik hoor ...', see: 'Ik zie ...', smell: 'Ik ruik ...', taste: 'Ik proef ...', touch: 'Ik voel ...' }, strand: 'Oriëntatie op jezelf en de wereld' });
      const s2 = clone(nl.strings); s2['G1-359'] = { title: 'De vijf zintuigen: welk zintuig hoort er niet bij?', instruction: nl.strings['G1-359'].instruction };
      const c0 = control('P11 nl', validateBank(blockFor(nl, 'nl', { strings: s2 }), 'nl'));
      const s3 = clone(s2); s3['G1-359'].title = 'Wat hoort er niet bij?';
      const a = judge('P11', validateBank(blockFor(nl, 'nl', { strings: s3 }), 'nl'), /nl F3 title "Wat hoort er niet bij\?" must contain "zintuig"/);
      if (c0 && a) killed++; }
    // P13 — sv strings without the F4 id and no refuse → rule 10; WITH refuse:['label'] PASSES
    { const sv = blockFor(en, 'sv', { verbs: { hear: 'höra', see: 'se', smell: 'lukta', taste: 'smaka', touch: 'känna' }, starters: { hear: 'Jag hör ...', see: 'Jag ser ...', smell: 'Jag luktar ...', taste: 'Jag smakar ...', touch: 'Jag känner ...' }, strand: 'Naturorienterande ämnen' });
      const s2 = clone(sv.strings); delete s2['G1-360'];
      const a = judge('P13', validateBank(blockFor(sv, 'sv', { strings: s2 }), 'sv'), /strings G1-360 \(label\) missing and refuse does not name "label"/);
      const b = control('P13 with refuse', validateBank(blockFor(sv, 'sv', { strings: s2, refuse: ['label'] }), 'sv'));
      if (a && b) killed++; }
    // P14 — a second `rock` item (beach) → rule 3
    { const g = clone(GLOBAL); g.items.push({ theme: 'beach', noun: 'rock', sense: 'touch', confidence: 'strong', picOpened: true });
      if (judge('P14', validateGlobal(g), /beach\/rock: noun appears in two items/)) killed++; }
    // P15 — d3 (organWords) with a block missing verbs → the spec REFUSES (throw)
    { const b = clone(en); delete b.verbs.smell;
      let refused = [];
      try { TYPE._buildWith({ global: GLOBAL, block: b }, { difficulty: 3, locale: 'en' }, { rng: makeRng('p15') }); } catch (e) { refused = [e.message]; }
      if (judge('P15', refused, /K-355 en: no verb for smell \(refuse\)/, 'the spec refused (throw), no en fallback')) killed++; }
    // P16 — a themeless pool emptied by the family fence → the spec REFUSES
    { const g = clone(GLOBAL); g.items = g.items.filter((it) => it.sense !== 'touch');
      let refused = [];
      try { TYPE._buildWith({ global: g, block: en }, { difficulty: 2, locale: 'en' }, { rng: makeRng('p16') }); } catch (e) { refused = [e.message]; }
      if (judge('P16', refused, /K-355 en touch: no admitted item left/, 'refuse, never a filler')) killed++; }
    // PR1 — the organ column with a row straight across (built past the spec's derangement guard)
    { const t = Object.assign({}, TYPE, { build(args, ctx) {
        const out = TYPE._buildWith({ global: GLOBAL, block: en }, args, ctx);
        // rebuild the organ column in the object order
        const rows = out.meta.senses.map((s) => ({ left: { sense: s }, right: { organ: ORGAN_OF[s], sense: s, src: fileUri(ORGAN_THEME, ORGAN_OF[s]) } }));
        const organs = rows.map((p) => `<div class="ws-match-item ws-match-item--plain" style="width:170px;height:122px" data-lcs-organ="${p.right.organ}" data-lcs-sense="${p.right.sense}"><img class="ws-icon" src="${p.right.src}" alt="" style="width:92px;height:92px"><span class="ws-match-dot ws-match-dot--left"></span></div>`).join('');
        out.bodyHtml = out.bodyHtml.replace(/<div class="ws-match-col" data-lcs-col="organs">[\s\S]*?<\/div><\/div>$/, `<div class="ws-match-col" data-lcs-col="organs">${organs}</div></div>`);
        return out;
      } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-355-gate-poison-PR1', strings: en.strings[BASE_ID] });
      if (judge('PR1', r.verify, /sits straight across from its object/)) killed++; }
    // PR2 — two hear objects (the second object re-stamped + re-pictured as a drum)
    { const t = Object.assign({}, TYPE, { build(args, ctx) {
        const out = TYPE._buildWith({ global: GLOBAL, block: en }, args, ctx);
        const objs = [...out.bodyHtml.matchAll(/<div class="ws-match-item" style="[^"]*" data-lcs-item="([^"]+)" data-lcs-sense="([^"]+)"><img class="ws-icon" src="([^"]+)"/g)];
        const victim = objs.find((m) => m[2] !== 'hear');
        if (!victim) throw new Error('PR2: no non-hear object to swap');
        const drum = objs.find((m) => m[1] === 'music/drum');
        const swapTo = drum ? 'music/guitar' : 'music/drum';
        out.bodyHtml = out.bodyHtml.replace(victim[0], victim[0].replace(`data-lcs-item="${victim[1]}" data-lcs-sense="${victim[2]}"`, `data-lcs-item="${swapTo}" data-lcs-sense="hear"`).replace(victim[3], fileUri('music', swapTo.split('/')[1])));
        return out;
      } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-355-gate-poison-PR2', strings: en.strings[BASE_ID] });
      if (judge('PR2', r.verify, /senses .* are not distinct/)) killed++; }
    // PR13 — the factory's 720 stack (items 132) under the 677 budget → the stack check overflows (it FITS the 722 stack, as the critic measured)
    { const r = await renderWith(page, factoryStackType(GLOBAL, en), { difficulty: 2, locale: 'en', baseName: 'K-355-gate-poison-PR13', strings: en.strings[BASE_ID] });
      const found = collect(() => assertRender('PR13', r, { ...TYPE.difficulty[2], itemH: 132 }, null));
      const s677 = r.m.stacks[1], s722 = r.m.stacks[0];
      if (judge('PR13', found, /overflows the 677 budget/, `items 132: stack ${Math.round(s677.stack)} px, 722 fits ${s722.fits}, 677 fits ${s677.fits}`)) killed++; }


    /* ---------------- face poisons (Phase 2): each FAILS for its OWN reason; the five d2 renders above are the controls */
    const faceD = (face) => faceRenders[face].d;
    const pvRender = async (name, face, mutate, block, strings) => renderFace(page, faceType(face, mutate, block), { locale: 'en', baseName: `K-355-gate-poison-${name}`, strings: strings || en.strings[Object.keys(FACE_IDS).find((k) => FACE_IDS[k] === face)] });
    // PR3 — F1 a pill labelled with the organ NOUN ("Nase") → the node gate "pill ≠ verb"
    { const r = await pvRender('PR3', 'sort', (h) => h.replace(/(<div class="ws-bin fs-bin"[^>]*data-lcs-bin="smell"><span class="fs-bin-label" data-lcs-bin-label>)[^<]+/, '$1Nase'));
      const found = collect(() => assertFace('PR3', r, faceD('sort'), 'sort', { block: en, loc: 'en' }));
      if (judge('PR3', found, /pill "Nase" ≠ verbs\.smell/)) killed++; }
    // PR4 — F1 two flower-family tiles (the smell tiles re-pictured as rose + lilac) → the family fence
    { const r = await pvRender('PR4', 'sort', (h) => { let i = 0; const subs = [['flowers/rose', 'rose'], ['flowers/lilac', 'lilac']];
        return h.replace(/<span class="fs-item" style="[^"]*" data-lcs-tile="smell" data-lcs-item="[^"]+"><img class="ws-icon" src="[^"]+"/g, (m) => { const [ref, noun] = subs[i++] || subs[1]; return m.replace(/data-lcs-item="[^"]+"/, `data-lcs-item="${ref}"`).replace(/src="[^"]+"/, `src="${fileUri('flowers', noun)}"`); }); });
      const found = collect(() => assertFace('PR4', r, faceD('sort'), 'sort', { block: en, loc: 'en' }));
      if (judge('PR4', found, /two items of family 0 on the page/)) killed++; }
    // PR12 — F1 the factory's flex-wrap strip: one row of ten tiles that wraps → verify "strip row wraps"
    { const r = await pvRender('PR12', 'sort', (h) => h.replace(/<\/div><div class="fs-row" data-lcs-strip-row="2" style="gap:12px">/, '').replace('<div class="fs-row" data-lcs-strip-row="1" style="gap:12px">', '<div class="fs-row" data-lcs-strip-row="1" style="gap:12px;flex-wrap:wrap">'));
      if (judge('PR12', r.verify, /strip row 1 wraps/)) killed++; }
    // PS1 — F1 the design's `space-between` zone (the K-357 SPARSE class): the zone block stretched to 425 → verify "zone > 266" + "not the stamped"
    { const r = await pvRender('PS1', 'sort', (h) => h.replace(/data-lcs-line-zone style="height:260px"/, 'data-lcs-line-zone style="height:425px"'));
      const a = judge('PS1 zone', r.verify, /dot-to-pill zone \d+ px > 266: the page reads SPARSE/);
      const b = judge('PS1 stamp', r.verify, /the line zone block is 425, not the stamped 260/);
      if (a && b) killed++; }
    // PR5 — F2 a row with 4 chips → verify "≠ 5 chips"
    { const r = await pvRender('PR5', 'which', (h) => h.replace(/<span class="fs-chip" data-lcs-chip="nose"[^>]*>[^<]*<img[^>]*><\/span>/, ''));
      if (judge('PR5', r.verify, /row 1: 4 chips ≠ 5 chips/)) killed++; }
    // PR6 — F2 the ear chip pre-ringed (a coral ring on one chip) → verify "chip pre-marked"
    { const r = await pvRender('PR6', 'which', (h) => h.replace(/(<span class="fs-chip" data-lcs-chip="ear" style="[^"]*)"/, '$1;border:3px solid #F2784B;border-radius:50%"'));
      if (judge('PR6', r.verify, /chip 2: chip pre-marked/)) killed++; }
    // PR11 — F2 `chipOrder` guard keys on the CONFIG: an unknown value REFUSES at build; d3's config re-pointed to level 2 builds SHUFFLED strips (control)
    { const spec = faceRenders.which.spec;
      let refused = [];
      const bad = Object.assign({}, spec, { difficulty: { 1: { ...spec.difficulty[2], chipOrder: 'random' }, 2: { ...spec.difficulty[2], chipOrder: 'random' }, 3: { ...spec.difficulty[2], chipOrder: 'random' } } });
      try { bad._buildWith({ global: GLOBAL, block: en }, { difficulty: 2, locale: 'en' }, { rng: makeRng('pr11') }); refused = []; } catch (e) { refused = [e.message]; }
      const a = judge('PR11 random', refused, /chipOrder "random" must be fixed \| shuffled \(the guard keys on the config\)/);
      const d3 = Object.assign({}, spec, { difficulty: { 1: { ...spec.difficulty[2], chipOrder: 'shuffled', pool: 'strong+signed' }, 2: { ...spec.difficulty[2], chipOrder: 'shuffled', pool: 'strong+signed' }, 3: { ...spec.difficulty[2], chipOrder: 'shuffled', pool: 'strong+signed' } } });
      const r = await renderFace(page, Object.assign({}, d3, { build(args, ctx) { return d3._buildWith({ global: GLOBAL, block: en }, args, ctx); } }), { locale: 'en', baseName: 'K-355-gate-control-PR11-shuffled', strings: en.strings['G1-358'] });
      const strips = r.m.face.rows.map((x) => x.chips.map((c) => c.organ).join(','));
      const b = control('PR11 shuffled at level 2', [...(r.m.stamps.lcsChipOrder === 'shuffled' ? [] : ['chip-order stamp ' + r.m.stamps.lcsChipOrder]), ...(new Set(strips).size === strips.length ? [] : ['two rows share a permutation']), ...r.verify]);
      pngs.push(r.png);
      if (a && b) killed++; }
    // PS2 — F2 rows fixed at 76 with the grid not filling the body → verify "the rows do not fill the page"
    { const r = await pvRender('PS2', 'which', (h) => h.replace(/grid-template-rows:repeat\(8, minmax\(76px, 1fr\)\);gap:8px;flex:1 1 auto/, 'grid-template-rows:repeat(8, 76px);gap:8px;flex:0 0 auto'));
      if (judge('PS2', r.verify, /the row grid ends \d+ px above the body bottom: the rows do not fill the page \(sparse\)/)) killed++; }
    // PR7 — F3 a row of 3 smell + 1 hear (row 1 re-stamped + re-pictured) → verify "majority ∉ config"
    { const r = await pvRender('PR7', 'odd', (h) => {
        const smell = [['spring/flower', 'spring', 'flower'], ['vegetables/garlic', 'vegetables', 'garlic'], ['vegetables/onion', 'vegetables', 'onion']];
        let i = 0;
        const first = h.indexOf('<section class="ws-card" data-lcs-card="1"'), end = h.indexOf('</section>', first);
        let card = h.slice(first, end).replace(/data-lcs-row-sense="[^"]+"/, 'data-lcs-row-sense="smell"');
        card = card.replace(/<span data-lcs-item="([^"]+)" data-lcs-item-sense="([^"]+)"( data-lcs-odd="1")?[^>]*><img class="ws-icon" src="[^"]+"/g, (m, item, sense, odd) => {
          if (odd) return m.replace(/data-lcs-item-sense="[^"]+"/, 'data-lcs-item-sense="hear"').replace(/data-lcs-item="[^"]+"/, 'data-lcs-item="music/drum"').replace(/src="[^"]+"/, `src="${fileUri('music', 'drum')}"`);
          const [ref, theme, noun] = smell[i++];
          return m.replace(/data-lcs-item-sense="[^"]+"/, 'data-lcs-item-sense="smell"').replace(/data-lcs-item="[^"]+"/, `data-lcs-item="${ref}"`).replace(/src="[^"]+"/, `src="${fileUri(theme, noun)}"`);
        });
        return h.slice(0, first) + card + h.slice(end); });
      if (judge('PR7', r.verify, /row senses .* ≠ majorityRows .* \(majority ∉ config\)/)) killed++; }
    // PR8 — F3 every intruder in column 4 (the boxes re-ordered past the spec) → verify "position leak"
    { const r = await pvRender('PR8', 'odd', (h) => h.replace(/<div class="ws-card-stage"[^>]*>([\s\S]*?)<\/div>/g, (m, inner) => {
        const boxes = inner.match(/<span data-lcs-item="[^"]+"[\s\S]*?<\/span>/g) || [];
        const odd = boxes.find((b) => /data-lcs-odd="1"/.test(b));
        const rest = boxes.filter((b) => b !== odd);
        return m.replace(inner, rest.concat(odd).join('')); }));
      const a = judge('PR8 cap', r.verify, /the intruder sits in column 4 on 5 rows > 3 \(position leak\)/);
      const b = judge('PR8 run', r.verify, /the intruder column repeats on 3 consecutive rows \(position leak\)/);
      if (a && b) killed++; }
    // PS3 — F3 the design's FIXED 96 / 72 boxes (no growth) → verify "does not grow to min(boxMax, stage) (sparse)"
    { const r = await pvRender('PS3', 'odd', (h) => h.replace(/height:min\(120px,100%\);min-height:96px;aspect-ratio:1\/1"><img class="ws-icon" src="([^"]+)" alt="" style="width:75%;height:75%"/g, 'width:96px;height:96px"><img class="ws-icon" src="$1" alt="" style="width:72px;height:72px"'));
      const a = judge('PS3 verify', r.verify, /box 96 in a \d+ px stage does not grow to min\(boxMax 120, stage\) = \d+ \(sparse\)/);
      if (a) killed++; }
    // PR9 — F4 a bank in the row order → the node gate "order leak"
    { const r = await pvRender('PR9', 'label', (h, meta) => { const words = meta.senses.map((s) => en.verbs[s]); let i = 0; return h.replace(/(<span class="ws-bankword" style="[^"]*" data-lcs-bank-word=")[^"]+("><span>)[^<]+/g, (m, a, b) => `${a}${words[i]}${b}${words[i++]}`); });
      const found = collect(() => assertFace('PR9', r, faceD('label'), 'label', { block: en, loc: 'en' }));
      if (judge('PR9', found, /differs from the row order .* in only 0 positions \(order leak\)/)) killed++; }
    // PS4 — F4 rows fixed at 112 and the stage centred in the body (a floating 670 px stage in a 766 body) → verify "the stage floats"
    { const r = await pvRender('PS4', 'label', (h) => h.replace(/class="fs-label-stage" ([^>]*)style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0"/, 'class="fs-label-stage" $1style="display:flex;flex-direction:column;flex:0 0 auto;margin:auto 0"').replace('grid-template-rows:repeat(5, minmax(112px, 128px))', 'grid-template-rows:repeat(5, 112px)'));
      if (judge('PS4', r.verify, /stage top \d+ px under the body top: the stage floats/)) killed++; }
    // PR10 — F5 a starter at 0.9 x glyphH (27 px) instead of starterFontPx → the gate's starter-px check (the G1-306 defect class)
    { const r = await pvRender('PR10', 'write', (h) => h.replace(/font-size="34\.5"/g, 'font-size="27"').replace(/data-lcs-starter-px="34\.5"/g, 'data-lcs-starter-px="27"'));
      const found = collect(() => assertFace('PR10', r, faceD('write'), 'write', { block: en, loc: 'en' }));
      if (judge('PR10', found, /starter sized 27 ≠ starterFontPx 34\.5/)) killed++; }
    // PR14 — F5 with the design's 430 row + draw box and the de "Ich kann" frame → gate D ("Ich kann schmecken: " 327 > 215)
    { const de = blockFor(en, 'de', { verbs: { hear: 'hören', see: 'sehen', smell: 'riechen', taste: 'schmecken', touch: 'fühlen' }, starters: { hear: 'Ich kann hören: ', see: 'Ich kann sehen: ', smell: 'Ich kann riechen: ', taste: 'Ich kann schmecken: ', touch: 'Ich kann fühlen: ' }, strand: 'Sachunterricht' });
      const spec = faceRenders.write.spec;
      const D = { ...spec.difficulty[2], laneW: 430, draw: { w: 120, h: 100 }, rowMin: 126, rowMax: 140 };
      const t = Object.assign({}, spec, { difficulty: { 1: D, 2: D, 3: D }, build(args, ctx) { return this._buildWith({ global: GLOBAL, block: de }, args, ctx); } });
      const r = await renderFace(page, t, { locale: 'en', baseName: 'K-355-gate-poison-PR14', strings: en.strings['G1-361'] });
      pngs.push(r.png);
      if (judge('PR14', r.verify, /starter "Ich kann schmecken: " \d+ px > 0\.5 x the 430 row \(gate D\)/, 'the de ability frame on the 430 row')) killed++; }
    // PS5 — F5 the lanes centred in the body → verify "the stage floats"
    { const r = await pvRender('PS5', 'write', (h) => h.replace(/grid-template-rows:repeat\(5, minmax\(126px, 140px\)\);gap:8px;flex:1 1 auto;min-height:0;align-content:start/, 'grid-template-rows:repeat(5, 126px);gap:8px;flex:0 0 auto;margin:auto 0'));
      if (judge('PS5', r.verify, /stage top \d+ px under the body top: the stage floats/)) killed++; }
    // PR15 — an unauthored locale REFUSES on every face (never falls back to en)
    { const refused = [];
      for (const face of Object.keys(faceRenders)) { try { faceRenders[face].spec.build({ theme: null, difficulty: 2, locale: 'sv' }, { rng: makeRng('pr15') }); } catch (e) { refused.push(face + ': ' + e.message); } }
      const all = refused.length === 5 && refused.every((m) => /has no sv block/.test(m));
      if (judge('PR15', all ? refused : ['only ' + refused.length + ' of 5 faces refused'], /has no sv block/, 'sv: 5/5 faces refuse')) killed++; }
    // PR16 — the touch pool emptied → sort / which REFUSE (no filler)
    { const g = clone(GLOBAL); g.items = g.items.filter((it) => it.sense !== 'touch');
      const refused = [];
      for (const face of ['sort', 'which']) { try { faceRenders[face].spec._buildWith({ global: g, block: en }, { difficulty: 2, locale: 'en' }, { rng: makeRng('pr16') }); refused.push(face + ': BUILT'); } catch (e) { refused.push(face + ': ' + e.message); } }
      const all = refused.every((m) => /admitted touch items < \d+ after the family fence|no intruder left/.test(m));
      if (judge('PR16', all ? refused : refused.filter((m) => /BUILT/.test(m)), /refuse/, 'sort / which refuse')) killed++; }

    console.log('poisons:\n' + poisonLog.join('\n'));
    ok(killed === TOTAL, `poisons: ${killed}/${TOTAL} killed`);
    console.log('renders: ' + pngs.length + ' PNGs under out/dev (K-355-gate-*)');
  } finally {
    await browser.close();
  }
  const pass = fails.length === 0;
  if (!pass) console.log('FINDINGS:\n  ' + fails.join('\n  '));
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed, ${TOTALS()}${QUICK ? ', --quick: sweeps skipped' : ''})` : `FAIL (${fails.length} findings)`);
  process.exit(pass ? 0 : 1);
  function TOTALS() { return poisonLog.filter((l) => /KILLED|PASSES/.test(l)).length + ' poison verdicts clean'; }
}

module.exports = { validateBank, validateGlobal, measureLiterals, coOccurrable };
if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
