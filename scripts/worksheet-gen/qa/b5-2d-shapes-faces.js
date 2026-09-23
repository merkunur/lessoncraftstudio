/**
 * b5-2d-shapes-faces.js — the K-368 `2d-shapes` FACE gate (nt10-E Phase E; design
 * docs/worksheet-gen/b5-designs/K-368-2d-shapes.md §3 + §5; record _work/K-368-faces.md).
 * Called by qa/verify-b5-2d-shapes.js after the base gate (one browser, one assertion
 * counter, one poison log): `faceGate({page, ok, judge, fails, pngs, …})`.
 *
 *   F1 G1-381 real-or-not · F2 K-371 around-us · F3 G1-382 write-name · F4 G1-383 riddles · F5 K-372 dot-draw
 *
 * A. STRINGS — every face's i18n.en === the bank's strings[mode] (the row and the bank are one source),
 *    the G1 faces declare gradeBand G1, the K faces stay K; i18n/strings.en.json carries each face.
 * B. SWEEP — 20 seeds per face (seedEpoch 1..20, the shipped seed is epoch 1; --quick 5) through the
 *    GATE'S OWN node checks on bodyHtml (never data-lcs-kind / -variant / -sub):
 *      F1 per row the true figures (own classify) in trueMin..trueMax; >= 2 turned + >= 1 skinny true on
 *         the page; 0 squares in the rectangle row; every near-miss MEASURABLE from its path (visible gap
 *         >= 10, sagitta >= 15 % of the side, fillet >= 20 % of the shortest side re-built from the path's own
 *         straight runs, ellipse >= 1.4, chord cap >= 0.2 r, a quadrilateral >= 10° off square corners); the
 *         true figures' floors (G1: min caliper >= 30, extent >= 45); per-PAGE column tell (>= 3 columns, no
 *         column holding a true figure in every row) and POOLED no column > 40 %
 *      F2 split 4 / 4 from the BANK's shape (not the stamp); every src === fileUri(theme, noun) of its bank
 *         entry; no object twice; every column holds both shapes; tiles circle-then-rectangle
 *      F3 the answers (own classify) = the 4 core kinds, none > 2, no repeat in adjacent lanes; the bank = the
 *         4 core literals, order != first-appearance order; every ruling row empty; >= 2 turned; G1 floors
 *      F4 each card: exactly one tag names its riddle's kind; square riddles never offer rectangle; the riddle
 *         text free of every name + inflection; per-page slot spread; pooled slot share <= 60 %
 *      F5 every given side joins lattice points; a square card closes as a square inside the lattice; the
 *         rectangle card closes as a 2 : 1 rectangle and NEVER as a square (the gate's own completion code)
 *    + locale-neutral: the de synthetic bank draws the SAME page as en for every face.
 * C. RENDER — each face through the REAL pipeline at its own en chrome, a one-line chrome (814), the 722
 *    fixture (3-line title + 3-line instruction) and the 677 fixture (a 4-line fi title, the synthetic fi
 *    bank: suorakulmio). verify() empty, qa/lints.js clean, then ITSELF: SPARSE (every blank band between
 *    consecutive blocks, container edge -> content and the last block -> the body bottom <= 40 px),
 *    OVERLAP (no two blocks of one container intersect), the text floor (>= 16 px), the per-face floors
 *    (F1 lens 132 / F2 picture 110 + tile 56 / F3 lens 84 + writing row 60 / F4 tag 44 + <= 3 bubble lines /
 *    F5 drawn pitch >= 46), everything above the footer.
 * D. POISON — each must FAIL for its OWN reason; the untouched face is the control:
 *      PR2 an F1 rectangle row containing a square · PR3F two data-lcs-kind stamps swapped (stays GREEN) ·
 *      PR6 F2 clock resolved to around the house/clock · PR8 an F1 gap at 0.10 · PR9 an F4 riddle forced
 *      to 4 lines · PR10 an F3 ruling row with a starter · PR12 an F5 rectangle card given (1,2) (render) +
 *      PR12g the same at the config (spec guard) · SP1-SP5 slack moved BETWEEN blocks (one per face) ·
 *      OV1 OV4 a block riding into its neighbour · AT1-AT4 the per-page answer tells (F1 true figures first,
 *      F2 circles all left, F3 bank in answer order, F4 every answer in slot 1) · AP1-AP5 an instruction
 *      naming apparatus the face does not print.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const FS = require('../primitives/flat-shape.js');
const FSG = require('./verify-flat-shape.js');
const C5 = require('../templates/components-b5.js');
const { loadType } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { fileUri } = require('../lib/b2-common.js');
const bankMod = require('../data/b5/2d-shapes.js');
const T = require('../primitives/_tokens.js');

const FACES = [
  { id: 'G1-381', mode: 'real-or-not', band: 'G1' },
  { id: 'K-371', mode: 'around-us', band: 'K' },
  { id: 'G1-382', mode: 'write-name', band: 'G1' },
  { id: 'G1-383', mode: 'riddles', band: 'G1' },
  { id: 'K-372', mode: 'dot-draw', band: 'K' },
];
const CORE = bankMod.KINDS;
const SPARSE_MAX = 40;
const FILL_MIN = 0.85;
const CHROME = {
  one: { title: '2D Shapes', instruction: 'Circle.', body: 814 },
  de722: { title: 'Geometrische Formen benennen: gedrehte und schmale Figuren erkennen', instruction: 'Schau dir jede Form genau an, auch die gedrehten und die ganz schmalen Formen, und kreise danach bei jeder Form ihren richtigen Namen deutlich mit dem Stift ein.', body: 722 },
  fi677: { title: 'Tasokuviot: nimeä käännetyt, kapeat, pienet ja suuret tasokuviot oikein', instruction: 'Katso jokaista kuviota tarkasti, myös käännettyjä, kapeita ja pieniä kuvioita, ja ympyröi sitten jokaisen kuvion vierestä sen oikea nimi selvästi kynällä, yksi nimi jokaiselle kuviolle.', body: 677 },
};

const attr = (tag, name) => { const m = new RegExp(`\\s${name}="([^"]*)"`).exec(tag); return m ? m[1] : null; };
const unesc = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const rootStamp = (html, name) => JSON.parse(unesc(new RegExp(`data-lcs-${name}="([^"]+)"`).exec(html)[1]));
const fold = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc || 'en');
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasWord = (text, word, loc) => new RegExp('(?<!\\p{L})' + escRe(fold(word, loc)) + '(?!\\p{L})', 'u').test(fold(text, loc));
const lev = (a, b) => { let t = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI; t = ((t % 180) + 180) % 180; return Math.min(t, 180 - t); };
const angleAt = (p, v, q) => { const a = [p[0] - v[0], p[1] - v[1]], b = [q[0] - v[0], q[1] - v[1]]; return Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))))) * 180 / Math.PI; };

/** The gate's own measurement of ONE lens svg (the drawn element only): kind + the near-miss evidence. */
function measureLens(svgHtml, classifySvg) {
  const s = FSG.parseSvg(svgHtml);
  if (!s.fig) return { kind: 'none' };
  const sw = +(attr(s.fig.src, 'stroke-width') || 3);
  if (s.fig.tag === 'ellipse') return { kind: 'ellipse', aspect: +attr(s.fig.src, 'rx') / +attr(s.fig.src, 'ry') };
  if (s.fig.tag === 'circle') return classifySvg(svgHtml);
  const p = FSG.parsePath(attr(s.fig.src, 'd'));
  if (!p.closed) { const a = p.segs[0].from, b = p.segs[p.segs.length - 1].to; return { kind: 'open', gap: Math.hypot(a[0] - b[0], a[1] - b[1]) - sw }; }
  const q = p.segs.filter((x) => x.cmd === 'Q');
  if (q.length) {
    const c = q[0], L = Math.hypot(c.to[0] - c.from[0], c.to[1] - c.from[1]);
    const mid = [(c.from[0] + c.to[0]) / 2, (c.from[1] + c.to[1]) / 2], top = [0.25 * c.from[0] + 0.5 * c.ctl[0] + 0.25 * c.to[0], 0.25 * c.from[1] + 0.5 * c.ctl[1] + 0.25 * c.to[1]];
    return { kind: 'curved', sag: Math.hypot(top[0] - mid[0], top[1] - mid[1]), L };
  }
  const arcs = p.segs.filter((x) => x.cmd === 'A');
  if (arcs.length === 1) { const a = arcs[0], c = Math.hypot(a.to[0] - a.from[0], a.to[1] - a.from[1]); return { kind: 'chord', cap: a.rx - Math.sqrt(Math.max(0, a.rx * a.rx - c * c / 4)), r: a.rx, large: a.large }; }
  if (arcs.length > 1) {
    // rebuild the corners from the path's OWN straight runs (intersect consecutive lines), then the shortest side
    const lines = p.segs.filter((x) => x.cmd === 'L' && Math.hypot(x.to[0] - x.from[0], x.to[1] - x.from[1]) > 0.5);
    const X = (l1, l2) => { const [a, b] = [l1.from, l1.to], [c, d] = [l2.from, l2.to]; const den = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]); if (Math.abs(den) < 1e-9) return null; const t = ((a[0] - c[0]) * (c[1] - d[1]) - (a[1] - c[1]) * (c[0] - d[0])) / den; return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]; };
    const corners = lines.map((l, i) => X(l, lines[(i + 1) % lines.length])).filter(Boolean);
    const sides = corners.map((c, i) => Math.hypot(corners[(i + 1) % corners.length][0] - c[0], corners[(i + 1) % corners.length][1] - c[1]));
    return { kind: 'rounded', rMin: Math.min(...arcs.map((a) => a.rx)), shortest: Math.min(...sides), corners: corners.length, arcs: arcs.length };
  }
  const g = classifySvg(svgHtml);
  if (/^polygon-4$/.test(g.kind)) {
    const P = p.segs.map((x) => x.from);
    return { ...g, kind: 'quadrilateral', off: Math.max(...P.map((v, i) => Math.abs(angleAt(P[(i - 1 + 4) % 4], v, P[(i + 1) % 4]) - 90))) };
  }
  return g;
}
const nearMissFindings = (m, tag) => {
  const f = [];
  if (m.kind === 'open' && !(m.gap >= 10)) f.push(`${tag}: visible gap ${m.gap.toFixed(1)} px < 10`);
  if (m.kind === 'curved' && !(m.sag >= 0.15 * m.L)) f.push(`${tag}: sagitta ${m.sag.toFixed(1)} < 15 % of ${m.L.toFixed(1)}`);
  if (m.kind === 'rounded' && !(m.rMin >= 0.2 * m.shortest - 1e-6 && m.arcs === m.corners)) f.push(`${tag}: fillet ${m.rMin} < 20 % of the shortest side ${m.shortest.toFixed(1)} (${m.arcs} arcs / ${m.corners} corners)`);
  if (m.kind === 'ellipse' && !(m.aspect >= 1.4 - 1e-3)) f.push(`${tag}: ellipse aspect ${m.aspect.toFixed(2)} < 1.4`);
  if (m.kind === 'chord' && !(m.large === 1 && m.cap >= 0.2 * m.r)) f.push(`${tag}: chord cap ${m.cap.toFixed(1)} < 0.2 r`);
  if (m.kind === 'quadrilateral' && !(m.off >= 10)) f.push(`${tag}: a quadrilateral within ${m.off.toFixed(1)}° of square corners`);
  if (!['open', 'curved', 'rounded', 'ellipse', 'chord', 'quadrilateral', 'triangle', 'square', 'rectangle', 'circle'].includes(m.kind)) f.push(`${tag}: a near-miss that measures as "${m.kind}"`);
  return f;
};

/* ------------------------------------------------------------------ B. node checks per face (on bodyHtml) */
const lanesOf = (html) => html.split('data-lcs-row data-lcs-target="').slice(1).map((c) => ({ target: c.slice(0, c.indexOf('"')), svgs: [...c.split('<div class="ws-lane')[0].matchAll(/<svg[\s\S]*?<\/svg>/g)].map((m) => m[0]) }));
const cardsOf = (html) => html.split('<section class="ws-card"').slice(1);

function checkF1(html, cfg, classifySvg) {
  const f = [];
  const lanes = lanesOf(html);
  let turned = 0, skinny = 0, total = 0;
  const col = Array(cfg.perRow).fill(0);
  if (lanes.length !== cfg.rows.length) f.push(`${lanes.length} rows ≠ ${cfg.rows.length}`);
  lanes.forEach((ln, li) => {
    if (ln.svgs.length !== cfg.perRow) f.push(`row ${li + 1}: ${ln.svgs.length} figures ≠ ${cfg.perRow}`);
    let hits = 0;
    ln.svgs.forEach((svg, i) => {
      const tag = `row ${li + 1} (${ln.target}) figure ${i + 1}`;
      const m = measureLens(svg, classifySvg);
      if (/<text\b/.test(svg)) f.push(`${tag}: text inside the svg`);
      if (ln.target === 'rectangle' && m.kind === 'square') f.push(`${tag}: a square in the rectangle row`);
      if (m.kind === ln.target) {
        hits++; total++; col[i]++;
        if (m.turned) turned++;
        if (m.skinny) skinny++;
        if (m.minW < cfg.floorW - 0.3 || m.ext < cfg.floorE - 0.3) f.push(`${tag}: min caliper ${m.minW.toFixed(1)} / extent ${m.ext.toFixed(1)} below ${cfg.floorW} / ${cfg.floorE}`);
        if (m.R + 1.5 > m.lensR - 3 + 0.05) f.push(`${tag}: R ${m.R.toFixed(1)} leaves < 3 px inside the lens`);
      } else f.push(...nearMissFindings(m, tag));
    });
    if (hits < cfg.trueMin || hits > cfg.trueMax) f.push(`row ${li + 1} (${ln.target}): ${hits} true figures outside ${cfg.trueMin}..${cfg.trueMax}`);
  });
  if (turned < cfg.turnedMin) f.push(`${turned} turned true figures < ${cfg.turnedMin}`);
  if (skinny < cfg.skinnyMin) f.push(`${skinny} skinny true figures < ${cfg.skinnyMin}`);
  const cap = Math.min(Math.ceil(total * cfg.colMaxShare), lanes.length >= 3 ? lanes.length - 1 : lanes.length);
  if (col.filter((x) => x > 0).length < Math.min(3, total) || Math.max(...col) > cap) f.push(`column spread: true figures per column ${JSON.stringify(col)} (cap ${cap})`);
  return { findings: f, col, total };
}
function checkF2(html, cfg, block, loc) {
  const f = [];
  const cards = cardsOf(html);
  const ans = [], objs = [];
  const objects = block.objects || bankMod.OBJECTS;
  cards.forEach((c, i) => {
    const tag = `card ${i + 1}`;
    const obj = unesc(attr(c, 'data-lcs-obj') || '');
    const entry = objects.find((o) => `${o.theme}/${o.noun}` === obj);
    if (!entry) { f.push(`${tag}: "${obj}" is not a bank object`); return; }
    ans.push(entry.shape); objs.push(obj);
    if (attr(c, 'data-lcs-answer') !== entry.shape) f.push(`${tag}: stamped answer ≠ the bank's shape for ${obj}`);
    const src = unesc((/<img src="([^"]+)"/.exec(c) || [])[1] || '');
    if (src !== fileUri(entry.theme, entry.noun)) f.push(`${tag}: src !== fileUri(bank entry ${obj}) — ${src.split('/').slice(-2).join('/')}`);
    const tiles = [...c.matchAll(/data-lcs-tile="([^"]+)"/g)].map((m) => m[1]);
    if (tiles.join() !== 'circle,rectangle') f.push(`${tag}: tiles ${tiles} ≠ circle,rectangle`);
    const texts = [...c.matchAll(/<span data-lcs-tile-text[^>]*>([^<]*)</g)].map((m) => unesc(m[1]));
    if (texts.join('|') !== [block.names.circle, block.names.rectangle].join('|')) f.push(`${tag}: tile texts ${texts} ≠ the ${loc} bank literals`);
    if (/<svg[^>]*>(?:(?!<\/svg>)[\s\S])*fill="(?!none)[^"]*"(?:(?!<\/svg>)[\s\S])*stroke=/.test(c)) f.push(`${tag}: a filled tile glyph`);
  });
  if (new Set(objs).size !== objs.length) f.push('an object twice');
  for (const s of ['circle', 'rectangle']) if (ans.filter((x) => x === s).length !== cfg.split[s]) f.push(`${ans.filter((x) => x === s).length} ${s} ≠ ${cfg.split[s]}`);
  for (let c = 0; c < cfg.cols; c++) { const a = ans.filter((_, i) => i % cfg.cols === c); if (!a.includes('circle') || !a.includes('rectangle')) f.push(`column spread: grid column ${c + 1} holds only ${a[0]}`); }
  return { findings: f, ans };
}
function checkF3(html, cfg, block, classifySvg) {
  const f = [];
  const bank = [...html.matchAll(/data-lcs-bank-word="([^"]+)"/g)].map((m) => unesc(m[1]));
  const kindOf = (w) => CORE.find((k) => block.names[k] === w);
  if (bank.length !== 4 || CORE.some((k) => !bank.includes(block.names[k]))) f.push(`the bank ${JSON.stringify(bank)} is not the 4 core literals`);
  const lanes = html.split('data-lcs-lane ').slice(1);
  if (lanes.length !== cfg.lanes) f.push(`${lanes.length} lanes ≠ ${cfg.lanes}`);
  const ans = [];
  let turned = 0;
  lanes.forEach((ln, i) => {
    const tag = `lane ${i + 1}`;
    const svg = (/<svg[^>]*data-lcs-prim="flat-shape"[\s\S]*?<\/svg>/.exec(ln) || [''])[0];
    const g = classifySvg(svg);
    if (!CORE.includes(g.kind)) { f.push(`${tag}: classifies as "${g.kind}"`); return; }
    ans.push(g.kind);
    if (g.turned) turned++;
    if (g.minW < cfg.floorW - 0.3 || g.ext < cfg.floorE - 0.3) f.push(`${tag}: min caliper ${g.minW.toFixed(1)} / extent ${g.ext.toFixed(1)} below ${cfg.floorW} / ${cfg.floorE}`);
    const ruling = ln.split('data-lcs-ruling-row').slice(1);
    if (ruling.length !== 1) f.push(`${tag}: ${ruling.length} ruling rows ≠ 1`);
    if (/<text\b|data-lcs-starter/.test(ruling.join(''))) f.push(`${tag}: ruling row not empty (a starter)`);
    // the lane's own markup: from the end of its opening tag to the end of its writing row's svg (the chunk runs on
    // into the next lane's opening tag, and the last one into the page footer)
    const ri = ln.indexOf('data-lcs-ruling-row');
    const own = ln.slice(ln.indexOf('>') + 1, ri < 0 ? ln.length : ln.indexOf('</svg>', ri) + 6);
    const visible = own.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '').trim();
    if (visible) f.push(`${tag}: text printed in the lane ("${visible.slice(0, 20)}")`);
  });
  for (const k of CORE) { const n = ans.filter((x) => x === k).length; if (!n) f.push(`no ${k} lane`); if (n > 2) f.push(`${k} in ${n} lanes`); }
  if (ans.some((k, i) => i && k === ans[i - 1])) f.push('the same shape in two adjacent lanes');
  if (turned < cfg.turnedMin) f.push(`${turned} turned < ${cfg.turnedMin}`);
  const first = []; for (const k of ans) if (!first.includes(k)) first.push(k);
  if (bank.map(kindOf).join() === first.join()) f.push('answer tell: the bank lists the names in the order the shapes first appear');
  return { findings: f };
}
function checkF4(html, cfg, block, loc) {
  const f = [];
  const cards = cardsOf(html);
  const slots = [], kinds = [];
  const leak = [...Object.values(block.names), ...Object.values(block.inflections || {}).flat()];
  cards.forEach((c, i) => {
    const tag = `card ${i + 1}`;
    const key = attr(c, 'data-lcs-riddle') || '';
    const [k, idx] = key.split(':');
    kinds.push(k);
    const text = unesc((/<p data-lcs-riddle-text[^>]*>([^<]*)<\/p>/.exec(c) || [])[1] || '');
    const want = block.riddles[k] && block.riddles[k][+idx];
    if (!want || want.text !== text) f.push(`${tag}: the riddle text ≠ the ${loc} bank riddle ${key}`);
    for (const w of leak) if (hasWord(text, w, loc)) f.push(`${tag}: the riddle contains the name / inflection "${w}"`);
    const tags = [...c.matchAll(/data-lcs-tag="([^"]+)"/g)].map((m) => m[1]);
    if (tags.length !== cfg.tags) f.push(`${tag}: ${tags.length} tags`);
    if (tags.filter((x) => x === k).length !== 1) f.push(`${tag}: ${tags.filter((x) => x === k).length} tags name ${k}`);
    if (k === 'square' && tags.includes('rectangle')) f.push(`${tag}: a square riddle offers a rectangle tag`);
    slots.push(tags.indexOf(k));
  });
  for (const k of CORE) if (!kinds.includes(k)) f.push(`no ${k} riddle`);
  if (new Set(cards.map((c) => attr(c, 'data-lcs-riddle'))).size !== cards.length) f.push('a riddle twice');
  const counts = {}; for (const s of slots) counts[s] = (counts[s] || 0) + 1;
  if (Object.keys(counts).length < Math.min(cfg.tags, slots.length) || Math.max(...Object.values(counts)) > Math.floor(cfg.slotMaxShare * slots.length + 1e-9)) f.push(`slot spread: ${JSON.stringify(counts)}`);
  return { findings: f, slots };
}
/** the gate's OWN completion code (not the spec's) */
function fitsAsLattice(p0, p1, ratio, n) {
  const v = [p1[0] - p0[0], p1[1] - p0[1]];
  const qx = -v[1] * ratio, qy = v[0] * ratio;
  if (Math.abs(qx - Math.round(qx)) > 1e-9 || Math.abs(qy - Math.round(qy)) > 1e-9) return false;
  const inside = (x, y) => x >= 0 && y >= 0 && x <= n - 1 && y <= n - 1;
  return [1, -1].some((s) => inside(p0[0] + s * qx, p0[1] + s * qy) && inside(p1[0] + s * qx, p1[1] + s * qy));
}
function checkF5(html, cfg) {
  const f = [];
  const cards = cardsOf(html);
  if (cards.length !== cfg.cards) f.push(`${cards.length} cards`);
  cards.forEach((c, i) => {
    const tag = `card ${i + 1}`;
    const k = attr(c, 'data-lcs-dotcard');
    if (/<text\b/.test(c)) f.push(`${tag}: text inside the lattice`);
    const cx = [...new Set([...c.matchAll(/<circle data-lcs-dot cx="([^"]+)"/g)].map((m) => +m[1]))].sort((a, b) => a - b);
    const n = cx.length, pitch = cx[1] - cx[0], m0 = cx[0];
    if (n !== cfg.n || pitch < cfg.pitch - 1e-6) f.push(`${tag}: a ${n}-lattice at pitch ${pitch}`);
    const line = /<line data-lcs-given-side x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="([^"]+)"/.exec(c);
    if (k === 'rectangle' && !line) { f.push(`${tag}: the rectangle card has no given side`); return; }
    if (!line) return;
    if (k === 'triangle') f.push(`${tag}: a triangle card with a given side`);
    const L = [1, 2, 3, 4].map((j) => (+line[j] - m0) / pitch);
    if (L.some((x) => Math.abs(x - Math.round(x)) > 1e-6 || x < 0 || x > n - 1)) { f.push(`${tag}: the given side does not join two lattice points`); return; }
    const p0 = [L[0], L[1]], p1 = [L[2], L[3]];
    if (k === 'square' && !fitsAsLattice(p0, p1, 1, n)) f.push(`${tag}: no square completion fits`);
    if (k === 'rectangle') { if (fitsAsLattice(p0, p1, 1, n)) f.push(`${tag}: square completion exists on the rectangle card`); if (!fitsAsLattice(p0, p1, 0.5, n) && !fitsAsLattice(p0, p1, 2, n)) f.push(`${tag}: no rectangle completion fits`); }
  });
  return { findings: f };
}

/* ------------------------------------------------------------------ C. render measures */
async function measureRender(page) {
  return page.evaluate(() => {
    const R = (e) => { const b = e.getBoundingClientRect(); return { l: b.left, r: b.right, t: b.top, b: b.bottom, w: b.width, h: b.height }; };
    const root = document.querySelector('[data-lcs-mode]');
    const mode = root.getAttribute('data-lcs-mode');
    const SEL = {
      'real-or-not': [['[data-lcs-row]', '[data-lcs-given], .s2d-realfigs']],
      'around-us': [['[data-lcs-card]', 'img[data-lcs-obj-img], .s2d-tiles']],
      'write-name': [['[data-lcs-bank-banner]', '[data-lcs-bank-word]'], ['[data-lcs-lane]', '.s2d-lens, [data-lcs-ruling-row] svg']],
      riddles: [['[data-lcs-card]', '[data-lcs-bubble], .s2d-tags']],
      'dot-draw': [['[data-lcs-card]', '[data-lcs-given], g[data-lcs-dots]']],
    }[mode];
    const body = R(document.querySelector('.ws-body'));
    const bands = [], overlaps = [];
    let contentBottom = -Infinity;
    const boxes = [];
    for (const [bs, ls] of SEL) for (const box of root.querySelectorAll(bs)) {
      const br = R(box);
      boxes.push(br);
      const leaves = [...box.querySelectorAll(ls)].map(R).filter((x) => x.w > 0 && x.h > 0);
      for (const x of leaves) contentBottom = Math.max(contentBottom, x.b);
      for (let i = 0; i < leaves.length; i++) for (let j = i + 1; j < leaves.length; j++) {
        const a = leaves[i], b = leaves[j];
        const ix = Math.min(a.r, b.r) - Math.max(a.l, b.l), iy = Math.min(a.b, b.b) - Math.max(a.t, b.t);
        if (ix > 2 && iy > 2) overlaps.push(`${bs} blocks intersect by ${Math.round(ix)}×${Math.round(iy)} px`);
      }
      // rows of leaves (vertical ranges that overlap are one row)
      const sorted = leaves.slice().sort((a, b) => a.t - b.t);
      const rows = [];
      for (const x of sorted) { const row = rows.find((r) => x.t < r.b - 0.5 && x.b > r.t + 0.5); if (row) { row.t = Math.min(row.t, x.t); row.b = Math.max(row.b, x.b); } else rows.push({ t: x.t, b: x.b }); }
      rows.sort((a, b) => a.t - b.t);
      if (!rows.length) { bands.push({ where: `${bs}: empty`, px: br.h }); continue; }
      bands.push({ where: `${bs} top edge → first block`, px: rows[0].t - br.t });
      for (let i = 1; i < rows.length; i++) bands.push({ where: `${bs} block → block`, px: rows[i].t - rows[i - 1].b });
      bands.push({ where: `${bs} last block → bottom edge`, px: br.b - rows[rows.length - 1].b });
    }
    // containers in column flow: body top → first, consecutive, last → body bottom
    const cols = [];
    for (const b of boxes) { let c = cols.find((x) => Math.abs(x.l - b.l) < 8); if (!c) { c = { l: b.l, list: [] }; cols.push(c); } c.list.push(b); }
    for (const c of cols) {
      c.list.sort((a, b) => a.t - b.t);
      bands.push({ where: 'body top → first container', px: c.list[0].t - body.t });
      for (let i = 1; i < c.list.length; i++) bands.push({ where: 'container → container', px: c.list[i].t - c.list[i - 1].b });
      bands.push({ where: 'last container → body bottom', px: body.b - c.list[c.list.length - 1].b });
    }
    let minFont = Infinity, minFontText = '';
    root.querySelectorAll('*').forEach((el) => {
      if (el.closest('.ws-card-badge')) return;
      if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) { const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < minFont) { minFont = fs; minFontText = el.textContent.trim().slice(0, 20); } }
    });
    const floors = {
      lens: [...root.querySelectorAll('.s2d-lens')].map((e) => R(e).w),
      pill: [...root.querySelectorAll('[data-lcs-given]')].map((e) => R(e).h),
      img: [...root.querySelectorAll('img[data-lcs-obj-img]')].map((e) => Math.min(R(e).w, R(e).h)),
      tile: [...root.querySelectorAll('[data-lcs-tile]')].map((e) => ({ h: R(e).h, clip: R(e.querySelector('[data-lcs-tile-text]')).r > R(e).r - 8 + 0.5 })),
      ruling: [...root.querySelectorAll('[data-lcs-ruling-row] svg')].map((e) => R(e).h),
      tag: [...root.querySelectorAll('[data-lcs-tag]')].map((e) => ({ h: R(e).h, clip: e.scrollWidth > e.clientWidth + 0.5 })),
      bubbleLines: [...root.querySelectorAll('[data-lcs-riddle-text]')].map((e) => Math.round(R(e).h / parseFloat(getComputedStyle(e).lineHeight))),
      pitch: [...root.querySelectorAll('svg[data-lcs-lattice]')].map((s) => { const d = [...s.querySelectorAll('circle[data-lcs-dot]')].slice(0, 2).map((c) => c.getBoundingClientRect()); return d.length === 2 ? d[1].left - d[0].left : 0; }),
    };
    return { mode, body, bands, overlaps, minFont, minFontText, floors, contentBottom };
  });
}
function renderFindings(name, m, face) {
  const f = [];
  for (const b of m.bands) if (b.px > SPARSE_MAX + 0.5) f.push(`${name}: SPARSE — a ${Math.round(b.px)} px blank band (${b.where}) > ${SPARSE_MAX}`);
  for (const b of m.bands) if (b.px < -0.5) f.push(`${name}: OVERLAP — ${b.where} ${Math.round(b.px)} px`);
  for (const o of m.overlaps) f.push(`${name}: OVERLAP — ${o}`);
  // FILL (lead note 2026-09-23): at the one-line chrome (body >= 800) the content reaches >= 85 % of the body; at
  // every chrome it stays inside the body
  const fill = (m.contentBottom - m.body.t) / m.body.h;
  if (m.body.h >= 800 && fill < FILL_MIN) f.push(`${name}: FILL — the content ends at ${(fill * 100).toFixed(1)} % of the ${Math.round(m.body.h)} px body (< ${FILL_MIN * 100} %)`);
  if (m.contentBottom > m.body.b + 0.5) f.push(`${name}: FILL — the content runs ${Math.round(m.contentBottom - m.body.b)} px past the body`);
  if (m.minFont < 16 - 0.01) f.push(`${name}: text "${m.minFontText}" at ${m.minFont} px < 16`);
  const F = m.floors;
  if (face.mode === 'real-or-not') { if (F.lens.length !== 12 || F.lens.some((w) => w < 132 - 0.5)) f.push(`${name}: lenses ${F.lens.length} / min ${Math.min(...F.lens)} (12 at 132)`); if (F.pill.some((h) => h < 40 - 0.5)) f.push(`${name}: a name pill < 40 high`); }
  if (face.mode === 'around-us') { if (F.img.some((w) => w < 110 - 0.5)) f.push(`${name}: a picture < 110`); if (F.tile.some((t) => t.h < 56 - 0.5)) f.push(`${name}: a tile < 56 high`); if (F.tile.some((t) => t.clip)) f.push(`${name}: a tile name overflows its tile`); }
  if (face.mode === 'write-name') { if (F.lens.some((w) => w < 84 - 0.5)) f.push(`${name}: a lens < 84`); if (F.ruling.length !== 6 || F.ruling.some((h) => h < 60)) f.push(`${name}: writing rows ${F.ruling.map(Math.round)} (6, >= 60 high)`); }
  if (face.mode === 'riddles') { if (F.tag.some((t) => t.h < 44 - 0.5)) f.push(`${name}: a tag < 44 high`); if (F.tag.some((t) => t.clip)) f.push(`${name}: a tag name overflows`); if (F.bubbleLines.some((n) => n > 3)) f.push(`${name}: bubble ${Math.max(...F.bubbleLines)} lines > 3`); }
  if (face.mode === 'dot-draw') { if (F.pitch.length !== 4 || F.pitch.some((p) => p < 46 - 0.5)) f.push(`${name}: drawn pitch ${F.pitch.map((p) => p.toFixed(1))} < 46`); if (F.pill.some((h) => h < 40 - 0.5)) f.push(`${name}: a name pill < 40 high`); }
  return f;
}

/* ------------------------------------------------------------------ the gate */
async function faceGate({ page, ok, judge, fails, pngs, validateBank, syntheticBlock, classifySvg, QUICK, OUT }) {
  const { renderInstance } = require('../render/render-instance.js');
  const en = bankMod.SHAPES_2D.en;
  const TYPES = Object.fromEntries(FACES.map((x) => [x.id, loadType(x.id)]));
  const strEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'i18n', 'strings.en.json'), 'utf8'));
  // A. strings + bands
  for (const x of FACES) {
    const t = TYPES[x.id];
    ok(t.i18n.en.title === en.strings[x.mode].title && t.i18n.en.instruction === en.strings[x.mode].instruction, `${x.id}: i18n.en ${JSON.stringify(t.i18n.en)} ≠ the bank strings.${x.mode}`);
    ok(t.gradeBand === x.band, `${x.id}: gradeBand ${t.gradeBand} ≠ ${x.band}`);
    ok(t.difficulty[2].mode === x.mode && t.difficulty[1] === t.difficulty[2] && t.difficulty[3] === t.difficulty[2], `${x.id}: difficulty is not one ${x.mode} config for all three levels`);
    ok(!!strEn[x.id] && strEn[x.id].title === t.i18n.en.title, `${x.id}: i18n/strings.en.json ≠ the face title (run node i18n/build-en.js)`);
  }
  const face = (id) => FACES.find((x) => x.id === id);
  /** a face type whose build runs over `block` (and an optional cfg patch), bodyHtml rewritten by fn */
  const rewire = (id, block, fn, cfgPatch) => Object.assign(Object.create(TYPES[id]), { build(args, ctx) {
    const out = TYPES[id]._buildWith(block, { ...TYPES[id].difficulty[2], ...(cfgPatch || {}) }, { locale: args.locale }, ctx);
    if (fn) out.bodyHtml = fn(out.bodyHtml);
    return out;
  } });
  const nodeCheck = (id, html, block, loc) => {
    const cfg = rootStamp(html, 'cfg');
    const m = face(id).mode;
    if (m === 'real-or-not') return checkF1(html, cfg, classifySvg);
    if (m === 'around-us') return checkF2(html, cfg, block, loc);
    if (m === 'write-name') return checkF3(html, cfg, block, classifySvg);
    if (m === 'riddles') return checkF4(html, cfg, block, loc);
    return checkF5(html, cfg);
  };
  // B. sweep
  const SEEDS = QUICK ? 5 : 20;
  const de = syntheticBlock('de');
  const sig = (h) => [...h.matchAll(/data-lcs-verts="([^"]+)"|data-lcs-obj="([^"]+)"|data-lcs-riddle="([^"]+)"|data-lcs-tag="([^"]+)"|data-lcs-given-side x1="([^"]+)" y1="([^"]+)"/g)].map((m) => m.slice(1).filter(Boolean).join(',')).join('|');
  for (const x of FACES) {
    const pooled = {};
    let pages = 0;
    for (let e = 1; e <= SEEDS; e++) {
      const seed = () => makeRng(instanceSeed({ typeId: x.id, theme: null, difficulty: 2, seedEpoch: e }));
      let out;
      try { out = TYPES[x.id].build({ difficulty: 2, locale: 'en' }, { rng: seed() }); } catch (err) { ok(false, `${x.id} seed ${e}: threw ${err.message}`); continue; }
      pages++;
      const r = nodeCheck(x.id, out.bodyHtml, en, 'en');
      ok(r.findings.length === 0, `${x.id} seed ${e}: ${r.findings.slice(0, 4).join(' ; ')}`);
      if (r.col) r.col.forEach((n, i) => { pooled[i] = (pooled[i] || 0) + n; });
      if (r.slots) r.slots.forEach((s) => { pooled[s] = (pooled[s] || 0) + 1; });
      const outDe = TYPES[x.id]._buildWith(de, TYPES[x.id].difficulty[2], { locale: 'de' }, { rng: seed() });
      ok(sig(outDe.bodyHtml) === sig(out.bodyHtml), `${x.id} seed ${e}: the de page draws a different page than en (the seed must carry no locale)`);
    }
    const tot = Object.values(pooled).reduce((a, b) => a + b, 0);
    if (tot) {
      const share = Object.fromEntries(Object.entries(pooled).map(([k, v]) => [k, +(v / tot).toFixed(3)]));
      const cap = x.mode === 'real-or-not' ? 0.40 : 0.60;
      ok(Math.max(...Object.values(share)) <= cap, `${x.id}: pooled ${x.mode === 'real-or-not' ? 'column' : 'slot'} share over ${SEEDS} pages ${JSON.stringify(share)} > ${cap}`);
      console.log(`face sweep ${x.id} ${x.mode}: ${pages} pages clean-checked; pooled ${x.mode === 'real-or-not' ? 'true-figure column' : 'answer slot'} share ${JSON.stringify(share)}`);
    } else console.log(`face sweep ${x.id} ${x.mode}: ${pages} pages clean-checked`);
  }
  // C. renders
  const fi = syntheticBlock('fi');
  const renderFace = async (type, baseName, opts = {}) => {
    const out = await renderInstance({ type, theme: null, difficulty: 2, locale: opts.locale || 'en', page, outDir: OUT, baseName, strings: opts.strings });
    const m = await measureRender(page);
    return { verify: out.qa.verify, lints: out.qa.lints, m, png: out.pngPath, html: out.html };
  };
  const allFindings = (name, r, x) => [...r.verify.map((v) => `verify: ${v}`), ...r.lints.map((v) => `lint: ${v}`), ...renderFindings(name, r.m, x)];
  for (const x of FACES) {
    const runs = [
      ['own', TYPES[x.id], {}],
      ['one', TYPES[x.id], { strings: CHROME.one }],
      ['de722', TYPES[x.id], { strings: CHROME.de722 }],
      ['fi677', rewire(x.id, fi, null), { strings: CHROME.fi677, locale: 'fi' }],
    ];
    const line = [];
    for (const [tag, type, opts] of runs) {
      const r = await renderFace(type, `${x.id}-gate-${tag}`, opts);
      const f = allFindings(`${x.id} ${tag}`, r, x);
      for (const v of f) ok(false, v);
      if (opts.strings && opts.strings.body) ok(r.m.body.h <= opts.strings.body + 0.5, `${x.id} ${tag}: body ${Math.round(r.m.body.h)} > ${opts.strings.body} (the fixture did not squeeze)`);
      // the node checks on the RENDERED html too (the render is the shipped instance)
      const nc = nodeCheck(x.id, r.html, tag === 'fi677' ? fi : en, tag === 'fi677' ? 'fi' : 'en');
      for (const v of nc.findings) ok(false, `${x.id} ${tag} (node on the render): ${v}`);
      pngs.push(r.png);
      line.push(`${tag} body ${Math.round(r.m.body.h)} fill ${((r.m.contentBottom - r.m.body.t) / r.m.body.h * 100).toFixed(1)}% max band ${Math.round(Math.max(...r.m.bands.map((b) => b.px)))} ${f.length ? 'FINDINGS ' + f.length : 'clean'}`);
    }
    console.log(`face render ${x.id} ${x.mode}: ${line.join(' · ')}`);
  }

  // D. poisons
  const gateOf = async (type, name, opts = {}) => { const r = await renderFace(type, `K-368-face-poison-${name}`, opts); const id = opts.id; return [...allFindings(name, r, face(id)), ...nodeCheck(id, r.html, opts.block || en, opts.locale || 'en').findings.map((v) => 'node: ' + v)]; };
  const lensRe = /<div class="s2d-real" data-lcs-lens-slot="\d+" style="flex:0 0 auto"><div class="s2d-lens"[^>]*><svg[\s\S]*?<\/svg><\/div><\/div>/g;
  const mapLanes = (html, fn) => { const parts = html.split('data-lcs-row data-lcs-target="'); return parts[0] + parts.slice(1).map((p, i) => 'data-lcs-row data-lcs-target="' + fn(p, i)).join(''); };
  const mapCards = (html, fn) => { const parts = html.split('<section class="ws-card"'); return parts[0] + parts.slice(1).map((p, i) => '<section class="ws-card"' + fn(p, i)).join(''); };
  const lensSvg = (shape) => FS.flatShape({ ...shape, lens: 66 - shape.R - 3 }).svg;
  // PR2 — an F1 rectangle row containing a square
  judge('PR2 an F1 rectangle row containing a square', await gateOf(rewire('G1-381', en, (h) => mapLanes(h, (p) => (p.startsWith('rectangle"') ? p.replace(/<svg[\s\S]*?<\/svg>/, lensSvg({ kind: 'square', rot: 0, R: 50 })) : p))), 'PR2', { id: 'G1-381' }), /a square in the rectangle row/);
  // PR3F — swap two data-lcs-kind stamps on F1: the gate never reads them, so it stays GREEN
  judge('PR3F two F1 data-lcs-kind stamps swapped', await gateOf(rewire('G1-381', en, (h) => { const ks = [...h.matchAll(/data-lcs-kind="([^"]+)"/g)].map((m) => m[1]); let i = 0; const sw = [ks[1], ks[0], ...ks.slice(2)]; return h.replace(/data-lcs-kind="[^"]+"/g, () => `data-lcs-kind="${sw[i++]}"`); }), 'PR3F', { id: 'G1-381' }), null, true);
  // PR6 — F2 clock resolved through pictureFor to the 3D around the house/clock
  {
    const bad = fileUri('around the house', 'clock');
    let done = false;
    const t = rewire('K-371', en, (h) => mapCards(h, (p) => { if (done || attr(p, 'data-lcs-answer') !== 'circle') return p; done = true; return p.replace(/<img src="[^"]+"/, `<img src="${bad}"`); }));
    judge('PR6 F2 clock via pictureFor (around the house/clock)', await gateOf(t, 'PR6', { id: 'K-371' }), /src !== fileUri/);
  }
  // PR8 — an F1 near-miss gap at 0.10 (the primitive's own knob poisoned, then restored)
  {
    const saved = { ...FS.KNOBS };
    FS.KNOBS.gapMin = 0.10; FS.KNOBS.gapMax = 0.10; FS.KNOBS._allowShortGap = true;
    let svg;
    try { svg = FS.flatShape({ kind: 'triangle', sub: 'equilateral', variant: 'gap', vside: 0, R: 50, lens: 13 }).svg; } finally { Object.assign(FS.KNOBS, saved); delete FS.KNOBS._allowShortGap; }
    const t = rewire('G1-381', en, (h) => mapLanes(h, (p, i) => (i === 0 ? p.replace(/<svg[\s\S]*?<\/svg>/, svg) : p)));
    judge('PR8 an F1 near-miss gap at 0.10', await gateOf(t, 'PR8', { id: 'G1-381' }), /visible gap \d+(\.\d+)? px < 10/);
  }
  // PR9 — an F4 riddle forced to 4 lines
  {
    const long = 'I have four straight sides and four corners, and two of my sides are long while the other two sides are short, so what am I?';
    const t = rewire('G1-383', en, (h) => h.replace(/(<p data-lcs-riddle-text[^>]*>)[^<]*</, `$1${long}<`));
    judge('PR9 an F4 riddle forced to 4 lines', await gateOf(t, 'PR9', { id: 'G1-383' }), /bubble \d lines > 3/);
  }
  // PR10 — an F3 ruling row carrying a starter
  {
    const t = rewire('G1-382', en, (h) => h.replace(/(<div data-lcs-ruling-row="1"><svg[\s\S]*?)<\/svg>/, `$1<text data-lcs-starter="1" x="8" y="40" font-size="24" fill="${T.color.inkSoft}">square</text></svg>`));
    judge('PR10 an F3 ruling row with a starter', await gateOf(t, 'PR10', { id: 'G1-382' }), /ruling row not empty/);
  }
  // PR12 — an F5 rectangle card given (1,2): render (past the guard) and config (the guard)
  {
    const t = rewire('K-372', en, (h) => mapCards(h, (p) => (attr(p, 'data-lcs-dotcard') === 'rectangle' ? p.replace(/<div class="s2d-stage"[\s\S]*?<\/svg><\/div><\/div>/, C5.dotCard({ kind: 'rectangle', label: en.names.rectangle, given: [1, 1, 2, 3] })) : p)));
    judge('PR12 an F5 rectangle card given (1,2) (render)', await gateOf(t, 'PR12', { id: 'K-372' }), /square completion exists/);
    let msg = null;
    try { TYPES['K-372']._buildWith(en, { ...TYPES['K-372'].difficulty[2], given: [null, null, [1, 2], [1, 2]] }, { locale: 'en' }, { rng: makeRng('pr12g') }); } catch (e) { msg = e.message; }
    judge('PR12g an F5 rectangle card given (1,2) (config guard)', msg ? [msg] : [], /no start on the 6-lattice lets a rectangle/);
  }
  // SP1-SP5 — the slack moved BETWEEN blocks at the one-line chrome (814)
  const SP = [
    ['SP1 F1 name pill and figures pushed apart', 'G1-381', (h) => h.split('justify-content:space-evenly').join('justify-content:space-between')],
    ['SP2 F2 card content pinned to the top', 'K-371', (h) => h.split('class="s2d-stage" data-ws-content data-lcs-obj').join('class="s2d-stage" data-ws-content data-lcs-pin data-lcs-obj').replace(/data-lcs-pin([^>]*?)align-items:center;/g, 'data-lcs-pin$1align-items:flex-start;')],
    ['SP3 F3 lanes shrunk to their content', 'G1-382', (h) => h.split('padding:4px 12px;flex:1 1 0').join('padding:4px 12px;flex:0 0 auto')],
    ['SP4 F4 bubble no longer takes the slack', 'G1-383', (h) => h.split('position:relative;box-sizing:border-box;flex:1 1 auto').join('position:relative;box-sizing:border-box;flex:0 0 auto')],
    ['SP5 F5 lattice held at its minimum', 'K-372', (h) => h.split('position:relative;flex:1 1 0;min-height').join('position:relative;flex:0 0 auto;min-height')],
  ];
  // FL1 FL2 — FILL both ways: the content ending high at 814 (the F1 lanes shrunk to their content, the stage
  // top-anchored) and the content running past the body at 677 (F3 lanes held at 110 px under the 4-line fi title)
  judge('FL1 F1 content ends high (lanes shrunk, stage top-anchored)', await gateOf(rewire('G1-381', en, (h) => h.split('style="flex:1 1 0;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly').join('style="flex:0 0 auto;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly')), 'FL1', { id: 'G1-381', strings: CHROME.one }), /FILL — the content ends at \d+(\.\d+)? %/);
  judge('FL2 F3 content past the body at 677', await gateOf(rewire('G1-382', fi, (h) => h.split('padding:4px 12px;flex:1 1 0;min-height:0').join('padding:4px 12px;flex:0 0 110px;min-height:110px')), 'FL2', { id: 'G1-382', strings: CHROME.fi677, locale: 'fi', block: fi }), /FILL — the content runs \d+ px past the body/);
  for (const [name, id, fn] of SP) judge(name, await gateOf(rewire(id, en, fn), name.split(' ')[0], { id, strings: CHROME.one }), /SPARSE — a \d+ px blank band/);
  // OV1 OV4 — a block riding into its neighbour
  judge('OV1 F1 figures ride into the name pill', await gateOf(rewire('G1-381', en, (h) => h.split('class="s2d-realfigs" data-ws-content style="').join('class="s2d-realfigs" data-ws-content style="margin-top:-90px;')), 'OV1', { id: 'G1-381' }), /OVERLAP/);
  judge('OV4 F4 tags ride into the bubble', await gateOf(rewire('G1-383', en, (h) => h.split('<div class="s2d-tags" style="').join('<div class="s2d-tags" style="margin-top:-50px;')), 'OV4', { id: 'G1-383' }), /OVERLAP/);
  // AT1-AT4 — the per-page answer tells, on the SHIPPED instance's layout
  {
    const t1 = rewire('G1-381', en, (h) => mapLanes(h, (p) => {
      const target = p.slice(0, p.indexOf('"'));
      const lenses = [...p.matchAll(lensRe)].map((m) => m[0]);
      const truth = (l) => measureLens((/<svg[\s\S]*?<\/svg>/.exec(l) || [''])[0], classifySvg).kind === target;
      const order = [...lenses.filter(truth), ...lenses.filter((l) => !truth(l))];
      let i = 0; return p.replace(lensRe, () => order[i++]);
    }));
    judge('AT1 F1 every true figure first in its row', await gateOf(t1, 'AT1', { id: 'G1-381' }), /column spread/);
    const secRe = /<section class="ws-card"[\s\S]*?<\/section>/g;
    const t2 = rewire('K-371', en, (h) => {
      const cards = [...h.matchAll(secRe)].map((m) => m[0]);
      const circ = cards.filter((c) => attr(c, 'data-lcs-answer') === 'circle'), rect = cards.filter((c) => attr(c, 'data-lcs-answer') !== 'circle');
      const order = []; for (let i = 0; i < circ.length; i++) order.push(circ[i], rect[i]);   // 2 columns: every circle lands left
      let i = 0; return h.replace(secRe, () => order[i++]);
    });
    judge('AT2 F2 every circle in the left column', await gateOf(t2, 'AT2', { id: 'K-371' }), /column spread/);
    const t3 = rewire('G1-382', en, (h) => {
      const lanes = h.split('data-lcs-lane ').slice(1).map((ln) => classifySvg((/<svg[^>]*data-lcs-prim="flat-shape"[\s\S]*?<\/svg>/.exec(ln) || [''])[0]).kind);
      const first = []; for (const k of lanes) if (!first.includes(k)) first.push(k);
      const words = [...h.matchAll(/<span class="ws-bankword"[\s\S]*?<\/span><\/span>/g)].map((m) => m[0]);
      const byWord = (k) => words.find((w) => w.includes(`data-lcs-bank-word="${en.names[k]}"`));
      let i = 0; return h.replace(/<span class="ws-bankword"[\s\S]*?<\/span><\/span>/g, () => byWord(first[i++]));
    });
    judge('AT3 F3 the bank in the order the shapes appear', await gateOf(t3, 'AT3', { id: 'G1-382' }), /answer tell: the bank lists the names in the order/);
    const t4 = rewire('G1-383', en, (h) => mapCards(h, (p) => {
      const k = (attr(p, 'data-lcs-riddle') || '').split(':')[0];
      const tags = [...p.matchAll(/<span class="s2d-tag"[\s\S]*?<\/span><\/span>/g)].map((m) => m[0]);
      const order = [tags.find((x) => x.includes(`data-lcs-tag="${k}"`)), ...tags.filter((x) => !x.includes(`data-lcs-tag="${k}"`))];
      let i = 0; return p.replace(/<span class="s2d-tag"[\s\S]*?<\/span><\/span>/g, () => order[i++]);
    }));
    judge('AT4 F4 every answer in slot 1', await gateOf(t4, 'AT4', { id: 'G1-383' }), /slot spread/);
  }
  // AP1-AP5 — an instruction naming apparatus the face does not print (rule 6, en)
  const AP = [
    ['AP1 F1 instruction names a box', 'real-or-not', 'Circle every shape in the box that is the shape named above it.', /names "box", which is not on the real-or-not page/],
    ['AP2 F2 instruction names a line', 'around-us', 'Look at each picture and write the circle or the rectangle on the line.', /names "line", which is not on the around-us page/],
    ['AP3 F3 instruction names dots', 'write-name', 'Look at each shape and write its name on the line and in the box next to its dot.', /names "dot", which is not on the write-name page/],
    ['AP4 F4 instruction names a row', 'riddles', 'Read each riddle and circle the name in its row.', /names "row", which is not on the riddles page/],
    ['AP5 F5 instruction names a riddle', 'dot-draw', 'Read the riddle and join the dots to draw the shape.', /names "riddle", which is not on the dot-draw page/],
  ];
  for (const [name, mode, ins, re] of AP) { const b = JSON.parse(JSON.stringify(en)); b.strings[mode].instruction = ins; judge(name, validateBank(b, 'en'), re); }
  // controls: every untouched face at the poison chromes renders clean through the same collector
  for (const x of FACES) for (const [tag, strings] of [['ctl', undefined], ['ctl-one', CHROME.one]]) {
    const c = await gateOf(TYPES[x.id], `${x.id}-${tag}`, { id: x.id, strings });
    ok(c.length === 0, `face poison control ${x.id} ${tag}: ${JSON.stringify(c.slice(0, 3))}`);
  }
}

module.exports = { faceGate, FACES, measureLens, checkF1, checkF2, checkF3, checkF4, checkF5 };
