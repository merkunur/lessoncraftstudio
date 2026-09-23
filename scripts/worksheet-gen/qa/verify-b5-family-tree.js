#!/usr/bin/env node
/**
 * verify-b5-family-tree.js — the gate of primitives/family-tree.js (K-370
 * `family`, design docs/worksheet-gen/b5-designs/K-370-family.md §2 "Gate
 * qa/verify-b5-family-tree.js"). It re-reads the family FROM THE DRAWN LINES.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-family-tree.js [--no-render]
 *
 * NODE PASS — every tree the family draws: the base ladder (d1 no grand pair /
 * d2 grand pair / d3 + a baby) × grandSide M / F × every children order, at
 * the ladder's frames (120x138 / 104x120 / 96x110), plus the faces' shapes the
 * primitive must already carry (F2 80x96; F3 80x98 at nodeW 130 with an aunt /
 * uncle on the grand side, labelH 50). Each emitted SVG is PARSED (never the
 * primitive's return value):
 *   - no two frames overlap and every same-row gap >= 14;
 *   - rule (4) "nobody stands above a person they do not descend to": for every
 *     frame A in a higher row that x-overlaps a frame B in a lower row, B
 *     descends from A under the graph;
 *   - every connector is horizontal or vertical; every segment lies outside
 *     every frame (except at its endpoints) and >= 10 px from every disc;
 *   - every vertical ends on a frame top (±2, at the frame's centre ±2) or on a
 *     bar; the crown's bottom sits >= 8 above the lowest row;
 *   - EVERY PERSON'S PARENTS RE-DERIVED FROM THE LINES (couple bar -> descent ->
 *     sibling bar -> drop -> frame top) === parentsOf(path) (the graph);
 *   - the tree fits the 675 stage; tokens only.
 * POISON — each must FAIL for its own reason; the untouched tree is the control:
 *   PR3 the ego's drop re-hung from the GRAND couple's bar (the stamps unchanged)
 *   · a drop deleted · the in-law parent pushed back under the grand pair (rule 4)
 *   · the crown's bottom lowered into the ego row · a drop moved into a frame.
 * RENDER PASS — the d2 stage (both grand sides) through the real components
 * (components-b5/family.js familyStage) in Chromium: every line's rendered
 * getBBox matches its attributes (no transform drifts the geometry the gate
 * reads), then sheets in colour + greyscale: out/dev/K-370-tree-sheet{,-grey}.png.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const tokens = require('../primitives/_tokens.js');
const FT = require('../primitives/family-tree.js');

const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/* ---- parse (the gate's view of the emitted markup) */
function parse(svg) {
  const frames = [...svg.matchAll(/<rect x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"[^>]*data-lcs-frame="([^"]+)"[^>]*\/>/g)]
    .map((m) => ({ id: m[5], x: +m[1], y: +m[2], w: +m[3], h: +m[4] }));
  const lines = [...svg.matchAll(/<line x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="([^"]+)"[^>]*data-lcs-conn="[^"]*"[^>]*\/>/g)]
    .map((m) => ({ x1: +m[1], y1: +m[2], x2: +m[3], y2: +m[4] }));
  const discs = [...svg.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"[^>]*data-lcs-disc="([^"]+)"/g)].map((m) => ({ id: m[4], cx: +m[1], cy: +m[2], r: +m[3] }));
  let crownBottom = -Infinity;
  for (const m of svg.matchAll(/<(rect|circle)([^>]*)data-lcs-crown=""/g)) {
    const a = m[2];
    if (m[1] === 'rect') crownBottom = Math.max(crownBottom, +/ y="([^"]+)"/.exec(a)[1] + +/ height="([^"]+)"/.exec(a)[1]);
    else crownBottom = Math.max(crownBottom, +/ cy="([^"]+)"/.exec(a)[1] + +/ r="([^"]+)"/.exec(a)[1]);
  }
  const hexes = [...svg.matchAll(/#[0-9A-Fa-f]{6}/g)].map((m) => m[0].toUpperCase());
  return { frames, lines, discs, crownBottom, hexes };
}

/** parents from the drawn lines: frame id -> [frame ids] (independent of family-tree.js) */
function parentsFromLines(frames, lines, E = 0.6) {
  const H = [], V = [], other = [];
  for (const s of lines) {
    if (Math.abs(s.y1 - s.y2) < E) H.push({ y: s.y1, x1: Math.min(s.x1, s.x2), x2: Math.max(s.x1, s.x2) });
    else if (Math.abs(s.x1 - s.x2) < E) V.push({ x: s.x1, y1: Math.min(s.y1, s.y2), y2: Math.max(s.y1, s.y2) });
    else other.push(s);
  }
  const coupleOf = (h) => {
    const a = frames.find((f) => Math.abs(f.x + f.w - h.x1) < 1 && h.y > f.y && h.y < f.y + f.h);
    const b = frames.find((f) => Math.abs(f.x - h.x2) < 1 && h.y > f.y && h.y < f.y + f.h);
    return a && b ? [a.id, b.id] : null;
  };
  const onH = (x, y) => H.find((h) => Math.abs(h.y - y) < 1 && x >= h.x1 - 1 && x <= h.x2 + 1);
  const barParents = (h, depth) => {
    if (depth > 4) return null;
    const c = coupleOf(h);
    if (c) return c;
    const up = V.find((v) => Math.abs(v.y2 - h.y) < 1 && v.x >= h.x1 - 1 && v.x <= h.x2 + 1);
    const hh = up && onH(up.x, up.y1);
    return hh ? barParents(hh, depth + 1) : null;
  };
  const out = new Map(frames.map((f) => [f.id, []]));
  for (const v of V) {
    const child = frames.find((f) => Math.abs(f.y - v.y2) <= 2 && Math.abs(f.x + f.w / 2 - v.x) <= 2);
    if (!child) continue;
    const h = onH(v.x, v.y1);
    let ps = h ? barParents(h, 0) : null;
    if (!ps) { const pf = frames.find((f) => Math.abs(f.y + f.h - v.y1) < 1 && v.x > f.x && v.x < f.x + f.w); if (pf) ps = [pf.id]; }
    if (ps) out.set(child.id, [...out.get(child.id), ...ps]);
  }
  return { parents: out, H, V, other };
}

/** all the rules over one emitted tree; persons: [{id, path}] (the graph) */
function checkTree(svg, persons, { labelH = 0, w = 675 } = {}) {
  const f = [];
  const P = parse(svg);
  const idPath = new Map(persons.map((p) => [p.id, p.path]));
  const present = new Set(persons.map((p) => p.path));
  if (P.frames.length !== persons.length) f.push(`${P.frames.length} frames for ${persons.length} persons`);
  // overlap + gaps
  for (let i = 0; i < P.frames.length; i++) for (let j = i + 1; j < P.frames.length; j++) {
    const a = P.frames[i], b = P.frames[j];
    const xo = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), yo = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (xo > 0 && yo > 0) f.push(`frames ${idPath.get(a.id)} and ${idPath.get(b.id)} overlap`);
    if (Math.abs(a.y - b.y) < 0.5 && -xo < 14) f.push(`frames ${idPath.get(a.id)} and ${idPath.get(b.id)} are ${(-xo).toFixed(1)} px apart (< 14)`);
  }
  // rule (4)
  for (const a of P.frames) for (const b of P.frames) {
    if (!(a.y + 0.5 < b.y)) continue;
    const xo = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    if (xo > 0.5 && !FT.isAncestor(idPath.get(a.id), idPath.get(b.id), present)) f.push(`rule 4: ${idPath.get(a.id)} stands above ${idPath.get(b.id) || 'ego'}, who does not descend from them`);
  }
  // lines
  const L = parentsFromLines(P.frames, P.lines);
  for (const s of L.other) f.push(`a connector is diagonal (${s.x1},${s.y1} -> ${s.x2},${s.y2})`);
  const inside = (fr, x, y, inset = 2) => x > fr.x + inset && x < fr.x + fr.w - inset && y > fr.y + inset && y < fr.y + fr.h - inset;
  for (const fr of P.frames) {
    for (const h of L.H) if (h.y > fr.y + 2 && h.y < fr.y + fr.h - 2 && Math.min(h.x2, fr.x + fr.w - 2) - Math.max(h.x1, fr.x + 2) > 0.5) f.push(`a bar runs through ${idPath.get(fr.id) || 'ego'}'s frame`);
    for (const v of L.V) if (v.x > fr.x + 2 && v.x < fr.x + fr.w - 2 && Math.min(v.y2, fr.y + fr.h - 2) - Math.max(v.y1, fr.y + 2) > 0.5) f.push(`a line runs through ${idPath.get(fr.id) || 'ego'}'s frame`);
    void inside;
  }
  const dist = (cx, cy, s) => (s.y !== undefined ? Math.hypot(cx - Math.max(s.x1, Math.min(cx, s.x2)), cy - s.y) : Math.hypot(cx - s.x, cy - Math.max(s.y1, Math.min(cy, s.y2))));
  for (const d of P.discs) for (const s of [...L.H, ...L.V]) { const g = dist(d.cx, d.cy, s) - d.r; if (g < 10 - 1e-6) f.push(`a connector passes ${g.toFixed(1)} px from ${idPath.get(d.id)}'s disc (< 10)`); }
  for (const v of L.V) {
    const top = P.frames.some((fr) => Math.abs(fr.y - v.y2) <= 2 && Math.abs(fr.x + fr.w / 2 - v.x) <= 2);
    const bar = L.H.some((h) => Math.abs(h.y - v.y2) < 1 && v.x >= h.x1 - 1 && v.x <= h.x2 + 1);
    if (!top && !bar) f.push(`a vertical connector at x ${v.x} ends in the air (y ${v.y2})`);
  }
  // the parents, re-derived from the lines, against the graph
  for (const p of persons) {
    const want = FT.parentsOf(p.path).filter((q) => present.has(q)).sort().join('+');
    const got = [...new Set((L.parents.get(p.id) || []).map((id) => idPath.get(id)))].sort().join('+');
    if (want !== got) f.push(`the drawn lines give ${p.path || 'ego'} the parents [${got}], the graph says [${want}]`);
  }
  // crown bottom >= 8 above the lowest row
  if (P.crownBottom > -Infinity) {
    const lowest = Math.max(...P.frames.map((fr) => fr.y));
    if (P.crownBottom > lowest - 8 + 1e-6) f.push(`the crown bottom ${P.crownBottom.toFixed(1)} sits ${(lowest - P.crownBottom).toFixed(1)} px above the ego row (< 8)`);
  }
  for (const fr of P.frames) if (fr.x < -0.01 || fr.x + fr.w > w + 0.01) f.push(`${idPath.get(fr.id)} leaves the ${w} stage`);
  for (const d of P.discs) if (d.cx - d.r < -0.01) f.push(`${idPath.get(d.id)}'s disc leaves the stage`);
  for (const h of P.hexes) if (!PALETTE.has(h)) f.push(`off-palette ${h}`);
  void labelH;
  return f;
}

/* ---- the trees the family draws */
function families() {
  const out = [];
  const kidsSets = [['', 'Z'], ['', 'B'], ['', 'Z', 'By'], ['', 'B', 'Zy']];
  const perms = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map((r) => [x, ...r])));
  const frames = { d1: { w: 120, h: 138 }, d2: { w: 104, h: 120 }, d3: { w: 96, h: 110 } };
  for (const [lvl, frame] of Object.entries(frames)) {
    const sides = lvl === 'd1' ? [null] : ['M', 'F'];
    for (const side of sides) for (const ks of kidsSets) {
      if ((lvl === 'd3') !== (ks.length === 3)) continue;
      for (const order of perms(ks)) {
        const paths = ['M', 'F', ...(side ? [side + 'M', side + 'F'] : []), ...order];
        out.push({ tag: `${lvl} side ${side || '-'} kids ${order.map((k) => k || 'ego').join('/')}`, frame, persons: paths.map((p, i) => ({ id: 'n' + i, path: p })) });
      }
    }
  }
  // the faces' shapes the primitive must already carry (Phase 2)
  for (const side of ['M', 'F']) {
    out.push({ tag: `F2 side ${side}`, frame: { w: 80, h: 96 }, persons: ['M', 'F', side + 'M', side + 'F', '', 'Z'].map((p, i) => ({ id: 'n' + i, path: p })) });
    for (const sib of ['Z', 'B']) out.push({ tag: `F3 side ${side} + ${side}${sib}`, frame: { w: 80, h: 98 }, nodeW: 130, labelH: 50, persons: ['M', 'F', side + 'M', side + 'F', side + sib, '', 'B'].map((p, i) => ({ id: 'n' + i, path: p })) });
  }
  return out;
}

function build(fam, over = {}) {
  const badges = {};
  fam.persons.forEach((p, i) => { if (p.path !== '') badges[p.id] = i + 1; });
  return FT.familyTree({ persons: fam.persons, frame: fam.frame, nodeW: fam.nodeW, labelH: fam.labelH || 0, badges, egoId: fam.persons.find((p) => p.path === '').id, ...over });
}

function nodePass() {
  const fams = families();
  for (const fam of fams) {
    let t;
    try { t = build(fam); } catch (e) { ok(false, `${fam.tag}: throws ${e.message}`); continue; }
    const f = checkTree(t.svg, fam.persons, { labelH: fam.labelH || 0 });
    ok(f.length === 0, `${fam.tag}: ${f.join(' | ')}`);
  }
  console.log(`node pass: ${fams.length} trees`);
  // throws: a one-parent graph, two grand couples, the tree wider than the stage
  const throws = (fn) => { try { fn(); return false; } catch (e) { return true; } };
  ok(throws(() => FT.familyTree({ persons: [{ id: 'a', path: 'M' }, { id: 'b', path: '' }], frame: { w: 104, h: 120 } })), 'a one-parent graph does not throw');
  ok(throws(() => FT.familyTree({ persons: ['M', 'F', 'MM', 'MF', 'FM', 'FF', ''].map((p, i) => ({ id: 'n' + i, path: p })), frame: { w: 104, h: 120 } })), 'two grand couples do not throw');
  ok(throws(() => FT.familyTree({ persons: ['M', 'F', 'MM', 'MF', '', 'Z', 'B'].map((p, i) => ({ id: 'n' + i, path: p })), frame: { w: 104, h: 120 }, w: 300 })), 'a tree wider than its stage does not throw');
}

function poisons() {
  const fam = families().find((x) => x.tag.startsWith('d2 side M kids ego/Z'));
  const t = build(fam);
  const control = checkTree(t.svg, fam.persons);
  ok(control.length === 0, `poison control fails: ${control.join(' | ')}`);
  const P = parse(t.svg);
  const ego = P.frames.find((fr) => fam.persons.find((p) => p.id === fr.id).path === '');
  const egoDropRe = new RegExp(`<line x1="${ego.x + ego.w / 2}" y1="([^"]+)" x2="${ego.x + ego.w / 2}" y2="${ego.y}"[^>]*/>`);
  const grandBar = /<line x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="\2"[^>]*data-lcs-conn="couple"\/>/g;
  const bars = [...t.svg.matchAll(grandBar)].map((m) => ({ x1: +m[1], y: +m[2], x2: +m[3] })).sort((a, b) => a.y - b.y);
  const gb = bars[0];
  const cases = [
    { name: 'PR3 the ego drop re-hung from the grand bar', edit: (s) => { const gx = (gb.x1 + gb.x2) / 2, ex = ego.x + ego.w / 2, ry = ego.y - 8; return s.replace(egoDropRe, () => `<line x1="${gx}" y1="${gb.y}" x2="${gx}" y2="${ry}" stroke="#146B5E" stroke-width="3" data-lcs-conn="drop"/><line x1="${Math.min(gx, ex)}" y1="${ry}" x2="${Math.max(gx, ex)}" y2="${ry}" stroke="#146B5E" stroke-width="3" data-lcs-conn="sibling"/><line x1="${ex}" y1="${ry}" x2="${ex}" y2="${ego.y}" stroke="#146B5E" stroke-width="3" data-lcs-conn="drop"/>`); }, want: /the drawn lines give ego the parents \[MF\+MM\], the graph says \[F\+M\]/ },
    { name: 'a drop deleted', edit: (s) => s.replace(egoDropRe, ''), want: /the drawn lines give ego the parents \[\]/ },
    { name: 'the crown lowered into the ego row', edit: (s) => s.replace(/(<rect x="[^"]+" y="[^"]+" width="[^"]+" height=")([^"]+)("[^>]*data-lcs-crown)/, (m, a, h, b) => `${a}${+h + 40}${b}`), want: /the crown bottom/ },
  ];
  for (const c of cases) {
    const bad = c.edit(t.svg);
    ok(bad !== t.svg, `poison "${c.name}": NEEDLE MATCHED NOTHING`);
    const f = checkTree(bad, fam.persons);
    ok(f.some((x) => c.want.test(x)), `poison "${c.name}" did not fail for its reason (got ${JSON.stringify(f)})`);
    console.log(`poison ${c.name}: ${f.length ? 'FAILED as required — ' + f.find((x) => c.want.test(x)) : 'SILENT'}`);
  }
  // rule 4: the in-law parent NOT pushed (sepGap -200 lets it stand under the grand pair)
  const t4 = build(fam, { sepGap: -200 });
  const f4 = checkTree(t4.svg, fam.persons);
  ok(f4.some((x) => /^rule 4: M[MF] stands above F/.test(x)), `poison rule 4 (in-law under the grand pair) did not fail for its reason (got ${JSON.stringify(f4)})`);
  console.log(`poison the in-law under the grand pair: ${f4.length ? 'FAILED as required — ' + f4.find((x) => /^rule 4/.test(x)) : 'SILENT'}`);
}

async function renderPass() {
  const puppeteer = require('puppeteer');
  const url = require('url');
  const C5 = require('../templates/components-b5.js');
  const shell = require('../page/shell.js');
  const out = path.join(__dirname, '..', 'out', 'dev');
  fs.mkdirSync(out, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    let body = '';
    const looks = { M: 'bob-fringe', F: 'short-beard', MM: 'bun', MF: 'short', FM: 'long-straight', FF: 'bald-crown' };
    for (const side of ['M', 'F']) {
      const persons = [
        { id: 'm', path: 'M', sex: 'f', age: 'adult', look: looks.M }, { id: 'f', path: 'F', sex: 'm', age: 'adult', look: looks.F },
        { id: 'g1', path: side + 'M', sex: 'f', age: 'elder', look: looks[side + 'M'] }, { id: 'g2', path: side + 'F', sex: 'm', age: 'elder', look: looks[side + 'F'] },
        { id: 'e', path: '', sex: 'f', age: 'child', look: 'pigtails' }, { id: 'b', path: 'B', sex: 'm', age: 'child', look: 'spiky-fringe' },
      ];
      const st = C5.familyStage({ persons, frame: { w: 104, h: 120 }, badges: { m: 3, f: 1, g1: 5, g2: 2, b: 4 }, egoId: 'e', egoName: 'Mia' });
      body += `<div data-side="${side}" style="margin:0 0 16px">${st.html}</div>`;
    }
    const html = shell.buildPage({ title: 'K-370 family-tree sheet', instruction: 'grandSide M (top) and F (bottom)', bodyHtml: `<div data-ws-content style="transform:scale(.62);transform-origin:top center">${body}</div>`, locale: 'en', pageSize: 'a4' });
    const f = path.join(out, 'K-370-tree-sheet.html');
    fs.writeFileSync(f, html);
    await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
    await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const drift = await page.evaluate(() => [...document.querySelectorAll('line[data-lcs-conn]')].map((l) => { const b = l.getBBox(); return Math.max(Math.abs(b.x - Math.min(+l.getAttribute('x1'), +l.getAttribute('x2'))), Math.abs(b.y - Math.min(+l.getAttribute('y1'), +l.getAttribute('y2')))); }));
    ok(drift.length > 0 && Math.max(...drift) < 0.01, `rendered connector geometry drifts from its attributes by ${Math.max(...drift)}`);
    await page.screenshot({ path: path.join(out, 'K-370-tree-sheet.png'), fullPage: true });
    await page.addStyleTag({ content: 'body{filter:grayscale(1)}' });
    await page.screenshot({ path: path.join(out, 'K-370-tree-sheet-grey.png'), fullPage: true });
    fs.unlinkSync(f);
    console.log(`render: ${drift.length} connectors match their attributes; sheets out/dev/K-370-tree-sheet{,-grey}.png`);
  } finally { await browser.close(); }
}

if (require.main === module) {
  (async () => {
    nodePass();
    poisons();
    if (!process.argv.includes('--no-render')) await renderPass();
    console.log(`verify-b5-family-tree: ${assertions} assertions, ${fails.length} failures`);
    if (fails.length) { for (const x of fails.slice(0, 40)) console.log('  FAIL ' + x); process.exit(1); }
    console.log('PASS');
  })().catch((e) => { console.error(e); process.exit(1); });
}
module.exports = { checkTree, parse, parentsFromLines };
