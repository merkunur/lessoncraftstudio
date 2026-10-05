#!/usr/bin/env node
/**
 * cbn-unpainted.js — find every UNPAINTED piece of every Color by Number answer key (operator 2026-10-05: "in almost all
 * worksheets there are parts of images which are not painted … find a very effective way to detect all the unpainted
 * parts"). It works on the RENDERED key, not on the colour lists, so it sees whatever the page shows:
 *   1. render the coloured key (lib/cbn-render.js toSvg 'colour') and find every connected paper-white area inside the
 *      picture that is bigger than a crumb;
 *   2. render every piece the segmenter found (numbered parts, mid and small pieces — data/cbn/lineart/<id>.json) in a
 *      unique id colour and read which piece each white area belongs to;
 *   3. allow only NATURAL whites: an eye white / shine (the piece borders a pupil — ink much thicker than an outline),
 *      a piece of a naturally white drawing (NATURAL_WHITE_SRC: clouds, snowmen…) and the per-design WHITE list
 *      (lineart-colours.js); everything else is a failure.
 * Writes a marked image per failing design ($TEMP/spl/unpainted/<id>.png, every flagged area circled red) and exits 1
 * when any design has an unpainted piece.
 *   node tools/cbn-unpainted.js [--only=id,id] [--quiet] [--poison]
 * --poison proves it can fail: it un-paints one coloured part of the first design and must flag it.
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const { DESIGNS, build, pieceColours } = require('../data/cbn/designs.js');
const R = require('../lib/cbn-render.js');
const { WHITE, WHITE_AT } = require('../data/cbn/lineart-colours.js');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;
const S = 2;                 // px per picture unit
const MIN_AREA = 12;         // picture units²: a white area smaller than this is an outline junction, not a piece
const EYE_THICK = 10;
const HIGHLIGHT_INK = 8;     // px: measured 2026-10-05 — pupils 9-13, outlines ~3.5 (junctions up to ~6.5): a highlight sits in a pupil-thick mass
// drawings that are white in nature (their pieces may stay white everywhere they appear)
const NATURAL_WHITE_SRC = new Set(['home and nature bw/cloud', 'Christmas bw/snowman', 'Christmas bw 2/snowman']);
const OUTDIR = path.join(process.env.TEMP || '/tmp', 'spl', 'unpainted');

const idRgb = (i) => { const n = i + 1; return [((n >> 8) & 15) * 16 + 8, ((n >> 4) & 15) * 16 + 8, (n & 15) * 16 + 8]; };
const idOf = (r, g, b) => ((r & 15) !== 8 || (g & 15) !== 8 || (b & 15) !== 8) ? -1 : ((r >> 4) << 8) + ((g >> 4) << 4) + (b >> 4) - 1;

async function raster(svg, W, H, bg = '#ffffff') { return (await sharp(Buffer.from(svg)).flatten({ background: bg }).raw().toBuffer()); }

async function check(d, poison) {
  const art = build(d, { noSmall: poison === 'small' });
  if (poison === 'part') { const k = art.items.findIndex((it) => it.kind === 'r' && it.colour && it.colour !== 'none' && !/^(sky|ground)$/.test(it.name)); art.items[k] = { ...art.items[k], colour: 'none' }; }
  const W = art.w * S, H = art.h * S;
  const key = await raster(R.toSvg(art, { mode: 'colour', width: W, height: H }), W, H);
  // every piece the segmenter found, in id colours (parts, then mid, then small)
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'cbn', 'lineart', d.id + '.json'), 'utf8'));
  const pieces = [...j.parts.map((p, i) => ({ ...p, kind: 'part', i })), ...(j.mid || []).map((p, i) => ({ ...p, kind: 'mid', i })), ...(j.small || []).map((p, i) => ({ ...p, kind: 'small', i }))];
  const idSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${art.w} ${art.h}" width="${W}" height="${H}" shape-rendering="crispEdges">` +
    pieces.map((p, i) => `<path d="${p.d}" fill="rgb(${idRgb(i).join(',')})" fill-rule="evenodd"/>`).join('') + '</svg>';
  const ids = await raster(idSvg, W, H, '#000000');
  // white components inside the picture (not touching the canvas edge: the page around a rounded frame)
  const white = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) if (key[i * 3] >= 248 && key[i * 3 + 1] >= 248 && key[i * 3 + 2] >= 248) white[i] = 1;
  const seen = new Uint8Array(W * H), q = new Int32Array(W * H), flags = [];
  // ink thickness: chamfer distance (x3) from each dark pixel to the nearest non-dark pixel
  const inkDT = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) inkDT[i] = key[i * 3] < 90 && key[i * 3 + 1] < 90 && key[i * 3 + 2] < 90 ? 1e9 : 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!inkDT[i]) continue; inkDT[i] = Math.min(inkDT[i], x ? inkDT[i - 1] + 3 : 3, y ? inkDT[i - W] + 3 : 3, x && y ? inkDT[i - W - 1] + 4 : 4, y && x < W - 1 ? inkDT[i - W + 1] + 4 : 4); }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; if (!inkDT[i]) continue; inkDT[i] = Math.min(inkDT[i], x < W - 1 ? inkDT[i + 1] + 3 : 3, y < H - 1 ? inkDT[i + W] + 3 : 3, x < W - 1 && y < H - 1 ? inkDT[i + W + 1] + 4 : 4, y < H - 1 && x ? inkDT[i + W - 1] + 4 : 4); }
  const whiteSet = new Set((WHITE[d.id] || []).map(String));
  const natural = { cs: require('../data/cbn/designs.js').partColours(d), white: pieceColours(d).white };
  for (let s = 0; s < W * H; s++) {
    if (!white[s] || seen[s]) continue;
    let h = 0, t = 0, edge = false; q[t++] = s; seen[s] = 1; const votes = new Map();
    while (h < t) {
      const i = q[h++]; const x = i % W, y = (i / W) | 0;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) edge = true;
      const id = idOf(ids[i * 3], ids[i * 3 + 1], ids[i * 3 + 2]); if (id >= 0) votes.set(id, (votes.get(id) || 0) + 1);
      for (const n of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) if (n >= 0 && white[n] && !seen[n]) { seen[n] = 1; q[t++] = n; }
    }
    const area = t / (S * S);
    if (edge || area < MIN_AREA) continue;
    // a confirmed natural-white sliver (lineart-colours.js WHITE_AT): the area contains its point
    if ((WHITE_AT[d.id] || []).some(([wx, wy]) => { for (let h2 = 0; h2 < t; h2++) { const i = q[h2]; if (Math.abs((i % W) / S - wx) <= 2 && Math.abs(((i / W) | 0) / S - wy) <= 2) return true; } return false; })) continue;
    let best = -1, bv = 0; for (const [k, v] of votes) if (v > bv) { bv = v; best = k; }
    // a HIGHLIGHT the artist drew inside the ink (an eye shine, a shine stripe on a black frame): no piece, and it sits in
    // ink far THICKER than an outline (a pupil, a solid frame) — part of the drawing, not an unpainted piece. Outline
    // ink is ~7 px wide here (half-width 3.5); a pupil's middle is much further from paper.
    if (best < 0) {
      let thickest = 0;
      for (let h2 = 0; h2 < t; h2 += 1) { const i = q[h2]; const x = i % W, y = (i / W) | 0;
        for (let r = 4; r <= 14; r += 2) for (const [ux, uy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [0.7, 0.7], [-0.7, 0.7], [0.7, -0.7], [-0.7, -0.7]]) { const X = Math.round(x + ux * r), Y = Math.round(y + uy * r); if (X < 0 || Y < 0 || X >= W || Y >= H) continue; const n = Y * W + X; if (inkDT[n] > thickest) thickest = inkDT[n]; } }
      if (process.env.CBN_DEBUG) console.log('  highlight?', d.id, Math.round(t / (S * S)), 'u2 ink thickness', (thickest / 3).toFixed(1));
      if (thickest / 3 >= HIGHLIGHT_INK) continue;
      // a sliver inside a NATURAL white (the root of a sheep's white ear, an eye in an ostrich's white face): every piece
      // around it within 12 px is a natural white
      const near = new Set();
      for (let h2 = 0; h2 < t; h2 += 2) { const i = q[h2]; const x = i % W, y = (i / W) | 0;
        for (let r = 4; r <= 12; r += 4) for (const [ux, uy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + ux * r, Y = y + uy * r; if (X < 0 || Y < 0 || X >= W || Y >= H) continue; const n = Y * W + X; const id = idOf(ids[n * 3], ids[n * 3 + 1], ids[n * 3 + 2]); if (id >= 0) near.add(id); } }
      const isNat = (pp) => (pp.kind === 'part' ? natural.cs[pp.i] === 'none' : natural.white[pp.kind][pp.i]) || (pp.src && NATURAL_WHITE_SRC.has(pp.src));
      if (near.size && [...near].every((id) => isNat(pieces[id]))) continue;
    }
    const p = best >= 0 ? pieces[best] : null;
    const cx = (q[(t / 2) | 0] % W) / S, cy = (((q[(t / 2) | 0]) / W) | 0) / S;
    // allowed natural whites
    if (p && p.hero && p.thick >= EYE_THICK) continue;
    if (p && p.src && NATURAL_WHITE_SRC.has(p.src)) continue;
    if (p && p.kind === 'part' && whiteSet.has(String(p.i))) continue;
    // a deliberate natural white: a part a colour list makes white ('none' — sheep wool, a penguin's belly), or a piece
    // that borders only such white (designs.js pieceColours .white)
    if (p && p.kind === 'part' && natural.cs[p.i] === 'none') continue;
    if (p && p.kind !== 'part' && natural.white[p.kind][p.i]) continue;
    flags.push({ area: Math.round(area), x: Math.round(p ? p.x : cx), y: Math.round(p ? p.y : cy),
      what: p ? `${p.kind} ${p.i} of ${p.fixed || (p.src ? p.src.split('/').pop() : 'background')}${p.hero ? ' (hero)' : ''} r${p.r}` : 'no piece (an outline gap)' });
  }
  // SPILL: a piece of a drawing painted with the scene's sky / ground colour that no other part of its own drawing has
  // (a paw pad turned grass-green) — the background leaked into the drawing
  const { partColours, pieceColours: pcs } = require('../data/cbn/designs.js');
  const { SMALL_RULE } = require('../data/cbn/lineart-colours.js');
  const cs = partColours(d), pc = pcs(d);
  if (poison === 'spill') {   // a piece of the character painted with the ground's colour (the paw-pad defect)
    const g = j.parts.findIndex((p) => p.fixed === 'ground'); const k = (j.small || []).findIndex((p, i) => p.hero && pc.small[i]);
    if (g >= 0 && k >= 0) pc.small[k] = { colour: cs[g], to: 'p' + g };
  }
  const bgCol = new Set(j.parts.map((p, i) => (p.fixed ? cs[i] : null)).filter(Boolean));
  const own = (item) => new Set(j.parts.map((p, i) => (!p.fixed && p.item === item ? cs[i] : null)).filter(Boolean));
  const spill = (p, c) => p.item != null && !(p.src && SMALL_RULE[p.src]) && c && bgCol.has(c) && !own(p.item).has(c);
  (j.mid || []).forEach((p, i) => { if (spill(p, pc.mid[i])) flags.push({ area: Math.round(p.area), x: Math.round(p.x), y: Math.round(p.y), what: `SPILL mid ${i} of ${p.src.split('/').pop()} painted ${pc.mid[i]} (the background)` }); });
  (j.small || []).forEach((p, i) => { const r = pc.small[i]; if (r && spill(p, r.colour)) flags.push({ area: Math.round(p.area), x: Math.round(p.x), y: Math.round(p.y), what: `SPILL small ${i} of ${p.src.split('/').pop()} painted ${r.colour} (the background)` }); });
  return { flags, key, W, H };
}

(async () => {
  fs.mkdirSync(OUTDIR, { recursive: true });
  if (process.argv.includes('--poison')) {
    // three poisons, each must be caught: a main part left white, every small piece left white, a spill
    let survived = 0;
    for (const [kind, d] of [['part', DESIGNS[0]], ['small', DESIGNS.find((x) => x.id === 'forest-fox')], ['spill', DESIGNS.find((x) => x.id === 'garden-cat')]]) {
      const r = await check(d, kind);
      const hit = kind === 'spill' ? r.flags.some((f) => f.what.startsWith('SPILL')) : r.flags.length > 0;
      console.log(hit ? `poison ${kind} killed in ${d.id} (${r.flags.length} flagged, e.g. ${r.flags[0].what})` : `POISON ${kind} SURVIVED in ${d.id}`);
      if (!hit) survived++;
    }
    process.exit(survived ? 1 : 0);
  }
  // a full run starts clean: a marked image left from an earlier run would report a design that is now fixed
  if (!only) for (const f of fs.readdirSync(OUTDIR)) if (f.endsWith('.png')) fs.unlinkSync(path.join(OUTDIR, f));
  let bad = 0, total = 0;
  const summary = [];
  for (const d of DESIGNS) {
    if (only && !only.has(d.id)) continue;
    const { flags, key, W, H } = await check(d);
    if (!flags.length) continue;
    bad++; total += flags.length;
    summary.push(`${d.id}\t${flags.length}\t${flags.map((f) => `${f.what} @${f.x},${f.y} ${f.area}u²`).join(' | ')}`);
    if (!process.argv.includes('--quiet')) console.log(`UNPAINTED ${d.id}: ${flags.length} — ${flags.slice(0, 6).map((f) => f.what + ' @' + f.x + ',' + f.y).join('; ')}`);
    const marks = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` + flags.map((f) => `<circle cx="${f.x * S}" cy="${f.y * S}" r="${Math.max(16, Math.sqrt(f.area) * S)}" fill="none" stroke="#E00" stroke-width="5"/>`).join('') + '</svg>';
    await sharp(key, { raw: { width: W, height: H, channels: 3 } }).composite([{ input: Buffer.from(marks) }]).png().toFile(path.join(OUTDIR, d.id + '.png'));
  }
  fs.writeFileSync(path.join(OUTDIR, '_summary.tsv'), summary.join('\n') + '\n');
  console.log(`${bad} designs with unpainted pieces, ${total} pieces · marked images + _summary.tsv → ${OUTDIR}`);
  process.exit(bad ? 1 : 0);
})();
