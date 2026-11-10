#!/usr/bin/env node
/**
 * htd-drawn.js — How to Draw steps for the REDRAWN flagship drawings (art-src/drawn/<noun>.svg), cut from the drawing's own
 * SHAPES instead of its ink (flagship visual check 2026-11-09). lib/htd-steps.js cuts a library drawing's ink by the parts
 * each line borders; on these vector drawings, whose inner lines are thinner than their outlines, it split a thin line down
 * its middle between two steps: one step drew a faint hairline and a later one drew the same line again (htd-doubled.js
 * flagged 41 of 159, and the unflagged ones showed it too: a cup's rim, a birdhouse's hole, a broccoli's florets).
 *
 * Here every ink pixel belongs to the ONE shape that draws it on top (an id render of the SVG with crisp edges: each
 * shape's stroke, and its fill where the fill is ink, in its own colour), so no line is ever split and the union of the
 * steps is the drawing (stats missing / extra / dup = 0 by construction). The steps:
 *   - a drawing with a construction sheet (people and animals, docs/makers/ART-BRIEF.md: <desc id="construction"> "steps",
 *     parts = the <g id> groups): the artist's own steps; a shape outside every named part joins the last step;
 *   - any other drawing: the big shapes first (every shape covering at least 60 % of the area of the biggest, then the next
 *     biggest until the first step holds a quarter of the ink; a shape's size is the AREA it covers, so a thin leg is not a
 *     big shape), then the other shapes by size in as many steps as keep each above ~9 % of the ink, the smallest last.
 * Then two clean-ups, both read on all 347 lessons (2026-11-09): an ink pixel a later shape's line covers goes back to the
 * earliest step whose line it continues (no gaps where a line end lies over an outline, no stubs of a hidden shape), and a
 * scrap — a piece under a tenth of its step touching no earlier step's line (a belly between legs, a rail between rungs) —
 * moves to the earliest later step it touches.
 * Then the How to Draw store's rule (tools/fl-index.js): 4-5 steps, the first ≥ 25 % of the ink, every other ≥ 8 % — a
 * step too thin joins its neighbour; more than five merge the two smallest neighbours. A drawing that cannot meet it keeps
 * its steps and fl-index.js leaves it out of How to Draw.
 *
 * The record keeps everything else lib/htd-steps.js measured (w, h, fit, bbox, the guide shapes), so the faces that draw
 * the "simple shapes first" guides are unchanged; only steps and stats are replaced (stats.lesson = 'drawn').
 *   node tools/htd-drawn.js [--only=noun,noun] [--dry]     → data/fl/htd/<slug>.json, then node tools/fl-slim.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const L = require('../lib/cbn-lineart.js');
const FL = require('../lib/fl-art.js');

const WG = path.join(__dirname, '..');
const DRAWN = path.join(WG, 'art-src', 'drawn');
const STORE = path.join(WG, 'data', 'fl', 'htd');
const U = L.UNIT, CW = 600 * U, CH = 560 * U;
const DRAWABLE = /^(path|circle|ellipse|rect|polygon|polyline|line)$/;
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const ONLY = arg('only') ? new Set(arg('only').split(',')) : null, DRY = process.argv.includes('--dry');

const attrsOf = (s) => { const o = {}; for (const m of s.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)) o[m[1]] = m[2]; return o; };
const norm = (c) => (c == null ? null : String(c).trim().toLowerCase());
const isNone = (c) => c === 'none' || c === 'transparent';
const isWhite = (c) => c === '#fff' || c === '#ffffff' || c === 'white';
/** an ink colour: anything that is not none and not white (the drawings use #141414 for ink and accents) */
const isInk = (c) => !isNone(c) && !isWhite(c);
const idColour = (i) => `rgb(${i % 256},${Math.floor(i / 256)},200)`;

/**
 * the drawing's shapes in document order with their part (the nearest <g id>) and effective fill / stroke, and the SVG
 * rewritten so each shape draws its ink in its own colour (white fills stay white: they hide what is behind)
 */
function idSvg(text) {
  const stack = [{ fill: null, stroke: null, id: null }], shapes = [];
  const out = text.replace(/<!--[\s\S]*?-->|<desc[\s\S]*?<\/desc>|<(\/?)([a-zA-Z]+)((?:"[^"]*"|[^">])*?)(\/?)>/g, (all, close, tag, rest, self) => {
    if (!tag) return all;                                   // a comment or a construction sheet
    if (tag === 'g') {
      if (close) { stack.pop(); return all; }
      const a = attrsOf(rest), top = stack[stack.length - 1];
      stack.push({ fill: a.fill != null ? norm(a.fill) : top.fill, stroke: a.stroke != null ? norm(a.stroke) : top.stroke, id: a.id || top.id });
      return all;
    }
    if (tag === 'svg' && !close) return all.replace(/<svg/, '<svg shape-rendering="crispEdges"');
    if (close || !DRAWABLE.test(tag)) return all;
    const a = attrsOf(rest), top = stack[stack.length - 1];
    const fill = a.fill != null ? norm(a.fill) : top.fill != null ? top.fill : 'black';    // SVG's default fill is black
    const stroke = a.stroke != null ? norm(a.stroke) : top.stroke != null ? top.stroke : 'none';
    const i = shapes.length + 1, c = idColour(i);
    shapes.push({ i, tag, part: top.id, fill, stroke, inkFill: isInk(fill), white: isWhite(fill), stroked: !isNone(stroke) });
    const kept = rest.replace(/\s(fill|stroke)\s*=\s*"[^"]*"/g, '');
    return `<${tag}${kept} fill="__F${i}__" stroke="__S${i}__"${self ? '/' : ''}>`;
  });
  // the id render: every shape in its own colour; one shape's ink alone (cover): that shape black, every other shape absent
  const full = out.replace(/__F(\d+)__/g, (m, i) => { const s = shapes[i - 1]; return s.inkFill ? idColour(+i) : s.white ? '#fff' : 'none'; }).replace(/__S(\d+)__/g, (m, i) => (shapes[i - 1].stroked ? idColour(+i) : 'none'));
  const cover = (j) => out.replace(/__F(\d+)__/g, (m, i) => (+i === j && shapes[i - 1].inkFill ? '#000' : 'none')).replace(/__S(\d+)__/g, (m, i) => (+i === j && shapes[i - 1].stroked ? '#000' : 'none'));
  // one shape's whole area (its fill, white or ink, and its line): how big a part it is, a thin leg is not a big shape
  const silhouette = (j) => out.replace(/__F(\d+)__/g, (m, i) => (+i === j && (shapes[i - 1].inkFill || shapes[i - 1].white) ? '#000' : 'none')).replace(/__S(\d+)__/g, (m, i) => (+i === j && shapes[i - 1].stroked ? '#000' : 'none'));
  return { svg: full, cover, silhouette, shapes };
}

async function raw(svg, w, h) {
  const { data } = await sharp(Buffer.from(svg)).resize(w, h, { fit: 'fill' }).flatten({ background: '#fff' }).raw().toBuffer({ resolveWithObject: true });
  return data;
}
const ownerAt = (d, k) => (d[k * 3 + 2] === 200 && !(d[k * 3] === 255 && d[k * 3 + 1] === 255) ? d[k * 3] + 256 * d[k * 3 + 1] : 0);

/** the steps as lists of shape ids, before the store's rule is applied */
function groupShapes(sheet, shapes, own, size, adj) {
  const live = shapes.filter((s) => own[s.i]);
  // the units a lesson moves in: a construction sheet's named parts (a head with its eyes, a hat), else each shape
  const useSheet = !!(sheet && Array.isArray(sheet.steps) && sheet.steps.length);
  const unitOf = {}, units = [];
  for (const s of live) {
    const name = useSheet && s.part != null ? 'p:' + s.part : 's:' + s.i;
    if (unitOf[name] == null) { unitOf[name] = units.length; units.push({ ids: [], area: 0, px: 0, nb: new Set() }); }
    const u = units[unitOf[name]]; u.ids.push(s.i); u.area += size[s.i] || own[s.i].px; u.px += own[s.i].px; s.unit = unitOf[name];
  }
  const unitOfShape = {}; for (const s of live) unitOfShape[s.i] = s.unit;
  for (const s of live) for (const o of adj[s.i] || []) { const a = s.unit, b = unitOfShape[o]; if (b != null && b !== a) units[a].nb.add(b); }
  let ust;   // the steps as lists of units
  if (useSheet) {
    // the artist's own steps (ART-BRIEF.md construction sheet); a part outside them joins the last step
    const stepOf = {}; sheet.steps.forEach((parts, k) => parts.forEach((p) => { stepOf['p:' + p] = k; }));
    ust = sheet.steps.map(() => []);
    for (const [name, u] of Object.entries(unitOf)) ust[stepOf[name] != null ? stepOf[name] : ust.length - 1].push(u);
  } else {
    // big shapes first, the smallest last: a shape's size is the area it covers (2026-11-09: sized by its box, an ant's
    // thin legs came before its body)
    const all = units.map((u, j) => j).sort((a, b) => units[b].area - units[a].area);
    const tot = units.reduce((a, u) => a + u.px, 0), big = all.length ? units[all[0]].area : 1;
    const first = all.filter((u) => units[u].area >= 0.6 * big);
    for (const u of all) { if (first.reduce((a, x) => a + units[x].px, 0) >= 0.25 * tot) break; if (!first.includes(u)) first.push(u); }
    const rest = all.filter((u) => !first.includes(u));
    // the rest in as many steps (up to four) as keep each above ~9 % of the ink, in size order
    const left = rest.reduce((a, u) => a + units[u].px, 0), k = Math.max(1, Math.min(4, rest.length, Math.floor(left / tot / 0.09)));
    ust = [first];
    let cur = [], acc = 0, made = 0;
    for (const u of rest) { cur.push(u); acc += units[u].px; if (made < k - 1 && acc >= left * (made + 1) / k) { ust.push(cur); cur = []; made++; } }
    if (cur.length) ust.push(cur);
  }
  ust = ust.filter((x) => x.length);
  // a part never floats: one that touches nothing drawn in its step or before waits for the next step, until it does (a
  // leaf for its stem, feet for the body, a flag for its pole, continents for the globe's circle; read on all 351 lessons
  // 2026-11-09: 86 drew a part floating before what it hangs on). The first step's biggest part stays; the last step keeps
  // whatever is left (an eye inside a face, sparkles).
  const anchor = ust[0].slice().sort((a, b) => units[b].area - units[a].area)[0];
  for (let guard = 0; guard < 2000; guard++) {
    let moved = false;
    for (let k = 0; k < ust.length - 1 && !moved; k++) {
      const drawn = new Set(ust.slice(0, k + 1).flat());
      for (const u of ust[k]) {
        if (u === anchor) continue;
        if ([...units[u].nb].some((v) => v !== u && drawn.has(v))) continue;
        // what it hangs on comes forward into its step (the leaf and its stem drawn together), the nearest-step one first;
        // only a part that touches nothing at all waits for the next step
        let bring = -1, at = 1e9;
        for (let j = k + 1; j < ust.length; j++) for (const v of ust[j]) if (units[u].nb.has(v) && (j < at || (j === at && units[v].area < units[bring].area))) { bring = v; at = j; }
        if (bring >= 0) { ust[at] = ust[at].filter((x) => x !== bring); ust[k].push(bring); }
        else { ust[k] = ust[k].filter((x) => x !== u); ust[k + 1].push(u); }
        moved = true; break;
      }
    }
    if (!moved) break;
  }
  return { steps: ust.filter((x) => x.length).map((us) => us.flatMap((u) => units[u].ids)), how: useSheet ? 'sheet' : 'shapes' };
}

/** the store's rule: 4-5 steps, the first ≥ 25 %, every other ≥ 8 % — merging, never splitting a shape */
function fitRule(steps, inkOf, tot) {
  const share = (st) => st.reduce((a, i) => a + inkOf(i), 0) / tot;
  let s = steps.map((x) => x.slice());
  const mergeAt = (k) => { s[k] = s[k].concat(s[k + 1]); s.splice(k + 1, 1); };
  while (s.length > 5) {                                  // the two smallest neighbours
    let best = 0; for (let k = 1; k < s.length - 1; k++) if (share(s[k]) + share(s[k + 1]) < share(s[best]) + share(s[best + 1])) best = k;
    mergeAt(best);
  }
  while (s.length > 1 && share(s[0]) < 0.25) mergeAt(0);
  for (let guard = 0; guard < 10; guard++) {
    const k = s.findIndex((st, j) => j > 0 && share(st) < 0.08);
    if (k < 0 || s.length <= 1) break;
    if (k === s.length - 1) mergeAt(k - 1 > 0 ? k - 1 : 0); else mergeAt(k);   // a thin last step joins the one before; another the one after
  }
  return s;
}

(async () => {
  const man = JSON.parse(fs.readFileSync(path.join(WG, 'cache', 'manifest.json'), 'utf8'));
  const keyOf = {};
  for (const [theme, t] of Object.entries(man.themes)) for (const [noun, e] of Object.entries(t.nouns || {})) if (e.drawn) keyOf[noun] = theme + '/' + noun;
  let n = 0, ok = 0, bad = [];
  for (const f of fs.readdirSync(DRAWN).filter((x) => x.endsWith('.svg')).sort()) {
    const noun = f.slice(0, -4);
    if (ONLY && !ONLY.has(noun)) continue;
    const key = keyOf[noun]; if (!key) { bad.push(noun + ': not installed'); continue; }
    const slug = FL.slugOf(key), recFile = path.join(STORE, slug + '.json');
    if (!fs.existsSync(recFile)) { bad.push(noun + ': no How to Draw record'); continue; }
    const rec = JSON.parse(fs.readFileSync(recFile, 'utf8'));
    if (rec.refused) continue;
    if (!rec.bbox) { bad.push(noun + ': record has no bbox'); continue; }
    const text = fs.readFileSync(path.join(DRAWN, f), 'utf8');
    const sm = text.match(/<desc id="construction">([\s\S]*?)<\/desc>/); let sheet = null; try { sheet = sm ? JSON.parse(sm[1]) : null; } catch (e) { sheet = null; }
    const { svg, cover, silhouette, shapes } = idSvg(text);
    // where the drawing's ink sits in its own 600 box (2 px per unit), mapped onto the record's ink box
    const vb = (text.match(/viewBox="([^"]+)"/) || [, '0 0 600 600'])[1].split(/\s+/).map(Number);
    const PW = vb[2] * 2, PH = vb[3] * 2, d0 = await raw(svg, PW, PH);
    let bx0 = 1e9, by0 = 1e9, bx1 = -1, by1 = -1;
    for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) if (ownerAt(d0, y * PW + x)) { if (x < bx0) bx0 = x; if (x > bx1) bx1 = x; if (y < by0) by0 = y; if (y > by1) by1 = y; }
    bx0 = bx0 / 2 + vb[0]; by0 = by0 / 2 + vb[1]; bx1 = (bx1 + 1) / 2 + vb[0]; by1 = (by1 + 1) / 2 + vb[1];
    const [X0, Y0, X1, Y1] = rec.bbox, sx = (X1 - X0) / (bx1 - bx0), sy = (Y1 - Y0) / (by1 - by0), sc = (sx + sy) / 2;
    if (Math.abs(sx - sy) / sc > 0.04) bad.push(`${noun}: the record's box and the drawing disagree (${sx.toFixed(3)} / ${sy.toFixed(3)})`);
    const onCanvas = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${CW}" height="${CH}" viewBox="0 0 600 560" shape-rendering="crispEdges"><g transform="translate(${(X0 - sc * bx0).toFixed(3)} ${(Y0 - sc * by0).toFixed(3)}) scale(${sc.toFixed(5)})">${s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')}</g></svg>`;
    const d = await raw(onCanvas(svg), CW, CH);
    const owner = new Int32Array(CW * CH), own = {};
    let tot = 0;
    for (let k = 0; k < CW * CH; k++) {
      const o = ownerAt(d, k); if (!o) continue;
      owner[k] = o; tot++;
      const x = k % CW, y = (k / CW) | 0, r = own[o] || (own[o] = { px: 0, box: [x, y, x, y] });
      r.px++; if (x < r.box[0]) r.box[0] = x; if (y < r.box[1]) r.box[1] = y; if (x > r.box[2]) r.box[2] = x; if (y > r.box[3]) r.box[3] = y;
    }
    const size = {};
    for (const i of Object.keys(own).map(Number)) { const c = await raw(onCanvas(silhouette(i)), CW, CH); let a = 0; for (let p = 0; p < CW * CH; p++) if (c[p * 3] < 128) a++; size[i] = a; }
    // which shapes' lines touch (within 2 px of each other in the finished drawing)
    const adj = {};
    for (let p = 0; p < CW * CH; p++) {
      const o = owner[p]; if (!o) continue;
      const x = p % CW, y = (p / CW) | 0;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= CW || ny >= CH) continue; const o2 = owner[ny * CW + nx]; if (o2 && o2 !== o) (adj[o] || (adj[o] = new Set())).add(o2); }
    }
    const g = groupShapes(sheet, shapes, own, size, adj);
    let steps = fitRule(g.steps, (i) => own[i].px, tot);
    // each shape's own line, rendered once
    const covOf = {};
    for (const i of Object.keys(own).map(Number)) { const c = await raw(onCanvas(cover(i)), CW, CH); const m = new Uint8Array(CW * CH); for (let p = 0; p < CW * CH; p++) if (c[p * 3] < 128) m[p] = 1; covOf[i] = m; }
    // each ink pixel goes to the EARLIEST step whose shape passes through it, not to the shape drawn on top: a later
    // shape's line end lying over an outline would otherwise leave a gap in the earlier step (read 2026-11-09: the cup's
    // sides, the puppy's head)
    const stepOfShape = {}; steps.forEach((ids, k) => ids.forEach((i) => { stepOfShape[i] = k; }));
    const stepAt = new Uint8Array(CW * CH).fill(255);
    for (let k = 0; k < CW * CH; k++) if (owner[k]) stepAt[k] = stepOfShape[owner[k]];
    // only where it CONTINUES a line the step visibly draws: grown from the step's own visible pixels through the pixels its
    // shapes cover (a shape hidden behind a later one would otherwise leave loose stubs in its step: the cup's rim)
    for (let k0 = 0; k0 < steps.length - 1; k0++) {
      const cov = new Uint8Array(CW * CH);
      for (const i of steps[k0]) { const m = covOf[i]; if (m) for (let p = 0; p < CW * CH; p++) if (m[p]) cov[p] = 1; }
      const q = []; for (let p = 0; p < CW * CH; p++) if (stepAt[p] === k0) q.push(p);
      for (let h = 0; h < q.length; h++) {
        const p = q[h], x = p % CW, y = (p / CW) | 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= CW || ny >= CH) continue;
          const n2 = ny * CW + nx; if (owner[n2] && cov[n2] && stepAt[n2] > k0) { stepAt[n2] = k0; q.push(n2); }
        }
      }
    }
    // a scrap is a small loose piece of a step: an outline cut by the parts that will sit over it leaves pieces between them
    // (a dinosaur's belly between its legs, the bits of a ladder rail between rungs). A piece under a tenth of its step that
    // touches no earlier step's line moves to the earliest LATER step it touches, so it is drawn with the part it joins
    // (read on all 347 lessons 2026-11-09: 88 lessons had such scraps)
    for (let pass = 0; pass < 4; pass++) {
      let moved = 0;
      for (let k = 0; k < steps.length; k++) {
        const lab = new Int32Array(CW * CH).fill(-1), comps = [];
        let total = 0;
        for (let p = 0; p < CW * CH; p++) if (stepAt[p] === k) total++;
        for (let p0 = 0; p0 < CW * CH; p0++) {
          if (stepAt[p0] !== k || lab[p0] >= 0) continue;
          const id = comps.length, px = [p0]; lab[p0] = id;
          for (let h = 0; h < px.length; h++) {
            const p = px[h], x = p % CW, y = (p / CW) | 0;
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= CW || ny >= CH) continue; const n2 = ny * CW + nx; if (stepAt[n2] === k && lab[n2] < 0) { lab[n2] = id; px.push(n2); } }
          }
          comps.push(px);
        }
        for (const px of comps) {
          if (px.length >= 0.1 * total) continue;
          let earlier = false, later = 255;
          for (const p of px) {
            const x = p % CW, y = (p / CW) | 0;
            for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= CW || ny >= CH) continue; const s2 = stepAt[ny * CW + nx]; if (s2 === 255 || s2 === k) continue; if (s2 < k) earlier = true; else if (s2 < later) later = s2; }
            if (earlier) break;
          }
          if (earlier || later === 255) continue;
          for (const p of px) stepAt[p] = later;
          moved++;
        }
      }
      if (!moved) break;
    }
    // a step whose every piece moved on is gone
    { const cnt = new Array(steps.length).fill(0); for (let p = 0; p < CW * CH; p++) if (stepAt[p] !== 255) cnt[stepAt[p]]++;
      const map = []; let j = 0; for (let k = 0; k < steps.length; k++) map[k] = cnt[k] ? j++ : -1;
      if (j < steps.length) { for (let p = 0; p < CW * CH; p++) if (stepAt[p] !== 255) stepAt[p] = map[stepAt[p]]; for (let k = steps.length - 1; k >= 0; k--) if (map[k] < 0) { if (k > 0) steps[k - 1] = steps[k - 1].concat(steps[k]); steps.splice(k, 1); } } }
    const out = steps.map((ids, k) => {
      let x0 = CW, y0 = CH, x1 = -1, y1 = -1, px = 0;
      for (let p = 0; p < CW * CH; p++) if (stepAt[p] === k) { px++; const x = p % CW, y = (p / CW) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      const dd = px ? L.maskPath((x, y) => x >= 0 && y >= 0 && x < CW && y < CH && stepAt[y * CW + x] === k, [Math.max(0, x0 - 1), Math.max(0, y0 - 1), Math.min(CW - 1, x1 + 1), Math.min(CH - 1, y1 + 1)], U, 0.6) : '';
      return { d: dd, share: +(px / tot).toFixed(3), bbox: [x0 / U, y0 / U, (x1 + 1) / U, (y1 + 1) / U], kind: k === 0 ? 'outline' : k === steps.length - 1 ? 'details' : 'structure' };
    });
    const sh = out.map((x) => x.share), meets = sh.length >= 4 && sh.length <= 5 && sh[0] >= 0.25 && sh.slice(1).every((x) => x >= 0.08);
    rec.steps = out;
    rec.stats = { totalPx: tot, outerShare: sh[0], strokes: shapes.length, details: steps[steps.length - 1].length, parts: Object.keys(own).length, missing: 0, extra: 0, dup: 0, nSteps: out.length, lesson: 'drawn', from: g.how };
    if (!DRY) fs.writeFileSync(recFile, JSON.stringify(rec));
    n++; if (meets) ok++;
    if (ONLY) console.log(`${noun}: ${g.how} ${out.length} steps ${sh.join('/')}${meets ? '' : '  (does not meet the store rule)'}`);
  }
  console.log(`htd-drawn: ${n} drawings, ${ok} meet the store's rule (4-5 steps, first >= 25 %, others >= 8 %)${DRY ? ' (dry run)' : ''}`);
  if (bad.length) console.log('notes:\n  ' + bad.join('\n  '));
})().catch((e) => { console.error(e); process.exit(1); });
