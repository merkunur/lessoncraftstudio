/**
 * K-380 — Healthy Habits: What Does Each Child Need? (nt5-F; family key
 * `healthy-habits`; K; science; no CCSS / NGSS hygiene standard exists — no
 * educationalAlignment). Design: docs/worksheet-gen/b6-designs/
 * K-380-healthy-habits.md §2 (base) + §5 (data + gates), under _BUILD-BRIEF.md;
 * every ruling and why in _work/K-380-critic.md.
 *
 * "The washroom hooks." Across the top a teal peg rail; from each peg a cream
 * plaque hangs on two strings, and on each plaque a faceless child is in the
 * middle of a habit WITH THE TOOL TAKEN OUT of the picture: washing at a running
 * tap (no soap), a fist jiggling at the mouth (no toothbrush), lying under a
 * blanket under the moon and stars (no bed), a hand on messy hair (no comb), both
 * hands at the nose with a sneeze burst (no tissue). Along the bottom a plank
 * carries the drawn tools in a deranged order. The child draws a line from the
 * dot under each plaque to the dot over the tool that child needs. Removing the
 * tool is the teaching point: the child names the SITUATION and recalls its
 * tool. No word on the apparatus in any locale.
 *
 * THEMELESS, 0 library pictures (one art source: primitives/habit-pictogram.js).
 * No unitAxis. The composition is locale-neutral (the seed carries no locale):
 * the same pictograms in the same order in all 11 locales.
 *
 * THE RULE THAT LOCKS THE TYPE: every closed answer is re-derived by verify()
 * from the DRAWN parts of a pictogram (the cue parts it can see: tap / moon /
 * tufts / burst …, or, with the cue marks off at d3, the near hand's position on
 * the head) through the bank's locale-neutral TOOL_OF — never from a stamp or
 * `meta`. The data-lcs-pose / data-lcs-glyph stamps are only COMPARED with what
 * the drawing says. No quantity of any kind is printed or implied.
 *
 * Difficulty is a CONFIG; every guard keys on the resolved config, never on the
 * level index (poison P20):
 *   layout     'hooks' (the base; a Phase-E face carries its own `mode`)
 *   habits     the habits on the page (COMMON.baseD1 / baseD2 / baseD3)
 *   pairs      4 / 5 / 6
 *   plaque     w 150 / 122 / 100, height flexing min..max 220..270 / 190..236 / 165..240 (the figure
 *              FILLS it: fit:true viewBox = the pose's drawn extent), toolPx 130 / 120 / 98
 *   fillMin    the drawn child's height / its plaque's height, >= 0.75 at d1 / d2 (lead review
 *              2026-09-23), 0.55 at the unpublished six-column d3 (six 100 px columns: a plaque
 *              tall enough to leave no blank band is wider than its child)
 *   cueMarks   on / on / off (d3: pose + context only — a harder page of the same move,
 *              never a face, no copy describes it; d1 and d3 are not published)
 *   toolOrder  'derangement': no tool in its own column, not the reverse, not a constant
 *              cyclic shift, no plaque-to-tool offset shared by more than 2 pairs
 * Layout d2 (lead review 2026-09-23 over §2): root padding 0 18 -> inner 639; 5 columns of 127.8; rows
 * [minmax(248, 294)] [minmax(180, 260)] [162], centred: 590 <= 677 (the fi 4-line title); at the 814 one-line
 * chrome the stack is 716 and the rest splits evenly (verify: no blank band > 60 px but the line zone).
 *
 * Refusals (throw, never a filler): an unauthored locale (lib/b6-common.js
 * bank()); a missing strings.base; a config that cannot be composed.
 */
'use strict';
const { bank } = require('../../lib/b6-common.js');
const C6 = require('../../templates/components-b6.js');
const { COMMON } = require('../../data/b6/healthy-habits.js');

const TRIES = 2000;
const LAYOUT_OK = 'hooks';

/** plaque->tool offsets of a composition (tool column minus plaque column, mod n) */
function offsets(habits, tools) {
  const n = habits.length;
  return habits.map((h, i) => ((tools.indexOf(COMMON.TOOL_OF[h]) - i) % n + n) % n);
}
/** null when the tool order is a legal derangement of the plaque order, else the reason */
function orderTell(habits, tools) {
  const n = habits.length;
  const off = offsets(habits, tools);
  if (off.some((o) => o === 0)) return 'a tool sits in its own column';
  if (off.every((o) => o === off[0])) return 'the tool order is a constant cyclic shift';
  if (habits.every((h, i) => tools.indexOf(COMMON.TOOL_OF[h]) === n - 1 - i)) return 'the tool order is the reverse of the plaque order';
  const count = {};
  for (const o of off) count[o] = (count[o] || 0) + 1;
  if (Object.values(count).some((c) => c > 2)) return `the offset ${Object.keys(count).find((k) => count[k] > 2)} is shared by more than 2 pairs`;
  return null;
}

/* =====================================================================================================
 * THE FIVE FACES (Phase E, 2026-09-23; design §3). All CODE faces on the ONE additive knob `mode`, read ONLY when
 * the config declares it — the base path (mode undefined) is untouched and byte-identical (tools/b3-baseline.js).
 * Each face is locale-neutral (the seed carries no locale; only the literals change) and every closed answer is
 * re-derived by faceVerify() from the DRAWN parts, never from a stamp.
 *   F1 hand-washing-steps  K-382   write 1-5 under five sink close-ups (the WHO / CDC routine)
 *   F2 brushing-teeth      G1-403  circle before / during / after for eight brushing cards (phases, never an order)
 *   F3 stop-the-germs      G1-404  circle the one of two behaviours that stops germs (four rows)
 *   F4 why-habits          G2-379  join each habit (tool shown) to the reason sentence that explains it
 *   F5 habit-chart         G1-405  an OPEN week chart: tick each habit each day
 * ===================================================================================================== */
const HP = require('../../primitives/habit-pictogram.js');
const { CALENDAR } = require('../../data/b2/calendar.js');
const FACE_TRIES = 5000;

function faceStrings(block, mode, loc) {
  const s = block.strings && block.strings[mode];
  if (!s || !String(s.title || '').trim() || !String(s.instruction || '').trim()) throw new Error(`K-380 ${loc}: the bank has no strings.${mode} (refuse)`);
  return s;
}
const reverse = (a) => a.slice().reverse();
const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
/** F1 composer rule, shared by build + the pooled gate: null = a legal printed order of handSteps */
function stepOrderTell(order, key) {
  const n = key.length;
  const pos = order.map((st) => key.indexOf(st));
  if (pos.some((p, i) => p === i)) return 'a card sits in its own reading slot';
  if (order.filter((st, i) => key[i] !== st).length < 3) return 'fewer than 3 cards moved';
  if (same(order, reverse(key))) return 'the reverse of the routine';
  let consec = 0;
  for (let i = 0; i + 1 < n; i++) if (pos[i + 1] === pos[i] + 1) consec++;
  if (consec > 1) return `${consec} neighbouring cards consecutive in the routine`;
  return null;
}
/** F2 composer rule: null = the reading order is neither grouped by phase nor a staircase */
function phaseOrderTell(kinds, PHASE_OF) {
  const ph = kinds.map((k) => PHASE_OF[k]);
  let adj = 0;
  for (let i = 0; i + 1 < ph.length; i++) if (ph[i] === ph[i + 1]) adj++;
  if (adj > 1) return `${adj} same-phase neighbours in reading order`;
  const rank = { before: 0, during: 1, after: 2 };
  const r = ph.map((x) => rank[x]);
  if (r.every((x, i) => i === 0 || x >= r[i - 1]) || r.every((x, i) => i === 0 || x <= r[i - 1])) return 'a staircase (sorted by phase)';
  for (const col of [0, 1]) { const c = ph.filter((x, i) => i % 2 === col); if (new Set(c).size === 1) return 'a column all one phase'; }
  return null;
}
/** F3 side rule: null = exactly half left, not alternating */
function sideTell(sides) {
  const s = sides.join('');
  const nL = (s.match(/L/g) || []).length;
  if (nL !== sides.length / 2) return `${nL} healthy tiles left of ${sides.length}`;
  if (/^(LR)+$/.test(s) || /^(RL)+$/.test(s)) return `alternating ${s}`;
  return null;
}
/** F4 derangement: how many reasons sit beside their own habit */
const straightAcross = (habits, reasons) => habits.filter((h, i) => reasons[i] === h).length;

function unionBox(a, b) {
  const x0 = Math.min(a[0], b[0]), y0 = Math.min(a[1], b[1]);
  return [x0, y0, Math.max(a[0] + a[2], b[0] + b[2]) - x0, Math.max(a[1] + a[3], b[1] + b[3]) - y0];
}
function faceTile(key, variant) {
  const P = COMMON.GERM_PAIRS.find((p) => p.key === key);
  const pose = P[variant];
  if (key === 'cough' || key === 'tissue') {
    const box = unionBox(HP.POSE_BOX[P.healthy], HP.POSE_BOX[P.other]);
    return HP.habitFigure({ pose, fit: true, box }).svg;
  }
  if (key === 'cup') return HP.twoFigures({ pose, px: '100%' }).svg;
  if (key === 'soap') return HP.handsView({ state: pose, px: '100%' }).svg;
  throw new Error(`K-380 stop-the-germs: pair "${key}" is not drawn (the toilet reserve is d3-only and undrawn)`);
}

const FACE_BUILD = {
  'hand-washing-steps'(block, d, loc, rng, seam) {
    if (d.layout !== 'steps-write' || d.cards !== 5) throw new Error(`K-380 hand-washing-steps: layout ${d.layout} / cards ${d.cards}`);
    const s = faceStrings(block, d.mode, loc);
    const key = COMMON.handSteps.slice();
    let order = seam && seam.plan ? seam.plan.order : null;
    for (let t = 0; t < FACE_TRIES && !order; t++) { const o = rng.shuffle(key); if (!stepOrderTell(o, key)) order = o; }
    if (!order) throw new Error(`K-380 ${loc}: no hand-washing order in ${FACE_TRIES} tries (refuse)`);
    const inner = C6.hhStepGrid({ states: order, rowMin: d.rowMin });
    return { bodyHtml: C6.hhFace({ mode: d.mode, stamps: { layout: d.layout, cards: order.length }, inner }), meta: { mode: d.mode, order: order.join(','), key: order.map((st) => key.indexOf(st) + 1).join(''), title: s.title } };
  },
  'brushing-teeth'(block, d, loc, rng, seam) {
    if (d.layout !== 'phase-chips' || d.cards !== Object.keys(COMMON.PHASE_OF).length) throw new Error(`K-380 brushing-teeth: layout ${d.layout} / cards ${d.cards}`);
    const s = faceStrings(block, d.mode, loc);
    const ph = block.phases || {};
    for (const k of ['before', 'during', 'after']) if (!String(ph[k] || '').trim()) throw new Error(`K-380 ${loc}: phases.${k} missing (refuse)`);
    for (const k of Object.keys(COMMON.PHASE_OF)) if (/rinse-mouth|mouth-rinse|mouthwash/.test(k)) throw new Error('K-380: a mouth-rinse card in PHASE_OF');
    const kinds0 = HP.BRUSH_KINDS.filter((k) => COMMON.PHASE_OF[k] && !(COMMON.DROPPED_BRUSH || {})[k]);
    for (const p of ['before', 'during', 'after']) if (kinds0.filter((k) => COMMON.PHASE_OF[k] === p).length < 2) throw new Error(`K-380 brushing-teeth: fewer than 2 ${p} cards`);
    let kinds = seam && seam.plan ? seam.plan.kinds : null;
    for (let t = 0; t < FACE_TRIES && !kinds; t++) { const o = rng.shuffle(kinds0); if (!phaseOrderTell(o, COMMON.PHASE_OF)) kinds = o; }
    if (!kinds) throw new Error(`K-380 ${loc}: no brushing order in ${FACE_TRIES} tries (refuse)`);
    const chips = seam && seam.chips ? seam.chips : [['before', ph.before], ['during', ph.during], ['after', ph.after]];
    const inner = C6.hhPhaseGrid({ kinds, chips, rowMin: d.rowMin });
    return { bodyHtml: C6.hhFace({ mode: d.mode, stamps: { layout: d.layout, cards: kinds.length }, inner }), meta: { mode: d.mode, kinds: kinds.join(','), phases: kinds.map((k) => (COMMON.PHASE_OF[k] || '?')[0]).join(''), title: s.title } };
  },
  'stop-the-germs'(block, d, loc, rng, seam) {
    if (d.layout !== 'choice-pairs' || !Array.isArray(d.germPairs) || d.germPairs.length !== d.rows) throw new Error(`K-380 stop-the-germs: layout ${d.layout} / rows ${d.rows}`);
    const s = faceStrings(block, d.mode, loc);
    for (const k of d.germPairs) if (!COMMON.GERM_PAIRS.find((p) => p.key === k && !p.reserve)) throw new Error(`K-380 stop-the-germs: pair "${k}" is not a drawn pair`);
    for (const p of COMMON.GERM_PAIRS) if (/cough-hand/.test(p.healthy + p.other)) throw new Error('K-380: a cough-into-the-hand pose (outdated)');
    let plan = seam && seam.plan ? seam.plan : null;
    for (let t = 0; t < FACE_TRIES && !plan; t++) {
      const keys = rng.shuffle(d.germPairs);
      const sides = keys.map(() => (rng.next() < 0.5 ? 'L' : 'R'));
      if (!sideTell(sides)) plan = { keys, sides };
    }
    if (!plan) throw new Error(`K-380 ${loc}: no germ-row plan in ${FACE_TRIES} tries (refuse)`);
    const rows = plan.keys.map((k, i) => {
      const h = faceTile(k, 'healthy'), o = faceTile(k, 'other');
      return plan.sides[i] === 'L' ? { key: k, left: h, right: o } : { key: k, left: o, right: h };
    });
    const inner = C6.hhPairRows({ rows, rowMin: d.rowMin });
    return { bodyHtml: C6.hhFace({ mode: d.mode, stamps: { layout: d.layout, rows: rows.length }, inner }), meta: { mode: d.mode, keys: plan.keys.join(','), sides: plan.sides.join(''), title: s.title } };
  },
  'why-habits'(block, d, loc, rng, seam) {
    if (d.layout !== 'reason-match' || !Array.isArray(d.reasonHabits) || d.reasonHabits.length !== d.pairs) throw new Error(`K-380 why-habits: layout ${d.layout} / pairs ${d.pairs}`);
    const s = faceStrings(block, d.mode, loc);
    for (const h of d.reasonHabits) if (!String((block.reasons || {})[h] || '').trim()) throw new Error(`K-380 ${loc}: no reason for "${h}" (refuse)`);
    let plan = seam && seam.plan ? seam.plan : null;
    for (let t = 0; t < FACE_TRIES && !plan; t++) {
      const habits = rng.shuffle(d.reasonHabits), reasons = rng.shuffle(d.reasonHabits);
      if (straightAcross(habits, reasons) <= 1 && !same(reasons, reverse(habits))) plan = { habits, reasons };
    }
    if (!plan) throw new Error(`K-380 ${loc}: no reason order in ${FACE_TRIES} tries (refuse)`);
    const inner = C6.hhReasonMatch({
      habits: plan.habits.map((h) => ({ key: h, pose: COMMON.SHOWN_POSE[h] })),
      reasons: plan.reasons.map((h) => ({ key: h, text: block.reasons[h] })), rowMin: d.rowMin,
    });
    return { bodyHtml: C6.hhFace({ mode: d.mode, stamps: { layout: d.layout, pairs: plan.habits.length }, inner }), meta: { mode: d.mode, habits: plan.habits.join(','), reasons: plan.reasons.join(','), title: s.title } };
  },
  'habit-chart'(block, d, loc, rng) {
    if (d.layout !== 'week-chart' || d.days !== 7 || !Array.isArray(d.chartRows) || d.chartRows.length !== d.rows) throw new Error(`K-380 habit-chart: layout ${d.layout} / rows ${d.rows} / days ${d.days}`);
    const s = faceStrings(block, d.mode, loc);
    const cal = CALENDAR[loc];
    if (!cal) throw new Error(`K-380 ${loc}: no calendar (refuse)`);
    const ws = block.weekStartOverride === 0 || block.weekStartOverride === 1 ? block.weekStartOverride : cal.weekStart;
    const days = Array.from({ length: 7 }, (_, i) => cal.dayAbbr[(ws + i) % 7]);
    const rows = d.chartRows.map((h) => {
      const label = block.labels && block.labels[h];
      if (!String(label || '').trim()) throw new Error(`K-380 ${loc}: no label for "${h}" (refuse)`);
      return { key: h, pose: COMMON.SHOWN_POSE[h], label };
    });
    const inner = C6.hhWeekChart({ rows, days, rowMin: d.rowMin });
    return { bodyHtml: C6.hhFace({ mode: d.mode, stamps: { layout: d.layout, rows: rows.length, 'week-start': ws }, inner }), meta: { mode: d.mode, rows: d.chartRows.join(','), days: days.join(','), title: s.title } };
  },
};

/**
 * The face verify (runs in page.evaluate: no require). Every closed answer is re-derived from the DRAWN parts:
 * F1 the state vector (stream / bubbles above or below / soap held or on the rim / towel), F2 the card kind (tube,
 * cap, paste, molars, the brush head inside or outside the arch polygon, drops, stream, cup), F3 the healthy tile
 * (no spray and an elbow at the mouth · the tissue inside the bin · two cups · lather), F4 the habit (its tool part)
 * against the reason card's stamp. Common to all five: SPARSE (no blank band > 40 px between consecutive blocks),
 * FILL (content reaches 85 % of the body), inside the body and above the footer, text only where the face prints
 * words, no coral / code colour inside a drawing, no digit on F2-F5, no answer stamp that is not empty.
 */
function faceVerify(page, mode) {
  return page.evaluate((mode, C) => {
    const fails = [];
    const root = document.querySelector('[data-ws-content][data-lcs-healthy-habits]');
    if (!root) return ['no healthy-habits root'];
    const partsIn = (el) => { const m = {}; el.querySelectorAll('[data-lcs-part]').forEach((g) => { const b = g.getBoundingClientRect(); if (b.width > 0.3 || b.height > 0.3) (m[g.dataset.lcsPart] = m[g.dataset.lcsPart] || []).push(g); }); return m; };
    const ctr = (el) => { const b = el.getBoundingClientRect(); return [(b.left + b.right) / 2, (b.top + b.bottom) / 2]; };
    const inside = (pt, b) => pt[0] >= b.left && pt[0] <= b.right && pt[1] >= b.top && pt[1] <= b.bottom;
    const answerStamps = [...document.querySelectorAll('[data-lcs-answer]')];
    if (answerStamps.some((e) => e.dataset.lcsAnswer !== '')) fails.push('an answer is stamped (printable decks ship no key; every box stays empty)');
    let textOK = () => false;
    const blocks = [];
    const floor = { K: 56, G1: 44, G2: 36 };

    if (mode === 'hand-washing-steps') {
      const cards = [...root.querySelectorAll('[data-lcs-step-card]')];
      if (cards.length !== C.handSteps.length) fails.push(`${cards.length} step cards (5)`);
      const derived = cards.map((c, i) => {
        const P = partsIn(c);
        const hands = c.querySelector('[data-lcs-hands]');
        const tap = P.stream ? 'on' : 'off';
        let bub = 0;
        if (P.bubbles) {
          const hb = [...c.querySelectorAll('[data-lcs-part^="hand-"]')].map((h) => h.getBoundingClientRect());
          const handBottom = Math.max(...hb.map((b) => b.bottom));
          const cs = [...P.bubbles[0].querySelectorAll('circle')].map((ci) => ctr(ci)[1]);
          bub = cs.every((y) => y > handBottom - 2) ? 'falling' : 'around';
        }
        const soap = P['soap-held'] ? 'hands' : P.soap ? 'rim' : 'none';
        const towel = P.towel ? 1 : 0;
        const vec = [tap, bub === 'falling' ? 1 : bub === 'around' ? 1 : 0, soap, towel].join('|');
        const hit = Object.keys(C.HAND_STATES).filter((st) => C.HAND_STATES[st].join('|') === vec && ((st === 'rinse') === (bub === 'falling')) && ((st === 'rub') === (bub === 'around')));
        if (hit.length !== 1) { fails.push(`card ${i + 1}: the drawing (${vec}, bubbles ${bub}) reads as ${hit.length ? hit.join(' / ') : 'no step'}`); return null; }
        if (hands && hands.dataset.lcsHands !== hit[0]) fails.push(`card ${i + 1}: drawn "${hit[0]}", stamped "${hands.dataset.lcsHands}"`);
        const box = c.querySelector('[data-lcs-step-box]');
        if (!box) fails.push(`card ${i + 1}: no numeral box`);
        else { const b = box.getBoundingClientRect(); if (b.width < 63.4 || b.height < 59.4) fails.push(`card ${i + 1}: box ${b.width} x ${b.height} (64 x 60)`); if (box.textContent.trim()) fails.push(`card ${i + 1}: the box is not empty`); }
        const pic = c.querySelector('.hh-steppic').getBoundingClientRect();
        if (Math.min(pic.width, pic.height) < 176 - 0.6) fails.push(`card ${i + 1}: close-up ${Math.round(Math.min(pic.width, pic.height))} px (< 176)`);
        return hit[0];
      });
      if (derived.every(Boolean) && derived.length === 5) {
        if (new Set(derived).size !== 5) fails.push(`the five cards draw ${new Set(derived).size} distinct steps`);
        const pos = derived.map((st) => C.handSteps.indexOf(st));
        if (pos.some((p, i) => p === i)) fails.push(`order ${derived.join(',')}: a card sits in its own reading slot`);
        if (derived.filter((st, i) => C.handSteps[i] !== st).length < 3) fails.push('fewer than 3 cards moved from the routine');
        if (derived.join() === C.handSteps.slice().reverse().join()) fails.push('the printed order is the reverse of the routine');
        let consec = 0; for (let i = 0; i < 4; i++) if (pos[i + 1] === pos[i] + 1) consec++;
        if (consec > 1) fails.push(`${consec} neighbouring cards consecutive in the routine (<= 1)`);
      }
      cards.forEach((c) => blocks.push(c.querySelector('.hh-plaque')));
      textOK = () => false;
    } else if (mode === 'brushing-teeth') {
      const cells = [...root.querySelectorAll('[data-lcs-phase-cell]')];
      const nCards = +root.dataset.lcsCards;
      if (cells.length !== nCards || nCards !== Object.keys(C.PHASE_OF).length) fails.push(`${cells.length} brushing cards (${Object.keys(C.PHASE_OF).length})`);
      const chipSets = cells.map((c) => [...c.querySelectorAll('[data-lcs-chip]')].map((x) => x.dataset.lcsChip + '=' + x.textContent));
      if (chipSets.some((cs) => cs.join('|') !== chipSets[0].join('|'))) fails.push('the chips are not identical (text + order) in every cell');
      if (chipSets[0] && chipSets[0].map((x) => x.split('=')[0]).join() !== 'before,during,after') fails.push(`chip order ${chipSets[0].map((x) => x.split('=')[0]).join()} (before, during, after)`);
      const kinds = cells.map((c, i) => {
        const P = partsIn(c);
        let kind = null;
        if (P.molars) kind = 'chewing';
        else if (P.arch) {
          const pts = (P.arch[0].closest('svg') && [...P.arch[0].querySelectorAll('rect')].map(ctr)) || [];
          const head = P.brush && P.brush[0].querySelectorAll('rect')[1];
          if (!head || pts.length < 10) { fails.push(`card ${i + 1}: an arch without a brush head`); return null; }
          const q = ctr(head);
          let inPoly = false;
          for (let a = 0, b = pts.length - 1; a < pts.length; b = a++) {
            if (((pts[a][1] > q[1]) !== (pts[b][1] > q[1])) && (q[0] < (pts[b][0] - pts[a][0]) * (q[1] - pts[a][1]) / (pts[b][1] - pts[a][1]) + pts[a][0])) inPoly = !inPoly;
          }
          kind = inPoly ? 'inside' : 'outside';
        } else if (P.tube && P.cap && !P.brush) kind = 'open-tube';
        else if (P.tube && P.paste && P.brush) kind = 'paste-on-brush';
        else if (P.drops && P.head) kind = 'spit';
        else if (P.stream && P.brush) {
          // the bristles are the brush's third rect (handle, head, bristles): every foam bubble counted is BELOW them
          const bristles = P.brush[0].querySelectorAll('rect')[2].getBoundingClientRect();
          const nb = P.bubbles ? [...P.bubbles[0].querySelectorAll('circle')].filter((ci) => ctr(ci)[1] > bristles.bottom).length : 0;
          if (nb < 3) fails.push(`card ${i + 1}: a brush under the tap with ${nb} foam bubbles falling (>= 3: without foam it reads as wetting the brush FIRST, a before step)`);
          if (!P.foam) fails.push(`card ${i + 1}: a brush under the tap with no used foam on its bristles (it would read as wetting the brush FIRST)`);
          kind = 'rinse-brush';
        } else if (P.cup && P.brush) kind = 'brush-in-cup';
        if (!kind) { fails.push(`card ${i + 1}: no brushing card can be read off the drawing (${Object.keys(P).join(',')})`); return null; }
        const st = c.querySelector('[data-lcs-brush]');
        if (st && st.dataset.lcsBrush !== kind) fails.push(`card ${i + 1}: drawn "${kind}", stamped "${st.dataset.lcsBrush}"`);
        const pl = c.querySelector('.hh-plaque').getBoundingClientRect();
        if (Math.min(pl.width, pl.height) < 104) fails.push(`card ${i + 1}: ${Math.round(pl.width)} px (< 104)`);
        c.querySelectorAll('[data-lcs-chip]').forEach((ch) => { const b = ch.getBoundingClientRect(); if (b.height < 39.4) fails.push(`card ${i + 1}: chip ${b.height} px high (< 40)`); if (ch.scrollWidth > ch.clientWidth + 0.5) fails.push(`chip "${ch.textContent}" overflows`); });
        return kind;
      });
      if (kinds.every(Boolean) && kinds.length === cells.length) {
        if (new Set(kinds).size !== kinds.length) fails.push('a brushing card is drawn twice');
        for (const k of kinds) if (C.DROPPED_BRUSH[k]) fails.push(`the dropped card "${k}" is on the page (${C.DROPPED_BRUSH[k]})`);
        for (const p of ['before', 'during', 'after']) if (kinds.filter((k) => C.PHASE_OF[k] === p).length < 2) fails.push(`fewer than 2 ${p} cards`);
        const ph = kinds.map((k) => C.PHASE_OF[k]);
        if (ph.some((x) => !x)) fails.push('a card with no phase in PHASE_OF');
        let adj = 0; for (let i = 0; i + 1 < ph.length; i++) if (ph[i] === ph[i + 1]) adj++;
        if (adj > 1) fails.push(`${adj} same-phase neighbours in reading order (<= 1)`);
        const r = ph.map((x) => ({ before: 0, during: 1, after: 2 })[x]);
        if (r.every((x, i) => i === 0 || x >= r[i - 1]) || r.every((x, i) => i === 0 || x <= r[i - 1])) fails.push('the cards are sorted by phase (a staircase)');
      }
      cells.forEach((c) => blocks.push(c));
      textOK = (el) => !!el.closest('[data-lcs-chip]');
    } else if (mode === 'stop-the-germs') {
      const rows = [...root.querySelectorAll('[data-lcs-pair-row]')];
      if (rows.length !== 4) fails.push(`${rows.length} rows (4)`);
      const sides = rows.map((r, i) => {
        const tiles = [...r.querySelectorAll('[data-lcs-tile]')];
        if (tiles.length !== 2) { fails.push(`row ${i + 1}: ${tiles.length} tiles`); return null; }
        const verdict = tiles.map((t) => {
          const P = partsIn(t);
          if (P.spray || P['cough-puff']) return P.spray ? 'other' : 'healthy';
          if (P.bin && P.tissue) { const bin = P.bin[0].getBoundingClientRect(); return inside(ctr(P.tissue[0]), bin) ? 'healthy' : 'other'; }
          if (t.querySelector('[data-lcs-cups]')) return +t.querySelector('[data-lcs-cups]').dataset.lcsCups === 2 && (P.glass || []).length === 2 ? 'healthy' : 'other';
          if (t.querySelector('[data-lcs-hands]')) return (P.bubbles ? P.bubbles[0].querySelectorAll('circle').length : 0) >= 3 ? 'healthy' : 'other';
          return '?';
        });
        const nh = verdict.filter((v) => v === 'healthy').length;
        if (nh !== 1 || verdict.includes('?')) { fails.push(`row ${i + 1}: ${nh} healthy tiles (${verdict.join(' / ')}) — exactly one`); return null; }
        // one figure scale per row: the head circles (or the two-figure / hands boxes) render at the same size
        const sz = tiles.map((t) => { const h = t.querySelector('[data-lcs-part="head"] circle'); return h ? h.getBoundingClientRect().width : t.querySelector('svg').getBoundingClientRect().width; });
        if (Math.abs(sz[0] - sz[1]) > 0.05 * Math.max(...sz)) fails.push(`row ${i + 1}: the two tiles draw at different scales (${sz.map((x) => x.toFixed(1)).join(' / ')})`);
        tiles.forEach((t) => { const b = t.getBoundingClientRect(); if (Math.min(b.width, b.height) < 124) fails.push(`row ${i + 1}: tile ${Math.round(b.width)} x ${Math.round(b.height)} (< 124)`); blocks.push(t); });
        return verdict[0] === 'healthy' ? 'L' : 'R';
      });
      if (sides.every(Boolean) && sides.length === 4) {
        const s = sides.join(''), nL = (s.match(/L/g) || []).length;
        if (nL !== 2) fails.push(`the healthy tile sits left on ${nL} of 4 rows (exactly 2)`);
        if (s === 'LRLR' || s === 'RLRL') fails.push(`the healthy side alternates ${s}`);
      }
    } else if (mode === 'why-habits') {
      const rows = [...root.querySelectorAll('.hh-matchrow')];
      if (rows.length !== 5) fails.push(`${rows.length} rows (5)`);
      const habitsDrawn = [], reasonsFor = [];
      rows.forEach((r, i) => {
        const pl = r.querySelector('[data-lcs-habit]');
        const P = partsIn(pl);
        const hits = Object.keys(C.SHOWN_CUE).filter((h) => C.SHOWN_CUE[h].every((p) => P[p]));
        if (hits.length !== 1) fails.push(`row ${i + 1}: the drawing reads as ${hits.length ? hits.join(' / ') : 'no habit'}`);
        else if (hits[0] !== pl.dataset.lcsHabit) fails.push(`row ${i + 1}: drawn "${hits[0]}", stamped "${pl.dataset.lcsHabit}"`);
        habitsDrawn.push(hits[0] || null);
        const card = r.querySelector('[data-lcs-reason-for]');
        reasonsFor.push(card ? card.dataset.lcsReasonFor : null);
        const svg = pl.querySelector('[data-lcs-pictogram]').getBoundingClientRect();
        if (Math.max(svg.width, svg.height) < 96 - 0.6) fails.push(`row ${i + 1}: the habit drawing is ${Math.round(Math.max(svg.width, svg.height))} px (< 96)`);
        if (card) {
          const t = card.querySelector('[data-lcs-reason-text]');
          const lines = Math.round(t.getBoundingClientRect().height / parseFloat(getComputedStyle(t).lineHeight || '22'));
          if (lines > 3) fails.push(`row ${i + 1}: the reason wraps to ${lines} lines (<= 3)`);
          if (parseFloat(getComputedStyle(card).fontSize) < 18) fails.push(`row ${i + 1}: reason text under 18 px`);
          if (card.scrollWidth > card.clientWidth + 0.5 || card.scrollHeight > card.clientHeight + 0.5) fails.push(`row ${i + 1}: the reason overflows its card`);
          blocks.push(card);
        }
        blocks.push(pl);
      });
      if (habitsDrawn.every(Boolean)) {
        if ([...habitsDrawn].sort().join() !== [...reasonsFor].sort().join()) fails.push(`the reasons (${reasonsFor.join(',')}) are not one per drawn habit (${habitsDrawn.join(',')})`);
        const straight = habitsDrawn.filter((h, i) => reasonsFor[i] === h).length;
        if (straight > 1) fails.push(`${straight} reasons sit straight across from their habit (<= 1)`);
      }
      textOK = (el) => !!el.closest('[data-lcs-reason-for]');
    } else if (mode === 'habit-chart') {
      const heads = [...root.querySelectorAll('[data-lcs-day-head]')];
      if (heads.length !== 7) fails.push(`${heads.length} day heads (7)`);
      const ticks = [...root.querySelectorAll('[data-lcs-tick]')];
      if (ticks.length !== 35) fails.push(`${ticks.length} tick squares (35)`);
      ticks.forEach((t) => { const b = t.getBoundingClientRect(); if (b.width < 43.4 || b.height < 43.4) fails.push(`tick ${b.width} x ${b.height} (< 44)`); if (t.textContent.trim()) fails.push('a tick square is not empty'); });
      root.querySelectorAll('[data-lcs-chart-row]').forEach((r, i) => {
        const pl = r.querySelector('[data-lcs-habit]');
        const P = partsIn(pl);
        const hits = Object.keys(C.SHOWN_CUE).filter((h) => C.SHOWN_CUE[h].every((p) => P[p]));
        if (hits.length !== 1 || hits[0] !== pl.dataset.lcsHabit) fails.push(`row ${i + 1}: the drawing reads as ${hits.join(' / ') || 'no habit'} (stamped ${pl.dataset.lcsHabit})`);
        const lab = r.querySelector('[data-lcs-row-label]');
        const lines = Math.round(lab.getBoundingClientRect().height / parseFloat(getComputedStyle(lab).lineHeight));
        if (lines > 2) fails.push(`row ${i + 1}: label "${lab.textContent}" wraps to ${lines} lines (<= 2)`);
        if (lab.scrollWidth > lab.clientWidth + 0.5) fails.push(`row ${i + 1}: label "${lab.textContent}" overflows`);
        if (parseFloat(getComputedStyle(lab).fontSize) < 16) fails.push(`row ${i + 1}: label under 16 px`);
        blocks.push(r);
      });
      heads.forEach((h) => blocks.push(h));
      textOK = (el) => !!(el.closest('[data-lcs-day-head]') || el.closest('[data-lcs-row-label]'));
    } else return [`unknown face mode "${mode}"`];

    // ---- text only where the face prints words; no digit on any face but F1 (whose boxes stay empty)
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent.trim();
      if (!t) continue;
      if (!textOK(node.parentElement)) fails.push(`text "${t.slice(0, 24)}" printed outside the face's word slots`);
      if (/\p{Nd}/u.test(t)) fails.push(`a digit on the page: "${t.slice(0, 24)}"`);
    }
    if (mode !== 'hand-washing-steps') { const vis = (document.querySelector('.ws-page').innerText || ''); if (/\p{Nd}/u.test(vis.replace(/LessonCraftStudio\.com/g, ''))) fails.push('a digit printed on the page'); }
    // ---- palette inside every drawing
    const BAN = ['#F2784B', '#C0392B', '#2E6DA4', '#E0A800', '#4E8A3C', '#D9661C', '#7A4E9C', '#8C5A2B', '#D66A8E'];
    root.querySelectorAll('svg [fill], svg [stroke]').forEach((el) => { for (const at of ['fill', 'stroke']) { const v = (el.getAttribute(at) || '').toUpperCase(); if (BAN.includes(v)) fails.push(`${v} inside a drawing`); } });
    // ---- SPARSE + FILL + inside the body + above the footer
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const ins = document.querySelector('.ws-instruction'), foot = document.querySelector('.ws-foot');
    const iv = blocks.filter(Boolean).map((b) => { const r = b.getBoundingClientRect(); return [r.top, r.bottom]; }).filter((x) => x[1] > x[0]);
    const contentBottom = Math.max(...iv.map((x) => x[1])), contentTop = Math.min(...iv.map((x) => x[0]));
    if (ins) iv.push([ins.getBoundingClientRect().top, ins.getBoundingClientRect().bottom]);
    if (foot) iv.push([foot.getBoundingClientRect().top, foot.getBoundingClientRect().bottom]);
    iv.sort((a, b) => a[0] - b[0]);
    let reach = iv[0][1], worst = 0;
    for (const [t, b] of iv.slice(1)) { if (t > reach) worst = Math.max(worst, t - reach); reach = Math.max(reach, b); }
    if (worst > 40) fails.push(`sparse: a ${worst.toFixed(0)} px blank band between consecutive blocks (> 40)`);
    if (contentBottom < body.top + 0.85 * body.height - 0.6) fails.push(`fill: the content ends at ${(100 * (contentBottom - body.top) / body.height).toFixed(0)} % of the body (< 85 %)`);
    if (contentTop < body.top - 0.6 || contentBottom > body.bottom + 0.6) fails.push('the content spills out of the body');
    if (foot && contentBottom > foot.getBoundingClientRect().top + 0.6) fails.push('a block reaches into the footer band');
    return [...new Set(fails)];
  }, mode, { handSteps: COMMON.handSteps, HAND_STATES: COMMON.HAND_STATES, PHASE_OF: COMMON.PHASE_OF, SHOWN_CUE: COMMON.SHOWN_CUE, DROPPED_BRUSH: COMMON.DROPPED_BRUSH || {} });
}

module.exports = {
  id: 'K-380',
  slug: 'healthy-habits',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: 'healthy-habits',
  themeAxis: { applicable: false },
  difficulty: {
    1: { layout: 'hooks', habits: COMMON.baseD1, pairs: 4, plaqueW: 150, plaqueMinH: 220, plaqueMaxH: 270, toolPx: 130, fillMin: 0.75, cueMarks: true, toolOrder: 'derangement' },
    2: { layout: 'hooks', habits: COMMON.baseD2, pairs: 5, plaqueW: 122, plaqueMinH: 190, plaqueMaxH: 236, toolPx: 120, fillMin: 0.75, cueMarks: true, toolOrder: 'derangement' },
    3: { layout: 'hooks', habits: COMMON.baseD3, pairs: 6, plaqueW: 100, plaqueMinH: 165, plaqueMaxH: 240, toolPx: 98, fillMin: 0.55, cueMarks: false, toolOrder: 'derangement' },
  },
  i18n: {
    en: {
      title: 'Healthy Habits: What Does Each Child Need?',
      instruction: 'Draw a line from each child to the thing that child needs.',
    },
  },

  offsets,
  orderTell,
  stepOrderTell,
  phaseOrderTell,
  sideTell,
  straightAcross,
  FACE_BUILD,

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    return this._buildWith({ block: bank('healthy-habits', loc), config: this.difficulty[difficulty] }, { locale: loc }, ctx);
  },

  /**
   * The whole build over an INJECTED {block, config} (the gate's poison seam). `plan` is a
   * GATE-ONLY seam (P3 a forced tool order): build() never passes it.
   */
  _buildWith({ block, config, plan: planSeam }, { locale }, ctx) {
    const d = config;
    const loc = locale;
    if (!d) throw new Error('K-380: no config (the guard needs the resolved config, never the level index)');
    // Phase E: ONE additive knob `mode`. `d.mode` undefined is the base path below, untouched and byte-identical
    // (tools/b3-baseline.js --check); a face config carries its own keys and every face guard keys on them.
    if (d.mode !== undefined) {
      if (!FACE_BUILD[d.mode]) throw new Error(`K-380: unknown mode "${d.mode}"`);
      if (!block) throw new Error(`K-380 ${loc}: no locale block (refuse)`);
      return FACE_BUILD[d.mode](block, d, loc, ctx.rng, { plan: planSeam, chips: arguments[0].chips });
    }
    if (d.layout !== LAYOUT_OK) throw new Error(`K-380: layout "${d.layout}" is not the base hooks (a face config fed to the base build)`);
    if (!Array.isArray(d.habits) || d.habits.length !== d.pairs) throw new Error(`K-380: ${d.habits && d.habits.length} habits for ${d.pairs} pairs`);
    if (![4, 5, 6].includes(d.pairs)) throw new Error(`K-380: pairs ${d.pairs} (4, 5 or 6)`);
    for (const h of d.habits) if (!COMMON.TOOL_OF[h]) throw new Error(`K-380: habit "${h}" has no tool in TOOL_OF`);
    for (const k of ['plaqueW', 'plaqueMinH', 'plaqueMaxH', 'toolPx', 'fillMin']) if (!(d[k] > 0)) throw new Error(`K-380: config ${k} is ${d[k]}`);
    if (d.toolPx < 56 || d.plaqueMinH < 56) throw new Error(`K-380: a drawing under the K floor 56 (${d.plaqueMinH} / ${d.toolPx})`);
    if (typeof d.cueMarks !== 'boolean') throw new Error('K-380: cueMarks must be a boolean');
    if (d.toolOrder !== 'derangement') throw new Error(`K-380: toolOrder "${d.toolOrder}"`);
    if (!block) throw new Error(`K-380 ${loc}: no locale block (refuse)`);
    const s = block.strings && block.strings.base;
    if (!s || !String(s.title || '').trim() || !String(s.instruction || '').trim()) throw new Error(`K-380 ${loc}: the bank has no strings.base (refuse)`);
    // neverTogether on the resolved page (habits + their tools)
    const onPage = new Set([...d.habits, ...d.habits.map((h) => COMMON.TOOL_OF[h])]);
    for (const [a, b] of COMMON.neverTogether) if (onPage.has(a) && onPage.has(b)) throw new Error(`K-380: "${a}" and "${b}" may never share a page`);

    const rng = ctx.rng;
    let plan = planSeam || null;
    if (!plan) {
      const habits = rng.shuffle(d.habits);
      const tools0 = habits.map((h) => COMMON.TOOL_OF[h]);
      for (let t = 0; t < TRIES && !plan; t++) {
        const tools = rng.shuffle(tools0);
        if (!orderTell(habits, tools)) plan = { habits, tools };
      }
      if (!plan) throw new Error(`K-380 ${loc}: no tool order in ${TRIES} tries (refuse)`);
    }
    const bodyHtml = C6.hhHooks({
      habits: plan.habits, tools: plan.tools, marks: d.cueMarks,
      geom: { plaqueW: d.plaqueW, plaqueMinH: d.plaqueMinH, plaqueMaxH: d.plaqueMaxH, toolPx: d.toolPx },
      stamps: { layout: d.layout, 'fill-min': d.fillMin },
    });
    const key = plan.habits.map((h) => plan.tools.indexOf(COMMON.TOOL_OF[h]) + 1).join('');
    return { bodyHtml, meta: { mode: 'base', habits: plan.habits.join(','), tools: plan.tools.join(','), key, offsets: offsets(plan.habits, plan.tools).join(',') } };
  },

  /**
   * Re-derives every pairing from the RENDER (runs in page.evaluate: no require). The
   * pose of each plaque is read off the parts that are DRAWN (a part counts only when it
   * has a visible box), or — with the cue marks off — off the near hand's place on the
   * head; the tool off its drawn parts. The stamps are only compared.
   */
  async verify(page) {
    const mode = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-healthy-habits]'); return r ? r.dataset.lcsMode || '' : ''; });
    if (mode && mode !== 'base') return FACE_BUILD[mode] ? faceVerify(page, mode) : [`unknown face mode "${mode}"`];
    return page.evaluate((C) => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-healthy-habits]');
      if (!root) return ['no healthy-habits root'];
      if (root.dataset.lcsMode !== 'base') return [`mode "${root.dataset.lcsMode}" is not the base (faces verify in Phase E)`];
      if (document.querySelector('[data-lcs-answer]')) fails.push('a [data-lcs-answer] stamp exists (answers are never printed)');
      const n = +root.dataset.lcsPairs, toolPx = +root.dataset.lcsToolPx, marks = root.dataset.lcsMarks === '1';
      const fillMin = +root.dataset.lcsFillMin, zoneMin = +root.dataset.lcsZoneMin, zoneMax = +root.dataset.lcsZoneMax;
      const visible = (g) => { const b = g.getBoundingClientRect(); return b.width > 0.5 && b.height > 0.5; };
      const partsOf = (svgRoot) => new Set([...svgRoot.querySelectorAll('[data-lcs-part]')].filter(visible).map((g) => g.dataset.lcsPart));
      const HABITS = Object.keys(C.CUE_OF);
      // ---- plaques: derive each pose from what is drawn
      const plaques = [...root.querySelectorAll('.hh-plaque')];
      if (plaques.length !== n) fails.push(`${plaques.length} plaques for ${n} pairs`);
      const derivedH = plaques.map((pl, i) => {
        const pics = pl.querySelectorAll('[data-lcs-pictogram="habit"]');
        if (pics.length !== 1) { fails.push(`plaque ${i + 1}: ${pics.length} pictograms`); return null; }
        const g = pics[0];
        if (pl.querySelector('[data-lcs-glyph]')) fails.push(`plaque ${i + 1}: a whole tool glyph is drawn inside the habit (tool leak)`);
        const parts = partsOf(g);
        for (const [tool, tparts] of Object.entries(C.GLYPH_PARTS)) {
          const own = C.TOOL_OF[g.dataset.lcsPose] === tool;
          const shared = tparts.filter((p) => parts.has(p) && !(C.CUE_OF[g.dataset.lcsPose] || []).includes(p));
          if (!own && shared.length >= 1) fails.push(`plaque ${i + 1}: part(s) ${shared.join(',')} of the ${tool} drawn inside the habit`);
          if (own && tparts.filter((p) => parts.has(p)).length >= 2) fails.push(`plaque ${i + 1}: the ${tool} (its own tool) is drawn inside the habit (tool leak)`);
        }
        if (!marks) for (const m of C.MARK_PARTS) if (parts.has(m)) fails.push(`plaque ${i + 1}: cue mark "${m}" drawn with cueMarks off`);
        const hits = HABITS.filter((h) => C.CUE_OF[h].some((p) => parts.has(p)));
        let pose = null;
        if (hits.length === 1) pose = hits[0];
        else if (hits.length > 1) fails.push(`plaque ${i + 1}: cues of ${hits.join(' + ')} on one child`);
        else {
          // no cue part (cue marks off): the near hand on the head. Head circle r 10 at (52,15) in unit space.
          const hand = g.querySelector('[data-lcs-hand="near"]');
          const hy = hand ? +hand.getAttribute('cy') : NaN, hx = hand ? +hand.getAttribute('cx') : NaN;
          if (hy <= 17 && hx >= 58) pose = 'blow-nose';
          else if (hy > 17 && hy <= 25 && hx >= 58) pose = 'brush-teeth';
          else fails.push(`plaque ${i + 1}: no habit can be read off the drawing (hand at ${hx},${hy})`);
        }
        if (pose && pose !== g.dataset.lcsPose) fails.push(`plaque ${i + 1}: the drawing reads "${pose}" but the stamp says "${g.dataset.lcsPose}"`);
        // the child FILLS its plaque (lead review): drawn height / plaque height >= fillMin — a lying child fills the
        // width instead (the sleep scene is the one landscape pose: its width / the plaque's inner width >= 0.85)
        const gb = g.getBoundingClientRect(), pb = pl.getBoundingClientRect();
        if (Math.max(gb.width, gb.height) < 56 - 0.6) fails.push(`plaque ${i + 1}: the drawing is ${Math.round(Math.max(gb.width, gb.height))} px (< 56)`);
        const fillH = gb.height / pb.height, fillW = gb.width / (pb.width - 15);
        if (!(fillH >= fillMin - 0.005 || (pose === 'sleep' && fillW >= 0.85))) fails.push(`plaque ${i + 1} (${pose}): the child fills ${(100 * fillH).toFixed(0)} % of the plaque height (< ${Math.round(100 * fillMin)} %)`);
        if (gb.top < pb.top - 0.6 || gb.bottom > pb.bottom + 0.6 || gb.left < pb.left - 0.6 || gb.right > pb.right + 0.6) fails.push(`plaque ${i + 1}: the drawing spills out of its plaque`);
        return pose;
      });
      // ---- tools: derive each kind from its drawn parts
      const tools = [...root.querySelectorAll('.hh-tool')];
      if (tools.length !== n) fails.push(`${tools.length} tools for ${n} pairs`);
      const plank = root.querySelector('[data-lcs-shelf-part="plank"]');
      const plankTop = plank ? plank.getBoundingClientRect().top : NaN;
      const derivedT = tools.map((tl, j) => {
        const gs = tl.querySelectorAll('[data-lcs-glyph]');
        if (gs.length !== 1) { fails.push(`tool ${j + 1}: ${gs.length} glyphs`); return null; }
        const g = gs[0];
        const parts = partsOf(g);
        const kinds = Object.keys(C.GLYPH_PARTS).filter((k) => C.GLYPH_PARTS[k].every((p) => parts.has(p)));
        if (kinds.length !== 1) { fails.push(`tool ${j + 1}: the drawing reads as ${kinds.length ? kinds.join(' / ') : 'no tool'}`); return null; }
        const kind = kinds[0];
        if (kind !== g.dataset.lcsGlyph || kind !== tl.dataset.lcsTool) fails.push(`tool ${j + 1}: drawn "${kind}", stamped "${g.dataset.lcsGlyph}" / "${tl.dataset.lcsTool}"`);
        // the shared-mark rule: a tool never carries a mark of washing / brushing / another habit's cue
        for (const p of C.TOOL_FORBIDDEN[kind] || []) if (parts.has(p)) fails.push(`tool ${j + 1} (${kind}): carries the forbidden mark "${p}"`);
        if (kind === 'soap' && g.querySelector('circle')) fails.push(`tool ${j + 1} (soap): a round mark on the soap (bubbles pull the brushing child's line to it)`);
        for (const h of derivedH) if (h && C.TOOL_OF[h] !== kind) for (const p of C.CUE_OF[h]) if (parts.has(p)) fails.push(`tool ${j + 1} (${kind}): shares the "${p}" mark with the ${h} child (shared-mark rule)`);
        const svg = g.closest('svg').getBoundingClientRect();
        if (Math.min(svg.width, svg.height) < toolPx - 0.6 || Math.min(svg.width, svg.height) < 56 - 0.6) fails.push(`tool ${j + 1}: ${Math.round(svg.width)} px < ${toolPx}`);
        // the tool STANDS on the plank (its lowest drawn point within 8 px above the plank)
        const gb = g.getBoundingClientRect();
        if (!(plankTop - gb.bottom >= -1 && plankTop - gb.bottom <= 8)) fails.push(`tool ${j + 1} (${kind}): drawn ${Math.round(plankTop - gb.bottom)} px above the plank (it should stand on it)`);
        return kind;
      });
      // ---- the pairing, re-derived: bijection, derangement, never-together
      if (derivedH.every(Boolean) && derivedT.every(Boolean) && derivedH.length === n && derivedT.length === n) {
        const want = derivedH.map((h) => C.TOOL_OF[h]);
        const setW = [...want].sort().join(), setT = [...derivedT].sort().join();
        if (setW !== setT) fails.push(`the shelf (${setT}) is not the tools of the children (${setW})`);
        else {
          const off = derivedH.map((h, i) => ((derivedT.indexOf(C.TOOL_OF[h]) - i) % n + n) % n);
          if (off.some((o) => o === 0)) fails.push(`derangement: a tool sits under its own child (offsets ${off.join(',')})`);
          if (off.every((o) => o === off[0])) fails.push(`derangement: a constant cyclic shift (offset ${off[0]})`);
          if (derivedH.every((h, i) => derivedT.indexOf(C.TOOL_OF[h]) === n - 1 - i)) fails.push('derangement: the tools are the reverse of the children');
          const cnt = {};
          off.forEach((o) => { cnt[o] = (cnt[o] || 0) + 1; });
          for (const [o, c] of Object.entries(cnt)) if (c > 2) fails.push(`derangement: offset ${o} shared by ${c} pairs (> 2)`);
        }
        const onPage = new Set([...derivedH, ...derivedT]);
        for (const [a, b] of C.neverTogether) if (onPage.has(a) && onPage.has(b)) fails.push(`never together: "${a}" and "${b}" share the page`);
      }
      // ---- dots: one under each plaque, one over each tool, 14 px, centred on their column
      const hd = [...root.querySelectorAll('[data-lcs-dot="habit"]')], td = [...root.querySelectorAll('[data-lcs-dot="tool"]')];
      if (hd.length !== n || td.length !== n) fails.push(`dots: ${hd.length} under the children, ${td.length} over the tools (${n} each)`);
      hd.forEach((dt, i) => {
        const r = dt.getBoundingClientRect(), p = plaques[i] && plaques[i].getBoundingClientRect();
        if (Math.abs(r.width - 14) > 0.6 || Math.abs(r.height - 14) > 0.6) fails.push(`dot ${i + 1}: ${r.width} x ${r.height} (14)`);
        if (p && (Math.abs((r.left + r.right) / 2 - (p.left + p.right) / 2) > 1 || r.top < p.bottom)) fails.push(`dot ${i + 1} is not centred under its plaque`);
      });
      td.forEach((dt, j) => {
        const r = dt.getBoundingClientRect(), t = tools[j] && tools[j].getBoundingClientRect();
        if (t && (Math.abs((r.left + r.right) / 2 - (t.left + t.right) / 2) > 1 || r.bottom > t.top)) fails.push(`tool dot ${j + 1} is not centred over its tool`);
      });
      // ---- the pencil zone: 180-260 px of clear space between the child dots and the tool dots
      let zoneTop = NaN, zoneBot = NaN;
      if (hd.length && td.length) {
        zoneTop = Math.max(...hd.map((x) => x.getBoundingClientRect().bottom)); zoneBot = Math.min(...td.map((x) => x.getBoundingClientRect().top));
        const gap = zoneBot - zoneTop;
        if (gap < zoneMin - 0.6 || gap > zoneMax + 24 + 0.6) fails.push(`line zone ${Math.round(gap)} px outside ${zoneMin}..${zoneMax + 24} (the dots' 24 px included)`);
      }
      // ---- SPARSE (lead review 2026-09-23): no blank horizontal band > 60 px between consecutive content blocks,
      // from the instruction to the footer; the one band exempt is the pencil zone between the two dot rows
      {
        const iv = [];
        root.querySelectorAll('[data-lcs-rail-part="rail"], .hh-plaque, .hh-dot, .hh-tool svg [data-lcs-glyph], [data-lcs-shelf-part]').forEach((el) => { const b = el.getBoundingClientRect(); if (b.height > 0) iv.push([b.top, b.bottom]); });
        const ins = document.querySelector('.ws-instruction'), foot = document.querySelector('.ws-foot');
        if (ins) iv.push([ins.getBoundingClientRect().top, ins.getBoundingClientRect().bottom]);
        if (foot) iv.push([foot.getBoundingClientRect().top, foot.getBoundingClientRect().bottom]);
        iv.sort((a, b) => a[0] - b[0]);
        let reach = iv.length ? iv[0][1] : 0, worst = 0;
        for (const [t, b] of iv.slice(1)) {
          if (t > reach && !(Math.abs(reach - zoneTop) < 1 && Math.abs(t - zoneBot) < 1)) worst = Math.max(worst, t - reach);
          reach = Math.max(reach, b);
        }
        if (worst > 60) fails.push(`sparse: a ${worst.toFixed(0)} px blank band between consecutive blocks (> 60)`);
      }
      // ---- 0 characters anywhere in the stage
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) if (node.textContent.trim()) fails.push(`text "${node.textContent.trim().slice(0, 24)}" printed in the stage`);
      // ---- palette inside every pictogram: no coral, no code colour
      const BAN = ['#F2784B', '#C0392B', '#2E6DA4', '#E0A800', '#4E8A3C', '#D9661C', '#7A4E9C', '#8C5A2B', '#D66A8E'];
      root.querySelectorAll('[data-lcs-pictogram] [fill], [data-lcs-pictogram] [stroke], [data-lcs-glyph] [fill], [data-lcs-glyph] [stroke]').forEach((el) => {
        for (const at of ['fill', 'stroke']) { const v = (el.getAttribute(at) || '').toUpperCase(); if (BAN.includes(v)) fails.push(`${v} inside a drawing (coral is the pencil colour; no code colours)`); }
      });
      // ---- inside the body, above the footer
      const body = document.querySelector('[data-lcs-body]'), foot = document.querySelector('.ws-foot');
      const rr = root.getBoundingClientRect();
      if (body) { const b = body.getBoundingClientRect(); if (rr.left < b.left - 0.6 || rr.right > b.right + 0.6 || rr.top < b.top - 0.6) fails.push('stage outside the body'); }
      if (foot) {
        const ft = foot.getBoundingClientRect().top;
        root.querySelectorAll('svg, .hh-plaque, .hh-dot').forEach((el) => { if (el.getBoundingClientRect().bottom > ft + 0.6) fails.push('a drawing reaches into the footer band'); });
      }
      return [...new Set(fails)];
    }, { CUE_OF: COMMON.CUE_OF, GLYPH_PARTS: COMMON.GLYPH_PARTS, TOOL_OF: COMMON.TOOL_OF, TOOL_FORBIDDEN: COMMON.TOOL_FORBIDDEN, neverTogether: COMMON.neverTogether, MARK_PARTS: require('../../primitives/habit-pictogram.js').MARK_PARTS });
  },
};
