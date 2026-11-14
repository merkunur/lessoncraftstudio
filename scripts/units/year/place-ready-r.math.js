#!/usr/bin/env node
/**
 * Part 12.2, mathematics, STAGE 1, thirteenth run (2026-11-14): the lessons the "Year pages R" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   English
 *     Grade 1  Story Problems Within 20 (exists)  + Stories with three numbers (G1-570, and the bare sums of G1-445 as
 *       its second page), its fifth and last lesson: the unit now has the five lessons of the year design.
 *     Grade 2  Adding and Subtracting Within 100 (exists)  + What was there at the start? (G2-510, The Missing Question),
 *       after One-step stories with a bar model. The design's own unit, Story Problems Within 100, still waits for two
 *       pages (comparing with the larger or smaller amount unknown, two steps within 100).
 *
 *   Swedish
 *     åk 1  Räknehändelser och problemlösning 0–20 (NEW unit, after Klockan och almanackan, as the design has it)
 *       Hur många fler? Jämföra två antal            G1-511 Compare Word Problems (Plankorna)
 *       Vad hände? Räknehändelser där något saknas   G1-568 (the change) + G1-569 (the start) (Ögonblicket)
 *       Hitta på en egen fråga                       G1-571 Write the Question (Fickbrädet)
 *       Rita, räkna, svara                           G1-572 Draw, Solve, Answer
 *     The design described pages with two bars to colour, three panels (först, sedan, nu) and four labelled fields; the
 *     pages built teach the same objectives with two rows of pictures, a bar model, and a drawing box with an equation
 *     frame. The lesson texts are written on the pages as they are.
 *     Hur många fler? does not hand out one harder page (`avoid`): it prints "macaronar", a wrong plural of the picture
 *     vocabulary that waits for the vocabulary fix (the right word is "macaroner").
 *
 *   node scripts/units/year/place-ready-r.math.js      (refuses to run twice)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const writeJsonLike = (f, raw, obj) => {   // keeps the file's indent and line ends
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(file(f), out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
};
const keyOf = (l) => l.id || l.point;
const P = '1:word-problems';
for (const loc of ['en', 'sv']) {
  const f = 'frontend/content/units/defs/' + loc + '.json'; const raw = read(f); const defs = JSON.parse(raw);
  const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
  const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
  const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
  const word = loc === 'en' ? ' lessons' : ' lektioner';
  const describe = (u, text) => { if (text.length < 110 || text.length > 170) throw new Error(u.id + ': description of ' + text.length + ' characters'); if (!text.includes(' ' + u.lessons.length + word)) throw new Error(u.id + ': the description does not name its ' + u.lessons.length + ' lessons'); u.metaDescription = text; };
  if (loc === 'en') {
    const g1 = unit('g1-story-problems-within-20');
    g1.lessons.push(fresh({ point: '1:add-three-addends', id: '1:add-three-addends#stories-with-three-numbers', types: ['G1-570', 'G1-445'], standards: ['1.OA.A.2'], standardsRel: { '1.OA.A.2': 'teaches' } }));
    describe(g1, 'A three-week Grade 1 math unit: 5 lessons on story problems within 20: a missing part, a missing change, how many more or fewer, and three numbers to add.');
    const g2 = unit('g2-adding-and-subtracting-within-100');
    g2.lessons.push(fresh({ point: '2:two-step-word-problems', id: '2:two-step-word-problems#what-was-there-at-the-start', types: ['G2-510'], tool: 'missing-question', activity: null }));
    describe(g2, 'A five-week Grade 2 math unit: 9 lessons on number lines, jumps on the hundreds chart and an open number line, adding tens and ones, column sums, and stories.');
  } else {
    const after = 'sv-1-ma-klockan-almanackan';
    const u = { id: 'sv-1-ma-raknehandelser-0-20', slug: 'raknehandelser-och-problemlosning-0-20-ak-1', status: 'live', grade: '1', subject: 'math',
      title: 'Räknehändelser och problemlösning 0–20', metaTitle: 'Matematik åk 1: Räknehändelser och problemlösning | Lektionsplanering', metaDescription: '', weeks: 2,
      lessons: [
        fresh({ point: P, id: P + '#hur-manga-fler', types: ['G1-511'], tool: 'comparison-planks', avoid: ['raknehandelser-svar-efterratter-och-godis-g1511'] }),
        fresh({ point: P, id: P + '#vad-hande', types: ['G1-568', 'G1-569'], tool: 'the-gap', activity: null }),
        fresh({ point: P, id: P + '#hitta-pa-en-egen-fraga', types: ['G1-571'], tool: 'missing-question', activity: null }),
        fresh({ point: P, id: P + '#rita-rakna-svara', types: ['G1-572'], tool: null }),
      ] };
    if (defs.units.some((x) => x.id === u.id)) throw new Error(u.id + ' exists');
    defs.units.splice(defs.units.findIndex((x) => x.id === after) + 1, 0, u);
    const p = defs.plans.find((x) => x.units.includes(after)); p.units.splice(p.units.indexOf(after) + 1, 0, u.id);
    describe(u, 'Lektionsplanering i matematik för åk 1, ”Räknehändelser och problemlösning 0–20”: 4 lektioner om att jämföra, hitta det som saknas, ställa egna frågor och rita och räkna.');
  }
  writeJsonLike(f, raw, defs);
  console.log(loc + ': ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
}
