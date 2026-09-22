#!/usr/bin/env node
/**
 * verify-b4-recycling.js — the K-357 `recycling` gate (design file §5;
 * _BUILD-BRIEF.md deliverable 4). BASE commission (2026-09-21): the global
 * item bank, every authored locale block, the base renders at d1 / d2 / d3
 * under the en chrome AND the long-chrome fixture, the 722 / 677 stack checks
 * measured on the REAL render (body pinned), the R1 pill-width rules measured
 * with the shell fonts on every authored locale's table, a 20-seed sweep, and
 * the §5 data + base render poisons — each must FAIL for its OWN reason, the
 * correct EN bank is the control. PHASE 2 (2026-09-21, _work/K-357-faces.md)
 * added sections 5-6: the rows module ≡ the emitted specs ≡ the en strings
 * (K-367 refused in en: no string, the §6 candidate on the fixtures); every
 * face rendered at d2 through the real pipeline — en for which / write / odd /
 * open, the de fixture for color (en REFUSES it by construction, asserted) —
 * plus the 70 / 150 long face chrome and the body PINNED to 722 / 677 with
 * verify() re-run on the re-flowed layout; the N = 2 (es) / N = 4 (fr) / it
 * bin sets on which, es + sv on write, es + nl on color (full run); the
 * floors (icons 60 / 52 / 84, chips 64 with 44 bins and >= 2 px marks, key
 * pills 15 under R1, legend swatches 22 + words 17, examples 84, bank one
 * row); node cross-checks with the bank (every picture === fileUri of the
 * stamped bank item, bin === _bin(item, block), word === materialWords, the
 * F4 examples' bins, the page fences); every picture on disk as @2x.webp; a
 * 20-seed sweep per face; 25 face poisons (PR3-PR6 / PR12-PR15 / PS-F1..F5 /
 * PF1-PF4), each for its own reason with the face renders as controls.
 *
 *   node scripts/worksheet-gen/qa/verify-b4-recycling.js [--quick]
 *
 * Exports validateBank(block, loc) → string[] (the tools/b4-probe-child.js
 * contract), validateGlobal(global), bankWarnings(block, loc), measurePills.
 *
 * 1. BANK
 *    global (data/b4/recycling.json), rules 1-2:
 *    (1) materials === the six; every item: (theme, noun) resolves in
 *        cache/manifest.json with the stamped vocabKey, a singular in ALL 11
 *        locales (entriesFor), hasPicture x11, never B2_EXCLUDEd, no localized
 *        B&W marker, picOpened === true, material ∈ the six, packaging boolean,
 *        family non-empty, id unique, vocabKey unique, not in `_excluded`;
 *        bank size 37 (a change is a re-open + a note);
 *    (2) per material class (paper+cardboard, glass, plastic, metal, organic)
 *        >= 3 distinct families (the F3 trio floor) and >= 1 packaging item for
 *        the four recyclable classes; pageRules name bank ids and agree with
 *        the copies in the spec's verify().
 *    locale block, rules 3-11 (validateBank):
 *    (3) 2 <= bins <= 5; keys unique; label non-empty, <= 15 chars, no digit,
 *        no `{`; materials ⊂ the six; color ∈ codeColors ∪ {inkSoft, null};
 *        colorWord non-empty IFF color; route[id].bin is a bin of this locale
 *        whose materials include the item's material and (packaging ||
 *        !packagingOnly); every material covered by >= 1 bin or every item of
 *        it in excludeItems; excludeItems / route name bank ids with a reason;
 *    (4) bin(item, loc) unique (first-match; a second match is a WARN); every
 *        bin's pool >= 1 (ERROR) and >= 2 (WARN — sv metall is the known 1);
 *        every bin's pool >= 2 distinct families (F4 examples);
 *    (5) materialWords keys ⊂ materials; >= 2 distinct values; each
 *        ^\p{L}[\p{L}'’-]*$ and <= 12 graphemes; the F2 pool >= 8 items over
 *        >= 8 families else `refuse` names write;
 *    (6) F4: every bin color !== null AND colorWord AND colorConvention ===
 *        'national' AND colours distinct, else `refuse` includes color;
 *        'classroom' is a FAIL; en refuse includes color;
 *    (7) titles <= 70, no worksheet word, unique in the block, never a
 *        neighbour family's name (science-sort / sorting-categories) nor a
 *        theme slug / name; fi never /^\s*lajittelu/ and never
 *        sorting-categories.name.fi / science-sort.name.fi; sv never
 *        /^sortera/; it never "riciclaggio"; pt "reciclagem" only beside
 *        "coleta seletiva"; fr instructions never "en sciences"; da titles
 *        never "genbrug"; es titles never "residuos"; no answer-key promise;
 *        no visible free-claim;
 *    (8) instructions <= 150, no `{`; en: the base names line + bin, F1
 *        circle + bin, F2 write + bank, F3 circle + row, F4 legend / color +
 *        bin, F5 draw + write; a stray tick / letter box / sticker / cut /
 *        paste fails (the per-locale lexicon is validate-b4-draft's, Phase 2);
 *    (9) es: exactly 2 bins organico / inorganico unless panelOverride.bins
 *        carries a reason;
 *   (10) strings ids ⊂ {K-357, K-366, G1-364, G2-348, K-367, G1-365}; a
 *        missing face id must be named in `refuse`; the titles differ pairwise
 *        in BOTH directions by a token that is not a stopword / adjective;
 *   (11) enAudit non-empty in every non-EN block; starters: literals, no `{`,
 *        <= 40 chars (the 140 px rule is the render gate's); strand literal
 *        present, never "Common Core" outside en.
 * 2. RENDER — through render/render-instance.js (file:// fonts): d1 / d2 / d3
 *    per authored locale under the en chrome + the long-chrome fixture (a
 *    3-line de title + a 150-char instruction). Asserts verify() empty,
 *    qa/lints.js clean, and ITSELF: every icon >= the K floor 56 AND === the
 *    config, tiles === the config outer size, the strip <= 675 and centred in
 *    the body, N bins at binWidth(N) x 176 with the row margins >= 17 - the
 *    pill overhang, pills at 17 px in one client rect, R1 on the RENDERED pills
 *    (<= 151, adjacent half-sums <= 125), the stage inside the body / above
 *    the footer, the FIXED line zone block === the config (220..260) and the
 *    measured dot-to-pill zone inside 220..265 (above = SPARSE: reviewer
 *    ruling 2026-09-21), the stage at the body top (slack below the bins);
 *    then the 722 AND 677 stack checks: the body is pinned to each budget in
 *    the live page, the strip must stay inside the top, the bins inside the
 *    bottom and the zone unchanged; NODE
 *    cross-checks: every tile is a bank item whose stamps === the bank, whose
 *    bin === TYPE._bin(item, block) (an excluded item on the page fails),
 *    every pill === block.bins[k].label, colour stamps === the block, per-bin
 *    counts within the config. Every authored locale's pill table is measured
 *    with the shell fonts at 17 px (R1) and at 15 px (the F1 key rule).
 *    A greyscale copy of the d2 base is saved for the critic.
 * 3. SWEEP — 20 seeds x d2 en (build only, skipped by --quick): every seed
 *    passes the composer fences in node, >= 2 distinct item sets, every bin
 *    shows >= 3 distinct items across the sweep.
 * 4. POISON — each must FAIL for its OWN reason (WRONG REASON / SILENT both
 *    exit 1); the correct EN bank is the control:
 *      P1  an item without `packaging`                      → rule 1
 *      P2  kitchen tools/bottle as glass, picOpened:true      → rule 1 (_excluded)
 *      P3  a second item with vocabKey apple (Supermarket)    → rule 1
 *      P4  de bins with 6 entries                             → rule 3
 *      P5  de route.toothbrush → verpackung (packagingOnly)   → rule 3
 *      P6  sv plast with materials []                         → rule 4 (pool 0)
 *      P7  en materialWords all 'paper'                       → rule 5
 *      P8  nl GFT + Glas both codeGreen, national             → rule 6
 *      P9  de colorConvention 'classroom'                     → rule 6
 *      P10 fi base title 'Lajittelu'                          → rule 7
 *      P11 sv F1 title 'Sortera soporna'                      → rule 7
 *      P12 fr base instruction 'Trie en sciences les déchets.' → rule 7
 *      P13 en F1 instruction 'Tick the bin it goes in.'       → rule 8
 *      P14 es bins = 3 without panelOverride                  → rule 9
 *      P15 F2 'Recycling Sort: Big Bins' vs F4 'Color the Bins' → rule 10
 *      P16 an unauthored locale                               → the bank REFUSES
 *      P17 a bin whose pool is emptied                        → the spec REFUSES
 *      PR1 two tiles of one bin adjacent in the strip         → verify() position leak
 *      PR2 envelope + letter on one page                      → verify() family
 *      PR7 an <img src> from pictureFor (Supermarket/apple for fruits/apple) → verify()
 *      PR8 a sv page with saucepan in the strip               → node gate (excluded)
 *      PR9 sv pill 'Pappersförpackningar'                     → R1 width (measured)
 *      PR10 it 'Indifferenziato' beside a synthetic 'Verpackungen' → R1 adjacency;
 *           beside 'Plastica' PASSES (control)
 *      PR11 d2 with perBinMax read off the level index        → the config guard
 *      PR-SPARSE the zone block stretched to 425                → the gate's SPARSE ceiling + verify()
 *      PR-SHORT the previous 530 stack (binH 176 / zone 240 / tile 72) → the spec guard; past it the
 *           gate's d2 stage floor (>= 630) + the one-line slack ceiling (<= 180) + verify() binH
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule, bank: loadBank } = require('../lib/b4-common.js');
const { excluded, fileUri, entriesFor } = require('../lib/b2-common.js');
const { hasPicture } = require('../lib/b3-picture-index.js');
const resolve = require('../image-cache/resolve.js');
const tokens = require('../primitives/_tokens.js');
const freeClaim = require('../../lib/free-claim.js');

const TYPE = require('../types/k/K-357-recycling.js');
const GLOBAL = require('../data/b4/recycling.json');
const TAX = require('../../../frontend/config/topics-taxonomy.json');

const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MATERIALS = ['paper', 'cardboard', 'glass', 'plastic', 'metal', 'organic'];
const CLASSES = { paper: ['paper', 'cardboard'], glass: ['glass'], plastic: ['plastic'], metal: ['metal'], organic: ['organic'] };
const PACKAGING_CLASSES = ['paper', 'glass', 'plastic', 'metal'];
const BANK_SIZE = 37;
const BASE_ID = 'K-357';
const FACE_IDS = { 'K-366': 'which', 'G1-364': 'write', 'G2-348': 'odd', 'K-367': 'color', 'G1-365': 'open' };
const FACES = Object.values(FACE_IDS);
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWER_KEY = /with answers|mit lösungen|con respuestas|com respostas|avec (les )?réponses|con (le )?risposte|met antwoorden|med facit|med svar|med fasit|vastauksineen/i;
const NEIGHBOUR_FAMILIES = ['science-sort', 'sorting-categories'];
const COLOUR_KEYS = new Set([...Object.keys(tokens.codeColors), 'inkSoft']);
const MIN_ICON = tokens.density.K.minElement;   // 56
const PILL_MAX = 151, HALF_SUM_MAX = 125;        // §2 R1 (17 px pills over 117 bins, centres 131 apart)
const PILL_PAD = 25;                             // padding 10 + 10, border 2.5 + 2.5 (what the measurer reproduces)
const ZONE_MIN = 220, ZONE_MAX = 260;            // the FIXED line zone (reviewer ruling 2026-09-21); measured dot -> pill = zone + 5
const ZONE_SPARSE = ZONE_MAX + 5 + 0.6;         // a measured dot-to-pill zone above this reads SPARSE
// (locale, level) cells that legitimately REFUSE, each with the reason a reviewer can audit. A cell
// listed here MUST throw (checked below), and any cell NOT listed MUST build — the list may only
// shrink. The waves ship d2, so a d1/d3 entry costs no deck.
const LEVEL_REFUSALS = {
  'sv|3': 'the honest Metallförpackningar bin holds ONE item family (can); saucepan/bolt/nut are non-packaging (återvinningscentralen), so 10 items cannot be dealt two per bin',
};
const STAGE_TOP_MAX = 8;                         // the stage sits under the instruction; the slack falls BELOW the bins
const STAGE_MIN_D2 = 630;                        // reviewer ruling 2 (2026-09-21): the apparatus fills a K page — d2 strip -> bins-bottom >= 630 (built 645)
const SLACK_MAX_ONE_LINE = 180;                  // and the chrome's slack under the bins <= 180 at the ONE-LINE chrome (811 - 645 = 166)
const LABEL_MAX = 15, STARTER_MAX_CHARS = 40;
const EN_STOP = new Set(['the', 'a', 'an', 'of', 'to', 'it', 'is', 'in', 'i', 'and', 'or', 'by', 'for', 'on', 'at', 'with', 'what', 'which', 'one', 'out', 'three', 'sort', 'recycling']);
const EN_ADJ = new Set(['big', 'small', 'little', 'easy', 'hard', 'new', 'fun', 'simple', 'quick', 'more', 'great', 'best', 'first']);
const EN_LEXICON = {
  base: { need: [/\bline\b/i, /\bbin\b/i], ban: [/\btick\b/i, /\bsticker/i, /letter box/i, /\bcut\b/i, /\bpaste\b/i, /\bcircle\b/i, /\bwrite\b/i, /\bcolou?r\b/i] },
  which: { need: [/\bcircle\b/i, /\bbin\b/i], ban: [/\btick\b/i, /\bsticker/i, /letter box/i, /\bcut\b/i, /\bpaste\b/i, /\bline\b/i, /\bwrite\b/i] },
  write: { need: [/\bwrite\b/i, /\bbank\b/i], ban: [/\btick\b/i, /\bsticker/i, /letter box/i, /\bcut\b/i, /\bpaste\b/i, /\bcircle\b/i, /\bbin\b/i] },
  odd: { need: [/\bcircle\b/i, /\brow\b/i], ban: [/\btick\b/i, /\bsticker/i, /letter box/i, /\bcut\b/i, /\bpaste\b/i, /\bline\b/i, /\bbin\b/i, /\bwrite\b/i] },
  color: { need: [/\bcolou?r\b/i, /\bbin\b/i], ban: [/\btick\b/i, /\bsticker/i, /letter box/i, /\bcut\b/i, /\bpaste\b/i, /\bline\b/i, /\bwrite\b/i] },
  open: { need: [/\bdraw\b/i, /\bwrite\b/i], ban: [/\btick\b/i, /\bsticker/i, /letter box/i, /\bcut\b/i, /\bpaste\b/i, /\bcircle\b/i, /\bbin\b/i] },
};

freeClaim.selfTest();

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
const nfd = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function vocabKeyOf(theme, noun) {
  try { const e = resolve.manifest().themes[theme]; return e && e.nouns[noun] ? e.nouns[noun].vocabKey || null : undefined; } catch (e) { return undefined; }
}
function excludedRefs(global) {
  const refs = new Set();
  for (const [cat, entries] of Object.entries(global._excluded || {})) { if (cat === '_doc') continue; for (const k of Object.keys(entries)) refs.add(k); }
  return refs;
}
const byId = (global) => Object.fromEntries((global.items || []).map((it) => [it.id, it]));

/* ------------------------------------------------------------------ bank: global (rules 1-2) */
function validateGlobal(global) {
  const f = [];
  const push = (m) => f.push(`[global] ${m}`);
  if (!global) { push('absent'); return f; }
  if (!Array.isArray(global.materials) || global.materials.join() !== MATERIALS.join()) push(`materials ${JSON.stringify(global.materials)} ≠ the six`);
  const items = Array.isArray(global.items) ? global.items : [];
  if (!items.length) push('no items');
  if (items.length !== BANK_SIZE) push(`bank size ${items.length} ≠ ${BANK_SIZE} (a change is a re-open + a note)`);
  const ex = excludedRefs(global);
  const ids = new Set(), keys = new Set(), refs = new Set();
  for (const it of items) {
    const tag = (x) => `item ${it && it.theme}/${it && it.noun}: ${x}`;
    if (!it || typeof it.theme !== 'string' || typeof it.noun !== 'string') { push('an item without theme/noun'); continue; }
    if (typeof it.id !== 'string' || !it.id) push(tag('no id'));
    if (ids.has(it.id)) push(tag(`id "${it.id}" twice`));
    ids.add(it.id);
    if (refs.has(it.theme + '/' + it.noun)) push(tag('theme/noun twice'));
    refs.add(it.theme + '/' + it.noun);
    if (BW_MARKER.test(it.theme)) push(tag('theme dir carries a localized B&W marker'));
    if (ex.has(it.theme + '/' + it.noun)) push(tag('is in _excluded (never re-add an excluded picture)'));
    try { fileUri(it.theme, it.noun); } catch (e) { push(tag('does not resolve via fileUri')); }
    if (it.picOpened !== true) push(tag('not picOpened:true'));
    if (!MATERIALS.includes(it.material)) push(tag(`material "${it.material}" is not one of the six`));
    if (typeof it.packaging !== 'boolean') push(tag('packaging is not a boolean'));
    if (typeof it.family !== 'string' || !it.family.trim()) push(tag('family empty'));
    const key = vocabKeyOf(it.theme, it.noun);
    if (!key) push(tag('vocabKey null in cache/manifest.json'));
    else {
      if (it.vocabKey !== key) push(tag(`stamped vocabKey "${it.vocabKey}" ≠ manifest "${key}"`));
      if (keys.has(key)) push(tag(`vocab key ${key} twice (twins across themes never share a bank)`));
      keys.add(key);
      for (const l of LOCALES) {
        const e = entriesFor(it.theme, l).find((x) => x.noun === it.noun);
        if (!e) push(tag(`absent from entriesFor(${it.theme}, ${l})`));
        else if (!e.singular) push(tag(`no singular in ${l}`));
        if (!hasPicture(key, l)) push(tag(`hasPicture(${key}, ${l}) false`));
        if (excluded(key, l)) push(tag(`vocab key ${key} is B2_EXCLUDEd in ${l}`));
      }
    }
  }
  // rule 2
  for (const [cls, mats] of Object.entries(CLASSES)) {
    const of = items.filter((it) => mats.includes(it.material));
    const fams = new Set(of.map((it) => it.family));
    if (fams.size < 3) push(`class ${cls}: ${fams.size} distinct families < 3 (the F3 trio floor)`);
    if (PACKAGING_CLASSES.includes(cls) && !of.some((it) => it.packaging === true)) push(`class ${cls}: no packaging item`);
  }
  const rules = global.pageRules || {};
  for (const pair of [...(rules.neverBoth || []), ...(rules.neverAdjacent || [])]) for (const id of pair) if (!ids.has(id)) push(`pageRules name "${id}", not a bank id`);
  // the verify() copies (types/k/K-357-recycling.js) must agree with the json
  const src = fs.readFileSync(path.join(__dirname, '..', 'types', 'k', 'K-357-recycling.js'), 'utf8');
  const nb = /const NEVER_BOTH = (\[[^\n]*\]);/.exec(src), na = /const NEVER_ADJACENT = (\[[^\n]*\]);/.exec(src);
  const norm = (a) => JSON.stringify((a || []).map((p) => [...p].sort()).sort());
  if (!nb || norm(JSON.parse(nb[1].replace(/'/g, '"'))) !== norm(rules.neverBoth)) push('verify() NEVER_BOTH ≠ pageRules.neverBoth');
  if (!na || norm(JSON.parse(na[1].replace(/'/g, '"'))) !== norm(rules.neverAdjacent)) push('verify() NEVER_ADJACENT ≠ pageRules.neverAdjacent');
  return f;
}

/* ------------------------------------------------------------------ bank: locale block (rules 3-11) */
function tokensOf(s) { return new Set(nfd(s).split(/[^\p{L}\p{N}]+/u).filter(Boolean)); }
function contentTokens(title, loc) {
  const t = tokensOf(title);
  if (loc === 'en') for (const w of [...EN_STOP, ...EN_ADJ]) t.delete(w);
  return t;
}
/** WARN-class findings (rule 4: a second matching bin, a pool of 1). */
function bankWarnings(block, loc, global = GLOBAL) {
  const w = [];
  if (!block || !Array.isArray(block.bins)) return w;
  for (const it of global.items || []) {
    if (Object.prototype.hasOwnProperty.call(block.excludeItems || {}, it.id)) continue;
    const matches = block.bins.filter((b) => Array.isArray(b.materials) && b.materials.includes(it.material) && (it.packaging || !b.packagingOnly));
    if (matches.length > 1 && !(block.route && block.route[it.id])) w.push(`[${loc}] item ${it.id} matches ${matches.map((b) => b.key).join(' + ')} (the first wins)`);
  }
  for (const b of block.bins) {
    const pool = TYPE._poolFor(b.key, block, global);
    if (pool.length === 1) w.push(`[${loc}] bin ${b.key}: pool of 1 (${pool[0].id} on every page)`);
  }
  return w;
}
function validateBank(block, loc, global = GLOBAL) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  if (!block || typeof block !== 'object') { push('absent'); return f; }
  const items = global.items || [];
  const IDS = byId(global);
  // rule 3
  const bins = Array.isArray(block.bins) ? block.bins : null;
  if (!bins) { push('bins is not an array'); return f; }
  if (bins.length < 2 || bins.length > 5) push(`${bins.length} bins outside 2..5`);
  const keys = bins.map((b) => b && b.key);
  if (new Set(keys).size !== keys.length) push('bin keys repeat');
  const colours = [];
  for (const b of bins) {
    const tag = (x) => `bin ${b && b.key}: ${x}`;
    if (!b || typeof b.key !== 'string' || !b.key) { push('a bin without a key'); continue; }
    const label = b.label;
    if (typeof label !== 'string' || !label.trim()) push(tag('label empty'));
    else {
      if ([...label].length > LABEL_MAX) push(tag(`label "${label}" > ${LABEL_MAX} chars`));
      if (/\p{N}/u.test(label)) push(tag(`label "${label}" carries a digit`));
      if (/[{}]/.test(label)) push(tag(`label "${label}" carries a brace`));
    }
    if (!Array.isArray(b.materials) || !b.materials.length || b.materials.some((m) => !MATERIALS.includes(m))) push(tag(`materials ${JSON.stringify(b.materials)} ⊄ the six`));
    if (!(b.color === null || COLOUR_KEYS.has(b.color))) push(tag(`color "${b.color}" is not a codeColors key, inkSoft or null`));
    const hasWord = typeof b.colorWord === 'string' && b.colorWord.trim();
    if (b.color !== null && b.color !== undefined && !hasWord) push(tag('color without a colorWord'));
    if ((b.color === null || b.color === undefined) && hasWord) push(tag('colorWord without a color'));
    if (typeof b.packagingOnly !== 'boolean') push(tag('packagingOnly is not a boolean'));
    if (b.color) colours.push(b.color);
  }
  const route = block.route || {};
  for (const [id, r] of Object.entries(route)) {
    const it = IDS[id];
    if (!it) { push(`route.${id}: not a bank id`); continue; }
    const b = bins.find((x) => x && x.key === (r && r.bin));
    if (!b) push(`route.${id}: bin "${r && r.bin}" is not a bin of this locale`);
    else {
      if (!b.materials.includes(it.material)) push(`route.${id}: bin ${b.key} does not take ${it.material}`);
      if (b.packagingOnly && !it.packaging) push(`route.${id}: ${id} is not packaging but ${b.key} is packagingOnly`);
    }
    if (!(r && typeof r.reason === 'string' && r.reason.trim())) push(`route.${id}: no reason`);
  }
  const exItems = block.excludeItems || {};
  for (const [id, reason] of Object.entries(exItems)) {
    if (!IDS[id]) push(`excludeItems.${id}: not a bank id`);
    if (typeof reason !== 'string' || !reason.trim()) push(`excludeItems.${id}: no reason`);
  }
  for (const m of MATERIALS) {
    const covered = bins.some((b) => b && Array.isArray(b.materials) && b.materials.includes(m));
    const of = items.filter((it) => it.material === m);
    if (!covered && of.some((it) => !Object.prototype.hasOwnProperty.call(exItems, it.id) && !route[it.id])) push(`material ${m}: no bin takes it and not every item of it is in excludeItems`);
  }
  // rule 4
  for (const it of items) {
    const k = TYPE._bin(it, block);
    if (k === null) continue;
    if (!bins.some((b) => b && b.key === k)) push(`item ${it.id} resolves to "${k}", not a bin of this locale`);
  }
  for (const b of bins) {
    if (!b || !b.key) continue;
    const pool = TYPE._poolFor(b.key, block, global);
    if (pool.length < 1) push(`bin ${b.key}: resolved pool 0 (no item on the page can reach it)`);
    const fams = new Set(pool.map((it) => it.family));
    // the two F4 example pictures per bin need two families; a locale that refuses F4 (sv: metall pool = 1) is exempt
    if (fams.size < 2 && !(Array.isArray(block.refuse) && block.refuse.includes('color'))) push(`bin ${b.key}: ${fams.size} distinct families < 2 (F4 examples)`);
  }
  // rule 5
  const refuse = Array.isArray(block.refuse) ? block.refuse : [];
  for (const r of refuse) if (!FACES.includes(r)) push(`refuse "${r}" is not a face mode`);
  const mw = block.materialWords || {};
  for (const [m, v] of Object.entries(mw)) {
    if (!MATERIALS.includes(m)) push(`materialWords.${m} is not a material`);
    if (typeof v !== 'string' || !/^\p{L}[\p{L}'’-]*$/u.test(v)) push(`materialWords.${m} "${v}" is not a single word`);
    else if ([...v].length > 12) push(`materialWords.${m} "${v}" > 12 graphemes`);
  }
  if (new Set(Object.values(mw).map((v) => String(v).toLocaleLowerCase(loc))).size < 2) push(`materialWords has ${new Set(Object.values(mw)).size} distinct value(s) < 2`);
  const f2 = TYPE._materialPool(block, global);
  if ((f2.length < 8 || new Set(f2.map((it) => it.family)).size < 8) && !refuse.includes('write')) push(`F2 pool ${f2.length} items / ${new Set(f2.map((it) => it.family)).size} families < 8 and refuse does not name write`);
  // rule 6
  if (block.colorConvention === 'classroom') push('colorConvention "classroom" is not accepted');
  else if (!(block.colorConvention === 'national' || block.colorConvention === null || block.colorConvention === undefined)) push(`colorConvention "${block.colorConvention}"`);
  const f4ok = block.colorConvention === 'national' && bins.every((b) => b && b.color && typeof b.colorWord === 'string' && b.colorWord.trim()) && new Set(colours).size === bins.length;
  if (!f4ok && !refuse.includes('color')) push('F4: not every bin has a national colour + colour word (distinct), and refuse does not name color');
  if (loc === 'en' && !refuse.includes('color')) push('en refuse must include color (no national colour convention)');
  // rule 7 + 8 + 10
  const strings = block.strings || {};
  const themeWords = new Set();
  for (const t of Object.values(TAX.axes.theme || {})) { if (t.slug && t.slug[loc]) themeWords.add(nfd(t.slug[loc])); if (t.name && t.name[loc]) themeWords.add(nfd(t.name[loc])); }
  const neighbourNames = new Set(NEIGHBOUR_FAMILIES.map((k) => TAX.axes['exercise-type'][k] && TAX.axes['exercise-type'][k].name && TAX.axes['exercise-type'][k].name[loc]).filter(Boolean).map(nfd));
  const titles = [];
  for (const [id, s] of Object.entries(strings)) {
    const mode = id === BASE_ID ? 'base' : FACE_IDS[id];
    const title = (s && s.title) || '', ins = (s && s.instruction) || '';
    if (!title || [...title].length > 70) push(`${id} title "${title}" empty or > 70 chars`);
    if (WORKSHEET_WORD.test(title)) push(`${id} title "${title}" carries the worksheet word`);
    if (ANSWER_KEY.test(title + ' ' + ins)) push(`${id} promises an answer key (printable decks ship none)`);
    if (neighbourNames.has(nfd(title))) push(`${id} title "${title}" equals a neighbour family's name`);
    if (themeWords.has(nfd(title))) push(`${id} title "${title}" equals a theme slug / name`);
    if (loc === 'fi' && /^\s*lajittelu/iu.test(title)) push(`${id} fi title "${title}" heads with "Lajittelu"`);
    if (loc === 'sv' && /^\s*sortera/iu.test(title)) push(`${id} sv title "${title}" starts with "Sortera"`);
    if (loc === 'it' && /riciclaggio/iu.test(title + ' ' + ins)) push(`${id} it string prints "riciclaggio"`);
    if (loc === 'pt' && /reciclagem/iu.test(title + ' ' + ins) && !/coleta seletiva/iu.test(title + ' ' + ins)) push(`${id} pt "reciclagem" without "coleta seletiva"`);
    if (loc === 'fr' && /en sciences/iu.test(ins)) push(`${id} fr instruction reads "en sciences" (the science-sort hub head)`);
    if (loc === 'da' && /genbrug/iu.test(title)) push(`${id} da title "${title}" carries "genbrug"`);
    if (loc === 'es' && /residuos/iu.test(title)) push(`${id} es title "${title}" carries "residuos"`);
    const claim = freeClaim.hit(title + ' ' + ins);
    if (claim) push(`${id} visible copy claims free ("${claim}")`);
    if (titles.some((t) => t.t === nfd(title))) push(`${id} title "${title}" repeats another face's title`);
    for (const prev of titles) {
      // the base is the bare head and every face ADDS a noun / verb to it (one direction); two FACES must each carry a
      // content token the other lacks (both directions — an adjective-only difference fails)
      const a = contentTokens(title, loc), b = contentTokens(prev.title, loc);
      const aHas = [...a].some((x) => !b.has(x)), bHas = [...b].some((x) => !a.has(x));
      const baseInvolved = id === BASE_ID || prev.id === BASE_ID;
      if (baseInvolved ? !(id === BASE_ID ? bHas : aHas) : (!aHas || !bHas)) push(`${id} "${title}" and ${prev.id} "${prev.title}" differ by no noun / verb (adjective-only or one-sided)`);
    }
    titles.push({ id, t: nfd(title), title });
    if (!ins || [...ins].length > 150) push(`${id} instruction empty or > 150 chars`);
    if (/[{}]/.test(ins)) push(`${id} instruction carries a slot`);
    if (loc === 'en' && mode && EN_LEXICON[mode]) {
      for (const re of EN_LEXICON[mode].need) if (!re.test(ins)) push(`${id} (${mode}) instruction "${ins}" does not name its apparatus ${re}`);
      for (const re of EN_LEXICON[mode].ban) if (re.test(ins)) push(`${id} (${mode}) instruction "${ins}" names another face's apparatus ${re}`);
    }
  }
  // rule 9
  if (loc === 'es') {
    const ov = block.panelOverride && block.panelOverride.bins;
    const two = bins.length === 2 && keys.includes('organico') && keys.includes('inorganico');
    if (!two && !(ov && typeof ov.reason === 'string' && ov.reason.trim())) push(`es bins ${keys.join(',')} ≠ organico / inorganico without a panelOverride.bins reason`);
  }
  // rule 10
  if (!strings[BASE_ID]) push(`strings ${BASE_ID} missing`);
  for (const [id, mode] of Object.entries(FACE_IDS)) if (!strings[id] && !refuse.includes(mode)) push(`strings ${id} (${mode}) missing and refuse does not name "${mode}"`);
  for (const id of Object.keys(strings)) if (id !== BASE_ID && !FACE_IDS[id]) push(`strings carries an unknown id ${id}`);
  // rule 11
  if (loc !== 'en' && !(typeof block.enAudit === 'string' && block.enAudit.trim())) push('enAudit empty (the panel audits the EN source)');
  const starters = Array.isArray(block.starters) ? block.starters : null;
  if (!starters) push('starters must be an array');
  else for (const st of starters) { if (typeof st !== 'string' || !st.trim()) push('a starter is not a literal'); else { if (/[{}]/.test(st)) push(`starter "${st}" carries a brace`); if ([...st].length > STARTER_MAX_CHARS) push(`starter "${st}" > ${STARTER_MAX_CHARS} chars`); } }
  if (typeof block.strand !== 'string' || !block.strand.trim()) push('no strand literal');
  else if (/common core/i.test(block.strand) && loc !== 'en') push('strand names Common Core outside en');
  if (typeof block.scheme !== 'string' || !block.scheme.trim()) push('no scheme sentence');
  return f;
}

/* ------------------------------------------------------------------ render */
/** Pill widths (the exact .rc-pill CSS) at 17 px (R1) and 15 px (the F1 key rule), measured with the shell fonts on a rendered page. */
async function measurePills(page, labels) {
  return page.evaluate((labels) => {
    const m = (text, px) => {
      const s = document.createElement('span');
      s.style.cssText = `position:absolute;left:-9999px;top:0;white-space:nowrap;border:2.5px solid #146B5E;border-radius:999px;padding:5px 10px;font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;line-height:1.2`;
      s.textContent = text; document.body.appendChild(s); const w = s.getBoundingClientRect().width; s.remove(); return w;
    };
    return labels.map((l) => ({ label: l, w17: m(l, 17), w15: m(l, 15) }));
  }, labels);
}
/** R1 over a measured table: pill <= 151, adjacent half-sums <= 125. */
function assertPillTable(name, table, key = 'w17', max = PILL_MAX, half = HALF_SUM_MAX) {
  for (const t of table) ok(t[key] <= max + 0.6, `${name}: pill "${t.label}" ${t[key].toFixed(1)} px > ${max} (R1 width)`);
  for (let i = 0; i + 1 < table.length; i++) {
    const s = table[i][key] / 2 + table[i + 1][key] / 2;
    ok(s <= half + 0.6, `${name}: pills "${table[i].label}" + "${table[i + 1].label}" half-sums ${s.toFixed(1)} > ${half} (R1 adjacency)`);
  }
}

async function renderWith(page, type, { difficulty, locale, baseName, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: locale || 'en', page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-ws-content][data-lcs-recycling]');
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const body = document.querySelector('[data-lcs-body]');
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const tiles = root ? [...root.querySelectorAll('.rc-tile[data-lcs-item]')] : [];
    const slots = root ? [...root.querySelectorAll('.rc-binslot[data-lcs-bin]')] : [];
    const strips = root ? [...root.querySelectorAll('.rc-strip')] : [];
    const pills = slots.map((s) => s.querySelector('.rc-pill'));
    const measure = () => ({
      stripTop: tiles.reduce((y, el) => Math.min(y, el.getBoundingClientRect().top), Infinity),
      stripBottom: tiles.reduce((y, el) => Math.max(y, el.getBoundingClientRect().bottom), 0) + 7,
      pillTop: pills.reduce((y, p) => Math.min(y, p.getBoundingClientRect().top), Infinity),
      binsBottom: slots.reduce((y, el) => Math.max(y, el.getBoundingClientRect().bottom), 0),
    });
    const live = measure();
    return {
      stamps: root ? { ...root.dataset } : null,
      body: rect(body), foot, stage: root ? rect(root) : null,
      icons: tiles.map((el) => { const im = el.querySelector('.ws-icon'); return im ? Math.min(im.offsetWidth, im.offsetHeight) : 0; }),
      tiles: tiles.map((el) => ({ ...rect(el), ...el.dataset })),
      strips: strips.map(rect),
      slots: slots.map((el) => ({ ...rect(el), ...el.dataset, svgW: (el.querySelector('svg') || {}).clientWidth, svgH: (el.querySelector('svg') || {}).clientHeight })),
      pills: pills.map((p) => ({ ...rect(p), text: p.textContent.trim(), rects: p.getClientRects().length, px: parseFloat(getComputedStyle(p).fontSize) })),
      zone: live.pillTop - live.stripBottom, lowest: live.binsBottom, bodyH: body.getBoundingClientRect().height,
      zoneBlock: (() => { const z = root && root.querySelector('.rc-zone[data-lcs-line-zone]'); return z ? z.getBoundingClientRect().height : null; })(),
      stageTop: root ? root.getBoundingClientRect().top - body.getBoundingClientRect().top : null,
      stageH: live.binsBottom - live.stripTop,
      binHs: slots.map((el) => { const svg = el.querySelector('svg'); return svg ? svg.getBoundingClientRect().height : 0; }),
      slackBelow: body.getBoundingClientRect().bottom - live.binsBottom,
      stacks: [722, 677].map((h) => {
        const saved = body.style.cssText;
        body.style.cssText = saved + `;flex:0 0 ${h}px;height:${h}px;max-height:${h}px;overflow:visible`;
        const bb = body.getBoundingClientRect();
        const mm = measure();
        body.style.cssText = saved;
        return { budget: h, bodyH: bb.height, fits: mm.binsBottom <= bb.bottom + 0.6 && mm.stripTop >= bb.top - 0.6, zone: mm.pillTop - mm.stripBottom, stack: mm.binsBottom - mm.stripTop };
      }),
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, html: out.html };
}

function nodeGate(name, r, block, loc, d) {
  const IDS = byId(GLOBAL);
  const per = {};
  for (const t of r.m.tiles) {
    const it = IDS[t.lcsItem];
    ok(!!it, `${name}: node gate — ${t.lcsItem} is not a bank item`);
    if (!it) continue;
    ok(it.theme === t.lcsTheme && it.noun === t.lcsNoun && it.vocabKey === t.lcsVocab && it.family === t.lcsFamily && it.material === t.lcsMaterial, `${name}: node gate — ${t.lcsItem} stamps ≠ the bank`);
    const want = TYPE._bin(it, block);
    ok(want !== null, `${name}: node gate — item ${it.id} is excluded for ${loc} but on the page`);
    ok(want === t.lcsBin, `${name}: node gate — ${it.id} stamped ${t.lcsBin} but bin(item, ${loc}) = ${want}`);
    per[t.lcsBin] = (per[t.lcsBin] || 0) + 1;
  }
  const keys = block.bins.map((b) => b.key);
  ok(r.m.slots.map((s) => s.lcsBin).join() === keys.join(), `${name}: node gate — bins ${r.m.slots.map((s) => s.lcsBin).join(',')} ≠ the block's ${keys.join(',')}`);
  block.bins.forEach((b, i) => {
    const s = r.m.slots[i], p = r.m.pills[i];
    if (!s || !p) return;
    ok(p.text === b.label, `${name}: node gate — pill ${i + 1} "${p.text}" ≠ label "${b.label}"`);
    ok(s.lcsColor === (b.color || 'none'), `${name}: node gate — bin ${b.key} colour stamp ${s.lcsColor} ≠ ${b.color || 'none'}`);
    ok(s.lcsMaterials === b.materials.join(','), `${name}: node gate — bin ${b.key} materials stamp ≠ the block`);
    const c = per[b.key] || 0;
    ok(c >= d.perBinMin && c <= Math.max(d.perBinMax, Math.ceil(d.items / keys.length)), `${name}: node gate — bin ${b.key} receives ${c}`);
  });
}

function assertRender(name, r, d, opts) {
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.stamps && r.m.stamps.lcsLayout === undefined && +r.m.stamps.lcsItems === d.items, `${name}: root stamps ${JSON.stringify(r.m.stamps)} carry a layout or ≠ items ${d.items}`);
  const N = r.m.slots.length;
  ok(N >= 2 && N <= 5 && +r.m.stamps.lcsN === N, `${name}: ${N} bins`);
  ok(r.m.tiles.length === d.items, `${name}: ${r.m.tiles.length} tiles ≠ ${d.items}`);
  const minIcon = r.m.icons.length ? Math.min(...r.m.icons) : 0;
  ok(minIcon >= MIN_ICON, `${name}: icon ${minIcon} px < the K floor ${MIN_ICON}`);
  ok(r.m.icons.every((px) => Math.abs(px - d.iconPx) < 0.6), `${name}: icons ${JSON.stringify(r.m.icons)} ≠ config ${d.iconPx}`);
  ok(r.m.tiles.every((t) => Math.abs(t.w - d.tile) < 0.6 && Math.abs(t.h - d.tile) < 0.6), `${name}: tiles ≠ ${d.tile} outer`);
  ok(r.m.strips.length === d.strips && r.m.strips.every((s) => s.w <= 675.6), `${name}: ${r.m.strips.length} strips / widths ${r.m.strips.map((s) => Math.round(s.w)).join(',')}`);
  const binW = TYPE.binWidth(N);
  ok(r.m.slots.every((s) => Math.abs(s.w - binW) < 0.6 && Math.abs(s.h - d.binH) < 0.6 && Math.abs(s.svgW - binW) < 0.6 && Math.abs(s.svgH - d.binH) < 0.6), `${name}: bins ${JSON.stringify(r.m.slots.map((s) => [Math.round(s.w), Math.round(s.h)]))} ≠ ${binW} x ${d.binH}`);
  const first = r.m.slots[0], last = r.m.slots[N - 1];
  ok(first && last && first.left - r.m.body.left >= 17 - 0.6 && r.m.body.right - last.right >= 17 - 0.6, `${name}: bin row margins ${first && Math.round(first.left - r.m.body.left)} / ${last && Math.round(r.m.body.right - last.right)} < 17`);
  ok(r.m.pills.every((p) => p.px >= 17 && p.rects === 1), `${name}: a pill under 17 px or wrapping`);
  assertPillTable(name + ' rendered pills', r.m.pills.map((p) => ({ label: p.text, w17: p.w })));
  ok(r.m.pills.every((p) => p.left >= r.m.body.left - 0.6 && p.right <= r.m.body.right + 0.6), `${name}: a pill leaves the body column`);
  ok(r.m.stage && r.m.stage.left >= r.m.body.left - 0.6 && r.m.stage.right <= r.m.body.right + 0.6, `${name}: stage outside the body column`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: the bins reach ${Math.round(r.m.lowest)} into the footer band at ${Math.round(r.m.foot)}`);
  ok(r.m.zoneBlock != null && r.m.zoneBlock >= ZONE_MIN - 0.6 && r.m.zoneBlock <= ZONE_MAX + 0.6 && Math.abs(r.m.zoneBlock - d.zone) < 0.6, `${name}: the line zone block is ${r.m.zoneBlock && Math.round(r.m.zoneBlock)} (config ${d.zone}; ${ZONE_MIN}..${ZONE_MAX})`);
  ok(r.m.zone >= ZONE_MIN - 0.6, `${name}: line zone ${Math.round(r.m.zone)} < ${ZONE_MIN} (cramped)`);
  ok(r.m.zone <= ZONE_SPARSE, `${name}: line zone ${Math.round(r.m.zone)} px > ${Math.round(ZONE_SPARSE)}: the page reads SPARSE (blank paper between the strip and the bins)`);
  ok(r.m.binHs.every((h) => Math.abs(h - d.binH) < 0.6) && d.binH >= 240, `${name}: bins drawn ${JSON.stringify(r.m.binHs.map(Math.round))} tall ≠ config ${d.binH} (>= 240)`);
  if (d.items === 8) ok(r.m.stageH >= STAGE_MIN_D2 - 0.6, `${name}: stage ${Math.round(r.m.stageH)} px < ${STAGE_MIN_D2} at d2: the apparatus does not fill the page (sparse)`);
  // the slack under the bins is measured on EVERY chrome, not only the one-line case. The one-line
  // body is the TALLER one (811 vs 799), so it is the worst case and the guard was already on it -
  // but a two-line page whose bins shrank would have been unmeasured. Measured over all 11 locales
  // x d1-d3 before this line was widened: max 166 against the 180 ceiling, so it convicts nothing.
  ok(r.m.slackBelow <= SLACK_MAX_ONE_LINE + 0.6, `${name}: ${Math.round(r.m.slackBelow)} px of slack under the bins > ${SLACK_MAX_ONE_LINE} (sparse)`);
  ok(r.m.stageTop != null && r.m.stageTop <= STAGE_TOP_MAX, `${name}: the stage floats ${Math.round(r.m.stageTop)} px below the body top (slack must fall below the bins)`);
  for (const s of r.m.stacks) {
    ok(s.fits, `${name}: the stack (${Math.round(s.stack)} px) overflows the ${s.budget} budget (body pinned to ${Math.round(s.bodyH)})`);
    ok(s.zone <= ZONE_SPARSE && s.zone >= ZONE_MIN - 0.6, `${name}: line zone ${Math.round(s.zone)} under the ${s.budget} budget is not the fixed zone (sparse / cramped)`);
  }
  if (opts && opts.block) nodeGate(name, r, opts.block, opts.loc, d);
  return { minIcon, zone: Math.round(r.m.zone), body: Math.round(r.m.bodyH), zone677: Math.round(r.m.stacks[1].zone), zone722: Math.round(r.m.stacks[0].zone), binW, stack: Math.round(r.m.stageH), slack: Math.round(r.m.slackBelow) };
}

/* ------------------------------------------------------------------ poison */
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
function collect(fn) { const before = fails.length, saved = assertions; fn(); const found = fails.splice(before); assertions = saved; return found; }
/** A locale block fixture derived from EN (the panels author the real ones): bins + literals per the design table B. */
function blockFor(en, loc, patch) {
  const b = clone(en);
  b.enAudit = 'fixture: the EN source audited by the gate, not a panel';
  Object.assign(b, patch || {});
  const f4 = b.colorConvention === 'national' && b.bins.every((x) => x.color && x.colorWord);
  if (f4) { b.refuse = (b.refuse || []).filter((x) => x !== 'color'); if (!b.strings['K-367']) b.strings['K-367'] = { title: 'Recycling Sort: Color the Bins', instruction: 'Read the name on each bin and color it in the color the legend shows.' }; }
  return b;
}
const B = (key, label, materials, packagingOnly, color, colorWord) => ({ key, label, longLabel: label, color: color || null, colorWord: colorWord || null, materials, packagingOnly: !!packagingOnly });
const FIX = {
  de: () => ({ bins: [B('papier', 'Papier', ['paper', 'cardboard'], false, 'codeBlue', 'blau'), B('verpackung', 'Verpackung', ['plastic', 'metal'], true, 'codeYellow', 'gelb'), B('bio', 'Bio', ['organic'], false, 'codeBrown', 'braun'), B('glas', 'Glas', ['glass'], true, 'codeGreen', 'grün'), B('rest', 'Rest', ['plastic'], false, 'inkSoft', 'grau')],
    route: { toothbrush: { bin: 'rest', reason: 'non-packaging plastic' }, comb: { bin: 'rest', reason: 'non-packaging plastic' }, spoon: { bin: 'rest', reason: 'non-packaging plastic' }, bucket: { bin: 'rest', reason: 'non-packaging plastic' } },
    excludeItems: { saucepan: 'Wertstoffhof: no bin on the page', bolt: 'Wertstoffhof', nut: 'Wertstoffhof' }, colorConvention: 'national', refuse: [], materialWords: { paper: 'Papier', cardboard: 'Pappe', glass: 'Glas', plastic: 'Plastik', metal: 'Metall' }, strand: 'Sachunterricht' }),
  sv: () => ({ bins: [B('papper', 'Papper', ['paper', 'cardboard'], false), B('plast', 'Plast', ['plastic'], true), B('metall', 'Metall', ['metal'], true), B('glas', 'Glas', ['glass'], true), B('matavfall', 'Matavfall', ['organic'], false)],
    excludeItems: { toothbrush: 'no restavfall among the five', bucket: 'no restavfall', comb: 'no restavfall', spoon: 'no restavfall', saucepan: 'no restavfall', bolt: 'no restavfall', nut: 'no restavfall' }, colorConvention: null, refuse: ['color'], materialWords: { paper: 'papper', cardboard: 'kartong', glass: 'glas', plastic: 'plast', metal: 'metall' }, strand: 'Naturorienterande ämnen' }),
  it: () => ({ bins: [B('carta', 'Carta', ['paper', 'cardboard'], false), B('plastica', 'Plastica', ['plastic', 'metal'], true), B('vetro', 'Vetro', ['glass'], true), B('umido', 'Umido', ['organic'], false), B('secco', 'Secco', ['plastic', 'metal'], false)],
    colorConvention: null, refuse: ['color'], materialWords: { paper: 'carta', cardboard: 'cartone', glass: 'vetro', plastic: 'plastica', metal: 'metallo' }, strand: 'Scienze' }),
  nl: () => ({ bins: [B('papier', 'Papier', ['paper', 'cardboard'], false, 'codeBlue', 'blauw'), B('gft', 'GFT', ['organic'], false, 'codeGreen', 'groen'), B('pmd', 'PMD', ['plastic', 'metal'], true, 'codeOrange', 'oranje'), B('glas', 'Glas', ['glass'], true, 'codeYellow', 'geel'), B('rest', 'Rest', ['plastic', 'metal'], false, 'inkSoft', 'grijs')],
    colorConvention: 'national', refuse: [], materialWords: { paper: 'papier', cardboard: 'karton', glass: 'glas', plastic: 'plastic', metal: 'metaal' }, strand: 'Oriëntatie op jezelf en de wereld' }),
  fi: () => ({ bins: [B('bio', 'Bio', ['organic'], false), B('paperi', 'Paperi', ['paper', 'cardboard'], false), B('lasi', 'Lasi', ['glass'], true), B('metalli', 'Metalli', ['metal'], false), B('muovi', 'Muovi', ['plastic'], true)],
    excludeItems: { toothbrush: 'no sekajäte', bucket: 'no sekajäte', comb: 'no sekajäte', spoon: 'no sekajäte' }, colorConvention: null, refuse: ['color'], materialWords: { paper: 'paperi', cardboard: 'pahvi', glass: 'lasi', plastic: 'muovi', metal: 'metalli' }, strand: 'Ympäristöoppi' }),
  fr: () => ({ bins: [B('emballages', 'Emballages', ['paper', 'cardboard', 'plastic', 'metal'], true), B('verre', 'Verre', ['glass'], true), B('biodechets', 'Biodéchets', ['organic'], false), B('ordures', 'Ordures', ['paper', 'plastic', 'metal'], false)],
    colorConvention: null, refuse: ['color'], materialWords: { paper: 'papier', cardboard: 'carton', glass: 'verre', plastic: 'plastique', metal: 'métal' }, strand: 'Questionner le monde' }),
  es: () => ({ bins: [B('organico', 'Orgánico', ['organic'], false, 'codeGreen', 'verde'), B('inorganico', 'Inorgánico', ['paper', 'cardboard', 'glass', 'plastic', 'metal'], false, 'inkSoft', 'gris')],
    colorConvention: 'national', refuse: [], materialWords: { organic: 'orgánico', paper: 'reciclable', cardboard: 'reciclable', glass: 'reciclable', plastic: 'reciclable', metal: 'reciclable' }, strand: 'Conocimiento del Medio' }),
};
function typeWith(global, block) {
  return Object.assign({}, TYPE, { build(args, ctx) { return this._buildWith({ global, block }, args, ctx); } });
}
/** The tile fragments of a built body (each `<span class="rc-tile" …>…<span class="rc-dot"></span></span>`). */
const TILE_RE = /<span class="rc-tile" [^>]*data-lcs-item="([^"]+)"[^>]*data-lcs-bin="([^"]+)"[^>]*>[\s\S]*?<span class="rc-dot"><\/span><\/span>/g;
function tileOf(it, bin, d) {
  return `<span class="rc-tile" style="width:${d.tile}px;height:${d.tile}px;padding:${(d.tile - 4 - d.iconPx) / 2}px" data-lcs-item="${it.id}" data-lcs-material="${it.material}" data-lcs-bin="${bin}" data-lcs-family="${it.family}" data-lcs-vocab="${it.vocabKey}" data-lcs-theme="${it.theme}" data-lcs-noun="${it.noun}"><img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" style="width:${d.iconPx}px;height:${d.iconPx}px"><span class="rc-dot"></span></span>`;
}


/* ------------------------------------------------------------------ faces (Phase 2, 2026-09-21; _work/K-357-faces.md) */
const { loadType } = require('../lib/load-types.js');
const FACE_ROWS = require('../tools/b4var-rows/recycling.js').ROWS;
const WEBP_THEMES = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'image-library-webp', 'themes');   // the served library: every picture a face keeps must exist here as <theme>/<noun>@2x.webp
const FACE_DIR = { K: 'k', G1: 'g1', G2: 'g2', G3: 'g3' };
const STAGE_MIN_FACE = 630;        // the reviewer's d2 floor, reused for the colour face's FIXED stack (legend -> shelf bottom)
const ROW_FILL_RATIO = 0.7;        // which / write: the row's content (chip tile / writing row) vs the row (K-355 F2 precedent)
const BOX_FILL_RATIO = 0.85;       // odd: the grown box vs its stage
const DRAW_FILL_RATIO = 0.8;       // open: the grown draw box vs the lane
/** The longest legal en/de chrome for a FACE: a 70-char 3-line title + a 150-char instruction (the base's fixture re-cut). */
const LONG_FACE = { title: 'Mülltrennung: Welche Tonne? Schau dir jedes Ding genau an und kreise ein', instruction: 'Schau dir jedes Ding an. Es ist leer oder aufgebraucht. Kreise die Tonne ein, in die es gehört: Papier, Verpackung, Bio, Glas oder Rest. Nur eine Tonne pro Zeile.'.slice(0, 150) };
const FACE_ORDER = ['K-366', 'G1-364', 'G2-348', 'K-367', 'G1-365'];
const CLS_OF = (m) => (m === 'cardboard' ? 'paper' : m);

/** Render a face through the real pipeline and measure it: root stamps, the stage vs the body / footer, the face's own numbers, and verify() re-run with the body PINNED to 722 and 677. */
async function renderFace(page, type, { locale, baseName, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty: 2, locale: locale || 'en', page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-ws-content][data-lcs-recycling]');
    const bodyEl = document.querySelector('[data-lcs-body]');
    const body = bodyEl.getBoundingClientRect();
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const px = (el) => { const im = el && el.querySelector('img'); return im ? Math.min(im.getBoundingClientRect().width, im.getBoundingClientRect().height) : 0; };
    const src = (el) => { const im = el && el.querySelector('img'); return im ? im.src : null; };
    const lowest = root ? [...root.querySelectorAll('*')].reduce((y, el) => { const r = el.getBoundingClientRect(); return r.width && r.height ? Math.max(y, r.bottom) : y; }, 0) : 0;
    const face = {};
    const layout = root ? root.dataset.lcsLayout : null;
    const markMin = (svg) => {   // the smallest drawn feature of a lid mark (px): dots r x 2, bars min(w, h), the zigzag its stroke
      const mk = svg && svg.querySelector('[data-lcs-bin-mark]');
      if (!mk) return null;
      let min = Infinity;
      for (const c of mk.children) {
        const b = c.getBBox();
        if (c.tagName === 'polyline') min = Math.min(min, parseFloat(c.getAttribute('stroke-width')) || 0);
        else min = Math.min(min, Math.min(b.width, b.height));
      }
      return min === Infinity ? null : min;
    };
    if (layout === 'which') {
      face.key = [...root.querySelectorAll('[data-lcs-key-bin]')].map((k) => { const p = k.querySelector('.rc-pill'); const svg = k.querySelector('svg'); return { bin: k.dataset.lcsKeyBin, pill: p.textContent.trim(), w: p.getBoundingClientRect().width, px: parseFloat(getComputedStyle(p).fontSize), rects: p.getClientRects().length, binW: svg.getBoundingClientRect().width, markMin: markMin(svg) }; });
      face.rows = [...root.querySelectorAll('[data-lcs-row]')].map((r) => ({ item: r.dataset.lcsItem, bin: r.dataset.lcsBin, material: r.dataset.lcsMaterial, src: src(r.querySelector('.rc-product')), picPx: px(r.querySelector('.rc-product')), h: r.getBoundingClientRect().height,
        chipOrder: r.dataset.lcsChipOrder, chips: [...r.querySelectorAll('[data-lcs-chip]')].map((c) => { const svg = c.querySelector('svg'); return { bin: c.dataset.lcsChip, tile: Math.min(c.getBoundingClientRect().width, c.getBoundingClientRect().height), tileH: c.getBoundingClientRect().height, binW: svg.getBoundingClientRect().width, markMin: markMin(svg) }; }) }));
      face.slack = foot - Math.max(...face.rows.map((_, i) => root.querySelectorAll('[data-lcs-row]')[i].getBoundingClientRect().bottom));
    } else if (layout === 'write') {
      face.rows = [...root.querySelectorAll('[data-lcs-row]')].map((r) => ({ item: r.dataset.lcsItem, word: r.dataset.lcsWord, material: r.dataset.lcsMaterial, src: src(r.querySelector('.rc-product')), picPx: px(r.querySelector('.rc-product')), h: r.getBoundingClientRect().height, text: r.textContent.trim(), wr: r.querySelectorAll('[data-lcs-prim="writing-row"]').length, wrH: (r.querySelector('[data-lcs-prim="writing-row"]') || { getBoundingClientRect: () => ({ height: 0 }) }).getBoundingClientRect().height }));
      face.bank = [...root.querySelectorAll('[data-lcs-bank-word]')].map((w) => ({ word: w.textContent.trim(), px: parseFloat(getComputedStyle(w).fontSize), top: Math.round(w.getBoundingClientRect().top) }));
      const bn = root.querySelector('[data-lcs-bank-banner]');
      face.bankRects = bn ? bn.getClientRects().length : 0;
      face.bankW = bn ? [...bn.querySelectorAll('[data-lcs-bank-word]')].reduce((s, w) => s + w.getBoundingClientRect().width, 0) : 0;
      face.slack = foot - Math.max(...face.rows.map((_, i) => root.querySelectorAll('[data-lcs-row]')[i].getBoundingClientRect().bottom));
    } else if (layout === 'odd') {
      face.cards = [...root.querySelectorAll('[data-lcs-card]')].map((c) => ({ trio: c.dataset.lcsTrio, h: c.getBoundingClientRect().height, stageH: (c.querySelector('.ws-card-stage') || c).getBoundingClientRect().height, items: [...c.querySelectorAll('[data-lcs-item]')].map((b) => ({ item: b.dataset.lcsItem, material: b.dataset.lcsMaterial, cls: b.dataset.lcsClass, vocab: b.dataset.lcsVocab, odd: b.dataset.lcsOdd === '1', src: src(b), px: px(b), box: Math.min(b.getBoundingClientRect().width, b.getBoundingClientRect().height) })) }));
      face.slack = foot - Math.max(...[...root.querySelectorAll('[data-lcs-card]')].map((c) => c.getBoundingClientRect().bottom));
    } else if (layout === 'color') {
      const banner = root.querySelector('[data-lcs-legend-banner]');
      face.legend = [...root.querySelectorAll('[data-lcs-legend]')].map((e) => { const sw = e.querySelector('svg'); const spans = [...e.querySelectorAll('span')].filter((s) => s.textContent.trim()); return { bin: e.dataset.lcsLegend, color: e.dataset.lcsColor, swatch: sw ? sw.getBoundingClientRect().width : 0, fill: (sw && sw.querySelector('rect').getAttribute('fill')) || null, words: spans.map((s) => s.textContent.trim()), px: Math.min(...spans.map((s) => parseFloat(getComputedStyle(s).fontSize))) }; });
      face.slots = [...root.querySelectorAll('.rc-binslot[data-lcs-bin]')].map((s) => { const p = s.querySelector('.rc-pill'); const svg = s.querySelector('svg'); return { bin: s.dataset.lcsBin, color: s.dataset.lcsColor, pill: p.textContent.trim(), w: p.getBoundingClientRect().width, px: parseFloat(getComputedStyle(p).fontSize), rects: p.getClientRects().length, binW: svg.getBoundingClientRect().width, binH: svg.getBoundingClientRect().height, fills: [...svg.querySelectorAll('[data-lcs-bin-part] rect, [data-lcs-bin-part] path')].map((x) => x.getAttribute('fill')), mark: !!svg.querySelector('[data-lcs-bin-mark]'), fillKey: svg.querySelector('[data-lcs-bin-fillgroup]').dataset.lcsFill }; });
      face.shelves = [...root.querySelectorAll('[data-lcs-shelf]')].map((sh) => ({ h: sh.getBoundingClientRect().height, left: sh.getBoundingClientRect().left, examples: [...sh.querySelectorAll('[data-lcs-example]')].map((e) => ({ item: e.dataset.lcsExample, bin: e.dataset.lcsBin, src: src(e), px: px(e) })) }));
      const shelfBottom = Math.max(...face.shelves.map((_, i) => root.querySelectorAll('[data-lcs-shelf]')[i].getBoundingClientRect().bottom));
      face.stack = banner ? shelfBottom - banner.getBoundingClientRect().top : 0;
      face.slack = body.bottom - shelfBottom;
    } else if (layout === 'open') {
      face.lanes = [...root.querySelectorAll('[data-lcs-lane]')].map((l) => { const b = l.querySelector('[data-lcs-drawbox]'); const st = l.querySelector('[data-lcs-starter]'); return { h: l.getBoundingClientRect().height, drawW: b ? b.getBoundingClientRect().width : 0, drawH: b ? b.getBoundingClientRect().height : 0, rows: l.querySelectorAll('[data-lcs-ruling-row]').length, text: l.textContent.trim(), starter: st ? st.textContent : null, starterPx: st ? +st.dataset.lcsStarterPx : null, starterW: st ? st.getBBox().width : null }; });
      face.slack = foot - Math.max(...[...root.querySelectorAll('[data-lcs-lane]')].map((l) => l.getBoundingClientRect().bottom));
    }
    return { stamps: root ? { ...root.dataset } : null, body: rect(bodyEl), foot, stage: root ? rect(root) : null, lowest, face, bodyH: body.height };
  });
  // the 722 / 677 pins: pin the body, re-run verify() on the re-flowed layout, measure the lowest content against the pinned body
  const pins = [];
  for (const h of [722, 677]) {
    await page.evaluate((hh) => { const b = document.querySelector('[data-lcs-body]'); b.dataset.savedCss = b.style.cssText; b.style.cssText = b.dataset.savedCss + `;flex:0 0 ${hh}px;height:${hh}px;max-height:${hh}px;overflow:visible`; }, h);
    const v = await type.verify(page);
    const mm = await page.evaluate(() => {
      const root = document.querySelector('[data-ws-content][data-lcs-recycling]');
      const b = document.querySelector('[data-lcs-body]').getBoundingClientRect();
      const low = root ? [...root.querySelectorAll('*')].reduce((y, el) => { const r = el.getBoundingClientRect(); return r.width && r.height ? Math.max(y, r.bottom) : y; }, 0) : 0;
      return { bodyH: b.height, inside: low <= b.bottom + 0.6, low: low - b.top };
    });
    await page.evaluate(() => { const b = document.querySelector('[data-lcs-body]'); b.style.cssText = b.dataset.savedCss; delete b.dataset.savedCss; });
    pins.push({ budget: h, bodyH: mm.bodyH, verify: v, inside: mm.inside, stack: mm.low, ok: v.length === 0 && mm.inside && Math.abs(mm.bodyH - h) < 1 });
  }
  m.pins = pins;
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, html: out.html, meta: out.meta };
}

/** A face type over an injected bank {global, block}: the emitted spec's config + the base's builders. */
function faceType(id, global, block) {
  const spec = loadType(id);
  return Object.assign({}, spec, { build(args, ctx) { return this._buildWith({ global, block }, args, ctx); } });
}
const srcPair = (u) => { const p = decodeURIComponent(u || '').split('/'); return (p[p.length - 2] || '') + '/' + (p[p.length - 1] || '').replace(/@\dx\.webp$/, ''); };
const wantSrc = (it) => srcPair(fileUri(it.theme, it.noun));

/** The gate's own assertions per face (beyond verify + lints): stamps, floors, the stage vs the body, the pins, the node cross-checks with the bank. Returns a one-line note. */
function assertFace(name, r, d, face, { block, loc, oneLine }) {
  const IDS = byId(GLOBAL);
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.stamps && r.m.stamps.lcsLayout === face, `${name}: root layout stamp ${r.m.stamps && r.m.stamps.lcsLayout} ≠ ${face}`);
  ok(r.m.stage && r.m.stage.left >= r.m.body.left - 0.6 && r.m.stage.right <= r.m.body.right + 0.6, `${name}: stage outside the body column`);
  ok(r.m.stage && r.m.stage.top <= r.m.body.top + STAGE_TOP_MAX, `${name}: the stage floats ${Math.round(r.m.stage.top - r.m.body.top)} px under the body top`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: content reaches ${Math.round(r.m.lowest)} into the footer band at ${Math.round(r.m.foot)}`);
  for (const p of r.m.pins) ok(p.ok, `${name}: with the body pinned to ${p.budget} (${Math.round(p.bodyH)}): verify ${JSON.stringify(p.verify.slice(0, 3))}, inside ${p.inside} (stack ${Math.round(p.stack)})`);
  const F = r.m.face;
  const keys = block.bins.map((b) => b.key);
  const fence = { fams: new Set(), vocab: new Set(), ids: new Set() };
  const bankItem = (id, what) => {
    const it = IDS[id];
    ok(!!it, `${name}: node gate — ${what} ${id} is not a bank item`);
    if (!it) return null;
    ok(!fence.fams.has(it.family) && !fence.vocab.has(it.vocabKey) && !fence.ids.has(it.id), `${name}: node gate — ${what} ${id}: family / vocab / id twice on the page`);
    fence.fams.add(it.family); fence.vocab.add(it.vocabKey); fence.ids.add(it.id);
    return it;
  };
  const nb = GLOBAL.pageRules.neverBoth;
  let note = '';
  if (face === 'which') {
    ok(F.rows.length === d.rows, `${name}: ${F.rows.length} rows ≠ ${d.rows}`);
    ok(F.key.map((k) => k.bin).join() === keys.join(), `${name}: key strip ${F.key.map((k) => k.bin).join(',')} ≠ the block's bins`);
    F.key.forEach((k, i) => { ok(k.pill === block.bins[i].label, `${name}: key pill "${k.pill}" ≠ label "${block.bins[i].label}"`); ok(k.px >= d.keyPx && k.rects === 1, `${name}: key pill "${k.pill}" under ${d.keyPx} px or wrapping`); ok(k.binW >= 56 - 0.6, `${name}: key bin ${Math.round(k.binW)} < 56`); if (i > 0) ok(k.markMin != null && k.markMin >= 2 - 0.05, `${name}: key ${i + 1} mark feature ${k.markMin} < 2 px`); });
    assertPillTable(`${name} key pills (15 px)`, F.key.map((k) => ({ label: k.pill, w15: k.w })), 'w15');
    const bins = new Set();
    F.rows.forEach((row, i) => {
      const it = bankItem(row.item, `row ${i + 1}`);
      if (!it) return;
      const want = TYPE._bin(it, block);
      ok(want !== null && want === row.bin, `${name}: node gate — row ${i + 1} ${it.id} stamped ${row.bin} but bin(item, ${loc}) = ${want}`);
      ok(srcPair(row.src) === wantSrc(it), `${name}: node gate — row ${i + 1} picture ${srcPair(row.src)} ≠ fileUri ${wantSrc(it)}`);
      ok(row.material === it.material, `${name}: node gate — row ${i + 1} material stamp ≠ the bank`);
      ok(row.chipOrder === keys.join(','), `${name}: row ${i + 1} chips ${row.chipOrder} ≠ the block order`);
      ok(row.picPx >= Math.max(MIN_ICON, d.iconPx) - 0.6, `${name}: row ${i + 1} picture ${Math.round(row.picPx)} < ${Math.max(MIN_ICON, d.iconPx)}`);
      row.chips.forEach((c, k) => { ok(c.tile >= d.chipTile - 0.6 && c.binW >= d.chipBin - 0.6, `${name}: row ${i + 1} chip ${k + 1} tile ${Math.round(c.tile)} / bin ${Math.round(c.binW)} under ${d.chipTile} / ${d.chipBin}`); if (k > 0) ok(c.markMin != null && c.markMin >= 2 - 0.05, `${name}: row ${i + 1} chip ${k + 1} mark feature ${c.markMin} < 2 px at ${d.chipBin} wide`); });
      ok(row.chips.length && row.chips[0].tileH >= ROW_FILL_RATIO * row.h, `${name}: row ${i + 1} chip tile ${Math.round(row.chips[0].tileH)} < ${ROW_FILL_RATIO} of the row ${Math.round(row.h)} (sparse)`);
      bins.add(row.bin);
    });
    ok(bins.size >= Math.min(keys.length, 4), `${name}: ${bins.size} distinct answer bins < ${Math.min(keys.length, 4)}`);
    for (const [a, b] of nb) ok(!(fence.ids.has(a) && fence.ids.has(b)), `${name}: ${a} + ${b} on one page`);
    note = `rows ${F.rows.map((x) => Math.round(x.h)).join('/')} answers ${F.rows.map((x) => x.bin).join(',')}`;
  } else if (face === 'write') {
    ok(F.rows.length === d.rows, `${name}: ${F.rows.length} rows ≠ ${d.rows}`);
    const mw = block.materialWords;
    const used = {};
    F.rows.forEach((row, i) => {
      const it = bankItem(row.item, `row ${i + 1}`);
      if (!it) return;
      ok(row.word === mw[it.material], `${name}: node gate — row ${i + 1} word "${row.word}" ≠ materialWords.${it.material} "${mw[it.material]}"`);
      ok(srcPair(row.src) === wantSrc(it), `${name}: node gate — row ${i + 1} picture ${srcPair(row.src)} ≠ fileUri ${wantSrc(it)}`);
      ok(row.picPx >= Math.max(44, d.iconPx) - 0.6, `${name}: row ${i + 1} picture ${Math.round(row.picPx)} < ${Math.max(44, d.iconPx)}`);
      ok(row.wr === 1 && row.text === String(i + 1), `${name}: row ${i + 1} writing rows ${row.wr} / text "${row.text}"`);
      ok(row.wrH + 4 >= ROW_FILL_RATIO * row.h, `${name}: row ${i + 1} writing row ${Math.round(row.wrH + 4)} < ${ROW_FILL_RATIO} of the row ${Math.round(row.h)} (sparse)`);
      used[row.word] = (used[row.word] || 0) + 1;
    });
    const words = [...new Set(Object.values(mw))];
    const perWordMax = Math.max(3, Math.ceil(d.rows / words.length));
    for (const w of words) ok(used[w] >= 1 && used[w] <= perWordMax, `${name}: word "${w}" used ${used[w] || 0} (1..${perWordMax})`);
    if (d.bank) {
      ok(F.bank.map((b) => b.word).slice().sort().join() === words.slice().sort().join(), `${name}: bank ${F.bank.map((b) => b.word).join(',')} ≠ the locale's material words`);
      ok(F.bank.every((b) => b.px >= d.bankPx), `${name}: a bank word under ${d.bankPx} px`);
      ok(F.bankRects === 1 && new Set(F.bank.map((b) => b.top)).size === 1, `${name}: the bank wraps (${F.bankRects} rects)`);
      ok(F.bankW <= 663, `${name}: bank words ${Math.round(F.bankW)} px > 663`);
      const first = []; for (const row of F.rows) if (!first.includes(row.word)) first.push(row.word);
      ok(F.bank.map((b) => b.word).join('|') !== first.join('|'), `${name}: the bank follows the row order`);
    }
    for (const [a, b] of nb) ok(!(fence.ids.has(a) && fence.ids.has(b)), `${name}: ${a} + ${b} on one page`);
    note = `rows ${F.rows.map((x) => Math.round(x.h)).join('/')} words ${F.rows.map((x) => x.word).join(',')} bank ${F.bank.map((b) => b.word).join('/')}`;
  } else if (face === 'odd') {
    ok(F.cards.length === d.rows, `${name}: ${F.cards.length} cards ≠ ${d.rows}`);
    const classes = TYPE._trioClasses(GLOBAL);
    ok(new Set(F.cards.map((c) => c.trio)).size === F.cards.length && F.cards.every((c) => classes[c.trio]), `${name}: trio classes ${F.cards.map((c) => c.trio).join(',')} not distinct / unknown`);
    let prevOdd = -1;
    F.cards.forEach((card, i) => {
      ok(card.items.length === 4, `${name}: card ${i + 1} has ${card.items.length} items`);
      card.items.forEach((b, k) => {
        const it = bankItem(b.item, `card ${i + 1} box ${k + 1}`);
        if (!it) return;
        ok(b.material === it.material && b.cls === CLS_OF(it.material) && b.vocab === it.vocabKey, `${name}: node gate — card ${i + 1} box ${k + 1} stamps ≠ the bank`);
        ok(srcPair(b.src) === wantSrc(it), `${name}: node gate — card ${i + 1} box ${k + 1} picture ${srcPair(b.src)} ≠ fileUri ${wantSrc(it)}`);
        ok(b.px >= d.iconPx - 0.6, `${name}: card ${i + 1} box ${k + 1} picture ${Math.round(b.px)} < ${d.iconPx}`);
      });
      const same = card.items.filter((b) => b.cls === card.trio), odd = card.items.filter((b) => b.odd);
      ok(same.length === 3 && odd.length === 1 && odd[0].cls !== card.trio, `${name}: card ${i + 1} is not 3 + 1 (${card.items.map((b) => b.cls).join(',')})`);
      if (!d.organicOdd) ok(odd.length && odd[0].cls !== 'organic', `${name}: card ${i + 1} odd one organic on organicOdd:false`);
      const oi = card.items.findIndex((b) => b.odd);
      ok(oi !== prevOdd, `${name}: card ${i + 1} odd column repeats the row above`);
      prevOdd = oi;
      const sizes = card.items.map((b) => b.px);
      ok(Math.max(...sizes) - Math.min(...sizes) <= 0.6, `${name}: card ${i + 1} pictures ${sizes.map(Math.round).join('/')} not one size`);
      const inner = card.stageH - 12;
      card.items.forEach((b, k) => ok(b.box >= Math.min(d.boxMax, inner) - 0.6 && b.box >= BOX_FILL_RATIO * inner, `${name}: card ${i + 1} box ${k + 1} ${Math.round(b.box)} in a ${Math.round(inner)} stage does not grow (sparse)`));
    });
    for (const [a, b] of nb) ok(!(fence.ids.has(a) && fence.ids.has(b)), `${name}: ${a} + ${b} on one page`);
    note = `cards ${F.cards.map((c) => Math.round(c.h)).join('/')} boxes ${F.cards.map((c) => Math.round(c.items[0].box)).join('/')} pics ${F.cards.map((c) => Math.round(c.items[0].px)).join('/')} trio ${F.cards.map((c) => c.trio).join(',')} odd cols ${F.cards.map((c) => c.items.findIndex((b) => b.odd) + 1).join('')}`;
  } else if (face === 'color') {
    ok(F.slots.map((s) => s.bin).join() === keys.join(), `${name}: bins ${F.slots.map((s) => s.bin).join(',')} ≠ the block's`);
    ok(F.legend.length === keys.length && F.legend.map((e) => e.bin).slice().sort().join() === keys.slice().sort().join(), `${name}: legend ${F.legend.map((e) => e.bin).join(',')} ≠ the bin set`);
    ok(F.legend.filter((e, i) => e.bin !== keys[i]).length >= Math.min(3, keys.length), `${name}: the legend follows the bin order`);
    F.legend.forEach((e) => {
      const b = block.bins.find((x) => x.key === e.bin);
      ok(b && e.color === b.color && e.words.join('|') === b.colorWord + '|' + b.label, `${name}: legend ${e.bin} ${JSON.stringify(e.words)} / ${e.color} ≠ the block (${b && b.colorWord} / ${b && b.label} / ${b && b.color})`);
      ok(e.swatch >= 22 - 0.6 && e.px >= d.legendPx, `${name}: legend ${e.bin} swatch ${Math.round(e.swatch)} / words ${e.px} px`);
      ok((e.fill || '').toUpperCase() === ((tokens.codeColors[e.color] || (e.color === 'inkSoft' ? tokens.color.inkSoft : '')) || '').toUpperCase(), `${name}: legend ${e.bin} swatch ${e.fill} ≠ the token ${e.color}`);
    });
    ok(new Set(F.legend.map((e) => e.color)).size === F.legend.length, `${name}: two legend entries share a colour`);
    F.slots.forEach((s, i) => {
      const b = block.bins[i];
      ok(s.pill === b.label && s.px >= 17 && s.rects === 1, `${name}: bin ${i + 1} pill "${s.pill}" ≠ "${b.label}" / under 17 / wraps`);
      ok(s.color === b.color && s.fillKey === b.color, `${name}: bin ${i + 1} colour stamp ${s.color} / fill group ${s.fillKey} ≠ ${b.color}`);
      ok(s.fills.length === 4 && s.fills.every((f) => (f || '').toUpperCase() === '#FFFFFF'), `${name}: bin ${i + 1} parts ${s.fills.join(',')} not all white`);
      ok(!s.mark, `${name}: bin ${i + 1} draws a lid mark on the colour face`);
      ok(Math.abs(s.binW - TYPE.binWidth(keys.length)) < 0.6 && Math.abs(s.binH - d.binH) < 0.6, `${name}: bin ${i + 1} ${Math.round(s.binW)} x ${Math.round(s.binH)} ≠ ${TYPE.binWidth(keys.length)} x ${d.binH}`);
    });
    assertPillTable(`${name} pills`, F.slots.map((s) => ({ label: s.pill, w17: s.w })));
    ok(F.shelves.length === keys.length, `${name}: ${F.shelves.length} shelves ≠ ${keys.length}`);
    F.shelves.forEach((sh, i) => {
      ok(sh.examples.length === d.examples, `${name}: shelf ${i + 1} ${sh.examples.length} examples ≠ ${d.examples}`);
      const fams = new Set();
      sh.examples.forEach((e, k) => {
        const it = bankItem(e.item, `shelf ${i + 1} example ${k + 1}`);
        if (!it) return;
        ok(e.bin === keys[i] && TYPE._bin(it, block) === keys[i], `${name}: node gate — shelf ${i + 1} example ${it.id} → bin(item, ${loc}) = ${TYPE._bin(it, block)}, shelf bin ${keys[i]}`);
        ok(srcPair(e.src) === wantSrc(it), `${name}: node gate — shelf ${i + 1} example ${k + 1} picture ${srcPair(e.src)} ≠ fileUri ${wantSrc(it)}`);
        ok(e.px >= Math.max(MIN_ICON, d.pic) - 0.6, `${name}: shelf ${i + 1} example ${k + 1} picture ${Math.round(e.px)} < ${Math.max(MIN_ICON, d.pic)}`);
        ok(!fams.has(it.family), `${name}: shelf ${i + 1}: two examples of family ${it.family}`); fams.add(it.family);
      });
    });
    ok(F.stack >= STAGE_MIN_FACE - 0.6, `${name}: stack ${Math.round(F.stack)} < ${STAGE_MIN_FACE}: the apparatus does not fill the page (sparse)`);
    // same widening as the bins guard above: measured 0 px on every correct shelves render across
    // all 11 locales x d1-d3 and both chromes, so checking every chrome convicts nothing.
    ok(F.slack <= SLACK_MAX_ONE_LINE + 0.6, `${name}: ${Math.round(F.slack)} px of slack under the shelves > ${SLACK_MAX_ONE_LINE} (sparse)`);
    for (const [a, b] of nb) ok(!(fence.ids.has(a) && fence.ids.has(b)), `${name}: ${a} + ${b} on one page`);
    note = `stack ${Math.round(F.stack)} slack ${Math.round(F.slack)} legend ${F.legend.map((e) => e.bin).join(',')} examples ${F.shelves.map((s) => s.examples.map((e) => e.item).join('+')).join(' ')}`;
  } else if (face === 'open') {
    ok(F.lanes.length === d.lanes, `${name}: ${F.lanes.length} lanes ≠ ${d.lanes}`);
    F.lanes.forEach((l, i) => {
      ok(Math.abs(l.drawW - d.draw.w) < 0.6 && l.drawH >= d.draw.h - 0.6, `${name}: lane ${i + 1} draw box ${Math.round(l.drawW)} x ${Math.round(l.drawH)} under ${d.draw.w} x ${d.draw.h}`);
      ok(l.drawH >= DRAW_FILL_RATIO * (l.h - 20), `${name}: lane ${i + 1} draw box ${Math.round(l.drawH)} < ${DRAW_FILL_RATIO} of the lane (sparse)`);
      ok(l.rows === d.rows, `${name}: lane ${i + 1} ${l.rows} ruling rows ≠ ${d.rows}`);
      if (!d.starters) ok(l.text === String(i + 1) && l.starter === null, `${name}: lane ${i + 1} prints "${l.text}" (open: badge only)`);
      else ok(l.starter && l.starterPx > 0 && l.starterW <= 0.35 * d.rulingW, `${name}: lane ${i + 1} starter "${l.starter}" ${l.starterW && Math.round(l.starterW)} px > ${0.35 * d.rulingW}`);
    });
    note = `lanes ${F.lanes.map((l) => Math.round(l.h)).join('/')} draw ${F.lanes.map((l) => Math.round(l.drawH)).join('/')}${d.starters ? ' starters ' + F.lanes.map((l) => Math.round(l.starterW)).join('/') : ''}`;
  }
  return { body: Math.round(r.m.bodyH), stage: r.m.stage ? Math.round(r.m.stage.h) : 0, lowest: Math.round(r.m.lowest), foot: Math.round(r.m.foot), slack: Math.round(F.slack), note };
}

/* ------------------------------------------------------------------ main */
async function main() {
  const mod = bankModule('recycling');
  const locales = Object.keys(mod);
  const en = mod.en;
  // 1. bank (control)
  {
    const f = validateGlobal(GLOBAL);
    ok(f.length === 0, `global: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    const per = Object.fromEntries(Object.entries(CLASSES).map(([c, mats]) => [c, GLOBAL.items.filter((it) => mats.includes(it.material)).length]));
    console.log(`global: ${GLOBAL.items.length} items; per class ${Object.entries(per).map(([c, n]) => `${c} ${n}`).join(' · ')}`);
  }
  for (const loc of locales) {
    const f = validateBank(mod[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    const w = bankWarnings(mod[loc], loc);
    console.log(`bank ${loc}: bins ${mod[loc].bins.map((b) => `${b.key}(${TYPE._poolFor(b.key, mod[loc]).length})`).join(' · ')}; refuse ${JSON.stringify(mod[loc].refuse)}; strand "${mod[loc].strand}"${w.length ? '\n  WARN ' + w.join('\n  WARN ') : ''}`);
  }

  // 2. renders
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    for (const loc of locales) {
      for (const d of [1, 2, 3]) {
        const strings = mod[loc].strings[BASE_ID];
        const declared = LEVEL_REFUSALS[`${loc}|${d}`];
        let r;
        try { r = await renderWith(page, TYPE, { difficulty: d, locale: loc, baseName: `K-357-gate-d${d}-${loc}`, strings }); }
        catch (e) {
          if (!declared) throw e;                       // an undeclared cell must build
          console.log(`render d${d} ${loc}: DECLARED REFUSAL — ${declared}`);
          continue;
        }
        // a declared refusal that suddenly builds means the list has rotted — shrink it deliberately
        ok(!declared, `d${d} ${loc}: declared a LEVEL_REFUSALS refusal but it BUILDS — drop the entry`);
        const s = assertRender(`d${d} ${loc}`, r, TYPE.difficulty[d], { block: mod[loc], loc, oneLine: loc === 'en' });
        pngs.push(r.png);
        console.log(`render d${d} ${loc}: verify ${r.verify.length} lints ${r.lints.length} icons ${s.minIcon} bins ${r.m.slots.length} x ${s.binW} zone ${s.zone} stack ${s.stack} body ${s.body} slack-below ${s.slack} (zone at 722 ${s.zone722} / 677 ${s.zone677}; fits ${r.m.stacks[0].fits} / ${r.m.stacks[1].fits}) pills ${r.m.pills.map((p) => p.w.toFixed(1)).join('/')}`);
        if (d === 2) {
          await page.evaluate(() => { document.querySelector('[data-lcs-page]').style.filter = 'grayscale(1)'; });
          const grey = path.join(OUT, `K-357-gate-d2-${loc}-grey.png`);
          await (await page.$('[data-lcs-page]')).screenshot({ path: grey });
          await page.evaluate(() => { document.querySelector('[data-lcs-page]').style.filter = ''; });
          pngs.push(grey);
        }
      }
      // R1 on every authored table with the shell fonts (17 px base pills + 15 px key pills)
      const table = await measurePills(page, mod[loc].bins.map((b) => b.label));
      assertPillTable(`table ${loc}`, table, 'w17');
      assertPillTable(`key ${loc}`, table, 'w15', PILL_MAX, HALF_SUM_MAX);
      console.log(`widths ${loc}: ${table.map((t) => `${t.label} ${t.w17.toFixed(1)}/${t.w15.toFixed(1)}`).join(' · ')} (<= ${PILL_MAX}, adjacent half-sums <= ${HALF_SUM_MAX})`);
    }
    // the long-chrome fixture: a 3-line de title + a 150-char instruction (the tallest chrome the 70 / 150 limits produce)
    const LONG = { title: 'Mülltrennung: Wohin kommt es, wenn es leer ist? Zeichne eine Linie zur', instruction: 'Jedes Ding ist leer oder aufgebraucht. Zeichne von jedem Bild eine Linie zu der Tonne, in die es gehört: Papier, Verpackung, Bio, Glas oder Rest. Eine Linie pro Bild.'.slice(0, 150) };
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, locale: 'en', baseName: `K-357-gate-d${d}-en-longchrome`, strings: LONG });
      const s = assertRender(`d${d} long chrome`, r, TYPE.difficulty[d], { block: en, loc: 'en' });
      pngs.push(r.png);
      console.log(`render d${d} long chrome (title ${[...LONG.title].length} / instruction ${[...LONG.instruction].length} chars): verify ${r.verify.length} lints ${r.lints.length} body ${s.body} zone ${s.zone}`);
    }

    // 3. seed sweep (build only)
    if (!QUICK) {
      const sets = new Set(), perBin = {};
      const IDS = byId(GLOBAL);
      const rules = GLOBAL.pageRules;
      for (let k = 1; k <= 20; k++) {
        const rng = makeRng(instanceSeed({ typeId: BASE_ID, theme: null, difficulty: 2, seedEpoch: k }));
        const b = TYPE.build({ theme: null, difficulty: 2, locale: 'en' }, { rng });
        const items = b.meta.items.map((id) => IDS[id]);
        ok(items.length === 8 && items.every(Boolean), `sweep seed ${k}: ${b.meta.items.length} items`);
        ok(new Set(items.map((it) => it.family)).size === items.length, `sweep seed ${k}: a family twice`);
        ok(new Set(items.map((it) => it.vocabKey)).size === items.length, `sweep seed ${k}: a vocab key twice`);
        for (const key of b.meta.bins) {
          const pos = b.meta.items.map((id, i) => (TYPE._bin(IDS[id], en) === key ? i : -1)).filter((i) => i >= 0);
          ok(pos.length >= 1 && pos.length <= 2, `sweep seed ${k}: bin ${key} receives ${pos.length}`);
          ok(!(pos.length >= 2 && pos[pos.length - 1] - pos[0] === pos.length - 1), `sweep seed ${k}: bin ${key} tiles adjacent (leak)`);
          perBin[key] = perBin[key] || new Set();
          pos.forEach((i) => perBin[key].add(b.meta.items[i]));
        }
        for (const [a, c] of rules.neverBoth) ok(!(b.meta.items.includes(a) && b.meta.items.includes(c)), `sweep seed ${k}: ${a} + ${c} on one page`);
        for (let i = 0; i + 1 < b.meta.items.length; i++) for (const [a, c] of rules.neverAdjacent) ok(!((b.meta.items[i] === a && b.meta.items[i + 1] === c) || (b.meta.items[i] === c && b.meta.items[i + 1] === a)), `sweep seed ${k}: ${a} next to ${c}`);
        sets.add(b.meta.items.slice().sort().join(','));
      }
      ok(sets.size >= 2, `sweep: only ${sets.size} distinct item sets over 20 seeds`);
      for (const [key, s] of Object.entries(perBin)) ok(s.size >= 3, `sweep: bin ${key} shows only ${s.size} distinct items over 20 seeds`);
      console.log(`sweep: 20 seeds clean, ${sets.size} distinct item sets; per bin ${Object.entries(perBin).map(([k, s]) => `${k} ${s.size}`).join(' · ')}`);
    }


    // 5. THE FACES (Phase 2): rows ≡ spec ≡ strings; every face rendered at d2 en (K-367 on the de fixture: en REFUSES it) +
    //    the long face chrome + the 722 / 677 pins; the N = 2 (es) and N = 4 (fr) bin sets on the bin-bearing faces; floors;
    //    node cross-checks with the bank; every picture on disk
    const faceD = {};
    {
      const alloc = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'docs', 'worksheet-gen', 'b4-designs', '_records', 'b4var-id-allocation.json'), 'utf8')).faces.filter((a) => a.family === 'K-357');
      ok(FACE_ROWS.length === 5 && FACE_ROWS.map((r) => r[1]).join() === FACE_ORDER.join(), `rows: ids ${FACE_ROWS.map((r) => r[1]).join(',')} ≠ ${FACE_ORDER.join(',')}`);
      for (const row of FACE_ROWS) {
        const [dir, id, slug, baseFile, src, over, title, instr, extra] = row;
        const a = alloc.find((x) => x.id === id);
        ok(a && a.dir === dir && FACE_DIR[a.band] === dir, `rows: ${id} dir ${dir} ≠ the allocation's ${a && a.dir}`);
        ok(baseFile === 'K-357-recycling.js' && src === 2, `rows: ${id} base ${baseFile} / src ${src}`);
        ok(over.layout === FACE_IDS[id], `rows: ${id} layout ${over.layout} ≠ ${FACE_IDS[id]}`);
        ok(a && (a.band === 'K' ? extra === undefined : extra && extra.gradeBand === a.band), `rows: ${id} extra ${JSON.stringify(extra)} ≠ band ${a && a.band}`);
        ok(!WORKSHEET_WORD.test(title) && !ANSWER_KEY.test(title + ' ' + instr) && [...instr].length <= 150 && !freeClaim.hit(title + ' ' + instr), `rows: ${id} title / instruction "${title}" / "${instr}"`);
        let spec = null;
        try { spec = loadType(id); } catch (e) { ok(false, `rows: ${id} spec not on disk (${e.message}) — run tools/gen-b4var-specs.js`); }
        if (spec) {
          ok(spec.slug === slug && spec.exerciseType === 'recycling' && spec.themeAxis && spec.themeAxis.applicable === false, `rows: ${id} spec slug / type / themeAxis`);
          ok(JSON.stringify(spec.difficulty[2]) === JSON.stringify({ ...TYPE.difficulty[2], ...over }), `rows: ${id} resolved d2 ≠ base d2 + overrides`);
          ok(JSON.stringify(spec.difficulty[1]) === JSON.stringify(spec.difficulty[2]) && JSON.stringify(spec.difficulty[3]) === JSON.stringify(spec.difficulty[2]), `rows: ${id} d1 / d3 ≠ d2 (one config for all levels)`);
          ok(spec.gradeBand === (a ? a.band : null), `rows: ${id} gradeBand ${spec.gradeBand} ≠ ${a && a.band}`);
          ok(spec.i18n.en.title === title && spec.i18n.en.instruction === instr, `rows: ${id} spec strings ≠ the row`);
          faceD[id] = spec.difficulty[2];
        }
        if (id === 'K-367') {
          ok(!en.strings['K-367'] && en.refuse.includes('color'), 'rows: K-367 — en must carry NO K-367 string and refuse color (no national colour convention)');
          const fx = blockFor(en, 'de', FIX.de());
          ok(fx.strings['K-367'].title === title && fx.strings['K-367'].instruction === instr, 'rows: K-367 row strings ≠ the §6 candidate the fixtures carry');
        } else ok(en.strings[id] && en.strings[id].title === title && en.strings[id].instruction === instr, `rows: ${id} row strings ≠ en.strings[${id}] (one source)`);
      }
      const cfgs = FACE_ORDER.map((id) => JSON.stringify(faceD[id]));
      ok(new Set(cfgs).size === 5 && cfgs.every((c) => c !== JSON.stringify(TYPE.difficulty[2])), 'rows: two faces (or a face and the base) resolve to one config');
    }
    const faceRefs = new Set();
    const collectRefs = (r, face) => {
      const F = r.m.face;
      const add = (s) => { if (s) faceRefs.add(srcPair(s)); };
      if (face === 'which' || face === 'write') F.rows.forEach((row) => add(row.src));
      if (face === 'odd') F.cards.forEach((c) => c.items.forEach((b) => add(b.src)));
      if (face === 'color') F.shelves.forEach((s) => s.examples.forEach((e) => add(e.src)));
    };
    const faceRenders = {};
    const renderOne = async (id, face, block, loc, strings, tag, oneLine) => {
      const t = faceType(id, GLOBAL, block);
      const r = await renderFace(page, t, { locale: loc, baseName: `${id}-gate-d2-${tag}`, strings });
      const s = assertFace(`${id} ${face} ${tag}`, r, faceD[id], face, { block, loc, oneLine });
      pngs.push(r.png);
      collectRefs(r, face);
      console.log(`render ${id} ${face} ${tag}: verify ${r.verify.length} lints ${r.lints.length} body ${s.body} stage ${s.stage} lowest ${s.lowest} vs foot ${s.foot} slack ${s.slack} ${s.note} (pins 722 ${r.m.pins[0].ok ? 'ok' : 'FAIL'} / 677 ${r.m.pins[1].ok ? 'ok' : 'FAIL'})`);
      return r;
    };
    const FX = { de: blockFor(en, 'de', FIX.de()), es: blockFor(en, 'es', FIX.es()), fr: blockFor(en, 'fr', FIX.fr()), it: blockFor(en, 'it', FIX.it()), nl: blockFor(en, 'nl', FIX.nl()), sv: blockFor(en, 'sv', FIX.sv()) };
    for (const [loc, b] of Object.entries(FX)) { const f = validateBank(b, loc); ok(f.length === 0, `fixture ${loc}: ${f.length} findings ${JSON.stringify(f.slice(0, 4))}`); }
    for (const id of FACE_ORDER) {
      const face = FACE_IDS[id];
      if (face === 'color') {
        // en REFUSES the colour face (no national convention): the en render is the refusal; the page renders on the de fixture (5 bins, grey = inkSoft)
        let refused = null; try { faceType(id, GLOBAL, en).build({ theme: null, difficulty: 2, locale: 'en' }, { rng: makeRng('f4-en') }); } catch (e) { refused = e.message; }
        ok(refused && /REFUSES the "color" face/.test(refused), `K-367 en: expected the refusal, got ${refused}`);
        console.log(`render K-367 color en: REFUSED by construction — ${refused}`);
        const strings = FX.de.strings['K-367'];
        faceRenders[id] = await renderOne(id, face, FX.de, 'de', strings, 'de-fixture', true);
        await renderOne(id, face, FX.de, 'de', LONG_FACE, 'de-fixture-longchrome', false);
        if (!QUICK) { await renderOne(id, face, FX.es, 'es', FX.es.strings['K-367'], 'es-fixture', true); await renderOne(id, face, FX.nl, 'nl', FX.nl.strings['K-367'], 'nl-fixture', true); }
        continue;
      }
      faceRenders[id] = await renderOne(id, face, en, 'en', en.strings[id], 'en', true);
      await renderOne(id, face, en, 'en', LONG_FACE, 'en-longchrome', false);
      if (!QUICK && face === 'which') { await renderOne(id, face, FX.es, 'es', FX.es.strings[id], 'es-fixture', true); await renderOne(id, face, FX.fr, 'fr', FX.fr.strings[id], 'fr-fixture', true); await renderOne(id, face, FX.it, 'it', FX.it.strings[id], 'it-fixture', true); }
      if (!QUICK && face === 'write') { await renderOne(id, face, FX.es, 'es', FX.es.strings[id], 'es-fixture', true); await renderOne(id, face, FX.sv, 'sv', FX.sv.strings[id], 'sv-fixture', true); }
    }
    // every picture the faces keep — and every bank item — exists ON DISK in the served library as <theme>/<noun>@2x.webp
    {
      for (const it of GLOBAL.items) faceRefs.add(it.theme + '/' + it.noun);
      let missing = 0;
      for (const ref of faceRefs) { const [theme, noun] = ref.split('/'); const p = path.join(WEBP_THEMES, theme, noun + '@2x.webp'); if (!ok(fs.existsSync(p), `picture on disk: ${p} is absent`)) missing++; }
      ok(faceRefs.size >= GLOBAL.items.length, 'picture on disk: no face reference collected (vacuous)');
      console.log(`pictures on disk: ${faceRefs.size} refs (37 bank items + every face picture) checked as <theme>/<noun>@2x.webp under image-library-webp/themes, ${missing} missing`);
    }
    // the face sweep (build only, 20 seeds each): pages vary
    if (!QUICK) {
      const sweep = (id, block, loc, n) => { const out = []; for (let k = 1; k <= n; k++) { const rng = makeRng(instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch: k })); out.push(faceType(id, GLOBAL, block).build({ theme: null, difficulty: 2, locale: loc }, { rng }).meta); } return out; };
      const w = sweep('K-366', en, 'en', 20), wr = sweep('G1-364', en, 'en', 20), od = sweep('G2-348', en, 'en', 20), co = sweep('K-367', FX.de, 'de', 20), op = sweep('G1-365', en, 'en', 3);
      const distinct = (arr, f) => new Set(arr.map(f)).size;
      ok(distinct(w, (m) => m.items.slice().sort().join()) >= 10, `sweep which: only ${distinct(w, (m) => m.items.slice().sort().join())} distinct item sets over 20 seeds`);
      ok(distinct(w, (m) => m.answers.join()) >= 10, 'sweep which: the answer sequences repeat');
      ok(distinct(wr, (m) => m.items.slice().sort().join()) >= 10 && distinct(wr, (m) => m.bank.join()) >= 5, 'sweep write: item sets / bank orders repeat');
      ok(distinct(od, (m) => m.oddIdx.join()) >= 8 && distinct(od, (m) => m.trio.join()) >= 8, 'sweep odd: odd columns / trio orders repeat');
      ok(distinct(co, (m) => m.legend.join()) >= 6 && distinct(co, (m) => m.examples.flat().join()) >= 10, 'sweep color: legend orders / examples repeat');
      ok(distinct(op, (m) => JSON.stringify(m)) === 1, 'sweep open: the open face must be seed-invariant');
      console.log(`sweep faces: which ${distinct(w, (m) => m.items.slice().sort().join())} item sets / ${distinct(w, (m) => m.answers.join())} answer sequences · write ${distinct(wr, (m) => m.items.slice().sort().join())} item sets / ${distinct(wr, (m) => m.bank.join())} bank orders · odd ${distinct(od, (m) => m.oddIdx.join())} odd vectors / ${distinct(od, (m) => m.trio.join())} trio orders · color ${distinct(co, (m) => m.legend.join())} legend orders / ${distinct(co, (m) => m.examples.flat().join())} example sets · open seed-invariant`);
    }

    // 6. FACE POISONS — each must FAIL for its OWN reason; the face renders above are the controls
    let killedF = 0;
    const TOTAL_F = 25;
    const patched = (id, block, fn) => Object.assign({}, faceType(id, GLOBAL, block), { build(args, ctx) { const out = faceType(id, GLOBAL, block).build(args, ctx); out.bodyHtml = fn(out.bodyHtml, out.meta); return out; } });
    const buildOnly = (id, block, loc, cfg) => { const t = faceType(id, GLOBAL, block); if (cfg) t.difficulty = { 1: cfg, 2: cfg, 3: cfg }; try { t.build({ theme: null, difficulty: 2, locale: loc }, { rng: makeRng('poison-' + id) }); return []; } catch (e) { return [e.message]; } };
    const gateOf = async (id, face, t, block, loc, strings, tag, oneLine, dOverride) => { const r = await renderFace(page, t, { locale: loc, baseName: `K-357-gate-poison-${tag}`, strings }); pngs.push(r.png); const found = collect(() => assertFace(tag, r, dOverride || faceD[id], face, { block, loc, oneLine })); return { r, found }; };
    // PR3 — F1: two consecutive rows answer one bin (the rows re-ordered) → verify "a run of 2"
    { const t = patched('K-366', en, (html) => {
        const rows = [...html.matchAll(/<div class="rc-which" [^>]*data-lcs-bin="([^"]+)"[^>]*>[\s\S]*?<\/span><\/span><\/div>/g)];
        if (rows.length !== 6) throw new Error('PR3: ' + rows.length + ' rows matched');
        const byBin = {}; rows.forEach((m, i) => (byBin[m[1]] = byBin[m[1]] || []).push(i));
        const pair = Object.values(byBin).find((p) => p.length >= 2);
        if (!pair) throw new Error('PR3: no bin answered twice');
        const order = rows.map((_, i) => i).filter((i) => !pair.includes(i)); order.splice(1, 0, ...pair);
        let k = 0; return html.replace(/<div class="rc-which" [^>]*>[\s\S]*?<\/span><\/span><\/div>/g, () => rows[order[k++]][0]);
      });
      const { r } = await gateOf('K-366', 'which', t, en, 'en', en.strings['K-366'], 'PR3', true);
      if (judge('PR3', r.verify, /answers \w+ like the row above \(a run of 2\)/)) killedF++; }
    // PR4 — F2: a row printing its word → verify "text printed in the row"
    { const t = patched('G1-364', en, (html) => html.replace(/(<div class="rc-material" [^>]*data-lcs-word="([^"]+)"[^>]*>)/, (m, open, w) => `${open}<span style="font-family:Nunito;font-weight:800;font-size:18px">${w}</span>`));
      const { r } = await gateOf('G1-364', 'write', t, en, 'en', en.strings['G1-364'], 'PR4', true);
      if (judge('PR4', r.verify, /text "[^"]*\p{L}+[^"]*" printed in the row \(the word must never be printed\)/u)) killedF++; }
    // PR5 — F3: a row of 2 + 2 (one trio box re-stamped to the odd one's class) → verify "not 3 + 1"
    { const t = patched('G2-348', en, (html, meta) => {
        const odd = meta.odds[0], cls = null; void cls;
        const card = /<section class="ws-card" data-lcs-card="1" data-lcs-trio="([^"]+)">[\s\S]*?<\/section>/.exec(html);
        const oddBox = new RegExp(`data-lcs-item="${odd}" data-lcs-material="([^"]+)" data-lcs-vocab="[^"]+" data-lcs-class="([^"]+)"`).exec(card[0]);
        const victim = new RegExp(`(<span data-lcs-item="(?!${odd}")[^"]+" data-lcs-material=")([^"]+)(" data-lcs-vocab="[^"]+" data-lcs-class=")([^"]+)(")`).exec(card[0]);
        const fixed = card[0].replace(victim[0], `${victim[1]}${oddBox[1]}${victim[3]}${oddBox[2]}${victim[5]}`);
        return html.replace(card[0], fixed);
      });
      const { r } = await gateOf('G2-348', 'odd', t, en, 'en', en.strings['G2-348'], 'PR5', true);
      if (judge('PR5', r.verify, /card 1 \([a-z]+\): 2 of the trio class \+ 2 other — not 3 \+ 1/)) killedF++; }
    // PR6 — F4: a lid pre-filled codeBlue → verify "not white"
    { const t = patched('K-367', FX.de, (html) => html.replace(/(<g data-lcs-bin-part="lid"><rect [^>]*fill=")#FFFFFF(")/i, `$1${tokens.codeColors.codeBlue}$2`));
      const { r } = await gateOf('K-367', 'color', t, FX.de, 'de', FX.de.strings['K-367'], 'PR6', true);
      if (judge('PR6', r.verify, /the lid is #[0-9A-F]{6}, not white \(a pre-filled part on the colour face\)/i)) killedF++; }
    // PR13 — F4: a mark drawn on a fill:'none' bin → verify "a lid mark is drawn"
    { const t = patched('K-367', FX.de, (html) => html.replace(/(<g data-lcs-bin-part="handle">[\s\S]*?<\/g>)(<\/g><\/svg>)/, '$1<g data-lcs-bin-mark="1"><circle cx="30" cy="70" r="6" fill="#FFFFFF"/></g>$2'));
      const { r } = await gateOf('K-367', 'color', t, FX.de, 'de', FX.de.strings['K-367'], 'PR13', true);
      if (judge('PR13', r.verify, /a lid mark is drawn on the colour face/)) killedF++; }
    // PR12 — F1 rendered at minmax(90px,1fr): 112 + 10 + 6 x 90 + 40 = 702 > 677 → the 677 pin overflows (the gate), the spec guard refuses rows that tall
    { const t = patched('K-366', en, (html) => html.replace(/minmax\((\d+)px, 1fr\)/, (m, n) => `minmax(${+n + 5}px, 1fr)`));
      const { r, found } = await gateOf('K-366', 'which', t, en, 'en', en.strings['K-366'], 'PR12', true);
      const a = judge('PR12 pin', found, /with the body pinned to 677 \(677\): verify .*, inside false/, `stack ${Math.round(r.m.pins[1].stack)} at the 677 pin`);
      if (a) killedF++; }
    // PR14 — F5 starter "Jeg resirkulerer" at the metric size → verify > 0.35 x 400; a short "Jeg" PASSES (control)
    { const noBlock = Object.assign(clone(en), { starters: ['Jeg resirkulerer'] });
      const cfg = Object.assign({}, faceD['G1-365'], { starters: true });
      const t = faceType('G1-365', GLOBAL, noBlock); t.difficulty = { 1: cfg, 2: cfg, 3: cfg };
      const { r } = await gateOf('G1-365', 'open', t, noBlock, 'en', en.strings['G1-365'], 'PR14', true, cfg);
      const a = judge('PR14', r.verify, /starter "Jeg resirkulerer" \d+ px > 0\.35 x 400/, `measured ${r.m.face.lanes[0] && Math.round(r.m.face.lanes[0].starterW)} px at ${r.m.face.lanes[0] && r.m.face.lanes[0].starterPx} px`);
      const shortBlock = Object.assign(clone(en), { starters: ['Jeg'] });
      const t2 = faceType('G1-365', GLOBAL, shortBlock); t2.difficulty = { 1: cfg, 2: cfg, 3: cfg };
      const { r: r2, found } = await gateOf('G1-365', 'open', t2, shortBlock, 'en', en.strings['G1-365'], 'PR14-control', true, cfg);
      const b = control('PR14 "Jeg" control', r2.verify.concat(found));
      if (a && b) killedF++; }
    // PR15 — F3: the odd tile rendered smaller → verify "not one size"
    { const t = patched('G2-348', en, (html) => html.replace(/(data-lcs-odd="1" style="[^"]*"><img class="ws-icon" src="[^"]*" alt="" style="width:)70%;height:70%/, '$160%;height:60%'));
      const { r } = await gateOf('G2-348', 'odd', t, en, 'en', en.strings['G2-348'], 'PR15', true);
      if (judge('PR15', r.verify, /pictures [\d/]+ are not one size \(the odd one must never be the odd SIZE\)/)) killedF++; }
    // PS-F1 — the which rows FIXED at 85 with the stage centred (the design's figure read as a target) → verify: the stage ends above the body bottom
    { const t = patched('K-366', en, (html) => html.replace(/minmax\((\d+)px, 1fr\)/, '$1px').replace('class="rc-sort rc-face rc-face--fill"', 'class="rc-sort rc-face rc-face--fixed" style="margin:auto 0"'));
      const { r } = await gateOf('K-366', 'which', t, en, 'en', en.strings['K-366'], 'PS-F1', true);
      const a = judge('PS-F1 floats', r.verify, /the stage floats \d+ px below the body top/);
      const b = judge('PS-F1 fills', r.verify, /which: the stage ends \d+ px above the body bottom/);
      if (a) killedF++; if (b) killedF++; }
    // PS-F2 — the write rows FIXED at 62, top-anchored → verify: the grid does not fill
    { const t = patched('G1-364', en, (html) => html.replace(/minmax\((\d+)px, 1fr\)/, '$1px'));
      const { r } = await gateOf('G1-364', 'write', t, en, 'en', en.strings['G1-364'], 'PS-F2', true);
      if (judge('PS-F2', r.verify, /write: the last row ends \d+ px above the grid bottom/)) killedF++; }
    // PS-F3 — the design's FIXED 120 boxes (boxMax = box) in cards that open to 192 → verify: the box does not grow
    { const cfg = Object.assign({}, faceD['G2-348'], { boxMax: 120 });
      const t = faceType('G2-348', GLOBAL, en); t.difficulty = { 1: cfg, 2: cfg, 3: cfg };
      const { r } = await gateOf('G2-348', 'odd', t, en, 'en', en.strings['G2-348'], 'PS-F3', true, cfg);
      if (judge('PS-F3', r.verify, /box 1 is 120 in a \d+ px stage — it does not grow to min\(120, the stage\)|box 1 .* does not grow/, `stage ${r.m.face.cards[0] && Math.round(r.m.face.cards[0].stageH - 12)}`)) killedF++; }
    // PS-F4 — the design's 260 bin + 64 horizontal shelf (stack 431): the spec guard refuses binH 260; past the guard the render fails the stack floor + the one-line slack
    { const refused = buildOnly('K-367', FX.de, 'de', Object.assign({}, faceD['K-367'], { binH: 260, pic: 56 }));
      const guard = judge('PS-F4 spec guard', refused, /binH 260 outside 300\.\.400/);
      const t = patched('K-367', FX.de, (html) => html
        .replace(/height:330px" data-lcs-bin=/g, 'height:260px" data-lcs-bin=').replace(/data-lcs-bin-h="330"/g, 'data-lcs-bin-h="260"')
        .replace(/<svg ([^>]*) height="330"/g, '<svg $1 height="260"').replace(/viewBox="0 0 117 330"/g, 'viewBox="0 0 117 260"')
        .replace(/height:188px;box-sizing:border-box;background/g, 'height:64px;box-sizing:border-box;background').replace(/flex-direction:column;justify-content:center;align-items:center;gap:8px/g, 'flex-direction:row;justify-content:center;align-items:center;gap:4px')
        .replace(/width:84px;height:84px/g, 'width:56px;height:56px'));
      const { r, found } = await gateOf('K-367', 'color', t, FX.de, 'de', FX.de.strings['K-367'], 'PS-F4', true);
      const a = judge('PS-F4 verify', r.verify, /stack \d+ px < 630: the apparatus does not fill the page \(sparse\)/, `stack ${Math.round(r.m.face.stack)}`);
      const b = judge('PS-F4 one-line slack', found, /px of slack under the shelves > 180 \(sparse\)/, `slack ${Math.round(r.m.face.slack)}`);
      if (guard) killedF++; if (a) killedF++; if (b) killedF++; }
    // PS-F5 — the design's FIXED 150 draw box in lanes that open to ~260 → verify: the box does not grow
    { const t = patched('G1-365', en, (html) => html.replace(/flex:1 1 150px;min-height:150px/g, 'height:150px'));
      const { r } = await gateOf('G1-365', 'open', t, en, 'en', en.strings['G1-365'], 'PS-F5', true);
      if (judge('PS-F5', r.verify, /lane 1: draw box 150 < 0\.8 of the lane's \d+ \(a small box floating in a tall lane reads SPARSE — it must grow\)/)) killedF++; }
    // PF1 — F4 on the en block → REFUSES (no national convention); F4 on a block whose two bins share a token → REFUSES; the de fixture BUILDS (control)
    { const a = judge('PF1 en refuses color', buildOnly('K-367', en, 'en'), /the en panel REFUSES the "color" face/);
      const twin = clone(FX.de); twin.bins[3].color = 'codeBlue'; twin.bins[3].colorWord = 'blau';
      const b = judge('PF1 shared token', buildOnly('K-367', twin, 'de'), /two bins share a colour token — the colour face is REFUSED/);
      const none = clone(FX.de); none.colorConvention = null; none.refuse = [];
      const c = judge('PF1 no convention', buildOnly('K-367', none, 'de'), /needs colorConvention 'national'/);
      const d0 = control('PF1 de fixture builds', buildOnly('K-367', FX.de, 'de'));
      if (a && d0) killedF++; if (b && d0) killedF++; if (c && d0) killedF++; }
    // PF2 — F2 on a 1-word bank → REFUSES; the es 2-word bank BUILDS with perWordMax 4 (control)
    { const one = clone(en); one.materialWords = { paper: 'paper', cardboard: 'paper', glass: 'paper', plastic: 'paper', metal: 'paper' };
      const a = judge('PF2 one word', buildOnly('G1-364', one, 'en'), /materialWords has 1 distinct value\(s\) < 2 \(refuse\)/);
      let meta = null; try { meta = faceType('G1-364', GLOBAL, FX.es).build({ theme: null, difficulty: 2, locale: 'es' }, { rng: makeRng('pf2') }).meta; } catch (e) { meta = null; }
      const b = control('PF2 es two words', meta && Object.values(meta.count).every((n) => n <= 4) && Object.values(meta.count).length === 2 ? [] : ['es 2-word bank did not build 8 rows at <= 4 per word: ' + JSON.stringify(meta && meta.count)]);
      if (a && b) killedF++; }
    // PF3 — the guards read the RESOLVED config: shuffleChips 'yes' / boxMax undefined / a lane count off the face
    { const a = judge('PF3 which guard', buildOnly('K-366', en, 'en', Object.assign({}, faceD['K-366'], { shuffleChips: 'yes' })), /shuffleChips must be a boolean/);
      const b = judge('PF3 odd guard', buildOnly('G2-348', en, 'en', Object.assign({}, faceD['G2-348'], { boxMax: undefined })), /config boxMax is undefined — the guard needs the resolved config/);
      const c = judge('PF3 open guard', buildOnly('G1-365', en, 'en', Object.assign({}, faceD['G1-365'], { lanes: 5 })), /lanes 5 outside 2\.\.4/);
      if (a) killedF++; if (b) killedF++; if (c) killedF++; }
    // PF4 — F1: an item excluded for the locale on the page (sv: saucepan) → the node gate; a bin pool emptied → the spec REFUSES
    { const t = patched('K-366', FX.sv, (html) => {
        const it = byId(GLOBAL).saucepan;
        return html.replace(/(<div class="rc-which" [^>]*data-lcs-item=")[^"]+(" data-lcs-material=")[^"]+(" data-lcs-bin=")[^"]+(")/, `$1${it.id}$2${it.material}$3metall$4`)
          .replace(/(<span class="rc-product"[^>]*><img class="ws-icon" src=")[^"]+(")/, `$1${fileUri(it.theme, it.noun)}$2`);
      });
      const { found } = await gateOf('K-366', 'which', t, FX.sv, 'sv', FX.sv.strings['K-366'], 'PF4', true);
      const a = judge('PF4 excluded item', found, /row 1 saucepan stamped metall but bin\(item, sv\) = null/);
      const g = clone(GLOBAL); g.items = g.items.filter((it) => it.material !== 'glass');
      let refused = []; try { faceType('K-366', g, en).build({ theme: null, difficulty: 2, locale: 'en' }, { rng: makeRng('pf4') }); } catch (e) { refused = [e.message]; }
      const b = judge('PF4 empty pool', refused, /bin glass cannot give \d items under the fences \(pool 0; refuse, never a filler\)/);
      if (a) killedF++; if (b) killedF++; }

    // 4. poisons
    let killed = 0;
    const TOTAL = 31;   // 30 poison verdicts (24 + the SPARSE pair + the SHORT quartet) + the it fixture control (Secco beside Umido) passing
    const d2 = TYPE.difficulty[2];
    const IDS = byId(GLOBAL);
    // P1 — an item without packaging
    { const g = clone(GLOBAL); delete g.items[0].packaging;
      if (judge('P1', validateGlobal(g), /packaging is not a boolean/)) killed++; }
    // P2 — kitchen tools/bottle as glass (in _excluded)
    { const g = clone(GLOBAL); g.items[0] = { id: 'bottle', theme: 'kitchen tools', noun: 'bottle', vocabKey: 'bottle', material: 'glass', packaging: true, family: 'bottle', picOpened: true };
      if (judge('P2', validateGlobal(g), /kitchen tools\/bottle: is in _excluded/)) killed++; }
    // P3 — a second apple (At the Supermarket) → vocab key twice
    { const g = clone(GLOBAL); g.items[0] = { id: 'apple2', theme: 'At the Supermarket', noun: 'apple', vocabKey: 'apple', material: 'organic', packaging: false, family: 'apple2', picOpened: true };
      if (judge('P3', validateGlobal(g), /vocab key apple twice/)) killed++; }
    // P4 — de bins with 6 entries; P5 — de route.toothbrush → verpackung; P9 — de classroom
    { const de = blockFor(en, 'de', FIX.de());
      const c0 = control('P4/P5/P9 de control', validateBank(de, 'de'));
      const six = clone(de); six.bins.push(B('sperr', 'Sperr', ['metal'], false, 'codePurple', 'lila'));
      const a = judge('P4', validateBank(six, 'de'), /6 bins outside 2\.\.5/);
      const rt = clone(de); rt.route.toothbrush = { bin: 'verpackung', reason: 'poison' };
      const b = judge('P5', validateBank(rt, 'de'), /route\.toothbrush: toothbrush is not packaging but verpackung is packagingOnly/);
      const cl = clone(de); cl.colorConvention = 'classroom';
      const c = judge('P9', validateBank(cl, 'de'), /colorConvention "classroom" is not accepted/);
      if (c0 && a) killed++; if (c0 && b) killed++; if (c0 && c) killed++; }
    // P6 — sv plast with materials [] → pool 0; P11 — sv F1 title 'Sortera soporna'
    { const sv = blockFor(en, 'sv', FIX.sv());
      const c0 = control('P6/P11 sv control', validateBank(sv, 'sv'));
      const w = bankWarnings(sv, 'sv');
      ok(w.some((x) => /bin metall: pool of 1/.test(x)), 'sv fixture: the metall pool-of-1 WARN did not surface');
      const p6 = clone(sv); p6.bins[1].materials = [];
      const a = judge('P6', validateBank(p6, 'sv'), /bin plast: resolved pool 0/);
      const s2 = clone(sv.strings); s2['K-366'] = { title: 'Sortera soporna', instruction: sv.strings['K-366'].instruction };
      const b = judge('P11', validateBank(Object.assign(clone(sv), { strings: s2 }), 'sv'), /sv title "Sortera soporna" starts with "Sortera"/);
      if (c0 && a) killed++; if (c0 && b) killed++; }
    // P7 — en materialWords all 'paper'
    { const b = clone(en); b.materialWords = { paper: 'paper', cardboard: 'paper', glass: 'paper', plastic: 'paper', metal: 'paper' };
      if (judge('P7', validateBank(b, 'en'), /materialWords has 1 distinct value/)) killed++; }
    // P8 — nl GFT + Glas both codeGreen with national
    { const nl = blockFor(en, 'nl', FIX.nl());
      const c0 = control('P8 nl control', validateBank(nl, 'nl'));
      const p8 = clone(nl); p8.bins[3].color = 'codeGreen';
      const a = judge('P8', validateBank(p8, 'nl'), /F4: not every bin has a national colour \+ colour word \(distinct\)/);
      if (c0 && a) killed++; }
    // P10 — fi base title 'Lajittelu'
    { const fi = blockFor(en, 'fi', FIX.fi());
      const c0 = control('P10 fi control', validateBank(fi, 'fi'));
      const s2 = clone(fi.strings); s2[BASE_ID] = { title: 'Lajittelu', instruction: fi.strings[BASE_ID].instruction };
      const a = judge('P10', validateBank(Object.assign(clone(fi), { strings: s2 }), 'fi'), /fi title "Lajittelu" heads with "Lajittelu"/);
      if (c0 && a) killed++; }
    // P12 — fr base instruction 'Trie en sciences les déchets.'
    { const fr = blockFor(en, 'fr', FIX.fr());
      const c0 = control('P12 fr control', validateBank(fr, 'fr'));
      const s2 = clone(fr.strings); s2[BASE_ID] = { title: fr.strings[BASE_ID].title, instruction: 'Trie en sciences les déchets.' };
      const a = judge('P12', validateBank(Object.assign(clone(fr), { strings: s2 }), 'fr'), /fr instruction reads "en sciences"/);
      if (c0 && a) killed++; }
    // P13 — en F1 instruction 'Tick the bin it goes in.'
    { const b = clone(en); b.strings['K-366'] = { title: en.strings['K-366'].title, instruction: 'Tick the bin it goes in.' };
      if (judge('P13', validateBank(b, 'en'), /\(which\) instruction "Tick the bin it goes in\." names another face's apparatus/)) killed++; }
    // P14 — es bins = 3 without panelOverride; with a panelOverride reason PASSES
    { const es = blockFor(en, 'es', FIX.es());
      const c0 = control('P14 es control', validateBank(es, 'es'));
      const three = clone(es); three.bins.push(B('vidrio', 'Vidrio', ['glass'], true, 'codeBlue', 'azul'));
      const a = judge('P14', validateBank(three, 'es'), /es bins organico,inorganico,vidrio ≠ organico \/ inorganico without a panelOverride/);
      const ov = clone(three); ov.panelOverride = { bins: { reason: 'CDMX runs 4' } }; ov.bins[1].materials = ['paper', 'cardboard', 'plastic', 'metal'];
      const b = control('P14 with panelOverride', validateBank(ov, 'es'));
      if (c0 && a && b) killed++; }
    // P15 — F2 'Recycling Sort: Big Bins' vs F4 'Recycling Sort: Color the Bins' → adjective-only
    { const b = blockFor(en, 'en', { colorConvention: 'national', bins: en.bins.map((x, i) => Object.assign({}, x, { color: ['codeBlue', 'codeYellow', 'codeGreen', 'codeRed', 'codeBrown'][i], colorWord: ['blue', 'yellow', 'green', 'red', 'brown'][i] })) });
      b.refuse = ['color']; // en must keep the refusal (rule 6); the F4 string stays for the pair test
      b.strings['G1-364'] = { title: 'Recycling Sort: Big Bins', instruction: en.strings['G1-364'].instruction };
      if (judge('P15', validateBank(b, 'en'), /"Recycling Sort: Color the Bins" and G1-364 "Recycling Sort: Big Bins" differ by no noun \/ verb/)) killed++; }
    // P16 — an unauthored locale → the bank REFUSES (never en)
    { let refused = []; try { loadBank('recycling', 'xx'); } catch (e) { refused = [e.message]; }
      if (judge('P16', refused, /has no xx block — the xx panel has not authored it \(refuse, never fall back to en\)/)) killed++; }
    // P17 — a bin whose pool is emptied → the spec REFUSES (no filler)
    { const g = clone(GLOBAL); g.items = g.items.filter((it) => it.material !== 'metal');
      let refused = []; try { TYPE._buildWith({ global: g, block: en }, { difficulty: 2, locale: 'en' }, { rng: makeRng('p17') }); } catch (e) { refused = [e.message]; }
      if (judge('P17', refused, /bin metal has no admissible item \(pool 0; refuse, never a filler\)/)) killed++; }
    // PR11 — perBinMax read off the level index (undefined in the resolved config) → the guard fires before render
    { const t = Object.assign({}, TYPE, { difficulty: { 2: Object.assign({}, d2, { perBinMax: undefined }) } });
      let refused = []; try { t._buildWith({ global: GLOBAL, block: en }, { difficulty: 2, locale: 'en' }, { rng: makeRng('pr11') }); } catch (e) { refused = [e.message]; }
      if (judge('PR11', refused, /config perBinMax is undefined — the guard needs the resolved config/)) killed++; }
    // PR1 — two tiles of one bin adjacent in the strip → verify() position leak
    { const t = Object.assign({}, TYPE, { build(args, ctx) {
        const out = TYPE._buildWith({ global: GLOBAL, block: en }, args, ctx);
        const tiles = [...out.bodyHtml.matchAll(TILE_RE)];
        const byBin = {}; tiles.forEach((m, i) => (byBin[m[2]] = byBin[m[2]] || []).push(i));
        const pair = Object.values(byBin).find((p) => p.length >= 2);
        if (!pair) throw new Error('PR1: no bin with two tiles');
        const order = tiles.map((_, i) => i).filter((i) => !pair.includes(i)); order.splice(1, 0, ...pair);
        out.bodyHtml = out.bodyHtml.replace(/<div class="rc-strip"([^>]*)>[\s\S]*?<\/div>/, (m, attrs) => `<div class="rc-strip"${attrs}>${order.map((i) => tiles[i][0]).join('')}</div>`);
        return out;
      } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-357-gate-poison-PR1', strings: en.strings[BASE_ID] });
      if (judge('PR1', r.verify, /tiles sit side by side \(position leak\)/)) killed++; }
    // PR2 — envelope + letter on one page → verify() family
    { const t = Object.assign({}, TYPE, { build(args, ctx) {
        const out = TYPE._buildWith({ global: GLOBAL, block: en }, args, ctx);
        const tiles = [...out.bodyHtml.matchAll(TILE_RE)];
        const victims = tiles.filter((m) => !['envelope', 'letter', 'paper', 'package'].includes(m[1])).slice(0, 2);
        out.bodyHtml = out.bodyHtml.replace(victims[0][0], tileOf(IDS.envelope, 'paper', d2)).replace(victims[1][0], tileOf(IDS.letter, 'paper', d2));
        return out;
      } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-357-gate-poison-PR2', strings: en.strings[BASE_ID] });
      if (judge('PR2', r.verify, /family "env" twice on the page/)) killed++; }
    // PR7 — an <img src> from pictureFor (At the Supermarket/apple for fruits/apple) → verify() src not the opened picture
    { const t = Object.assign({}, TYPE, { build(args, ctx) {
        const out = TYPE._buildWith({ global: GLOBAL, block: en }, args, ctx);
        const tiles = [...out.bodyHtml.matchAll(TILE_RE)];
        const victim = tiles.find((m) => !['paper', 'letter', 'package', 'apple'].includes(m[1]));
        const swapped = tileOf(IDS.apple, 'compost', d2).replace(fileUri('fruits', 'apple'), fileUri('At the Supermarket', 'apple'));
        out.bodyHtml = out.bodyHtml.replace(victim[0], swapped);
        return out;
      } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-357-gate-poison-PR7', strings: en.strings[BASE_ID] });
      if (judge('PR7', r.verify, /picture At the Supermarket\/apple ≠ the stamped fruits\/apple \(src is not the opened picture\)/)) killed++; }
    // PR8 — a sv page with saucepan in the strip → the node gate (excluded for locale)
    { const sv = blockFor(en, 'sv', FIX.sv());
      const t = Object.assign({}, TYPE, { build(args, ctx) {
        const out = TYPE._buildWith({ global: GLOBAL, block: sv }, args, ctx);
        const tiles = [...out.bodyHtml.matchAll(TILE_RE)];
        const victim = tiles.find((m) => m[2] === 'metall');
        out.bodyHtml = out.bodyHtml.replace(victim[0], tileOf(IDS.saucepan, 'metall', d2));
        return out;
      } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'sv', baseName: 'K-357-gate-poison-PR8', strings: sv.strings[BASE_ID] });
      const found = collect(() => nodeGate('PR8', r, sv, 'sv', d2));
      const c0 = control('PR8 sv control (verify)', r.verify);
      if (c0 && judge('PR8', found, /item saucepan is excluded for sv but on the page/)) killed++; }
    // PR9 — sv pill 'Pappersförpackningar' → R1 width (measured); 'Papper' PASSES
    { const bad = await measurePills(page, ['Pappersförpackningar', 'Plast', 'Metall', 'Glas', 'Matavfall']);
      const good = await measurePills(page, ['Papper', 'Plast', 'Metall', 'Glas', 'Matavfall']);
      const f1 = collect(() => assertPillTable('PR9', bad)), f2 = collect(() => assertPillTable('PR9 control', good));
      const a = judge('PR9', f1, /pill "Pappersförpackningar" \d+(\.\d+)? px > 151 \(R1 width\)/, `measured ${bad[0].w17.toFixed(1)} px`);
      const b = control('PR9 Papper', f2);
      if (a && b) killed++; }
    // PR10 — it 'Indifferenziato' beside a synthetic 'Verpackungen' → R1 adjacency; beside 'Plastica' PASSES
    { const bad = await measurePills(page, ['Carta', 'Indifferenziato', 'Verpackungen', 'Umido', 'Vetro']);
      const good = await measurePills(page, ['Carta', 'Indifferenziato', 'Plastica', 'Umido', 'Vetro']);
      const f1 = collect(() => assertPillTable('PR10', bad)), f2 = collect(() => assertPillTable('PR10 control', good));
      const a = judge('PR10', f1, /pills "Indifferenziato" \+ "Verpackungen" half-sums \d+(\.\d+)? > 125 \(R1 adjacency\)/, `measured ${bad[1].w17.toFixed(1)} + ${bad[2].w17.toFixed(1)}`);
      const b = control('PR10 Plastica', f2);
      if (a && b) killed++; }
    // PR-SPARSE — the zone block stretched back to the design's 425 (the level the reviewer read as SPARSE) → the gate's zone ceiling AND verify() fire
    { const t = Object.assign({}, TYPE, { build(args, ctx) { const out = TYPE._buildWith({ global: GLOBAL, block: en }, args, ctx); out.bodyHtml = out.bodyHtml.replace('style="height:' + d2.zone + 'px"></div>', 'style="height:425px"></div>'); return out; } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-357-gate-poison-SPARSE', strings: en.strings[BASE_ID] });
      const found = collect(() => assertRender('PR-SPARSE', r, d2, null));
      const a = judge('PR-SPARSE gate', found, /line zone \d+ px > \d+: the page reads SPARSE/, `measured ${Math.round(r.m.zone)} px`);
      const b = judge('PR-SPARSE verify', r.verify, /the line zone block is 425, not the stamped \d+|outside 200\.\.300/);
      if (a) killed++; if (b) killed++; }
    // PR-SHORT — the previous build's d2 stack (tile 72 / binH 176 / zone 240 = 530) → the gate's stage floor + one-line slack fire (sparse); verify() fires on binH
    { const t = Object.assign({}, TYPE, { difficulty: { 2: Object.assign({}, d2, { tile: 72, iconPx: 60, binH: 176, zone: 240 }) } });
      let refused = null; try { t._buildWith({ global: GLOBAL, block: en }, { difficulty: 2, locale: 'en' }, { rng: makeRng('short') }); } catch (e) { refused = e.message; }
      const guard = judge('PR-SHORT spec guard', refused ? [refused] : [], /binH 176 outside 240\.\.300/);
      // past the spec guard (the guard removed) the RENDER must still fail: the gate measures the stage, verify() the bin height
      const t2 = Object.assign({}, t, { _buildWith(bankData, args, ctx) { const saved = TYPE.difficulty; TYPE.difficulty = t.difficulty; const g = /binH d+ outside/; void g; let out; try { out = TYPE._buildWith.call(Object.assign({}, TYPE, { difficulty: { 2: Object.assign({}, t.difficulty[2], { binH: 240 }) } }), bankData, args, ctx); } finally { TYPE.difficulty = saved; } out.bodyHtml = out.bodyHtml.replace(/height:240px" data-lcs-bin=/g, 'height:176px" data-lcs-bin=').replace(/data-lcs-bin-h="240"/, 'data-lcs-bin-h="176"').replace(/<svg ([^>]*) height="240"/g, '<svg $1 height="176"').replace(/viewBox="0 0 117 240"/g, 'viewBox="0 0 117 176"').replace(/data-lcs-bin-h="240"/g, 'data-lcs-bin-h="176"'); return out; } });
      const r = await renderWith(page, Object.assign({}, TYPE, { build(args, ctx) { return t2._buildWith({ global: GLOBAL, block: en }, args, ctx); } }), { difficulty: 2, locale: 'en', baseName: 'K-357-gate-poison-SHORT', strings: en.strings[BASE_ID] });
      const found = collect(() => assertRender('PR-SHORT', r, Object.assign({}, d2, { tile: 72, iconPx: 60, binH: 176, zone: 240 }), { oneLine: true }));
      const a = judge('PR-SHORT stage floor', found, /stage \d+ px < 630 at d2: the apparatus does not fill the page \(sparse\)/, `stage ${Math.round(r.m.stageH)} px, slack ${Math.round(r.m.slackBelow)}`);
      const b = judge('PR-SHORT one-line slack', found, /px of slack under the bins > 180 \(sparse\)/);
      const c = judge('PR-SHORT verify', r.verify, /binH 176 outside 240\.\.300/);
      if (guard) killed++; if (a) killed++; if (b) killed++; if (c) killed++; }
    // fixtures that must PASS the validator (the it fixture with 'Secco', the es 2-bin lock)
    { const it = blockFor(en, 'it', FIX.it());
      if (control('it fixture', validateBank(it, 'it'))) killed++; }

    console.log('poisons:\n' + poisonLog.join('\n'));
    ok(killed === TOTAL, `poisons: ${killed}/${TOTAL} killed`);
    ok(killedF === TOTAL_F, `face poisons: ${killedF}/${TOTAL_F} killed`);
    global.__killed = killed + killedF; global.__total = TOTAL + TOTAL_F;
    console.log('renders: ' + pngs.length + ' PNGs under out/dev (K-357-gate-*)');
  } finally {
    await browser.close();
  }
  const pass = fails.length === 0;
  if (!pass) console.log('FINDINGS:\n  ' + fails.join('\n  '));
  console.log(pass ? `PASS (${assertions} assertions, ${global.__killed}/${global.__total} poisons killed, ${poisonLog.filter((l) => /KILLED|PASSES/.test(l)).length} poison verdicts clean${QUICK ? ', --quick: sweeps + fixture-locale renders skipped' : ''})` : `FAIL (${fails.length} findings)`);
  process.exit(pass ? 0 : 1);
}

module.exports = { validateBank, validateGlobal, bankWarnings, measurePills };
if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
