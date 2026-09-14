#!/usr/bin/env node
/**
 * verify-b3-ordinal-numbers.js — the K-320 `ordinal-numbers` gate (design §5).
 *
 *   node qa/verify-b3-ordinal-numbers.js [--quick] [--locales=en] [--themes=a,b] [--seeds=N]
 *
 * Own ground truth: the gate reads data/b3/ordinals.js DIRECTLY (never the
 * spec's helpers), re-implements the validator's ordinals rules (§5 rules 1-4,
 * 6, 8) for ANY locale block, and renders through the REAL pipeline
 * (render/render-instance.js, file:// fonts). Every page stamp is diffed against
 * the gate's own derivation — "diff, not trust".
 *
 * Sections
 *   A  bank data (per locale block present): notation keys 1..10, distinct,
 *      carry String(k), no U+00B0 / ème / ième; per-locale suffix law (en st/nd/
 *      rd/th, sv :a/:a/:e.., nl e, dot locales ., es/pt/it U+00BA + dot-consistent,
 *      fr 1er/Ne); notationF full in es/pt/it (U+00AA), {1:'1re'} fr, null else;
 *      words 1..10 letters only, distinct, lowercase unless capital; f policy;
 *      fr words[2] = deuxième (never second); genderPolicy law; where.label;
 *      strings (title <= 70, no worksheet-word, unique; instruction <= 150, no
 *      {noun}, no relation word); calendar.js cross-check (en must agree).
 *      The spec's i18n.en must equal strings['K-320'] (one source).
 *   B  pools: every §1 fan theme >= 10 entries (minNouns) AND >= 8 (the widest
 *      strip) in every locale asked; every picture of the en pool exists on disk;
 *      no BW marker on a fan theme.
 *   C  renders: fan themes × d2, the exemplar × d1-d3, the worst LEGAL chrome
 *      (3-line title + 150-char instruction, body 733) × d1-d3, the WORST chrome (a
 *      3-line instruction, body 710) × d1-d3, and a seed sweep on the exemplar at d1/d2/d3. Each render:
 *      lints clean · verify() empty · 3 lanes · every picture === cfg.pic and
 *      >= 56 (K floor) · every chip >= 44 high (=== pillH) · strip <= 647 and
 *      inside its lane · chip row inside its lane · every lane inside the body ·
 *      every data-lcs-notation === ORDINALS[loc].notation[k] (Node-side) ·
 *      non-vacuity (0 chips = FAIL). Sweep: the union of asked ordinals covers
 *      1..kMax at every level; no two seeds render a byte-identical page (chips + noun
 *      order; a chip SET may recur — the design's rule is coverage).
 *   D  poisons (each must FAIL; the correct EN bank + page is the control):
 *      P1 a strip cat,dog,cat · P2 k:8 on a 7-tile strip · P3a data-lcs-start
 *      removed · P3b no flag · P4 an F4 (start:mixed) page with every flag left ·
 *      P6 a chip inside a tile · P7 sv 1:e · P8 es 3° (U+00B0) · P9a theme
 *      "zoo animals bw" refused at build · P9b a BW-marked theme stamp without
 *      data-lcs-bw · P10 two chips asking 3 on one page · P13 es mixing 1.º and
 *      2º · P14 fr words[2].m = second · P15a built left, stamped right · P15b
 *      built right, stamped left · P16 the old 760 stack under 3-line chrome
 *      (footer lint) · P18 a hand-edited notation (3. on an en page) · P19
 *      pictures squashed below the floor · P20 blank page (non-vacuity) · P21
 *      icon != action.
 *   E  the five Phase-2 faces (2026-09-14; record _work/K-320-faces.md), each
 *      loaded from disk by its allocated id (G1-315 write · G1-316 words · G1-317
 *      where · K-336 start:mixed · G1-318 race) and rendered d2 en through the real
 *      pipeline: exemplar + themes (F3 over every fan theme = the lookalike ban; F5
 *      over every racer), LONG + WORST chrome, a seed sweep; per render: lints
 *      clean · verify() empty · face stamp · G1 floors (pictures 44, clones 56,
 *      cells/chips/boxes 44 high) · strips/rows/word rows/query rows inside their
 *      lanes and the body · every numeral cell under ITS tile · Node-side against
 *      the bank: F1 given/blank literals, F2 chip words + wordPx, F3 answers +
 *      lookalike ban + clone src, F5 rank answers + separation + facing/mirror +
 *      noRace; i18n.en === strings.F<n> (one source); gradeBand; the d2 knob.
 *      Sweeps: F1 blank positions cover 1..7, F2 words 1..8, F3 places 1..8, F4
 *      asked 1..7 + the right-flag count varies, F5 > 6 distinct runners.
 *      The widest legal F2 row (5 widest words at the bank's wordPx) <= 647 per
 *      locale block present.
 *      Face poisons (all counted): P5 F5 30 px apart · P11 F1 position 1 blank ·
 *      P11b blank:7 refused · P11c given literal "3." · P11d a blank prints ·
 *      P12 F3 query noun absent · P12b lookalikes in one strip · P12c clone src ·
 *      P17 fi F2 at 22 px (660 > 647; 20 px is the control) · P22 chips in position
 *      order · P23 chip inside a tile · P24 chip text != bank · P25 rank answers
 *      swapped · P26 fruits refused · P27 left-facing art unmirrored · P28 runner
 *      drawn off its stamp · P29 K-336 all flags left · P30 G1 pictures at 40 ·
 *      P31-33 bank tables (lookalike noun unknown / fruits as racer / facing "up").
 * Exit 1 on any real failure OR any silent poison.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { entriesFor, fileUri } = require('../lib/b2-common.js');
const { CALENDAR, ordinal: calOrdinal } = require('../data/b2/calendar.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'dev', 'k320-gate');
const BANK_FILE = path.join(ROOT, 'data', 'b3', 'ordinals.js');

const FAN_THEMES = ['animals', 'zoo animals', 'farm animals', 'pets', 'vehicles', 'toys', 'dinosaurs', 'birds 2', 'forest creatures', 'fruits'];
const EXEMPLAR = 'animals';
const ALL_LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MIN_NOUNS = 10;
const MAX_N = 8;
const LANE_INNER = 647;
const PIC_FLOOR = 56;    // K band floor (_tokens.js density.K.minElement)
const CHIP_FLOOR = 44;
const BW_MARK = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;
const DOT_LOCALES = new Set(['de', 'da', 'no', 'fi']);
const ORDO_LOCALES = new Set(['es', 'pt', 'it']);
const EN_SUFFIX = { 1: 'st', 2: 'nd', 3: 'rd', 4: 'th', 5: 'th', 6: 'th', 7: 'th', 8: 'th', 9: 'th', 10: 'th' };
// relation words the instruction may not carry (validator rule 6); per locale, whole-word
const RELATION = {
  en: ['on', 'under', 'left', 'right', 'between', 'inside'],
  de: ['auf', 'unter', 'links', 'rechts', 'zwischen', 'in'],
  es: ['sobre', 'debajo', 'izquierda', 'derecha', 'entre', 'dentro'],
  pt: ['sobre', 'embaixo', 'esquerda', 'direita', 'entre', 'dentro'],
  fr: ['sur', 'sous', 'gauche', 'droite', 'entre', 'dans'],
  it: ['sopra', 'sotto', 'sinistra', 'destra', 'tra', 'dentro'],
  nl: ['op', 'onder', 'links', 'rechts', 'tussen', 'in'],
  sv: ['på', 'under', 'vänster', 'höger', 'mellan', 'inuti'],
  da: ['på', 'under', 'venstre', 'højre', 'mellem', 'inden'],
  no: ['på', 'under', 'venstre', 'høyre', 'mellom', 'inni'],
  fi: ['päällä', 'alla', 'vasemmalla', 'oikealla', 'välissä', 'sisällä'],
};
const WORKSHEET_WORD = /\b(worksheet|arbeitsblatt|hoja de trabajo|folha de exerc|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtäväpaperi)/i;
// worst legal chrome: 70-char title (3 lines at ~24 chars/line) + 150-char instruction (3 lines)
const LONG_CHROME = {
  title: 'Ordinal Numbers for Beginners: Find the Place in the Line and Mark It',
  instruction: 'Start at the flag and count along the line. Read the number on every chip, count to that place, and make the mark the little picture on the chip shows.',
};
// MEASURED (2026-09-14, real pipeline, letter): a 150-char instruction wraps to TWO lines (the
// instruction column is 631 px, ~76 chars/line) -> body 733 under a 3-line title; a legal
// instruction reaches THREE lines only through long-word wrapping (this 156-char German string
// does) -> body 710. The README's 722 sits between the two; the stack is gated at 710.
const WORST_CHROME = {
  title: 'Ordnungszahlen für Anfänger: Finde das Bild an seiner Stelle in der Reihe',
  instruction: 'Beginne bei der Fahne und zähle die Bilder der Reihe nach. Lies die Zahl auf jedem Plättchen, zähle bis zu diesem Platz und mache dort das gezeigte Zeichen.',
};
const WORST_BODY = 710;

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));
const QUICK = flags.has('--quick');

function loadBank() {
  delete require.cache[require.resolve(BANK_FILE)];
  const mod = require(BANK_FILE);
  return mod[Object.keys(mod)[0]];
}
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function picPath(theme, noun) { return decodeURIComponent(new URL(fileUri(theme, noun)).pathname.replace(/^\/([A-Za-z]:)/, '$1')); }

/* ---------------- A. bank data (pure node; any locale block) ---------------- */
function checkBank(cfg, loc, spec) {
  const F = [];
  const L = String(loc);
  const N = cfg.notation || {};
  const keys = Object.keys(N).map(Number).sort((a, b) => a - b);
  if (keys.join(',') !== '1,2,3,4,5,6,7,8,9,10') F.push(`A ${L}: notation keys are ${keys.join(',')}, want 1..10`);
  const vals = keys.map((k) => N[k]);
  if (new Set(vals).size !== vals.length) F.push(`A ${L}: notation literals repeat`);
  for (const k of keys) {
    const v = String(N[k]);
    if (!v.includes(String(k))) F.push(`A ${L}: notation[${k}] "${v}" does not carry ${k}`);
    if (v.includes('°')) F.push(`A ${L}: notation[${k}] "${v}" uses the DEGREE sign U+00B0 (never; º is U+00BA)`);
    if (/i?ème/.test(v)) F.push(`A ${L}: notation[${k}] "${v}" uses ème/ième`);
    if (L === 'en' && v !== k + EN_SUFFIX[k]) F.push(`A en: notation[${k}] "${v}" != ${k + EN_SUFFIX[k]}`);
    if (L === 'sv' && v !== k + (k <= 2 ? ':a' : ':e')) F.push(`A sv: notation[${k}] "${v}" != ${k}${k <= 2 ? ':a' : ':e'} (1:a 2:a 3:e ... 10:e)`);
    if (L === 'nl' && !/e$/.test(v)) F.push(`A nl: notation[${k}] "${v}" does not end in e`);
    if (DOT_LOCALES.has(L) && v !== k + '.') F.push(`A ${L}: notation[${k}] "${v}" != ${k}.`);
    if (ORDO_LOCALES.has(L) && !v.includes('º')) F.push(`A ${L}: notation[${k}] "${v}" lacks º U+00BA`);
    if (L === 'fr' && v !== (k === 1 ? '1er' : k + 'e')) F.push(`A fr: notation[${k}] "${v}" != ${k === 1 ? '1er' : k + 'e'}`);
  }
  if (ORDO_LOCALES.has(L) && keys.length) {
    const dotted = keys.filter((k) => /\.º$/.test(String(N[k]))).length;
    if (dotted !== 0 && dotted !== keys.length) F.push(`A ${L}: the dot is ruled ONCE — ${dotted}/${keys.length} literals carry it (mixing 1.º and 2º)`);
  }
  // notationF
  const NF = cfg.notationF;
  if (ORDO_LOCALES.has(L)) {
    const fk = NF ? Object.keys(NF).map(Number).sort((a, b) => a - b) : [];
    if (fk.join(',') !== '1,2,3,4,5,6,7,8,9,10') F.push(`A ${L}: notationF must be the full 1..10 table`);
    for (const k of fk) if (!String(NF[k]).includes('ª')) F.push(`A ${L}: notationF[${k}] "${NF[k]}" lacks ª U+00AA`);
  } else if (L === 'fr') {
    if (!NF || Object.keys(NF).join(',') !== '1' || NF[1] !== '1re') F.push('A fr: notationF must be exactly { 1: "1re" }');
  } else if (NF !== null && NF !== undefined) F.push(`A ${L}: notationF must be null (no gendered notation)`);
  if (cfg.alt !== undefined && (typeof cfg.alt !== 'object' || cfg.alt === null)) F.push(`A ${L}: alt must be an object`);
  // words
  const W = Array.isArray(cfg.words) ? cfg.words : [];
  if (W.map((w) => w.k).join(',') !== '1,2,3,4,5,6,7,8,9,10') F.push(`A ${L}: words k are ${W.map((w) => w.k).join(',')}, want 1..10`);
  const ms = W.map((w) => w.m);
  if (new Set(ms).size !== ms.length) F.push(`A ${L}: ordinal words repeat`);
  W.forEach((w) => {
    if (!/^\p{L}+$/u.test(String(w.m))) F.push(`A ${L}: word "${w.m}" is not letters only`);
    if (!cfg.capital && String(w.m) !== String(w.m).toLocaleLowerCase(L)) F.push(`A ${L}: word "${w.m}" is not lowercase (capital:false)`);
    if (ORDO_LOCALES.has(L) && !(w.f && /^\p{L}+$/u.test(w.f))) F.push(`A ${L}: word ${w.k} has no feminine form`);
    if (L === 'fr' && w.k === 1 && w.f !== 'première') F.push('A fr: words[1].f must be première');
    if (L === 'fr' && w.k > 1 && w.f != null) F.push(`A fr: word ${w.k} must have f:null`);
    if (!ORDO_LOCALES.has(L) && L !== 'fr' && w.f != null) F.push(`A ${L}: word ${w.k} must have f:null (invariant)`);
    if (L === 'fr' && w.k === 2 && w.m !== 'deuxième') F.push(`A fr: words[2].m "${w.m}" — second is BANNED, deuxième only`);
  });
  // gender policy
  if (!['position', 'noun'].includes(cfg.genderPolicy)) F.push(`A ${L}: genderPolicy "${cfg.genderPolicy}"`);
  if (cfg.genderPolicy === 'noun' && !(NF && Object.keys(NF).length === 10)) F.push(`A ${L}: genderPolicy noun needs a full notationF`);
  if (cfg.genderPolicy === 'noun' && !ORDO_LOCALES.has(L)) F.push(`A ${L}: genderPolicy must be position (no gendered position noun)`);
  // where
  if (cfg.where != null) {
    const lab = String(cfg.where.label || '');
    if (lab.includes('{')) F.push(`A ${L}: where.label carries a slot`);
    if ([...lab].length > 30) F.push(`A ${L}: where.label ${[...lab].length} > 30`);
    if (!/\?$/.test(lab)) F.push(`A ${L}: where.label does not end in ?`);
    if (typeof cfg.where.printed !== 'boolean') F.push(`A ${L}: where.printed must be boolean`);
  }
  if (![22, 20].includes(cfg.wordPx)) F.push(`A ${L}: wordPx ${cfg.wordPx} not 22|20`);
  if (typeof cfg.capital !== 'boolean') F.push(`A ${L}: capital must be boolean`);
  if (!cfg.exemplar || !FAN_THEMES.includes(cfg.exemplar)) F.push(`A ${L}: exemplar "${cfg.exemplar}" is not a fan theme`);
  // Phase-2 tables (noun keys are language-independent; every block carries the same tables)
  const poolOf = (theme) => { try { return new Set(entriesFor(theme, 'en').map((e) => e.noun)); } catch (e) { return null; } };
  for (const [theme, groups] of Object.entries(cfg.lookalikes || {})) {
    if (!FAN_THEMES.includes(theme)) { F.push(`A ${L}: lookalikes theme "${theme}" is not a fan theme`); continue; }
    const pool = poolOf(theme) || new Set();
    const seen = new Set();
    for (const g of Array.isArray(groups) ? groups : []) {
      if (!Array.isArray(g) || g.length < 2) F.push(`A ${L}: a lookalike group in ${theme} has fewer than 2 nouns`);
      for (const n of g || []) {
        if (!pool.has(n)) F.push(`A ${L}: lookalike "${n}" not in the ${theme} pool`);
        if (seen.has(n)) F.push(`A ${L}: lookalike "${n}" sits in two ${theme} groups`);
        seen.add(n);
      }
    }
  }
  const racers = Array.isArray(cfg.racers) ? cfg.racers : [];
  if (!racers.length) F.push(`A ${L}: no racers`);
  for (const t of racers) if (!FAN_THEMES.includes(t) || t === 'fruits' || t === 'toys') F.push(`A ${L}: "${t}" cannot be a racer (a fan theme of things that move: never fruits/toys)`);
  for (const [theme, table] of Object.entries(cfg.facing || {})) {
    if (!racers.includes(theme)) F.push(`A ${L}: facing theme "${theme}" is not a racer`);
    const pool = poolOf(theme) || new Set();
    for (const [noun, side] of Object.entries(table || {})) {
      if (!['left', 'right', 'front'].includes(side)) F.push(`A ${L}: facing ${theme}.${noun} = "${side}" (left | right | front)`);
      if (noun !== 'default' && !pool.has(noun)) F.push(`A ${L}: facing noun "${noun}" not in the ${theme} pool`);
    }
  }
  for (const [theme, list] of Object.entries(cfg.noRace || {})) {
    if (!racers.includes(theme)) F.push(`A ${L}: noRace theme "${theme}" is not a racer`);
    const pool = poolOf(theme) || new Set();
    for (const n of list || []) if (!pool.has(n)) F.push(`A ${L}: noRace noun "${n}" not in the ${theme} pool`);
    if ((list || []).length && pool.size - list.length < 6) F.push(`A ${L}: noRace leaves ${theme} under 6 runners`);
  }
  // strings
  const S = cfg.strings || {};
  const faces = ['K-320', 'F1', 'F2', 'F3', 'F4', 'F5'];
  const titles = [];
  const rel = RELATION[L] || [];
  for (const f of faces) {
    const s = S[f];
    if (!s || !s.title || !s.instruction) { F.push(`A ${L}: strings.${f} missing title/instruction`); continue; }
    if ([...s.title].length > 70) F.push(`A ${L}: ${f} title ${[...s.title].length} > 70`);
    if (WORKSHEET_WORD.test(s.title)) F.push(`A ${L}: ${f} title carries the worksheet word`);
    if ([...s.instruction].length > 150) F.push(`A ${L}: ${f} instruction ${[...s.instruction].length} > 150`);
    if (/\{noun\}|\{ordinal\}|\{[a-z]+\}/i.test(s.instruction) || /\{[a-z]+\}/i.test(s.title)) F.push(`A ${L}: ${f} carries a slot`);
    for (const w of rel) if (new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu').test(s.instruction)) F.push(`A ${L}: ${f} instruction carries the relation word "${w}"`);
    if (/\bfree\b|kostenlos|gratis|gratuit|ilmainen|gratuito/i.test(s.title + ' ' + s.instruction)) F.push(`A ${L}: ${f} copy claims free`);
    titles.push(s.title.toLowerCase());
  }
  if (new Set(titles).size !== titles.length) F.push(`A ${L}: face titles repeat`);
  if (spec && L === 'en' && S['K-320'] && (S['K-320'].title !== spec.i18n.en.title || S['K-320'].instruction !== spec.i18n.en.instruction)) F.push('A en: strings[K-320] != the spec i18n.en (two sources)');
  // calendar cross-check (rule 8): a divergence outside es/pt/it/fr is a FAIL
  const cal = CALENDAR[L];
  if (cal && keys.length === 10 && !ORDO_LOCALES.has(L) && L !== 'fr') {
    for (const k of keys) if (calOrdinal(cal.ordinalStyle, k) !== N[k]) F.push(`A ${L}: calendar.js ordinal(${k}) = "${calOrdinal(cal.ordinalStyle, k)}" diverges from the bank "${N[k]}"`);
  }
  return F;
}

/* ---------------- C. renders (real pipeline) ---------------- */
async function renderCheck(page, type, inj, job, opts) {
  let t = type;
  if (inj) t = { ...type, build: (o, ctx) => type._buildWith(inj.bank || loadBank()[o.locale.slice(0, 2)], inj.cfg || type.difficulty[o.difficulty], { theme: o.theme, locale: o.locale }, ctx) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({
    type: t, theme: job.theme, difficulty: job.difficulty, locale: job.locale, strings: job.strings,
    seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const cfg = (inj && inj.cfg) || type.difficulty[job.difficulty];
  const m = await page.evaluate(({ pic, pillH, picFloor, chipFloor, laneInner }) => {
    const res = { lanes: 0, chips: [], fails: [] };
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.instrLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    const lanes = [...document.querySelectorAll('[data-lcs-strip]')];
    res.lanes = lanes.length;
    res.orders = lanes.map((l) => l.dataset.lcsOrder);
    lanes.forEach((lane, i) => {
      const S = `strip ${i + 1}`;
      const lb = lane.getBoundingClientRect();
      if (lb.top < body.top - 0.6 || lb.bottom > body.bottom + 0.6 || lb.left < body.left - 0.6 || lb.right > body.right + 0.6) res.fails.push(`${S}: lane outside the body`);
      const inner = { left: lb.left + 14, right: lb.right - 14 };
      lane.querySelectorAll('[data-lcs-idx] img').forEach((img, j) => {
        const r = img.getBoundingClientRect();
        if (Math.abs(r.height - pic) > 0.6 || Math.abs(r.width - pic) > 0.6) res.fails.push(`${S}: picture ${j} ${r.width.toFixed(1)}x${r.height.toFixed(1)}, config says ${pic}`);
        if (r.height < picFloor - 0.6) res.fails.push(`${S}: picture ${j} ${r.height.toFixed(1)} < K floor ${picFloor}`);
      });
      const strip = lane.querySelector('[data-lcs-lineup]');
      if (!strip) res.fails.push(`${S}: no line-up block`);
      else {
        const sb = strip.getBoundingClientRect();
        if (sb.width > laneInner + 0.6) res.fails.push(`${S}: strip ${sb.width.toFixed(1)} > ${laneInner}`);
        if (sb.left < inner.left - 0.6 || sb.right > inner.right + 0.6) res.fails.push(`${S}: strip outside the lane padding`);
        if (sb.top < lb.top || sb.bottom > lb.bottom) res.fails.push(`${S}: strip outside its lane`);
      }
      const row = lane.querySelector('[data-lcs-chips]');
      if (!row) res.fails.push(`${S}: no chip row`);
      else {
        const rb = row.getBoundingClientRect();
        if (rb.bottom > lb.bottom + 0.6 || rb.right > inner.right + 0.6 || rb.left < inner.left - 0.6) res.fails.push(`${S}: chip row outside its lane`);
        if (strip && rb.top < strip.getBoundingClientRect().bottom - 0.6) res.fails.push(`${S}: chip row overlaps the strip`);
      }
      lane.querySelectorAll('[data-lcs-chip]').forEach((c, j) => {
        const r = c.getBoundingClientRect();
        if (r.height < chipFloor - 0.6) res.fails.push(`${S}: chip ${j + 1} ${r.height.toFixed(1)} < ${chipFloor}`);
        if (Math.abs(r.height - pillH) > 0.6) res.fails.push(`${S}: chip ${j + 1} ${r.height.toFixed(1)} != pillH ${pillH}`);
        const txt = c.querySelector('[data-lcs-chip-text]');
        const tw = txt ? txt.getBoundingClientRect() : { width: 0 };
        if (txt && (tw.left < r.left || tw.right > r.right)) res.fails.push(`${S}: chip ${j + 1} text clipped`);
        res.chips.push({ k: +c.dataset.lcsOrdinal, action: c.dataset.lcsAction, notation: c.dataset.lcsNotation, target: +c.dataset.lcsTarget, strip: i, w: r.width, textW: tw.width });
      });
    });
    return res;
  }, { pic: cfg.pic, pillH: cfg.pillH, picFloor: PIC_FLOOR, chipFloor: CHIP_FLOOR, laneInner: LANE_INNER });
  fails.push(...m.fails.map((x) => 'size: ' + x));
  if (m.lanes !== cfg.strips) fails.push(`count: ${m.lanes} lanes, config says ${cfg.strips}`);
  if (job.strings === WORST_CHROME && m.body > WORST_BODY) fails.push(`chrome: the 3-line/3-line body measured ${m.body}, the gate expected <= ${WORST_BODY} (re-measure the floor)`);
  if (job.strings === WORST_CHROME && m.instrLines < 3) fails.push(`chrome: WORST_CHROME wrapped to ${m.instrLines} instruction lines, not 3 (the probe is vacuous)`);
  // Node-side: every notation literal === the bank's table (the page cannot require)
  const bankLoc = ((inj && inj.bank) || loadBank())[job.locale.slice(0, 2)];
  m.chips.forEach((c, i) => {
    if (!bankLoc || bankLoc.notation[c.k] !== c.notation) fails.push(`notation: chip ${i + 1} stamps "${c.notation}", the bank says "${bankLoc && bankLoc.notation[c.k]}" for ${c.k}`);
  });
  if (!m.chips.length) fails.push('non-vacuity: 0 chips checked');
  return { fails, chips: m.chips, lanes: m.lanes, orders: m.orders, body: m.body, instrLines: m.instrLines, pngPath: out.pngPath };
}

/* ---------------- E. the Phase-2 faces (real pipeline) ---------------- */
const FACE_IDS = { write: 'G1-315', words: 'G1-316', where: 'G1-317', mixed: 'K-336', race: 'G1-318' };
const FACE_STRINGS = { write: 'F1', words: 'F2', where: 'F3', mixed: 'F4', race: 'F5' };
const G1_FLOOR = 44;
const CHIP_GAP = 8;
const CHIP_PAD = 24 + 5;   // padding 0 12 + border 2.5 x 2 (page.css .ws-achip)

/** The widest legal F2 chip row for a locale block: the `words` widest of the words a strip of n can ask (k <= n) at px, chips + gaps. */
async function worstWordRow(page, block, px, words, n = 8) {
  const ws = await page.evaluate((lits, size) => lits.map((t) => {
    const s = document.createElement('span');
    s.style.cssText = `font-family:'Baloo 2',cursive;font-weight:700;font-size:${size}px;position:absolute;visibility:hidden;white-space:nowrap`;
    s.textContent = t; document.body.appendChild(s); const w = s.getBoundingClientRect().width; s.remove(); return +w.toFixed(1);
  }), (block.words || []).filter((w) => w.k <= n).map((w) => w.m), px);
  const chips = ws.map((w) => w + CHIP_PAD).sort((a, b) => b - a).slice(0, words);
  return +(chips.reduce((a, b) => a + b, 0) + (words - 1) * CHIP_GAP).toFixed(1);
}

/** Expected notation for (k, gender) from the bank block — the gate's own derivation (never the spec's helper). */
function bankNotation(block, k, g) {
  if (g === 'f') return block.notationF && block.notationF[k];
  return block.notation && block.notation[k];
}

/**
 * Render one face job through the real pipeline and measure it. `inj` = {bank, cfg} (the
 * poison seam); `opts.post` rewrites the built HTML. Returns {fails, m, pngPath}.
 */
async function faceRenderCheck(page, spec, face, inj, job, opts) {
  let t = spec;
  if (inj) t = { ...spec, build: (o, ctx) => spec._buildWith(inj.bank || loadBank()[o.locale.slice(0, 2)], inj.cfg || spec.difficulty[o.difficulty], { theme: o.theme, locale: o.locale }, ctx) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({
    type: t, theme: job.theme, difficulty: job.difficulty, locale: job.locale, strings: job.strings,
    seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const cfg = (inj && inj.cfg) || spec.difficulty[job.difficulty];
  const bankLoc = ((inj && inj.bank) || loadBank())[job.locale.slice(0, 2)];
  const m = await page.evaluate(({ face, pic, picFloor, laneInner }) => {
    const res = { fails: [], strips: [], lanes: 0 };
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.instrLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    const root = document.querySelector('[data-lcs-ordinal-page]');
    res.face = root ? root.dataset.lcsFace || null : null;
    res.theme = root ? root.dataset.lcsTheme : null;
    const inside = (r, box, what, S) => { if (r.top < box.top - 0.6 || r.bottom > box.bottom + 0.6 || r.left < box.left - 0.6 || r.right > box.right + 0.6) res.fails.push(`${S}: ${what} outside`); };
    if (face === 'race') {
      const rows = [...document.querySelectorAll('[data-lcs-lane]')];
      res.lanes = rows.length;
      rows.forEach((row, i) => {
        const S = `lane ${i + 1}`;
        const rb = row.getBoundingClientRect();
        inside(rb, body, 'row', S);
        if (rb.width > 675.6) res.fails.push(`${S}: row ${rb.width.toFixed(1)} > 675`);
        const r = row.querySelector('[data-lcs-runner]'), img = row.querySelector('[data-lcs-runner] img'), box = row.querySelector('.ws-blankbox'), fin = row.querySelector('[data-lcs-finish]');
        const rec = { noun: r && r.dataset.lcsNoun, x: r && +r.dataset.lcsX, mirror: !!(r && r.dataset.lcsMirror === '1'), answer: box && box.dataset.lcsAnswer, imgW: img ? img.getBoundingClientRect().width : 0, imgH: img ? img.getBoundingClientRect().height : 0, boxH: box ? box.getBoundingClientRect().height : 0, finH: fin ? fin.getBoundingClientRect().height : 0 };
        if (img) { const ib = img.getBoundingClientRect(); inside(ib, rb, 'runner', S); if (Math.abs(ib.width - pic) > 0.6) res.fails.push(`${S}: runner ${ib.width.toFixed(1)}, config says ${pic}`); if (ib.width < picFloor - 0.6) res.fails.push(`${S}: runner ${ib.width.toFixed(1)} < floor ${picFloor}`); }
        if (box) { const bb = box.getBoundingClientRect(); inside(bb, rb, 'box', S); if (bb.height < 43.4) res.fails.push(`${S}: box ${bb.height.toFixed(1)} < 44`); if (bb.width < 71.4) res.fails.push(`${S}: box ${bb.width.toFixed(1)} < 72`); }
        if (fin) inside(fin.getBoundingClientRect(), rb, 'finish', S);
        res.strips.push(rec);
      });
      return res;
    }
    const lanes = [...document.querySelectorAll('[data-lcs-strip]')];
    res.lanes = lanes.length;
    lanes.forEach((lane, i) => {
      const S = `strip ${i + 1}`;
      const lb = lane.getBoundingClientRect();
      inside(lb, body, 'lane', S);
      const inner = { top: lb.top, bottom: lb.bottom, left: lb.left + 14, right: lb.right - 14 };
      const rec = { order: lane.dataset.lcsOrder, start: lane.dataset.lcsStart, n: +lane.dataset.lcsN };
      lane.querySelectorAll('[data-lcs-idx] img').forEach((img, j) => {
        const r = img.getBoundingClientRect();
        if (Math.abs(r.height - pic) > 0.6 || Math.abs(r.width - pic) > 0.6) res.fails.push(`${S}: picture ${j} ${r.width.toFixed(1)}x${r.height.toFixed(1)}, config says ${pic}`);
        if (r.height < picFloor - 0.6) res.fails.push(`${S}: picture ${j} ${r.height.toFixed(1)} < floor ${picFloor}`);
      });
      const strip = lane.querySelector('[data-lcs-lineup]');
      if (!strip) res.fails.push(`${S}: no line-up block`);
      else {
        const sb = strip.getBoundingClientRect();
        if (sb.width > laneInner + 0.6) res.fails.push(`${S}: strip ${sb.width.toFixed(1)} > ${laneInner}`);
        inside(sb, inner, 'strip', S);
        rec.stripBottom = sb.bottom;
      }
      if (face === 'write') {
        rec.boxes = [...lane.querySelectorAll('[data-lcs-box]')].map((b) => ({ idx: +b.dataset.lcsBox, given: b.dataset.lcsGiven != null ? b.dataset.lcsGiven : null, answer: b.dataset.lcsAnswer != null ? b.dataset.lcsAnswer : null, text: b.textContent.trim(), h: b.getBoundingClientRect().height, w: b.getBoundingClientRect().width }));
        rec.genders = lane.dataset.lcsGenders;
        rec.boxes.forEach((b) => { if (b.h < 43.4) res.fails.push(`${S}: cell ${b.idx} ${b.h.toFixed(1)} < 44`); });
        const rowEl = lane.querySelector('[data-lcs-box]') && lane.querySelector('[data-lcs-box]').parentElement;
        if (rowEl) { const rb = rowEl.getBoundingClientRect(); inside(rb, inner, 'numeral row', S); if (rb.width > laneInner + 0.6) res.fails.push(`${S}: numeral row ${rb.width.toFixed(1)} > ${laneInner}`); }
        // every cell sits under ITS tile (centre within half a tile)
        const tiles = [...lane.querySelectorAll('[data-lcs-idx]')];
        lane.querySelectorAll('[data-lcs-box]').forEach((b) => {
          const t = tiles.find((x) => +x.dataset.lcsIdx === +b.dataset.lcsBox);
          if (!t) return;
          const tc = (t.getBoundingClientRect().left + t.getBoundingClientRect().right) / 2, bc = (b.getBoundingClientRect().left + b.getBoundingClientRect().right) / 2;
          if (Math.abs(tc - bc) > t.getBoundingClientRect().width / 2) res.fails.push(`${S}: cell ${b.dataset.lcsBox} is not under its tile (${Math.abs(tc - bc).toFixed(1)} px off)`);
        });
      }
      if (face === 'words') {
        const bank = lane.querySelector('[data-lcs-bank]');
        rec.chips = [...lane.querySelectorAll('[data-lcs-word-k]')].map((c) => ({ k: +c.dataset.lcsWordK, text: c.textContent.trim(), w: c.getBoundingClientRect().width, h: c.getBoundingClientRect().height, px: parseFloat(getComputedStyle(c).fontSize) }));
        if (bank) {
          const bb = bank.getBoundingClientRect();
          inside(bb, inner, 'word row', S);
          if (bank.scrollWidth > bank.clientWidth + 0.6) res.fails.push(`${S}: word row scrolls (${bank.scrollWidth} > ${bank.clientWidth})`);
          if (bb.width > laneInner + 0.6) res.fails.push(`${S}: word row ${bb.width.toFixed(1)} > ${laneInner}`);
          rec.rowW = bb.width;
          if (rec.stripBottom != null) rec.lineZone = bb.top - rec.stripBottom;
        } else res.fails.push(`${S}: no word row`);
        rec.chips.forEach((c, j) => { if (c.h < 43.4) res.fails.push(`${S}: chip ${j + 1} ${c.h.toFixed(1)} < 44`); });
      }
      if (face === 'where') {
        const tiles = [...lane.querySelectorAll('[data-lcs-idx]')];
        rec.queries = [...lane.querySelectorAll('[data-lcs-query]')].map((q) => {
          const img = q.querySelector('img'), box = q.querySelector('.ws-blankbox');
          const tile = tiles.find((x) => x.dataset.lcsNoun === q.dataset.lcsNoun);
          return { noun: q.dataset.lcsNoun, answer: box && box.dataset.lcsAnswer, cloneW: img ? img.getBoundingClientRect().width : 0, src: img && img.getAttribute('src'), tileSrc: tile && tile.querySelector('img') && tile.querySelector('img').getAttribute('src'), boxH: box ? box.getBoundingClientRect().height : 0, w: q.getBoundingClientRect().width };
        });
        const qrow = lane.querySelector('[data-lcs-queries]');
        if (qrow) { const qb = qrow.getBoundingClientRect(); inside(qb, inner, 'query row', S); if (rec.stripBottom != null && qb.top < rec.stripBottom + 11.4) res.fails.push(`${S}: query row ${(qb.top - rec.stripBottom).toFixed(1)} px under the strip (< 12)`); }
        else res.fails.push(`${S}: no query row`);
        rec.queries.forEach((q, j) => {
          if (q.cloneW < 55.4) res.fails.push(`${S}: clone ${j + 1} ${q.cloneW.toFixed(1)} < 56`);
          if (q.boxH < 43.4) res.fails.push(`${S}: query ${j + 1} box < 44`);
          // the clone must not overflow its own cell (the design's 180 was 8 px short — measured)
        });
        lane.querySelectorAll('[data-lcs-query]').forEach((q, j) => { const qb = q.getBoundingClientRect(); q.querySelectorAll('img, .ws-blankbox, svg').forEach((el) => inside(el.getBoundingClientRect(), qb, `query ${j + 1} part`, S)); });
      }
      res.strips.push(rec);
    });
    return res;
  }, { face, pic: cfg.pic, picFloor: face === 'mixed' ? PIC_FLOOR : G1_FLOOR, laneInner: LANE_INNER });
  fails.push(...m.fails.map((x) => 'size: ' + x));
  if (m.face !== (face === 'mixed' ? null : face)) fails.push(`face stamp "${m.face}", expected ${face === 'mixed' ? 'none (F4 is the base page)' : face}`);
  if (job.strings === WORST_CHROME && m.body > WORST_BODY) fails.push(`chrome: the 3-line/3-line body measured ${m.body}, the gate expected <= ${WORST_BODY}`);
  if (job.strings === WORST_CHROME && m.instrLines < 3) fails.push(`chrome: WORST_CHROME wrapped to ${m.instrLines} instruction lines, not 3 (the probe is vacuous)`);
  const loc = job.locale.slice(0, 2);
  let checked = 0;
  /* ---- Node-side: the bank is the truth (the page cannot require) */
  if (face === 'write') {
    if (m.lanes !== cfg.strips) fails.push(`count: ${m.lanes} strips, config says ${cfg.strips}`);
    const sets = [];
    m.strips.forEach((st, i) => {
      const S = `strip ${i + 1}`;
      const genders = (st.genders || '').split(',');
      const blanks = [];
      let run = 0;
      (st.boxes || []).sort((a, b) => a.idx - b.idx).forEach((b) => {
        checked++;
        const k = st.start === 'left' ? b.idx + 1 : st.n - b.idx;
        const g = bankLoc.genderPolicy === 'noun' ? (genders[b.idx] || 'm') : 'm';
        const want = bankNotation(bankLoc, k, g);
        if (b.given != null) { if (b.given !== want || b.text !== want) fails.push(`${S}: given cell ${b.idx} prints "${b.text}" (stamp "${b.given}"), the bank says "${want}"`); run = 0; }
        else { if (b.answer !== want) fails.push(`${S}: blank cell ${b.idx} answer "${b.answer}", the bank says "${want}"`); if (b.text) fails.push(`${S}: blank cell ${b.idx} prints "${b.text}"`); if (b.idx === 0) fails.push(`${S}: position 1 is blank`); blanks.push(b.idx); run++; if (run >= 4) fails.push(`${S}: four blanks in a row`); }
      });
      if (blanks.length !== cfg.blank) fails.push(`${S}: ${blanks.length} blanks, config says ${cfg.blank}`);
      if (sets.includes(blanks.join(','))) fails.push(`${S}: blank set repeats an earlier strip`);
      sets.push(blanks.join(','));
      st.blanks = blanks;
    });
  }
  if (face === 'words') {
    if (m.lanes !== cfg.strips) fails.push(`count: ${m.lanes} strips, config says ${cfg.strips}`);
    const px = bankLoc.wordPx === 20 ? 20 : 22;
    m.strips.forEach((st, i) => {
      const S = `strip ${i + 1}`;
      const ks = (st.chips || []).map((c) => c.k);
      if (ks.length !== cfg.words) fails.push(`${S}: ${ks.length} chips, config says ${cfg.words}`);
      (st.chips || []).forEach((c, j) => {
        checked++;
        const w = (bankLoc.words || []).find((x) => x.k === c.k);
        if (!w || c.text !== w.m) fails.push(`${S} chip ${j + 1}: prints "${c.text}", the bank says "${w && w.m}" for ${c.k}`);
        if (Math.abs(c.px - px) > 0.6) fails.push(`${S} chip ${j + 1}: ${c.px} px, the bank's wordPx is ${px}`);
      });
      let asc = ks.length > 1; for (let j = 1; j < ks.length; j++) if (ks[j] < ks[j - 1]) asc = false;
      if (asc) fails.push(`${S}: chips in position order ${ks.join(',')}`);
      if (st.lineZone != null && st.lineZone < 59.4) fails.push(`${S}: line zone ${st.lineZone.toFixed(1)} < 60`);
    });
  }
  if (face === 'where') {
    if (m.lanes !== cfg.strips) fails.push(`count: ${m.lanes} strips, config says ${cfg.strips}`);
    const groups = (bankLoc.lookalikes && bankLoc.lookalikes[m.theme]) || [];
    const answers = [];
    m.strips.forEach((st, i) => {
      const S = `strip ${i + 1}`;
      const order = (st.order || '').split(',');
      for (const g of groups) { const hit = g.filter((n) => order.includes(n)); if (hit.length > 1) fails.push(`${S}: lookalikes ${hit.join(' + ')} share a strip`); }
      const nouns = (st.queries || []).map((q) => q.noun);
      if (nouns.length !== cfg.queries) fails.push(`${S}: ${nouns.length} queries, config says ${cfg.queries}`);
      if (new Set(nouns).size !== nouns.length) fails.push(`${S}: two queries ask one noun`);
      (st.queries || []).forEach((q, j) => {
        checked++;
        const hits = order.filter((n) => n === q.noun).length;
        if (hits !== 1) fails.push(`${S} query ${j + 1}: "${q.noun}" occurs ${hits}x in its strip`);
        const idx = order.indexOf(q.noun);
        const k = st.start === 'left' ? idx + 1 : st.n - idx;
        const want = bankNotation(bankLoc, k, 'm');
        if (idx >= 0 && q.answer !== want) fails.push(`${S} query ${j + 1}: answer "${q.answer}", the bank says "${want}" for place ${k}`);
        if (q.src !== q.tileSrc) fails.push(`${S} query ${j + 1}: clone src != tile src`);
        answers.push(q.answer);
      });
    });
    if (answers.length > 1 && new Set(answers).size === 1) fails.push('every answer on the page is ' + answers[0]);
  }
  if (face === 'race') {
    if (m.lanes !== cfg.lanes) fails.push(`count: ${m.lanes} lanes, config says ${cfg.lanes}`);
    if (!(bankLoc.racers || []).includes(m.theme)) fails.push(`theme "${m.theme}" is not a racer`);
    const facing = (bankLoc.facing && bankLoc.facing[m.theme]) || {};
    const rs = m.strips;
    for (let a = 0; a < rs.length; a++) for (let b = a + 1; b < rs.length; b++) if (Math.abs(rs[a].x - rs[b].x) < cfg.sep) fails.push(`lanes ${a + 1}/${b + 1}: runners ${Math.abs(rs[a].x - rs[b].x)} px apart < ${cfg.sep}`);
    rs.forEach((r, i) => {
      checked++;
      const rank = 1 + rs.filter((o) => o.x > r.x).length;
      const want = bankNotation(bankLoc, rank, 'm');
      if (r.answer !== want) fails.push(`lane ${i + 1}: answer "${r.answer}", the bank says "${want}" for rank ${rank}`);
      const face = facing[r.noun] || facing.default || 'front';
      if (r.mirror !== (face === 'left')) fails.push(`lane ${i + 1}: "${r.noun}" ${r.mirror ? 'mirrored' : 'not mirrored'}, the bank says it faces ${face}`);
      if ((bankLoc.noRace && bankLoc.noRace[m.theme] || []).includes(r.noun)) fails.push(`lane ${i + 1}: "${r.noun}" is on the noRace list`);
    });
    if (new Set(rs.map((r) => r.noun)).size !== rs.length) fails.push('a runner repeats');
  }
  if (face !== 'mixed' && !checked) fails.push('non-vacuity: 0 face elements checked');
  return { fails, m, pngPath: out.pngPath, checked };
}

async function runFaces(page, note, bankAll, seeds, quick) {
  const cfg = bankAll.en;
  const ex = cfg.exemplar || EXEMPLAR;
  const results = {};
  for (const face of Object.keys(FACE_IDS)) {
    const id = FACE_IDS[face];
    let spec;
    try { spec = loadType(id); } catch (e) { note(false, `${id} (${face}) is not on disk — run tools/gen-b3var-specs.js`); continue; }
    results[face] = { spec };
    // one source: the emitted i18n.en === the bank's strings.F<n>
    const S = cfg.strings[FACE_STRINGS[face]];
    note(spec.i18n.en.title === S.title && spec.i18n.en.instruction === S.instruction, `${id}: i18n.en != strings.${FACE_STRINGS[face]} (two sources)`);
    note(face === 'mixed' ? spec.gradeBand === 'K' : spec.gradeBand === 'G1', `${id}: gradeBand ${spec.gradeBand}`);
    const d2 = spec.difficulty[2];
    note(face === 'mixed' ? d2.layout == null && d2.start === 'mixed' : d2.layout === face, `${id}: d2 knob (${JSON.stringify({ layout: d2.layout, start: d2.start })})`);
    // themes: F5 over every racer (+ fruits refused); F3 over every fan theme (the lookalike ban); others exemplar + 2
    let themes;
    if (face === 'race') themes = cfg.racers.slice();
    else if (face === 'where') themes = quick ? [ex, 'vehicles', 'fruits'] : FAN_THEMES.slice();
    else themes = [ex, ...FAN_THEMES.filter((t) => t !== ex).slice(0, 2)];
    const jobs = [];
    for (const theme of themes) jobs.push({ theme, difficulty: 2, locale: 'en', baseName: `${id}-${theme}-d2-en`, tag: 'theme' });
    jobs.push({ theme: face === 'race' ? cfg.racers[0] : ex, difficulty: 2, locale: 'en', strings: LONG_CHROME, baseName: `${id}-${ex}-d2-en-longchrome`, tag: 'long-chrome' });
    jobs.push({ theme: face === 'race' ? cfg.racers[0] : ex, difficulty: 2, locale: 'en', strings: WORST_CHROME, baseName: `${id}-${ex}-d2-en-worstchrome`, tag: 'worst-chrome' });
    for (let s = 2; s <= seeds; s++) jobs.push({ theme: face === 'race' ? cfg.racers[0] : ex, difficulty: 2, locale: 'en', seedEpoch: s, baseName: `${id}-${ex}-d2-en-seed${s}`, tag: 'seed' });
    const sweep = { ks: new Set(), blanks: new Set(), rights: new Set(), nouns: new Set(), pages: new Map(), ascending: 0, sameAnswers: 0 };
    for (const job of jobs) {
      let r;
      try { r = face === 'mixed' ? await renderCheck(page, spec, null, job) : await faceRenderCheck(page, spec, face, null, job); } catch (e) { r = { thrown: e.message }; }
      note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
      if (r.thrown) { console.log(`[E] ${job.baseName}: THREW ${r.thrown}`); continue; }
      note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
      if (face === 'mixed') {
        for (const c of r.chips) sweep.ks.add(c.k);
        const rights = r.orders.length; // lanes
        const key = r.chips.map((c) => c.k + c.action[0]).join(',') + '|' + r.orders.join('/');
        if (job.tag === 'seed' || (job.tag === 'theme' && job.theme === ex)) { const prev = sweep.pages.get(key); note(!prev, `${job.baseName}: byte-identical page to ${prev}`); sweep.pages.set(key, job.baseName); }
        // both sides on EVERY page is verify()'s job (start:mixed); count the right-flag strips per page for the sweep line
        const nRight = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-strip]')].filter((l) => l.dataset.lcsStart === 'right').length);
        sweep.rights.add(nRight);
        note(nRight >= 1 && nRight <= rights - 1, `${job.baseName}: ${nRight} of ${rights} strips start right (want >= 1 and <= ${rights - 1})`);
        assertions_bump(10 * r.chips.length);
      } else {
        assertions_bump(8 * r.checked);
        const key = JSON.stringify(r.m.strips.map((st) => face === 'race' ? [st.noun, st.x] : [st.order, st.blanks || (st.chips || []).map((c) => c.k) || (st.queries || []).map((q) => q.noun)]));
        if (job.tag === 'seed' || (job.tag === 'theme' && job.theme === (face === 'race' ? cfg.racers[0] : ex))) { const prev = sweep.pages.get(key); note(!prev, `${job.baseName}: byte-identical page to ${prev}`); sweep.pages.set(key, job.baseName); }
        for (const st of r.m.strips) {
          if (face === 'write') for (const b of st.blanks || []) sweep.blanks.add(b);
          if (face === 'words') for (const c of st.chips || []) sweep.ks.add(c.k);
          if (face === 'where') for (const q of st.queries || []) sweep.ks.add(+String(q.answer).replace(/\D/g, ''));
          if (face === 'race') sweep.nouns.add(st.noun);
        }
      }
      if (job.tag !== 'seed') console.log(`[E] ${job.baseName}: body ${r.body || r.m.body} (${r.instrLines || r.m.instrLines}-line instruction), ${r.lanes || r.m.lanes} lanes ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
    }
    // the sweep lines (design §5): coverage over seeds
    if (face === 'write') { const have = [...sweep.blanks].sort((a, b) => a - b); note(have.length === 7, `F1 sweep: blank positions ${have.join(',')} do not cover 1..7`); console.log(`[E] F1 sweep over ${seeds} seeds: blank positions ${have.join(',')}; ${sweep.pages.size} distinct pages`); }
    if (face === 'words') { const have = [...sweep.ks].sort((a, b) => a - b); note(have.length === 8, `F2 sweep: words asked ${have.join(',')} do not cover 1..8`); console.log(`[E] F2 sweep over ${seeds} seeds: words asked ${have.join(',')}; ${sweep.pages.size} distinct pages`); }
    if (face === 'where') { const have = [...sweep.ks].sort((a, b) => a - b); note(have.length === 8, `F3 sweep: places asked ${have.join(',')} do not cover 1..8`); console.log(`[E] F3 sweep over ${seeds} seeds: places asked ${have.join(',')}; ${sweep.pages.size} distinct pages`); }
    if (face === 'mixed') { const have = [...sweep.ks].sort((a, b) => a - b); note(have.length === 7, `F4 sweep: asked ${have.join(',')} does not cover 1..7`); note(sweep.rights.size >= 2, `F4 sweep: right-flag count per page never varies (${[...sweep.rights].join(',')})`); console.log(`[E] F4 sweep over ${seeds} seeds: asked ${have.join(',')}; right-flag strips per page ${[...sweep.rights].sort().join('/')}; ${sweep.pages.size} distinct pages`); }
    if (face === 'race') { note(sweep.nouns.size > 6, `F5 sweep: only ${sweep.nouns.size} distinct runners over ${seeds} seeds`); console.log(`[E] F5 sweep over ${seeds} seeds: ${sweep.nouns.size} distinct runners; ${sweep.pages.size} distinct pages`); }
  }
  // F2 chip-row width: the widest legal 5-of-8 row at the bank's wordPx must fit the lane (per locale block present)
  for (const loc of Object.keys(bankAll)) {
    const b = bankAll[loc];
    const px = b.wordPx === 20 ? 20 : 22;
    const w = await worstWordRow(page, b, px, 5);
    note(w <= LANE_INNER, `${loc}: worst 5-of-8 word row ${w} px at ${px} px > ${LANE_INNER} (set wordPx:20 or re-measure)`);
    console.log(`[E] ${loc}: worst 5-of-8 word row ${w} px at wordPx ${px} (lane ${LANE_INNER})`);
  }
  return results;
}
let _assertionsExtra = 0;
function assertions_bump(n) { _assertionsExtra += n; }

async function main() {
  const locales = arg('locales', 'en').split(',');
  const themesArg = arg('themes');
  const seeds = +arg("seeds", QUICK ? 6 : 20);
  const type = loadType('K-320');
  let assertions = 0;
  const failures = [];
  const note = (ok, msg) => { assertions++; if (!ok) failures.push(msg); };
  const bankAll = loadBank();
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    for (const loc of locales) {
      const cfg = bankAll[loc];
      note(!!cfg, `no ${loc} block in the bank`);
      if (!cfg) continue;
      // ---- A
      const a = checkBank(cfg, loc, type);
      assertions += 60;
      failures.push(...a);
      console.log(`[A] ${loc}: notation ${Object.values(cfg.notation).join(' ')} · ${a.length} data faults`);
      // ---- B
      const themes = themesArg ? themesArg.split(',') : FAN_THEMES;
      for (const theme of themes) {
        note(!BW_MARK.test(theme), `theme "${theme}" carries a BW marker`);
        const counts = ALL_LOCALES.map((l) => entriesFor(theme, l).length);
        const min = Math.min(...counts);
        note(min >= MIN_NOUNS, `${theme}: min pool over 11 locales ${min} < minNouns ${MIN_NOUNS}`);
        note(min >= MAX_N, `${theme}: min pool ${min} < the widest strip ${MAX_N}`);
        let missing = 0;
        for (const e of entriesFor(theme, 'en')) if (!fs.existsSync(picPath(theme, e.noun))) missing++;
        note(missing === 0, `${theme}: ${missing} pictures missing on disk`);
        console.log(`[B] ${theme}: pool min ${min} (${counts.join(' ')}) · pictures missing ${missing}`);
      }
      // ---- C
      const ex = cfg.exemplar || EXEMPLAR;
      const renders = [];
      const sweepThemes = QUICK ? [ex, ...themes.filter((t) => t !== ex).slice(0, 2)] : themes;
      for (const theme of sweepThemes) renders.push({ theme, difficulty: 2, locale: loc, baseName: `K-320-${theme}-d2-${loc}`, tag: 'theme' });
      for (const d of [1, 3]) renders.push({ theme: ex, difficulty: d, locale: loc, baseName: `K-320-${ex}-d${d}-${loc}`, tag: 'level' });
      for (const d of [1, 2, 3]) renders.push({ theme: ex, difficulty: d, locale: loc, strings: LONG_CHROME, baseName: `K-320-${ex}-d${d}-${loc}-longchrome`, tag: 'long-chrome' });
      for (const d of [1, 2, 3]) renders.push({ theme: ex, difficulty: d, locale: loc, strings: WORST_CHROME, baseName: `K-320-${ex}-d${d}-${loc}-worstchrome`, tag: 'worst-chrome' });
      for (const d of [1, 2, 3]) for (let s = 2; s <= seeds; s++) renders.push({ theme: ex, difficulty: d, locale: loc, seedEpoch: s, baseName: `K-320-${ex}-d${d}-${loc}-seed${s}`, tag: 'seed' });
      const asked = { 1: new Set(), 2: new Set(), 3: new Set() };
      const pages = { 1: new Map(), 2: new Map(), 3: new Map() };
      const chipSets = { 1: new Set(), 2: new Set(), 3: new Set() };
      for (const job of renders) {
        let r;
        try { r = await renderCheck(page, type, null, job); } catch (e) { r = { thrown: e.message }; }
        note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
        if (r.thrown) { console.log(`[C] ${job.baseName}: THREW ${r.thrown}`); continue; }
        assertions += 10 * r.chips.length;
        note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
        for (const c of r.chips) asked[job.difficulty].add(c.k);
        // page identity = chips + the noun order (a (k, action) set may recur across 20 seeds — the
        // nouns differ; the design's sweep rule is coverage, not chip-set uniqueness)
        const key = r.chips.map((c) => c.k + c.action[0]).join(',') + '|' + r.orders.join('/');
        if (job.tag === 'seed' || job.tag === 'level' || (job.tag === 'theme' && job.theme === ex)) {
          const prev = pages[job.difficulty].get(key);
          note(!prev, `${job.baseName}: byte-identical page to ${prev}`);
          pages[job.difficulty].set(key, job.baseName);
          chipSets[job.difficulty].add(r.chips.map((c) => c.k + c.action[0]).join(','));
        }
        if (job.tag !== 'seed') console.log(`[C] ${job.baseName}: body ${r.body} (${r.instrLines}-line instruction), ${r.lanes} lanes, chips [${r.chips.map((c) => c.notation + '/' + c.action).join(' ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
      }
      // the widest notation literal at the chip size, measured in the real render (fonts loaded)
      {
        const widths = await page.evaluate((lits, px) => lits.map((t) => { const s = document.createElement('span'); s.style.cssText = `font-family:'Baloo 2',cursive;font-weight:700;font-size:${px}px;position:absolute;visibility:hidden;white-space:nowrap`; s.textContent = t; document.body.appendChild(s); const w = s.getBoundingClientRect().width; s.remove(); return [t, +w.toFixed(1)]; }), Object.values(cfg.notation), type.difficulty[2].chipPx);
        const widest = widths.reduce((a, b) => (b[1] > a[1] ? b : a));
        const chipW = widest[1] + 28 + 8 + 32 + 4;   // padding + gap + icon + border
        note(2 * chipW + 24 <= LANE_INNER, `${loc}: two widest chips ${2 * chipW + 24} > ${LANE_INNER}`);
        console.log(`[C] ${loc}: widest notation "${widest[0]}" ${widest[1]} px at ${type.difficulty[2].chipPx} px -> chip ~${Math.round(chipW)} px`);
      }
      for (const d of [1, 2, 3]) {
        const want = type.difficulty[d].kMax;
        const have = [...asked[d]].sort((a, b) => a - b);
        note(have.length === want && have[0] === 1 && have[want - 1] === want, `d${d} sweep: asked set ${have.join(',')} does not cover 1..${want}`);
        console.log(`[C] d${d} sweep over ${seeds} seeds: asked ${have.join(',')} (want 1..${want}); ${pages[d].size} distinct pages, ${chipSets[d].size} distinct chip sets`);
      }
    }

    // ---- E. the faces (render + measure + sweeps + the F2 row width)
    await runFaces(page, note, bankAll, seeds, QUICK);

    // ---- D. poisons (en; each must FAIL; control = the correct bank + page)
    const loc = 'en';
    const cfg = bankAll.en;
    const ex = cfg.exemplar || EXEMPLAR;
    const control = await renderCheck(page, type, null, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-320-control' });
    note(control.fails.length === 0 && checkBank(cfg, loc, type).length === 0, 'control (correct bank + page) did not pass: ' + control.fails.join(' | '));
    const controlRight = await renderCheck(page, type, { cfg: { ...type.difficulty[2], start: 'right' } }, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-320-control-right' });
    note(controlRight.fails.length === 0, 'control (start:right) did not pass: ' + controlRight.fails.join(' | '));
    const controlMixed = await renderCheck(page, type, { cfg: { ...type.difficulty[2], start: 'mixed' } }, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-320-control-mixed' });
    note(controlMixed.fails.length === 0, 'control (start:mixed) did not pass: ' + controlMixed.fails.join(' | '));

    const poisons = [];
    const deferred = [];   // the four base-deferred poisons (P5 P11 P12 P17) are face poisons now — counted below
    const bankPoison = (name, block, ploc, want) => poisons.push({ name, run: async () => { const f = checkBank(block, ploc, null); return f.some((x) => want.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    const synth = (ploc, mut) => {
      // a synthetic correct-shaped block for a non-EN locale, then the mutation — the correct shape is asserted first
      const b = clone(cfg);
      if (ploc === 'sv') { b.notation = {}; for (let k = 1; k <= 10; k++) b.notation[k] = k + (k <= 2 ? ':a' : ':e'); b.words = ['första', 'andra', 'tredje', 'fjärde', 'femte', 'sjätte', 'sjunde', 'åttonde', 'nionde', 'tionde'].map((m, i) => ({ k: i + 1, m, f: null })); }
      if (ploc === 'es') { b.notation = {}; b.notationF = {}; for (let k = 1; k <= 10; k++) { b.notation[k] = k + '.º'; b.notationF[k] = k + '.ª'; } b.words = ['primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto', 'séptimo', 'octavo', 'noveno', 'décimo'].map((m, i) => ({ k: i + 1, m, f: m.replace(/o$/, 'a') })); }
      if (ploc === 'fr') { b.notation = {}; for (let k = 1; k <= 10; k++) b.notation[k] = k === 1 ? '1er' : k + 'e'; b.notationF = { 1: '1re' }; b.words = ['premier', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième', 'septième', 'huitième', 'neuvième', 'dixième'].map((m, i) => ({ k: i + 1, m, f: i === 0 ? 'première' : null })); }
      b.strings = clone(cfg.strings);   // EN copy stands in; the relation-word list is per locale, the EN copy carries none of the sv/es/fr words
      const ctrl = checkBank(b, ploc, null);
      if (ctrl.length) throw new Error('synthetic ' + ploc + ' control is not clean: ' + ctrl.join(' | '));
      mut(b);
      return b;
    };
    poisons.push({ name: 'P7 sv 1:e', run: async () => { const b = synth('sv', (x) => { x.notation[1] = '1:e'; }); const f = checkBank(b, 'sv', null); return f.some((x) => /1:a/.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    poisons.push({ name: 'P8 es 3° (U+00B0)', run: async () => { const b = synth('es', (x) => { x.notation[3] = '3°'; }); const f = checkBank(b, 'es', null); return f.some((x) => /U\+00B0/.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    poisons.push({ name: 'P13 es mixing 1.º and 2º', run: async () => { const b = synth('es', (x) => { x.notation[2] = '2º'; }); const f = checkBank(b, 'es', null); return f.some((x) => /ruled ONCE/.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    poisons.push({ name: 'P14 fr words[2].m = second', run: async () => { const b = synth('fr', (x) => { x.words[1].m = 'second'; }); const f = checkBank(b, 'fr', null); return f.some((x) => /second is BANNED/.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    bankPoison('P-en notation 1th', (() => { const b = clone(cfg); b.notation[1] = '1th'; return b; })(), 'en', /!= 1st/);
    bankPoison('P-en instruction relation word', (() => { const b = clone(cfg); b.strings['K-320'].instruction = 'Circle the picture on the left.'; return b; })(), 'en', /relation word/);

    const once = (re, fn) => (html) => { let done = false; return html.replace(re, (m, ...g) => { if (done) return m; done = true; return fn(m, ...g); }); };
    const htmlPoison = (name, post, want, inj) => poisons.push({ name, run: async () => {
      const r = await renderCheck(page, type, inj || null, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-320-poison-' + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 24).toLowerCase() }, { post });
      return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    htmlPoison('P1 a strip cat,dog,cat', (html) => {
      const m = html.match(/data-lcs-order="([^"]+)"/); const o = m[1].split(','); const first = o[0]; o[2] = first;
      let out = html.replace(m[0], `data-lcs-order="${o.join(',')}"`);
      out = once(/data-lcs-idx="2" data-lcs-noun="[^"]+"/, () => `data-lcs-idx="2" data-lcs-noun="${first}"`)(out);
      return out;
    }, /noun repeats/);
    htmlPoison('P2 k:8 on a 7-tile strip', once(/data-lcs-chip data-lcs-ordinal="\d+"/, () => 'data-lcs-chip data-lcs-ordinal="8"'), /outside 1\.\.7/);
    htmlPoison('P3a data-lcs-start removed', once(/ data-lcs-start="left"/, () => ''), /start stamp/);
    htmlPoison('P3b no flag', (html) => html.replace(/<polygon[^>]*data-lcs-flag="1"[^>]*\/>/g, ''), /no flag/);
    htmlPoison('P4 an F4 page with every flag left', (html) => html.replace('data-lcs-startmode="mixed"', 'data-lcs-startmode="left"').replace(/data-lcs-start="right"/g, 'data-lcs-start="left"').replace(/data-lcs-arrow="right"/g, 'data-lcs-arrow="left"'), /not both sides|formula says|starts elsewhere/, { cfg: { ...type.difficulty[2], start: 'mixed' } });
    // P4 proper: the page still CLAIMS mixed while every strip is left
    poisons.push({ name: 'P4b start:mixed claimed, every flag left', run: async () => {
      const r = await renderCheck(page, type, null, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-320-poison-p4b' }, { post: (h) => h.replace('data-lcs-startmode="left"', 'data-lcs-startmode="mixed"') });
      return r.fails.some((x) => /not both sides/.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    htmlPoison('P6 a chip inside a tile', (html) => {
      const chip = html.match(/<span class="ws-pill" data-lcs-chip[\s\S]*?<\/svg><\/span>/);
      if (!chip) throw new Error('NEEDLE MATCHED NOTHING (chip)');
      let out = html.replace(chip[0], '');
      return once(/(<span data-lcs-idx="0"[^>]*>)/, (m, open) => open + chip[0])(out);
    }, /inside a tile|carries text/);
    poisons.push({ name: 'P9a theme "zoo animals bw" refused at build', run: async () => {
      try { await renderCheck(page, type, null, { theme: 'zoo animals bw', difficulty: 2, locale: loc, baseName: 'K-320-poison-p9a' }); return 'silent (rendered a BW theme)'; } catch (e) { return /B&W|BW/.test(e.message) ? null : 'wrong error: ' + e.message; }
    } });
    htmlPoison('P9b BW-marked theme stamp without data-lcs-bw', (html) => html.replace(`data-lcs-theme="${ex}"`, `data-lcs-theme="${ex} bw"`), /B&W marker/);
    htmlPoison('P10 two chips asking 3 on one page', (html) => {
      // the first chip of strip 1 and the first chip of strip 2 both become 3rd (target 2, start left)
      let n = 0;
      return html.replace(/data-lcs-chip data-lcs-ordinal="(\d+)" data-lcs-action="(\w+)" data-lcs-target="(\d+)" data-lcs-notation="([^"]+)"([^>]*>)<span([^>]*)data-lcs-chip-text>[^<]+/g, (m, k, act, tg, nt, rest, sp) => {
        n++;
        if (n !== 1 && n !== 3) return m;
        return `data-lcs-chip data-lcs-ordinal="3" data-lcs-action="${act}" data-lcs-target="2" data-lcs-notation="3rd"${rest}<span${sp}data-lcs-chip-text>3rd`;
      });
    }, /ordinals repeat/);
    htmlPoison('P15a built left, stamped right', once(/data-lcs-start="left"/, () => 'data-lcs-start="right"'), /formula says|arrow drawn/);
    htmlPoison('P15b built right, stamped left', once(/data-lcs-start="right"/, () => 'data-lcs-start="left"'), /formula says|arrow drawn/, { cfg: { ...type.difficulty[2], start: 'right' } });
    poisons.push({ name: 'P16 the old 760 stack under 3-line chrome', run: async () => {
      // panelMin = 24+4+84+22+pillH+24; pillH 90 -> 248 × 3 + 24 = 768 (the old flat-760 budget) under the 722 body
      const r = await renderCheck(page, type, { cfg: { ...type.difficulty[2], pillH: 90 } }, { theme: ex, difficulty: 2, locale: loc, strings: LONG_CHROME, baseName: 'K-320-poison-p16' });
      return r.fails.some((x) => /footer overlap|overflow|outside the body/.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    htmlPoison('P18 a hand-edited notation (3. on an en page)', (html) => {
      const m = html.match(/data-lcs-notation="(\d+)(st|nd|rd|th)"/);
      const k = m[1];
      return html.replace(new RegExp(`data-lcs-notation="${k}(st|nd|rd|th)"`), `data-lcs-notation="${k}."`).replace(new RegExp(`data-lcs-chip-text>${k}(st|nd|rd|th)<`), `data-lcs-chip-text>${k}.<`);
    }, /notation: .* the bank says/);
    htmlPoison('P19 pictures squashed below the floor', (html) => html.replace(/width:72px;height:72px/g, 'width:40px;height:40px'), /< K floor/);
    htmlPoison('P20 blank page (non-vacuity)', (html) => html.replace(/<span class="ws-pill" data-lcs-chip[\s\S]*?<\/svg><\/span>/g, ''), /non-vacuity|chips, want/);
    htmlPoison('P21 icon != action', once(/data-lcs-action="circle"/, () => 'data-lcs-action="cross"'), /icon != action|same mark/);

    /* ---- E poisons: the faces (each must FAIL; the E renders above are the controls) */
    const faceSpec = (face) => { try { return loadType(FACE_IDS[face]); } catch (e) { return null; } };
    const facePoison = (name, face, post, want, inj, theme) => poisons.push({ name, run: async () => {
      const spec = faceSpec(face);
      if (!spec) return 'face spec missing';
      const r = await faceRenderCheck(page, spec, face, inj || null, { theme: theme || ex, difficulty: 2, locale: loc, baseName: 'K-320-poison-' + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 28).toLowerCase() }, post ? { post } : null);
      return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    const throwPoison = (name, face, inj, theme, want) => poisons.push({ name, run: async () => {
      const spec = faceSpec(face);
      if (!spec) return 'face spec missing';
      try { await faceRenderCheck(page, spec, face, inj || null, { theme: theme || ex, difficulty: 2, locale: loc, baseName: 'K-320-poison-' + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 28).toLowerCase() }); return 'silent (rendered)'; }
      catch (e) { return want.test(e.message) ? null : 'wrong error: ' + e.message; }
    } });
    // P5 — F5: two runners 30 px apart (stamp AND drawing moved together, so only the separation rule can catch it)
    facePoison('P5 F5 two runners 30 px apart', 'race', (html) => {
      const xs = [...html.matchAll(/data-lcs-x="(\d+)"/g)].map((m) => +m[1]);
      if (xs.length < 2) throw new Error('NEEDLE MATCHED NOTHING (runners)');
      const target = xs[0] + 30;
      let n = 0;
      return html.replace(/data-lcs-x="(\d+)"([\s\S]*?)left:(\d+)px/g, (m, x, mid, left) => { n++; return n === 2 ? `data-lcs-x="${target}"${mid}left:${target}px` : m; });
    }, /px apart </);
    // P11 — F1: position 1 blank (the given cell by the flag turned into an open box)
    facePoison('P11 F1 position 1 blank', 'write', (html) => {
      const re = /<span data-lcs-given="([^"]+)" data-lcs-box="0" style="[^"]*">[^<]*<\/span>/;
      const m = html.match(re);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (given cell 0)');
      return html.replace(m[0], `<span class="ws-blankbox" data-lcs-box="0" data-lcs-answer="${m[1]}" style="width:68px;height:44px;flex:0 0 68px"></span>`);
    }, /position 1 is blank/);
    // P11b — F1: seven blanks of eight would put four in a row on every draw -> the build refuses
    throwPoison('P11b F1 four blanks in a row (blank:7) refused at build', 'write', { cfg: { ...(faceSpec('write') || { difficulty: { 2: {} } }).difficulty[2], given: 1, blank: 7 } }, null, /no blank set satisfies/);
    // P11c — F1: a hand-edited given literal ("3." on an en page): the page check passes (carries 3), the bank check must not
    facePoison('P11c F1 given literal 3. on an en page', 'write', (html) => {
      const m = html.match(/data-lcs-given="(\d)(st|nd|rd|th)" (data-lcs-box="\d+" style="[^"]*">)\1(st|nd|rd|th)</);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (given literal)');
      return html.replace(m[0], `data-lcs-given="${m[1]}." ${m[3]}${m[1]}.<`);
    }, /the bank says/);
    // P11d — F1: a blank cell printing its answer
    facePoison('P11d F1 a blank cell prints its answer', 'write', (html) => {
      const m = html.match(/<span class="ws-blankbox" data-lcs-box="(\d+)" data-lcs-answer="([^"]+)"[^>]*>/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (blank cell)');
      return html.replace(m[0], m[0] + m[2]);
    }, /prints/);
    // P12 — F3: a query noun absent from its strip
    facePoison('P12 F3 query noun absent from its strip', 'where', once(/data-lcs-query data-lcs-noun="[^"]+"/, () => 'data-lcs-query data-lcs-noun="zzz"'), /occurs 0x/);
    // P12b — F3: a lookalike pair seated in one strip (order + tile stamps rewritten together)
    facePoison('P12b F3 lookalikes jaguar + leopard in one strip', 'where', (html) => {
      const m = html.match(/data-lcs-order="([^"]+)"/);
      const o = m[1].split(',');
      const a = o[0], b = o[1];
      let out = html.replace(m[0], `data-lcs-order="${['jaguar', 'leopard', ...o.slice(2)].join(',')}"`);
      out = once(new RegExp(`data-lcs-idx="0" data-lcs-noun="${a}"`), () => 'data-lcs-idx="0" data-lcs-noun="jaguar"')(out);
      out = once(new RegExp(`data-lcs-idx="1" data-lcs-noun="${b}"`), () => 'data-lcs-idx="1" data-lcs-noun="leopard"')(out);
      return out;
    }, /lookalikes .* share a strip/, null, 'animals');
    // P12c — F3: the clone shows a different picture than the strip tile
    facePoison('P12c F3 clone src != tile src', 'where', (html) => {
      const srcs = [...html.matchAll(/<img class="ws-icon" src="([^"]+)"/g)].map((m) => m[1]);
      const q = html.match(/<span data-lcs-query [^>]*>[\s\S]*?<img class="ws-icon" src="([^"]+)"/);
      if (!q) throw new Error('NEEDLE MATCHED NOTHING (query img)');
      const other = srcs.find((s) => s !== q[1]);
      return html.replace(q[0], q[0].replace(q[1], other));
    }, /clone src != /);
    // P17 — F2: fi at 22 px (the design's measurement: 660 > 647); the same block at 20 px is the control
    poisons.push({ name: 'P17 fi F2 chips at 22 px', run: async () => {
      const fi = clone(cfg);
      fi.notation = {}; for (let k = 1; k <= 10; k++) fi.notation[k] = k + '.';
      fi.words = ['ensimmäinen', 'toinen', 'kolmas', 'neljäs', 'viides', 'kuudes', 'seitsemäs', 'kahdeksas', 'yhdeksäs', 'kymmenes'].map((m, i) => ({ k: i + 1, m, f: null }));
      const at22 = await worstWordRow(page, fi, 22, 5), at20 = await worstWordRow(page, fi, 20, 5);
      console.log(`    (fi worst 5-of-8 row: ${at22} px at 22, ${at20} px at 20; lane ${LANE_INNER})`);
      if (!(at20 <= LANE_INNER)) return 'control failed: fi at 20 px = ' + at20;
      return at22 > LANE_INNER ? null : 'silent (fi at 22 px measured ' + at22 + ')';
    } });
    // P22 — F2: the chips in position order
    facePoison('P22 F2 chips in position order', 'words', (html) => {
      const m = html.match(/<div class="ws-achips" data-lcs-bank[^>]*>([\s\S]*?)<\/div>/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (bank row)');
      const chips = [...m[1].matchAll(/<span class="ws-achip" data-lcs-word-k="(\d+)"[^>]*>[^<]*<\/span>/g)].map((x) => [+x[1], x[0]]).sort((a, b) => a[0] - b[0]);
      return html.replace(m[0], m[0].replace(m[1], chips.map((c) => c[1]).join('')));
    }, /position order/);
    // P23 — F2: a word chip inside a tile
    facePoison('P23 F2 a word chip inside a tile', 'words', (html) => {
      const chip = html.match(/<span class="ws-achip" data-lcs-word-k="\d+"[^>]*>[^<]*<\/span>/);
      if (!chip) throw new Error('NEEDLE MATCHED NOTHING (chip)');
      return once(/(<span data-lcs-idx="0"[^>]*>)/, (m0, open) => open + chip[0])(html.replace(chip[0], ''));
    }, /inside a tile|carries text|outside the bank/);
    // P24 — F2: a chip printing a word the bank does not have for its k
    facePoison('P24 F2 chip text != the bank word', 'words', once(/(data-lcs-word-k="\d+"[^>]*>)[^<]+</, (m0, open) => open + 'twelfth<'), /the bank says/);
    // P25 — F5: two answers swapped
    facePoison('P25 F5 two rank answers swapped', 'race', (html) => {
      const boxes = [...html.matchAll(/data-lcs-rank-box data-lcs-answer="([^"]+)"/g)].map((m) => m[1]);
      if (boxes.length < 2) throw new Error('NEEDLE MATCHED NOTHING (rank boxes)');
      let n = 0;
      return html.replace(/data-lcs-rank-box data-lcs-answer="([^"]+)"/g, (m) => { n++; return n === 1 ? `data-lcs-rank-box data-lcs-answer="${boxes[1]}"` : n === 2 ? `data-lcs-rank-box data-lcs-answer="${boxes[0]}"` : m; });
    }, /does not carry rank|the bank says .* for rank/);
    // P26 — F5: a non-racer theme refused at build
    throwPoison('P26 F5 theme fruits refused at build', 'race', null, 'fruits', /not a racer/);
    // P27 — F5: a runner that the bank says faces left drawn unmirrored
    facePoison('P27 F5 left-facing art not mirrored', 'race', (html) => {
      if (!/ data-lcs-mirror="1"/.test(html)) throw new Error('NEEDLE MATCHED NOTHING (no mirrored runner on the page)');
      return once(/ data-lcs-mirror="1"/, () => '')(html).replace(/;transform:scaleX\(-1\)/, '');
    }, /not mirrored, the bank says it faces left/);
    // P28 — F5: the runner drawn at a different x than stamped (the verify re-measures the picture)
    facePoison('P28 F5 runner drawn 40 px off its stamp', 'race', once(/data-lcs-x="(\d+)"([\s\S]*?)left:(\d+)px/, (m, x, mid, left) => `data-lcs-x="${x}"${mid}left:${+left + 40}px`), /drawn at .* stamped x=/);
    // P29 — F4 (K-336 itself): the page claims mixed while every flag stands left
    poisons.push({ name: 'P29 K-336 every flag left under start:mixed', run: async () => {
      const spec = faceSpec('mixed');
      if (!spec) return 'face spec missing';
      const r = await renderCheck(page, spec, null, { theme: ex, difficulty: 2, locale: loc, baseName: 'K-320-poison-p29' }, { post: (h) => h.replace(/data-lcs-start="right"/g, 'data-lcs-start="left"').replace(/data-lcs-arrow="right"/g, 'data-lcs-arrow="left"') });
      return r.fails.some((x) => /not both sides|formula says|arrow drawn/.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    // P30 — F1: a G1 face squashed below the G1 floor
    facePoison('P30 F1 pictures squashed to 40', 'write', (html) => html.replace(/width:60px;height:60px/g, 'width:40px;height:40px'), /< floor 44|config says 60/);
    // P31 — bank: a lookalike group naming a noun the theme does not have
    bankPoison('P31 lookalike group with an unknown noun', (() => { const b = clone(cfg); b.lookalikes.animals = [['jaguar', 'unicorn']]; return b; })(), 'en', /lookalike .* not in the/);
    // P32 — bank: fruits listed as a racer
    bankPoison('P32 fruits listed as a racer', (() => { const b = clone(cfg); b.racers = b.racers.concat(['fruits']); return b; })(), 'en', /racer/);
    // P33 — bank: a facing value outside left/right/front
    bankPoison('P33 facing value "up"', (() => { const b = clone(cfg); b.facing.animals.duck = 'up'; return b; })(), 'en', /facing/);

    let killed = 0;
    for (const p of poisons) {
      let res; try { res = await p.run(); } catch (e) { res = 'threw ' + e.message; }
      const ok = res === null;
      if (ok) killed++;
      console.log(`[D] ${p.name}: ${ok ? 'KILLED' : 'SURVIVED — ' + res}`);
    }
    for (const d of deferred) console.log(`[D] ${d}: DEFERRED (Phase-2 face code; not counted)`);
    assertions += _assertionsExtra;
    note(killed === poisons.length, `${poisons.length - killed} poison(s) survived`);
    const verdict = failures.length === 0;
    if (failures.length) console.log('FAILS:\n  ' + failures.join('\n  '));
    console.log(`K-320 gate (base + 5 faces): ${verdict ? 'PASS' : 'FAIL'} (${assertions} assertions, ${killed}/${poisons.length} poisons killed${failures.length ? ', ' + failures.length + ' failures' : ''})`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { checkBank, FAN_THEMES, LONG_CHROME, WORST_CHROME, FACE_IDS, worstWordRow };
