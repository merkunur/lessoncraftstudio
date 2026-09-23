#!/usr/bin/env node
/**
 * verify-animal-home.js — the gate of primitives/animal-home.js (G1-398 `habitats`; design
 * docs/worksheet-gen/b6-designs/G1-398-habitats.md §2 "Gate qa/verify-animal-home.js").
 *
 *   node scripts/worksheet-gen/qa/verify-animal-home.js [--no-sheet]
 *
 * EMITTED (the markup, at px 72 and 88): token hexes only, no coral, no <text> / <image>, the
 *   root stamps, NO animal (no data-lcs-animal anywhere); the hive is a TRUNK (a data-lcs-trunk
 *   rect — never a hanging teardrop comb); burrow vs anthill differ in silhouette HEIGHT (the
 *   emitted mound path's topmost y: anthill <= 20 units, burrow >= 24) and in chamber COUNT (the
 *   emitted data-lcs-chamber ellipses: burrow 1, anthill 4); px < 72 and an unknown id THROW.
 * RENDERED (rasterised at 72 and 88 through window.__raster): the pairwise IoU of the dark masks
 *   (luma < 130) <= 0.60 — no two homes share a silhouette; the table is printed.
 * POISON (each must FAIL, the real homes are the control): an anthill with one tunnel and one
 *   room · a hive drawn as a hanging teardrop comb (no trunk rect) · a nest with a bird inside
 *   (a data-lcs-animal element).
 * SHEET — out/dev/G1-398-homes-{colour,grey}.png (every home at 72, 88 and 176).
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const AH = require('../primitives/animal-home.js');
const H = require('./b6-habitats-harness.js');

const T = tokens.color;
const PALETTE = new Set(Object.values(T).map((c) => c.toUpperCase()));
let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }

/** the y-coordinates of a path d (absolute M/L/Q/C/A commands as animal-home emits them) */
function pathYs(d) {
  const toks = d.match(/[MLQCAZ]|-?\d*\.?\d+/g) || [];
  const ys = []; let cmd = null, i = 0;
  const arity = { M: 2, L: 2, Q: 4, C: 6, A: 7 };
  while (i < toks.length) {
    if (/[MLQCAZ]/.test(toks[i])) { cmd = toks[i++]; if (cmd === 'Z') continue; }
    const n = arity[cmd]; const args = toks.slice(i, i + n).map(Number); i += n;
    if (cmd === 'A') ys.push(args[6]);
    else for (let k = 1; k < n; k += 2) ys.push(args[k]);
  }
  return ys;
}

/** The structural checks of ONE emitted home (used on the real homes AND the poisons). */
function structural(id, svg) {
  const f = [];
  for (const h of svg.match(/#[0-9a-fA-F]{6}\b/g) || []) if (!PALETTE.has(h.toUpperCase())) f.push(`${id}: off-palette ${h}`);
  if (svg.toUpperCase().includes(T.coral.toUpperCase())) f.push(`${id}: coral in a home`);
  if (/<text|<image|<img/.test(svg)) f.push(`${id}: <text>/<image> in a home`);
  if (/data-lcs-animal/.test(svg)) f.push(`${id}: an animal is drawn in the home (a home is empty)`);
  if (!svg.includes('data-lcs-prim="animal-home"') || !svg.includes(`data-lcs-home="${id}"`)) f.push(`${id}: root stamps`);
  const chambers = (svg.match(/data-lcs-chamber/g) || []).length;
  const mound = /<path d="([^"]+)"[^>]*data-lcs-mound/.exec(svg);
  const top = mound ? Math.min(...pathYs(mound[1])) : null;
  if (id === 'hive' && !/<rect[^>]*data-lcs-trunk/.test(svg)) f.push('hive: no trunk rect (a hanging comb is a wasp / hornet picture)');
  if (id === 'anthill') {
    if (top === null || top > 20) f.push(`anthill: mound top ${top} > 20 units (not a tall steep mound)`);
    if (chambers !== 4) f.push(`anthill: ${chambers} chamber(s) ≠ 4 (a tall dome full of small tunnels)`);
  }
  if (id === 'burrow') {
    if (top === null || top < 24) f.push(`burrow: mound top ${top} < 24 units (not a low entrance mound)`);
    if (chambers !== 1) f.push(`burrow: ${chambers} chamber(s) ≠ 1`);
  }
  return { f, top, chambers };
}

async function masks(page, svgs) {
  await H.openDoc(page, 'home-measure', svgs.map((s, i) => `<div id="h${i}">${s}</div>`).join(''));
  return page.evaluate(async (n) => {
    const out = [];
    for (let k = 0; k < n; k++) { const r = await window.__raster(document.querySelector(`#h${k} svg`), 2); out.push(Array.from(r.luma, (v) => (v < 130 ? 1 : 0))); }
    return out;
  }, svgs.length);
}
const iou = (a, b) => { let i = 0, u = 0; for (let k = 0; k < a.length; k++) { if (a[k] && b[k]) i++; if (a[k] || b[k]) u++; } return u ? i / u : 0; };

async function main() {
  const ids = AH.HOME_IDS;
  const table = {};
  for (const px of [72, 88]) for (const id of ids) {
    const s = AH.animalHome({ id, px }).svg;
    const r = structural(id, s);
    r.f.forEach((x) => ok(false, `${x} @${px}`)); assertions++;
    table[id] = r;
    ok(Math.abs(+/width="([\d.]+)"/.exec(s)[1] - px) < 0.01, `${id}: width ≠ ${px}`);
  }
  console.log(`mound tops: burrow ${table.burrow.top} · anthill ${table.anthill.top}; chambers: burrow ${table.burrow.chambers} · anthill ${table.anthill.chambers}`);
  for (const [what, fn] of [['px 71', () => AH.animalHome({ id: 'nest', px: 71 })], ['unknown id', () => AH.animalHome({ id: 'cave' })], ['tree hole', () => AH.animalHome({ id: 'tree-hole' })]]) {
    let threw = false; try { fn(); } catch (e) { threw = true; } ok(threw, `${what} must THROW`);
  }
  // poisons (markup edits of the real homes)
  const anthill = AH.animalHome({ id: 'anthill', px: 88 }).svg;
  let seen = 0;
  const pAnthill = anthill.replace(/<ellipse[^>]*data-lcs-chamber=""\/>/g, (m) => (seen++ ? '' : m)).replace(/M60 40 L78 58 L90 80 M60 40 L58 70 L50 100 M58 70 L74 98/g, '');
  const hive = AH.animalHome({ id: 'hive', px: 88 }).svg;
  const pHive = hive.replace(/<rect[^>]*data-lcs-trunk=""\/>/, '<path d="M60 10 C90 40 80 100 60 110 C40 100 30 40 60 10 Z" fill="#F5E9D2" stroke="#146B5E"/>');
  const nest = AH.animalHome({ id: 'nest', px: 88 }).svg;
  const pNest = nest.replace('</svg>', '<g data-lcs-animal="bird"><circle cx="60" cy="44" r="12" fill="#DDEBE8"/></g></svg>');
  if (pAnthill === anthill || pHive === hive || pNest === nest) throw new Error('a poison edit matched nothing (NEEDLE MATCHED NOTHING)');
  const log = []; let killed = 0, total = 0;
  const judge = (name, id, svg, re) => { total++; const f = structural(id, svg).f; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED — ' + f.join(' | ') : f.length ? 'WRONG REASON — ' + f.join(' | ') : 'SILENT'}`); if (k) killed++; };
  judge('P anthill with one tunnel and one room', 'anthill', pAnthill, /chamber\(s\) ≠ 4/);
  judge('P hive as a hanging teardrop comb', 'hive', pHive, /no trunk rect/);
  judge('P nest with a bird inside', 'nest', pNest, /an animal is drawn/);
  let pngs = [];
  await H.withBrowser(async (page) => {
    const rows = [];
    for (const px of [72, 88]) {
      const m = await masks(page, ids.map((id) => AH.animalHome({ id, px }).svg));
      let worst = 0;
      for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
        const v = iou(m[i], m[j]); worst = Math.max(worst, v);
        ok(v <= 0.60, `IoU ${ids[i]}/${ids[j]} @${px} = ${v.toFixed(2)} > 0.60`);
        rows.push(`${ids[i]}/${ids[j]}@${px} ${v.toFixed(2)}`);
      }
      console.log(`dark-mask IoU @${px}: max ${worst.toFixed(2)}`);
    }
    console.log('  ' + rows.join(' · '));
    if (!process.argv.includes('--no-sheet')) {
      const row = (px) => `<div style="display:flex;gap:12px;margin-bottom:10px">` + ids.map((id) => `<div style="background:#FFFFFF;border:1.5px solid #146B5E;border-radius:10px;padding:4px;line-height:0">${AH.animalHome({ id, px }).svg}</div>`).join('') + '</div>';
      pngs = await H.sheet(page, 'homes', row(72) + row(88) + row(176), { width: 1300 });
    }
  });
  console.log('poison:\n' + log.join('\n'));
  if (pngs.length) console.log('sheets:\n  ' + pngs.join('\n  '));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 30).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { main, structural };
