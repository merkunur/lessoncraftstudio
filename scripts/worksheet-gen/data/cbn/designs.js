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
const { BG, HERO, OVERRIDE, ATTACH } = require('./lineart-colours.js');

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
    if (ov[i] !== undefined) return ov[i];
    if (p.fixed) return p.colour;
    const k = rank.get(p.item) || 0; rank.set(p.item, k + 1);
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
  const cs = partColours(d).filter((c) => c && c !== 'none');
  const k = new Set(cs).size, n = cs.length;
  if (k <= 4 || (k === 5 && n < 10)) return 1;
  if (k >= 7 || (k === 6 && n >= 14)) return 3;
  return 2;
}

function build(design) {
  const j = load(design.id);
  const a = new Art(W, H);
  const cs = partColours(design);
  const att = (ATTACH || {})[design.id] || {};
  const extra = new Map();
  // ATTACH target: a part index, or 'H<k>' = the scene character's k-th part
  const heroIdx = j.parts.map((p, i) => (p.hero ? i : -1)).filter((i) => i >= 0);
  (j.small || []).forEach((s, i) => { let to = att[letter(i)]; if (to == null) return; if (typeof to === 'string') to = heroIdx[+to.slice(1)]; if (!extra.has(to)) extra.set(to, []); extra.get(to).push(s.d); });
  j.parts.forEach((p, i) => {
    const c = cs[i];
    if (c == null) return;
    const d = p.d + (extra.get(i) || []).join('');
    a.items.push({ kind: 'r', d, colour: c, tf: '', ow: 0, name: p.fixed || ('part ' + i), group: null });
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

module.exports = { DESIGNS, build, W, H, levelOf, partColours };
