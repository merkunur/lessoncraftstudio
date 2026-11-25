/**
 * dk-social-2-art.js — the drawings of the Batch S2 Grade 2 social studies pages (Daily Teaching System Stage D-5,
 * 2026-11-25; factory dk-social-2.js). Pure functions that return SVG markup; NOTHING here reads a picture or the cache
 * while the module loads (library pictures are placed by the factory, at build time).
 *
 * Built on the Batch SK figure and palette (dk-social-k-art.js: person(), the skin tones, the dark outline) and the
 * Batch S1 helpers and drawings (dk-social-1-art.js: rect / orect / line / circ / path / g, the US coins, the price tag,
 * the leader at a lectern, the state close-up, the small town); neither file is edited. Every colour is in PAL2 (PAL1 +
 * the S2 scenery colours below): the gate holds every drawing to it. Maps: data/social/dk-social-2-geo.js (Natural
 * Earth; never a shape drawn by hand). Every leader is a role, never a person's likeness; disasters are calm (water on a
 * road, a closed school, helpers in a boat; no one hurt, no home destroyed); the old photograph is a drawn sample in
 * greys (no real photograph, no real person).
 */
'use strict';
const K = require('./dk-social-k-art.js');
const A1 = require('./dk-social-1-art.js');
const GEO = require('../../data/social/dk-social-2-geo.js');
const TOK = require('../../primitives/_tokens.js');
const T = TOK.color;
const { person, armTo, f1, OUT, SKIN, HAIR, CLOTH, BODY } = K;
const { rect, orect, line, circ, path, g, P } = A1;

/* ================================================================ the new scenery colours + PAL2 */
const S2_SCENE = {
  floodWater: '#9DC3D4', floodDeep: '#6FA3BA', sandbag: '#CDB88E', sandbagDark: '#A8935F', cloudGrey: '#C9CED3', cloudDark: '#AEB4BA',
  iceShade: '#DCE8F0', seaDeep: '#2F7DB5', cactus: '#5E9E5A', cactusDark: '#3F7A3C', dune: '#E8CB86', bloomRed: '#E4574B', bloomYellow: '#F4C542', bloomPurple: '#8E6CC5',
  pondIce: '#E3F1F7', reed: '#7A9E4A', cityBlue: '#8FA9C9', cityGrey: '#B7BEC6', cityDark: '#6F7A87', windowLit: '#FFE9A8', dock: '#9C7A52',
  menorahGold: '#D9A520', candleWhite: '#FFFFFF', kinRed: '#D7263E', kinBlack: '#2B2522', kinGreen: '#2E8B57', kinaraWood: '#7A4A26',
  pinataPink: '#E9579A', pinataBlue: '#3FA7D6', pinataYellow: '#F7C531', pinataGreen: '#5CB85C', pinataOrange: '#F08A24', foil: '#C9A13B',
  burlap: '#C9A66B', burlapDark: '#A3824B', coffeeBean: '#5A3820', cocoaPod: '#C7782E', cocoaPodDark: '#9C5A20', cocoaBean: '#6B3E1E', soyPod: '#A9B65E', soyBean: '#E8DC9A', sugarBag: '#F7F4EE',
  islandSand: '#F1DDA6', islandGreen: '#8CC56B', islandHill: '#6FAE55', snowIsland: '#F4F8FB', woolCream: '#F3EEDF', fruitRed: '#E4574B', fruitOrange: '#F39C40',
  blueprint: '#2E6DA4', blueprintLine: '#DCEBF7', tapeYellow: '#F4C542', brickWall: '#C96B4B', mortar: '#EDE4D3', calendarRed: '#D9534F', seedBrown: '#8B5E3C',
  vault: '#A7B3BE', vaultDark: '#6E7A86', counter: '#B07A4E', statement: '#FFFDF5', roofHole: '#5A4A3E', tile: '#A8483A',
  hardHat: '#F4C542', vest: '#F39C40', vestStripe: '#F7F4EE', cone: '#F08A24', asphaltNew: '#4A4A4A', mailBlue: '#3F5372', mailBag: '#8B5E3C',
  lemonade: '#FBE27A', cupWhite: '#FFFFFF', cupRed: '#D9534F', standWood: '#D9A066', posterWhite: '#FFFFFF', marker: '#2E6DA4',
  photoBg: '#E6E6E6', photoEdge: '#FAFAFA', flowerPink: '#E98AB0', bookmarkTeal: '#2A9D8F', cardYellow: '#F7D46A',
  usLand: '#B9DC9E', usPale: '#EEF3E6', worldLand: '#E9E4D6', worldBorder: '#9A9488', worldSea: '#DDEFF7', countryPick: '#F28C28', starGold: '#F7C948',
  coastBand: '#E8E3D6', arrowIn: '#F7D9C4', arrowOut: '#D6EBC8', firstAid: '#3F9B4B', battery: '#3A3530', batteryTop: '#C9CDD2', radioBody: '#5A6470',
};
const PAL2 = new Set([...A1.PAL1, ...Object.values(S2_SCENE).map((c) => c.toUpperCase())]);
const C = { ...A1.S1_SCENE, ...S2_SCENE };
const KS = K.SCENE;

/* ================================================================ small helpers */
const kid = (o) => person({ age: 'child', ...o });
const adult = (o) => person({ age: 'adult', ...o });
/** review round 1 (rows 7, 35, 48): ONE grown-up figure for the leaders, the council and Congress, the librarian, the park
 *  worker, the bankers and the bank's parent. Adult body; hair short or up (never a cap, pigtails, puffs, braids or a
 *  ponytail); work clothes: a jacket with a shirt collar (a tie when `tie`), a cardigan with a lanyard and a badge
 *  (`badge`), or a work vest with stripes over the shirt (`vest`). o: person() options (x, y, s, la, ra, look ...). The
 *  person() result is returned (hand(), head(), height) with the clothes drawn in its own frame. */
const JACKETS = ['#3F5372', '#4A4A4A', '#7A5230', '#34405A', '#2E4A7A', '#5A6E8C'];
function grownUp(look, o = {}) {
  const sex = look.sex || (['puffs', 'pony', 'braids', 'long', 'bun', 'hijab'].includes(look.hair) ? 'f' : 'm');
  const okHair = sex === 'f' ? ['bun', 'short', 'hijab', 'curly'] : ['short', 'bald', 'curly'];
  const hair = o.hair || (okHair.includes(look.hair) ? look.hair : (sex === 'f' ? 'bun' : 'short'));
  const jacket = o.jacket || JACKETS[(look.skin ? +look.skin.slice(1) : 0) % JACKETS.length];
  const shirt = o.shirt || '#FFFFFF';
  const wear = o.lifeVest ? 'lifevest' : o.vest ? 'vest' : o.badge ? 'badge' : 'jacket';
  const top = wear === 'vest' || wear === 'lifevest' ? (o.shirtTop || '#2A9D8F') : wear === 'badge' ? (o.cardigan || '#7A4E9C') : jacket;
  const shY = -BODY.adult.shY, hipY = -BODY.adult.hipY;
  // the clothes, in the figure's own units (drawn after the near arm: they sit on the chest, clear of the arms)
  let cloth = '';
  if (wear === 'lifevest') {
    // a life vest: a thick orange vest over the whole chest, two dark straps with buckles
    cloth += path(`M-11.2,${f1(shY + 1)} L-4,${f1(shY - 1.5)} L0,${f1(shY + 5)} L4,${f1(shY - 1.5)} L11.2,${f1(shY + 1)} L11.6,${f1(hipY + 2)} L-11.6,${f1(hipY + 2)} Z`, '#F08A24', 1.1) + [10, 19].map((dy) => rect(-11.2, shY + dy, 22.4, 2.2, '#3A3530') + orect(-1.8, shY + dy - 0.6, 3.6, 3.4, '#C9CDD2', 0.5)).join('');
  } else if (wear === 'vest') {
    // a work vest: two fronts with a light stripe, the shirt between them
    cloth += [-1, 1].map((sd) => path(`M${f1(sd * 2.6)},${f1(shY - 0.5)} L${f1(sd * 9.6)},${f1(shY + 1)} L${f1(sd * 10.4)},${f1(hipY + 3)} L${f1(sd * 2.6)},${f1(hipY + 3)} Z`, C.vest, 1) + rect(Math.min(sd * 2.6, sd * 10.2), shY + 14, 7.6, 2.6, C.vestStripe)).join('');
  } else {
    // the shirt collar at the neck (a V), a tie when asked
    cloth += path(`M${f1(-4.2)},${f1(shY - 0.8)} L0,${f1(shY + 9)} L${f1(4.2)},${f1(shY - 0.8)} Z`, shirt, 1);
    if (o.tie) cloth += path(`M-1.4,${f1(shY + 0.6)} L1.4,${f1(shY + 0.6)} L1.9,${f1(shY + 11)} L0,${f1(shY + 13.5)} L-1.9,${f1(shY + 11)} Z`, o.tieColor || '#B5372F', 0.8);
    // the jacket's front edges below the collar, and two buttons
    cloth += `<path d="M-4.2,${f1(shY - 0.8)} L-1.2,${f1(hipY + 1)} M4.2,${f1(shY - 0.8)} L1.2,${f1(hipY + 1)}" fill="none" stroke="${OUT}" stroke-width="0.9"/>`;
    if (wear === 'badge') cloth += `<path d="M-3.2,${f1(shY - 0.4)} L-0.6,${f1(shY + 13)} M3.2,${f1(shY - 0.4)} L0.6,${f1(shY + 13)}" fill="none" stroke="#2E6DA4" stroke-width="1.1"/>` + orect(-3.4, shY + 12.5, 6.8, 8.4, '#FFFFFF', 0.8, ' rx="1"') + rect(-2.2, shY + 14.4, 4.4, 1.6, '#2E6DA4') + rect(-2.2, shY + 17.4, 4.4, 1, '#8A8276');
  }
  const p = person({ ...look, ...o, age: 'adult', hair, top, bottom: o.bottom || (sex === 'f' && o.skirt ? 'skirt' : 'pants'), bottomColor: o.bottomColor || 'dark', coat: undefined, hold: cloth + (o.hold || '') });
  return { ...p, svg: g(`data-s2-grownup="${wear}" data-s2-hair="${hair}"`, p.svg) };
}
/** the US flag on a pole (a small one beside a lectern or a desk); (x, y) the foot of the pole, h its height */
function flagPole(x, y, h, w = 16) {
  const fy = y - h, fh = w * 0.62;
  return g('data-s2-drawn="flag"', line(x, y, x, fy - 1, '#5A5A5A', 1.4) + circ(x, fy - 1.5, 1.4, '#E6B422', 0.6) + orect(x + 0.6, fy, w, fh, '#FFFFFF', 0.8) +
    [0, 2, 4, 6].map((q) => rect(x + 0.6, fy + q * fh / 7, w, fh / 7, '#B22234')).join('') + rect(x + 0.6, fy, w * 0.42, fh * 0.54, '#3C3B6E') + `<rect x="${f1(x + 0.6)}" y="${f1(fy)}" width="${f1(w)}" height="${f1(fh)}" fill="none" stroke="${OUT}" stroke-width="0.8"/>`);
}
/** a thought / speech bubble: a rounded box with a tail toward (tx, ty) (dots for a thought) */
function bubble(x, y, w, h, tx, ty, thought = true, inner = '', attrs = '') {
  const tail = thought ? [0.35, 0.65].map((t, i) => circ(x + w / 2 + (tx - x - w / 2) * t, y + h + (ty - y - h) * t, 2.6 - i, '#FFFFFF', 1)).join('')
    : path(`M${f1(x + w * 0.4)},${f1(y + h - 1)} L${f1(tx)},${f1(ty)} L${f1(x + w * 0.58)},${f1(y + h - 1)} Z`, '#FFFFFF', 1.2);
  return g(`data-s2-drawn="${thought ? 'thought' : 'speech'}-bubble"${attrs ? ' ' + attrs : ''}`, (thought ? '' : tail) + orect(x, y, w, h, '#FFFFFF', 1.3, ` rx="${f1(Math.min(w, h) * 0.32)}"`) + (thought ? tail : '') + inner);
}
/** a word on a sign or a label (dark letters on a light board) */
const signText = (x, y, txt, size, fill = OUT, anchor = 'middle', extra = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${anchor}" font-family="Nunito, sans-serif" font-weight="800" font-size="${f1(size)}" fill="${fill}"${extra}>${txt}</text>`;
const sign = (x, y, w, h, txt, size, bg = '#FFFFFF', fg = OUT, attrs = '') => g(`data-s2-sign="${txt}"${attrs ? ' ' + attrs : ''}`, orect(x, y, w, h, bg, 1.2, ' rx="2"') + signText(x + w / 2, y + h / 2 + size * 0.36, txt, size, fg));
const house = (x, y, w, h, wall, roofC = '#8C8C8C', door = '#8B5E3C') => orect(x, y, w, h, wall, 1.2) + path(`M${f1(x - 3)},${f1(y + 1)} L${f1(x + w / 2)},${f1(y - h * 0.5)} L${f1(x + w + 3)},${f1(y + 1)} Z`, roofC, 1.2) + orect(x + w * 0.4, y + h * 0.45, w * 0.2, h * 0.55, door, 1) + orect(x + w * 0.1, y + h * 0.2, w * 0.18, h * 0.2, '#DDEFF5', 0.8) + orect(x + w * 0.72, y + h * 0.2, w * 0.18, h * 0.2, '#DDEFF5', 0.8);
const treeR = (x, y, h, c = KS.leaf) => K.tree(x, y, h, c);
const cloud = (x, y, s, c = '#FFFFFF') => `<g>${[[0, 0, 9], [10, -4, 11], [21, 0, 9], [10, 4, 8]].map(([dx, dy, r]) => `<circle cx="${f1(x + dx * s)}" cy="${f1(y + dy * s)}" r="${f1(r * s)}" fill="${c}" stroke="${OUT}" stroke-width="1"/>`).join('')}${[[0, 0, 8], [10, -4, 10], [21, 0, 8], [10, 4, 7]].map(([dx, dy, r]) => `<circle cx="${f1(x + dx * s)}" cy="${f1(y + dy * s)}" r="${f1(r * s)}" fill="${c}"/>`).join('')}</g>`;
/** a star (5 points) */
function star(cx, cy, r, fill, sw = 1.2, attrs = '') { const pts = Array.from({ length: 10 }, (_, j) => { const a = -Math.PI / 2 + j * Math.PI / 5, rr = j % 2 ? r * 0.45 : r; return f1(cx + Math.cos(a) * rr) + ',' + f1(cy + Math.sin(a) * rr); }).join(' '); return `<polygon points="${pts}" fill="${fill}" stroke="${OUT}" stroke-width="${sw}" stroke-linejoin="round"${attrs ? ' ' + attrs : ''}/>`; }
/** a hand-held thing at a view point */
const at = (x, y, s, inner) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">${inner}</g>`;

/** a ball of yarn (wool): wrap lines round it and a loose end, the same drawing as the thought bubble's (review round 1,
 *  row 33: plain circles read as eggs or snowballs); r its radius in view units, q picks the side of the loose end */
function yarnBall(x, y, r, q = 0) {
  const k = r / 9, sd = q % 2 ? -1 : 1;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${(Math.round(k * 1000) / 1000)})" data-s2-drawn="yarn-ball">` + circ(0, 0, 9, C.woolCream, 1.2) +
    `<path d="M-8,-3 Q0,-7 8,-3 M-9,1 Q0,-3 9,1 M-8,5 Q0,1 8,5 M-3,-8 Q-6,0 -3,8 M3,-8 Q6,0 3,8" fill="none" stroke="${C.burlapDark}" stroke-width="1"/>` +
    `<path d="M${7 * sd},6 Q${12 * sd},10 ${9 * sd},14" fill="none" stroke="${C.burlapDark}" stroke-width="1.3"/></g>`;
}

/* ================================================================ maps (data/social/dk-social-2-geo.js) */
/** the lower 48 (Natural Earth, Albers) placed in a box: returns { svg, T(x,y) -> view } ; opts: fill, coasts (bands to
 *  colour, by id), state (Colorado filled) */
function us48(bx, by, bw, bh, opts = {}) {
  const U = GEO.US48, k = Math.min(bw / U.w, bh / U.h), ox = bx + (bw - U.w * k) / 2, oy = by + (bh - U.h * k) / 2;
  const tr = `translate(${f1(ox)} ${f1(oy)}) scale(${(Math.round(k * 10000) / 10000)})`;
  let s = `<g transform="${tr}"><path d="${U.d}" fill="${opts.fill || C.usLand}" stroke="${OUT}" stroke-width="${f1(1.3 / k)}" stroke-linejoin="round" data-s2-us="lower48"/>`;
  if (opts.state) s += `<path d="${U.colorado}" fill="${C.mapState}" stroke="${OUT}" stroke-width="${f1(1.1 / k)}" data-s2-state="colorado"/>`;
  if (opts.coasts) for (const id of opts.coasts) s += `<path d="${U.coasts[id]}" fill="none" stroke="#FFFFFF" stroke-width="${f1(opts.band / k)}" stroke-linecap="round" stroke-linejoin="round" data-s2-coast="${id}"/><path d="${U.coasts[id]}" fill="none" stroke="${OUT}" stroke-width="${f1(0.9 / k)}" stroke-dasharray="${f1(3 / k)} ${f1(2.5 / k)}" data-s2-coastline="${id}"/>`;
  s += '</g>';
  return { svg: s, T: (x, y) => [ox + x * k, oy + y * k], k, w: U.w * k, h: U.h * k, x: ox, y: oy };
}
/** the whole country: the lower 48 with Alaska and Hawaii in two small boxes under it (0 0 w h) */
function usCountry(w, h, fill = C.usLand) {
  const top = us48(2, 2, w - 4, h * 0.72, { fill });
  const ins = (G2, bx, by, bw, bh, name) => { const k = Math.min((bw - 6) / G2.w, (bh - 6) / G2.h); return `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(bw)}" height="${f1(bh)}" fill="none" stroke="${OUT}" stroke-width="0.8"/><g transform="translate(${f1(bx + (bw - G2.w * k) / 2)} ${f1(by + (bh - G2.h * k) / 2)}) scale(${Math.round(k * 10000) / 10000})"><path d="${G2.d}" fill="${fill}" stroke="${OUT}" stroke-width="${f1(1.1 / k)}" stroke-linejoin="round" data-s2-us="${name}"/></g>`; };
  const by = h * 0.72 + 4, bh = h - by - 2;
  return top.svg + ins(GEO.ALASKA, 4, by, Math.min(w * 0.3, bh * 1.5), bh, 'alaska') + ins(GEO.HAWAII, 8 + Math.min(w * 0.3, bh * 1.5), by, Math.min(w * 0.22, bh * 1.3), bh, 'hawaii');
}
/**
 * the world (Natural Earth I; every country its own outline): returns { svg, k, at(id) -> centre in view px }.
 *  opts: w (view width), pick: [ids drawn with a thick orange outline], labels: { id: [dx, dy] } (the country's name at
 *  its centre + (dx, dy) view px, with a leader line when moved), star: id (a gold star at that country's centre),
 *  font (label size)
 */
function worldMap(w, opts = {}) {
  const Wd = GEO.WORLD, k = w / Wd.w, h = Wd.h * k;
  const cs = Wd.countries;
  let s = `<rect x="0" y="0" width="${f1(w)}" height="${f1(h)}" fill="${C.worldSea}" stroke="${OUT}" stroke-width="1"/>`;
  s += `<g transform="scale(${Math.round(k * 10000) / 10000})">` + Object.entries(cs).map(([id, c]) => `<path d="${c.d}" fill="${C.worldLand}" stroke="${C.worldBorder}" stroke-width="${f1(0.55 / k)}" stroke-linejoin="round" data-s2-country="${id}"/>`).join('');
  for (const id of opts.pick || []) s += `<path d="${cs[id].d}" fill="none" stroke="${C.countryPick}" stroke-width="${f1(2.6 / k)}" stroke-linejoin="round" data-s2-pick="${id}"/>`;
  s += '</g>';
  const fs = opts.font || 13;
  const cen = (id) => [cs[id].centre[0] * k, cs[id].centre[1] * k];
  const labels = [];
  for (const [id, [dx, dy]] of Object.entries(opts.labels || {})) {
    const [cx, cy] = cen(id), lx = cx + dx, ly = cy + dy, word = (opts.words || {})[id] || cs[id].name;
    const tw = word.length * fs * 0.56 + 8;
    if (dx || dy) s += `<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(lx)}" y2="${f1(ly)}" stroke="${OUT}" stroke-width="1" data-s2-leader="${id}"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="1.8" fill="${OUT}"/>`;
    s += `<g data-s2-label="${id}"><rect x="${f1(lx - tw / 2)}" y="${f1(ly - fs * 0.62)}" width="${f1(tw)}" height="${f1(fs * 1.24)}" rx="3" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.8"/>${signText(lx, ly + fs * 0.36, word, fs)}</g>`;
    labels.push(id);
  }
  if (opts.star) { const [sx, sy] = cen(opts.star); s += star(sx, sy, 9, C.starGold, 1.3, 'data-s2-star="1"'); }
  return { svg: s, k, h, at: cen };
}

/* ================================================================ G2-614: the class rules, as pictures (0 0 100 100) */
const lockerRow = (x, y, n, w = 14, h = 50) => Array.from({ length: n }, (_, q) => orect(x + q * w, y, w, h, '#7FA7D9', 1) + line(x + q * w + 4, y + 7, x + q * w + w - 4, y + 7, OUT, 0.8) + line(x + q * w + 4, y + 10, x + q * w + w - 4, y + 10, OUT, 0.8) + circ(x + q * w + w - 4, y + h / 2, 1, OUT, 0.5)).join('');
function ruleArt(id, k) {
  const bg = rect(0, 0, 100, 100, '#F4EBD9') + rect(0, 82, 100, 18, '#E6DBC6') + line(0, 82, 100, 82, OUT, 1);
  const a = { ...k[0], age: 'child', s: 1.08, y: 96 }, b = { ...k[1], age: 'child', s: 1.08, y: 96 };
  if (id === 'kind') {
    // one child holds out a box of crayons to the other, a small heart above them
    a.x = 30; b.x = 72; a.ra = armTo(a, 'r', 51, 62); b.la = armTo(b, 'l', 55, 64);
    return bg + P(a) + P(b) + g('data-s2-drawn="crayon-box"', orect(46, 56, 12, 10, '#F4C542', 1) + [0, 1, 2, 3].map((q) => orect(47 + q * 2.6, 51, 2.2, 6, ['#D9534F', '#4A7BD0', '#6BB36B', '#8E6CC5'][q], 0.5)).join('')) + `<path d="M50,24 C44,16 36,22 42,30 L50,38 L58,30 C64,22 56,16 50,24 Z" fill="#E4574B" stroke="${OUT}" stroke-width="1.2" data-s2-drawn="heart"/>`;
  }
  if (id === 'turns') {
    // a slide: one child sits at the top, ready to go down; the next child stands in line at the bottom of the ladder,
    // hands down, waiting for a turn (the ladder between them)
    const slide = path('M66,44 L92,82 L98,82 L72,44 Z', '#F39C40', 1.2) + line(52, 44, 52, 84, OUT, 2.2) + line(64, 44, 64, 84, OUT, 2.2) + [52, 60, 68, 76].map((y) => line(52, y, 64, y, OUT, 1.5)).join('') + orect(50, 41, 22, 5, '#F39C40', 1.1);
    const top = { ...a, s: 0.62, x: 61, la: [-5, 6, -8, 12], ra: [5, 6, 8, 12], ll: [-3, 2, 4, 10], rl: [3, 2, 10, 9] };
    top.y = 41 + top.s * BODY.child.hipY;
    b.x = 30; b.look = 1; b.la = [-2, 9, -3, 18]; b.ra = [2, 9, 3, 18];
    return bg + slide + P(top) + P(b) + g('data-s2-drawn="waiting"', '');
  }
  if (id === 'listen') {
    // one child talks (a speech bubble), the other listens: eyes on the speaker, a hand at the ear
    a.x = 28; a.mood = 'open'; b.x = 72; b.look = -1; b.la = [-4, -6, -1, -17];
    return bg + P(a) + P(b) + bubble(8, 6, 34, 18, 26, 40, false, [0, 1].map((q) => line(14, 12 + q * 6, 36, 12 + q * 6, OUT, 1.2)).join(''));
  }
  if (id === 'clean') {
    // a child puts blocks back in the toy bin
    a.x = 36; a.ra = armTo(a, 'r', 62, 66);
    const bin = path('M56,70 L84,70 L81,92 L59,92 Z', '#5FA8A0', 1.3) + orect(60, 63, 8, 8, '#E4574B', 1) + orect(70, 64, 8, 7, '#4A7BD0', 1) + orect(61, 58, 7, 7, '#F4C542', 1, ' transform="rotate(12 64 61)"');
    return bg + bin + P(a) + orect(18, 88, 7, 6, '#6BB36B', 1);
  }
  if (id === 'hands') {
    // two children side by side in line, each with hands held in front (space between them)
    a.x = 30; b.x = 70; a.la = [-1, 9, 4, 15]; a.ra = [1, 9, -4, 15]; b.la = [-1, 9, 4, 15]; b.ra = [1, 9, -4, 15];
    return bg + P(a) + P(b) + `<path d="M43,60 L57,60" stroke="${OUT}" stroke-width="1.2" stroke-dasharray="2 2"/><path d="M45,57 L43,60 L45,63 M55,57 L57,60 L55,63" fill="none" stroke="${OUT}" stroke-width="1.2"/>`;
  }
  // walk: a child walks (not runs) down the hallway past the lockers
  a.x = 50; a.ll = [-4, 11, -9, 22]; a.rl = [4, 11, 9, 22]; a.la = [-4, 9, -1, 18]; a.ra = [4, 9, 8, 16];
  return rect(0, 0, 100, 100, '#F4EBD9') + lockerRow(2, 24, 7) + rect(0, 82, 100, 18, '#E6DBC6') + line(0, 82, 100, 82, OUT, 1) + P(a);
}

/* ================================================================ G2-615: laws, each being kept (0 0 140 100) */
function lawArt(id, k) {
  const sky = rect(0, 0, 140, 100, '#EEF6F8');
  if (id === 'red') {
    // a street corner: the light shows red; a car waits behind the white line; the crosswalk is empty
    const car = (x, c) => g('data-s2-drawn="stopped-car"', path(`M${x},78 L${x},68 L${x + 8},68 L${x + 14},58 L${x + 34},58 L${x + 40},68 L${x + 50},68 L${x + 50},78 Z`, c, 1.3) + orect(x + 16, 60, 9, 8, '#DDEFF5', 0.9) + orect(x + 27, 60, 9, 8, '#DDEFF5', 0.9) + circ(x + 11, 79, 5, OUT, 1) + circ(x + 39, 79, 5, OUT, 1) + circ(x + 11, 79, 2, '#C9CDD2', 0.6) + circ(x + 39, 79, 2, '#C9CDD2', 0.6));
    // a walker waits on the sidewalk by the crosswalk (the light is red for the cars: they stop)
    const walker = P({ ...k[0], age: 'adult', s: 0.42, x: 104, y: 68, look: -1 });
    return sky + rect(0, 70, 140, 30, '#7A7F86') + rect(0, 62, 140, 8, '#C8C2B6') + [0, 1, 2, 3, 4].map((q) => rect(92 + q * 9, 72, 5, 26, '#F7F7F2')).join('') + rect(84, 72, 3, 26, '#F7F7F2') + car(24, k[0].car || '#4A7BD0') + walker +
      g('data-s2-drawn="traffic-light"', line(122, 66, 122, 20, '#2F3338', 3) + orect(114, 4, 16, 40, '#2F3338', 1.2, ' rx="3"') + circ(122, 12, 5, '#E03C31', 1) + circ(122, 24, 5, '#5A5A5A', 1) + circ(122, 36, 5, '#5A5A5A', 1) + [0, 1, 2, 3, 4, 5].map((q) => { const an = q * Math.PI / 3; return line(122 + Math.cos(an) * 6.5, 12 + Math.sin(an) * 6.5, 122 + Math.cos(an) * 9, 12 + Math.sin(an) * 9, '#E03C31', 1.4); }).join(''));
  }
  if (id === 'leash') {
    // a park: a grown-up walks a dog on a leash along the path
    const o = { x: 56, y: 92, s: 0.82, ...k[0], age: 'adult', look: 1 };
    o.ra = armTo(o, 'r', 80, 66);
    const p = adult(o), hd = p.hand('r');
    const dog = g('data-s2-drawn="dog"', `<ellipse cx="104" cy="80" rx="15" ry="7" fill="#B07A4E" stroke="${OUT}" stroke-width="1.2"/>` + circ(118, 72, 6.5, '#B07A4E', 1.2) + path('M121,67 L126,62 L124,70 Z', '#7A5230', 1) + circ(120.5, 71, 1, OUT, 0.5) + circ(124, 74, 1.1, OUT, 0.5) + [92, 98, 110, 115].map((x) => line(x, 85, x, 93, OUT, 2.4)).join('') + path('M89,77 Q82,72 84,66', 'none', 2) + path('M111,70.4 L114.4,69.4 L116.8,78.2 L113.4,79.2 Z', '#D9534F', 0.8));
    return sky + rect(0, 70, 140, 30, '#9CCB7C') + path('M0,92 Q70,78 140,88 L140,100 L0,100 Z', '#E6DBC6', 1) + treeR(18, 74, 50) + treeR(128, 64, 40) + dog + p.svg + g('data-s2-drawn="leash"', `<path d="M${f1(hd[0])},${f1(hd[1])} Q98,62 114,73" fill="none" stroke="#D9534F" stroke-width="1.8"/>`);
  }
  if (id === 'litter') {
    // a child drops a wrapper INTO the trash can
    const o = { x: 54, y: 94, s: 1.0, ...k[0] }; o.ra = armTo(o, 'r', 86, 52);
    const can = g('data-s2-drawn="trash-can"', path('M78,58 L106,58 L102,94 L82,94 Z', '#3F8F5A', 1.4) + orect(75, 54, 34, 5, '#3F8F5A', 1.2) + [86, 92, 98].map((x) => line(x, 62, x - 0.5, 90, '#2E6B45', 1.2)).join(''));
    return sky + rect(0, 84, 140, 16, '#9CCB7C') + treeR(122, 86, 52) + can + kid(o).svg + g('data-s2-drawn="wrapper"', path('M88,50 L95,48 L96,53 L89,55 Z', '#D9534F', 1)) + `<path d="M92,57 L92,62" stroke="${OUT}" stroke-width="1" stroke-dasharray="1.5 1.5"/>`;
  }
  // helmet: a child stands by a bike, a helmet on the head, a hand on the handlebar
  const o = { x: 44, y: 94, s: 1.0, ...k[0], hair: k[0].hair === 'hijab' ? 'hijab' : 'short' }; o.ra = armTo(o, 'r', 74, 60);
  const p = kid(o), hd = p.head();
  const bike = g('data-s2-drawn="bike"', [62, 112].map((x) => circ(x, 80, 13, 'none', 2.2) + circ(x, 80, 2, OUT, 0.5)).join('') + `<path d="M62,80 L80,62 L104,62 L112,80 M80,62 L88,80 L104,62 M88,80 L62,80 M78,58 L84,58 M104,62 L101,52 L108,51" fill="none" stroke="#D9534F" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`);
  const helmet = g('data-s2-drawn="helmet"', `<path d="M${f1(hd.x - hd.r * 1.12)},${f1(hd.y - hd.r * 0.05)} Q${f1(hd.x - hd.r * 1.2)},${f1(hd.y - hd.r * 1.45)} ${f1(hd.x)},${f1(hd.y - hd.r * 1.4)} Q${f1(hd.x + hd.r * 1.2)},${f1(hd.y - hd.r * 1.45)} ${f1(hd.x + hd.r * 1.12)},${f1(hd.y - hd.r * 0.05)} Z" fill="#4A7BD0" stroke="${OUT}" stroke-width="1.3"/>` + [-0.45, 0, 0.45].map((q) => `<path d="M${f1(hd.x + q * hd.r)},${f1(hd.y - hd.r * 1.25)} L${f1(hd.x + q * hd.r * 1.1)},${f1(hd.y - hd.r * 0.55)}" stroke="#2E4A7A" stroke-width="1.6"/>`).join('') + `<path d="M${f1(hd.x - hd.r * 0.95)},${f1(hd.y)} L${f1(hd.x - hd.r * 0.3)},${f1(hd.y + hd.r * 0.95)} L${f1(hd.x + hd.r * 0.3)},${f1(hd.y + hd.r * 0.95)} L${f1(hd.x + hd.r * 0.95)},${f1(hd.y)}" fill="none" stroke="${OUT}" stroke-width="1"/>`);
  return sky + rect(0, 90, 140, 10, '#B9B4AC') + bike + p.svg + helmet;
}

/* ================================================================ G2-616: leaders by role (0 0 100 100) */
/** one leader at a lectern: a grown-up in a jacket (a role, never a person's likeness), a small flag on a pole beside the
 *  lectern (review round 1, row 7: the S1 figure with puffs or a cap read as a child giving a speech) */
function leaderOne(look) {
  // 2026-11-25 picture fix: the leader stands BEHIND the lectern, feet above its foot (at y 99 the shoes showed under it)
  const o = grownUp(look, { s: 0.82, x: 44, y: 94, look: 0, la: [-6, 8, -2, 18], ra: [6, 8, 2, 18], tie: look.sex !== 'f' });
  return rect(0, 0, 100, 100, '#EAF2EE') + rect(0, 86, 100, 14, '#E6DBC6') + line(0, 86, 100, 86, OUT, 1) + flagPole(80, 96, 62, 17) + o.svg +
    g('data-s2-drawn="lectern"', path('M28,62 L60,62 L56,96 L32,96 Z', '#8B5E3C', 1.6) + orect(24, 58, 40, 6, '#B07A4E', 1.2) + line(44, 58, 41, 46, OUT, 1.2) + `<ellipse cx="40.5" cy="44.5" rx="2.2" ry="3" fill="${OUT}"/>`);
}
/** a group that makes laws together (the city council, Congress): grown-ups in jackets seated at a long desk, a flag on a
 *  pole at its end; `rows` 1 or 2 */
function leaderGroup(looks, rows) {
  let s = rect(0, 0, 100, 100, '#EAF2EE') + rect(0, 82, 100, 18, '#E6DBC6') + flagPole(86, 84, rows === 2 ? 72 : 64, 11);
  const n = looks.length / rows;
  for (let r = 0; r < rows; r++) {
    const y = rows === 2 ? (r === 0 ? 64 : 90) : 88, sc = rows === 2 ? (r === 0 ? 0.44 : 0.52) : 0.6;
    const xs = Array.from({ length: n }, (_, q) => 11 + q * (60 / (n - 1)));
    // 2026-11-25 picture fix: the members stand behind the desk, feet 2 units above its foot (at its foot the shoes showed a sliver)
    s += xs.map((x, q) => grownUp(looks[r * n + q], { s: sc, x, y: y - 2, look: 0, la: [-4, 6, 2, 13], ra: [4, 6, -2, 13], tie: looks[r * n + q].sex !== 'f' }).svg).join('');
    s += g('data-s2-drawn="long-desk"', orect(1, y - (rows === 2 ? 22 : 30), 80, rows === 2 ? 9 : 12, '#B07A4E', 1.2) + orect(3, y - (rows === 2 ? 13 : 18), 76, rows === 2 ? 13 : 18, '#8B5E3C', 1.1));
  }
  return s;
}
const stateIcon = (w, h) => A1.stateCloseup(w, h);
const townIcon = () => A1.townArt();

module.exports.__part1 = { S2_SCENE, PAL2, C, bubble, signText, sign, house, treeR, cloud, star, at, us48, usCountry, worldMap, ruleArt, lawArt, leaderOne, leaderGroup, stateIcon, townIcon, kid, adult, grownUp, flagPole };

/* ================================================================ G2-617: the town and its places */
/**
 * one place of the town, drawn in its own lot (x, y, w, h; the ground at y + h). Each is a group the gate can find:
 * data-s2-place (the place) and data-dk-answer (service | business, never printed).
 */
function placeArt(id, x, y, w, h, k, kind, u = h) {
  // u: the town's one unit for people (review round 1: people were sized by their own lot, so a child by a top lot stood
  // taller than a grown-up by a bottom lot): a grown-up 0.45 u tall, a child 0.33 u, everywhere in the town
  const gy = y + h, cx = x + w / 2;
  const open = `<g data-s2-place="${id}" data-dk-answer="${kind}">`;
  const sz = Math.max(9.5, Math.min(12, w * 0.1));
  let s = '';
  if (id === 'library') {
    const bw = w * 0.86, bx = cx - bw / 2, top = gy - h * 0.62;
    s += orect(bx, top, bw, gy - top - 6, '#E9E2D0', 1.4) + path(`M${f1(bx - 4)},${f1(top + 1)} L${f1(cx)},${f1(top - h * 0.2)} L${f1(bx + bw + 4)},${f1(top + 1)} Z`, '#C9B98E', 1.4) +
      [0.12, 0.32, 0.68, 0.88].map((t) => orect(bx + bw * t - 3, top + 14, 6, gy - top - 22, '#FFFFFF', 1)).join('') + orect(cx - 7, gy - 22, 14, 16, '#8B5E3C', 1.1) + orect(bx - 4, gy - 8, bw + 8, 4, '#D8D3C8', 1) + orect(bx - 8, gy - 4, bw + 16, 4, '#D8D3C8', 1) +
      sign(cx - w * 0.36, top + 2, w * 0.72, sz + 4, 'LIBRARY', sz);
  } else if (id === 'fire') {
    const bw = w * 0.86, bx = cx - bw / 2, top = gy - h * 0.72;
    s += orect(bx, top, bw, gy - top, '#C96B4B', 1.4) + orect(bx - 3, top - 5, bw + 6, 6, '#A8483A', 1.2) + orect(bx + bw * 0.12, gy - h * 0.46, bw * 0.76, h * 0.46, '#5A5A5A', 1.2) +
      g('data-s2-drawn="fire-truck"', orect(bx + bw * 0.16, gy - h * 0.36, bw * 0.68, h * 0.3, '#D9534F', 1.2) + orect(bx + bw * 0.24, gy - h * 0.33, bw * 0.52, h * 0.12, '#DDEFF5', 1) + circ(bx + bw * 0.3, gy - h * 0.05, 3.2, OUT, 0.6) + circ(bx + bw * 0.7, gy - h * 0.05, 3.2, OUT, 0.6) + orect(bx + bw * 0.4, gy - h * 0.39, bw * 0.2, 3, '#F4C542', 0.8)) +
      sign(cx - w * 0.43, top + 4, w * 0.86, sz + 4, 'FIRE STATION', sz);
  } else if (id === 'school') {
    const bw = w * 0.82, bx = cx - bw / 2 - 4, top = gy - h * 0.6;
    s += orect(bx, top, bw, gy - top, '#C96B4B', 1.4) + path(`M${f1(bx - 4)},${f1(top + 1)} L${f1(cx - 4)},${f1(top - h * 0.18)} L${f1(bx + bw + 4)},${f1(top + 1)} Z`, '#A8483A', 1.3) +
      [0.1, 0.3, 0.6, 0.8].map((t) => orect(bx + bw * t, top + h * 0.22, bw * 0.12, h * 0.13, '#DDEFF5', 0.9)).join('') + orect(cx - 10, gy - h * 0.24, 12, h * 0.24, '#8B5E3C', 1) +
      g('data-s2-drawn="flagpole"', line(x + w - 4, gy, x + w - 4, top - h * 0.16, '#5A5A5A', 1.4) + rect(x + w - 15, top - h * 0.16, 11, 7, '#B22234') + rect(x + w - 15, top - h * 0.16 + 2.3, 11, 1.2, '#FFFFFF') + rect(x + w - 15, top - h * 0.16, 4.5, 3.4, '#3C3B6E')) +
      sign(cx - w * 0.3 - 4, top + 3, w * 0.6, sz + 4, 'SCHOOL', sz);
  } else if (id === 'toys' || id === 'pizza') {
    const bw = w * 0.86, bx = cx - bw / 2, top = gy - h * 0.66, aw = id === 'toys' ? '#4A7BD0' : '#3F9B4B';
    s += orect(bx, top, bw, gy - top, id === 'toys' ? '#F7EEDD' : '#F4EBD9', 1.4) + Array.from({ length: 6 }, (_, q) => path(`M${f1(bx + q * bw / 6)},${f1(top + 16)} L${f1(bx + (q + 1) * bw / 6)},${f1(top + 16)} L${f1(bx + (q + 1) * bw / 6)},${f1(top + 26)} Q${f1(bx + (q + 0.5) * bw / 6)},${f1(top + 31)} ${f1(bx + q * bw / 6)},${f1(top + 26)} Z`, q % 2 ? '#FFFFFF' : aw, 1)).join('') +
      orect(bx + bw * 0.08, top + 34, bw * 0.5, gy - top - 40, '#DDEFF5', 1.1) + orect(bx + bw * 0.66, top + 34, bw * 0.24, gy - top - 34, '#8B5E3C', 1.1) +
      (id === 'toys' ? g('data-s2-drawn="teddy-bear"', circ(bx + bw * 0.24, gy - 14, 6, '#B07A4E', 1) + circ(bx + bw * 0.24, gy - 23, 5, '#B07A4E', 1) + circ(bx + bw * 0.2, gy - 27, 2, '#B07A4E', 0.8) + circ(bx + bw * 0.28, gy - 27, 2, '#B07A4E', 0.8)) + circ(bx + bw * 0.44, gy - 13, 6, '#E4574B', 1)
        : g('data-s2-drawn="pizza"', path(`M${f1(bx + bw * 0.14)},${f1(gy - 24)} L${f1(bx + bw * 0.5)},${f1(gy - 24)} L${f1(bx + bw * 0.32)},${f1(gy - 8)} Z`, '#F4C542', 1.1) + circ(bx + bw * 0.27, gy - 20, 2, '#D9534F', 0.6) + circ(bx + bw * 0.37, gy - 19, 2, '#D9534F', 0.6) + circ(bx + bw * 0.32, gy - 14, 1.8, '#D9534F', 0.6))) +
      sign(cx - w * 0.38, top + 1, w * 0.76, sz + 4, id === 'toys' ? 'TOY STORE' : 'PIZZA', sz);
  } else if (id === 'park') {
    // the PARK sign on its own post down to the ground (review round 1, row 13: at level 1 the sign floated over a short post)
    const signY = gy - h * 0.72, postTop = signY + sz + 4;
    s += rect(x + 2, gy - h * 0.3, w - 4, h * 0.3, '#9CCB7C') + line(x + w * 0.62, postTop, x + w * 0.62, gy - 2, OUT, 1.6) + treeR(x + w * 0.2, gy - 4, Math.min(h * 0.62, w * 0.5)) + treeR(x + w * 0.82, gy - 6, Math.min(h * 0.5, w * 0.4)) +
      g('data-s2-drawn="slide"', path(`M${f1(x + w * 0.5)},${f1(gy - h * 0.42)} L${f1(x + w * 0.7)},${f1(gy - 4)} L${f1(x + w * 0.74)},${f1(gy - 4)} L${f1(x + w * 0.54)},${f1(gy - h * 0.42)} Z`, '#F39C40', 1) + line(x + w * 0.48, gy - h * 0.42, x + w * 0.48, gy - 2, OUT, 1.6) + line(x + w * 0.53, gy - h * 0.42, x + w * 0.53, gy - 2, OUT, 1.6)) +
      g('data-s2-drawn="bench"', orect(x + w * 0.3, gy - 12, w * 0.16, 3, '#B07A4E', 0.9) + line(x + w * 0.32, gy - 9, x + w * 0.32, gy - 3, OUT, 1.2) + line(x + w * 0.44, gy - 9, x + w * 0.44, gy - 3, OUT, 1.2)) +
      sign(x + w * 0.48, signY, w * 0.3, sz + 4, 'PARK', sz);
  } else if (id === 'mail') {
    s += house(x + w * 0.1, gy - h * 0.42, w * 0.44, h * 0.42, '#F7C948', '#8C8C8C') + g('data-s2-drawn="mailbox"', line(x + w * 0.72, gy, x + w * 0.72, gy - u * 0.22, OUT, 1.6) + orect(x + w * 0.72 - u * 0.09, gy - u * 0.32, u * 0.18, u * 0.1, '#3F6FD1', 1));
    const o = { ...k, age: 'adult', s: Math.min(u * 0.0045, w / 190), x: x + w * 0.88, y: gy - 1, top: '#3F5372', bottom: 'pants', bottomColor: 'navy', hair: k.sex === 'f' ? 'bun' : 'cap', look: -1 };
    o.la = armTo(o, 'l', x + w * 0.72 + u * 0.08, gy - u * 0.29);
    const p = adult(o), hd = p.hand('l');
    s += g('data-s2-drawn="mail-carrier"', g('data-s2-drawn="mail-bag"', orect(o.x + u * 0.02, gy - u * 0.27, u * 0.1, u * 0.12, '#8B5E3C', 1)) + p.svg + orect(hd[0] - 3, hd[1] - 5, 7, 5, '#FFFFFF', 0.8));
  } else if (id === 'road') {
    // road work in the street: a worker in a hard hat and a vest with a shovel at a patch of new asphalt, two cones, the
    // orange diamond sign on a short post; all of it inside the street (one circle takes it in, never a lot beside it)
    s += orect(x + w * 0.12, gy - h * 0.3, w * 0.42, h * 0.22, '#4A4A4A', 1) + [0.04, 0.58].map((t) => path(`M${f1(x + w * t)},${f1(gy - 3)} L${f1(x + w * t + 5)},${f1(gy - 19)} L${f1(x + w * t + 10)},${f1(gy - 3)} Z`, '#F08A24', 1) + rect(x + w * t + 3, gy - 11, 4, 2.5, '#FFFFFF')).join('');
    const o = { ...k, age: 'adult', s: u * 0.0045, x: x + w * 0.4, y: gy - 4, top: '#F39C40', hair: 'short', look: 1 };
    o.ra = armTo(o, 'r', x + w * 0.52, gy - h * 0.46);
    const p = adult(o), hd = p.head(), hand = p.hand('r');
    s += p.svg + g('data-s2-drawn="hard-hat"', `<path d="M${f1(hd.x - hd.r * 1.15)},${f1(hd.y - hd.r * 0.3)} Q${f1(hd.x)},${f1(hd.y - hd.r * 1.9)} ${f1(hd.x + hd.r * 1.15)},${f1(hd.y - hd.r * 0.3)} Z" fill="#F4C542" stroke="${OUT}" stroke-width="1"/>`) +
      g('data-s2-drawn="shovel"', line(hand[0], hand[1] - 4, hand[0] + 3, gy - h * 0.2, '#8B5E3C', 2) + path(`M${f1(hand[0] - 1)},${f1(gy - h * 0.22)} L${f1(hand[0] + 7)},${f1(gy - h * 0.22)} L${f1(hand[0] + 5)},${f1(gy - h * 0.1)} L${f1(hand[0] + 1)},${f1(gy - h * 0.1)} Z`, '#9AA0A6', 1));
    // the diamond is big enough for its two words (review round 1, row 12: ROAD poked out of the sign)
    const sr = Math.max(h * 0.3, 24), sx = Math.min(x + w * 0.84, x + w - sr - 2), sy = Math.max(gy - h * 0.62, y + sr + 2);
    s += g('data-s2-sign="ROAD WORK"', line(sx, gy - 2, sx, sy + sr, OUT, 1.6) + path(`M${f1(sx)},${f1(sy - sr)} L${f1(sx + sr)},${f1(sy)} L${f1(sx)},${f1(sy + sr)} L${f1(sx - sr)},${f1(sy)} Z`, '#F08A24', 1.2) + signText(sx, sy - 1.5, 'ROAD', 9.5) + signText(sx, sy + 8.5, 'WORK', 9.5));
  } else s += house(x + w * 0.2, gy - h * 0.45, w * 0.6, h * 0.45, '#F4EBD9');   // a plain house (no place to circle)
  if (k && k.skin && ['library', 'school', 'toys', 'pizza', 'park'].includes(id)) s += P({ ...k, age: id === 'library' || id === 'pizza' ? 'adult' : 'child', s: u * (id === 'library' || id === 'pizza' ? 0.0045 : 0.005), x: x + w * (id === 'park' ? 0.23 : 0.12), y: gy - 1, look: 1 });   // 2026-11-25 picture fix: the park child beside the bench (at 0.36 it stood across it)
  return open + s + '</g>';
}
/** the town picture (0 0 W H): the lots above and below the street, the road work in the street at `roadAt` (0..1) */
function serviceTown(W, H, top, bottom, roadAt, looks) {
  const streetY = H * 0.47, streetH = H * 0.2;
  let s = rect(0, 0, W, H, '#EEF6F8') + rect(0, streetY - 8, W, 8, '#C8C2B6') + rect(0, streetY, W, streetH, '#B9B4AC') + rect(0, streetY + streetH, W, 8, '#C8C2B6') + rect(0, streetY + streetH + 8, W, H, '#D6EBC8') +
    `<line x1="0" y1="${f1(streetY + streetH / 2)}" x2="${f1(W)}" y2="${f1(streetY + streetH / 2)}" stroke="#F4F1EA" stroke-width="2" stroke-dasharray="14 10"/>`;
  let li = 0;
  const u = Math.min(streetY - 18, H - streetY - streetH - 22);
  const lot = (ids, y0, h0) => ids.forEach((id, i) => { const w0 = W / ids.length; s += placeArt(id, i * w0 + 4, y0, w0 - 8, h0, looks[li++ % looks.length], id === 'toys' || id === 'pizza' ? 'business' : id === 'house' ? 'none' : 'service', u); });
  lot(top, 10, streetY - 18);
  lot(bottom, streetY + streetH + 14, H - streetY - streetH - 22);
  if (roadAt != null) s += placeArt('road', roadAt * W - 80, streetY + 2, 160, streetH - 4, looks[li++ % looks.length], 'service', u);
  return s.replace(/data-dk-answer="none"/g, 'data-s2-filler="1"');
}

/* ================================================================ G2-618: places that change (0 0 140 100) */
/** a real tree with a trunk and branches (review round 1: the pond's bare winter tree read as a slingshot): bare, or with
 *  a full crown of leaves; (x, y) the foot of the trunk, h its height in view units */
function seasonTree(x, y, h, leafy = false) {
  const u = h / 60, B = '#8B5E3C';
  const br = (x1, y1, x2, y2, w) => `<path d="M${f1(x + x1 * u)},${f1(y - y1 * u)} L${f1(x + x2 * u)},${f1(y - y2 * u)}" stroke="${OUT}" stroke-width="${f1(w * u + 2)}" stroke-linecap="round" fill="none"/><path d="M${f1(x + x1 * u)},${f1(y - y1 * u)} L${f1(x + x2 * u)},${f1(y - y2 * u)}" stroke="${B}" stroke-width="${f1(w * u)}" stroke-linecap="round" fill="none"/>`;
  let s = br(0, 26, -14, 44, 3.4) + br(0, 28, 14, 46, 3.4) + br(0, 30, 0, 52, 3) + br(0, 20, -10, 30, 2.4) + br(0, 22, 9, 32, 2.4) +
    br(-14, 44, -21, 51, 1.8) + br(-14, 44, -13, 55, 1.8) + br(14, 46, 21, 53, 1.8) + br(14, 46, 11, 57, 1.8) + br(0, 52, -4, 60, 1.6) + br(0, 52, 5, 59, 1.6) + br(-10, 30, -16, 34, 1.4) + br(9, 32, 15, 36, 1.4);
  s = path(`M${f1(x - 4.2 * u)},${f1(y)} L${f1(x - 2.6 * u)},${f1(y - 30 * u)} L${f1(x + 2.6 * u)},${f1(y - 30 * u)} L${f1(x + 4.2 * u)},${f1(y)} Z`, B, 1.2) + s;
  if (leafy) s += [[-13, 46, 11], [13, 48, 11], [0, 55, 12], [-5, 40, 10], [6, 40, 10], [-19, 36, 8], [18, 37, 8]].map(([dx, dy, r]) => circ(x + dx * u, y - dy * u, r * u, KS.leaf, 1.1)).join('') +
    [[-8, 50], [9, 52], [-15, 40], [2, 44], [15, 42]].map(([dx, dy]) => circ(x + dx * u, y - dy * u, 1.6 * u, '#3F8F5A', 0)).join('');
  return g(`data-s2-drawn="tree-${leafy ? 'leaves' : 'bare'}"`, s);
}
function changeArt(id, which) {
  const after = which === 'after';
  const skyC = '#EEF6F8';
  if (id === 'hill') {
    // review round 2 (row 18): a tree is not a place; the place is a hill, the same hill twice: snow and bare trees under a
    // grey sky, then grass and the trees in leaf. No flowers, no fence, no house: nothing on it can look planted or built.
    const hill = 'M0,100 L0,66 Q40,30 78,40 Q112,48 140,62 L140,100 Z';
    let s = rect(0, 0, 140, 100, after ? skyC : '#E8EEF2') + g('data-s2-drawn="hill"', path(hill, after ? '#9CCB7C' : '#F4F8FB', 1.2));
    if (!after) s += [[30, 62], [70, 50], [104, 58], [52, 80], [116, 78]].map(([x, y]) => `<path d="M${x},${y} l9,2" stroke="${C.iceShade}" stroke-width="2"/>`).join('');
    return s + [[34, 58, 34], [72, 46, 40], [108, 56, 32]].map(([x, y, h]) => seasonTree(x, y, h, after)).join('');
  }
  if (id === 'desert') {
    let s = rect(0, 0, 140, 100, '#F7EEDD') + K.sun(118, 18, 8) + path('M0,62 Q40,48 80,60 Q110,52 140,58 L140,100 L0,100 Z', C.dune, 1) + rect(0, 74, 140, 26, '#F1DDA6');
    const cactus = (x, y, hh) => g('data-s2-drawn="cactus"', orect(x - 4, y - hh, 8, hh, C.cactus, 1.1, ' rx="4"') + path(`M${x - 4},${y - hh * 0.5} L${x - 11},${y - hh * 0.5} L${x - 11},${y - hh * 0.75}`, 'none', 4.4).replace(`stroke="${OUT}"`, `stroke="${C.cactus}"`) + path(`M${x + 4},${y - hh * 0.6} L${x + 10},${y - hh * 0.6} L${x + 10},${y - hh * 0.85}`, 'none', 4.4).replace(`stroke="${OUT}"`, `stroke="${C.cactus}"`));
    s += cactus(36, 84, 34) + cactus(104, 88, 26) + `<ellipse cx="70" cy="90" rx="9" ry="4" fill="#9AA0A6" stroke="${OUT}" stroke-width="1"/>`;
    if (after) s += g('data-s2-drawn="desert-flowers"', [[12, 82], [22, 92], [50, 80], [58, 94], [80, 84], [88, 95], [118, 82], [128, 93], [66, 78], [44, 90], [10, 95], [96, 78]].map(([x, y], q) => line(x, y, x, y + 5, C.stem, 1.2) + circ(x, y, 3, [C.bloomRed, C.bloomYellow, C.bloomPurple][q % 3], 0.8)).join(''));
    return s;
  }
  if (id === 'pond') {
    let s = rect(0, 0, 140, 100, after ? skyC : '#E8EEF2') + rect(0, 46, 140, 54, after ? '#9CCB7C' : '#F4F8FB') + `<ellipse cx="70" cy="74" rx="52" ry="16" fill="${after ? '#7FC8E8' : C.pondIce}" stroke="${OUT}" stroke-width="1.3"/>`;
    s += after ? [[20, 66], [26, 64], [116, 66], [122, 65]].map(([x, y]) => line(x, y, x, y - 12, C.reed, 1.6)).join('') + g('data-s2-drawn="duck"', `<ellipse cx="78" cy="72" rx="7" ry="4" fill="#FFFFFF" stroke="${OUT}" stroke-width="1"/>` + circ(84, 67, 3, '#3F9B4B', 1) + path('M86.5,67 L90,68 L86.5,69 Z', '#F39C40', 0.6))
      : [[44, 72], [86, 78], [64, 68]].map(([x, y]) => `<path d="M${x},${y} l10,3" stroke="${C.iceShade}" stroke-width="2"/>`).join('');
    // the same tree in both: bare in winter, leaves in spring
    s += seasonTree(22, 52, 34, after);
    return s;
  }
  if (id === 'beach') {
    // the lighthouse on its dune: long ago a wide beach between it and the sea; today the waves have washed the sand away
    const shore = after ? 50 : 104;
    let s = rect(0, 0, 140, 100, skyC) + rect(0, 54, 140, 46, C.sea) + path(`M0,58 L${shore},58 Q${shore + 6},72 ${shore - 2},100 L0,100 Z`, '#F1DDA6', 1.2) + path('M0,58 Q20,40 44,56 L44,60 L0,60 Z', C.dune, 1.1);
    s += g('data-s2-drawn="lighthouse"', path('M18,50 L28,50 L26,22 L20,22 Z', '#FFFFFF', 1.1) + rect(19.5, 30, 7, 5, '#D9534F') + rect(19.2, 40, 7.6, 5, '#D9534F') + orect(19, 16, 8, 6, '#F4C542', 1) + path('M18,16 L23,11 L28,16 Z', '#D9534F', 1));
    s += [0, 1, 2].map((q) => `<path d="M${shore + 4 + q * 10},${64 + q * 10} q4,-3 8,0" fill="none" stroke="#FFFFFF" stroke-width="1.6"/>`).join('');
    return s;
  }
  if (id === 'village') {
    let s = rect(0, 0, 140, 100, skyC) + path('M0,40 Q30,26 60,38 Q90,24 140,36 L140,60 L0,60 Z', '#9CCB7C', 1) + rect(0, 60, 140, 40, C.sea);
    if (!after) s += house(14, 46, 16, 12, '#F7EEDD') + house(40, 44, 16, 14, '#F7C948') + house(66, 46, 14, 12, '#F4EBD9') + orect(84, 56, 30, 4, '#9C7A52', 1) + [90, 104].map((x) => line(x, 60, x, 70, OUT, 1.4)).join('') +
      [[40, 78], [94, 74]].map(([x, y]) => path(`M${x},${y} L${x + 20},${y} L${x + 16},${y + 6} L${x + 4},${y + 6} Z`, '#B07A4E', 1) + line(x + 10, y, x + 10, y - 12, OUT, 1) + path(`M${x + 10},${y - 12} L${x + 18},${y - 2} L${x + 10},${y - 2} Z`, '#FFFFFF', 0.9)).join('');
    else s += [[6, 22, 16], [24, 12, 14], [40, 24, 18], [60, 8, 16], [78, 18, 20], [100, 14, 14], [116, 26, 18]].map(([x, y, w]) => orect(x, y, w, 60 - y, [C.cityBlue, C.cityGrey, C.cityDark][x % 3], 1) + Array.from({ length: Math.floor((56 - y) / 8) }, (_, r) => [0, 1].map((c) => rect(x + 3 + c * (w / 2 - 1), y + 4 + r * 8, w / 2 - 5, 4, C.windowLit)).join('')).join('')).join('') +
      orect(70, 58, 64, 4, '#9AA0A6', 1) + g('data-s2-drawn="big-ship"', path('M20,76 L70,76 L64,88 L26,88 Z', '#D9534F', 1.2) + orect(32, 66, 26, 10, '#FFFFFF', 1) + rect(36, 69, 4, 3, '#4A7BD0') + rect(44, 69, 4, 3, '#4A7BD0') + rect(52, 69, 4, 3, '#4A7BD0'));
    return s;
  }
  if (id === 'field') {
    let s = rect(0, 0, 140, 100, skyC) + rect(0, 50, 140, 50, '#B9D98A') + treeR(112, 74, 48);
    if (!after) s += [8, 26, 44, 62, 80].map((x) => line(x, 70, x, 82, '#8B5E3C', 1.6)).join('') + line(4, 74, 84, 74, '#8B5E3C', 1.2) + line(4, 79, 84, 79, '#8B5E3C', 1.2) + path('M0,92 Q50,86 140,94', 'none', 3).replace(`stroke="${OUT}"`, 'stroke="#D9CDB4"') + [[20, 60], [50, 58], [70, 62]].map(([x, y]) => `<path d="M${x},${y} l3,-5 l3,5" fill="none" stroke="#3F9B4B" stroke-width="1.2"/>`).join('');
    else s += rect(0, 84, 140, 12, '#B9B4AC') + rect(0, 80, 140, 4, '#C8C2B6') + house(6, 62, 20, 18, '#F7EEDD') + house(34, 60, 20, 20, '#7EC8E3') + house(62, 62, 20, 18, '#F7C948') + `<line x1="0" y1="90" x2="140" y2="90" stroke="#F4F1EA" stroke-width="1.4" stroke-dasharray="8 6"/>`;
    return s;
  }
  // garden: an empty lot behind a fence; in summer the neighbors' garden beds, sunflowers and tomatoes
  let s = rect(0, 0, 140, 100, skyC) + rect(0, 56, 140, 44, '#C9A66B') + house(110, 40, 26, 22, '#F4EBD9');
  s += Array.from({ length: 15 }, (_, q) => line(4 + q * 7, 58, 4 + q * 7, 44, '#9AA0A6', 1.2)).join('') + line(2, 46, 104, 46, '#9AA0A6', 1.2) + line(2, 52, 104, 52, '#9AA0A6', 1);
  if (!after) s += [[20, 80], [56, 72], [84, 88], [36, 92]].map(([x, y]) => `<path d="M${x},${y} l-3,-6 M${x},${y} l0,-7 M${x},${y} l3,-6" stroke="#7A9E4A" stroke-width="1.3"/>`).join('');
  else s += g('data-s2-drawn="garden-beds"', [[10, 70], [56, 70], [10, 86], [56, 86]].map(([x, y]) => orect(x, y, 40, 10, '#8B5E3C', 1) + [0, 1, 2, 3].map((q) => circ(x + 6 + q * 9, y - 1, 3.2, q % 2 ? '#3F9B4B' : '#6BB36B', 0.8) + (q % 2 ? circ(x + 6 + q * 9, y + 1, 1.6, '#E4574B', 0.5) : '')).join('')).join('') + [100, 108].map((x) => line(x, 92, x, 64, C.stem, 1.6) + circ(x, 62, 4.5, '#F4C542', 1) + circ(x, 62, 2, '#8B5E3C', 0.6)).join(''));
  return s;
}

/* ================================================================ G2-619: a town before and after a flood (0 0 300 150) */
/** the same town twice. Before: grey clouds, the road, two houses with sandbags along their fronts (neighbors got ready),
 *  the neighbors on the porch, the school. After: ONLY three things are different (each a data-s2-change): water over
 *  the road, a CLOSED sign on the school door, helpers in a boat on the water. */
function floodArt(state, k, H = 150) {
  // H: the picture's height in view units (150; level 1 is a little taller: more grass at the bottom, review round 2)
  const after = state === 'after';
  let s = rect(0, 0, 300, H, '#E8EEF2') + cloud(30, 22, 1.1, C.cloudGrey) + cloud(130, 16, 1.3, C.cloudGrey) + cloud(230, 24, 1.1, C.cloudGrey) + rect(0, 96, 300, H - 96, '#9CCB7C') + rect(0, 106, 300, 22, '#7A7F86') + `<line x1="0" y1="117" x2="300" y2="117" stroke="#F2B233" stroke-width="1.6" stroke-dasharray="10 8"/>`;
  // the school (left), two houses (right) with sandbags, the neighbors on the porch steps
  s += g('data-s2-drawn="school"', orect(16, 50, 92, 48, '#C96B4B', 1.4) + path('M12,52 L62,32 L112,52 Z', '#A8483A', 1.3) + [24, 40, 76, 92].map((x) => orect(x, 60, 10, 10, '#DDEFF5', 0.9)).join('') + orect(54, 70, 16, 28, '#8B5E3C', 1.1) + sign(34, 37, 56, 13, 'SCHOOL', 9.5) +
    line(118, 98, 118, 46, '#5A5A5A', 1.3) + rect(118, 46, 12, 8, '#B22234') + rect(118, 48.5, 12, 1.4, '#FFFFFF') + rect(118, 51.2, 12, 1.4, '#FFFFFF') + rect(118, 46, 5, 4, '#3C3B6E'));
  const hs = (x, c) => house(x, 66, 46, 32, c, '#8C8C8C') + g('data-s2-drawn="sandbags"', [0, 1, 2, 3, 4].map((q) => `<ellipse cx="${f1(x + 5 + q * 9)}" cy="98" rx="5.2" ry="3.4" fill="${C.sandbag}" stroke="${OUT}" stroke-width="0.9"/>`).join('') + [0, 1, 2, 3].map((q) => `<ellipse cx="${f1(x + 9.5 + q * 9)}" cy="93.6" rx="5.2" ry="3.4" fill="${C.sandbag}" stroke="${OUT}" stroke-width="0.9"/>`).join(''));
  s += hs(170, '#F7EEDD') + hs(236, '#F7C948');
  s += [P({ ...k[0], age: 'adult', s: 0.3, x: 162, y: 98, look: -1 }), P({ ...k[1], age: 'child', s: 0.34, x: 290, y: 98, look: -1 })].join('');
  if (after) {
    s += g('data-s2-change="road-water" data-dk-answer="change"', path('M0,102 Q40,99 80,102 Q120,105 160,102 Q200,99 240,102 Q270,104 300,101 L300,132 Q260,135 220,132 Q180,129 140,132 Q100,135 60,132 Q30,129 0,132 Z', C.floodWater, 1.1, ' fill-opacity="0.82"') + [20, 90, 170, 250].map((x) => `<path d="M${x},112 q6,-3 12,0 q6,3 12,0" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>`).join(''));
    s += g('data-s2-change="school-closed" data-dk-answer="change"', orect(39, 72, 46, 14, '#FFFFFF', 1.2) + signText(62, 82.6, 'CLOSED', 10, '#D9534F'));
    // review round 1 (row 19): the two helpers SIT in the boat (their hips at its rim, their legs behind its side) in life
    // vests, so the boat and its helpers are one thing to circle
    const h1 = grownUp(k[2], { s: 0.27, x: 128, y: 108 + BODY.adult.hipY * 0.27, lifeVest: true, shirtTop: '#4A7BD0', ll: [-1, 5, -1.5, 9], rl: [1, 5, 1.5, 9] }), h2 = grownUp(k[3], { s: 0.27, x: 148, y: 108 + BODY.adult.hipY * 0.27, lifeVest: true, shirtTop: '#6BB36B', ll: [-1, 5, -1.5, 9], rl: [1, 5, 1.5, 9] });
    s += g('data-s2-change="boat-helpers" data-dk-answer="change"', h1.svg + h2.svg + g('data-s2-drawn="boat"', path('M112,110 L164,110 L158,121 L118,121 Z', '#F4F8FB', 1.2)) + line(116, 115, 160, 115, '#D9534F', 1.4));
  }
  return s;
}
/** the things of an emergency kit the library has no picture of (0 0 100 100) */
function kitArt(id) {
  if (id === 'first-aid') return g('data-s2-drawn="first-aid-kit"', orect(14, 30, 72, 52, C.firstAid, 2, ' rx="7"') + path('M38,30 L38,22 Q38,18 42,18 L58,18 Q62,18 62,22 L62,30', 'none', 2.4) + rect(44, 42, 12, 30, '#FFFFFF') + rect(35, 51, 30, 12, '#FFFFFF'));
  if (id === 'batteries') return g('data-s2-drawn="batteries"', [30, 58].map((x) => orect(x, 30, 18, 52, C.battery, 1.6, ' rx="3"') + orect(x + 5, 24, 8, 7, C.batteryTop, 1.2) + rect(x + 2, 34, 14, 14, '#F4C542') + signText(x + 9, 70, '+', 14, '#FFFFFF')).join(''));
  return g('data-s2-drawn="radio"', line(70, 34, 84, 10, OUT, 2) + circ(84, 10, 2.6, OUT, 1) + orect(12, 34, 76, 46, C.radioBody, 2, ' rx="6"') + circ(34, 57, 14, '#3A3530', 1.4) + [0, 1, 2].map((q) => circ(34, 57, 4 + q * 4, 'none', 1).replace(`stroke="${OUT}"`, 'stroke="#8C8C8C"')).join('') + orect(56, 46, 24, 10, '#E8EEF2', 1.2) + line(64, 46, 64, 56, '#D9534F', 1.2) + circ(68, 68, 4, '#9AA0A6', 1));
}

/* ================================================================ G2-620: the winter tradition symbols (0 0 100 100) */
const flame = (x, y, s = 1) => `<path d="M${f1(x)},${f1(y)} q${f1(-3 * s)},${f1(-4 * s)} 0,${f1(-9 * s)} q${f1(3 * s)},${f1(5 * s)} 0,${f1(9 * s)} Z" fill="#F7A21B" stroke="${OUT}" stroke-width="0.8"/><path d="M${f1(x)},${f1(y - 1)} q${f1(-1.4 * s)},${f1(-2 * s)} 0,${f1(-4.5 * s)} q${f1(1.4 * s)},${f1(2.4 * s)} 0,${f1(4.5 * s)} Z" fill="#FFE27A"/>`;
/** a Hanukkah menorah: NINE branches, four on each side and the helper candle (the shammash) in the middle, set higher;
 *  every candle lit (the eighth night) */
function menorahArt() {
  const cups = [8, 18, 28, 38, 50, 62, 72, 82, 92], cy = (x) => (x === 50 ? 30 : 40);
  let s = path('M38,90 L62,90 L58,84 L42,84 Z', C.menorahGold, 1.2) + line(50, 84, 50, cy(50) + 2, C.menorahGold, 3);
  s += cups.filter((x) => x !== 50).map((x) => `<path d="M${x},${cy(x) + 2} Q${x},70 50,70" fill="none" stroke="${C.menorahGold}" stroke-width="2.6"/>`).join('');
  s += cups.map((x) => orect(x - 3.5, cy(x) - 1, 7, 4, C.menorahGold, 0.9) + orect(x - 1.8, cy(x) - 15, 3.6, 14, C.candleWhite, 0.8) + flame(x, cy(x) - 16, 0.9)).join('');
  return g('data-s2-drawn="menorah" data-s2-branches="9"', s.replace(/(<path d="M\d+,\d+ Q\d+,70 50,70" fill="none") stroke="#D9A520"/g, `$1 stroke="${C.menorahGold}"`));
}
/** a kinara: SEVEN candles in a wooden holder, three red on the left, one black in the middle, three green on the right */
function kinaraArt() {
  const cols = [C.kinRed, C.kinRed, C.kinRed, C.kinBlack, C.kinGreen, C.kinGreen, C.kinGreen];
  let s = path('M6,74 L94,74 L88,86 L12,86 Z', C.kinaraWood, 1.4) + orect(44, 86, 12, 6, C.kinaraWood, 1.2) + orect(30, 92, 40, 5, C.kinaraWood, 1.2);
  s += cols.map((c, q) => { const x = 12 + q * 12.6, top = q === 3 ? 34 : 40; return orect(x - 4, 70, 8, 5, C.kinaraWood, 1) + orect(x - 3, top, 6, 70 - top, c, 1, ` data-s2-candle="${c === C.kinRed ? 'red' : c === C.kinGreen ? 'green' : 'black'}"`) + flame(x, top - 1, 0.9); }).join('');
  return g('data-s2-drawn="kinara" data-s2-candles="7"', s);
}
/** a star piñata: a round body with seven cones, each with a tassel, hanging on a rope */
function pinataArt() {
  const cols = [C.pinataPink, C.pinataBlue, C.pinataYellow, C.pinataGreen, C.pinataOrange, C.pinataPink, C.pinataBlue];
  let s = line(50, 0, 50, 26, '#8B5E3C', 1.8);
  s += cols.map((c, q) => { const a = -Math.PI / 2 + (q + 0.5) * 2 * Math.PI / 7, bx = 50 + Math.cos(a) * 16, by = 56 + Math.sin(a) * 16, tx = 50 + Math.cos(a) * 42, ty = 56 + Math.sin(a) * 42, nx = -Math.sin(a) * 7, ny = Math.cos(a) * 7;
    return path(`M${f1(bx + nx)},${f1(by + ny)} L${f1(tx)},${f1(ty)} L${f1(bx - nx)},${f1(by - ny)} Z`, c, 1.2) + [-1, 0, 1].map((t) => line(tx, ty, tx + Math.cos(a) * 6 + t * 2.4, ty + Math.sin(a) * 6 + 5, cols[(q + 2) % 7], 1.6)).join(''); }).join('');
  s += circ(50, 56, 19, C.pinataYellow, 1.4) + [0, 1, 2].map((q) => `<path d="M${33 + q * 2},${50 + q * 6} Q50,${46 + q * 6} ${67 - q * 2},${50 + q * 6}" fill="none" stroke="${C.pinataPink}" stroke-width="2.4"/>`).join('');
  return g('data-s2-drawn="pinata"', s);
}
/** a red envelope (hong bao): red, a gold border and a gold round seal, nothing written */
const envelopeArt = () => g('data-s2-drawn="red-envelope"', orect(26, 12, 48, 78, '#D7262E', 1.6, ' rx="3"') + orect(30, 16, 40, 70, 'none', 1).replace(`stroke="${OUT}"`, `stroke="${C.foil}"`) + path('M26,14 L50,40 L74,14', 'none', 1.4) + circ(50, 44, 9, C.foil, 1.1) + circ(50, 44, 5, '#D7262E', 0.8) + circ(50, 44, 2.4, C.foil, 0.6));
const traditionArt = (sym) => (sym === 'menorah' ? menorahArt() : sym === 'kinara' ? kinaraArt() : sym === 'pinata' ? pinataArt() : envelopeArt());

/* ================================================================ G2-621 / G2-622: goods the library has no picture of (0 0 100 100) */
function goodArt(id) {
  if (id === 'coffee') return g('data-s2-drawn="coffee-beans"', path('M22,40 Q20,86 30,92 L70,92 Q80,86 78,40 Z', C.burlap, 1.6) + path('M20,40 Q50,30 80,40 Q50,50 20,40 Z', C.burlapDark, 1.4) + [[36, 38], [46, 34], [56, 36], [64, 40], [42, 42], [52, 41], [30, 41]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.4" fill="${C.coffeeBean}" stroke="${OUT}" stroke-width="0.8"/><path d="M${x - 3},${y} Q${x},${y - 1.5} ${x + 3},${y}" fill="none" stroke="#2B2522" stroke-width="0.7"/>`).join('') + [[18, 94], [84, 94], [12, 88]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.4" fill="${C.coffeeBean}" stroke="${OUT}" stroke-width="0.8"/>`).join(''));
  if (id === 'cocoa') return g('data-s2-drawn="cocoa-pod"', `<ellipse cx="44" cy="46" rx="20" ry="34" fill="${C.cocoaPod}" stroke="${OUT}" stroke-width="1.6" transform="rotate(-24 44 46)"/>` + [-12, -4, 4, 12].map((d) => `<path d="M${44 + d},16 Q${44 + d * 1.6},46 ${44 + d},76" fill="none" stroke="${C.cocoaPodDark}" stroke-width="1.2" transform="rotate(-24 44 46)"/>`).join('') + [[66, 80], [78, 74], [72, 90], [84, 86], [60, 92]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="4" fill="${C.cocoaBean}" stroke="${OUT}" stroke-width="0.9"/>`).join(''));
  if (id === 'soybeans') return g('data-s2-drawn="soybeans"', path('M14,38 Q40,22 66,34 Q72,44 62,50 Q40,56 18,48 Q10,44 14,38 Z', C.soyPod, 1.5) + [26, 40, 54].map((x) => `<ellipse cx="${x}" cy="40" rx="6" ry="5" fill="${C.soyBean}" stroke="${OUT}" stroke-width="0.9"/>`).join('') + line(66, 34, 76, 26, C.stem, 1.6) + [[30, 76], [44, 82], [58, 74], [70, 84], [38, 90], [52, 92]].map(([x, y]) => circ(x, y, 5.2, C.soyBean, 0.9)).join(''));
  if (id === 'sugar') return g('data-s2-drawn="sugar-bag"', path('M24,24 L76,24 L80,92 L20,92 Z', C.sugarBag, 1.6) + path('M24,24 L30,14 L70,14 L76,24', 'none', 1.4) + orect(28, 46, 44, 18, '#4A7BD0', 1.1) + signText(50, 59, 'SUGAR', 10, '#FFFFFF'));
  if (id === 'cups') return g('data-s2-drawn="paper-cups"', [0, 1, 2].map((q) => path(`M${30},${30 + q * 9} L70,${30 + q * 9} L64,${66 + q * 9} L36,${66 + q * 9} Z`, q === 2 ? C.cupRed : '#E8EEF2', 1.3)).join('') + signText(50, 94, '10', 10, OUT));
  if (id === 'sign') return g('data-s2-drawn="poster-paper"', orect(16, 18, 60, 74, C.posterWhite, 1.6) + path('M76,18 L86,28 L86,92 L76,92 Z', '#E8EEF2', 1.2) + line(82, 40, 64, 76, C.marker, 4) + path('M64,76 L61,82 L66,79 Z', OUT, 0.8));
  if (id === 'shovel') return g('data-s2-drawn="shovel"', line(50, 8, 50, 62, '#8B5E3C', 5) + orect(42, 4, 16, 6, '#8B5E3C', 1.2) + path('M36,60 L64,60 L62,86 Q50,96 38,86 Z', '#9AA0A6', 1.6));
  if (id === 'wheelbarrow') return g('data-s2-drawn="wheelbarrow"', path('M14,40 L74,40 L64,66 L24,66 Z', '#4A7BD0', 1.6) + line(70, 44, 94, 58, '#8B5E3C', 3.4) + line(24, 66, 18, 84, OUT, 2.4) + line(56, 66, 50, 80, OUT, 1.6) + circ(46, 82, 10, '#3A3530', 1.4) + circ(46, 82, 3, '#C9CDD2', 1));
  // market goods
  if (id === 'bookmark') return g('data-s2-drawn="bookmark"', orect(36, 6, 28, 78, C.bookmarkTeal, 1.6, ' rx="2"') + star(50, 30, 9, '#F7C948', 1) + circ(50, 76, 3, '#FFFFFF', 1) + line(50, 79, 46, 96, '#D9534F', 1.6) + line(50, 79, 54, 96, '#D9534F', 1.6));
  if (id === 'flower') return g('data-s2-drawn="paper-flower"', line(50, 50, 50, 96, C.stem, 3) + path('M50,78 Q62,66 70,72 Q62,80 50,80 Z', '#6BB36B', 1) + [0, 1, 2, 3, 4, 5].map((q) => { const a = q * Math.PI / 3; return `<ellipse cx="${f1(50 + Math.cos(a) * 14)}" cy="${f1(36 + Math.sin(a) * 14)}" rx="10" ry="7" fill="${C.flowerPink}" stroke="${OUT}" stroke-width="1.1" transform="rotate(${f1(q * 60)} ${f1(50 + Math.cos(a) * 14)} ${f1(36 + Math.sin(a) * 14)})"/>`; }).join('') + circ(50, 36, 8, '#F4C542', 1.1));
  if (id === 'card') return g('data-s2-drawn="card"', path('M20,24 L58,14 L58,86 L20,96 Z', '#FFFFFF', 1.4) + path('M58,14 L84,24 L84,96 L58,86 Z', C.cardYellow, 1.4) + `<path d="M71,46 C66,38 58,44 64,52 L71,60 L78,52 C84,44 76,38 71,46 Z" fill="#E4574B" stroke="${OUT}" stroke-width="1"/>`);
  // a drawing made to order: a picture of a house and the sun on paper
  return g('data-s2-drawn="drawing"', orect(10, 16, 80, 70, '#FFFFFF', 1.6) + house(30, 52, 28, 22, '#F7C948', '#D9534F') + K.sun(72, 32, 6) + line(14, 80, 86, 80, '#6BB36B', 2));
}

/* ================================================================ G2-623: the islands (0 0 W H) */
/** one island at (cx, cy): its land and the thing it makes, a person on it and a thought bubble with what it needs */
function islandArt(isl, cx, cy, look, opts = {}) {
  const sunny = isl.id === 'sunny', cold = isl.id === 'cold', sc = opts.scale || 1;
  let s = `<g data-s2-island="${isl.id}"${sc !== 1 ? ` transform="translate(${f1(cx * (1 - sc))} ${f1(cy * (1 - sc))}) scale(${sc})"` : ''}>`;
  s += `<ellipse cx="${f1(cx)}" cy="${f1(cy + 6)}" rx="96" ry="34" fill="${cold ? C.snowIsland : C.islandSand}" stroke="${OUT}" stroke-width="1.6"/>`;
  if (sunny) s += `<ellipse cx="${f1(cx)}" cy="${f1(cy + 2)}" rx="76" ry="24" fill="${C.islandGreen}" stroke="${OUT}" stroke-width="1.2"/>` + K.sun(cx + 70, cy - 74, 9) +
    g('data-s2-drawn="fruit-trees"', [-46, 46].map((d) => line(cx + d, cy + 6, cx + d, cy - 26, '#8B5E3C', 3.4) + circ(cx + d, cy - 34, 14, KS.leaf, 1.2) + [[-5, -36], [5, -30], [0, -40]].map(([a, b]) => circ(cx + d + a, cy + b, 3.2, C.fruitOrange, 0.8)).join('')).join(''));
  else if (cold) s += g('data-s2-drawn="snowy-pines"', [-56, -34, 50].map((d) => K.pine(cx + d, cy + 4, 46, true)).join('')) + g('data-s2-drawn="fishing-boat"', path(`M${cx + 70},${cy + 28} L${cx + 102},${cy + 28} L${cx + 96},${cy + 38} L${cx + 76},${cy + 38} Z`, '#B07A4E', 1.2) + line(cx + 86, cy + 28, cx + 86, cy + 10, OUT, 1.2));
  else s += `<path d="M${f1(cx - 80)},${f1(cy + 10)} Q${f1(cx - 40)},${f1(cy - 44)} ${f1(cx)},${f1(cy)} Q${f1(cx + 40)},${f1(cy - 40)} ${f1(cx + 80)},${f1(cy + 10)} Z" fill="${C.islandHill}" stroke="${OUT}" stroke-width="1.3"/>` +
    g('data-s2-drawn="sheep"', [[-44, -6], [34, -4]].map(([dx, dy]) => `<ellipse cx="${f1(cx + dx)}" cy="${f1(cy + dy)}" rx="10" ry="7" fill="${C.woolCream}" stroke="${OUT}" stroke-width="1.1"/>` + circ(cx + dx + 10, cy + dy - 3, 3.6, '#3A3530', 0.8) + line(cx + dx - 5, cy + dy + 6, cx + dx - 5, cy + dy + 11, OUT, 1.6) + line(cx + dx + 5, cy + dy + 6, cx + dx + 5, cy + dy + 11, OUT, 1.6)).join(''));
  // what the island makes, in a pile by the person
  const made = isl.makes === 'fruit' ? g('data-s2-made="fruit"', path(`M${cx - 14},${cy + 14} L${cx + 14},${cy + 14} L${cx + 10},${cy + 26} L${cx - 10},${cy + 26} Z`, '#B07A4E', 1.1) + [[-8, 11], [0, 9], [8, 11], [-4, 5], [4, 5]].map(([a, b], q) => circ(cx + a, cy + b, 4.4, q % 2 ? C.fruitRed : C.fruitOrange, 0.9)).join(''))
    : isl.makes === 'fish' ? g('data-s2-made="fish"', [[-10, 12], [6, 16], [-2, 22]].map(([a, b]) => `<ellipse cx="${f1(cx + a)}" cy="${f1(cy + b)}" rx="8" ry="3.6" fill="#7FA7D9" stroke="${OUT}" stroke-width="1"/>` + path(`M${cx + a + 7},${cy + b} L${cx + a + 12},${cy + b - 3.5} L${cx + a + 12},${cy + b + 3.5} Z`, '#7FA7D9', 0.9)).join(''))
      : g('data-s2-made="wool"', [[-8, 16], [7, 18], [-1, 9]].map(([a, b], q) => yarnBall(cx + a, cy + b, 6.4, q)).join(''));
  s += made;
  const o = { ...look, age: 'adult', s: 0.52, x: cx - 26, y: cy + 22, look: 0 };
  if (cold) { o.top = '#7FA7D9'; o.la = [-4, 4, 4, 10]; o.ra = [4, 4, -4, 10]; }
  const p = adult(o), hd = p.head();
  s += p.svg;
  const need = isl.needs;
  const icon = need === 'fish' ? `<ellipse cx="0" cy="0" rx="11" ry="5" fill="#7FA7D9" stroke="${OUT}" stroke-width="1.1"/>` + path('M10,0 L17,-5 L17,5 Z', '#7FA7D9', 1) + circ(-6, -1, 1.1, OUT, 0.4)
    : need === 'wool' ? circ(0, 0, 9, C.woolCream, 1.2) + `<path d="M-8,-3 Q0,-7 8,-3 M-9,1 Q0,-3 9,1 M-8,5 Q0,1 8,5 M-3,-8 Q-6,0 -3,8 M3,-8 Q6,0 3,8" fill="none" stroke="${C.burlapDark}" stroke-width="0.9"/><path d="M7,6 Q12,10 9,14 Q6,17 12,18" fill="none" stroke="${C.burlapDark}" stroke-width="1.2"/>`
      : circ(-5, 1, 6, C.fruitOrange, 1.1) + circ(6, 0, 6, C.fruitRed, 1.1) + line(6, -6, 8, -10, C.stem, 1.2);
  s += bubble(hd.x - 80, hd.y - 66, 58, 42, hd.x - 6, hd.y - 8, true, `<g transform="translate(${f1(hd.x - 51)} ${f1(hd.y - 45)}) scale(1.45)" data-s2-needs="${need}">${icon}</g>`);
  return s + '</g>';
}

/* ================================================================ G2-624: the storytellers (0 0 100 70) */
function tellerArt(id, look) {
  // review round 1 (rows 35 and the parade note): every grown-up is drawn as a grown-up (the shared figure, s 0.62: 62 units
  // tall) and every child at s 0.6 (40 units tall), so a grown-up is half again as tall as a child on every card of the page
  const bg = rect(0, 0, 100, 70, '#F7EEDD') + rect(0, 60, 100, 10, '#E6DBC6');
  const KS_ = 0.6, AS = 0.62;
  const kid0 = (o) => kid({ ...look, s: KS_, y: 66, ...o }).svg;
  if (id === 'girl') {
    // Ava and her grandpa at the library door
    const gp = { ...look, sex: 'm', age: 'elder', s: AS, x: 42, y: 66, hair: 'short', hairColor: 'grey', top: '#7A5230', bottom: 'pants', bottomColor: 'khaki', glasses: true, look: -1 };
    return bg + g('data-s2-drawn="library-door"', orect(54, 8, 44, 52, '#E9E2D0', 1.2) + orect(67, 30, 18, 30, '#8B5E3C', 1) + sign(55, 12, 42, 12, 'LIBRARY', 9)) + P(gp) + kid0({ x: 20, look: 1 });
  }
  if (id === 'librarian') {
    // Ms. Lin behind the library desk, a badge on a lanyard, the shelves behind her
    // 2026-11-25 picture fix: the desk reaches the floor and Ms. Lin stands behind it (her shoes showed under the desk)
    const p = grownUp({ ...look, sex: 'f' }, { s: AS, x: 32, y: 65, badge: true, glasses: true, look: 1, la: [-5, 8, -3, 17], ra: [5, 8, 3, 17] });
    return bg + g('data-s2-drawn="shelf"', orect(58, 6, 38, 54, '#B07A4E', 1.2) + [12, 28, 44].map((y) => [0, 1, 2, 3, 4].map((q) => rect(61 + q * 6.6, y, 5.4, 13, ['#C0504D', '#4F81BD', '#9BBB59', '#F79646', '#8064A2'][q])).join('') + line(58, y + 13, 96, y + 13, OUT, 1)).join('')) + p.svg + g('data-s2-drawn="desk"', orect(6, 47, 52, 20, '#8B5E3C', 1.2) + orect(4, 44, 56, 4, '#B07A4E', 1));
  }
  if (id === 'boy' && look.parade) {
    // Leo sits on his dad's shoulders (his story says so), waving a little flag; dad holds his legs
    const dad = { ...look.dad, sex: 'm', age: 'adult', s: 0.46, x: 50, y: 68, look: 0, hair: 'short' };
    const dh = person(dad).head();
    const boy = { ...look, age: 'child', s: 0.4, x: 50, y: dh.y - dh.r * 0.9 + BODY.child.hipY * 0.42, look: 0, ll: [-10, 3, -12, 15], rl: [10, 3, 12, 15], la: [-6, 6, -9, 12] };
    boy.ra = armTo(boy, 'r', 64, 16);
    const bp = kid(boy), h = bp.hand('r');
    dad.la = armTo(dad, 'l', 50 - 5.5, dh.y + 6); dad.ra = armTo(dad, 'r', 50 + 5.5, dh.y + 6);
    const flag = line(h[0], h[1] + 2, h[0], h[1] - 14, OUT, 1) + rect(h[0], h[1] - 14, 10, 7, '#B22234') + rect(h[0], h[1] - 12, 10, 1.3, '#FFFFFF') + rect(h[0], h[1] - 9.4, 10, 1.3, '#FFFFFF') + rect(h[0], h[1] - 14, 4.4, 3.6, '#3C3B6E');
    return bg + g('data-s2-drawn="on-shoulders"', person(dad).svg + bp.svg) + flag;
  }
  if (id === 'drummer') {
    const p = grownUp({ ...look, sex: 'm' }, { s: AS, x: 50, y: 66, jacket: '#B5372F', la: [-4, 6, 6, 12], ra: [4, 6, -6, 12] });
    return bg + p.svg + g('data-s2-drawn="drum"', `<ellipse cx="50" cy="44" rx="16" ry="5" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.1"/>` + path('M34,44 L34,58 Q50,64 66,58 L66,44', '#D9534F', 1.1) + line(38, 50, 62, 50, '#F4C542', 1.4) + line(36, 28, 46, 40, OUT, 1.4) + line(64, 28, 54, 40, OUT, 1.4));
  }
  if (id === 'park worker') {
    // Ms. Cole in a work vest and cap, a wrench in her hand, the new swings behind her
    // review round 2 (row 39): her hair shows under the cap (a ponytail out at the back and locks at her ears), so she
    // reads as a woman at print size; the vest, the cap and the wrench stay
    const r0 = BODY.adult.r, hy0 = -BODY.adult.H + r0, hcol = HAIR[look.hairColor] || look.hairColor || HAIR.dark;
    const hairUnderCap = g('data-s2-drawn="ponytail"', path(`M${f1(0.72 * r0)},${f1(hy0 - 0.2 * r0)} Q${f1(2.2 * r0)},${f1(hy0 + 0.1 * r0)} ${f1(1.65 * r0)},${f1(hy0 + 1.9 * r0)} Q${f1(1.3 * r0)},${f1(hy0 + 0.9 * r0)} ${f1(0.86 * r0)},${f1(hy0 + 0.5 * r0)} Z`, hcol, 0.9) +
      [-1, 1].map((sd) => path(`M${f1(sd * 1.02 * r0)},${f1(hy0 - 0.25 * r0)} Q${f1(sd * 1.16 * r0)},${f1(hy0 + 0.3 * r0)} ${f1(sd * 0.98 * r0)},${f1(hy0 + 0.62 * r0)} Q${f1(sd * 0.86 * r0)},${f1(hy0 + 0.2 * r0)} ${f1(sd * 0.88 * r0)},${f1(hy0 - 0.2 * r0)} Z`, hcol, 0.7)).join(''));
    const o = { s: AS, x: 32, y: 66, vest: true, hair: 'cap', look: 1, la: [-5, 8, -4, 17], hold: hairUnderCap };
    o.ra = armTo({ ...o, age: 'adult' }, 'r', 46, 38);
    const p = grownUp({ ...look, sex: 'f' }, o), h = p.hand('r');
    const wrench = g('data-s2-drawn="wrench"', line(h[0] - 1, h[1] + 3, h[0] + 5, h[1] - 9, '#8C8C8C', 2.4) + `<path d="M${f1(h[0] + 3.5)},${f1(h[1] - 12.5)} l2.5,-2 l3,2.4 l-1.6,1.2 l-1.6,-1.2 l-1.2,1.6 l1.4,1.4 l-1.6,1.8 Z" fill="#8C8C8C" stroke="${OUT}" stroke-width="0.7"/>`);
    return bg + g('data-s2-drawn="swings"', line(58, 60, 66, 10, OUT, 2) + line(96, 60, 88, 10, OUT, 2) + line(64, 12, 90, 12, OUT, 2.2) + [70, 82].map((x) => line(x, 12, x, 44, '#9AA0A6', 1) + orect(x - 4, 44, 8, 3, '#D9534F', 0.8)).join('')) + p.svg + wrench;
  }
  // the boy at the playground (a slide behind him)
  return bg + g('data-s2-drawn="slide"', path('M60,20 L92,58 L96,58 L64,20 Z', '#F39C40', 1) + line(58, 20, 58, 60, OUT, 1.6) + line(64, 20, 64, 60, OUT, 1.6)) + kid0({ x: 32 });
}

/* ================================================================ G2-625: Main Street about 1910 (a drawn sample photograph) */
function bowler(hd) { return `<ellipse cx="${f1(hd.x)}" cy="${f1(hd.y - hd.r * 0.7)}" rx="${f1(hd.r * 1.35)}" ry="${f1(hd.r * 0.3)}" fill="#2B2522" stroke="${OUT}" stroke-width="0.6"/><path d="M${f1(hd.x - hd.r * 0.85)},${f1(hd.y - hd.r * 0.75)} Q${f1(hd.x - hd.r * 0.85)},${f1(hd.y - hd.r * 1.75)} ${f1(hd.x)},${f1(hd.y - hd.r * 1.75)} Q${f1(hd.x + hd.r * 0.85)},${f1(hd.y - hd.r * 1.75)} ${f1(hd.x + hd.r * 0.85)},${f1(hd.y - hd.r * 0.75)} Z" fill="#2B2522" stroke="${OUT}" stroke-width="0.6"/>`; }
function oldPerson(o, sex) {
  const p = person({ ...o, age: 'adult', hair: sex === 'f' ? 'bun' : 'short', bottom: sex === 'f' ? 'dress' : 'pants', top: o.top, coat: sex === 'm' ? '#4A4A4A' : undefined });
  const hd = p.head(); let s = p.svg;
  if (sex === 'm') s += g('data-s2-drawn="hat"', bowler(hd));
  else s += g('data-s2-drawn="long-skirt"', path(`M${f1(o.x - 7 * o.s)},${f1(o.y - 44 * o.s)} L${f1(o.x + 7 * o.s)},${f1(o.y - 44 * o.s)} L${f1(o.x + 11 * o.s)},${f1(o.y - 2 * o.s)} L${f1(o.x - 11 * o.s)},${f1(o.y - 2 * o.s)} Z`, '#5A5A5A', 0.8)) + `<ellipse cx="${f1(hd.x)}" cy="${f1(hd.y - hd.r * 0.8)}" rx="${f1(hd.r * 1.8)}" ry="${f1(hd.r * 0.42)}" fill="#404040" stroke="${OUT}" stroke-width="0.6" data-s2-drawn="wide-hat"/>` + circ(hd.x, hd.y - hd.r * 1.1, hd.r * 0.8, '#404040', 0.6);
  return s;
}
function oldPhotoArt(look) {
  let s = rect(0, 0, 400, 250, '#DDEFF5');
  // the buildings: brick fronts, the hardware store and the bank with their signs (signs in capitals, as on old fronts)
  const front = (x, w, h, c, signW, word, id) => g(`data-s2-photo="${id}"`, orect(x, 152 - h, w, h, c, 1.2) + [0, 1, 2].map((q) => orect(x + 8 + q * (w - 16) / 3, 160 - h, (w - 16) / 3 - 8, 16, '#BFE3F2', 0.8)).join('') + orect(x + 6, 124, w - 12, 26, '#BFE3F2', 1) + orect(x + w / 2 - 8, 118, 16, 34, '#8B5E3C', 1) + (word ? sign(x + (w - signW) / 2, 152 - h + 22, signW, 16, word, 12.5) : ''));
  s += front(4, 104, 116, '#C96B4B', 96, 'HARDWARE', 'hardware') + front(110, 84, 124, '#D9CDB4', 60, 'BANK', 'bank') + front(196, 100, 108, '#B07A4E', 0, '', 'shop') + front(298, 100, 118, '#C96B4B', 0, '', 'shop2');
  s += g('data-s2-photo="bank-columns"', [118, 136, 168, 186].map((x) => orect(x, 112, 7, 40, '#F1EEE6', 0.9)).join(''));
  s += rect(0, 152, 400, 12, '#C8C2B6') + rect(0, 164, 400, 86, '#B9B4AC');
  // the streetcar on its rails, its pole up to the wire over the street
  s += line(0, 88, 400, 88, '#3A3530', 0.9) + g('data-s2-photo="rails"', line(0, 214, 400, 214, '#5A5A5A', 1.8) + line(0, 226, 400, 226, '#5A5A5A', 1.8));
  s += g('data-s2-photo="streetcar"', orect(236, 168, 124, 48, '#E6B422', 1.6, ' rx="6"') + orect(232, 163, 132, 8, '#A8483A', 1.2) + [0, 1, 2, 3, 4].map((q) => orect(244 + q * 22, 176, 16, 16, '#DDEFF5', 1)).join('') + orect(246, 198, 104, 6, '#A8483A', 0.8) + line(300, 163, 284, 88, '#3A3530', 1.5) + circ(254, 220, 6, '#3A3530', 1) + circ(342, 220, 6, '#3A3530', 1));
  // people on the sidewalk: men in long coats and round hats, women in long skirts and wide hats
  s += g('data-s2-photo="people"', [[26, 'm'], [46, 'f'], [150, 'm'], [214, 'f'], [374, 'm']].map(([x, sex], q) => oldPerson({ ...look[(q + 1) % look.length], s: 0.56, x, y: 160, top: '#5A5A5A' }, sex)).join(''));
  // the horse and wagon (review round 1, rows 38-39): a horse in profile facing the way it pulls (neck, head with ears,
  // eye and muzzle, a mane, a tail, four legs with hooves, a collar and traces back to the wagon); the driver SITS on the
  // seat at the front of the wagon (a seat back behind him, his legs behind its front board), the reins in his hands
  const hx = 84, hy = 218, HC = '#9B6A43', MANE = '#6E4A26';
  const horse = g('data-s2-drawn="horse"', path(`M60,200 Q50,208 55,224`, 'none', 0) + `<path d="M61,199 Q51,207 55,224" fill="none" stroke="${MANE}" stroke-width="3.2" stroke-linecap="round"/>` +
    [hx - 18, hx - 10, hx + 10, hx + 18].map((x) => line(x, hy - 6, x, hy + 16, HC, 4.2) + rect(x - 2.6, hy + 15, 5.2, 3.4, '#3A3530')).join('') +
    `<ellipse cx="${hx}" cy="${hy - 13}" rx="25" ry="11" fill="${HC}" stroke="${OUT}" stroke-width="1.2"/>` +
    path(`M${hx + 14},${hy - 21} Q${hx + 20},${hy - 40} ${hx + 28},${hy - 46} L${hx + 36},${hy - 42} Q${hx + 30},${hy - 30} ${hx + 25},${hy - 8} Z`, HC, 1.2) +
    g('data-s2-drawn="horse-head"', path(`M${hx + 26},${hy - 48} Q${hx + 34},${hy - 54} ${hx + 40},${hy - 46} L${hx + 47},${hy - 34} Q${hx + 47},${hy - 28} ${hx + 41},${hy - 30} L${hx + 31},${hy - 38} Z`, HC, 1.2) +
      path(`M${hx + 28},${hy - 49} L${hx + 30},${hy - 58} L${hx + 34},${hy - 50} Z`, HC, 1) + circ(hx + 36, hy - 45, 1.4, '#2B2522', 0.4) + circ(hx + 44.5, hy - 32, 0.9, '#2B2522', 0.3)) +
    `<path d="M${hx + 15},${hy - 22} Q${hx + 20},${hy - 40} ${hx + 28},${hy - 48}" fill="none" stroke="${MANE}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M${hx + 18},${hy - 26} Q${hx + 24},${hy - 22} ${hx + 26},${hy - 12}" fill="none" stroke="#3A3530" stroke-width="2.2"/>`);
  const driver = person({ ...look[0], age: 'adult', s: 0.4, x: 44, y: 211, top: '#5A5A5A', coat: '#4A4A4A', la: [-4, 6, 4, 9], ra: [4, 6, 8, 9] });
  const dh = driver.hand('r');
  s += g('data-s2-photo="wagon"', g('data-s2-drawn="seat-back"', orect(30, 178, 4, 16, '#9B6A43', 1)) + driver.svg + bowler(driver.head()) + orect(4, 192, 52, 24, '#B07A4E', 1.4) + circ(16, 226, 12, 'none', 2.2) + circ(46, 226, 12, 'none', 2.2) + [0, 1, 2].map((q) => line(16 + 11 * Math.cos(q * 1.05), 226 + 11 * Math.sin(q * 1.05), 16 - 11 * Math.cos(q * 1.05), 226 - 11 * Math.sin(q * 1.05), OUT, 0.8) + line(46 + 11 * Math.cos(q * 1.05), 226 + 11 * Math.sin(q * 1.05), 46 - 11 * Math.cos(q * 1.05), 226 - 11 * Math.sin(q * 1.05), OUT, 0.8)).join('') +
    line(56, 204, hx + 16, hy - 16, '#3A3530', 1.4) + horse + g('data-s2-drawn="reins"', `<path d="M${f1(dh[0])},${f1(dh[1])} Q${hx},${hy - 40} ${hx + 40},${hy - 36}" fill="none" stroke="#3A3530" stroke-width="1"/>`));
  // an early car: tall and boxy, with thin spoked wheels (clear of the streetcar, inside the photo)
  const car = (x, y) => orect(x, y, 58, 20, '#3A3530', 1.2) + path(`M${x + 8},${y} L${x + 10},${y - 20} L${x + 38},${y - 20} L${x + 40},${y}`, 'none', 1.8) + orect(x + 11, y - 17, 26, 15, '#DDEFF5', 1) + [x + 11, x + 47].map((cx) => circ(cx, y + 24, 9, '#FFFFFF', 1.8) + [0, 1, 2, 3].map((q) => line(cx - 8 * Math.cos(q * Math.PI / 4), y + 24 - 8 * Math.sin(q * Math.PI / 4), cx + 8 * Math.cos(q * Math.PI / 4), y + 24 + 8 * Math.sin(q * Math.PI / 4), OUT, 0.8)).join('')).join('');
  s += g('data-s2-photo="car"', car(150, 202));
  s += g('data-s2-photo="lamp"', line(104, 160, 104, 100, '#3A3530', 2.4) + orect(97, 90, 14, 12, '#F1EEE6', 1));
  return A1.toGrey(s);
}

/* ================================================================ G2-626: the town, then and later (0 0 140 90) */
function townGrowArt(stage, id) {
  let s = rect(0, 0, 140, 90, '#EEF6F8') + rect(0, 60, 140, 30, '#B9D98A');
  // "then": what the town's own story names at its start (review round 1: "Mill River at first" showed no river); never
  // the reason it grew (the railroad, the bridge, the factory, the highway are for the child to read)
  if (stage === 'then') {
    if (id === 'bridge') {
      // a small town on both banks of a river; people row a boat across (no bridge)
      const boatX = 66;
      return s + g('data-s2-drawn="river"', path('M0,66 Q70,62 140,66 L140,80 Q70,76 0,80 Z', '#9FD3E8', 1)) + [[8, 46], [34, 48]].map(([x, y]) => house(x, y, 18, 14, '#F7EEDD', '#B5372F')).join('') + [[96, 46], [120, 48]].map(([x, y]) => house(x, y, 16, 12, '#F7EEDD', '#A8483A')).join('') +
        g('data-s2-drawn="rowboat"', path(`M${boatX - 12},70 L${boatX + 12},70 L${boatX + 9},75 L${boatX - 9},75 Z`, '#8B5E3C', 1) + line(boatX - 10, 66, boatX + 10, 74, '#7A5230', 1.2) + circ(boatX, 65, 2.6, '#F0C08F', 0.7) + orect(boatX - 2.6, 66.5, 5.2, 4, '#4A7BD0', 0.6)) + treeR(60, 58, 20);
    }
    if (id === 'factory') {
      // one store and one school, a few houses
      return s + g('data-s2-drawn="one-store"', orect(6, 32, 44, 28, '#F7EEDD', 1.1) + sign(9, 35, 38, 11, 'STORE', 9) + orect(24, 48, 8, 12, '#8B5E3C', 0.8)) +
        g('data-s2-drawn="one-school"', orect(56, 32, 52, 28, '#C96B4B', 1.1) + path('M54,33 L82,19 L110,33 Z', '#A8483A', 1.1) + sign(59, 36, 46, 11, 'SCHOOL', 9) + orect(78, 48, 8, 12, '#8B5E3C', 0.8) + line(113, 60, 113, 30, '#5A5A5A', 1) + rect(113.5, 30, 9, 6, '#B22234')) +
        [[124, 48]].map(([x, y]) => house(x, y, 12, 12, '#F7EEDD', '#B5372F')).join('') + [0, 1, 2].map((r) => line(12, 70 + r * 6, 60, 70 + r * 6, '#6BB36B', 2)).join('');
    }
    if (id === 'highway') {
      // a few houses and fields far from anywhere: a dirt road to the edge of the picture, no other town in sight
      return s + g('data-s2-drawn="dirt-road"', path('M60,90 L78,90 L74,60 L70,60 Z', '#D9CDB4', 0.8)) + [[20, 46], [100, 48]].map(([x, y]) => house(x, y, 18, 14, '#F7EEDD', '#B5372F')).join('') + [0, 1, 2].map((r) => line(6, 68 + r * 6, 50, 68 + r * 6, '#E6C15A', 2)).join('') + [0, 1, 2].map((r) => line(88, 70 + r * 6, 134, 70 + r * 6, '#6BB36B', 2)).join('') + treeR(52, 58, 22);
    }
    return s + [[10, 46], [80, 48]].map(([x, y]) => house(x, y, 18, 14, '#F7EEDD', '#B5372F')).join('') + [0, 1, 2, 3].map((r) => line(40, 66 + r * 6, 70, 66 + r * 6, '#6BB36B', 2)).join('') + [0, 1, 2].map((r) => line(96, 68 + r * 6, 130, 68 + r * 6, '#E6C15A', 2)).join('') + treeR(60, 58, 26);
  }
  // "later": the town grown, its main street (the same for every town: it shows growth, not its reason)
  s += rect(0, 64, 140, 10, '#B9B4AC');
  s += [[4, 30, 24, '#C96B4B'], [30, 34, 20, '#F7EEDD'], [52, 26, 26, '#D9CDB4'], [80, 32, 22, '#B07A4E'], [104, 28, 30, '#C96B4B']].map(([x, y, w, c]) => orect(x, y, w, 64 - y, c, 1.1) + orect(x + 4, y + 6, w - 8, 8, '#BFE3F2', 0.8) + orect(x + w / 2 - 3, 52, 6, 12, '#8B5E3C', 0.8)).join('');
  s += [[6, 88], [34, 88], [62, 88], [90, 88], [118, 88]].map(([x, y]) => house(x, y - 9, 16, 9, '#F7C948')).join('');
  return s;
}

/* ================================================================ G2-627: a worker who knows how (0 0 100 100) */
/** the worker, with a thought bubble of what the skill is about (the skill is what the worker KNOWS, so it is drawn in
 *  the worker's head) */
function workerFig(producer, look, at) {
  const o = { ...look, age: 'adult', look: 1, ...at };
  if (producer === 'baker') { o.top = '#FFFFFF'; o.apron = '#F4EBD9'; }
  if (producer === 'farmer') { o.top = '#4F6D9A'; o.bottomColor = 'denim'; }
  if (producer === 'builder') { o.top = '#F39C40'; }
  const p = person(o), hd = p.head();
  let hat = '';
  if (producer === 'baker') hat = g('data-s2-drawn="baker-hat"', `<path d="M${f1(hd.x - hd.r)},${f1(hd.y - hd.r * 0.6)} L${f1(hd.x - hd.r * 1.1)},${f1(hd.y - hd.r * 1.9)} Q${f1(hd.x)},${f1(hd.y - hd.r * 2.6)} ${f1(hd.x + hd.r * 1.1)},${f1(hd.y - hd.r * 1.9)} L${f1(hd.x + hd.r)},${f1(hd.y - hd.r * 0.6)} Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1"/>`);
  if (producer === 'farmer') hat = g('data-s2-drawn="straw-hat"', `<ellipse cx="${f1(hd.x)}" cy="${f1(hd.y - hd.r * 0.7)}" rx="${f1(hd.r * 1.8)}" ry="${f1(hd.r * 0.36)}" fill="#E6C15A" stroke="${OUT}" stroke-width="1"/><path d="M${f1(hd.x - hd.r * 0.9)},${f1(hd.y - hd.r * 0.75)} Q${f1(hd.x)},${f1(hd.y - hd.r * 2)} ${f1(hd.x + hd.r * 0.9)},${f1(hd.y - hd.r * 0.75)} Z" fill="#E6C15A" stroke="${OUT}" stroke-width="1"/>`);
  if (producer === 'builder') hat = g('data-s2-drawn="hard-hat"', `<path d="M${f1(hd.x - hd.r * 1.2)},${f1(hd.y - hd.r * 0.35)} Q${f1(hd.x)},${f1(hd.y - hd.r * 2)} ${f1(hd.x + hd.r * 1.2)},${f1(hd.y - hd.r * 0.35)} Z" fill="#F4C542" stroke="${OUT}" stroke-width="1"/>`);
  return { svg: p.svg + hat, hd };
}
/** a tool card (0 0 100 100; review round 1, row 43): the same worker as a skill card, in the same place, holding or
 *  using the tool or machine (the hand on it), never a thought bubble. `thing(box)` returns the tool's markup inside a box
 *  [x, y, w, h]; `big` for a machine or a big tool (oven, mixer, tractor, wheelbarrow, ladder: a hand on its side) */
function toolArt(producer, look, tool, thing) {
  // review round 2 (row 52): the tool is IN the worker's hand. The hand is placed at the tool's grip point (its share of
  // the tool's box), the tool drawn first and the hand over it (gripping); a shovel stands with its blade at the ground
  // (the card's bottom edge), a hand on its handle; a hand on the ladder's rail. An invisible box marks the tool's drawn
  // ink, so the page check can test that the hand touches the tool (not just its picture box).
  const at = { s: 0.86, x: 24, y: 128 };
  const H = tool.big ? [50, 70] : [52, 70];
  const sz = tool.size || 46, [gx, gy] = tool.grip || [0.2, 0.6];
  const box = [H[0] - gx * sz, H[1] - gy * sz, sz, sz];
  const ink0 = tool.ink || [0, 0, 1, 1], ink = tool.flip ? [1 - ink0[2], ink0[1], 1 - ink0[0], ink0[3]] : ink0;
  const inkBox = `<rect x="${f1(box[0] + ink[0] * sz)}" y="${f1(box[1] + ink[1] * sz)}" width="${f1((ink[2] - ink[0]) * sz)}" height="${f1((ink[3] - ink[1]) * sz)}" fill="none" stroke="none" data-s2-inkbox="1"/>`;
  const ra = armTo({ ...look, age: 'adult', ...at }, 'r', H[0], H[1]);
  const wf = workerFig(producer, look, { ...at, ra });
  return rect(0, 0, 100, 100, '#F7EEDD') + g('data-s2-drawn="tool-in-hand"', thing(box, !!tool.flip) + inkBox) + g('data-s2-worker="tool"', wf.svg);
}
/** the producer of a row of cards, head and shoulders (0 0 40 46) */
const workerBust = (producer, look) => workerFig(producer, look, { s: 0.9, x: 20, y: 104, look: 0 }).svg;
function skillArt(producer, think, look) {
  const wf = workerFig(producer, look, { s: 0.86, x: 24, y: 128 }), hd = wf.hd;
  const arrowR = (x1, x2, y) => line(x1, y, x2 - 3, y, OUT, 1.4) + path(`M${x2 - 4},${y - 3} L${x2},${y} L${x2 - 4},${y + 3} Z`, OUT, 0.4);
  const loaf = (cx, cy, c) => `<ellipse cx="${cx}" cy="${cy}" rx="7.5" ry="5.5" fill="${c}" stroke="${OUT}" stroke-width="1"/><path d="M${cx - 5},${cy - 2} Q${cx - 3},${cy - 5} ${cx - 1},${cy - 2} M${cx - 1},${cy - 2} Q${cx + 1},${cy - 5} ${cx + 3},${cy - 2}" fill="none" stroke="${c === '#D99A4E' ? '#B5652E' : '#D9A066'}" stroke-width="0.9"/>`;
  // every bubble is a list of named items (data-s2-item): the page check reads them, and no item may be a tool or a
  // measuring tool (review round 3: the measuring bubble drew a tape measure, a tool a child can color blue). Review round
  // 2: never a paper, a book or a sign.
  const ITEMS = {
    // the steps to make bread: a bowl of flour, an arrow, a loaf
    steps: [['bowl-of-flour', `<path d="M-21,-2 L-5,-2 Q-6,9 -13,9 Q-20,9 -21,-2 Z" fill="#F7F4EE" stroke="${OUT}" stroke-width="1"/><path d="M-19,-2 Q-13,-9 -7,-2 Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.8"/>`], ['arrow', arrowR(-2, 8, 2)], ['loaf', loaf(15, 2, '#D99A4E')]],
    // how long to bake bread: a pale loaf, an arrow, the same loaf golden (done); no clock (a clock measures: a tool)
    'bread-done': [['loaf-unbaked', loaf(-12, 2, '#F4EBD9')], ['arrow', arrowR(-2, 8, 2)], ['loaf', loaf(15, 2, '#D99A4E')]],
    dough: [['dough', `<path d="M-14,6 Q-14,-10 0,-10 Q14,-10 14,6 Z" fill="#F4EBD9" stroke="${OUT}" stroke-width="1.1"/><path d="M-6,-2 Q0,-6 6,-2" fill="none" stroke="#D9A066" stroke-width="1"/>`]],
    // a good time to plant seeds: the spring sun over the soil, a seed going in, a sprout beside it (no calendar)
    'sun-seed': [['sun', circ(-12, -7, 5, '#F7C948', 1) + [0, 1, 2, 3, 4, 5, 6, 7].map((q) => { const an = q * Math.PI / 4; return line(-12 + Math.cos(an) * 6.5, -7 + Math.sin(an) * 6.5, -12 + Math.cos(an) * 8.6, -7 + Math.sin(an) * 8.6, '#F2B233', 1); }).join('')], ['soil', path('M-16,12 Q2,4 20,12 Z', '#8B5E3C', 1)], ['seed', `<ellipse cx="3" cy="5" rx="2" ry="1.4" fill="#C9A66B" stroke="${OUT}" stroke-width="0.6"/>`], ['sprout', line(12, 9, 12, 1, '#3F9B4B', 1.2) + `<ellipse cx="14.5" cy="1" rx="2.6" ry="1.4" fill="#6BB36B" stroke="${OUT}" stroke-width="0.5"/>`]],
    // which seeds grow best: three sprouts from the same soil, small, taller, tallest
    sprouts: [['soil', path('M-20,12 L20,12 L18,7 L-18,7 Z', '#8B5E3C', 1)], ['sprout', [[-12, 4], [0, 9], [12, 15]].map(([x, hh]) => line(x, 7, x, 7 - hh, '#3F9B4B', 1.3) + `<ellipse cx="${x - 2.4}" cy="${7 - hh + 2}" rx="2.6" ry="1.4" fill="#6BB36B" stroke="${OUT}" stroke-width="0.5"/><ellipse cx="${x + 2.4}" cy="${7 - hh + 3}" rx="2.6" ry="1.4" fill="#6BB36B" stroke="${OUT}" stroke-width="0.5"/>`).join('')]],
    // a cow's face (review round 1: the round pink snout alone read as a pig): ears out to the sides, two small horns, black
    // patches, a long muzzle with nostrils
    cow: [['cow', path('M-9,-6 Q-19,-9 -17,-3 Q-14,-1 -9,-3 Z', '#FFFFFF', 0.9) + path('M9,-6 Q19,-9 17,-3 Q14,-1 9,-3 Z', '#FFFFFF', 0.9) + path('M-6,-9 Q-8,-14 -4,-15 Q-5,-12 -3,-9 Z', '#F1EEE6', 0.8) + path('M6,-9 Q8,-14 4,-15 Q5,-12 3,-9 Z', '#F1EEE6', 0.8) +
      `<path d="M-9,-8 Q0,-12 9,-8 L8,6 Q0,10 -8,6 Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.1"/>` + path('M-9,-8 Q-4,-10 -2,-8 Q-3,-3 -8,-1 Z', '#3A3530', 0.6) + path('M5,-2 Q9,-4 8.6,2 Q6,3 5,1 Z', '#3A3530', 0.6) + circ(-3.6, -2.5, 1.2, '#2B2522', 0.3) + circ(3.6, -2.5, 1.2, '#2B2522', 0.3) +
      `<ellipse cx="0" cy="7" rx="7" ry="4.2" fill="#F3B7A6" stroke="${OUT}" stroke-width="0.9"/>` + circ(-2.6, 7, 0.9, '#8C2F2B', 0.3) + circ(2.6, 7, 0.9, '#8C2F2B', 0.3)]],
    // how to read a building plan: the house the plan shows, in the builder's head (dashed lines and a size arrow; no paper)
    'house-idea': [['house-outline', `<path d="M-14,10 L-14,-3 L0,-14 L14,-3 L14,10 Z M-4,10 L-4,2 L4,2 L4,10" fill="none" stroke="#2E6DA4" stroke-width="1.4" stroke-dasharray="3 2"/>`], ['size-arrow', line(-14, 14, 14, 14, OUT, 0.9) + path('M-14,14 L-11,12 L-11,16 Z', OUT, 0.3) + path('M14,14 L11,12 L11,16 Z', OUT, 0.3)]],
    // a good way to measure wood (review round 3): the know-how, not the tool: a board with a pencil line across it where
    // it will be cut, a small arrow at the mark; no ruler, no tape measure
    measure: [['board', orect(-19, 1, 38, 9, '#D9A066', 1) + `<path d="M-15,4 Q-8,3 -2,5 M10,7 Q14,6 17,7" fill="none" stroke="#B07A4E" stroke-width="0.7"/>`], ['pencil-mark', line(6, -1, 6, 12, '#3A3530', 1.5)], ['arrow', line(6, -14, 6, -6, OUT, 1.3) + path('M3,-7 L6,-2.5 L9,-7 Z', OUT, 0.4)]],
    wall: [['bricks', [0, 1, 2].map((r) => [0, 1, 2].map((c) => orect(-15 + c * 10 + (r % 2) * 5, -10 + r * 7, 9, 6, C.brickWall, 0.8)).join('')).join('')]],
  }[think] || [];
  const inner = ITEMS.map(([it, svg]) => `<g data-s2-item="${it}">${svg}</g>`).join('');
  return rect(0, 0, 100, 100, '#F7EEDD') + g('data-s2-worker="skill"', wf.svg) + bubble(40, 4, 58, 50, hd.x + 8, hd.y - 6, true, `<g transform="translate(69 29) scale(1.25)" data-s2-think="${think}">${inner}</g>`);
}

/* ================================================================ G2-628: the lemonade stand (0 0 200 110) */
function lemonadeStandArt(k) {
  const o1 = { ...k[0], age: 'child', s: 1.0, x: 64, y: 100 }, o2 = { ...k[1], age: 'child', s: 1.0, x: 138, y: 100 };
  return rect(0, 0, 200, 110, '#EEF6F8') + rect(0, 96, 200, 14, '#9CCB7C') + P(o1) + P(o2) + g('data-s2-drawn="stand"', orect(30, 66, 140, 36, C.standWood, 1.4) + line(36, 66, 36, 24, '#8B5E3C', 2.4) + line(164, 66, 164, 24, '#8B5E3C', 2.4) + orect(50, 14, 100, 18, '#FFFFFF', 1.3) + signText(100, 28, 'LEMONADE', 13) +
    path('M92,52 L108,52 L106,66 L94,66 Z', C.lemonade, 1.1) + [116, 128].map((x) => path(`M${x},56 L${x + 9},56 L${x + 7},66 L${x + 2},66 Z`, '#FFFFFF', 1)).join('') + circ(72, 60, 5, '#F4C542', 1) + circ(80, 62, 4.5, '#F4C542', 1));
}

/* ================================================================ G2-629: what banks do (0 0 160 110) */
function bankArt(id, k, statement = { start: 100, added: 1 }) {
  const room = rect(0, 0, 160, 110, '#EAF2EE') + rect(0, 92, 160, 18, '#E6DBC6');
  if (id === 'safe') {
    // a child gives the teller an envelope of money; behind the counter the big round door of the vault. The teller is a
    // grown-up in a jacket (review round 1, row 48), half again as tall as the child
    const teller = grownUp(k[0], { s: 0.62, x: 70, y: 76, look: -1, tie: k[0].sex !== 'f' });
    const child = { ...k[1], age: 'child', s: 0.56, x: 28, y: 104, look: 1 }; child.ra = armTo(child, 'r', 50, 66);
    return room + g('data-s2-drawn="vault"', circ(126, 46, 31, C.vault, 1.8) + circ(126, 46, 25, C.vaultDark, 1.3) + [0, 1, 2, 3, 4, 5].map((q) => { const an = q * Math.PI / 3; return line(126 + Math.cos(an) * 6, 46 + Math.sin(an) * 6, 126 + Math.cos(an) * 17, 46 + Math.sin(an) * 17, OUT, 2.4) + circ(126 + Math.cos(an) * 18, 46 + Math.sin(an) * 18, 2.4, C.vault, 1); }).join('') + circ(126, 46, 6, C.vault, 1.4) + [0, 1, 2, 3].map((q) => circ(126 + Math.cos(q * Math.PI / 2 + 0.8) * 28, 46 + Math.sin(q * Math.PI / 2 + 0.8) * 28, 1.6, C.vaultDark, 0.6)).join('')) + teller.svg + g('data-s2-drawn="counter"', orect(42, 64, 72, 30, C.counter, 1.4)) + P(child) + g('data-s2-drawn="money-envelope"', orect(46, 60, 14, 9, '#FFFFFF', 1) + signText(53, 68, '$', 10, '#4E8A4C'));
  }
  if (id === 'interest') {
    // a savings statement: what was saved, the little extra the bank added, what there is now (the word "interest" is not
    // printed; review round 1: $1 on $100, a realistic little extra, whole dollars)
    const st = statement;
    return room + g('data-s2-drawn="statement"', orect(12, 6, 136, 98, C.statement, 1.6) + signText(80, 24, 'My Savings', 12) + line(20, 30, 140, 30, OUT, 1) + signText(20, 48, 'I saved', 10, OUT, 'start') + signText(140, 48, '$' + st.start, 12, OUT, 'end') + signText(20, 68, 'The bank added', 10, OUT, 'start') + signText(140, 68, '$' + st.added, 12, '#4E8A4C', 'end') + line(20, 76, 140, 76, OUT, 1) + signText(20, 94, 'Now I have', 10, OUT, 'start') + signText(140, 94, '$' + (st.start + st.added), 13, OUT, 'end'));
  }
  // a family borrows money for their roof: across the desk the banker holds the money out, the parent's open hand takes
  // it, the child stands by the parent; they think of the roof being fixed (review round 1, row 48: who gives to whom)
  const banker = { s: 0.62, x: 130, y: 100, look: -1, tie: k[0].sex !== 'f' };
  banker.la = armTo({ ...banker, age: 'adult' }, 'l', 101, 62);
  const bk = grownUp(k[0], banker), bh = bk.hand('l');
  const parent = { s: 0.62, x: 50, y: 100, look: 1 };
  parent.ra = armTo({ ...parent, age: 'adult' }, 'r', 91, 64);
  const pa = grownUp(k[1], { ...parent, jacket: '#7A5230', shirt: '#F4EBD9' }), hd = pa.head(), ph = pa.hand('r');
  const child = { ...k[2], age: 'child', s: 0.52, x: 22, y: 100, look: 1 };
  // the bill: in the banker's hand, held out toward the parent's open hand (just below it, palm up)
  const bill = g('data-s2-drawn="bill-held-out" data-s2-giver="banker"', orect(bh[0] - 16, bh[1] - 5, 16, 9, '#D6EBC8', 1) + signText(bh[0] - 8, bh[1] + 2.4, '$', 9, '#2E6B45'));
  const openHand = g('data-s2-drawn="open-hand"', `<path d="M${f1(ph[0] - 3)},${f1(ph[1] - 1)} q3,3 7,0" fill="none" stroke="${OUT}" stroke-width="1"/>`);
  // 2026-11-25 picture fix: the desk reaches the floor (its foot below the banker's feet), so it hides his legs; his shoes showed under it
  return room + bk.svg + g('data-s2-drawn="desk"', orect(104, 74, 50, 30, '#8B5E3C', 1.3)) + P(child) + pa.svg + openHand + bill +
    bubble(2, 2, 58, 34, hd.x - 4, hd.y - 8, true, g('data-s2-drawn="roof-fixed"', house(17, 19, 28, 13, '#F7EEDD', '#A8483A') + path('M24,13 L30,10 L32,14 Z', C.roofHole, 0.8) + line(42, 34, 37, 10, '#8B5E3C', 1.6) + line(46, 34, 41, 10, '#8B5E3C', 1.6)));
}

module.exports = {
  ...module.exports.__part1, S2_SCENE, PAL2, C,
  placeArt, serviceTown, workerBust, toolArt, seasonTree, yarnBall, changeArt, floodArt, kitArt, traditionArt, menorahArt, kinaraArt, pinataArt, envelopeArt, goodArt, islandArt, tellerArt, oldPhotoArt, townGrowArt, skillArt, lemonadeStandArt, bankArt,
  ruleArt, lawArt, leaderOne, leaderGroup, stateIcon, townIcon, us48, usCountry, worldMap, bubble, sign, signText, house, star,
};
delete module.exports.__part1;
