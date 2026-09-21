/**
 * components-b4/weather-symbols.js — the K-356 `weather-symbols` family
 * components (design: docs/worksheet-gen/b4-designs/K-356-weather.md §2
 * "NEW templates/components-b4/weather.js"; the family KEY is
 * `weather-symbols`, ruled at Phase 0 because the theme axis owns `weather`).
 * Merged into the templates/components-b4.js namespace; every name is
 * type-scoped (`symbol…` / `spellRow` / `diaryWeek` / `band…` / `forecast…` /
 * `cycleLabels`) so no sibling family can collide.
 *
 * The visual signature this family owns: ROUND WHITE SYMBOL BADGES (r 999,
 * teal 3) holding the six fixed weather pictures on every face (K-322 uses
 * square cream tiles, K-225 bare icons). Nothing here ever prints an answer:
 * the mapping lives in `data-lcs-concept` stamps on badges AND tiles (never
 * text, never order); the only words a surface prints are the locale's
 * weather NOUNS (whole panel literals), the cycle stage words, the forecast
 * questions and the GIVEN day names from data/b2/calendar.js.
 *
 * Exports (the base consumes the first two; the seven face components are
 * shipped per §2 and render nothing until Phase 2):
 *   SYMBOL_KEYS  ['sun','cloud','rain','storm','snow','rainbow'] — the fixed
 *                concept set (the global json + the data module carry the
 *                same list; the gate asserts the copies agree)
 *   symbolBadge({concept, src, d = 96, iconPx = 72, dot})
 *                a `.ws-match-item--plain` forced round by inline
 *                `border-radius:999px; border:3px solid teal; width:d;
 *                height:d`, holding ONE `.ws-icon` iconPx centred; `dot` =
 *                'right' | 'left' | null adds the coral `.ws-match-dot`.
 *                Stamps data-lcs-badge data-lcs-concept="<key>"; no text.
 *   symbolMatch({left, right, badge = 96, iconPx = 72, tileW = 250, tileH = 84, wordPx = 24, stamps})
 *                THE BASE: `.ws-match` two columns (page.css :354-391;
 *                padding 6 30 -> inner 615). Left column (100 wide): `left`
 *                = [{concept, src}] as symbolBadges with the dot on the right
 *                edge. Right column: `right` = [{concept|null, word, distractor?}]
 *                as cream `.ws-match-item` tiles tileW x tileH with the word
 *                (Baloo 2 700 wordPx ink, nowrap) and the dot on the left
 *                edge; a distractor tile stamps data-lcs-distractor="1" and
 *                NO concept. Widths 100 + 250 + 2 x 26 = 402 of 615 -> 213 px
 *                of clear line run. Stamps data-ws-content +
 *                data-lcs-weather-symbols + data-lcs-layout="base" +
 *                data-lcs-pairs / -distractors / -icon-px / -word-px (+
 *                `stamps`) on the root; tiles data-lcs-tile data-lcs-word
 *                data-lcs-concept.
 *   spellBox({words, room, boxMin = 44, boxMax = 60, gap = 4, hyphenW = 30})
 *                F1: the letter-box size for a LOCALE: the largest box in
 *                boxMin..boxMax at which every bank word (letters + printed
 *                hyphens) fits `room` (the lane inner minus badge + gap); null
 *                when even boxMin does not fit (refuse). en (7 letters) -> 60,
 *                fi `sateenkaari` (11) -> 46, fr `arc-en-ciel` -> 51.
 *   spellRow({concept, src, word, box = 44, gap = 4, badge = 72, iconPx = 56, lanePad = 6})
 *                F1: a `.ws-lane` card (padding lanePad 16; 88 px min at badge
 *                72) that OWNS its band: [badge][12][letter boxes per hyphen-separated GROUP
 *                joined by a printed hyphen glyph Baloo 2 700 22 ink, 14
 *                wide, 8 px each side]. Boxes = components-b2 letterBoxes
 *                ({n, box, gap}); the word is NEVER printed. Stamps
 *                data-lcs-spell="<concept>" data-lcs-len (letters, hyphens
 *                excluded) data-lcs-groups="3-2-4".
 *   diaryWeek({days:[{index, name}], key:[{concept, src}], cellW = 160, minRow = 326, legendPx = 56, box = 'rect'})
 *                F2: a 2 x 4 grid (gap 11 x 12; rows minmax(minRow,1fr)) of
 *                seven day cells + the KEY card in cell 8. Day cell = a
 *                `.ws-card`-styled cream box: a teal-bordered white name pill
 *                (Baloo 2 700 18 nowrap, data-lcs-day="<0-6>") 34 high, gap
 *                8, a drawBox({w:136}) FLEXING (`flex:1 1 200px;
 *                min-height:200px`) or a 96 px dashed coral circle
 *                (box:'circle'). Key card = white, teal 3, r 16, six plain
 *                legendPx icons 2 cols x 3 rows (gap 12), data-lcs-key, each
 *                icon data-lcs-symbol="<concept>", no words.
 *   bandKey({bands:[{key, value, src}], thermH = 120, iconPx = 56, therm})
 *                F3 key row: `.ws-lane` 675 wide (inner 120 at thermH 120),
 *                three cells [thermometer h thermH][8][icon iconPx]
 *                `justify-content:space-evenly`; data-lcs-key, cells
 *                data-lcs-key-band="<key>" with the primitive's
 *                data-lcs-value. `therm(value, h)` = the caller's bound
 *                primitives/thermometer.js call (bands + numerals:false).
 *   bandThermo({n, value, chips:[{key, src, correct}], thermH = 220, chip = 64, iconPx = 56, therm, chipsBelow = false})
 *                F3 item card inner: [thermometer 110 x thermH][12][chip
 *                column 3 x chip + 2 x 8] centred (chipsBelow: a row of
 *                three under the thermometer). Chips = white r 12 boxes
 *                chip x chip with an iconPx picture; the correct one stamps
 *                data-lcs-correct="1" (never a visual). Stamps
 *                data-lcs-thermo data-lcs-n data-lcs-value; chips
 *                data-lcs-chip="<key>".
 *   forecastStrip({days:[{index, name, concept, src}], iconPx = 88, cellW = 123, gap = 15})
 *                F5: 675 x ~150 white strip, teal 3, r 16; five cells [name
 *                pill Baloo 2 700 18][icon iconPx]; data-lcs-strip; cells
 *                data-lcs-fday="<index>" data-lcs-concept.
 *   forecastQuestion({n, text, chips:[{index, label, correct}], askBy = 'word', src, iconPx = 64, chipH = 44, chipPx = 16})
 *                F5: a `.ws-lane` (inner 639): [question Nunito 800 18 one
 *                line (askBy 'word') OR a 64 px symbol badge (askBy
 *                'symbol')][8][five `.ws-pill` day chips Baloo 2 700 chipPx,
 *                inline padding 6 10, min-width 44, min-height chipH, gap 8,
 *                data-lcs-dchip="<index>", the right one data-lcs-correct="1"].
 *                Stamps data-lcs-q data-lcs-n data-lcs-concept.
 *   cycleLabels({lanes:[{n, anchor, given}], laneW = 270, laneH = 52, glyphH = 26, perRow = 2, gap = 15})
 *                F4: rows of [`.ws-chip` 44 (numeral n, Baloo 2 700 24)][10]
 *                [`.ws-blankbox` holding writingRow({w:laneW, h:laneH,
 *                glyphH, xHeight:true})] (330 wide; 2 per row + 15 = 675);
 *                a `given` lane prints its literal in a cream tile (Nunito 800
 *                20) instead of the empty row. Stamps data-lcs-label
 *                data-lcs-n data-lcs-anchor (+ data-lcs-given="1").
 *
 * Palette: cream / creamDeep / white / teal / tealSoft / coral / coralSoft /
 * ink / inkSoft tokens + the page.css tile border `#F0E4CB`. All CSS inline
 * (no page.css edit); qa/lints.js rejects off-palette SVG hex.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { letterBoxes } = require('../components-b2.js');
const { drawBox } = require('../components-b3.js');

const T = tokens.color;
const F = tokens.font;
/** The page.css `.ws-match-item` border tint (page.css :370). */
const TILE_BORDER = '#F0E4CB';
const SYMBOL_KEYS = Object.freeze(['sun', 'cloud', 'rain', 'storm', 'snow', 'rainbow']);

const stampAttrs = (stamps) => Object.entries(stamps || {}).map(([k, v]) => ` data-lcs-${k}="${esc(v)}"`).join('');
const icon = (src, px) => `<img class="ws-icon" src="${src}" alt="" style="width:${px}px;height:${px}px">`;
const dotOf = (side) => side === 'right' ? `<span class="ws-match-dot ws-match-dot--right"></span>` : side === 'left' ? `<span class="ws-match-dot ws-match-dot--left"></span>` : '';

/* ---------------------------------------------------------------- badge */
function symbolBadge({ concept, src, d = 96, iconPx = 72, dot = null }) {
  if (!SYMBOL_KEYS.includes(concept)) throw new Error(`symbolBadge: concept "${concept}" is not one of ${SYMBOL_KEYS.join(' ')}`);
  if (!src) throw new Error('symbolBadge: no src');
  if (!(iconPx <= d - 12)) throw new Error(`symbolBadge: icon ${iconPx} does not fit the ${d} badge`);
  return `<div class="ws-match-item ws-match-item--plain" data-lcs-badge data-lcs-concept="${esc(concept)}" ` +
    `style="width:${d}px;height:${d}px;border-radius:999px;border:3px solid ${T.teal};flex:0 0 auto">` +
    icon(src, iconPx) + dotOf(dot) + `</div>`;
}

/* ---------------------------------------------------------------- base */
function symbolMatch({ left, right, badge = 96, iconPx = 72, tileW = 250, tileH = 84, wordPx = 24, stamps }) {
  if (!Array.isArray(left) || !left.length) throw new Error('symbolMatch: no badges');
  if (!Array.isArray(right) || !right.length) throw new Error('symbolMatch: no tiles');
  const badges = left.map((b) => symbolBadge({ concept: b.concept, src: b.src, d: badge, iconPx, dot: 'right' })).join('');
  const tiles = right.map((t) => {
    if (typeof t.word !== 'string' || !t.word.trim()) throw new Error('symbolMatch: a tile without a word');
    const concept = t.distractor ? '' : t.concept;
    if (!t.distractor && !SYMBOL_KEYS.includes(concept)) throw new Error(`symbolMatch: tile concept "${concept}"`);
    return `<div class="ws-match-item" data-lcs-tile data-lcs-word="${esc(t.word)}"${t.distractor ? ' data-lcs-distractor="1"' : ` data-lcs-concept="${esc(concept)}"`} ` +
      `style="width:${tileW}px;height:${tileH}px;flex:0 0 auto">` +
      `<span style="font-family:${F.display},cursive;font-weight:700;font-size:${wordPx}px;line-height:1.1;color:${T.ink};white-space:nowrap">${esc(t.word)}</span>` +
      dotOf('left') + `</div>`;
  }).join('');
  const distractors = right.filter((t) => t.distractor).length;
  return `<div class="ws-match" data-ws-content data-lcs-weather-symbols data-lcs-layout="base" data-lcs-pairs="${left.length}" data-lcs-distractors="${distractors}" ` +
    `data-lcs-badge-px="${badge}" data-lcs-icon-px="${iconPx}" data-lcs-word-px="${wordPx}"${stampAttrs(stamps)}>` +
    `<div class="ws-match-col" data-lcs-col="symbols" style="width:${Math.max(badge, 100)}px;align-items:center">${badges}</div>` +
    `<div class="ws-match-col" data-lcs-col="words" style="width:${tileW}px">${tiles}</div>` +
    `</div>`;
}

/* ---------------------------------------------------------------- F1 write */
/** The letter-box size for a locale: the widest bank word (letters + printed hyphens) must fit `room` at the largest box in boxMin..boxMax; a word that does not fit at boxMin returns null (refuse). */
function spellBox({ words, room, boxMin = 44, boxMax = 60, gap = 4, hyphenW = 30 }) {
  let box = boxMax;
  for (const w of words) {
    const groups = String(w).split('-');
    const n = groups.reduce((a, g) => a + [...g].length, 0);
    const fixed = (groups.length - 1) * hyphenW + (n - 1) * gap + 2;
    const fit = Math.floor((room - fixed) / n);
    box = Math.min(box, fit);
  }
  return box >= boxMin ? box : null;
}
function spellRow({ concept, src, word, box = 44, gap = 4, badge = 72, iconPx = 56, lanePad = 6 }) {
  if (typeof word !== 'string' || !word.trim()) throw new Error('spellRow: no word');
  const groups = word.split('-');
  if (groups.some((g) => ![...g].length)) throw new Error(`spellRow: "${word}" has an empty hyphen group`);
  const len = groups.reduce((n, g) => n + [...g].length, 0);
  const hyphen = `<span style="display:inline-flex;align-items:center;justify-content:center;width:14px;margin:0 8px;font-family:${F.display},cursive;font-weight:700;font-size:22px;color:${T.ink}" data-lcs-hyphen>-</span>`;
  const boxes = groups.map((g) => `<span style="display:inline-block;line-height:0">${letterBoxes({ n: [...g].length, box, gap })}</span>`).join(hyphen);
  return `<div class="ws-lane" data-lcs-spell="${esc(concept)}" data-lcs-len="${len}" data-lcs-groups="${groups.map((g) => [...g].length).join('-')}" data-lcs-box="${box}" ` +
    `style="display:flex;align-items:center;gap:12px;padding:${lanePad}px 16px;min-height:0">` +
    symbolBadge({ concept, src, d: badge, iconPx }) +
    `<span style="display:inline-flex;align-items:center">${boxes}</span></div>`;
}

/* ---------------------------------------------------------------- F2 diary */
function diaryWeek({ days, key, cellW = 160, minRow = 326, legendPx = 56, box = 'rect', gapX = 11, gapY = 12, stamps }) {
  if (!Array.isArray(days) || days.length !== 7) throw new Error('diaryWeek: needs 7 days');
  if (!Array.isArray(key) || !key.length) throw new Error('diaryWeek: needs a key');
  const cells = days.map((d) =>
    `<div data-lcs-day="${d.index}" style="display:flex;flex-direction:column;align-items:center;gap:8px;background:${T.cream};border:2px solid ${TILE_BORDER};border-radius:14px;padding:10px 10px 12px;min-height:0">` +
    `<span style="display:inline-flex;align-items:center;justify-content:center;height:34px;padding:0 12px;background:${T.white};border:2px solid ${T.teal};border-radius:999px;font-family:${F.display},cursive;font-weight:700;font-size:18px;color:${T.ink};white-space:nowrap" data-lcs-day-name>${esc(d.name)}</span>` +
    (box === 'circle'
      ? `<span data-lcs-drawbox data-lcs-shape="circle" style="display:block;width:96px;height:96px;margin-top:auto;margin-bottom:auto;background:${T.white};border:2.5px dashed ${T.coral};border-radius:50%"></span>`
      : `<span data-lcs-drawbox style="display:block;width:136px;flex:1 1 200px;min-height:200px;background:${T.white};border:2.5px dashed ${T.coral};border-radius:12px"></span>`) +
    `</div>`).join('');
  const legend = `<div data-lcs-key style="display:flex;align-items:center;justify-content:center;background:${T.white};border:3px solid ${T.teal};border-radius:16px;min-height:0">` +
    `<div style="display:grid;grid-template-columns:repeat(2,${legendPx}px);gap:12px">` +
    key.map((k) => `<span data-lcs-symbol="${esc(k.concept)}" style="display:inline-flex;width:${legendPx}px;height:${legendPx}px;align-items:center;justify-content:center">${icon(k.src, legendPx)}</span>`).join('') +
    `</div></div>`;
  return `<div class="ws-diary" data-ws-content data-lcs-weather-symbols data-lcs-layout="diary" data-lcs-days="7" data-lcs-box="${esc(box)}"${stampAttrs(stamps)} ` +
    `style="flex:1 1 auto;display:grid;grid-template-columns:repeat(4,${cellW}px);grid-template-rows:repeat(2,minmax(${minRow}px,1fr));gap:${gapY}px ${gapX}px;justify-content:center;min-height:0">` +
    cells + legend + `</div>`;
}

/* ---------------------------------------------------------------- F3 thermometer */
function bandKey({ bands, thermH = 120, iconPx = 56, therm }) {
  if (typeof therm !== 'function') throw new Error('bandKey: therm(value, h) is required');
  if (!Array.isArray(bands) || bands.length < 2) throw new Error('bandKey: needs >= 2 bands');
  const cells = bands.map((b) =>
    `<span data-lcs-key-band="${esc(b.key)}" style="display:inline-flex;align-items:center;gap:8px">` +
    therm(b.value, thermH).svg + icon(b.src, iconPx) + `</span>`).join('');
  return `<div class="ws-lane" data-lcs-key style="display:flex;justify-content:space-evenly;align-items:center;padding:12px 16px">${cells}</div>`;
}
function bandThermo({ n, value, band, chips, thermH = 220, chip = 64, iconPx = 56, therm, chipsBelow = false }) {
  if (typeof therm !== 'function') throw new Error('bandThermo: therm(value, h) is required');
  if (!Array.isArray(chips) || chips.length < 2) throw new Error('bandThermo: needs >= 2 chips');
  if (chips.filter((c) => c.correct).length !== 1) throw new Error('bandThermo: exactly one chip is correct');
  const chipHtml = chips.map((c) =>
    `<span data-lcs-chip="${esc(c.key)}"${c.correct ? ' data-lcs-correct="1"' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:${chip}px;height:${chip}px;background:${T.white};border:2px solid ${T.creamDeep};border-radius:12px">${icon(c.src, iconPx)}</span>`).join('');
  const column = `<span style="display:${chipsBelow ? 'inline-flex' : 'inline-flex'};flex-direction:${chipsBelow ? 'row' : 'column'};gap:8px">${chipHtml}</span>`;
  return `<div class="ws-card-stage" data-lcs-thermo data-lcs-n="${n}" data-lcs-value="${value}"${band ? ` data-lcs-band-of="${esc(band)}"` : ''} style="display:flex;flex-direction:${chipsBelow ? 'column' : 'row'};align-items:center;justify-content:center;gap:${chipsBelow ? 8 : 12}px;padding:0 4px">` +
    `<span data-lcs-thermo-box style="display:inline-block;line-height:0">${therm(value, thermH).svg}</span>` + column + `</div>`;
}

/* ---------------------------------------------------------------- F5 forecast */
function forecastStrip({ days, iconPx = 88, cellW = 123, gap = 15 }) {
  if (!Array.isArray(days) || days.length !== 5) throw new Error('forecastStrip: needs 5 days');
  const cells = days.map((d) =>
    `<span data-lcs-fday="${d.index}" data-lcs-concept="${esc(d.concept)}" style="display:inline-flex;flex-direction:column;align-items:center;gap:8px;width:${cellW}px">` +
    `<span data-lcs-fday-name style="display:inline-flex;align-items:center;justify-content:center;height:32px;padding:0 10px;background:${T.cream};border:2px solid ${T.teal};border-radius:999px;font-family:${F.display},cursive;font-weight:700;font-size:18px;color:${T.ink};white-space:nowrap">${esc(d.name)}</span>` +
    icon(d.src, iconPx) + `</span>`).join('');
  return `<div data-lcs-strip style="display:flex;justify-content:center;gap:${gap}px;padding:10px 0 8px;background:${T.white};border:3px solid ${T.teal};border-radius:16px">${cells}</div>`;
}
function forecastQuestion({ n, text, chips, askBy = 'word', src, concept, iconPx = 64, chipH = 44, chipMax = 64, chipPx = 16 }) {
  if (!(chipMax >= chipH)) throw new Error(`forecastQuestion: chipMax ${chipMax} < chipH ${chipH}`);
  if (!Array.isArray(chips) || chips.length !== 5) throw new Error('forecastQuestion: needs 5 day chips');
  if (chips.filter((c) => c.correct).length !== 1) throw new Error('forecastQuestion: exactly one chip is correct');
  const ask = askBy === 'symbol'
    ? symbolBadge({ concept, src, d: iconPx, iconPx: iconPx - 16 })
    : `<span data-lcs-q-text style="font-family:${F.body},sans-serif;font-weight:800;font-size:18px;line-height:26px;color:${T.ink};white-space:nowrap">${esc(text)}</span>`;
  const pills = chips.map((c) =>
    `<span class="ws-pill" data-lcs-dchip="${c.index}"${c.correct ? ' data-lcs-correct="1"' : ''} style="font-size:${chipPx}px;padding:6px 10px;min-width:44px;min-height:${chipH}px;align-self:stretch;white-space:nowrap">${esc(c.label)}</span>`).join('');
  // a GRID lane: the ask row is auto, the pill track grows from chipH to chipMax with the lane (a short chrome gives
  // taller pills to ring, never a blank band); align-content centres the two rows in the lane
  return `<div class="ws-lane" data-lcs-q data-lcs-n="${n}" data-lcs-concept="${esc(concept)}" data-lcs-ask-by="${esc(askBy)}" style="display:grid;grid-template-rows:auto minmax(${chipH}px,${chipMax}px);align-content:center;gap:8px;min-height:0">` +
    `<span style="display:flex;align-items:center">${ask}</span>` + `<span data-lcs-dchips style="display:flex;gap:8px;flex-wrap:nowrap;align-items:stretch">${pills}</span></div>`;
}

/* ---------------------------------------------------------------- F4 water cycle */
function cycleLabels({ lanes, laneW = 270, laneH = 52, glyphH = 26, perRow = 2, gap = 15 }) {
  if (!Array.isArray(lanes) || !lanes.length) throw new Error('cycleLabels: no lanes');
  const row = writingRow({ w: laneW, h: laneH, glyphH, xHeight: true }).svg;
  const items = lanes.map((l) =>
    `<div data-lcs-label data-lcs-n="${l.n}" data-lcs-anchor="${esc(l.anchor)}"${l.given ? ' data-lcs-given="1"' : ''} style="display:flex;align-items:center;gap:10px">` +
    `<span class="ws-chip" style="width:44px;height:44px;font-family:${F.display},cursive;font-weight:700;font-size:24px;color:${T.ink}">${l.n}</span>` +
    (l.given
      ? `<span style="display:inline-flex;align-items:center;width:${laneW}px;height:${laneH}px;padding:0 14px;box-sizing:border-box;background:${T.cream};border:2px solid ${TILE_BORDER};border-radius:10px;font-family:${F.body},sans-serif;font-weight:800;font-size:20px;color:${T.ink}">${esc(l.given)}</span>`
      : `<span class="ws-blankbox" style="width:${laneW}px;height:${laneH}px;line-height:0">${row}</span>`) +
    `</div>`);
  const rows = [];
  for (let i = 0; i < items.length; i += perRow) rows.push(`<div style="display:flex;justify-content:center;gap:${gap}px">${items.slice(i, i + perRow).join('')}</div>`);
  return `<div data-lcs-labels style="display:flex;flex-direction:column;gap:8px">${rows.join('')}</div>`;
}

module.exports = { SYMBOL_KEYS, symbolBadge, symbolMatch, spellBox, spellRow, diaryWeek, bandKey, bandThermo, forecastStrip, forecastQuestion, cycleLabels };
