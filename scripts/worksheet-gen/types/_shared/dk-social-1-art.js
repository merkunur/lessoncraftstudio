/**
 * dk-social-1-art.js — the drawings of the Batch S1 Grade 1 social studies pages (Daily Teaching System Stage D-5,
 * 2026-11-24): the places of the rules page, the good-citizen stories, the leaders and the places they lead, the old
 * postcard, the interview clues, long ago and today, three communities, the land and its workers, the park, the symbols,
 * the Washington and Lincoln sources, the reading of 1776, the people who made life fairer, goods and services, the
 * jobs, the savings jar, the class meeting. Built on the Batch SK figure and palette (types/_shared/dk-social-k-art.js:
 * person(), the skin tones, PAL), which is NOT edited.
 *
 * Pure functions that return SVG markup; NOTHING here reads a picture or the cache while the module loads (the server has
 * no picture cache). Every colour is in PAL1 = the SK palette + S1_SCENE below (qa/verify-dk-social-1.js fails any other).
 * Scenes use a 0 0 200 140 view box unless noted; objects and icons 0 0 100 100.
 */
'use strict';
const K = require('./dk-social-k-art.js');
const TOK = require('../../primitives/_tokens.js');
const T = TOK.color;
const { person, armTo, f1, OUT, SKIN, HAIR, CLOTH, BODY, tree, sun } = K;

/* ================================================================ the new scenery colours + PAL1 */
const S1_SCENE = {
  board: '#2F5D50', boardLine: '#E9F2EE', chalk: '#F4F1EA', poolBlue: '#7FC8E8', poolDeep: '#4FA3D1', tile: '#E8EEF2', laneRed: '#E4574B',
  asphalt: '#7A7F86', asphaltDark: '#5F646B', curb: '#C8C2B6', stripe: '#F7F7F2', signal: '#2F3338', redLight: '#E03C31', greenLight: '#3FB56B', amber: '#F2B233',
  bookA: '#C0504D', bookB: '#4F81BD', bookC: '#9BBB59', bookD: '#F79646', bookE: '#8064A2', paper: '#FFFDF5', fishOrange: '#F28C28', tank: '#CFEAF4',
  townHall: '#E9E2D0', dome: '#C9B98E', mapState: '#F28C28', mapUS: '#9CCB7C', mapPale: '#EEF3E6', lake: '#BFE3F2',
  g1: '#F2F2F2', g2: '#D9D9D9', g3: '#BFBFBF', g4: '#A6A6A6', g5: '#8C8C8C', g6: '#737373', g7: '#595959', g8: '#404040', g9: '#262626', sepia: '#F3EAD8', stamp: '#5A6E8C',
  wheat: '#E6C15A', wheatDark: '#C9A13B', field: '#B9D98A', silo: '#B9C3CC', barn: '#B5372F', sea: '#4F9FD0', seaLight: '#8CC7E8', rock: '#9AA0A6', rockDark: '#6E747A', pineDark: '#2E6B45', sail: '#FFFFFF',
  bronze: '#9C6B3C', bronzeDark: '#6E4A26', yoke: '#7A5230', copper: '#7FB5A2', copperDark: '#5E9583', torch: '#F7A21B', marble: '#F1EEE6', marbleShade: '#D8D3C8', goldFrame: '#C9A13B', goldDark: '#9C7A22', silver: '#C9CDD2', silverDark: '#9AA0A6',
  colonialBlue: '#2E4A7A', buff: '#E8D3A2', parchment: '#F5E9C8', ink: '#2B2522', busYellow: '#F4C542', busOrange: '#F39C40', seat: '#4A7BD0',
  jarGlass: '#EAF6FA', jarLid: '#8C8C8C', bill: '#8DBF8B', billDark: '#4E8A4C', tagWhite: '#FFFFFF', hoop: '#B07A4E', slate: '#4A4A4A', pail: '#A7B3BE',
  laptop: '#5A6470', screenGame: '#7EC8E3', schoolNew: '#D98E5F', glassBlue: '#9CD3F0', redBarn: '#B5372F',
  lawnDeep: '#7FB86A', barnRoof: '#8B3A2E', marbleIn: '#E6E1D6', pennyCopper: '#D08A5A', pennyDark: '#9C5B2E',
  plastic: '#EDEDED', canRed: '#D9534F', trashGreen: '#3F8F5A', soil: '#8B5E3C', petal: '#E98AB0', petal2: '#F4C542', petal3: '#C3A6E0', stem: '#3F9B4B', footprint: '#7A5230',
};
const PAL1 = new Set([...K.PAL, ...Object.values(S1_SCENE).map((c) => c.toUpperCase())]);
const C = S1_SCENE;

/* ================================================================ small helpers */
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${fill}"${extra}/>`;
const orect = (x, y, w, h, fill, sw = 1.2, extra = '') => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}"${extra}/>`;
const line = (x1, y1, x2, y2, c = OUT, w = 1.2, extra = '') => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${c}" stroke-width="${w}"${extra}/>`;
const circ = (x, y, r, fill, sw = 1.2, extra = '') => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}"${extra}/>`;
const path = (d, fill, sw = 1.2, extra = '') => `<path d="${d}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}" stroke-linejoin="round"${extra}/>`;
const g = (attrs, inner) => `<g ${attrs}>${inner}</g>`;
const P = (o) => person(o).svg;
/** a figure sitting on a chair whose seat is at seatY (view px): front view, the thighs toward us, the shins down */
const sitting = (o, seatY) => { const s = o.s || 1, Bd = BODY[o.age || 'adult']; return { ll: [-4, 3, -5, Bd.leg * 0.55], rl: [4, 3, 5, Bd.leg * 0.55], ...o, y: seatY + s * Bd.hipY }; };
const wallFloor = (floorY, wc = '#F4EBD9', fc = '#E6DBC6', w = 200) => rect(0, 0, w, floorY, wc) + rect(0, floorY, w, 140 - floorY + 60, fc) + line(0, floorY, w, floorY, OUT, 1.4);
const desk = (x, y, w = 40) => g('data-s1-drawn="desk"', orect(x, y, w, 5, '#B07A4E', 1.1) + line(x + 4, y + 5, x + 4, y + 26, OUT, 1.8) + line(x + w - 4, y + 5, x + w - 4, y + 26, OUT, 1.8));
const chairFront = (x, y) => g('data-s1-drawn="chair"', orect(x - 10, y, 20, 4, '#4A7BD0', 1) + line(x - 8, y + 4, x - 8, y + 18, OUT, 1.6) + line(x + 8, y + 4, x + 8, y + 18, OUT, 1.6));

/* ================================================================ G1-653: the four places (no rule action drawn in them) */
function placeScene(id, look) {
  const [a, b, c] = look;   // three people: different skin tones
  if (id === 'classroom') {
    // the classroom: a green board with letters and numbers, the teacher beside it, two children at their desks listening
    let s = wallFloor(96, '#F4EBD9');
    s += g('data-s1-drawn="chalkboard"', orect(16, 14, 92, 52, C.board, 1.6) + orect(12, 64, 100, 4, '#B07A4E', 1) +
      `<text x="24" y="38" font-family="Baloo 2, cursive" font-weight="700" font-size="17" fill="${C.chalk}">A B C</text><text x="24" y="58" font-family="Baloo 2, cursive" font-weight="700" font-size="15" fill="${C.chalk}">1 2 3</text>`);
    s += g('data-s1-drawn="clock"', circ(150, 26, 10, '#FFFFFF', 1.4) + line(150, 26, 150, 19, OUT, 1.4) + line(150, 26, 155, 26, OUT, 1.4));
    s += P({ age: 'adult', s: 0.82, x: 124, y: 128, ...a, look: -1, la: [-8, -6, -16, -16], ra: [4, 10, 6, 19] });
    for (const [x, k] of [[150, b], [182, c]]) s += chairFront(x, 104) + P(sitting({ age: 'child', s: 0.92, x, ...k, look: -1, turn: -1, la: [-3, 8, 2, 16], ra: [3, 8, -2, 16] }, 104)) + desk(x - 20, 108, 40);
    return s;
  }
  if (id === 'library') {
    // the library: tall shelves of books, the check-out desk with the librarian, a child at a table with a book
    let s = wallFloor(104, '#F7EEDD', '#E9DFCA');
    const shelf = (x, w) => { let t = orect(x, 8, w, 96, '#B07A4E', 1.4); const cols = [C.bookA, C.bookB, C.bookC, C.bookD, C.bookE]; for (let r = 0; r < 4; r++) { t += line(x, 30 + r * 24, x + w, 30 + r * 24, OUT, 1.2); let bx = x + 3; let k = r; while (bx < x + w - 6) { const bw = 5 + ((k * 7) % 4); t += orect(bx, 13 + r * 24, bw, 16 + ((k * 3) % 3), cols[k % 5], 0.6); bx += bw + 1; k++; } } return g('data-s1-drawn="bookshelf"', t); };
    s += shelf(4, 52) + shelf(146, 50);
    s += P({ age: 'adult', s: 0.78, x: 92, y: 118, ...a, top: 'purple', glasses: true, look: 1, la: [-4, 10, 2, 18], ra: [4, 10, -2, 18] });
    s += g('data-s1-drawn="checkout-desk"', orect(66, 92, 54, 30, '#8B5E3C', 1.4) + orect(64, 88, 58, 5, '#B07A4E', 1.1));
    s += chairFront(130, 110) + P(sitting({ age: 'child', s: 0.86, x: 130, ...b, look: 0, la: [-3, 8, 3, 14], ra: [3, 8, -3, 14] }, 110)) + desk(112, 112, 36);
    s += g('data-s1-drawn="open-book"', `<path d="M122,110 L130,108 L138,110 L138,104 L130,102 L122,104 Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.9"/>`);
    return s;
  }
  if (id === 'pool') {
    // the pool: blue water with a lane rope, a ladder, the deck around it, the lifeguard's tall chair
    let s = rect(0, 0, 200, 140, '#EEF6F8') + rect(0, 56, 200, 84, C.tile);
    s += g('data-s1-drawn="pool-water"', path('M8,70 L192,70 L192,128 L8,128 Z', C.poolBlue, 1.6) + [86, 104, 120].map((y, q) => `<path d="M${14 + q * 6},${y} q7,-3 14,0 q7,3 14,0 q7,-3 14,0" fill="none" stroke="#FFFFFF" stroke-width="1.4"/>`).join('') +
      `<line x1="8" y1="98" x2="192" y2="98" stroke="${C.laneRed}" stroke-width="2.4" stroke-dasharray="5 4"/>`);
    s += g('data-s1-drawn="pool-ladder"', line(150, 60, 150, 84, '#A7B3BE', 2.6) + line(162, 60, 162, 84, '#A7B3BE', 2.6) + `<path d="M150,60 q0,-8 6,-8 q6,0 6,8" fill="none" stroke="#A7B3BE" stroke-width="2.6"/>` + line(150, 74, 162, 74, '#A7B3BE', 2) + line(150, 82, 162, 82, '#A7B3BE', 2));
    const leg = (x1, x2) => line(x1, 66, x2, 30, OUT, 4.6) + line(x1, 66, x2, 30, '#FFFFFF', 2.8);
    s += g('data-s1-drawn="lifeguard-chair"', leg(24, 32) + leg(50, 42) + line(27, 50, 47, 50, OUT, 4) + line(27, 50, 47, 50, '#FFFFFF', 2.2) + orect(28, 26, 18, 6, '#D9534F', 1.2) + orect(30, 10, 4, 16, '#FFFFFF', 1) + orect(40, 10, 4, 16, '#FFFFFF', 1) + orect(30, 10, 14, 4, '#FFFFFF', 1));
    s += g('data-s1-drawn="float-ring"', `<circle cx="110" cy="60" r="7" fill="none" stroke="${C.laneRed}" stroke-width="4"/><circle cx="110" cy="60" r="7" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="5.5 5.5"/>`);
    return s;
  }
  if (id === 'street') {
    // the street crossing: the road with its striped crosswalk, the curb and sidewalk, a car stopped, a traffic light
    // for the cars (NO walk sign here: the walk sign is the rule's own clue)
    let s = rect(0, 0, 200, 140, '#EEF6F8');
    s += g('data-s1-drawn="buildings"', orect(6, 18, 40, 50, '#C96B4B', 1.2) + [0, 1].map((r) => [0, 1, 2].map((k) => orect(11 + k * 11, 24 + r * 16, 7, 9, '#DDEFF5', 0.8)).join('')).join('') + orect(150, 10, 44, 58, '#E9E2D0', 1.2) + [0, 1, 2].map((r) => [0, 1, 2].map((k) => orect(156 + k * 12, 16 + r * 15, 7, 9, '#DDEFF5', 0.8)).join('')).join(''));
    s += rect(0, 66, 200, 10, C.curb) + line(0, 66, 200, 66, OUT, 1) + rect(0, 76, 200, 48, C.asphalt) + line(0, 76, 200, 76, OUT, 1.2) + rect(0, 124, 200, 16, C.curb) + line(0, 124, 200, 124, OUT, 1.2);
    s += g('data-s1-drawn="crosswalk"', [0, 1, 2, 3, 4, 5].map((k) => rect(70 + k * 12, 78, 7, 44, C.stripe)).join(''));
    s += g('data-s1-drawn="car"', `<g transform="translate(140 78) scale(0.5)">${K.OBJ.car().replace('data-sk-drawn="car"', '')}</g>`);
    s += g('data-s1-drawn="traffic-light"', line(58, 70, 58, 26, '#5A5A5A', 3) + orect(52, 6, 12, 30, C.signal, 1) + circ(58, 12, 3.4, C.redLight, 0.6) + circ(58, 21, 3.4, '#5A5A5A', 0.6) + circ(58, 30, 3.4, '#5A5A5A', 0.6));
    return s;
  }
  throw new Error('placeScene: ' + id);
}
/** the clue icons of the rules (0 0 100 100): the ACTION the rule asks for */
function clueIcon(id) {
  if (id === 'raised-hand') return g('data-s1-drawn="raised-hand"', path('M36,96 L38,62 Q30,50 30,40 L30,22 Q30,16 35,16 Q40,16 40,22 L40,38 L42,14 Q42,8 47,8 Q52,8 52,14 L52,38 L54,10 Q54,4 59,4 Q64,4 64,10 L64,40 L66,18 Q66,12 71,12 Q76,12 76,18 L76,52 Q76,64 66,70 L64,96 Z', '#F0C08F', 2.2) + path('M30,96 L70,96 L72,86 L28,86 Z', '#2A9D8F', 2) + line(41, 30, 41, 40, OUT, 1.2) + line(53, 28, 53, 40, OUT, 1.2) + line(65, 30, 65, 42, OUT, 1.2));
  if (id === 'quiet-voice') return g('data-s1-drawn="quiet-voice"', circ(48, 50, 34, '#F0C08F', 2.2) + `<ellipse cx="36" cy="44" rx="4" ry="5" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.4"/><circle cx="36" cy="45" r="2.4" fill="${OUT}"/><ellipse cx="60" cy="44" rx="4" ry="5" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.4"/><circle cx="60" cy="45" r="2.4" fill="${OUT}"/>` +
    path('M16,40 Q14,10 48,12 Q82,10 80,40 Q70,24 48,24 Q26,24 16,40 Z', '#4A2E1A', 1.4) + `<path d="M40,68 Q48,64 56,68" fill="none" stroke="#9B3B34" stroke-width="2.4" stroke-linecap="round"/>` +
    path('M40,100 L41,90 Q34,86 35,80 Q36,74 44,74 L45,58 Q45,53 48,53 Q51,53 51,58 L51,74 Q60,74 61,80 Q62,88 55,90 L56,100 Z', '#F0C08F', 2) + line(41, 81, 55, 81, OUT, 1.2) + line(41, 86, 55, 86, OUT, 1.2));
  if (id === 'walking-feet') {
    // two bare footprints in a walking stride (the "walking feet" of a school rule): a sole wide at the ball, narrow at
    // the heel, five toes
    const foot = (x, y, r) => `<g transform="rotate(${r} ${x} ${y})"><path d="M${x - 12},${y - 8} Q${x - 14},${y - 26} ${x},${y - 28} Q${x + 14},${y - 26} ${x + 12},${y - 6} Q${x + 10},${y + 10} ${x + 7},${y + 22} Q${x},${y + 30} ${x - 7},${y + 22} Q${x - 10},${y + 10} ${x - 12},${y - 8} Z" fill="#7B4A26" stroke="${OUT}" stroke-width="1.6"/>` +
      [[-10, -36, 4.6], [-3, -40, 4], [4, -39, 3.6], [10, -35, 3.2], [14, -29, 2.8]].map(([dx, dy, rr]) => `<circle cx="${x + dx}" cy="${y + dy}" r="${rr}" fill="#7B4A26" stroke="${OUT}" stroke-width="1.2"/>`).join('') + '</g>';
    // review round 1: water drops by the feet (the rule says "The floor is wet."; the pool card is the only wet place)
    const drop = (x, y, k) => `<path d="M${x},${y - 9 * k} Q${x + 6.5 * k},${y} ${x},${y + 4 * k} Q${x - 6.5 * k},${y} ${x},${y - 9 * k} Z" fill="${C.poolBlue}" stroke="${OUT}" stroke-width="1.4"/><path d="M${x - 2.4 * k},${y} q0,2.4 2,3" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/>`;
    return g('data-s1-drawn="walking-feet"', foot(30, 68, -10) + foot(68, 46, 10)) + g('data-s1-drawn="water-drops"', drop(84, 82, 1.2) + drop(64, 93, 0.95) + drop(14, 16, 1));
  }
  if (id === 'walk-sign') return g('data-s1-drawn="walk-sign"', line(50, 76, 50, 98, '#5A5A5A', 6) + orect(22, 6, 56, 72, C.signal, 2.2) + orect(28, 12, 44, 60, C.g9, 1) +
    // the WALK figure (white, mid-step)
    `<g fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><circle cx="52" cy="22" r="5" fill="#FFFFFF" stroke="none"/><path d="M51,30 L47,46 L39,60 M47,46 L56,60 M50,34 L41,42 M50,34 L60,40"/></g>`);
  throw new Error('clueIcon: ' + id);
}

/* ================================================================ G1-654: the good-citizen stories */
const fishTank = (x, y, hungry = false) => g('data-s1-drawn="fish-tank"', rect(x, y, 46, 32, '#FFFFFF') + rect(x, y + 5, 46, 27, C.tank) + line(x, y + 5, x + 46, y + 5, '#4FA3D1', 1.2) + path(`M${x},${y} L${x},${y + 32} L${x + 46},${y + 32} L${x + 46},${y}`, 'none', 1.6) + rect(x + 2, y + 26, 42, 5, '#E6B422') +
  g('data-s1-drawn="fish"', `<ellipse cx="${x + 22}" cy="${y + (hungry ? 10 : 18)}" rx="7" ry="4.4" fill="${C.fishOrange}" stroke="${OUT}" stroke-width="1"/><path d="M${x + 29},${y + (hungry ? 10 : 18)} l6,-4 l0,8 Z" fill="${C.fishOrange}" stroke="${OUT}" stroke-width="1"/><circle cx="${x + 18}" cy="${y + (hungry ? 9 : 17)}" r="1" fill="${OUT}"/>`) +
  (hungry ? `<circle cx="${x + 13}" cy="${y + 8}" r="1.4" fill="none" stroke="${OUT}" stroke-width="0.7"/><circle cx="${x + 11}" cy="${y + 6}" r="1" fill="none" stroke="${OUT}" stroke-width="0.7"/>` : ''));
const foodJar = (x, y) => g('data-s1-drawn="fish-food"', orect(x - 5, y - 12, 10, 12, '#F4C542', 1.1, ' rx="1.5"') + orect(x - 5.5, y - 15, 11, 4, '#D9534F', 1));
const bench = (x, y, w = 50) => g('data-s1-drawn="bench"', orect(x, y, w, 5, '#B07A4E', 1.2) + orect(x, y - 14, w, 4, '#B07A4E', 1) + line(x + 4, y + 5, x + 4, y + 18, OUT, 2) + line(x + w - 4, y + 5, x + w - 4, y + 18, OUT, 2));
/** review round 2 (G1-654): a teacher who is plainly a grown-up: an adult at full size (s 1.0: 1.5 times a child at s 1.0,
 *  like the teacher at the board in G1-653), a grown-up's hair (a bun or short hair, never the cast's puffs, braids or
 *  ponytail), glasses and long pants; the skin tone and the shirt from the cast look */
const teacherLook = (look, o) => ({ ...look, age: 'adult', s: 1.0, hair: look.sex === 'm' ? 'short' : 'bun', bottom: 'pants', bottomColor: 'navy', glasses: true, la: undefined, ra: undefined, ...o });
/** the teacher drawn, with a school lanyard and its badge hanging on the chest (marks: data-s1-teacher, data-s1-drawn
 *  "lanyard") */
function teacherSvg(t) {
  const p = person(t), sh = [K.shoulderAt(t, 'l'), K.shoulderAt(t, 'r')], cx = (sh[0][0] + sh[1][0]) / 2, top = sh[0][1] - 1.5 * t.s, by = top + 15 * t.s;
  const lan = g('data-s1-drawn="lanyard"', `<path d="M${f1(cx - 4 * t.s)},${f1(top)} L${f1(cx)},${f1(by)} L${f1(cx + 4 * t.s)},${f1(top)}" fill="none" stroke="#4A7BD0" stroke-width="${f1(1.3 * t.s)}"/>` + orect(cx - 3.6 * t.s, by, 7.2 * t.s, 9 * t.s, '#FFFFFF', 0.9, ' rx="1"') + rect(cx - 3.1 * t.s, by + 0.6 * t.s, 6.2 * t.s, 2.4 * t.s, '#4A7BD0') + line(cx - 2.2 * t.s, by + 5 * t.s, cx + 2.2 * t.s, by + 5 * t.s, '#A7B3BE', 1) + line(cx - 2.2 * t.s, by + 7 * t.s, cx + 1.2 * t.s, by + 7 * t.s, '#A7B3BE', 1));
  return g('data-s1-teacher="1"', p.svg + lan);
}
/** review round 2 (G1-654): a sorry face over a figure drawn with mood 'calm' and look 0: eyebrows raised and slanted up
 *  toward the middle, the eyes looking down and to the left (at the spill) */
function sorryFace(o) {
  const h = person(o).head(), r = h.r, ey = h.y + r * 0.02;
  return g('data-s1-drawn="sorry-face"', [-1, 1].map((sd) => { const ex = h.x + sd * r * 0.36;
    return `<ellipse cx="${f1(ex)}" cy="${f1(ey)}" rx="${f1(r * 0.2)}" ry="${f1(r * 0.22)}" fill="#FFFFFF" stroke="${OUT}" stroke-width="${f1(r * 0.05)}"/><circle cx="${f1(ex - r * 0.07)}" cy="${f1(ey + r * 0.09)}" r="${f1(r * 0.12)}" fill="${OUT}"/>` +
      `<path d="M${f1(ex + sd * r * 0.2)},${f1(ey - r * 0.27)} Q${f1(ex + sd * r * 0.02)},${f1(ey - r * 0.29)} ${f1(ex - sd * r * 0.15)},${f1(ey - r * 0.38)}" fill="none" stroke="${OUT}" stroke-width="${f1(r * 0.09)}" stroke-linecap="round" data-s1-brow="${sd < 0 ? 'l' : 'r'}"/>`; }).join(''));
}
/** one story picture: which = 'setup' | 'good' | 'not'; k = three different children (k[0] = the story's child) */
function citizenArt(id, which, k) {
  const [m, o, q] = k;
  const kid = (who, opts) => P({ age: 'child', s: 1.0, ...who, ...opts });
  if (id === 'paint') {
    // review round 1 (replaces the lunch box): Maya spilled the paint by the easel; the teacher asks who did it.
    // setup: the spill, Maya looking at it, the teacher's question; good: Maya, hand on her chest, says "I did it.";
    // not: Maya, palms out, says "Not me." (a calm face, not a bad-child face)
    let s = wallFloor(96, '#F4EBD9');
    s += g('data-s1-drawn="easel"', line(22, 132, 34, 40, '#8B5E3C', 2.6) + line(58, 132, 46, 40, '#8B5E3C', 2.6) + line(40, 40, 40, 128, '#8B5E3C', 2.2) + orect(18, 44, 44, 40, '#FFFFFF', 1.4) + orect(16, 84, 48, 4, '#B07A4E', 1) +
      `<circle cx="30" cy="56" r="7" fill="#F4C542"/><path d="M24,74 q8,-10 16,-2 q8,8 16,-4" fill="none" stroke="#6BB36B" stroke-width="3.2" stroke-linecap="round"/><path d="M44,52 q4,6 10,2" fill="none" stroke="#D9534F" stroke-width="3" stroke-linecap="round"/>`);
    s += g('data-s1-drawn="spilled-paint"', `<path d="M64,128 Q66,118 84,119 Q100,116 106,123 Q114,130 98,134 Q80,138 68,134 Q60,132 64,128 Z" fill="#4A7BD0" stroke="${OUT}" stroke-width="1.3"/>` +
      `<g transform="rotate(-70 70 122)">${orect(62, 112, 16, 18, '#FFFFFF', 1.4, ' rx="2"')}${rect(63.5, 113, 13, 5, '#4A7BD0')}</g>`);
    // review round 2: the teacher is plainly a grown-up on every copy: a full-size adult (1.5 times Maya's height, as the
    // teacher at the board in G1-653), a grown-up's hair, glasses and a school lanyard with a badge (the cast's child
    // looks, puffs and a bright shirt at 1.1 times Maya's height, read as a second child)
    const t = teacherLook(q, { x: 168, y: 136, look: -1, mood: which === 'good' ? 'smile' : 'calm' });
    // a speech bubble; tail = [tip x, tip y, base x (on the bottom edge; default the tip's x)]
    const bubble = (x, y, w, h, tail, text, fs = 13) => { const bx = tail[2] == null ? tail[0] : tail[2]; return g('data-s1-drawn="speech"', path(`M${x + 6},${y} L${x + w - 6},${y} Q${x + w},${y} ${x + w},${y + 6} L${x + w},${y + h - 6} Q${x + w},${y + h} ${x + w - 6},${y + h} L${bx + 6},${y + h} L${tail[0]},${tail[1]} L${bx - 2},${y + h} L${x + 6},${y + h} Q${x},${y + h} ${x},${y + h - 6} L${x},${y + 6} Q${x},${y} ${x + 6},${y} Z`, '#FFFFFF', 1.4) +
      `<text x="${x + w / 2}" y="${y + h / 2 + fs * 0.36}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="${fs}" fill="${OUT}">${text}</text>`); };
    if (which === 'setup') {
      const mo = { age: 'child', s: 1.0, ...m, x: 124, y: 136, look: -1, mood: 'open', la: [-5, 7, -8, 15], ra: [5, 7, 8, 15] };
      // the "?" bubble beside the teacher's head, its tail at her mouth
      return s + P(mo) + teacherSvg(t) + bubble(118, 6, 32, 30, [156, 41, 140], '?', 24);
    }
    const mo = { age: 'child', s: 1.0, ...m, x: 124, y: 136, look: 1 };
    // review round 2: "I did it." with a SORRY face (a wide open grin with a hand on the chest read as "I did it!", proud
    // of a job well done): eyebrows raised and slanted up in the middle, a small straight mouth, the eyes down on the
    // spill; the hand stays on her chest
    if (which === 'good') { mo.ra = armTo(mo, 'r', 122, 104); mo.mood = 'calm'; mo.look = 0; return s + teacherSvg(t) + P(mo) + sorryFace(mo) + bubble(88, 22, 64, 28, [122, 60], 'I did it.'); }
    mo.mood = 'calm'; mo.la = [-8, 1, -15, -6]; mo.ra = [8, 1, 15, -6];
    return s + teacherSvg(t) + P(mo) + bubble(90, 22, 60, 28, [122, 60], 'Not me.');
  }
  if (id === 'alone') {
    const s = rect(0, 0, 200, 140, '#EEF6F8') + rect(0, 104, 200, 36, '#9CCB7C') + line(0, 104, 200, 104, OUT, 1.2) + tree(184, 104, 70);
    const lone = (mood) => bench(8, 118, 52) + P(sitting({ age: 'child', s: 1.0, ...o, x: 34, mood, look: 1, la: [-3, 9, 2, 16], ra: [3, 9, -2, 16] }, 118));
    // review round 1: no motion lines in the setup (they belonged to the "runs off" picture and hinted at it)
    if (which === 'setup') return s + lone('sad') + kid(m, { x: 104, y: 136, look: -1 }) + g('data-s1-drawn="ball"', circ(160, 120, 6, '#F4C542', 1.2));
    if (which === 'good') { const so = { age: 'child', s: 1.0, ...m, x: 82, y: 136, look: -1, mood: 'smile' }; so.la = armTo(so, 'l', 56, 96); return s + lone('smile') + P(so) + g('data-s1-drawn="ball"', circ(108, 128, 6, '#F4C542', 1.2)); }
    return s + lone('sad') + kid(m, { x: 150, y: 132, look: 1, lean: 12, ll: [-6, 11, -15, 17], rl: [7, 6, 12, 15], la: [-6, 6, -11, 12], ra: [6, 5, 12, -1] }) + K.motion(122, 70, -1, 4, 14) + g('data-s1-drawn="ball"', circ(186, 122, 6, '#F4C542', 1.2));
  }
  if (id === 'fish') {
    // the class fish on a low table (review round 1: Lee holds the food shaker in his hand over the OPEN tank, flakes
    // falling, his eyes on the fish; the box no longer floats above a waving hand)
    let s = wallFloor(96, '#EAF2EE');
    s += g('data-s1-drawn="low-table"', orect(104, 110, 76, 6, '#B07A4E', 1.2) + line(110, 116, 110, 132, OUT, 2.2) + line(174, 116, 174, 132, OUT, 2.2));
    s += g('data-s1-drawn="job-chart"', orect(14, 12, 52, 44, '#FFFFFF', 1.4) + [0, 1, 2].map((r) => orect(18, 17 + r * 13, 10, 9, ['#F4C542', '#7EC8E3', '#F3B7A6'][r], 0.8) + line(32, 22 + r * 13, 60, 22 + r * 13, '#A7B3BE', 2)).join(''));
    if (which === 'setup') return s + fishTank(114, 78, true) + foodJar(168, 110) + kid(m, { x: 84, y: 136, look: 1 });
    if (which === 'good') {
      const lo = { age: 'child', s: 1.1, ...m, x: 96, y: 136, look: 1, mood: 'smile' }; lo.ra = armTo(lo, 'r', 117, 72); lo.la = [-3, 9, -5, 18];
      const h = person(lo).hand('r');
      // the shaker in the hand, its open top tipped down toward the water, the flakes falling into the tank
      const shaker = `<g transform="rotate(125 ${f1(h[0])} ${f1(h[1])})">${orect(h[0] - 4.5, h[1] - 7, 9, 14, '#F4C542', 1.1, ' rx="1.5"')}${orect(h[0] - 5, h[1] - 10, 10, 4, '#D9534F', 1)}</g>`;
      const flakes = [[126, 82], [129, 86], [124, 88], [131, 91], [127, 94]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3" fill="#B07A4E"/>`).join('');
      return s + fishTank(114, 78, false) + P(lo) + g('data-s1-drawn="fish-food-in-hand"', shaker) + g('data-s1-drawn="flakes"', flakes);
    }
    return s + fishTank(114, 78, true) + foodJar(168, 110) + P(sitting({ age: 'child', s: 1.0, ...m, x: 54, ll: [-12, 6, 3, 10], rl: [12, 6, -3, 10], look: -1, mood: 'smile', la: [-4, 8, -12, 14], ra: [4, 8, 10, 14] }, 124)) + [[28, 128, 0], [38, 126, 1], [34, 118, 2], [74, 128, 3]].map(([x, y, j]) => `<rect x="${x - 5}" y="${y - 5}" width="10" height="10" rx="1.5" fill="${['#E4574B', '#4A7BD0', '#F4C542', '#6BB36B'][j]}" stroke="${OUT}" stroke-width="1.1"/>`).join('');
  }
  if (id === 'ball') {
    const s = rect(0, 0, 200, 140, '#EEF6F8') + rect(0, 100, 200, 40, '#9CCB7C') + line(0, 100, 200, 100, OUT, 1.2);
    const ball = (x, y) => g('data-s1-drawn="ball"', circ(x, y, 8, '#D9534F', 1.3) + `<path d="M${x - 8},${y} Q${x},${y - 5} ${x + 8},${y}" fill="none" stroke="#FFFFFF" stroke-width="1.4"/>`);
    // review round 1: the setup shows the ball on the ground between the three children, all looking at it (no child
    // holds it: holding it was the "keeps the ball" choice drawn as the story's picture)
    if (which === 'setup') return s + kid(m, { x: 100, y: 112, s: 0.84, look: 0, la: [-3, 9, -5, 17], ra: [3, 9, 5, 17] }) + kid(o, { x: 46, y: 134, look: 1 }) + kid(q, { x: 154, y: 134, look: -1 }) + ball(100, 128);
    if (which === 'good') { const an = { age: 'child', s: 1.0, ...m, x: 60, y: 134, look: 1, mood: 'smile' }; an.ra = armTo(an, 'r', 90, 90); return s + P(an) + ball(104, 80) + `<path d="M74,86 Q96,66 116,74" fill="none" stroke="${OUT}" stroke-width="1.4" stroke-dasharray="3 3"/>` + kid(o, { x: 136, y: 134, look: -1, mood: 'smile', la: [-6, -2, -12, -14], ra: [6, -2, 12, -14] }) + kid(q, { x: 178, y: 134, look: -1, mood: 'smile' }); }
    const an = { age: 'child', s: 1.0, ...m, x: 150, y: 134, look: 1, turn: 1, mood: 'calm' }; an.la = armTo(an, 'l', 148, 98); an.ra = armTo(an, 'r', 156, 98);
    return s + P(sitting({ age: 'child', s: 1.0, ...o, x: 40, ll: [-12, 6, 3, 10], rl: [12, 6, -3, 10], mood: 'sad', look: 1, la: [-3, 9, 2, 16], ra: [3, 9, -2, 16] }, 124)) + P(sitting({ age: 'child', s: 1.0, ...q, x: 84, ll: [-12, 6, 3, 10], rl: [12, 6, -3, 10], mood: 'sad', look: 1, la: [-3, 9, 2, 16], ra: [3, 9, -2, 16] }, 124)) + P(an) + ball(153, 98);
  }
  if (id === 'crayons') {
    // review round 1: the friend looks down at the spilled crayons, hands open (no longer both arms up, which read as
    // cheering); the crayon box lies tipped over, the crayons spilled out of it across the floor
    const s = wallFloor(96, '#F7EEDD', '#E9DFCA');
    const cr = (x, y, c, r) => `<g transform="rotate(${r} ${x} ${y})">${orect(x - 9, y - 2.4, 15, 4.8, c, 0.8, ' rx="1"')}<path d="M${x + 6},${y - 2.4} L${x + 10},${y} L${x + 6},${y + 2.4} Z" fill="${c}" stroke="${OUT}" stroke-width="0.8"/></g>`;
    const fr = { age: 'child', s: 1.0, ...m, x: 66, y: 134, look: 1, mood: 'sad', la: [-7, 7, -13, 13], ra: [7, 7, 13, 13] };
    const box = `<g transform="rotate(90 112 120)">${orect(100, 108, 24, 24, '#F4C542', 1.4)}${orect(100, 108, 24, 7, '#3F9B4B', 1.2)}${[103, 109, 115].map((x, j) => `<path d="M${x},108 L${x},103 L${x + 2.5},100 L${x + 5},103 L${x + 5},108 Z" fill="${['#D9534F', '#4A7BD0', '#8E6CC5'][j]}" stroke="${OUT}" stroke-width="0.8"/>`).join('')}</g>`;
    return s + P(fr) + g('data-s1-drawn="tipped-crayon-box"', box) + g('data-s1-drawn="spilled-crayons"', [[128, 128, '#D9534F', 20], [142, 120, '#4A7BD0', -30], [136, 134, '#6BB36B', 60], [154, 130, '#8E6CC5', 10], [124, 114, '#F39C40', -70], [164, 122, '#E98AB0', 35], [150, 138, '#F4C542', -10]].map((a) => cr(...a)).join(''));
  }
  throw new Error('citizenArt: ' + id);
}
/** the virtue icons (0 0 40 40), beside the word the teacher reads */
function virtueIcon(v) {
  if (v === 'honest') return g('data-s1-drawn="icon-honest"', path('M6,8 L34,8 Q37,8 37,11 L37,25 Q37,28 34,28 L18,28 L10,35 L11,28 L6,28 Q3,28 3,25 L3,11 Q3,8 6,8 Z', '#FFFFFF', 1.8) + `<path d="M12,18 L18,23 L28,13" fill="none" stroke="${T.teal}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`);
  if (v === 'kind') return g('data-s1-drawn="icon-kind"', path('M20,34 Q4,24 4,14 Q4,6 12,6 Q17,6 20,11 Q23,6 28,6 Q36,6 36,14 Q36,24 20,34 Z', '#E98AB0', 1.8));
  if (v === 'responsible') return g('data-s1-drawn="icon-responsible"', orect(8, 6, 24, 30, '#FFFFFF', 1.8, ' rx="2"') + orect(14, 3, 12, 6, '#8C8C8C', 1.2, ' rx="1.5"') + [0, 1, 2].map((r) => `<path d="M11,${15 + r * 7} l2.5,2.5 l4,-4" fill="none" stroke="${T.teal}" stroke-width="2" stroke-linecap="round"/>` + line(20, 15 + r * 7, 29, 15 + r * 7, '#A7B3BE', 2)).join(''));
  if (v === 'fair') return g('data-s1-drawn="icon-fair"', line(20, 6, 20, 32, OUT, 2.4) + line(8, 12, 32, 12, OUT, 2.4) + path('M10,32 L30,32 L28,36 L12,36 Z', '#B07A4E', 1.4) + `<path d="M8,12 L3,23 L13,23 Z" fill="none" stroke="${OUT}" stroke-width="1.2"/><path d="M32,12 L27,23 L37,23 Z" fill="none" stroke="${OUT}" stroke-width="1.2"/>` + path('M3,23 Q8,28 13,23 Z', '#F4C542', 1.2) + path('M27,23 Q32,28 37,23 Z', '#F4C542', 1.2));
  throw new Error('virtueIcon: ' + v);
}

/* ================================================================ G1-655: leaders and the places they lead */
/** a leader at a lectern (all four drawn alike: the printed role word tells them apart, never a prop that shows the
 *  place) — 0 0 100 100 */
function leaderArt(look) {
  // 2026-11-25 picture fix: the leader stands BEHIND the lectern, feet above its foot (at y 98 the shoes showed under it)
  const o = { age: 'adult', s: 0.78, x: 50, y: 94, ...look, look: 0, la: [-6, 8, -2, 18], ra: [6, 8, 2, 18] };
  return rect(0, 0, 100, 100, '#EAF2EE') + rect(0, 86, 100, 14, '#E6DBC6') + P(o) +
    g('data-s1-drawn="lectern"', path('M34,62 L66,62 L62,96 L38,96 Z', '#8B5E3C', 1.6) + orect(30, 58, 40, 6, '#B07A4E', 1.2) + line(50, 58, 47, 46, OUT, 1.2) + `<ellipse cx="46.5" cy="44.5" rx="2.2" ry="3" fill="${OUT}"/>`);
}
/** the Albers equal-area projection of the lower 48 (USGS: 29.5 and 45.5 N, centre 96 W, 23 N); returns view units */
function albers(lon, lat) {
  const r = Math.PI / 180, p1 = 29.5 * r, p2 = 45.5 * r, p0 = 23 * r, l0 = -96 * r;
  const n = (Math.sin(p1) + Math.sin(p2)) / 2, Cc = Math.cos(p1) ** 2 + 2 * n * Math.sin(p1), rho0 = Math.sqrt(Cc - 2 * n * Math.sin(p0)) / n;
  const rho = Math.sqrt(Cc - 2 * n * Math.sin(lat * r)) / n, th = n * (lon * r - l0);
  return [rho * Math.sin(th), rho0 - rho * Math.cos(th)];
}
/** the outline of the lower 48 states (lon, lat; simplified by hand from the US coast and borders, the Great Lakes shores
 *  and the Michigan peninsulas included) */
const US48 = [[-124.73, 48.38], [-124.1, 46.86], [-124.05, 46.26], [-123.95, 45.0], [-124.15, 43.4], [-124.55, 42.84], [-124.2, 42.0], [-124.35, 40.44], [-123.8, 39.6], [-123.0, 38.3], [-122.5, 37.8], [-122.4, 37.2], [-121.9, 36.6], [-121.3, 35.6], [-120.64, 34.58], [-119.6, 34.4], [-118.5, 34.03], [-118.0, 33.7], [-117.25, 32.75], [-117.12, 32.53], [-114.72, 32.72], [-111.07, 31.33], [-108.21, 31.33], [-108.21, 31.78], [-106.53, 31.78], [-105.0, 30.68], [-104.5, 29.65], [-103.3, 29.0], [-102.4, 29.77], [-101.4, 29.77], [-100.3, 28.3], [-99.5, 27.5], [-99.0, 26.4], [-97.15, 25.95], [-97.4, 26.8], [-97.2, 27.8], [-96.4, 28.4], [-94.8, 29.3], [-93.85, 29.7], [-92.3, 29.55], [-91.2, 29.2], [-90.2, 29.1], [-89.4, 28.95], [-89.6, 29.4], [-89.4, 30.1], [-88.5, 30.35], [-88.0, 30.65], [-87.4, 30.35], [-86.5, 30.4], [-85.4, 29.7], [-84.4, 29.9], [-83.6, 29.8], [-82.8, 28.9], [-82.7, 27.9], [-82.2, 26.8], [-81.8, 26.1], [-81.1, 25.2], [-80.4, 25.2], [-80.15, 25.8], [-80.05, 26.7], [-80.6, 28.4], [-81.4, 30.4], [-81.2, 31.5], [-80.85, 32.05], [-79.9, 32.75], [-78.9, 33.6], [-77.9, 33.9], [-76.5, 34.7], [-75.5, 35.25], [-75.7, 36.2], [-76.0, 36.9], [-75.6, 37.9], [-75.05, 38.45], [-74.95, 38.93], [-74.1, 39.8], [-74.0, 40.45], [-73.6, 40.95], [-72.9, 41.25], [-71.9, 41.3], [-71.1, 41.5], [-70.65, 41.55], [-69.95, 41.7], [-70.05, 42.05], [-70.55, 41.8], [-70.95, 42.35], [-70.7, 42.65], [-70.75, 43.08], [-70.2, 43.65], [-69.0, 44.1], [-68.2, 44.4], [-67.0, 44.8], [-67.8, 45.7], [-67.8, 47.07], [-68.3, 47.35], [-69.2, 47.45], [-70.0, 46.7], [-70.3, 45.9], [-71.5, 45.0], [-74.7, 45.0], [-75.3, 44.8], [-76.3, 44.2], [-76.5, 43.5], [-77.6, 43.25], [-79.05, 43.25], [-78.9, 42.85], [-79.8, 42.25], [-80.1, 42.15], [-81.7, 41.5], [-82.7, 41.45], [-83.45, 41.7], [-83.15, 42.2], [-82.5, 42.6], [-82.4, 43.0], [-82.5, 43.6], [-82.95, 44.05], [-83.6, 43.6], [-83.9, 43.9], [-83.3, 44.3], [-83.4, 45.0], [-84.0, 45.5], [-84.75, 45.78], [-85.0, 45.4], [-85.6, 45.15], [-86.25, 44.6], [-86.45, 43.9], [-86.25, 43.2], [-86.3, 42.4], [-86.7, 41.9], [-87.2, 41.62], [-87.6, 41.8], [-87.85, 42.5], [-87.9, 43.05], [-87.7, 43.8], [-87.5, 44.5], [-87.6, 44.9], [-87.95, 45.1], [-87.05, 45.75], [-86.3, 45.85], [-85.5, 46.1], [-84.75, 45.85], [-84.4, 46.5], [-85.0, 46.7], [-86.0, 46.65], [-87.4, 46.5], [-88.2, 47.0], [-87.9, 47.47], [-88.6, 46.95], [-89.6, 46.8], [-90.6, 46.6], [-91.4, 46.8], [-92.1, 46.72], [-91.0, 47.4], [-89.6, 47.95], [-90.8, 48.2], [-92.0, 48.4], [-93.5, 48.55], [-94.6, 48.7], [-95.15, 49.0], [-104.0, 49.0], [-110.0, 49.0], [-116.0, 49.0], [-122.75, 49.0], [-123.2, 48.2], [-124.0, 48.2]];
/** Colorado: the lines 37 N to 41 N and 102.05 W to 109.05 W */
const COLORADO = (() => { const p = []; for (let x = -109.05; x <= -102.04; x += 0.5) p.push([x, 41]); p.push([-102.05, 41]); for (let x = -102.05; x >= -109.06; x -= 0.5) p.push([x, 37]); p.push([-109.05, 37]); return p; })();
/** Alaska and Hawaii, simplified, for the insets */
const ALASKA = [[-141.0, 69.6], [-148.0, 70.3], [-156.8, 71.3], [-162.0, 70.2], [-166.2, 68.9], [-163.0, 67.1], [-165.0, 66.5], [-168.0, 65.6], [-164.0, 64.6], [-161.0, 64.4], [-161.0, 63.4], [-165.4, 62.0], [-165.4, 60.8], [-162.5, 60.0], [-161.6, 58.6], [-157.0, 58.7], [-158.5, 56.8], [-163.5, 55.0], [-160.0, 55.7], [-156.0, 56.6], [-153.5, 58.0], [-151.8, 59.2], [-151.0, 60.6], [-149.0, 60.0], [-146.0, 60.6], [-144.0, 60.0], [-140.0, 59.7], [-137.0, 58.6], [-135.6, 57.4], [-133.5, 55.6], [-131.5, 55.0], [-130.0, 55.9], [-131.8, 56.8], [-133.5, 58.5], [-136.5, 59.4], [-139.0, 60.3], [-141.0, 60.3]];
const HAWAII = [[[-155.9, 20.2], [-155.0, 19.7], [-154.8, 19.5], [-155.6, 18.9], [-156.0, 19.4]], [[-156.7, 21.0], [-156.0, 20.8], [-156.0, 20.6], [-156.5, 20.6]], [[-157.3, 21.2], [-156.8, 21.1], [-157.0, 21.0]], [[-158.3, 21.6], [-157.7, 21.4], [-157.9, 21.3], [-158.2, 21.3]], [[-159.8, 22.2], [-159.3, 22.2], [-159.4, 21.9], [-159.8, 22.0]]];
/** the map card: the lower 48 (Albers), Alaska and Hawaii in two small boxes; mode 'state' = one state colored, the rest
 *  pale; 'country' = every part colored. Fits a w x h box (view units = px). */
/** Colorado's neighbors (lon, lat; their real lines, simplified along the rivers), for the state close-up */
const NEIGHBORS = {
  wyoming: [[-111.05, 45], [-104.05, 45], [-104.05, 41], [-111.05, 41]],
  utah: [[-114.05, 42], [-111.05, 42], [-111.05, 41], [-109.05, 41], [-109.05, 37], [-114.05, 37]],
  nebraska: [[-104.05, 43], [-98.5, 43], [-97.0, 42.8], [-96.5, 42.5], [-96.1, 41.8], [-95.9, 41.0], [-95.3, 40], [-102.05, 40], [-102.05, 41], [-104.05, 41]],
  kansas: [[-102.05, 40], [-95.3, 40], [-94.9, 39.7], [-94.6, 39.1], [-94.6, 37], [-102.05, 37]],
  oklahoma: [[-103.0, 37], [-94.6, 37], [-94.45, 35.4], [-94.45, 33.6], [-95.5, 33.9], [-97.0, 33.75], [-98.0, 34.1], [-99.2, 34.4], [-100.0, 34.56], [-100.0, 36.5], [-103.0, 36.5]],
  newMexico: [[-109.05, 37], [-103.0, 37], [-103.0, 32.0], [-106.6, 32.0], [-106.6, 31.78], [-108.2, 31.78], [-108.2, 31.33], [-109.05, 31.33]],
  arizona: [[-114.05, 37], [-109.05, 37], [-109.05, 31.33], [-111.07, 31.33], [-114.8, 32.5], [-114.6, 33.3], [-114.5, 34.2], [-114.6, 35.0], [-114.05, 36.2]],
};
/** review round 1: the state card is a CLOSE-UP of one state (Colorado large and orange, its neighbors in thin outline,
 *  no Alaska and Hawaii), so it can never be read as the whole-country card (0 0 w h, view units = px) */
function stateCloseup(w, h) {
  const lat0 = 39, cl = Math.cos(lat0 * Math.PI / 180), cx = -105.55;
  // Colorado about 46% of the card's width (or half its height): large, with enough of its neighbors round it to read as a
  // map of states
  const k = Math.min(0.46 * w / (7 * cl), 0.5 * h / 4);
  const T2 = ([lon, lat]) => [w / 2 + (lon - cx) * cl * k, h / 2 - (lat - lat0) * k];
  const poly = (list, fill, sw, attrs) => `<path d="M${list.map((q) => T2(q).map(f1).join(',')).join(' L')} Z" fill="${fill}" stroke="${OUT}" stroke-width="${sw}" stroke-linejoin="round"${attrs}/>`;
  let s = rect(0, 0, w, h, C.mapPale);
  for (const [name, list] of Object.entries(NEIGHBORS)) s += poly(list, C.mapPale, 0.9, ` data-s1-neighbor="${name}"`);
  s += poly(COLORADO, C.mapState, 2.2, ' data-s1-state="colorado"');
  return g('data-s1-drawn="state-closeup"', s) + rect(0, 0, w, h, 'none', ` stroke="${OUT}" stroke-width="1"`);
}
function usMap(w, h, mode) {
  if (mode === 'state') return stateCloseup(w, h);
  const pts = US48.map(([a, b]) => albers(a, b));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const k = Math.min((w - 8) / (x1 - x0), (h * 0.78 - 8) / (y1 - y0));
  const ox = (w - (x1 - x0) * k) / 2, oy = 4;
  const T2 = (p) => [ox + (p[0] - x0) * k, oy + (y1 - p[1]) * k];
  const poly = (list, fill, attrs) => `<path d="M${list.map((p) => { const q = T2(albers(p[0], p[1])); return f1(q[0]) + ',' + f1(q[1]); }).join(' L')} Z" fill="${fill}" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"${attrs}/>`;
  const all = mode === 'country' ? C.mapUS : C.mapPale;
  let s = poly(US48, all, ' data-s1-us="lower48"');
  if (mode === 'state') s += poly(COLORADO, C.mapState, ' data-s1-state="colorado"');
  // the insets: Alaska and Hawaii (each its own scale), each in a thin box under the lower 48
  const inset = (list, bx, by, bw, bh, lonW, lonE, latS, latN, attr) => {
    const cl = Math.cos(((latS + latN) / 2) * Math.PI / 180), sc = Math.min((bw - 6) / ((lonE - lonW) * cl), (bh - 6) / (latN - latS));
    const P2 = (p) => [bx + 3 + (p[0] - lonW) * cl * sc, by + 3 + (latN - p[1]) * sc];
    const shapes = (Array.isArray(list[0][0]) ? list : [list]).map((l) => `<path d="M${l.map((p) => P2(p).map(f1).join(',')).join(' L')} Z" fill="${all}" stroke="${OUT}" stroke-width="1.1" stroke-linejoin="round" data-s1-us="${attr}"/>`).join('');
    return `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="${f1(bh)}" fill="none" stroke="${OUT}" stroke-width="0.8"/>` + shapes;
  };
  const by = oy + (y1 - y0) * k + 3, bh = Math.max(20, h - by - 2);
  s += inset(ALASKA, 4, by, Math.min(w * 0.3, bh * 1.6), bh, -168.5, -129.5, 54.5, 71.6, 'alaska');
  s += inset(HAWAII, 8 + Math.min(w * 0.3, bh * 1.6), by, Math.min(w * 0.22, bh * 1.4), bh, -160.0, -154.6, 18.8, 22.3, 'hawaii');
  return s;
}
/** the school (0 0 100 100): a brick school with its bell, flag, doors and windows */
function schoolArt() {
  return rect(0, 0, 100, 100, '#EEF6F8') + rect(0, 84, 100, 16, '#9CCB7C') + line(0, 84, 100, 84, OUT, 1) +
    g('data-s1-drawn="school-building"', orect(10, 40, 80, 46, '#C96B4B', 1.6) + path('M6,42 L50,22 L94,42 Z', '#A8483A', 1.6) + orect(43, 8, 14, 16, '#F7F4EE', 1.2) + path('M41,9 L50,1 L59,9 Z', '#A8483A', 1.1) + circ(50, 16, 3.4, '#E6B422', 0.8) +
      [16, 30, 62, 76].map((x) => orect(x, 50, 9, 10, '#DDEFF5', 1)).join('') + [16, 30, 62, 76].map((x) => orect(x, 66, 9, 10, '#DDEFF5', 1)).join('') + orect(42, 62, 16, 24, '#8B5E3C', 1.2) + line(50, 62, 50, 86, OUT, 1)) +
    g('data-s1-drawn="flagpole"', line(96, 84, 96, 30, '#5A5A5A', 1.6) + rect(86, 30, 10, 7, '#D9534F'));
}
/** a small town (0 0 100 100): the town hall with its clock, houses and a shop on the main street; NO school */
function townArt() {
  let s = rect(0, 0, 100, 100, '#EEF6F8') + rect(0, 78, 100, 22, '#B9B4AC') + line(0, 78, 100, 78, OUT, 1) + `<line x1="0" y1="89" x2="100" y2="89" stroke="${C.stripe}" stroke-width="1.6" stroke-dasharray="6 5"/>`;
  s += g('data-s1-drawn="town-hall"', orect(30, 40, 40, 38, C.townHall, 1.6) + path('M26,42 L50,28 L74,42 Z', C.dome, 1.4) + orect(43, 16, 14, 14, C.townHall, 1.2) + path('M41,17 L50,8 L59,17 Z', C.dome, 1.1) + circ(50, 23, 4.2, '#FFFFFF', 0.9) + line(50, 23, 50, 20.5, OUT, 0.8) + line(50, 23, 52, 23, OUT, 0.8) + [35, 44, 53, 62].map((x) => orect(x, 46, 3, 32, '#FFFFFF', 0.7)).join('') + orect(46, 62, 8, 16, '#8B5E3C', 1));
  const house = (x, c) => orect(x, 56, 20, 22, c, 1.2) + path(`M${x - 3},57 L${x + 10},46 L${x + 23},57 Z`, '#8C8C8C', 1.1) + orect(x + 7, 66, 6, 12, '#8B5E3C', 0.9) + orect(x + 3, 60, 4, 4, '#DDEFF5', 0.7) + orect(x + 13, 60, 4, 4, '#DDEFF5', 0.7);
  s += g('data-s1-drawn="houses"', house(4, '#F4EBD9') + house(76, '#F7C948'));
  return s;
}

/* ================================================================ G1-669: the class meeting's talking rules */
/** three children on the rug (0 0 140 100): 'one-voice' (one talks, the others' mouths closed), 'look' (everyone turned
 *  to the speaker, eye lines), 'wait' (a child with an idea waits, smiling, hands in lap) */
function talkRuleArt(id, k) {
  const [a, b, c] = k;
  const seat = { ll: [-12, 6, 3, 10], rl: [12, 6, -3, 10], la: [-3, 9, 3, 16], ra: [3, 9, -3, 16] };
  let s = rect(0, 0, 140, 100, '#F2EEF7') + `<ellipse cx="70" cy="92" rx="66" ry="9" fill="#BFE0D8" stroke="${OUT}" stroke-width="1.2"/>`;
  const kid = (who, x, o) => P({ age: 'child', s: 0.92, ...seat, ...who, x, y: 100, ...o });
  if (id === 'one-voice') {
    s += kid(a, 24, { turn: 1, look: 1, mood: 'calm' }) + kid(b, 70, { mood: 'open', look: 0, ra: [6, -2, 12, -10] }) + kid(c, 116, { turn: -1, look: -1, mood: 'calm' });
    return s + g('data-s1-drawn="speech"', path('M84,10 L118,10 Q122,10 122,14 L122,26 Q122,30 118,30 L94,30 L88,36 L89,30 L84,30 Q80,30 80,26 L80,14 Q80,10 84,10 Z', '#FFFFFF', 1.4) + [92, 101, 110].map((x) => `<circle cx="${x}" cy="20" r="2" fill="${OUT}"/>`).join(''));
  }
  if (id === 'look') {
    s += kid(a, 24, { turn: 1, look: 1 }) + kid(b, 70, { mood: 'open' }) + kid(c, 116, { turn: -1, look: -1 });
    return s + g('data-s1-drawn="eye-lines"', `<path d="M34,44 L58,38" fill="none" stroke="${T.teal}" stroke-width="1.8" stroke-dasharray="3 3"/><path d="M106,44 L82,38" fill="none" stroke="${T.teal}" stroke-width="1.8" stroke-dasharray="3 3"/>`);
  }
  if (id === 'wait') {
    s += kid(a, 24, { turn: 1, look: 1, mood: 'smile' }) + kid(b, 70, { mood: 'open', turn: -1, look: -1 }) + kid(c, 116, { turn: -1, look: -1, mood: 'smile' });
    return s + g('data-s1-drawn="idea"', circ(126, 14, 11, '#FFFFFF', 1.2) + circ(118, 30, 2.6, '#FFFFFF', 1) + `<path d="M122,16 Q122,8 126,8 Q130,8 130,16 Q129,18 128,20 L124,20 Q123,18 122,16 Z" fill="#F7C948" stroke="${OUT}" stroke-width="0.9"/>` + orect(124, 20, 4, 2.4, '#A7B3BE', 0.6));
  }
  throw new Error('talkRuleArt: ' + id);
}

/* ================================================================ G1-657: the interview's picture clues (0 0 100 100) */
function interviewClue(id) {
  if (id === 'games') return g('data-s1-drawn="clue-games"', `<path d="M14,70 Q30,10 50,40 Q70,70 86,24" fill="none" stroke="#D9534F" stroke-width="3.4"/>` + orect(8, 66, 8, 16, '#B07A4E', 1.2, ' rx="2"') + orect(82, 12, 8, 16, '#B07A4E', 1.2, ' rx="2"') + circ(56, 76, 13, '#4A7BD0', 1.6) + `<path d="M43,76 Q56,68 69,76" fill="none" stroke="#FFFFFF" stroke-width="2"/>`);
  if (id === 'to-school') return g('data-s1-drawn="clue-to-school"', rect(0, 78, 100, 22, '#9CCB7C') + `<path d="M8,96 Q40,80 54,74" fill="none" stroke="#B9B4AC" stroke-width="9" stroke-linecap="round"/>` + orect(52, 40, 40, 36, '#C96B4B', 1.6) + path('M48,42 L72,26 L96,42 Z', '#A8483A', 1.4) + orect(66, 58, 12, 18, '#8B5E3C', 1) + orect(56, 48, 7, 7, '#DDEFF5', 0.8) + orect(81, 48, 7, 7, '#DDEFF5', 0.8) + [[14, 90], [26, 86], [36, 82]].map(([x, y], q) => `<ellipse cx="${x}" cy="${y + (q % 2) * 4}" rx="3" ry="4.5" fill="${OUT}"/>`).join(''));
  // review round 1: an OPEN lunch box with a sandwich and an apple in it (the closed yellow box with a dot read as a radio)
  if (id === 'lunch') return g('data-s1-drawn="clue-lunch"', path('M20,22 L80,22 L86,3 L14,3 Z', '#4A7BD0', 2.2, ' data-s1-drawn="open-lid"') + orect(42, 8, 16, 6, '#3F5372', 1.1, ' rx="2"') + path('M14,52 L86,52 L80,22 L20,22 Z', '#4A7BD0', 2.2) + path('M24,28 L76,28 L80,48 L20,48 Z', '#7EC8E3', 1) +
    path('M22,46 L46,46 L34,24 Z', '#F1DDA6', 1.6) + path('M26,44 L42,44 L34,29 Z', '#E6C15A', 0) + `<path d="M24,43 Q34,40 44,43" fill="none" stroke="#6BB36B" stroke-width="2.6"/>` +
    circ(64, 40, 11, '#D9534F', 1.6) + `<path d="M64,29 Q65,24 67,21" fill="none" stroke="#7B4A26" stroke-width="2.2"/><path d="M67,23 Q74,18 76,24 Q70,27 67,23 Z" fill="#6BB36B" stroke="${OUT}" stroke-width="1"/><path d="M58,36 q2,-3 5,-3" fill="none" stroke="#FFFFFF" stroke-width="1.6"/>` +
    path('M10,52 L90,52 L86,88 L14,88 Z', '#4A7BD0', 2.4) + orect(42, 60, 16, 8, '#3F5372', 1.2, ' rx="2"'));
  if (id === 'ask') return g('data-s1-drawn="clue-ask"', path('M10,14 L90,14 Q96,14 96,20 L96,62 Q96,68 90,68 L44,68 L26,86 L28,68 L10,68 Q4,68 4,62 L4,20 Q4,14 10,14 Z', '#FFFFFF', 2.2) + `<text x="50" y="58" text-anchor="middle" font-family="Baloo 2, cursive" font-weight="700" font-size="44" fill="${T.teal}">?</text>`);
  throw new Error('interviewClue: ' + id);
}

/* ================================================================ black and white (the old photograph) */
const GREYS = ['#FFFFFF', C.g1, C.g2, C.g3, C.g4, C.g5, C.g6, C.g7, C.g8, C.g9];
const lum = (h) => { const n = parseInt(h.slice(1), 16); return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255); };
/** every colour of a drawing turned to the nearest grey of the photo palette (a 1950s black-and-white photograph) */
const toGrey = (svg) => svg.replace(/#[0-9A-Fa-f]{6}\b/g, (h) => { const L = lum(h); let best = GREYS[0], d = 1e9; for (const g2 of GREYS) { const e = Math.abs(lum(g2) - L); if (e < d) { d = e; best = g2; } } return best; });

/* ================================================================ G1-656: the old postcard (0 0 320 210 each side) */
/** the front: a black-and-white town street of the 1950s, the shop sign `shop` across a store front */
function postcardFront(pc, k) {
  let s = rect(0, 0, 320, 210, '#EEF6F8') + rect(0, 150, 320, 60, '#B9B4AC') + rect(0, 140, 320, 12, '#C8C2B6') + line(0, 140, 320, 140, OUT, 1) + line(0, 152, 320, 152, OUT, 1);
  // the stores, the sign of one of them; awnings; a lamp post
  const store = (x, w, c, aw) => orect(x, 40, w, 100, c, 1.4) + orect(x + 8, 92, w * 0.42, 36, '#DDEFF5', 1.1) + orect(x + w * 0.62, 96, w * 0.26, 44, '#8B5E3C', 1.1) + path(`M${x + 4},84 L${x + w - 4},84 L${x + w},96 L${x},96 Z`, aw, 1.1) + [0, 1, 2].map((q) => orect(x + 10 + q * (w - 20) / 3, 52, (w - 20) / 3 - 6, 20, '#DDEFF5', 0.9)).join('');
  s += store(6, 96, '#C96B4B', '#F2784B') + store(106, 110, '#E9E2D0', '#4A7BD0') + store(220, 94, '#B07A4E', '#6BB36B');
  s += g('data-s1-clue="sign" data-s1-drawn="shop-sign"', orect(78, 20, 166, 22, '#FFFFFF', 1.4) + `<text x="161" y="36" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="12.5" fill="${OUT}">${pc.shop.toUpperCase()}</text>`);
  s += line(300, 140, 300, 60, '#5A5A5A', 2.4) + circ(300, 56, 5, '#F7F4EE', 1.2);
  // a car of the 1950s: rounded, a long hood, fenders over the wheels
  s += g('data-s1-drawn="old-car"', path('M28,186 L30,170 Q34,162 46,160 L60,158 Q68,146 84,144 L104,144 Q116,146 122,158 L140,160 Q150,162 150,172 L150,186 Z', '#4A7BD0', 1.6) + path('M70,158 Q76,148 86,147 L100,147 L100,158 Z', '#DDEFF5', 1.1) + path('M104,147 Q112,148 118,158 L104,158 Z', '#DDEFF5', 1.1) +
    `<circle cx="56" cy="186" r="11" fill="${OUT}"/><circle cx="56" cy="186" r="5" fill="#E8E2D6"/><circle cx="124" cy="186" r="11" fill="${OUT}"/><circle cx="124" cy="186" r="5" fill="#E8E2D6"/>` + orect(143, 168, 8, 5, '#F7F4EE', 0.8));
  // people of the 1950s on the sidewalk: a woman with a hat and a long coat, a man with a hat, a child
  const hat = (p, c) => { const h = p.head(); return `<ellipse cx="${f1(h.x)}" cy="${f1(h.y - h.r * 0.7)}" rx="${f1(h.r * 1.6)}" ry="${f1(h.r * 0.3)}" fill="${c}" stroke="${OUT}" stroke-width="1"/><path d="M${f1(h.x - h.r * 0.85)},${f1(h.y - h.r * 0.75)} Q${f1(h.x - h.r * 0.85)},${f1(h.y - h.r * 1.6)} ${f1(h.x)},${f1(h.y - h.r * 1.6)} Q${f1(h.x + h.r * 0.85)},${f1(h.y - h.r * 1.6)} ${f1(h.x + h.r * 0.85)},${f1(h.y - h.r * 0.75)} Z" fill="${c}" stroke="${OUT}" stroke-width="1"/>`; };
  const w = { age: 'adult', s: 0.88, x: 200, y: 150, ...k[0], hair: 'bun', top: 'purple', bottom: 'skirt', bottomColor: 'navy', look: -1, coat: 'navy' };
  const m = { age: 'adult', s: 0.9, x: 262, y: 150, ...k[1], hair: 'short', top: '#FFFFFF', bottomColor: 'dark', coat: '#7A5230', look: -1 };
  const c = { age: 'child', s: 0.95, x: 228, y: 150, ...k[2], hair: 'short', top: 'red', bottom: 'shorts', bottomColor: 'navy', look: 1 };
  const wp = person(w), mp = person(m);
  s += wp.svg + hat(wp, '#8E6CC5') + mp.svg + hat(mp, '#4A4A4A') + P(c);
  return toGrey(g('data-s1-drawn="postcard-front"', s) + rect(0, 0, 320, 210, 'none', ` stroke="${OUT}" stroke-width="2.4"`));
}
/** the back: "POST CARD", the photo credit (who made it and where), the date stamp (when), the stamp, the address lines */
function postcardBack(pc) {
  let s = rect(0, 0, 320, 210, '#FFFFFF') + `<text x="160" y="26" text-anchor="middle" font-family="Baloo 2, cursive" font-weight="700" font-size="17" letter-spacing="3" fill="${OUT}">POST CARD</text>` + line(160, 40, 160, 196, OUT, 1.2);
  s += g('data-s1-clue="studio"', `<text x="14" y="62" font-family="Nunito, sans-serif" font-weight="800" font-size="15.5" fill="${OUT}">Photo by</text><text x="14" y="82" font-family="Nunito, sans-serif" font-weight="800" font-size="15.5" fill="${OUT}">${pc.studio},</text><text x="14" y="102" font-family="Nunito, sans-serif" font-weight="800" font-size="15.5" fill="${OUT}">${pc.town}, ${pc.year}</text>`);
  s += g('data-s1-drawn="stamp"', orect(268, 44, 40, 48, '#FFFFFF', 1.2, ' stroke-dasharray="2 1.5"') + orect(273, 49, 30, 38, '#A7B3BE', 0.8) + `<path d="M278,80 L288,60 L298,80 Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.8"/>`);
  s += g('data-s1-clue="date"', `<circle cx="226" cy="74" r="30" fill="none" stroke="${OUT}" stroke-width="2"/><circle cx="226" cy="74" r="23" fill="none" stroke="${OUT}" stroke-width="1"/><text x="226" y="81" text-anchor="middle" font-family="Baloo 2, cursive" font-weight="700" font-size="19" fill="${OUT}">${pc.year}</text>` +
    [0, 1, 2, 3].map((q) => `<path d="M${258 + q * 2},${62 + q * 8} q8,-5 16,0 q8,5 16,0" fill="none" stroke="${OUT}" stroke-width="1.2"/>`).join(''));
  s += [126, 150, 174].map((y) => line(176, y, 306, y, OUT, 1.1)).join('');
  return toGrey(g('data-s1-drawn="postcard-back"', s) + rect(0, 0, 320, 210, 'none', ` stroke="${OUT}" stroke-width="2.4"`));
}

/* ================================================================ G1-658: school and play long ago and today (0 0 100 100) */
/** a child in clothes of about 100 years ago (view px). Review round 1 (the white caps and smocks read as bakers or
 *  helmets): a GIRL in a long dress to the ankles with a white pinafore over it and a bonnet; a BOY in knee pants with
 *  long dark stockings, a white shirt, suspenders and a flat cap; both in high laced boots. `sex` 'f' | 'm'. */
function oldChild(o, look, sex = 'f') {
  const s = o.s || 1, x = o.x, y = o.y, Bd = BODY.child;
  const girl = sex === 'f';
  const base = { age: 'child', ...look, ...o, hair: girl ? 'braids' : 'short', top: girl ? '#7A5230' : '#FFFFFF', bottom: 'pants', bottomColor: girl ? '#3F5372' : '#7A5230' };
  const p = person(base);
  const h = p.head();
  const lean = o.lean || 0;
  // the lower legs (knee to foot) in view px, from the figure's own legs; the boots cover them from the ankle up
  const leg = (side) => { const hip = [(side < 0 ? -1 : 1) * (Bd.hip - Bd.lw * 0.5), -Bd.hipY], l = side < 0 ? (o.ll || [-1, Bd.leg * 0.48, -1.5, Bd.leg - 2]) : (o.rl || [1, Bd.leg * 0.48, 1.5, Bd.leg - 2]); const K2 = [hip[0] + l[0], hip[1] + l[1]], F = [hip[0] + l[2], hip[1] + l[3]]; return [K2, F].map((q) => [x + s * q[0], y + s * q[1]]); };
  let svg = p.svg;
  let extra = '';
  for (const sd of [-1, 1]) {
    const [Kp, Fp] = leg(sd);
    if (!girl) extra += line(Kp[0], Kp[1] + 1.5 * s, Fp[0], Fp[1], OUT, s * Bd.lw * 0.8 + 1.6, ' stroke-linecap="round"') + line(Kp[0], Kp[1] + 1.5 * s, Fp[0], Fp[1], '#595959', s * Bd.lw * 0.8, ' stroke-linecap="round" data-s1-drawn="stockings"');
    // a high laced boot: from the foot up a third of the way to the knee, black, a lace line
    const bx = Fp[0] + (Kp[0] - Fp[0]) * 0.45, by = Fp[1] + (Kp[1] - Fp[1]) * 0.45;
    extra += line(bx, by, Fp[0], Fp[1] - 1 * s, OUT, s * Bd.lw * 0.86 + 1.6, ' stroke-linecap="round"') + line(bx, by, Fp[0], Fp[1] - 1 * s, '#2B2522', s * Bd.lw * 0.86, ' stroke-linecap="round" data-s1-drawn="high-boots"') + `<ellipse cx="${f1(Fp[0] + sd * 2 * s)}" cy="${f1(Fp[1])}" rx="${f1(s * Bd.lw * 0.72)}" ry="${f1(s * Bd.lw * 0.42)}" fill="#2B2522" stroke="${OUT}" stroke-width="1"/>` +
      line(bx - 1.5 * s, by + 2 * s, bx + 1.5 * s, by + 3 * s, '#A6A6A6', 0.8) + line(bx - 1.5 * s, by + 4.5 * s, bx + 1.5 * s, by + 5.5 * s, '#A6A6A6', 0.8);
  }
  const rot = (inner) => (lean ? `<g transform="rotate(${f1(lean)} ${f1(x)} ${f1(y - Bd.hipY * s)})">${inner}</g>` : inner);
  if (girl) {
    // the long dress (to the ankles), the white pinafore (a bib with straps, a skirt with a hem frill), the bonnet
    const dress = path(`M${f1(x - 8 * s)},${f1(y - 44 * s)} L${f1(x + 8 * s)},${f1(y - 44 * s)} L${f1(x + 15 * s)},${f1(y - 7 * s)} L${f1(x - 15 * s)},${f1(y - 7 * s)} Z`, '#7B4A26', 1.2, ' data-s1-drawn="long-dress"');
    const pin = path(`M${f1(x - 5 * s)},${f1(y - 40 * s)} L${f1(x + 5 * s)},${f1(y - 40 * s)} L${f1(x + 5 * s)},${f1(y - 28 * s)} L${f1(x + 10 * s)},${f1(y - 12 * s)} L${f1(x - 10 * s)},${f1(y - 12 * s)} L${f1(x - 5 * s)},${f1(y - 28 * s)} Z`, '#FFFFFF', 1, ' data-s1-drawn="pinafore"') +
      line(x - 5 * s, y - 40 * s, x - 7 * s, y - 44 * s, OUT, 1.6) + line(x + 5 * s, y - 40 * s, x + 7 * s, y - 44 * s, OUT, 1.6) + `<path d="M${f1(x - 10 * s)},${f1(y - 12 * s)} ${Array.from({ length: 5 }, () => `q${f1(2 * s)},${f1(2.4 * s)} ${f1(4 * s)},0`).join(' ')}" fill="none" stroke="${OUT}" stroke-width="0.9"/>`;
    const bonnet = `<path d="M${f1(h.x - h.r * 1.25)},${f1(h.y + h.r * 0.3)} Q${f1(h.x - h.r * 1.3)},${f1(h.y - h.r * 1.4)} ${f1(h.x)},${f1(h.y - h.r * 1.35)} Q${f1(h.x + h.r * 1.3)},${f1(h.y - h.r * 1.4)} ${f1(h.x + h.r * 1.25)},${f1(h.y + h.r * 0.3)} Q${f1(h.x)},${f1(h.y - h.r * 0.75)} ${f1(h.x - h.r * 1.25)},${f1(h.y + h.r * 0.3)} Z" fill="#E98AB0" stroke="${OUT}" stroke-width="1.1" data-s1-drawn="bonnet"/>` +
      `<path d="M${f1(h.x - h.r * 1.0)},${f1(h.y + h.r * 0.3)} Q${f1(h.x - h.r * 0.6)},${f1(h.y + h.r * 1.3)} ${f1(h.x - h.r * 0.2)},${f1(h.y + h.r * 1.2)}" fill="none" stroke="#E98AB0" stroke-width="1.6"/>`;
    svg += extra + rot(dress + pin) + bonnet;
  } else {
    // knee pants end at the knee (the stockings below are drawn above), suspenders over the white shirt, a flat cap
    const sus = [-1, 1].map((sd) => line(x + sd * 4.6 * s, y - 43 * s, x + sd * 4 * s, y - 26 * s, '#3F5372', 2.2 * s, ' stroke-linecap="round"')).join('');
    const cap = `<path d="M${f1(h.x - h.r * 1.12)},${f1(h.y - h.r * 0.35)} Q${f1(h.x - h.r * 1.0)},${f1(h.y - h.r * 1.3)} ${f1(h.x + h.r * 0.2)},${f1(h.y - h.r * 1.25)} Q${f1(h.x + h.r * 1.25)},${f1(h.y - h.r * 1.15)} ${f1(h.x + h.r * 1.15)},${f1(h.y - h.r * 0.45)} Z" fill="#5A6470" stroke="${OUT}" stroke-width="1.1"/>` +
      `<path d="M${f1(h.x - h.r * 0.9)},${f1(h.y - h.r * 0.42)} Q${f1(h.x)},${f1(h.y - h.r * 0.1)} ${f1(h.x + h.r * 1.25)},${f1(h.y - h.r * 0.42)} Q${f1(h.x)},${f1(h.y - h.r * 0.62)} ${f1(h.x - h.r * 0.9)},${f1(h.y - h.r * 0.42)} Z" fill="#404040" stroke="${OUT}" stroke-width="1"/>`;
    svg += extra + rot(g('data-s1-drawn="suspenders"', sus)) + g('data-s1-drawn="flat-cap"', cap) + `<g data-s1-drawn="knee-pants"></g>`;
  }
  return { svg, p };
}
function thenNowArt(id, look) {
  const sky = rect(0, 0, 100, 100, '#EEF6F8');
  if (id === 'schoolhouse') return sky + rect(0, 78, 100, 22, '#9CCB7C') + line(0, 78, 100, 78, OUT, 1) + g('data-s1-drawn="one-room-school"', orect(22, 44, 56, 36, '#C0504D', 1.6) + path('M16,46 L50,24 L84,46 Z', '#8B5E3C', 1.6) + orect(44, 10, 12, 16, '#F7F4EE', 1.2) + path('M42,11 L50,3 L58,11 Z', '#8B5E3C', 1.1) + `<path d="M47,22 Q50,14 53,22 Z" fill="#E6B422" stroke="${OUT}" stroke-width="0.8"/>` + orect(44, 58, 12, 22, '#7B4A26', 1.1) + orect(28, 54, 10, 12, '#DDEFF5', 1) + orect(62, 54, 10, 12, '#DDEFF5', 1) + [26, 34, 42, 58, 66, 74].map((x2) => line(x2, 46, x2, 80, '#9B3B34', 0.6)).join('')) + `<path d="M50,80 Q46,90 30,100" fill="none" stroke="#C9A66B" stroke-width="8"/>`;
  if (id === 'school-today') return sky + rect(0, 80, 100, 20, '#B9B4AC') + line(0, 80, 100, 80, OUT, 1) + g('data-s1-drawn="school-today"', orect(4, 30, 92, 50, C.schoolNew, 1.6) + orect(2, 26, 96, 6, '#8C8C8C', 1.2) + [0, 1].map((r) => [0, 1, 2, 3, 4, 5].map((c) => (c === 2 || c === 3) && r === 1 ? '' : orect(8 + c * 14.6, 36 + r * 21, 11, 15, C.glassBlue, 0.9)).join('')).join('') + orect(37, 58, 26, 22, C.glassBlue, 1.2) + line(50, 58, 50, 80, OUT, 1)) + line(92, 80, 92, 8, '#5A5A5A', 1.4) + rect(80, 8, 12, 8, '#D9534F');
  // review round 1: the pen's tip dips INTO the inkwell (a dip pen and an inkwell; "a pen and ink" fits today too)
  if (id === 'pen-ink') return rect(0, 0, 100, 100, '#F7EEDD') + g('data-s1-drawn="inkwell"', path('M18,60 L58,60 L62,92 L14,92 Z', '#3F5372', 1.8) + orect(28, 48, 20, 13, '#3F5372', 1.4)) +
    g('data-s1-drawn="dip-pen"', `<g transform="rotate(32 38 50)">${orect(34, -10, 8, 50, '#B07A4E', 1.4, ' rx="3"')}${orect(33.5, 38, 9, 8, '#A7B3BE', 1.1)}<path d="M34,46 L42,46 L38,58 Z" fill="#9AA4AE" stroke="${OUT}" stroke-width="1.1"/>${line(38, 49, 38, 56, OUT, 0.8)}</g>`) +
    g('data-s1-drawn="dipping"', `<ellipse cx="38" cy="48" rx="10" ry="3" fill="${OUT}"/><path d="M28,48 Q38,53 48,48" fill="#3F5372" stroke="${OUT}" stroke-width="1.4"/>`) +
    `<path d="M66,92 q8,-6 14,-2 q6,4 14,-2" fill="none" stroke="${OUT}" stroke-width="1.6" stroke-linecap="round"/><path d="M70,80 q6,-4 10,-1 q5,3 10,-1" fill="none" stroke="${OUT}" stroke-width="1.6" stroke-linecap="round"/>` + rect(64, 70, 34, 26, 'none', ` stroke="${OUT}" stroke-width="1"`).replace('<rect', '<rect data-s1-drawn="paper"');
  if (id === 'laptop') return rect(0, 0, 100, 100, '#EAF2EE') + g('data-s1-drawn="laptop"', path('M16,24 L84,24 L84,68 L16,68 Z', C.laptop, 2) + rect(21, 29, 58, 34, '#FFFFFF') + [36, 43, 50, 57].map((y, q) => line(26, y, 74 - q * 6, y, '#A7B3BE', 2.2)).join('') + path('M6,70 L94,70 L88,82 L12,82 Z', '#A7B3BE', 1.8) + [74, 77].map((y) => line(20, y, 80, y, OUT, 0.6, ' stroke-dasharray="2 1.5"')).join(''));
  if (id === 'walk-pail') {
    // two children of long ago walking to school together (a second child, so a page never shows one skin tone only)
    const ch = oldChild({ x: 58, y: 92, s: 1.04, look: -1, la: [-3, 9, -5, 18], ll: [-3, 12, -6, 24], rl: [3, 12, 6, 24] }, look);
    const ch2 = oldChild({ x: 28, y: 88, s: 0.92, look: 1, la: [-3, 9, -5, 18], ra: [3, 9, 5, 18], ll: [-3, 12, -6, 24], rl: [3, 12, 6, 24] }, look.other || look, 'm');
    const hd = ch.p.hand('r');
    return sky + rect(0, 70, 100, 30, '#9CCB7C') + `<path d="M0,100 L30,72 L60,72 L100,100 Z" fill="#C9A66B"/>` + g('data-s1-drawn="fence"', [8, 18, 82, 92].map((x2) => orect(x2, 58, 4, 16, '#B07A4E', 0.8)).join('') + line(4, 62, 24, 62, '#B07A4E', 2) + line(78, 62, 98, 62, '#B07A4E', 2)) + g('data-s1-drawn="old-clothes-child"', ch2.svg + ch.svg) +
      g('data-s1-drawn="lunch-pail"', `<path d="M${f1(hd[0] - 1)},${f1(hd[1])} Q${f1(hd[0] + 6)},${f1(hd[1] - 5)} ${f1(hd[0] + 13)},${f1(hd[1])}" fill="none" stroke="${OUT}" stroke-width="1.2"/>` + path(`M${f1(hd[0] - 1)},${f1(hd[1] + 2)} L${f1(hd[0] + 13)},${f1(hd[1] + 2)} L${f1(hd[0] + 11)},${f1(hd[1] + 15)} L${f1(hd[0] + 1)},${f1(hd[1] + 15)} Z`, C.pail, 1.2));
  }
  if (id === 'hoop') {
    const ch = oldChild({ x: 30, y: 94, s: 1.0, look: 1, lean: 8, ll: [-4, 11, -10, 22], rl: [4, 11, 10, 22], la: [-3, 9, -5, 18] }, look, 'm');
    const ch2 = oldChild({ x: 12, y: 80, s: 0.66, look: 1, la: [-3, 9, -5, 17], ra: [3, 9, 5, 17] }, look.other || look, 'f');
    const hd = ch.p.hand('r');
    return sky + rect(0, 80, 100, 20, '#C9A66B') + line(0, 80, 100, 80, OUT, 1) + g('data-s1-drawn="old-clothes-child"', ch2.svg + ch.svg) + g('data-s1-drawn="hoop-and-stick"', `<circle cx="72" cy="70" r="20" fill="none" stroke="${OUT}" stroke-width="5.4"/><circle cx="72" cy="70" r="20" fill="none" stroke="${C.hoop}" stroke-width="3.4"/>` + line(hd[0], hd[1], 58, 80, OUT, 3.4) + line(hd[0], hd[1], 58, 80, '#8B5E3C', 2)) + K.motion(96, 64, 1, 3, 4);
  }
  if (id === 'tablet-game') return rect(0, 0, 100, 100, '#EAF2EE') + g('data-s1-drawn="tablet-game"', orect(12, 16, 76, 64, '#3B3F46', 2, ' rx="7"') + rect(18, 22, 64, 52, C.screenGame) + rect(18, 64, 64, 10, '#6BB36B') + [[26, 56, '#F4C542'], [40, 50, '#E4574B'], [54, 56, '#8E6CC5']].map(([x2, y2, c]) => orect(x2, y2, 10, 8, c, 0.8)).join('') + circ(72, 44, 6, '#F2784B', 1) + `<circle cx="74" cy="43" r="1.2" fill="${OUT}"/>` + `<path d="M24,32 l4,-6 l4,6 Z" fill="#F7C948"/>`);
  throw new Error('thenNowArt: ' + id);
}

/* ================================================================ G1-659: three communities (0 0 200 140) */
function communityArt(id, k) {
  if (id === 'city') {
    let s = rect(0, 0, 200, 140, '#EEF6F8');
    const tower = (x, w, h, c) => orect(x, 96 - h, w, h, c, 1.4) + Array.from({ length: Math.floor((h - 8) / 11) }, (_, r) => Array.from({ length: Math.floor((w - 4) / 9) }, (__, q) => orect(x + 4 + q * 9, 96 - h + 5 + r * 11, 5, 6, '#DDEFF5', 0.6)).join('')).join('');
    s += g('data-s1-drawn="apartment-building"', tower(4, 40, 88, '#B07A4E') + tower(48, 30, 70, '#A7B3BE') + tower(82, 44, 92, '#C96B4B') + tower(130, 34, 78, '#8C8C8C') + tower(168, 30, 64, '#E9E2D0'));
    s += rect(0, 96, 200, 14, '#7A7F86') + line(0, 96, 200, 96, OUT, 1.2) + line(0, 110, 200, 110, OUT, 1.2) + `<line x1="0" y1="103" x2="200" y2="103" stroke="${C.stripe}" stroke-width="1.4" stroke-dasharray="7 6"/>`;
    s += g('data-s1-drawn="taxi"', `<g transform="translate(120 92) scale(0.36)">${K.OBJ.car().replace('data-sk-drawn="car"', '').replace(/#4A7BD0/g, '#F4C542')}</g>`);
    // the cut-away: under the street, the subway tunnel and its train
    s += g('data-s1-drawn="subway"', rect(0, 110, 200, 30, '#8B5E3C') + orect(6, 116, 188, 22, '#5A5A5A', 1.2) + orect(20, 119, 120, 16, '#A7B3BE', 1.2, ' rx="4"') + [0, 1, 2, 3, 4, 5].map((q) => orect(26 + q * 19, 122, 12, 7, '#DDEFF5', 0.7)).join('') + `<path d="M140,119 Q156,121 158,135 L140,135 Z" fill="#A7B3BE" stroke="${OUT}" stroke-width="1.2"/>` + line(140, 119, 140, 135, OUT, 1));
    s += g('data-s1-drawn="subway-stairs"', orect(170, 96, 16, 14, '#5A5A5A', 1) + [0, 1, 2].map((q) => line(171, 100 + q * 3.5, 185, 100 + q * 3.5, '#A7B3BE', 1.2)).join(''));
    return s;
  }
  if (id === 'suburb') {
    let s = rect(0, 0, 200, 140, '#EEF6F8') + rect(0, 58, 200, 82, '#9CCB7C') + line(0, 58, 200, 58, OUT, 1);
    // the shopping center far back with its big parking lot and cars
    s += g('data-s1-drawn="shopping-center"', orect(10, 18, 120, 30, '#E9E2D0', 1.4) + rect(8, 14, 124, 6, '#F2784B') + line(8, 14, 132, 14, OUT, 1) + line(8, 20, 132, 20, OUT, 1) + [0, 1, 2, 3].map((q) => orect(16 + q * 28, 28, 20, 20, '#DDEFF5', 1)).join('') +
      orect(4, 48, 150, 14, '#B9B4AC', 1) + [0, 1, 2, 3, 4, 5, 6].map((q) => line(10 + q * 20, 50, 10 + q * 20, 60, '#FFFFFF', 1)).join('') + [[22, '#D9534F'], [62, '#4A7BD0'], [102, '#F4C542']].map(([x, c]) => orect(x - 6, 51, 12, 7, c, 0.8, ' rx="2"')).join(''));
    // review round 2: each house's garage is marked and reads as one (a door of panels, a driveway to the street): the
    // sentence "Our house has a garage for our car." fits the suburb only (no garage in the city or the farm town)
    const house = (x, y, c, roof) => g('data-s1-drawn="house-with-yard"', rect(x - 6, y + 26, 56, 18, '#7FB86A') + `<path d="M${x - 6},${y + 34} L${x + 50},${y + 34}" stroke="#FFFFFF" stroke-width="1.4" stroke-dasharray="2 3"/>` + orect(x, y, 28, 26, c, 1.3) + path(`M${x - 3},${y + 1} L${x + 14},${y - 12} L${x + 31},${y + 1} Z`, roof, 1.2) +
      g('data-s1-drawn="garage"', rect(x + 30, y + 26, 12, 9, '#B9B4AC') + orect(x + 28, y + 8, 16, 18, '#E8E2D6', 1.2) + orect(x + 30, y + 12, 12, 14, '#A7B3BE', 0.8) + [16, 19.5, 23].map((d) => line(x + 30, y + d, x + 42, y + d, '#8C8C8C', 0.7)).join('')) +
      orect(x + 10, y + 14, 8, 12, '#8B5E3C', 0.9) + orect(x + 3, y + 6, 6, 6, '#DDEFF5', 0.7) + orect(x + 19, y + 6, 6, 6, '#DDEFF5', 0.7));
    s += `<path d="M0,112 L200,112" stroke="#B9B4AC" stroke-width="10"/>`;
    s += house(10, 78, '#F4EBD9', '#8C8C8C') + house(74, 78, '#F7C948', '#A8483A') + house(138, 78, '#BFE3F2', '#7B4A26');
    s += g('data-s1-drawn="car"', `<g transform="translate(150 106) scale(0.26)">${K.OBJ.car().replace('data-sk-drawn="car"', '')}</g>`);
    return s;
  }
  if (id === 'town') {
    let s = rect(0, 0, 200, 140, '#EEF6F8');
    // review round 1: the TOWN of the farm town, small in the distance behind the fields: a main street of shop fronts
    // with awnings, a church steeple and a water tower (the silo and the corn stay in front)
    const shop = (x, w, h, c, aw) => orect(x, 61 - h, w, h, c, 1) + path(`M${x - 1},${61 - h + 5} L${x + w + 1},${61 - h + 5} L${x + w},${61 - h + 8} L${x},${61 - h + 8} Z`, aw, 0.7) + orect(x + w * 0.3, 61 - h + 10, w * 0.4, h - 10, '#DDEFF5', 0.6);
    s += g('data-s1-drawn="main-street"', shop(26, 11, 17, '#E9E2D0', '#F2784B') + shop(38, 12, 20, '#C96B4B', '#4A7BD0') + shop(51, 10, 16, '#F4EBD9', '#6BB36B'));
    s += g('data-s1-drawn="church-steeple"', orect(6, 40, 16, 21, '#FFFFFF', 1) + path('M4,41 L14,33 L24,41 Z', '#8C8C8C', 0.9) + orect(10, 20, 8, 14, '#FFFFFF', 0.9) + path('M9,21 L14,8 L19,21 Z', '#8C8C8C', 0.9) + orect(12, 50, 4, 11, '#8B5E3C', 0.6));
    s += g('data-s1-drawn="water-tower"', line(66, 61, 68, 36, OUT, 1) + line(78, 61, 76, 36, OUT, 1) + line(67, 50, 77, 50, OUT, 0.7) + `<ellipse cx="72" cy="35" rx="9" ry="3" fill="#A7B3BE" stroke="${OUT}" stroke-width="0.9"/>` + path('M63,35 L63,25 Q72,19 81,25 L81,35 Q72,38 63,35 Z', '#A7B3BE', 1));
    s += `<path d="M0,64 Q60,56 120,62 Q170,66 200,60 L200,140 L0,140 Z" fill="#9CCB7C" stroke="${OUT}" stroke-width="1"/>`;
    // the corn field: rows of green stalks in front
    s += g('data-s1-drawn="corn-field"', rect(0, 96, 200, 44, '#B9D98A') + Array.from({ length: 9 }, (_, r) => Array.from({ length: 6 }, (__, q) => { const x = 8 + r * 22 + (q % 2) * 6, y = 104 + q * 6; return `<path d="M${x},${y + 8} L${x},${y - 6}" stroke="${C.stem}" stroke-width="1.6"/><path d="M${x},${y} q-5,-2 -7,-6 M${x},${y - 3} q5,-2 7,-6" fill="none" stroke="${C.stem}" stroke-width="1.4"/><ellipse cx="${x + 2}" cy="${y - 2}" rx="1.4" ry="3" fill="#F4C542"/>`; }).join('')).join(''));
    s += g('data-s1-drawn="barn"', orect(84, 52, 46, 40, C.barn, 1.5) + path('M80,54 L107,34 L134,54 Z', '#8B3A2E', 1.4) + orect(98, 66, 18, 26, '#8B3A2E', 1.2) + `<path d="M98,66 L116,92 M116,66 L98,92" stroke="#FFFFFF" stroke-width="1.4"/>`);
    s += g('data-s1-drawn="grain-silo"', orect(136, 28, 22, 64, C.silo, 1.5) + `<path d="M136,28 Q147,14 158,28 Z" fill="#A7B3BE" stroke="${OUT}" stroke-width="1.3"/>` + [40, 52, 64, 76].map((y) => line(136, y, 158, y, '#8C8C8C', 0.8)).join(''));
    s += g('data-s1-drawn="tractor"', `<g transform="translate(20 70)">${orect(10, 6, 24, 14, '#D9534F', 1.2)}${orect(22, -6, 12, 14, '#DDEFF5', 1.1)}<circle cx="30" cy="22" r="9" fill="${OUT}"/><circle cx="30" cy="22" r="4" fill="#A7B3BE"/><circle cx="10" cy="24" r="6" fill="${OUT}"/><circle cx="10" cy="24" r="2.6" fill="#A7B3BE"/>${line(14, 6, 14, -2, OUT, 1.6)}</g>`);
    s += g('data-s1-drawn="cow"', `<g transform="translate(168 78)"><ellipse cx="0" cy="0" rx="12" ry="7" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.1"/><ellipse cx="-3" cy="-1" rx="4" ry="3" fill="${OUT}"/><ellipse cx="13" cy="-4" rx="5" ry="4" fill="#FFFFFF" stroke="${OUT}" stroke-width="1"/>${[-8, -3, 4, 9].map((x) => line(x, 5, x, 13, OUT, 1.6)).join('')}</g>`);
    return s;
  }
  throw new Error('communityArt: ' + id);
}

/* ================================================================ G1-660: the land (0 0 200 140) and the workers (0 0 100 100) */
function landArt(id) {
  if (id === 'coast') {
    let s = rect(0, 0, 200, 140, '#EEF6F8') + rect(0, 60, 200, 80, C.sea) + line(0, 60, 200, 60, OUT, 1);
    s += [70, 86, 102, 118, 132].map((y, q) => `<path d="M${10 + (q % 2) * 20},${y} q8,-4 16,0 q8,4 16,0 M${100 + (q % 2) * 16},${y} q8,-4 16,0 q8,4 16,0" fill="none" stroke="#FFFFFF" stroke-width="1.3"/>`).join('');
    s += g('data-s1-drawn="shore"', path('M120,140 L128,96 Q150,82 176,86 Q194,84 200,80 L200,140 Z', '#F1DDA6', 1.2) + path('M150,90 Q160,72 174,78 Q180,86 170,92 Z', C.rock, 1.1));
    s += g('data-s1-drawn="dock"', orect(96, 96, 56, 6, '#B07A4E', 1.2) + [100, 116, 132, 148].map((x) => orect(x, 102, 3, 14, '#8B5E3C', 0.8)).join(''));
    const boat = (x, y, c) => path(`M${x},${y} L${x + 34},${y} L${x + 28},${y + 10} L${x + 6},${y + 10} Z`, c, 1.3) + orect(x + 14, y - 12, 10, 12, '#FFFFFF', 1) + line(x + 8, y, x + 8, y - 22, OUT, 1.2) + line(x + 8, y - 22, x + 30, y - 4, OUT, 0.8);
    s += g('data-s1-drawn="fishing-boats"', boat(30, 92, '#D9534F') + boat(56, 116, '#F4C542'));
    s += g('data-s1-drawn="gulls"', [[40, 26], [58, 18], [150, 30]].map(([x, y]) => `<path d="M${x - 6},${y} q3,-4 6,0 q3,-4 6,0" fill="none" stroke="${OUT}" stroke-width="1.4"/>`).join(''));
    return s;
  }
  if (id === 'forest') {
    let s = rect(0, 0, 200, 140, '#EEF6F8') + `<path d="M0,70 Q50,40 100,62 Q150,40 200,66 L200,140 L0,140 Z" fill="#7FB86A" stroke="${OUT}" stroke-width="1"/>`;
    const pine = (x, y, h) => `<rect x="${f1(x - h * 0.05)}" y="${f1(y - h * 0.2)}" width="${f1(h * 0.1)}" height="${f1(h * 0.2)}" fill="#8B5E3C" stroke="${OUT}" stroke-width="0.9"/>` + [0, 1, 2].map((q) => { const w = h * (0.34 - q * 0.08), yb = y - h * (0.16 + q * 0.24); return `<path d="M${f1(x - w)},${f1(yb)} L${f1(x)},${f1(yb - h * 0.36)} L${f1(x + w)},${f1(yb)} Z" fill="${q % 2 ? '#3F8F5A' : C.pineDark}" stroke="${OUT}" stroke-width="1"/>`; }).join('');
    s += g('data-s1-drawn="tall-trees"', [[16, 96, 70], [40, 104, 80], [66, 92, 64], [90, 108, 86], [116, 96, 72], [140, 106, 82], [166, 94, 66], [188, 104, 78], [30, 134, 66], [78, 138, 70], [128, 136, 72], [176, 138, 68]].map(([x, y, h]) => pine(x, y, h)).join(''));
    return s;
  }
  if (id === 'farmland') {
    let s = rect(0, 0, 200, 140, '#EEF6F8') + K.sun(170, 24, 10);
    s += g('data-s1-drawn="wheat-field"', rect(0, 62, 200, 78, C.wheat) + line(0, 62, 200, 62, OUT, 1) + Array.from({ length: 11 }, (_, q) => `<path d="M100,62 L${-60 + q * 32},140" stroke="${C.wheatDark}" stroke-width="1.4"/>`).join('') + Array.from({ length: 18 }, (_, q) => { const x = 6 + q * 11, y = 120 + (q % 3) * 5; return `<path d="M${x},${y + 14} L${x},${y}" stroke="${C.wheatDark}" stroke-width="1.2"/><ellipse cx="${x}" cy="${y - 3}" rx="2" ry="4.4" fill="${C.wheatDark}"/>`; }).join(''));
    s += g('data-s1-drawn="far-barn"', orect(30, 48, 18, 14, C.barn, 1) + path('M28,49 L39,40 L50,49 Z', '#8B3A2E', 1));
    return s;
  }
  if (id === 'mountains') {
    let s = rect(0, 0, 200, 140, '#DDEFF5');
    s += g('data-s1-drawn="snowy-mountains"', path('M-10,140 L40,30 L80,96 L120,18 L170,92 L210,50 L210,140 Z', C.rock, 1.4) +
      path('M40,30 L22,70 L32,64 L40,74 L50,64 L58,60 Z', '#FFFFFF', 1) + path('M120,18 L98,62 L108,56 L118,68 L128,56 L142,58 Z', '#FFFFFF', 1) + path('M210,50 L198,70 L206,68 Z', '#FFFFFF', 1) +
      path('M-10,140 L-10,110 Q40,96 90,112 Q140,98 210,108 L210,140 Z', '#FFFFFF', 1.2) + `<path d="M70,128 Q100,118 130,126" fill="none" stroke="${C.g2}" stroke-width="1.2"/>`);
    return s;
  }
  throw new Error('landArt: ' + id);
}
function workerArt(id, look) {
  const bg = rect(0, 0, 100, 100, '#F4EBD9') + rect(0, 88, 100, 12, '#E6DBC6');
  const base = { age: 'adult', s: 0.84, x: 50, y: 98, ...look };
  if (id === 'fisher') {
    const o = { ...base, top: '#F4C542', bottom: 'pants', bottomColor: '#F4C542', ra: [6, 2, 14, -10], la: [-5, 8, -8, 17] };
    const p = person(o), h = p.head(), r = p.hand('r');
    return bg + p.svg + g('data-s1-drawn="rain-hat"', `<path d="M${f1(h.x - h.r * 1.6)},${f1(h.y - h.r * 0.2)} Q${f1(h.x)},${f1(h.y - h.r * 0.9)} ${f1(h.x + h.r * 1.6)},${f1(h.y - h.r * 0.2)} L${f1(h.x + h.r * 0.9)},${f1(h.y - h.r * 0.8)} Q${f1(h.x)},${f1(h.y - h.r * 1.6)} ${f1(h.x - h.r * 0.9)},${f1(h.y - h.r * 0.8)} Z" fill="#F4C542" stroke="${OUT}" stroke-width="1.1"/>`) +
      g('data-s1-drawn="big-fish"', `<g transform="rotate(-70 ${f1(r[0])} ${f1(r[1])})"><ellipse cx="${f1(r[0] + 14)}" cy="${f1(r[1])}" rx="15" ry="6.5" fill="#9AA4AE" stroke="${OUT}" stroke-width="1.2"/><path d="M${f1(r[0] + 28)},${f1(r[1])} l8,-6 l0,12 Z" fill="#9AA4AE" stroke="${OUT}" stroke-width="1.1"/><circle cx="${f1(r[0] + 6)}" cy="${f1(r[1] - 1.5)}" r="1.2" fill="${OUT}"/></g>`) +
      g('data-s1-drawn="fishing-net"', `<path d="M14,60 L30,60 L34,86 L10,86 Z" fill="none" stroke="${OUT}" stroke-width="1.2"/>` + [66, 72, 78].map((y) => line(12, y, 32, y, OUT, 0.7)).join('') + [18, 22, 26].map((x) => line(x, 60, x - 2, 86, OUT, 0.7)).join(''));
  }
  if (id === 'lumber') {
    // the log rests on the right shoulder, held by the right hand, beside the head (never across the face)
    const o = { ...base, x: 42, top: '#D9534F', bottomColor: 'denim', la: [-3, 9, -5, 18] };
    o.ra = armTo(o, 'r', 64, 34);
    const p = person(o), h = p.head();
    return bg + p.svg + `<path d="M${f1(h.x - 7)},${f1(h.y + 12)} L${f1(h.x - 7)},${f1(h.y + 40)} M${f1(h.x + 7)},${f1(h.y + 12)} L${f1(h.x + 7)},${f1(h.y + 40)} M${f1(h.x - 11)},${f1(h.y + 22)} L${f1(h.x + 11)},${f1(h.y + 22)} M${f1(h.x - 11)},${f1(h.y + 31)} L${f1(h.x + 11)},${f1(h.y + 31)}" stroke="#9B3B34" stroke-width="1.2"/>` +
      g('data-s1-drawn="hard-hat"', `<path d="M${f1(h.x - h.r * 1.05)},${f1(h.y - h.r * 0.25)} Q${f1(h.x - h.r)},${f1(h.y - h.r * 1.35)} ${f1(h.x)},${f1(h.y - h.r * 1.35)} Q${f1(h.x + h.r)},${f1(h.y - h.r * 1.35)} ${f1(h.x + h.r * 1.05)},${f1(h.y - h.r * 0.25)} Z" fill="#F39C40" stroke="${OUT}" stroke-width="1.1"/><rect x="${f1(h.x - h.r * 1.35)}" y="${f1(h.y - h.r * 0.35)}" width="${f1(h.r * 2.7)}" height="${f1(h.r * 0.28)}" rx="1" fill="#F39C40" stroke="${OUT}" stroke-width="1"/>`) +
      g('data-s1-drawn="logs"', `<g transform="rotate(-24 54 38)">${orect(52, 30, 46, 11, '#9B6A43', 1.3, ' rx="5.5"')}<ellipse cx="96" cy="35.5" rx="4" ry="5.5" fill="#E8B96A" stroke="${OUT}" stroke-width="1.1"/><circle cx="96" cy="35.5" r="2" fill="none" stroke="#9B6A43" stroke-width="0.8"/></g>`) + circ(p.hand('r')[0], p.hand('r')[1], 3.3, look.skin ? SKIN[look.skin] || '#F0C08F' : '#F0C08F', 1);
  }
  if (id === 'farmer') {
    const o = { ...base, x: 22, s: 0.7, y: 98, top: 'sky', bottomColor: 'denim', la: [-4, 9, -6, 18], ra: [4, 9, 6, 18] };
    const p = person(o), h = p.head();
    const strap = `<path d="M${f1(h.x - 5)},${f1(h.y + 11)} L${f1(h.x - 5)},${f1(h.y + 32)} M${f1(h.x + 5)},${f1(h.y + 11)} L${f1(h.x + 5)},${f1(h.y + 32)}" stroke="#4F6D9A" stroke-width="2.4"/>`;
    const hat = g('data-s1-drawn="straw-hat"', `<ellipse cx="${f1(h.x)}" cy="${f1(h.y - h.r * 0.6)}" rx="${f1(h.r * 1.8)}" ry="${f1(h.r * 0.35)}" fill="#E6C15A" stroke="${OUT}" stroke-width="1"/><path d="M${f1(h.x - h.r * 0.9)},${f1(h.y - h.r * 0.6)} Q${f1(h.x)},${f1(h.y - h.r * 1.9)} ${f1(h.x + h.r * 0.9)},${f1(h.y - h.r * 0.6)} Z" fill="#E6C15A" stroke="${OUT}" stroke-width="1"/>`);
    // the combine harvester: a green body, the cab, the big front wheel, the reel at the front (no field drawn)
    const combine = g('data-s1-drawn="combine"', orect(40, 40, 44, 32, '#3F9B4B', 1.5) + orect(60, 22, 20, 20, '#DDEFF5', 1.3) + orect(58, 20, 24, 4, '#3F9B4B', 1) + line(48, 40, 48, 26, OUT, 2) + orect(84, 58, 14, 14, '#3F9B4B', 1.2) + `<circle cx="91" cy="70" r="8" fill="none" stroke="${OUT}" stroke-width="1.4"/>` + [0, 1, 2, 3].map((q) => { const a = q * Math.PI / 4; return line(91 - Math.cos(a) * 8, 70 - Math.sin(a) * 8, 91 + Math.cos(a) * 8, 70 + Math.sin(a) * 8, OUT, 1); }).join('') + `<circle cx="56" cy="78" r="12" fill="${OUT}"/><circle cx="56" cy="78" r="5" fill="#F4C542"/><circle cx="78" cy="82" r="7" fill="${OUT}"/><circle cx="78" cy="82" r="3" fill="#F4C542"/>`);
    return bg + combine + p.svg + strap + hat;
  }
  if (id === 'ski') {
    // review round 1 (short blue strips and a red vest read as a hiker with walking sticks): the ski teacher in a puffy
    // coat, a knit hat with a pompom, goggles and mittens, on LONG skis with turned-up tips, poles in the mittens; a child
    // dressed the same on skis behind. Still no snow: the land is the match.
    const kid = { age: 'child', s: 0.66, x: 70, y: 84, ...look, skin: look.kidSkin || 's2', hair: 'short', top: '#4A7BD0', bottomColor: 'navy', coat: '#4A7BD0', la: [-5, 7, -10, 14], ra: [5, 7, 10, 14] };
    const o = { ...base, x: 40, y: 96, s: 0.8, top: '#D9534F', bottom: 'pants', bottomColor: 'navy', coat: '#D9534F', la: [-6, 8, -13, 17], ra: [6, 8, 13, 17] };
    const gear = (pp, coatC, hatC, mitC) => {
      const h = pp.head(), r = h.r, sc = pp.height / 100;
      // puffy coat: rounded quilt lines across the coat
      const sh = pp.shoulder('l'), sr = pp.shoulder('r'), y0 = sh[1];
      const quilt = [0.28, 0.52].map((k) => `<path d="M${f1(sh[0] - 1)},${f1(y0 + k * 40 * sc)} Q${f1((sh[0] + sr[0]) / 2)},${f1(y0 + k * 40 * sc + 3 * sc)} ${f1(sr[0] + 1)},${f1(y0 + k * 40 * sc)}" fill="none" stroke="${OUT}" stroke-width="0.9"/>`).join('');
      const hat = `<path d="M${f1(h.x - r * 1.05)},${f1(h.y - r * 0.25)} Q${f1(h.x - r * 1.1)},${f1(h.y - r * 1.4)} ${f1(h.x)},${f1(h.y - r * 1.4)} Q${f1(h.x + r * 1.1)},${f1(h.y - r * 1.4)} ${f1(h.x + r * 1.05)},${f1(h.y - r * 0.25)} Z" fill="${hatC}" stroke="${OUT}" stroke-width="1"/>` + orect(h.x - r * 1.1, h.y - r * 0.5, r * 2.2, r * 0.42, '#FFFFFF', 0.9, ' rx="1.5"') + circ(h.x, h.y - r * 1.5, r * 0.36, '#FFFFFF', 0.9);
      const goggles = orect(h.x - r * 0.95, h.y - r * 0.28, r * 1.9, r * 0.62, '#F2B233', 1, ` rx="${f1(r * 0.3)}"`) + line(h.x, h.y - r * 0.28, h.x, h.y + r * 0.34, OUT, 0.8);
      const mitt = ['l', 'r'].map((sd) => { const q = pp.hand(sd); return circ(q[0], q[1], r * 0.42, mitC, 1); }).join('');
      return g('data-s1-drawn="puffy-coat"', quilt) + g('data-s1-drawn="knit-hat"', hat) + g('data-s1-drawn="goggles"', goggles) + g('data-s1-drawn="mittens"', mitt);
    };
    // a long ski (side view) under the feet, its front tip turned up
    const ski = (x0, x1, y, c) => `<path d="M${f1(x0)},${f1(y)} L${f1(x1)},${f1(y)} Q${f1(x1 + 7)},${f1(y)} ${f1(x1 + 8)},${f1(y - 6)}" fill="none" stroke="${OUT}" stroke-width="4.6" stroke-linecap="round"/><path d="M${f1(x0)},${f1(y)} L${f1(x1)},${f1(y)} Q${f1(x1 + 7)},${f1(y)} ${f1(x1 + 8)},${f1(y - 6)}" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`;
    const pole = (q, yb) => line(q[0], q[1], q[0] + 4, yb, '#5A5A5A', 1.8) + `<ellipse cx="${f1(q[0] + 4)}" cy="${f1(yb - 3)}" rx="3" ry="1.2" fill="none" stroke="${OUT}" stroke-width="1"/>`;
    const kp = person(kid), p = person(o);
    let sv = bg;
    sv += g('data-s1-drawn="skis"', ski(kid.x - 20, kid.x + 18, kid.y, '#F39C40')) + kp.svg + gear(kp, kid.coat, '#4A7BD0', '#F4C542') + pole(kp.hand('l'), kid.y) + pole(kp.hand('r'), kid.y);
    sv += g('data-s1-drawn="skis"', ski(o.x - 30, o.x + 26, o.y, '#4A7BD0') + ski(o.x - 26, o.x + 30, o.y + 1.5, '#4A7BD0')) + p.svg + gear(p, o.coat, '#3F9B4B', '#3F5372') + pole(p.hand('l'), o.y) + pole(p.hand('r'), o.y);
    return sv;
  }
  throw new Error('workerArt: ' + id);
}

/* ================================================================ G1-661: the park, three times (0 0 260 120) */
/** the park in the morning (state 'clean'), in the evening after a careless crowd ('after': the changes in `changes`
 *  drawn, each a person's doing, never the weather), and on clean-up day ('cleanup': people fixing exactly those changes,
 *  new flowers, and ONE park visitor walking a dog who is not cleaning). The sky, the light and every other part are the
 *  SAME in all three. k = the helpers' looks (k[6] the visitor's).
 *  Review round 1: each change is ONE thing in one place (a candy wrapper, one cup, one plastic bag, a branch broken under
 *  its rope swing, the flower bed stepped on, the trash can on its side), drawn to read as its name at print size; the
 *  helpers stand apart, each at their own job. View box 0 0 260 120 (the sky and the grass run past it). */
function parkArt(state, changes, k = []) {
  const has = (c) => state === 'after' && changes.includes(c);
  const fix = (c) => state === 'cleanup' && changes.includes(c);
  let s = rect(-40, -30, 340, 180, '#EEF6F8') + rect(-40, 44, 340, 120, '#9CCB7C') + line(-40, 44, 300, 44, OUT, 1);
  s += `<path d="M118,126 Q126,84 136,44" fill="none" stroke="#E8E2D6" stroke-width="15"/>`;
  // the pond (front left), the flower bed (back left), the trash can, the bench, the big tree with its rope swing (right)
  s += g('data-s1-part="pond"', `<ellipse cx="48" cy="100" rx="36" ry="12" fill="#7FC8E8" stroke="${OUT}" stroke-width="1.3"/>`);
  s += g('data-s1-part="bench"', orect(150, 72, 40, 4, '#B07A4E', 1.1) + orect(150, 62, 40, 4, '#B07A4E', 1) + line(154, 76, 154, 86, OUT, 1.8) + line(186, 76, 186, 86, OUT, 1.8) + line(154, 66, 154, 72, OUT, 1.4) + line(186, 66, 186, 72, OUT, 1.4));
  // the swing on its branch: two ropes and a wooden seat (x, y = where the ropes meet the branch)
  const swingSeat = (x, y, len) => line(x, y, x, y + len, '#B07A4E', 1.4) + line(x + 10, y - 2, x + 10, y + len, '#B07A4E', 1.4) + orect(x - 3, y + len, 16, 3.4, '#8B5E3C', 0.9, ' rx="1"');
  const branchUp = path('M218,60 L248,50 L249,54 L219,64 Z', '#8B5E3C', 1) + `<ellipse cx="250" cy="47" rx="9" ry="6" fill="#6BB36B" stroke="${OUT}" stroke-width="1"/>` + g('data-s1-drawn="rope-swing"', swingSeat(230, 57, 30));
  const broken = has('branch') || fix('branch');
  s += g('data-s1-part="tree"', orect(209, 40, 10, 54, '#8B5E3C', 1.2) + circ(214, 28, 25, '#6BB36B', 1.3) + (broken ? `<path d="M218,58 l6,-2 l-2,3 l4,1 l-6,3 Z" fill="#E8B96A" stroke="${OUT}" stroke-width="0.9" data-s1-drawn="broken-stub"/>` : branchUp));
  if (has('branch')) s += g('data-s1-change="branch" data-dk-answer="change" data-s1-drawn="fallen-branch-with-swing"', path('M222,108 L254,100 L256,104 L224,112 Z', '#8B5E3C', 1.1) + [[234, 101], [246, 98], [256, 99]].map(([x, y]) => `<ellipse cx="${x}" cy="${y - 4}" rx="6" ry="4" fill="#6BB36B" stroke="${OUT}" stroke-width="0.9"/>`).join('') +
    `<path d="M232,107 Q230,112 226,114 M242,104 Q244,110 240,114" fill="none" stroke="#B07A4E" stroke-width="1.4"/>` + orect(222, 113, 22, 3.4, '#8B5E3C', 0.9, ' rx="1" transform="rotate(-6 233 115)"') + `<path d="M222,107 l-3,-2 l1,4 Z" fill="#E8B96A" stroke="${OUT}" stroke-width="0.8"/>`);
  // the flower bed: upright flowers; after the crowd a shoe print, two flowers broken off, loose petals; new flowers on clean-up day
  // review round 2: "stepped on" reads at print size: ONE big dark shoe print in the middle of the bed (a sole and a
  // heel), the two flowers that stood there broken off and lying on the dirt (bent stems), and a few loose petals; the
  // other four flowers stay upright, so the damage stands out against them (it was six bent flowers under pale ovals)
  const upright = (q, newer) => { const x = 12 + q * 9, c = [C.petal, C.petal2, C.petal3][q % 3]; return g('data-s1-drawn="flower-upright"', `<line x1="${x}" y1="66" x2="${x}" y2="54" stroke="${C.stem}" stroke-width="1.6"/>` + circ(x, 52, newer ? 3.4 : 4, c, 0.9) + `<circle cx="${x}" cy="52" r="1.3" fill="#F7C948"/>`); };
  const flowersUp = (newer) => [0, 1, 2, 3, 4, 5].map((q) => upright(q, newer)).join('');
  const stepped = g('data-s1-drawn="shoe-print"', `<g transform="translate(35 64) rotate(-8) scale(1.25) translate(-35 -64)"><path d="M33.6,64 Q33.6,61.3 37.4,61.2 Q42.4,61.2 42.6,64 Q42.4,66.8 37.4,66.8 Q33.6,66.7 33.6,64 Z" fill="#2B2522" stroke="${OUT}" stroke-width="0.8"/><path d="M27.4,64 Q27.4,62 29.6,61.9 L31.4,61.9 Q32.6,62 32.6,64 Q32.6,66 31.4,66.1 L29.6,66.1 Q27.4,66 27.4,64 Z" fill="#2B2522" stroke="${OUT}" stroke-width="0.8"/>` +
    [35.6, 37.6, 39.6].map((x) => line(x, 62.4, x, 65.6, '#8B5E3C', 0.9)).join('') + line(28.6, 63, 31.4, 63, '#8B5E3C', 0.8) + line(28.6, 65, 31.4, 65, '#8B5E3C', 0.8) + '</g>') +
    [[[22.8, 68.6], 'M24.6,68.4 Q27,67.2 28.8,68.2 L32,67.6', C.petal2], [[46.4, 68.8], 'M44.4,68.6 Q42.4,67.4 40.6,68.4 L37.6,67.8', C.petal]].map(([h, d, c]) => g('data-s1-drawn="broken-flower"', `<path d="${d}" fill="none" stroke="${C.stem}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` + `<ellipse cx="${h[0]}" cy="${h[1]}" rx="3.2" ry="2.3" fill="${c}" stroke="${OUT}" stroke-width="0.8"/><circle cx="${h[0]}" cy="${h[1]}" r="1" fill="#F7C948"/>`)).join('') +
    [[27, 61.2, C.petal2, 30], [43.4, 61, C.petal, -20], [34.8, 68.6, C.petal2, 10], [40.8, 66.4, C.petal, 60], [25.8, 65.6, C.petal, -40]].map(([x, y, c, a]) => `<ellipse cx="${x}" cy="${y}" rx="1.3" ry="0.75" fill="${c}" stroke="${OUT}" stroke-width="0.5" transform="rotate(${a} ${x} ${y})" data-s1-drawn="loose-petal"/>`).join('');
  s += g('data-s1-part="flower-bed"', `<ellipse cx="34" cy="64" rx="29" ry="6" fill="#8B5E3C" stroke="${OUT}" stroke-width="1"/>`);
  s += has('flowers') ? g('data-s1-part="flowers"', [0, 1, 4, 5].map((q) => upright(q, false)).join('')) + g('data-s1-change="flowers" data-dk-answer="change" data-s1-drawn="flowers-stepped-on"', stepped) : g('data-s1-part="flowers"', flowersUp(fix('flowers')));
  // the trash can: a green can with ribs, a lid and its handle; knocked over: on its side, the open end toward us, the
  // trash spilling out of it
  const canBody = (x) => orect(x - 7.5, 48, 15, 22, C.trashGreen, 1.2, ' rx="1.5"') + [-3.5, 0, 3.5].map((d) => line(x + d, 52, x + d, 67, '#2E6B45', 1)).join('');
  const canUp = (x) => canBody(x) + orect(x - 9, 44.5, 18, 4, C.trashGreen, 1.1, ' rx="1.5"') + `<path d="M${x - 3},44.5 q3,-3.4 6,0" fill="none" stroke="${OUT}" stroke-width="1.2"/>`;
  if (has('can')) {
    s += g('data-s1-change="can" data-dk-answer="change" data-s1-drawn="trash-can-on-its-side"',
      orect(94, 59, 22, 14, C.trashGreen, 1.2, ' rx="1.5"') + [62.5, 66, 69.5].map((y) => line(98, y, 114, y, '#2E6B45', 1)).join('') + `<ellipse cx="94" cy="66" rx="3.4" ry="7" fill="${C.trashGreen}" stroke="${OUT}" stroke-width="1.2"/><ellipse cx="94" cy="66" rx="2.2" ry="5.6" fill="#2B2522"/>` +
      `<g transform="rotate(70 121 68)">${orect(112, 66, 18, 4, C.trashGreen, 1.1, ' rx="1.5"')}</g>` +
      // the spill at the can's mouth: crumpled paper, a banana peel, a juice box
      [[86, 70, 3.2], [81, 66, 2.8], [88, 63, 2.4]].map(([x, y, r]) => circ(x, y, r, '#FFFFFF', 0.9) + `<path d="M${f1(x - r * 0.6)},${f1(y)} l${f1(r * 0.5)},${f1(-r * 0.4)} l${f1(r * 0.6)},${f1(r * 0.5)}" fill="none" stroke="${OUT}" stroke-width="0.6"/>`).join('') +
      `<path d="M74,70 q3,-6 6,-1 q2,-5 5,0 q-5,2 -11,1 Z" fill="#F4C542" stroke="${OUT}" stroke-width="0.8"/>` + orect(78, 72, 6, 4, '#F39C40', 0.7));
  } else s += g('data-s1-part="trash-can"', fix('can') ? '' : canUp(98));
  // litter: ONE candy wrapper on the grass (a bar wrapper, crimped at both ends, torn open at one) and ONE cup on the bench
  if (has('wrapper')) s += g('data-s1-change="wrapper" data-dk-answer="change" data-s1-drawn="candy-wrapper"', '<g transform="rotate(-14 182 106)">' +
    path('M170,101 L194,101 L194,111 L170,111 Z', '#D9534F', 1.2) + rect(178, 101.6, 8, 8.8, '#F4C542') + line(178, 101, 178, 111, OUT, 0.7) + line(186, 101, 186, 111, OUT, 0.7) +
    path('M170,101 L166,102.5 L169,104 L165,106 L169,108 L166,109.5 L170,111 Z', '#D9534F', 1) + path('M194,101 L199,100 L196,103 L200,105 L196,107 L200,110 L194,111 Z', '#E8E2D6', 1) + '</g>');
  if (has('cup')) s += g('data-s1-change="cup" data-dk-answer="change" data-s1-drawn="cup-with-straw"', path('M159,58 L171,58 L169.5,72 L160.5,72 Z', '#FFFFFF', 1.1) + rect(159.8, 63, 10.6, 3.4, '#D9534F') + orect(158, 56, 14, 3, '#FFFFFF', 1, ' rx="1"') + line(166, 56, 169, 47, '#D9534F', 1.6) + line(169, 47, 172, 47, '#D9534F', 1.6));
  // the plastic grocery bag: two handle loops above the water, its body half under (a ripple round it)
  if (has('bag')) s += g('data-s1-change="bag" data-dk-answer="change" data-s1-drawn="plastic-bag"', `<path d="M38,88 Q36,80 41,79 Q44,80 43,88 M52,88 Q52,80 57,79 Q61,80 58,88" fill="none" stroke="${OUT}" stroke-width="2.6"/><path d="M38,88 Q36,80 41,79 Q44,80 43,88 M52,88 Q52,80 57,79 Q61,80 58,88" fill="none" stroke="${C.plastic}" stroke-width="1.4"/>` +
    path('M36,88 Q40,85 43,88 Q48,90 52,88 Q56,85 60,88 L62,101 L34,101 Z', C.plastic, 1.2) + `<path d="M40,90 L42,99 M48,90 L48,99 M55,90 L54,99" stroke="#BFBFBF" stroke-width="0.8"/>` + rect(31, 101, 34, 5, '#7FC8E8') + `<ellipse cx="48" cy="101.5" rx="18" ry="3.2" fill="none" stroke="#FFFFFF" stroke-width="1.4"/><ellipse cx="48" cy="102" rx="23" ry="5" fill="none" stroke="#4FA3D1" stroke-width="1"/>`);
  // clean-up day: one person helping for each change, each at their own job and apart from the others; one visitor
  // walking a dog on the path who is NOT cleaning (the child chooses whom to circle)
  if (state === 'cleanup') {
    const kp = (i) => k[i % Math.max(1, k.length)] || {};
    const helpers = {
      wrapper: () => { const o = { age: 'adult', s: 0.5, ...kp(0), x: 198, y: 116, look: -1 }; o.la = armTo(o, 'l', 186, 104); const p = person(o); const h = p.hand('l'), r = p.hand('r'); return g('data-dk-answer="help" data-s1-help="pick-up"', p.svg + path(`M${f1(r[0] - 1)},${f1(r[1] - 1)} L${f1(r[0] + 7)},${f1(r[1] - 1)} L${f1(r[0] + 6)},${f1(r[1] + 13)} L${f1(r[0])},${f1(r[1] + 13)} Z`, '#3B3F46', 1, ' data-s1-tool="trash-bag"') + orect(h[0] - 8, h[1] - 2, 9, 4, '#D9534F', 0.8, ' rx="0.8" data-s1-tool="wrapper"')); },
      // review round 2: the cup goes INTO a trash bag the helper holds open (the arm low, the cup over the bag's mouth;
      // a cup held up at face height read as drinking it, or as the person who left it)
      cup: () => { const o = { age: 'child', s: 0.6, ...kp(1), x: 174, y: 98, look: -1 }; o.la = armTo(o, 'l', 162, 80); o.ra = armTo(o, 'r', 167, 75); const p = person(o); const h = p.hand('r'), b = p.hand('l');
        const mx = b[0] + 2.8, my = b[1] + 1.6;   // the bag's mouth, under the cup: held open at its left corner by the left hand
        const back = g('data-s1-drawn="trash-bag-mouth"', `<ellipse cx="${f1(mx)}" cy="${f1(my)}" rx="4.6" ry="1.5" fill="#2B2522" stroke="${OUT}" stroke-width="0.8"/>`);
        const cup = g('data-s1-drawn="cup-into-bag" data-s1-tool="cup"', path(`M${f1(h[0] - 2.6)},${f1(h[1] + 0.6)} L${f1(h[0] + 2.6)},${f1(h[1] + 0.6)} L${f1(h[0] + 2)},${f1(h[1] + 7.4)} L${f1(h[0] - 2)},${f1(h[1] + 7.4)} Z`, '#FFFFFF', 0.8, ' data-s1-cupbody="1"') + rect(h[0] - 2.3, h[1] + 3, 4.6, 1.5, '#D9534F') + orect(h[0] - 3, h[1] - 0.4, 6, 1.3, '#FFFFFF', 0.7, ' rx="0.5"') + line(h[0] + 0.8, h[1] - 0.4, h[0] + 2.2, h[1] - 4.4, '#D9534F', 0.9));
        const front = g('data-s1-drawn="trash-bag" data-s1-tool="trash-bag"', path(`M${f1(mx - 4.6)},${f1(my)} Q${f1(mx - 5.4)},${f1(my + 9)} ${f1(mx - 3)},${f1(my + 12)} Q${f1(mx)},${f1(my + 13.4)} ${f1(mx + 3)},${f1(my + 12)} Q${f1(mx + 5.4)},${f1(my + 9)} ${f1(mx + 4.6)},${f1(my)} Q${f1(mx)},${f1(my + 2.2)} ${f1(mx - 4.6)},${f1(my)} Z`, '#3B3F46', 0.9) + `<path d="M${f1(mx - 1.6)},${f1(my + 4)} Q${f1(mx - 2.2)},${f1(my + 8)} ${f1(mx - 1)},${f1(my + 11)}" fill="none" stroke="#5A6470" stroke-width="0.7"/>`);
        // drawn in this order: the bag's mouth, the child (the hand on the rim), the cup in front of the other arm, the bag
        return g('data-dk-answer="help" data-s1-help="pick-up-bench"', back + p.svg + cup + front); },
      bag: () => { const o = { age: 'adult', s: 0.5, ...kp(2), x: 89, y: 118, look: -1 }; o.la = armTo(o, 'l', 78, 98); const p = person(o); const h = p.hand('l'); return g('data-dk-answer="help" data-s1-help="net"', p.svg + line(h[0], h[1], 56, 101, '#8B5E3C', 1.6, ' data-s1-tool="net"') + `<ellipse cx="52" cy="101" rx="6.5" ry="4" fill="${C.plastic}" stroke="${OUT}" stroke-width="1"/>` + `<path d="M47,101 l3,3 M51,101 l3,3 M55,101 l2,2" stroke="${OUT}" stroke-width="0.6"/>`); },
      branch: () => { const o = { age: 'adult', s: 0.5, ...kp(3), x: 238, y: 118, look: 1 }; o.ra = armTo(o, 'r', 246, 92); o.la = armTo(o, 'l', 228, 96); const p = person(o); const h = p.hand('r'); return g('data-dk-answer="help" data-s1-help="carry-branch"', p.svg + path(`M${f1(h[0] - 22)},${f1(h[1] + 6)} L${f1(h[0] + 8)},${f1(h[1] - 4)} L${f1(h[0] + 9)},${f1(h[1] - 1)} L${f1(h[0] - 21)},${f1(h[1] + 9)} Z`, '#8B5E3C', 0.9, ' data-s1-tool="branch"') + `<ellipse cx="${f1(h[0] + 6)}" cy="${f1(h[1] - 8)}" rx="5" ry="3.4" fill="#6BB36B" stroke="${OUT}" stroke-width="0.8"/>` + line(h[0] - 12, h[1] + 3, h[0] - 12, h[1] + 12, '#B07A4E', 1.2) + line(h[0] - 4, h[1], h[0] - 4, h[1] + 10, '#B07A4E', 1.2) + orect(h[0] - 15, h[1] + 11, 14, 3, '#8B5E3C', 0.8, ' rx="1"')); },
      flowers: () => { const o = { age: 'child', s: 0.6, ...kp(4), x: 66, y: 76, look: -1, ll: [-12, 6, 3, 10], rl: [12, 6, -3, 10] }; o.la = armTo(o, 'l', 56, 66); const p = person(o); const h = p.hand('l'); return g('data-dk-answer="help" data-s1-help="plant"', p.svg + line(h[0], h[1], h[0] - 4, h[1] + 6, '#8C8C8C', 1.6, ' data-s1-tool="trowel"') + orect(h[0] + 6, h[1] - 1, 6, 6, '#C1663B', 0.8) + line(h[0] + 9, h[1] - 1, h[0] + 9, h[1] - 6, C.stem, 1.2) + circ(h[0] + 9, h[1] - 7, 2.2, C.petal, 0.7)); },
      // review round 2: the helper LIFTS the can with both hands on its rim (it still leans a little toward her, its far
      // edge off the grass; the lid lies on the grass beside it): standing beside an upright can did nothing visible
      can: () => { const piv = [105.5, 70], a = 20 * Math.PI / 180, rot = (x, y) => [piv[0] + (x - piv[0]) * Math.cos(a) - (y - piv[1]) * Math.sin(a), piv[1] + (x - piv[0]) * Math.sin(a) + (y - piv[1]) * Math.cos(a)];
        const rimL = rot(90.5, 48), rimR = rot(105.5, 48), on = (t) => [rimL[0] + (rimR[0] - rimL[0]) * t, rimL[1] + (rimR[1] - rimL[1]) * t];
        const o = { age: 'adult', s: 0.5, ...kp(5), x: 117, y: 74, look: -1 }; const hl = on(0.45), hr = on(0.92); o.la = armTo(o, 'l', hl[0], hl[1]); o.ra = armTo(o, 'r', hr[0], hr[1]);
        const lid = g('data-s1-drawn="can-lid"', orect(74, 57, 17, 3.6, C.trashGreen, 1.1, ' rx="1.5"') + `<path d="M79.5,57 q3,-3.2 6,0" fill="none" stroke="${OUT}" stroke-width="1.1"/>`);
        return g('data-dk-answer="help" data-s1-help="stand-can"', lid + g(`data-s1-drawn="can-being-lifted" data-s1-tool="can" transform="rotate(20 ${piv[0]} ${piv[1]})"`, canBody(98)) + person(o).svg); },
    };
    for (const c of changes) s += helpers[c]();
    // the visitor: a grown-up walking a dog along the path, smiling, nothing in the hands but the leash
    const v = { age: 'adult', s: 0.5, ...kp(6), x: 142, y: 118, look: -1, mood: 'smile', ll: [-2, 11, -5, 21], rl: [2, 11, 5, 21] };
    v.la = armTo(v, 'l', 132, 102);
    const vp = person(v), vh = vp.hand('l');
    const dog = `<g data-s1-drawn="dog" transform="translate(276 0) scale(-1 1)"><path d="M140,112 l-1,6 M144,112 l0,6 M151,112 l1,6 M155,112 l1,6" stroke="${OUT}" stroke-width="1.8" stroke-linecap="round"/><ellipse cx="148" cy="109" rx="9" ry="4.6" fill="#B07A4E" stroke="${OUT}" stroke-width="1.1"/><path d="M139,107 q-4,-4 -2,-8" fill="none" stroke="${OUT}" stroke-width="1.6" stroke-linecap="round"/><circle cx="158" cy="104" r="4" fill="#B07A4E" stroke="${OUT}" stroke-width="1.1"/><path d="M156,101 q-1,5 2,6" fill="#7B4A26" stroke="${OUT}" stroke-width="0.8"/><circle cx="160" cy="103.4" r="0.8" fill="${OUT}"/><circle cx="162" cy="105" r="0.9" fill="${OUT}"/></g>`;
    s += g('data-s1-visitor="1"', vp.svg + `<path d="M${f1(vh[0])},${f1(vh[1])} Q${f1((vh[0] + 121) / 2)},${f1(vh[1] + 8)} 121,106" fill="none" stroke="#D9534F" stroke-width="1"/>` + dog);
  }
  return s;
}

/* ================================================================ G1-662: the Liberty Bell (0 0 100 100) */
function libertyBell() {
  return rect(0, 0, 100, 100, '#F7EEDD') + g('data-s1-drawn="liberty-bell"', orect(14, 8, 72, 10, C.yoke, 1.6, ' rx="2"') + orect(46, 16, 8, 8, C.bronzeDark, 1.2) +
    path('M32,26 Q32,20 50,20 Q68,20 68,26 L70,58 Q72,74 84,82 L84,88 L16,88 L16,82 Q28,74 30,58 Z', C.bronze, 2) + path('M16,84 L84,84 L84,90 L16,90 Z', C.bronzeDark, 1.4) +
    line(32, 36, 68, 36, C.bronzeDark, 1.2) + line(31, 42, 69, 42, C.bronzeDark, 1.2) + circ(50, 92, 4, C.bronzeDark, 1.2) +
    `<path d="M44,88 L46,80 L43,74 L47,66 L45,58 L48,52" fill="none" stroke="${OUT}" stroke-width="2.4" stroke-linejoin="round" data-s1-crack="1"/>`);
}

/* ================================================================ G1-663: four sources about Washington and Lincoln */
/** a painting in a gold frame: a man in colonial clothes (white hair tied back, a dark blue coat, a white cravat), no
 *  likeness; a name plate on the frame, as museums label paintings (0 0 100 120) */
function paintingArt(look) {
  const o = { age: 'adult', s: 1.05, x: 50, y: 150, ...look, hair: 'short', hairColor: 'white', top: C.colonialBlue, look: 0, mood: 'calm' };
  const p = person(o), h = p.head(); p.svg = p.svg.replace('data-sk-skin=', 'data-s1-histskin=');
  return orect(4, 4, 92, 104, C.goldFrame, 2.2) + orect(12, 12, 76, 80, '#8B5E3C', 1.4) + `<rect x="12" y="12" width="76" height="80" fill="#5E3A22" opacity="0.4"/>` +
    `<g clip-path="none">${`<svg x="12" y="12" width="76" height="80" viewBox="12 12 76 80" overflow="hidden">` + p.svg + `<path d="M${f1(h.x - h.r * 1.15)},${f1(h.y + h.r * 0.2)} Q${f1(h.x - h.r * 1.25)},${f1(h.y - h.r * 1.25)} ${f1(h.x)},${f1(h.y - h.r * 1.2)} Q${f1(h.x + h.r * 1.25)},${f1(h.y - h.r * 1.25)} ${f1(h.x + h.r * 1.15)},${f1(h.y + h.r * 0.2)} Q${f1(h.x + h.r * 0.9)},${f1(h.y - h.r * 0.5)} ${f1(h.x)},${f1(h.y - h.r * 0.6)} Q${f1(h.x - h.r * 0.9)},${f1(h.y - h.r * 0.5)} ${f1(h.x - h.r * 1.15)},${f1(h.y + h.r * 0.2)} Z" fill="#ECEAE6" stroke="${OUT}" stroke-width="1"/>` + circ(h.x - h.r * 1.1, h.y + h.r * 0.1, h.r * 0.32, '#ECEAE6', 1) + circ(h.x + h.r * 1.1, h.y + h.r * 0.1, h.r * 0.32, '#ECEAE6', 1) + path(`M${f1(h.x - 4)},${f1(h.y + h.r + 3)} L${f1(h.x + 4)},${f1(h.y + h.r + 3)} L${f1(h.x + 2)},${f1(h.y + h.r + 14)} L${f1(h.x - 2)},${f1(h.y + h.r + 14)} Z`, '#FFFFFF', 1) + '</svg>'}</g>` +
    g('data-s1-clue="nameplate"', orect(8, 94, 84, 13, C.goldDark, 1.2) + `<text x="50" y="104" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="9.5" textLength="78" lengthAdjust="spacingAndGlyphs" fill="#FFFFFF">George Washington</text>`);
}
/** the quarter at its real size: a silver coin, a ridged edge, Washington's profile facing left drawn simply, LIBERTY
 *  over it (r in view units = px at 96 to the inch). `uid` keeps the text path's id one of its own on a page. */
function quarterArt(r, uid = 'q') {
  return usCoin('quarter', r, uid).replace('data-s1-drawn="us-coin"', 'data-s1-drawn="quarter"');
}
/**
 * a US coin's FRONT, drawn simply, at the size given (r = its radius in view units = px at 96 to the inch; the page
 * draws each at its real diameter): penny (copper, Lincoln's profile facing right with a beard, a smooth edge), nickel
 * (silver, a smooth edge; review round 2: TODAY's nickel, made since 2006, shows Jefferson's face looking forward, not
 * the old profile: a front face, his hair swept back from the forehead and full at the sides, a collar and coat), dime
 * (silver, Roosevelt's profile facing left, a ridged edge), quarter (silver, Washington's profile facing left with his
 * hair tied with a bow, a ridged edge); LIBERTY over the head. NO numeral and no year on the coin (a coin is never a
 * numbered circle). The head group carries data-s1-face: "front" (the nickel) or "profile".
 */
function usCoin(kind, r, uid = '') {
  const c = r + 2, k = r / 46, copper = kind === 'penny';
  const face = copper ? C.pennyCopper : C.silver, relief = copper ? C.pennyDark : C.silverDark;
  const reeded = kind === 'dime' || kind === 'quarter';
  const edge = reeded ? Array.from({ length: 72 }, (_, q) => { const a = q * Math.PI / 36; return line(c + Math.cos(a) * (r - 2.4), c + Math.sin(a) * (r - 2.4), c + Math.cos(a) * r, c + Math.sin(a) * r, relief, 0.8); }).join('')
    : `<circle cx="${f1(c)}" cy="${f1(c)}" r="${f1(r - 2.2)}" fill="none" stroke="${relief}" stroke-width="1.4"/>`;
  const head = 'M10,-24 Q-2,-30 -10,-22 Q-16,-16 -16,-8 L-20,-2 L-16,0 L-17,4 L-14,6 L-15,10 Q-12,14 -6,13 L-6,22 L18,22 Q16,10 18,0 Q22,-10 16,-20 Q14,-23 10,-24 Z';
  const hair = { penny: 'M14,-20 Q20,-12 18,-2', nickel: 'M16,-14 Q24,-8 26,4 Q22,10 18,8', dime: 'M12,-22 Q20,-16 19,-6', quarter: 'M16,-16 Q24,-12 22,0 Q26,6 22,10' }[kind];
  const beard = kind === 'penny' ? `<path d="M-15,9 Q-14,18 -6,18 Q0,16 2,8 Q-4,12 -8,11 Z" fill="${relief}" stroke="${OUT}" stroke-width="${f1(0.9 / k)}"/>` : '';
  const bow = kind === 'quarter' ? `<path d="M20,6 l5,-3 l0,6 Z M20,6 l5,3 l-1,5 Z" fill="${relief}" stroke="${OUT}" stroke-width="${f1(0.8 / k)}"/>` : '';
  const flip = copper ? -1 : 1;
  // the nickel of today: a front face (units as the profile: the head about 26 wide, the shoulders to y 22)
  const sw = f1(1 / k), front = kind === 'nickel' ? `<g transform="translate(${f1(c)} ${f1(c + r * 0.05)}) scale(${f1(k)} ${f1(k)})" data-s1-drawn="front-face" data-s1-face="front">` +
    `<path d="M-9.4,-16.6 Q0,-23.4 9.4,-16.6 Q13.6,-13.6 12.2,-9.6 Q14.4,-6.4 12.2,-3 Q14,0.6 11.4,3.4 Q12.4,6.6 9.4,8 L-9.4,8 Q-12.4,6.6 -11.4,3.4 Q-14,0.6 -12.2,-3 Q-14.4,-6.4 -12.2,-9.6 Q-13.6,-13.6 -9.4,-16.6 Z" fill="${relief}" stroke="${OUT}" stroke-width="${sw}" data-s1-drawn="hair-to-collar"/>` +
    `<path d="M-22,22 Q-21,9 -9,7 L9,7 Q21,9 22,22 Z" fill="${relief}" stroke="${OUT}" stroke-width="${sw}"/><path d="M-9,7 L-3,15 L0,9 L3,15 L9,7" fill="none" stroke="${OUT}" stroke-width="${sw}" stroke-linejoin="round"/>` +
        `<path d="M-6,5 L-5,9 L5,9 L6,5 Z" fill="${relief}" stroke="${OUT}" stroke-width="${sw}"/><ellipse cx="0" cy="-6" rx="10" ry="12.5" fill="${face}" stroke="${OUT}" stroke-width="${sw}"/>` +
    `<path d="M-9.9,-8.6 Q-10.4,-17.6 -2,-18.4 Q6,-19 9.9,-12.6 Q9.6,-10.6 9.9,-8.6 Q8,-13.4 4,-14.6 Q1,-13.2 -2.4,-15 Q-7.4,-13.8 -9.9,-8.6 Z" fill="${relief}" stroke="none"/><path d="M-7.4,-14.4 Q-5,-18.4 1,-19.2 M-1.6,-15.4 Q2,-18.6 7,-17 M4.4,-14.8 Q7.6,-15.6 9.2,-12.8" fill="none" stroke="${OUT}" stroke-width="${f1(0.7 / k)}" stroke-linecap="round"/>` +
    `<circle cx="-4" cy="-8" r="1.4" fill="${OUT}"/><circle cx="4" cy="-8" r="1.4" fill="${OUT}"/><path d="M-7,-11.5 L-2,-11 M2,-11 L7,-11.5" stroke="${OUT}" stroke-width="${f1(0.9 / k)}" stroke-linecap="round"/>` +
    `<path d="M0,-7 L-1.4,-2 L0.8,-2" fill="none" stroke="${OUT}" stroke-width="${f1(0.9 / k)}" stroke-linejoin="round"/><path d="M-3,2 Q0,3.6 3,2" fill="none" stroke="${OUT}" stroke-width="${f1(0.9 / k)}" stroke-linecap="round"/></g>` : '';
  const prof = front || `<g transform="translate(${f1(c)} ${f1(c + r * 0.05)}) scale(${f1(flip * k)} ${f1(k)})" data-s1-drawn="profile" data-s1-face="profile"><path d="${head}" fill="${relief}" stroke="${OUT}" stroke-width="${f1(1 / k)}"/>${beard}<path d="${hair}" fill="none" stroke="${OUT}" stroke-width="${f1(1.2 / k)}"/>${bow}</g>`;
  const id = 'lib-' + kind + (uid ? '-' + uid : '');
  const arc = `<path id="${id}" d="M${f1(c - r * 0.7)},${f1(c - r * 0.1)} A${f1(r * 0.72)},${f1(r * 0.72)} 0 0 1 ${f1(c + r * 0.7)},${f1(c - r * 0.1)}" fill="none"/>`;
  return g(`data-s1-drawn="us-coin" data-s1-coinface="${kind}"`, `<circle cx="${f1(c)}" cy="${f1(c)}" r="${f1(r)}" fill="${face}" stroke="${OUT}" stroke-width="1.6"/>` + edge + `<circle cx="${f1(c)}" cy="${f1(c)}" r="${f1(r - 4)}" fill="none" stroke="${relief}" stroke-width="0.8"/>` + prof + arc +
    `<text font-family="Nunito, sans-serif" font-weight="800" font-size="${f1(Math.max(9, 10 * r / 44))}" fill="${OUT}" letter-spacing="${r < 40 ? 0.4 : 1}"><textPath href="#${id}" startOffset="50%" text-anchor="middle">LIBERTY</textPath></text>`);
}
/** review round 1: the quarter's BACK at its real size (r as above): an eagle with its wings spread on an olive branch,
 *  and "QUARTER DOLLAR" round the bottom (the back of the quarters of 1932-1998, still in pockets; the real coin's smaller
 *  words are left out: no word on the page is under 9 px), so the coin reads as a quarter in black and white too */
function quarterBackArt(r, uid = 'q') {
  const c = r + 2, k = r / 46;
  const ridge = Array.from({ length: 72 }, (_, q) => { const a = q * Math.PI / 36; return line(c + Math.cos(a) * (r - 2.4), c + Math.sin(a) * (r - 2.4), c + Math.cos(a) * r, c + Math.sin(a) * r, C.silverDark, 0.8); }).join('');
  const T = (x, y) => f1(c + x * k) + ',' + f1(c + (y - 4) * k);
  const wing = (sd) => `<path d="M${T(sd * 4, -6)} Q${T(sd * 14, -20)} ${T(sd * 26, -18)} L${T(sd * 24, -12)} L${T(sd * 28, -10)} L${T(sd * 24, -4)} L${T(sd * 27, -1)} L${T(sd * 21, 3)} Q${T(sd * 12, 4)} ${T(sd * 5, 4)} Z" fill="${C.silverDark}" stroke="${OUT}" stroke-width="1"/>`;
  const eagle = wing(-1) + wing(1) + `<ellipse cx="${f1(c)}" cy="${f1(c - 2 * k)}" rx="${f1(6 * k)}" ry="${f1(11 * k)}" fill="${C.silverDark}" stroke="${OUT}" stroke-width="1"/>` +
    `<circle cx="${f1(c - 1 * k)}" cy="${f1(c - 15 * k)}" r="${f1(4.6 * k)}" fill="#FFFFFF" stroke="${OUT}" stroke-width="1"/><path d="M${T(-5, -11)} l${f1(-4 * k)},${f1(1.5 * k)} l${f1(4 * k)},${f1(1.6 * k)} Z" fill="#F4C542" stroke="${OUT}" stroke-width="0.7"/>` +
    `<path d="M${T(-5, 12)} L${T(0, 20)} L${T(5, 12)} Z" fill="${C.silverDark}" stroke="${OUT}" stroke-width="1"/><path d="M${T(-14, 16)} Q${T(0, 24)} ${T(14, 16)}" fill="none" stroke="${OUT}" stroke-width="1.2"/>` +
    [-10, -4, 4, 10].map((x) => `<ellipse cx="${f1(c + x * k)}" cy="${f1(c + (15 + Math.abs(x) * -0.25) * k)}" rx="${f1(2.6 * k)}" ry="${f1(1.4 * k)}" fill="${C.silverDark}" stroke="${OUT}" stroke-width="0.6"/>`).join('');
  const bot = `<path id="qd-${uid}" d="M${f1(c - r * 0.8)},${f1(c)} A${f1(r * 0.8)},${f1(r * 0.8)} 0 0 0 ${f1(c + r * 0.8)},${f1(c)}" fill="none"/>`;
  return g('data-s1-drawn="quarter-back"', `<circle cx="${f1(c)}" cy="${f1(c)}" r="${f1(r)}" fill="${C.silver}" stroke="${OUT}" stroke-width="1.6"/>` + ridge + `<circle cx="${f1(c)}" cy="${f1(c)}" r="${f1(r - 4)}" fill="none" stroke="${C.silverDark}" stroke-width="0.8"/>` + `<g data-s1-drawn="eagle">${eagle}</g>` + bot +
    `<text font-family="Nunito, sans-serif" font-weight="800" font-size="${f1(Math.max(9.6, 9.6 * r / 44))}" fill="${OUT}" letter-spacing="0.6" data-s1-coinword="QUARTER DOLLAR"><textPath href="#qd-${uid}" startOffset="50%" text-anchor="middle">QUARTER DOLLAR</textPath></text>`);
}
/** a handwritten letter on old paper, lines of writing (not words) and the signature "A. Lincoln" (0 0 100 120) */
function letterArt() {
  const w = (y, x2) => `<path d="M14,${y} ${Array.from({ length: Math.floor((x2 - 14) / 8) }, (_, q) => `q2,${q % 2 ? 3 : -3} 4,0 q2,${q % 2 ? -2 : 2} 4,0`).join(' ')}" fill="none" stroke="${C.ink}" stroke-width="1.1"/>`;
  return path('M6,4 L94,4 L94,116 L6,116 Z', C.parchment, 1.8) + g('data-s1-drawn="handwriting"', [18, 30, 42, 54, 66, 78].map((y, q) => w(y, q === 5 ? 60 : 86)).join('')) +
    g('data-s1-clue="signature"', `<text x="88" y="102" text-anchor="end" font-family="Baloo 2, cursive" font-weight="700" font-size="15" fill="${C.ink}" transform="rotate(-4 88 102)">A. Lincoln</text><path d="M40,106 Q60,102 88,104" fill="none" stroke="${C.ink}" stroke-width="1.2"/>`);
}
/** the Lincoln Memorial: a white building of columns on wide steps, the seated statue small inside (0 0 120 100) */
function memorialArt() {
  let s = rect(0, 0, 120, 100, '#EEF6F8') + rect(0, 84, 120, 16, '#9CCB7C');
  s += g('data-s1-drawn="memorial"', orect(14, 18, 92, 12, C.marble, 1.4) + orect(10, 14, 100, 6, C.marbleShade, 1.2) + orect(20, 30, 80, 42, '#E6E1D6', 1) + orect(50, 36, 20, 34, '#8C8C8C', 1) +
    g('data-s1-drawn="seated-statue"', orect(54, 56, 12, 10, C.marble, 0.8) + circ(60, 46, 3.4, C.marble, 0.8) + path('M55,50 L65,50 L66,58 L54,58 Z', C.marble, 0.8) + line(56, 58, 56, 66, OUT, 1.6) + line(64, 58, 64, 66, OUT, 1.6)) +
    Array.from({ length: 8 }, (_, q) => (q === 3 || q === 4) ? '' : orect(22 + q * 10.3, 30, 5, 42, C.marble, 0.9)).join('') +
    orect(14, 72, 92, 4, C.marbleShade, 1) + orect(8, 76, 104, 4, C.marbleShade, 1) + orect(2, 80, 116, 4, C.marbleShade, 1));
  return s;
}

/* ================================================================ G1-664: the Declaration read aloud, 1776 (0 0 300 150) */
function readingArt(rng) {
  let s = rect(0, 0, 300, 150, '#EEF6F8');
  s += g('data-s1-drawn="brick-hall"', orect(70, 6, 160, 84, '#C96B4B', 1.6) + [0, 1, 2, 3, 4].map((q) => orect(84 + q * 28, 12, 14, 18, '#DDEFF5', 1)).join('') + [0, 1, 3, 4].map((q) => orect(84 + q * 28, 66, 14, 18, '#DDEFF5', 1)).join('') + orect(138, 66, 24, 24, '#7B4A26', 1.2) + orect(114, 60, 72, 6, '#E8E2D6', 1.2) + [0,1,2,3,4,5,6].map((q) => line(118 + q * 11, 52, 118 + q * 11, 60, OUT, 1)).join('') + line(114, 52, 186, 52, OUT, 1.2));
  // the reader on the balcony, a paper in his hands, a three-cornered hat
  const ro = { age: 'adult', s: 0.56, x: 150, y: 60, skin: 's2', hair: 'short', hairColor: 'white', top: C.colonialBlue, bottomColor: 'khaki', look: 0, mood: 'open' };
  ro.la = armTo(ro, 'l', 141, 38); ro.ra = armTo(ro, 'r', 159, 38);
  const rp = person(ro), rh = rp.head();
  // review round 1: a TRICORN, the crown of the hat with its brim turned up into three corners (left, right and the point
  // in front), not a flat triangle (it read as a graduation cap)
  const tri = (h, c) => { const r = h.r, x = h.x, y = h.y; return `<g data-s1-drawn="tricorn"><ellipse cx="${f1(x)}" cy="${f1(y - r * 0.95)}" rx="${f1(r * 0.85)}" ry="${f1(r * 0.6)}" fill="${c}" stroke="${OUT}" stroke-width="0.7"/>` +
    `<path d="M${f1(x - r * 1.75)},${f1(y - r * 1.15)} Q${f1(x - r * 0.9)},${f1(y - r * 0.35)} ${f1(x)},${f1(y - r * 0.45)} Q${f1(x + r * 0.9)},${f1(y - r * 0.35)} ${f1(x + r * 1.75)},${f1(y - r * 1.15)} Q${f1(x + r * 1.1)},${f1(y - r * 0.75)} ${f1(x)},${f1(y - r * 0.8)} Q${f1(x - r * 1.1)},${f1(y - r * 0.75)} ${f1(x - r * 1.75)},${f1(y - r * 1.15)} Z" fill="${c}" stroke="${OUT}" stroke-width="0.7"/>` +
    `<path d="M${f1(x - r * 1.5)},${f1(y - r * 1.0)} Q${f1(x)},${f1(y - r * 0.55)} ${f1(x + r * 1.5)},${f1(y - r * 1.0)}" fill="none" stroke="#C9A13B" stroke-width="${f1(Math.max(0.5, r * 0.12))}"/></g>`; };
  /** a white mob cap: a puffed round cap with a ruffled edge round the face */
  const mobCap = (h) => { const r = h.r, x = h.x, y = h.y, n = 7, w = 2.7 * r / n; let d = `M${f1(x - 1.35 * r)},${f1(y + 0.1 * r)}`; for (let q = 0; q < n; q++) d += ` q${f1(w / 2)},${f1(0.42 * r)} ${f1(w)},0`; d += ` Q${f1(x + 1.6 * r)},${f1(y - 1.9 * r)} ${f1(x)},${f1(y - 1.95 * r)} Q${f1(x - 1.6 * r)},${f1(y - 1.9 * r)} ${f1(x - 1.35 * r)},${f1(y + 0.1 * r)} Z`; return `<g data-s1-drawn="mob-cap"><path d="${d}" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.7"/><path d="M${f1(x - 1.25 * r)},${f1(y - 0.25 * r)} Q${f1(x)},${f1(y - 0.65 * r)} ${f1(x + 1.25 * r)},${f1(y - 0.25 * r)}" fill="none" stroke="#E98AB0" stroke-width="${f1(Math.max(0.6, r * 0.2))}"/>` + [-0.6, 0, 0.6].map((k) => `<path d="M${f1(x + k * r)},${f1(y - 1.6 * r)} q${f1(k * 0.3 * r)},${f1(0.5 * r)} 0,${f1(1.0 * r)}" fill="none" stroke="#BFBFBF" stroke-width="0.5"/>`).join('') + '</g>'; };
  s += g('data-s1-drawn="reader"', rp.svg + tri(rh, '#2B2522') + orect(139, 32, 22, 14, C.parchment, 1));
  s += rect(0, 90, 300, 60, '#C9A66B') + line(0, 90, 300, 90, OUT, 1);
  // the crowd in clothes of 1776, seen from among it (backs to us), a few at the edges turned toward us
  const tones = ['s1', 's2', 's3', 's4', 's5', 's6'];
  let q = 0;
  const rows = [[112, 0.36, 15], [134, 0.5, 11], [164, 0.7, 8]];
  for (const [y, sc, n] of rows) for (let i = 0; i < n; i++) {
    const x = 300 / n * (i + 0.5) + ((q % 2) - 0.5) * 6, tone = tones[q++ % 6], turned = x < 30 || x > 270, female = rng.next() < 0.5;
    const dressC = rng.pick(['#7B4A26', C.colonialBlue, '#9B3B34', '#3F5372', '#5A6470', '#7A5230']);
    const o = { age: 'adult', s: sc, x, y, skin: tone, hair: female ? 'bun' : 'short', hairColor: female ? 'brown' : 'dark', top: dressC, bottomColor: female ? dressC : 'khaki', bottom: female ? 'dress' : 'pants', back: !turned, look: x < 150 ? 1 : -1 };
    const p = person(o), h = p.head();
    // a woman's long skirt, from the waist to the ankles
    const skirt = female ? `<path d="M${f1(x - 8 * sc)},${f1(y - 46 * sc)} L${f1(x + 8 * sc)},${f1(y - 46 * sc)} L${f1(x + 15 * sc)},${f1(y - 2 * sc)} L${f1(x - 15 * sc)},${f1(y - 2 * sc)} Z" fill="${dressC}" stroke="${OUT}" stroke-width="0.8" data-s1-drawn="long-dress"/>` : '';
    s += p.svg + skirt + (female ? mobCap(h) : tri(h, '#2B2522'));
  }
  return s;
}

/** a small picture beside each sentence of the Fourth of July page (0 0 100 100): laws (a scroll and a quill), taxes they
 *  had no say in (coins with a "no" sign), choosing leaders (a ballot box), a new king (a crown), moving to Great Britain (a
 *  sailing ship), more taxes to the king (coins under a crown) */
function july4Icon(id) {
  const coins = (x, y) => [0, 1, 2, 3].map((q) => `<ellipse cx="${x}" cy="${y - q * 7}" rx="16" ry="6" fill="#E6B422" stroke="${OUT}" stroke-width="1.4"/>`).join('') + `<path d="M${x - 16},${y} L${x - 16},${y - 21} M${x + 16},${y} L${x + 16},${y - 21}" stroke="${OUT}" stroke-width="1.4"/>`;
  const crown = (x, y, k = 1) => `<g transform="translate(${x} ${y}) scale(${k})">${path('M-24,10 L-28,-16 L-12,-2 L0,-22 L12,-2 L28,-16 L24,10 Z', '#E6B422', 2)}${orect(-24, 10, 48, 8, '#E6B422', 1.8)}${circ(0, -24, 3.4, '#D9534F', 1)}${circ(-28, -18, 3, '#4A7BD0', 1)}${circ(28, -18, 3, '#4A7BD0', 1)}</g>`;
  if (id === 'laws') return g('data-s1-drawn="icon-laws"', path('M18,18 L74,18 Q82,18 82,26 L82,84 L26,84 Q18,84 18,76 Z', C.parchment, 2) + [32, 42, 52, 62, 72].map((y) => line(28, y, 70, y, C.g6, 1.6)).join('') + `<path d="M60,80 L90,22 Q94,14 96,20 Q90,40 64,82 Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.6"/>` + line(62, 82, 58, 90, OUT, 2));
  // review round 1: no red "no" sign on a real reason (a child reads it as "wrong"): a hand pushes back a paper marked TAX
  if (id === 'taxes') return g('data-s1-drawn="icon-taxes"', `<g transform="rotate(-14 34 48)">${path('M10,16 L54,16 L54,78 L10,78 Z', C.parchment, 2)}<text x="32" y="42" text-anchor="middle" font-family="Baloo 2, cursive" font-weight="700" font-size="19" fill="${OUT}">TAX</text>${[54, 62, 70].map((y) => line(16, y, 48, y, C.g6, 1.6)).join('')}</g>` +
    path('M96,98 L92,74 Q90,66 84,64 L84,40 Q84,34 80,34 Q76,34 76,40 L76,56 L74,30 Q74,24 70,24 Q66,24 66,30 L66,56 L64,34 Q64,28 60,28 Q56,28 56,34 L57,60 L54,48 Q52,42 48,44 Q44,46 46,52 L54,76 Q60,90 66,98 Z', '#D9A066', 2) + line(66, 50, 66, 56, OUT, 1) + line(76, 48, 76, 56, OUT, 1) +
    `<path d="M44,84 L30,88 M46,92 L34,98" stroke="${OUT}" stroke-width="2" stroke-linecap="round"/>`);
  if (id === 'leaders') return g('data-s1-drawn="icon-ballot"', orect(18, 46, 64, 46, '#B07A4E', 2) + orect(34, 44, 32, 5, OUT, 1) + `<g transform="rotate(-8 50 30)">${orect(36, 10, 28, 36, '#FFFFFF', 1.8)}${line(42, 20, 58, 20, C.g6, 1.6)}<path d="M42,30 l5,5 l9,-10" fill="none" stroke="${T.teal}" stroke-width="2.6"/></g>`);
  if (id === 'king') return g('data-s1-drawn="icon-crown"', crown(50, 58, 1.3));
  if (id === 'move') return g('data-s1-drawn="icon-ship"', rect(0, 74, 100, 26, C.sea) + path('M16,72 L84,72 L76,86 L24,86 Z', '#8B5E3C', 1.8) + line(50, 72, 50, 14, OUT, 2.2) + path('M50,18 L50,64 L22,64 Z', '#FFFFFF', 1.4) + path('M52,22 L52,64 L78,64 Z', '#FFFFFF', 1.4) + `<path d="M8,92 q6,-4 12,0 q6,4 12,0 M60,94 q6,-4 12,0 q6,4 12,0" fill="none" stroke="#FFFFFF" stroke-width="1.6"/>`);
  if (id === 'more-taxes') return g('data-s1-drawn="icon-coins-crown"', coins(50, 86) + crown(50, 40, 0.9));
  throw new Error('july4Icon: ' + id);
}

/* ================================================================ G1-665: people who made life fairer (0 0 140 100) */
/** small true scenes, never a portrait: Rosa Parks seated on a city bus; Ruby Bridges walking up the school steps with
 *  her books; Helen Keller reading Braille with her fingers; Dr. King small at a lectern before a crowd */
function fairerArt(id, rng) {
  if (id === 'parks') {
    // review round 1 (two armchairs under windows read as a waiting room): a city BUS seen from the side with its side cut
    // away: the big front window and the driver at the wheel (right), seats in a row facing forward, a pole and the
    // pull cord along the windows, wheels under the body; Rosa Parks sits in a seat
    let s = rect(0, 0, 140, 100, '#EEF6F8') + rect(0, 88, 140, 12, '#8C8C8C');
    s += g('data-s1-drawn="bus-body"', path('M4,10 L118,10 Q132,10 134,24 L136,80 L4,80 Z', '#6BB36B', 1.6) + rect(7, 14, 124, 62, '#E8E2D6') + line(7, 14, 7, 76, OUT, 1) +
      // the windows along the top of the side, and the big front window (slanted)
      [0, 1, 2, 3].map((q) => orect(12 + q * 22, 18, 18, 18, '#DDEFF5', 1)).join('') + path('M104,16 L120,16 Q128,18 130,30 L131,48 L104,48 Z', '#DDEFF5', 1.2, ' data-s1-drawn="bus-front-window"') +
      rect(7, 70, 124, 6, '#B9B4AC') + line(4, 80, 136, 80, OUT, 1.6) + `<circle cx="30" cy="84" r="8" fill="${OUT}"/><circle cx="30" cy="84" r="3.4" fill="#A7B3BE"/><circle cx="112" cy="84" r="8" fill="${OUT}"/><circle cx="112" cy="84" r="3.4" fill="#A7B3BE"/>`);
    s += g('data-s1-drawn="pull-cord"', line(8, 40, 100, 40, '#8C8C8C', 1) + [26, 48, 70, 92].map((x) => line(x, 40, x, 44, '#8C8C8C', 0.8)).join(''));
    s += g('data-s1-drawn="bus-pole"', line(92, 14, 92, 70, '#A7B3BE', 2.4) + line(92, 14, 92, 70, OUT, 0.5));
    // the seats in a row, facing forward (right): a seat back and a cushion each
    const seat = (x) => orect(x - 2, 42, 5, 28, '#4F6D9A', 1, ' rx="2"') + orect(x - 2, 62, 22, 5, '#4F6D9A', 1, ' rx="2"');
    s += g('data-s1-drawn="bus-seats-rows"', seat(12) + seat(38) + seat(64));
    // the driver's seat and the driver at the wheel, facing the front window
    const d = { age: 'adult', s: 0.42, x: 112, y: 70, skin: 's2', hair: 'cap', top: '#3F5372', bottomColor: 'navy', look: 1, turn: 1, ll: [6, 4, 8, 12], rl: [7, 4, 9, 12], la: [4, 8, 14, -2], ra: [6, 8, 16, -2] };
    s += g('data-s1-drawn="driver-seat"', orect(100, 48, 6, 22, '#3F5372', 1, ' rx="2"') + P(d) + `<ellipse cx="121" cy="51" rx="2" ry="6" fill="none" stroke="${OUT}" stroke-width="1.8"/>`);
    s += P(sitting({ age: 'adult', s: 0.56, x: 21, skin: 's3', hair: 'short', hairColor: 'brown', top: '#2A9D8F', bottomColor: 'navy', look: 1, turn: 1, la: [-3, 9, 3, 15], ra: [3, 9, -3, 15] }, 63));
    const o = { age: 'adult', s: 0.6, x: 49, skin: 's5', hair: 'bun', hairColor: 'black', top: '#9B3B34', bottom: 'pants', bottomColor: '#7A5230', glasses: true, mood: 'calm', look: 1, turn: 1, la: [-3, 9, 4, 15], ra: [3, 9, -4, 15] };
    return s + g('data-s1-drawn="rosa-parks-seated"', P(sitting(o, 63)).replace('data-sk-skin=', 'data-s1-histskin=') + orect(44, 57, 11, 7, '#3B3F46', 0.8, ' rx="2"'));
  }
  if (id === 'bridges') {
    let s = rect(0, 0, 140, 100, '#EEF6F8');
    s += g('data-s1-drawn="school-and-steps"', orect(20, 6, 100, 66, '#E9E2D0', 1.4) + [0, 1].map((r) => [0, 1, 2, 3].map((q) => (q === 1 || q === 2) && r === 1 ? '' : orect(28 + q * 24, 12 + r * 26, 12, 16, '#DDEFF5', 1)).join('')).join('') + orect(56, 40, 28, 32, '#7B4A26', 1.2) + [0, 1, 2, 3].map((q) => orect(36 - q * 8, 72 + q * 7, 68 + q * 16, 7, '#D8D3C8', 1)).join(''));
    // seen from behind, going UP the steps toward the door, her books under one arm
    const o = { age: 'child', s: 0.62, x: 70, y: 86, skin: 's5', hair: 'puffs', hairColor: 'black', top: '#FFFFFF', bottom: 'dress', back: true, ll: [-2, 6, -3, 13], rl: [3, 10, 4, 22], la: [-4, 8, -8, 14], ra: [4, 8, 6, 15] };
    const p = person(o), h = p.hand('r');
    return s + g('data-s1-drawn="ruby-bridges-walking"', p.svg.replace('data-sk-skin=', 'data-s1-histskin=') + `<g transform="rotate(-12 ${f1(h[0])} ${f1(h[1])})">${orect(h[0] - 3, h[1] - 9, 7, 13, '#4A7BD0', 1)}${orect(h[0] - 1, h[1] - 10, 7, 13, '#D9534F', 1)}</g>`);
  }
  if (id === 'keller') {
    // Helen Keller at a table, both hands on an open book of Braille (rows of raised dots): she reads with her fingers
    let s = rect(0, 0, 140, 100, '#F2EEF7');
    const o = { age: 'adult', s: 0.78, x: 100, y: 112, skin: 's1', hair: 'bun', hairColor: 'brown', top: '#C3A6E0', mood: 'smile', look: 0 };
    o.la = armTo(o, 'l', 84, 80); o.ra = armTo(o, 'r', 116, 82);
    const p = person(o);
    s += g('data-s1-drawn="helen-keller"', p.svg.replace('data-sk-skin=', 'data-s1-histskin=')) + orect(0, 66, 140, 34, '#B07A4E', 1.2);
    let dots = '';
    for (let r = 0; r < 5; r++) for (let q = 0; q < 7; q++) { const cx = 70 + q * 8, cy = 72 + r * 5; for (const [dx, dy] of [[0, 0], [2.4, 0], [0, 2.4], [2.4, 2.4]].filter((_, j) => (q * 3 + r + j) % 3)) dots += `<circle cx="${f1(cx + dx)}" cy="${f1(cy + dy)}" r="0.9" fill="${OUT}"/>`; }
    s += g('data-s1-drawn="braille-book"', path('M64,98 L64,68 Q90,64 100,70 Q110,64 136,68 L136,98 Q110,94 100,98 Q90,94 64,98 Z', '#FFFFFF', 1.4) + line(100, 70, 100, 98, OUT, 1) + dots);
    // her hands drawn again ON the page (the arms stay behind the book): the fingers reading the dots
    s += g('data-s1-drawn="reading-fingers"', ['l', 'r'].map((sd) => { const q = p.hand(sd); return path(`M${f1(q[0] - 6)},${f1(q[1] + 7)} L${f1(q[0] - 5)},${f1(q[1] - 2)} Q${f1(q[0] - 5)},${f1(q[1] - 6)} ${f1(q[0] - 2)},${f1(q[1] - 6)} L${f1(q[0] + 4)},${f1(q[1] - 6)} Q${f1(q[0] + 6)},${f1(q[1] - 6)} ${f1(q[0] + 6)},${f1(q[1] - 2)} L${f1(q[0] + 5)},${f1(q[1] + 7)} Z`, SKIN.s1, 1.1) + [-2, 1, 4].map((fx) => line(q[0] + fx, q[1] - 6, q[0] + fx, q[1] - 1, OUT, 0.6)).join(''); }).join(''));
    return s;
  }
  if (id === 'king') {
    let s = rect(0, 0, 140, 100, '#EEF6F8');
    s += g('data-s1-drawn="memorial"', orect(30, 4, 80, 8, '#F7F4EE', 1) + Array.from({ length: 9 }, (_, q) => orect(34 + q * 8.6, 12, 4, 18, '#F7F4EE', 0.7)).join('') + orect(26, 30, 88, 4, '#E8E2D6', 0.9) + orect(20, 34, 100, 4, '#E8E2D6', 0.9));
    s += rect(0, 38, 140, 62, '#9CCB7C') + line(0, 38, 140, 38, OUT, 1);
    s += g('data-sk-drawn="speaker-at-lectern"', person({ x: 70, y: 32, s: 0.17, age: 'adult', skin: 's5', hair: 'short', hairColor: 'black', top: 'navy', bottomColor: 'navy', ra: [6, -6, 11, -16] }).svg + orect(66, 26, 8, 6, '#8B5E3C', 0.5));
    const tones = ['s1', 's2', 's3', 's4', 's5', 's6']; let q = 0;
    for (const [y, sc, n] of [[52, 0.2, 18], [64, 0.28, 13], [80, 0.38, 10], [104, 0.52, 7]]) for (let i = 0; i < n; i++) { const x = 140 / n * (i + 0.5) + ((q % 2) - 0.5) * 4; const tone = tones[q++ % 6]; const f = rng.next() < 0.5; s += person({ x, y, s: sc, age: 'adult', skin: tone, hair: f ? rng.pick(['long', 'bun', 'puffs']) : rng.pick(['short', 'curly']), hairColor: rng.pick(K.HAIR ? ['black', 'dark', 'brown'] : ['dark']), top: rng.pick(['teal', 'coral', 'yellow', 'blue', 'purple', 'green', 'red']), bottomColor: 'denim', back: true }).svg; }
    return s;
  }
  throw new Error('fairerArt: ' + id);
}

/* ================================================================ G1-666: services, drawn (0 0 100 100) */
/** a haircut happening (0 0 100 100; built from the Batch SK drawing, which is not edited): the child in the barber chair
 *  under the cape with a neat new haircut. Review round 1 (the cut hair read as dark curly specks, bugs or dirt at this
 *  page's sizes): the cut hair is SHORT STRAIGHT TUFTS in the child's own hair colour, large enough to read at print size:
 *  a few falling beside the chair and a small pile of straight strands on the floor each side of it. */
function haircutArt(c) {
  const p = person({ x: 50, y: 92, s: 0.95, age: 'child', ...c, hair: 'short', mood: 'smile' });
  const hd = p.head(), hc = HAIR[c.hairColor] || HAIR.dark, r = hd.r, skin = SKIN[c.skin] || SKIN.s2;
  // Review round 2 (ruling: the cut hair small and few, "each smaller than the child's ear", so it reads as hair and
  // never as combs, brooms or claws): ONE short lock falling just below the scissors, beside the head, and ONE small low
  // pile on the floor. Each is a few thin wavy strands in the child's own hair colour with a grey outline (the outline
  // keeps black hair visible on the red chair and fair hair visible on the floor). Every point is written absolute, so
  // the gate measures each against the ear (the ear is a circle of 0.22 head radii; its diameter is 0.44 head radii).
  /** one thin wavy strand ((x, y) its middle, ang its direction, L its length, amp its wave): its points, absolute */
  const wave = (x, y, ang, L, amp) => { const t = ang * Math.PI / 180, ux = Math.cos(t), uy = Math.sin(t), at = (u, v) => [x + ux * u - uy * v, y + uy * u + ux * v], h = L / 2; return [at(-h, 0), at(-h / 2, amp), at(0, 0), at(h / 2, -amp), at(h, 0)]; };
  const S = (pts) => `<path d="M${f1(pts[0][0])},${f1(pts[0][1])} Q${f1(pts[1][0])},${f1(pts[1][1])} ${f1(pts[2][0])},${f1(pts[2][1])} Q${f1(pts[3][0])},${f1(pts[3][1])} ${f1(pts[4][0])},${f1(pts[4][1])}"`;
  // a thin grey outline under each strand, then the strand in the hair colour (never a filled shape: a leaf, a feather)
  const strands = (list) => list.map((pts) => S(pts) + ` fill="none" stroke="#8C8C8C" stroke-width="1.1" stroke-linecap="round"/>`).join('') + list.map((pts) => S(pts) + ` fill="none" stroke="${hc}" stroke-width="0.55" stroke-linecap="round"/>`).join('');
  /** a lock of hair: three thin wavy strands side by side, falling ((x, y) its middle, ang its direction) */
  const lock = (x, y, ang) => strands([[-0.55, 3.4], [0, 3.6], [0.55, 3.0]].map(([d, L]) => wave(x - Math.sin(ang * Math.PI / 180) * d, y + Math.cos(ang * Math.PI / 180) * d, ang, L, 0.5)));
  /** a small low pile of cut hair on the floor: three short wavy strands lying on one another */
  const pile = (x, y) => strands([[0, 0, 3.6, 2], [0.2, -0.75, 3.2, -6], [-0.1, -1.4, 2.6, 5]].map(([dx, dy, L, a]) => wave(x + dx, y + dy, a, L, 0.35)));
  const part = `<g data-sk-drawn="hair-part"><path d="M${f1(hd.x - r * 0.42)},${f1(hd.y - r * 1.02)} Q${f1(hd.x - r * 0.4)},${f1(hd.y - r * 0.74)} ${f1(hd.x - r * 0.3)},${f1(hd.y - r * 0.44)}" fill="none" stroke="${skin}" stroke-width="1.5" stroke-linecap="round"/></g>`;
  const cy = hd.y + r + 1;
  const cape = `<path d="M${f1(hd.x - 22)},80 Q${f1(hd.x - 22)},${f1(cy + 1)} ${f1(hd.x)},${f1(cy)} Q${f1(hd.x + 22)},${f1(cy + 1)} ${f1(hd.x + 22)},80 Z" fill="#7EC8E3" stroke="${OUT}" stroke-width="1.3" data-sk-drawn="barber-cape"/>`;
  return `<rect x="0" y="0" width="100" height="100" fill="#EAF2EE"/><rect x="0" y="86" width="100" height="14" fill="#E6DBC6"/>` +
    `<g data-sk-drawn="barber-chair"><rect x="26" y="28" width="48" height="40" rx="6" fill="#D9534F" stroke="${OUT}" stroke-width="1.4"/><rect x="22" y="64" width="56" height="8" rx="3" fill="#D9534F" stroke="${OUT}" stroke-width="1.2"/><rect x="46" y="72" width="8" height="12" fill="#A7B3BE" stroke="${OUT}" stroke-width="1"/><ellipse cx="50" cy="86" rx="16" ry="3" fill="#A7B3BE" stroke="${OUT}" stroke-width="1"/></g>` +
    p.svg + part + cape +
    `<g data-s1-drawn="hair-clippings" data-s1-haircolor="${hc}"><g data-s1-clipping="falling">${lock(HAIRCUT_SNIP.lock[0], HAIRCUT_SNIP.lock[1], 70)}</g><g data-s1-clipping="floor">${pile(71, 94.4)}</g></g>`;
}
/** where the haircut's scissors cut (the factory puts the barber's hand so the blades' tips land at `tip`) and where the
 *  one cut lock is falling (just below the blades, beside the hair, clear of the head and the ear) */
const HAIRCUT_SNIP = { tip: [58, 28], lock: [62.4, 34.6] };
function serviceArt(id, k) {
  const bg = (c = '#EAF2EE') => rect(0, 0, 100, 100, c) + rect(0, 86, 100, 14, '#E6DBC6');
  const [a, b] = k;
  if (id === 'checkup') {
    const d = { age: 'adult', s: 0.8, x: 30, y: 98, ...a, top: '#FFFFFF', bottomColor: 'navy', stetho: true, look: 1 };
    const c = { age: 'child', s: 0.92, x: 72, y: 98, ...b, look: -1, mood: 'smile' };
    const sh = K.shoulderAt(c, 'l'); d.ra = armTo(d, 'r', sh[0] + 2, sh[1] + 10);
    const dp = person(d), hd = dp.hand('r');
    return bg() + P(c) + dp.svg + `<path d="M${f1(30)},${f1(98 - 0.8 * 73 + 12)} Q${f1((30 + hd[0]) / 2)},${f1(hd[1] + 12)} ${f1(hd[0])},${f1(hd[1])}" fill="none" stroke="#5A5A5A" stroke-width="1.4"/>` + circ(hd[0] + 1, hd[1], 2.6, '#9AA4AE', 1);
  }
  if (id === 'bus-ride') {
    // a ride, not a thing: the bus at its stop, people riding inside, a child at the bus-stop sign waiting to get on
    let s = rect(0, 0, 100, 100, '#EEF6F8') + rect(0, 80, 100, 20, '#B9B4AC');
    s += g('data-s1-drawn="city-bus"', orect(3, 26, 74, 52, '#F4C542', 1.6, ' rx="6"') + [0, 1, 2].map((q) => orect(8 + q * 17, 32, 14, 18, '#DDEFF5', 1)).join('') + orect(61, 32, 12, 18, '#DDEFF5', 1) + orect(63, 54, 10, 22, '#DDEFF5', 1) + `<circle cx="18" cy="80" r="7" fill="${OUT}"/><circle cx="18" cy="80" r="3" fill="#A7B3BE"/><circle cx="58" cy="80" r="7" fill="${OUT}"/><circle cx="58" cy="80" r="3" fill="#A7B3BE"/>`);
    s += [[15, a], [32, b], [49, a], [67, b]].map(([x, who], q) => { const h = { s1: '#F7D9C4', s2: '#F0C08F', s3: '#D9A066', s4: '#B97A45', s5: '#8A5530', s6: '#5E3A22' }[who.skin] || '#F0C08F'; return `<g data-sk-skin="${who.skin}">` + circ(x, 43, 4.4, h, 0.9) + '</g>' + `<path d="M${x - 5},50 Q${x},46 ${x + 5},50" fill="${['#2A9D8F', '#F2784B', '#8E6CC5', '#3F5372'][q]}" stroke="${OUT}" stroke-width="0.8"/>`; }).join('');
    s += g('data-s1-drawn="bus-stop"', line(91.5, 30, 91.5, 82, '#5A5A5A', 1.8) + orect(86, 19, 11, 11, '#2E6DA4', 1, ' rx="1.5"') + orect(88.2, 21.4, 6.6, 4.6, '#FFFFFF', 0.5, ' rx="1"') + circ(89.6, 27, 0.9, '#FFFFFF', 0.4) + circ(93.4, 27, 0.9, '#FFFFFF', 0.4));
    s += P({ age: 'child', s: 0.52, x: 83, y: 82, ...(k[2] || b), look: -1, la: [-3, 6, -6, 9], ra: [3, 6, 4, 11] });
    return s;
  }
  if (id === 'story-time') {
    const l = { age: 'adult', s: 0.7, x: 26, y: 98, ...a, top: 'purple', look: 1, glasses: true };
    l.la = armTo(l, 'l', 32, 52); l.ra = armTo(l, 'r', 42, 52);
    let s = bg('#F7EEDD') + g('data-s1-drawn="bookshelf"', orect(76, 8, 22, 70, '#B07A4E', 1.2) + [0, 1, 2].map((r) => line(76, 30 + r * 22, 98, 30 + r * 22, OUT, 1) + [0, 1, 2].map((q) => orect(78 + q * 6.4, 14 + r * 22, 5, 15, ['#C0504D', '#4F81BD', '#9BBB59'][(q + r) % 3], 0.5)).join('')).join(''));
    s += person(l).svg + g('data-s1-drawn="open-book"', `<path d="M28,54 L37,51 L46,54 L46,44 L37,41 L28,44 Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1"/>`);
    const seat = { ll: [-12, 6, 3, 10], rl: [12, 6, -3, 10], la: [-3, 9, 3, 16], ra: [3, 9, -3, 16] };
    s += P({ age: 'child', s: 0.62, x: 58, y: 104, ...b, ...seat, look: -1, turn: -1 }) + P({ age: 'child', s: 0.62, x: 82, y: 104, ...a, skin: k[2] ? k[2].skin : 's3', ...seat, look: -1, turn: -1 });
    return s;
  }
  if (id === 'mail') {
    // the mail carrier brings the letters to a home's mailbox; a child of that home waits for them (two people)
    const c = { age: 'child', s: 0.62, x: 90, y: 98, ...b, look: -1, mood: 'smile' }; c.la = armTo(c, 'l', 80, 62);
    return bg() + `<g transform="translate(-24 0)">${K.worker('mail-carrier', { skin: a.skin, hair: 'short', hairColor: a.hairColor })}</g>` + g('data-s1-drawn="home-mailbox"', line(68, 86, 68, 60, '#8B5E3C', 3) + path('M56,46 L80,46 L80,60 L56,60 Z', '#3F6FD1', 1.4) + path('M56,46 Q68,36 80,46', '#3F6FD1', 1.4) + orect(50, 48, 8, 5, '#FFFFFF', 0.8)) + P(c);
  }
  if (id === 'teeth') {
    const d = { age: 'adult', s: 0.74, x: 30, y: 98, ...a, top: '#7EC8E3', bottom: 'pants', bottomColor: '#7EC8E3', look: 1 };
    // the child SITS in a dentist's chair (front view: headrest, high back, arm rests, one pole), mouth open; a tooth poster on the wall
    const kid = sitting({ age: 'child', s: 0.7, x: 72, ...b, look: -1, mood: 'open', la: [-3, 7, -6, 12], ra: [3, 7, 6, 12] }, 82);
    const kh = person(kid).head(); d.ra = armTo(d, 'r', kh.x - 4, kh.y + 4);
    const dp = person(d), hd = dp.hand('r');
    return bg() + g('data-s1-drawn="dentist-chair"', orect(59, 40, 26, 9, '#C3A6E0', 1.2, ' rx="4"') + orect(57, 48, 30, 36, '#C3A6E0', 1.3, ' rx="4"') + orect(52, 70, 8, 5, '#C3A6E0', 1.1, ' rx="2"') + orect(84, 70, 8, 5, '#C3A6E0', 1.1, ' rx="2"') + orect(55, 81, 34, 6, '#C3A6E0', 1.2, ' rx="2"') + line(72, 87, 72, 94, OUT, 2.4) + orect(60, 93, 24, 3, '#8C8C8C', 0.8)) + g('data-s1-drawn="tooth-poster"', orect(80, 8, 16, 18, '#FFFFFF', 1.1, ' rx="1.5"') + path('M83,12 C85,10 87,12 88,12 C89,12 91,10 93,12 C94.5,14 93,17 92,19 L91,23 C90.5,24 89.6,24 89.3,23 L88,19.5 L86.7,23 C86.4,24 85.5,24 85,23 L84,19 C83,17 81.5,14 83,12 Z', '#FFFFFF', 0.9)) + P(kid) + dp.svg + g('data-s1-drawn="dental-mirror"', line(hd[0], hd[1], hd[0] + 6, hd[1] + 2, '#9AA4AE', 1.6) + circ(hd[0] + 7, hd[1] + 2.4, 1.8, '#DDEFF5', 0.7)) + g('data-s1-drawn="dentist-lamp"', line(50, 10, 60, 24, '#8C8C8C', 2) + orect(56, 22, 14, 8, '#F7F4EE', 1.1, ' rx="3"'));
  }
  throw new Error('serviceArt: ' + id);
}
/** the sample town, from above (0 0 300 180): streets, the bakery, the dairy farm, the apple orchard, and a road that
 *  leaves the map to places far away (a truck on it, an arrow) */
function townMapArt() {
  // a sample town seen from above: two roads cross; the bakery (a loaf on its sign), the dairy farm (a barn, cows, a milk
  // can), the apple orchard (trees with apples), homes, and a truck on the road leaving town, toward far-away places.
  // Every place carries its name: the child reads the map with the three labels beside it.
  const lab = (x, y, t, a = 'middle') => `<text x="${x}" y="${y}" text-anchor="${a}" font-family="Nunito, sans-serif" font-weight="800" font-size="12.5" fill="${OUT}">${t}</text>`;
  let s = rect(0, 0, 300, 180, '#D6EBC8') + orect(0, 0, 300, 180, 'none', 2);
  s += rect(0, 84, 300, 18, '#B9B4AC') + rect(140, 0, 18, 180, '#B9B4AC') + `<line x1="0" y1="93" x2="300" y2="93" stroke="${C.stripe}" stroke-width="1.4" stroke-dasharray="7 6"/><line x1="149" y1="0" x2="149" y2="180" stroke="${C.stripe}" stroke-width="1.4" stroke-dasharray="7 6"/>`;
  // the bakery: a shop with a roof, a door, and a loaf of bread on its sign
  s += g('data-s1-drawn="map-bakery" data-s1-mapplace="bread"', path('M22,30 L64,10 L106,30 Z', '#B5542A', 1.3) + orect(28, 30, 72, 38, '#F7EEDD', 1.3) + orect(58, 48, 12, 20, '#8C5A2B', 1) +
    orect(36, 35, 56, 11, '#FFFFFF', 1, ' rx="2"') + `<path d="M50,44 C50,37 78,37 78,44 Z" fill="#D99A4E" stroke="${OUT}" stroke-width="1"/>` + [58, 64, 70].map((x) => `<path d="M${x - 1.5},43 l3,-4" stroke="${OUT}" stroke-width="0.9"/>`).join('') + lab(64, 80, 'bakery'));
  // the dairy farm: a red barn, two cows (side view: a spotted body, a head, four legs), a milk can
  const cow = (x, y) => orect(x - 9, y - 5, 18, 10, '#FFFFFF', 1, ' rx="4"') + circ(x - 3, y - 1, 2.2, '#3A3530', 0) + circ(x + 4, y + 1, 1.8, '#3A3530', 0) + orect(x + 7, y - 9, 7, 7, '#FFFFFF', 1, ' rx="2"') + [x - 7, x - 3, x + 3, x + 7].map((lx) => line(lx, y + 5, lx, y + 9, OUT, 1.3)).join('');
  s += g('data-s1-drawn="map-dairy-farm" data-s1-mapplace="milk"', orect(170, 6, 122, 60, '#9CCB7C', 1.2) + path('M176,24 L193,10 L210,24 Z', '#8B3A2E', 1.2) + orect(178, 24, 30, 26, '#B5372F', 1.2) + path('M184,50 L184,34 L202,34 L202,50', 'none', 1) + path('M184,34 L202,50 M202,34 L184,50', 'none', 1) +
    cow(234, 26) + cow(264, 46) + orect(218, 44, 9, 12, '#C9CDD2', 1, ' rx="2"') + orect(220, 40, 5, 4, '#C9CDD2', 0.9) + lab(231, 80, 'dairy farm'));
  // the apple orchard: rows of trees with red apples
  s += g('data-s1-drawn="map-orchard" data-s1-mapplace="apples"', orect(16, 108, 112, 54, '#9CCB7C', 1.2) + [[32, 122], [58, 122], [84, 122], [110, 122], [32, 146], [58, 146], [84, 146], [110, 146]].map(([x, y]) => circ(x, y, 9, '#3F9B4B', 1) + `<circle cx="${x - 3}" cy="${y - 2}" r="1.9" fill="#D9534F"/><circle cx="${x + 3}" cy="${y + 2}" r="1.9" fill="#D9534F"/>`).join('') + lab(72, 175, 'apple orchard'));
  // homes
  s += g('data-s1-drawn="map-homes"', [[176, 114], [214, 114], [252, 114], [195, 144], [233, 144]].map(([x, y]) => path(`M${x - 2},${y + 8} L${x + 11},${y} L${x + 24},${y + 8} Z`, '#C96B4B', 1) + orect(x, y + 8, 22, 14, '#F7EEDD', 1) + orect(x + 9, y + 14, 5, 8, '#8C5A2B', 0.8)).join('') + lab(286, 175, 'homes', 'end'));
  // a truck on the road, leaving town toward far-away places
  s += g('data-s1-drawn="road-to-far-away"', orect(222, 88, 24, 11, '#F2784B', 1, ' rx="2"') + orect(244, 89, 9, 10, '#DDEFF5', 1) + `<path d="M262,93 L290,93 M283,87 L292,93 L283,99" fill="none" stroke="${T.teal}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`);
  return s;
}

/* ================================================================ G1-667: workers (0 0 100 100) and what pay can buy */
function jobArt(id, look) {
  const bg = (c = '#EAF2EE') => rect(0, 0, 100, 100, c) + rect(0, 86, 100, 14, '#E6DBC6');
  const base = { age: 'adult', s: 0.84, x: 50, y: 98, ...look };
  if (id === 'baker') return K.worker('baker', look);
  if (id === 'bus-driver') {
    // review round 1 (a yellow frame with a person read as a TV or a picture frame): the bus seen from the SIDE, like the
    // bus of the goods-and-services page, the driver at the wheel in its big front window, riders in the windows behind
    let s = rect(0, 0, 100, 100, '#EEF6F8') + rect(0, 84, 100, 16, '#B9B4AC');
    s += g('data-s1-drawn="bus-side"', path('M2,26 L84,26 Q96,26 97,38 L98,80 L2,80 Z', C.busYellow, 1.8) + [0, 1, 2].map((q) => orect(6 + q * 17, 32, 14, 18, '#DDEFF5', 1)).join('') + orect(57, 54, 10, 24, '#DDEFF5', 1) + line(2, 62, 56, 62, OUT, 1) + line(67, 62, 98, 62, OUT, 1) +
      `<circle cx="18" cy="82" r="8" fill="${OUT}"/><circle cx="18" cy="82" r="3.4" fill="#A7B3BE"/><circle cx="80" cy="82" r="8" fill="${OUT}"/><circle cx="80" cy="82" r="3.4" fill="#A7B3BE"/>` + orect(94, 66, 4, 6, '#F7C948', 0.8));
    // riders: a head and shoulders in two windows
    s += [[13, 1], [47, 2]].map(([x, q]) => { const t = { s1: '#F7D9C4', s2: '#F0C08F', s3: '#D9A066', s4: '#B97A45', s5: '#8A5530', s6: '#5E3A22' }[look.riders && look.riders[q - 1] || (q === 1 ? 's1' : 's4')]; return `<g data-sk-skin="${look.riders && look.riders[q - 1] || (q === 1 ? 's1' : 's4')}">` + circ(x, 41, 4, t, 0.9) + '</g>' + `<path d="M${x - 5},50 Q${x},45 ${x + 5},50" fill="${q === 1 ? '#2A9D8F' : '#8E6CC5'}" stroke="${OUT}" stroke-width="0.8"/>`; }).join('');
    // the big front window and the driver at the wheel (cap, both hands on the wheel)
    s += path('M70,30 L84,30 Q93,31 94,40 L94,52 L70,52 Z', '#DDEFF5', 1.4, ' data-s1-drawn="front-window"');
    const o = { age: 'adult', s: 0.5, x: 79, y: 83, ...look, top: '#3F5372', look: 1, turn: 1 };
    o.la = armTo(o, 'l', 87, 52); o.ra = armTo(o, 'r', 89, 50);
    const p = person(o), h = p.head();
    return s + `<svg x="70" y="30" width="24" height="22" viewBox="70 30 24 22" overflow="hidden">${p.svg}${g('data-s1-drawn="driver-cap"', `<path d="M${f1(h.x - h.r * 1.05)},${f1(h.y - h.r * 0.3)} Q${f1(h.x)},${f1(h.y - h.r * 1.5)} ${f1(h.x + h.r * 1.05)},${f1(h.y - h.r * 0.3)} Z" fill="#3F5372" stroke="${OUT}" stroke-width="0.9"/><path d="M${f1(h.x - h.r * 0.2)},${f1(h.y - h.r * 0.35)} L${f1(h.x + h.r * 1.5)},${f1(h.y - h.r * 0.3)} L${f1(h.x + h.r * 1.2)},${f1(h.y - h.r * 0.05)} Z" fill="#3F5372" stroke="${OUT}" stroke-width="0.8"/>`)}<ellipse cx="89" cy="50" rx="2.4" ry="5" fill="none" stroke="${OUT}" stroke-width="1.8" data-s1-drawn="steering-wheel"/></svg>`;
  }
  if (id === 'dentist') {
    const o = { ...base, x: 40, top: '#FFFFFF', bottomColor: '#7EC8E3', ra: [6, 2, 14, -8] };
    const p = person(o), r = p.hand('r'), h = p.head();
    return bg() + p.svg + g('data-s1-drawn="face-mask"', `<path d="M${f1(h.x - h.r * 0.75)},${f1(h.y + h.r * 0.25)} Q${f1(h.x)},${f1(h.y + h.r * 1.15)} ${f1(h.x + h.r * 0.75)},${f1(h.y + h.r * 0.25)} Z" fill="#BFE3F2" stroke="${OUT}" stroke-width="0.8"/>`) +
      g('data-s1-drawn="dental-mirror"', line(r[0], r[1], r[0] + 2, r[1] - 12, '#9AA4AE', 2) + circ(r[0] + 2.5, r[1] - 14, 3, '#DDEFF5', 1)) +
      g('data-s1-drawn="big-tooth"', path('M66,54 Q66,44 74,44 Q80,46 82,44 Q90,44 90,54 Q90,62 86,66 L84,82 Q82,86 80,80 L78,70 L76,80 Q74,86 72,82 L70,66 Q66,62 66,54 Z', '#FFFFFF', 1.6));
  }
  if (id === 'farmer') {
    const o = { ...base, x: 40, top: 'red', bottomColor: 'denim', la: [-4, 9, -6, 18], ra: [6, 6, 16, 10] };
    const p = person(o), h = p.head(), r = p.hand('r');
    return bg('#EEF6F8') + p.svg + `<path d="M${f1(h.x - 5)},${f1(h.y + 12)} L${f1(h.x - 5)},${f1(h.y + 36)} M${f1(h.x + 5)},${f1(h.y + 12)} L${f1(h.x + 5)},${f1(h.y + 36)}" stroke="#4F6D9A" stroke-width="2.6"/>` +
      g('data-s1-drawn="straw-hat"', `<ellipse cx="${f1(h.x)}" cy="${f1(h.y - h.r * 0.6)}" rx="${f1(h.r * 1.8)}" ry="${f1(h.r * 0.35)}" fill="#E6C15A" stroke="${OUT}" stroke-width="1"/><path d="M${f1(h.x - h.r * 0.9)},${f1(h.y - h.r * 0.6)} Q${f1(h.x)},${f1(h.y - h.r * 1.9)} ${f1(h.x + h.r * 0.9)},${f1(h.y - h.r * 0.6)} Z" fill="#E6C15A" stroke="${OUT}" stroke-width="1"/>`) +
      g('data-s1-drawn="basket-of-vegetables"', [[r[0] + 6, r[1] - 2, '#F39C40'], [r[0] + 13, r[1] - 4, '#D9534F'], [r[0] + 19, r[1] - 1, '#6BB36B']].map(([x, y, c]) => circ(x, y, 4.4, c, 0.9)).join('') + path(`M${f1(r[0] + 1)},${f1(r[1])} L${f1(r[0] + 25)},${f1(r[1])} L${f1(r[0] + 22)},${f1(r[1] + 13)} L${f1(r[0] + 4)},${f1(r[1] + 13)} Z`, '#B07A4E', 1.2) + `<path d="M${f1(r[0] + 1)},${f1(r[1])} Q${f1(r[0] + 13)},${f1(r[1] - 16)} ${f1(r[0] + 25)},${f1(r[1])}" fill="none" stroke="#8B5E3C" stroke-width="1.6"/>`);
  }
  throw new Error('jobArt: ' + id);
}
function spendArt(id, k) {
  const bg = rect(0, 0, 100, 100, '#FFFFFF');
  if (id === 'food') return bg + g('data-s1-drawn="grocery-bag"', `<ellipse cx="38" cy="26" rx="10" ry="6" fill="#F4C542" stroke="${OUT}" stroke-width="1.2"/>` + `<path d="M56,30 L60,10 L64,30 Z" fill="#6BB36B" stroke="${OUT}" stroke-width="1"/>` + orect(52, 18, 14, 18, '#FFFFFF', 1.2) + circ(70, 30, 7, '#D9534F', 1.1) + path('M20,32 L80,32 L74,92 L26,92 Z', '#C9A66B', 2) + `<path d="M36,32 Q50,46 64,32" fill="none" stroke="${OUT}" stroke-width="1.4"/>`);
  if (id === 'home') return bg + g('data-s1-drawn="home"', orect(22, 44, 56, 46, '#F4EBD9', 2) + path('M14,46 L50,16 L86,46 Z', '#A8483A', 2) + orect(44, 64, 12, 26, '#8B5E3C', 1.4) + orect(28, 52, 10, 10, '#DDEFF5', 1.1) + orect(62, 52, 10, 10, '#DDEFF5', 1.1)) + g('data-s1-drawn="key"', `<circle cx="78" cy="80" r="6" fill="none" stroke="${'#E6B422'}" stroke-width="3"/><path d="M83,84 L94,95 M90,91 L93,88 M87,88 L90,85" fill="none" stroke="#E6B422" stroke-width="3" stroke-linecap="round"/>`);
  if (id === 'clothes') return bg + g('data-s1-drawn="clothes"', path('M24,14 L38,8 Q44,16 50,8 L64,14 L74,30 L64,36 L62,30 L62,56 L26,56 L26,30 L24,36 L14,30 Z', '#4A7BD0', 1.8) + path('M30,58 L60,58 L62,94 L50,94 L46,70 L42,94 L30,94 Z', '#4F6D9A', 1.8) + path('M66,40 L90,40 L92,58 L64,58 Z', '#E98AB0', 1.4));
  if (id === 'shoes') return bg + g('data-s1-drawn="shoes"', [[10, 56], [50, 70]].map(([x, y]) => path(`M${x},${y} L${x + 18},${y} Q${x + 22},${y + 8} ${x + 36},${y + 10} Q${x + 42},${y + 12} ${x + 40},${y + 20} L${x},${y + 20} Z`, '#D9534F', 1.8) + line(x, y + 16, x + 40, y + 16, OUT, 1.2) + [4, 8, 12].map((d) => line(x + 14 + d * 0.6, y + 2 + d * 0.4, x + 20 + d * 0.6, y + 2 + d * 0.4, '#FFFFFF', 1.4)).join('')).join(''));
  if (id === 'sun') return rect(0, 0, 100, 100, '#EEF6F8') + K.sun(50, 50, 22);
  if (id === 'hug') {
    const [a, b] = k;
    const p1 = { age: 'adult', s: 0.78, x: 40, y: 98, ...a, look: 1, mood: 'smile' }, p2 = { age: 'child', s: 0.86, x: 62, y: 98, ...b, look: -1, mood: 'smile' };
    const sh = K.shoulderAt(p2, 'r'); p1.ra = armTo(p1, 'r', sh[0] + 3, sh[1] + 4);
    const sh2 = K.shoulderAt(p1, 'l'); p2.la = armTo(p2, 'l', sh2[0] + 10, sh2[1] + 12);
    return rect(0, 0, 100, 100, '#F7EEDD') + g('data-s1-drawn="hug"', P(p2) + P(p1) + path('M50,10 Q44,4 40,9 Q37,14 50,24 Q63,14 60,9 Q56,4 50,10 Z', '#E98AB0', 1.2));
  }
  if (id === 'rainbow') return rect(0, 0, 100, 100, '#EEF6F8') + g('data-s1-drawn="rainbow"', ['#D9534F', '#F39C40', '#F4C542', '#6BB36B', '#4A7BD0', '#8E6CC5'].map((c, q) => `<path d="M${10 + q * 5},84 A${40 - q * 5},${40 - q * 5} 0 0 1 ${90 - q * 5},84" fill="none" stroke="${c}" stroke-width="5.4"/>`).join(''));
  throw new Error('spendArt: ' + id);
}

/* ================================================================ G1-668: saving: the jar, a dollar, the price tag */
/** a jar in n parts, one part for each week (bottom = week 1), numbered at the side (w x h px) */
function savingJar(n, w, h) {
  const top = 22, bot = h - 6, x0 = 16, x1 = w - 30, part = (bot - top) / n;
  let s = orect(x0 + 6, 4, x1 - x0 - 12, 14, C.jarLid, 1.8, ' rx="3"') + path(`M${x0},${top} L${x1},${top} L${x1},${bot - 8} Q${x1},${bot} ${x1 - 8},${bot} L${x0 + 8},${bot} Q${x0},${bot} ${x0},${bot - 8} Z`, C.jarGlass, 2.4, ' data-s1-drawn="jar"');
  for (let q = 1; q < n; q++) s += line(x0, bot - q * part, x1, bot - q * part, OUT, 1.8, ` data-s1-jarline="${q}"`);
  for (let q = 0; q < n; q++) s += `<text x="${f1(x1 + 8)}" y="${f1(bot - q * part - part / 2 + 6)}" font-family="Baloo 2, cursive" font-weight="700" font-size="17" fill="${T.inkSoft}" data-s1-week="${q + 1}">${q + 1}</text>`;
  return s + `<rect x="${f1(x0 + 6)}" y="${f1(top + 4)}" width="6" height="${f1(bot - top - 16)}" fill="#FFFFFF" opacity="0.6"/>`;
}
/** a one-dollar bill, drawn simply: green, the value 1 in the corners, an oval (no face), "ONE" (0 0 100 44) */
function dollarArt() {
  return g('data-s1-drawn="dollar"', orect(2, 2, 96, 40, C.bill, 1.6, ' rx="3"') + orect(6, 6, 88, 32, 'none', 0.8) + `<ellipse cx="50" cy="22" rx="12" ry="13" fill="#FFFFFF" stroke="${C.billDark}" stroke-width="1.4"/>` +
    `<text x="50" y="29" text-anchor="middle" font-family="Baloo 2, cursive" font-weight="700" font-size="18" fill="${C.billDark}">$1</text>` + [[13, 18], [87, 18], [13, 36], [87, 36]].map(([x, y]) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Baloo 2, cursive" font-weight="700" font-size="11" fill="${C.billDark}">1</text>`).join(''));
}
/** a price tag with its string (0 0 70 40) */
function priceTag(text) {
  return g('data-s1-drawn="price-tag"', path('M14,4 L66,4 L66,36 L14,36 L2,20 Z', '#FFFFFF', 1.8) + circ(12, 20, 3, 'none', 1.2) + `<text x="40" y="28" text-anchor="middle" font-family="Baloo 2, cursive" font-weight="700" font-size="20" fill="${OUT}" data-s1-price="1">${text}</text>`);
}

module.exports = { S1_SCENE, PAL1, haircutArt, HAIRCUT_SNIP, july4Icon, parkArt, libertyBell, paintingArt, quarterArt, quarterBackArt, usCoin, stateCloseup, letterArt, memorialArt, readingArt, fairerArt, serviceArt, townMapArt, jobArt, spendArt, savingJar, dollarArt, priceTag, toGrey, postcardFront, postcardBack, thenNowArt, communityArt, landArt, workerArt, placeScene, clueIcon, citizenArt, virtueIcon, leaderArt, usMap, schoolArt, townArt, talkRuleArt, interviewClue, albers, sitting, wallFloor, desk, chairFront, rect, orect, line, circ, path, g, P };
