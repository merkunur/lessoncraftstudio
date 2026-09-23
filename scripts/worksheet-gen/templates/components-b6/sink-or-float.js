/**
 * components-b6/sink-or-float.js — the G1-399 `sink-or-float` components (design
 * docs/worksheet-gen/b6-designs/G1-399-sink-or-float.md §2 "NEW templates/components-b6/sink-or-float.js").
 * Every export is prefixed `sf` (the components-b6 barrel refuses a duplicate name).
 * BASE build (2026-09-23): sfLegend, sfThinkGlyph, sfSplashGlyph, sfStar, sfPicTile, sfBetRow,
 * sfHeads. The face components (sfScaleCard, sfClayRow, sfTransferCard, sfEvidenceShelf,
 * sfClaimRow, sfTub, sfQuestionCard, sfSection) land with the faces (Phase E).
 *
 * Nothing here prints an outcome: the only float / sink words on a base page are the two
 * legend pills; every tank is a primitives/water-tank.js 'rings' tank with two IDENTICAL
 * empty rings; the row's result lives only in its data-lcs-result stamp.
 */
'use strict';
const { color } = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { waterTank } = require('../../primitives/water-tank.js');

/** 3 ascending circles r 3 / 5 / 9 (a thought bubble) — the GUESS head glyph. */
function sfThinkGlyph({ px = 22 } = {}) {
  const k = 30 / px;
  return `<svg data-lcs-glyph="think" width="${px * 34 / 30}" height="${px}" viewBox="0 0 34 30" aria-hidden="true" style="flex:0 0 auto">` +
    [[4.5, 25.5, 3], [11.5, 18, 5], [23.5, 10, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color.white}" stroke="${color.teal}" stroke-width="${(2 * k).toFixed(2)}"/>`).join('') + '</svg>';
}
/** A water drop + 2 splash arcs — the TEST head glyph. */
function sfSplashGlyph({ px = 22 } = {}) {
  const sw = (2 * 30 / px).toFixed(2);
  return `<svg data-lcs-glyph="splash" width="${px}" height="${px}" viewBox="0 0 30 30" aria-hidden="true" style="flex:0 0 auto">` +
    `<path d="M 15 2 Q 22 12 22 17 A 7 7 0 0 1 8 17 Q 8 12 15 2 Z" fill="${color.tealSoft}" stroke="${color.teal}" stroke-width="${sw}" stroke-linejoin="round"/>` +
    `<path d="M 3 24 Q 6 27 10 27" fill="none" stroke="${color.teal}" stroke-width="${sw}" stroke-linecap="round"/>` +
    `<path d="M 27 24 Q 24 27 20 27" fill="none" stroke="${color.teal}" stroke-width="${sw}" stroke-linecap="round"/></svg>`;
}
/** An empty 5-point star outline (teal 2.5, white) — coloured by the child when surprised. */
function sfStar({ size = 40 } = {}) {
  const c = size / 2, R = size / 2 - 2, r = R * 0.45;
  const pts = [];
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; pts.push(`${(c + rr * Math.cos(a)).toFixed(2)},${(c + rr * Math.sin(a)).toFixed(2)}`); }
  return `<svg data-lcs-star width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true" style="display:block">` +
    `<polygon points="${pts.join(' ')}" fill="${color.white}" stroke="${color.teal}" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
}

/** The legend strip: the two positions taught ONCE, each tank + its one word. */
function sfLegend({ floatWord, sinkWord, tank = [112, 56], px = 18, h = 72 }) {
  const one = (mode, word, key) => `<div data-lcs-legend-item="${key}" style="display:flex;align-items:center;gap:8px">` +
    waterTank({ w: tank[0], h: tank[1], mode, id: 'legend-' + key }).svg +
    `<span class="ws-pill" data-lcs-legend-word="${key}" style="font-size:${px}px;padding:2px 18px;white-space:nowrap">${esc(word)}</span></div>`;
  return `<div data-lcs-sof-legend data-lcs-block style="box-sizing:border-box;height:${h}px;background:${color.white};border:2px solid ${color.teal};border-radius:16px;padding:6px 16px;display:flex;align-items:center;justify-content:center;gap:48px">` +
    one('legend-float', floatWord, 'float') + one('legend-sink', sinkWord, 'sink') + '</div>';
}

/** Column template of the heads + every row (pic | gap | guess | gap | test [| gap | star]). */
function sfColumns({ picW, tankW, gap = 18, starW = 64, star }) {
  return `${picW}px ${gap}px ${tankW}px ${gap}px ${tankW}px` + (star ? ` ${gap}px ${starW}px` : '');
}

/** The heads row: glyph + head word over each tank column; the surprise word over the star. */
function sfHeads({ heads, cols, headPx = 15, surprisePx = 13, star, h = 30 }) {
  const head = (key, glyph, txt, px) => `<div data-lcs-head="${key}" style="display:flex;align-items:center;justify-content:center;gap:6px;min-width:0">${glyph}` +
    `<span data-lcs-head-text="${key}" style="font-family:Nunito,sans-serif;font-weight:800;font-size:${px}px;color:${color.teal};white-space:nowrap">${esc(txt)}</span></div>`;
  return `<div data-lcs-heads data-lcs-block style="height:${h}px;display:grid;grid-template-columns:${cols};justify-content:center;align-items:center">` +
    '<div></div><div></div>' + head('guess', sfThinkGlyph(), heads.guess, headPx) + '<div></div>' + head('test', sfSplashGlyph(), heads.test, headPx) +
    (star ? '<div></div>' + head('surprise', '', heads.surprise, surprisePx) : '') + '</div>';
}

/** The picture tile: white, grid 1.5, r 12; the picture + its ONE-line label. */
function sfPicTile({ src, label, px = 60, claimId, w = 100, h = 86, labelPx = 14 }) {
  return `<div data-lcs-tile="${esc(claimId)}" style="box-sizing:border-box;width:${w}px;height:${h}px;background:${color.white};border:1.5px solid ${color.grid};border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:2px">` +
    `<img src="${src}" alt="${esc(label)}" data-lcs-pic style="width:${px}px;height:${px}px;object-fit:contain;display:block">` +
    `<span data-lcs-label style="max-width:${w - 4}px;font-family:Nunito,sans-serif;font-weight:800;font-size:${labelPx}px;line-height:1.2;color:${color.ink};white-space:nowrap;overflow:hidden">${esc(label)}</span></div>`;
}

/** One row: tile | GUESS tank | TEST tank | star. The result is a STAMP, never drawn. */
function sfBetRow({ claim, src, label, cols, pic, tank, tileH, tileW = 100, star, starPx = 40 }) {
  const t = (which) => `<div style="display:flex;justify-content:center;align-items:center">${waterTank({ w: tank[0], h: tank[1], mode: 'rings', id: which }).svg}</div>`;
  return `<div data-lcs-row data-lcs-block data-lcs-item="${esc(claim.theme + '/' + claim.noun)}" data-lcs-claim="${esc(claim.id)}" data-lcs-result="${claim.result}" ` +
    `style="display:grid;grid-template-columns:${cols};justify-content:center;align-items:center;min-height:0">` +
    `<div style="display:flex;justify-content:center">${sfPicTile({ src, label, px: pic, claimId: claim.id, w: tileW, h: tileH })}</div><div></div>` +
    t('guess') + '<div></div>' + t('test') +
    (star ? `<div></div><div style="display:flex;justify-content:center">${sfStar({ size: starPx })}</div>` : '') + '</div>';
}

/* ================================================================ FACES (Phase E, 2026-09-23)
 * One component per face apparatus (design §3). Nothing prints an outcome; every answer lives in a
 * data-lcs-* stamp. Pictures carry no words on F1 / F2 (the pan / the card IS the question). */
const { clayForm } = require('../../primitives/clay-form.js');
const unitCubes = require('../../primitives/unit-cubes.js');
const { blobPath } = require('../../primitives/water-tank.js');

const img = (src, px, extra = '') => `<img src="${src}" alt="" data-lcs-pic style="width:${px}px;height:${px}px;object-fit:contain;display:block"${extra}>`;

/** F1 — the family's hanging-pan balance (lead review 2026-09-23). primitives/balance.js (live consumer G2-252,
 * never edited) hangs its pans 24 px under the beam, too short for an object to REST IN a pan: every picture then
 * sat across the beam end ("skewered"). This drawing keeps balance.js's visual language (teal 5 px beam, coral
 * pivot, tealSoft pedestal, 1.5 px strings, white 3 px dish, +-7 deg tilt) with a pan drop tall enough for the
 * heavier picture: beam at `beamAt` x h, strings `drop` px long, dish floor = chord + 8. Returns the geometry the
 * card places its pictures on: pan {x, chordY, floorY} per side + the beam segment (verify() re-measures both). */
function sfBalance({ tilt, w, h, drop, beamAt = 0.2 }) {
  const deg = tilt === 'left' ? 7 : tilt === 'right' ? -7 : 0, rad = deg * Math.PI / 180;
  const cx = w / 2, beamY = h * beamAt, half = w * 0.32, panW = w * 0.26;
  const L = { x: cx - Math.cos(rad) * half, y: beamY + Math.sin(rad) * half }, R = { x: cx + Math.cos(rad) * half, y: beamY - Math.sin(rad) * half };
  const f = (v) => v.toFixed(2);
  const pan = (P, side) => { const y = P.y + drop;
    return `<line x1="${f(P.x)}" y1="${f(P.y)}" x2="${f(P.x - panW / 2 + 6)}" y2="${f(y)}" stroke="${color.teal}" stroke-width="1.5" stroke-linecap="round"/>` +
      `<line x1="${f(P.x)}" y1="${f(P.y)}" x2="${f(P.x + panW / 2 - 6)}" y2="${f(y)}" stroke="${color.teal}" stroke-width="1.5" stroke-linecap="round"/>` +
      `<path d="M ${f(P.x - panW / 2)} ${f(y)} Q ${f(P.x)} ${f(y + 16)} ${f(P.x + panW / 2)} ${f(y)}" fill="${color.white}" stroke="${color.teal}" stroke-width="3" data-lcs-pan="${side}"/>`; };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="balance scale tilted ${tilt}" data-lcs-prim="balance" data-lcs-tilt="${tilt}" data-lcs-drop="${drop}" style="display:block">` +
    `<path d="M ${cx - 22} ${h - 4} L ${cx + 22} ${h - 4} L ${cx + 8} ${f(beamY + 6)} L ${cx - 8} ${f(beamY + 6)} Z" fill="${color.tealSoft}" stroke="${color.teal}" stroke-width="2.5" stroke-linejoin="round"/>` +
    pan(L, 'left') + pan(R, 'right') +
    `<line data-lcs-beam x1="${f(L.x)}" y1="${f(L.y)}" x2="${f(R.x)}" y2="${f(R.y)}" stroke="${color.teal}" stroke-width="5" stroke-linecap="round"/>` +
    `<circle cx="${cx}" cy="${f(beamY)}" r="6" fill="${color.coral}"/></svg>`;
  return { svg, pans: { L: { x: L.x, chordY: L.y + drop, floorY: L.y + drop + 8 }, R: { x: R.x, chordY: R.y + drop, floorY: R.y + drop + 8 } }, beam: { x1: L.x, y1: L.y, x2: R.x, y2: R.y } };
}

/** F1 — one balance card: the heavier pan DOWN; each picture RESTS IN its pan (bottom on the dish floor, centred,
 * wholly under the beam), drawn larger when heavier, in FRONT of the strings. */
function sfScaleCard({ pair, left, right, heavier, floats, bigPx = 76, smallPx = 46, w = 560, h = 146, drop = 82, beamAt = 0.2, cardW = 639, cardMin = 154, fill = true, oldPlacement = false }) {
  const tilt = heavier === 'L' ? 'left' : 'right';
  const B = sfBalance({ tilt, w, h, drop, beamAt });
  const beamEnd = { L: { x: B.beam.x1, y: B.beam.y1 }, R: { x: B.beam.x2, y: B.beam.y2 } };
  const pic = (side, o) => { const px = side === heavier ? bigPx : smallPx; const p = B.pans[side];
    // oldPlacement = the GATE's poison seam: the pre-review placement, the picture centred on the beam END
    const top = oldPlacement ? beamEnd[side].y - px / 2 : p.floorY - px;
    return `<div data-lcs-pan-pic="${side}" data-lcs-item="${esc(o.theme + '/' + o.noun)}" style="position:absolute;left:${(p.x - px / 2).toFixed(2)}px;top:${top.toFixed(2)}px;width:${px}px;height:${px}px">${img(o.src, px)}</div>`; };
  return `<div class="ws-card" data-lcs-scale-card data-lcs-block data-lcs-pair="${esc(pair)}" data-lcs-floats="${floats}" data-lcs-heavier="${heavier}" ` +
    `style="box-sizing:border-box;width:${cardW}px;min-height:${cardMin}px;${fill ? 'height:100%;' : ''}padding:0;align-items:center;justify-content:center;background:${color.white}">` +
    `<div data-lcs-scale-stage style="position:relative;width:${w}px;height:${h}px"><div style="position:absolute;left:0;top:0">${B.svg}</div>${pic('L', left)}${pic('R', right)}</div></div>`;
}

/** A plain right arrow (the "is made into" sign between a lump and its shape). */
function sfArrow({ w = 30, h = 20 } = {}) {
  return `<svg data-lcs-arrow width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" style="flex:0 0 auto">` +
    `<path d="M 2 ${h / 2} L ${w - 8} ${h / 2}" stroke="${color.teal}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M ${w - 12} ${h / 2 - 6} L ${w - 3} ${h / 2} L ${w - 12} ${h / 2 + 6}" fill="none" stroke="${color.teal}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

/** F2 — one clay card: lump -> arrow -> the SAME clay as a ball / boat, then a rings tank to colour. */
function sfClayRow({ form, result, lumpW = 72, formW = 120, tank = [150, 75], cardW = 312 }) {
  const { waterTank } = require('../../primitives/water-tank.js');
  return `<div class="ws-card" data-lcs-clay-card data-lcs-block data-lcs-form="${form}" data-lcs-result="${result}" ` +
    `style="box-sizing:border-box;width:${cardW}px;height:100%;padding:10px 12px;gap:8px;align-items:center;justify-content:center;background:${color.white}">` +
    `<div style="display:flex;align-items:flex-end;justify-content:center;gap:6px">${clayForm({ form: 'lump', w: lumpW }).svg}<div style="padding-bottom:18px">${sfArrow()}</div>${clayForm({ form, w: formW }).svg}</div>` +
    waterTank({ w: tank[0], h: tank[1], mode: 'rings', id: 'clay-' + form }).svg + `</div>`;
}

/** F2 (fix round 2) — a row head: the one short line that names what a row is about (teal Nunito 800). */
function sfRowHead({ key, text, h = 24, px = 16 }) {
  return `<div data-lcs-row-head="${esc(key)}" style="box-sizing:border-box;height:${h}px;display:flex;align-items:center;justify-content:center;font-family:Nunito,sans-serif;font-weight:800;font-size:${px}px;line-height:1.2;color:${color.teal};white-space:nowrap">${esc(text)}</div>`;
}

/** F2 — the transfer card: a small steel nail and a big steel ship; circle the one that floats. Fix round 2 (de / fr / nl
 * panels): the card carries its OWN head (`head`), so the circle task has a visible target on the page. */
function sfTransferCard({ left, right, floats, w = 639, minH = 120, head = null }) {
  const one = (o) => `<div data-lcs-transfer-item="${esc(o.id)}" data-lcs-item="${esc(o.theme + '/' + o.noun)}" style="display:flex;align-items:flex-end;justify-content:center;width:160px;height:${Math.max(o.px, 96)}px">${img(o.src, o.px)}</div>`;
  return `<div class="ws-card" data-lcs-transfer data-lcs-block data-lcs-floats="${floats}" style="box-sizing:border-box;width:${w}px;min-height:${minH}px;height:100%;padding:6px 10px 10px;align-items:center;justify-content:center;gap:4px;background:${color.white}">` +
    (head ? sfRowHead({ key: 'steel', text: head }) : '') +
    `<div style="display:flex;flex-direction:row;align-items:flex-end;justify-content:center;gap:120px">` + one(left) + one(right) + `</div></div>`;
}

/** F3 — the evidence shelf: every object any row names (true or false), with its label. */
function sfEvidenceShelf({ items, px = 56, labelPx = 14, w = 639, h = 88 }) {
  return `<div data-lcs-shelf data-lcs-block style="box-sizing:border-box;width:${w}px;height:${h}px;background:${color.creamDeep};border-radius:14px;display:flex;align-items:center;justify-content:center;gap:28px;padding:0 12px">` +
    items.map((o) => `<div data-lcs-shelf-item="${esc(o.id)}" style="display:flex;flex-direction:column;align-items:center;gap:1px">${img(o.src, px)}<span data-lcs-label style="font-family:Nunito,sans-serif;font-weight:800;font-size:${labelPx}px;line-height:1.2;color:${color.ink};white-space:nowrap">${esc(o.label)}</span></div>`).join('') + `</div>`;
}

/** F3 — one claim row: badge · sentence · true / false chips. Identical in shape for every row (no picture in any row). */
function sfClaimRow({ n, id, truth, text, yes, no, textPx = 17, textW = 356, chipsW = 210 }) {
  const { truthChips } = require('../components-b3.js');
  return `<div data-lcs-claim-row data-lcs-block data-lcs-tf="${esc(id)}" data-lcs-truth="${truth}" style="display:grid;grid-template-columns:32px 12px ${textW}px 12px ${chipsW}px;align-items:center;justify-content:center;box-sizing:border-box;width:639px;background:${color.white};border:1.5px solid ${color.grid};border-radius:12px;padding:6px 8px;min-height:0">` +
    `<span data-lcs-badge style="width:32px;height:32px;border-radius:50%;background:${color.teal};color:${color.white};display:flex;align-items:center;justify-content:center;font-family:'Baloo 2',sans-serif;font-weight:700;font-size:18px">${n}</span><span></span>` +
    `<span data-lcs-claim-text style="font-family:Nunito,sans-serif;font-weight:800;font-size:${textPx}px;line-height:1.3;color:${color.ink}">${esc(text)}</span><span></span>` +
    `<span style="display:flex;justify-content:center">${truthChips({ yes, no, px: 18 })}</span></div>`;
}

/** A tiny position icon (float: the blob ON a wave line; sink: the blob resting on a floor line) for the F4 tags. */
function sfPosIcon(kind, { w = 40, h = 30 } = {}) {
  const R = 8, wy = 15, fy = 26;
  const body = kind === 'float'
    ? `<path d="M 1 ${wy} Q 7 ${wy - 4} 13 ${wy} Q 19 ${wy + 4} 25 ${wy} Q 31 ${wy - 4} 39 ${wy}" fill="none" stroke="${color.teal}" stroke-width="2"/><path d="${blobPath(w / 2, wy, R)}" fill="${color.teal}"/>`
    : `<line x1="2" y1="${fy}" x2="${w - 2}" y2="${fy}" stroke="${color.inkSoft}" stroke-width="2"/><path d="${blobPath(w / 2, fy - 0.71 * R - 1, R)}" fill="${color.teal}"/>`;
  return `<svg data-lcs-pos-icon="${kind}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" style="flex:0 0 auto">${body}</svg>`;
}

/** F4 — the ONE class tub: 2 spots at the waterline + 2 on the floor; two word tags in the left column. */
function sfTub({ floatWord, sinkWord, w = 639, h = 520, spots = 2, tagPx = 22, tagFloor = 18, minH = 520, topPull = 24, forceTagWidth = null }) {
  const { waterTank } = require('../../primitives/water-tank.js');
  const T = waterTank({ w, h, mode: 'spots', spots, stretch: true, id: 'tub' });
  const pct = (y) => (100 * y / h).toFixed(3) + '%';
  // de panel (2026-09-23): a FIXED 159 px tag let "schwimmt oben" run past its border, and the sink tag sat across the
  // first sink spot. The tags now sit in the two spot-free bands — the float tag in the AIR above the float spots, the
  // sink tag in the WATER between the float spots and the sink spots — so each may grow to its word: width max-content,
  // min 159, capped at the glass. If the cap would be hit, the font steps down (never under the K 18 px floor); verify()
  // measures the word against its tag and the tag against every spot.
  const left = Math.round(0.04 * w) + 6;
  const tagMin = Math.round(0.28 * w) - 20, tagCap = Math.round(0.96 * w) - 6 - left;
  const spot0 = T.spotRects.find((r) => r.zone === 'float'), sink0 = T.spotRects.find((r) => r.zone === 'sink');
  const floatY = (0.06 * h + spot0.y) / 2;                       // the air band above the float spots
  const sinkY = (spot0.y + spot0.h + sink0.y) / 2;               // the water band between the two spot rows
  // font step-down: a conservative Baloo 2 700 advance of 0.62 em per character + the 40 px icon + 6 gap + 20 padding/border
  const fit = (word) => { let px = tagPx; while (px > tagFloor && word.length * 0.62 * px + 66 > tagCap) px -= 1; return px; };
  const tag = (kind, word, y) => { const px = fit(word);
    const width = forceTagWidth ? `width:${forceTagWidth}px` : `width:max-content;min-width:${tagMin}px;max-width:${tagCap}px`;   // forceTagWidth = the GATE's poison seam (the old fixed tag)
    return `<div data-lcs-tag="${kind}" style="position:absolute;z-index:1;left:${left}px;top:${pct(y)};transform:translateY(-50%);box-sizing:border-box;${width};min-height:44px;` +
      `display:flex;align-items:center;gap:6px;padding:4px 8px;background:${color.white};border:2px solid ${color.teal};border-radius:999px">${sfPosIcon(kind)}` +
      `<span data-lcs-tag-word="${kind}" style="font-family:'Baloo 2',sans-serif;font-weight:700;font-size:${px}px;line-height:1.1;white-space:nowrap;color:${color.ink}">${esc(word)}</span></div>`; };
  // leaders: a VERTICAL teal line from inside each tag DOWN to the line it names, in the spot-free left column
  const xc = left + 40;
  const leaders = `<svg data-lcs-leaders width="${w}" height="100%" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true" style="position:absolute;left:0;top:0;width:${w}px;height:100%;overflow:visible">` +
    `<path data-lcs-leader="float" d="M ${xc} ${floatY.toFixed(1)} L ${xc} ${T.waterY}" stroke="${color.teal}" stroke-width="2" vector-effect="non-scaling-stroke" fill="none"/>` +
    `<path data-lcs-leader="sink" d="M ${xc} ${sinkY.toFixed(1)} L ${xc} ${T.floorY}" stroke="${color.teal}" stroke-width="2" vector-effect="non-scaling-stroke" fill="none"/></svg>`;
  // margin-top pulls the tub's own blank air band (0.06h above the rim) up under the instruction's bottom margin
  return { html: `<div data-lcs-tub data-lcs-block style="position:relative;width:${w}px;height:calc(100% + ${topPull}px);min-height:${minH}px;margin:-${topPull}px auto 0">${T.svg}${leaders}${tag('float', floatWord, floatY)}${tag('sink', sinkWord, sinkY)}</div>`, tank: T };
}

/** F5 — a section card: teal numbered badge + drawn glyph + head, then its inner apparatus. */
function sfSection({ n, key, glyph, head, inner, headPx = 17, w = 639, fill = true }) {
  return `<div class="ws-card" data-lcs-section="${key}" data-lcs-block style="box-sizing:border-box;width:${w}px;${fill ? 'height:100%;' : ''}padding:6px 12px;gap:4px;background:${color.white};justify-content:flex-start">` +
    `<div style="display:flex;align-items:center;gap:8px;height:26px"><span data-lcs-badge style="width:26px;height:26px;border-radius:50%;background:${color.teal};color:${color.white};display:flex;align-items:center;justify-content:center;font-family:'Baloo 2',sans-serif;font-weight:700;font-size:16px">${n}</span>${glyph}` +
    `<span data-lcs-section-head style="font-family:Nunito,sans-serif;font-weight:800;font-size:${headPx}px;color:${color.teal}">${esc(head)}</span></div>${inner}</div>`;
}
/** A lightbulb (the "I learned" glyph). */
function sfBulbGlyph({ px = 22 } = {}) {
  return `<svg data-lcs-glyph="bulb" width="${px}" height="${px}" viewBox="0 0 30 30" aria-hidden="true" style="flex:0 0 auto">` +
    `<path d="M 15 3 A 9 9 0 0 1 20 19.5 L 20 22 L 10 22 L 10 19.5 A 9 9 0 0 1 15 3 Z" fill="${color.coralSoft}" stroke="${color.teal}" stroke-width="2.4" stroke-linejoin="round"/>` +
    `<path d="M 11 25.5 L 19 25.5" stroke="${color.teal}" stroke-width="2.4" stroke-linecap="round"/></svg>`;
}
/** A question mark in a circle (the "Question" glyph), drawn — no glyph from the font. */
function sfQuestionGlyph({ px = 22 } = {}) {
  return `<svg data-lcs-glyph="question" width="${px}" height="${px}" viewBox="0 0 30 30" aria-hidden="true" style="flex:0 0 auto">` +
    `<circle cx="15" cy="15" r="12" fill="${color.white}" stroke="${color.teal}" stroke-width="2.4"/>` +
    `<path d="M 11 11.5 Q 11 7.5 15 7.5 Q 19 7.5 19 11 Q 19 13.5 15 15 L 15 17.5" fill="none" stroke="${color.teal}" stroke-width="2.4" stroke-linecap="round"/><circle cx="15" cy="21.5" r="1.7" fill="${color.teal}"/></svg>`;
}

/** F5 — a question card: an empty 32 px tick box, the question (whole literal), and its picture. */
function sfQuestionCard({ q, text, pictureHtml, textPx = 17, h = 52 }) {
  return `<div data-lcs-question="${esc(q)}" style="display:grid;grid-template-columns:32px 1fr auto;column-gap:12px;align-items:center;min-height:${h}px">` +
    `<span data-lcs-tickbox style="box-sizing:border-box;width:32px;height:32px;border:2.5px solid ${color.teal};border-radius:6px;background:${color.white}"></span>` +
    `<span data-lcs-question-text style="font-family:Nunito,sans-serif;font-weight:800;font-size:${textPx}px;line-height:1.3;color:${color.ink}">${esc(text)}</span>` +
    `<span style="display:flex;align-items:flex-end;gap:4px">${pictureHtml}</span></div>`;
}
/** The F5 cargo picture: a clay boat + ONE unit cube (both drawn; one art source). */
function sfCargoPicture({ boatW = 64, unit = 14 } = {}) {
  return clayForm({ form: 'boat', w: boatW, id: 'cargo-boat' }).svg + unitCubes({ l: 1, w: 1, h: 1, unit }).svg;
}

module.exports = { sfBalance, sfThinkGlyph, sfSplashGlyph, sfStar, sfLegend, sfColumns, sfHeads, sfPicTile, sfBetRow,
  sfScaleCard, sfArrow, sfClayRow, sfRowHead, sfTransferCard, sfEvidenceShelf, sfClaimRow, sfPosIcon, sfTub, sfSection, sfBulbGlyph, sfQuestionGlyph, sfQuestionCard, sfCargoPicture };
