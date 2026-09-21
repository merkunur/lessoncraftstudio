#!/usr/bin/env node
/**
 * verify-b4-weather-symbols.js — the K-356 `weather-symbols` gate (design file
 * docs/worksheet-gen/b4-designs/K-356-weather.md §5; _BUILD-BRIEF.md
 * deliverable 4; the family KEY is `weather-symbols`, read wherever the design
 * says `weather`). BASE commission (2026-09-21): the global symbol data, every
 * authored locale block, the base renders at d1 / d2 / d3 under the en chrome
 * AND the long-chrome fixture, the 722 / 677 stack checks measured on the REAL
 * render, the base word widths measured with the shell font (the 226 px
 * contingency), a 20-seed sweep, the additive thermometer options' byte
 * identity (G3-345 frozen hashes + the flipped-default re-render poison), and
 * the §5 data + base render poisons — each must FAIL for its OWN reason, the
 * correct EN bank is the control. PHASE 2 (2026-09-21, _work/K-356-faces.md):
 * sections 6-8 — the five faces (G1-362 write · K-364 diary · K-365
 * thermometer · G3-385 water-cycle · G1-363 forecast) rendered at d2 in every
 * authored locale + the two worst chromes (the de 3-line title + 150-char
 * instruction, ~710; a fi 4-line title, ~677), the body pinned to 722 AND 677,
 * every floor measured on the render, a SPARSE assertion per face (fill floor /
 * max blank band / stage floor), the node cross-checks against the locale bank,
 * the in-browser table copies asserted against the global bank + water-cycle.js,
 * every referenced picture asserted on disk, qa/verify-water-cycle.js re-run, a
 * 20-seed face sweep, and the face poisons PR3-PR11 / PR13-PR19 / PR22 + five
 * sparse + five config-guard + two title-vs-config poisons (29; each KILLED for
 * its own reason with the clean face renders as controls).
 *
 *   node scripts/worksheet-gen/qa/verify-b4-weather-symbols.js [--quick]
 *
 * Exports validateBank(block, loc[, widths]) → string[] (the tools/
 * b4-probe-child.js contract; `widths` = the measured tile-text widths from
 * measureWords(), which switch on the 226 px rule) + validateGlobal(global) +
 * measureWords + measurePillRow.
 *
 * 1. BANK
 *    global (data/b4/weather-symbols-global.json), rules 1-3:
 *    (1) symbols = exactly the six keys in order; every noun resolves via
 *        fileUri('weather', noun), has a vocab entry x11, is not `excluded`,
 *        picOpened:true; no alt noun is a noun; excluded ∩ (nouns ∪ gear
 *        nouns) = ∅; no gear noun in symbols; the three SYMBOL_KEYS copies
 *        (json / data module / components) agree;
 *    (2) gear = exactly 3 with distinct bands covering bands.order; every gear
 *        noun resolves via fileUri(theme, noun) + vocab x11; gearNever
 *        (mittens umbrella raincoat hot cold sun sunny snowflake) never in gear;
 *    (3) bands tile min..max exactly in order; every values[b] strictly inside
 *        its band (no edge, max excluded); keyValues inside; tints are token
 *        NAMES; cycle = the 4 fixed keys in order; the primitive accepts the
 *        table (thermometer.js bands + numerals:false renders no <text>).
 *    locale block (data/b4/weather-symbols.js en + data/b4/locales/*), rules 4-10:
 *    (4) symbolWords: 6 keys, non-empty, /^[\p{L}][\p{L}'’-]*$/u (no space:
 *        "gota de lluvia" FAILS), pairwise distinct (toLocaleLowerCase), NEVER
 *        equal (case-insensitive) to a vocab ADJECTIVE form of the locale
 *        (sunny / rainy / cloudy / stormy: Sonnig, Soligt, Aurinkoinen) nor to
 *        the vocab singular of raindrop (rain) / snowflake (snow) / — for the
 *        storm key — thunderstorm in the locales whose vocab form is a
 *        WEATHER-COMPOUND of the storm noun (sv Åskväder · da Tordenvejr · no
 *        Tordenvær, measured; the design's literal "never the vocab
 *        thunderstorm form" would ban de Gewitter / fr orage / it temporale /
 *        nl onweer / pt tempestade / fi ukkonen — the panel words themselves —
 *        so the rule is scoped to the compound locales, see the build report);
 *    (5) letters (NFC, hyphens excluded) <= 11 else `refuse` names 'write';
 *        every hyphen group >= 1 letter;
 *    (6) forecastAsks: 6 non-empty, end with "?" (fr: NBSP + "?"), contain NO
 *        dayNames / dayAbbr / forecastDays token of the locale (unicode word
 *        boundaries, never \b), no digit, <= 70 chars, 6 distinct;
 *    (7) cycleLabels 4 (+ runoff) non-empty distinct, no space unless
 *        multiWord:true; bandWords 3 distinct;
 *    (8) forecastDays null or 5 literals (the pill row measured in the render
 *        phase: 5 x (text + 20) + 4 x 8 <= 639 at Baloo 2 700 16 else `refuse`
 *        names 'forecast'); diaryDays null or 7; bankWords[key] ends with
 *        symbolWords[key]; distractors never a gear noun form of the locale nor
 *        a symbol word; diaryStart ∈ {mon, sun};
 *    (9) titles <= 70, no worksheet word, never "with answers", unique in the
 *        block, NEVER equal (case-insensitive) to axes.theme.weather.name/slug
 *        of the locale nor headed by the bare theme word in es / pt / it; the F4
 *        title must NOT contain the base head's first token and MUST contain the
 *        locale's water-cycle head token; the F3 title ≠ G3-345's title of the
 *        locale (i18n/strings.<loc>.json); instructions <= 150, no slot; no
 *        visible string claims free; F3 strings carry no digit / degree sign; no
 *        authored field EQUALS a neverPrint adjective form;
 *   (10) strings ids === {K-356, G1-362, K-364, K-365, G3-385, G1-363} (a
 *        missing face id must be named in `refuse` by mode); refuse ⊆ modes ∪
 *        {base}; every face title adds a MODE token (en lexicon: write / chart
 *        | week / warm | cold | hot / water cycle / forecast; other locales: at
 *        least one token not in the base title) and no two titles share every
 *        token; strand present (never Common Core outside en).
 *    width contingency (with `widths`): a symbolWords literal wider than 226 px
 *        at Baloo 2 700 24 (measured) FAILS unless `refuse` names 'base'.
 * 2. RENDER — render/render-instance.js (file:// fonts): d1 / d2 / d3 per
 *    authored locale under the en chrome + the long-chrome fixture. Asserts
 *    verify() empty, qa/lints.js clean, and ITSELF: badges round, >= 56 and ===
 *    config; icons >= 56 and === config; tiles 250 x tileH; word px >= 18 and
 *    === config; tile text width <= 226 (measured); the line zone between the
 *    dots >= 180 (design 213); the stage inside the body / above the footer;
 *    the 722 AND 677 stack checks (the body pinned to each budget, the lowest
 *    item inside it); NODE cross-checks: every tile word === the bank literal
 *    of its stamped concept, every badge file === the global noun, no printed
 *    word equals a vocab adjective form, the right column is a derangement of
 *    the left and not its reverse, the seed is locale-neutral (a synthetic de
 *    block gives the same left / right orders).
 * 3. SWEEP — 20 seeds x d2 (build only, skipped by --quick): six concepts, a
 *    derangement, not the reverse, >= 2 distinct left orders, >= 2 distinct
 *    right orders, never the left order on the right.
 * 4. THERMOMETER — the additive options: G3-345 d1 / d2 / d3 bodies hash to
 *    the sha1s frozen BEFORE the primitive edit (2026-09-21); PR12 = the
 *    `numerals` default flipped in a fresh module graph → a byte-diff FAILS.
 * 5. POISON — each must FAIL for its OWN reason (WRONG REASON / SILENT both
 *    exit 1); the correct EN bank is the control:
 *      P1  symbols[2].noun = 'puddle'                      → rule 1 (excluded)
 *      P2  symbols += {key:'wind', noun:'windy'}           → rule 1
 *      P3  gear += {key:'mittens', band:'cold'}            → rule 2
 *      P4  gear[2] = {key:'hot', noun:'hot', band:'hot'}   → rule 2
 *      P5  bands.values.warm = [10, 15]                    → rule 3 (edge)
 *      P6  de symbolWords.sun = 'Sonnig'  FIRES; de 'Sonne' PASSES (control) → rule 4
 *      P7  de symbolWords.rain = 'Regentropfen'            → rule 4
 *      P7b sv symbolWords.storm = 'Åskväder' FIRES; sv 'åska' PASSES; de 'Gewitter' PASSES → rule 4
 *      P8  es symbolWords.rain = 'gota de lluvia'          → rule 4
 *      P9  fi symbolWords.rainbow = a 12-letter variant    → rule 5
 *      P10 en forecastAsks.rain = 'Is it rainy on Monday?' → rule 6
 *      P11 fr forecastAsks.sun without '?'                 → rule 6
 *      P12 five long day forms on the pill row              → rule 8 (row > 639, MEASURED); the pt FULL names PASS at 585 (the design's ~645 estimate was 60 px high)
 *      P13 sv base title 'Väder'                           → rule 9 (theme name)
 *      P14 en F4 title 'Weather Symbols: The Water Cycle'  → rule 9
 *      P15 en F3 title 'Hot or Cold?'                      → rule 9
 *      P16 en F3 instruction 'Circle the picture for 20 °C' → rule 9
 *      P17 en F1 title 'Weather Symbols: Big Words'        → rule 10 (no mode token)
 *      P18 en symbolWords.storm missing                    → the spec REFUSES (throw)
 *      P19 a de block with symbolWords.rainbow = 'Regenbogenwetterlage' → the 226 px rule (MEASURED); de 'Regenbogen' PASSES
 *      PR1 the word column in the badge order              → verify() position leak
 *      PR2 `raindrop` swapped in beside `rainy`             → verify() "picture ≠ the rain symbol"
 *      PR12 G3-345 d2 with the numerals default flipped     → byte-diff
 *      PR20 an answerBox({w,h}) in place of a word tile     → verify() [data-lcs-answer]
 *      PR21 d2 with pairs:8 from a level-index guard        → the config guard fires before render
 *      P-theme a themed call with `animals` on the raw type  → the fixed-theme guard
 *      P-d3 a block with one distractor at d3               → the spec REFUSES (never a filler)
 *    faces (Phase 2):
 *      PR3  F1 without its bank                             → verify() "bank absent at d2"
 *      PR4  F1 fr arc-en-ciel as 11 boxes, stamps 3-2-4    → verify() groups mismatch
 *      PR5  F2 a day pill printing a numeral                → verify() "a numeral is printed"
 *      PR6  F3 a numeral label inside a thermometer         → verify() "text inside the thermometer"
 *      PR7  F3 card 1 mercury at 10 (an edge)               → verify() "not inside any band"
 *      PR8  F3 one row with one band twice                  → verify() the row rule
 *      PR9  F3 a mittens chip                               → verify() the gear fence
 *      PR10 F3 a gear picture beside an item thermometer    → verify() "legend on an item"
 *      PR11 F3 the key row removed                          → verify() "0 key rows"
 *      PR13 F4 markers numbered 2 1 4 3                     → verify() "numbered ≠ cycle"
 *      PR14 F4 the bank in cycle order                      → the node gate "bank order = cycle"
 *      PR15 F4 lane 1 pre-filled                            → verify() "lane not empty"
 *      PR16 F4 a marker 20 viewBox units off its anchor     → verify() "off its anchor" (measured in px)
 *      PR17 F5 the strip with one symbol twice              → verify() "strip concepts repeat"
 *      PR18 F5 every ask naming Monday (bank poison)        → verify() "names the day"
 *      PR19 F5 chips labelled dayAbbr                       → verify() "chip ≠ the strip header"
 *      PR22 F2 rows minmax(340px) at the fi 4-line chrome   → the footer lint / verify()
 *      PS1-PS5 the sparse layouts (F1 140 px rows · F2 a fixed 326 grid · F3 120 px thermometers · F4 a 480 diagram · F5 fixed 44 px pills) → the sparse assertions
 *      PC1-PC5 config guards (two bands · distinctStrip:false · hyphenGiven:false · stages 6 · a 12-letter word) → the guard throws before any draw
 *      PT1-PT2 a title listing options ≠ the d2 config ("Cold or Hot" over three bands; "Sunday to Saturday" over start:'mon') → titleConfigFindings
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b4-common.js');
const { vocab, fileUri } = require('../lib/b2-common.js');
const resolve = require('../image-cache/resolve.js');
const tokens = require('../primitives/_tokens.js');
const thermometer = require('../primitives/thermometer.js');
const { answerBox } = require('../templates/components.js');
const C4 = require('../templates/components-b4.js');
const { NAMES } = require('../data/b2/calendar.js');
const freeClaim = require('../../lib/free-claim.js');
const { spawnSync } = require('child_process');
const WC = require('../primitives/water-cycle.js');
const { label: svgLabel } = require('../primitives/_svg.js');
const { wordBank } = require('../templates/components-b2.js');
const { loadType } = require('../lib/load-types.js');

const TYPE = require('../types/k/K-356-weather-symbols.js');
const GLOBAL = require('../data/b4/weather-symbols-global.json');
const DATA_MOD = require('../data/b4/weather-symbols.js');
const TAX = require('../../../frontend/config/topics-taxonomy.json');

const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const WG = path.resolve(__dirname, '..');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const KEYS = ['sun', 'cloud', 'rain', 'storm', 'snow', 'rainbow'];
const CYCLE = ['evaporation', 'condensation', 'precipitation', 'collection'];
const BASE_ID = 'K-356';
const FACE_IDS = { 'G1-362': 'write', 'K-364': 'diary', 'K-365': 'thermometer', 'G3-385': 'water-cycle', 'G1-363': 'forecast' };
const MODES = Object.values(FACE_IDS);
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const WORD_RE = /^[\p{L}][\p{L}'’-]*$/u;
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWER_KEY = /with answers|mit lösungen|con respuestas|com respostas|avec (les )?réponses|con (le )?risposte|met antwoorden|med facit|med svar|med fasit|vastauksineen/i;
const MIN_ICON = tokens.density.K.minElement;   // 56
const WORD_FLOOR = tokens.density.K.fontLabel;  // 18
const TILE_INNER = 226;                          // 250 - 24 (design §2)
const PILL_MAX = 639;                            // the .ws-lane inner (design §5 rule 8)
const ZONE_MIN = 180;                            // design 213
/** The locales whose vocab `thunderstorm` is a WEATHER-compound of the storm noun (measured 2026-09-21: Åskväder / Tordenvejr / Tordenvær). */
const STORM_COMPOUND_LOCALES = new Set(['sv', 'da', 'no']);
/** The bare theme word that may not head a title in es / pt / it (design §5 rule 9). */
const BARE_THEME_HEAD = { es: ['clima'], pt: ['clima'], it: ['meteo'] };
/** The water-cycle head token the F4 title must carry (design §1 table). */
const WATER_CYCLE_HEAD = { en: 'water cycle', de: 'wasserkreislauf', es: 'ciclo del agua', pt: 'ciclo da água', fr: "cycle de l'eau", it: "ciclo dell'acqua", nl: 'waterkringloop', sv: 'kretslopp', da: 'kredsløb', no: 'kretsløp', fi: 'kiertokulku' };
/** The mode token a face title must add (rule 10); a locale without a lexicon falls back to ">= 1 token not in the base title". */
const MODE_TOKENS = { en: { write: /write/i, diary: /chart|week/i, thermometer: /warm|cold|hot/i, 'water-cycle': /water cycle/i, forecast: /forecast/i } };
/** G3-345 bodies hashed BEFORE the additive thermometer options landed (2026-09-21, seedEpoch 1, theme null). */
const G3_345_FROZEN = { 1: '7cc3ace7277d64b6d843d5b283fce1a4b31cd955', 2: '42e8076291783699432e3951f256b748ffa2591e', 3: '113c379b69dc151e3f1c9e71c2c4d464ef2a480e' };

freeClaim.selfTest();

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
const nfd = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const sha1 = (s) => crypto.createHash('sha1').update(s).digest('hex');
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function tokensOf(s) { return new Set(nfd(s).split(/[^\p{L}\p{N}]+/u).filter(Boolean)); }
function hasToken(text, tok) { return new RegExp('(?<!\\p{L})' + tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu').test(text); }
function vocabForm(key, loc) { const V = vocab(); const e = V[key] && V[key][loc]; return e && e[0] ? String(e[0]) : null; }
function vocabKeyOf(theme, noun) { try { const e = resolve.manifest().themes[theme]; return e && e.nouns[noun] ? e.nouns[noun].vocabKey || null : undefined; } catch (e) { return undefined; } }

/* ------------------------------------------------------------------ bank: global */
function validateGlobal(global) {
  const f = [];
  const push = (m) => f.push(`[global] ${m}`);
  if (!global) { push('absent'); return f; }
  const V = vocab();
  const symbols = Array.isArray(global.symbols) ? global.symbols : [];
  const excluded = new Set(global.excluded || []);
  const gear = Array.isArray(global.gear) ? global.gear : [];
  const gearNouns = new Set(gear.map((g) => g && g.noun));
  // rule 1
  if (symbols.map((s) => s && s.key).join() !== KEYS.join()) push(`symbols keys ${JSON.stringify(symbols.map((s) => s && s.key))} ≠ ${KEYS.join(',')}`);
  const nouns = new Set();
  const alts = new Set();
  for (const s of symbols) {
    const tag = (x) => `symbol ${s && s.key}: ${x}`;
    if (!s || typeof s.noun !== 'string' || !s.noun) { push('a symbol without a noun'); continue; }
    if (s.theme !== 'weather') push(tag(`theme "${s.theme}" ≠ weather`));
    try { fileUri('weather', s.noun); } catch (e) { push(tag(`noun "${s.noun}" does not resolve via fileUri('weather')`)); }
    const key = vocabKeyOf('weather', s.noun);
    if (!key || !V[key]) push(tag(`noun "${s.noun}" has no vocab entry`));
    else for (const l of LOCALES) if (!V[key][l] || !V[key][l][0]) push(tag(`noun "${s.noun}" has no ${l} vocab form`));
    if (excluded.has(s.noun)) push(tag(`noun "${s.noun}" is excluded`));
    if (s.picOpened !== true) push(tag('not picOpened:true'));
    if (gearNouns.has(s.noun)) push(tag(`noun "${s.noun}" is a gear noun`));
    if (nouns.has(s.noun)) push(tag(`noun "${s.noun}" appears twice`));
    nouns.add(s.noun);
    for (const a of s.alt || []) alts.add(a);
  }
  for (const a of alts) if (nouns.has(a)) push(`alt noun "${a}" is also a symbol noun (two pictures of one concept)`);
  for (const x of excluded) if (nouns.has(x) || gearNouns.has(x)) push(`excluded "${x}" is a symbol or gear noun`);
  const same = (arr) => Array.isArray(arr) && arr.join() === KEYS.join();
  if (!same(DATA_MOD.SYMBOL_KEYS)) push('data/b4/weather-symbols.js SYMBOL_KEYS ≠ the six keys');
  if (!same(C4.SYMBOL_KEYS)) push('components-b4 SYMBOL_KEYS ≠ the six keys');
  // rule 2
  const bands = global.bands || {};
  const order = Array.isArray(bands.order) ? bands.order : [];
  if (gear.length !== 3) push(`${gear.length} gear ≠ 3`);
  const gb = gear.map((g) => g && g.band);
  if (new Set(gb).size !== gb.length || order.some((b) => !gb.includes(b)) || gb.some((b) => !order.includes(b))) push(`gear bands ${gb.join(',')} do not cover bands.order ${order.join(',')} once each`);
  const never = new Set(global.gearNever || ['mittens', 'umbrella', 'raincoat', 'hot', 'cold', 'sun', 'sunny', 'snowflake']);
  for (const g of gear) {
    const tag = (x) => `gear ${g && g.key}: ${x}`;
    if (!g || typeof g.noun !== 'string') { push('a gear item without a noun'); continue; }
    if (never.has(g.noun) || never.has(g.key)) push(tag(`"${g.noun}" is fenced out of gear (K-211 / K-207 / the symbol set)`));
    try { fileUri(g.theme, g.noun); } catch (e) { push(tag(`does not resolve via fileUri(${g.theme}, ${g.noun})`)); }
    const key = vocabKeyOf(g.theme, g.noun);
    if (!key || !V[key]) push(tag('no vocab entry'));
    else for (const l of LOCALES) if (!V[key][l] || !V[key][l][0]) push(tag(`no ${l} vocab form`));
    if (g.picOpened !== true) push(tag('not picOpened:true'));
    if (nouns.has(g.noun)) push(tag('is a symbol noun'));
  }
  // rule 3
  const { min, max } = bands;
  const edges = Array.isArray(bands.edges) ? bands.edges : [];
  const bounds = [min, ...edges, max];
  if (order.length !== edges.length + 1) push(`${order.length} bands vs ${edges.length} edges: the bands do not tile ${min}..${max}`);
  for (let i = 1; i < bounds.length; i++) if (!(bounds[i] > bounds[i - 1])) push(`band bounds ${bounds.join(',')} are not rising`);
  order.forEach((b, i) => {
    const lo = bounds[i], hi = bounds[i + 1];
    // strictly inside the band: an INTERIOR edge (10 / 25) and max (40) are never values; min (-10, the empty tube) is legal (design §3 F3)
    for (const v of (bands.values || {})[b] || []) if (!((lo === min ? v >= lo : v > lo) && v < hi) || v >= max) push(`values.${b} ${v} is not strictly inside ${lo}..${hi} (edges and max are never values)`);
    if (!((bands.values || {})[b] || []).length) push(`values.${b} empty`);
    const kv = (bands.keyValues || {})[b];
    if (!(kv > lo && kv < hi)) push(`keyValues.${b} ${kv} outside ${lo}..${hi}`);
    const tint = (bands.tints || {})[b];
    if (!tokens.color[tint]) push(`tints.${b} "${tint}" is not a palette token name`);
  });
  if (!Array.isArray(global.cycle) || global.cycle.join() !== CYCLE.join()) push(`cycle ${JSON.stringify(global.cycle)} ≠ ${CYCLE.join(',')}`);
  if (!Array.isArray(DATA_MOD.CYCLE) || DATA_MOD.CYCLE.join() !== CYCLE.join()) push('data/b4/weather-symbols.js CYCLE ≠ the four stage keys');
  // the primitive accepts the table and prints no numeral
  try {
    const bl = order.map((b, i) => ({ key: b, from: bounds[i], to: bounds[i + 1], fill: (bands.tints || {})[b] }));
    const svg = thermometer({ value: (bands.keyValues || {})[order[0]], min, max, step: bands.step, height: 220, bands: bl, numerals: false }).svg;
    if (/<text/.test(svg)) push('the primitive printed a numeral with numerals:false');
    if ((svg.match(/data-lcs-band=/g) || []).length !== order.length) push('the primitive did not stamp every band');
  } catch (e) { push(`the primitive refuses the band table: ${e.message}`); }
  return f;
}

/* ------------------------------------------------------------------ bank: locale block */
function adjectiveForms(loc) { return (GLOBAL.neverPrint || []).map((k) => vocabForm(k, loc)).filter(Boolean).map((s) => s.toLocaleLowerCase(loc)); }
function gearForms(loc) { return (GLOBAL.gear || []).map((g) => vocabKeyOf(g.theme, g.noun)).map((k) => k && vocabForm(k, loc)).filter(Boolean).map((s) => s.toLocaleLowerCase(loc)); }
function g3345Title(loc) {
  try { return require(path.join(WG, 'i18n', `strings.${loc}.json`))['G3-345'].title; } catch (e) { return null; }
}

/** Rules 4-10 on ONE locale block (node); `widths` = measureWords() output switches on the 226 px contingency. */
function validateBank(block, loc, widths) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  if (!block || typeof block !== 'object') { push('absent'); return f; }
  const refuse = Array.isArray(block.refuse) ? block.refuse : [];
  for (const r of refuse) if (!MODES.includes(r) && r !== 'base') push(`refuse "${r}" is not a face mode`);
  // rule 4
  const words = block.symbolWords || {};
  const adj = adjectiveForms(loc);
  const seen = new Set();
  for (const k of KEYS) {
    const w = words[k];
    if (typeof w !== 'string' || !w.trim()) { push(`symbolWords.${k} missing`); continue; }
    if (!WORD_RE.test(w)) push(`symbolWords.${k} "${w}" is not a single token or hyphenated (a space is not a word)`);
    const lc = w.trim().toLocaleLowerCase(loc);
    if (seen.has(lc)) push(`symbolWords.${k} "${w}" repeats another word`);
    seen.add(lc);
    if (adj.includes(lc)) push(`symbolWords.${k} "${w}" is the vocab ADJECTIVE form (never Sonnig / Soligt / Aurinkoinen)`);
    const banKey = k === 'rain' ? 'raindrop' : k === 'snow' ? 'snowflake' : (k === 'storm' && STORM_COMPOUND_LOCALES.has(loc)) ? 'thunderstorm' : null;
    const banned = banKey && vocabForm(banKey, loc);
    if (banned && banned.toLocaleLowerCase(loc) === lc) push(`symbolWords.${k} "${w}" is the vocab ${banKey} noun (the weather noun, never the object: Regen not Regentropfen, åska not Åskväder)`);
    // rule 5
    const groups = w.split('-');
    const letters = groups.reduce((n, g) => n + [...g].length, 0);
    if (groups.some((g) => ![...g].length)) push(`symbolWords.${k} "${w}" has an empty hyphen group`);
    if (letters > 11 && !refuse.includes('write')) push(`symbolWords.${k} "${w}" has ${letters} letters > 11 (the 526 px F1 lane) and refuse does not name "write"`);
    // the 226 px contingency (measured)
    if (widths && typeof widths[k] === 'number' && widths[k] > TILE_INNER + 0.6 && !refuse.includes('base')) push(`symbolWords.${k} "${w}" measures ${widths[k].toFixed(1)} px > ${TILE_INNER} on the base tile at Baloo 2 700 24 (refuse the word / the base, never a smaller font)`);
  }
  // rule 6
  const asks = block.forecastAsks || {};
  const cal = NAMES[loc] || {};
  const dayTokens = [...(cal.dayNames || []), ...(cal.dayAbbr || []), ...(Array.isArray(block.forecastDays) ? block.forecastDays : []), ...(Array.isArray(block.diaryDays) ? block.diaryDays : [])].filter(Boolean);
  const askSeen = new Set();
  for (const k of KEYS) {
    const a = asks[k];
    if (typeof a !== 'string' || !a.trim()) { push(`forecastAsks.${k} missing`); continue; }
    if (!/\?\s*$/.test(a)) push(`forecastAsks.${k} "${a}" does not end with "?"`);
    if (loc === 'fr' && !/ \?\s*$/.test(a)) push(`forecastAsks.${k} "${a}" lacks the NBSP before "?" (fr)`);
    if (/\p{N}/u.test(a)) push(`forecastAsks.${k} "${a}" carries a digit`);
    if ([...a].length > 70) push(`forecastAsks.${k} "${a}" > 70 chars`);
    for (const d of dayTokens) if (hasToken(a, d)) push(`forecastAsks.${k} "${a}" names the day "${d}" (a question naming a day is the answer printed)`);
    const lc = a.trim().toLocaleLowerCase(loc);
    if (askSeen.has(lc)) push(`forecastAsks.${k} "${a}" repeats another question`);
    askSeen.add(lc);
  }
  // rule 7
  const cyc = block.cycleLabels || {};
  const cycSeen = new Set();
  for (const k of [...CYCLE, ...(cyc.runoff !== undefined ? ['runoff'] : [])]) {
    const c = cyc[k];
    if (typeof c !== 'string' || !c.trim()) { push(`cycleLabels.${k} missing`); continue; }
    if (/\s/.test(c.trim()) && block.multiWord !== true) push(`cycleLabels.${k} "${c}" carries a space (set multiWord:true, which refuses the d3 letter-box variants)`);
    const lc = c.trim().toLocaleLowerCase(loc);
    if (cycSeen.has(lc)) push(`cycleLabels.${k} "${c}" repeats another label`);
    cycSeen.add(lc);
  }
  const bw = block.bandWords || {};
  const bwv = ['cold', 'warm', 'hot'].map((b) => bw[b]);
  if (bwv.some((x) => typeof x !== 'string' || !x.trim())) push('bandWords needs cold / warm / hot');
  else if (new Set(bwv.map((x) => x.trim().toLocaleLowerCase(loc))).size !== 3) push('bandWords are not distinct');
  // rule 8 (shape; the pill row width is measured in the render phase)
  if (block.forecastDays != null && !(Array.isArray(block.forecastDays) && block.forecastDays.length === 5 && block.forecastDays.every((x) => typeof x === 'string' && x.trim()))) push('forecastDays must be null or 5 literals');
  if (block.diaryDays != null && !(Array.isArray(block.diaryDays) && block.diaryDays.length === 7 && block.diaryDays.every((x) => typeof x === 'string' && x.trim()))) push('diaryDays must be null or 7 literals');
  if (!['mon', 'sun'].includes(block.diaryStart)) push(`diaryStart "${block.diaryStart}" is not mon | sun`);
  for (const [k, v] of Object.entries(block.bankWords || {})) if (typeof v !== 'string' || typeof words[k] !== 'string' || !v.endsWith(words[k])) push(`bankWords.${k} "${v}" does not end with symbolWords.${k}`);
  const gf = gearForms(loc);
  for (const d of Array.isArray(block.distractors) ? block.distractors : []) {
    if (typeof d !== 'string' || !WORD_RE.test(d)) { push(`distractor "${d}" is not a single token or hyphenated`); continue; }
    const lc = d.toLocaleLowerCase(loc);
    if (gf.includes(lc)) push(`distractor "${d}" is a gear noun (no gear WORD is ever printed)`);
    if (seen.has(lc)) push(`distractor "${d}" is a symbol word`);
    if (adj.includes(lc)) push(`distractor "${d}" is a vocab adjective form`);
  }
  // rule 9
  const strings = block.strings || {};
  const themeName = TAX.axes.theme.weather && TAX.axes.theme.weather.name && TAX.axes.theme.weather.name[loc];
  const themeSlug = TAX.axes.theme.weather && TAX.axes.theme.weather.slug && TAX.axes.theme.weather.slug[loc];
  const baseTitle = (strings[BASE_ID] && strings[BASE_ID].title) || '';
  const baseHead = [...tokensOf(baseTitle)][0] || '';
  const g3 = g3345Title(loc);
  const titles = [];
  for (const [id, s] of Object.entries(strings)) {
    const title = (s && s.title) || '';
    const ins = (s && s.instruction) || '';
    if (!title || [...title].length > 70) push(`${id} title "${title}" empty or > 70 chars`);
    if (WORKSHEET_WORD.test(title)) push(`${id} title "${title}" carries the worksheet word`);
    if (ANSWER_KEY.test(title + ' ' + ins)) push(`${id} promises an answer key (printable decks ship none)`);
    if (themeName && nfd(title) === nfd(themeName)) push(`${id} title "${title}" equals the theme name`);
    if (themeSlug && nfd(title) === nfd(themeSlug)) push(`${id} title "${title}" equals the theme slug`);
    for (const bare of BARE_THEME_HEAD[loc] || []) if (nfd(title).split(/[^\p{L}]+/u)[0] === bare) push(`${id} title "${title}" heads with the bare theme word "${bare}"`);
    if (FACE_IDS[id] === 'water-cycle') {
      if (baseHead && hasToken(nfd(title), baseHead)) push(`${id} (water-cycle) title "${title}" contains the base head "${baseHead}"`);
      const head = WATER_CYCLE_HEAD[loc];
      if (head && !nfd(title).includes(nfd(head))) push(`${id} (water-cycle) title "${title}" lacks the water-cycle head "${head}"`);
    }
    if (FACE_IDS[id] === 'thermometer') {
      if (g3 && nfd(title) === nfd(g3)) push(`${id} (thermometer) title "${title}" equals G3-345's title`);
      if (/[\p{N}°]/u.test(title + ' ' + ins)) push(`${id} (thermometer) strings carry a digit or a degree sign`);
    }
    if (!ins || [...ins].length > 150) push(`${id} instruction empty or > 150 chars`);
    if (/[{}]/.test(ins)) push(`${id} instruction carries a slot`);
    const claim = freeClaim.hit(title + ' ' + ins);
    if (claim) push(`${id} visible copy claims free ("${claim}")`);
    if (titles.some((t) => t.t === nfd(title))) push(`${id} title "${title}" repeats another title`);
    for (const prev of titles) {
      const a = tokensOf(title), b = tokensOf(prev.title);
      const diff = [...a].some((x) => !b.has(x)) || [...b].some((x) => !a.has(x));
      if (!diff) push(`${id} and ${prev.id} titles share every token`);
    }
    // rule 10: the face title adds a MODE token
    const mode = FACE_IDS[id];
    if (mode) {
      const lex = MODE_TOKENS[loc];
      if (lex && lex[mode]) { if (!lex[mode].test(title)) push(`${id} (${mode}) title "${title}" adds no ${mode} token (${lex[mode]})`); }
      else if (baseTitle) { const a = tokensOf(title), b = tokensOf(baseTitle); if (![...a].some((x) => !b.has(x))) push(`${id} (${mode}) title "${title}" adds no token to the base title`); }
    }
    titles.push({ id, t: nfd(title), title });
  }
  for (const [id, s] of Object.entries(strings)) for (const field of ['title', 'instruction']) {
    const v = s && s[field];
    if (typeof v === 'string' && adj.includes(v.trim().toLocaleLowerCase(loc))) push(`${id} ${field} equals a vocab adjective form`);
  }
  for (const [k, v] of Object.entries({ ...words, ...cyc, ...bw })) if (typeof v === 'string' && adj.includes(v.trim().toLocaleLowerCase(loc)) && !KEYS.includes(k)) push(`field ${k} "${v}" equals a vocab adjective form`);
  // rule 10 (ids)
  if (!strings[BASE_ID]) push(`strings ${BASE_ID} missing`);
  for (const [id, mode] of Object.entries(FACE_IDS)) if (!strings[id] && !refuse.includes(mode)) push(`strings ${id} (${mode}) missing and refuse does not name "${mode}"`);
  for (const id of Object.keys(strings)) if (id !== BASE_ID && !FACE_IDS[id]) push(`strings carries an unknown id ${id}`);
  if (typeof block.strand !== 'string' || !block.strand.trim()) push('no strand literal');
  else if (/common core/i.test(block.strand) && loc !== 'en') push('strand names Common Core outside en');
  return f;
}

/* ------------------------------------------------------------------ render helpers */
/** Tile-text widths of the six symbol words at Baloo 2 700 `px` (default 24), measured with the shell fonts on a rendered page. */
async function measureWords(page, block, px = 24) {
  return page.evaluate(({ words, px }) => {
    const m = (text) => { const s = document.createElement('span'); s.style.cssText = `position:absolute;left:-9999px;top:0;white-space:nowrap;font:700 ${px}px 'Baloo 2'`; s.textContent = text; document.body.appendChild(s); const w = s.getBoundingClientRect().width; s.remove(); return w; };
    const out = {};
    for (const [k, v] of Object.entries(words || {})) if (typeof v === 'string') out[k] = m(v);
    return out;
  }, { words: block.symbolWords, px });
}
/** The F5 pill row width: 5 x (text at Baloo 2 700 16 + padding 20 + border 4) + 4 x 8, measured (design §5 rule 8). */
async function measurePillRow(page, labels) {
  return page.evaluate((labels) => {
    const m = (text) => { const s = document.createElement('span'); s.style.cssText = `position:absolute;left:-9999px;top:0;white-space:nowrap;font:700 16px 'Baloo 2'`; s.textContent = text; document.body.appendChild(s); const w = s.getBoundingClientRect().width; s.remove(); return w; };
    const ws = labels.map(m);
    return { widths: ws, row: ws.reduce((a, w) => a + Math.max(44, w + 20 + 4), 0) + 4 * 8 };
  }, labels);
}

async function renderWith(page, type, { difficulty, locale, baseName, strings }) {
  const out = await renderInstance({ type, theme: 'weather', difficulty, locale: locale || 'en', page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-ws-content][data-lcs-weather-symbols]');
    const body = document.querySelector('[data-lcs-body]');
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const badges = root ? [...root.querySelectorAll('[data-lcs-badge]')] : [];
    const tiles = root ? [...root.querySelectorAll('[data-lcs-tile]')] : [];
    const items = [...badges, ...tiles];
    const ld = badges[0] && badges[0].querySelector('.ws-match-dot--right'), rd = tiles[0] && tiles[0].querySelector('.ws-match-dot--left');
    return {
      stamps: root ? { ...root.dataset } : null,
      body: rect(body), foot,
      stage: root ? rect(root) : null,
      badges: badges.map((el) => { const im = el.querySelector('.ws-icon'); const r = el.getBoundingClientRect(); return { concept: el.dataset.lcsConcept, w: r.width, h: r.height, radius: parseFloat(getComputedStyle(el).borderTopLeftRadius), icon: im ? Math.min(im.offsetWidth, im.offsetHeight) : 0, file: im ? decodeURIComponent(im.src).split('/').pop().replace(/@\dx\.webp$/, '') : null, dir: im ? decodeURIComponent(im.src).split('/').slice(-2, -1)[0] : null }; }),
      tiles: tiles.map((el) => { const sp = el.querySelector('span:not(.ws-match-dot)'); const r = el.getBoundingClientRect(); return { concept: el.dataset.lcsConcept || null, distractor: el.dataset.lcsDistractor === '1', word: el.dataset.lcsWord, text: el.textContent.trim(), w: r.width, h: r.height, px: sp ? parseFloat(getComputedStyle(sp).fontSize) : 0, textW: sp ? sp.getBoundingClientRect().width : 0 }; }),
      zone: ld && rd ? rd.getBoundingClientRect().left - ld.getBoundingClientRect().right : null,
      lowest: items.reduce((y, el) => Math.max(y, el.getBoundingClientRect().bottom), 0),
      stacks: [722, 677].map((h) => {
        const saved = body.style.cssText;
        body.style.cssText = saved + `;flex:0 0 ${h}px;height:${h}px;max-height:${h}px;overflow:visible`;
        const bb = body.getBoundingClientRect();
        const low = items.reduce((y, el) => Math.max(y, el.getBoundingClientRect().bottom), 0);
        const high = items.reduce((y, el) => Math.min(y, el.getBoundingClientRect().top), Infinity);
        body.style.cssText = saved;
        return { budget: h, bodyH: bb.height, fits: low <= bb.bottom + 0.6 && high >= bb.top - 0.6, stack: low - high };
      }),
      bodyH: body.getBoundingClientRect().height,
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

function nodeGate(name, r, block, loc, d) {
  const adj = adjectiveForms(loc);
  const left = r.m.badges.map((b) => b.concept);
  for (const b of r.m.badges) {
    const s = GLOBAL.symbols.find((x) => x.key === b.concept);
    ok(!!s && b.file === s.noun && b.dir === 'weather', `${name}: node gate — badge ${b.concept} shows ${b.dir}/${b.file}, the global says weather/${s && s.noun}`);
  }
  const rightConcepts = [];
  r.m.tiles.forEach((t, i) => {
    if (t.distractor) {
      ok((block.distractors || []).includes(t.word), `${name}: node gate — distractor "${t.word}" is not a bank distractor`);
      return;
    }
    rightConcepts.push(t.concept);
    ok(t.word === block.symbolWords[t.concept], `${name}: node gate — tile "${t.word}" ≠ symbolWords.${t.concept} "${block.symbolWords[t.concept]}"`);
    ok(!adj.includes(t.text.toLocaleLowerCase(loc)), `${name}: node gate — tile "${t.text}" is a vocab adjective form`);
    if (i < left.length) ok(left[i] !== t.concept, `${name}: node gate — row ${i + 1} is straight across`);
  });
  ok([...rightConcepts].sort().join() === [...left].sort().join(), `${name}: node gate — tile concepts ≠ badge concepts`);
  ok(!(rightConcepts.length === left.length && rightConcepts.every((c, i) => c === left[left.length - 1 - i])), `${name}: node gate — the word column is the reversed badge order`);
  ok(left.length === d.pairs && (d.keys ? [...left].sort().join() === [...d.keys].sort().join() : true), `${name}: node gate — badges ${left.join(',')} ≠ the config keys`);
}

function assertRender(name, r, d, opts) {
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.stamps && r.m.stamps.lcsLayout === 'base' && +r.m.stamps.lcsPairs === d.pairs && +r.m.stamps.lcsDistractors === d.distractors, `${name}: root stamps ${JSON.stringify(r.m.stamps)} ≠ base / pairs ${d.pairs} / distractors ${d.distractors}`);
  ok(r.m.badges.length === d.pairs && r.m.tiles.length === d.pairs + d.distractors, `${name}: ${r.m.badges.length} badges / ${r.m.tiles.length} tiles ≠ ${d.pairs} / ${d.pairs + d.distractors}`);
  ok(r.m.badges.every((b) => Math.abs(b.w - d.badge) < 0.6 && Math.abs(b.h - d.badge) < 0.6 && b.radius >= d.badge / 2 - 0.6), `${name}: badges ${JSON.stringify(r.m.badges.map((b) => [Math.round(b.w), Math.round(b.h), b.radius]))} ≠ round ${d.badge}`);
  const minBadge = r.m.badges.length ? Math.min(...r.m.badges.map((b) => Math.min(b.w, b.h))) : 0;
  ok(minBadge >= MIN_ICON, `${name}: badge ${minBadge} px < the K floor ${MIN_ICON}`);
  const minIcon = r.m.badges.length ? Math.min(...r.m.badges.map((b) => b.icon)) : 0;
  ok(minIcon >= MIN_ICON, `${name}: icon ${minIcon} px < the K floor ${MIN_ICON}`);
  ok(r.m.badges.every((b) => Math.abs(b.icon - d.iconPx) < 0.6), `${name}: icons ${JSON.stringify(r.m.badges.map((b) => b.icon))} ≠ config ${d.iconPx}`);
  ok(r.m.tiles.every((t) => Math.abs(t.w - 250) < 0.6 && Math.abs(t.h - d.tileH) < 0.6), `${name}: tiles ${JSON.stringify(r.m.tiles.map((t) => [Math.round(t.w), Math.round(t.h)]))} ≠ 250 x ${d.tileH}`);
  const minWord = r.m.tiles.length ? Math.min(...r.m.tiles.map((t) => t.px)) : 0;
  ok(minWord >= WORD_FLOOR, `${name}: word ${minWord} px < the K label floor ${WORD_FLOOR}`);
  ok(r.m.tiles.every((t) => Math.abs(t.px - d.wordPx) < 0.6), `${name}: words ${JSON.stringify(r.m.tiles.map((t) => t.px))} ≠ config ${d.wordPx}`);
  const widest = r.m.tiles.length ? Math.max(...r.m.tiles.map((t) => t.textW)) : 0;
  ok(widest <= TILE_INNER + 0.6, `${name}: the widest tile text ${widest.toFixed(1)} px > ${TILE_INNER}`);
  ok(r.m.zone != null && r.m.zone >= ZONE_MIN, `${name}: line zone ${r.m.zone && Math.round(r.m.zone)} px < ${ZONE_MIN} (design 213)`);
  ok(r.m.stage && r.m.stage.left >= r.m.body.left - 0.6 && r.m.stage.right <= r.m.body.right + 0.6, `${name}: stage outside the body column`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: an item reaches ${Math.round(r.m.lowest)} into the footer band at ${Math.round(r.m.foot)}`);
  for (const s of r.m.stacks) ok(s.fits, `${name}: the stack (${Math.round(s.stack)} px of items) overflows the ${s.budget} budget (body pinned to ${Math.round(s.bodyH)})`);
  if (opts && opts.block) nodeGate(name, r, opts.block, opts.loc, d);
  return { minIcon, zone: r.m.zone == null ? null : Math.round(r.m.zone), body: Math.round(r.m.bodyH), stack: Math.round(r.m.stacks[1].stack), widest: Math.round(widest) };
}

/* ------------------------------------------------------------------ poison helpers */
function typeWith(global, block, patch) {
  return Object.assign(Object.create(TYPE), { build(args, ctx) { return this._buildWith({ global, block }, { ...args, theme: 'weather' }, ctx); } }, patch || {});
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
/** A locale block derived from EN with the literals a poison needs (the panels author the real ones). */
function blockFor(en, patch) { const b = clone(en); Object.assign(b, patch || {}); return b; }
/** Synthetic near-real blocks (design §4 candidates) used only as poison CONTROLS. */
const SYN = {
  de: { symbolWords: { sun: 'Sonne', cloud: 'Wolke', rain: 'Regen', storm: 'Gewitter', snow: 'Schnee', rainbow: 'Regenbogen' }, forecastAsks: { sun: 'An welchem Tag scheint die Sonne?', cloud: 'An welchem Tag ist es bewölkt?', rain: 'An welchem Tag regnet es?', storm: 'An welchem Tag gibt es ein Gewitter?', snow: 'An welchem Tag schneit es?', rainbow: 'An welchem Tag gibt es einen Regenbogen?' }, cycleLabels: { evaporation: 'Verdunstung', condensation: 'Kondensation', precipitation: 'Niederschlag', collection: 'Sammlung' }, bandWords: { cold: 'kalt', warm: 'warm', hot: 'heiß' }, distractors: ['Wind', 'Nebel'], strand: 'Sachunterricht',
    strings: { 'K-356': { title: 'Wettersymbole', instruction: 'Verbinde jedes Wettersymbol mit seinem Wort.' }, 'G1-362': { title: 'Wettersymbole: Wetterwörter schreiben', instruction: 'Suche das Wort zu jedem Symbol in der Wortbank und schreibe es Buchstabe für Buchstabe in die Kästchen.' }, 'K-364': { title: 'Wetter beobachten: meine Woche', instruction: 'Schau jeden Tag aus dem Fenster und male das passende Wettersymbol in das Feld des Tages.' }, 'K-365': { title: 'Wettersymbole: Wie warm ist es?', instruction: 'Schau auf jedes Thermometer, lies in der Legende ab, ob es kalt, warm oder heiß ist, und kreise das passende Bild ein.' }, 'G3-385': { title: 'Wasserkreislauf beschriften', instruction: 'Lies die vier Wörter in der Wortbank und schreibe jedes auf die Linie mit der Nummer seines Pfeils.' }, 'G1-363': { title: 'Wettersymbole: Wetterbericht lesen', instruction: 'Schau dir das Wetter der Woche an, lies jede Frage und kreise den richtigen Tag ein.' } } },
  sv: { symbolWords: { sun: 'sol', cloud: 'moln', rain: 'regn', storm: 'åska', snow: 'snö', rainbow: 'regnbåge' }, forecastAsks: { sun: 'Vilken dag skiner solen?', cloud: 'Vilken dag är det molnigt?', rain: 'Vilken dag regnar det?', storm: 'Vilken dag åskar det?', snow: 'Vilken dag snöar det?', rainbow: 'Vilken dag syns en regnbåge?' }, cycleLabels: { evaporation: 'avdunstning', condensation: 'kondensation', precipitation: 'nederbörd', collection: 'uppsamling' }, bandWords: { cold: 'kallt', warm: 'varmt', hot: 'hett' }, distractors: [], strand: 'Naturorienterande ämnen',
    strings: { 'K-356': { title: 'Vädersymboler', instruction: 'Dra ett streck från varje vädersymbol till rätt ord.' }, 'G1-362': { title: 'Vädersymboler: skriv ordet', instruction: 'Hitta ordet till varje vädersymbol i ordbanken och skriv det, en bokstav i varje ruta.' }, 'K-364': { title: 'Väderdagbok: min vecka', instruction: 'Titta ut varje dag den här veckan och rita dagens vädersymbol i rutan.' }, 'K-365': { title: 'Vädersymboler: kallt eller varmt?', instruction: 'Titta på varje termometer, se i nyckeln om det är kallt, varmt eller hett och ringa in bilden som passar.' }, 'G3-385': { title: 'Vattnets kretslopp: skriv stegen', instruction: 'Läs de fyra orden i ordbanken och skriv varje ord på linjen med samma nummer som pilen.' }, 'G1-363': { title: 'Vädersymboler: läs väderprognosen', instruction: 'Titta på veckans väder, läs varje fråga och ringa in rätt dag.' } } },
};

SYN.fi = { symbolWords: { sun: 'aurinko', cloud: 'pilvi', rain: 'sade', storm: 'ukkonen', snow: 'lumi', rainbow: 'sateenkaari' }, forecastAsks: { sun: 'Minä päivänä paistaa aurinko?', cloud: 'Minä päivänä on pilvistä?', rain: 'Minä päivänä sataa?', storm: 'Minä päivänä on ukkonen?', snow: 'Minä päivänä sataa lunta?', rainbow: 'Minä päivänä näkyy sateenkaari?' }, cycleLabels: { evaporation: 'haihtuminen', condensation: 'tiivistyminen', precipitation: 'sadanta', collection: 'valunta' }, bandWords: { cold: 'kylmä', warm: 'lämmin', hot: 'kuuma' }, distractors: [], strand: 'Ympäristöoppi',
  strings: { 'K-356': { title: 'Säätilat', instruction: 'Yhdistä jokainen säämerkki oikeaan sanaan.' }, 'G1-362': { title: 'Säätilat: kirjoita sana', instruction: 'Etsi jokaisen säämerkin sana sanapankista ja kirjoita se ruutuihin, yksi kirjain jokaiseen ruutuun.' }, 'K-364': { title: 'Säätilat: minun viikkoni', instruction: 'Katso joka päivä ulos ja piirrä päivän säämerkki sen ruutuun.' }, 'K-365': { title: 'Säätilat: kylmä vai kuuma?', instruction: 'Katso jokaista lämpömittaria, katso avaimesta, onko kylmä, lämmin vai kuuma, ja ympyröi sopiva kuva.' }, 'G3-385': { title: 'Veden kiertokulku: nimeä vaiheet', instruction: 'Lue sanapankin neljä sanaa ja kirjoita jokainen viivalle, jolla on sama numero kuin kuvassa.' }, 'G1-363': { title: 'Säätilat: lue sääennuste', instruction: 'Katso viikon säätä, lue jokainen kysymys ja ympyröi oikea päivä.' } } };

/** G3-345 bodies (d1..d3, en, seedEpoch 1) hashed through the CURRENT module graph; `flipNumerals` re-requires the graph with the primitive's `numerals` default flipped (PR12). */
async function hashG3345(flipNumerals) {
  const thermPath = path.join(WG, 'primitives', 'thermometer.js');
  const factoryPath = path.join(WG, 'types', '_shared', 'measurement-tasks.js');
  const specPath = path.join(WG, 'types', 'g3', 'G3-345-read-thermometer.js');
  const saved = {};
  for (const p of [thermPath, factoryPath, specPath]) { saved[p] = require.cache[p]; delete require.cache[p]; }
  try {
    if (flipNumerals) {
      const real = require(thermPath);
      delete require.cache[thermPath];
      const stub = new (require('module'))(thermPath);
      stub.filename = thermPath; stub.loaded = true;
      stub.exports = (opts, ctx) => real({ numerals: false, ...opts }, ctx);
      require.cache[thermPath] = stub;
    }
    const T = require(specPath);
    const out = {};
    for (const d of [1, 2, 3]) {
      const rng = makeRng(instanceSeed({ typeId: T.id, theme: null, difficulty: d, seedEpoch: 1 }));
      const b = await T.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
      out[d] = sha1(b.bodyHtml);
    }
    return out;
  } finally {
    for (const p of [thermPath, factoryPath, specPath]) { delete require.cache[p]; if (saved[p]) require.cache[p] = saved[p]; }
  }
}


/* ------------------------------------------------------------------ faces (Phase 2) */
/** The face specs (emitted by tools/gen-b4var-specs.js from tools/b4var-rows/weather-symbols.js). */
const FACE = Object.fromEntries(Object.keys(FACE_IDS).map((id) => [id, loadType(id)]));
/** The gear key of a band (global). */
const GEAR_OF_BAND = Object.fromEntries(GLOBAL.gear.map((g) => [g.band, g]));
/** Two chrome fixtures: the tallest chrome the 70 / 150 limits produce (de 3-line title + 3-line instruction, body ~710) and a 4-line title (fi, body ~677). */
const CHROME = {
  long: { title: 'Wettersymbole: Verbinde jedes Wettersymbol mit dem Wort, das passt', instruction: 'Zeichne von jedem Wettersymbol eine gerade Linie zu dem Wort, das dazu gehört. Jedes Symbol bekommt genau eine Linie und jedes Wort genau ein Symbol. Lies gut.'.slice(0, 150) },
  fi4: { title: 'Säätilat: kirjoita jokaisen sääsymbolin sana kirjaimittain omiin ruutuihinsa', instruction: 'Etsi jokaisen sääsymbolin sana sanapankista ja kirjoita se ruutuihin, yksi kirjain jokaiseen ruutuun. Lue tarkasti ja tarkista lopuksi jokainen rivi.'.slice(0, 150) },
};

/**
 * A title that LISTS options lists exactly the shipped d2 config (nt10-D addition): if K-365's title names any band
 * word of the locale, the band words it names (in title order) must be d2's `bands` in band order; if K-364's title
 * names any day of the locale, it must name exactly the diary's first and last day for d2's `start`.
 */
function titleConfigFindings(block, loc) {
  const f = [];
  const strings = block.strings || {};
  const t3 = strings['K-365'] && strings['K-365'].title;
  if (t3 && FACE['K-365']) {
    const d = FACE['K-365'].difficulty[2];
    const bw = block.bandWords || {};
    const seg = nfd(t3).split(/[?:]/).pop();   // the LISTED segment: after the last ? or : ("How Warm Is It?" is the head, not an option)
    const named = [];
    for (const m of seg.matchAll(/[\p{L}]+/gu)) { const b = Object.keys(bw).find((k) => nfd(bw[k]) === m[0]); if (b) named.push(b); }
    if (named.length && named.join() !== d.bands.join()) f.push(`[${loc}] K-365 title "${t3}" lists ${named.join(',')} but d2 ships the bands ${d.bands.join(',')} (a title that lists options lists exactly the shipped chips)`);
  }
  const t2 = strings['K-364'] && strings['K-364'].title;
  if (t2 && FACE['K-364'] && NAMES[loc]) {
    const d = FACE['K-364'].difficulty[2];
    const first = (d.start || block.diaryStart) === 'sun' ? 0 : 1, last = (first + 6) % 7;
    const names = NAMES[loc].dayNames;
    const named = names.map((n, i) => ({ i, at: hasToken(nfd(t2), nfd(n)) ? nfd(t2).indexOf(nfd(n)) : -1 })).filter((x) => x.at >= 0).sort((a, b) => a.at - b.at).map((x) => x.i);   // in TITLE order
    if (named.length && named.join() !== [first, last].join()) f.push(`[${loc}] K-364 title "${t2}" names the days ${named.map((i) => names[i]).join(',')} but d2 runs ${names[first]}..${names[last]}`);
  }
  return f;
}

/** Renders a face through render-instance.js and measures its stage (generic + per-layout numbers) in the browser. */
async function renderFace(page, spec, { locale, baseName, strings, seedEpoch }) {
  const out = await renderInstance({ type: spec, theme: 'weather', difficulty: 2, locale: locale || 'en', page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-ws-content][data-lcs-weather-symbols]');
    const body = document.querySelector('[data-lcs-body]');
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const rect = (el) => { if (!el) return { left: 0, right: 0, top: 0, bottom: 0, w: 0, h: 0 }; const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };   // null-safe: a poison may remove the node
    if (!root) return { stamps: null };
    const layout = root.dataset.lcsLayout;
    const items = [...root.querySelectorAll('[data-lcs-spell], [data-lcs-day], [data-lcs-key], .ws-card, [data-lcs-label], [data-lcs-strip], [data-lcs-q], [data-lcs-bank-banner], [data-lcs-diagram]')];
    const lowest = (els) => els.reduce((y, el) => Math.max(y, el.getBoundingClientRect().bottom), 0);
    const per = {};
    if (layout === 'write') {
      const rows = [...root.querySelectorAll('[data-lcs-spell]')];
      per.rows = rows.length;
      per.blankMax = rows.slice(1).reduce((mx, el, i) => Math.max(mx, el.getBoundingClientRect().top - rows[i].getBoundingClientRect().bottom), 0);
      per.boxes = [...root.querySelectorAll('[data-lcs-letterboxes]')].map((s) => { const r = s.getBoundingClientRect(); return { n: +s.getAttribute('data-lcs-letterboxes'), w: r.width, h: r.height }; });
      per.badge = rows.map((el) => { const b = el.querySelector('[data-lcs-badge]'); const im = el.querySelector('img'); return { d: b.getBoundingClientRect().width, icon: im.getBoundingClientRect().width }; });
      per.rowRight = Math.max(...rows.map((el) => el.getBoundingClientRect().right));
      per.lanes = rows.map((el) => { const lr = el.getBoundingClientRect(); let top = Infinity, bottom = -Infinity, right = -Infinity; [...el.querySelectorAll('[data-lcs-badge], [data-lcs-letterboxes]')].forEach((ch) => { const r = ch.getBoundingClientRect(); top = Math.min(top, r.top); bottom = Math.max(bottom, r.bottom); right = Math.max(right, r.right); }); return { lane: el.classList.contains('ws-lane'), h: lr.height, blank: Math.max(top - lr.top, lr.bottom - bottom), inside: right <= lr.right + 0.6, over: right - lr.right, right: right - lr.left }; });
      per.bank = [...root.querySelectorAll('[data-lcs-bank-word]')].map((s) => s.getAttribute('data-lcs-bank-word'));
      per.concepts = rows.map((el) => ({ c: el.dataset.lcsSpell, len: +el.dataset.lcsLen, groups: el.dataset.lcsGroups }));
    } else if (layout === 'diary') {
      const days = [...root.querySelectorAll('[data-lcs-day]')];
      per.days = days.map((el) => ({ idx: +el.dataset.lcsDay, name: el.querySelector('[data-lcs-day-name]').textContent.trim(), box: rect(el.querySelector('[data-lcs-drawbox]')) }));
      per.key = [...root.querySelectorAll('[data-lcs-key] img')].map((im) => im.getBoundingClientRect().width);
      per.rowsH = [rect(days[0]).h, rect(days[4]).h];
    } else if (layout === 'thermometer') {
      per.keyH = rect(root.querySelector('[data-lcs-key]')).h;
      per.keyValues = [...root.querySelectorAll('[data-lcs-key-band] svg')].map((s) => +s.getAttribute('data-lcs-value'));
      per.cards = [...root.querySelectorAll('[data-lcs-thermo]')].map((el) => { const svg = el.querySelector('[data-lcs-thermo-box] svg'); const card = el.closest('.ws-card'); return { value: +el.dataset.lcsValue, band: el.dataset.lcsBandOf, thermH: rect(svg).h, cardH: rect(card).h, chips: [...el.querySelectorAll('[data-lcs-chip]')].map((c) => ({ key: c.dataset.lcsChip, w: rect(c).w, icon: rect(c.querySelector('img')).w, correct: c.dataset.lcsCorrect === '1' })), inside: rect(svg).bottom <= rect(card).bottom + 0.6 && rect(svg).top >= rect(card).top - 0.6 }; });
      per.texts = root.querySelectorAll('svg[data-lcs-prim="thermometer"] text').length;
    } else if (layout === 'water-cycle') {
      const svg = root.querySelector('svg[data-lcs-prim="water-cycle"]');
      per.svg = rect(svg);
      per.markers = [...svg.querySelectorAll('[data-lcs-marker]')].map((g) => ({ a: g.dataset.lcsMarker, n: +g.dataset.lcsN, px: parseFloat(getComputedStyle(g.querySelector('text')).fontSize) }));
      per.lanes = [...root.querySelectorAll('[data-lcs-label]')].map((l) => ({ a: l.dataset.lcsAnchor, n: +l.dataset.lcsN, top: rect(l).top, row: rect(l.querySelector('svg[data-lcs-prim="writing-row"]') || l) }));
      per.bank = [...root.querySelectorAll('[data-lcs-bank-word]')].map((s) => s.getAttribute('data-lcs-bank-word'));
      per.stageH = Math.max(...[...root.children].map((c) => rect(c).bottom)) - rect(root).top;
    } else if (layout === 'forecast') {
      per.strip = [...root.querySelectorAll('[data-lcs-fday]')].map((d) => ({ idx: +d.dataset.lcsFday, c: d.dataset.lcsConcept, name: d.querySelector('[data-lcs-fday-name]').textContent.trim(), icon: rect(d.querySelector('img')).w }));
      per.stripH = rect(root.querySelector('[data-lcs-strip]')).h;
      per.qs = [...root.querySelectorAll('[data-lcs-q]')].map((q) => { const t = q.querySelector('[data-lcs-q-text]'); const cs = [...q.querySelectorAll('[data-lcs-dchip]')]; const row = q.querySelector('[data-lcs-dchips]'); const qr = rect(q); const askH = rect(q.children[0]).h; const pillH = Math.max(...cs.map((c) => rect(c).h)); return { c: q.dataset.lcsConcept, text: t ? t.textContent.trim() : null, textPx: t ? parseFloat(getComputedStyle(t).fontSize) : 0, laneH: qr.h, blank: qr.h - 28 - askH - 8 - pillH, pillH, pillMin: Math.min(...cs.map((c) => rect(c).h)), chips: cs.map((c) => ({ idx: +c.dataset.lcsDchip, label: c.textContent.trim(), correct: c.dataset.lcsCorrect === '1' })), rowW: row.scrollWidth, rowClient: row.clientWidth }; });
    }
    const stacks = [722, 677].map((h) => {
      const saved = body.style.cssText;
      body.style.cssText = saved + `;flex:0 0 ${h}px;height:${h}px;max-height:${h}px;overflow:visible`;
      const bb = body.getBoundingClientRect();
      const low = lowest(items);
      let inner = true;
      // under the pin the stage still fits its own contents: the diary boxes stay >= 200, every thermometer stays inside its card, every lane inside its row
      if (layout === 'diary') inner = [...root.querySelectorAll('[data-lcs-drawbox]')].every((b) => b.getBoundingClientRect().height >= 200 - 0.6);
      if (layout === 'thermometer') inner = [...root.querySelectorAll('[data-lcs-thermo]')].every((el) => { const s = el.querySelector('svg').getBoundingClientRect(), c = el.closest('.ws-card').getBoundingClientRect(); return s.bottom <= c.bottom + 0.6 && s.top >= c.top - 0.6; });
      if (layout === 'write') inner = [...root.querySelectorAll('[data-lcs-spell]')].every((el) => el.getBoundingClientRect().height >= 88 - 0.6);
      if (layout === 'forecast') inner = [...root.querySelectorAll('[data-lcs-dchip]')].every((el) => el.getBoundingClientRect().height >= 44 - 0.6);
      body.style.cssText = saved;
      return { budget: h, bodyH: bb.height, fits: low <= bb.bottom + 0.6 && inner, stack: low - bb.top, inner };
    });
    return { stamps: { ...root.dataset }, layout, body: rect(body), foot, stage: rect(root), lowest: lowest(items), bodyH: body.getBoundingClientRect().height, per, stacks };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta, html: out.html };
}

/** The face render assertions (floors measured on the render + the node cross-checks against the locale bank). */
function assertFace(name, id, r, block, loc) {
  const d = FACE[id].difficulty[2];
  const mode = FACE_IDS[id];
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.stamps && r.m.stamps.lcsLayout === mode, `${name}: root layout stamp ${r.m.stamps && r.m.stamps.lcsLayout} ≠ ${mode}`);
  ok(r.m.stage && r.m.stage.left >= r.m.body.left - 0.6 && r.m.stage.right <= r.m.body.right + 0.6, `${name}: stage outside the body column`);
  ok(r.m.stage && Math.abs(r.m.stage.top - r.m.body.top) <= 3, `${name}: stage not top-anchored`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: an item reaches ${Math.round(r.m.lowest)} into the footer band at ${Math.round(r.m.foot)}`);
  for (const s of r.m.stacks) ok(s.fits, `${name}: under the ${s.budget} budget the stage ${s.inner ? 'overflows the body' : 'squeezes its contents'} (lowest ${Math.round(s.stack)} of ${Math.round(s.bodyH)})`);
  const p = r.m.per;
  const adj = adjectiveForms(loc);
  let line = '';
  if (mode === 'write') {
    ok(p.rows === d.rows, `${name}: ${p.rows} rows ≠ ${d.rows}`);
    ok(p.blankMax <= 10, `${name}: ${Math.round(p.blankMax)} px blank between the lanes > 10 (sparse)`);
    // the box is the LOCALE's: the largest in box..boxMax at which the widest bank word fits the lane room (re-derived here)
    const room = 639 - d.badge - 12;
    const want = C4.spellBox({ words: Object.values(block.symbolWords), room, boxMin: d.box, boxMax: d.boxMax || 60, gap: d.gap });
    const box = +r.m.stamps.lcsBox;
    ok(want != null && box === want, `${name}: box ${box} ≠ the locale's ${want} (box..boxMax ${d.box}..${d.boxMax || 60}, room ${room})`);
    ok(p.boxes.every((b) => Math.abs(b.h - (box + 2)) < 0.6 && Math.abs(b.w - (b.n * box + (b.n - 1) * d.gap + 2)) < 0.6), `${name}: letter boxes ${JSON.stringify(p.boxes.slice(0, 3))} ≠ box ${box} gap ${d.gap}`);
    ok(p.boxes.every((b) => b.h >= 46), `${name}: a letter box under 44`);
    ok(p.lanes.every((l) => l.lane), `${name}: a spell row is not a lane card`);
    ok(p.lanes.every((l) => l.inside), `${name}: letter boxes run past their lane ${JSON.stringify(p.lanes.filter((l) => !l.inside).map((l) => Math.round(l.over)))}`);
    ok(p.lanes.every((l) => l.blank <= 24), `${name}: blank inside a lane ${JSON.stringify(p.lanes.map((l) => Math.round(l.blank)))} > 24 (sparse)`);
    ok(p.lanes.every((l) => l.h >= 88 - 0.6), `${name}: a lane under 88 px ${JSON.stringify(p.lanes.map((l) => Math.round(l.h)))}`);
    ok(p.badge.every((b) => Math.abs(b.d - d.badge) < 0.6 && Math.abs(b.icon - d.iconPx) < 0.6 && b.icon >= 44), `${name}: badges ${JSON.stringify(p.badge.slice(0, 2))} ≠ ${d.badge} / ${d.iconPx}`);
    ok(p.rowRight <= r.m.stage.right + 0.6, `${name}: a spell row runs past the stage`);
    // node: the stamps re-derive from the bank literals; the bank set = the row words; bank order ≠ row order
    for (const c of p.concepts) {
      const w = block.symbolWords[c.c];
      ok(c.len === w.split('-').reduce((n, g) => n + [...g].length, 0) && c.groups === w.split('-').map((g) => [...g].length).join('-'), `${name}: node gate — row ${c.c} len ${c.len} / groups ${c.groups} ≠ "${w}"`);
    }
    if (d.bank) {
      ok([...p.bank].sort().join('|') === p.concepts.map((c) => block.symbolWords[c.c]).sort().join('|'), `${name}: node gate — bank ${p.bank.join(',')} ≠ the row words`);
      ok(p.bank.join('|') !== p.concepts.map((c) => block.symbolWords[c.c]).join('|'), `${name}: node gate — the bank is in row order (a position leak)`);
      ok(p.bank.every((w) => !adj.includes(w.toLocaleLowerCase(loc))), `${name}: node gate — a bank word is a vocab adjective form`);
    }
    line = `rows ${p.rows} box ${box} (room ${room}) lanes ${p.lanes.map((l) => Math.round(l.h)).join('/')} blank-in-lane max ${Math.round(Math.max(...p.lanes.map((l) => l.blank)))} between ${Math.round(p.blankMax)} widest row ${Math.round(Math.max(...p.lanes.map((l) => l.right)))} bank ${p.bank.join('/')}`;
  } else if (mode === 'diary') {
    const first = d.start === 'sun' ? 0 : 1;
    const names = Array.isArray(block.diaryDays) ? block.diaryDays : NAMES[loc].dayNames;
    ok(p.days.length === 7 && p.days.every((x, i) => x.idx === (first + i) % 7 && x.name === names[(first + i) % 7]), `${name}: node gate — day cells ${JSON.stringify(p.days.map((x) => [x.idx, x.name]))} ≠ dayNames from ${d.start}`);
    ok(p.days.every((x) => x.box.w >= 136 - 0.6 && x.box.h >= 200 - 0.6), `${name}: draw boxes ${JSON.stringify(p.days.map((x) => [Math.round(x.box.w), Math.round(x.box.h)]))} < 136 x 200`);
    ok(p.key.length === 6 && p.key.every((w) => Math.abs(w - d.legendPx) < 0.6 && w >= 56), `${name}: key icons ${JSON.stringify(p.key)} ≠ ${d.legendPx}`);
    line = `boxes ${Math.round(p.days[0].box.w)} x ${Math.round(p.days[0].box.h)} / ${Math.round(p.days[4].box.h)} rows ${p.rowsH.map(Math.round).join('/')} days ${p.days.map((x) => x.name).join(',')}`;
  } else if (mode === 'thermometer') {
    ok(Math.abs(p.keyH - (d.keyH + 28)) < 0.6, `${name}: key row ${Math.round(p.keyH)} ≠ ${d.keyH + 28}`);
    ok(p.keyValues.join() === GLOBAL.bands.order.map((b) => GLOBAL.bands.keyValues[b]).join(), `${name}: node gate — key values ${p.keyValues.join(',')} ≠ the global keyValues`);
    ok(p.cards.length === d.items && p.cards.every((c) => Math.abs(c.thermH - d.thermH) < 0.6 && c.inside), `${name}: item thermometers ${JSON.stringify(p.cards.map((c) => [Math.round(c.thermH), c.inside]))} ≠ ${d.thermH} inside their cards`);
    ok(p.cards.every((c) => c.thermH / (c.cardH - 28) >= 0.6), `${name}: a thermometer fills < 0.6 of its card (sparse): ${JSON.stringify(p.cards.map((c) => (c.thermH / (c.cardH - 28)).toFixed(2)))}`);
    ok(p.cards.every((c) => c.chips.length === d.chips.length && c.chips.every((ch) => Math.abs(ch.w - d.chip) < 0.6 && Math.abs(ch.icon - d.iconPx) < 0.6 && ch.w >= 56)), `${name}: chips ≠ ${d.chip} / icon ${d.iconPx}`);
    ok(p.texts === 0, `${name}: ${p.texts} <text> nodes inside the thermometers`);
    // node: every value is a legal interior value of its stamped band; the correct chip is that band's gear
    for (const c of p.cards) {
      ok((GLOBAL.bands.values[c.band] || []).includes(c.value), `${name}: node gate — card value ${c.value} is not a ${c.band} value in the global table`);
      const correct = c.chips.find((ch) => ch.correct);
      ok(correct && GEAR_OF_BAND[c.band] && correct.key === GEAR_OF_BAND[c.band].key, `${name}: node gate — the correct chip ${correct && correct.key} ≠ the ${c.band} gear ${GEAR_OF_BAND[c.band] && GEAR_OF_BAND[c.band].key}`);
    }
    line = `key ${Math.round(p.keyH)} cards ${p.cards.map((c) => c.band + '@' + c.value).join(' ')} therm ${Math.round(p.cards[0].thermH)}/${Math.round(p.cards[0].cardH)} chips ${p.cards.map((c) => c.chips.map((ch) => ch.key[0]).join('')).join(' ')}`;
  } else if (mode === 'water-cycle') {
    ok(p.svg.w >= d.w - 0.6 && p.svg.w >= 480, `${name}: diagram ${Math.round(p.svg.w)} px < ${d.w}`);
    ok(Math.abs(p.svg.h - p.svg.w * 400 / 640) < 1, `${name}: diagram ${Math.round(p.svg.w)} x ${Math.round(p.svg.h)} is not 640:400`);
    ok(p.markers.map((m) => m.a + m.n).join() === GLOBAL.cycle.map((k, i) => k + (i + 1)).join(), `${name}: markers ${JSON.stringify(p.markers)} ≠ the cycle order`);
    ok(p.markers.every((m) => m.px >= 16 - 0.6), `${name}: a marker numeral < 16 px (${p.markers.map((m) => m.px.toFixed(1)).join(',')})`);
    ok(p.lanes.every((l) => l.top >= p.svg.bottom - 0.6 && l.row.w >= d.laneW - 0.6 && l.row.h >= d.laneH - 0.6), `${name}: lanes below the diagram / ${d.laneW} x ${d.laneH}`);
    ok(p.stageH >= 600, `${name}: stage ${Math.round(p.stageH)} < 600 (sparse)`);
    // node: the bank = the four stage literals, never in cycle order nor reversed
    const labels = GLOBAL.cycle.map((k) => block.cycleLabels[k]);
    ok([...p.bank].sort().join('|') === [...labels].sort().join('|'), `${name}: node gate — bank ${p.bank.join(',')} ≠ the cycle labels`);
    ok(p.bank.join('|') !== labels.join('|'), `${name}: node gate — bank order = cycle`);
    ok(p.bank.join('|') !== labels.slice().reverse().join('|'), `${name}: node gate — bank order = reversed cycle`);
    line = `diagram ${Math.round(p.svg.w)} x ${Math.round(p.svg.h)} numeral ${p.markers[0].px.toFixed(1)} px stage ${Math.round(p.stageH)} bank ${p.bank.join('/')}`;
  } else if (mode === 'forecast') {
    const labels = Array.isArray(block.forecastDays) ? block.forecastDays : GLOBAL.forecast.days.map((i) => NAMES[loc].dayNames[i]);
    ok(p.strip.length === 5 && p.strip.every((s, i) => s.idx === GLOBAL.forecast.days[i] && s.name === labels[i] && Math.abs(s.icon - d.symbolPx) < 0.6), `${name}: node gate — strip ${JSON.stringify(p.strip.map((s) => [s.idx, s.name, s.icon]))} ≠ Mon..Fri at ${d.symbolPx}`);
    ok(new Set(p.strip.map((s) => s.c)).size === 5, `${name}: strip symbols repeat`);
    ok(p.qs.length === d.asks, `${name}: ${p.qs.length} questions ≠ ${d.asks}`);
    for (const q of p.qs) {
      ok(q.text === block.forecastAsks[q.c], `${name}: node gate — question "${q.text}" ≠ forecastAsks.${q.c} "${block.forecastAsks[q.c]}"`);
      ok(q.textPx >= 16, `${name}: question ${q.textPx} px < 16`);
      ok(q.chips.map((c) => c.label).join('|') === labels.join('|'), `${name}: node gate — chips ${q.chips.map((c) => c.label).join(',')} ≠ ${labels.join(',')}`);
      ok(q.pillMin >= d.chipH - 0.6 && q.pillH <= (d.chipMax || 64) + 0.6, `${name}: pills ${Math.round(q.pillMin)}..${Math.round(q.pillH)} outside ${d.chipH}..${d.chipMax || 64}`);
      ok(q.rowW <= q.rowClient + 0.6 && q.rowW <= PILL_MAX + 0.6, `${name}: pill row ${q.rowW} > lane ${q.rowClient} / ${PILL_MAX}`);
      ok(q.blank <= 90, `${name}: ${Math.round(q.blank)} px blank inside a lane > 90 (sparse)`);
    }
    line = `strip ${p.strip.map((s) => s.c).join(',')} h ${Math.round(p.stripH)} asks ${p.qs.map((q) => q.c).join(',')} lanes ${p.qs.map((q) => Math.round(q.laneH)).join('/')} pills ${p.qs.map((q) => Math.round(q.pillH)).join('/')} blank ${p.qs.map((q) => Math.round(q.blank)).join('/')}`;
  }
  return { body: Math.round(r.m.bodyH), line, stack: r.m.stacks.map((s) => `${s.budget}:${s.fits ? 'ok' : 'FAIL'}`).join(' ') };
}

/** A face spec whose build() post-processes the real face output (the render poisons). */
function faceWith(id, mutate) {
  return Object.assign(Object.create(FACE[id]), { build(args, ctx) { const out = FACE[id].build.call(FACE[id], args, ctx); const html = mutate(out.bodyHtml, out.meta); if (html === out.bodyHtml) throw new Error('poison no-op: the mutation changed nothing'); out.bodyHtml = html; return out; } });
}
/** A face spec built over an INJECTED bank block (the bank poisons: PR4 / PR18). */
function faceBank(id, block, locale) {
  return Object.assign(Object.create(FACE[id]), { build(args, ctx) { return FACE[id]._buildWith({ global: GLOBAL, block }, { ...args, theme: 'weather', locale }, ctx); } });
}
/** A face spec with a patched d2 config (the config-guard poisons). */
function faceConfig(id, patch) {
  const t = Object.create(FACE[id]);
  const D = { ...FACE[id].difficulty[2], ...patch };
  t.difficulty = { 1: D, 2: D, 3: D };
  return t;
}
function buildThrows(spec, locale) {
  try { spec._buildWith({ global: GLOBAL, block: bankModule('weather-symbols')[locale || 'en'] }, { theme: 'weather', difficulty: 2, locale: locale || 'en' }, { rng: makeRng('poison') }); return []; } catch (e) { return [e.message]; }
}

/* ------------------------------------------------------------------ main */
async function main() {
  const mod = bankModule('weather-symbols');
  const locales = Object.keys(mod);
  const en = mod.en;
  // 1. bank (control)
  {
    const f = validateGlobal(GLOBAL);
    ok(f.length === 0, `global: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`global: symbols ${GLOBAL.symbols.map((s) => s.key + '=' + s.noun).join(' · ')}; gear ${GLOBAL.gear.map((g) => g.band + '=' + g.theme + '/' + g.noun).join(' · ')}; bands ${GLOBAL.bands.order.join('/')} edges ${GLOBAL.bands.edges.join(',')}; excluded ${GLOBAL.excluded.length}`);
  }
  for (const loc of locales) {
    const f = validateBank(mod[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`bank ${loc}: words ${KEYS.map((k) => mod[loc].symbolWords[k]).join(' / ')}; asks ${KEYS.map((k) => JSON.stringify(mod[loc].forecastAsks[k])).join(' ')}; cycle ${CYCLE.map((k) => mod[loc].cycleLabels[k]).join(' / ')}; refuse ${JSON.stringify(mod[loc].refuse)}; strand "${mod[loc].strand}"`);
  }
  // the synthetic controls must validate clean in node before they serve as poison controls
  for (const [loc, syn] of Object.entries(SYN)) {
    const f = validateBank(blockFor(en, syn), loc);
    ok(f.length === 0, `synthetic ${loc} control: ${f.length} findings\n    ` + f.slice(0, 8).join('\n    '));
  }


  // 6a. the faces' fixed tables: the in-browser copies inside _verifyFace must equal the global bank / the primitive exports
  {
    const src = fs.readFileSync(path.join(WG, 'types', 'k', 'K-356-weather-symbols.js'), 'utf8');
    const vf = src.slice(src.indexOf('async _verifyFace(page)'));
    const lit = (name) => { const m = new RegExp('const ' + name + ' = (\\{[^\\n]*\\}|\\[[^\\n]*\\]);').exec(vf); if (!m) throw new Error('verifyFace: no ' + name + ' literal'); return new Function('return ' + m[1])(); };
    const nounOf = lit('NOUN_OF'), gear = lit('GEAR'), bands = lit('BANDS'), anchors = lit('ANCHORS'), cyc = lit('CYCLE');
    ok(KEYS.every((k) => nounOf[k] === GLOBAL.symbols.find((s) => s.key === k).noun), 'verifyFace NOUN_OF ≠ the global symbol nouns');
    ok(GLOBAL.gear.every((g) => gear[g.key] && gear[g.key].band === g.band && gear[g.key].dir === g.theme) && Object.keys(gear).length === GLOBAL.gear.length, 'verifyFace GEAR ≠ the global gear triple');
    ok(bands.order.join() === GLOBAL.bands.order.join() && bands.min === GLOBAL.bands.min && bands.max === GLOBAL.bands.max && bands.edges.join() === GLOBAL.bands.edges.join() && GLOBAL.bands.order.every((b) => bands.values[b].join() === GLOBAL.bands.values[b].join()), 'verifyFace BANDS ≠ the global band table');
    ok(Object.keys(WC.ANCHORS).every((k) => anchors[k] && anchors[k][0] === WC.ANCHORS[k].x && anchors[k][1] === WC.ANCHORS[k].y) && Object.keys(anchors).length === Object.keys(WC.ANCHORS).length, 'verifyFace ANCHORS ≠ primitives/water-cycle.js ANCHORS');
    ok(cyc.join() === [...GLOBAL.cycle, ...GLOBAL.cycleExtra].join(), 'verifyFace CYCLE ≠ the global cycle + cycleExtra');
    // every picture a face keeps exists ON DISK at the path fileUri resolves (the cache the render reads)
    const pics = [...GLOBAL.symbols.map((s) => [s.theme, s.noun]), ...GLOBAL.gear.map((g) => [g.theme, g.noun])];
    for (const [t, n] of pics) {
      const p = decodeURIComponent(fileUri(t, n).replace(/^file:\/\/\//, ''));
      ok(fs.existsSync(p) && fs.statSync(p).size > 0, `picture ${t}/${n} is not on disk at ${p}`);
    }
    console.log(`faces: the verifyFace tables agree with the global bank + water-cycle.js; ${pics.length}/${pics.length} pictures on disk`);
    // the rows module = one source with the bank strings (title + instruction verbatim)
    const rows = require(path.join(WG, 'tools', 'b4var-rows', 'weather-symbols.js')).ROWS;
    ok(rows.length === 5 && rows.map((r) => r[1]).sort().join() === Object.keys(FACE_IDS).sort().join(), 'b4var-rows/weather-symbols.js does not carry exactly the five allocated ids');
    for (const r of rows) {
      const s = en.strings[r[1]];
      ok(s && s.title === r[6] && s.instruction === r[7], `row ${r[1]}: title / instruction ≠ the bank strings (one source)`);
      ok(r[5].layout === FACE_IDS[r[1]], `row ${r[1]}: layout ${r[5].layout} ≠ ${FACE_IDS[r[1]]}`);
      const spec = FACE[r[1]];
      ok(spec && spec.id === r[1] && spec.difficulty[2].layout === r[5].layout && spec.i18n.en.title === r[6], `types/${r[0]}/${r[1]}-${r[2]}.js is not the emitted row (run tools/gen-b4var-specs.js)`);
      const band = { g1: 'G1', k: 'K', g3: 'G3' }[r[0]];
      ok(spec && spec.gradeBand === band, `${r[1]}: gradeBand ${spec && spec.gradeBand} ≠ ${band} (extra {gradeBand} for a face outside the base's band)`);
    }
    // the title-lists-config rule (nt10-D addition): a title that LISTS options lists exactly the shipped d2 config
    const tf = titleConfigFindings(en, 'en');
    ok(tf.length === 0, `title vs config: ${tf.join('; ')}`);
    console.log('faces: rows = bank strings; F3 title lists the three bands in band order; F2 title names the first + last diary day');
    // the water-cycle primitive's own gate re-runs clean
    const wc = spawnSync(process.execPath, [path.join(WG, 'qa', 'verify-water-cycle.js')], { encoding: 'utf8' });
    const wcLine = (wc.stdout || '').trim().split('\n').pop();
    ok(wc.status === 0 && /^PASS/.test(wcLine), `qa/verify-water-cycle.js: exit ${wc.status} — ${wcLine}`);
    console.log('water-cycle primitive gate: ' + wcLine);
  }

  // the seven face components: a node smoke proves each builds its stamped markup from plausible args
  {
    const src = fileUri('weather', 'sunny');
    const therm = (value, h) => thermometer({ value, min: -10, max: 40, step: 5, height: h, numerals: false, bands: [{ key: 'cold', from: -10, to: 10, fill: 'tealSoft' }, { key: 'warm', from: 10, to: 25, fill: 'white' }, { key: 'hot', from: 25, to: 40, fill: 'coralSoft' }] });
    const smoke = {
      spellRow: [C4.spellRow({ concept: 'rainbow', src, word: 'arc-en-ciel' }), /data-lcs-spell="rainbow" data-lcs-len="9" data-lcs-groups="3-2-4"/, (h) => (h.match(/data-lcs-hyphen/g) || []).length === 2 && (h.match(/data-lcs-letterboxes="(\d+)"/g) || []).join() === 'data-lcs-letterboxes="3",data-lcs-letterboxes="2",data-lcs-letterboxes="4"'],
      diaryWeek: [C4.diaryWeek({ days: [1, 2, 3, 4, 5, 6, 0].map((i) => ({ index: i, name: NAMES.en.dayNames[i] })), key: KEYS.map((k) => ({ concept: k, src })) }), /data-lcs-layout="diary"/, (h) => (h.match(/data-lcs-day="/g) || []).length === 7 && (h.match(/data-lcs-drawbox/g) || []).length === 7 && (h.match(/data-lcs-symbol="/g) || []).length === 6 && !/<text/.test(h)],
      bandKey: [C4.bandKey({ bands: [{ key: 'cold', value: 0, src }, { key: 'warm', value: 17.5, src }, { key: 'hot', value: 32.5, src }], therm }), /data-lcs-key/, (h) => (h.match(/data-lcs-key-band="/g) || []).length === 3 && !/<text/.test(h)],
      bandThermo: [C4.bandThermo({ n: 1, value: 15, chips: [{ key: 'scarf', src }, { key: 't-shirt', src, correct: true }, { key: 'sunglasses', src }], therm }), /data-lcs-thermo data-lcs-n="1" data-lcs-value="15"/, (h) => (h.match(/data-lcs-correct="1"/g) || []).length === 1 && (h.match(/data-lcs-chip="/g) || []).length === 3 && !/<text/.test(h)],
      forecastStrip: [C4.forecastStrip({ days: [1, 2, 3, 4, 5].map((i, j) => ({ index: i, name: NAMES.en.dayNames[i], concept: KEYS[j], src })) }), /data-lcs-strip/, (h) => (h.match(/data-lcs-fday="/g) || []).length === 5],
      forecastQuestion: [C4.forecastQuestion({ n: 1, text: 'Which day is rainy?', concept: 'rain', chips: [1, 2, 3, 4, 5].map((i) => ({ index: i, label: NAMES.en.dayNames[i], correct: i === 3 })) }), /data-lcs-q data-lcs-n="1" data-lcs-concept="rain"/, (h) => (h.match(/data-lcs-dchip="/g) || []).length === 5 && (h.match(/data-lcs-correct="1"/g) || []).length === 1],
      cycleLabels: [C4.cycleLabels({ lanes: CYCLE.map((a, i) => ({ n: i + 1, anchor: a, given: i === 0 ? 'evaporation' : null })) }), /data-lcs-labels/, (h) => (h.match(/data-lcs-label /g) || []).length === 4 && (h.match(/data-lcs-given="1"/g) || []).length === 1 && (h.match(/data-lcs-prim="writing-row"/g) || []).length === 3],
    };
    for (const [name, [html, stamp, shape]] of Object.entries(smoke)) {
      ok(typeof html === 'string' && stamp.test(html), `component ${name}: no stamped markup (${stamp})`);
      ok(shape(html), `component ${name}: the markup shape is off`);
    }
    let threw = null; try { C4.bandThermo({ n: 1, value: 15, chips: [{ key: 'a', src }, { key: 'b', src }], therm }); } catch (e) { threw = e.message; }
    ok(/exactly one chip is correct/.test(threw || ''), 'bandThermo accepted a card without a correct chip');
    console.log('components: the 7 face components build their stamped markup');
  }

  // 4. thermometer byte identity (node, before the browser)
  {
    const h = await hashG3345(false);
    for (const d of [1, 2, 3]) ok(h[d] === G3_345_FROZEN[d], `G3-345 d${d} body sha1 ${h[d]} ≠ the frozen ${G3_345_FROZEN[d]} (the additive thermometer options changed a live consumer)`);
    console.log(`thermometer: G3-345 d1/d2/d3 bodies === the frozen pre-edit sha1s (${Object.values(h).map((x) => x.slice(0, 8)).join('/')})`);
  }

  // 2. renders
  let killed = 0, TOTAL = 0;
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    for (const loc of locales) {
      for (const d of [1, 2, 3]) {
        const strings = mod[loc].strings[BASE_ID];
        const r = await renderWith(page, TYPE, { difficulty: d, locale: loc, baseName: `K-356-gate-d${d}-${loc}`, strings });
        const s = assertRender(`d${d} ${loc}`, r, TYPE.difficulty[d], { block: mod[loc], loc });
        pngs.push(r.png);
        console.log(`render d${d} ${loc}: verify ${r.verify.length} lints ${r.lints.length} icons ${s.minIcon} zone ${s.zone} widest word ${s.widest} body ${s.body} stack ${s.stack} (fits 722 ${r.m.stacks[0].fits} / 677 ${r.m.stacks[1].fits})`);
      }
      // the 226 px contingency with the shell font (the last render's page carries it)
      const w = await measureWords(page, mod[loc]);
      const f = validateBank(mod[loc], loc, w);
      ok(f.length === 0, `widths ${loc}: ${f.join('; ')}`);
      console.log(`widths ${loc} (Baloo 2 700 24): ${KEYS.map((k) => k + ' ' + Math.round(w[k])).join(' · ')} (<= ${TILE_INNER})`);
      // the F5 pill row of the default day names (rule 8, measured now so the panels see the number)
      const days = (mod[loc].forecastDays || (GLOBAL.forecast.days.map((i) => NAMES[loc].dayNames[i])));
      const pr = await measurePillRow(page, days);
      ok(pr.row <= PILL_MAX + 0.6 || (mod[loc].refuse || []).includes('forecast'), `pill row ${loc}: ${days.join(', ')} = ${pr.row.toFixed(1)} px > ${PILL_MAX} and refuse does not name "forecast"`);
      console.log(`pill row ${loc}: ${days.join(' / ')} = ${Math.round(pr.row)} px (<= ${PILL_MAX})`);
    }
    // the F2 / F5 day-name rooms, measured for ALL 11 locales at Baloo 2 700 18 with the shell font (the last render's page
    // carries it): the diary name pill has 160 - 20 (cell padding) - 24 (pill padding) - 4 (border) = 112 px of text room, the
    // strip pill 123 - 20 - 4 = 99. An authored locale whose effective labels (diaryDays / forecastDays or the calendar names)
    // exceed the room FAILS unless it refuses the face; an unauthored locale is logged as the contingency its panel must close
    // with the short forms (never a smaller font, never a wider cell: 4 x 160 + 3 x 11 = 673 and 5 x 123 + 4 x 15 = 675 are the page).
    {
      const DIARY_ROOM = 160 - 20 - 24 - 4, STRIP_ROOM = 123 - 20 - 4;
      const widths = await page.evaluate((names) => {
        const m = (text) => { const s = document.createElement('span'); s.style.cssText = "position:absolute;left:-9999px;top:0;white-space:nowrap;font:700 18px 'Baloo 2'"; s.textContent = text; document.body.appendChild(s); const w = s.getBoundingClientRect().width; s.remove(); return w; };
        const out = {};
        for (const [loc, list] of Object.entries(names)) out[loc] = list.map(m);
        return out;
      }, Object.fromEntries(LOCALES.map((l) => [l, [...(NAMES[l].dayNames), ...(mod[l] && mod[l].diaryDays ? mod[l].diaryDays : []), ...(mod[l] && mod[l].forecastDays ? mod[l].forecastDays : [])]])));
      const contingencies = [];
      for (const l of LOCALES) {
        const cal = NAMES[l].dayNames;
        const w = widths[l];
        const diaryLabels = mod[l] && mod[l].diaryDays ? mod[l].diaryDays : cal;
        const stripLabels = mod[l] && mod[l].forecastDays ? mod[l].forecastDays : GLOBAL.forecast.days.map((i) => cal[i]);
        const wOf = (label) => { const i = [...cal, ...(mod[l] && mod[l].diaryDays ? mod[l].diaryDays : []), ...(mod[l] && mod[l].forecastDays ? mod[l].forecastDays : [])].indexOf(label); return w[i]; };
        const overDiary = diaryLabels.filter((x) => wOf(x) > DIARY_ROOM + 0.6).map((x) => `${x} ${wOf(x).toFixed(1)}`);
        const overStrip = stripLabels.filter((x) => wOf(x) > STRIP_ROOM + 0.6).map((x) => `${x} ${wOf(x).toFixed(1)}`);
        if (mod[l]) {
          ok(overDiary.length === 0 || (mod[l].refuse || []).includes('diary'), `day names ${l}: ${overDiary.join(', ')} > the ${DIARY_ROOM} px diary pill room (set diaryDays short forms or refuse "diary")`);
          ok(overStrip.length === 0 || (mod[l].refuse || []).includes('forecast'), `day names ${l}: ${overStrip.join(', ')} > the ${STRIP_ROOM} px strip pill room (set forecastDays short forms or refuse "forecast")`);
        } else if (overDiary.length || overStrip.length) contingencies.push(`${l}: diary ${overDiary.join(', ') || 'ok'} · strip ${overStrip.join(', ') || 'ok'}`);
      }
      console.log(`day names (Baloo 2 700 18; rooms diary ${DIARY_ROOM} / strip ${STRIP_ROOM}): ${LOCALES.map((l) => l + ' ' + Math.round(Math.max(...widths[l].slice(0, 7)))).join(' · ')}` + (contingencies.length ? `\n  CONTINGENCY (unauthored locales whose calendar names exceed a room; their panels set the short forms): ${contingencies.join(' | ')}` : ''));
    }
    // the long-chrome fixture: a 3-line de title + a 150-char instruction (the tallest chrome the 70 / 150 limits produce)
    const LONG = { title: 'Wettersymbole: Verbinde jedes Wettersymbol mit dem Wort, das passt', instruction: 'Zeichne von jedem Wettersymbol eine gerade Linie zu dem Wort, das dazu gehört. Jedes Symbol bekommt genau eine Linie und jedes Wort genau ein Symbol. Lies gut.'.slice(0, 150) };
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, locale: 'en', baseName: `K-356-gate-d${d}-en-longchrome`, strings: LONG });
      const s = assertRender(`d${d} long chrome`, r, TYPE.difficulty[d], { block: en, loc: 'en' });
      pngs.push(r.png);
      console.log(`render d${d} long chrome (title ${[...LONG.title].length} / instruction ${[...LONG.instruction].length} chars): verify ${r.verify.length} lints ${r.lints.length} body ${s.body} zone ${s.zone} stack ${s.stack}`);
    }
    // the seed is locale-neutral: a synthetic de block gives the same orders as en
    {
      const rng1 = makeRng(instanceSeed({ typeId: BASE_ID, theme: 'weather', difficulty: 2, seedEpoch: 1 }));
      const rng2 = makeRng(instanceSeed({ typeId: BASE_ID, theme: 'weather', difficulty: 2, seedEpoch: 1 }));
      const a = TYPE._buildWith({ global: GLOBAL, block: en }, { theme: 'weather', difficulty: 2, locale: 'en' }, { rng: rng1 });
      const b = TYPE._buildWith({ global: GLOBAL, block: blockFor(en, SYN.de) }, { theme: 'weather', difficulty: 2, locale: 'de' }, { rng: rng2 });
      ok(a.meta.left.join() === b.meta.left.join() && a.meta.right.join() === b.meta.right.join(), `seed not locale-neutral: en ${a.meta.left.join(',')} | ${a.meta.right.join(',')} vs de ${b.meta.left.join(',')} | ${b.meta.right.join(',')}`);
      console.log(`seed: en and de share the left order ${a.meta.left.join(',')} and the right order ${a.meta.right.join(',')} (only the literals change)`);
    }


    // 6. the five faces: d2 in every authored locale + the two worst chromes (en), floors + node cross-checks
    const faceMeta = {};
    for (const [id, mode] of Object.entries(FACE_IDS)) {
      for (const loc of locales) {
        if ((mod[loc].refuse || []).includes(mode)) { console.log(`render ${id} ${mode} ${loc}: REFUSED by the ${loc} panel`); continue; }
        const r = await renderFace(page, FACE[id], { locale: loc, baseName: `${id}-gate-d2-${loc}`, strings: mod[loc].strings[id] });
        const s = assertFace(`${id} ${mode} ${loc}`, id, r, mod[loc], loc);
        if (loc === 'en') faceMeta[id] = r.meta;
        pngs.push(r.png);
        console.log(`render ${id} ${mode} ${loc}: verify ${r.verify.length} lints ${r.lints.length} body ${s.body} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)} [${s.stack}] ${s.line}`);
      }
      for (const [tag, strings] of Object.entries(CHROME)) {
        const r = await renderFace(page, FACE[id], { locale: 'en', baseName: `${id}-gate-d2-en-chrome-${tag}`, strings });
        const s = assertFace(`${id} ${mode} chrome ${tag}`, id, r, en, 'en');
        pngs.push(r.png);
        console.log(`render ${id} ${mode} chrome ${tag} (title ${[...strings.title].length} / instruction ${[...strings.instruction].length}): verify ${r.verify.length} lints ${r.lints.length} body ${s.body} [${s.stack}] ${s.line}`);
      }
    }
    // F1 with the locale words that bound it: de (capitals, the two-row bank, the 3-line 722 chrome) and fi (`sateenkaari` = 11
    // letters, the 4-line 677 chrome) over the §4 synthetic blocks; the box is the locale's (de 60, fi 46), the lanes stay >= 88
    for (const [loc, tag] of [['de', 'long'], ['fi', 'fi4']]) {
      const blk = blockFor(en, SYN[loc]);
      const r = await renderFace(page, faceBank('G1-362', blk, loc), { locale: loc, baseName: `G1-362-gate-d2-${loc}-syn-chrome-${tag}`, strings: CHROME[tag] });
      const s = assertFace(`G1-362 write ${loc} synthetic chrome ${tag}`, 'G1-362', r, blk, loc);
      pngs.push(r.png);
      console.log(`render G1-362 write ${loc} (synthetic §4 words) chrome ${tag}: verify ${r.verify.length} lints ${r.lints.length} body ${s.body} [${s.stack}] ${s.line}`);
    }
    // F2 is seed-invariant by design (nothing is drawn)
    {
      const a = FACE['K-364'].build({ theme: 'weather', difficulty: 2, locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: 'K-364', theme: 'weather', difficulty: 2, seedEpoch: 1 })) });
      const b = FACE['K-364'].build({ theme: 'weather', difficulty: 2, locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: 'K-364', theme: 'weather', difficulty: 2, seedEpoch: 7 })) });
      ok(a.bodyHtml === b.bodyHtml, 'K-364 diary: two seeds render different pages (the diary is seed-invariant by design)');
    }
    // the fi 4-line fixture must actually be four lines (else the 677 budget was never exercised by a real chrome)
    {
      const lines = await page.evaluate(() => { const t = document.querySelector('.ws-title'); return t ? Math.round(t.getBoundingClientRect().height / (parseFloat(getComputedStyle(t).fontSize) * 1.1)) : 0; });
      ok(lines >= 4, `the fi4 chrome fixture renders its title on ${lines} lines (< 4: the 677 budget was not exercised by a real chrome)`);
      poisonLog.push(`  fi4 fixture: the title renders on ${lines} line(s)`);
    }

    // 3. seed sweep (build only)
    if (!QUICK) {
      const lefts = new Set(), rights = new Set();
      for (let k = 1; k <= 20; k++) {
        const rng = makeRng(instanceSeed({ typeId: BASE_ID, theme: 'weather', difficulty: 2, seedEpoch: k }));
        const b = TYPE.build({ theme: 'weather', difficulty: 2, locale: 'en' }, { rng });
        ok(new Set(b.meta.left).size === 6 && b.meta.left.every((c) => KEYS.includes(c)), `sweep seed ${k}: left ${b.meta.left.join(',')} is not the six`);
        ok(!b.meta.right.some((c, i) => c === b.meta.left[i]), `sweep seed ${k}: a tile sits straight across`);
        ok(!b.meta.right.every((c, i) => c === b.meta.left[5 - i]), `sweep seed ${k}: the right column is the reversed left`);
        ok(b.meta.right.join() !== b.meta.left.join(), `sweep seed ${k}: the right column is the left order`);
        lefts.add(b.meta.left.join(',')); rights.add(b.meta.right.join(','));
      }
      ok(lefts.size >= 2, `sweep: only ${lefts.size} distinct left orders over 20 seeds`);
      ok(rights.size >= 2, `sweep: only ${rights.size} distinct right orders over 20 seeds`);
      console.log(`sweep: 20 seeds clean, ${lefts.size} distinct left orders, ${rights.size} distinct right orders`);
    }


    // 7. face sweep (build only, skipped by --quick): 20 seeds x d2 per face render distinct pages; F2 is seed-invariant
    if (!QUICK) {
      const sets = { write: new Set(), writeBank: new Set(), thermo: new Set(), thermoChips: new Set(), cycleBank: new Set(), strip: new Set(), asks: new Set(), diary: new Set() };
      for (let k = 1; k <= 20; k++) {
        const rngFor = (id) => makeRng(instanceSeed({ typeId: id, theme: 'weather', difficulty: 2, seedEpoch: k }));
        const w = FACE['G1-362'].build({ theme: 'weather', difficulty: 2, locale: 'en' }, { rng: rngFor('G1-362') });
        ok(new Set(w.meta.rows).size === 6 && w.meta.bank.join() !== w.meta.rows.join(), `sweep seed ${k} write: rows ${w.meta.rows.join(',')} / bank ${w.meta.bank.join(',')}`);
        sets.write.add(w.meta.rows.join()); sets.writeBank.add(w.meta.bank.join());
        const t = FACE['K-365'].build({ theme: 'weather', difficulty: 2, locale: 'en' }, { rng: rngFor('K-365') });
        ok(new Set(t.meta.bands).size === 3 && new Set(t.meta.values).size === 4 && t.meta.bands[0] !== t.meta.bands[1] && t.meta.bands[2] !== t.meta.bands[3], `sweep seed ${k} thermometer: bands ${t.meta.bands.join(',')} values ${t.meta.values.join(',')}`);
        ok(t.meta.values.every((v, i) => GLOBAL.bands.values[t.meta.bands[i]].includes(v)), `sweep seed ${k} thermometer: a value outside its band interior`);
        ok(new Set(t.meta.chipOrders).size >= 2, `sweep seed ${k} thermometer: one chip order on every card`);
        sets.thermo.add(t.meta.bands.join() + '|' + t.meta.values.join()); sets.thermoChips.add(t.meta.chipOrders.join());
        const c = FACE['G3-385'].build({ theme: 'weather', difficulty: 2, locale: 'en' }, { rng: rngFor('G3-385') });
        ok(c.meta.bank.join() !== c.meta.cycle.join() && c.meta.bank.join() !== c.meta.cycle.slice().reverse().join(), `sweep seed ${k} water-cycle: bank ${c.meta.bank.join(',')} is the cycle / its reverse`);
        ok((c.bodyHtml.match(/data-lcs-marker="(\w+)" data-lcs-n="(\d)"/g) || []).join() === GLOBAL.cycle.map((a, i) => `data-lcs-marker="${a}" data-lcs-n="${i + 1}"`).join(), `sweep seed ${k} water-cycle: markers not in cycle order`);
        sets.cycleBank.add(c.meta.bank.join());
        const f = FACE['G1-363'].build({ theme: 'weather', difficulty: 2, locale: 'en' }, { rng: rngFor('G1-363') });
        const at = f.meta.asks.map((x) => f.meta.strip.indexOf(x));
        ok(new Set(f.meta.strip).size === 5 && new Set(f.meta.asks).size === 3 && !at.every((v, i) => i === 0 || v > at[i - 1]), `sweep seed ${k} forecast: strip ${f.meta.strip.join(',')} asks ${f.meta.asks.join(',')} at ${at.join(',')}`);
        sets.strip.add(f.meta.strip.join()); sets.asks.add(f.meta.asks.join());
        const dy = FACE['K-364'].build({ theme: 'weather', difficulty: 2, locale: 'en' }, { rng: rngFor('K-364') });
        sets.diary.add(sha1(dy.bodyHtml));
      }
      ok(sets.write.size >= 2 && sets.writeBank.size >= 2, `sweep write: ${sets.write.size} row orders / ${sets.writeBank.size} bank orders over 20 seeds`);
      ok(sets.thermo.size >= 2 && sets.thermoChips.size >= 2, `sweep thermometer: ${sets.thermo.size} band/value sets / ${sets.thermoChips.size} chip orders`);
      ok(sets.cycleBank.size >= 2, `sweep water-cycle: ${sets.cycleBank.size} bank orders`);
      ok(sets.strip.size >= 2 && sets.asks.size >= 2, `sweep forecast: ${sets.strip.size} strips / ${sets.asks.size} ask sets`);
      ok(sets.diary.size === 1, `sweep diary: ${sets.diary.size} distinct pages over 20 seeds (must be 1: seed-invariant)`);
      console.log(`sweep faces: write ${sets.write.size} row / ${sets.writeBank.size} bank orders · thermometer ${sets.thermo.size} band-value sets / ${sets.thermoChips.size} chip orders · water-cycle ${sets.cycleBank.size} bank orders, markers always in cycle order · forecast ${sets.strip.size} strips / ${sets.asks.size} ask sets · diary ${sets.diary.size} page (invariant)`);
    }

    // 5. poisons (base 27 + faces 30)
    killed = 0;
    TOTAL = 57;
    // P1 — symbols[2].noun = 'puddle' (excluded)
    { const g = clone(GLOBAL); g.symbols[2].noun = 'puddle';
      if (judge('P1 puddle', validateGlobal(g), /symbol rain: noun "puddle" is excluded/)) killed++; }
    // P2 — a seventh symbol wind / windy
    { const g = clone(GLOBAL); g.symbols.push({ key: 'wind', theme: 'weather', noun: 'windy', alt: [], picOpened: true });
      if (judge('P2 wind', validateGlobal(g), /symbols keys .* ≠ sun,cloud,rain,storm,snow,rainbow/)) killed++; }
    // P3 — gear += mittens
    { const g = clone(GLOBAL); g.gear.push({ key: 'mittens', theme: 'weather', noun: 'mittens', band: 'cold', picOpened: true });
      if (judge('P3 mittens', validateGlobal(g), /gear mittens: "mittens" is fenced out of gear/)) killed++; }
    // P4 — gear[2] = hot (a sun as a chip)
    { const g = clone(GLOBAL); g.gear[2] = { key: 'hot', theme: 'weather', noun: 'hot', band: 'hot', picOpened: true };
      if (judge('P4 hot', validateGlobal(g), /gear hot: "hot" is fenced out of gear/)) killed++; }
    // P5 — bands.values.warm = [10, 15] (an edge value)
    { const g = clone(GLOBAL); g.bands.values.warm = [10, 15];
      if (judge('P5 edge value', validateGlobal(g), /values\.warm 10 is not strictly inside 10\.\.25/)) killed++; }
    // P6 — de symbolWords.sun = 'Sonnig' FIRES; de 'Sonne' PASSES (control); P7 de rain = 'Regentropfen'
    { const de = blockFor(en, SYN.de);
      const a = judge('P6 Sonnig', validateBank(blockFor(de, { symbolWords: { ...de.symbolWords, sun: 'Sonnig' } }), 'de'), /symbolWords\.sun "Sonnig" is the vocab ADJECTIVE form/);
      const b = control('P6 Sonne', validateBank(de, 'de'));
      if (a && b) killed++;
      const c = judge('P7 Regentropfen', validateBank(blockFor(de, { symbolWords: { ...de.symbolWords, rain: 'Regentropfen' } }), 'de'), /symbolWords\.rain "Regentropfen" is the vocab raindrop noun/);
      if (c) killed++;
      // P19 — a de rainbow word wider than 226 px at Baloo 2 700 24 (MEASURED); 'Regenbogen' PASSES
      const wide = blockFor(de, { symbolWords: { ...de.symbolWords, rainbow: 'Regenbogenwetterlage' } });
      const w1 = await measureWords(page, wide), w2 = await measureWords(page, de);
      const p19 = judge('P19 Regenbogenwetterlage', validateBank(wide, 'de', w1), /symbolWords\.rainbow "Regenbogenwetterlage" measures \d+(\.\d+)? px > 226/, `measured ${w1.rainbow.toFixed(1)} px`);
      const p19c = control('P19 Regenbogen', validateBank(de, 'de', w2));
      poisonLog.push(`  P19 control width: Regenbogen ${w2.rainbow.toFixed(1)} px`);
      if (p19 && p19c) killed++;
      // P7b — sv storm = 'Åskväder' FIRES (the weather-compound), 'åska' PASSES; de 'Gewitter' PASSES (the panel word IS the vocab noun)
      const sv = blockFor(en, SYN.sv);
      const s1 = judge('P7b Åskväder', validateBank(blockFor(sv, { symbolWords: { ...sv.symbolWords, storm: 'Åskväder' } }), 'sv'), /symbolWords\.storm "Åskväder" is the vocab thunderstorm noun/);
      const s2 = control('P7b åska', validateBank(sv, 'sv'));
      const s3 = control('P7b Gewitter (de)', validateBank(de, 'de').filter((x) => /storm/.test(x)));
      if (s1 && s2 && s3) killed++;
      // P13 — sv base title 'Väder' (the theme name)
      const st = clone(sv.strings); st[BASE_ID] = { title: 'Väder', instruction: sv.strings[BASE_ID].instruction };
      if (judge('P13 Väder', validateBank(blockFor(sv, { strings: st }), 'sv'), /K-356 title "Väder" equals the theme name/)) killed++;
    }
    // P8 — es symbolWords.rain = 'gota de lluvia'
    { const es = blockFor(en, { symbolWords: { sun: 'sol', cloud: 'nube', rain: 'gota de lluvia', storm: 'tormenta', snow: 'nieve', rainbow: 'arcoíris' } });
      if (judge('P8 gota de lluvia', validateBank(es, 'es'), /symbolWords\.rain "gota de lluvia" is not a single token/)) killed++; }
    // P9 — fi symbolWords.rainbow = a 12-letter variant → rule 5
    { const fi = blockFor(en, { symbolWords: { sun: 'aurinko', cloud: 'pilvi', rain: 'sade', storm: 'ukkonen', snow: 'lumi', rainbow: 'sateenkaaret' }, strand: 'Ympäristöoppi' });
      if (judge('P9 12 letters', validateBank(fi, 'fi'), /symbolWords\.rainbow "sateenkaaret" has 12 letters > 11/)) killed++; }
    // P10 — en forecastAsks.rain names Monday
    { const b = blockFor(en, { forecastAsks: { ...en.forecastAsks, rain: 'Is it rainy on Monday?' } });
      if (judge('P10 Monday', validateBank(b, 'en'), /forecastAsks\.rain "Is it rainy on Monday\?" names the day "Monday"/)) killed++; }
    // P11 — fr forecastAsks.sun without '?'
    { const fr = blockFor(en, { forecastAsks: { sun: 'Quel jour fait-il beau', cloud: 'Quel jour est-il nuageux ?', rain: 'Quel jour pleut-il ?', storm: "Quel jour y a-t-il de l'orage ?", snow: 'Quel jour neige-t-il ?', rainbow: 'Quel jour y a-t-il un arc-en-ciel ?' } });
      if (judge('P11 no ?', validateBank(fr, 'fr'), /forecastAsks\.sun "Quel jour fait-il beau" does not end with "\?"/)) killed++; }
    // P12 — the pill row rule is MEASURED: a row of five long day forms overflows 639 and FAILS; the pt FULL day names
    // (the design's "~645 est. OVER") measure 585.3 px and PASS — the pt panel needs NO short forms (recorded in the build report)
    { const full = GLOBAL.forecast.days.map((i) => NAMES.pt.dayNames[i]);
      const long = ['Montagmorgen', 'Dienstagmorgen', 'Mittwochmorgen', 'Donnerstagmorgen', 'Freitagmorgen'];
      const a = await measurePillRow(page, long), b = await measurePillRow(page, full);
      const fa = collect(() => ok(a.row <= PILL_MAX + 0.6, `pill row: ${long.join(', ')} = ${a.row.toFixed(1)} px > ${PILL_MAX}`));
      const fb = collect(() => ok(b.row <= PILL_MAX + 0.6, `pill row pt: ${full.join(', ')} = ${b.row.toFixed(1)} px > ${PILL_MAX}`));
      const p = judge('P12 five long day forms', fa, /pill row: .* px > 639/, `measured ${a.row.toFixed(1)} px`);
      const c = control(`P12 pt full day names (${b.row.toFixed(1)} px, the design estimated ~645)`, fb);
      if (p && c) killed++; }
    // P14 — en F4 title carries the base head
    { const s = clone(en.strings); s['G3-385'].title = 'Weather Symbols: The Water Cycle';
      if (judge('P14 F4 base head', validateBank(blockFor(en, { strings: s }), 'en'), /G3-385 \(water-cycle\) title "Weather Symbols: The Water Cycle" contains the base head "weather"/)) killed++; }
    // P15 — en F3 title = G3-345's
    { const s = clone(en.strings); s['K-365'].title = 'Hot or Cold?';
      if (judge('P15 Hot or Cold?', validateBank(blockFor(en, { strings: s }), 'en'), /K-365 \(thermometer\) title "Hot or Cold\?" equals G3-345's title/)) killed++; }
    // P16 — en F3 instruction with a numeral + degree sign
    { const s = clone(en.strings); s['K-365'].instruction = 'Circle the picture for 20 °C';
      if (judge('P16 20 °C', validateBank(blockFor(en, { strings: s }), 'en'), /K-365 \(thermometer\) strings carry a digit or a degree sign/)) killed++; }
    // P17 — en F1 title without the mode token
    { const s = clone(en.strings); s['G1-362'].title = 'Weather Symbols: Big Words';
      if (judge('P17 Big Words', validateBank(blockFor(en, { strings: s }), 'en'), /G1-362 \(write\) title "Weather Symbols: Big Words" adds no write token/)) killed++; }
    // P18 — a missing symbol word → the spec REFUSES (throw), never en, never the vocab
    { const b = clone(en); delete b.symbolWords.storm;
      let refused = [];
      try { TYPE._buildWith({ global: GLOBAL, block: b }, { theme: 'weather', difficulty: 2, locale: 'en' }, { rng: makeRng('p18') }); } catch (e) { refused = [e.message]; }
      if (judge('P18 missing word', refused, /K-356 en: no symbol word for storm \(refuse\)/, 'the spec refused (throw)')) killed++; }
    // PR1 — the word column rebuilt in the badge order (a position leak)
    { const t = typeWith(GLOBAL, en, { build(args, ctx) {
        const out = TYPE._buildWith({ global: GLOBAL, block: en }, { ...args, theme: 'weather' }, ctx);
        const tiles = out.meta.left.map((c) => ({ concept: c, word: en.symbolWords[c] }));
        const col = C4.symbolMatch({ left: out.meta.left.map((c) => { const s = GLOBAL.symbols.find((x) => x.key === c); return { concept: c, src: fileUri('weather', s.noun) }; }), right: tiles });
        out.bodyHtml = col;
        return out;
      } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-356-gate-poison-PR1', strings: en.strings[BASE_ID] });
      if (judge('PR1 position leak', r.verify, /sits straight across from its badge/)) killed++; }
    // PR2 — `raindrop` swapped in beside `rainy` (two pictures of one concept: the rain badge shows raindrop)
    { const t = typeWith(GLOBAL, en, { build(args, ctx) {
        const out = TYPE._buildWith({ global: GLOBAL, block: en }, { ...args, theme: 'weather' }, ctx);
        out.bodyHtml = out.bodyHtml.replace(fileUri('weather', 'rainy'), fileUri('weather', 'raindrop'));
        return out;
      } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-356-gate-poison-PR2', strings: en.strings[BASE_ID] });
      if (judge('PR2 raindrop', r.verify, /picture "raindrop" ≠ the rain symbol "rainy"/)) killed++; }
    // PR20 — an answerBox({w, h}) in place of a word tile → [data-lcs-answer="undefined"]
    { const t = typeWith(GLOBAL, en, { build(args, ctx) {
        const out = TYPE._buildWith({ global: GLOBAL, block: en }, { ...args, theme: 'weather' }, ctx);
        out.bodyHtml = out.bodyHtml.replace(/<div class="ws-match-item" data-lcs-tile[^>]*>[\s\S]*?<\/div>/, answerBox({ w: 250, h: 84 }));
        return out;
      } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-356-gate-poison-PR20', strings: en.strings[BASE_ID] });
      if (judge('PR20 answerBox', r.verify, /a \[data-lcs-answer\] stamp prints an answer/)) killed++; }
    // PR21 — pairs:8 resolved from a level-index guard → the config guard fires before any render
    { const t = Object.create(TYPE); t.difficulty = { ...TYPE.difficulty, 2: { ...TYPE.difficulty[2], pairs: 8, keys: [...KEYS, 'wind', 'fog'] } };
      let refused = [];
      try { t._buildWith({ global: GLOBAL, block: en }, { theme: 'weather', difficulty: 2, locale: 'en' }, { rng: makeRng('pr21') }); } catch (e) { refused = [e.message]; }
      if (judge('PR21 pairs 8', refused, /K-356: keys .* ≠ 8 distinct concepts|pairs 8 outside 4\.\.6/, 'the config guard fired')) killed++; }
    // PR12 — G3-345 re-rendered with the `numerals` default flipped in a fresh module graph → byte-diff
    { const h = await hashG3345(true);
      const diff = [1, 2, 3].filter((d) => h[d] !== G3_345_FROZEN[d]).map((d) => `d${d} ${h[d].slice(0, 8)} ≠ frozen ${G3_345_FROZEN[d].slice(0, 8)}`);
      const again = await hashG3345(false);
      const restored = [1, 2, 3].every((d) => again[d] === G3_345_FROZEN[d]);
      const p = judge('PR12 numerals default flipped', diff, /d2 [0-9a-f]{8} ≠ frozen/, `${diff.length}/3 bodies drift`);
      const c = control('PR12 graph restored', restored ? [] : ['G3-345 hashes did not come back']);
      if (p && c) killed++; }
    // the fixed theme: a themed call with another theme REFUSES through the raw type (withFixedTheme pins it on the public path)
    { let refused = [];
      try { TYPE._buildWith({ global: GLOBAL, block: en }, { theme: 'animals', difficulty: 2, locale: 'en' }, { rng: makeRng('theme') }); } catch (e) { refused = [e.message]; }
      if (judge('P-theme animals', refused, /theme "animals" — the type is fixed to "weather"/)) killed++; }
    // a d3 with a block lacking two distractors REFUSES (never a filler)
    { let refused = [];
      try { TYPE._buildWith({ global: GLOBAL, block: blockFor(en, { distractors: ['wind'] }) }, { theme: 'weather', difficulty: 3, locale: 'en' }, { rng: makeRng('d3') }); } catch (e) { refused = [e.message]; }
      if (judge('P-d3 one distractor', refused, /1 distractor words < 2 \(refuse\)/)) killed++; }


    // 8. face poisons — each must FAIL for its OWN reason; the clean face renders above are the controls
    {
      const SRC = Object.fromEntries(KEYS.map((k) => [k, fileUri('weather', GLOBAL.symbols.find((s) => s.key === k).noun)]));
      const B = GLOBAL.bands, bounds = [B.min, ...B.edges, B.max];
      const bandList = B.order.map((b, i) => ({ key: b, from: bounds[i], to: bounds[i + 1], fill: B.tints[b] }));
      const therm = (value, h) => thermometer({ value, min: B.min, max: B.max, step: B.step, height: h, numerals: false, bands: bandList });
      const en2 = (id) => en.strings[id];
      const rf = (id, spec, tag, strings) => renderFace(page, spec, { locale: 'en', baseName: `${id}-gate-poison-${tag}`, strings: strings || en2(id) });
      const faceBankWith = (id, block, locale, mutate) => Object.assign(Object.create(FACE[id]), { build(args, ctx) { const out = FACE[id]._buildWith({ global: GLOBAL, block }, { ...args, theme: 'weather', locale }, ctx); const html = mutate(out.bodyHtml, out.meta); if (html === out.bodyHtml) throw new Error('poison no-op'); out.bodyHtml = html; return out; } });
      poisonLog.push('  face controls: the five faces verified 0 / lints 0 above (every locale + both chromes)');
      // PR3 — F1 rendered WITHOUT a bank at d2
      { const r = await rf('G1-362', faceWith('G1-362', (h) => h.replace(/<div class="ws-scene-banner ws-bank"[\s\S]*?<\/div>/, '')), 'PR3');
        if (judge('PR3 F1 no bank', r.verify, /bank absent at d2/)) killed++; }
      // PR4 — F1 fr `arc-en-ciel` rendered as 11 boxes (one group) while the stamps say 3-2-4
      { const fr = blockFor(en, { symbolWords: { sun: 'soleil', cloud: 'nuage', rain: 'pluie', storm: 'orage', snow: 'neige', rainbow: 'arc-en-ciel' } });
        const t = faceBankWith('G1-362', fr, 'fr', (h) => {
          const row = C4.spellRow({ concept: 'rainbow', src: SRC.rainbow, word: 'arcencielxx', box: C4.spellBox({ words: Object.values(fr.symbolWords), room: 555 }), gap: 4, badge: 72, iconPx: 56 }).replace('data-lcs-len="11" data-lcs-groups="11"', 'data-lcs-len="9" data-lcs-groups="3-2-4"');
          return h.replace(/<div class="ws-lane" data-lcs-spell="rainbow"[\s\S]*?<\/span><\/span><\/div>/, row);
        });
        const r = await rf('G1-362', t, 'PR4');
        if (judge('PR4 F1 arc-en-ciel 11 boxes', r.verify, /letter boxes 11 ≠ groups 3-2-4/)) killed++; }
      // PR5 — F2 a day pill printing a date numeral
      { const r = await rf('K-364', faceWith('K-364', (h) => h.replace('data-lcs-day-name>Monday<', 'data-lcs-day-name>Monday 12<')), 'PR5');
        if (judge('PR5 F2 date numeral', r.verify, /a numeral is printed on the page/)) killed++; }
      // PR6 — F3 with the numeral labels the live primitive prints at every tick (numerals:true) on one thermometer
      { const r = await rf('K-365', faceWith('K-365', (h) => { const i = h.indexOf('data-lcs-thermo-box'); const j = h.indexOf('</svg>', i); return h.slice(0, j) + svgLabel({ x: 28, y: 100, text: 20, size: 14, color: tokens.color.ink, fontFamily: tokens.font.display, weight: 700, data: { 'data-lcs-tick': 20 } }) + h.slice(j); }), 'PR6');
        if (judge('PR6 F3 numerals', r.verify, /text inside the thermometer/)) killed++; }
      // PR7 — F3 card 1 mercury at 10 (a band EDGE)
      { const r = await rf('K-365', faceWith('K-365', (h, meta) => { const v = meta.values[0]; const svg = therm(10, 220).svg; return h.replace(new RegExp(`(data-lcs-thermo data-lcs-n="1" data-lcs-value=")${v}(")`), (m, a, z) => a + '10' + z).replace(/(<span data-lcs-thermo-box[^>]*>)<svg[\s\S]*?<\/svg>/, '$1' + svg); }), 'PR7');
        if (judge('PR7 F3 value on an edge', r.verify, /value 10 is not inside any band/)) killed++; }
      // PR8 — F3 one row with one band twice (card 2 = a copy of card 1's stage)
      { const r = await rf('K-365', faceWith('K-365', (h) => { const m = /<div class="ws-card-stage" data-lcs-thermo data-lcs-n="1"[\s\S]*?<\/span><\/span><\/div>/.exec(h); if (!m) throw new Error('PR8: card 1 not found'); return h.replace(/<div class="ws-card-stage" data-lcs-thermo data-lcs-n="2"[\s\S]*?<\/span><\/span><\/div>/, m[0].replace('data-lcs-n="1"', 'data-lcs-n="2"')); }), 'PR8');
        if (judge('PR8 F3 one band twice in a row', r.verify, /row 1: two cards share the \w+ band/)) killed++; }
      // PR9 — F3 a `mittens` chip
      { const r = await rf('K-365', faceWith('K-365', (h) => h.replace(/data-lcs-chip="scarf"([^>]*>)<img class="ws-icon" src="[^"]*"/, `data-lcs-chip="mittens"$1<img class="ws-icon" src="${fileUri('weather', 'mittens')}"`)), 'PR9');
        if (judge('PR9 F3 mittens chip', r.verify, /chip "mittens" is not gear/)) killed++; }
      // PR10 — F3 a 32 px gear picture placed beside an ITEM thermometer (the legend on an item)
      { const r = await rf('K-365', faceWith('K-365', (h) => h.replace(/(<span data-lcs-thermo-box[^>]*>)/, `$1<img class="ws-icon" src="${fileUri('weather', 'scarf')}" alt="" style="width:32px;height:32px">`)), 'PR10');
        if (judge('PR10 F3 legend on an item', r.verify, /a picture beside the item thermometer/)) killed++; }
      // PR11 — F3 the key row removed
      { const r = await rf('K-365', faceWith('K-365', (h) => h.replace(/<div class="ws-lane" data-lcs-key[\s\S]*?<\/div>/, '')), 'PR11');
        if (judge('PR11 F3 no key', r.verify, /0 key rows ≠ 1/)) killed++; }
      // PR13 — F4 markers numbered in a shuffled order
      { const r = await rf('G3-385', faceWith('G3-385', (h) => h.replace(/<svg[^>]*data-lcs-prim="water-cycle"[\s\S]*?<\/svg>/, WC.waterCycle({ w: 675, markers: GLOBAL.cycle.map((a, i) => ({ anchor: a, n: [2, 1, 4, 3][i] })) }).svg)), 'PR13');
        if (judge('PR13 F4 markers shuffled', r.verify, /marker "evaporation" is numbered 2 ≠ 1/)) killed++; }
      // PR14 — F4 the bank in cycle order (the node gate sees it; verify() has no literals)
      { const r = await rf('G3-385', faceWith('G3-385', (h) => h.replace(/<div class="ws-scene-banner ws-bank"[\s\S]*?<\/div>/, wordBank({ words: GLOBAL.cycle.map((k) => ({ word: en.cycleLabels[k] })), wordPx: 18 }))), 'PR14');
        const f = collect(() => assertFace('PR14', 'G3-385', r, en, 'en'));
        if (judge('PR14 F4 bank in cycle order', f, /bank order = cycle/)) killed++; }
      // PR15 — F4 lane 1 pre-filled with "evaporation"
      { const r = await rf('G3-385', faceWith('G3-385', (h) => h.replace(/(<div data-lcs-label data-lcs-n="1"[^>]*>[\s\S]*?<\/span>)<span class="ws-blankbox"[\s\S]*?<\/span>/, '$1<span style="font:800 20px Nunito">evaporation</span>')), 'PR15');
        if (judge('PR15 F4 lane pre-filled', r.verify, /lane 1: lane not empty \("evaporation"\)/)) killed++; }
      // PR16 — F4 the condensation marker moved 20 viewBox units off its anchor
      { const r = await rf('G3-385', faceWith('G3-385', (h) => h.replace(/cx="449"/g, 'cx="469"').replace(/<text x="449"/, '<text x="469"')), 'PR16');
        if (judge('PR16 F4 marker off its anchor', r.verify, /marker "condensation" sits 2\d\.\d px off its anchor/)) killed++; }
      // PR17 — F5 the strip with one symbol twice
      { const r = await rf('G1-363', faceWith('G1-363', (h, meta) => { const dup = meta.strip[1]; const first = meta.strip[0]; return h.replace(`data-lcs-fday="1" data-lcs-concept="${first}"`, `data-lcs-fday="1" data-lcs-concept="${dup}"`).replace(SRC[first], SRC[dup]); }), 'PR17');
        if (judge('PR17 F5 a symbol twice', r.verify, /strip concepts .* repeat/)) killed++; }
      // PR18 — F5 an ask literal naming a day (bank poison: every ask names Monday)
      { const b = blockFor(en, { forecastAsks: Object.fromEntries(KEYS.map((k) => [k, en.forecastAsks[k].replace('?', ' on Monday?')])) });
        const r = await rf('G1-363', faceBank('G1-363', b, 'en'), 'PR18');
        if (judge('PR18 F5 day name in the question', r.verify, /names the day "Monday"/)) killed++; }
      // PR19 — F5 chips labelled with dayAbbr while the strip prints dayNames
      { const r = await rf('G1-363', faceWith('G1-363', (h) => h.replace(/(data-lcs-dchip="(\d)"[^>]*>)([^<]+)(<\/span>)/g, (m, a, i, t, z) => a + NAMES.en.dayAbbr[+i] + z)), 'PR19');
        if (judge('PR19 F5 abbreviated chips', r.verify, /chip 1 prints "Mon" ≠ the strip header "Monday"/)) killed++; }
      // PR22 — F2 at the fi 4-line chrome with rows minmax(340px,1fr) → the footer
      { const r = await rf('K-364', faceWith('K-364', (h) => h.replace('minmax(326px,1fr)', 'minmax(340px,1fr)')), 'PR22', CHROME.fi4);
        const f = collect(() => assertFace('PR22', 'K-364', r, en, 'en'));
        if (judge('PR22 F2 340 px rows at the fi chrome', [...r.lints, ...r.verify, ...f], /footer|under the 677 budget the stage overflows the body/, 'the 4-line fixture measures a 700 body on the letter page: the 677 budget is the PINNED body')) killed++; }
      // SPARSE poisons (one per face; the sparse layouts the nt10-D rule bans)
      { const r = await rf('G1-362', faceWith('G1-362', (h) => h.replace('minmax(88px,1fr)', 'minmax(140px,1fr)')), 'PS1');
        if (judge('PS1 F1 lanes at a 140 px maximum', [...r.verify, ...r.lints], /px of blank inside the lane > 24|footer/)) killed++; }
      // PS1b — the build the coordinator rejected: bare rows (no lane card), 44 px boxes, rows minmax(76px,1fr) with 12 px gaps
      { const r = await rf('G1-362', faceWith('G1-362', (h, meta) => {
          let out = h.replace(/class="ws-lane" (data-lcs-spell=)/g, '$1').replace(/padding:6px 16px;min-height:0/g, 'min-height:76px').replace('minmax(88px,1fr));gap:5px', 'minmax(76px,1fr));gap:12px;align-items:center;padding:0 0 0 30px');
          for (const k of meta.rows) { const w = meta.words[k]; const row = C4.spellRow({ concept: k, src: SRC[k], word: w, box: 44, gap: 4, badge: 72, iconPx: 56 }).replace('class="ws-lane" ', '').replace('padding:6px 16px;min-height:0', 'min-height:76px'); out = out.replace(new RegExp(`<div data-lcs-spell="${k}"[\\s\\S]*?<\\/span><\\/span><\\/div>`), row); }
          return out.replace(/data-lcs-box="\d+"/g, 'data-lcs-box="44"');
        }), 'PS1b');
        if (judge('PS1b F1 the rejected build (bare 76 px rows, 44 px boxes)', r.verify, /is not a lane card|px of blank inside the lane > 24|px blank between the lanes > 10/)) killed++; }
      { const r = await rf('K-364', faceWith('K-364', (h) => h.replace('flex:1 1 auto;display:grid;grid-template-columns:repeat(4,160px);grid-template-rows:repeat(2,minmax(326px,1fr))', 'flex:0 0 auto;display:grid;grid-template-columns:repeat(4,160px);grid-template-rows:repeat(2,326px)')), 'PS2');
        if (judge('PS2 F2 grid not filling the body', r.verify, /stage ends \d+ px above the body bottom/)) killed++; }
      { const r = await rf('K-365', faceWith('K-365', (h, meta) => { let i = 0; return h.replace(/(<span data-lcs-thermo-box[^>]*>)<svg[\s\S]*?<\/svg>/g, (m, a) => a + therm(meta.values[i++], 120).svg); }), 'PS3');
        if (judge('PS3 F3 120 px item thermometers', r.verify, /fills 0\.\d+ of the card \(< 0\.6: sparse\)/)) killed++; }
      { const r = await rf('G3-385', faceWith('G3-385', (h) => h.replace(/<svg[^>]*data-lcs-prim="water-cycle"[\s\S]*?<\/svg>/, WC.waterCycle({ w: 480, markers: GLOBAL.cycle.map((a, i) => ({ anchor: a, n: i + 1 })) }).svg)), 'PS4');
        if (judge('PS4 F4 diagram at 480', r.verify, /stage \d+ px < the 600 floor \(sparse\)/)) killed++; }
      { const r = await rf('G1-363', faceWith('G1-363', (h) => h.split('grid-template-rows:auto minmax(44px,64px)').join('grid-template-rows:auto 44px')), 'PS5');
        if (judge('PS5 F5 fixed 44 px pills', r.verify, /px of blank inside the lane > 90 \(sparse\)/)) killed++; }
      // CONFIG guards (no render: the guard fires before any draw)
      if (judge('PC1 F3 two bands', buildThrows(faceConfig('K-365', { bands: ['cold', 'hot'], chips: ['scarf', 'sunglasses'], edges: [15] })), /bands \["cold","hot"\] ≠ the global cold,warm,hot/, 'the config guard fired')) killed++;
      if (judge('PC2 F5 distinctStrip:false', buildThrows(faceConfig('G1-363', { distinctStrip: false })), /distinctStrip:false is not a face/, 'the config guard fired')) killed++;
      if (judge('PC3 F1 hyphenGiven:false', buildThrows(faceConfig('G1-362', { hyphenGiven: false })), /hyphenGiven:false is rejected/, 'the config guard fired')) killed++;
      if (judge('PC4 F4 stages 6', buildThrows(faceConfig('G3-385', { stages: 6 })), /stages 6 ≠ 4 \| 5/, 'the config guard fired')) killed++;
      { const fi = blockFor(en, { symbolWords: { sun: 'aurinko', cloud: 'pilvi', rain: 'sade', storm: 'ukkonen', snow: 'lumi', rainbow: 'sateenkaaret' } });
        let refused = []; try { FACE['G1-362']._buildWith({ global: GLOBAL, block: fi }, { theme: 'weather', difficulty: 2, locale: 'fi' }, { rng: makeRng('pc5') }); } catch (e) { refused = [e.message]; }
        if (judge('PC5 F1 a 12-letter word', refused, /"sateenkaaret" has 12 letters > 11 \(refuse/, 'the spec refused (throw)')) killed++; }
      // TITLE-lists-config (node): the listed options must be the shipped d2 config
      { const s = clone(en.strings); s['K-365'].title = 'How Warm Is It? Cold or Hot';
        if (judge('PT1 F3 title lists two bands', titleConfigFindings(blockFor(en, { strings: s }), 'en'), /lists cold,hot but d2 ships the bands cold,warm,hot/)) killed++; }
      { const s = clone(en.strings); s['K-364'].title = 'Weather Chart, Sunday to Saturday';
        if (judge('PT2 F2 title names the wrong days', titleConfigFindings(blockFor(en, { strings: s }), 'en'), /names the days Sunday,Saturday but d2 runs Monday\.\.Sunday/)) killed++; }
      const ctl = titleConfigFindings(en, 'en');
      control('PT control (the shipped titles)', ctl);
    }

    console.log('poisons:\n' + poisonLog.join('\n'));
    ok(killed === TOTAL, `poisons: ${killed}/${TOTAL} killed`);
    console.log('renders: ' + pngs.length + ' PNGs under out/dev (K-356-gate-*)');
  } finally {
    await browser.close();
  }
  const pass = fails.length === 0;
  if (!pass) console.log('FINDINGS:\n  ' + fails.join('\n  '));
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed${QUICK ? ', --quick: sweeps skipped' : ''})` : `FAIL (${fails.length} findings)`);
  process.exit(pass ? 0 : 1);
}

module.exports = { validateBank, validateGlobal, measureWords, measurePillRow };
if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
