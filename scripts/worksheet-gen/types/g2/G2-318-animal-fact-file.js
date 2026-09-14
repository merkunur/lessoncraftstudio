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

const { heroFrame, nameBanner, factTable, factLane, drawBox } = C3;

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
const T = tokens.color;
const F = tokens.font;

function literal(bankLoc, pathStr, loc) {
  const v = pathStr.split('.').reduce((o, k) => (o == null ? undefined : o[k]), bankLoc);
  if (typeof v !== 'string' || !v.trim()) throw new Error(`G2-318: ${loc} has no literal ${pathStr} (refuse, never pad)`);
  if (v.includes('{')) throw new Error(`G2-318: ${loc} ${pathStr} carries a slot "${v}" (whole literals only)`);
  return v;
}
function upperFirst(s, loc) { const cs = [...s]; return cs.length ? cs[0].toLocaleUpperCase(loc) + cs.slice(1).join('') : s; }

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

  /** The whole build over an INJECTED bank + table + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, table, d, { theme, locale, unit }) {
    const loc = (locale || 'en').slice(0, 2);
    if (!d) throw new Error('G2-318: no difficulty config');
    if (!bankLoc || !bankLoc.labels || !bankLoc.animals) throw new Error(`G2-318: ${loc} bank has no labels/animals block (refuse)`);
    if (!table || !table.animals || !table.exemplars || !Array.isArray(table.fields)) throw new Error('G2-318: animal-facts table is malformed');
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
    // ---- the rows
    const rows = d.fields.map((f) => ({
      key: f,
      label: literal(bankLoc, 'labels.' + f, loc),
      lane: 'write',
      fact: animal && animal[f] !== null && animal[f] !== undefined ? animal[f] : null,
    }));
    for (const r of rows) if ([...r.label].length > 28) throw new Error(`G2-318: ${loc} label "${r.label}" > 28 chars`);
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
    if (d.drawH) {
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
      `data-lcs-glyph-h="${d.glyphH}"`, `data-lcs-label-px="${d.labelPx}"`, `data-lcs-draw="${d.drawH ? 1 : 0}"`, `data-lcs-lane="${d.lane ? 1 : 0}"`,
      `data-lcs-special="${d.special ? d.special.rows : 0}"`, `data-lcs-blank="${blank ? 1 : 0}"`,
    ].join(' ');
    const bodyHtml = `<div ${stamps} style="flex:1;display:flex;flex-direction:column;gap:${GAP}px;min-height:0">${top}${tableHtml}${laneHtml}</div>`;
    return { bodyHtml, meta: { animal: key, unit: unit || null, exemplar: !unit, theme, fields: d.fields.slice(), starter, caption, pic: d.pic } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="animal-fact-file"]');
      if (!root) return ['no animal-fact-file root'];
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
      if (root.hasAttribute('data-lcs-face')) fails.push('data-lcs-face is stamped on the base');
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
      // 4. the fact table: the stamped fields in order, a label <= 2 lines unclipped, one EMPTY writing row per row, stamps only where allowed
      const table = root.querySelector('[data-lcs-table]');
      if (!table) fails.push('no fact table');
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
          const stamps = [...r.attributes].map((a) => a.name).filter((n) => n.startsWith('data-lcs-fact-'));
          if (stamps.length > 1) fails.push(`row ${f}: ${stamps.length} fact stamps`);
          if (stamps.length === 1 && stamps[0] !== 'data-lcs-fact-' + f) fails.push(`row ${f}: stamp ${stamps[0]} names another field`);
          if (blank && stamps.length) fails.push(`row ${f}: a fact stamp on the blank unit`);
          for (const s of stamps) { const v = r.getAttribute(s); if (!v || v === 'null' || v === 'undefined') fails.push(`row ${f}: stamp ${s}="${v}"`); }
        });
      }
      // 5. the draw box / the special block / the fact lane, exactly as stamped
      const boxes = [...root.querySelectorAll('[data-lcs-drawbox]')].filter((b) => b.dataset.lcsDrawbox !== 'hero');
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
        const okNode = n.matches('[data-lcs-name],[data-lcs-label-text],[data-lcs-label-key],[data-lcs-starter],[data-lcs-caption],[data-lcs-eyebrow]');
        if (!okNode) fails.push(`stray text: "${n.textContent.trim().slice(0, 24)}"`);
      }
      // 7. geometry: the top row aligned, everything inside the body column and above the footer, no overlap between the three blocks
      const br = rect(body);
      const foot = document.querySelector('.ws-foot');
      const ft = foot ? rect(foot).top : Infinity;
      const blocks = [root.querySelector('[data-lcs-top]'), table, lane].filter(Boolean).map((el) => ({ el, r: rect(el) }));
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
    });
  },
};
