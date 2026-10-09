#!/usr/bin/env node
/**
 * qa/fd-unit-sweep.js — the K-395 unit sweep (FINAL §5 gate (h)): for every face, every scene in data/fd/ at the
 * face's RESOLVED d2 config, N seeds through the real composer (types/k/K-395 composeAll + placeWindows): ok rate,
 * hero share, quadrant min / max, one-half share, padded-hotspot overlaps, min decoys, and the face's own bands
 * (how-many: the counts; what-changed: every noun's change share; pairs: the window cells). A unit is IN BAND when
 * it composes on every seed, its hero share sits in HERO_BAND (waived where the hero cannot change), every quadrant
 * share sits in QUADRANT_BAND, no seed overlaps two padded hotspots and every page carries ≥ 1 decoy.
 *
 *   node qa/fd-unit-sweep.js [--modes=base,seven] [--seeds=120] [--units=a,b] [--pins] [--report=<file>]
 *   --pins   sweeps only the pinned units at 400 seeds (the §5 (f) pooled gate)
 *   --themes=pond,beach   pair faces: only same-theme pairs of these themes
 */
'use strict';
const fs = require('fs');
const path = require('path');
const B = require('../data/b7/find-the-differences.js');
const SPEC = require('../types/k/K-395-find-the-differences.js');
const { makeRng } = require('../lib/rng.js');
const { quadrantOf } = require('../lib/fd-compose.js');
const { ROWS } = require('../tools/b7var-rows/find-the-differences.js');
const { vocab } = require('../lib/b2-common.js');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const MODES = arg('modes', null) ? arg('modes').split(',') : B.MODES;
const PINS = process.argv.includes('--pins');
const SEEDS = +arg('seeds', PINS ? 400 : 120);
const ONLY = arg('units', null) ? new Set(arg('units').split(',')) : null;
const THEMES = arg('themes', null) ? new Set(arg('themes').split(',')) : null;   // pair faces: only pairs of these themes (the designs' candidates)
const FD_DIR = path.join(__dirname, '..', 'data', 'fd');
const CFG = { base: SPEC.difficulty[2] };
for (const r of ROWS) CFG[r[5].mode] = { ...SPEC.difficulty[2], ...r[5] };
const W = 600, H = 560;
const ids = fs.readdirSync(FD_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''));
const area = (b) => Math.max(0, b[2] - b[0]) * Math.max(0, b[3] - b[1]);
const inter = (a, b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];
const pct = (x) => (x * 100).toFixed(0) + '%';

function sweepUnit(mode, d, unit, seeds) {
  const r = { mode, unit, ok: 0, hero: 0, quad: [0, 0, 0, 0], rings: 0, oneHalf: 0, overlaps: 0, minDecoys: Infinity, counts: {}, nouns: {}, cells: {}, err: null };
  for (let v = 1; v <= seeds; v++) {
    try {
      const plan = SPEC.planFor(d, mode, Array.isArray(unit) ? unit : unit);
      const rng = makeRng('sweep|' + mode + '|' + (Array.isArray(unit) ? unit.join('+') : unit) + '|' + v);
      const comp = SPEC.composeAll(plan, rng);
      let wins = null;
      if (mode === 'pairs') wins = SPEC.placeWindows(comp.panels[0], d.window || [260, 200], rng);   // before ok++: a page whose windows cannot be placed is refused
      r.ok++;
      r.counts[comp.count] = (r.counts[comp.count] || 0) + 1;
      let heroHit = false;
      const quadsAll = [];
      for (const p of comp.panels) {
        const heroIdx = (p.scene.items.find((l) => l.hero) || {}).idx;
        if (p.ops.some((c) => c.item === heroIdx)) heroHit = true;
        const qs = p.rings.map((b) => quadrantOf(b, W, H));
        qs.forEach((q) => { r.quad[q]++; r.rings++; });
        quadsAll.push(...qs);
        const hots = SPEC.screenHotspots(p, 0, {});
        const diffs = hots.filter((h) => h.diff).map((h) => h.bbox);
        for (let i = 0; i < diffs.length; i++) for (let j = i + 1; j < diffs.length; j++) if (area(inter(diffs[i], diffs[j])) > 0) r.overlaps++;
        r.minDecoys = Math.min(r.minDecoys, hots.filter((h) => !h.diff).length);
        if (mode === 'what-changed') for (const c of p.ops) { const k = B.vocabKeyOf((p.scene.items.find((l) => l.idx === c.item) || {}).src); r.nouns[k] = (r.nouns[k] || 0) + 1; }
      }
      if (heroHit) r.hero++;
      // all rings in one half (left / right / top / bottom)
      const rs = comp.panels.flatMap((p) => p.rings);
      const cx = rs.map((b) => (b[0] + b[2]) / 2), cy = rs.map((b) => (b[1] + b[3]) / 2);
      if (cx.every((x) => x < W / 2) || cx.every((x) => x > W / 2) || cy.every((y) => y < H / 2) || cy.every((y) => y > H / 2)) r.oneHalf++;
      if (wins) wins.forEach((w) => { r.cells[w.cell] = (r.cells[w.cell] || 0) + 1; });
    } catch (e) { r.err = r.err || e.message.replace(/\s+/g, ' ').slice(0, 90); }
  }
  return r;
}
function judge(r, mode, seeds) {
  const why = [];
  if (r.ok < seeds) why.push(`ok ${r.ok}/${seeds}`);
  if (!r.ok) return { inBand: false, why };
  const heroWaived = mode === 'missing' || !!(CFG[mode] && CFG[mode].heroWaived);
  const hs = r.hero / r.ok;
  if (!heroWaived && (hs < B.HERO_BAND[0] || hs > B.HERO_BAND[1])) why.push(`hero ${pct(hs)}`);
  const qs = r.quad.map((q) => q / Math.max(1, r.rings));
  if (mode !== 'pairs' && (Math.min(...qs) < B.QUADRANT_BAND[0] || Math.max(...qs) > B.QUADRANT_BAND[1])) why.push(`quadrants ${qs.map(pct).join('/')}`);
  if (mode !== 'pairs' && r.oneHalf / r.ok > 0.10) why.push(`one half ${pct(r.oneHalf / r.ok)}`);
  if (r.overlaps) why.push(`${r.overlaps} overlaps`);
  if (r.minDecoys < 1) why.push('a page without a decoy');
  if (mode === 'how-many') { const cs = Object.values(r.counts); const n = Object.keys(r.counts).length; if (n < 4 || cs.some((c) => Math.abs(c / r.ok - 1 / n) > 0.06)) why.push(`counts ${JSON.stringify(r.counts)}`); }
  if (mode === 'what-changed') { for (const [k, c] of Object.entries(r.nouns)) { const s = c / r.ok; if (s < 0.25 || s > 0.85) why.push(`${k} ${pct(s)}`); } }
  if (mode === 'pairs') { const tot = Object.values(r.cells).reduce((a, b) => a + b, 0); if ((r.cells[4] || 0) / tot > 0.20) why.push(`centre cell ${pct((r.cells[4] || 0) / tot)}`); }
  return { inBand: !why.length, why };
}

const scenes = {}; for (const id of ids) scenes[id] = B.loadScene(id);
const out = [];
for (const mode of MODES) {
  const d = CFG[mode];
  if (!d) { console.log(`${mode}: no config`); continue; }
  const pair = mode === 'seven' || mode === 'ten-pairs';
  let units;
  if (PINS) units = [d.units || d.unit || B.UNITS[mode]];
  else if (pair) {
    // every same-theme pair of DISTINCT bases among the rich copies (the designs pin rich pairs)
    const rich = ids.filter((id) => /-rich$/.test(id));
    units = [];
    for (const a of rich) for (const b of rich) if (a < b && scenes[a].theme === scenes[b].theme && B.baseIdOf(a) !== B.baseIdOf(b) && (!THEMES || THEMES.has(scenes[a].theme))) units.push([a, b]);
  } else units = ids.filter((id) => (mode === 'what-changed' || mode === 'write') ? !/-rich$/.test(id) : true);
  if (ONLY) units = units.filter((u) => (Array.isArray(u) ? u.some((x) => ONLY.has(x)) : ONLY.has(u)));
  const rows = [];
  for (const u of units) {
    if (mode === 'what-changed' || mode === 'write') { const v = vocab(); const keys = [...new Set(scenes[u].items.map((l) => B.vocabKeyOf(l.src)))]; if (keys.some((k) => !v[k] || !['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'].every((l) => v[k][l] && v[k][l][0]))) continue; if (keys.length > 6) continue; }
    const r = sweepUnit(mode, d, u, SEEDS);
    const j = judge(r, mode, SEEDS);
    rows.push({ ...r, ...j, name: Array.isArray(u) ? u.join('+') : u });
  }
  rows.sort((a, b) => (b.inBand - a.inBand) || (b.ok - a.ok) || (a.why.length - b.why.length));
  const inBand = rows.filter((x) => x.inBand);
  console.log(`\n== ${mode} (${rows.length} units, ${SEEDS} seeds): ${rows.filter((x) => x.ok === SEEDS).length} compose on every seed, ${inBand.length} in band${inBand.length ? ': ' + inBand.slice(0, 8).map((x) => x.name).join(', ') : ''}`);
  const pinned = Array.isArray(d.units || d.unit || B.UNITS[mode]) ? (d.units || B.UNITS[mode]).join('+') : (d.unit || B.UNITS[mode]);
  for (const x of rows.filter((x) => x.name === pinned || (PINS))) console.log(`  PIN ${x.name}: ${x.inBand ? 'IN BAND' : 'OUT: ' + x.why.join(', ')} · ok ${x.ok}/${SEEDS} hero ${pct(x.hero / Math.max(1, x.ok))} quadrants ${x.quad.map((q) => pct(q / Math.max(1, x.rings))).join('/')} one-half ${pct(x.oneHalf / Math.max(1, x.ok))} decoys≥${x.minDecoys === Infinity ? '-' : x.minDecoys}${x.err ? ' · ' + x.err : ''}${mode === 'how-many' ? ' counts ' + JSON.stringify(x.counts) : ''}${mode === 'pairs' ? ' cells ' + JSON.stringify(x.cells) : ''}${mode === 'what-changed' ? ' nouns ' + JSON.stringify(x.nouns) : ''}`);
  out.push({ mode, rows: rows.map((x) => ({ unit: x.name, inBand: x.inBand, why: x.why, ok: x.ok, hero: x.ok ? +(x.hero / x.ok).toFixed(2) : 0, quad: x.quad.map((q) => +(q / Math.max(1, x.rings)).toFixed(2)), oneHalf: x.ok ? +(x.oneHalf / x.ok).toFixed(2) : 0, minDecoys: x.minDecoys === Infinity ? null : x.minDecoys, err: x.err })) });
}
const rep = arg('report', null);
if (rep) {
  const lines = ['# K-395 unit sweep (' + new Date().toISOString().slice(0, 10) + ', ' + SEEDS + ' seeds per unit, data/fd ' + ids.length + ' scenes)', ''];
  for (const m of out) { lines.push('## ' + m.mode, '', '| unit | in band | ok | hero | quadrants | one half | decoys | why |', '|---|---|---|---|---|---|---|---|'); for (const x of m.rows.slice(0, 40)) lines.push(`| ${x.unit} | ${x.inBand ? 'YES' : 'no'} | ${x.ok} | ${x.hero} | ${x.quad.join('/')} | ${x.oneHalf} | ${x.minDecoys} | ${x.why.join('; ')}${x.err ? ' · ' + x.err : ''} |`); lines.push(''); }
  fs.writeFileSync(rep, lines.join('\n'));
  console.log('report → ' + rep);
}
