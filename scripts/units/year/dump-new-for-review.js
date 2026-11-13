#!/usr/bin/env node
/**
 * The review packet of the lessons a language gained from its year design (Daily Teaching System, Part 12.2): every
 * lesson the design marks `placed`, with everything the teacher reads (title, objective, standards shown, the note)
 * beside what the lesson hands out: each worksheet's own title and instruction and a PICTURE of the page at the level
 * the lesson gives to everyone (downloaded from the live site), the tool and the practice on screen.
 * One reviewer reads it (CLAUDE.md rule 2): the native-speaker and the pedagogy check in one pass, WITH the pages.
 *
 *   node scripts/units/year/dump-new-for-review.js --loc=en [--subject=math]
 *     → out/year/review-<loc>/review.md + one PNG per page
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');
const REPO = path.join(__dirname, '..', '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en'), subject = arg('subject', 'math');
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const design = readJson(path.join(__dirname, 'design.' + loc + '.' + subject + '.json'));
const units = readJson(path.join(REPO, 'frontend', 'content', 'units', 'units.' + loc + '.json')).units;
const strings = readJson(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.' + loc + '.json'));
const OUT = path.join(REPO, 'out', 'year', 'review-' + loc);
fs.mkdirSync(OUT, { recursive: true });
const get = (url) => new Promise((res, rej) => https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36' } }, (r) => { if (r.statusCode !== 200) { r.resume(); return rej(new Error(r.statusCode + ' ' + url)); } const b = []; r.on('data', (c) => b.push(c)); r.on('end', () => res(Buffer.concat(b))); }).on('error', rej));
const byKey = new Map(); for (const u of units) for (const l of u.lessons) byKey.set(l.id || l.point, { u, l });
(async () => {
  const L = ['# New lessons of the school year, ' + subject + ', language `' + loc + '`: review packet', '',
    'Each lesson below was written on worksheet pages that already existed. The picture of each page is beside this file (open it: the texts must be true to what the page prints).', ''];
  let n = 0;
  for (const g of ['K', '1', '2', '3']) {
    if (!design[g]) continue;
    for (const du of design[g].units) for (const dl of du.lessons) {
      if (!dl.placed) continue;
      const x = byKey.get(dl.placed); if (!x) throw new Error(dl.placed + ' is not in the units file');
      const { u, l } = x; n++;
      L.push('## `' + dl.placed + '` — ' + l.title, '', '- unit: ' + u.title + ' (grade ' + u.grade + '), lesson ' + l.n + ' of ' + u.lessons.length + '; class days: ' + l.days,
        '- before it in the unit: ' + (u.lessons[l.n - 2] ? u.lessons[l.n - 2].title : '(first lesson)') + '; after it: ' + (u.lessons[l.n] ? u.lessons[l.n].title : '(last lesson)'),
        '- objective: ' + l.objective, '- standards shown: ' + (l.standards.map((s) => s.rel + ' ' + [s.framework, s.code].filter(Boolean).join(' ') + (s.title ? ' (' + s.title + ')' : '')).join('; ') || 'none'));
      for (const p of l.paper) {
        const file = (dl.placed + '--' + p.type).replace(/[^A-Za-z0-9-]+/g, '_') + '.png';
        fs.writeFileSync(path.join(OUT, file), await get('https://www.lessoncraftstudio.com/' + loc + '/decks/' + p.core + '/thumbnail.png'));
        L.push('- worksheet "' + p.title + '" (' + p.type + '), the page for everyone is level ' + (p.level || 2) + (p.easy ? '; an easier page (level ' + ((p.level || 2) - 1) + ') is offered' : '') + (p.hard ? '; a harder page (level ' + ((p.level || 2) + 1) + ') is offered' : '') + '. Its printed instruction: ' + ((strings[p.type] || {}).instruction || '') + ' — PICTURE: `' + file + '`');
      }
      if (l.exit) L.push('- check-up page at the end of the lesson: one more page of "' + l.exit.title + '" at the same level');
      if (l.tool) L.push('- tool on the projector: ' + l.tool.name);
      if (l.screen) L.push('- on screen: ' + l.screen.title + (l.screen.kind === 'page' ? ' (a worksheet page with a Check button)' : ' (an activity)'));
      L.push('- teacher note, the usual mistake: ' + l.note.mistake, '- teacher note, words to use: ' + l.note.words, '- teacher note, what to watch for: ' + l.note.watch, '');
    }
  }
  const newUnits = []; for (const g of ['K', '1', '2', '3']) if (design[g]) for (const du of design[g].units) if (du.opened) newUnits.push(units.find((u) => u.id === du.opened));
  if (newUnits.length) { L.push('## New units (their page title and description are under review too)', ''); for (const u of newUnits) L.push('- `' + u.id + '` — ' + u.title + ' | page title: ' + u.metaTitle + ' | description: ' + u.metaDescription + ' | lessons: ' + u.lessons.map((l) => l.title).join(' · ')); L.push(''); }
  fs.writeFileSync(path.join(OUT, 'review.md'), L.join('\n') + '\n');
  console.log(loc + ': ' + n + ' lessons → ' + path.relative(REPO, path.join(OUT, 'review.md')));
})().catch((e) => { console.error(e.message); process.exit(1); });
