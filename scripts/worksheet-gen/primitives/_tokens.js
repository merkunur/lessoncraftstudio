/**
 * Design tokens — the single visual-consistency SoT for the worksheet generator.
 * Mirrors the platform's Direction A palette (frontend/tailwind.config.js):
 * cream #FBF3E4, teal #146B5E, coral #F2784B, Baloo 2 display + Nunito body.
 *
 * Every primitive and layout consumes ONLY these values. The QA palette lint
 * (qa/lints.js) whitelists exactly the hex values exported here.
 */
'use strict';

const color = {
  cream: '#FBF3E4',      // page/card background
  creamDeep: '#F5E9D2',  // card border tint / alternating rows
  teal: '#146B5E',       // primary ink for frames, titles, primitives
  tealSoft: '#DDEBE8',   // fill tint for cells, ten-frame fills
  coral: '#F2784B',      // accent: instruction icon, highlights, correct-target accents
  coralSoft: '#FBE3D8',  // soft accent fill
  ink: '#3A3530',        // body text / numerals (warm near-black, friendlier than #000)
  inkSoft: '#8A8276',    // name/date lines, footer, secondary labels
  white: '#FFFFFF',      // answer-choice chips, frame cell backgrounds
  grid: '#C8BFAE',       // light rules/grid lines
};

const font = {
  display: "'Baloo 2'",
  body: "'Nunito'",
};

// Stroke widths in CSS px at the page's 1:1 scale (1px ≈ 0.26mm at 96dpi page box)
const stroke = {
  primitive: 3,   // main primitive outlines (frames, clock rims)
  grid: 1.5,      // interior grid lines
  accent: 4,      // emphasis strokes (jump arcs, circled answers)
  hairline: 1,
};

const radius = {
  cell: 10,       // problem-card corner radius
  chip: 999,      // answer chips are fully round
  frame: 16,      // outer page frame
};

// Per-grade-band density. minElement = minimum icon/primitive cell size (px),
// fontChoice = answer-numeral size, items = [min,max] problems per page.
const density = {
  K:   { minElement: 56, fontLabel: 18, fontChoice: 30, items: [4, 8] },
  G1:  { minElement: 44, fontLabel: 16, fontChoice: 26, items: [6, 12] },
  G23: { minElement: 36, fontLabel: 14, fontChoice: 22, items: [8, 16] },
};

// A4 ∩ Letter common content box (mm). Letter: 215.9×279.4, A4: 210×297.
// Content designed once into this box; outer margins flex per page size.
const pageBox = {
  contentWmm: 186,
  contentHmm: 250,
  // CSS px at 96dpi (mm * 96 / 25.4)
  contentW: Math.round(186 * 96 / 25.4),  // 703
  contentH: Math.round(250 * 96 / 25.4),  // 945
};

module.exports = { color, font, stroke, radius, density, pageBox };
