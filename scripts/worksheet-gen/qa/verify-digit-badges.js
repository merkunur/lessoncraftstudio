#!/usr/bin/env node
/**
 * verify-digit-badges.js — 2026-10-13 (Number Tracing: on the live 0-4 / 5-9 pages the stroke-order badges of
 * 4, 5 and 9 were drawn at a fixed offset of each stroke's start, and those digits start both strokes at (almost)
 * the same point — badge 2 covered badge 1). Builds every multi-stroke digit of every digit form at every size
 * that prints badges — strokeGlyphLane (published 0-4 / 5-9 pages, 92 px) and digitFadeLane (Level Set level 1:
 * single digits 104 px, numbers 10-20 at 84 px) — and asserts per badge:
 *   1. the whole circle (with its ring) lies inside the lane SVG;
 *   2. it does not touch another badge, a start dot or an arrow head (boxes);
 *   3. it does not sit on the digit's ink.
 * Browser-free (reads the emitted SVG; re-samples the strokes).
 *
 *   node qa/verify-digit-badges.js [--poison]
 * --poison moves every badge 2 onto badge 1 (the live defect) and must FAIL.
 */
'use strict';
const { strokeGlyphLane, digitFadeLane, samplePath, BADGE_R } = require('../primitives/trace-path.js');
const { FORMS, BOX } = require('../data/tracing/digit-strokes.js');

const POISON = process.argv.includes('--poison');
const W = 660;
const num = (s, a) => { const m = new RegExp(`\\s${a}="([-\\d.]+)"`).exec(s); return m ? +m[1] : NaN; };
const translateOf = (g) => { const m = /translate\(([-\d.]+) ([-\d.]+)\) scale\(([-\d.]+)\)/.exec(g); return m ? m.slice(1).map(Number) : null; };

let checked = 0;
const fails = [];
function check(tag, svg, h) {
  let badges = [...svg.matchAll(/<circle[^>]*data-lcs-badge="(\d+)"[^>]*>/g)].map((m) => ({ n: m[1], x: num(m[0], 'cx'), y: num(m[0], 'cy') }));
  if (POISON) { const b1 = badges.find((b) => b.n === '1'); badges = badges.map((b) => (b.n === '2' && b1 ? { ...b, x: b1.x, y: b1.y } : b)); }
  if (!badges.length) { fails.push(`${tag}: no badges at a badge size`); return; }
  // start dots / arrows: display-space circles+polygons outside the scaled groups (fade lane) or inside them (published)
  const dots = [], arrows = [], ink = [];
  // every scaled glyph group → its dots, arrows and ink, mapped to display space
  for (const gm of svg.matchAll(/<g transform="(translate\([^"]+\))"[^>]*>([\s\S]*?)<\/g>/g)) {
    const t = translateOf(gm[1]); if (!t) continue;
    const [tx, ty, sc] = t;
    for (const p of gm[2].matchAll(/<path[^>]*\sd="([^"]+)"[^>]*stroke-dasharray/g)) for (const q of samplePath(p[1], (x, y) => ({ x: tx + x * sc, y: ty + y * sc }))) ink.push(q);
    for (const c of gm[2].matchAll(/<circle[^>]*>/g)) { const r = num(c[0], 'r') * sc; dots.push({ x: tx + num(c[0], 'cx') * sc, y: ty + num(c[0], 'cy') * sc, r }); }
    for (const pg of gm[2].matchAll(/<polygon[^>]*points="([^"]+)"/g)) arrows.push(pg[1].trim().split(/\s+/).map((p) => p.split(',').map(Number)).map(([x, y]) => [tx + x * sc, ty + y * sc]));
  }
  const outside = svg.replace(/<g transform="translate[\s\S]*?<\/g>/g, '');
  for (const c of outside.matchAll(/<circle(?![^>]*data-lcs-badge)[^>]*>/g)) dots.push({ x: num(c[0], 'cx'), y: num(c[0], 'cy'), r: num(c[0], 'r') });
  for (const pg of outside.matchAll(/<polygon[^>]*points="([^"]+)"/g)) arrows.push(pg[1].trim().split(/\s+/).map((p) => p.split(',').map(Number)));
  const R = BADGE_R + 0.75;
  for (const b of badges) {
    checked++;
    if (b.x - R < 0 || b.y - R < 0 || b.x + R > W || b.y + R > h) fails.push(`${tag} badge ${b.n}: outside the lane`);
    const bb = { x0: b.x - R, x1: b.x + R, y0: b.y - R, y1: b.y + R };
    const hits = (q) => q.x0 < bb.x1 - 0.5 && q.x1 > bb.x0 + 0.5 && q.y0 < bb.y1 - 0.5 && q.y1 > bb.y0 + 0.5;
    for (const o of badges) if (o !== b && hits({ x0: o.x - R, x1: o.x + R, y0: o.y - R, y1: o.y + R })) fails.push(`${tag} badge ${b.n}: touches badge ${o.n}`);
    for (const d of dots) if (hits({ x0: d.x - d.r, x1: d.x + d.r, y0: d.y - d.r, y1: d.y + d.r })) { fails.push(`${tag} badge ${b.n}: touches a start dot`); break; }
    for (const poly of arrows) {
      const xs = poly.map((q) => q[0]), ys = poly.map((q) => q[1]);
      if (hits({ x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) })) { fails.push(`${tag} badge ${b.n}: touches an arrow`); break; }
    }
    const near = Math.min(...ink.map((p) => Math.hypot(p.x - b.x, p.y - b.y)));
    if (near < BADGE_R + 1.5) fails.push(`${tag} badge ${b.n}: on the digit's ink (${near.toFixed(1)} px)`);
  }
}

for (const [fname, form] of Object.entries(FORMS)) {
  for (let d = 0; d <= 9; d++) {
    if (form[d].length < 2) continue;
    check(`${fname} ${d} published@92`, strokeGlyphLane({ strokes: form[d], box: BOX, w: W, h: 128, glyphH: 92, reps: 4 }).svg, 128);
    for (const modes of [['model', 'trace', 'trace', 'trace'], ['model', 'trace', 'dot', 'empty', 'empty']]) {
      check(`${fname} ${d} fade@104 ${modes.length}`, digitFadeLane({ glyphs: [form[d]], box: BOX, w: W, h: 152, glyphH: 104, modes, badges: true, number: d }).svg, 152);
      check(`${fname} ${d} range-fade@92 ${modes.length}`, digitFadeLane({ glyphs: [form[d]], box: BOX, w: W, h: 128, glyphH: 92, modes, badges: true, number: d }).svg, 128);
    }
    const n = 10 + d;
    check(`${fname} ${n} fade@84`, digitFadeLane({ glyphs: [form[1], form[d]], box: BOX, w: W, h: 128, glyphH: 84, modes: ['model', 'trace', 'trace', 'trace'], badges: true, number: n }).svg, 128);
  }
}
if (fails.length) { console.log(`FAIL ${fails.length} of ${checked} badges:\n  ` + [...new Set(fails)].slice(0, 30).join('\n  ')); process.exit(1); }
console.log(`OK — ${checked} stroke-order badges inside their lanes, clear of each other, the dots, the arrows and the ink`);
