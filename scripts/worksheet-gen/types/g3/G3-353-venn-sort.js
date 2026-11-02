/**
 * G3-353 — Two-Circle Sort: a Venn diagram of two attributes, KIND and SIZE.
 *   left circle  = one kind of thing (any size) — labelled above with its picture and its plural word ("Apples")
 *   right circle = the big pictures (any kind) — labelled "Big pictures"
 *   middle       = a big picture of that kind; the box outside both circles = neither (a small picture of another thing)
 * The pictures are numbered in a strip under the diagram; the child writes each number in its place (the answer key
 * writes them there). Pedagogy rebuild 2026-11-01 (operator: "the instruction is very confusing"):
 *   - the instruction says every region in full sentences; the circles are named on the page, not by a stray icon and a
 *     crossed-out dot
 *   - a box around the circles: "outside" is a place on the page, never the strip
 *   - BIG means the picture is drawn big: every thing on the page appears big AND small, so a size is always judged
 *     against the same thing, never a small elephant against a big mouse (real-world size)
 *   - numbers written in the regions, not twelve lines tangled across two circles
 *   - each region holds 1 … ⌈n/4⌉+1 pictures (no region swallows the page)
 */
'use strict';
const slot = require('../../lib/slot.js');
const { labelSafeNouns, fileUri, labelsForKey, themeEntry } = require('../../image-cache/resolve.js');
const { GRAPH_THEMES, lookalike, unclear } = require('../../lib/picture-distinct.js');
const { svgRoot, el, circle } = require('../../primitives/_svg.js');
const tokens = require('../../primitives/_tokens.js');

const BIG = 58, SMALL = 34;
const REGIONS = ['left', 'both', 'right', 'out'];

/*
 * ONE right answer (native + pedagogy review 2026-11-01): the left circle is named by a WORD ("Fish"), so an "other"
 * picture that is one of the kind — a clownfish beside "Fish", a leopard beside "Cats" — belongs in the left circle too,
 * and the key would mark a right answer wrong. The pictures come only from themes read by eye for look-alikes
 * (data/graph-lookalikes.js; a black-and-white sibling uses only the nouns read in colour), and the kind and the others
 * are never related:
 *   - generic words are never a circle's name or an other (a clownfish IS a fish, an owl IS a bird)
 *   - one look-alike group of the theme, or one IS_A pair below (a panda is a bear, a square a parallelogram …)
 *   - one word inside the other in the page's language (de Fische / Goldfische, es Camiones / Camiones de carga)
 */
const GENERIC = new Set(['fish', 'bird', 'monkey', 'planet', 'boat', 'animal', 'flower', 'tree', 'insect', 'bug']);
const IS_A = [['cat', 'tiger'], ['cat', 'jaguar'], ['cat', 'leopard'], ['cat', 'lion'], ['cat', 'cheetah'], ['bear', 'panda'], ['dog', 'wolf'],
  ['dog', 'fox'], ['cow', 'bull'], ['cow', 'ox'], ['cow', 'calf'], ['chicken', 'chick'], ['hen', 'chick'], ['rooster', 'chick'], ['duck', 'duckling'],
  ['horse', 'foal'], ['horse', 'pony'], ['sheep', 'lamb'], ['cake', 'cupcake'], ['cookie', 'macaron'], ['cookie', 'gingerbread'], ['shoe', 'boots'],
  ['shoe', 'slippers'], ['hat', 'beanie'], ['cap', 'beanie'], ['square', 'parallelogram'], ['diamond', 'parallelogram'], ['rectangle', 'parallelogram'],
  ['square', 'rectangle'], ['square', 'cube'], ['rectangle', 'cube'], ['circle', 'sphere'], ['triangle', 'pyramid'], ['earth', 'planet'], ['sun', 'star'],
  ['turtle', 'tortoise'], ['lemon', 'lime'], ['glove', 'mitten'], ['frog', 'toad'], ['car', 'taxi'], ['car', 'jeep'], ['ship', 'ferry'], ['ship', 'yacht'],
  ['airplane', 'jet'], ['bus', 'subway']];
const baseTheme = (theme) => String(theme).replace(/\s+bw(\s+\d+)?$/i, '');
/** one of the two words (singular / plural) inside one of the other's, in the page's language */
function wordsOverlap(theme, a, b, L) {
  const key = (n) => (themeEntry(theme).nouns[n] || {}).vocabKey || n;   // the picture's own vocabulary key (the vehicles crane is not the bird)
  const A = (labelsForKey(key(a), L) || []).slice(0, 2).map((w) => String(w).toLowerCase()), B = (labelsForKey(key(b), L) || []).slice(0, 2).map((w) => String(w).toLowerCase());
  return A.some((x) => B.some((y) => x === y || (x.length >= 3 && y.includes(x)) || (y.length >= 3 && x.includes(y))));
}
/** are two things of a theme related (one may be read as the other)? */
function related(theme, a, b, L) {
  const base = baseTheme(theme);
  return a === b || lookalike(base, a, b) || IS_A.some(([x, y]) => (x === a && y === b) || (x === b && y === a)) || wordsOverlap(theme, a, b, L);
}
/** the pictures this template may use from a theme: read for look-alikes, not generic, not unclear */
function poolOf(theme) {
  const base = baseTheme(theme);
  if (!GRAPH_THEMES.includes(base)) throw new Error(`G3-353: theme "${theme}" has not been read for look-alikes — REFUSED, never guessed`);
  const read = new Set(Object.keys(themeEntry(base).nouns));
  return labelSafeNouns(theme).filter((n) => read.has(n.noun) && !GENERIC.has(n.noun) && !unclear(base, n.noun));
}

/** the diagram of a w-wide svg: a label band, then the box (the whole set) holding the two circles */
const geom = (w = 600) => {
  const band = 56, boxH = 330, r = 140, cy = band + 4 + boxH / 2;
  return { w, h: band + 4 + boxH + 2, band, r, cy, cx1: w / 2 - r * 0.62, cx2: w / 2 + r * 0.62, box: { x: 2, y: band + 4, w: w - 4, h: boxH } };
};
/** which region a point is in (pad: distance kept from every line), null on a line */
const regionOf = (g, x, y, pad) => {
  const d1 = Math.hypot(x - g.cx1, y - g.cy), d2 = Math.hypot(x - g.cx2, y - g.cy);
  const in1 = d1 < g.r - pad, in2 = d2 < g.r - pad, out1 = d1 > g.r + pad, out2 = d2 > g.r + pad;
  const inBox = x > g.box.x + pad && x < g.box.x + g.box.w - pad && y > g.box.y + pad && y < g.box.y + g.box.h - pad;
  if (!inBox) return null;
  if (in1 && in2) return 'both';
  if (in1 && out2) return 'left';
  if (in2 && out1) return 'right';
  if (out1 && out2) return 'out';
  return null;
};

/** "Big pictures" — the right circle's label (native-checked ×11) */
const BIG_LABEL = {
  en: 'Big pictures', de: 'Große Bilder', fr: 'Grandes images', es: 'Dibujos grandes', pt: 'Figuras grandes', it: 'Immagini grandi',
  nl: 'Grote plaatjes', sv: 'Stora bilder', da: 'Store billeder', no: 'Store bilder', fi: 'Isot kuvat',
};
/** the screen's region words (they label a linked picture's badge); left = the kind's own word, right = BIG_LABEL */
const REGION_WORDS = {
  en: { both: 'both', out: 'neither' }, de: { both: 'beides', out: 'keins' }, fr: { both: 'les deux', out: 'aucun' },
  es: { both: 'los dos', out: 'ninguno' }, pt: { both: 'os dois', out: 'nenhum' }, it: { both: 'entrambi', out: 'nessuno' },
  nl: { both: 'allebei', out: 'geen van beide' }, sv: { both: 'båda', out: 'ingen' }, da: { both: 'begge', out: 'ingen' },
  no: { both: 'begge', out: 'ingen' }, fi: { both: 'molemmat', out: 'ei kumpikaan' },
};
const loc2 = (locale) => String(locale || 'en').slice(0, 2);

/** the answer key: each picture's number written in its region, spread over the region, never touching a line */
function keyNumbers(g, items) {
  const centre = { left: [g.cx1 - g.r * 0.5, g.cy], both: [g.w / 2, g.cy], right: [g.cx2 + g.r * 0.5, g.cy], out: [g.box.x + 34, g.box.y + 30] };
  const placed = [];
  let s = '';
  for (const it of items) {
    const size = 30, pad = size / 2 + 2;
    const cands = [];
    for (let y = g.box.y + pad; y <= g.box.y + g.box.h - pad; y += 4) for (let x = g.box.x + pad; x <= g.box.x + g.box.w - pad; x += 4) if (regionOf(g, x, y, pad) === it.reg) cands.push([x, y]);
    const [cx, cy] = centre[it.reg];
    cands.sort((a, b) => Math.hypot(a[0] - cx, a[1] - cy) - Math.hypot(b[0] - cx, b[1] - cy));
    const spot = cands.find(([x, y]) => placed.every((p) => Math.hypot(p[0] - x, p[1] - y) >= size + 6));
    if (!spot) throw new Error('G3-353: no room for number ' + it.n + ' in the ' + it.reg + ' region');
    placed.push(spot);
    s += el('text', { x: spot[0], y: spot[1], 'font-family': tokens.font.display, 'font-size': 26, 'font-weight': 700, fill: tokens.color.coral, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'data-lcs-key-sample': 1, 'data-lcs-key-region': it.reg }, String(it.n));
  }
  return s;
}

/**
 * the screen's tap area of each region: an invisible box as large as fits INSIDE the region (every corner clear of both
 * circle lines — verify() measures it), so a tap anywhere near the middle of a region counts; outside = the bottom-left
 * corner of the box
 */
function regionTargets(g, words) {
  const box = (reg, x0, y0, x1, y1) => `<rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${(x1 - x0).toFixed(1)}" height="${(y1 - y0).toFixed(1)}" fill="#FFFFFF" fill-opacity="0" data-lcs-pair="${reg}" data-lcs-label="${words[reg]}"/>`;
  const lx = g.cx2 - g.r - 6, rx = g.cx1 + g.r + 6;   // the inner edges of the two lunes
  return box('left', g.cx1 - g.r * 0.8, g.cy - 80, lx, g.cy + 80) + box('both', lx + 26, g.cy - 56, rx - 26, g.cy + 56) +
    box('right', rx, g.cy - 80, g.cx2 + g.r * 0.8, g.cy + 80) + box('out', g.box.x + 6, g.box.y + g.box.h - 98, g.box.x + 84, g.box.y + g.box.h - 4);
}

function vennSvg(g, kindHref, kindWord, bigWord, extra = '') {
  const t = tokens;
  const label = (x, anchor, word, colour) => el('text', { x, y: 30, 'font-family': t.font.display, 'font-size': 24, 'font-weight': 700, fill: colour, 'text-anchor': anchor, 'dominant-baseline': 'central', 'data-lcs-venn-label': anchor === 'start' ? 'left' : 'right' }, word);
  return svgRoot({ width: g.w, height: g.h, label: 'venn diagram' }, [
    // the box: the whole set — "outside the circles" is inside it
    `<rect x="${g.box.x}" y="${g.box.y}" width="${g.box.w}" height="${g.box.h}" rx="14" fill="none" stroke="${t.color.ink}" stroke-width="2.5" data-lcs-venn-box="1"/>`,
    circle({ cx: g.cx1, cy: g.cy, r: g.r, fill: 'none', strokeColor: t.color.teal, strokeWidth: 4 }),
    circle({ cx: g.cx2, cy: g.cy, r: g.r, fill: 'none', strokeColor: t.color.coral, strokeWidth: 4 }),
    // the circles' names, above the box in the circle's own colour: the kind's picture + its plural word; "Big pictures"
    el('image', { href: kindHref, x: 14, y: 8, width: 44, height: 44, 'data-lcs-venn-icon': 1 }),
    label(66, 'start', kindWord, t.color.teal),
    label(g.w - 14, 'end', bigWord, t.color.coral),
  ].join('') + extra);
}

/** for tests (scripts/makers/tests/venn.test.js): the relation and the picture pool */
const testHooks = { related, poolOf, GENERIC, IS_A };

module.exports = {
  id: 'G3-353',
  slug: 'venn-diagram-sorting',
  gradeBand: 'G23',
  assetClass: 'visual-logic',
  exerciseType: 'visual-logic',
  themeAxis: { applicable: true, minNouns: 4 },
  difficulty: {
    1: { items: 8 },
    2: { items: 10 },
    3: { items: 12 },
  },
  i18n: {
    en: {
      title: 'Two-Circle Sort',
      instruction: "Write each picture's number in its place: the left circle is for the things shown above it, the right circle for big pictures, the middle for pictures that fit both, and the box outside the circles for pictures that fit neither.",
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng, L = loc2(locale);
    const pool = poolOf(theme);
    let kind = null, clean = [];
    for (const k of rng.shuffle(pool)) {
      clean = pool.filter((n) => !related(theme, k.noun, n.noun, L));
      if (clean.length >= 2) { kind = k; break; }
    }
    if (!kind) throw new Error(`G3-353: ${theme} has no kind with two unrelated things — REFUSED`);
    const [other1, other2] = rng.sample(clean, 2);
    // tap-to-edit (lib/slot.js, no random call added): the teacher may change the circle's kind and the other things, but
    // only to a picture that keeps every region true — a kind unrelated to the other things (and with its word), another
    // thing unrelated to the kind — so the answer key cannot break
    kind = slot.pictures(ctx, [kind], pool.filter((n) => (labelsForKey(n.vocabKey, L) || [])[1] && !related(theme, n.noun, other1.noun, L) && !related(theme, n.noun, other2.noun, L)), theme, 'kind')[0];
    const kindWord = (labelsForKey(kind.vocabKey, L) || [])[1];
    if (!kindWord || !BIG_LABEL[L]) throw new Error(`G3-353: no ${L} word for ${kind.noun} or for "big pictures" — REFUSED`);
    // how many pictures each region gets: at least one, at most ⌈n/4⌉+1
    const count = { left: 1, both: 1, right: 1, out: 1 }, cap = Math.ceil(d.items / 4) + 1;
    for (let k = 4; k < d.items; k++) count[rng.pick(REGIONS.filter((r) => count[r] < cap))]++;
    // the other things: every one shown both big (right) and small (outside) — two of them when both regions have room
    const others = slot.pictures(ctx, count.right >= 2 && count.out >= 2 ? [other1, other2] : [other1], pool.filter((n) => !related(theme, kind.noun, n.noun, L)), theme, 'pic');
    const fill = (n) => rng.shuffle(others.concat(Array.from({ length: n - others.length }, () => rng.pick(others))));
    const rightNouns = fill(count.right), outNouns = fill(count.out);
    const items = [];
    for (const reg of REGIONS) for (let k = 0; k < count[reg]; k++) {
      const isKind = reg === 'left' || reg === 'both', isBig = reg === 'both' || reg === 'right';
      items.push({ reg, isKind, isBig, noun: isKind ? kind : reg === 'right' ? rightNouns[k] : outNouns[k] });
    }
    const order = rng.shuffle(items).map((it, i) => ({ ...it, n: i + 1 }));

    const key = !!(ctx && ctx.answerKey), scr = !!(ctx && ctx.screen);
    const g = geom();
    const words = { left: kindWord, right: BIG_LABEL[L], ...(REGION_WORDS[L] || REGION_WORDS.en) };
    const tapped = new Set();
    const strip = order.map((it) => {
      const px = it.isBig ? BIG : SMALL;
      // the tap target: the first picture of each thing on the page
      const tap = tapped.has(it.noun.noun) ? '' : (tapped.add(it.noun.noun), it.isKind ? slot.attr(ctx, 'kind', 0) : slot.attr(ctx, 'pic', others.indexOf(it.noun)));
      return `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px;width:${BIG + 14}px" data-lcs-region="${it.reg}"${scr ? ` data-lcs-key-badge="${it.reg}"` : ''}>` +
        `<span style="display:flex;align-items:flex-end;justify-content:center;width:${BIG + 10}px;height:${BIG + 4}px"><img class="ws-icon" src="${fileUri(theme, it.noun.noun)}" alt="" data-lcs-kind="${it.isKind ? 1 : 0}" data-lcs-big="${it.isBig ? 1 : 0}" data-lcs-noun="${it.noun.noun}"${tap} style="width:${px}px;height:${px}px"></span>` +
        `<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:2px solid ${tokens.color.ink};border-radius:50%;font-family:'Baloo 2';font-weight:700;font-size:17px;color:${tokens.color.ink}" data-lcs-number="${it.n}">${it.n}</span></span>`;
    }).join('');
    const extra = key ? keyNumbers(g, order) : scr ? regionTargets(g, words) : '';

    return {
      bodyHtml:
        // data-ws-content: a full-page layout (no card stage) — without it the blank-page lint refused every page in the maker
        `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly" data-lcs-kindkey="${kind.vocabKey}">` +
        vennSvg(g, fileUri(theme, kind.noun), kindWord, BIG_LABEL[L], extra) +
        `<div style="display:flex;flex-wrap:wrap;gap:10px 8px;justify-content:center;max-width:640px">${strip}</div>` +
        `</div>`,
      meta: { kind: kind.vocabKey, others: [...new Set(order.filter((it) => !it.isKind).map((it) => it.noun.noun))], items: order.map((it) => it.n + ':' + it.reg) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const items = [...document.querySelectorAll('[data-lcs-region]')];
      const seen = { left: 0, both: 0, right: 0, out: 0 };
      const sizes = {};   // noun → the sizes it is drawn at
      items.forEach((it, i) => {
        const reg = it.dataset.lcsRegion;
        seen[reg]++;
        const img = it.querySelector('img');
        const isKind = img.dataset.lcsKind === '1';
        const isBig = img.dataset.lcsBig === '1';
        const expect = { left: [true, false], both: [true, true], right: [false, true], out: [false, false] }[reg];
        if (isKind !== expect[0] || isBig !== expect[1]) fails.push(`item ${i + 1}: attributes do not match region ${reg}`);
        const w = parseInt(img.style.width, 10);
        if (isBig && w < 50) fails.push(`item ${i + 1}: big item rendered small`);
        if (!isBig && w > 44) fails.push(`item ${i + 1}: small item rendered big`);
        (sizes[img.dataset.lcsNoun] = sizes[img.dataset.lcsNoun] || new Set()).add(isBig);
        const num = it.querySelector('[data-lcs-number]');
        if (!num || num.textContent !== String(i + 1)) fails.push(`item ${i + 1}: its number is not ${i + 1}`);
      });
      const cap = Math.ceil(items.length / 4) + 1;
      Object.entries(seen).forEach(([r, n]) => { if (n < 1) fails.push(`region ${r} has no items`); if (n > cap) fails.push(`region ${r} has ${n} items (at most ${cap})`); });
      // a size is judged against the same thing: every thing is drawn big AND small
      Object.entries(sizes).forEach(([noun, s]) => { if (s.size < 2) fails.push(`${noun} is drawn at one size only`); });
      // the box, both labels inside the diagram's width, not over each other
      const svg = document.querySelector('svg[aria-label="venn diagram"]') || document.querySelector('[data-lcs-venn-box]').ownerSVGElement;
      if (!document.querySelector('[data-lcs-venn-box]')) fails.push('no box around the circles');
      const lab = [...document.querySelectorAll('[data-lcs-venn-label]')].map((t) => t.getBBox());
      const icon = document.querySelector('[data-lcs-venn-icon]').getBBox();
      const W = svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width ? svg.viewBox.baseVal.width : svg.width.baseVal.value;
      if (lab.length !== 2) fails.push('the circles are not both named');
      else {
        if (lab.some((b) => b.x < 0 || b.x + b.width > W)) fails.push('a circle name runs off the diagram');
        if (lab[0].x + lab[0].width + 16 > lab[1].x) fails.push('the two circle names run into each other');
        if (icon.x + icon.width > lab[0].x) fails.push('the kind picture covers its word');
      }
      // the screen's tap areas: every corner and the middle of each inside ITS region (a tap there is never read as another)
      const circles = [...svg.querySelectorAll('circle')].filter((c) => +c.getAttribute('r') > 100).map((c) => ({ x: +c.getAttribute('cx'), y: +c.getAttribute('cy'), r: +c.getAttribute('r') }));
      const boxEl = document.querySelector('[data-lcs-venn-box]');
      const B = boxEl && { x: +boxEl.getAttribute('x'), y: +boxEl.getAttribute('y'), w: +boxEl.getAttribute('width'), h: +boxEl.getAttribute('height') };
      const where = (x, y) => {
        if (!B || x <= B.x || x >= B.x + B.w || y <= B.y || y >= B.y + B.h || circles.length !== 2) return null;
        const [a, b] = circles.map((c) => Math.hypot(x - c.x, y - c.y) - c.r);
        if (Math.abs(a) < 2 || Math.abs(b) < 2) return null;
        return a < 0 && b < 0 ? 'both' : a < 0 ? 'left' : b < 0 ? 'right' : 'out';
      };
      for (const t of document.querySelectorAll('rect[data-lcs-pair]')) {
        const x = +t.getAttribute('x'), y = +t.getAttribute('y'), w = +t.getAttribute('width'), h = +t.getAttribute('height');
        const pts = [[x, y], [x + w, y], [x, y + h], [x + w, y + h], [x + w / 2, y + h / 2]];
        if (pts.some(([px, py]) => where(px, py) !== t.dataset.lcsPair)) fails.push(`the ${t.dataset.lcsPair} tap area crosses into another region`);
      }
      // the answer key: every number written once, in its own region
      const keyNums = [...document.querySelectorAll('[data-lcs-key-region]')];
      if (keyNums.length) {
        if (keyNums.length !== items.length) fails.push(`the key writes ${keyNums.length} numbers for ${items.length} pictures`);
        keyNums.forEach((t) => { const it = items[Number(t.textContent) - 1]; if (!it || it.dataset.lcsRegion !== t.dataset.lcsKeyRegion) fails.push(`key number ${t.textContent} is in the wrong region`); });
      }
      return fails;
    });
  },
};
Object.defineProperty(module.exports, 'testHooks', { value: testHooks, enumerable: false });
// the diagram's geometry, regions, key numbers and tap areas, for the other two-circle sorts (G1-485 shapes and colours)
Object.defineProperty(module.exports, 'venn', { value: { geom, regionOf, keyNumbers, regionTargets, REGION_WORDS, REGIONS } });
