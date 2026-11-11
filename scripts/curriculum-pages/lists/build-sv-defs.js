#!/usr/bin/env node
/**
 * The Swedish curriculum page, written into frontend/content/curriculum-pages/defs/sv.json (Daily Teaching System,
 * Part 6.3). Lgr22 states its centralt innehåll once for årskurs 1–3 and has no codes: the page lists the
 * kunskapsområden of one kursplan with the lessons of the Swedish units under each (scripts/curriculum-pages/
 * assemble.js, partsPage). One page per kursplan where the Swedish units teach at least 15 of its points of
 * centralt innehåll for årskurs 1–3 (measured 2026-11-12: matematik 16 of 22; svenska 10 of 22, no page).
 * The kriterier för bedömning (end of årskurs 3) are not a part of the page: they describe what is assessed, and
 * a lesson is not matched to them.
 *
 * The name follows what teachers type (docs/SEO/daily-system-demand/report.sv.md: "centralt innehåll matematik
 * åk 1-3", "Lgr22 matematik årskurs 1–3"). No sentence of Lgr22 is quoted anywhere (CLAUDE.md §20.9).
 *
 *   node scripts/curriculum-pages/lists/build-sv-defs.js   (rewrites defs/sv.json; a live page keeps its status)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(REPO, 'frontend', 'content', 'curriculum-pages', 'defs', 'sv.json');
const PAGES = [
  { id: 'lgr22-matematik-13', registry: 'sv', framework: 'lgr22-matematik', subject: 'math', grades: ['1-3'], gradeLabel: 'årskurs 1–3', partsTitle: 'Kunskapsområden',
    slug: 'centralt-innehall-matematik-ak-1-3',
    title: 'Centralt innehåll i matematik åk 1–3: översikt med lektioner',
    metaTitle: 'Centralt innehåll matematik åk 1–3 (Lgr22): översikt med lektioner',
    metaDescription: 'Kunskapsområdena i det centrala innehållet i matematik för årskurs 1–3 enligt Lgr22, vart och ett med våra lektioner och arbetsblad och antalet punkter som lektionerna täcker.' },
];
const before = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')).pages : [];
const REVIEW = path.join(__dirname, '..', 'reviews', 'sv.review.json');
const reviewed = fs.existsSync(REVIEW) ? JSON.parse(fs.readFileSync(REVIEW, 'utf8')).pages || {} : {};
const pages = PAGES.map((p) => Object.assign({ id: p.id, status: (before.find((x) => x.id === p.id) || {}).status || 'pilot' }, p, reviewed[p.id] || {}));
for (const p of pages) {
  if (p.metaTitle.length > 70) throw new Error(p.id + ': metaTitle has ' + p.metaTitle.length + ' characters');
  if (p.metaDescription.length < 110 || p.metaDescription.length > 175) throw new Error(p.id + ': the meta description has ' + p.metaDescription.length + ' characters');
}
const comment = 'The curriculum pages of this language: one kursplan each. WRITTEN by scripts/curriculum-pages/lists/build-sv-defs.js (edit the list there). Everything on a page is filled by scripts/curriculum-pages/assemble.js from the curriculum registry, the units and the content graph.';
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ $comment: comment, pages }, null, 1) + '\n');
console.log('sv: ' + pages.length + ' page(s) → ' + path.relative(REPO, OUT));
