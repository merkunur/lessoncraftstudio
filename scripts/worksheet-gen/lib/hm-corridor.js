/**
 * hm-corridor.js — paint a maze graph as the HAND-DRAWN corridors of the b8 Handmade Mazes family.
 *
 * The look of the operator's samples: a soft road / water channel / tunnel with a slightly darker edge of its own
 * hue, curving between islands. Two strokes per chain, ALL outlines before ALL fills, so junctions merge into one
 * clean road with no seam (a fill drawn over a neighbour's outline erases the outline exactly where they join).
 *
 *   corridorSvg({ chains, W, fill, edge, outline = 3.5, id }) → '<g …>…</g>'   (scene-frame coordinates)
 *
 * The fill stroke is stamped data-lcs-hm-fill so the browser oracle can read the corridor colour from the page.
 */
'use strict';

function corridorSvg({ chains, W, fill, edge, outline = 3.5, id = 'hm' }) {
  if (!Array.isArray(chains) || !chains.length) throw new Error('hm-corridor: no chains');
  if (!(W > 0)) throw new Error('hm-corridor: corridor width W must be > 0');
  const ow = W + 2 * outline;
  const outl = chains.map((c) => `<path d="${c.d}" stroke="${edge}" stroke-width="${ow}"/>`).join('');
  const fills = chains.map((c) => `<path d="${c.d}" stroke="${fill}" stroke-width="${W}" data-lcs-hm-fill="1"/>`).join('');
  return `<g id="${id}-corridors" fill="none" stroke-linecap="round" stroke-linejoin="round">${outl}${fills}</g>`;
}

/** the KEY's route: one smooth stroke through the route's own curve samples (S oriented low→high node id) */
function routePath(route, S, ek) {
  const pts = [];
  for (let i = 0; i < route.length - 1; i++) {
    const a = route[i], b = route[i + 1]; const k = ek(a, b); let s = S[k];
    if (!s) throw new Error('hm-corridor: route edge ' + k + ' has no samples');
    if (a > b) s = s.slice().reverse();
    for (let j = (pts.length ? 1 : 0); j < s.length; j++) pts.push(s[j]);
  }
  return 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
}

module.exports = { corridorSvg, routePath };
