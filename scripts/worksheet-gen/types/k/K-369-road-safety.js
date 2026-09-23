/**
 * K-369 — Road Safety: Read the Traffic Light (nt10-E; family key
 * `road-safety`; K; science; no CCSS / NGSS standard exists — no
 * educationalAlignment). Design: docs/worksheet-gen/b5-designs/
 * K-369-road-safety.md §2 (base) + §5 (data + gates), under _BUILD-BRIEF.md;
 * every ruling and why in _work/K-369-critic.md.
 *
 * "Stop or go? Six little streets." Two columns of three side-view street
 * strips. In the middle of each strip ONE traffic light stands on its pole with
 * exactly one lamp lit; on its left the waiting outcome (a person standing on
 * the kerb, or a car waiting at the stop line), on its right the going outcome
 * (a person walking on the zebra, or a car driving on), each under its word
 * pill. The child circles the side the lit lamp tells THAT road user to take.
 * Stop is always left, go always right, so the page is spent reading lamps.
 * Whose light it is: the outcome pictures (walkers = the pedestrian's light,
 * cars = the car's light), backed by lamp count (3 vs 2), lamp shape (circle vs
 * rounded square) and head height (the pedestrian head sits >= 40 px lower).
 *
 * THEMELESS, 0 library pictures (§2 "NOT used": every candidate was opened and
 * rejected). No unitAxis (the sign set is per-locale DATA, not a fan).
 *
 * THE RULE THAT LOCKS THE TYPE: every answer is re-derived from the DRAWN
 * geometry — the lit lamp is the one the ray group radiates from, its index is
 * its rank in the y order of the lamp centres, and the answer is
 * lightRule[kind][index]. Never from a fill, never from `data-lcs-on` (the
 * gate's PR5 swaps those stamps and verify() must stay green). Greyscale law
 * (Rec. 601 luma of the tokens): codeRed 96 = codeBlue 96, codeGreen 111 — so
 * POSITION (lamp index, stop-left / go-right), POSE (standing / walking / hand)
 * and RAYS carry every answer; colour only reinforces.
 *
 * Difficulty is a CONFIG; every guard keys on the resolved config, never on the
 * level index (poison PR11):
 *   layout     'fork' (the base; a Phase-E face carries its own `mode`)
 *   streets    strips on the page (d1 4 in 2 x 2, d2/d3 6 in 3 x 2)
 *   ped / car  actors (d1 4 / 0 — the perspective switch is what d2 teaches)
 *   amber      true = a car stop may be the lit AMBER lamp, only where the
 *              locale's amberMeans === 'stop' (en: get ready to stop, 2026-09-23; en d3 is
 *              the d2 config minus the pills, recorded, never published)
 *   lampD      64 / 56 / 56 (the K element floor is 56)
 *   pillWords  on / on / off
 * Layout d2 (design §2, re-measured in the render): strip 330 x 214 (the band 12, not the design's
 * 10: a 10 px zebra read as a dashed line), columns 330 | 15 | 330 = 675, rows
 * 3 x minmax(214, 1fr) + 2 x 12 = 666 min <= 677 (the 4-line fi title);
 * d1 2 x minmax(300, 1fr) + 12 = 612 min. The rows STRETCH to the body and the
 * slack goes into the light POLES (sibling-review ruling 2026-09-23: fixed rows
 * with space-evenly left 40-55 px empty bands; verify() now asserts the largest
 * empty band between consecutive drawn blocks <= 40 px). With cars on the page
 * every ROW pairs one car strip with one pedestrian strip, so the height cue
 * (pedestrian head >= 40 px below the car head in the same row) is always
 * side by side.
 *
 * Refusals (throw, never a filler): an unauthored locale (lib/b5-common.js
 * bank()); a block whose pedLight.stop is unset (pt until its panel sets it —
 * validator rule 5; there is no pt fallback page); a chip word missing; a
 * config that cannot be composed.
 */
'use strict';
const { bank } = require('../../lib/b5-common.js');
const C5 = require('../../templates/components-b5.js');
const { COMMON } = require('../../data/b5/road-safety.js');

const LIGHT_RULE = COMMON.lightRule;
const BANNED_ORDERS = new Set(['SSSGGG', 'GGGSSS', 'SGSGSG', 'GSGSGS', 'SSGG', 'GGSS', 'SGSG', 'GSGS']);
const TRIES = 500;

/** strip geometry per resolved config */
function geomFor(d) {
  if (d.streets === 4) {
    return { cols: 2, w: 330, h: 300, gutter: 15, rowGap: 12, band: 12, cells: [0, 110, 110, 110, 220, 110], walkerH: 130, carW: 110, pedTop: 0, pillW: 110, pillGap: 8 };
  }
  return { cols: 2, w: 330, h: 214, gutter: 15, rowGap: 12, band: 12, cells: [0, 110, 115, 100, 220, 110], walkerH: 84, carW: 110, pedTop: 54, pillW: 110, pillGap: 8 };
}

/** The lit lamp index for (actor, side) under the locale's ped light + the amber option. */
function litIndex(actor, side, pedLamps, useAmber) {
  if (actor === 'car') return side === 'go' ? 2 : (useAmber ? 1 : 0);
  return side === 'go' ? pedLamps - 1 : 0;
}

/* =====================================================================================================
 * THE FIVE FACES (Phase E, 2026-09-23; design §3). All CODE faces on the ONE knob `mode`; each is
 * locale-neutral like the base (the seed carries no locale: only the literals and the locale's sign
 * table change). Every face answer is re-derived by faceVerify() from the DRAWN geometry — the ray
 * group and the lamp's y rank (F1), the sight chevron's polygon (F2), the sign's parsed outline +
 * glyph + printed text against the locale table stamped on the root (F3-F5) — never from a fill.
 *   F1 colour-lights  K-373   colour the ray-marked lamp the colour its POSITION shines (no key)
 *   F2 crossing-steps K-374   number the national crossing routine, drawn from BEHIND the child
 *   F3 sign-meaning   G1-384  join each of the country's regulation signs to its meaning
 *   F4 sign-kinds     G2-360  write each lettered sign's letter into its meaning-class bin
 *   F5 sign-quiz      G2-361  read a situation and circle the one sign of three that fits
 * ===================================================================================================== */
const { trafficLight } = require('../../primitives/traffic-light.js');
const { roadSign } = require('../../primitives/road-sign.js');
const { geometryKey } = require('../../data/b5/road-safety.js');
const PAGE_W = 675;
const COLOUR_OF = { car: ['R', 'A', 'G'], ped: ['R', 'G'] };      // the key only (never printed): red, amber, green

function faceStrings(block, mode, loc) {
  const s = block.strings && block.strings[mode];
  if (!s || typeof s.title !== 'string' || !s.title.trim() || typeof s.instruction !== 'string' || !s.instruction.trim()) throw new Error(`K-369 ${loc}: the bank has no strings.${mode} (refuse)`);
  return s;
}
function signSpec(block, role, loc) {
  const s = block.signs && block.signs[role];
  if (!s) throw new Error(`K-369 ${loc}: no signed sign for role "${role}" (refuse; never another locale's sign)`);
  return s;
}
/** the words printed inside a sign (`|` = a line break) */
const signWords = (sign) => String(sign.text || '').split(/[|\s]+/).filter(Boolean).map((w) => w.normalize('NFC').toLowerCase());
const hasWord = (text, w) => new RegExp(`(?<!\\p{L})${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'iu').test(String(text).normalize('NFC').toLowerCase());
/** a sequence whose every element repeats the one `p` places earlier (012012, a row copied onto the next) */
const periodic = (seq, p) => seq.length >= 2 * p && seq.every((x, i) => i < p || x === seq[i - p]);
const adjacentEqual = (seq) => seq.some((x, i) => i > 0 && x === seq[i - 1]);
/** the table faceVerify re-derives a role from: role -> {key (shape + rim-vs-fill), glyph, text} */
const specTable = (block, roles, loc) => Object.fromEntries(roles.map((r) => { const s = signSpec(block, r, loc); return [r, { key: geometryKey(s), glyph: s.glyph, text: String(s.text || ''), cls: s.class }]; }));
/** a sign's drawn size for a target max extent (a plate is 1.2 s tall, a triangle 0.87 s) */
const sForExtent = (shape, ext) => Math.round(shape === 'plateCircle' ? ext / 1.2 : ext);

/* ---------------------------------------------------------------- F1 colour-lights */
function buildColourLights(block, d, loc, rng, seam) {
  for (const k of ['lights', 'perRow', 'car', 'ped', 'lampD', 'minPole', 'rowGap']) if (!Number.isInteger(d[k]) || d[k] < 0) throw new Error(`K-369 colour-lights: config ${k} is ${d[k]}`);
  if (d.lights !== 6 || d.perRow !== 3) throw new Error(`K-369 colour-lights: ${d.lights} lights in rows of ${d.perRow} (6 in 2 x 3)`);
  if (d.lampD < 56) throw new Error(`K-369 colour-lights: lampD ${d.lampD} < the K floor 56`);
  if (d.fill !== 'none' || d.onMark !== 'rays') throw new Error('K-369 colour-lights: every lamp is unfilled and the on lamp is marked by rays only');
  const strings = faceStrings(block, 'colour-lights', loc);
  // the US walker is lunar WHITE on a dark lens — not a crayon colour — so a MUTCD page draws car lights only
  const carOnly = block.convention === 'mutcd' && d.mutcdCarOnly === true;
  const nCar = carOnly ? d.lights : d.car, nPed = carOnly ? 0 : d.ped;
  if (nCar + nPed !== d.lights) throw new Error(`K-369 colour-lights: car ${nCar} + ped ${nPed} ≠ ${d.lights}`);
  const amberTok = block.amber && block.amber.token;
  if (!['codeYellow', 'codeOrange'].includes(amberTok)) throw new Error(`K-369 ${loc}: amber.token ${amberTok}`);
  const pl = block.pedLight || {};
  if (nPed && !['standing', 'hand'].includes(pl.stop)) throw new Error(`K-369 ${loc}: pedLight.stop is ${JSON.stringify(pl.stop)} — the ${loc} panel must SET it (refuse; no fallback page)`);
  const rows = d.lights / d.perRow;
  let plan = seam && seam.plan ? seam.plan : null;
  for (let t = 0; t < TRIES && !plan; t++) {
    const actors = Array(d.lights).fill('car');
    if (nPed) {
      if (nPed % rows) throw new Error(`K-369 colour-lights: ${nPed} pedestrian lights cannot spread one-per-row over ${rows} rows`);
      for (let r = 0; r < rows; r++) for (const c of rng.sample([0, 1, 2], nPed / rows)) actors[r * d.perRow + c] = 'ped';
    }
    // every lamp position 0 / 1 / 2 at least once; a full second set when there are 6, else random extras
    const carIdx = Array.from({ length: nCar }, (_, i) => (i < 3 ? i : (nCar >= 6 ? i % 3 : rng.int(0, 2))));
    const carOn = rng.shuffle(carIdx);
    const pedOn = rng.shuffle(Array.from({ length: nPed }, (_, i) => i % 2));
    let ci = 0, pi = 0;
    const on = actors.map((a) => (a === 'car' ? carOn[ci++] : pedOn[pi++]));
    const keys = actors.map((a, i) => a + on[i]);
    if (adjacentEqual(keys) || periodic(keys, d.perRow)) continue;
    if (keys.some((k, i) => i >= d.perRow && k === keys[i - d.perRow])) continue;           // no column lit at one position in both rows
    plan = { actors, on };
  }
  if (!plan) throw new Error(`K-369 ${loc}: no colour-lights composition in ${TRIES} tries (refuse)`);
  const D = d.lampD;
  const carH = 3 * D + 12 + 16, pedH = 2 * D + 6 + 24;
  const tallest = plan.actors.includes('car') ? carH : pedH;
  const band = 12, minH = tallest + d.minPole + band;
  const cxs = [0, 1, 2].map((c) => PAGE_W * (2 * c + 1) / (2 * d.perRow));
  const streets = [];
  for (let r = 0; r < rows; r++) {
    const items = [];
    for (let c = 0; c < d.perRow; c++) {
      const i = r * d.perRow + c, a = plan.actors[i];
      const light = a === 'car' ? { kind: 'car', lamps: 3, on: plan.on[i], amberToken: amberTok, lampD: D } : { kind: 'ped', lamps: 2, on: plan.on[i], pedStyle: 'vienna', pedStop: pl.stop, lampD: D };
      items.push({ light, cx: cxs[c] });
    }
    streets.push(C5.rsLightStreet({ items, w: PAGE_W, minH, band, tallest }));
  }
  const answers = plan.actors.map((a, i) => (a === 'car' ? COLOUR_OF.car[plan.on[i]] : COLOUR_OF.ped[plan.on[i]])).join('');
  const inner = `<div style="flex:1 1 auto;align-self:center;width:${PAGE_W}px;display:grid;grid-template-rows:repeat(${rows},minmax(${minH}px,1fr));row-gap:${d.rowGap}px">` +
    streets.map((s) => `<div style="display:flex">${s}</div>`).join('') + '</div>';
  const cfg = { mode: 'colour-lights', lights: d.lights, perRow: d.perRow, car: nCar, ped: nPed, lampD: D, amberToken: amberTok, convention: block.convention };
  return { bodyHtml: C5.rsFace({ mode: 'colour-lights', stamps: { cfg, answers }, inner }), meta: { mode: 'colour-lights', answers, actors: plan.actors.join(','), title: strings.title } };
}

/* ---------------------------------------------------------------- F2 crossing-steps */
const STEP_LAYOUT = { 4: [2, 2], 5: [3, 2], 6: [3, 3] };
function buildCrossingSteps(block, d, loc, rng, seam) {
  const strings = faceStrings(block, 'crossing-steps', loc);
  const steps = block.steps;
  if (!Array.isArray(steps) || !STEP_LAYOUT[steps.length]) throw new Error(`K-369 ${loc}: steps ${JSON.stringify(steps)} (4-6 cards)`);
  if (steps[0] !== 'stop-kerb' || steps[steps.length - 1] !== 'walk-across') throw new Error(`K-369 ${loc}: steps must start stop-kerb and end walk-across`);
  for (const k of steps) if (!COMMON.stepKinds.includes(k)) throw new Error(`K-369 ${loc}: step "${k}"`);
  if (d.cards !== steps.length) throw new Error(`K-369 ${loc}: the face prints ${d.cards} cards, the ${loc} routine has ${steps.length} steps (refuse; the row sets cards per routine)`);
  for (const k of ['offBy', 'cardW', 'figH', 'minFrameH']) if (!(d[k] > 0)) throw new Error(`K-369 crossing-steps: config ${k} is ${d[k]}`);
  const n = steps.length;
  // a look-left AFTER a look-right is drawn as its own frame (the ↶ swing back): two identical frames made
  // the routine's steps 2 and 4 undecidable from the page (coordinator review 2026-09-23)
  const kinds = steps.map((k, i) => (k === 'look-left' && steps.slice(0, i).includes('look-right') ? 'look-left-again' : k));
  if (new Set(kinds).size !== kinds.length) throw new Error(`K-369 ${loc}: the routine ${steps.join(',')} repeats a frame that cannot be drawn differently (refuse)`);
  let order = seam && seam.plan ? seam.plan.order : null;
  for (let t = 0; t < TRIES && !order; t++) {
    const p = rng.shuffle(Array.from({ length: n }, (_, i) => i));
    const printed = p.map((i) => kinds[i]);
    const displaced = printed.filter((k, i) => k !== kinds[i]).length;
    if (displaced < d.offBy) continue;
    if (printed.join() === kinds.slice().reverse().join()) continue;
    order = p;
  }
  if (!order) throw new Error(`K-369 ${loc}: no crossing-steps order in ${TRIES} tries (refuse)`);
  const printed = order.map((i) => kinds[i]);
  const [r1] = STEP_LAYOUT[n];
  const card = (k) => C5.rsCrossingCard({ step: k, w: d.cardW, figH: d.figH, minFrameH: d.minFrameH, box: { w: 64, h: 60 } });
  const rowHtml = (list) => `<div style="display:flex;justify-content:center;gap:${d.gap}px">${list.map(card).join('')}</div>`;
  const minRow = d.minFrameH + 10 + 60 + 12 + 4;
  const inner = `<div style="flex:1 1 auto;align-self:center;width:${PAGE_W}px;display:grid;grid-template-rows:repeat(2,minmax(${minRow}px,1fr));row-gap:${d.rowGap}px">` +
    rowHtml(printed.slice(0, r1)) + rowHtml(printed.slice(r1)) + '</div>';
  const cfg = { mode: 'crossing-steps', cards: n, offBy: d.offBy, figH: d.figH };
  return { bodyHtml: C5.rsFace({ mode: 'crossing-steps', stamps: { cfg, key: kinds.join(','), perRow: STEP_LAYOUT[n] }, inner }), meta: { mode: 'crossing-steps', printed: printed.join(','), title: strings.title } };
}

/* ---------------------------------------------------------------- F3 sign-meaning */
function buildSignMeaning(block, d, loc, rng, seam) {
  const strings = faceStrings(block, 'sign-meaning', loc);
  const roles = block.setG1 || [];
  if (roles.length !== d.pairs || new Set(roles).size !== d.pairs) throw new Error(`K-369 ${loc}: setG1 has ${roles.length} roles (${d.pairs} distinct)`);
  const table = specTable(block, roles, loc);
  for (const r of roles) {
    const m = block.meanings && block.meanings[r];
    if (typeof m !== 'string' || !m.trim()) throw new Error(`K-369 ${loc}: no meaning for ${r} (refuse)`);
    for (const w of signWords(signSpec(block, r, loc))) if (hasWord(m, w)) throw new Error(`K-369 ${loc}: the ${r} meaning prints the sign's own word "${w}" (refuse)`);
  }
  let plan = seam && seam.plan ? seam.plan : null;
  for (let t = 0; t < TRIES && !plan; t++) {
    const left = rng.shuffle(roles.slice());
    const right = rng.shuffle(roles.slice());
    const n = roles.length;
    const shifts = left.map((r, i) => (right.indexOf(r) - i + n) % n);
    if (shifts.filter((s) => s === 0).length > 1) continue;                            // <= 1 pair straight across
    const counts = {}; for (const s of shifts) counts[s] = (counts[s] || 0) + 1;
    if (Math.max(...Object.values(counts)) > 2) continue;                              // no line direction repeated 3 times
    if (right.join() === left.slice().reverse().join()) continue;                      // not the mirror
    plan = { left, right };
  }
  if (!plan) throw new Error(`K-369 ${loc}: no sign-meaning derangement in ${TRIES} tries (refuse)`);
  const s = d.signS;
  const pairs = plan.left.map((r, i) => C5.rsMeaningPair({ signHtml: C5.rsSignOnPost({ spec: signSpec(block, r, loc), s: sForExtent(block.signs[r].shape, s), role: r, minPost: 8 }), meaning: block.meanings[plan.right[i]], meaningRole: plan.right[i], leftW: d.leftW, rightW: d.rightW, minH: d.minH, px: d.px }));
  const col = (side, w) => `<div class="ws-match-col" style="width:${w}px;justify-content:stretch;gap:${d.gap}px">${pairs.map((p) => p[side]).join('')}</div>`;
  const inner = `<div class="ws-match rs-match" style="flex:1 1 auto;padding:6px ${d.padX}px">${col('left', d.leftW)}${col('right', d.rightW)}</div>`;
  const cfg = { mode: 'sign-meaning', pairs: d.pairs, signS: s, convention: block.convention };
  return { bodyHtml: C5.rsFace({ mode: 'sign-meaning', stamps: { cfg, specs: table, left: plan.left.join(','), right: plan.right.join(',') }, inner }), meta: { mode: 'sign-meaning', left: plan.left.join(','), right: plan.right.join(','), title: strings.title } };
}

/* ---------------------------------------------------------------- F4 sign-kinds */
const LETTERS = 'ABCDEFGHIJ';
function buildSignKinds(block, d, loc, rng, seam) {
  const strings = faceStrings(block, 'sign-kinds', loc);
  const classes = block.classes || [];
  if (classes.length < 2 || classes.length > 3) throw new Error(`K-369 ${loc}: ${classes.length} classes (2-3)`);
  const vienna = block.convention === 'vienna';
  const pool = (block.kindsPool || []).filter((r) => {
    const g = geometryKey(signSpec(block, r, loc));
    if (g === 'circle+red') throw new Error(`K-369 ${loc}: kindsPool role ${r} is a filled red disc (red 96 = blue 96 in greyscale; refuse)`);
    return !(vienna && (g === 'octagon' || g === 'triDown'));                            // STOP / yield never on a Vienna sort
  });
  const byClass = {};
  for (const r of pool) (byClass[block.signs[r].class] = byClass[block.signs[r].class] || []).push(r);
  for (const c of classes) if (!((byClass[c.key] || []).length >= 2)) throw new Error(`K-369 ${loc}: class ${c.key} has ${(byClass[c.key] || []).length} drawable signs (< 2; refuse)`);
  // EQUAL GROUP SIZES (coordinator review 2026-09-23, two panels in conflict): every group takes the SAME number of
  // signs and shows that many boxes, so boxes = signs (no "missing sign") AND the box count carries no information
  // (the last group is never solved by counting). The size is the largest equal size the locale's classes can all
  // supply within the page's d.signs cards (2 classes x 4, 3 classes x 2 today); below 2 the face refuses.
  if (!(Number.isInteger(d.signs) && d.signs >= 4)) throw new Error(`K-369 sign-kinds: config signs is ${d.signs}`);
  const perGroup = Math.min(Math.floor(d.signs / classes.length), ...classes.map((c) => byClass[c.key].length));
  if (perGroup < 2) throw new Error(`K-369 ${loc}: sign-kinds equal group size ${perGroup} < 2 (refuse)`);
  if ((perGroup * classes.length) % 2) throw new Error(`K-369 ${loc}: sign-kinds ${perGroup} x ${classes.length} signs cannot fill two card rows (refuse)`);
  let plan = seam && seam.plan ? seam.plan : null;
  for (let t = 0; t < TRIES && !plan; t++) {
    const picked = [];
    for (const c of classes) picked.push(...rng.sample(byClass[c.key], perGroup));
    const order = rng.shuffle(picked);
    const cls = order.map((r) => block.signs[r].class);
    if (cls.some((c, i) => i >= 2 && c === cls[i - 1] && c === cls[i - 2])) continue;   // no class in 3 adjacent cards
    if (periodic(cls, 2) || periodic(cls, 3)) continue;                                // not a pure alternation / a repeated triple
    const rowsOf = [cls.slice(0, order.length / 2), cls.slice(order.length / 2)];
    if (rowsOf.some((row) => row.every((c) => c === row[0]))) continue;
    plan = { order };
  }
  if (!plan) throw new Error(`K-369 ${loc}: no sign-kinds order in ${TRIES} tries (refuse)`);
  const N = plan.order.length;
  const cols = Math.ceil(N / 2);
  const cardW = Math.floor((PAGE_W - (cols - 1) * d.gap) / cols);
  const table = specTable(block, plan.order, loc);
  const cards = plan.order.map((r, i) => C5.rsLetterCard({ letter: LETTERS[i], w: cardW, cls: block.signs[r].class, signHtml: C5.rsSignOnPost({ spec: signSpec(block, r, loc), s: sForExtent(block.signs[r].shape, d.signExt), role: r, minPost: 14 }) }));
  const binW = Math.floor((PAGE_W - (classes.length - 1) * d.gap) / classes.length);
  // each group shows exactly as many boxes as it has signs on the page (a gate-seam plan may be unequal; the
  // composed page never is), in ONE row when it fits the bin
  const perClass = {}; for (const r of plan.order) perClass[block.signs[r].class] = (perClass[block.signs[r].class] || 0) + 1;
  const boxes = Math.max(...Object.values(perClass));
  const binCols = boxes * d.boxW + (boxes - 1) * 10 + 29 <= binW ? boxes : Math.ceil(boxes / 2);
  const bins = classes.map((c) => C5.rsClassBin({ label: c.label, cls: c.key, boxes: perClass[c.key] || 0, cols: binCols, boxW: d.boxW, boxH: d.boxH, w: binW })).join('');
  const inner = `<div style="flex:1 1 auto;align-self:center;width:${PAGE_W}px;display:flex;flex-direction:column;gap:${d.binGap}px;min-height:0">` +
    `<div style="flex:1 1 auto;display:grid;grid-template-columns:repeat(${cols},${cardW}px);justify-content:space-between;grid-template-rows:repeat(2,minmax(${d.cardMinH}px,1fr));row-gap:${d.gap}px">${cards.map((c) => `<div style="display:flex">${c}</div>`).join('')}</div>` +
    `<div style="flex:0 0 auto;display:flex;justify-content:space-between">${bins}</div></div>`;
  const cfg = { mode: 'sign-kinds', signs: N, boxes, bins: classes.map((c) => c.key), labels: classes.map((c) => c.label), convention: block.convention };
  return { bodyHtml: C5.rsFace({ mode: 'sign-kinds', stamps: { cfg, specs: table, order: plan.order.join(',') }, inner }), meta: { mode: 'sign-kinds', order: plan.order.join(','), title: strings.title } };
}

/* ---------------------------------------------------------------- F5 sign-quiz */
function buildSignQuiz(block, d, loc, rng, seam) {
  const strings = faceStrings(block, 'sign-quiz', loc);
  const conf = (a, b) => COMMON.confusable.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  const roles = [...new Set([...(block.setG1 || []), ...(block.kindsPool || [])])].filter((r) => block.signs && block.signs[r]);
  const targets = roles.filter((r) => (block.situations && block.situations[r] || []).length >= 1);
  if (targets.length < d.rows) throw new Error(`K-369 ${loc}: ${targets.length} roles with a situation < ${d.rows} rows (refuse)`);
  const table = specTable(block, roles, loc);
  let plan = seam && seam.plan ? seam.plan : null;
  for (let t = 0; t < TRIES && !plan; t++) {
    const rowsT = rng.sample(targets, d.rows);
    const slots = rng.shuffle(Array.from({ length: d.rows }, (_, i) => i % d.chips));
    if (adjacentEqual(slots) || periodic(slots, d.chips)) continue;
    const rows = [];
    let ok = true;
    for (let i = 0; i < d.rows && ok; i++) {
      const target = rowsT[i];
      const text = rng.pick(block.situations[target]);
      for (const w of signWords(block.signs[target])) if (hasWord(text, w)) throw new Error(`K-369 ${loc}: the ${target} situation prints the sign's own word "${w}" (refuse)`);
      const cands = rng.shuffle(roles.filter((r) => r !== target && !conf(r, target) && !signWords(block.signs[r]).some((w) => hasWord(text, w))));
      const pick = [];
      for (const c of cands) { if (pick.length < d.chips - 1 && !pick.some((p) => conf(p, c))) pick.push(c); }
      if (pick.length < d.chips - 1) { ok = false; break; }
      const tiles = pick.slice();
      tiles.splice(slots[i], 0, target);
      rows.push({ target, text, tiles });
    }
    if (ok) plan = { rows };
  }
  if (!plan) throw new Error(`K-369 ${loc}: no sign-quiz page in ${TRIES} tries (refuse)`);
  const html = plan.rows.map((r) => C5.rsQuizRow({ text: r.text, role: r.target, boxW: d.boxW, tile: d.tile, px: d.px, tiles: r.tiles.map((x) => roadSign({ ...signSpec(block, x, loc), s: sForExtent(block.signs[x].shape, d.signExt), post: null, role: x }).svg) }));
  const inner = `<div style="flex:1 1 auto;align-self:center;width:${PAGE_W}px;display:grid;grid-template-rows:repeat(${d.rows},minmax(${d.minRow}px,1fr));row-gap:${d.gap}px">` +
    html.map((h) => `<div style="display:flex">${h}</div>`).join('') + '</div>';
  const cfg = { mode: 'sign-quiz', rows: d.rows, chips: d.chips, signExt: d.signExt, convention: block.convention };
  const answers = plan.rows.map((r) => r.tiles.indexOf(r.target)).join('');
  return { bodyHtml: C5.rsFace({ mode: 'sign-quiz', stamps: { cfg, specs: table, answers, confusable: COMMON.confusable }, inner }), meta: { mode: 'sign-quiz', answers, targets: plan.rows.map((r) => r.target).join(','), title: strings.title } };
}

const FACE_BUILD = {
  'colour-lights': buildColourLights,
  'crossing-steps': buildCrossingSteps,
  'sign-meaning': buildSignMeaning,
  'sign-kinds': buildSignKinds,
  'sign-quiz': buildSignQuiz,
};

/**
 * The face verify (runs in page.evaluate: no require). Every answer is re-derived from the RENDER:
 * F1 the ray group -> the lamp it radiates from -> its y rank -> the colour of that POSITION, plus
 * "no lamp is filled"; F2 the sight chevron polygon's tip direction; F3-F5 each sign's role from its
 * parsed outline (vertex count / apex / rim-ring ratio) + glyph kind + printed text against the locale
 * table stamped on the root. Then the per-PAGE tells, SPARSE (<= 40 px between consecutive blocks,
 * instruction to footer), floors, and "everything above the footer".
 */
async function faceVerify(page, mode) {
  return page.evaluate(({ mode, CLASSOF }) => {
    const f = [];
    const root = document.querySelector('[data-ws-content][data-lcs-road-safety]');
    const J = (k) => { try { return JSON.parse(root.dataset[k]); } catch (e) { return null; } };
    const cfg = J('lcsCfg');
    if (!cfg || cfg.mode !== mode) return [`the root cfg stamp is not ${mode}`];
    const R = (e) => e.getBoundingClientRect();
    const center = (r) => ({ x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 });
    const periodic = (seq, p) => seq.length >= 2 * p && seq.every((x, i) => i < p || x === seq[i - p]);
    const adjacentEqual = (seq) => seq.some((x, i) => i > 0 && x === seq[i - 1]);
    /** reading order: rows top-down, left-right in a row; the optional rowOf(el) names the row container (F1 lights sit at two heights in one street) */
    const readingOrder = (els, rowOf) => {
      const list = els.map((el) => ({ el, r: rowOf ? { top: R(rowOf(el)).top, left: R(el).left } : R(el) }));
      const rows = [];
      for (const o of list.sort((a, b) => a.r.top - b.r.top)) { const row = rows.find((rw) => Math.abs(rw.top - o.r.top) < 8); if (row) row.items.push(o); else rows.push({ top: o.r.top, items: [o] }); }
      return rows.flatMap((rw) => rw.items.sort((a, b) => a.r.left - b.r.left).map((o) => o.el));
    };
    /* the sign's geometry key, parsed from its drawn outline (never from the data-lcs-sign-* stamps) */
    const shapeKey = (g) => {
      if (g.querySelector('[data-lcs-sign-part="plate"]')) return 'plateCircle';
      const rim = g.querySelector('[data-lcs-sign-part="rim"]') || g.querySelector('[data-lcs-sign-part="field"]');
      if (!rim) return '?';
      const tag = rim.tagName.toLowerCase();
      if (tag === 'circle') {
        const field = g.querySelector('[data-lcs-sign-part="field"]');
        if (!field || field === rim) return 'circle+red';
        const Ro = +rim.getAttribute('r'), ri = +field.getAttribute('r');
        return (Ro - ri) / Ro >= 0.15 ? 'circle+rim' : 'circle+blue';
      }
      if (tag === 'rect') return 'square';
      const dd = rim.getAttribute('d') || '';
      const nums = (s) => (s.match(/-?\d+(\.\d+)?/g) || []).map(Number);
      let V = [];
      if (/Q/.test(dd)) for (const m of dd.matchAll(/Q\s*(-?[\d.]+)[ ,](-?[\d.]+)/g)) V.push([+m[1], +m[2]]);
      else { const n = nums(dd); for (let i = 0; i + 1 < n.length; i += 2) V.push([n[i], n[i + 1]]); }
      if (V.length === 8) return 'octagon';
      if (V.length === 5) return 'pentagon';
      if (V.length === 4) { const xs = V.map((v) => v[0]), mid = (Math.min(...xs) + Math.max(...xs)) / 2; return V.some((v) => Math.abs(v[0] - mid) < 1e-3) ? 'diamond' : 'polygon-4'; }
      if (V.length === 3) { const ys = V.map((v) => v[1]); const minY = Math.min(...ys); return ys.filter((y) => Math.abs(y - minY) < 1e-3).length === 1 ? 'triUp' : 'triDown'; }
      return `polygon-${V.length}`;
    };
    const glyphOf = (g) => { const x = g.querySelector('[data-lcs-glyph-kind]'); return x ? x.getAttribute('data-lcs-glyph-kind') : (g.querySelector('[data-lcs-sign-part="text"]') ? 'text' : 'none'); };
    const textOf = (g) => [...g.querySelectorAll('[data-lcs-sign-part="text"]')].map((t) => t.textContent).join('|');
    const specs = J('lcsSpecs') || {};
    /** a drawn sign -> the ONE role of the table it matches (shape key + glyph + printed text) */
    const roleOf = (g, where) => {
      const k = shapeKey(g), gl = glyphOf(g), tx = textOf(g);
      const hits = Object.entries(specs).filter(([, s]) => s.key === k && s.glyph === gl && s.text === tx).map(([r]) => r);
      if (hits.length !== 1) { f.push(`${where}: the drawn sign (${k} / ${gl} / "${tx}") matches ${hits.length} roles of the table`); return null; }
      const stamp = g.getAttribute('data-lcs-role');
      if (stamp !== hits[0]) f.push(`${where}: the drawn sign reads as ${hits[0]} but is stamped ${stamp}`);
      return hits[0];
    };
    const signExtent = (g) => { const svg = g.closest('svg'); const r = R(svg); return Math.max(r.width, r.height); };
    let sparseSel = '';

    if (mode === 'colour-lights') {
      sparseSel = '[data-lcs-light-part="housing"], .rs-pole, .rs-band svg';
      const lights = readingOrder([...root.querySelectorAll('[data-lcs-signal][data-lcs-light]')], (el) => el.closest('.rs-lstreet'));
      if (lights.length !== cfg.lights) f.push(`${lights.length} lights ≠ ${cfg.lights}`);
      const keys = [], cols = [];
      const seen = { car: new Set(), ped: new Set() };
      lights.forEach((L, i) => {
        const what = `light ${i + 1}`;
        const kind = L.dataset.lcsLight;
        const lamps = [...L.querySelectorAll('[data-lcs-lamp]')].map((g) => ({ g, r: R(g) })).sort((a, b) => a.r.top - b.r.top);
        if (kind === 'car' && lamps.length !== 3) f.push(`${what}: a car light with ${lamps.length} lamps`);
        if (kind === 'ped' && lamps.length !== 2) f.push(`${what}: a pedestrian light with ${lamps.length} lamps (2 on this face)`);
        for (const lp of lamps) if (Math.min(lp.r.width, lp.r.height) < Math.max(56, cfg.lampD) - 0.6) f.push(`${what}: lamp ${lp.r.width.toFixed(0)} px < ${cfg.lampD}`);
        // nothing is coloured in: every lamp face and every pedestrian glyph part is white
        for (const lp of lamps) lp.g.querySelectorAll('circle, rect, path').forEach((s) => { const fl = (s.getAttribute('fill') || '').toUpperCase(); if (fl && fl !== '#FFFFFF' && fl !== 'NONE') f.push(`${what}: a lamp part is filled ${fl} (the child colours it)`); });
        const rg = L.querySelectorAll('[data-lcs-rays]');
        if (rg.length !== 1) { f.push(`${what}: ${rg.length} ray groups (exactly one lamp is on)`); keys.push('?'); return; }
        const housing = L.querySelector('[data-lcs-light-part="housing"]'); const hr = R(housing);
        const rays = [...rg[0].querySelectorAll('line')];
        let left = 0, right = 0;
        const ys = rays.map((ln) => {
          const rr = R(ln);
          if (rr.right > hr.left + 0.5 && rr.left < hr.right - 0.5) f.push(`${what}: a ray inside the housing`);
          if (rr.right <= hr.left + 0.5) left++; else right++;
          const m = ln.getScreenCTM(); const p = (x, y) => ({ x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f });
          const a = p(+ln.getAttribute('x1'), +ln.getAttribute('y1')), b = p(+ln.getAttribute('x2'), +ln.getAttribute('y2'));
          const cx = (hr.left + hr.right) / 2;
          return Math.abs(b.x - a.x) < 1e-6 ? a.y : a.y + (b.y - a.y) * (cx - a.x) / (b.x - a.x);
        });
        if (left !== 3 || right !== 3) f.push(`${what}: rays ${left} / ${right} ≠ 3 / 3`);
        const yOn = ys.reduce((s, v) => s + v, 0) / ys.length;
        let idx = -1, best = Infinity;
        lamps.forEach((lp, k) => { const dd = Math.abs(center(lp.r).y - yOn); if (dd < best) { best = dd; idx = k; } });
        if (best > 2) f.push(`${what}: the rays are centred ${best.toFixed(1)} px off every lamp`);
        keys.push(kind + idx);
        cols.push(kind === 'car' ? 'RAG'[idx] : 'RG'[idx]);
        seen[kind].add(idx);
      });
      if (cfg.car && cfg.car >= 3 && seen.car.size !== 3) f.push(`the car lights light only lamps ${[...seen.car].join(',')} (every position 0, 1, 2 at least once)`);
      if (cfg.ped && seen.ped.size !== 2) f.push(`the pedestrian lights light only ${[...seen.ped].join(',')} (top and bottom once each)`);
      if (adjacentEqual(keys)) f.push(`two neighbouring lights are on at the same position (${keys.join(' ')})`);
      if (periodic(keys, cfg.perRow)) f.push(`the second row repeats the first (${keys.join(' ')})`);
      keys.forEach((k, i) => { if (i >= cfg.perRow && k === keys[i - cfg.perRow]) f.push(`column ${(i % cfg.perRow) + 1} is lit at the same position in both rows (${keys.join(' ')})`); });
      if (cols.join('') !== root.dataset.lcsAnswers) f.push(`derived colours ${cols.join('')} ≠ the composed ${root.dataset.lcsAnswers}`);
      const CODE = ['#C0392B', '#2E6DA4', '#E0A800', '#4E8A3C', '#D9661C', '#7A4E9C', '#8C5A2B', '#D66A8E'];
      document.querySelectorAll('.ws-page [fill], .ws-page [stroke]').forEach((n) => { for (const at of ['fill', 'stroke']) if (CODE.includes((n.getAttribute(at) || '').toUpperCase())) f.push(`a code colour ${n.getAttribute(at)} on a colour-it-yourself page (it would be a key)`); });
    } else if (mode === 'crossing-steps') {
      sparseSel = '.rs-ccard';
      const cards = readingOrder([...root.querySelectorAll('.rs-ccard')]);
      const key = root.dataset.lcsKey.split(',');
      if (cards.length !== key.length) f.push(`${cards.length} cards ≠ ${key.length} steps`);
      const printed = cards.map((c) => c.dataset.lcsStep);
      if (printed.slice().sort().join() !== key.slice().sort().join()) f.push(`the printed cards ${printed.join(',')} are not the routine ${key.join(',')}`);
      const displaced = printed.filter((k, i) => k !== key[i]).length;
      if (displaced < cfg.offBy) f.push(`the printed order differs from the routine in ${displaced} places (< ${cfg.offBy}: the answer is the page order)`);
      if (printed.join() === key.slice().reverse().join()) f.push('the printed order is the routine reversed');
      const sigs = [];
      cards.forEach((c, i) => {
        const what = `card ${i + 1} (${c.dataset.lcsStep})`;
        const tips = [...c.querySelectorAll('[data-lcs-sight] polygon')];
        // the chevron's TIP is the vertex farthest from the polygon's mean x; its direction = tip - the other vertices
        const dirs = tips.map((pg) => {
          const m = pg.getScreenCTM();
          const xs = Array.from({ length: pg.points.numberOfItems }, (_, k) => { const p = pg.points.getItem(k); return m.a * p.x + m.c * p.y + m.e; });
          const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
          const ti = xs.reduce((best, x, k) => (Math.abs(x - mean) > Math.abs(xs[best] - mean) ? k : best), 0);
          const others = xs.filter((_, k) => k !== ti);
          return Math.sign(xs[ti] - others.reduce((a, b) => a + b, 0) / others.length);
        });
        const k = c.dataset.lcsStep;
        const want = { 'look-left': [-1], 'look-left-again': [-1], 'look-right': [1], 'look-both': [-1, 1] }[k] || [];
        // what the frame DRAWS (never the step stamp): stance, head offset, each arrow's direction + straight/swung, the ahead mark
        const head = c.querySelector('[data-lcs-head]'), bag = c.querySelector('[data-lcs-bag]');
        const hx = head && bag ? Math.round((center(R(head)).x - center(R(bag)).x)) : 0;
        const swung = [...c.querySelectorAll('[data-lcs-sight]')].map((g) => (g.querySelector('path') ? 'swing' : 'straight'));
        sigs.push({ what, sig: JSON.stringify([c.querySelectorAll('[data-lcs-step-fig] path').length, Math.sign(hx), dirs.slice().sort(), swung.sort(), c.querySelectorAll('[data-lcs-ahead]').length]) });
        if (k === 'look-left-again' && !swung.includes('swing')) f.push(`${what}: look left AGAIN is drawn with a straight arrow (it must swing back from the right)`);
        if (dirs.slice().sort().join() !== want.slice().sort().join()) f.push(`${what}: the drawn sight arrows point ${JSON.stringify(dirs)} (${JSON.stringify(want)}: the page's left IS the child's left)`);
        const boxes = c.querySelectorAll('.ws-blankbox');
        if (boxes.length !== 1) f.push(`${what}: ${boxes.length} numeral boxes`);
        boxes.forEach((b) => { if (b.textContent.trim() || (b.getAttribute('data-lcs-answer') || '') !== '') f.push(`${what}: the numeral box is not empty`); const br = R(b); if (br.width < 63.4 || br.height < 59.4) f.push(`${what}: box ${br.width.toFixed(0)} x ${br.height.toFixed(0)} < 64 x 60`); });
        const fig = c.querySelector('[data-lcs-step-fig] svg'); const fr = fig ? R(fig) : null;
        if (!fr || Math.max(fr.width, fr.height) < 56 - 0.6) f.push(`${what}: the child figure < 56 px`);
        const frame = c.querySelector('[data-lcs-frame]'); const fm = R(frame);
        if (fr && (fr.left < fm.left - 0.6 || fr.right > fm.right + 0.6 || fr.bottom > fm.bottom + 0.6)) f.push(`${what}: the child figure leaves its frame`);
      });
      for (let a = 0; a < sigs.length; a++) for (let b = a + 1; b < sigs.length; b++) if (sigs[a].sig === sigs[b].sig) f.push(`${sigs[a].what} and ${sigs[b].what} draw the SAME frame (their order is undecidable from the page)`);
      if (root.textContent.trim()) f.push(`text "${root.textContent.trim().slice(0, 24)}" on a picture-only page`);
    } else if (mode === 'sign-meaning') {
      sparseSel = '.ws-match-item';
      const lefts = [...root.querySelectorAll('[data-lcs-sign-item]')].sort((a, b) => R(a).top - R(b).top);
      const rights = [...root.querySelectorAll('[data-lcs-meaning]')].sort((a, b) => R(a).top - R(b).top);
      if (lefts.length !== cfg.pairs || rights.length !== cfg.pairs) f.push(`${lefts.length} signs / ${rights.length} meanings ≠ ${cfg.pairs}`);
      const L = lefts.map((it, i) => { const g = it.querySelector('[data-lcs-signal]'); if (!g) { f.push(`sign ${i + 1}: no sign`); return null; } if (signExtent(g) < 72 - 0.6) f.push(`sign ${i + 1}: ${signExtent(g).toFixed(0)} px < the G1 floor 72`); return roleOf(g, `sign ${i + 1}`); });
      const Rt = rights.map((it) => it.dataset.lcsMeaning);
      if (new Set(L).size !== cfg.pairs) f.push(`the signs are not ${cfg.pairs} distinct roles (${L.join(',')})`);
      if (L.slice().sort().join() !== Rt.slice().sort().join()) f.push(`the meanings (${Rt.join(',')}) are not the signs' roles (${L.join(',')})`);
      const n = L.length;
      const shifts = L.map((r, i) => (Rt.indexOf(r) - i + n) % n);
      if (shifts.filter((s) => s === 0).length > 1) f.push(`${shifts.filter((s) => s === 0).length} pairs straight across (<= 1)`);
      const counts = {}; for (const s of shifts) counts[s] = (counts[s] || 0) + 1;
      if (Math.max(...Object.values(counts)) > 2) f.push(`${Math.max(...Object.values(counts))} lines run the same way (shift ${JSON.stringify(counts)}; a pattern is a tell)`);
      if (Rt.join() === L.slice().reverse().join()) f.push('the meanings are the signs in mirror order');
      L.forEach((r, i) => {
        if (!r) return;
        const gl = specs[r].glyph;
        if (gl === 'twoChildren' && !['children', 'school'].includes(r)) f.push(`sign ${i + 1}: two children drawn on a ${r} sign`);
        if (gl === 'bicycle' && !/bike/.test(r)) f.push(`sign ${i + 1}: a bicycle drawn on a ${r} sign`);
      });
      rights.forEach((it, i) => {
        const p = it.querySelector('.rs-mtext'); const r = it.dataset.lcsMeaning; const words = String((specs[r] || {}).text || '').split(/[|\s]+/).filter(Boolean);
        for (const w of words) if (new RegExp(`(?<!\\p{L})${w}(?!\\p{L})`, 'iu').test(p.textContent)) f.push(`meaning ${i + 1} prints the ${r} sign's own word "${w}"`);
        const lines = Math.round(R(p).height / parseFloat(getComputedStyle(p).lineHeight));
        if (lines > 2) f.push(`meaning ${i + 1} wraps to ${lines} lines (<= 2)`);
        if (parseFloat(getComputedStyle(p).fontSize) < 16) f.push(`meaning ${i + 1} font < 16`);
        if (p.scrollWidth > p.clientWidth + 0.5) f.push(`meaning ${i + 1} overflows its box`);
      });
    } else if (mode === 'sign-kinds') {
      sparseSel = '.rs-lcard, .rs-bin';
      const cards = readingOrder([...root.querySelectorAll('.rs-lcard')]);
      if (cards.length !== cfg.signs) f.push(`${cards.length} cards ≠ ${cfg.signs}`);
      const letters = cards.map((c) => (c.querySelector('[data-lcs-letter]') || {}).textContent);
      if (letters.join('') !== 'ABCDEFGHIJ'.slice(0, cfg.signs)) f.push(`the letters read ${letters.join('')} in reading order`);
      const table = CLASSOF[cfg.convention] || {};
      const cls = cards.map((c, i) => {
        const g = c.querySelector('[data-lcs-signal]');
        if (!g) { f.push(`card ${letters[i]}: no sign`); return '?'; }
        if (signExtent(g) < 64 - 0.6) f.push(`card ${letters[i]}: sign ${signExtent(g).toFixed(0)} px < the G2 floor 64`);
        const k = shapeKey(g);
        if (k === 'circle+red') f.push(`card ${letters[i]}: a filled red disc (prints as the blue disc's grey)`);
        if (cfg.convention === 'vienna' && (k === 'octagon' || k === 'triDown')) f.push(`card ${letters[i]}: a priority sign (STOP / yield) on a Vienna sort`);
        const own = table[k];
        roleOf(g, `card ${letters[i]}`);
        if (own !== c.dataset.lcsClass) f.push(`card ${letters[i]}: the drawn ${k} reads as "${own}" under ${cfg.convention}, the card's class is "${c.dataset.lcsClass}"`);
        return own;
      });
      const per = {}; for (const c of cls) per[c] = (per[c] || 0) + 1;
      for (const b of cfg.bins) if (!(per[b] >= 2)) f.push(`bin ${b}: ${per[b] || 0} signs (>= 2)`);
      // EQUAL GROUP SIZES, read off the drawn outlines: unequal groups make the box count a clue (or a "missing sign")
      const sizes = cfg.bins.map((b) => per[b] || 0);
      if (new Set(sizes).size > 1) f.push(`unequal group sizes ${cfg.bins.map((b, i) => `${b} ${sizes[i]}`).join(' / ')} (every group takes the same number of signs)`);
      for (const [c, v] of Object.entries(per)) if (!cfg.bins.includes(c)) f.push(`class ${c} (${v} signs) has no bin`); else if (v > cfg.boxes) f.push(`bin ${c}: ${v} signs > ${cfg.boxes} boxes`);
      if (cls.some((c, i) => i >= 2 && c === cls[i - 1] && c === cls[i - 2])) f.push(`three neighbouring cards of one class (${cls.join(' ')})`);
      if (periodic(cls, 2) || periodic(cls, 3)) f.push(`the classes run in a pattern (${cls.join(' ')})`);
      const bins = [...root.querySelectorAll('[data-lcs-bin]')];
      if (bins.map((b) => b.dataset.lcsBin).join() !== cfg.bins.join()) f.push(`bins ${bins.map((b) => b.dataset.lcsBin).join()} ≠ ${cfg.bins.join()}`);
      const counts = bins.map((b) => b.querySelectorAll('[data-lcs-bin-box]').length);
      // every group holds exactly as many boxes as its signs on the page, derived from the DRAWN geometry (never a stamp)
      counts.forEach((n, i) => { const want = per[cfg.bins[i]] || 0; if (n !== want) f.push(`bin ${cfg.bins[i]}: ${n} boxes ≠ its ${want} signs (a group shows one box per sign)`); });
      bins.forEach((b, i) => {
        const lab = b.querySelector('[data-lcs-bin-label]');
        if (!lab || lab.textContent !== cfg.labels[i]) f.push(`bin ${i + 1}: label "${lab && lab.textContent}" ≠ the bank "${cfg.labels[i]}"`);
        if (lab && lab.scrollWidth > lab.clientWidth + 0.5) f.push(`bin ${i + 1}: the label overflows`);
        b.querySelectorAll('[data-lcs-bin-box]').forEach((x) => { if (x.textContent.trim() || (x.getAttribute('data-lcs-answer') || '') !== '') f.push(`bin ${i + 1}: a box is not empty`); });
      });
    } else if (mode === 'sign-quiz') {
      sparseSel = '.rs-qbox, .rs-qtile';
      const rows = [...root.querySelectorAll('[data-lcs-qrow]')].sort((a, b) => R(a).top - R(b).top);
      if (rows.length !== cfg.rows) f.push(`${rows.length} rows ≠ ${cfg.rows}`);
      const conf = J('lcsConfusable') || [];
      const isConf = (a, b) => conf.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
      const slots = [];
      const targets = [];
      rows.forEach((row, i) => {
        const what = `row ${i + 1}`;
        const target = row.dataset.lcsQrow;
        targets.push(target);
        const tiles = [...row.querySelectorAll('.rs-qtile')].sort((a, b) => R(a).left - R(b).left);
        if (tiles.length !== cfg.chips) f.push(`${what}: ${tiles.length} tiles ≠ ${cfg.chips}`);
        const roles = tiles.map((t, k) => { const g = t.querySelector('[data-lcs-signal]'); if (!g) return null; if (signExtent(g) < 64 - 0.6) f.push(`${what} tile ${k + 1}: sign ${signExtent(g).toFixed(0)} px < 64`); const tr = R(t), gr = R(g.closest('svg')); if (gr.left < tr.left - 0.5 || gr.right > tr.right + 0.5 || gr.top < tr.top - 0.5 || gr.bottom > tr.bottom + 0.5) f.push(`${what} tile ${k + 1}: the sign leaves its tile`); return roleOf(g, `${what} tile ${k + 1}`); });
        const hits = roles.map((r, k) => (r === target ? k : -1)).filter((k) => k >= 0);
        if (hits.length !== 1) f.push(`${what}: ${hits.length} tiles are the ${target} sign (exactly one fits)`);
        slots.push(hits[0]);
        for (let a = 0; a < roles.length; a++) for (let b = a + 1; b < roles.length; b++) if (isConf(roles[a], roles[b])) f.push(`${what}: a confusable pair on one row (${roles[a]} / ${roles[b]})`);
        const p = row.querySelector('.rs-qtext');
        const words = String((specs[target] || {}).text || '').split(/[|\s]+/).filter(Boolean);
        for (const w of words) if (new RegExp(`(?<!\\p{L})${w}(?!\\p{L})`, 'iu').test(p.textContent)) f.push(`${what}: the situation prints the ${target} sign's own word "${w}"`);
        const lines = Math.round(R(p).height / parseFloat(getComputedStyle(p).lineHeight));
        if (lines > 3) f.push(`${what}: the situation wraps to ${lines} lines (<= 3)`);
        if (parseFloat(getComputedStyle(p).fontSize) < 16) f.push(`${what}: situation font < 16`);
      });
      if (new Set(targets).size !== targets.length) f.push(`a sign is the answer on two rows (${targets.join(',')})`);
      if (slots.join('') !== root.dataset.lcsAnswers) f.push(`derived slots ${slots.join('')} ≠ the composed ${root.dataset.lcsAnswers}`);
      const per = {}; for (const s of slots) per[s] = (per[s] || 0) + 1;
      for (let s = 0; s < cfg.chips; s++) if ((per[s] || 0) !== cfg.rows / cfg.chips) f.push(`slot ${s + 1} holds the answer on ${per[s] || 0} rows (every slot ${cfg.rows / cfg.chips})`);
      if (adjacentEqual(slots)) f.push(`the answer sits in the same slot on two neighbouring rows (${slots.join('')})`);
      if (periodic(slots, cfg.chips)) f.push(`the answer slots run in a staircase (${slots.join('')})`);
    }
    if (document.querySelector('[data-lcs-answer]:not(.ws-blankbox)')) f.push('a [data-lcs-answer] stamp outside an empty box');
    // SPARSE: the largest empty horizontal band between consecutive drawn blocks, instruction to footer
    {
      const iv = [];
      root.querySelectorAll(sparseSel).forEach((n) => { const b = R(n); if (b.height > 0) iv.push([b.top, b.bottom]); });
      const ins = document.querySelector('.ws-instruction'), foot = document.querySelector('.ws-foot');
      if (ins) iv.push([R(ins).top, R(ins).bottom]);
      if (foot) iv.push([R(foot).top, R(foot).bottom]);
      iv.sort((a, b) => a[0] - b[0]);
      let reach = iv.length ? iv[0][1] : 0, worst = 0;
      for (const [t, b] of iv.slice(1)) { if (t > reach) worst = Math.max(worst, t - reach); reach = Math.max(reach, b); }
      if (worst > 40) f.push(`sparse: a ${worst.toFixed(0)} px empty band between consecutive blocks (> 40)`);
    }
    // inside the body, above the footer; every drawn thing inside the stage
    const body = document.querySelector('[data-lcs-body]'), foot = document.querySelector('.ws-foot');
    const rr = R(root);
    if (body) { const b = R(body); if (rr.left < b.left - 0.6 || rr.right > b.right + 0.6 || rr.top < b.top - 0.6) f.push('stage outside the body'); }
    if (foot) { const ft = R(foot).top; root.querySelectorAll(sparseSel).forEach((n, i) => { if (R(n).bottom > ft + 0.6) f.push(`block ${i + 1} reaches into the footer band`); }); }
    return f;
  }, { mode, CLASSOF: COMMON.classOf });
}

module.exports = {
  id: 'K-369',
  slug: 'road-safety',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: 'road-safety',
  themeAxis: { applicable: false },
  difficulty: {
    1: { layout: 'fork', streets: 4, ped: 4, car: 0, amber: false, lampD: 64, pillWords: true },
    2: { layout: 'fork', streets: 6, ped: 3, car: 3, amber: false, lampD: 56, pillWords: true },
    3: { layout: 'fork', streets: 6, ped: 3, car: 3, amber: true, lampD: 56, pillWords: false },
  },
  i18n: {
    en: {
      title: 'Road Safety: Read the Traffic Light',
      instruction: 'Look at the lamp that is on, then circle what to do.',
    },
  },

  LIGHT_RULE,
  geomFor,
  litIndex,

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    return this._buildWith({ block: bank('road-safety', loc), config: this.difficulty[difficulty] }, { locale: loc }, ctx);
  },

  /**
   * The whole build over an INJECTED {block, config} (the gate's poison seam).
   * `geom` / `plan` are GATE-ONLY seams (PR6 a low pedestrian head, PR9 a forced
   * answer order): build() never passes them, so a published page is always
   * geomFor(config) + the composer.
   */
  _buildWith({ block, config, geom: geomSeam, plan: planSeam }, { locale }, ctx) {
    const d = config;
    const loc = locale;
    if (!d) throw new Error('K-369: no config (the guard needs the resolved config, never the level index)');
    // Phase E: ONE additive knob `mode`. `d.mode` undefined is the base path below, untouched and
    // byte-identical (tools/b3-baseline.js --check); a face config carries its own keys and every face
    // guard keys on them, never on the level index.
    if (d.mode !== undefined) {
      if (!FACE_BUILD[d.mode]) throw new Error(`K-369: unknown mode "${d.mode}"`);
      if (!block) throw new Error(`K-369 ${loc}: no locale block (refuse)`);
      return FACE_BUILD[d.mode](block, d, loc, ctx.rng, { plan: planSeam });
    }
    // guards on the RESOLVED config (never on the level index — poison PR11)
    if (d.layout !== 'fork') throw new Error(`K-369: layout "${d.layout}" is not the base fork (a face config fed to the base build)`);
    for (const k of ['streets', 'ped', 'car', 'lampD']) if (!Number.isInteger(d[k]) || d[k] < 0) throw new Error(`K-369: config ${k} is ${d[k]}`);
    if (![4, 6].includes(d.streets)) throw new Error(`K-369: streets ${d.streets} (4 or 6)`);
    if (d.ped + d.car !== d.streets) throw new Error(`K-369: ped ${d.ped} + car ${d.car} ≠ streets ${d.streets}`);
    if (d.lampD < 56) throw new Error(`K-369: lampD ${d.lampD} < the K floor 56`);
    if (typeof d.pillWords !== 'boolean' || typeof d.amber !== 'boolean') throw new Error('K-369: pillWords / amber must be booleans');
    // the locale block
    if (!block) throw new Error(`K-369 ${loc}: no locale block (refuse)`);
    const pl = block.pedLight || {};
    if (!['standing', 'hand'].includes(pl.stop)) throw new Error(`K-369 ${loc}: pedLight.stop is ${JSON.stringify(pl.stop)} — the ${loc} panel must SET it (refuse; no fallback page)`);
    if (pl.go !== 'walking') throw new Error(`K-369 ${loc}: pedLight.go must be walking`);
    if (![2, 3].includes(pl.lamps)) throw new Error(`K-369 ${loc}: pedLight.lamps ${pl.lamps}`);
    const amberTok = block.amber && block.amber.token;
    if (!['codeYellow', 'codeOrange'].includes(amberTok)) throw new Error(`K-369 ${loc}: amber.token ${amberTok}`);
    const pedStyle = block.convention === 'mutcd' ? 'mutcd' : 'vienna';
    const cw = block.chipWords || {};
    for (const a of ['ped', 'car']) for (const s of ['stop', 'go']) {
      if (!cw[a] || typeof cw[a][s] !== 'string' || !cw[a][s].trim()) throw new Error(`K-369 ${loc}: chipWords.${a}.${s} missing (refuse)`);
    }
    const useAmber = d.amber && block.amberMeans === 'stop';

    // compose: actors + sides under the balance rule, redrawn until no banned order
    const rng = ctx.rng;
    const N = d.streets, rowsPerCol = N / 2;
    let plan = planSeam ? { amberAt: [], ...planSeam, ans: planSeam.sides.map((x) => (x === 'stop' ? 'S' : 'G')).join('') } : null;
    for (let t = 0; t < TRIES && !plan; t++) {
      // every ROW pairs a car strip with a pedestrian strip when the page has both (the design's height gate
      // compares the pedestrian head with the car head IN THE SAME ROW; a row of two pedestrian lights also
      // opened a 66 px empty band above it). Column A is drawn per row, column B takes the other actor.
      let actors;
      if (d.car && d.ped) {
        if (d.car !== rowsPerCol || d.ped !== rowsPerCol) throw new Error(`K-369: car ${d.car} / ped ${d.ped} cannot pair one per row over ${rowsPerCol} rows`);
        const colA = Array.from({ length: rowsPerCol }, () => (rng.next() < 0.5 ? 'car' : 'ped'));
        actors = [...colA, ...colA.map((a) => (a === 'car' ? 'ped' : 'car'))];
      } else actors = [...Array(d.ped).fill('ped'), ...Array(d.car).fill('car')];
      const sides = rng.shuffle([...Array(N / 2).fill('stop'), ...Array(N / 2).fill('go')]);
      const ans = sides.map((s) => (s === 'stop' ? 'S' : 'G')).join('');
      if (BANNED_ORDERS.has(ans)) continue;
      let okA = true;
      for (const a of ['ped', 'car']) {
        const idx = actors.map((x, i) => (x === a ? i : -1)).filter((i) => i >= 0);
        if (idx.length >= 2 && (!idx.some((i) => sides[i] === 'stop') || !idx.some((i) => sides[i] === 'go'))) okA = false;
      }
      if (!okA) continue;
      const colA = sides.slice(0, rowsPerCol), colB = sides.slice(rowsPerCol);
      if ([colA, colB].some((c) => c.every((s) => s === 'stop') || c.every((s) => s === 'go'))) continue;
      // amber (d3, amber-stop locales only): at least one car stop lights the amber lamp
      let amberAt = [];
      if (useAmber) {
        const carStops = actors.map((x, i) => (x === 'car' && sides[i] === 'stop' ? i : -1)).filter((i) => i >= 0);
        if (!carStops.length) continue;
        amberAt = rng.sample(carStops, Math.max(1, Math.floor(carStops.length / 2)));
      }
      plan = { actors, sides, ans, amberAt };
    }
    if (!plan) throw new Error(`K-369 ${loc}: no composition in ${TRIES} tries (refuse)`);

    const geom = geomSeam || geomFor(d);
    const strips = plan.actors.map((actor, i) => {
      const side = plan.sides[i];
      const on = litIndex(actor, side, pl.lamps, plan.amberAt.includes(i));
      const light = actor === 'car'
        ? { kind: 'car', lamps: 3, on, amberToken: amberTok, lampD: d.lampD }
        : { kind: 'ped', lamps: pl.lamps, on, pedStyle, pedStop: pl.stop, lampD: d.lampD };
      const words = d.pillWords ? { stop: cw[actor].stop, go: cw[actor].go } : null;
      return C5.streetStrip({ actor, light, words, geom });
    });
    const bodyHtml = C5.forkGrid({
      strips, geom,
      stamps: {
        mode: 'base', answers: plan.ans, 'amber-means': block.amberMeans || '', 'ped-lamps': pl.lamps, 'lamp-d': d.lampD,
        'pill-words': d.pillWords ? '1' : '0', convention: block.convention, streets: N,
      },
    });
    return { bodyHtml, meta: { answers: plan.ans, actors: plan.actors.join(','), amberAt: plan.amberAt.join(','), mode: 'base' } };
  },

  /**
   * Re-derives every answer from the RENDER (runs in page.evaluate: no require).
   * Per strip: the one ray group → the lamp centre it radiates from → that
   * lamp's rank in y order → lightRule; never `data-lcs-on`, never a fill.
   */
  async verify(page) {
    const mode = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-road-safety]'); return r ? r.dataset.lcsMode || '' : ''; });
    if (mode && mode !== 'base') return FACE_BUILD[mode] ? faceVerify(page, mode) : [`unknown face mode "${mode}"`];
    return page.evaluate((RULE) => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-road-safety]');
      if (!root) return ['no road-safety root'];
      if (root.dataset.lcsMode !== 'base') return [`mode "${root.dataset.lcsMode}" is not the base (faces verify in Phase E)`];
      if (document.querySelector('[data-lcs-answer]')) fails.push('a [data-lcs-answer] stamp exists (answers are never printed)');
      const N = +root.dataset.lcsStreets;
      const lampD = +root.dataset.lcsLampD;
      const amberMeans = root.dataset.lcsAmberMeans;
      const strips = [...root.querySelectorAll('[data-lcs-strip]')];
      if (strips.length !== N) fails.push(`${strips.length} strips ≠ ${N}`);
      if (lampD < 56) fails.push(`lampD ${lampD} < 56`);
      const center = (r) => ({ x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 });
      // reading order: column A top-down, then column B
      const order = strips.map((el) => ({ el, r: el.getBoundingClientRect() }));
      const xs = [...new Set(order.map((o) => Math.round(o.r.left)))].sort((a, b) => a - b);
      const sorted = order.slice().sort((a, b) => (Math.round(a.r.left) - Math.round(b.r.left)) || (a.r.top - b.r.top));
      if (xs.length !== 2) fails.push(`${xs.length} strip columns ≠ 2`);
      const derived = [];
      const heads = [];
      const actorsSeen = { ped: { stop: 0, go: 0 }, car: { stop: 0, go: 0 } };
      sorted.forEach(({ el, r }, i) => {
        const what = `strip ${i + 1}`;
        const lights = el.querySelectorAll('[data-lcs-signal][data-lcs-light]');
        if (lights.length !== 1) { fails.push(`${what}: ${lights.length} lights`); derived.push('?'); return; }
        const L = lights[0];
        const kind = L.dataset.lcsLight;
        const actor = el.dataset.lcsActor;
        if (kind !== actor) fails.push(`${what}: a ${kind} light on a ${actor} street`);
        const lamps = [...L.querySelectorAll('[data-lcs-lamp]')].map((g) => ({ g, c: center(g.getBoundingClientRect()), r: g.getBoundingClientRect() }));
        lamps.sort((a, b) => a.c.y - b.c.y);
        const nL = lamps.length;
        if (kind === 'car' && nL !== 3) fails.push(`${what}: car light with ${nL} lamps`);
        if (kind === 'ped' && ![2, 3].includes(nL)) fails.push(`${what}: pedestrian light with ${nL} lamps`);
        for (const lp of lamps) if (Math.min(lp.r.width, lp.r.height) < 56 - 0.6) fails.push(`${what}: lamp ${Math.round(lp.r.width)} px < 56`);
        const housing = L.querySelector('[data-lcs-light-part="housing"]');
        const hr = housing ? housing.getBoundingClientRect() : null;
        const rayGroups = L.querySelectorAll('[data-lcs-rays]');
        if (rayGroups.length !== 1) { fails.push(`${what}: ${rayGroups.length} ray groups (exactly one lamp is on)`); derived.push('?'); return; }
        const rays = [...rayGroups[0].querySelectorAll('line')];
        if (rays.length !== 6) fails.push(`${what}: ${rays.length} rays ≠ 6`);
        // every ray outside the housing, 3 per side
        let left = 0, right = 0;
        for (const ln of rays) {
          const rr = ln.getBoundingClientRect();
          if (hr && rr.right > hr.left + 0.5 && rr.left < hr.right - 0.5) fails.push(`${what}: a ray inside the housing`);
          if (hr && rr.right <= hr.left + 0.5) left++; else right++;
        }
        if (left !== 3 || right !== 3) fails.push(`${what}: rays ${left} left / ${right} right ≠ 3 / 3`);
        // the lamp the rays radiate from: extend each ray line back to the housing centre x; its y there
        const ys = rays.map((ln) => {
          const m = ln.getScreenCTM();
          const p = (x, y) => ({ x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f });
          const a = p(+ln.getAttribute('x1'), +ln.getAttribute('y1')), b = p(+ln.getAttribute('x2'), +ln.getAttribute('y2'));
          const cx = hr ? (hr.left + hr.right) / 2 : a.x;
          if (Math.abs(b.x - a.x) < 1e-6) return a.y;
          return a.y + (b.y - a.y) * (cx - a.x) / (b.x - a.x);
        });
        const yOn = ys.reduce((s, v) => s + v, 0) / ys.length;
        if (Math.max(...ys) - Math.min(...ys) > 2) fails.push(`${what}: the rays do not radiate from one point (spread ${(Math.max(...ys) - Math.min(...ys)).toFixed(1)} px)`);
        let idx = -1, best = Infinity;
        lamps.forEach((lp, k) => { const dd = Math.abs(lp.c.y - yOn); if (dd < best) { best = dd; idx = k; } });
        if (best > 2) fails.push(`${what}: the rays are centred ${best.toFixed(1)} px off every lamp`);
        const ruleKey = kind === 'car' ? 'car' : (nL === 3 ? 'ped3' : 'ped');
        const ans = RULE[ruleKey][idx];
        if (!ans) { fails.push(`${what}: the rays mark lamp ${idx}, which is never on for ${ruleKey}`); derived.push('?'); return; }
        derived.push(ans === 'stop' ? 'S' : 'G');
        actorsSeen[kind] && (actorsSeen[kind][ans] += 1);
        if (kind === 'car' && idx === 1 && amberMeans !== 'stop') fails.push(`${what}: amber lit where amber means "${amberMeans}"`);
        // ped glyph poses by index (measured silhouette width, the stamp cross-checked)
        if (kind === 'ped') {
          lamps.forEach((lp, k) => {
            const gl = lp.g.querySelector('[data-lcs-pictogram="walker"]');
            if (!gl) { fails.push(`${what}: pedestrian lamp ${k} has no glyph`); return; }
            const pose = gl.dataset.lcsPose;
            if (k === 0 && !['standing', 'hand'].includes(pose)) fails.push(`${what}: top pedestrian glyph is "${pose}" (standing or hand)`);
            if (k === nL - 1 && pose !== 'walking') fails.push(`${what}: bottom pedestrian glyph is "${pose}" (walking)`);
            const w = gl.getBoundingClientRect().width / lp.r.width;
            const want = { standing: [0.2, 0.33], walking: [0.34, 0.45], hand: [0.4, 0.55] }[pose];
            if (want && (w < want[0] || w > want[1])) fails.push(`${what}: the ${pose} glyph measures ${w.toFixed(2)} of its lamp (expected ${want[0]}..${want[1]})`);
          });
        }
        // head height: car head at the strip top; the pedestrian head >= 40 px below the car head IN THE SAME ROW
        const headTop = hr ? hr.top - r.top : NaN;
        if (kind === 'car' && !(headTop <= 2)) fails.push(`${what}: car head ${headTop.toFixed(1)} px below the strip top (the car head is the tall one)`);
        heads.push({ what, kind, nL, row: Math.round(r.top), head: hr ? hr.top : NaN });
        // outcomes: stop left of the pole, go right; one picture each; pills (when on) inside, <= 2 lines
        const poleX = r.left + (+el.dataset.lcsPoleX);
        const cells = { stop: el.querySelectorAll('[data-lcs-side="stop"].rs-cell'), go: el.querySelectorAll('[data-lcs-side="go"].rs-cell') };
        for (const s of ['stop', 'go']) {
          if (cells[s].length !== 1) { fails.push(`${what}: ${cells[s].length} ${s} cells`); continue; }
          const c = cells[s][0];
          const cr = c.getBoundingClientRect();
          if (s === 'stop' && !(cr.right <= poleX)) fails.push(`${what}: the stop side is not left of the pole`);
          if (s === 'go' && !(cr.left >= poleX)) fails.push(`${what}: the go side is not right of the pole`);
          const pic = c.querySelector(`[data-lcs-pictogram="${actor === 'ped' ? 'walker' : 'car'}"]`);
          if (!pic) fails.push(`${what}: no ${actor} picture on the ${s} side`);
          else {
            const want = actor === 'ped' ? (s === 'stop' ? 'standing' : 'walking') : (s === 'stop' ? 'waiting' : 'driving');
            const got = actor === 'ped' ? pic.dataset.lcsPose : pic.dataset.lcsState;
            if (got !== want) fails.push(`${what}: the ${s} side shows "${got}" (${want})`);
            const pr = pic.closest('svg').getBoundingClientRect();
            if (Math.max(pr.width, pr.height) < 56 - 0.6) fails.push(`${what}: ${s} picture ${Math.round(Math.max(pr.width, pr.height))} px < 56`);
          }
          const pills = c.querySelectorAll('[data-lcs-pill]');
          if (root.dataset.lcsPillWords === '1') {
            if (pills.length !== 1) fails.push(`${what}: ${pills.length} ${s} pills`);
            else {
              const p = pills[0];
              if (!p.textContent.trim()) fails.push(`${what}: empty ${s} pill`);
              if (p.scrollWidth > p.clientWidth + 0.5) fails.push(`${what}: the ${s} pill "${p.textContent}" overflows (${p.scrollWidth} > ${p.clientWidth})`);
              const lh = parseFloat(getComputedStyle(p).lineHeight), pad = 12 + 4;
              const lines = Math.round((p.getBoundingClientRect().height - pad) / lh);
              if (lines > 2) fails.push(`${what}: the ${s} pill wraps to ${lines} lines`);
              if (parseFloat(getComputedStyle(p).fontSize) < 16) fails.push(`${what}: pill font < 16`);
            }
          } else if (pills.length) fails.push(`${what}: pills printed with pillWords off`);
        }
      });
      // rows: when the page has cars, every row pairs a car with a pedestrian and the pedestrian head sits >= 40 px lower
      const byRow = {};
      heads.forEach((h) => { const k = Object.keys(byRow).find((y) => Math.abs(+y - h.row) <= 1) || h.row; (byRow[k] = byRow[k] || []).push(h); });
      const pageHasCar = heads.some((h) => h.kind === 'car');
      for (const list of Object.values(byRow)) {
        const cars = list.filter((h) => h.kind === 'car'), peds = list.filter((h) => h.kind === 'ped');
        if (pageHasCar && (cars.length !== 1 || peds.length !== 1)) fails.push(`a row holds ${cars.length} car / ${peds.length} pedestrian lights (pair one of each)`);
        for (const p of peds) for (const c of cars) if (p.nL === 2 && !(p.head - c.head >= 40)) fails.push(`${p.what}: pedestrian head only ${(p.head - c.head).toFixed(1)} px below the car head in its row (< 40: the height cue is gone)`);
      }
      // SPARSE: the largest empty horizontal band between consecutive drawn blocks, from the instruction to the footer
      {
        const iv = [];
        root.querySelectorAll('[data-lcs-light-part="housing"], .rs-pole, [data-lcs-pill], .rs-pic svg, .rs-band svg').forEach((n) => { const b = n.getBoundingClientRect(); if (b.height > 0) iv.push([b.top, b.bottom]); });
        const ins = document.querySelector('.ws-instruction'), foot = document.querySelector('.ws-foot');
        if (ins) iv.push([ins.getBoundingClientRect().top, ins.getBoundingClientRect().bottom]);
        if (foot) iv.push([foot.getBoundingClientRect().top, foot.getBoundingClientRect().bottom]);
        iv.sort((a, b) => a[0] - b[0]);
        let reach = iv.length ? iv[0][1] : 0, worst = 0;
        for (const [t, b] of iv.slice(1)) { if (t > reach) worst = Math.max(worst, t - reach); reach = Math.max(reach, b); }
        if (worst > 40) fails.push(`sparse: a ${worst.toFixed(0)} px empty band between consecutive blocks (> 40)`);
      }
      const got = derived.join('');
      if (got !== root.dataset.lcsAnswers) fails.push(`derived answers ${got} ≠ the composed ${root.dataset.lcsAnswers}`);
      const nS = (got.match(/S/g) || []).length, nG = (got.match(/G/g) || []).length;
      if (nS !== N / 2 || nG !== N / 2) fails.push(`balance: ${nS} stop / ${nG} go ≠ ${N / 2} / ${N / 2}`);
      for (const a of ['ped', 'car']) {
        const t = actorsSeen[a].stop + actorsSeen[a].go;
        if (t >= 2 && (!actorsSeen[a].stop || !actorsSeen[a].go)) fails.push(`balance: every ${a} light says the same thing`);
      }
      const half = N / 2;
      for (const col of [got.slice(0, half), got.slice(half)]) if (/^S+$/.test(col) || /^G+$/.test(col)) fails.push(`column ${col} is all one answer`);
      if (['SSSGGG', 'GGGSSS', 'SGSGSG', 'GSGSGS', 'SSGG', 'GGSS', 'SGSG', 'GSGS'].includes(got)) fails.push(`answer order ${got} is a staircase / alternation`);
      // codeColors only inside [data-lcs-signal]
      const CODE = ['#C0392B', '#2E6DA4', '#E0A800', '#4E8A3C', '#D9661C', '#7A4E9C', '#8C5A2B', '#D66A8E'];
      document.querySelectorAll('[fill], [stroke]').forEach((n) => {
        for (const at of ['fill', 'stroke']) {
          const v = (n.getAttribute(at) || '').toUpperCase();
          if (CODE.includes(v) && !n.closest('[data-lcs-signal]')) fails.push(`a code colour ${v} outside [data-lcs-signal]`);
        }
      });
      // text: only the pills print words
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (!node.textContent.trim()) continue;
        if (!(node.parentElement && node.parentElement.closest('[data-lcs-pill]'))) fails.push(`text "${node.textContent.trim().slice(0, 24)}" printed outside a pill`);
      }
      // inside the body, above the footer
      const body = document.querySelector('[data-lcs-body]');
      const foot = document.querySelector('.ws-foot');
      const rr = root.getBoundingClientRect();
      if (body) { const b = body.getBoundingClientRect(); if (rr.left < b.left - 0.6 || rr.right > b.right + 0.6 || rr.top < b.top - 0.6) fails.push('stage outside the body'); }
      if (foot) { const ft = foot.getBoundingClientRect().top; strips.forEach((el, i) => { if (el.getBoundingClientRect().bottom > ft + 0.6) fails.push(`strip ${i + 1} reaches into the footer band`); }); }
      return fails;
    }, LIGHT_RULE);
  },
};
