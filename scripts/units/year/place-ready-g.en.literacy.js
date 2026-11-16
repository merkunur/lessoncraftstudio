#!/usr/bin/env node
/**
 * Part 12.3, English literacy, sixth run (2026-11-16): a lesson on pages that exist. The Kindergarten unit First Words
 * to Read gets the lesson its design places third:
 *
 *   Read a little book with a pattern   K-629 the little book to fold, K-631 its Read and Talk page   RF.K.4
 *   point K:read-picture-book (it exists; it had no lesson and no teacher note)
 *
 * Two real assets: two page types of the point. The lesson hands out a Level A book; the other levels are named in
 * `avoid`, so the exit ticket is a second Level A book (a reviewer found the next book in line was Level B).
 * The teacher note was written from the pages and read by a US kindergarten reviewer with the pages (2026-11-16).
 * The lesson numbers of the unit move: rebuild its unit check and its guide.
 *
 *   node scripts/units/year/place-ready-g.en.literacy.js      (refuses to run twice; it checks everything before it writes)
 * Then: notes/apply.js · assemble --loc=en · pacing · assemble · assessments/build-checks --unit · build-guide --unit
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const jsonLike = (raw, obj) => {   // keeps the file's indent and line ends
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  return out + (/\r?\n$/.test(raw) ? (raw.includes('\r\n') ? '\r\n' : '\n') : '');
};
const NOTE = {
  title: 'Read a little book',
  objective: 'Children read a little book with one repeated sentence pattern, pointing under each word, and tell what the book is about.',
  note: {
    mistake: 'Children say the sentence from memory and from the picture without looking at the words: they point three times for four words, or say "lamb" where the book says "sheep." Others stop pointing after the first page.',
    words: 'Fold the page into a little book together: top half back, then left half back. Name the pictures first, so that every child has the words. Read the title and page 2 aloud, pointing under each word; then children read pages 3 and 4 themselves. Say: "One touch for each word. Does your finger stop when your voice stops?" If a child says a word that fits the picture but not the print, point to the first letter: "Could this be lamb? What letter would lamb start with?" If the word can be sounded out, like pig, have the child say each sound and blend it: /p/ /i/ /g/, pig. Then use the Read and Talk page: read the new words and the picture words together, read the book again, and talk about the three questions.',
    watch: 'Watch the pointing finger, not just the voice: one touch for each word shows that the child matches spoken words to printed words. A child who reads the pattern on every page but cannot point to a word you name ("Show me the word the.") is reciting: go back to the sight-word lesson. Each book is marked with a level. (A Level A book has one short line on each page and repeats one sentence pattern; only the picture word changes.) Each time children reread the book, they check one box next to "I read it" on the Read and Talk page. A child who reads the book easily is ready for another book of the same level.',
  },
};
const LESSON = { point: 'K:read-picture-book', types: ['K-629', 'K-631'], titles: { 'K-629': 'A Little Book to Fold and Read', 'K-631': 'Read and Talk' },
  avoid: ['readers-k629-bigandlittle', 'readers-k629-thebigcloud', 'readers-k629-thefrog'] };
const DESC = 'A Kindergarten unit: 6 lessons on matching words to pictures, sight words, a first little book, one and many, a or an, and sh and ch, each with a teacher note.';

// ---- everything is read and checked first
if (DESC.length < 110 || DESC.length > 170) throw new Error('description of ' + DESC.length + ' characters');
const DEFS = 'frontend/content/units/defs/en.json', defsRaw = read(DEFS), defs = JSON.parse(defsRaw);
const u = defs.units.find((x) => x.id === 'k-first-words-to-read'); if (!u) throw new Error('no unit k-first-words-to-read');
if (u.lessons.some((l) => l.point === LESSON.point)) throw new Error('the lesson is in the unit already');
const at = u.lessons.findIndex((l) => l.point === 'K:sight-words-reading'); if (at < 0) throw new Error('no sight-word lesson to stand after');
const NOTES = 'scripts/units/notes/en-literacy-k.js'; let notes = read(NOTES);
if (notes.includes("'K:read-picture-book'")) throw new Error('the note is there already');
const anchor = "    'K:digraphs-k': {"; if (notes.split(anchor).length !== 2) throw new Error('no place for the note in ' + NOTES);
const DESIGN = 'scripts/units/year/design.en.literacy.json', designRaw = read(DESIGN), design = JSON.parse(designRaw);
let placed = 0;
(function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === 'k-first-words-to-read' && o.lessons) { for (const l of o.lessons) if (l.standard === 'RF.K.4') { l.placed = LESSON.point; placed++; } return; } Object.values(o).forEach(walk); } })(design);
if (placed !== 1) throw new Error('the design names ' + placed + ' lessons for RF.K.4 in the unit');

// ---- then everything is written
const BS = String.fromCharCode(92);
const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
const block = `    'K:read-picture-book': {\n      title: ${q(NOTE.title)},\n      objective: ${q(NOTE.objective)},\n      note: {\n        mistake: ${q(NOTE.note.mistake)},\n        words: ${q(NOTE.note.words)},\n        watch: ${q(NOTE.note.watch)},\n      },\n    },\n`;
fs.writeFileSync(file(NOTES), notes.replace(anchor, () => block + anchor));
u.lessons.splice(at + 1, 0, LESSON);
u.metaDescription = DESC;
fs.writeFileSync(file(DEFS), jsonLike(defsRaw, defs));
fs.writeFileSync(file(DESIGN), jsonLike(designRaw, design));
console.log('lesson ' + (at + 2) + ' of ' + u.id + ' (' + u.lessons.length + ' lessons): ' + LESSON.point + '; note written; design marked');
