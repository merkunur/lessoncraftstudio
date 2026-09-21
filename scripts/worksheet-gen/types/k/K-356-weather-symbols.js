/**
 * K-356 — Weather Symbols: Draw a Line (nt10-D; family key `weather-symbols`
 * — ruled at Phase 0 because the THEME axis owns `weather`; the design file
 * docs/worksheet-gen/b4-designs/K-356-weather.md says `weather` and is read as
 * `weather-symbols` throughout; K; science; readiness — no CCSS code). Built
 * from §2 base + §5 data + gates under _BUILD-BRIEF.md + the README
 * cross-type rulings; every ruling in _work/K-356-critic.md.
 *
 * Six ROUND WHITE weather badges down the left (r 999, teal 3; the six fixed
 * concept pictures weather/{sunny, cloudy, rainy, thunderstorm, snowflake,
 * rainbow}, every one OPENED), six cream word signs down the right in a
 * DERANGED order (the locale's weather NOUNS from the bank, whole panel
 * literals, never the vocab adjectives Sonnig / Soligt / Aurinkoinen), one
 * straight pencil line per pair across a 213 px clear run. The morning-chart
 * symbols a K class reads off the wall, each tied to its word. Nothing else
 * is printed.
 *
 * FIXED THEME: `withFixedTheme(type, 'weather')` (types/_shared/fixed-theme.js:
 * themeAxis.applicable false, fixedTheme 'weather'; landings carry
 * coordinate.theme ''). The pictures are named per concept in the GLOBAL
 * data/b4/weather-symbols-global.json and resolved by `fileUri` (never drawn
 * from a pool, never `pictureFor`); the locale bank data/b4/weather-symbols.js
 * (via lib/b4-common.js `bank('weather-symbols', loc)`) carries ONLY the
 * literals a locale prints; an unauthored locale REFUSES (never en). No
 * `unitAxis` (RULED: no numeral and no unit reaches any page of this type).
 * Nothing is read from image-vocabulary.js / objForms / approved-words at
 * render; the vocab-based bans (adjective, Regentropfen) run in the gate.
 *
 * Boundary (load-bearing): the WEATHER SYMBOL SET paired with the locale's
 * weather NOUNS. NOT K-211 hot-and-cold (nothing sorted; `hot` / `cold`
 * pictures OUT), NOT K-207 clothes (no gear picture or word on this base —
 * gear appears on F3 only), NOT K-225 word-to-picture (any theme, bare icons;
 * this is a fixed six-symbol chart on round badges), NOT K-322 seasons
 * (square cream tiles; no season word here), NOT G3-345 (no numeral).
 *
 * Why not `science-pair-match` (design §2 NOT used): d 4/5/5 pairs of square
 * items at a fixed 720 stack; this base is its own `symbolMatch` on the same
 * `.ws-match` classes, budgeted at 722 AND 677: 6 x 96 + 5 x 12 + 12 = 624.
 *
 * Difficulty is a CONFIG; every guard keys on the resolved config, never on
 * the level index:
 *   pairs        badges (d1 = 4 fixed keys sun rain snow cloud; d2 / d3 = 6)
 *   keys         d1 only: the fixed four; else all six
 *   distractors  d3: word tiles with NO badge (bank `distractors`, symbol-less
 *                weather words; NEVER a gear word); 0 at d1 / d2
 *   badge / iconPx   the round badge / its picture (K floor 56)
 *   tileH / wordPx   the word tile height / Baloo 2 700 size (K label floor 18)
 * Stack = the taller column (badges: pairs x badge + gaps; tiles: (pairs +
 * distractors) x tileH + gaps) + 12, must fit 677 (the fi four-line-title
 * body): d1 496 · d2 624 · d3 672 (8 tiles x 72 vs 6 badges x 84 = 564).
 * Refusal (throw, never a filler): an unauthored locale, a missing / empty /
 * multi-token symbol word, two concepts with one word, a d3 without two
 * distractors, a stack over 677, no derangement in 400 tries.
 *
 * PHASE 2 (the faces, 2026-09-21, _work/K-356-faces.md) ride ONE additive
 * `layout` knob (design §3; the K-322 / K-355 shape): `d.layout` undefined =
 * this base path, byte-identical; 'write' | 'diary' | 'thermometer' |
 * 'water-cycle' | 'forecast' dispatch to `_buildFace` (rows in
 * tools/b4var-rows/weather-symbols.js: G1-362 · K-364 · K-365 · G3-385 ·
 * G1-363). The landing `coordinate.mode` is the face's mode string (base =
 * 'base').
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const { withFixedTheme } = require('../_shared/fixed-theme.js');
const C4 = require('../../templates/components-b4.js');
const { wordBank } = require('../../templates/components-b2.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const thermometer = require('../../primitives/thermometer.js');
const { waterCycle, MIN_W: WC_MIN_W } = require('../../primitives/water-cycle.js');
const { NAMES } = require('../../data/b2/calendar.js');
const GLOBAL = require('../../data/b4/weather-symbols-global.json');

const BANK = 'weather-symbols';
const THEME = 'weather';
const KEYS = ['sun', 'cloud', 'rain', 'storm', 'snow', 'rainbow'];
const D1_KEYS = ['sun', 'rain', 'snow', 'cloud'];
const FACES = ['write', 'diary', 'thermometer', 'water-cycle', 'forecast'];
const CYCLE_KEYS = ['evaporation', 'condensation', 'precipitation', 'collection'];
const PAGE_INNER = 675;          // the .ws-page inner width (README chrome ruling)
const WRITE_LANE_INNER = 639;    // a .ws-lane at padding 16: 675 - 32 - 4 (README: the .ws-lane inner)
const STACK_CEILING = 677;     // the fi four-line-title body (README ruling)
const TRIES = 400;
const WORD_RE = /^[\p{L}][\p{L}'’-]*$/u;   // single token or hyphenated (design §5 rule 4)

const type = {
  id: 'K-356',
  slug: 'weather-symbols',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'weather-symbols',
  themeAxis: { applicable: false },
  difficulty: {
    1: { pairs: 4, keys: D1_KEYS, distractors: 0, badge: 112, iconPx: 88, tileH: 112, wordPx: 26 },
    2: { pairs: 6, keys: KEYS, distractors: 0, badge: 96, iconPx: 72, tileH: 84, wordPx: 24 },
    3: { pairs: 6, keys: KEYS, distractors: 2, badge: 84, iconPx: 64, tileH: 72, wordPx: 22 },
  },
  i18n: {
    en: {
      title: 'Weather Symbols',
      instruction: 'Draw a line from each weather symbol to its word.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith({ global: GLOBAL, block: loadBank(BANK, loc) }, { theme, difficulty, locale: loc }, ctx);
  },

  /* ------------------------------------------------------------ bank helpers (the gate's node cross-checks read these too) */
  /** The symbol picture {theme, noun} of a concept from the global file; unknown THROWS. */
  _symbol(global, key) {
    const s = (global.symbols || []).find((x) => x.key === key);
    if (!s) throw new Error(`K-356: no symbol for concept "${key}"`);
    return s;
  },
  /** The weather NOUN literal of a concept for a locale block; missing / multi-token THROWS (never en, never the vocab). */
  _word(block, loc, key) {
    const w = block && block.symbolWords && block.symbolWords[key];
    if (typeof w !== 'string' || !w.trim()) throw new Error(`K-356 ${loc}: no symbol word for ${key} (refuse)`);
    if (!WORD_RE.test(w)) throw new Error(`K-356 ${loc}: symbol word "${w}" for ${key} is not a single token or hyphenated (refuse)`);
    return w;
  },
  /** The d3 distractor literals (symbol-less weather words); fewer than `n` THROWS. */
  _distractors(block, loc, n) {
    const list = Array.isArray(block && block.distractors) ? block.distractors : [];
    const good = list.filter((w) => typeof w === 'string' && WORD_RE.test(w));
    if (good.length < n) throw new Error(`K-356 ${loc}: ${good.length} distractor words < ${n} (refuse)`);
    return good.slice(0, n);
  },

  /** The whole build over an INJECTED bank {global, block} (the gate's poison seam). */
  _buildWith(bankData, { theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-356: no difficulty ' + difficulty);
    const loc = (locale || 'en').slice(0, 2);
    if (d.layout) return this._buildFace(bankData, d, loc, ctx);      // Phase 2 faces; the base path below is untouched
    const rng = ctx.rng;
    const { global, block } = bankData;
    if (theme !== THEME) throw new Error(`K-356: theme "${theme}" — the type is fixed to "${THEME}" (withFixedTheme)`);
    if (!global || !Array.isArray(global.symbols)) throw new Error('K-356: the global bank has no symbols');
    if (!block) throw new Error(`K-356 ${loc}: no locale block (refuse)`);
    if (Array.isArray(block.refuse) && block.refuse.includes('base')) throw new Error(`K-356 ${loc}: the base is refused by the ${loc} panel (refuse)`);
    // guards on the RESOLVED config
    if (!Array.isArray(d.keys) || d.keys.length !== d.pairs || d.keys.some((k) => !KEYS.includes(k)) || new Set(d.keys).size !== d.keys.length) throw new Error(`K-356: keys ${JSON.stringify(d.keys)} ≠ ${d.pairs} distinct concepts of ${KEYS.join(' ')}`);
    if (!(d.pairs >= 4 && d.pairs <= 6)) throw new Error(`K-356: pairs ${d.pairs} outside 4..6 (six symbols; K items [4, 8])`);
    if (!(d.pairs + d.distractors <= 8)) throw new Error(`K-356: ${d.pairs} + ${d.distractors} tiles > the K ceiling 8`);
    if (!(d.iconPx >= 56)) throw new Error(`K-356: iconPx ${d.iconPx} < the K floor 56`);
    if (!(d.badge >= 56 && d.iconPx <= d.badge - 12)) throw new Error(`K-356: badge ${d.badge} / icon ${d.iconPx}`);
    if (!(d.wordPx >= 18)) throw new Error(`K-356: wordPx ${d.wordPx} < the K label floor 18`);
    const rows = d.pairs + d.distractors;
    // the two columns stack independently (space-around absorbs the slack); the taller one is the stack
    const stack = Math.max(d.pairs * d.badge + (d.pairs - 1) * 12, rows * d.tileH + (rows - 1) * 12) + 12;
    if (stack > STACK_CEILING) throw new Error(`K-356: stack ${stack} > the ${STACK_CEILING} fi budget`);

    // literals first (a missing word refuses BEFORE any rng draw, so the seed stays locale-neutral)
    const words = Object.fromEntries(d.keys.map((k) => [k, this._word(block, loc, k)]));
    const lc = Object.values(words).map((w) => w.toLocaleLowerCase(loc));
    if (new Set(lc).size !== lc.length) throw new Error(`K-356 ${loc}: two concepts share one word (refuse)`);
    const extra = d.distractors ? this._distractors(block, loc, d.distractors) : [];
    for (const x of extra) if (lc.includes(x.toLocaleLowerCase(loc))) throw new Error(`K-356 ${loc}: distractor "${x}" equals a symbol word (refuse)`);

    // composer: left = the concepts shuffled; right = a derangement of the left (+ the distractor tiles at d3),
    // re-drawn until no row is its own answer and the concept order is not the reversed left order
    const left = rng.shuffle(d.keys.slice());
    const rightItems = left.map((k) => ({ concept: k })).concat(extra.map((w, i) => ({ concept: null, distractor: true, word: w, i })));
    let right = null;
    for (let t = 0; t < TRIES; t++) {
      const o = rng.shuffle(rightItems);
      const fixed = o.some((it, i) => i < left.length && it.concept === left[i]);
      const concepts = o.filter((it) => it.concept).map((it) => it.concept);
      const reversed = concepts.every((c, i) => c === left[left.length - 1 - i]);
      if (!fixed && !reversed) { right = o; break; }
    }
    if (!right) throw new Error('K-356: no derangement of the word column in ' + TRIES + ' tries (refuse)');

    const badges = left.map((k) => { const s = this._symbol(global, k); return { concept: k, src: fileUri(s.theme, s.noun), noun: s.noun }; });
    const tiles = right.map((it) => it.distractor ? { concept: null, distractor: true, word: it.word } : { concept: it.concept, word: words[it.concept] });
    const bodyHtml = C4.symbolMatch({
      left: badges, right: tiles, badge: d.badge, iconPx: d.iconPx, tileW: 250, tileH: d.tileH, wordPx: d.wordPx,
      stamps: { 'tile-h': d.tileH },
    });
    return {
      bodyHtml,
      meta: {
        left, right: right.map((it) => it.distractor ? 'distractor:' + it.word : it.concept),
        words, distractors: extra, pictures: badges.map((b) => THEME + '/' + b.noun),
      },
    };
  },

  /* ------------------------------------------------------------ Phase 2 faces (2026-09-21, _work/K-356-faces.md) */
  /**
   * The additive `layout` knob (design §3; the K-322 / K-355 shape): a face is a
   * row that sets `layout` on the base's d2 config; `_buildWith` dispatches here
   * ONLY when the resolved config carries it, so the base's three configs render
   * byte-identically. Every guard keys on the RESOLVED config, never on the level
   * index. Every face root stamps data-ws-content + data-lcs-weather-symbols +
   * data-lcs-layout="<face>" (+ its config) and `verify()` hands it to `_verifyFace`.
   *
   *   write        G1-362  a word bank + `rows` spell rows (badge + letter boxes per
   *                hyphen group); the child finds the word and writes it letter by letter
   *   diary        K-364   seven day cells (a name pill + an EMPTY draw box) + the key card;
   *                the child draws the day's symbol all week (open-ended: structure only)
   *   thermometer  K-365   a key row (three band thermometers + the gear for each band)
   *                + `items` numbered cards (a band thermometer + the gear chips); the
   *                child reads the band against the key and rings the chip
   *   water-cycle  G3-385  a chip bank + the water-cycle diagram (markers 1..n in CYCLE
   *                order) + numbered writing lanes; the child copies each stage word
   *                to the lane whose number is on the diagram
   *   forecast     G1-363  a Mon-Fri strip (five DISTINCT symbols) + `asks` questions,
   *                each a whole literal + five day chips; the child rings the day
   *
   * SPARSE is a defect (the nt10-D addition): every stage is TOP-ANCHORED under the
   * instruction; write / diary / thermometer / forecast fill the body with rows
   * `minmax(<min>, 1fr)` so a short chrome grows the rows (never a small stage
   * floating mid-page); the water-cycle diagram takes the full 675 inner width
   * (h 422) so the page's slack falls OUTSIDE the stage, below the lanes. Each
   * face's verify() carries its own sparse assertion (a fill floor / a max blank
   * band / a stage-height floor).
   */
  _refuseFace(block, loc, mode) {
    if (!block) throw new Error(`K-356 ${loc}: no locale block (refuse)`);
    if (Array.isArray(block.refuse) && block.refuse.includes(mode)) throw new Error(`K-356 ${loc}: the "${mode}" face is refused by the ${loc} panel (refuse)`);
  },
  /** One stamped face root (flex column, top-anchored; the faces' slack falls below their stage). */
  _faceRoot(layout, stamps, inner, style) {
    if (!FACES.includes(layout)) throw new Error(`K-356: _faceRoot: unknown layout "${layout}"`);
    const extra = Object.entries(stamps || {}).map(([k, v]) => ` data-lcs-${k}="${String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`).join('');
    return `<div data-ws-content data-lcs-weather-symbols data-lcs-layout="${layout}"${extra} style="${style || 'display:flex;flex-direction:column;flex:1 1 auto;min-height:0'}">${inner}</div>`;
  },
  _srcOf(global, key) { const s = this._symbol(global, key); return fileUri(s.theme, s.noun); },
  _gear(global, key) {
    const g = (global.gear || []).find((x) => x.key === key);
    if (!g) throw new Error(`K-356: no gear "${key}" in the global bank`);
    return g;
  },
  /** The G3 stage literal of a cycle key; missing THROWS (never en); a space refuses unless the block says multiWord. */
  _cycleLabel(block, loc, key) {
    const w = block && block.cycleLabels && block.cycleLabels[key];
    if (typeof w !== 'string' || !w.trim()) throw new Error(`K-356 ${loc}: no cycle label for ${key} (refuse)`);
    if (/\s/.test(w.trim()) && block.multiWord !== true) throw new Error(`K-356 ${loc}: cycle label "${w}" carries a space (refuse)`);
    return w.trim();
  },
  /** The F5 question literal of a concept; missing / not a question THROWS. */
  _ask(block, loc, key) {
    const a = block && block.forecastAsks && block.forecastAsks[key];
    if (typeof a !== 'string' || !a.trim()) throw new Error(`K-356 ${loc}: no forecast question for ${key} (refuse)`);
    if (!/\?\s*$/.test(a)) throw new Error(`K-356 ${loc}: forecast question "${a}" does not end with "?" (refuse)`);
    return a;
  },
  /** An order of `keys` that is neither `avoid` nor its reverse (TRIES draws, then refuse). */
  _reorder(rng, keys, avoid) {
    for (let t = 0; t < TRIES; t++) {
      const o = rng.shuffle(keys.slice());
      const same = o.every((k, i) => k === avoid[i]);
      const rev = o.every((k, i) => k === avoid[avoid.length - 1 - i]);
      if (!same && !rev) return o;
    }
    throw new Error('K-356: no re-ordering in ' + TRIES + ' tries (refuse)');
  },

  _buildFace(bankData, d, loc, ctx) {
    switch (d.layout) {
      case 'write': return this._buildWrite(bankData, d, loc, ctx);
      case 'diary': return this._buildDiary(bankData, d, loc, ctx);
      case 'thermometer': return this._buildThermometer(bankData, d, loc, ctx);
      case 'water-cycle': return this._buildWaterCycle(bankData, d, loc, ctx);
      case 'forecast': return this._buildForecast(bankData, d, loc, ctx);
      default: throw new Error(`K-356: unknown layout "${d.layout}"`);
    }
  },

  /* ---------------- F1 write (G1-362) ---------------- */
  _buildWrite({ global, block }, d, loc, ctx) {
    const rng = ctx.rng;
    this._refuseFace(block, loc, 'write');
    const keys = Array.isArray(d.keys) ? d.keys : KEYS;
    if (!(Number.isInteger(d.rows) && d.rows === keys.length && d.rows >= 4 && d.rows <= 6)) throw new Error(`K-356 write: rows ${d.rows} ≠ ${keys.length} keys or outside 4..6`);
    if (keys.some((k) => !KEYS.includes(k)) || new Set(keys).size !== keys.length) throw new Error(`K-356 write: keys ${JSON.stringify(keys)}`);
    if (!(d.box >= 44)) throw new Error(`K-356 write: letter box floor ${d.box} < 44`);
    const boxMax = d.boxMax || 60;
    if (!(boxMax >= d.box && boxMax <= 72)) throw new Error(`K-356 write: boxMax ${boxMax} outside ${d.box}..72`);
    if (!(d.gap >= 2 && d.gap <= 8)) throw new Error(`K-356 write: box gap ${d.gap} outside 2..8`);
    if (!(Number.isInteger(d.maxLetters) && d.maxLetters >= 3 && d.maxLetters <= 11)) throw new Error(`K-356 write: maxLetters ${d.maxLetters} outside 3..11 (the 526 px lane)`);
    if (d.hyphenGiven === false) throw new Error('K-356 write: hyphenGiven:false is rejected (a child would write a letter into a hyphen box; the hyphens are GIVEN)');
    if (!(d.iconPx >= 44 && d.badge >= 56 && d.iconPx <= d.badge - 12)) throw new Error(`K-356 write: badge ${d.badge} / icon ${d.iconPx} (G1 floor 44; icon must fit the badge)`);
    const bank = d.bank !== false;
    // literals BEFORE any rng draw (a refusal never depends on the seed; the seed stays locale-neutral)
    const words = {};
    for (const k of keys) {
      const w = this._word(block, loc, k);
      const letters = w.split('-').reduce((n, g) => n + [...g].length, 0);
      if (letters > d.maxLetters) throw new Error(`K-356 ${loc} write: "${w}" has ${letters} letters > ${d.maxLetters} (refuse: the panel names "write")`);
      words[k] = w;
    }
    // the letter box is sized to THIS locale's longest bank word: the lane inner (675 - 32 - 4 = 639) minus badge + gap is the
    // room; the largest box in box..boxMax at which every word fits, else the locale REFUSES `write` (never a smaller box)
    const room = WRITE_LANE_INNER - d.badge - 12;
    const box = C4.spellBox({ words: Object.values(words), room, boxMin: d.box, boxMax, gap: d.gap });
    if (box == null) throw new Error(`K-356 ${loc} write: the widest word does not fit ${room} px at a ${d.box} px box (refuse: the panel names "write")`);
    const rows = rng.shuffle(keys.slice());
    const bankOrder = bank ? this._reorder(rng, keys, rows) : null;
    const bankHtml = bank ? wordBank({ words: bankOrder.map((k) => ({ word: words[k] })), wordPx: d.bankPx || 18 }) : '';
    const lanePad = 6;
    const rowsHtml = rows.map((k) => C4.spellRow({ concept: k, src: this._srcOf(global, k), word: words[k], box, gap: d.gap, badge: d.badge, iconPx: d.iconPx, lanePad })).join('');
    // every row is a `.ws-lane` card that OWNS its band; lanes minmax(badge + 2 x lanePad + 4, 1fr) FILL the body with 5 px gaps (88 px at
    // the fi 677 chrome, ~100 at 722) so no bare paper floats between rows
    const laneMin = d.badge + 2 * lanePad + 4;
    const grid = `<div data-lcs-spell-rows style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${rows.length},minmax(${laneMin}px,1fr));gap:5px;min-height:0">${rowsHtml}</div>`;
    return {
      bodyHtml: this._faceRoot('write', { rows: rows.length, bank: bank ? 1 : 0, box, 'box-min': d.box, 'box-max': boxMax, gap: d.gap, 'max-letters': d.maxLetters, 'badge-px': d.badge, 'icon-px': d.iconPx, 'lane-pad': lanePad }, bankHtml + grid),
      meta: { rows, bank: bankOrder, words, box, pictures: rows.map((k) => THEME + '/' + this._symbol(global, k).noun) },
    };
  },

  /* ---------------- F2 diary (K-364; OPEN-ENDED, seed-invariant) ---------------- */
  _buildDiary({ global, block }, d, loc) {
    this._refuseFace(block, loc, 'diary');
    if (d.days !== 7) throw new Error(`K-356 diary: days ${d.days} ≠ 7`);
    const start = d.start || block.diaryStart || 'mon';
    if (!['mon', 'sun'].includes(start)) throw new Error(`K-356 diary: start "${start}" is not mon | sun`);
    const box = d.box || 'rect';
    if (!['rect', 'circle'].includes(box)) throw new Error(`K-356 diary: box "${box}"`);
    if (d.legend !== 6) throw new Error(`K-356 diary: legend ${d.legend} ≠ 6 (the key shows the whole symbol set)`);
    if (!(d.legendPx >= 56)) throw new Error(`K-356 diary: legendPx ${d.legendPx} < the K floor 56`);
    if (d.wordLane) throw new Error('K-356 diary: wordLane is not built (a d3 shape; d2 is the only shipped level)');
    const cal = NAMES[loc];
    if (!cal || !Array.isArray(cal.dayNames) || cal.dayNames.length !== 7) throw new Error(`K-356 ${loc} diary: no day names in calendar.js (refuse)`);
    const names = Array.isArray(block.diaryDays) && block.diaryDays.length === 7 ? block.diaryDays : cal.dayNames;   // Sunday-first, like calendar.js
    if (names.some((n) => typeof n !== 'string' || !n.trim() || /\p{N}/u.test(n))) throw new Error(`K-356 ${loc} diary: a day name is empty or carries a numeral (refuse)`);
    const first = start === 'sun' ? 0 : 1;
    const days = Array.from({ length: 7 }, (_, i) => { const idx = (first + i) % 7; return { index: idx, name: names[idx] }; });
    const key = KEYS.map((k) => ({ concept: k, src: this._srcOf(global, k) }));
    const bodyHtml = C4.diaryWeek({ days, key, legendPx: d.legendPx, box, stamps: { start, legend: 6, 'legend-px': d.legendPx } });
    return { bodyHtml, meta: { days: days.map((x) => x.index), start, names: days.map((x) => x.name), pictures: KEYS.map((k) => THEME + '/' + this._symbol(global, k).noun) } };
  },

  /* ---------------- F3 thermometer (K-365) ---------------- */
  _buildThermometer({ global, block }, d, loc, ctx) {
    const rng = ctx.rng;
    this._refuseFace(block, loc, 'thermometer');
    const B = global.bands;
    if (!B || !Array.isArray(B.order)) throw new Error('K-356 thermometer: the global bank has no band table');
    // ONE band table: the config must restate the global bands exactly (a 2-band d1 shape is unshipped and refuses here)
    if (!Array.isArray(d.bands) || d.bands.join() !== B.order.join()) throw new Error(`K-356 thermometer: bands ${JSON.stringify(d.bands)} ≠ the global ${B.order.join(',')} (only the d2 three-band shape is built)`);
    if (d.min !== B.min || d.max !== B.max || d.step !== B.step || !Array.isArray(d.edges) || d.edges.join() !== B.edges.join()) throw new Error(`K-356 thermometer: min/max/step/edges ${d.min}/${d.max}/${d.step}/${JSON.stringify(d.edges)} ≠ the global table`);
    if (!Array.isArray(d.chips) || d.chips.length !== d.bands.length) throw new Error(`K-356 thermometer: chips ${JSON.stringify(d.chips)} ≠ one per band`);
    const gearOf = {};
    for (const c of d.chips) { const g = this._gear(global, c); if (gearOf[g.band]) throw new Error(`K-356 thermometer: two chips for the ${g.band} band`); gearOf[g.band] = g; }
    if (d.bands.some((b) => !gearOf[b])) throw new Error(`K-356 thermometer: chips do not cover every band`);
    if (!(Number.isInteger(d.cols) && Number.isInteger(d.rows) && d.items === d.cols * d.rows && d.items >= 4 && d.items <= 8)) throw new Error(`K-356 thermometer: items ${d.items} ≠ cols ${d.cols} x rows ${d.rows} or outside the K 4..8`);
    if (!(d.items >= d.bands.length)) throw new Error(`K-356 thermometer: ${d.items} items < ${d.bands.length} bands (every band at least once)`);
    if (!(d.thermH >= 180 && d.keyH >= 100)) throw new Error(`K-356 thermometer: thermH ${d.thermH} / keyH ${d.keyH} below the 180 / 100 floors`);
    if (!(d.chip >= 56 && d.iconPx >= 56 && d.iconPx <= d.chip - 4)) throw new Error(`K-356 thermometer: chip ${d.chip} / icon ${d.iconPx} (K floor 56; the icon must fit the chip)`);
    const bounds = [B.min, ...B.edges, B.max];
    const bandList = B.order.map((b, i) => ({ key: b, from: bounds[i], to: bounds[i + 1], fill: B.tints[b] }));
    const therm = (value, h) => thermometer({ value, min: B.min, max: B.max, step: B.step, height: h, numerals: false, bands: bandList });
    // composition: every band at least once, no row with one band twice, values without replacement from the band INTERIORS
    let assign = null;
    for (let t = 0; t < TRIES && !assign; t++) {
      const pool = B.order.slice();
      while (pool.length < d.items) pool.push(rng.pick(B.order));
      const o = rng.shuffle(pool);
      let ok = true;
      for (let r = 0; r < d.rows && ok; r++) { const row = o.slice(r * d.cols, (r + 1) * d.cols); if (new Set(row).size !== row.length) ok = false; }
      if (ok) assign = o;
    }
    if (!assign) throw new Error('K-356 thermometer: no band assignment without a repeated band in a row (refuse)');
    const pools = Object.fromEntries(B.order.map((b) => [b, rng.shuffle((B.values[b] || []).slice())]));
    const items = assign.map((band) => {
      const value = pools[band].shift();
      if (value === undefined) throw new Error(`K-356 thermometer: the ${band} band has no unused value left (refuse)`);
      return { band, value, chips: rng.shuffle(d.chips.slice()) };
    });
    // never the same chip order on every card
    if (items.length >= 2 && items.every((it) => it.chips.join() === items[0].chips.join())) {
      for (let t = 0; t < TRIES; t++) { const o = rng.shuffle(d.chips.slice()); if (o.join() !== items[0].chips.join()) { items[items.length - 1].chips = o; break; } }
    }
    const keyRow = C4.bandKey({ bands: B.order.map((b) => ({ key: b, value: B.keyValues[b], src: fileUri(gearOf[b].theme, gearOf[b].noun) })), thermH: d.keyH, iconPx: d.iconPx, therm });
    const cards = items.map((it, i) => C4.bandThermo({
      n: i + 1, value: it.value, band: it.band, thermH: d.thermH, chip: d.chip, iconPx: d.iconPx, therm, chipsBelow: !!d.chipsBelow,
      chips: it.chips.map((c) => { const g = gearOf[this._gear(global, c).band]; return { key: c, src: fileUri(g.theme, g.noun), correct: g.band === it.band }; }),
    }));
    const grid = cardGrid({ cards, cols: d.cols, rows: d.rows, numbered: true });
    const stamps = { items: d.items, cols: d.cols, rows: d.rows, bands: B.order.join(','), chips: d.chips.join(','), 'therm-h': d.thermH, 'key-h': d.keyH, chip: d.chip, 'icon-px': d.iconPx, min: B.min, max: B.max, edges: B.edges.join(',') };
    return {
      bodyHtml: this._faceRoot('thermometer', stamps, keyRow + grid, 'display:flex;flex-direction:column;flex:1 1 auto;min-height:0;gap:12px'),
      meta: { bands: items.map((it) => it.band), values: items.map((it) => it.value), chipOrders: items.map((it) => it.chips.join('>')), pictures: d.chips.map((c) => { const g = this._gear(global, c); return g.theme + '/' + g.noun; }) },
    };
  },

  /* ---------------- F4 water-cycle (G3-385) ---------------- */
  _buildWaterCycle({ global, block }, d, loc, ctx) {
    const rng = ctx.rng;
    this._refuseFace(block, loc, 'water-cycle');
    const cycle = Array.isArray(global.cycle) ? global.cycle.slice() : [];
    if (cycle.join() !== CYCLE_KEYS.join()) throw new Error('K-356 water-cycle: the global cycle is not the four stage keys');
    if (d.stages === 5) cycle.push(...(global.cycleExtra || []));
    if (!(d.stages === cycle.length && (d.stages === 4 || d.stages === 5))) throw new Error(`K-356 water-cycle: stages ${d.stages} ≠ 4 | 5`);
    if (!(Number.isInteger(d.given) && d.given >= 0 && d.given <= d.stages - 2)) throw new Error(`K-356 water-cycle: given ${d.given} outside 0..${d.stages - 2}`);
    if (d.bank === false) throw new Error('K-356 water-cycle: the chip bank is the printed copy of every stage word (bank:false is not a face)');
    if (!(d.w >= WC_MIN_W && d.w <= PAGE_INNER)) throw new Error(`K-356 water-cycle: w ${d.w} outside ${WC_MIN_W}..${PAGE_INNER}`);
    if (!(d.laneW >= 200 && d.laneH >= 44 && d.glyphH >= 20 && d.glyphH <= d.laneH * 0.6)) throw new Error(`K-356 water-cycle: lane ${d.laneW} x ${d.laneH} / glyph ${d.glyphH}`);
    if (2 * d.laneW + 2 * 54 + 15 > PAGE_INNER) throw new Error(`K-356 water-cycle: two lanes of ${d.laneW} + chips do not fit ${PAGE_INNER}`);
    const labels = Object.fromEntries(cycle.map((k) => [k, this._cycleLabel(block, loc, k)]));
    const lc = Object.values(labels).map((w) => w.toLocaleLowerCase(loc));
    if (new Set(lc).size !== lc.length) throw new Error(`K-356 ${loc} water-cycle: two stages share one label (refuse)`);
    const markers = cycle.map((k, i) => ({ anchor: k, n: i + 1 }));   // CYCLE order (RULED over a shuffled numbering)
    const bankOrder = this._reorder(rng, cycle, cycle);
    const given = new Set(d.given ? rng.sample(cycle, d.given) : []);
    const diagram = waterCycle({ w: d.w, markers });
    const bankHtml = wordBank({ words: bankOrder.map((k) => ({ word: labels[k] })), wordPx: d.bankPx || 18 });
    const lanes = C4.cycleLabels({ lanes: cycle.map((k, i) => ({ n: i + 1, anchor: k, given: given.has(k) ? labels[k] : null })), laneW: d.laneW, laneH: d.laneH, glyphH: d.glyphH, perRow: 2 });
    const inner = bankHtml +
      `<div data-lcs-diagram style="display:flex;justify-content:center;flex:0 0 auto;line-height:0">${diagram.svg}</div>` +
      `<div style="flex:0 0 12px"></div>` + lanes;
    return {
      bodyHtml: this._faceRoot('water-cycle', { stages: d.stages, given: d.given, bank: 1, w: d.w, 'lane-w': d.laneW, 'lane-h': d.laneH, 'glyph-h': d.glyphH, cycle: cycle.join(',') }, inner),
      meta: { cycle, bank: bankOrder, labels, given: [...given], diagram: { w: diagram.width, h: diagram.height, anchors: diagram.anchors } },
    };
  },

  /* ---------------- F5 forecast (G1-363) ---------------- */
  _buildForecast({ global, block }, d, loc, ctx) {
    const rng = ctx.rng;
    this._refuseFace(block, loc, 'forecast');
    const dayIdx = Array.isArray(global.forecast && global.forecast.days) ? global.forecast.days : [];
    if (!(d.days === 5 && dayIdx.length === 5)) throw new Error(`K-356 forecast: days ${d.days} ≠ 5`);
    if (!(Number.isInteger(d.asks) && d.asks >= 2 && d.asks <= 4)) throw new Error(`K-356 forecast: asks ${d.asks} outside 2..4`);
    if (!['word', 'symbol'].includes(d.askBy)) throw new Error(`K-356 forecast: askBy "${d.askBy}"`);
    if (d.distinctStrip !== true) throw new Error('K-356 forecast: distinctStrip:false is not a face (two days with one symbol give an ask two answers)');
    if (!(d.symbolPx >= 56)) throw new Error(`K-356 forecast: symbolPx ${d.symbolPx} < 56`);
    if (!(d.chipH >= 44)) throw new Error(`K-356 forecast: chipH ${d.chipH} < the G1 tap floor 44`);
    const cal = NAMES[loc];
    if (!cal || !Array.isArray(cal.dayNames) || cal.dayNames.length !== 7) throw new Error(`K-356 ${loc} forecast: no day names in calendar.js (refuse)`);
    const labels = Array.isArray(block.forecastDays) && block.forecastDays.length === 5 ? block.forecastDays.slice() : dayIdx.map((i) => cal.dayNames[i]);
    if (labels.some((n) => typeof n !== 'string' || !n.trim())) throw new Error(`K-356 ${loc} forecast: a day label is empty (refuse)`);
    // literals before the first draw: every ask must exist for every symbol the strip could carry
    const asks = Object.fromEntries(KEYS.map((k) => [k, this._ask(block, loc, k)]));
    const strip = rng.sample(KEYS.slice(), 5);   // five DISTINCT symbols of the six (single answer by construction)
    let pick = null;
    for (let t = 0; t < TRIES && !pick; t++) {
      const p = rng.sample(strip.slice(), d.asks);
      const at = p.map((k) => strip.indexOf(k));
      const ascending = at.every((v, i) => i === 0 || v > at[i - 1]);
      if (!ascending) pick = p;
    }
    if (!pick) throw new Error('K-356 forecast: no ask order that is not Mon..Fri ascending (refuse)');
    const stripHtml = C4.forecastStrip({ days: dayIdx.map((idx, j) => ({ index: idx, name: labels[j], concept: strip[j], src: this._srcOf(global, strip[j]) })), iconPx: d.symbolPx });
    const lanes = pick.map((k, qi) => C4.forecastQuestion({
      n: qi + 1, text: asks[k], concept: k, src: this._srcOf(global, k), askBy: d.askBy, chipH: d.chipH, chipMax: d.chipMax || 72,
      chips: dayIdx.map((idx, j) => ({ index: idx, label: labels[j], correct: strip[j] === k })),
    })).join('');
    const grid = `<div data-lcs-asks style="flex:1 1 auto;display:grid;grid-template-rows:repeat(${d.asks},minmax(106px,1fr));gap:12px;min-height:0">${lanes}</div>`;
    return {
      bodyHtml: this._faceRoot('forecast', { days: 5, asks: d.asks, 'ask-by': d.askBy, 'symbol-px': d.symbolPx, 'chip-h': d.chipH, distinct: 1 }, stripHtml + grid, 'display:flex;flex-direction:column;flex:1 1 auto;min-height:0;gap:20px'),
      meta: { strip, asks: pick, answerDays: pick.map((k) => dayIdx[strip.indexOf(k)]), labels, pictures: strip.map((k) => THEME + '/' + this._symbol(global, k).noun) },
    };
  },

  /**
   * verify() for the five faces (runs in page.evaluate: no require). Re-derives
   * every face from its root stamps + the DOM + geometry with its OWN copies of
   * the fixed tables (the six nouns, the gear-to-band map, the band table, the
   * water-cycle anchors, the cycle order); the gate asserts those copies agree
   * with the global bank / the primitive exports. Literal equality (bank word ===
   * the locale bank, question === forecastAsks, …) is the gate's node cross-check.
   */
  async _verifyFace(page) {
    return page.evaluate(() => {
      const fails = [];
      const KEYS = ['sun', 'cloud', 'rain', 'storm', 'snow', 'rainbow'];
      const NOUN_OF = { sun: 'sunny', cloud: 'cloudy', rain: 'rainy', storm: 'thunderstorm', snow: 'snowflake', rainbow: 'rainbow' };
      const GEAR = { scarf: { band: 'cold', dir: 'weather' }, 't-shirt': { band: 'warm', dir: 'clothing' }, sunglasses: { band: 'hot', dir: 'weather' } };
      const GEAR_FILES = ['scarf', 't-shirt', 'sunglasses', 'mittens', 'umbrella', 'raincoat', 'hot', 'cold'];
      const BANDS = { order: ['cold', 'warm', 'hot'], min: -10, max: 40, edges: [10, 25], values: { cold: [-10, -5, 0, 5], warm: [15, 20], hot: [30, 35] } };
      const ANCHORS = { evaporation: [300, 206], condensation: [449, 118], precipitation: [456, 214], collection: [150, 344], runoff: [486, 262] };
      const CYCLE = ['evaporation', 'condensation', 'precipitation', 'collection', 'runoff'];
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const WORD_RE = /^[\p{L}][\p{L}'’-]*$/u;
      const root = document.querySelector('[data-ws-content][data-lcs-weather-symbols]');
      if (!root) return ['no weather-symbols root'];
      const layout = root.dataset.lcsLayout;
      const body = document.querySelector('[data-lcs-body]');
      const bodyR = body ? body.getBoundingClientRect() : null;
      const foot = document.querySelector('.ws-foot');
      const footTop = foot ? foot.getBoundingClientRect().top : Infinity;
      const rr = root.getBoundingClientRect();
      if (document.querySelector('[data-lcs-answer]')) fails.push('a [data-lcs-answer] stamp prints an answer');
      if (bodyR && (rr.left < bodyR.left - 0.6 || rr.right > bodyR.right + 0.6)) fails.push('stage outside the body column');
      if (bodyR && Math.abs(rr.top - bodyR.top) > 3) fails.push(`stage not top-anchored (${Math.round(rr.top - bodyR.top)} px under the body top)`);
      // the root is a flex child that always fills the body: measure the FILL UNIT (the last child: the row grid / the card grid / the lanes; the diary root IS its grid)
      const fillUnit = () => (layout === 'diary' ? root : (root.lastElementChild || root)).getBoundingClientRect();
      const fills = (what) => { const u = fillUnit(); if (bodyR && u.bottom < bodyR.bottom - 3) fails.push(`${what}: the stage ends ${Math.round(bodyR.bottom - u.bottom)} px above the body bottom (sparse: the rows must fill the body)`); };
      // the stage's CONTENT height: root top to the lowest child bottom (never the root box, which flex stretches to the body)
      const contentH = () => Math.max(...[...root.children].map((c) => c.getBoundingClientRect().bottom)) - rr.top;
      const aboveFoot = (els, what) => els.forEach((el, i) => { if (el.getBoundingClientRect().bottom > footTop + 0.6) fails.push(`${what} ${i + 1} reaches into the footer band`); });
      const pic = (im, what, minPx, dir, file) => {
        if (!im) { fails.push(`${what}: no picture`); return null; }
        if (!im.complete || im.naturalWidth === 0) fails.push(`${what}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`${what}: alt names the picture`);
        const parts = decodeURIComponent(im.src).split('/');
        const d = parts[parts.length - 2] || '';
        const f = parts[parts.length - 1].replace(/@\dx\.webp$/, '').replace(/\.\w+$/, '');
        if (BW.test(d)) fails.push(`${what}: picture from a B&W directory "${d}"`);
        if (dir && d !== dir) fails.push(`${what}: picture dir "${d}" ≠ ${dir}`);
        if (file && f !== file) fails.push(`${what}: picture "${f}" ≠ "${file}"`);
        const r = im.getBoundingClientRect();
        if (Math.min(r.width, r.height) < minPx - 0.6) fails.push(`${what}: picture ${Math.round(Math.min(r.width, r.height))} px < ${minPx}`);
        return { dir: d, file: f };
      };
      const clipped = (el) => el.scrollWidth > el.clientWidth + 0.6;
      const noNumeral = (what) => { if (/\p{N}/u.test(root.textContent)) fails.push(`${what}: a numeral is printed on the page`); };

      /* ---------------- F1 write ---------------- */
      if (layout === 'write') {
        const rows = +root.dataset.lcsRows, bank = root.dataset.lcsBank === '1', box = +root.dataset.lcsBox, gap = +root.dataset.lcsGap, maxLetters = +root.dataset.lcsMaxLetters;
        const boxMin = +root.dataset.lcsBoxMin || 44, boxMax = +root.dataset.lcsBoxMax || 60;
        if (!(box >= boxMin && box <= boxMax)) fails.push(`letter box ${box} outside ${boxMin}..${boxMax}`);
        const iconMin = Math.max(44, +root.dataset.lcsIconPx || 0);
        const spells = [...root.querySelectorAll('[data-lcs-spell]')];
        if (spells.length !== rows) fails.push(`${spells.length} spell rows ≠ stamp ${rows}`);
        if (rows < 4 || rows > 6) fails.push(`rows ${rows} outside 4..6`);
        if (!(box >= 44)) fails.push(`letter box ${box} < 44`);
        const concepts = [];
        spells.forEach((el, i) => {
          const what = `row ${i + 1}`;
          const c = el.dataset.lcsSpell;
          if (!KEYS.includes(c)) fails.push(`${what}: concept "${c}"`);
          concepts.push(c);
          const imgs = el.querySelectorAll('img');
          if (imgs.length !== 1) fails.push(`${what}: ${imgs.length} pictures`);
          else pic(imgs[0], what, iconMin, 'weather', NOUN_OF[c]);
          const len = +el.dataset.lcsLen;
          const groups = (el.dataset.lcsGroups || '').split('-').map(Number);
          const boxes = [...el.querySelectorAll('[data-lcs-letterboxes]')].map((s) => +s.getAttribute('data-lcs-letterboxes'));
          if (boxes.join('-') !== groups.join('-')) fails.push(`${what}: letter boxes ${boxes.join('-')} ≠ groups ${groups.join('-')}`);
          if (boxes.reduce((a, b) => a + b, 0) !== len) fails.push(`${what}: ${boxes.reduce((a, b) => a + b, 0)} boxes ≠ len ${len}`);
          if (len > maxLetters) fails.push(`${what}: ${len} letters > maxLetters ${maxLetters}`);
          const hy = el.querySelectorAll('[data-lcs-hyphen]').length;
          if (hy !== groups.length - 1) fails.push(`${what}: ${hy} hyphen glyphs ≠ ${groups.length - 1}`);
          el.querySelectorAll('[data-lcs-letterboxes]').forEach((s) => {
            const n = +s.getAttribute('data-lcs-letterboxes');
            const r = s.getBoundingClientRect();
            if (r.height < box + 2 - 0.6) fails.push(`${what}: boxes ${Math.round(r.height)} px high < ${box + 2}`);
            if (Math.abs(r.width - (n * box + (n - 1) * gap + 2)) > 0.6) fails.push(`${what}: ${n} boxes measure ${Math.round(r.width)} ≠ ${n * box + (n - 1) * gap + 2}`);
          });
          if (el.textContent.replace(/-/g, '').trim()) fails.push(`${what}: prints text (the word must never be printed on its row)`);
          if (el.getBoundingClientRect().right > rr.right + 0.6) fails.push(`${what}: wider than the stage`);
          // the row is a lane card that OWNS its band: every child inside it, the blank above / below the content <= 24 px
          if (!el.classList.contains('ws-lane')) fails.push(`${what}: is not a lane card (a bare row floats in white)`);
          if (+el.dataset.lcsBox !== box) fails.push(`${what}: box stamp ${el.dataset.lcsBox} ≠ ${box}`);
          const lr = el.getBoundingClientRect();
          let top = Infinity, bottom = -Infinity, right = -Infinity;
          [...el.querySelectorAll('[data-lcs-badge], [data-lcs-letterboxes]')].forEach((ch) => { const r = ch.getBoundingClientRect(); top = Math.min(top, r.top); bottom = Math.max(bottom, r.bottom); right = Math.max(right, r.right); });
          if (right > lr.right + 0.6) fails.push(`${what}: the letter boxes run past their lane (${Math.round(right - lr.right)} px)`);
          const above = top - lr.top, below = lr.bottom - bottom;
          if (above > 24 || below > 24) fails.push(`${what}: ${Math.round(Math.max(above, below))} px of blank inside the lane > 24 (sparse)`);
        });
        if (new Set(concepts).size !== concepts.length) fails.push(`row concepts ${concepts.join(',')} repeat`);
        const banner = root.querySelector('[data-lcs-bank-banner]');
        if (bank && !banner) fails.push('bank absent at d2 (the bank makes the move "find the word, copy it")');
        if (!bank && banner) fails.push('a bank is printed although the config has none');
        if (banner) {
          const words = [...banner.querySelectorAll('[data-lcs-bank-word]')].map((s) => s.getAttribute('data-lcs-bank-word'));
          if (words.length !== rows) fails.push(`${words.length} bank words ≠ ${rows} rows`);
          if (new Set(words.map((w) => w.toLocaleLowerCase())).size !== words.length) fails.push('two bank words repeat');
          words.forEach((w) => { if (!WORD_RE.test(w)) fails.push(`bank word "${w}" is not a single token or hyphenated`); });
          if (banner.querySelector('img')) fails.push('a picture in the bank');
          [...banner.querySelectorAll('.ws-bankword')].forEach((s) => { if (parseFloat(getComputedStyle(s).fontSize) < 16 - 0.6) fails.push('bank word < 16 px'); });
          if (banner.getBoundingClientRect().top < rr.top - 0.6) fails.push('bank above the stage');
        }
        // sparse: the lane grid fills the body and the lanes sit 8 px apart (no bare band between rows)
        fills('write');
        for (let i = 1; i < spells.length; i++) {
          const blank = spells[i].getBoundingClientRect().top - spells[i - 1].getBoundingClientRect().bottom;
          if (blank > 10) fails.push(`rows ${i}/${i + 1}: ${Math.round(blank)} px blank between the lanes > 10 (sparse)`);
        }
        aboveFoot(spells, 'row');
        return fails;
      }

      /* ---------------- F2 diary ---------------- */
      if (layout === 'diary') {
        const start = root.dataset.lcsStart, legendPx = Math.max(56, +root.dataset.lcsLegendPx || 0), box = root.dataset.lcsBox || 'rect';
        const first = start === 'sun' ? 0 : start === 'mon' ? 1 : -1;
        if (first < 0) fails.push(`start "${start}" is not mon | sun`);
        const days = [...root.querySelectorAll('[data-lcs-day]')];
        if (days.length !== 7) fails.push(`${days.length} day cells ≠ 7`);
        const names = [];
        days.forEach((el, i) => {
          const what = `day ${i + 1}`;
          const idx = +el.dataset.lcsDay;
          if (first >= 0 && idx !== (first + i) % 7) fails.push(`${what}: index ${idx} ≠ ${(first + i) % 7} (start ${start})`);
          const pill = el.querySelector('[data-lcs-day-name]');
          const name = pill ? pill.textContent.trim() : '';
          if (!name) fails.push(`${what}: no day name`);
          if (pill && clipped(pill)) fails.push(`${what}: the name "${name}" is clipped`);
          if (pill) { const pr = pill.getBoundingClientRect(), cr = el.getBoundingClientRect(); if (pr.left < cr.left - 0.6 || pr.right > cr.right + 0.6) fails.push(`${what}: the name pill "${name}" (${Math.round(pr.width)} px) runs past its ${Math.round(cr.width)} px cell (the panel sets diaryDays short forms, never a smaller font)`); }
          if (pill && parseFloat(getComputedStyle(pill).fontSize) < 18 - 0.6) fails.push(`${what}: name < 18 px`);
          names.push(name);
          const boxes = el.querySelectorAll('[data-lcs-drawbox]');
          if (boxes.length !== 1) fails.push(`${what}: ${boxes.length} draw boxes`);
          else {
            const b = boxes[0];
            if (b.querySelector('img') || b.textContent.trim() || b.querySelector('svg')) fails.push(`${what}: the draw box is not empty`);
            const r = b.getBoundingClientRect();
            if (box === 'circle') { if (Math.min(r.width, r.height) < 96 - 0.6) fails.push(`${what}: circle ${Math.round(r.width)} px < 96`); }
            else if (r.width < 136 - 0.6 || r.height < 200 - 0.6) fails.push(`${what}: draw box ${Math.round(r.width)} x ${Math.round(r.height)} < 136 x 200`);
            const cr = el.getBoundingClientRect();
            if (r.bottom > cr.bottom + 0.6 || r.right > cr.right + 0.6) fails.push(`${what}: the draw box leaves its cell`);
          }
          if (el.querySelector('img')) fails.push(`${what}: a picture in a day cell`);
        });
        if (new Set(names).size !== names.length) fails.push('two day cells print the same name');
        const keys = [...root.querySelectorAll('[data-lcs-key]')];
        if (keys.length !== 1) fails.push(`${keys.length} key cards ≠ 1`);
        else {
          const syms = [...keys[0].querySelectorAll('[data-lcs-symbol]')];
          const set = syms.map((s) => s.dataset.lcsSymbol);
          if ([...set].sort().join() !== [...KEYS].sort().join()) fails.push(`key symbols ${set.join(',')} ≠ the six`);
          syms.forEach((s) => pic(s.querySelector('img'), `key ${s.dataset.lcsSymbol}`, legendPx, 'weather', NOUN_OF[s.dataset.lcsSymbol]));
          if (keys[0].textContent.trim()) fails.push('the key prints text');
          const kr = keys[0].getBoundingClientRect();
          syms.forEach((s) => { const r = s.getBoundingClientRect(); if (r.left < kr.left - 0.6 || r.right > kr.right + 0.6 || r.top < kr.top - 0.6 || r.bottom > kr.bottom + 0.6) fails.push(`key ${s.dataset.lcsSymbol} leaves the key card`); });
        }
        noNumeral('diary');
        fills('diary');
        aboveFoot([...days, ...keys], 'cell');
        return fails;
      }

      /* ---------------- F3 thermometer ---------------- */
      if (layout === 'thermometer') {
        const items = +root.dataset.lcsItems, cols = +root.dataset.lcsCols, rows = +root.dataset.lcsRows;
        const bands = (root.dataset.lcsBands || '').split(','), chips = (root.dataset.lcsChips || '').split(',');
        const thermH = +root.dataset.lcsThermH, chip = +root.dataset.lcsChip, iconPx = Math.max(56, +root.dataset.lcsIconPx || 0);
        const min = +root.dataset.lcsMin, max = +root.dataset.lcsMax, edges = (root.dataset.lcsEdges || '').split(',').map(Number);
        if (bands.join() !== BANDS.order.join() || min !== BANDS.min || max !== BANDS.max || edges.join() !== BANDS.edges.join()) fails.push(`band stamps ${bands.join(',')} ${min}..${max} edges ${edges.join(',')} ≠ the fixed table`);
        const bounds = [BANDS.min, ...BANDS.edges, BANDS.max];
        const bandOf = (v) => { for (let i = 0; i < BANDS.order.length; i++) { const lo = bounds[i], hi = bounds[i + 1]; if ((i === 0 ? v >= lo : v > lo) && v < hi) return BANDS.order[i]; } return null; };
        const chipBand = (k) => GEAR[k] && GEAR[k].band;
        if ([...chips].sort().join() !== Object.keys(GEAR).sort().join()) fails.push(`chips ${chips.join(',')} ≠ the gear triple`);
        const thermSvgs = [...root.querySelectorAll('svg[data-lcs-prim="thermometer"]')];
        thermSvgs.forEach((s, i) => { if (s.querySelector('text')) fails.push(`thermometer ${i + 1}: text inside the thermometer (a numeral prints the scale)`); });
        // no digit / degree sign anywhere on the face EXCEPT the card ordinals (.ws-card-badge 1..n: the design's own
        // `cardGrid numbered`; measured "1".."4" on the d2 render) — the ban is the TEMPERATURE numeral / scale
        { const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let txt = ''; let node;
          while ((node = walker.nextNode())) if (!node.parentElement.closest('.ws-card-badge')) txt += node.textContent;
          if (/[\p{N}°]/u.test(txt)) fails.push('a digit or a degree sign is printed on the page (outside the card ordinals)'); }
        const tileCheck = (svg, what) => {
          const rects = [...svg.querySelectorAll('[data-lcs-band]')];
          if (rects.length !== BANDS.order.length) { fails.push(`${what}: ${rects.length} band rects ≠ ${BANDS.order.length}`); return; }
          rects.forEach((r, i) => {
            if (r.getAttribute('data-lcs-band') !== BANDS.order[i]) fails.push(`${what}: band ${i + 1} is ${r.getAttribute('data-lcs-band')} ≠ ${BANDS.order[i]}`);
            if (+r.getAttribute('data-lcs-band-from') !== bounds[i] || +r.getAttribute('data-lcs-band-to') !== bounds[i + 1]) fails.push(`${what}: band ${BANDS.order[i]} ${r.getAttribute('data-lcs-band-from')}..${r.getAttribute('data-lcs-band-to')} ≠ ${bounds[i]}..${bounds[i + 1]}`);
          });
          if (svg.querySelectorAll('[data-lcs-band-edge]').length !== BANDS.edges.length) fails.push(`${what}: band edge ticks ≠ ${BANDS.edges.length}`);
        };
        // the key row: three band thermometers in band order, each beside the gear of its band
        const keyRows = [...root.querySelectorAll('[data-lcs-key]')];
        if (keyRows.length !== 1) fails.push(`${keyRows.length} key rows ≠ 1 (no key: the child reads the band against it)`);
        else {
          const cells = [...keyRows[0].querySelectorAll('[data-lcs-key-band]')];
          if (cells.map((c) => c.dataset.lcsKeyBand).join() !== BANDS.order.join()) fails.push(`key bands ${cells.map((c) => c.dataset.lcsKeyBand).join(',')} ≠ ${BANDS.order.join(',')}`);
          cells.forEach((c) => {
            const b = c.dataset.lcsKeyBand;
            const svg = c.querySelector('svg[data-lcs-prim="thermometer"]');
            if (!svg) { fails.push(`key ${b}: no thermometer`); return; }
            const v = +svg.getAttribute('data-lcs-value');
            if (bandOf(v) !== b) fails.push(`key ${b}: mercury at ${v} is not inside the ${b} band`);
            tileCheck(svg, `key ${b}`);
            const gearKey = Object.keys(GEAR).find((k) => GEAR[k].band === b);
            pic(c.querySelector('img'), `key ${b}`, iconPx, GEAR[gearKey].dir, gearKey);
          });
          if (keyRows[0].getBoundingClientRect().top < rr.top - 0.6) fails.push('key row above the stage');
          const kr = keyRows[0].getBoundingClientRect();
          if (kr.top - rr.top > 3) fails.push('the key row is not the first thing on the stage');
        }
        const cards = [...root.querySelectorAll('[data-lcs-thermo]')];
        if (cards.length !== items) fails.push(`${cards.length} item cards ≠ stamp ${items}`);
        if (items !== cols * rows || items < 4 || items > 8) fails.push(`items ${items} ≠ ${cols} x ${rows} or outside 4..8`);
        const bandsUsed = [], orders = [];
        cards.forEach((el, i) => {
          const what = `card ${i + 1}`;
          const v = +el.dataset.lcsValue;
          const b = bandOf(v);
          if (!b) fails.push(`${what}: value ${v} is not inside any band (an edge / outside ${min}..${max})`);
          if (b && !(BANDS.values[b] || []).includes(v)) fails.push(`${what}: value ${v} is not a legal ${b} value (edges and the cap are never values)`);
          if (el.dataset.lcsBandOf !== b) fails.push(`${what}: band-of stamp "${el.dataset.lcsBandOf}" ≠ the band of ${v} (${b})`);
          bandsUsed.push(b);
          const svg = el.querySelector('[data-lcs-thermo-box] svg[data-lcs-prim="thermometer"]');
          if (!svg) fails.push(`${what}: no thermometer`);
          else {
            if (+svg.getAttribute('data-lcs-value') !== v) fails.push(`${what}: the thermometer draws ${svg.getAttribute('data-lcs-value')} ≠ the stamp ${v}`);
            tileCheck(svg, what);
            const sr = svg.getBoundingClientRect();
            if (sr.height < Math.max(180, thermH) - 0.6) fails.push(`${what}: thermometer ${Math.round(sr.height)} px < ${Math.max(180, thermH)}`);
            const card = el.closest('.ws-card') || el;
            const cr = card.getBoundingClientRect();
            if (sr.top < cr.top - 0.6 || sr.bottom > cr.bottom + 0.6) fails.push(`${what}: the thermometer leaves its card (${Math.round(sr.height)} in ${Math.round(cr.height)})`);
            // sparse: the thermometer must occupy >= 0.6 of the card's inner height
            const inner = cr.height - 28;
            if (sr.height / inner < 0.6) fails.push(`${what}: the thermometer fills ${(sr.height / inner).toFixed(2)} of the card (< 0.6: sparse)`);
          }
          if (el.querySelector('[data-lcs-thermo-box] img')) fails.push(`${what}: a picture beside the item thermometer (the legend on an item prints the answer)`);
          const cs = [...el.querySelectorAll('[data-lcs-chip]')];
          const keys = cs.map((c) => c.dataset.lcsChip);
          if ([...keys].sort().join() !== [...chips].sort().join()) fails.push(`${what}: chips ${keys.join(',')} ≠ ${chips.join(',')}`);
          orders.push(keys.join('>'));
          const correct = cs.filter((c) => c.dataset.lcsCorrect === '1');
          if (correct.length !== 1) fails.push(`${what}: ${correct.length} correct chips ≠ 1`);
          else if (chipBand(correct[0].dataset.lcsChip) !== b) fails.push(`${what}: the correct chip "${correct[0].dataset.lcsChip}" is the ${chipBand(correct[0].dataset.lcsChip)} gear, the mercury is ${b}`);
          cs.forEach((c) => {
            const k = c.dataset.lcsChip;
            if (!GEAR[k]) { fails.push(`${what}: chip "${k}" is not gear (fence: mittens / umbrella / hot / cold never)`); return; }
            const r = c.getBoundingClientRect();
            if (Math.min(r.width, r.height) < Math.max(56, chip) - 0.6) fails.push(`${what}: chip ${Math.round(r.width)} px < ${Math.max(56, chip)}`);
            pic(c.querySelector('img'), `${what} chip ${k}`, iconPx, GEAR[k].dir, k);
            if (c.textContent.trim()) fails.push(`${what}: chip "${k}" prints a word (no gear word is ever printed)`);
          });
        });
        for (let r = 0; r < rows; r++) { const row = bandsUsed.slice(r * cols, (r + 1) * cols); if (new Set(row).size !== row.length) fails.push(`row ${r + 1}: two cards share the ${row.find((b, i) => row.indexOf(b) !== i)} band`); }
        if (new Set(bandsUsed).size < Math.min(items, BANDS.order.length)) fails.push(`only ${new Set(bandsUsed).size} distinct bands over ${items} cards (every band at least once)`);
        if (new Set(cards.map((c) => c.dataset.lcsValue)).size !== cards.length) fails.push('two cards share one value');
        if (cards.length >= 2 && new Set(orders).size === 1) fails.push('every card prints the same chip order');
        // no gear file outside chips / the key; no symbol picture anywhere
        root.querySelectorAll('img').forEach((im) => {
          const f = decodeURIComponent(im.src).split('/').pop().replace(/@\dx\.webp$/, '').replace(/\.\w+$/, '');
          if (Object.values(NOUN_OF).includes(f)) fails.push(`a weather symbol "${f}" on the thermometer face`);
          if (GEAR_FILES.includes(f) && !GEAR[f]) fails.push(`a fenced gear picture "${f}"`);
          if (!im.closest('[data-lcs-chip]') && !im.closest('[data-lcs-key-band]')) fails.push(`a picture "${f}" outside the chips / key`);
        });
        fills('thermometer');
        aboveFoot(cards.map((c) => c.closest('.ws-card') || c), 'card');
        return fails;
      }

      /* ---------------- F4 water-cycle ---------------- */
      if (layout === 'water-cycle') {
        const stages = +root.dataset.lcsStages, given = +root.dataset.lcsGiven, w = +root.dataset.lcsW;
        const cycle = (root.dataset.lcsCycle || '').split(',');
        if (cycle.length !== stages || cycle.join() !== CYCLE.slice(0, stages).join()) fails.push(`cycle stamp ${cycle.join(',')} ≠ ${CYCLE.slice(0, stages).join(',')}`);
        if (stages < 4 || stages > 5) fails.push(`stages ${stages} outside 4..5 (the four-label genre; runoff is the only headroom)`);
        const svgs = [...root.querySelectorAll('svg[data-lcs-prim="water-cycle"]')];
        if (svgs.length !== 1) { fails.push(`${svgs.length} diagrams ≠ 1`); return fails; }
        const svg = svgs[0];
        const sr = svg.getBoundingClientRect();
        if (sr.width < Math.max(480, w) - 0.6) fails.push(`diagram ${Math.round(sr.width)} px wide < ${Math.max(480, w)}`);
        if (sr.right > rr.right + 0.6 || sr.left < rr.left - 0.6) fails.push('diagram wider than the stage');
        const scale = sr.width / 640;
        for (const a of ['evaporation', 'precipitation', 'runoff']) if (!svg.querySelector(`[data-lcs-arrow="${a}"]`)) fails.push(`arrow group "${a}" missing`);
        for (const p of ['land', 'water', 'cloud', 'sun', 'vapour', 'rain']) if (!svg.querySelector(`[data-lcs-part="${p}"]`)) fails.push(`diagram part "${p}" missing`);
        const markers = [...svg.querySelectorAll('[data-lcs-marker]')];
        if (markers.length !== stages) fails.push(`${markers.length} markers ≠ ${stages}`);
        const markerRects = [];
        markers.forEach((g) => {
          const a = g.dataset.lcsMarker, n = +g.dataset.lcsN;
          const want = cycle.indexOf(a) + 1;
          if (!ANCHORS[a]) { fails.push(`marker at an unknown anchor "${a}"`); return; }
          if (n !== want) fails.push(`marker "${a}" is numbered ${n} ≠ ${want} (markers are numbered in cycle order)`);
          const t = g.querySelector('text');
          if (!t || t.textContent.trim() !== String(n)) fails.push(`marker "${a}": numeral "${t && t.textContent}" ≠ ${n}`);
          if (t && parseFloat(getComputedStyle(t).fontSize) < 16 - 0.6) fails.push(`marker "${a}": numeral ${getComputedStyle(t).fontSize} < 16 px`);
          const discs = [...g.querySelectorAll('circle')];
          const disc = discs[discs.length - 1];
          if (!disc) { fails.push(`marker "${a}": no disc`); return; }
          const dr = disc.getBoundingClientRect();
          markerRects.push(dr);
          const cx = dr.left + dr.width / 2 - sr.left, cy = dr.top + dr.height / 2 - sr.top;
          const ex = ANCHORS[a][0] * scale, ey = ANCHORS[a][1] * scale;
          const off = Math.hypot(cx - ex, cy - ey);
          if (off > 2) fails.push(`marker "${a}" sits ${off.toFixed(1)} px off its anchor`);
        });
        for (let i = 0; i < markerRects.length; i++) for (let j = i + 1; j < markerRects.length; j++) {
          const a = markerRects[i], b = markerRects[j];
          const d = Math.hypot((a.left + a.width / 2) - (b.left + b.width / 2), (a.top + a.height / 2) - (b.top + b.height / 2));
          if (d < 50) fails.push(`markers ${i + 1}/${j + 1} are ${Math.round(d)} px apart < 50`);
        }
        const lanes = [...root.querySelectorAll('[data-lcs-label]')];
        if (lanes.length !== stages) fails.push(`${lanes.length} lanes ≠ ${stages}`);
        const anchors = lanes.map((l) => l.dataset.lcsAnchor);
        if (anchors.join() !== cycle.join()) fails.push(`lane anchors ${anchors.join(',')} ≠ the cycle order`);
        let givenSeen = 0;
        lanes.forEach((l, i) => {
          const what = `lane ${i + 1}`;
          if (+l.dataset.lcsN !== i + 1) fails.push(`${what}: numbered ${l.dataset.lcsN}`);
          const m = svg.querySelector(`[data-lcs-marker="${l.dataset.lcsAnchor}"]`);
          if (m && +m.dataset.lcsN !== +l.dataset.lcsN) fails.push(`${what}: number ${l.dataset.lcsN} ≠ its marker's ${m.dataset.lcsN}`);
          const chipEl = l.querySelector('.ws-chip');
          if (!chipEl || chipEl.textContent.trim() !== String(i + 1)) fails.push(`${what}: the numeral chip prints "${chipEl && chipEl.textContent.trim()}"`);
          const isGiven = l.dataset.lcsGiven === '1';
          if (isGiven) { givenSeen++; if (!l.textContent.replace(String(i + 1), '').trim()) fails.push(`${what}: given but prints nothing`); }
          else {
            const row = l.querySelector('svg[data-lcs-prim="writing-row"]');
            if (!row) fails.push(`${what}: no writing row`);
            else if (row.querySelector('text')) fails.push(`${what}: text on the writing row (lane not empty)`);
            if (l.textContent.replace(String(i + 1), '').trim()) fails.push(`${what}: lane not empty ("${l.textContent.replace(String(i + 1), '').trim()}")`);
            const rw = row && row.getBoundingClientRect();
            if (rw && (rw.width < 200 - 0.6 || rw.height < 44 - 0.6)) fails.push(`${what}: writing row ${Math.round(rw.width)} x ${Math.round(rw.height)} < 200 x 44`);
          }
          const lr = l.getBoundingClientRect();
          if (lr.top < sr.bottom - 0.6) fails.push(`${what}: the label box covers the diagram`);
          markerRects.forEach((mr, k) => { if (!(lr.right < mr.left || lr.left > mr.right || lr.bottom < mr.top || lr.top > mr.bottom)) fails.push(`${what}: covers marker ${k + 1}`); });
          if (lr.right > rr.right + 0.6 || lr.left < rr.left - 0.6) fails.push(`${what}: leaves the stage`);
        });
        if (givenSeen !== given) fails.push(`${givenSeen} given lanes ≠ stamp ${given}`);
        const banner = root.querySelector('[data-lcs-bank-banner]');
        if (!banner) fails.push('no chip bank (the bank is the printed copy of every stage word)');
        else {
          const words = [...banner.querySelectorAll('[data-lcs-bank-word]')].map((s) => s.getAttribute('data-lcs-bank-word'));
          if (words.length !== stages) fails.push(`${words.length} bank words ≠ ${stages}`);
          if (new Set(words.map((x) => x.toLocaleLowerCase())).size !== words.length) fails.push('two bank words repeat');
          if (banner.getBoundingClientRect().bottom > sr.top + 0.6) fails.push('the bank is not above the diagram');
          [...banner.querySelectorAll('.ws-bankword')].forEach((s) => { if (parseFloat(getComputedStyle(s).fontSize) < 14 - 0.6) fails.push('bank word < 14 px'); });
        }
        if (root.querySelector('img')) fails.push('a picture on the water-cycle face (the diagram is line art only)');
        // sparse: top-anchored (checked above) and the stage reaches the 600 floor
        if (contentH() < 600) fails.push(`stage ${Math.round(contentH())} px < the 600 floor (sparse)`);
        aboveFoot(lanes, 'lane');
        return fails;
      }

      /* ---------------- F5 forecast ---------------- */
      if (layout === 'forecast') {
        const asks = +root.dataset.lcsAsks, askBy = root.dataset.lcsAskBy, symbolPx = Math.max(56, +root.dataset.lcsSymbolPx || 0), chipH = Math.max(44, +root.dataset.lcsChipH || 0);
        const strips = [...root.querySelectorAll('[data-lcs-strip]')];
        if (strips.length !== 1) { fails.push(`${strips.length} strips ≠ 1`); return fails; }
        const days = [...strips[0].querySelectorAll('[data-lcs-fday]')];
        if (days.length !== 5) fails.push(`${days.length} strip days ≠ 5`);
        const stripIdx = days.map((d) => +d.dataset.lcsFday), stripConcepts = days.map((d) => d.dataset.lcsConcept), headers = [];
        stripIdx.forEach((v, i) => { if (i && v <= stripIdx[i - 1]) fails.push(`strip days ${stripIdx.join(',')} are not ascending`); });
        days.forEach((d, i) => {
          const what = `strip day ${i + 1}`;
          const c = d.dataset.lcsConcept;
          if (!KEYS.includes(c)) fails.push(`${what}: concept "${c}"`);
          const imgs = d.querySelectorAll('img');
          if (imgs.length !== 1) fails.push(`${what}: ${imgs.length} pictures`); else pic(imgs[0], what, symbolPx, 'weather', NOUN_OF[c]);
          const pill = d.querySelector('[data-lcs-fday-name]');
          const name = pill ? pill.textContent.trim() : '';
          if (!name) fails.push(`${what}: no day name`);
          if (pill && clipped(pill)) fails.push(`${what}: the name "${name}" is clipped`);
          if (pill) { const pr = pill.getBoundingClientRect(), cr = d.getBoundingClientRect(); if (pr.left < cr.left - 0.6 || pr.right > cr.right + 0.6) fails.push(`${what}: the name pill "${name}" (${Math.round(pr.width)} px) runs past its ${Math.round(cr.width)} px cell`); }
          headers.push(name);
        });
        if (new Set(stripConcepts).size !== stripConcepts.length) fails.push(`strip concepts ${stripConcepts.join(',')} repeat (an ask would have two days)`);
        if (new Set(headers).size !== headers.length) fails.push('two strip headers print the same name');
        const qs = [...root.querySelectorAll('[data-lcs-q]')];
        if (qs.length !== asks) fails.push(`${qs.length} questions ≠ stamp ${asks}`);
        if (asks < 2 || asks > 4) fails.push(`asks ${asks} outside 2..4`);
        const qConcepts = [], answerAt = [];
        qs.forEach((q, i) => {
          const what = `question ${i + 1}`;
          const c = q.dataset.lcsConcept;
          if (!KEYS.includes(c)) fails.push(`${what}: concept "${c}"`);
          qConcepts.push(c);
          const hits = stripConcepts.filter((x) => x === c).length;
          if (hits !== 1) fails.push(`${what}: "${c}" appears ${hits} times in the strip (one day exactly)`);
          if (askBy === 'word') {
            const t = q.querySelector('[data-lcs-q-text]');
            const text = t ? t.textContent.trim() : '';
            if (!text) fails.push(`${what}: no question text`);
            if (t && clipped(t)) fails.push(`${what}: the question is clipped`);
            if (t && parseFloat(getComputedStyle(t).fontSize) < 16 - 0.6) fails.push(`${what}: question < 16 px`);
            if (t && t.getBoundingClientRect().height > 32) fails.push(`${what}: the question wraps`);
            headers.forEach((h) => { if (h && new RegExp('(?<!\\p{L})' + h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu').test(text)) fails.push(`${what}: names the day "${h}" (a question naming a day is the answer printed)`); });
            if (q.querySelector('[data-lcs-badge]')) fails.push(`${what}: a symbol badge on a word ask`);
          } else {
            const b = q.querySelector('[data-lcs-badge]');
            if (!b || b.dataset.lcsConcept !== c) fails.push(`${what}: no symbol badge for "${c}"`); else pic(b.querySelector('img'), what, 44, 'weather', NOUN_OF[c]);
            if (q.querySelector('[data-lcs-q-text]')) fails.push(`${what}: a text on a symbol ask`);
          }
          const cs = [...q.querySelectorAll('[data-lcs-dchip]')];
          if (cs.length !== 5) fails.push(`${what}: ${cs.length} day chips ≠ 5`);
          if (cs.map((x) => +x.dataset.lcsDchip).join() !== stripIdx.join()) fails.push(`${what}: chip indices ${cs.map((x) => x.dataset.lcsDchip).join(',')} ≠ the strip ${stripIdx.join(',')}`);
          const correct = cs.filter((x) => x.dataset.lcsCorrect === '1');
          if (correct.length !== 1) fails.push(`${what}: ${correct.length} correct chips ≠ 1`);
          else {
            const at = stripIdx[stripConcepts.indexOf(c)];
            if (+correct[0].dataset.lcsDchip !== at) fails.push(`${what}: the correct chip is day ${correct[0].dataset.lcsDchip}, the strip carries "${c}" on day ${at}`);
            answerAt.push(at);
          }
          cs.forEach((x, j) => {
            const text = x.textContent.trim();
            if (text !== headers[j]) fails.push(`${what}: chip ${j + 1} prints "${text}" ≠ the strip header "${headers[j]}"`);
            const r = x.getBoundingClientRect();
            if (r.height < chipH - 0.6) fails.push(`${what}: chip ${j + 1} ${Math.round(r.height)} px high < ${chipH}`);
            if (parseFloat(getComputedStyle(x).fontSize) < 16 - 0.6) fails.push(`${what}: chip text < 16 px`);
            if (clipped(x)) fails.push(`${what}: chip "${text}" is clipped`);
          });
          const rowEl = q.querySelector('[data-lcs-dchips]');
          if (rowEl && rowEl.scrollWidth > rowEl.clientWidth + 0.6) fails.push(`${what}: the pill row overflows its lane (${rowEl.scrollWidth} > ${rowEl.clientWidth})`);
          // sparse: the lane's blank (inner height minus content) <= 90 px
          const qr = q.getBoundingClientRect();
          const askH = q.children[0] ? q.children[0].getBoundingClientRect().height : 0;
          const pillH = cs.length ? Math.max(...cs.map((x) => x.getBoundingClientRect().height)) : 0;
          const blank = qr.height - 28 - askH - 8 - pillH;
          if (blank > 90) fails.push(`${what}: ${Math.round(blank)} px of blank inside the lane > 90 (sparse)`);
        });
        if (new Set(qConcepts).size !== qConcepts.length) fails.push(`question concepts ${qConcepts.join(',')} repeat`);
        if (answerAt.length === asks && answerAt.every((v, i) => i === 0 || v > answerAt[i - 1])) fails.push(`the answer days ${answerAt.join(',')} are in Mon..Fri order`);
        if (answerAt.length === asks && new Set(answerAt).size === 1) fails.push('every answer is the same day');
        fills('forecast');
        aboveFoot(qs, 'question');
        return fails;
      }
      return [`unknown layout "${layout}"`];
    });
  },

  /** Re-derives the whole base from the stamps + geometry (runs in page.evaluate: no require). */
  async verify(page) {
    const layout = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-weather-symbols]'); return r ? (r.dataset.lcsLayout || null) : null; });
    if (layout && layout !== 'base') return this._verifyFace(page);
    return page.evaluate(() => {
      const fails = [];
      const KEYS = ['sun', 'cloud', 'rain', 'storm', 'snow', 'rainbow'];
      const NOUN_OF = { sun: 'sunny', cloud: 'cloudy', rain: 'rainy', storm: 'thunderstorm', snow: 'snowflake', rainbow: 'rainbow' };
      const GEAR = ['scarf', 't-shirt', 'sunglasses', 'mittens', 'umbrella', 'raincoat', 'hot', 'cold'];
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const WORD_RE = /^[\p{L}][\p{L}'’-]*$/u;
      const root = document.querySelector('[data-ws-content][data-lcs-weather-symbols]');
      if (!root) return ['no weather-symbols root'];
      const layout = root.dataset.lcsLayout;
      if (layout !== 'base') return [`layout "${layout}" is not the base`];
      if (document.querySelector('[data-lcs-answer]')) fails.push('a [data-lcs-answer] stamp prints an answer');
      const pairs = +root.dataset.lcsPairs, distractors = +root.dataset.lcsDistractors || 0;
      const iconMin = Math.max(56, +root.dataset.lcsIconPx || 0), wordMin = Math.max(18, +root.dataset.lcsWordPx || 0);
      const badges = [...root.querySelectorAll('[data-lcs-col="symbols"] [data-lcs-badge]')];
      const tiles = [...root.querySelectorAll('[data-lcs-col="words"] [data-lcs-tile]')];
      if (badges.length !== pairs) fails.push(`${badges.length} badges ≠ pairs stamp ${pairs}`);
      if (badges.length < 4 || badges.length > 6) fails.push(`${badges.length} badges outside 4..6`);
      if (tiles.length !== pairs + distractors) fails.push(`${tiles.length} tiles ≠ ${pairs} + ${distractors} distractors`);
      if (tiles.length > 8) fails.push(`${tiles.length} tiles > the K ceiling 8`);
      // badges: distinct concepts of the six, ONE picture each (dir weather, file = the concept's noun), round, no text
      const left = [];
      badges.forEach((el, i) => {
        const what = `badge ${i + 1}`;
        const c = el.dataset.lcsConcept;
        if (!KEYS.includes(c)) fails.push(`${what}: concept "${c}"`);
        left.push(c);
        const imgs = el.querySelectorAll('img');
        if (imgs.length !== 1) fails.push(`${what}: ${imgs.length} pictures`);
        else {
          const im = imgs[0];
          if (!im.complete || im.naturalWidth === 0) fails.push(`${what}: picture broken`);
          if (im.getAttribute('alt')) fails.push(`${what}: alt names the picture`);
          const parts = decodeURIComponent(im.src).split('/');
          const dir = parts[parts.length - 2] || '';
          const file = parts[parts.length - 1].replace(/@\dx\.webp$/, '').replace(/\.\w+$/, '');
          if (dir !== 'weather') fails.push(`${what}: picture dir "${dir}" ≠ weather`);
          if (BW.test(dir)) fails.push(`${what}: picture from a B&W directory "${dir}"`);
          if (file !== NOUN_OF[c]) fails.push(`${what}: picture "${file}" ≠ the ${c} symbol "${NOUN_OF[c]}"`);
          if (GEAR.includes(file)) fails.push(`${what}: a gear picture "${file}" on the base`);
          const r = im.getBoundingClientRect();
          if (Math.min(r.width, r.height) < iconMin - 0.6) fails.push(`${what}: icon ${Math.round(Math.min(r.width, r.height))} px < ${iconMin}`);
        }
        const br = el.getBoundingClientRect();
        if (Math.min(br.width, br.height) < 56) fails.push(`${what}: badge ${Math.round(br.width)} px < 56`);
        if (Math.abs(br.width - br.height) > 0.6) fails.push(`${what}: not square (${Math.round(br.width)} x ${Math.round(br.height)})`);
        const cs = getComputedStyle(el);
        if (parseFloat(cs.borderTopLeftRadius) < br.width / 2 - 0.6) fails.push(`${what}: not round (radius ${cs.borderTopLeftRadius})`);
        if (el.textContent.trim()) fails.push(`${what}: prints text`);
        if (!el.querySelector('.ws-match-dot--right')) fails.push(`${what}: no dot`);
      });
      if (new Set(left).size !== left.length) fails.push(`badge concepts ${left.join(',')} repeat`);
      // tiles: the concepts are a permutation of the badges' (+ exactly `distractors` extra with no concept), a word each, no picture, no fixed point, not the reverse
      const rightConcepts = [];
      const printed = [];
      let extra = 0;
      tiles.forEach((el, i) => {
        const what = `tile ${i + 1}`;
        const isDistractor = el.dataset.lcsDistractor === '1';
        const c = el.dataset.lcsConcept;
        if (isDistractor) { extra++; if (c) fails.push(`${what}: a distractor carries a concept "${c}"`); }
        else {
          if (!KEYS.includes(c)) fails.push(`${what}: concept "${c}"`);
          rightConcepts.push(c);
          if (i < left.length && left[i] === c) fails.push(`row ${i + 1}: the "${c}" tile sits straight across from its badge`);
        }
        if (el.querySelector('img')) fails.push(`${what}: a picture on a word tile`);
        const text = el.textContent.trim();
        const word = el.dataset.lcsWord || '';
        if (!text) fails.push(`${what}: no word printed`);
        if (text !== word) fails.push(`${what}: printed "${text}" ≠ stamped word "${word}"`);
        if (!WORD_RE.test(text)) fails.push(`${what}: "${text}" is not a single token or hyphenated`);
        printed.push(text.toLocaleLowerCase());
        const span = el.querySelector('span:not(.ws-match-dot)');
        const px = span ? parseFloat(getComputedStyle(span).fontSize) : 0;
        if (px < wordMin - 0.6) fails.push(`${what}: word ${px} px < ${wordMin}`);
        if (span && span.scrollWidth > span.clientWidth + 0.6) fails.push(`${what}: word clipped`);
        const inner = el.clientWidth - 24;
        if (span && span.getBoundingClientRect().width > inner + 0.6) fails.push(`${what}: word ${Math.round(span.getBoundingClientRect().width)} px > the ${inner} px tile inner (refuse the word, never shrink it)`);
        if (!el.querySelector('.ws-match-dot--left')) fails.push(`${what}: no dot`);
      });
      if (extra !== distractors) fails.push(`${extra} distractor tiles ≠ stamp ${distractors}`);
      if (new Set(printed).size !== printed.length) fails.push('two tiles print the same word');
      if ([...rightConcepts].sort().join() !== [...left].sort().join()) fails.push(`tile concepts ${rightConcepts.join(',')} are not the badge concepts ${left.join(',')}`);
      if (rightConcepts.length === left.length && rightConcepts.every((c, i) => c === left[left.length - 1 - i])) fails.push('the word column is the reversed badge order');
      // no gear picture anywhere on the page, no text inside a badge column
      document.querySelectorAll('.ws-page img').forEach((im) => {
        const file = decodeURIComponent(im.src).split('/').pop().replace(/@\dx\.webp$/, '').replace(/\.\w+$/, '');
        if (GEAR.includes(file)) fails.push(`a gear picture "${file}" on the page`);
      });
      // geometry: the stage inside the body above the footer; a clear pencil zone between the dots
      const body = document.querySelector('[data-lcs-body]');
      const foot = document.querySelector('.ws-foot');
      const rr = root.getBoundingClientRect();
      if (body) { const b = body.getBoundingClientRect(); if (rr.left < b.left - 0.6 || rr.right > b.right + 0.6) fails.push('stage outside the body column'); }
      if (foot) { const ft = foot.getBoundingClientRect().top; [...badges, ...tiles].forEach((el, i) => { if (el.getBoundingClientRect().bottom > ft + 0.6) fails.push(`item ${i + 1} reaches into the footer band`); }); }
      const ld = badges[0] && badges[0].querySelector('.ws-match-dot--right'), rd = tiles[0] && tiles[0].querySelector('.ws-match-dot--left');
      if (ld && rd) { const zone = rd.getBoundingClientRect().left - ld.getBoundingClientRect().right; if (zone < 180) fails.push(`line zone ${Math.round(zone)} px < 180 (design 213)`); }
      return fails;
    });
  },
};

const wrapped = withFixedTheme(type, THEME);
// tools/gen-b4var-specs.js emits every face as `{ ...base, id, slug, difficulty, i18n }` — an object spread copies OWN
// enumerable properties only, and withFixedTheme's wrapper owns just `themeAxis` + `build`; every method the wrapper's
// build / verify reach through `this` (_buildWith, _buildFace, verify, …) is hoisted here so a face spec carries them too.
// Output unchanged (the same functions); tools/b3-baseline.js --check is the proof.
for (const k of Object.keys(type)) if (!Object.prototype.hasOwnProperty.call(wrapped, k)) wrapped[k] = type[k];
module.exports = wrapped;
module.exports._type = type;   // the unwrapped spec (the gate's poison seam; withFixedTheme's Object.create shares every method)
