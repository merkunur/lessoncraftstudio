/**
 * G1-377 — Butterfly Life Cycle: the Field-Guide Plate (nt10-E, b5; family key
 * `animal-life-cycles`, G1, science, no CCSS — `teaches` "Animal life cycles (science
 * readiness)"; en prose names NGSS 3-LS1-1 as the Grade 3 standard this is readiness for).
 * Design: docs/worksheet-gen/b5-designs/G1-377-animal-life-cycles.md §2 / §5; rulings
 * _work/G1-377-critic.md; build record _work/G1-377-build.md.
 *
 * One flowering host plant stands in the middle of the page and the whole life of the
 * butterfly happens ON it at real scale: a speck of an egg, a small caterpillar, a chrysalis
 * hanging under a leaf, a butterfly on the flower, each ringed coral. A thin teal tether runs
 * from each ring to a big magnifier LENS in a page corner that shows that stage magnified
 * (primitives/life-stage.js). The egg's box is printed 1; the child writes 2, 3, 4 by the
 * other lenses, then — below a dashed rule — the number of the picture that comes AFTER the
 * butterfly (the egg, 1). A child who thinks life is a line writes 5; the loop box is binary.
 *
 * THEME axis OFF, no unitAxis, no library picture, NO word in the body (numerals + drawings).
 * build() reads ONLY its bank: the locale block through lib/b5-common.js bank() (a missing
 * block THROWS — refusal, never an en fallback) and the locale-neutral ALC facts of the same
 * module. Never image-vocabulary.js at render.
 *
 * Ladder (a CONFIG; every guard keys on the RESOLVED keys, never the level index):
 *   d1  anchors egg + adult (1 and 4 printed) · no loop row · lens 144 / box 60     (warm-up; not shipped)
 *   d2  anchors egg · loop row · lens 132 / box 56 / loop lens 104                  (ships)
 *   d3  no anchor · loop row · lens 124 / box 52 / loop lens 96                    (scaffold; not shipped)
 *
 * COMPOSER (locale-neutral — the seed carries no locale): arrangement =
 * ALC.ARRANGEMENTS[rng.int(0, 3)] — the four of the 24 corner placements that pass BOTH tell
 * tests (no linear reading order and no corner walk from the egg reads the cycle; the adult in
 * a top lens). Nothing else is random.
 *
 * Stack (design): plate 528 + dashed rule 18 + loop row 116 = 662 <= 677 (the 4-line fi title)
 * <= 722; the root is a TOP-anchored column: slack falls below the loop row, never between blocks (the nt10-E SPARSE ruling; the design said space-evenly).
 *
 * verify(page) re-derives every answer from the RENDER + the stamps: four lenses, four
 * distinct stages === the biology; rank = biology index + 1 === the box's hidden answer; the
 * given boxes are exactly the configured anchors and print their rank, every other box empty;
 * the loop box present iff configured and expects the successor of the adult ((n-1+1) mod n);
 * the placement read off the rendered lens centres is tell-free (none of the 8 linear reading
 * orders, neither corner walk from the egg reads 1-2-3-4, the adult in a top lens) and in the
 * frozen list; every tether starts on its lens ring and ends on its own spot ring (<= 2 px),
 * crosses no other tether, no other lens, not the stem; spot rings pairwise >= 30 px apart;
 * no text in the body but the given numerals; no <img>; the G1 floors.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const C5 = require('../../templates/components-b5.js');
const { ALC } = require('../../data/b5/animal-life-cycles.js');

const ID = 'G1-377';
const KEY = 'animal-life-cycles';
const G1_FLOOR = 44;
const NUMERAL_FLOOR = 26;

function literal(v, what, loc) {
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${ID}: ${loc} ${what} is missing (refuse — never a vocab / en fallback)`);
  if (v !== v.trim()) throw new Error(`${ID}: ${loc} ${what} "${v}" is not trimmed`);
  if (/[{}]/.test(v)) throw new Error(`${ID}: ${loc} ${what} "${v}" carries a slot`);
  return v;
}
/** §5 helper contract — each THROWS on a missing literal, never falls back to the vocab. */
function stageWord(block, animal, stage, loc) { return literal(block && block.stageWords && block.stageWords[animal] && block.stageWords[animal][stage], `stageWords.${animal}.${stage}`, loc); }
function statement(block, id, loc) { return literal(block && block.statements && block.statements[id], `statements.${id}`, loc); }
function decoyWord(block, loc) { return literal(block && block.decoy && block.decoy['frog.tadpole'], 'decoy.frog.tadpole', loc); }
function successor(animal, stage) { const s = ALC.STAGES[animal]; const i = s.indexOf(stage); if (i < 0) throw new Error(`${ID}: ${animal} has no stage ${stage}`); return s[(i + 1) % s.length]; }
function statementPool(block, cls) {
  const drop = new Set((block && block.drop) || []);
  return ALC.COMPARE.filter((c) => !drop.has(c.id) && (cls === 'both' ? c.truth.length === 2 : c.truth.length === 1 && c.truth[0] === cls));
}
function stringsFor(block, id, loc) {
  const s = block && block.strings && block.strings[id];
  if (!s) throw new Error(`${ID}: the ${loc} bank has no strings.${id} — refuse`);
  literal(s.title, `strings.${id}.title`, loc); literal(s.instruction, `strings.${id}.instruction`, loc);
  return s;
}

const TYPE = {
  id: ID,
  slug: 'butterfly-life-cycle',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { animal: 'butterfly', anchors: ['egg', 'adult'], loop: false, lensD: 144, boxPx: 60, loopLensD: null, givenPx: 32 },
    2: { animal: 'butterfly', anchors: ['egg'], loop: true, lensD: 132, boxPx: 56, loopLensD: 104, givenPx: 32 },
    3: { animal: 'butterfly', anchors: [], loop: true, lensD: 124, boxPx: 52, loopLensD: 96, givenPx: 32 },
  },
  i18n: {
    en: {
      title: 'Butterfly Life Cycle',
      instruction: 'The egg is 1: write 2, 3 and 4 in the boxes as it grows, and in the last box the number of the picture that comes after the butterfly.',
    },
  },
  stageWord, statement, decoyWord, successor, statementPool, stringsFor,

  build({ difficulty, locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    const d = this.difficulty[difficulty];
    if (!d) throw new Error(`${ID}: no difficulty ${difficulty}`);
    return this._buildWith(loadBank(KEY, loc), d, { locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank block + resolved config (the gate's poison seam). */
  _buildWith(block, d, { locale }, ctx) {
    const loc = String(locale || 'en').slice(0, 2);
    if (!block || typeof block !== 'object') throw new Error(`${ID}: no ${loc} bank block`);
    if (!d || typeof d !== 'object') throw new Error(`${ID}: no difficulty config`);
    if (d.layout !== undefined) throw new Error(`${ID}: layout "${d.layout}" is a face (Phase E) — the base composer refuses a face config rather than read it`);
    stringsFor(block, ID, loc);
    if ((block.refuse || []).includes('base')) throw new Error(`${ID}: the ${loc} panel refused the base`);
    const stages = ALC.STAGES[d.animal];
    if (!stages) throw new Error(`${ID}: unknown animal ${d.animal}`);
    if (stages.length !== 4) throw new Error(`${ID}: the plate draws a 4-stage cycle; ${d.animal} has ${stages.length}`);
    for (const a of d.anchors) if (!stages.includes(a)) throw new Error(`${ID}: anchor ${a} is not a ${d.animal} stage`);
    if (!(d.lensD >= 90 && d.lensD >= G1_FLOOR)) throw new Error(`${ID}: lens ${d.lensD} under the floor`);
    if (!(d.boxPx >= G1_FLOOR)) throw new Error(`${ID}: box ${d.boxPx} < the G1 floor ${G1_FLOOR}`);
    if (!(d.givenPx >= NUMERAL_FLOOR)) throw new Error(`${ID}: given numeral ${d.givenPx} px < ${NUMERAL_FLOOR}`);
    if (d.loop && !(d.loopLensD >= 90)) throw new Error(`${ID}: loop lens ${d.loopLensD} < 90`);
    const rng = ctx.rng;
    const pick = ALC.ARRANGEMENTS[rng.int(0, ALC.ARRANGEMENTS.length - 1)];
    const arrangement = d.forceArrangement || pick;   // forceArrangement: the gate's poison seam only (verify must catch a bad one)
    const loopAnswer = stages.indexOf(successor(d.animal, stages[stages.length - 1])) + 1;
    const cfg = { animal: d.animal, anchors: d.anchors, loop: !!d.loop, lensD: d.lensD, boxPx: d.boxPx, loopLensD: d.loopLensD, givenPx: d.givenPx };
    const parts = [C5.lifePlate({ arrangement, anchors: d.anchors, lensD: d.lensD, boxPx: d.boxPx, givenPx: d.givenPx, animal: d.animal, stages })];
    if (d.loop) {
      parts.push(`<div data-lcs-rule style="width:639px;height:18px;flex:0 0 18px;display:flex;align-items:center"><div style="width:100%;border-top:2px dashed #C8BFAE"></div></div>`);
      parts.push(C5.loopRow({ animal: d.animal, lensD: d.loopLensD, boxPx: d.boxPx, answer: loopAnswer }));
    }
    const bodyHtml = `<div data-ws-content data-lcs-type="${ID}" data-lcs-family="${KEY}" data-lcs-cfg='${JSON.stringify(cfg)}' ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:0;min-height:0">${parts.join('')}</div>`;
    return { bodyHtml, meta: { arrangement: arrangement.id || 'X', placement: { TL: arrangement.TL, TR: arrangement.TR, BL: arrangement.BL, BR: arrangement.BR }, loopAnswer, cfg } };
  },

  async verify(page) {
    return page.evaluate(({ ID, STAGES, ARRANGEMENTS }) => {
      const f = [];
      const root = document.querySelector(`[data-lcs-type="${ID}"]`);
      if (!root) return ['no root'];
      let cfg; try { cfg = JSON.parse(root.dataset.lcsCfg); } catch (e) { return ['unreadable cfg']; }
      const stages = STAGES[cfg.animal];
      if (document.querySelector('.ws-body img')) f.push('an <img> in the body');
      const plate = root.querySelector('[data-lcs-plate]');
      if (!plate) return f.concat('no plate');
      const pr = plate.getBoundingClientRect();
      const lenses = [...plate.querySelectorAll('[data-lcs-lens]')];
      if (lenses.length !== 4) f.push(`${lenses.length} plate lenses ≠ 4`);
      const L = lenses.map((l) => {
        const r = l.getBoundingClientRect(), svg = l.querySelector('svg[data-lcs-prim="life-stage"]');
        const [a, s] = (l.dataset.lcsStage || '').split('.');
        if (!svg || svg.dataset.lcsFigure !== `life-${a}-${s}`) f.push(`lens ${l.dataset.lcsStage}: the drawing is ${svg ? svg.dataset.lcsFigure : 'missing'}`);
        return { el: l, animal: a, stage: s, cx: r.left - pr.left + r.width / 2, cy: r.top - pr.top + r.height / 2, d: r.width, h: r.height };
      });
      if (new Set(L.map((x) => x.stage)).size !== 4 || !stages.every((s) => L.some((x) => x.stage === s && x.animal === cfg.animal))) f.push(`the lenses show ${L.map((x) => x.animal + '.' + x.stage).join(',')} — not the four ${cfg.animal} stages`);
      for (const x of L) { if (Math.abs(x.d - cfg.lensD) > 0.6 || Math.abs(x.h - cfg.lensD) > 0.6) f.push(`lens ${x.stage} ${x.d.toFixed(1)} px ≠ ${cfg.lensD}`); if (x.d < 44) f.push(`lens ${x.stage} under the G1 floor`); }
      // positions from the RENDER
      const mx = (Math.min(...L.map((x) => x.cx)) + Math.max(...L.map((x) => x.cx))) / 2, my = (Math.min(...L.map((x) => x.cy)) + Math.max(...L.map((x) => x.cy))) / 2;
      const at = {};
      for (const x of L) { const p = (x.cy < my ? 'T' : 'B') + (x.cx < mx ? 'L' : 'R'); if (at[p]) f.push(`two lenses in the ${p} corner`); at[p] = x; }
      const rank = (s) => stages.indexOf(s) + 1;
      if (['TL', 'TR', 'BL', 'BR'].every((p) => at[p])) {
        const R = Object.fromEntries(Object.entries(at).map(([p, x]) => [p, rank(x.stage)]));
        const orders = [['TL', 'TR', 'BL', 'BR'], ['TR', 'TL', 'BR', 'BL'], ['BL', 'BR', 'TL', 'TR'], ['BR', 'BL', 'TR', 'TL'], ['TL', 'BL', 'TR', 'BR'], ['TR', 'BR', 'TL', 'BL'], ['BL', 'TL', 'BR', 'TR'], ['BR', 'TR', 'BL', 'TL']];
        for (const o of orders) if (o.map((p) => R[p]).join() === '1,2,3,4') f.push(`arrangement tell: reading ${o.join('>')} reads the cycle in order`);
        const ring = ['TL', 'TR', 'BR', 'BL'];
        const e = ring.findIndex((p) => R[p] === 1);
        for (const dir of [1, -1]) { const walk = [0, 1, 2, 3].map((k) => R[ring[(e + dir * k + 8) % 4]]).join(); if (walk === '1,2,3,4') f.push(`arrangement tell: the corner walk ${dir > 0 ? 'clockwise' : 'anticlockwise'} from the egg reads the cycle`); }
        if (!(at.TL.stage === 'adult' || at.TR.stage === 'adult')) f.push('arrangement tell: the adult is not in a top lens (its mark is the flower)');
        const placed = { TL: at.TL.stage, TR: at.TR.stage, BL: at.BL.stage, BR: at.BR.stage };
        if (!ARRANGEMENTS.some((a) => ['TL', 'TR', 'BL', 'BR'].every((p) => a[p] === placed[p]))) f.push(`arrangement tell: ${JSON.stringify(placed)} is not one of the frozen tell-free placements`);
        // per-page answer placement: every corner holds a distinct rank, the open answers sit in distinct corners
        const open = Object.values(R).filter((r, i) => !cfg.anchors.includes(stages[r - 1]));
        if (new Set(Object.values(R)).size !== 4) f.push('two corners hold the same answer');
        void open;
      }
      // boxes
      const boxes = [...plate.querySelectorAll('[data-lcs-box]')];
      if (boxes.length !== 4) f.push(`${boxes.length} plate boxes ≠ 4`);
      for (const b of boxes) {
        const x = L.find((l) => l.el.dataset.lcsPos === b.dataset.lcsPos);
        if (!x) { f.push(`box ${b.dataset.lcsPos} has no lens`); continue; }
        const want = String(rank(x.stage));
        if (b.dataset.lcsAnswer !== want) f.push(`box by the ${x.stage} expects "${b.dataset.lcsAnswer}" ≠ ${want}`);
        const given = cfg.anchors.includes(x.stage);
        const txt = b.textContent.trim();
        if (given && (b.dataset.lcsGiven !== want || txt !== want)) f.push(`the ${x.stage} box should print its rank ${want} (prints "${txt}")`);
        if (!given && (txt || b.dataset.lcsGiven)) f.push(`answer printed: the ${x.stage} box shows "${txt || b.dataset.lcsGiven}"`);
        const r = b.getBoundingClientRect();
        if (r.width < 44 || r.height < 44 || Math.abs(r.width - cfg.boxPx) > 0.6) f.push(`box ${x.stage} ${r.width.toFixed(0)} px (want ${cfg.boxPx}, >= 44)`);
        const lr = x.el.getBoundingClientRect();
        if (Math.abs((r.left + r.width / 2) - (lr.left + lr.width / 2)) > 1 || r.top < lr.bottom - 0.5 || r.top - lr.bottom > 16) f.push(`box ${x.stage} is not centred under its lens`);
        if (given && parseFloat(getComputedStyle(b).fontSize) < 26) f.push(`given numeral under 26 px`);
      }
      // loop
      const loop = root.querySelector('[data-lcs-loop]');
      if (cfg.loop) {
        if (!loop) f.push('the loop box is missing');
        else {
          const want = String(stages.indexOf(stages[(stages.length - 1 + 1) % stages.length]) + 1);
          if (loop.dataset.lcsAnswer !== want) f.push(`cycle: the box after the ${stages[stages.length - 1]} expects "${loop.dataset.lcsAnswer}" ≠ ${want} (after the adult comes the first stage again)`);
          if (loop.textContent.trim()) f.push('answer printed: the loop box is not empty');
          const ll = root.querySelector('[data-lcs-loop-lens]');
          if (!ll || ll.dataset.lcsStage !== `${cfg.animal}.${stages[stages.length - 1]}`) f.push('the loop row does not show the adult');
          else if (Math.abs(ll.getBoundingClientRect().width - cfg.loopLensD) > 0.6) f.push('loop lens size');
        }
      } else if (loop) f.push('a loop box on a level without the loop');
      // tethers + spots (plate svg coordinates === plate px)
      const svg = plate.querySelector('svg[data-lcs-scenery]');
      const spots = {}, teth = {};
      for (const c of svg.querySelectorAll('circle[data-lcs-spot]')) spots[c.dataset.lcsSpot] = { x: +c.getAttribute('cx'), y: +c.getAttribute('cy'), r: +c.getAttribute('r') };
      for (const t of svg.querySelectorAll('line[data-lcs-tether]')) teth[t.dataset.lcsTether] = { a: [+t.getAttribute('x1'), +t.getAttribute('y1')], b: [+t.getAttribute('x2'), +t.getAttribute('y2')] };
      const segX = (p, q, r, s) => { const d = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]); return d(p, q, r) * d(p, q, s) < 0 && d(r, s, p) * d(r, s, q) < 0; };
      const segDist = (c, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1]; const t = Math.max(0, Math.min(1, ((c[0] - a[0]) * dx + (c[1] - a[1]) * dy) / (dx * dx + dy * dy))); return Math.hypot(c[0] - a[0] - t * dx, c[1] - a[1] - t * dy); };
      const stem = svg.querySelector('[data-lcs-stem]').getBBox();
      for (const x of L) {
        const s = spots[x.stage], t = teth[x.stage];
        if (!s || !t) { f.push(`${x.stage}: no spot ring / tether`); continue; }
        if (Math.abs(Math.hypot(t.b[0] - s.x, t.b[1] - s.y) - s.r) > 2) f.push(`tether off spot: the ${x.stage} tether ends ${(Math.hypot(t.b[0] - s.x, t.b[1] - s.y) - s.r).toFixed(1)} px from its spot ring`);
        if (Math.abs(Math.hypot(t.a[0] - x.cx, t.a[1] - x.cy) - x.d * 97 / 200) > 2) f.push(`the ${x.stage} tether does not start on its lens ring`);
        for (const y of L) if (y !== x && segDist([y.cx, y.cy], t.a, t.b) < y.d / 2) f.push(`the ${x.stage} tether crosses the ${y.stage} lens`);
        for (const [k, u] of Object.entries(teth)) if (k !== x.stage && segX(t.a, t.b, u.a, u.b)) f.push(`the ${x.stage} and ${k} tethers cross`);
        const corners = [[stem.x, stem.y], [stem.x + stem.width, stem.y], [stem.x + stem.width, stem.y + stem.height], [stem.x, stem.y + stem.height]];
        for (let i = 0; i < 4; i++) if (segX(t.a, t.b, corners[i], corners[(i + 1) % 4])) f.push(`the ${x.stage} tether crosses the stem`);
      }
      const sk = Object.keys(spots);
      for (let i = 0; i < sk.length; i++) for (let j = i + 1; j < sk.length; j++) if (Math.hypot(spots[sk[i]].x - spots[sk[j]].x, spots[sk[i]].y - spots[sk[j]].y) < 30) f.push(`spot rings ${sk[i]} / ${sk[j]} closer than 30 px`);
      // text: nothing but the given numerals
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) { const t = n.textContent.trim(); if (!t) continue; const box = n.parentElement.closest('[data-lcs-given]'); if (!box) f.push(`text in the body: "${t.slice(0, 30)}"`); }
      // stays in the page
      const br = document.querySelector('.ws-body').getBoundingClientRect();
      for (const e of root.querySelectorAll('[data-lcs-plate],[data-lcs-loop-row]')) { const r = e.getBoundingClientRect(); if (r.left < br.left - 0.5 || r.right > br.right + 0.5 || r.top < br.top - 0.5 || r.bottom > br.bottom + 0.5) f.push('the plate / loop row leaves the body'); }
      return f;
    }, { ID, STAGES: ALC.STAGES, ARRANGEMENTS: ALC.ARRANGEMENTS });
  },
};

module.exports = TYPE;
