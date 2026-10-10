/**
 * K-395 — Find 5 Differences: Dog in the Garden (nt2-G / b7 flagship; `find-the-differences`, K; PDF + tap screen + key).
 *
 * The page (K-395 FINAL §2 "the Spotter's Ledger"): picture 1 over picture 2 with one left edge (look DOWN, not across),
 * a white index tab hanging off each picture's right frame edge, and beside picture 1 a cream ledger of N numbered tick
 * boxes. Picture 1 is the scene as the library drew it; picture 2 carries N gated ops from data/fd/<unit>.json `cands`,
 * picked by the seeded lib/fd-compose.js pickOps under the face's floor / separation / spread rules. The count in the
 * title IS ops.length; the key's rings and the screen's hotspots are those ops' boxes verbatim.
 *
 * One additive knob `mode` (FINAL §3): 'base' | 'three-big' | 'colour' | 'seven' | 'ten-pairs' | 'how-many' |
 * 'what-changed' | 'mirror-pair' | 'missing' | 'pairs' | 'write' — ten CODE faces on this one spec (rows in
 * tools/b7var-rows/find-the-differences.js); guards key on the resolved config, never on the level index.
 *
 * Interactive (tap-select over [data-lcs-fd-hotspot]): the SAME instance re-built with ctx.interactive (the screen: the
 * panels stacked at 675 px, every diff ring box padded to ≥ 89 units, decoys on unchanged drawings) and ctx.answerKey
 * (the print layout with haloed, numbered rings and a ticked ledger). The oracle re-composes the ops from the seed +
 * config carried in the hotspot meta — it never reads data-lcs-fd-diff.
 */
'use strict';
const { bank } = require('../../lib/b7-common.js');
const B = require('../../data/b7/find-the-differences.js');
const FD = require('../../lib/fd-scene.js');
const { pickOps, gap: boxGap } = require('../../lib/fd-compose.js');
const { makeRng } = require('../../lib/rng.js');
const C7 = require('../../templates/components-b7.js');
const { evalSource } = require('../../lib/fd-browser-diff.js');
const { vocab, displayWord } = require('../../lib/b2-common.js');
const { rulingBlock, wordBank } = require('../../templates/components-b2.js');

const W = FD.W, H = FD.H;   // 600 × 560 units
const PAGE_W = 675;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const PAD = B.SCREEN_PAD_UNITS;

/** the K-395 d1/d2/d3 ladder (FINAL §2); the faces re-point d2 with their own mode knobs */
const D = {
  // levels 1 and 3 (Level Set, 2026-10-10): the title says 5, so every level finds 5 — level 1 on a sparse scene with big
  // plain changes, level 3 on a dense scene with the subtle kinds and the G1 floor (level 2 is the published page, unchanged)
  1: { mode: 'base', count: 5, unit: 'garden-dog-rich', layout: 'stack', floor: 'K', kinds: ['remove', 'add', 'swap', 'scale'], minArea: 1800, heroProb: 0.5, minSepPx: 27, ledger: { box: 56 } },
  // heroFront 0.5 (measured 2026-10-09 on the REBUILT rich copy, 400 seeds): the dog changes on 47 % of pages (19 % with the allow-gate alone), quadrants 20/31/29/20
  2: { mode: 'base', count: 5, unit: 'garden-dog-rich', layout: 'stack', floor: 'K', kinds: ['remove', 'add', 'swap', 'mirror', 'scale', 'move'], heroProb: 0.5, heroFront: 0.5, minSepPx: 27, ledger: { box: 56 } },
  3: { mode: 'base', count: 5, unit: 'garden-dog-rich', layout: 'stack', floor: 'G1', kinds: B.LINE_ALL, heroProb: 0.5, minSepPx: 27, ledger: { box: 56 } },
};

function block(locale) { return bank('find-the-differences', String(locale || 'en').slice(0, 2)); }
const srcOfCand = (scene, c) => (c.kind === 'add' ? c.src : (scene.items.find((l) => l.idx === c.item) || {}).src);
const clampBox = (b) => [Math.max(6, b[0]), Math.max(6, b[1]), Math.min(W - 6, b[2]), Math.min(H - 6, b[3])];
/** a hotspot box padded to ≥ PAD × PAD units, kept inside the frame */
function padBox(b, pad = PAD) {
  let [x0, y0, x1, y1] = b;
  if (x1 - x0 < pad) { const c = (x0 + x1) / 2; x0 = c - pad / 2; x1 = c + pad / 2; }
  if (y1 - y0 < pad) { const c = (y0 + y1) / 2; y0 = c - pad / 2; y1 = c + pad / 2; }
  if (x0 < 6) { x1 += 6 - x0; x0 = 6; } if (y0 < 6) { y1 += 6 - y0; y0 = 6; }
  if (x1 > W - 6) { x0 -= x1 - (W - 6); x1 = W - 6; } if (y1 > H - 6) { y0 -= y1 - (H - 6); y1 = H - 6; }
  return [x0, y0, x1, y1].map((v) => +v.toFixed(1));
}
const area = (b) => Math.max(0, b[2] - b[0]) * Math.max(0, b[3] - b[1]);
const inter = (a, b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];
/** a decoy box clipped away from every diff hotspot; null when under 60 % of itself or under 80 units on a side */
function clipDecoy(box, diffs) {
  let b = box.slice(); const a0 = area(b);
  for (const d of diffs) {
    const x = inter(b, d); if (area(x) <= 0) continue;
    const cuts = [[b[0], b[1], d[0], b[3]], [d[2], b[1], b[2], b[3]], [b[0], b[1], b[2], d[1]], [b[0], d[3], b[2], b[3]]].filter((c) => c[2] > c[0] && c[3] > c[1]);
    if (!cuts.length) return null;
    b = cuts.sort((p, q) => area(q) - area(p))[0];
  }
  // the runtime scales the page CROP (~735 px wide) to the 360 viewport: a 44 px target there is ≥ 90 page px = 80 units;
  // measured by qa/verify-interactive.js on the first EN pool (decoys of 43 × 85 at 360 from an 80-unit floor)
  if (area(b) < 0.6 * a0 || Math.min(b[2] - b[0], b[3] - b[1]) < 84) return null;   // 84 units = 94 page px = 46 px at 360 (80 measured 43)
  return b.map((v) => +v.toFixed(1));
}

/**
 * The composition PLAN of a page: every panel's unit + config in compose order. build() and the oracle both run
 * `composeAll(plan, rng)` as the FIRST consumer of the rng, so the oracle's re-composition is the page's.
 */
/**
 * the close-up window of the picture-pairs face, in scene units. The Level Set scenes (data/fdx) draw their drawings
 * bigger than the Color by Number scenes, so their window shows 1.15 × as much of the scene — printed at the same size
 * (the panel's width is fixed, the viewBox scales). Published units keep the published window.
 */
const winOf = (d, unit) => { const w = d.window || [260, 200]; return /^fdx-/.test(String(unit || '')) ? [Math.round(w[0] * 1.15), Math.round(w[1] * 1.15)] : w; };
function planFor(d, mode, unitArg) {
  // a Level Set copy may ask for a COLOUR rendering of a line face: its unit carries '@c' (data/fdx scenes, 2026-10-10;
  // the half of the expansion that is painted). Published units never carry it, so their pages are unchanged.
  const isCol = (u) => /@c$/.test(String(u || ''));
  const strip = (u) => String(u).replace(/@c$/, '');
  const colourCopy = Array.isArray(unitArg) ? unitArg.some(isCol) : isCol(unitArg);
  if (colourCopy) unitArg = Array.isArray(unitArg) ? unitArg.map(strip) : strip(unitArg);
  const base0 = B.cfgFor(mode, d);
  const base = colourCopy ? { ...base0, mode: 'colour' } : base0;
  if (mode === 'seven' || mode === 'ten-pairs' || (mode === 'mirror-pair' && (Array.isArray(unitArg) || d.units))) {
    const units = Array.isArray(unitArg) ? unitArg : (d.units || B.UNITS[mode]);
    return { mode, panels: units.map((u, i) => ({ unit: u, cfg: { ...base, n: d.perPair[i] } })), excludeSrcs: !!d.excludeSrcs };
  }
  const unit = unitArg || d.unit || B.UNITS[mode];
  if (mode === 'how-many') return { mode, panels: [{ unit, cfg: base }], countRange: d.countRange };
  if (mode === 'pairs') return { mode, panels: [{ unit, cfg: base }], window: winOf(d, unit) };
  return { mode, panels: [{ unit, cfg: base }] };
}
/**
 * compose + (picture-pairs) place the close-up windows: when the windows cannot be placed the composition is drawn again
 * on the same rng, up to 30 times (Level Set scenes, 2026-10-10: their bigger drawings rarely let the first three changes
 * all fit a window). A page whose first composition fits — every published page — consumes the rng exactly as before.
 * build() and the oracle both call this, so the oracle's replay is the page.
 */
function composeWithWindows(plan, rng) {
  if (!plan.window) return { comp: composeAll(plan, rng), wins: null };
  let err;
  for (let k = 0; k < 30; k++) {
    const comp = composeAll(plan, rng);
    try { return { comp, wins: placeWindows(comp.panels[0], plan.window, rng) }; } catch (e) { err = e; if (!/pairs/.test(e.message)) throw e; }
  }
  throw err;
}
function composeAll(plan, rng) {
  const out = [];
  const used = new Set();
  let count = 0;
  if (plan.countRange) { const n = rng.int(plan.countRange[0], plan.countRange[1]); plan = { ...plan, panels: plan.panels.map((p) => ({ ...p, cfg: { ...p.cfg, n } })) }; }
  for (const p of plan.panels) {
    const rec = B.review();
    if (rec.REFUSED && rec.REFUSED[p.unit]) throw new Error(`K-395: scene ${p.unit} is REFUSED (${rec.REFUSED[p.unit]})`);
    let scene = B.loadScene(p.unit);
    const refusedOps = new Set((rec.REFUSED_OPS || {})[p.unit] || []);
    let cands = scene.cands.filter((c, i) => !refusedOps.has(i));
    if (plan.excludeSrcs && used.size) cands = cands.filter((c) => !used.has(srcOfCand(scene, c)));
    if (B.WORD_MODES.includes(plan.mode)) {
      // the word faces: (1) an add / swap never brings in a key (or a key's family) the picture already holds — a second
      // tulip makes 'the tulip is new' name two things; (2) the GENERIC member of a family with two members in the picture
      // (the 'flower' beside a tulip, the 'bird' beside a hummingbird) is never changed and (wordsFor) never listed — a
      // child who ticks 'flower' for a changed tulip is right by their own reading (the es + pt panels, 2026-10-09)
      const keyOf = (idx) => { const l = scene.items.find((x) => x.idx === idx); return l ? B.vocabKeyOf(l.src) : null; };
      const fams = new Set(scene.items.map((l) => B.wordFamilyFor(B.vocabKeyOf(l.src), p.unit)));
      const clash = B.clashKeysFor(scene.items.map((l) => B.vocabKeyOf(l.src)), p.unit);
      const cnt = {}; for (const l of scene.items) { const k = B.vocabKeyOf(l.src); cnt[k] = (cnt[k] || 0) + 1; }
      // a Level Set scene (data/fdx): a drawing whose library word misnames it (catalogue 'noword': a porcupine that reads as a
      // hedgehog, a rubber duck) is never changed or brought in on a word face
      let NOWORD = new Set();
      if (/^fdx-/.test(p.unit)) { const { CATALOG } = require('../../data/fdx/catalog.js'); NOWORD = new Set([...CATALOG.values()].filter((x) => x.noword).map((x) => x.src)); }
      cands = cands.filter((c) => {
        if (NOWORD.size && (NOWORD.has(srcOfCand(scene, c)) || (c.src && NOWORD.has(c.src)))) return false;
        // a key drawn twice (two chicks, two clouds) may only be REMOVED: 'the bird is flipped' would name two drawings
        if (c.item != null && cnt[keyOf(c.item)] >= 2 && c.kind !== 'remove') return false;
        if ((c.kind === 'add' || c.kind === 'swap') && c.src && fams.has(B.wordFamilyFor(B.vocabKeyOf(c.src), p.unit))) return false;
        if (c.item != null && clash.has(keyOf(c.item))) return false;
        return true;
      });
    }
    // the picture-pairs face: a change must fit its close-up window with ≥ 12 units of air on every side (the ring box = change box + 10)
    // (measured: every scene refused until the EDGE rule was added — a change touching the scene's rim can never keep its air inside a window that must itself sit 8 units inside the frame)
    if (plan.window) cands = cands.filter((c) => { const b = c.diff || c.bbox; return b[2] - b[0] + 20 <= plan.window[0] - 24 && b[3] - b[1] + 20 <= plan.window[1] - 24 && b[0] - 10 >= 20 && b[1] - 10 >= 20 && b[2] + 10 <= W - 20 && b[3] + 10 <= H - 20; });
    scene = { ...scene, cands };
    // a secret-count face (countRange): when the drawn count cannot be placed on this scene the count steps DOWN to
    // the range floor — the page shows exactly what it holds and the child counts it (garden-bird-rich placed 6 on
    // 399/400 seeds; the oracle replays the same loop, so the two agree)
    let r;
    if (plan.countRange) {
      let n = p.cfg.n, err;
      for (; n >= plan.countRange[0]; n--) { try { r = pickOps(scene, { ...p.cfg, n }, rng); break; } catch (e) { err = e; } }
      if (!r) throw err;
    } else {
      const cfg = (B.WORD_MODES.includes(plan.mode) && /^fdx-/.test(String(p.unit))) ? { ...p.cfg, distinctWords: (src) => B.vocabKeyOf(src) } : p.cfg;   // (a Level Set word face: one word per change)
      // a Level Set scene whose first composition is refused retries on its own seed stream (read 2026-10-10: a copy that
      // composed on the allocator's seeds failed on its own); the published scenes never reach this branch
      try { r = pickOps(scene, cfg, rng); } catch (e) {
        if (!/^fdx-/.test(String(p.unit))) throw e;
        for (let k = 1; k <= 8 && !r; k++) { try { r = pickOps(scene, cfg, makeRng('fdx-retry|' + p.unit + '|' + rng.int(0, 1e9) + '|' + k)); } catch (e2) { if (k === 8) throw e2; } }
      }
    }
    r.ops.forEach((c) => used.add(srcOfCand(scene, c)));
    count += r.ops.length;
    out.push({ unit: p.unit, scene, cfg: p.cfg, ops: r.ops, rings: r.rings, hotspots: r.hotspots, quadrants: r.quadrants });
  }
  return { panels: out, count };
}

/** the picture-pairs windows: one per op, the diff centre in a seeded 3×3 cell (never the centre every time), ≥ 12 units of air */
function placeWindows(panel, win, rng) {
  const [ww, wh] = win;
  const items = panel.scene.items;
  const tries = 80;
  for (let t = 0; t < tries; t++) {
    const wins = [];
    let ok = true;
    for (let i = 0; i < panel.ops.length; i++) {
      const r = panel.rings[i];
      const cw = r[2] - r[0], ch = r[3] - r[1];
      if (cw > ww - 24 || ch > wh - 24) { ok = false; break; }
      // the window's origin must keep ≥ 12 units of air around the ring AND sit 8 units inside the frame: the valid range
      // [lo, hi] per axis; the seeded 3×3 cell picks a point INSIDE that range (a random cell on a big ring landed it
      // on the window's edge 164 times in 200: measured before this lerp)
      const cell = rng.int(0, 8), fx = [1 / 6, 1 / 2, 5 / 6][cell % 3], fy = [1 / 6, 1 / 2, 5 / 6][Math.floor(cell / 3)];
      const xlo = Math.max(8, r[2] + 12 - ww), xhi = Math.min(W - 8 - ww, r[0] - 12);
      const ylo = Math.max(8, r[3] + 12 - wh), yhi = Math.min(H - 8 - wh, r[1] - 12);
      if (xlo > xhi || ylo > yhi) { ok = false; break; }
      // fx = 5/6 puts the ring at the window's LEFT (the window starts far right); the cell is the ring's position in the window
      const x0 = Math.round(xlo + (xhi - xlo) * (1 - fx)), y0 = Math.round(ylo + (yhi - ylo) * (1 - fy));
      const box = [x0, y0, x0 + ww, y0 + wh];
      // windows pairwise overlap < 25 %
      if (wins.some((o) => area(inter(o.box, box)) > 0.25 * ww * wh)) { ok = false; break; }
      // ≥ 1 UNCHANGED drawing with ≥ 60 % of its bbox inside (the row's decoy)
      const changed = new Set(panel.ops.map((c) => c.item));
      // (a Level Set scene's drawings are bigger: 40 % of one inside the window is a drawing the child can see and tap)
      const share = /^fdx-/.test(String(panel.unit)) ? 0.5 : 0.6;
      const decoys = items.filter((l) => !changed.has(l.idx) && area(inter(l.bbox, box)) >= share * area(l.bbox)).map((l) => l.idx);
      // (a Level Set close-up shows a little scene: at least TWO other drawings — a window of empty sky round one sun read as nothing)
      if (decoys.length < (/^fdx-/.test(String(panel.unit)) ? 2 : 1)) { ok = false; break; }
      wins.push({ box, cell, decoys, op: i });
    }
    if (ok) return wins;
  }
  throw new Error(`K-395 pairs: ${panel.unit} cannot place ${panel.ops.length} windows (${win.join('x')}) with air, a decoy and < 25 % overlap — REFUSED`);
}

/** the screen hotspots of one panel: diffs padded, decoys clipped; meta carried for the oracle */
function screenHotspots(panel, pIdx, meta, window) {
  const diffs = panel.rings.map((r) => clampBox(padBox(r)));
  const hots = diffs.map((b, i) => ({ bbox: b, diff: true, item: panel.ops[i].item, label: panel.hotspots[i].label, meta: { ...meta, 'data-lcs-fd-layer': panel.ops[i].item, 'data-lcs-fd-box': b.join(','), 'data-lcs-fd-panel': pIdx } }));
  const changed = new Set(panel.ops.map((c) => c.item));
  for (const l of panel.scene.items) {
    if (changed.has(l.idx)) continue;
    let b = padBox([l.bbox[0] - 6, l.bbox[1] - 6, l.bbox[2] + 6, l.bbox[3] + 6]);
    if (window) { b = inter(b, window); if (area(b) <= 0) continue; }
    b = clipDecoy(b, diffs.concat(hots.filter((h) => !h.diff).map((h) => h.bbox)));
    if (!b) continue;
    hots.push({ bbox: b, diff: false, item: l.idx, label: l.src.split('/').pop(), meta: { ...meta, 'data-lcs-fd-layer': l.idx, 'data-lcs-fd-box': b.join(','), 'data-lcs-fd-panel': pIdx } });
  }
  if (window) return hots.filter((h) => area(inter(h.bbox, window)) >= (/^fdx-/.test(String(panel.unit)) ? 0.4 : 0.6) * area(h.bbox)).map((h) => ({ ...h, bbox: inter(h.bbox, window) }));
  return hots;
}

function root(d, mode, units, count, inner, extra = '') {
  return `<div data-ws-content class="fd-page" data-lcs-fd-count="${count}" data-lcs-fd-mode="${mode}" data-lcs-fd-unit="${esc(units.join('|'))}" data-lcs-fd-layout="${d.layout || 'stack'}" ${extra} style="width:${PAGE_W}px;display:flex;flex-direction:column;align-items:center;flex:0 0 auto">${inner}</div>`;
}
// opts.opsList: the exact ops to apply (a picture-pairs window shows ONE row's change; the other rows' drawings stay as drawn)
const panelSvg = (p, opts) => FD.renderPanel(p.scene, opts.opsList || (opts.ops ? p.ops : []), { mode: p.cfg.mode === 'colour' ? 'colour' : 'line', ...opts });

module.exports = {
  id: 'K-395',
  slug: 'find-the-differences',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'find-the-differences',
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: () => [...new Set([].concat(...Object.values(B.UNITS).map((u) => (Array.isArray(u) ? [u.join('|'), ...u] : [u]))))],   // the pair faces' unit is 'a|b'
    exemplar: (loc, spec) => { const d = spec && spec.difficulty && spec.difficulty[2]; const u = d && (d.unit || (d.units && d.units[0])); return u || B.UNITS.base; },
    tokens: (unit, loc) => { const name = B.sceneName(String(unit).split('|')[0].replace(/@c$/, ''), String(loc || 'en').slice(0, 2)); return { U: name, L: name, UNIT: name }; },
  },
  difficulty: D,
  i18n: { en: { title: B.FIND_THE_DIFFERENCES.en.strings.base.title, instruction: B.FIND_THE_DIFFERENCES.en.strings.base.instruction } },
  levelSetWords: (m) => [m.unit, m.mode],
  /**
   * Level Set copies (data/fdx scenes, 2026-10-10): the seven / ten-pairs titles of the published pages name the POND and
   * the GARDEN; a copy names the setting its two scenes share instead ("Find 7 Differences: On the Farm"). Published units
   * never start with 'fdx-', so the published strings come back untouched.
   */
  copyStrings(s0, ctx) {
    const unit = String((ctx && ctx.unit) || '');
    if (!/^fdx-/.test(unit)) return s0;
    const mode = ((this && this.difficulty && this.difficulty[2]) || {}).mode;
    if (mode !== 'seven' && mode !== 'ten-pairs') return s0;
    const loc = String((ctx && ctx.locale) || 'en').slice(0, 2);
    const first = unit.split('|')[0].replace(/@c$/, '');
    const sc = require('../../data/fdx/scenes.js').SCENES.find((x) => x.id === first);
    const name = sc && require('../../data/fdx/names-i18n.js').SETTINGS[sc.setting][loc];
    const tpl = (B.LS_PAIR_TITLES[mode] || {})[loc];
    if (!name || !tpl) throw new Error(`K-395: no Level Set title for ${mode} / ${first} in ${loc}`);
    const title = tpl.replace('{UNIT}', name);
    return { ...s0, title, ...(s0.printTitle ? { printTitle: title } : {}) };
  },
  interactive: {
    kind: 'tap-select', item: '[data-lcs-fd-hotspot]', answerAttr: 'data-lcs-fd-diff', labelAttr: 'data-lcs-label',
    metaAttrs: ['data-lcs-fd-hotspot', 'data-lcs-fd-layer', 'data-lcs-fd-box', 'data-lcs-fd-panel', 'data-lcs-fd-seed', 'data-lcs-fd-plan', 'data-lcs-fd-count', 'data-lcs-fd-word'],
    instructionKey: (difficulty, spec) => B.TAP_KEY[(((spec && spec.difficulty && spec.difficulty[difficulty]) || {}).mode) || 'base'],   // per face (cli.js passes the spec)
    screenHeight: 3200,
    oracle: fdOracle,
  },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = String(locale || 'en').slice(0, 2);
    const blk = block(loc);
    const mode = d.mode || 'base';
    if (!B.MODES.includes(mode)) throw new Error(`K-395: unknown mode "${mode}"`);
    const rng = ctx.rng;
    const seed = rng.seed;
    const unitArg = unit ? (String(unit).includes('|') ? String(unit).split('|') : unit) : null;
    const plan = planFor(d, mode, unitArg);
    const { comp, wins: pairWins } = composeWithWindows(plan, rng);   // the FIRST rng use: the oracle replays it
    const units = comp.panels.map((p) => p.unit);
    const count = comp.count;
    const screen = !!(ctx && ctx.interactive), key = !!(ctx && ctx.answerKey);
    const meta = { mode, unit: units.join('|'), count, ops: comp.panels.map((p) => p.ops.map((c) => c.kind + ':' + c.item + (c.src ? ':' + c.src : '')).join(',')).join(';') };
    const planMeta = { 'data-lcs-fd-seed': seed, 'data-lcs-fd-plan': JSON.stringify(plan) };
    const layout = d.layout || 'stack';
    let wins = null;
    if (mode === 'pairs') { wins = pairWins; meta.cells = wins.map((w) => w.cell).join(''); }
    const ppu = comp.panels[0].cfg.pxPerUnit;
    // the stack fills the body: 2 × 358 + 12 = 728 of the 733 px the tallest shipped chrome leaves (operator 2026-10-10: 'a big
    // blank area at the bottom'); the side-by-side faces stay width-bound at 300
    const pw = layout === 'stack' ? (d.panelW || 384) : (d.panelW || 300);
    const ph = Math.round(pw * H / W);
    const ringOpts = key ? { rings: true, ringHalo: true, ringIndex: true } : {};
    const pic = (p, i, n, extra = {}) => panelSvg(p, { width: pw, clipId: `fdclip${i}${n}`, attrs: ` data-lcs-fd-panel="${n}" data-lcs-fd-pair="${i}"`, ops: n === 2, ...(n === 2 && key ? { rings: p.rings, ringHalo: true, ringIndex: true } : {}), ...extra });
    let body;

    // ---------------------------------------------------------------- the screen (every face but how-many / what-changed: tap the differences)
    if (screen) {
      const sw = PAGE_W;
      if (mode === 'pairs') {
        const p = comp.panels[0];
        const rows = wins.map((wn, i) => {
          const hots = screenHotspots({ ...p, ops: [p.ops[wn.op]], rings: [p.rings[wn.op]], hotspots: [p.hotspots[wn.op]] }, i, planMeta, wn.box);
          const w1 = panelSvg(p, { width: 560, viewBox: [wn.box[0], wn.box[1], wn.box[2] - wn.box[0], wn.box[3] - wn.box[1]], frame: 'window', clipId: `fdw${i}a`, attrs: ` data-lcs-fd-panel="1" data-lcs-fd-pair="${i}"`, ops: false });
          const w2 = panelSvg(p, { width: 560, viewBox: [wn.box[0], wn.box[1], wn.box[2] - wn.box[0], wn.box[3] - wn.box[1]], frame: 'window', clipId: `fdw${i}b`, attrs: ` data-lcs-fd-panel="2" data-lcs-fd-pair="${i}"`, opsList: [p.ops[wn.op]], hotspots: hots });
          return `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;width:675px">${w1}${w2}</div>`;
        });
        body = C7.fdScreenStack({ panels: rows, gap: 20 });
      } else if (mode === 'how-many') {
        const p = comp.panels[0];
        const p1 = panelSvg(p, { width: sw, clipId: 'fds1', attrs: ' data-lcs-fd-panel="1" data-lcs-fd-pair="0"', ops: false });
        const p2 = panelSvg(p, { width: sw, clipId: 'fds2', attrs: ' data-lcs-fd-panel="2" data-lcs-fd-pair="0"', ops: true });
        // at least four chips, 3-6 (read 2026-10-10: level 1's range 3-4 showed only two — a coin toss); a wider range widens it
        const lo = d.countRange ? Math.min(d.countRange[0], 3) : 3, hi = d.countRange ? Math.max(d.countRange[1], 6) : 6;
        const opts = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
        body = C7.fdScreenStack({ panels: [p1, p2, C7.fdChoiceChips({ options: opts, meta: planMeta, correct: count })] });   // the runtime's answer map reads the stamp; the robot's oracle recomposes
      } else if (mode === 'what-changed') {
        const p = comp.panels[0];
        const p1 = panelSvg(p, { width: sw, clipId: 'fds1', attrs: ' data-lcs-fd-panel="1" data-lcs-fd-pair="0"', ops: false });
        const p2 = panelSvg(p, { width: sw, clipId: 'fds2', attrs: ' data-lcs-fd-panel="2" data-lcs-fd-pair="0"', ops: true });
        const words = wordsFor(p, loc, rng);
        const m = Object.entries(planMeta).map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
        const rows = words.map((x) => `<div data-lcs-fd-hotspot="w-${esc(x.k)}" data-lcs-fd-word="${esc(x.k)}" data-lcs-label="${esc(x.text)}"${x.changed ? ' data-lcs-fd-diff="1"' : ''}${m} style="display:flex;align-items:center;justify-content:center;width:675px;height:96px;box-sizing:border-box;border:2px solid #146B5E;border-radius:14px;background:#FFFFFF;font-family:Nunito,sans-serif;font-weight:800;font-size:30px;color:#3A3530">${esc(x.text)}</div>`);
        body = C7.fdScreenStack({ panels: [p1, p2, `<div style="display:flex;flex-direction:column;gap:8px;width:675px;padding-top:4px">${rows.join('')}</div>`] });
      } else {
        const panels = [];
        // a two-pair screen (seven / ten-pairs) is FOUR panels: each carries its index badge (1 / 2) in the corner and a
        // divider separates the pairs — without them 'the top / bottom picture' named one panel each (the sv panel)
        const badge = (n) => `<div style="position:absolute;left:10px;top:10px;pointer-events:none" data-lcs-fd-screen-tab="${n}">${C7.fdIndexTab({ n })}</div>`;
        const wrap = (svg, n) => (comp.panels.length > 1 ? `<div style="position:relative">${svg}${badge(n)}</div>` : svg);
        comp.panels.forEach((p, i) => {
          const flip = !!d.flip;
          if (i > 0) panels.push('<div data-lcs-fd-pair-divider="1" style="height:4px;background:#C8BFAE;border-radius:2px;margin:10px 24px"></div>');
          panels.push(wrap(panelSvg(p, { width: sw, clipId: `fds${i}a`, attrs: ` data-lcs-fd-panel="1" data-lcs-fd-pair="${i}"`, ops: false }), 1));
          panels.push(wrap(panelSvg(p, { width: sw, clipId: `fds${i}b`, attrs: ` data-lcs-fd-panel="2" data-lcs-fd-pair="${i}"`, ops: true, flip, hotspots: screenHotspots(p, i, planMeta) }), 2));
        });
        body = C7.fdScreenStack({ panels });
      }
      // a Level Set scene: every picture is KEPT in the screen image (render-instance crops below the lowest tappable spot;
      // read 2026-10-10: a page whose lowest change sat high showed half a bottom picture — gate qa/fd-screen-crop.js)
      if (comp.panels.some((p) => /^fdx-/.test(String(p.unit)))) body = body.replace(/ data-lcs-fd-panel="/g, ' data-lcs-keep="1" data-lcs-fd-panel="');
      return { bodyHtml: root(d, mode, units, count, body, 'data-lcs-fd-screen="1"'), meta };
    }

    // ---------------------------------------------------------------- the print page (and the key: the same layout, ringed + ticked)
    const ticks = key ? Array(count).fill(1) : null;
    if (layout === 'stack') {
      const p = comp.panels[0];
      const p1 = C7.fdPicture({ svg: pic(p, 0, 1), w: pw, h: ph, tab: 1 });
      const p2 = C7.fdPicture({ svg: pic(p, 0, 2), w: pw, h: ph, tab: 2 });
      const stack = C7.fdStack({ p1, p2 });
      let right, rightW;
      if (mode === 'how-many') {
        rightW = (d.box && d.box.w) || 88;
        right = `<div style="padding-top:${ph + 12}px">${C7.fdCountBox({ w: rightW, h: (d.box && d.box.h) || 64, answer: key ? String(count) : '' })}</div>`;
      } else if (mode === 'what-changed') {
        rightW = 232;   // the word column narrowed so the 384-wide stack fits beside it (the longest shipped word, nl lieveheersbeestje, needs ~165)
        const words = wordsFor(p, loc, rng);
        right = C7.fdWordTicks({ words, box: d.box || 28, w: rightW, ticks: key ? words.map((x) => (x.changed ? 1 : 0)) : null, stamp: key });
      } else {
        rightW = 118;
        right = C7.fdLedger({ n: count, box: (d.ledger && d.ledger.box) || 56, gap: 10, numerals: true, ticks, dashed: !!(d.ledger && d.ledger.dashed) });
      }
      body = C7.fdColumns({ cells: [stack, '', '', right], widths: [pw, 18, 30, rightW] });
    } else if (layout === 'columns') {
      const cols = comp.panels.map((p, i) => {
        // the first column's tabs hang off its LEFT edge: a right-hand tab (28 px) under a 16-px column gap was covered by
        // the second column's frame (the '1' half hidden on every two-pair page, 2026-10-10); 28 + 300 + 16 + 300 + 28 = 672 <= 675
        const side = i === 0 ? 'left' : 'right';
        const p1 = C7.fdPicture({ svg: pic(p, i, 1), w: pw, h: ph, tab: 1, tabSide: side });
        const p2 = C7.fdPicture({ svg: pic(p, i, 2), w: pw, h: ph, tab: 2, tabSide: side });
        const led = C7.fdLedger({ n: p.ops.length, box: (d.ledger && d.ledger.box) || 68, orient: 'row', ticks: key ? Array(p.ops.length).fill(1) : null, attrs: `data-lcs-fd-pair="${i}"` });
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:${d.ledgerGap || 22}px">${C7.fdStack({ p1, p2, gap: d.stackGap || 32 })}${led}</div>`;
      });
      body = `<div style="display:flex;justify-content:center;gap:16px;width:${PAGE_W}px;box-sizing:border-box">${cols.join('')}</div>`;
    } else if (layout === 'side') {
      const flip = !!d.flip;
      const midW = PAGE_W - 60 - 2 * pw;   // 15 at 300-wide pictures
      // one row per panel. The mirror face carries TWO scenes of two differences each: a single side-by-side pair stopped at
      // 57 % of the page (operator 2026-10-10); one fold line runs down the whole stack (drawn once, from the first row,
      // in a zero-height box so it never adds to the row's height)
      const rows = comp.panels.length, rowGap = d.rowGap || 14;
      const rowOf = (p, i) => {
        const p1 = C7.fdPicture({ svg: pic(p, i, 1), w: pw, h: ph, tab: i === 0 ? 1 : null, tabSide: 'left' });
        const p2 = C7.fdPicture({ svg: pic(p, i, 2, { flip }), w: pw, h: ph, tab: i === 0 ? 2 : null });
        const foldH = rows * ph + (rows - 1) * rowGap + 40;
        const mid = d.fold && i === 0
          ? `<span style="width:${midW}px;flex:0 0 ${midW}px;height:0;display:block;overflow:visible;margin-top:-20px;position:relative">${C7.fdFoldLine({ h: foldH, x: PAGE_W / 2, w: midW })}</span>`
          : `<span style="width:${midW}px;flex:0 0 ${midW}px"></span>`;
        return `<div style="display:flex;align-items:flex-start;justify-content:center;width:${PAGE_W}px" data-lcs-fd-siderow="${i}">` +
          `<span style="width:30px;flex:0 0 30px"></span>${p1}${mid}${p2}<span style="width:30px;flex:0 0 30px"></span></div>`;
      };
      const row = comp.panels.map(rowOf).join(`<div style="height:${rowGap}px"></div>`);
      const p = comp.panels[0];
      if (mode === 'write') {
        const nouns = wordsFor(p, loc, rng, { swapWords: /^fdx-/.test(String(p.unit)) }).map((x) => x.text);
        const change = rng.shuffle(blk.changeWords.slice());
        const strips = `<div style="display:flex;flex-direction:column;gap:8px;width:${PAGE_W}px;align-items:center" data-lcs-fd-strips="2">${wordBank({ words: nouns.map((w) => ({ word: w })), wordPx: 17 })}${wordBank({ words: change.map((w) => ({ word: w })), wordPx: 17 })}</div>`;
        const rows = d.rows || 4;
        const ruled = `<div style="width:600px;line-height:0" data-lcs-fd-rows="${rows}">${Array.from({ length: rows }, () => rulingBlock({ rows: 1, w: 600, h: d.rowH || 44, glyphH: d.glyphH || 20, starters: { 0: blk.starter } })).join('<div style="height:6px"></div>')}</div>`;
        body = `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${PAGE_W}px">${row}${strips}<div style="height:-2px"></div>${ruled}</div>`;
      } else {
        const led = C7.fdLedger({ n: count, box: (d.ledger && d.ledger.box) || 48, orient: 'row', ticks });
        body = `<div style="display:flex;flex-direction:column;align-items:center;gap:14px;width:${PAGE_W}px">${row}<div style="width:${PAGE_W}px;display:flex;justify-content:flex-end;padding-right:${30 + (pw - 4 * 48 - 3 * 8) / 2}px;box-sizing:border-box">${led}</div></div>`;
      }
    } else if (layout === 'pairs') {
      const p = comp.panels[0];
      const win = d.window || [260, 200];
      const rows = wins.map((wn, i) => {
        const w1 = panelSvg(p, { width: win[0], viewBox: [wn.box[0], wn.box[1], wn.box[2] - wn.box[0], wn.box[3] - wn.box[1]], frame: 'window', clipId: `fdw${i}a`, attrs: ` data-lcs-fd-panel="1" data-lcs-fd-pair="${i}"`, ops: false });
        const w2 = panelSvg(p, { width: win[0], viewBox: [wn.box[0], wn.box[1], wn.box[2] - wn.box[0], wn.box[3] - wn.box[1]], frame: 'window', clipId: `fdw${i}b`, attrs: ` data-lcs-fd-panel="2" data-lcs-fd-pair="${i}"`, opsList: [p.ops[wn.op]], ...(key ? { rings: [p.rings[wn.op]], ringHalo: true, ringIndex: true } : {}) });
        return C7.fdWindowRow({ w1, w2, tab: i === 0 ? 2 : null, tab1: i === 0 ? 1 : null, ticked: key, attrs: `data-lcs-fd-row="${i}" data-lcs-fd-cell="${wn.cell}"` });
      });
      // the top row's tabs: "1" over window 1 and "2" over window 2 (one tab per column, the first row only)
      body = `<div style="display:flex;flex-direction:column;gap:20px;align-items:center;width:${PAGE_W}px">${rows.join('')}</div>`;
    } else throw new Error(`K-395: layout "${layout}" is not built`);
    return { bodyHtml: root(d, mode, units, count, body, key ? 'data-lcs-fd-key="1"' : ''), meta };
  },

  async verify(page) {
    const R0 = await page.evaluate(() => {
      const R = document.querySelector('[data-lcs-fd-count]');
      if (!R) return null;
      return { mode: R.dataset.lcsFdMode, count: +R.dataset.lcsFdCount, layout: R.dataset.lcsFdLayout, screen: !!R.dataset.lcsFdScreen, key: !!R.dataset.lcsFdKey, pairs: [...new Set([...R.querySelectorAll('[data-lcs-fd-pair]')].map((e) => e.dataset.lcsFdPair))], flip: !!R.querySelector('[data-lcs-fd-flip]') };
    });
    if (!R0) return ['no find-the-differences root'];
    const fails = [];
    const expectCounts = await page.evaluate(() => [...document.querySelectorAll('[data-lcs-fd-ledger]')].map((l) => +l.dataset.lcsFdLedger));
    let total = 0;
    for (const pr of R0.pairs) {
      const sel1 = `svg[data-lcs-fd-panel="1"][data-lcs-fd-pair="${pr}"]`, sel2 = `svg[data-lcs-fd-panel="2"][data-lcs-fd-pair="${pr}"]`;
      // the builder's own measurement (tools/fd-build.js): 1 px per picture UNIT (a 600-wide canvas for a full panel, the
      // window's units for a close-up), dilation 5 — a spiky drawing's mirror is ONE change at that scale, many at a finer one
      const box = await page.evaluate((s) => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); const vb = (e.getAttribute('viewBox') || '0 0 600 560').split(' ').map(Number); return { w: b.width, h: b.height, units: vb[2] }; }, sel2);
      const scale = box.units / box.w;
      const r = await page.evaluate(evalSource({ panel1: sel1, panel2: sel2, hotspots: '[data-lcs-fd-hotspot][data-lcs-fd-panel-nope]', scale, dilate: 5, noise: 10, mirrored: R0.flip }));
      if (!r || r.fails.some((f) => /not found|differ in size/.test(f))) { fails.push(`pair ${pr}: ${r ? r.fails.join(' | ') : 'no diff'}`); continue; }
      // a WHOLE-drawing change (a mirrored hedgehog, a shrunk sun) changes pixels in several patches inside ONE box — the
      // builder accepts whole ops on their union box; so components whose boxes intersect are one difference (two genuine
      // differences never intersect: the composer keeps their ring boxes ≥ minSepPx apart)
      const comps = r.components.map((c) => ({ ...c }));
      let merged = true;
      while (merged) {
        merged = false;
        for (let i = 0; i < comps.length && !merged; i++) for (let j = i + 1; j < comps.length && !merged; j++) {
          const a = comps[i], b = comps[j];
          if (a.x0 <= b.x1 + 2 && b.x0 <= a.x1 + 2 && a.y0 <= b.y1 + 2 && b.y0 <= a.y1 + 2) { comps[i] = { x0: Math.min(a.x0, b.x0), y0: Math.min(a.y0, b.y0), x1: Math.max(a.x1, b.x1), y1: Math.max(a.y1, b.y1), area: a.area + b.area }; comps.splice(j, 1); merged = true; }
        }
      }
      r.components = comps; r.count = comps.length;
      total += r.count;
      // the frame line sits 3-9 units in; a candidate's box sits ≥ 8 units in and the diff dilates 5, so a component may reach 3 units from the edge
      // the helper reports components in CSS px of panel 2 (the scale only sets its raster): convert to units here
      const U = (v) => v * scale;
      for (const c of r.components) if (U(c.x0) < 2 || U(c.y0) < 2 || U(c.x1) > box.units - 2 || U(c.y1) > box.h * scale - 2) fails.push(`pair ${pr}: a difference on the frame`);
      // the differences a child sees are pairwise apart (the composer separates the RING boxes by ≥ minSepPx; ≥ 10 units here is the sanity floor)
      for (let i = 0; i < r.components.length; i++) for (let j = i + 1; j < r.components.length; j++) {
        const a = r.components[i], b = r.components[j];
        const g = U(Math.max(b.x0 - a.x1, a.x0 - b.x1, b.y0 - a.y1, a.y0 - b.y1));
        if (R0.layout !== 'pairs' && g < 10) fails.push(`pair ${pr}: two differences only ${Math.round(g)} units apart`);
      }
      if (R0.layout === 'columns' && expectCounts.length && r.count !== expectCounts[+pr]) fails.push(`pair ${pr}: ${r.count} visible differences, the ledger says ${expectCounts[+pr]}`);
      if (R0.layout === 'pairs' && r.count !== 1) fails.push(`row ${pr}: ${r.count} visible differences (1 expected)`);
    }
    if (R0.layout !== 'pairs' && R0.layout !== 'columns' && total !== R0.count) fails.push(`${total} visible differences, the page says ${R0.count}`);
    if (R0.layout === 'columns' && total !== R0.count) fails.push(`${total} visible differences across the pairs, the page says ${R0.count}`);
    if (R0.layout === 'pairs' && total !== R0.count) fails.push(`${total} visible differences across the rows, the page says ${R0.count}`);
    // the answer stays hidden on the print page and the screen
    const dom = await page.evaluate((isKey, isScreen, mode) => {
      const f = [];
      const R = document.querySelector('[data-lcs-fd-count]');
      if (!isKey && R.querySelector('[data-lcs-fd-ring]')) f.push('a ring on the print / screen page');   // halo / index parts carry the stamp too
      if (!isScreen && R.querySelector('[data-lcs-fd-hotspot]')) f.push('a hotspot on the print page');
      if (!isKey) {
        R.querySelectorAll('[data-lcs-fd-box]').forEach((b) => { if (b.querySelector('path')) f.push('a tick in an empty box'); });
        R.querySelectorAll('[data-lcs-answer]').forEach((b) => { if (b.getAttribute('data-lcs-answer') !== '' || b.textContent.trim()) f.push('a numeral printed in the count box'); });
        if (R.querySelector('[data-lcs-fd-changed]')) f.push('a changed-word stamp on the print page');
      }
      if (mode === 'how-many' && !isScreen) { const t = document.querySelector('[data-lcs-title]'); const i = document.querySelector('[data-lcs-instruction]'); if (/\d/.test((t && t.textContent) || '') || /\b[3-9]\b/.test((i && i.textContent) || '')) f.push('how-many: a digit in the title or instruction'); }
      const t = document.querySelector('[data-lcs-title]');
      const digits = ((t && t.textContent) || '').match(/\d+/g);
      if (digits && !isScreen && R.dataset.lcsFdMode !== 'how-many') { const n = +R.dataset.lcsFdCount; if (!digits.map(Number).includes(n)) f.push(`the title says ${digits.join('/')} but the page carries ${n} differences`); }
      // the tabs sit outside the frame (never over a drawing)
      R.querySelectorAll('[data-lcs-fd-tab]').forEach((tb) => { const pic = tb.closest('.fd-pic'); if (pic) { const a = tb.getBoundingClientRect(), b = pic.querySelector('svg[data-lcs-prim="fd-panel"]').getBoundingClientRect(); if (a.left < b.right - 2 && a.right > b.left + 2) f.push('a tab over the picture'); } });   // the tab hangs OUTSIDE the frame, right or left
      // the panels inside the page
      const pg = (document.querySelector('[data-lcs-page]') || document.body).getBoundingClientRect();
      R.querySelectorAll('svg[data-lcs-prim="fd-panel"], .fd-ledger, [data-lcs-fd-box]').forEach((e) => { const b = e.getBoundingClientRect(); if (b.left < pg.left - 1 || b.right > pg.right + 1 || b.bottom > pg.bottom + 1) f.push('apparatus outside the page'); });
      if (mode === 'mirror-pair') {
        const fold = R.querySelector('[data-lcs-fd-fold]'), p1 = R.querySelector('svg[data-lcs-fd-panel="1"]'), p2 = R.querySelector('svg[data-lcs-fd-panel="2"]');
        if (!isScreen) { if (!fold) f.push('mirror: no fold line'); else { const fx = fold.getBoundingClientRect(); const mid = (p1.getBoundingClientRect().right + p2.getBoundingClientRect().left) / 2; if (Math.abs((fx.left + fx.right) / 2 - mid) > 1) f.push('mirror: the fold line is off the middle'); } }
        if (!p2.hasAttribute('data-lcs-fd-flip')) f.push('mirror: picture 2 is not flipped');
      }
      return f;
    }, R0.key, R0.screen, R0.mode);
    return fails.concat(dom);
  },
};

/** the what-changed / write word list: the DISTINCT nouns of picture 1 in a seeded shuffle, each with its vocab key */
function wordsFor(panel, loc, rng, o = {}) {
  const v = vocab();
  const changed = new Set(panel.ops.map((c) => c.item));
  const byKey = new Map();
  const clash = B.clashKeysFor(panel.scene.items.map((l) => B.vocabKeyOf(l.src)), panel.unit);
  let NOWORD = null;
  if (/^fdx-/.test(panel.unit)) { const { CATALOG } = require('../../data/fdx/catalog.js'); NOWORD = new Set([...CATALOG.values()].filter((x) => x.noword).map((x) => x.src)); }
  for (const l of panel.scene.items) {
    const k = B.vocabKeyOf(l.src);
    if (NOWORD && NOWORD.has(l.src)) continue;   // a misnamed drawing is never listed (Level Set scenes)
    if (clash.has(k)) { if (changed.has(l.idx)) throw new Error(`K-395: a clashing word (${k}) was changed — composeAll must refuse it`); continue; }
    const e = v[k];
    if (!e || !e[loc] || !e[loc][0]) throw new Error(`K-395: no ${loc} vocab for "${k}" (${l.src}) — refuse the scene for this locale`);
    const cur = byKey.get(k) || { k, text: displayWord(e[loc][0], loc), changed: false };
    if (changed.has(l.idx)) cur.changed = true;
    byKey.set(k, cur);
  }
  // a NEW drawing's word belongs in the bank too (read 2026-10-10: "a frog is new" with no "frog" to copy — the write face
  // offers the chip "new"); only an add carries no item, so pages without one are untouched
  for (const c of panel.ops) {
    // (the write face also needs the word of a SWAPPED-IN drawing — read 2026-10-10: an owl became a raccoon with no 'raccoon'
    // to copy; the tick face ticks the replaced drawing's word, so it never receives this)
    if (!(c.kind === 'add' || (o.swapWords && c.kind === 'swap')) || !c.src || (NOWORD && NOWORD.has(c.src))) continue;
    const k = B.vocabKeyOf(c.src);
    if (byKey.has(k)) { byKey.get(k).changed = true; continue; }
    const e = v[k];
    if (!e || !e[loc] || !e[loc][0]) throw new Error(`K-395: no ${loc} vocab for "${k}" (${c.src}) — refuse the scene for this locale`);
    byKey.set(k, { k, text: displayWord(e[loc][0], loc), changed: true });
  }
  const all = [...byKey.values()];
  const hit = all.filter((x) => x.changed), rest = rng.shuffle(all.filter((x) => !x.changed));
  // capped: every changed noun + decoys up to B.WORD_CAP (a rich scene's 7-8 nouns would be a list, not a bank)
  return rng.shuffle(hit.concat(rest.slice(0, Math.max(0, B.WORD_CAP - hit.length))));
}

/** the robot's oracle: re-compose from the seed + plan in the meta (never data-lcs-fd-diff); an item is true iff it holds a ring centre */
function fdOracle(items) {
  const m0 = (items.find((it) => it.meta && it.meta['data-lcs-fd-seed']) || {}).meta;
  if (!m0) throw new Error('fd oracle: no seed in the items');
  const plan = JSON.parse(m0['data-lcs-fd-plan']);
  const rng = makeRng(m0['data-lcs-fd-seed']);
  const { comp, wins } = composeWithWindows(plan, rng);
  const total = comp.count;
  return items.map((it) => {
    const m = it.meta || {};
    if (m['data-lcs-fd-count'] != null && m['data-lcs-fd-word'] == null && m['data-lcs-fd-box'] == null) return +m['data-lcs-fd-count'] === total;   // the how-many chips
    if (m['data-lcs-fd-word'] != null) { const key = m['data-lcs-fd-word']; const p = comp.panels[0]; return p.ops.some((c) => B.vocabKeyOf((p.scene.items.find((l) => l.idx === c.item) || {}).src) === key); }
    if (!m['data-lcs-fd-box']) return false;
    const b = m['data-lcs-fd-box'].split(',').map(Number);
    const inside = (r) => { const cx = (r[0] + r[2]) / 2, cy = (r[1] + r[3]) / 2; return cx >= b[0] && cx <= b[2] && cy >= b[1] && cy <= b[3]; };
    if (plan.window) {
      // the picture-pairs face: the panel index is the ROW; the row shows ONE op — replay the windows (the rng continues after the compose)
      const row = +m['data-lcs-fd-panel'] || 0;
      return inside(comp.panels[0].rings[wins[row].op]);
    }
    const p = comp.panels[+m['data-lcs-fd-panel'] || 0];
    if (!p) return false;
    return p.rings.some(inside);
  });
}
module.exports.fdOracle = fdOracle;
module.exports.composeAll = composeAll;
module.exports.planFor = planFor;
module.exports.placeWindows = placeWindows;
module.exports.screenHotspots = screenHotspots;
module.exports.composeWithWindows = composeWithWindows;
