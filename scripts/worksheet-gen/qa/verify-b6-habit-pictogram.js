#!/usr/bin/env node
/**
 * verify-b6-habit-pictogram.js — the gate of primitives/habit-pictogram.js (K-380
 * `healthy-habits`, design §2 "Gate qa/verify-b6-habit-pictogram.js"). Render-
 * measuring: every rule is read off the EMITTED markup rasterised in Chromium
 * (the `verify-b5-road-pictogram.js` pattern); `meta` is never read.
 *
 *   node scripts/worksheet-gen/qa/verify-b6-habit-pictogram.js [--no-sheets]
 *
 * NODE PASS (rule 7, static): every pose / tool / hands state / brush card
 * emits; tokens only (no coral, no codeColors, no off-palette hex), no <text>.
 * RENDER PASS (each item rasterised at 60 px, 1-bit at Rec. 601 luma < 160 on
 * white, plus its shipped size):
 *   1  every pair inside one COMMON.coOccur set has 1-bit Jaccard < 0.72 at 60 px;
 *   2  every F3 minimal pair differs by >= 6 % of the union's dark pixels, and
 *      ONLY inside its declared differing parts (each XOR pixel inside a declared
 *      part's box, 2 px slack, in either image);
 *   3  the F1 hands states are pairwise distinct as state vectors PARSED from
 *      the drawing (stream / bubbles / soap place / towel) and as 1-bit images
 *      (>= 3 % XOR of the union);
 *   4  no base habit figure contains a whole tool glyph or any tool's part, no
 *      tool carries a part of a habit that is not its own (the shared-mark rule),
 *      the soap draws no round mark (bubbles);
 *   5  the near hand's rendered centre (the arm's drawn END, not the stamp) lies
 *      within 6 px of its anchor at 104 px (MOUTH brush, NOSE blow-nose, CROWN
 *      comb, the tap stream wash); cough-elbow: the ELBOW within 4 units of MOUTH;
 *   6  every part's box >= 8 px on its short side at its shipped size (base
 *      104, F1 176, F2 104, F3 124); exemptions are an auditable list below;
 *   7  (render) no coral / codeColors / <text> inside any drawing.
 * POISONS (each must FAIL for its own rule; the correct primitive is the
 * control): PP1 cough-elbow drawn as a copy of cough-open (2) · PP2 rinse
 * without its falling bubbles (3) · PP3 a toothbrush added to brush-teeth (4) ·
 * PP4 bubbles added to the soap (4) · PP5 the comb hand moved to the MOUTH (5) ·
 * PP6 a codeRed fill (7) · PP7 rinse-brush without its foam (8, design P15).
 * SHEETS: colour + greyscale at the smallest and largest sizes the family uses
 * (figures 64 / 88 / 132, tools 88 / 124, hands 176, brush cards 104, pairs 124).
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const HP = require('../primitives/habit-pictogram.js');
const { COMMON } = require('../data/b6/healthy-habits.js');
const H = require('./b6-healthy-habits-harness.js');

const K = H.makeChecker();
const { ok } = K;
const CODE = Object.values(tokens.codeColors).map((c) => c.toUpperCase());
const PALETTE = new Set(Object.values(tokens.color).map((c) => c.toUpperCase()));
const BANNED = new Set([tokens.color.coral.toUpperCase(), ...CODE]);

/** rule 6 exemptions (auditable): part -> why a short side < 8 px is correct */
const THIN_OK = {
  ground: 'a ground line: its whole job is to be a thin line (context, never a cue)',
  'stream': 'F1 tap stream is 6 units wide by design at 176 px = 10.6 px (kept for the 104 brush card too: 6.2 px)',
  cap: 'F2 open-tube: the cap lies beside the tube (8 units = 8.3 px at 104; exempt from the min-side on the rotated box)',
  'cough-puff': 'F3 puff dashes are motion marks (the elbow crook carries the pose; they are the redundant cue)',
  pinch: 'base blow-nose: the pinching finger is a 3.6-unit stroke (its box has no stroke width); the hand AT the nose carries the pose',
  fall: 'F3 two short falling dashes above the tissue (motion marks; the tissue inside the bin carries the answer)',
  scrub: 'F2 chewing: the two back-and-forth arrows are motion marks (the brush ON the molars carries the card)',
};

/**
 * Which pairs of a co-occurrence set rule 1 asks a child to TELL APART:
 *   base / F1 / F2   every pair (F1 minus the declared minimal pair wet / rinse, which rule 3 owns: it is
 *                    SUPPOSED to be alike — "soap comes between them" is the teaching point)
 *   F3               'rows': every row is a declared minimal pair (rule 2) and the child never compares
 *                    across rows, so cross-row likeness (two calm standing twins) is not a confusion
 *   F4 / F5          every pair, but these faces draw the TOOL in the hand (design §2 table, "tools SHOWN
 *                    on F4 / F5") — a variant that is built with the faces in Phase E (see RULE1_PENDING)
 */
const RULE1_SCOPE = { base: 'all', F1: 'all', F2: 'all', F3: 'rows', F3pairs: 'rows', F4: 'all', F5: 'all' };
/**
 * RULE1_PENDING — a RATCHET, not an approval: face pairs measured >= 0.72 on 2026-09-23 whose drawings are
 * Phase-E work (the face art is drafted here; each face's build rewrites it). A pair on this list that
 * measures < 0.72 FAILS (remove it); a pair over the line that is NOT listed FAILS. The base set may never
 * appear here. It may only shrink.
 */
const RULE1_PENDING = {};   // EMPTIED at Phase E (2026-09-23): the redrawn F1 hands measure 0.60-0.64, the F4 / F5 tool-shown poses < 0.72
if (RULE1_PENDING.base) throw new Error('RULE1_PENDING may never carry the base set');

/* ================================================================== the catalogue: id -> {svg, px, kind} */
function item(kind, key, px, extra = {}) {
  if (kind === 'figure') return HP.habitFigure({ pose: key, px, ...extra }).svg;
  if (kind === 'tool') return HP.habitTool({ kind: key, px, ...extra }).svg;
  if (kind === 'hands') return HP.handsView({ state: key, px, ...extra }).svg;
  if (kind === 'brush') return HP.brushCard({ kind: key, px, ...extra }).svg;
  if (kind === 'two') return HP.twoFigures({ pose: key, px, ...extra }).svg;
  throw new Error('item kind ' + kind);
}
const SHIPPED = { figure: 104, tool: 104, hands: 176, brush: 104, two: 124 };
const F3_FIG = new Set(['cough-elbow', 'cough-open', 'tissue-in-bin', 'tissue-on-floor']);
function catalogue() {
  const C = {};
  const add = (kind, key) => {
    const ship = kind === 'figure' && F3_FIG.has(key) ? 124 : SHIPPED[kind];
    // the base habits ship fit:true inside the plaque: their floors are measured at the SMALLEST d2 plaque interior
    // (122 - 2 x 2.5 border - 2 x 5 padding = 107 wide, 190 - 15 = 175 tall)
    const base = kind === 'figure' && COMMON.baseD3.includes(key);
    const sShip = base ? HP.habitFigure({ pose: key, fit: true }).svg.replace('width="100%" height="100%"', 'width="107" height="175"') : item(kind, key, ship);
    C[`${kind}:${key}`] = { kind, key, s60: item(kind, key, 60), ship: base ? 107 : ship, sShip, s104: item(kind, key, 104) };
  };
  HP.POSES.forEach((p) => add('figure', p));
  HP.TOOLS.forEach((t) => add('tool', t));
  [...Object.keys(HP.HAND_STATES), 'hands-soap', 'hands-water-only', 'hands-dirty'].forEach((s) => add('hands', s));
  HP.BRUSH_KINDS.forEach((k) => add('brush', k));
  HP.TWO_POSES.forEach((p) => add('two', p));
  return C;
}
/** F3 minimal pairs and the parts they are allowed to differ in */
const MIN_PAIRS = [
  { a: 'figure:cough-elbow', b: 'figure:cough-open', parts: ['arm-near', 'cough-puff', 'spray'] },
  { a: 'figure:tissue-in-bin', b: 'figure:tissue-on-floor', parts: ['arm-near', 'tissue', 'fall'] },
  { a: 'two:own-cup', b: 'two:shared-cup', parts: ['arm-near', 'glass', 'cup-shared'] },
  // FIX ROUND 2: the soap row's other tile is dirty hands (tap off, germs), never water-only hand washing
  { a: 'hands:hands-soap', b: 'hands:hands-dirty', parts: ['bubbles', 'stream', 'germs'] },
  // FIX ROUND 2 (F2): the state cards are a declared minimal pair (the same tooth; plaque before, sparkle after)
  { a: 'brush:dirty-teeth', b: 'brush:clean-teeth', parts: ['plaque', 'sparkle'] },
];

/* ================================================================== node pass (rule 7, static) */
function staticCheck(svg, tag) {
  ok(!/<text[\s>]/.test(svg), `${tag}: <text> inside a drawing`);
  for (const m of svg.matchAll(/ (?:fill|stroke)="(#[0-9A-Fa-f]{6})"/g)) {
    const v = m[1].toUpperCase();
    ok(PALETTE.has(v), `${tag}: off-palette ${v}`);
    ok(!BANNED.has(v), `${tag}: ${v} inside a drawing (rule 7: no coral, no code colours)`);
  }
}

/* ================================================================== in-page helpers */
const PAGE_JS = `
window.__raster = async function (svgText, px) {
  const img = new Image();
  await new Promise((ok, bad) => { img.onload = ok; img.onerror = bad; img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText); });
  const cv = document.createElement('canvas'); cv.width = px; cv.height = px;
  const cx = cv.getContext('2d'); cx.fillStyle = '#ffffff'; cx.fillRect(0, 0, px, px); cx.drawImage(img, 0, 0, px, px);
  const d = cx.getImageData(0, 0, px, px).data, bits = new Uint8Array(px * px);
  for (let i = 0; i < px * px; i++) bits[i] = (0.299 * d[4 * i] + 0.587 * d[4 * i + 1] + 0.114 * d[4 * i + 2]) < 160 ? 1 : 0;
  return bits;
};
window.__partBoxes = function (svgText, px) {
  const host = document.createElement('div'); host.style.cssText = 'position:absolute;left:0;top:0'; host.innerHTML = svgText; document.body.appendChild(host);
  const svg = host.querySelector('svg'), r0 = svg.getBoundingClientRect();
  const out = [...svg.querySelectorAll('[data-lcs-part]')].map((g) => { const r = g.getBoundingClientRect(); return { part: g.dataset.lcsPart, x: r.left - r0.left, y: r.top - r0.top, w: r.width, h: r.height }; });
  host.remove();
  return out;
};
window.__measure = function (svgText, ax, ay) {
  // every point in SCREEN px through the arm's own CTM (the viewBox is the pose's box, and blow-nose's arm sits
  // inside a rotated group), so the anchor distance is measured on the render, never in assumed unit space
  const host = document.createElement('div'); host.style.cssText = 'position:absolute;left:0;top:0'; host.innerHTML = svgText; document.body.appendChild(host);
  const svg = host.querySelector('svg');
  const arm = svg.querySelector('[data-lcs-part="arm-near"] polyline:last-of-type');
  const toScr = (x, y) => { const p = svg.createSVGPoint(); p.x = x; p.y = y; const q = p.matrixTransform(arm.getScreenCTM()); return [q.x, q.y]; };
  const pts = arm ? arm.getAttribute('points').trim().split(/\\s+/).map((p) => p.split(',').map(Number)) : null;
  const res = { pts, end: pts ? toScr(...pts[pts.length - 1]) : null, elbow: pts ? toScr(...pts[1]) : null, anchor: pts ? toScr(ax, ay) : null, unitPx: 0 };
  if (pts) { const a = toScr(0, 0), b = toScr(1, 0); res.unitPx = Math.hypot(b[0] - a[0], b[1] - a[1]); }
  const water = svg.querySelector('[data-lcs-part="water"]');
  if (water) { const w = water.getBoundingClientRect(); res.water = [(w.left + w.right) / 2, w.bottom]; }
  host.remove();
  return res;
};`;

async function renderPass(page, C) {
  await H.openDoc(page, 'pictogram-gate', '<div id="x"></div>');
  await page.evaluate(PAGE_JS);
  const ids = Object.keys(C);
  const bits60 = {};
  for (const id of ids) bits60[id] = await page.evaluate((s) => window.__raster(s, 60).then((b) => Array.from(b)), C[id].s60);
  const jac = (A, B) => { let i = 0, u = 0; for (let k = 0; k < A.length; k++) { if (A[k] && B[k]) i++; if (A[k] || B[k]) u++; } return u ? i / u : 0; };

  // rule 1 — confusability inside every co-occurrence set (RULE1_SCOPE says which pairs a child must tell apart)
  const worst = {}, pending = [];
  const minimal = new Set([...MIN_PAIRS.map((m) => [m.a, m.b].sort().join('|')), ['hands:rinse', 'hands:wet'].join('|')]);
  for (const [set, list] of Object.entries(COMMON.coOccur)) {
    let w = { j: 0, pair: '' };
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const a = list[i], b = list[j];
      if (!bits60[a] || !bits60[b]) { ok(false, `rule 1 ${set}: ${!bits60[a] ? a : b} is not in the catalogue`); continue; }
      const v = jac(bits60[a], bits60[b]);
      if (v > w.j) w = { j: v, pair: `${a} ~ ${b}` };
      const key = [a, b].sort().join('|');
      if (RULE1_SCOPE[set] === 'rows' || minimal.has(key)) continue;          // governed by rules 2 / 3
      const pend = RULE1_PENDING[set] && RULE1_PENDING[set].includes(key);
      if (v >= 0.72 && pend) { pending.push(`${set} ${key} ${v.toFixed(3)}`); continue; }
      if (pend) ok(false, `rule 1 ${set}: ${key} is on the RULE1_PENDING ratchet but measures ${v.toFixed(3)} < 0.72 — remove it (the list may only shrink)`);
      ok(v < 0.72, `rule 1 ${set}: ${a} ~ ${b} 1-bit Jaccard ${v.toFixed(3)} >= 0.72 at 60 px (confusable)`);
    }
    worst[set] = w;
  }
  // rule 1b — the base habits as they SHIP (fit:true, the pose's own box, in a 60 px square): the page's own drawings
  const fitIds = COMMON.baseD3.map((p) => `figure:${p}`);
  const fb = {};
  for (const id of fitIds) fb[id] = await page.evaluate((t) => window.__raster(t, 60).then((b) => Array.from(b)), HP.habitFigure({ pose: id.split(':')[1], fit: true }).svg.replace('width="100%" height="100%"', 'width="60" height="60"'));
  let wf = { j: 0, pair: '' };
  for (let i = 0; i < fitIds.length; i++) for (let j = i + 1; j < fitIds.length; j++) {
    const v = jac(fb[fitIds[i]], fb[fitIds[j]]);
    if (v > wf.j) wf = { j: v, pair: `${fitIds[i]} ~ ${fitIds[j]}` };
    ok(v < 0.72, `rule 1b base (fit): ${fitIds[i]} ~ ${fitIds[j]} 1-bit Jaccard ${v.toFixed(3)} >= 0.72 at 60 px`);
  }
  worst['base (fit, as shipped)'] = wf;
  return { bits60, worst, jac, pending };
}

/** rule 2 — minimal pairs: >= 6 % difference, only inside declared parts */
async function minimalPairs(page, C, bits60, pairs, jac) {
  const out = [];
  for (const mp of pairs) {
    const A = bits60[mp.a] || await page.evaluate((s) => window.__raster(s, 60).then((b) => Array.from(b)), C[mp.a].s60);
    const B = bits60[mp.b] || await page.evaluate((s) => window.__raster(s, 60).then((b) => Array.from(b)), C[mp.b].s60);
    let x = 0, u = 0, outside = 0;
    const boxes = [...await page.evaluate((s) => window.__partBoxes(s, 60), C[mp.a].s60), ...await page.evaluate((s) => window.__partBoxes(s, 60), C[mp.b].s60)]
      .filter((r) => mp.parts.includes(r.part));
    for (let k = 0; k < A.length; k++) {
      if (A[k] || B[k]) u++;
      if (A[k] !== B[k]) {
        x++;
        const px = k % 60 + 0.5, py = Math.floor(k / 60) + 0.5;
        if (!boxes.some((r) => px >= r.x - 2 && px <= r.x + r.w + 2 && py >= r.y - 2 && py <= r.y + r.h + 2)) outside++;
      }
    }
    const share = u ? x / u : 0;
    ok(share >= 0.06, `rule 2 ${mp.a} / ${mp.b}: differ by ${(100 * share).toFixed(1)} % of the union (< 6 %: the minimal pair is not a pair)`);
    ok(outside <= 2, `rule 2 ${mp.a} / ${mp.b}: ${outside} differing pixels outside the declared parts (${mp.parts.join(', ')})`);
    out.push(`${mp.a} / ${mp.b}: ${(100 * share).toFixed(1)} % differ, ${outside} px outside`);
  }
  return out;
}

/** the F1 state vector parsed from the drawing (never HAND_STATES) */
function parseHands(svg) {
  const has = (p) => new RegExp(`data-lcs-part="${p}"`).test(svg);
  const bubbleG = /<g data-lcs-part="bubbles">([\s\S]*?)<\/g>/.exec(svg);
  const nb = bubbleG ? (bubbleG[1].match(/<circle /g) || []).length : 0;
  // bubbles FALLING = every bubble below the hands (y >= 70 in unit space: the bowl), around them otherwise
  const cys = bubbleG ? [...bubbleG[1].matchAll(/cy="([\d.]+)"/g)].map((m) => +m[1]) : [];
  const falling = nb > 0 && cys.every((y) => y >= 70);
  return [has('stream') ? 'on' : 'off', nb ? (falling ? 'falling' : 'around') : 0, has('soap-held') ? 'hands' : has('soap') ? 'rim' : 'none', has('towel') ? 1 : 0].join('|');
}
async function handsRule(page, C, states) {
  const vec = {};
  for (const s of states) vec[s] = parseHands(C[`hands:${s}`].sShip);
  const seen = {};
  for (const s of states) { if (seen[vec[s]]) ok(false, `rule 3: hands "${s}" and "${seen[vec[s]]}" draw the same state (${vec[s]})`); seen[vec[s]] = s; }
  const bits = {};
  for (const s of states) bits[s] = await page.evaluate((t) => window.__raster(t, 60).then((b) => Array.from(b)), C[`hands:${s}`].s60);
  for (let i = 0; i < states.length; i++) for (let j = i + 1; j < states.length; j++) {
    const A = bits[states[i]], B = bits[states[j]];
    let x = 0, u = 0;
    for (let k = 0; k < A.length; k++) { if (A[k] || B[k]) u++; if (A[k] !== B[k]) x++; }
    ok(u && x / u >= 0.03, `rule 3: hands "${states[i]}" / "${states[j]}" differ by ${(100 * x / (u || 1)).toFixed(1)} % as 1-bit images (< 3 %)`);
  }
  return vec;
}

/** rule 4 — tool leak + shared-mark rule, from the emitted markup */
function partsIn(svg) { return new Set([...svg.matchAll(/data-lcs-part="([^"]+)"/g)].map((m) => m[1])); }
function toolRules(C) {
  for (const pose of COMMON.baseD3) {
    const svg = C[`figure:${pose}`].sShip, parts = partsIn(svg);
    ok(!/data-lcs-glyph=/.test(svg), `rule 4: the ${pose} figure contains a whole tool glyph (tool leak)`);
    // FIX ROUND 1: no exemption for the habit's OWN tool any more (the sleep plaque drew the bed it is matched to)
    for (const [tool, tparts] of Object.entries(COMMON.GLYPH_PARTS)) {
      const hit = tparts.filter((p) => parts.has(p));
      ok(!hit.length, `rule 4: the ${pose} figure draws part(s) ${hit.join(',')} of the ${tool} (tool leak)`);
    }
    // FIX ROUND 1 (de panel): no base habit shows the unhealthy variant of a habit (spray, dropped tissue, shared cup)
    for (const p of COMMON.UNHEALTHY_PARTS) ok(!parts.has(p), `rule 4b: the ${pose} figure draws "${p}", the unhealthy variant of a habit`);
  }
  for (const tool of Object.keys(COMMON.GLYPH_PARTS)) {
    const svg = C[`tool:${tool}`].sShip, parts = partsIn(svg);
    for (const p of COMMON.TOOL_FORBIDDEN[tool] || []) ok(!parts.has(p), `rule 4: the ${tool} carries the forbidden mark "${p}"`);
    if (tool === 'soap') ok(!/<circle /.test(svg), 'rule 4: the soap draws a round mark (bubbles on the soap pull the brushing child\'s line to it)');
    for (const pose of COMMON.baseD3) if (COMMON.TOOL_OF[pose] !== tool) {
      const shared = (HP.POSE_PARTS[pose] || []).filter((p) => !['legs', 'torso', 'head', 'arm-near', 'arm-far'].includes(p) && parts.has(p));
      ok(!shared.length, `rule 4: the ${tool} shares ${shared.join(',')} with the ${pose} child (shared-mark rule)`);
    }
  }
}

/** rule 5 — the near hand on its anchor (from the drawn arm END), at 104 px */
async function anchorRule(page, C) {
  const out = [];
  for (const [pose, anchor] of Object.entries(HP.HAND_ANCHOR)) {
    const m = await page.evaluate((s, ax, ay) => window.__measure(s, ax, ay), C[`figure:${pose}`].s104, anchor[0], anchor[1]);
    if (!m.pts) { ok(false, `rule 5 ${pose}: no near arm drawn`); continue; }
    const target = pose === 'wash-hands' && m.water ? m.water : m.anchor;
    // the gate's 6 px is at a 104 px figure whose unit box is 100: normalise by the rendered unit size
    const dpx = Math.hypot(m.end[0] - target[0], m.end[1] - target[1]) / m.unitPx * 1.04;
    ok(dpx <= 6, `rule 5 ${pose}: the near hand is ${dpx.toFixed(1)} px from its anchor (> 6 at 104 px)`);
    out.push(`${pose} ${dpx.toFixed(1)} px`);
  }
  const M = HP.ANCHORS.MOUTH;
  const m = await page.evaluate((s, ax, ay) => window.__measure(s, ax, ay), C['figure:cough-elbow'].s104, M[0], M[1]);
  const du = m.elbow ? Math.hypot(m.elbow[0] - m.anchor[0], m.elbow[1] - m.anchor[1]) / m.unitPx : Infinity;
  ok(du <= 4, `rule 5 cough-elbow: the elbow is ${du.toFixed(1)} units from the MOUTH (> 4)`);
  out.push(`cough-elbow elbow ${du.toFixed(1)} u`);
  return out;
}

/** rule 6 — part floors at the shipped size */
async function floorRule(page, C) {
  let small = [];
  for (const [id, it] of Object.entries(C)) {
    if (it.kind === 'figure' && !COMMON.baseD3.includes(it.key) && !F3_FIG.has(it.key)) continue;   // F4 / F5-only poses: their faces set the size (Phase E)
    const boxes = await page.evaluate((s, px) => window.__partBoxes(s, px), it.sShip, it.ship);
    for (const b of boxes) {
      if (THIN_OK[b.part]) continue;
      const side = Math.min(b.w, b.h);
      if (side < 8 - 0.05) small.push(`${id} ${b.part} ${side.toFixed(1)} px`);
    }
  }
  small = [...new Set(small)];
  for (const s of small) ok(false, `rule 6: part under 8 px on its short side at the shipped size: ${s}`);
  return small.length;
}

/** rule 8 (F2, design §3 P15) — rinse-brush shows >= 3 foam bubbles FALLING below the bristles (a foam-free brush under
 * the tap reads as "wet the brush first", a contested BEFORE step: two right answers) */
function brushRules(C) {
  const svg = C['brush:rinse-brush'].sShip;
  const g = /<g data-lcs-part="bubbles">([\s\S]*?)<\/g>/.exec(svg);
  const cys = g ? [...g[1].matchAll(/<circle [^>]*cy="([\d.]+)"/g)].map((m) => +m[1]) : [];
  // the brush is drawn at translate(20 42): its bristles end at unit y 42 + 12 = 54
  ok(cys.length >= 3 && cys.every((y) => y > 54), `rule 8: rinse-brush draws ${cys.length} foam bubbles below the bristles (>= 3: without foam it reads as wetting the brush first, a BEFORE step)`);
}
/**
 * rule 3b (FIX ROUND 2, the F1 wet / rinse swap) — rinse carries >= 3 SUDS bubbles whose centres lie inside a drawn
 * hand box (the soap being washed off), and NO other F1 state draws suds (wet = clean hands under the water).
 * rule 9 (FIX ROUND 2, F2) — dirty-teeth draws plaque and no sparkle, clean-teeth sparkle and no plaque, neither a
 * brush; the spit card's brush lies BELOW the head (laid down: brushing is over), never held up (a pause DURING).
 */
async function sudsAndStateRules(page, C) {
  const px = 176;
  for (const st of COMMON.handSteps) {
    const svg = C[`hands:${st}`].sShip;
    const g = /<g data-lcs-part="suds">([\s\S]*?)<\/g>/.exec(svg);
    const cs = g ? [...g[1].matchAll(/cx="([\d.]+)" cy="([\d.]+)"/g)].map((m) => [+m[1] * px / 100, +m[2] * px / 100]) : [];
    if (st !== 'rinse') { ok(!cs.length, `rule 3b: hands "${st}" draws soap suds on the hands (only rinse does: wet is clean hands under the water)`); continue; }
    const boxes = (await page.evaluate((s, p) => window.__partBoxes(s, p), svg, px)).filter((b) => /^hand-/.test(b.part));
    const inHand = cs.filter(([x, y]) => boxes.some((b) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h)).length;
    ok(inHand >= 3, `rule 3b: rinse draws ${inHand} soap suds ON the hands (>= 3: without them wet and rinse are one drawing, two right orders)`);
  }
  const has = (svg, p) => new RegExp(`data-lcs-part="${p}"`).test(svg);
  const d = C['brush:dirty-teeth'].sShip, c = C['brush:clean-teeth'].sShip;
  ok(has(d, 'plaque') && !has(d, 'sparkle') && !has(d, 'brush'), 'rule 9: dirty-teeth must draw plaque, no sparkle, no brush');
  ok(has(c, 'sparkle') && !has(c, 'plaque') && !has(c, 'brush'), 'rule 9: clean-teeth must draw sparkle, no plaque, no brush');
  const sb = await page.evaluate((s) => window.__partBoxes(s, 104), C['brush:spit'].sShip);
  const head = sb.find((b) => b.part === 'head'), br = sb.find((b) => b.part === 'brush');
  ok(head && br && br.y + br.h / 2 > head.y + head.h / 2, 'rule 9: the spit card holds the brush up above the head (it reads as a pause DURING brushing; laid down it is AFTER)');
}
async function renderRules(page, C, opts = {}) {
  const r = await renderPass(page, C);
  const mp = await minimalPairs(page, C, r.bits60, MIN_PAIRS, r.jac);
  const vec = await handsRule(page, C, [...COMMON.handSteps]);
  toolRules(C);
  brushRules(C);
  await sudsAndStateRules(page, C);
  const an = await anchorRule(page, C);
  const nf = opts.floors === false ? 0 : await floorRule(page, C);
  for (const [id, it] of Object.entries(C)) staticCheck(it.sShip, id);
  return { worst: r.worst, pending: r.pending, mp, vec, an, nf };
}

/* ================================================================== poisons */
function clone(C) { const o = {}; for (const [k, v] of Object.entries(C)) o[k] = { ...v }; return o; }
function patch(C, id, fn) { for (const f of ['s60', 'sShip', 's104']) C[id][f] = fn(C[id][f]); }
async function poisons(page, C) {
  const ctl = K.control('PP0 correct primitive (control)', await K.collect(() => renderRules(page, C, { floors: false })));
  // PP1 cough-elbow drawn as a copy of cough-open
  let P = clone(C);
  for (const f of ['s60', 'sShip', 's104']) P['figure:cough-elbow'][f] = C['figure:cough-open'][f].replace('data-lcs-pose="cough-open"', 'data-lcs-pose="cough-elbow"');
  K.judge('PP1 cough-elbow = a copy of cough-open', await K.collect(() => renderRules(page, P, { floors: false })), /rule 2 figure:cough-elbow \/ figure:cough-open: differ by/, ctl);
  // PP2 rinse without its falling bubbles
  P = clone(C);
  patch(P, 'hands:rinse', (s) => s.replace(/<g data-lcs-part="bubbles">[\s\S]*?<\/g>/, ''));
  K.judge('PP2 rinse without the falling bubbles', await K.collect(() => renderRules(page, P, { floors: false })), /rule 3: hands "rinse" and "wet" draw the same state|rule 3: hands "wet" \/ "rinse" differ/, ctl);
  // PP3 a toothbrush added to brush-teeth
  P = clone(C);
  const brush = /<g data-lcs-glyph="toothbrush">[\s\S]*<\/g>(?=<\/svg>)/.exec(C['tool:toothbrush'].sShip)[0];
  patch(P, 'figure:brush-teeth', (s) => s.replace(/<\/g><\/svg>$/, `<g transform="translate(55 5) scale(0.3)">${brush}</g></g></svg>`));
  K.judge('PP3 a toothbrush inside brush-teeth', await K.collect(() => renderRules(page, P, { floors: false })), /rule 4: the brush-teeth figure (contains a whole tool glyph|draws part)/, ctl);
  // PP4 bubbles added to the soap
  P = clone(C);
  patch(P, 'tool:soap', (s) => s.replace(/<\/g><\/svg>$/, `<g data-lcs-part="bubbles"><circle cx="30" cy="36" r="4" fill="${tokens.color.white}" stroke="${tokens.color.ink}" stroke-width="1.8"/><circle cx="40" cy="30" r="3" fill="${tokens.color.white}" stroke="${tokens.color.ink}" stroke-width="1.8"/></g></g></svg>`));
  K.judge('PP4 bubbles on the soap', await K.collect(() => renderRules(page, P, { floors: false })), /rule 4: the soap (carries the forbidden mark "bubbles"|draws a round mark)/, ctl);
  // PP5 the comb hand moved to the MOUTH
  P = clone(C);
  patch(P, 'figure:comb-hair', (s) => s.replace(/(<g data-lcs-part="arm-near">[\s\S]*?)(<\/g>)/, (m, inner, close) => inner
    .replace(/points="53,31 ([\d.]+),([\d.]+) ([\d.]+),([\d.]+)"/g, 'points="53,31 $1,$2 61,19"')
    .replace(/cx="[\d.]+" cy="[\d.]+" r="4.5"/, 'cx="61" cy="19" r="4.5"') + close));
  K.judge('PP5 the comb hand at the mouth', await K.collect(() => renderRules(page, P, { floors: false })), /rule 5 comb-hair: the near hand is/, ctl);
  // PP6 a codeRed fill inside a pictogram
  P = clone(C);
  patch(P, 'figure:comb-hair', (s) => s.replace(`fill="${tokens.color.ink}"`, `fill="${tokens.codeColors.codeRed}"`));
  K.judge('PP6 a codeRed fill', await K.collect(() => renderRules(page, P, { floors: false })), /no coral, no code colours/, ctl);
  // PP8 (fix round 1) the bed back in the sleep plaque · PP9 a sneeze spray on the blow-nose child
  P = clone(C);
  const bed = /<g data-lcs-glyph="bed">[\s\S]*<\/g>(?=<\/svg>)/.exec(C['tool:bed'].sShip)[0];
  patch(P, 'figure:sleep', (s) => s.replace(/<\/g><\/svg>$/, `<g transform="translate(10 50) scale(0.5)">${bed}</g></g></svg>`));
  K.judge('PP8 the bed back in the sleep plaque', await K.collect(() => renderRules(page, P, { floors: false })), /rule 4: the sleep figure (contains a whole tool glyph|draws part)/, ctl);
  P = clone(C);
  patch(P, 'figure:blow-nose', (s) => s.replace(/<\/g><\/svg>$/, '<g data-lcs-part="spray"><circle cx="72" cy="20" r="2.2" fill="#3A3530"/><circle cx="78" cy="18" r="2.2" fill="#3A3530"/></g></g></svg>'));
  K.judge('PP9 a sneeze spray on the blow-nose child', await K.collect(() => renderRules(page, P, { floors: false })), /rule 4b: the blow-nose figure draws "spray"/, ctl);
  // PP10 / PP10b / PP11 / PP12 (fix round 2) — each direction of each new rule
  P = clone(C);
  patch(P, 'hands:rinse', (s) => s.replace(/<g data-lcs-part="suds">[\s\S]*?<\/g>/, ''));
  K.judge('PP10 rinse without the suds on its hands', await K.collect(() => renderRules(page, P, { floors: false })), /rule 3b: rinse draws 0 soap suds/, ctl);
  P = clone(C);
  const suds = /<g data-lcs-part="suds">[\s\S]*?<\/g>/.exec(C['hands:rinse'].sShip)[0];
  patch(P, 'hands:wet', (s) => s.replace(/<\/g><\/svg>$/, `${suds}</g></svg>`));
  K.judge('PP10b suds drawn on the wet hands', await K.collect(() => renderRules(page, P, { floors: false })), /rule 3b: hands "wet" draws soap suds/, ctl);
  P = clone(C);
  patch(P, 'brush:spit', (s) => s.replace(/(<g data-lcs-part="brush")/, '<g transform="translate(-10 -62)">$1').replace(/(<g data-lcs-part="drops">)/, '</g>$1'));
  K.judge('PP11 the spit brush held up above the head again', await K.collect(() => renderRules(page, P, { floors: false })), /rule 9: the spit card holds the brush up/, ctl);
  P = clone(C);
  const plaque = /<g data-lcs-part="plaque">[\s\S]*?<\/g>/.exec(C['brush:dirty-teeth'].sShip)[0];
  patch(P, 'brush:clean-teeth', (s) => s.replace(/<\/g><\/svg>$/, `${plaque}</g></svg>`));
  K.judge('PP12 plaque drawn on the clean tooth', await K.collect(() => renderRules(page, P, { floors: false })), /rule 9: clean-teeth must draw sparkle, no plaque/, ctl);
  // PP7 (design P15) rinse-brush without its foam
  P = clone(C);
  patch(P, 'brush:rinse-brush', (s) => s.replace(/<g data-lcs-part="bubbles">[\s\S]*?<\/g>/, ''));
  K.judge('PP7 rinse-brush without foam (P15)', await K.collect(() => renderRules(page, P, { floors: false })), /rule 8: rinse-brush draws 0 foam bubbles/, ctl);
}

/* ================================================================== sheets (the human read) */
async function sheets(page) {
  const cell = (svg, lab) => `<div style="display:inline-block;margin:5px;text-align:center;vertical-align:top;background:#FBF3E4;border:2.5px solid #146B5E;border-radius:12px;padding:5px;font:11px sans-serif">${svg}<div>${lab}</div></div>`;
  const rows = [];
  for (const px of [64, 88, 132]) rows.push(`<div style="font:bold 12px sans-serif">figures ${px} px</div>` + HP.POSES.map((p) => cell(HP.habitFigure({ pose: p, px }).svg, p)).join(''));
  for (const px of [88, 124]) rows.push(`<div style="font:bold 12px sans-serif">tools ${px} px (ground)</div>` + HP.TOOLS.map((t) => cell(HP.habitTool({ kind: t, px, ground: true }).svg, t)).join(''));
  rows.push('<div style="font:bold 12px sans-serif">F1 hands 176 px + F3 soap pair</div>' + [...Object.keys(HP.HAND_STATES), 'hands-soap', 'hands-dirty', 'hands-water-only'].map((s) => cell(HP.handsView({ state: s, px: 176 }).svg, s)).join(''));
  rows.push('<div style="font:bold 12px sans-serif">F2 brush cards 104 px + F3 two figures 124 px</div>' + HP.BRUSH_KINDS.map((k) => cell(HP.brushCard({ kind: k, px: 104 }).svg, k)).join('') + HP.TWO_POSES.map((p) => cell(HP.twoFigures({ pose: p, px: 124 }).svg, p)).join(''));
  return H.sheet(page, 'habit-pictogram-sheet', rows.join('<br>'));
}

async function main() {
  const C = catalogue();
  let n = 0;
  for (const [id, it] of Object.entries(C)) { staticCheck(it.sShip, id); staticCheck(it.s60, id); n++; }
  console.log(`node pass: ${n} drawings parsed`);
  const res = await H.withBrowser(async (page) => {
    await page.setViewport({ width: 1500, height: 1000, deviceScaleFactor: 1 });
    const r = await renderRules(page, C);
    await poisons(page, C);
    const pngs = process.argv.includes('--no-sheets') ? [] : await sheets(page);
    return { ...r, pngs };
  });
  console.log('rule 1 worst 1-bit Jaccard per co-occurrence set (< 0.72):');
  for (const [s, w] of Object.entries(res.worst)) console.log(`  ${s}: ${w.j.toFixed(3)} (${w.pair})`);
  console.log('rule 1 PENDING (Phase-E face art, ratchet): ' + (res.pending.length ? res.pending.join(' · ') : 'none'));
  console.log('rule 2 minimal pairs:\n  ' + res.mp.join('\n  '));
  console.log('rule 3 hands vectors: ' + JSON.stringify(res.vec));
  console.log('rule 5 anchors: ' + res.an.join(' · '));
  console.log(`rule 6: ${res.nf} parts under the floor`);
  if (res.pngs.length) console.log('sheets:\n  ' + res.pngs.join('\n  '));
  console.log('poisons:\n' + K.log.join('\n'));
  if (K.fails.length) console.log('FAILS:\n  ' + K.fails.slice(0, 60).join('\n  '));
  const pass = !K.fails.length && K.killed === K.total;
  console.log(pass ? `PASS (${K.assertions} assertions, ${K.killed}/${K.total} poisons killed)` : `FAIL (${K.fails.length} findings, ${K.killed}/${K.total} poisons killed)`);
  return pass;
}
if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main, catalogue, parseHands, MIN_PAIRS, THIN_OK, RULE1_SCOPE, RULE1_PENDING };
