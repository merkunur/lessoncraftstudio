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
  let box = [x + b.l * S, y + b.t * S, x + (b.l + b.w) * S, y + (b.t + b.h) * S];
  if (flip) { const ax = 2 * (x + S / 2); box = [ax - box[2], box[1], ax - box[0], box[3]]; }   // the ink box mirrors with the drawing
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
 * chambersFor(spec, maze, oy) → [{x, y, r, bug}] in body px: the goal's store chamber (spec.chambers.goal [x, y, r], box px)
 * plus one chamber per bug at a BLIND END of the tree (a leaf that is not the start or the goal), farthest-first so they
 * spread over the page, each only where its disc keeps the full corridor clearance (W/2 + outline + 6) from every road
 * not ending in it — a chamber may never touch a second tunnel.
 */
function chambersFor(spec, maze, oy) {
  const C = spec.chambers; const out = [];
  if (C.goal) out.push({ x: C.goal[0], y: C.goal[1] + oy, r: C.goal[2], bug: null });
  const need = (r) => r + maze.W / 2 + (spec.corridor.outline || 3.5) + 6;
  const leaves = maze.adj.map((a, v) => (a.length === 1 && v !== maze.s && v !== maze.g ? v : -1)).filter((v) => v >= 0);
  const ok = leaves.filter((v) => {
    const [x, y] = maze.P[v];
    for (const [k, ss] of Object.entries(maze.S)) { const [a, b] = k.split('-').map(Number); if (a === v || b === v) continue; for (const q of ss) if (Math.hypot(q[0] - x, q[1] - y) < need(C.r)) return false; }
    return true;
  });
  const chosen = [];
  while (chosen.length < C.bugs.length && chosen.length < ok.length) {
    let best = -1, bd = -1;
    for (const v of ok) { if (chosen.includes(v)) continue; const d = chosen.length ? Math.min(...chosen.map((u) => Math.hypot(maze.P[u][0] - maze.P[v][0], maze.P[u][1] - maze.P[v][1]))) : maze.P[v][1]; if (d > bd) { bd = d; best = v; } }
    if (best < 0) break; chosen.push(best);
  }
  chosen.forEach((v, i) => out.push({ x: maze.P[v][0], y: maze.P[v][1] + oy, r: C.r, bug: C.bugs[i] }));
  return out;
}

/**
 * spec  = scene spec (data/hm/scenes.js entry)
 * maze  = lib/hm-maze.js generateTree() result, in MAZE-BOX coords (the box starts at y = spec.band.h)
 * opts  = { key: bool, screen: bool }
 * returns { svg, stamp (graph in body px for the oracle + the screen), placed, missing }
 */
function composeScene(spec, maze, opts = {}) {
  // a generator that places the hero / goal itself (F6: the vehicles park beside the drawn mouth rows) overrides spec.at
  if (maze.heroAt || maze.goalAt) spec = { ...spec, hero: { ...spec.hero, at: maze.heroAt || spec.hero.at }, goal: { ...spec.goal, at: maze.goalAt || spec.goal.at } };
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
    const strata = (spec.strata || []).map((st) => ['stratum', st[1]]).concat(spec.band.flat ? [['grass', spec.band.flat.grass]] : []);
    for (const [what, col] of [['field', spec.field], ['sky', spec.band.sky], ['hill', spec.band.hill]].concat(tex.map((c) => ['texture', c]), strata)) {
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
    // soil strata (a cross-section face): each band from its box y to the bottom, darker with depth
    for (const [y0, col] of spec.strata || []) parts.push(`<rect x="0" y="${y0 + oy}" width="${Wb}" height="${Hb - y0 - oy}" fill="${col}"/>`);
    if (spec.band.flat) {
      // a cross-section has a level ground line: sky down to the grass strip, the strip's top edge a little uneven
      const gh = spec.band.flat.h; let d = `M0 0 H${Wb} V${oy - gh}`;
      for (let x = Wb; x > 0; x -= 45) d += ` Q${x - 22} ${oy - gh - 5} ${Math.max(0, x - 45)} ${oy - gh}`;
      parts.push(`<path d="${d} Z" fill="${spec.band.sky}"/>`);
      parts.push(`<path d="M0 ${oy - gh} ${Array.from({ length: 16 }, (_, i) => 'Q' + (i * 45 + 22) + ' ' + (oy - gh - 6) + ' ' + Math.min(Wb, i * 45 + 45) + ' ' + (oy - gh)).join(' ')} V${oy + 2} H0 Z" fill="${spec.band.flat.grass}"/>`);
    } else parts.push(`<path d="M0 0 H${Wb} V${oy + 8} C${Wb * 0.72} ${oy + 22} ${Wb * 0.32} ${oy - 10} 0 ${oy + 12} Z" fill="${spec.band.sky}"/>`);
    if (!spec.band.flat) for (const hl of spec.band.hills || []) parts.push(`<path d="M${hl[0]} ${oy + 14} C${hl[0] + (hl[1] - hl[0]) * 0.2} ${oy + 14 - hl[2] * 1.3} ${hl[1] - (hl[1] - hl[0]) * 0.2} ${oy + 14 - hl[2] * 1.3} ${hl[1]} ${oy + 14} Z" fill="${spec.band.hill}"/>`);
    // F7: a wooden fence along the top band (two rails on posts); the babies stand in front of it
    if (spec.band.fence) {
      const F = spec.band.fence; for (let x = 18; x < Wb; x += 64) parts.push(`<rect x="${x - 4}" y="${oy - 34}" width="8" height="34" rx="2" fill="${F.post}"/>`);
      for (const y of [oy - 28, oy - 14]) parts.push(`<rect x="0" y="${y}" width="${Wb}" height="7" rx="3" fill="${F.rail}"/>`);
    }
  }
  for (const ba of spec.bandArt || []) { const a = standing(ba.src, ba.x, oy + 12, ba.h); parts.push(a.svg); }
  for (const d of spec.dots || []) parts.push(`<ellipse cx="${d[0]}" cy="${d[1] + oy}" rx="${d[2]}" ry="${(d[2] * 0.62).toFixed(1)}" fill="${d[3]}"/>`);
  // 2. corridors (translated into body px)
  const chains = maze.chains.map((c) => ({ ...c, d: c.d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m0, x, y) => `${x} ${(+y + oy).toFixed(1)}`) }));
  // the routes on the page: one on every face but F7, where k babies each have their own road (maze.routes)
  const RT = maze.routes || [{ route: maze.route, s: maze.s, g: maze.g, mouthS: maze.mouthS }];
  const MULTI = RT.length > 1;
  // F7: the mothers' mown paddocks, under the corridors (a road may brush a paddock's rim, never the mother inside)
  for (const pd of (spec.paddocks || [])) parts.push(`<circle cx="${pd[0]}" cy="${(pd[1] + oy).toFixed(1)}" r="${pd[2]}" fill="${spec.paddockFill || '#D7EBAE'}"/>`);
  const chamberList = spec.chambers ? chambersFor(spec, maze, oy) : [];
  const olw = spec.corridor.outline || 3.5;
  for (const c of chamberList) parts.push(`<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${(c.r + olw).toFixed(1)}" fill="${spec.corridor.edge}"/>`);
  parts.push(corridorSvg({ chains, W: maze.W, fill: spec.corridor.fill, edge: spec.corridor.edge, outline: spec.corridor.outline || 3.5 }));
  for (const c of chamberList) parts.push(`<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${c.r.toFixed(1)}" fill="${spec.corridor.fill}" data-lcs-hm-chamber="${c.bug || 'goal'}"/>`);
  // street furniture (F6): one round COVER at the middle of EVERY street piece (route or not: the unit the child counts
  // is "covers driven over", never lawns passed), and a striped BARRIER across every dead end. Both stand ON the road,
  // so both are declared footprints for the oracle.
  const streetStand = [];
  if (spec.streets) {
    const SC = spec.streets;
    for (const [k, mp] of Object.entries(maze.mid)) {
      if (!maze.S[k]) continue; const [x, y] = tr(mp);
      parts.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${SC.coverR || 7}" fill="${SC.cover || '#B9B4AB'}" stroke="${SC.coverEdge || '#8F8A82'}" stroke-width="1.6" data-lcs-hm-cover="${k}"/>`);
      streetStand.push([+x.toFixed(1), +y.toFixed(1), (SC.coverR || 7) + 3]);
    }
    for (const v of (maze.streets && maze.streets.deadEnds) || []) {
      const [x, y] = tr(maze.P[v]); const w = maze.adj[v][0]; const [wx, wy] = tr(maze.P[w]);
      const ux = (x - wx) / (Math.hypot(x - wx, y - wy) || 1), uy = (y - wy) / (Math.hypot(x - wx, y - wy) || 1);
      const ang = Math.atan2(uy, ux) * 180 / Math.PI + 90, cx = x - ux * 4, cy = y - uy * 4, bw = maze.W + 6;
      parts.push(`<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${ang.toFixed(1)})" data-lcs-hm-barrier="${v}"><rect x="${(-bw / 2).toFixed(1)}" y="-5" width="${bw.toFixed(1)}" height="10" rx="3" fill="#FFFFFF" stroke="#C2423A" stroke-width="2"/>${[-2, -1, 0, 1, 2].map((i) => `<rect x="${(i * bw / 5 - bw / 10 + 1).toFixed(1)}" y="-5" width="${(bw / 10).toFixed(1)}" height="10" fill="#E2574C"/>`).join('')}</g>`);
      streetStand.push([+cx.toFixed(1), +cy.toFixed(1), bw / 2 + 4]);
    }
  }
  // 3. island art: largest first, each on the largest disc that holds its ink half-diagonal
  const S = {}; for (const [k, v] of Object.entries(maze.S)) S[k] = v.map(tr);
  const keep = (spec.keep || []).map((k) => [k[0], k[1] + oy, k[2]]);
  const mouthRoads = {}; RT.forEach((r, i) => { mouthRoads['ms' + i] = r.mouthS.start.map(tr); mouthRoads['mg' + i] = r.mouthS.goal.map(tr); });
  const isl = H.islands(Object.assign({}, S, mouthRoads), maze.W, keep, { x0: 0, y0: oy + 4, x1: Wb, y1: Hb }, { air: 6, minR: 18 });
  const taken = [];
  // the hero and the goal are placed FIRST and claim their ink boxes, so no island drawing stands on them (2026-10-11:
  // the town's fence stood behind the tow truck and an oak on the car's roof — a scene without keep discs had nothing
  // else stopping it)
  // F7: baby i stands at the top of column i; paddock j holds the mother of the baby whose road ends there (π⁻¹(j))
  let heroSpecs = [spec.hero], goalSpecs = [spec.goal];
  if (MULTI) {
    const inv = []; maze.pi.forEach((j, i) => { inv[j] = i; });
    heroSpecs = spec.pairs.map((pr, i) => ({ src: pr.baby, h: pr.babyH, at: spec.babyFeet[i] }));
    // each mother stands a little AWAY from the side her road arrives on, so the arrival ring never sits on her
    goalSpecs = spec.paddocks.map((pd, j) => {
      const pr = spec.pairs[inv[j]]; const rt = RT.find((r) => r.mother === j); const e = rt.mouthS.goal[rt.mouthS.goal.length - 1];
      const L = Math.hypot(e[0] - pd[0], e[1] - pd[1]) || 1, ux = (e[0] - pd[0]) / L, uy = (e[1] - pd[1]) / L;
      return { src: pr.mother, h: pr.motherH, at: [pd[0] - ux * 12, pd[1] + pr.motherH * 0.5 - uy * 12] };
    });
  }
  const heroes = heroSpecs.map((h) => standing(h.src, h.at[0], h.at[1] + oy, h.h, h.flip));
  const goals = goalSpecs.map((g) => standing(g.src, g.at[0], g.at[1] + oy, g.h, g.flip));
  const hero = heroes[0], goal = goals[0];
  for (const b of heroes.concat(goals).map((x) => x.box)) taken.push([(b[0] + b[2]) / 2, (b[1] + b[3]) / 2, Math.hypot(b[2] - b[0], b[3] - b[1]) / 2]);
  const placed = [], missing = [];
  const free = (x, y, r) => taken.every((t) => Math.hypot(t[0] - x, t[1] - y) >= t[2] + r + 4);
  // the RULE BADGE (predicate faces): a teal disc with the target, printed once, on the free island nearest the start
  //    disc (never on a road: it is chosen from the island discs)
  //    (running total: the START load beside the start in teal, the TARGET beside the goal in coral)
  const badges = !(maze.ruleStamp && spec.labels && spec.labels.badge) ? []
    : maze.ruleStamp.kind === 'pred' ? [{ v: maze.ruleStamp.target, at: 'start', fill: '#146B5E' }]
      : maze.ruleStamp.kind === 'ops' ? [{ v: maze.ruleStamp.start, at: 'start', fill: '#146B5E' }, { v: maze.ruleStamp.target, at: 'goal', fill: '#F2784B' }] : [];
  for (const bd of badges) {
    const ms0 = bd.at === 'start' ? maze.mouthS.start : maze.mouthS.goal; const st0 = ms0[ms0.length - 1];
    const sx = st0[0], sy = st0[1] + oy; const R0 = String(bd.v).length > 2 ? 34 : 30;
    const disc = isl.filter((d) => d[2] >= R0 + 2 && free(d[0], d[1], R0)).sort((p, q) => Math.hypot(p[0] - sx, p[1] - sy) - Math.hypot(q[0] - sx, q[1] - sy))[0];
    if (!disc) { missing.push('rule badge'); continue; }
    taken.push([disc[0], disc[1], R0]); placed.push({ src: 'badge', box: [disc[0] - R0, disc[1] - R0, disc[0] + R0, disc[1] + R0] });
    parts.push('<g data-lcs-hm-badge="' + bd.v + '" data-lcs-hm-badge-at="' + bd.at + '"><circle cx="' + disc[0].toFixed(1) + '" cy="' + disc[1].toFixed(1) + '" r="' + R0 + '" fill="' + bd.fill + '" stroke="#FFFFFF" stroke-width="3"/><text x="' + disc[0].toFixed(1) + '" y="' + (disc[1] + 10).toFixed(1) + '" text-anchor="middle" font-family="&quot;Baloo 2&quot;, Nunito, sans-serif" font-weight="700" font-size="28" fill="#FFFFFF">' + bd.v + '</text></g>');
  }
  const cast = (spec.cast || []).slice().sort((a, b) => b.h - a.h);
  for (const c of cast) {
    const b = ink(c.src); const wpx = c.h * b.w / b.h; const need = Math.max(wpx, c.h) / 2 + 3;   // a disc holding the ink box minus its transparent corners (the box diagonal refused every jungle drawing)
    const disc = isl.find((d) => d[2] >= need && free(d[0], d[1], need) && (!c.zone || (d[1] >= c.zone[0] + oy && d[1] <= c.zone[1] + oy)));
    if (!disc) { if (!c.optional) missing.push(c.src); continue; }   // optional = placed when an island has room (a dense maze has ~6)
    const a = centred(c.src, disc[0], disc[1], c.h);
    taken.push([disc[0], disc[1], need]);
    placed.push({ src: c.src, box: a.box }); parts.push(a.svg);
  }
  for (const c of chamberList) if (c.bug) { const a = centred(c.bug, c.x, c.y, spec.chambers.bugH || 34); placed.push({ src: c.bug, box: a.box }); parts.push(a.svg); }
  if (spec.chambers && chamberList.filter((c) => c.bug).length < Math.min(2, spec.chambers.bugs.length)) missing.push('chambers (fewer than 2 blind ends with room)');
  // 3b. texture: small drawn motifs (grass tufts, fallen leaves, pebbles …) on the free island ground, never on a road
  //     or a drawing; flat fills in a darker / lighter tone of the field (the library's idiom). Seeded by opts.rnd.
  if (spec.texture && opts.rnd) {
    const rnd = opts.rnd; const pts = [];
    const env = maze.W / 2 + 3.5 + 9; const allS = Object.values(S).concat(Object.values(mouthRoads));
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
  const KEY_COL = MULTI ? ['#2F5BD3', '#7B3FB8', '#C98A12', '#8A5A2B'] : ['#F2784B'];   // F7: the screen's ink colours
  if (opts.key) RT.forEach((rt, i) => {
    const body = routePath(rt.route, maze.S, H.ek).slice(1).split(' L').map((t) => t.split(' ').map(Number));
    const pts = rt.mouthS.start.slice().reverse().concat(body, rt.mouthS.goal).map(tr);
    const d = 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
    parts.push(`<path d="${d}" fill="none" stroke="${KEY_COL[i % KEY_COL.length]}" stroke-width="${(LINE ? maze.W - 8 : Math.max(10, maze.W * 0.45)).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" opacity="${LINE ? 0.55 : 0.88}" data-lcs-hm-key="${i + 1}"/>`);
  });
  // 4b. STONES (label faces): one stone per labelled station, identical style for route and decoys (one style object,
  //     so a stone's look never tells the answer), centred on the station, upright. Letters are drawn with the
  //     platform's school letterforms (data/tracing/letter-strokes.js: single-storey a / g; unknown glyph THROWS);
  //     numbers and sums as Baloo 2 700 text.
  const stoneStand = [];
  if (maze.labels && spec.labels) {
    const L = spec.labels; const LS = require('../data/tracing/letter-strokes.js');
    for (const [v, lab] of maze.labels) {
      const [cx, cy] = tr(maze.P[v]);
      // obstacles stand ON the road with no disc (a sleeping walrus; a thin-ice hole drawn as a dark oval)
      if (L.rule === 'avoid') {
        if (lab === 'hole') parts.push('<ellipse cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" rx="24" ry="14" fill="#5E9FC0" stroke="#3F7FA0" stroke-width="2.5" data-lcs-hm-stone="' + v + '"/><path d="M' + (cx - 12).toFixed(1) + ' ' + (cy - 2).toFixed(1) + ' q6 -5 12 0 q6 5 12 0" fill="none" stroke="#CFE3EF" stroke-width="2"/>');
        else parts.push(centred(lab, cx, cy, L.obstacleH || 40).svg);
        stoneStand.push([+cx.toFixed(1), +cy.toFixed(1), 30]);
        continue;
      }
      const shape = L.shape || 'circle'; const sw = L.size ? L.size[0] : (L.stoneR || 28) * 2, shh = L.size ? L.size[1] : (L.stoneR || 28) * 2;
      if (shape === 'circle') parts.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(sw / 2).toFixed(1)}" fill="${L.fill || '#FFFFFF'}" stroke="${L.edge || '#146B5E'}" stroke-width="2.5" data-lcs-hm-stone="${v}"/>`);
      else parts.push(`<rect x="${(cx - sw / 2).toFixed(1)}" y="${(cy - shh / 2).toFixed(1)}" width="${sw}" height="${shh}" rx="${(L.radius != null ? L.radius : shh / 2).toFixed(1)}" fill="${L.fill || '#FFFFFF'}" stroke="${L.edge || '#146B5E'}" stroke-width="2.5" data-lcs-hm-stone="${v}"/>`);
      if (L.glyph === 'picture') {
        // the picture's INK diagonal fits inside the disc (2026-10-11: a wrapped sweet and a kayak are twice as wide as
        // tall; sized by height alone they spilled over the card onto the road)
        const ib = ink(lab), fitH = 0.95 * Math.min(sw, shh) / Math.hypot(1, ib.w / ib.h);
        const a = centred(lab, cx, cy, Math.min(L.picH || 46, fitH)); parts.push(a.svg);
      } else if (L.glyph === 'letters') {
        const g = LS.glyphFor(lab); const capH = L.capH || 30; const k = capH / 68;   // the source box: caps 16 → 84
        const ix = (g.ink.x0 + g.ink.x1) / 2, iy = L.case === 'lower' ? 64 : 50;       // centre on the cap / x-height band
        parts.push(`<g transform="translate(${(cx - ix * k).toFixed(2)} ${(cy - iy * k).toFixed(2)}) scale(${k.toFixed(4)})" fill="none" stroke="#3A3530" stroke-width="${(4.5 / k).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round" data-lcs-hm-label="${lab}">${g.strokes.map((s) => `<path d="${s.d}"/>`).join('')}</g>`);
      } else {
        // F19: an INLINE WRITE BOX — the pill's right part is a dashed box where the child writes the running total (paper
        // only). It is part of the sign itself, so whose total it is can never be in doubt (2026-10-11: circles placed
        // beside the signs sat between two of them). Every sign has one, decoys too, or the box would mark the route.
        // stacked (a pill taller than wide): the operation on top, the box below; else side by side
        const inl = L.totals === 'inline'; const stack = inl && shh > sw * 0.9;
        const tx = inl && !stack ? cx - sw / 2 + (sw - 42) / 2 : cx, ty = stack ? cy - 15 : cy;
        const bx = stack ? cx - 24 : cx + sw / 2 - 46, by = stack ? cy + 1 : cy - 15, bw = stack ? 48 : 38, bh = stack ? 32 : 30;   // ~13 × 8.5 mm: room for two digits in a 7-year-old's hand
        if (inl && !opts.screen) {
          parts.push(`<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw}" height="${bh}" rx="7" fill="#FFFFFF" stroke="#8A7A62" stroke-width="2" stroke-dasharray="4 3" data-lcs-paper-only="1" data-lcs-hm-total="${v}"/>`);
          if (opts.key && maze.ruleStamp && maze.ruleStamp.kind === 'ops') {
            let t = maze.ruleStamp.start; const ri = maze.route.indexOf(v);
            if (ri > 0 && ri < maze.route.length - 1) { for (const u of maze.route.slice(1, ri + 1)) t += Number(String(maze.labels.get(u)).replace('−', '-'));
              parts.push(`<text x="${(bx + bw / 2).toFixed(1)}" y="${(by + bh / 2 + 7).toFixed(1)}" text-anchor="middle" font-family="'Baloo 2', Nunito, sans-serif" font-weight="700" font-size="19" fill="#F2784B">${t}</text>`); }
          }
        }
        parts.push(`<text x="${tx.toFixed(1)}" y="${(ty + (L.fontPx || 28) * 0.36).toFixed(1)}" text-anchor="middle" font-family="'Baloo 2', Nunito, sans-serif" font-weight="700" font-size="${L.fontPx || 28}" fill="#3A3530" data-lcs-hm-label="${lab}">${String(lab).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>`);
      }
      // the footprint is the shape's real reach: a pill / circle reaches max(w, h) / 2; a rounded rectangle reaches its half-diagonal less
      // what the corner rounding cuts off (2026-10-11: the square signs' corners covered road outside a max/2 disc)
      const reach = shape !== 'circle' && L.radius != null && L.radius < shh / 2 ? Math.hypot(sw, shh) / 2 - L.radius * (Math.SQRT2 - 1) : Math.max(sw, shh) / 2;
      stoneStand.push([+cx.toFixed(1), +cy.toFixed(1), +(reach + 3).toFixed(1)]);
    }
  }
  // 5. hero + goal standing at their mouths (spec gives the feet point + height, box coords)
  // a drawn dock under a goal that waits by the water (flat planks + posts, the library's idiom; inside the goal footprint)
  if (spec.goal.dock) {
    const fx = spec.goal.at[0], fy = spec.goal.at[1] + oy, dw = spec.goal.dock.w, dh = spec.goal.dock.h; const x0 = fx - dw / 2, y0 = fy - dh * 0.55;
    for (let k = 0; k < 3; k++) parts.push('<rect x="' + (x0 + k * dw / 3 + 1).toFixed(1) + '" y="' + y0.toFixed(1) + '" width="' + (dw / 3 - 2).toFixed(1) + '" height="' + dh.toFixed(1) + '" rx="3" fill="#D9A86A" stroke="#B5854A" stroke-width="2"/>');
    for (const px of [x0 + 8, x0 + dw - 14]) parts.push('<rect x="' + px.toFixed(1) + '" y="' + (y0 + dh - 2).toFixed(1) + '" width="6" height="12" fill="#B5854A"/>');
  }
  // a hero / goal drawing never covers a stone (2026-10-11: the moon hid the edge of a letter stone)
  const named = heroes.map((h) => ['hero', h.box]).concat(goals.map((g) => ['goal', g.box]));
  for (const [nm, bx] of named) for (const [sx, sy, sr] of stoneStand) {
    const qx = Math.max(bx[0], Math.min(sx, bx[2])), qy = Math.max(bx[1], Math.min(sy, bx[3]));
    if (Math.hypot(qx - sx, qy - sy) < sr - 4) missing.push(nm + ' drawing over a stone');
  }
  // a hero / goal drawing sits wholly inside the rounded frame (2026-10-11: the polar bear, the igloo and the rabbit were cut
  // off by the frame edge — a cropped goal reads as a mistake on the page)
  for (const [nm, bx] of named) {
    if (bx[0] < 3 || bx[1] < 3 || bx[2] > Wb - 3 || bx[3] > Hb - 3) missing.push(nm + ' drawing cut by the frame');
  }
  for (const x of goals.concat(heroes)) parts.push(x.svg);
  // 6. markers: start disc at the start mouth end, pointing along the mouth into the maze (a NOTCHED chevron: a near-
  //    equilateral triangle reads as pointing toward any of its corners once rotated, 2026-10-11); pennant at the goal mouth
  const markStand = [];
  RT.forEach((rt, i) => {
    if (!MULTI) return;
    const a = rt.mouthS.start.map(tr), b = rt.mouthS.goal.map(tr); const p0 = a[a.length - 1], q0 = b[b.length - 1];
    parts.push(`<g data-lcs-hm-start="${i + 1}" transform="translate(${p0[0].toFixed(1)} ${p0[1].toFixed(1)})"><circle r="${spec.disc || 22}" fill="#146B5E" stroke="#FFFFFF" stroke-width="3"/><text y="9" text-anchor="middle" font-family="'Baloo 2', Nunito, sans-serif" font-weight="700" font-size="26" fill="#FFFFFF">${i + 1}</text></g>`);
    // the mothers ARE the goals: only the dashed arrival ring marks where a road ends (a pennant stood on the horse)
    parts.push(`<g data-lcs-hm-goal="${i + 1}" transform="translate(${q0[0].toFixed(1)} ${q0[1].toFixed(1)})"><circle r="24" fill="none" stroke="#F2784B" stroke-width="3" stroke-dasharray="7 6"/></g>`);
    markStand.push([+p0[0].toFixed(1), +p0[1].toFixed(1), (spec.disc || 22) + 8], [+q0[0].toFixed(1), +q0[1].toFixed(1), 30]);
  });
  const sp = ms[ms.length - 1], sp2 = ms[ms.length - 3];
  const ang = Math.atan2(sp2[1] - sp[1], sp2[0] - sp[0]) * 180 / Math.PI;
  if (!MULTI) parts.push(`<g data-lcs-hm-start="1" transform="translate(${sp[0].toFixed(1)} ${sp[1].toFixed(1)})"><circle r="${spec.disc || 22}" fill="${LINE ? '#FFFFFF' : '#146B5E'}" stroke="${LINE ? INK : '#FFFFFF'}" stroke-width="${LINE ? 2.5 : 3}"/><path d="${(spec.disc || 22) > 24 ? 'M-10 -12 L13 0 L-10 12 L-4 0 Z' : 'M-8 -10 L11 0 L-8 10 L-3 0 Z'}" fill="${LINE ? 'none' : '#FFFFFF'}" stroke="${LINE ? INK : 'none'}" stroke-width="2.5" stroke-linejoin="round" transform="rotate(${ang.toFixed(1)})"/></g>`);
  const gp = mg[mg.length - 1];
  if (!MULTI) parts.push(`<g data-lcs-hm-goal="1" transform="translate(${gp[0].toFixed(1)} ${gp[1].toFixed(1)})"><circle r="26" fill="none" stroke="${LINE ? INK : '#F2784B'}" stroke-width="${LINE ? 2.2 : 3}" stroke-dasharray="7 6"/><rect x="-1.5" y="-46" width="3" height="46" fill="${LINE ? INK : '#8A8276'}"/><path d="M1.5 -46 L31.5 -38 L1.5 -27 Z" fill="${LINE ? '#FFFFFF' : '#F2784B'}" stroke="${LINE ? INK : 'none'}" stroke-width="2.2" stroke-linejoin="round"/></g>`);
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
    ...(MULTI ? { routes: RT.map((rt) => ({ route: rt.route, s: rt.s, g: rt.g, start: r1(rt.mouthS.start.map(tr)), goal: r1(rt.mouthS.goal.map(tr)) })) } : {}),
    stand: heroes.concat(goals).map((x) => fp(x.box)).concat(markStand, [[+sp[0].toFixed(1), +sp[1].toFixed(1), (spec.disc || 22) + 8], [+gp[0].toFixed(1), +(gp[1] - 14).toFixed(1), 48]].concat(stoneStand, chamberList.map((c) => [+c.x.toFixed(1), +c.y.toFixed(1), +(c.r + olw + 1).toFixed(1)]), streetStand)),
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Wb}" height="${Hb}" viewBox="0 0 ${Wb} ${Hb}" data-lcs-prim="hm-scene" data-lcs-hm-graph='${JSON.stringify(stamp)}'>`
    + `<defs><clipPath id="hmclip"><rect width="${Wb}" height="${Hb}" rx="18"/></clipPath></defs><g clip-path="url(#hmclip)">${parts.join('')}</g>`
    + `<rect x="1.5" y="1.5" width="${Wb - 3}" height="${Hb - 3}" rx="18" fill="none" stroke="#146B5E" stroke-width="3"/></svg>`;
  return { svg, stamp, placed, missing };
}

/**
 * composeStrands(spec, sx, opts) — the F8 page (tangled lines): no corridors. A sky, a hill band at the bottom, k
 * STRINGS in one ink from k numbered holders (bottom) to k goals (top), each string a sky-coloured halo under its ink
 * so that, redrawn over the other at a crossing, the upper string visibly passes OVER (the lower one shows a break).
 * Above each goal a dashed answer box (paper only; the key writes the holder's number in it).
 * sx = generateStrands() result, in BODY px. The stamp declares one edge per string (strand: true) and every crossing
 * as a footprint, so the oracle checks each string is drawn whole from its disc to its knot.
 */
function composeStrands(spec, sx, opts = {}) {
  const Wb = 675, Hb = spec.H; const S = spec.strings; const parts = []; const placed = [], missing = [];
  const k = sx.strands.length; const ink = S.ink, halo = S.halo || spec.sky, w = S.width || 10;
  parts.push(`<rect width="${Wb}" height="${Hb}" fill="${spec.sky}"/>`);
  // the hill band the holders stand on
  const hy = spec.hillY; parts.push(`<path d="M0 ${hy + 14} C${Wb * 0.28} ${hy - 12} ${Wb * 0.62} ${hy + 18} ${Wb} ${hy} V${Hb} H0 Z" fill="${spec.hill}"/>`);
  for (const c of spec.cast || []) { const a = c.centre ? centred(c.src, c.at[0], c.at[1], c.h) : standing(c.src, c.at[0], c.at[1], c.h); placed.push({ src: c.src, box: a.box }); parts.push(a.svg); }
  const d = (pts) => 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
  const full = sx.strands.map((st, s) => [[spec.discXY[s][0], spec.discXY[s][1]]].concat(st.pts, [[st.end[0], spec.knotY]]));
  // the strings: every halo, then every ink; then at each crossing the UPPER string's local piece again (halo + ink)
  for (const pts of full) parts.push(`<path d="${d(pts)}" fill="none" stroke="${halo}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round"/>`);
  for (const pts of full) parts.push(`<path d="${d(pts)}" fill="none" stroke="${ink}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" data-lcs-hm-string="1"/>`);
  for (const c of sx.crossings) {
    const pts = full[c.over].filter((p) => Math.hypot(p[0] - c.x, p[1] - c.y) < 26);
    if (pts.length < 2) continue;
    parts.push(`<path d="${d(pts)}" fill="none" stroke="${halo}" stroke-width="${w + 8}" stroke-linecap="butt" stroke-linejoin="round"/>`);
    parts.push(`<path d="${d(pts)}" fill="none" stroke="${ink}" stroke-width="${w}" stroke-linecap="butt" stroke-linejoin="round"/>`);
  }
  // the key: each string in its own colour over the ink
  const KEY_COL = ['#2F5BD3', '#7B3FB8', '#C98A12', '#8A5A2B', '#2E8B6A'];
  if (opts.key) full.forEach((pts, s) => parts.push(`<path d="${d(pts)}" fill="none" stroke="${KEY_COL[s % KEY_COL.length]}" stroke-width="${w * 0.7}" stroke-linecap="round" stroke-linejoin="round" opacity=".85" data-lcs-hm-key="${s + 1}"/>`));
  // the goals at the top, each standing on its string's knot; the knots; the answer boxes above them
  spec.goals.forEach((g, slot) => {
    const x = spec.slotX[slot]; const a = standing(g.src, x, spec.knotY + 2, g.h); placed.push({ src: g.src, box: a.box }); parts.push(a.svg);
    parts.push(`<circle cx="${x}" cy="${spec.knotY}" r="${(w * 0.75).toFixed(1)}" fill="${ink}"/>`);
    if (!opts.screen) {
      parts.push(`<rect x="${x - 24}" y="${spec.boxY}" width="48" height="48" rx="8" fill="#FFFFFF" stroke="#146B5E" stroke-width="2.5" stroke-dasharray="7 5" data-lcs-paper-only="1"/>`);
      const holder = sx.perm.indexOf(slot);
      if (opts.key) parts.push(`<text x="${x}" y="${spec.boxY + 35}" text-anchor="middle" font-family="'Baloo 2', Nunito, sans-serif" font-weight="700" font-size="30" fill="#F2784B" data-lcs-hm-key-n="${holder + 1}">${holder + 1}</text>`);
    }
  });
  // the holders and their numbered discs at the bottom
  spec.holders.forEach((h, s) => {
    const a = standing(h.src, spec.slotX[s], spec.holderFeetY, h.h); placed.push({ src: h.src, box: a.box }); parts.push(a.svg);
    const [cx, cy] = spec.discXY[s];
    parts.push(`<g data-lcs-hm-start="${s + 1}" transform="translate(${cx} ${cy})"><circle r="22" fill="#146B5E" stroke="#FFFFFF" stroke-width="3"/><text y="9" text-anchor="middle" font-family="'Baloo 2', Nunito, sans-serif" font-weight="700" font-size="26" fill="#FFFFFF">${s + 1}</text></g>`);
  });
  for (const [nm, b] of placed.map((p) => [p.src, p.box])) if (b[0] < 3 || b[1] < 3 || b[2] > Wb - 3 || b[3] > Hb - 3) missing.push(nm + ' cut by the frame');
  const r1 = (pts) => pts.map((p) => [+p[0].toFixed(1), +p[1].toFixed(1)]);
  // the string's end node is its own last point; a short real mouth runs on to the knot (a zero-length mouth edge
  // cannot be traced onto — 2026-10-12, the robot stopped one step short of every goal)
  const nodes = sx.strands.map((st) => st.start).concat(sx.strands.map((st) => st.end));
  const stamp = {
    strands: true, W: w, fill: ink, nodes: r1(nodes),
    edges: sx.strands.map((st, s) => ({ a: s, b: k + s, pts: r1(st.pts) })),
    mouths: { start: r1([spec.discXY[0], sx.strands[0].start]), goal: r1([sx.strands[0].end, [sx.strands[0].end[0], spec.knotY]]) },
    routes: sx.strands.map((st, s) => ({ route: [s, k + s], s, g: k + s, start: r1([spec.discXY[s], st.start]), goal: r1([st.end, [st.end[0], spec.knotY]]) })),
    route: [0, k], s: 0, g: k, tree: false, line: false,
    art: placed.map((p) => p.box.map((v) => +v.toFixed(1))),
    stand: sx.crossings.map((c) => [+c.x.toFixed(1), +c.y.toFixed(1), w + 8]).concat(spec.discXY.map((p) => [p[0], p[1], 30]), sx.strands.map((st) => [+st.end[0].toFixed(1), spec.knotY, w + 2])),
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Wb}" height="${Hb}" viewBox="0 0 ${Wb} ${Hb}" data-lcs-prim="hm-scene" data-lcs-hm-graph='${JSON.stringify(stamp)}'>`
    + `<defs><clipPath id="hmclip"><rect width="${Wb}" height="${Hb}" rx="18"/></clipPath></defs><g clip-path="url(#hmclip)">${parts.join('')}</g>`
    + `<rect x="1.5" y="1.5" width="${Wb - 3}" height="${Hb - 3}" rx="18" fill="none" stroke="#146B5E" stroke-width="3"/></svg>`;
  return { svg, stamp, placed, missing };
}

/**
 * composeHex(spec, hx, opts) — the F13 page (letter hop): no corridors. A meadow, a honeycomb silhouette, pointy-top
 * hexagon cells each holding one capital in the school letterforms; a start disc under the run's first cell pointing
 * into it, the bear beside the disc, the honey pot at the comb's top-right corner (decoration, never a marker — a flag
 * on the last cell would give the run's end away; the instruction names the last letter instead).
 * hx = generateHexHop() result, in BODY px. The stamp declares the cell centres as nodes, every touching pair as an
 * edge (the screen's ink hops centre to centre), the run as the one route (open-ended: it stops on its last cell).
 */
function composeHex(spec, hx, opts = {}) {
  const Wb = 675, Hb = spec.H; const X = spec.hex; const parts = []; const placed = [], missing = [];
  const LS = require('../data/tracing/letter-strokes.js'); const R0 = X.cellW / Math.sqrt(3);
  parts.push(`<rect width="${Wb}" height="${Hb}" fill="${spec.field}"/>`);
  parts.push(`<rect x="${X.comb[0]}" y="${X.comb[1]}" width="${X.comb[2]}" height="${X.comb[3]}" rx="44" fill="${X.combFill}"/>`);
  const hexPath = (cx, cy, r) => 'M' + [0, 1, 2, 3, 4, 5].map((i) => { const a = (-90 + 60 * i) * Math.PI / 180; return (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1); }).join(' L') + ' Z';
  const onRun = new Set(hx.route);
  hx.P.forEach(([cx, cy], v) => parts.push(`<path d="${hexPath(cx, cy, R0 - 1.5)}" fill="${opts.key && onRun.has(v) ? '#FBD3C2' : X.cellFill}" stroke="${X.cellEdge}" stroke-width="3" data-lcs-hm-cell="${v}"/>`));
  if (opts.key) parts.push(`<path d="M${hx.route.map((v) => hx.P[v][0].toFixed(1) + ' ' + hx.P[v][1].toFixed(1)).join(' L')}" fill="none" stroke="#F2784B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".7" data-lcs-hm-key="1"/>`);
  // the letters: the platform's school letterforms (an unknown glyph throws), centred on the cap band
  hx.P.forEach(([cx, cy], v) => {
    const lab = hx.labels.get(v); const g = LS.glyphFor(lab); const k = (X.capH || 34) / 68; const ix = (g.ink.x0 + g.ink.x1) / 2;
    parts.push(`<g transform="translate(${(cx - ix * k).toFixed(2)} ${(cy - 50 * k).toFixed(2)}) scale(${k.toFixed(4)})" fill="none" stroke="#3A3530" stroke-width="${(4.5 / k).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round" data-lcs-hm-label="${lab}">${g.strokes.map((s) => `<path d="${s.d}"/>`).join('')}</g>`);
  });
  // the start disc under the first cell, pointing up into it; the bear beside it on the side with room
  const f = hx.P[hx.s]; const disc = [f[0], f[1] + R0 + 26];
  const bearX = disc[0] > Wb / 2 ? disc[0] - 82 : disc[0] + 82;
  const bear = standing(spec.hero.src, bearX, Hb - 6, spec.hero.h); placed.push({ src: spec.hero.src, box: bear.box }); parts.push(bear.svg);
  const pot = standing(spec.goal.src, spec.goal.at[0], spec.goal.at[1], spec.goal.h); placed.push({ src: spec.goal.src, box: pot.box }); parts.push(pot.svg);
  for (const c of spec.cast || []) {
    const a = centred(c.src, c.at[0], c.at[1], c.h);
    if (a.box[2] > bear.box[0] - 6 && a.box[0] < bear.box[2] + 6 && a.box[3] > bear.box[1] - 6) continue;   // never on the bear
    placed.push({ src: c.src, box: a.box }); parts.push(a.svg);
  }
  parts.push(`<g data-lcs-hm-start="1" transform="translate(${disc[0].toFixed(1)} ${disc[1].toFixed(1)})"><circle r="22" fill="#146B5E" stroke="#FFFFFF" stroke-width="3"/><path d="M-8 -10 L11 0 L-8 10 L-3 0 Z" fill="#FFFFFF" transform="rotate(-90)"/></g>`);
  for (const [nm, b] of placed.map((p) => [p.src, p.box])) if (b[0] < 3 || b[1] < 3 || b[2] > Wb - 3 || b[3] > Hb - 3) missing.push(nm + ' cut by the frame');
  // no drawing over a cell
  for (const p of placed) for (const [cx, cy] of hx.P) if (cx > p.box[0] - R0 * 0.7 && cx < p.box[2] + R0 * 0.7 && cy > p.box[1] - R0 * 0.7 && cy < p.box[3] + R0 * 0.7) { missing.push(p.src + ' over a cell'); break; }
  const r1 = (pts) => pts.map((p) => [+p[0].toFixed(1), +p[1].toFixed(1)]);
  const edges = []; hx.adj.forEach((nb, a) => nb.forEach((b) => { if (a < b) edges.push({ a, b, pts: r1([0, 0.25, 0.5, 0.75, 1].map((t) => [hx.P[a][0] + (hx.P[b][0] - hx.P[a][0]) * t, hx.P[a][1] + (hx.P[b][1] - hx.P[a][1]) * t])) }); }));
  const stamp = {
    hex: true, W: 30, fill: X.cellFill, cellR: +R0.toFixed(1), nodes: r1(hx.P), edges,
    routes: [{ route: hx.route, s: hx.s, g: hx.g, start: r1([disc, f]), goal: null }],
    route: hx.route, s: hx.s, g: hx.g, tree: false, line: false,
    labels: hx.P.map((_, v) => hx.labels.get(v)), rule: { kind: 'seq', seq: hx.run, openEnd: true },
    art: placed.map((p) => p.box.map((v) => +v.toFixed(1))), stand: [[+disc[0].toFixed(1), +disc[1].toFixed(1), 30]],
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${Wb}" height="${Hb}" viewBox="0 0 ${Wb} ${Hb}" data-lcs-prim="hm-scene" data-lcs-hm-graph='${JSON.stringify(stamp)}'>`
    + `<defs><clipPath id="hmclip"><rect width="${Wb}" height="${Hb}" rx="18"/></clipPath></defs><g clip-path="url(#hmclip)">${parts.join('')}</g>`
    + `<rect x="1.5" y="1.5" width="${Wb - 3}" height="${Hb - 3}" rx="18" fill="none" stroke="#146B5E" stroke-width="3"/></svg>`;
  return { svg, stamp, placed, missing };
}

module.exports = { composeScene, composeStrands, composeHex, ink, standing, centred };
