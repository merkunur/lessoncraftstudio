/**
 * solids-k.js — Name the Solid Shapes (K-644; Year pages AA, 2026-11-14; K.G.A.2: correctly name shapes regardless of
 * their orientation or overall size — here the four solids of Kindergarten: sphere, cube, cylinder, cone).
 * For the English Kindergarten lesson "Name the solid shapes" of the year design (TYPE-WORK-LIST.math.md: G2-243 has
 * no cone, and nothing colored solids by a code).
 *
 * Top: the four solids in a row, a dot under each, and four everyday things below them in another order, a dot above
 * each: the child draws a line from each solid to the thing of the same shape (ball, number cube, soup can, party hat).
 * Bottom: a color code (a crayon dot by each solid's name and picture) and solids to color by it.
 *   level 1  eight solids, two of each, standing upright: of each solid one big and one small
 *   level 2  twelve solids, three of each, each solid in three sizes; a cube, a cylinder and a cone are both upright
 *            and turned (a tilted cube, a cylinder lying down, a cone on its side or its tip) — the design's page
 *   level 3  twelve shapes: ten of the four solids (three of two of them, two of the others), each in another size and
 *            upright and turned as on level 2, and two that are none of the four (a box, a pyramid), which stay white;
 *            the things above are less obvious (an orange, a drum, an ice-cream cone)
 * The instruction asks the child to SAY each name (review 2026-11-14: the code's little drawings let a child color by
 * matching pictures alone, and K.G.A.2 is about naming).
 * The solids are DRAWN here, as outlines a child can color: the library's cone is a cut-off cone (shape-data.js) and
 * its solids are painted pictures. A solid is drawn as an opaque thing (no dashed hidden edges: those are for counting
 * faces and edges in Grade 1 and 2).
 * No word is needed to do the page except the four names of the code, which the teacher reads; a picture of each
 * solid stands by its name. Themeless: a copy is a new draw (seed). PDF only.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { fileUri } = require('../../image-cache/resolve.js');

const C = tokens.color, INK = C.ink, TEAL = C.teal, CORAL = C.coral;
const loc2 = (l) => String(l || 'en').slice(0, 2);
const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };

const SOLIDS = ['sphere', 'cube', 'cylinder', 'cone'];
const HEX = { red: '#E0533A', blue: '#3B7DD8', yellow: '#F2C230', green: '#3FA34D' };
/** the names a Kindergarten class uses for the four solids (school words: sv klot, fi lieriö, fr boule) */
const NAMES = {
  en: { sphere: 'sphere', cube: 'cube', cylinder: 'cylinder', cone: 'cone' },
  de: { sphere: 'Kugel', cube: 'Würfel', cylinder: 'Zylinder', cone: 'Kegel' },
  es: { sphere: 'esfera', cube: 'cubo', cylinder: 'cilindro', cone: 'cono' },
  pt: { sphere: 'esfera', cube: 'cubo', cylinder: 'cilindro', cone: 'cone' },
  fr: { sphere: 'boule', cube: 'cube', cylinder: 'cylindre', cone: 'cône' },
  it: { sphere: 'sfera', cube: 'cubo', cylinder: 'cilindro', cone: 'cono' },
  nl: { sphere: 'bol', cube: 'kubus', cylinder: 'cilinder', cone: 'kegel' },
  sv: { sphere: 'klot', cube: 'kub', cylinder: 'cylinder', cone: 'kon' },
  da: { sphere: 'kugle', cube: 'terning', cylinder: 'cylinder', cone: 'kegle' },
  no: { sphere: 'kule', cube: 'kube', cylinder: 'sylinder', cone: 'kjegle' },
  fi: { sphere: 'pallo', cube: 'kuutio', cylinder: 'lieriö', cone: 'kartio' },
};
/** the everyday thing of each solid: level 1-2 the design's four, level 3 less obvious ones (each picture read on a
 *  contact sheet 2026-11-14; a stack of blocks holds several cubes, a globe stands on a foot; the candle's two-tone
 *  shading draws a seam that reads as a box edge, so the drum is the other cylinder) */
const THINGS = {
  plain: { sphere: [['toys', 'ball']], cube: [['toys', 'dice']], cylinder: [['At the Supermarket', 'can']], cone: [['accessories', 'party_hat']] },
  other: { sphere: [['At the Supermarket', 'orange']], cube: [['toys', 'dice']], cylinder: [['music', 'drum']], cone: [['summer', 'ice_cream'], ['desserts and sweets', 'ice_cream']] },
};
const LEVELS = {
  1: { each: 2, others: 0, sizes: [64, 92], turn: false, things: 'plain', cols: 4 },
  2: { each: 3, others: 0, sizes: [52, 72, 94], turn: true, things: 'plain', cols: 4 },
  3: { each: null, others: 2, sizes: [52, 72, 94], turn: true, things: 'other', cols: 4 },
};

// ---------------------------------------------------------------------------------------------- the drawings
const SW = 'stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"';
/** one solid in a 100x100 box; `pose`: up | lying | tip | tilt; `fill`: the key's color or white */
function solidSvg(kind, pose, px, fill = '#FFFFFF') {
  const F = `fill="${fill}"`;
  let body = '', rot = 0;
  if (kind === 'sphere') {
    body = `<circle cx="50" cy="50" r="40" ${F} ${SW}/><path d="M12 52 A38 12 0 0 0 88 52" fill="none" stroke="${INK}" stroke-width="1.4" vector-effect="non-scaling-stroke"/>`;
  } else if (kind === 'cube') {
    body = `<polygon points="14,36 34,16 88,16 68,36" ${F} ${SW}/><polygon points="68,36 88,16 88,70 68,90" ${F} ${SW}/><rect x="14" y="36" width="54" height="54" ${F} ${SW}/>`;
    if (pose === 'tilt') rot = 18;
  } else if (kind === 'cylinder') {
    body = `<path d="M22 22 L22 80 A28 10 0 0 0 78 80 L78 22" ${F} ${SW}/><ellipse cx="50" cy="22" rx="28" ry="10" ${F} ${SW}/>`;
    if (pose === 'lying') rot = 90;
  } else if (kind === 'cone') {
    if (pose === 'tip') body = `<path d="M18 22 L50 92 L82 22" ${F} ${SW}/><ellipse cx="50" cy="22" rx="32" ry="10" ${F} ${SW}/>`;
    else { body = `<path d="M50 10 L18 80 A32 10 0 0 0 82 80 Z" ${F} ${SW}/>`; if (pose === 'lying') rot = 90; }
  } else if (kind === 'box') {
    body = `<polygon points="8,46 22,32 92,32 78,46" ${F} ${SW}/><polygon points="78,46 92,32 92,62 78,76" ${F} ${SW}/><rect x="8" y="46" width="70" height="30" ${F} ${SW}/>`;
  } else if (kind === 'pyramid') {
    body = `<polygon points="50,10 14,80 66,80" ${F} ${SW}/><polygon points="50,10 66,80 88,62" ${F} ${SW}/>`;
  } else throw new Error('solids-k: ' + kind);
  const g = rot ? `<g transform="rotate(${rot} 50 50)">${body}</g>` : body;
  return `<svg width="${px}" height="${px}" viewBox="0 0 100 100" style="display:block;overflow:visible" data-lcs-solid="${kind}" data-lcs-pose="${pose}">${g}</svg>`;
}

function makeSolidsType({ id, slug, gradeBand, i18n }) {
  return {
    id, slug, gradeBand,
    assetClass: 'none',
    exerciseType: 'geometry',
    themeAxis: { applicable: false },
    interactive: false,
    difficulty: LEVELS,
    i18n,
    // one word for the whole page: the order of the solids below is the page (two copies with one order are one page)
    levelSetWords(m) { return [(m.items || []).join(' ')]; },

    build(args, ctx) {
      const lv = Number(args.difficulty) || 2, d = LEVELS[lv] || LEVELS[2], rng = ctx.rng, L = loc2(args.locale);
      const N = NAMES[L];
      if (!N) throw new Error(`${id}: no solid names for ${L}`);
      const mark = !!(ctx && ctx.answerKey);
      const colorOf = Object.fromEntries(shuffle(SOLIDS, rng).map((s, i) => [s, Object.keys(HEX)[i]]));

      // ── the match: the solids in a row, the things below in another order (no thing under its own solid)
      const top = shuffle(SOLIDS, rng);
      let below;
      do { below = shuffle(SOLIDS, rng); } while (below.some((s, i) => s === top[i]));
      const thingOf = Object.fromEntries(SOLIDS.map((s) => [s, rng.pick(THINGS[d.things][s])]));
      const dotSpan = `<span class="ws-match-dot" style="position:static;display:block;width:16px;height:16px;border-radius:50%;background:${INK}" data-lcs-mdot></span>`;
      const cell = (inner, dotFirst, attr) => `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:120px" ${attr}>${dotFirst ? dotSpan + inner : inner + dotSpan}</div>`;
      const rowA = top.map((s) => cell(solidSvg(s, 'up', 76), false, `data-lcs-msolid="${s}"`)).join('');
      const rowB = below.map((s) => cell(`<img class="ws-icon" src="${fileUri(thingOf[s][0], thingOf[s][1])}" alt="" style="width:78px;height:78px;display:block">`, true, `data-lcs-mthing="${s}" data-lcs-mobj="${thingOf[s].join('/')}"`)).join('');
      const keyLines = mark ? `<svg data-lcs-keylines style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></svg>` : '';
      const match = `<section class="ws-card" data-lcs-card="1" style="flex:0 0 auto"><span class="ws-card-badge">1</span><div class="ws-card-stage" style="flex-direction:column;align-items:center;gap:46px;padding:10px 12px 12px;position:relative" data-lcs-match="${top.join(',')}|${below.join(',')}">` +
        `<div style="display:flex;justify-content:space-around;width:100%">${rowA}</div><div style="display:flex;justify-content:space-around;width:100%">${rowB}</div>${keyLines}</div></section>`;

      // ── the code
      const legend = SOLIDS.map((s) => `<span style="display:inline-flex;align-items:center;gap:6px;flex:0 0 auto" data-lcs-code="${s}|${colorOf[s]}">` +
        `${solidSvg(s, 'up', 34)}<span style="font:700 18px/1 'Nunito',sans-serif;color:${INK}">${N[s]}</span>` +
        `<span data-lcs-dot="${colorOf[s]}" style="display:inline-block;width:20px;height:20px;border-radius:50%;background:${HEX[colorOf[s]]};border:1.5px solid ${INK};box-sizing:border-box"></span></span>`).join('');

      // ── the solids to color
      let kinds;
      if (d.each) kinds = SOLIDS.flatMap((s) => Array(d.each).fill(s));
      else { const many = shuffle(SOLIDS, rng); kinds = [...many.flatMap((s, i) => Array(i < 2 ? 3 : 2).fill(s)), 'box', 'pyramid']; }
      let order;
      for (let t = 0; t < 80; t++) {
        order = shuffle(kinds, rng);
        // no row that holds one solid only in its first three places, and the two others never side by side
        const rows = []; for (let i = 0; i < order.length; i += d.cols) rows.push(order.slice(i, i + d.cols));
        const flat = rows.some((r) => new Set(r).size === 1);
        const pair = order.findIndex((k, i) => ['box', 'pyramid'].includes(k) && ['box', 'pyramid'].includes(order[i + 1]) && (i + 1) % d.cols !== 0) >= 0;
        if (!flat && !pair) break;
      }
      // each solid in every size the level has (a pair is one big and one small; three of a kind are in three sizes),
      // and where the level turns solids, each one that can turn is ALSO upright once (review 2026-11-14: with every cone on
      // its tip and every cylinder lying down, the pyramid was the only upright pointed shape — a lure, not a lesson)
      const turned = { cube: ['tilt'], cylinder: ['lying'], cone: ['lying', 'tip'] };
      const plan = {};
      for (const k of new Set(order)) {
        const n = order.filter((x) => x === k).length;
        const sizes = shuffle(d.sizes, rng);
        const poses = d.turn && turned[k] && n >= 2 ? shuffle(['up', rng.pick(turned[k]), ...Array(n - 2).fill(0).map(() => rng.pick(['up', ...turned[k]]))], rng) : Array(n).fill('up');
        plan[k] = Array.from({ length: n }, (_, j) => ({ size: sizes[j % sizes.length], pose: poses[j] }));
      }
      const used = {};
      const items = [];
      const cells = order.map((k) => {
        const { size, pose } = plan[k][used[k] = (used[k] === undefined ? 0 : used[k] + 1)];
        items.push({ k, pose, size });
        const fill = mark && colorOf[k] ? HEX[colorOf[k]] : '#FFFFFF';
        return `<div style="display:flex;align-items:center;justify-content:center;min-height:0" data-lcs-cell="${k}|${pose}|${size}">${solidSvg(k, pose, size, fill)}</div>`;
      });
      const rows = Math.ceil(cells.length / d.cols);
      const color = `<section class="ws-card" data-lcs-card="2" style="flex:1 1 auto;min-height:0"><span class="ws-card-badge">2</span><div class="ws-card-stage" style="flex-direction:column;align-items:stretch;gap:10px;padding:8px 14px 10px">` +
        `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px 26px;padding:6px 0;border-bottom:2px dashed ${TEAL}" data-lcs-legend>${legend}</div>` +
        `<div style="flex:1 1 auto;display:grid;grid-template-columns:repeat(${d.cols},1fr);grid-template-rows:repeat(${rows},1fr);gap:4px" data-lcs-solids>${cells.join('')}</div></div></section>`;
      return {
        bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;gap:12px;min-height:0" data-lcs-solidsk="${lv}">${match}${color}</div>`,
        meta: { items: [top.join(','), below.join(','), ...items.map((x) => x.k + ':' + x.pose + ':' + x.size)] },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-solidsk]');
        if (!root) return ['no page'];
        const lv = +root.dataset.lcsSolidsk;
        const rectOf = (e) => e.getBoundingClientRect();
        const S4 = ['sphere', 'cube', 'cylinder', 'cone'];
        // the match
        const m = document.querySelector('[data-lcs-match]');
        const [topS, belowS] = m.dataset.lcsMatch.split('|').map((x) => x.split(','));
        const tops = [...m.querySelectorAll('[data-lcs-msolid]')].map((e) => e.dataset.lcsMsolid);
        const things = [...m.querySelectorAll('[data-lcs-mthing]')];
        if (tops.join() !== topS.join() || [...tops].sort().join() !== [...S4].sort().join()) fails.push('the row of solids is not the four solids');
        if (things.map((e) => e.dataset.lcsMthing).join() !== belowS.join() || [...belowS].sort().join() !== [...S4].sort().join()) fails.push('the row of things is not one of each');
        if (belowS.some((s, i) => s === topS[i])) fails.push('a thing stands under its own solid');
        things.forEach((e) => { const im = e.querySelector('img'); if (!im || !im.complete || !im.naturalWidth) fails.push('a picture of a thing did not load: ' + e.dataset.lcsMobj); });
        if (lv === 3 && things.some((e) => /party_hat|\/can$|toys\/ball/.test(e.dataset.lcsMobj))) fails.push('the harder page shows the plain things');
        if (lv < 3 && things.some((e) => !/party_hat|\/can$|toys\/ball|toys\/dice/.test(e.dataset.lcsMobj))) fails.push('the easier pages show other things than ball, number cube, can, party hat');
        if (m.querySelectorAll('[data-lcs-mdot]').length !== 8) fails.push('the match has not eight dots');
        // the code
        const code = [...document.querySelectorAll('[data-lcs-code]')].map((e) => e.dataset.lcsCode.split('|'));
        if (code.length !== 4 || new Set(code.map((c) => c[0])).size !== 4 || new Set(code.map((c) => c[1])).size !== 4) fails.push('the code is not four solids in four colors');
        document.querySelectorAll('[data-lcs-code]').forEach((e) => { const dt = e.querySelector('[data-lcs-dot]'); if (!dt || dt.dataset.lcsDot !== e.dataset.lcsCode.split('|')[1]) fails.push('a name of the code without its color'); if (!e.textContent.trim()) fails.push('a solid of the code without its name'); });
        const lg = document.querySelector('[data-lcs-legend]');
        if (lg && new Set([...lg.children].map((c) => Math.round(rectOf(c).top))).size > 2) fails.push('the code runs over two lines');
        // the solids to color
        const cells = [...document.querySelectorAll('[data-lcs-cell]')].map((e) => { const [k, pose, size] = e.dataset.lcsCell.split('|'); return { e, k, pose, size: +size }; });
        const count = (k) => cells.filter((c) => c.k === k).length;
        if (lv === 1 ? cells.length !== 8 || S4.some((k) => count(k) !== 2) : lv === 2 ? cells.length !== 12 || S4.some((k) => count(k) !== 3) : cells.length !== 12 || S4.some((k) => count(k) < 2) || count('box') !== 1 || count('pyramid') !== 1) fails.push('the solids to color: ' + cells.map((c) => c.k).join(','));
        if (lv === 1 && cells.some((c) => c.pose !== 'up')) fails.push('a turned solid on the easier page');
        if (lv > 1 && (!cells.some((c) => c.k === 'cylinder' && c.pose === 'lying') || !cells.some((c) => c.k === 'cone' && c.pose !== 'up') || !cells.some((c) => c.k === 'cube' && c.pose === 'tilt'))) fails.push('the harder pages do not turn a cylinder, a cone and a cube');
        if (new Set(cells.map((c) => c.size)).size < (lv === 1 ? 2 : 3)) fails.push('the solids are not in ' + (lv === 1 ? 'two' : 'three') + ' sizes');
        for (const k of S4) {
          const mine = cells.filter((c) => c.k === k);
          if (new Set(mine.map((c) => c.size)).size !== mine.length) fails.push(`two ${k}s of one size: every ${k} is another size`);
          if (lv > 1 && k !== 'sphere' && mine.length >= 2 && (!mine.some((c) => c.pose === 'up') || !mine.some((c) => c.pose !== 'up'))) fails.push(`the ${k}s are not upright AND turned`);
        }
        for (const c of cells) {
          const svg = c.e.querySelector('svg'), r = rectOf(svg), b = rectOf(c.e);
          if (Math.round(r.width) !== c.size) fails.push(`a ${c.k} drawn at ${Math.round(r.width)} px, stamped ${c.size}`);
          if (r.left < b.left - 1 || r.right > b.right + 1 || r.top < b.top - 1 || r.bottom > b.bottom + 1) fails.push(`a ${c.k} leaves its cell`);
        }
        const rows = []; for (let i = 0; i < cells.length; i += 4) rows.push(cells.slice(i, i + 4).map((c) => c.k));
        if (rows.some((r) => new Set(r).size === 1)) fails.push('a row of one solid only');
        document.querySelectorAll('.ws-card').forEach((card, i) => { const cb = rectOf(card); card.querySelectorAll('svg, img, [data-lcs-code]').forEach((e) => { const r = rectOf(e); if (r.width && (r.left < cb.left - 0.5 || r.right > cb.right + 0.5 || r.top < cb.top - 0.5 || r.bottom > cb.bottom + 0.5) && !e.closest('[data-lcs-keylines]')) fails.push(`card ${i + 1}: something leaves the card`); }); });
        return fails;
      });
    },
  };
}

module.exports = { makeSolidsType, solidSvg, NAMES, THINGS, LEVELS };
