#!/usr/bin/env node
/**
 * The two files an analyst needs to MATCH the pages a year design asks for against the worksheet types that exist
 * (Daily Teaching System, Part 12.2 for mathematics on 2026-11-13, Part 12.3 for literacy): most pages a designer
 * marks "new" exist already as generators that were built for the worksheet makers and are published in no language.
 *
 *   node scripts/units/year/needs-catalog.js --subject=literacy [--locs=en]
 *     → out/year/needs.<subject>.<loc>.md     every new lesson of the design that needs a page (not the teacher-led
 *                                              ones), with the key type-work-list.js gives it (<loc>-<grade>-<nnn>,
 *                                              counted through the languages in the order en, de, sv)
 *     → out/year/needs.<subject>.json         the same as data
 *     → out/year/type-catalog.<subject>.txt   every worksheet type of the subject's teaching points: id | published
 *                                              in en de sv | its point stands in a live unit in en de sv | teaching
 *                                              point | title | instruction
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const subject = arg('subject', 'math');
const LOCS = ['en', 'de', 'sv'], want = arg('locs', LOCS.join(',')).split(',');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const OUT = path.join(REPO, 'out', 'year');
fs.mkdirSync(OUT, { recursive: true });

// ---- the needs (the keys count through en, de, sv whether or not a language is asked for, as type-work-list.js does) ----
const needs = []; let n = 0;
for (const loc of LOCS) {
  const f = path.join(__dirname, 'design.' + loc + '.' + subject + '.json');
  if (!fs.existsSync(f)) continue;
  const d = readJson(f);
  for (const g of ['K', '1', '2', '3']) {
    if (!d[g]) continue;
    for (const u of d[g].units) for (const x of u.lessons) {
      if (!x.new || x.source === 'teacher-led') continue;
      n++;
      needs.push({ key: loc + '-' + g + '-' + String(n).padStart(3, '0'), loc, grade: g, unit: u.title, title: x.title, standard: x.standard, objective: x.objective, source: x.source, page: x.page || '', tool: x.tool || null });
    }
  }
}
fs.writeFileSync(path.join(OUT, 'needs.' + subject + '.json'), JSON.stringify(needs, null, 1));
for (const loc of want) {
  const mine = needs.filter((x) => x.loc === loc);
  if (!mine.length) continue;
  const L = [];
  for (const x of mine) L.push('## ' + x.key + ' · ' + loc + ' grade ' + x.grade + ' · ' + x.title + ' [' + x.standard + '] (' + x.source + ')', x.objective, x.page ? 'PAGE: ' + x.page : '(its page: the ready material of ' + x.source + ')', '');
  fs.writeFileSync(path.join(OUT, 'needs.' + subject + '.' + loc + '.md'), L.join('\n'));
  console.log('needs ' + subject + ' ' + loc + ': ' + mine.length + ' → out/year/needs.' + subject + '.' + loc + '.md');
}

// ---- the catalogue ----
const pts = readJson(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'points.json'));
const points = (Array.isArray(pts) ? pts : (pts.points || Object.values(pts))).filter((p) => p.subject === subject);
const strings = readJson(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.en.json'));
const assets = Object.fromEntries(LOCS.map((l) => [l, readJson(path.join(REPO, 'frontend', 'content', 'teaching-graph', 'assets', l + '.json')).types]));
const taught = Object.fromEntries(LOCS.map((l) => [l, new Set(readJson(path.join(REPO, 'frontend', 'content', 'units', 'units.' + l + '.json')).units.filter((u) => u.status === 'live').flatMap((u) => u.lessons.map((x) => x.point)))]));
const rows = [];
for (const p of points) for (const id of p.types || []) {
  const s = strings[id]; if (!s) continue;
  const pub = LOCS.map((l) => (assets[l][id] && assets[l][id].p.some(Boolean) ? l : '--')).join(' ');
  const unit = LOCS.map((l) => (taught[l].has(p.id) ? l : '--')).join(' ');
  rows.push([id, 'pub:' + pub, 'unit:' + unit, p.id, s.title, String(s.instruction || '').replace(/\s+/g, ' ')].join(' | '));
}
const order = (id) => { const m = /^(K|G(\d))-(\d+)/.exec(id); return (m[1] === 'K' ? 0 : Number(m[2])) * 1000 + Number(m[3]); };
rows.sort((a, b) => order(a.split(' | ')[0]) - order(b.split(' | ')[0]));
fs.writeFileSync(path.join(OUT, 'type-catalog.' + subject + '.txt'), '# the ' + subject + ' worksheet types that exist as generators (id | published pages in en de sv | the type\'s teaching point stands in a live unit in en de sv | teaching point | title | instruction)\n' + rows.join('\n') + '\n');
console.log('catalogue ' + subject + ': ' + rows.length + ' types of ' + points.length + ' teaching points, ' + rows.filter((r) => / pub:-- /.test(r.replace('pub:', ' pub:').replace(/pub:(--) /, 'pub:-- '))).length + ' not published in English → out/year/type-catalog.' + subject + '.txt');
