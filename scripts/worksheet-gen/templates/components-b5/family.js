/**
 * components-b5/family.js — the K-370 `family` components (nt10-E; design
 * docs/worksheet-gen/b5-designs/K-370-family.md §2 "NEW
 * templates/components-b5/family.js"). Pure markup on the tokens; the SPEC
 * composes, stamps the graph and guards. Class prefix `fam-`.
 *
 * BASE (built 2026-09-23):
 *   pictureFrame({ person, box:{x,y,w,h}, ego })  -> svg <g>
 *     a picture frame (rounded rect rx 10, teal 3 — the ego coral 4 + a coral
 *     5-point star at (w-8, 12)), an inner grid 1.5 line inset 5 (the double
 *     "picture frame" edge), a white mat, and the bust (primitives/family-figure.js)
 *     bottom-centred in the mat at px = round(0.8 h) (96 at the shipped 104 x 120).
 *     Stamps the <g>: data-lcs-person / -path / -sex / -age / -look (+ -ego);
 *     the frame rect: data-lcs-frame="<id>" (the tree gate's geometry).
 *   familyStage({ persons, frame, badges, egoId, egoName, skin, w })  -> { html, height, tree }
 *     primitives/family-tree.js + pictureFrame per node; the ego's name on a
 *     namePlate (components-b4/pronouns.js, px 18, h 26) centred on the ego
 *     frame's bottom edge (HTML overlay, absolutely positioned). Root
 *     <div data-lcs-stage>; the only text inside is the ego's name and the
 *     badge numerals (verify()).
 *   kinChip({ text, px, w, h })  -> a white pill, teal 2.5, radius 28, Nunito 800,
 *     centred, nowrap; inner width w - 20 (176 at w 196).
 *   kinWordBlock({ rows:[{wordKey, text, answer}], chipW, boxW, boxH, px, colGap, rowGap })
 *     two columns [chip | 10 | box]; the words fill column 1 top-down, then
 *     column 2. The box is components-b3 blankNumeralBox (never answerBox — it
 *     stamps "undefined" without an answer); the answer lives only in
 *     data-lcs-answer.
 *
 * FACES (Phase E, 2026-09-23): genRail + genPlacard (F1) · traceRows (F2) · nameBox +
 * famGivenPlate + clueList (F3) · riddleRow + famEgoCard (F4) · templateTree over
 * primitives/frame-tree.js (F5) · famNumberDisc. familyStage gained ADDITIVE knobs
 * (nodeW / labelH / rowGap / plates:false / overlay / crownClamp) — the base passes
 * none of them. Record: docs/worksheet-gen/b5-designs/_work/K-370-faces.md.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { esc } = require('../../primitives/_svg.js');
const { familyFigure } = require('../../primitives/family-figure.js');
const { familyTree } = require('../../primitives/family-tree.js');
const { namePlate } = require('../components-b4.js');
const { blankNumeralBox } = require('../components-b3.js');

const T = tokens.color;
const F = tokens.font;
const S = (v) => +(+v).toFixed(2);

function starPath(cx, cy, R, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (-90 + i * 36) * Math.PI / 180, rad = i % 2 ? r : R;
    pts.push(`${S(cx + rad * Math.cos(a))} ${S(cy + rad * Math.sin(a))}`);
  }
  return 'M ' + pts.join(' L ') + ' Z';
}

function pictureFrame({ person, box, ego = false }) {
  const { x, y, w, h } = box;
  const px = Math.round(h * 0.8);
  const fig = familyFigure({ age: person.age, sex: person.sex, look: person.look, tint: person.tint, px, id: 'fam-' + person.id });
  const inset = 5;
  const fx = S(x + (w - fig.width) / 2), fy = S(y + h - inset - px);
  const figSvg = fig.svg.replace('<svg ', `<svg x="${fx}" y="${fy}" `);
  const stroke = ego ? T.coral : T.teal, sw = ego ? 4 : 3;
  return `<g data-lcs-person="${esc(person.id)}" data-lcs-path="${esc(person.path)}" data-lcs-sex="${person.sex}" data-lcs-age="${person.age}" data-lcs-look="${esc(person.look)}"${ego ? ' data-lcs-ego=""' : ''}>` +
    `<rect x="${S(x)}" y="${S(y)}" width="${w}" height="${h}" rx="10" ry="10" fill="${T.white}" stroke="none"/>` +
    figSvg +
    `<rect x="${S(x + inset)}" y="${S(y + inset)}" width="${w - 2 * inset}" height="${h - 2 * inset}" rx="6" ry="6" fill="none" stroke="${T.grid}" stroke-width="1.5"/>` +
    `<rect x="${S(x)}" y="${S(y)}" width="${w}" height="${h}" rx="10" ry="10" fill="none" stroke="${stroke}" stroke-width="${sw}" data-lcs-frame="${esc(person.id)}"/>` +
    (ego ? `<path d="${starPath(x + w - 8, y + 12, 13, 5.5)}" fill="${T.coral}" stroke="${T.white}" stroke-width="1.5" stroke-linejoin="round" data-lcs-ego-star=""/>` : '') +
    `</g>`;
}

function familyStage({ persons, frame, badges, egoId, egoName, skin = 'tree', w = 675, plates = true, nodeW, labelH, rowGap, overlay, crownClamp }) {
  // nodeW / labelH / rowGap / plates:false / overlay are the FACE knobs (F2 small tree, F3 name plates);
  // the base passes none of them, so its tree call is the one it always made
  const extra = {};
  if (nodeW != null) extra.nodeW = nodeW;
  if (labelH != null) extra.labelH = labelH;
  if (rowGap != null) extra.rowGap = rowGap;
  if (crownClamp) extra.crownClamp = true;
  const tree = familyTree({
    persons, frame, badges, egoId, plates, skin, w, ...extra,
    nodeSvg: (person, box) => pictureFrame({ person, box, ego: person.id === egoId }),
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${tree.height}" viewBox="0 0 ${w} ${tree.height}" role="img" aria-label="" style="display:block;overflow:visible" data-lcs-stage-svg="">${tree.svg}</svg>`;
  const plate = tree.plate ? `<div style="position:absolute;left:${S(tree.plate.cx)}px;top:${S(tree.plate.y - 13)}px;transform:translateX(-50%);display:flex" data-lcs-ego-plate="">` +
    namePlate({ text: egoName, px: 18, h: 26 }) + `</div>` : '';
  const over = overlay ? overlay(tree) : '';
  const html = `<div class="fam-stage" data-lcs-stage="" style="position:relative;width:${w}px;height:${tree.height}px;margin:0 auto">${svg}${plate}${over}</div>`;
  return { html, height: tree.height, tree };
}

function kinChip({ text, px = 22, w = 196, h = 56 }) {
  return `<span class="fam-chip" data-lcs-chip-text="" style="box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;width:${w}px;height:${h}px;flex:0 0 ${w}px;` +
    `padding:0 7.5px;background:${T.white};border:2.5px solid ${T.teal};border-radius:28px;font-family:${F.body},sans-serif;font-weight:800;font-size:${px}px;line-height:1;color:${T.ink};white-space:nowrap;overflow:hidden">${esc(text)}</span>`;
}

function kinWordBlock({ rows, chipW = 196, boxW = 64, boxH = 56, px = 22, colGap = 48, rowGap = 8, gap = 10 }) {
  const nRows = Math.ceil(rows.length / 2);
  const cells = rows.map((r) =>
    `<div class="fam-kinrow" data-lcs-kin="${esc(r.wordKey)}" style="display:flex;align-items:center;gap:${gap}px">` +
    kinChip({ text: r.text, px, w: chipW, h: boxH }) +
    blankNumeralBox({ w: boxW, h: boxH, answer: String(r.answer), attrs: 'data-lcs-kinbox=""' }) + `</div>`).join('');
  return `<div class="fam-kinblock" data-lcs-kinblock="" style="display:grid;grid-auto-flow:column;grid-template-rows:repeat(${nRows},${boxH}px);` +
    `grid-template-columns:repeat(2,${chipW + gap + boxW}px);column-gap:${colGap}px;row-gap:${rowGap}px;justify-content:center;align-content:center">${cells}</div>`;
}

/* ================================================================== FACES (Phase E, 2026-09-23) */
const { strokeWordLane, writingRow } = require('../../primitives/trace-path.js');
const { frameTree } = require('../../primitives/frame-tree.js');

/** a teal number disc as a tiny inline svg (Baloo 2 700, white numeral) */
function numberDisc({ n, d = 30, px = 20, attrs = '' }) {
  const r = d / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${d}" height="${d}" viewBox="0 0 ${d} ${d}" role="img" aria-label="" style="display:block;flex:0 0 ${d}px"${attrs ? ' ' + attrs : ''}>` +
    `<circle cx="${r}" cy="${r}" r="${r}" fill="${T.teal}"/>` +
    `<text x="${r}" y="${r + 0.5}" font-family="${F.display}, cursive" font-size="${px}" font-weight="700" fill="${T.white}" text-anchor="middle" dominant-baseline="central">${n}</text></svg>`;
}

/**
 * F1 genRail({ gens:[{ rank, people:[{person}, {person}] }], w, frameW, frameH, px })
 * A teal rail across `w` with three hung frames (one per generation, 1 = oldest),
 * each holding TWO busts side by side (one f + one m, one garment tint shared by
 * both, so no sex attaches to a numeral), hanging by two cords; a number disc
 * under each frame. NO words: the legend is pictures + numerals.
 * Stamps: frame rect [data-lcs-gen-frame="<rank>"], disc [data-lcs-gen-disc="<rank>"].
 */
function genRail({ gens, w = 639, frameW = 150, frameH = 96, px = 76, cord = 16, discD = 30 }) {
  const railY = 3, top = railY + cord, discTop = top + frameH + 6;
  const H = discTop + discD + 1;
  const parts = [`<line x1="2" y1="${railY}" x2="${w - 2}" y2="${railY}" stroke="${T.teal}" stroke-width="3" stroke-linecap="round" data-lcs-rail=""/>`];
  gens.forEach((g, i) => {
    const cx = w * (2 * i + 1) / (2 * gens.length);
    const x = cx - frameW / 2;
    parts.push(`<line x1="${S(cx - 40)}" y1="${railY}" x2="${S(cx - 40)}" y2="${top}" stroke="${T.teal}" stroke-width="1.5"/>`,
      `<line x1="${S(cx + 40)}" y1="${railY}" x2="${S(cx + 40)}" y2="${top}" stroke="${T.teal}" stroke-width="1.5"/>`);
    parts.push(`<g data-lcs-gen-legend="${g.rank}"><rect x="${S(x)}" y="${top}" width="${frameW}" height="${frameH}" rx="10" ry="10" fill="${T.white}"/>`);
    const figs = g.people.map((p) => familyFigure({ age: p.age, sex: p.sex, look: p.look, tint: p.tint, px, id: 'fam-gen-' + g.rank + p.sex }));
    const gap = 8, tot = figs[0].width + figs[1].width + gap;
    let fx = x + (frameW - tot) / 2;
    for (const f of figs) { parts.push(f.svg.replace('<svg ', `<svg x="${S(fx)}" y="${S(top + frameH - 5 - px)}" `)); fx += f.width + gap; }
    parts.push(`<rect x="${S(x + 5)}" y="${top + 5}" width="${frameW - 10}" height="${frameH - 10}" rx="6" ry="6" fill="none" stroke="${T.grid}" stroke-width="1.5"/>`,
      `<rect x="${S(x)}" y="${top}" width="${frameW}" height="${frameH}" rx="10" ry="10" fill="none" stroke="${T.teal}" stroke-width="3" data-lcs-gen-frame="${g.rank}"/></g>`);
    const r = discD / 2;
    parts.push(`<circle cx="${S(cx)}" cy="${discTop + r}" r="${r}" fill="${T.teal}" data-lcs-gen-disc="${g.rank}"/>` +
      `<text x="${S(cx)}" y="${discTop + r + 0.5}" font-family="${F.display}, cursive" font-size="20" font-weight="700" fill="${T.white}" text-anchor="middle" dominant-baseline="central" data-lcs-gen-disc-text="${g.rank}">${g.rank}</text>`);
  });
  return { html: `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${H}" viewBox="0 0 ${w} ${H}" role="img" aria-label="" style="display:block;margin:0 auto;overflow:visible" data-lcs-genrail="">${parts.join('')}</svg>`, height: H };
}

/**
 * F1 genPlacard({ wordKey, text, answer, gen, w, h, chipW, px, boxW, boxH })
 * A placard: the kin word (Nunito 800 18, may wrap to two lines at a space)
 * beside an EMPTY dashed numeral box (components-b3 blankNumeralBox).
 * Stamps [data-lcs-genword="<wordKey>"] [data-lcs-gen="<gen>"], the text
 * [data-lcs-gen-chip], the box [data-lcs-genbox] + data-lcs-answer (the rank).
 */
function genPlacard({ wordKey, text, answer, gen, w = 205, h = 52, px = 18, boxW = 48, boxH = 44 }) {
  const chipW = w - 5 - 8 - 8 - boxW;   // border 2.5 x 2 + pad 4 x 2 + gap 8
  return `<div class="fam-placard" data-lcs-genword="${esc(wordKey)}" data-lcs-gen="${gen}" style="box-sizing:border-box;display:flex;align-items:center;gap:8px;width:${w}px;height:${h === 'fill' ? '100%' : h + 'px'};padding:0 4px;` +
    `background:${T.white};border:2.5px solid ${T.teal};border-radius:14px">` +
    `<span data-lcs-gen-chip="" style="flex:0 0 ${chipW}px;width:${chipW}px;text-align:center;font-family:${F.body},sans-serif;font-weight:800;font-size:${px}px;line-height:1.1;color:${T.ink};overflow-wrap:normal;word-break:normal;hyphens:none">${esc(text)}</span>` +
    blankNumeralBox({ w: boxW, h: boxH, answer: String(answer), attrs: 'data-lcs-genbox=""' }) + `</div>`;
}

/**
 * F2 traceRows({ rows:[{badge, text}], laneW, trioH, glyphH, gap })
 * Per row: a number disc + a stacked strokeWordLane (one dashed hollow trio + one
 * EMPTY trio: trace once, then write it alone). Stamps [data-lcs-trace-row]
 * [data-lcs-badge]; the lane <svg> carries data-lcs-text (trace-path.js).
 */
function traceRows({ rows, laneW = 321, trioH = 58, glyphH = 40, gap = 16, gapMax = 16 }) {
  const sp = `<div style="flex:1 1 ${gap}px;min-height:${gap}px;max-height:${gapMax}px"></div>`;
  return `<div class="fam-trace" data-lcs-trace-rows="" style="display:flex;flex-direction:column;height:100%;justify-content:flex-start">` + rows.map((r) => {
    const lane = strokeWordLane({ text: r.text, w: laneW, h: trioH, glyphH, reps: 1, stack: true, modelless: true, emptyLast: true });
    return `<div class="fam-trace-row" data-lcs-trace-row="" data-lcs-badge="${r.badge}" style="display:flex;align-items:flex-start;gap:8px">` +
      `<div style="flex:0 0 30px;margin-top:${(trioH - 30) / 2}px">` + numberDisc({ n: r.badge, d: 30, attrs: 'data-lcs-row-disc=""' }) + `</div>` + `<div style="flex:0 0 ${laneW}px">${lane.svg}</div></div>`;
  }).join(sp) + `</div>`;
}

/**
 * F3 nameBox({ w, h, answer, path }) — an EMPTY name plate: a .ws-blankbox-styled
 * span holding a school-line writing row; the answer (the name) only in
 * data-lcs-answer. givenPlate({ text, w, h }) — a SOLID name plate (a printed,
 * given name). Both are placed absolutely by the caller.
 */
function nameBox({ w = 130, h = 44, answer, attrs = '' }) {
  const row = writingRow({ w: w - 12, h: h - 8, glyphH: 22 });
  return `<span class="ws-blankbox" ${attrs} data-lcs-answer="${esc(answer)}" data-lcs-namebox="" style="box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:${w}px;height:${h}px">${row.svg}</span>`;
}
function givenPlate({ text, w = 130, h = 44, attrs = '' }) {
  return `<span class="ws-tile ws-tile--word" data-lcs-plate="" data-lcs-given="" ${attrs} style="box-sizing:border-box;width:${w}px;height:${h}px;font-size:18px;padding:0 8px;justify-content:center;border-color:${T.teal}">${esc(text)}</span>`;
}

/** F3 clueList({ clues:[{path, text}] }) — numbered one-line clues (Nunito 700 18, teal numerals) */
function clueList({ clues, rowH = 34, rowMax = 34 }) {
  return `<ol class="fam-clues" data-lcs-clues="" style="list-style:none;margin:0 auto;padding:0;width:639px;height:100%;display:flex;flex-direction:column">` + clues.map((c, i) =>
    `<li data-lcs-clue-path="${esc(c.path)}" style="display:flex;align-items:center;gap:10px;flex:1 1 ${rowH}px;min-height:${rowH}px;max-height:${rowMax}px;white-space:nowrap">` +
    `<span style="flex:0 0 22px;font-family:${F.display},cursive;font-weight:700;font-size:20px;color:${T.teal};text-align:right">${i + 1}</span>` +
    `<span data-lcs-clue-text="" style="font-family:${F.body},sans-serif;font-weight:700;font-size:18px;color:${T.ink}">${esc(c.text)}</span></li>`).join('') + `</ol>`;
}

/**
 * F4 riddleRow({ n, before, after, path, answer, slotW, slotH })
 * A numbered riddle line: the text with the gap rendered INLINE as a dashed
 * coral writing slot. The slot stamps data-lcs-riddle-path + data-lcs-answer
 * (the wordKey); nothing prints the answer.
 */
function riddleRow({ n, before, after, path, answer, slotW = 150, slotH = 36, rowH = 52, rowMax = 52 }) {
  const row = writingRow({ w: slotW - 10, h: slotH - 6, glyphH: 22 });
  const slot = `<span class="fam-slot" data-lcs-riddle-path="${esc(path)}" data-lcs-answer="${esc(answer)}" style="box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;width:${slotW}px;height:${slotH}px;` +
    `margin:0 4px;vertical-align:-12px;background:${T.white};border:2.5px dashed ${T.coral};border-radius:10px">${row.svg}</span>`;
  return `<div class="fam-riddle" data-lcs-riddle="${n}" style="display:flex;align-items:center;gap:10px;flex:1 1 ${rowH}px;min-height:${rowH}px;max-height:${rowMax}px">` +
    numberDisc({ n, d: 26, px: 17 }) +
    `<p data-lcs-riddle-text="" style="margin:0;font-family:${F.body},sans-serif;font-weight:700;font-size:18px;line-height:26px;color:${T.ink}">${esc(before)}${slot}${esc(after)}</p></div>`;
}

/** F4 egoCard({ person, name, w, h }) — the ego's picture frame (coral, star) + name plate, no tree */
function egoCard({ person, name, w = 80, h = 96 }) {
  const pad = 4, W = w + 2 * pad + 10, H = h + 2 * pad;
  const frame = pictureFrame({ person, box: { x: pad, y: pad, w, h }, ego: true });
  return `<div class="fam-egocard" data-lcs-stage="" data-lcs-egocard="" style="position:relative;flex:0 0 ${W}px;width:${W}px;height:${H + 13}px">` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="" style="display:block;overflow:visible" data-lcs-stage-svg="">${frame}</svg>` +
    `<div style="position:absolute;left:${pad + w / 2}px;top:${pad + h - 13}px;transform:translateX(-50%);display:flex" data-lcs-ego-plate="">${namePlate({ text: name, px: 18, h: 26 })}</div></div>`;
}

/** F5 templateTree({ meWord, w, shelf }) — primitives/frame-tree.js: the tree and the shelf as two stage blocks */
function templateTree({ meWord, w = 675, shelf = 4 }) {
  const t = frameTree({ meWord, w, shelf });
  const wrap = (svg, h, tag) => `<div class="fam-template" data-lcs-stage="" ${tag} style="position:relative;width:${w}px;height:${h}px;margin:0 auto">${svg}</div>`;
  return { treeHtml: wrap(t.treeSvg, t.treeH, 'data-lcs-template-tree=""'), shelfHtml: wrap(t.shelfSvg, t.shelfH, 'data-lcs-template-shelf=""'), treeH: t.treeH, shelfH: t.shelfH, tree: t };
}

module.exports = { pictureFrame, familyStage, kinChip, kinWordBlock, genRail, genPlacard, traceRows, nameBox, famGivenPlate: givenPlate, clueList, riddleRow, famEgoCard: egoCard, templateTree, famNumberDisc: numberDisc };
