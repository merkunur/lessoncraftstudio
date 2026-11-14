/**
 * two-kinds.js — How Many in All? (K-643; Year pages Z, 2026-11-14; K.OA.A.2: solve addition word problems within 10,
 * here the PUT-TOGETHER kind with the total unknown — nothing moves, two groups of one thing are there at once).
 * For the English Kindergarten lesson on put-together stories of the year design (the design called it "Two kinds
 * together"; docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md: the story bank had only "some more come" stories).
 *
 * A story names ONE thing in two colors ("On the shelf there are 3 red cups and 5 blue cups. How many cups are on the
 * shelf?"). Under it a row of outline pictures of that thing, more than most stories need: the child colors the pictures
 * as the story says and leaves the rest white. Under the row the frame _ + _ = _ (in French, Dutch, Danish and Finnish
 * the words of a class that does not write + and = yet: "_ et _, ça fait _"), a dot of each color under the box of its
 * group.
 *   level 1  three stories, totals 4 to 6, a row of eight pictures (five and three)
 *   level 2  four stories, totals 5 to 10, a row of ten (five and five, as on a ten-frame); a total of 10, which leaves
 *            nothing white, is on about one page in three
 *   level 3  three stories, totals 6 to 10, no pictures: the child draws a circle for each thing, in its color, in a box
 *            tall enough to draw in (the native and teaching review measured the four-story box at 1.7 cm)
 * Each group has at least 2 things (no "1 red cup": a single thing would need the singular, and in most of the languages
 * a color word of another form). The totals of a page differ, the things of a page differ, and no two stories on a page
 * use the same two colors.
 *
 * NOT "two kinds" (review 2026-11-14): every picture in a row is the same thing, and only the colors differ — the first
 * build said "color the two kinds", which asks a child to find two kinds among identical pictures.
 *
 * Words: data/word-problems/kinds-frames.json (11 languages, native frames with a place tag; the color words in the form
 * each frame needs, agreeing with the noun's gender where the language asks it; Dutch posture verbs per thing). Nouns: the
 * plural from image-vocabulary.js (fi: the partitive after a numeral, from the story bank's tables or the frame file),
 * except where the frame file names the word children use. Pictures: black-and-white themes only (the child colors
 * them), and only things that come in any color. A butterfly is only ever in a garden, a flower never in a box, and a
 * flower is never green. PDF only.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri, labelsForKey: labels } = require('../../image-cache/resolve.js');
const W = require('../../lib/word-problems-levelset.js');
const KF = require('../../data/word-problems/kinds-frames.json');

const C = tokens.color, INK = C.ink, TEAL = C.teal, CORAL = C.coral;
const loc2 = (l) => String(l || 'en').slice(0, 2);
const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** the crayon colors and the dot each one prints */
const HEX = { red: '#E0533A', blue: '#3B7DD8', yellow: '#F2C230', green: '#3FA34D' };
const COLORS = Object.keys(HEX);
/** black-and-white themes and the things on them that come in any color and are big and open enough to color in a row
 *  (contact sheets of every candidate at row size, 2026-11-14: refused thin or busy drawings — airplane, boat, train, robot,
 *  truck, pencil, pen, marker, ruler, comb, scarf, dress, jacket, backpack — and every picture that holds several things,
 *  which a row would miscount — a bunch of balloons, two hearts, a cake with candles; refused too: the Christmas stocking,
 *  a custom of few of the eleven countries). No two themes share more than one thing, so the copies of a level show
 *  different things (dropped: "home and nature", whose bowl, plate and teacup are the kitchen's, and "food", whose
 *  cupcake and donut are dessert's; Easter gives its bell to Christmas). */
const THINGS = {
  'apparel bw': 'cap hat shirt sock t-shirt',
  'kitchen bw': 'bottle bowl plate teacup',
  'Christmas bw': 'bell bow candle ornament',
  'toys bw 2': 'bucket kite pinwheel rocket',
  'Easter bw 2': 'candle egg gift',
  'household bw': 'bowl bucket cup umbrella',
  'nature bw': 'butterfly flower umbrella',
  'dessert bw': 'cupcake donut muffin',
};
const THEMES = Object.keys(THINGS);
/** where a thing may be: a butterfly flies in a garden, a flower is never put in a box */
const PLACES = { butterfly: ['garden'], flower: ['shelf', 'table', 'people', 'garden'] };
const PLACES_DEFAULT = ['shelf', 'box', 'table', 'people'];
/** the colors a thing may have: a green flower reads as a leaf */
const THING_COLORS = { flower: ['red', 'blue', 'yellow'] };
/** a holiday keeps its capital when the plural is lower-cased */
const PROPER = { pt: ['Natal', 'Páscoa'], fr: ['Noël', 'Pâques'], it: ['Natale', 'Befana', 'Pasqua'], es: ['Navidad', 'Pascua'] };

const LEVELS = {
  1: { problems: 3, row: 8, totals: [4, 5, 6], icon: 60, font: 19 },
  2: { problems: 4, row: 10, totals: [5, 6, 7, 8, 9], ten: 1 / 3, icon: 54, font: 17 },
  3: { problems: 3, row: 0, totals: [6, 7, 8, 9, 10], font: 19, draw: true },
};

/** the things this theme offers in this language: [{noun, vocabKey, text, gender}] */
function thingsFor(theme, L) {
  const want = THINGS[theme];
  if (!want) throw new Error(`two-kinds: theme "${theme}" has no things to color`);
  const set = new Set(want.split(' '));
  const F = KF[L] || {};
  const out = [];
  for (const n of labelSafeNouns(theme)) {
    if (!set.has(n.noun)) continue;
    const l = labels(n.vocabKey, L);
    if (!l || !l[1]) continue;
    let text = (F.nouns || {})[n.noun];
    if (!text && L === 'fi') text = (F.fiForms || {})[n.noun] || W.fiForm(n.vocabKey);
    if (!text) {
      text = L === 'de' ? l[1] : l[1].toLocaleLowerCase(L);
      for (const p of PROPER[L] || []) text = text.split(p.toLocaleLowerCase(L)).join(p);
    }
    if (!text) continue;
    out.push({ noun: n.noun, vocabKey: n.vocabKey, text, gender: l[2] || null });
  }
  return out;
}
function colorWord(L, color, gender) {
  const v = KF[L].colors[color];
  if (typeof v === 'string') return v;
  const g = gender === 'f' ? 'f' : gender === 'm' ? 'm' : null;
  if (!g || !v[g]) throw new Error(`two-kinds: no ${L} form of ${color} for gender "${gender}"`);
  return v[g];
}
/** the Dutch posture verb of a thing (liggen / staan / zitten) */
function verbOf(L, noun) {
  const V = KF[L].verbs;
  if (!V) return null;
  for (const [verb, list] of Object.entries(V)) if (list.split(' ').includes(noun)) return verb;
  throw new Error(`two-kinds: no ${L} verb for ${noun}`);
}
/** the frames of a language a thing may stand in */
function framesFor(L, noun) {
  const ok = PLACES[noun] || PLACES_DEFAULT;
  return KF[L].frames.filter((f) => ok.includes(f.t));
}
const dot = (color, px = 14) => `<span data-lcs-dot="${color}" style="display:inline-block;width:${px}px;height:${px}px;border-radius:50%;background:${HEX[color]};border:1.5px solid ${INK};box-sizing:border-box;vertical-align:-1px;margin-left:3px"></span>`;
/** a color word in a story, its dot after it */
const colorSpan = (word, color) => `<span data-lcs-c="${color}" style="white-space:nowrap">${word}${dot(color)}</span>`;

function makeTwoKindsType({ id, slug, gradeBand, i18n }) {
  return {
    id, slug, gradeBand,
    assetClass: 'icon-placement',
    exerciseType: 'word-problems',
    themeAxis: { applicable: true, minNouns: 4 },
    interactive: false,
    difficulty: LEVELS,
    i18n,
    THEMES,
    levelSetWords(m) { return ((m && m.problems) || []).map((p) => p.noun); },

    build(args, ctx) {
      const lv = Number(args.difficulty) || 2, d = LEVELS[lv] || LEVELS[2], rng = ctx.rng, L = loc2(args.locale), theme = args.theme;
      const F = KF[L];
      if (!F) throw new Error(`two-kinds: no frames for ${L}`);
      const mark = !!(ctx && ctx.answerKey);
      const things = thingsFor(theme, L);
      if (things.length < d.problems) throw new Error(`two-kinds: ${theme} has ${things.length} things in ${L}, ${d.problems} needed`);
      const picked = shuffle(things, rng).slice(0, d.problems);

      // the totals: all different; on level 2 a total of 10 (it leaves nothing white) on about one page in three
      const totals = shuffle(d.totals, rng).slice(0, d.problems);
      if (d.ten && rng.next() < d.ten) totals[rng.int(0, totals.length - 1)] = 10;
      // the two groups: each at least 2, at most one story with two equal groups
      let pairs;
      for (let t = 0; t < 50; t++) {
        pairs = totals.map((T) => { const n1 = rng.int(2, T - 2); return [n1, T - n1]; });
        if (pairs.filter(([a, b]) => a === b).length <= 1) break;
      }
      // the colors: two per story, from the colors the thing may have, no pair twice on a page
      const usedPairs = new Set();
      const colorPairs = picked.map((thing) => {
        const cs = THING_COLORS[thing.noun] || COLORS, opts = [];
        for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) if (!usedPairs.has([cs[i], cs[j]].sort().join('+'))) opts.push([cs[i], cs[j]]);
        if (!opts.length) throw new Error('two-kinds: no color pair left for ' + thing.noun);
        const p = rng.pick(opts);
        usedPairs.add(p.slice().sort().join('+'));
        return rng.int(0, 1) ? p : [p[1], p[0]];
      });
      // the frames: each story a frame its thing may stand in, a frame not used yet on the page where there is one
      const usedFrames = new Set();
      const frameOf = picked.map((thing) => {
        const ok = framesFor(L, thing.noun);
        if (!ok.length) throw new Error(`two-kinds: no ${L} frame for ${thing.noun}`);
        const fresh = ok.filter((f) => !usedFrames.has(f.t));
        const f = rng.pick(fresh.length ? fresh : ok);
        usedFrames.add(f.t);
        return f;
      });
      const names = shuffle(W.namesFor(L), rng);
      const [w1, w2] = F.eq || ['+', '='];

      const box = (v, color) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;flex:0 0 auto">` +
        `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;align-items:center;justify-content:center;width:52px;height:40px;box-sizing:border-box;border:2.5px dashed ${CORAL};border-radius:10px;background:#FFFFFF">${mark ? `<span data-lcs-keytext style="font:700 28px/1 'Baloo 2',cursive;color:${CORAL}">${v}</span>` : ''}</span>` +
        (color ? dot(color, 12) : `<span style="display:inline-block;height:12px"></span>`) + `</span>`;
      const sign = (s) => (/^[+=]$/.test(s)
        ? `<span data-lcs-sign style="font:700 30px/1 'Baloo 2',cursive;color:${TEAL};margin-top:7px">${s}</span>`
        : `<span data-lcs-sign style="font:700 19px/1 'Nunito',sans-serif;color:${TEAL};margin-top:11px;white-space:nowrap">${s}</span>`);

      const problems = [];
      const cards = picked.map((thing, i) => {
        const [n1, n2] = pairs[i], [c1, c2] = colorPairs[i];
        const tpl = frameOf[i].s;
        const T1 = '\u0001', T2 = '\u0002', verb = verbOf(L, thing.noun);
        let src = tpl.replace('{c1}', T1).replace('{c2}', T2);
        if (/\{verb\}/.test(src)) { if (!verb) throw new Error('two-kinds: a {verb} frame without verbs in ' + L); src = src.replace(/\{verb\}/g, verb); }
        let text = W.fill(src, { name: names[i % names.length], name2: names[(i + 1) % names.length], n1, n2, noun: thing.text, gender: thing.gender }, L);
        if (text.split(T1).length !== 2 || text.split(T2).length !== 2) throw new Error('two-kinds: a frame without its two colors: ' + tpl);
        text = text.replace(T1, colorSpan(colorWord(L, c1, thing.gender), c1)).replace(T2, colorSpan(colorWord(L, c2, thing.gender), c2));
        problems.push({ noun: thing.noun, n1, n2, c1, c2, place: frameOf[i].t });
        let middle;
        if (d.draw) {
          const drawn = mark ? Array.from({ length: n1 + n2 }, (_, k) => `<span style="width:26px;height:26px;border-radius:50%;background:${HEX[k < n1 ? c1 : c2]};border:1.5px solid ${INK};box-sizing:border-box"></span>`).join('') : '';
          middle = `<div data-lcs-drawbox style="flex:1 1 auto;min-height:104px;display:flex;align-items:center;justify-content:center;gap:8px;border:2.5px dashed ${TEAL};border-radius:12px;background:#FFFFFF">${drawn}</div>`;
        } else {
          const img = fileUri(theme, thing.noun);
          const slot = (k) => {
            const col = mark && k < n1 + n2 ? HEX[k < n1 ? c1 : c2] : null;
            return `<span data-lcs-slot style="display:inline-flex;flex:0 0 auto;border-radius:8px;${k === 5 ? 'margin-left:14px;' : ''}${col ? `background:${col}` : ''}">` +
              `<img class="ws-icon" src="${img}" alt="" style="width:${d.icon}px;height:${d.icon}px;display:block${col ? ';mix-blend-mode:multiply' : ''}"></span>`;
          };
          middle = `<div data-lcs-row style="display:flex;justify-content:center;gap:${d.row > 8 ? 6 : 10}px">${Array.from({ length: d.row }, (_, k) => slot(k)).join('')}</div>`;
        }
        const eq = `<div data-lcs-eq="${w1}|${w2}" style="display:flex;align-items:flex-start;justify-content:center;gap:12px">${box(n1, c1)}${sign(w1)}${box(n2, c2)}${sign(w2)}${box(n1 + n2, null)}</div>`;
        return `<div class="ws-card-stage" style="flex-direction:column;align-items:stretch;justify-content:space-evenly;gap:5px;padding:4px 16px 7px" data-lcs-kinds="${[n1, n2, c1, c2, thing.noun, frameOf[i].t].join('|')}">` +
          `<p data-lcs-story style="margin:0;font:700 ${d.font}px/1.3 'Nunito',sans-serif;color:${INK}">${text}</p>${middle}${eq}</div>`;
      });
      const grid = cardGrid({ cards, cols: 1, rows: cards.length, numbered: true });
      return {
        bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-twokinds="${lv}|${d.row}|${L}">${grid}</div>`,
        meta: { problems },
      };
    },

    async verify(page) {
      return page.evaluate((EQ) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-twokinds]');
        if (!root) return ['no page'];
        const [lvS, rowS, L] = root.dataset.lcsTwokinds.split('|'), lv = +lvS, rowLen = +rowS;
        const rectOf = (e) => e.getBoundingClientRect();
        const cards = [...document.querySelectorAll('.ws-card')];
        if (cards.length !== (lv === 2 ? 4 : 3)) fails.push(cards.length + ' stories');
        const totals = [], nouns = [], colorPairs = [];
        let equal = 0;
        cards.forEach((c, i) => {
          const P = 'story ' + (i + 1), cb = rectOf(c);
          const st = c.querySelector('[data-lcs-kinds]');
          if (!st) { fails.push(P + ': no stamp'); return; }
          const [a, b, c1, c2, noun, place] = st.dataset.lcsKinds.split('|');
          const n1 = +a, n2 = +b, T = n1 + n2;
          totals.push(T); nouns.push(noun); colorPairs.push([c1, c2].sort().join('+'));
          if (n1 === n2) equal++;
          if (n1 < 2 || n2 < 2) fails.push(`${P}: a group of ${Math.min(n1, n2)}`);
          if (lv === 1 ? T < 4 || T > 6 : lv === 2 ? T < 5 || T > 10 : T < 6 || T > 10) fails.push(`${P}: a total of ${T} on level ${lv}`);
          if (c1 === c2) fails.push(`${P}: one color twice`);
          if (noun === 'butterfly' && place !== 'garden') fails.push(`${P}: a butterfly in the ${place}`);
          if (noun !== 'butterfly' && noun !== 'flower' && place === 'garden') fails.push(`${P}: ${noun} in the garden`);
          if (noun === 'flower' && (place === 'box' || c1 === 'green' || c2 === 'green')) fails.push(`${P}: a flower in a box or a green flower`);
          const story = c.querySelector('[data-lcs-story]');
          const txt = story.textContent;
          if (/[{}\u0001\u0002]/.test(txt)) fails.push(`${P}: a slot is left in the story`);
          // (page/shell.js frTypoHtml puts a no-break space before ? : ; ! in every French body: this guards that)
          if (L === 'fr' && / [?!:;]/.test(txt)) fails.push(`${P}: a breaking space before a question mark`);
          const nums = (txt.match(/\d+/g) || []).map(Number);
          if (nums.length !== 2 || nums[0] !== n1 || nums[1] !== n2) fails.push(`${P}: the story prints ${nums.join(',')}, not ${n1} and ${n2}`);
          const cs = [...story.querySelectorAll('[data-lcs-c]')].map((e) => e.dataset.lcsC);
          if (cs.join() !== [c1, c2].join()) fails.push(`${P}: the story's colors ${cs.join()} are not ${c1},${c2}`);
          if ([...story.querySelectorAll('[data-lcs-c]')].some((e) => !e.textContent.trim())) fails.push(`${P}: a color without its word`);
          if ([...story.querySelectorAll('[data-lcs-c]')].some((e) => { const dt = e.querySelector('[data-lcs-dot]'); return !dt || dt.dataset.lcsDot !== e.dataset.lcsC; })) fails.push(`${P}: a color word without its own dot`);
          const lh = parseFloat(getComputedStyle(story).lineHeight);
          if (rectOf(story).height > lh * 3 + 2) fails.push(`${P}: the story runs over three lines`);
          const row = c.querySelector('[data-lcs-row]'), draw = c.querySelector('[data-lcs-drawbox]');
          if (lv === 3) {
            if (row || !draw) fails.push(`${P}: the harder page draws, it has no pictures`);
            else if (rectOf(draw).height < 100) fails.push(`${P}: the box to draw in is ${Math.round(rectOf(draw).height)} px, under 3 cm`);
          } else {
            if (!row || draw) { fails.push(`${P}: no row of pictures`); }
            else {
              const imgs = [...row.querySelectorAll('img')];
              if (imgs.length !== rowLen) fails.push(`${P}: ${imgs.length} pictures, ${rowLen} expected`);
              if (T > imgs.length) fails.push(`${P}: ${T} things and only ${imgs.length} pictures`);
              if (new Set(imgs.map((m) => m.getAttribute('src'))).size !== 1) fails.push(`${P}: the row mixes pictures`);
              if (imgs.some((m) => !m.complete || !m.naturalWidth)) fails.push(`${P}: a picture did not load`);
              const tops = new Set(imgs.map((m) => Math.round(rectOf(m).top)));
              if (tops.size !== 1) fails.push(`${P}: the row breaks onto two lines`);
              if (imgs.length > 5) { const r = imgs.map(rectOf), gap = (k) => r[k].left - r[k - 1].right; if (!(gap(5) >= gap(1) + 6)) fails.push(`${P}: the row is not split after the fifth picture`); }
            }
          }
          const eq = c.querySelector('[data-lcs-eq]');
          const boxes = eq ? eq.querySelectorAll('.ws-answerbox') : [];
          if (boxes.length !== 3) fails.push(`${P}: ${boxes.length} boxes in the frame`);
          const eqDots = eq ? [...eq.querySelectorAll('[data-lcs-dot]')].map((e) => e.dataset.lcsDot) : [];
          if (eqDots.join() !== [c1, c2].join()) fails.push(`${P}: the dots under the frame are ${eqDots.join()}`);
          const want = EQ[L] || ['+', '='];
          const signs = eq ? [...eq.querySelectorAll('[data-lcs-sign]')].map((e) => e.textContent) : [];
          if (signs.join('|') !== want.join('|')) fails.push(`${P}: the frame reads ${signs.join(' _ ')}, not ${want.join(' _ ')}`);
          c.querySelectorAll('img, .ws-answerbox, [data-lcs-drawbox], [data-lcs-story], [data-lcs-sign]').forEach((e) => { const r = rectOf(e); if (r.width && (r.left < cb.left - 0.5 || r.right > cb.right + 0.5 || r.top < cb.top - 0.5 || r.bottom > cb.bottom + 0.5)) fails.push(`${P}: something leaves the card`); });
        });
        if (new Set(totals).size !== totals.length) fails.push('two stories have the same total: ' + totals.join(','));
        if (lv > 1 && !totals.some((t) => t >= 8)) fails.push('no total of 8 or more on the page');
        if (new Set(nouns).size !== nouns.length) fails.push('one thing in two stories');
        if (new Set(colorPairs).size !== colorPairs.length) fails.push('two stories use the same two colors');
        if (equal > 1) fails.push(equal + ' stories with two equal groups');
        return fails;
      }, Object.fromEntries(Object.entries(KF).filter(([k, v]) => k !== '$comment' && v.eq).map(([k, v]) => [k, v.eq])));
    },
  };
}

module.exports = { makeTwoKindsType, thingsFor, colorWord, framesFor, THINGS, THEMES, LEVELS, HEX, PLACES, THING_COLORS };
