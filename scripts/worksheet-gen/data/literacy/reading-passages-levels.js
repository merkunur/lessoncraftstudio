/**
 * Reading Comprehension Level Set (2026-09-30): the per-locale level data for G2-254 and its faces G2-269..273,
 * authored by native panels (never translated) in data/literacy/rc-levels/<loc>.json:
 *   published[<story id>] = { sentences, l1: [3 literal + sentence hint], l3: { mc: [2 inference], write } }
 *   pools[<page id>]      = new stories { id, title, pageTitle?, text, sentences, core: [3], l1, l3 }
 *   levelInstr, sentenceChip, screen
 * The published pages never read this file (their path is untouched); only the Level Set copies do.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { READING_PASSAGES } = require('./reading-passages.js');

const DIR = path.join(__dirname, 'rc-levels');
const cache = {};
function levelData(loc) {
  if (!(loc in cache)) {
    const p = path.join(DIR, loc + '.json');
    cache[loc] = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null;
  }
  return cache[loc];
}

/** The published story index of each page, and the unpublished stories that join the base page's pool. */
const PUBLISHED_IDX = { 'G2-254': 1, 'G2-269': 3, 'G2-270': 4, 'G2-271': 5, 'G2-272': 6, 'G2-273': 7 };
const EXTRA_IDX = { 'G2-254': [0, 2] };

/**
 * The pool of a page: [the published story, (the base page's two unpublished stories), …the new stories], each as
 * { id, title, pageTitle, text, sentences, core, l1, l3, published }. Throws when the locale has no level data.
 */
function poolOf(pageId, loc) {
  const L = levelData(loc);
  if (!L) throw new Error(`reading-comprehension: no level data for ${loc}`);
  const P = READING_PASSAGES[loc];
  const fromPublished = (idx, published) => {
    const p = P[idx];
    const d = L.published && L.published[p.id];
    if (!d) throw new Error(`reading-comprehension: ${loc} has no level sets for published story ${p.id}`);
    return { id: p.id, title: p.title, pageTitle: null, text: p.text, sentences: d.sentences, core: p.questions, l1: d.l1, l3: d.l3, published };
  };
  const out = [fromPublished(PUBLISHED_IDX[pageId], true), ...(EXTRA_IDX[pageId] || []).map((i) => fromPublished(i, false))];
  for (const s of (L.pools && L.pools[pageId]) || []) out.push({ ...s, published: false });
  return out;
}

/** Every story of a locale by id (for the oracle). */
function storyById(loc, id) {
  for (const pageId of Object.keys(PUBLISHED_IDX)) {
    const s = poolOf(pageId, loc).find((x) => x.id === id);
    if (s) return s;
  }
  return null;
}

module.exports = { levelData, poolOf, storyById, PUBLISHED_IDX };
