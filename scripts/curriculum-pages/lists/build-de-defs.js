#!/usr/bin/env node
/**
 * The German curriculum pages, written into frontend/content/curriculum-pages/defs/de.json (Daily Teaching System,
 * Part 6.2). German frameworks have no public codes: a page lists the PARTS of one document (Kompetenzbereiche,
 * Lernbereiche) with the lessons of the German units under each part (scripts/curriculum-pages/assemble.js,
 * partsPage). One page per framework, subject and grade band of the document, where the German units teach at least
 * 15 of the band's objectives (measured 2026-11-11, docs/daily-teaching-system/PART-6-DESIGN.md §3):
 *
 *   KMK Bildungsstandards (end of class 4)   Mathematik, Deutsch                 one page per subject
 *   Bayern, LehrplanPLUS                      Mathematik 1/2 and 3/4, Deutsch 1/2
 *   Nordrhein-Westfalen, Lehrplan 2021        Mathematik, Deutsch                 one page per subject (both stages)
 *   Sachsen, Lehrplan Grundschule             Mathematik 1/2 and 3, Deutsch 1/2
 *
 * Names follow what teachers type (docs/SEO/daily-system-demand/report.de.md: "Lehrplan Grundschule Bayern Mathe",
 * "Lehrplan Grundschule NRW Deutsch", "Lehrplan Grundschule Mathematik Sachsen", "Bildungsstandards Mathematik
 * Grundschule"); each document keeps its own words (Jahrgangsstufe in Bavaria, Klassenstufe in Saxony).
 *
 *   node scripts/curriculum-pages/lists/build-de-defs.js   (rewrites defs/de.json; the status of a page that is
 *                                                           already live in the file is kept)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(REPO, 'frontend', 'content', 'curriculum-pages', 'defs', 'de.json');
const SUBJECT = { math: 'Mathematik', ela: 'Deutsch' };
const PAGES = [
  { id: 'kmk-math', registry: 'de', framework: 'kmk-mathematik', subject: 'math', grades: ['1-4'], gradeLabel: 'Klasse 1 bis 4', partsTitle: 'Kompetenzbereiche',
    slug: 'bildungsstandards-mathematik-grundschule',
    title: 'Bildungsstandards Mathematik Grundschule: Übersicht mit Unterrichtsstunden',
    metaTitle: 'Bildungsstandards Mathematik Grundschule: Übersicht mit Material',
    metaDescription: 'Die Kompetenzbereiche der KMK-Bildungsstandards Mathematik für die Grundschule, jeweils mit unseren Unterrichtsstunden und Arbeitsblättern dazu und mit dem, was noch fehlt.' },
  { id: 'kmk-deutsch', registry: 'de', framework: 'kmk-deutsch', subject: 'ela', grades: ['1-4'], gradeLabel: 'Klasse 1 bis 4', partsTitle: 'Kompetenzbereiche',
    slug: 'bildungsstandards-deutsch-grundschule',
    title: 'Bildungsstandards Deutsch Grundschule: Übersicht mit Unterrichtsstunden',
    metaTitle: 'Bildungsstandards Deutsch Grundschule: Übersicht mit Material',
    metaDescription: 'Die Kompetenzbereiche der KMK-Bildungsstandards Deutsch für die Grundschule, jeweils mit unseren Unterrichtsstunden und Arbeitsblättern dazu und mit dem, was noch fehlt.' },
  { id: 'by-math-12', registry: 'de-by', framework: 'lpplus-mathematik', subject: 'math', grades: ['1-2'], gradeLabel: 'Jahrgangsstufen 1 und 2', partsTitle: 'Lernbereiche',
    slug: 'lehrplan-mathematik-bayern-klasse-1-2',
    title: 'Lehrplan Mathematik Bayern, Klasse 1 und 2: Lernbereiche mit Unterrichtsstunden',
    metaTitle: 'Lehrplan Mathematik Bayern Klasse 1/2: Lernbereiche mit Material',
    metaDescription: 'Die Lernbereiche des LehrplanPLUS Mathematik für die Jahrgangsstufen 1 und 2 in Bayern, jeweils mit unseren Unterrichtsstunden und Arbeitsblättern und mit dem, was noch fehlt.' },
  { id: 'by-math-34', registry: 'de-by', framework: 'lpplus-mathematik', subject: 'math', grades: ['3-4'], documentIndex: 1, gradeLabel: 'Jahrgangsstufen 3 und 4', partsTitle: 'Lernbereiche',
    slug: 'lehrplan-mathematik-bayern-klasse-3-4',
    title: 'Lehrplan Mathematik Bayern, Klasse 3 und 4: Lernbereiche mit Unterrichtsstunden',
    metaTitle: 'Lehrplan Mathematik Bayern Klasse 3/4: Lernbereiche mit Material',
    metaDescription: 'Die Lernbereiche des LehrplanPLUS Mathematik für die Jahrgangsstufen 3 und 4 in Bayern mit unseren Unterrichtsstunden für Klasse 3 und mit dem, was für Klasse 4 noch fehlt.' },
  { id: 'by-deutsch-12', registry: 'de-by', framework: 'lpplus-deutsch', subject: 'ela', grades: ['1-2'], gradeLabel: 'Jahrgangsstufen 1 und 2', partsTitle: 'Lernbereiche',
    slug: 'lehrplan-deutsch-bayern-klasse-1-2',
    title: 'Lehrplan Deutsch Bayern, Klasse 1 und 2: Lernbereiche mit Unterrichtsstunden',
    metaTitle: 'Lehrplan Deutsch Bayern Klasse 1/2: Lernbereiche mit Material',
    metaDescription: 'Die Lernbereiche des LehrplanPLUS Deutsch für die Jahrgangsstufen 1 und 2 in Bayern, jeweils mit unseren Unterrichtsstunden und Arbeitsblättern und mit dem, was noch fehlt.' },
  { id: 'nw-math', registry: 'de-nw', framework: 'lp-nrw-mathematik', subject: 'math', grades: ['1-4', '1-2', '3-4'], gradeLabel: 'Klasse 1 bis 4', partsTitle: 'Bereiche',
    slug: 'lehrplan-mathematik-nrw-grundschule',
    title: 'Lehrplan Mathematik NRW Grundschule: Bereiche mit Unterrichtsstunden',
    metaTitle: 'Lehrplan Mathematik NRW Grundschule: Bereiche mit Material',
    metaDescription: 'Die Bereiche und Schwerpunkte des Lehrplans Mathematik für die Primarstufe in NRW, jeweils mit unseren Unterrichtsstunden und Arbeitsblättern dazu und mit dem, was noch fehlt.' },
  { id: 'nw-deutsch', registry: 'de-nw', framework: 'lp-nrw-deutsch', subject: 'ela', grades: ['1-4', '1-2', '3-4'], gradeLabel: 'Klasse 1 bis 4', partsTitle: 'Bereiche',
    slug: 'lehrplan-deutsch-nrw-grundschule',
    title: 'Lehrplan Deutsch NRW Grundschule: Bereiche mit Unterrichtsstunden',
    metaTitle: 'Lehrplan Deutsch NRW Grundschule: Bereiche mit Material',
    metaDescription: 'Die Bereiche und Schwerpunkte des Lehrplans Deutsch für die Primarstufe in NRW, jeweils mit unseren Unterrichtsstunden und Arbeitsblättern dazu und mit dem, was noch fehlt.' },
  { id: 'sn-math-12', registry: 'de-sn', framework: 'lp-sn-mathematik', subject: 'math', grades: ['1-2'], gradeLabel: 'Klassenstufen 1 und 2', partsTitle: 'Lernbereiche',
    slug: 'lehrplan-mathematik-sachsen-klasse-1-2',
    title: 'Lehrplan Mathematik Sachsen, Klasse 1 und 2: Lernbereiche mit Unterrichtsstunden',
    metaTitle: 'Lehrplan Mathematik Sachsen Klasse 1/2: Lernbereiche mit Material',
    metaDescription: 'Die Lernbereiche des sächsischen Lehrplans Mathematik für die Klassenstufen 1 und 2, jeweils mit unseren Unterrichtsstunden und der Zahl der Lernziele und Inhalte mit Stunden.' },
  { id: 'sn-math-3', registry: 'de-sn', framework: 'lp-sn-mathematik', subject: 'math', grades: ['3'], gradeLabel: 'Klassenstufe 3', partsTitle: 'Lernbereiche',
    slug: 'lehrplan-mathematik-sachsen-klasse-3',
    title: 'Lehrplan Mathematik Sachsen, Klasse 3: Lernbereiche mit Unterrichtsstunden',
    metaTitle: 'Lehrplan Mathematik Sachsen Klasse 3: Lernbereiche mit Material',
    metaDescription: 'Die Lernbereiche des sächsischen Lehrplans Mathematik für die Klassenstufe 3, jeweils mit unseren Unterrichtsstunden und der Zahl der Lernziele und Inhalte mit Stunden.' },
  { id: 'sn-deutsch-12', registry: 'de-sn', framework: 'lp-sn-deutsch', subject: 'ela', grades: ['1-2'], gradeLabel: 'Klassenstufen 1 und 2', partsTitle: 'Lernbereiche',
    slug: 'lehrplan-deutsch-sachsen-klasse-1-2',
    title: 'Lehrplan Deutsch Sachsen, Klasse 1 und 2: Lernbereiche mit Unterrichtsstunden',
    metaTitle: 'Lehrplan Deutsch Sachsen Klasse 1/2: Lernbereiche mit Material',
    metaDescription: 'Die Lernbereiche des sächsischen Lehrplans Deutsch für die Klassenstufen 1 und 2, jeweils mit unseren Unterrichtsstunden und Arbeitsblättern dazu und mit dem, was noch fehlt.' },
];
const before = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')).pages : [];
// the names the reviewer of the pages corrected (scripts/curriculum-pages/reviews/de.review.json → pages)
const REVIEW = path.join(__dirname, '..', 'reviews', 'de.review.json');
const reviewed = fs.existsSync(REVIEW) ? JSON.parse(fs.readFileSync(REVIEW, 'utf8')).pages || {} : {};
const pages = PAGES.map((p) => Object.assign({ id: p.id, status: (before.find((x) => x.id === p.id) || {}).status || 'pilot' }, p, reviewed[p.id] || {}));
for (const p of pages) {
  if (!SUBJECT[p.subject]) throw new Error(p.id + ': subject');
  if (p.metaTitle.length > 70) throw new Error(p.id + ': metaTitle has ' + p.metaTitle.length + ' characters');
  if (p.metaDescription.length < 110 || p.metaDescription.length > 175) throw new Error(p.id + ': the meta description has ' + p.metaDescription.length + ' characters');
}
const comment = 'The curriculum pages of this language: one document, one subject, one grade band each. WRITTEN by scripts/curriculum-pages/lists/build-de-defs.js (edit the list there). Everything on a page is filled by scripts/curriculum-pages/assemble.js from the curriculum registry, the units and the content graph.';
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ $comment: comment, pages }, null, 1) + '\n');
console.log('de: ' + pages.length + ' pages → ' + path.relative(REPO, OUT));
