#!/usr/bin/env node
/**
 * verify-b3-seasons.js — the K-322 `seasons` gate (design file §5; brief
 * deliverable 4) + the Phase-2 FACE sections (5-7, 2026-09-14): the five
 * `layout` faces K-338 which · K-339 wheel · K-340 odd · G1-323 months ·
 * K-341 tree render through the real pipeline at d2 under the en chrome and
 * the de (3-line) / fi (4-line) long-chrome fixtures, the pt-BR §4 block in
 * memory is the south-model control (inverted months, frame instead of tree,
 * override winter pool), the F4 month widths are swept x11, a 20-seed face
 * sweep, and the deferred face poisons P7 / P8 / P12 / P14 + PW / PC / PT / PM
 * (each must FAIL for its own reason). Rule 8 now covers every face's
 * strings; a locale block missing a face's strings records that face REFUSED.
 *
 *   node scripts/worksheet-gen/qa/verify-b3-seasons.js [--quick]
 *
 * 1. BANK — data/b3/seasons.js: the `neutral` block + every locale block
 *    against the §5 validator rules:
 *    (1) every pooled / overridden (theme, noun) resolves via fileUri, its
 *        theme dir carries no localized B&W marker, `opened:true`, its noun
 *        has a vocab entry in ALL 11 locales or declares `alt` x11, and is not
 *        in B2_EXCLUDE for any locale;
 *    (2) each NOUN sits in exactly one pool; the neutral pools never hold one
 *        of K-207's 12 nouns (data/science/summer-vs-winter-clothes.json,
 *        read HERE at validate time, never by the page); an override may
 *        reuse a K-207 noun only with a `reason`;
 *    (3) after veto / override, weak removed, every pool >= 2 (base d2) —
 *        below 3 the F1 / F3 faces are recorded as refused for that locale;
 *        the 4 names distinct, /^[\p{L}' ]+$/u, <= 12 glyphs, cross-checked
 *        (autumn vs the vocab key `autumn`; winter / summer vs the K-207 bin
 *        labels) unless `alt` declares the swap; the rendered width at the
 *        configured px <= the bin's inner 128 (measured in the REAL render);
 *    (4) monthSeason = 12 entries, 3 per season, contiguous cyclically;
 *        temperate-south REQUIRES the inverted tuple AND a winter override,
 *        temperate-north the north tuple;
 *    (5) cycle a rotation of [winter, spring, summer, autumn];
 *    (6) legend = 4 distinct codeColors names;
 *    (7) faces.tree.figure in {tree, frame}; captions x4 or null;
 *    (8) title <= 70 without a worksheet word, carrying the locale's
 *        COLLECTIVE season word and never a single season's name;
 *        instruction <= 150, slot-free, no calendar stem.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1 / d2 / d3 per authored locale + the tallest stack (d1, 408)
 *    and d3 under a 3-line title + 150-char instruction (the 722 floor).
 *    Asserts verify() empty, qa/lints.js clean, and ITSELF: every `.ws-icon`
 *    >= tokens.density.K.minElement (56) AND === the config px, tile count
 *    === 4 × perBin, 4 bins 150 wide, the bin name <= 128 px, both line
 *    zones > 0 and the stage inside the body / above the footer; the NODE
 *    gate: every rendered item's season === the bank's effective pool for
 *    that (theme, noun) and no neutral item noun in K-207's 12.
 * 3. SWEEP — 20 seeds at d2 (build only): no row ever a cycle rotation,
 *    maxAlignedPerRow held, >= 2 distinct item sets (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (WRONG REASON / SILENT both
 *    exit 1); the correct EN bank is the control (0 findings, renders clean).
 *      P1  snowman listed in winter AND autumn          → rule 2
 *      P2a winter/mittens in the neutral winter pool     → rule 2 (K-207)
 *      P2b clothing/coat in a neutral pool               → rule 2 (K-207)
 *      P2c winter/coat in a pt override WITHOUT reason   → rule 2; WITH reason PASSES
 *      P3a temperate-south with the north tuple          → rule 4
 *      P3b temperate-south with no winter override       → rule 4
 *      P3c a pt page rendering winter/snowman            → the node gate
 *      P4  an autumn pool of 1 after vetoes              → rule 3 + the spec REFUSES
 *      P5  {theme:'animals bw', noun:'owl'}              → rule 1 (BW marker)
 *      P6  the top row in cycle order                    → verify()
 *      P9  monthSeason with 4 winter months              → rule 4
 *      P10 de title "Winter zuordnen"                    → rule 8
 *      P11 tree/maple without alt                        → rule 1
 *      P13 a `printemps` bin at 28 px                    → the width floor (render)
 *      P15 the old 760 stack under 3-line chrome         → footer lint
 *      P16 an instruction containing "Kalender"          → rule 8
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b3-common.js');
const { vocab, excluded, fileUri } = require('../lib/b2-common.js');
const resolve = require('../image-cache/resolve.js');
const tokens = require('../primitives/_tokens.js');
const { markerTile, seasonBin, seasonSortStage } = require('../templates/components-b3.js');

const TYPE = require('../types/k/K-322-seasons.js');
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const KEYS = ['winter', 'spring', 'summer', 'autumn'];
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const MIN_ICON = tokens.density.K.minElement;   // 56
const BIN_INNER = 150 - 6 - 16;                 // 128
const NORTH = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
const SOUTH = ['summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter', 'winter', 'winter', 'spring', 'spring', 'spring', 'summer'];
const COLLECTIVE = { en: ['seasons'], de: ['jahreszeiten'], es: ['estaciones'], pt: ['estações'], fr: ['saisons'], it: ['stagioni'], nl: ['seizoenen'], sv: ['årstider', 'årstiderna'], da: ['årstider', 'årstiderne'], no: ['årstider', 'årstidene'], fi: ['vuodenajat', 'vuodenaikoja', 'vuodenaikaa'] };
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä/i;
const CALENDAR_STEM = /kalender|calendar|calendario|calendário|calendrier|kalenteri/i;

const K207 = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'science', 'summer-vs-winter-clothes.json'), 'utf8'));
const K207_NOUNS = new Set(K207.items.map((it) => it.noun));
const K207_LABELS = Object.fromEntries(K207.bins.map((b) => [b.key, b.label]));

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
const nfd = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/* ------------------------------------------------------------------ bank */
function vocabKeyOf(theme, noun) {
  try { const e = resolve.manifest().themes[theme]; return e && e.nouns[noun] ? e.nouns[noun].vocabKey || null : undefined; } catch (e) { return undefined; }
}
function checkRef(it, where, push) {
  const tag = (x) => `${where} ${it.theme}/${it.noun}: ${x}`;
  if (!it || typeof it.theme !== 'string' || typeof it.noun !== 'string') { push(`${where}: a ref without theme/noun`); return; }
  if (BW_MARKER.test(it.theme)) push(tag('theme dir carries a localized B&W marker'));
  try { fileUri(it.theme, it.noun); } catch (e) { push(tag('does not resolve via fileUri')); return; }
  if (it.opened !== true) push(tag('not opened:true'));
  const key = vocabKeyOf(it.theme, it.noun);
  const V = vocab();
  const hasAll = key && V[key] && LOCALES.every((l) => V[key][l] && V[key][l][0]);
  const altAll = it.alt && LOCALES.every((l) => typeof it.alt[l] === 'string' && it.alt[l].trim());
  if (!hasAll && !altAll) push(tag(key ? `vocab key ${key} is missing a locale and no alt x11` : 'no vocab key and no alt x11'));
  if (key && LOCALES.some((l) => excluded(key, l))) push(tag(`vocab key ${key} is in B2_EXCLUDE`));
}
/** The season's 3 months form one cyclic run (Dec-Jan-Feb straddles the wrap). */
function contiguous(tuple, season) {
  const n = tuple.length;
  return tuple.some((_, start) => [0, 1, 2].every((k) => tuple[(start + k) % n] === season));
}
function effectivePools(neutral, block, allowWeak) {
  const out = {};
  for (const k of KEYS) out[k] = TYPE._pool(neutral, block, k, allowWeak);
  return out;
}

function validateNeutral(neutral) {
  const f = [];
  const push = (m) => f.push(`[neutral] ${m}`);
  if (!neutral) { push('absent'); return f; }
  if (!Array.isArray(neutral.keys) || neutral.keys.join() !== KEYS.join()) push(`keys ${JSON.stringify(neutral.keys)} ≠ ${KEYS.join(',')}`);
  if (neutral.icons !== 'glyph') push(`icons "${neutral.icons}" (base ships the glyph signs)`);
  if (!neutral.pools) { push('no pools'); return f; }
  const nounPool = {};
  for (const k of KEYS) {
    const pool = neutral.pools[k];
    if (!Array.isArray(pool) || !pool.length) { push(`pool ${k} empty`); continue; }
    for (const it of pool) {
      checkRef(it, `pool ${k}`, push);
      // rule 2: NOUN in exactly one pool (winter/coat and clothing/coat are one noun)
      if (nounPool[it.noun] && nounPool[it.noun] !== k) push(`noun "${it.noun}" sits in both ${nounPool[it.noun]} and ${k} (two right answers)`);
      nounPool[it.noun] = k;
      if (K207_NOUNS.has(it.noun)) push(`noun "${it.noun}" in the neutral ${k} pool is one of K-207's 12 clothes nouns`);
    }
    const seen = new Set();
    for (const it of pool) { const r = it.theme + '/' + it.noun; if (seen.has(r)) push(`pool ${k} lists ${r} twice`); seen.add(r); }
  }
  if (JSON.stringify(neutral.monthSeasonNorth) !== JSON.stringify(NORTH)) push('monthSeasonNorth is not the north tuple');
  if (neutral.k207 !== 'summer-vs-winter-clothes.json') push('k207 must name summer-vs-winter-clothes.json');
  return f;
}

function validateBlock(neutral, block, loc, opts) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  const refusals = [];
  if (!block) { push('absent'); return { f, refusals }; }
  // rule 5
  const rot = Array.isArray(block.cycle) && block.cycle.length === 4 && [0, 1, 2, 3].some((s) => block.cycle.every((v, i) => v === KEYS[(i + s) % 4]));
  if (!rot) push(`cycle ${JSON.stringify(block.cycle)} is not a rotation of ${KEYS.join(',')}`);
  if (block.cycleStart && block.cycle && block.cycle[0] !== block.cycleStart) push(`cycleStart ${block.cycleStart} ≠ cycle[0]`);
  // veto refs must exist in a neutral pool
  for (const v of block.veto || []) {
    if (!KEYS.some((k) => (neutral.pools[k] || []).some((it) => it.theme === v.theme && it.noun === v.noun))) push(`veto ${v.theme}/${v.noun} is not a neutral marker`);
  }
  // overrides: rule 1 + rule 2 (a K-207 noun only with a reason)
  const nounPool = {};
  for (const k of KEYS) {
    const ov = block.override && block.override[k];
    if (!ov) continue;
    if (!Array.isArray(ov.items) || !ov.items.length) { push(`override ${k} has no items`); continue; }
    for (const it of ov.items) {
      checkRef(it, `override ${k}`, push);
      if (K207_NOUNS.has(it.noun) && !(typeof ov.reason === 'string' && ov.reason.trim())) push(`override ${k} reuses K-207's noun "${it.noun}" without a reason`);
    }
  }
  // rule 2 across the locale's EFFECTIVE pools
  let pools = null;
  try { pools = effectivePools(neutral, block, true); } catch (e) { push('pools: ' + e.message); }
  if (pools) {
    for (const k of KEYS) for (const it of pools[k]) {
      if (nounPool[it.noun] && nounPool[it.noun] !== k) push(`noun "${it.noun}" sits in both ${nounPool[it.noun]} and ${k} after override`);
      nounPool[it.noun] = k;
    }
    // rule 3 floors (weak removed = the d1/d2 pool)
    const strict = effectivePools(neutral, block, false);
    for (const k of KEYS) {
      const n = strict[k].length;
      if (n < 2) push(`pool ${k} has ${n} markers after veto/override (< 2: the base is REFUSED for ${loc})`);
      else if (n < 3) refusals.push(`${loc}: F1/F3 refused — ${k} pool ${n} < 3`);
    }
  }
  // rule 3 names
  const names = block.names || {};
  const V = vocab();
  const src = { autumn: V.autumn && V.autumn[loc] && V.autumn[loc][0], winter: K207_LABELS.winter[loc], summer: K207_LABELS.summer[loc] };
  const seen = new Set();
  for (const k of KEYS) {
    const n = names[k];
    if (typeof n !== 'string' || !n.trim()) { push(`no name for ${k}`); continue; }
    if (!/^[\p{L}' ]+$/u.test(n)) push(`name "${n}" has a non-letter`);
    if ([...n].length > 12) push(`name "${n}" > 12 glyphs`);
    const lc = n.toLocaleLowerCase(loc);
    if (seen.has(lc)) push(`name "${n}" appears twice`);
    seen.add(lc);
    if (src[k]) {
      const alt = block.alt && block.alt[k];
      const match = (x) => typeof x === 'string' && x.toLocaleLowerCase(loc) === src[k].toLocaleLowerCase(loc);
      if (!match(n) && !match(alt)) push(`name "${n}" for ${k} ≠ source "${src[k]}" and alt does not declare the swap`);
    }
  }
  // rule 4
  const ms = block.monthSeason;
  if (!Array.isArray(ms) || ms.length !== 12) push('monthSeason is not 12 entries');
  else {
    for (const k of KEYS) {
      const c = ms.filter((s) => s === k).length;
      if (c !== 3) push(`monthSeason has ${c} ${k} months, want 3`);
      else if (!contiguous(ms, k)) push(`monthSeason: ${k} months are not contiguous`);
    }
    if (block.model === 'temperate-north' && JSON.stringify(ms) !== JSON.stringify(NORTH)) push('temperate-north requires the north tuple');
    if (block.model === 'temperate-south') {
      if (JSON.stringify(ms) !== JSON.stringify(SOUTH)) push('temperate-south requires the inverted tuple');
      if (!(block.override && block.override.winter)) push('temperate-south requires a winter override (no snow)');
    }
    if (!['temperate-north', 'temperate-south'].includes(block.model)) push(`model "${block.model}"`);
  }
  // rule 6
  const legend = block.legend || {};
  const cc = Object.keys(tokens.codeColors);
  const lv = KEYS.map((k) => legend[k]);
  if (lv.some((v) => !cc.includes(v))) push(`legend ${JSON.stringify(legend)} is not 4 codeColors names`);
  else if (new Set(lv).size !== 4) push('legend colours are not distinct');
  // rule 7
  const tree = block.faces && block.faces.tree;
  if (!tree || !['tree', 'frame'].includes(tree.figure)) push('faces.tree.figure must be tree|frame');
  else if (tree.captions !== null && !(tree.captions && KEYS.every((k) => typeof tree.captions[k] === 'string' && tree.captions[k].trim()))) push('faces.tree.captions must be null or x4');
  // rule 8 — the base's pair + every face's pair (Phase 2); a face without strings is REFUSED for the locale
  const strings = block.strings || {};
  if (!strings['K-322']) push('strings K-322 missing');
  for (const id of ['K-338', 'K-339', 'K-340', 'G1-323', 'K-341']) if (!strings[id]) refusals.push(`${loc}: ${id} refused — no strings`);
  const titles = new Set();
  for (const [id, s] of Object.entries(strings)) {
    const title = s.title || '';
    if (!title || [...title].length > 70) push(`${id} title "${title}" > 70 chars or empty`);
    if (WORKSHEET_WORD.test(title)) push(`${id} title carries the worksheet word`);
    const coll = COLLECTIVE[loc] || [];
    if (id === 'K-322' && coll.length && !coll.some((w) => nfd(title).includes(nfd(w)))) push(`title "${title}" lacks the collective season word (${coll.join('/')})`);
    for (const k of KEYS) {
      const n = names[k];
      if (n && new RegExp('(?<!\\p{L})' + nfd(n).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u').test(nfd(title))) push(`title "${title}" names a single season (${n})`);
    }
    if (titles.has(nfd(title))) push(`${id} title "${title}" repeats another face's title`);
    titles.add(nfd(title));
    const ins = s.instruction || '';
    if (!ins || [...ins].length > 150) push(`${id} instruction > 150 chars or empty`);
    if (/[{}]/.test(ins)) push(`${id} instruction carries a slot`);
    if (CALENDAR_STEM.test(ins) || CALENDAR_STEM.test(title)) push('a calendar stem (K-321 owns it)');
  }
  if (typeof block.strand !== 'string' || !block.strand.trim()) push('no strand literal');
  else if (/common core/i.test(block.strand) && loc !== 'en') push('strand names Common Core outside en');
  return { f, refusals };
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { difficulty, locale, baseName, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: locale || 'en', page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-ws-content][data-lcs-seasons]');
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const rows = ['top', 'bottom'].map((w) => document.querySelector(`[data-lcs-row="${w}"]`)).map((r) => r ? r.getBoundingClientRect() : null);
    const binsEl = document.querySelector('[data-lcs-bins]');
    const binsR = binsEl ? binsEl.getBoundingClientRect() : null;
    return {
      stamps: root ? { ...root.dataset } : null,
      icons: [...document.querySelectorAll('[data-lcs-item] .ws-icon')].map((el) => Math.min(el.offsetWidth, el.offsetHeight)),
      items: [...document.querySelectorAll('[data-lcs-item]')].map((el) => ({ item: el.dataset.lcsItem, season: el.dataset.lcsSeason })),
      bins: [...document.querySelectorAll('[data-lcs-bin]')].map((b) => {
        const span = b.querySelector('.ws-season-name');
        return { key: b.dataset.lcsBin, w: b.getBoundingClientRect().width, h: b.getBoundingClientRect().height, name: span ? span.textContent.trim() : null, nameW: span ? span.scrollWidth : 0, fs: span ? parseFloat(getComputedStyle(span).fontSize) : 0 };
      }),
      stage: root ? (() => { const r = root.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; })() : null,
      body: { left: body.left, right: body.right, top: body.top, bottom: body.bottom },
      foot,
      zones: rows[0] && binsR && rows[1] ? [binsR.top - rows[0].bottom, rows[1].top - binsR.bottom] : null,
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath };
}

function nodeGate(name, r, neutral, block, d) {
  // every rendered item's season === the bank's effective pool for that (theme, noun); no neutral noun in K-207
  let pools;
  try { pools = effectivePools(neutral, block, !!d.allowWeak); } catch (e) { ok(false, `${name}: pools ${e.message}`); return; }
  for (const it of r.m.items) {
    const [theme, noun] = it.item.split('/');
    const home = KEYS.find((k) => pools[k].some((p) => p.theme === theme && p.noun === noun));
    ok(home === it.season, `${name}: node gate — ${it.item} stamped ${it.season} but the ${name.split(' ')[1] || ''} bank pools it as ${home || 'NOTHING'}`);
    const overridden = block.override && block.override[it.season];
    if (!overridden) ok(!K207_NOUNS.has(noun), `${name}: node gate — neutral item "${noun}" is one of K-207's 12`);
  }
}

function assertRender(name, r, d, opts) {
  const cfg = TYPE.difficulty[d];
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.stamps && +r.m.stamps.lcsPerBin === cfg.perBin, `${name}: perBin stamp ${r.m.stamps && r.m.stamps.lcsPerBin} ≠ ${cfg.perBin}`);
  ok(r.m.items.length === 4 * cfg.perBin, `${name}: ${r.m.items.length} tiles ≠ ${4 * cfg.perBin}`);
  const minIcon = r.m.icons.length ? Math.min(...r.m.icons) : 0;
  ok(minIcon >= MIN_ICON, `${name}: icon ${minIcon} px < K floor ${MIN_ICON}`);
  ok(r.m.icons.every((px) => Math.abs(px - cfg.iconPx) < 0.6), `${name}: icons ${JSON.stringify(r.m.icons)} ≠ config ${cfg.iconPx}`);
  ok(r.m.bins.length === 4 && r.m.bins.every((b) => Math.abs(b.w - 150) < 0.6 && Math.abs(b.h - cfg.binH) < 0.6), `${name}: bins ${JSON.stringify(r.m.bins.map((b) => [b.key, b.w, b.h]))} ≠ 4 × 150 × ${cfg.binH}`);
  for (const b of r.m.bins) {
    if (b.name === null) continue;
    ok(b.nameW <= BIN_INNER + 0.6, `${name}: bin name "${b.name}" ${b.nameW} px > inner ${BIN_INNER} (at ${b.fs} px)`);
    ok(b.fs >= tokens.density.K.fontLabel, `${name}: bin name ${b.fs} px < K label floor ${tokens.density.K.fontLabel}`);
  }
  ok(r.m.stage && r.m.stage.left >= r.m.body.left - 0.6 && r.m.stage.right <= r.m.body.right + 0.6, `${name}: stage outside the body column`);
  ok(r.m.stage && r.m.stage.bottom <= r.m.foot + 0.6, `${name}: stage reaches into the footer band`);
  ok(r.m.zones && r.m.zones.every((z) => z > 0), `${name}: line zones ${JSON.stringify(r.m.zones)} (a row touches the signs)`);
  if (opts && opts.neutral) nodeGate(name, r, opts.neutral, opts.block, cfg);
  return { minIcon, zones: r.m.zones ? r.m.zones.map(Math.round) : null, body: Math.round(r.m.body.bottom - r.m.body.top) };
}

/* ----------------------------------------------------------------- poison */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function typeWith(neutral, block) {
  return Object.assign({}, TYPE, { build(args, ctx) { return this._buildWith({ neutral, block }, args, ctx); } });
}
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
/** Run assertRender on a poisoned page and hand back ITS findings without counting them against the control. */
function collect(fn) {
  const before = fails.length, saved = assertions;
  fn();
  const found = fails.splice(before);
  assertions = saved;
  return found;
}
/** The design's §4 pt-BR block in memory (the pt panel authors the real one): winter = no snow (K-207 nouns with a reason),
 *  autumn = maple · persimmon (weak) · apple · harvest, spring = the neutral six + butterfly + bee; vetoes pumpkin / mushroom /
 *  scarecrow / hedgehog. Strict autumn = 3 = the F1 / F3 floor exactly — one more pt autumn veto refuses both faces there. */
const PT_OVERRIDE = {
  winter: { items: [
    { theme: 'winter', noun: 'coat', opened: true }, { theme: 'winter', noun: 'sweater', opened: true },
    { theme: 'winter', noun: 'boots', opened: true }, { theme: 'winter', noun: 'fireplace', opened: true },
    { theme: 'clothing', noun: 'scarf', opened: true }, { theme: 'clothing', noun: 'beanie', opened: true },
  ], reason: 'no snow in BR: the K-207 nouns coat/sweater/boots/scarf are a recorded exception' },
  autumn: { items: [
    { theme: 'tree', noun: 'maple', opened: true, vocabKey: null, alt: Object.fromEntries(LOCALES.map((l) => [l, 'a tree with red and orange leaves'])) },
    { theme: 'fruits', noun: 'persimmon', opened: true, weak: true },
    { theme: 'thanksgivinng', noun: 'apple', opened: true }, { theme: 'thanksgivinng', noun: 'harvest', opened: true },
  ], reason: 'BR autumn: caqui + colheita; pumpkin / mushroom / scarecrow / hedgehog are not autumn markers in BR' },
  spring: { items: [
    { theme: 'spring', noun: 'tulip', opened: true }, { theme: 'spring', noun: 'bud', opened: true }, { theme: 'spring', noun: 'chick', opened: true },
    { theme: 'spring', noun: 'duckling', opened: true }, { theme: 'spring', noun: 'lamb', opened: true }, { theme: 'spring', noun: 'nest', opened: true },
    { theme: 'spring', noun: 'birdhouse', opened: true, weak: true }, { theme: 'spring', noun: 'butterfly', opened: true }, { theme: 'spring', noun: 'bee', opened: true },
  ], reason: 'BR spring adds butterfly + bee (panel)' },
};
const PT_VETO = [
  { theme: 'thanksgivinng', noun: 'pumpkin', reason: 'pt veto' }, { theme: 'vegetables', noun: 'mushroom', reason: 'pt veto' },
  { theme: 'thanksgivinng', noun: 'scarecrow', reason: 'espantalho = festa junina (June)' }, { theme: 'forest creatures', noun: 'hedgehog', reason: 'pt veto' },
];
function ptBlock(en) {
  const b = clone(en);
  b.names = { winter: 'inverno', spring: 'primavera', summer: 'verão', autumn: 'outono' };
  b.alt = { autumn: null };
  b.model = 'temperate-south';
  b.monthSeason = SOUTH.slice();
  b.veto = clone(PT_VETO);
  b.override = clone(PT_OVERRIDE);
  b.strings = { 'K-322': { title: 'As quatro estações do ano', instruction: 'Ligue o ponto de cada figura à caixa da estação a que ela pertence.' } };
  b.strand = 'BNCC EI: Espaços, tempos, quantidades, relações e transformações';
  return b;
}

const rx = (x) => String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* ====================================================================== PHASE 2 — the faces (sections 5-7) */
const { loadType } = require('../lib/load-types.js');
const C3 = require('../templates/components-b3.js');
const { NAMES: CAL_NAMES } = require('../data/b2/calendar.js');
const { COLOR_WORDS } = require('../data/color-words.js');
const FACE_ROWS = require('../tools/b3var-rows/seasons.js').ROWS;
const FACES = { which: 'K-338', wheel: 'K-339', odd: 'K-340', months: 'G1-323', tree: 'K-341' };
const WORD_OF = { codeRed: 'red', codeBlue: 'blue', codeYellow: 'yellow', codeGreen: 'green', codeOrange: 'orange', codePurple: 'purple', codeBrown: 'brown', codePink: 'pink' };
/** Long-chrome fixtures: a 70-char title + a 150-char instruction; de wraps the title to 3 lines, fi (long words) to 4. body = the ceiling the render must squeeze to. */
const LONG = {
  de: { title: 'Jahreszeiten erkennen: Welche Bilder gehören zu welcher Jahreszeit? Ja', instruction: 'Schau dir die Bilder auf jeder Karte genau an, überlege dir, zu welcher Jahreszeit sie gehören, und kreise dann das passende Zeichen für diese Jahreszeit ein.'.slice(0, 150), body: 740 },
  fi: { title: 'Vuodenaikojen tunnistaminen: ympyröi oikea vuodenaikamerkki jokaiselle', instruction: 'Katso jokaisen kortin kolmea kuvaa tarkasti, mieti mihin vuodenaikaan ne kuuluvat ja ympyröi sitten kortin alareunasta sen vuodenajan merkki huolellisesti.'.slice(0, 150), body: 710 },
};

/** The face-aware measurement: root stamps, the lowest content edge, and per-layout geometry. */
async function renderFace(page, type, { locale = 'en', baseName, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty: 2, locale, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-ws-content][data-lcs-seasons]');
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    let lowest = 0;
    if (root) root.querySelectorAll('*').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && r.height && r.bottom > lowest) lowest = r.bottom; });
    const stamps = root ? { ...root.dataset } : null;
    const layout = stamps ? stamps.lcsLayout : null;
    const m = { stamps, layout, body: { ...rect(document.querySelector('[data-lcs-body]')) }, foot, lowest, stage: root ? rect(root) : null,
      icons: [...document.querySelectorAll('[data-lcs-item] .ws-icon')].map((el) => Math.min(el.offsetWidth, el.offsetHeight)),
      items: [...document.querySelectorAll('[data-lcs-item]')].map((el) => ({ item: el.dataset.lcsItem, season: el.dataset.lcsSeason })) };
    if (layout === 'which') {
      m.cards = [...root.querySelectorAll('[data-lcs-which]')].map((c) => ({ answer: c.dataset.lcsAnswer, markers: [...c.querySelectorAll('[data-lcs-item]')].map((e) => e.dataset.lcsItem),
        choices: [...c.querySelectorAll('[data-lcs-choice]')].map((t) => ({ key: t.dataset.lcsChoice, w: t.getBoundingClientRect().width, glyph: Math.min(t.querySelector('[data-lcs-icon]').getBoundingClientRect().width, t.querySelector('[data-lcs-icon]').getBoundingClientRect().height) })),
        stage: rect(c), card: rect(c.closest('.ws-card')) }));
    }
    if (layout === 'wheel') {
      m.slots = [...root.querySelectorAll('[data-lcs-slot]')].map((s) => { const n = s.querySelector('.ws-season-slot-name'); return { key: s.dataset.lcsSlot, given: s.dataset.lcsGiven, w: s.getBoundingClientRect().width, name: n ? n.textContent.trim() : null, nameW: n ? n.scrollWidth : 0 }; });
      m.bank = [...root.querySelectorAll('[data-lcs-model]')].map((b) => { const n = b.querySelector('.ws-season-model-name'); return { key: b.dataset.lcsModel, w: b.clientWidth, name: n ? n.textContent.trim() : null, nameW: n ? n.scrollWidth : 0 }; });
      m.wheel = rect(root.querySelector('[data-lcs-wheel]'));
    }
    if (layout === 'odd') {
      m.rows = [...root.querySelectorAll('[data-lcs-odd-row]')].map((r) => ({ majority: r.dataset.lcsMajority, odd: +r.dataset.lcsOdd, h: r.getBoundingClientRect().height, items: [...r.querySelectorAll('[data-lcs-item]')].map((e) => ({ item: e.dataset.lcsItem, season: e.dataset.lcsSeason, tile: e.getBoundingClientRect().width })) }));
    }
    if (layout === 'months') {
      m.tiles = [...root.querySelectorAll('[data-lcs-month]')].map((t) => { const n = t.querySelector('.ws-month-name'); const a = t.querySelector('[data-lcs-circle],[data-lcs-write]'); const tr = t.getBoundingClientRect(); const nr = n.getBoundingClientRect(); const ar = a ? a.getBoundingClientRect() : null;
        return { month: +t.dataset.lcsMonth, season: t.dataset.lcsSeason, name: n.textContent.trim(), nameW: n.scrollWidth, w: tr.width, h: tr.height, circle: ar ? Math.min(ar.width, ar.height) : 0, clearance: ar ? ar.left - nr.right : null, answerInside: ar ? ar.right <= tr.right - parseFloat(getComputedStyle(t).paddingRight) + 0.6 : false }; });
      m.legend = [...root.querySelectorAll('[data-lcs-legend]')].map((l) => ({ key: l.dataset.lcsLegend, color: l.dataset.lcsColor, name: l.querySelector('.ws-season-legend-name').textContent.trim(), word: l.querySelector('[data-lcs-colorword]').textContent.trim(), swatchBg: getComputedStyle(l.querySelector('[data-lcs-swatch]')).backgroundColor }));
      m.legendH = root.querySelector('[data-lcs-legend-row]').getBoundingClientRect().height;
      m.grid = rect(root.querySelector('[data-lcs-months-grid]'));
    }
    if (layout === 'tree') {
      m.cards = [...root.querySelectorAll('[data-lcs-tree-card]')].map((c) => { const o = c.querySelector('[data-lcs-open]'); const n = c.querySelector('.ws-season-tree-name'); return { key: c.dataset.lcsTreeCard, name: n ? n.textContent.trim() : null, open: o ? o.dataset.lcsOpen : null, openRect: o ? rect(o) : null, card: rect(c.closest('.ws-card')), imgs: c.querySelectorAll('img').length }; });
    }
    return m;
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath };
}

function assertFaceCommon(name, r, layout) {
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.layout === layout, `${name}: root stamp layout "${r.m.layout}" ≠ ${layout}`);
  ok(r.m.stage && r.m.stage.left >= r.m.body.left - 0.6 && r.m.stage.right <= r.m.body.right + 0.6, `${name}: stage outside the body column`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: content reaches ${Math.round(r.m.lowest)} into the footer band at ${Math.round(r.m.foot)}`);
}
function assertWhich(name, r, neutral, block, d) {
  assertFaceCommon(name, r, 'which');
  ok(r.m.cards.length === d.cards, `${name}: ${r.m.cards.length} cards ≠ ${d.cards}`);
  ok(r.m.icons.length === d.cards * d.markers && r.m.icons.every((px) => Math.abs(px - d.iconPx) < 0.6) && Math.min(...r.m.icons) >= 88, `${name}: marker icons ${JSON.stringify(r.m.icons)} ≠ ${d.iconPx} (floor 88)`);
  for (const c of r.m.cards) {
    ok(c.choices.length === d.choices && c.choices.every((t) => t.w >= d.choiceTile - 0.6 && t.glyph >= 56 - 0.6), `${name}: choice tiles ${JSON.stringify(c.choices.map((t) => [Math.round(t.w), Math.round(t.glyph)]))} below 68 / glyph 56`);
    ok(c.stage.left >= c.card.left - 0.6 && c.stage.right <= c.card.right + 0.6 && c.stage.bottom <= c.card.bottom + 0.6, `${name}: a card's stage spills out of its card`);
  }
  const answers = r.m.cards.map((c) => c.answer);
  ok(new Set(answers).size === 4 && answers.every((a) => KEYS.includes(a)), `${name}: answers ${answers.join(',')} are not a permutation of the four seasons`);
  nodeGate(name, r, neutral, block, d);
}
function assertWheel(name, r, block, d) {
  assertFaceCommon(name, r, 'wheel');
  ok(r.m.slots.map((s) => s.key).join(',') === block.cycle.join(','), `${name}: slots ${r.m.slots.map((s) => s.key).join(',')} ≠ the ${'bank'} cycle ${block.cycle.join(',')}`);
  ok(r.m.slots.filter((s) => s.given === '1').length === d.given, `${name}: ${r.m.slots.filter((s) => s.given === '1').length} given slots ≠ ${d.given}`);
  ok(r.m.slots.every((s) => s.w >= 110 - 0.6), `${name}: a slot is narrower than 110`);
  ok(r.m.bank.length === d.tiles, `${name}: bank ${r.m.bank.length} tiles ≠ ${d.tiles}`);
  for (const s of r.m.slots.filter((x) => x.given === '1')) ok(s.name === block.names[s.key], `${name}: slot ${s.key} prints "${s.name}" ≠ bank name "${block.names[s.key]}"`);
  for (const b of r.m.bank) ok(b.name === block.names[b.key] && b.nameW <= b.w - 4 + 0.6, `${name}: bank tile ${b.key} "${b.name}" (${Math.round(b.nameW)} px) ≠ bank name or wider than its tile`);
  ok(r.m.wheel && Math.abs(r.m.wheel.w - 440) < 0.6 && Math.abs(r.m.wheel.h - 440) < 0.6, `${name}: wheel ${r.m.wheel && Math.round(r.m.wheel.w)} px ≠ 440`);
}
function assertOdd(name, r, neutral, block, d) {
  assertFaceCommon(name, r, 'odd');
  ok(r.m.rows.length === d.rows, `${name}: ${r.m.rows.length} rows ≠ ${d.rows}`);
  ok(r.m.icons.length === d.rows * d.items && r.m.icons.every((px) => Math.abs(px - d.iconPx) < 0.6) && Math.min(...r.m.icons) >= 96, `${name}: icons ${JSON.stringify(r.m.icons)} ≠ ${d.iconPx} (floor 96)`);
  ok(r.m.rows.every((row) => row.h >= (d.rowMin || 140) - 0.6), `${name}: a row is shorter than ${d.rowMin || 140} (${r.m.rows.map((x) => Math.round(x.h)).join('/')})`);
  ok(new Set(r.m.rows.map((row) => row.majority)).size === 4, `${name}: majorities ${r.m.rows.map((x) => x.majority).join(',')} are not the four seasons`);
  ok(new Set(r.m.rows.map((row) => row.odd)).size >= 2, `${name}: the intruder index ${r.m.rows.map((x) => x.odd).join('')} is constant`);
  nodeGate(name, r, neutral, block, d);
  // the intruder's bank pool ≠ the majority (a second, independent reading of the bank)
  let pools; try { pools = effectivePools(neutral, block, !!d.allowWeak); } catch (e) { pools = null; }
  if (pools) for (const row of r.m.rows) {
    const [theme, noun] = row.items[row.odd].item.split('/');
    const home = KEYS.find((k) => pools[k].some((p) => p.theme === theme && p.noun === noun));
    ok(home && home !== row.majority, `${name}: row ${row.majority} intruder ${row.items[row.odd].item} is pooled under ${home} — not an intruder`);
  }
}
function assertMonths(name, r, block, d, loc) {
  assertFaceCommon(name, r, 'months');
  const cal = CAL_NAMES[loc].monthNames;
  ok(r.m.tiles.length === 12, `${name}: ${r.m.tiles.length} tiles`);
  r.m.tiles.forEach((t, i) => {
    ok(t.month === i && t.name === cal[i], `${name}: tile ${i + 1} "${t.name}" (month ${t.month}) ≠ calendar "${cal[i]}"`);
    ok(t.season === block.monthSeason[i], `${name}: node gate — ${t.name} stamped ${t.season} but the bank's monthSeason says ${block.monthSeason[i]}`);
    ok(t.circle >= 44 - 0.6 && Math.abs(t.circle - d.circle) < 0.6, `${name}: ${t.name} circle ${Math.round(t.circle)} ≠ ${d.circle} (G1 floor 44)`);
    ok(t.clearance != null && t.clearance >= 8 && t.answerInside, `${name}: "${t.name}" (${Math.round(t.nameW)} px) clears the circle by ${t.clearance == null ? '?' : Math.round(t.clearance)} px (< 8) or the circle leaves the tile ${Math.round(t.w)}`);
    ok(t.h >= d.tileH - 0.6 && t.h <= (d.tileMax || 128) + 0.6 && Math.abs(t.w - d.tileW) < 0.6, `${name}: ${t.name} tile ${Math.round(t.w)} × ${Math.round(t.h)} outside ${d.tileW} × ${d.tileH}..${d.tileMax || 128}`);
  });
  ok(r.m.legend.map((l) => l.key).join(',') === block.cycle.join(','), `${name}: legend ${r.m.legend.map((l) => l.key).join(',')} ≠ the cycle`);
  for (const l of r.m.legend) {
    ok(l.color === block.legend[l.key] && l.name === block.names[l.key], `${name}: legend ${l.key} prints "${l.name}" / ${l.color} ≠ the bank`);
    ok(l.word === COLOR_WORDS[loc][WORD_OF[l.color]], `${name}: legend ${l.key} colour word "${l.word}" ≠ COLOR_WORDS.${loc}.${WORD_OF[l.color]}`);
  }
  ok(r.m.grid && r.m.grid.right <= r.m.body.right + 0.6 && r.m.grid.left >= r.m.body.left - 0.6, `${name}: the month grid leaves the body column`);
  return r.m.tiles.reduce((w, t) => Math.max(w, t.nameW), 0);
}
function assertTree(name, r, block, figure) {
  assertFaceCommon(name, r, 'tree');
  ok(r.m.cards.map((c) => c.key).join(',') === block.cycle.join(','), `${name}: cards ${r.m.cards.map((c) => c.key).join(',')} ≠ the cycle`);
  ok(r.m.stamps.lcsFigure === figure, `${name}: figure stamp ${r.m.stamps.lcsFigure} ≠ ${figure}`);
  for (const c of r.m.cards) {
    ok(c.name === block.names[c.key], `${name}: card ${c.key} prints "${c.name}" ≠ bank name`);
    ok(c.open === figure && c.openRect && c.openRect.w >= 260 - 0.6 && c.openRect.h >= 250 - 0.6, `${name}: card ${c.key} open area ${c.open} ${c.openRect && Math.round(c.openRect.w)} × ${c.openRect && Math.round(c.openRect.h)} ≠ ${figure} 260 × 250`);
    ok(c.openRect && c.openRect.bottom <= c.card.bottom + 0.6 && c.openRect.right <= c.card.right + 0.6, `${name}: card ${c.key} open area leaves its card`);
    ok(c.imgs === 0, `${name}: card ${c.key} prints a picture`);
  }
}

function faceType(layout, neutral, block) {
  const T = loadType(FACES[layout]);
  return Object.assign({}, T, { build(args, ctx) { return this._buildWith({ neutral, block }, args, ctx); } });   // `this` = the copy, so a difficulty override on it is honoured
}

async function runFaces({ page, neutral, en, pngs }) {
  const T = Object.fromEntries(Object.entries(FACES).map(([k, id]) => [k, loadType(id)]));
  const cfg = Object.fromEntries(Object.keys(FACES).map((k) => [k, T[k].difficulty[2]]));
  let killed = 0;
  const log = [];

  // 5a. the rows module, the emitted specs and the bank strings are ONE source
  for (const row of FACE_ROWS) {
    const [dir, id, slug, , , over, title, instr, extra] = row;
    const layout = over.layout;
    ok(FACES[layout] === id, `rows: ${id} layout "${layout}" is not the face the design gives that id`);
    const file = path.join(__dirname, '..', 'types', dir, `${id}-${slug}.js`);
    ok(fs.existsSync(file), `rows: ${id} not emitted at types/${dir}/${id}-${slug}.js (run tools/gen-b3var-specs.js)`);
    const spec = T[layout];
    ok(spec.id === id && spec.difficulty[2].layout === layout, `${id}: emitted spec id/layout drift`);
    ok(spec.i18n.en.title === title && spec.i18n.en.instruction === instr, `${id}: emitted i18n ≠ the row`);
    const s = en.strings[id];
    ok(s && s.title === title && s.instruction === instr, `${id}: data/b3/seasons.js strings['${id}'] ≠ the row's EN pair (one source)`);
    ok(spec.gradeBand === (extra && extra.gradeBand ? extra.gradeBand : 'K'), `${id}: gradeBand ${spec.gradeBand}`);
    ok(spec.themeAxis && spec.themeAxis.applicable === false, `${id}: the face must stay themeless`);
    for (const k of Object.keys(cfg[layout])) if (k in over) ok(JSON.stringify(cfg[layout][k]) === JSON.stringify(over[k]), `${id}: config ${k} ≠ the row`);
  }
  ok(FACE_ROWS.length === 5, `rows: ${FACE_ROWS.length} rows, want 5`);
  for (const k of Object.keys(LONG)) ok([...LONG[k].title].length === 70 && [...LONG[k].instruction].length === 150, `long-chrome fixture ${k} is ${[...LONG[k].title].length}/${[...LONG[k].instruction].length} chars, want 70/150`);

  // 5b. renders — en chrome + both long-chrome fixtures, every face
  const fixtures = [['en', null], ['de', LONG.de], ['fi', LONG.fi]];
  const results = {};
  for (const [layout, id] of Object.entries(FACES)) {
    for (const [fx, strings] of fixtures) {
      const name = `${id} ${layout}${fx === 'en' ? '' : ' long chrome ' + fx}`;
      const r = await renderFace(page, T[layout], { baseName: `${id}-gate-d2-en${fx === 'en' ? '' : '-longchrome-' + fx}`, strings });
      pngs.push(r.png);
      if (strings) ok(r.m.body.h <= LONG[fx].body, `${name}: body ${Math.round(r.m.body.h)} px — the fixture did not squeeze the body to <= ${LONG[fx].body}`);
      let extra = '';
      if (layout === 'which') { assertWhich(name, r, neutral, en, cfg.which); extra = ` cards ${r.m.cards.map((c) => c.answer).join('/')} positions ${r.m.cards.map((c) => c.choices.findIndex((t) => t.key === c.answer)).join('')}`; }
      else if (layout === 'wheel') { assertWheel(name, r, en, cfg.wheel); extra = ` slots ${r.m.slots.map((s) => s.key + (s.given === '1' ? '*' : '')).join('>')} bank ${r.m.bank.map((b) => b.key).join(',')}`; }
      else if (layout === 'odd') { assertOdd(name, r, neutral, en, cfg.odd); extra = ` rows ${r.m.rows.map((x) => Math.round(x.h)).join('/')} px majorities ${r.m.rows.map((x) => x.majority).join('/')} odd ${r.m.rows.map((x) => x.odd).join('')}`; }
      else if (layout === 'months') { const w = assertMonths(name, r, en, cfg.months, 'en'); extra = ` tiles ${Math.round(r.m.tiles[0].h)} px widest month ${Math.round(w)} px legend ${Math.round(r.m.legendH)} px`; }
      else { assertTree(name, r, en, 'tree'); extra = ` cards ${r.m.cards.map((c) => c.key).join('/')} open ${Math.round(r.m.cards[0].openRect.w)} × ${Math.round(r.m.cards[0].openRect.h)}`; }
      if (fx === 'en') results[layout] = r;
      console.log(`render ${name}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}${extra}`);
    }
  }
  // an unauthored locale REFUSES on every face
  for (const [layout, id] of Object.entries(FACES)) {
    let refused = false;
    try { T[layout].build({ theme: null, difficulty: 2, locale: 'xx' }, { rng: makeRng('x') }); } catch (e) { refused = /no xx block/.test(e.message); }
    ok(refused, `${id} ${layout}: an unauthored locale must REFUSE (throw), not fall back to en`);
  }
  // 5c. the pt-BR CONTROL (the §4 block in memory): F4 follows the inverted tuple, F5 re-targets to the frame,
  // F1 / F3 draw the override winter pool (no snow marker ever), the base's node gate holds
  {
    const b = ptBlock(en);
    b.faces = { tree: { figure: 'frame', captions: null } };
    for (const id of Object.keys(FACES).map((k) => FACES[k])) b.strings[id] = en.strings[id];
    const rm = await renderFace(page, faceType('months', neutral, b), { locale: 'pt', baseName: 'G1-323-gate-d2-pt-control', strings: en.strings['G1-323'] });
    pngs.push(rm.png);
    assertMonths('G1-323 pt control', rm, b, cfg.months, 'pt');
    ok(rm.m.tiles.map((t) => t.season).join(',') === SOUTH.join(','), `G1-323 pt control: tiles ${rm.m.tiles.map((t) => t.season).join(',')} ≠ the inverted tuple`);
    const rt = await renderFace(page, faceType('tree', neutral, b), { locale: 'pt', baseName: 'K-341-gate-d2-pt-control', strings: en.strings['K-341'] });
    pngs.push(rt.png);
    assertTree('K-341 pt control', rt, b, 'frame');
    for (const layout of ['which', 'odd']) {
      const r = await renderFace(page, faceType(layout, neutral, b), { locale: 'pt', baseName: `${FACES[layout]}-gate-d2-pt-control`, strings: en.strings[FACES[layout]] });
      pngs.push(r.png);
      if (layout === 'which') assertWhich(`${FACES[layout]} pt control`, r, neutral, b, cfg.which); else assertOdd(`${FACES[layout]} pt control`, r, neutral, b, cfg.odd);
      ok(!r.m.items.some((it) => /^winter\/(snowman|sled|sledding|skiing|skating|snowboarding|icicle|ice)$/.test(it.item)), `${FACES[layout]} pt control: a snow marker on a pt page (${r.m.items.map((i) => i.item).join(' ')})`);
      ok(r.m.items.some((it) => it.season === 'winter' && /^(winter|clothing)\/(coat|sweater|boots|fireplace|scarf|beanie)$/.test(it.item)) || layout === 'odd', `${FACES[layout]} pt control: no override winter marker on the page`);
    }
    console.log(`render pt control: months ${rm.m.tiles.map((t) => t.season[0]).join('')} tree figure ${rt.m.stamps.lcsFigure}`);
  }
  // 5e. F2 widest-name control: the widest §4 names (`printemps` 84 px, `primavera` 83 px at 18) in the GIVEN slot (a panel may
  //     start the cycle at spring — de does; pt is open) must stay inside the 110 circle — verify() measures the name box against it
  for (const [loc, names] of [['fr', { winter: 'hiver', spring: 'printemps', summer: 'été', autumn: 'automne' }], ['es', { winter: 'invierno', spring: 'primavera', summer: 'verano', autumn: 'otoño' }]]) {
    const b = clone(en); b.names = names; b.alt = { autumn: null }; b.cycleStart = 'spring'; b.cycle = ['spring', 'summer', 'autumn', 'winter'];
    const r = await renderFace(page, faceType('wheel', neutral, b), { locale: loc, baseName: `K-339-gate-d2-${loc}-spring-start`, strings: en.strings['K-339'] });
    pngs.push(r.png);
    assertWheel(`K-339 ${loc} spring-start control`, r, b, cfg.wheel);
    const given = r.m.slots.find((x) => x.given === '1');
    console.log(`render K-339 ${loc} spring-start control: verify ${r.verify.length} given "${given.name}" ${Math.round(given.nameW)} px bank ${r.m.bank.map((x) => x.name + ' ' + Math.round(x.nameW)).join(' / ')}`);
  }
  // 5d. F4 width sweep x11 (the en bank injected; the month names + colour words come from the locale): every widest month clears the circle
  {
    const widths = [];
    for (const loc of LOCALES) {
      const r = await renderFace(page, faceType('months', neutral, en), { locale: loc, baseName: `G1-323-gate-d2-${loc}-widths`, strings: en.strings['G1-323'] });
      if (loc === 'es' || loc === 'fi') pngs.push(r.png);
      const w = assertMonths(`G1-323 widths ${loc}`, r, en, cfg.months, loc);
      const t = r.m.tiles.reduce((a, x) => (x.nameW > a.nameW ? x : a), r.m.tiles[0]);
      widths.push(`${loc} ${t.name} ${Math.round(w)} (+${Math.round(t.clearance)})`);
    }
    console.log(`F4 widest month at 22 px: ${widths.join(' · ')}`);
  }

  // 6. face sweep — 20 seeds each (build only)
  if (!QUICK) {
    const whichSets = new Set(), oddSets = new Set(), wheelOrders = new Set();
    for (let k = 1; k <= 20; k++) {
      const rng = (id) => makeRng(instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch: k }));
      const w = T.which.build({ theme: null, difficulty: 2, locale: 'en' }, { rng: rng('K-338') });
      ok(new Set(w.meta.answers).size === 4, `sweep seed ${k}: F1 answers ${w.meta.answers.join(',')} repeat a season`);
      const nouns = w.meta.cards.flat();
      ok(new Set(nouns.map((x) => x.split('/')[1])).size === nouns.length, `sweep seed ${k}: F1 a noun twice`);
      whichSets.add(nouns.slice().sort().join(','));
      const o = T.odd.build({ theme: null, difficulty: 2, locale: 'en' }, { rng: rng('K-340') });
      ok(new Set(o.meta.odd).size >= 2, `sweep seed ${k}: F3 odd index ${o.meta.odd.join('')} constant`);
      ok(new Set(o.meta.majorities).size === 4, `sweep seed ${k}: F3 majorities ${o.meta.majorities.join(',')}`);
      oddSets.add(o.meta.intruders.slice().sort().join(','));
      const wh = T.wheel.build({ theme: null, difficulty: 2, locale: 'en' }, { rng: rng('K-339') });
      const miss = en.cycle.slice(1);
      ok(wh.meta.bank.join(',') !== miss.join(',') && wh.meta.bank.join(',') !== miss.slice().reverse().join(','), `sweep seed ${k}: F2 bank ${wh.meta.bank.join(',')} is clockwise or reversed`);
      wheelOrders.add(wh.meta.bank.join(','));
    }
    ok(whichSets.size >= 2 && oddSets.size >= 2 && wheelOrders.size >= 2, `sweep faces: too few distinct pages (F1 ${whichSets.size} / F3 ${oddSets.size} / F2 ${wheelOrders.size})`);
    console.log(`sweep faces: F1 ${whichSets.size} distinct marker sets, F3 ${oddSets.size} distinct intruder sets, F2 ${wheelOrders.size} distinct bank orders over 20 seeds`);
  }

  // 7. face poisons (each must FAIL for its OWN reason; the renders above are the controls)
  const rewrite = (layout, block, fn) => Object.assign({}, T[layout], { build(args, ctx) { const o = T[layout]._buildWith({ neutral, block }, args, ctx); o.bodyHtml = fn(o.bodyHtml, o.meta); return o; } });
  // P7 — an F1 card whose markers come from TWO pools (the first card's first marker re-stamped + re-pictured as a marker of another season)
  {
    const t = rewrite('which', en, (html, meta) => {
      const first = meta.cards[0][0];                                   // theme/noun of card 1 marker 1
      const other = KEYS.find((k) => k !== meta.answers[0]);
      const swap = effectivePools(neutral, en, false)[other].find((it) => !meta.cards.flat().includes(it.theme + '/' + it.noun));
      const [th, no] = first.split('/');
      const re = new RegExp(`data-lcs-item="${th.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}/${no}" data-lcs-season="${meta.answers[0]}" style="[^"]*"><img class="ws-icon" src="[^"]*"`);
      if (!re.test(html)) throw new Error('P7: marker not found');
      return html.replace(re, (m) => m.replace(/data-lcs-item="[^"]*"/, `data-lcs-item="${swap.theme}/${swap.noun}"`).replace(/data-lcs-season="[^"]*"/, `data-lcs-season="${other}"`).replace(/src="[^"]*"/, `src="${fileUri(swap.theme, swap.noun)}"`));
    });
    const r = await renderFace(page, t, { baseName: 'K-338-gate-poison-P7' });
    const found = collect(() => assertWhich('P7', r, neutral, en, cfg.which));
    if (judge('P7', r.verify.concat(found), /markers from two pools|node gate — .* stamped/)) killed++;
  }
  // P8 — an F3 row with two intruders (the row's second majority item re-stamped + re-pictured from the intruder's pool)
  {
    const t = rewrite('odd', en, (html, meta) => {
      const row0 = html.match(/<div class="ws-lane" data-lcs-odd-row="0"[\s\S]*?<\/div><\/div>/)[0];
      const items = [...row0.matchAll(/data-lcs-item="([^"]+)" data-lcs-season="([^"]+)"/g)];
      const maj = meta.majorities[0];
      const majItems = items.filter((m) => m[2] === maj);
      const victim = majItems[0];
      const intr = items.find((m) => m[2] !== maj);
      const pool = effectivePools(neutral, en, false)[intr[2]].filter((it) => !items.some((m) => m[1] === it.theme + '/' + it.noun));
      const swap = pool[0];
      const [th, no] = victim[1].split('/');
      const re = new RegExp(`data-lcs-item="${th.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}/${no}" data-lcs-season="${maj}">\\s*<img class="ws-icon" src="[^"]*"`);
      if (!re.test(row0)) throw new Error('P8: majority item not found');
      const row0b = row0.replace(re, (m) => m.replace(/data-lcs-item="[^"]*"/, `data-lcs-item="${swap.theme}/${swap.noun}"`).replace(/data-lcs-season="[^"]*"/, `data-lcs-season="${intr[2]}"`).replace(/src="[^"]*"/, `src="${fileUri(swap.theme, swap.noun)}"`));
      return html.replace(row0, row0b);
    });
    const r = await renderFace(page, t, { baseName: 'K-340-gate-poison-P8' });
    if (judge('P8', r.verify, /row 1: 2 intruders/)) killed++;
  }
  // P12 — the F2 bank in clockwise order (built past the shuffle: the bank tiles re-ordered to the cycle)
  {
    const t = rewrite('wheel', en, (html, meta) => {
      const tiles = [...html.matchAll(/<div class="ws-season-model" data-lcs-model="([^"]+)"[\s\S]*?<\/span><\/div>/g)];
      if (tiles.length !== 3) throw new Error('P12: 3 tiles expected');
      const byKey = Object.fromEntries(tiles.map((m) => [m[1], m[0]]));
      const cw = en.cycle.slice(1).map((k) => byKey[k]).join('');
      return html.replace(tiles.map((m) => m[0]).join(''), cw);
    });
    const r = await renderFace(page, t, { baseName: 'K-339-gate-poison-P12' });
    if (judge('P12', r.verify, /bank .* is the clockwise order/)) killed++;
  }
  // P14 — F4 tiles 200 wide with `septiembre` at 22 + circle 44 (the design's poison): the name runs into the circle / the circle leaves the tile
  {
    const b = clone(en); b.names = { winter: 'invierno', spring: 'primavera', summer: 'verano', autumn: 'otoño' }; b.alt = { autumn: null };
    const d2 = { ...cfg.months, tileW: 200, colGap: 22, circle: 44 };
    const t = Object.assign({}, faceType('months', neutral, b), { difficulty: { 1: d2, 2: d2, 3: d2 } });
    const r = await renderFace(page, t, { locale: 'es', baseName: 'G1-323-gate-poison-P14', strings: en.strings['G1-323'] });
    const found = collect(() => assertMonths('P14', r, b, d2, 'es'));
    const sep = r.m.tiles.find((x) => x.month === 8);
    if (judge('P14', r.verify.concat(found), /septiembre.*(runs into the answer spot|clears the circle by|the circle leaves the tile)|answer spot: outside its container/, `septiembre ${sep ? Math.round(sep.nameW) : '?'} px, clearance ${sep ? Math.round(sep.clearance) : '?'} at tile 200`)) killed++;
  }
  // PW — F1 two cards with the same answer at distinctSeasons (the second card's answer stamp + markers cloned from the first)
  {
    const t = rewrite('which', en, (html) => {
      const stages = [...html.matchAll(/<div class="ws-card-stage" data-lcs-which="(\d)"[\s\S]*?<\/div><\/div>/g)];
      if (stages.length < 2) throw new Error('PW: stages');
      const clone2 = stages[0][0].replace('data-lcs-which="1"', 'data-lcs-which="2"');
      return html.replace(stages[1][0], clone2);
    });
    const r = await renderFace(page, t, { baseName: 'K-338-gate-poison-PW' });
    if (judge('PW', r.verify, /repeat a season \(distinctSeasons\)|appears twice on the page/)) killed++;
  }
  // PC — F3 the intruder at the same index in every row (built past the spec: rows re-composed with odd 0 everywhere)
  {
    const d = cfg.odd;
    const rng = makeRng('pc');
    const pools = effectivePools(neutral, en, false);
    const lanes = en.cycle.map((maj, i) => {
      const other = en.cycle[(i + 1) % 4];
      const seq = [{ ...rng.pick(pools[other]), season: other }, ...rng.sample(pools[maj], 3).map((it) => ({ ...it, season: maj }))];
      return C3.oddRow({ index: i, items: seq.map((it) => ({ theme: it.theme, noun: it.noun, season: it.season, src: fileUri(it.theme, it.noun) })), px: d.iconPx, tile: d.tile, gap: 24, odd: 0, majority: maj });
    });
    const html = T.odd._faceRoot('odd', en.cycle, { rows: 4, items: 4, 'icon-px': d.iconPx }, lanes.join(''), 'display:grid;grid-template-rows:repeat(4, minmax(140px,1fr));gap:10px;flex:1 1 auto;min-height:0');
    const t = Object.assign({}, T.odd, { build() { return { bodyHtml: html, meta: {} }; } });
    const r = await renderFace(page, t, { baseName: 'K-340-gate-poison-PC' });
    if (judge('PC', r.verify, /the intruder sits at position 0 in every row/)) killed++;
  }
  // PT — F5 a marker picture printed inside a card's open area (the answer drawn for the child)
  {
    const t = rewrite('tree', en, (html) => html.replace('<span data-lcs-open="tree" style="display:block;width:260px;height:250px">', `<span data-lcs-open="tree" style="display:block;width:260px;height:250px;position:relative"><img src="${fileUri('winter', 'snowman')}" alt="" style="position:absolute;left:10px;top:10px;width:60px;height:60px">`));
    const r = await renderFace(page, t, { baseName: 'K-341-gate-poison-PT' });
    if (judge('PT', r.verify, /the open area is not empty/)) killed++;
  }
  // PM — F4 two months swapped (January after February: the calendar order broken — K-321's scrambled-month move must never appear here)
  {
    const t = rewrite('months', en, (html) => {
      const jan = html.match(/<div class="ws-month-tile" data-lcs-month="0"[\s\S]*?<\/span><\/div>/)[0];
      const feb = html.match(/<div class="ws-month-tile" data-lcs-month="1"[\s\S]*?<\/span><\/div>/)[0];
      return html.replace(jan + feb, feb + jan);
    });
    const r = await renderFace(page, t, { baseName: 'G1-323-gate-poison-PM' });
    if (judge('PM', r.verify, /not calendar order/)) killed++;
  }
  // PR — the pt autumn floor: one more autumn veto (persimmon is weak, so strict autumn drops 3 → 2) and F1 + F3 REFUSE for pt (throw, no filler);
  //      the base (needs 2) still builds — the control
  {
    const b = ptBlock(en);
    b.override.autumn.items = b.override.autumn.items.filter((it) => it.noun !== 'harvest');
    const thrown = {};
    for (const layout of ['which', 'odd']) { try { faceType(layout, neutral, b).build({ theme: null, difficulty: 2, locale: 'pt' }, { rng: makeRng('pr') }); thrown[layout] = ''; } catch (e) { thrown[layout] = e.message; } }
    let baseOk = false;
    try { typeWith(neutral, b).build({ theme: null, difficulty: 2, locale: 'pt' }, { rng: makeRng('pr') }); baseOk = true; } catch (e) { baseOk = false; }
    const a = judge('PR which', [thrown.which], /K-322 which pt: autumn pool has 2 unused markers < 3 \(refuse\)/);
    const c = judge('PR odd', [thrown.odd], /K-322 odd pt: only 3 rows can be filled \(< 4: refuse\)/);
    poisonLog.push(`  PR base: ${baseOk ? 'BUILDS (control — the base needs 2)' : 'REFUSED (wrong: the base needs only 2)'}`);
    if (a && c && baseOk) killed++;
  }
  return { killed, total: 9 };
}

async function main() {
  const mod = bankModule('seasons');
  const neutral = mod.neutral;
  const locales = Object.keys(mod).filter((k) => k !== 'neutral');
  // 1. bank (control)
  {
    const f = validateNeutral(neutral);
    ok(f.length === 0, `neutral: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`neutral: pools ${KEYS.map((k) => k + ' ' + neutral.pools[k].length + ' (' + neutral.pools[k].filter((i) => !i.weak).length + ' strict)').join(' · ')}`);
  }
  const refusalsAll = [];
  for (const loc of locales) {
    const { f, refusals } = validateBlock(neutral, mod[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    refusalsAll.push(...refusals);
    const strict = effectivePools(neutral, mod[loc], false);
    console.log(`bank ${loc}: cycle ${mod[loc].cycle.join('>')}, model ${mod[loc].model}, d2 pools ${KEYS.map((k) => k + ' ' + strict[k].length).join(' · ')}, names ${KEYS.map((k) => mod[loc].names[k]).join(' / ')}`);
  }
  if (refusalsAll.length) console.log('refusals recorded:\n  ' + refusalsAll.join('\n  '));
  const en = mod.en;

  // 2. renders through the real pipeline
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    for (const loc of locales) {
      for (const d of [1, 2, 3]) {
        const strings = mod[loc].strings['K-322'];
        const r = await renderWith(page, TYPE, { difficulty: d, locale: loc, baseName: `K-322-gate-d${d}-${loc}`, strings });
        const s = assertRender(`d${d} ${loc}`, r, d, { neutral, block: mod[loc] });
        pngs.push(r.png);
        console.log(`render d${d} ${loc}: verify ${r.verify.length} lints ${r.lints.length} icons ${s.minIcon} zones ${JSON.stringify(s.zones)} body ${s.body} names ${r.m.bins.map((b) => b.name ? b.name + ' ' + Math.round(b.nameW) : 'write').join(' / ')}`);
      }
    }
    // the 722 floor: the tallest stack (d1: 124 + 160 + 124 = 408) and d3 (358) under a 3-line title + 150-char instruction
    {
      const strings = { title: 'Die vier Jahreszeiten zuordnen: Bilder mit Linien zu den Schildern', instruction: ('Zeichne von dem Punkt an jedem Bild eine Linie zu dem Schild der Jahreszeit, zu der das Bild gehört. Jedes Bild bekommt genau eine Linie zu genau einem Schild.').slice(0, 150) };
      for (const d of [1, 3]) {
        const r = await renderWith(page, TYPE, { difficulty: d, locale: 'en', baseName: `K-322-gate-d${d}-en-longchrome`, strings });
        const s = assertRender(`d${d} long chrome`, r, d, { neutral, block: en });
        pngs.push(r.png);
        console.log(`render d${d} long chrome (title ${[...strings.title].length} / instruction ${[...strings.instruction].length} chars): verify ${r.verify.length} lints ${r.lints.length} body ${s.body} px zones ${JSON.stringify(s.zones)}`);
      }
    }

    // 3. seed sweep (build only)
    if (!QUICK) {
      const sets = new Set();
      let rows = 0;
      for (let k = 1; k <= 20; k++) {
        const rng = makeRng(instanceSeed({ typeId: 'K-322', theme: null, difficulty: 2, seedEpoch: k }));
        const b = TYPE.build({ theme: null, difficulty: 2, locale: 'en' }, { rng });
        const cycle = b.meta.cycle;
        const isRot = (seq) => [0, 1, 2, 3].some((s) => seq.every((v, i) => v === cycle[(i + s) % 4]));
        for (const w of ['top', 'bottom']) {
          const seq = b.meta.seasons[w];
          rows++;
          ok(!isRot(seq), `sweep seed ${k}: ${w} row ${seq.join(',')} is the season order`);
          ok(new Set(seq).size >= 2, `sweep seed ${k}: ${w} row single-season`);
          const al = seq.filter((s, i) => cycle[i] === s).length;
          ok(al <= TYPE.difficulty[2].maxAlignedPerRow, `sweep seed ${k}: ${w} row ${al} tiles over their own sign`);
        }
        sets.add([...b.meta.top, ...b.meta.bottom].sort().join(','));
      }
      ok(sets.size >= 2, `sweep: only ${sets.size} distinct item sets over 20 seeds`);
      console.log(`sweep: ${rows} rows clean, ${sets.size} distinct item sets over 20 seeds`);
    }

    // 4. poisons
    let killed = 0;
    const TOTAL = 16 + 9;   // base poisons + the Phase-2 face poisons
    // P1 — snowman in winter AND autumn (two right answers)
    {
      const n = clone(neutral); n.pools.autumn.push({ theme: 'winter', noun: 'snowman', opened: true });
      if (judge('P1', validateNeutral(n), /noun "snowman" sits in both winter and autumn/)) killed++;
    }
    // P2a — winter/mittens in the neutral winter pool (K-207's noun)
    {
      const n = clone(neutral); n.pools.winter.push({ theme: 'winter', noun: 'mittens', opened: true });
      if (judge('P2a', validateNeutral(n), /noun "mittens" in the neutral winter pool is one of K-207/)) killed++;
    }
    // P2b — clothing/coat in a neutral pool
    {
      const n = clone(neutral); n.pools.winter.push({ theme: 'clothing', noun: 'coat', opened: true });
      if (judge('P2b', validateNeutral(n), /noun "coat" in the neutral winter pool is one of K-207/)) killed++;
    }
    // P2c — winter/coat in the pt override WITHOUT reason FAILS; WITH reason PASSES
    {
      const b = ptBlock(en); delete b.override.winter.reason;
      const a = judge('P2c no-reason', validateBlock(neutral, b, 'pt').f, /override winter reuses K-207's noun "coat" without a reason/);
      const b2 = ptBlock(en);
      const f2 = validateBlock(neutral, b2, 'pt').f;
      const c = f2.length === 0;
      poisonLog.push(`  P2c with-reason: ${c ? 'PASSES (control)' : 'FAILS — ' + JSON.stringify(f2.slice(0, 3))}`);
      if (a && c) killed++;
    }
    // P3a — temperate-south with the north tuple
    {
      const b = ptBlock(en); b.monthSeason = NORTH.slice();
      if (judge('P3a', validateBlock(neutral, b, 'pt').f, /temperate-south requires the inverted tuple/)) killed++;
    }
    // P3b — temperate-south with no winter override
    {
      const b = ptBlock(en); b.override = {};
      if (judge('P3b', validateBlock(neutral, b, 'pt').f, /temperate-south requires a winter override/)) killed++;
    }
    // P3c — a pt page rendering winter/snowman (past the spec: the first winter tile re-stamped + re-pictured)
    {
      const b = ptBlock(en);
      const swapped = Object.assign({}, TYPE, { build(args, ctx) {
        const out = TYPE._buildWith({ neutral, block: b }, args, ctx);
        const first = out.bodyHtml.match(/data-lcs-item="(winter\/[^"]+)" data-lcs-season="winter"/);
        if (!first) throw new Error('P3c: no winter tile to swap');
        out.bodyHtml = out.bodyHtml.replace(first[0], 'data-lcs-item="winter/snowman" data-lcs-season="winter"')
          .replace(new RegExp('src="[^"]*' + first[1].split('/')[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '@3x\\.webp"'), 'src="' + fileUri('winter', 'snowman') + '"');
        return out;
      } });
      const r = await renderWith(page, swapped, { difficulty: 2, locale: 'pt', baseName: 'K-322-gate-poison-P3c', strings: b.strings['K-322'] });
      const found = collect(() => assertRender('P3c pt', r, 2, { neutral, block: b }));
      if (judge('P3c', found, /node gate — winter\/snowman stamped winter but the .*bank pools it as NOTHING/, `verify ${r.verify.length} lints ${r.lints.length} — the page itself is clean`)) killed++;
    }
    // P4 — an autumn pool of 1 after vetoes: the validator records the refusal AND the spec refuses to build
    {
      const b = clone(en);
      b.veto = neutral.pools.autumn.slice(1).map((it) => ({ theme: it.theme, noun: it.noun }));
      const a = judge('P4 bank', validateBlock(neutral, b, 'en').f, /pool autumn has 1 markers after veto\/override \(< 2: the base is REFUSED/);
      let refused = [];
      try { TYPE._buildWith({ neutral, block: b }, { difficulty: 2, locale: 'en' }, { rng: makeRng('p4') }); } catch (e) { refused = [e.message]; }
      const c = judge('P4 build', refused, /K-322 en autumn: only 1 eligible nouns, need 2/, 'the spec refused (throw), no filler');
      if (a && c) killed++;
    }
    // P5 — a BW theme dir
    {
      const n = clone(neutral); n.pools.autumn.push({ theme: 'animals bw', noun: 'owl', opened: true });
      if (judge('P5', validateNeutral(n), /animals bw\/owl: theme dir carries a localized B&W marker/)) killed++;
    }
    // P6 — the top row in cycle order (built past the spec's shuffle guard, straight from the components)
    {
      const rng = makeRng('p6');
      const d = TYPE.difficulty[2];
      const pools = effectivePools(neutral, en, false);
      const pick = KEYS.map((k) => rng.sample(pools[k], 2).map((it) => ({ ...it, season: k })));
      const top = en.cycle.map((k) => pick[KEYS.indexOf(k)][0]);              // winter, spring, summer, autumn in order
      const bottom = rng.shuffle(en.cycle.map((k) => pick[KEYS.indexOf(k)][1]));
      const tileOf = (it, dot) => markerTile({ theme: it.theme, noun: it.noun, src: fileUri(it.theme, it.noun), season: it.season, px: d.iconPx, tile: d.tile, dot });
      const html = seasonSortStage({ top: top.map((it) => tileOf(it, 'bottom')), bins: en.cycle.map((k) => seasonBin({ key: k, name: en.names[k] })), bottom: bottom.map((it) => tileOf(it, 'top')), tile: d.tile, rowGap: d.rowGap, cols: d.cols })
        .replace('data-lcs-seasons ', 'data-lcs-seasons data-lcs-per-bin="2" data-lcs-max-aligned="1" data-lcs-icon-px="88" ');
      const t = Object.assign({}, TYPE, { build() { return { bodyHtml: html, meta: {} }; } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-322-gate-poison-P6' });
      if (judge('P6', r.verify, /top row reads as the season order/)) killed++;
    }
    // P9 — 4 winter months
    {
      const b = clone(en); b.monthSeason[2] = 'winter';
      if (judge('P9', validateBlock(neutral, b, 'en').f, /monthSeason has 4 winter months, want 3/)) killed++;
    }
    // P10 — de title naming a single season
    {
      const b = clone(en);
      b.names = { winter: 'Winter', spring: 'Frühling', summer: 'Sommer', autumn: 'Herbst' }; b.alt = {};
      b.strings = { 'K-322': { title: 'Winter zuordnen', instruction: 'Zeichne eine Linie von jedem Bild zu seiner Jahreszeit.' } };
      b.strand = 'Sachunterricht: Natur und Leben, Jahreszeiten';
      if (judge('P10', validateBlock(neutral, b, 'de').f, /title "Winter zuordnen" names a single season \(Winter\)/)) killed++;
    }
    // P11 — tree/maple without alt
    {
      const n = clone(neutral); delete n.pools.autumn.find((it) => it.noun === 'maple').alt;
      if (judge('P11', validateNeutral(n), /tree\/maple: no vocab key and no alt x11/)) killed++;
    }
    // P13 — a `printemps` bin at 28 px (the render measures the pill against the 128 inner)
    {
      const b = clone(en); b.names = { winter: 'hiver', spring: 'printemps', summer: 'été', autumn: 'automne' }; b.alt = {};
      b.strings = { 'K-322': { title: 'Les saisons', instruction: 'Relie chaque image à sa saison.' } }; b.strand = 'Explorer le monde';
      const d2 = clone(TYPE.difficulty[2]); d2.namePx = 28;
      const t = Object.assign({}, typeWith(neutral, b), { difficulty: { ...TYPE.difficulty, 2: d2 } });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'fr', baseName: 'K-322-gate-poison-P13', strings: b.strings['K-322'] });
      const found = collect(() => assertRender('P13', r, 2, {}));
      const w = r.m.bins.find((x) => x.key === 'spring');
      if (judge('P13', found.concat(r.verify), /bin name "printemps" [\d.]+ px > inner 128|"printemps" \(\d+ px\) wider than the bin/, `printemps measured ${w ? Math.round(w.nameW) : '?'} px at 28`)) killed++;
      // control: the same pill at 22 fits
      const w22 = (await renderWith(page, typeWith(neutral, b), { difficulty: 2, locale: 'fr', baseName: 'K-322-gate-poison-P13-control', strings: b.strings['K-322'] })).m.bins.find((x) => x.key === 'spring');
      ok(w22 && w22.nameW <= BIN_INNER, `P13 control: printemps at 22 = ${w22 && w22.nameW} px > 128`);
      poisonLog.push(`  P13 control: printemps at 22 = ${w22 ? Math.round(w22.nameW) : '?'} px (fits 128)`);
    }
    // P15 — the old 760 stack under 3-line chrome (footer lint)
    {
      const t = Object.assign({}, TYPE, { build(args, ctx) { const o = TYPE._buildWith({ neutral, block: en }, args, ctx); o.bodyHtml = '<div style="height:760px;flex:0 0 auto;display:flex;flex-direction:column">' + o.bodyHtml + '</div>'; return o; } });
      const strings = { title: 'Die vier Jahreszeiten zuordnen: Bilder mit Linien zu den Schildern', instruction: ('Zeichne von dem Punkt an jedem Bild eine Linie zu dem Schild der Jahreszeit, zu der das Bild gehört. Jedes Bild bekommt genau eine Linie zu genau einem Schild.').slice(0, 150) };
      const r = await renderWith(page, t, { difficulty: 2, locale: 'en', baseName: 'K-322-gate-poison-P15', strings });
      if (judge('P15', r.lints, /footer overlap/)) killed++;
    }
    // P16 — an instruction with a calendar stem
    {
      const b = clone(en); b.strings = { 'K-322': { title: en.strings['K-322'].title, instruction: 'Schau auf den Kalender und male die Jahreszeit an.' } };
      if (judge('P16', validateBlock(neutral, b, 'en').f, /a calendar stem \(K-321 owns it\)/)) killed++;
    }
    // 5-7. the faces
    {
      const f = await runFaces({ page, neutral, en, pngs });
      killed += f.killed;
    }
    console.log('poison:\n' + poisonLog.join('\n'));
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && killed === TOTAL;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/${TOTAL} poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateNeutral, validateBlock };
