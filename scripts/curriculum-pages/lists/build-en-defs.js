#!/usr/bin/env node
/**
 * The English (US) curriculum pages, written into frontend/content/curriculum-pages/defs/en.json (Daily Teaching
 * System, Part 6.1). One page per framework, grade and subject where the site's content teaches at least 15 of the
 * objectives (measured 2026-11-11, docs/daily-teaching-system/PART-6-DESIGN.md): Common Core Math K-3, Common Core
 * ELA K-2, TEKS Math K-3, TEKS ELAR K-2. Names follow what teachers type (docs/SEO/daily-system-demand/report.en.md:
 * "common core kindergarten", "kindergarten standards checklist", "common core 2nd grade math", "teks kindergarten",
 * "teks first grade math").
 *
 *   node scripts/curriculum-pages/lists/build-en-defs.js   (rewrites defs/en.json; the status of a page that is
 *                                                           already live in the file is kept)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(REPO, 'frontend', 'content', 'curriculum-pages', 'defs', 'en.json');
const GRADES = {
  K: { id: 'k', word: 'Kindergarten', short: 'Kindergarten', slug: 'kindergarten' },
  1: { id: 'g1', word: 'First Grade', short: '1st Grade', slug: '1st-grade' },
  2: { id: 'g2', word: 'Second Grade', short: '2nd Grade', slug: '2nd-grade' },
  3: { id: 'g3', word: 'Third Grade', short: '3rd Grade', slug: '3rd-grade' },
};
// [registry, framework, subject, grades, id part, how the page is named]
const SETS = [
  ['en', 'ccss-math', 'math', ['K', '1', '2', '3'], 'ccss-math', (G) => ({
    slug: 'common-core-' + G.slug + '-math-standards', title: 'Common Core ' + G.word + ' Math Standards: Checklist with Lessons',
    metaTitle: 'Common Core ' + G.short + ' Math Standards: Checklist with Lessons',
    metaDescription: G.word + ' math standards checklist: every Common Core code of the grade with the lessons, worksheets, and activities that teach it, and the codes not covered yet.',
  })],
  ['en', 'ccss-ela', 'ela', ['K', '1', '2'], 'ccss-ela', (G) => ({
    slug: 'common-core-' + G.slug + '-ela-standards', title: 'Common Core ' + G.word + ' ELA Standards: Checklist with Lessons',
    metaTitle: 'Common Core ' + G.short + ' ELA Standards: Checklist with Lessons',
    metaDescription: G.word + ' ELA standards checklist: the Common Core reading, writing, and language codes with the lessons and worksheets that teach them, and the codes not covered yet.',
  })],
  ['en-tx', 'teks-math', 'math', ['K', '1', '2', '3'], 'teks-math', (G) => ({
    slug: 'teks-' + G.slug + '-math', title: G.word + ' Math TEKS: Checklist with Lessons',
    metaTitle: G.short + ' Math TEKS: Checklist with Lessons and Worksheets',
    metaDescription: G.word + ' math TEKS checklist for Texas: every student expectation of the grade with the lessons, worksheets, and activities that teach it, and the ones not covered yet.',
  })],
  ['en-tx', 'teks-elar', 'ela', ['K', '1', '2'], 'teks-elar', (G) => ({
    slug: 'teks-' + G.slug + '-elar', title: G.word + ' ELAR TEKS: Checklist with Lessons',
    metaTitle: G.short + ' ELAR TEKS: Checklist with Lessons and Worksheets',
    metaDescription: G.word + ' ELAR TEKS checklist for Texas: the reading and language arts expectations with the lessons and worksheets that teach them, and the ones not covered yet.',
  })],
];
const before = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')).pages : [];
const pages = [];
for (const [registry, framework, subject, grades, part, name] of SETS) for (const grade of grades) {
  const G = GRADES[grade], id = part + '-' + G.id, n = name(G);
  pages.push(Object.assign({ id, status: (before.find((x) => x.id === id) || {}).status || 'pilot', registry, framework, grade, subject }, n));
}
for (const p of pages) { if (p.metaTitle.length > 70) throw new Error(p.id + ': metaTitle has ' + p.metaTitle.length + ' characters'); if (p.metaDescription.length < 110 || p.metaDescription.length > 175) throw new Error(p.id + ': the meta description has ' + p.metaDescription.length + ' characters'); }
const comment = "The curriculum pages of this language: one framework, one grade, one subject each. WRITTEN by scripts/curriculum-pages/lists/build-en-defs.js (edit the lists there). Everything on a page is filled by scripts/curriculum-pages/assemble.js from the curriculum registry and the units. status 'pilot' = noindex, in no sitemap, linked from nowhere.";
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ $comment: comment, pages }, null, 1) + '\n');
console.log('en: ' + pages.length + ' pages → ' + path.relative(REPO, OUT));
