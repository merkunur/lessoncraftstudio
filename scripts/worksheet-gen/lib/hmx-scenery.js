/**
 * hmx-scenery.js — the DRAWN scenery of the Maze Puzzles Level Set scenes (data/hmx, 2026-10-12).
 *
 * Operator rule (2026-10-12): pictures come from the image library wherever one exists; what a scene still needs is
 * drawn here in the library's own idiom — flat fills, no black outline, one darker tone for volume, rounded shapes.
 * Everything here is BACKGROUND: it never stands on a road (band motifs live above the maze box; patches lie under the
 * corridors and are covered by them; decor stands only on island discs), and every colour it uses is reported so the
 * composer can refuse a colour too close to the corridor (the raster oracle reads the corridor colour as road).
 *
 *   bandSvg(motifs, ctx)        → { far, near, colours }   motifs above the maze box (sun, clouds, mountains, …)
 *   patchSvg(patches, ctx)      → { svg, colours }         soft blobs of a second ground tone under the maze
 *   decorSvg(kind, x, y, r, o)  → { svg, colours }         one drawn object on an island disc (rock, pond, bush, …)
 *   DECOR_R                     the footprint radius each decor kind needs (before scaling)
 * ctx = { W: 675, oy: band height, H: body height, sky, hill }
 */
'use strict';

const f1 = (v) => (+v).toFixed(1);
/** a deterministic 0..1 sequence from a string key (no rng: the maze's rng sequence must not move) */
function hashSeq(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; };
}
/** a darker / lighter tone of a #RRGGBB colour (k < 1 darker, k > 1 toward white) */
function tone(hex, k) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const o = c.map((v) => (k <= 1 ? Math.round(v * k) : Math.round(v + (255 - v) * (k - 1))));
  return '#' + o.map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('').toUpperCase();
}

// ------------------------------------------------------------------------------------------------ band motifs
const BAND = {
  sun({ x, y, r = 18, col = '#FFD55A', rays = true }) {
    const out = [];
    if (rays) for (let i = 0; i < 10; i++) {
      const a = (i * 36) * Math.PI / 180, a1 = a - 0.13, a2 = a + 0.13, r1 = r + 4, r2 = r + 11;
      out.push(`<path d="M${f1(x + r1 * Math.cos(a1))} ${f1(y + r1 * Math.sin(a1))} L${f1(x + r2 * Math.cos(a))} ${f1(y + r2 * Math.sin(a))} L${f1(x + r1 * Math.cos(a2))} ${f1(y + r1 * Math.sin(a2))} Z" fill="${col}" stroke="${col}" stroke-width="2" stroke-linejoin="round"/>`);
    }
    out.push(`<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col}"/><circle cx="${f1(x - r * 0.3)}" cy="${f1(y - r * 0.3)}" r="${f1(r * 0.45)}" fill="${tone(col, 1.35)}"/>`);
    return { svg: out.join(''), colours: [col, tone(col, 1.35)] };
  },
  moon({ x, y, r = 16, col = '#FFE38A' }, ctx) {
    return { svg: `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col}"/><circle cx="${f1(x + r * 0.45)}" cy="${f1(y - r * 0.25)}" r="${f1(r * 0.9)}" fill="${ctx.sky}"/>`, colours: [col] };
  },
  stars({ n = 14, col = '#FFE59A', y0 = 6, y1 = 50, key = 's' }, ctx) {
    const rnd = hashSeq(key + n); const out = [];
    for (let i = 0; i < n; i++) {
      const x = 12 + rnd() * (ctx.W - 24), y = y0 + rnd() * (y1 - y0), k = 2.5 + rnd() * 3.5;
      out.push(`<path d="M${f1(x)} ${f1(y - k)} Q${f1(x + 0.8)} ${f1(y - 0.8)} ${f1(x + k)} ${f1(y)} Q${f1(x + 0.8)} ${f1(y + 0.8)} ${f1(x)} ${f1(y + k)} Q${f1(x - 0.8)} ${f1(y + 0.8)} ${f1(x - k)} ${f1(y)} Q${f1(x - 0.8)} ${f1(y - 0.8)} ${f1(x)} ${f1(y - k)} Z" fill="${col}"/>`);
    }
    return { svg: out.join(''), colours: [col] };
  },
  cloud({ x, y, s = 1, col = '#FFFFFF' }) {
    const c = (dx, dy, r) => `<circle cx="${f1(x + dx * s)}" cy="${f1(y + dy * s)}" r="${f1(r * s)}" fill="${col}"/>`;
    return { svg: `<g>${c(-18, 2, 10)}${c(-4, -4, 14)}${c(13, 0, 11)}<rect x="${f1(x - 26 * s)}" y="${f1(y + 1 * s)}" width="${f1(48 * s)}" height="${f1(11 * s)}" rx="${f1(5.5 * s)}" fill="${col}"/></g>`, colours: [col] };
  },
  mountains({ peaks, col = '#8FA8C8', snow = '#F4F8FB', base }, ctx) {
    const by = base != null ? base : ctx.oy + 16; const out = [];
    for (const [x, w, h] of peaks) {
      const top = by - h;
      out.push(`<path d="M${f1(x - w / 2)} ${f1(by)} L${f1(x - 5)} ${f1(top + 4)} Q${f1(x)} ${f1(top - 2)} ${f1(x + 5)} ${f1(top + 4)} L${f1(x + w / 2)} ${f1(by)} Z" fill="${col}"/>`);
      out.push(`<path d="M${f1(x + 2)} ${f1(top + 2)} L${f1(x + w / 2)} ${f1(by)} L${f1(x + w * 0.12)} ${f1(by)} Z" fill="${tone(col, 0.86)}"/>`);
      if (snow) {
        const sh = h * 0.3, sx = (w / 2) * (sh / h);
        out.push(`<path d="M${f1(x - sx)} ${f1(top + sh)} L${f1(x - 5)} ${f1(top + 4)} Q${f1(x)} ${f1(top - 2)} ${f1(x + 5)} ${f1(top + 4)} L${f1(x + sx)} ${f1(top + sh)} L${f1(x + sx * 0.4)} ${f1(top + sh - 5)} L${f1(x)} ${f1(top + sh + 2)} L${f1(x - sx * 0.45)} ${f1(top + sh - 5)} Z" fill="${snow}"/>`);
      }
    }
    return { svg: out.join(''), colours: [col, tone(col, 0.86)].concat(snow ? [snow] : []) };
  },
  /** a row of rounded tree crowns (kind 'round') or pine cones (kind 'pine') along the band floor */
  treeline({ x0 = -10, x1, col = '#6FA35C', trunk = '#8A5A3B', kind = 'round', h = 34, step = 30, key = 't', base }, ctx) {
    const by = base != null ? base : ctx.oy + 14; const rnd = hashSeq(key + kind); const out = [];
    const X1 = x1 == null ? ctx.W + 10 : x1;
    for (let x = x0; x <= X1; x += step * (0.8 + rnd() * 0.4)) {
      const hh = h * (0.8 + rnd() * 0.35); const dark = rnd() < 0.5;
      const c = dark ? tone(col, 0.88) : col;
      if (kind === 'pine') {
        out.push(`<rect x="${f1(x - 2.5)}" y="${f1(by - 8)}" width="5" height="9" fill="${trunk}"/>`);
        out.push(`<path d="M${f1(x)} ${f1(by - hh)} L${f1(x + hh * 0.32)} ${f1(by - 6)} Q${f1(x)} ${f1(by - 3)} ${f1(x - hh * 0.32)} ${f1(by - 6)} Z" fill="${c}"/>`);
      } else {
        out.push(`<rect x="${f1(x - 2.5)}" y="${f1(by - hh * 0.4)}" width="5" height="${f1(hh * 0.4 + 1)}" fill="${trunk}"/>`);
        out.push(`<ellipse cx="${f1(x)}" cy="${f1(by - hh * 0.62)}" rx="${f1(hh * 0.42)}" ry="${f1(hh * 0.42)}" fill="${c}"/>`);
      }
    }
    return { svg: out.join(''), colours: [col, tone(col, 0.88), trunk] };
  },
  /** a town skyline: blocks of varied height with lit windows */
  skyline({ x0 = 0, x1, cols = ['#C9B8A6', '#B4A595', '#D8C7B2'], win = '#FFE08A', key = 'k', base }, ctx) {
    const by = base != null ? base : ctx.oy + 14; const rnd = hashSeq(key); const out = []; const X1 = x1 == null ? ctx.W : x1;
    for (let x = x0; x < X1;) {
      const w = 26 + rnd() * 30, h = 26 + rnd() * 34, c = cols[Math.floor(rnd() * cols.length)];
      out.push(`<rect x="${f1(x)}" y="${f1(by - h)}" width="${f1(w)}" height="${f1(h + 2)}" fill="${c}"/>`);
      if (rnd() < 0.4) out.push(`<path d="M${f1(x - 2)} ${f1(by - h)} L${f1(x + w / 2)} ${f1(by - h - 12)} L${f1(x + w + 2)} ${f1(by - h)} Z" fill="${tone(c, 0.82)}"/>`);
      for (let wy = by - h + 6; wy < by - 8; wy += 11) for (let wx = x + 5; wx < x + w - 7; wx += 9) if (rnd() < 0.6) out.push(`<rect x="${f1(wx)}" y="${f1(wy)}" width="4.5" height="5.5" rx="1" fill="${win}"/>`);
      x += w + 2 + rnd() * 6;
    }
    return { svg: out.join(''), colours: cols.concat([win]) };
  },
  /** the sea along the band floor, with scalloped wave crests */
  sea({ y, col = '#6FB7D6', crest = '#E6F5FA' }, ctx) {
    const by = ctx.oy + 14; let d = `M0 ${f1(y)}`;
    for (let x = 0; x < ctx.W; x += 30) d += ` Q${f1(x + 15)} ${f1(y - 5)} ${f1(x + 30)} ${f1(y)}`;
    const crests = []; for (let x = 20; x < ctx.W; x += 60) crests.push(`<path d="M${f1(x)} ${f1(y + 8)} q8 -5 16 0" fill="none" stroke="${crest}" stroke-width="2.5" stroke-linecap="round"/>`);
    return { svg: `<path d="${d} V${by} H0 Z" fill="${col}"/>${crests.join('')}`, colours: [col, crest] };
  },
  rainbow({ x, y, r = 46, cols = ['#E8655A', '#F2A65A', '#F5D65E', '#7FC36A', '#6FA8DC', '#9C7FD0'] }) {
    const out = []; const bw = 5;
    cols.forEach((c, i) => { const rr = r - i * bw; out.push(`<path d="M${f1(x - rr)} ${f1(y)} A${f1(rr)} ${f1(rr)} 0 0 1 ${f1(x + rr)} ${f1(y)}" fill="none" stroke="${c}" stroke-width="${bw + 0.6}"/>`); });
    return { svg: out.join(''), colours: cols };
  },
  aurora({ cols = ['#7FE0B5', '#9C8BE0'], y = 18 }, ctx) {
    const out = [];
    cols.forEach((c, i) => {
      let d = `M-10 ${f1(y + i * 12)}`; for (let x = -10; x < ctx.W + 20; x += 90) d += ` Q${f1(x + 45)} ${f1(y + i * 12 + (i % 2 ? 14 : -10))} ${f1(x + 90)} ${f1(y + i * 12)}`;
      out.push(`<path d="${d}" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" opacity="0.75"/>`);
    });
    return { svg: out.join(''), colours: cols };
  },
  volcano({ x, w = 120, h = 52, col = '#9A7A66', lava = '#F06A3C', smoke = '#C9C0BA' }, ctx) {
    const by = ctx.oy + 16, top = by - h;
    return {
      svg: `<path d="M${f1(x - w / 2)} ${f1(by)} L${f1(x - 14)} ${f1(top)} L${f1(x + 14)} ${f1(top)} L${f1(x + w / 2)} ${f1(by)} Z" fill="${col}"/>`
        + `<path d="M${f1(x - 14)} ${f1(top)} L${f1(x + 14)} ${f1(top)} L${f1(x + 9)} ${f1(top + 9)} L${f1(x + 2)} ${f1(top + 4)} L${f1(x - 6)} ${f1(top + 12)} L${f1(x - 10)} ${f1(top + 5)} Z" fill="${lava}"/>`
        + [[0, -12, 8], [9, -22, 10], [-4, -32, 9]].map(([dx, dy, r]) => `<circle cx="${f1(x + dx)}" cy="${f1(top + dy)}" r="${r}" fill="${smoke}"/>`).join(''),
      colours: [col, lava, smoke],
    };
  },
  /** a wooden fence along the band floor (posts + two rails) */
  fence({ col = '#D9B07C', post = '#C29A66', base }, ctx) {
    const by = base != null ? base : ctx.oy + 12; const out = [];
    for (let x = 18; x < ctx.W; x += 58) out.push(`<rect x="${x - 4}" y="${f1(by - 30)}" width="8" height="30" rx="2" fill="${post}"/>`);
    for (const y of [by - 25, by - 13]) out.push(`<rect x="0" y="${f1(y)}" width="${ctx.W}" height="6" rx="3" fill="${col}"/>`);
    return { svg: out.join(''), colours: [col, post] };
  },
  /** small birds in flight: two-arc V strokes */
  birds({ pts, col = '#5B5550' }) {
    return { svg: pts.map(([x, y, s = 1]) => `<path d="M${f1(x - 7 * s)} ${f1(y)} Q${f1(x - 3.5 * s)} ${f1(y - 5 * s)} ${f1(x)} ${f1(y)} Q${f1(x + 3.5 * s)} ${f1(y - 5 * s)} ${f1(x + 7 * s)} ${f1(y)}" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round"/>`).join(''), colours: [col] };
  },
  /** sand dunes (soft long humps), like hills but sharper on one side */
  dunes({ col = '#E9C27E', list }, ctx) {
    const by = ctx.oy + 14;
    return { svg: list.map(([x0, x1, h]) => `<path d="M${f1(x0)} ${f1(by)} Q${f1(x0 + (x1 - x0) * 0.65)} ${f1(by - h * 1.8)} ${f1(x1)} ${f1(by)} Z" fill="${col}"/>`).join(''), colours: [col] };
  },
  /** a wavy water surface seen from below (an underwater scene's top band) with light rays */
  surface({ col = '#BFE6F0', ray = '#A9DDEB' }, ctx) {
    let d = 'M0 0 H' + ctx.W + ' V18'; for (let x = ctx.W; x > 0; x -= 40) d += ` Q${f1(x - 20)} 28 ${f1(x - 40)} 18`;
    const rays = [80, 250, 430, 590].map((x) => `<path d="M${x} 20 L${x + 22} 20 L${x + 60} ${ctx.oy + 10} L${x + 30} ${ctx.oy + 10} Z" fill="${ray}" opacity="0.6"/>`);
    return { svg: `<path d="${d} Z" fill="${col}"/>${rays.join('')}`, colours: [col, ray] };
  },
};

/**
 * LINE ART (the colouring face, 2026-10-12): the same shapes as ink outlines on white paper, nothing filled — the child
 * colours them. Every fill becomes paper with a 2.2 ink outline; every stroke becomes a thin ink line. Shapes drawn as
 * several overlapping blobs in colour (a cloud, a bush) have their own single-outline line version (LINE_SHAPES), so no
 * stray inner arcs reach the page.
 */
const LINE_INK = '#3A3530';
function toLine(svg) {
  return svg
    .replace(/ opacity="[^"]*"/g, '')
    .replace(/fill="none" stroke="#[0-9A-Fa-f]{6}" stroke-width="[^"]*"/g, 'fill="none" stroke="' + LINE_INK + '" stroke-width="2.2"')
    .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="#FFFFFF" stroke="' + LINE_INK + '" stroke-width="2.2" stroke-linejoin="round"');
}
/** a single scalloped outline (a cloud / a bush) centred on (x, y): n bumps on an ellipse rx × ry */
function blob(x, y, rx, ry, n, fill, stroke) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const a = Math.PI + (i / n) * Math.PI * 2; const px = x + rx * Math.cos(a), py = y + ry * Math.sin(a) * (Math.sin(a) > 0 ? 0.55 : 1);
    if (i === 0) d = 'M' + f1(px) + ' ' + f1(py); else { const am = Math.PI + ((i - 0.5) / n) * Math.PI * 2; const k = 1.32; d += ' Q' + f1(x + rx * k * Math.cos(am)) + ' ' + f1(y + ry * k * Math.sin(am) * (Math.sin(am) > 0 ? 0.55 : 1)) + ' ' + f1(px) + ' ' + f1(py); }
  }
  return '<path d="' + d + ' Z" fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="2.2" stroke-linejoin="round"' : '') + '/>';
}
const LINE_SHAPES = {
  cloud: (m) => blob(m.x, m.y + 1, 26 * (m.s || 1), 13 * (m.s || 1), 7, '#FFFFFF', LINE_INK),
  sun: (m) => { const r = m.r || 18; const rays = []; for (let i = 0; i < 10; i++) { const a = i * 36 * Math.PI / 180; rays.push('<path d="M' + f1(m.x + (r + 4) * Math.cos(a)) + ' ' + f1(m.y + (r + 4) * Math.sin(a)) + ' L' + f1(m.x + (r + 11) * Math.cos(a)) + ' ' + f1(m.y + (r + 11) * Math.sin(a)) + '" stroke="' + LINE_INK + '" stroke-width="2.2" stroke-linecap="round"/>'); } return rays.join('') + '<circle cx="' + f1(m.x) + '" cy="' + f1(m.y) + '" r="' + r + '" fill="#FFFFFF" stroke="' + LINE_INK + '" stroke-width="2.2"/>'; },
};

function bandSvg(motifs, ctx) {
  const far = [], near = [], colours = [];
  for (const m of motifs || []) {
    const fn = BAND[m.k]; if (!fn) throw new Error('hmx-scenery: unknown band motif ' + m.k);
    const r = ctx.line ? { svg: LINE_SHAPES[m.k] ? LINE_SHAPES[m.k](m, ctx) : toLine(fn(m, ctx).svg), colours: [] } : fn(m, ctx); (m.near ? near : far).push(r.svg); colours.push(...r.colours.filter((c) => !(m.k === 'surface' && c === m.ray)));
  }
  return { far: far.join(''), near: near.join(''), colours };
}

// ------------------------------------------------------------------------------------------------ ground patches
/** soft blobs of a second ground tone spread over the maze box (under the corridors; a road paints over them) */
function patchSvg(p, ctx) {
  if (!p) return { svg: '', colours: [] };
  const rnd = hashSeq(p.key || 'patch'); const out = [];
  for (let i = 0; i < (p.n || 7); i++) {
    const x = 30 + rnd() * (ctx.W - 60), y = ctx.oy + 30 + rnd() * (ctx.H - ctx.oy - 60);
    const rx = p.r[0] + rnd() * (p.r[1] - p.r[0]), ry = rx * (0.45 + rnd() * 0.25), a = Math.round(rnd() * 40 - 20);
    out.push(`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${p.col}" transform="rotate(${a} ${f1(x)} ${f1(y)})"/>`);
  }
  return { svg: out.join(''), colours: [p.col] };
}

// ------------------------------------------------------------------------------------------------ island decor
/** the island disc radius a decor kind needs at scale 1 */
const DECOR_R = { rock: 20, rocks: 26, pond: 34, puddle: 20, bush: 24, flowerbed: 26, drift: 26, crater: 24, cactus: 26, stump: 18, log: 24, reeds: 20, leafpile: 22, tuftbig: 18, shells: 18, seaweed: 22, iceblock: 22, hay: 24, fern: 22, crystal: 22, cloudpuff: 28, pebblepath: 22 };

function decorSvg(kind, x, y, s, o = {}) {
  if (o.line) {
    if (kind === 'bush') return { svg: blob(x, y, 22 * s, 16 * s, 6, '#FFFFFF', LINE_INK), colours: [] };
    if (kind === 'cloudpuff') return { svg: blob(x, y, 24 * s, 12 * s, 7, '#FFFFFF', LINE_INK), colours: [] };
    // a flowerbed's tiny ringed flowers closed up into ink spots on a colouring page: three OPEN daisies instead
    if (kind === 'flowerbed') {
      const out = [];
      for (const [dx, dy, k] of [[-14, 3, 1], [3, -5, 1.15], [17, 4, 0.95]]) {
        const cx = x + dx * s, cy = y + dy * s, pr = 4.2 * s * k, d = 5.6 * s * k;
        for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; out.push(`<circle cx="${f1(cx + d * Math.cos(a))}" cy="${f1(cy + d * Math.sin(a))}" r="${f1(pr)}" fill="#FFFFFF" stroke="${LINE_INK}" stroke-width="1.6"/>`); }
        out.push(`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(2.8 * s * k)}" fill="#FFFFFF" stroke="${LINE_INK}" stroke-width="1.6"/>`);
      }
      return { svg: out.join(''), colours: [] };
    }
    return { svg: toLine(decorSvg(kind, x, y, s, { ...o, line: false }).svg), colours: [] };
  }
  const P = o.pal || {}; const r = (v) => f1(v);
  const pick = (k, d) => P[k] || d;
  switch (kind) {
    case 'rock': {
      const c = pick('rock', '#A9A49C');
      return { svg: `<path d="M${r(x - 18 * s)} ${r(y + 9 * s)} Q${r(x - 20 * s)} ${r(y - 6 * s)} ${r(x - 6 * s)} ${r(y - 12 * s)} Q${r(x + 10 * s)} ${r(y - 16 * s)} ${r(x + 18 * s)} ${r(y - 2 * s)} Q${r(x + 22 * s)} ${r(y + 9 * s)} ${r(x + 10 * s)} ${r(y + 11 * s)} Z" fill="${c}"/><path d="M${r(x + 2 * s)} ${r(y - 12 * s)} Q${r(x + 14 * s)} ${r(y - 10 * s)} ${r(x + 18 * s)} ${r(y - 2 * s)} Q${r(x + 21 * s)} ${r(y + 9 * s)} ${r(x + 10 * s)} ${r(y + 11 * s)} L${r(x + 4 * s)} ${r(y + 11 * s)} Q${r(x + 10 * s)} ${r(y)} ${r(x + 2 * s)} ${r(y - 12 * s)} Z" fill="${tone(c, 0.84)}"/><ellipse cx="${r(x - 7 * s)}" cy="${r(y - 5 * s)}" rx="${r(5 * s)}" ry="${r(2.5 * s)}" fill="${tone(c, 1.25)}"/>`, colours: [c, tone(c, 0.84), tone(c, 1.25)] };
    }
    case 'rocks': {
      const a = decorSvg('rock', x - 8 * s, y + 4 * s, s * 0.85, o), b = decorSvg('rock', x + 12 * s, y - 6 * s, s * 0.6, o);
      return { svg: b.svg + a.svg, colours: a.colours };
    }
    case 'pond': case 'puddle': {
      const k = kind === 'pond' ? 1 : 0.6; const c = pick('water', '#7CC0DD'), rim = pick('rim', tone(c, 0.82));
      const out = [`<ellipse cx="${r(x)}" cy="${r(y + 2 * s)}" rx="${r(32 * s * k)}" ry="${r(18 * s * k)}" fill="${rim}"/>`,
        `<ellipse cx="${r(x)}" cy="${r(y)}" rx="${r(30 * s * k)}" ry="${r(16 * s * k)}" fill="${c}"/>`,
        `<path d="M${r(x - 16 * s * k)} ${r(y - 4 * s * k)} q${r(8 * s * k)} ${r(-5 * s * k)} ${r(16 * s * k)} 0" fill="none" stroke="${tone(c, 1.45)}" stroke-width="${r(2.5 * s)}" stroke-linecap="round"/>`];
      if (kind === 'pond' && o.reeds !== false) for (const dx of [-26, -21, 24]) out.push(`<path d="M${r(x + dx * s)} ${r(y + 6 * s)} Q${r(x + (dx - 2) * s)} ${r(y - 8 * s)} ${r(x + (dx + 1) * s)} ${r(y - 16 * s)}" fill="none" stroke="${pick('reed', '#5E9150')}" stroke-width="${r(3 * s)}" stroke-linecap="round"/>`);
      return { svg: out.join(''), colours: [c, rim, tone(c, 1.45), pick('reed', '#5E9150')] };
    }
    case 'bush': {
      const c = pick('bush', '#78B060'), d = tone(c, 0.82);
      return { svg: [[-11, 4, 11, d], [11, 4, 11, d], [0, -3, 14, c], [-12, 2, 9, c], [12, 2, 9, c]].map(([dx, dy, rr, cc]) => `<circle cx="${r(x + dx * s)}" cy="${r(y + dy * s)}" r="${r(rr * s)}" fill="${cc}"/>`).join('') + `<circle cx="${r(x - 4 * s)}" cy="${r(y - 7 * s)}" r="${r(4 * s)}" fill="${tone(c, 1.2)}"/>`, colours: [c, d, tone(c, 1.2)] };
    }
    case 'flowerbed': {
      const g = pick('bed', '#86BF6A'); const fl = P.flowers || ['#F28CA8', '#FFD45E', '#F7A35C', '#B79AE6']; const rnd = hashSeq('fb' + x + y);
      const out = [`<ellipse cx="${r(x)}" cy="${r(y)}" rx="${r(24 * s)}" ry="${r(13 * s)}" fill="${g}"/>`];
      for (let i = 0; i < 7; i++) { const fx = x + (rnd() - 0.5) * 36 * s, fy = y + (rnd() - 0.5) * 16 * s, c = fl[i % fl.length]; out.push(`<circle cx="${r(fx)}" cy="${r(fy)}" r="${r(3.6 * s)}" fill="${c}"/><circle cx="${r(fx)}" cy="${r(fy)}" r="${r(1.3 * s)}" fill="${tone(c, 0.7)}"/>`); }
      return { svg: out.join(''), colours: [g].concat(fl) };
    }
    case 'drift': {
      const c = pick('snow', '#FFFFFF'), sh = pick('shade', '#D6E6F2');
      return { svg: `<path d="M${r(x - 26 * s)} ${r(y + 8 * s)} Q${r(x - 14 * s)} ${r(y - 14 * s)} ${r(x + 2 * s)} ${r(y - 4 * s)} Q${r(x + 16 * s)} ${r(y - 16 * s)} ${r(x + 26 * s)} ${r(y + 8 * s)} Z" fill="${sh}"/><path d="M${r(x - 22 * s)} ${r(y + 6 * s)} Q${r(x - 13 * s)} ${r(y - 11 * s)} ${r(x + 1 * s)} ${r(y - 2 * s)} Q${r(x + 14 * s)} ${r(y - 12 * s)} ${r(x + 21 * s)} ${r(y + 6 * s)} Z" fill="${c}"/>`, colours: [c, sh] };
    }
    case 'crater': {
      const c = pick('crater', '#8D8FB8');
      return { svg: `<ellipse cx="${r(x)}" cy="${r(y)}" rx="${r(22 * s)}" ry="${r(12 * s)}" fill="${tone(c, 1.18)}"/><ellipse cx="${r(x + 1 * s)}" cy="${r(y + 1.5 * s)}" rx="${r(17 * s)}" ry="${r(8 * s)}" fill="${tone(c, 0.82)}"/>`, colours: [tone(c, 1.18), tone(c, 0.82)] };
    }
    case 'cactus': {
      const c = pick('cactus', '#5FA36A'), d = tone(c, 0.82);
      const arm = (dx, up) => `<path d="M${r(x + dx * s)} ${r(y - 6 * s)} Q${r(x + dx * 1.9 * s)} ${r(y - 6 * s)} ${r(x + dx * 1.9 * s)} ${r(y - up * s)}" fill="none" stroke="${c}" stroke-width="${r(8 * s)}" stroke-linecap="round"/>`;
      return { svg: `${arm(-7, 20)}${arm(7, 26)}<rect x="${r(x - 6 * s)}" y="${r(y - 30 * s)}" width="${r(12 * s)}" height="${r(38 * s)}" rx="${r(6 * s)}" fill="${c}"/><rect x="${r(x + 1 * s)}" y="${r(y - 28 * s)}" width="${r(4 * s)}" height="${r(34 * s)}" rx="${r(2 * s)}" fill="${d}"/><ellipse cx="${r(x)}" cy="${r(y + 9 * s)}" rx="${r(13 * s)}" ry="${r(3 * s)}" fill="${pick('ground', '#D9B47A')}"/>`, colours: [c, d, pick('ground', '#D9B47A')] };
    }
    case 'stump': {
      const c = pick('wood', '#A8754A');
      return { svg: `<path d="M${r(x - 13 * s)} ${r(y + 8 * s)} L${r(x - 10 * s)} ${r(y - 6 * s)} L${r(x + 10 * s)} ${r(y - 6 * s)} L${r(x + 13 * s)} ${r(y + 8 * s)} Z" fill="${c}"/><ellipse cx="${r(x)}" cy="${r(y - 6 * s)}" rx="${r(10 * s)}" ry="${r(4 * s)}" fill="${tone(c, 1.45)}"/><ellipse cx="${r(x)}" cy="${r(y - 6 * s)}" rx="${r(5 * s)}" ry="${r(2 * s)}" fill="none" stroke="${tone(c, 0.85)}" stroke-width="1.4"/>`, colours: [c, tone(c, 1.45), tone(c, 0.85)] };
    }
    case 'log': {
      const c = pick('wood', '#A8754A');
      return { svg: `<rect x="${r(x - 22 * s)}" y="${r(y - 7 * s)}" width="${r(40 * s)}" height="${r(14 * s)}" rx="${r(7 * s)}" fill="${c}"/><ellipse cx="${r(x + 18 * s)}" cy="${r(y)}" rx="${r(5 * s)}" ry="${r(7 * s)}" fill="${tone(c, 1.45)}"/><path d="M${r(x - 14 * s)} ${r(y - 2 * s)} h${r(16 * s)}" stroke="${tone(c, 0.82)}" stroke-width="1.6" stroke-linecap="round"/>`, colours: [c, tone(c, 1.45), tone(c, 0.82)] };
    }
    case 'reeds': case 'fern': case 'tuftbig': {
      const c = pick(kind === 'reeds' ? 'reed' : 'leaf', kind === 'reeds' ? '#5E9150' : '#6FAA5A');
      const blades = kind === 'fern' ? [[-14, -16], [-7, -22], [0, -25], [7, -22], [14, -16]] : kind === 'reeds' ? [[-8, -24], [-2, -30], [5, -26], [10, -20]] : [[-9, -14], [-3, -19], [3, -20], [9, -14]];
      const out = blades.map(([dx, dy]) => `<path d="M${r(x)} ${r(y + 6 * s)} Q${r(x + dx * 0.4 * s)} ${r(y + dy * 0.5 * s)} ${r(x + dx * s)} ${r(y + dy * s)}" fill="none" stroke="${c}" stroke-width="${r(3.4 * s)}" stroke-linecap="round"/>`);
      if (kind === 'reeds') out.push(...[[-2, -30], [5, -26]].map(([dx, dy]) => `<rect x="${r(x + dx * s - 2.5 * s)}" y="${r(y + dy * s - 2 * s)}" width="${r(5 * s)}" height="${r(10 * s)}" rx="${r(2.5 * s)}" fill="${pick('cattail', '#8A5A3B')}"/>`));
      return { svg: out.join(''), colours: [c, pick('cattail', '#8A5A3B')] };
    }
    case 'leafpile': {
      const cs = P.leaves || ['#E69A4A', '#D9773A', '#E8C25A']; const rnd = hashSeq('lp' + x + y); const out = [];
      for (let i = 0; i < 7; i++) { const lx = x + (rnd() - 0.5) * 30 * s, ly = y + (rnd() - 0.5) * 14 * s, a = Math.round(rnd() * 180), c = cs[i % cs.length]; out.push(`<path d="M${r(lx - 8 * s)} ${r(ly)} Q${r(lx)} ${r(ly - 7 * s)} ${r(lx + 8 * s)} ${r(ly)} Q${r(lx)} ${r(ly + 7 * s)} ${r(lx - 8 * s)} ${r(ly)} Z" fill="${c}" transform="rotate(${a} ${r(lx)} ${r(ly)})"/>`); }
      return { svg: out.join(''), colours: cs };
    }
    case 'shells': {
      const c = pick('shell', '#F3C2A6'); const out = [];
      for (const [dx, dy, k] of [[-8, 2, 1], [8, -3, 0.8]]) { const sx = x + dx * s, sy = y + dy * s, kk = k * s; out.push(`<path d="M${r(sx - 8 * kk)} ${r(sy + 4 * kk)} Q${r(sx - 9 * kk)} ${r(sy - 9 * kk)} ${r(sx)} ${r(sy - 9 * kk)} Q${r(sx + 9 * kk)} ${r(sy - 9 * kk)} ${r(sx + 8 * kk)} ${r(sy + 4 * kk)} Z" fill="${c}"/>`); for (const t of [-4, 0, 4]) out.push(`<path d="M${r(sx)} ${r(sy + 4 * kk)} L${r(sx + t * kk)} ${r(sy - 7 * kk)}" stroke="${tone(c, 0.82)}" stroke-width="1.3"/>`); }
      return { svg: out.join(''), colours: [c, tone(c, 0.82)] };
    }
    case 'seaweed': {
      const c = pick('weed', '#4FA07A'); const out = [];
      for (const dx of [-8, 0, 8]) out.push(`<path d="M${r(x + dx * s)} ${r(y + 10 * s)} q${r(-6 * s)} ${r(-8 * s)} 0 ${r(-16 * s)} q${r(6 * s)} ${r(-8 * s)} 0 ${r(-16 * s)}" fill="none" stroke="${dx ? c : tone(c, 0.82)}" stroke-width="${r(4.5 * s)}" stroke-linecap="round"/>`);
      return { svg: out.join(''), colours: [c, tone(c, 0.82)] };
    }
    case 'iceblock': {
      const c = pick('ice', '#E4F2FA'), d = pick('iceShade', '#B6D5E8');
      return { svg: `<path d="M${r(x - 18 * s)} ${r(y + 9 * s)} L${r(x - 14 * s)} ${r(y - 10 * s)} L${r(x + 6 * s)} ${r(y - 14 * s)} L${r(x + 18 * s)} ${r(y - 2 * s)} L${r(x + 15 * s)} ${r(y + 10 * s)} Z" fill="${c}"/><path d="M${r(x + 6 * s)} ${r(y - 14 * s)} L${r(x + 18 * s)} ${r(y - 2 * s)} L${r(x + 15 * s)} ${r(y + 10 * s)} L${r(x + 4 * s)} ${r(y + 10 * s)} Z" fill="${d}"/>`, colours: [c, d] };
    }
    case 'hay': {
      const c = pick('hay', '#E8C25A'), d = tone(c, 0.84);
      return { svg: `<path d="M${r(x - 22 * s)} ${r(y + 10 * s)} Q${r(x - 20 * s)} ${r(y - 16 * s)} ${r(x)} ${r(y - 18 * s)} Q${r(x + 20 * s)} ${r(y - 16 * s)} ${r(x + 22 * s)} ${r(y + 10 * s)} Z" fill="${c}"/>${[-12, -4, 4, 12].map((dx) => `<path d="M${r(x + dx * s)} ${r(y + 8 * s)} L${r(x + dx * 0.8 * s)} ${r(y - 10 * s)}" stroke="${d}" stroke-width="1.6" stroke-linecap="round"/>`).join('')}`, colours: [c, d] };
    }
    case 'crystal': {
      const c = pick('crystal', '#9FD8E6'), d = tone(c, 0.8);
      return { svg: [[-8, 6, 16], [3, 4, 24], [12, 6, 14]].map(([dx, dy, h]) => `<path d="M${r(x + dx * s - 5 * s)} ${r(y + dy * s)} L${r(x + dx * s - 5 * s)} ${r(y + dy * s - h * 0.7 * s)} L${r(x + dx * s)} ${r(y + dy * s - h * s)} L${r(x + dx * s + 5 * s)} ${r(y + dy * s - h * 0.7 * s)} L${r(x + dx * s + 5 * s)} ${r(y + dy * s)} Z" fill="${c}"/><path d="M${r(x + dx * s)} ${r(y + dy * s - h * s)} L${r(x + dx * s + 5 * s)} ${r(y + dy * s - h * 0.7 * s)} L${r(x + dx * s + 5 * s)} ${r(y + dy * s)} L${r(x + dx * s)} ${r(y + dy * s)} Z" fill="${d}"/>`).join(''), colours: [c, d] };
    }
    case 'cloudpuff': {
      const c = pick('puff', '#FFFFFF');
      const a = BAND.cloud({ x, y, s: s * 0.9, col: c }); return { svg: a.svg, colours: [c] };
    }
    case 'pebblepath': {
      const c = pick('pebble', '#C9BBA6'); const out = [];
      for (const [dx, dy, rr] of [[-14, 4, 5], [-3, -2, 6], [9, 3, 5], [18, -3, 4]]) out.push(`<ellipse cx="${r(x + dx * s)}" cy="${r(y + dy * s)}" rx="${r(rr * s)}" ry="${r(rr * 0.65 * s)}" fill="${c}"/>`);
      return { svg: out.join(''), colours: [c] };
    }
    default: throw new Error('hmx-scenery: unknown decor ' + kind);
  }
}

module.exports = { bandSvg, patchSvg, decorSvg, DECOR_R, tone, hashSeq, BAND, toLine, LINE_INK };
