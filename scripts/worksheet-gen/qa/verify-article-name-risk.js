#!/usr/bin/env node
/**
 * verify-article-name-risk.js — a picture-only article page (K-288 levels 2-3, K-306, K-307) never shows a picture a K
 * child commonly names with another word that takes another article (data/b2/article-name-risk.js; 2026-11-03 final
 * phase + native review: "a deer" for an antelope is right for the child and wrong in the key).
 *
 *   node qa/verify-article-name-risk.js [--locales=en,de] [--themes=6]
 *
 * Builds every colour theme (or the first N) × levels 2-3 × copies 1-2 in every locale with a list, and asserts no card
 * carries a listed vocab key. Non-vacuity: pages built and cards read must be > 0. Poison: with the list emptied, the
 * same builds must show listed nouns (the filter is what keeps them out). A level-1 page (the word printed) is not
 * checked here: the word decides there. Exit 1 on any failure.
 */
'use strict';
const path = require('path');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
const WG = path.resolve(__dirname, '..');
const NR = require(path.join(WG, 'data/b2/article-name-risk.js'));
const FULL = JSON.parse(JSON.stringify(NR.NAME_RISK));
const { makeRng, instanceSeed } = require(path.join(WG, 'lib/rng.js'));
const M = require(path.join(WG, 'image-cache/resolve.js')).manifest();
let themes = Object.keys(M.themes).filter((t) => !M.themes[t].bw).sort();
if (args.themes) themes = themes.slice(0, +args.themes);
const types = ['K-288-articles', 'K-306-articles-four-pictures', 'K-307-articles-eight-pictures'].map((f) => require(path.join(WG, 'types/k', f + '.js')));
const locs = String(args.locales || Object.keys(FULL).join(',')).split(',');
const fails = [];
function sweep(levels, report) {
  let pages = 0, cards = 0, risky = 0;
  for (const t of types) for (const loc of locs) for (const theme of themes) for (const d of levels) for (const v of [1, 2]) {
    if (!t.difficulty[d]) continue;
    let b; try { b = t.build({ theme, difficulty: d, locale: loc, unit: null }, { rng: makeRng(instanceSeed({ typeId: t.id, theme, difficulty: d, seedEpoch: 1, variant: v })), variant: v }); } catch (e) { continue; }
    pages++;
    for (const m of b.bodyHtml.matchAll(/data-lcs-vocab="([^"]+)"/g)) { cards++; if (FULL[loc] && FULL[loc][m[1]] != null) { risky++; if (report && fails.length < 20) fails.push(`${t.id} ${loc} ${theme} L${d} v${v}: "${m[1]}" (a child says ${FULL[loc][m[1]]})`); } }
  }
  return { pages, cards, risky };
}
const r = sweep([2, 3], true);
console.log(`picture-only pages: ${r.pages}, cards ${r.cards}, risk nouns ${r.risky}`);
if (!r.pages || !r.cards) fails.push('non-vacuity: no picture-only page was read');
// poison: the list emptied — the risk nouns come back
for (const l of Object.keys(NR.NAME_RISK)) NR.NAME_RISK[l] = {};
const p = sweep([2, 3], false);
for (const l of Object.keys(FULL)) NR.NAME_RISK[l] = FULL[l];
console.log(`poison (list emptied): ${p.risky} risk nouns ${p.risky ? '— caught' : '— NOT caught (the gate is blind)'}`);
if (!p.risky) fails.push('poison: emptying the list brought no risk noun back');
for (const f of fails) console.log('FAIL ' + f);
console.log(fails.length ? `verify-article-name-risk: ${fails.length} failures` : 'verify-article-name-risk: PASS');
process.exit(fails.length ? 1 : 0);
