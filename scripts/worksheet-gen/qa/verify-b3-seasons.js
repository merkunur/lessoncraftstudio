#!/usr/bin/env node
/**
 * verify-b3-seasons.js — the K-322 `seasons` gate (design file §5; brief
 * deliverable 4). BASE face only; the face poisons P7 / P8 / P12 / P14 land
 * with Phase 2.
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
const COLLECTIVE = { en: ['seasons'], de: ['jahreszeiten'], es: ['estaciones'], pt: ['estações'], fr: ['saisons'], it: ['stagioni'], nl: ['seizoenen'], sv: ['årstider'], da: ['årstider'], no: ['årstider'], fi: ['vuodenajat', 'vuodenaikoja'] };
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
  // rule 8
  const s = block.strings && block.strings['K-322'];
  if (!s) push('strings K-322 missing');
  else {
    const title = s.title || '';
    if (!title || [...title].length > 70) push(`title "${title}" > 70 chars or empty`);
    if (WORKSHEET_WORD.test(title)) push('title carries the worksheet word');
    const coll = COLLECTIVE[loc] || [];
    if (coll.length && !coll.some((w) => nfd(title).includes(nfd(w)))) push(`title "${title}" lacks the collective season word (${coll.join('/')})`);
    for (const k of KEYS) {
      const n = names[k];
      if (n && new RegExp('(?<!\\p{L})' + nfd(n).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u').test(nfd(title))) push(`title "${title}" names a single season (${n})`);
    }
    const ins = s.instruction || '';
    if (!ins || [...ins].length > 150) push('instruction > 150 chars or empty');
    if (/[{}]/.test(ins)) push('instruction carries a slot');
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
const PT_OVERRIDE = {
  winter: { items: [
    { theme: 'winter', noun: 'coat', opened: true }, { theme: 'winter', noun: 'sweater', opened: true },
    { theme: 'winter', noun: 'boots', opened: true }, { theme: 'winter', noun: 'fireplace', opened: true },
    { theme: 'clothing', noun: 'scarf', opened: true }, { theme: 'clothing', noun: 'beanie', opened: true },
  ], reason: 'no snow in BR: the K-207 nouns coat/sweater/boots/scarf are a recorded exception' },
};
function ptBlock(en) {
  const b = clone(en);
  b.names = { winter: 'inverno', spring: 'primavera', summer: 'verão', autumn: 'outono' };
  b.alt = { autumn: null };
  b.model = 'temperate-south';
  b.monthSeason = SOUTH.slice();
  b.veto = [];
  b.override = clone(PT_OVERRIDE);
  b.strings = { 'K-322': { title: 'As quatro estações do ano', instruction: 'Ligue o ponto de cada figura à caixa da estação a que ela pertence.' } };
  b.strand = 'BNCC EI: Espaços, tempos, quantidades, relações e transformações';
  return b;
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
    const TOTAL = 16;
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
