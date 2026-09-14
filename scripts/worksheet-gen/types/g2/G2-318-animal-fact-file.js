/**
 * G2-318 — Animal Fact File (nt20-C; family key `animal-fact-file`, G2,
 * W.2.7 + W.2.2 — Tiersteckbrief / fiche documentaire / ficha del animal).
 * Design: docs/worksheet-gen/b3-designs/G2-318-animal-fact-file.md §2/§5.
 *
 * A real Steckbrief card for ONE animal: top-left a framed hero picture;
 * right of it a name banner and a dashed draw box ("Draw where it lives.");
 * below, ONE framed fact table (label column + an EMPTY school-line lane per
 * field) and, at d2, a fact-sentence lane with a starter ("The hedgehog can").
 * Open-ended: the child RECORDS what the class found out. The base prints the
 * NAME (the topic) and the field labels — never a fact. Ground truth rides
 * on `data-lcs-fact-<field>` row stamps (the answer key; the gate re-derives
 * every one in node from data/b3/animal-facts.json). NOT a story about a
 * picture (G2-278), not a sort of many pictures (the science sorts), not
 * about the child (K-323).
 *
 * THEME ON (the animal themes; `minNouns:4, excludeBw:true`). The animal is
 * the UNIT (lib/unit-axis.js): `build()` renders `unit || exemplars[theme]`.
 * The unit-axis contract is locale-only (`units(loc)` / `exemplar(loc)`), so:
 *   - `units(loc)` = every table animal with a `name` + `title` literal in the
 *     locale, the WAVE_THEME animals FIRST (so `unitsPerType:N` fans the
 *     recommended theme), then the rest in table order, then `blank`;
 *   - `exemplar(loc)` = `exemplars[WAVE_THEME]` (hedgehog) — the `{U}` of a
 *     unit-less deck title. A unit-less build on ANOTHER theme whose exemplar
 *     differs would print a title naming one animal over a page showing
 *     another, so it REFUSES ("pin the unit"); a wave on any other theme pins
 *     the unit with `unitOverrides` (the wave ships the exemplar).
 *   - a unit must be PICTURED in the pinned theme (`safeNouns(theme)` by
 *     vocabKey) — else refusal; a non-animal theme has no exemplar → refusal;
 *     a B&W theme → refusal. Never a filler, never a silent substitution.
 *   - `unit:'blank'` (the wave-pinnable Vorlage): dashed hero zone + a
 *     "Name:" eyebrow lane, no stamps; `{U}` = `bank.blankTitle`.
 *
 * Every printed string is a whole panel literal from data/b3/animal-fact-file.js
 * (lib/b3-common.js bank('animal-fact-file', loc) — a missing locale block THROWS,
 * never an en fallback); the starter is `factStarter` filled by
 * lib/b3-instructions.js fillSlots with the animal's `def` / `nom` / `ade`
 * literals (upper-first) — when the literal is missing the lane prints the
 * `sentence` caption instead, never a bare vocab word. Never
 * image-vocabulary.js at render. The base is SEEDLESS (byte-identical over
 * every seed).
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (fields /
 * rowMin / glyphH / hero / drawH / lane / special …), never on the level index:
 *   d1  4 fields (class habitat diet covering), rows minmax(76) glyphH 32,
 *       hero 260 (pic 236), draw box 401×172, no fact lane
 *   d2  + legs, fly (6), rows minmax(60) glyphH 28, hero 244 (pic 220),
 *       draw box 417×156 + the fact lane                          (ships)
 *   d3  + swim (7), rows minmax(52) glyphH 24, hero 214 (pic 190), a
 *       "Special feature:" 3-row rulingBlock instead of the draw box, no lane
 *
 * Chrome budget (README ruling): body 722 under a 3-line title + a 2-line
 * 150-char instruction. Stack d2 = 244 + 12 + (6·60 + 4) + 12 + 60 = 692;
 * the table is `flex:1 1 auto` with `grid-auto-rows:minmax(<rowMin>px,1fr)`,
 * so the slack opens in the rows, never in the hero row or the lane.
 *
 * FACES (Phase 2, 2026-09-14 — design §3; tools/b3var-rows/animal-fact-file.js
 * sets the knob in a difficulty override; the base path is byte-identical):
 *   G2-339  cell:'chips' + choices  every lane = a choiceRow of `choices` chips
 *           (the truth + distractors from the field's option set; legs = numerals;
 *           fly/swim = yes|no, 2 chips); the row carries data-lcs-correct=<i>;
 *           over the page the correct index takes every position 0..choices-1
 *   G2-340  bank:true + bankExtra   the draw-box slot holds a factBank of the
 *           truths + bankExtra distractors (>= 2 fields), shuffled; lanes stay
 *   G2-341  cell:'printed' + frames:3 + free  hero 200 / banner 60 / a PRINTED
 *           miniFactFile; below, a lane of `frames` starter rows ({def}-filled,
 *           <= 22 chars, no end mark, never the target fact) + `free` rows
 *   G2-342  mode:'compare'          two printed files of the wave theme sharing
 *           EXACTLY half of the printed fields, a same|different chip grid
 *           (data-lcs-same per field), a lane of laneSame/laneDiff starter rows
 *   G2-343  mode:'mystery'          a picture bank of bankSize animals (names <=
 *           bankNameMax letters, pairwise distinct in >= 1 field) + `puzzles`
 *           riddle cards of `cluesPrinted` first-person clues that leave
 *           EXACTLY the target; no picture on a card, no unit, no name in a title
 * Every face REFUSES an animal that is not 7/7 in the table (design §4), a
 * `blank` unit, and (compare / mystery) any unit at all — they fan by THEME.
 * verify() dispatches on the root's knob stamps (cell / bank / frames / mode),
 * never on data-lcs-face alone (the base still refuses a face stamp).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { fillSlots } = require('../../lib/b3-instructions.js');
const { safeNouns, fileUri } = require('../../lib/b2-common.js');
const { rulingBlock } = require('../../templates/components-b2.js');
const C3 = require('../../templates/components-b3.js');
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const ANIMAL_FACTS = require('../../data/b3/animal-facts.json');

const { heroFrame, nameBanner, factTable, factLane, drawBox, choiceRow, factBank, miniFactFile, sameDiffGrid, riddleCard } = C3;
const { LABELS: B2_LABELS } = require('../../data/b2/labels.js');   // G2-278's starters: a frame must never equal one (design F4)

const BANK = 'animal-fact-file';
const WAVE_THEME = 'forest creatures';     // design §1: the recommended wave theme (exemplar hedgehog)
const FIELD_ORDER = ['class', 'habitat', 'diet', 'legs', 'covering', 'fly', 'swim'];
const BODY_W = 675;
const TOP_GAP = 14;
const GAP = 12;
const BANNER_H = 76;
const G23_FLOOR = tokens.density.G23.minElement;   // 36 — the .ws-icon floor
const GLYPH_FLOOR = 24;                             // the G2 school-line floor (design §2)
const BW_MARKER = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const TRIES = 200;                                  // every face composer's re-sample budget (design §3), then REFUSE
const T = tokens.color;
const F = tokens.font;

function literal(bankLoc, pathStr, loc) {
  const v = pathStr.split('.').reduce((o, k) => (o == null ? undefined : o[k]), bankLoc);
  if (typeof v !== 'string' || !v.trim()) throw new Error(`G2-318: ${loc} has no literal ${pathStr} (refuse, never pad)`);
  if (v.includes('{')) throw new Error(`G2-318: ${loc} ${pathStr} carries a slot "${v}" (whole literals only)`);
  return v;
}
function upperFirst(s, loc) { const cs = [...s]; return cs.length ? cs[0].toLocaleUpperCase(loc) + cs.slice(1).join('') : s; }
function len(s) { return [...String(s)].length; }
function full7(table, key) { const a = table.animals[key]; return !!a && table.fields.every((f) => a[f] !== null && a[f] !== undefined); }
function sameProfile(table, a, b) { return table.fields.every((f) => table.animals[a][f] === table.animals[b][f]); }
function wordRe(lit) { return new RegExp('(?<!\\p{L})' + String(lit).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu'); }
/** The child-facing literal of a table value for `field` (cell form: chips, bank words, printed cells). */
function cellOf(bankLoc, field, value, loc) {
  if (field === 'legs') return String(value);
  if (field === 'fly' || field === 'swim') return literal(bankLoc, 'yesno.' + (value ? 'yes' : 'no'), loc);
  return literal(bankLoc, 'options.' + field + '.' + value + '.cell', loc);
}
/** The first-person clue for (field, value) from the locale's mystery frames + legsFrames (whole literals; {cell}/{inFrame} filled). */
function clueOf(bankLoc, field, value, loc) {
  const my = bankLoc.mystery || {};
  if (field === 'legs') return literal(bankLoc, 'legsFrames.' + value, loc);
  if (field === 'fly' || field === 'swim') return literal(bankLoc, 'mystery.' + field + '.' + (value ? 'true' : 'false'), loc);
  const frame = my[field];
  if (typeof frame !== 'string' || !frame.trim()) throw new Error(`G2-318: ${loc} has no mystery.${field} frame (refuse)`);
  const o = (bankLoc.options || {})[field] && bankLoc.options[field][value];
  if (!o || typeof o.cell !== 'string' || typeof o.inFrame !== 'string') throw new Error(`G2-318: ${loc} has no options.${field}.${value} literal (refuse)`);
  const out = fillSlots(frame, { cell: o.cell, inFrame: o.inFrame });
  if (!/[.?!]$/.test(out.trim())) throw new Error(`G2-318: ${loc} clue "${out}" has no end mark`);
  return out;
}
/** The animals of `theme` that are pictured, 7/7 in the table and carry a name + title literal (the non-base pool). */
function facePool(bankLoc, table, theme, nouns) {
  return nouns.filter((n) => table.animals[n.vocabKey] && full7(table, n.vocabKey) && bankLoc.animals[n.vocabKey] &&
    typeof bankLoc.animals[n.vocabKey].name === 'string' && bankLoc.animals[n.vocabKey].name.trim() &&
    typeof bankLoc.animals[n.vocabKey].title === 'string' && bankLoc.animals[n.vocabKey].title.trim()).map((n) => n.vocabKey);
}
function assertAnimalTheme(table, theme, loc) {
  if (typeof theme !== 'string' || !theme.trim()) throw new Error('G2-318: a themed type needs a theme');
  if (BW_MARKER.test(theme)) throw new Error(`G2-318: theme "${theme}" is a B&W dir (refuse)`);
  if (!table.exemplars[theme]) throw new Error(`G2-318: theme "${theme}" has no exemplar in animal-facts.json (not an animal theme) — refuse`);
  return safeNouns(theme, loc);
}
function starterRows(rows, { w, h, glyphH, lines = 1 }) {
  // one rulingBlock per frame (`lines` writing rows, the starter on the first) so the frames can be spaced by the lane's flex (the slack opens BETWEEN frames, never under them)
  return rows.map((r, i) => `<div data-lcs-frame-row="${i + 1}" data-lcs-frame-field="${esc(r.field)}" data-lcs-lines="${lines}" style="flex:0 0 auto;line-height:0">` +
    rulingBlock({ rows: lines, w, h, glyphH, gap: 4, starters: r.starter ? { 0: r.starter } : {} }) + '</div>').join('');
}

/** Units in bank order: the WAVE_THEME animals first, then the rest, then `blank`. */
function unitsFor(bankLoc, table) {
  const has = (k) => bankLoc.animals && bankLoc.animals[k] && typeof bankLoc.animals[k].name === 'string' && bankLoc.animals[k].name.trim() && typeof bankLoc.animals[k].title === 'string' && bankLoc.animals[k].title.trim();
  const keys = Object.keys(table.animals).filter(has);
  const first = keys.filter((k) => table.animals[k].pic && table.animals[k].pic.theme === WAVE_THEME);
  const rest = keys.filter((k) => !first.includes(k));
  const out = first.concat(rest);
  if (typeof bankLoc.blankTitle === 'string' && bankLoc.blankTitle.trim()) out.push('blank');
  return out;
}

module.exports = {
  id: 'G2-318',
  slug: 'animal-fact-file',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'animal-fact-file',
  themeAxis: { applicable: true, minNouns: 4, excludeBw: true },
  unitAxis: {
    applicable: true,
    units: (loc) => unitsFor(loadBank(BANK, loc), ANIMAL_FACTS),
    exemplar: () => ANIMAL_FACTS.exemplars[WAVE_THEME],
    tokens: (unit, loc) => {
      const b = loadBank(BANK, loc);
      const t = unit === 'blank' ? b.blankTitle : (b.animals && b.animals[unit] && b.animals[unit].title);
      if (typeof t !== 'string' || !t.trim()) throw new Error(`G2-318: ${loc} has no title literal for unit "${unit}" (refuse)`);
      return { U: t, L: t.toLocaleLowerCase(loc), UNIT: unit };
    },
  },
  difficulty: {
    1: { fields: ['class', 'habitat', 'diet', 'covering'], rowMin: 76, glyphH: 32, labelPx: 18, laneH: 68, hero: 260, pic: 236, drawH: 172, lane: false, special: null },
    2: { fields: ['class', 'habitat', 'diet', 'legs', 'covering', 'fly'], rowMin: 60, glyphH: 28, labelPx: 17, laneH: 56, hero: 244, pic: 220, drawH: 156, lane: true, special: null },
    3: { fields: ['class', 'habitat', 'diet', 'legs', 'covering', 'fly', 'swim'], rowMin: 52, glyphH: 24, labelPx: 16, laneH: 48, hero: 214, pic: 190, drawH: 0, lane: false, special: { rows: 3, h: 40, glyphH: 24 } },
  },
  i18n: {
    en: {
      title: 'Animal Fact File: {U}',
      instruction: 'Find out about this animal. Write one fact in each row of the fact file, then fill in the rest of the page with your own drawing or words.',
    },
  },

  WAVE_THEME,
  FIELD_ORDER,

  build({ theme, difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), ANIMAL_FACTS, this.difficulty[difficulty], { theme, locale: loc, unit: unit || null }, ctx);
  },
  FACE_TRIES: TRIES,

  /** The whole build over an INJECTED bank + table + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, table, d, { theme, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    if (!d) throw new Error('G2-318: no difficulty config');
    if (!bankLoc || !bankLoc.labels || !bankLoc.animals) throw new Error(`G2-318: ${loc} bank has no labels/animals block (refuse)`);
    if (!table || !table.animals || !table.exemplars || !Array.isArray(table.fields)) throw new Error('G2-318: animal-facts table is malformed');
    // ---- the two whole-page faces (fan by THEME; a unit is a refusal)
    if (d.mode === 'compare') return this._buildCompare(bankLoc, table, d, { theme, locale: loc, unit }, ctx);
    if (d.mode === 'mystery') return this._buildMystery(bankLoc, table, d, { theme, locale: loc, unit }, ctx);
    if (d.mode != null) throw new Error(`G2-318: unknown mode "${d.mode}"`);
    const face = d.cell === 'chips' ? 'tick' : d.bank ? 'bank' : d.frames ? 'frames' : null;
    if (d.cell != null && !['chips', 'write', 'printed'].includes(d.cell)) throw new Error(`G2-318: unknown cell kind "${d.cell}"`);
    if (d.cell === 'printed' && !d.frames) throw new Error('G2-318: cell:printed is the frames face (needs frames)');
    if (d.frames && d.cell !== 'printed') throw new Error('G2-318: the frames face prints its source (cell:printed)');
    if ((d.cell === 'chips' ? 1 : 0) + (d.bank ? 1 : 0) + (d.frames ? 1 : 0) > 1) throw new Error('G2-318: one face knob at a time (chips | bank | frames)');
    // ---- guards on the RESOLVED config
    if (!Array.isArray(d.fields) || d.fields.length < 4) throw new Error('G2-318: a fact table needs >= 4 fields');
    if (new Set(d.fields).size !== d.fields.length) throw new Error('G2-318: a field repeats');
    for (const f of d.fields) if (!table.fields.includes(f)) throw new Error(`G2-318: field "${f}" is not a table field`);
    const ordered = FIELD_ORDER.filter((f) => d.fields.includes(f));
    if (ordered.join() !== d.fields.join()) throw new Error(`G2-318: fields must follow the table order ${FIELD_ORDER.join(' ')}`);
    if (d.pic < G23_FLOOR) throw new Error(`G2-318: hero picture ${d.pic} < the G2-3 floor ${G23_FLOOR}`);
    if (d.hero < d.pic + 6) throw new Error(`G2-318: hero frame ${d.hero} cannot hold a ${d.pic} picture`);
    if (d.glyphH < GLYPH_FLOOR) throw new Error(`G2-318: glyphH ${d.glyphH} < the G2 school-line floor ${GLYPH_FLOOR}`);
    if (d.laneH < d.glyphH + 12) throw new Error(`G2-318: lane ${d.laneH} cannot hold a glyphH ${d.glyphH} row`);
    if (d.rowMin < d.laneH + 4) throw new Error(`G2-318: row floor ${d.rowMin} cannot hold a ${d.laneH} lane`);
    if (d.labelPx < 14) throw new Error(`G2-318: label ${d.labelPx}px < 14`);
    const colW = BODY_W - d.hero - TOP_GAP;
    if (colW < 300) throw new Error(`G2-318: right column ${colW} < 300`);
    if (d.drawH && d.special) throw new Error('G2-318: a draw box and a special block cannot share the column');
    if (d.drawH && d.hero !== BANNER_H + GAP + d.drawH) throw new Error(`G2-318: hero ${d.hero} ≠ banner ${BANNER_H} + ${GAP} + draw box ${d.drawH}`);
    if (d.drawH && d.drawH < 100) throw new Error(`G2-318: draw box ${d.drawH} < 100`);
    if (d.special && !(d.special.rows >= 2 && d.special.h >= d.special.glyphH + 12 && d.special.glyphH >= GLYPH_FLOOR)) throw new Error('G2-318: special block config is not a G2 ruling block');
    // ---- theme + unit → the animal
    if (typeof theme !== 'string' || !theme.trim()) throw new Error('G2-318: a themed type needs a theme');
    if (BW_MARKER.test(theme)) throw new Error(`G2-318: theme "${theme}" is a B&W dir (refuse)`);
    const nouns = safeNouns(theme, loc);   // throws when the theme is not cached
    const blank = unit === 'blank';
    let key = null, animal = null, lit = null, src = null, noun = '';
    if (blank) {
      if (typeof bankLoc.blankTitle !== 'string' || !bankLoc.blankTitle.trim()) throw new Error(`G2-318: ${loc} has no blankTitle literal — the blank unit is not authored (refuse)`);
      if (!table.exemplars[theme]) throw new Error(`G2-318: theme "${theme}" is not an animal theme (no exemplar)`);
    } else {
      key = unit || table.exemplars[theme] || null;
      if (!key) throw new Error(`G2-318: theme "${theme}" has no exemplar in animal-facts.json (not an animal theme, or unit not configured) — refuse`);
      if (!unit && key !== this.unitAxis.exemplar(loc)) throw new Error(`G2-318: theme "${theme}" has no unit configured and its exemplar "${key}" is not the title exemplar "${this.unitAxis.exemplar(loc)}" — pin the unit with unitOverrides (refuse)`);
      animal = table.animals[key];
      if (!animal) throw new Error(`G2-318: unit "${key}" is not in animal-facts.json (refuse)`);
      if (!animal.pic || BW_MARKER.test(String(animal.pic.theme))) throw new Error(`G2-318: unit "${key}" carries a B&W or missing picture (refuse)`);
      lit = bankLoc.animals[key];
      if (!lit || typeof lit.name !== 'string' || !lit.name.trim() || typeof lit.title !== 'string' || !lit.title.trim()) throw new Error(`G2-318: ${loc} has no name/title literal for "${key}" (refuse)`);
      if (/\d|\{/.test(lit.name)) throw new Error(`G2-318: ${loc} name literal "${lit.name}" carries a digit or a slot`);
      const n = nouns.find((x) => x.vocabKey === key);
      if (!n) throw new Error(`G2-318: unit "${key}" is not pictured in theme "${theme}" (refuse)`);
      noun = n.noun;
      src = fileUri(theme, n.noun);
    }
    if (face) {
      if (blank) throw new Error(`G2-318: the ${face} face has no blank unit (refuse)`);
      if (!full7(table, key)) throw new Error(`G2-318: "${key}" is not 7/7 in animal-facts.json (null: ${table.fields.filter((f) => animal[f] === null).join(',')}) — the ${face} face refuses it`);
      if (!ctx || !ctx.rng) throw new Error('G2-318: a face build needs ctx.rng');
    }
    if (face === 'frames') return this._buildFrames(bankLoc, table, d, { theme, loc, unit, key, animal, lit, src, noun, colW }, ctx);
    // ---- the rows
    const rows = d.fields.map((f) => ({
      key: f,
      label: literal(bankLoc, 'labels.' + f, loc),
      lane: 'write',
      fact: animal && animal[f] !== null && animal[f] !== undefined ? animal[f] : null,
    }));
    for (const r of rows) if ([...r.label].length > 28) throw new Error(`G2-318: ${loc} label "${r.label}" > 28 chars`);
    let correctIdx = null;
    if (face === 'tick') correctIdx = this._tickRows(bankLoc, table, d, rows, { key, animal, loc }, ctx.rng);
    let bankWords = null;
    if (face === 'bank') bankWords = this._bankWords(bankLoc, table, d, { key, animal, loc }, ctx.rng);
    // ---- the fact lane: starter from factStarter + def/nom/ade, else the caption
    let laneHtml = '';
    let starter = null, caption = null;
    if (d.lane) {
      const slots = {};
      for (const k of ['def', 'nom', 'ade']) if (lit && typeof lit[k] === 'string' && lit[k].trim()) slots[k] = lit[k];
      if (!blank && typeof bankLoc.factStarter === 'string' && bankLoc.factStarter.trim()) {
        try { starter = upperFirst(fillSlots(bankLoc.factStarter, slots), loc); } catch (e) { starter = null; }
      }
      if (starter != null && /[.?!]$/.test(starter)) throw new Error(`G2-318: starter "${starter}" ends with an end mark`);
      if (starter == null) caption = literal(bankLoc, 'sentence', loc);
      laneHtml = factLane({ starter, caption, w: BODY_W, h: 60, glyphH: 28 });
    }
    // ---- the right column
    const banner = blank
      ? nameBanner({ name: null, eyebrow: literal(bankLoc, 'eyebrow', loc), w: colW, h: BANNER_H, laneW: colW - 32 - 28 - 12 })
      : nameBanner({ name: lit.name, w: colW, h: BANNER_H });
    let under = '';
    if (face === 'bank') {
      if (!(d.drawH >= 100)) throw new Error('G2-318: the bank face needs the draw-box slot (drawH >= 100) to hold the bank');
      under = factBank({ words: bankWords, w: colW, h: d.drawH, wordPx: d.bankPx || 17 });
    } else if (d.drawH) {
      const label = literal(bankLoc, 'drawLabel', loc);
      under = `<div data-lcs-drawslot style="position:relative;width:${colW}px;height:${d.drawH}px;flex:0 0 ${d.drawH}px">` +
        drawBox({ w: colW, h: d.drawH }) +
        `<span data-lcs-label-key="drawLabel" style="position:absolute;left:10px;top:8px;font-family:${F.body},sans-serif;font-weight:800;font-size:14px;line-height:18px;color:${T.inkSoft};white-space:nowrap">${esc(label)}</span></div>`;
    } else if (d.special) {
      const label = literal(bankLoc, 'labels.special', loc);
      // a `.ws-lane` frame (inline padding 10 12 → inner colW - 28) so the block
      // reads as one field beside the framed hero, like the fact lane below
      under = `<div class="ws-lane" data-lcs-special data-lcs-rows="${d.special.rows}" style="padding:10px 12px;display:flex;flex-direction:column;gap:4px;width:${colW}px;min-width:0">` +
        `<span data-lcs-label-key="special" style="font-family:${F.body},sans-serif;font-weight:800;font-size:16px;line-height:22px;color:${T.ink}">${esc(label)}</span>` +
        rulingBlock({ rows: d.special.rows, w: colW - 28, h: d.special.h, glyphH: d.special.glyphH }) + `</div>`;
    }
    const top = `<div data-lcs-top style="display:flex;gap:${TOP_GAP}px;align-items:stretch;flex:0 0 auto">` +
      heroFrame({ src, size: d.hero, pic: d.pic, noun, unit: key || '', stretch: !!d.special }) +
      `<div data-lcs-column style="display:flex;flex-direction:column;gap:${GAP}px;width:${colW}px;min-width:0">${banner}${under}</div></div>`;
    const tableHtml = factTable({ rows, w: BODY_W, rowMin: d.rowMin, glyphH: d.glyphH, labelPx: d.labelPx, laneH: d.laneH });
    const stamps = [
      'data-ws-content', 'data-lcs-type="animal-fact-file"',
      `data-lcs-animal="${esc(key || '')}"`, `data-lcs-unit="${esc(unit || '')}"`, `data-lcs-theme="${esc(theme)}"`, `data-lcs-locale="${loc}"`,
      `data-lcs-fields="${esc(d.fields.join(','))}"`, `data-lcs-pic="${d.pic}"`, `data-lcs-hero="${d.hero}"`, `data-lcs-row-min="${d.rowMin}"`,
      `data-lcs-glyph-h="${d.glyphH}"`, `data-lcs-label-px="${d.labelPx}"`, `data-lcs-draw="${d.drawH && face !== 'bank' ? 1 : 0}"`, `data-lcs-lane="${d.lane ? 1 : 0}"`,
      `data-lcs-special="${d.special ? d.special.rows : 0}"`, `data-lcs-blank="${blank ? 1 : 0}"`,
    ];
    // face stamps ONLY when a face is declared (the base root is byte-identical)
    if (face === 'tick') stamps.push('data-lcs-face="tick"', 'data-lcs-cell="chips"', `data-lcs-choices="${d.choices}"`);
    if (face === 'bank') stamps.push('data-lcs-face="bank"', 'data-lcs-bank="1"', `data-lcs-bank-extra="${d.bankExtra}"`, `data-lcs-bankslot="${d.drawH}"`);
    const bodyHtml = `<div ${stamps.join(' ')} style="flex:1;display:flex;flex-direction:column;gap:${GAP}px;min-height:0">${top}${tableHtml}${laneHtml}</div>`;
    return { bodyHtml, meta: { animal: key, unit: unit || null, exemplar: !unit, theme, fields: d.fields.slice(), starter, caption, pic: d.pic, face, correctIdx, bankWords: bankWords && bankWords.map((w) => w.word) } };
  },

  /* ================================================================ F2 · tick: every row a choiceRow, the truth's index on the row */
  _tickRows(bankLoc, table, d, rows, { key, animal, loc }, rng) {
    const n = d.choices;
    if (!(n >= 2 && n <= 5)) throw new Error(`G2-318: choices ${n} outside 2..5`);
    const optionsFor = (f) => {
      const truth = animal[f];
      let pool, label;
      if (f === 'legs') { pool = table.choices.legs.filter((v) => v !== truth); label = (v) => String(v); }
      else if (f === 'fly' || f === 'swim') { pool = [!truth]; label = (v) => literal(bankLoc, 'yesno.' + (v ? 'yes' : 'no'), loc); }
      else { pool = table.choices[f].filter((v) => v !== truth); label = (v) => literal(bankLoc, 'options.' + f + '.' + v + '.cell', loc); }
      const want = Math.min(n, pool.length + 1);                     // fly/swim: 2 chips; diet at 4 choices keeps 3 (design: recorded)
      const picks = [truth].concat(rng.sample(pool, want - 1));
      const opts = picks.map((v) => ({ key: String(v), label: label(v), truth: v === truth }));
      const labels = new Set(opts.map((o) => o.label));
      if (labels.size !== opts.length) throw new Error(`G2-318: ${loc} chips for ${f} collide on a literal (${opts.map((o) => o.label).join(' | ')})`);
      for (const o of opts) if (len(o.label) > 16) throw new Error(`G2-318: ${loc} chip "${o.label}" > 16 chars`);
      return opts;
    };
    const idx = [];
    let shuffled = null;
    for (let t = 0; t < TRIES; t++) {
      shuffled = rows.map((r) => rng.shuffle(optionsFor(r.key)));
      const ci = shuffled.map((o) => o.findIndex((x) => x.truth));
      const wide = ci.filter((c, i) => shuffled[i].length === n);
      // the correct index must take EVERY position 0..n-1 over the n-chip rows (a position bot scores 1/n at best)
      if (new Set(wide).size === Math.min(n, wide.length)) { idx.push(...ci); break; }
    }
    if (!idx.length) throw new Error(`G2-318: ${key}: no chip arrangement spreads the correct index over ${n} positions in ${TRIES} tries (refuse)`);
    rows.forEach((r, i) => {
      r.lane = 'choice';
      r.html = choiceRow({ options: shuffled[i].map((o) => ({ key: o.key, label: o.label })), pillPx: d.chipPx || 16, h: d.chipH || 40, gap: 8, padX: d.chipPadX || 20 });
      r.attrs = `data-lcs-correct="${idx[i]}" data-lcs-n="${shuffled[i].length}"`;
    });
    return idx;
  },

  /* ================================================================ F3 · bank: the truths + bankExtra distractors from >= 2 fields, shuffled */
  _bankWords(bankLoc, table, d, { key, animal, loc }, rng) {
    const extra = d.bankExtra;
    if (!(extra >= 0 && extra <= 8)) throw new Error(`G2-318: bankExtra ${extra} outside 0..8`);
    const truths = d.fields.map((f) => ({ word: cellOf(bankLoc, f, animal[f], loc), field: f, truth: true }));
    if (new Set(truths.map((t) => t.word)).size !== truths.length) throw new Error(`G2-318: ${key}: two true facts share one literal (${truths.map((t) => t.word).join(' | ')}) — the bank cannot hold them (refuse)`);
    const cands = [];
    for (const f of d.fields) {
      const pool = f === 'legs' ? table.choices.legs : (f === 'fly' || f === 'swim') ? [true, false] : table.choices[f];
      for (const v of pool) if (v !== animal[f]) cands.push({ word: cellOf(bankLoc, f, v, loc), field: f, truth: false });
    }
    let words = null;
    for (let t = 0; t < TRIES && extra > 0; t++) {
      const pick = rng.shuffle(cands).slice(0, extra);
      const all = truths.concat(pick);
      if (new Set(all.map((w) => w.word)).size !== all.length) continue;             // a distractor literal equal to a truth (yes/no across fly+swim)
      if (new Set(pick.map((w) => w.field)).size < Math.min(2, extra)) continue;      // >= 2 fields (design)
      words = all; break;
    }
    if (extra === 0) words = truths;
    if (!words) throw new Error(`G2-318: ${key}: no ${extra}-distractor bank over >= 2 fields in ${TRIES} tries (refuse)`);
    for (const w of words) if (len(w.word) > 16) throw new Error(`G2-318: ${loc} bank word "${w.word}" > 16 chars`);
    return rng.shuffle(words);
  },

  /* ================================================================ F4 · frames: a printed source + three {def} starters + free rows */
  _buildFrames(bankLoc, table, d, { theme, loc, unit, key, animal, lit, src, noun, colW }, ctx) {
    const nFrames = d.frames, free = d.free || 0;
    if (!(nFrames >= 1 && nFrames <= 3)) throw new Error(`G2-318: frames ${nFrames} outside 1..3`);
    if (!(free >= 0 && free <= 3)) throw new Error(`G2-318: free ${free} outside 0..3`);
    if (d.drawH || d.lane || d.special) throw new Error('G2-318: the frames face has no draw box, fact lane or special block (its lane IS the writing)');
    const bannerH = d.bannerH || 60, miniRowH = d.miniRowH || 20;
    if (d.hero < bannerH + GAP + d.fields.length * miniRowH + 4) throw new Error(`G2-318: hero ${d.hero} cannot face a banner ${bannerH} + a ${d.fields.length}-row printed file at ${miniRowH}`);
    const frameH = d.frameH || 80, frameGlyphH = d.frameGlyphH || 28, frameLines = d.frameLines || 1;
    if (frameGlyphH < GLYPH_FLOOR || frameH < frameGlyphH + 12) throw new Error(`G2-318: frame row ${frameH}/${frameGlyphH} is not a G2 writing row`);
    if (!(frameLines >= 1 && frameLines <= 3)) throw new Error(`G2-318: frameLines ${frameLines} outside 1..3`);
    // the printed rows (the source the child reads): every value the cell literal, stamped as the answer key
    const rows = d.fields.map((f) => ({ key: f, label: literal(bankLoc, 'labels.' + f, loc), value: cellOf(bankLoc, f, animal[f], loc), fact: animal[f] }));
    for (const r of rows) if (len(r.label) > 28) throw new Error(`G2-318: ${loc} label "${r.label}" > 28 chars`);
    // the starters: the locale's frames filled with def (fi nom/ade); <= 22 chars, no end mark, never the target fact, never a G2-278 starter
    const frames = Array.isArray(bankLoc.frames) ? bankLoc.frames.slice(0, nFrames) : [];
    if (frames.length !== nFrames) throw new Error(`G2-318: ${loc} has ${frames.length} frames, the face needs ${nFrames} (refuse)`);
    const slots = {}; for (const k of ['def', 'nom', 'ade']) if (lit && typeof lit[k] === 'string' && lit[k].trim()) slots[k] = lit[k];
    const pw = (B2_LABELS[loc] && B2_LABELS[loc].pictureWriting) || {};
    const g278 = new Set([].concat(pw.d1 || [], pw.d2 || [], pw.d3 || []).map((x) => String(x).trim().toLocaleLowerCase(loc)));
    const starters = frames.map((fr) => {
      if (!fr || typeof fr.text !== 'string' || !table.fields.includes(fr.field)) throw new Error(`G2-318: ${loc} frame lacks field/text`);
      let st;
      try { st = upperFirst(fillSlots(fr.text, slots), loc); } catch (e) { throw new Error(`G2-318: ${loc} "${key}" has no ${slotsInText(fr.text)} literal for the frame "${fr.text}" — the frames face drops this animal (refuse)`); }
      if (len(st) > 22) throw new Error(`G2-318: ${loc} starter "${st}" is ${len(st)} chars > 22 — the frames face drops "${key}" (refuse)`);
      if (/[.?!]$/.test(st)) throw new Error(`G2-318: starter "${st}" ends with an end mark`);
      const target = rows.find((r) => r.key === fr.field);
      if (target && wordRe(target.value).test(st)) throw new Error(`G2-318: starter "${st}" prints its own target fact "${target.value}"`);
      if (g278.has(st.toLocaleLowerCase(loc))) throw new Error(`G2-318: starter "${st}" equals a G2-278 picture-writing starter (refuse)`);
      return { field: fr.field, starter: st };
    });
    const caption = literal(bankLoc, 'frameCaption', loc);
    const laneRows = starters.concat(Array.from({ length: free }, () => ({ field: 'free', starter: null })));
    const laneW = BODY_W - 36;   // .ws-lane inline padding 10 16 + the 2-px border
    const lane = `<div class="ws-lane" data-lcs-framelane data-lcs-frames="${nFrames}" data-lcs-free="${free}" style="padding:10px 16px;width:${BODY_W}px;flex:1 1 auto;display:flex;flex-direction:column;gap:6px;min-width:0;min-height:0">` +
      `<span data-lcs-caption style="font-family:${F.body},sans-serif;font-weight:800;font-size:16px;line-height:22px;color:${T.ink};flex:0 0 auto">${esc(caption)}</span>` +
      `<div data-lcs-frame-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">${starterRows(laneRows, { w: laneW, h: frameH, glyphH: frameGlyphH, lines: frameLines })}</div></div>`;
    const banner = nameBanner({ name: lit.name, w: colW, h: bannerH, fontPx: d.namePx || 30, minPx: 30 });
    const mini = miniFactFile({ rows, w: colW, rowH: miniRowH, labelW: 160, labelPx: 14, valuePx: 16 })
      .replace('style="width:', 'style="flex:1 1 auto;width:').replace(`grid-auto-rows:${miniRowH}px`, `grid-auto-rows:minmax(${miniRowH}px,1fr)`);
    const top = `<div data-lcs-top style="display:flex;gap:${TOP_GAP}px;align-items:stretch;flex:0 0 auto">` +
      heroFrame({ src, size: d.hero, pic: d.pic, noun, unit: key }) +
      `<div data-lcs-column style="display:flex;flex-direction:column;gap:${GAP}px;width:${colW}px;min-width:0">${banner}${mini}</div></div>`;
    const stamps = ['data-ws-content', 'data-lcs-type="animal-fact-file"', 'data-lcs-face="frames"', 'data-lcs-cell="printed"',
      `data-lcs-frames="${nFrames}"`, `data-lcs-free="${free}"`, `data-lcs-frame-h="${frameH}"`, `data-lcs-frame-glyph-h="${frameGlyphH}"`, `data-lcs-frame-lines="${frameLines}"`,
      `data-lcs-animal="${esc(key)}"`, `data-lcs-unit="${esc(unit || '')}"`, `data-lcs-theme="${esc(theme)}"`, `data-lcs-locale="${loc}"`,
      `data-lcs-fields="${esc(d.fields.join(','))}"`, `data-lcs-pic="${d.pic}"`, `data-lcs-hero="${d.hero}"`, 'data-lcs-draw="0"', 'data-lcs-lane="0"', 'data-lcs-special="0"', 'data-lcs-blank="0"',
      `data-lcs-row-min="${d.rowMin}"`, `data-lcs-glyph-h="${d.glyphH}"`, `data-lcs-label-px="${d.labelPx}"`].join(' ');
    const bodyHtml = `<div ${stamps} style="flex:1;display:flex;flex-direction:column;gap:${GAP}px;min-height:0">${top}${lane}</div>`;
    return { bodyHtml, meta: { animal: key, unit: unit || null, exemplar: !unit, theme, fields: d.fields.slice(), face: 'frames', starters: starters.map((s) => s.starter), printed: rows.map((r) => r.value), pic: d.pic } };
  },

  /* ================================================================ F5 · compare: two printed files sharing EXACTLY half of the printed fields */
  _buildCompare(bankLoc, table, d, { theme, locale, unit }, ctx) {
    const loc = locale;
    if (unit) throw new Error(`G2-318: the compare face fans by theme — a unit ("${unit}") is a refusal`);
    if (!ctx || !ctx.rng) throw new Error('G2-318: the compare face needs ctx.rng');
    const rng = ctx.rng;
    if (!Array.isArray(d.fields) || d.fields.length < 2 || d.fields.length % 2) throw new Error('G2-318: compare needs an even number (>= 2) of printed fields');
    for (const f of d.fields) if (!table.fields.includes(f)) throw new Error(`G2-318: field "${f}" is not a table field`);
    if (FIELD_ORDER.filter((f) => d.fields.includes(f)).join() !== d.fields.join()) throw new Error(`G2-318: fields must follow the table order ${FIELD_ORDER.join(' ')}`);
    if (!Array.isArray(d.lanes) || d.lanes.length !== 2 || d.lanes.some((n) => !(n >= 0 && n <= 4))) throw new Error('G2-318: compare lanes must be [same, different] counts 0..4');
    const half = d.fields.length / 2;
    const nouns = assertAnimalTheme(table, theme, loc);
    const pool = facePool(bankLoc, table, theme, nouns);
    if (pool.length < 2) throw new Error(`G2-318: theme "${theme}" has ${pool.length} verifiable (7/7, named) animals < 2 — the compare face refuses this theme`);
    // PATTERN-FIRST: pick which `half` fields are the same (a random subset of the printed fields), then a pair that
    // matches it — a uniform draw over pairs is dominated by the theme's commonest profile (measured on forest creatures:
    // 13 of 30 legal pairs share class+covering) and the chip pattern hardly varies; every legal pattern is tried in rng order
    const subsets = [];
    (function rec(start, acc) { if (acc.length === half) { subsets.push(acc.slice()); return; } for (let i = start; i < d.fields.length; i++) { acc.push(d.fields[i]); rec(i + 1, acc); acc.pop(); } })(0, []);
    let pair = null;
    for (const sub of rng.shuffle(subsets)) {
      const legal = [];
      for (let i = 0; i < pool.length; i++) for (let j = i + 1; j < pool.length; j++) {
        const a = table.animals[pool[i]], b = table.animals[pool[j]];
        if (d.fields.every((f) => (a[f] === b[f]) === sub.includes(f))) legal.push([pool[i], pool[j]]);   // share EXACTLY the subset (= half), differ on the rest
      }
      if (legal.length) { pair = rng.shuffle(rng.pick(legal)); break; }
    }
    if (!pair) throw new Error(`G2-318: theme "${theme}": no two verifiable animals share exactly ${half} of ${d.fields.join(',')} (every same-subset tried) — the compare face refuses this theme`);
    const cardW = d.cardW || 330, gap = BODY_W - 2 * cardW;
    if (gap < 8) throw new Error(`G2-318: two ${cardW}-px cards do not fit ${BODY_W}`);
    const pad = 8, inner = cardW - 2 * pad - 4;
    const heroSz = d.miniHero || 120, pic = d.miniPic || 100, bannerH = d.miniBanner || 44, rowH = d.miniRowH || 34;
    if (pic < G23_FLOOR) throw new Error(`G2-318: compare picture ${pic} < the G2-3 floor ${G23_FLOOR}`);
    // The label column takes the LONGEST printed label: at 14 px Nunito 800 a glyph runs ~7.8 px, and
    // the fixed 120 px column let pt "Cobertura do corpo" (18) run into its value ("Cobertura do corpocasco",
    // read off the pt contact sheet 2026-09-14); fr "Ce qui couvre son corps" (23) and no "Kroppen er dekket av"
    // (20) overflowed the same way. The value column keeps >= 110 px or the face refuses the locale.
    const longest = Math.max(...d.fields.map((f) => len(literal(bankLoc, 'labels.' + f, loc))));
    const miniLabelW = Math.max(d.miniLabelW || 120, Math.ceil(longest * 7.8) + 20);
    if (inner - miniLabelW < 110) throw new Error(`G2-318: ${loc} compare label column ${miniLabelW} px leaves ${inner - miniLabelW} px for the value (< 110) — a shorter label is needed (refusal)`);
    const cards = pair.map((k) => {
      const n = nouns.find((x) => x.vocabKey === k);
      const a = table.animals[k], l = bankLoc.animals[k];
      const rows = d.fields.map((f) => ({ key: f, label: literal(bankLoc, 'labels.' + f, loc), value: cellOf(bankLoc, f, a[f], loc), fact: a[f] }));
      for (const r of rows) if (len(r.label) > 28) throw new Error(`G2-318: ${loc} label "${r.label}" > 28 chars`);
      return `<div data-lcs-file="${esc(k)}" style="width:${cardW}px;padding:${pad}px;background:${T.white};border:2px solid ${T.teal};border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:6px;min-width:0">` +
        heroFrame({ src: fileUri(theme, n.noun), size: heroSz, pic, noun: n.noun, unit: k }) +
        nameBanner({ name: l.name, w: inner, h: bannerH, fontPx: d.miniNamePx || 26, minPx: 22, longAt: 13 }) +
        miniFactFile({ rows, w: inner, rowH, labelW: miniLabelW, labelPx: 14, valuePx: 16 }) + '</div>';
    });
    const sd = bankLoc.sameDiff || {};
    for (const k of ['same', 'diff', 'laneSame', 'laneDiff', 'caption']) literal(bankLoc, 'sameDiff.' + k, loc);
    const cells = d.fields.map((f) => ({ key: f, label: literal(bankLoc, 'labels.' + f, loc), same: table.animals[pair[0]][f] === table.animals[pair[1]][f] }));
    const grid = sameDiffGrid({ cells, sameLabel: sd.same, diffLabel: sd.diff, w: BODY_W, cols: 2, cellH: d.sdCellH || 48, gap: 8 });
    const laneRows = Array.from({ length: d.lanes[0] }, () => ({ field: 'same', starter: sd.laneSame })).concat(Array.from({ length: d.lanes[1] }, () => ({ field: 'diff', starter: sd.laneDiff })));
    const laneH = d.cmpRowH || 44, laneGlyph = d.cmpGlyphH || 24;
    if (laneGlyph < GLYPH_FLOOR || laneH < laneGlyph + 12) throw new Error('G2-318: compare lane rows are not G2 writing rows');
    const lane = laneRows.length ? `<div class="ws-lane" data-lcs-cmplane data-lcs-rows="${laneRows.length}" style="padding:10px 16px;width:${BODY_W}px;flex:1 1 auto;display:flex;flex-direction:column;gap:6px;min-width:0;min-height:0">` +
      `<span data-lcs-caption style="font-family:${F.body},sans-serif;font-weight:800;font-size:16px;line-height:22px;color:${T.ink};flex:0 0 auto">${esc(sd.caption)}</span>` +
      `<div data-lcs-frame-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">${starterRows(laneRows, { w: BODY_W - 36, h: laneH, glyphH: laneGlyph })}</div></div>` : '';
    const stamps = ['data-ws-content', 'data-lcs-type="animal-fact-file"', 'data-lcs-face="compare"', 'data-lcs-mode="compare"',
      `data-lcs-animals="${esc(pair.join(','))}"`, `data-lcs-theme="${esc(theme)}"`, `data-lcs-locale="${loc}"`, `data-lcs-fields="${esc(d.fields.join(','))}"`,
      `data-lcs-pic="${pic}"`, `data-lcs-hero="${heroSz}"`, `data-lcs-lanes="${d.lanes.join(',')}"`, `data-lcs-glyph-h="${laneGlyph}"`].join(' ');
    const bodyHtml = `<div ${stamps} style="flex:1;display:flex;flex-direction:column;gap:${GAP}px;min-height:0">` +
      `<div data-lcs-files style="display:flex;gap:${gap}px;align-items:stretch;flex:0 0 auto">${cards.join('')}</div>${grid}${lane}</div>`;
    return { bodyHtml, meta: { animals: pair, unit: null, theme, fields: d.fields.slice(), face: 'compare', same: cells.map((c) => (c.same ? 1 : 0)), pic } };
  },

  /* ================================================================ F6 · mystery: a picture bank + riddle cards whose clues leave EXACTLY the target */
  _buildMystery(bankLoc, table, d, { theme, locale, unit }, ctx) {
    const loc = locale;
    if (unit) throw new Error(`G2-318: the mystery face fans by theme — a unit ("${unit}") is a refusal`);
    if (!ctx || !ctx.rng) throw new Error('G2-318: the mystery face needs ctx.rng');
    const rng = ctx.rng;
    const nP = d.puzzles, nB = d.bankSize, nC = d.cluesPrinted, maxName = d.bankNameMax || 9;
    if (!(nP >= 1 && nP <= 4)) throw new Error(`G2-318: puzzles ${nP} outside 1..4`);
    if (!(nB >= nP + 1 && nB <= 8)) throw new Error(`G2-318: bankSize ${nB} must be puzzles+1..8`);
    if (!(nC >= 3 && nC <= table.fields.length)) throw new Error(`G2-318: cluesPrinted ${nC} outside 3..${table.fields.length}`);
    const nouns = assertAnimalTheme(table, theme, loc);
    const pool0 = facePool(bankLoc, table, theme, nouns);
    // the bank renders on ONE row only for short names (design: <= 9 letters, measured 106 px) — a long name drops the ANIMAL from the bank
    const pool = pool0.filter((k) => len(bankLoc.animals[k].name) <= maxName);
    if (pool.length < nB) throw new Error(`G2-318: theme "${theme}" has ${pool.length} verifiable animals with names <= ${maxName} letters < bank ${nB} — the mystery face refuses this theme`);
    const prompt = literal(bankLoc, 'mystery.prompt', loc), nameLabel = literal(bankLoc, 'eyebrow', loc);
    let plan = null;
    for (let t = 0; t < TRIES && !plan; t++) {
      // a bank of nB animals pairwise distinct in >= 1 field (greedy over a fresh shuffle)
      const bank = [];
      for (const k of rng.shuffle(pool)) { if (bank.every((b) => !sameProfile(table, b, k))) bank.push(k); if (bank.length === nB) break; }
      if (bank.length < nB) continue;
      const targets = rng.sample(bank, nP);
      const cards = [];
      for (const tk of targets) {
        const others = bank.filter((k) => k !== tk);
        // a random nC-subset of the fields whose clues contradict EVERY other bank animal
        let fields = null;
        for (let u = 0; u < 60 && !fields; u++) {
          const sub = rng.sample(table.fields, nC);
          if (others.every((o) => sub.some((f) => table.animals[o][f] !== table.animals[tk][f]))) fields = FIELD_ORDER.filter((f) => sub.includes(f));
        }
        if (!fields) break;
        cards.push({ answer: tk, fields });
      }
      if (cards.length === nP) plan = { bank: rng.shuffle(bank), cards };
    }
    if (!plan) throw new Error(`G2-318: theme "${theme}": no ${nB}-animal bank with ${nP} solvable riddles in ${TRIES} tries — the mystery face refuses this theme`);
    const tiles = plan.bank.map((k) => {
      const n = nouns.find((x) => x.vocabKey === k);
      const a = table.animals[k];
      const profile = table.fields.map((f) => f + '=' + String(a[f])).join(';');
      return `<span class="ws-bankword" style="font-size:${d.bankPx || 15}px" data-lcs-bank="${esc(k)}" data-lcs-bank-word="${esc(bankLoc.animals[k].name)}" data-lcs-profile="${esc(profile)}">` +
        `<img class="ws-icon" src="${esc(fileUri(theme, n.noun))}" alt="" data-lcs-noun="${esc(n.noun)}" data-lcs-unit="${esc(k)}" style="width:44px;height:44px"><span>${esc(bankLoc.animals[k].name)}</span></span>`;
    });
    const bankHtml = `<div class="ws-scene-banner ws-bank ws-bank--icons" data-lcs-bank-banner data-lcs-bank-n="${plan.bank.length}" style="margin:0;flex:0 0 auto;flex-wrap:wrap">${tiles.join('')}</div>`;
    const cardsHtml = plan.cards.map((c, i) => {
      const a = table.animals[c.answer];
      const clues = c.fields.map((f) => ({ field: f, value: a[f], text: clueOf(bankLoc, f, a[f], loc) }));
      const nm = bankLoc.animals[c.answer].name;
      for (const cl of clues) if (wordRe(nm).test(cl.text)) throw new Error(`G2-318: clue "${cl.text}" names the answer "${nm}"`);
      for (const cl of clues) if (len(cl.text) > 40) throw new Error(`G2-318: ${loc} clue "${cl.text}" is ${len(cl.text)} chars > 40`);
      return riddleCard({ n: i + 1, clues, answer: c.answer, prompt, nameLabel, cluesW: d.cluesW || 300, laneW: d.nameLaneW || 165, drawW: d.riddleDrawW || 146, drawH: d.riddleDrawH || 140, minH: d.cardMin || 180, glyphH: d.nameGlyphH || 26 });
    });
    const stamps = ['data-ws-content', 'data-lcs-type="animal-fact-file"', 'data-lcs-face="mystery"', 'data-lcs-mode="mystery"',
      `data-lcs-theme="${esc(theme)}"`, `data-lcs-locale="${loc}"`, `data-lcs-puzzles="${nP}"`, `data-lcs-bank-size="${nB}"`, `data-lcs-clues="${nC}"`,
      `data-lcs-fields="${esc(table.fields.join(','))}"`, `data-lcs-glyph-h="${d.nameGlyphH || 26}"`].join(' ');
    const bodyHtml = `<div ${stamps} style="flex:1;display:flex;flex-direction:column;gap:${GAP}px;min-height:0">${bankHtml}${cardsHtml.join('')}</div>`;
    return { bodyHtml, meta: { unit: null, theme, face: 'mystery', bank: plan.bank.slice(), answers: plan.cards.map((c) => c.answer), clueFields: plan.cards.map((c) => c.fields.slice()) } };
  },

  async verify(page) {
    const knobs = await page.evaluate(() => {
      const r = document.querySelector('[data-ws-content][data-lcs-type="animal-fact-file"]');
      if (!r) return null;
      const d = r.dataset;
      return { mode: d.lcsMode || '', cell: d.lcsCell || '', bank: d.lcsBank || '', frames: d.lcsFrames || '' };
    });
    if (knobs && knobs.mode === 'compare') return page.evaluate(VERIFY_COMPARE);
    if (knobs && knobs.mode === 'mystery') return page.evaluate(VERIFY_MYSTERY);
    // the card faces + the base share one page function; `face` comes from the KNOB stamps, never from data-lcs-face alone
    const face = !knobs ? null : knobs.cell === 'chips' ? 'tick' : knobs.bank === '1' ? 'bank' : knobs.cell === 'printed' && knobs.frames ? 'frames' : null;
    return page.evaluate(VERIFY_CARD, face);
  },
};

/* ------------------------------------------------------------------ page-side verify (injected by source; page.evaluate cannot close over Node scope) */
/** The base card + the three card faces (tick / bank / frames). `face` null = the base: every lane an EMPTY writing row, no face stamp. */
function VERIFY_CARD(face) {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="animal-fact-file"]');
      if (!root) return ['no animal-fact-file root'];
      if (face && root.dataset.lcsFace !== face) fails.push(`data-lcs-face "${root.dataset.lcsFace}" ≠ the knob face "${face}"`);
      const body = document.querySelector('[data-lcs-body]');
      const rect = (el) => el.getBoundingClientRect();
      const ds = root.dataset;
      const blank = ds.lcsBlank === '1';
      const fields = ds.lcsFields.split(',');
      const px = +ds.lcsLabelPx;
      // 1. nothing printed answers anything: no `{`, no answerBox, no face stamp, only the hero picture
      const text = root.textContent || '';
      if (text.includes('{')) fails.push('a `{` slot is printed in the body');
      if (root.querySelector('.ws-answerbox')) fails.push('an answerBox (.ws-answerbox) on an open page');
      if (!face && root.hasAttribute('data-lcs-face')) fails.push('data-lcs-face is stamped on the base');
      if (face && blank) fails.push(`the ${face} face renders the blank unit`);
      const imgs = [...root.querySelectorAll('img')];
      if (blank) { if (imgs.length) fails.push('the blank unit prints a picture'); }
      else if (imgs.length !== 1 || !imgs[0].hasAttribute('data-lcs-hero')) fails.push(`${imgs.length} pictures, want exactly the hero`);
      // 2. the hero
      const frame = root.querySelector('[data-lcs-hero-frame]');
      if (!frame) fails.push('no hero frame');
      else {
        const fr = rect(frame);
        const stretch = frame.dataset.lcsStretch === '1';
        if (Math.abs(fr.width - (+ds.lcsHero)) > 1 || (stretch ? fr.height < (+ds.lcsHero) - 0.6 : Math.abs(fr.height - (+ds.lcsHero)) > 1)) fails.push(`hero frame ${Math.round(fr.width)}×${Math.round(fr.height)} ≠ ${ds.lcsHero}${stretch ? ' (min)' : ''}`);
        if (stretch !== (+ds.lcsSpecial > 0)) fails.push('the hero stretches only beside a special block');
        if (blank) {
          if (!frame.querySelector('[data-lcs-drawbox="hero"]')) fails.push('blank unit: no hero drawing zone');
        } else {
          const im = frame.querySelector('img.ws-icon[data-lcs-hero]');
          if (!im) fails.push('no hero picture in the frame');
          else {
            const r = rect(im);
            if (r.width < 36 || r.height < 36) fails.push(`hero picture ${Math.round(r.width)}×${Math.round(r.height)} < the G2-3 floor 36`);
            if (Math.abs(r.width - (+ds.lcsPic)) > 1 || Math.abs(r.height - (+ds.lcsPic)) > 1) fails.push(`hero picture ${Math.round(r.width)}×${Math.round(r.height)} ≠ config ${ds.lcsPic}`);
            if (!im.complete || im.naturalWidth === 0) fails.push('hero picture did not load');
            if (im.dataset.lcsUnit !== ds.lcsAnimal) fails.push(`hero unit "${im.dataset.lcsUnit}" ≠ root animal "${ds.lcsAnimal}"`);
            if (r.left < rect(frame).left - 0.6 || r.right > rect(frame).right + 0.6 || r.top < rect(frame).top - 0.6 || r.bottom > rect(frame).bottom + 0.6) fails.push('the hero picture leaves its frame');
          }
        }
      }
      // 3. the name banner
      const banner = root.querySelector('[data-lcs-banner]');
      const name = root.querySelector('[data-lcs-name]');
      if (!banner || !name) fails.push('no name banner');
      else {
        if (!banner.querySelector('[data-lcs-paw]')) fails.push('no paw glyph in the banner');
        const nr = rect(name), br = rect(banner);
        if (blank) {
          if (name.textContent.trim()) fails.push('blank unit: the name lane prints text');
          if (!name.querySelector('svg[data-lcs-prim="writing-row"]')) fails.push('blank unit: no writing row in the name lane');
          const nl = name.querySelectorAll('line');
          if (nl.length !== 3) fails.push(`blank unit: the name lane has ${nl.length} rules`);
          else {
            const span = +nl[2].getAttribute('y1') - +nl[0].getAttribute('y1');
            if (Math.abs(span - 28) > 1) fails.push(`blank unit: name rules ${span.toFixed(1)} apart ≠ 28`);
            if (Math.abs(rect(nl[0]).right - nr.right) > 1 || nr.width < 200) fails.push(`blank unit: the name rules do not fill the lane (${Math.round(nr.width)} px)`);
          }
          const eb = banner.querySelector('[data-lcs-eyebrow]');
          if (!eb || !eb.textContent.trim()) fails.push('blank unit: no eyebrow literal');
        } else {
          const t = name.textContent.trim();
          if (!t) fails.push('the name is empty');
          if (/\d|\{/.test(t)) fails.push(`the name "${t}" carries a digit or a slot`);
          if (name.scrollWidth > name.clientWidth + 0.6) fails.push(`the name "${t}" is clipped (${name.scrollWidth} > ${name.clientWidth})`);
          const fs = parseFloat(getComputedStyle(name).fontSize);
          if (fs !== +name.dataset.lcsNamePx || fs < 30) fails.push(`the name renders at ${fs}px (stamp ${name.dataset.lcsNamePx}, floor 30)`);
          if (nr.right > br.right + 0.6 || nr.bottom > br.bottom + 0.6 || nr.top < br.top - 0.6) fails.push('the name leaves the banner');
        }
      }
      // 4. the fact table: the stamped fields in order, a label <= 2 lines unclipped, one EMPTY writing row per row (tick: a choice row; frames: a printed file), stamps only where allowed
      const table = root.querySelector('[data-lcs-table]');
      const mini = root.querySelector('[data-lcs-mini]');
      if (face === 'frames') {
        if (table) fails.push('the frames face renders the writing table');
        if (!mini) fails.push('the frames face has no printed fact file');
        else {
          const mrows = [...mini.querySelectorAll('[data-lcs-mini-row]')];
          if (mrows.map((r) => r.dataset.lcsField).join() !== fields.join()) fails.push(`printed rows ${mrows.map((r) => r.dataset.lcsField).join()} ≠ ${fields.join()}`);
          const mr = rect(mini);
          mrows.forEach((r) => {
            const f = r.dataset.lcsField;
            const lab = r.querySelector('[data-lcs-label-text]'), val = r.querySelector('[data-lcs-printed]');
            if (!lab || !lab.textContent.trim()) fails.push(`printed row ${f}: no label`);
            else { const cell = lab.closest('[data-lcs-mini-label]'), lr = rect(lab), cr = rect(cell); const padR = parseFloat(getComputedStyle(cell).paddingRight) || 0; if (lr.right > cr.right - padR + 0.6) fails.push(`printed row ${f}: label "${lab.textContent.trim()}" runs ${Math.round(lr.right - (cr.right - padR))} px past its column into the value`); }
            if (!val || !val.textContent.trim()) fails.push(`printed row ${f}: no printed value`);
            else {
              if (val.textContent.trim() !== r.dataset.lcsValue) fails.push(`printed row ${f}: text "${val.textContent.trim()}" ≠ stamp "${r.dataset.lcsValue}"`);
              if (val.scrollWidth > val.clientWidth + 0.6) fails.push(`printed row ${f}: value clipped`);
              const vr = rect(val); if (vr.right > mr.right + 0.6 || vr.bottom > mr.bottom + 0.6 || vr.top < mr.top - 0.6) fails.push(`printed row ${f}: the value leaves the file`);
              if (parseFloat(getComputedStyle(val).fontSize) < 14) fails.push(`printed row ${f}: value < 14 px`);
            }
            const stamps = [...r.attributes].map((a) => a.name).filter((n) => n.startsWith('data-lcs-fact-'));
            if (stamps.length !== 1 || stamps[0] !== 'data-lcs-fact-' + f) fails.push(`printed row ${f}: stamps ${stamps.join(',')} (want exactly its own)`);
            if (r.querySelector('svg[data-lcs-prim="writing-row"]')) fails.push(`printed row ${f}: a writing row in a printed file`);
          });
        }
        // the frame lane: N starters (<= 22 chars, no end mark, distinct) + `free` empty rows, every row a writing row at the frame glyphH, rows inside the lane, none under the footer
        const lane = root.querySelector('[data-lcs-framelane]');
        if (!lane) fails.push('no frame lane');
        else {
          const want = +ds.lcsFrames, free = +ds.lcsFree;
          const frows = [...lane.querySelectorAll('[data-lcs-frame-row]')];
          if (frows.length !== want + free) fails.push(`${frows.length} frame rows, want ${want} + ${free}`);
          const sts = [...lane.querySelectorAll('[data-lcs-starter]')];
          if (sts.length !== want) fails.push(`${sts.length} starters, want ${want}`);
          const seen = new Set();
          sts.forEach((s) => { const t = s.textContent.trim(); if (!t || [...t].length > 22 || /[.?!]$/.test(t)) fails.push(`bad starter "${t}"`); if (seen.has(t)) fails.push(`starter "${t}" repeats`); seen.add(t); });
          const cap = lane.querySelector('[data-lcs-caption]');
          if (!cap || !cap.textContent.trim()) fails.push('the frame lane has no caption');
          const lr = rect(lane);
          let prev = null;
          frows.forEach((r, i) => {
            const wr = r.querySelectorAll('svg[data-lcs-prim="writing-row"]');
            if (wr.length !== +ds.lcsFrameLines) fails.push(`frame row ${i + 1}: ${wr.length} writing rows, want ${ds.lcsFrameLines}`);
            if (r.querySelectorAll('[data-lcs-starter]').length > 1) fails.push(`frame row ${i + 1}: a starter on more than one line`);
            const isFree = r.dataset.lcsFrameField === 'free';
            if (isFree && r.querySelector('text')) fails.push(`free row ${i + 1} carries a starter`);
            if (!isFree && !r.querySelector('[data-lcs-starter]')) fails.push(`frame row ${i + 1} has no starter`);
            const lines = r.querySelectorAll('line');
            if (lines.length >= 3) { const span = +lines[2].getAttribute('y1') - +lines[0].getAttribute('y1'); if (Math.abs(span - (+ds.lcsFrameGlyphH)) > 1) fails.push(`frame row ${i + 1}: rules ${span.toFixed(1)} apart ≠ ${ds.lcsFrameGlyphH}`); }
            const rr = rect(r);
            if (rr.left < lr.left - 0.6 || rr.right > lr.right + 0.6 || rr.top < lr.top - 0.6 || rr.bottom > lr.bottom + 0.6) fails.push(`frame row ${i + 1} leaves the lane`);
            if (prev != null && rr.top < prev - 0.6) fails.push(`frame row ${i + 1} overlaps the row above`);
            prev = rr.bottom;
          });
        }
        if (root.querySelector('[data-lcs-drawbox]')) fails.push('the frames face has a draw box');
        if (root.querySelector('[data-lcs-factlane]')) fails.push('the frames face has a fact lane');
      } else if (!table) fails.push('no fact table');
      else {
        const rows = [...table.querySelectorAll('[data-lcs-row]')];
        if (rows.length !== fields.length || +table.dataset.lcsRows !== fields.length) fails.push(`${rows.length} rows (stamp ${table.dataset.lcsRows}), want ${fields.length}`);
        if (rows.map((r) => r.dataset.lcsField).join() !== fields.join()) fails.push(`row order ${rows.map((r) => r.dataset.lcsField).join()} ≠ ${fields.join()}`);
        const lineH = px + 6;
        let prevBottom = null;
        rows.forEach((r) => {
          const f = r.dataset.lcsField;
          const lab = r.querySelector('[data-lcs-label-text]');
          const cell = r.querySelector('[data-lcs-label]');
          if (!lab || !lab.textContent.trim()) fails.push(`row ${f}: no label`);
          else {
            const lr = rect(lab);
            if (lr.height > 2 * lineH + 0.6) fails.push(`row ${f}: label "${lab.textContent.trim()}" runs ${Math.round(lr.height)} px (> 2 lines of ${lineH})`);
            if (lab.scrollWidth > lab.clientWidth + 0.6 || cell.scrollWidth > cell.clientWidth + 0.6) fails.push(`row ${f}: label "${lab.textContent.trim()}" is clipped`);
            if (parseFloat(getComputedStyle(lab).fontSize) !== px) fails.push(`row ${f}: label at ${getComputedStyle(lab).fontSize} ≠ ${px}px`);
            const cr = rect(cell);
            if (lr.bottom > cr.bottom + 0.6 || lr.top < cr.top - 0.6) fails.push(`row ${f}: the label leaves its cell`);
            if (cr.height < (+ds.lcsRowMin) - 0.6) fails.push(`row ${f}: ${Math.round(cr.height)} px < the row floor ${ds.lcsRowMin}`);
            if (prevBottom != null && cr.top < prevBottom - 0.6) fails.push(`row ${f}: overlaps the row above`);
            prevBottom = cr.bottom;
          }
          const lane = r.querySelector('[data-lcs-lane]');
          const choice = r.querySelector('[data-lcs-choicerow]');
          if (face === 'tick') {
            // a choice row: exactly the stamped chip count, distinct opt keys, one correct index inside range, chips identical in style, no glyph, inside the cell, tap >= 36
            if (lane) fails.push(`row ${f}: a writing lane on the tick face`);
            if (!choice) fails.push(`row ${f}: no choice row`);
            else {
            const chips = [...choice.querySelectorAll('[data-lcs-opt]')];
            const n = +r.dataset.lcsN, ci = +r.dataset.lcsCorrect;
            if (chips.length !== n || (f !== 'fly' && f !== 'swim' ? n !== +ds.lcsChoices : n !== 2)) fails.push(`row ${f}: ${chips.length} chips (stamp ${n}, config ${ds.lcsChoices})`);
            if (!(ci >= 0 && ci < chips.length)) fails.push(`row ${f}: correct index ${r.dataset.lcsCorrect} out of range`);
            const keys = chips.map((c) => c.dataset.lcsOpt);
            if (new Set(keys).size !== keys.length) fails.push(`row ${f}: chip keys repeat (${keys.join(',')})`);
            const texts = chips.map((c) => c.textContent.trim());
            if (new Set(texts).size !== texts.length || texts.some((t) => !t)) fails.push(`row ${f}: chip texts ${JSON.stringify(texts)}`);
            const stamps = [...r.attributes].map((a) => a.name).filter((n2) => n2.startsWith('data-lcs-fact-'));
            if (stamps.length === 1 && chips[ci] && chips[ci].dataset.lcsOpt !== r.getAttribute(stamps[0])) fails.push(`row ${f}: chip ${ci} "${chips[ci].dataset.lcsOpt}" ≠ the fact stamp "${r.getAttribute(stamps[0])}"`);
            const style0 = chips.length ? getComputedStyle(chips[0]) : null;
            const cr = rect(r.querySelector('[data-lcs-lane-cell]'));
            chips.forEach((c, i) => {
              const cs = getComputedStyle(c), rr = rect(c);
              if (style0 && (cs.borderColor !== style0.borderColor || cs.backgroundColor !== style0.backgroundColor || cs.color !== style0.color || cs.fontSize !== style0.fontSize)) fails.push(`row ${f}: chip ${i} is styled differently (a verdict by palette)`);
              if (c.querySelector('svg, img')) fails.push(`row ${f}: chip ${i} carries a glyph`);
              if (c.scrollWidth > c.clientWidth + 0.6) fails.push(`row ${f}: chip "${c.textContent.trim()}" is clipped`);
              if (rr.height < 36 || rr.width < 36) fails.push(`row ${f}: chip ${i} ${Math.round(rr.width)}×${Math.round(rr.height)} < 36`);
              if (rr.right > cr.right + 0.6 || rr.left < cr.left - 0.6 || rr.top < cr.top - 0.6 || rr.bottom > cr.bottom + 0.6) fails.push(`row ${f}: chip ${i} leaves its cell`);
            });
            }
          } else {
          if (choice) fails.push(`row ${f}: a choice row outside the tick face`);
          if (!lane) fails.push(`row ${f}: no writing lane`);
          else {
            if (lane.textContent.trim() || lane.querySelector('text')) fails.push(`row ${f}: the lane is not empty`);
            const rowsIn = lane.querySelectorAll('svg[data-lcs-prim="writing-row"]');
            if (rowsIn.length !== 1) fails.push(`row ${f}: ${rowsIn.length} writing rows, want 1`);
            const lines = lane.querySelectorAll('line');
            if (lines.length >= 3) {
              const span = +lines[2].getAttribute('y1') - +lines[0].getAttribute('y1');
              if (Math.abs(span - (+ds.lcsGlyphH)) > 1) fails.push(`row ${f}: rules ${span.toFixed(1)} apart ≠ glyphH ${ds.lcsGlyphH}`);
            } else fails.push(`row ${f}: the lane has ${lines.length} rules`);
            const lr = rect(lane), cr = rect(r.querySelector('[data-lcs-lane-cell]'));
            if (lr.right > cr.right + 0.6 || lr.bottom > cr.bottom + 0.6 || lr.top < cr.top - 0.6) fails.push(`row ${f}: the lane leaves its cell`);
            if (Math.abs(lr.width - (+table.dataset.lcsLaneW)) > 1) fails.push(`row ${f}: lane ${Math.round(lr.width)} ≠ ${table.dataset.lcsLaneW}`);
          }
          }
          const stamps = [...r.attributes].map((a) => a.name).filter((n) => n.startsWith('data-lcs-fact-'));
          if (stamps.length > 1) fails.push(`row ${f}: ${stamps.length} fact stamps`);
          if (stamps.length === 1 && stamps[0] !== 'data-lcs-fact-' + f) fails.push(`row ${f}: stamp ${stamps[0]} names another field`);
          if (blank && stamps.length) fails.push(`row ${f}: a fact stamp on the blank unit`);
          for (const s of stamps) { const v = r.getAttribute(s); if (!v || v === 'null' || v === 'undefined') fails.push(`row ${f}: stamp ${s}="${v}"`); }
        });
        if (face === 'tick') {
          const n = +ds.lcsChoices;
          const wide = rows.filter((r) => +r.dataset.lcsN === n).map((r) => +r.dataset.lcsCorrect);
          const seen = new Set(wide);
          if (seen.size < Math.min(n, wide.length)) fails.push(`the correct index takes only positions ${[...seen].join(',')} over ${wide.length} ${n}-chip rows (a position bot wins)`);
          rows.forEach((r) => { if (![...r.attributes].some((a) => a.name.startsWith('data-lcs-fact-'))) fails.push(`row ${r.dataset.lcsField}: no fact stamp on a verifiable row`); });
        }
        if (face === 'bank') rows.forEach((r) => { if (![...r.attributes].some((a) => a.name.startsWith('data-lcs-fact-'))) fails.push(`row ${r.dataset.lcsField}: no fact stamp on the bank face`); });
      }
      // 4b. the bank face: the word bank sits in the draw-box slot (nothing overflows it), every word stamped, no duplicates, no draw box
      const slot = root.querySelector('[data-lcs-bankslot]');
      if (face === 'bank') {
        if (!slot) fails.push('no bank slot');
        else {
          const words = [...slot.querySelectorAll('[data-lcs-bank-word]')];
          if (words.length !== +slot.dataset.lcsBankN || words.length !== fields.length + (+ds.lcsBankExtra)) fails.push(`${words.length} bank words (stamp ${slot.dataset.lcsBankN}, want ${fields.length} + ${ds.lcsBankExtra})`);
          const texts = words.map((w) => w.textContent.trim());
          if (new Set(texts).size !== texts.length) fails.push('a bank word repeats');
          words.forEach((w) => { if (w.textContent.trim() !== w.dataset.lcsBankWord) fails.push(`bank word "${w.textContent.trim()}" ≠ stamp "${w.dataset.lcsBankWord}"`); if (!fields.includes(w.dataset.lcsBankField)) fails.push(`bank word "${w.textContent.trim()}" stamps field "${w.dataset.lcsBankField}"`); if (w.querySelector('img, svg')) fails.push('a bank word carries a glyph'); });
          const banner = slot.querySelector('[data-lcs-bank-banner]');
          if (!banner) fails.push('no bank banner');
          else {
            if (banner.scrollHeight > banner.clientHeight + 0.6 || banner.scrollWidth > banner.clientWidth + 0.6) fails.push(`the bank overflows its banner (${banner.scrollHeight}/${banner.clientHeight})`);
            const sr = rect(slot), br2 = rect(banner);
            if (br2.top < sr.top - 0.6 || br2.bottom > sr.bottom + 0.6 || br2.right > sr.right + 0.6) fails.push(`the bank leaves the ${Math.round(sr.width)}×${Math.round(sr.height)} slot (${Math.round(br2.height)} high)`);
            words.forEach((w) => { const wr = rect(w); if (wr.bottom > br2.bottom + 0.6 || wr.right > br2.right + 0.6 || wr.left < br2.left - 0.6) fails.push(`bank word "${w.textContent.trim()}" leaves the banner`); });
          }
          // every field of the table has at least one bank word (the child can copy every truth)
          (table ? [...table.querySelectorAll('[data-lcs-row]')] : []).forEach((r) => {
            const f = r.dataset.lcsField;
            const truthNodes = words.filter((w) => w.dataset.lcsBankField === f);
            if (truthNodes.length < 1) fails.push(`the bank has no word for field ${f}`);
          });
        }
      } else if (slot) fails.push('a bank slot outside the bank face');
      // 5. the draw box / the special block / the fact lane, exactly as stamped
      const boxes = [...root.querySelectorAll('[data-lcs-drawbox]')].filter((b) => b.dataset.lcsDrawbox !== 'hero');
      if (face === 'bank' && boxes.length) fails.push('the bank face renders a draw box');
      if (ds.lcsDraw === '1') {
        if (boxes.length !== 1) fails.push(`${boxes.length} draw boxes, want 1`);
        else {
          const b = boxes[0], r = rect(b);
          if (b.textContent.trim() || b.querySelector('img, text')) fails.push('the draw box is not empty');
          if (r.width < 300 || r.height < 100) fails.push(`draw box ${Math.round(r.width)}×${Math.round(r.height)} too small`);
          const lab = root.querySelector('[data-lcs-label-key="drawLabel"]');
          if (!lab || !lab.textContent.trim()) fails.push('no draw label');
          else { const lr = rect(lab); if (lr.left < r.left || lr.right > r.right + 0.6 || lr.top < r.top || lr.bottom > r.bottom) fails.push('the draw label sits outside the draw box'); }
        }
      } else if (boxes.length) fails.push('a draw box without a stamp');
      const special = root.querySelector('[data-lcs-special]');
      if (+ds.lcsSpecial > 0) {
        if (!special) fails.push('no special block');
        else {
          const rr = special.querySelectorAll('svg[data-lcs-prim="writing-row"]');
          if (rr.length !== +ds.lcsSpecial) fails.push(`special block ${rr.length} rows ≠ ${ds.lcsSpecial}`);
          if (special.querySelector('text')) fails.push('the special block carries a starter/model text');
          const cap = special.querySelector('[data-lcs-label-key="special"]');
          if (!cap || !cap.textContent.trim()) fails.push('no special caption');
        }
      } else if (special) fails.push('a special block without a stamp');
      const lane = root.querySelector('[data-lcs-factlane]');
      if (ds.lcsLane === '1') {
        if (!lane) fails.push('no fact lane');
        else {
          const st = lane.querySelector('[data-lcs-starter]'), cap = lane.querySelector('[data-lcs-caption]');
          const head = st || cap;
          if (!head || !head.textContent.trim()) fails.push('the fact lane has neither a starter nor a caption');
          else if (st && /[.?!]$/.test(st.textContent.trim())) fails.push(`starter "${st.textContent.trim()}" ends with an end mark`);
          const wr = lane.querySelector('[data-lcs-lane="sentence"]');
          if (!wr || wr.textContent.trim() || !wr.querySelector('svg[data-lcs-prim="writing-row"]') || wr.querySelector('text')) fails.push('the fact lane has no empty writing row');
          else {
            const inner = rect(lane).width - 36;
            const used = (head ? rect(head).width : 0) + 10 + rect(wr).width;
            if (used > inner + 0.6) fails.push(`fact lane row ${Math.round(used)} > inner ${Math.round(inner)}`);
            if (rect(wr).width < 200) fails.push(`the sentence lane is only ${Math.round(rect(wr).width)} px wide`);
            const lines = wr.querySelectorAll('line');
            if (lines.length !== 3) fails.push(`the sentence lane has ${lines.length} rules`);
            lines.forEach((l) => { const lr = rect(l); if (lr.right > rect(wr).right + 0.6 || lr.width < rect(wr).width - 1) fails.push('a sentence rule does not span the lane'); });
          }
        }
      } else if (lane) fails.push('a fact lane without a stamp');
      // 6. the stray-text rule: every leaf text node is a stamped literal
      const leaves = [...root.querySelectorAll('span, p, div')].filter((n) => n.children.length === 0 && n.textContent.trim());
      for (const n of leaves) {
        const okNode = n.matches('[data-lcs-name],[data-lcs-label-text],[data-lcs-label-key],[data-lcs-starter],[data-lcs-caption],[data-lcs-eyebrow]') ||
          (face === 'tick' && n.matches('[data-lcs-opt]')) || (face === 'bank' && !!n.closest('[data-lcs-bank-word]')) || (face === 'frames' && n.matches('[data-lcs-printed]'));
        if (!okNode) fails.push(`stray text: "${n.textContent.trim().slice(0, 24)}"`);
      }
      // 7. geometry: the top row aligned, everything inside the body column and above the footer, no overlap between the three blocks
      const br = rect(body);
      const foot = document.querySelector('.ws-foot');
      const ft = foot ? rect(foot).top : Infinity;
      const blocks = [root.querySelector('[data-lcs-top]'), table, lane, root.querySelector('[data-lcs-framelane]')].filter(Boolean).map((el) => ({ el, r: rect(el) }));
      for (const b of blocks) {
        if (b.r.left < br.left - 0.6 || b.r.right > br.right + 0.6 || b.r.top < br.top - 0.6 || b.r.bottom > br.bottom + 0.6) fails.push(`${Object.keys(b.el.dataset)[0]} leaves the body column`);
        if (b.r.bottom > ft + 0.6) fails.push(`${Object.keys(b.el.dataset)[0]} reaches ${Math.round(b.r.bottom)} against the footer at ${Math.round(ft)}`);
      }
      for (let i = 1; i < blocks.length; i++) if (blocks[i].r.top < blocks[i - 1].r.bottom + 11) fails.push(`${Object.keys(blocks[i].el.dataset)[0]} sits ${Math.round(blocks[i].r.top - blocks[i - 1].r.bottom)} px under the block above (want the 12 px gap)`);
      const col = root.querySelector('[data-lcs-column]');
      if (frame && col) {
        const fr = rect(frame), cr = rect(col);
        if (Math.abs(fr.top - cr.top) > 0.6) fails.push('the column does not start level with the hero');
        if (Math.abs(fr.bottom - cr.bottom) > 1) fails.push(`the column ends ${Math.round(cr.bottom - fr.bottom)} px off the hero bottom`);
        if (cr.right > br.right + 0.6) fails.push('the column leaves the body');
      }
      return fails;
}

/** F5 · compare: two printed files, the same|different grid re-derived from the printed values, starter rows, nothing under the footer. */
function VERIFY_COMPARE() {
  const fails = [];
  const root = document.querySelector('[data-ws-content][data-lcs-type="animal-fact-file"]');
  if (!root) return ['no animal-fact-file root'];
  const ds = root.dataset;
  const rect = (el) => el.getBoundingClientRect();
  if (ds.lcsFace !== 'compare' || ds.lcsMode !== 'compare') fails.push('compare: face/mode stamps missing');
  if ((root.textContent || '').includes('{')) fails.push('a `{` slot is printed');
  if (root.querySelector('.ws-answerbox')) fails.push('an answerBox on the compare face');
  const fields = ds.lcsFields.split(',');
  const keys = (ds.lcsAnimals || '').split(',');
  if (keys.length !== 2 || keys[0] === keys[1] || keys.some((k) => !k)) fails.push(`animals stamp "${ds.lcsAnimals}" is not two distinct keys`);
  const files = [...root.querySelectorAll('[data-lcs-file]')];
  if (files.length !== 2 || files.map((f) => f.dataset.lcsFile).join() !== keys.join()) fails.push(`${files.length} files (${files.map((f) => f.dataset.lcsFile).join()}) ≠ ${keys.join()}`);
  const values = {};
  files.forEach((f) => {
    const k = f.dataset.lcsFile;
    const im = f.querySelector('img.ws-icon[data-lcs-hero]');
    if (!im) fails.push(`file ${k}: no picture`);
    else {
      const r = rect(im);
      if (!im.complete || im.naturalWidth === 0) fails.push(`file ${k}: picture did not load`);
      if (r.width < 36 || Math.abs(r.width - (+ds.lcsPic)) > 1) fails.push(`file ${k}: picture ${Math.round(r.width)} ≠ ${ds.lcsPic} (floor 36)`);
      if (im.dataset.lcsUnit !== k) fails.push(`file ${k}: picture unit "${im.dataset.lcsUnit}"`);
    }
    const name = f.querySelector('[data-lcs-name]');
    if (!name || !name.textContent.trim()) fails.push(`file ${k}: no name`);
    else if (name.scrollWidth > name.clientWidth + 0.6) fails.push(`file ${k}: name "${name.textContent.trim()}" clipped`);
    const rows = [...f.querySelectorAll('[data-lcs-mini-row]')];
    if (rows.map((r) => r.dataset.lcsField).join() !== fields.join()) fails.push(`file ${k}: rows ${rows.map((r) => r.dataset.lcsField).join()} ≠ ${fields.join()}`);
    values[k] = {};
    const fr = rect(f);
    rows.forEach((r) => {
      const fld = r.dataset.lcsField;
      const val = r.querySelector('[data-lcs-printed]'), lab = r.querySelector('[data-lcs-label-text]');
      if (!val || !val.textContent.trim()) fails.push(`file ${k} row ${fld}: no printed value`);
      else {
        if (val.textContent.trim() !== r.dataset.lcsValue) fails.push(`file ${k} row ${fld}: text ≠ stamp`);
        if (val.scrollWidth > val.clientWidth + 0.6) fails.push(`file ${k} row ${fld}: value clipped`);
        const vr = rect(val); if (vr.right > fr.right + 0.6 || vr.bottom > fr.bottom + 0.6) fails.push(`file ${k} row ${fld}: the value leaves the card`);
      }
      if (!lab || !lab.textContent.trim()) fails.push(`file ${k} row ${fld}: label missing`);
      else {
        // a nowrap span grows past its cell without ever clipping (scrollWidth == clientWidth), so the
        // old check could not see "Cobertura do corpocasco" — measure the span against its own cell
        const cell = lab.closest('[data-lcs-mini-label]'), lr = rect(lab), cr = rect(cell);
        const padR = parseFloat(getComputedStyle(cell).paddingRight) || 0;
        if (lr.right > cr.right - padR + 0.6) fails.push(`file ${k} row ${fld}: label "${lab.textContent.trim()}" runs ${Math.round(lr.right - (cr.right - padR))} px past its column into the value`);
      }
      if (val) { const vc = val.closest('[data-lcs-mini-value]'), vr2 = rect(val), vcr = rect(vc); if (vr2.right > vcr.right + 0.6 || vr2.left < vcr.left - 0.6) fails.push(`file ${k} row ${fld}: value "${val.textContent.trim()}" leaves its column`); }
      const stamp = r.getAttribute('data-lcs-fact-' + fld);
      if (!stamp || stamp === 'null') fails.push(`file ${k} row ${fld}: no fact stamp`);
      values[k][fld] = stamp;
    });
    if (f.querySelector('svg[data-lcs-prim="writing-row"]')) fails.push(`file ${k}: a writing row in a printed file`);
  });
  // the grid: one cell per field, same re-derived from the two files' stamps, chips fixed order same|diff, identical style, no glyph, inside the cell
  const grid = root.querySelector('[data-lcs-sdgrid]');
  if (!grid) fails.push('no same/different grid');
  else {
    const cells = [...grid.querySelectorAll('[data-lcs-sdcell]')];
    if (cells.map((c) => c.dataset.lcsField).join() !== fields.join()) fails.push(`grid cells ${cells.map((c) => c.dataset.lcsField).join()} ≠ ${fields.join()}`);
    let same = 0;
    cells.forEach((c) => {
      const fld = c.dataset.lcsField;
      const want = values[keys[0]] && values[keys[1]] && values[keys[0]][fld] === values[keys[1]][fld] ? '1' : '0';
      if (c.dataset.lcsSame !== want) fails.push(`cell ${fld}: data-lcs-same="${c.dataset.lcsSame}" but the files print ${want === '1' ? 'the same' : 'different'} values`);
      if (want === '1') same++;
      const chips = [...c.querySelectorAll('[data-lcs-sd]')];
      if (chips.map((x) => x.dataset.lcsSd).join() !== 'same,diff') fails.push(`cell ${fld}: chips ${chips.map((x) => x.dataset.lcsSd).join()} (want same,diff in that order)`);
      const cr = rect(c);
      const s0 = chips.length ? getComputedStyle(chips[0]) : null;
      chips.forEach((x, i) => {
        const cs = getComputedStyle(x), r = rect(x);
        if (s0 && (cs.borderColor !== s0.borderColor || cs.backgroundColor !== s0.backgroundColor || cs.color !== s0.color)) fails.push(`cell ${fld}: chip ${i} styled differently`);
        if (x.querySelector('svg, img')) fails.push(`cell ${fld}: chip ${i} carries a glyph`);
        if (!x.textContent.trim() || x.scrollWidth > x.clientWidth + 0.6) fails.push(`cell ${fld}: chip ${i} empty/clipped`);
        if (r.right > cr.right + 0.6 || r.left < cr.left - 0.6 || r.top < cr.top - 0.6 || r.bottom > cr.bottom + 0.6) fails.push(`cell ${fld}: chip ${i} leaves the cell`);
        if (r.height < 30) fails.push(`cell ${fld}: chip ${i} ${Math.round(r.height)} px high < 30`);
      });
      const lab = c.querySelector('[data-lcs-label-text]');
      if (!lab || lab.scrollWidth > lab.clientWidth + 0.6) fails.push(`cell ${fld}: label missing/clipped`);
      else { const lr = rect(lab); if (lr.bottom > cr.bottom + 0.6 || lr.top < cr.top - 0.6) fails.push(`cell ${fld}: the label leaves the cell`); if (chips.length && lr.right > rect(chips[0]).left + 0.6) fails.push(`cell ${fld}: the label runs into the chips`); }
    });
    if (same !== fields.length / 2) fails.push(`${same} of ${fields.length} fields are the same (want exactly half)`);
  }
  // the lane: laneSame × lanes[0] + laneDiff × lanes[1] starter rows, each one writing row at the stamped glyphH, inside the lane
  const lanes = ds.lcsLanes.split(',').map(Number);
  const lane = root.querySelector('[data-lcs-cmplane]');
  if (lanes[0] + lanes[1] > 0) {
    if (!lane) fails.push('no compare lane');
    else {
      const rows = [...lane.querySelectorAll('[data-lcs-frame-row]')];
      if (rows.length !== lanes[0] + lanes[1]) fails.push(`${rows.length} lane rows, want ${lanes[0]} + ${lanes[1]}`);
      const kinds = rows.map((r) => r.dataset.lcsFrameField);
      if (kinds.filter((k) => k === 'same').length !== lanes[0] || kinds.filter((k) => k === 'diff').length !== lanes[1]) fails.push(`lane rows ${kinds.join()} ≠ ${lanes[0]} same + ${lanes[1]} diff`);
      const lr = rect(lane);
      let prev = null;
      rows.forEach((r, i) => {
        if (r.querySelectorAll('svg[data-lcs-prim="writing-row"]').length !== 1) fails.push(`lane row ${i + 1}: not one writing row`);
        const st = r.querySelector('[data-lcs-starter]');
        if (!st || !st.textContent.trim() || /[.?!]$/.test(st.textContent.trim())) fails.push(`lane row ${i + 1}: bad starter`);
        const lines = r.querySelectorAll('line');
        if (lines.length >= 3) { const span = +lines[2].getAttribute('y1') - +lines[0].getAttribute('y1'); if (Math.abs(span - (+ds.lcsGlyphH)) > 1) fails.push(`lane row ${i + 1}: rules ${span.toFixed(1)} apart ≠ ${ds.lcsGlyphH}`); }
        const rr = rect(r);
        if (rr.left < lr.left - 0.6 || rr.right > lr.right + 0.6 || rr.top < lr.top - 0.6 || rr.bottom > lr.bottom + 0.6) fails.push(`lane row ${i + 1} leaves the lane`);
        if (prev != null && rr.top < prev - 0.6) fails.push(`lane row ${i + 1} overlaps the row above`);
        prev = rr.bottom;
      });
      if (!lane.querySelector('[data-lcs-caption]')) fails.push('the compare lane has no caption');
    }
  } else if (lane) fails.push('a compare lane without rows');
  // stray text + geometry
  const leaves = [...root.querySelectorAll('span, p, div')].filter((n) => n.children.length === 0 && n.textContent.trim());
  for (const n of leaves) if (!n.matches('[data-lcs-name],[data-lcs-label-text],[data-lcs-printed],[data-lcs-caption],[data-lcs-sd]')) fails.push(`stray text: "${n.textContent.trim().slice(0, 24)}"`);
  const body = document.querySelector('[data-lcs-body]'); const br = rect(body);
  const foot = document.querySelector('.ws-foot'); const ft = foot ? rect(foot).top : Infinity;
  const blocks = [root.querySelector('[data-lcs-files]'), grid, lane].filter(Boolean).map((el) => ({ el, r: rect(el) }));
  for (const b of blocks) {
    if (b.r.left < br.left - 0.6 || b.r.right > br.right + 0.6 || b.r.top < br.top - 0.6 || b.r.bottom > br.bottom + 0.6) fails.push(`${Object.keys(b.el.dataset)[0]} leaves the body column`);
    if (b.r.bottom > ft + 0.6) fails.push(`${Object.keys(b.el.dataset)[0]} reaches ${Math.round(b.r.bottom)} against the footer at ${Math.round(ft)}`);
  }
  for (let i = 1; i < blocks.length; i++) if (blocks[i].r.top < blocks[i - 1].r.bottom + 11) fails.push(`${Object.keys(blocks[i].el.dataset)[0]} sits ${Math.round(blocks[i].r.top - blocks[i - 1].r.bottom)} px under the block above (want 12)`);
  if (files.length === 2 && Math.abs(rect(files[0]).height - rect(files[1]).height) > 1) fails.push('the two files differ in height');
  return fails;
}

/** F6 · mystery: the bank on ONE row, every card's clues leave EXACTLY its stamped answer among the bank profiles, no picture on a card, targets distinct. */
function VERIFY_MYSTERY() {
  const fails = [];
  const root = document.querySelector('[data-ws-content][data-lcs-type="animal-fact-file"]');
  if (!root) return ['no animal-fact-file root'];
  const ds = root.dataset;
  const rect = (el) => el.getBoundingClientRect();
  if (ds.lcsFace !== 'mystery' || ds.lcsMode !== 'mystery') fails.push('mystery: face/mode stamps missing');
  if (root.hasAttribute('data-lcs-unit') || root.hasAttribute('data-lcs-animal')) fails.push('the mystery face carries a unit/animal stamp (the title would name the answer)');
  if ((root.textContent || '').includes('{')) fails.push('a `{` slot is printed');
  const fields = ds.lcsFields.split(',');
  const banner = root.querySelector('[data-lcs-bank-banner]');
  const profiles = {};
  if (!banner) fails.push('no picture bank');
  else {
    const tiles = [...banner.querySelectorAll('[data-lcs-bank]')];
    if (tiles.length !== +ds.lcsBankSize || tiles.length !== +banner.dataset.lcsBankN) fails.push(`${tiles.length} bank tiles (want ${ds.lcsBankSize})`);
    if (banner.clientHeight > 110) fails.push(`the bank is ${banner.clientHeight} px high (> 110: it wrapped to a second row)`);
    if (banner.scrollWidth > banner.clientWidth + 0.6) fails.push('the bank overflows sideways');
    const seen = new Set();
    tiles.forEach((t) => {
      const k = t.dataset.lcsBank;
      if (seen.has(k)) fails.push(`bank animal ${k} repeats`); seen.add(k);
      const im = t.querySelector('img.ws-icon');
      if (!im || !im.complete || im.naturalWidth === 0) fails.push(`bank ${k}: picture missing/broken`);
      else { const r = rect(im); if (r.width < 36 || r.height < 36) fails.push(`bank ${k}: picture ${Math.round(r.width)} < 36`); if (im.dataset.lcsUnit !== k) fails.push(`bank ${k}: picture unit "${im.dataset.lcsUnit}"`); }
      const w = t.querySelector('span');
      if (!w || w.textContent.trim() !== t.dataset.lcsBankWord || !w.textContent.trim()) fails.push(`bank ${k}: name text ≠ stamp`);
      if (t.scrollWidth > t.clientWidth + 0.6) fails.push(`bank ${k}: name clipped`);
      const prof = {};
      (t.dataset.lcsProfile || '').split(';').forEach((kv) => { const [f, v] = kv.split('='); prof[f] = v; });
      if (fields.some((f) => !(f in prof))) fails.push(`bank ${k}: profile lacks a field`);
      profiles[k] = prof;
    });
    // pairwise distinct in >= 1 field
    const ks = Object.keys(profiles);
    for (let i = 0; i < ks.length; i++) for (let j = i + 1; j < ks.length; j++) if (fields.every((f) => profiles[ks[i]][f] === profiles[ks[j]][f])) fails.push(`bank ${ks[i]} and ${ks[j]} share every field (two right answers)`);
  }
  const cards = [...root.querySelectorAll('[data-lcs-riddle]')];
  if (cards.length !== +ds.lcsPuzzles) fails.push(`${cards.length} riddle cards, want ${ds.lcsPuzzles}`);
  const answers = new Set();
  const body = document.querySelector('[data-lcs-body]'); const br = rect(body);
  const foot = document.querySelector('.ws-foot'); const ft = foot ? rect(foot).top : Infinity;
  let prevBottom = banner ? rect(banner).bottom : null;
  cards.forEach((c) => {
    const n = c.dataset.lcsRiddle, ans = c.dataset.lcsAnswer;
    if (answers.has(ans)) fails.push(`card ${n}: answer ${ans} repeats`); answers.add(ans);
    if (!profiles[ans]) fails.push(`card ${n}: answer ${ans} is not in the bank`);
    if (c.querySelector('img')) fails.push(`card ${n}: a picture on a riddle card`);
    const clues = [...c.querySelectorAll('[data-lcs-clue]')];
    if (clues.length !== +ds.lcsClues || clues.length !== +c.dataset.lcsClues) fails.push(`card ${n}: ${clues.length} clues, want ${ds.lcsClues}`);
    const cf = new Set();
    const parsed = clues.map((cl) => { const [f, v] = cl.dataset.lcsClue.split('='); if (cf.has(f)) fails.push(`card ${n}: field ${f} twice`); cf.add(f); if (!cl.textContent.trim() || !/[.?!]$/.test(cl.textContent.trim())) fails.push(`card ${n}: clue "${cl.textContent.trim()}" is not a sentence`); if (cl.scrollWidth > cl.clientWidth + 0.6) fails.push(`card ${n}: clue clipped`); return [f, v]; });
    // the filter: EXACTLY one bank profile survives every clue, and it is the stamped answer
    const survivors = Object.keys(profiles).filter((k) => parsed.every(([f, v]) => profiles[k][f] === v));
    if (survivors.length !== 1 || survivors[0] !== ans) fails.push(`card ${n}: the clues leave [${survivors.join(',')}], stamped answer ${ans}`);
    const nm = c.querySelector('[data-lcs-lane="name"]');
    if (!nm || nm.querySelectorAll('svg[data-lcs-prim="writing-row"]').length !== 1 || nm.querySelector('text')) fails.push(`card ${n}: no empty name lane`);
    else { const lines = nm.querySelectorAll('line'); if (lines.length >= 3) { const span = +lines[2].getAttribute('y1') - +lines[0].getAttribute('y1'); if (Math.abs(span - (+ds.lcsGlyphH)) > 1) fails.push(`card ${n}: name rules ${span.toFixed(1)} ≠ ${ds.lcsGlyphH}`); } }
    const box = c.querySelector('[data-lcs-drawbox]');
    if (!box) fails.push(`card ${n}: no draw box`);
    else { const r = rect(box); if (r.width < 100 || r.height < 100) fails.push(`card ${n}: draw box ${Math.round(r.width)}×${Math.round(r.height)} too small`); if (box.textContent.trim()) fails.push(`card ${n}: the draw box is not empty`); }
    if (!c.querySelector('[data-lcs-prompt]') || !c.querySelector('[data-lcs-prompt]').textContent.trim()) fails.push(`card ${n}: no prompt`);
    // the answer name must not be printed on the card
    const nameText = (banner && banner.querySelector(`[data-lcs-bank="${ans}"]`) || { dataset: {} }).dataset.lcsBankWord;
    if (nameText && new RegExp('(?<!\\p{L})' + nameText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu').test(c.textContent)) fails.push(`card ${n}: prints its answer "${nameText}"`);
    const r = rect(c);
    if (r.left < br.left - 0.6 || r.right > br.right + 0.6 || r.bottom > br.bottom + 0.6) fails.push(`card ${n} leaves the body column`);
    if (r.bottom > ft + 0.6) fails.push(`card ${n} reaches ${Math.round(r.bottom)} against the footer at ${Math.round(ft)}`);
    if (prevBottom != null && r.top < prevBottom + 11) fails.push(`card ${n} sits ${Math.round(r.top - prevBottom)} px under the block above (want 12)`);
    prevBottom = r.bottom;
    [...c.querySelectorAll('*')].forEach((el) => { const er = rect(el); if (er.width && er.height && (er.right > r.right + 0.6 || er.bottom > r.bottom + 0.6 || er.left < r.left - 0.6)) fails.push(`card ${n}: <${el.tagName.toLowerCase()}> leaves the card`); });
  });
  const leaves = [...root.querySelectorAll('span, p, div')].filter((n) => n.children.length === 0 && n.textContent.trim());
  for (const n of leaves) if (!n.matches('[data-lcs-clue],[data-lcs-prompt],[data-lcs-eyebrow]') && !n.closest('[data-lcs-bank]')) fails.push(`stray text: "${n.textContent.trim().slice(0, 24)}"`);
  return fails;
}

function slotsInText(t) { return (String(t).match(/\{([a-z]+)\}/gi) || []).join(''); }
