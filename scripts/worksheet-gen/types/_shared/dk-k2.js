/**
 * dk-k2.js — Batch K2 (Daily Teaching System Stage D-5, 2026-11-23): the four Kindergarten health lessons the year
 * design marked teacher-led, each given a page (rule P3: a routine alone is one asset):
 *   K-708 calm      Calm-Down Tools                 (feelings, NHES.8.2.1)
 *   K-709 kind      Kind Words and Kind Hands       (feelings, NHES.4.2.5)
 *   K-710 space     My Space Bubble: Ask First      (feelings, NHES.4.2.4)
 *   K-711 germs     Germ Busters: When Do I Wash?   (healthy-habits, NHES.7.2.2)
 * English only; themeless; PDF only. Built on the Batch K factory (types/_shared/dk-kinder.js): its type wrapper,
 * CSS, page check (dkVerifyInPage) and refusal of other locales; this file only REGISTERS four new modes in its MODES
 * table and adds the K2 page checks (k2VerifyInPage). dk-kinder.js itself is not edited (Batch K pages stay byte-identical).
 *
 * The drawn figures: faceless side-view children (the habit-pictogram grammar: head, torso, round-capped limbs, a white
 * halo on the near arm), the child the item is about in INK, the friend who acts in TEAL. They show only what the
 * library cannot: a kind or unkind act, a hello between two children, asking before a hug, stopping.
 * Bank: data/science/dk-k2.js. Gate: qa/verify-dk-k2.js.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const { strokeWordLane } = require('../../primitives/trace-path.js');
const DK = require('./dk-kinder.js');
const B = require('../../data/science/dk-k2.js');

const T = TOK.color;
const W = 675;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const f1 = (n) => (Math.round(n * 10) / 10).toString();

/* ================================================================ layout kit (the dk-kinder conventions) */
const pic = (p, px, extra = '') => `<img class="ws-icon" data-dk-pic="${esc(p.theme + '/' + p.noun)}" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${px}px;height:${px}px;display:block;object-fit:contain"${extra}>`;
const box = (cls, w, h, inner, attrs = '', style = '') => `<div class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''} style="flex-shrink:0;width:${typeof w === 'number' ? w + 'px' : w};height:${typeof h === 'number' ? h + 'px' : h};${style}">${inner}</div>`;
const tile = (inner, w, h, attrs = '', mod = '') => box('dk-tile' + (mod ? ' dk-tile--' + mod : ''), w, h, inner, attrs);
const drawBox = (w, h, attrs = '', inner = '') => box('dk-draw', w, h, inner, 'data-dk-draw' + (attrs ? ' ' + attrs : ''));
const labelledDraw = (w, h, label, attrs = '') => drawBox(w, h, attrs, `<span class="dk-head" style="position:absolute;left:12px;top:6px">${esc(label)}</span>`);
const word = (text, style = '') => `<span class="dk-word" data-dk-box${style ? ` style="${style}"` : ''}>${esc(text)}</span>`;
const head = (text) => `<span class="dk-head" data-dk-box>${esc(text)}</span>`;
const col = (inner, gap = 6, extra = '') => `<div style="display:flex;flex-direction:column;align-items:center;gap:${gap}px;${extra}">${inner}</div>`;
const row = (inner, gap = 12, extra = '') => `<div class="dk-row" style="gap:${gap}px;${extra}">${inner}</div>`;
const grow = (inner, extra = '') => `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;${extra}">${inner}</div>`;
const band = (inner, attrs = '') => box('dk-tile', W, 'auto', inner, attrs, 'flex:1 1 0;min-height:0');
/** a speech bubble the teacher reads aloud (a rounded box with a tail) */
const bubble = (text, attrs = '', size = 20) => `<span class="k2-bubble" data-dk-box${attrs ? ' ' + attrs : ''} style="font-size:${size}px;line-height:${size + 4}px">${esc(text)}</span>`;
const heart = (attrs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="31" viewBox="0 0 26 24" style="display:block" data-dk-box${attrs ? ' ' + attrs : ''}><path d="M13 22 C 4 15 1 11 1 7 C 1 3 4 1 7 1 C 10 1 12 3 13 5 C 14 3 16 1 19 1 C 22 1 25 3 25 7 C 25 11 22 15 13 22 Z" fill="#FFFFFF" stroke="${T.coral}" stroke-width="2"/></svg>`;
const K2CSS = `<style>
.k2-bubble{position:relative;display:inline-block;box-sizing:border-box;background:#FFFFFF;border:2.5px solid ${T.teal};border-radius:18px;padding:6px 16px;font-family:'Baloo 2',cursive;font-weight:700;color:${T.ink};white-space:nowrap;margin-bottom:8px}
.k2-bubble::after{content:'';position:absolute;left:22px;bottom:-11px;width:16px;height:16px;background:#FFFFFF;border-right:2.5px solid ${T.teal};border-bottom:2.5px solid ${T.teal};transform:rotate(45deg) skew(10deg,10deg)}
.k2-num{display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:40px;height:40px;border-radius:50%;border:2.5px solid ${T.teal};background:#FFFFFF;font-family:'Baloo 2',cursive;font-weight:700;font-size:24px;color:${T.teal}}
</style>`;

/* ================================================================ answer places (no tell) */
const { placesFor, patterned } = DK;

/* ================================================================ the drawn figures */
/* Local frame (100 units, facing RIGHT): head (52, 15+dy) r 10, torso M45,27+dy .. V60+dy, shoulder (53, 31+dy), hip
 * (52, H), ground y 95; dy = H - 58 (H = 58 standing, 72 kneeling, 84 sitting on the ground, 66 on a bench). */
const HIP = { stand: 58, walk: 58, kick: 58, kneel: 72, sit: 84, bench: 66 };
const ln = (x1, y1, x2, y2, w, c) => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const foot = (x, y, c) => `<rect x="${f1(x)}" y="${f1(y)}" width="10" height="4" rx="2" ry="2" fill="${c}"/>`;
function legs(kind, c) {
  if (kind === 'walk') return ln(49, 58, 40, 91, 8, c) + ln(55, 58, 64, 91, 8, c) + foot(36, 91, c) + foot(61, 91, c);
  if (kind === 'kick') return ln(49, 58, 46, 91, 8, c) + foot(42, 91, c) + ln(55, 58, 82, 72, 8, c) + `<circle cx="86" cy="71" r="5" fill="${c}"/>`;
  if (kind === 'kneel') return ln(49, 72, 42, 91, 8, c) + ln(42, 91, 26, 92, 8, c) + ln(55, 72, 70, 74, 8, c) + ln(70, 74, 71, 91, 8, c) + foot(68, 91, c);
  if (kind === 'none') return '';   // a head-and-shoulders card (the cough card): nothing drawn outside its crop
  if (kind === 'sit-tip') return ln(49, 86, 80, 90, 8, c) + ln(55, 84, 74, 64, 8, c) + `<circle cx="77" cy="61" r="5" fill="${c}"/>`;
  if (kind === 'sit') return ln(49, 86, 82, 91, 8, c) + ln(55, 84, 86, 87, 8, c) + `<rect x="84" y="80" width="5" height="11" rx="2" fill="${c}"/>`;
  if (kind === 'bench') return ln(50, 66, 72, 67, 8, c) + ln(55, 66, 75, 66, 8, c) + ln(72, 67, 72, 91, 8, c) + ln(75, 66, 76, 91, 8, c) + foot(70, 91, c) + foot(73, 91, c);
  return ln(49, 58, 48, 91, 8, c) + ln(55, 58, 57, 91, 8, c) + foot(45, 91, c) + foot(54, 91, c);
}
/** a hand at (x,y): dot, an OPEN palm (fingers spread: the classroom stop hand; also the high five and the wave), or a fist */
function hand(kind, x, y, c, near) {
  const ring = near ? ` stroke="#FFFFFF" stroke-width="2" paint-order="stroke"` : '';
  if (kind === 'palm') {
    const fingers = [[-4.6, -14.5], [-1.6, -16], [1.6, -16], [4.6, -14]].map(([dx, dy], k) => [x - 4.5 + 3 * k, y - 3, x + dx, y + dy]);
    const thumb = [x + 4.5, y + 2, x + 9.5, y - 3];
    const strokes = (w, col) => [...fingers, thumb].map(([a, b, cc, d]) => `<line x1="${f1(a)}" y1="${f1(b)}" x2="${f1(cc)}" y2="${f1(d)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`).join('');
    return `<g data-k2-palm="1">` + (near ? strokes(5.6, '#FFFFFF') + `<rect x="${f1(x - 6.5)}" y="${f1(y - 5)}" width="13" height="12" rx="4" fill="#FFFFFF"/>` : '') +
      strokes(3.4, c) + `<rect x="${f1(x - 5.5)}" y="${f1(y - 4)}" width="11" height="10" rx="3.5" fill="${c}"/></g>`;
  }
  if (kind === 'fist') return `<circle cx="${f1(x)}" cy="${f1(y)}" r="5.5" fill="${c}"${ring}/>`;
  if (kind === 'none') return '';
  return `<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" fill="${c}"${ring}/>`;
}
function arm(sh, a, kind, c, near) {
  if (!a) return '';
  const E = [sh[0] + a[0], sh[1] + a[1]], H = [sh[0] + a[2], sh[1] + a[3]];
  const pts = `${f1(sh[0])},${f1(sh[1])} ${f1(E[0])},${f1(E[1])} ${f1(H[0])},${f1(H[1])}`;
  return (near ? `<polyline points="${pts}" fill="none" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>` : '') +
    `<polyline points="${pts}" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` + hand(kind, H[0], H[1], c, near);
}
/**
 * fig({ x, y, s, dir, color, hip, lean, near, far, nearHand, farHand, tears }) -> { svg, at(lx,ly) -> view point,
 * local(vx,vy) -> local point } . (x,y) = the feet centre in view units; near / far = [ex, ey, hx, hy] from the
 * shoulder (local units, facing right); lean = degrees the upper body turns about the hip (+ = forward).
 */
function fig(o) {
  const c = o.color || T.ink, H = HIP[o.hip || 'stand'], dy = H - 58, s = o.s || 0.9, dir = o.dir || 1, lean = o.lean || 0;
  const sh = [53, 31 + dy];
  const rot = (p) => { const a = lean * Math.PI / 180, dx = p[0] - 52, dyy = p[1] - H; return [52 + dx * Math.cos(a) - dyy * Math.sin(a), H + dx * Math.sin(a) + dyy * Math.cos(a)]; };
  const toView = (p) => [o.x + dir * s * (p[0] - 52), o.y + s * (p[1] - 95)];
  const upper = arm(sh, o.far, o.farHand || 'dot', c, false) +
    `<path d="M45,${27 + dy} H58 Q61,${27 + dy} 61,${31 + dy} V${60 + dy} H45 Z" fill="${c}"/>` +
    `<circle cx="52" cy="${15 + dy}" r="10" fill="${c}" data-k2-head="1"/>` +
    (o.tears ? [[64, 13 + dy], [67, 20 + dy]].map(([x, y]) => `<path d="M${x} ${y} q2.4 3.6 0 5.4 q-2.4 -1.8 0 -5.4 Z" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="1.2" data-k2-tear="1"/>`).join('') : '') +
    arm(sh, o.near, o.nearHand || 'dot', c, true);
  const inner = legs(o.hip === 'stand' || !o.hip ? (o.legs || 'stand') : (o.legs || o.hip), c) + `<g transform="rotate(${f1(lean)} 52 ${H})">${upper}</g>`;
  const svgOut = `<g transform="translate(${f1(o.x)} ${f1(o.y)}) scale(${f1(dir * s)} ${f1(s)}) translate(-52 -95)" data-k2-fig="${o.who || 'child'}" data-k2-lean="${f1(lean)}">${inner}</g>`;
  return {
    svg: svgOut,
    // the view point of a local point of the UPPER body (after the lean)
    at: (lx, ly) => toView(rot([lx, ly])),
    shoulderView: () => toView(rot(sh)),
    /** the arm [ex, ey, hx, hy] (from the shoulder, local) that puts the hand at the view point (vx, vy) */
    reach: (vx, vy, bend = -6) => {
      const lx = 52 + (vx - o.x) / (dir * s), ly = 95 + (vy - o.y) / s;
      const a = -lean * Math.PI / 180, dx = lx - 52, dyy = ly - H;
      const p = [52 + dx * Math.cos(a) - dyy * Math.sin(a), H + dx * Math.sin(a) + dyy * Math.cos(a)];
      const hx = p[0] - sh[0], hy = p[1] - sh[1];
      return [hx / 2, hy / 2 + bend, hx, hy];
    },
  };
}
const mark = (d, c = T.ink) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" data-k2-motion="1"/>`;
const imgAt = (p, cx, cy, w, h, rot = 0) => `<g transform="rotate(${f1(rot)} ${f1(cx)} ${f1(cy)})"><image href="${fileUri(p.theme, p.noun)}" x="${f1(cx - w / 2)}" y="${f1(cy - h / 2)}" width="${f1(w)}" height="${f1(h)}" preserveAspectRatio="xMidYMid meet" data-dk-pic="${esc(p.theme + '/' + p.noun)}"/></g>`;
const block = (cx, cy, sz = 15, rot = 0) => `<rect x="${f1(cx - sz / 2)}" y="${f1(cy - sz / 2)}" width="${sz}" height="${sz}" rx="2" fill="${T.coralSoft}" stroke="${T.coral}" stroke-width="2" transform="rotate(${f1(rot)} ${f1(cx)} ${f1(cy)})" data-k2-block="1"/>`;
/** an impact burst (a push lands): short rays around (cx, cy) */
const impact = (cx, cy) => `<g data-k2-impact="1">${[[-1, -1], [0, -1.3], [1, -1], [1.3, 0], [1, 1]].map(([dx, dy]) => `<line x1="${f1(cx + dx * 5)}" y1="${f1(cy + dy * 5)}" x2="${f1(cx + dx * 10)}" y2="${f1(cy + dy * 10)}" stroke="${T.coral}" stroke-width="2.6" stroke-linecap="round"/>`).join('')}</g>`;
const downArrow = (x, y1, y2) => `<g data-k2-downarrow="1"><line x1="${x}" y1="${y1}" x2="${x}" y2="${y2 - 5}" stroke="${T.ink}" stroke-width="2.4" stroke-linecap="round"/><polygon points="${x},${y2} ${x - 4},${y2 - 6} ${x + 4},${y2 - 6}" fill="${T.ink}"/></g>`;
const ground = (w = 160) => `<line x1="2" y1="100" x2="${w - 2}" y2="100" stroke="${T.grid}" stroke-width="2.5"/>`;
const VIEW = [160, 110];
const card = (body, w, h, attrs, vb = `0 0 ${VIEW[0]} ${VIEW[1]}`) => `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="${vb}" style="display:block;overflow:hidden" ${attrs}>${ground()}${body}</svg>`;
/** the hello cards are cropped to the two children (every hello spans x 18..142, y 2..104) so they print larger */
const HELLO_VB = '14 0 132 106';
const HELLO_WORD = { hug: 'hug', 'high-five': 'high five', wave: 'wave', 'fist-bump': 'fist bump' };

/* ---------------------------------------------------------------- K-709 the kind / unkind scenes */
const CRAYON = { theme: 'classroom', noun: 'crayon' };
const CRAYONS = { theme: 'toys', noun: 'crayons' };   // three crayons: the spilled pile reads at card size (one crayon did not)
const BALL = { theme: 'toys', noun: 'ball' };
/** a scene's drawing: 'situation' (the child alone), 'kind' or 'unkind' (the friend acts) */
function sceneArt(id, which) {
  const F = (o) => fig({ s: 0.9, ...o });
  let b = '';
  if (id === 'crayons') {
    const A0 = F({ x: 40, y: 100, hip: 'kneel' });
    // review round 3: in the kind card BOTH children reach into the pile (a friend's hand alone on it could read as taking)
    b += F({ x: 40, y: 100, hip: 'kneel', near: which === 'kind' ? A0.reach(80, 90, 2) : [8, 14, 16, 42] }).svg;
    if (which !== 'unkind') b += imgAt(CRAYONS, 86, 89, 34, 34, 80) + imgAt(CRAYONS, 108, 91, 30, 30, -70);
    if (which === 'kind') {
      const Fr = F({ x: 128, y: 100, dir: -1, hip: 'kneel', color: T.teal, who: 'friend' });
      b += F({ x: 128, y: 100, dir: -1, hip: 'kneel', color: T.teal, who: 'friend', near: Fr.reach(110, 92, 2) }).svg;
    } else if (which === 'unkind') {
      b += F({ x: 136, y: 100, dir: -1, legs: 'kick', color: T.teal, who: 'friend', near: [-6, 14, -2, 26], lean: -6 }).svg;
      b += imgAt(CRAYON, 84, 56, 24, 56, 40) + imgAt(CRAYON, 100, 40, 24, 56, 120) + imgAt(CRAYON, 70, 70, 24, 56, 160) +
        mark('M106 70 q-6 -8 -14 -10') + mark('M110 78 q-8 -4 -16 -2') + mark('M100 62 q-4 -10 -10 -12');
    }
  } else if (id === 'tower') {
    const A = F({ x: 36, y: 100, hip: 'kneel', near: [10, 8, 20, 16] });
    b += A.svg;
    if (which !== 'unkind') b += block(78, 92) + block(78, 77) + block(78, 62);
    if (which === 'kind') {
      // review round 3: the block is held in the AIR above the tower (a gap and a short down arrow), the hand at its side:
      // a hand ON the top block read as taking it
      const Fr = F({ x: 118, y: 100, dir: -1, hip: 'kneel', color: T.teal, who: 'friend' });
      b += block(78, 34).replace('data-k2-block="1"', 'data-k2-block="1" data-k2-added="1"') + downArrow(78, 44, 52) + F({ x: 118, y: 100, dir: -1, hip: 'kneel', color: T.teal, who: 'friend', near: Fr.reach(88, 36, 0) }).svg;
    } else if (which === 'unkind') {
      b += F({ x: 134, y: 100, dir: -1, legs: 'kick', color: T.teal, who: 'friend', near: [-6, 14, -2, 26], lean: -6 }).svg;
      b += block(80, 92, 15, 30) + block(92, 66, 15, -25) + block(72, 52, 15, 50) + mark('M106 72 q-6 -8 -14 -10') + mark('M110 80 q-8 -4 -16 -2');
    }
  } else if (id === 'fell') {
    const tufts = [14, 30, 120, 146].map((x) => `<path d="M${x} 100 l-3 -7 M${x} 100 l0 -9 M${x} 100 l3 -7" stroke="${T.teal}" stroke-width="1.8" stroke-linecap="round"/>`).join('');
    b += tufts;
    if (which === 'unkind') {
      // review round 3: an upright friend with straight arms cannot read as lifting; the child, pushed, tips over with a leg up
      const A = F({ x: 46, y: 100, hip: 'sit', legs: 'sit-tip', lean: -34, tears: true, near: [-4, 12, -8, 24] });
      const [cx, cy] = A.at(60, 66);
      const Fr = F({ x: 98, y: 100, dir: -1, color: T.teal, who: 'friend' });
      b += A.svg + F({ x: 98, y: 100, dir: -1, color: T.teal, who: 'friend', near: Fr.reach(cx + 3, cy - 2, 0), far: Fr.reach(cx + 3, cy + 5, 0) }).svg +
        impact(cx - 1, cy + 1) + mark('M14 48 q-8 6 -9 14') + mark('M20 38 q-10 3 -14 11') + mark('M26 30 q-10 1 -15 8');
    } else {
      const A0 = F({ x: 44, y: 100, hip: 'sit', tears: true });
      const target = which === 'kind' ? [86, 52] : null;
      const A = F({ x: 44, y: 100, hip: 'sit', tears: true, near: target ? A0.reach(target[0] - 2, target[1]) : [6, 12, 12, 24] });
      b += A.svg;
      if (which === 'kind') {
        const Fr = F({ x: 118, y: 100, dir: -1, color: T.teal, who: 'friend', lean: 18 });
        b += F({ x: 118, y: 100, dir: -1, color: T.teal, who: 'friend', lean: 18, near: Fr.reach(target[0] + 2, target[1]) }).svg;
      }
    }
  } else if (id === 'alone') {
    b += `<rect x="20" y="70" width="62" height="6" rx="2" fill="${T.creamDeep}" stroke="${T.ink}" stroke-width="2"/>` + ln(26, 76, 26, 100, 3, T.ink) + ln(76, 76, 76, 100, 3, T.ink);
    if (which === 'unkind') {
      const A = F({ x: 40, y: 100, hip: 'bench', lean: -30, near: [2, 12, 4, 24] });
      const [cx, cy] = A.at(60, 46);
      const Fr = F({ x: 92, y: 100, dir: -1, color: T.teal, who: 'friend' });
      b += A.svg + F({ x: 92, y: 100, dir: -1, color: T.teal, who: 'friend', near: Fr.reach(cx + 3, cy - 2, 0), far: Fr.reach(cx + 3, cy + 5, 0) }).svg +
        impact(cx - 1, cy + 1) + mark('M10 42 q-6 4 -8 10') + mark('M14 32 q-8 2 -12 8');
    } else {
      b += F({ x: 42, y: 100, hip: 'bench', near: [2, 12, 4, 24] }).svg;
      if (which === 'kind') {
        const Fr = F({ x: 128, y: 100, dir: -1, color: T.teal, who: 'friend' });
        b += F({ x: 128, y: 100, dir: -1, color: T.teal, who: 'friend', near: Fr.reach(96, 56) }).svg + imgAt(BALL, 92, 52, 16, 16);
      }
    }
  }
  return b;
}

/* ---------------------------------------------------------------- K-710 hellos, the space bubble, stopping */
function helloArt(kind) {
  const F = (o) => fig({ s: 0.98, ...o });
  if (kind === 'hug') {
    const A0 = F({ x: 66, y: 100 }), B0 = F({ x: 96, y: 100, dir: -1, color: T.teal, who: 'friend' });
    const [bx, by] = B0.shoulderView(), [ax, ay] = A0.shoulderView();
    return F({ x: 96, y: 100, dir: -1, color: T.teal, who: 'friend', near: B0.reach(ax - 6, ay + 8) }).svg + F({ x: 66, y: 100, near: A0.reach(bx + 6, by + 8) }).svg;
  }
  if (kind === 'high-five') {
    const A0 = F({ x: 52, y: 100 }), B0 = F({ x: 108, y: 100, dir: -1, color: T.teal, who: 'friend' });
    return F({ x: 52, y: 100, near: A0.reach(77, 20, -2), nearHand: 'palm' }).svg + F({ x: 108, y: 100, dir: -1, color: T.teal, who: 'friend', near: B0.reach(83, 20, -2), nearHand: 'palm' }).svg +
      mark('M74 10 l-3 -5') + mark('M80 8 v-6') + mark('M86 10 l3 -5');
  }
  if (kind === 'wave') {
    // review round 3: the old hand flat beside the head read as covering the ears; the arm now goes up and OUT
    const arcs = (x, y) => mark(`M${x - 11} ${y - 4} q-4 6 0 12`) + mark(`M${x + 11} ${y - 4} q4 6 0 12`);
    const A0 = F({ x: 34, y: 100 }), B0 = F({ x: 126, y: 100, dir: -1, color: T.teal, who: 'friend' });
    return F({ x: 34, y: 100, near: A0.reach(58, 20, 0), nearHand: 'palm' }).svg + F({ x: 126, y: 100, dir: -1, color: T.teal, who: 'friend', near: B0.reach(102, 20, 0), nearHand: 'palm' }).svg + arcs(58, 14) + arcs(102, 14);
  }
  // fist bump
  const A0 = F({ x: 52, y: 100 }), B0 = F({ x: 108, y: 100, dir: -1, color: T.teal, who: 'friend' });
  const [, sy] = A0.shoulderView();
  return F({ x: 52, y: 100, near: A0.reach(75, sy + 4, 2), nearHand: 'fist' }).svg + F({ x: 108, y: 100, dir: -1, color: T.teal, who: 'friend', near: B0.reach(85, sy + 4, 2), nearHand: 'fist' }).svg +
    mark(`M80 ${f1(sy - 8)} v-6`) + mark(`M73 ${f1(sy - 6)} l-3 -5`) + mark(`M87 ${f1(sy - 6)} l3 -5`);
}
/** the space bubble: a child with both arms stretched out inside a hoop */
function bubbleArt() {
  const A = fig({ x: 80, y: 100, s: 0.82, near: [14, -2, 28, -2], far: [-12, -2, -24, -2] });
  return `<circle cx="80" cy="58" r="45" fill="${T.tealSoft}" stroke="${T.teal}" stroke-width="3" stroke-dasharray="7 5" data-k2-hoop="1"/>` + A.svg;
}
/** a stop item card: the friend (teal) shows a STOP hand in every card; `act` is what YOU (ink) do. Review round 3: the
 *  stop hand is ONE open palm, held forward at chest height, facing the other child, fully inside the card. */
function stopHand(B0, towardX) { const [sx, sy] = B0.shoulderView(); return B0.reach(towardX, sy + 7, 0); }
function stopArt(act) {
  const F = (o) => fig({ s: 0.95, ...o });
  if (act === 'keep-hugging') {
    const A0 = F({ x: 62, y: 100 }), B0 = F({ x: 98, y: 100, dir: -1, color: T.teal, who: 'friend' });
    const [bx, by] = B0.shoulderView();
    // the friend is drawn LAST so the stop hand lies over the hugging arm (drawn under it, the hand was hidden)
    return F({ x: 62, y: 100, near: A0.reach(bx + 6, by + 8) }).svg + F({ x: 98, y: 100, dir: -1, color: T.teal, who: 'friend', near: stopHand(B0, 80), nearHand: 'palm' }).svg;
  }
  if (act === 'keep-chasing') {
    // a chasing game: you RUN on (legs in a stride, leaning in, arms out, speed marks) at the friend who has turned
    // round with the stop hand
    const A0 = F({ x: 52, y: 100, legs: 'walk', lean: 16 });
    const B0 = F({ x: 124, y: 100, dir: -1, color: T.teal, who: 'friend' });
    return F({ x: 124, y: 100, dir: -1, color: T.teal, who: 'friend', near: stopHand(B0, 104), nearHand: 'palm' }).svg +
      F({ x: 52, y: 100, legs: 'walk', lean: 16, near: A0.reach(84, 52, 4), far: A0.reach(80, 60, 4) }).svg + mark('M18 40 h-12') + mark('M20 52 h-14') + mark('M18 64 h-12');
  }
  // you stopped: a step back from the hug (a back arrow under your feet, pointing AWAY from the friend: speed lines behind
  // you read as running AT the friend, review round 3), or standing still in the chase; hands down at your sides
  const back = act === 'step-back';
  const B0 = F({ x: 114, y: 100, dir: -1, color: T.teal, who: 'friend' });
  return F({ x: 114, y: 100, dir: -1, color: T.teal, who: 'friend', near: stopHand(B0, 94), nearHand: 'palm' }).svg +
    F({ x: back ? 40 : 52, y: 100, lean: back ? -6 : 0, near: [2, 14, 3, 28] }).svg +
    (back ? `<g data-k2-backarrow="-1"><line x1="62" y1="106" x2="28" y2="106" stroke="${T.ink}" stroke-width="2.6" stroke-linecap="round"/><polygon points="22,106 30,101 30,111" fill="${T.ink}"/></g>` : '');
}
/** someone does not stop: what you do (tell the teacher, or push). The row's cards share a view with headroom so the
 *  teacher (review round 3) is drawn as a TALL grown-up whose head is well above the child's. */
const NOTSTOP_VB = '0 -16 160 126';
function notStopArt(which) {
  const F = (o) => fig({ s: 0.9, ...o });
  if (which === 'context') {
    // you (ink) hold your stop hand forward at chest height; the friend (teal) keeps hugging
    const A0 = F({ x: 60, y: 100 }), B0 = F({ x: 92, y: 100, dir: -1, color: T.teal, who: 'friend' });
    const [ax, ay] = A0.shoulderView();
    return F({ x: 92, y: 100, dir: -1, color: T.teal, who: 'friend', near: B0.reach(ax - 6, ay + 8) }).svg + F({ x: 60, y: 100, near: stopHand(A0, 76), nearHand: 'palm' }).svg;
  }
  if (which === 'tell-teacher') {
    const Tch = F({ x: 116, y: 100, s: 1.22, dir: -1, color: T.inkSoft, who: 'teacher' });
    return F({ x: 40, y: 100, legs: 'walk', near: [8, 10, 16, 18] }).svg + F({ x: 116, y: 100, s: 1.22, dir: -1, color: T.inkSoft, who: 'teacher', near: Tch.reach(92, 46, 4) }).svg;
  }
  // push: you upright, both arms straight out, an impact burst, the friend tipping away
  const B0 = F({ x: 112, y: 100, dir: -1, color: T.teal, who: 'friend', lean: -24 });
  const [cx, cy] = B0.at(56, 40);
  const A0 = F({ x: 66, y: 100 });
  return B0.svg + F({ x: 66, y: 100, near: A0.reach(cx - 3, cy - 2, 0), far: A0.reach(cx - 3, cy + 5, 0) }).svg + impact(cx + 1, cy + 1) + mark('M140 40 q6 4 8 10') + mark('M136 30 q8 2 12 8');
}

/* ---------------------------------------------------------------- K-711 the cough card */
/** a child (faceless, ink, facing right) coughing into a raised elbow: the upper arm forward and up, the ELBOW in front of
 *  the mouth (the inside of the elbow covers it), the forearm back across the lower face (the top of the head stays clear); small cough marks at the
 *  elbow. Cropped to the head and shoulders so it reads at checklist size. Review round 4: replaces the library elbow. */
function coughSvg(px) {
  const A = fig({ x: 52, y: 95, s: 1, legs: 'none', near: [13, -9, -10, -14], nearHand: 'none', far: [1, 14, 2, 26] });
  const marks = [['M74 15 l5 -3', 1], ['M76 22 h6', 2], ['M74 29 l5 3', 3]].map(([d, k]) => `<path d="${d}" fill="none" stroke="${T.ink}" stroke-width="2.2" stroke-linecap="round" data-k2-coughmark="${k}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(px)}" height="${f1(px)}" viewBox="30 2 55 55" style="display:block;overflow:hidden" data-dk-box data-k2-cough="1">${A.svg}${marks}</svg>`;
}

/* ---------------------------------------------------------------- K-708 the calm-down tool cards */
function fistSvg(px) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(px)}" height="${f1(px)}" viewBox="0 0 60 60" style="display:block" data-k2-fist="1">` +
    `<rect x="20" y="44" width="20" height="12" rx="3" fill="${T.coralSoft}" stroke="${T.ink}" stroke-width="2.5"/>` +
    `<rect x="11" y="18" width="38" height="30" rx="11" fill="${T.coralSoft}" stroke="${T.ink}" stroke-width="2.5"/>` +
    [15.5, 24.5, 33.5, 42.5].map((x) => `<circle cx="${x}" cy="18" r="5.2" fill="${T.coralSoft}" stroke="${T.ink}" stroke-width="2.5"/>`).join('') +
    `<rect x="11" y="15" width="38" height="8" fill="${T.coralSoft}"/>` + [20, 29, 38].map((x) => `<line x1="${x}" y1="14" x2="${x}" y2="26" stroke="${T.ink}" stroke-width="2"/>`).join('') +
    `<path d="M11 30 Q14 40 26 38 L36 34" fill="${T.coralSoft}" stroke="${T.ink}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
const smallArrow = (w = 34) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="24" viewBox="0 0 ${w} 24" style="display:block"><line x1="3" y1="12" x2="${w - 12}" y2="12" stroke="${T.ink}" stroke-width="3.5" stroke-linecap="round"/><polygon points="${w - 2},12 ${w - 13},5 ${w - 13},19" fill="${T.ink}"/></svg>`;
/* ================================================================ the pages */
const MODES = DK.MODES;

/* ---------------------------------------------------------------- K-708 calm */
const star = (px = 40) => `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 24 24" style="display:block" data-dk-box><path d="M12 1.8 L14.9 8.4 L22 9 L16.6 13.7 L18.3 20.8 L12 17 L5.7 20.8 L7.4 13.7 L2 9 L9.1 8.4 Z" fill="#FFFFFF" stroke="${T.coral}" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
/** one tool as a wide band: its picture(s) left, its words right */
function toolBand(t, h, attrs = '') {
  const px = Math.round(h * 0.62);
  let art;
  if (t.id === 'breathe') art = row(pic(t.pics[0], px) + pic(t.pics[1], px), 10);
  else if (t.id === 'count') { const n = Math.min(46, Math.round(h * 0.4)); art = `<div style="display:flex;gap:6px" data-dk-box data-k2-count="1">${[1, 2, 3, 4, 5].map((k) => `<span class="k2-num" style="width:${n}px;height:${n}px;font-size:${Math.round(n * 0.6)}px">${k}</span>`).join('')}</div>`; }
  else { const q = Math.round(px * 0.62); art = row(`<div data-dk-box style="line-height:0;display:flex;gap:2px" data-k2-fists="2">${fistSvg(q)}<div style="transform:scaleX(-1)">${fistSvg(q)}</div></div>` + smallArrow(30) + `<div data-dk-box style="display:flex;gap:2px">${pic(t.pics[0], q)}<div style="transform:scaleX(-1)">${pic(t.pics[0], q)}</div></div>`, 6); }
  const words = col(t.label.map((x) => word(x, 'font-size:20px;line-height:24px;text-align:left')).join(''), 0, 'align-items:flex-start');
  return box('dk-tile dk-tile--white', W - 40, h, row(`<div style="width:270px;display:flex;justify-content:center">${art}</div>` + `<div style="width:300px">${words}</div>`, 20), `data-k2-tool="${t.id}" ${attrs}`);
}
MODES['k2-calm'] = function calm(d) {
  const C = B.CALM;
  const one = d.tools === 1;
  const upset = row(C.upset.map((p) => pic(p, one ? 74 : 56)).join('') + head('When I feel upset, I can:'), 12);
  const tools = one ? [C.tools[0]] : C.tools;
  let toolPart;
  if (one) {
    const t = C.tools[0];
    toolPart = box('dk-tile dk-tile--white', W - 80, 310, row(col(pic(t.pics[0], 190) + word('smell the flower', 'font-size:22px;line-height:26px'), 8) + smallArrow(44) +
      col(pic(t.pics[1], 190) + word('blow out the candle', 'font-size:22px;line-height:26px'), 8), 18), `data-k2-tool="${t.id}"`);
    toolPart = col(toolPart, 0);
  } else toolPart = col(tools.map((t) => toolBand(t, d.draw ? 104 : 124)).join(''), 10);
  const sentences = one ? [C.help[0]] : C.help;
  const say = col(head('I can say:') + row(sentences.map((x) => bubble(x, 'data-k2-help="1"', one ? 28 : 22)).join(''), 24), 10);
  const stars = col(head(one ? 'Color a star each time you use this tool.' : 'Color a star each time you use a tool.') + row([1, 2, 3, 4, 5].map(() => star(one ? 46 : 40)).join(''), 24), 8);
  const draw = d.draw ? col(labelledDraw(W - 40, 168, 'me showing a friend a calm-down tool', 'data-dk-prompt="show"'), 0) : '';
  return { html: K2CSS + grow(col(upset, 0) + toolPart + say + (d.draw ? draw : stars), 'gap:12px'), meta: { record: true, tools: tools.map((t) => t.id) } };
};

/* ---------------------------------------------------------------- K-709 kind */
MODES['k2-kind'] = function kind(d, rng) {
  const K = B.KIND;
  if (d.trace) {
    const bubbles = row(K.words.map((w) => bubble(w, 'data-k2-kindword="1"', 22)).join(''), 14, 'flex-wrap:wrap;row-gap:14px');
    const lanes = col(K.trace.map((t) => `<div data-dk-box style="line-height:0">${strokeWordLane({ text: t, w: W - 60, h: 120, glyphH: 66, reps: 1, stack: true, modelless: true, padLeft: 14 }).svg.replace('<svg ', '<svg data-dk-writerow="1" ')}</div>`).join(''), 10);
    const hearts = col(head('Color a heart each time you use a kind word.') + row([1, 2, 3, 4, 5].map(() => heart()).join(''), 26), 8);
    return { html: K2CSS + grow(col(head('Kind words') + bubbles, 10) + lanes + hearts, 'gap:14px'), meta: { record: true, words: K.words.length } };
  }
  const scenes = rng.sample(K.scenes, d.rows);
  const kindAt = placesFor(scenes.length, 2, rng);
  const faceAt = d.faces ? placesFor(scenes.length, 3, rng) : [];
  const cw = d.faces ? 164 : 192, ch = d.faces ? 122 : 146;
  const rows = scenes.map((sc, i) => {
    const acts = kindAt[i] === 0 ? ['kind', 'unkind'] : ['unkind', 'kind'];
    const situation = tile(card(sceneArt(sc.id, 'situation'), cw - 12, ch - 12, `data-k2-situation="${sc.id}"`), cw, ch, '', 'lead');
    const choices = acts.map((a) => tile(card(sceneArt(sc.id, a), cw - 12, ch - 12, `data-k2-act="${a === 'kind' ? sc.kind : sc.unkind}"`), cw, ch,
      `data-k2-choice="${a}" data-dk-answer="${a === 'kind' ? 'kind' : 'no'}"`, 'white')).join('');
    let faces = '';
    if (d.faces) {
      const fs = rng.shuffle(K.after.wrong.slice());
      fs.splice(faceAt[i], 0, K.after.right);
      faces = col(fs.map((p) => tile(pic(p, 40), 50, 46, `data-k2-face="${p.noun}" data-dk-answer="${p.noun === K.after.right.noun ? 'after' : 'no'}"`, 'white')).join(''), 4);
    }
    return band(row(situation + `<div data-dk-box style="line-height:0" data-k2-then="1">${smallArrow(30)}</div>` + choices + (faces ? `<div style="width:4px"></div>` + faces : ''), 8), `data-k2-row="${sc.id}"`);
  }).join('');
  return { html: K2CSS + grow(rows, 'gap:10px'), meta: { rows: scenes.map((sc, i) => sc.id + '@' + kindAt[i] + (d.faces ? '/' + faceAt[i] : '')) } };
};

/* ---------------------------------------------------------------- K-710 space */
MODES['k2-space'] = function space(d, rng) {
  const S = B.SPACE;
  const parts = [];
  const hw = d.stop ? 150 : 158, hh = d.stop ? 104 : 138;
  const hellos = row(S.hellos.map((k) => col(tile(card(helloArt(k), hw - 10, hh - 10, `data-k2-hello="${k}"`, HELLO_VB), hw, hh, '', 'white') + word(HELLO_WORD[k], d.stop ? 'font-size:15px;line-height:18px' : ''), 2)).join(''), 10);
  const ask = row(bubble(S.ask, 'data-k2-ask="1"', d.stop ? 18 : 24) + row(S.answers.map((a) => bubble(a, 'data-k2-answer="1"', d.stop ? 18 : 24)).join(''), 12), 18);
  if (!d.stop) {
    parts.push(col(head('my space bubble') + tile(card(bubbleArt(), 380, 262, 'data-k2-bubbleart="1"'), 394, 276, '', 'white'), 6));
    // the asker takes either answer (the lesson: "the asker accepts whatever the friend points to")
    parts.push(col(ask + `<span class="dk-head" data-dk-box data-k2-both="1">Both answers are OK.</span>`, 4));
    parts.push(col(head('Choose a hello') + hellos, 8));
  } else {
    // review round 3: the ask has its own line (its tails no longer land on the wave card) and the lesson's point is printed
    parts.push(col(ask + `<span class="dk-head" data-dk-box data-k2-both="1">Both answers are OK.</span>` + head('Choose a hello') + hellos, 4));
    const items = d.notStop ? [rng.pick(S.stopItems)] : S.stopItems;
    const at = placesFor(items.length + (d.notStop ? 1 : 0), 2, rng);
    const cw = 190, ch = 132;
    items.forEach((it, i) => {
      const order = at[i] === 0 ? [it.right, it.wrong] : [it.wrong, it.right];
      parts.push(band(row(bubble(S.stop, 'data-k2-stopsay="1"', 20) + order.map((a) => tile(card(stopArt(a), cw - 12, ch - 12, `data-k2-stopcard="${a}"`), cw, ch,
        `data-k2-choice="${a}" data-dk-answer="${a === it.right ? 'stop' : 'no'}"`, 'white')).join(''), 14), `data-k2-row="stop-${it.id}"`));
    });
    if (d.notStop) {
      const N = S.notStop, k = items.length;
      const order = at[k] === 0 ? [N.right, N.wrong] : [N.wrong, N.right];
      const nw = 150, nh = 136;
      parts.push(band(row(bubble(S.stop, 'data-k2-stopsay="1"', 18) + tile(card(notStopArt('context'), nw - 12, nh - 12, 'data-k2-notstop="context"', NOTSTOP_VB), nw, nh, '', 'lead') +
        order.map((a) => tile(card(notStopArt(a), nw - 12, nh - 12, `data-k2-notstopcard="${a}"`, NOTSTOP_VB), nw, nh, `data-k2-choice="${a}" data-dk-answer="${a === N.right ? 'tell' : 'no'}"`, 'white')).join(''), 10), 'data-k2-row="not-stop"'));
    }
  }
  return { html: K2CSS + grow(parts.join(''), 'gap:10px'), meta: { stop: !!d.stop, notStop: !!d.notStop } };
};

/* ---------------------------------------------------------------- K-711 germs */
MODES['k2-germs'] = function germs(d, rng) {
  const G = B.WASH;
  const parts = [];
  let cards = G.times.map((x) => ({ ...x }));
  if (d.circle) {
    for (let t = 0; t < 400; t++) {
      cards = rng.shuffle([...G.times, ...G.notTimes]);
      const bits = cards.map((c) => c.wash);
      if (patterned(bits)) continue;
      if ([bits.slice(0, 3), bits.slice(3)].some((r) => r.every(Boolean) || r.every((x) => !x))) continue;   // a row of one kind
      break;
    }
  }
  const cols = cards.length === 4 ? 2 : 3, cw = cards.length === 4 ? 300 : 196, ch = d.circle ? (d.draw ? 120 : 150) : 168, px = d.circle ? (d.draw ? 70 : 96) : 116;
  const grid = `<div style="display:grid;grid-template-columns:repeat(${cols},${cw}px);gap:10px 12px;justify-content:center">` +
    cards.map((c) => box('dk-tile dk-tile--white', cw, ch, col(pic(c.pic, px) + word(c.label, 'font-size:16px;line-height:19px'), 6), `data-k2-time="${c.id}" data-dk-answer="${c.wash ? 'wash' : 'no'}"`)).join('') + '</div>';
  parts.push(col(head('When do I wash my hands?') + grid, 8));
  const cakes = col(head('Scrub for 20 seconds: sing “Happy Birthday” two times.') +
    row([1, 2].map((n) => col(pic(G.cake, d.draw ? 56 : 76) + `<span class="k2-num" data-dk-box>${n}</span>`, 4)).join(''), 60), 6);
  parts.push(cakes);
  {
    parts.push(col(head(d.circle ? 'My germ busters' : 'My germ busters (with my teacher)') + row(G.check.map((c) => box('dk-tile dk-tile--white', 200, d.draw ? 74 : 90, row((c.draw === 'cough' ? coughSvg(d.draw ? 46 : 58) : pic(c.pic, d.draw ? 46 : 58)) + word(c.label, 'font-size:15px;line-height:18px;white-space:normal;text-align:left;width:96px'), 6), `data-k2-check="${c.id}"`)).join(''), 12), 6));
  }
  if (d.draw) parts.push(col(labelledDraw(W - 40, 140, 'me teaching a friend to wash', 'data-dk-prompt="teach"'), 0));
  return { html: K2CSS + grow(parts.join(''), 'gap:10px'), meta: { record: !d.circle, cards: cards.map((c) => (c.wash ? 'W' : 'N') + ':' + c.id) } };
};

/**
 * The K2 page checks (in page.evaluate): every stop card draws the friend's STOP hand (the trap of a hug that reads as
 * wanted); every closed group has exactly one right answer; the figures are where the bank says.
 */
function k2VerifyInPage() {
  const f = [];
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no dk root'];
  const mode = R.dataset.dk;
  const box = (e) => e.getBoundingClientRect();
  const cx = (r) => (r.left + r.right) / 2, cy = (r) => (r.top + r.bottom) / 2;
  /** a drawn figure, MEASURED: its head, its legs' centre (the legs never lean), how far the head leans off the legs */
  const figGeo = (g) => { const head = box(g.querySelector('[data-k2-head]')); const legs = [...g.children[0] ? g.children : []].filter((e) => e.tagName !== 'g').map(box); const lx = legs.reduce((a, r) => a + cx(r), 0) / Math.max(1, legs.length); return { head, lx, lean: Math.abs(cx(head) - lx) / (head.width / 2), bbox: box(g) }; };
  // review round 3: a PUSH is drawn upright (straight arms, an impact burst): a figure leaning over a child reads as lifting
  R.querySelectorAll('[data-k2-act="push"], [data-k2-notstopcard="push"]').forEach((c) => {
    const who = c.matches('[data-k2-notstopcard]') ? 'child' : 'friend';
    const g = c.querySelector(`[data-k2-fig="${who}"]`);
    if (!g) { f.push('a push card without its pusher'); return; }
    const m = figGeo(g); if (m.lean > 0.8) f.push(`a push card's pusher leans over (head ${m.lean.toFixed(2)} head-radii off the legs): it reads as lifting`);
    if (!c.querySelector('[data-k2-impact]')) f.push('a push card without its impact burst');
  });
  // the tower: the added block is held in the AIR above the tower, with a gap and a down arrow
  R.querySelectorAll('[data-k2-act="share-block"]').forEach((c) => {
    const add = c.querySelector('[data-k2-added]'); const rest = [...c.querySelectorAll('[data-k2-block]:not([data-k2-added])')].map(box);
    if (!add || !rest.length) { f.push('the share-block card has no added block'); return; }
    if (box(add).bottom > Math.min(...rest.map((r) => r.top)) - 2) f.push('the added block sits ON the tower (no gap): it can read as taking it');
    if (!c.querySelector('[data-k2-downarrow]')) f.push('the added block has no down arrow');
  });
  if (mode === 'k2-space') {
    R.querySelectorAll('[data-k2-stopcard]').forEach((c) => {
      const friend = [...c.querySelectorAll('[data-k2-fig="friend"]')];
      if (!friend.some((g) => g.querySelector('[data-k2-palm]'))) f.push(`stop card ${c.dataset.k2Stopcard}: the friend shows no stop hand (a hug that goes on would read as wanted)`);
      // the stop hand: an open palm at CHEST height (below the head, above the waist), fully inside the card
      friend.forEach((g) => { const p = g.querySelector('[data-k2-palm]'); if (!p) return; const m = figGeo(g), pr = box(p), card = box(c); if (cy(pr) < m.head.bottom || cy(pr) > m.head.bottom + (m.bbox.bottom - m.head.bottom) * 0.45) f.push(`stop card ${c.dataset.k2Stopcard}: the stop hand is not at chest height`); if (pr.top < card.top - 0.5 || pr.bottom > card.bottom + 0.5 || pr.left < card.left - 0.5 || pr.right > card.right + 0.5) f.push(`stop card ${c.dataset.k2Stopcard}: the stop hand runs out of the card`); });
      // the step back: an arrow under the feet pointing AWAY from the friend
      if (c.dataset.k2Stopcard === 'step-back') { const a = c.querySelector('[data-k2-backarrow] polygon'); const me = c.querySelector('[data-k2-fig="child"]'); if (!a || !me || !friend[0]) f.push('the step-back card has no back arrow'); else { const pts = [...a.points].map((q) => { const mm = a.getScreenCTM(); return mm.a * q.x + mm.c * q.y + mm.e; }); const mean = pts.reduce((x, y) => x + y, 0) / pts.length; const tip = pts.reduce((b, x) => (Math.abs(x - mean) > Math.abs(b - mean) ? x : b), pts[0]); const away = Math.sign(cx(box(me)) - cx(box(friend[0]))); if (Math.sign(tip - mean) !== away) f.push('the step-back arrow points AT the friend (it reads as running at them)'); } }
    });
    // someone does not stop: the row carries its "Stop, please." and the teacher is a grown-up, head well above the child's
    const ns = R.querySelector('[data-k2-row="not-stop"]');
    if (ns) {
      if (!ns.querySelector('[data-k2-stopsay]')) f.push('the not-stop row has no "Stop, please." bubble');
      const tc = ns.querySelector('[data-k2-notstopcard="tell-teacher"]');
      if (tc) { const t = tc.querySelector('[data-k2-fig="teacher"]'), k = tc.querySelector('[data-k2-fig="child"]'); if (!t || !k) f.push('the tell-the-teacher card lacks the teacher or the child'); else { const th = box(t.querySelector('[data-k2-head]')), kh = box(k.querySelector('[data-k2-head]')); if (th.top > kh.top - kh.height * 0.8) f.push('the teacher is not clearly taller than the child'); } }
      const ctx = ns.querySelector('[data-k2-notstop="context"] [data-k2-fig="child"] [data-k2-palm]'); if (!ctx) f.push('the not-stop situation: your stop hand is missing');
    }
    if (!R.querySelector('[data-k2-both]')) f.push('"Both answers are OK." is not printed');
    // the wave: each hand up and OUT, above the head and away from it (beside the head it read as covering the ears)
    const wv = R.querySelector('[data-k2-hello="wave"]');
    if (wv) wv.querySelectorAll('[data-k2-fig]').forEach((g) => { const p = g.querySelector('[data-k2-palm]'); const h = box(g.querySelector('[data-k2-head]')); if (!p) { f.push('a wave without an open hand'); return; } const pr = box(p); if (cy(pr) > h.top + h.height * 0.25 || Math.abs(cx(pr) - cx(h)) < h.width * 0.9) f.push('a wave hand is not up and away from the head (it reads as covering the ears)'); });
    R.querySelectorAll('[data-k2-row]').forEach((r) => { const a = [...r.querySelectorAll('[data-dk-answer]')].map((e) => e.dataset.dkAnswer); if (a.filter((x) => x !== 'no').length !== 1) f.push(`row ${r.dataset.k2Row}: ${a.filter((x) => x !== 'no').length} right answers`); });
    if (R.querySelectorAll('[data-k2-hello]').length !== 4) f.push('not four hellos');
  }
  if (mode === 'k2-kind') {
    R.querySelectorAll('[data-k2-row]').forEach((r) => {
      const acts = [...r.querySelectorAll('[data-k2-choice]')].map((e) => e.dataset.dkAnswer);
      if (acts.length !== 2 || acts.filter((x) => x === 'kind').length !== 1) f.push(`row ${r.dataset.k2Row}: not one kind act of two`);
      const faces = [...r.querySelectorAll('[data-k2-face]')].map((e) => e.dataset.dkAnswer);
      if (faces.length && faces.filter((x) => x === 'after').length !== 1) f.push(`row ${r.dataset.k2Row}: not one right face`);
      r.querySelectorAll('[data-k2-choice]').forEach((c) => { const n = c.querySelectorAll('[data-k2-fig]').length; if (n !== 2) f.push(`row ${r.dataset.k2Row}: a choice draws ${n} children (2)`); });
    });
  }
  if (mode === 'k2-germs') { const a = [...R.querySelectorAll('[data-k2-time]')].map((e) => e.dataset.dkAnswer); if (!a.includes('wash')) f.push('no wash time on the page'); }
  // review round 4: the cough card is a child coughing into a raised elbow, MEASURED (the child faces right): the elbow
  // in front of the face at mouth height, the forearm bent up and back across the face, cough marks; never the library elbow
  if (mode === 'k2-germs') {
    const card = R.querySelector('[data-k2-check="elbow"]');
    const sv = card && card.querySelector('[data-k2-cough]');
    if (!card) f.push('no cough-in-my-elbow card');
    else if (card.querySelector('[data-dk-pic]')) f.push('the cough card shows a picture (the library elbow read as a leg or a boot)');
    else if (!sv) f.push('the cough card has no coughing child');
    else {
      const g = sv.querySelector('[data-k2-fig]'), hd = g && g.querySelector('[data-k2-head]'), pl = g && [...g.querySelectorAll('polyline')].pop();
      if (!hd || !pl) f.push('the coughing child lacks a head or an arm');
      else {
        const hb = hd.getBoundingClientRect(), m = pl.getScreenCTM();
        const P = [...pl.points].map((q) => [m.a * q.x + m.c * q.y + m.e, m.b * q.x + m.d * q.y + m.f]);
        const [el, hn] = [P[1], P[2]], w = hb.width, hy = (hb.top + hb.bottom) / 2, hx = (hb.left + hb.right) / 2;
        if (!(el[1] >= hy - 0.1 * w && el[1] <= hb.bottom + 0.15 * w)) f.push('the cough card: the elbow is not at mouth height');
        if (!(el[0] >= hx + 0.3 * w && el[0] <= hb.right + 0.6 * w)) f.push('the cough card: the elbow is not in front of the face');
        if (!(hn[1] < el[1] && hn[0] < el[0] - 0.5 * w)) f.push('the cough card: the forearm is not bent up across the face');
      }
      if (sv.querySelectorAll('[data-k2-coughmark]').length < 2) f.push('the cough card has no cough marks');
    }
  }
  if (mode === 'k2-calm') { if (!R.querySelector('[data-k2-help]')) f.push('no help sentence'); if (!R.querySelector('[data-k2-tool]')) f.push('no calm-down tool'); }
  return f;
}

/** makeK2Type: the Batch K type wrapper + the K2 page checks */
function makeK2Type(o) {
  const t = DK.makeDkKinderType(o);
  t.verify = async (page) => [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(k2VerifyInPage));
  return t;
}

module.exports = { makeK2Type, k2VerifyInPage, sceneArt, helloArt, stopArt, notStopArt, bubbleArt, fig };
