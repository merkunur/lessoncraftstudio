#!/usr/bin/env node
/**
 * verify-b3-read-and-do.js — the G1-308 `read-and-do` gate (design §5).
 *
 *   node qa/verify-b3-read-and-do.js [--quick] [--locales=en] [--themes=a,b] [--seeds=N]
 *
 * Own ground truth: the gate reads data/b3/instructions.js DIRECTLY (never the
 * spec's helpers), carries its OWN copy of the slot→form rule + fillSlots
 * re-fill (lib/b3-instructions.js), re-implements the validator's instruction
 * rules (§5 rules 1-9) for ANY locale block, and renders through the REAL
 * pipeline (render/render-instance.js, file:// fonts). Every page stamp is
 * diffed against the gate's own derivation — "diff, not trust".
 *
 * Sections
 *   A  bank data (per locale block present): the six verb frames (ids, one
 *      object slot / line two / write {pl}|{part}, capital, full stop, no
 *      colour verb, no {name}); objForms per fan theme (usable = reviewed +
 *      unique/all/pl; < 8 = REFUSED, reported; a FAIL for en); ord 2..5; fixed
 *      phrases + slots; endpointForm per locale; sv/da/no `def` + no indefinite
 *      `unique`; de `dat` vs DE_DATIVE_SG (parsed from lcs-grammar.js); fi `part`
 *      vs sentences.js partitive + `gen` vs FI_GENITIVES + write {part}; a
 *      500-sentence sample per theme through fillSlots (no {, no double space,
 *      no " .", capital, ".", <= 96 chars); truth ≥ 8 / draw ≥ 4; strings
 *      (title <= 70, no worksheet word, unique; instruction <= 150; no free
 *      claim). The spec's i18n.en must equal strings['G1-308'].
 *   B  pools: every fan theme >= 8 countable entries in all 11 locales
 *      (measured); every en picture on disk; no BW marker; the lookalike table's
 *      nouns are real vocab keys.
 *   C  renders: fan themes × d2, the exemplar × d1/d3, LONG chrome (3-line title
 *      + 150-char instruction) × d1-d3, WORST chrome (a 3-line instruction) ×
 *      d1-d3, seed sweep on the exemplar × d1/d2/d3. Each render: lints clean ·
 *      verify() empty · pictures === cfg.pic and >= 44 (G1 floor) · tiles >= 44 ·
 *      strip <= 647 inside its lane · answer boxes >= 44 high · done boxes 28 ·
 *      every text node clientHeight <= 50 and scrollWidth <= clientWidth · rows
 *      inside the body · Node-side re-fill of EVERY data-lcs-text from the bank
 *      · no lookalike pair on the strip · non-vacuity. Sweep: every config verb
 *      appears, every config cue is asked, write answers not constant, first AND
 *      last both occur, every ordinal k inside 2..ordMax (the k set is printed).
 *   D  poisons (each must FAIL; control = the correct bank + page): P1 two rows
 *      on one tile · P2 ordinal:3 over two cats · P3 de dat "dem Elefant" · P4
 *      sv unique "en hund" on the base · P6 "zoo animals bw" refused · P7 double
 *      space · P9 fi write on clothing (no partitive) · P10 a line row with one
 *      noun twice · P11 a 97-char de sentence · P12 the old 760 stack under the
 *      worst chrome · P13 a hand-edited noun (the node-side re-fill) · P14
 *      pictures squashed · P15 blank list · P16 unfilled slot · P17 a numeral in a
 *      tile · P18 a wrong write answer · P19 a wrong target stamp · P20 a
 *      lookalike pair on one strip · P21 a colour verb in a frame · P22 a
 *      worksheet-word title. DEFERRED (need face code): P5 F4 false statement
 *      about an absent noun · P8 F2 both clauses circle.
 * Exit 1 on any real failure OR any silent poison.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { entriesFor, countable, fileUri, vocab } = require('../lib/b2-common.js');
const { fillSlots, slotsIn } = require('../lib/b3-instructions.js');
const { SENTENCES } = require('../data/b2/sentences.js');
const GRAMMAR = require('../../../REFERENCE TRANSLATIONS/lcs-grammar.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'dev', 'g1308-gate');
const BANK_FILE = path.join(ROOT, 'data', 'b3', 'instructions.js');
const GRAMMAR_FILE = path.join(ROOT, '..', '..', 'REFERENCE TRANSLATIONS', 'lcs-grammar.js');

const FAN_THEMES = ['animals', 'fruits', 'vehicles', 'toys', 'zoo animals', 'farm animals'];
const EXEMPLAR = 'animals';
const ALL_LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MIN_NOUNS = 8;
const LANE_INNER = 647;
const PIC_FLOOR = 44;    // G1 band floor (_tokens.js density.G1.minElement)
const BOX_FLOOR = 44;
const DONE_BOX = 28;
const TEXT_MAX_H = 50;
const SENTENCE_CAP = 96;
const BW_MARK = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;
const VERB_IDS = ['circle', 'cross', 'underline', 'line', 'mark', 'write'];
const OBJ_SLOTS = { obj: 'unique', all: 'unique', allDef: 'def', def: 'def', dat: 'dat', gen: 'gen' };
const SECOND_SLOTS = { obj2: 'unique', dat2: 'dat', def2: 'def', a2: 'a2' };
const COUNT_SLOTS = { pl: 'pl', part: 'part' };
const DEF_LOCALES = new Set(['sv', 'da', 'no']);
const ENDPOINT_BY_LOCALE = { de: 'dat', fi: 'gen', sv: 'def', da: 'def', no: 'def' };
const INDEF_ARTICLE = { sv: /^(en|ett)\s/i, da: /^(en|et)\s/i, no: /^(en|ei|et)\s/i };
const COLOUR_VERB = /(?<!\p{L})(colou?r|malen?|male|colorie[rz]?|colorea|colorir|pinte|pintar|colora|colorare|kleur(en)?|måla|farvelæg|fargelegg|väritä|värittää)(?!\p{L})/iu;
const WORKSHEET_WORD = /\b(worksheet|arbeitsblatt|hoja de trabajo|folha de exerc|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtäväpaperi)/i;
const FREE_CLAIM = /\bfree\b|kostenlos|gratis|gratuit|ilmainen|gratuito/i;
const TRUTH_CUES = new Set(['count', 'first', 'last', 'ordinal', 'rightof', 'leftof', 'between', 'position']);

// LONG chrome: a 70-char title (3 lines at ~24 chars/line) + a 150-char instruction (2 lines at ~76 chars/line)
const LONG_CHROME = {
  title: 'Read and Do for Beginners: Follow Every Instruction in the Picture Row',
  instruction: 'Look at the row of pictures and start at the flag. Read each sentence carefully and do exactly what it says with your pencil, then check the box.',
};
// WORST chrome: a legal (<= 150) German instruction whose long words wrap it to THREE lines -> the 710 floor
const WORST_CHROME = {
  title: 'Lesen und Verstehen: Befolge jede Anweisung in der langen Bilderreihe',
  instruction: 'Betrachte die Bilderreihe und beginne bei der Startfahne. Lies jeden Anweisungssatz aufmerksam und führe ihn mit dem Bleistift genau aus. Hake ab.',
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
function deDativeTable() {
  const src = fs.readFileSync(GRAMMAR_FILE, 'utf8');
  const m = src.match(/var DE_DATIVE_SG = \{([\s\S]*?)\};/);
  if (!m) throw new Error('DE_DATIVE_SG not found in lcs-grammar.js');
  const t = {};
  m[1].replace(/'([^']+)':\s*'([^']+)'/g, (_, k, v) => { t[k] = v; return _; });
  if (Object.keys(t).length < 30) throw new Error('DE_DATIVE_SG parsed ' + Object.keys(t).length + ' keys (needle drift)');
  return t;
}

/* ---------------- the gate's OWN slot→form + re-fill (mirrors the bank header, never the spec) ---------------- */
function planOf(frame) {
  const plan = { obj: null, second: null, count: null, bad: null };
  for (const s of slotsIn(frame)) {
    if (s in OBJ_SLOTS) { if (plan.obj) plan.bad = 'two object slots'; plan.obj = s; }
    else if (s in SECOND_SLOTS) { if (plan.second) plan.bad = 'two second slots'; plan.second = s; }
    else if (s in COUNT_SLOTS) { if (plan.count) plan.bad = 'two count slots'; plan.count = s; }
    else plan.bad = 'unknown slot {' + s + '}';
  }
  return plan;
}
function usable(f) { return !!(f && f.reviewed === true && f.unique && f.all && f.pl); }
function refill(bankLoc, action, cue, k, noun, noun2) {
  const verb = (bankLoc.verbs || []).find((v) => v.id === action);
  if (!verb) return null;
  const plan = planOf(verb.frame);
  if (plan.bad) return null;
  const F = bankLoc.objForms || {};
  const ep = bankLoc.endpointForm || 'unique';
  const slots = {};
  const kind = String(cue).split(':')[0];
  if (action === 'write') {
    const v = usable(F[noun]) ? F[noun][COUNT_SLOTS[plan.count]] : null;
    if (!v) return null;
    slots[plan.count] = v;
  } else {
    let v = null;
    if (kind === 'unique') v = usable(F[noun]) ? F[noun][OBJ_SLOTS[plan.obj]] : null;
    else if (kind === 'all') v = usable(F[noun]) ? (plan.obj === 'allDef' ? F[noun].allDef : F[noun].all) : null;
    else if (kind === 'ordinal') v = usable(F[noun]) && F[noun].ord ? F[noun].ord[k] : null;
    else if (kind === 'first' || kind === 'last') v = bankLoc.fixed && bankLoc.fixed[kind];
    else if (kind === 'between') { const A = F[noun] && F[noun][ep], B = F[noun2] && F[noun2][ep]; v = bankLoc.fixed && bankLoc.fixed.between && A && B ? fillSlots(bankLoc.fixed.between, { A, B }) : null; }
    else if (kind === 'rightof' || kind === 'leftof') { const A = F[noun] && F[noun][ep]; v = bankLoc.fixed && bankLoc.fixed[kind] && A ? fillSlots(bankLoc.fixed[kind], { A }) : null; }
    if (!v) return null;
    slots[plan.obj] = v;
    if (plan.second) { const v2 = usable(F[noun2]) ? F[noun2][SECOND_SLOTS[plan.second]] : null; if (!v2) return null; slots[plan.second] = v2; }
  }
  try { return fillSlots(verb.frame, slots); } catch (e) { return null; }
}

/* ---------------- A. bank data (pure node; any locale block) ---------------- */
function checkBank(cfg, loc, spec, opts = {}) {
  const F = [];
  const L = String(loc);
  const themes = opts.themes || FAN_THEMES;
  // verbs
  const verbs = Array.isArray(cfg.verbs) ? cfg.verbs : [];
  const ids = verbs.map((v) => v.id);
  if (ids.slice().sort().join(',') !== VERB_IDS.slice().sort().join(',')) F.push(`A ${L}: verb ids are ${ids.join(',')}, want ${VERB_IDS.join(',')}`);
  const plans = {};
  for (const v of verbs) {
    const p = planOf(String(v.frame || ''));
    plans[v.id] = p;
    if (p.bad) F.push(`A ${L}: frame "${v.frame}" — ${p.bad}`);
    if (v.id === 'write' && !(p.count && !p.obj && !p.second)) F.push(`A ${L}: write frame "${v.frame}" must carry exactly {pl} or {part}`);
    if (v.id === 'line' && !(p.obj && p.second && !p.count)) F.push(`A ${L}: line frame "${v.frame}" must carry one object + one second slot`);
    if (!['write', 'line'].includes(v.id) && !(p.obj && !p.second && !p.count)) F.push(`A ${L}: frame "${v.frame}" must carry exactly one object slot`);
    if (!/^\p{Lu}/u.test(v.frame || '')) F.push(`A ${L}: frame "${v.frame}" does not start with a capital`);
    if (!/\.$/.test(v.frame || '')) F.push(`A ${L}: frame "${v.frame}" does not end with a full stop`);
    if (COLOUR_VERB.test(v.frame || '')) F.push(`A ${L}: frame "${v.frame}" carries a colour verb`);
    if (/\{name\}/.test(v.frame || '')) F.push(`A ${L}: frame "${v.frame}" carries {name}`);
    if (L === 'fi' && v.id === 'write' && p.count !== 'part') F.push('A fi: the write frame must take {part} (partitive after montako)');
  }
  // fixed + endpointForm
  const fx = cfg.fixed || {};
  for (const k of ['first', 'last', 'between', 'rightof', 'leftof']) if (!fx[k]) F.push(`A ${L}: fixed.${k} missing`);
  if (fx.between && slotsIn(fx.between).sort().join(',') !== 'A,B') F.push(`A ${L}: fixed.between must carry {A} and {B}`);
  for (const k of ['rightof', 'leftof']) if (fx[k] && slotsIn(fx[k]).join(',') !== 'A') F.push(`A ${L}: fixed.${k} must carry exactly {A}`);
  for (const k of ['first', 'last']) if (fx[k] && slotsIn(fx[k]).length) F.push(`A ${L}: fixed.${k} carries a slot`);
  for (let k = 2; k <= 8; k++) if (!(fx.ordPic && fx.ordPic[k])) F.push(`A ${L}: fixed.ordPic[${k}] missing`);
  const ep = cfg.endpointForm;
  if (!['unique', 'dat', 'gen', 'def'].includes(ep)) F.push(`A ${L}: endpointForm "${ep}"`);
  if (ENDPOINT_BY_LOCALE[L] && ep !== ENDPOINT_BY_LOCALE[L]) F.push(`A ${L}: endpointForm must be ${ENDPOINT_BY_LOCALE[L]}`);
  if (!ENDPOINT_BY_LOCALE[L] && ep !== 'unique') F.push(`A ${L}: endpointForm must be unique`);
  if (!['keep', 'lower'].includes(cfg.nounCase)) F.push(`A ${L}: nounCase "${cfg.nounCase}"`);
  if (!['check', 'cross'].includes(cfg.mark)) F.push(`A ${L}: mark "${cfg.mark}"`);
  if (cfg.cross !== 'strike') F.push(`A ${L}: cross "${cfg.cross}"`);
  if (!cfg.and) F.push(`A ${L}: and literal missing`);
  if (!FAN_THEMES.includes(cfg.exemplar)) F.push(`A ${L}: exemplar "${cfg.exemplar}" is not a fan theme`);
  // objForms per theme
  const OF = cfg.objForms || {};
  const deTable = L === 'de' ? deDativeTable() : null;
  const fiPart = L === 'fi' ? ((SENTENCES.fi && SENTENCES.fi.nounForms && SENTENCES.fi.nounForms.partitive) || {}) : null;
  const refused = [];
  const rng = (() => { let a = 7; return () => { a = (a * 1103515245 + 12345) & 0x7fffffff; return a / 0x7fffffff; }; })();
  for (const theme of themes) {
    const keys = entriesFor(theme, L).filter(countable).map((e) => e.vocabKey);
    const ok = keys.filter((k) => usable(OF[k]));
    if (ok.length < MIN_NOUNS) { refused.push(`${theme} (${ok.length} usable of ${keys.length})`); continue; }
    for (const k of ok) {
      const f = OF[k];
      for (let o = 2; o <= 5; o++) if (!(f.ord && f.ord[o])) F.push(`A ${L}: objForms.${k}.ord[${o}] missing`);
      for (const [name, val] of Object.entries(f)) if (name !== 'reviewed' && name !== 'ord' && val != null && typeof val !== 'string') F.push(`A ${L}: objForms.${k}.${name} is not a string`);
      if (/\{/.test(Object.values(f).filter((x) => typeof x === 'string').join(' '))) F.push(`A ${L}: objForms.${k} carries a slot`);
      if (DEF_LOCALES.has(L)) {
        if (!f.def) F.push(`A ${L}: objForms.${k}.def missing — a def-taking cue (unique/all/line/mark/between) cannot use it on the base`);
        if (INDEF_ARTICLE[L].test(f.unique)) F.push(`A ${L}: objForms.${k}.unique "${f.unique}" opens with an indefinite article — the base needs the definite form (F1 only until def exists)`);
      }
      if (L === 'de' && deTable[k]) {
        if (!f.dat) F.push(`A de: objForms.${k}.dat missing`);
        else if (!new RegExp('(^|\\s)' + deTable[k].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$').test(f.dat)) F.push(`A de: objForms.${k}.dat "${f.dat}" != the DE_DATIVE_SG form "${deTable[k]}" (weak noun)`);
      }
      if (L === 'fi') {
        if (fiPart[k] && f.part !== fiPart[k]) F.push(`A fi: objForms.${k}.part "${f.part}" != sentences.js partitive "${fiPart[k]}"`);
        if (GRAMMAR.FI_GENITIVES[k] && f.gen && f.gen !== GRAMMAR.FI_GENITIVES[k].gen) F.push(`A fi: objForms.${k}.gen "${f.gen}" != FI_GENITIVES "${GRAMMAR.FI_GENITIVES[k].gen}"`);
      }
    }
    // 500-sentence sample through fillSlots over this theme's usable nouns
    let sampled = 0, guard = 0;
    while (sampled < 500 && guard++ < 5000) {
      const v = verbs[Math.floor(rng() * verbs.length)];
      if (!v || plans[v.id].bad) break;
      const a = ok[Math.floor(rng() * ok.length)], b = ok[Math.floor(rng() * ok.length)];
      const cues = v.id === 'write' ? ['count'] : v.id === 'line' ? ['unique'] : ['unique', 'all', 'ordinal:2', 'ordinal:3', 'ordinal:4', 'ordinal:5', 'first', 'last', 'between', 'rightof', 'leftof'];
      const cue = cues[Math.floor(rng() * cues.length)];
      const k = cue.startsWith('ordinal') ? +cue.split(':')[1] : null;
      const text = refill(cfg, v.id, cue, k, a, a === b ? ok[(ok.indexOf(a) + 1) % ok.length] : b);
      if (text == null) continue;
      sampled++;
      if (/\{/.test(text)) F.push(`A ${L}: "${text}" has an unfilled slot`);
      if (/  /.test(text)) F.push(`A ${L}: "${text}" has a double space`);
      if (/ \./.test(text)) F.push(`A ${L}: "${text}" has a space before the full stop`);
      if (!/^\p{Lu}/u.test(text)) F.push(`A ${L}: "${text}" does not start with a capital`);
      if (!/\.$/.test(text)) F.push(`A ${L}: "${text}" does not end with a full stop`);
      if ([...text].length > SENTENCE_CAP) F.push(`A ${L}: "${text}" is ${[...text].length} chars > ${SENTENCE_CAP} (the panel rewrites; code never shortens)`);
    }
    if (sampled < 100) F.push(`A ${L}: ${theme} — only ${sampled} sentences could be filled (the frames/forms do not compose)`);
  }
  if (refused.length) {
    const msg = `A ${L}: REFUSED themes (< ${MIN_NOUNS} usable nouns): ${refused.join('; ')}`;
    if (L === 'en' || refused.length === themes.length) F.push(msg); else console.log('  [A] ' + msg + ' (reported)');
  }
  // truth + draw (Phase 2 data, shape-gated now)
  const tr = cfg.truth || {};
  const tf = Array.isArray(tr.frames) ? tr.frames : [];
  if (tf.length < 8) F.push(`A ${L}: truth.frames ${tf.length} < 8`);
  for (const f of tf) if (!TRUTH_CUES.has(f.cue)) F.push(`A ${L}: truth frame "${f.text}" has no evaluable cue`);
  if (!tr.yes || !tr.no || tr.yes === tr.no) F.push(`A ${L}: truth.yes/no missing or equal`);
  for (const v of verbs) { const head = String(v.frame).split(/\s/)[0].toLowerCase(); if (tr.yes && tr.yes.toLowerCase() === head) F.push(`A ${L}: truth.yes is a verb`); if (tr.no && tr.no.toLowerCase() === head) F.push(`A ${L}: truth.no is a verb`); }
  const dr = Array.isArray(cfg.draw) ? cfg.draw : [];
  if (dr.length < 4) F.push(`A ${L}: draw ${dr.length} < 4`);
  for (const d of dr) { const s = slotsIn(d.text || ''); if (!s.includes('n') || !s.includes('pl')) F.push(`A ${L}: draw frame "${d.text}" lacks {n} + {pl}`); if (COLOUR_VERB.test(d.text || '')) F.push(`A ${L}: draw frame carries a colour verb`); }
  // strings
  const S = cfg.strings || {};
  const faces = ['G1-308', 'F1', 'F2', 'F3', 'F4', 'F5'];
  const titles = [];
  for (const f of faces) {
    const s = S[f];
    if (!s || !s.title || !s.instruction) { F.push(`A ${L}: strings.${f} missing title/instruction`); continue; }
    if ([...s.title].length > 70) F.push(`A ${L}: ${f} title ${[...s.title].length} > 70`);
    if (WORKSHEET_WORD.test(s.title)) F.push(`A ${L}: ${f} title carries the worksheet word`);
    if ([...s.instruction].length > 150) F.push(`A ${L}: ${f} instruction ${[...s.instruction].length} > 150`);
    if (/\{[A-Za-z]+\}/.test(s.instruction + s.title)) F.push(`A ${L}: ${f} carries a slot`);
    if (COLOUR_VERB.test(s.title)) F.push(`A ${L}: ${f} title carries a colour verb`);
    if (FREE_CLAIM.test(s.title + ' ' + s.instruction)) F.push(`A ${L}: ${f} copy claims free`);
    titles.push(s.title.toLowerCase());
  }
  if (new Set(titles).size !== titles.length) F.push(`A ${L}: face titles repeat`);
  if (spec && L === 'en' && S['G1-308'] && (S['G1-308'].title !== spec.i18n.en.title || S['G1-308'].instruction !== spec.i18n.en.instruction)) F.push('A en: strings[G1-308] != the spec i18n.en (two sources)');
  if (JSON.stringify(cfg).includes('{name}')) F.push(`A ${L}: a {name} slot exists in the block`);
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
  const m = await page.evaluate(({ pic, tile, picFloor, boxFloor, doneBox, textMaxH, laneInner }) => {
    const res = { fails: [], rows: [], strip: [], body: 0, instrLines: 0, tiles: 0 };
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.instrLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    const root = document.querySelector('[data-lcs-rad]');
    if (!root) { res.fails.push('no root'); return res; }
    res.strip = (root.dataset.lcsStrip || '').split(',').filter(Boolean);
    res.theme = root.dataset.lcsTheme;
    const lane = root.querySelector('[data-lcs-panel]');
    if (!lane) res.fails.push('no strip panel');
    else {
      const lb = lane.getBoundingClientRect();
      if (lb.top < body.top - 0.6 || lb.bottom > body.bottom + 0.6 || lb.left < body.left - 0.6 || lb.right > body.right + 0.6) res.fails.push('strip panel outside the body');
      const inner = { left: lb.left + 14, right: lb.right - 14 };
      const strip = lane.querySelector('[data-lcs-lineup]');
      if (!strip) res.fails.push('no line-up block');
      else {
        const sb = strip.getBoundingClientRect();
        if (sb.width > laneInner + 0.6) res.fails.push(`strip ${sb.width.toFixed(1)} > ${laneInner}`);
        if (sb.left < inner.left - 0.6 || sb.right > inner.right + 0.6) res.fails.push('strip outside the lane padding');
        if (sb.top < lb.top || sb.bottom > lb.bottom) res.fails.push('strip outside its lane');
      }
      res.laneH = Math.round(lb.height);
    }
    const tiles = [...root.querySelectorAll('[data-lcs-idx]')];
    res.tiles = tiles.length;
    tiles.forEach((t, j) => {
      const tr = t.getBoundingClientRect();
      if (tr.width < picFloor - 0.6 || tr.height < picFloor - 0.6) res.fails.push(`tile ${j} ${tr.width.toFixed(1)}x${tr.height.toFixed(1)} < floor ${picFloor}`);
      if (Math.abs(tr.width - tile) > 0.6) res.fails.push(`tile ${j} ${tr.width.toFixed(1)} wide, config says ${tile}`);
      const img = t.querySelector('img');
      const r = img ? img.getBoundingClientRect() : { width: 0, height: 0 };
      if (Math.abs(r.height - pic) > 0.6 || Math.abs(r.width - pic) > 0.6) res.fails.push(`picture ${j} ${r.width.toFixed(1)}x${r.height.toFixed(1)}, config says ${pic}`);
      if (r.height < picFloor - 0.6) res.fails.push(`picture ${j} ${r.height.toFixed(1)} < G1 floor ${picFloor}`);
    });
    const list = root.querySelector('[data-lcs-list]');
    if (!list) res.fails.push('no instruction list');
    else {
      const lr = list.getBoundingClientRect();
      if (lr.bottom > body.bottom + 0.6 || lr.top < body.top - 0.6) res.fails.push('list outside the body');
      if (lane && lr.top < lane.getBoundingClientRect().bottom - 0.6) res.fails.push('list overlaps the strip panel');
    }
    [...root.querySelectorAll('[data-lcs-row]')].forEach((r, i) => {
      const R = `row ${i + 1}`;
      const rb = r.getBoundingClientRect();
      if (rb.bottom > body.bottom + 0.6 || rb.right > body.right + 0.6 || rb.left < body.left - 0.6) res.fails.push(`${R}: outside the body`);
      const p = r.querySelector('[data-lcs-textnode]');
      if (!p) res.fails.push(`${R}: no text node`);
      else {
        if (p.clientHeight > textMaxH) res.fails.push(`${R}: text ${p.clientHeight}px high > ${textMaxH} (three lines)`);
        if (p.scrollWidth > p.clientWidth + 0.6) res.fails.push(`${R}: text overflows its column (${p.scrollWidth} > ${p.clientWidth})`);
        const pr = p.getBoundingClientRect();
        if (pr.bottom > rb.bottom + 0.6 || pr.top < rb.top - 0.6) res.fails.push(`${R}: text outside its row`);
        res.textW = res.textW || Math.round(pr.width);
      }
      const box = r.querySelector('.ws-answerbox');
      if (box) { const b = box.getBoundingClientRect(); if (b.height < boxFloor - 0.6) res.fails.push(`${R}: answer box ${b.height.toFixed(1)} < ${boxFloor}`); if (b.right > rb.right - 8) res.fails.push(`${R}: answer box outside the row`); }
      const done = r.querySelector('[data-lcs-done]');
      if (!done) res.fails.push(`${R}: no done box`);
      else { const b = done.getBoundingClientRect(); if (Math.abs(b.height - doneBox) > 0.6 || Math.abs(b.width - doneBox) > 0.6) res.fails.push(`${R}: done box ${b.width.toFixed(1)}x${b.height.toFixed(1)} != ${doneBox}`); }
      res.rows.push({ action: r.dataset.lcsAction, cue: r.dataset.lcsCue, k: r.dataset.lcsK ? +r.dataset.lcsK : null, noun: r.dataset.lcsNoun, noun2: r.dataset.lcsNoun2, targets: r.dataset.lcsTargets, text: r.dataset.lcsText, answer: box ? box.dataset.lcsAnswer : null, h: Math.round(rb.height) });
    });
    return res;
  }, { pic: cfg.pic, tile: cfg.tile, picFloor: PIC_FLOOR, boxFloor: BOX_FLOOR, doneBox: DONE_BOX, textMaxH: TEXT_MAX_H, laneInner: LANE_INNER });
  fails.push(...m.fails.map((x) => 'size: ' + x));
  if (m.tiles !== cfg.pics) fails.push(`count: ${m.tiles} tiles, config says ${cfg.pics}`);
  if (m.rows.length !== cfg.rows) fails.push(`count: ${m.rows.length} rows, config says ${cfg.rows}`);
  if (job.strings === WORST_CHROME && m.body > WORST_BODY) fails.push(`chrome: the 3-line/3-line body measured ${m.body}, the gate expected <= ${WORST_BODY} (re-measure the floor)`);
  if (job.strings === WORST_CHROME && m.instrLines < 3) fails.push(`chrome: WORST_CHROME wrapped to ${m.instrLines} instruction lines, not 3 (the probe is vacuous)`);
  // Node-side: every data-lcs-text re-fills from the bank through fillSlots (the page cannot require)
  const bankLoc = ((inj && inj.bank) || loadBank())[job.locale.slice(0, 2)];
  m.rows.forEach((r, i) => {
    const want = bankLoc ? refill(bankLoc, r.action, r.cue, r.k, r.noun, r.noun2) : null;
    if (want == null) fails.push(`refill: row ${i + 1} (${r.action}, ${r.cue}, ${r.noun}${r.noun2 ? ', ' + r.noun2 : ''}) has no legal sentence in the bank`);
    else if (want !== r.text) fails.push(`refill: row ${i + 1} prints "${r.text}", the bank fills "${want}"`);
  });
  // no lookalike pair on the strip (the spec's table is data; the rule is asserted here)
  const LK = type._LOOKALIKES || [];
  const groups = new Map();
  LK.forEach((g, gi) => g.forEach((n) => { (groups.get(n) || groups.set(n, []).get(n)).push(gi); }));
  const distinct = [...new Set(m.strip)];
  for (let a = 0; a < distinct.length; a++) for (let b = a + 1; b < distinct.length; b++) {
    const ga = groups.get(distinct[a]) || [], gb = groups.get(distinct[b]) || [];
    if (ga.some((g) => gb.includes(g))) fails.push(`lookalike: "${distinct[a]}" and "${distinct[b]}" share a strip`);
  }
  if (!m.rows.length) fails.push('non-vacuity: 0 rows checked');
  if (!m.tiles) fails.push('non-vacuity: 0 tiles checked');
  return { fails, rows: m.rows, strip: m.strip, body: m.body, instrLines: m.instrLines, laneH: m.laneH, textW: m.textW, pngPath: out.pngPath };
}

async function main() {
  const locales = arg('locales', 'en').split(',');
  const themesArg = arg('themes');
  const seeds = +arg('seeds', QUICK ? 6 : 20);
  const type = loadType('G1-308');
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
      assertions += 80;
      failures.push(...a);
      console.log(`[A] ${loc}: ${Object.keys(cfg.objForms || {}).length} object entries · ${a.length} data faults`);
      // ---- B
      const themes = themesArg ? themesArg.split(',') : FAN_THEMES;
      const V = vocab();
      for (const g of type._LOOKALIKES || []) for (const n of g) note(!!V[n], `lookalike table: "${n}" is not a vocab key`);
      for (const theme of themes) {
        note(!BW_MARK.test(theme), `theme "${theme}" carries a BW marker`);
        const counts = ALL_LOCALES.map((l) => entriesFor(theme, l).filter(countable).length);
        const min = Math.min(...counts);
        note(min >= MIN_NOUNS, `${theme}: min countable pool over 11 locales ${min} < ${MIN_NOUNS}`);
        let missing = 0;
        for (const e of entriesFor(theme, 'en')) if (!fs.existsSync(picPath(theme, e.noun))) missing++;
        note(missing === 0, `${theme}: ${missing} pictures missing on disk`);
        const usableN = entriesFor(theme, loc).filter(countable).filter((e) => usable((cfg.objForms || {})[e.vocabKey])).length;
        console.log(`[B] ${theme}: countable min ${min} (${counts.join(' ')}) · ${loc} usable ${usableN} · pictures missing ${missing}`);
      }
      // ---- C
      const ex = cfg.exemplar || EXEMPLAR;
      const renders = [];
      const sweepThemes = QUICK ? [ex, ...themes.filter((t) => t !== ex).slice(0, 2)] : themes;
      for (const theme of sweepThemes) renders.push({ theme, difficulty: 2, locale: loc, baseName: `G1-308-${theme}-d2-${loc}`, tag: 'theme' });
      for (const d of [1, 3]) renders.push({ theme: ex, difficulty: d, locale: loc, baseName: `G1-308-${ex}-d${d}-${loc}`, tag: 'level' });
      for (const d of [1, 2, 3]) renders.push({ theme: ex, difficulty: d, locale: loc, strings: LONG_CHROME, baseName: `G1-308-${ex}-d${d}-${loc}-longchrome`, tag: 'long-chrome' });
      for (const d of [1, 2, 3]) renders.push({ theme: ex, difficulty: d, locale: loc, strings: WORST_CHROME, baseName: `G1-308-${ex}-d${d}-${loc}-worstchrome`, tag: 'worst-chrome' });
      for (const d of [1, 2, 3]) for (let s = 2; s <= seeds; s++) renders.push({ theme: ex, difficulty: d, locale: loc, seedEpoch: s, baseName: `G1-308-${ex}-d${d}-${loc}-seed${s}`, tag: 'seed' });
      const seen = {};
      for (const d of [1, 2, 3]) seen[d] = { verbs: new Set(), cues: new Set(), ks: new Set(), answers: new Set(), pages: new Map() };
      let maxTextW = 0;
      for (const job of renders) {
        let r;
        try { r = await renderCheck(page, type, null, job); } catch (e) { r = { thrown: e.message }; }
        note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
        if (r.thrown) { console.log(`[C] ${job.baseName}: THREW ${r.thrown}`); continue; }
        assertions += 12 * r.rows.length + 3 * r.strip.length;
        note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
        const S = seen[job.difficulty];
        for (const row of r.rows) { S.verbs.add(row.action); S.cues.add(String(row.cue).split(':')[0]); if (row.k) S.ks.add(row.k); if (row.answer != null) S.answers.add(row.answer); }
        const key = r.strip.join(',') + '|' + r.rows.map((x) => x.text).join('/');
        if (job.tag === 'seed' || job.tag === 'level' || (job.tag === 'theme' && job.theme === ex)) {
          const prev = S.pages.get(key);
          note(!prev, `${job.baseName}: byte-identical page to ${prev}`);
          S.pages.set(key, job.baseName);
        }
        maxTextW = Math.max(maxTextW, r.textW || 0);
        if (job.tag !== 'seed') console.log(`[C] ${job.baseName}: body ${r.body} (${r.instrLines}-line instruction), lane ${r.laneH}, rows ${r.rows.map((x) => x.h).join('/')}, verbs [${r.rows.map((x) => x.action[0] + ':' + x.cue).join(' ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
      }
      console.log(`[C] ${loc}: text column measured ${maxTextW} px`);
      for (const d of [1, 2, 3]) {
        const c = type.difficulty[d];
        const S = seen[d];
        const missingVerbs = c.verbs.filter((v) => !S.verbs.has(v));
        note(missingVerbs.length === 0, `d${d} sweep: verbs never asked: ${missingVerbs.join(',')}`);
        note(S.answers.size >= 2, `d${d} sweep: write answers constant (${[...S.answers].join(',')})`);
        if (c.cues.includes('first')) note(S.cues.has('first') && S.cues.has('last'), `d${d} sweep: first/last not both asked (${[...S.cues].join(',')})`);
        if (c.ordMax >= 2) { const over = [...S.ks].filter((k) => k > c.ordMax || k < 2); note(over.length === 0, `d${d} sweep: ordinal k ${over.join(',')} outside 2..${c.ordMax}`); }
        const missingCues = c.cues.filter((x) => !S.cues.has(x));
        note(missingCues.length === 0, `d${d} sweep: cues never asked: ${missingCues.join(',')}`);
        console.log(`[C] d${d} sweep over ${seeds} seeds: verbs ${[...S.verbs].join(',')} · cues ${[...S.cues].join(',')} · ordinal k ${[...S.ks].sort().join(',')} · write answers ${[...S.answers].sort().join(',')} · ${S.pages.size} distinct pages`);
      }
    }

    // ---- D. poisons (en; each must FAIL; control = the correct bank + page)
    const loc = 'en';
    const cfg = bankAll.en;
    const ex = cfg.exemplar || EXEMPLAR;
    const control = await renderCheck(page, type, null, { theme: ex, difficulty: 2, locale: loc, baseName: 'G1-308-control' });
    note(control.fails.length === 0 && checkBank(cfg, loc, type).length === 0, 'control (correct bank + page) did not pass: ' + control.fails.join(' | '));
    const controlD3 = await renderCheck(page, type, null, { theme: ex, difficulty: 3, locale: loc, baseName: 'G1-308-control-d3' });
    note(controlD3.fails.length === 0, 'control d3 did not pass: ' + controlD3.fails.join(' | '));

    const poisons = [];
    const deferred = ['P5 F4 false statement about a noun absent from the strip', 'P8 F2 both clauses circle'];
    const silent = (f) => 'silent (' + (f[0] || 'no fault') + ')';
    // synthetic correct-shaped non-EN blocks (the correct shape is asserted clean FIRST, then mutated)
    const synth = (ploc, mut, themes) => {
      const b = clone(cfg);
      const T = themes || ['animals'];
      const keys = new Set(); for (const t of T) for (const e of entriesFor(t, ploc).filter(countable)) keys.add(e.vocabKey);
      b.objForms = {};
      const V = vocab();
      for (const k of keys) {
        const w = V[k][ploc];
        const sg = w[0], pl = w[1] || w[0];
        if (ploc === 'de') b.objForms[k] = { unique: 'den ' + sg, all: 'alle ' + pl, pl, ord: { 2: 'den zweiten ' + sg, 3: 'den dritten ' + sg, 4: 'den vierten ' + sg, 5: 'den fünften ' + sg }, dat: 'dem ' + (deDativeTable()[k] || sg), def: null, defPl: null, part: null, gen: null, a2: null, reviewed: true };
        else if (ploc === 'sv') b.objForms[k] = { unique: sg.toLowerCase() + 'en', all: 'alla ' + pl.toLowerCase(), pl: pl.toLowerCase(), ord: { 2: 'den andra ' + sg.toLowerCase() + 'en', 3: 'den tredje ' + sg.toLowerCase() + 'en', 4: 'den fjärde ' + sg.toLowerCase() + 'en', 5: 'den femte ' + sg.toLowerCase() + 'en' }, dat: null, def: sg.toLowerCase() + 'en', defPl: pl.toLowerCase() + 'na', part: null, gen: null, a2: null, reviewed: true };
        else if (ploc === 'fi') b.objForms[k] = { unique: sg.toLowerCase(), all: 'kaikki ' + pl.toLowerCase(), pl: pl.toLowerCase(), ord: { 2: 'toinen ' + sg.toLowerCase(), 3: 'kolmas ' + sg.toLowerCase(), 4: 'neljäs ' + sg.toLowerCase(), 5: 'viides ' + sg.toLowerCase() }, dat: null, def: null, defPl: null, part: (SENTENCES.fi.nounForms.partitive[k] || null), gen: (GRAMMAR.FI_GENITIVES[k] ? GRAMMAR.FI_GENITIVES[k].gen : null), a2: null, reviewed: true };
      }
      if (ploc === 'de') { b.endpointForm = 'dat'; b.verbs = [{ id: 'circle', frame: 'Kreise {obj} ein.' }, { id: 'cross', frame: 'Streiche {all} durch.' }, { id: 'underline', frame: 'Unterstreiche {obj}.' }, { id: 'line', frame: 'Verbinde {obj} mit {dat2}.' }, { id: 'mark', frame: 'Kreuze {obj} an.' }, { id: 'write', frame: 'Schreibe, wie viele {pl} es gibt.' }]; b.fixed = { first: 'das erste Bild', last: 'das letzte Bild', ordPic: cfg.fixed.ordPic, between: 'das Bild zwischen {A} und {B}', rightof: 'das Bild rechts neben {A}', leftof: 'das Bild links neben {A}' }; b.nounCase = 'keep'; b.mark = 'cross'; b.and = 'und'; }
      if (ploc === 'sv') { b.endpointForm = 'def'; b.verbs = [{ id: 'circle', frame: 'Ringa in {obj}.' }, { id: 'cross', frame: 'Stryk över {all}.' }, { id: 'underline', frame: 'Stryk under {obj}.' }, { id: 'line', frame: 'Dra ett streck mellan {def} och {def2}.' }, { id: 'mark', frame: 'Sätt ett kryss på {def}.' }, { id: 'write', frame: 'Skriv hur många {pl} det finns.' }]; b.fixed = { first: 'den första bilden', last: 'den sista bilden', ordPic: cfg.fixed.ordPic, between: 'bilden mellan {A} och {B}', rightof: 'bilden till höger om {A}', leftof: 'bilden till vänster om {A}' }; b.mark = 'cross'; b.and = 'och'; }
      if (ploc === 'fi') { b.endpointForm = 'gen'; b.verbs = [{ id: 'circle', frame: 'Ympyröi {obj}.' }, { id: 'cross', frame: 'Yliviivaa {all}.' }, { id: 'underline', frame: 'Alleviivaa {obj}.' }, { id: 'line', frame: 'Yhdistä {obj} ja {obj2} viivalla.' }, { id: 'mark', frame: 'Merkitse {obj} rastilla.' }, { id: 'write', frame: 'Kirjoita, montako {part} on.' }]; b.fixed = { first: 'ensimmäinen kuva', last: 'viimeinen kuva', ordPic: cfg.fixed.ordPic, between: 'kuva, joka on {A} ja {B} välissä', rightof: 'kuva {A} oikealla puolella', leftof: 'kuva {A} vasemmalla puolella' }; b.mark = 'cross'; b.and = 'ja'; }
      b.strings = clone(cfg.strings);
      const ctrl = checkBank(b, ploc, null, { themes: T });
      if (ctrl.length) throw new Error('synthetic ' + ploc + ' control is not clean: ' + ctrl.join(' | '));
      mut(b);
      return b;
    };
    const bankPoison = (name, ploc, mut, want, themes) => poisons.push({ name, run: async () => { const b = synth(ploc, mut, themes); const f = checkBank(b, ploc, null, { themes: themes || ['animals'] }); return f.some((x) => want.test(x)) ? null : silent(f); } });
    const enBankPoison = (name, mut, want) => poisons.push({ name, run: async () => { const b = clone(cfg); mut(b); const f = checkBank(b, 'en', null); return f.some((x) => want.test(x)) ? null : silent(f); } });
    bankPoison('P3 de objForms.elephant.dat = "dem Elefant"', 'de', (b) => { b.objForms.elephant.dat = 'dem Elefant'; }, /DE_DATIVE_SG/);
    bankPoison('P4 sv unique = "en hund" on the base', 'sv', (b) => { b.objForms.dog.unique = 'en hund'; }, /indefinite article/);
    bankPoison('P11 a 97-char de sentence', 'de', (b) => { b.verbs[0].frame = 'Kreise {obj} ein, aber nimm dir vorher ganz viel Zeit und schaue jedes einzelne Bild in der Reihe an.'; }, /> 96/);
    enBankPoison('P21 a colour verb in a frame', (b) => { b.verbs[0].frame = 'Color {obj}.'; }, /colour verb/);
    enBankPoison('P22 a worksheet-word title', (b) => { b.strings['G1-308'].title = 'Read and Do Worksheet'; }, /worksheet word/);
    poisons.push({ name: 'P9 fi write on clothing (no partitive) refused at build', run: async () => {
      let b;
      try { b = synth('fi', (x) => { for (const k of Object.keys(x.objForms)) x.objForms[k].part = null; }, ['clothing']); } catch (e) { return 'synthetic fi control failed: ' + e.message; }
      try { await renderCheck(page, type, { bank: b }, { theme: 'clothing', difficulty: 2, locale: 'fi', baseName: 'G1-308-poison-p9' }); return 'silent (rendered fi clothing without partitives)'; }
      catch (e) { return /no legal sentence|refused/.test(e.message) ? null : 'wrong error: ' + e.message; }
    } });
    poisons.push({ name: 'P6 theme "zoo animals bw" refused at build', run: async () => {
      try { await renderCheck(page, type, null, { theme: 'zoo animals bw', difficulty: 2, locale: loc, baseName: 'G1-308-poison-p6' }); return 'silent (rendered a BW theme)'; } catch (e) { return /B&W|BW/.test(e.message) ? null : 'wrong error: ' + e.message; }
    } });
    poisons.push({ name: 'P12 the old 760 stack under the worst chrome', run: async () => {
      // rowMin 94 -> 146 + 12 + 6×94 + 40 = 762 (the design's pre-measure stack) under the 710 body
      const r = await renderCheck(page, type, { cfg: { ...type.difficulty[2], rowMin: 94 } }, { theme: ex, difficulty: 2, locale: loc, strings: WORST_CHROME, baseName: 'G1-308-poison-p12' });
      return r.fails.some((x) => /footer overlap|overflow|outside the body/.test(x)) ? null : silent(r.fails);
    } });

    // HTML poisons: mutate the rendered body, every needle must match (a needle that matches nothing THROWS)
    const need = (html, re, fn, label) => { if (!re.test(html)) throw new Error('NEEDLE MATCHED NOTHING (' + label + ')'); return html.replace(re, fn); };
    const rowRe = (i) => new RegExp(`<div data-lcs-row data-lcs-n="${i}" data-lcs-action="([a-z]+)" data-lcs-cue="([^"]*)" data-lcs-noun="([^"]*)" data-lcs-noun2="([^"]*)" data-lcs-targets="([^"]*)" data-lcs-text="([^"]*)"`);
    const rowsOf = (html) => { const out = []; for (let i = 1; i <= 12; i++) { const m = html.match(rowRe(i)); if (m) out.push({ i, action: m[1], cue: m[2], noun: m[3], noun2: m[4], targets: m[5], text: m[6], whole: m[0] }); } return out; };
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const rewriteRow = (html, r, patch) => {
      const n = { ...r, ...patch };
      const open = `<div data-lcs-row data-lcs-n="${r.i}" data-lcs-action="${n.action}" data-lcs-cue="${n.cue}" data-lcs-noun="${n.noun}" data-lcs-noun2="${n.noun2}" data-lcs-targets="${n.targets}" data-lcs-text="${esc(n.text)}"`;
      let out = html.replace(r.whole, open);
      if (patch.text != null) out = need(out, new RegExp('(data-lcs-textnode[^>]*>)' + r.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(</p>)'), (m, a, b) => a + esc(n.text) + b, 'text node ' + r.i);
      if (patch.kAttr !== undefined) out = out.replace(open, open + (patch.kAttr ? ` data-lcs-k="${patch.kAttr}"` : ''));
      return out;
    };
    const stripOf = (html) => html.match(/data-lcs-strip="([^"]+)"/)[1].split(',');
    const htmlPoison = (name, post, want, inj, job) => poisons.push({ name, run: async () => {
      const r = await renderCheck(page, type, inj || null, { theme: ex, difficulty: 2, locale: loc, ...(job || {}), baseName: 'G1-308-poison-' + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 28).toLowerCase() }, { post });
      return r.fails.some((x) => want.test(x)) ? null : silent(r.fails);
    } });
    htmlPoison('P1 two rows on one tile', (html) => {
      const tileRows = rowsOf(html).filter((r) => ['circle', 'cross', 'underline', 'mark'].includes(r.action));
      const [a, b] = tileRows;
      if (!a || !b) throw new Error('NEEDLE MATCHED NOTHING (two tile rows)');
      let out = rewriteRow(html, a, { cue: 'first', noun: '', noun2: '', targets: '0', text: refill(cfg, a.action, 'first', null, '', ''), kAttr: '' });
      out = rewriteRow(out, b, { cue: 'first', noun: '', noun2: '', targets: '0', text: refill(cfg, b.action, 'first', null, '', ''), kAttr: '' });
      return out;
    }, /marked by two rows/);
    htmlPoison('P2 ordinal:3 over a noun that occurs twice', (html) => {
      const strip = stripOf(html);
      const occ = {}; strip.forEach((n, i) => { (occ[n] = occ[n] || []).push(i); });
      const two = Object.keys(occ).find((n) => occ[n].length === 2) || Object.keys(occ).find((n) => occ[n].length < 3);
      const r = rowsOf(html).find((x) => ['circle', 'cross', 'underline', 'mark'].includes(x.action));
      return rewriteRow(html, r, { cue: 'ordinal:3', noun: two, noun2: '', targets: String(occ[two][occ[two].length - 1]), text: refill(cfg, r.action, 'ordinal:3', 3, two, ''), kAttr: '3' });
    }, /ordinal 3/);
    htmlPoison('P7 a double space in a sentence', (html) => {
      const r = rowsOf(html)[0];
      const t2 = r.text.replace(' ', '  ');
      return rewriteRow(html, r, { text: t2 });
    }, /double space|refill/);
    htmlPoison('P10 a line row with one noun twice', (html) => {
      const strip = stripOf(html);
      const occ = {}; strip.forEach((n, i) => { (occ[n] = occ[n] || []).push(i); });
      const uniq = Object.keys(occ).find((n) => occ[n].length === 1);
      const r = rowsOf(html).find((x) => x.action === 'line') || rowsOf(html)[0];
      return rewriteRow(html, r, { action: 'line', cue: 'unique', noun: uniq, noun2: uniq, targets: `${occ[uniq][0]},${occ[uniq][0]}`, text: refill(cfg, 'line', 'unique', null, uniq, uniq), kAttr: '' });
    }, /two different nouns|marked by two rows/);
    htmlPoison('P13 a hand-edited noun in the rendered text', (html) => {
      const r = rowsOf(html).find((x) => x.noun && cfg.objForms[x.noun]);
      const lit = cfg.objForms[r.noun].pl;
      const other = Object.keys(cfg.objForms).find((k) => k !== r.noun && r.text.indexOf(cfg.objForms[k].pl) < 0 && cfg.objForms[k].pl.length !== lit.length) || 'zebra';
      const from = r.text.includes(lit) ? lit : cfg.objForms[r.noun].unique.replace(/^the /, '');
      const to = r.text.includes(lit) ? cfg.objForms[other].pl : cfg.objForms[other].unique.replace(/^the /, '');
      if (!r.text.includes(from)) throw new Error('NEEDLE MATCHED NOTHING (noun literal)');
      return rewriteRow(html, r, { text: r.text.replace(from, to) });
    }, /^refill: .* the bank fills/);
    htmlPoison('P14 pictures squashed below the floor', (html) => need(html, /width:64px;height:64px/g, () => 'width:40px;height:40px', 'picture size'), /< G1 floor/);
    htmlPoison('P15 blank list (non-vacuity)', (html) => need(html, /<div data-lcs-row [\s\S]*?<\/div>/g, () => '', 'rows'), /non-vacuity|rows, config says/);
    htmlPoison('P16 an unfilled slot in a sentence', (html) => { const r = rowsOf(html)[0]; return rewriteRow(html, r, { text: r.text.replace(/the \w+/, '{obj}') }); }, /unfilled slot|refill/);
    htmlPoison('P17 a numeral caption in a tile', (html) => need(html, /(<span data-lcs-idx="0"[^>]*>)/, (m, a) => a + '<span style="font-size:14px">1</span>', 'tile 0'), /carries text/);
    poisons.push({ name: 'P18 a wrong write answer', run: async () => {
      for (let s = 1; s <= 40; s++) {   // the first seed whose page carries a write row
        let hit = false;
        const post = (html) => { if (!/data-lcs-answer="\d"/.test(html)) return html; hit = true; return html.replace(/data-lcs-answer="(\d)"/, (m, n) => `data-lcs-answer="${(+n % 4) + 1}"`); };
        const r = await renderCheck(page, type, null, { theme: ex, difficulty: 2, locale: loc, seedEpoch: s, baseName: 'G1-308-poison-p18' }, { post });
        if (!hit) continue;
        return r.fails.some((x) => /answer \d != \d pictures/.test(x)) ? null : silent(r.fails);
      }
      return 'silent (no seed carried a write row)';
    } });
    htmlPoison('P19 a wrong target stamp', (html) => { const r = rowsOf(html).find((x) => ['circle', 'cross', 'underline', 'mark'].includes(x.action) && x.targets.split(',').length === 1); const t = +r.targets; return rewriteRow(html, r, { targets: String((t + 1) % 8) }); }, /re-derive to|marked by two rows/);
    poisons.push({ name: 'P20 a lookalike pair on one strip', run: async () => {
      // find (over the seeds) a page with an unreferenced tile whose noun can be swapped for a lookalike of another strip noun
      const LK = type._LOOKALIKES;
      for (let s = 1; s <= 40; s++) {
        let plan = null;
        const post = (html) => {
          const strip = stripOf(html);
          const rows = rowsOf(html);
          const referenced = new Set(rows.flatMap((r) => [r.noun, r.noun2]).filter(Boolean));
          const targeted = new Set(rows.flatMap((r) => r.targets.split(',').filter((x) => x !== '').map(Number)));
          for (let i = 0; i < strip.length; i++) {
            if (referenced.has(strip[i]) || targeted.has(i)) continue;
            for (const other of new Set(strip)) {
              if (other === strip[i]) continue;
              const g = LK.find((grp) => grp.includes(other));
              if (!g) continue;
              const y = g.find((n) => !strip.includes(n) && cfg.objForms[n] && entriesFor(ex, 'en').some((e) => e.vocabKey === n));
              if (!y) continue;
              plan = { i, from: strip[i], to: y };
              const ns = strip.slice(); ns[i] = y;
              let out = html.replace(`data-lcs-strip="${strip.join(',')}"`, `data-lcs-strip="${ns.join(',')}"`);
              out = need(out, new RegExp(`data-lcs-idx="${i}" data-lcs-noun="${strip[i]}"`), () => `data-lcs-idx="${i}" data-lcs-noun="${y}"`, 'tile noun');
              return out;
            }
          }
          return html;
        };
        const r = await renderCheck(page, type, null, { theme: ex, difficulty: 2, locale: loc, seedEpoch: s, baseName: 'G1-308-poison-p20' }, { post });
        if (!plan) continue;
        return r.fails.some((x) => /lookalike/.test(x)) ? null : silent(r.fails);
      }
      return 'silent (no seed offered an unreferenced tile to swap)';
    } });

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
    console.log(`G1-308 gate: ${assertions} assertions, ${failures.length} failures, poisons ${killed}/${poisons.length} killed (${deferred.length} deferred to the faces) → ${verdict ? 'PASS' : 'FAIL'}`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { checkBank, refill, FAN_THEMES, LONG_CHROME, WORST_CHROME };
