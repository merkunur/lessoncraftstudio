/**
 * dk-social-k.js — Batch SK (Daily Teaching System Stage D-5, 2026-11-24): the Kindergarten social studies pages the
 * English year design (scripts/units/year/design.en.social.json, grade "K") needs:
 *   K-712 rules      Our Class Rules                     (feelings, D2.Civ.12.K-2)
 *   K-713 friends    Good Friends Take Turns and Share   (feelings, D2.Civ.7.K-2)
 *   K-714 families   Families Come in Many Shapes        (family, D2.Civ.6.K-2; a change of K-323 / G1-387)
 *   K-715 traditions Family Traditions                   (family, D2.Geo.6.K-2)
 *   K-716 then-now   Long Ago and Today                  (family, D2.His.2.K-2)
 *   K-717 choose     Choosing One Thing                  (money, D2.Eco.2.K-2)
 *   K-718 workers    Who Makes It? Who Does It?          (science-match, D2.Eco.3.K-2; a change of K-213)
 *   K-719 flag       Our Flag                            (read-and-color, D2.Civ.5.K-2)
 *   K-720 mlk        Martin Luther King Jr.              (feelings, D2.Civ.14.K-2)
 *   K-721 fair       Fair for Everyone                   (feelings, D2.Civ.8.K-2)
 *   K-722 globe      Land and Water on the Globe         (maps, D2.Geo.3.K-2; a change of G2-370)
 *   K-723 hood       A Map of a Neighborhood             (maps, D2.Geo.2.K-2; a change of G1-379 / G1-422)
 *   K-724 places     Hot Places, Cold Places             (science-sort, D2.Geo.4.K-2; a change of K-207)
 *   K-725 helpers    Who Helps at Our School?            (science-match, D2.Civ.1.K-2; teacher-led lesson)
 *   K-726 vote       Our Class Vote                      (graphing-data, D2.Civ.11.K-2; teacher-led lesson)
 * English only; themeless; PDF only. Built on the Batch K factory (types/_shared/dk-kinder.js): its type wrapper, CSS,
 * page check (dkVerifyInPage) and refusal of other locales; this file only REGISTERS new modes in its MODES table and
 * adds the SK page checks (skVerifyInPage). dk-kinder.js is not edited (every existing page stays byte-identical).
 *
 * Kindergarten does not read: the teacher reads the instruction (a level prints its own, i18n/level-instructions.json);
 * the child circles, crosses out, draws a line, colors and draws. The child's part of the page carries pictures, numbers
 * to 13 (the flag's stripes) and short labels the teacher reads (a key, a frame's name).
 *
 * The drawings are types/_shared/dk-social-k-art.js (people with skin tones that vary on every page that shows people;
 * the old objects, the flag, the globe, the map). Library pictures: colour only, through resolve.fileUri at BUILD time
 * (never while the module loads). Bank: data/social/dk-social-k.js. Gate: qa/verify-dk-social-k.js.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const DK = require('./dk-kinder.js');
const A = require('./dk-social-k-art.js');
const B = require('../../data/social/dk-social-k.js');

const T = TOK.color;
const W = 675;
const { person, f1, SKIN, CLOTH, HAIR, OUT, linkHands, armTo } = A;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ================================================================ layout kit (the dk-kinder conventions) */
const box = (cls, w, h, inner, attrs = '', style = '') => `<div class="${cls}" data-dk-box${attrs ? ' ' + attrs : ''} style="flex-shrink:0;width:${typeof w === 'number' ? w + 'px' : w};height:${typeof h === 'number' ? h + 'px' : h};${style}">${inner}</div>`;
const tile = (inner, w, h, attrs = '', mod = '', style = '') => box('dk-tile' + (mod ? ' dk-tile--' + mod : ''), w, h, inner, attrs, style);
const drawBox = (w, h, attrs = '', inner = '', style = '') => box('dk-draw', w, h, inner, 'data-dk-draw' + (attrs ? ' ' + attrs : ''), style);
const labelledDraw = (w, h, label, attrs = '', style = '') => drawBox(w, h, attrs, `<span class="dk-head" style="position:absolute;left:12px;top:6px">${esc(label)}</span>`, style);
const head = (text, attrs = '') => `<span class="dk-head" data-dk-box${attrs ? ' ' + attrs : ''}>${esc(text)}</span>`;
const word = (text, attrs = '', style = '') => `<span class="dk-word" data-dk-box${attrs ? ' ' + attrs : ''}${style ? ` style="${style}"` : ''}>${esc(text)}</span>`;
const col = (inner, gap = 6, extra = '') => `<div style="display:flex;flex-direction:column;align-items:center;gap:${gap}px;${extra}">${inner}</div>`;
const row = (inner, gap = 12, extra = '') => `<div class="dk-row" style="gap:${gap}px;${extra}">${inner}</div>`;
const grow = (inner, extra = '') => `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:space-between;${extra}">${inner}</div>`;
/** a library picture in a px box (build time only) */
const pic = (p, w, h = w, extra = '') => `<img class="ws-icon" data-dk-pic="${esc(p.theme + '/' + p.noun)}" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${w}px;height:${h}px;display:block;object-fit:contain"${extra}>`;
/** a library picture INSIDE an svg drawing */
const svgPic = (p, x, y, w, h, align = 'xMidYMid') => `<image href="${fileUri(p.theme, p.noun)}" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" preserveAspectRatio="${align} meet" data-dk-pic="${esc(p.theme + '/' + p.noun)}"/>`;
/** a drawn scene card: an svg with its own view box, scaled into w x h */
const scene = (body, w, h, vb, attrs = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="${f1(w)}" height="${f1(h)}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" style="display:block;overflow:hidden" data-lcs-prim="sk-art"${attrs ? ' ' + attrs : ''}>${body}</svg>`;
/** a 200 x 140 scene in a w x h card: the view box grows upward (or both ways) to the card's shape, filled with the
 *  scene's own top colour, so a tall card shows more wall or sky instead of a white band */
function fitScene(body, w, h, attrs = '', vw = 200, vh = 140) {
  const need = vw * h / w;
  if (need <= vh + 0.5) {
    const nw = vh * w / h, ex = (nw - vw) / 2;
    // every full-width band of the scene (wall, floor, sky, grass) is drawn again across the wider card, under the scene
    const bands = [...body.matchAll(new RegExp(`<rect x="0" y="([0-9.]+)" width="${vw}" height="([0-9.]+)" fill="(#[0-9A-Fa-f]{6})"/>`, 'g'))].map((m) => `<rect x="${f1(-ex)}" y="${m[1]}" width="${f1(nw)}" height="${m[2]}" fill="${m[3]}"/>`).join('');
    const lines = [...body.matchAll(new RegExp(`<line x1="0" y1="([0-9.]+)" x2="${vw}" y2="([0-9.]+)" stroke="(#[0-9A-Fa-f]{6})" stroke-width="([0-9.]+)"/>`, 'g'))].map((m) => `<line x1="${f1(-ex)}" y1="${m[1]}" x2="${f1(vw + ex)}" y2="${m[2]}" stroke="${m[3]}" stroke-width="${m[4]}"/>`).join('');
    return scene(body, w, h, `${f1(-ex)} 0 ${f1(nw)} ${vh}`, attrs).replace('>' + body, `><rect x="${f1(-ex)}" y="0" width="${f1(nw)}" height="${vh}" fill="${topFill(body)}"/>` + bands + lines + body);
  }
  const ex = need - vh;
  return scene(body, w, h, `0 ${f1(-ex)} ${vw} ${f1(need)}`, attrs).replace('>' + body, `><rect x="0" y="${f1(-ex - 1)}" width="${vw}" height="${f1(ex + 1.5)}" fill="${topFill(body)}"/>` + body);
}
const topFill = (body) => { const m = /fill="(#[0-9A-Fa-f]{6})"/.exec(body); return m ? m[1] : '#FFFFFF'; };
/** review round 2: a vw x vh scene in a SHORT, wide card, cropped from the top at y0 (the empty wall or sky above the
 *  people; every scene that uses it draws nothing above y0), then widened to the card's shape like fitScene. The people
 *  are larger than an uncropped scene of the same card height would draw them. A card taller than the cropped scene's
 *  shape falls back to fitScene (no crop needed). */
function fitSceneCrop(body, w, h, attrs, vw, vh, y0) {
  const ch = vh - y0, need = vw * h / w;
  if (need > ch + 0.5) return fitScene(body, w, h, attrs, vw, vh);
  const nw = ch * w / h, ex = (nw - vw) / 2;
  const bands = [...body.matchAll(new RegExp(`<rect x="0" y="([0-9.]+)" width="${vw}" height="([0-9.]+)" fill="(#[0-9A-Fa-f]{6})"/>`, 'g'))].map((m) => `<rect x="${f1(-ex)}" y="${m[1]}" width="${f1(nw)}" height="${m[2]}" fill="${m[3]}"/>`).join('');
  const lines = [...body.matchAll(new RegExp(`<line x1="0" y1="([0-9.]+)" x2="${vw}" y2="([0-9.]+)" stroke="(#[0-9A-Fa-f]{6})" stroke-width="([0-9.]+)"/>`, 'g'))].map((m) => `<line x1="${f1(-ex)}" y1="${m[1]}" x2="${f1(vw + ex)}" y2="${m[2]}" stroke="${m[3]}" stroke-width="${m[4]}"/>`).join('');
  return scene(body, w, h, `${f1(-ex)} ${f1(y0)} ${f1(nw)} ${f1(ch)}`, attrs + ` data-sk-crop="${f1(y0)}"`).replace('>' + body, `><rect x="${f1(-ex)}" y="${f1(y0)}" width="${f1(nw)}" height="${f1(ch)}" fill="${topFill(body)}"/>` + bands + lines + body);
}
const SKCSS = `<style>
.sk-or{font-family:'Baloo 2',cursive;font-weight:700;font-size:20px;color:${T.inkSoft}}
.sk-line{display:block;border-bottom:2px solid ${T.ink};height:30px}
.sk-num{box-sizing:border-box;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.teal};border-radius:12px;background:#FFFFFF;font-family:'Baloo 2',cursive;font-weight:700;color:${T.ink}}
.sk-key{display:flex;align-items:center;gap:8px;font-family:'Nunito',sans-serif;font-weight:800;font-size:17px;color:${T.ink};white-space:nowrap}
</style>`;

/* ================================================================ answer places (no tell) */
const { patterned, derange } = DK;
/** which of two places holds the right answer in each of n rows: random, but never all alike from 3 rows on, and from
 *  4 rows on never alternating or in one block (two rows: any of the four, so one row tells nothing about the other) */
function sides(n, rng) {
  for (let t = 0; t < 400; t++) {
    const s = Array.from({ length: n }, () => rng.int(0, 1));
    if (n >= 3 && new Set(s).size === 1) continue;
    if (n >= 4 && patterned(s.map(Boolean))) continue;
    return s;
  }
  throw new Error('dk-social-k: no sides for ' + n);
}

/* ================================================================ who is drawn: skin tones vary on every page */
const TONES = ['s1', 's2', 's3', 's4', 's5', 's6'];
const HAIRS = { f: ['long', 'puffs', 'bun', 'braids', 'pony', 'curly', 'hijab'], m: ['short', 'curly', 'spiky', 'short', 'cap'] };
const HAIRCOL = { s1: ['blond', 'brown', 'red', 'dark'], s2: ['brown', 'dark', 'blond', 'black'], s3: ['dark', 'black', 'brown'], s4: ['black', 'dark'], s5: ['black', 'dark'], s6: ['black'] };
const TOPS = ['teal', 'coral', 'yellow', 'blue', 'purple', 'green', 'orange', 'pink', 'red', 'sky'];
/** a cast of n children with different skin tones, hair and clothes (a page's people never all share one tone) */
function cast(n, rng, opts = {}) {
  const tones = rng.shuffle(TONES), tops = rng.shuffle(TOPS);
  return Array.from({ length: n }, (_, i) => {
    const skin = tones[i % tones.length], sex = opts.sex ? opts.sex[i] : (rng.next() < 0.5 ? 'f' : 'm');
    const hair = rng.pick(HAIRS[sex].filter((h) => h !== 'hijab' || opts.hijab)), hairColor = rng.pick(HAIRCOL[skin]);
    return { skin, hair, hairColor, top: tops[i % tops.length], bottom: sex === 'f' ? rng.pick(['pants', 'skirt', 'dress', 'shorts']) : rng.pick(['pants', 'shorts']), bottomColor: rng.pick(['denim', 'khaki', 'navy', 'dark']), sex };
  });
}

/* ================================================================ scenery pieces (view units) */
const lockers = (x, y, n, w = 20, h = 70) => Array.from({ length: n }, (_, k) => `<rect x="${f1(x + k * w)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="#7FA7D9" stroke="${OUT}" stroke-width="1.2"/>` + [0, 1, 2].map((j) => `<line x1="${f1(x + k * w + 5)}" y1="${f1(y + 8 + j * 4)}" x2="${f1(x + k * w + w - 5)}" y2="${f1(y + 8 + j * 4)}" stroke="${OUT}" stroke-width="1"/>`).join('') + `<circle cx="${f1(x + k * w + w - 5)}" cy="${f1(y + h / 2)}" r="1.4" fill="${OUT}"/>`).join('');
const door = (x, y, w = 30, h = 76, c = '#B07A4E') => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${c}" stroke="${OUT}" stroke-width="1.2"/><rect x="${f1(x + w * 0.22)}" y="${f1(y + 8)}" width="${f1(w * 0.56)}" height="${f1(h * 0.28)}" fill="#DDEFF5" stroke="${OUT}" stroke-width="1"/><circle cx="${f1(x + w * 0.8)}" cy="${f1(y + h * 0.55)}" r="1.8" fill="${OUT}"/>`;
const wall = (w, floorY, c = '#F4EBD9', fc = '#E6DBC6') => `<rect x="0" y="0" width="${w}" height="${floorY}" fill="${c}"/><rect x="0" y="${floorY}" width="${w}" height="200" fill="${fc}"/><line x1="0" y1="${floorY}" x2="${w}" y2="${floorY}" stroke="${OUT}" stroke-width="1.4"/>`;
const rug = (cx, cy, rx, ry, c = '#F3B7A6') => `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${c}" stroke="${OUT}" stroke-width="1.2"/>`;
const toyBlock = (x, y, sz, c, rot = 0) => `<rect x="${f1(x - sz / 2)}" y="${f1(y - sz / 2)}" width="${f1(sz)}" height="${f1(sz)}" rx="1.5" fill="${c}" stroke="${OUT}" stroke-width="1.2" transform="rotate(${f1(rot)} ${f1(x)} ${f1(y)})" data-sk-block="1"/>`;
const BLOCKC = ['#E4574B', '#4A7BD0', '#F4C542', '#6BB36B', '#F39C40', '#8E6CC5'];
const bin = (x, y, w, h, full) => `<g data-sk-bin="${full ? 'full' : 'empty'}">${full ? [0, 1, 2, 3].map((k) => toyBlock(x + w * (0.22 + k * 0.19), y + 4 - (k % 2) * 5, 9, BLOCKC[k], k * 9)).join('') : ''}<path d="M${f1(x)},${f1(y)} L${f1(x + w)},${f1(y)} L${f1(x + w - 4)},${f1(y + h)} L${f1(x + 4)},${f1(y + h)} Z" fill="#5FA8A0" stroke="${OUT}" stroke-width="1.3"/><line x1="${f1(x + 6)}" y1="${f1(y + h * 0.45)}" x2="${f1(x + w - 6)}" y2="${f1(y + h * 0.45)}" stroke="#3C7F77" stroke-width="2"/></g>`;
const easel = (x, floorY) => `<g><line x1="${f1(x + 4)}" y1="${f1(floorY)}" x2="${f1(x + 16)}" y2="${f1(floorY - 70)}" stroke="#8B5E3C" stroke-width="3"/><line x1="${f1(x + 36)}" y1="${f1(floorY)}" x2="${f1(x + 24)}" y2="${f1(floorY - 70)}" stroke="#8B5E3C" stroke-width="3"/><rect x="${f1(x)}" y="${f1(floorY - 78)}" width="40" height="40" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.3"/>${[0, 1, 2].map((k) => `<line x1="${f1(x + 7)}" y1="${f1(floorY - 70 + k * 9)}" x2="${f1(x + 33 - k * 6)}" y2="${f1(floorY - 70 + k * 9)}" stroke="#7FA7D9" stroke-width="2"/>`).join('')}</g>`;
const chairSide = (x, floorY, seat = 26) => `<g><rect x="${f1(x - 13)}" y="${f1(floorY - seat - 4)}" width="26" height="5" fill="#B07A4E" stroke="${OUT}" stroke-width="1"/><line x1="${f1(x - 10)}" y1="${f1(floorY - seat)}" x2="${f1(x - 10)}" y2="${f1(floorY)}" stroke="${OUT}" stroke-width="2"/><line x1="${f1(x + 10)}" y1="${f1(floorY - seat)}" x2="${f1(x + 10)}" y2="${f1(floorY)}" stroke="${OUT}" stroke-width="2"/></g>`;
const openBook = (cx, cy, w = 26, c = '#E4574B') => `<g data-sk-book="open"><path d="M${f1(cx)},${f1(cy + 2)} L${f1(cx - w / 2)},${f1(cy - 2)} L${f1(cx - w / 2)},${f1(cy - w * 0.62)} L${f1(cx)},${f1(cy - w * 0.58)} Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.1"/><path d="M${f1(cx)},${f1(cy + 2)} L${f1(cx + w / 2)},${f1(cy - 2)} L${f1(cx + w / 2)},${f1(cy - w * 0.62)} L${f1(cx)},${f1(cy - w * 0.58)} Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.1"/><path d="M${f1(cx - w / 2 - 1.5)},${f1(cy - 1)} L${f1(cx)},${f1(cy + 3.5)} L${f1(cx + w / 2 + 1.5)},${f1(cy - 1)}" fill="none" stroke="${c}" stroke-width="2.4"/><circle cx="${f1(cx - w * 0.24)}" cy="${f1(cy - w * 0.32)}" r="${f1(w * 0.1)}" fill="#F4C542"/><path d="M${f1(cx + w * 0.1)},${f1(cy - w * 0.18)} l${f1(w * 0.12)},${f1(-w * 0.22)} l${f1(w * 0.12)},${f1(w * 0.22)} Z" fill="#6BB36B"/></g>`;
const toyCar = (cx, cy, k = 1, c = '#E4574B') => `<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(k)})" data-sk-toycar="1"><path d="M-10,0 L-10,-5 L-5,-5 L-2,-10 L5,-10 L8,-5 L11,-5 L11,0 Z" fill="${c}" stroke="${OUT}" stroke-width="1.1"/><circle cx="-5" cy="0.5" r="2.6" fill="${OUT}"/><circle cx="6" cy="0.5" r="2.6" fill="${OUT}"/></g>`;

/* ================================================================ K-712 rules: the scenes */
const RVB = '0 0 200 140';
/** one rule picture: the same child and the same place in both pictures of a pair (the moment is the same) */
function ruleArt(id, which, c) {
  const W0 = 200, FY = 134;
  const kid = (o) => person({ age: 'child', s: 1.32, ...c, ...o }).svg;
  if (id === 'hall') {
    let s = wall(W0, 96) + lockers(6, 20, 3, 19, 74) + door(164, 18, 30, 78) + `<g>${[1, 2, 3, 4].map((k) => `<line x1="${k * 40}" y1="96" x2="${k * 40 - 8}" y2="140" stroke="#D2C4A8" stroke-width="1"/>`).join('')}</g>`;
    if (which === 'walk') s += kid({ x: 112, y: FY, ll: [-3, 12, -6, 23], rl: [3, 12, 6, 23], la: [-3, 9, -2, 18], ra: [3, 9, 2, 18], look: 1 });
    else s += kid({ x: 116, y: FY - 8, lean: 8, mood: 'open', look: 1, ll: [-6, 11, -15, 17], rl: [7, 6, 12, 15], la: [-6, 6, -11, 12], ra: [6, 5, 12, -1] }) + A.motion(82, 64, -1, 4, 18);
    return s;
  }
  if (id === 'hand') {
    let s = wall(W0, 92, '#EAF2EE', '#E6DBC6') + rug(146, 130, 48, 8, '#F3B7A6') + easel(4, 128) +
      person({ age: 'adult', s: 0.98, x: 72, y: 130, skin: c.teacherSkin, hair: 'long', hairColor: 'dark', top: 'purple', bottom: 'pants', bottomColor: 'navy', look: 1, la: [-6, 8, -14, 2] }).svg;
    const seat = { ll: [-12, 6, 3, 10], rl: [12, 6, -3, 10] };
    if (which === 'raise') s += kid({ x: 148, y: 140, ...seat, ra: [3, -12, 4, -24], look: -1 });
    else s += kid({ x: 148, y: 140, ...seat, mood: 'open', look: -1 }) + `<g data-sk-shout="1">${[0, 1, 2].map((k) => `<path d="M${f1(126 - k * 6)},${f1(70 - k * 6)} q-6,${f1(9 + k * 2)} 0,${f1(18 + k * 4)}" fill="none" stroke="${T.coral}" stroke-width="2.6" stroke-linecap="round"/>`).join('')}</g>`;
    return s;
  }
  if (id === 'blocks') {
    // the same corner in both pictures: the toy bin on the left, the door on the right. Cleaning up: the child puts the
    // last block in the bin. Leaving: the bin is empty, the blocks lie on the floor BEHIND the child, who walks away to
    // the door, body half turned away (review round 1: standing beside the blocks read as "about to clean up")
    let s = wall(W0, 88, '#F7EEDD', '#E9DFCA') + door(166, 14, 28, 74);
    if (which === 'clean') {
      const o = { age: 'child', s: 1.32, ...c, x: 84, y: FY, lean: -10, turn: -1, look: -1, ra: [-2, 10, 2, 19] };
      o.la = armTo({ ...o, lean: 0 }, 'l', 50, 100);
      s += bin(14, 106, 50, 30, true) + person(o).svg + toyBlock(52, 98, 10, BLOCKC[4], 15);
    } else s += bin(14, 106, 50, 30, false) + [[74, 134, 0], [88, 124, 1], [104, 136, 2], [118, 127, 3], [80, 116, 5], [96, 112, 4]].map(([x, y, k]) => toyBlock(x, y, 11, BLOCKC[k], k * 23)).join('') +
      kid({ x: 142, y: FY, turn: 1, look: 1, ll: [-2, 11, -9, 23], rl: [3, 11, 10, 22], la: [-3, 9, -9, 16], ra: [3, 9, 9, 15] }) + A.motion(124, 86, -1, 3, 9);
    return s;
  }
  if (id === 'story') {
    let s = wall(W0, 86, '#F2EEF7', '#E6DBC6') + rug(132, 128, 62, 11, '#BFE0D8') + chairSide(40, 136, 38) +
      person({ age: 'adult', s: 0.98, x: 40, y: 118, skin: c.teacherSkin, hair: 'short', hairColor: 'black', top: 'green', bottomColor: 'khaki', ll: [-4, 3, -4, 20], rl: [4, 3, 4, 20], la: [-4, 10, 14, 18], ra: [4, 10, 20, 16], look: 1 }).svg + openBook(62, 90, 30);
    const seat = { ll: [-12, 6, 3, 10], rl: [12, 6, -3, 10] };
    // listening: turned toward the teacher, eyes on the book, hands in the lap. Playing: turned away from the teacher,
    // eyes and hands on the toy car (review round 1: a child drawn from behind read as "turned away", not "listening")
    if (which === 'listen') s += kid({ x: 142, y: 140, ...seat, turn: -1, look: -1, la: [-2, 10, 4, 18], ra: [2, 10, -4, 18] });
    else s += kid({ x: 142, y: 140, ...seat, turn: 1, look: 1, lean: 8, ra: [8, 8, 18, 14], la: [2, 10, 12, 18] }) + toyCar(178, 128, 1.5, '#3F9B4B');
    return s;
  }
  throw new Error('ruleArt: ' + id);
}

/** a row of two pictures of one moment: circle one, cross out the other */
function pairRow(pics, place, w, h, prefix, vb, cropY = null) {
  // pics = [{ key, answer, svg }]; place = where the right one goes (0 / 1); cropY (review round 2, K-712 level 3): the
  // short cards show the scene from cropY down (the wall above the door is cut, so the children stay large)
  const ordered = place === 0 ? pics : [pics[1], pics[0]];
  const fit = (p) => (cropY === null ? fitScene(p.svg, w - 8, h - 8, `data-sk-art="${prefix}:${p.key}"`) : fitSceneCrop(p.svg, w - 8, h - 8, `data-sk-art="${prefix}:${p.key}"`, 200, 140, cropY));
  const cards = ordered.map((p) => tile(fit(p), w, h, `data-sk-choice="${p.key}" data-dk-answer="${p.answer}"`, 'white'));
  return row(cards[0] + `<span class="sk-or" data-dk-box>or</span>` + cards[1], 16);
}

DK.MODES['sk-rules'] = function rules(d, rng) {
  const items = d.pairs === 2 ? rng.sample(B.RULES.slice(0, 3), 2) : rng.shuffle(B.RULES).slice(0, d.pairs);
  // one child per pair (the same child in both pictures of a pair), a different child and skin tone for each pair
  const kids = cast(items.length + 1, rng);
  const teacherSkin = kids[items.length].skin;
  const at = sides(items.length, rng);
  // level 3's cards are as wide as level 2's (review round 1: they were 2 inches wide). Review round 2: the drawing box
  // is about 2.5 inches tall (a five-year-old draws a child following a rule in it): the four rows keep their own height
  // (no cream band above or below a pair), the cards are shorter and show the scene from y 10 down (the wall above the
  // door is cut, so the children stay large), and the box takes the rest of the page
  const w = d.pairs === 2 ? 296 : 222, h = d.pairs === 2 ? 220 : d.draw ? 115 : 164;
  const rows = items.map((it, i) => {
    const c = { ...kids[i], teacherSkin };
    const pics = [{ key: it.follow, answer: 'follow', svg: ruleArt(it.id, it.follow, c) }, { key: it.not, answer: 'not', svg: ruleArt(it.id, it.not, c) }];
    return box('dk-tile', W, 'auto', pairRow(pics, at[i], w, h, it.id, RVB, d.draw ? 10 : null), `data-dk-item="${it.id}"`, d.draw ? 'flex:0 0 auto' : 'flex:1 1 0;min-height:0');
  });
  if (d.draw) rows.push(col(labelledDraw(W - 20, 'auto', 'one more class rule', 'data-dk-prompt="rule"', 'flex:1 1 auto;min-height:236px'), 0, 'flex:1 1 auto;min-height:0'));
  return { html: SKCSS + grow(rows.join(''), d.draw ? 'gap:6px' : 'gap:10px'), meta: { items: items.map((it, i) => it.id + ':' + (at[i] === 0 ? 'L' : 'R')), skins: kids.map((k) => k.skin) } };
};

/* ================================================================ props shared by the play scenes */
const table = (x1, x2, y, h = 34) => `<g data-sk-table="1"><rect x="${f1(x1)}" y="${f1(y)}" width="${f1(x2 - x1)}" height="7" rx="2" fill="#B07A4E" stroke="${OUT}" stroke-width="1.3"/><rect x="${f1(x1 + 6)}" y="${f1(y + 7)}" width="5" height="${f1(h)}" fill="#8B5E3C" stroke="${OUT}" stroke-width="1"/><rect x="${f1(x2 - 11)}" y="${f1(y + 7)}" width="5" height="${f1(h)}" fill="#8B5E3C" stroke="${OUT}" stroke-width="1"/></g>`;
const plate = (cx, cy, w = 34) => `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(w / 2)}" ry="${f1(w * 0.16)}" fill="#F7F4EE" stroke="${OUT}" stroke-width="1.2" data-sk-plate="1"/>`;
const cracker = (cx, cy, sz = 8) => `<g data-sk-cracker="1"><rect x="${f1(cx - sz / 2)}" y="${f1(cy - sz * 0.42)}" width="${f1(sz)}" height="${f1(sz * 0.84)}" rx="1.2" fill="#E8B96A" stroke="${OUT}" stroke-width="0.9"/><circle cx="${f1(cx - sz * 0.2)}" cy="${f1(cy)}" r="0.7" fill="${OUT}"/><circle cx="${f1(cx + sz * 0.2)}" cy="${f1(cy)}" r="0.7" fill="${OUT}"/></g>`;
const crayon = (cx, cy, c, rot = 0, L = 22) => `<g transform="rotate(${f1(rot)} ${f1(cx)} ${f1(cy)})" data-sk-crayon="1"><rect x="${f1(cx - L / 2)}" y="${f1(cy - 2.6)}" width="${f1(L * 0.8)}" height="5.2" rx="1" fill="${c}" stroke="${OUT}" stroke-width="0.9"/><path d="M${f1(cx + L * 0.3)},${f1(cy - 2.6)} L${f1(cx + L / 2)},${f1(cy)} L${f1(cx + L * 0.3)},${f1(cy + 2.6)} Z" fill="${c}" stroke="${OUT}" stroke-width="0.9"/></g>`;
const CRAYC = ['#D9534F', '#4A7BD0', '#F4C542', '#6BB36B', '#8E6CC5', '#F39C40'];
const ball = (cx, cy, r = 7) => `<g data-sk-ball="1"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="#F4C542" stroke="${OUT}" stroke-width="1.2"/><path d="M${f1(cx - r)},${f1(cy)} Q${f1(cx)},${f1(cy - r * 0.6)} ${f1(cx + r)},${f1(cy)}" fill="none" stroke="#D9534F" stroke-width="2"/><path d="M${f1(cx - r)},${f1(cy)} Q${f1(cx)},${f1(cy + r * 0.6)} ${f1(cx + r)},${f1(cy)}" fill="none" stroke="#4A7BD0" stroke-width="2"/></g>`;
const burst = (cx, cy, k = 1, c = T.coral) => `<g data-sk-impact="1">${[[-1, -1], [0, -1.3], [1, -1], [1.3, 0], [1, 1], [-1.3, 0], [-1, 1]].map(([dx, dy]) => `<line x1="${f1(cx + dx * 4 * k)}" y1="${f1(cy + dy * 4 * k)}" x2="${f1(cx + dx * 9 * k)}" y2="${f1(cy + dy * 9 * k)}" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>`).join('')}</g>`;
const grass = (w, y) => `<rect x="0" y="${f1(y)}" width="${f1(w)}" height="${f1(140 - y)}" fill="#6BB36B"/><line x1="0" y1="${f1(y)}" x2="${f1(w)}" y2="${f1(y)}" stroke="${OUT}" stroke-width="1.2"/>`;
const outdoors = (w = 200, gy = 112) => `<rect x="0" y="0" width="${w}" height="${gy}" fill="#EEF6F8"/>` + grass(w, gy);
const slide = (x) => `<g data-sk-slide="1"><line x1="${f1(x)}" y1="52" x2="${f1(x)}" y2="126" stroke="#D9534F" stroke-width="3.4"/><line x1="${f1(x + 18)}" y1="52" x2="${f1(x + 18)}" y2="126" stroke="#D9534F" stroke-width="3.4"/>${[0, 1, 2, 3, 4, 5].map((k) => `<line x1="${f1(x)}" y1="${f1(62 + k * 11)}" x2="${f1(x + 18)}" y2="${f1(62 + k * 11)}" stroke="#D9534F" stroke-width="2.4"/>`).join('')}<rect x="${f1(x - 2)}" y="46" width="36" height="7" fill="#F4C542" stroke="${OUT}" stroke-width="1.2"/><path d="M${f1(x + 32)},50 Q${f1(x + 70)},60 ${f1(x + 96)},112 L${f1(x + 120)},118 L${f1(x + 120)},126 L${f1(x + 92)},122 Q${f1(x + 66)},70 ${f1(x + 32)},58 Z" fill="#4A7BD0" stroke="${OUT}" stroke-width="1.3"/></g>`;
const swingSet = (seatX, seatY = 96) => `<g data-sk-swingset="1"><path d="M30,128 L50,26 L70,128 M130,128 L150,26 L170,128" fill="none" stroke="#B07A4E" stroke-width="4.5" stroke-linecap="round"/><line x1="44" y1="26" x2="156" y2="26" stroke="#B07A4E" stroke-width="5" stroke-linecap="round"/><line x1="${f1(seatX - 9)}" y1="26" x2="${f1(seatX - 9)}" y2="${f1(seatY)}" stroke="${OUT}" stroke-width="1.4"/><line x1="${f1(seatX + 9)}" y1="26" x2="${f1(seatX + 9)}" y2="${f1(seatY)}" stroke="${OUT}" stroke-width="1.4"/><rect x="${f1(seatX - 12)}" y="${f1(seatY)}" width="24" height="5" rx="2" fill="#D9534F" stroke="${OUT}" stroke-width="1.2"/></g>`;
const bear = (cx, cy, k = 1) => `<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(k)})" data-sk-drawn="teddy-bear"><circle cx="-6" cy="-14" r="3.6" fill="#B97A45" stroke="${OUT}" stroke-width="1"/><circle cx="6" cy="-14" r="3.6" fill="#B97A45" stroke="${OUT}" stroke-width="1"/><circle cx="0" cy="-8" r="8" fill="#B97A45" stroke="${OUT}" stroke-width="1.1"/><ellipse cx="0" cy="7" rx="9" ry="10" fill="#B97A45" stroke="${OUT}" stroke-width="1.1"/><ellipse cx="0" cy="8" rx="5" ry="6" fill="#F0C08F"/><circle cx="-3" cy="-9" r="1" fill="${OUT}"/><circle cx="3" cy="-9" r="1" fill="${OUT}"/><circle cx="0" cy="-5.5" r="1.4" fill="${OUT}"/></g>`;

/* ================================================================ K-713 friends: kind or not (one act per picture) */
const FVB = '0 0 140 140';
/** sitting on the ground, legs out to the sides (a child who fell) */
const SITOUT = { ll: [-10, 6, -18, 9], rl: [10, 6, 18, 9] };
const CROSS = { ll: [-12, 6, 3, 10], rl: [12, 6, -3, 10] };
/** an arm that puts the hand at (vx, vy) on a figure whose upper body leans by o.lean degrees (about the hip) */
function armToLean(o, side, vx, vy) {
  const s0 = o.s || 1, hx = o.x || 0, hy = (o.y || 0) - s0 * A.BODY[o.age || 'adult'].hipY, t = -(o.lean || 0) * Math.PI / 180;
  const dx = vx - hx, dy = vy - hy;
  return armTo({ ...o, lean: 0 }, side, hx + dx * Math.cos(t) - dy * Math.sin(t), hy + dx * Math.sin(t) + dy * Math.cos(t));
}
const cookie = (cx, cy, r = 4.2) => `<g data-sk-cookie="1"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="#D99A4E" stroke="${OUT}" stroke-width="0.9"/>${[[-1.4, -1], [1.3, 0.4], [-0.3, 1.6]].map(([dx, dy]) => `<circle cx="${f1(cx + dx)}" cy="${f1(cy + dy)}" r="0.8" fill="#4A2E1A"/>`).join('')}</g>`;
/** review round 2: a child's drawing being TORN: one sheet (a sun on the left, a house on the right), ripped from the top
 *  edge down; the two halves pulled apart in a V but still JOINED along the bottom strip, small rip marks at the tip of
 *  the tear (round 1's two separate halves held apart read as "showing two pictures"). (cx, top): the sheet's top centre;
 *  w x h its size; ang the angle each half is pulled out. Returns { svg, grip: { l: [x, y], r: [x, y] } } (view units):
 *  where the hands hold the two top outer corners. */
function tearingDrawing(cx, top, w, h, ang) {
  const jy = top + h * 0.74, J = [cx, jy];
  const rot = (p, a) => { const t = a * Math.PI / 180, dx = p[0] - J[0], dy = p[1] - J[1]; return [J[0] + dx * Math.cos(t) - dy * Math.sin(t), J[1] + dx * Math.sin(t) + dy * Math.cos(t)]; };
  const zig = Array.from({ length: 6 }, (_, q) => [cx + (q % 2 ? 1.6 : -1.2), top + q * (jy - top) / 5]);
  const half = (side) => {
    const a = side === 'l' ? -ang : ang, ox = cx + (side === 'l' ? -w / 2 : w / 2);
    const pts = [[ox, top], ...zig.map((p) => [side === 'l' ? p[0] - 0.6 : p[0] + 0.6, p[1]]), [ox, jy + 2]];
    const P = pts.map((p) => rot(p, a));
    const pic = side === 'l' ? `<circle cx="${f1(cx - w * 0.26)}" cy="${f1(top + h * 0.26)}" r="${f1(w * 0.1)}" fill="#F7C948" stroke="${OUT}" stroke-width="0.6"/>` :
      `<path d="M${f1(cx + w * 0.1)},${f1(top + h * 0.4)} L${f1(cx + w * 0.27)},${f1(top + h * 0.2)} L${f1(cx + w * 0.44)},${f1(top + h * 0.4)} Z" fill="#D9534F" stroke="${OUT}" stroke-width="0.6"/><rect x="${f1(cx + w * 0.14)}" y="${f1(top + h * 0.4)}" width="${f1(w * 0.26)}" height="${f1(h * 0.26)}" fill="#F7F4EE" stroke="${OUT}" stroke-width="0.6"/>`;
    return { svg: `<g data-sk-half="${side}"><path d="M${P.map((p) => f1(p[0]) + ',' + f1(p[1])).join(' L')} Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.1" stroke-linejoin="round"/><g transform="rotate(${f1(a)} ${f1(J[0])} ${f1(J[1])})">${pic}</g></g>`, corner: P[0] };
  };
  const L = half('l'), R = half('r');
  const strip = `<path d="M${f1(cx - w / 2 - 0.5)},${f1(jy)} L${f1(cx + w / 2 + 0.5)},${f1(jy)} L${f1(cx + w / 2 + 0.5)},${f1(top + h)} L${f1(cx - w / 2 - 0.5)},${f1(top + h)} Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.1" stroke-linejoin="round" data-sk-joined="1"/><path d="M${f1(cx - w * 0.42)},${f1(top + h * 0.9)} L${f1(cx + w * 0.42)},${f1(top + h * 0.9)}" stroke="#6BB36B" stroke-width="1.6"/>`;
  // the rip marks: short strokes from the tip of the tear, up and out
  const rip = [[-1, -0.55], [0, -1], [1, -0.55]].map(([dx, dy]) => `<line x1="${f1(cx + dx * 2.2)}" y1="${f1(jy - 1 + dy * 2.2)}" x2="${f1(cx + dx * 6.2)}" y2="${f1(jy - 1 + dy * 6.2)}" stroke="${OUT}" stroke-width="1.3" stroke-linecap="round" data-sk-rip="1"/>`).join('');
  return { svg: `<g data-sk-drawn="tearing-drawing">${L.svg}${R.svg}${strip}${rip}</g>`, grip: { l: L.corner, r: R.corner } };
}
/** one kind or unkind act, in a 140 x 140 view (the children fill the card; review round 1: a 200-wide view left them
 *  small under a big empty sky on level 1). k = three different children. Every picture is ONE act. */
function friendArt(id, k) {
  const [a, b, c] = k;   // three different children
  const S = 1.15, P = (o, who) => person({ age: 'child', s: S, ...who, ...o }).svg;
  if (id === 'slide') return outdoors(140, 112) + `<g transform="translate(30 128) scale(0.82) translate(0 -126)">${slide(0)}</g>` + P({ x: 15, y: 128, look: 1 }, b) + P({ x: 86, y: 109, ...SITOUT, la: [-6, -4, -10, -16], ra: [6, -4, 10, -16], look: 1 }, a);
  if (id === 'crayons') return wall(140, 96, '#F7EEDD', '#E9DFCA') + P({ x: 34, y: 128, look: 1, ra: [8, 3, 20, 1] }, a) + P({ x: 106, y: 128, look: -1, la: [-8, 3, -17, 2] }, b) + table(8, 132, 104) +
    [0, 1, 2].map((j) => crayon(68 + j * 1.5, 81 + j * 3.5, CRAYC[j], -12 + j * 10, 20)).join('');
  if (id === 'help-up') {
    // a friend fell (a ball rolled away): the helper leans back and PULLS, both hands clasping the fallen friend's hand;
    // the fallen friend is halfway up and smiling (review round 1: arms out toward a sitting child read as pushing)
    const cx = 62, cy = 92;
    const h = { age: 'child', s: S, ...a, x: 50, y: 128, lean: -12, look: 1, id: 'helper', ll: [-5, 12, -12, 24], rl: [4, 12, 10, 25] };
    h.ra = armToLean(h, 'r', cx - 1.5, cy); h.la = armToLean(h, 'l', cx - 4, cy + 1.5);
    const f = { age: 'child', s: S, ...b, x: 88, y: 128 + 12 * S, look: -1, id: 'fallen', mood: 'smile', ll: [-8, 6, -7, 14], rl: [4, 13, 13, 13], ra: [4, 8, 7, 14] };
    f.la = armTo(f, 'l', cx + 1.5, cy);
    return outdoors(140, 112) + person(f).svg + person(h).svg + ball(126, 122, 6) + A.motion(117, 116, -1, 3, 8);
  }
  if (id === 'snack') return outdoors(140, 112) + `<g data-sk-drawn="picnic-blanket"><path d="M6,114 L134,114 L138,136 L2,136 Z" fill="#F3B7A6" stroke="${OUT}" stroke-width="1.2"/>${[30, 54, 78, 102].map((x) => `<line x1="${x}" y1="114" x2="${x - 2}" y2="136" stroke="#D9534F" stroke-width="1.6"/>`).join('')}<line x1="4" y1="125" x2="136" y2="125" stroke="#D9534F" stroke-width="1.6"/></g>` +
    P({ x: 34, y: 128 + 10 * S, ...CROSS, look: 1, ra: [8, 4, 22, 6] }, a) + P({ x: 106, y: 128 + 10 * S, ...CROSS, look: -1, la: [-8, 4, -14, 4] }, b) +
    `<g data-sk-drawn="plate-of-cookies">${plate(67, 100, 26)}${cookie(61, 97)}${cookie(69, 96)}${cookie(65, 92)}</g>` + cookie(82, 96);
  if (id === 'grab') return wall(140, 96, '#EAF2EE', '#E6DBC6') + P({ x: 34, y: 128, look: 1, mood: 'sad', tear: true, ra: [8, 4, 20, 2] }, b) + P({ x: 104, y: 128, lean: -10, look: -1, mood: 'calm', la: [-8, 2, -20, -2], ra: [-4, 6, -14, 2] }, a) + bear(70, 82, 1.0) + A.motion(126, 64, 1, 3, 9);
  if (id === 'push') return wall(140, 96, '#F4EBD9', '#E6DBC6') + P({ x: 120, y: 128, look: -1, mood: 'sad' }, c) + P({ x: 80, y: 128, lean: 22, look: 1, mood: 'open', la: [6, 2, 12, -6], ra: [6, 4, 14, 0] }, b) + P({ x: 34, y: 128, lean: 10, look: 1, mood: 'calm', la: [8, 0, 26, -4], ra: [8, 3, 26, 1] }, a) + burst(66, 86, 0.7);
  if (id === 'tower') return wall(140, 96, '#F2EEF7', '#E6DBC6') + P({ x: 26, y: 128 + 10 * S, ...CROSS, look: 1, mood: 'sad', tear: true, ra: [6, 6, 12, 10] }, b) +
    [[56, 128, 0, 0], [56, 116, 1, 0], [66, 92, 2, 25], [80, 80, 3, -30], [92, 100, 4, 40]].map(([x, y, j, r]) => toyBlock(x, y, 12, BLOCKC[j], r)).join('') + P({ x: 116, y: 128, look: -1, mood: 'calm', la: [-6, 6, -22, 0], ll: [-8, 9, -16, 14] }, a) + burst(92, 110, 0.7);
  if (id === 'tear') {
    // review round 2: the tear HAPPENING. The friend's place at the table (left): his crayons lie by an empty spot and he
    // still holds one, crying, reaching for his drawing; the other child has taken the drawing from that spot and rips it
    // over the friend's side of the table, the halves still joined at the bottom; her face stays calm (an action, not a
    // "bad child"). She stands at the friend's place and holds the sheet in front of her, below her chin (a child's arm
    // reaches about 22 units), her hands on its two top corners.
    const d0 = tearingDrawing(80, 78, 36, 26, 14);
    const t = { age: 'child', s: S, ...a, x: 80, y: 128, turn: -1, look: -1, mood: 'calm', id: 'tearer' };
    t.la = armTo(t, 'l', d0.grip.l[0] + 2, d0.grip.l[1] + 2); t.ra = armTo(t, 'r', d0.grip.r[0] - 2, d0.grip.r[1] + 2);
    const tp = person(t);
    // her two hands drawn again ON the sheet's corners: she grips the paper (the arms stay behind it)
    const grips = ['l', 'r'].map((sd) => { const q = tp.hand(sd); return `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(5.4 * 0.62 * S)}" fill="${SKIN[a.skin]}" stroke="${OUT}" stroke-width="1.2" data-sk-grip="${sd}"/>`; }).join('');
    const fr = { age: 'child', s: S, ...b, x: 28, y: 128, look: 1, mood: 'sad', tear: true, id: 'friend', la: [-5, 7, -3, 15] };
    fr.ra = armTo(fr, 'r', 50, 82);
    const fp = person(fr), fh = fp.hand('l');
    return wall(140, 96, '#F7EEDD', '#E9DFCA') + fp.svg + crayon(fh[0] + 1, fh[1] + 3, CRAYC[3], 80, 14) + tp.svg + table(4, 136, 104) +
      `<g data-sk-drawn="friends-crayons">${[[20, 101, 0, -8], [31, 100, 1, 6], [41, 101.5, 4, -3]].map(([x, y, j, r]) => crayon(x, y, CRAYC[j], r, 13)).join('')}</g>` + d0.svg + grips;
  }
  throw new Error('friendArt: ' + id);
}

DK.MODES['sk-friends'] = function friends(d, rng) {
  const kindPool = B.FRIENDS.filter((x) => x.kind), notPool = B.FRIENDS.filter((x) => !x.kind);
  const n = d.pictures;
  // review round 1: the split varies (4 pictures: 1 + 3, 2 + 2 or 3 + 1; 6 pictures: 2 + 4, 3 + 3 or 4 + 2), at least one
  // of each, the places random: a child (or a teacher) who knows one answer learns nothing about the others
  const nKind = n === 4 ? rng.pick([1, 2, 3]) : rng.pick([2, 3, 4]);
  const set = [...rng.sample(kindPool, nKind), ...rng.sample(notPool, n - nKind)];
  const order = rng.shuffle(set);
  // review round 2: level 3 is laid out like level 2 (two cards across, three rows, each card about 3.5 inches wide; it
  // was three small cards across with a 4.7-inch drawing box); its cards are shorter and show each act from y 22 down
  // (the empty wall or sky above the children is cut, so the children stay large), and the drawing box takes the rest
  const cols = 2;
  const kids = cast(3 * n, rng);
  // level 1 fills the page: two rows of tall cards (the 140-wide view makes the children larger, not the sky)
  const cw = 322, ch = n === 4 ? 352 : d.draw ? 154 : 228;
  const fit = (x, i) => (d.draw ? fitSceneCrop(friendArt(x.id, kids.slice(3 * i, 3 * i + 3)), cw - 10, ch - 10, `data-sk-art="friend:${x.id}"`, 140, 140, 22) : fitScene(friendArt(x.id, kids.slice(3 * i, 3 * i + 3)), cw - 10, ch - 10, `data-sk-art="friend:${x.id}"`, 140, 140));
  const cards = order.map((x, i) => tile(fit(x, i), cw, ch, `data-sk-key="${x.id}" data-dk-answer="${x.kind ? 'kind' : 'not'}"`, 'white'));
  let html = `<div style="display:grid;grid-template-columns:repeat(${cols},${cw}px);gap:${d.draw ? '10px 14px' : '12px 14px'};justify-content:center">${cards.join('')}</div>`;
  if (d.draw) html = grow(html + col(labelledDraw(W - 20, 'auto', 'me helping a friend', 'data-dk-prompt="help"', 'flex:1 1 auto;min-height:230px'), 0, 'flex:1 1 auto;min-height:0'), 'gap:12px');
  else html = grow(html);
  return { html: SKCSS + html, meta: { cells: order.map((x) => (x.kind ? 'K' : 'N') + ':' + x.id), cols, split: nKind + '+' + (n - nKind) } };
};

/* ================================================================ K-721 fair or not (pairs of one moment) */
function fairArt(id, which, k) {
  const [a, b, c, e] = k;
  const P = (o, who) => person({ age: 'child', s: 1.12, ...who, ...o }).svg;
  const SEAT = { ll: [-4, 8, -6, 16], rl: [4, 8, 6, 16] };
  if (id === 'swing') {
    // keeping the swing (review round 1): the swinging child holds the chains tight to the body and turns AWAY from the
    // waiting children, who sit on the ground with their chins in their hands (a long wait); standing in line and
    // waiting could be argued fair
    if (which === 'keep') return outdoors(200, 116) + swingSet(66, 98) + P({ x: 66, y: 98 + 16 * 1.12 + 4, ...SEAT, la: [-5, 2, -1, 6], ra: [5, 2, 1, 6], mood: 'calm', turn: -1, look: -1 }, a) +
      [146, 180].map((x, j) => P({ x, y: 132 + 10 * 1.12, ll: [-12, 6, 3, 10], rl: [12, 6, -3, 10], mood: 'sad', look: -1, la: [-5, 7, 2, -5], ra: [5, 7, -2, -5] }, [b, c][j])).join('');
    return outdoors(200, 116) + swingSet(66, 98) + P({ x: 34, y: 132, look: 1, ra: [7, -2, 22, 2], la: [-4, 9, -3, 18] }, a) + P({ x: 100, y: 132, look: -1, la: [-6, 4, -14, 0] }, b) + P({ x: 152, y: 132, look: -1 }, c);
  }
  if (id === 'crackers') {
    const plates = [44, 100, 156];
    let s = wall(200, 92, '#F7EEDD', '#E9DFCA') + plates.map((x, j) => P({ x, y: 128, mood: which === 'all' && j !== 1 ? 'sad' : which === 'all' ? 'calm' : 'smile', look: 0 }, k[j])).join('') + table(14, 186, 104) + plates.map((x) => plate(x, 103, 40)).join('');
    if (which === 'all') { const pile = [[-10, 0], [0, 0], [10, 0], [-5, -6], [5, -6], [-12, -5], [12, -5], [0, -12], [-6, -12], [6, -12]]; s += pile.map(([dx, dy]) => cracker(100 + dx, 98 + dy, 9)).join(''); }
    else s += plates.map((x) => [-9, 0, 9].map((dx) => cracker(x + dx, 98, 9)).join('')).join('');
    return s;
  }
  if (id === 'game') {
    if (which === 'left-out') return outdoors() + P({ x: 26, y: 128, look: 1, ra: [6, -6, 12, -18] }, a) + P({ x: 62, y: 128, look: 1, ra: [6, -6, 12, -18] }, b) + P({ x: 98, y: 128, look: -1, la: [-6, -6, -12, -18] }, c) + ball(62, 40, 7) + P({ x: 178, y: 128, mood: 'sad', look: 1, la: [-2, 10, 0, 19], ra: [2, 10, 0, 19] }, e);
    return outdoors() + P({ x: 26, y: 128, look: 1, ra: [6, -6, 12, -18] }, a) + P({ x: 62, y: 128, look: 1, ra: [6, -6, 12, -18] }, b) + P({ x: 98, y: 128, look: -1, la: [-6, -6, -12, -18] }, c) + P({ x: 134, y: 128, look: -1, la: [-6, -6, -12, -18] }, e) + ball(80, 40, 7);
  }
  if (id === 'crayons-all') return wall(200, 92, '#F4EBD9', '#E6DBC6') + P({ x: 62, y: 128, look: 1, mood: 'calm', la: [5, 8, 12, 14], ra: [-5, 8, -12, 14] }, a) + P({ x: 142, y: 128, look: -1, mood: 'sad' }, b) + table(14, 186, 104) +
    [0, 1, 2, 3, 4, 5].map((j) => crayon(62 + (j - 2.5) * 5, 96 - (j % 2) * 4, CRAYC[j], 90 + (j - 2.5) * 8, 22)).join('');
  throw new Error('fairArt: ' + id);
}

DK.MODES['sk-fair'] = function fair(d, rng) {
  const items = rng.sample(B.FAIR, d.pairs);
  const kids = cast(4, rng);
  const at = sides(items.length, rng);
  const w = d.pairs === 2 ? 296 : d.fix ? 214 : 250, h = d.pairs === 2 ? 220 : d.fix ? 150 : 196;
  const rows = items.map((it, i) => {
    const order = rng.shuffle(kids);   // a different child does the action in each moment
    const pics = [{ key: it.fair, answer: 'fair', svg: fairArt(it.id, it.fair, order) }, { key: it.unfair, answer: 'not', svg: fairArt(it.id, it.unfair, order) }];
    return box('dk-tile', W, 'auto', pairRow(pics, at[i], w, h, it.id, RVB), `data-dk-item="${it.id}"`, 'flex:1 1 0;min-height:0');
  });
  if (d.fix) {
    const k2 = rng.shuffle(kids);
    rows.push(box('dk-tile', W, 'auto', row(tile(scene(fairArt('crayons-all', 'all', k2), 204, 142, RVB, 'data-sk-art="fix:crayons-all"'), 214, 152, 'data-sk-fix="crayons-all"', 'white') +
      `<span class="sk-or" data-dk-box>→</span>` + labelledDraw(330, 152, 'make it fair', 'data-dk-prompt="fair"'), 16), 'data-sk-row="fix"', 'flex:1 1 0;min-height:0'));
  }
  return { html: SKCSS + grow(rows.join(''), 'gap:10px'), meta: { items: items.map((it, i) => it.id + ':' + (at[i] === 0 ? 'L' : 'R')) } };
};

/** a closed book whose cover shows a library picture (view units) */
const bookCover = (p, x, y, w, h, col2) => `<g data-sk-drawn="book:${p.noun}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w * 0.06)}" fill="${col2}" stroke="${OUT}" stroke-width="${f1(Math.max(1, w * 0.03))}"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w * 0.12)}" height="${f1(h)}" fill="${OUT}" opacity="0.25"/>${svgPic(p, x + w * 0.18, y + h * 0.1, w * 0.74, h * 0.8)}</g>`;
/* ================================================================ the match layout (K-205's pair layout: draw a line) */
const dot = (attrs = '') => `<span class="dk-dot" data-dk-box${attrs ? ' ' + attrs : ''}></span>`;
/**
 * rows of a left tile and a right tile with a dot on each inner edge; the child draws a line from each left dot to the
 * right dot of its partner. lefts[i] = { key, partner, html }, rights[j] = { key, html } in their PRINTED order.
 */
function matchRows(lefts, rights, lw, rw, h, gapMid = 120, rowFlex = 'flex:1 1 0;min-height:0') {
  const n = Math.max(lefts.length, rights.length);
  const rows = [];
  for (let i = 0; i < n; i++) {
    const L = lefts[i], R = rights[i];
    rows.push(`<div class="dk-row" style="gap:0;justify-content:space-between;width:${W}px;${rowFlex}">` +
      (L ? row(tile(L.html, lw, h, `data-sk-key="${L.key}" data-dk-answer="${L.partner}"`, 'white') + dot(`data-sk-dot="L${i}"`), 10) : `<span style="width:${lw + 24}px"></span>`) +
      `<span style="flex:1 1 auto;min-width:${gapMid}px"></span>` +
      (R ? row(dot(`data-sk-dot="R${i}"`) + tile(R.html, rw, h, `data-sk-key="${R.key}"`, 'white'), 10) : `<span style="width:${rw + 24}px"></span>`) + '</div>');
  }
  return rows.join('');
}
/** the right column's order. Three or more rows: no partner straight across (a derangement). Two rows: straight across
 *  half the time, at random (review round 1 ruling: with two pairs a derangement made the two lines ALWAYS cross) */
function rightOrder(n, rng) { return n >= 3 ? derange(n, rng) : n === 2 ? (rng.next() < 0.5 ? [0, 1] : [1, 0]) : [0]; }

/* ================================================================ K-714 families come in many shapes */
const FAMVB = '0 0 200 140';
function familyArt(id, tones, rng) {
  // tones: [main, other] (a family's people share or mix tones; across the page they vary)
  const [t1, t2, t3] = tones;
  const bg = `<rect x="0" y="0" width="200" height="140" fill="#F4EBD9"/><ellipse cx="100" cy="134" rx="92" ry="7" fill="#E6DBC6"/>`;
  const hc = (t) => rng.pick(HAIRCOL[t]);
  let L;
  const S = 1.06;
  if (id === 'mom-child') L = [{ x: 78, age: 'adult', skin: t1, hair: 'long', hairColor: hc(t1), top: 'coral', bottom: 'skirt', bottomColor: 'navy' }, { x: 124, age: 'child', skin: t1, hair: 'short', hairColor: hc(t1), top: 'yellow', bottomColor: 'denim' }];
  if (id === 'two-dads') L = [{ x: 34, age: 'adult', skin: t1, hair: 'short', hairColor: hc(t1), top: 'teal', bottomColor: 'khaki' }, { x: 80, age: 'child', skin: t2, hair: 'puffs', hairColor: hc(t2), top: 'pink', bottom: 'dress' }, { x: 118, age: 'child', skin: t2, hair: 'puffs', hairColor: hc(t2), top: 'pink', bottom: 'dress' }, { x: 164, age: 'adult', skin: t2, hair: 'curly', hairColor: hc(t2), top: 'navy', bottomColor: 'denim', beard: true }];
  if (id === 'grandma') L = [{ x: 52, age: 'child', skin: t1, hair: 'braids', hairColor: hc(t1), top: 'green', bottom: 'skirt', bottomColor: 'purple' }, { x: 100, age: 'elder', skin: t1, hair: 'bun', hairColor: 'grey', top: 'purple', bottom: 'skirt', bottomColor: 'navy', glasses: true }, { x: 148, age: 'child', skin: t1, hair: 'spiky', hairColor: hc(t1), top: 'orange', bottom: 'shorts', bottomColor: 'denim' }];
  if (id === 'foster') L = [{ x: 28, age: 'adult', skin: t1, hair: 'pony', hairColor: hc(t1), top: 'blue', bottomColor: 'denim' }, { x: 70, age: 'child', skin: t2, hair: 'short', hairColor: hc(t2), top: 'red', bottomColor: 'khaki' }, { x: 100, age: 'child', skin: t3, hair: 'braids', hairColor: hc(t3), top: 'yellow', bottom: 'dress' }, { x: 130, age: 'child', skin: t1, hair: 'cap', hairColor: hc(t1), top: 'green', bottomColor: 'denim' }, { x: 172, age: 'adult', skin: t3, hair: 'short', hairColor: hc(t3), top: 'orange', bottomColor: 'navy' }];
  if (id === 'big') L = [{ x: 22, age: 'elder', skin: t1, hair: 'bald', hairColor: 'white', top: 'navy', bottomColor: 'grey', glasses: true }, { x: 58, age: 'adult', skin: t1, hair: 'hijab', hairColor: '#8E6CC5', top: 'teal', bottom: 'skirt', bottomColor: 'navy', noHold: true, la: [-1, 13, 9, 19], ra: [1, 13, -7, 19] }, { x: 96, age: 'adult', skin: t2, hair: 'short', hairColor: hc(t2), top: 'red', bottomColor: 'denim' }, { x: 134, age: 'child', skin: t1, hair: 'curly', hairColor: hc(t1), top: 'yellow', bottomColor: 'khaki' }, { x: 170, age: 'child', skin: t2, hair: 'pony', hairColor: hc(t2), top: 'pink', bottom: 'skirt', bottomColor: 'purple' }];
  // the teenager about as tall as the dad's shoulder, a younger face, a skateboard; the dad's hand on the teen's shoulder
  // (review round 1: a teen as tall as the dad read as two grown men)
  if (id === 'dad-teen') L = [{ x: 84, age: 'adult', skin: t1, hair: 'short', hairColor: hc(t1), top: 'green', bottomColor: 'denim', glasses: true, noHold: true }, { x: 118, age: 'teen', skin: t1, hair: 'spiky', hairColor: hc(t1), top: 'purple', bottomColor: 'dark', noHold: true, ra: [3, 11, 6, 21], la: [-3, 11, -5, 21] }];
  L.forEach((o) => { o.s = o.age === 'teen' ? S * 0.86 : S; o.y = 134; });
  if (id === 'dad-teen') { const sh = A.shoulderAt(L[1], 'l'); L[0].ra = armTo(L[0], 'r', sh[0] + 1, sh[1] - 1); }
  // the big family: the mother holds the baby; she holds no hand
  if (id === 'big') { L[1].noHold = true; L[0].noHold = false; }
  linkHands(L.filter((o) => !o.noHold));
  let s = bg + L.map((o) => person(o).svg).join('');
  if (id === 'big') s += A.babyBundle(58, 134 - 52 * S, 1.6, t1);
  if (id === 'dad-teen') { const tp = person(L[1]), hd = tp.hand('r'); s += `<g data-sk-drawn="skateboard"><rect x="${f1(hd[0] + 1.5)}" y="${f1(hd[1] - 16)}" width="7" height="34" rx="3.5" fill="#E4574B" stroke="${OUT}" stroke-width="1.2"/>${[hd[1] - 10, hd[1] + 12].map((y) => `<circle cx="${f1(hd[0] + 10.5)}" cy="${f1(y)}" r="2.2" fill="${OUT}"/>`).join('')}</g>` + `<circle cx="${f1(hd[0])}" cy="${f1(hd[1])}" r="${f1(A.BODY.teen.aw * 0.62 * L[1].s)}" fill="${SKIN[L[1].skin]}" stroke="${OUT}" stroke-width="1.1"/>`; }
  return s;
}
const FAMILY_LOOK = (rng) => { const t = rng.shuffle(TONES); return (i) => [t[i % 6], t[(i + 2) % 6], t[(i + 4) % 6]]; };

DK.MODES['sk-families'] = function families(d, rng) {
  const fams = d.families === 3 ? rng.sample(B.FAMILIES, 3) : rng.shuffle(B.FAMILIES);
  const look = FAMILY_LOOK(rng);
  const cw = 214, ch = d.families === 3 ? 196 : 158;
  const cards = fams.map((f, i) => tile(fitScene(familyArt(f.id, look(i), rng), cw - 8, ch - 8, `data-sk-art="family:${f.id}"`), cw, ch, `data-sk-key="${f.id}"`, 'white'));
  const top = row(cards.slice(0, 3).join(''), 12);
  const bottom = cards.length > 3 ? row(cards.slice(3).join(''), 12) : '';
  const label = d.families === 3 ? 'someone who cares for me' : 'everyone at home';
  const namesLine = `<div class="dk-row" data-dk-box data-sk-names="1" style="gap:10px;width:${W - 40}px;justify-content:flex-start"><span class="dk-head">names:</span><span class="sk-line" style="flex:1 1 auto"></span></div>`;
  const frame = d.together
    ? row(col(labelledDraw(420, 'auto', label, 'data-dk-prompt="family"', 'flex:1 1 auto;min-height:150px'), 0, 'flex:1 1 auto;min-height:0;align-self:stretch') +
      col(labelledDraw(230, 'auto', 'we do this together', 'data-dk-prompt="together"', 'flex:1 1 auto;min-height:150px'), 0, 'flex:1 1 auto;min-height:0;align-self:stretch'), 14, 'flex:1 1 auto;min-height:0;align-items:stretch')
    : col(labelledDraw(W - 40, 'auto', label, 'data-dk-prompt="family"', 'flex:1 1 auto;min-height:150px'), 0, 'flex:1 1 auto;min-height:0;align-self:stretch');
  const parts = [top, `<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:6px">${frame}${namesLine}</div>`];
  if (bottom) parts.push(bottom);
  return { html: SKCSS + grow(parts.join(''), 'gap:12px;align-items:center'), meta: { record: 1, families: fams.map((f) => f.id) } };
};

/* ================================================================ K-715 family traditions */
const smallHat = (cx, cy, k = 1) => `<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(k)})"><path d="M-6,0 L0,-16 L6,0 Z" fill="#8E6CC5" stroke="${OUT}" stroke-width="1"/><circle cx="-2" cy="-5" r="1.2" fill="#F4C542"/><circle cx="2" cy="-9" r="1.2" fill="#F2784B"/><circle cx="0" cy="-17" r="2.2" fill="#F4C542" stroke="${OUT}" stroke-width="0.8"/></g>`;
function traditionArt(id, k, rng) {
  const [a, b, c, e] = k;
  const P = (o, who) => person({ s: 1.0, ...who, ...o });
  if (id === 'birthday') {
    // children in party hats round a table with a birthday cake and its candles (the library party hat on every head)
    const kids = [{ x: 34, age: 'child', ...a }, { x: 76, age: 'child', ...b }, { x: 166, age: 'child', ...c }];
    let s = `<rect x="0" y="0" width="200" height="140" fill="#F2EEF7"/>` + [[24, 30, '#F2784B'], [176, 26, '#4A7BD0'], [150, 14, '#F4C542']].map(([x, y, col2]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="11" fill="${col2}" stroke="${OUT}" stroke-width="1.2"/><path d="M${x},${y + 11} q3,10 -2,18" fill="none" stroke="${OUT}" stroke-width="1"/>`).join('');
    s += kids.map((o) => { const p = P({ y: 132, look: 0 }, o); const hd = p.head(); return p.svg + svgPic(B.PARTY_HAT, hd.x - 9, hd.y - hd.r - 17, 18, 20); }).join('');
    s += table(18, 182, 100) + `<g data-sk-drawn="birthday-cake"><rect x="100" y="80" width="44" height="20" rx="3" fill="#F7D6E0" stroke="${OUT}" stroke-width="1.3"/><path d="M100,86 q5.5,5 11,0 q5.5,5 11,0 q5.5,5 11,0 q5.5,5 11,0" fill="none" stroke="#FFFFFF" stroke-width="2.6"/>${[110, 122, 134].map((x) => `<rect x="${x - 1.6}" y="68" width="3.2" height="12" fill="#4A7BD0" stroke="${OUT}" stroke-width="0.7"/><path d="M${x},68 Q${x - 3},63 ${x},58 Q${x + 3},63 ${x},68 Z" fill="#F7A21B" stroke="${OUT}" stroke-width="0.7"/>`).join('')}</g>`;
    return s;
  }
  if (id === 'thanksgiving') {
    const fam = [{ x: 34, age: 'elder', hair: 'bald', hairColor: 'white', glasses: true, top: 'navy', skin: a.skin }, { x: 78, age: 'adult', ...b, hair: 'long', top: 'orange' }, { x: 122, age: 'child', ...c }, { x: 166, age: 'adult', ...e, hair: 'short', top: 'green' }];
    let s = `<rect x="0" y="0" width="200" height="140" fill="#F7EEDD"/><rect x="0" y="108" width="200" height="32" fill="#E9DFCA"/>` + fam.map((o) => P({ y: 132, look: 0 }, o).svg).join('') + table(8, 192, 98);
    s += `<g data-sk-drawn="turkey"><ellipse cx="74" cy="92" rx="26" ry="5" fill="#F7F4EE" stroke="${OUT}" stroke-width="1.1"/><path d="M54,90 Q56,72 74,72 Q92,72 94,90 Z" fill="#B5652E" stroke="${OUT}" stroke-width="1.3"/><path d="M60,84 Q74,78 88,84" fill="none" stroke="#8B5E3C" stroke-width="1.4"/><path d="M92,82 l8,-6 a2.5,2.5 0 1 1 2,3 l-7,6" fill="#F7F4EE" stroke="${OUT}" stroke-width="1"/><path d="M56,82 l-8,-6 a2.5,2.5 0 1 0 -2,3 l7,6" fill="#F7F4EE" stroke="${OUT}" stroke-width="1"/></g>`;
    // the pumpkin pie (drawn: the library pie is a red lattice pie, which reads as cherry; review round 1)
    s += `<g transform="translate(112 63) scale(0.36)">${A.obj('pumpkin-pie')}</g>` + [[154, 96], [178, 96], [30, 96]].map(([x, y]) => plate(x, y, 22)).join('');
    return s;
  }
  if (id === 'diwali') {
    // a family lights small clay diyas on the floor at dusk: a row of lit diyas, one in each grown-up's and child's hands, a rangoli
    let s = `<rect x="0" y="0" width="200" height="140" fill="#E6DDF3"/><rect x="0" y="98" width="200" height="42" fill="#E9DFCA"/><line x1="0" y1="98" x2="200" y2="98" stroke="${OUT}" stroke-width="1.2"/>`;
    s += `<g data-sk-drawn="rangoli">${[0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const an = k * Math.PI / 4; const cx = 100 + Math.cos(an) * 10, cy = 124 + Math.sin(an) * 5; return `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="6" ry="3" fill="${['#F2784B', '#F4C542', '#8E6CC5', '#6BB36B'][k % 4]}" transform="rotate(${f1(k * 45)} ${f1(cx)} ${f1(cy)})"/>`; }).join('')}<circle cx="100" cy="124" r="4" fill="#D9534F"/></g>`;
    const mom = { x: 42, y: 128, age: 'adult', ...a, hair: 'bun', bottom: 'dress', top: 'pink', look: 1 };
    const kid = { x: 160, y: 128, age: 'child', ...b, look: -1 };
    mom.la = armTo({ s: 0.98, ...mom }, 'l', 52, 88); mom.ra = armTo({ s: 0.98, ...mom }, 'r', 64, 88);
    kid.la = armTo({ s: 0.98, ...kid }, 'l', 142, 96); kid.ra = armTo({ s: 0.98, ...kid }, 'r', 152, 96);
    s += person({ s: 0.98, ...mom }).svg + person({ s: 0.98, ...kid }).svg;
    s += `<g transform="translate(46 76) scale(0.24)">${A.obj('diya')}</g><g transform="translate(134 84) scale(0.24)">${A.obj('diya')}</g>`;
    s += [76, 100, 124].map((x) => `<g transform="translate(${x - 12} 94) scale(0.24)">${A.obj('diya')}</g>`).join('');
    return s;
  }
  if (id === 'new-year') {
    // a grandmother gives a child a red envelope (both smiling)
    let s = `<rect x="0" y="0" width="200" height="140" fill="#F4EBD9"/><rect x="0" y="108" width="200" height="32" fill="#E6DBC6"/><line x1="0" y1="108" x2="200" y2="108" stroke="${OUT}" stroke-width="1.2"/>`;
    const g = { x: 66, y: 132, age: 'elder', skin: a.skin, hair: 'bun', hairColor: 'grey', top: 'red', bottom: 'skirt', bottomColor: 'navy', glasses: true, look: 1 };
    const ch = { x: 134, y: 132, age: 'child', ...b, look: -1 };
    const hx = 100, hy = 82;
    g.ra = armTo(g, 'r', hx - 4, hy); ch.la = armTo(ch, 'l', hx + 5, hy + 2);
    s += person({ s: 1.0, ...g }).svg + person({ s: 1.0, ...ch }).svg + `<g transform="translate(${hx - 11} ${hy - 20}) scale(0.24)">${A.obj('envelope')}</g>`;
    // the celebration: red paper lanterns hanging and a bowl of oranges on a low table (review round 1: a plain room
    // with a plant said nothing about a celebration). No words.
    s += [[24, 8, 1], [176, 8, 1], [150, 4, 0.8]].map(([x, y, k]) => lantern(x, y, k)).join('');
    s += `<g data-sk-drawn="bowl-of-oranges"><rect x="160" y="88" width="34" height="5" rx="1.5" fill="#B07A4E" stroke="${OUT}" stroke-width="1"/><line x1="164" y1="93" x2="164" y2="108" stroke="${OUT}" stroke-width="2"/><line x1="190" y1="93" x2="190" y2="108" stroke="${OUT}" stroke-width="2"/>${[[171, 78], [183, 78], [177, 71]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.6" fill="#F39C40" stroke="${OUT}" stroke-width="1"/><path d="M${x},${y - 5.6} q2.5,-3 5,-1.5 q-2.5,2 -5,1.5 Z" fill="#3F9B4B"/>`).join('')}<path d="M164,80 Q177,92 190,80 Z" fill="#7EC8E3" stroke="${OUT}" stroke-width="1.2"/></g>`;
    return s;
  }
  throw new Error('traditionArt: ' + id);
}
/** a red paper lantern hanging on its string (view units; k = size) */
const lantern = (x, y, k = 1) => `<g data-sk-drawn="lantern" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})"><line x1="0" y1="-8" x2="0" y2="3" stroke="${OUT}" stroke-width="1"/><rect x="-4" y="2" width="8" height="3" fill="#E6B422" stroke="${OUT}" stroke-width="0.8"/><ellipse cx="0" cy="14" rx="10" ry="10" fill="#D7262E" stroke="${OUT}" stroke-width="1.2"/><path d="M-4,5 Q-8,14 -4,23 M4,5 Q8,14 4,23 M0,4 L0,24" fill="none" stroke="#9B3B34" stroke-width="0.9"/><rect x="-4" y="23" width="8" height="3" fill="#E6B422" stroke="${OUT}" stroke-width="0.8"/><line x1="0" y1="26" x2="0" y2="33" stroke="#E6B422" stroke-width="2"/></g>`;
const traditionObject = (o, px) => (o === 'hat' ? pic(B.PARTY_HAT, px) : scene(A.obj(o === 'diya' ? 'diya' : o === 'pie' ? 'pumpkin-pie' : 'envelope'), px, px, '0 0 100 100', `data-sk-art="object:${o}"`));

DK.MODES['sk-traditions'] = function traditions(d, rng) {
  let set;
  if (d.n === 2) {
    const ok = (p) => !B.TRADITION_CONFUSABLE.some(([o, sc]) => p.some((t) => t.object === o) && p.some((t) => t.id === sc));
    for (let t = 0; t < 200; t++) { set = rng.sample(B.TRADITIONS, 2); if (ok(set)) break; }
  } else set = rng.shuffle(B.TRADITIONS);
  const kids = cast(4 * set.length, rng);
  const ro = rightOrder(set.length, rng);
  // level 1 (review round 1): the scene cards ran past the right margin and the dots sat an inch apart
  const h = d.n === 2 ? 318 : d.draw ? 118 : 150, lw = d.n === 2 ? 140 : d.draw ? 128 : 150, rw = d.n === 2 ? 330 : d.draw ? 240 : 300;
  const lefts = set.map((t) => ({ key: t.object, partner: t.id, html: traditionObject(t.object, Math.min(lw, h) - 20) }));
  const rights = ro.map((j) => [set[j], j]).map(([t, j]) => ({ key: t.id, html: fitScene(traditionArt(t.id, kids.slice(4 * j, 4 * j + 4), rng), rw - 8, h - 8, `data-sk-art="tradition:${t.id}"`) }));
  let html = matchRows(lefts, rights, lw, rw, h, d.n === 2 ? 150 : 90);
  if (d.draw) html += col(labelledDraw(W - 20, 'auto', 'a tradition my family keeps', 'data-dk-prompt="tradition"', 'flex:1 1 auto;min-height:140px'), 0, 'flex:1.1 1 0;min-height:0');
  return { html: SKCSS + grow(html, 'gap:10px'), meta: { pairs: set.map((t) => t.object + '>' + t.id), right: ro.map((j) => set[j].id) } };
};

/* ================================================================ K-716 long ago and today */
const nowPic = (t, px) => (t.nowPic ? pic(t.nowPic, px) : scene(A.obj(t.now), px, px, '0 0 100 100', `data-sk-art="now:${t.now}"`));
DK.MODES['sk-then-now'] = function thenNow(d, rng) {
  const set = d.n === 2 ? rng.sample(B.THEN_NOW, 2) : rng.shuffle(B.THEN_NOW);
  const ro = rightOrder(set.length, rng);
  const h = d.n === 2 ? 300 : d.draw ? 116 : 152, px = Math.min(d.n === 2 ? 210 : 150, h - 16);
  const lefts = set.map((t) => ({ key: t.old, partner: t.now, html: scene(A.obj(t.old), px, px, '0 0 100 100', `data-sk-art="old:${t.old}"`) }));
  const rights = ro.map((j) => set[j]).map((t) => ({ key: t.now, html: nowPic(t, px - 8) }));
  const lw = px + 24;
  const headRow = `<div class="dk-row" style="justify-content:space-between;width:${W}px">${head('long ago', `style="width:${lw}px;text-align:center"`)}${head('today', `style="width:${lw}px;text-align:center"`)}</div>`;
  let html = headRow + matchRows(lefts, rights, lw, lw, h, 120);
  if (d.draw) html += col(labelledDraw(W - 20, 'auto', 'a toy a grown-up at home played with long ago', 'data-dk-prompt="toy"', 'flex:1 1 auto;min-height:140px'), 0, 'flex:1.1 1 0;min-height:0');
  return { html: SKCSS + grow(html, 'gap:10px'), meta: { pairs: set.map((t) => t.old + '>' + t.now), right: ro.map((j) => set[j].now) } };
};

/* ================================================================ K-718 who makes it? who does it? */
/** a haircut happening: a child in a barber chair under a cape, a neat new haircut (a clear part line, combed), and the
 *  cut hair in the child's OWN hair colour: short tufts of straight strands lying on the cape, two falling, and a small
 *  heap of strands on the floor each side of the chair (review round 1: a hand mirror read as a lollipop; review round 2:
 *  curled strands read as hooks, a face on the cape, and bugs or spiders on the floor). No scissors and no comb: those
 *  are the barber's, on the barber's card. */
function haircutArt(c) {
  const p = person({ x: 50, y: 92, s: 0.95, age: 'child', ...c, hair: 'short', mood: 'smile' });
  const hd = p.head(), hc = HAIR[c.hairColor] || HAIR.dark, r = hd.r, skin = SKIN[c.skin] || SKIN.s2;
  const line = (x1, y1, x2, y2, w = 1.5) => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${hc}" stroke-width="${w}" stroke-linecap="round"/>`;
  /** a tuft (a lock of cut hair): four short straight strands side by side, nearly parallel, ends a little uneven;
   *  (x, y) its middle, ang its direction (deg), L its length (view units) */
  const tuft = (x, y, ang, L = 9, where = 'cape') => `<g data-sk-clipping="${where}">${[[-1.5, -4, 0, 0.9], [-0.5, -1.5, 1.2, 1], [0.5, 1.5, -0.8, 0.95], [1.5, 4, 0.6, 0.82]].map(([k, da, sh, f]) => { const t = (ang + da) * Math.PI / 180, ux = Math.cos(t), uy = Math.sin(t), ox = x - uy * k * 1.7 + ux * sh, oy = y + ux * k * 1.7 + uy * sh, l = L * f; return line(ox - ux * l / 2, oy - uy * l / 2, ox + ux * l / 2, oy + uy * l / 2, 0.95); }).join('')}</g>`;
  /** a small heap of straight strands on the floor: longer ones at the bottom, crossing a little */
  const heap = (x, y) => `<g data-sk-clipping="floor">${[[-8, 0, 16, 2], [-7, -1.5, 15, -4], [-6, -3, 12, 6], [-4.5, -4.5, 9, -7], [-3, -5.8, 6, 3], [-1, -1, 10, 10], [-7.5, 1, 12, -1], [-5, -2.4, 11, -12]].map(([dx, dy, L, a]) => { const t = a * Math.PI / 180; return line(x + dx, y + dy, x + dx + Math.cos(t) * L, y + dy + Math.sin(t) * L, 0.95); }).join('')}</g>`;
  // the neat new cut: a clear part line on one side, and the combed hair's direction
  const part = `<g data-sk-drawn="hair-part"><path d="M${f1(hd.x - r * 0.42)},${f1(hd.y - r * 1.02)} Q${f1(hd.x - r * 0.4)},${f1(hd.y - r * 0.74)} ${f1(hd.x - r * 0.3)},${f1(hd.y - r * 0.44)}" fill="none" stroke="${skin}" stroke-width="1.5" stroke-linecap="round" data-sk-part="1"/>` +
    [0.2, 0.55].map((k) => `<path d="M${f1(hd.x - r * 0.2 + k * r * 0.6)},${f1(hd.y - r * 1.0)} Q${f1(hd.x + k * r * 0.9)},${f1(hd.y - r * 0.85)} ${f1(hd.x + r * (0.35 + k * 0.6))},${f1(hd.y - r * 0.5)}" fill="none" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="0.9" stroke-linecap="round"/>`).join('') + '</g>';
  const cy = hd.y + r + 1;
  const cape = `<path d="M${f1(hd.x - 22)},80 Q${f1(hd.x - 22)},${f1(cy + 1)} ${f1(hd.x)},${f1(cy)} Q${f1(hd.x + 22)},${f1(cy + 1)} ${f1(hd.x + 22)},80 Z" fill="#7EC8E3" stroke="${OUT}" stroke-width="1.3" data-sk-drawn="barber-cape"/>`;
  return `<rect x="0" y="0" width="100" height="100" fill="#EAF2EE"/><rect x="0" y="86" width="100" height="14" fill="#E6DBC6"/>` +
    `<g data-sk-drawn="barber-chair"><rect x="26" y="28" width="48" height="40" rx="6" fill="#D9534F" stroke="${OUT}" stroke-width="1.4"/><rect x="22" y="64" width="56" height="8" rx="3" fill="#D9534F" stroke="${OUT}" stroke-width="1.2"/><rect x="46" y="72" width="8" height="12" fill="#A7B3BE" stroke="${OUT}" stroke-width="1"/><ellipse cx="50" cy="86" rx="16" ry="3" fill="#A7B3BE" stroke="${OUT}" stroke-width="1"/></g>` +
    p.svg + part + cape +
    `<g data-sk-drawn="hair-clippings" data-sk-haircolor="${hc}">${[[hd.x - 12, cy + 9, 25], [hd.x + 11, cy + 11, -30], [hd.x - 3, cy + 22, 80], [hd.x + 12, 74, 15]].map(([x, y, a]) => tuft(x, y, a)).join('')}` +
    `${[[19, 74, 70], [81, 77, 110]].map(([x, y, a]) => tuft(x, y, a, 9, 'falling')).join('')}${heap(14, 95)}${heap(82, 95)}</g>` +
    `<g data-sk-drawn="sparkle">${[[hd.x + 15, hd.y - 12, 5], [hd.x + 22, hd.y - 2, 3.5]].map(([x, y, r2]) => `<path d="M${f1(x)},${f1(y - r2)} L${f1(x + r2 * 0.3)},${f1(y - r2 * 0.3)} L${f1(x + r2)},${f1(y)} L${f1(x + r2 * 0.3)},${f1(y + r2 * 0.3)} L${f1(x)},${f1(y + r2)} L${f1(x - r2 * 0.3)},${f1(y + r2 * 0.3)} L${f1(x - r2)},${f1(y)} L${f1(x - r2 * 0.3)},${f1(y - r2 * 0.3)} Z" fill="#F4C542" stroke="${OUT}" stroke-width="0.8"/>`).join('')}</g>`;
}
function resultHtml(w, px, c) {
  if (w.result === 'haircut') return scene(haircutArt(c), px, px, '0 0 100 100', 'data-sk-art="result:haircut"');
  if (w.result === 'letter') return scene(svgPic(w.mailbox, 8, 6, 84, 90) + `<g transform="rotate(-18 66 36)">${svgPic(w.letterPic, 50, 26, 36, 24)}</g>`, px, px, '0 0 100 100', 'data-sk-art="result:letter-in-mailbox"');
  return pic(w.resultPic, px);
}
DK.MODES['sk-workers'] = function workers(d, rng) {
  const set = d.n === 2 ? rng.sample(B.WORKERS, 2) : rng.shuffle(B.WORKERS);
  const ro = rightOrder(set.length, rng);
  const h = d.n === 2 ? 300 : d.draw ? 112 : 152, px = Math.min(d.n === 2 ? 210 : 150, h - 16), lw = px + 24;
  const looks = cast(set.length + 1, rng), kid = looks.pop();
  const lefts = set.map((w, i) => ({ key: w.id, partner: w.result, html: scene(A.worker(w.id, { skin: looks[i].skin, hair: looks[i].sex === 'f' ? 'bun' : 'short', hairColor: looks[i].hairColor }), px, px, '0 0 100 100', `data-sk-art="worker:${w.id}"`) }));
  const rights = ro.map((j) => set[j]).map((w) => ({ key: w.result, html: resultHtml(w, px, kid) }));
  let html = matchRows(lefts, rights, lw, lw, h, 140);
  if (d.draw) html += row(labelledDraw(320, 'auto', 'a job I want to learn', 'data-dk-prompt="job"', 'flex:1 1 auto;min-height:140px;align-self:stretch') + labelledDraw(320, 'auto', 'what it makes or does', 'data-dk-prompt="result"', 'flex:1 1 auto;min-height:140px;align-self:stretch'), 14, 'flex:1.1 1 0;min-height:0;align-items:stretch');
  return { html: SKCSS + grow(html, 'gap:10px'), meta: { pairs: set.map((w) => w.id + '>' + w.result), right: ro.map((j) => set[j].result), skins: [kid.skin, ...looks.map((l) => l.skin)] } };
};

/* ================================================================ K-725 who helps at our school? */
/** the school nurse, drawn (the library nurses wear a red-cross cap): scrubs, a stethoscope, a bandage in her hand,
 *  beside a cot in the nurse's room */
function nurseArt(skin) {
  const n = person({ x: 46, y: 96, s: 0.82, age: 'adult', skin, hair: 'pony', hairColor: rng0(skin), top: '#5FA8A0', bottom: 'pants', bottomColor: '#5FA8A0', stetho: true, ra: [6, 4, 14, -4] });
  const h = n.hand('r');
  return `<rect x="0" y="0" width="100" height="100" fill="#EAF2EE"/><rect x="0" y="80" width="100" height="20" fill="#E6DBC6"/>` +
    `<g data-sk-drawn="cot"><rect x="64" y="66" width="34" height="8" rx="2" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.2"/><rect x="66" y="60" width="12" height="7" rx="3" fill="#F7F4EE" stroke="${OUT}" stroke-width="1"/><line x1="68" y1="74" x2="68" y2="90" stroke="${OUT}" stroke-width="1.6"/><line x1="94" y1="74" x2="94" y2="90" stroke="${OUT}" stroke-width="1.6"/></g>` +
    n.svg + `<g data-sk-drawn="bandage" transform="rotate(-30 ${f1(h[0])} ${f1(h[1] - 4)})"><rect x="${f1(h[0] - 9)}" y="${f1(h[1] - 7)}" width="18" height="7" rx="3.5" fill="#F0C08F" stroke="${OUT}" stroke-width="0.9"/><rect x="${f1(h[0] - 3)}" y="${f1(h[1] - 7)}" width="6" height="7" fill="#F7F4EE" stroke="${OUT}" stroke-width="0.7"/></g>`;
}
const rng0 = (skin) => (skin === 's1' ? 'brown' : 'black');
/** the problem pictures */
function problemArt(id, c) {
  const P = (o) => person({ age: 'child', s: 1.1, ...c, ...o }).svg;
  const bg = `<rect x="0" y="0" width="140" height="100" fill="#F4EBD9"/><rect x="0" y="80" width="140" height="20" fill="#E6DBC6"/><line x1="0" y1="80" x2="140" y2="80" stroke="${OUT}" stroke-width="1.2"/>`;
  if (id === 'knee') {
    const o = { x: 70, y: 96 + 9 * 1.1, ll: [-10, 6, -18, 9], rl: [7, -5, 13, 9], la: [-7, 9, -14, 18], ra: [7, 9, 18, 16], mood: 'sad', tear: true, bottom: 'shorts' };
    const kx = 70 + (2.5 + 7) * 1.1, ky = 96 + 9 * 1.1 + (-26 - 5) * 1.1;
    return `<rect x="0" y="0" width="140" height="100" fill="#EEF6F8"/>` + grass(140, 80).replace('height="60"', 'height="20"') + P(o) +
      `<g data-sk-drawn="scraped-knee"><ellipse cx="${f1(kx)}" cy="${f1(ky)}" rx="5.5" ry="4.5" fill="#D9534F" stroke="${OUT}" stroke-width="0.8"/>${[[-0.7, -1], [0.2, -1.3], [1, -0.8]].map(([dx, dy]) => `<line x1="${f1(kx + dx * 7)}" y1="${f1(ky + dy * 6)}" x2="${f1(kx + dx * 11)}" y2="${f1(ky + dy * 10)}" stroke="#D9534F" stroke-width="1.8" stroke-linecap="round"/>`).join('')}</g>`;
  }
  // the child in the hallway (lockers), thinking of a dinosaur book: NO bookshelf here, the bookshelf is the librarian's
  // (review round 1: a bookshelf on both cards let a child match shelf to shelf without thinking about who helps)
  if (id === 'book') return bg + `<g data-sk-drawn="lockers">${lockers(6, 20, 2, 19, 60)}</g>` +
    P({ x: 76, y: 96, look: 1, la: [-6, 6, -8, 16], ra: [5, -2, 8, -12] }) + `<g data-sk-drawn="thought"><circle cx="114" cy="28" r="17" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.2"/><circle cx="98" cy="48" r="3.4" fill="#FFFFFF" stroke="${OUT}" stroke-width="1"/><circle cx="91" cy="56" r="2" fill="#FFFFFF" stroke="${OUT}" stroke-width="0.9"/>${bookCover(B.DINO, 100, 14, 27, 28, '#7EC8E3')}</g>`;
  if (id === 'spill') return bg + `<g data-sk-drawn="desk"><rect x="78" y="44" width="54" height="6" fill="#B07A4E" stroke="${OUT}" stroke-width="1.2"/><line x1="84" y1="50" x2="84" y2="80" stroke="${OUT}" stroke-width="2"/><line x1="126" y1="50" x2="126" y2="80" stroke="${OUT}" stroke-width="2"/></g>` +
    `<g data-sk-drawn="spill"><path d="M66,94 Q58,84 80,84 Q96,76 116,82 Q138,86 134,94 Q120,100 96,99 Q76,100 66,94 Z" fill="#9CD3F0" stroke="${OUT}" stroke-width="1.3"/><g transform="rotate(-80 106 84)"><path d="M98,72 L114,72 L111,94 L101,94 Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.3"/><rect x="98" y="72" width="16" height="5" fill="#7EC8E3"/></g></g>` + P({ x: 40, y: 96, mood: 'open', look: 1, la: [-6, -6, -10, -18], ra: [6, -6, 10, -18] });
  if (id === 'lunch') return bg + P({ x: 70, y: 96, look: 0, la: [-3, 10, 8, 14], ra: [3, 10, -8, 14] }) + `<g data-sk-drawn="empty-lunch-tray"><rect x="50" y="62" width="40" height="18" rx="3" fill="#7EC8E3" stroke="${OUT}" stroke-width="1.3"/><rect x="54" y="65" width="14" height="12" rx="2" fill="#BFE3F2" stroke="${OUT}" stroke-width="0.8"/><rect x="71" y="65" width="15" height="5" rx="2" fill="#BFE3F2" stroke="${OUT}" stroke-width="0.8"/><rect x="71" y="72" width="15" height="5" rx="2" fill="#BFE3F2" stroke="${OUT}" stroke-width="0.8"/></g>` + `<g data-sk-drawn="hungry"><circle cx="112" cy="24" r="14" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.2"/><circle cx="98" cy="40" r="3" fill="#FFFFFF" stroke="${OUT}" stroke-width="1"/><path d="M104,24 h16 M106,19 v10 M114,19 v10" stroke="${OUT}" stroke-width="0"/><ellipse cx="112" cy="26" rx="8" ry="4" fill="#F7F4EE" stroke="${OUT}" stroke-width="1"/><path d="M106,24 q6,-8 12,0" fill="#B5652E" stroke="${OUT}" stroke-width="0.8"/></g>`;
  // going home early: a WELL child (smiling, coat on, backpack on) and a grown-up at the school's front door holding the
  // car keys (review round 1: a child going home early can look sick, and the nurse could be argued)
  if (id === 'pickup') {
    const g = { x: 98, y: 96, s: 0.92, age: 'adult', skin: c.skin, hair: 'short', hairColor: rng0(c.skin), top: 'navy', bottomColor: 'khaki', look: -1, la: [-8, 1, -16, -5] };
    const gp = person(g), kh = gp.hand('l');
    // the car keys hang from the grown-up's raised hand, held out toward the child
    const keys = `<g data-sk-drawn="car-keys" transform="translate(${f1(kh[0])} ${f1(kh[1])}) scale(1.6)"><circle cx="0" cy="3" r="2.6" fill="none" stroke="#5A5A5A" stroke-width="1.1"/>${[[-2.2, 18], [2.2, -14]].map(([dx, rot]) => `<g transform="rotate(${rot} 0 3)"><circle cx="${dx}" cy="7.4" r="2.3" fill="#E6B422" stroke="${OUT}" stroke-width="0.5"/><rect x="${f1(dx - 0.9)}" y="9" width="1.8" height="7" fill="#E6B422" stroke="${OUT}" stroke-width="0.45"/></g>`).join('')}</g>`;
    return bg + `<g data-sk-drawn="front-door">${door(106, 24, 28, 56, '#4A7BD0')}</g>` + gp.svg + keys + P({ x: 36, y: 96, look: 1, mood: 'smile', coat: 'red', backpack: 'orange', ra: [6, -6, 9, -17] });
  }
  throw new Error('problemArt: ' + id);
}
DK.MODES['sk-helpers'] = function helpers(d, rng) {
  const set = d.n === 3 ? B.HELPER_L1.map((id) => B.HELPERS.find((h) => h.id === id)) : rng.shuffle(B.HELPERS);
  const order = rng.shuffle(set);
  const ro = rightOrder(order.length, rng);
  const kids = cast(order.length + 1, rng);
  // review round 2 (level 3): the five rows are a little shorter, the pictures fill more of their cards (the cards had
  // room) and the box for "a helper I met on our school walk" takes the rest: about 2.5 inches
  const h = d.n === 3 ? 196 : d.draw ? 93 : 124, lw = d.n === 3 ? 250 : d.draw ? 150 : 176, px = d.draw ? h - 8 : h - 14;
  const lefts = order.map((x, i) => ({ key: x.problem, partner: x.id, html: scene(problemArt(x.problem, kids[i]), lw - 10, px, '0 0 140 100', `data-sk-art="problem:${x.problem}"`) }));
  const looks = cast(order.length, rng);
  const rights = ro.map((j) => [order[j], looks[j]]).map(([x, l]) => ({ key: x.id, html: scene(A.worker(x.draw, { skin: l.skin, hair: l.sex === 'f' ? 'bun' : 'short', hairColor: l.hairColor }), px, px, '0 0 100 100', `data-sk-art="helper:${x.id}"`) }));
  let html = d.draw ? matchRows(lefts, rights, lw, px + 20, h, 130, 'flex:0 0 auto') : matchRows(lefts, rights, lw, px + 20, h, 130);
  if (d.draw) html += col(labelledDraw(W - 20, 'auto', 'a helper I met on our school walk', 'data-dk-prompt="helper"', 'flex:1 1 auto;min-height:236px'), 0, 'flex:1 1 auto;min-height:0');
  return { html: SKCSS + grow(html, d.draw ? 'gap:6px' : 'gap:8px'), meta: { pairs: order.map((x) => x.problem + '>' + x.id), right: ro.map((j) => order[j].id), skins: kids.map((k) => k.skin) } };
};

/* ================================================================ K-717 choosing one thing */
/** what limits the choice, before each row: a plain "1" and (one coin) an open hand holding one coin / (one book) a hand
 *  holding one book / (recess) nothing more, the teacher says "recess has time for one". Review round 1 ruling: the lead
 *  is SMALLER than the two choices, UNFRAMED (it is not a third thing to circle) and an arrow points from it to the pair
 *  (a framed coin or clock the size of the choices could be circled as a choice, and a clock means nothing at five). */
function leadTile(kind, h) {
  const px = Math.max(56, Math.min(92, h - 76));
  const icon = kind === 'coin' ? scene(A.obj('coin-hand'), px, px, '0 0 100 100', 'data-sk-art="lead:coin"') : kind === 'book' ? scene(A.obj('book-hand'), px, px, '0 0 100 100', 'data-sk-art="lead:book"') : '';
  const arrow = `<span data-dk-box data-sk-arrow="1" style="display:block;flex-shrink:0">${scene(`<path d="M2,12 L28,12" stroke="${T.teal}" stroke-width="4.5" stroke-linecap="round"/><path d="M24,3 L37,12 L24,21 Z" fill="${T.teal}"/>`, 40, 24, '0 0 40 24')}</span>`;
  return `<div data-dk-box data-sk-lead="${kind}" style="flex-shrink:0;width:96px;display:flex;flex-direction:column;align-items:center;gap:2px"><span data-dk-box data-sk-one="1" style="display:block;font-family:'Baloo 2',cursive;font-weight:700;font-size:40px;line-height:44px;color:${T.teal}">1</span>${icon}</div>` + arrow;
}
const choicePic = (x, px) => (typeof x === 'string' ? scene(bookCover(x === 'truck-book' ? B.TRUCK : B.DINO, 14, 6, 72, 88, x === 'truck-book' ? '#F4C542' : '#7EC8E3'), px, px, '0 0 100 100', `data-sk-art="choice:${x}"`) : pic(x, px));
DK.MODES['sk-choose'] = function choose(d, rng) {
  const rowsSet = rng.sample(B.CHOICES, d.rows);
  const h = d.rows === 2 ? 300 : d.draw ? 150 : 214, px = Math.min(h - 34, 186);
  const rows = rowsSet.map((r) => {
    const two = rng.next() < 0.5 ? [r.a, r.b] : [r.b, r.a];
    const key = (x) => (typeof x === 'string' ? x : x.noun);
    return box('dk-tile', W, 'auto', row(leadTile(r.lead, h - 14) + two.map((x) => tile(choicePic(x, px), 214, h - 14, `data-sk-choice="${key(x)}"`, 'white')).join(`<span class="sk-or" data-dk-box>or</span>`), 10), `data-dk-item="${r.id}" data-sk-open="1"`, 'flex:1 1 0;min-height:0');
  });
  if (d.draw) rows.push(col(labelledDraw(W - 20, 'auto', 'me with the thing I picked', 'data-dk-prompt="picked"', 'flex:1 1 auto;min-height:140px'), 0, 'flex:1.1 1 0;min-height:0'));
  return { html: SKCSS + grow(rows.join(''), 'gap:10px'), meta: { record: 1, rows: rowsSet.map((r) => r.id) } };
};

/* ================================================================ K-719 our flag */
/** the flag of the United States, to its own proportions (hoist 1, fly 1.9; Executive Order 10834). colored = the model;
 *  outline = to color (stripes and stars outlined, white); dots = small red dots in every red stripe (level 1) */
function flagSvg(FW, { colored = false, dots = false } = {}) {
  const F = B.FLAG, H = FW / F.fly, sh = H / 13, cw = F.cantonW * H, ch = 7 * sh;
  const red = colored ? F.red_ : '#FFFFFF', blue = colored ? F.blue_ : '#FFFFFF';
  let s = '';
  for (let i = 0; i < 13; i++) s += `<rect x="0" y="${f1(i * sh)}" width="${f1(FW)}" height="${f1(sh)}" fill="${i % 2 === 0 ? red : '#FFFFFF'}" stroke="${OUT}" stroke-width="${colored ? 0.6 : 1.4}" data-sk-stripe="${i % 2 === 0 ? 'red' : 'white'}"/>`;
  if (dots) for (let i = 0; i < 13; i += 2) { const x0 = i < 7 ? cw + 18 : 18, n = Math.floor((FW - x0 - 10) / 38); for (let k = 0; k < n; k++) s += `<circle cx="${f1(x0 + k * 38)}" cy="${f1((i + 0.5) * sh)}" r="${f1(Math.min(3.2, sh * 0.18))}" fill="${B.FLAG.red_}" data-sk-reddot="1"/>`; }
  s += `<rect x="0" y="0" width="${f1(cw)}" height="${f1(ch)}" fill="${blue}" stroke="${OUT}" stroke-width="${colored ? 0.6 : 1.4}" data-sk-canton="1"/>`;
  const K = F.starD * H / 2, E = F.E * H, G = F.G * H;
  let n = 0;
  F.rows.forEach((cnt, r) => { for (let k = 0; k < cnt; k++) { const cx = cnt === 6 ? G * (2 * k + 1) : G * (2 * k + 2), cy = E * (r + 1); const pts = Array.from({ length: 10 }, (_, j) => { const a = -Math.PI / 2 + j * Math.PI / 5, rr = j % 2 ? K * 0.4 : K; return f1(cx + Math.cos(a) * rr) + ',' + f1(cy + Math.sin(a) * rr); }).join(' '); s += `<polygon points="${pts}" fill="#FFFFFF" stroke="${colored ? 'none' : OUT}" stroke-width="${colored ? 0 : 0.7}" data-sk-star="1"/>`; n++; } });
  s += `<rect x="0" y="0" width="${f1(FW)}" height="${f1(H)}" fill="none" stroke="${OUT}" stroke-width="${colored ? 1.4 : 2.6}"/>`;
  return scene(s, FW + 4, H + 4, `-2 -2 ${f1(FW + 4)} ${f1(H + 4)}`, `data-sk-flag="${colored ? 'model' : 'outline'}" data-sk-stars="${n}"`);
}
// review round 1: the model flag and the crayon chips are larger, so the page fills (a fifth of it was blank)
const crayonChip = (c, label) => `<span class="sk-key" data-dk-box data-sk-swatch="${label}" style="font-size:23px;gap:10px">${scene(`<rect x="2" y="7" width="34" height="14" rx="3" fill="${c}" stroke="${OUT}" stroke-width="1.6"/><path d="M36,7 L46,14 L36,21 Z" fill="${c}" stroke="${OUT}" stroke-width="1.6"/>`, 72, 42, '0 0 48 28')}${esc(label)}</span>`;
DK.MODES['sk-flag'] = function flag(d, rng) {
  const parts = [];
  parts.push(col(flagSvg(664, { dots: !!d.dots }), 0));
  const chips = [crayonChip(B.FLAG.red_, 'red'), crayonChip('#FFFFFF', 'white'), crayonChip(B.FLAG.blue_, 'blue')].join('');
  // levels 1 and 2: the model as large as the page allows, the chips in a row under it; level 3 (the count row below):
  // the chips beside the model
  if (d.count) parts.push(row(col(head('color it like this') + flagSvg(440, { colored: true }), 4) + col(chips, 14, 'align-items:flex-start'), 26, 'align-items:center'));
  else parts.push(col(head('color it like this') + flagSvg(520, { colored: true }) + row(chips, 34), 6));
  if (d.count) {
    const wrong = rng.sample(B.FLAG.countWrong, 2);
    const nums = rng.shuffle([13, ...wrong]);
    parts.push(row(head('How many stripes?') + nums.map((n) => `<span class="sk-num" data-dk-box data-sk-key="${n}" data-dk-answer="${n === 13 ? 'right' : 'no'}" style="width:64px;height:56px;font-size:30px">${n}</span>`).join(''), 18, 'flex-wrap:nowrap'));
  }
  return { html: SKCSS + grow(parts.join(''), 'gap:16px;align-items:center;justify-content:flex-start'), meta: d.count ? { item: 'stripes' } : { record: 1 } };
};

/* ================================================================ K-720 Martin Luther King Jr. */
/** a large crowd of people of many skin tones, seen from among the crowd (their backs to us), before a white building
 *  with columns; Martin Luther King Jr. is drawn SMALL at a lectern far away (no likeness is attempted) */
function mlkArt(rng) {
  // view box 300 x 150: a white building with columns and wide steps at the top; Dr. King SMALL at a lectern on the top
  // step (no likeness is attempted); the lawn; and a large crowd of many skin tones, seen from among it: heads and
  // shoulders with their backs to us, smaller and smaller toward the steps, a few at the edges turned toward us
  let s = `<rect x="0" y="0" width="300" height="150" fill="#EEF6F8"/>`;
  s += `<g data-sk-drawn="memorial"><rect x="78" y="4" width="144" height="10" fill="#F7F4EE" stroke="${OUT}" stroke-width="1.1"/>${Array.from({ length: 12 }, (_, k) => `<rect x="${f1(84 + k * 11.6)}" y="14" width="5.4" height="28" fill="#F7F4EE" stroke="${OUT}" stroke-width="0.8"/>`).join('')}` +
    `<rect x="72" y="42" width="156" height="6" fill="#E8E2D6" stroke="${OUT}" stroke-width="1"/><rect x="62" y="48" width="176" height="6" fill="#E8E2D6" stroke="${OUT}" stroke-width="1"/><rect x="52" y="54" width="196" height="6" fill="#E8E2D6" stroke="${OUT}" stroke-width="1"/></g>`;
  s += [[14, 62, 30], [36, 62, 24], [264, 62, 26], [288, 62, 30]].map(([x, y, h]) => A.tree(x, y, h)).join('');
  s += `<rect x="0" y="60" width="300" height="90" fill="#9CCB7C"/><line x1="0" y1="60" x2="300" y2="60" stroke="${OUT}" stroke-width="1"/>`;
  // Dr. King at the lectern, on the top step, one hand raised as he speaks
  s += `<g data-sk-drawn="speaker-at-lectern">` + person({ x: 150, y: 48, s: 0.34, age: 'adult', skin: 's5', hair: 'short', hairColor: 'black', top: 'navy', bottomColor: 'navy', ra: [6, -6, 11, -16] }).svg +
    `<path d="M142,35 L158,35 L156,48 L144,48 Z" fill="#8B5E3C" stroke="${OUT}" stroke-width="0.7"/><line x1="146" y1="35" x2="145" y2="29" stroke="${OUT}" stroke-width="0.8"/><line x1="154" y1="35" x2="155" y2="29" stroke="${OUT}" stroke-width="0.8"/><circle cx="145" cy="28.4" r="1.2" fill="${OUT}"/><circle cx="155" cy="28.4" r="1.2" fill="${OUT}"/></g>`;
  // the crowd, far rows first; the near rows stand below the frame, so only their heads and shoulders show
  const rows = [[78, 0.26, 30, 34], [90, 0.33, 26, 26], [106, 0.43, 21, 0], [128, 0.58, 16, 0], [160, 0.8, 12, 0], [206, 1.08, 9, 0]];
  let k = 0;
  rows.forEach(([y, sc, n, gap]) => {
    const step = 300 / n;
    for (let i = 0; i < n; i++) {
      const x = step * (i + 0.5) + ((k % 2) - 0.5) * step * 0.35;
      if (gap && Math.abs(x - 150) < gap) continue;   // a clear view of the speaker
      const tone = TONES[k++ % 6], sex = rng.next() < 0.5 ? 'f' : 'm';
      const hair = sex === 'f' ? rng.pick(['long', 'bun', 'puffs', 'braids', 'curly', 'pony', 'hijab']) : rng.pick(['short', 'curly', 'short', 'bald']);
      const turned = x < 34 || x > 266;
      s += person({ x, y, s: sc, age: 'adult', skin: tone, hair, hairColor: hair === 'bald' ? 'grey' : hair === 'hijab' ? rng.pick(['#8E6CC5', '#2A9D8F', '#D9534F']) : rng.pick(HAIRCOL[tone]), top: rng.pick(TOPS), bottomColor: 'denim', back: !turned, look: x < 150 ? 1 : -1 }).svg;
    }
  });
  return s;
}
DK.MODES['sk-mlk'] = function mlk(d, rng) {
  const parts = [col(tile(scene(mlkArt(rng), 655, 327, '0 0 300 150', 'data-sk-art="mlk:crowd"'), 667, 337, 'data-sk-mlk="1"', 'white'), 0)];
  // review round 1: level 1 is ONE box, "me and my friend" (two portraits in two boxes cannot show two friends being
  // fair to each other); levels 2 and 3 ask for "a game where everyone gets a turn" (a "fair game" is vague at five);
  // level 3's word is CIRCLED among the three the teacher reads (the line beside the buttons left the teacher unsure)
  if (d.level === 1) parts.push(col(labelledDraw(W - 20, 'auto', 'me and my friend', 'data-dk-prompt="me-and-friend"', 'flex:1 1 auto;min-height:200px'), 0, 'flex:1 1 auto;min-height:0;align-self:stretch;align-items:center'));
  else parts.push(col(labelledDraw(W - 20, 'auto', 'a game where everyone gets a turn', 'data-dk-prompt="fair-play"', 'flex:1 1 auto;min-height:200px'), 0, 'flex:1 1 auto;min-height:0;align-self:stretch;align-items:center'));
  // review round 2: each word carries a small picture a five-year-old tells apart without reading (the words stay, for the
  // teacher): fair = two friends taking turns on the slide, kind = a friend helping a friend up, share = a friend sharing
  // the crayons (the batch's own drawings, K-713); the child circles one
  if (d.word) {
    const kids = cast(9, rng);
    const WORD_PIC = { fair: 'slide', kind: 'help-up', share: 'crayons' };
    parts.push(`<div class="dk-row" data-dk-box data-sk-word="1" style="gap:22px;width:${W - 40}px;justify-content:center"><span class="dk-head">my word:</span>${['fair', 'kind', 'share'].map((w2, i) => `<span class="dk-pill" data-sk-wordpick="${w2}" style="flex-direction:column;gap:0;border-radius:20px;font-size:22px;line-height:28px;padding:6px 10px 3px">${fitSceneCrop(friendArt(WORD_PIC[w2], kids.slice(3 * i, 3 * i + 3)), 128, 96, `data-sk-art="word:${w2}" data-sk-wordpic="${WORD_PIC[w2]}"`, 140, 140, 22)}${w2}</span>`).join('')}</div>`);
  }
  return { html: SKCSS + grow(parts.join(''), 'gap:12px;align-items:center'), meta: { record: 1 } };
};

/* ================================================================ K-722 land and water on the globe */
function globeSvg(px, { big = false, dots = false } = {}) {
  const G = B.GLOBE_DATA();
  const rings = G.rings.filter((r) => !big || r.area >= 1500);
  let s = `<circle cx="500" cy="500" r="500" fill="#FFFFFF" stroke="${OUT}" stroke-width="7" data-sk-globe="1"/>`;
  s += rings.map((r) => `<path d="M${r.pts.map((p) => p[0] + ',' + p[1]).join(' L')} Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="5" stroke-linejoin="round" data-sk-land="${r.name}" data-sk-area="${r.area}"/>`).join('');
  if (dots) s += Object.entries(G.dots).map(([k, p]) => `<circle cx="${p.x}" cy="${p.y}" r="22" fill="${B.GLOBE_KEY.water}" stroke="${OUT}" stroke-width="3" data-sk-oceandot="${k}"/>`).join('');
  // level 1: a green dot in every land shape too (review round 1: at the globe's edge a child could not tell which side of
  // a line is land, and many would color Africa blue)
  if (dots) s += B.LAND_DOTS.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="${p.r}" fill="${B.GLOBE_KEY.land}" stroke="${OUT}" stroke-width="${p.r > 12 ? 3 : 1.6}" data-sk-landdot="${p.ring}"/>`).join('');
  return scene(s, px, px, '-8 -8 1016 1016', `data-sk-globeart="1" data-sk-rings="${rings.length}"`);
}
DK.MODES['sk-globe'] = function globe(d, rng) {
  const key = row(`<span class="sk-key" data-dk-box data-sk-swatch="water">${scene(`<rect x="1" y="1" width="46" height="30" rx="6" fill="${B.GLOBE_KEY.water}" stroke="${OUT}" stroke-width="1.6"/><path d="M6,18 q5,-6 10,0 q5,6 10,0 q5,-6 10,0 q5,6 10,0" fill="none" stroke="#FFFFFF" stroke-width="2.4"/>`, 48, 32, '0 0 48 32')} water: blue</span>` +
    `<span class="sk-key" data-dk-box data-sk-swatch="land">${scene(`<rect x="1" y="1" width="46" height="30" rx="6" fill="${B.GLOBE_KEY.land}" stroke="${OUT}" stroke-width="1.6"/>${A.tree(24, 30, 22, '#6BB36B')}`, 48, 32, '0 0 48 32')} land: green</span>` +
    (d.star ? `<span class="sk-key" data-dk-box data-sk-swatch="star">${scene(`<polygon points="${Array.from({ length: 10 }, (_, j) => { const a = -Math.PI / 2 + j * Math.PI / 5, rr = j % 2 ? 6 : 15; return f1(16 + Math.cos(a) * rr) + ',' + f1(16 + Math.sin(a) * rr); }).join(' ')}" fill="#FFFFFF" stroke="${OUT}" stroke-width="1.8"/>`, 32, 32, '0 0 32 32')} the United States</span>` : ''), 26);
  const size = d.more ? 540 : d.star ? 560 : 590;
  // level 2 (review round 1): "Is there more water or more land?" gets a place to answer: circle the wave (more water)
  // or the tree (more land); which one is on the left is random. Review round 2: level 3 asks it too (it is the lesson's
  // objective; level 3 does everything level 2 does, plus the star)
  let more = '', waveLeft = null;
  if (d.more) {
    waveLeft = rng.next() < 0.5;
    const wave = tile(scene(`<path d="M6,30 q8,-12 16,0 q8,12 16,0 q8,-12 16,0 q8,12 16,0" fill="none" stroke="${B.GLOBE_KEY.water}" stroke-width="6" stroke-linecap="round"/><path d="M6,48 q8,-12 16,0 q8,12 16,0 q8,-12 16,0 q8,12 16,0" fill="none" stroke="${B.GLOBE_KEY.water}" stroke-width="6" stroke-linecap="round"/>`, 70, 64, '0 0 76 70', 'data-sk-art="more:wave"'), 104, 84, 'data-sk-key="water" data-dk-answer="right"', 'white');
    const tree = tile(scene(A.tree(38, 66, 64, B.GLOBE_KEY.land), 70, 64, '0 0 76 70', 'data-sk-art="more:tree"'), 104, 84, 'data-sk-key="land" data-dk-answer="no"', 'white');
    more = row((waveLeft ? [wave, tree] : [tree, wave]).join('<span class="sk-or" data-dk-box>or</span>'), 18, '');
  }
  return { html: SKCSS + grow(col(globeSvg(size, { big: !!d.big, dots: !!d.dots }), 0) + more + key, 'gap:14px;align-items:center;justify-content:space-around'), meta: d.more ? { item: 'more', waveLeft } : { record: 1, big: !!d.big, dots: !!d.dots } };
};

/* ================================================================ K-723 a map of a neighborhood */
/** a place on the map, as a small picture (the key uses the SAME picture): view box 0 0 60 60. A house's door is plain
 *  brown, on the map and in the key, except the ONE start house, whose door is red on the map only (review round 1: the
 *  key's red-door house and red, blue, yellow and green doors on the map made a child call the blue-door house "not a
 *  house"). The fire station shows a red fire truck with a ladder in its open bay and a round red light on the roof
 *  (review round 1: a red building with a garage door read as a garage or a barn). */
function placeIcon(kind, door) {
  const roof = (c) => `<path d="M6,26 L30,8 L54,26 Z" fill="${c}" stroke="${OUT}" stroke-width="1.6" stroke-linejoin="round"/>`;
  if (kind === 'school') return `<g data-sk-place="school"><rect x="8" y="22" width="44" height="32" fill="#C96B4B" stroke="${OUT}" stroke-width="1.6"/><path d="M4,24 L30,10 L56,24 Z" fill="#A8483A" stroke="${OUT}" stroke-width="1.6"/><rect x="24" y="2" width="12" height="10" fill="#F7F4EE" stroke="${OUT}" stroke-width="1.2"/><path d="M24,2 L30,-4 L36,2 Z" fill="#A8483A" stroke="${OUT}" stroke-width="1"/><circle cx="30" cy="7" r="2.4" fill="#E6B422"/>${[12, 40].map((x) => `<rect x="${x}" y="28" width="8" height="8" fill="#DDEFF5" stroke="${OUT}" stroke-width="1"/>`).join('')}<rect x="25" y="38" width="10" height="16" fill="#8B5E3C" stroke="${OUT}" stroke-width="1.2" data-sk-schooldoor="1"/><line x1="48" y1="22" x2="48" y2="4" stroke="${OUT}" stroke-width="1.2"/><rect x="48" y="4" width="10" height="6" fill="#D9534F" stroke="${OUT}" stroke-width="0.8"/></g>`;
  if (kind === 'park') return `<g data-sk-place="park"><rect x="4" y="30" width="52" height="24" rx="6" fill="#9CCB7C" stroke="${OUT}" stroke-width="1.4"/>${A.tree(16, 44, 34)}${A.tree(44, 44, 30, '#3F9B4B')}<ellipse cx="31" cy="48" rx="8" ry="4" fill="#BFE3F2" stroke="${OUT}" stroke-width="1"/><rect x="24" y="36" width="12" height="3" fill="#B07A4E" stroke="${OUT}" stroke-width="0.6"/></g>`;
  if (kind === 'fire-station') return `<g data-sk-place="fire-station"><rect x="4" y="18" width="52" height="36" fill="#E8E2D6" stroke="${OUT}" stroke-width="1.6"/><rect x="2" y="13" width="56" height="7" fill="#A8483A" stroke="${OUT}" stroke-width="1.4"/>` +
    `<g data-sk-drawn="roof-light"><rect x="26" y="8" width="8" height="5" fill="#8C8C8C" stroke="${OUT}" stroke-width="0.8"/><circle cx="30" cy="6" r="4.2" fill="#D9534F" stroke="${OUT}" stroke-width="1"/><path d="M22,4 L18,1 M38,4 L42,1 M30,0 L30,-3" stroke="#F2B233" stroke-width="1.4" stroke-linecap="round"/></g>` +
    `<rect x="7" y="25" width="38" height="29" fill="#3B3F46" stroke="${OUT}" stroke-width="1.3" data-sk-bay="open"/>` +
    `<g data-sk-drawn="fire-truck"><rect x="9" y="37" width="24" height="12" rx="1" fill="#D9534F" stroke="${OUT}" stroke-width="1.1"/><path d="M33,49 L33,39 L39,39 L43,44 L43,49 Z" fill="#D9534F" stroke="${OUT}" stroke-width="1.1"/><path d="M35,41 L38.5,41 L41,44 L35,44 Z" fill="#DDEFF5"/>` +
    `<rect x="10" y="32.5" width="26" height="1.8" fill="#F4F1EA" stroke="${OUT}" stroke-width="0.5"/><rect x="10" y="35.5" width="26" height="1.8" fill="#F4F1EA" stroke="${OUT}" stroke-width="0.5"/>${[13, 18, 23, 28, 33].map((x) => `<line x1="${x}" y1="33" x2="${x}" y2="37" stroke="#F4F1EA" stroke-width="1.1"/>`).join('')}` +
    `<circle cx="15" cy="50" r="3.2" fill="${OUT}"/><circle cx="37" cy="50" r="3.2" fill="${OUT}"/><circle cx="15" cy="50" r="1.2" fill="#A7B3BE"/><circle cx="37" cy="50" r="1.2" fill="#A7B3BE"/></g>` +
    `<rect x="47" y="27" width="7" height="8" fill="#DDEFF5" stroke="${OUT}" stroke-width="1"/></g>`;
  if (kind === 'store') return `<g data-sk-place="store"><rect x="6" y="20" width="48" height="34" fill="#F7F4EE" stroke="${OUT}" stroke-width="1.6"/><rect x="4" y="14" width="52" height="7" fill="#3F9B4B" stroke="${OUT}" stroke-width="1.2"/>${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M${6 + k * 8},21 L${14 + k * 8},21 L${14 + k * 8},27 Q${10 + k * 8},31 ${6 + k * 8},27 Z" fill="${k % 2 ? '#FFFFFF' : '#3F9B4B'}" stroke="${OUT}" stroke-width="0.8"/>`).join('')}<rect x="10" y="32" width="18" height="14" fill="#DDEFF5" stroke="${OUT}" stroke-width="1"/>${[[15, 42, '#D9534F'], [21, 42, '#F4C542'], [18, 38, '#6BB36B']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${c}" stroke="${OUT}" stroke-width="0.5"/>`).join('')}<rect x="34" y="34" width="12" height="20" fill="#8B5E3C" stroke="${OUT}" stroke-width="1.2"/></g>`;
  if (kind === 'house') return `<g data-sk-place="house" data-sk-door="${door}"><rect x="12" y="26" width="36" height="28" fill="#F4EBD9" stroke="${OUT}" stroke-width="1.6"/>${roof('#8C8C8C')}<rect x="26" y="36" width="10" height="18" fill="${B.HOODS.doorColor[door]}" stroke="${OUT}" stroke-width="1.4" data-sk-housedoor="1"/><circle cx="34" cy="46" r="0.9" fill="${OUT}"/><rect x="15" y="31" width="8" height="8" fill="#DDEFF5" stroke="${OUT}" stroke-width="1"/><rect x="38" y="31" width="7" height="8" fill="#DDEFF5" stroke="${OUT}" stroke-width="1"/></g>`;
  if (kind === 'lot') return `<g data-sk-place="lot"><rect x="4" y="8" width="52" height="46" rx="4" fill="#FFFFFF" stroke="${T.coral}" stroke-width="2" stroke-dasharray="5 4"/></g>`;
  return '';
}
const PLACE_WORD = { school: 'school', park: 'park', 'fire-station': 'fire station', store: 'store', house: 'house' };
/** where a door's foot is, in an icon's own units (the path starts and ends at a door) */
const DOOR_FOOT = { house: [31, 54], school: [30, 54] };
/** the map: a 3 x 3 grid of blocks between streets (two across, two down, and the edges), places on blocks, a path */
function hoodMap(d, rng, MW, MH) {
  const ST = 22, n = 3, bw = (MW - (n + 1) * ST) / n, bh = (MH - (n + 1) * ST) / n;
  const bx = (c) => ST + c * (bw + ST), by = (r) => ST + r * (bh + ST);
  // places on blocks; the red-door house and the school are never neighbours (the path turns a corner)
  let cells, ok = false;
  for (let t = 0; t < 400 && !ok; t++) {
    cells = rng.shuffle([...Array(9).keys()]);
    const house = cells[0], school = cells[1];
    const [hr, hc] = [Math.floor(house / 3), house % 3], [sr, sc] = [Math.floor(school / 3), school % 3];
    ok = hr !== sr && hc !== sc;
  }
  const put = [];
  put.push({ kind: 'house', door: 'red', cell: cells[0] }, { kind: 'school', cell: cells[1] }, { kind: 'park', cell: cells[2] });
  if (d.places >= 5) { put.push({ kind: 'fire-station', cell: cells[3] }, { kind: 'store', cell: cells[4] }); for (let i = 0; i < 3; i++) put.push({ kind: 'house', door: 'plain', cell: cells[5 + i] }); }
  if (d.lot) put.push({ kind: 'lot', cell: cells[8] });
  // the street grid (gray, from above)
  let s = `<rect x="0" y="0" width="${MW}" height="${MH}" fill="#B9B4AC"/>`;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) s += `<rect x="${f1(bx(c))}" y="${f1(by(r))}" width="${f1(bw)}" height="${f1(bh)}" rx="4" fill="#D6EBC8" stroke="${OUT}" stroke-width="1.2" data-sk-block="${r * 3 + c}"/>`;
  for (let k = 0; k <= n; k++) { const y = k * (bh + ST) + ST / 2, x = k * (bw + ST) + ST / 2; s += `<line x1="0" y1="${f1(y)}" x2="${MW}" y2="${f1(y)}" stroke="#F4F1EA" stroke-width="1.6" stroke-dasharray="6 6"/><line x1="${f1(x)}" y1="0" x2="${f1(x)}" y2="${MH}" stroke="#F4F1EA" stroke-width="1.6" stroke-dasharray="6 6"/>`; }
  const icon = Math.min(bw, bh) * 0.86;
  const at = (cell, u) => { const r = Math.floor(cell / 3), c = cell % 3; return [bx(c) + (bw - icon) / 2 + u[0] * icon / 60, by(r) + (bh - icon) / 2 + u[1] * icon / 60]; };
  for (const p of put) { const r = Math.floor(p.cell / 3), c = p.cell % 3; s += `<g transform="translate(${f1(bx(c) + (bw - icon) / 2)} ${f1(by(r) + (bh - icon) / 2)}) scale(${f1(icon / 60)})" data-sk-at="${p.cell}"${p.kind === 'school' || p.kind === 'park' ? ` data-sk-key="${p.kind}" data-dk-answer="${p.kind === 'school' ? 'circle' : 'x'}"` : ''}>${placeIcon(p.kind, p.door)}</g>`; }
  // level 1: a dotted path to trace, from the red door, along the streets, to the school door (review round 1: larger,
  // darker dots, starting AT the red door and ending AT the school door, not at the edge of a block)
  if (d.trace) {
    const H = put[0].cell, S = put[1].cell, [hr, hc] = [Math.floor(H / 3), H % 3], [sr, sc] = [Math.floor(S / 3), S % 3];
    const hd = at(H, DOOR_FOOT.house), sd = at(S, DOOR_FOOT.school);
    const yH = by(hr) + bh + ST / 2, yS = by(sr) + bh + ST / 2;   // the street below the house's row / the school's row
    const colX = sc > hc ? bx(sc) - ST / 2 : bx(sc) + bw + ST / 2;  // the street beside the school's block, on the house's side
    const pts = [hd, [hd[0], yH], [colX, yH], [colX, yS], [sd[0], yS], sd];
    s += `<polyline points="${pts.map((p) => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="none" stroke="${T.ink}" stroke-width="7" stroke-dasharray="0.1 13" stroke-linecap="round" stroke-linejoin="round" data-sk-path="trace"/>`;
  }
  s += `<rect x="0" y="0" width="${MW}" height="${MH}" fill="none" stroke="${OUT}" stroke-width="3"/>`;
  return { svg: scene(s, MW, MH, `0 0 ${MW} ${MH}`, 'data-sk-art="map:neighborhood" data-sk-map="1"'), put, doorAt: { house: at(put[0].cell, DOOR_FOOT.house), school: at(put[1].cell, DOOR_FOOT.school) } };
}
DK.MODES['sk-hood'] = function hood(d, rng) {
  // review round 1: the map is larger (a sixth of the page was blank under it); the north arrow sits above the key
  const MW = 470, MH = 724;
  const m = hoodMap(d, rng, MW, MH);
  const kinds = [...new Set(m.put.filter((p) => p.kind !== 'lot').map((p) => p.kind))];
  const north = `<span class="sk-key" data-dk-box data-sk-north="1">${scene(`<polygon points="20,2 30,30 20,24 10,30" fill="${T.teal}" stroke="${OUT}" stroke-width="1.4"/>`, 40, 34, '0 0 40 34')}<b style="font-size:24px">N</b></span>`;
  const keyRows = kinds.map((k) => `<div class="sk-key" data-dk-box data-sk-keyrow="${k}">${scene(placeIcon(k, k === 'house' ? 'plain' : null), 56, 56, '0 -6 60 66')}${esc(PLACE_WORD[k])}</div>`).join('');
  const key = tile(col(head('key') + keyRows, 10, 'align-items:flex-start'), 188, 'auto', 'data-sk-mapkey="1"', 'white', 'padding:10px 8px;align-self:flex-start');
  const body = row(m.svg + col(north + key, 14, 'align-self:flex-start;align-items:center'), 14, 'align-items:flex-start');
  return { html: SKCSS + grow(body, 'align-items:center;justify-content:flex-start'), meta: { places: m.put.map((p) => p.kind + (p.door ? ':' + p.door : '') + '@' + p.cell) } };
};

/* ================================================================ K-724 hot places, cold places */
/** the two places, drawn in a VW x 200 view: VW = 140 for the tall cards of levels 1 and 2, and the card's own shape for
 *  level 3's wide cards (review round 1: a tall drawing stretched sideways cut the mountain off at a straight edge, left
 *  the snow bank floating as a white box and put two seams in the sea and the sand). Every part is laid out across VW. */
function placeArt(kind, VW = 140) {
  const k = VW / 140, sx = (x) => f1(x * k), mv = (dx, inner) => `<g transform="translate(${f1(dx)} 0)">${inner}</g>`;
  if (kind === 'cold') {
    let s = `<rect x="0" y="0" width="${f1(VW)}" height="200" fill="#DDEFF5"/>`;
    s += `<path d="M-10,110 L${sx(30)},40 L${sx(60)},90 L${sx(86)},30 L${sx(130)},100 L${f1(VW + 10)},80 L${f1(VW + 10)},120 L-10,120 Z" fill="#A7B3BE" stroke="${OUT}" stroke-width="1.4" stroke-linejoin="round"/>`;
    // the snow caps follow the slopes of the stretched peaks
    const cap = (P, Lf, Rf) => { const y = P[1] + 22, xl = P[0] + (Lf[0] - P[0]) * 22 / (Lf[1] - P[1]), xr = P[0] + (Rf[0] - P[0]) * 22 / (Rf[1] - P[1]); return `<path d="M${f1(xl)},${y} L${f1(P[0])},${P[1]} L${f1(xr)},${y} L${f1(P[0] + (xr - P[0]) * 0.5)},${y - 4} L${f1(P[0])},${y + 2} L${f1(P[0] + (xl - P[0]) * 0.5)},${y - 4} Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1"/>`; };
    s += cap([30 * k, 40], [-10, 110], [60 * k, 90]) + cap([86 * k, 30], [60 * k, 90], [130 * k, 100]);
    s += `<rect x="0" y="118" width="${f1(VW)}" height="82" fill="#F4F8FB"/><line x1="0" y1="118" x2="${f1(VW)}" y2="118" stroke="${OUT}" stroke-width="1.2"/>`;
    s += A.pine(18 * k, 150, 54, true) + A.pine(VW - 16 * k, 146, 48, true) + A.pine(VW - 30 * k, 120, 30, true);
    if (VW > 170) s += A.pine(VW * 0.34, 134, 34, true);
    s += mv(VW / 2 - 68, `<g data-sk-drawn="snowy-house"><rect x="46" y="128" width="44" height="34" fill="#C96B4B" stroke="${OUT}" stroke-width="1.3"/><path d="M40,130 L68,106 L96,130 Z" fill="#8B5E3C" stroke="${OUT}" stroke-width="1.3"/><path d="M42,128 L68,106 L94,128 Q68,120 42,128 Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1"/><rect x="62" y="142" width="12" height="20" fill="#8B5E3C" stroke="${OUT}" stroke-width="1"/><rect x="50" y="136" width="8" height="8" fill="#F7C948" stroke="${OUT}" stroke-width="1"/><rect x="78" y="136" width="8" height="8" fill="#F7C948" stroke="${OUT}" stroke-width="1"/><rect x="80" y="104" width="7" height="14" fill="#8B5E3C" stroke="${OUT}" stroke-width="1"/></g>`);
    const nf = Math.round(16 * k);
    s += Array.from({ length: nf }, (_, q) => { const x = (q * 37) % (VW - 4) + 2, y = (q * 23) % 110 + 6; return `<g data-sk-flake="1"><line x1="${f1(x - 3)}" y1="${y}" x2="${f1(x + 3)}" y2="${y}" stroke="#FFFFFF" stroke-width="1.4"/><line x1="${f1(x)}" y1="${y - 3}" x2="${f1(x)}" y2="${y + 3}" stroke="#FFFFFF" stroke-width="1.4"/><line x1="${f1(x - 2)}" y1="${y - 2}" x2="${f1(x + 2)}" y2="${y + 2}" stroke="#FFFFFF" stroke-width="1.2"/><line x1="${f1(x - 2)}" y1="${y + 2}" x2="${f1(x + 2)}" y2="${y - 2}" stroke="#FFFFFF" stroke-width="1.2"/></g>`; }).join('');
    // the snow bank in front: white to the card's edges, its outline only along the top (never a box)
    const bank = `M0,176 Q${sx(40)},170 ${sx(70)},180 Q${sx(100)},190 ${f1(VW)},176`;
    s += `<path d="${bank} L${f1(VW)},200 L0,200 Z" fill="#FFFFFF" data-sk-drawn="snow-bank"/><path d="${bank}" fill="none" stroke="${OUT}" stroke-width="1"/>`;
    return `<g data-sk-drawn="snowy-mountain-town">${s}</g>`;
  }
  let s = `<rect x="0" y="0" width="${f1(VW)}" height="200" fill="#DDEFF5"/>` + A.sun(VW - 30, 30, 16);
  const waves = (y, x0) => { let d = `M${f1(x0)},${y}`; for (let x = x0, q = 0; x < VW; x += 8, q++) d += ` q4,${q % 2 ? 2.5 : -2.5} 8,0`; return `<path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="1.6"/>`; };
  s += `<rect x="0" y="92" width="${f1(VW)}" height="44" fill="#7EC8E3"/><line x1="0" y1="92" x2="${f1(VW)}" y2="92" stroke="${OUT}" stroke-width="1.2"/>${[100, 112, 124].map((y, q) => waves(y, 4 + q * 9)).join('')}`;
  s += mv(34 * k - 34, `<g data-sk-drawn="sailboat"><path d="M24,86 L44,86 L40,92 L28,92 Z" fill="#B07A4E" stroke="${OUT}" stroke-width="1"/><path d="M34,84 L34,62 L46,84 Z" fill="#FFFFFF" stroke="${OUT}" stroke-width="1"/></g>`);
  s += `<rect x="0" y="136" width="${f1(VW)}" height="64" fill="#F1DDA6"/><path d="M0,136 Q${sx(30)},130 ${sx(70)},138 Q${sx(110)},146 ${f1(VW)},134" fill="none" stroke="${OUT}" stroke-width="1.2"/>`;
  s += mv(VW - 140 + (k > 1.2 ? -6 : 0), `<g data-sk-drawn="palm-tree"><path d="M102,186 Q98,150 108,118" fill="none" stroke="#8B5E3C" stroke-width="7"/><path d="M102,186 Q98,150 108,118" fill="none" stroke="${OUT}" stroke-width="1"/>${[[-30, 6], [-14, -14], [12, -16], [30, 4], [20, 16]].map(([dx, dy]) => `<path d="M108,118 Q${108 + dx * 0.5},${118 + dy - 10} ${108 + dx},${118 + dy} Q${108 + dx * 0.5},${118 + dy * 0.3} 108,118 Z" fill="#3F9B4B" stroke="${OUT}" stroke-width="1"/>`).join('')}</g>`);
  s += mv(38 * k - 38, `<g data-sk-drawn="beach-house"><rect x="16" y="146" width="44" height="30" fill="#F7F4EE" stroke="${OUT}" stroke-width="1.3"/><path d="M10,148 L38,128 L66,148 Z" fill="#F2784B" stroke="${OUT}" stroke-width="1.3"/><rect x="32" y="158" width="12" height="18" fill="#7EC8E3" stroke="${OUT}" stroke-width="1"/>${[16, 24, 52, 60].map((x) => `<line x1="${x}" y1="176" x2="${x}" y2="186" stroke="#8B5E3C" stroke-width="2"/>`).join('')}</g>`);
  return `<g data-sk-drawn="hot-beach-town">${s}</g>`;
}
DK.MODES['sk-places'] = function places(d, rng) {
  // four things: 2 + 2, 1 + 3 or 3 + 1 (with two of each in a row of four, the only orders that are not a pattern put the
  // same place first and last: a child who knew one would know the other); six things: 3 + 3
  const nCold = d.items === 4 ? rng.pick([1, 2, 2, 3]) : d.items / 2;
  const cold = rng.sample(B.PLACE_ITEMS.filter((x) => x.place === 'cold'), nCold), hot = rng.sample(B.PLACE_ITEMS.filter((x) => x.place === 'hot'), d.items - nCold);
  let order;
  for (let t = 0; t < 400; t++) { order = rng.shuffle([...cold, ...hot]); if (!patterned(order.map((x) => x.place === 'cold'))) break; }
  const sides2 = rng.next() < 0.5 ? ['cold', 'hot'] : ['hot', 'cold'];   // which place is on the left
  const sw = 326;
  const iw = order.length === 4 ? 140 : 102, px = iw - 16, sh = d.draw ? 300 : iw === 140 ? 540 : 580;
  const placeTile = (k) => {
    const w = sw - 8, h = sh - 8, VW = 200 * w / h;
    const art = VW > 140 ? scene(placeArt(k, VW), w, h, `0 0 ${f1(VW)} 200`, `data-sk-art="place:${k}" data-sk-fit="wide"`) : fitScene(placeArt(k), w, h, `data-sk-art="place:${k}"`, 140, 200);
    return tile(art, sw, sh, `data-sk-key="${k}" data-sk-place="${k}"`, 'white');
  };
  const items = row(order.map((x) => col(dot(`data-sk-dot="${x.id}"`) + tile(pic(x.pic, px), iw, iw, `data-sk-key="${x.id}" data-dk-answer="${x.place}"`, 'white'), 8)).join(''), order.length === 4 ? 26 : 10);
  let html = row(placeTile(sides2[0]) + placeTile(sides2[1]), 18) + items;
  if (d.draw) html += col(labelledDraw(W - 20, 'auto', 'what I wear outside today', 'data-dk-prompt="wear"', 'flex:1 1 auto;min-height:150px'), 0, 'flex:1 1 auto;min-height:0;align-self:stretch;align-items:center');
  return { html: SKCSS + grow(html, 'gap:10px;align-items:center;justify-content:flex-start'), meta: { items: order.map((x) => x.id + ':' + x.place), left: sides2[0] } };
};

/* ================================================================ K-726 our class vote */
function voteBook(b, w, h) { return scene(bookCover(b.pic, 8, 4, 84, 104, b.cover), w, h, '0 0 100 112', `data-sk-art="book:${b.id}"`); }
/** a five-point star outline (view units), to color */
const starPts = (cx, cy, R) => Array.from({ length: 10 }, (_, j) => { const a = -Math.PI / 2 + j * Math.PI / 5, rr = j % 2 ? R * 0.42 : R; return f1(cx + Math.cos(a) * rr) + ',' + f1(cy + Math.sin(a) * rr); }).join(' ');
DK.MODES['sk-vote'] = function vote(d, rng) {
  const books = rng.sample(B.VOTE_BOOKS, d.books);
  const parts = [];
  // my vote: one circle. Two books (level 1): large covers under the heading; three books (levels 2 and 3, review round
  // 2): one row, the heading at its start, so the twenty-box graph keeps its room
  if (d.books === 2) { const bw = 230; parts.push(tile(col(head('My vote: circle one book.') + row(books.map((b) => tile(voteBook(b, bw - 30, (bw - 30) * 1.12), bw, (bw - 30) * 1.12 + 14, `data-sk-ballot="${b.id}"`, 'white')).join(''), 28), 6), W, 'auto', 'data-sk-row="ballot"', '', 'padding:8px 0')); }
  else { const bw = d.newq ? 80 : 96; parts.push(tile(row(head('My vote: circle one book.') + books.map((b) => tile(voteBook(b, bw - 24, (bw - 24) * 1.12), bw, (bw - 24) * 1.12 + 8, `data-sk-ballot="${b.id}"`, 'white')).join(''), 22), W, 'auto', 'data-sk-row="ballot"', '', d.newq ? 'padding:4px 0' : 'padding:6px 0')); }
  // our votes (review round 1 ruling): the WHOLE class votes together, so each book holds 20 boxes numbered 1 to 20
  // (Kindergarten counts to 20, K.CC.B.5; never a 0). Review round 2 ruling: the boxes are SQUARE, about 0.55 inch, in two
  // rows of ten for each book, like a twenty-frame (a bar of thin 0.3-inch boxes was colored two or three at a stroke and
  // the page's count then disagreed with the class count): 1-10 over the top row, 11-20 under the bottom row, a heavier
  // line after each 5 and between the two rows; the book at the start, then (level 3) a box for the count, then a star
  // outline to color by the book that won. Level 3 carries the count boxes and the two new-vote boxes too: its squares
  // are 0.5 inch (48 px), the size that leaves the new-vote boxes room to draw in.
  const N = B.VOTE_BOXES, per = N / 2, sq = d.write ? 48 : 53, numH = d.newq ? 14 : 17, rg = d.books === 2 ? 16 : d.newq ? 10 : 14, cov = 56, gap = 12, fs = d.newq ? 14 : 16;
  const x0 = cov + gap, xEnd = x0 + per * sq, xCount = xEnd + gap, xStar = xCount + (d.write ? 50 + gap : 0);
  const blk = numH + 2 * sq + numH, gw = xStar + 38, gh = d.books * blk + (d.books - 1) * rg;
  const num = (k, x, y) => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="middle" font-family="Baloo 2, cursive" font-weight="700" font-size="${fs}" fill="${T.inkSoft}" data-sk-axis="${k}">${k}</text>`;
  let gs = '';
  books.forEach((b, i) => {
    const y = i * (blk + rg), top = y + numH, mid = top + sq, bot = top + 2 * sq, covH = Math.round(sq * 1.5);
    gs += bookCover(b.pic, 0, top + sq - covH / 2, cov, covH, b.cover);
    let g = `<g data-sk-graphcol="${b.id}">`;
    for (let k = 0; k < N; k++) { const r2 = k < per ? 0 : 1, c = k % per; g += `<rect x="${f1(x0 + c * sq)}" y="${f1(top + r2 * sq)}" width="${sq}" height="${sq}" fill="#FFFFFF" stroke="${T.grid}" stroke-width="1.5" data-sk-cell="${k + 1}" data-sk-cellrow="${r2 + 1}"/>`; }
    g += `<line x1="${f1(x0)}" y1="${f1(mid)}" x2="${f1(xEnd)}" y2="${f1(mid)}" stroke="${T.ink}" stroke-width="1.8"/><line x1="${f1(x0 + 5 * sq)}" y1="${f1(top)}" x2="${f1(x0 + 5 * sq)}" y2="${f1(bot)}" stroke="${T.ink}" stroke-width="2.4" data-sk-five="1"/><rect x="${f1(x0)}" y="${f1(top)}" width="${per * sq}" height="${2 * sq}" fill="none" stroke="${T.ink}" stroke-width="2.4"/>`;
    // the numbers in reading order (1-10, then 11-20), so the PDF's text runs as a child counts
    for (let k = 0; k < per; k++) g += num(k + 1, x0 + k * sq + sq / 2, top - 3);
    for (let k = 0; k < per; k++) g += num(per + k + 1, x0 + k * sq + sq / 2, bot + numH - (d.newq ? 1 : 2));
    gs += g + '</g>';
    if (d.write) gs += `<rect x="${f1(xCount)}" y="${f1(mid - 20)}" width="50" height="40" rx="6" fill="#FFFFFF" stroke="${T.coral}" stroke-width="2" stroke-dasharray="5 4" data-sk-countbox="${b.id}"/>`;
    gs += `<polygon points="${starPts(xStar + 18, mid + 1, 17)}" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2" stroke-dasharray="3.5 2.5" stroke-linejoin="round" data-sk-winstar="${b.id}"/>`;
  });
  parts.push(tile(col(head('Our votes: color one box for each vote.') + scene(gs, gw, gh, `0 0 ${gw} ${gh}`, 'data-sk-art="vote-graph"'), d.newq ? 3 : 6), W, 'auto', 'data-sk-row="graph"', '', `padding:${d.newq ? 4 : 8}px 0;justify-content:center`));
  // the most votes wins; the tie rule names a tie FOR THE MOST votes (review round 1: with three books, two LOSING books
  // can have the same number, and "if two books have the same" called a new vote when there was a clear winner)
  const end = [head('The book with the most votes wins. Color the star by the book that won.'), `<span class="dk-word" data-dk-box data-sk-tie="1">${esc(B.VOTE_TIE_RULE)}</span>`];
  if (d.mine) end.push(row(`<span class="dk-head">Did my book win?</span>` + ['yes', 'no'].map((w2) => `<span class="dk-pill" data-dk-box data-sk-mine="${w2}">${w2}</span>`).join('') + `<span class="dk-head" data-sk-together="1">We all read the book that won.</span>`, 14));
  parts.push(col(end.join(''), d.newq ? 6 : 8));
  // level 3: the two new-vote boxes take the rest of the page
  if (d.newq) parts.push(row(labelledDraw(320, 'auto', 'a new vote: choice 1', 'data-dk-prompt="choice1"', 'align-self:stretch;min-height:96px') + labelledDraw(320, 'auto', 'choice 2', 'data-dk-prompt="choice2"', 'align-self:stretch;min-height:96px'), 14, 'flex:1 1 auto;min-height:0;align-items:stretch'));
  return { html: SKCSS + grow(parts.join(''), `gap:${d.newq ? 10 : 14}px;align-items:center;justify-content:flex-start`), meta: { record: 1, books: books.map((b) => b.id) } };
};

/* ================================================================ the type + the SK page checks */
/**
 * The SK page checks (in page.evaluate): every closed item has ONE right answer; a pair is ONE moment (the same child in
 * both pictures); a page that shows people shows more than one skin tone; the drawn parts the stamps name are drawn.
 */
function skVerifyInPage(PAL, OPT = {}) {
  const f = [];
  // the governed palette: every colour inside a Batch SK drawing is one of PAL (qa/lints.js skips these drawings for it)
  if (PAL) { const ok = new Set(PAL); document.querySelectorAll('svg[data-lcs-prim="sk-art"] [fill], svg[data-lcs-prim="sk-art"] [stroke]').forEach((e) => { for (const a of ['fill', 'stroke']) { const v = (e.getAttribute(a) || '').toUpperCase(); if (v.startsWith('#') && !ok.has(v) && f.length < 40) f.push(`a drawing uses ${v}, a colour outside the SK palette`); } }); }
  const R = document.querySelector('[data-dk]');
  if (!R) return ['no dk root'];
  const mode = R.dataset.dk;
  // one right answer in every closed pair or group
  R.querySelectorAll('[data-dk-item]').forEach((it) => {
    const a = [...it.querySelectorAll('[data-dk-answer]')].map((e) => e.dataset.dkAnswer);
    if (!a.length) return;
    if (['sk-rules', 'sk-fair'].includes(mode) && (a.length !== 2 || a.filter((x) => x === (mode === 'sk-rules' ? 'follow' : 'fair')).length !== 1)) f.push(`${it.dataset.dkItem}: not one right picture of two`);
  });
  // a pair is one moment: both pictures draw the same child (the same skin, the same clothes)
  if (mode === 'sk-rules') R.querySelectorAll('[data-dk-item]').forEach((it) => {
    const kids = [...it.querySelectorAll('[data-sk-age="child"]')].map((g) => g.dataset.skSkin);
    if (kids.length !== 2 || kids[0] !== kids[1]) f.push(`${it.dataset.dkItem}: the two pictures do not draw the same child`);
  });
  // skin tones vary on a page that shows people
  const tones = new Set([...R.querySelectorAll('[data-sk-skin]')].map((g) => g.dataset.skSkin));
  if (R.querySelector('[data-sk-skin]') && tones.size < 2) f.push('every person on the page has the same skin tone');
  // ---- the flag (K-719): 13 stripes of one height, 7 red and 6 white, red at the top and the bottom; the canton over the
  // top 7 stripes and 0.76 of the hoist wide; 50 stars; hoist : fly = 10 : 19; level 1's red dots only in red stripes
  R.querySelectorAll('svg[data-sk-flag]').forEach((sv) => {
    const which = sv.dataset.skFlag;
    const st = [...sv.querySelectorAll('[data-sk-stripe]')].map((e) => ({ c: e.dataset.skStripe, r: e.getBoundingClientRect() })).sort((a, b) => a.r.top - b.r.top);
    if (st.length !== 13) f.push(`the ${which} flag has ${st.length} stripes (13)`);
    else {
      if (st.filter((x) => x.c === 'red').length !== 7 || st[0].c !== 'red' || st[12].c !== 'red' || st.some((x, i) => i && x.c === st[i - 1].c)) f.push(`the ${which} flag's stripes are not red and white in turn, red at the top and the bottom`);
      const hs = st.map((x) => x.r.height); if (Math.max(...hs) - Math.min(...hs) > 0.6) f.push(`the ${which} flag's stripes are not all one height`);
      const H = st[12].r.bottom - st[0].r.top, Wd = st[0].r.width; if (Math.abs(Wd / H - 1.9) > 0.02) f.push(`the ${which} flag is ${(Wd / H).toFixed(2)} wide for 1 high (1.9)`);
      const cn = sv.querySelector('[data-sk-canton]').getBoundingClientRect(); if (Math.abs(cn.bottom - st[6].r.bottom) > 0.8 || Math.abs(cn.width / H - 0.76) > 0.02) f.push(`the ${which} flag's blue box does not cover the top 7 stripes, 0.76 of the hoist wide`);
      const reds = st.filter((x) => x.c === 'red').map((x) => x.r);
      sv.querySelectorAll('[data-sk-reddot]').forEach((dt) => { const q = dt.getBoundingClientRect(), cy = (q.top + q.bottom) / 2; if (!reds.some((r) => cy > r.top && cy < r.bottom)) f.push('a red dot sits in a white stripe'); if ((q.left + q.right) / 2 < cn.right && cy < cn.bottom) f.push('a red dot sits in the blue box'); });
    }
    if (sv.querySelectorAll('[data-sk-star]').length !== 50) f.push(`the ${which} flag has ${sv.querySelectorAll('[data-sk-star]').length} stars (50)`);
  });
  // ---- the globe (K-722): every ocean dot inside the globe and on water (in no land shape); more water than land is
  // measured on the drawn page by sampling the disk
  const gl = R.querySelector('svg[data-sk-globeart]');
  if (gl) {
    const disk = gl.querySelector('[data-sk-globe]'), lands = [...gl.querySelectorAll('[data-sk-land]')];
    const inLand = (x, y) => lands.some((p) => p.isPointInFill(new DOMPoint(x, y)));
    gl.querySelectorAll('[data-sk-oceandot]').forEach((dt) => { const x = +dt.getAttribute('cx'), y = +dt.getAttribute('cy'); if (!disk.isPointInFill(new DOMPoint(x, y)) || inLand(x, y)) f.push(`the ${dt.dataset.skOceandot} dot is not on water`); });
    let land = 0, all = 0; for (let x = 10; x < 1000; x += 20) for (let y = 10; y < 1000; y += 20) { if (!disk.isPointInFill(new DOMPoint(x, y))) continue; all++; if (inLand(x, y)) land++; }
    if (!all || land / all >= 0.5) f.push(`the globe shows ${(100 * land / all).toFixed(0)}% land: not more water than land`);
  }
  // ---- the neighborhood map (K-723): one school, one park, ONE house with a red door and every other house's door plain
  // (on the map and in the key: review round 1); the fire station shows its fire truck; the traced path (level 1) starts
  // AT the red door, ends AT the school door, and runs along the streets between (only its first leg crosses the
  // house's block and its last leg the school's)
  const mp = R.querySelector('svg[data-sk-map]');
  if (mp) {
    const blocks = [...mp.querySelectorAll('[data-sk-block]')].map((b) => ({ id: +b.dataset.skBlock, x: +b.getAttribute('x'), y: +b.getAttribute('y'), w: +b.getAttribute('width'), h: +b.getAttribute('height') }));
    const at = (k) => { const g = mp.querySelector(`[data-sk-place="${k}"]`); return g ? +g.closest('[data-sk-at]').dataset.skAt : -1; };
    if (mp.querySelectorAll('[data-sk-place="school"]').length !== 1 || mp.querySelectorAll('[data-sk-place="park"]').length !== 1) f.push('the map has not one school and one park');
    if (mp.querySelectorAll('[data-sk-door="red"]').length !== 1) f.push('the map has not one house with a red door');
    const doorFill = (g) => { const e = g.querySelector('[data-sk-housedoor]'); return e ? (e.getAttribute('fill') || '').toUpperCase() : ''; };
    mp.querySelectorAll('[data-sk-door]').forEach((h) => { if (h.dataset.skDoor !== 'red' && (h.dataset.skDoor !== 'plain' || doorFill(h) !== OPT.plainDoor)) f.push('a house on the map has a coloured door (one red door; every other door plain)'); });
    R.querySelectorAll('[data-sk-keyrow="house"] [data-sk-door]').forEach((h) => { if (h.dataset.skDoor !== 'plain' || doorFill(h) !== OPT.plainDoor) f.push("the key's house has a coloured door (it must be plain, like the map's houses)"); });
    R.querySelectorAll('[data-sk-place="fire-station"]').forEach((g) => { if (!g.querySelector('[data-sk-drawn="fire-truck"]') || !g.querySelector('[data-sk-bay="open"]')) f.push('a fire station without its fire truck in an open bay'); });
    const pl = mp.querySelector('[data-sk-path]');
    if (pl) {
      const P = pl.getAttribute('points').trim().split(/\s+/).map((q) => q.split(',').map(Number));
      const redAt = +mp.querySelector('[data-sk-door="red"]').closest('[data-sk-at]').dataset.skAt, schoolAt = at('school');
      for (let i = 0; i + 1 < P.length; i++) {
        const own = i === 0 ? redAt : i === P.length - 2 ? schoolAt : null;
        for (let t = 0.05; t < 0.96; t += 0.05) { const x = P[i][0] + (P[i + 1][0] - P[i][0]) * t, y = P[i][1] + (P[i + 1][1] - P[i][1]) * t; const inB = blocks.find((b) => x > b.x + 1 && x < b.x + b.w - 1 && y > b.y + 1 && y < b.y + b.h - 1); if (inB && inB.id !== own) { f.push('the traced path crosses a block (off the streets)'); i = P.length; break; } }
      }
      const toScreen = (p) => { const q = mp.createSVGPoint(); q.x = p[0]; q.y = p[1]; return q.matrixTransform(mp.getScreenCTM()); };
      const atDoor = (p, el) => { if (!el) return false; const r = el.getBoundingClientRect(), s = toScreen(p); return s.x >= r.left - 2 && s.x <= r.right + 2 && s.y >= r.top - 2 && s.y <= r.bottom + 3; };
      if (!atDoor(P[0], mp.querySelector('[data-sk-door="red"] [data-sk-housedoor]')) || !atDoor(P[P.length - 1], mp.querySelector('[data-sk-place="school"] [data-sk-schooldoor]'))) f.push('the traced path does not run from the red door to the school door');
      if (+pl.getAttribute('stroke-width') < 6) f.push('the dotted path is too faint to trace (dots under 6 px)');
    }
  }
  // ---- Dr. King is drawn small (no likeness is attempted): the speaker and the lectern under a quarter of the picture's
  // height (his face is then a few millimetres across at print size: no likeness can be drawn)
  R.querySelectorAll('[data-sk-drawn="speaker-at-lectern"]').forEach((g) => { const sc = g.closest('svg').getBoundingClientRect(), q = g.getBoundingClientRect(); if (q.height > sc.height * 0.25) f.push('the speaker is drawn large (a portrait), not small at the lectern'); });
  // ---- the traditions (K-715): every scene shows its own object and no other scene's object
  const OBJ_MARK = { hat: '[data-dk-pic="accessories/party_hat"]', pie: '[data-sk-drawn="pumpkin-pie"]', diya: '[data-sk-drawn="diya"]', envelope: '[data-sk-drawn="red-envelope"]' };
  const OWN_OBJ = { birthday: 'hat', thanksgiving: 'pie', diwali: 'diya', 'new-year': 'envelope' };
  R.querySelectorAll('svg[data-sk-art^="tradition:"]').forEach((sv) => { const id = sv.dataset.skArt.split(':')[1]; for (const [o, sel] of Object.entries(OBJ_MARK)) { const has = !!sv.querySelector(sel); if (o === OWN_OBJ[id] && !has) f.push(`the ${id} scene does not show its ${o}`); if (o !== OWN_OBJ[id] && has) f.push(`the ${id} scene shows a ${o} (two right lines)`); } });
  // the New Year scene shows a celebration (red lanterns, a bowl of oranges); the pie is the drawn pumpkin pie (never
  // the library's red lattice pie); a diya is a small round clay bowl, about 1.5 wide for 1 high, one spout, one flame
  R.querySelectorAll('svg[data-sk-art="tradition:new-year"]').forEach((sv) => { if (!sv.querySelector('[data-sk-drawn="lantern"]') || !sv.querySelector('[data-sk-drawn="bowl-of-oranges"]')) f.push('the New Year scene shows no celebration (lanterns, oranges)'); });
  if (R.querySelector('[data-dk-pic="thanksgivinng/pie"]')) f.push('the library lattice pie (it reads as cherry; the pie is a pumpkin pie)');
  R.querySelectorAll('[data-sk-drawn="diya"]').forEach((g) => { const b = g.querySelector('[data-sk-bowl]'); if (!b) { f.push('a diya without its bowl'); return; } const q = b.getBoundingClientRect(); if (q.width > 2 && (q.width / q.height < 1.2 || q.width / q.height > 1.75)) f.push(`a diya ${(q.width / q.height).toFixed(2)} times as wide as tall (a small round bowl is about 1.5)`); if (g.querySelectorAll('[data-sk-spout]').length !== 1 || g.querySelectorAll('[data-sk-flame]').length !== 1) f.push('a diya without one spout and one flame'); });
  // ---- the workers (K-718): a worker's drawing never shows what the job makes (the match would be a picture match); the
  // haircut is a haircut happening (cut hair falling to the floor), with no hand mirror (it read as a lollipop)
  const RESULT_MARK = { baker: /bread/, builder: /house/, barber: /barber-cape|barber-chair/, 'mail-carrier': /mailbox|letter-in/ };
  R.querySelectorAll('svg[data-sk-art^="worker:"]').forEach((sv) => { const id = sv.dataset.skArt.split(':')[1]; const marks = [...sv.querySelectorAll('[data-sk-drawn], [data-dk-pic]')].map((e) => e.dataset.skDrawn || e.dataset.dkPic).join(' '); if (RESULT_MARK[id] && RESULT_MARK[id].test(marks)) f.push(`the ${id}'s picture shows what the job makes`); });
  R.querySelectorAll('svg[data-sk-art="result:haircut"]').forEach((sv) => { if (sv.querySelectorAll('[data-sk-clipping]').length < 6) f.push('the haircut shows no cut hair falling'); if (sv.querySelector('[data-sk-drawn="hand-mirror"]')) f.push('the haircut has a hand mirror (it reads as a lollipop)'); });
  // review round 2: the cut hair is short STRAIGHT strands (curls read as hooks, a face on the cape, bugs on the floor) in
  // the child's OWN hair colour, on the cape and in a heap on the floor; the new cut shows a clear part line
  R.querySelectorAll('svg[data-sk-art="result:haircut"]').forEach((sv) => {
    const cl = sv.querySelector('[data-sk-drawn="hair-clippings"]'), kid = sv.querySelector('[data-sk-age="child"]');
    if (!cl || !kid) { f.push('the haircut has no cut hair or no child'); return; }
    const hc = (cl.dataset.skHaircolor || '').toUpperCase();
    if (![...kid.querySelectorAll('[fill]')].some((e) => (e.getAttribute('fill') || '').toUpperCase() === hc)) f.push("the cut hair is not the child's hair colour");
    cl.querySelectorAll('[data-sk-clipping] *').forEach((e) => { if (e.tagName !== 'line') f.push(`the cut hair has a ${e.tagName} (curled strands read as hooks or bugs; the strands are straight)`); else if ((e.getAttribute('stroke') || '').toUpperCase() !== hc) f.push("a cut strand is not the child's hair colour"); });
    const cape = sv.querySelector('[data-sk-drawn="barber-cape"]').getBoundingClientRect(), floor = [...sv.querySelectorAll('rect')].find((e) => e.getAttribute('y') === '86');
    const inBox = (q, b) => q.left >= b.left - 0.5 && q.right <= b.right + 0.5 && q.top >= b.top - 0.5 && q.bottom <= b.bottom + 0.5;
    if ([...cl.querySelectorAll('[data-sk-clipping="cape"]')].filter((g) => inBox(g.getBoundingClientRect(), cape)).length < 2) f.push('the haircut shows no cut hair lying on the cape');
    if (!floor || ![...cl.querySelectorAll('[data-sk-clipping="floor"]')].some((g) => inBox(g.getBoundingClientRect(), floor.getBoundingClientRect()))) f.push('the haircut shows no heap of cut hair on the floor');
    if (!sv.querySelector('[data-sk-part]')) f.push('the new haircut has no part line');
  });
  // ---- match pages: a dot on every card's inner edge; no partner straight across from three pairs on (two pairs: straight
  // across half the time, measured by the gate over many copies)
  if (['sk-traditions', 'sk-then-now', 'sk-workers', 'sk-helpers'].includes(mode)) {
    const L = [...R.querySelectorAll('[data-sk-dot^="L"]')], Rt = [...R.querySelectorAll('[data-sk-dot^="R"]')];
    const lefts = [...R.querySelectorAll('[data-dk-answer][data-sk-key]')], rights = [...R.querySelectorAll('[data-sk-key]:not([data-dk-answer])')];
    if (L.length !== lefts.length || Rt.length !== rights.length) f.push('a card without its dot');
    lefts.forEach((e, i) => { const j = rights.findIndex((r) => r.dataset.skKey === e.dataset.dkAnswer); if (j < 0) f.push(`${e.dataset.skKey}: its partner is not on the page`); else if (j === i && lefts.length > 2) f.push(`${e.dataset.skKey}: its partner sits straight across`); });
    if (new Set(lefts.map((e) => e.dataset.dkAnswer)).size !== lefts.length) f.push('two cards share one partner');
    // every card inside the page's margin (review round 1: level 1's scene cards ran past the header rule)
    const rule = document.querySelector('.ws-body').getBoundingClientRect();
    [...lefts, ...rights].forEach((e) => { const q = e.getBoundingClientRect(); if (q.right > rule.right + 0.5 || q.left < rule.left - 0.5) f.push(`${e.dataset.skKey}: its card runs past the margin`); });
  }
  // ---- the school helpers (K-725): nothing drawn on a problem card is drawn on a helper card (a bookshelf on both let a
  // child match shelf to shelf); the office shows the front office (mailboxes, a sign-in clipboard, the microphone), never
  // a computer desk (it read as a teacher's desk)
  if (mode === 'sk-helpers') {
    const tags = (sel) => new Set([...R.querySelectorAll(sel)].flatMap((sv) => [...sv.querySelectorAll('[data-sk-drawn]')].map((e) => e.dataset.skDrawn)));
    const pt = tags('svg[data-sk-art^="problem:"]'), ht = tags('svg[data-sk-art^="helper:"]');
    for (const t of pt) if (ht.has(t)) f.push(`a ${t} on a problem card AND on a helper card (a picture match, not a helper)`);
    R.querySelectorAll('svg[data-sk-art="helper:office"]').forEach((sv) => { for (const k of ['staff-mailboxes', 'sign-in-clipboard', 'microphone', 'front-counter-window']) if (!sv.querySelector(`[data-sk-drawn="${k}"]`)) f.push(`the office card has no ${k}`); if (sv.querySelector('[data-sk-drawn="computer"]')) f.push('the office card shows a computer desk (it reads as a teacher)'); });
  }
  // ---- the class rules (K-712): no child is drawn from behind (it read as "turned away"); at story time the listening
  // child turns TOWARD the teacher and the playing child AWAY; leaving the blocks, the child walks away from them (the
  // blocks behind); level 3's cards are as wide as level 2's
  if (mode === 'sk-rules') {
    if (R.querySelector('[data-sk-back]')) f.push('a child drawn from behind (it reads as "turned away", not listening)');
    const turnOf = (sel) => { const g = R.querySelector(`svg[data-sk-art="${sel}"] [data-sk-age="child"]`); return g ? g.dataset.skTurn || '0' : null; };
    if (turnOf('story:listen') !== null && turnOf('story:listen') !== '-1') f.push('the listening child does not turn toward the teacher');
    if (turnOf('story:play') !== null && turnOf('story:play') !== '1') f.push('the playing child does not turn away from the teacher');
    R.querySelectorAll('svg[data-sk-art="blocks:leave"]').forEach((sv) => { const k = sv.querySelector('[data-sk-age="child"]'); if (!k || k.dataset.skTurn !== '1') f.push('the child leaving the blocks does not walk away'); else { const kr = k.getBoundingClientRect(); if ([...sv.querySelectorAll('[data-sk-block]')].some((b) => b.getBoundingClientRect().left > kr.left + kr.width * 0.3)) f.push('a block lies in front of the child leaving them (the blocks belong behind)'); } });
    R.querySelectorAll('[data-sk-choice]').forEach((c) => { if (c.getBoundingClientRect().width < 200) f.push(`a rule picture ${Math.round(c.getBoundingClientRect().width)} px wide (level 2's are 222)`); });
  }
  // ---- kind or not (K-713): helping a friend up, the hands are JOINED (both of the helper's hands on the fallen child's)
  R.querySelectorAll('svg[data-sk-art="friend:help-up"]').forEach((sv) => {
    const c = (e) => { const q = e.getBoundingClientRect(); return { x: (q.left + q.right) / 2, y: (q.top + q.bottom) / 2, r: q.width / 2 }; };
    const fh = sv.querySelector('[data-sk-person="fallen"] [data-sk-hand="l"]'), hh = [...sv.querySelectorAll('[data-sk-person="helper"] [data-sk-hand]')];
    if (!fh || hh.length !== 2) { f.push('the helping-up picture has no helper and fallen friend'); return; }
    const a = c(fh); if (hh.some((h) => { const b = c(h); return Math.hypot(a.x - b.x, a.y - b.y) > a.r + b.r + 0.5; })) f.push('helping a friend up: the hands are not joined (it reads as pushing)');
  });
  // review round 2: tearing a friend's drawing shows the tear HAPPENING: one sheet, its two halves pulled apart but still
  // joined at the bottom, rip marks, the tearing child's two hands on its corners, the crying friend's crayons on his
  // side of the table (round 1's calm child holding two separate halves read as "showing two pictures")
  R.querySelectorAll('svg[data-sk-art="friend:tear"]').forEach((sv) => {
    const d0 = sv.querySelector('[data-sk-drawn="tearing-drawing"]'); if (!d0) { f.push('the tear picture has no drawing being torn'); return; }
    const L = d0.querySelector('[data-sk-half="l"]'), Rh = d0.querySelector('[data-sk-half="r"]'), J = d0.querySelector('[data-sk-joined]');
    const meet = (a, b) => { const p = a.getBoundingClientRect(), q = b.getBoundingClientRect(); return Math.min(p.right, q.right) - Math.max(p.left, q.left) > 0.5 && Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top) > 0.5; };
    if (!L || !Rh || !J || !meet(L, J) || !meet(Rh, J)) f.push('the drawing is in two separate pieces (it must be torn while still joined at the bottom)');
    if (d0.querySelectorAll('[data-sk-rip]').length < 2) f.push('the tear picture has no rip marks');
    const db = d0.getBoundingClientRect(), grips = [...sv.querySelectorAll('[data-sk-grip]')];
    if (grips.length !== 2 || grips.some((g) => { const q = g.getBoundingClientRect(), cx = (q.left + q.right) / 2, cy = (q.top + q.bottom) / 2; return cx < db.left - 3 || cx > db.right + 3 || cy < db.top - 3 || cy > db.bottom + 3; })) f.push("the tearing child's hands are not on the drawing");
    const fr = sv.querySelector('[data-sk-person="friend"]'), te = sv.querySelector('[data-sk-person="tearer"]'), cr = sv.querySelector('[data-sk-drawn="friends-crayons"]');
    const mx = (e) => { const q = e.getBoundingClientRect(); return (q.left + q.right) / 2; };
    if (!fr || !te || !cr) f.push("the tear picture lacks the friend, the tearing child or the friend's crayons");
    else if (Math.abs(mx(cr) - mx(fr)) > Math.abs(mx(cr) - mx(te))) f.push("the crayons are on the tearing child's side, not the friend's");
    else if (!fr.querySelector('path[fill="#9FD3E8"]')) f.push('the friend whose drawing is torn is not crying');
  });
  // review round 2: level 3 of the kind page is laid out like level 2: two cards across, each about 3.5 inches wide
  if (mode === 'sk-friends') R.querySelectorAll('[data-sk-key]').forEach((c) => { const w = c.getBoundingClientRect().width; if (w < 300) f.push(`a kind-or-not card ${Math.round(w)} px wide (two across, about 3.5 inches: at least 300)`); });
  // review round 2: the drawing box of level 3 (one more class rule; me helping a friend; a helper I met on our school
  // walk) is about 2.5 inches tall: at least 230 px
  if (['sk-rules', 'sk-friends', 'sk-helpers'].includes(mode) && R.dataset.dkLevel === '3') R.querySelectorAll('[data-dk-draw]').forEach((b) => { const h = b.getBoundingClientRect().height; if (h < 230) f.push(`the drawing box is ${Math.round(h)} px tall (about 2.5 inches: at least 230)`); });
  // review round 2 (K-720 level 3): every word the child may circle carries its own picture (a five-year-old cannot read
  // fair, kind, share): fair the slide taken in turns, kind helping a friend up, share the crayons; three different
  if (mode === 'sk-mlk') {
    const pk = [...R.querySelectorAll('[data-sk-wordpick]')], WP = { fair: 'slide', kind: 'help-up', share: 'crayons' };
    pk.forEach((e) => { const sv = e.querySelector('svg[data-sk-wordpic]'); if (!sv) f.push(`the word "${e.dataset.skWordpick}" has no picture`); else { if (sv.dataset.skWordpic !== WP[e.dataset.skWordpick]) f.push(`the word "${e.dataset.skWordpick}" shows the ${sv.dataset.skWordpic} picture`); if (sv.getBoundingClientRect().height < 80) f.push(`the "${e.dataset.skWordpick}" picture is under 80 px tall`); } });
    const kinds = pk.map((e) => { const sv = e.querySelector('svg[data-sk-wordpic]'); return sv ? sv.dataset.skWordpic : ''; });
    if (pk.length && new Set(kinds).size !== pk.length) f.push('two words share one picture');
  }
  // review round 2 (K-717): the hand holding one library book holds a BOOK (a cover with a picture, a darker spine, page
  // edges), never a flat slab with lines (it read as a phone)
  R.querySelectorAll('[data-sk-drawn="hand-with-one-book"]').forEach((g) => {
    for (const k of ['data-sk-book-cover', 'data-sk-book-spine', 'data-sk-book-pages', 'data-sk-book-pic']) if (!g.querySelector(`[${k}]`)) f.push(`the book in the hand has no ${k.slice(13)} (it reads as a phone)`);
    const c = g.querySelector('[data-sk-book-cover]'), pg = g.querySelector('[data-sk-book-pages]');
    if (c && pg) { const a = c.getBoundingClientRect(), b = pg.getBoundingClientRect(); if (b.right < a.right + 1 || b.bottom < a.bottom + 1) f.push('the book in the hand shows no page edges'); }
  });
  // ---- families (K-714): the teenager about the dad's shoulder height, the dad's hand on the teen's shoulder
  R.querySelectorAll('svg[data-sk-art="family:dad-teen"]').forEach((sv) => {
    const t = sv.querySelector('[data-sk-age="teen"]'), d = sv.querySelector('[data-sk-age="adult"]');
    if (!t || !d) { f.push('the dad-and-teen card has no dad or no teen'); return; }
    const tr = t.getBoundingClientRect(), dr = d.getBoundingClientRect();
    if (tr.height > dr.height * 0.82) f.push(`the teenager is ${Math.round(100 * tr.height / dr.height)}% of the dad's height (two grown men)`);
    const h = d.querySelector('[data-sk-hand="r"]').getBoundingClientRect(), hx = (h.left + h.right) / 2, hy = (h.top + h.bottom) / 2;
    if (hx < tr.left || hx > tr.right || hy > tr.top + tr.height * 0.45) f.push("the dad's hand is not on the teen's shoulder");
  });
  // ---- choosing one thing (K-717): the lead is not a third choice: no frame, smaller than both choices, an arrow to them
  if (mode === 'sk-choose') R.querySelectorAll('[data-dk-item]').forEach((it) => {
    const ld = it.querySelector('[data-sk-lead]'), ch = [...it.querySelectorAll('[data-sk-choice]')];
    if (!ld || ch.length !== 2) { f.push(`${it.dataset.dkItem}: not a lead and two choices`); return; }
    const cs = getComputedStyle(ld), lr = ld.getBoundingClientRect();
    if (ld.classList.contains('dk-tile') || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0) f.push(`${it.dataset.dkItem}: the lead card is framed (it reads as a third choice)`);
    if (ch.some((c) => { const q = c.getBoundingClientRect(); return lr.width >= q.width * 0.6 || lr.height >= q.height; })) f.push(`${it.dataset.dkItem}: the lead card is not smaller than the choices`);
    if (!it.querySelector('[data-sk-arrow]')) f.push(`${it.dataset.dkItem}: no arrow from the lead to the pair`);
  });
  // ---- fair or not (K-721): keeping the swing, the swinging child turns AWAY from the waiting children
  R.querySelectorAll('svg[data-sk-art="swing:keep"]').forEach((sv) => { if (!sv.querySelector('[data-sk-age="child"][data-sk-turn="-1"]')) f.push('keeping the swing: the swinging child does not turn away from the waiting children'); });
  // ---- land and water (K-722): every green dot on land; on level 1 every land shape has one
  if (gl) {
    const lands = [...gl.querySelectorAll('[data-sk-land]')];
    gl.querySelectorAll('[data-sk-landdot]').forEach((dt) => { const x = +dt.getAttribute('cx'), y = +dt.getAttribute('cy'); const L = lands.filter((p) => p.isPointInFill(new DOMPoint(x, y))); if (!L.length) f.push(`a green dot (${dt.dataset.skLanddot}) is not on land`); else if (!L.some((p) => p.dataset.skLand === dt.dataset.skLanddot)) f.push(`a green dot is not on its own land (${dt.dataset.skLanddot})`); });
    // review round 2: every green dot reads as a dot (r at least OPT.minDotR; a smaller one read as a printing speck); a
    // big land shape with no room for one (OPT.noDot, measured by the gate from the land data) is left without
    if (gl.querySelector('[data-sk-oceandot]')) lands.forEach((p) => { if (!(OPT.noDot || []).includes(p.dataset.skLand) && ![...gl.querySelectorAll('[data-sk-landdot]')].some((dt) => p.isPointInFill(new DOMPoint(+dt.getAttribute('cx'), +dt.getAttribute('cy'))))) f.push(`level 1: the ${p.dataset.skLand} land has no green dot`); });
    gl.querySelectorAll('[data-sk-landdot]').forEach((dt) => { if (+dt.getAttribute('r') < OPT.minDotR) f.push(`a green dot of r ${dt.getAttribute('r')} (under ${OPT.minDotR}: it reads as a speck, not a dot)`); });
  }
  // ---- hot and cold places (K-724): a place picture is drawn at its card's shape, never stretched sideways (seams)
  R.querySelectorAll('svg[data-sk-art^="place:"]').forEach((sv) => { if (sv.viewBox.baseVal.x < -0.5) f.push(`the ${sv.dataset.skArt} picture is stretched sideways (seams, cut-off mountains)`); });
  // ---- the vote (K-726): every book's bar has 20 boxes numbered 1 to 20 (the whole class votes together; never a 0), a
  // star to mark the winner, and the tie rule names a tie for the MOST votes
  if (mode === 'sk-vote') {
    R.querySelectorAll('[data-sk-graphcol]').forEach((c) => { const n = [...c.querySelectorAll('[data-sk-cell]')].map((e) => +e.dataset.skCell); if (n.length !== OPT.voteBoxes || n.some((k, i) => k !== i + 1)) f.push(`a vote bar with ${n.length} boxes (${OPT.voteBoxes}, numbered 1 to ${OPT.voteBoxes})`); if (!R.querySelector(`[data-sk-winstar="${c.dataset.skGraphcol}"]`)) f.push('a vote bar without its star for the winner'); });
    // review round 2 ruling: each book's boxes are SQUARE (0.55 inch on levels 1-2; 0.5 inch on level 3, which also holds
    // the count boxes and the new vote) in TWO ROWS of ten (1-10, then 11-20, left to right), the numbers 1-10 over the top
    // row and 11-20 under the bottom row, each over or under its own box, and a heavier line after each 5
    const minSq = R.dataset.dkLevel === '3' ? 47.5 : 52.5, half = OPT.voteBoxes / 2;
    R.querySelectorAll('[data-sk-graphcol]').forEach((c) => {
      const cells = [...c.querySelectorAll('[data-sk-cell]')].map((e) => ({ n: +e.dataset.skCell, r: e.getBoundingClientRect() }));
      if (cells.length !== OPT.voteBoxes) return;
      if (cells.some((x) => Math.abs(x.r.width - x.r.height) > 0.6 || x.r.width < minSq)) f.push(`a vote box is not a square of at least ${minSq} px (${Math.round(cells[0].r.width)} x ${Math.round(cells[0].r.height)})`);
      const rowTop = cells.slice(0, half), rowBot = cells.slice(half), same = (a) => a.every((x) => Math.abs(x.r.top - a[0].r.top) < 0.6), lr = (a) => a.every((x, i) => !i || x.r.left > a[i - 1].r.left + 1);
      if (!same(rowTop) || !same(rowBot) || !lr(rowTop) || !lr(rowBot) || rowBot[0].r.top < rowTop[0].r.bottom - 0.6 || Math.abs(rowBot[0].r.left - rowTop[0].r.left) > 0.6) f.push(`a vote bar is not two rows of ${half} boxes (1-${half} over ${half + 1}-${OPT.voteBoxes})`);
      const ax = [...c.querySelectorAll('[data-sk-axis]')].map((e) => ({ n: +e.textContent, r: e.getBoundingClientRect() })).sort((a, b) => a.n - b.n);
      if (ax.map((x) => x.n).join() !== cells.map((x) => x.n).join()) f.push(`a book's numbers are not 1 to ${OPT.voteBoxes}`);
      else ax.forEach((x, i) => { const b = cells[i].r, cx = (x.r.left + x.r.right) / 2, cy = (x.r.top + x.r.bottom) / 2; if (cx < b.left || cx > b.right || (i < half ? cy > b.top || cy < b.top - 20 : cy < b.bottom || cy > b.bottom + 20)) f.push(`the number ${x.n} is not ${i < half ? 'over' : 'under'} its own box`); });
      const five = c.querySelector('[data-sk-five]'); if (!five || Math.abs(five.getBoundingClientRect().left + five.getBoundingClientRect().width / 2 - cells[4].r.right) > 1.5) f.push('a vote bar without its heavier line after 5');
    });
    const tie = R.querySelector('[data-sk-tie]');
    if (!tie || tie.textContent.trim() !== OPT.tieRule) f.push('the tie rule is not "' + OPT.tieRule + '"');
  }
  return f;
}

/** the bank's values the page checks need (passed into page.evaluate) */
const SK_OPT = { plainDoor: B.HOODS.doorColor.plain.toUpperCase(), tieRule: B.VOTE_TIE_RULE, voteBoxes: B.VOTE_BOXES, minDotR: B.LAND_DOT_MIN_R, noDot: Object.keys(B.LAND_NODOT) };
/** makeSkType: the Batch K type wrapper + the SK page checks */
function makeSkType(o) {
  const t = DK.makeDkKinderType(o);
  t.verify = async (page) => [].concat(await page.evaluate(DK.dkVerifyInPage), await page.evaluate(skVerifyInPage, [...A.PAL], SK_OPT));
  return t;
}

module.exports = { makeSkType, skVerifyInPage, sides, cast, ruleArt, friendArt, haircutArt, TONES, SK_OPT };
