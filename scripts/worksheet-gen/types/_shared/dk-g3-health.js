/**
 * dk-g3-health.js — the Batch 3 Grade 3 health pages (G3-602 .. G3-611): germs, a day of MyPlate meals, sleep / screens /
 * play, what sways my choices, a goal plan, a home fire escape plan, who can help, and the three teacher-led lessons
 * (big feelings, working out a conflict, saying no). Registered in the shared MODES of dk-g3.js. US practice, invented
 * names only, no product names, no blame of families; grown-up helpers drawn as grown-ups that read as their jobs.
 */
'use strict';
const G3 = require('./dk-g3.js');
const G2 = require('./dk-g2.js');
const G1 = require('./dk-g1.js');
const K2 = require('./dk-k2.js');
const DK = require('./dk-kinder.js');
const B = require('../../data/science/dk-g3.js');
const CC = require('../../primitives/_tokens.js').codeColors;

const { pic, box, tile, labelledDraw, chip, word, small, text, col, row, grow, svg, art, band, whiteBand, arrow, lineBox, frameLine, frameTile, numBox, esc, f1, W, T, DOT } = G1.kit;
const { para, note, one, some, rec, tick, table, frames, growDraw, strip, kid, grown, img, ground, itemArt } = G3;
const MODES = G3.MODES;
const { patterned, derange } = DK;

/* ================================================================ the drawn scenes (viewBox 0 0 120 100, ground y 96) */
/** the pretend germ: a green blob with little spikes and two eyes (it reads as a cartoon germ, never a real one) */
const germ = (x, y, r = 7) => `<g data-g3-germ="1">` + Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return `<line x1="${f1(x + Math.cos(a) * r)}" y1="${f1(y + Math.sin(a) * r)}" x2="${f1(x + Math.cos(a) * (r + 3.5))}" y2="${f1(y + Math.sin(a) * (r + 3.5))}" stroke="${T.teal}" stroke-width="1.6" stroke-linecap="round"/>`; }).join('') +
  `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="1.4"/><circle cx="${f1(x - r * 0.35)}" cy="${f1(y - r * 0.15)}" r="${f1(r * 0.22)}" fill="#FFFFFF"/><circle cx="${f1(x + r * 0.35)}" cy="${f1(y - r * 0.15)}" r="${f1(r * 0.22)}" fill="#FFFFFF"/><circle cx="${f1(x - r * 0.35)}" cy="${f1(y - r * 0.1)}" r="${f1(r * 0.1)}" fill="${T.ink}"/><circle cx="${f1(x + r * 0.35)}" cy="${f1(y - r * 0.1)}" r="${f1(r * 0.1)}" fill="${T.ink}"/></g>`;
const door = `<rect x="70" y="22" width="40" height="74" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.5"/><rect x="76" y="54" width="10" height="5" rx="2" fill="${T.grid}" stroke="${T.ink}" stroke-width="1.5" data-g3-handle="1"/>`;
const say = (x, y, words, w, tailX, fs = 11) => `<g data-g3-say="${esc(words)}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="18" rx="8" fill="#FFFFFF" stroke="${T.teal}" stroke-width="1.6"/><path d="M${f1(tailX - 4)} ${f1(y + 17)} L${f1(tailX)} ${f1(y + 24)} L${f1(tailX + 5)} ${f1(y + 17)}" fill="#FFFFFF" stroke="${T.teal}" stroke-width="1.6"/><line x1="${f1(tailX - 3)}" y1="${f1(y + 17)}" x2="${f1(tailX + 4)}" y2="${f1(y + 17)}" stroke="#FFFFFF" stroke-width="2.4"/><text x="${f1(x + w / 2)}" y="${f1(y + 13)}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="${fs}" fill="${T.ink}" textLength="${f1(Math.min(w - 6, words.length * fs * 0.5))}" lengthAdjust="spacingAndGlyphs">${esc(words)}</text></g>`;
const HS = {
  // ---- the germ's trip (Ava dark, Ben teal, Cam coral)
  'germ-sneeze': () => { const f0 = kid({ x: 46, s: 0.8 }); const [mx, my] = f0.at(60, 18); const f = kid({ x: 46, s: 0.8, near: f0.reach(mx + 2, my + 2, 4) }); return ground + f.svg + [[mx + 12, my - 4], [mx + 18, my + 4], [mx + 14, my + 12], [mx + 22, my - 8]].map(([x, y]) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="2" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1"/>`).join('') + germ(mx + 6, my + 10, 6) + say(4, 4, 'Achoo!', 40, 34); },
  'germ-handle': () => { const f0 = kid({ x: 46, s: 0.8 }); const f = kid({ x: 46, s: 0.8, near: f0.reach(80, 57, 2) }); return ground + door + f.svg + germ(84, 50, 5); },
  'germ-ben-door': () => { const f0 = kid({ x: 46, s: 0.8, color: T.teal, who: 'friend' }); const f = kid({ x: 46, s: 0.8, color: T.teal, who: 'friend', near: f0.reach(80, 57, 2) }); return ground + door + f.svg + germ(80, 50, 5); },
  'germ-mouth': () => { const f0 = kid({ x: 50, s: 0.8, color: T.teal, who: 'friend' }); const [mx, my] = f0.at(60, 20); const f = kid({ x: 50, s: 0.8, color: T.teal, who: 'friend', near: f0.reach(mx + 4, my + 3, 6) }); return ground + f.svg + img({ theme: 'fruits', noun: 'apple' }, mx - 2, my - 6, 16, 16) + germ(mx + 12, my + 10, 5); },
  'germ-bottle': () => { const a0 = kid({ x: 34, s: 0.78, color: T.teal, who: 'friend' }), b0 = kid({ x: 90, s: 0.78, dir: -1, color: T.coral, who: 'friend' }); const A = kid({ x: 34, s: 0.78, color: T.teal, who: 'friend', near: a0.reach(58, 64, 2) }), Bf = kid({ x: 90, s: 0.78, dir: -1, color: T.coral, who: 'friend', near: b0.reach(66, 64, 2) }); return ground + A.svg + Bf.svg + img({ theme: 'At the Supermarket', noun: 'water' }, 54, 44, 16, 30) + germ(62, 40, 5); },
  'germ-cam': () => { const f = kid({ x: 60, s: 0.82, color: T.coral, who: 'friend' }); const [hx, hy] = f.at(52, 15); return ground + f.svg + germ(hx + 14, hy - 4, 7) + say(4, 4, 'Uh-oh!', 40, 40); },
  // ---- influences
  'bike-no-helmet': () => { const m0 = kid({ x: 14, s: 0.62, color: T.teal, who: 'friend' }); const m = kid({ x: 14, s: 0.62, color: T.teal, who: 'friend', near: m0.reach(34, 64, 2) }), j = kid({ x: 104, s: 0.62, dir: -1 }); return ground + img({ theme: 'vehicles', noun: 'bicycle' }, 24, 56, 62, 40) + m.svg + j.svg; },
  'tv-ad': () => `<defs><clipPath id="g3tv"><rect x="20" y="16" width="80" height="52"/></clipPath></defs><rect x="14" y="10" width="92" height="64" rx="6" fill="${T.ink}"/><rect x="20" y="16" width="80" height="52" fill="${T.tealSoft}"/><path d="M50 74 L46 90 M70 74 L74 90 M40 90 H80" stroke="${T.ink}" stroke-width="3"/>` + `<g clip-path="url(#g3tv)">` + img({ theme: 'At the Supermarket', noun: 'soda' }, 30, 2, 60, 80) + `</g>` + [[30, 28], [88, 30], [32, 56], [86, 58]].map(([x, y]) => `<path d="M${x - 5} ${y} h10 M${x} ${y - 5} v10" stroke="${CC.codeYellow}" stroke-width="2.5" stroke-linecap="round"/>`).join(''),
  'family-walk': () => { const g = grown({ x: 30, legs: 'walk' }), c1 = kid({ x: 66, legs: 'walk', color: T.teal, who: 'child' }), c2 = kid({ x: 96, legs: 'walk', s: 0.55, color: T.coral, who: 'child' }); return ground + g.svg + c1.svg + c2.svg + `<path d="M100 18 a9 9 0 1 0 6 14 a7 7 0 1 1 -6 -14 Z" fill="${T.cream}" stroke="${T.teal}" stroke-width="1.5"/>`; },
  'video-late': () => img({ theme: 'classroom', noun: 'tablet' }, 10, 18, 74, 64) + `<path d="M98 14 a11 11 0 1 0 8 18 a8 8 0 1 1 -8 -18 Z" fill="${T.cream}" stroke="${T.teal}" stroke-width="2"/><circle cx="47" cy="50" r="12" fill="#FFFFFF" stroke="${T.coral}" stroke-width="2"/><path d="M43 44 L53 50 L43 56 Z" fill="${T.coral}"/>`,
  'share-oranges': () => { const a0 = kid({ x: 34, s: 0.74 }), b0 = kid({ x: 88, s: 0.74, dir: -1, color: T.teal, who: 'friend' }); const A = kid({ x: 34, s: 0.74, near: a0.reach(60, 66, 2) }), Bf = kid({ x: 88, s: 0.74, dir: -1, color: T.teal, who: 'friend', near: b0.reach(64, 66, 2) }); return ground + A.svg + Bf.svg + img({ theme: 'fruits', noun: 'orange' }, 52, 52, 20, 20); },
  'video-smoothie': () => img({ theme: 'classroom', noun: 'tablet' }, 10, 18, 74, 64) + img({ theme: 'breakfast', noun: 'smoothie' }, 34, 28, 26, 44) + img({ theme: 'fruits', noun: 'banana' }, 88, 40, 26, 26),
  // ---- helpers: a counselor (a grown-up at a small table with two chairs and a box of tissues), a parent, a phone
  'school-nurse': () => { const g = grown({ x: 54, color: T.teal }); return ground + g.svg + `<path d="M48 30 q6 14 12 0 M54 37 v10" fill="none" stroke="${T.ink}" stroke-width="1.8" data-g3-stethoscope="1"/><circle cx="54" cy="49" r="3" fill="${T.grid}" stroke="${T.ink}" stroke-width="1.5"/>` +
    `<rect x="70" y="6" width="44" height="16" rx="3" fill="#FFFFFF" stroke="${T.teal}" stroke-width="1.6"/><text x="92" y="18" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="10" fill="${T.teal}">NURSE</text>`; },
  counselor: () => { const g0 = grown({ x: 40 }); const g = grown({ x: 40, near: g0.reach(64, 62, 4) }); return ground + `<rect x="58" y="60" width="44" height="6" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/><path d="M64 66 V96 M96 66 V96" stroke="${T.teal}" stroke-width="3"/>` + img({ theme: 'hospital', noun: 'tissue' }, 74, 42, 20, 20) + g.svg + `<rect x="62" y="6" width="54" height="16" rx="3" fill="#FFFFFF" stroke="${T.teal}" stroke-width="1.6"/><text x="89" y="18" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="9" fill="${T.teal}" textLength="46" lengthAdjust="spacingAndGlyphs">COUNSELOR</text>`; },
  parent: () => { const g0 = grown({ x: 44 }); const c0 = kid({ x: 82, dir: -1, s: 0.6 }); const meet = [62, 66]; const G = grown({ x: 44, near: g0.reach(meet[0], meet[1], 2) }), C = kid({ x: 82, dir: -1, s: 0.6, color: T.teal, who: 'child', near: c0.reach(meet[0] + 2, meet[1], 2) }); return ground + G.svg + C.svg; },
  'phone-911': () => `<rect x="38" y="6" width="44" height="88" rx="8" fill="${T.ink}"/><rect x="42" y="14" width="36" height="70" rx="3" fill="#FFFFFF"/><text x="60" y="40" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="16" fill="${T.coral}">911</text>` + [0, 1, 2].map((r) => [0, 1, 2].map((c) => `<circle cx="${49 + c * 11}" cy="${52 + r * 9}" r="3" fill="${T.grid}"/>`).join('')).join('') + `<circle cx="60" cy="88" r="2.5" fill="${T.inkSoft}"/>`,
  // ---- teacher-led scenes
  swing: () => { const a = kid({ x: 22, s: 0.7 }), b = kid({ x: 100, s: 0.7, dir: -1, color: T.teal, who: 'friend' }); return ground + img({ theme: 'toys', noun: 'swing' }, 36, 6, 50, 88) + a.svg + b.svg + say(2, 4, 'My turn!', 36, 22, 10) + say(82, 4, 'My turn!', 36, 100, 10); },
  'dare-hill': () => { const f = kid({ x: 92, s: 0.66, dir: -1, color: T.teal, who: 'friend' }); return `<path d="M0 40 Q60 50 120 96 L0 96 Z" fill="${T.creamDeep}" stroke="${CC.codeBrown}" stroke-width="2"/>` + img({ theme: 'vehicles', noun: 'bicycle' }, 6, 18, 46, 32) + f.svg; },
  'offer-medicine': () => { const a0 = kid({ x: 30, s: 0.74, color: T.teal, who: 'friend' }); const A = kid({ x: 30, s: 0.74, color: T.teal, who: 'friend', near: a0.reach(56, 60, 2) }); const b = kid({ x: 92, s: 0.74, dir: -1 }); return ground + A.svg + b.svg + img({ theme: 'hospital', noun: 'medicine' }, 50, 46, 18, 22) + img({ theme: 'classroom', noun: 'backpack' }, 4, 66, 22, 30); },
  'leave-out': () => { const ks = [[16, T.ink], [36, T.teal], [56, T.coral]].map(([x, c]) => kid({ x, s: 0.62, color: c, who: 'child' }).svg).join(''); const lone = kid({ x: 100, s: 0.62, dir: -1, color: T.inkSoft, who: 'child' }); return ground + ks + lone.svg + img({ theme: 'toys', noun: 'ball' }, 30, 80, 14, 14); },
};
function hscene(kind, w, h) {
  if (!HS[kind]) throw new Error('dk-g3-health: no scene ' + kind);
  return svg(w, h, HS[kind](), `data-g2-scene="${kind}"`, '0 0 120 100').replace('style="display:block;overflow:visible"', 'style="display:block;overflow:hidden"');
}
const helperArt = (x, px) => (x.pic ? pic(x.pic, px) : art(hscene(x.draw, px * 1.2, px)));

/* ---------------------------------------------------------------- G3-602 how germs spread and how we stop them */
MODES['g3-germ-trip'] = function germTrip(d, rng) {
  const L1 = d.frames === 3;
  const frames = L1 ? B.GERM_FRAMES.filter((f) => B.GERM_L1.includes(f.id)) : B.GERM_FRAMES.slice();
  const num = (i) => `<span class="dk-head" style="font-size:18px">${i + 1}</span>`;
  let body;
  if (L1) {
    // level 1: three frames, one to a row; the habit card is glued in the box beside each picture
    body = frames.map((f, i) => band(row(num(i) + art(hscene('germ-' + f.id, 190, 158)) + col(para(f.label, 280, 16) + box('dk-draw', 280, 84, `<span class="g1-small" style="position:absolute;left:8px;top:3px;font-size:12px;width:auto">glue the habit here</span>`, `data-g2-bin="${f.id}"`), 8, 'align-items:flex-start'), 12, 'justify-content:flex-start'),
      `data-g3-frame="${f.id}"`, 'padding:4px 10px')).join('');
  } else {
    const fw = (W - 20) / 3, ph = d.ending ? 92 : 128;
    const frame = (f, i) => box('dk-tile dk-tile--white', fw, 'auto', col(row(num(i) + art(hscene('germ-' + f.id, ph * 1.2, ph)), 4) + note(f.label, fw - 20, 13) + lineBox(fw - 26, d.ending ? 30 : 36), 2, 'justify-content:space-between;flex:1 1 auto'),
      `data-g3-frame="${f.id}" data-dk-answer="${f.stop ? 'stop' : 'no'}"${f.habit ? ` data-g3-sample="${esc(f.habit)}"` : ''}`, 'padding:4px;flex-direction:column;align-items:center');
    const rows = []; for (let i = 0; i < frames.length; i += 3) rows.push(row(frames.slice(i, i + 3).map((f, k) => frame(f, i + k)).join(''), 10, 'flex:1 0 auto;align-items:stretch'));
    body = rows.join('');
  }
  const parts = [whiteBand(para(L1 ? 'Follow the germ from picture to picture. Cut out the habits. Glue each one beside the picture where it would stop the germ.' : 'Follow the germ. Circle each picture where a habit would stop the germ. Write the habit on its line.', 640, 14), 'data-g3-tip="1"', 'padding:4px 8px'), grow(body, L1 ? 'gap:8px' : 'gap:8px;flex:1 0 auto')];
  if (L1) {
    const cards = rng.shuffle(frames.map((f) => ({ id: f.id, habit: f.habit })));
    parts.push(strip(cards.map((c) => G2.cut(210, 56, note(c.habit, 196, 15), `data-g2-card="habit-${c.id}" data-dk-answer="${c.id}"`)), 3));
  } else parts.push(whiteBand(row(text('Habits:', 'font-size:14px') + B.HABITS.map((h) => chip(h, '', 'font-size:12px;padding:0 6px')).join(''), 5, 'flex-wrap:wrap;width:650px;justify-content:center'), 'data-g3-wordbank="1"', 'padding:4px 6px'));
  if (d.ending) parts.push(growDraw(W - 40, 130, 'my new ending: the germ is stopped in picture 1', 'data-dk-prompt="ending"'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { frames: frames.map((f) => (f.stop ? 'stop' : 'no') + ':' + f.id) } };
};

/* ---------------------------------------------------------------- G3-603 fuel for the day: MyPlate meals and drinks */
MODES['g3-myplate-day'] = function myplateDay(d) {
  const meals = d.meals === 1 ? ['lunch'] : ['breakfast', 'lunch', 'snack', 'dinner'];
  const mw = meals.length === 1 ? W - 20 : (W - 12) / 2;
  const meal = (m) => box('dk-draw', mw, 'auto', `<span class="dk-head" style="position:absolute;left:10px;top:4px;font-size:16px">${m}</span>` +
    `<div style="position:absolute;right:8px;top:6px;display:flex;flex-direction:column;gap:3px;align-items:flex-start">${B.GROUPS5.map((g) => row(tick(16) + `<span class="g1-small" style="font-size:12px;width:auto;text-align:left">${g}</span>`, 4)).join('')}</div>`, `data-g3-meal="${m}"`, `flex:1 1 0;min-height:${meals.length === 1 ? 230 : 150}px`);
  const mealRows = []; for (let i = 0; i < meals.length; i += 2) mealRows.push(row(meal(meals[i]) + (meals[i + 1] ? meal(meals[i + 1]) : ''), 12, 'flex:1 1 0;min-height:0;align-items:stretch'));
  const parts = [whiteBand(para(d.meals === 1 ? 'Plan a lunch. Glue foods in the box. Check each food group your lunch has.' : 'Plan a day of meals. Write or draw the foods in each box. Check the food groups each meal has.', 640, 15), 'data-g3-tip="1"', 'padding:4px 8px'), grow(mealRows.join(''), 'gap:10px')];
  if (d.meals === 1) parts.push(strip(B.LUNCH_CARDS.map((c) => G2.cut(104, 96, col(pic(c.pic, 58) + small(c.label, 96), 0), `data-g3-food="${c.id}"`)), 5));
  const drinks = whiteBand(col(text('Is each drink an everyday drink or a sometimes drink? Circle one.', 'font-size:15px') + row(B.DRINKS.map((x) => col(pic(x.pic, 56) + word(x.label, 'font-size:14px') + one(x.id, ['everyday', 'sometimes'], x.when, 13, 4), 2)).join(''), 30), 4), 'data-g3-drinks="1"', 'padding:4px 6px');
  parts.push(drinks);
  if (d.missing) parts.push(frameTile([['My', 100, 'is missing the', 110, 'group.'], ['I can add', 470, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { drinks: B.DRINKS.map((x) => x.when + ':' + x.id) } };
};

/* ---------------------------------------------------------------- G3-604 sleep, screens and an hour of play (record) */
MODES['g3-my-day'] = function myDay(d) {
  const hours = Array.from({ length: 24 }, (_, k) => (7 + k) % 24);
  const lab = (h) => (h === 12 ? 'noon' : h === 0 ? 'midnight' : `${h % 12} ${h < 12 ? 'AM' : 'PM'}`);
  const key = d.four ? ['sleep', 'school', 'active play', 'screens'] : ['sleep', 'active play'];
  const keyBand = whiteBand(row(text('Key: color each box your own color.', 'font-size:14px') + key.map((k) => row(box('', 34, 26, '', `data-g3-key="${k}"`, `display:block;border:2.5px solid ${T.ink};border-radius:4px`) + word(k, 'font-size:15px'), 6)).join(''), 14, 'flex-wrap:wrap;width:650px'), 'data-g3-keyband="1"', 'padding:6px 8px');
  const half = `<div data-g3-half="1" style="position:absolute;left:3px;right:3px;top:50%;border-top:1.5px dashed ${T.inkSoft}"></div>`;
  const cell = (h) => col(`<span class="g1-small" style="font-size:${h === 0 ? 11 : 12}px;width:52px">${lab(h)}</span>` + box('dk-draw', 50, 'auto', half, `data-g3-hour="${h}"`, 'flex:1 1 0;min-height:54px;border-style:solid;border-color:' + T.inkSoft), 1, 'flex:1 1 0;align-items:center');
  const stripRows = [hours.slice(0, 12), hours.slice(12)].map((hs) => row(hs.map(cell).join(''), 4, 'flex:1 1 0;align-items:stretch')).join('');
  const parts = [whiteBand(para(`Think of a usual school day. The strip starts at 7 AM and goes around to 7 AM the next morning. Each box is one hour: the top half is the first 30 minutes. Color each half hour${d.four ? '' : ' you sleep or play actively'} with its color from the key: use what you do for most of that half hour.`, 640, 14), 'data-g3-tip="1"', 'padding:4px 8px'), keyBand,
    box('', W, 'auto', col(stripRows, 8, 'flex:1 1 auto;align-items:stretch'), 'data-g3-strip="24"', 'flex:1 1 auto;min-height:0;display:flex')];
  const scale = (n, lo, hi, unit) => { let s = ''; const w = 26; for (let k = 0; k <= n; k++) { const on = k >= lo && k <= hi; s += `<rect x="${k * w}" y="4" width="${w}" height="18" fill="${on ? T.tealSoft : '#FFFFFF'}" stroke="${on ? T.teal : T.inkSoft}" stroke-width="${on ? 2.5 : 1}"${on ? ' data-g3-need="1"' : ''}/><text x="${k * w + w / 2}" y="36" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="11" fill="${T.ink}">${k}</text>`; } return svg((n + 1) * w + 2, 40, s, `data-g3-scale="${unit}"`); };
  if (d.counts) parts.push(whiteBand(col(row(text('Hours of sleep:') + numBox(60, 36) + note('Children your age need 9 to 12 hours (the boxes with a thick line).', 280, 12), 8, 'justify-content:flex-start') + art(scale(14, 9, 12, 'sleep')) +
    row(text('Minutes of active play today:') + numBox(70, 36) + note('Add up recess, PE and after school. Move your body at least 60 minutes every day.', 280, 12), 8, 'justify-content:flex-start'), 4, 'align-items:flex-start'), 'data-g3-counts="1"', 'padding:4px 10px'));
  if (d.change) parts.push(frameTile([['One change I will try:', 420, '.'], ['I will try it on', 200, '.']]));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G3-605 what sways my choices? */
MODES['g3-influences'] = function influences(d, rng) {
  const L1 = d.scenes === 3;
  const pick = L1 ? B.INFLUENCE_SCENES.filter((s) => B.INFLUENCE_L1.includes(s.id)) : B.INFLUENCE_SCENES.slice();
  const order = fairOrder3(rng, pick);
  const way = (s) => (s.way === 'healthy' ? 'healthy' : 'less healthy');
  let body;
  if (L1) {
    body = order.map((s) => band(row(art(hscene(s.draw, 150, 125)) + col(para(s.label, 470, 15) +
      row(small('The influence:', 110) + one(s.id + ':who', B.INFLUENCES5, s.who, 13, 4), 4, 'justify-content:flex-start') +
      row(small('It pushes toward a choice that is:', 220) + one(s.id + ':way', ['healthy', 'less healthy'], way(s), 13, 4), 4, 'justify-content:flex-start') +
      row(small('I could:', 60) + lineBox(400, 34), 4, 'justify-content:flex-start'), 5, 'align-items:flex-start'), 10, 'justify-content:flex-start'), `data-g3-scenecard="${s.id}"`, 'padding:4px 8px')).join('');
  } else {
    const cw = (W - 10) / 2;
    const card = (s) => box('dk-tile', cw, 'auto', col(row(art(hscene(s.draw, 84, 70)) + para(s.label, cw - 110, 13), 6, 'justify-content:flex-start;align-items:flex-start') +
      row(small('Influence:', 64) + `<div style="width:250px">${one(s.id + ':who', B.INFLUENCES5, s.who, 12, 3).replace('align-items:center"', 'align-items:center;flex-wrap:wrap;justify-content:flex-start;row-gap:3px"')}</div>`, 4, 'justify-content:flex-start') +
      row(small('It pushes toward a choice that is:', 150) + one(s.id + ':way', ['healthy', 'less healthy'], way(s), 12, 3), 4, 'justify-content:flex-start') +
      row(small('I could:', 52) + lineBox(cw - 80, 30), 4, 'justify-content:flex-start'), 3, 'align-items:flex-start'), `data-g3-scenecard="${s.id}"`, 'flex:1 1 0;min-height:0;padding:4px 8px;justify-content:flex-start;align-items:flex-start');
    const rows = []; for (let i = 0; i < order.length; i += 2) rows.push(row(card(order[i]) + card(order[i + 1]), 10, 'flex:1 1 0;min-height:0;align-items:stretch'));
    body = rows.join('');
  }
  const parts = [grow(body, 'gap:8px')];
  if (d.own) parts.push(frames([['This week, an influence I noticed was', 250, '.'], ['What I did about it:', 450, '.']], 40));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items: order.map((s) => s.who + '/' + s.way + ':' + s.id) } };
};
/** an order of the scenes whose healthy / less-healthy run is not patterned */
function fairOrder3(rng, items) { let o; for (let t = 0; t < 400; t++) { o = rng.shuffle(items); if (!patterned(o.map((s) => s.way === 'healthy'))) return o; } return o; }

/* ---------------------------------------------------------------- G3-606 my goal: plan it, track it, look back (record) */
MODES['g3-goal-plan'] = function goalPlan(d) {
  const lh = d.backup ? 38 : 42;
  const parts = [frames([['My goal:', 500, '.']].concat(d.why ? [['Why it matters:', 440, '.']] : []), lh)];
  const steps = d.steps === 2 ? [['First I will', 470, '.'], ['Then I will', 470, '.']] : [['Step 1:', 500, '.'], ['Step 2:', 500, '.'], ['Step 3:', 500, '.']];
  if (d.backup) steps.push(['On a busy day, my backup step is', 300, '.']);
  parts.push(frames(steps, lh));
  parts.push(row([['What I need', 'need'], ['Who will help me', 'help']].map(([l, k]) => box('dk-draw', (W - 12) / 2, 'auto', `<span class="dk-head" style="position:absolute;left:10px;top:4px;font-size:15px">${l}</span>`, `data-dk-prompt="${k}"`, 'min-height:56px;flex:1 1 0')).join(''), 12, 'flex:1 1 auto;align-items:stretch;min-height:0'));
  const days = row([0, 1, 2].map((w) => col(word('week ' + (w + 1), 'font-size:13px') + row(Array.from({ length: 7 }, (_, k) => col(`<span class="g1-small" style="font-size:11px;width:26px">${w * 7 + k + 1}</span>` + tick(24, `data-g3-day="${w * 7 + k + 1}"`), 0)).join(''), 3), 2)).join(''), 14);
  parts.push(whiteBand(col(text('Check a box each day you work on your goal (21 days).', 'font-size:15px') + days, 4), 'data-g3-tracker="21"', 'padding:6px 4px'));
  parts.push(box('dk-tile dk-tile--white', W, 'auto', col(word('Look back (after 21 days)', 'font-size:15px') + G1.kit.frameLine(['I worked on my goal on', 60, 'of 21 days.'], lh) +
    G1.kit.frameLine(['What helped:', 480], lh) + G1.kit.frameLine(['What got in the way:', 420], lh) + row(text('After 21 days (circle one):') + rec(['keep my goal', 'change my goal', 'I met my goal!']), 8), 2, 'align-items:flex-start'), 'data-g3-lookback="1"', 'padding:4px 14px;justify-content:flex-start'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G3-607 our home fire escape plan (record) */
MODES['g3-escape-plan'] = function escapePlan(d) {
  const sym = [['door', `<rect x="4" y="2" width="18" height="26" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2"/><circle cx="18" cy="16" r="1.6" fill="${T.ink}"/>`],
    ['window', `<rect x="2" y="6" width="24" height="18" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2"/><path d="M14 6 V24 M2 15 H26" stroke="${T.teal}" stroke-width="1.5"/>`],
    ['a way out', `<path d="M2 15 H20" stroke="${CC.codeGreen}" stroke-width="4"/><path d="M18 8 L27 15 L18 22 Z" fill="${CC.codeGreen}"/>`],
    ['smoke alarm', `<circle cx="14" cy="15" r="11" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2"/><circle cx="14" cy="15" r="5" fill="none" stroke="${T.inkSoft}" stroke-width="1.5"/><circle cx="21" cy="9" r="2" fill="${CC.codeRed}"/>`],
    ['meeting place', `<path d="M14 28 V16" stroke="${CC.codeBrown}" stroke-width="3"/><circle cx="14" cy="11" r="9" fill="${CC.codeGreen}" stroke="${T.teal}" stroke-width="1.5"/>`]];
  const keyBand = whiteBand(row(text('Key:', 'font-size:15px') + sym.map(([l, s]) => row(art(svg(30, 30, s, `data-g3-symbol="${l}"`)) + word(l, 'font-size:14px'), 4)).join(''), 12, 'flex-wrap:wrap;width:650px'), 'data-g3-key="1"', 'padding:4px 8px');
  // the grid: square cells of 22 px drawn as a background, so the cells stay square whatever height the page gives it
  const gw = W - 20, gh = d.room ? 250 : 320;   // review round 1: level 3 as tall as level 2 (its practice day and tester sit on the checklist)
  const cells = `background-color:#FFFFFF;background-image:linear-gradient(${T.grid} 1px, transparent 1px),linear-gradient(90deg, ${T.grid} 1px, transparent 1px);background-size:22px 22px;background-position:-1px -1px`;
  const grid = box('', gw, 'auto', `<span class="dk-head" style="position:absolute;left:10px;top:6px;font-size:15px;background:#FFFFFF;padding:0 4px">${d.room ? 'one room in my home: two ways out' : 'my home: two ways out of every room'}</span>`, 'data-dk-draw data-dk-prompt="floor-plan" data-g3-grid="1"', `position:relative;flex:1 1 auto;min-height:${gh}px;align-self:center;border:2px solid ${T.teal};${cells}`);
  const parts = [whiteBand(para(d.room ? 'Draw one room of your home. Mark two ways out with arrows. Draw the smoke alarm and your meeting place outside.' : 'Draw every room of your home. Mark two ways out of every room with arrows. Draw the smoke alarms and your meeting place outside.', 640, 15), 'data-g3-tip="1"', 'padding:4px 8px'), keyBand, grid];
  parts.push(frameTile((d.room ? [['The room I drew is the', 220, '.'], ['Way out 1:', 200, 'Way out 2:', 200]] : []).concat([['Our meeting place outside:', 380, '.']])));
  const list = ['We practice our escape plan two times a year.', 'A grown-up tests our smoke alarms every month.', 'If there is a fire, get out and stay out. Never go back inside.', 'Call 911 from outside.'];
  parts.push(whiteBand(col(text('Take home: our family checklist', 'font-size:15px') + list.map((l, i) => row(tick(22) + text(l, 'font-size:14px') + (d.who && i < 2 ? G1.kit.frameLine([i === 0 ? 'Our day:' : 'Who:', i === 0 ? 150 : 170], 30) : ''), 8, 'justify-content:flex-start;align-items:flex-end')).join(''), 3, 'align-items:flex-start'), 'data-g3-checklist="1"', 'padding:4px 14px'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G3-608 who can help? trusted adults and resources */
MODES['g3-help-finder'] = function helpFinder(d, rng) {
  const sits = d.n === 4 ? B.SITUATIONS.filter((s) => B.SITUATIONS_L1.includes(s.id)) : B.SITUATIONS.slice();
  const helpers = d.n === 4 ? B.HELPERS.filter((h) => sits.some((s) => s.helper === h.id)) : B.HELPERS.slice();
  let order, hOrder;
  for (let t = 0; t < 400; t++) { order = rng.shuffle(sits); hOrder = rng.shuffle(helpers); const pos = order.map((s) => hOrder.findIndex((h) => h.id === s.helper)); if (!pos.some((p, i) => p === i) || d.n === 8) break; }
  const sh = d.n === 4 ? 112 : d.next ? 50 : 54, hh = d.n === 4 ? 128 : d.next ? 80 : 84;
  const L = order.map((s) => row(tile(note(s.label, 210, 14), 230, sh, `data-g3-sit="${s.id}" data-dk-answer="${s.helper}"`, 'white') + DOT(), 8)).join('');
  const R = hOrder.map((h) => row(DOT() + tile(row(helperArt(h, hh - 30) + `<div style="width:120px">${word(h.label, 'font-size:14px;white-space:normal;width:118px;line-height:16px')}</div>`, 4), 250, hh, `data-g3-helper="${h.id}"`, 'lead'), 8)).join('');
  const match = whiteBand(row(`<div style="display:flex;flex-direction:column;gap:6px;justify-content:space-around;align-self:stretch">${L}</div><div style="width:60px"></div><div style="display:flex;flex-direction:column;gap:8px;justify-content:space-around;align-self:stretch">${R}</div>`, 0, 'align-items:stretch'), 'data-g3-match="1"', 'padding:6px 0;flex:1 1 auto');
  const parts = [whiteBand(para('Draw a line from each problem to the best helper. A helper can get more than one line.', 640, 15), 'data-g3-tip="1"', 'padding:4px 8px'), match];
  const say = [['Pick one problem. I would say:'], ['“', 560, '.”']];
  if (d.next) parts.push(frames(say.concat([['If that helper could not help, I would ask', 230, '.'], ['I will keep asking until someone helps.']]), 38));
  else parts.push(frameTile(say));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { sits: order.map((s) => s.helper + ':' + s.id), helpers: hOrder.map((h) => h.id) } };
};

/* ---------------------------------------------------------------- G3-609 big feelings: name it, calm it, say it (teacher-led) */
MODES['g3-big-feelings'] = function bigFeelings(d) {
  const sits = d.n === 3 ? B.FEELING_SITUATIONS.slice(0, 3) : B.FEELING_SITUATIONS.slice(0, 2);
  const big = d.n === 3;
  // the 1-to-5 feelings thermometer as five steps that grow (the class's own rating: no answer)
  const sizeBar = () => art(svg(170, 48, [1, 2, 3, 4, 5].map((k) => `<rect x="${(k - 1) * 34}" y="${30 - k * 5}" width="28" height="${k * 5 + 2}" fill="#FFFFFF" stroke="${T.ink}" stroke-width="1.8"/><text x="${(k - 1) * 34 + 14}" y="46" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="12" fill="${T.ink}">${k}</text>`).join(''), 'data-g3-size="1"'));
  const faces = row(B.FEELINGS.map((p) => col(pic(p, big ? 46 : 40) + `<span class="g1-small" style="font-size:12px;width:52px">${B.FEELING_WORDS[p.noun]}</span>`, 0)).join(''), 6);
  const more = row(small('or:', 24) + rec(B.FEELING_MORE, 12, 4) + word('other:', 'font-size:13px') + lineBox(90, 28), 4, 'justify-content:flex-start');
  const card = (s) => band(col(row(`<div style="width:170px">${para(s.label, 166, 16)}</div>` + col(small('My feeling (circle one):', 230) + faces, 1) + col(small('How big? Color it.', 170) + sizeBar(), 1), 10, 'justify-content:flex-start') + more +
    (d.imsg ? G1.kit.frameLine(['I feel', 110, 'when', 330, '.'], 38) + G1.kit.frameLine(['I need', 470, '.'], 38) : '') +
    col(small('A calm-down tool I can use (circle one):', 300) + rec(B.CALM_TOOLS, 12, 4), 1, 'align-items:flex-start'), big ? 6 : 3, 'align-items:flex-start'), `data-g3-feeling="${s.id}"`, 'padding:4px 10px');
  const parts = [whiteBand(para('Every feeling is OK. What we do with a feeling is our choice. For each one: name the feeling, show how big it is, and pick a way to calm down.' + (d.imsg ? ' Then say it with an I-message.' : ''), 640, 14), 'data-g3-tip="1"', 'padding:4px 8px'), grow(sits.map(card).join(''), 'gap:8px')];
  if (d.partner) parts.push(frames([['My partner felt', 130, 'when', 260, '.'], ['I helped my partner say: “I feel', 110, 'when', 170], ['I need', 420, '.”']], 38));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { record: true } };
};

/* ---------------------------------------------------------------- G3-610 working it out: solving a conflict (teacher-led) */
MODES['g3-work-it-out'] = function workItOut(d, rng) {
  const parts = [];
  if (d.order) {
    let order; for (let t = 0; t < 400; t++) { order = rng.shuffle(B.CONFLICT_STEPS.map((s, i) => ({ s, i }))); if (order.every((x, k) => x.i !== k)) break; }
    parts.push(whiteBand(col(text('Glue the steps in order, 1 to 5.', 'font-size:15px') + row(B.CONFLICT_STEPS.map((s, i) => col(`<span class="dk-head" style="font-size:16px">${i + 1}</span>` + box('dk-draw', 124, 68, '', `data-g2-bin="step-${i + 1}"`), 2)).join(''), 6), 4), 'data-g3-mat="1"', 'padding:4px 4px'));
    parts.push(strip(order.map((x) => G2.cut(116, 60, note(x.s, 108, 13).replace('I-message', '<span style="white-space:nowrap">I-message</span>'), `data-g2-card="step${x.i + 1}" data-dk-answer="step-${x.i + 1}"`)), 5));
  } else {
    // level 1: the mat printed big, to follow with the teacher
    parts.push(whiteBand(col(text('The steps on our talk-it-out mat:', 'font-size:16px') + row(B.CONFLICT_STEPS.map((s, i) => box('dk-tile', 122, 'auto', col(`<span class="dk-head" style="font-size:22px">${i + 1}</span>` + note(s, 112, 15).replace('I-message', '<span style="white-space:nowrap">I-message</span>'), 2), `data-g3-step="${i + 1}"`, 'padding:6px 4px;min-height:96px;justify-content:flex-start')).join(''), 6, 'align-items:stretch'), 6), 'data-g3-mat="1"', 'padding:6px 4px'));
  }
  const sols = rng.shuffle(B.CONFLICT_SOLUTIONS);
  const fair = some('fair', sols.map((x) => x.label), B.CONFLICT_SOLUTIONS.filter((x) => x.fair).map((x) => x.label), 13, 6).replace('flex-direction:row"', 'flex-direction:row;flex-wrap:wrap;width:' + (d.order ? 500 : 440) + 'px;justify-content:flex-start;row-gap:6px"');
  const ph = d.sort ? 100 : d.order ? 120 : 160;
  parts.push(whiteBand(row(art(hscene('swing', ph * 1.2, ph)) + col(para('Two friends both want the same swing at recess.', 440, 16) + small('Circle every fair solution:', 440) + fair, 6, 'align-items:flex-start'), 12, 'justify-content:flex-start'), 'data-g3-scenario="1"', 'padding:4px 8px'));
  if (d.frames) parts.push(frames([['I feel', 120, 'when', 320, '.'], ['We could', 460, '.']], 42));
  if (d.sort) {
    let items; for (let t = 0; t < 400; t++) { items = rng.shuffle(B.GROWN_UP_SORT); if (!patterned(items.map((x) => x.grownUp))) break; }
    parts.push(row([['self', 'We can work it out'], ['grown-up', 'Get a grown-up right away']].map(([k, l]) => box('dk-draw', (W - 12) / 2, 'auto', `<span class="dk-head" style="position:absolute;left:10px;top:4px;font-size:15px">${l}</span>`, `data-g2-bin="${k}"`, 'min-height:154px;flex:1 1 0')).join(''), 12, 'flex:1 1 auto;align-items:stretch;min-height:0'));
    parts.push(strip(items.map((x) => G2.cut(140, 60, note(x.label, 124, 12), `data-g2-card="${x.id}" data-dk-answer="${x.grownUp ? 'grown-up' : 'self'}"`)), 4));
  }
  if (d.coach) parts.push(frameTile([['When I coached a pair, I helped them', 330, '.']]));
  if (!d.order) parts.push(growDraw(W - 40, 160, 'Draw the two friends after they work it out.', 'data-dk-prompt="after"'));
  if (d.frames && !d.sort) parts.push(growDraw(W - 40, 100, 'Draw your solution.', 'data-dk-prompt="solution"'));
  return { html: grow(parts.join(''), 'gap:8px'), meta: { sort: d.sort ? B.GROWN_UP_SORT.map((x) => (x.grownUp ? 'grown-up' : 'self') + ':' + x.id) : null } };
};

/* ---------------------------------------------------------------- G3-611 saying no and walking away (teacher-led) */
MODES['g3-saying-no'] = function sayingNo(d, rng) {
  // where the right chip sits: first or second, never the same place for all three scenes
  const at = rng.shuffle([0, 1, rng.int(0, 1)]);
  const moves = whiteBand(col(text('Four ways to say no:', 'font-size:15px') + row(B.REFUSAL_MOVES.map((m, i) => col(`<span class="dk-head" style="font-size:16px">${i + 1}</span>` + note(m, 140, 13), 1)).join(''), 10, 'align-items:flex-start'), 3), 'data-g3-moves="1"', 'padding:4px 6px');
  const draws = { helmet: 'dare-hill', medicine: 'offer-medicine', 'leave-out': 'leave-out' };
  const items = [];
  const write = d.reason || d.instead, ph = write ? 76 : 120, tw = write ? 500 : 440;
  const rows = B.REFUSAL_SCENES.map((s, i) => {
    const opts = at[i] === 0 ? [s.no, s.yes] : [s.yes, s.no];
    items.push(s.id + '@' + at[i]);
    return band(col(row(art(hscene(draws[s.id], ph * 1.2, ph)) + col(para(s.label, tw, 15) + small('Circle the clear way to say no:', tw) + one(s.id, opts, s.no, 13, 6, write && opts.join('').length < 66 ? 'row' : 'column'), 4, 'align-items:flex-start'), 10, 'justify-content:flex-start') +
      (d.reason ? G1.kit.frameLine(['No, I will not', 190, 'because', 240, '.'], 36) : '') + (d.instead ? G1.kit.frameLine(["Let's", 440, 'instead.'], 36) : ''), 2, 'align-items:flex-start'), `data-g3-refusal="${s.id}"`, 'padding:4px 8px');
  });
  const parts = [moves, grow(rows.join(''), 'gap:6px'), frameTile([['After I walk away, the trusted adult I will tell is', 200, '.']])];
  return { html: grow(parts.join(''), 'gap:8px'), meta: { items } };
};

module.exports = { makeG3Type: G3.makeG3Type, MODES, hscene, HS, germ };
