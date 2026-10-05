/**
 * data/cbn/designs.js — the Color by Number pictures (operator 2026-10-04: 100 complete scenes + 100 single
 * multi-part pictures, top quality; 2026-10-05: in the style of the operator's reference sheets).
 *
 * Every design is the image library's own line art (data/cbn/lineart-designs.js): tools/cbn-lineart-build.js composes
 * it and finds its parts (data/cbn/lineart/<id>.json); data/cbn/lineart-colours.js gives each part its crayon. The kit
 * drawings (designs-b1..b9.js, primitives/cbn-art/parts*.js) are retired — they could not reach the reference style.
 * The frame is 600 × 560 picture units. The level follows the colours used (lib/cbn-render.js LEVEL_CAPS).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { Art } = require('../../primitives/cbn-art/core.js');
const { LINEART } = require('./lineart-designs.js');
const { BG, HERO, OVERRIDE, SMALL_RULE, PIECE } = require('./lineart-colours.js');

const W = 600, H = 560;
const DIR = path.join(__dirname, 'lineart');
const letter = (i) => (i >= 26 ? String.fromCharCode(97 + Math.floor(i / 26) - 1) : '') + String.fromCharCode(97 + (i % 26));

const _cache = new Map();
function load(id) {
  if (!_cache.has(id)) {
    const f = path.join(DIR, id + '.json');
    if (!fs.existsSync(f)) throw new Error(`cbn: ${id} is not built (node tools/cbn-lineart-build.js --only=${id})`);
    _cache.set(id, JSON.parse(fs.readFileSync(f, 'utf8')));
  }
  return _cache.get(id);
}

/** the crayon of every part (lineart-colours.js): fixed areas carry their own, the hero follows HERO, a background drawing
 *  follows BG by its own part order, a part no drawing owns is sky above the horizon and ground below it */
function partColours(d) {
  const j = load(d.id);
  const spec = LINEART.find((x) => x.id === d.id);
  const hero = HERO[d.id] || [], ov = OVERRIDE[d.id] || {};
  const fx = Object.fromEntries((spec.fixed || []).map((f) => [f.name, f.colour]));
  const rank = new Map();
  return j.parts.map((p, i) => {
    if (p.fixed) return ov[i] !== undefined ? ov[i] : p.colour;
    const k = rank.get(p.item) || 0; rank.set(p.item, k + 1);   // an override still takes its rank: the parts after it keep theirs
    if (ov[i] !== undefined) return ov[i];
    if (p.hero) return hero[k] === undefined ? null : hero[k];
    if (p.src && BG[p.src]) { const plan = BG[p.src]; return plan[Math.min(k, plan.length - 1)]; }
    if (p.item == null) return p.y < (spec.hy || 0) ? fx.sky || null : fx.ground || null;
    return null;
  });
}

/** level from the colours used and the parts to colour (lib/cbn-render.js LEVEL_CAPS):
 *  L1 = up to 4 colours, or 5 colours on fewer than 10 parts · L3 = 7-8 colours, or 6 colours on 14+ parts · L2 = the rest */
function levelOf(d) {
  if (d.levelFixed) return d.levelFixed;
  const pc = pieceColours(d);
  const cs = partColours(d).concat(pc.mid).filter((c) => c && c !== 'none');
  const k = new Set(cs).size, n = cs.length;
  if (k <= 4 || (k === 5 && n < 10)) return 1;
  if (k >= 7 || (k === 6 && n >= 14)) return 3;
  return 2;
}

/**
 * the pieces the numbered parts leave (operator 2026-10-05: "parts of images which are not painted"). A mid piece (room
 * for a compact number) becomes its own numbered part; a small piece is painted with the numbered part it is attached
 * to. Colour: the scenery drawing's SMALL_RULE, else the colour of the part it borders most (nb); an eye white or shine
 * (it borders ink much thicker than an outline — a pupil) and a piece whose neighbour is white stay white.
 * Returns { mid: [colour|null], small: [{ to: partIndex, colour }|null] }.
 */
const EYE_THICK = 10;   // canvas px from the middle of the ink: an outline is ~7, a pupil 10+
function pieceColours(d) {
  const j = load(d.id);
  const spec = LINEART.find((x) => x.id === d.id);
  const cs = partColours(d);
  const mids = j.mid || [], smalls = j.small || [];
  const fixedKey = (c) => { const k = j.parts.findIndex((p, i) => p.fixed && (p.fixed === c || cs[i] === c)); return k >= 0 ? 'p' + k : null; };
  // resolved: key -> { colour, anchor } (anchor: the numbered region it is painted with — a part, or a mid piece itself);
  // colour 'none' = a white piece (a white part, or bordering only white): stays white
  const res = new Map();
  j.parts.forEach((p, i) => { if (cs[i] != null) res.set('p' + i, { colour: cs[i], anchor: 'p' + i }); });
  const pieces = [...mids.map((p, i) => ['m' + i, p]), ...smalls.map((p, i) => ['s' + i, p])];
  const allOf = (p) => [...j.parts.filter((q) => !q.fixed), ...mids, ...smalls].filter((q) => q.src === p.src && q.item === p.item);
  const bottomSmall = [];
  // a Christmas tree's ornaments: the topmost piece is the star (yellow, numbered when it can hold one), the round pieces
  // are baubles (red, painted with the biggest bauble under one number); the branch slivers follow their neighbours
  for (const item of new Set(smalls.filter((p) => p.src === 'Christmas bw/christmas_tree').map((p) => p.item))) {
    const own = smalls.map((p, i) => ['s' + i, p]).filter(([, p]) => p.src === 'Christmas bw/christmas_tree' && p.item === item);
    if (!own.length) continue;
    const star = own.reduce((a, b) => (b[1].y < a[1].y ? b : a));
    if (star[1].r >= 5.5) res.set(star[0], { colour: 'yellow', anchor: star[0] });
    const round = own.filter(([k, p]) => k !== star[0] && p.r >= 2.5 && p.area <= 1.6 * Math.PI * p.r * p.r);
    const big = round.filter(([, p]) => p.r >= 5.5).sort((a, b) => b[1].area - a[1].area)[0];
    if (big) for (const [k] of round) res.set(k, { colour: 'red', anchor: big[0] });
    // every other piece of the tree is branch: green, painted with the tree's own green part
    const treePart = j.parts.findIndex((q, i) => !q.fixed && q.item === item && cs[i] === 'green');
    if (treePart >= 0) for (const [k] of own) if (!res.has(k)) res.set(k, { colour: 'green', anchor: 'p' + treePart });
  }
  // the per-worksheet choices made while reading it one by one (lineart-colours.js PIECE) come first
  for (const [k, v] of Object.entries(PIECE[d.id] || {})) {
    if (v === 'none') res.set(k, { colour: 'none', anchor: null });
    else if (k[0] === 'm') res.set(k, { colour: v, anchor: k });
    else if (v[1] === k) res.set(k, { colour: v[0], anchor: k });   // [colour, itself]: a small piece numbered on its own (the number gate decides if it fits)
    else res.set(k, { colour: v[0], anchor: v[1] });
  }
  for (const [k, p] of pieces) {
    if (res.has(k)) continue;
    if (p.hero && p.thick >= EYE_THICK) { res.set(k, { colour: 'none', anchor: null, eye: true }); continue; }   // an eye white / shine
    let rule = p.src && SMALL_RULE[p.src];
    if (!rule) continue;
    if (typeof rule === 'object' && rule.split != null) {   // { split, bottom, fallback }: a flower's stem and leaves
      const ys = allOf(p).map((q) => q.y), y0 = Math.min(...ys), y1 = Math.max(...ys);
      if (p.y < y0 + rule.split * (y1 - y0)) continue;         // the head: follows its neighbours (the chain)
      if (k[0] === 'm') { res.set(k, { colour: rule.bottom, anchor: k }); continue; }
      bottomSmall.push([k, p, rule]); continue;               // a tiny leaf piece: after the mids, see below
    }
    if (typeof rule === 'object') {   // { colour, bottom }: for the drawing's NUMBERED (mid) pieces — ornaments; the lowest is
      if (k[0] !== 'm') continue;     // the trunk. A small piece has no numbered region of that colour: it follows its neighbour
      const lowest = pieces.filter(([kk, q]) => kk[0] === 'm' && q.src === p.src && q.item === p.item).reduce((m, [, q]) => Math.max(m, q.y), -1);
      rule = p.y === lowest ? rule.bottom : rule.colour;
    }
    const c = rule === 'sky' || rule === 'ground' ? cs[+fixedKey(rule).slice(1)] : rule;
    if (k[0] === 'm') { res.set(k, { colour: c, anchor: k }); continue; }
    const nb = (p.nbs || []).find((n) => res.get(n) && res.get(n).colour === c);
    const anchor = nb ? res.get(nb).anchor : fixedKey(rule === 'sky' || rule === 'ground' ? rule : c);
    if (anchor) res.set(k, { colour: c, anchor });   // no numbered region of that colour to paint it with: it follows its neighbour
  }
  // a tiny stem / leaf piece: painted with a light-green numbered piece beside it, else with the grass
  for (const [k, p, rule] of bottomSmall) {
    const nb = (p.nbs || []).find((n) => res.get(n) && res.get(n).colour === rule.bottom && !res.get(n).eye);
    if (nb) { res.set(k, { colour: rule.bottom, anchor: res.get(nb).anchor }); continue; }
    const f = fixedKey(rule.fallback);
    if (f) res.set(k, { colour: res.get(f).colour, anchor: f });
  }
  // a BACKGROUND pocket (no drawing owns it: the gap between an arm and a body) is sky / ground / sea / pond — the fixed
  // area it borders most, else by height — never the colour of the drawing around it
  for (const [k, p] of pieces) {
    if (res.has(k) || p.item != null) continue;
    let f = (p.nbs || []).find((n) => n[0] === 'p' && j.parts[+n.slice(1)].fixed);
    if (!f) f = fixedKey(p.y < (spec.hy || 0) ? 'sky' : 'ground');
    if (f && res.get(f)) res.set(k, { colour: res.get(f).colour, anchor: k[0] === 'm' ? k : f });
  }
  // the chain: an unresolved piece takes its best resolved neighbour's colour (a plank of a barn from the plank beside it)
  for (let round = 0; round < 16; round++) {
    let changed = false;
    for (const [k, p] of pieces) {
      if (res.has(k)) continue;
      const nb = (p.nbs || []).find((n) => res.has(n) && !res.get(n).eye);   // an eye white does not pass its white on
      if (!nb) continue;
      const r = res.get(nb);
      res.set(k, r.colour === 'none' ? { colour: 'none', anchor: null } : { colour: r.colour, anchor: k[0] === 'm' ? k : r.anchor });
      changed = true;
    }
    if (!changed) break;
  }
  // a drawing's piece in a group no numbered part reaches (door slats inside a frame): the drawing's main colour — its
  // largest coloured part, which it is painted with
  for (const [k, p] of pieces) {
    if (res.has(k) || p.item == null) continue;
    const m = j.parts.findIndex((q, i) => !q.fixed && q.item === p.item && cs[i] && cs[i] !== 'none');
    if (m >= 0) res.set(k, { colour: cs[m], anchor: k[0] === 'm' ? k : 'p' + m });
  }
  // a background pocket nothing reached: the sky above the horizon, the ground below
  for (const [k, p] of pieces) if (!res.has(k) && p.item == null) { const f = fixedKey(p.y < (spec.hy || 0) ? 'sky' : 'ground'); if (f) res.set(k, { colour: res.get(f).colour, anchor: k[0] === 'm' ? k : f }); }
  const ok = (r) => r && r.colour && r.colour !== 'none' && r.anchor;
  return {
    // white: the piece stays white as a NATURAL white (an eye, or bordering a part a colour list makes white — sheep wool)
    white: { mid: mids.map((p, i) => !!res.get('m' + i) && res.get('m' + i).colour === 'none'), small: smalls.map((p, i) => !!res.get('s' + i) && res.get('s' + i).colour === 'none') },
    mid: mids.map((p, i) => { const r = res.get('m' + i); return ok(r) ? r.colour : null; }),
    small: smalls.map((p, i) => { const r = res.get('s' + i); return ok(r) ? { colour: r.colour, to: r.anchor } : null; }),
  };
}

function build(design, opts = {}) {
  const j = load(design.id);
  const a = new Art(W, H);
  const cs = partColours(design);
  const pc = pieceColours(design);
  const extra = new Map();   // anchor key (p<i> / m<i>) -> the small pieces painted with it
  // opts.noSmall: the small pieces left unpainted (tools/cbn-unpainted.js --poison proves the detector sees them)
  if (!opts.noSmall) (j.small || []).forEach((s, i) => { const r = pc.small[i]; if (!r) return; if (!extra.has(r.to)) extra.set(r.to, []); extra.get(r.to).push(s.d); });
  j.parts.forEach((p, i) => {
    const c = cs[i];
    if (c == null) return;
    const d = p.d + (c !== 'none' ? (extra.get('p' + i) || []).join('') : '');
    a.items.push({ kind: 'r', d, colour: c, tf: '', ow: 0, name: p.fixed || ('part ' + i), group: null });
  });
  (j.mid || []).forEach((p, i) => {
    const c = pc.mid[i];
    if (c == null || c === 'none') return;
    a.items.push({ kind: 'r', d: p.d + (extra.get('m' + i) || []).join(''), colour: c, tf: '', ow: 0, name: 'piece ' + i, group: null });
  });
  // a small piece numbered on its own (PIECE s<i>: [colour, 's<i>'])
  (j.small || []).forEach((p, i) => {
    const r = pc.small[i];
    if (!r || r.to !== 's' + i) return;
    a.items.push({ kind: 'r', d: p.d + (extra.get('s' + i) || []).filter((x) => x !== p.d).join(''), colour: r.colour, tf: '', ow: 0, name: 'small ' + i, group: null });
  });
  a.items.push({ kind: 'k', d: j.ink, tf: '' });
  return a;
}

// the localized names (title part) — data/cbn/names-i18n.js is the single source
const { NAMES } = require('./names-i18n.js');
const DESIGNS = LINEART.map((d) => {
  const out = { id: d.id, kind: d.kind, names: { ...d.names, ...(NAMES[d.id] || {}) } };
  Object.defineProperty(out, 'level', { enumerable: true, get: () => levelOf(d) });
  return out;
});

module.exports = { DESIGNS, build, W, H, levelOf, partColours, pieceColours };
