#!/usr/bin/env node
/* Build the per-page input pack for one part, split into agent-sized slices.
 *
 * An author cannot write a page that differs from its siblings unless it can SEE
 * its siblings, and cannot write something true unless it can see what is really
 * on the sheet. Both are inputs here, not hopes.
 *
 * The facts matter more than they look. Part 001's pages currently claim things
 * the worksheets do not contain — a page whose words are POMFRITTER, VANDMELON
 * and GRILL says it hides "the names of the flags, stars and drums"; another
 * whose words are TRYLLESTAV, PARAPLY and TEGNEBOG says "hats, belts and
 * scarves". Those noun triplets are generic theme filler that contradicts the
 * actual sheet. Handing the author the real word list is what stops that.
 *
 * Usage: node scripts/seo-per-page/build-part-brief.js --part=001 [--slice=10]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PARTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'parts');
const FACTS_DIR = path.join(ROOT, 'docs', 'seo-per-page', 'deck-facts');
const LANDING_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing');
const POOL_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing', 'framing-pools');

function loadJSON(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

function build(partId, sliceSize, outDir) {
  const part = loadJSON(path.join(PARTS_DIR, `${partId}.json`));
  if (!part) throw new Error(`no part ${partId}`);
  const locale = part.locale;

  const landings = loadJSON(path.join(LANDING_DIR, `${locale}.json`), { landings: [] }).landings;
  const bySlug = new Map(landings.map((l) => [l.slug, l]));
  const facts = new Map((loadJSON(path.join(FACTS_DIR, `${locale}.json`), { decks: [] }).decks || [])
    .map((d) => [d.slug, d]));
  const pools = loadJSON(path.join(POOL_DIR, `${locale}.json`), { pools: {} }).pools || {};

  // every sibling title currently in the class, so the author can see the formula
  // it must break out of AND avoid colliding with pages outside this part
  const classSet = new Set(part.classes);
  const siblingTitles = [];
  for (const l of landings) {
    const c = l.coordinate || {};
    const k = `${c.type || '?'}::${c.mode == null ? 'null' : c.mode}`;
    if (classSet.has(k)) siblingTitles.push({ slug: l.slug, title: l.title, h1: l.h1 });
  }

  const pages = part.pages.map((g) => {
    const l = bySlug.get(g.slug) || {};
    const f = facts.get(g.deck) || {};
    const pool = (pools[g.type] && pools[g.type].framings) || [];
    return {
      slug: g.slug,
      coordinate: { type: g.type, mode: g.mode, theme: g.theme, level: g.level },
      // fixed page furniture the author must stay consistent with (rendered by the route)
      eyebrow: l.eyebrow || null,
      strand: l.strand || null,
      standard: l.standard || null,
      current: {
        title: l.title || null,
        h1: l.h1 || null,
        metaDescription: l.metaDescription || null,
        p1: l.p1 || null,
        p2: l.p2 || null,
        p3: l.p3 || null,
      },
      // WHAT IS REALLY ON THE SHEET — the only source of concrete claims
      facts: {
        exercises: f.n || 0,
        words: (f.words || []).slice(0, 20),
        nouns: (f.nouns || []).slice(0, 20),
        numbers: (f.nums || []).slice(0, 20),
        grid: f.grid || null,
        blackAndWhite: !!f.grayscale,
      },
      // demand signal only — never a formula to fill in
      demandCandidates: pool.slice(0, 25),
    };
  });

  fs.mkdirSync(outDir, { recursive: true });
  const slices = [];
  for (let i = 0; i < pages.length; i += sliceSize) {
    const idx = slices.length + 1;
    const file = path.join(outDir, `part-${partId}-slice-${String(idx).padStart(2, '0')}.json`);
    fs.writeFileSync(file, JSON.stringify({
      part: part.part,
      locale,
      slice: idx,
      classes: part.classes,
      splitOf: part.splitOf,
      pages: pages.slice(i, i + sliceSize),
      siblingTitlesInClass: siblingTitles.slice(0, 400),
    }, null, 1));
    slices.push({ file, count: Math.min(sliceSize, pages.length - i) });
  }
  return { locale, total: pages.length, slices, classes: part.classes };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const partId = (args.find((a) => a.startsWith('--part=')) || '').split('=')[1] || '001';
  const sliceSize = Number((args.find((a) => a.startsWith('--slice=')) || '').split('=')[1] || 10);
  const outDir = (args.find((a) => a.startsWith('--out=')) || '').split('=')[1]
    || path.join(ROOT, '.seo-briefs');
  const r = build(partId, sliceSize, outDir);
  console.log(`part ${partId} [${r.locale}] ${r.total} pages -> ${r.slices.length} slices in ${outDir}`);
  console.log(`classes: ${r.classes.join(', ')}`);
}

module.exports = { build };
