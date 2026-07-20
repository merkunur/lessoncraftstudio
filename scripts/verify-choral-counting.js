#!/usr/bin/env node
/* =====================================================================
   verify-choral-counting.js — MEASURED build-gate for Choral Counting
   (mini tools/choral-counting.js). Fix the data, never the gate.

   Invariant families (all measured):
     SEQUENCE — terms are DERIVED (start + k·step), never stored; planLen
       clips to 0..1000 exactly (forward stops at ≤1000, backwards
       INCLUDES and stops at 0 — never negative).
     GRID — cellRC/kFromRC are a true bijection over every (cfg) in both
       recording directions (row-wise + column-wise); cols whitelist
       {3,4,5,6,8,10} (never 7/9); rows ≤ 12; rowsForCustom respects the
       comfort-8 / bound / cap-12 ladder.
     PRESETS — all 11 grade presets + every locale's showcase rows: cols
       whitelisted, rows ≤ 12, EVERY planned term within 0..1000,
       backwards presets land exactly on 0 as the final term; the two
       free presets are free-legal per isFreeCfg.
     FREE FENCE — isFreeCfg admits exactly {step 1|10, start 0|1|10,
       cols 10, row-wise forward} and rejects each violated dimension.
     SPEECH — speakText is the BARE numeral for 0..1000 (no separators,
       digits only); speakRate = 0.85 only for ≥100 in the compound
       locales (de nl fi sv da no), else 0.92.
     JITTER — deterministic, bounded ±2°, stable (same k → same angle).
     STRINGS — completeness ×11, placeholder parity vs en, verdict +
       score/timer bans, no "Common Core" anywhere.
   Usage: node scripts/verify-choral-counting.js [--locales=en]
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.includes(l)) : ALL;

const REPO = path.join(__dirname, '..');
const errors = [];
const E = (m) => errors.push(m);

const VERDICT = {
  en: /\b(correct|incorrect|wrong|oops)\b/i,
  de: /\b(richtig|falsch)\b/i,
  fr: /\b(correct|correcte|faux|fausse)\b/i,
  it: /\b(giusto|sbagliato|corretto)\b/i,
  es: /\b(correcto|incorrecto|equivocad)\b/i,
  pt: /\b(correto|errado|incorreto)\b/i,
  nl: /\b(goed antwoord|fout|onjuist)\b/i,
  sv: /\b(rätt svar|fel)\b/i,
  da: /\b(rigtigt svar|forkert)\b/i,
  no: /\b(riktig svar|feil)\b/i,
  fi: /\b(oikein|väärin|väärä)\b/i
};
const SCORE_RE = /\b(score|timer|streak|points|punkte|punteggio|puntos|pontos|punten|poäng|poeng)\b/i;

/* ---- load the tool in a DOM-free sandbox ---- */
const sandbox = {
  window: {},
  document: {
    createElement: () => ({ style: {}, setProperty: () => {} }),
    getElementById: () => null,
    head: { appendChild: () => {} },
    addEventListener: () => {},
    body: { classList: { add: () => {} } }
  },
  navigator: {},
  location: { search: '', hostname: 'gate' },
  localStorage: { getItem: () => null, setItem: () => {} },
  URLSearchParams
};
sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(REPO, 'mini tools', 'choral-counting.js'), 'utf8'), sandbox);
const T = sandbox.ChoralCounting;
if (!T) { console.error('FATAL: ChoralCounting did not evaluate'); process.exit(1); }

/* =================== SEQUENCE + planLen bounds ===================== */

/* derived-never-stored: no preset or showcase row carries a term list */
for (const p of T.PRESETS) {
  if ('terms' in p || 'sequence' in p || 'answer' in p) E(`preset ${p.id}: stores a sequence/answer — terms must be DERIVED`);
}

function checkPlanBounds(tag, cfg) {
  const len = T.planLen(cfg);
  const cells = cfg.rows * cfg.cols;
  if (len > cells) E(`${tag}: planLen ${len} exceeds cells ${cells}`);
  if (len <= 0) E(`${tag}: empty plan`);
  for (let k = 0; k < len; k++) {
    const n = T.term(cfg, k);
    if (n < 0 || n > T.MAX_N) E(`${tag}: term k=${k} = ${n} outside 0..${T.MAX_N}`);
  }
  /* the term AFTER the plan must be out of bounds OR out of cells */
  if (len < cells) {
    const n = T.term(cfg, len);
    if (n >= 0 && n <= T.MAX_N) E(`${tag}: planLen ${len} clipped early — term ${n} was still legal`);
  }
  /* backwards: never negative; stops at the floor — and lands EXACTLY
     on 0 whenever the start is a multiple of the step (all presets) */
  if (cfg.step < 0 && len < cells) {
    const last = T.term(cfg, len - 1);
    if (last < 0) E(`${tag}: backwards plan went negative (${last})`);
    if (last - (-cfg.step) >= 0) E(`${tag}: backwards plan stopped early at ${last}`);
    if (cfg.start % (-cfg.step) === 0 && last !== 0) E(`${tag}: multiple-start backwards plan ends at ${last}, not 0`);
  }
  return len;
}

/* exhaustive forward/backward bound sweep */
for (const step of [1, 2, 5, 10, 25, 100, -1, -5, -10, -100]) {
  for (const start of [0, 1, 7, 10, 85, 460, 995, 1000]) {
    if (step < 0 && start === 0) continue;   /* engine lifts 0-starts for backwards at the UI layer */
    for (const cols of T.COLS_ALLOWED) {
      const rows = T.rowsForCustom(start, step, cols);
      if (rows < 1 || rows > T.MAX_ROWS) E(`rowsForCustom(${start},${step},${cols}) = ${rows} outside 1..${T.MAX_ROWS}`);
      checkPlanBounds(`custom(${start},${step},${cols})`, { start, step, cols, rows, down: false });
    }
  }
}

/* ======================= GRID bijection ============================ */

for (const down of [false, true]) {
  for (const cols of T.COLS_ALLOWED) {
    for (const rows of [1, 3, 8, 12]) {
      const cfg = { start: 0, step: 1, cols, rows, down };
      const seen = new Set();
      for (let k = 0; k < rows * cols; k++) {
        const rc = T.cellRC(cfg, k);
        if (rc.row < 0 || rc.row >= rows || rc.col < 0 || rc.col >= cols) {
          E(`cellRC ${down ? 'down' : 'row'} (${cols}x${rows}) k=${k}: out of grid (${rc.row},${rc.col})`);
        }
        const key = rc.row + ':' + rc.col;
        if (seen.has(key)) E(`cellRC ${down ? 'down' : 'row'} (${cols}x${rows}): collision at ${key}`);
        seen.add(key);
        if (T.kFromRC(cfg, rc.row, rc.col) !== k) {
          E(`bijection broken ${down ? 'down' : 'row'} (${cols}x${rows}) k=${k}`);
        }
      }
      if (seen.size !== rows * cols) E(`cellRC ${down ? 'down' : 'row'} (${cols}x${rows}): not exhaustive`);
    }
  }
}

/* row-wise: consecutive k are same-row neighbors until the row wraps;
   column-wise: consecutive k are same-column neighbors until it wraps */
{
  const cfgR = { start: 0, step: 1, cols: 5, rows: 4, down: false };
  const a = T.cellRC(cfgR, 0), b = T.cellRC(cfgR, 1);
  if (!(a.row === b.row && b.col === a.col + 1)) E('row-wise recording does not advance along the row');
  const cfgD = { start: 0, step: 1, cols: 5, rows: 4, down: true };
  const c = T.cellRC(cfgD, 0), d = T.cellRC(cfgD, 1);
  if (!(c.col === d.col && d.row === c.row + 1)) E('column-wise recording does not advance down the column');
}

if (T.COLS_ALLOWED.includes(7) || T.COLS_ALLOWED.includes(9)) E('cols whitelist admits 7 or 9 (noise, not pattern)');
if (T.MAX_ROWS > 12) E(`MAX_ROWS ${T.MAX_ROWS} > 12 (chart must never scroll)`);

/* ==================== PRESETS + SHOWCASE =========================== */

const IDS = new Set();
for (const p of T.PRESETS) {
  if (IDS.has(p.id)) E(`duplicate preset id ${p.id}`);
  IDS.add(p.id);
  if (!T.COLS_ALLOWED.includes(p.cols)) E(`preset ${p.id}: cols ${p.cols} not whitelisted`);
  if (p.rows < 1 || p.rows > T.MAX_ROWS) E(`preset ${p.id}: rows ${p.rows} outside 1..${T.MAX_ROWS}`);
  const len = checkPlanBounds(`preset ${p.id}`, { start: p.start, step: p.step, cols: p.cols, rows: p.rows, down: false });
  if (p.step < 0) {
    const last = T.term({ start: p.start, step: p.step }, len - 1);
    if (last !== 0) E(`preset ${p.id}: backwards preset ends at ${last}, must land exactly on 0`);
  }
  /* free presets are a CURATED grant (the isFreeCfg fence governs the
     custom pickers); the catalog rule still binds: by 1s/10s, forward */
  if (p.free && !((p.step === 1 || p.step === 10))) {
    E(`preset ${p.id}: marked free but not a by-1s/by-10s forward count`);
  }
  if (!T.strings[p.labelKey]) E(`preset ${p.id}: labelKey ${p.labelKey} missing from strings`);
}
const freeCount = T.PRESETS.filter((p) => p.free).length;
if (freeCount !== 2) E(`expected exactly 2 free presets, found ${freeCount}`);

/* pedagogy anchors — the Franke counts the ensemble locked */
const byId = {};
T.PRESETS.forEach((p) => { byId[p.id] = p; });
if (!byId.g1c || byId.g1c.start !== 7 || byId.g1c.step !== 10) E('g1c must be the off-decade classic 7 by tens');
if (!byId.g2c || byId.g2c.start !== 1000 || byId.g2c.step !== -100) E('g2c must fall from 1000 by 100s');
if (!byId.k4 || byId.k4.step !== -1 || byId.k4.start !== 20) E('k4 must be the countdown from 20');

/* showcase rows per locale (incl. the shared default) */
const scLocales = Object.keys(T.SHOWCASE);
if (!scLocales.includes('default')) E('SHOWCASE lacks the default set');
for (const L of scLocales) {
  const rows = T.SHOWCASE[L];
  if (!Array.isArray(rows) || rows.length !== 3) { E(`SHOWCASE.${L}: expected exactly 3 rows`); continue; }
  const keys = rows.map((r) => r.key).join(',');
  if (keys !== 'showTeens,showBoundary,showTens') E(`SHOWCASE.${L}: keys ${keys} not the shared schema`);
  rows.forEach((r) => {
    if (!T.COLS_ALLOWED.includes(r.cols)) E(`SHOWCASE.${L}.${r.key}: cols ${r.cols} not whitelisted`);
    checkPlanBounds(`SHOWCASE.${L}.${r.key}`, { start: r.start, step: r.step, cols: r.cols, rows: r.rows, down: false });
    if (!T.strings[r.key]) E(`SHOWCASE.${L}.${r.key}: label key missing from strings`);
  });
}
/* the locale-tuned boundary windows the localization ensemble locked */
if (T.SHOWCASE.de[1].start !== 18) E('SHOWCASE.de boundary must open the 18.. inversion window');
if (T.SHOWCASE.da[1].start !== 40) E('SHOWCASE.da boundary must cover the vigesimal 40..65');
if (T.SHOWCASE.fr[1].start !== 55) E('SHOWCASE.fr boundary must cover 55..100');
if (T.SHOWCASE.no) E('no must NOT have a locale-specific showcase (not an inversion locale — 1951 reform)');

/* ======================== FREE FENCE =============================== */

const freeOK = [
  { start: 0, step: 1, cols: 10, down: false },
  { start: 1, step: 1, cols: 10, down: false },
  { start: 10, step: 10, cols: 10, down: false },
  { start: 0, step: 10, cols: 10, down: false }
];
freeOK.forEach((c) => { if (!T.isFreeCfg(c)) E(`isFreeCfg rejects free-legal ${JSON.stringify(c)}`); });
const freeNO = [
  { start: 0, step: 5, cols: 10, down: false },    /* skip */
  { start: 4, step: 1, cols: 10, down: false },    /* start */
  { start: 0, step: 1, cols: 5, down: false },     /* cols */
  { start: 0, step: 1, cols: 10, down: true },     /* colwise */
  { start: 20, step: -1, cols: 10, down: false }   /* backwards */
];
freeNO.forEach((c) => { if (T.isFreeCfg(c)) E(`isFreeCfg admits premium cfg ${JSON.stringify(c)}`); });

/* ========================= SPEECH ================================== */

for (let n = 0; n <= T.MAX_N; n++) {
  const s = T.speakText(n);
  if (!/^\d+$/.test(s)) { E(`speakText(${n}) = "${s}" is not a bare numeral`); break; }
  if (s !== String(n)) { E(`speakText(${n}) altered the numeral`); break; }
}
const SLOW = ['de', 'nl', 'fi', 'sv', 'da', 'no'];
for (const L of ALL) {
  const slow = SLOW.includes(L);
  if (T.speakRate(99, L) !== 0.92) E(`speakRate(99, ${L}) must be 0.92`);
  if (T.speakRate(100, L) !== (slow ? 0.85 : 0.92)) E(`speakRate(100, ${L}) wrong for ${slow ? 'compound' : 'plain'} locale`);
  if (T.speakRate(888, L) !== (slow ? 0.85 : 0.92)) E(`speakRate(888, ${L}) wrong`);
}

/* ========================= JITTER ================================== */

for (let k = 0; k < 200; k++) {
  const j = T.jitterDeg(k);
  if (Math.abs(j) > 2) E(`jitterDeg(${k}) = ${j} exceeds ±2°`);
  if (T.jitterDeg(k) !== j) E(`jitterDeg(${k}) not stable`);
}

/* ========================= STRINGS ================================= */

const KEYS = Object.keys(T.strings);
for (const key of KEYS) {
  const map = T.strings[key];
  const enPh = (map.en.match(/\{(\w+)\}/g) || []).sort().join(',');
  for (const L of LOCALES) {
    const v = map[L];
    if (typeof v !== 'string' || !v.trim()) { E(`strings.${key}.${L}: missing`); continue; }
    const ph = (v.match(/\{(\w+)\}/g) || []).sort().join(',');
    if (ph !== enPh) E(`strings.${key}.${L}: placeholders "${ph}" ≠ en "${enPh}"`);
    if (VERDICT[L] && VERDICT[L].test(v)) E(`strings.${key}.${L}: verdict vocabulary ("${v}")`);
    /* "pontos de partida" (pt: starting points) is place vocabulary, not score */
    if (SCORE_RE.test(v.replace(/pontos de partida/gi, ''))) E(`strings.${key}.${L}: score/timer vocabulary ("${v}")`);
    if (/common core/i.test(v)) E(`strings.${key}.${L}: framework name leak`);
  }
}
/* number WORDS must never be displayed (bokmål syv/sju stays the
   voice's business) — the tool has no number-word table at all */
if (T.NUMBER_WORDS) E('tool carries a NUMBER_WORDS display table — numerals only');

/* ---- report ---- */
if (errors.length) {
  console.error(`FAIL — ${errors.length} error(s):`);
  errors.slice(0, 40).forEach((e) => console.error('  ✗ ' + e));
  if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`);
  process.exit(1);
}
console.log(`PASS — choral-counting verified (locales: ${LOCALES.join(',')})`);
