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
 *    18 in all. P2 P3 P6 P8 P12 P14 are F2/F3/F5/F6 poisons (Phase 2).
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
  if (!bank.sameDiff || ['same', 'diff', 'laneSame', 'laneDiff'].some((k) => typeof bank.sameDiff[k] !== 'string')) push('sameDiff needs same/diff/laneSame/laneDiff');
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
  } finally {
    await browser.close();
  }
  console.log(`verify-b3-animal-fact-file: ${assertions} assertions, ${fails.length} failures, poison ${killed}/${TOTAL}`);
  fails.forEach((f) => console.log('  FAIL ' + f));
  process.exit(fails.length ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });

module.exports = { validateBank, validateTable, LABEL_KEYS, CHIP_FIELDS };
