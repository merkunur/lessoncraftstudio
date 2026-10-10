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

/** true when region `r` surrounds an ink blob on all four sides (an eye white round its pupil) — the only white a drawing keeps */
function enclosesInk(r, lab, PW, PH) {
  const [bx0, by0, bx1, by1] = r.bbox.map((v) => Math.round(v * U));
  for (let y = Math.max(0, by0); y <= Math.min(PH - 1, by1); y++) for (let x = Math.max(0, bx0); x <= Math.min(PW - 1, bx1); x++) {
    if (lab[y * PW + x]) continue;   // not ink
    let L = false, R = false, T = false, B = false;
    for (let X = x - 1; X >= bx0 && !L; X--) if (lab[y * PW + X] === r.label) L = true;
    for (let X = x + 1; X <= bx1 && X < PW && !R; X++) if (lab[y * PW + X] === r.label) R = true;
    for (let Y = y - 1; Y >= by0 && !T; Y--) if (lab[Y * PW + x] === r.label) T = true;
    for (let Y = y + 1; Y <= by1 && Y < PH && !B; Y++) if (lab[Y * PW + x] === r.label) B = true;
    if (L && R && T && B) return true;
  }
  return false;
}

/**
 * The UNPAINTED-CELL rule (operator, 2026-10-09: "the colorful find-the-differences images have unpainted spots"). The
 * colours come from the reviewed Color-by-Number key, which numbers only the BIG parts; the drawing's small cells (a
 * butterfly's wing cells, a hummingbird's feather stripes, a petal, a spot) carry no number and stay white there — on
 * the colour face a white cell inside a painted drawing reads as unpainted. Every small white cell takes the colour of
 * the painted part it borders (else the drawing's largest painted part); the only white a drawing keeps is an eye white
 * (a cell that encloses its pupil, `enclosesInk`). Clouds (a single big part planned 'none') stay white by plan.
 * `FD_KEEP_WHITE_CELLS=1` disables the rule — the family gate's poison, never a build setting.
 */
function paintSmallCells(regions, seg) {
  if (process.env.FD_KEEP_WHITE_CELLS === '1') return regions;
  const lab = seg.lab, PW = seg.PW, PH = lab.length / PW;
  const painted = new Map(regions.filter((r) => r.colour && r.colour !== 'none').map((r) => [r.label, r.colour]));
  if (!painted.size) return regions;
  const big = regions.filter((r) => painted.has(r.label) && r.r >= MIN_PART_R).sort((a, b) => b.area - a.area);
  const fallback = (big[0] || regions.filter((r) => painted.has(r.label)).sort((a, b) => b.area - a.area)[0]).colour;
  return regions.map((r) => {
    if (r.colour && r.colour !== 'none') return r;
    if (r.r >= MIN_PART_R) return r;                 // a big part planned white stays white (a cloud)
    if (enclosesInk(r, lab, PW, PH)) return r;         // an eye white round its pupil
    const [bx0, by0, bx1, by1] = r.bbox.map((v) => Math.round(v * U));
    const hits = new Map();
    for (let y = Math.max(0, by0); y <= Math.min(PH - 1, by1); y++) for (let x = Math.max(0, bx0); x <= Math.min(PW - 1, bx1); x++) {
      if (lab[y * PW + x] !== r.label) continue;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        for (let st = 2; st <= PROBE_PX; st += 2) {
          const X = x + dx * st, Y = y + dy * st; if (X < 0 || Y < 0 || X >= PW || Y >= PH) break;
          const b = lab[Y * PW + X];
          if (b && b !== r.label) { if (painted.has(b)) hits.set(b, (hits.get(b) || 0) + 1); break; }
        }
      }
    }
    let best = null, bn = 0; for (const [k, v] of hits) if (v > bn) { bn = v; best = k; }
    return { ...r, colour: best ? painted.get(best) : fallback };
  });
}

/** regions of one segmentation that are NOT the paper, with colours by rank from `plan` (null plan = all white) */
function colourRegions(seg, plan) {
  const regs = seg.regions.filter((r) => !r.outside);
  if (plan && plan.sample) {
    // a REFERENCE plan (Level Set scenes, 2026-10-10): the drawing was painted once, large, with its read plan; every part
    // of this copy — whatever its size — takes the crayon found at the same place of that painting
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const r of regs) { x0 = Math.min(x0, r.bbox[0]); y0 = Math.min(y0, r.bbox[1]); x1 = Math.max(x1, r.bbox[2]); y1 = Math.max(y1, r.bbox[3]); }
    const lab = seg.lab, PW = seg.PW, PH = lab.length / PW;
    return regs.map((r) => {
      let colour;
      // (no eye-white rule here: the reference painting already keeps its eye whites, and the rule whitened a small
      // copy's boots and shirt — any small cell holding a detail line 'encloses ink')
      {
        // the MAJORITY crayon over the part's own pixels (a small copy merges parts: a scarecrow's sleeve and its straw)
        const votes = new Map();
        const [bx0, by0, bx1, by1] = r.bbox.map((v) => Math.round(v * U));
        const step = Math.max(1, Math.round(Math.sqrt(Math.max(1, (bx1 - bx0) * (by1 - by0)) / 400)));
        for (let y = Math.max(0, by0); y <= Math.min(PH - 1, by1); y += step) for (let x = Math.max(0, bx0); x <= Math.min(PW - 1, bx1); x += step) {
          if (lab[y * PW + x] !== r.label) continue;
          const c = plan.sample((x / U - x0) / Math.max(1, x1 - x0), (y / U - y0) / Math.max(1, y1 - y0));
          if (c) votes.set(c, (votes.get(c) || 0) + 1);
        }
        let best = null, n = 0; for (const [c, v] of votes) if (v > n) { n = v; best = c; }
        colour = best || plan.sample((r.px - x0) / Math.max(1, x1 - x0), (r.py - y0) / Math.max(1, y1 - y0)) || plan.base || 'none';
      }
      return { label: r.label, d: r.d, area: Math.round(r.area), r: +r.r.toFixed(1), cx: +r.cx.toFixed(1), cy: +r.cy.toFixed(1), px: +r.px.toFixed(1), py: +r.py.toFixed(1), bbox: r.bbox.map((v) => +v.toFixed(1)), colour };
    });
  }
  const big = regs.filter((r) => r.r >= MIN_PART_R).sort((a, b) => b.area - a.area);
  const colourOf = new Map();
  const pinned = new Set();
  if (plan && plan.points) {
    // a POINT plan (Level Set scenes, data/fdx/catalog.js PLANS, 2026-10-10): each big part takes the colour of the
    // nearest named point, in coordinates normalised to the drawing's own box — the same at every size, where a rank
    // plan moved when a scene drew the drawing smaller and a part dropped under MIN_PART_R
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const r of regs) { x0 = Math.min(x0, r.bbox[0]); y0 = Math.min(y0, r.bbox[1]); x1 = Math.max(x1, r.bbox[2]); y1 = Math.max(y1, r.bbox[3]); }
    const bw = Math.max(1, x1 - x0), bh = Math.max(1, y1 - y0);
    for (const r of big) {
      const fx = (r.px - x0) / bw, fy = (r.py - y0) / bh;
      let best = plan.base || 'none', bd = Infinity;
      for (const [px, py, c] of plan.points) { const d = (px - fx) ** 2 + (py - fy) ** 2; if (d < bd) { bd = d; best = c; } }
      colourOf.set(r.label, best);
    }
    // a small cell near a named point (≤ 0.12 of the box) takes the nearest one too (a scarecrow's stick, its straw)
    const labP = seg.lab, PWp = seg.PW, PHp = labP.length / PWp;
    for (const r of regs) {
      if (colourOf.has(r.label)) continue;
      if (r.r < TINY_R + 3 && enclosesInk(r, labP, PWp, PHp)) continue;   // an eye white keeps its white
      const fx = (r.px - x0) / bw, fy = (r.py - y0) / bh;
      let bc = null, bd = 0.0144;   // within 0.12 of the box (used on the LARGE reference painting, where it was read)
      for (const [px, py, c] of plan.points) { const d = (px - fx) ** 2 + (py - fy) ** 2; if (d <= bd) { bd = d; bc = c; } }
      if (bc) { colourOf.set(r.label, bc); pinned.add(r.label); }
    }
    plan = [plan.base || 'none'];
  } else big.forEach((r, k) => colourOf.set(r.label, plan && plan.length ? plan[Math.min(k, plan.length - 1)] : 'none'));
  // small pieces: the big part they border most (walk out of the piece across the ink), else white
  const bigLabels = new Set(big.map((r) => r.label));
  const lab = seg.lab, PW = seg.PW, PH = lab.length / PW;
  for (const r of regs) {
    if (bigLabels.has(r.label) || pinned.has(r.label)) continue;
    // a tiny piece stays white ONLY when it is an eye white: a cell that ENCLOSES an ink blob (the pupil). Every other small
    // cell — a wing cell, a feather stripe, a petal cell, a spot — takes the colour of the part it borders: on the textured
    // library drawings those cells are most of the picture, and white cells read as UNPAINTED on the colour face
    // (operator, 2026-10-09: 'the colorful find-the-differences images have unpainted spots'). Shines are painted over.
    if (r.r < TINY_R && enclosesInk(r, lab, PW, PH)) { colourOf.set(r.label, 'none'); continue; }
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
  return regs.map((r) => ({ label: r.label, d: r.d, area: Math.round(r.area), r: +r.r.toFixed(1), cx: +r.cx.toFixed(1), cy: +r.cy.toFixed(1), px: +r.px.toFixed(1), py: +r.py.toFixed(1), bbox: r.bbox.map((v) => +v.toFixed(1)), colour: colourOf.get(r.label) || 'none' }));
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

/**
 * the REFERENCE painting of a drawing for a Level Set plan: the drawing alone at 440 units, painted with its read plan
 * (rank or point plan, the way it was checked on the colour sheets), reduced to a colour per pixel in the drawing's own
 * box. Cached per src + plan + flip. Returns { sample(fx, fy) → colour name, base }.
 */
const REF = new Map();
async function referenceFor(src, plan, flip) {
  const key = src + '|' + JSON.stringify(plan) + '|' + (flip ? 1 : 0);
  if (REF.has(key)) return REF.get(key);
  const item = { src, x: 300, y: 540, h: 440, maxW: 560, flip: !!flip };
  const ink = await L.compose({ stroke: 7, items: [item] });
  const seg = L.segmentInk(ink, L.CW, L.CH, { unit: U });
  let p = plan;
  if (p && p.points && flip) p = { ...p, points: p.points.map(([x, y, c]) => [1 - x, y, c]) };
  const regions = paintSmallCells(colourRegions(seg, p), seg);
  const col = new Map(regions.map((r) => [r.label, r.colour]));
  const bb = inkBbox(ink, L.CW, L.CH);
  const PW = seg.PW, PH = seg.lab.length / PW;
  const X0 = bb[0] * U, Y0 = bb[1] * U, BW = (bb[2] - bb[0]) * U, BH = (bb[3] - bb[1]) * U;
  const ref = {
    base: Array.isArray(plan) ? plan[0] : (plan && plan.base) || 'none',
    sample(fx, fy) {
      const cx = Math.round(X0 + fx * BW), cy = Math.round(Y0 + fy * BH);
      for (let rad = 0; rad <= 14; rad += 2) for (let dy = -rad; dy <= rad; dy += 2) for (let dx = -rad; dx <= rad; dx += 2) {
        if (rad && Math.abs(dx) !== rad && Math.abs(dy) !== rad) continue;
        const X = cx + dx, Y = cy + dy; if (X < 0 || Y < 0 || X >= PW || Y >= PH) continue;
        const l = seg.lab[Y * PW + X]; if (l && col.has(l)) return col.get(l);
      }
      return null;
    },
  };
  REF.set(key, ref);
  return ref;
}

/** one drawing composed alone at its scene placement → a layer */
async function layerFor(item, spec, idx, planOverride, sampler) {
  const ink = await L.compose({ stroke: spec.stroke || 7, items: [item] });
  const seg = L.segmentInk(ink, L.CW, L.CH, { unit: U });
  const hero = idx === spec.items.length - 1;
  let plan = planOverride !== undefined ? planOverride : (hero ? HERO[spec.id] : BG[item.src]) || null;
  // a Level Set drawing (spec.set 'fdx') samples its colours from its reference painting at every size
  if (spec.set === 'fdx' && plan && !plan.sample) plan = await referenceFor(item.src, plan, item.flip);
  // a point plan is authored on the unflipped drawing: a flipped drawing reads it mirrored
  else if (plan && plan.points && item.flip) plan = { ...plan, points: plan.points.map(([x, y, c]) => [1 - x, y, c]) };
  let regions = colourRegions(seg, plan);
  if (sampler) regions = inheritColours(regions, sampler);
  regions = paintSmallCells(regions, seg);
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
  return { idx, src: item.src, x: item.x, y: item.y, h: item.h, flip: !!item.flip, hero, regions, ink: seg.ink, bbox: bb, inkUnits: Math.round(inkPx / (U * U)), asym, _mask: ink, _seg: seg, _cbn: sampler || null, _plan: plan };
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
    // a Level Set scene's hero (data/fdx) has no Color by Number key: its catalogue plan rides on the item (it.colour)
    // a Level Set scene's drawings carry their own read plan (it.colour): the Color by Number BG plans were reviewed
    // together with per-piece overrides that do not exist here
    const plan = spec.set === 'fdx' ? (it.colour || null) : hero ? HERO[baseId] || it.colour || null : (BG[it.src] || (it.colour || null));
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
  // the layer's own plan when it carries one (a Level Set drawing has no Color by Number plan: HERO / BG are empty for it)
  // (Color by Number scenes keep exactly the lookup they always had, so their records rebuild byte-identically)
  const plan = spec.set === 'fdx' ? layer._plan : (layer.hero ? HERO[spec.id] : BG[layer.src]);
  let regions = colourRegions(seg2, plan || null);
  if (layer._cbn) regions = inheritColours(regions, layer._cbn);
  regions = paintSmallCells(regions, seg2);
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
    // colour: EVERY part of the drawing that wears the target part's crayon takes the new one (a frog's body AND its legs
    // turn purple together — a half-recoloured sprite read as broken, not as 'a frog of a new colour'; visual review 2026-10-09)
    else if (op.kind === 'colour') items = items.map((l) => { if (l.idx !== op.item) return l; const base = (l.regions[op.region] || {}).colour; const fills = { ...(l.fills || {}) };
      l.regions.forEach((r, k) => { if (k === op.region || (base && base !== 'none' && r.colour === base)) fills[k] = op.colour; }); return { ...l, fills }; });
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
  const mode = opts.mode || 'line';
  // opts.viewBox [x0, y0, w, h] (scene units) + frame 'window': a close-up crop (the picture-pairs face); default = the whole scene
  const vb = opts.viewBox || [0, 0, W, H];
  const width = opts.width || W, height = Math.round(width * vb[3] / vb[2]);
  const items = applyOps(scene, ops || []);
  const bgFill = (r) => (mode === 'colour' ? PALETTE[r.colour] || '#FFFFFF' : '#FFFFFF');
  const bg = scene.bg.regions.map((r) => `<path d="${r.d}" fill="${bgFill(r)}" stroke="${mode === 'colour' ? bgFill(r) : '#FFFFFF'}" stroke-width="3"/>`).join('') + `<path d="${scene.bg.ink}" fill="${INK}"/>`;
  const layers = items.map((l) => layerSvg(l, mode, ` data-lcs-fd-layer="${l.idx}"`)).join('');
  // opts.flip: the whole scene mirrored left-right (the mirror face); rings and hotspots are given in UNFLIPPED units and mirrored here
  const flip = !!opts.flip;
  const mx = (b) => (flip ? [W - b[2], b[1], W - b[0], b[3]] : b);
  const art = flip ? `<g transform="translate(${W} 0) scale(-1 1)">${bg}${layers}</g>` : bg + layers;
  const rings = (opts.rings || []).map((r0, i) => {
    const [x0, y0, x1, y1] = mx(r0);
    // the ring stays INSIDE the panel (8 units of margin): a change at the rim used to draw its ring half outside the frame,
    // clipped by it and unreadable as 'this empty spot' (visual review 2026-10-09) — the box is pulled in before the ellipse
    const M = 8, bx0 = Math.max(M, x0 - 14), by0 = Math.max(M, y0 - 14), bx1 = Math.min(W - M, x1 + 14), by1 = Math.min(H - M, y1 + 14);
    const rx = (bx1 - bx0) / 2, ry = (by1 - by0) / 2, cx = (bx0 + bx1) / 2, cy = (by0 + by1) / 2;
    // opts.ringHalo: a 13-unit white stroke under the 7-unit coral ellipse (the ring reads over black ink on a mono print)
    // every ring part carries data-lcs-fd-ring so the browser diff strips it (the halo and the index disc are not picture content)
    const halo = opts.ringHalo ? `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="#FFFFFF" stroke-width="13" data-lcs-fd-ring="halo"/>` : '';
    // opts.ringIndex: a coral disc with a white numeral at the ring's top-right (the key's ring numbers match the ledger)
    const idx = opts.ringIndex ? `<circle cx="${(cx + rx * 0.72).toFixed(1)}" cy="${(cy - ry * 0.72).toFixed(1)}" r="16" fill="#F2784B" data-lcs-fd-ring="index"/><text x="${(cx + rx * 0.72).toFixed(1)}" y="${(cy - ry * 0.72 + 7).toFixed(1)}" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="22" fill="#FFFFFF" data-lcs-fd-ring="index">${i + 1}</text>` : '';
    return halo + `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="#F2784B" stroke-width="7" data-lcs-fd-ring="1"/>` + idx;
  }).join('');
  const hots = (opts.hotspots || []).map((h, i) => {
    const [x0, y0, x1, y1] = mx(h.bbox);
    const meta = Object.entries(h.meta || {}).map(([k, v]) => ` ${k}="${esc(String(v))}"`).join('');
    return `<rect x="${x0}" y="${y0}" width="${(x1 - x0).toFixed(1)}" height="${(y1 - y0).toFixed(1)}" fill="transparent" data-lcs-fd-hotspot="${i}"${h.diff ? ' data-lcs-fd-diff="1"' : ''} data-lcs-label="${esc(h.label || ('spot ' + (i + 1)))}"${meta}/>`;
  }).join('');
  const clipId = opts.clipId || 'fdclip';
  let frame, clip;
  if (opts.frame === 'window') {
    frame = `<rect x="${vb[0] + 1.5}" y="${vb[1] + 1.5}" width="${vb[2] - 3}" height="${vb[3] - 3}" rx="10" fill="none" stroke="${INK}" stroke-width="3"/>`;
    clip = `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" rx="10"/>`;
  } else {
    frame = opts.frame === false ? '' : `<rect x="3" y="3" width="${W - 6}" height="${H - 6}" rx="18" fill="none" stroke="${INK}" stroke-width="6"/>`;
    clip = `<rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="15"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${width}" height="${height}" data-lcs-prim="fd-panel"${flip ? ' data-lcs-fd-flip="1"' : ''}${opts.attrs || ''}>` +
    `<clipPath id="${clipId}">${clip}</clipPath>` +
    `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="#FFFFFF"/><g clip-path="url(#${clipId})">${art}${rings}</g>${frame}${hots}</svg>`;
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

module.exports = { buildLayers, layerFor, backgroundFor, detailVariant, detailCandidates, applyOps, renderPanel, transformOf, newBbox, cbnSampler, paintSmallCells, enclosesInk, OPS, W, H, PALETTE, U, PROBE_PX };
