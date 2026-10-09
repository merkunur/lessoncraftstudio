/**
 * K-396 — How to Draw a Cat Step by Step (nt2-G / b7 flagship; `how-to-draw`, K; PDF ONLY: no key, no screen).
 *
 * The page (K-396 FINAL §2 "rail and paper"): a teal rail down the left carries the numbered step cards of ONE reviewed
 * library drawing's own lines (lib/htd-steps.js over data/htd/<slug>.json: step 1 the outer line, then the big parts,
 * the features, the details; the last card the finished drawing in ink; each card's new lines coral); the paper, the
 * page's only dashed coral frame, is the biggest object beside it. The UNIT is the drawing (unitAxis; every face pins
 * one, a wave may swap a market's demand leader through unitOverrides); the title carries the animal through {U}/{L}.
 *
 * One additive knob `mode` (FINAL §3): 'base' | 'shapes' | 'trace' | 'finish' | 'grid' | 'word' | 'scene' | 'order' |
 * 'copy-steps' | 'write' | 'memory' — ten CODE faces on this one spec (rows in tools/b7var-rows/how-to-draw.js); the base
 * path is untouched by them (data-lcs-htd-mode="base"). Guards key on the resolved config, never on the level index.
 * Nothing is sampled on any face but the order face's permutation (SCRAMBLE5 / SCRAMBLE4, locale-neutral seed).
 */
'use strict';
const { bank } = require('../../lib/b7-common.js');
const B = require('../../data/b7/how-to-draw.js');
const Hd = require('../../lib/htd-steps.js');
const C7 = require('../../templates/components-b7.js');
const fs = require('fs');
const path = require('path');

const LANE_PAD_Y = 2;             // the lane's vertical padding (the default 12 px would push a 660 stack past the 677 fi budget)
const LANE_W = 639;               // .ws-lane inner width at the default horizontal padding
const COLOR = require('../../primitives/_tokens.js').color;
const TRACE_GREY = '#CBCBCB';   // the trace fill: a neutral light grey (K-402 says "the grey rabbit")
const upperFirst = (s) => (s ? s[0].toLocaleUpperCase() + s.slice(1) : s);

/** the K-396 d1/d2/d3 ladder (FINAL §2); the faces re-point d2 with their own mode knobs */
const D = {
  1: { mode: 'base', steps: 'all', orient: 'ladder', rail: 'left', cardPx: 150, box: { w: 449, ratio: 'bbox' }, guideShapes: true },
  2: { mode: 'base', steps: 'all', orient: 'ladder', rail: 'left', cardPx: 150, box: { w: 449, ratio: 'bbox' }, guideShapes: false },
  3: { mode: 'base', steps: 'all', orient: 'ladder', rail: 'left', cardPx: 150, box: { w: 449, ratio: 'bbox', count: 2 }, guideShapes: false },
};

function block(locale) { return bank('how-to-draw', String(locale || 'en').slice(0, 2)); }
function ratioOf(S) { const vb = Hd.panelBox(S, { viewBox: 'bbox' }); return vb[2] / vb[3]; }
/** a paper of width w (or height h) at the drawing's own ratio, never taller than maxH */
function paperSize(S, { w, h, maxH = 660, maxW = LANE_W }) {
  const r = ratioOf(S);
  let W = w, H = h;
  if (W && !H) H = Math.round(W / r);
  if (H && !W) W = Math.round(H * r);
  if (H > maxH) { H = maxH; W = Math.round(H * r); }
  if (W > maxW) { W = maxW; H = Math.round(W / r); }
  return { w: W, h: H };
}
function lane(inner, extra = '') {
  return `<div class="ws-lane" ${extra} style="box-sizing:border-box;width:675px;padding:${LANE_PAD_Y}px 16px;display:flex;align-items:flex-start;justify-content:flex-start">${inner}</div>`;
}
function root(d, unitSlug, inner) {
  return `<div data-ws-content data-lcs-how-to-draw data-lcs-htd-mode="${d.mode}" data-lcs-htd-unit="${unitSlug}" data-lcs-htd-orient="${d.orient || 'none'}" data-lcs-htd-rail="${d.rail || 'left'}" style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;min-height:0">${inner}</div>`;
}

module.exports = {
  id: 'K-396',
  slug: 'how-to-draw',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: 'how-to-draw',
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: () => B.UNITS.map((u) => u.slug),
    exemplar: (loc, spec) => (spec && spec.difficulty && spec.difficulty[2] && spec.difficulty[2].unit) || B.FACES.base.unit,   // a face spec's pinned unit (the emitted faces inherit this axis)
    tokens: (unit, loc) => { const f = B.formFor(block(loc), unit); return { U: upperFirst(f.t), L: f.t, N: f.n || upperFirst(f.stem), UNIT: unit }; },
  },
  difficulty: D,
  i18n: { en: { title: B.HOW_TO_DRAW.en.strings.base.title, instruction: B.HOW_TO_DRAW.en.strings.base.instruction } },
  levelSetWords: (m) => [m.unit, m.mode],

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = String(locale || 'en').slice(0, 2);
    const blk = block(loc);
    const mode = d.mode || 'base';
    if (!B.FACES[mode]) throw new Error(`K-396: unknown mode "${mode}"`);
    const unitSlug = unit || d.unit || B.unitFor(blk, mode);
    B.formFor(blk, unitSlug);   // the title form must exist for this locale (refusal, never a fallback)
    const S = B.stepsFor(unitSlug);
    const n = S.steps.length;
    const rng = ctx.rng;
    const meta = { unit: unitSlug, mode, steps: n };
    let body;

    if (mode === 'base' || mode === 'shapes' || mode === 'word' || mode === 'write') {
      // THE LADDER faces: cards down the rail, the paper (+ a lane or ruled rows) in the right column
      const cardPx = d.cardPx || (mode === 'write' ? 118 : 150);
      const outer = cardPx + 6;
      const H = 660;
      const colW = LANE_W - 16 - outer - 18;
      let right;
      if (mode === 'word') {
        const noun = B.nounFor(blk, unitSlug);
        const laneH = (d.lane && d.lane.h) || 60, trios = ((d.lane && d.lane.reps) || 2) + (d.lane && d.lane.emptyLast ? 1 : 0);
        const laneTot = trios * laneH + (trios - 1) * 2;
        const p = paperSize(S, { w: colW, maxH: H - 12 - laneTot });
        right = `<div style="display:flex;flex-direction:column;gap:12px;width:${colW}px">${C7.htdPaper({ w: p.w, h: p.h, role: 'primary' })}` +
          C7.htdWordLane({ noun, w: colW, glyphH: (d.lane && d.lane.glyphH) || 40, h: laneH, reps: (d.lane && d.lane.reps) || 2, emptyLast: !!(d.lane && d.lane.emptyLast), modelless: !!(d.lane && d.lane.modelless), stack: true }) + `</div>`;
        meta.noun = noun;
      } else if (mode === 'write') {
        const starters = d.starters === 'none' ? [] : B.startersFor(blk, unitSlug);
        const rows = d.rows || 3, rowH = d.rowH || 48, rowsTot = rows * rowH + (rows - 1) * 6;
        const p = paperSize(S, { h: (d.paper && d.paper.h) || (H - 10 - rowsTot), maxW: colW, maxH: H - 10 - rowsTot });
        right = `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:${colW}px">${C7.htdPaper({ w: p.w, h: p.h, role: 'primary' })}${C7.htdRows({ starters, w: colW, rows, h: rowH, glyphH: d.glyphH || 24 })}</div>`;
        meta.starters = starters;
      } else {
        const p = paperSize(S, { w: (d.box && d.box.w) || colW, maxH: H });
        const guides = mode === 'shapes' ? (d.boxGuides === 'none' ? null : { S, outline: d.boxGuides === 'shapes+outline' }) : (d.guideShapes ? { S } : null);
        if (d.box && d.box.count === 2) {
          const q = paperSize(S, { h: Math.floor((H - 10) / 2), maxW: colW });
          right = `<div style="display:flex;flex-direction:column;gap:10px;align-items:center;width:${colW}px">${C7.htdPaper({ w: q.w, h: q.h, role: 'secondary' })}${C7.htdPaper({ w: q.w, h: q.h, role: 'secondary' })}</div>`;   // d3: draw it twice, two secondary-floor papers (FINAL §2)
        } else right = `<div style="width:${colW}px">${C7.htdPaper({ w: p.w, h: p.h, role: 'primary', guides })}</div>`;
      }
      const ladderOpts = { S, cardPx, badges: true, height: H, rail: d.rail || 'left' };
      const ladder = C7.htdLadder(ladderOpts);
      // card 1 of the shapes face shows the guides under the outline: re-render that card's svg
      let ladderHtml = ladder;
      if (mode === 'shapes' && d.shapesOnFirst !== false) {
        const svg0 = Hd.stepSvg(S, 0, { width: cardPx, height: cardPx, viewBox: 'bbox', shapes: true, guide: COLOR.inkSoft });
        const plain = Hd.stepSvg(S, 0, { width: cardPx, height: cardPx, viewBox: 'bbox', lastInInk: true, shapes: false });
        ladderHtml = ladder.replace(plain, svg0);
      }
      const row = d.rail === 'right' ? right + `<div style="width:18px;flex:0 0 18px"></div>` + ladderHtml : ladderHtml + `<div style="width:18px;flex:0 0 18px"></div>` + right;
      body = lane(`<div style="display:flex;align-items:flex-start;width:${LANE_W}px;height:${H}px">${row}</div>`);
    } else if (mode === 'order') {
      const cardPx = d.cardPx || 118, outer = cardPx + 6, H = 660;
      const table = n === 5 ? B.COMMON.SCRAMBLE5 : B.COMMON.SCRAMBLE4;
      if ((n === 5 && d.scramble !== 'SCRAMBLE5') || (n === 4 && d.scramble !== 'SCRAMBLE4')) throw new Error(`K-396 order: ${unitSlug} has ${n} steps but the face asks ${d.scramble}`);
      const perm = B.drawScramble(table, rng);              // slot → step number
      if (!B.lawN(perm)) throw new Error('K-396 order: a drawn permutation breaks the scramble law');
      const order = perm.map((v) => v - 1);
      const ladder = C7.htdLadder({ S, cardPx, badges: false, order, beside: 'numeral', besideW: 64, besideH: 60, height: H, rail: d.rail || 'left' });
      const leftW = 16 + outer + 10 + 64, colW = LANE_W - leftW - 18;
      const p = paperSize(S, { w: colW, maxH: H });
      const right = `<div style="width:${colW}px">${C7.htdPaper({ w: p.w, h: p.h, role: 'primary' })}</div>`;
      body = lane(`<div style="display:flex;align-items:flex-start;width:${LANE_W}px;height:${H}px">${ladder}<div style="width:18px;flex:0 0 18px"></div>${right}</div>`);
      meta.order = perm.join('');
    } else if (mode === 'trace') {
      const cardPx = d.cardPx || 140;
      const strip = C7.htdStrip({ S, cardPx, badges: true, gap: 12, width: LANE_W });
      const stripH = 16 + cardPx + 6 + 6;
      const tw = d.twinW || 300;
      const t = paperSize(S, { w: tw, maxH: 669 - stripH - 10 });
      const fill = d.traceFill === 'creamDeep' ? COLOR.creamDeep : TRACE_GREY;   // the instruction says GREY — COLOR.grid (#C8BFAE) printed beige
      const traceCard = C7.htdFullCard({ S, w: t.w - 6, h: t.h - 6, fill, frame: 'pencil', attrs: 'data-lcs-htd-trace="1"' });
      const twin = d.twin === false ? traceCard : C7.htdTwin({ left: traceCard, right: C7.htdPaper({ w: t.w, h: t.h, role: 'twin' }), gap: LANE_W - 2 * t.w > 20 ? LANE_W - 2 * t.w : 20 });
      body = lane(`<div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:${LANE_W}px">${strip}${twin}</div>`);
    } else if (mode === 'finish') {
      const pw = d.pairW || 296;
      const inner = pw - 6;
      // the omitted step must read as MISSING: never the outline, and never the last (details) step — without its
      // iris and mane edge the pony read as a complete pony with its eyes closed (the pt panel, 2026-10-09). The
      // biggest step between them (a tail, the legs, a wing) leaves a hole a child can see.
      const shares = S.steps.map((s, i) => (i >= 1 && (i <= n - 2 || n < 3) ? s.share : -1));
      let omit = d.omit === 'last' ? n - 1 : shares.indexOf(Math.max(...shares));
      if (omit < 1 || S.steps[omit].share < B.COMMON.STEP_FLOOR) throw new Error(`K-396 finish: ${unitSlug} has no inner step ≥ 0.08 to omit`);
      const vb = Hd.panelBox(S, { viewBox: 'bbox' }), ph = Math.round(inner * vb[3] / vb[2]);
      const model = C7.htdFullCard({ S, w: inner, h: ph, frame: 'card', badge: 'dot', attrs: 'data-lcs-htd-model="1"' });
      const copies = d.copies === 2 ? [omit, (omit % (n - 1)) + 1] : [omit];
      const copy = copies.map((k) => C7.htdFullCard({ S, w: inner, h: ph, without: [k], frame: 'pencil', badge: 'ring', attrs: `data-lcs-htd-copy="1" data-lcs-omit="${k}"` })).join('');
      const pair = `<div style="display:flex;gap:${d.copies === 2 ? 20 : LANE_W - 2 * pw}px;justify-content:center;align-items:flex-start;width:${LANE_W}px">${model}${copy}</div>`;
      const stripRail = `<div style="width:${LANE_W}px;margin-bottom:6px">${C7.htdRail({ orient: 'strip', length: LANE_W })}</div>`;
      let paper = '';
      // the stack: lane 4 + rail 16 + 6 + the pair (ph + 6) + 12 + the paper ≤ 677 (FINAL §3 F3: the recorded 296 / 283 fallback applies, the card measures 4 px taller than designed)
      // a full card renders ph + 10 tall (measured: frame + badge seat)
      if (d.paper) { const pp = paperSize(S, { w: d.paper.w, maxH: 677 - 4 - 16 - 6 - (ph + 10) - 12 }); paper = `<div style="margin-top:12px">${C7.htdPaper({ w: pp.w, h: pp.h, role: 'secondary' })}</div>`; }
      body = lane(`<div style="display:flex;flex-direction:column;align-items:center;gap:0;width:${LANE_W}px">${stripRail}${pair}${paper}</div>`);
      meta.omit = omit;
    } else if (mode === 'grid') {
      const cells = d.cells || 4, cellPx = d.cellPx || 72;
      const g1 = C7.htdGrid({ cells, cellPx, frame: 'card', model: S, labels: !!d.labels, attrs: 'data-lcs-htd-gridrole="model"' });
      const g2 = C7.htdGrid({ cells, cellPx, frame: 'pencil', model: null, labels: !!d.labels, attrs: 'data-lcs-htd-gridrole="target"' });
      const gsize = cells * cellPx + 4 + (d.labels ? 22 : 0);
      const grids = `<div style="display:flex;gap:${LANE_W - 2 * gsize}px;justify-content:center;width:${LANE_W}px">${g1}${g2}</div>`;
      const pp = paperSize(S, { h: (d.paper && d.paper.h) || 350, maxW: LANE_W, maxH: 669 - gsize - 12 });
      body = lane(`<div style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${LANE_W}px">${grids}${C7.htdPaper({ w: pp.w, h: pp.h, role: 'primary' })}</div>`);
    } else if (mode === 'scene') {
      const u = B.unitRecord(unitSlug);
      const sceneId = d.scene || u.fdScene, heroItem = d.heroItem != null ? d.heroItem : u.heroItem;
      const f = path.join(__dirname, '..', '..', 'data', 'fd', sceneId + '.json');
      if (!fs.existsSync(f)) throw new Error(`K-396 scene: data/fd/${sceneId}.json is absent (node tools/fd-build.js --only=${sceneId})`);
      const scene = JSON.parse(fs.readFileSync(f, 'utf8'));
      const FD = require('../../lib/fd-scene.js');
      const cardPx = d.cardPx || 118;
      const strip = d.steps === 'none' ? '' : C7.htdStrip({ S, cardPx, badges: true, gap: 12, width: LANE_W });
      const stripH = d.steps === 'none' ? 0 : 16 + cardPx + 6 + 6 + 10;
      const sw = Math.min(d.sceneW || 540, Math.floor((669 - stripH - 5) * scene.w / scene.h));
      const bankHtml = C7.htdSceneBank({ scene, heroItem, w: sw, ring: !!d.heroRing, renderPanel: FD.renderPanel });
      body = lane(`<div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:${LANE_W}px">${strip}${bankHtml}</div>`);
      meta.scene = sceneId; meta.heroItem = heroItem;
    } else if (mode === 'copy-steps') {
      const colW = d.colW || 150, cardPx = colW - 6, gap = Math.floor((LANE_W - n * colW) / (n - 1));
      const vb = Hd.panelBox(S, { viewBox: 'bbox' });
      const boxH = d.boxH === 'ratio' ? Math.round(colW / (vb[2] / vb[3])) : (d.boxH || 136);
      const strip = C7.htdStrip({ S, cardPx, badges: true, gap, width: LANE_W, under: () => C7.htdPaper({ w: colW, h: boxH, role: 'stepBox' }) });
      const stripH = 16 + colW + 6 + 8 + boxH;
      let paper = '';
      if (d.finalBox !== false) { const pp = paperSize(S, { h: (d.paper && d.paper.h) || 340, maxW: LANE_W, maxH: 669 - stripH - 12 }); paper = C7.htdPaper({ w: pp.w, h: pp.h, role: 'primary' }); }
      body = lane(`<div style="display:flex;flex-direction:column;align-items:center;gap:12px;width:${LANE_W}px">${strip}${paper}</div>`);
    } else if (mode === 'memory') {
      const mw = d.modelW || 220;
      const vb = Hd.panelBox(S, { viewBox: 'bbox' }), mh = Math.round(mw * vb[3] / vb[2]);
      const model = C7.htdFullCard({ S, w: mw, h: mh, frame: 'card', attrs: 'data-lcs-htd-model="1"' });
      const flapH = mh + 6 + 24;
      const flap = C7.htdFlap({ w: LANE_W, h: flapH, inner: model });
      const fold = C7.htdFold({ w: 675, h: 24 });
      const avail = 669 - flapH - 24 - 24;
      let papers;
      if (d.secondBox) { const q = paperSize(S, { w: Math.floor((LANE_W - 20) / 2), maxH: avail }); papers = `<div style="display:flex;gap:20px">${C7.htdPaper({ w: q.w, h: q.h, role: 'primary' })}${C7.htdPaper({ w: q.w, h: q.h, role: 'primary' })}</div>`; }
      else { const p = paperSize(S, { w: (d.paper && d.paper.w) || 620, maxH: avail }); papers = C7.htdPaper({ w: p.w, h: p.h, role: 'primary', guides: d.hintShapes ? { S } : null }); }
      const paperLane = `<div class="ws-lane" style="box-sizing:border-box;width:675px;padding:12px 16px;display:flex;justify-content:center">${papers}</div>`;
      body = `<div style="display:flex;flex-direction:column;align-items:center;gap:0;width:675px">${flap}${fold}${paperLane}</div>`;
    } else throw new Error(`K-396: mode "${mode}" is not built`);

    return { bodyHtml: root(d, unitSlug, body), meta };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const R = document.querySelector('[data-lcs-how-to-draw]');
      if (!R) return ['no how-to-draw root'];
      const mode = R.dataset.lcsHtdMode;
      const lane = document.querySelector('[data-lcs-page]') || document.body;
      const lr = lane.getBoundingClientRect();
      const inside = (el) => { const r = el.getBoundingClientRect(); return r.left >= lr.left - 1 && r.right <= lr.right + 1 && r.top >= lr.top - 1 && r.bottom <= lr.bottom + 1; };
      // cards: strictly growing path sets, the last card has no coral
      const cards = [...R.querySelectorAll('svg[data-lcs-prim="htd-step"]')];
      const stepOf = (c) => +c.dataset.lcsStep;
      const paths = (c) => [...c.querySelectorAll('path')].map((p) => p.getAttribute('d'));
      const coral = (c) => [...c.querySelectorAll('path')].filter((p) => (p.getAttribute('fill') || '').toUpperCase() === '#F2784B').length;
      const byStep = cards.slice().sort((a, b) => stepOf(a) - stepOf(b));
      for (let i = 0; i < byStep.length; i++) {
        const ps = paths(byStep[i]);
        if (ps.length !== stepOf(byStep[i])) fails.push(`card ${stepOf(byStep[i])} holds ${ps.length} paths`);
        if (i > 0) { const prev = paths(byStep[i - 1]); if (!prev.every((d, k) => ps[k] === d)) fails.push(`card ${stepOf(byStep[i])} does not extend card ${stepOf(byStep[i - 1])}`); }
        const isLast = i === byStep.length - 1;
        if (mode !== 'order' && isLast && coral(byStep[i])) fails.push('the last card carries coral');
        if (!isLast && coral(byStep[i]) !== 1) fails.push(`card ${stepOf(byStep[i])} should carry exactly one coral path`);
        if (!inside(byStep[i])) fails.push(`card ${stepOf(byStep[i])} outside the page`);
      }
      const n = cards.length;
      if (!['grid', 'memory', 'finish'].includes(mode) && (n < 4 || n > 5)) fails.push(`${n} step cards`);
      if (['grid', 'memory', 'finish'].includes(mode) && n) fails.push('a step card on a no-card face');
      // badges: n digits on step faces, none on order
      const badges = [...R.querySelectorAll('[data-lcs-htd-n]')];
      if (mode === 'order') { if (badges.length) fails.push('badges on the order face'); }
      else if (!['grid', 'memory', 'finish'].includes(mode) && badges.length !== n) fails.push(`${badges.length} badges for ${n} cards`);
      badges.forEach((b, i) => { if (b.textContent.trim() !== String(+b.dataset.lcsHtdN)) fails.push(`badge ${i} text`); });
      // DOM order of the cards = step order, except on the order face (the scramble law)
      const dom = cards.map(stepOf);
      const law = (p) => { const m = p.length; if (p.every((v, i) => v === i + 1) || p.every((v, i) => v === m - i)) return false; let f = 0, b = 0, x = 0; for (let i = 0; i < m; i++) { if (p[i] === i + 1) x++; if (i + 1 < m && p[i + 1] === p[i] + 1) f++; if (i + 1 < m && p[i + 1] === p[i] - 1) b++; } return f <= 1 && b <= 1 && x <= 1; };
      if (mode === 'order') { if (!law(dom)) fails.push('order: the cards are in order or break the scramble law'); }
      else if (dom.some((v, i) => v !== i + 1)) fails.push('cards out of step order');
      // papers: empty, inside, floors by role (K 360 / twin 300 / secondary 280 / G1 300 / G2 260 — the page carries its band in the root)
      const boxes = [...R.querySelectorAll('[data-lcs-htd-box]')];
      const primaryFloor = { base: 360, shapes: 360, trace: 300, finish: 280, grid: 300, word: 360, scene: 300, order: 300, 'copy-steps': 300, write: 260, memory: 260 }[mode] || 260;
      let primaries = 0;
      for (const b of boxes) {
        const [w, h] = b.dataset.lcsHtdBox.split('x').map(Number);
        const r = b.getBoundingClientRect();
        if (Math.abs(r.width - w) > 1.5 || Math.abs(r.height - h) > 1.5) fails.push(`box ${b.dataset.lcsHtdBox} renders ${Math.round(r.width)}x${Math.round(r.height)}`);
        if (b.querySelector('path')) fails.push('a drawing inside a paper');
        if (!inside(b)) fails.push('a paper outside the page');
        const role = b.dataset.lcsHtdRole;
        const floor = role === 'primary' ? primaryFloor : role === 'twin' ? 300 : role === 'secondary' ? 280 : role === 'stepBox' ? 100 : 0;
        if (Math.min(w, h) < floor) fails.push(`${role} box ${w}x${h} under the floor ${floor}`);
        if (role === 'primary') primaries++;
      }
      const secondaries = boxes.filter((b) => b.dataset.lcsHtdRole === 'secondary').length;
      if (!['trace', 'scene', 'finish'].includes(mode) && primaries < 1 && !(mode === 'base' && secondaries === 2)) fails.push('no primary paper');
      if (mode === 'finish' && !R.querySelector('[data-lcs-htd-role="secondary"]')) fails.push('finish: no secondary paper');
      if (mode === 'scene' && !R.querySelector('[data-lcs-htd-scenebank]')) fails.push('no scene bank');
      // coral only inside step cards, fold/trace/frames, never as a fill elsewhere
      for (const p of R.querySelectorAll('path')) {
        if ((p.getAttribute('fill') || '').toUpperCase() === '#F2784B' && !p.closest('svg[data-lcs-prim="htd-step"]')) fails.push('a coral fill outside a step card');
      }
      // per mode
      if (mode === 'order') {
        const nums = [...R.querySelectorAll('[data-lcs-htd-numeral]')];
        if (nums.length !== n) fails.push(`${nums.length} numeral boxes for ${n} cards`);
        nums.forEach((b) => { if (b.textContent.trim() || b.dataset.lcsAnswer !== '') fails.push('a numeral box is not empty'); });
      }
      if (mode === 'finish') {
        const model = R.querySelector('[data-lcs-htd-model] path'), copies = [...R.querySelectorAll('[data-lcs-htd-copy]')];
        if (!model) fails.push('no model'); if (!copies.length) fails.push('no copy');
        for (const c of copies) {
          const ps = c.querySelectorAll('path'); const omit = +c.dataset.lcsOmit;
          if (!(omit >= 1)) fails.push('copy omits the outline or nothing');
          if (c.querySelector('[data-lcs-htd-badge="ring"]') == null) fails.push('no ring badge on the copy');
          if ([...ps].some((p) => (p.getAttribute('fill') || '').toUpperCase() === '#F2784B')) fails.push('coral on the copy');
        }
        if (!R.querySelector('[data-lcs-htd-model] [data-lcs-htd-badge="dot"]')) fails.push('no dot badge on the model');
      }
      if (mode === 'trace') {
        const t = R.querySelector('[data-lcs-htd-trace] path');
        if (!t) fails.push('no trace'); else if (!['#CBCBCB', '#F5E9D2'].includes((t.getAttribute('fill') || '').toUpperCase())) fails.push('the trace is not a pale fill');
        const tr = R.querySelector('[data-lcs-htd-trace]'), tw = R.querySelector('[data-lcs-htd-role="twin"]');
        if (tr && tw && tr.getBoundingClientRect().left > tw.getBoundingClientRect().left) fails.push('the trace is not left of the paper');
      }
      if (mode === 'grid') {
        const gs = [...R.querySelectorAll('[data-lcs-htd-grid]')];
        if (gs.length !== 2 || gs[0].dataset.lcsHtdGrid !== gs[1].dataset.lcsHtdGrid) fails.push('two equal grids expected');
        if (!R.querySelector('[data-lcs-htd-gridrole="model"] [data-lcs-htd-gridmodel]')) fails.push('no model in the model grid');
        if (R.querySelector('[data-lcs-htd-gridrole="target"] path')) fails.push('a drawing in the target grid');
        if (R.querySelector('[data-lcs-given], [data-lcs-answer-cell]')) fails.push('grid-copy stamps on a how-to-draw page');
      }
      if (mode === 'scene') {
        const panel = R.querySelectorAll('svg[data-lcs-prim="fd-panel"]');
        if (panel.length !== 1) fails.push(`${panel.length} scene panels`);
        const hero = R.querySelector('[data-lcs-htd-scenebank]').dataset.lcsHtdHero;
        if (R.querySelector(`[data-lcs-fd-layer="${hero}"]`)) fails.push('the hero is still in the scene');
        if (R.querySelectorAll('[data-lcs-fd-layer]').length < 2) fails.push('fewer than 2 props remain');
        if (R.querySelector('[data-lcs-fd-ring], [data-lcs-fd-hotspot]')) fails.push('rings or hotspots on the scene face');
      }
      if (mode === 'word') {
        const lane = R.querySelector('[data-lcs-htd-wordlane]');
        if (!lane) fails.push('no word lane');
        else { const noun = lane.dataset.lcsHtdWordlane; const others = [...R.querySelectorAll('text')].filter((t) => !t.closest('[data-lcs-htd-wordlane]')).map((t) => t.textContent.toLowerCase()); if (others.some((t) => t.includes(noun.toLowerCase()))) fails.push('the noun is printed outside the lane'); }
      }
      if (mode === 'write') {
        const rows = R.querySelectorAll('[data-lcs-ruling-row]'); if (rows.length !== 3) fails.push(`${rows.length} ruled rows`);
        if (R.querySelector('[data-lcs-bank], [data-lcs-scene]')) fails.push('a word bank or scene on the write face');
      }
      if (mode === 'memory') {
        const fold = R.querySelector('[data-lcs-fold]'), model = R.querySelector('[data-lcs-htd-model]'), paper = R.querySelector('[data-lcs-htd-role="primary"]');
        if (!fold || !model || !paper) fails.push('memory: fold, model or paper missing');
        else { const fy = fold.getBoundingClientRect().top; if (model.getBoundingClientRect().bottom > fy) fails.push('the model is below the fold'); if (paper.getBoundingClientRect().top < fy) fails.push('the paper is above the fold'); if (fold.getBoundingClientRect().width < 0.9 * lr.width) fails.push('the fold does not span the page'); }
      }
      if (mode === 'copy-steps') {
        const cols = R.querySelectorAll('[data-lcs-htd-col]'); if (cols.length !== n) fails.push(`${cols.length} columns for ${n} cards`);
      }
      if (mode === 'shapes') {
        const g = R.querySelector('[data-lcs-htd-guides]'); if (!g || !g.querySelector('ellipse, rect')) fails.push('no shape guides in the paper');
        if (!cards[0] || !cards[0].querySelector('ellipse, rect')) fails.push('card 1 shows no guide');
      }
      // nothing textual in the body but badges, lane glyphs, starters, grid labels
      for (const t of R.querySelectorAll('text')) if (!t.closest('[data-lcs-htd-wordlane], [data-lcs-ruling-row], [data-lcs-htd-grid]')) fails.push('stray text in the body');
      return fails;
    });
  },
};
