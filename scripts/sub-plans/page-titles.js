#!/usr/bin/env node
/**
 * The title printed on a page, where it is not its worksheet type's title (Part 5.2 rule 2, for the week days of Part
 * 5.4): mazes, tracing pages, find-the-differences scenes and stories print a title of their own on each page. Read
 * from the printed text of the week days' pages (out/sub-plans/thumbs/text/<slug>.txt, written by fetch-pages.js
 * --text) and written to scripts/sub-plans/page-titles.json, which lists/build-en-weeks.js reads to give such a block
 * its `title` (so the day at a glance and the guest teacher pages name the page the class holds).
 *
 *   node scripts/sub-plans/page-titles.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const T = path.join(REPO, 'out', 'sub-plans', 'thumbs', 'text');
const plan = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'sub-plans', 'weeks-plan.json'), 'utf8'));
const strings = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.en.json'), 'utf8'));
const OUT = path.join(__dirname, 'page-titles.json');
const have = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')).titles : {};
const letters = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const titles = {};
let n = 0;
for (const b of plan) {
  const f = path.join(T, b.core + '.txt');
  if (!fs.existsSync(f)) continue;
  const s = strings[b.type];
  const own = s.printTitle || s.title;
  const printed = fs.readFileSync(f, 'utf8').split(/Name:/)[0].replace(/\s+/g, ' ').trim();
  if (!printed || letters(printed) === letters(own)) continue;
  if (!titles[b.core]) n++;
  titles[b.core] = printed;
}
const sorted = Object.fromEntries(Object.keys(titles).sort().map((k) => [k, titles[k]]));
fs.writeFileSync(OUT, JSON.stringify({ $comment: 'The title printed on a page where it is not its worksheet type\'s title (written by scripts/sub-plans/page-titles.js from the printed text of the pages; read by lists/build-en-weeks.js).', titles: sorted }, null, 1) + '\n');
console.log(Object.keys(sorted).length + ' page titles (' + n + ' new) -> ' + path.relative(REPO, OUT));
