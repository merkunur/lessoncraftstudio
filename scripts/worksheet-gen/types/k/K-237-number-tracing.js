/**
 * K-237 — Number tracing 0-9 with PER-LOCALE digit forms: continental
 * hooked 1 + crossed 7 for the 10 non-EN locales, plain forms for en (a
 * German teacher rejects an uncrossed 7 — the exact live platform gap the
 * digit-strokes dataset closes). Centerline stroke paths with direction
 * arrows + stroke-order badges on school lines: one solid teal model, then
 * dashed repetitions. pt "números pontilhados" / de "Zahlen schreiben
 * lernen" / fr "écriture des chiffres GS".
 * d2 (published): 0-9 ladder, one model + dashed repetitions.
 *
 * Level Set 2026-10-13 (the audit's recipe: levels FADE the trace — dashed > dot-only > blank):
 *  - range pages (this page and its faces K-249/250/251, own builds K-252/253): d1 = every slot traced from its
 *    own orange dot; d3 = model, one trace, one start-dot-only slot, two blank slots. `modes` on a difficulty
 *    entry selects digitFadeLane; the published d2 entries carry no `modes` and keep the old lane byte for byte.
 *  - per-number pages: a NEW copy carrying a unit (one number 0-20) prints that number on every lane at the
 *    PER_NUMBER level (big + numbered strokes / core with a blank slot / small fade). Strings per number:
 *    data/tracing/number-tracing-levelset.json (digit = 0-9, number = 10-20).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { strokeGlyphLane, digitFadeLane } = require('../../primitives/trace-path.js');
const { FORMS, FORM_BY_LOCALE, BOX } = require('../../data/tracing/digit-strokes.js');

let _ls;
function levelSetData() {
  if (_ls === undefined) {
    const f = path.join(__dirname, '..', '..', 'data', 'tracing', 'number-tracing-levelset.json');
    _ls = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null;
  }
  return _ls;
}
const NUMBER_UNITS = Array.from({ length: 21 }, (_, n) => String(n));
const formFor = (locale) => FORMS[FORM_BY_LOCALE[(locale || 'en').slice(0, 2)] || 'continental'];
/** the stroke glyphs of a number: one digit, or tens + ones for 10-20 */
const glyphsOf = (form, n) => (n < 10 ? [form[n]] : [form[Math.floor(n / 10)], form[n % 10]]);

/** Per-number page levels. `pair` = the 10-20 sizes (two glyphs per slot). */
const PER_NUMBER = {
  1: { lanes: 5, glyphH: 104, laneH: 152, pair: { glyphH: 84, laneH: 128 }, modes: ['model', 'trace', 'trace', 'trace'], badges: true },
  2: { lanes: 6, glyphH: 74, laneH: 108, pair: { glyphH: 70, laneH: 104 }, modes: ['model', 'trace', 'dash', 'dash', 'empty'], badges: false },
  3: { lanes: 8, glyphH: 56, laneH: 80, pair: { glyphH: 56, laneH: 80 }, modes: ['model', 'trace', 'dot', 'empty', 'empty'], badges: false },
};
const FADE1 = (n) => ['model', ...Array(n).fill('trace')];
const FADE3 = ['model', 'trace', 'dot', 'empty', 'empty'];
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/** One range lane through the fading lane (new pages only). */
function fadeLane(form, n, d, laneW) {
  return digitFadeLane({
    glyphs: glyphsOf(form, n), box: BOX, w: laneW, h: d.laneH, glyphH: d.glyphH,
    modes: d.modes, badges: !!d.badges, number: n, label: `trace number ${n}`,
  });
}

module.exports = {
  id: 'K-237',
  slug: 'number-tracing-0-9',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'number-tracing',
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: () => NUMBER_UNITS,
    exemplar: () => NUMBER_UNITS[0],
    tokens: (unit) => ({ N: unit, UNIT: unit }),
  },
  // the per-number title + level instruction (native, data file); a range page (no unit) keeps its strings
  copyStrings(strings, { locale, unit, difficulty }) {
    if (unit == null) return strings;
    const x = (levelSetData() || {})[(locale || 'en').slice(0, 2)];
    const f = x && x[+unit < 10 ? 'digit' : 'number'];
    if (!f || !f.title || !f['i' + difficulty]) throw new Error(`K-237: no per-number strings for ${locale} level ${difficulty}`);
    const { printTitle, ...rest } = strings;
    void printTitle;
    return { ...rest, title: f.title.replace('{N}', unit), instruction: f['i' + difficulty] };
  },
  PER_NUMBER, NUMBER_UNITS, FADE1, FADE3,
  difficulty: {
    1: { digits: DIGITS, glyphH: 52, laneH: 71, modes: FADE1(4) },
    2: { digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], glyphH: 52, laneH: 71, reps: 5 },
    3: { digits: DIGITS, glyphH: 52, laneH: 71, modes: FADE3 },
  },
  i18n: {
    en: {
      title: 'Trace the Numbers 0 to 9',
      instruction: 'Trace each number. Start at the orange dot and follow the arrows.',
    },
  },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const form = formFor(locale);
    void ctx;
    if (unit != null) return this._buildNumber(difficulty, form, +unit);
    const laneW = 660;
    const lanes = d.digits.map((digit) => {
      const lane = d.modes ? fadeLane(form, digit, d, laneW) : strokeGlyphLane({
        strokes: form[digit], box: BOX, w: laneW, h: d.laneH, glyphH: d.glyphH,
        reps: d.reps, label: `trace digit ${digit}`,
        emptyLast: !!d.emptyLast, // nt20-VAR K-251: trace-then-write blank slot
      });
      return `<div class="ws-trace-lane" style="display:flex;justify-content:center" data-lcs-digit-lane="${digit}">${lane.svg}</div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly">${lanes.join('')}</div>`,
      meta: {},
    };
  },

  /** One number on every lane (Level Set). Throws when a level cannot fit its slots — never shrinks silently. */
  _buildNumber(difficulty, form, n) {
    const P = PER_NUMBER[difficulty];
    if (!P) throw new Error(`K-237: no per-number level ${difficulty}`);
    if (!(n >= 0 && n <= 20)) throw new Error(`K-237: ${n} is not a page number (0-20)`);
    const size = n < 10 ? P : { ...P, ...P.pair };
    const lanes = Array.from({ length: P.lanes }, () => {
      const lane = digitFadeLane({
        glyphs: glyphsOf(form, n), box: BOX, w: 660, h: size.laneH, glyphH: size.glyphH,
        modes: P.modes, badges: P.badges, number: n, label: `trace number ${n}`,
      });
      return `<div class="ws-trace-lane" style="display:flex;justify-content:center" data-lcs-digit-lane="${n}">${lane.svg}</div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly" data-lcs-per-number="${n}">${lanes.join('')}</div>`,
      meta: { unit: String(n) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lanes = document.querySelectorAll('[data-lcs-digit-lane]');
      const perNumber = document.querySelector('[data-lcs-per-number]');
      if (lanes.length < 4) fails.push(`only ${lanes.length} lanes`);
      const seen = new Set();
      lanes.forEach((lane, i) => {
        const digit = lane.dataset.lcsDigitLane;
        if (perNumber) {
          if (digit !== perNumber.dataset.lcsPerNumber) fails.push(`lane ${i + 1}: ${digit} on the ${perNumber.dataset.lcsPerNumber} page`);
        } else if (seen.has(digit)) fails.push(`lane ${i + 1}: duplicate digit`);
        seen.add(digit);
        const fade = lane.querySelector('[data-lcs-prim="trace-number"]');
        if (fade) {
          // Level Set fading lane: every slot does what its mode says
          if (fade.dataset.lcsNumber !== digit) fails.push(`lane ${i + 1}: draws ${fade.dataset.lcsNumber}, want ${digit}`);
          const modes = fade.dataset.lcsModes.split(',');
          const strokes = +fade.dataset.lcsStrokes;
          if (+fade.dataset.lcsGlyphs !== (+digit < 10 ? 1 : 2)) fails.push(`lane ${i + 1}: ${fade.dataset.lcsGlyphs} glyphs for ${digit}`);
          const reps = [...fade.querySelectorAll(':scope > g[data-lcs-rep-mode]')];
          const drawn = modes.filter((m) => m !== 'empty');
          if (reps.length !== drawn.length) fails.push(`lane ${i + 1}: ${reps.length} slots drawn, want ${drawn.length}`);
          if (modes[0] !== 'model') fails.push(`lane ${i + 1}: first slot is not the model`);
          const empties = modes.filter((m) => m === 'empty').length;
          if (empties !== +(fade.dataset.lcsEmptySlot || 0)) fails.push(`lane ${i + 1}: empty-slot stamp wrong`);
          if (modes.some((m, k) => m === 'empty' && modes.slice(k).some((x) => x !== 'empty'))) fails.push(`lane ${i + 1}: a blank slot before a drawn one`);
          reps.forEach((g) => {
            const mode = g.dataset.lcsRepMode, rep = g.dataset.lcsRep;
            const paths = [...g.querySelectorAll('path')];
            const dashed = paths.filter((p) => p.getAttribute('stroke-dasharray'));
            const dots = fade.querySelectorAll(`circle[data-lcs-rep="${rep}"]`).length;
            const arrows = fade.querySelectorAll(`polygon[data-lcs-rep="${rep}"]`).length;
            if (mode === 'model' && (paths.length !== strokes || dashed.length)) fails.push(`lane ${i + 1}: model not ${strokes} solid strokes`);
            if ((mode === 'trace' || mode === 'dash') && (paths.length !== strokes || dashed.length !== strokes)) fails.push(`lane ${i + 1} slot ${+rep + 1}: not ${strokes} dashed strokes`);
            if (mode === 'trace' && (!dots || arrows !== strokes)) fails.push(`lane ${i + 1} slot ${+rep + 1}: trace without its dot/arrows`);
            if (mode === 'dash' && (dots || arrows)) fails.push(`lane ${i + 1} slot ${+rep + 1}: plain dashed slot carries guides`);
            if (mode === 'dot' && (paths.length || !dots || arrows)) fails.push(`lane ${i + 1} slot ${+rep + 1}: dot slot must show only start dots`);
          });
          // badges: inside the lane, clear of dots, arrows and each other (the 2026-10-13 4/5/9 defect)
          const box = fade.getBoundingClientRect();
          const badgeEls = [...fade.querySelectorAll('circle[data-lcs-badge]')];
          const others = [...fade.querySelectorAll('circle:not([data-lcs-badge]), polygon')];
          badgeEls.forEach((b) => {
            const r = b.getBoundingClientRect();
            if (r.left < box.left - 0.5 || r.top < box.top - 0.5 || r.right > box.right + 0.5 || r.bottom > box.bottom + 0.5) fails.push(`lane ${i + 1}: badge ${b.dataset.lcsBadge} cut off`);
            const hit = (o) => { const q = o.getBoundingClientRect(); return q.left < r.right - 0.5 && q.right > r.left + 0.5 && q.top < r.bottom - 0.5 && q.bottom > r.top + 0.5; };
            if (others.some(hit) || badgeEls.some((o) => o !== b && hit(o))) fails.push(`lane ${i + 1}: badge ${b.dataset.lcsBadge} overlaps a dot, arrow or badge`);
          });
          if (fade.querySelectorAll('line').length < 3) fails.push(`lane ${i + 1}: missing school lines`);
          return;
        }
        const svg = lane.querySelector('[data-lcs-prim="trace-digit"]');
        if (!svg) { fails.push(`lane ${i + 1}: no glyph svg`); return; }
        const reps = +svg.dataset.lcsReps;
        const strokes = +svg.dataset.lcsStrokes;
        const groups = svg.querySelectorAll('g');
        if (groups.length !== reps) fails.push(`lane ${i + 1}: ${groups.length} reps != ${reps}`);
        groups.forEach((g, j) => {
          const paths = g.querySelectorAll('path');
          if (paths.length !== strokes) fails.push(`lane ${i + 1} rep ${j + 1}: ${paths.length} strokes != ${strokes}`);
          const dashed = [...paths].filter((p) => p.getAttribute('stroke-dasharray'));
          if (j === 0 && dashed.length !== 0) fails.push(`lane ${i + 1}: model is dashed`);
          if (j > 0 && dashed.length !== paths.length) fails.push(`lane ${i + 1} rep ${j + 1}: not fully dashed`);
        });
        // stroke-order badges never on top of one another (2026-10-13: 4, 5, 9 hid badge 1 under badge 2)
        const bs = [...svg.querySelectorAll('circle[data-lcs-badge]')].map((b) => b.getBoundingClientRect());
        bs.forEach((r, k) => bs.slice(k + 1).forEach((q) => {
          if (q.left < r.right - 0.5 && q.right > r.left + 0.5 && q.top < r.bottom - 0.5 && q.bottom > r.top + 0.5) fails.push(`lane ${i + 1}: stroke-order badges overlap`);
        }));
        // school lines present: ≥3 horizontal rules
        if (svg.querySelectorAll('line').length < 3) fails.push(`lane ${i + 1}: missing school lines`);
        // the first trace rep carries the start dot
        if (!svg.querySelector('circle')) fails.push(`lane ${i + 1}: no start dot`);
      });
      return fails;
    });
  },
};
