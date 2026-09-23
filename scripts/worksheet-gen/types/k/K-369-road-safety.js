/**
 * K-369 — Road Safety: Traffic Lights, Stop or Go (nt10-E; family key
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
 *              locale's amberMeans === 'stop' (en: slow down → never; en d3 is
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
      title: 'Road Safety: Traffic Lights, Stop or Go',
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
    // guards on the RESOLVED config (never on the level index — poison PR11)
    if (d.layout !== 'fork') throw new Error(`K-369: layout "${d.layout}" is not the base fork (a face config fed to the base build)`);
    if (d.mode !== undefined) throw new Error(`K-369: config carries mode "${d.mode}" — the base build takes no face mode`);
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
