#!/usr/bin/env node
/**
 * cbn-lineart-build.js — build the line-art Color by Number designs (data/cbn/lineart-designs.js): compose the library
 * drawings, find every closed part (lib/cbn-lineart.js), keep the parts that can hold a number, and write
 * data/cbn/lineart/<id>.json (the ink + the numberable parts, largest first) that data/cbn/designs.js builds from.
 * With --ids writes an index sheet ($TEMP/spl/ids/<n>.png, 6 designs each): every part tinted, its index printed —
 * the sheet the colours are chosen from.
 *   node tools/cbn-lineart-build.js [--only=id,id] [--ids] [--all-parts]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const L = require('../lib/cbn-lineart.js');
const { LINEART } = require('../data/cbn/lineart-designs.js');
const OUT = path.join(__dirname, '..', 'data', 'cbn', 'lineart');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : null; };
const only = arg('only') ? new Set(arg('only').split(',')) : null;
const MIN_PART_R = 9;
const SMALL_R = 3;      // smaller than this is an outline junction or an eye shine, never a part   // picture units: a part narrower than this cannot hold its number (gate MIN_R 8.5 + margin)
const letter = (i) => (i >= 26 ? String.fromCharCode(97 + Math.floor(i / 26) - 1) : '') + String.fromCharCode(97 + (i % 26));
const TINT = ['#F8B4B4', '#FDD9A8', '#FFF1A0', '#C8EBB0', '#A8DDB5', '#BFE6F8', '#B6CCF2', '#D3C1EE', '#F9C9DE', '#D9BFA6'];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const cards = [];
  for (const d of LINEART) {
    if (only && !only.has(d.id)) continue;
    const ink = await L.compose(d);
    const seg = L.segmentInk(ink, L.CW, L.CH, { unit: L.UNIT });
    // fixed parts (the ground under a picture, the sky and the ground of a scene) are found by a point inside them and
    // go LAST, named — so the indexed parts of the drawing keep their numbers whatever the ground adds
    const at = (x, y) => { const l = seg.lab[Math.round(y * L.UNIT) * seg.PW + Math.round(x * L.UNIT)]; return seg.regions.find((r) => r.label === l) || null; };
    let fixed = (d.fixed || []).map((f) => ({ f, r: at(f.at[0], f.at[1]) }));
    // a point the character covers is skipped when another point of the same name finds the area; a name no point finds fails
    for (const { f } of fixed) if (!fixed.some((x) => x.f.name === f.name && x.r)) throw new Error(`${d.id}: fixed part "${f.name}" at ${f.at} is on the ink, not in a part`);
    fixed = fixed.filter((x) => x.r);
    // the same area named twice (a sea band the character does not split) counts once
    for (let i = fixed.length - 1; i >= 0; i--) if (fixed.findIndex((x) => x.r === fixed[i].r) < i) fixed.splice(i, 1);
    const fixedSet = new Set(fixed.map((x) => x.r));
    const items = d.items || [];
    const ownerOf = (r) => { const o = ink.owner[Math.round(r.py * L.UNIT) * L.CW + Math.round(r.px * L.UNIT)]; return o >= 0 ? o : null; };
    const out = (r, extra) => { const o = ownerOf(r); return { d: r.d, area: Math.round(r.area), r: +r.r.toFixed(1), x: +r.px.toFixed(1), y: +r.py.toFixed(1), outside: r.outside,
      item: o, src: o != null ? items[o].src : null, hero: o === items.length - 1, ...extra }; };
    const parts = seg.regions.filter((r) => r.r >= MIN_PART_R && !fixedSet.has(r)).sort((a, b) => b.area - a.area).map((r) => out(r))
      .concat(fixed.map(({ f, r }) => out(r, { fixed: f.name, colour: f.colour })));
    // small parts (no room for a number) — lettered a, b, c … on the index sheet; one can be ATTACHED to a numbered part
    // (lineart-colours.js ATTACH): it is coloured with that part and painted with it on screen (a tail, a hoof, a spot)
    const small = seg.regions.filter((r) => r.r >= SMALL_R && r.r < MIN_PART_R && !fixedSet.has(r) && !r.outside).sort((a, b) => b.area - a.area).map((r) => out(r));
    fs.writeFileSync(path.join(OUT, d.id + '.json'), JSON.stringify({ w: 600, h: 560, ink: seg.ink, parts, small }));
    console.log(`${d.id}: ${parts.length} numberable parts (${seg.regions.length} closed areas)`);
    if (process.argv.includes('--ids')) {
      const cols = (() => { try { delete require.cache[require.resolve('../data/cbn/designs.js')]; return require('../data/cbn/designs.js').partColours(d); } catch (e) { return []; } })();
      let hr = 0;
      const att = (require('../data/cbn/lineart-colours.js').ATTACH || {})[d.id] || {};
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 560" width="540" height="504">` +
        parts.map((p, i) => `<path d="${p.d}" fill="${(p.colour || cols[i]) ? require('../lib/cbn-render.js').PALETTE[p.colour || cols[i]] : TINT[i % TINT.length]}"/>`).join('') +
        `<path d="${seg.ink}" fill="#222"/>` +
        small.map((p, i) => `<path d="${p.d}" fill="${att[letter(i)] != null ? require('../lib/cbn-render.js').PALETTE[cols[att[letter(i)]]] || '#ccc' : '#fff'}"/>`).join('') + `<path d="${seg.ink}" fill="#222"/>` +
        small.map((p, i) => `<text x="${p.x}" y="${p.y + 4}" font-family="Arial" font-weight="bold" font-size="11" text-anchor="middle" fill="#0050D0" stroke="#fff" stroke-width="2.5" paint-order="stroke">${letter(i)}</text>`).join('') +
        parts.map((p, i) => `<text x="${p.x}" y="${p.y + 7}" font-family="Arial" font-weight="bold" font-size="${Math.max(12, Math.min(22, p.r))}" text-anchor="middle" fill="${p.hero ? '#C00' : '#06A'}" stroke="#fff" stroke-width="3" paint-order="stroke">${p.hero ? 'H' + (hr++) : i}</text>`).join('') + '</svg>';
      cards.push({ id: d.id, svg });
    }
  }
  if (cards.length) {
    const dir = path.join(process.env.TEMP || '/tmp', 'spl', 'ids'); fs.mkdirSync(dir, { recursive: true });
    for (let s = 0; s * 6 < cards.length; s++) {
      const chunk = cards.slice(s * 6, s * 6 + 6);
      const comp = [];
      for (let i = 0; i < chunk.length; i++) {
        const png = await sharp(Buffer.from(chunk[i].svg)).png().toBuffer();
        const cap = Buffer.from(`<svg width="540" height="26"><rect width="100%" height="100%" fill="#fff"/><text x="4" y="19" font-size="17" font-family="Arial" font-weight="bold">${chunk[i].id}</text></svg>`);
        comp.push({ input: cap, left: (i % 3) * 550, top: Math.floor(i / 3) * 540 }, { input: png, left: (i % 3) * 550, top: Math.floor(i / 3) * 540 + 28 });
      }
      await sharp({ create: { width: 1650, height: Math.ceil(chunk.length / 3) * 540, channels: 3, background: '#fff' } }).composite(comp).png().toFile(path.join(dir, `ids-${String(s + 1).padStart(2, '0')}.png`));
    }
    console.log(`${cards.length} designs → ${dir}`);
  }
})();
