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
 *      DEFERRED to the Phase-2 faces (they need face code the base does not
 *      carry): P5 F5 runners 30 px apart · P11 F1 position 1 blank · P12 F3 query
 *      noun absent · P17 fi F2 at 22 px. Printed as DEFERRED, never counted.
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
    const deferred = ['P5 F5 two runners 30 px apart', 'P11 F1 position 1 blank', 'P12 F3 query noun absent from its strip', 'P17 fi F2 chips at 22 px'];
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

    let killed = 0;
    for (const p of poisons) {
      let res; try { res = await p.run(); } catch (e) { res = 'threw ' + e.message; }
      const ok = res === null;
      if (ok) killed++;
      console.log(`[D] ${p.name}: ${ok ? 'KILLED' : 'SURVIVED — ' + res}`);
    }
    for (const d of deferred) console.log(`[D] ${d}: DEFERRED (Phase-2 face code; not counted)`);
    note(killed === poisons.length, `${poisons.length - killed} poison(s) survived`);
    const verdict = failures.length === 0;
    if (failures.length) console.log('FAILS:\n  ' + failures.join('\n  '));
    console.log(`K-320 gate: ${assertions} assertions, ${failures.length} failures, poisons ${killed}/${poisons.length} killed (${deferred.length} deferred to the faces) → ${verdict ? 'PASS' : 'FAIL'}`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { checkBank, FAN_THEMES, LONG_CHROME, WORST_CHROME };
