#!/usr/bin/env node
/**
 * verify-b4-recycling.js — the K-357 `recycling` gate (design file §5;
 * _BUILD-BRIEF.md deliverable 4). BASE commission (2026-09-21): the global
 * item bank, every authored locale block, the base renders at d1 / d2 / d3
 * under the en chrome AND the long-chrome fixture, the 722 / 677 stack checks
 * measured on the REAL render (body pinned), the R1 pill-width rules measured
 * with the shell fonts on every authored locale's table, a 20-seed sweep, and
 * the §5 data + base render poisons — each must FAIL for its OWN reason, the
 * correct EN bank is the control. The five face sections (F1-F5 renders,
 * PR3-PR6 / PR12-PR15) are Phase 2.
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
  if (opts && opts.oneLine) ok(r.m.slackBelow <= SLACK_MAX_ONE_LINE + 0.6, `${name}: ${Math.round(r.m.slackBelow)} px of slack under the bins at the one-line chrome > ${SLACK_MAX_ONE_LINE} (sparse)`);
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
        const r = await renderWith(page, TYPE, { difficulty: d, locale: loc, baseName: `K-357-gate-d${d}-${loc}`, strings });
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
      const b = judge('PR-SHORT one-line slack', found, /px of slack under the bins at the one-line chrome > 180 \(sparse\)/);
      const c = judge('PR-SHORT verify', r.verify, /binH 176 outside 240\.\.300/);
      if (guard) killed++; if (a) killed++; if (b) killed++; if (c) killed++; }
    // fixtures that must PASS the validator (the it fixture with 'Secco', the es 2-bin lock)
    { const it = blockFor(en, 'it', FIX.it());
      if (control('it fixture', validateBank(it, 'it'))) killed++; }

    console.log('poisons:\n' + poisonLog.join('\n'));
    ok(killed === TOTAL, `poisons: ${killed}/${TOTAL} killed`);
    console.log('renders: ' + pngs.length + ' PNGs under out/dev (K-357-gate-*)');
  } finally {
    await browser.close();
  }
  const pass = fails.length === 0;
  if (!pass) console.log('FINDINGS:\n  ' + fails.join('\n  '));
  console.log(pass ? `PASS (${assertions} assertions, ${poisonLog.filter((l) => /KILLED|PASSES/.test(l)).length} poison verdicts clean${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings)`);
  process.exit(pass ? 0 : 1);
}

module.exports = { validateBank, validateGlobal, bankWarnings, measurePills };
if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
