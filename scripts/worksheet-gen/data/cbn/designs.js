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
const { COLOURS_BY_DESIGN, ATTACH } = require('./lineart-colours.js');

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

/** the crayon of every numbered part (fixed parts carry their own) */
function partColours(d) {
  const j = load(d.id);
  const cols = COLOURS_BY_DESIGN[d.id] || [];
  return j.parts.map((p, i) => (p.fixed ? p.colour : (cols[i] === undefined ? null : cols[i])));
}

/** level from the colours used: 3-4 → 1 · 5 → 1 (≤ 10 parts) or 2 · 6 → 2 · 7 → 2 (≤ 20 parts) or 3 · 8 → 3 */
function levelOf(d) {
  if (d.levelFixed) return d.levelFixed;
  const cs = partColours(d);
  const k = new Set(cs.filter((c) => c && c !== 'none')).size;
  const nParts = cs.filter((c) => c && c !== 'none').length;
  if (k <= 4) return 1;
  if (k === 5) return nParts <= 10 ? 1 : 2;
  if (k === 6) return 2;
  if (k === 7) return nParts <= 20 ? 2 : 3;
  return 3;
}

function build(design) {
  const j = load(design.id);
  const a = new Art(W, H);
  const cs = partColours(design);
  const att = (ATTACH || {})[design.id] || {};
  const extra = new Map();
  (j.small || []).forEach((s, i) => { const to = att[letter(i)]; if (to == null) return; if (!extra.has(to)) extra.set(to, []); extra.get(to).push(s.d); });
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

module.exports = { DESIGNS, build, W, H, levelOf };
