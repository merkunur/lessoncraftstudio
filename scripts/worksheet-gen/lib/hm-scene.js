/**
 * hm-scene.js — compose ONE Handmade Mazes scene as an SVG (b8, K-405 `maze-puzzles`).
 *
 * Layers, back to front (all in body px; the body is 675 wide, `spec.H` tall):
 *   1. scenery: the field colour, a top scenery band (sky + far hills), optional drawn shapes (spec.scenery) —
 *      flat fills, no black outline (the colour library's own idiom);
 *   2. corridors (lib/hm-corridor.js: all outlines, then all fills) + the two mouths;
 *   3. island art: each `spec.cast` drawing at its OWN real-world height (spec), placed by its INK box (data/hm/
 *      ink-boxes.json) on the largest free island disc that holds it, never by its square image (a drawing's empty
 *      margin is not a place); a noun appears once per scene;
 *   4. the hero (start) and the goal, standing at their mouths, footprints declared for the oracle;
 *   5. markers: a teal start disc with a white triangle pointing into the maze, a coral pennant at the goal;
 *   6. the KEY's coral route (answer key only).
 * A drawing that cannot be placed is reported, never silently dropped (the caller refuses the build).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const H = require('./hm-graph.js');
const { corridorSvg, routePath } = require('./hm-corridor.js');

let INK = null;
function ink(src) {
  if (!INK) INK = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'hm', 'ink-boxes.json'), 'utf8'));
  const b = INK[src];
  if (!b) throw new Error('hm-scene: no ink box for "' + src + '" (run tools/hm-ink-boxes.js; is it a colour drawing?)');
  return b;
}
function fileOf(src) {
  const [theme, noun] = src.split('/');
  return path.join(__dirname, '..', 'cache', 'themes', theme, noun + '@3x.webp');
}
const href = (src) => require('url').pathToFileURL(fileOf(src)).href;

/** an <image> whose INK is `h` px tall with its feet at (fx, fy); returns {svg, box:[x0,y0,x1,y1]} of the ink */
function standing(src, fx, fy, h, flip) {
  const b = ink(src); const S = h / b.h;                    // the square's side so the ink is h tall
  const x = fx - (b.foot) * S, y = fy - (b.t + b.h) * S;    // feet = ink bottom at its foot x
  const box = [x + b.l * S, y + b.t * S, x + (b.l + b.w) * S, y + (b.t + b.h) * S];
  const t = flip ? ` transform="translate(${(2 * (x + S / 2)).toFixed(1)} 0) scale(-1 1)"` : '';
  const svg = `<image href="${href(src)}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${S.toFixed(1)}" height="${S.toFixed(1)}"${t} data-lcs-hm-art="${src}"/>`;
  return { svg, box, S };
}
/** an <image> whose ink is centred on (cx, cy) at ink height h */
function centred(src, cx, cy, h) {
  const b = ink(src); const S = h / b.h;
  const x = cx - (b.l + b.w / 2) * S, y = cy - (b.t + b.h / 2) * S;
  const box = [x + b.l * S, y + b.t * S, x + (b.l + b.w) * S, y + (b.t + b.h) * S];
  return { svg: `<image href="${href(src)}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${S.toFixed(1)}" height="${S.toFixed(1)}" data-lcs-hm-art="${src}"/>`, box };
}

/**
 * spec  = scene spec (data/hm/scenes.js entry)
 * maze  = lib/hm-maze.js generateTree() result, in MAZE-BOX coords (the box starts at y = spec.band.h)
 * opts  = { key: bool, screen: bool }
 * returns { svg, stamp (graph in body px for the oracle + the screen), placed, missing }
 */
function composeScene(spec, maze, opts = {}) {
  const Wb = 675, Hb = spec.H, oy = spec.band.h;          // body size; maze box y offset
  const tr = (p) => [p[0], p[1] + oy];                     // maze box → body
  const parts = [];
  // 0. the corridor colour must stand apart from every scenery colour (2026-10-11: a pale sky as light as the water
  //    corridor reads as more river on paper, and the oracle cannot tell them apart either). Max channel distance > 36.
  const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const LINE = spec.paint === 'line';   // the colouring face: ink lines on blank paper, nothing filled
  const INK = '#3A3530';
  if (!LINE) {
    const cf = hx(spec.corridor.fill);
    const tex = spec.texture ? [].concat(...Object.values(Array.isArray(spec.texture.colours) ? { all: spec.texture.colours } : spec.texture.colours)) : [];
    for (const [what, col] of [['field', spec.field], ['sky', spec.band.sky], ['hill', spec.band.hill]].concat(tex.map((c) => ['texture', c]))) {
      const d = Math.max(...hx(col).map((v, i) => Math.abs(v - cf[i])));
      if (d <= 36) throw new Error('hm-scene: the corridor colour ' + spec.corridor.fill + ' is too close to the ' + what + ' ' + col + ' (' + d + ')');
    }
  }
  // 1. scenery
  if (LINE) {
    parts.push(`<rect width="${Wb}" height="${Hb}" fill="#FFFFFF"/>`);
    // the sea band: its shore line + three wave lines (ink only, colourable)
    parts.push(`<path d="M0 ${oy + 8} C${Wb * 0.3} ${oy - 4} ${Wb * 0.62} ${oy + 18} ${Wb} ${oy + 4}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`);
    for (const [y, x0, x1] of [[oy * 0.34, 40, 210], [oy * 0.58, 250, 430], [oy * 0.38, 470, 640]]) {
      let d = `M${x0} ${y.toFixed(1)}`; const n = 4, st = (x1 - x0) / n;
      for (let k = 0; k < n; k++) d += ` q${(st / 2).toFixed(1)} ${k % 2 ? 7 : -7} ${st.toFixed(1)} 0`;
      parts.push(`<path d="${d}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`);
    }
  } else {
    parts.push(`<rect width="${Wb}" height="${Hb}" fill="${spec.field}"/>`);
    parts.push(`<path d="M0 0 H${Wb} V${oy + 8} C${Wb * 0.72} ${oy + 22} ${Wb * 0.32} ${oy - 10} 0 ${oy + 12} Z" fill="${spec.band.sky}"/>`);
    for (const hl of spec.band.hills || []) parts.push(`<path d="M${hl[0]} ${oy + 14} C${hl[0] + (hl[1] - hl[0]) * 0.2} ${oy + 14 - hl[2] * 1.3} ${hl[1] - (hl[1] - hl[0]) * 0.2} ${oy + 14 - hl[2] * 1.3} ${hl[1]} ${oy + 14} Z" fill="${spec.band.hill}"/>`);
  }
  for (const ba of spec.bandArt || []) { const a = standing(ba.src, ba.x, oy + 12, ba.h); parts.push(a.svg); }
  for (const d of spec.dots || []) parts.push(`<ellipse cx="${d[0]}" cy="${d[1] + oy}" rx="${d[2]}" ry="${(d[2] * 0.62).toFixed(1)}" fill="${d[3]}"/>`);
  // 2. corridors (translated into body px)
  const chains = maze.chains.map((c) => ({ ...c, d: c.d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m0, x, y) => `${x} ${(+y + oy).toFixed(1)}`) }));
  parts.push(corridorSvg({ chains, W: maze.W, fill: spec.corridor.fill, edge: spec.corridor.edge, outline: spec.corridor.outline || 3.5 }));
  // 3. island art: largest first, each on the largest disc that holds its ink half-diagonal
  const S = {}; for (const [k, v] of Object.entries(maze.S)) S[k] = v.map(tr);
  const keep = (spec.keep || []).map((k) => [k[0], k[1] + oy, k[2]]);
  const isl = H.islands(Object.assign({}, S, { ms: maze.mouthS.start.map(tr), mg: maze.mouthS.goal.map(tr) }), maze.W, keep, { x0: 0, y0: oy + 4, x1: Wb, y1: Hb }, { air: 6, minR: 18 });
  const taken = [];
  const placed = [], missing = [];
  const free = (x, y, r) => taken.every((t) => Math.hypot(t[0] - x, t[1] - y) >= t[2] + r + 4);
  const cast = (spec.cast || []).slice().sort((a, b) => b.h - a.h);
  for (const c of cast) {
    const b = ink(c.src); const wpx = c.h * b.w / b.h; const need = Math.max(wpx, c.h) / 2 + 3;   // a disc holding the ink box minus its transparent corners (the box diagonal refused every jungle drawing)
    const disc = isl.find((d) => d[2] >= need && free(d[0], d[1], need) && (!c.zone || (d[1] >= c.zone[0] + oy && d[1] <= c.zone[1] + oy)));
    if (!disc) { if (!c.optional) missing.push(c.src); continue; }   // optional = placed when an island has room (a dense maze has ~6)
    const a = centred(c.src, disc[0], disc[1], c.h);
    taken.push([disc[0], disc[1], need]);
    placed.push({ src: c.src, box: a.box }); parts.push(a.svg);
  }
  // 3b. texture: small drawn motifs (grass tufts, fallen leaves, pebbles …) on the free island ground, never on a road
  //     or a drawing; flat fills in a darker / lighter tone of the field (the library's idiom). Seeded by opts.rnd.
  if (spec.texture && opts.rnd) {
    const rnd = opts.rnd; const pts = [];
    const env = maze.W / 2 + 3.5 + 9; const allS = Object.values(S).concat([maze.mouthS.start.map(tr), maze.mouthS.goal.map(tr)]);
    for (let y = oy + 14; y < Hb - 12; y += 18) for (let x = 12; x < Wb - 12; x += 18) {
      const px = x + (rnd() - 0.5) * 12, py = y + (rnd() - 0.5) * 12;
      let ok = true;
      for (const ss of allS) { for (const q of ss) if (Math.hypot(q[0] - px, q[1] - py) < env) { ok = false; break; } if (!ok) break; }
      if (!ok) continue;
      for (const p of placed) if (px > p.box[0] - 10 && px < p.box[2] + 10 && py > p.box[1] - 10 && py < p.box[3] + 10) { ok = false; break; }
      for (const b of [spec.hero, spec.goal]) if (Math.hypot(b.at[0] - px, b.at[1] + oy - b.h / 2 - py) < b.h * 0.6) ok = false;
      if (ok) pts.push([px, py]);
    }
    const chosen = [];
    for (const p of pts.map((v) => [rnd(), v]).sort((a, b) => a[0] - b[0]).map((t) => t[1])) {
      if (chosen.length >= (spec.texture.n || 26)) break;
      if (chosen.every((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) >= (spec.texture.gap || 46))) chosen.push(p);
    }
    for (const [x, y] of chosen) {
      const kind = spec.texture.kinds[Math.floor(rnd() * spec.texture.kinds.length)];
      const pal = (spec.texture.colours[kind] || spec.texture.colours); const c = pal[Math.floor(rnd() * pal.length)];
      const r = (v) => v.toFixed(1); const a = Math.round((rnd() - 0.5) * 50);
      if (kind === 'tuft') parts.push(`<path d="M${r(x - 7)} ${r(y)} Q${r(x - 8)} ${r(y - 9)} ${r(x - 11)} ${r(y - 14)} Q${r(x - 4)} ${r(y - 9)} ${r(x - 2)} ${r(y)} Q${r(x - 1)} ${r(y - 13)} ${r(x + 1)} ${r(y - 18)} Q${r(x + 4)} ${r(y - 11)} ${r(x + 3)} ${r(y)} Q${r(x + 6)} ${r(y - 9)} ${r(x + 11)} ${r(y - 12)} Q${r(x + 8)} ${r(y - 5)} ${r(x + 8)} ${r(y)} Z" fill="${c}"/>`);
      else if (kind === 'leaf') parts.push(`<path d="M${r(x - 9)} ${r(y)} Q${r(x)} ${r(y - 8)} ${r(x + 9)} ${r(y)} Q${r(x)} ${r(y + 8)} ${r(x - 9)} ${r(y)} Z" fill="${c}" transform="rotate(${a} ${r(x)} ${r(y)})"/>`);
      else if (kind === 'pebble') parts.push(`<ellipse cx="${r(x)}" cy="${r(y)}" rx="${r(6 + rnd() * 4)}" ry="${r(4 + rnd() * 2)}" fill="${c}"/>`);
      else if (kind === 'sand') { for (const [ox, oy2] of [[0, 0], [7, 4], [-6, 5]]) parts.push('<circle cx="' + r(x + ox) + '" cy="' + r(y + oy2) + '" r="1.8" fill="' + INK + '"/>'); }
      else if (kind === 'star') { const k = 4 + rnd() * 3; parts.push('<path d="M' + r(x) + ' ' + r(y - k) + ' Q' + r(x + 1) + ' ' + r(y - 1) + ' ' + r(x + k) + ' ' + r(y) + ' Q' + r(x + 1) + ' ' + r(y + 1) + ' ' + r(x) + ' ' + r(y + k) + ' Q' + r(x - 1) + ' ' + r(y + 1) + ' ' + r(x - k) + ' ' + r(y) + ' Q' + r(x - 1) + ' ' + r(y - 1) + ' ' + r(x) + ' ' + r(y - k) + ' Z" fill="' + c + '"/>'); }
      else if (kind === 'bubble') parts.push('<circle cx="' + r(x) + '" cy="' + r(y) + '" r="' + r(4 + rnd() * 5) + '" fill="none" stroke="' + c + '" stroke-width="2"/>');
      else if (kind === 'dot') parts.push(`<circle cx="${r(x)}" cy="${r(y)}" r="${r(3 + rnd() * 2)}" fill="${c}"/>`);
    }
  }
  // 4. the key's route (start mouth → route → goal mouth), UNDER the hero, the goal and the markers (2026-10-11: drawn
  //    on top it covered half the start disc)
  const ms = maze.mouthS.start.map(tr), mg = maze.mouthS.goal.map(tr);
  if (opts.key) {
    const body = routePath(maze.route, maze.S, H.ek).slice(1).split(' L').map((t) => t.split(' ').map(Number));
    const pts = maze.mouthS.start.slice().reverse().concat(body, maze.mouthS.goal).map(tr);
    const d = 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
    parts.push(`<path d="${d}" fill="none" stroke="#F2784B" stroke-width="${(LINE ? maze.W - 8 : Math.max(10, maze.W * 0.45)).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" opacity="${LINE ? 0.55 : 0.88}" data-lcs-hm-key="1"/>`);
  }
  // 4b. STONES (label faces): one stone per labelled station, identical style for route and decoys (one style object,
  //     so a stone's look never tells the answer), centred on the station, upright. Letters are drawn with the
  //     platform's school letterforms (data/tracing/letter-strokes.js: single-storey a / g; unknown glyph THROWS);
  //     numbers and sums as Baloo 2 700 text.
  const stoneStand = [];
  if (maze.labels && spec.labels) {
    const L = spec.labels; const LS = require('../data/tracing/letter-strokes.js');
    for (const [v, lab] of maze.labels) {
      const [cx, cy] = tr(maze.P[v]);
      const shape = L.shape || 'circle'; const sw = L.size ? L.size[0] : (L.stoneR || 28) * 2, shh = L.size ? L.size[1] : (L.stoneR || 28) * 2;
      if (shape === 'circle') parts.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(sw / 2).toFixed(1)}" fill="${L.fill || '#FFFFFF'}" stroke="${L.edge || '#146B5E'}" stroke-width="2.5" data-lcs-hm-stone="${v}"/>`);
      else parts.push(`<rect x="${(cx - sw / 2).toFixed(1)}" y="${(cy - shh / 2).toFixed(1)}" width="${sw}" height="${shh}" rx="${(shh / 2).toFixed(1)}" fill="${L.fill || '#FFFFFF'}" stroke="${L.edge || '#146B5E'}" stroke-width="2.5" data-lcs-hm-stone="${v}"/>`);
      if (L.glyph === 'letters') {
        const g = LS.glyphFor(lab); const capH = L.capH || 30; const k = capH / 68;   // the source box: caps 16 → 84
        const ix = (g.ink.x0 + g.ink.x1) / 2, iy = L.case === 'lower' ? 64 : 50;       // centre on the cap / x-height band
        parts.push(`<g transform="translate(${(cx - ix * k).toFixed(2)} ${(cy - iy * k).toFixed(2)}) scale(${k.toFixed(4)})" fill="none" stroke="#3A3530" stroke-width="${(4.5 / k).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round" data-lcs-hm-label="${lab}">${g.strokes.map((s) => `<path d="${s.d}"/>`).join('')}</g>`);
      } else {
        parts.push(`<text x="${cx.toFixed(1)}" y="${(cy + (L.fontPx || 28) * 0.36).toFixed(1)}" text-anchor="middle" font-family="'Baloo 2', Nunito, sans-serif" font-weight="700" font-size="${L.fontPx || 28}" fill="#3A3530" data-lcs-hm-label="${lab}">${String(lab).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>`);
      }
      stoneStand.push([+cx.toFixed(1), +cy.toFixed(1), +((Math.max(sw, shh) / 2) + 3).toFixed(1)]);
    }
  }
  // 5. hero + goal standing at their mouths (spec gives the feet point + height, box coords)
  const hero = standing(spec.hero.src, spec.hero.at[0], spec.hero.at[1] + oy, spec.hero.h, spec.hero.flip);
  const goal = standing(spec.goal.src, spec.goal.at[0], spec.goal.at[1] + oy, spec.goal.h, spec.goal.flip);
  // a drawn dock under a goal that waits by the water (flat planks + posts, the library's idiom; inside the goal footprint)
  if (spec.goal.dock) {
    const fx = spec.goal.at[0], fy = spec.goal.at[1] + oy, dw = spec.goal.dock.w, dh = spec.goal.dock.h; const x0 = fx - dw / 2, y0 = fy - dh * 0.55;
    for (let k = 0; k < 3; k++) parts.push('<rect x="' + (x0 + k * dw / 3 + 1).toFixed(1) + '" y="' + y0.toFixed(1) + '" width="' + (dw / 3 - 2).toFixed(1) + '" height="' + dh.toFixed(1) + '" rx="3" fill="#D9A86A" stroke="#B5854A" stroke-width="2"/>');
    for (const px of [x0 + 8, x0 + dw - 14]) parts.push('<rect x="' + px.toFixed(1) + '" y="' + (y0 + dh - 2).toFixed(1) + '" width="6" height="12" fill="#B5854A"/>');
  }
  // a hero / goal drawing never covers a stone (2026-10-11: the moon hid the edge of a letter stone)
  for (const [nm, bx] of [['hero', hero.box], ['goal', goal.box]]) for (const [sx, sy, sr] of stoneStand) {
    const qx = Math.max(bx[0], Math.min(sx, bx[2])), qy = Math.max(bx[1], Math.min(sy, bx[3]));
    if (Math.hypot(qx - sx, qy - sy) < sr - 4) missing.push(nm + ' drawing over a stone');
  }
  parts.push(goal.svg, hero.svg);
  // 6. markers: start disc at the start mouth end, pointing along the mouth into the maze (a NOTCHED chevron: a near-
  //    equilateral triangle reads as pointing toward any of its corners once rotated, 2026-10-11); pennant at the goal mouth
  const sp = ms[ms.length - 1], sp2 = ms[ms.length - 3];
  const ang = Math.atan2(sp2[1] - sp[1], sp2[0] - sp[0]) * 180 / Math.PI;
  parts.push(`<g data-lcs-hm-start="1" transform="translate(${sp[0].toFixed(1)} ${sp[1].toFixed(1)})"><circle r="${spec.disc || 22}" fill="${LINE ? '#FFFFFF' : '#146B5E'}" stroke="${LINE ? INK : '#FFFFFF'}" stroke-width="${LINE ? 2.5 : 3}"/><path d="${(spec.disc || 22) > 24 ? 'M-10 -12 L13 0 L-10 12 L-4 0 Z' : 'M-8 -10 L11 0 L-8 10 L-3 0 Z'}" fill="${LINE ? 'none' : '#FFFFFF'}" stroke="${LINE ? INK : 'none'}" stroke-width="2.5" stroke-linejoin="round" transform="rotate(${ang.toFixed(1)})"/></g>`);
  const gp = mg[mg.length - 1];
  parts.push(`<g data-lcs-hm-goal="1" transform="translate(${gp[0].toFixed(1)} ${gp[1].toFixed(1)})"><circle r="26" fill="none" stroke="${LINE ? INK : '#F2784B'}" stroke-width="${LINE ? 2.2 : 3}" stroke-dasharray="7 6"/><rect x="-1.5" y="-46" width="3" height="46" fill="${LINE ? INK : '#8A8276'}"/><path d="M1.5 -46 L31.5 -38 L1.5 -27 Z" fill="${LINE ? '#FFFFFF' : '#F2784B'}" stroke="${LINE ? INK : 'none'}" stroke-width="2.2" stroke-linejoin="round"/></g>`);
  // the stamp: the declared graph in body px (oracle + screen); stand footprints = the hero / goal ink boxes
  const fp = (box) => { const cx = (box[0] + box[2]) / 2, cy = (box[1] + box[3]) / 2; return [+cx.toFixed(1), +cy.toFixed(1), +(Math.hypot(box[2] - box[0], box[3] - box[1]) / 2).toFixed(1)]; };
  const r1 = (pts) => pts.map((p) => [+p[0].toFixed(1), +p[1].toFixed(1)]);
  const stamp = {
    W: maze.W, fill: spec.corridor.fill,
    nodes: maze.P.map(tr).map((p) => [+p[0].toFixed(1), +p[1].toFixed(1)]),
    edges: Object.entries(S).map(([k, pts]) => { const [a, b] = k.split('-').map(Number); return { a, b, pts: r1(pts) }; }),
    mouths: { start: r1(ms), goal: r1(mg) }, route: maze.route, s: maze.s, g: maze.g, tree: !maze.loops, line: LINE,
    art: placed.map((p) => p.box.map((v) => +v.toFixed(1))),
    ...(maze.labels ? { labels: maze.P.map((_, i) => (maze.labels.has(i) ? maze.labels.get(i) : null)), rule: maze.ruleStamp || null } : {}),
    stand: [fp(hero.box), fp(goal.box), [+sp[0].toFixed(1), +sp[1].toFixed(1), (spec.disc || 22) + 8], [+gp[0].toFixed(1), +(gp[1] - 14).toFixed(1), 48]].concat(stoneStand),
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Wb}" height="${Hb}" viewBox="0 0 ${Wb} ${Hb}" data-lcs-prim="hm-scene" data-lcs-hm-graph='${JSON.stringify(stamp)}'>`
    + `<defs><clipPath id="hmclip"><rect width="${Wb}" height="${Hb}" rx="18"/></clipPath></defs><g clip-path="url(#hmclip)">${parts.join('')}</g>`
    + `<rect x="1.5" y="1.5" width="${Wb - 3}" height="${Hb - 3}" rx="18" fill="none" stroke="#146B5E" stroke-width="3"/></svg>`;
  return { svg, stamp, placed, missing };
}

module.exports = { composeScene, ink, standing, centred };
