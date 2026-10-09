/**
 * fd-compose.js — pick the differences of ONE Find-the-Differences page from a scene's gated candidates
 * (data/fd/<id>.json, tools/fd-build.js) under the page rules (nt2-G / b7, docs/worksheet-gen/b7-designs/_BUILD-BRIEF.md):
 *
 *   pickOps(scene, cfg, rng) → { ops, rings, hotspots, quadrants }
 *     cfg.n          how many differences (the count printed in the title IS this number)
 *     cfg.mode       'line' | 'colour' (colour candidates only on a colour page)
 *     cfg.kinds      allowed op kinds (array) or null = all
 *     cfg.needColour true: at least one crayon change (the colour face)
 *     cfg.pxPerUnit  the panel's printed scale (px per picture unit) — the floors below are in printed px
 *     cfg.minRingPx  smallest ring side (default 14) · cfg.minSepPx  gap between rings (default 24)
 *     cfg.spread     'quadrants' (default): with n ≥ 4 the rings cover ≥ 3 quadrants; with n ≤ 3 no two share one
 *     cfg.maxPerItem 1 (one difference per drawing; adds count as their own drawing)
 *   Rules: one op per drawing · rings never touch (gap ≥ minSepPx) · never on the frame (the builder guaranteed
 *   INSET) · the hero may carry at most one op · a scene that cannot satisfy the config THROWS (the face refuses it).
 *   Deterministic for a given rng (seeded per instance), with up to TRIES restarts over fresh shuffles.
 *
 *   hotspots: every ring (data-lcs-fd-diff) + a decoy for every UNCHANGED drawing (its bbox), the tap targets of the
 *   screen version; each ≥ 44 px on the screen is the type's job (it scales the panel).
 */
'use strict';
const TRIES = 60;

const gap = (a, b) => Math.max(b[0] - a[2], a[0] - b[2], b[1] - a[3], a[1] - b[3]);   // negative = overlap
const quadrantOf = (b, W, H) => ((b[0] + b[2]) / 2 < W / 2 ? 0 : 1) + ((b[1] + b[3]) / 2 < H / 2 ? 0 : 2);
const inflate = (b, m, W, H) => [Math.max(6, b[0] - m), Math.max(6, b[1] - m), Math.min(W - 6, b[2] + m), Math.min(H - 6, b[3] + m)];

function pickOps(scene, cfg, rng) {
  const W = scene.w, H = scene.h;
  const ppu = cfg.pxPerUnit || 0.53, minRing = (cfg.minRingPx || 14) / ppu, minSep = (cfg.minSepPx || 24) / ppu;
  const kinds = cfg.kinds ? new Set(cfg.kinds) : null;
  const boxArea = (b) => Math.max(1, (b[2] - b[0]) * (b[3] - b[1]));
  const pool = scene.cands.filter((c) => (cfg.mode === 'colour' || c.mode !== 'colour') && (!kinds || kinds.has(c.kind)) &&
    Math.min(c.bbox[2] - c.bbox[0], c.bbox[3] - c.bbox[1]) >= minRing &&
    // a drawing that jumped far changes two places; its change box must stay close to the drawing's own size
    !(c.kind === 'move' && c.diff && boxArea(c.diff) > 1.8 * boxArea(c.bbox)));
  if (pool.length < cfg.n) throw new Error(`fd-compose: ${scene.id} has ${pool.length} usable candidates for n=${cfg.n} (${cfg.mode}) — REFUSED`);
  const n = cfg.n;
  for (let t = 0; t < TRIES; t++) {
    let order = rng.shuffle(pool.slice());
    if (cfg.needColour) { const ci = order.findIndex((c) => c.kind === 'colour'); if (ci < 0) throw new Error(`fd-compose: ${scene.id} has no colour candidate — REFUSED`); const [c] = order.splice(ci, 1); order.unshift(c); }
    const chosen = [], used = new Set();
    for (const c of order) {
      if (chosen.length === n) break;
      if (used.has(c.item)) continue;
      // variety: no kind more than a third of the page (five 'scale' ops is one dull idea repeated)
      if (chosen.filter((o) => o.kind === c.kind).length >= Math.max(2, Math.ceil(n / 3))) continue;
      if (c.kind === 'add' && chosen.some((o) => o.kind === 'add' && o.src === c.src)) continue;
      if (chosen.some((o) => gap(o.diff || o.bbox, c.diff || c.bbox) < minSep)) continue;
      chosen.push(c); used.add(c.item);
    }
    if (chosen.length < n) continue;
    const qs = new Set(chosen.map((c) => quadrantOf(c.diff || c.bbox, W, H)));
    if ((cfg.spread || 'quadrants') === 'quadrants') {
      if (n >= 4 && qs.size < 3) continue;
      if (n <= 3 && qs.size < n) continue;
    }
    // the ring / tap target covers the whole CHANGE (a moved drawing changes pixels where it was and where it is)
    const rings = chosen.map((c) => inflate(c.diff || c.bbox, 10, W, H));
    const changedItems = new Set(chosen.map((c) => c.item));
    const decoys = scene.items.filter((l) => !changedItems.has(l.idx) && l.bbox && Math.min(l.bbox[2] - l.bbox[0], l.bbox[3] - l.bbox[1]) >= minRing)
      .map((l) => ({ bbox: inflate(l.bbox, 6, W, H), diff: false, item: l.idx, label: l.src.split('/')[1] }));
    const hotspots = chosen.map((c, i) => ({ bbox: rings[i], diff: true, item: c.item, label: c.kind + ' ' + (c.src || scene.items.find((l) => l.idx === c.item)?.src || '').split('/').pop() })).concat(decoys);
    return { ops: chosen, rings, hotspots, quadrants: [...qs] };
  }
  throw new Error(`fd-compose: ${scene.id} cannot place ${n} separated, spread differences (${cfg.mode}) — REFUSED`);
}

module.exports = { pickOps, gap, quadrantOf };
