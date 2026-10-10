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
// Rec. 601 luma of the crayons (lib/cbn-render.js PALETTE): a colour change must survive a black-and-white printer
const LUMA = { red: 103, orange: 158, yellow: 203, lightgreen: 196, green: 134, lightblue: 200, blue: 127, purple: 128, pink: 182, brown: 118, grey: 173, black: 74, none: 255 };

const gap = (a, b) => Math.max(b[0] - a[2], a[0] - b[2], b[1] - a[3], a[1] - b[3]);   // negative = overlap
const quadrantOf = (b, W, H) => ((b[0] + b[2]) / 2 < W / 2 ? 0 : 1) + ((b[1] + b[3]) / 2 < H / 2 ? 0 : 2);
const inflate = (b, m, W, H) => [Math.max(6, b[0] - m), Math.max(6, b[1] - m), Math.min(W - 6, b[2] + m), Math.min(H - 6, b[3] + m)];

function lumaDelta(scene, c) {
  const l = scene.items.find((x) => x.idx === c.item); const r = l && l.regions[c.region];
  if (!r) return 999;
  return Math.abs((LUMA[r.colour] == null ? 255 : LUMA[r.colour]) - (LUMA[c.colour] == null ? 255 : LUMA[c.colour]));
}
function pickOps(scene, cfg, rng) {
  const W = scene.w, H = scene.h;
  const ppu = cfg.pxPerUnit || 0.53, minRing = (cfg.minRingPx || 14) / ppu, minSep = (cfg.minSepPx || 24) / ppu;
  const kinds = cfg.kinds ? new Set(cfg.kinds) : null;
  const boxArea = (b) => Math.max(1, (b[2] - b[0]) * (b[3] - b[1]));
  const pool = scene.cands.filter((c) => (cfg.mode === 'colour' || c.mode !== 'colour') && (!kinds || kinds.has(c.kind)) &&
    Math.min(c.bbox[2] - c.bbox[0], c.bbox[3] - c.bbox[1]) >= minRing &&
    // a drawing that jumped far changes two places; its change box must stay close to the drawing's own size
    !(c.kind === 'move' && c.diff && boxArea(c.diff) > 1.8 * boxArea(c.bbox)) &&
    // a nudge too small to see at this face's print scale (cfg.minMovePx, printed px) is not a difference
    !(c.kind === 'move' && cfg.minMovePx && Math.abs(c.dx || 0) * ppu < cfg.minMovePx) &&
    // a change too small in changed pixels (cfg.minArea, units²) — the K faces want BIG differences
    !(cfg.minArea && c.area < cfg.minArea) &&
    // a crayon change invisible on a black-and-white printer (cfg.minLumaDelta): compare the old and new crayons' luma
    !(c.kind === 'colour' && cfg.minLumaDelta && lumaDelta(scene, c) < cfg.minLumaDelta));
  // cfg.noSameKeySwap: a swap whose partner is the same vocab key (a flower for a flower of another species) is a change a
  // child cannot NAME; dropped from the pool on the word faces (K-395 FINAL §2, additive)
  const keyOf = (src) => String(src || '').split('/').pop().replace(/_\d+$/, '').toLowerCase();
  const pool2 = cfg.noSameKeySwap ? pool.filter((c) => !(c.kind === 'swap' && keyOf(c.src) === keyOf((scene.items.find((l) => l.idx === c.item) || {}).src))) : pool;
  if (pool2.length < cfg.n) throw new Error(`fd-compose: ${scene.id} has ${pool2.length} usable candidates for n=${cfg.n} (${cfg.mode}) — REFUSED`);
  const n = cfg.n;
  const heroIdx = (scene.items.find((l) => l.hero) || {}).idx;
  for (let t = 0; t < TRIES; t++) {
    const heroAllowed = cfg.heroProb == null ? true : rng.next() < cfg.heroProb;
    let order = rng.shuffle(pool2.slice());
    // cfg.itemFirst (the word faces): the walk meets every ITEM once before any item twice — a uniform shuffle of the
    // candidates lets a cloud with twelve ops change on every seed while a hero with three never does (sun / cloud 100 %
    // on the word pins, measured 2026-10-09). Round-robin over the items (an add keyed by its drawing), group order shuffled.
    if (cfg.itemFirst) {
      const groups = new Map();
      for (const c of order) { const k = c.item != null ? 'i' + c.item : 'a' + c.src; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(c); }
      const gs = rng.shuffle([...groups.values()]);
      order = []; for (let d = 0; gs.some((g) => g.length > d); d++) for (const g of gs) if (g[d]) order.push(g[d]);
    }
    // cfg.heroFront (0..1): on that share of tries ONE hero candidate is spliced to the FRONT, so the hero carries a difference
    // on roughly that share of pages where its geometry allows (the allow-gate alone cannot raise a hero that rarely fits)
    if (cfg.heroFront != null && heroIdx != null && heroAllowed && rng.next() < cfg.heroFront) { const hi = order.findIndex((c) => c.item === heroIdx); if (hi >= 0) { const [h] = order.splice(hi, 1); order.unshift(h); } }
    if (cfg.needColour) { const ci = order.findIndex((c) => c.kind === 'colour'); if (ci < 0) throw new Error(`fd-compose: ${scene.id} has no colour candidate — REFUSED`); const [c] = order.splice(ci, 1); order.unshift(c); }
    const chosen = [];
    for (const c of order) {
      if (chosen.length === n) break;
      // one op per drawing (cfg.maxPerItem 2 lets a BIG drawing carry two of different kinds, e.g. a crayon change and an
      // erased part, when their change boxes are separated — the ten-difference page)
      const onItem = chosen.filter((o) => o.item === c.item);
      if (onItem.length >= (cfg.maxPerItem || 1) || onItem.some((o) => o.kind === c.kind || o.kind === 'mirror' || o.kind === 'move' || o.kind === 'scale' || c.kind === 'mirror' || c.kind === 'move' || c.kind === 'scale')) continue;
      // variety: no kind more than a third of the page (five 'scale' ops is one dull idea repeated); cfg.noKindCap lifts it
      // (the remove-only face); cfg.distinctKinds demands every kind on the page to be different
      const sameKind = chosen.filter((o) => o.kind === c.kind).length;
      if (cfg.distinctKinds ? sameKind > 0 : !cfg.noKindCap && sameKind >= Math.max(2, Math.ceil(n / 3))) continue;
      // the hero: cfg.heroProb (0..1) decides per PAGE whether the hero may carry a difference (drawn once per try)
      if (heroIdx != null && c.item === heroIdx && !heroAllowed) continue;
      if (c.kind === 'add' && chosen.some((o) => o.kind === 'add' && o.src === c.src)) continue;
      // Level Set scenes (scene.set 'fdx'): a drawing removed in one place and the same drawing added in another reads as ONE
      // move counted twice (read 2026-10-10: a mouse gone left of the cat and new right of it)
      if (scene.set === 'fdx') {
        const srcOfC = (o) => (o.kind === 'add' ? o.src : (scene.items.find((l) => l.idx === o.item) || {}).src);
        // (generalised: a copy of a drawing never comes in while that drawing itself also changes — two frog changes on one page)
        if (c.kind === 'add' && chosen.some((o) => o.kind !== 'add' && srcOfC(o) === c.src)) continue;
        if (c.kind !== 'add' && chosen.some((o) => o.kind === 'add' && o.src === srcOfC(c))) continue;
        // ...and two drawings of one WORD never both come in (two different ice skates added beside a third)
        const wordOf = (x) => String(x || '').split('/').pop().replace(/_\d+$/, '').replace(/s$/, '');
        if (c.kind === 'add' && chosen.some((o) => o.kind === 'add' && wordOf(o.src) === wordOf(c.src))) continue;
        // ...nor through a swap (read 2026-10-10: a puzzle AND a telephone both turned into the same dice — two dice)
        const inWord = (o) => (o.kind === 'add' || o.kind === 'swap' ? wordOf(o.src) : null);
        if (inWord(c) && chosen.some((o) => inWord(o) === inWord(c))) continue;
        // a word face (cfg.distinctWords): every change names its OWN word (read 2026-10-10: two planets removed — three
        // changes but only two words to tick). The word of a change = the drawing it touches (and, for a swap, the one it
        // brings in); a vocab key, so 'planet' and 'planet_2' are one word
        if (cfg.distinctWords) {
          const keyOf = (src) => (src ? cfg.distinctWords(src) : null);
          const words = (o) => [keyOf(srcOfC(o)), o.kind === 'swap' ? keyOf(o.src) : null].filter(Boolean);
          const mine = words(c);
          if (chosen.some((o) => words(o).some((w) => mine.includes(w)))) continue;
        }
      }
      // separation is measured between the RINGS the child sees (change box + 10 units each side), never the change boxes
      if (chosen.some((o) => gap(inflate(o.diff || o.bbox, 10, W, H), inflate(c.diff || c.bbox, 10, W, H)) < minSep)) continue;
      chosen.push(c);
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
