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
 * PHASE 2 (the faces) ride ONE additive `layout` knob (design §3; the K-322 /
 * K-355 shape): `d.layout` undefined = this base path, byte-identical;
 * 'write' | 'diary' | 'thermometer' | 'water-cycle' | 'forecast' dispatch to
 * `_buildFace` (NOT built in this commission — it refuses by name). The
 * landing `coordinate.mode` is the face's mode string (base = 'base').
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const { withFixedTheme } = require('../_shared/fixed-theme.js');
const C4 = require('../../templates/components-b4.js');
const GLOBAL = require('../../data/b4/weather-symbols-global.json');

const BANK = 'weather-symbols';
const THEME = 'weather';
const KEYS = ['sun', 'cloud', 'rain', 'storm', 'snow', 'rainbow'];
const D1_KEYS = ['sun', 'rain', 'snow', 'cloud'];
const FACES = ['write', 'diary', 'thermometer', 'water-cycle', 'forecast'];
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

  /* ------------------------------------------------------------ Phase 2 faces (NOT built in this commission) */
  _buildFace(bankData, d) {
    if (!FACES.includes(d.layout)) throw new Error(`K-356: unknown layout "${d.layout}"`);
    throw new Error(`K-356: face layout "${d.layout}" is Phase 2 — not built (the base carries the knob; see design §3)`);
  },

  /** Re-derives the whole base from the stamps + geometry (runs in page.evaluate: no require). */
  async verify(page) {
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
      if (layout !== 'base') return [`layout "${layout}" is not the base (the faces verify in Phase 2)`];
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

module.exports = withFixedTheme(type, THEME);
module.exports._type = type;   // the unwrapped spec (the gate's poison seam; withFixedTheme's Object.create shares every method)
