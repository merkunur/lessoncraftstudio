/**
 * draw-and-write-k.js — eight Kindergarten pages for the unit "Draw and Write: Opinions, Facts, and Stories" (English
 * literacy year, Daily Teaching System Part 12.3, 2026-11-17; revised after a Kindergarten early-writing specialist's review
 * the same day). The bank is data/literacy/draw-and-write-k.en.json (written by the scratch script oo-kwrite/bank.js).
 * Children are 5 or 6 and it is spring: they sound out and spell CVC words and some heart words. THE TEACHER READS every
 * instruction, task line, sentence and word aloud. A child circles, draws a line under, writes a number or a check mark or
 * an X in a box of 72 px, cuts and glues a label card (120 x 86 px), draws in a big box, and writes on Kindergarten rows of
 * 112 px (a top rule, a dashed midline and a base rule 60 px apart: 0.73 in on paper). Sounded-out spelling is right on every
 * page: every key that shows a child's writing says so.
 *
 * A kindergartner writes about 12 to 16 letters across a full-width row: every blank and every key sample is measured at
 * LETTER = 46 px a letter (14 letters across the 651 px of a row). The frame words of a row (My favorite, because it is, A
 * ... can, I felt) are printed in 30 px type standing on the row's base rule; no period is printed at the end of a frame (the
 * child writes it).
 *
 * Lesson "My favorite and why: an opinion" (W.K.1; Class Graph for a class vote)
 *   opinion  K-673 (day 1). 1. Rows of two things of one kind: circle the one you like best (any choice is right: the key
 *            says so). 2. Opinion pieces by kindergartners: a picture, a title, the writer's name, the opinion (what the
 *            writer likes best) and the reason (why). Circle the opinion, draw a line under the reason. Which comes first
 *            follows no pattern; a reason printed before the opinion names its thing (never it or they).
 *     level 1  three rows of two things; two pieces of two sentences
 *     level 2  two rows of two things; three pieces of two sentences
 *     level 3  two rows of two things; three pieces of three sentences: the first one only tells the topic (no mark)
 *   myfav    K-674 (day 2, the child's own piece). 1. Three topics with a picture (game, color, animal, place, shape) and
 *            "my own": circle one; a big box to draw your favorite (a third of the body high or more). 2. The rows, with a
 *            grey model on a topic that is never offered. 3. A checklist: I drew it. I wrote my opinion. I told why.
 *     level 1  frames: My favorite [topic] / is [favorite] / because it is [word] — a word bank of four reason words, each
 *              natural for a topic offered and one for every topic ("Word bank (or your own word)")
 *     level 2  starters: My favorite [___] / [___] / because [___] (the child sounds out the rest)
 *     level 3  three rows, the first one starts with I; a word bank (like best is it because)
 *
 * Lesson "Teach a fact: draw, label, and write" (W.K.2)
 *   facts    K-675 (day 1). A library picture of an animal, a thing or a plant, cut to the box of its ink. 1. Three sentences
 *            the teacher reads: two facts about the picture's topic, one about something else (false for this one): a check
 *            mark (yes) or an X (no) in a 72 px box. 2. Two labels: each one has ONE home under the picture, joined by a line
 *            that starts on the home's top and ends on a dot ON its part (inside the box measured for the part, on the
 *            picture's ink); the line crosses no ink of the picture on its way (checked against a 64 x 64 mask of the ink).
 *            No fact of the page names a labeled part.
 *     level 1  the other sentence is about something of another kind; two label cards to cut and glue (never printed in the
 *              order of their boxes); the glue box keeps 30 px of room around the card
 *     level 2  the other sentence is about another animal (another plant); write the two labels on rows from a word bank of two
 *     level 3  as level 2; the word bank holds three words: one names no part of the picture
 *   teach    K-676 (day 2, the child's own piece). 1. Three animals with a picture (bird, frog, bee, bat) and "my own": circle
 *            one; a box to draw it with two label rows of 7 letters beside it. 2. The rows, with a grey model about an animal
 *            of another family. 3. A checklist: I named my topic. I labeled my picture. I wrote two facts.
 *     level 1  frames: A [topic] can [___] / A [topic] has [___] — a word bank of can-words and has-words that are all true of
 *              an animal offered on the page, a true one for every animal offered ("fly" whenever an animal that flies is)
 *     level 2  the same frames; the child sounds out the words
 *     level 3  "A" and an open row, and an open row; a word bank (can has it a the)
 *
 * Lesson "What happened to me: a small moment" (W.K.3)
 *   order    K-677 (day 1). A kindergartner's small moment at school (minutes long) in sentence boxes, printed out of order:
 *            write 1, 2, 3 (4) in the 72 px boxes. Exactly one order is right; the last sentence shows the feeling. Circle the
 *            face that shows how the writer felt. Draw what happened last.
 *     level 1  three sentences, three faces · level 2  three sentences, four faces · level 3  four sentences, four faces
 *   moment   K-678 (day 2, the child's own piece). 1. Two small moments and "my own": circle one; three boxes to draw what
 *            happened first, next, and last. 2. The rows. 3. I felt [___] with four faces. 4. A checklist.
 *     level 1  three big boxes in a row; one frame I [___] for the last box (box 3); the faces carry their words
 *     level 2  three small boxes, one under the other, each with I [___] beside it; the faces carry their words
 *     level 3  the same; the faces carry no words; a word bank (the a my was) beside First
 *
 * Lesson "Author's chair: a friend asks, I add" (W.K.5; Name Sticks to pull who asks)
 *   ask      K-679 (day 1). A kindergartner's piece (a picture and one sentence), a friend's question, and sentences the
 *            writer could add: circle the one that answers the question. The right one stands first, in the middle and last
 *            about equally over the copies and is not the one to find by its length.
 *     level 1  three pieces, two sentences each · level 2  three pieces, three sentences each · level 3  as level 2, one of
 *              them only says again what the piece says
 *   chair    K-680 (day 2, in the author's chair with the child's own piece of this unit). A grey worked example (its question
 *            asks for a detail: who, what, where, when, how). 1. My friend asked. 2. I added: a big box to draw the new
 *            detail and the rows to write it. 3. A checklist: I shared. I listened. I added a detail. The key's sample is
 *            another example of the bank.
 *     level 1  1: circle the question (four question chips; the worked example never asks one of them); 2: one row for one word
 *     level 2  1: a row the teacher or the friend writes the question on; 2: one row
 *     level 3  1: a row for the question; 2: two rows for a sentence
 *
 * Every picture of the bank was looked at on a contact sheet (oo-kwrite/sheets); pictures are 60 px or more; no two pictures
 * of one kind on a page. The page turns the font's joined letters off (fi, fl, ff) and gives an f before i, f, l or t and a
 * t before t room of its own. Apostrophes and quotes are typographic. No page leaves a blank band of more than 40 px outside
 * a box to draw in (a box to draw in is empty by design: it is labeled and counted as printed). The instruction of each level
 * is INSTR (registered as strings; verify() reads it on the page). verify() carries its OWN copy of every ruled text and
 * measure (SPEC) and does its own measuring (the K-675 lines against the bank's mask). English only. Themeless: a copy draws
 * other content; the pages of the child's own piece take copy N of a fixed list of copies that differ (no two share more than
 * three quarters of what they print). PDF only (the answer key is for checks and review). The bank is checked when this file
 * loads (dwkFaultsOf), with trial draws of every level and counts over the first 20 copies; no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const BANK = require('../../data/literacy/draw-and-write-k.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, rowSvg } = _parts;
const T = TOK.color;
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const ROW = 112;                 // a Kindergarten writing row: 60 px from the top rule to the base rule (0.73 in on paper)
const LETTER = 46;               // a kindergartner's letter on that row (14 letters across a row of 651 px)
const FRAME_PX = 30;             // the printed words of a frame, standing on the row's base rule
const BOX = 72;                  // a box for one number or one mark (three quarters of an inch)
const CARD_W = 120, CARD_H = 86; // a label card of K-675 for five-year-old hands
const GLUE = 30;                 // the room a glue box keeps around its card
const PIC = 60;                  // the smallest picture
const INNER = W - 24;            // the width inside a card (651)
const MODES = ['opinion', 'myfav', 'facts', 'teach', 'order', 'moment', 'ask', 'chair'];
const COPIES = 24;               // the fixed list of copies of the pages of the child's own piece (per level)
/** K-673: the width of the sentence column of a piece on each level, measured on the rendered page (verify measures it again
 *  on every page), and the advance of every letter of Nunito 700 at 100 px, measured in the page's own font (a sum of these
 *  is within 1.2 % of the real width of every sentence of the bank: the check keeps 2 % of room) */
const PIECE_COL = { 1: 453, 2: 469, 3: 469 };
const NUNITO_700 = { 0: 60, 1: 60, 2: 60, 3: 60, 4: 60, 5: 60, 6: 60, 7: 60, 8: 60, 9: 60, ' ': 27.1, '!': 24.8, "'": 24.3, ',': 24.8, '-': 43.4, '.': 24.8, '?': 47.07,
  A: 74.4, B: 68.8, C: 65.93, D: 76.2, E: 59.7, F: 56.2, G: 73.6, H: 77.3, I: 28.2, J: 33.6, K: 66.5, L: 56.2, M: 86.8, N: 74.8, O: 78.5, P: 65.2, Q: 78.5, R: 68.6, S: 63.1,
  T: 63.27, U: 73.8, V: 71.3, W: 111.3, X: 67.2, Y: 62.25, Z: 60.5, a: 54.7, b: 60, c: 46.3, d: 60, e: 54.2, f: 34.33, g: 60.4, h: 58.5, i: 25.5, j: 25.9, k: 53.6,
  l: 31.9, m: 87.7, n: 58.5, o: 57.6, p: 60, q: 60, r: 39.2, s: 48.8, t: 35.88, u: 57.9, v: 56.3, w: 88.9, x: 54.6, y: 56.2, z: 47.4, '’': 24.8, '“': 44.3, '”': 44.3 };
/** the width of a piece sentence at `px` as the page prints it: its letters, the room after an f before i, f, l, t and a t
 *  before t (0.07 em each), and the span's padding (4 px a side); null when a letter has no measured width */
function sentenceWidth(s, px) {
  let w = 0; for (const c of s) { if (NUNITO_700[c] === undefined) return null; w += NUNITO_700[c]; }
  return (w * px) / 100 + (s.match(/f(?=[iflt])|t(?=t)/g) || []).length * 0.07 * px + 8;
}
/** the size of a key's words on a Kindergarten row (the row's x-height band: key-on-row.js) */
const KEY_PX = (() => { const ys = [...rowSvg(300, ROW).matchAll(/<line\b[^>]*\by1="([\d.]+)"[^>]*\by2="([\d.]+)"/g)].filter((m) => m[1] === m[2]).map((m) => +m[1]).sort((x, y) => x - y); return Math.round(((ys[2] - ys[1]) / 0.5) * 2) / 2; })();

/** the page instruction of every level (registered as strings; verify() compares the page with its own copy, SPEC) */
const INSTR = {
  opinion: { 1: 'An opinion tells what you like best.', 2: 'An opinion tells what you like best. A reason tells why.', 3: 'A writer tells the topic, an opinion, and a reason why.' },
  myfav: { 1: 'Write your opinion: tell what you like best and why.', 2: 'Write your opinion: tell what you like best and why.', 3: 'Write your opinion: tell what you like best and why.' },
  facts: { 1: 'Facts tell true things about one topic.', 2: 'Facts tell true things about one topic. A label names a part.', 3: 'Facts tell true things about one topic. A label names a part.' },
  teach: { 1: 'Teach a reader: name your topic, label it, and tell facts.', 2: 'Teach a reader: name your topic, label it, and tell facts.', 3: 'Teach a reader: name your topic, label it, and tell facts.' },
  order: { 1: 'A small moment tells what happened, in order.', 2: 'A small moment tells what happened, in order, and how the writer felt.', 3: 'A small moment tells what happened, in order, and how the writer felt.' },
  moment: { 1: 'Draw and write what happened to you. Tell how you felt.', 2: 'Draw and write what happened to you. Tell how you felt.', 3: 'Draw and write what happened to you. Tell how you felt.' },
  ask: { 1: 'A friend’s question helps a writer add a detail.', 2: 'A friend’s question helps a writer add a detail.', 3: 'A friend’s question helps a writer add a detail.' },
  chair: { 1: 'In the author’s chair, a writer shares, listens, and adds a detail.', 2: 'In the author’s chair, a writer shares, listens, and adds a detail.', 3: 'In the author’s chair, a writer shares, listens, and adds a detail.' },
};
/** the task lines of every level ({T} the topic of the picture, {N} the writer of the story; on K-675 a small check mark
 *  follows "yes" and a small X follows "no") */
const LINES = {
  opinion: {
    1: ['Circle the one you like best in each row.', 'Your teacher reads each piece. Circle the sentence that tells what the writer likes best. Draw a line under the sentence that tells why.'],
    2: ['Circle the one you like best in each row.', 'Your teacher reads each piece. Circle the sentence that tells what the writer likes best. Draw a line under the sentence that tells why.'],
    3: ['Circle the one you like best in each row.', 'Your teacher reads each piece. The first sentence tells the topic. It gets no mark. Circle the sentence that tells what the writer likes best. Draw a line under the sentence that tells why.'] },
  myfav: {
    1: ['Circle one. Draw your favorite.', 'Finish each sentence.', 'Put a check mark in each box that is true.'],
    2: ['Circle one. Draw your favorite.', 'Finish each sentence. Sound out your words.', 'Put a check mark in each box that is true.'],
    3: ['Circle one. Draw your favorite.', 'Write your opinion.', 'Put a check mark in each box that is true.'] },
  facts: {
    1: ['Your teacher reads each sentence. Is it about the {T}? Put a check mark (yes) or an X (no) in each box.', 'Cut out the labels. Glue each label in its box.'],
    2: ['Your teacher reads each sentence. Is it about the {T}? Put a check mark (yes) or an X (no) in each box.', 'Write each label on its line. Use the word bank.'],
    3: ['Your teacher reads each sentence. Is it about the {T}? Put a check mark (yes) or an X (no) in each box.', 'Write each label on its line. One word in the word bank does not fit.'] },
  teach: {
    1: ['Circle one.', 'Draw it. Write two labels. Draw a line from each label to its part.', 'Finish each sentence.', 'Put a check mark in each box that is true.'],
    2: ['Circle one.', 'Draw it. Write two labels. Draw a line from each label to its part.', 'Finish each sentence. Sound out your words.', 'Put a check mark in each box that is true.'],
    3: ['Circle one.', 'Draw it. Write two labels. Draw a line from each label to its part.', 'Write two facts.', 'Put a check mark in each box that is true.'] },
  order: {
    1: ['Your teacher reads the story. Write 1, 2, and 3 in the boxes to show the order.', 'How did {N} feel? Circle the face.', 'Draw what happened last.'],
    2: ['Your teacher reads the story. Write 1, 2, and 3 in the boxes to show the order.', 'How did {N} feel? Circle the face.', 'Draw what happened last.'],
    3: ['Your teacher reads the story. Write 1, 2, 3, and 4 in the boxes to show the order.', 'How did {N} feel? Circle the face.', 'Draw what happened last.'] },
  moment: {
    1: ['Circle one.', 'Draw what happened first, next, and last.', 'Write what happened last. Then write how you felt.', 'Put a check mark in each box that is true.'],
    2: ['Circle one.', 'Draw and write what happened first, next, and last.', 'How did you feel? Write it.', 'Put a check mark in each box that is true.'],
    3: ['Circle one.', 'Draw and write what happened first, next, and last.', 'How did you feel? Write it.', 'Put a check mark in each box that is true.'] },
  ask: {
    1: ['Your teacher reads each piece, the question, and the sentences. Circle the sentence that answers the question.'],
    2: ['Your teacher reads each piece, the question, and the sentences. Circle the sentence that answers the question.'],
    3: ['Your teacher reads each piece, the question, and the sentences. Circle the sentence that answers the question.'] },
  chair: {
    1: ['My friend asked: circle the question.', 'I added: draw it. Write one word.', 'Put a check mark in each box that is true.'],
    2: ['My friend asked: your teacher or your friend writes it.', 'I added: draw it. Write it.', 'Put a check mark in each box that is true.'],
    3: ['My friend asked: your teacher or your friend writes it.', 'I added: draw it. Write a sentence.', 'Put a check mark in each box that is true.'] },
};
/** the checklists (an icon, the words, a box) */
const CHECK = {
  myfav: [['crayon', 'I drew it.'], ['pencil', 'I wrote my opinion.'], ['why', 'I told why.']],
  teach: [['topic', 'I named my topic.'], ['tag', 'I labeled my picture.'], ['pencil', 'I wrote two facts.']],
  moment: [['three', 'I drew three parts.'], ['pencil', 'I wrote what happened.'], ['smile', 'I told how I felt.']],
  chair: [['speak', 'I shared.'], ['ear', 'I listened.'], ['plus', 'I added a detail.']],
};
/** the small printed words of the pages (the key's notes are the last ones) */
const WORDS = { like: 'Like this:', bank: 'Word bank:', bankOwn: 'Word bank (or your own word):', own: 'my own', by: 'by', box: ['First', 'Next', 'Last'], asked: 'asked:', felt: 'I felt',
  keyAny: 'Any choice is right.', keySpell: 'Invented spelling is right: a child writes the sounds he or she hears.', keyDraw: 'Any drawing that shows this is right.',
  keyDrawAny: 'any drawing is right.', keyFeel: 'Any feeling word is right.', keyQ: 'The child circles the question the friend asked; any one is right.' };
/** the frames of the rows: printed words, and blanks with what each one must hold (in letters of LETTER px; the last blank of
 *  a row takes the rest of the row). No period is printed: the child writes it after the words. */
const FRAMES = {
  myfav: {
    1: [['My favorite', { b: 'topic', need: 6 }], ['is', { b: 'answer', need: 10 }], ['because it is', { b: 'reason', need: 7 }]],
    2: [['My favorite', { b: 'topic', need: 6 }], [{ b: 'answer', need: 13 }], ['because', { b: 'reason', need: 10 }]],
    3: [['I', { b: 'open', need: 13 }], [{ b: 'open', need: 14 }], [{ b: 'open', need: 14 }]] },
  teach: {
    1: [['A', { b: 'topic', need: 6 }, 'can', { b: 'can', need: 5 }], ['A', { b: 'topic', need: 6 }, 'has', { b: 'has', need: 5 }]],
    2: [['A', { b: 'topic', need: 6 }, 'can', { b: 'can', need: 5 }], ['A', { b: 'topic', need: 6 }, 'has', { b: 'has', need: 5 }]],
    3: [['A', { b: 'open', need: 13 }], [{ b: 'open', need: 14 }]] },
  moment: { band: ['I', { b: 'i', need: 10 }], last: ['I', { b: 'i', need: 12 }], felt: ['I felt', { b: 'felt', need: 6 }] },
};

/* ---------------------------------------------------------------- the levels ---------------------------------------------------------------- */
const LEVELS = {
  opinion: { 1: { pairs: 3, pieces: 2, pic: 96, ppic: 112, font: 26 }, 2: { pairs: 2, pieces: 3, pic: 88, ppic: 96, font: 24 }, 3: { pairs: 2, pieces: 3, topic: true, pic: 76, ppic: 96, font: 22 } },
  myfav: { 1: { frames: 1 }, 2: { frames: 2 }, 3: { frames: 3 } },
  facts: { 1: { off: 'other', glue: true, words: 0 }, 2: { off: 'same', words: 2 }, 3: { off: 'same', words: 3 } },
  teach: { 1: { frames: 1 }, 2: { frames: 2 }, 3: { frames: 3 } },
  order: { 1: { n: 3, faces: 3 }, 2: { n: 3, faces: 4 }, 3: { n: 4, faces: 4 } },
  moment: { 1: { rows: 1, faceWords: true }, 2: { rows: 3, faceWords: true }, 3: { rows: 3, faceWords: false } },
  ask: { 1: { n: 3, choices: 2, pic: 160, font: 26 }, 2: { n: 3, choices: 3, pic: 112, font: 22 }, 3: { n: 3, choices: 3, same: true, pic: 112, font: 22 } },
  chair: { 1: { qChips: true, addRows: 1 }, 2: { addRows: 1 }, 3: { addRows: 2 } },
};

/* ---------------------------------------------------------------- small helpers ---------------------------------------------------------------- */
/** the advance widths (em) of Nunito 700 with its joined letters off (measured 2026-11-17); estimates add 8 % */
const NUNITO700 = { a: 0.547, b: 0.6, c: 0.4625, d: 0.6, e: 0.542, f: 0.3422, g: 0.604, h: 0.585, i: 0.255, j: 0.259, k: 0.536, l: 0.319, m: 0.877,
  n: 0.585, o: 0.576, p: 0.6, q: 0.6, r: 0.392, s: 0.488, t: 0.3574, u: 0.579, v: 0.565, w: 0.891, x: 0.546, y: 0.564, z: 0.474, A: 0.744, B: 0.688,
  C: 0.6582, D: 0.762, E: 0.597, F: 0.562, G: 0.736, H: 0.773, I: 0.282, J: 0.335, K: 0.665, L: 0.562, M: 0.868, N: 0.748, O: 0.785, P: 0.652,
  Q: 0.785, R: 0.686, S: 0.631, T: 0.6334, U: 0.738, V: 0.713, W: 1.113, X: 0.672, Y: 0.6228, Z: 0.605, ' ': 0.271, '.': 0.27, '?': 0.47, '’': 0.22, ',': 0.27, '!': 0.3, ':': 0.27 };
const emOf = (t) => [...String(t)].reduce((a, c) => a + (NUNITO700[c] || (/[0-9]/.test(c) ? 0.56 : 0.9)), 0);
const pxOf = (t, font) => emOf(t) * font * 1.08;
const wordsOf = (s) => String(s).replace(/[.,!?“”’:]/g, ' ').toLowerCase().split(/\s+/).filter(Boolean);
/** a small seeded generator (the trial draws and the fixed lists of copies; the pages use ctx.rng) */
function seedRng(seed) { let x = seed >>> 0 || 1; const next = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; return { int: (a, c) => a + Math.floor(next() * (c - a + 1)) }; }
/** a block of 2, 3 or 4 places repeated to the end, or runs that all have one length of two or more */
function blockRepeat(s) {
  for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
  const runs = String(s).match(/(.)\1*/g) || [];
  return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length);
}
/** the places of the right answers of n items among k: never all in one place (n >= 3), never three in a row, never a
 *  staircase of three, never a repeated block */
function placesOk(p, k) {
  const n = p.length, s = p.join('');
  if (n >= 3 && new Set(p).size < 2) return false;
  if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
  if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
  if (blockRepeat(s)) return false;
  return k > 0;
}
function mixedPlaces(n, k, rng) { for (let t = 0; t < 4000; t++) { const p = Array.from({ length: n }, () => rng.int(0, k - 1)); if (placesOk(p, k)) return p; } throw new Error('no mixed places'); }
/** a K row of LETTER px letters: the letters of a text (a space counts as a letter) */
const lettersOf = (s) => [...String(s)].length;
/** how a sample wraps on rows of the given widths in letters (the first row may start with a starter); null when it does not fit */
function wrapRows(text, rowsLetters) {
  const ws = String(text).split(' '); const out = []; let r = 0, cur = '';
  for (const w of ws) {
    const next = cur ? cur + ' ' + w : w;
    if (lettersOf(next) <= rowsLetters[r]) { cur = next; continue; }
    if (!cur) return null;
    out.push(cur); r++; cur = w;
    if (r >= rowsLetters.length || lettersOf(cur) > rowsLetters[r]) return null;
  }
  out.push(cur);
  return out;
}
/** an article for a noun ("a bird", "an owl") */
const art = (t) => (t.an ? 'An' : 'A');
/** all k-subsets of a list */
function subsets(list, k) { const out = []; const go = (s, cur) => { if (cur.length === k) { out.push(cur); return; } for (let i = s; i < list.length; i++) go(i + 1, cur.concat([list[i]])); }; go(0, []); return out; }
/** the share of items two copies have in common */
const shared = (a, b) => a.filter((x) => b.includes(x)).length / Math.max(a.length, b.length);

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
/** the words that no page may print (the never list, and the nouns of what the teacher models in the notes) */
const neverWords = (b) => new Set([...(b.banned || []), ...(b.modelOnlyWords || [])]);
/** the words a kindergartner writes as the samples of each lesson's keys (a note's model shares none of its fact words) */
function lessonSamples(b) {
  const w = (xs) => xs.filter(Boolean).flatMap((x) => wordsOf(x));
  return {
    opinion: w((b.favTopics || []).flatMap((t) => [t.answer, ...(t.reasons || []), ...(t.l2 || []), t.l3])),
    facts: w([...(b.teachTopics || []).flatMap((t) => [...t.sample, ...t.l3, ...t.labels]), ...(b.factTopics || []).flatMap((t) => t.parts.map((p) => p[0]))]),
    moment: w((b.moments || []).flatMap((m) => [...m.l2, m.feel])),
    chair: w((b.chairExamples || []).flatMap((e) => [e.word, e.short, e.added])),
  };
}
const STOP = new Set(['a', 'an', 'the', 'is', 'it', 'i', 'my', 'can', 'has', 'was', 'of', 'to', 'in', 'on', 'and', 'he', 'she', 'they', 'we']);
/** a question of K-680 asks for a detail (who, what, where, when, how), never yes or no */
const DETAIL_Q = /^(Who|What|Where|When|How)\b/;
/** the kinds of the four question chips of K-680 level 1: an example of level 1 never asks one of them */
const CHIP_KIND = /^(What color|Where|Who|What sound)\b/;
/** the key writes a question of K-680 on a full row as lib/key-on-row.js does: 0.56 em a glyph at the least, 8 px each side */
const qFits = (q) => [...q].length * KEY_PX * Math.max(0.56, (emOf(q) / [...q].length) * 1.05) <= INNER - 16 && emOf(q) * KEY_PX * 1.04 <= INNER - 24;
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function dwkFaultsOf(b) {
  const f = [];
  const P = b.pics || {};
  for (const [w, x] of Object.entries(P)) if (!x || !Array.isArray(x.pic) || x.pic.length !== 2 || !x.pic.every((y) => typeof y === 'string' && y) || /bw( ?\d+)?$/i.test(x.pic[0]) || !x.kind || !x.word) f.push(`picture "${w}": not a colour theme, a picture, a kind and a word`);
  if ((b.banned || []).length < 10) f.push('no list of words a page may never print');
  if ((b.modelOnly || []).length < 4 || (b.modelOnlyWords || []).length < 4) f.push('no models for the notes (modelOnly) or no words of them (modelOnlyWords)');
  const printed = [];
  const kindOf = (k) => (P[k] || {}).kind;
  // ------------------------------------------------ K-673
  for (const [a, c] of b.pairs || []) { if (!P[a] || !P[c] || kindOf(a) === kindOf(c)) f.push(`pairs: "${a}" and "${c}" are not two pictures of two kinds`); printed.push(P[a] && P[a].word, P[c] && P[c].word); }
  if ((b.pairs || []).length < 10) f.push('pairs: fewer than ten');
  const pcs = b.pieces || [];
  if (pcs.length < 14) f.push('pieces: fewer than fourteen');
  const LIKE = /\b(like|likes|love|loves|favorite|best)\b/i;
  for (const p of pcs) {
    if (!P[p.pic]) f.push(`piece "${p.title}": no picture`);
    if (!LIKE.test(p.op)) f.push(`piece "${p.title}": the opinion does not say like, favorite or best`);
    if (LIKE.test(p.re) || LIKE.test(p.topic) || (p.reFirst && LIKE.test(p.reFirst))) f.push(`piece "${p.title}": the reason or the topic sentence says like, favorite or best`);
    // the reason printed before the opinion (every level) names its thing: no it, they or them before anything is named
    if (/\b(it|they|them)\b/i.test(p.reFirst || p.re)) f.push(`piece "${p.title}": the reason printed first holds it, they or them (no thing named yet)`);
    for (const s of [p.op, p.re, p.topic, p.reFirst || p.re]) if (!/^[A-Z][^.!?]*[.!]$/.test(s) || s.split(' ').length > 8) f.push(`piece "${p.title}": "${s}" is not one short sentence`);
    if (!/^[A-Z][a-z]+$/.test(p.name)) f.push(`piece "${p.title}": no first name`);
    // every sentence a level prints (the topic on level 3; the opinion; the reason after it; the reason printed first) fits
    // ONE line of the piece's sentence column at the type size of that level, measured with the font's own widths
    for (const lv of [1, 2, 3]) for (const s of [p.op, p.re, p.reFirst || p.re].concat(LEVELS.opinion[lv].topic ? [p.topic] : [])) {
      const w = sentenceWidth(s, LEVELS.opinion[lv].font);
      if (w === null) f.push(`piece "${p.title}": "${s}" has a letter with no measured width`);
      else if (w * 1.02 > PIECE_COL[lv]) f.push(`piece "${p.title}": "${s}" is ${Math.round(w)} px at level ${lv}, wider than one line of its column (${PIECE_COL[lv]} px)`);
    }
    printed.push(p.title, p.name, p.op, p.re, p.topic, p.reFirst);
  }
  if (new Set(pcs.map((p) => p.name)).size !== pcs.length) f.push('pieces: a writer twice');
  // no surface feature sorts opinions from reasons: the opinion is the longer sentence in 30 to 70 % of the pieces, the
  // reason starts with It in at most 70 %
  if (pcs.length) {
    const longer = pcs.filter((p) => p.op.length > p.re.length).length / pcs.length;
    if (longer < 0.3 || longer > 0.7) f.push(`pieces: the opinion is the longer sentence in ${Math.round(longer * 100)} % (30 to 70)`);
    for (const w of ['It', 'I', 'They']) { const share = pcs.filter((p) => p.re.split(' ')[0] === w).length / pcs.length; if (share > 0.7) f.push(`pieces: ${Math.round(share * 100)} % of the reasons start with ${w}`); }
  }
  // ------------------------------------------------ K-674
  const ft = b.favTopics || [];
  if (ft.length < 5) f.push('favTopics: fewer than five');
  const rw = b.reasonWords || [];
  if (rw.length < 6 || rw.some((w) => !/^[a-z]+$/.test(w) || lettersOf(w) > FIT.reason)) f.push('reasonWords: fewer than six short words');
  for (const w of rw) if (!ft.some((t) => (t.reasons || []).includes(w))) f.push(`reasonWords: "${w}" fits no topic`);
  for (const t of ft) {
    if (!P[t.pic] || P[t.pic].word !== t.key) f.push(`favTopics "${t.key}": its picture does not carry its word`);
    if (!(t.reasons || []).includes(t.reason) || (t.reasons || []).some((w) => !rw.includes(w))) f.push(`favTopics "${t.key}": its reason word is not one of its reasons, or a reason is not in reasonWords`);
    // the samples follow their frames and fit their rows (level 1: the words; level 2: the starters; level 3: I ...)
    if (lettersOf(t.key) > FIT.topic || lettersOf(t.answer) > FIT.answer || t.l2[0] !== t.key || t.l2[1] !== 'is ' + t.answer || t.l2[2] !== 'it is ' + t.reason) f.push(`favTopics "${t.key}": the samples do not follow the frames`);
    if (lettersOf(t.l2[1]) > FIT.answer2 || lettersOf(t.l2[2]) > FIT.reason2) f.push(`favTopics "${t.key}": a level-2 sample is longer than its blank`);
    if (!/^I like .+ best\. (It is|They are) [a-z]+\.$/.test(t.l3) || !wrapRows(t.l3.replace(/^I /, ''), FIT.rows3)) f.push(`favTopics "${t.key}": the level-3 sample is not "I like ___ best. It is ___." on its rows`);
    printed.push(t.key, t.l3, ...(t.reasons || []), 'My favorite ' + t.key + ' is ' + t.answer + ' because it is ' + t.reason + '.');
  }
  for (const m of b.favModels || []) {
    if (!/^My favorite [a-z]+ is .+ because it is [a-z]+\.$/.test(m.op) || !/^I like .+ best\. (It is|They are) [a-z]+\.$/.test(m.l3)) f.push(`favModels "${m.topic}": not in the shape of the frames`);
    if (ft.some((t) => t.key === m.topic)) f.push(`favModels "${m.topic}": a topic that is offered`);
    if (pcs.some((p) => wordsOf(p.title).includes(m.topic))) f.push(`favModels "${m.topic}": a topic of a piece of the day before`);
    printed.push(m.op, m.l3);
  }
  if ((b.favModels || []).length < 6) f.push('favModels: fewer than six');
  if ((b.favBank || []).length < 4) f.push('favBank: fewer than four words');
  // ------------------------------------------------ K-675
  const fts = b.factTopics || [];
  if (fts.length < 14) f.push('factTopics: fewer than fourteen');
  const tagsAll = new Set(fts.flatMap((t) => t.facts.map((x) => x[0])));
  for (const t of fts) {
    if (!P[t.key]) f.push(`factTopics "${t.key}": no picture`);
    if (t.facts.length < 3) f.push(`factTopics "${t.key}": fewer than three facts`);
    for (const [tag, s] of t.facts) { if (!new RegExp('^' + art(t) + ' ' + t.name + ' ').test(s) || !/\.$/.test(s) || s.split(' ').length > 9) f.push(`factTopics "${t.key}": "${s}" is not a short sentence about ${art(t).toLowerCase()} ${t.name}`); printed.push(s); }
    for (const a of t.alsoTrue) if (!tagsAll.has(a)) f.push(`factTopics "${t.key}": alsoTrue "${a}" is no tag of a fact`);
    // the picture's ink: its box and a 64 x 64 mask (0 no ink, 1 some, 2 ink)
    const ink = t.ink || [], mask = t.mask || [];
    if (ink.length !== 4 || !(ink[0] >= 0 && ink[1] >= 0 && ink[2] <= 1 && ink[3] <= 1 && ink[2] - ink[0] > 0.3 && ink[3] - ink[1] > 0.3) || mask.length !== 64 || mask.some((r) => !/^[012]{64}$/.test(r))) { f.push(`factTopics "${t.key}": no box and mask of the picture's ink`); continue; }
    // every part: a dot inside the box measured for the part, the dot's disc on the picture's ink, a short word that holds on
    // the key's row, named in partInFact, its label on the left or the right home
    for (const [w, side, x, y, box] of t.parts) {
      if (!['L', 'R'].includes(side) || !Array.isArray(box) || box.length !== 4 || !(x > box[0] && x < box[2] && y > box[1] && y < box[3])) f.push(`factTopics "${t.key}": the dot of "${w}" is not inside the box of its part`);
      else if (!dotOnInk(t, x, y)) f.push(`factTopics "${t.key}": the dot of "${w}" is not on the picture's ink`);
      if (lettersOf(w) > FIT.part || !seatsOn(w, ROW_W.part)) f.push(`factTopics "${t.key}": part "${w}" is a long word`);
      if (!(w in (b.partInFact || {}))) f.push(`factTopics "${t.key}": part "${w}" is not in partInFact`);
      printed.push(w);
    }
    for (const w of t.noParts) { if (t.parts.some((p) => p[0] === w) || lettersOf(w) > FIT.part || !seatsOn(w, ROW_W.part)) f.push(`factTopics "${t.key}": noPart "${w}" is a part or a long word`); printed.push(w); }
    // every level can find a sentence about something else that is FALSE for this topic
    for (const lv of [1, 2, 3]) if (!offCandidates(b, t, LEVELS.facts[lv].off).length) f.push(`factTopics "${t.key}": no sentence of level ${lv} about something else`);
    // two parts can be labeled at both sizes of the picture: lines that reach their dots without crossing ink or each other
    for (const lay of ['glue', 'rows']) if (!labelPairs(b, t, [], lay).length) f.push(`factTopics "${t.key}": no two parts to label (${lay})`);
  }
  // ------------------------------------------------ K-676
  const tt = b.teachTopics || [];
  if (tt.length < 4) f.push('teachTopics: fewer than four');
  const families = new Set(tt.map((t) => t.family));
  for (const t of tt) {
    if (!P[t.key] || P[t.key].word !== t.key || lettersOf(t.key) > FIT.topicT - 1) f.push(`teachTopics "${t.key}": no picture that carries its name, or a long name`);
    if (fts.some((u) => u.key === t.key || u.name === t.key)) f.push(`teachTopics "${t.key}": a topic of the day before`);
    if (/^[aeiou]/.test(t.key)) f.push(`teachTopics "${t.key}": takes an (the frame prints A)`);
    if (!t.family) f.push(`teachTopics "${t.key}": no family`);
    if (!t.can.includes(t.sample[0]) || !t.has.includes(t.sample[1]) || !b.canWords.includes(t.sample[0]) || !b.hasWords.includes(t.sample[1])) f.push(`teachTopics "${t.key}": its sample is not true of it or not in the word lists`);
    if (!(b.canWords || []).some((w) => t.can.includes(w)) || !(b.hasWords || []).some((w) => t.has.includes(w))) f.push(`teachTopics "${t.key}": no true can-word or has-word in the word lists`);
    // level 3: "A [bird can fly.]" and "[It has wings.]": the same facts as words of the lists, on the two rows
    if (t.l3.length !== 2 || t.l3[0] !== `${t.key} can ${t.can.find((w) => t.l3[0].endsWith(' ' + w + '.')) || '?'}.` || !/^It has [a-z]+\.$/.test(t.l3[1]) || !t.has.includes(t.l3[1].slice(7, -1)) || t.l3.some((x, i) => lettersOf(x) > FIT.rowsT3[i])) f.push(`teachTopics "${t.key}": the level-3 sample is not "${t.key} can ___." and "It has ___." on two rows`);
    if (t.labels.length !== 2 || t.labels.some((w) => lettersOf(w) > FIT.label || !seatsOn(w, ROW_W.label))) f.push(`teachTopics "${t.key}": not two short labels`);
    printed.push(t.key, ...t.labels, ...t.l3);
  }
  // every word of the word lists is true of a topic (a word true of no topic could only be a false choice)
  for (const w of b.hasWords || []) { if (lettersOf(w) > FIT.has) f.push(`"${w}": too long for its blank`); if (!tt.some((t) => t.has.includes(w))) f.push(`hasWords: "${w}" is true of no topic`); printed.push(w); }
  for (const w of b.canWords || []) { if (lettersOf(w) > FIT.can) f.push(`"${w}": too long for its blank`); if (!tt.some((t) => t.can.includes(w))) f.push(`canWords: "${w}" is true of no topic`); printed.push(w); }
  for (const m of b.teachModels || []) {
    if (!/^[a-z]+$/.test(m.topic) || /^[aeiou]/.test(m.topic) || !/^[a-z]+$/.test(m.can) || !/^[a-z ]+$/.test(m.has) || !m.family) f.push(`teachModels "${m.topic}": not in the shape of the frames`);
    if (tt.some((t) => t.key === m.topic) || fts.some((u) => u.key === m.topic || u.name === m.topic)) f.push(`teachModels "${m.topic}": a topic of a page of this lesson`);
    printed.push(`A ${m.topic} can ${m.can}. A ${m.topic} has ${m.has}.`);
  }
  if ((b.teachModels || []).length < 6) f.push('teachModels: fewer than six');
  if (!(b.teachModels || []).some((m) => !families.has(m.family))) f.push('teachModels: no model of a family that no topic belongs to');
  // ------------------------------------------------ K-677
  const st = b.stories || [];
  if (st.length < 14) f.push('stories: fewer than fourteen');
  for (const s of st) {
    if (!(b.feelings || []).includes(s.feel) || !P[s.feel]) f.push(`story "${s.title}": its feeling has no face`);
    if (s.s3.length !== 3 || s.s4.length !== 4) f.push(`story "${s.title}": not three and four sentences`);
    for (const x of [...s.s3, ...s.s4]) { if (!/^[A-Z].*[.!]$/.test(x) || x.split(' ').length > 11) f.push(`story "${s.title}": "${x}" is not one short sentence`); printed.push(x); }
    printed.push(s.title, s.name);
  }
  for (const fe of ['happy', 'sad', 'scared', 'mad']) if (st.filter((s) => s.feel === fe).length < 3) f.push(`stories: fewer than three stories that end ${fe}`);
  // ------------------------------------------------ K-678
  const mo = b.moments || [];
  if (mo.length < 6) f.push('moments: fewer than six');
  for (const m of mo) {
    if (!P[m.pic] || !(b.feelings || []).includes(m.feel) || m.l2.length !== 3) f.push(`moment "${m.key}": no picture, feeling or three samples`);
    for (const x of m.l2) if (lettersOf(x) > FIT.i) f.push(`moment "${m.key}": "${x}" is longer than its blank`);
    // the sample of level 3 uses a word of the word bank of level 3
    if (!m.l2.some((x) => wordsOf(x).some((w) => (b.momentBank || []).includes(w)))) f.push(`moment "${m.key}": its sample uses no word of the word bank`);
    if (st.some((s) => wordsOf(s.title).some((w) => wordsOf(m.chip).includes(w) && w.length > 3))) f.push(`moment "${m.key}": its chip shares a word with a story of the day before`);
    printed.push(m.chip, ...m.l2);
  }
  for (const m of b.momentModels || []) {
    if (m.s.length !== 3 || m.s.some((x) => x.split(' ').length > 4) || lettersOf(m.s[2]) > FIT.iLast || !(b.feelings || []).includes(m.feel)) f.push(`momentModels "${m.topic}": not three short sentences and a feeling`);
    if ((m.notWith || []).some((k) => !mo.some((x) => x.key === k))) f.push(`momentModels "${m.topic}": notWith names no moment`);
    printed.push(...m.s);
  }
  // ------------------------------------------------ K-679
  const as = b.asks || [];
  if (as.length < 14) f.push('asks: fewer than fourteen');
  const KINDS = ['color', 'where', 'who', 'sound'];
  for (const a of as) {
    if (!P[a.pic] || !KINDS.includes(a.q) || KINDS.some((k) => !a.answers[k]) || !a.same || !b.askQ[a.q]) f.push(`ask "${a.text}": no picture, question or answer of every kind`);
    if (a.same === a.answers[a.q]) f.push(`ask "${a.text}": the sentence that says the piece again answers the question`);
    if (a.same === a.text) f.push(`ask "${a.text}": the sentence that says the piece again is the piece word for word`);
    if (a.qText && !/^(What|Where|Who) [a-z ]+\?$/.test(a.qText)) f.push(`ask "${a.text}": its question is not a question`);
    printed.push(a.text, a.same, ...Object.values(a.answers), a.name, a.asker, a.qText);
  }
  for (const k of KINDS) { const n = as.filter((a) => a.q === k).length; if (n < 3) f.push(`asks: fewer than three questions of the kind ${k}`); }
  // ------------------------------------------------ K-680
  const ce = b.chairExamples || [];
  if (ce.length < 14) f.push('chairExamples: fewer than fourteen');
  if (new Set(ce.map((e) => e.name)).size !== ce.length) f.push('chairExamples: a name twice');
  for (const e of ce) {
    if (as.some((a) => a.text === e.piece)) f.push(`chairExamples: "${e.piece}" is a piece of K-679`);
    if (!DETAIL_Q.test(e.q) || !/\?$/.test(e.q)) f.push(`chairExamples "${e.name}": the question does not ask for a detail (who, what, where, when, how)`);
    // the three samples fit their rows: one word (level 1), one row (level 2), a sentence on two rows (level 3)
    if (!/^[a-z]+$/i.test(e.word) || lettersOf(e.word) > FIT.addWord || lettersOf(e.short) > FIT.addShort || !wrapRows(e.added, [FIT.open, FIT.open]) || !/^[A-Z].*\.$/.test(e.added)) f.push(`chairExamples "${e.name}": a sample does not fit its rows`);
    if (!wordsOf(e.added).includes(e.word.toLowerCase())) f.push(`chairExamples "${e.name}": the word is not in the sentence added`);
    printed.push(e.piece, e.q, e.added, e.short, e.word, e.name);
  }
  // level 1 shows examples whose question is not one of the four chips; levels 2 and 3 examples whose question the key writes
  // on its row (the key writes the question of ANOTHER example as its sample, so each level needs two at the least)
  if (ce.filter((e) => !CHIP_KIND.test(e.q)).length < 6) f.push('chairExamples: fewer than six whose question is not a chip of level 1');
  if (ce.filter((e) => qFits(e.q)).length < 14) f.push('chairExamples: fewer than fourteen whose question fits the row of the key');
  printed.push(...(b.chairQuestions || []));
  // no printed word is on the never list or a word of the notes' models; no straight quote
  const never = neverWords(b);
  for (const t of printed.filter(Boolean)) { for (const w of wordsOf(t)) if (never.has(w)) f.push(`"${t}" holds "${w}", a word no page prints`); if (/['"]/.test(t)) f.push(`"${t}" holds a straight apostrophe or quote`); }
  for (const s of b.modelOnly || []) if (printed.includes(s)) f.push(`modelOnly "${s}" stands on a page`);
  // the model of each lesson's note shares no fact word with a sample of its lesson (the teacher's model is not a page's key)
  { const ls = lessonSamples(b); for (const [l, ws] of Object.entries(b.noteWords || {})) for (const w of ws) if (!STOP.has(w) && (ls[l] || []).includes(w)) f.push(`the note of ${l} models "${w}", a word of a sample of its lesson`);
    if (Object.keys(b.noteWords || {}).length !== 4) f.push('no fact words of the four notes (noteWords)'); }
  if (f.length) return f;
  // every level of every page can be drawn: trial draws with fixed seeds
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let s = 1; s <= 12; s++) {
    try { drawPage(b, mode, lv, seedRng(s * 7 + lv), 0); } catch (e) { f.push(`${mode} level ${lv}: ${e.message}`); break; }
  }
  for (const mode of ['myfav', 'teach', 'moment', 'chair']) for (const lv of [1, 2, 3]) { try { copyList(b, mode, lv); } catch (e) { f.push(`${mode} level ${lv}: ${e.message}`); } }
  if (f.length) return f;
  // over the first 20 copies of each level (counted at load, no page drawn): K-679's right sentence stands first, in the middle
  // and last about equally and is not the one to find by its length; K-675's cards never stand in the order of their boxes;
  // K-676's word bank holds only true words and a true word for every topic; no model of K-676 shares a family with a topic
  for (const lv of [1, 2, 3]) {
    const d = LEVELS.ask[lv], pos = Array(d.choices).fill(0); let n = 0, longest = 0, shortest = 0;
    const fp = LEVELS.facts[lv]; let sameOrder = 0;
    for (let v = 1; v <= 20; v++) {
      const a = drawPage(b, 'ask', lv, seedRng(v * 11 + lv), v);
      for (const p of a.pieces) { const k = p.opts.findIndex((o) => o.ok); pos[k]++; n++; const L = p.opts.map((o) => o.s.length), r = L[k], others = L.filter((_, i) => i !== k);
        if (others.every((x) => x < r)) longest++; if (others.every((x) => x > r)) shortest++; }
      if (fp.glue) { const fx = drawPage(b, 'facts', lv, seedRng(v * 13 + lv), v); if (fx.cards.join('|') === fx.parts.map((p) => p[0]).join('|')) sameOrder++; }
    }
    if (pos.some((c) => c / n < (d.choices === 3 ? 0.25 : 0.4) || c / n > (d.choices === 3 ? 0.42 : 0.6))) f.push(`ask level ${lv}: the right sentence stands ${pos.join(' / ')} times in its places over 20 copies`);
    if (d.choices === 3 ? (longest / n > 0.45 || shortest / n > 0.45) : (longest / n < 0.3 || longest / n > 0.7)) f.push(`ask level ${lv}: the right sentence is the longest in ${longest} and the shortest in ${shortest} of ${n} pieces`);
    if (fp.glue && sameOrder > 10) f.push(`facts level ${lv}: the cards stand in the order of their boxes on ${sameOrder} of 20 copies`);
  }
  for (const lv of [1, 2, 3]) for (const c of copyList(b, 'teach', lv)) {
    const tops = c.topics.map((x) => b.teachTopics.find((t) => t.key === x)), m = b.teachModels.find((x) => x.topic === c.model);
    if (tops.some((t) => t.family === m.family)) f.push(`teach level ${lv}: the model "${m.topic}" is of the family of a topic of its copy`);
    if (lv === 1) { const why = teachBankFaults(c.bank, tops); if (why) f.push(`teach level 1: ${why}`); }
  }
  // K-678: no model stands beside a moment it tells; K-680: the worked example of level 1 never asks one of the four questions
  // to circle, the worked example of levels 2 and 3 fits the key's row, and the key's sample is another example
  for (const lv of [1, 2, 3]) {
    for (const c of copyList(b, 'moment', lv)) { const m = b.momentModels.find((x) => x.topic === c.model); if ((m.notWith || []).some((k) => c.topics.includes(k))) f.push(`moment level ${lv}: the model "${m.topic}" stands beside a moment it tells`); }
    for (const c of copyList(b, 'chair', lv)) { const e = b.chairExamples.find((x) => x.name === c.example), sm = b.chairExamples.find((x) => x.name === c.sample);
      if (lv === 1 ? CHIP_KIND.test(e.q) : !qFits(e.q) || !qFits(sm.q)) f.push(`chair level ${lv}: the example "${e.name}" does not suit its level`);
      if (!sm || sm === e) f.push(`chair level ${lv}: the key's sample is the worked example`); }
  }
  return f;
}
/** what is wrong with a level-1 word bank of K-676 for the topics of its page (null: nothing): every word is true of a topic
 *  offered, every topic finds a true can-word and a true has-word, "fly" whenever a flyer is offered, the sample's words */
function teachBankFaults(bank, tops) {
  if (!bank || !bank.can || !bank.has || !bank.can.length || !bank.has.length || bank.can.length > 4 || bank.has.length > 4) return 'no word bank of one to four can-words and has-words';
  for (const w of bank.can) if (!tops.some((t) => t.can.includes(w))) return `"${w}" is true of no topic of the page`;
  for (const w of bank.has) if (!tops.some((t) => t.has.includes(w))) return `"${w}" is true of no topic of the page`;
  for (const t of tops) if (!bank.can.some((w) => t.can.includes(w)) || !bank.has.some((w) => t.has.includes(w))) return `no true word for the ${t.key}`;
  if (tops.some((t) => t.can.includes('fly')) && !bank.can.includes('fly')) return 'no "fly" beside an animal that flies';
  if (!bank.can.includes(tops[0].sample[0]) || !bank.has.includes(tops[0].sample[1])) return 'the sample\'s words are not in the word bank';
  return null;
}
/** what a blank of each role holds, in letters (measured at LETTER px): the build sizes blanks to them, the bank check and
 *  verify() hold the samples and the words to them */
const FIT = { topic: 6, answer: 10, answer2: 13, reason: 7, reason2: 10, rows3: [13, 14, 14], topicT: 6, can: 5, has: 5, rowsT3: [13, 14], i: 10, iLast: 12, felt: 6, label: 7, part: 6, open: 14, addWord: 7, addShort: 13 };
/** the width of a label row: K-675 Levels 2 and 3 (two side by side under the picture), K-676 (beside the box to draw in) */
const ROW_W = { part: 284, label: 330 };
/** a word the key seats on a row w wide fits it: lib/key-on-row.js squeezes a word wider than w - 16 (0.56 em a glyph at
 *  the least) and the page's check wants its measured width 10 px inside the row (it starts 8 px in) */
const seatsOn = (w, width) => [...w].length * KEY_PX * Math.max(0.56, (emOf(w) / [...w].length) * 1.05) <= width - 16 && emOf(w) * KEY_PX * 1.02 <= width - 18;
/** the y of a writing row's top rule */
const TOPRULE = Math.min(...[...rowSvg(300, ROW).matchAll(/<line\b[^>]*\by1="([\d.]+)"[^>]*\by2="([\d.]+)"/g)].filter((m) => m[1] === m[2]).map((m) => +m[1]));
/** the y of a writing row's base rule */
const baseOf = (w, h) => Math.max(...[...rowSvg(w, h).matchAll(/<line\b[^>]*\by1="([\d.]+)"[^>]*\by2="([\d.]+)"/g)].filter((m) => m[1] === m[2]).map((m) => +m[1]));

/* ---------------------------------------------------------------- K-675: the picture, its homes and its label lines ---------------------------------------------------------------- */
/** the two sizes of K-675's labeling: level 1 (the picture's long side 168 px, glue boxes; a line starts at the box's top) and
 *  levels 2 and 3 (246 px, rows; a line starts on the row's top rule). The picture is cut to the box of its ink. */
const FACT_LAY = { glue: { PS: 152, homeW: CARD_W + 2 * GLUE + 6, homeH: CARD_H + 2 * GLUE + 6, top0: 0 }, rows: { PS: 246, homeW: ROW_W.part, homeH: ROW, top0: TOPRULE } };
const FACT_GAP = 24;   // between the picture and the homes
const DOT_R = 6;       // the dot at the end of a label line
/** where everything stands in the strip of INNER px: the picture (cut to its ink, centred), the two homes under it */
function factGeo(t, lay) {
  const L = FACT_LAY[lay], [x0, y0, x1, y1] = t.ink, bw = x1 - x0, bh = y1 - y0, s = L.PS / Math.max(bw, bh);
  const pw = bw * s, ph = bh * s;
  return { lay, L, s, pw, ph, picL: (INNER - pw) / 2, homeTop: ph + FACT_GAP, hx: [INNER / 2 - 22 - L.homeW, INNER / 2 + 22], ink: t.ink };
}
/** the ink of the picture at (u, v), fractions of the whole picture: '0' none, '1' some, '2' ink */
const inkAt = (t, u, v) => { const r = Math.floor(v * 64), c = Math.floor(u * 64); return r < 0 || r > 63 || c < 0 || c > 63 ? '0' : t.mask[r][c]; };
/** a dot on the picture: its centre on ink, and its inner ring (0.6 of its radius, at the smaller size) on the picture's ink */
function dotOnInk(t, x, y) {
  const s = factGeo(t, 'glue').s, r = (0.6 * DOT_R) / s;
  return inkAt(t, x, y) === '2' && Array.from({ length: 8 }, (_, i) => [Math.cos(i * Math.PI / 4) * r, Math.sin(i * Math.PI / 4) * r]).every(([dx, dy]) => inkAt(t, x + dx, y + dy) !== '0');
}
/** the dot of a part in the strip */
const dotXY = (g, x, y) => [g.picL + (x - g.ink[0]) * g.s, (y - g.ink[1]) * g.s];
/** a line from a to b crosses no ink of the picture before the last DOT_R + 5 px (where it reaches its part) */
function lineClear(t, g, a, b) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  for (let k = 0; k <= len; k += 1) {
    const px = a[0] + ((b[0] - a[0]) * k) / len, py = a[1] + ((b[1] - a[1]) * k) / len;
    if (Math.hypot(b[0] - px, b[1] - py) <= DOT_R + 5) break;
    if (px < g.picL || px > g.picL + g.pw || py < 0 || py > g.ph) continue;
    if (inkAt(t, g.ink[0] + (px - g.picL) / g.s, g.ink[1] + py / g.s) !== '0') return false;
  }
  return true;
}
/** where on its home's top the line to a dot starts: the point nearest under the dot from which the line is clear (null: none) */
function startFor(t, g, i, d) {
  const y = g.homeTop + g.L.top0, lo = g.hx[i] + 12, hi = g.hx[i] + g.L.homeW - 12;
  const xs = []; for (let x = lo; x <= hi; x += 4) xs.push(x);
  xs.sort((a, c) => Math.abs(a - d[0]) - Math.abs(c - d[0]));
  for (const x of xs) if (lineClear(t, g, [x, y], d)) return Math.round(x * 10) / 10;
  return null;
}
/** two segments cross */
function segCross(a, b) { const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])); const A = [a[0], a[1]], B = [a[2], a[3]], C = [b[0], b[1]], D = [b[2], b[3]]; return o(A, B, C) !== o(A, B, D) && o(C, D, A) !== o(C, D, B); }

/* ---------------------------------------------------------------- the draws (pure: the bank check runs them too) ---------------------------------------------------------------- */
/** the sentences about something else that are false for topic t: level 1 something of another class, levels 2 and 3
 *  something of the same class (any class when the same class has none) */
function offCandidates(b, t, how) {
  const own = new Set([...t.facts.map((x) => x[0]), ...t.alsoTrue]);
  const all = b.factTopics.filter((u) => u.key !== t.key).flatMap((u) => u.facts.filter((x) => !own.has(x[0])).map((x) => ({ u, tag: x[0], s: x[1] })));
  const same = all.filter((x) => x.u.cls === t.cls), other = all.filter((x) => x.u.cls !== t.cls);
  return how === 'other' ? other : (same.length ? same : other);
}
/** the two parts of t that may be labeled together at a size of the picture: none named by a fact of the page; the left one
 *  from the left home, the right one from the right home; each line reaches its dot without crossing ink; the lines do not
 *  cross; the dots are 40 px apart or more */
function labelPairs(b, t, factTags, lay) {
  const g = factGeo(t, lay), y = g.homeTop + g.L.top0;
  const ok = t.parts.filter(([w]) => !(b.partInFact[w] || []).some((x) => factTags.includes(x)));
  const out = [];
  for (const p of ok.filter((x) => x[1] === 'L')) for (const q of ok.filter((x) => x[1] === 'R')) {
    const dp = dotXY(g, p[2], p[3]), dq = dotXY(g, q[2], q[3]);
    if (Math.hypot(dp[0] - dq[0], dp[1] - dq[1]) < 40) continue;
    const sp = startFor(t, g, 0, dp), sq = startFor(t, g, 1, dq);
    if (sp == null || sq == null || segCross([sp, y, ...dp], [sq, y, ...dq])) continue;
    out.push({ lp: p, rp: q, sx: [sp, sq] });
  }
  return out;
}
/** level 1 of K-674: four reason words, every one natural for a topic offered, each topic offered finds one of its own, the
 *  sample's word among them */
function favBankFor(b, tops, rng) {
  const need = new Set([tops[0].reason]);
  for (const t of tops) if (!t.reasons.some((w) => need.has(w))) need.add(shuffle(t.reasons, rng)[0]);
  const pool = shuffle([...new Set(tops.flatMap((t) => t.reasons))].filter((w) => !need.has(w)), rng);
  const bank = [...need, ...pool].slice(0, 4);
  return bank.length === 4 && [...need].every((w) => bank.includes(w)) ? shuffle(bank, rng) : null;
}
/** level 1 of K-676: the can-words and has-words true of the topics offered (four of each at the most), a true one for every
 *  topic, "fly" whenever a flyer is offered, the sample's words */
function teachBankFor(b, tops, rng) {
  const pick = (list, key, sampleWord) => {
    const need = new Set([sampleWord]); if (key === 'can' && tops.some((t) => t.can.includes('fly'))) need.add('fly');
    for (const t of tops) if (!t[key].some((w) => need.has(w) && list.includes(w))) { const c = shuffle(t[key].filter((w) => list.includes(w)), rng)[0]; if (c) need.add(c); }
    const pool = shuffle(list.filter((w) => !need.has(w) && tops.some((t) => t[key].includes(w))), rng);
    const out = [...need, ...pool].slice(0, 4);
    return [...need].every((w) => out.includes(w)) ? shuffle(out, rng) : null;
  };
  const can = pick(b.canWords, 'can', tops[0].sample[0]), has = pick(b.hasWords, 'has', tops[0].sample[1]);
  const bank = can && has ? { can, has } : null;
  return bank && !teachBankFaults(bank, tops) ? bank : null;
}
/** the fixed list of copies of a page of the child's own piece: copy N is the Nth of a list in which no two copies share more
 *  than three quarters of what they print (topics, the model, the word bank) */
const COPY_CACHE = {};
function copyList(b, mode, lv) {
  const k = mode + lv; if (COPY_CACHE[k]) return COPY_CACHE[k];
  const rng = seedRng(97 * (MODES.indexOf(mode) + 1) + 13 * lv);
  const cands = [];
  if (mode === 'myfav') {
    for (const ts of subsets(b.favTopics.map((t) => t.key), 3)) for (const m of b.favModels) {
      const order = shuffle(ts, rng), tops = order.map((x) => b.favTopics.find((t) => t.key === x));
      const bank = lv === 1 ? favBankFor(b, tops, rng) : [];
      if (!bank) continue;
      cands.push({ topics: order, model: m.topic, bank, items: [...order.map((x) => 'topic:' + x), 'model:' + m.topic, ...bank.map((w) => 'bank:' + w)] });
    }
  } else if (mode === 'teach') {
    for (const ts of subsets(b.teachTopics.map((t) => t.key), 3)) for (const m of b.teachModels) {
      const order = shuffle(ts, rng), tops = order.map((x) => b.teachTopics.find((t) => t.key === x));
      if (tops.some((t) => t.family === m.family)) continue;
      const bank = lv === 1 ? teachBankFor(b, tops, rng) : null;
      if (lv === 1 && !bank) continue;
      // (the word bank follows from the topics: it is not counted as content of its own)
      cands.push({ topics: order, model: m.topic, bank, items: [...order.map((x) => 'topic:' + x), 'model:' + m.topic] });
    }
  } else if (mode === 'moment') {
    for (const ts of subsets(b.moments.map((t) => t.key), 2)) for (const m of b.momentModels) {
      if ((m.notWith || []).some((x) => ts.includes(x))) continue;
      const order = shuffle(ts, rng), faces = shuffle(b.feelings, rng);
      cands.push({ topics: order, model: m.topic, faces, items: [...order.map((x) => 'topic:' + x), 'model:' + m.topic] });
    }
  } else if (mode === 'chair') {
    const usable = b.chairExamples.filter((e) => (lv === 1 ? !CHIP_KIND.test(e.q) : qFits(e.q)));
    for (const e of usable) {
      const qs = shuffle(b.chairQuestions, rng), others = shuffle(usable.filter((x) => x !== e), rng);
      cands.push({ example: e.name, sample: others[0].name, qs, items: ['example:' + e.name, ...(lv === 1 ? ['questions:' + qs.join('|')] : [])] });
    }
    if (lv === 1) for (const e of usable) for (let r = 0; r < 3; r++) { const qs = shuffle(b.chairQuestions, rng), others = shuffle(usable.filter((x) => x !== e), rng); cands.push({ example: e.name, sample: others[0].name, qs, items: ['example:' + e.name, 'questions:' + qs.join('|')] }); }
  }
  const list = [];
  for (const c of shuffle(cands, rng)) { if (list.length === COPIES) break; if (list.every((x) => shared(x.items, c.items) <= 0.75 && x.items.join() !== c.items.join())) list.push(c); }
  if (list.length < 14) throw new Error(`only ${list.length} copies that differ`);
  COPY_CACHE[k] = list;
  return list;
}

/** the anchor of copy N: the Nth of a fixed mixed order of a list (a draw from the page's rng when no copy number is given) */
const anchorOf = (list, mode, lv, variant, rng) => (variant ? shuffle(list, seedRng(31 * (MODES.indexOf(mode) + 1) + 7 * lv + 3))[(variant - 1) % list.length] : shuffle(list, rng)[0]);
/** the places of K-679's right sentences on a page, copy by copy: every place as often as every other over the copies, never one
 *  place on every piece, never a staircase (two choices: never the same place on all three pieces) */
const ASK_PLACES = { 2: [[0, 1, 1], [1, 0, 0], [0, 0, 1], [1, 1, 0], [0, 1, 0], [1, 0, 1]], 3: [[0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1]] };
function drawPage(b, mode, lv, rng, variant) {
  const d = LEVELS[mode][lv];
  const P = b.pics;
  const kindOf = (w) => P[w].kind;
  if (mode === 'opinion') {
    for (let t = 0; t < 500; t++) {
      const first = anchorOf(b.pieces, mode, lv, variant, rng);
      const kinds = new Set([kindOf(first.pic)]), pieces = [first];
      for (const p of shuffle(b.pieces, rng)) { if (pieces.length === d.pieces) break; if (kinds.has(kindOf(p.pic))) continue; kinds.add(kindOf(p.pic)); pieces.push(p); }
      if (pieces.length !== d.pieces) continue;
      shuffle(pieces, rng).forEach((p, i) => { pieces[i] = p; });
      const pairs = [];
      for (const pr of shuffle(b.pairs, rng)) { if (pairs.length === d.pairs) break; if (pr.some((x) => kinds.has(kindOf(x)))) continue; pr.forEach((x) => kinds.add(kindOf(x))); pairs.push(rng.int(0, 1) ? pr : [pr[1], pr[0]]); }
      if (pairs.length !== d.pairs) continue;
      const opFirst = pieces.map(() => rng.int(0, 1) === 1);
      if (d.pieces >= 3 && new Set(opFirst).size < 2) continue;
      // the opinion is the longer PRINTED sentence in some pieces, not in all or none (a reason printed first names its thing)
      const longer = pieces.filter((p, i) => p.op.length > (opFirst[i] ? p.re : p.reFirst || p.re).length).length;
      if (d.pieces >= 3 && (longer === 0 || longer === d.pieces)) continue;
      return { pieces: pieces.map((p, i) => ({ ...p, opFirst: opFirst[i] })), pairs, items: [...pieces.map((p) => 'piece:' + p.title + (opFirst[pieces.indexOf(p)] ? '|o' : '|r')), ...pairs.map((x) => 'pair:' + x.join('/'))] };
    }
    throw new Error('no pieces and pairs');
  }
  if (mode === 'facts') {
    const lay = d.glue ? 'glue' : 'rows';
    for (let t = 0; t < 500; t++) {
      const top = anchorOf(b.factTopics, mode, lv, variant, rng);
      const own = shuffle(top.facts, rng).slice(0, 2);
      const off = shuffle(offCandidates(b, top, d.off), rng)[0];
      if (!off) continue;
      const pairs = labelPairs(b, top, own.map((x) => x[0]), lay);
      if (!pairs.length) continue;
      const pr = shuffle(pairs, rng)[0], lp = pr.lp, rp = pr.rp;
      const at = rng.int(0, 2);
      const sents = own.map((x) => ({ s: x[1], tag: x[0], ok: true })); sents.splice(at, 0, { s: off.s, tag: off.tag, ok: false, about: off.u.key });
      const extra = d.words === 3 ? shuffle(top.noParts, rng)[0] : null;
      const bank = d.words ? shuffle([lp[0], rp[0], ...(extra ? [extra] : [])], rng) : [];
      // the cards to cut out never stand in the order of their boxes (the left box's label is the right card)
      const cards = d.glue ? [rp[0], lp[0]] : [];
      return { top, sents, parts: [lp, rp], sx: pr.sx, lay, bank, extra, cards, items: ['topic:' + top.key, ...sents.map((x) => 'fact:' + x.s), 'parts:' + lp[0] + '|' + rp[0], ...(extra ? ['extra:' + extra] : [])] };
    }
    throw new Error('no fact page');
  }
  if (mode === 'order') {
    for (let t = 0; t < 500; t++) {
      const s = anchorOf(b.stories, mode, lv, variant, rng);
      const sents = d.n === 3 ? s.s3 : s.s4, id = sents.map((_, i) => i);
      const perm = shuffle(id, rng);
      if (perm.join() === id.join() || perm.join() === id.slice().reverse().join()) continue;
      const others = shuffle(b.feelings.filter((x) => x !== s.feel), rng).slice(0, d.faces - 1);
      const faces = shuffle([s.feel, ...others], rng);
      return { story: s, sents, perm, faces, items: ['story:' + s.title, 'order:' + perm.join(''), 'faces:' + faces.join('|')] };
    }
    throw new Error('no story');
  }
  if (mode === 'ask') {
    const PL = ASK_PLACES[d.choices];
    const at = variant ? PL[(variant - 1) % PL.length].slice(0, d.n) : PL[rng.int(0, PL.length - 1)].slice(0, d.n);
    for (let t = 0; t < 2000; t++) {
      const first = anchorOf(b.asks, mode, lv, variant, rng);
      const kinds = new Set([kindOf(first.pic)]), ps = [first];
      for (const a of shuffle(b.asks, rng)) { if (ps.length === d.n) break; if (kinds.has(kindOf(a.pic))) continue; kinds.add(kindOf(a.pic)); ps.push(a); }
      if (ps.length !== d.n) continue;
      shuffle(ps, rng).forEach((a, i) => { ps[i] = a; });
      if (d.n >= 3 && new Set(ps.map((a) => a.q)).size < 2) continue;
      const out = ps.map((a, i) => {
        const otherKinds = shuffle(['color', 'where', 'who', 'sound'].filter((k) => k !== a.q), rng);
        const wrong = d.same ? [{ kind: otherKinds[0], s: a.answers[otherKinds[0]] }, { kind: 'same', s: a.same }] : otherKinds.slice(0, d.choices - 1).map((k) => ({ kind: k, s: a.answers[k] }));
        const opts = shuffle(wrong, rng); opts.splice(at[i], 0, { kind: a.q, s: a.answers[a.q], ok: true });
        return { ...a, opts };
      });
      // the right sentence is not the one to find by its length: with three choices it is the longest in one piece at the most
      // and the shortest likewise; with two it is the longer in some pieces and the shorter in others
      const longest = out.filter((a) => a.opts.every((o) => o.ok || o.s.length < a.answers[a.q].length)).length;
      const shortest = out.filter((a) => a.opts.every((o) => o.ok || o.s.length > a.answers[a.q].length)).length;
      if (d.choices === 3 ? (longest > 1 || shortest > 1) : (!longest || !shortest)) continue;
      return { pieces: out, at, items: out.map((a) => 'ask:' + a.text + '|' + a.opts.map((o) => o.kind).join('-')) };
    }
    throw new Error('no pieces to add to');
  }
  // the pages of the child's own piece: copy N of the fixed list (a draw from ctx.rng when no copy number is given)
  const list = copyList(b, mode, lv);
  const c = variant ? list[(variant - 1) % list.length] : list[rng.int(0, list.length - 1)];
  if (mode === 'myfav') {
    const topics = c.topics.map((x) => b.favTopics.find((t) => t.key === x));
    return { topics, model: b.favModels.find((m) => m.topic === c.model), bank: c.bank, items: c.items };
  }
  if (mode === 'teach') {
    const topics = c.topics.map((x) => b.teachTopics.find((t) => t.key === x));
    return { topics, model: b.teachModels.find((m) => m.topic === c.model), bank: c.bank, items: c.items };
  }
  if (mode === 'moment') {
    const topics = c.topics.map((x) => b.moments.find((t) => t.key === x));
    return { topics, model: b.momentModels.find((m) => m.topic === c.model), faces: c.faces, items: c.items };
  }
  if (mode === 'chair') {
    return { example: b.chairExamples.find((e) => e.name === c.example), sample: b.chairExamples.find((e) => e.name === c.sample), qs: c.qs, items: c.items };
  }
  throw new Error('draw-and-write-k: unknown mode ' + mode);
}

{ const fb = dwkFaultsOf(BANK); if (fb.length) throw new Error('draw-and-write-k.en.json: ' + fb.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
/** an f before i, f, l or t and a t before t get a little room of their own (text inside tags, <svg> and <style> is left alone) */
function fRoom(html) {
  let out = '', i = 0, inSvg = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); const tag = html.slice(i, j + 1); if (/^<svg\b/i.test(tag)) inSvg++; else if (/^<\/svg>/i.test(tag)) inSvg--; out += tag; i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += inSvg ? text : text.replace(/f(?=[iflt])|t(?=t)/g, (m) => `<span data-lcs-fsep style="margin-right:0.07em">${m}</span>`);
    i = j < 0 ? html.length : j;
  }
  return out;
}
/** the same room inside a writing row's svg text (a key's sample) */
function svgRoom(html) {
  return html.replace(/(<text\b[^>]*\bfont-size="([\d.]+)"[^>]*>)([^<]*)(<\/text>)/g, (m, open, fsz, body, close) => open + body.replace(/(?<=[ft])([iflt])/g, (c) => `<tspan dx="${(0.07 * +fsz).toFixed(2)}" data-lcs-fsep>${c}</tspan>`) + close);
}
const img = (k, size, more = '') => `<img class="ws-icon" data-lcs-pic="${attr(k)}" data-lcs-pickind="${attr(BANK.pics[k].kind)}" src="${fileUri(BANK.pics[k].pic[0], BANK.pics[k].pic[1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain;${more}">`;
/** K-675's picture cut to the box of its ink (object-view-box), w x h px: no empty band of the picture's own above or below */
const cropImg = (t, w, h) => { const [x0, y0, x1, y1] = t.ink, pc = (v) => (v * 100).toFixed(2) + '%';
  return `<img class="ws-icon" data-lcs-pic="${attr(t.key)}" data-lcs-pickind="${attr(BANK.pics[t.key].kind)}" data-lcs-crop="${t.ink.join(',')}" src="${fileUri(BANK.pics[t.key].pic[0], BANK.pics[t.key].pic[1])}" alt="" style="display:block;width:${w.toFixed(1)}px;height:${h.toFixed(1)}px;object-fit:contain;object-view-box:inset(${pc(y0)} ${pc(1 - x1)} ${pc(1 - y1)} ${pc(x0)})">`; };
/** the small check mark and X that follow "yes" and "no" in K-675's task line */
const tinyMark = (k) => `<svg data-lcs-tinymark="${k}" width="20" height="20" viewBox="0 0 20 20" style="display:inline-block;vertical-align:-3px;margin-left:3px">${k === 'check' ? `<path d="M3 11 L8 16 L17 4" fill="none" stroke="${T.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M4 4 L16 16 M16 4 L4 16" fill="none" stroke="${T.ink}" stroke-width="3" stroke-linecap="round"/>`}</svg>`;
const card = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (k, html, nowrap) => `<div data-lcs-label data-lcs-read style="${nowrap ? 'flex:0 0 auto;white-space:nowrap;' : ''}font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal}">${k}.</span> ${html}</div>`;
const badge = (n) => `<span data-lcs-badge style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 17px/1 'Nunito',sans-serif">${n}</span>`;
/** a box for ONE number or mark (72 px); the key prints it in teal */
const markBox = (attrs, text) => `<span ${attrs} style="flex:0 0 auto;box-sizing:border-box;width:${BOX}px;height:${BOX}px;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:12px;background:#FFFFFF;font:800 46px/1 'Nunito',sans-serif;color:${T.teal}">${text}</span>`;
/** the key's ring around a word, a picture or a sentence; the key's line under a sentence */
const ring = (inset = '-6px -8px', radius = '999px') => { const [v, h] = inset.split(' '); return `<span data-lcs-ring style="position:absolute;left:${h};right:${h};top:${v};bottom:${v};border:3.5px solid ${T.teal};border-radius:${radius};pointer-events:none"></span>`; };
const underline = () => `<span data-lcs-uline style="position:absolute;left:0;right:0;bottom:-5px;height:0;border-top:4px solid ${T.teal};pointer-events:none"></span>`;
/** a check mark and an X drawn in teal (the key's marks) */
const CHECKMARK = `<svg data-lcs-keymark="check" width="44" height="44" viewBox="0 0 44 44" style="display:block"><path d="M7 23 L18 34 L37 10" fill="none" stroke="${T.teal}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const XMARK = `<svg data-lcs-keymark="x" width="40" height="40" viewBox="0 0 40 40" style="display:block"><path d="M8 8 L32 32 M32 8 L8 32" fill="none" stroke="${T.teal}" stroke-width="6" stroke-linecap="round"/></svg>`;
/** a writing row w wide; `answer` (the key) seated on it in teal; `letters` is what the blank must hold (in letters) */
function row(w, role, { answer, letters, h = ROW } = {}) {
  const base = rowSvg(Math.round(w), h);
  const svg = answer ? seatOnRow(base, answer, { fill: T.teal, em: Math.max(0.56, (emOf(answer) / Math.max(1, answer.length)) * 1.05) }) : base;
  return `<div data-lcs-line data-lcs-blank="${role}"${letters ? ` data-lcs-need="${letters}"` : ''}${answer ? ` data-lcs-answer="${attr(answer)}"` : ''} style="flex:0 0 auto;line-height:0">${svg}</div>`;
}
/** printed words standing on a row's base rule beside it (Nunito, line-height 1: the baseline is 0.171 em above the box's foot) */
const onRow = (text, px = FRAME_PX, attrs = '') => `<span ${attrs} data-lcs-read data-lcs-frameword style="flex:0 0 auto;padding-bottom:${Math.max(0, Math.round(ROW - baseOf(300, ROW) - 0.171 * px))}px;font:800 ${px}px/1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(text)}</span>`;
/** a frame row: printed words and blanks in order (a part is a string, or { b: role, need: letters } a blank); every blank
 *  but the last is as wide as its need (+ 6 px), the last one takes the rest of the width; the key seats its samples in the
 *  blanks (answers, one for each blank) */
function frameRow(parts, width, { answers, n, attrs = '' } = {}) {
  const GAP = 6, nb = n ? 36 : 0;
  const fixed = parts.reduce((a, p) => a + (typeof p === 'string' ? Math.ceil(pxOf(p, FRAME_PX)) + 2 : 0), 0);
  const blanks = parts.filter((p) => typeof p !== 'string');
  const sized = blanks.slice(0, -1).reduce((a, p) => a + p.need * LETTER + 6, 0);
  const last = width - nb - fixed - sized - GAP * (parts.length - 1) - 4;
  let bi = 0;
  const words = parts.filter((p) => typeof p === 'string');
  const roles = blanks.map((p) => p.b);
  return `<div data-lcs-frame="${roles.join('+')}" data-lcs-framewords="${attr(words.join('|'))}" ${attrs} style="display:flex;align-items:flex-end;gap:${GAP}px">` +
    (n ? `<span style="flex:0 0 auto;align-self:flex-end;margin-bottom:${Math.round(ROW - baseOf(300, ROW) - 4)}px;margin-right:2px">${badge(n)}</span>` : '') +
    parts.map((p) => { if (typeof p === 'string') return onRow(p, FRAME_PX, /^[.]$/.test(p) ? 'data-lcs-endmark' : '');
      const i = bi++, w = i < blanks.length - 1 ? p.need * LETTER + 6 : last;
      return row(w, p.b, { answer: answers ? answers[i] : null, letters: p.need }); }).join('') + `</div>`;
}
/** a box to draw in (empty by design: labeled by its task line, counted as printed by the band check) */
const drawBox = (attrs, more = '', inner = '') => `<div data-lcs-drawbox ${attrs} style="position:relative;box-sizing:border-box;border:3px dashed ${T.teal};border-radius:14px;background:#FFFFFF;${more}">${inner}</div>`;
/** the key's note inside a box to draw in */
const keyNote = (lines, px = 17, inset = 12) => `<div data-lcs-keynote style="position:absolute;left:${inset}px;right:${inset}px;top:${inset - 2}px;display:flex;flex-direction:column;gap:4px">${lines.map((x) => `<div data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.teal}">${esc(x)}</div>`).join('')}</div>`;
/** a chip to circle: a picture and its word (two short lines when `narrow` px is given), or only words (my own: a dashed
 *  box with a question mark) */
const chip = (attrs, picKey, word, key, ok, narrow, ownSize = PIC) => `<div ${attrs} data-lcs-chip="${attr(word)}" style="position:relative;flex:0 0 auto;display:flex;align-items:center;gap:5px;padding:3px 9px 3px 4px;border-radius:14px;background:#FFFFFF">` +
  (picKey ? img(picKey, PIC) : `<span data-lcs-ownmark style="flex:0 0 auto;width:${ownSize}px;height:${ownSize}px;box-sizing:border-box;border:2.5px dashed ${T.inkSoft};border-radius:10px;display:flex;align-items:center;justify-content:center;font:800 30px/1 'Nunito',sans-serif;color:${T.inkSoft}">?</span>`) +
  `<span data-lcs-read data-lcs-choice style="${narrow ? `max-width:${narrow}px;` : 'white-space:nowrap;'}font:800 ${narrow ? 20 : 21}px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(word)}</span>${key && ok ? ring('-3px -3px', '16px') : ''}</div>`;
/** the icons of the checklists (drawn, no library picture) */
const ICON = {
  crayon: `<g transform="rotate(-38 24 24)"><rect x="7" y="18" width="27" height="12" rx="2" fill="${T.coral}" stroke="${T.teal}" stroke-width="2.4"/><path d="M34 18 L43 24 L34 30 Z" fill="${T.coral}" stroke="${T.teal}" stroke-width="2.4" stroke-linejoin="round"/><path d="M13 18 V30 M28 18 V30" stroke="${T.teal}" stroke-width="2.2"/></g>`,
  pencil: `<g transform="rotate(-38 24 24)"><rect x="9" y="18" width="23" height="12" fill="${T.creamDeep}" stroke="${T.teal}" stroke-width="2.4"/><path d="M32 18 L43 24 L32 30 Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.4" stroke-linejoin="round"/><path d="M39.5 22 L43 24 L39.5 26 Z" fill="${T.ink}"/><rect x="3" y="18" width="6" height="12" rx="2" fill="${T.coralSoft}" stroke="${T.teal}" stroke-width="2.4"/></g>`,
  why: `<path d="M6 10 Q6 5 11 5 L37 5 Q42 5 42 10 L42 28 Q42 33 37 33 L20 33 L11 41 L13 33 L11 33 Q6 33 6 28 Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/><text x="24" y="27" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="22" fill="${T.teal}">?</text>`,
  topic: `<rect x="5" y="9" width="38" height="28" rx="6" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/><path d="M12 19 H36 M12 27 H28" stroke="${T.teal}" stroke-width="3" stroke-linecap="round"/>`,
  tag: `<path d="M8 12 L28 12 L40 24 L28 36 L8 36 Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="29" cy="24" r="3" fill="${T.teal}"/><path d="M14 20 H22 M14 28 H20" stroke="${T.teal}" stroke-width="2.5" stroke-linecap="round"/>`,
  three: `<rect x="3" y="15" width="12" height="16" rx="2" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/><rect x="18" y="15" width="12" height="16" rx="2" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/><rect x="33" y="15" width="12" height="16" rx="2" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/>`,
  smile: `<circle cx="24" cy="24" r="18" fill="${T.cream}" stroke="${T.teal}" stroke-width="2.5"/><circle cx="18" cy="20" r="2.4" fill="${T.teal}"/><circle cx="30" cy="20" r="2.4" fill="${T.teal}"/><path d="M15 28 Q24 36 33 28" fill="none" stroke="${T.teal}" stroke-width="2.6" stroke-linecap="round"/>`,
  speak: `<path d="M6 10 Q6 5 11 5 L37 5 Q42 5 42 10 L42 28 Q42 33 37 33 L20 33 L11 41 L13 33 L11 33 Q6 33 6 28 Z" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 16 H34 M14 23 H28" stroke="${T.teal}" stroke-width="3" stroke-linecap="round"/>`,
  ear: `<path d="M30 40 Q22 44 20 36 Q19 31 15 27 Q9 21 11 13 Q14 5 23 5 Q34 5 36 15 Q37 22 32 27 Q29 30 30 34" fill="#FBE3D8" stroke="${T.teal}" stroke-width="2.5" stroke-linejoin="round"/><path d="M19 15 Q23 10 28 14 Q31 18 27 22" fill="none" stroke="${T.teal}" stroke-width="2.3" stroke-linecap="round"/>`,
  plus: `<circle cx="24" cy="24" r="18" fill="#FFFFFF" stroke="${T.teal}" stroke-width="2.5"/><path d="M24 14 V34 M14 24 H34" stroke="${T.coral}" stroke-width="4.5" stroke-linecap="round"/>`,
};
const icon = (k) => `<svg data-lcs-icon="${k}" width="40" height="40" viewBox="0 0 48 48" style="flex:0 0 auto;display:block">${ICON[k]}</svg>`;
/** the checklist at the foot: its task line, then its items (a picture, the words, a box of 40 px); with two items the task
 *  line stands at the left of the items */
function checklist(mode, k) {
  const items = CHECK[mode];
  const its = `<div data-lcs-checklist style="flex:1 1 auto;display:grid;grid-template-columns:repeat(${items.length},1fr);gap:8px">` + items.map(([ic, t]) => `<div data-lcs-check="${ic}" style="display:flex;align-items:center;gap:5px;padding:2px 6px;border-radius:12px;background:#FFFFFF">${icon(ic)}<span data-lcs-read data-lcs-checktext style="flex:1 1 auto;font:700 16px/1.12 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span><span data-lcs-checkbox style="flex:0 0 auto;box-sizing:border-box;width:40px;height:40px;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF"></span></div>`).join('') + `</div>`;
  const L = LINES[mode][1];
  return items.length === 2
    ? card(`data-lcs-task="check"`, `<div style="display:flex;align-items:center;gap:10px"><div style="flex:0 0 250px">${label(k, esc(L[L.length - 1]))}</div>${its}</div>`, 3, 2)
    : card(`data-lcs-task="check"`, label(k, esc(L[L.length - 1])) + its, 3, 2);
}
/** a word bank: the words in a row of chips */
const wordBank = (words, attrs = '', head = WORDS.bank) => `<div data-lcs-bank ${attrs} style="flex:0 0 auto;display:flex;flex-wrap:nowrap;align-items:center;gap:6px 8px"><span data-lcs-read data-lcs-bankhead style="font:800 18px/1.2 'Nunito',sans-serif;color:${T.teal};white-space:nowrap">${esc(head)}</span>` +
  words.map((w) => `<span data-lcs-bankword="${attr(w)}" data-lcs-read style="padding:0 8px;border:2px solid ${T.grid};border-radius:10px;background:#FFFFFF;font:800 21px/1.25 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(w)}</span>`).join('') + `</div>`;
/** the grey model line (a worked example on a topic the page does not offer) */
const modelLine = (text, attrs = '') => `<div data-lcs-model ${attrs} data-lcs-read style="font:700 17px/1.3 'Nunito',sans-serif;color:${T.inkSoft}"><b style="font-weight:800">${esc(WORDS.like)}</b> ${esc(text)}</div>`;
/** the face of a feeling, with its word (or without) */
const face = (fe, size, withWord, key, ok, attrs = '', wordPx = 21) => `<div ${attrs} data-lcs-face="${fe}" style="position:relative;flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:1px;padding:${wordPx < 20 ? '1px 2px' : '4px 8px'}">${img(fe, size)}${withWord ? `<span data-lcs-read data-lcs-faceword style="font:800 ${wordPx}px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(BANK.pics[fe].word)}</span>` : ''}${key && ok ? ring('-2px -2px', '18px') : ''}</div>`;
/** a pair of scissors at the start of a cut line */
const SCISSORS = `<svg data-lcs-scissors width="24" height="22" viewBox="0 0 24 22" style="position:absolute;left:-26px;top:-12px;display:block"><circle cx="5" cy="5" r="3.6" fill="none" stroke="${T.inkSoft}" stroke-width="2.2"/><circle cx="5" cy="17" r="3.6" fill="none" stroke="${T.inkSoft}" stroke-width="2.2"/><path d="M8 7.5 L22 15 M8 14.5 L22 7" stroke="${T.inkSoft}" stroke-width="2.2" stroke-linecap="round"/></svg>`;

/* ---------------------------------------------------------------- the blocks of each page ---------------------------------------------------------------- */
function renderPage(plan, mode, lv, d, key) {
  const blocks = [];
  const L = LINES[mode][lv];
  let rootAttr = '';

  if (mode === 'opinion') {
    // 1. rows of two things of one kind: circle the one you like best
    const pairRow = (pr, r) => `<div data-lcs-pair="${r + 1}" style="flex:1 1 auto;display:flex;align-items:center;gap:10px;padding:4px 12px;border-radius:12px;background:#FFFFFF">${badge(r + 1)}` +
      `<div style="flex:1 1 auto;display:flex;justify-content:space-evenly;align-items:center">` + pr.map((x, i) => `<div data-lcs-thing="${attr(x)}" style="position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;padding:2px 10px">${img(x, d.pic)}<span data-lcs-read data-lcs-choice style="font:800 22px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(BANK.pics[x].word)}</span></div>` + (i === 0 ? `<span data-lcs-read style="font:700 20px/1 'Nunito',sans-serif;color:${T.inkSoft}">or</span>` : '')).join('') + `</div></div>`;
    const anyKey = key ? `<div data-lcs-keyany data-lcs-read style="position:absolute;right:14px;top:9px;font:800 17px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(WORDS.keyAny)}</div>` : '';
    blocks.push(card('data-lcs-task="pairs"', label(1, esc(L[0])) + anyKey + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:6px">${plan.pairs.map(pairRow).join('')}</div>`, 6, 4, 'flex:1 1 auto;position:relative;'));
    // 2. the pieces: the opinion first or the reason first (a reason printed before the opinion names its thing), after the
    //    topic sentence on level 3
    const sent = (s, role) => `<div data-lcs-sentwrap style="display:flex"><span data-lcs-psent="${role}" data-lcs-read style="position:relative;font:700 ${d.font}px/1.35 'Nunito',sans-serif;color:${T.ink};padding:0 4px">${esc(s)}${key && role === 'op' ? ring('-3px -6px') : ''}${key && role === 're' ? underline() : ''}</span></div>`;
    const piece = (p, k) => { const two = p.opFirst ? [[p.op, 'op'], [p.re, 're']] : [[p.reFirst || p.re, 're'], [p.op, 'op']];
      const ss = (d.topic ? [[p.topic, 'topic']] : []).concat(two);
      return `<div data-lcs-piece="${k + 1}" data-lcs-order="${ss.map((x) => x[1]).join('-')}" data-lcs-title="${attr(p.title)}" style="flex:1 1 auto;display:flex;align-items:center;gap:14px;padding:8px 12px;border-radius:12px;background:#FFFFFF;border-left:6px solid ${T.tealSoft}">${badge(k + 1)}${img(p.pic, d.ppic)}` +
        `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:4px"><div data-lcs-ptitle data-lcs-read style="font:800 19px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(p.title)} <span style="font-weight:700;color:${T.inkSoft}">${esc(WORDS.by)} ${esc(p.name)}</span></div>${ss.map(([s, r]) => sent(s, r)).join('')}</div></div>`; };
    blocks.push(card('data-lcs-task="pieces"', label(2, esc(L[1])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${plan.pieces.map(piece).join('')}</div>`, 6, 4, 'flex:2 1 auto;'));
  }

  if (mode === 'myfav') {
    const tops = plan.topics, sample = tops[0];
    // 1. the topics to circle and "my own" (a column of chips) beside the box to draw in
    const chips = `<div data-lcs-chips style="flex:0 0 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:4px">` +
      tops.map((t, i) => chip(`data-lcs-topicchip="${i}"`, t.pic, BANK.pics[t.pic].word, key, i === 0)).join('') + chip('data-lcs-topicchip="own"', null, WORDS.own, false, false, 0, 40) + `</div>`;
    const kn = key ? keyNote([`Sample (${sample.key}): the child draws a favorite ${sample.key}. Any choice is right.`, WORDS.keySpell]) : '';
    blocks.push(card('data-lcs-task="draw"', label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;gap:12px;min-height:0">${chips}${drawBox('data-lcs-drawrole="favorite"', 'flex:1 1 auto', kn)}</div>`, 4, 3, 'flex:1 1 auto;'));
    // 2. the rows (frames on level 1, starters on level 2, I and open rows on level 3), the word bank, the grey model
    const fr = FRAMES.myfav[lv];
    const w3 = wrapRows(sample.l3.replace(/^I /, ''), FIT.rows3) || [];
    const samp = lv === 1 ? [[sample.key], [sample.answer], [sample.reason]] : lv === 2 ? sample.l2.map((x) => [x]) : [0, 1, 2].map((i) => [w3[i] || null]);
    const rows = fr.map((parts, i) => frameRow(parts, INNER, { answers: key ? samp[i] : null })).join('');
    const head = lv === 1 ? `<div style="display:flex;flex-direction:column;gap:0">${label(2, esc(L[1]))}${wordBank(plan.bank, '', WORDS.bankOwn)}</div>`
      : lv === 3 ? `<div style="display:flex;align-items:center;gap:14px">${label(2, esc(L[1]), true)}${wordBank(BANK.favBank)}</div>` : label(2, esc(L[1]));
    blocks.push(card('data-lcs-task="write"', head + modelLine(lv === 3 ? plan.model.l3 : plan.model.op, `data-lcs-modeltopic="${attr(plan.model.topic)}"`) + `<div data-lcs-rows style="display:flex;flex-direction:column">${rows}</div>`, 3, 1));
    blocks.push(checklist(mode, 3));
    rootAttr = ` data-lcs-sample="${attr(sample.key)}"`;
  }

  if (mode === 'teach') {
    const tops = plan.topics, sample = tops[0];
    // 1. the topics to circle (three pictures and my own) 2. the box to draw in, two rows for labels beside it
    const chips = tops.map((t, i) => chip(`data-lcs-topicchip="${i}"`, t.key, BANK.pics[t.key].word, key, i === 0)).join('') + chip('data-lcs-topicchip="own"', null, WORDS.own, false, false);
    const kn = key ? keyNote([`Sample (${sample.key}): the child draws a ${sample.key} and labels two parts.`, WORDS.keySpell]) : '';
    const LBW = ROW_W.label;
    const labels = `<div data-lcs-labelrows style="flex:0 0 ${LBW}px;display:flex;flex-direction:column;justify-content:center;gap:2px">` +
      [0, 1].map((i) => `<div data-lcs-labelrow="${i + 1}">${row(LBW, 'label', { letters: FIT.label, answer: key ? sample.labels[i] : null })}</div>`).join('') + `</div>`;
    blocks.push(card('data-lcs-task="draw"', `<div style="display:flex;align-items:center;gap:10px">${label(1, esc(L[0]), true)}<div data-lcs-chips style="flex:1 1 auto;display:flex;justify-content:space-evenly;gap:6px">${chips}</div></div>` + label(2, esc(L[1])) +
      `<div style="flex:1 1 auto;display:flex;gap:12px;min-height:0">${drawBox('data-lcs-drawrole="topic"', 'flex:1 1 auto', kn)}${labels}</div>`, 6, 4, 'flex:1 1 auto;'));
    // 3. the rows: "A ___ can ___" and "A ___ has ___" (levels 1 and 2), A and an open row (level 3)
    const fr = FRAMES.teach[lv];
    const samp = lv <= 2 ? [[sample.key, sample.sample[0]], [sample.key, sample.sample[1]]] : sample.l3.map((x) => [x]);
    const rows = fr.map((parts, i) => frameRow(parts, INNER, { answers: key ? samp[i] : null })).join('');
    const bankRow = (h, ws) => `<div style="display:flex;align-items:center;gap:7px"><span data-lcs-read style="font:800 18px/1.2 'Nunito',sans-serif;color:${T.teal};width:42px">${esc(h)}</span>${ws.map((w) => `<span data-lcs-bankword="${attr(w)}" data-lcs-read style="padding:1px 9px;border:2px solid ${T.grid};border-radius:10px;background:#FFFFFF;font:800 21px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</span>`).join('')}</div>`;
    const head = lv === 1 ? `<div style="display:flex;align-items:center;gap:16px">${label(3, esc(L[2]), true)}<div data-lcs-bank data-lcs-teachbank style="display:flex;flex-direction:column;gap:3px">${bankRow('can:', plan.bank.can)}${bankRow('has:', plan.bank.has)}</div></div>`
      : lv === 3 ? `<div style="display:flex;align-items:center;gap:14px">${label(3, esc(L[2]), true)}${wordBank(BANK.teachBank)}</div>` : label(3, esc(L[2]));
    const m = plan.model, mtext = `A ${m.topic} can ${m.can}. ${lv === 3 ? 'It' : 'A ' + m.topic} has ${m.has}.`;
    blocks.push(card('data-lcs-task="write"', head + modelLine(mtext, `data-lcs-modeltopic="${attr(m.topic)}"`) + `<div data-lcs-rows style="display:flex;flex-direction:column">${rows}</div>`, 6, 2));
    blocks.push(checklist(mode, 4));
    rootAttr = ` data-lcs-sample="${attr(sample.key)}"`;
  }

  if (mode === 'facts') {
    const t = plan.top;
    rootAttr = ` data-lcs-topic="${attr(t.key)}"`;
    const L0 = esc(L[0].replace('{T}', t.name)).replace('(yes)', '(yes' + tinyMark('check') + ')').replace('(no)', '(no' + tinyMark('x') + ')'), L1 = esc(L[1].replace('{T}', t.name));
    // 1. the sentences
    const srow = (x, i) => `<div data-lcs-fact="${i + 1}" data-lcs-ok="${x.ok ? 1 : 0}" data-lcs-text="${attr(x.s)}" style="flex:1 1 auto;display:flex;align-items:center;gap:12px;padding:4px 12px;border-radius:12px;background:#FFFFFF">${badge(i + 1)}` +
      `<span data-lcs-read data-lcs-facttext style="flex:1 1 auto;font:700 26px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x.s)}</span>${markBox('data-lcs-markbox', key ? (x.ok ? CHECKMARK : XMARK) : '')}</div>`;
    blocks.push(card('data-lcs-task="facts"', label(1, L0) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${plan.sents.map(srow).join('')}</div>`, 6, 4, 'flex:1 1 auto;'));
    // 2. the picture (cut to its ink), its two homes and the lines to their parts (each line starts on its home's top, reaches
    //    its dot from below and crosses no ink of the picture)
    const g = factGeo(t, plan.lay), AW = INNER, y1 = g.homeTop + g.L.top0;
    const lines = plan.parts.map(([w, , x, y], i) => { const [x2, y2] = dotXY(g, x, y), x1 = plan.sx[i];
      return `<line data-lcs-pointer="${i}" data-lcs-part="${attr(w)}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${T.ink}" stroke-width="3" stroke-linecap="round"/><circle data-lcs-partdot="${i}" cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="${DOT_R}" fill="${T.coral}" stroke="${T.ink}" stroke-width="2"/>`; }).join('');
    const home = (i) => { const w = plan.parts[i][0];
      return `<div data-lcs-home="${i}" data-lcs-homepart="${attr(w)}" style="position:absolute;left:${g.hx[i].toFixed(1)}px;top:${g.homeTop.toFixed(1)}px;width:${g.L.homeW}px;height:${g.L.homeH}px">` +
        (plan.lay === 'glue' ? `<div data-lcs-glue style="box-sizing:border-box;width:100%;height:100%;border:2.5px dashed ${T.grid};border-radius:10px;background:#FFFFFF;display:flex;align-items:center;justify-content:center">${key ? `<span data-lcs-keylabel="${attr(w)}" data-lcs-read style="font:800 30px/1 'Nunito',sans-serif;color:${T.teal}">${esc(w)}</span>` : ''}</div>`
          : row(g.L.homeW, 'label', { answer: key ? w : null, letters: FIT.part })) + `</div>`; };
    const H = g.homeTop + g.L.homeH;
    const area = `<div data-lcs-labelarea style="position:relative;align-self:center;width:${AW}px;height:${H.toFixed(1)}px">` +
      `<div data-lcs-picwrap style="position:absolute;left:${g.picL.toFixed(1)}px;top:0;width:${g.pw.toFixed(1)}px;height:${g.ph.toFixed(1)}px">${cropImg(t, g.pw, g.ph)}</div>` +
      `<svg data-lcs-pointers style="position:absolute;left:0;top:0;overflow:visible" width="${AW}" height="${H.toFixed(1)}" viewBox="0 0 ${AW} ${H.toFixed(1)}">${lines}</svg>${home(0)}${home(1)}</div>`;
    const bank = d.words ? wordBank(plan.bank, 'data-lcs-labelbank') : '';
    blocks.push(card('data-lcs-task="labels"', (bank ? `<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">${label(2, L1)}${bank}</div>` : label(2, L1)) + `<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:center">${area}</div>`, 6, 4, 'flex:0 0 auto;'));
    if (d.glue) {
      blocks.push(`<div data-lcs-cutstrip style="flex:0 0 auto;display:flex;flex-direction:column;gap:6px;padding:0 12px 4px">` +
        `<div data-lcs-cutline style="position:relative;height:0;margin:10px 0 2px 28px;border-top:2.5px dashed ${T.inkSoft}">${SCISSORS}</div>` +
        `<div style="display:flex;justify-content:center"><div data-lcs-cardgrid style="display:flex;border-top:2px dashed ${T.ink};border-left:2px dashed ${T.ink}">` +
        plan.cards.map((w) => `<div data-lcs-card="${attr(w)}" data-lcs-read style="box-sizing:border-box;width:${CARD_W}px;height:${CARD_H}px;display:flex;align-items:center;justify-content:center;border-right:2px dashed ${T.ink};border-bottom:2px dashed ${T.ink};background:#FFFFFF;font:800 30px/1 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</div>`).join('') + `</div></div></div>`);
    }
  }

  if (mode === 'order') {
    const s = plan.story;
    rootAttr = ` data-lcs-story="${attr(s.title)}"`;
    const srow = (pi, i) => `<div data-lcs-step="${i + 1}" data-lcs-true="${pi + 1}" data-lcs-text="${attr(plan.sents[pi])}" style="flex:1 1 auto;display:flex;align-items:center;gap:14px;padding:4px 12px;border-radius:12px;background:#FFFFFF">${markBox('data-lcs-numbox', key ? String(pi + 1) : '')}` +
      `<span data-lcs-read data-lcs-steptext style="flex:1 1 auto;font:700 25px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(plan.sents[pi])}</span></div>`;
    blocks.push(card('data-lcs-task="order"', label(1, esc(L[0])) + `<div data-lcs-storytitle data-lcs-read style="font:800 21px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(s.title)} <span style="font-weight:700;color:${T.inkSoft}">${esc(WORDS.by)} ${esc(s.name)}</span></div>` +
      `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${plan.perm.map(srow).join('')}</div>`, 6, 4, 'flex:1 1 auto;'));
    blocks.push(card('data-lcs-task="feel"', label(2, esc(L[1].replace('{N}', s.name))) + `<div data-lcs-faces style="display:flex;justify-content:space-evenly">${plan.faces.map((fe) => face(fe, 84, true, key, fe === s.feel)).join('')}</div>`, 6, 4));
    blocks.push(card('data-lcs-task="drawlast"', label(3, esc(L[2])) + drawBox('data-lcs-drawrole="last"', 'flex:1 1 auto;min-height:150px', key ? keyNote([`The child draws: ${plan.sents[plan.sents.length - 1]}`, WORDS.keyDraw]) : ''), 6, 4, 'flex:1 1 auto;'));
  }

  if (mode === 'moment') {
    const tops = plan.topics, sample = tops[0];
    // 1. two moments to circle, and my own
    const chips = tops.map((t, i) => chip(`data-lcs-topicchip="${i}"`, t.pic, t.chip, key, i === 0, 96)).join('') + chip('data-lcs-topicchip="own"', null, WORDS.own, false, false);
    blocks.push(card('data-lcs-task="choose"', `<div style="display:flex;align-items:center;gap:10px">${label(1, esc(L[0]), true)}<div data-lcs-chips style="flex:1 1 auto;display:flex;justify-content:space-evenly;gap:6px">${chips}</div></div>`, 4, 2));
    // the key's notes, one in each box: the sample (any drawing is right), that sounded-out spelling is right, that any feeling
    // word is right
    const kn = (i) => (key ? keyNote([[`Sample (${sample.chip}): ${WORDS.keyDrawAny}` + (lv === 1 ? ' ' + sample.l2.map((x, j) => `${j + 1} I ${x}.`).join(' ') : '')], [WORDS.keySpell], [WORDS.keyFeel]][i], lv === 1 ? 17 : 16, lv === 1 ? 12 : 7) : '');
    const fr = FRAMES.moment;
    const m = plan.model, mtext = lv === 1 ? `I ${m.s[2]}. I felt ${m.feel}.` : `${m.s.map((x) => 'I ' + x + '.').join(' ')} I felt ${m.feel}.`;
    const model = modelLine(mtext, `data-lcs-modeltopic="${attr(m.topic)}"`);
    // the row "I felt ___" and the four faces beside it
    const felt = `<div data-lcs-feltrow style="display:flex;align-items:flex-end;gap:8px">${frameRow(fr.felt, 380, { answers: key ? [sample.feel] : null })}` +
      `<div data-lcs-faces style="flex:1 1 auto;display:flex;justify-content:space-evenly;align-self:center">${plan.faces.map((fe) => face(fe, PIC, d.faceWords, false, false, '', 16)).join('')}</div></div>`;
    const cap = (i) => `<div data-lcs-cap="${i + 1}" style="display:flex;align-items:center;gap:6px">${badge(i + 1)}<span data-lcs-read data-lcs-boxword style="font:800 19px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(WORDS.box[i])}</span>` +
      (lv === 3 && i === 0 ? `<span style="flex:1 1 auto"></span>${wordBank(BANK.momentBank)}` : '') + `</div>`;
    if (lv === 1) {
      // 2. three boxes in a row (first, next, last) 3. one row for the last box, and the feeling
      const boxes = `<div data-lcs-boxes style="flex:1 1 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;min-height:0">` + [0, 1, 2].map((i) =>
        `<div data-lcs-mbox="${i + 1}" style="display:flex;flex-direction:column;gap:3px;min-height:0">${cap(i)}${drawBox(`data-lcs-drawrole="part${i + 1}"`, 'flex:1 1 auto;min-height:0', kn(i))}</div>`).join('') + `</div>`;
      blocks.push(card('data-lcs-task="draw"', label(2, esc(L[1])) + boxes, 6, 4, 'flex:1 1 auto;'));
      blocks.push(card('data-lcs-task="write"', label(3, esc(L[2])) + model + `<div data-lcs-rows style="display:flex;flex-direction:column">${frameRow(fr.last, INNER, { n: 3, answers: key ? [sample.l2[2]] : null })}</div>` + felt, 6, 2));
    } else {
      // 2. three bands, one under the other: a small box to draw in, and beside it its number, its word and a row "I ___"
      //    (level 3: the word bank beside "First")
      const BOXW = 150;
      const bands = [0, 1, 2].map((i) => `<div data-lcs-mbox="${i + 1}" style="flex:1 1 0;display:flex;gap:12px;min-height:0">${drawBox(`data-lcs-drawrole="part${i + 1}"`, `flex:0 0 ${BOXW}px`, kn(i))}` +
        `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:flex-end">${cap(i)}<div data-lcs-rows>${frameRow(fr.band, INNER - BOXW - 12, { answers: key ? [sample.l2[i]] : null })}</div></div></div>`).join('');
      blocks.push(card('data-lcs-task="draw"', label(2, esc(L[1])) + model + `<div data-lcs-bands style="flex:1 1 auto;display:flex;flex-direction:column;gap:6px;min-height:0">${bands}</div>`, 6, 3, 'flex:1 1 auto;'));
      blocks.push(card('data-lcs-task="feel"', label(3, esc(L[2])) + felt, 6, 2));
    }
    blocks.push(checklist(mode, 4));
    rootAttr = ` data-lcs-sample="${attr(sample.key)}"`;
  }

  if (mode === 'ask') {
    const piece = (a, k) => `<div data-lcs-ask="${k + 1}" data-lcs-q="${a.q}" data-lcs-text="${attr(a.text)}" style="flex:1 1 auto;display:flex;align-items:center;gap:14px;padding:8px 12px;border-radius:12px;background:#FFFFFF">${badge(k + 1)}` +
      `<div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:2px">${img(a.pic, d.pic)}<span data-lcs-read style="font:700 17px/1.1 'Nunito',sans-serif;color:${T.inkSoft}">${esc(WORDS.by)} ${esc(a.name)}</span></div>` +
      `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:6px">` +
      `<div data-lcs-piecetext data-lcs-read style="align-self:flex-start;padding:4px 12px;border:2px solid ${T.grid};border-radius:8px;background:${T.cream};font:700 ${d.font}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(a.text)}</div>` +
      `<div data-lcs-question data-lcs-read style="align-self:flex-start;padding:4px 14px;border-radius:16px;background:${T.tealSoft};font:800 ${d.font - 2}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(a.asker)} ${esc(WORDS.asked)} ${esc(a.qText || BANK.askQ[a.q])}</div>` +
      `<div data-lcs-opts style="display:flex;flex-direction:column;gap:3px;padding-left:10px">${a.opts.map((o, i) => `<div style="display:flex"><span data-lcs-opt="${i}" data-lcs-kind="${o.kind}"${o.ok ? ' data-lcs-ok="1"' : ''} data-lcs-choice data-lcs-read style="position:relative;font:700 ${d.font - 1}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:1px 10px">${esc(o.s)}${key && o.ok ? ring('-2px -2px') : ''}</span></div>`).join('')}</div></div></div>`;
    blocks.push(card('data-lcs-task="ask"', label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${plan.pieces.map(piece).join('')}</div>`, 6, 4, 'flex:1 1 auto;'));
  }

  if (mode === 'chair') {
    const e = plan.example, sm = plan.sample;
    // a worked example (grey), on a piece that is on no page of the unit
    blocks.push(`<div data-lcs-example style="padding:1px 12px;border-radius:12px;background:${T.cream};border-left:6px solid ${T.grid}">${modelLine(`${e.name} read: “${e.piece}” A friend asked: “${e.q}” ${e.name} added: “${e.added}”`, `data-lcs-modeltopic="${attr(e.name)}"`)}</div>`);
    // 1. the question (level 1: circle one of four; levels 2 and 3: a row the teacher or the friend writes it on); the key's
    //    sample is ANOTHER example of the bank (the worked example is on the page already)
    const ask = d.qChips
      ? `<div data-lcs-qchips style="display:flex;justify-content:space-evenly;gap:8px">${plan.qs.map((q) => `<div data-lcs-qchip="${attr(q)}" style="flex:0 0 auto;padding:4px 12px;border-radius:14px;background:#FFFFFF"><span data-lcs-read data-lcs-choice style="font:800 22px/1.2 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(q)}</span></div>`).join('')}</div>` +
        (key ? `<div data-lcs-keyq data-lcs-read style="font:700 17px/1.3 'Nunito',sans-serif;color:${T.teal}">${esc(WORDS.keyQ)}</div>` : '')
      : row(INNER, 'q', { answer: key ? sm.q : null });
    blocks.push(card('data-lcs-task="asked"', label(1, esc(L[0])) + ask, 3, 2));
    // 2. what the child added: a big box to draw it, and the rows to write it
    const addAns = lv === 1 ? [sm.word] : lv === 2 ? [sm.short] : (wrapRows(sm.added, [FIT.open, FIT.open]) || []);
    const adds = Array.from({ length: d.addRows }, (_, i) => row(INNER, 'add', { letters: lv === 1 ? FIT.addWord : lv === 2 ? FIT.addShort : FIT.open, answer: key ? addAns[i] || null : null })).join('');
    blocks.push(card('data-lcs-task="added"', label(2, esc(L[1])) + drawBox('data-lcs-drawrole="added"', 'flex:1 1 auto;min-height:0', key ? keyNote([`Sample (${sm.name} read: “${sm.piece}” A friend asked: “${sm.q}”): the child draws the new detail.`, WORDS.keySpell]) : '') +
      `<div data-lcs-rows style="display:flex;flex-direction:column">${adds}</div>`, 4, 2, 'flex:1 1 auto;'));
    blocks.push(checklist(mode, 3));
    rootAttr = ` data-lcs-exname="${attr(e.name)}" data-lcs-smpname="${attr(sm.name)}"`;
  }
  return { blocks, rootAttr };
}

/* ---------------------------------------------------------------- verify's own copy of the ruled texts and measures ---------------------------------------------------------------- */
/** verify() does not read the build's constants: a build that changes one of them fails its pages */
const SPEC = {
  PIECE_COL: { 1: 453, 2: 469, 3: 469 },
  INSTR: {
    opinion: { 1: 'An opinion tells what you like best.', 2: 'An opinion tells what you like best. A reason tells why.', 3: 'A writer tells the topic, an opinion, and a reason why.' },
    myfav: { 1: 'Write your opinion: tell what you like best and why.', 2: 'Write your opinion: tell what you like best and why.', 3: 'Write your opinion: tell what you like best and why.' },
    facts: { 1: 'Facts tell true things about one topic.', 2: 'Facts tell true things about one topic. A label names a part.', 3: 'Facts tell true things about one topic. A label names a part.' },
    teach: { 1: 'Teach a reader: name your topic, label it, and tell facts.', 2: 'Teach a reader: name your topic, label it, and tell facts.', 3: 'Teach a reader: name your topic, label it, and tell facts.' },
    order: { 1: 'A small moment tells what happened, in order.', 2: 'A small moment tells what happened, in order, and how the writer felt.', 3: 'A small moment tells what happened, in order, and how the writer felt.' },
    moment: { 1: 'Draw and write what happened to you. Tell how you felt.', 2: 'Draw and write what happened to you. Tell how you felt.', 3: 'Draw and write what happened to you. Tell how you felt.' },
    ask: { 1: 'A friend’s question helps a writer add a detail.', 2: 'A friend’s question helps a writer add a detail.', 3: 'A friend’s question helps a writer add a detail.' },
    chair: { 1: 'In the author’s chair, a writer shares, listens, and adds a detail.', 2: 'In the author’s chair, a writer shares, listens, and adds a detail.', 3: 'In the author’s chair, a writer shares, listens, and adds a detail.' },
  },
  LINES: {
    opinion: {
      1: ['Circle the one you like best in each row.', 'Your teacher reads each piece. Circle the sentence that tells what the writer likes best. Draw a line under the sentence that tells why.'],
      2: ['Circle the one you like best in each row.', 'Your teacher reads each piece. Circle the sentence that tells what the writer likes best. Draw a line under the sentence that tells why.'],
      3: ['Circle the one you like best in each row.', 'Your teacher reads each piece. The first sentence tells the topic. It gets no mark. Circle the sentence that tells what the writer likes best. Draw a line under the sentence that tells why.'] },
    myfav: {
      1: ['Circle one. Draw your favorite.', 'Finish each sentence.', 'Put a check mark in each box that is true.'],
      2: ['Circle one. Draw your favorite.', 'Finish each sentence. Sound out your words.', 'Put a check mark in each box that is true.'],
      3: ['Circle one. Draw your favorite.', 'Write your opinion.', 'Put a check mark in each box that is true.'] },
    facts: {
      1: ['Your teacher reads each sentence. Is it about the {T}? Put a check mark (yes) or an X (no) in each box.', 'Cut out the labels. Glue each label in its box.'],
      2: ['Your teacher reads each sentence. Is it about the {T}? Put a check mark (yes) or an X (no) in each box.', 'Write each label on its line. Use the word bank.'],
      3: ['Your teacher reads each sentence. Is it about the {T}? Put a check mark (yes) or an X (no) in each box.', 'Write each label on its line. One word in the word bank does not fit.'] },
    teach: {
      1: ['Circle one.', 'Draw it. Write two labels. Draw a line from each label to its part.', 'Finish each sentence.', 'Put a check mark in each box that is true.'],
      2: ['Circle one.', 'Draw it. Write two labels. Draw a line from each label to its part.', 'Finish each sentence. Sound out your words.', 'Put a check mark in each box that is true.'],
      3: ['Circle one.', 'Draw it. Write two labels. Draw a line from each label to its part.', 'Write two facts.', 'Put a check mark in each box that is true.'] },
    order: {
      1: ['Your teacher reads the story. Write 1, 2, and 3 in the boxes to show the order.', 'How did {N} feel? Circle the face.', 'Draw what happened last.'],
      2: ['Your teacher reads the story. Write 1, 2, and 3 in the boxes to show the order.', 'How did {N} feel? Circle the face.', 'Draw what happened last.'],
      3: ['Your teacher reads the story. Write 1, 2, 3, and 4 in the boxes to show the order.', 'How did {N} feel? Circle the face.', 'Draw what happened last.'] },
    moment: {
      1: ['Circle one.', 'Draw what happened first, next, and last.', 'Write what happened last. Then write how you felt.', 'Put a check mark in each box that is true.'],
      2: ['Circle one.', 'Draw and write what happened first, next, and last.', 'How did you feel? Write it.', 'Put a check mark in each box that is true.'],
      3: ['Circle one.', 'Draw and write what happened first, next, and last.', 'How did you feel? Write it.', 'Put a check mark in each box that is true.'] },
    ask: {
      1: ['Your teacher reads each piece, the question, and the sentences. Circle the sentence that answers the question.'],
      2: ['Your teacher reads each piece, the question, and the sentences. Circle the sentence that answers the question.'],
      3: ['Your teacher reads each piece, the question, and the sentences. Circle the sentence that answers the question.'] },
    chair: {
      1: ['My friend asked: circle the question.', 'I added: draw it. Write one word.', 'Put a check mark in each box that is true.'],
      2: ['My friend asked: your teacher or your friend writes it.', 'I added: draw it. Write it.', 'Put a check mark in each box that is true.'],
      3: ['My friend asked: your teacher or your friend writes it.', 'I added: draw it. Write a sentence.', 'Put a check mark in each box that is true.'] },
  },
  CHECK: {
    myfav: ['I drew it.', 'I wrote my opinion.', 'I told why.'], teach: ['I named my topic.', 'I labeled my picture.', 'I wrote two facts.'],
    moment: ['I drew three parts.', 'I wrote what happened.', 'I told how I felt.'], chair: ['I shared.', 'I listened.', 'I added a detail.'],
  },
  // the rows of a frame page: [the printed words joined by |, the blanks' roles joined by +, what each blank holds in letters]
  FRAMES: {
    myfav: { 1: [['My favorite', 'topic', [6]], ['is', 'answer', [10]], ['because it is', 'reason', [7]]],
      2: [['My favorite', 'topic', [6]], ['', 'answer', [13]], ['because', 'reason', [10]]], 3: [['I', 'open', [13]], ['', 'open', [14]], ['', 'open', [14]]] },
    teach: { 1: [['A|can', 'topic+can', [6, 5]], ['A|has', 'topic+has', [6, 5]]], 2: [['A|can', 'topic+can', [6, 5]], ['A|has', 'topic+has', [6, 5]]], 3: [['A', 'open', [13]], ['', 'open', [14]]] },
    moment: { band: ['I', 'i', [10]], last: ['I', 'i', [12]], felt: ['I felt', 'felt', [6]] },
  },
  WORDS: { like: 'Like this:', bank: 'Word bank:', bankOwn: 'Word bank (or your own word):', own: 'my own', box: ['First', 'Next', 'Last'], keyAny: 'Any choice is right.',
    keySpell: 'Invented spelling is right: a child writes the sounds he or she hears.', keyDraw: 'Any drawing that shows this is right.', keyDrawAny: 'any drawing is right.',
    keyFeel: 'Any feeling word is right.', keyQ: 'The child circles the question the friend asked; any one is right.' },
  ASKQ: { color: 'What color was it?', where: 'Where were you?', who: 'Who was with you?', sound: 'What sound did it make?' },
  // the kinds of K-680's four question chips (an example of level 1 never asks one of them)
  CHIP_KIND: '^(What color|Where|Who|What sound)\\b',
  // the measures: a Kindergarten row (never under 110 px), a kindergartner's letter, a box for one mark, a picture, read-aloud
  // text, a thing to circle, the widest blank band, the glue room, a label card, the share of the body the blocks fill, the
  // share of the body's height the box to draw in takes on a page of the child's own piece, the size of the frame words, the
  // dot at the end of a label line and the room between two dots
  ROW_FLOOR: 110, LETTER: 46, BOX: 72, PIC: 60, READ: 16, CHOICE: 20, BAND: 40, GLUE: 30, CARD_W: 96, CARD_H: 86, FILL: 0.8, DRAW: 1 / 3, FRAME_PX: 28, DOT: 6, DOTS_APART: 40,
  // what the rows of labels, the rows of K-680 and the small boxes of K-678 hold
  LABEL: 7, PART: 6, ADD: { 1: 7, 2: 13, 3: 14 }, SMALLBOX: [140, 130],
  // what each page holds, by level
  HOLD: {
    opinion: { 1: { pairs: 3, pieces: 2, sents: 2 }, 2: { pairs: 2, pieces: 3, sents: 2 }, 3: { pairs: 2, pieces: 3, sents: 3 } },
    order: { 1: { n: 3, faces: 3 }, 2: { n: 3, faces: 4 }, 3: { n: 4, faces: 4 } },
    ask: { 1: { n: 3, choices: 2 }, 2: { n: 3, choices: 3 }, 3: { n: 3, choices: 3, same: true } },
    moment: { 1: { rows: 1 }, 2: { rows: 3 }, 3: { rows: 3 } },
    chair: { 1: { qChips: 4, add: 1 }, 2: { qChips: 0, add: 1 }, 3: { qChips: 0, add: 2 } },
  },
};

/** what verify() needs to know of the bank */
function infoOf() {
  const P = BANK.pics;
  return {
    pics: Object.fromEntries(Object.entries(P).map(([k, x]) => [k, x.word])), pieces: BANK.pieces, pairs: BANK.pairs.map((x) => x.slice().sort().join('|')),
    favTopics: BANK.favTopics, favModels: BANK.favModels, reasonWords: BANK.reasonWords, favBank: BANK.favBank,
    factTopics: BANK.factTopics, partInFact: BANK.partInFact, teachTopics: BANK.teachTopics, hasWords: BANK.hasWords, canWords: BANK.canWords, teachModels: BANK.teachModels, teachBank: BANK.teachBank,
    stories: BANK.stories, moments: BANK.moments, momentModels: BANK.momentModels, momentBank: BANK.momentBank, asks: BANK.asks,
    chairExamples: BANK.chairExamples, chairQuestions: BANK.chairQuestions, never: [...neverWords(BANK)], modelOnly: BANK.modelOnly,
    allFacts: Object.fromEntries(BANK.factTopics.flatMap((t) => t.facts.map(([tag, s]) => [s, { topic: t.key, tag, cls: t.cls }]))),
  };
}

function makeDrawWriteKType({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('draw-and-write-k: unknown mode ' + mode);
  // the description a search page shows: "Free printable <title> Worksheet for Kindergarten. <level-2 instruction> Download
  // the free PDF." (120 to 170 letters)
  const desc = `Free printable ${i18n.en.title} Worksheet for Kindergarten. ${INSTR[mode][2]} Download the free PDF.`;
  if (desc.length < 120 || desc.length > 170) throw new Error(`${id}: the description has ${desc.length} letters (120 to 170)`);
  const INFO = infoOf();
  return {
    id, slug, gradeBand: 'K', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the pieces and sentences are English (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const plan = drawPage(BANK, mode, lv, rng, Number(ctx && ctx.variant) || 0);
      const { blocks, rootAttr } = renderPage(plan, mode, lv, d, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-dwk="${mode}|${lv}" data-lcs-noliga="1"${rootAttr}${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px;min-height:0">` + fRoom(svgRoom(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((S, INFO) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-dwk]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsDwk.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => (e ? e.textContent.replace(/\s+/g, ' ').trim() : '');
        const all = (q, e = root) => [...e.querySelectorAll(q)];
        const one = (q, e = root) => e.querySelector(q);
        const rb = R(root);
        const wordsOf = (s) => String(s).replace(/[.,!?“”’:]/g, ' ').toLowerCase().split(/\s+/).filter(Boolean);
        const blockRepeat = (s) => { for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
          const runs = String(s).match(/(.)\1*/g) || []; return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length); };
        const placesOk = (p) => { const n = p.length; if (n >= 3 && new Set(p).size < 2) return false; if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
          if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false; return !blockRepeat(p.join('')); };
        const lettersOf = (s) => [...String(s)].length;
        const H = S.HOLD[mode] ? S.HOLD[mode][lv] : null;

        // letters: ligatures off everywhere, and an f before i, f, l, t and a t before t have their own room
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if (all('*').some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg, style') && /f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        // typographic apostrophes and quotes only
        if (/['"]/.test(root.textContent)) fails.push('a straight apostrophe or quote on the page');
        // pictures: loaded, 60 px or more, no two of one kind
        const imgs = all('img');
        imgs.forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < S.PIC - 0.5 || R(im).height < S.PIC - 0.5) fails.push(`a picture smaller than ${S.PIC} px`); });
        if (new Set(imgs.map((im) => im.dataset.lcsPickind)).size !== imgs.length) fails.push('two pictures of one kind on the page');
        // the instruction at the top of the page is the one of this level
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        // the task lines: numbered 1, 2, ... and the lines of this level ({T} and {N} filled from the page)
        { const ls = all('[data-lcs-label]'), want = S.LINES[mode][lv];
          if (ls.length !== want.length) fails.push(`${ls.length} task lines, not ${want.length}`);
          const tname = mode === 'facts' ? (INFO.factTopics.find((t) => t.key === root.dataset.lcsTopic) || {}).name : null;
          const sname = mode === 'order' ? (INFO.stories.find((s) => s.title === root.dataset.lcsStory) || {}).name : null;
          ls.forEach((l, i) => { const t = txt(l), m = /^(\d+)\. (.*)$/.exec(t);
            const w = (want[i] || '').replace('{T}', tname || '{T}').replace('{N}', sname || '{N}');
            if (!m || +m[1] !== i + 1 || m[2] !== w) fails.push(`task line ${i + 1} is not the line of level ${lv}: "${t}"`); }); }
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more, no blank band
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, svg').forEach((e) => { if (e.closest('[data-lcs-scissors]')) return; const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card (' + (Object.keys(e.dataset)[0] || e.tagName) + ')'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        for (let i = 1; i < blocks.length; i++) { const g = R(blocks[i]).top - R(blocks[i - 1]).bottom; if (g > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two parts of the page`); }
        { const gb = rb.bottom - R(blocks[blocks.length - 1]).bottom; if (gb > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(gb)} px under the last block`); }
        // the blank bands a reader SEES inside every block (a box to draw in, with its dashed border, counts as printed)
        blocks.forEach((b) => { const iv = [], s = cs(b);
          [b, ...b.querySelectorAll('*')].forEach((e) => {
            const r = R(e); if (!r.width || !r.height) return;
            if (e.closest('svg') && e.tagName.toLowerCase() !== 'svg') { if (!e.closest('[data-lcs-line]') || e.tagName.toLowerCase() === 'text') iv.push([r.top, r.bottom]); return; }
            if (e.tagName.toLowerCase() === 'svg') { if (e.closest('[data-lcs-line]')) { const ls = [...e.querySelectorAll('line')].map((l) => R(l).top); iv.push([ls.length ? Math.min(...ls) : r.top, r.bottom]); } else iv.push([r.top, r.bottom]); return; }
            if (e === b) return;
            const st = cs(e), own = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
            const border = ['Top', 'Right', 'Bottom', 'Left'].some((q) => parseFloat(st['border' + q + 'Width']) >= 2 && st['border' + q + 'Style'] !== 'none' && st['border' + q + 'Color'] !== 'rgba(0, 0, 0, 0)');
            if (e.tagName === 'IMG' || own || border || (st.backgroundColor !== 'rgba(0, 0, 0, 0)' && st.backgroundColor !== cs(b).backgroundColor)) iv.push([r.top, r.bottom]);
          });
          iv.sort((p, q) => p[0] - q[0]);
          let top = R(b).top + parseFloat(s.paddingTop), worst = 0;
          for (const [a, z] of iv) { if (a > top) worst = Math.max(worst, a - top); top = Math.max(top, z); }
          worst = Math.max(worst, R(b).bottom - parseFloat(s.paddingBottom) - top);
          if (worst > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(worst)} px that a reader sees in the ${b.dataset.lcsTask || Object.keys(b.dataset)[0] || 'block'} block`); });
        // sizes: Kindergarten rows, boxes for one mark, read-aloud text, things to circle
        const lines = all('[data-lcs-line]');
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < S.ROW_FLOOR - 0.5) fails.push(`a writing row lower than ${S.ROW_FLOOR} px`); });
        all('[data-lcs-markbox], [data-lcs-numbox]').forEach((e) => { const r = R(e); if (r.width < S.BOX - 0.5 || r.height < S.BOX - 0.5) fails.push(`a box for one mark is ${Math.round(r.width)} x ${Math.round(r.height)} px (${S.BOX} or more)`); });
        all('[data-lcs-read]').forEach((e) => { if (fs(e) < S.READ - 0.1) fails.push(`text the teacher reads is ${fs(e)} px (${S.READ} or more)`); });
        all('[data-lcs-choice]').forEach((e) => { if (fs(e) < S.CHOICE - 0.1) fails.push(`a thing to circle is printed at ${fs(e)} px (${S.CHOICE} or more)`); });
        // the frame words stand on their row's base rule and are big enough to read
        all('[data-lcs-frameword]').forEach((e) => { if (fs(e) < S.FRAME_PX) fails.push(`frame words printed at ${fs(e)} px`); const rw = e.parentElement.querySelector('[data-lcs-line] svg'); if (!rw) return;
          const base = Math.max(...[...rw.querySelectorAll('line')].map((l) => R(l).top)); const probe = document.createElement('span'); probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'; e.appendChild(probe); const bl = R(probe).top; probe.remove();
          if (Math.abs(bl - base) > 3) fails.push(`the frame words "${txt(e)}" do not stand on the base rule (${Math.round(bl - base)} px)`); });
        // every blank holds what a kindergartner writes in it (LETTER px a letter)
        all('[data-lcs-line][data-lcs-need]').forEach((l) => { const need = +l.dataset.lcsNeed, w = R(l.querySelector('svg')).width; if (w < need * S.LETTER - 0.5) fails.push(`a ${l.dataset.lcsBlank} blank is ${Math.round(w)} px: it holds ${Math.floor(w / S.LETTER)} letters, ${need} wanted`); });
        // the key: every sample sits inside its row (measured), and at LETTER px a letter it fits its blank
        all('[data-lcs-line][data-lcs-answer]').forEach((l) => { const s = l.querySelector('svg'), t = s.querySelector('text');
          if (!t || t.getAttribute('textLength') || t.getBBox().width > R(s).width - 10) fails.push(`the key's "${l.dataset.lcsAnswer}" is squeezed or wider than its row`);
          if (lettersOf(l.dataset.lcsAnswer) * S.LETTER > R(s).width + 0.5 && l.dataset.lcsBlank !== 'q') fails.push(`the sample "${l.dataset.lcsAnswer}" needs ${lettersOf(l.dataset.lcsAnswer) * S.LETTER} px at a kindergartner's letter size; its blank is ${Math.round(R(s).width)} px`); });
        if (!isKey && (lines.some((l) => l.dataset.lcsAnswer) || all('[data-lcs-ring], [data-lcs-uline], [data-lcs-keymark], [data-lcs-keylabel], [data-lcs-keynote], [data-lcs-keyany]').length || all('[data-lcs-numbox], [data-lcs-markbox]').some((e) => txt(e) || e.children.length))) fails.push('an answer is marked on the page of the child');
        // a word of the never list (or of the notes' models) never stands on the page
        { const ws = wordsOf(root.textContent); const bad = ws.filter((w) => INFO.never.includes(w)); if (bad.length) fails.push('a word no page prints: ' + bad.join(', ')); }
        // the checklist: its items, each with an icon and a box of 40 px
        const cl = one('[data-lcs-checklist]');
        if (S.CHECK[mode]) {
          if (!cl || blocks[blocks.length - 1] !== cl.closest('[data-lcs-task]')) fails.push('no checklist at the foot of the page');
          else { const its = all('[data-lcs-check]', cl); if (its.map((x) => txt(one('[data-lcs-checktext]', x))).join('|') !== S.CHECK[mode].join('|')) fails.push('the checklist is not the one of this page');
            its.forEach((x) => { const bx = one('[data-lcs-checkbox]', x), ic = one('[data-lcs-icon]', x); if (!ic || R(ic).width < 40 || !bx || R(bx).width < 39.5 || R(bx).height < 39.5) fails.push('a checklist line has no picture or no box of 40 px'); }); }
        } else if (cl) fails.push('a checklist on a page that has none');
        // the boxes to draw in: dashed, labeled by a task line, empty on the child's page
        const dbs = all('[data-lcs-drawbox]');
        dbs.forEach((b) => { if (cs(b).borderTopStyle !== 'dashed') fails.push('a box to draw in has no dashed border'); if (!isKey && (b.children.length || txt(b))) fails.push('a box to draw in is not empty');
          all('[data-lcs-keynote] > div', b).forEach((x) => { const q = R(x), r = R(b); if (q.bottom > r.bottom - 3 || q.right > r.right - 3 || q.left < r.left + 3) fails.push('the note of the key does not fit in its box'); }); });
        /** the page of the child's own piece: a box to draw in a third of the body high or more */
        const bigBox = (role) => { const b = one(`[data-lcs-drawbox][data-lcs-drawrole="${role}"]`); if (!b) { fails.push(`no box to draw in (${role})`); return null; }
          if (R(b).height < rb.height * S.DRAW - 1) fails.push(`the box to draw in is ${Math.round(R(b).height)} px high: less than a third of the body (${Math.round(rb.height * S.DRAW)})`); return b; };
        /** the chips: n topics (a picture and its words) and "my own" where the page offers it; the key rings the sample's */
        const chipsOf = (n, own) => { const cc = all('[data-lcs-topicchip]'); const tops = cc.filter((c) => c.dataset.lcsTopicchip !== 'own');
          if (tops.length !== n || cc.some((c) => c.dataset.lcsTopicchip === 'own') !== own) fails.push(`${tops.length} topics to circle${own ? ' and my own' : ''} (${n} wanted)`);
          tops.forEach((c) => { const im = one('img', c); if (!im) fails.push(`the topic "${c.dataset.lcsChip}" has no picture`); if (txt(one('[data-lcs-choice]', c)) !== c.dataset.lcsChip) fails.push(`the topic "${c.dataset.lcsChip}" does not print its words`); });
          const ownc = one('[data-lcs-topicchip="own"]'); if (own && ownc && txt(one('[data-lcs-choice]', ownc)) !== S.WORDS.own) fails.push('the chip "my own" does not say my own');
          const rings = all('[data-lcs-topicchip] [data-lcs-ring]'); if (isKey ? rings.length !== 1 || !rings[0].closest('[data-lcs-topicchip="0"]') : rings.length) fails.push('the key does not ring the sample topic (the first one)');
          if (new Set(tops.map((c) => c.dataset.lcsChip)).size !== tops.length) fails.push('a topic stands twice');
          return tops.map((c) => c.dataset.lcsChip); };
        /** the rows of a frame page: the frames of this level (printed words, blanks, what each blank holds), across the card */
        const frameRows = (want, sel = '[data-lcs-rows] > [data-lcs-frame]', full = true) => { const fr = all(sel);
          if (fr.length !== want.length) fails.push(`${fr.length} rows to write on, not ${want.length}`);
          fr.forEach((f, i) => { const w = want[i]; if (!w) return;
            if (f.dataset.lcsFramewords !== w[0] || f.dataset.lcsFrame !== w[1]) fails.push(`row ${i + 1} is not the frame "${w[0]}"`);
            if (all('[data-lcs-frameword]', f).map(txt).join('|') !== w[0]) fails.push(`row ${i + 1} does not print "${w[0]}"`);
            const bl = all('[data-lcs-line]', f); if (bl.length !== w[2].length || bl.some((l, j) => +l.dataset.lcsNeed !== w[2][j])) fails.push(`row ${i + 1}: its blanks are not to hold ${w[2].join(' and ')} letters`);
            if (full && R(f).right < R(f.closest('[data-lcs-task]')).right - 12 - 14) fails.push(`row ${i + 1} does not run to the end of its card`); });
          return fr; };
        /** the key's samples of the rows, in order (an empty blank is "") */
        const keyOf = (fr) => fr.map((f) => all('[data-lcs-line]', f).map((l) => l.dataset.lcsAnswer || ''));
        const model = one('[data-lcs-model]');

        // ---------------------------------------------------------------- K-673 what I like best and why
        if (mode === 'opinion') {
          const prs = all('[data-lcs-pair]');
          if (prs.length !== H.pairs) fails.push(`${prs.length} rows of two things, not ${H.pairs}`);
          prs.forEach((p) => { const th = all('[data-lcs-thing]', p).map((x) => x.dataset.lcsThing); if (th.length !== 2 || !INFO.pairs.includes(th.slice().sort().join('|'))) fails.push('a row is not two things of one kind of the bank');
            all('[data-lcs-thing]', p).forEach((x) => { if (txt(one('[data-lcs-choice]', x)) !== INFO.pics[x.dataset.lcsThing]) fails.push('a thing does not carry its word'); }); });
          if (isKey !== !!one('[data-lcs-keyany]')) fails.push('the key does not say that any choice is right');
          if (all('[data-lcs-thing] [data-lcs-ring]').length) fails.push('the key rings a thing to like best (any choice is right)');
          const ps = all('[data-lcs-piece]');
          if (ps.length !== H.pieces) fails.push(`${ps.length} pieces, not ${H.pieces}`);
          const first = [];
          ps.forEach((p, k) => {
            const src = INFO.pieces.find((x) => x.title === p.dataset.lcsTitle);
            if (!src) { fails.push(`piece ${k + 1} is no piece of the bank`); return; }
            const ss = all('[data-lcs-psent]', p), roles = ss.map((x) => x.dataset.lcsPsent);
            if (ss.length !== H.sents) fails.push(`piece ${k + 1} has ${ss.length} sentences`);
            if (H.sents === 3 && roles[0] !== 'topic') fails.push(`piece ${k + 1}: the first sentence does not tell the topic`);
            // a reason printed before the opinion (on every level) is the one that names its thing
            const reFirst = roles.indexOf('re') < roles.indexOf('op');
            ss.forEach((x) => { const want = { op: src.op, re: reFirst ? src.reFirst || src.re : src.re, topic: src.topic }[x.dataset.lcsPsent]; if (txt(x) !== want) fails.push(`piece ${k + 1}: "${txt(x)}" is not its ${x.dataset.lcsPsent}`); });
            if (reFirst && /\b(it|they|them)\b/i.test(txt(ss[roles.indexOf('re')]))) fails.push(`piece ${k + 1}: the reason before the opinion says it or they before anything is named`);
            if (roles.filter((r) => r === 'op').length !== 1 || roles.filter((r) => r === 're').length !== 1) fails.push(`piece ${k + 1} has not one opinion and one reason`);
            // every sentence on ONE line, in a column as wide as the one the bank's width check counts on
            if (ss[0] && Math.abs(R(ss[0].parentElement.parentElement).width - S.PIECE_COL[lv]) > 1) fails.push(`piece ${k + 1}: the sentence column is ${Math.round(R(ss[0].parentElement.parentElement).width)} px, not the ${S.PIECE_COL[lv]} px the width check counts on`);
            ss.forEach((x) => { if (R(x).height > parseFloat(cs(x).fontSize) * 1.35 * 1.5) fails.push(`piece ${k + 1}: "${txt(x)}" wraps to a second line`); });
            first.push(roles.filter((r) => r !== 'topic')[0]);
            const im = one('img', p); if (!im || im.dataset.lcsPic !== src.pic) fails.push(`piece ${k + 1} does not show its thing`);
            if (txt(one('[data-lcs-ptitle]', p)) !== `${src.title} by ${src.name}`) fails.push(`piece ${k + 1} does not name its title and writer`);
            const rgs = all('[data-lcs-ring]', p), uls = all('[data-lcs-uline]', p);
            if (isKey && (rgs.length !== 1 || rgs[0].parentElement.dataset.lcsPsent !== 'op' || uls.length !== 1 || uls[0].parentElement.dataset.lcsPsent !== 're')) fails.push(`the key does not circle the opinion and underline the reason of piece ${k + 1}`);
          });
          if (ps.length >= 3 && new Set(first).size < 2) fails.push('the opinion stands in one place in every piece');
          { const lo = ps.map((p) => { const o = one('[data-lcs-psent="op"]', p), r = one('[data-lcs-psent="re"]', p); return o && r ? (txt(o).length > txt(r).length ? 1 : 0) : 0; }); if (ps.length >= 3 && (lo.every((x) => x) || lo.every((x) => !x))) fails.push('the opinion is the longer sentence in every piece, or in none'); }
        }

        // ---------------------------------------------------------------- K-674 my favorite and why
        if (mode === 'myfav') {
          const tops = chipsOf(3, true);
          tops.forEach((t) => { if (!INFO.favTopics.some((x) => x.key === t)) fails.push(`"${t}" is no topic of the bank`); });
          const db = bigBox('favorite');
          if (db && R(db).width < rb.width * 0.6) fails.push('the box to draw in is narrower than three fifths of the page');
          const fr = frameRows(S.FRAMES.myfav[lv]);
          const smp = INFO.favTopics.find((x) => x.key === root.dataset.lcsSample);
          if (!smp || tops[0] !== smp.key) fails.push('the sample is not about the first topic');
          const bank = all('[data-lcs-bankword]').map((x) => x.dataset.lcsBankword);
          if (lv === 1) {
            // four reason words, each one natural for a topic offered; every topic offered finds one of its own; the sample's
            // word among them; the bank says the child may use his or her own word
            const offered = tops.map((t) => INFO.favTopics.find((x) => x.key === t)).filter(Boolean);
            if (bank.length !== 4 || new Set(bank).size !== 4 || bank.some((w) => !INFO.reasonWords.includes(w)) || (smp && !bank.includes(smp.reason))) fails.push('the word bank is not four reason words with the sample\'s word');
            bank.forEach((w) => { if (!offered.some((t) => t.reasons.includes(w))) fails.push(`"${w}" in the word bank fits no topic offered`); });
            offered.forEach((t) => { if (!t.reasons.some((w) => bank.includes(w))) fails.push(`the word bank has no reason for the ${t.key}`); });
            if (txt(one('[data-lcs-bankhead]')) !== S.WORDS.bankOwn) fails.push('the word bank does not say "or your own word"');
            const rbk = one('[data-lcs-frame="reason"] [data-lcs-line] svg'); if (rbk && R(rbk).width < Math.max(...bank.map(lettersOf)) * S.LETTER) fails.push('the reason blank cannot hold a word of the word bank');
          } else if (lv === 3) { if (bank.join('|') !== INFO.favBank.join('|')) fails.push('the word bank of level 3 is not the one of the bank'); }
          else if (bank.length) fails.push('a word bank on level 2');
          const tb = one('[data-lcs-frame="topic"] [data-lcs-line] svg');
          if (tb && R(tb).width < Math.max(...tops.map(lettersOf)) * S.LETTER) fails.push('the topic blank cannot hold every topic of the page');
          // the grey model: in the shape of the frames, on a topic that is not offered
          const mt = model && INFO.favModels.find((m) => m.topic === model.dataset.lcsModeltopic);
          if (!mt || txt(model) !== `${S.WORDS.like} ${lv === 3 ? mt.l3 : mt.op}` || tops.includes(mt.topic)) fails.push('the model is not a model of the bank in the shape of the frames, on a topic not offered');
          // the key: the sample of its level, in its rows, about the first topic
          if (isKey && smp) { const got = keyOf(fr).map((x) => x.join('|'));
            if (lv < 3 && got.join('/') !== (lv === 1 ? [smp.key, smp.answer, smp.reason] : smp.l2).join('/')) fails.push('the key\'s sample is not the sample of the first topic');
            if (lv === 3 && ('I ' + got.filter(Boolean).join(' ')) !== smp.l3) fails.push('the key\'s sample of level 3 is not "' + smp.l3 + '"'); }
          else if (!isKey && keyOf(fr).flat().some(Boolean)) fails.push('a sample on the page of the child');
        }

        // ---------------------------------------------------------------- K-675 facts and labels
        if (mode === 'facts') {
          const t = INFO.factTopics.find((x) => x.key === root.dataset.lcsTopic);
          if (!t) return fails.concat(['no topic of the bank']);
          const l1 = all('[data-lcs-label]')[0];
          if (!l1 || !one('[data-lcs-tinymark="check"]', l1) || !one('[data-lcs-tinymark="x"]', l1)) fails.push('the task line does not show a check mark after yes and an X after no');
          const fr = all('[data-lcs-fact]');
          if (fr.length !== 3) fails.push(`${fr.length} sentences, not 3`);
          const offs = fr.filter((x) => x.dataset.lcsOk === '0');
          if (offs.length !== 1) fails.push(`${offs.length} sentences about something else (one wanted)`);
          const pageTags = [];
          fr.forEach((x, i) => { const s = x.dataset.lcsText, f = INFO.allFacts[s];
            if (!f || txt(one('[data-lcs-facttext]', x)) !== s) { fails.push(`sentence ${i + 1} is no fact of the bank`); return; }
            if ((x.dataset.lcsOk === '1') !== (f.topic === t.key)) fails.push(`sentence ${i + 1} is keyed wrong`);
            if (f.topic === t.key) pageTags.push(f.tag);
            else { if (t.facts.some((y) => y[0] === f.tag) || t.alsoTrue.includes(f.tag)) fails.push(`sentence ${i + 1} is about something else but true of the ${t.name} too`);
              if (lv === 1 && f.cls === t.cls) fails.push('level 1: the other sentence is about something of the same kind');
              if (lv > 1 && f.cls !== t.cls && INFO.factTopics.some((u) => u.cls === t.cls && u.key !== t.key && u.facts.some((y) => !t.facts.some((z) => z[0] === y[0]) && !t.alsoTrue.includes(y[0])))) fails.push('levels 2 and 3: the other sentence is not about something of the same kind'); }
            const mk = one('[data-lcs-markbox] [data-lcs-keymark]', x);
            if (isKey && (!mk || mk.dataset.lcsKeymark !== (x.dataset.lcsOk === '1' ? 'check' : 'x'))) fails.push(`the key does not mark sentence ${i + 1}`); });
          // the picture (cut to its ink), two homes, two lines: each line starts on its home's top, ends on a dot that is ON its
          // part (inside the part's box, on the picture's ink) and crosses no ink of the picture on its way; the lines do not cross
          const pw = one('[data-lcs-picwrap] img');
          if (!pw || pw.dataset.lcsPic !== t.key) fails.push('the picture is not the picture of the topic');
          if (pw && (pw.dataset.lcsCrop !== t.ink.join(',') || !/inset/.test(cs(pw).objectViewBox || ''))) fails.push('the picture is not cut to the box of its ink');
          const homes = all('[data-lcs-home]'), ptr = all('[data-lcs-pointer]');
          if (homes.length !== 2 || ptr.length !== 2 || !pw) fails.push('not two labels, each with one line to its part');
          else {
            const pr = R(pw), [ix0, iy0, ix1, iy1] = t.ink;
            const toPic = (px, py) => [ix0 + ((px - pr.left) / pr.width) * (ix1 - ix0), iy0 + ((py - pr.top) / pr.height) * (iy1 - iy0)];
            const ink = (u, v) => { const r = Math.floor(v * 64), c = Math.floor(u * 64); return r < 0 || r > 63 || c < 0 || c > 63 ? '0' : t.mask[r][c]; };
            const seg = ptr.map((l) => { const sv = R(l.ownerSVGElement); return [sv.left + +l.getAttribute('x1'), sv.top + +l.getAttribute('y1'), sv.left + +l.getAttribute('x2'), sv.top + +l.getAttribute('y2'), l.dataset.lcsPart]; });
            seg.forEach(([x1, y1, x2, y2, part]) => { const p = t.parts.find((q) => q[0] === part);
              if (!p) { fails.push(`a line points to "${part}", no part of the ${t.name}`); return; }
              const [u, v] = toPic(x2, y2);
              if (Math.abs(u - p[2]) * pr.width / (ix1 - ix0) > 2 || Math.abs(v - p[3]) * pr.height / (iy1 - iy0) > 2) fails.push(`the line of "${part}" does not end on its dot`);
              const bx = p[4]; if (!(u > bx[0] && u < bx[2] && v > bx[1] && v < bx[3])) fails.push(`the dot of "${part}" is not on the ${part} (outside its box)`);
              const rr = 0.6 * S.DOT, ring = Array.from({ length: 8 }, (_, i) => [x2 + Math.cos(i * Math.PI / 4) * rr, y2 + Math.sin(i * Math.PI / 4) * rr]);
              if (ink(u, v) !== '2' || ring.some(([a, c]) => ink(...toPic(a, c)) === '0')) fails.push(`the dot of "${part}" is not on the picture's ink`);
              const len = Math.hypot(x2 - x1, y2 - y1);
              for (let k = 0; k <= len; k += 1) { const px = x1 + ((x2 - x1) * k) / len, py = y1 + ((y2 - y1) * k) / len; if (Math.hypot(x2 - px, y2 - py) <= S.DOT + 5) break;
                if (px < pr.left || px > pr.right || py < pr.top || py > pr.bottom) continue; if (ink(...toPic(px, py)) !== '0') { fails.push(`the line of "${part}" crosses the picture`); break; } }
              if ((INFO.partInFact[part] || []).some((g) => pageTags.includes(g))) fails.push(`"${part}" is labeled and named by a fact of the page`);
              const h = homes.find((e) => e.dataset.lcsHomepart === part), hr = h && R(h);
              const rsv = h && one('[data-lcs-line] svg', h), hTop = rsv ? Math.min(...[...rsv.querySelectorAll('line')].map((q) => R(q).top)) : hr && hr.top;
              if (!h || x1 < hr.left - 0.5 || x1 > hr.right + 0.5 || Math.abs(y1 - hTop) > 2) fails.push(`the line of "${part}" does not start on top of its home`); });
            const cross = (a, b) => { const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])); const A = [a[0], a[1]], B = [a[2], a[3]], C = [b[0], b[1]], D = [b[2], b[3]]; return o(A, B, C) !== o(A, B, D) && o(C, D, A) !== o(C, D, B); };
            if (cross(seg[0], seg[1])) fails.push('the two lines cross');
            if (Math.hypot(seg[0][2] - seg[1][2], seg[0][3] - seg[1][3]) < S.DOTS_APART) fails.push('the two parts are too close to tell apart');
            const hr = homes.map(R); if (hr[0].right > hr[1].left - 20) fails.push('the two homes touch');
            homes.forEach((h) => { const hrr = R(h); if (hrr.top < pr.bottom + 8) fails.push('a home stands on the picture'); });
          }
          const parts = homes.map((h) => h.dataset.lcsHomepart);
          const bank = all('[data-lcs-labelbank] [data-lcs-bankword]').map((x) => x.dataset.lcsBankword);
          const cards = all('[data-lcs-card]');
          if (lv === 1) {
            if (bank.length) fails.push('a word bank on level 1');
            if (cards.length !== 2 || cards.map((c) => c.dataset.lcsCard).sort().join() !== parts.slice().sort().join()) fails.push('the cards are not the two labels');
            // the cards never stand in the order of their boxes (a child cannot glue left to left without reading)
            if (cards.length === 2 && cards.map((c) => c.dataset.lcsCard).join() === parts.join()) fails.push('the cards stand in the order of their boxes');
            cards.forEach((c) => { if (R(c).width < S.CARD_W - 0.5 || R(c).height < S.CARD_H - 0.5) fails.push(`a card is ${Math.round(R(c).width)} x ${Math.round(R(c).height)} px`); if (cs(c).borderRightStyle !== 'dashed' || cs(c).borderBottomStyle !== 'dashed') fails.push('a card does not share its cut lines'); });
            if (cards.length && root.lastElementChild !== cards[0].closest('[data-lcs-cutstrip]')) fails.push('the cards are not at the foot of the page');
            const cw = cards.length ? Math.max(...cards.map((c) => R(c).width)) : 0, ch = cards.length ? Math.max(...cards.map((c) => R(c).height)) : 0;
            all('[data-lcs-glue]').forEach((g) => { const r = R(g); if (r.width - 5 < cw + 2 * S.GLUE - 0.5 || r.height - 5 < ch + 2 * S.GLUE - 0.5) fails.push('a glue box cannot hold its card with 30 px of room'); });
            if (isKey !== (all('[data-lcs-keylabel]').length === 2)) fails.push('the key does not show the labels in their boxes');
            all('[data-lcs-keylabel]').forEach((k) => { if (k.dataset.lcsKeylabel !== k.closest('[data-lcs-home]').dataset.lcsHomepart) fails.push('the key puts a label in the wrong box'); });
          } else {
            if (cards.length) fails.push('cards to cut out on a level that writes the labels');
            const want = lv === 3 ? 3 : 2;
            if (bank.length !== want || !parts.every((p) => bank.includes(p))) fails.push('the word bank is not the two labels' + (lv === 3 ? ' and one more' : ''));
            if (lv === 3) { const ex = bank.filter((w) => !parts.includes(w)); if (ex.length !== 1 || !t.noParts.includes(ex[0])) fails.push('the third word of the word bank names a part of the picture'); }
            homes.forEach((h) => { const l = one('[data-lcs-line]', h); if (!l) fails.push('a home has no row to write on'); else if (isKey ? l.dataset.lcsAnswer !== h.dataset.lcsHomepart : l.dataset.lcsAnswer) fails.push('the key does not write the label on its row'); });
          }
        }

        // ---------------------------------------------------------------- K-676 I can teach you a fact
        if (mode === 'teach') {
          const tops = chipsOf(3, true);
          tops.forEach((t) => { if (!INFO.teachTopics.some((x) => x.key === t)) fails.push(`"${t}" is no topic of the bank`); });
          if (tops.some((t) => INFO.factTopics.some((u) => u.key === t || u.name === t))) fails.push('a topic of the day before is offered');
          const offered = tops.map((k) => INFO.teachTopics.find((x) => x.key === k)).filter(Boolean);
          bigBox('topic');
          const lr = all('[data-lcs-labelrow] [data-lcs-line]');
          if (lr.length !== 2) fails.push('not two rows for labels beside the box');
          const db = one('[data-lcs-drawbox]'); lr.forEach((r) => { if (db && R(r).left < R(db).right) fails.push('a label row does not stand beside the box'); if (+r.dataset.lcsNeed !== S.LABEL) fails.push(`a label row is not to hold ${S.LABEL} letters`); });
          const fr = frameRows(S.FRAMES.teach[lv]);
          const smp = INFO.teachTopics.find((x) => x.key === root.dataset.lcsSample);
          if (!smp || tops[0] !== smp.key) fails.push('the sample is not about the first topic');
          all('[data-lcs-frame="topic+can"], [data-lcs-frame="topic+has"]').forEach((f) => { const tb = one('[data-lcs-line] svg', f); if (tb && R(tb).width < Math.max(...tops.map(lettersOf)) * S.LETTER) fails.push('a topic blank cannot hold every topic of the page'); });
          const tbk = one('[data-lcs-teachbank]');
          if (lv === 1) {
            // every word of the word bank is true of a topic offered on THIS page; every topic offered finds a true can-word and a
            // true has-word; "fly" whenever an animal that flies is offered; the sample's words
            const rowsB = all('[data-lcs-teachbank] > div').map((d) => all('[data-lcs-bankword]', d).map((x) => x.dataset.lcsBankword));
            const cn = rowsB[0] || [], hs = rowsB[1] || [];
            if (!tbk || !cn.length || !hs.length || cn.length > 4 || hs.length > 4 || cn.some((w) => !INFO.canWords.includes(w)) || hs.some((w) => !INFO.hasWords.includes(w))) fails.push('level 1: the word bank is not one to four can-words and has-words');
            cn.forEach((w) => { if (!offered.some((t) => t.can.includes(w))) fails.push(`level 1: "${w}" is true of no animal offered`); });
            hs.forEach((w) => { if (!offered.some((t) => t.has.includes(w))) fails.push(`level 1: "${w}" is true of no animal offered`); });
            offered.forEach((t) => { if (!hs.some((w) => t.has.includes(w)) || !cn.some((w) => t.can.includes(w))) fails.push(`level 1: the word bank has no true word for the ${t.key}`); });
            if (offered.some((t) => t.can.includes('fly')) && !cn.includes('fly')) fails.push('level 1: no "fly" beside an animal that flies');
            if (smp && (!cn.includes(smp.sample[0]) || !hs.includes(smp.sample[1]))) fails.push('the sample\'s words are not in the word bank');
          } else if (lv === 3) { if (all('[data-lcs-bankword]').map((x) => x.dataset.lcsBankword).join('|') !== INFO.teachBank.join('|')) fails.push('the word bank of level 3 is not the one of the bank'); }
          else if (all('[data-lcs-bankword]').length) fails.push('a word bank on level 2');
          const mt = model && INFO.teachModels.find((m) => m.topic === model.dataset.lcsModeltopic);
          if (!mt || txt(model) !== `${S.WORDS.like} A ${mt.topic} can ${mt.can}. ${lv === 3 ? 'It' : 'A ' + mt.topic} has ${mt.has}.` || tops.includes(mt.topic) || INFO.factTopics.some((u) => u.key === mt.topic)) fails.push('the model is not a model of the bank on a topic not offered, in the shape of the frames');
          if (mt && offered.some((t) => t.family === mt.family)) fails.push(`the model "${mt.topic}" is of the family of an animal offered`);
          if (isKey && smp) { const got = keyOf(fr).map((x) => x.join('|')).join('/');
            const want = lv <= 2 ? [smp.key + '|' + smp.sample[0], smp.key + '|' + smp.sample[1]].join('/') : smp.l3.join('/');
            if (got !== want) fails.push('the key\'s sample is not the sample of the first topic');
            if (all('[data-lcs-labelrow] [data-lcs-line]').map((l) => l.dataset.lcsAnswer).join('|') !== smp.labels.join('|')) fails.push('the key\'s labels are not the sample\'s'); }
          else if (!isKey && keyOf(fr).flat().some(Boolean)) fails.push('a sample on the page of the child');
        }

        // ---------------------------------------------------------------- K-677 put a small moment in order
        if (mode === 'order') {
          const s = INFO.stories.find((x) => x.title === root.dataset.lcsStory);
          if (!s) return fails.concat(['no story of the bank']);
          const sents = H.n === 3 ? s.s3 : s.s4;
          const st = all('[data-lcs-step]');
          if (st.length !== H.n) fails.push(`${st.length} sentences, not ${H.n}`);
          const tru = st.map((x) => +x.dataset.lcsTrue);
          st.forEach((x, i) => { if (txt(one('[data-lcs-steptext]', x)) !== sents[tru[i] - 1]) fails.push(`box ${i + 1} is not sentence ${tru[i]} of the story`);
            const nb = one('[data-lcs-numbox]', x); if (isKey && txt(nb) !== String(tru[i])) fails.push(`the key does not number box ${i + 1}`); });
          if (tru.slice().sort().join() !== sents.map((_, i) => i + 1).join()) fails.push('the sentences are not the story');
          if (tru.join() === sents.map((_, i) => i + 1).join() || tru.join() === sents.map((_, i) => i + 1).reverse().join()) fails.push('the sentences stand in their order or its reverse');
          if (txt(one('[data-lcs-storytitle]')) !== `${s.title} by ${s.name}`) fails.push('the story does not name its title and writer');
          const fcs = all('[data-lcs-faces] [data-lcs-face]');
          if (fcs.length !== H.faces || !fcs.some((f) => f.dataset.lcsFace === s.feel) || new Set(fcs.map((f) => f.dataset.lcsFace)).size !== fcs.length) fails.push(`not ${H.faces} faces with the one that is right`);
          fcs.forEach((f) => { if (txt(one('[data-lcs-faceword]', f)) !== INFO.pics[f.dataset.lcsFace]) fails.push('a face does not carry its word'); });
          const rg = all('[data-lcs-face] [data-lcs-ring]'); if (isKey ? rg.length !== 1 || rg[0].closest('[data-lcs-face]').dataset.lcsFace !== s.feel : rg.length) fails.push('the key does not ring the right face');
          const db = one('[data-lcs-drawrole="last"]'); if (!db || R(db).height < 140) fails.push('no box to draw what happened last');
          if (isKey && (!db || all('[data-lcs-keynote] > div', db).map(txt).join(' ') !== `The child draws: ${sents[sents.length - 1]} ${S.WORDS.keyDraw}`)) fails.push('the key does not say what the child draws and that any drawing that shows it is right');
        }

        // ---------------------------------------------------------------- K-678 my small moment
        if (mode === 'moment') {
          const tops = chipsOf(2, true);
          tops.forEach((t) => { if (!INFO.moments.some((x) => x.chip === t)) fails.push(`"${t}" is no moment of the bank`); });
          const mb = all('[data-lcs-mbox]');
          if (mb.length !== 3 || mb.map((b) => txt(one('[data-lcs-boxword]', b))).join('|') !== S.WORDS.box.join('|')) fails.push('not three boxes for first, next, and last');
          const bxs = mb.map((b) => one('[data-lcs-drawbox]', b)).filter(Boolean);
          if (bxs.length !== 3) fails.push('a part has no box to draw in');
          // level 1: three boxes in a row, a third of the body high; levels 2 and 3: three small boxes, one under the other,
          // each with its row "I ___" beside it
          if (H.rows === 1) bxs.forEach((b) => { if (R(b).height < rb.height * S.DRAW - 1) fails.push(`a box to draw in is ${Math.round(R(b).height)} px high: less than a third of the body`); });
          else bxs.forEach((b) => { if (R(b).width < S.SMALLBOX[0] || R(b).height < S.SMALLBOX[1]) fails.push(`a small box to draw in is ${Math.round(R(b).width)} x ${Math.round(R(b).height)} px`); });
          const fr = frameRows(H.rows === 1 ? [S.FRAMES.moment.last] : [S.FRAMES.moment.band, S.FRAMES.moment.band, S.FRAMES.moment.band], '[data-lcs-rows] > [data-lcs-frame]');
          fr.forEach((f, i) => { if (H.rows === 1) { const bg = one('[data-lcs-badge]', f); if (!bg || txt(bg) !== '3') fails.push('the row of level 1 is not numbered for box 3'); }
            else { const band = f.closest('[data-lcs-mbox]'); if (!band || band.dataset.lcsMbox !== String(i + 1)) fails.push(`row ${i + 1} does not stand beside box ${i + 1}`);
              const bx = band && one('[data-lcs-drawbox]', band); if (bx && (R(f).left < R(bx).right || Math.abs(R(f).bottom - R(bx).bottom) > 30)) fails.push(`row ${i + 1} does not stand beside its box`); } });
          const felt = frameRows([S.FRAMES.moment.felt], '[data-lcs-feltrow] > [data-lcs-frame]', false);
          const fcs = all('[data-lcs-feltrow] [data-lcs-face]');
          if (fcs.map((f) => f.dataset.lcsFace).sort().join() !== ['happy', 'mad', 'sad', 'scared'].join()) fails.push('not the four faces');
          if (fcs.some((f) => !one('[data-lcs-faceword]', f)) !== (lv === 3) || fcs.some((f) => one('[data-lcs-faceword]', f) && txt(one('[data-lcs-faceword]', f)) !== INFO.pics[f.dataset.lcsFace])) fails.push(lv < 3 ? 'the faces do not carry their words' : 'the faces of level 3 carry their words');
          // level 3: the word bank stands beside "First", where its words are used (never beside "I felt")
          const bank = all('[data-lcs-bankword]').map((x) => x.dataset.lcsBankword);
          if (lv === 3 ? bank.join('|') !== INFO.momentBank.join('|') : bank.length) fails.push('the word bank is not the one of level 3 (and only there)');
          if (lv === 3 && !one('[data-lcs-cap="1"] [data-lcs-bank]')) fails.push('the word bank does not stand beside "First"');
          const smp = INFO.moments.find((x) => x.key === root.dataset.lcsSample);
          if (!smp || tops[0] !== smp.chip) fails.push('the sample is not about the first moment');
          const mt = model && INFO.momentModels.find((m) => m.topic === model.dataset.lcsModeltopic);
          const mtext = mt ? (H.rows === 1 ? `I ${mt.s[2]}. I felt ${mt.feel}.` : `${mt.s.map((x) => 'I ' + x + '.').join(' ')} I felt ${mt.feel}.`) : '';
          if (!mt || txt(model) !== `${S.WORDS.like} ${mtext}`) fails.push('the model is not a model of the bank in the shape of the frames');
          if (mt && (mt.notWith || []).some((k) => tops.includes((INFO.moments.find((x) => x.key === k) || {}).chip))) fails.push(`the model "${mt.topic}" stands beside a moment it tells`);
          if (isKey && smp) { const got = keyOf(fr).map((x) => x[0]).join('|'), want = (H.rows === 1 ? [smp.l2[2]] : smp.l2).join('|');
            if (got !== want || keyOf(felt).map((x) => x[0]).join() !== smp.feel) fails.push('the key\'s sample is not the sample of the first moment');
            const notes = bxs.map((b) => txt(one('[data-lcs-keynote]', b)));
            if (!notes[0].startsWith(`Sample (${smp.chip}): ${S.WORDS.keyDrawAny}`) || notes[1] !== S.WORDS.keySpell || notes[2] !== S.WORDS.keyFeel) fails.push('the key does not say that any drawing, sounded-out spelling, and any feeling word are right'); }
          else if (!isKey && keyOf(fr).concat(keyOf(felt)).flat().some(Boolean)) fails.push('a sample on the page of the child');
        }

        // ---------------------------------------------------------------- K-679 a friend asks, I add
        if (mode === 'ask') {
          const ps = all('[data-lcs-ask]');
          if (ps.length !== H.n) fails.push(`${ps.length} pieces, not ${H.n}`);
          const at = [], lens = [];
          ps.forEach((p, k) => {
            const a = INFO.asks.find((x) => x.text === p.dataset.lcsText);
            if (!a) { fails.push(`piece ${k + 1} is no piece of the bank`); return; }
            if (txt(one('[data-lcs-piecetext]', p)) !== a.text || txt(one('[data-lcs-question]', p)) !== `${a.asker} asked: ${a.qText || S.ASKQ[a.q]}`) fails.push(`piece ${k + 1} does not print its sentence and its question`);
            const im = one('img', p); if (!im || im.dataset.lcsPic !== a.pic) fails.push(`piece ${k + 1} does not show its picture`);
            const op = all('[data-lcs-opt]', p), kinds = op.map((o) => o.dataset.lcsKind);
            if (op.length !== H.choices || kinds.filter((x) => x === a.q).length !== 1 || new Set(kinds).size !== H.choices) fails.push(`piece ${k + 1} has not ${H.choices} different things to add with one answer`);
            op.forEach((o) => { const want = o.dataset.lcsKind === 'same' ? a.same : a.answers[o.dataset.lcsKind]; if (txt(o) !== want) fails.push(`piece ${k + 1}: "${txt(o)}" is not its ${o.dataset.lcsKind} answer`); if ((o.dataset.lcsOk === '1') !== (o.dataset.lcsKind === a.q)) fails.push(`piece ${k + 1} is keyed wrong`); });
            if (!!H.same !== kinds.includes('same')) fails.push(H.same ? `piece ${k + 1} has no sentence that says the piece again` : `piece ${k + 1} says the piece again on level ${lv}`);
            at.push(kinds.indexOf(a.q)); lens.push(op.map((o) => [txt(o).length, o.dataset.lcsKind === a.q]));
            const rg = all('[data-lcs-ring]', p); if (isKey ? rg.length !== 1 || rg[0].parentElement.dataset.lcsKind !== a.q : rg.length) fails.push(`the key does not ring the answer of piece ${k + 1}`);
          });
          // the right sentence never stands in one place on every piece (nor in a pattern), and is not the one to find by length
          if (at.length >= 2 && new Set(at).size < 2) fails.push('the right sentence stands in one place in every piece: ' + at.join(''));
          if (at.length >= 3 && !placesOk(at)) fails.push('the answers stand in a pattern: ' + at.join(''));
          { const right = (l) => (l.find((x) => x[1]) || [0])[0];
            const longest = lens.filter((l) => l.every(([n, ok]) => ok || n < right(l))).length, shortest = lens.filter((l) => l.every(([n, ok]) => ok || n > right(l))).length;
            if (H.choices === 3 ? (longest > 1 || shortest > 1) : (!longest || !shortest)) fails.push(`the right sentence is the longest in ${longest} and the shortest in ${shortest} pieces`); }
          if (ps.length >= 3 && new Set(ps.map((p) => p.dataset.lcsQ)).size < 2) fails.push('every piece asks the same kind of question');
        }

        // ---------------------------------------------------------------- K-680 author's chair
        if (mode === 'chair') {
          const e = INFO.chairExamples.find((x) => x.name === root.dataset.lcsExname), sm = INFO.chairExamples.find((x) => x.name === root.dataset.lcsSmpname);
          if (!e || !model || txt(model) !== `${S.WORDS.like} ${e.name} read: “${e.piece}” A friend asked: “${e.q}” ${e.name} added: “${e.added}”`) fails.push('the worked example is not one of the bank');
          if (e && INFO.asks.some((a) => a.text === e.piece)) fails.push('the worked example is a piece of the day before');
          if (one('[data-lcs-example]') !== blocks[0]) fails.push('the worked example is not at the top of the page');
          if (e && !/^(Who|What|Where|When|How)\b/.test(e.q)) fails.push('the worked example asks a yes-or-no question');
          if (lv === 1 && e && new RegExp(S.CHIP_KIND).test(e.q)) fails.push('the worked example of level 1 asks one of the four questions to circle');
          if (!sm || (e && sm.name === e.name)) fails.push('the key\'s sample is not another example of the bank');
          const qc = all('[data-lcs-qchip]');
          if (qc.length !== H.qChips || (H.qChips && qc.map((x) => x.dataset.lcsQchip).sort().join('|') !== INFO.chairQuestions.slice().sort().join('|'))) fails.push('the questions to circle are not the ones of this level');
          qc.forEach((x) => { if (txt(x) !== x.dataset.lcsQchip) fails.push('a question chip does not print its question'); });
          if (H.qChips && isKey !== (txt(one('[data-lcs-keyq]')) === S.WORDS.keyQ)) fails.push('the key does not say that any question the friend asked is right');
          const qr = all('[data-lcs-line][data-lcs-blank="q"]');
          if (qr.length !== (H.qChips ? 0 : 1)) fails.push('no row for the question (or one on level 1)');
          qr.forEach((l) => { if (R(l).width < rb.width - 40) fails.push('the row for the question does not run the width of the page'); if (isKey ? l.dataset.lcsAnswer !== (sm || {}).q : l.dataset.lcsAnswer) fails.push('the key does not write the question of its sample'); });
          const db = bigBox('added');
          const ad = all('[data-lcs-line][data-lcs-blank="add"]');
          if (ad.length !== H.add) fails.push(`${ad.length} rows for what was added, not ${H.add}`);
          ad.forEach((l) => { if (+l.dataset.lcsNeed !== S.ADD[lv]) fails.push(`a row for what was added is not to hold ${S.ADD[lv]} letters`); if (db && R(l).top < R(db).bottom) fails.push('a row for what was added does not stand under the box'); });
          if (isKey && sm) { const got = ad.map((l) => l.dataset.lcsAnswer || '').filter(Boolean).join(' '); const want = lv === 1 ? sm.word : lv === 2 ? sm.short : sm.added; if (got !== want) fails.push('the key\'s sample is not the one of its example');
            if (!db || !txt(one('[data-lcs-keynote]', db)).startsWith(`Sample (${sm.name} read: “${sm.piece}” A friend asked: “${sm.q}”)`)) fails.push('the key does not name its sample\'s piece and question'); }
        }
        return fails;
      }, SPEC, INFO);
    },
  };
}

module.exports = { makeDrawWriteKType, dwkFaultsOf, drawPage, copyList, LEVELS, INSTR, LINES, CHECK, WORDS, FRAMES, SPEC, MODES, FIT, placesOk, emOf, wrapRows };
