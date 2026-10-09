/**
 * fd-scene.js — Find the Differences: a LAYERED scene built from the image library's B&W line drawings
 * (nt2-G / b7, 2026-10-09). The scene specs are the Color by Number ones (data/cbn/lineart-scenes.js: a ground line,
 * props, a hero), but every drawing is composed and segmented ALONE (lib/cbn-lineart.js compose + segmentInk), so a
 * difference is a transform of ONE layer: remove it, mirror it, move it, enlarge it, swap it for another drawing,
 * add one more, erase one of its inner parts, or (colour pages) change one part's crayon. Layers are drawn back to
 * front with opaque fills, so a moved hero occludes what is behind it exactly as the composed scene did.
 *
 *   buildLayers(spec)                → { id, w:600, h:560, bg:{regions,ink}, items:[layer…] }   (async: sharp)
 *   layerFor(item, spec, idx)        → one layer (used by the tool for ADD / SWAP candidates)   (async)
 *   detailVariant(layer, regionIdx)  → the same layer with one inner part's outline erased, or null (async)
 *   renderPanel(scene, ops, opts)    → SVG string; opts { mode:'line'|'colour', width, frame:true, hotspots }
 *   applyOps(scene, ops)             → the right-hand layer list (pure; what renderPanel draws)
 *   OPS                              → the difference kinds
 *
 * Coordinates: picture units, 600 × 560 (2 canvas px per unit, L.UNIT). A region is { d, area, r, cx, cy, bbox,
 * colour }; an item layer is { idx, src, x, y, h, flip, hero, regions, ink, bbox }. Colours come from the Color by
 * Number plans (data/cbn/lineart-colours.js HERO by scene id / BG by drawing) by part rank, exactly as the painted
 * answer keys the operator reviewed; a small piece takes its big neighbour's crayon; a tiny one stays white.
 */
'use strict';
const L = require('./cbn-lineart.js');
const { PALETTE, INK } = require('./cbn-render.js');
const { BG, HERO } = require('../data/cbn/lineart-colours.js');

const W = 600, H = 560, U = L.UNIT;
const MIN_PART_R = 9;      // a part of the colour plan (lib/cbn-lineart-build.js MIN_PART_R)
const TINY_R = 3;          // below this a piece stays white (eye whites, shines)
const PROBE_PX = 26;       // px walked across an outline to find a small piece's big neighbour
const OPS = ['remove', 'mirror', 'move', 'scale', 'swap', 'add', 'detail', 'colour'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

/** regions of one segmentation that are NOT the paper, with colours by rank from `plan` (null plan = all white) */
function colourRegions(seg, plan) {
  const regs = seg.regions.filter((r) => !r.outside);
  const big = regs.filter((r) => r.r >= MIN_PART_R).sort((a, b) => b.area - a.area);
  const colourOf = new Map();
  big.forEach((r, k) => colourOf.set(r.label, plan && plan.length ? plan[Math.min(k, plan.length - 1)] : 'none'));
  // small pieces: the big part they border most (walk out of the piece across the ink), else white
  const bigLabels = new Set(big.map((r) => r.label));
  const lab = seg.lab, PW = seg.PW, PH = lab.length / PW;
  for (const r of regs) {
    if (bigLabels.has(r.label)) continue;
    if (r.r < TINY_R) { colourOf.set(r.label, 'none'); continue; }
    const [bx0, by0, bx1, by1] = r.bbox.map((v) => Math.round(v * U));
    const hits = new Map();
    for (let y = Math.max(0, by0); y <= Math.min(PH - 1, by1); y++) for (let x = Math.max(0, bx0); x <= Math.min(PW - 1, bx1); x++) {
      if (lab[y * PW + x] !== r.label) continue;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        for (let s = 2; s <= PROBE_PX; s += 2) {
          const X = x + dx * s, Y = y + dy * s; if (X < 0 || Y < 0 || X >= PW || Y >= PH) break;
          const b = lab[Y * PW + X];
          if (b && b !== r.label) { if (bigLabels.has(b)) hits.set(b, (hits.get(b) || 0) + 1); break; }
        }
      }
    }
    let best = null, bn = 0; for (const [k, v] of hits) if (v > bn) { bn = v; best = k; }
    colourOf.set(r.label, best ? colourOf.get(best) : (plan && plan.length ? plan[0] : 'none'));
  }
  return regs.map((r) => ({ d: r.d, area: Math.round(r.area), r: +r.r.toFixed(1), cx: +r.cx.toFixed(1), cy: +r.cy.toFixed(1), px: +r.px.toFixed(1), py: +r.py.toFixed(1), bbox: r.bbox.map((v) => +v.toFixed(1)), colour: colourOf.get(r.label) || 'none' }));
}

function bboxOfRegions(regions) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const r of regions) { x0 = Math.min(x0, r.bbox[0]); y0 = Math.min(y0, r.bbox[1]); x1 = Math.max(x1, r.bbox[2]); y1 = Math.max(y1, r.bbox[3]); }
  return [x0, y0, x1, y1].map((v) => +v.toFixed(1));
}

/** the ink bbox of a mask (canvas px → units) */
function inkBbox(ink, PW, PH) {
  let x0 = PW, y0 = PH, x1 = -1, y1 = -1;
  for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) if (ink[y * PW + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return x1 < 0 ? null : [x0 / U, y0 / U, (x1 + 1) / U, (y1 + 1) / U].map((v) => +v.toFixed(1));
}

/** one drawing composed alone at its scene placement → a layer */
async function layerFor(item, spec, idx, planOverride, sampler) {
  const ink = await L.compose({ stroke: spec.stroke || 7, items: [item] });
  const seg = L.segmentInk(ink, L.CW, L.CH, { unit: U });
  const hero = idx === spec.items.length - 1;
  const plan = planOverride !== undefined ? planOverride : (hero ? HERO[spec.id] : BG[item.src]) || null;
  let regions = colourRegions(seg, plan);
  if (sampler) regions = inheritColours(regions, sampler);
  const bb = inkBbox(ink, L.CW, L.CH);
  let inkPx = 0; for (let i = 0; i < ink.length; i++) inkPx += ink[i];
  // asymmetry of the SILHOUETTE: 1 − IoU(body, body mirrored about its own centre). A sun or a cloud mirrored reads as
  // the same drawing (asym ≈ 0); a cow or a barn does not. The builder refuses a mirror below ASYM_MIN.
  const body = L.silhouette(ink, L.CW, L.CH);
  let asym = 0;
  if (bb) {
    const x0 = Math.round(bb[0] * U), x1 = Math.round(bb[2] * U) - 1, y0 = Math.round(bb[1] * U), y1 = Math.round(bb[3] * U) - 1;
    let inter = 0, uni = 0;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const a = body[y * L.CW + x], b = body[y * L.CW + (x0 + x1 - x)]; if (a && b) inter++; if (a || b) uni++; }
    asym = uni ? +(1 - inter / uni).toFixed(3) : 0;
  }
  return { idx, src: item.src, x: item.x, y: item.y, h: item.h, flip: !!item.flip, hero, regions, ink: seg.ink, bbox: bb, inkUnits: Math.round(inkPx / (U * U)), asym, _mask: ink, _seg: seg, _cbn: sampler || null };
}

/** the ground lines alone → the sky / ground / named areas, coloured by the scene's fixed points */
async function backgroundFor(spec) {
  const ink = await L.compose({ stroke: spec.stroke || 7, lines: spec.lines || [], items: [] });
  const seg = L.segmentInk(ink, L.CW, L.CH, { unit: U });
  const at = (x, y) => seg.lab[Math.round(y * U) * seg.PW + Math.round(x * U)];
  const named = new Map();
  for (const f of spec.fixed || []) { const l = at(f.at[0], f.at[1]); if (l && !named.has(l)) named.set(l, f); }
  const sky = (spec.fixed || []).find((f) => f.name === 'sky'), ground = (spec.fixed || []).find((f) => f.name === 'ground');
  const regions = seg.regions.map((r) => {
    const f = named.get(r.label);
    const colour = f ? f.colour : (r.cy < (spec.hy || 0) ? (sky ? sky.colour : 'none') : (ground ? ground.colour : 'none'));
    return { d: r.d, area: Math.round(r.area), r: +r.r.toFixed(1), cx: +r.cx.toFixed(1), cy: +r.cy.toFixed(1), bbox: r.bbox.map((v) => +v.toFixed(1)), colour, name: f ? f.name : null };
  });
  return { regions, ink: seg.ink };
}

async function buildLayers(spec, opts = {}) {
  // colours are inherited from the reviewed Color by Number key of `spec.base` (or the spec's own id) — but only for a
  // drawing that stands in that key exactly as it stands here (same src, place, size); a prop added to a densified
  // scene would otherwise be painted with the sky or grass behind it
  const baseId = spec.base || spec.id;
  const sampler = opts.inherit === false ? null : await cbnSampler(baseId);
  let baseItems = null;
  if (sampler && spec.base) { try { const D = require('../data/cbn/designs.js'); const d = D.DESIGNS.find((x) => x.id === spec.base); baseItems = d ? d.items : null; } catch (e) { baseItems = null; } }
  const same = (a, b) => a.src === b.src && a.x === b.x && a.y === b.y && a.h === b.h && !!a.flip === !!b.flip && (a.sx || 1) === (b.sx || 1);
  const bg = await backgroundFor(spec);
  const items = [];
  for (let i = 0; i < spec.items.length; i++) {
    const it = spec.items[i];
    const inherit = sampler && (!spec.base || (baseItems && baseItems.some((b) => same(b, it))));
    const hero = i === spec.items.length - 1;
    const plan = hero ? HERO[baseId] || null : (BG[it.src] || (it.colour || null));
    items.push(await layerFor(it, { ...spec, id: baseId }, i, plan, inherit ? sampler : null));
  }
  return { id: spec.id, w: W, h: H, hy: spec.hy || 0, theme: spec.theme || null, bg, items, inherited: !!sampler };
}

/**
 * erase the outline of one inner part so it merges into its neighbour (a window, a spot, a stripe): the ink within
 * reach of the part that is not also the border of a THIRD region goes; the layer is re-segmented. null when the
 * erasure would not change the region count (the part was not closed by erasable ink).
 */
async function detailVariant(layer, regionIdx, spec) {
  const seg = layer._seg, mask = layer._mask;
  const regs = seg.regions.filter((r) => !r.outside);
  const target = regs[regionIdx]; if (!target) return null;
  const PW = seg.PW, PH = mask.length / PW;
  const reach = Math.round(((spec.stroke || 7) + 4) * U / 2 + 2);
  const [bx0, by0, bx1, by1] = target.bbox.map((v) => Math.round(v * U));
  const out = mask.slice();
  const outside = new Set(seg.regions.filter((r) => r.outside).map((r) => r.label));
  // an INNER part only: the ink round it separates it from the drawing's own parts, never from the paper. The erasable
  // ink is what lies between the target and exactly ONE other part (a window pane and the wall, a spot and the body);
  // ink that also borders a third part (a junction) stays, so the neighbours keep their own outlines.
  const erase = [];
  for (let y = Math.max(0, by0 - reach); y <= Math.min(PH - 1, by1 + reach); y++) for (let x = Math.max(0, bx0 - reach); x <= Math.min(PW - 1, bx1 + reach); x++) {
    const i = y * PW + x; if (!mask[i]) continue;
    let near = false, other = null, third = false;
    for (let dy = -reach; dy <= reach && !third; dy++) for (let dx = -reach; dx <= reach; dx++) {
      const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= PW || Y >= PH) continue;
      const l = seg.lab[Y * PW + X]; if (!l) continue;
      if (l === target.label) near = true; else if (other == null) other = l; else if (l !== other) { third = true; break; }
    }
    if (near && !third) { if (other != null && outside.has(other)) return null; erase.push(i); }
  }
  if (!erase.length) return null;
  for (const i of erase) out[i] = 0;
  const seg2 = L.segmentInk(out, PW, PH, { unit: U });
  const n2 = seg2.regions.filter((r) => !r.outside).length;
  if (n2 >= regs.length) return null;
  // the merge must not have opened the drawing to the paper (an outside region gained the target's pixels)
  const o1 = seg.regions.filter((r) => r.outside).reduce((a, r) => a + r.area, 0), o2 = seg2.regions.filter((r) => r.outside).reduce((a, r) => a + r.area, 0);
  if (o2 > o1 + 2) return null;
  const plan = layer.hero ? HERO[spec.id] : BG[layer.src];
  let regions = colourRegions(seg2, plan || null);
  if (layer._cbn) regions = inheritColours(regions, layer._cbn);
  return { ...layer, regions, ink: seg2.ink, bbox: inkBbox(out, PW, PH), _mask: out, _seg: seg2, variant: 'detail:' + regionIdx };
}

/* ---------------------------------------------------------------- colours inherited from the reviewed Color by Number key */
const HEX2NAME = Object.fromEntries(Object.entries(PALETTE).map(([k, v]) => [v.toUpperCase(), k]));
/**
 * The operator reviewed every Color by Number answer key piece by piece (lineart-colours.js PIECE / OVERRIDE / WHITE).
 * A layer region inherits the crayon painted at its deepest interior point on that key (rasterised once per scene at
 * 2 px per unit); a point that lands on ink or on an occluded area keeps the plan colour. Returns a sampler.
 */
async function cbnSampler(designId) {
  let art;
  try { const D = require('../data/cbn/designs.js'); const d = D.DESIGNS.find((x) => x.id === designId); if (!d) return null; art = D.build(d); } catch (e) { return null; }
  const { toSvg } = require('./cbn-render.js');
  const sharp = require('sharp');
  const svg = toSvg(art, { mode: 'colour', width: W * U });
  const { data, info } = await sharp(Buffer.from(svg)).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  return (x, y) => {
    const X = Math.round(x * U), Y = Math.round(y * U); if (X < 0 || Y < 0 || X >= info.width || Y >= info.height) return null;
    const i = (Y * info.width + X) * ch;
    const hex = '#' + [data[i], data[i + 1], data[i + 2]].map((v) => v.toString(16).padStart(2, '0').toUpperCase()).join('');
    return HEX2NAME[hex] || null;
  };
}
function inheritColours(regions, sample) {
  return regions.map((r) => { const c = sample(r.px, r.py); return c && c !== 'none' ? { ...r, colour: c } : (c === 'none' ? { ...r, colour: 'none' } : r); });
}

/** transform attribute of a layer under its ops (mirror about its own centre; scale about its bottom-centre) */
function transformOf(layer, op) {
  const [x0, y0, x1, y1] = layer.bbox; const cx = (x0 + x1) / 2;
  if (op.kind === 'mirror') return `translate(${(2 * cx).toFixed(2)} 0) scale(-1 1)`;
  if (op.kind === 'move') return `translate(${(op.dx || 0).toFixed(2)} ${(op.dy || 0).toFixed(2)})`;
  if (op.kind === 'scale') return `translate(${cx.toFixed(2)} ${y1.toFixed(2)}) scale(${op.s}) translate(${(-cx).toFixed(2)} ${(-y1).toFixed(2)})`;
  return '';
}

/** where a layer's ink box lands under a whole-drawing op (mirror / move / scale), in units */
function newBbox(layer, op) {
  const [x0, y0, x1, y1] = layer.bbox;
  if (op.kind === 'move') return [x0 + (op.dx || 0), y0 + (op.dy || 0), x1 + (op.dx || 0), y1 + (op.dy || 0)];
  if (op.kind === 'scale') { const cx = (x0 + x1) / 2, s = op.s; return [cx - (cx - x0) * s, y1 - (y1 - y0) * s, cx + (x1 - cx) * s, y1]; }
  return [x0, y0, x1, y1];
}

/** the right-hand layers: every op applied to a copy of the item list (pure) */
function applyOps(scene, ops) {
  let items = scene.items.map((l) => ({ ...l, tf: '', fills: null }));
  const seen = new Set();
  for (const op of ops) {
    if (op.kind !== 'add') { if (seen.has(op.item)) throw new Error(`fd-scene: two ops on item ${op.item} (one difference per drawing)`); seen.add(op.item); }
    if (op.kind === 'remove') items = items.filter((l) => l.idx !== op.item);
    else if (op.kind === 'add') items.push({ ...op.layer, tf: '', fills: null });
    else if (op.kind === 'swap') items = items.map((l) => (l.idx === op.item ? { ...op.layer, idx: l.idx, tf: '', fills: null } : l));
    else if (op.kind === 'detail') items = items.map((l) => (l.idx === op.item ? { ...op.layer, tf: l.tf, fills: null } : l));
    else if (op.kind === 'colour') items = items.map((l) => (l.idx === op.item ? { ...l, fills: { ...(l.fills || {}), [op.region]: op.colour } } : l));
    else if (op.kind === 'mirror' || op.kind === 'move' || op.kind === 'scale') items = items.map((l) => (l.idx === op.item ? { ...l, tf: (l.tf ? l.tf + ' ' : '') + transformOf(l, op) } : l));
    else throw new Error('fd-scene: unknown op ' + op.kind);
  }
  return items;
}

function layerSvg(l, mode, attrs) {
  const fill = (r, k) => (mode === 'colour' ? PALETTE[(l.fills && l.fills[k]) || r.colour] || '#FFFFFF' : '#FFFFFF');
  const seam = mode === 'colour';
  const paths = l.regions.map((r, k) => `<path d="${r.d}" fill="${fill(r, k)}" fill-rule="evenodd" stroke="${seam ? fill(r, k) : '#FFFFFF'}" stroke-width="3" stroke-linejoin="round"/>`).join('');
  return `<g${l.tf ? ` transform="${l.tf}"` : ''}${attrs || ''}>${paths}<path d="${l.ink}" fill="${INK}"/></g>`;
}

/**
 * one panel as SVG. opts.mode line|colour; opts.width (px); opts.frame (rounded ink frame); opts.rings = [bbox…] units
 * (answer key: coral ellipses); opts.hotspots = [{bbox, diff:bool, label}] units (screen: invisible tap targets stamped
 * as data attributes on <rect>s the runtime captures); opts.attrs on the root.
 */
function renderPanel(scene, ops, opts = {}) {
  const mode = opts.mode || 'line', width = opts.width || W, height = Math.round(width * H / W);
  const items = applyOps(scene, ops || []);
  const bgFill = (r) => (mode === 'colour' ? PALETTE[r.colour] || '#FFFFFF' : '#FFFFFF');
  const bg = scene.bg.regions.map((r) => `<path d="${r.d}" fill="${bgFill(r)}" stroke="${mode === 'colour' ? bgFill(r) : '#FFFFFF'}" stroke-width="3"/>`).join('') + `<path d="${scene.bg.ink}" fill="${INK}"/>`;
  const layers = items.map((l) => layerSvg(l, mode, ` data-lcs-fd-layer="${l.idx}"`)).join('');
  const rings = (opts.rings || []).map(([x0, y0, x1, y1]) => {
    const rx = (x1 - x0) / 2 + 14, ry = (y1 - y0) / 2 + 14;
    return `<ellipse cx="${((x0 + x1) / 2).toFixed(1)}" cy="${((y0 + y1) / 2).toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="#F2784B" stroke-width="7" data-lcs-fd-ring="1"/>`;
  }).join('');
  const hots = (opts.hotspots || []).map((h, i) => {
    const [x0, y0, x1, y1] = h.bbox;
    return `<rect x="${x0}" y="${y0}" width="${(x1 - x0).toFixed(1)}" height="${(y1 - y0).toFixed(1)}" fill="transparent" data-lcs-fd-hotspot="${i}"${h.diff ? ' data-lcs-fd-diff="1"' : ''} data-lcs-label="${esc(h.label || ('spot ' + (i + 1)))}"/>`;
  }).join('');
  const frame = opts.frame === false ? '' : `<rect x="3" y="3" width="${W - 6}" height="${H - 6}" rx="18" fill="none" stroke="${INK}" stroke-width="6"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${width}" height="${height}" data-lcs-prim="fd-panel"${opts.attrs || ''}>` +
    `<clipPath id="${opts.clipId || 'fdclip'}"><rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="15"/></clipPath>` +
    `<rect width="${W}" height="${H}" fill="#FFFFFF"/><g clip-path="url(#${opts.clipId || 'fdclip'})">${bg}${layers}${rings}</g>${frame}${hots}</svg>`;
}

/** inner parts of a layer that `detailVariant` may try: closed by the drawing's own lines, medium-sized */
function detailCandidates(layer, minR = 4, maxR = 22) {
  const seg = layer._seg, outside = new Set(seg.regions.filter((r) => r.outside).map((r) => r.label));
  const regs = seg.regions.filter((r) => !r.outside);
  const PW = seg.PW, PH = seg.lab.length / PW, K = 10;
  const out = [];
  regs.forEach((r, k) => {
    if (r.r < minR || r.r > maxR) return;
    // the part must not see the paper across its outline
    const [bx0, by0, bx1, by1] = r.bbox.map((v) => Math.round(v * U));
    for (let y = Math.max(0, by0 - K); y <= Math.min(PH - 1, by1 + K); y += 2) for (let x = Math.max(0, bx0 - K); x <= Math.min(PW - 1, bx1 + K); x += 2) {
      if (outside.has(seg.lab[y * PW + x])) return;
    }
    out.push(k);
  });
  return out;
}

module.exports = { buildLayers, layerFor, backgroundFor, detailVariant, detailCandidates, applyOps, renderPanel, transformOf, newBbox, cbnSampler, OPS, W, H, PALETTE };
