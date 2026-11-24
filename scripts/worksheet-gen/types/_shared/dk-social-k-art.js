/**
 * dk-social-k-art.js — the drawings of the Batch SK Kindergarten social studies pages (Daily Teaching System Stage D-5,
 * 2026-11-24): people, families, school scenes, the flag, the globe, the neighborhood map, the long-ago objects, the
 * traditions. Pure functions that return SVG markup; NOTHING here reads a picture or the cache while the module loads
 * (the server has no picture cache: library pictures are placed only through `lib(p, ...)` at build time).
 *
 * People (person()): a warm, flat, front-view cartoon figure with a dark outline (the outline is a wider dark stroke
 * under each coloured stroke, so a figure reads at print size). Skin tones, hair, clothes and pose are parameters; every
 * page that shows people varies the skin tones (the gate counts them). A figure's local frame: feet at (0, 0), up is
 * negative y, an adult stands 100 units tall; `s` = px per unit. Faces are two eyes and a mouth; `look` turns the eyes
 * (-1 left, 1 right); `mood` 'smile' | 'sad' | 'open' (talking or shouting) | 'calm'.
 * A figure seen from BEHIND (back: true) has no face: hair over the head, ears and neck in skin.
 */
'use strict';
const TOK = require('../../primitives/_tokens.js');
const T = TOK.color;
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const OUT = '#3A3530';

/* ================================================================ palettes */
const SKIN = { s1: '#F7D9C4', s2: '#F0C08F', s3: '#D9A066', s4: '#B97A45', s5: '#8A5530', s6: '#5E3A22' };
const HAIR = { black: '#2B2522', dark: '#4A2E1A', brown: '#7B4A26', blond: '#E2B33C', red: '#B5542A', grey: '#A8A6A2', white: '#ECEAE6' };
const CLOTH = { teal: '#2A9D8F', coral: '#F2784B', yellow: '#F4C542', blue: '#4A7BD0', purple: '#8E6CC5', green: '#6BB36B', red: '#D9534F', orange: '#F39C40', pink: '#E98AB0', navy: '#3F5372', sky: '#7EC8E3', lilac: '#C3A6E0' };
const PANTS = { denim: '#4F6D9A', khaki: '#C9A66B', dark: '#4A4A4A', brown: '#7A5230', grey: '#8C8C8C', navy: '#34405A' };

/* ================================================================ body proportions (units; feet at y = 0) */
const BODY = {
  adult: { H: 100, r: 9.5, sh: 11.5, shY: 73, hipY: 44, hip: 7.5, arm: 30, leg: 43, aw: 6.2, lw: 8 },
  elder: { H: 96, r: 9.5, sh: 11.5, shY: 70, hipY: 42, hip: 7.5, arm: 29, leg: 41, aw: 6.2, lw: 8 },
  teen: { H: 88, r: 9.2, sh: 10, shY: 63, hipY: 38, hip: 6.8, arm: 26, leg: 37, aw: 5.8, lw: 7.4 },
  child: { H: 66, r: 9.6, sh: 8.2, shY: 44, hipY: 26, hip: 5.8, arm: 19, leg: 25, aw: 5.4, lw: 6.6 },
  toddler: { H: 50, r: 9.4, sh: 6.8, shY: 30, hipY: 17, hip: 5.2, arm: 14, leg: 16, aw: 5, lw: 6 },
};

/* ================================================================ stroke helpers (outlined) */
const seg = (pts, w, c) => {
  const d = 'M' + pts.map((p) => f1(p[0]) + ',' + f1(p[1])).join(' L');
  return `<path d="${d}" fill="none" stroke="${OUT}" stroke-width="${f1(w + 2.2)}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="${c}" stroke-width="${f1(w)}" stroke-linecap="round" stroke-linejoin="round"/>`;
};
const circ = (x, y, r, c, extra = '') => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${c}" stroke="${OUT}" stroke-width="1.2"${extra}/>`;
const pathF = (d, c, extra = '') => `<path d="${d}" fill="${c}" stroke="${OUT}" stroke-width="1.2" stroke-linejoin="round"${extra}/>`;

/* ================================================================ hair */
function hairBack(style, r, c) {
  if (style === 'long') return pathF(`M${f1(-1.08 * r)},${f1(-0.2 * r)} Q${f1(-1.2 * r)},${f1(1.5 * r)} ${f1(-0.9 * r)},${f1(1.75 * r)} L${f1(0.9 * r)},${f1(1.75 * r)} Q${f1(1.2 * r)},${f1(1.5 * r)} ${f1(1.08 * r)},${f1(-0.2 * r)} Z`, c);
  if (style === 'curly') { let s = ''; for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; s += `<circle cx="${f1(Math.cos(a) * 1.12 * r)}" cy="${f1(-0.18 * r + Math.sin(a) * 1.08 * r)}" r="${f1(0.42 * r)}" fill="${c}" stroke="${OUT}" stroke-width="1.2"/>`; } return s + `<circle cx="0" cy="${f1(-0.18 * r)}" r="${f1(1.2 * r)}" fill="${c}"/>`; }
  if (style === 'puffs') return circ(-1.0 * r, -0.75 * r, 0.58 * r, c) + circ(1.0 * r, -0.75 * r, 0.58 * r, c);
  if (style === 'bun') return circ(0, -1.12 * r, 0.48 * r, c);
  if (style === 'pony') return pathF(`M${f1(0.7 * r)},${f1(-0.5 * r)} Q${f1(1.9 * r)},${f1(-0.3 * r)} ${f1(1.45 * r)},${f1(1.1 * r)} Q${f1(1.2 * r)},${f1(0.2 * r)} ${f1(0.8 * r)},${f1(0.1 * r)} Z`, c);
  if (style === 'braids') return [-1, 1].map((sd) => pathF(`M${f1(sd * 0.85 * r)},${f1(0.1 * r)} q${f1(sd * 0.35 * r)},${f1(0.5 * r)} ${f1(sd * 0.1 * r)},${f1(1.25 * r)} q${f1(-sd * 0.25 * r)},${f1(0.1 * r)} ${f1(-sd * 0.25 * r)},${f1(-0.2 * r)} q${f1(sd * 0.1 * r)},${f1(-0.6 * r)} ${f1(-sd * 0.05 * r)},${f1(-1.05 * r)} Z`, c) + `<circle cx="${f1(sd * 1.0 * r)}" cy="${f1(1.4 * r)}" r="${f1(0.16 * r)}" fill="${T.coral}" stroke="${OUT}" stroke-width="1"/>`).join('');
  if (style === 'hijab') return pathF(`M${f1(-1.25 * r)},${f1(0)} Q${f1(-1.3 * r)},${f1(-1.35 * r)} 0,${f1(-1.32 * r)} Q${f1(1.3 * r)},${f1(-1.35 * r)} ${f1(1.25 * r)},${f1(0)} Q${f1(1.35 * r)},${f1(1.5 * r)} ${f1(1.7 * r)},${f1(2.1 * r)} L${f1(-1.7 * r)},${f1(2.1 * r)} Q${f1(-1.35 * r)},${f1(1.5 * r)} ${f1(-1.25 * r)},0 Z`, c);
  return '';
}
function hairFront(style, r, c, capC = CLOTH.red) {
  const cap = (top = 1.08, fringe = 0.28) => pathF(`M${f1(-1.03 * r)},${f1(0.05 * r)} Q${f1(-1.1 * r)},${f1(-top * r)} 0,${f1(-top * r)} Q${f1(1.1 * r)},${f1(-top * r)} ${f1(1.03 * r)},${f1(0.05 * r)} Q${f1(0.95 * r)},${f1(-fringe * r)} ${f1(0.55 * r)},${f1(-0.42 * r)} Q${f1(0.1 * r)},${f1(-0.3 * r)} ${f1(-0.2 * r)},${f1(-0.48 * r)} Q${f1(-0.7 * r)},${f1(-0.4 * r)} ${f1(-1.03 * r)},${f1(0.05 * r)} Z`, c);
  if (style === 'none' || style === 'hijab') return '';
  if (style === 'bald') return [-1, 1].map((sd) => pathF(`M${f1(sd * 0.98 * r)},${f1(0.25 * r)} Q${f1(sd * 1.12 * r)},${f1(-0.3 * r)} ${f1(sd * 0.78 * r)},${f1(-0.62 * r)} Q${f1(sd * 0.88 * r)},${f1(-0.2 * r)} ${f1(sd * 0.8 * r)},${f1(0.25 * r)} Z`, c)).join('');
  if (style === 'curly') return pathF(`M${f1(-1.0 * r)},${f1(-0.05 * r)} Q${f1(-0.9 * r)},${f1(-1.0 * r)} 0,${f1(-1.05 * r)} Q${f1(0.9 * r)},${f1(-1.0 * r)} ${f1(1.0 * r)},${f1(-0.05 * r)} Q${f1(0.7 * r)},${f1(-0.5 * r)} 0,${f1(-0.52 * r)} Q${f1(-0.7 * r)},${f1(-0.5 * r)} ${f1(-1.0 * r)},${f1(-0.05 * r)} Z`, c);
  if (style === 'spiky') return cap(1.1, 0.35) + [-0.6, -0.2, 0.2, 0.6].map((x) => pathF(`M${f1((x - 0.18) * r)},${f1(-0.95 * r)} L${f1(x * r)},${f1(-1.35 * r)} L${f1((x + 0.18) * r)},${f1(-0.95 * r)} Z`, c)).join('');
  if (style === 'cap') return cap(1.06, 0.3) + pathF(`M${f1(-1.05 * r)},${f1(-0.35 * r)} Q${f1(-1.0 * r)},${f1(-1.25 * r)} 0,${f1(-1.22 * r)} Q${f1(1.0 * r)},${f1(-1.25 * r)} ${f1(1.05 * r)},${f1(-0.35 * r)} Z`, capC) + pathF(`M${f1(0.2 * r)},${f1(-0.4 * r)} L${f1(1.7 * r)},${f1(-0.38 * r)} Q${f1(1.75 * r)},${f1(-0.2 * r)} ${f1(1.5 * r)},${f1(-0.18 * r)} L${f1(0.3 * r)},${f1(-0.22 * r)} Z`, capC);
  return cap();
}

/* ================================================================ the person */
/**
 * person(o) -> { svg, hand(side) -> [x,y] (view px), head -> {x,y,r} }
 *  o: { x, y (feet, view px), s (px per unit), age, skin, hair, hairColor, top, bottom ('pants'|'shorts'|'skirt'|'dress'),
 *       bottomColor, mood, look, back, glasses, la / ra (left / right arm: [ex, ey, hx, hy] from the shoulder, units, +y down),
 *       ll / rl (legs: [kx, ky, fx, fy] from the hip), hold (svg drawn in the left hand, view px), lean (deg), id }
 */
function person(o) {
  if (o.hair === 'long' && ['s4', 's5', 's6'].includes(o.skin)) o = { ...o, hair: 'braids' };
  const B = BODY[o.age || 'adult'];
  const s = o.s || 1, x0 = o.x || 0, y0 = o.y || 0;
  const r = B.r, hy = -B.H + r;                            // head centre
  const shY = -B.shY, hipY = -B.hipY;
  const skin = SKIN[o.skin] || o.skin || SKIN.s2;
  const hc = HAIR[o.hairColor] || o.hairColor || HAIR.dark;
  const top = CLOTH[o.top] || o.top || CLOTH.teal;
  const bc = PANTS[o.bottomColor] || CLOTH[o.bottomColor] || o.bottomColor || PANTS.denim;
  const bottom = o.bottom || 'pants';
  const A = B.arm, L = B.leg;
  const la = o.la || [-2, A * 0.5, -3.5, A], ra = o.ra || [2, A * 0.5, 3.5, A];
  const ll = o.ll || [-1, L * 0.48, -1.5, L - 2], rl = o.rl || [1, L * 0.48, 1.5, L - 2];
  const LS = [-B.sh + B.aw * 0.45, shY + 2], RS = [B.sh - B.aw * 0.45, shY + 2];
  const LH = [-B.hip + B.lw * 0.5, hipY], RH = [B.hip - B.lw * 0.5, hipY];
  const P = (o2, d) => [o2[0] + d[0], o2[1] + d[1]];
  const sleeve = o.coat ? (CLOTH[o.coat] || o.coat) : top;
  const armSvg = (S, a, side) => { const E = P(S, [a[0], a[1]]), Hd = P(S, [a[2], a[3]]); return seg([S, E], B.aw, sleeve) + seg([E, Hd], B.aw * 0.86, skin) + circ(Hd[0], Hd[1], B.aw * 0.62, skin, ` data-sk-hand="${side}"`); };
  const legCol = bottom === 'skirt' || bottom === 'dress' ? skin : bc;
  const shoe = (F, dir) => `<ellipse cx="${f1(F[0] + dir * 2)}" cy="${f1(F[1] + 0.6)}" rx="${f1(B.lw * 0.72)}" ry="${f1(B.lw * 0.42)}" fill="${OUT}"/>`;
  const legSvg = (Hp, l, dir) => { const K = P(Hp, [l[0], l[1]]), F = P(Hp, [l[2], l[3]]); const upper = bottom === 'shorts' ? seg([Hp, P(Hp, [l[0] * 0.55, l[1] * 0.55])], B.lw, bc) : ''; return seg([Hp, K, F], B.lw * (bottom === 'pants' ? 1 : 0.8), bottom === 'shorts' ? skin : legCol) + upper + shoe(F, dir); };
  let body = '';
  // the far parts first: hair behind the head, legs, the far arm
  const torsoW = B.sh * 2, waist = B.hip * 2 + 1.5;
  const torsoD = `M${f1(-torsoW / 2)},${f1(shY + 3)} Q${f1(-torsoW / 2)},${f1(shY - 1)} ${f1(-torsoW / 2 + 4)},${f1(shY - 1)} L${f1(torsoW / 2 - 4)},${f1(shY - 1)} Q${f1(torsoW / 2)},${f1(shY - 1)} ${f1(torsoW / 2)},${f1(shY + 3)} L${f1(waist / 2)},${f1(hipY + 3)} L${f1(-waist / 2)},${f1(hipY + 3)} Z`;
  body += legSvg(LH, ll, -1) + legSvg(RH, rl, 1);
  if (bottom === 'pants' || bottom === 'shorts') body += pathF(`M${f1(-waist / 2 - 0.5)},${f1(hipY - 2)} L${f1(waist / 2 + 0.5)},${f1(hipY - 2)} L${f1(waist / 2 + 0.2)},${f1(hipY + 5)} L${f1(-waist / 2 - 0.2)},${f1(hipY + 5)} Z`, bc);
  if (bottom === 'skirt') body += pathF(`M${f1(-waist / 2)},${f1(hipY - 2)} L${f1(waist / 2)},${f1(hipY - 2)} L${f1(waist / 2 + 5)},${f1(hipY + B.leg * 0.42)} L${f1(-waist / 2 - 5)},${f1(hipY + B.leg * 0.42)} Z`, bc);
  const neck = `<rect x="${f1(-r * 0.32)}" y="${f1(hy + r * 0.6)}" width="${f1(r * 0.64)}" height="${f1(shY - hy - r * 0.4)}" fill="${skin}" stroke="${OUT}" stroke-width="1.2"/>`;
  let upper = '';
  // a backpack: the pack behind the body (its sides show), the straps over the shoulders (drawn after the torso)
  if (o.backpack && !o.back) upper += pathF(`M${f1(-torsoW / 2 - 3.5)},${f1(shY + 4)} Q${f1(-torsoW / 2 - 3.5)},${f1(shY - 2)} 0,${f1(shY - 2)} Q${f1(torsoW / 2 + 3.5)},${f1(shY - 2)} ${f1(torsoW / 2 + 3.5)},${f1(shY + 4)} L${f1(torsoW / 2 + 3)},${f1(hipY + 1)} L${f1(-torsoW / 2 - 3)},${f1(hipY + 1)} Z`, CLOTH[o.backpack] || o.backpack, ' data-sk-backpack="1"');
  upper += armSvg(o.back ? RS : LS, o.back ? ra : la, o.back ? 'r' : 'l');
  upper += neck;
  if (bottom === 'dress') upper += pathF(`M${f1(-torsoW / 2)},${f1(shY + 3)} Q${f1(-torsoW / 2)},${f1(shY - 1)} ${f1(-torsoW / 2 + 4)},${f1(shY - 1)} L${f1(torsoW / 2 - 4)},${f1(shY - 1)} Q${f1(torsoW / 2)},${f1(shY - 1)} ${f1(torsoW / 2)},${f1(shY + 3)} L${f1(torsoW / 2 + 6)},${f1(hipY + B.leg * 0.45)} L${f1(-torsoW / 2 - 6)},${f1(hipY + B.leg * 0.45)} Z`, top);
  else upper += pathF(torsoD, top);
  // a coat over the top: down past the hips, a collar and a zipper
  if (o.coat) { const cc = CLOTH[o.coat] || o.coat; upper += pathF(`M${f1(-torsoW / 2 - 0.5)},${f1(shY + 3)} Q${f1(-torsoW / 2 - 0.5)},${f1(shY - 1.5)} ${f1(-torsoW / 2 + 4)},${f1(shY - 1.5)} L${f1(torsoW / 2 - 4)},${f1(shY - 1.5)} Q${f1(torsoW / 2 + 0.5)},${f1(shY - 1.5)} ${f1(torsoW / 2 + 0.5)},${f1(shY + 3)} L${f1(waist / 2 + 2.5)},${f1(hipY + 7)} L${f1(-waist / 2 - 2.5)},${f1(hipY + 7)} Z`, cc, ' data-sk-coat="1"') + `<line x1="0" y1="${f1(shY + 1)}" x2="0" y2="${f1(hipY + 7)}" stroke="${OUT}" stroke-width="0.9"/>` + pathF(`M${f1(-4.5)},${f1(shY - 1.5)} L0,${f1(shY + 4)} L${f1(4.5)},${f1(shY - 1.5)} Z`, '#FFFFFF'); }
  if (o.backpack && !o.back) upper += [-1, 1].map((sd) => `<path d="M${f1(sd * (torsoW / 2 - 3))},${f1(shY - 1)} L${f1(sd * (torsoW / 2 - 2.2))},${f1(hipY + 2)}" stroke="${OUT}" stroke-width="2.6" stroke-linecap="round"/><path d="M${f1(sd * (torsoW / 2 - 3))},${f1(shY - 1)} L${f1(sd * (torsoW / 2 - 2.2))},${f1(hipY + 2)}" stroke="${CLOTH[o.backpack] || o.backpack}" stroke-width="1.6" stroke-linecap="round"/>`).join('');
  if (o.apron) upper += pathF(`M${f1(-torsoW / 2 + 3)},${f1(shY + 6)} L${f1(torsoW / 2 - 3)},${f1(shY + 6)} L${f1(waist / 2 + 1)},${f1(hipY + 12)} L${f1(-waist / 2 - 1)},${f1(hipY + 12)} Z`, o.apron);
  if (o.stetho) upper += `<path d="M${f1(-4)},${f1(shY)} Q${f1(-6)},${f1(shY + 12)} 0,${f1(shY + 14)} Q${f1(6)},${f1(shY + 12)} ${f1(4)},${f1(shY)}" fill="none" stroke="#5A5A5A" stroke-width="1.6"/><circle cx="0" cy="${f1(shY + 15.5)}" r="2.2" fill="#9AA4AE" stroke="${OUT}" stroke-width="1"/>`;
  // the head
  const head = { x: 0, y: hy };
  let hd = '';
  if (o.back) {
    // seen from behind: hair over the head down to the nape (only the ears and the neck show skin)
    const hb = o.hair === 'bald' ? HAIR.grey : hc;
    hd += `<g transform="translate(0 ${f1(hy)})">${o.hair === 'hijab' ? '' : hairBack(o.hair, r, hc)}</g>`;
    hd += circ(-r * 0.98, hy + r * 0.05, r * 0.24, skin) + circ(r * 0.98, hy + r * 0.05, r * 0.24, skin);
    hd += circ(0, hy, r, skin);
    if (o.hair === 'hijab') hd += `<g transform="translate(0 ${f1(hy)})">` + hairBack('hijab', r, hc) + pathF(`M${f1(-1.2 * r)},0 Q${f1(-1.2 * r)},${f1(-1.3 * r)} 0,${f1(-1.3 * r)} Q${f1(1.2 * r)},${f1(-1.3 * r)} ${f1(1.2 * r)},0 Q${f1(1.2 * r)},${f1(1.0 * r)} 0,${f1(1.1 * r)} Q${f1(-1.2 * r)},${f1(1.0 * r)} ${f1(-1.2 * r)},0 Z`, hc) + '</g>';
    else if (o.hair === 'bald') hd += pathF(`M${f1(-r)},${f1(hy + 0.1 * r)} Q${f1(-r)},${f1(hy + 0.75 * r)} 0,${f1(hy + 0.72 * r)} Q${f1(r)},${f1(hy + 0.75 * r)} ${f1(r)},${f1(hy + 0.1 * r)} Q0,${f1(hy + 0.3 * r)} ${f1(-r)},${f1(hy + 0.1 * r)} Z`, hb);
    else hd += pathF(`M${f1(-1.04 * r)},${f1(hy + 0.35 * r)} Q${f1(-1.15 * r)},${f1(hy - 1.12 * r)} 0,${f1(hy - 1.1 * r)} Q${f1(1.15 * r)},${f1(hy - 1.12 * r)} ${f1(1.04 * r)},${f1(hy + 0.35 * r)} Q${f1(0.6 * r)},${f1(hy + 0.72 * r)} 0,${f1(hy + 0.7 * r)} Q${f1(-0.6 * r)},${f1(hy + 0.72 * r)} ${f1(-1.04 * r)},${f1(hy + 0.35 * r)} Z`, hc);
  } else {
    // turn (-1 / 1): a three-quarter view, the face turned toward the viewer's left / right (the features move to that
    // side, the far ear shows, a small nose on the near edge); 0 = straight on
    const tn = o.turn || 0, t3 = tn * r * 0.36;
    hd = `<g transform="translate(0 ${f1(hy)})">${hairBack(o.hair, r, hc)}</g>` + circ(0, hy, o.hair === 'hijab' ? r * 0.94 : r, skin) +
      (o.hair === 'hijab' ? '' : (tn ? circ(-tn * r * 0.86, hy + r * 0.1, r * 0.24, skin) : circ(-r * 0.97, hy + r * 0.1, r * 0.22, skin) + circ(r * 0.97, hy + r * 0.1, r * 0.22, skin)) + circ(0, hy, r, skin, ' stroke-opacity="0"'));
    const lk = (o.look || 0) * r * 0.22;
    const eyeY = hy + r * 0.02;
    hd += [-1, 1].map((sd) => { const far = tn && sd === -tn, ex = sd * r * (tn ? 0.3 : 0.36) + t3; return `<ellipse cx="${f1(ex + lk * 0.4)}" cy="${f1(eyeY)}" rx="${f1(r * (far ? 0.15 : 0.2))}" ry="${f1(r * 0.22)}" fill="#FFFFFF" stroke="${OUT}" stroke-width="${f1(r * 0.05)}"/><circle cx="${f1(ex + lk)}" cy="${f1(eyeY + r * 0.02)}" r="${f1(r * (far ? 0.1 : 0.12))}" fill="${OUT}"/>`; }).join('');
    if (tn) hd += `<path d="M${f1(tn * r * 0.9)},${f1(hy - r * 0.02)} q${f1(tn * r * 0.24)},${f1(r * 0.2)} ${f1(-tn * r * 0.02)},${f1(r * 0.34)}" fill="${skin}" stroke="${OUT}" stroke-width="${f1(r * 0.07)}" stroke-linecap="round" data-sk-nose="1"/>`;
    hd += `<circle cx="${f1(-r * 0.55 * (tn ? 0.7 : 1) + t3 + lk)}" cy="${f1(hy + r * 0.36)}" r="${f1(r * 0.15)}" fill="#F08F86" opacity="0.45"/><circle cx="${f1(r * 0.55 * (tn ? 0.7 : 1) + t3 + lk)}" cy="${f1(hy + r * 0.36)}" r="${f1(r * 0.15)}" fill="#F08F86" opacity="0.45"/>`;
    const my = hy + r * 0.42, mx = lk * 0.6 + tn * r * 0.34;
    const mood = o.mood || 'smile';
    if (mood === 'smile') hd += `<path d="M${f1(mx - r * 0.32)},${f1(my - r * 0.02)} Q${f1(mx)},${f1(my + r * 0.05)} ${f1(mx + r * 0.32)},${f1(my - r * 0.02)} Q${f1(mx + r * 0.26)},${f1(my + r * 0.36)} ${f1(mx)},${f1(my + r * 0.38)} Q${f1(mx - r * 0.26)},${f1(my + r * 0.36)} ${f1(mx - r * 0.32)},${f1(my - r * 0.02)} Z" fill="#9B3B34" stroke="${OUT}" stroke-width="${f1(r * 0.06)}" stroke-linejoin="round"/><path d="M${f1(mx - r * 0.24)},${f1(my + r * 0.04)} L${f1(mx + r * 0.24)},${f1(my + r * 0.04)}" stroke="#FFFFFF" stroke-width="${f1(r * 0.08)}" stroke-linecap="round"/>`;
    else if (mood === 'sad') hd += `<path d="M${f1(mx - r * 0.26)},${f1(my + r * 0.18)} Q${f1(mx)},${f1(my - r * 0.08)} ${f1(mx + r * 0.26)},${f1(my + r * 0.18)}" fill="none" stroke="#2A1A14" stroke-width="${f1(r * 0.13)}" stroke-linecap="round"/>`;
    else if (mood === 'open') hd += `<ellipse cx="${f1(mx)}" cy="${f1(my + r * 0.1)}" rx="${f1(r * 0.2)}" ry="${f1(r * 0.24)}" fill="#8C2F2B" stroke="${OUT}" stroke-width="${f1(r * 0.08)}"/>`;
    else hd += `<path d="M${f1(mx - r * 0.22)},${f1(my + r * 0.08)} L${f1(mx + r * 0.22)},${f1(my + r * 0.08)}" stroke="${OUT}" stroke-width="${f1(r * 0.11)}" stroke-linecap="round"/>`;
    if (o.tear) hd += `<path d="M${f1(r * 0.4 + t3 + lk)},${f1(hy + r * 0.25)} q${f1(r * 0.14)},${f1(r * 0.24)} 0,${f1(r * 0.36)} q${f1(-r * 0.14)},${f1(-r * 0.12)} 0,${f1(-r * 0.36)} Z" fill="#9FD3E8" stroke="#3B87A8" stroke-width="0.8"/>`;
    if (o.glasses) hd += `<g fill="none" stroke="${OUT}" stroke-width="${f1(r * 0.09)}"><circle cx="${f1(-r * (tn ? 0.3 : 0.36) + t3 + lk)}" cy="${f1(eyeY)}" r="${f1(r * 0.27)}"/><circle cx="${f1(r * (tn ? 0.3 : 0.36) + t3 + lk)}" cy="${f1(eyeY)}" r="${f1(r * 0.27)}"/><line x1="${f1(-r * 0.04 + t3 + lk)}" y1="${f1(eyeY)}" x2="${f1(r * 0.04 + t3 + lk)}" y2="${f1(eyeY)}"/></g>`;
    if (o.beard) hd += pathF(`M${f1(-r * 0.9)},${f1(hy + r * 0.1)} Q${f1(-r * 0.85)},${f1(hy + r * 1.15)} 0,${f1(hy + r * 1.15)} Q${f1(r * 0.85)},${f1(hy + r * 1.15)} ${f1(r * 0.9)},${f1(hy + r * 0.1)} Q${f1(r * 0.5)},${f1(hy + r * 0.62)} 0,${f1(hy + r * 0.62)} Q${f1(-r * 0.5)},${f1(hy + r * 0.62)} ${f1(-r * 0.9)},${f1(hy + r * 0.1)} Z`, hc);
    hd += `<g transform="translate(0 ${f1(hy)})">${hairFront(o.hair, r, hc, o.hair === 'cap' ? (o.top === 'red' || top === CLOTH.red ? CLOTH.navy : top) : undefined)}</g>`;
    if (o.hair === 'hijab') hd += `<path d="M${f1(-r * 0.92)},${f1(hy + r * 0.1)} Q${f1(-r * 0.95)},${f1(hy - r * 1.02)} 0,${f1(hy - r * 1.0)} Q${f1(r * 0.95)},${f1(hy - r * 1.02)} ${f1(r * 0.92)},${f1(hy + r * 0.1)}" fill="none" stroke="${hc}" stroke-width="${f1(r * 0.3)}"/>`;
  }
  upper += hd;
  upper += armSvg(o.back ? LS : RS, o.back ? la : ra, o.back ? 'l' : 'r');
  if (o.hold) upper += o.hold;
  const lean = o.lean || 0;
  const f3 = (n) => (Math.round(n * 1000) / 1000).toString();
  const svgOut = `<g transform="translate(${f1(x0)} ${f1(y0)}) scale(${f3(o.flip ? -s : s)} ${f3(s)})"${o.id ? ` data-sk-person="${o.id}"` : ''} data-sk-skin="${o.skin || 's2'}" data-sk-age="${o.age || 'adult'}"${o.back ? ' data-sk-back="1"' : ''}${o.turn ? ` data-sk-turn="${o.turn}"` : ''}>` + body + `<g transform="rotate(${f1(lean)} 0 ${f1(hipY)})">${upper}</g></g>`;
  const toView = (p) => [x0 + (o.flip ? -s : s) * p[0], y0 + s * p[1]];
  return {
    svg: svgOut,
    hand: (side) => { const S = side === 'l' ? LS : RS, a = side === 'l' ? la : ra; return toView([S[0] + a[2], S[1] + a[3]]); },
    head: () => { const v = toView([0, hy]); return { x: v[0], y: v[1], r: r * s }; },
    shoulder: (side) => toView(side === 'l' ? LS : RS),
    height: B.H * s,
  };
}

/** an arm [ex, ey, hx, hy] (units, from the shoulder) that puts the hand at the view point (vx, vy) */
function reachTo(p, side, vx, vy, bend = 4) {
  const sh = p.shoulder(side), s = p.s;
  const dx = (vx - sh[0]) / s, dy = (vy - sh[1]) / s;
  return [dx / 2 + (side === 'l' ? -bend : bend) * 0.3, dy / 2 + bend, dx, dy];
}

/** a baby held in the arms: a round bundle with a face (view px) */
function babyBundle(x, y, s, skin = 's2', blanket = CLOTH.yellow) {
  const k = s;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})" data-sk-baby="1"><ellipse cx="0" cy="0" rx="9" ry="6.5" fill="${blanket}" stroke="${OUT}" stroke-width="1.2"/>` +
    `<circle cx="-5" cy="-2.5" r="4.6" fill="${SKIN[skin] || skin}" stroke="${OUT}" stroke-width="1.1"/><circle cx="-6.6" cy="-3" r="0.6" fill="${OUT}"/><circle cx="-3.6" cy="-3" r="0.6" fill="${OUT}"/>` +
    `<path d="M-6.4,-1.2 Q-5.1,-0.2 -3.8,-1.2" fill="none" stroke="${OUT}" stroke-width="0.6" stroke-linecap="round"/></g>`;
}

/* ================================================================ small motion marks and scenery */
const motion = (x, y, dir = -1, n = 3, len = 12, c = OUT) => `<g data-sk-motion="1">${Array.from({ length: n }, (_, k) => `<line x1="${f1(x)}" y1="${f1(y + k * 6)}" x2="${f1(x + dir * len * (1 - k * 0.15))}" y2="${f1(y + k * 6)}" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>`).join('')}</g>`;
const ground = (w, y, c = '#D9CDB4') => `<rect x="0" y="${f1(y)}" width="${f1(w)}" height="${f1(400)}" fill="${c}"/>`;
const sky = (w, h, c = '#EEF6F8') => `<rect x="0" y="0" width="${f1(w)}" height="${f1(h)}" fill="${c}"/>`;
const sun = (x, y, r) => `<g data-sk-sun="1">${Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return `<line x1="${f1(x + Math.cos(a) * r * 1.3)}" y1="${f1(y + Math.sin(a) * r * 1.3)}" x2="${f1(x + Math.cos(a) * r * 1.75)}" y2="${f1(y + Math.sin(a) * r * 1.75)}" stroke="#F2B233" stroke-width="${f1(r * 0.22)}" stroke-linecap="round"/>`; }).join('')}<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#F7C948" stroke="${OUT}" stroke-width="1.2"/></g>`;
const tree = (x, y, h, c = '#6BB36B') => `<g><rect x="${f1(x - h * 0.06)}" y="${f1(y - h * 0.45)}" width="${f1(h * 0.12)}" height="${f1(h * 0.45)}" fill="#8B5E3C" stroke="${OUT}" stroke-width="1.2"/><circle cx="${f1(x)}" cy="${f1(y - h * 0.68)}" r="${f1(h * 0.32)}" fill="${c}" stroke="${OUT}" stroke-width="1.2"/></g>`;
const pine = (x, y, h, snow = false) => `<g><rect x="${f1(x - h * 0.05)}" y="${f1(y - h * 0.18)}" width="${f1(h * 0.1)}" height="${f1(h * 0.18)}" fill="#8B5E3C" stroke="${OUT}" stroke-width="1"/>${[0, 1, 2].map((k) => { const w = h * (0.42 - k * 0.1), yb = y - h * (0.15 + k * 0.25); return `<path d="M${f1(x - w)},${f1(yb)} L${f1(x)},${f1(yb - h * 0.38)} L${f1(x + w)},${f1(yb)} Z" fill="#3F8F5A" stroke="${OUT}" stroke-width="1"/>` + (snow ? `<path d="M${f1(x - w * 0.45)},${f1(yb - h * 0.2)} L${f1(x)},${f1(yb - h * 0.38)} L${f1(x + w * 0.45)},${f1(yb - h * 0.2)} Q${f1(x)},${f1(yb - h * 0.15)} ${f1(x - w * 0.45)},${f1(yb - h * 0.2)} Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.8"/>` : ''); }).join('')}</g>`;

/* ================================================================ holding hands */
/** the view point of a figure's shoulder (before the figure is drawn) */
function shoulderAt(o, side) {
  const Bd = BODY[o.age || 'adult'], s = o.s || 1, k = o.flip ? -1 : 1;
  const sx = (side === 'l' ? -1 : 1) * (Bd.sh - Bd.aw * 0.45);
  return [(o.x || 0) + k * s * sx, (o.y || 0) + s * (-Bd.shY + 2)];
}
/** the arm [ex, ey, hx, hy] (units, from the shoulder) that puts the hand at the view point (vx, vy) */
function armTo(o, side, vx, vy) {
  const s = o.s || 1, sh = shoulderAt(o, side), k = o.flip ? -1 : 1;
  const dx = (vx - sh[0]) / s * k, dy = (vy - sh[1]) / s;
  const L = Math.hypot(dx, dy), max = BODY[o.age || 'adult'].arm;
  const f = L > max ? max / L : 1;
  const hx = dx * f, hy = dy * f;
  return [hx / 2 + (side === 'l' ? -1.5 : 1.5), hy / 2 + 2.5, hx, hy];
}
/** neighbours in a row hold hands: each pair's near hands meet halfway, at about hip height of the shorter one */
function linkHands(list) {
  for (let i = 0; i + 1 < list.length; i++) {
    const a = list[i], b = list[i + 1];
    if (a.noHold || b.noHold) continue;
    const sa = shoulderAt(a, 'r'), sb = shoulderAt(b, 'l');
    const ya = Math.max(sa[1], sb[1]);
    const lower = Math.min(BODY[a.age || 'adult'].arm * (a.s || 1), BODY[b.age || 'adult'].arm * (b.s || 1));
    const tx = (sa[0] + sb[0]) / 2, ty = ya + lower * 0.7;
    if (!a.ra) a.ra = armTo(a, 'r', tx, ty);
    if (!b.la) b.la = armTo(b, 'l', tx, ty);
  }
  return list;
}

/* ================================================================ drawn objects (view box 0 0 100 100) */
/** objects the library does not have, each drawn to read as its name at print size with no label:
 *  diya       a small clay oil lamp: a shallow, pinched clay bowl with a lit wick at its lip (not a candle in a glass)
 *  envelope   a plain red envelope (hongbao): red, its flap, nothing written
 *  washboard  a wooden washboard with a ridged metal face, standing in a round metal washtub with suds
 *  candle     a white candle in a candle holder (a round dish with a ring handle), lit
 *  buggy      a horse pulling a black buggy with big spoked wheels and a folding top (side view)
 *  wall-phone a telephone on the wall: a body with a round dial, the handset on its hook and a curly cord
 *  car        a car of today (side view, rounded, four doors)
 *  cell-phone a cell phone: a dark rounded slab with a lit screen of app squares
 *  coin       one coin;  clock  a school clock;  book  a closed book */
const OBJ = {
  diya: () => `<g data-sk-drawn="diya"><circle cx="86" cy="25" r="14" fill="#FFE27A" opacity="0.55" data-sk-glow="1"/><ellipse cx="47" cy="88" rx="30" ry="4.5" fill="#8B5E3C" opacity="0.25"/>` +
    // a small round clay bowl (about 1.5 wide for 1 high), one pinched spout on the right, the wick in the spout, a teardrop flame
    `<path d="M70,49 Q80,44 93,40 Q88,51 76,57 Z" fill="#C1663B" stroke="${OUT}" stroke-width="2" stroke-linejoin="round" data-sk-spout="1"/>` +
    `<g data-sk-bowl="1"><path d="M17,53 Q19,87 47,87 Q75,87 77,53 Z" fill="#C1663B" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/>` +
    `<ellipse cx="47" cy="53" rx="30" ry="8" fill="#B5652E" stroke="${OUT}" stroke-width="2"/><ellipse cx="47" cy="55" rx="22" ry="4.5" fill="#8B5E3C"/></g>` +
    `${[[30, 70], [47, 74], [64, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#F4C542" stroke="${OUT}" stroke-width="0.8"/>`).join('')}<path d="M24,64 Q47,72 70,64" fill="none" stroke="#F4C542" stroke-width="2"/>` +
    `<line x1="89" y1="43" x2="88" y2="36" stroke="${OUT}" stroke-width="2.2" stroke-linecap="round"/><path d="M88,36 Q78,26 87,8 Q97,26 88,36 Z" fill="#F7A21B" stroke="${OUT}" stroke-width="1.6" data-sk-flame="1"/><path d="M88,33 Q84,26 87,17 Q91,26 88,33 Z" fill="#FFE27A"/></g>`,
  envelope: () => `<g data-sk-drawn="red-envelope"><rect x="26" y="12" width="48" height="76" rx="4" fill="#D7262E" stroke="${OUT}" stroke-width="2.2"/><path d="M26,30 L50,46 L74,30" fill="none" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/></g>`,
  washboard: () => `<g data-sk-drawn="washboard-and-tub"><rect x="34" y="6" width="34" height="70" rx="3" fill="#C9A66B" stroke="${OUT}" stroke-width="2"/><rect x="38" y="20" width="26" height="46" fill="#A7B3BE" stroke="${OUT}" stroke-width="1.4"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<line x1="38" y1="${24 + k * 5.5}" x2="64" y2="${24 + k * 5.5}" stroke="${OUT}" stroke-width="1.2"/>`).join('')}` +
    `<path d="M8,58 L92,58 L84,92 L16,92 Z" fill="#A7B3BE" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/><ellipse cx="50" cy="58" rx="42" ry="7" fill="#F4F8FB" stroke="${OUT}" stroke-width="2"/>${[[24, 54, 6], [36, 51, 5], [66, 52, 6], [78, 55, 5], [56, 50, 4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.2"/>`).join('')}` +
    `<line x1="20" y1="72" x2="80" y2="72" stroke="${OUT}" stroke-width="1.2"/><path d="M6,62 q-4,6 2,10 M94,62 q4,6 -2,10" fill="none" stroke="${OUT}" stroke-width="2.4"/></g>`,
  candle: () => `<g data-sk-drawn="candle-in-a-holder"><ellipse cx="50" cy="84" rx="34" ry="8" fill="#E6B422" stroke="${OUT}" stroke-width="2"/><path d="M84,80 q14,-2 12,10 q-2,8 -14,4" fill="none" stroke="#E6B422" stroke-width="5"/><path d="M84,80 q14,-2 12,10 q-2,8 -14,4" fill="none" stroke="${OUT}" stroke-width="1.2"/>` +
    `<rect x="40" y="70" width="20" height="10" rx="2" fill="#E6B422" stroke="${OUT}" stroke-width="1.6"/><rect x="42" y="28" width="16" height="44" rx="2" fill="#F7F4EE" stroke="${OUT}" stroke-width="2"/><path d="M44,30 q2,8 0,12" fill="none" stroke="#E6DBC6" stroke-width="2.4"/>` +
    `<line x1="50" y1="28" x2="50" y2="23" stroke="${OUT}" stroke-width="1.6"/><path d="M50,23 Q42,14 50,2 Q58,14 50,23 Z" fill="#F7A21B" stroke="${OUT}" stroke-width="1.5"/><path d="M50,21 Q47,15 50,9 Q53,15 50,21 Z" fill="#FFE27A"/></g>`,
  buggy: () => {
    const wheel = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${OUT}" stroke-width="2.6"/>${[0, 1, 2, 3, 4, 5].map((k) => { const a = k * Math.PI / 6; return `<line x1="${f1(cx - Math.cos(a) * r)}" y1="${f1(cy - Math.sin(a) * r)}" x2="${f1(cx + Math.cos(a) * r)}" y2="${f1(cy + Math.sin(a) * r)}" stroke="${OUT}" stroke-width="1.2"/>`; }).join('')}<circle cx="${cx}" cy="${cy}" r="2.5" fill="${OUT}"/>`;
    return `<g data-sk-drawn="horse-and-buggy">` +
      // the horse (facing left): body, neck, a long head with the muzzle down, ear, mane, tail, four legs
      `<line x1="31" y1="56" x2="29" y2="80" stroke="#7B4A26" stroke-width="4.4" stroke-linecap="round"/><line x1="55" y1="56" x2="58" y2="80" stroke="#7B4A26" stroke-width="4.4" stroke-linecap="round"/>` +
      `<path d="M58,46 Q70,46 70,58 Q66,52 62,52" fill="#4A2E1A" stroke="${OUT}" stroke-width="1.2"/>` +
      `<ellipse cx="44" cy="50" rx="18" ry="10" fill="#9B6A43" stroke="${OUT}" stroke-width="1.8"/>` +
      `<path d="M28,46 L20,26 L28,22 L36,44 Z" fill="#9B6A43" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/>` +
      `<path d="M20,26 Q14,24 6,34 Q4,38 8,39 Q13,39 18,34 Q24,30 28,22 Q24,20 20,26 Z" fill="#9B6A43" stroke="${OUT}" stroke-width="1.8" stroke-linejoin="round"/>` +
      `<path d="M23,22 L23,14 L28,21 Z" fill="#9B6A43" stroke="${OUT}" stroke-width="1.4"/><path d="M28,22 Q34,30 37,44 L34,44 Q31,32 26,24 Z" fill="#4A2E1A"/><circle cx="18" cy="28" r="1.5" fill="${OUT}"/><circle cx="8.5" cy="35.5" r="0.9" fill="${OUT}"/>` +
      `<line x1="35" y1="56" x2="36" y2="80" stroke="#9B6A43" stroke-width="4.4" stroke-linecap="round"/><line x1="52" y1="56" x2="50" y2="80" stroke="#9B6A43" stroke-width="4.4" stroke-linecap="round"/>` +
      `${[29, 36, 50, 58].map((x) => `<rect x="${x - 2.6}" y="79" width="5.2" height="3" fill="${OUT}"/>`).join('')}` +
      // the shafts and the buggy
      `<line x1="56" y1="50" x2="78" y2="58" stroke="${OUT}" stroke-width="2"/><path d="M70,40 L96,40 L96,66 L70,66 Z" fill="#2F2F33" stroke="${OUT}" stroke-width="1.8"/><path d="M72,40 Q74,22 96,22 L96,40" fill="#2F2F33" stroke="${OUT}" stroke-width="1.8"/><path d="M76,40 Q78,28 92,26" fill="none" stroke="#8C8C8C" stroke-width="1.2"/>` +
      wheel(78, 74, 12) + wheel(92, 74, 8) + `<line x1="0" y1="86" x2="100" y2="86" stroke="${OUT}" stroke-width="1.2" opacity="0.5"/></g>`;
  },
  'wall-phone': () => `<g data-sk-drawn="wall-telephone"><rect x="10" y="4" width="80" height="92" fill="#F4EBD9" stroke="${OUT}" stroke-width="1.2"/><rect x="34" y="12" width="32" height="60" rx="5" fill="#E9DFCA" stroke="${OUT}" stroke-width="2"/>` +
    `<circle cx="50" cy="48" r="11" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.6"/>${Array.from({ length: 10 }, (_, k) => { const a = -Math.PI / 2 + k * 0.55; return `<circle cx="${f1(50 + Math.cos(a) * 7.5)}" cy="${f1(48 + Math.sin(a) * 7.5)}" r="1.4" fill="${OUT}"/>`; }).join('')}<circle cx="50" cy="48" r="2.4" fill="${OUT}"/>` +
    `<rect x="62" y="14" width="10" height="40" rx="5" fill="#D9534F" stroke="${OUT}" stroke-width="1.8"/><ellipse cx="67" cy="16" rx="7" ry="5" fill="#D9534F" stroke="${OUT}" stroke-width="1.6"/><ellipse cx="67" cy="52" rx="7" ry="5" fill="#D9534F" stroke="${OUT}" stroke-width="1.6"/>` +
    `<path d="M67,57 ${Array.from({ length: 7 }, (_, k) => `q6,3 0,5`).join(' ')} q-3,6 -14,8" fill="none" stroke="${OUT}" stroke-width="1.8"/></g>`,
  car: () => `<g data-sk-drawn="car"><path d="M6,66 L8,52 Q10,46 18,44 L30,42 Q38,28 52,26 L70,26 Q80,28 88,42 L94,46 Q98,50 96,66 Z" fill="#4A7BD0" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/>` +
    `<path d="M34,42 Q42,32 52,30 L58,30 L58,42 Z" fill="#DDEFF5" stroke="${OUT}" stroke-width="1.6"/><path d="M62,30 L70,30 Q78,32 84,42 L62,42 Z" fill="#DDEFF5" stroke="${OUT}" stroke-width="1.6"/><line x1="60" y1="44" x2="60" y2="62" stroke="${OUT}" stroke-width="1.2"/>` +
    `<rect x="88" y="48" width="7" height="4" rx="1.5" fill="#F7C948" stroke="${OUT}" stroke-width="1"/><rect x="7" y="52" width="5" height="4" rx="1.5" fill="#D9534F" stroke="${OUT}" stroke-width="1"/>` +
    `<circle cx="26" cy="66" r="11" fill="${OUT}"/><circle cx="26" cy="66" r="5" fill="#A7B3BE"/><circle cx="76" cy="66" r="11" fill="${OUT}"/><circle cx="76" cy="66" r="5" fill="#A7B3BE"/></g>`,
  'cell-phone': () => `<g data-sk-drawn="cell-phone"><rect x="28" y="4" width="44" height="92" rx="9" fill="#3B3F46" stroke="${OUT}" stroke-width="2"/><rect x="32" y="14" width="36" height="70" rx="2" fill="#9CD3F0"/>` +
    `${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect x="${35 + c * 11}" y="${18 + r * 12}" width="8" height="8" rx="2" fill="${['#F2784B', '#6BB36B', '#F4C542', '#8E6CC5'][(r + c) % 4]}"/>`).join('')).join('')}<rect x="44" y="8" width="12" height="2.4" rx="1.2" fill="#8C8C8C"/><circle cx="50" cy="90" r="2.4" fill="#8C8C8C"/></g>`,
  'pumpkin-pie': () => `<g data-sk-drawn="pumpkin-pie"><ellipse cx="50" cy="72" rx="44" ry="14" fill="#A7B3BE" stroke="${OUT}" stroke-width="2"/><path d="M8,58 L14,70 Q50,86 86,70 L92,58 Z" fill="#D99A4E" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/>` +
    // the crimped crust round the edge, the smooth orange top (a pumpkin pie, not a lattice)
    `<ellipse cx="50" cy="56" rx="43" ry="18" fill="#D99A4E" stroke="${OUT}" stroke-width="2"/>${Array.from({ length: 18 }, (_, q) => { const a = q * Math.PI / 9; return `<circle cx="${f1(50 + Math.cos(a) * 40)}" cy="${f1(56 + Math.sin(a) * 16.5)}" r="4.4" fill="#D99A4E" stroke="${OUT}" stroke-width="1.1"/>`; }).join('')}` +
    `<ellipse cx="50" cy="56" rx="35" ry="13" fill="#F39C40" stroke="${OUT}" stroke-width="1.4" data-sk-filling="1"/><path d="M30,52 Q42,48 54,50" fill="none" stroke="#F7C948" stroke-width="2.4" stroke-linecap="round" opacity="0.8"/></g>`,
  'coin-hand': () => `<g data-sk-drawn="hand-with-one-coin"><path d="M18,92 L22,62 Q20,50 24,40 Q27,34 31,40 L33,52 L36,30 Q38,23 43,25 Q46,27 45,34 L44,50 L48,24 Q50,17 55,19 Q59,21 57,28 L54,50 L61,30 Q64,24 68,27 Q71,30 69,36 L63,58 Q72,48 80,48 Q87,50 83,57 Q72,68 66,80 L62,92 Z" fill="#F0C08F" stroke="${OUT}" stroke-width="2.2" stroke-linejoin="round"/><circle cx="46" cy="62" r="14" fill="#E6B422" stroke="${OUT}" stroke-width="2.2"/><circle cx="46" cy="62" r="9" fill="#F7C948" stroke="#B5542A" stroke-width="1.4"/></g>`,
  // review round 2: the one library book reads as a BOOK, like the books it leads to (a flat orange slab with white
  // lines read as a phone or a card): a closed book with a picture on its cover (a sun over a hill), a darker spine on
  // the left and the page edges showing on the right and at the bottom, held by a hand round its spine (the fingers
  // behind, the thumb on the cover)
  'book-hand': () => `<g data-sk-drawn="hand-with-one-book">` +
    `<g data-sk-book="closed"><rect x="28" y="15" width="56" height="70" rx="3" fill="#F7F4EE" stroke="${OUT}" stroke-width="2" data-sk-book-pages="1"/>${[79.5, 82].map((x) => `<line x1="${x}" y1="20" x2="${x}" y2="81" stroke="#A7B3BE" stroke-width="1"/>`).join('')}${[80.5, 83].map((y) => `<line x1="33" y1="${y}" x2="79" y2="${y}" stroke="#A7B3BE" stroke-width="1"/>`).join('')}` +
    `<rect x="22" y="9" width="56" height="70" rx="4" fill="#8E6CC5" stroke="${OUT}" stroke-width="2.4" data-sk-book-cover="1"/><rect x="22" y="9" width="9" height="70" fill="#3A3530" opacity="0.28" data-sk-book-spine="1"/>` +
    `<g data-sk-book-pic="1"><circle cx="54" cy="31" r="8" fill="#F7C948" stroke="${OUT}" stroke-width="1.2"/>${Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return `<line x1="${f1(54 + Math.cos(a) * 11)}" y1="${f1(31 + Math.sin(a) * 11)}" x2="${f1(54 + Math.cos(a) * 15)}" y2="${f1(31 + Math.sin(a) * 15)}" stroke="#F7C948" stroke-width="2.2" stroke-linecap="round"/>`; }).join('')}<path d="M31.5,77 L31.5,62 Q52,44 76,60 L76,73 Q76,77 72,77 Z" fill="#6BB36B" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"/></g></g>` +
    // the hand: the forearm from below, the palm round the spine, three fingertips behind the spine's edge, the thumb on the cover
    `<path d="M4,100 L12,76 Q14,70 20,68 L24,92 L20,100 Z" fill="#F0C08F" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/>` +
    `${[44, 53, 62].map((y) => `<rect x="14" y="${y}" width="12" height="8" rx="4" fill="#F0C08F" stroke="${OUT}" stroke-width="1.8"/>`).join('')}` +
    `<path d="M16,70 Q16,64 24,64 L40,66 Q46,67 45,72 Q44,76 38,75 L26,76 Q18,78 16,70 Z" fill="#F0C08F" stroke="${OUT}" stroke-width="2" stroke-linejoin="round" data-sk-thumb="1"/></g>`,
  coin: () => `<g data-sk-drawn="coin"><circle cx="50" cy="50" r="36" fill="#E6B422" stroke="${OUT}" stroke-width="2.4"/><circle cx="50" cy="50" r="28" fill="none" stroke="#B5542A" stroke-width="2" stroke-dasharray="3 3"/><circle cx="50" cy="50" r="14" fill="#F7C948" stroke="#B5542A" stroke-width="1.6"/></g>`,
  clock: () => `<g data-sk-drawn="clock"><circle cx="50" cy="50" r="38" fill="#FFFFFF" stroke="${OUT}" stroke-width="3"/>${Array.from({ length: 12 }, (_, k) => { const a = k * Math.PI / 6; return `<line x1="${f1(50 + Math.sin(a) * 31)}" y1="${f1(50 - Math.cos(a) * 31)}" x2="${f1(50 + Math.sin(a) * 35)}" y2="${f1(50 - Math.cos(a) * 35)}" stroke="${OUT}" stroke-width="2.4"/>`; }).join('')}<line x1="50" y1="50" x2="50" y2="26" stroke="${OUT}" stroke-width="3.4" stroke-linecap="round"/><line x1="50" y1="50" x2="66" y2="56" stroke="${OUT}" stroke-width="3.4" stroke-linecap="round"/><circle cx="50" cy="50" r="3" fill="${OUT}"/></g>`,
};
const obj = (name) => { if (!OBJ[name]) throw new Error('obj: ' + name); return OBJ[name](); };

/* ================================================================ workers and school helpers (view box 0 0 100 100) */
/** a grown-up at work, drawn with the things that show the job (never the thing the job makes: that is the match):
 *  baker (tall white hat, apron, rolling pin), builder (hard hat, safety vest, tool belt, hammer), barber (scissors and
 *  comb, a barber pole), mail-carrier (cap, uniform, a mail bag of letters), nurse (scrubs, stethoscope, a bandage),
 *  librarian (a stack of books, a bookshelf), custodian (a mop and a bucket), cook (white hat, apron, a ladle over a
 *  pot), office (a front desk with a phone and a computer). `look` = { skin, hair, hairColor }. */
function worker(kind, look) {
  const base = { x: 50, y: 98, s: 0.86, age: 'adult', ...look };
  const bg = (c = '#EAF2EE') => `<rect x="0" y="0" width="100" height="100" fill="${c}"/><rect x="0" y="86" width="100" height="14" fill="#E6DBC6"/>`;
  const hatOn = (p, svgFn) => { const h = p.head(); return svgFn(h.x, h.y, h.r); };
  if (kind === 'baker') {
    const o = { ...base, top: '#FFFFFF', bottomColor: 'dark', apron: '#F7F4EE', la: [-4, 10, 8, 14], ra: [4, 10, -8, 14] };
    const p = person(o); const H = p.hand('l');
    return bg('#F7EEDD') + p.svg + hatOn(p, (x, y, r) => `<g data-sk-drawn="baker-hat"><rect x="${f1(x - r * 1.05)}" y="${f1(y - r * 1.25)}" width="${f1(r * 2.1)}" height="${f1(r * 0.6)}" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.1"/>${[-0.7, 0, 0.7].map((k) => `<circle cx="${f1(x + k * r)}" cy="${f1(y - r * 1.7)}" r="${f1(r * 0.62)}" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.1"/>`).join('')}<rect x="${f1(x - r * 1.0)}" y="${f1(y - r * 1.55)}" width="${f1(r * 2.0)}" height="${f1(r * 0.5)}" fill="#FFFFFF"/></g>`) +
      `<g data-sk-drawn="rolling-pin"><rect x="${f1(H[0] - 2)}" y="${f1(H[1] - 3.5)}" width="${f1(24)}" height="7" rx="3.5" fill="#C9A66B" stroke="${OUT}" stroke-width="1.1"/><rect x="${f1(H[0] - 7)}" y="${f1(H[1] - 1.6)}" width="6" height="3.2" rx="1.6" fill="#8B5E3C"/><rect x="${f1(H[0] + 21)}" y="${f1(H[1] - 1.6)}" width="6" height="3.2" rx="1.6" fill="#8B5E3C"/></g>`;
  }
  if (kind === 'builder') {
    const o = { ...base, top: 'orange', bottomColor: 'denim', ra: [6, 6, 14, -2] };
    const p = person(o); const H = p.hand('r');
    return bg() + p.svg + `<g data-sk-drawn="safety-vest"><line x1="${f1(50 - 8)}" y1="${f1(97 - 0.8 * 62)}" x2="${f1(50 - 8)}" y2="${f1(97 - 0.8 * 46)}" stroke="#F7F4EE" stroke-width="2"/><line x1="${f1(50 + 8)}" y1="${f1(97 - 0.8 * 62)}" x2="${f1(50 + 8)}" y2="${f1(97 - 0.8 * 46)}" stroke="#F7F4EE" stroke-width="2"/><rect x="${f1(50 - 9)}" y="${f1(97 - 0.8 * 45)}" width="18" height="4" fill="#8B5E3C" stroke="${OUT}" stroke-width="0.8"/></g>` +
      hatOn(p, (x, y, r) => `<g data-sk-drawn="hard-hat"><path d="M${f1(x - r * 1.05)},${f1(y - r * 0.25)} Q${f1(x - r)},${f1(y - r * 1.35)} ${f1(x)},${f1(y - r * 1.35)} Q${f1(x + r)},${f1(y - r * 1.35)} ${f1(x + r * 1.05)},${f1(y - r * 0.25)} Z" fill="#F4C542" stroke="${OUT}" stroke-width="1.1"/><rect x="${f1(x - r * 1.35)}" y="${f1(y - r * 0.35)}" width="${f1(r * 2.7)}" height="${f1(r * 0.28)}" rx="1" fill="#F4C542" stroke="${OUT}" stroke-width="1"/></g>`) +
      `<g data-sk-drawn="hammer" transform="rotate(-20 ${f1(H[0])} ${f1(H[1])})"><rect x="${f1(H[0] - 1.4)}" y="${f1(H[1] - 14)}" width="2.8" height="18" fill="#B07A4E" stroke="${OUT}" stroke-width="0.8"/><rect x="${f1(H[0] - 6)}" y="${f1(H[1] - 17)}" width="12" height="5" rx="1" fill="#8C8C8C" stroke="${OUT}" stroke-width="0.9"/></g>`;
  }
  if (kind === 'barber') {
    const o = { ...base, x: 58, top: '#FFFFFF', bottomColor: 'dark', la: [-6, 6, -14, -2], ra: [6, 6, 14, -2] };
    const p = person(o); const L = p.hand('l'), R = p.hand('r');
    return bg() + `<g data-sk-drawn="barber-pole"><rect x="10" y="20" width="12" height="56" rx="6" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.3"/>${[0, 1, 2, 3, 4].map((k) => `<path d="M10,${24 + k * 11} L22,${30 + k * 11} L22,${34 + k * 11} L10,${28 + k * 11} Z" fill="${k % 2 ? '#4A7BD0' : '#D9534F'}"/>`).join('')}<rect x="8" y="16" width="16" height="6" rx="2" fill="#8C8C8C" stroke="${OUT}" stroke-width="1"/><rect x="8" y="74" width="16" height="6" rx="2" fill="#8C8C8C" stroke="${OUT}" stroke-width="1"/></g>` + p.svg +
      `<g data-sk-drawn="scissors" transform="rotate(-30 ${f1(R[0])} ${f1(R[1])})"><circle cx="${f1(R[0] - 2)}" cy="${f1(R[1] + 3)}" r="2.6" fill="none" stroke="#D9534F" stroke-width="1.4"/><circle cx="${f1(R[0] + 2)}" cy="${f1(R[1] + 3)}" r="2.6" fill="none" stroke="#D9534F" stroke-width="1.4"/><line x1="${f1(R[0] - 1)}" y1="${f1(R[1] + 1)}" x2="${f1(R[0] + 3)}" y2="${f1(R[1] - 12)}" stroke="#8C8C8C" stroke-width="1.6"/><line x1="${f1(R[0] + 1)}" y1="${f1(R[1] + 1)}" x2="${f1(R[0] - 3)}" y2="${f1(R[1] - 12)}" stroke="#8C8C8C" stroke-width="1.6"/></g>` +
      `<g data-sk-drawn="comb"><rect x="${f1(L[0] - 8)}" y="${f1(L[1] - 9)}" width="16" height="4" fill="#3B3F46"/>${[0, 1, 2, 3, 4, 5].map((k) => `<line x1="${f1(L[0] - 7 + k * 2.8)}" y1="${f1(L[1] - 5)}" x2="${f1(L[0] - 7 + k * 2.8)}" y2="${f1(L[1] - 1)}" stroke="#3B3F46" stroke-width="1"/>`).join('')}</g>`;
  }
  if (kind === 'mail-carrier') {
    const o = { ...base, top: '#7FA7D9', bottomColor: 'navy', hair: 'short', ra: [5, 8, 10, 15] };
    const p = person(o);
    return bg() + p.svg + `<g data-sk-drawn="mail-bag"><line x1="${f1(50 - 8)}" y1="${f1(97 - 0.8 * 72)}" x2="${f1(50 + 12)}" y2="${f1(97 - 0.8 * 44)}" stroke="#7A5230" stroke-width="2.4"/><rect x="${f1(50 + 6)}" y="${f1(97 - 0.8 * 50)}" width="20" height="16" rx="2" fill="#B07A4E" stroke="${OUT}" stroke-width="1.2"/>${[0, 1, 2].map((k) => `<rect x="${f1(50 + 8 + k * 5)}" y="${f1(97 - 0.8 * 50 - 6 + k)}" width="7" height="8" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.7"/>`).join('')}</g>` +
      hatOn(p, (x, y, r) => `<g data-sk-drawn="mail-cap"><path d="M${f1(x - r * 1.05)},${f1(y - r * 0.3)} Q${f1(x - r)},${f1(y - r * 1.3)} ${f1(x)},${f1(y - r * 1.28)} Q${f1(x + r)},${f1(y - r * 1.3)} ${f1(x + r * 1.05)},${f1(y - r * 0.3)} Z" fill="#3F5372" stroke="${OUT}" stroke-width="1"/><path d="M${f1(x - r * 0.8)},${f1(y - r * 0.35)} L${f1(x + r * 1.5)},${f1(y - r * 0.32)} L${f1(x + r * 1.2)},${f1(y - r * 0.1)} L${f1(x - r * 0.7)},${f1(y - r * 0.15)} Z" fill="#3F5372" stroke="${OUT}" stroke-width="0.9"/></g>`);
  }
  if (kind === 'nurse') {
    const o = { ...base, x: 44, top: '#5FA8A0', bottom: 'pants', bottomColor: '#5FA8A0', stetho: true, ra: [6, 4, 14, -4] };
    const p = person(o); const h = p.hand('r');
    return bg() + `<g data-sk-drawn="cot"><rect x="66" y="66" width="32" height="8" rx="2" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.2"/><rect x="68" y="60" width="12" height="7" rx="3" fill="#F7F4EE" stroke="${OUT}" stroke-width="1"/><line x1="70" y1="74" x2="70" y2="88" stroke="${OUT}" stroke-width="1.6"/><line x1="94" y1="74" x2="94" y2="88" stroke="${OUT}" stroke-width="1.6"/></g>` +
      p.svg + `<g data-sk-drawn="bandage" transform="rotate(-30 ${f1(h[0])} ${f1(h[1] - 4)})"><rect x="${f1(h[0] - 9)}" y="${f1(h[1] - 7)}" width="18" height="7" rx="3.5" fill="#F0C08F" stroke="${OUT}" stroke-width="0.9"/><rect x="${f1(h[0] - 3)}" y="${f1(h[1] - 7)}" width="6" height="7" fill="#F7F4EE" stroke="${OUT}" stroke-width="0.7"/></g>`;
  }
  if (kind === 'librarian') {
    const o = { ...base, x: 56, top: 'purple', bottom: 'skirt', bottomColor: 'navy', glasses: true, la: [-2, 10, 8, 8], ra: [2, 10, -8, 8] };
    const p = person(o);
    return bg('#F7EEDD') + `<g data-sk-drawn="bookshelf"><rect x="4" y="14" width="28" height="72" fill="#B07A4E" stroke="${OUT}" stroke-width="1.2"/>${[0, 1, 2].map((r) => `<line x1="4" y1="${36 + r * 22}" x2="32" y2="${36 + r * 22}" stroke="${OUT}" stroke-width="1.2"/>` + [0, 1, 2, 3].map((k) => `<rect x="${6 + k * 6.4}" y="${18 + r * 22}" width="5" height="17" fill="${['#D9534F', '#4A7BD0', '#F4C542', '#6BB36B'][(k + r) % 4]}" stroke="${OUT}" stroke-width="0.5"/>`).join('')).join('')}</g>` +
      p.svg + `<g data-sk-drawn="books-in-arms">${[0, 1, 2].map((k) => `<rect x="${f1(46)}" y="${f1(54 - k * 5)}" width="20" height="5" rx="1" fill="${['#D9534F', '#6BB36B', '#4A7BD0'][k]}" stroke="${OUT}" stroke-width="0.8"/>`).join('')}</g>`;
  }
  if (kind === 'custodian') {
    const o = { ...base, x: 46, top: '#7FA7D9', bottomColor: 'navy', ra: [6, 4, 12, -6] };
    const p = person(o); const h = p.hand('r');
    return bg() + p.svg + `<g data-sk-drawn="mop"><line x1="${f1(h[0])}" y1="${f1(h[1] - 18)}" x2="${f1(h[0] + 10)}" y2="86" stroke="#B07A4E" stroke-width="2.6"/><path d="M${f1(h[0] + 2)},86 L${f1(h[0] + 18)},86 L${f1(h[0] + 16)},${f1(80)} L${f1(h[0] + 4)},${f1(80)} Z" fill="#F7F4EE" stroke="${OUT}" stroke-width="1"/>${[0, 1, 2, 3].map((k) => `<line x1="${f1(h[0] + 4 + k * 4)}" y1="86" x2="${f1(h[0] + 3 + k * 4)}" y2="92" stroke="${OUT}" stroke-width="1"/>`).join('')}</g>` +
      `<g data-sk-drawn="bucket"><path d="M74,70 L94,70 L92,90 L76,90 Z" fill="#F4C542" stroke="${OUT}" stroke-width="1.2"/><path d="M74,70 Q84,60 94,70" fill="none" stroke="${OUT}" stroke-width="1.2"/></g>`;
  }
  if (kind === 'cook') {
    const o = { ...base, x: 40, top: '#FFFFFF', bottomColor: 'dark', apron: '#7EC8E3', ra: [6, 2, 16, -2] };
    const p = person(o); const h = p.hand('r');
    return bg('#F7EEDD') + `<g data-sk-drawn="counter-and-pot"><rect x="54" y="62" width="46" height="26" fill="#A7B3BE" stroke="${OUT}" stroke-width="1.2"/><path d="M62,62 L62,46 L90,46 L90,62 Z" fill="#8C8C8C" stroke="${OUT}" stroke-width="1.2"/><rect x="60" y="44" width="32" height="4" rx="1" fill="#5A5A5A"/>${[68, 76, 84].map((x) => `<path d="M${x},40 q3,-5 0,-10 q-3,-5 0,-10" fill="none" stroke="#8C8C8C" stroke-width="1.4"/>`).join('')}</g>` +
      p.svg + hatOn(p, (x, y, r) => `<g data-sk-drawn="cook-hat"><path d="M${f1(x - r)},${f1(y - r * 0.4)} Q${f1(x - r * 1.1)},${f1(y - r * 1.5)} ${f1(x)},${f1(y - r * 1.45)} Q${f1(x + r * 1.1)},${f1(y - r * 1.5)} ${f1(x + r)},${f1(y - r * 0.4)} Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.1"/></g>`) +
      `<g data-sk-drawn="ladle"><line x1="${f1(h[0])}" y1="${f1(h[1])}" x2="${f1(h[0] + 16)}" y2="${f1(h[1] + 10)}" stroke="#8C8C8C" stroke-width="2"/><path d="M${f1(h[0] + 13)},${f1(h[1] + 10)} q4,7 10,0 Z" fill="#8C8C8C" stroke="${OUT}" stroke-width="0.9"/></g>`;
  }
  if (kind === 'office') {
    // the school's front office (review round 1: a woman at a desk with a computer read as a teacher at her desk): a
    // high counter with a window, the staff mailboxes on the wall behind, a sign-in clipboard on the counter and the
    // school microphone for announcements. Nothing here repeats a problem card (no door, no desk, no book).
    const o = { ...base, x: 62, y: 97, top: 'teal', bottomColor: 'navy', la: [-5, 8, -7, 16], ra: [5, 8, 7, 16] };
    const p = person(o);
    const cub = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) cub.push(`<rect x="${6 + c * 9}" y="${10 + r * 9}" width="8" height="8" fill="#8B5E3C" stroke="${OUT}" stroke-width="0.6"/>` + ((r + c) % 2 ? `<rect x="${7.5 + c * 9}" y="${12 + r * 9}" width="5" height="6" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.4"/>` : ''));
    return bg('#F4EBD9') + `<g data-sk-drawn="staff-mailboxes"><rect x="4" y="8" width="31" height="40" fill="#B07A4E" stroke="${OUT}" stroke-width="1.2"/>${cub.join('')}</g>` + p.svg +
      `<g data-sk-drawn="front-counter-window"><rect x="40" y="6" width="56" height="54" fill="none" stroke="#8B5E3C" stroke-width="3.4"/><line x1="43" y1="16" x2="50" y2="9" stroke="#FFFFFF" stroke-width="1.6"/><line x1="43" y1="22" x2="56" y2="9" stroke="#FFFFFF" stroke-width="1.6"/>` +
      `<rect x="2" y="58" width="96" height="30" fill="#B07A4E" stroke="${OUT}" stroke-width="1.3"/><rect x="0" y="54" width="100" height="6" fill="#8B5E3C" stroke="${OUT}" stroke-width="1.1"/></g>` +
      `<g data-sk-drawn="sign-in-clipboard"><rect x="8" y="42" width="15" height="13" rx="1" fill="#B07A4E" stroke="${OUT}" stroke-width="0.9" transform="rotate(-8 15 48)"/><rect x="10" y="44" width="11" height="10" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.5" transform="rotate(-8 15 48)"/><path d="M12,47 h7 M12,50 h6" stroke="${OUT}" stroke-width="0.6" transform="rotate(-8 15 48)"/><rect x="13" y="41" width="5" height="3" fill="#8C8C8C" transform="rotate(-8 15 48)"/></g>` +
      `<g data-sk-drawn="microphone"><ellipse cx="86" cy="54" rx="6" ry="1.8" fill="#5A5A5A" stroke="${OUT}" stroke-width="0.8"/><path d="M86,53 L86,44 Q86,40 82,38" fill="none" stroke="#5A5A5A" stroke-width="1.6"/><ellipse cx="80" cy="36" rx="3.6" ry="4.6" fill="#3B3F46" stroke="${OUT}" stroke-width="0.8" transform="rotate(-35 80 36)"/><path d="M78.5,34 l3,3 M79,32.5 l3,3" stroke="#9AA4AE" stroke-width="0.6"/></g>`;
  }
  throw new Error('worker: ' + kind);
}

/* ================================================================ the scenery colours + PAL (the governed palette) */
/** every colour a Batch SK drawing may use: the tokens, the code colours, the skin, hair and cloth palettes and these
 *  scenery colours. qa/verify-dk-social-k.js fails any fill or stroke inside an sk-art drawing that is not in PAL. */
const SCENE = {
  wall: '#F4EBD9', floor: '#E6DBC6', floorLine: '#D2C4A8', wallMint: '#EAF2EE', wallLilac: '#F2EEF7', wallCream: '#F7EEDD', floorCream: '#E9DFCA',
  ground: '#D9CDB4', sky: '#EEF6F8', wood: '#8B5E3C', woodLight: '#B07A4E', glass: '#DDEFF5', locker: '#7FA7D9', rugPink: '#F3B7A6', rugMint: '#BFE0D8',
  bin: '#5FA8A0', binDark: '#3C7F77', leaf: '#6BB36B', pine: '#3F8F5A', grass: '#3F9B4B', sun: '#F7C948', sunRay: '#F2B233', blockRed: '#E4574B',
  tear: '#9FD3E8', tearLine: '#3B87A8', cheek: '#F08F86', mouth: '#9B3B34', mouthOpen: '#8C2F2B', sadMouth: '#2A1A14', metal: '#9AA4AE', stetho: '#5A5A5A',
  water: '#BFE3F2', waterDeep: '#2B6CB0', land: '#9CCB7C', snow: '#F4F8FB', sand: '#F1DDA6', road: '#B9B4AC', roadLine: '#F4F1EA', flagRed: '#B22234', flagBlue: '#3C3B6E',
  brick: '#C96B4B', roof: '#A8483A', stone: '#E8E2D6', clay: '#C1663B', flame: '#F7A21B', flameIn: '#FFE27A', envelope: '#D7262E', gold: '#E6B422',
  plate: '#F7F4EE', cracker: '#E8B96A', pieCrust: '#D99A4E', turkey: '#B5652E', cake: '#F7D6E0', frosting: '#FFFFFF', phone: '#3B3F46', screen: '#9CD3F0', buggy: '#2F2F33', horse: '#9B6A43', mane: '#4A2E1A',
  dusk: '#E6DDF3', lawn: '#D6EBC8', tub: '#A7B3BE', suds: '#F4F8FB', washboard: '#C9A66B', mailbox: '#3F6FD1', rope: '#C9A66B', note: '#FFF8D6',
};
const PAL = new Set([...Object.values(T), ...Object.values(TOK.codeColors || {}), ...Object.values(SKIN), ...Object.values(HAIR), ...Object.values(CLOTH), ...Object.values(PANTS), ...Object.values(SCENE)].map((c) => c.toUpperCase()));

module.exports = { worker, shoulderAt, armTo, linkHands, OBJ, obj, SCENE, PAL, person, reachTo, babyBundle, motion, ground, sky, sun, tree, pine, seg, circ, pathF, SKIN, HAIR, CLOTH, PANTS, BODY, OUT, f1 };
