/**
 * picture-distinct.js — pictures a child tells apart at a glance (2026-10-08, Graphs and Data).
 *   GRAPH_THEMES          the themes whose pictures were read for look-alikes (data/graph-lookalikes.js)
 *   lookalike(theme,a,b)  true when a and b are in one look-alike group of the theme
 *   distinctPick(theme, nouns, n, rng)
 *                         the first n of `nouns` (in order) keeping no two look-alikes: a noun that looks like one
 *                         already kept is replaced by the next candidate from `rng`'s shuffle of the rest — so a set
 *                         that was already distinct comes back unchanged (the published pages keep their pictures)
 */
'use strict';
const LOOK = require('../data/graph-lookalikes.js');
const GRAPH_THEMES = Object.keys(LOOK).filter((k) => !k.startsWith('_'));
const UNCLEAR = LOOK._unclear || {};
const unclear = (theme, n) => (UNCLEAR[theme] || []).includes(n);

function lookalike(theme, a, b) {
  const groups = LOOK[theme];
  if (!groups || theme.startsWith('_')) throw new Error('picture-distinct: theme not read for look-alikes: ' + theme);
  return a !== b && groups.some((g) => g.includes(a) && g.includes(b));
}

/** nouns: [{noun,…}] in the order the page drew them; pool: every candidate of the theme; rng: a SEPARATE stream */
function distinctPick(theme, nouns, pool, rng) {
  const kept = [];
  for (const n of nouns) if (!unclear(theme, n.noun) && !kept.some((k) => lookalike(theme, k.noun, n.noun))) kept.push(n);
  if (kept.length === nouns.length) return nouns;
  const rest = rng.shuffle(pool.filter((p) => !nouns.some((n) => n.noun === p.noun)));
  for (const p of rest) {
    if (kept.length === nouns.length) break;
    if (!unclear(theme, p.noun) && !kept.some((k) => lookalike(theme, k.noun, p.noun))) kept.push(p);
  }
  if (kept.length < nouns.length) throw new Error(`picture-distinct: ${theme} has no ${nouns.length} pictures that look different`);
  // keep the page's own order for the pictures it already had; the replacements take the dropped ones' places
  const out = [];
  const repl = kept.filter((k) => !nouns.includes(k));
  for (const n of nouns) out.push(kept.includes(n) ? n : repl.shift());
  return out;
}

module.exports = { GRAPH_THEMES, lookalike, unclear, distinctPick };
