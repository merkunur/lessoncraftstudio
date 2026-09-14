#!/usr/bin/env node
/**
 * verify-b3-animal-fact-file.js — the G2-318 `animal-fact-file` gate (design file
 * docs/worksheet-gen/b3-designs/G2-318-animal-fact-file.md §5, BASE scope;
 * brief deliverable 4).
 *
 *   node scripts/worksheet-gen/qa/verify-b3-animal-fact-file.js [--quick]
 *
 * 1. BANK — every locale block of data/b3/animal-fact-file.js against the §5
 *    validator rules the base can carry: (1) labels <= 28 chars, `cell` <= 16,
 *    `inFrame` <= 22, every literal whole (no `{` in a label / name / title);
 *    (2) every `choices[field]` key has `cell` + `inFrame`; (4) every animal
 *    literal has `name` + `title`, `name` === the vocab singular as stored
 *    with an initial capital (the design's banner rule); (6) `frames` === 3,
 *    `{def}` (fi `{nom}`/`{ade}`) exactly once, no end mark, no option
 *    literal inside, filled <= 22 chars for the exemplar; `mystery` has all 6
 *    kinds + `prompt`; `legsFrames` all 5; `factStarter` carries one def slot
 *    and no end mark; (8) every chip field >= 3 options; (9) title <= 70, no
 *    worksheet-word, instruction <= 150, no `{name}`; (10) sv: a bare `grupp`
 *    token = FAIL, a compound carrying `grupp` only from `allowCompound`;
 *    sv/da/no `def` must not be the bare indefinite name (the P4 proxy).
 * 2. TABLE — data/b3/animal-facts.json: every value inside `choices`, every
 *    picture resolves via fileUri, no B&W theme, `picOpened` on reviewed
 *    rows, every exemplar exists AND is pictured in its own theme (the
 *    unit-less build's join). The bank cross-check against data/science/*
 *    is tools/gate-fact-file-data.js (run separately; its P1 is that poison).
 * 3. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1/d2/d3 en on the wave theme (`forest creatures`, exemplar
 *    hedgehog), d2 with a pinned unit (fox), d2 with a null-field animal
 *    (frog — no stamp where the table is null), d2 `blank`, and d1/d2/d3
 *    under a 70-char 3-line title + 150-char instruction (the README's 722
 *    floor). Asserts verify() empty, qa/lints.js clean, and ITSELF: the
 *    `.ws-icon` >= 36 and === the config, the hero `src` === fileUri(theme,
 *    noun) of the unit, the name === the bank literal, every label cell <= 2
 *    measured lines with no scroll overflow, one empty lane per field at the
 *    configured glyphH, the draw label / special caption / starter === the
 *    bank literal (the starter re-filled through fillSlots), content above
 *    the footer, and the NODE-SIDE RE-DERIVATION of every `data-lcs-fact-*`
 *    stamp from animal-facts.json (diff, not trust: a stamp where the table
 *    is null, a missing stamp, a wrong value, and 0 checked stamps all FAIL).
 * 4. SWEEP — 20 seeds × d1/d2/d3: the base is seedless → byte-identical
 *    (skipped by --quick); every unit in units('en') builds on its own
 *    picture theme (the pool count is printed); the refusals: a fruit
 *    theme, a B&W theme, an unpictured unit, a unit-less build on a theme
 *    whose exemplar is not the title exemplar, an unauthored locale.
 * 5. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1). The correct
 *    EN bank + the committed JSON are the control. Design §5 poisons the
 *    BASE can carry: P1 rabbit.diet:'meat' (a poisoned table in the build
 *    → the re-derivation against the committed JSON), P4 sv def 'igelkott'
 *    (indefinite), P5 a `zoo animals bw` picture, P7 a de frame with
 *    `Säugetier` inside, P9 a stamp on a null field (frog habitat), P10 an
 *    878-px rigid stack under the 722 chrome (the footer lint), P11 a 29-char
 *    label (+ P11r a 3-line label in the render), P13 sv bare `Grupp`; plus
 *    the base's own: PL a pre-filled lane, PH name ≠ literal, PS a stamp
 *    value edited, PI a 30-px hero, PT the hero picture of another animal,
 *    PF data-lcs-face on the base, PB no [data-ws-content], PX a starter
 *    with an end mark (+ the caption-fallback control), PN a label with a
 *    slot, PU an animal without a name literal (never a vocab fallback) —
 *    18 in all.
 * F. FACES (Phase 2, 2026-09-14 — design §3; tools/b3var-rows/animal-fact-file.js):
 *    the five emitted faces G2-339 tick · G2-340 bank · G2-341 frames ·
 *    G2-342 compare · G2-343 mystery, each rendered through the real
 *    pipeline at d2 en on the wave theme under the shipped chrome AND the
 *    LONG de (740) + LONG fi (710 — the family's measured worst) fixtures;
 *    verify() + lints clean; the gate's OWN measurements (chips / bank /
 *    printed cells / starters / files / riddle cards inside their boxes, the
 *    F6 bank on ONE row <= 110 px, nothing under the footer) and the
 *    NODE-SIDE RE-DERIVATION of every answer-key stamp from animal-facts.json
 *    + the EN bank (tick: the chip at data-lcs-correct === the table value
 *    and every chip label === a bank cell; bank: the word set === truths +
 *    distractors from >= 2 fields; frames: printed cells === cellOf(table),
 *    starters === fillSlots(frames, def); compare: data-lcs-same per field
 *    === (table a === table b), exactly half; mystery: every tile profile ===
 *    the table, every clue === clueOf(table), the filter leaves EXACTLY the
 *    stamped answer); the emitted specs' EN strings === bank.strings[id];
 *    a seed sweep (quick 6 / full 20): tick correct index takes all 3
 *    positions per page and pages differ, bank pages differ, compare pairs +
 *    same-patterns vary, mystery answers vary and the best fixed-position
 *    bank bot <= 2/6; refusals: a unit on compare/mystery, the blank unit on
 *    a face, a null-field animal (turtle) on tick/bank/frames, a theme with
 *    no legal pair (compare) / bank (mystery).
 *    Face POISONS (design §5 P2 P3 P6 P8 P12 P14 + the faces' own): P2 an F6
 *    bank with two 0-contradiction animals (verify + node), P3a an F2 row
 *    with a repeated chip key, P3b data-lcs-correct pointing at a distractor
 *    (verify + node), P6 an F3 bank missing the true covering (verify +
 *    node), P8 an F5 pair printed as 4/4 same (verify + node) + the composer's
 *    refusal on a table with no legal pair, P12 an F6 title naming Hedgehog
 *    (validator), P14 an F6 bank of six 13-letter names (verify: two rows);
 *    PF1 tick correct index constant at 0, PF2 a frames starter > 22 chars
 *    (refusal), PF3 a frames starter printing its target fact (refusal), PF4
 *    a mystery clue naming the answer (verify + node), PF5 compare chips
 *    swapped, PF6 data-lcs-same flipped (verify + node), PF7 a draw box on
 *    the frames face, PF8 a mystery tile profile edited (node), PF9 a
 *    printed cell edited on frames (verify + node), PF10 a bank word edited
 *    (verify + node) — 16 face poisons; the base's 18 stay.
 *    Final line: G2-318 gate: PASS (N assertions, M/M poisons killed) | FAIL.
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { vocab, fileUri, safeNouns } = require('../lib/b2-common.js');
const { fillSlots, slotsIn } = require('../lib/b3-instructions.js');
const tokens = require('../primitives/_tokens.js');
const bankMod = require('../data/b3/animal-fact-file.js');
const TABLE = require('../data/b3/animal-facts.json');

const TYPE = require('../types/g2/G2-318-animal-fact-file.js');
const { loadType } = require('../lib/load-types.js');
const FACE_IDS = { tick: 'G2-339', bank: 'G2-340', frames: 'G2-341', compare: 'G2-342', mystery: 'G2-343' };
const FACE_OUT = 'g2318-faces';
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const THEME = TYPE.WAVE_THEME;                       // 'forest creatures'
const EXEMPLAR = TABLE.exemplars[THEME];             // hedgehog
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const G23_FLOOR = tokens.density.G23.minElement;     // 36
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const LABEL_KEYS = ['class', 'habitat', 'diet', 'legs', 'covering', 'fly', 'swim', 'special'];
const CHIP_FIELDS = ['class', 'covering', 'diet', 'habitat'];
const GRUPP = /(?<!\p{L})grupp(?!\p{L})/iu;

let assertions = 0;
const fails = [];
let killed = 0;
const TOTAL = 18;
const FACE_TOTAL = 16;
let faceKilled = 0;
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
function len(s) { return [...String(s)].length; }
function upperFirst(s, loc) { const cs = [...s]; return cs.length ? cs[0].toLocaleUpperCase(loc) + cs.slice(1).join('') : s; }

/* ------------------------------------------------------------------ bank */
function validateBank(bank, loc) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  const v = vocab();
  if (!bank || !bank.labels) { push('no labels block'); return f; }
  const L = bank.labels;
  for (const k of LABEL_KEYS) {
    const s = L[k];
    if (typeof s !== 'string' || !s.trim()) { push(`labels.${k} missing`); continue; }
    if (len(s) > 28) push(`labels.${k} "${s}" is ${len(s)} chars > 28`);
    if (s.includes('{')) push(`labels.${k} "${s}" carries a slot`);
  }
  for (const k of ['eyebrow', 'drawLabel', 'sentence']) {
    if (typeof bank[k] !== 'string' || !bank[k].trim()) push(`${k} missing`);
    else if (bank[k].includes('{')) push(`${k} "${bank[k]}" carries a slot`);
  }
  // options: every chip key has cell + inFrame, cell <= 16, inFrame <= 22, >= 3 options per field
  const optionLiterals = [];
  for (const field of CHIP_FIELDS) {
    const opts = (bank.options || {})[field] || {};
    const keys = TABLE.choices[field];
    if (keys.length < 3) push(`choices.${field} has ${keys.length} options < 3`);
    for (const key of keys) {
      const o = opts[key];
      if (!o || typeof o.cell !== 'string' || !o.cell.trim() || typeof o.inFrame !== 'string' || !o.inFrame.trim()) { push(`options.${field}.${key} needs cell + inFrame`); continue; }
      if (len(o.cell) > 16) push(`options.${field}.${key}.cell "${o.cell}" > 16 chars`);
      if (len(o.inFrame) > 22) push(`options.${field}.${key}.inFrame "${o.inFrame}" > 22 chars`);
      optionLiterals.push(o.cell, o.inFrame);
    }
  }
  if (!bank.yesno || typeof bank.yesno.yes !== 'string' || typeof bank.yesno.no !== 'string') push('yesno needs yes + no');
  for (const n of TABLE.choices.legs) if (!bank.legsFrames || typeof bank.legsFrames[n] !== 'string' || !bank.legsFrames[n].trim()) push(`legsFrames[${n}] missing`);
  // animals: name === vocab singular as stored, initial capital; title present
  const nordic = ['sv', 'da', 'no'].includes(loc);
  for (const [k, a] of Object.entries(bank.animals || {})) {
    if (!TABLE.animals[k]) { push(`animals.${k} is not a table animal`); continue; }
    if (typeof a.name !== 'string' || !a.name.trim()) { push(`animals.${k}.name missing`); continue; }
    if (typeof a.title !== 'string' || !a.title.trim()) push(`animals.${k}.title missing`);
    const cite = v[k] && v[k][loc] && v[k][loc][0];
    if (cite) { const want = upperFirst(cite, loc); if (a.name !== want) push(`animals.${k}.name "${a.name}" ≠ vocab singular "${want}"`); }
    else push(`animals.${k}: no ${loc} vocab singular`);
    if (/\d|\{/.test(a.name) || /\d|\{/.test(a.title || '')) push(`animals.${k}: name/title carries a digit or a slot`);
    if (typeof a.def === 'string' && a.def.trim()) {
      if (a.def.includes('{')) push(`animals.${k}.def carries a slot`);
      if (nordic && a.def.trim().toLocaleLowerCase(loc) === a.name.trim().toLocaleLowerCase(loc)) push(`animals.${k}.def "${a.def}" is the bare indefinite name (a Nordic frame subject takes the definite literal)`);
    }
  }
  // factStarter: exactly one subject slot (def | nom), no end mark
  if (typeof bank.factStarter === 'string' && bank.factStarter.trim()) {
    const slots = slotsIn(bank.factStarter);
    if (slots.length !== 1 || !['def', 'nom'].includes(slots[0])) push(`factStarter "${bank.factStarter}" must carry exactly one {def}/{nom} slot`);
    if (/[.?!]$/.test(bank.factStarter.trim())) push(`factStarter "${bank.factStarter}" ends with an end mark`);
  } else push('factStarter missing');
  // frames: 3, {def} (fi {nom}/{ade}) exactly once, no end mark, no option literal inside, filled <= 22 for the exemplar
  const frames = Array.isArray(bank.frames) ? bank.frames : [];
  if (frames.length !== 3) push(`frames has ${frames.length} entries, want 3`);
  const ex = (bank.animals || {})[EXEMPLAR] || {};
  for (const fr of frames) {
    if (!fr || typeof fr.text !== 'string' || !TABLE.fields.includes(fr.field)) { push('a frame lacks field/text'); continue; }
    const slots = slotsIn(fr.text);
    const subj = slots.filter((s) => ['def', 'nom', 'ade'].includes(s));
    if (subj.length !== 1 || slots.length !== 1) push(`frame "${fr.text}" must carry exactly one {def}/{nom}/{ade} slot`);
    if (loc === 'fi' ? subj[0] === 'def' : subj[0] !== 'def') push(`frame "${fr.text}" uses {${subj[0]}} (${loc === 'fi' ? 'fi frames take {nom}/{ade}' : 'non-fi frames take {def}'})`);
    if (/[.?!]$/.test(fr.text.trim())) push(`frame "${fr.text}" ends with an end mark`);
    const lower = fr.text.toLocaleLowerCase(loc);
    for (const lit of optionLiterals) if (lit && new RegExp('(?<!\\p{L})' + lit.toLocaleLowerCase(loc).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'u').test(lower)) push(`frame "${fr.text}" prints the option literal "${lit}"`);
    const fillWith = {}; for (const s of subj) if (typeof ex[s] === 'string' && ex[s].trim()) fillWith[s] = ex[s];
    try { const filled = fillSlots(fr.text, fillWith); if (len(filled) > 22) push(`frame "${fr.text}" filled for ${EXEMPLAR} is ${len(filled)} chars > 22`); } catch (e) { /* the exemplar lacks the literal: a recorded per-animal refusal, not a bank defect */ }
  }
  const my = bank.mystery || {};
  for (const k of ['class', 'covering', 'diet', 'habitat', 'prompt']) if (typeof my[k] !== 'string' || !my[k].trim()) push(`mystery.${k} missing`);
  for (const k of ['fly', 'swim']) if (!my[k] || typeof my[k].true !== 'string' || typeof my[k].false !== 'string') push(`mystery.${k} needs true + false`);
  // Phase 2: every clue frame carries exactly one {cell}|{inFrame} slot and ends in an end mark; fly/swim/legs literals are whole sentences
  for (const k of ['class', 'covering', 'diet', 'habitat']) if (typeof my[k] === 'string') {
    const sl = slotsIn(my[k]);
    if (sl.length !== 1 || !['cell', 'inFrame'].includes(sl[0])) push(`mystery.${k} "${my[k]}" must carry exactly one {cell}/{inFrame} slot`);
    if (!/[.?!]$/.test(my[k].trim())) push(`mystery.${k} "${my[k]}" has no end mark`);
  }
  for (const k of ['fly', 'swim']) if (my[k]) for (const b of ['true', 'false']) if (typeof my[k][b] === 'string' && (!/[.?!]$/.test(my[k][b].trim()) || my[k][b].includes('{'))) push(`mystery.${k}.${b} "${my[k][b]}" is not a whole sentence`);
  for (const n of TABLE.choices.legs) if (bank.legsFrames && typeof bank.legsFrames[n] === 'string' && (!/[.?!]$/.test(bank.legsFrames[n].trim()) || bank.legsFrames[n].includes('{'))) push(`legsFrames[${n}] is not a whole sentence`);
  if (typeof bank.frameCaption !== 'string' || !bank.frameCaption.trim() || bank.frameCaption.includes('{')) push('frameCaption missing (the frames face lane caption)');
  if (!bank.sameDiff || ['same', 'diff', 'laneSame', 'laneDiff', 'caption'].some((k) => typeof bank.sameDiff[k] !== 'string')) push('sameDiff needs same/diff/laneSame/laneDiff/caption');
  else { for (const k of ['same', 'diff']) if (len(bank.sameDiff[k]) > 16) push(`sameDiff.${k} "${bank.sameDiff[k]}" > 16 chars`); for (const k of ['laneSame', 'laneDiff']) if (/[.?!]$/.test(bank.sameDiff[k].trim())) push(`sameDiff.${k} ends with an end mark`); }
  // Phase 2: the face strings — one block per emitted face id; F2-F4 carry {U}; F5/F6 never name an animal (P12)
  const titles = Object.values(bank.animals || {}).map((a) => a.title).filter((t) => typeof t === 'string' && t.trim());
  for (const [face, id] of Object.entries(FACE_IDS)) {
    const st = bank.strings && bank.strings[id];
    if (!st || typeof st.title !== 'string' || typeof st.instruction !== 'string') { push(`strings[${id}] (${face}) needs title + instruction`); continue; }
    if (len(st.title) > 70) push(`${id} title ${len(st.title)} chars > 70`);
    if (WORKSHEET_WORD.test(st.title)) push(`${id} title "${st.title}" carries the worksheet word`);
    if (len(st.instruction) > 150) push(`${id} instruction ${len(st.instruction)} chars > 150`);
    if (/\{name\}/.test(st.title + st.instruction)) push(`${id} strings carry a {name} slot`);
    if (['tick', 'bank', 'frames'].includes(face) && !/\{U\}/.test(st.title)) push(`${id} title "${st.title}" has no {U} token (every unit would share one title)`);
    if (['compare', 'mystery'].includes(face)) {
      if (/\{U\}|\{L\}|\{UNIT\}/.test(st.title + st.instruction)) push(`${id} (${face}) carries a unit token — it fans by theme`);
      for (const t of titles) if (new RegExp('(?<!\\p{L})' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu').test(st.title)) push(`${id} title "${st.title}" names the animal "${t}" (the title would print the answer)`);
    }
  }
  // strings
  const s = bank.strings && bank.strings['G2-318'];
  if (!s || typeof s.title !== 'string' || typeof s.instruction !== 'string') push('strings[G2-318] needs title + instruction');
  else {
    if (len(s.title) > 70) push(`title ${len(s.title)} chars > 70`);
    if (WORKSHEET_WORD.test(s.title)) push(`title "${s.title}" carries the worksheet word`);
    if (len(s.instruction) > 150) push(`instruction ${len(s.instruction)} chars > 150`);
    if (/\{name\}/.test(s.title + s.instruction)) push('strings carry a {name} slot');
    if (!/\{U\}/.test(s.title)) push(`title "${s.title}" has no {U} token (every unit would share one title)`);
  }
  // sv: the bare `grupp` token is banned; a compound carrying it must be listed in allowCompound
  if (loc === 'sv') {
    const allow = new Set(bank.allowCompound || []);
    const walk = (o, p) => {
      if (typeof o === 'string') {
        if (GRUPP.test(o)) push(`${p} "${o}" carries the bare token grupp (banned in sv copy)`);
        else if (/grupp/iu.test(o)) { const word = (o.match(/\p{L}*grupp\p{L}*/iu) || [''])[0]; if (!allow.has(word)) push(`${p} "${o}" carries the compound "${word}" not in allowCompound`); }
      } else if (o && typeof o === 'object') for (const [k, v2] of Object.entries(o)) if (k !== 'allowCompound') walk(v2, p + '.' + k);
    };
    walk(bank, 'sv');
  }
  return f;
}

/* ----------------------------------------------------------------- table */
function validateTable(table) {
  const f = [];
  const { fields, choices, animals, exemplars } = table;
  if (!Array.isArray(fields) || fields.length !== 7) f.push('fields must be the 7 design fields');
  for (const [k, a] of Object.entries(animals || {})) {
    for (const fld of fields) {
      if (!(fld in a)) { f.push(`${k}: missing ${fld}`); continue; }
      const v = a[fld];
      if (v === null) continue;
      if (fld === 'fly' || fld === 'swim') { if (typeof v !== 'boolean') f.push(`${k}.${fld} not boolean`); }
      else if (!choices[fld].includes(v)) f.push(`${k}.${fld} = ${JSON.stringify(v)} outside choices`);
    }
    if (!a.pic || !a.pic.theme || !a.pic.noun) { f.push(`${k}: no pic`); continue; }
    if (BW_MARKER.test(a.pic.theme)) f.push(`${k}: picture from the B&W dir ${a.pic.theme}`);
    if (a.reviewed && a.picOpened !== true) f.push(`${k}: reviewed but picture not opened`);
    try { fileUri(a.pic.theme, a.pic.noun); } catch (e) { f.push(`${k}: picture does not resolve: ${e.message}`); }
    try { if (!safeNouns(a.pic.theme, 'en').some((n) => n.vocabKey === k)) f.push(`${k}: not a vocabKey of theme ${a.pic.theme}`); } catch (e) { f.push(`${k}: theme ${a.pic.theme} not cached`); }
  }
  for (const [theme, ex] of Object.entries(exemplars || {})) {
    if (!animals[ex]) { f.push(`exemplar ${theme} → ${ex} not in animals`); continue; }
    try { if (!safeNouns(theme, 'en').some((n) => n.vocabKey === ex)) f.push(`exemplar ${ex} is not pictured in ${theme}`); } catch (e) { f.push(`exemplar theme ${theme} not cached`); }
  }
  if (!exemplars || !exemplars[THEME]) f.push(`no exemplar for the wave theme ${THEME}`);
  return f;
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { theme = THEME, difficulty, unit = null, baseName, strings }) {
  const out = await renderInstance({ type, theme, difficulty, locale: 'en', unit, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="animal-fact-file"]');
    const q = (s) => root ? root.querySelector(s) : null;
    const qa = (s) => root ? [...root.querySelectorAll(s)] : [];
    const img = q('img[data-lcs-hero]');
    const name = q('[data-lcs-name]');
    const lab = (k) => { const l = q(`[data-lcs-label-key="${k}"]`); return l ? l.textContent.trim() : null; };
    const st = q('[data-lcs-starter]'), cap = q('[data-lcs-caption]'), lane = q('[data-lcs-factlane]'), wr = q('[data-lcs-lane="sentence"]');
    return {
      body: rect(document.querySelector('[data-lcs-body]')),
      foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
      headH: rect(document.querySelector('.ws-head')).h,
      titleLines: Math.round(rect(document.querySelector('.ws-title')).h / 33),
      stamps: root ? { ...root.dataset } : null,
      hero: img ? { ...rect(img), src: img.getAttribute('src'), natural: img.naturalWidth, unit: img.dataset.lcsUnit, noun: img.dataset.lcsNoun } : null,
      heroFrame: q('[data-lcs-hero-frame]') ? rect(q('[data-lcs-hero-frame]')) : null,
      name: name ? { text: name.textContent.trim(), px: parseFloat(getComputedStyle(name).fontSize), w: name.scrollWidth, clientW: name.clientWidth } : null,
      rows: qa('[data-lcs-row]').map((r) => {
        const l = r.querySelector('[data-lcs-label-text]'), c = r.querySelector('[data-lcs-label]'), ln = r.querySelector('[data-lcs-lane]');
        const stamps = {}; for (const a of r.attributes) if (a.name.startsWith('data-lcs-fact-')) stamps[a.name.slice('data-lcs-fact-'.length)] = a.value;
        return { field: r.dataset.lcsField, label: l ? l.textContent.trim() : '', labelH: l ? rect(l).h : 0, labelPx: l ? parseFloat(getComputedStyle(l).fontSize) : 0,
          labelScrollW: l ? l.scrollWidth : 0, labelClientW: l ? l.clientWidth : 0, cellScrollW: c ? c.scrollWidth : 0, cellClientW: c ? c.clientWidth : 0, cellH: c ? rect(c).h : 0,
          laneW: ln ? rect(ln).w : 0, laneText: ln ? ln.textContent.trim() : '', laneRows: ln ? ln.querySelectorAll('svg[data-lcs-prim="writing-row"]').length : 0, stamps };
      }),
      drawLabel: lab('drawLabel'), special: lab('special'),
      drawBox: q('[data-lcs-drawslot] [data-lcs-drawbox]') ? rect(q('[data-lcs-drawslot] [data-lcs-drawbox]')) : null,
      specialRows: q('[data-lcs-special]') ? q('[data-lcs-special]').querySelectorAll('svg[data-lcs-prim="writing-row"]').length : 0,
      starter: st ? st.textContent.trim() : null, caption: cap ? cap.textContent.trim() : null,
      laneInner: lane ? rect(lane).w - 36 : null, laneUsed: lane ? ((st || cap) ? rect(st || cap).w : 0) + 10 + (wr ? rect(wr).w : 0) : null, sentenceW: wr ? rect(wr).w : null,
      column: q('[data-lcs-column]') ? rect(q('[data-lcs-column]')) : null,
      lowest: Math.max(...qa('*').map((el) => el.getBoundingClientRect().bottom)),
      icons: qa('.ws-icon').map((i) => Math.min(rect(i).w, rect(i).h)),
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, html: out.html };
}

/**
 * The gate's OWN assertions over one render. `key` = the unit the page must show (null for blank).
 */
function assertRender(name, r, cfg, bank, table, { key, theme = THEME, squeezed = false } = {}) {
  const m = r.m;
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  if (!m.stamps) { ok(false, `${name}: no root`); return; }
  const blank = key == null;
  ok(m.stamps.lcsAnimal === (key || ''), `${name}: root animal "${m.stamps.lcsAnimal}" ≠ ${key || '(blank)'}`);
  ok(m.stamps.lcsFields === cfg.fields.join(','), `${name}: fields stamp ${m.stamps.lcsFields}`);
  // the hero: >= the G2-3 floor, === the config, the picture of THIS unit in THIS theme
  ok(m.icons.length === (blank ? 0 : 1) && m.icons.every((s) => s >= G23_FLOOR), `${name}: icons ${JSON.stringify(m.icons)} (want ${blank ? 0 : 1} × >= ${G23_FLOOR})`);
  if (!blank) {
    ok(!!m.hero && Math.abs(m.hero.w - cfg.pic) < 1 && Math.abs(m.hero.h - cfg.pic) < 1 && m.hero.natural > 0, `${name}: hero ${m.hero && Math.round(m.hero.w)}×${m.hero && Math.round(m.hero.h)} natural ${m.hero && m.hero.natural} (want ${cfg.pic})`);
    const n = safeNouns(theme, 'en').find((x) => x.vocabKey === key);
    const want = n ? fileUri(theme, n.noun) : null;
    ok(!!m.hero && want && m.hero.src === want, `${name}: hero src ${m.hero && m.hero.src && m.hero.src.slice(-40)} ≠ fileUri(${theme}, ${n && n.noun})`);
    ok(!!m.hero && m.hero.unit === key, `${name}: hero unit ${m.hero && m.hero.unit} ≠ ${key}`);
    ok(!!m.name && m.name.text === bank.animals[key].name, `${name}: name "${m.name && m.name.text}" ≠ bank "${bank.animals[key].name}"`);
    ok(!!m.name && m.name.px >= 30 && m.name.w <= m.name.clientW + 0.6, `${name}: name at ${m.name && m.name.px}px, ${m.name && m.name.w}/${m.name && m.name.clientW} px`);
  }
  ok(!!m.heroFrame && Math.abs(m.heroFrame.w - cfg.hero) < 1 && m.heroFrame.h >= cfg.hero - 0.6, `${name}: hero frame ${m.heroFrame && Math.round(m.heroFrame.w)}×${m.heroFrame && Math.round(m.heroFrame.h)} (want ${cfg.hero})`);
  ok(!!m.column && !!m.heroFrame && Math.abs(m.column.bottom - m.heroFrame.bottom) < 1, `${name}: the column ends ${m.column && m.heroFrame && Math.round(m.column.bottom - m.heroFrame.bottom)} px off the hero`);
  // the rows: fields in order, labels === bank literals, <= 2 lines, unclipped, one empty lane each, >= the row floor
  ok(m.rows.map((x) => x.field).join() === cfg.fields.join(), `${name}: rows ${m.rows.map((x) => x.field).join()} ≠ ${cfg.fields.join()}`);
  const lineH = cfg.labelPx + 6;
  for (const row of m.rows) {
    ok(row.label === bank.labels[row.field], `${name}: label ${row.field} "${row.label}" ≠ bank "${bank.labels[row.field]}"`);
    ok(row.labelPx === cfg.labelPx, `${name}: label ${row.field} at ${row.labelPx}px ≠ ${cfg.labelPx}`);
    ok(row.labelH <= 2 * lineH + 0.6, `${name}: label ${row.field} "${row.label}" runs ${Math.round(row.labelH)} px (> 2 lines of ${lineH})`);
    ok(row.labelScrollW <= row.labelClientW + 0.6 && row.cellScrollW <= row.cellClientW + 0.6, `${name}: label ${row.field} "${row.label}" overflows (${row.labelScrollW}/${row.labelClientW}, cell ${row.cellScrollW}/${row.cellClientW})`);
    ok(row.cellH >= cfg.rowMin - 0.6, `${name}: row ${row.field} ${Math.round(row.cellH)} px < floor ${cfg.rowMin}`);
    ok(row.laneRows === 1 && row.laneText === '' && Math.abs(row.laneW - 495) < 1, `${name}: row ${row.field} lane ${row.laneRows} rows, text "${row.laneText}", ${Math.round(row.laneW)} px (want 1 / empty / 495)`);
  }
  // the NODE-SIDE RE-DERIVATION of every fact stamp from the committed table (diff, not trust)
  let checked = 0;
  for (const row of m.rows) {
    const names = Object.keys(row.stamps);
    if (blank) { ok(names.length === 0, `${name}: row ${row.field} carries a stamp on the blank unit`); continue; }
    const expected = table.animals[key][row.field];
    if (expected === null || expected === undefined) {
      ok(names.length === 0, `${name}: row ${row.field} stamps ${JSON.stringify(row.stamps)} where the table is null`);
    } else {
      ok(names.length === 1 && names[0] === row.field, `${name}: row ${row.field} stamps ${JSON.stringify(names)} (want exactly data-lcs-fact-${row.field})`);
      ok(row.stamps[row.field] === String(expected), `${name}: stamp data-lcs-fact-${row.field}="${row.stamps[row.field]}" ≠ table ${JSON.stringify(expected)}`);
      checked++;
    }
  }
  if (!blank) ok(checked > 0, `${name}: 0 fact stamps re-derived (the answer key is empty)`);
  // the draw box / the special block / the fact lane, each === its literal
  if (cfg.drawH) {
    ok(!!m.drawBox && m.drawBox.h >= cfg.drawH - 0.6 && m.drawBox.w >= 300, `${name}: draw box ${m.drawBox && Math.round(m.drawBox.w)}×${m.drawBox && Math.round(m.drawBox.h)} (want >= 300 × ${cfg.drawH})`);
    ok(m.drawLabel === bank.drawLabel, `${name}: draw label "${m.drawLabel}" ≠ bank "${bank.drawLabel}"`);
  } else ok(!m.drawBox, `${name}: a draw box where the config has none`);
  if (cfg.special) {
    ok(m.specialRows === cfg.special.rows && m.special === bank.labels.special, `${name}: special block ${m.specialRows} rows / "${m.special}" (want ${cfg.special.rows} / "${bank.labels.special}")`);
  } else ok(m.specialRows === 0, `${name}: a special block where the config has none`);
  if (cfg.lane) {
    if (blank) ok(m.caption === bank.sentence && m.starter == null, `${name}: blank lane prints "${m.starter || m.caption}" (want the caption "${bank.sentence}")`);
    else {
      const lit = bank.animals[key];
      const slots = {}; for (const k of ['def', 'nom', 'ade']) if (typeof lit[k] === 'string' && lit[k].trim()) slots[k] = lit[k];
      let want = null; try { want = upperFirst(fillSlots(bank.factStarter, slots), 'en'); } catch (e) { want = null; }
      if (want) ok(m.starter === want, `${name}: starter "${m.starter}" ≠ re-filled "${want}"`);
      else ok(m.caption === bank.sentence, `${name}: caption "${m.caption}" ≠ "${bank.sentence}" (no def literal)`);
    }
    ok(m.laneUsed != null && m.laneUsed <= m.laneInner + 0.6 && m.sentenceW >= 200, `${name}: fact lane row ${m.laneUsed && Math.round(m.laneUsed)} / inner ${m.laneInner && Math.round(m.laneInner)}, sentence lane ${m.sentenceW && Math.round(m.sentenceW)}`);
  } else ok(m.starter == null && m.caption == null, `${name}: a fact lane where the config has none`);
  // geometry
  ok(m.lowest <= m.foot + 0.6, `${name}: content reaches ${Math.round(m.lowest)} against the footer at ${Math.round(m.foot)}`);
  if (squeezed) ok(m.body.h <= squeezed, `${name}: body ${Math.round(m.body.h)} px — the fixture did not squeeze the body to <= ${squeezed} (title ${m.titleLines} lines, head ${Math.round(m.headH)})`);
}

/* ----------------------------------------------------------------- poison */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
function buildRefusal(bank, table, d, args) {
  try { TYPE._buildWith.call(TYPE, bank, table, TYPE.difficulty[d], { theme: THEME, locale: 'en', unit: null, ...args }); return []; } catch (e) { return [e.message]; }
}
/** A type whose bodyHtml is the real build (over an injected bank/table/config) rewritten by `fn`. */
function rewired({ bank, table, cfgPatch, fn }) {
  return Object.assign({}, TYPE, { build(args) {
    const cfg = cfgPatch ? { ...TYPE.difficulty[args.difficulty], ...cfgPatch } : TYPE.difficulty[args.difficulty];
    const out = TYPE._buildWith.call(TYPE, bank || bankMod.FACT_FILE.en, table || TABLE, cfg, { theme: args.theme, locale: 'en', unit: args.unit || null });
    if (fn) out.bodyHtml = fn(out.bodyHtml);
    return out;
  } });
}
/** Render a poisoned type and collect the gate's OWN findings without counting them against the control. */
async function gateFindings(page, type, opts, cfg, key) {
  const r = await renderWith(page, type, opts);
  const before = fails.length, saved = assertions;
  assertRender(opts.baseName, r, cfg, bankMod.FACT_FILE.en, TABLE, { key, theme: opts.theme || THEME });
  const own = fails.splice(before);
  assertions = saved;
  return { r, own };
}
/** A synthetic locale block from the EN shape with the locale's vocab names (the P4/P7/P13 seams). */
function syntheticBlock(loc) {
  const b = clone(bankMod.FACT_FILE.en);
  const v = vocab();
  for (const k of Object.keys(b.animals)) { const c = v[k] && v[k][loc] && v[k][loc][0]; if (c) b.animals[k].name = b.animals[k].title = upperFirst(c, loc); }
  return b;
}

/**
 * Long-chrome fixtures (70-char title + 150-char instruction, both legal). The
 * README's 722 = a 3-line title + a 3-line instruction; a 150-char instruction
 * renders 2 lines in the shell's Nunito (design §2 critic), so the de fixture
 * squeezes the body to ~733 and the fi fixture (long words → a 4-line title,
 * the K-319/K-323 measurement) to ~700 — BELOW the 722 floor. Each fixture
 * carries the body ceiling it must reach; d1/d2/d3 must fit under both.
 */
const LONG = {
  de: { title: 'Tiersteckbrief: sechs Fakten über den Igel, ein Satz und sein Zuhause!',
    instruction: 'Finde heraus, was du über dieses Tier weißt. Schreibe in jede Zeile des Steckbriefs einen Fakt, beende dann den Satz unten und male sein Zuhause dazu.', body: 740 },
  fi: { title: 'Siili: eläinryhmä, elinympäristö, ravintotottumukset ja ruumiinpeite!!',
    instruction: 'Ota selvää tästä eläimestä. Kirjoita jokaiselle riville yksi tosiasia, täydennä sitten lause alhaalla ja piirrä lopuksi eläimen kotipaikka laatikkoon.', body: 710 },
};

/* ============================================================== F. FACES */
function cellOf(bank, field, value) {
  if (field === 'legs') return String(value);
  if (field === 'fly' || field === 'swim') return bank.yesno[value ? 'yes' : 'no'];
  return bank.options[field][value].cell;
}
function clueOf(bank, field, value) {
  if (field === 'legs') return bank.legsFrames[value];
  if (field === 'fly' || field === 'swim') return bank.mystery[field][value ? 'true' : 'false'];
  const o = bank.options[field][value];
  return fillSlots(bank.mystery[field], { cell: o.cell, inFrame: o.inFrame });
}
function faceType(face) { return loadType(FACE_IDS[face]); }

/** Everything the node side needs from one rendered face page (any face). */
async function measureFace(page) {
  return page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="animal-fact-file"]');
    const q = (s) => root ? root.querySelector(s) : null;
    const qa = (s) => root ? [...root.querySelectorAll(s)] : [];
    const attrsOf = (el, prefix) => { const o = {}; for (const a of el.attributes) if (a.name.startsWith(prefix)) o[a.name.slice(prefix.length)] = a.value; return o; };
    const foot = document.querySelector('.ws-foot');
    const body = document.querySelector('[data-lcs-body]');
    const hero = q('img[data-lcs-hero]');
    const slot = q('[data-lcs-bankslot]');
    const banner = q('[data-lcs-bank-banner]');
    return {
      stamps: root ? { ...root.dataset } : null,
      body: rect(body), foot: foot.getBoundingClientRect().top, titleLines: Math.round(rect(document.querySelector('.ws-title')).h / 33),
      lowest: Math.max(...qa('*').map((el) => el.getBoundingClientRect().bottom)),
      icons: qa('.ws-icon').map((i) => Math.min(rect(i).w, rect(i).h)),
      hero: hero ? { src: hero.getAttribute('src'), unit: hero.dataset.lcsUnit, w: rect(hero).w } : null,
      name: q('[data-lcs-banner] [data-lcs-name]') ? q('[data-lcs-banner] [data-lcs-name]').textContent.trim() : null,
      rows: qa('[data-lcs-table] [data-lcs-row]').map((r) => {
        const cell = r.querySelector('[data-lcs-lane-cell]'), cr = cell ? rect(cell) : null;
        return { field: r.dataset.lcsField, correct: r.dataset.lcsCorrect, n: r.dataset.lcsN, facts: attrsOf(r, 'data-lcs-fact-'),
          label: (r.querySelector('[data-lcs-label-text]') || { textContent: '' }).textContent.trim(),
          cellH: cr ? cr.h : 0,
          chips: [...r.querySelectorAll('[data-lcs-opt]')].map((c) => ({ key: c.dataset.lcsOpt, text: c.textContent.trim(), w: rect(c).w, h: rect(c).h, inside: cr ? rect(c).right <= cr.right + 0.6 && rect(c).bottom <= cr.bottom + 0.6 : false, clipped: c.scrollWidth > c.clientWidth + 0.6 })),
          lane: !!r.querySelector('[data-lcs-lane]') };
      }),
      bank: slot ? { n: +slot.dataset.lcsBankN, h: rect(slot).h, bannerH: banner ? rect(banner).h : 0, overflow: banner ? (banner.scrollHeight > banner.clientHeight + 0.6 || banner.scrollWidth > banner.clientWidth + 0.6) : true,
        words: [...slot.querySelectorAll('[data-lcs-bank-word]')].map((w) => ({ word: w.textContent.trim(), field: w.dataset.lcsBankField })) } : null,
      mini: qa('[data-lcs-mini]').map((m) => ({ rows: [...m.querySelectorAll('[data-lcs-mini-row]')].map((r) => ({ field: r.dataset.lcsField, value: (r.querySelector('[data-lcs-printed]') || { textContent: '' }).textContent.trim(), facts: attrsOf(r, 'data-lcs-fact-'), clipped: r.querySelector('[data-lcs-printed]') ? r.querySelector('[data-lcs-printed]').scrollWidth > r.querySelector('[data-lcs-printed]').clientWidth + 0.6 : true })) })),
      starters: qa('[data-lcs-framelane] [data-lcs-starter]').map((s) => s.textContent.trim()),
      frameRows: qa('[data-lcs-frame-row]').map((r) => ({ field: r.dataset.lcsFrameField, lines: r.querySelectorAll('svg[data-lcs-prim="writing-row"]').length, h: rect(r).h })),
      files: qa('[data-lcs-file]').map((f) => ({ key: f.dataset.lcsFile, src: (f.querySelector('img[data-lcs-hero]') || { getAttribute: () => null }).getAttribute('src'), name: (f.querySelector('[data-lcs-name]') || { textContent: '' }).textContent.trim(), h: rect(f).h })),
      sd: qa('[data-lcs-sdcell]').map((c) => ({ field: c.dataset.lcsField, same: c.dataset.lcsSame, chips: [...c.querySelectorAll('[data-lcs-sd]')].map((x) => ({ k: x.dataset.lcsSd, text: x.textContent.trim() })) })),
      tiles: banner && !slot ? { h: banner.clientHeight, w: rect(banner).w, list: [...banner.querySelectorAll('[data-lcs-bank]')].map((t) => ({ key: t.dataset.lcsBank, word: t.dataset.lcsBankWord, profile: t.dataset.lcsProfile, src: (t.querySelector('img') || { getAttribute: () => null }).getAttribute('src'), w: rect(t).w })) } : null,
      cards: qa('[data-lcs-riddle]').map((c) => ({ n: c.dataset.lcsRiddle, answer: c.dataset.lcsAnswer, h: rect(c).h, clues: [...c.querySelectorAll('[data-lcs-clue]')].map((cl) => ({ stamp: cl.dataset.lcsClue, text: cl.textContent.trim() })), hasImg: !!c.querySelector('img'), draw: c.querySelector('[data-lcs-drawbox]') ? rect(c.querySelector('[data-lcs-drawbox]')) : null })),
    };
  });
}

async function renderFace(page, type, { theme = THEME, unit = null, baseName, strings, seedEpoch = 1 }) {
  const out = await renderInstance({ type, theme, difficulty: 2, locale: 'en', unit, page, outDir: path.join(OUT, FACE_OUT), baseName, strings, seedEpoch });
  const m = await measureFace(page);
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

/** The gate's OWN assertions + node re-derivation over one face render. */
function assertFace(face, name, r, bank, table, { key, theme = THEME, squeezed = false } = {}) {
  const m = r.m;
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  if (!m.stamps) { ok(false, `${name}: no root`); return; }
  ok(m.stamps.lcsFace === face, `${name}: face stamp "${m.stamps.lcsFace}" ≠ ${face}`);
  ok(m.lowest <= m.foot + 0.6, `${name}: content reaches ${Math.round(m.lowest)} against the footer at ${Math.round(m.foot)}`);
  if (squeezed) ok(m.body.h <= squeezed, `${name}: body ${Math.round(m.body.h)} px — the fixture did not squeeze the body to <= ${squeezed}`);
  ok(m.icons.every((s) => s >= G23_FLOOR), `${name}: an icon under the G2-3 floor ${JSON.stringify(m.icons)}`);
  const nounOf = (k) => safeNouns(theme, 'en').find((x) => x.vocabKey === k);
  let checked = 0;
  if (face === 'tick' || face === 'bank' || face === 'frames') {
    const animal = table.animals[key];
    ok(m.stamps.lcsAnimal === key, `${name}: root animal "${m.stamps.lcsAnimal}" ≠ ${key}`);
    ok(!!m.hero && m.hero.src === fileUri(theme, nounOf(key).noun) && m.hero.unit === key, `${name}: hero src/unit ≠ ${key}`);
    ok(m.name === bank.animals[key].name, `${name}: name "${m.name}" ≠ bank "${bank.animals[key].name}"`);
    const fields = m.stamps.lcsFields.split(',');
    ok(fields.every((f) => animal[f] !== null), `${name}: a null field on a face (${fields.filter((f) => animal[f] === null).join(',')})`);
    if (face === 'tick') {
      const n = +m.stamps.lcsChoices;
      ok(m.rows.length === fields.length, `${name}: ${m.rows.length} rows ≠ ${fields.length}`);
      const wide = [];
      for (const row of m.rows) {
        const f = row.field, truth = animal[f];
        const wantN = (f === 'fly' || f === 'swim') ? 2 : Math.min(n, (f === 'legs' ? table.choices.legs.length : table.choices[f].length));
        ok(row.chips.length === wantN && +row.n === wantN, `${name}: row ${f} ${row.chips.length} chips (want ${wantN})`);
        ok(row.facts[f] === String(truth) && Object.keys(row.facts).length === 1, `${name}: row ${f} fact stamp ${JSON.stringify(row.facts)} ≠ table ${JSON.stringify(truth)}`);
        const ci = +row.correct;
        const at = row.chips[ci];
        ok(!!at && at.key === String(truth), `${name}: row ${f} chip ${ci} "${at && at.key}" ≠ table "${truth}"`);
        if (at && at.key === String(truth)) checked++;
        const pool = f === 'legs' ? table.choices.legs.map(String) : (f === 'fly' || f === 'swim') ? ['true', 'false'] : table.choices[f];
        ok(row.chips.every((c) => pool.includes(c.key)), `${name}: row ${f} a chip key outside choices (${row.chips.map((c) => c.key).join(',')})`);
        ok(new Set(row.chips.map((c) => c.key)).size === row.chips.length, `${name}: row ${f} chip keys repeat`);
        for (const c of row.chips) {
          const v = f === 'legs' ? +c.key : (f === 'fly' || f === 'swim') ? c.key === 'true' : c.key;
          ok(c.text === cellOf(bank, f, v), `${name}: row ${f} chip "${c.text}" ≠ bank cell "${cellOf(bank, f, v)}"`);
          ok(c.inside && !c.clipped && c.h >= 36, `${name}: row ${f} chip "${c.text}" ${Math.round(c.w)}×${Math.round(c.h)} inside ${c.inside} clipped ${c.clipped}`);
        }
        ok(row.chips.reduce((sum, c) => sum + c.w, 0) + 8 * (row.chips.length - 1) <= 495 + 0.6, `${name}: row ${f} chips wider than the 495 lane`);
        ok(row.cellH >= 60 - 0.6, `${name}: row ${f} ${Math.round(row.cellH)} px < the row floor 60`);
        if (row.chips.length === n) wide.push(ci);
      }
      ok(new Set(wide).size === Math.min(n, wide.length), `${name}: the correct index takes only positions ${[...new Set(wide)].join(',')} over ${wide.length} ${n}-chip rows`);
    }
    if (face === 'bank') {
      ok(!!m.bank, `${name}: no bank`);
      if (m.bank) {
        const truths = fields.map((f) => cellOf(bank, f, animal[f]));
        const words = m.bank.words.map((w) => w.word);
        ok(words.length === fields.length + (+m.stamps.lcsBankExtra) && m.bank.n === words.length, `${name}: ${words.length} bank words (want ${fields.length} + ${m.stamps.lcsBankExtra})`);
        ok(new Set(words).size === words.length, `${name}: a bank word repeats`);
        for (const t of truths) ok(words.includes(t), `${name}: the bank lacks the truth "${t}"`);
        checked += truths.filter((t) => words.includes(t)).length;
        const distractors = m.bank.words.filter((w) => !truths.includes(w.word));
        ok(distractors.length === +m.stamps.lcsBankExtra, `${name}: ${distractors.length} distractors (want ${m.stamps.lcsBankExtra})`);
        for (const w of distractors) {
          const f = w.field;
          const pool = f === 'legs' ? table.choices.legs : (f === 'fly' || f === 'swim') ? [true, false] : table.choices[f];
          ok(fields.includes(f) && pool.some((v) => v !== animal[f] && cellOf(bank, f, v) === w.word), `${name}: distractor "${w.word}" is not another option of ${f}`);
        }
        ok(new Set(distractors.map((w) => w.field)).size >= Math.min(2, distractors.length), `${name}: the distractors come from ${new Set(distractors.map((w) => w.field)).size} field(s) (want >= 2)`);
        for (const w of m.bank.words) ok(fields.includes(w.field) && (w.field === 'legs' ? table.choices.legs.map(String).includes(w.word) : (w.field === 'fly' || w.field === 'swim') ? [bank.yesno.yes, bank.yesno.no].includes(w.word) : Object.values(bank.options[w.field]).some((o) => o.cell === w.word)), `${name}: bank word "${w.word}" is not a ${w.field} cell`);
        ok(!m.bank.overflow && m.bank.bannerH <= m.bank.h + 0.6 && Math.abs(m.bank.h - (+m.stamps.lcsBankslot)) < 1, `${name}: the bank overflows its ${Math.round(m.bank.h)}-px slot (banner ${Math.round(m.bank.bannerH)}, overflow ${m.bank.overflow})`);
        for (const row of m.rows) ok(row.lane && row.facts[row.field] === String(animal[row.field]), `${name}: row ${row.field} lane/stamp ${JSON.stringify(row.facts)}`);
      }
    }
    if (face === 'frames') {
      ok(m.mini.length === 1, `${name}: ${m.mini.length} printed files`);
      const rows = m.mini[0] ? m.mini[0].rows : [];
      ok(rows.map((r) => r.field).join() === fields.join(), `${name}: printed rows ${rows.map((r) => r.field).join()}`);
      for (const r of rows) {
        ok(r.value === cellOf(bank, r.field, animal[r.field]) && r.facts[r.field] === String(animal[r.field]) && !r.clipped, `${name}: printed ${r.field} "${r.value}" (stamp ${JSON.stringify(r.facts)}) ≠ table "${cellOf(bank, r.field, animal[r.field])}"`);
        if (r.value === cellOf(bank, r.field, animal[r.field])) checked++;
      }
      const lit = bank.animals[key];
      const slots = {}; for (const k of ['def', 'nom', 'ade']) if (typeof lit[k] === 'string' && lit[k].trim()) slots[k] = lit[k];
      const want = bank.frames.slice(0, +m.stamps.lcsFrames).map((fr) => upperFirst(fillSlots(fr.text, slots), 'en'));
      ok(JSON.stringify(m.starters) === JSON.stringify(want), `${name}: starters ${JSON.stringify(m.starters)} ≠ re-filled ${JSON.stringify(want)}`);
      for (const st of m.starters) ok(len(st) <= 22 && !/[.?!]$/.test(st), `${name}: starter "${st}" (${len(st)} chars)`);
      bank.frames.slice(0, +m.stamps.lcsFrames).forEach((fr, i) => { const v = cellOf(bank, fr.field, animal[fr.field]); ok(!new RegExp('(?<!\\p{L})' + v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu').test(m.starters[i] || ''), `${name}: starter ${i + 1} prints its target "${v}"`); });
      ok(m.frameRows.length === (+m.stamps.lcsFrames) + (+m.stamps.lcsFree) && m.frameRows.every((r) => r.lines === +m.stamps.lcsFrameLines), `${name}: frame rows ${JSON.stringify(m.frameRows.map((r) => r.lines))}`);
      ok(m.rows.length === 0 && !m.bank, `${name}: the frames face renders a table/bank`);
    }
  }
  if (face === 'compare') {
    const keys = (m.stamps.lcsAnimals || '').split(',');
    const fields = m.stamps.lcsFields.split(',');
    ok(keys.length === 2 && keys[0] !== keys[1] && keys.every((k) => table.animals[k]), `${name}: animals ${m.stamps.lcsAnimals}`);
    ok(m.files.map((f) => f.key).join() === keys.join(), `${name}: files ${m.files.map((f) => f.key).join()}`);
    m.files.forEach((f) => {
      ok(f.src === fileUri(theme, nounOf(f.key).noun), `${name}: file ${f.key} picture ≠ fileUri`);
      ok(f.name === bank.animals[f.key].name, `${name}: file ${f.key} name "${f.name}"`);
    });
    ok(m.mini.length === 2, `${name}: ${m.mini.length} printed files`);
    m.mini.forEach((mi, i) => {
      const a = table.animals[keys[i]];
      for (const r of mi.rows) { ok(r.value === cellOf(bank, r.field, a[r.field]) && r.facts[r.field] === String(a[r.field]) && !r.clipped, `${name}: file ${keys[i]} ${r.field} "${r.value}" ≠ table`); if (r.value === cellOf(bank, r.field, a[r.field])) checked++; }
    });
    let same = 0;
    ok(m.sd.map((c) => c.field).join() === fields.join(), `${name}: grid fields ${m.sd.map((c) => c.field).join()}`);
    for (const c of m.sd) {
      const want = table.animals[keys[0]][c.field] === table.animals[keys[1]][c.field];
      ok(c.same === (want ? '1' : '0'), `${name}: cell ${c.field} same="${c.same}" but the table says ${want}`);
      if (want) same++;
      ok(c.chips.map((x) => x.k).join() === 'same,diff' && c.chips[0].text === bank.sameDiff.same && c.chips[1].text === bank.sameDiff.diff, `${name}: cell ${c.field} chips ${JSON.stringify(c.chips)}`);
    }
    ok(same === fields.length / 2, `${name}: ${same}/${fields.length} same (want exactly half)`);
    ok(m.frameRows.length === m.stamps.lcsLanes.split(',').map(Number).reduce((a, b) => a + b, 0), `${name}: ${m.frameRows.length} lane rows`);
  }
  if (face === 'mystery') {
    ok(!!m.tiles, `${name}: no picture bank`);
    if (m.tiles) {
      ok(m.tiles.list.length === +m.stamps.lcsBankSize && m.tiles.h <= 110, `${name}: bank ${m.tiles.list.length} tiles, ${m.tiles.h} px high (want ${m.stamps.lcsBankSize} on one row <= 110)`);
      for (const t of m.tiles.list) {
        const a = table.animals[t.key];
        ok(!!a && t.profile === table.fields.map((f) => f + '=' + String(a[f])).join(';'), `${name}: tile ${t.key} profile ≠ table`);
        if (a && t.profile === table.fields.map((f) => f + '=' + String(a[f])).join(';')) checked++;
        ok(!!a && t.word === bank.animals[t.key].name && t.src === fileUri(theme, nounOf(t.key).noun), `${name}: tile ${t.key} name/picture`);
        ok(len(t.word) <= 9, `${name}: tile name "${t.word}" > 9 letters`);
      }
      const ks = m.tiles.list.map((t) => t.key);
      for (let i = 0; i < ks.length; i++) for (let j = i + 1; j < ks.length; j++) ok(table.fields.some((f) => table.animals[ks[i]][f] !== table.animals[ks[j]][f]), `${name}: ${ks[i]} and ${ks[j]} share every table field`);
      ok(m.cards.length === +m.stamps.lcsPuzzles, `${name}: ${m.cards.length} cards`);
      const answers = new Set();
      for (const c of m.cards) {
        answers.add(c.answer);
        ok(ks.includes(c.answer) && !c.hasImg, `${name}: card ${c.n} answer ${c.answer} in bank ${ks.includes(c.answer)}, picture ${c.hasImg}`);
        ok(c.clues.length === +m.stamps.lcsClues, `${name}: card ${c.n} ${c.clues.length} clues`);
        const a = table.animals[c.answer] || {};
        for (const cl of c.clues) {
          const [f, v] = cl.stamp.split('=');
          ok(String(a[f]) === v, `${name}: card ${c.n} clue ${cl.stamp} ≠ table ${f}=${a[f]}`);
          const val = f === 'legs' ? +v : (f === 'fly' || f === 'swim') ? v === 'true' : v;
          ok(cl.text === clueOf(bank, f, val), `${name}: card ${c.n} clue "${cl.text}" ≠ bank "${clueOf(bank, f, val)}"`);
          if (cl.text === clueOf(bank, f, val)) checked++;
        }
        const survivors = ks.filter((k) => c.clues.every((cl) => { const [f, v] = cl.stamp.split('='); return String(table.animals[k][f]) === v; }));
        ok(survivors.length === 1 && survivors[0] === c.answer, `${name}: card ${c.n} the table leaves [${survivors.join(',')}] for the clues, answer ${c.answer}`);
        ok(!!c.draw && c.draw.w >= 100 && c.draw.h >= 100, `${name}: card ${c.n} draw box`);
      }
      ok(answers.size === m.cards.length, `${name}: answers repeat`);
    }
  }
  ok(checked > 0, `${name}: 0 answer-key stamps re-derived`);
}

const facePoisonLog = [];
function judgeFace(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  facePoisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
/** A face type whose bodyHtml is rewritten by fn (over the real build, an injected bank/table/config allowed). */
function rewiredFace(face, { bank, table, cfgPatch, fn }) {
  const ft = faceType(face);
  return Object.assign({}, ft, { build(args, ctx) {
    const cfg = cfgPatch ? { ...ft.difficulty[2], ...cfgPatch } : ft.difficulty[2];
    const out = TYPE._buildWith.call(ft, bank || bankMod.FACT_FILE.en, table || TABLE, cfg, { theme: args.theme, locale: 'en', unit: args.unit || null }, ctx);
    if (fn) out.bodyHtml = fn(out.bodyHtml);
    return out;
  } });
}
async function faceFindings(page, face, type, opts, key) {
  const r = await renderFace(page, type, opts);
  const before = fails.length, saved = assertions;
  assertFace(face, opts.baseName, r, bankMod.FACT_FILE.en, TABLE, { key, theme: opts.theme || THEME });
  const own = fails.splice(before);
  assertions = saved;
  return { r, own };
}
function faceRefusal(face, args, cfgPatch) {
  const ft = faceType(face);
  try { TYPE._buildWith.call(ft, bankMod.FACT_FILE.en, args.table || TABLE, { ...ft.difficulty[2], ...(cfgPatch || {}) }, { theme: args.theme || THEME, locale: 'en', unit: args.unit || null }, { rng: makeRng('x') }); return []; } catch (e) { return [e.message]; }
}

async function runFaces(page, en) {
  const pngs = [];
  const seeds = QUICK ? 6 : 20;
  // strings: the emitted specs' EN title/instruction === the bank's block (the panels see every string the family prints)
  for (const [face, id] of Object.entries(FACE_IDS)) {
    const ft = faceType(face);
    ok(ft.id === id && ft.exerciseType === 'animal-fact-file', `${id}: emitted spec id/type`);
    ok(!!en.strings[id] && ft.i18n.en.title === en.strings[id].title && ft.i18n.en.instruction === en.strings[id].instruction, `${id}: the emitted EN strings ≠ bank.strings[${id}]`);
    ok(JSON.stringify(ft.difficulty[2]) !== JSON.stringify(TYPE.difficulty[2]), `${id}: resolves to the base d2 config`);
    if (face === 'compare' || face === 'mystery') ok(ft.unitAxis && ft.unitAxis.applicable === false, `${id}: must fan by theme (unitAxis off)`);
    else ok(ft.unitAxis && ft.unitAxis.applicable === true && /\{U\}/.test(ft.i18n.en.title), `${id}: must fan by unit with {U}`);
  }
  // renders: shipped chrome + LONG de + LONG fi
  for (const face of Object.keys(FACE_IDS)) {
    const ft = faceType(face);
    const unitFace = ['tick', 'bank', 'frames'].includes(face);
    const key = unitFace ? EXEMPLAR : null;
    const r = await renderFace(page, ft, { baseName: `${ft.id}-d2-en` });
    assertFace(face, `${ft.id} ${face}`, r, en, TABLE, { key });
    pngs.push(r.png);
    const extra = face === 'tick' ? `correct ${r.m.rows.map((x) => x.correct).join('')}` : face === 'bank' ? `bank [${r.m.bank.words.map((w) => w.word).join(' ')}]` : face === 'frames' ? `starters ${JSON.stringify(r.m.starters)}` : face === 'compare' ? `${r.m.stamps.lcsAnimals} same ${r.m.sd.map((c) => c.same).join('')}` : `bank [${r.m.tiles.list.map((t) => t.key).join(' ')}] ${r.m.tiles.h} px, answers ${r.m.cards.map((c) => c.answer).join(',')}`;
    console.log(`[F] ${ft.id} ${face}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)} · ${extra}`);
    for (const k of Object.keys(LONG)) {
      const rl = await renderFace(page, ft, { baseName: `${ft.id}-d2-en-longchrome-${k}`, strings: LONG[k] });
      assertFace(face, `${ft.id} ${face} long chrome ${k}`, rl, en, TABLE, { key, squeezed: LONG[k].body });
      pngs.push(rl.png);
      console.log(`[F] ${ft.id} ${face} long chrome ${k}: verify ${rl.verify.length} lints ${rl.lints.length} body ${Math.round(rl.m.body.h)} (title ${rl.m.titleLines} lines) lowest ${Math.round(rl.m.lowest)} vs foot ${Math.round(rl.m.foot)}`);
    }
    if (unitFace) {
      const rf = await renderFace(page, ft, { unit: 'fox', baseName: `${ft.id}-d2-en-ufox` });
      assertFace(face, `${ft.id} ${face} unit fox`, rf, en, TABLE, { key: 'fox' });
      pngs.push(rf.png);
    }
  }
  // the seed sweep (node build only): variety + the position bots
  {
    const rngFor = (id, k) => makeRng(instanceSeed({ typeId: id, theme: THEME, difficulty: 2, seedEpoch: k }));
    const bodies = { tick: new Set(), bank: new Set(), compare: new Set(), mystery: new Set() };
    const tickPos = new Set(); const pairs = new Set(); const patterns = new Set(); const answers = new Set();
    const botHits = [0, 0, 0, 0, 0, 0]; let botTotal = 0; const slotAnswers = [new Set(), new Set(), new Set()];
    for (let k = 1; k <= seeds; k++) {
      const t = faceType('tick').build({ theme: THEME, difficulty: 2, locale: 'en' }, { rng: rngFor('G2-339', k) });
      bodies.tick.add(t.bodyHtml); t.meta.correctIdx.forEach((i) => tickPos.add(i));
      ok(new Set(t.meta.correctIdx.slice(0, 5)).size === 3, `tick seed ${k}: correct index ${t.meta.correctIdx.join('')} does not take all 3 positions`);
      const b = faceType('bank').build({ theme: THEME, difficulty: 2, locale: 'en' }, { rng: rngFor('G2-340', k) });
      bodies.bank.add(b.bodyHtml);
      const c = faceType('compare').build({ theme: THEME, difficulty: 2, locale: 'en' }, { rng: rngFor('G2-342', k) });
      bodies.compare.add(c.bodyHtml); pairs.add(c.meta.animals.slice().sort().join('+')); patterns.add(c.meta.same.join(''));
      const my = faceType('mystery').build({ theme: THEME, difficulty: 2, locale: 'en' }, { rng: rngFor('G2-343', k) });
      bodies.mystery.add(my.bodyHtml); my.meta.answers.forEach((a, i) => { answers.add(a); botHits[my.meta.bank.indexOf(a)]++; botTotal++; slotAnswers[i].add(my.meta.bank.indexOf(a)); });
    }
    ok(bodies.tick.size >= Math.min(seeds, 4) && bodies.bank.size >= Math.min(seeds, 4), `sweep: tick ${bodies.tick.size} / bank ${bodies.bank.size} distinct pages over ${seeds} seeds`);
    ok(pairs.size >= Math.min(seeds, 3) && patterns.size >= 2, `sweep: compare ${pairs.size} pairs, ${patterns.size} same-patterns over ${seeds} seeds (the chip pattern must not be constant)`);
    ok(answers.size >= 4 && bodies.mystery.size >= Math.min(seeds, 4), `sweep: mystery ${answers.size} distinct answers, ${bodies.mystery.size} distinct pages`);
    const best = Math.max(...botHits) / botTotal;
    ok(best <= 2 / 6 + 1e-9, `sweep: a fixed-position bank bot scores ${best.toFixed(2)} (> 2/6) over ${botTotal} riddles`);
    ok(slotAnswers.every((sa) => sa.size >= 2), `sweep: a riddle slot always points at the same bank position ${JSON.stringify(slotAnswers.map((x) => [...x]))}`);
    console.log(`[F] sweep ${seeds} seeds: tick positions ${[...tickPos].sort().join('')} · compare pairs ${pairs.size} patterns ${[...patterns].join(' ')} · mystery answers ${[...answers].join(' ')} best position bot ${best.toFixed(2)}`);
  }
  // refusals
  {
    const refuse = (face, args, cfgPatch, re, what) => { const f = faceRefusal(face, args, cfgPatch); ok(f.some((x) => re.test(x)), `${what}: expected /${re.source}/, got ${JSON.stringify(f)}`); };
    refuse('compare', { unit: 'fox' }, null, /fans by theme — a unit/, 'a unit on compare');
    refuse('mystery', { unit: 'fox' }, null, /fans by theme — a unit/, 'a unit on mystery');
    refuse('tick', { unit: 'blank' }, null, /no blank unit/, 'the blank unit on tick');
    refuse('bank', { unit: 'blank' }, null, /no blank unit/, 'the blank unit on bank');
    refuse('frames', { unit: 'blank' }, null, /no blank unit/, 'the blank unit on frames');
    for (const face of ['tick', 'bank', 'frames']) refuse(face, { unit: 'turtle' }, null, /not 7\/7/, `turtle (null covering/habitat) on ${face}`);
    refuse('compare', { theme: 'fruits' }, null, /not an animal theme/, 'a fruit theme on compare');
    refuse('mystery', { theme: 'animals bw' }, null, /B&W/, 'a B&W theme on mystery');
    refuse('mystery', {}, { bankNameMax: 3 }, /names <= 3 letters < bank/, 'a bank cap no forest name fits');
    // the compare face on a table where every forest animal prints the same 4 fields → no legal pair
    const flat = clone(TABLE); for (const k of Object.keys(flat.animals)) Object.assign(flat.animals[k], { class: 'mammal', habitat: 'land', diet: 'both', covering: 'fur' });
    refuse('compare', { table: flat }, null, /no two verifiable animals share exactly 2/, 'compare on a table with no legal pair');
    const twin = clone(TABLE); for (const k of Object.keys(twin.animals)) Object.assign(twin.animals[k], { class: 'mammal', habitat: 'land', diet: 'both', covering: 'fur', legs: 4, fly: false, swim: true });
    refuse('mystery', { table: twin }, null, /no 6-animal bank/, 'mystery on a table where every animal shares every field');
  }
  // ---- face poisons
  // P2 — an F6 bank with two 0-contradiction animals: a non-target tile's profile := the target's (verify: two right answers; node: profile ≠ table)
  {
    const p = rewiredFace('mystery', { fn: (h) => {
      const answer = /data-lcs-riddle="1" data-lcs-answer="([a-z]+)"/.exec(h)[1];
      const prof = new RegExp('data-lcs-bank="' + answer + '" data-lcs-bank-word="[^"]*" data-lcs-profile="([^"]*)"').exec(h)[1];
      const other = [...h.matchAll(/data-lcs-bank="([a-z]+)"/g)].map((x) => x[1]).find((k) => k !== answer);
      return h.replace(new RegExp('(data-lcs-bank="' + other + '" data-lcs-bank-word="[^"]*" data-lcs-profile=")[^"]*"'), '$1' + prof + '"');
    } });
    const { r, own } = await faceFindings(page, 'mystery', p, { baseName: 'G2-343-poison-P2' });
    const a = judgeFace('P2 verify', r.verify, /share every field \(two right answers\)|the clues leave \[[a-z]+,[a-z]+\]/);
    const b = judgeFace('P2 node', own, /profile ≠ table/);
    if (a && b) faceKilled++;
  }
  // P3a — an F2 row with a repeated chip key; P3b — data-lcs-correct pointing at a distractor
  {
    const pa = rewiredFace('tick', { fn: (h) => h.replace(/(data-lcs-field="class"[^>]*>[\s\S]*?<span class="ws-pill" data-lcs-opt=")([a-z]+)("[^>]*>)[a-z]+(<\/span><span class="ws-pill" data-lcs-opt=")[a-z]+("[^>]*>)[a-z]+(<\/span>)/, (m0, a1, k1, a2, a3, a4, a5) => a1 + 'mammal' + a2 + 'mammal' + a3 + 'mammal' + a4 + 'mammal' + a5) });
    const ra = await faceFindings(page, 'tick', pa, { baseName: 'G2-339-poison-P3a' }, EXEMPLAR);
    const a = judgeFace('P3a verify', ra.r.verify, /row class: chip keys repeat/);
    const pb = rewiredFace('tick', { fn: (h) => h.replace(/data-lcs-correct="(\d)" data-lcs-n="3"/, (m0, i) => `data-lcs-correct="${(+i + 1) % 3}" data-lcs-n="3"`) });
    const rb = await faceFindings(page, 'tick', pb, { baseName: 'G2-339-poison-P3b' }, EXEMPLAR);
    const b = judgeFace('P3b verify', rb.r.verify, /≠ the fact stamp/);
    const c = judgeFace('P3b node', rb.own, /chip \d "[a-z0-9]+" ≠ table/);
    if (a && b && c) faceKilled++;
  }
  // P6 — an F3 bank missing the true covering (spines dropped): verify (count / no word for covering) + node (the bank lacks the truth)
  {
    const p = rewiredFace('bank', { fn: (h) => h.replace(/<span class="ws-bankword"[^>]*data-lcs-bank-word="spines"[^>]*><span>spines<\/span><\/span>/, '') });
    const { r, own } = await faceFindings(page, 'bank', p, { baseName: 'G2-340-poison-P6' }, EXEMPLAR);
    const a = judgeFace('P6 verify', r.verify, /bank words \(stamp|no word for field covering/);
    const b = judgeFace('P6 node', own, /lacks the truth "spines"/);
    if (a && b) faceKilled++;
  }
  // P8 — an F5 pair printed as 4/4 same: the second file's printed values + stamps := the first's (verify: half rule + same re-derived; node: stamp ≠ table)
  {
    const p = rewiredFace('compare', { fn: (h) => {
      // the second file's printed rows := the first's (values + stamps), every cell stamped same
      const parts = h.split('<div data-lcs-file="');
      if (parts.length !== 3) return h;
      const rows0 = [...parts[1].matchAll(/data-lcs-field="([a-z]+)" data-lcs-value="([^"]*)" data-lcs-fact-[a-z]+="([^"]*)"/g)];
      let f1 = parts[2];
      for (const [, fld, val, fact] of rows0) {
        f1 = f1.replace(new RegExp('(data-lcs-field="' + fld + '" data-lcs-value=")[^"]*(" data-lcs-fact-' + fld + '=")[^"]*("[\\s\\S]*?<span data-lcs-printed[^>]*>)[^<]*(<\\/span>)'), (m0, a, b, c, d) => a + val + b + fact + c + val + d);
      }
      return (parts[0] + '<div data-lcs-file="' + parts[1] + '<div data-lcs-file="' + f1).replace(/data-lcs-same="0"/g, 'data-lcs-same="1"');
    } });
    const { r, own } = await faceFindings(page, 'compare', p, { baseName: 'G2-342-poison-P8' });
    const a = judgeFace('P8 verify', r.verify, /4 of 4 fields are the same/);
    const b = judgeFace('P8 node', own, /≠ table|same="1" but the table says false/);
    if (a && b) faceKilled++;
  }
  // P12 — an F6 title naming the animal (validator)
  {
    const b = clone(en); b.strings['G2-343'].title = 'Who Am I? Hedgehog Mystery';
    if (judgeFace('P12', validateBank(b, 'en'), /G2-343 title .* names the animal "Hedgehog"/)) faceKilled++;
  }
  // P14 — an F6 bank of six 13-letter names → the bank wraps to two rows (verify)
  {
    const p = rewiredFace('mystery', { fn: (h) => { let i = 0; return h.replace(/(data-lcs-bank-word=")[^"]*("[^>]*><img[^>]*><span>)[^<]*(<\/span>)/g, (m0, a, b, c) => a + 'Hippopotamus' + (i++) + b + 'Hippopotamus' + (i - 1) + c); } });
    const { r } = await faceFindings(page, 'mystery', p, { baseName: 'G2-343-poison-P14' });
    if (judgeFace('P14 verify', r.verify, /the bank is \d+ px high \(> 110/)) faceKilled++;
  }
  // PF1 — tick correct index constant at 0 (a position bot wins): every row's chips re-ordered so the truth is first
  {
    const p = rewiredFace('tick', { fn: (h) => h.replace(/data-lcs-correct="(\d)"/g, 'data-lcs-correct="0"') });
    const { r, own } = await faceFindings(page, 'tick', p, { baseName: 'G2-339-poison-PF1' }, EXEMPLAR);
    const a = judgeFace('PF1 verify', r.verify, /takes only positions 0 over|≠ the fact stamp/);
    const b = judgeFace('PF1 node', own, /takes only positions|≠ table/);
    if (a && b) faceKilled++;
  }
  // PF2 — a frames starter > 22 chars (refusal, the animal drops); PF3 — a frames starter printing its target fact (refusal)
  {
    const b2 = clone(en); b2.frames[0].text = '{def} is an animal that is';
    const f2 = (() => { try { TYPE._buildWith.call(faceType('frames'), b2, TABLE, faceType('frames').difficulty[2], { theme: THEME, locale: 'en', unit: null }, { rng: makeRng('x') }); return []; } catch (e) { return [e.message]; } })();
    const a = judgeFace('PF2', f2, /starter "The hedgehog is an animal that is" is 3\d chars > 22/);
    const b3 = clone(en); b3.frames[2].text = '{def} eats both';   // 22 chars filled: the length rule stays silent, the target rule must fire
    const f3 = (() => { try { TYPE._buildWith.call(faceType('frames'), b3, TABLE, faceType('frames').difficulty[2], { theme: THEME, locale: 'en', unit: null }, { rng: makeRng('x') }); return []; } catch (e) { return [e.message]; } })();
    const b = judgeFace('PF3', f3, /prints its own target fact "both"/);
    const c = judgeFace('PF3 validator', validateBank(b3, 'en'), /frame "\{def\} eats both" prints the option literal/);
    if (a) faceKilled++;
    if (b && c) faceKilled++;
  }
  // PF4 — a mystery clue naming the answer (verify: prints its answer; node: clue text ≠ bank)
  {
    const p = rewiredFace('mystery', { fn: (h) => {
      const answer = /data-lcs-riddle="1" data-lcs-answer="([a-z]+)"/.exec(h)[1];
      const word = new RegExp('data-lcs-bank="' + answer + '" data-lcs-bank-word="([^"]*)"').exec(h)[1];
      return h.replace(/(data-lcs-riddle="1"[\s\S]*?<span data-lcs-clue="[^"]*"[^>]*>)[^<]*(<\/span>)/, '$1I am the ' + word.toLowerCase() + '.$2');
    } });
    const { r, own } = await faceFindings(page, 'mystery', p, { baseName: 'G2-343-poison-PF4' });
    const a = judgeFace('PF4 verify', r.verify, /card 1: prints its answer/);
    const b = judgeFace('PF4 node', own, /card 1 clue "I am the [a-z]+\." ≠ bank/);
    if (a && b) faceKilled++;
  }
  // PF5 — compare chips swapped (different | same)
  {
    const p = rewiredFace('compare', { fn: (h) => h.replace(/(<span class="ws-pill" data-lcs-sd=")same("[^>]*>)same(<\/span>)(<span class="ws-pill" data-lcs-sd=")diff("[^>]*>)different(<\/span>)/, '$1diff$2different$3$4same$5same$6') });
    const { r } = await faceFindings(page, 'compare', p, { baseName: 'G2-342-poison-PF5' });
    if (judgeFace('PF5 verify', r.verify, /chips diff,same \(want same,diff/)) faceKilled++;
  }
  // PF6 — data-lcs-same flipped on one cell (verify re-derives from the printed stamps; node from the table)
  {
    const p = rewiredFace('compare', { fn: (h) => h.replace(/data-lcs-same="1"/, 'data-lcs-same="0"') });
    const { r, own } = await faceFindings(page, 'compare', p, { baseName: 'G2-342-poison-PF6' });
    const a = judgeFace('PF6 verify', r.verify, /data-lcs-same="0" but the files print the same/);
    const b = judgeFace('PF6 node', own, /same="0" but the table says true/);
    if (a && b) faceKilled++;
  }
  // PF7 — a draw box on the frames face
  {
    const p = rewiredFace('frames', { fn: (h) => h.replace('<div class="ws-lane" data-lcs-framelane', '<span data-lcs-drawbox style="display:block;width:300px;height:100px"></span><div class="ws-lane" data-lcs-framelane') });
    const { r } = await faceFindings(page, 'frames', p, { baseName: 'G2-341-poison-PF7' }, EXEMPLAR);
    if (judgeFace('PF7 verify', r.verify, /the frames face has a draw box/)) faceKilled++;
  }
  // PF8 — a mystery tile profile edited (node: ≠ table)
  {
    const p = rewiredFace('mystery', { fn: (h) => h.replace(/data-lcs-profile="class=([a-z]+);/, (m0, c) => `data-lcs-profile="class=${c === 'mammal' ? 'bird' : 'mammal'};`) });
    const { own } = await faceFindings(page, 'mystery', p, { baseName: 'G2-343-poison-PF8' });
    if (judgeFace('PF8 node', own, /profile ≠ table/)) faceKilled++;
  }
  // PF9 — a printed cell edited on the frames face (verify: text ≠ stamp; node: ≠ table)
  {
    const p = rewiredFace('frames', { fn: (h) => h.replace(/(<div data-lcs-mini-row data-lcs-field="diet"[\s\S]*?<span data-lcs-printed[^>]*>)both(<\/span>)/, '$1meat$2') });
    const { r, own } = await faceFindings(page, 'frames', p, { baseName: 'G2-341-poison-PF9' }, EXEMPLAR);
    const a = judgeFace('PF9 verify', r.verify, /printed row diet: text "meat" ≠ stamp "both"/);
    const b = judgeFace('PF9 node', own, /printed diet "meat"/);
    if (a && b) faceKilled++;
  }
  // PF10 — a bank word edited (verify: text ≠ stamp; node: lacks the truth)
  {
    const p = rewiredFace('bank', { fn: (h) => h.replace(/(data-lcs-bank-word="spines"[^>]*><span>)spines(<\/span>)/, '$1spine$2') });
    const { r, own } = await faceFindings(page, 'bank', p, { baseName: 'G2-340-poison-PF10' }, EXEMPLAR);
    const a = judgeFace('PF10 verify', r.verify, /bank word "spine" ≠ stamp "spines"/);
    const b = judgeFace('PF10 node', own, /lacks the truth "spines"/);
    if (a && b) faceKilled++;
  }
  console.log('face poisons:\n' + facePoisonLog.join('\n'));
  ok(faceKilled === FACE_TOTAL, `face poison: ${faceKilled}/${FACE_TOTAL} killed`);
  console.log(`[F] renders: ${pngs.length} PNGs under out/dev/${FACE_OUT}/`);
}

async function main() {
  const banks = bankMod.FACT_FILE;
  for (const loc of Object.keys(banks)) {
    const f = validateBank(banks[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`bank ${loc}: ${LABEL_KEYS.length} labels, ${Object.keys(banks[loc].animals || {}).length} animal literals, ${CHIP_FIELDS.reduce((s, k) => s + Object.keys((banks[loc].options || {})[k] || {}).length, 0)} option literals`);
  }
  {
    const f = validateTable(TABLE);
    ok(f.length === 0, `table: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    const full = Object.entries(TABLE.animals).filter(([, a]) => TABLE.fields.every((k) => a[k] !== null)).length;
    console.log(`table: ${Object.keys(TABLE.animals).length} animals, ${full} at 7/7, exemplars ${Object.keys(TABLE.exemplars).length} themes, wave theme ${THEME} → ${EXEMPLAR}`);
  }
  const en = banks.en;
  for (const k of Object.keys(LONG)) ok(len(LONG[k].title) === 70 && len(LONG[k].instruction) === 150, `long-chrome fixture ${k} is ${len(LONG[k].title)}/${len(LONG[k].instruction)} chars, want 70/150`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    // 3. renders through the real pipeline
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G2-318-gate-d${d}-en` });
      assertRender(`d${d}`, r, TYPE.difficulty[d], en, TABLE, { key: EXEMPLAR });
      pngs.push(r.png);
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px, hero ${Math.round(r.m.hero.w)}, rows ${r.m.rows.map((x) => Math.round(x.cellH)).join('/')}, labels ${r.m.rows.map((x) => Math.round(x.labelH)).join('/')} px, stamps ${r.m.rows.filter((x) => Object.keys(x.stamps).length).length}/${r.m.rows.length}, lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, unit: 'fox', baseName: 'G2-318-gate-d2-en-ufox' });
      assertRender('d2 unit fox', r, TYPE.difficulty[2], en, TABLE, { key: 'fox' });
      pngs.push(r.png);
      console.log(`render d2 unit fox: verify ${r.verify.length} lints ${r.lints.length} name "${r.m.name.text}" starter "${r.m.starter}"`);
    }
    {
      // a null-field animal: no stamp where the table is null (frog: class + habitat)
      const r = await renderWith(page, TYPE, { difficulty: 3, unit: 'frog', baseName: 'G2-318-gate-d3-en-ufrog' });
      assertRender('d3 unit frog', r, TYPE.difficulty[3], en, TABLE, { key: 'frog' });
      const nulls = r.m.rows.filter((x) => TABLE.animals.frog[x.field] === null).map((x) => x.field);
      ok(nulls.length === 2 && nulls.every((f) => !r.m.rows.find((x) => x.field === f).stamps[f]), `d3 unit frog: null fields ${nulls.join(',')} must carry no stamp`);
      pngs.push(r.png);
      console.log(`render d3 unit frog: verify ${r.verify.length} lints ${r.lints.length} stamps ${r.m.rows.filter((x) => Object.keys(x.stamps).length).length}/7 (null: ${nulls.join(',')})`);
    }
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, unit: 'blank', baseName: 'G2-318-gate-d2-en-ublank' });
      assertRender('d2 blank', r, TYPE.difficulty[2], en, TABLE, { key: null });
      pngs.push(r.png);
      console.log(`render d2 blank: verify ${r.verify.length} lints ${r.lints.length} caption "${r.m.caption}"`);
    }
    for (const k of Object.keys(LONG)) for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G2-318-gate-d${d}-en-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d${d} long chrome ${k}`, r, TYPE.difficulty[d], en, TABLE, { key: EXEMPLAR, squeezed: LONG[k].body });
      pngs.push(r.png);
      console.log(`render d${d} long chrome ${k}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px (title ${r.m.titleLines} lines, head ${Math.round(r.m.headH)}), rows ${r.m.rows.map((x) => Math.round(x.cellH)).join('/')}, lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // 4. refusals + the unit pool + the seed sweep
    const refuse = (args, re, what) => { let msg = ''; try { TYPE.build(args, { rng: makeRng('x') }); } catch (e) { msg = e.message; } ok(re.test(msg), `${what}: expected a refusal /${re.source}/, got ${JSON.stringify(msg)}`); };
    refuse({ theme: 'fruits', difficulty: 2, locale: 'en' }, /no exemplar/, 'a fruit theme');
    refuse({ theme: 'animals bw', difficulty: 2, locale: 'en', unit: 'fox' }, /B&W/, 'a B&W theme');
    refuse({ theme: THEME, difficulty: 2, locale: 'en', unit: 'lion' }, /not pictured in theme/, 'an unpictured unit');
    refuse({ theme: 'animals', difficulty: 2, locale: 'en' }, /pin the unit/, 'a unit-less build on a theme whose exemplar is not the title exemplar');
    refuse({ theme: THEME, difficulty: 2, locale: 'de' }, /no de block/, 'an unauthored locale');
    refuse({ theme: THEME, difficulty: 2, locale: 'en', unit: 'dragon' }, /not in animal-facts/, 'an unknown unit');
    {
      const units = TYPE.unitAxis.units('en');
      ok(units[0] === EXEMPLAR && units[units.length - 1] === 'blank' && units.length === Object.keys(TABLE.animals).length + 1, `units('en') = ${units.length}, first ${units[0]}, last ${units[units.length - 1]}`);
      ok(TYPE.unitAxis.exemplar('en') === EXEMPLAR && TYPE.unitAxis.tokens(EXEMPLAR, 'en').U === en.animals[EXEMPLAR].title, 'exemplar / tokens');
      let built = 0; const errs = [];
      for (const u of units) {
        if (u === 'blank') continue;
        const t = TABLE.animals[u].pic.theme;
        try { TYPE.build({ theme: t, difficulty: 2, locale: 'en', unit: u }, { rng: makeRng('x') }); built++; } catch (e) { errs.push(`${u}@${t}: ${e.message}`); }
      }
      ok(errs.length === 0, `unit pool: ${errs.length} units refuse on their own picture theme\n    ` + errs.slice(0, 8).join('\n    '));
      const wave = units.filter((u) => u !== 'blank' && safeNouns(THEME, 'en').some((n) => n.vocabKey === u));
      console.log(`unit pool: ${built}/${units.length - 1} animals build on their picture theme; ${wave.length} pictured in ${THEME} (${wave.join(' ')})`);
    }
    if (!QUICK) {
      for (const d of [1, 2, 3]) {
        const htmls = new Set();
        for (let k = 1; k <= 20; k++) {
          const rng = makeRng(instanceSeed({ typeId: 'G2-318', theme: THEME, difficulty: d, seedEpoch: k }));
          htmls.add(TYPE.build({ theme: THEME, difficulty: d, locale: 'en' }, { rng }).bodyHtml);
        }
        ok(htmls.size === 1, `sweep d${d}: ${htmls.size} distinct bodies over 20 seeds (the base must be byte-identical)`);
      }
      console.log('sweep: 20 seeds × d1/d2/d3 → 1 body each (byte-identical, seedless)');
    }

    // 5. poisons
    // P1 — rabbit.diet 'meat' in the table the build reads → the re-derivation against the committed JSON
    {
      const t = clone(TABLE); t.animals.rabbit.diet = 'meat';
      const { own } = await gateFindings(page, rewired({ table: t }), { theme: 'animals', difficulty: 2, unit: 'rabbit', baseName: 'G2-318-gate-poison-P1' }, TYPE.difficulty[2], 'rabbit');
      if (judge('P1', own, /stamp data-lcs-fact-diet="meat" ≠ table "plants"/)) killed++;
    }
    // P4 — sv def 'igelkott' (indefinite) on a synthetic sv block; control 'igelkotten'
    {
      const b = syntheticBlock('sv'); b.animals.hedgehog.def = 'igelkott';
      const ctl = syntheticBlock('sv'); ctl.animals.hedgehog.def = 'igelkotten';
      const a = judge('P4', validateBank(b, 'sv'), /animals\.hedgehog\.def "igelkott" is the bare indefinite name/);
      const c = validateBank(ctl, 'sv').filter((x) => /hedgehog\.def/.test(x)).length === 0;
      if (a && c) killed++; else poisonLog.push('  P4 control: "igelkotten" was rejected');
    }
    // P5 — a `zoo animals bw` picture: the table validator AND the spec refuse
    {
      const t = clone(TABLE); t.animals.lion.pic.theme = 'zoo animals bw';
      const a = judge('P5 table', validateTable(t), /lion: picture from the B&W dir zoo animals bw/);
      const c = judge('P5 build', buildRefusal(en, t, 2, { theme: 'zoo animals', unit: 'lion' }), /B&W/, 'the spec refused the poisoned table');
      if (a && c) killed++;
    }
    // P7 — a de frame with the option literal Säugetier inside (synthetic de block)
    {
      const b = syntheticBlock('de'); b.options.class.mammal = { cell: 'Säugetier', inFrame: 'ein Säugetier' }; b.frames[0].text = '{def} ist ein Säugetier';
      if (judge('P7', validateBank(b, 'de'), /frame "\{def\} ist ein Säugetier" prints the option literal/)) killed++;
    }
    // P9 — a stamp on a null field (frog habitat) → the re-derivation
    {
      const p = rewired({ fn: (h) => h.replace('data-lcs-row data-lcs-field="habitat"', 'data-lcs-row data-lcs-field="habitat" data-lcs-fact-habitat="land"') });
      const { own } = await gateFindings(page, p, { difficulty: 3, unit: 'frog', baseName: 'G2-318-gate-poison-P9' }, TYPE.difficulty[3], 'frog');
      if (judge('P9', own, /row habitat stamps .* where the table is null/)) killed++;
    }
    // P10 — a RIGID stack (rows pinned at 110 → 878 px) under the 722 chrome → the footer lint
    {
      const rigid = rewired({ fn: (h) => h.replace('grid-auto-rows:minmax(60px,1fr)', 'grid-auto-rows:110px') });
      const r = await renderWith(page, rigid, { difficulty: 2, baseName: 'G2-318-gate-poison-P10', strings: LONG.de });
      if (judge('P10', r.lints, /footer overlap/, `body ${Math.round(r.m.body.h)} px, lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`)) killed++;
    }
    // P11 — a 29-char label: the validator; P11r — a 3-line label in the render: verify() + the gate's own line rule
    {
      const b = clone(en); b.labels.covering = 'Body covering of the animal!!';
      const a = judge('P11', validateBank(b, 'en'), /labels\.covering .* is 29 chars > 28/);
      const three = rewired({ fn: (h) => h.replace('>Body covering<', '>Body covering: fur, feathers, scales or a shell<') });
      const { r, own } = await gateFindings(page, three, { difficulty: 2, baseName: 'G2-318-gate-poison-P11r' }, TYPE.difficulty[2], EXEMPLAR);
      const c = judge('P11r verify', r.verify, /label "Body covering: fur, feathers, scales or a shell" runs \d+ px \(> 2 lines/);
      const d2 = judge('P11r node', own, /runs \d+ px \(> 2 lines/);
      if (a && c && d2) killed++;
    }
    // P13 — sv bare `Grupp`; a compound not in allowCompound; the control `Djurgrupp` listed
    {
      const b = syntheticBlock('sv'); b.labels.class = 'Grupp';
      const a = judge('P13 bare', validateBank(b, 'sv'), /labels\.class "Grupp" carries the bare token grupp/);
      const b2 = syntheticBlock('sv'); b2.labels.class = 'Djurgrupp';
      const c = judge('P13 compound', validateBank(b2, 'sv'), /"Djurgrupp" not in allowCompound/);
      const ctl = syntheticBlock('sv'); ctl.labels.class = 'Djurgrupp'; ctl.allowCompound = ['Djurgrupp'];
      const d3 = validateBank(ctl, 'sv').filter((x) => /grupp/i.test(x)).length === 0;
      poisonLog.push(`  P13 control: Djurgrupp in allowCompound ${d3 ? 'passes' : 'REJECTED'}`);
      if (a && c && d3) killed++;
    }
    // PL — a pre-filled lane (a model word in the writing row) → verify()
    {
      const p = rewired({ fn: (h) => h.replace(/(data-lcs-lane="diet"[^>]*>)(<svg[^>]*>)/, '$1$2<text x="10" y="30" font-size="20">both</text>') });
      const r = await renderWith(page, p, { difficulty: 2, baseName: 'G2-318-gate-poison-PL' });
      if (judge('PL', r.verify, /row diet: the lane is not empty/)) killed++;
    }
    // PH — the name ≠ the bank literal → the node cross-check
    {
      const p = rewired({ fn: (h) => h.replace('>Hedgehog</span>', '>Hedgehogs</span>') });
      const { own } = await gateFindings(page, p, { difficulty: 2, baseName: 'G2-318-gate-poison-PH' }, TYPE.difficulty[2], EXEMPLAR);
      if (judge('PH', own, /name "Hedgehogs" ≠ bank "Hedgehog"/)) killed++;
    }
    // PS — a stamp value edited → the re-derivation
    {
      const p = rewired({ fn: (h) => h.replace('data-lcs-fact-diet="both"', 'data-lcs-fact-diet="meat"') });
      const { own } = await gateFindings(page, p, { difficulty: 2, baseName: 'G2-318-gate-poison-PS' }, TYPE.difficulty[2], EXEMPLAR);
      if (judge('PS', own, /stamp data-lcs-fact-diet="meat" ≠ table "both"/)) killed++;
    }
    // PI — a 30-px hero: the spec guard refuses; past the guard verify() + the gate floor fire
    {
      const g = (() => { try { TYPE._buildWith.call(TYPE, en, TABLE, { ...TYPE.difficulty[2], pic: 30 }, { theme: THEME, locale: 'en', unit: null }); return []; } catch (e) { return [e.message]; } })();
      const a2 = judge('PI guard', g, /hero picture 30 < the G2-3 floor 36/);
      const shrunk = rewired({ fn: (h) => h.replace('width="220" height="220" alt="" style="width:220px;height:220px', 'width="30" height="30" alt="" style="width:30px;height:30px') });
      const { r, own } = await gateFindings(page, shrunk, { difficulty: 2, baseName: 'G2-318-gate-poison-PI' }, TYPE.difficulty[2], EXEMPLAR);
      const c = judge('PI verify', r.verify, /hero picture 30×30 < the G2-3 floor 36/);
      const d3 = judge('PI node', own, /icons \[30\]/);
      if (a2 && c && d3) killed++;
    }
    // PT — the hero picture of another animal (the fox file under the hedgehog unit) → the node src check
    {
      const foxSrc = fileUri(THEME, 'fox');
      const p = rewired({ fn: (h) => h.replace(/src="[^"]*hedgehog[^"]*"/, `src="${foxSrc}"`) });
      const { own } = await gateFindings(page, p, { difficulty: 2, baseName: 'G2-318-gate-poison-PT' }, TYPE.difficulty[2], EXEMPLAR);
      if (judge('PT', own, /hero src .* ≠ fileUri\(forest creatures, hedgehog\)/)) killed++;
    }
    // PF — data-lcs-face stamped on the base → verify()
    {
      const p = rewired({ fn: (h) => h.replace('data-ws-content data-lcs-type="animal-fact-file"', 'data-ws-content data-lcs-face="tick" data-lcs-type="animal-fact-file"') });
      const r = await renderWith(page, p, { difficulty: 2, baseName: 'G2-318-gate-poison-PF' });
      if (judge('PF', r.verify, /data-lcs-face is stamped on the base/)) killed++;
    }
    // PB — no [data-ws-content] → the blank-worksheet lint
    {
      const p = rewired({ fn: (h) => h.replace('data-ws-content ', '') });
      const r = await renderWith(page, p, { difficulty: 2, baseName: 'G2-318-gate-poison-PB' });
      if (judge('PB', r.lints, /blank worksheet/)) killed++;
    }
    // PX — a starter with an end mark → the spec refuses; PX2 an empty starter literal → the caption fallback (control)
    {
      const b = clone(en); b.factStarter = '{def} can.';
      const a = judge('PX', buildRefusal(b, TABLE, 2, {}), /starter "The hedgehog can\." ends with an end mark/);
      const b2 = clone(en); b2.factStarter = '{nom} can';   // en has no nom literal → the caption must print
      const out = TYPE._buildWith.call(TYPE, b2, TABLE, TYPE.difficulty[2], { theme: THEME, locale: 'en', unit: null });
      const c = out.meta.starter == null && out.meta.caption === en.sentence;
      poisonLog.push(`  PX control: a missing subject literal falls to the caption "${out.meta.caption}" ${c ? 'OK' : 'FAILED'}`);
      if (a && c) killed++;
    }
    // PN — a label literal with a slot → the spec refuses
    {
      const b = clone(en); b.labels.diet = 'What {name} eats';
      if (judge('PN', buildRefusal(b, TABLE, 2, {}), /labels\.diet carries a slot/)) killed++;
    }
    // PU — the exemplar unit pictured in the theme but absent from the bank literals → refusal (never a vocab fallback)
    {
      const b = clone(en); delete b.animals.hedgehog;
      if (judge('PU', buildRefusal(b, TABLE, 2, {}), /no name\/title literal for "hedgehog"/)) killed++;
    }

    console.log('poisons:\n' + poisonLog.join('\n'));
    ok(killed === TOTAL, `poison: ${killed}/${TOTAL} killed`);
    console.log(`renders: ${pngs.length} PNGs under out/dev/G2-318-gate-*`);
    // F. the five faces
    await runFaces(page, en);
  } finally {
    await browser.close();
  }
  console.log(`verify-b3-animal-fact-file: ${assertions} assertions, ${fails.length} failures, poison ${killed}/${TOTAL} base + ${faceKilled}/${FACE_TOTAL} faces`);
  fails.forEach((f) => console.log('  FAIL ' + f));
  console.log(`G2-318 gate: ${fails.length ? 'FAIL' : 'PASS'} (${assertions} assertions, ${killed + faceKilled}/${TOTAL + FACE_TOTAL} poisons killed)`);
  process.exit(fails.length ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });

module.exports = { validateBank, validateTable, LABEL_KEYS, CHIP_FIELDS, FACE_IDS };
