/**
 * Which end a copy asks, for the comparison templates whose copies ask the two ends of their title in turn
 * (2026-11-17, the Position Words model: "Big and Small" asked BIGGEST on every new version). The lines live in
 * data/ask-lines.json; order[0] is the end the published pages ask, and its line is the registered instruction.
 *
 *   askFor(id, locale, ctx) → null for a template without an entry, else
 *     { ask, published, other, line, attr, strings }
 *       ask        the end this copy asks: order[(copy − 1) mod order.length] — copy 1 asks the published end
 *       other      true when the copy asks another end than the published one
 *       attr       ' data-lcs-ask="<end>"' on a copy that asks another end, '' otherwise (a published-end page stays
 *                  byte for byte what it was; no attribute = the published end)
 *       strings    the copy's own words for a copy that asks another end ({ instruction, screenInstruction? }), else null
 *   otherLines(id, ask) → every language's line of every OTHER end (a page asking `ask` must not print one of them)
 */
'use strict';
const ASK = require('../data/ask-lines.json');

function askFor(id, locale, ctx) {
  const e = ASK[id];
  if (!e) return null;
  const v = Math.max(1, Math.floor(Number(ctx && ctx.variant) || 1));
  const ask = e.order[(v - 1) % e.order.length];
  const loc = String(locale || 'en').slice(0, 2);
  const lines = e[loc] || {};
  const line = lines[ask];
  if (!line) throw new Error(`${id}: no instruction for "${ask}" in ${loc} (data/ask-lines.json)`);
  const other = ask !== e.order[0];
  const screen = e.screen && e.screen[loc] && e.screen[loc][ask];
  return {
    ask, published: e.order[0], other, line,
    attr: other ? ` data-lcs-ask="${ask}"` : '',
    strings: other ? { instruction: line, ...(screen ? { screenInstruction: screen } : {}) } : null,
  };
}

function otherLines(id, ask) {
  const e = ASK[id];
  if (!e) return [];
  const out = [];
  for (const [k, v] of Object.entries(e)) {
    if (k === 'order' || k === 'screen' || !v || typeof v !== 'object') continue;
    for (const end of e.order) if (end !== ask && v[end]) out.push(v[end]);
  }
  return out;
}

module.exports = { askFor, otherLines, ASK };
