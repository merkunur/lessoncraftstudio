/** G2-242 — Count the Faces (geometry-tasks factory, mode solid-counts) */
'use strict';
const { makeGeometryType, solidSvg } = require('../_shared/geometry-tasks.js');
const { SHAPES_3D } = require('../../lib/shape-data.js');
const type = makeGeometryType({
  id: 'G2-242', slug: '3d-shapes-faces', mode: 'solid-counts', facet: 'faces',
  i18n: { en: { title: 'Count the Faces', instruction: 'Write how many flat faces each solid has.' } },
});

/**
 * THE ITEM BANK of the unit checks (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"), 2026-11-19 (review
 * en-1119-math of g2-shapes-solids-symmetry: "the lesson is faces, edges, and vertices; the check asks faces only"). In
 * English a card is one solid of the lesson's pages, drawn see-through as they are (hidden edges dashed), under the
 * question it asks: how many flat faces, edges or corners. The solids are the page's own (cube, box, square pyramid,
 * cylinder); no question whose answer is 0 (counting never includes 0: the cylinder's corners, the sphere), and no edges
 * of the cylinder (whether its two rims are edges is taught both ways). The edges give form B a partner of another
 * solid for form A's corners (8 corners of a cube, 8 edges of a pyramid): with corners alone the pyramid's 5 had none. The other
 * languages keep the faces page as it is until the questions are written in them.
 */
type.checkPage = function checkPage(args, ctx) {
  if (String(args.locale || 'en').slice(0, 2) !== 'en') return this.build(args, ctx);
  const { checkGrid } = require('../../lib/check-page.js');
  const { answerBox } = require('../../templates/components.js');
  const NAME = { cube: 'cube', rectangular_box: 'box', pyramid: 'pyramid', cylinder: 'cylinder' };
  const ASK = { faces: (n) => `How many flat faces does the ${n} have?`, edges: (n) => `How many edges does the ${n} have?`, vertices: (n) => `How many corners does the ${n} have?` };
  const cards = [];
  for (const k of ctx.rng.shuffle(Object.keys(NAME))) for (const facet of ['faces', 'edges', 'vertices']) {
    const ans = SHAPES_3D[k][facet];
    if (!ans || (facet === 'edges' && SHAPES_3D[k].curved)) continue;
    cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:10px;padding:6px 10px" data-lcs-shape="${k}" data-lcs-facet="${facet}">` +
      `<p style="margin:0;font-family:'Nunito';font-weight:800;font-size:17px;color:#3A3530">${ASK[facet](NAME[k])}</p>` +
      `<div style="display:flex;align-items:center;justify-content:center;gap:30px">${solidSvg(k, 130)}${answerBox({ w: 64, h: 52, answer: ans })}</div></div>`);
  }
  return { bodyHtml: checkGrid(cards, { cols: 2 }), meta: {} };
};

module.exports = type;
