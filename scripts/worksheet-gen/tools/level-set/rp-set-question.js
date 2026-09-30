/**
 * Replace ONE question of a story in data/literacy/reading-passages.js (the generated module), keeping the file's own
 * serialization (header + JSON.stringify(…, null, 2)). Refuses to run unless an unchanged round-trip reproduces the
 * file byte for byte, so nothing else in the file can move.
 *   node tools/level-set/rp-set-question.js <loc> <storyId> <questionIndex> '<json {q, choices, correct}>'
 */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', '..', 'data', 'literacy', 'reading-passages.js');
const [loc, id, idxS, json] = process.argv.slice(2);
const src = fs.readFileSync(P, 'utf8');
const crlf = src.includes('\r\n');
const lf = src.replace(/\r\n/g, '\n');
const cut = lf.indexOf("'use strict';");
const header = lf.slice(0, cut);
delete require.cache[require.resolve(P)];
const { READING_PASSAGES } = require(P);
const write = (obj) => `${header}'use strict';\n\nconst READING_PASSAGES = ${JSON.stringify(obj, null, 2)};\n\nmodule.exports = { READING_PASSAGES };\n`;
if (write(READING_PASSAGES) !== lf) throw new Error('round-trip does not reproduce the file — refusing');
const story = (READING_PASSAGES[loc] || []).find((p) => p.id === id);
if (!story) throw new Error(`no story ${loc} ${id}`);
const i = Number(idxS);
const q = JSON.parse(json);
if (!q.q || !Array.isArray(q.choices) || q.choices.length !== 3 || ![0, 1, 2].includes(q.correct)) throw new Error('bad question');
console.log('old:', JSON.stringify(story.questions[i]));
story.questions[i] = { q: q.q, choices: q.choices, correct: q.correct };
const out = write(READING_PASSAGES);
fs.writeFileSync(P, crlf ? out.replace(/\n/g, '\r\n') : out);
console.log('new:', JSON.stringify(story.questions[i]));
