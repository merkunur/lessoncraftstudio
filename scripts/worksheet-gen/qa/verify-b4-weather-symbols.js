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
 * correct EN bank is the control. The five face render sections (F1-F5, PR3-
 * PR11, PR13-PR19, PR22) are Phase 2.
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

  // the seven Phase-2 face components ship unconsumed: a node smoke proves each builds its stamped markup from plausible args
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
    console.log('components: the 7 face components build their stamped markup (unconsumed until Phase 2)');
  }

  // 4. thermometer byte identity (node, before the browser)
  {
    const h = await hashG3345(false);
    for (const d of [1, 2, 3]) ok(h[d] === G3_345_FROZEN[d], `G3-345 d${d} body sha1 ${h[d]} ≠ the frozen ${G3_345_FROZEN[d]} (the additive thermometer options changed a live consumer)`);
    console.log(`thermometer: G3-345 d1/d2/d3 bodies === the frozen pre-edit sha1s (${Object.values(h).map((x) => x.slice(0, 8)).join('/')})`);
  }

  // 2. renders
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

    // 5. poisons
    let killed = 0;
    const TOTAL = 27;
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

    console.log('poisons:\n' + poisonLog.join('\n'));
    ok(killed === TOTAL, `poisons: ${killed}/${TOTAL} killed`);
    console.log('renders: ' + pngs.length + ' PNGs under out/dev (K-356-gate-*)');
  } finally {
    await browser.close();
  }
  const pass = fails.length === 0;
  if (!pass) console.log('FINDINGS:\n  ' + fails.join('\n  '));
  console.log(pass ? `PASS (${assertions} assertions, ${poisonLog.filter((l) => /KILLED|PASSES/.test(l)).length} poison verdicts clean${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings)`);
  process.exit(pass ? 0 : 1);
}

module.exports = { validateBank, validateGlobal, measureWords, measurePillRow };
if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
