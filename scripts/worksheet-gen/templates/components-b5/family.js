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
 * FACE components named by §2 (genRail · genPlacard · traceRows · nameBox ·
 * clueList · riddleRow · templateTree) and primitives/frame-tree.js (F5) are
 * Phase 2 (the faces) and are NOT built here yet — recorded in
 * docs/worksheet-gen/b5-designs/_work/K-370-build.md.
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

function familyStage({ persons, frame, badges, egoId, egoName, skin = 'tree', w = 675 }) {
  const tree = familyTree({
    persons, frame, badges, egoId, plates: true, skin, w,
    nodeSvg: (person, box) => pictureFrame({ person, box, ego: person.id === egoId }),
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${tree.height}" viewBox="0 0 ${w} ${tree.height}" role="img" aria-label="" style="display:block;overflow:visible" data-lcs-stage-svg="">${tree.svg}</svg>`;
  const plate = tree.plate ? `<div style="position:absolute;left:${S(tree.plate.cx)}px;top:${S(tree.plate.y - 13)}px;transform:translateX(-50%);display:flex" data-lcs-ego-plate="">` +
    namePlate({ text: egoName, px: 18, h: 26 }) + `</div>` : '';
  const html = `<div class="fam-stage" data-lcs-stage="" style="position:relative;width:${w}px;height:${tree.height}px;margin:0 auto">${svg}${plate}</div>`;
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

module.exports = { pictureFrame, familyStage, kinChip, kinWordBlock };
