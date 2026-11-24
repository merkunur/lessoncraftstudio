/**
 * dk-g2-health.js — the health modes of the Batch 2 Grade 2 pages (Daily Teaching System Stage D-5, 2026-11-24),
 * registered in the MODES table of types/_shared/dk-g2.js (the kit, the type maker and the page checks live there):
 *   G2-605 g2-wellness       Healthy in Three Ways            (healthy-habits, NHES.1.2.2)
 *   G2-606 g2-influence      Who Helps Me Choose?             (healthy-habits, NHES.2.2.1)
 *   G2-607 g2-ads            Ad Detective                     (healthy-habits, NHES.2.2.2)
 *   G2-608 g2-goal           My Health Goal and My Helper     (healthy-habits, NHES.6.2.2)
 *   G2-609 g2-care           When to See the Nurse, Doctor or Dentist (healthy-habits, NHES.1.2.7)
 *   G2-610 g2-lookback       How Did My Goal Go?              (healthy-habits, NHES.6.2.6)
 *   G2-611 g2-safety         Stop, Think, Choose              (healthy-habits, NHES.5.2.3)
 *   G2-612 g2-weather-ready  Ready for Sun, Heat and Cold     (healthy-habits, NHES.1.2.6)
 *   G2-613 g2-poster         Our Health Poster                (healthy-habits, NHES.8.2.3)
 * The drawn people are the faceless figures of Batch K2 (dk-k2.js `fig`): a child in INK, a friend in TEAL, a grown-up
 * drawn tall in grey. The goal page uses only the healthy-habits pictograms (never beside library art). The ads are
 * invented (no real brand).
 */
'use strict';
const G2 = require('./dk-g2.js');
const G1 = require('./dk-g1.js');
const K2 = require('./dk-k2.js');
const DK = require('./dk-kinder.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { habitFigure, habitTool } = require('../../primitives/habit-pictogram.js');
const thermometer = require('../../primitives/thermometer.js');
const B = require('../../data/science/dk-g2.js');

const { pic, box, tile, drawBox, labelledDraw, chip, word, small, text, head, col, row, grow, svg, art, band, whiteBand, arrow, lineBox, frameLine, frameTile, numBox, sunToColor, starPath, esc, f1, W, T, DOT } = G1.kit;
const { itemArt, cut, cutHead } = G2;
const MODES = G2.MODES;
const { placesFor, patterned, derange } = DK;

/* ================================================================ the drawn scenes (viewBox 0 0 120 100, ground y 96) */
const img = (p, x, y, w, h) => `<image href="${fileUri(p.theme, p.noun)}" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" preserveAspectRatio="xMidYMid meet" data-dk-pic="${esc(p.theme + '/' + p.noun)}"/>`;
const ground = `<line x1="2" y1="96" x2="118" y2="96" stroke="${T.grid}" stroke-width="2.5"/>`;
function say(x, y, words, w, tailX, fs = 12) {
  return `<g data-g2-say="${esc(words)}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="20" rx="9" fill="#FFFFFF" stroke="${T.teal}" stroke-width="1.8"/>` +
    `<path d="M${f1(tailX - 4)} ${f1(y + 19)} L${f1(tailX)} ${f1(y + 27)} L${f1(tailX + 5)} ${f1(y + 19)}" fill="#FFFFFF" stroke="${T.teal}" stroke-width="1.8" stroke-linejoin="round"/><line x1="${f1(tailX - 3)}" y1="${f1(y + 19)}" x2="${f1(tailX + 4)}" y2="${f1(y + 19)}" stroke="#FFFFFF" stroke-width="2.6"/>` +
    `<text x="${f1(x + w / 2)}" y="${f1(y + 14)}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="${fs}" fill="${T.ink}" textLength="${f1(Math.min(w - 8, words.length * fs * 0.5))}" lengthAdjust="spacingAndGlyphs">${esc(words)}</text></g>`;
}
const kid = (o) => K2.fig({ s: 0.62, y: 96, who: 'child', ...o });
const grown = (o) => K2.fig({ s: 0.86, y: 96, color: T.inkSoft, who: 'grown-up', ...o });
/** a bike helmet on a head at (cx, cy) (head radius r), facing right: a dome with three air vents, a visor at the front and a
 *  chin strap (review round 1: the plain half-dome read as an umbrella, a parachute or a jellyfish) */
const helmet = (cx, cy, r, attrs = '', strap = T.ink) => `<g data-g2-helmet="1"${attrs ? ' ' + attrs : ''}>` +
  `<path d="M${f1(cx - r * 0.6)} ${f1(cy + r * 0.1)} L${f1(cx)} ${f1(cy + r * 1.1)} L${f1(cx + r * 0.7)} ${f1(cy + r * 0.1)}" fill="none" stroke="${strap}" stroke-width="${f1(Math.max(1.4, r * 0.09))}" data-g2-strap="1"/>` +
  `<path d="M${f1(cx - r * 1.25)} ${f1(cy + r * 0.1)} Q${f1(cx - r * 1.2)} ${f1(cy - r * 1.45)} ${f1(cx)} ${f1(cy - r * 1.45)} Q${f1(cx + r * 1.3)} ${f1(cy - r * 1.4)} ${f1(cx + r * 1.35)} ${f1(cy + r * 0.1)} Z" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.5"/>` +
  `<path d="M${f1(cx + r * 1.3)} ${f1(cy - r * 0.15)} L${f1(cx + r * 1.85)} ${f1(cy + r * 0.05)} L${f1(cx + r * 1.35)} ${f1(cy + r * 0.25)} Z" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.3" stroke-linejoin="round" data-g2-visor="1"/>` +
  [-0.62, 0, 0.62].map((t) => `<ellipse cx="${f1(cx + t * r * 0.85)}" cy="${f1(cy - r * (1.0 - Math.abs(t) * 0.25))}" rx="${f1(r * 0.12)}" ry="${f1(r * 0.3)}" transform="rotate(${f1(t * 48)} ${f1(cx + t * r * 0.85)} ${f1(cy - r * (1.0 - Math.abs(t) * 0.25))})" fill="#FFFFFF" stroke="${T.ink}" stroke-width="${f1(Math.min(1.2, r * 0.1))}" data-g2-vent="1"/>`).join('') + '</g>';
/** the head centre of a K2 figure (feet x, scale s, facing dir) */
const headOf = (x, s, dir = 1, hip = 58) => [x + dir * s * 0, 96 + s * (15 + (hip - 58) - 95)];
const SCENE = {
  // ---- wellness
  sleep: () => `<rect x="10" y="62" width="100" height="22" rx="3" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/><rect x="10" y="50" width="8" height="46" fill="${T.teal}"/><rect x="102" y="56" width="8" height="40" fill="${T.teal}"/>` +
    `<rect x="18" y="54" width="22" height="10" rx="4" fill="#FFFFFF" stroke="${T.teal}" stroke-width="1.5"/><circle cx="30" cy="52" r="7" fill="${T.ink}" data-k2-head="1"/><path d="M36 56 L100 56 L100 64 L36 64 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.5" data-g2-blanket="1"/>` +
    `<text x="46" y="36" font-family="Baloo 2" font-weight="700" font-size="16" fill="${T.teal}">Z</text><text x="58" y="26" font-family="Baloo 2" font-weight="700" font-size="12" fill="${T.teal}">z</text>`,
  apple: () => { const f = kid({ x: 46, near: [12, 6, 22, -4] }); return ground + f.svg + img({ theme: 'fruits', noun: 'apple' }, 52, 50, 18, 18); },
  running: () => { const f = kid({ x: 60, legs: 'walk', lean: 14, near: [6, 14, 16, 10], far: [-8, 14, -16, 8] }); return ground + f.svg + `<path d="M20 60 H36 M16 70 H34 M22 80 H38" stroke="${T.inkSoft}" stroke-width="2.5" stroke-linecap="round"/>`; },
  breath: () => { const f = kid({ x: 54 }); const [hx, hy] = f.at(60, 18); return ground + f.svg + `<path d="M${f1(hx + 4)} ${f1(hy)} q8 -4 14 0 q6 4 12 0 M${f1(hx + 6)} ${f1(hy + 8)} q8 -4 14 0 q6 4 12 0" fill="none" stroke="${T.teal}" stroke-width="2" stroke-linecap="round" data-g2-breath="1"/>`; },
  worry: () => { const c = kid({ x: 34 }); const g = grown({ x: 88, dir: -1 }); return ground + g.svg + c.svg + say(4, 4, 'I feel worried.', 72, 34); },
  drawing: () => { const f = kid({ x: 40, near: [10, 8, 22, 4] }); return ground + f.svg + `<rect x="58" y="44" width="34" height="28" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1.8"/><circle cx="75" cy="58" r="8" fill="none" stroke="${T.coral}" stroke-width="1.8"/><path d="M71 60 q4 4 8 0" fill="none" stroke="${T.coral}" stroke-width="1.6"/><circle cx="72" cy="56" r="1" fill="${T.coral}"/><circle cx="78" cy="56" r="1" fill="${T.coral}"/>`; },
  sharing: () => { const a = kid({ x: 30, near: [12, 6, 24, 6] }); const b = kid({ x: 90, dir: -1, color: T.teal, who: 'friend', near: [12, 6, 24, 6] }); return ground + a.svg + b.svg + img({ theme: 'toys', noun: 'crayons' }, 48, 52, 24, 20); },
  inviting: () => { const a0 = kid({ x: 32 }); const a = kid({ x: 32, near: a0.reach(52, 62, 2) }); const b = kid({ x: 92, dir: -1, color: T.teal, who: 'friend' }); return ground + a.svg + img({ theme: 'toys', noun: 'ball' }, 47, 55, 15, 15) + b.svg + say(2, 4, 'Do you want to play?', 92, 34, 11); },
  turns: () => { const a = kid({ x: 30, near: [12, 10, 22, 14] }); const b = kid({ x: 90, dir: -1, color: T.teal, who: 'friend' }); return ground + `<rect x="44" y="72" width="32" height="6" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="1.5"/>` + a.svg + b.svg + img({ theme: 'toys', noun: 'dice' }, 52, 56, 16, 16) + say(66, 6, 'Your turn!', 50, 90); },
  // ---- the three parts' headers
  body: () => { const f = kid({ x: 60, s: 0.8, near: [4, 14, 14, 22], far: [-4, 14, -12, 22] }); return ground + f.svg; },
  heart: () => `<path d="M60 88 C 24 64 14 46 14 32 C 14 18 26 10 38 10 C 48 10 56 18 60 26 C 64 18 72 10 82 10 C 94 10 106 18 106 32 C 106 46 96 64 60 88 Z" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="3"/>`,
  friends: () => { const a = kid({ x: 40, s: 0.74 }); const p = a.at(53, 31); const b0 = K2.fig({ s: 0.74, y: 96, x: 80, dir: -1 }); const meet = [60, p[1] + 16]; const A = kid({ x: 40, s: 0.74, near: a.reach(meet[0], meet[1], 2) }); const Bf = kid({ x: 80, s: 0.74, dir: -1, color: T.teal, who: 'friend', near: b0.reach(meet[0], meet[1], 2) }); return ground + A.svg + Bf.svg; },
  family: () => { const g = grown({ x: 40 }); const c0 = K2.fig({ s: 0.6, y: 96, x: 76, dir: -1 }); const gh = g.at(53, 31); const meet = [58, 70]; const G = grown({ x: 40, near: K2.fig({ s: 0.86, y: 96, x: 40 }).reach(meet[0], meet[1], 2) }); const C = kid({ x: 76, s: 0.6, dir: -1, near: c0.reach(meet[0], meet[1], 2) }); return ground + G.svg + C.svg; },
  'late-show': () => img({ theme: 'around the house', noun: 'television' }, 20, 30, 64, 64) + `<path d="M98 14 a12 12 0 1 0 8 20 a9 9 0 1 1 -8 -20 Z" fill="${T.cream}" stroke="${T.teal}" stroke-width="2"/>` + `<circle cx="88" cy="40" r="1.6" fill="${T.teal}"/><circle cx="108" cy="46" r="1.6" fill="${T.teal}"/>`,
  helmet: () => { const f = K2.fig({ x: 52, y: 230, s: 2.3, legs: 'none', who: 'child' }); const [hx, hy] = f.at(52, 15); return f.svg + helmet(hx, hy, 23, '', T.creamDeep); },
  // ---- review round 1: the coach is a GROWN-UP (the library coach is a child, Batch K): a cap, a whistle on a cord, a clipboard
  coach: () => { const g0 = K2.fig({ s: 1.02, y: 98, x: 46, color: T.inkSoft, who: 'grown-up' }); const G = K2.fig({ s: 1.02, y: 98, x: 46, color: T.inkSoft, who: 'grown-up', near: g0.reach(74, 60, 4) }); const [hx, hy] = G.at(52, 15);
    return ground + G.svg + `<path d="M${f1(hx - 10.5)} ${f1(hy - 1)} Q${f1(hx - 10)} ${f1(hy - 12)} ${f1(hx)} ${f1(hy - 12)} Q${f1(hx + 10.5)} ${f1(hy - 11)} ${f1(hx + 10.5)} ${f1(hy - 1)} Z" fill="${T.teal}" stroke="${T.ink}" stroke-width="1.3" data-g2-cap="1"/><path d="M${f1(hx + 9)} ${f1(hy - 3)} L${f1(hx + 20)} ${f1(hy - 1)} L${f1(hx + 9)} ${f1(hy + 1)} Z" fill="${T.teal}" stroke="${T.ink}" stroke-width="1.2" stroke-linejoin="round"/>` +
      `<path d="M${f1(hx - 4)} ${f1(hy + 10)} L${f1(hx + 1)} ${f1(hy + 26)} L${f1(hx + 5)} ${f1(hy + 10)}" fill="none" stroke="#FFFFFF" stroke-width="1.6"/><rect x="${f1(hx - 3)}" y="${f1(hy + 25)}" width="9" height="5" rx="2" fill="${T.grid}" stroke="${T.ink}" stroke-width="1.2" data-g2-whistle="1"/>` +
      `<g data-g2-clipboard="1"><rect x="68" y="50" width="20" height="26" rx="2" fill="${T.cream}" stroke="${T.ink}" stroke-width="1.6"/><rect x="73" y="47" width="10" height="5" rx="1" fill="${T.grid}" stroke="${T.ink}" stroke-width="1.2"/><path d="M71 58 H85 M71 63 H85 M71 68 H81" stroke="${T.inkSoft}" stroke-width="1.4"/></g>`; },
  'cereal-toy': () => `<path d="M54 8 L64 2 L64 88 L54 94 Z" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.2" stroke-linejoin="round" data-g2-boxside="1"/><path d="M6 8 L16 2 L64 2 L54 8 Z" fill="${T.coralSoft}" stroke="${T.teal}" stroke-width="2.2" stroke-linejoin="round"/>` +
    `<rect x="6" y="8" width="48" height="86" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5"/><rect x="6" y="8" width="48" height="20" fill="${T.coral}" stroke="${T.teal}" stroke-width="2"/>` +
    `<g data-g2-bowl="1">` + [[18, 50], [26, 47], [34, 49], [42, 47], [22, 54], [38, 54], [30, 53]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${T.creamDeep}" stroke="${T.coral}" stroke-width="1.6"/>`).join('') +
    `<path d="M12 56 L48 56 Q46 74 30 74 Q14 74 12 56 Z" fill="${T.teal}" stroke="${T.ink}" stroke-width="1.6"/></g>` +
    `<path d="${Array.from({ length: 16 }, (_, k) => { const a = k * Math.PI / 8, r = k % 2 ? 22 : 33; return (k ? 'L' : 'M') + f1(86 + Math.cos(a) * r) + ' ' + f1(62 + Math.sin(a) * r); }).join(' ')} Z" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="2" data-g2-prize="1"/>` + img({ theme: 'toys', noun: 'car' }, 59, 41, 54, 42) + '<g data-g2-toy="car"></g>',
  sleepy: () => { const f0 = kid({ x: 50, s: 0.78 }); const [mx, my] = f0.at(60, 20); const f = kid({ x: 50, s: 0.78, lean: 10, near: f0.reach(mx + 2, my + 1, 6) });
    return ground + f.svg + `<g data-g2-zz="1"><text x="70" y="30" font-family="Baloo 2" font-weight="700" font-size="20" fill="${T.teal}">Z</text><text x="86" y="18" font-family="Baloo 2" font-weight="700" font-size="15" fill="${T.teal}">z</text><text x="98" y="10" font-family="Baloo 2" font-weight="700" font-size="11" fill="${T.teal}">z</text></g>`; },
  // ---- the dentist (a grown-up, front view, in a white coat, a tooth sign over the shoulder)
  dentist: () => `<circle cx="60" cy="30" r="13" fill="${T.inkSoft}" data-g2-dhead="1"/><path d="M34 98 L38 56 Q42 46 60 45 Q78 46 82 56 L86 98 Z" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2" data-g2-coat="1"/><path d="M54 46 L60 58 L66 46" fill="${T.tealSoft}" stroke="${T.ink}" stroke-width="1.5"/>` +
    `<path d="M82 60 L96 46" stroke="${T.ink}" stroke-width="2.5"/><circle cx="97" cy="44" r="4" fill="${T.grid}" stroke="${T.ink}" stroke-width="1.5" data-g2-mirror="1"/>` + img({ theme: 'body parts', noun: 'tooth' }, 6, 6, 26, 30),
  // ---- stop, think, choose
  'bike-helmet-on': () => { const f = kid({ x: 30, s: 0.66 }); const [hx, hy] = f.at(52, 15); return ground + img({ theme: 'vehicles', noun: 'bicycle' }, 48, 52, 70, 46) + f.svg + helmet(hx, hy, 7); },
  'bike-helmet-off': () => { const f = kid({ x: 30, s: 0.66 }); return ground + img({ theme: 'vehicles', noun: 'bicycle' }, 48, 52, 70, 46) + f.svg + helmet(96, 58, 7, 'data-g2-onbars="1"'); },
  'pool-watched': () => { const f = kid({ x: 18, s: 0.6 }); const g = grown({ x: 104, dir: -1, s: 0.8 }); return ground + img({ theme: 'summer', noun: 'pool' }, 26, 54, 64, 44) + f.svg + g.svg; },
  'pool-alone': () => { const f = kid({ x: 18, s: 0.6 }); return ground + img({ theme: 'summer', noun: 'pool' }, 26, 54, 64, 44) + f.svg; },
  'boat-jacket': () => SCENE.boat(true),
  'boat-no-jacket': () => SCENE.boat(false),
  boat: (jacket) => { const s = 1.15, x = 54, y = 88; const f = K2.fig({ s, y, x, hip: 'sit', legs: 'none', who: 'child' });   // the legs are inside the boat
    const vest = `<g transform="translate(${x} ${y}) scale(${s} ${s}) translate(-52 -95)" data-g2-lifejacket="1"><path d="M40 60 Q40 53 46 53 L48 53 L52 64 L56 53 L58 53 Q64 53 64 60 L64 80 Q64 82 62 82 L42 82 Q40 82 40 80 Z" fill="${T.coral}" stroke="${T.ink}" stroke-width="1.6" stroke-linejoin="round"/>` +
      `<path d="M40.8 70 H63.2 M40.8 76.5 H63.2" stroke="${T.ink}" stroke-width="1.8"/>` + [70, 76.5].map((yy) => `<rect x="49" y="${yy - 2.6}" width="6" height="5.2" rx="1" fill="${T.creamDeep}" stroke="${T.ink}" stroke-width="1.1" data-g2-buckle="1"/>`).join('') + '</g>';
    return `<rect x="0" y="86" width="120" height="14" fill="${T.tealSoft}"/><path d="M2 86 q8 -5 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="${T.teal}" stroke-width="2"/>` +
      f.svg + (jacket ? vest : '') + `<path d="M12 74 L108 74 L96 92 L24 92 Z" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/>`; },
  'scooter-sidewalk': () => SCENE.scooter(false),
  'scooter-street': () => SCENE.scooter(true),
  scooter: (street) => { const f = kid({ x: 54, s: 0.6, y: 84, near: [8, 12, 16, 6] }); const [hx, hy] = f.at(52, 15);
    const deck = `<line x1="40" y1="88" x2="74" y2="88" stroke="${T.ink}" stroke-width="3"/><line x1="72" y1="88" x2="68" y2="56" stroke="${T.ink}" stroke-width="2.5"/><line x1="62" y1="56" x2="74" y2="56" stroke="${T.ink}" stroke-width="2.5"/><circle cx="42" cy="92" r="4" fill="${T.ink}"/><circle cx="72" cy="92" r="4" fill="${T.ink}"/>`;
    const scene = street ? `<rect x="0" y="72" width="120" height="28" fill="${T.grid}"/><path d="M4 86 H18 M30 86 H44 M56 86 H70 M82 86 H96 M108 86 H118" stroke="#FFFFFF" stroke-width="2"/>` + img({ theme: 'vehicles', noun: 'car' }, 84, 52, 34, 26)
      : `<rect x="0" y="80" width="120" height="20" fill="${T.creamDeep}" stroke="${T.grid}" stroke-width="1.5"/><path d="M30 80 V100 M60 80 V100 M90 80 V100" stroke="${T.grid}" stroke-width="1.5"/><rect x="0" y="72" width="120" height="8" fill="${T.tealSoft}"/>`;
    return scene + deck + f.svg + helmet(hx, hy, 6.5); },
  // ---- weather
  cloudy: () => `<rect x="0" y="0" width="120" height="100" fill="#FFFFFF"/><path d="M24 46 Q22 28 40 28 Q48 14 64 20 Q78 12 88 26 Q104 26 102 42 Q106 54 92 54 L30 54 Q18 54 24 46 Z" fill="${T.grid}" stroke="${T.inkSoft}" stroke-width="2.5" data-g2-cloud="1"/>` +
    `<line x1="2" y1="88" x2="118" y2="88" stroke="${T.teal}" stroke-width="2"/>` + img({ theme: 'spring', noun: 'flower' }, 20, 62, 24, 26) + img({ theme: 'spring', noun: 'flower' }, 76, 62, 24, 26),
};
function scene(kind, w, h) {
  if (!SCENE[kind]) throw new Error('dk-g2-health: no scene ' + kind);
  return svg(w, h, SCENE[kind](), `data-g2-scene="${kind}"`, '0 0 120 100').replace('style="display:block;overflow:visible"', 'style="display:block;overflow:hidden"');
}
const itemOrScene = (x, px) => (x.pic ? pic(x.pic, px) : art(scene(x.draw, px * 1.2, px)));

/* ---------------------------------------------------------------- G2-605 healthy in body, feelings and friendships */
MODES['g2-wellness'] = function wellness(d, rng) {
  const parts3 = ['body', 'feelings', 'friendships'];
  const per = d.cards === 6 ? 2 : 3;
  const pick = [].concat(...parts3.map((p) => rng.sample(B.WELL_CARDS.filter((c) => c.part === p), per)));
  let order;
  for (let t = 0; t < 400; t++) { order = rng.shuffle(pick); if (!order.some((c, i) => i && c.part === order[i - 1].part)) break; }
  const cols3 = rng.shuffle(parts3);
  const colW = (W - 24) / 3, binH = d.write ? 250 : d.cards === 6 ? 330 : 360;
  const heads = { body: 'body', feelings: 'heart', friendships: 'friends' };
  const bins = row(cols3.map((p) => box('dk-draw', colW, binH, `<div style="position:absolute;left:0;right:0;top:4px;display:flex;flex-direction:column;align-items:center">${art(scene(heads[p], 96, 80))}<span class="dk-head" style="font-size:17px">${B.WELL_PARTS[p]}</span></div>` +
    (d.write ? `<div style="position:absolute;left:8px;right:8px;bottom:6px">${lineBox(colW - 20, 44)}</div>` : ''), `data-g2-bin="${p}"`)).join(''), 12);
  const cw = d.cards === 6 ? 150 : 132, ch = d.cards === 6 ? 150 : 140, rowsN = d.cards === 6 ? 3 : 5;
  const strip = col(cutHead() + [order.slice(0, rowsN), order.slice(rowsN)].filter((r) => r.length).map((r) => row(r.map((c) => cut(cw, ch, col(art(scene(c.id, cw - 14, (cw - 14) * 100 / 120)) + small(c.label, cw - 8), 0), `data-g2-card="${c.id}" data-dk-answer="${c.part}"`)).join(''), 0)).join(''), 0);
  const parts = [bins, strip];
  if (d.write) parts.splice(1, 0, whiteBand(text('Write one more thing you do under each part.', 'font-size:15px'), 'data-g2-tip="1"', 'padding:4px 0'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { cards: order.map((c) => c.part + ':' + c.id), bins: cols3 } };
};

/* ---------------------------------------------------------------- G2-606 who and what influences my choices */
MODES['g2-influence'] = function influence(d, rng) {
  const inf = rng.shuffle(B.INFLUENCES);
  const bubble = (x) => box('dk-tile dk-tile--white', 150, 96, row(itemOrScene(x, 58) + small(x.label, 70), 2), `data-g2-influence="${x.id}"`, 'border-radius:48px');
  const glue = (id) => box('dk-draw', 96, 96, '', `data-g2-glue="${id}"`);
  const side = (xs, left) => `<div style="display:flex;flex-direction:column;gap:10px">${xs.map((x) => row(left ? bubble(x) + glue(x.id) : glue(x.id) + bubble(x), 6)).join('')}</div>`;
  const me = box('dk-draw', 120, 120, `<span class="dk-head" style="position:absolute;left:0;right:0;top:42px;text-align:center">me</span>`, 'data-dk-prompt="me"', 'border-radius:50%');
  const web = row(side(inf.slice(0, 3), true) + `<div style="display:flex;align-items:center">${me}</div>` + side(inf.slice(3), false), 8, 'align-items:center');
  const choices = d.choices === 3 ? B.CHOICES.filter((c) => c.level1) : B.CHOICES.slice();
  const order = rng.shuffle(choices);
  const closed = false;   // review round 1: level 1 too can honestly have another helper ("my mom let me stay up")
  const strip = col(cutHead() + row(order.map((c) => cut(104, 104, col(itemOrScene(c, 56) + small(c.label, 98), 0), `data-g2-card="${c.id}"${closed ? ` data-dk-answer="${c.clue}"` : ''}`)).join(''), 0), 0);
  const parts = [whiteBand(web, 'data-g2-web="1"', 'padding:8px 0;flex:1 1 auto'), strip];
  parts.splice(1, 0, whiteBand(text('A choice can have more than one helper. Glue it next to the one that helped YOU most.', 'font-size:14px'), 'data-g2-tip="1"', 'padding:4px 0'));
  if (d.frame) parts.push(frameTile([['My own choice:', 300, '.'], [160, 'helped me choose it.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: !closed, influences: inf.map((x) => x.id), choices: order.map((c) => (closed ? c.clue + ':' : '') + c.id) } };
};

/* ---------------------------------------------------------------- G2-607 what does this ad want me to do? */
/** an ad's name, centred at x, one word a line from y (lines dy apart), marked for the page check that it stays inside its package */
const adName = (ad, x, y, fs, fill, dy = fs + 2, split = false) => `<g data-g2-adname="${esc(ad.name)}">` + (split ? ad.name.split(' ') : [ad.name]).map((wd, k) => `<text x="${x}" y="${f1(y + k * dy)}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="${fs}" fill="${fill}">${esc(wd)}</text>`).join('') + '</g>';
function adArt(ad, w, h) {
  let s = '';
  if (ad.id === 'cereal') {
    s = `<rect x="18" y="4" width="84" height="94" rx="4" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5" data-g2-package="1"/>` + adName(ad, 60, 22, 14, T.teal) +
      img(ad.art, 26, 26, 46, 52) + `<g data-g2-trick="prize"><circle cx="86" cy="58" r="16" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="2"/>` +
      `<text x="86" y="57" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="10" fill="${T.ink}">FREE</text><text x="86" y="67" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="10" fill="${T.ink}">TOY</text></g>` + img(ad.prize, 70, 76, 34, 20);
  } else if (ad.id === 'drink') {
    s = `<rect x="30" y="24" width="60" height="70" rx="7" fill="${T.grid}" stroke="${T.ink}" stroke-width="2" data-g2-package="1"/><rect x="30" y="24" width="60" height="8" rx="3" fill="${T.inkSoft}"/>` + adName(ad, 60, 56, 13, T.ink, 15, true) +
      `<text x="60" y="16" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="12" fill="${T.coral}" data-g2-trick="everybody">Everybody loves it!</text>` + [[24, 40], [96, 48], [20, 74], [100, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#FFFFFF" stroke="${T.inkSoft}" stroke-width="1.5"/>`).join('');
  } else {
    s = `<path d="M24 14 L96 14 L92 96 L28 96 Z" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round" data-g2-package="1"/><path d="M24 14 L28 6 L92 6 L96 14" fill="none" stroke="${T.teal}" stroke-width="2"/>` +
      adName(ad, 60, 29, 13, T.teal, 14, true) + img(ad.art, 32, 48, 56, 42);
  }
  return svg(w, h, s, `data-g2-ad="${ad.id}"`, '0 0 120 100');
}
MODES['g2-ads'] = function ads(d, rng) {
  const list = d.ads === 1 ? [B.ADS[0]] : rng.shuffle(B.ADS);
  const aw = d.ads === 1 ? 320 : 214, ah = d.ads === 1 ? 260 : (d.frame ? 130 : 160);
  const items = [];
  const card = (ad) => {
    const tricks = rng.shuffle(B.TRICKS);
    items.push(ad.id + ':' + tricks.map((t) => (ad.tricks.includes(t) ? '+' : '-') + t).join('|'));
    return box('dk-tile dk-tile--white', aw, 'auto', col(art(adArt(ad, ah * 1.2, ah)) + small(ad.what, aw - 10) +
      `<div class="dk-row" style="gap:4px;flex-wrap:wrap;width:${aw - 12}px" data-g2-tricks="${ad.id}">${tricks.map((t) => chip(t, `data-g2-trick-chip="${esc(t)}" data-dk-answer="${ad.tricks.includes(t) ? 'trick' : 'no'}"`, 'font-size:12px;padding:0 6px')).join('')}</div>` +
      small('Does the ad tell me if it is healthy?', aw - 10) + `<div class="dk-row" style="gap:8px" data-g2-healthy="${ad.id}">${chip('yes', 'data-dk-answer="no"')}${chip('no', 'data-dk-answer="right"')}</div>` +
      (d.frame ? col(small('It wants me to', aw - 10) + lineBox(aw - 20, 42), 0) : ''), 4), `data-g2-adcard="${ad.id}"`, 'padding:6px 4px');
  };
  const parts = [row(list.map(card).join(''), 10, 'align-items:flex-start')];
  parts.push(G2.growDraw(W - 40, d.ads === 1 ? 250 : d.frame ? 260 : 330, 'my ad for an everyday food', 'data-dk-prompt="my-ad"'));   // review round 3: the box takes the slack (the ad cards' height varies with how their chips wrap)
  return { html: grow(parts.join(''), 'gap:10px'), meta: { ads: items } };
};

/* ---------------------------------------------------------------- G2-608 my health goal and my helper (record) */
const sunStrip = (n, px) => `<div class="dk-row" style="gap:10px;flex-wrap:wrap;justify-content:center;width:600px" data-g2-suns="${n}">${Array.from({ length: n }, (_, k) => col(small('day ' + (k + 1), px + 10) + sunToColor(px), 0)).join('')}</div>`;
MODES['g2-goal'] = function goal(d) {
  const parts = [];
  if (d.circle) parts.push(whiteBand(col(text('My goal: circle one.', 'font-size:16px') + row(B.GOALS.map((g) => col(art(g.tool ? habitTool({ kind: g.tool, px: 104 }).svg : habitFigure({ pose: g.pose, px: 104 }).svg) + small(g.label, 140), 0, 'width:146px')).join(''), 8), 4), 'data-g2-goals="1"', 'padding:6px 0'));
  else parts.push(frameTile([['My goal is to', 440, '.']]));
  const steps = d.steps === 3 ? [['First I will', 440, '.'], ['Every day I will', 410, '.'], ['If I forget, I will', 410, '.']] : d.steps === 2 ? [['First I will', 440, '.'], ['Every day I will', 410, '.']] : [];
  if (steps.length) parts.push(frameTile(steps));
  if (d.reason) parts.push(frameTile([['My goal matters because', 400, '.']]));
  parts.push(col(labelledDraw(W - 40, d.circle ? 300 : d.reason ? 130 : 220, 'My helper: the grown-up who will help me', 'data-dk-prompt="helper"'), 0));
  parts.push(whiteBand(col(text('Color a sun each day you keep your goal.', 'font-size:16px') + sunStrip(14, 58), 4), 'data-g2-strip="1"', 'padding:6px 0'));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G2-609 when to see the nurse, doctor or dentist */
MODES['g2-care'] = function care(d, rng) {
  const S = B.CARE_CARDS.filter((c) => c.go === 'see' && !c.checkup), H = B.CARE_CARDS.filter((c) => c.go === 'home');
  const pick = d.cards === 4 ? [...rng.sample(S, 2), ...H] : B.CARE_CARDS.slice();
  let order;
  for (let t = 0; t < 400; t++) { order = rng.shuffle(pick); if (!patterned(order.map((c) => c.go === 'see'))) break; }
  const ch = d.cards === 4 ? 128 : d.frame ? 64 : 74;
  const cards = order.map((c) => row(tile(row(itemOrScene(c, Math.min(ch - 14, 90)) + `<div style="width:140px">${small(c.label, 138)}</div>`, 6), 260, ch, `data-g2-care="${c.id}" data-dk-answer="${c.go}"${c.checkup ? ' data-g2-checkup="1"' : ''}`, 'white') + DOT(), 8)).join('');
  const dest = (go) => {
    const inner = go === 'see'
      ? col(row(pic(B.CARE_HELPERS[0], 70) + pic(B.CARE_HELPERS[1], 70), 8) + word('see the nurse, doctor or dentist', 'font-size:15px;white-space:normal;width:200px'), 4)
      : col(pic({ theme: 'miscellaneous', noun: 'house' }, 72) + word('a grown-up at home can help', 'font-size:15px;white-space:normal;width:200px'), 4);
    return row(DOT() + tile(inner, 240, 180, `data-g2-dest="${go}"`, 'lead'), 8);
  };
  const destOrder = rng.int(0, 1) ? ['see', 'home'] : ['home', 'see'];
  const match = whiteBand(row(`<div style="display:flex;flex-direction:column;gap:6px">${cards}</div><div style="width:40px"></div><div style="display:flex;flex-direction:column;justify-content:space-around;align-self:stretch;gap:20px">${destOrder.map(dest).join('')}</div>`, 0, 'align-items:flex-start'), 'data-g2-match="1"', 'padding:6px 0;flex:1 1 auto');
  const parts = [whiteBand(text('If you feel sick at school, tell your teacher.', 'font-size:16px'), 'data-g2-school="1"', 'padding:4px 0'), match];
  if (d.cards === 8) parts.push(whiteBand(text('Checkups keep us well even when we are not sick. Circle the two checkups.', 'font-size:15px'), 'data-g2-tip="1"', 'padding:4px 0'));
  if (d.frame) parts.push(frameTile([['If I had', 230, ', I would tell', 150, 'first.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { cards: order.map((c) => c.go + ':' + c.id), dest: destOrder } };
};

/* ---------------------------------------------------------------- G2-610 how did my goal go? (record) */
MODES['g2-lookback'] = function lookback(d) {
  const parts = [whiteBand(row(text('I kept my goal on') + numBox(70, 50) + text('of 14 days.'), 10), 'data-g2-count="1"', 'padding:10px 0')];
  parts.push(whiteBand(col(text('How did it go? Circle one.', 'font-size:16px') + row(B.HOW_IT_WENT.map((h) => col(pic(h.pic, d.both ? 90 : 120) + word(h.label), 2)).join(''), 40), 6), 'data-g2-faces="1"', 'padding:6px 0'));
  if (d.one) parts.push(frameTile([['What helped me was', 400, '.']]));
  if (d.both) parts.push(frameTile([['Something that got in the way was', 290, '.'], ['Next I will', 470, '.']]));
  parts.push(whiteBand(row(text('Now I will:') + ['keep my goal', 'change my goal', 'choose a new goal'].map((x) => chip(x)).join(''), 10), 'data-g2-next="1"', 'padding:8px 0'));
  if (d.both) parts.push(frameTile([['My new or changed goal:', 380, '.']]));
  else parts.push(col(labelledDraw(W - 40, d.one ? 200 : 260, 'me keeping my goal', 'data-dk-prompt="me"'), 0));
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G2-611 stop, think, choose */
MODES['g2-safety'] = function safety(d, rng) {
  const pairs = d.pairs === 2 ? rng.sample(B.SAFETY_PAIRS.filter((p) => p.id === 'helmet' || p.id === 'boat'), 2) : rng.shuffle(B.SAFETY_PAIRS);
  const at = placesFor(pairs.length, 2, rng);
  const sw = d.pairs === 2 ? 316 : 190, sh = d.pairs === 2 ? 286 : (d.rule ? 80 : 118);
  const rows = pairs.map((p, i) => {
    const cards = [p.safe, p.risky].map((c) => ({ ...c, safe: c === p.safe })); if (at[i] === 1) cards.reverse();
    const cardEls = cards.map((c) => tile(col(art(scene(c.draw, Math.min(sh - 4, (sw - 14) / 1.2) * 1.2, Math.min(sh - 4, (sw - 14) / 1.2))) + small(c.label, sw - 14), 0), sw, sh + 34, `data-g2-pcard="${c.draw}" data-dk-answer="${c.safe ? 'safe' : 'no'}"`, 'white')).join('');
    return box('dk-tile', W, 'auto', row(`<div class="dk-row" style="gap:10px" data-g2-pairone="${p.id}">${cardEls}</div>` + (d.pairs > 2 ? col(small('What could happen?', 170) + lineBox(170, 42) + (d.rule ? '' : lineBox(170, 42)), 0) : ''), 12), `data-g2-pair="${p.id}"`, 'padding:2px 8px');
  });
  const parts = [whiteBand(row(['Stop.', 'Think.', 'Choose.'].map((x) => `<span class="dk-head" style="font-size:22px">${x}</span>`).join(''), 30), 'data-g2-stc="1"', 'padding:4px 0'), grow(rows.join(''), 'gap:8px')];
  if (d.rule) {
    parts.push(whiteBand(row(text('Word bank:') + rng.shuffle(B.HELMET_RULE.bank).map((x) => chip(x)).join(''), 10), 'data-g2-wordbank="1"', 'padding:4px 0'));
    parts.push(frameTile([['A helmet sits', 110, 'on my forehead and fits', 110, '.'], ['It is always', 140, '.']]));
  }
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: pairs.map((p, i) => p.id + '@' + at[i]) } };
};

/* ---------------------------------------------------------------- G2-612 sun, heat and cold: dressing for the weather */
const PROTECT = {   // the lines each weather must have (the page's answer); the gate holds its own table
  beach: ['sunscreen', 'sun-hat', 'water'], hot: ['sunscreen', 'sun-hat', 'water', 'shade'], cloudy: ['sunscreen'], snow: ['coat', 'mittens'],
};
MODES['g2-weather-ready'] = function weatherReady(d, rng) {
  const weathers = d.n === 2 ? B.WEATHERS.filter((w) => w.id === 'beach' || w.id === 'snow') : B.WEATHERS.slice();
  const prot = d.n === 2 ? B.PROTECTIONS.filter((p) => ['sunscreen', 'sun-hat', 'coat', 'mittens'].includes(p.id)) : B.PROTECTIONS.slice();
  const wOrder = rng.shuffle(weathers), pOrder = rng.shuffle(prot);
  const wh = d.n === 2 ? 200 : d.frame ? 116 : 132, ph = d.n === 2 ? 134 : d.frame ? 74 : 86;
  const wTile = (w) => {
    const art0 = w.draw ? art(scene(w.draw, wh * 1.0, wh * 0.8)) : w.thermo ? row(pic(w.pic, wh - 50) + art(thermometer({ value: 40, min: 0, max: 40, step: 10, height: 200, numerals: false }).svg.replace('width="110" height="200"', `width="${f1((wh - 50) * 0.45)}" height="${f1(wh - 50)}"`)), 2) : pic(w.pic, wh - 40);
    return row(tile(col(art0 + small(w.label, 190), 0), 220, wh, `data-g2-weather="${w.id}" data-g2-must="${PROTECT[w.id].filter((x) => prot.some((p) => p.id === x)).join(',')}"`, 'lead') + DOT(), 8);
  };
  const pTile = (p) => row(DOT() + tile(row(pic(p.pic, Math.min(ph - 16, 96)) + `<div style="width:104px">${small(p.label, 102)}</div>`, 4), 220, ph, `data-g2-protect="${p.id}"`, 'white'), 8);
  const match = whiteBand(row(`<div style="display:flex;flex-direction:column;gap:10px">${wOrder.map(wTile).join('')}</div><div style="width:90px"></div><div style="display:flex;flex-direction:column;gap:8px">${pOrder.map(pTile).join('')}</div>`, 0, 'align-items:flex-start'), 'data-g2-match="1"', 'padding:8px 0;flex:1 1 auto');
  const parts = [whiteBand(text('Some things protect us in more than one kind of weather. Draw all the lines you can.', 'font-size:14px'), 'data-g2-tip="1"', 'padding:4px 0'), match];
  if (d.frame) parts.push(frameTile([['We need sunscreen on a cloudy day too because', 180], [600, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { weathers: wOrder.map((w) => w.id), protections: pOrder.map((p) => p.id) } };
};

/* ---------------------------------------------------------------- G2-613 be a health helper: our class campaign (record) */
MODES['g2-poster'] = function poster(d) {
  const parts = [whiteBand(row(text('Our class campaign:') + B.CAMPAIGNS.map((c) => col(itemOrScene(c, 56) + small(c.label, 130), 0, 'width:136px')).join(''), 8), 'data-g2-campaign="1"', 'padding:4px 0')];
  parts.push(col(labelledDraw(W - 40, d.reason ? 280 : d.own ? 430 : 470, 'my poster picture', 'data-dk-prompt="poster"'), 0));
  if (d.own) parts.push(whiteBand(row(text('A slogan is short and easy to remember, like:', 'font-size:15px') + chip('Scrub for 20!', 'data-g2-example="1"'), 10), 'data-g2-tip="1"', 'padding:4px 0'));
  parts.push(frameTile([[d.own ? 'My slogan:' : 'Our class slogan:', 480]]));
  if (d.reason) {
    parts.push(frameTile([['It matters because', 440, '.']]));
    parts.push(whiteBand(col(text('A good health poster has:', 'font-size:16px') + ['one clear message', 'a picture that shows it', 'a reason'].map((x) => row(box('', 26, 26, '', 'data-g2-check="1"', `display:block;border:2.5px solid ${T.ink};border-radius:4px`) + text(x, 'font-size:16px'), 8, 'justify-content:flex-start')).join(''), 4, 'align-items:flex-start'), 'data-g2-checklist="1"', 'padding:6px 20px'));
  }
  return { html: grow(parts.join(''), 'gap:10px'), meta: { record: true } };
};

module.exports = { makeG2Type: G2.makeG2Type, MODES, scene, SCENE, adArt, PROTECT };
