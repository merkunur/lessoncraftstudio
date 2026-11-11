/**
 * What is published in one language, for the assemblers of units and sub packs (Daily Teaching System, Parts 3–5):
 * the pages of every worksheet type per level, in copy order, read from the catalogue table
 * (out/teaching-graph/decks.tsv, written by scripts/teaching-graph/pull-decks.sh).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const RUNGS = ['easy', 'core', 'hard'];
/** the type code a page's address carries: the last code-shaped part (…-g1116, …-g1116-4, …-k393-10-forestrabbit) */
const codeOfSlug = (slug) => { const all = slug.match(/-(?:k|g[0-9])[0-9]{3}(?=-|$)/g); return all ? all[all.length - 1].slice(1) : null; };
const typeIdOf = (code) => { const m = /^(k|g\d)(\d{3})$/.exec(code); return m ? m[1].toUpperCase() + '-' + m[2] : null; };
/** the copy number an address ends in (…-g1116 is copy 1, …-g1116-4 is copy 4) */
const copyOf = (slug) => { const m = /-(\d{1,3})$/.exec(slug); return m ? Number(m[1]) : 1; };

/** type id → { easy: [], core: [], hard: [] } of { slug, screen, base }; the indexable page first, then by copy */
function pagesOf(loc, decksText) {
  const tsv = decksText != null ? decksText : fs.readFileSync(path.join(REPO, 'out', 'teaching-graph', 'decks.tsv'), 'utf8');
  const pages = new Map();
  for (const line of tsv.split('\n')) {
    if (!line.startsWith(loc + '\t')) continue;
    const [, slug, , mode, idx, screen] = line.split('\t');
    const code = codeOfSlug(slug);
    const id = code ? typeIdOf(code) : null;
    const rung = mode === '-' ? 'core' : RUNGS.includes(mode) ? mode : null;
    if (!id || !rung) continue;
    const t = pages.get(id) || { easy: [], core: [], hard: [] };
    t[rung].push({ slug, screen: screen === '1', base: idx === 't' });
    pages.set(id, t);
  }
  for (const t of pages.values()) for (const r of RUNGS) t[r].sort((a, b) => (b.base - a.base) || (copyOf(a.slug) - copyOf(b.slug)) || a.slug.localeCompare(b.slug));
  return pages;
}
module.exports = { pagesOf, RUNGS, REPO };
