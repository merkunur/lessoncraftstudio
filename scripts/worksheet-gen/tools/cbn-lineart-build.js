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
const MIN_PART_R = 9;   // a full-size number (lib/cbn-render.js MIN_R 8.5 + margin)
const MID_R = 6.5;      // a compact number (lib/cbn-render.js MIN_R_COMPACT 6 + margin: the render measures a piece slightly smaller)
const PROBE_PX = 24;    // canvas px across an outline (7-unit stroke = 14 px, closed by the segmenter) to the next part
const THICK_INK = 8.5;  // px from the middle of the ink: an outline is ~7, a pupil more — a neighbour across it does not count
const SMALL_R = 1;      // every closed piece is painted (operator 2026-10-05); below MID_R it is attached to its neighbour, an eye shine stays white (designs.js EYE_THICK)
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
    // 2026-10-05 operator: "parts of images which are not painted" — every piece is painted. A piece too small for a full
    // number but wide enough for a compact one (MID_R..MIN_PART_R) is its own numbered part ("mid"); a smaller one
    // ("small") is painted with the numbered part it borders most. Both record that neighbour across the ink (nb: index
    // into parts) and inkFrac, the share of probes across their outline that land in solid ink — an eye white borders a
    // black pupil, an ear lining borders a thin line (lib: designs.js partColours / build).
    const regsMid = seg.regions.filter((r) => r.r >= MID_R && r.r < MIN_PART_R && !fixedSet.has(r) && !r.outside).sort((a, b) => b.area - a.area);
    const regsSmall = seg.regions.filter((r) => r.r >= SMALL_R && r.r < MID_R && !fixedSet.has(r) && !r.outside).sort((a, b) => b.area - a.area);
    const partRegs = seg.regions.filter((r) => r.r >= MIN_PART_R && !fixedSet.has(r)).sort((a, b) => b.area - a.area).concat(fixed.map((x) => x.r));
    // every piece has a key: p<i> numbered part (fixed areas included), m<i> mid piece, s<i> small piece
    const keyOf = new Map();
    partRegs.forEach((r, i) => keyOf.set(r.label, 'p' + i));
    regsMid.forEach((r, i) => keyOf.set(r.label, 'm' + i));
    regsSmall.forEach((r, i) => keyOf.set(r.label, 's' + i));
    const probe = new Set([...regsMid, ...regsSmall].map((r) => r.label));
    const nbThin = new Map(), nbThick = new Map(), thick = new Map(), walks = new Map(), thickWalks = new Map();   // neighbours across a thin outline / across thicker ink
    const lab = seg.lab, PW = seg.PW, PH = lab.length / PW, K = PROBE_PX;
    // ink thickness (chamfer distance inside the ink, px): an outline is ~7 px from its middle, a pupil far more
    const DT = new Float32Array(PW * PH);
    for (let i = 0; i < PW * PH; i++) DT[i] = ink[i] ? 1e9 : 0;
    for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) { const i = y * PW + x; if (!DT[i]) continue;
      DT[i] = Math.min(DT[i], x ? DT[i - 1] + 3 : 3, y ? DT[i - PW] + 3 : 3, x && y ? DT[i - PW - 1] + 4 : 4, y && x < PW - 1 ? DT[i - PW + 1] + 4 : 4); }
    for (let y = PH - 1; y >= 0; y--) for (let x = PW - 1; x >= 0; x--) { const i = y * PW + x; if (!DT[i]) continue;
      DT[i] = Math.min(DT[i], x < PW - 1 ? DT[i + 1] + 3 : 3, y < PH - 1 ? DT[i + PW] + 3 : 3, x < PW - 1 && y < PH - 1 ? DT[i + PW + 1] + 4 : 4, y < PH - 1 && x ? DT[i + PW - 1] + 4 : 4); }
    for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) {   // every pixel: a tiny piece must be probed too
      const a = lab[y * PW + x]; if (!a || !probe.has(a)) continue;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        let crossed = 0;
        for (let s = 2; s <= K; s += 2) {     // walk out across the outline: the thickest ink crossed, then the piece beyond
          const X = x + dx * s, Y = y + dy * s; if (X < 0 || Y < 0 || X >= PW || Y >= PH) break;
          const i = Y * PW + X, b = lab[i];
          if (ink[i]) { const t = DT[i] / 3; if (t > crossed) crossed = t; if (t > (thick.get(a) || 0)) thick.set(a, t); }
          if (b && b !== a) {
            // a piece reached across ink thicker than an outline (a pupil) is a weaker neighbour: an iris is not the face
            walks.set(a, (walks.get(a) || 0) + 1); if (crossed >= THICK_INK) thickWalks.set(a, (thickWalks.get(a) || 0) + 1);
            const k = keyOf.get(b);
            if (k) { const map = crossed < THICK_INK ? nbThin : nbThick; const m = map.get(a) || new Map(); m.set(k, (m.get(k) || 0) + 1); map.set(a, m); }
            break;
          }
        }
      }
    }
    // a piece's neighbours, best first: of its OWN drawing for a piece of a drawing (a paw pad is not the grass), any for a
    // background pocket; across a thin outline before across thick ink; by shared border
    const ownerKey = new Map();
    partRegs.forEach((r, i) => ownerKey.set('p' + i, fixedSet.has(r) ? null : ownerOf(r)));
    regsMid.forEach((r, i) => ownerKey.set('m' + i, ownerOf(r)));
    regsSmall.forEach((r, i) => ownerKey.set('s' + i, ownerOf(r)));
    const info = (r) => { const own = ownerOf(r); const list = [];
      for (const [map, w] of [[nbThin, 1], [nbThick, 0]]) { const m = map.get(r.label); if (!m) continue;
        for (const [k, v] of [...m].sort((x, y) => y[1] - x[1])) { if (own != null && ownerKey.get(k) !== own) continue; if (!list.includes(k)) list.push(k); } }
      // thickShare: the share of the piece's border crossing ink thicker than an outline — most of an eye white's border
      // is its pupil; a plate that meets one heavy line junction is not an eye
      const w = walks.get(r.label) || 0;
      return { nbs: list.slice(0, 6), thick: +(thick.get(r.label) || 0).toFixed(1), thickShare: w ? +((thickWalks.get(r.label) || 0) / w).toFixed(2) : 0 }; };
    const mid = regsMid.map((r) => out(r, info(r)));
    const small = regsSmall.map((r) => out(r, info(r)));
    fs.writeFileSync(path.join(OUT, d.id + '.json'), JSON.stringify({ w: 600, h: 560, ink: seg.ink, parts, mid, small }));
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
