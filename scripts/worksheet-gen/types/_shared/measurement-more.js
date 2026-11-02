/**
 * measurement-more.js — the new templates of the Measurement & Size maker (2026-11-02). Six modes:
 *
 *   boxed      K-463 Big, Middle, Small — six boxes, each one picture drawn at three sizes (level 3: four) standing on
 *              one line; number them 1 (smallest) to 3 (biggest) · level 2: 1 = the BIGGEST (the old big-small app's
 *              "descending") · level 3: four sizes. Every drawing ink-tight (its own box), so the sizes compare
 *              truthfully. K.MD.A.2.
 *   clips      G1-480 Measure with Paper Clips — each object lies on paper clips laid end to end from its left end;
 *              count the clips. Level 1: the clips end where the object ends · levels 2-3: the row of clips runs on past
 *              the object (a dashed line marks where it starts and ends) — count only the clips under it. Whole clips,
 *              the clips coloured in turn so each one can be counted. 1.MD.A.2.
 *   rulers     G2-475 Rulers to Cut Out — four rulers at their real size (print at 100 %): en two inch rulers and two
 *              centimetre rulers, the other ten four centimetre rulers. Level 1 whole units · level 2 + halves · level 3
 *              + millimetres / quarter inches. The 0 sits inside the strip, never at its edge (the first thing a child
 *              gets wrong with a real ruler). Material: no key, no screen. 2.MD.A.1.
 *   inches     G2-476 Measure in Inches (en-US only: the other ten measure in cm — G2-235) — an object on a 6-inch
 *              ruler (drawn at 72 px to the inch: a reading page; the cut-out rulers are the real-size ones). Level 1 it starts at 0 · level 2 it starts at 1 or 2 (count the inches from where it
 *              starts) · level 3 to the nearest inch (it ends a quarter inch before or after a mark). 2.MD.A.1.
 *   unit       G2-477 Which Unit? — a thing and two units; circle the unit you would measure it with. Level 1 length
 *              (en-US in. / ft., the others cm / m) · level 2 + a second kind (en-US cm / m, the others g / kg) · level
 *              3 length, weight and capacity. Every picture drawn the same size: the size of the THING decides.
 *              2.MD.A.1, 2.MD.A.3, 3.MD.A.2.
 *   fahrenheit G3-476 Degrees Fahrenheit (en-US only: the other ten read °C — G3-345) — three thermometers, 0-100 °F.
 *              Level 1 on the tens · level 2 a scale in fives · level 3 a scale in twos.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { artExtentSync } = require('../../image-cache/silhouette.js');
const { answerBox } = require('../../templates/components.js');
const { distinctLengths } = require('./measurement-tasks.js');
const { SCALE_LADDER } = require('./size-compare.js');
const rulerPrim = require('../../primitives/ruler.js');
const thermometerPrim = require('../../primitives/thermometer.js');
const slot = require('../../lib/slot.js');
const { slotFor } = require('../../lib/answer-slots.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', CREAM = '#FBF3E4', GRID = '#C8BFAE';
const PX_CM = 96 / 2.54, PX_IN = 96;   // the page is 96 px to the inch: printed at 100 % these are real units
// the Measure in Inches page reads a ruler drawn at 72 px to the inch (a reading page, like G2-235's centimetres: at its
// real 96 px a 4-inch object needs a picture 2.6 × as long as it is tall — one theme of 50 could fill a page)
const RULER_IN = 6, DRAW_IN = 72;
const loc2 = (locale) => String(locale || 'en').slice(0, 2);
const NUM = (s, px = 22, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;line-height:1;color:${color};white-space:nowrap">${s}</span>`;

const LEVELS = {
  boxed: { 1: { items: 3, dir: 'up' }, 2: { items: 3, dir: 'down' }, 3: { items: 4, dir: 'up' } },
  clips: { 1: { rows: 3, u: 80, lenMin: 2, lenMax: 5, run: false }, 2: { rows: 3, u: 58, lenMin: 2, lenMax: 7, run: true }, 3: { rows: 3, u: 48, lenMin: 3, lenMax: 9, run: true } },
  rulers: { 1: { sub: 1 }, 2: { sub: 2 }, 3: { sub: 0 } },   // 0: the finest marks (mm on cm rulers, quarters on inch rulers)
  // a 6-inch ruler (the answer box beside it: a drawing can never run under the box); objects 2-5 inches
  inches: { 1: { rows: 3, from: 'zero', lenMin: 2, lenMax: 5 }, 2: { rows: 3, from: 'off', lenMin: 2, lenMax: 4 }, 3: { rows: 3, from: 'zero', near: true, lenMin: 2, lenMax: 5 } },
  unit: { 1: { cards: 6 }, 2: { cards: 6 }, 3: { cards: 6 } },
  fahrenheit: { 1: { step: 10, labelEvery: 1 }, 2: { step: 5, labelEvery: 2 }, 3: { step: 2, labelEvery: 5 } },
};

/** a library drawing ink-tight (its own box): `box` = the square image's size; the span is the drawing's ink only */
function inkSpan(theme, noun, box, extra = '') {
  const e = artExtentSync(theme, noun);
  const w = box * e.widthFrac, h = box * e.heightFrac;
  return { w, h, html: `<span style="position:relative;display:block;flex:0 0 auto;width:${w.toFixed(1)}px;height:${h.toFixed(1)}px;overflow:hidden" data-lcs-ink="1" data-lcs-art="1"${extra}>` +
    `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="position:absolute;left:${(-e.leftFrac * box).toFixed(1)}px;top:${(-e.topFrac * box).toFixed(1)}px;width:${box.toFixed(1)}px;height:${box.toFixed(1)}px"></span>` };
}
/** the box size that fits a drawing's ink into maxW × maxH */
function fitBox(theme, noun, maxW, maxH) { const e = artExtentSync(theme, noun); return Math.min(maxW / e.widthFrac, maxH / e.heightFrac); }

/** the theme's pictures that can lie along a measure: maxLen = how many units long they can be drawn in `band` px */
function lengthPool(theme, band, u, lenMin, lenMax) {
  return labelSafeNouns(theme).map((n) => {
    const ext = artExtentSync(theme, n.noun);
    return { ...n, ext, maxLen: Math.min(lenMax, Math.floor((band * ext.widthFrac) / (u * ext.heightFrac))) };
  }).filter((x) => x.maxLen >= lenMin);
}
/** one picture slot per row (a row's pool = the pictures that can be drawn that long); two rows never show one picture */
function rowSlots(ctx, pick, pool, theme, id) {
  const out = pick.map((p, i) => ({ item: slot.pictures(ctx, [p.item], pool.filter((x) => x.maxLen >= p.len), theme, 'row' + i)[0], len: p.len }));
  const seen = new Set();
  for (const o of out) { if (seen.has(o.item.noun)) throw new Error(`${id}: two rows would show the same picture (the swap is refused)`); seen.add(o.item.noun); }
  return out;
}
/** the object's ART (not its padded image box) spanning `lenPx` from x = `x0` inside a band `width` wide */
function artAlong(theme, item, x0, lenPx, width) {
  const boxW = lenPx / item.ext.widthFrac;
  const artH = item.ext.heightFrac * boxW;
  // the measured ink extents ride along so verify() re-derives where the ink sits from the image's own placement
  return { h: artH, html: `<span data-lcs-art="1" data-lcs-wf="${item.ext.widthFrac}" data-lcs-lf="${item.ext.leftFrac}" style="position:relative;display:block;flex:0 0 auto;width:${width.toFixed(1)}px;height:${artH.toFixed(1)}px;overflow:hidden">` +
    `<img class="ws-icon" src="${fileUri(theme, item.noun, 0, { full: true })}" alt="" style="position:absolute;left:${(x0 - item.ext.leftFrac * boxW).toFixed(1)}px;top:${(-item.ext.topFrac * boxW).toFixed(1)}px;width:${boxW.toFixed(1)}px;height:${boxW.toFixed(1)}px"></span>` };
}

/** a paper clip u px long (drawn in a 100 × 36 box): three loops of wire, open at one end */
function clipPath(x, u) {
  const k = u / 100, P = (a, b) => `${(x + a * k).toFixed(2)} ${(2 + b * k).toFixed(2)}`;
  return `M${P(78, 13)} L${P(22, 13)} A${(7 * k).toFixed(2)} ${(7 * k).toFixed(2)} 0 0 0 ${P(22, 27)} L${P(88, 27)} A${(11.5 * k).toFixed(2)} ${(11.5 * k).toFixed(2)} 0 0 0 ${P(88, 4)} L${P(14, 4)} A${(14 * k).toFixed(2)} ${(14 * k).toFixed(2)} 0 0 0 ${P(14, 32)} L${P(70, 32)}`;
}
function clipRow(total, u) {
  const h = Math.ceil(u * 0.36) + 4;
  const clips = Array.from({ length: total }, (_, i) => `<path d="${clipPath(1 + i * u, u)}" fill="none" stroke="${i % 2 ? CORAL : TEAL}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" data-lcs-clip="${i}"/>`).join('');
  return `<svg width="${total * u + 2}" height="${h}" viewBox="0 0 ${total * u + 2} ${h}" style="display:block;flex:0 0 auto" data-lcs-clips="${total}">${clips}</svg>`;
}

/** a cut-out ruler strip at its real size: n units of px; sub = marks per unit (1, 2, 4 or 10) */
function rulerStrip({ unit, n, px, sub, label }) {
  const pad = 18, W = n * px + pad * 2, H = 74, cut = 7;
  const parts = [`<rect x="${cut}" y="${cut}" width="${W}" height="${H}" rx="8" fill="#FFFFFF" stroke="${TEAL}" stroke-width="2.5"/>`];
  for (let i = 0; i <= n * sub; i++) {
    const x = cut + pad + (i * px) / sub;
    const whole = i % sub === 0, half = sub % 2 === 0 && i % (sub / 2) === 0;
    const len = whole ? 28 : half ? 19 : sub === 4 ? 13 : 10;
    parts.push(`<line x1="${x.toFixed(2)}" y1="${cut}" x2="${x.toFixed(2)}" y2="${cut + len}" stroke="${INK}" stroke-width="${whole ? 2 : 1.2}"${whole ? ` data-lcs-mark="${i / sub}"` : ''}/>`);
    if (whole) parts.push(`<text x="${x.toFixed(2)}" y="${cut + 50}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="17" fill="${INK}">${i / sub}</text>`);
  }
  parts.push(`<text x="${(cut + pad + px / 2).toFixed(2)}" y="${cut + 67}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="12" fill="${TEAL}">${label}</text>`);
  const ow = W + cut * 2, oh = H + cut * 2;
  parts.unshift(`<rect x="1" y="1" width="${ow - 2}" height="${oh - 2}" rx="12" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="7 5"/>`);
  return `<svg width="${ow}" height="${oh}" viewBox="0 0 ${ow} ${oh}" style="display:block;flex:0 0 auto" data-lcs-ruler="${unit}" data-lcs-units="${n}" data-lcs-px="${px.toFixed(4)}" data-lcs-zero="${cut + pad}">${parts.join('')}</svg>`;
}

/** Which Unit? — the things a page may show, by kind and size; every one opened on a contact sheet (2026-11-02: the eraser
 *  reads as a red-and-black block, the train as a toy engine, the bear as a teddy — a child could fairly answer the other
 *  unit, so they are not here; the review dropped the door — cm and in. are its real units — and the bowl, a cereal bowl
 *  or a mixing bowl) */
const THINGS = {
  length: {
    small: [['classroom', 'pencil'], ['classroom', 'crayon'], ['around the house', 'key'], ['around the house', 'toothbrush'], ['classroom', 'scissors'], ['spring', 'leaf'], ['around the house', 'comb'], ['kitchen tools', 'fork'], ['spring', 'caterpillar'], ['classroom', 'pen']],
    big: [['vehicles', 'bus'], ['zoo animals', 'giraffe'], ['ocean life', 'whale'], ['vehicles', 'ship'], ['vehicles', 'airplane'], ['miscellaneous', 'house'], ['beach', 'lighthouse']],
  },
  mass: {
    small: [['fruits', 'apple'], ['fruits', 'strawberry'], ['At the Supermarket', 'egg'], ['fruits', 'banana'], ['fruits', 'cherry'], ['easter', 'feather'], ['pets', 'mouse'], ['accessories', 'sock']],
    big: [['zoo animals', 'elephant'], ['farm animals', 'horse'], ['farm animals', 'cow'], ['music', 'piano'], ['zoo animals', 'hippopotamus'], ['vehicles', 'car'], ['vehicles', 'truck']],
  },
  capacity: {
    small: [['kitchen tools', 'cup'], ['kitchen tools', 'glass'], ['kitchen tools', 'mug']],
    big: [['around the house', 'bathtub'], ['summer', 'pool'], ['beach', 'bucket'], ['around the house', 'sink']],
  },
};
/** the two units of a kind, smaller first (capacity: L / mL where the school writes a capital L, dl / l in the Nordic schools) */
function unitsOf(sys, L) {
  if (sys === 'inft') return ['in.', 'ft.'];
  if (sys === 'cmm') return ['cm', 'm'];
  if (sys === 'gkg') return ['g', 'kg'];
  // Nordic schools teach litre and DEcilitre first (a glass is 2 dl; ml comes later) — native review 2026-11-02
  if (['sv', 'da', 'no', 'fi'].includes(L)) return ['dl', 'l'];
  return ['en', 'pt', 'fr'].includes(L) ? ['mL', 'L'] : ['ml', 'l'];
}
const KIND_OF = { inft: 'length', cmm: 'length', gkg: 'mass', mll: 'capacity' };
/** the systems of a page, card by card (6 cards) */
function systemsFor(level, L) {
  const en = L === 'en';
  if (level === 1) return Array(6).fill(en ? 'inft' : 'cmm');
  if (level === 2) return en ? ['inft', 'inft', 'inft', 'cmm', 'cmm', 'cmm'] : ['cmm', 'cmm', 'cmm', 'gkg', 'gkg', 'gkg'];
  return en ? ['inft', 'cmm', 'gkg', 'gkg', 'mll', 'mll'] : ['cmm', 'cmm', 'gkg', 'gkg', 'mll', 'mll'];
}

function makeMeasurementMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  const themed = mode === 'boxed' || mode === 'clips' || mode === 'inches';
  return {
    id,
    slug,
    gradeBand,
    assetClass: mode === 'rulers' ? 'manipulatives' : 'measurement',
    exerciseType: mode === 'boxed' ? 'comparing-sizes' : 'measurement',
    themeAxis: themed ? { applicable: true, minNouns: mode === 'boxed' ? 6 : 3 } : { applicable: false },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng, theme = args.theme, L = loc2(args.locale);
      const marks = !!(ctx && (ctx.answerKey || ctx.screen));
      if ((mode === 'inches' || mode === 'fahrenheit') && L !== 'en') throw new Error(`${id}: ${mode === 'inches' ? 'inches' : 'degrees Fahrenheit'} are the US units — the other ten languages measure in ${mode === 'inches' ? 'centimetres (G2-235)' : 'degrees Celsius (G3-345)'}`);
      const content = (inner, extra = '') => `<div data-ws-content data-lcs-meas="${mode}"${extra} style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;

      if (mode === 'boxed') {
        // pictures that read at every size (neither a thin line nor a tall pole): ink height 0.7-1.7 × its width (the
        // smallest of four sizes stays ≥ 26 px tall)
        const pool = labelSafeNouns(theme).filter((n) => { const e = artExtentSync(theme, n.noun), r = e.heightFrac / e.widthFrac; return r >= 0.7 && r <= 1.7; });
        if (pool.length < 6) throw new Error(`${id}: theme ${theme} has ${pool.length} pictures that read at every size (a page needs 6)`);
        const nouns = slot.pictures(ctx, rng.sample(pool, 6), pool, theme);
        const steps = SCALE_LADDER.slice(0, d.items), top = Math.max(...steps);
        const ladder = steps.map((s) => Math.round((s / top) * 100) / 100), sum = ladder.reduce((a, b) => a + b, 0);
        const gap = d.items > 3 ? 10 : 14, rowW = 284 - gap * (d.items - 1), maxH = d.items > 3 ? 100 : 118;
        const items = [];
        const cards = nouns.map((n, b) => {
          const scales = rng.shuffle(ladder.slice());
          const asc = ladder.slice().sort((x, y) => x - y);
          const rank = scales.map((s) => (d.dir === 'up' ? asc.indexOf(s) + 1 : d.items - asc.indexOf(s)));
          items.push(rank.join(''));
          const e = artExtentSync(theme, n.noun);
          const inkH1 = Math.min(maxH, (rowW / sum) * (e.heightFrac / e.widthFrac));
          const box1 = inkH1 / e.heightFrac;
          const drawn = scales.map((s) => inkSpan(theme, n.noun, box1 * s, ` data-lcs-scale="${s}"`));
          const stageH = Math.ceil(Math.max(...drawn.map((x) => x.h)));
          return `<div class="ws-card-stage" style="justify-content:space-evenly;align-items:flex-end;gap:${gap}px;padding:10px 8px" data-lcs-dir="${d.dir}"${slot.attr(ctx, 'pic', b)}>` +
            drawn.map((x, k) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:8px"><span style="display:flex;align-items:flex-end;height:${stageH}px">${x.html}</span>${answerBox({ w: 40, h: 36, answer: rank[k] })}</span>`).join('') + `</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: 3, numbered: false })), meta: { items } };
      }

      if (mode === 'clips') {
        const cardH = (780 - 14 * (d.rows - 1)) / d.rows, rowH = Math.ceil(d.u * 0.36) + 4;
        const band = Math.floor(cardH - 34 - rowH - 8);
        const pool = lengthPool(theme, band, d.u, d.lenMin, d.lenMax);
        const pick = distinctLengths(pool, d.rows, d.lenMin, rng);
        if (!pick) throw new Error(`${id}: theme ${theme} cannot give ${d.rows} different lengths ${d.lenMin}..${d.lenMax}`);
        const rows = rowSlots(ctx, pick, pool, theme, id);
        const total = d.lenMax + 2;
        const cards = rows.map(({ item, len }, i) => {
          const n = d.run ? total : len, W = n * d.u + 2;
          const art = artAlong(theme, item, 1, len * d.u, W);
          const guide = (x) => `<span style="position:absolute;left:${x - 1}px;top:-6px;bottom:-6px;border-left:2px dashed ${INK}" data-lcs-guide="${x}"></span>`;
          return `<div class="ws-card-stage" style="gap:24px;justify-content:center;padding:4px 8px 4px 28px" data-lcs-len="${len}" data-lcs-u="${d.u}"${slot.attr(ctx, 'row' + i, 0)}>` +
            `<span style="position:relative;display:inline-flex;flex-direction:column;align-items:flex-start;gap:4px">` + art.html + clipRow(n, d.u) +
            (d.run ? guide(1) + guide(1 + len * d.u) : '') + `</span>` +
            answerBox({ w: 72, h: 52, answer: len }) + `</div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.rows })), meta: { items: rows.map((r) => r.len) } };
      }

      if (mode === 'rulers') {
        const inch = L === 'en';
        const strips = [];
        for (let k = 0; k < 4; k++) {
          const isIn = inch && k < 2;
          const sub = d.sub || (isIn ? 4 : 10);
          strips.push(isIn ? rulerStrip({ unit: 'in', n: 6, px: PX_IN, sub, label: 'in.' }) : rulerStrip({ unit: 'cm', n: 15, px: PX_CM, sub, label: 'cm' }));
        }
        return { bodyHtml: content(`<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center">${strips.join('')}</div>`), meta: { items: [] } };
      }

      if (mode === 'inches') {
        const rulerH = 64, cardH = (780 - 14 * (d.rows - 1)) / d.rows;
        const band = Math.floor(cardH - 30 - rulerH - 6);
        const pool = labelSafeNouns(theme).map((n) => {
          const ext = artExtentSync(theme, n.noun);
          // a nearest-inch object is drawn up to a quarter inch longer than its answer
          const fit = Math.floor((band * ext.widthFrac) / (DRAW_IN * ext.heightFrac) - (d.near ? 0.25 : 0));
          return { ...n, ext, maxLen: Math.min(d.lenMax, fit) };
        }).filter((x) => x.maxLen >= d.lenMin);
        const pick = distinctLengths(pool, d.rows, d.lenMin, rng);
        if (!pick) throw new Error(`${id}: theme ${theme} cannot give ${d.rows} different lengths in inches`);
        const rows = rowSlots(ctx, pick, pool, theme, id);
        const cards = rows.map(({ item, len }, i) => {
          const start = d.from === 'off' ? rng.int(1, RULER_IN - len) : 0;
          const shown = d.near ? len + (rng.next() < 0.5 ? -0.25 : 0.25) : len;
          const r = rulerPrim({ cm: RULER_IN, pxPerCm: DRAW_IN });
          const art = artAlong(theme, item, r.meta.zeroX + start * DRAW_IN, shown * DRAW_IN, r.width);
          return `<div class="ws-card-stage" style="position:relative;flex-direction:column;gap:0;align-items:flex-start;padding:4px 0 4px 16px" data-lcs-start="${start}" data-lcs-shown="${shown}" data-lcs-len="${len}"${slot.attr(ctx, 'row' + i, 0)}>` +
            art.html + r.svg +
            `<span style="position:absolute;right:16px;bottom:10px;display:inline-flex;align-items:center;gap:8px">${answerBox({ w: 66, h: 52, answer: len })}${NUM('in.', 22, TEAL)}</span></div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.rows })), meta: { items: rows.map((r) => r.len) } };
      }

      if (mode === 'unit') {
        const sys = rng.shuffle(systemsFor(Number(args.difficulty), L));
        // half the cards a small thing, half a big one, and each kind as even as its cards allow: a kind with an odd
        // number of cards takes the extra small one or the extra big one, in turn (so the page stays half and half)
        const byKind = {};
        sys.forEach((s, i) => { (byKind[KIND_OF[s]] = byKind[KIND_OF[s]] || []).push(i); });
        const size = Array(sys.length);
        let extraSmall = rng.next() < 0.5;
        for (const idx of Object.values(byKind)) {
          let half = Math.floor(idx.length / 2);
          if (idx.length % 2) { if (extraSmall) half++; extraSmall = !extraSmall; }
          rng.shuffle(idx.slice()).forEach((i, j) => { size[i] = j < half ? 'small' : 'big'; });
        }
        if (size.filter((s) => s === 'small').length * 2 !== sys.length) throw new Error(`${id}: the page is not half small things`);
        const used = new Set(), items = [];
        // the right unit is the left one on exactly half the cards ("where the answer sits")
        const leftRight = rng.shuffle(sys.map((_, i) => i < sys.length / 2));
        const cards = sys.map((s, i) => {
          const pool = THINGS[KIND_OF[s]][size[i]].filter(([th, n]) => !used.has(n));
          const [th, noun] = rng.pick(pool);
          used.add(noun);
          const [lo, hi] = unitsOf(s, L), right = size[i] === 'small' ? lo : hi;
          items.push(`${noun}:${right}`);
          const order = leftRight[i] === (right === lo) ? [lo, hi] : [hi, lo];
          const pic = inkSpan(th, noun, fitBox(th, noun, 170, 118));
          const chip = (u) => `<span class="ws-chip" style="width:auto;min-width:86px;height:52px;padding:0 16px;font-size:26px;border-radius:26px" data-lcs-choice="${u}"${marks && u === right ? ' data-lcs-correct="1"' : ''}>${u}</span>`;
          return `<div class="ws-card-stage" style="flex-direction:column;justify-content:space-evenly;align-items:center;gap:12px;padding:8px" data-lcs-thing="${noun}">` +
            `<span style="display:flex;align-items:center;justify-content:center;height:120px">${pic.html}</span>` +
            `<span class="ws-choices" style="display:inline-flex;gap:18px">${order.map(chip).join('')}</span></div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 2, rows: 3 })), meta: { items } };
      }

      if (mode === 'fahrenheit') {
        const used = new Set(), items = [];
        const cards = [0, 1, 2].map(() => {
          let v;
          // never 0, never 100; levels 2-3 read BETWEEN the numerals (never a labelled value)
          do { v = d.step * rng.int(1, Math.floor(100 / d.step) - 1); } while (used.has(v) || (d.labelEvery > 1 && v % (d.step * d.labelEvery) === 0));
          used.add(v); items.push(v);
          const th = thermometerPrim({ value: v, min: 0, max: 100, step: d.step, labelEvery: d.labelEvery, height: 520 });
          return `<div class="ws-card-stage" style="flex-direction:column;gap:18px" data-lcs-step="${d.step}" data-lcs-labelevery="${d.labelEvery}">` +
            NUM('°F', 24, TEAL) + th.svg +
            `<span style="display:inline-flex;align-items:center;gap:6px">${answerBox({ w: 76, h: 54, answer: v })}${NUM('°F', 24, TEAL)}</span></div>`;
        });
        return { bodyHtml: content(cardGrid({ cards, cols: 3, rows: 1 })), meta: { items } };
      }
      throw new Error(`${id}: unknown mode ${mode}`);
    },

    /** inside the page: every measure is what the drawing shows */
    async verify(page) {
      return page.evaluate(({ mode, PX_CM, PX_IN }) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-meas]');
        if (!root) return ['no measurement content'];
        const R = (el) => el.getBoundingClientRect();
        if (mode === 'boxed') {
          const boxes = [...root.querySelectorAll('[data-lcs-dir]')];
          if (boxes.length !== 6) fails.push(boxes.length + ' boxes');
          const nouns = new Set();
          boxes.forEach((b, i) => {
            const ink = [...b.querySelectorAll('[data-lcs-ink]')];
            const scales = ink.map((x) => +x.dataset.lcsScale), hs = ink.map((x) => R(x).height), ws = ink.map((x) => R(x).width);
            nouns.add(b.querySelector('img').getAttribute('src'));
            const ans = [...b.querySelectorAll('[data-lcs-answer]')].map((x) => +x.dataset.lcsAnswer);
            const asc = scales.slice().sort((x, y) => x - y);
            const want = scales.map((s) => (b.dataset.lcsDir === 'up' ? asc.indexOf(s) + 1 : scales.length - asc.indexOf(s)));
            if (ans.join() !== want.join()) fails.push(`box ${i + 1}: the numbers are not the size order`);
            const byS = scales.map((s, k) => [s, hs[k] * ws[k]]).sort((x, y) => x[0] - y[0]);
            for (let k = 1; k < byS.length; k++) if (byS[k][1] < byS[k - 1][1] * 1.6) fails.push(`box ${i + 1}: two sizes too close to tell`);
            const bottoms = ink.map((x) => R(x).bottom);
            if (Math.max(...bottoms) - Math.min(...bottoms) > 1) fails.push(`box ${i + 1}: the pictures do not stand on one line`);
            if (Math.min(...hs) < 26) fails.push(`box ${i + 1}: the smallest picture is ${Math.round(Math.min(...hs))} px tall`);
          });
          if (nouns.size !== boxes.length) fails.push('two boxes show the same picture');
        } else if (mode === 'clips') {
          root.querySelectorAll('[data-lcs-len]').forEach((card, i) => {
            const len = +card.dataset.lcsLen, u = +card.dataset.lcsU;
            const row = card.querySelector('[data-lcs-clips]'), clips = row.querySelectorAll('[data-lcs-clip]');
            if (clips.length < len) fails.push(`row ${i + 1}: ${clips.length} clips for an object ${len} long`);
            const art = card.querySelector('[data-lcs-art]'), img = art.querySelector('img'), rr = R(row), ra = R(art), ri = R(img);
            // RENDERED: the drawing's ink (its image placed, then its measured extents) starts at the first clip's start and
            // ends after exactly len clips (1.5 px); the band and the clip row start at the same x
            const inkL = ri.left + +art.dataset.lcsLf * ri.width, inkR = inkL + +art.dataset.lcsWf * ri.width;
            if (Math.abs(ra.left - rr.left) > 0.5) fails.push(`row ${i + 1}: the drawing and the clips do not start together`);
            if (Math.abs(inkL - (rr.left + 1)) > 1.5) fails.push(`row ${i + 1}: the object does not start at the first clip`);
            if (Math.abs(inkR - (rr.left + 1 + len * u)) > 1.5) fails.push(`row ${i + 1}: the object is not ${len} clips long`);
            if (Math.abs(R(clips[clips.length - 1]).right - rr.left - clips.length * u) > 3) fails.push(`row ${i + 1}: the clips are not one clip long each`);
            const g = [...card.querySelectorAll('[data-lcs-guide]')].map((x) => R(x).left + 1 - rr.left);
            if (g.length && (Math.abs(g[0] - 1) > 1.5 || Math.abs(g[1] - (1 + len * u)) > 1.5)) fails.push(`row ${i + 1}: the dashed lines are not at the object's ends`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== len) fails.push(`row ${i + 1}: answer`);
          });
        } else if (mode === 'rulers') {
          const strips = [...root.querySelectorAll('[data-lcs-ruler]')];
          if (strips.length !== 4) fails.push(strips.length + ' rulers');
          strips.forEach((s, i) => {
            const px = s.dataset.lcsRuler === 'in' ? PX_IN : PX_CM, n = +s.dataset.lcsUnits;
            const marks = [...s.querySelectorAll('[data-lcs-mark]')].map((x) => R(x).left);
            if (marks.length !== n + 1) fails.push(`ruler ${i + 1}: ${marks.length} numbered marks`);
            const span = marks[marks.length - 1] - marks[0];
            if (Math.abs(span - n * px) > 0.6) fails.push(`ruler ${i + 1}: ${n} units are ${span.toFixed(1)} px, not ${(n * px).toFixed(1)} (not real size)`);
            if (marks[0] - R(s).left < 14) fails.push(`ruler ${i + 1}: the 0 sits at the edge`);
            if (R(s).right > R(document.querySelector('[data-lcs-page]')).right) fails.push(`ruler ${i + 1}: off the page`);
          });
        } else if (mode === 'inches') {
          root.querySelectorAll('[data-lcs-len]').forEach((card, i) => {
            const start = +card.dataset.lcsStart, shown = +card.dataset.lcsShown, len = +card.dataset.lcsLen;
            const svg = card.querySelector('[data-lcs-prim="ruler"]'), rs = R(svg), zero = +svg.dataset.lcsZerox;
            const art = card.querySelector('[data-lcs-art]'), ri = R(art.querySelector('img'));
            // RENDERED: the ink starts on the start mark and spans the drawn length, both in real inches (1.5 px)
            const inkL = ri.left + +art.dataset.lcsLf * ri.width, inkR = inkL + +art.dataset.lcsWf * ri.width;
            const ppi = +svg.dataset.lcsPxpercm;   // the ruler's own inch
            if (Math.abs(inkL - (rs.left + zero + start * ppi)) > 1.5) fails.push(`row ${i + 1}: the object does not start on ${start}`);
            if (Math.abs(inkR - inkL - shown * ppi) > 1.5) fails.push(`row ${i + 1}: the object is not ${shown} in. long`);
            if (Math.round(shown) !== len || Math.abs(shown - len) > 0.25 || Math.abs(Math.abs(shown - len) - 0.5) < 0.2) fails.push(`row ${i + 1}: drawn ${shown} in. for the answer ${len}`);
            if (start + shown > +svg.dataset.lcsCmmax) fails.push(`row ${i + 1}: runs off the ruler`);
            const box = R(card.querySelector('.ws-answerbox'));
            if (box.left < inkR + 8 || box.left < rs.right) fails.push(`row ${i + 1}: the answer box is not beside the ruler`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== len) fails.push(`row ${i + 1}: answer`);
          });
        } else if (mode === 'unit') {
          const cards = [...root.querySelectorAll('[data-lcs-thing]')];
          if (new Set(cards.map((c) => c.dataset.lcsThing)).size !== cards.length) fails.push('a thing twice');
          cards.forEach((c, i) => { if (c.querySelectorAll('[data-lcs-choice]').length !== 2) fails.push(`card ${i + 1}: not two units`); });
          const right = [...root.querySelectorAll('[data-lcs-correct]')];
          if (right.length && right.length !== cards.length) fails.push(right.length + ' marked units for ' + cards.length + ' cards');
          if (right.length) {
            const left = right.filter((r) => r === r.parentElement.firstElementChild).length;
            if (left * 2 !== cards.length) fails.push(`the right unit is the left one on ${left} of ${cards.length} cards`);
          }
        } else if (mode === 'fahrenheit') {
          root.querySelectorAll('[data-lcs-step]').forEach((card, i) => {
            const svg = card.querySelector('[data-lcs-prim="thermometer"]'), v = +svg.dataset.lcsValue, step = +card.dataset.lcsStep, le = +card.dataset.lcsLabelevery;
            if (v % step) fails.push(`card ${i + 1}: ${v} is not on a mark`);
            if (le > 1 && v % (step * le) === 0) fails.push(`card ${i + 1}: ${v} sits on a numeral`);
            if (v <= 0 || v >= 100) fails.push(`card ${i + 1}: ${v} at the end of the scale`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== v) fails.push(`card ${i + 1}: answer`);
          });
        }
        return fails;
      }, { mode, PX_CM, PX_IN });
    },
  };
}

module.exports = { makeMeasurementMoreType, LEVELS, THINGS, unitsOf, systemsFor, clipPath, rulerStrip };
