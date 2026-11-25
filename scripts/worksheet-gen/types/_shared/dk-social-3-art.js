/**
 * dk-social-3-art.js — the drawings of the Batch S3 Grade 3 social studies pages (Daily Teaching System Stage D-5,
 * 2026-11-25; factory dk-social-3.js). Pure functions that return SVG markup; NOTHING here reads a picture or the cache
 * while the module loads.
 *
 * Built on the Batch SK figure (dk-social-k-art.js: person(), skin tones, the outline), the Batch S1 helpers
 * (dk-social-1-art.js: rect / orect / line / circ / path / g, toGrey, the coins) and the Batch S2 drawings
 * (dk-social-2-art.js: the grown-up figure set grownUp(), the leader at a lectern, the council at its desk, the flag on a
 * pole, signs, houses, trees); none of those files is edited. Every colour is in PAL3 = PAL2 + S3_SCENE below (the gate
 * holds every drawing to it). The US maps come from data/social/dk-social-3-geo.js (Natural Earth and the 2020 Census);
 * sample towns and sample states are drawn by hand and the page says so. Every leader is a role, never a person's
 * likeness; real people of the past are drawn small, in a true scene, without a likeness; an old photograph is a drawn
 * sample in greys.
 */
'use strict';
const K = require('./dk-social-k-art.js');
const A1 = require('./dk-social-1-art.js');
const A2 = require('./dk-social-2-art.js');
const GEO = require('../../data/social/dk-social-3-geo.js');
const { person, armTo, f1, OUT, BODY } = K;
const { rect, orect, line, circ, path, g, P, toGrey } = A1;
const { grownUp, flagPole, sign, signText, house, treeR, cloud, bubble, star } = A2;

/* ================================================================ the new colours + PAL3 */
const S3_SCENE = {
  parchment: '#F3E6C4', parchmentDark: '#C9B27E', ink3: '#3B2F22',
  church: '#E9E2D0', synagogue: '#D9C8A6', mosque: '#F1EAD8', domeGold: '#D9A520', glassBlue3: '#9CC4E4',
  newsprint: '#F4F2EC', newsGrey: '#9C9A94', banner: '#F7F1DC', bannerRed: '#B5372F', sash: '#E8C547', accessBlue: '#2F6DB5',
  street3: '#C9C4BA', streetLine: '#F4F1EA', block3: '#EAF2E3', lake3: '#9CCFE6', lakeEdge: '#5E9EC0', parkGreen: '#9CCB7C',
  stateLand: '#F3EED9', stateEdge: '#8A7D63', cityDot: '#3A3530', townDot: '#E4574B', river3: '#5DA7D6',
  popLand: '#FFFFFF', dotInk: '#3A3530', physLand: '#EFEBDD', plains3: '#D7EBBF', desert3: '#F3DFA6', desertLine: '#C9A86A', mountain3: '#B98D63', mountainDark: '#7E5B3A', lakePhys: '#8CC3E3', riverPhys: '#3B7FC4', neighbour: '#E2E0DA', sea3: '#DDEFF7', neighbourLand: '#D9D9D9',
  field3: '#C9DE8E', fieldLine: '#A3BD5E', forest3: '#3F7A4A', rockTan: '#D8C29A', rock3: '#A89B86', harborDock: '#9C7A52', sand3: '#F1DDA6', mineDark: '#4A3B2E',
  column: '#F1EEE6', columnShade: '#D8D3C8', roof3: '#C9C2B2', stepGrey: '#BDB6A8',
  truckRed: '#D9534F', trashGreen3: '#3F8F5A', licenseBlue: '#CFE2F3', mailBlue3: '#3F5372', rangerGreen: '#5B7A3A', rangerHat: '#C9A66B', policeBlue: '#2E4A7A', highwayGrey: '#6F7A87', coneOrange: '#F08A24',
  capitolWhite: '#F4F4F0', townHall3: '#E9E2D0', ballotBox: '#4A7BD0', booth: '#9CC4E4',
  diaryRed: '#B5372F', diarySpine: '#8B2F2A', mapInk: '#8B6A3A', mailSlot: '#2B3550', letterCream: '#FBF5E6', stampRed: '#D9534F', mapOld: '#EAD9B0', bookBlue: '#4F81BD', bookGreen: '#6B9B5A', signBoard: '#2F5D50',
  armyGreen: '#5B6B3A', helmet: '#4E5A32', soil3: '#9C7A52', plate3: '#F7F4EE', saltBlue: '#4F81BD', glow3: '#FFF3C4',
  wheat3: '#E6C15A', saltWhite: '#F7F7F2', waterBlue: '#7FC8E8', ovenGrey: '#9AA4AE', ovenDark: '#5A6470', mixerRed: '#D9534F', vanWhite: '#F4F4F0', bakeryWall: '#F7E3C9', bakeryAwning: '#E4574B', breadBrown: '#C98A4B', counter3: '#B07A4E',
};
const PAL3 = new Set([...A2.PAL2, ...Object.values(S3_SCENE).map((c) => c.toUpperCase())]);
const C = { ...A2.C, ...S3_SCENE };

/* ================================================================ small helpers */
const kid = (o) => person({ age: 'child', ...o });
const at = (x, y, s, inner) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">${inner}</g>`;
const txt = (x, y, t, size, fill = OUT, anchor = 'middle', weight = 800) => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${anchor}" font-family="Nunito, sans-serif" font-weight="${weight}" font-size="${f1(size)}" fill="${fill}">${t}</text>`;
/** the International Symbol of Access (a person in a wheelchair), white on blue, in a square of side s at (x, y) */
function accessSymbol(x, y, s) {
  const k = s / 20;
  return g('data-s3-drawn="access-symbol"', orect(x, y, s, s, C.accessBlue, 0.8) + `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})"><circle cx="9" cy="4" r="1.8" fill="#FFFFFF"/><path d="M9,6.5 L9,11 L14,11 L16,16" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M9,8.5 L13,8.5" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/><path d="M7.2,9.6 A4.6,4.6 0 1 0 13.4,15.4" fill="none" stroke="#FFFFFF" stroke-width="1.6"/></g>`);
}

/* ================================================================ G3-613: the three freedoms (0 0 160 100) */
function churchArt(x, y, s) {
  return g('data-s3-drawn="church"', at(x, y, s, orect(-14, -26, 28, 26, C.church, 1.2) + path('M-16,-25 L0,-38 L16,-25 Z', '#8C8C8C', 1.2) + orect(-5, -54, 10, 18, C.church, 1.1) + path('M-7,-53 L0,-62 L7,-53 Z', '#8C8C8C', 1) +
    line(0, -62, 0, -72, OUT, 1.6) + line(-3.5, -68.5, 3.5, -68.5, OUT, 1.6) + path('M-4,0 L-4,-10 Q0,-15 4,-10 L4,0 Z', '#8B5E3C', 1) + orect(-11, -20, 5, 8, C.glassBlue3, 0.8) + orect(6, -20, 5, 8, C.glassBlue3, 0.8)));
}
function synagogueArt(x, y, s) {
  const star6 = (cx, cy, r) => `<path d="M${f1(cx)},${f1(cy - r)} L${f1(cx + r * 0.866)},${f1(cy + r / 2)} L${f1(cx - r * 0.866)},${f1(cy + r / 2)} Z M${f1(cx)},${f1(cy + r)} L${f1(cx + r * 0.866)},${f1(cy - r / 2)} L${f1(cx - r * 0.866)},${f1(cy - r / 2)} Z" fill="none" stroke="#2E4A7A" stroke-width="1.5" stroke-linejoin="round"/>`;
  return g('data-s3-drawn="synagogue"', at(x, y, s, orect(-17, -34, 34, 34, C.synagogue, 1.2) + orect(-19, -38, 38, 5, '#B07A4E', 1.1) + g('data-s3-drawn="star-of-david"', star6(0, -26, 6.5)) +
    path('M-5,0 L-5,-11 Q0,-16 5,-11 L5,0 Z', '#8B5E3C', 1) + path('M-14,-6 L-14,-14 Q-11.5,-18 -9,-14 L-9,-6 Z', C.glassBlue3, 0.8) + path('M9,-6 L9,-14 Q11.5,-18 14,-14 L14,-6 Z', C.glassBlue3, 0.8)));
}
function mosqueArt(x, y, s) {
  return g('data-s3-drawn="mosque"', at(x, y, s, orect(-15, -24, 30, 24, C.mosque, 1.2) + path('M-12,-24 Q-12,-42 0,-44 Q12,-42 12,-24 Z', C.domeGold, 1.2) + line(0, -44, 0, -50, OUT, 1.2) +
    g('data-s3-drawn="crescent"', `<path d="M-1.8,-56 A4.2,4.2 0 1 0 2.6,-50.5 A3.2,3.2 0 1 1 -1.8,-56 Z" fill="${C.domeGold}" stroke="${OUT}" stroke-width="0.8"/>`) +
    orect(17, -46, 6, 46, C.mosque, 1.1) + path('M16,-46 L20,-53 L24,-46 Z', C.domeGold, 1) + path('M-5,0 L-5,-10 Q0,-15 5,-10 L5,0 Z', '#8B5E3C', 1) + path('M-12,-8 L-12,-15 Q-10,-18 -8,-15 L-8,-8 Z', C.glassBlue3, 0.8) + path('M8,-8 L8,-15 Q10,-18 12,-15 L12,-8 Z', C.glassBlue3, 0.8)));
}
/** speech: a grown-up stands at a town meeting and speaks (a speech bubble); three people listen; religion: a church, a
 *  synagogue and a mosque side by side; the press: a reporter with a notebook and a newspaper being read (no words on
 *  the newspaper, so a picture never matches a word on the card) */
function freedomArt(id, looks) {
  const bg = rect(0, 0, 160, 100, '#EEF6F8') + rect(0, 84, 160, 16, '#E6DBC6') + line(0, 84, 160, 84, OUT, 1);
  if (id === 'speech') {
    // review round 1: the speaker's hand open toward the listeners (never raised like a pointer), the bubble's tail from
    // her mouth
    const sp = grownUp({ ...looks[0] }, { s: 0.72, x: 36, y: 96, look: 1, la: [-5, 8, -3, 17], ra: [8, 6, 17, 7], tie: looks[0].sex !== 'f' }), hd = sp.head();
    const ls = [1, 2, 3].map((i) => grownUp({ ...looks[i] }, { s: 0.5, x: 92 + (i - 1) * 24, y: 96, look: -1, tie: looks[i].sex !== 'f' }).svg).join('');
    const mouth = [hd.x + hd.r * 0.45, hd.y + hd.r * 0.5];
    return g('data-s3-art-kind="speech"', bg + sp.svg + ls + bubble(40, 1, 52, 20, mouth[0], mouth[1], false, [0, 1, 2].map((q) => line(46, 6 + q * 5, 86 - q * 6, 6 + q * 5, OUT, 1.3)).join(''), `data-s3-tail="${f1(mouth[0])},${f1(mouth[1])}"`));
  }
  if (id === 'religion') return g('data-s3-art-kind="religion"', rect(0, 0, 160, 100, '#EEF6F8') + rect(0, 86, 160, 14, '#9CCB7C') + line(0, 86, 160, 86, OUT, 1) + churchArt(28, 88, 1.12) + synagogueArt(80, 88, 1.15) + mosqueArt(128, 88, 1.1));
  // the press (review round 1): a reporter holds up a folded newspaper (a dark masthead bar, headline lines, a photo and
  // columns, no words), a notebook in the other hand; a stack of newspapers on a newsstand behind
  const rp = grownUp({ ...looks[0] }, { s: 0.74, x: 40, y: 96, look: 1, la: [-5, 8, -2, 16], ra: [7, 4, 16, 2], tie: looks[0].sex !== 'f' });
  const hr = rp.hand('r'), hl = rp.hand('l');
  const pad = g('data-s3-drawn="notebook"', orect(hl[0] - 6, hl[1] - 10, 10, 13, '#FFFFFF', 1) + [0, 1, 2].map((q) => line(hl[0] - 4, hl[1] - 7 + q * 3.5, hl[0] + 2, hl[1] - 7 + q * 3.5, OUT, 0.6)).join(''));
  const px = hr[0] - 1, py = hr[1] - 22;
  const folded = g('data-s3-drawn="newspaper"', orect(px, py, 26, 32, C.newsprint, 1.2) + rect(px + 2.5, py + 2.5, 21, 5.5, OUT) + [0, 1].map((q) => line(px + 2.5, py + 11 + q * 3.6, px + 23.5, py + 11 + q * 3.6, OUT, 1.5)).join('') + orect(px + 2.5, py + 18.5, 10, 8, '#BFBFBF', 0.6) + [0, 1, 2].map((q) => line(px + 15, py + 19.5 + q * 3, px + 23.5, py + 19.5 + q * 3, C.newsGrey, 1)).join('') + line(px + 2.5, py + 29, px + 23.5, py + 29, C.newsGrey, 1) + line(px, py + 16, px + 26, py + 16, C.newsGrey, 0.5));
  const stand = g('data-s3-drawn="newsstand"', orect(112, 58, 40, 26, '#8B5E3C', 1.2) + [0, 1, 2, 3].map((q) => orect(116, 50 - q * 3, 32, 8, C.newsprint, 0.8) + rect(119, 51 - q * 3, 26, 2.4, OUT)).join(''));
  return g('data-s3-art-kind="press"', bg + stand + rp.svg + pad + folded);
}

/* ================================================================ G3-614: how people changed laws (0 0 170 100) */
/** small figures in a true scene, never a likeness: women of about 1915 marching with a VOTES FOR WOMEN banner; people
 *  marching for disability rights (two in wheelchairs) behind the access symbol; neighbors at a city council meeting
 *  (one speaks at a microphone holding the signatures, the council at its desk) */
function wheelchairPerson(x, y, look, s = 0.5) {
  // a grown-up SEATED in a wheelchair: the hips on the seat, the thighs forward, the shins down to the footrest, the
  // hands on the wheel's rim; the big wheel at the side, the backrest behind, a small front wheel (x, y: the ground)
  // review round 1: a GROWN-UP (batch S2's figure: a jacket, short hair or hair up, trousers), the chair's back and seat
  // drawn behind, the thighs along the seat, the knees forward, the shins down to the footrest, one hand on the wheel's
  // rim and one on the lap; the wheels in front
  const seatY = y - 24 * s;                                       // the seat, 24 units above the ground
  const p = grownUp({ ...look }, { s, x: x - 2 * s, y: seatY + BODY.adult.hipY * s, look: 1, bottom: 'pants', ll: [21, 1, 25, 18], rl: [20, 2, 26, 18], la: [4, 12, 12, 22], ra: [3, 12, 1, 23], tie: look.sex !== 'f' });
  const T = `transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"`;
  const back = `<g ${T} data-s3-drawn="wheelchair-seat"><path d="M-15,-60 L-15,-24 L19,-24" fill="none" stroke="${OUT}" stroke-width="3.2" stroke-linejoin="round"/><path d="M-15,-58 L-9,-58" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/></g>`;
  const front = `<g ${T} data-s3-drawn="wheelchair"><path d="M19,-24 L23,-6 L31,-6" fill="none" stroke="${OUT}" stroke-width="2.6" stroke-linejoin="round" data-s3-drawn="footrest"/><circle cx="0" cy="-15" r="15" fill="none" stroke="${OUT}" stroke-width="3"/><circle cx="0" cy="-15" r="11" fill="none" stroke="#9AA0A6" stroke-width="1.4"/><circle cx="0" cy="-15" r="2.4" fill="${OUT}"/><circle cx="26" cy="-4" r="4" fill="none" stroke="${OUT}" stroke-width="2.4"/></g>`;
  return g('data-s3-drawn="wheelchair-user" data-s3-seated="1"', back + p.svg + front);
}
function changeArt(id, looks) {
  const bg = rect(0, 0, 170, 100, '#EEF6F8') + rect(0, 86, 170, 14, '#C8C2B6') + line(0, 86, 170, 86, OUT, 1);
  if (id === 'vote') {
    // women of about 1915 marching: long dresses, wide hats, sashes; the two at the ends hold the banner's poles high
    const xs = [22, 58, 94, 130, 158];
    let s = bg;
    // review round 1: the women's skirts reach the ankle (1915); the middle marcher is a man in a jacket and a hat
    const MAN = 2;
    const fig = (x, i) => {
      const end = i === 0 || i === 4, la = [-3, 9, -2, 18], ra = end ? [5, -2, 7, -14] : [4, 9, 3, 18];
      if (i === MAN) {
        const p = grownUp({ ...looks[i % looks.length], sex: 'm', hair: 'short' }, { s: 0.6, x, y: 97, look: 1, la, ra, tie: true, jacket: '#4A4A4A' }), hd = p.head();
        return g('data-s3-drawn="marcher-1915-man"', p.svg + `<ellipse cx="${f1(hd.x)}" cy="${f1(hd.y - hd.r * 0.72)}" rx="${f1(hd.r * 1.35)}" ry="${f1(hd.r * 0.3)}" fill="#3A3530" stroke="${OUT}" stroke-width="0.8"/>` + `<path d="M${f1(hd.x - hd.r * 0.8)},${f1(hd.y - hd.r * 0.75)} Q${f1(hd.x - hd.r * 0.85)},${f1(hd.y - hd.r * 1.75)} ${f1(hd.x)},${f1(hd.y - hd.r * 1.75)} Q${f1(hd.x + hd.r * 0.85)},${f1(hd.y - hd.r * 1.75)} ${f1(hd.x + hd.r * 0.8)},${f1(hd.y - hd.r * 0.75)} Z" fill="#3A3530" stroke="${OUT}" stroke-width="0.8"/>`);
      }
      const top = ['#7A4E9C', '#3F5372', '#F7F4EE', '#2A9D8F', '#B07A4E'][i];
      const longSkirt = path('M-9,-47 L9,-47 L14,-1.5 L-14,-1.5 Z', top, 1.2) + `<path d="M-4,-40 L-6,-3 M4,-40 L6,-3" stroke="${OUT}" stroke-width="0.5" opacity="0.5"/>`;
      const o = { ...looks[i % looks.length], age: 'adult', s: 0.6, x, y: 97, bottom: 'dress', top, hair: 'bun', look: 1, la, ra, hold: longSkirt };
      const p = person(o), hd = p.head();
      return g('data-s3-drawn="marcher-1915" data-s3-skirt="ankle"', p.svg + `<ellipse cx="${f1(hd.x)}" cy="${f1(hd.y - hd.r * 0.8)}" rx="${f1(hd.r * 1.75)}" ry="${f1(hd.r * 0.42)}" fill="#4A4A4A" stroke="${OUT}" stroke-width="0.8"/>` + `<path d="M${f1(hd.x - hd.r * 0.75)},${f1(hd.y - hd.r * 0.9)} Q${f1(hd.x)},${f1(hd.y - hd.r * 2.1)} ${f1(hd.x + hd.r * 0.75)},${f1(hd.y - hd.r * 0.9)} Z" fill="#4A4A4A" stroke="${OUT}" stroke-width="0.8"/>` + line(x - 6.5, 97 - 0.6 * 70, x + 6.5, 97 - 0.6 * 48, C.sash, 2.6));
    };
    s += xs.map(fig).join('');
    // the banner between the two raised hands, well above the hats, its words inside it
    const h0 = person({ age: 'adult', s: 0.6, x: xs[0], y: 97, ra: [5, -2, 7, -14] }).hand('r'), h3 = person({ age: 'adult', s: 0.6, x: xs[4], y: 97, ra: [5, -2, 7, -14] }).hand('r');
    s += line(h0[0], h0[1] + 4, h0[0], 4, '#8B5E3C', 1.8) + line(h3[0], h3[1] + 4, h3[0], 4, '#8B5E3C', 1.8) + g('data-s3-sign="VOTES FOR WOMEN"', orect(h0[0], 5, h3[0] - h0[0], 19, C.banner, 1.2) + signText((h0[0] + h3[0]) / 2, 19, 'VOTES FOR WOMEN', 12, C.bannerRed));
    return g('data-s3-art-kind="vote"', s);
  }
  if (id === 'ada') {
    let s = bg;
    // review round 1: every marcher a grown-up (batch S2's figure: jackets, short hair or hair up, no caps or puffs)
    s += wheelchairPerson(28, 86, looks[0]) + wheelchairPerson(70, 86, looks[1]);
    const w1 = grownUp({ ...looks[2] }, { s: 0.56, x: 114, y: 96, look: 1, ra: [5, 5, 7, -5], tie: looks[2].sex !== 'f' }), hd = w1.hand('r');
    s += g('data-s3-drawn="marcher"', w1.svg) + grownUp({ ...looks[3] }, { s: 0.56, x: 148, y: 96, look: -1, tie: looks[3].sex !== 'f' }).svg;
    s += line(hd[0], hd[1], hd[0], 16, '#8B5E3C', 1.6) + accessSymbol(hd[0] - 12, 4, 24);
    return g('data-s3-art-kind="ada"', s);
  }
  // the crosswalk: a neighbor speaks at a microphone, a clipboard of signatures in hand; three council members at their desk
  let s = rect(0, 0, 170, 100, '#F4EBD9') + rect(0, 86, 170, 14, '#E6DBC6') + line(0, 86, 170, 86, OUT, 1);
  s += [0, 1, 2].map((i) => grownUp({ ...looks[i] }, { s: 0.44, x: 92 + i * 26, y: 74, look: -1, tie: looks[i].sex !== 'f' }).svg).join('');
  s += g('data-s3-drawn="council-desk"', orect(80, 56, 84, 8, '#B07A4E', 1.2) + orect(82, 64, 80, 22, '#8B5E3C', 1.1));
  // review round 1: the signature sheet held at chest height, clear of the face
  const nb = grownUp({ ...looks[3] }, { s: 0.6, x: 34, y: 96, look: 1, la: [-2, 14, 6, 23], tie: looks[3].sex !== 'f' }), h2 = nb.hand('l');
  s += g('data-s3-drawn="microphone"', line(52, 86, 52, 50, '#5A5A5A', 1.6) + `<ellipse cx="50" cy="47" rx="2.4" ry="3.2" fill="${OUT}"/>`) + nb.svg + g('data-s3-drawn="signatures"', orect(h2[0] - 5, h2[1] - 10, 12, 14, '#FFFFFF', 1) + rect(h2[0] - 2, h2[1] - 12, 6, 2.6, '#8C8C8C') + [0, 1, 2].map((q) => `<path d="M${f1(h2[0] - 3)},${f1(h2[1] - 6 + q * 3.6)} q2,-2 4,0 q2,2 4,0" fill="none" stroke="${OUT}" stroke-width="0.7"/>`).join(''));
  return g('data-s3-art-kind="crosswalk"', s);
}

/* ================================================================ G3-615: the sample town map and the sample state */
/** the symbol of one town place, centred on (x, y - 22) above its measuring dot at (x, y); px units (1 px = 1/96 inch) */
function scalePlace(id, x, y) {
  let s = '';
  const top = y - 8;
  if (id === 'school') s = orect(x - 16, top - 22, 32, 22, '#C96B4B', 1.2) + path(`M${f1(x - 19)},${f1(top - 21)} L${f1(x)},${f1(top - 33)} L${f1(x + 19)},${f1(top - 21)} Z`, '#A8483A', 1.2) + orect(x - 4, top - 12, 8, 12, '#8B5E3C', 1) + line(x + 14, top - 33, x + 14, top - 46, '#5A5A5A', 1.2) + rect(x + 14, top - 46, 9, 6, '#B22234');
  else if (id === 'park') s = rect(x - 22, top - 26, 44, 26, C.parkGreen) + `<rect x="${f1(x - 22)}" y="${f1(top - 26)}" width="44" height="26" fill="none" stroke="${OUT}" stroke-width="1"/>` + treeR(x - 11, top - 2, 24) + treeR(x + 10, top - 2, 20) + orect(x - 4, top - 7, 9, 3, '#B07A4E', 0.8);
  else if (id === 'library') s = orect(x - 18, top - 20, 36, 20, '#E9E2D0', 1.2) + path(`M${f1(x - 21)},${f1(top - 19)} L${f1(x)},${f1(top - 30)} L${f1(x + 21)},${f1(top - 19)} Z`, '#C9B98E', 1.2) + [-12, -5, 5, 12].map((dx) => orect(x + dx - 1.5, top - 17, 3, 15, '#FFFFFF', 0.7)).join('') + g('data-s3-drawn="book"', orect(x - 6, top - 29, 12, 8, '#4F81BD', 0.8) + line(x, top - 29, x, top - 21, '#FFFFFF', 0.8));
  else if (id === 'fire') s = orect(x - 18, top - 24, 36, 24, '#C96B4B', 1.2) + orect(x - 20, top - 27, 40, 4, '#A8483A', 1) + orect(x - 13, top - 15, 26, 15, '#5A5A5A', 1) + g('data-s3-drawn="fire-truck"', orect(x - 11, top - 11, 22, 9, C.truckRed, 0.8) + circ(x - 6, top - 1.5, 2, OUT, 0.4) + circ(x + 6, top - 1.5, 2, OUT, 0.4));
  else if (id === 'lake') s = `<ellipse cx="${f1(x)}" cy="${f1(top - 13)}" rx="27" ry="13" fill="${C.lake3}" stroke="${C.lakeEdge}" stroke-width="1.6"/>` + `<path d="M${f1(x - 12)},${f1(top - 15)} q4,-3 8,0 q4,3 8,0" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>`;
  return g(`data-s3-place="${id}"`, s + `<circle cx="${f1(x)}" cy="${f1(y)}" r="4" fill="${OUT}" data-s3-dot="${id}"/>`);
}
/**
 * the sample town map (w x h px, 1:1 on paper: 96 px = 1 inch): streets every inch from a quarter inch (fix round 1:
 * every place's dot sits ON a cross street), the five places at their points (px), a north arrow and the scale bar (one inch = one mile, drawn as a
 * true inch). Labels sit under each place's dot.
 */
function scaleTownMap(w, h, places, words) {
  const IN = 96;
  let s = rect(0, 0, w, h, C.block3) + `<rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="${OUT}" stroke-width="2"/>`;
  for (let x = IN * 0.25; x < w; x += IN) s += rect(x - 5, 0, 10, h, C.street3, ` data-s3-street="x${x / IN}"`);
  for (let y = IN * 0.25; y < h; y += IN) s += rect(0, y - 5, w, 10, C.street3, ` data-s3-street="y${y / IN}"`);
  for (const p of places) s += scalePlace(p.id, p.x, p.y);
  for (const p of places) { const t = words[p.id], tw = t.length * 7.2 + 8; s += g(`data-s3-label="${p.id}"`, `<rect x="${f1(p.x - tw / 2)}" y="${f1(p.y + 6)}" width="${f1(tw)}" height="16" rx="3" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.8"/>` + txt(p.x, p.y + 18, t, 12.5)); }
  return s;
}
/** a north arrow (an arrow pointing up with N above it), at (x, y) its foot, height hgt */
function northArrow(x, y, hgt) {
  return g('data-s3-drawn="north-arrow"', `<path d="M${f1(x)},${f1(y - hgt)} L${f1(x + 7)},${f1(y - hgt + 13)} L${f1(x + 2.2)},${f1(y - hgt + 11)} L${f1(x + 2.2)},${f1(y)} L${f1(x - 2.2)},${f1(y)} L${f1(x - 2.2)},${f1(y - hgt + 11)} L${f1(x - 7)},${f1(y - hgt + 13)} Z" fill="${OUT}"/>` + txt(x, y - hgt - 4, 'N', 15, OUT, 'middle', 900));
}
/** a scale bar: `n` segments of `seg` px each, the labels under the ticks */
function scaleBar(x, y, seg, n, labels, unit) {
  let s = '';
  for (let i = 0; i < n; i++) s += rect(x + i * seg, y, seg, 7, i % 2 ? '#FFFFFF' : OUT) ;
  s += `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(seg * n)}" height="7" fill="none" stroke="${OUT}" stroke-width="1.2"/>`;
  for (let i = 0; i <= n; i++) s += line(x + i * seg, y - 3, x + i * seg, y + 10, OUT, 1.2) + txt(x + i * seg, y + 22, labels[i], 12);
  s += txt(x + seg * n + 8, y + 9, unit, 12, OUT, 'start');
  return g('data-s3-drawn="scale-bar"', s);
}
/** the sample state (an invented state; the page says so): its outline, a river, five cities, the town as one red dot,
 *  its own scale bar (1 inch = 50 miles) and a north arrow; 0 0 w h px */
function sampleStateMap(w, h, cities, mirror) {
  const X = (x) => (mirror ? w - x : x);
  const pts = [[0.1, 0.08], [0.88, 0.06], [0.92, 0.42], [0.82, 0.48], [0.9, 0.9], [0.14, 0.92], [0.08, 0.5]].map(([a, b]) => [X(a * w), b * h * 0.86 + 6]);
  let s = rect(0, 0, w, h, '#FFFFFF') + path('M' + pts.map((p) => f1(p[0]) + ',' + f1(p[1])).join(' L') + ' Z', C.stateLand, 1.8);
  s += `<path d="M${f1(X(w * 0.2))},${f1(h * 0.12)} Q${f1(X(w * 0.45))},${f1(h * 0.35)} ${f1(X(w * 0.4))},${f1(h * 0.55)} T${f1(X(w * 0.6))},${f1(h * 0.78)}" fill="none" stroke="${C.river3}" stroke-width="2.4" data-s3-drawn="river"/>`;
  const spots = [[0.3, 0.22], [0.7, 0.2], [0.55, 0.42], [0.25, 0.66], [0.68, 0.7]];
  cities.forEach((c, i) => { const [a, b] = spots[i]; s += g(`data-s3-city="${i}"`, circ(X(a * w), b * h * 0.86 + 6, 3.2, C.cityDot, 0.5) + txt(X(a * w), b * h * 0.86 + 19, c, 10)); });
  const tx = X(w * 0.46), ty = h * 0.84 * 0.62 + 6;
  s += g('data-s3-drawn="town-dot"', circ(tx, ty, 4.2, C.townDot, 1) + `<circle cx="${f1(tx)}" cy="${f1(ty)}" r="8" fill="none" stroke="${C.townDot}" stroke-width="1.4"/>`);
  return { svg: s, town: [tx, ty] };
}

/* ================================================================ G3-616: the grid plate */
/** a 6 x 6 lettered and numbered grid (cells of `cell` px); level 1 draws the school and two streets in it (L1 = true) */
function gridPlate(cell, L1, keyIcons) {
  // review round 3: level 1 has a band above the grid (TOP px) where the up-down street's name plate stands UPRIGHT at the
  // street's top end (a child writes the name the right way up); the grid and everything on it moves down by TOP
  const o = 26, n = 6, W0 = o + n * cell + 2, TOP = L1 ? 34 : 0;
  let s = rect(0, 0, W0, W0 + TOP, '#FFFFFF'), streets = '', above = '';
  for (let i = 0; i < n; i++) s += txt(o + i * cell + cell / 2, 19, String.fromCharCode(65 + i), 18, '#2A9D8F', 'middle', 800) + txt(13, o + i * cell + cell / 2 + 6, String(i + 1), 18, '#2A9D8F', 'middle', 800);
  if (L1) {
    // review round 1: two streets with BLANK names for the class ("________ Street"), each name inside its street with
    // the center dashes stopped under it; a street across row 3's bottom edge and one down column C's right edge; the
    // school in square C4, its flag on the school's side of the curb
    // the streets go OVER the grid lines (drawn after them), so no line runs through a name
    // review round 2: the name plates are big enough to write in (0.31 by 1.7 inches, 1.25 inches of writing line), in
    // streets as wide as the plates; the plates fill the street between the crossing and the grid's edge
    const sw = 32, hy = o + 3 * cell, vx = o + 3 * cell, lw = Math.min(164, 3 * cell - sw / 2 - 12), lh = 30;
    const hx0 = vx + sw / 2 + 6;
    const dash = (x1, y1, x2, y2) => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${C.streetLine}" stroke-width="1.4" stroke-dasharray="7 6"/>`;
    // a name label: a white plate inside the street, a writing line for the name, then "Street"
    const plate = (x, y) => orect(x, y, lw, lh, '#FFFFFF', 0.9, ' rx="4"') + `<line x1="${f1(x + 5)}" y1="${f1(y + lh - 6)}" x2="${f1(x + lw - 40)}" y2="${f1(y + lh - 6)}" stroke="${OUT}" stroke-width="1" data-s3-plateline="1"/>` + txt(x + lw - 37, y + lh - 7, 'Street', 11.5, OUT, 'start');
    streets += g('data-s3-drawn="street" data-s3-street="across"', rect(o, hy - sw / 2, n * cell, sw, C.street3) + dash(o, hy, vx - sw / 2, hy) + dash(vx + sw / 2, hy, hx0 - 4, hy) + dash(hx0 + lw + 4, hy, o + n * cell, hy) + g('data-s3-streetname="across"', plate(hx0, hy - lh / 2)));
    // review round 3: the up-down street runs up out of the grid to its name plate, which stands upright above the grid
    // (never turned on its side); the street's center dashes run its whole length
    streets += g('data-s3-drawn="street" data-s3-street="down"', rect(vx - sw / 2, o, sw, n * cell, C.street3) + dash(vx, o, vx, hy - sw / 2) + dash(vx, hy + sw / 2, vx, o + n * cell));
    above += g('data-s3-drawn="street-end"', rect(vx - sw / 2, lh + 2, sw, TOP - lh - 2 + o, C.street3)) + g('data-s3-streetname="down"', plate(vx - lw / 2, 2));
    streets += g('data-s3-drawn="school-in-c4"', at(o + 2.4 * cell, o + 3.75 * cell, cell / 85, keyIcons.school));
  }
  for (let i = 0; i <= n; i++) s += line(o + i * cell, o, o + i * cell, o + n * cell, '#B9C3CC', 1.4) + line(o, o + i * cell, o + n * cell, o + i * cell, '#B9C3CC', 1.4);
  s += streets;
  s += `<rect x="${o}" y="${o}" width="${n * cell}" height="${n * cell}" fill="none" stroke="#2A9D8F" stroke-width="3"/>`;
  if (TOP) s = rect(0, 0, W0, W0 + TOP, '#FFFFFF') + above + `<g transform="translate(0 ${TOP})">${s.slice(rect(0, 0, W0, W0 + TOP, '#FFFFFF').length)}</g>`;
  return { svg: s, size: W0, height: W0 + TOP };
}
/** key symbols (0 0 64 64 around the centre (0, 0)): school, house, park, store */
const KEY_ICONS = {
  school: orect(-20, -10, 40, 26, '#C96B4B', 1.4) + path('M-24,-9 L0,-24 L24,-9 Z', '#A8483A', 1.4) + orect(-5, 2, 10, 14, '#8B5E3C', 1) + line(17, -24, 17, -38, '#5A5A5A', 1.4) + rect(17, -38, 11, 7, '#B22234'),
  house: orect(-16, -6, 32, 22, '#F7C948', 1.4) + path('M-20,-5 L0,-22 L20,-5 Z', '#8C8C8C', 1.4) + orect(-4, 4, 8, 12, '#8B5E3C', 1),
  park: treeR(-10, 18, 34) + treeR(12, 18, 28) + orect(-6, 10, 14, 4, '#B07A4E', 0.9),
  // a place to eat (review round 1): a plate with a fork and a knife
  eat: circ(0, 2, 17, '#F7F4EE', 1.4) + circ(0, 2, 11, '#FFFFFF', 1) + `<path d="M-25,-14 L-25,-4 M-28,-14 L-28,-6 Q-28,-2 -25,-2 Q-22,-2 -22,-6 L-22,-14 M-25,-2 L-25,18" fill="none" stroke="${OUT}" stroke-width="2" stroke-linecap="round"/><path d="M25,-14 Q30,-6 25,2 L25,18" fill="none" stroke="${OUT}" stroke-width="2.2" stroke-linecap="round"/>`,
  store: orect(-20, -10, 40, 26, '#F4EBD9', 1.4) + [0, 1, 2, 3].map((q) => path(`M${-20 + q * 10},-10 L${-10 + q * 10},-10 L${-10 + q * 10},-3 Q${-15 + q * 10},1 ${-20 + q * 10},-3 Z`, q % 2 ? '#FFFFFF' : '#E4574B', 0.8)).join('') + orect(-14, 2, 14, 12, '#DDEFF5', 0.9) + orect(4, 2, 9, 14, '#8B5E3C', 0.9),
};

/* ================================================================ G3-617: the two US maps (one frame) */
/**
 * a map of the lower 48 (data/social/dk-social-3-geo.js), w px wide: kind 'people' (the population dots) or 'land' (the
 * landforms, the Great Lakes and the big rivers); marks: [{ letter, x, y }] in frame units (each letter in a white disc,
 * on the same point on both maps). uid keeps the clip path ids of two maps apart.
 */
function usLiveMap(kind, w, marks, uid) {
  const k = w / GEO.w, h = GEO.h * k;
  let s = `<defs><clipPath id="s3us-${uid}"><path d="${GEO.US.d}"/></clipPath><clipPath id="s3fr-${uid}"><rect x="0" y="0" width="${GEO.w}" height="${GEO.h}"/></clipPath></defs>`;
  s += `<g transform="scale(${Math.round(k * 100000) / 100000})"><g clip-path="url(#s3fr-${uid})"><rect x="-10" y="-10" width="${GEO.w + 20}" height="${GEO.h + 20}" fill="${C.sea3}"/><path d="${GEO.neighbours.CAN} ${GEO.neighbours.MEX}" fill="${kind === 'land' ? C.neighbourLand : C.neighbour}" stroke="#B9B4AC" stroke-width="${f1(0.8 / k)}"/>`;
  if (kind === 'people') {
    s += `<path d="${GEO.US.d}" fill="${C.popLand}" stroke="${OUT}" stroke-width="${f1(1.2 / k)}" data-s3-us="1"/>` + Object.values(GEO.lakes).map((d) => `<path d="${d}" fill="${C.lake3}" stroke="${C.lakeEdge}" stroke-width="${f1(0.6 / k)}" data-s3-lake="1"/>`).join('');
    const r = 1.05 / k;
    s += `<g data-s3-dots="${GEO.dots.length}" fill="${C.dotInk}">` + GEO.dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${f1(r)}"/>`).join('') + '</g>';
  } else {
    s += `<path d="${GEO.US.d}" fill="${C.physLand}" stroke="${OUT}" stroke-width="${f1(1.2 / k)}" data-s3-us="1"/>`;
    s += `<g clip-path="url(#s3us-${uid})"><path d="${GEO.regions.plains}" fill="${C.plains3}" data-s3-region="plains"/><path d="${GEO.regions.desert}" fill="${C.desert3}" data-s3-region="desert"/>` +
      `<path d="${GEO.regions.desert}" fill="url(#s3sand-${uid})"/><path d="${GEO.regions.mountains}" fill="${C.mountain3}" data-s3-region="mountains"/><path d="${GEO.regions.mountains}" fill="url(#s3peak-${uid})"/></g>`;
    s += `<path d="${GEO.US.d}" fill="none" stroke="${OUT}" stroke-width="${f1(1.2 / k)}"/>`;
    s += Object.values(GEO.lakes).map((d) => `<path d="${d}" fill="${C.lakePhys}" stroke="${C.lakeEdge}" stroke-width="${f1(0.6 / k)}" data-s3-lake="1"/>`).join('');
    s += Object.values(GEO.rivers).map((d) => `<path d="${d}" fill="none" stroke="${C.riverPhys}" stroke-width="${f1(1.5 / k)}" stroke-linejoin="round" data-s3-river="1"/>`).join('');
    // the patterns: small peaks for the mountains, short sand lines for the deserts (they read in black and white)
    const pk = 14 / k, sd = 10 / k;
    s = s.replace('<defs>', `<defs><pattern id="s3peak-${uid}" patternUnits="userSpaceOnUse" width="${f1(pk)}" height="${f1(pk * 0.8)}"><path d="M${f1(pk * 0.2)},${f1(pk * 0.6)} L${f1(pk * 0.45)},${f1(pk * 0.2)} L${f1(pk * 0.7)},${f1(pk * 0.6)}" fill="none" stroke="${C.mountainDark}" stroke-width="${f1(0.9 / k)}"/></pattern><pattern id="s3sand-${uid}" patternUnits="userSpaceOnUse" width="${f1(sd)}" height="${f1(sd * 0.7)}"><path d="M${f1(sd * 0.2)},${f1(sd * 0.35)} L${f1(sd * 0.55)},${f1(sd * 0.35)}" stroke="${C.desertLine}" stroke-width="${f1(0.9 / k)}"/></pattern>`);
  }
  s += '</g></g>';
  for (const m of marks) s += g(`data-s3-mark="${m.letter}" data-s3-place="${m.id}"`, circ(m.x * k, m.y * k, 7.5, '#FFFFFF', 1.4) + txt(m.x * k, m.y * k + 4.2, m.letter, 12, OUT, 'middle', 900));
  return { svg: s, h, k };
}
/** the keys of the two maps (px; each an svg of its own) */
function peopleKey() { return circ(8, 9, 2.4, C.dotInk, 0) + txt(16, 13, '= 100,000 people', 12.5, OUT, 'start'); }
// review round 3: the key names every colour the land map fills (two rows): mountains, desert, plains, other land (the
// cream: lowland, hills and valleys that are none of those); lake, river, ocean, other countries
function landKey() {
  const sw = (x, y, fill, extra = '') => `<rect x="${x}" y="${y}" width="16" height="12" fill="${fill}" stroke="${OUT}" stroke-width="0.8" data-s3-keyfill="${fill}"/>` + extra;
  return sw(2, 3, C.mountain3, `<path d="M5,13 L9,6 L13,13" fill="none" stroke="${C.mountainDark}" stroke-width="1"/>`) + txt(21, 13, 'mountains', 12, OUT, 'start') +
    sw(92, 3, C.desert3, `<path d="M95,9 L101,9 M100,13 L106,13" stroke="${C.desertLine}" stroke-width="1"/>`) + txt(111, 13, 'desert', 12, OUT, 'start') +
    sw(160, 3, C.plains3) + txt(179, 13, 'plains (flat land)', 12, OUT, 'start') +
    sw(286, 3, C.physLand) + txt(305, 13, 'other land', 12, OUT, 'start') +
    sw(2, 22, C.lakePhys) + txt(21, 32, 'lake', 12, OUT, 'start') + line(56, 28, 74, 28, C.riverPhys, 2.4) + txt(78, 32, 'river', 12, OUT, 'start') +
    sw(120, 22, C.sea3) + txt(139, 32, 'ocean', 12, OUT, 'start') + sw(190, 22, C.neighbourLand) + txt(209, 32, 'other countries', 12, OUT, 'start');
}

module.exports.__part1 = { S3_SCENE, PAL3, C, kid, at, txt, accessSymbol, freedomArt, changeArt, scalePlace, scaleTownMap, northArrow, scaleBar, sampleStateMap, gridPlate, KEY_ICONS, usLiveMap, peopleKey, landKey, churchArt, synagogueArt, mosqueArt, wheelchairPerson };

/* ================================================================ G3-618: a sample state with its resources (0 0 430 320) */
/**
 * an invented state (the page says so), north at the top: the sea and its harbor on the east side (west when mirror), a
 * river from the hills to the sea, farmland along it, a forest in the north, a mine in the hills, a dry, rocky land; the
 * three town sites marked with letters (sites: { river, dry, harbor } -> letter). Labels name the land, never a site.
 */
function resourceStateArt(sites, mirror) {
  const W0 = 430, H0 = 320, X = (x) => (mirror ? W0 - x : x), M = (d) => (mirror ? d.replace(/(-?[\d.]+),(-?[\d.]+)/g, (m, a, b) => f1(W0 - +a) + ',' + b) : d);
  let s = rect(0, 0, W0, H0, C.sea3);
  s += g('data-s3-drawn="land"', path(M('M8,8 L330,8 L338,70 L318,96 L352,118 L340,180 L356,240 L322,312 L8,312 Z'), C.stateLand, 2));
  // the harbor: a bay in the coast with a dock and a boat
  s += g('data-s3-drawn="harbor"', path(M('M326,100 Q290,112 300,140 Q316,152 344,146'), C.sea3, 1.6) + path(M('M300,124 L318,124 L318,129 L300,129 Z'), C.harborDock, 1) + path(M('M318,132 L338,132 L334,140 L322,140 Z'), '#FFFFFF', 1) + line(X(328), 132, X(328), 118, OUT, 1.2) + path(M('M329,119 L340,129 L329,129 Z'), '#FFFFFF', 0.8));
  // the river: from the hills in the north-west down to the sea in the south-east
  s += `<path d="${M('M70,40 Q120,90 150,150 Q180,210 250,236 Q300,252 345,262')}" fill="none" stroke="${C.river3}" stroke-width="6" stroke-linecap="round" data-s3-drawn="river"/>`;
  // farmland along the river (fields in rows)
  s += g('data-s3-drawn="farmland"', [[150, 176, 56, 34], [210, 200, 54, 30], [196, 252, 60, 30]].map(([x, y, w, h]) => path(M(`M${x},${y} L${x + w},${y} L${x + w},${y + h} L${x},${y + h} Z`), C.field3, 1) + [1, 2, 3].map((q) => line(X(x), y + q * h / 4, X(x + w), y + q * h / 4, C.fieldLine, 1.2)).join('')).join(''));
  // the forest in the north
  s += g('data-s3-drawn="forest"', [[188, 46], [210, 34], [232, 50], [254, 36], [276, 52], [218, 66], [244, 70], [268, 68]].map(([x, y]) => K.pine(X(x), y + 14, 26)).join(''));
  // the mine in the hills by the forest, at the north edge (review round 1: far from the dry, rocky site and from every
  // other site, so no site 'has minerals')
  s += g('data-s3-drawn="mine"', path(M('M104,66 L132,22 L160,66 Z'), C.rock3, 1.4) + path(M('M140,66 L162,36 L184,66 Z'), C.rock3, 1.4) + path(M('M124,66 L124,54 Q132,45 140,54 L140,66 Z'), C.mineDark, 1.2) + path(M('M142,58 L154,58 L154,66 L142,66 Z'), '#9AA0A6', 1) + circ(X(145), 67, 2, OUT, 0.4) + circ(X(151), 67, 2, OUT, 0.4));
  // the dry, rocky land in the south-west
  s += g('data-s3-drawn="dry-rocky"', path(M('M14,206 L120,200 L136,250 L110,306 L14,306 Z'), C.rockTan, 1.2) + [[38, 230], [70, 252], [96, 226], [52, 282], [92, 286]].map(([x, y]) => path(M(`M${x - 8},${y} L${x - 2},${y - 8} L${x + 7},${y - 5} L${x + 9},${y} Z`), C.rock3, 1)).join('') + [[64, 222], [30, 262]].map(([x, y]) => line(X(x), y, X(x), y - 10, '#8B5E3C', 1.2) + line(X(x), y - 6, X(x - 4), y - 10, '#8B5E3C', 1)).join(''));
  // the words for the land (never on a site)
  const lab = (x, y, t) => g(`data-s3-landlabel="${t}"`, `<rect x="${f1(X(x) - t.length * 3.6 - 4)}" y="${y - 11}" width="${f1(t.length * 7.2 + 8)}" height="15" rx="3" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.7"/>` + txt(X(x), y, t, 11.5));
  s += lab(234, 30, 'forest') + lab(144, 84, 'mine') + lab(74, 196, 'dry, rocky land') + lab(250, 300, 'farmland') + lab(120, 168, 'river') + lab(386, 96, 'harbor') + lab(392, 40, 'sea');
  // the sites
  for (const [id, letter] of Object.entries(sites)) { const [x, y] = RESOURCE_SITES[id]; s += g(`data-s3-site="${id}"`, circ(X(x), y, 11, '#FFFFFF', 1.8) + txt(X(x), y + 5.5, letter, 15, OUT, 'middle', 900)); }
  s += northArrow(X(400), 304, 40);   // review round 2: in the sea on every copy (X mirrors it once)
  return s;
}
const RESOURCE_SITES = { river: [196, 224], dry: [70, 262], harbor: [300, 146] };

/* ================================================================ G3-619: the level cards' pictures (0 0 100 100) */
function serviceIcon(id, looks) {
  const bg = rect(0, 0, 100, 100, '#EAF2EE');
  if (id === 'park') return bg + rect(0, 70, 100, 30, C.parkGreen) + treeR(24, 76, 50) + treeR(78, 80, 40) + g('data-s3-drawn="bench"', orect(36, 72, 26, 4, '#B07A4E', 1) + line(39, 76, 39, 84, OUT, 1.6) + line(59, 76, 59, 84, OUT, 1.6) + orect(36, 64, 26, 3, '#B07A4E', 0.9));
  if (id === 'fire') return bg + rect(0, 82, 100, 18, '#B9B4AC') + g('data-s3-drawn="fire-truck"', orect(8, 50, 62, 32, C.truckRed, 1.4) + orect(70, 58, 24, 24, C.truckRed, 1.4) + orect(74, 62, 14, 10, '#DDEFF5', 1) + orect(12, 44, 54, 6, '#C9CDD2', 1) + [16, 24, 32, 40, 48, 56].map((x) => line(x, 44, x, 50, OUT, 0.8)).join('') + circ(24, 84, 7, OUT, 1) + circ(78, 84, 7, OUT, 1) + circ(24, 84, 2.5, '#C9CDD2', 0.5) + circ(78, 84, 2.5, '#C9CDD2', 0.5) + rect(80, 54, 8, 4, '#4A7BD0'));
  if (id === 'trash') return bg + rect(0, 82, 100, 18, '#B9B4AC') + g('data-s3-drawn="trash-truck"', orect(6, 44, 58, 38, C.trashGreen3, 1.4) + orect(64, 56, 28, 26, C.trashGreen3, 1.4) + orect(68, 60, 16, 10, '#DDEFF5', 1) + [18, 30, 42, 54].map((x) => line(x, 48, x, 78, '#2E6B45', 1.2)).join('') + circ(22, 84, 7, OUT, 1) + circ(76, 84, 7, OUT, 1));
  if (id === 'highway') return rect(0, 0, 100, 100, '#EEF6F8') + rect(0, 58, 100, 42, C.parkGreen) + path('M30,58 L70,58 L100,100 L0,100 Z', C.highwayGrey, 1.2) + `<path d="M50,60 L50,66 M50,72 L50,80 M50,86 L50,98" stroke="#F4C542" stroke-width="2.4"/>` + g('data-s3-drawn="highway-sign"', line(84, 72, 84, 44, '#5A5A5A', 1.8) + orect(74, 26, 20, 18, '#FFFFFF', 1.2) + `<path d="M77,31 L91,31 M77,36 L89,36" stroke="${OUT}" stroke-width="1.6"/>`) + treeR(14, 62, 26);
  if (id === 'license') return rect(0, 0, 100, 100, '#EAF2EE') + g('data-s3-drawn="license-card"', orect(10, 24, 80, 52, C.licenseBlue, 1.6, ' rx="5"') + rect(12, 26, 76, 10, '#2E4A7A') + orect(16, 42, 24, 28, '#FFFFFF', 1) + circ(28, 52, 6, '#F0C08F', 0.8) + path('M19,70 Q28,58 37,70 Z', '#4A7BD0', 0.8) + [46, 54, 62].map((y) => line(46, y, 82, y, '#5A6E8C', 2)).join(''));
  if (id === 'mail') return rect(0, 0, 100, 100, '#EAF2EE') + g('data-s3-drawn="mailbox"', orect(28, 34, 40, 40, C.mailBlue3, 1.6, ' rx="8"') + orect(34, 44, 28, 6, C.mailSlot, 1) + line(38, 74, 38, 92, OUT, 2.4) + line(58, 74, 58, 92, OUT, 2.4)) + g('data-s3-drawn="letter"', orect(58, 10, 32, 21, '#FFFFFF', 1.2) + `<path d="M58,10 L74,23 L90,10" fill="none" stroke="${OUT}" stroke-width="1"/>` + rect(81, 13, 6, 6, C.stampRed));
  if (id === 'natpark') return rect(0, 0, 100, 100, '#EEF6F8') + path('M0,70 L26,30 L46,58 L66,20 L100,70 Z', '#9AA0A6', 1.4) + path('M60,30 L66,20 L72,30 Z', '#FFFFFF', 0.8) + rect(0, 70, 100, 30, C.parkGreen) + K.pine(18, 94, 32) + K.pine(84, 96, 28) + K.pine(52, 96, 24);
  if (id === 'money') return rect(0, 0, 100, 100, '#EAF2EE') + at(6, 16, 0.88, A1.dollarArt()) + `<g transform="translate(14 52)">${A1.usCoin('quarter', 18, 'sq')}</g><g transform="translate(56 58)">${A1.usCoin('penny', 14, 'sp')}</g>`;
  throw new Error('serviceIcon: ' + id);
}
/** a leader card's picture: one grown-up at a lectern (the mayor, the governor, the president) or a group at a long desk
 *  (the city council, the state legislature, Congress) — batch S2's drawings, a role and never a likeness */
const leaderIcon = (id, looks) => (['council', 'legislature', 'congress'].includes(id) ? A2.leaderGroup(looks.slice(1, id === 'congress' ? 9 : 5), id === 'congress' ? 2 : 1) : A2.leaderOne(looks[0]));

/* ================================================================ G3-620: three columns holding up a roof */
/** a building (w x h px): a roof with its words, three columns, the steps */
function branchesArt(w, h, roofWord) {
  const cw = Math.min(w * 0.1, h * 0.32), xs = [w * 0.2, w * 0.5, w * 0.8], roofH = h * 0.32, baseY = h - 12;
  let s = path(`M${f1(w * 0.03)},${f1(roofH)} L${f1(w / 2)},${f1(3)} L${f1(w * 0.97)},${f1(roofH)} Z`, C.roof3, 2) + orect(w * 0.03, roofH, w * 0.94, 12, C.columnShade, 1.6) + txt(w / 2, roofH * 0.82, roofWord, Math.max(12.5, Math.min(17, h * 0.1)), OUT);
  for (const [i, x] of xs.entries()) {
    s += g(`data-s3-column="${i}"`, orect(x - cw / 2 - 3, roofH + 12, cw + 6, 6, C.columnShade, 1.2) + orect(x - cw / 2, roofH + 18, cw, baseY - roofH - 26, C.column, 1.6) + [0.25, 0.5, 0.75].map((t) => line(x - cw / 2 + cw * t, roofH + 20, x - cw / 2 + cw * t, baseY - 10, C.columnShade, 1.4)).join('') + orect(x - cw / 2 - 3, baseY - 8, cw + 6, 6, C.columnShade, 1.2));
  }
  s += orect(w * 0.01, baseY - 2, w * 0.98, 6, C.stepGrey, 1.2) + orect(0, baseY + 4, w, 7, C.stepGrey, 1.2);
  return { svg: s, xs, cw };
}

/* ================================================================ G3-621: where taxes go */
/** who pays: a family and a shop owner, money in hand (0 0 160 100) */
function taxPayersArt(looks) {
  // review round 1: everyone faces the arrow (right); the shop owner and the parent drop money into a box marked with
  // a dollar sign at the arrow's start (never two people paying each other)
  const bg = rect(0, 0, 160, 100, '#EEF6F8') + rect(0, 86, 160, 14, '#E6DBC6') + line(0, 86, 160, 86, OUT, 1);
  const shop = g('data-s3-drawn="shop"', orect(2, 30, 44, 56, '#F4EBD9', 1.2) + [0, 1, 2, 3].map((q) => path(`M${2 + q * 11},30 L${13 + q * 11},30 L${13 + q * 11},38 Q${7.5 + q * 11},42 ${2 + q * 11},38 Z`, q % 2 ? '#FFFFFF' : '#4A7BD0', 0.8)).join('') + orect(6, 46, 18, 18, '#DDEFF5', 1) + orect(29, 52, 12, 34, '#8B5E3C', 1));
  const box0 = g('data-s3-drawn="tax-box"', orect(124, 56, 32, 30, '#4A7BD0', 1.3) + rect(130, 55, 20, 3, OUT) + txt(140, 78, '$', 17, '#FFFFFF', 'middle', 900));
  const p2 = grownUp(looks[2], { s: 0.56, x: 62, y: 96, look: 1, ra: [7, 4, 15, 4], tie: looks[2].sex !== 'f' }), h2 = p2.hand('r');
  const c1 = kid({ ...looks[1], s: 0.46, x: 84, y: 96, look: 1 });
  const p1 = grownUp(looks[0], { s: 0.58, x: 104, y: 96, look: 1, ra: [8, 2, 18, -4], tie: looks[0].sex !== 'f' }), h1 = p1.hand('r');
  const money = (x, y) => g('data-s3-drawn="money"', orect(x - 7, y - 4, 14, 7, A1.S1_SCENE.bill, 0.8));
  const coin = (x, y) => g('data-s3-drawn="coin"', circ(x, y, 3, '#C9CDD2', 0.6));
  return bg + shop + box0 + p2.svg + money(h2[0] + 6, h2[1] - 1) + c1.svg + p1.svg + money(h1[0] + 5, h1[1] - 2) + coin(140, 50);
}
/** the three governments that collect taxes: the town hall, the state capitol, the U.S. Capitol (0 0 210 96) */
function governmentsArt() {
  // review round 1: each building labeled with its word-box word and what it is ("local: our town")
  const bld = (x, w, h, dome, w1, w2, id) => g(`data-s3-gov="${id}"`, orect(x, 76 - h, w, h, C.capitolWhite, 1.3) + [0.15, 0.35, 0.55, 0.75].map((t) => orect(x + w * t, 76 - h + 10, w * 0.08, h - 14, '#FFFFFF', 0.7)).join('') + (dome ? path(`M${f1(x + w * 0.25)},${76 - h} Q${f1(x + w * 0.25)},${f1(76 - h - w * 0.34)} ${f1(x + w / 2)},${f1(76 - h - w * 0.36)} Q${f1(x + w * 0.75)},${f1(76 - h - w * 0.34)} ${f1(x + w * 0.75)},${76 - h} Z`, C.capitolWhite, 1.3) + line(x + w / 2, 76 - h - w * 0.36, x + w / 2, 76 - h - w * 0.46, OUT, 1) : path(`M${x - 2},${76 - h} L${x + w / 2},${76 - h - 14} L${x + w + 2},${76 - h} Z`, C.roof3, 1.2)) + txt(x + w / 2, 91, w1, 12, '#146B5E', 'middle', 900) + txt(x + w / 2, 104, w2, 11));
  return rect(0, 0, 210, 110, '#EEF6F8') + rect(0, 76, 210, 34, '#E6DBC6') + bld(10, 52, 30, false, 'local:', 'our town', 'local') + bld(78, 54, 34, true, 'state:', 'our state', 'state') + bld(146, 56, 38, true, 'national:', 'our country', 'national');
}
/** a service the taxes pay for (0 0 120 90): the picture only, its words are on the page */
function taxServiceArt(id, looks) {
  // review round 2: level 1 shows the pictures taller still (0 -45 120 135): the sky runs up to -45, with clouds (or the
  // highway sign, the flag, the stars) in it, so the picture fills its card
  const sky = rect(0, -45, 120, 135, '#EEF6F8');
  const clouds = cloud(10, -26, 0.8) + cloud(70, -14, 0.7);
  if (id === 'firetruck') return sky + clouds + rect(0, 76, 120, 14, '#B9B4AC') + g('data-s3-drawn="fire-truck"', orect(14, 42, 66, 32, C.truckRed, 1.4) + orect(80, 50, 26, 24, C.truckRed, 1.4) + orect(84, 54, 15, 10, '#DDEFF5', 1) + orect(18, 36, 58, 6, '#C9CDD2', 1) + circ(30, 76, 7, OUT, 1) + circ(90, 76, 7, OUT, 1));
  if (id === 'books') return rect(0, -45, 120, 135, '#F4EBD9') + g('data-s3-drawn="wall-clock"', circ(60, -18, 15, '#FFFFFF', 1.4) + line(60, -18, 60, -28, OUT, 1.6) + line(60, -18, 67, -14, OUT, 1.6) + circ(60, -18, 1.6, OUT, 0)) + g('data-s3-drawn="bookshelf"', orect(14, 10, 92, 72, '#B07A4E', 1.4) + [34, 58].map((y) => orect(18, y, 84, 3, '#8B5E3C', 0.8)).join('') + [[20, 14, 8, 20, '#C0504D'], [29, 16, 7, 18, '#4F81BD'], [37, 13, 9, 21, '#9BBB59'], [47, 15, 8, 19, '#F79646'], [56, 14, 7, 20, '#8064A2'], [20, 38, 9, 20, '#4F81BD'], [30, 40, 7, 18, '#F4C542'], [38, 39, 8, 19, '#C0504D'], [48, 38, 9, 20, '#9BBB59'], [20, 62, 8, 18, '#8064A2'], [29, 63, 9, 17, '#F79646'], [39, 62, 7, 18, '#4F81BD']].map(([x, y, w, h, c]) => orect(x, y, w, h, c, 0.7)).join('')) + g('data-s3-drawn="new-books"', orect(70, 20, 30, 12, '#4F81BD', 1) + orect(72, 44, 28, 12, '#C0504D', 1));
  if (id === 'street') return sky + house(6, 26, 34, 26, '#F7C948') + house(80, 24, 34, 28, '#9CC4E4') + rect(0, 54, 120, 36, '#B9B4AC') + g('data-s3-drawn="patch"', orect(40, 62, 40, 16, '#4A4A4A', 1)) + [28, 90].map((x) => path(`M${x - 5},84 L${x},70 L${x + 5},84 Z`, C.coneOrange, 1)).join('');
  if (id === 'highway') return sky + rect(0, 46, 120, 44, C.parkGreen) + path('M40,46 L80,46 L120,90 L0,90 Z', C.highwayGrey, 1.2) + g('data-s3-drawn="patch"', orect(46, 66, 30, 12, '#4A4A4A', 1)) + [24, 94].map((x) => path(`M${x - 5},86 L${x},72 L${x + 5},86 Z`, C.coneOrange, 1)).join('') + treeR(12, 48, 22);
  // review round 1 (level 1 prints no level word): trash pickup, a driver's license, a highway patrol car, soldiers who
  // protect our country, astronauts who explore space
  if (id === 'trash') return sky + clouds + rect(0, 76, 120, 14, '#B9B4AC') + g('data-s3-drawn="trash-truck"', orect(8, 36, 66, 40, C.trashGreen3, 1.4) + orect(74, 48, 32, 28, C.trashGreen3, 1.4) + orect(78, 52, 18, 11, '#DDEFF5', 1) + [22, 36, 50, 64].map((x) => line(x, 40, x, 72, '#2E6B45', 1.2)).join('') + circ(26, 77, 7, OUT, 1) + circ(88, 77, 7, OUT, 1)) + g('data-s3-drawn="trash-cans"', orect(108, 62, 10, 14, '#6F7A87', 1) + rect(107, 60, 12, 3, OUT));
  if (id === 'license') return sky + g('data-s3-drawn="license-card"', orect(14, 14, 92, 62, C.licenseBlue, 1.6, ' rx="6"') + rect(16, 16, 88, 12, '#2E4A7A') + orect(20, 34, 28, 34, '#FFFFFF', 1) + circ(34, 46, 7, '#F0C08F', 0.8) + path('M23,68 Q34,54 45,68 Z', '#4A7BD0', 0.8) + [40, 49, 58].map((y) => line(54, y, 98, y, '#5A6E8C', 2.2)).join(''));
  // review round 2: the patrol car on a highway: a wide road with lane lines and a green highway sign over it (an arrow, no
  // word), so the picture supports the word "highway" (a city police car would be on a town street)
  if (id === 'patrol') return sky + cloud(84, -34, 0.6) + rect(0, 66, 120, 24, '#9AA0A6') + `<line x1="0" y1="78" x2="120" y2="78" stroke="#FFFFFF" stroke-width="1.6" stroke-dasharray="8 6"/>` + g('data-s3-drawn="highway-sign"', orect(14, -26, 4, 92, '#8C8C8C', 0.8) + orect(102, -26, 4, 92, '#8C8C8C', 0.8) + orect(8, -30, 104, 30, C.trashGreen3, 1.4, ' rx="3"') + `<rect x="12" y="-27" width="96" height="24" rx="2" fill="none" stroke="#FFFFFF" stroke-width="1.4"/><path d="M60,-6 L60,-20 M53,-14 L60,-21 L67,-14" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`) + g('data-s3-drawn="patrol-car"', path('M14,74 L14,58 L30,58 L40,44 L80,44 L90,58 L106,58 L106,74 Z', '#FFFFFF', 1.4) + rect(14, 62, 92, 6, C.policeBlue) + orect(44, 48, 16, 10, '#DDEFF5', 0.9) + orect(62, 48, 16, 10, '#DDEFF5', 0.9) + orect(52, 38, 8, 6, '#E4574B', 1) + orect(60, 38, 8, 6, C.policeBlue, 1) + circ(34, 76, 7, OUT, 1) + circ(88, 76, 7, OUT, 1));
  if (id === 'soldiers') {
    const sol = (x, lk, i) => { const p = grownUp({ skin: looks[i].skin, sex: looks[i].sex, hairColor: looks[i].hairColor, hair: looks[i].hair }, { s: 0.5, x, y: 88, jacket: C.armyGreen, bottomColor: C.armyGreen, look: lk }), hd = p.head(); return g('data-s3-drawn="soldier"', p.svg + `<path d="M${f1(hd.x - hd.r * 1.15)},${f1(hd.y - hd.r * 0.15)} Q${f1(hd.x - hd.r * 1.15)},${f1(hd.y - hd.r * 1.45)} ${f1(hd.x)},${f1(hd.y - hd.r * 1.45)} Q${f1(hd.x + hd.r * 1.15)},${f1(hd.y - hd.r * 1.45)} ${f1(hd.x + hd.r * 1.15)},${f1(hd.y - hd.r * 0.15)} Z" fill="${C.helmet}" stroke="${OUT}" stroke-width="0.8"/>`); };
    return sky + clouds + rect(0, 76, 120, 14, '#C8C2B6') + flagPole(98, 78, 58, 20) + sol(30, 1, 0) + sol(62, 1, 1);
  }
  if (id === 'astronauts') {
    const rocket = g('data-s3-drawn="rocket"', path('M88,14 Q96,22 96,40 L96,70 L80,70 L80,40 Q80,22 88,14 Z', '#FFFFFF', 1.4) + path('M80,58 L72,72 L80,70 Z', '#E4574B', 1) + path('M96,58 L104,72 L96,70 Z', '#E4574B', 1) + circ(88, 38, 5, '#9CC4E4', 1) + rect(76, 76, 24, 4, '#6F7A87'));
    const p = grownUp({ skin: looks[0].skin, sex: looks[0].sex, hairColor: looks[0].hairColor, hair: looks[0].hair }, { s: 0.52, x: 40, y: 88, jacket: '#F4F4F0', bottomColor: '#F4F4F0', look: 1, ra: [6, 6, 12, 4] }), hd = p.head();
    const helmet = `<circle cx="${f1(hd.x)}" cy="${f1(hd.y)}" r="${f1(hd.r * 1.55)}" fill="#F4F4F0" stroke="${OUT}" stroke-width="1"/><ellipse cx="${f1(hd.x + hd.r * 0.15)}" cy="${f1(hd.y + hd.r * 0.05)}" rx="${f1(hd.r * 0.95)}" ry="${f1(hd.r * 0.8)}" fill="#9CC4E4" stroke="${OUT}" stroke-width="0.8"/>`;
    return rect(0, -45, 120, 135, '#2E4A7A') + g('data-s3-drawn="earth"', circ(96, -24, 13, '#4F81BD', 1.2) + path('M88,-30 Q94,-34 98,-28 Q102,-22 96,-18 Q90,-20 88,-30 Z', C.parkGreen, 0.8) + path('M100,-16 Q106,-18 106,-12 Q102,-10 100,-16 Z', C.parkGreen, 0.6)) + [[10, 10], [30, 22], [56, 8], [108, 12], [64, 30], [16, 40], [14, -30], [44, -38], [62, -14], [30, -6]].map(([x, y]) => circ(x, y, 1.4, '#FFFFFF', 0)).join('') + rect(0, 76, 120, 14, '#9AA0A6') + rocket + g('data-s3-drawn="astronaut"', p.svg + helmet);
  }
  if (id === 'statepolice') return sky + rect(0, 76, 120, 14, '#B9B4AC') + g('data-s3-drawn="police-car"', path('M14,74 L14,58 L30,58 L40,44 L80,44 L90,58 L106,58 L106,74 Z', '#FFFFFF', 1.4) + rect(14, 62, 92, 6, C.policeBlue) + orect(44, 48, 16, 10, '#DDEFF5', 0.9) + orect(62, 48, 16, 10, '#DDEFF5', 0.9) + orect(52, 38, 16, 6, '#E4574B', 1) + circ(34, 76, 7, OUT, 1) + circ(88, 76, 7, OUT, 1));
  if (id === 'ranger') {
    const p = grownUp({ skin: looks[0].skin, sex: looks[0].sex, hairColor: looks[0].hairColor, hair: looks[0].hair }, { s: 0.5, x: 60, y: 88, jacket: C.rangerGreen, look: 0 }), hd = p.head();
    const hat = `<ellipse cx="${f1(hd.x)}" cy="${f1(hd.y - hd.r * 0.8)}" rx="${f1(hd.r * 1.8)}" ry="${f1(hd.r * 0.36)}" fill="${C.rangerHat}" stroke="${OUT}" stroke-width="0.8"/><path d="M${f1(hd.x - hd.r * 0.8)},${f1(hd.y - hd.r * 0.85)} L${f1(hd.x - hd.r * 0.5)},${f1(hd.y - hd.r * 1.8)} L${f1(hd.x + hd.r * 0.5)},${f1(hd.y - hd.r * 1.8)} L${f1(hd.x + hd.r * 0.8)},${f1(hd.y - hd.r * 0.85)} Z" fill="${C.rangerHat}" stroke="${OUT}" stroke-width="0.8"/>`;
    return sky + path('M0,62 L30,22 L52,50 L76,14 L120,62 Z', '#9AA0A6', 1.4) + rect(0, 62, 120, 28, C.parkGreen) + K.pine(16, 86, 30) + K.pine(104, 88, 26) + g('data-s3-drawn="ranger"', p.svg + hat);
  }
  throw new Error('taxServiceArt: ' + id);
}

/* ================================================================ G3-622: three ways to decide (0 0 100 70) */
function decideArt(id, looks) {
  const bg = rect(0, 0, 100, 70, '#EEF6F8') + rect(0, 60, 100, 10, '#E6DBC6');
  if (id === 'class') return bg + [0, 1, 2, 3].map((i) => P({ ...looks[i], age: 'child', s: 0.42, x: 16 + i * 22, y: 66, look: 0, ra: i % 2 ? [4, -6, 6, -16] : undefined })).join('');
  if (id === 'council') return bg + [0, 1, 2].map((i) => grownUp(looks[i], { s: 0.32, x: 52 + i * 18, y: 50, look: -1, tie: looks[i].sex !== 'f' }).svg).join('') + orect(42, 38, 56, 6, '#B07A4E', 1) + orect(44, 44, 52, 16, '#8B5E3C', 1) + grownUp(looks[3], { s: 0.42, x: 16, y: 66, look: 1, ra: [4, -4, 6, -14], tie: looks[3].sex !== 'f' }).svg;
  return bg + g('data-s3-drawn="ballot-box"', orect(52, 38, 32, 22, C.ballotBox, 1.2) + rect(60, 37, 16, 3, OUT) + orect(62, 26, 12, 14, '#FFFFFF', 1) + `<path d="M64,33 L67,36 L72,29" fill="none" stroke="${OUT}" stroke-width="1.2"/>`) + grownUp(looks[0], { s: 0.42, x: 30, y: 66, look: 1, ra: [5, 2, 12, -2], tie: looks[0].sex !== 'f' }).svg;
}

/* ================================================================ G3-623: the problem (0 0 320 150) */
/** a sample street: the homes on one side, the park on the other, cars going fast, no crosswalk; a child and a grown-up
 *  wait on the homes' side */
function problemArt(looks) {
  let s = rect(0, 0, 320, 150, '#D6EBC8');
  s += g('data-s3-drawn="homes"', house(10, 26, 40, 30, '#F7C948') + house(150, 24, 40, 32, '#9CC4E4') + house(206, 26, 40, 30, '#E9E2D0'));
  s += g('data-s3-drawn="busy-street"', rect(0, 68, 320, 44, '#7A7F86') + rect(0, 62, 320, 6, '#C8C2B6') + rect(0, 112, 320, 6, '#C8C2B6') + `<path d="M0,90 L320,90" stroke="#F4C542" stroke-width="2" stroke-dasharray="14 10"/>`);
  const car = (x, y, c, dir) => g('data-s3-drawn="car"', path(dir > 0 ? `M${x},${y} L${x},${y - 9} L${x + 9},${y - 9} L${x + 15},${y - 17} L${x + 33},${y - 17} L${x + 38},${y - 9} L${x + 46},${y - 9} L${x + 46},${y} Z` : `M${x + 46},${y} L${x + 46},${y - 9} L${x + 37},${y - 9} L${x + 31},${y - 17} L${x + 13},${y - 17} L${x + 8},${y - 9} L${x},${y - 9} L${x},${y} Z`, c, 1.2) + circ(x + 11, y + 1, 4.5, OUT, 1) + circ(x + 35, y + 1, 4.5, OUT, 1) + [0, 1, 2].map((q) => line(dir > 0 ? x - 6 - q * 3 : x + 52 + q * 3, y - 12 + q * 4, dir > 0 ? x - 16 - q * 3 : x + 62 + q * 3, y - 12 + q * 4, OUT, 1.2)).join(''));
  s += car(150, 86, '#4A7BD0', 1) + car(40, 108, '#D9534F', -1);
  s += g('data-s3-drawn="park"', rect(0, 118, 320, 32, '#9CCB7C') + treeR(24, 146, 30) + treeR(292, 146, 30) + g('data-s3-drawn="bench"', orect(58, 134, 30, 4, '#B07A4E', 0.9) + orect(58, 126, 30, 3.5, '#B07A4E', 0.9) + line(62, 129, 62, 134, OUT, 1.2) + line(84, 129, 84, 134, OUT, 1.2) + line(61, 138, 61, 146, OUT, 1.6) + line(85, 138, 85, 146, OUT, 1.6)) + g('data-s3-drawn="swing"', line(150, 124, 150, 148, OUT, 1.4) + line(176, 124, 176, 148, OUT, 1.4) + line(148, 124, 178, 124, OUT, 1.6) + line(158, 125, 158, 140, OUT, 0.8) + line(168, 125, 168, 140, OUT, 0.8) + rect(156, 140, 14, 3, '#E4574B')) + sign(222, 124, 50, 16, 'PARK', 11));
  s += P({ ...looks[0], age: 'child', s: 0.5, x: 108, y: 62, look: 1 }) + grownUp(looks[1], { s: 0.6, x: 88, y: 62, look: 1, tie: looks[1].sex !== 'f' }).svg;
  return s;
}

/* ================================================================ G3-624: the sources (0 0 100 80) */
function sourceArt(id) {
  const bg = rect(0, 0, 100, 80, '#F4F1EA');
  if (id === 'diary') return bg + g('data-s3-drawn="diary"', orect(24, 10, 52, 62, C.diaryRed, 1.6, ' rx="3"') + rect(28, 10, 4, 62, C.diarySpine) + orect(68, 34, 12, 12, '#D9A520', 1) + circ(74, 40, 2, OUT, 0.4) + orect(38, 22, 28, 12, '#F7F1DC', 0.8));
  if (id === 'photo') return bg + g('data-s3-drawn="old-photo"', orect(16, 8, 68, 62, '#FAFAFA', 1.2) + toGrey(rect(22, 14, 56, 44, '#DDEFF5') + rect(22, 46, 56, 12, '#9CCB7C') + orect(34, 28, 32, 20, '#C0504D', 1) + path('M30,29 L50,18 L70,29 Z', '#8B5E3C', 1) + orect(46, 38, 8, 10, '#7B4A26', 0.8)) + orect(22, 14, 56, 44, 'none', 0.8));
  if (id === 'letter') return bg + g('data-s3-drawn="letter"', orect(10, 26, 46, 34, C.letterCream, 1.2) + `<path d="M10,26 L33,44 L56,26" fill="none" stroke="${OUT}" stroke-width="1"/>` + rect(46, 29, 7, 8, C.stampRed) + orect(44, 10, 46, 56, '#FFFFFF', 1.2) + [20, 27, 34, 41, 48, 55].map((y) => `<path d="M50,${y} q4,-2 8,0 q4,2 8,0 q4,-2 8,0 q4,2 8,0" fill="none" stroke="#5A6E8C" stroke-width="0.9"/>`).join(''));
  if (id === 'map') return bg + g('data-s3-drawn="old-map"', path('M10,12 L90,12 L90,68 L10,68 Z', C.mapOld, 1.4) + `<path d="M20,24 L80,24 M20,40 L80,40 M20,56 L80,56 M32,16 L32,64 M50,16 L50,64 M68,16 L68,64" stroke="#8B6A3A" stroke-width="1.6"/>` + `<path d="M12,62 Q40,50 60,58 T90,50" fill="none" stroke="#5E9EC0" stroke-width="2.4"/>` + orect(36, 28, 8, 8, C.mapInk, 0.6) + orect(56, 44, 8, 8, C.mapInk, 0.6));
  if (id === 'newspaper') return bg + g('data-s3-drawn="newspaper"', orect(14, 8, 72, 64, C.newsprint, 1.4) + rect(20, 13, 60, 8, C.newsGrey) + orect(20, 25, 28, 18, '#BFBFBF', 0.8) + [0, 1, 2].map((q) => line(52, 27 + q * 6, 80, 27 + q * 6, C.newsGrey, 1.6)).join('') + [0, 1, 2, 3].map((q) => line(20, 50 + q * 5.5, 48, 50 + q * 5.5, C.newsGrey, 1.6) + line(52, 50 + q * 5.5, 80, 50 + q * 5.5, C.newsGrey, 1.6)).join(''));
  if (id === 'textbook') return bg + g('data-s3-drawn="textbook"', orect(14, 14, 36, 52, '#FFFFFF', 1.2) + orect(50, 14, 36, 52, '#FFFFFF', 1.2) + orect(18, 20, 28, 16, '#9CC4E4', 0.8) + [42, 48, 54, 60].map((y) => line(18, y, 46, y, '#8A8276', 1.4)).join('') + [20, 26, 32, 38, 44, 50, 56].map((y) => line(54, y, 82, y, '#8A8276', 1.4)).join(''));
  if (id === 'encyclopedia') return bg + g('data-s3-drawn="encyclopedia"', [[16, C.bookBlue], [34, C.bookGreen], [52, C.bookBlue], [70, C.bookGreen]].map(([x, c]) => orect(x, 12, 16, 58, c, 1.2) + rect(x + 3, 20, 10, 3, '#D9A520') + rect(x + 3, 58, 10, 3, '#D9A520')).join(''));
  if (id === 'museum') return bg + g('data-s3-drawn="museum-sign"', line(36, 50, 30, 76, OUT, 2) + line(64, 50, 70, 76, OUT, 2) + orect(14, 8, 72, 44, C.signBoard, 1.4) + orect(20, 14, 22, 18, '#E9E2D0', 0.8) + [16, 22, 28, 34, 40].map((y) => line(46, y, 80, y, '#F4F1EA', 1.4)).join('') + line(20, 40, 80, 40, '#F4F1EA', 1.4));
  throw new Error('sourceArt: ' + id);
}

/* ================================================================ G3-626: sample photographs of about 1900, in greys (0 0 400 250) */
function thenPhotoArt(id, looks) {
  if (id === 'travel') return A2.oldPhotoArt(looks);   // batch S2's street: a horse and wagon, a streetcar, one early car
  if (id === 'light') {
    let s = rect(0, 0, 400, 250, '#E9E2D0') + rect(0, 196, 400, 54, '#B07A4E');
    s += g('data-s3-drawn="table"', orect(100, 150, 200, 12, '#8B5E3C', 1.4) + orect(116, 162, 10, 50, '#8B5E3C', 1.2) + orect(274, 162, 10, 50, '#8B5E3C', 1.2));
    // review round 1: the oil lamp as a lamp: a lighter glow behind, a round base, the burner, a glass chimney with the
    // flame inside it, short light rays
    s += g('data-s3-drawn="oil-lamp-glow"', `<circle cx="190" cy="94" r="40" fill="${C.glow3}"/>` + [[-1, -1], [1, -1], [-1, 0.2], [1, 0.2], [0, -1.3]].map(([dx, dy]) => line(190 + dx * 30, 94 + dy * 30, 190 + dx * 40, 94 + dy * 40, '#F7A21B', 2)).join(''));
    s += g('data-s3-drawn="oil-lamp"', orect(174, 146, 32, 5, '#C9A13B', 1.2) + path('M172,146 Q170,124 190,122 Q210,124 208,146 Z', '#C9A13B', 1.4) + orect(182, 114, 16, 9, '#8B5E3C', 1.1) + path('M183,114 Q174,100 183,86 L185,66 L195,66 L197,86 Q206,100 197,114 Z', '#FFFFFF', 1.2, ' fill-opacity="0.75"') + `<path d="M190,110 Q183,100 190,88 Q197,100 190,110 Z" fill="#F7A21B" stroke="${OUT}" stroke-width="0.8"/>`);
    s += g('data-s3-drawn="candle"', orect(250, 140, 30, 10, '#C9A13B', 1) + orect(258, 104, 14, 36, '#FFFFFF', 1.2) + line(265, 104, 265, 98, OUT, 1) + `<path d="M265,98 Q260,90 265,82 Q270,90 265,98 Z" fill="#F7A21B" stroke="${OUT}" stroke-width="0.8"/>`);
    // review round 1: the woman's skirt reaches the ankle (about 1900); her hands together in front, above the skirt
    s += person({ ...looks[0], age: 'adult', s: 1.15, x: 60, y: 236, look: 1, top: '#5A5A5A', hair: 'bun', bottom: 'dress', la: [-4, 10, 2, 20], ra: [4, 10, -2, 20], hold: path('M-9,-47 L9,-47 L14,-1.5 L-14,-1.5 Z', '#5A5A5A', 1.2) }).svg;
    // review round 2: the girl wears a dress of about 1900 to mid-calf (never modern pants), her hair in braids
    s += g('data-s3-drawn="girl-1900" data-s3-skirt="mid-calf"', person({ ...looks[1], sex: 'f', age: 'child', s: 1.0, x: 346, y: 230, look: -1, top: '#8C8C8C', hair: 'braids', bottom: 'dress', la: [-3, 7, 1, 12], ra: [3, 7, -1, 12], hold: path('M-8.2,-30 L8.2,-30 L14.5,-15 L15,-5 L-15,-5 L-14.5,-15 Z', '#8C8C8C', 1.1, ' data-s3-skirtpath="1"') }).svg);
    return toGrey(s);
  }
  if (id === 'messages') {
    let s = rect(0, 0, 400, 250, '#E9E2D0') + rect(0, 186, 400, 64, '#B07A4E');
    s += sign(116, 14, 168, 28, 'TELEGRAPH', 20, '#FFFFFF', OUT);
    s += line(330, 50, 330, 186, '#8B5E3C', 4) + line(316, 60, 344, 60, '#8B5E3C', 3) + line(290, 64, 400, 56, OUT, 0.9) + line(290, 70, 400, 62, OUT, 0.9);
    const clerk = grownUp({ ...looks[0], sex: 'm' }, { s: 1.0, x: 200, y: 160, look: 0, la: [-6, 6, -8, 10], ra: [6, 6, 10, 9], tie: true });
    s += clerk.svg + g('data-s3-drawn="counter"', orect(60, 150, 290, 16, '#8B5E3C', 1.4) + orect(70, 166, 270, 40, '#B07A4E', 1.2));
    s += g('data-s3-drawn="telegraph-key"', orect(214, 140, 40, 10, '#5A5A5A', 1) + line(222, 138, 248, 134, OUT, 2) + circ(248, 134, 3, OUT, 0.5));
    s += g('data-s3-drawn="letters"', orect(90, 128, 34, 22, '#FFFFFF', 1) + `<path d="M90,128 L107,141 L124,128" fill="none" stroke="${OUT}" stroke-width="1"/>` + orect(128, 132, 30, 18, '#FFFFFF', 1));
    return toGrey(s);
  }
  // school: a one-room schoolhouse with its bell, children going in
  let s = rect(0, 0, 400, 250, '#DDEFF5') + rect(0, 190, 400, 60, '#9CCB7C');
  s += g('data-s3-drawn="one-room-school"', orect(110, 100, 180, 96, '#C0504D', 1.6) + path('M96,104 L200,44 L304,104 Z', '#8B5E3C', 1.6) + orect(182, 18, 36, 34, '#F7F4EE', 1.2) + path('M176,20 L200,4 L224,20 Z', '#8B5E3C', 1.2) + `<path d="M193,44 Q200,26 207,44 Z" fill="#E6B422" stroke="${OUT}" stroke-width="1"/>` + orect(184, 140, 32, 56, '#7B4A26', 1.2) + orect(128, 130, 34, 34, '#DDEFF5', 1) + orect(238, 130, 34, 34, '#DDEFF5', 1));
  s += [[70, 'f', 0], [326, 'm', 1], [358, 'f', 2]].map(([x, sex, i]) => P({ ...looks[i % looks.length], age: 'child', s: 0.9, x, y: 236, look: x < 200 ? 1 : -1, bottom: sex === 'f' ? 'dress' : 'pants', hair: sex === 'f' ? 'braids' : 'short' })).join('');
  return toGrey(s);
}

/* ================================================================ G3-627: the bakery (0 0 420 150) */
/** the bakery: its building with an awning, the baker shaping dough at the counter, the cashier at the register, the
 *  oven and the mixer, sacks of flour, a water tap, a salt jar, the delivery van and wheat outside. No word but BAKERY. */
function bakeryArt(looks) {
  let s = rect(0, 0, 420, 150, '#EEF6F8') + rect(0, 138, 420, 12, '#B9B4AC');
  s += g('data-s3-drawn="building"', orect(6, 26, 300, 112, C.bakeryWall, 1.6) + Array.from({ length: 10 }, (_, q) => path(`M${6 + q * 30},26 L${36 + q * 30},26 L${36 + q * 30},36 Q${21 + q * 30},42 ${6 + q * 30},36 Z`, q % 2 ? '#FFFFFF' : C.bakeryAwning, 0.9)).join('') + sign(106, 5, 100, 18, 'BAKERY', 13));
  s += g('data-s3-drawn="oven"', orect(14, 56, 58, 70, C.ovenGrey, 1.4) + orect(20, 80, 46, 30, C.ovenDark, 1.2) + orect(24, 64, 38, 8, '#C9CDD2', 0.9) + `<path d="M28,96 Q43,86 58,96" fill="#F7A21B" stroke="${OUT}" stroke-width="0.8"/>`);
  s += g('data-s3-drawn="mixer"', orect(78, 94, 36, 6, '#5A6470', 1) + orect(104, 56, 9, 40, C.mixerRed, 1.1) + orect(80, 52, 34, 11, C.mixerRed, 1.2, ' rx="4"') + line(90, 63, 90, 78, '#9AA4AE', 2) + path('M82,76 L100,76 L97,93 L85,93 Z', '#C9CDD2', 1.2));
  s += g('data-s3-drawn="counter"', orect(120, 100, 180, 38, C.counter3, 1.4));
  const baker = grownUp(looks[0], { s: 0.82, x: 150, y: 128, look: 1, la: [-4, 8, 4, 14], ra: [4, 8, 10, 14] }), bh = baker.head();
  s += baker.svg + g('data-s3-drawn="dough"', `<ellipse cx="158" cy="97" rx="12" ry="5" fill="#F3E6C4" stroke="${OUT}" stroke-width="1"/>`) + g('data-s3-drawn="baker-hat"', path(`M${f1(bh.x - bh.r * 0.9)},${f1(bh.y - bh.r * 0.7)} L${f1(bh.x - bh.r)},${f1(bh.y - bh.r * 2)} Q${f1(bh.x)},${f1(bh.y - bh.r * 2.7)} ${f1(bh.x + bh.r)},${f1(bh.y - bh.r * 2)} L${f1(bh.x + bh.r * 0.9)},${f1(bh.y - bh.r * 0.7)} Z`, '#FFFFFF', 1));
  const cashier = grownUp(looks[1], { s: 0.82, x: 252, y: 128, look: -1, la: [-4, 8, -8, 14], tie: looks[1].sex !== 'f' });
  s += cashier.svg + g('data-s3-drawn="cash-register"', orect(206, 88, 30, 14, '#5A6470', 1.2) + orect(212, 80, 18, 8, '#DDEFF5', 1));
  s += g('data-s3-drawn="bread"', [[272, 93], [288, 95]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="${C.breadBrown}" stroke="${OUT}" stroke-width="1"/>`).join(''));
  s += g('data-s3-drawn="flour-sacks"', [[84, 116], [102, 118]].map(([x, y]) => path(`M${x - 8},${y + 18} L${x - 9},${y + 2} Q${x},${y - 4} ${x + 9},${y + 2} L${x + 8},${y + 18} Z`, '#F7F4EE', 1.2)).join(''));
  s += g('data-s3-drawn="water-tap"', line(116, 60, 116, 52, '#9AA4AE', 3) + line(116, 52, 126, 52, '#9AA4AE', 3) + `<path d="M126,55 L126,62" stroke="${C.waterBlue}" stroke-width="2"/>`);
  // review round 1: a salt shaker standing on the counter (a white body, a silver top with holes)
  s += g('data-s3-drawn="salt"', orect(186, 84, 12, 16, C.saltWhite, 1.1, ' rx="2"') + path('M186,85 Q186,78 192,78 Q198,78 198,85 Z', '#C9CDD2', 1) + [189, 192, 195].map((x) => circ(x, 81.5, 0.7, OUT, 0)).join(''));
  // review round 1: a small wheat field on its own strip of soil beside the van: stalks with grain heads and whiskers
  s += g('data-s3-drawn="wheat-field"', rect(310, 128, 40, 10, C.soil3) + line(310, 128, 350, 128, OUT, 0.8) + [314, 321, 328, 335, 342, 348].map((x, i) => { const top = 86 + (i % 2) * 5; return line(x, 128, x, top + 8, '#C9A13B', 1.3) + `<ellipse cx="${x}" cy="${top + 2}" rx="2.6" ry="6.5" fill="${C.wheat3}" stroke="${OUT}" stroke-width="0.6"/>` + [-1, 1].map((sd) => line(x + sd * 1.6, top - 2, x + sd * 4.5, top - 8, '#C9A13B', 0.8)).join('') + line(x, top - 4, x, top - 10, '#C9A13B', 0.8) + line(x, top + 16, x + 4, top + 12, '#6B9B5A', 1.2); }).join(''));
  s += g('data-s3-drawn="delivery-van"', path('M354,132 L354,96 L392,96 L404,108 L416,111 L416,132 Z', C.vanWhite, 1.4) + orect(392, 100, 9, 9, '#DDEFF5', 1) + circ(366, 134, 7, OUT, 1) + circ(404, 134, 7, OUT, 1));
  return s;
}

module.exports = { ...module.exports.__part1, resourceStateArt, RESOURCE_SITES, serviceIcon, leaderIcon, branchesArt, taxPayersArt, governmentsArt, taxServiceArt, decideArt, problemArt, sourceArt, thenPhotoArt, bakeryArt };
delete module.exports.__part1;
