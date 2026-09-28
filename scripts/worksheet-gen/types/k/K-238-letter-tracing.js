/**
 * K-238 — Capital letter tracing (single-stroke dashed CENTRELINES on school
 * lines; one solid model, then dashed repetitions carrying a coral start dot,
 * a direction arrow and stroke-order badges). Per-locale letter sets — the d3
 * page features the locale's OWN letters (Ä Ö Ü / Å Ä Ö / Æ Ø Å / Ñ …),
 * the page an English-only competitor cannot print. pt "alfabeto
 * pontilhado" / de "Buchstaben nachspuren".
 * d1: A-D large · d2: A-F ladder · d3: specials + continuation letters.
 *
 * Was `glyphLane` (a stroked font OUTLINE) until 2026-09-01, which painted two
 * dashed contours per stem — the double-line defect. See letter-strokes.js.
 */
'use strict';
const { strokeLetterLane } = require('../../primitives/trace-path.js');
const { LETTER_SETS, LOWERCASE_SETS } = require('../../data/tracing/letter-sets.js');
const fs = require('fs');
const path = require('path');

/*
 * Level Set 2026-09-28 (operator: "include all the capital and lowercase letters"; ruling: one page per letter).
 * A NEW copy of K-238 carries a unit = one letter of the locale's school alphabet (capital id, e.g. "A", "IJ",
 * "É"; "ß" is a lowercase-only page) and prints that letter's capital lanes, then its lowercase lanes. The
 * published page (level 2, copy 1, no unit) is the A–F range page, untouched. Titles/instructions per locale:
 * data/tracing/letter-tracing-levelset.json (native panels; importer tools/level-set/import-ltr-panels.js).
 */
let _ls;
function levelSetData() {
  if (_ls === undefined) {
    const f = path.join(__dirname, '..', '..', 'data', 'tracing', 'letter-tracing-levelset.json');
    _ls = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null;
  }
  return _ls;
}
// letters a panel asked for as their own page although our letter sets do not list them (fr panel: Ç ç, a real CP difficulty)
const EXTRA_UNITS = { fr: ['Ç'], pt: ['Ç'] };   // pt panel: Ç ç is taught in handwriting in 1º ano
/** Every letter of the locale's alphabet as a page unit: capitals + specials, then lowercase-only letters (de ß). */
function letterUnits(loc) {
  const cap = LETTER_SETS[loc] || LETTER_SETS.en, low = LOWERCASE_SETS[loc] || LOWERCASE_SETS.en;
  const units = [...cap.alphabet, ...cap.specials.filter((c) => !cap.alphabet.includes(c))];
  for (const c of EXTRA_UNITS[loc] || []) if (!units.includes(c)) units.push(c);
  for (const c of [...low.alphabet, ...low.specials]) if (!units.some((u) => u.toLocaleLowerCase(loc) === c)) units.push(c);
  return units;
}
/** The two forms a unit prints: capital (null for ß) and lowercase. */
function unitForms(unit, loc) {
  if (unit === 'ß') return { cap: null, low: 'ß' };
  return { cap: unit, low: unit.toLocaleLowerCase(loc) };
}
/** Per-letter page layouts: lanes per case, size, repetitions, blank slots — each level changes the task. */
const PER_LETTER = {
  1: { caps: 2, lows: 2, glyphH: 104, laneH: 152, reps: 4, emptyCount: 1 },   // big, numbered strokes
  2: { caps: 3, lows: 3, glyphH: 74, laneH: 108, reps: 5, emptyCount: 1 },    // the core page's size
  3: { caps: 4, lows: 4, glyphH: 56, laneH: 80, reps: 5, emptyCount: 2 },     // small, two to write alone
};

module.exports = {
  id: 'K-238',
  slug: 'letter-tracing-capitals',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'letter-tracing',
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: (loc) => letterUnits((loc || 'en').slice(0, 2)),
    exemplar: (loc) => letterUnits((loc || 'en').slice(0, 2))[0],
    tokens: (unit, loc) => {
      const l = (loc || 'en').slice(0, 2), f = unitForms(unit, l);
      return { U: f.cap || f.low, L: f.low, UNIT: f.cap ? `${f.cap} ${f.low}` : f.low };
    },
  },
  // the per-letter title (native template with {UNIT}); a range page (no unit) keeps its published strings
  copyStrings(strings, { locale, unit }) {
    if (!unit) return strings;
    const x = (levelSetData() || {})[(locale || 'en').slice(0, 2)];
    if (!x || !x.title) throw new Error('K-238: no per-letter title for ' + locale);
    return { ...strings, title: x.title };
  },
  letterUnits, unitForms, PER_LETTER,
  difficulty: {
    1: { count: 4, glyphH: 104, laneH: 152, reps: 4, from: 0 },
    2: { count: 6, glyphH: 74, laneH: 108, reps: 5, from: 0 },
    3: { count: 6, glyphH: 74, laneH: 108, reps: 5, from: 'specials' },
  },
  i18n: {
    en: {
      title: 'Trace the Capital Letters',
      instruction: 'Trace each letter, then try one on your own on the empty line. Start at the orange dot and follow the arrows.',
    },
  },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    void ctx;
    if (unit) return this._buildLetter(difficulty, (locale || 'en').slice(0, 2), unit);
    // K-278 (the lowercase family) spreads this spec and flags its difficulty
    // levels `lowercase`, so both families share one build() and one verify().
    const sets = d.lowercase ? LOWERCASE_SETS : LETTER_SETS;
    const set = sets[(locale || 'en').slice(0, 2)] || sets.en;
    let letters;
    if (d.from === 'specials') {
      // filler letters may not repeat a special or any letter INSIDE one
      // (nl: the IJ digraph would otherwise sit beside bare I and J lanes)
      const rest = set.alphabet.filter((c) => !set.specials.some((s) => s === c || s.includes(c)));
      // nt20-VAR: locales with no special capitals (en, it) get the vowels —
      // a real query face — instead of a degenerate duplicate of the G-L page
      const vowels = (d.lowercase ? ['a', 'e', 'i', 'o', 'u'] : ['A', 'E', 'I', 'O', 'U']);
      const feature = set.specials.length ? set.specials : vowels.filter((v) => set.alphabet.includes(v));
      letters = set.specials.length
        ? [...feature, ...rest.slice(6, 6 + d.count)].slice(0, d.count)
        : feature;
    } else {
      // nt20-VAR: `pool:'rest'` slices the base alphabet with the locale's own
      // letters removed (they own the specials page); `toEnd` covers to the
      // pool's end (min 6 / max 9 lanes), clamped so short alphabets (it: 21
      // letters) still render a full page instead of a 3-lane verify() fail.
      const pool = d.pool === 'rest' ? set.alphabet.filter((c) => !set.specials.includes(c)) : set.alphabet;
      let from = d.from;
      let count = d.count;
      if (d.toEnd) {
        count = Math.min(9, Math.max(6, pool.length - from));
        from = Math.max(0, Math.min(from, pool.length - count));
      } else {
        from = Math.min(from, Math.max(0, pool.length - count));
      }
      letters = pool.slice(from, from + count);
    }
    const laneW = 660;
    const lanes = letters.map((ch) => {
      // last slot stays empty — the "try one on your own" spot the instruction promises
      const lane = strokeLetterLane({
        text: ch, w: laneW, h: d.laneH, glyphH: d.glyphH, reps: d.reps,
        emptyLast: true, emptyCount: d.emptyCount, lowercase: !!d.lowercase,
      });
      return `<div class="ws-trace-lane" style="display:flex;justify-content:center" data-lcs-letter="${ch}">${lane.svg}</div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly">${lanes.join('')}</div>`,
      meta: {},
    };
  },

  /** One letter, both cases (Level Set). Throws when a level cannot fit its lanes — never shrinks silently. */
  _buildLetter(difficulty, loc, unit) {
    const P = PER_LETTER[difficulty];
    if (!P) throw new Error(`K-238: no per-letter level ${difficulty}`);
    if (!letterUnits(loc).includes(unit)) throw new Error(`K-238: "${unit}" is not a letter of the ${loc} alphabet`);
    const f = unitForms(unit, loc);
    const plan = f.cap ? [...Array(P.caps).fill({ t: f.cap, lc: false }), ...Array(P.lows).fill({ t: f.low, lc: true })]
      : Array(P.caps + P.lows).fill({ t: f.low, lc: true });
    const lanes = plan.map(({ t, lc }) => {
      const lane = strokeLetterLane({ text: t, w: 660, h: P.laneH, glyphH: P.glyphH, reps: P.reps, emptyCount: P.emptyCount, lowercase: lc });
      return `<div class="ws-trace-lane" style="display:flex;justify-content:center" data-lcs-letter="${t}">${lane.svg}</div>`;
    });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly" data-lcs-per-letter="${unit}">${lanes.join('')}</div>`,
      meta: { letters: [...new Set(plan.map((x) => x.t))], unit },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lanes = document.querySelectorAll('[data-lcs-letter]');
      const perLetter = document.querySelector('[data-lcs-per-letter]');
      if (lanes.length < 4) fails.push(`only ${lanes.length} lanes`);
      const seen = new Set();
      lanes.forEach((lane, i) => {
        const ch = lane.dataset.lcsLetter;
        if (!perLetter && seen.has(ch)) fails.push(`lane ${i + 1}: duplicate letter`);
        seen.add(ch);
        const svg = lane.querySelector('[data-lcs-prim="trace-letter"]');
        if (!svg) { fails.push(`lane ${i + 1}: no letter svg`); return; }
        // the rendered glyph must be the letter this lane claims
        if (svg.dataset.lcsText !== ch) fails.push(`lane ${i + 1}: renders "${svg.dataset.lcsText}", want "${ch}"`);
        // a letter is CENTRELINE strokes, never a stroked font outline: any
        // <text> here other than a stroke-order badge is the double-line defect
        const reps = +svg.dataset.lcsReps;
        const perRep = +svg.dataset.lcsStrokes;
        const groups = [...svg.querySelectorAll(':scope > g')];
        if (groups.length !== reps) fails.push(`lane ${i + 1}: ${groups.length} reps, want ${reps}`);
        groups.forEach((g, j) => {
          const paths = [...g.querySelectorAll('path')];
          if (paths.length !== perRep) fails.push(`lane ${i + 1} rep ${j + 1}: ${paths.length} strokes, want ${perRep}`);
          paths.forEach((p) => {
            if (p.getAttribute('fill') !== 'none') fails.push(`lane ${i + 1} rep ${j + 1}: stroke is filled`);
            const dashed = !!p.getAttribute('stroke-dasharray');
            if (j === 0 && dashed) fails.push(`lane ${i + 1}: model is dashed, not solid`);
            if (j > 0 && !dashed) fails.push(`lane ${i + 1} rep ${j + 1}: not dashed`);
          });
        });
        // The instruction promises a start dot and arrows, so the first traced
        // repetition must carry them. Guides live at svg level (display
        // coordinates), NOT inside a rep group — see renderTextRep. One arrow
        // per inkable stroke; accent marks are deliberately unguided, and
        // coincident stroke starts share a single dot, so both counts are
        // bounded rather than exact.
        const arrows = svg.querySelectorAll('polygon').length;
        const dots = svg.querySelectorAll('circle').length;
        if (!arrows) fails.push(`lane ${i + 1}: no direction arrows`);
        if (arrows > perRep) fails.push(`lane ${i + 1}: ${arrows} arrows > ${perRep} strokes`);
        if (!dots) fails.push(`lane ${i + 1}: no start dot`);
        if (dots > perRep * 2) fails.push(`lane ${i + 1}: ${dots} guide circles, too many`);
        // 2026-09-28 (operator: stroke-order circles cut off): every badge whole inside its lane and clear of
        // the dots, arrows and other badges — measured on the rendered page
        const box = svg.getBoundingClientRect();
        const badgeEls = [...svg.querySelectorAll('circle[data-lcs-badge]')];
        const others = [...svg.querySelectorAll('circle:not([data-lcs-badge]), polygon')];
        badgeEls.forEach((b) => {
          const r = b.getBoundingClientRect();
          if (r.left < box.left - 0.5 || r.top < box.top - 0.5 || r.right > box.right + 0.5 || r.bottom > box.bottom + 0.5) fails.push(`lane ${i + 1}: badge ${b.dataset.lcsBadge} cut off by the lane`);
          const hit = (o) => { const q = o.getBoundingClientRect(); return q.left < r.right - 0.5 && q.right > r.left + 0.5 && q.top < r.bottom - 0.5 && q.bottom > r.top + 0.5; };
          if (others.some(hit) || badgeEls.some((o) => o !== b && hit(o))) fails.push(`lane ${i + 1}: badge ${b.dataset.lcsBadge} overlaps a dot, arrow or badge`);
        });
        if (svg.querySelectorAll('line').length < 3) fails.push(`lane ${i + 1}: missing school lines`);
        // the promised "try one on your own" empty slot must exist
        if (!svg.hasAttribute('data-lcs-empty-slot')) fails.push(`lane ${i + 1}: no empty writing slot`);
      });
      return fails;
    });
  },
};
