/**
 * emit/interactive-runtime.js — the screen version of a worksheet-gen page
 * (Level Set programme 2026-09-27; the FIRST worksheet-gen interactive runtime).
 *
 * Architecture = the 29 apps' (CLAUDE.md §14.1): the rendered page is the
 * backdrop image; a tap layer sits over it, positioned in % of the page, so it
 * scales with the viewport. Plain HTML + CSS + vanilla JS, self-contained,
 * iframe-safe, Pointer-agnostic (native <button>s: mouse, touch, keyboard).
 *
 * Kinds (the type declares `interactive.kind`; render-instance captures the geometry):
 *   tap-order  — the child taps the items in order; each tap writes the next number
 *                in the item's circle, a second tap takes it back (later numbers close
 *                up). Check turns every item green or red; all right → celebration.
 *   tap-choice — each item has options (article chips …); the child taps ONE per item
 *                (another tap switches it). Check marks the chosen option green or red.
 *   tap-select — each item is ONE tap target that toggles (tap every word that is a compound);
 *                the answer per item is true / false. Check (enabled once something is
 *                chosen) marks each chosen item green or red and each MISSED true item red.
 *   tap-spell  — each item has shuffled letter TILES and empty letter SLOTS (Level Set 2026-09-28, the
 *                spelling pages): a tapped tile writes its letter into the next empty slot and greys out;
 *                a tap on a filled slot gives back that letter and every later one. Check compares the
 *                spelled word with the answer (any tile with the same letter counts) and marks the item.
 *   tap-paint  — Color by Number (2026-10-04): the picture's own line drawing laid exactly over the page; the child taps a
 *                crayon in the key, then the parts to fill them. Check outlines each numbered part green or red.
 *   type-number — Number Walls (Level Set 2026-10-13, operator: "kids need to WRITE the answers, not choose an option"):
 *                the screen IS the printed page; every empty box on it is a write box laid exactly over it. Tap a box
 *                (it lights), type with the number pad under the page (or the keyboard: digits, Backspace, Enter /
 *                arrows = next box); the number appears inside the box in the page's own numerals. No options, no
 *                auto-advance and no length limit tied to the answer (both would tell its size) — the cap is the
 *                page's (ctx.maxDigits). Check when every box holds a number; each box turns green or red; "Try again"
 *                keeps the right numbers and empties the wrong ones.
 *   type-word  — Number Words (Level Set 2026-10-13): type-number for WORDS — the printed page, a write box over each
 *                line, a LETTER pad (the locale's whole alphabet + the characters its words use, ctx.keys) and the
 *                keyboard; the cap is the page's (ctx.maxChars). Check compares case-insensitively, exact spelling.
 *   set-clock  — Telling Time (Level Set 2026-10-14): the draw-the-hands pages; the child drags the hour and minute hands
 *                onto every empty clock face of the printed page (emit/interactive-set-clock.js).
 *   mark-grid  — Logic Grid Puzzles (Level Set 2026-10-15): tap a cell of the printed grid for a tick, again for a cross,
 *                again to clear; the ticks are graded one per row (emit/interactive-mark-grid.js).
 *   tap-edit   — sentences drawn LIVE as word buttons (not over the image: they must stay
 *                >= 44 px on a phone). A tool row — Aa and the level's marks — and a tap on a
 *                word: Aa toggles its capital, a mark goes after it (tap again = off). Check
 *                marks each sentence green or red. es shows the opening ¿ / ¡ automatically.
 *
 * UI strings come from REFERENCE TRANSLATIONS/translations-shared.js (the apps'
 * runtime* keys, all 11 locales) and are BAKED into the page (§14.11) and force-set
 * at init — no runtime dependency on any other file.
 *
 * DECK_BUNDLE.items[i] = { x, y, w, h, sx, sy, sw, sh, label } in % of the page;
 * the answer map (DECK_BUNDLE.answers) is on the page by necessity (it is checked
 * in the browser), exactly as the apps' bundles are.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let _shared = null;
function shared() {
  if (_shared) return _shared;
  const src = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'REFERENCE TRANSLATIONS', 'translations-shared.js'), 'utf8');
  const ctx = { window: {}, console: { warn() {}, log() {}, error() {} } };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  _shared = ctx.window.SHARED_TRANSLATIONS;
  if (!_shared || !_shared.en) throw new Error('interactive-runtime: translations-shared.js exposed no SHARED_TRANSLATIONS');
  return _shared;
}

/** The runtime strings for one locale — every key must exist (never an English fallback on a non-EN page). */
function runtimeStrings(locale) {
  const t = shared()[locale];
  if (!t) throw new Error('interactive-runtime: no shared translations for ' + locale);
  const pick = { check: 'runtimeCheckAnswers', tryAgain: 'runtimeTryAgain', youDidIt: 'runtimeYouDidIt', allCorrect: 'runtimeAllCorrect', score: 'runtimeScore', print: 'runtimePrintMyWorksheet' };
  const out = {};
  for (const [k, key] of Object.entries(pick)) {
    if (typeof t[key] !== 'string' || !t[key].trim()) throw new Error('interactive-runtime: ' + locale + ' has no ' + key);
    out[k] = t[key];
  }
  if (!/\{n\}/.test(out.score) || !/\{total\}/.test(out.score)) throw new Error('interactive-runtime: ' + locale + ' runtimeScore lacks {n}/{total}');
  return out;
}

/*
 * 2026-11-01 (the worksheet makers' screen-from-marks engine): the runtimes, CSS and validators moved to
 * emit/interactive-runtime-core.js, which has no Node import so the makers can build a screen in the browser. This
 * module keeps the API: buildInteractive(o) resolves the locale's strings and calls the core. Output byte-identical
 * (scripts/makers/tests/interactive-runtime-split.test.js).
 */
const core = require('./interactive-runtime-core.js');
const KINDS = core.KINDS;

/**
 * @param {object} o { kind, locale, items: [{x,y,w,h,sx,sy,sw,sh,label,answer}] (% of page) }
 * @returns {{ css, stageOpen, stageClose, controls, script }}
 */
function buildInteractive(o) {
  if (!KINDS.has(o.kind)) throw new Error('interactive-runtime: unknown kind ' + o.kind);
  return core.buildInteractive({ ...o, strings: runtimeStrings(o.locale) });
}

module.exports = { buildInteractive, runtimeStrings, KINDS };
