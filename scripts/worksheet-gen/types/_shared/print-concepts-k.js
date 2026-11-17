/**
 * print-concepts-k.js — eight Kindergarten pages for the unit "How Books and Print Work" (English literacy year, Daily
 * Teaching System Part 12.3, 2026-11-17). The books, sentences and pictures are data/literacy/print-concepts-k.en.json.
 * Children are 5 or 6 and most cannot read yet: THE TEACHER READS every instruction, title, label and sentence aloud. A
 * child answers by looking, pointing, circling, putting an X or a dot, drawing an arrow or a line, cutting and gluing,
 * writing a number in a box of 72 px or more, and tracing or copying a short title or sentence on a Kindergarten row
 * (110 px or more: 120 px on K-666, 112 px for the copy of K-672 level 3).
 *
 * Lesson "Front cover, back cover, and title page" (RI.K.5)
 *   parts  K-665 (day 1). The page draws one invented book (two on level 1) as its parts: the FRONT COVER (a closed book,
 *          its spine on the left, the title, a library picture and "by" and the author), the TITLE PAGE (an open book: the
 *          edge of the left page and the right page, with the title and the author again, the title 16 px or more from the
 *          gutter and the page edge), the BACK COVER (a closed book seen from the back, its spine on the right: grey lines
 *          for the words on the back and a bar code, no title, no picture), and on level 3 the FIRST PAGE OF THE STORY (an
 *          open book: a picture and the first sentence). A box under the instruction says what each part is (the teacher
 *          reads it). The parts never stand in the order of a book or its reverse.
 *     level 1  two books, each a row of its three parts; no part stands in one place in both rows: circle the front
 *              cover in each row, put an X on the back cover in each row
 *     level 2  one book in one row, a glue box right under each part; three labels to cut out (front cover, title page,
 *              back cover; never in the order of the parts above them); circle the title on the front cover and on the
 *              title page
 *     level 3  one book in four parts in one row, a glue box right under each; the same three labels: one part gets no
 *              label (the story page); put a green dot on the page where the story starts (either page of the story spread
 *              is right: the key rings the spread and says so)
 *          Every glue box holds its label with 30 px of room on every side and is at least three times nearer to its own
 *          part than to any other part (measured), so a label glued under its part is never taken for another part's.
 *   make   K-666 (day 2). The child's own book: a big front cover (a row for the title, a box to draw in, "by" and a row
 *          for the child's name across the whole cover) and a title page (a row for the title, "by" and a row for the
 *          name). Kindergarten rows of 120 px. The title is one of the bank's two-word titles (at most nine letters with
 *          the space: it fits a Kindergarten row).
 *     level 1  the title in light grey on both rows, to trace; the box to draw in under the title, the width of the cover
 *     level 2  the title to trace on the cover; on the title page the child copies it from the cover; the box as on level 1
 *     level 3  the title printed in the task line AND large (a cap height of about 0.6 in) in a model box right above the
 *              cover's title row, the box to draw in beside it; the child writes the title on the cover and on the title page
 *
 * Lesson "Read left to right, top to bottom" (RF.K.1.a)
 *   track  K-667 (day 1). Big-print sentences of four to six words that run over two lines; the second line starts where
 *          the first one starts (the return sweep). Each sentence stands on a page-shaped frame whose right edge comes just
 *          after line 1 (as in a book, the first line is the longer one), so line 1 visibly ends at the edge of the page. A
 *          green dot before the first word, a red dot after the last.
 *     level 1  three sentences; a grey dashed arrow under each line and a grey return-sweep arrow (with the same solid head
 *              as the arrows, at the start of line 2) to trace
 *     level 2  three sentences, nothing printed: the child puts the green and the red dot and draws the arrows and the
 *              arrow back to the next line (the key shows them)
 *     level 3  two sentences of five or six words, evenly spaced, a 72 px box under every word: the child writes 1, 2,
 *              3 ... in reading order
 *   pages  K-668 (day 2). Pattern-book pages ("I see a cow."): each line has its picture after it.
 *     level 1  two pages of three lines: write 1, 2, 3 in the boxes in reading order; a green dot on the first word and a
 *              red dot on the last word of each page
 *     level 2  a book of four pages printed as two open spreads, one above the other, a small curved turn-the-page arrow
 *              between them: write the page numbers 1 to 4 in the circles at the outer foot of each page (left page first,
 *              then the right page, then the next spread); a green dot on the first word of the book, a red dot on the last
 *     level 3  two little books, each one open spread with two lines on each page: write 1 to 4 in reading order. On at
 *              least one spread the lines of the RIGHT page stand higher than those of the left page (its pictures come
 *              first on the left page, last on the right), so reading top first gives the wrong order
 *
 * Lesson "One spoken word, one written word" (RF.K.1.b)
 *   dots   K-669 (day 1). Task 1: four rows of a word, a single letter, a scribble (a wave, a low zigzag or a spiral:
 *          nothing read as a letter or a digit; levels 2 and 3 also a digit, never one that looks like a letter of its row:
 *          g 9, s 5, o 0, l 1): circle the word (its place follows no pattern). Task 2: four sentences with a picture; the
 *          teacher reads, the child touches each word and puts ONE dot under each word.
 *     level 1  sentences of three words of one syllable each (for every speaker: no owl)
 *     level 2  four or five words, one or two of two syllables (never the last word): more beats than words
 *     level 3  five or six words with a word of three syllables or more (never the last word); the words of task 1 are
 *              short (three letters), so a word is not told by its length
 *   match  K-670 (day 2). The teacher names a picture; three (level 1: two) printed words start with the same letter and the
 *          same sound and differ in length (S one syllable, at most four letters; M two syllables, five to seven letters;
 *          L three or more syllables, eight letters or more): the child circles the word that fits what he hears. A child
 *          who cannot read sees the difference: neighbouring lengths of a row differ by 1.35 times or more in printed width
 *          and by two letters (S to M) or three (M to L) or more (measured). Every picture is one a kindergartner names with
 *          exactly that word. Word length is an answer place: the right word is the longest in at most half of the rows.
 *     level 1  six rows, two words (one syllable or three and more), the right one short in three rows and long in three
 *     level 2  six rows, three words; each length is right at least once
 *     level 3  four pictures, each with two sentences that start alike, one longer by two words or more; the teacher reads
 *              one (the teacher strip at the foot, under a dashed cut line, prints them numbered; it is cut off before the
 *              page is copied) and the child points under the words and circles the sentence she read
 *
 * Lesson "Spaces between words: count the words" (RF.K.1.c)
 *   count  K-671 (day 1). Four sentences in big print with wide spaces, a picture each: draw a line in each space, count
 *          the words, and circle (level 1) or write the number in a 72 px box. The counts of a page differ and follow no
 *          pattern (never rising or falling all the way, not even with steps that stay: 2, 2, 3, 3).
 *     level 1  two or three words; every space is marked with a dotted box
 *     level 2  three to five words; beats and words never the same count, for every common pronunciation
 *     level 3  four to six words with words of two syllables; beats and words never the same count, likewise
 *   spaces K-672 (day 2). A sentence printed with spaces beside the same sentence without them: circle the one that is easy
 *          to read (its side follows no pattern, no repeated block like R R L L). Then a model sentence, a glue strip and
 *          its word cards at the foot (never in the model's order, its reverse, or with its first word first): glue them in
 *          order with finger spaces. Every card is 96 x 86 px or more; the strip keeps 50 px between two cards and to every
 *          edge (measured).
 *     level 1  four rows; a sentence of three cards
 *     level 2  four rows; a sentence of four cards (one row of the strip)
 *     level 3  two rows; a short sentence to copy on a Kindergarten row with finger spaces (the key writes it with 50 px
 *              between the words); a sentence of five cards (two rows of the strip, the model beside it)
 *
 * Every picture of the bank was looked at on a contact sheet; no two pictures of one kind on a page. The page turns the
 * font's joined letters off (fi, fl, ff), and an f before i, f, l or t and a t before t get room of their own. Apostrophes
 * and quotes are typographic. No page leaves a blank band of more than 40 px. The instruction of each level is INSTR
 * (registered as strings; verify() reads it on the page). verify() carries its OWN copy of every ruled text and measure
 * (SPEC), so a build that changes one of them fails its pages. English only. Themeless: a copy draws other books, words
 * and sentences. PDF only (the answer key is for checks and review). The bank is checked when this file loads (pckFaultsOf),
 * including trial draws of every level; no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const TOK = require('../../primitives/_tokens.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const BANK = require('../../data/literacy/print-concepts-k.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, rowSvg } = _parts;
const T = TOK.color;
const GREEN = TOK.codeColors.codeGreen, RED = TOK.codeColors.codeRed;
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const ROW = 128;                 // a Kindergarten writing row (about 3/4 in from the top rule to the baseline)
const ROW_MAKE = 120;
const COPY_ROW = 112;             // the copy row of K-672 level 3 (a Kindergarten row of the lowest kind, never under 110)            // the four Kindergarten rows of K-666 (two on the cover, two on the title page; never under 110)
const BOX = 72;                  // a box for one number (three quarters of an inch)
const GLUE = 30;                 // the room a glue box of K-665 keeps around its label
const CARD_W = 96, CARD_H = 86;  // a word card of K-672 for five-year-old hands (at least 96 x 86 px)
const FINGER = 50;               // a finger space: between two glued cards of K-672 and to every edge of the strip, and
                                 // between the words of the key's copied sentence
const NEAR = 3;                  // a glue box of K-665 is at least three times nearer to its own part than to any other part
const ROOM = 16;                 // the room a title keeps from the edge and the gutter of the title page
const RATIO = 1.35;              // K-670: neighbouring lengths of a row differ by this printed width ratio (the bank asks 1.40)
const INNER = W - 24;            // the width inside a task card
const SPINE = 14;                // the spine of a drawn book
const MODES = ['parts', 'make', 'track', 'pages', 'dots', 'match', 'count', 'spaces'];

/** the page instruction of every level (registered as strings; verify() compares the page with its own copy, SPEC) */
const INSTR = {
  parts: { 1: 'A book has a front cover, a title page, and a back cover.', 2: 'A book has a front cover, a title page, and a back cover.', 3: 'A book has a front cover, a title page, and a back cover. The story starts after the title page.' },
  make: { 1: 'The title is on the front cover and again on the title page.', 2: 'The title is on the front cover and again on the title page.', 3: 'The title is on the front cover and again on the title page.' },
  track: { 1: 'We read left to right, then go down to the next line.', 2: 'We read left to right, then go down to the next line.', 3: 'We read left to right, then go down to the next line.' },
  pages: { 1: 'We read the lines from top to bottom.', 2: 'We read the left page, then the right page, then we turn the page.', 3: 'We read the lines of the left page before the lines of the right page.' },
  dots: { 1: 'Each word we say is one word on the page.', 2: 'Each word we say is one word on the page.', 3: 'Each word we say is one word on the page.' },
  match: { 1: 'A word that takes longer to say usually has more letters.', 2: 'A word that takes longer to say usually has more letters.', 3: 'When we say more words, we see more words.' },
  count: { 1: 'A space comes between two words.', 2: 'A space comes between two words.', 3: 'A space comes between two words.' },
  spaces: { 1: 'Spaces between words make a sentence easy to read.', 2: 'Spaces between words make a sentence easy to read.', 3: 'Spaces between words make a sentence easy to read.' },
};
/** the task lines of every level ({T}: the title of the copy) */
const LINES = {
  parts: { 1: ['Circle the front cover in each row. Put an X on the back cover in each row.'],
    2: ['Cut out the labels. Glue each label under its part of the book.', 'Circle the title on the front cover and on the title page.'],
    3: ['Cut out the labels. Glue each label under its part of the book. One part gets no label.', 'Put a green dot on the page where the story starts.'] },
  make: { 1: ['Trace the title. Draw a picture for your book. Write your name after by.', 'Trace the title on the title page. Write your name again.'],
    2: ['Trace the title. Draw a picture for your book. Write your name after by.', 'Write the title again on the title page. Write your name again.'],
    3: ['Write the title {T} on the front cover. Draw a picture. Write your name after by.', 'Write the title again on the title page. Write your name again.'] },
  track: { 1: ['Your teacher reads each sentence. Touch each word. Trace the arrows.'],
    2: ['Your teacher reads each sentence. Put a green dot where you start and a red dot where you stop. Draw an arrow under each line and an arrow back to the next line.'],
    3: ['Your teacher reads each sentence. Write 1 under the first word, 2 under the next word, and so on.'] },
  pages: { 1: ['Write 1, 2, and 3 in the boxes, in the order you read the lines.', 'Put a green dot on the first word and a red dot on the last word of each page.'],
    2: ['Write the page numbers 1, 2, 3, and 4 in the circles.', 'Put a green dot on the first word of the book and a red dot on the last word.'],
    3: ['In each book, write 1, 2, 3, and 4 in the boxes, in the order you read the lines.'] },
  dots: { 1: ['Circle the word in each row.', 'Your teacher reads each sentence. Touch each word. Put one dot under each word.'],
    2: ['Circle the word in each row.', 'Your teacher reads each sentence. Touch each word. Put one dot under each word.'],
    3: ['Circle the word in each row.', 'Your teacher reads each sentence. Touch each word. Put one dot under each word.'] },
  match: { 1: ['Your teacher says the name of each picture. Circle the word you hear.'],
    2: ['Your teacher says the name of each picture. Circle the word you hear.'],
    3: ['Your teacher reads one sentence for each picture. Point to each word. Circle the sentence you hear.'] },
  count: { 1: ['Your teacher reads each sentence. Draw a line in each space. Count the words. Circle the number.'],
    2: ['Your teacher reads each sentence. Draw a line in each space. Count the words. Write the number.'],
    3: ['Your teacher reads each sentence. Draw a line in each space. Count the words. Write the number.'] },
  spaces: { 1: ['Circle the sentence that is easy to read.', 'Cut out the words. Glue them in order with finger spaces.'],
    2: ['Circle the sentence that is easy to read.', 'Cut out the words. Glue them in order with finger spaces.'],
    3: ['Circle the sentence that is easy to read.', 'Copy the sentence. Leave a finger space between the words.', 'Cut out the words. Glue them in order with finger spaces.'] },
};
/** the box that says what each part of a book is (K-665) */
const LEGEND = [['front', 'Front cover:', 'the title, the author, and a picture.'], ['title', 'Title page:', 'inside the book. It shows the title and the author again.'], ['back', 'Back cover:', 'turn the book over. It is the outside at the back.']];
const CARD = { front: 'front cover', title: 'title page', back: 'back cover' };
/** K-669: the scribbles beside a word: a wave, a low zigzag of many teeth, a spiral (no row of strokes, no crossed strokes,
 *  no tight wave that reads as cursive m or w: nothing a child reads as a letter or a digit; looked at). Four rows: one kind
 *  comes twice */
const SCRIBBLES = ['M4 22 C 12 4, 22 4, 30 22 S 48 40, 56 22 S 72 4, 80 22', 'M4 24 L10 16 L16 24 L22 16 L28 24 L34 16 L40 24 L46 16 L52 24 L58 16 L64 24 L70 16 L76 24',
  'M44 20 a3 3 0 1 0 -6 0 a6 6 0 1 0 12 0 a9 9 0 1 0 -18 0 a12 12 0 1 0 24 0 a15 15 0 1 0 -30 0'];
/** K-669: a letter and a digit a child can take for one another never stand in one row */
const CONFUSABLE = [['g', '9'], ['s', '5'], ['o', '0'], ['l', '1']];
/** K-670: words that print almost alike and never share a row */
const NEVER_ROW = [['snowman', 'strawberry'], ['balloon', 'broccoli'], ['tractor', 'telephone'], ['ladder', 'lollipop'], ['cake', 'camel'], ['corn', 'camel'], ['tent', 'tiger']];
/** the head of the teacher strip of K-670 level 3 (under a dashed cut line; the sentences to read follow, numbered) */
const TSTRIP = 'Teacher strip: cut off before you copy the page.';

/* ---------------------------------------------------------------- the levels ---------------------------------------------------------------- */
const LEVELS = {
  // cover: a closed book (w x h); spread: an open book (w x h); area: the room a drawing stands in
  // under: the room between a part and its glue box; the parts stand on one line (their feet level), each glue box right
  // under its part, the columns far enough apart that a glue box is three times nearer to its own part (measured)
  parts: {
    1: { rows: 2, cover: [164, 272], spread: [196, 156], tfont: 20, afont: 16, pic: 88, sfont: 16 },
    2: { rows: 1, cover: [196, 350], spread: [196, 180], tfont: 22, afont: 16, pic: 104, sfont: 16, card: [140, 50], cardFont: 22, glue: [205, 140], under: 6 },
    3: { rows: 1, four: true, cover: [128, 270], spread: [150, 160], story: [180, 160], storyFrac: 0.42, tfont: 18, afont: 16, pic: 76, spic: 62, sfont: 16, card: [66, 80], cardFont: 20, glue: [131, 145], under: 4 },
  },
  // draw: the height of the box to draw in (the full width of the cover); level 3 has the title as a model above the title
  // row and the box to draw in beside it
  make: { 1: { trace: 2, draw: 130 }, 2: { trace: 1, draw: 130 }, 3: { trace: 0, model: 80 } },
  track: {
    1: { n: 3, font: 42, words: [4, 6], arrows: 'trace', dots: true, gap: 62 },
    2: { n: 3, font: 42, words: [4, 6], arrows: 'draw', dots: false, gap: 62 },
    3: { n: 2, font: 40, words: [5, 6], boxes: true, dots: true, gap: 34 },
  },
  pages: { 1: { pages: 2, font: 30, pic: 72, per: 3 }, 2: { spreads: 1, pages: 4, font: 26, pic: 116, per: 4 }, 3: { spreads: 2, font: 22, pic: 80, per: 4 } },
  dots: {
    1: { rows: 4, items: 3, look: 36, n: 4, font: 40, pic: 78 },
    2: { rows: 4, items: 4, look: 36, n: 4, font: 36, pic: 76 },
    3: { rows: 4, items: 4, look: 36, short: true, n: 4, font: 30, pic: 70 },
  },
  match: { 1: { rows: 6, opts: 2, font: 36, pic: 84 }, 2: { rows: 6, opts: 3, font: 34, pic: 84 }, 3: { items: 4, font: 26, pic: 92 } },
  count: { 1: { n: 4, font: 42, chips: [2, 3, 4], pic: 76 }, 2: { n: 4, font: 36, pic: 76 }, 3: { n: 4, font: 30, pic: 76 } },
  spaces: {
    1: { read: 4, font: 30, cards: 'cards1', cardFont: 30 },
    2: { read: 4, font: 30, cards: 'cards2', cardFont: 28 },
    3: { read: 2, font: 30, copy: true, cards: 'cards3', cardFont: 28 },
  },
};

/* ---------------------------------------------------------------- small helpers ---------------------------------------------------------------- */
/** the advance widths (em) of Nunito 700 with its joined letters off (measured 2026-11-17, sentences-k.js); the pages print
 *  at 800, about 4 % wider: every estimate below adds 8 % */
const NUNITO700 = { a: 0.547, b: 0.6, c: 0.4625, d: 0.6, e: 0.542, f: 0.3422, g: 0.604, h: 0.585, i: 0.255, j: 0.259, k: 0.536, l: 0.319, m: 0.877,
  n: 0.585, o: 0.576, p: 0.6, q: 0.6, r: 0.392, s: 0.488, t: 0.3574, u: 0.579, v: 0.565, w: 0.891, x: 0.546, y: 0.564, z: 0.474, A: 0.744, B: 0.688,
  C: 0.6582, D: 0.762, E: 0.597, F: 0.562, G: 0.736, H: 0.773, I: 0.282, J: 0.335, K: 0.665, L: 0.562, M: 0.868, N: 0.748, O: 0.785, P: 0.652,
  Q: 0.785, R: 0.686, S: 0.631, T: 0.6334, U: 0.738, V: 0.713, W: 1.113, X: 0.672, Y: 0.6228, Z: 0.605, ' ': 0.271, '.': 0.27, '?': 0.47, '’': 0.22, ',': 0.27 };
const emOf = (t) => [...String(t)].reduce((a, c) => a + (NUNITO700[c] || (/[0-9]/.test(c) ? 0.56 : 0.9)), 0);
const pxOf = (t, font) => emOf(t) * font * 1.08;
/** the words of a sentence (no end marks, small letters) and its tokens as printed */
const wordsOf = (s) => String(s).replace(/[|]/g, ' ').replace(/[.,!?]/g, '').toLowerCase().split(/\s+/).filter(Boolean);
const toksOf = (s) => String(s).replace(/[|]/g, ' ').split(/\s+/).filter(Boolean);
const beatsOf = (b, s) => wordsOf(s).reduce((a, w) => a + (b.syl[w] || 0), 0);
/** a block of 2, 3 or 4 places repeated to the end (L R L R), or runs that all have one length of two or more (R R L L,
 *  0 0 1 1 2 2, 2 2 3 3) */
function blockRepeat(s) {
  for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
  const runs = String(s).match(/(.)\1*/g) || [];
  return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length);
}
/** the places of the right answers of n items among k: every place used where n allows, never three in a row, never a
 *  staircase of three, never a repeated block, no place for more than two thirds of the items (four items on two sides:
 *  three at most, so that the sides are not always L R R L or R L L R) */
function placesOk(p, k) {
  const n = p.length, s = p.join('');
  const need = n >= 6 ? Math.min(k, 3) : n >= 3 ? 2 : 1;
  if (new Set(p).size < need) return false;
  if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
  if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
  if (blockRepeat(s)) return false;
  const cap = n === 4 && k === 2 ? 3 : Math.floor((2 * n) / 3);
  if (n >= 3 && Math.max(...[...new Set(p)].map((v) => p.filter((x) => x === v).length)) > cap) return false;
  return true;
}
function mixedPlaces(n, k, rng) { for (let t = 0; t < 4000; t++) { const p = Array.from({ length: n }, () => rng.int(0, k - 1)); if (placesOk(p, k)) return p; } throw new Error('no mixed places'); }
/** the word counts of a page: not all the same, never three alike in a row, never rising or falling all the way (not even
 *  with steps that stay: 2, 2, 3, 3 is a staircase too), no repeated block */
const countsOk = (ns) => new Set(ns).size >= 2 && !ns.some((x, i) => i >= 2 && x === ns[i - 1] && x === ns[i - 2]) &&
  !ns.every((x, i) => !i || x >= ns[i - 1]) && !ns.every((x, i) => !i || x <= ns[i - 1]) && !blockRepeat(ns.join(''));
/** a title shares two content words or its first two words with a famous book */
const STOP = new Set('a an the and of in on for to at my is can with'.split(' '));
const content = (t) => wordsOf(t).filter((w) => !STOP.has(w));
function famousLike(title, famous) {
  const c = new Set(content(title)), f2 = wordsOf(title).slice(0, 2).join(' ');
  return famous.find((x) => wordsOf(x).join(' ') === wordsOf(title).join(' ') || [...new Set(content(x))].filter((w) => c.has(w)).length >= 2 || (wordsOf(x).slice(0, 2).join(' ') === f2 && wordsOf(title).length > 1)) || null;
}
/** the line of a pattern book: the frame with its thing ("I see a cow.") */
const lineOf = (frame, n) => frame.replace('{n}', n);
const takesA = (frame) => / a \{n\}/.test(frame);

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function pckFaultsOf(b) {
  const f = [];
  const P = b.pics || {};
  for (const [w, x] of Object.entries(P)) if (!x || !Array.isArray(x.pic) || x.pic.length !== 2 || !x.pic.every((y) => typeof y === 'string' && y) || /bw( ?\d+)?$/i.test(x.pic[0]) || !x.kind) f.push(`picture of "${w}": not a colour theme, a picture and a kind`);
  const banned = new Set(b.banned || []);
  if (banned.size < 10) f.push('no list of words a page may never print');
  const printed = [];
  // the books
  const books = b.books || [];
  if (books.length < 16) f.push('books: fewer than sixteen');
  if (new Set(books.map((x) => x.title)).size !== books.length || new Set(books.map((x) => x.author)).size !== books.length) f.push('books: a title or an author stands twice');
  for (const x of books) {
    if (!/^[A-Z][a-z]*( [A-Za-z][a-z]*){0,4}$/.test(x.title || '')) f.push(`book "${x.title}": not a title of one to five words`);
    if (!/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(x.author || '') || emOf('by ' + x.author) > 6.2) f.push(`book "${x.title}": the author is not a short first and last name`);
    if (!P[x.cover] || !P[x.pic2] || (P[x.cover] && P[x.pic2] && P[x.cover].kind === P[x.pic2].kind)) f.push(`book "${x.title}": no cover picture and another picture for its first page`);
    if (!/^[A-Z][^.]*\.$/.test(x.first || '') || toksOf(x.first).length > 7) f.push(`book "${x.title}": its first sentence is not one short sentence`);
    const fam = famousLike(x.title, b.famous || []);
    if (fam) f.push(`book "${x.title}": too close to the famous "${fam}"`);
    for (const y of (b.books || [])) if (y !== x && y.author.split(' ')[1] === x.author.split(' ')[1]) f.push(`books: two authors share the name ${x.author.split(' ')[1]}`);
    printed.push(x.title, x.author, x.first);
  }
  if ((b.famous || []).length < 60) f.push('famous: fewer than sixty famous titles to check against');
  // the titles to copy
  const mt = b.makeTitles || [];
  if (mt.length < 16 || new Set(mt).size !== mt.length) f.push('makeTitles: fewer than sixteen different titles');
  for (const t of mt) {
    if (!/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(t) || t.length > 9) f.push(`makeTitles: "${t}" is not two short words (nine letters at most)`);
    const fam = famousLike(t, b.famous || []); if (fam) f.push(`makeTitles: "${t}" is too close to the famous "${fam}"`);
    printed.push(t);
  }
  // the sentences over two lines
  const tl = b.twoLine || [];
  for (const s of tl) {
    const [a, c] = s.split('|');
    if (s.split('|').length !== 2 || toksOf(a).length < 2 || toksOf(c).length < 2 || !/\.$/.test(s.trim()) || !/^[A-Z]/.test(s.trim())) f.push(`twoLine: "${s}" is not one sentence over two lines of two words or more`);
    const n = toksOf(s).length;
    if (n < 4 || n > 6) f.push(`twoLine: "${s}" has ${n} words (four to six)`);
    // as in a book, the first line is the longer one (the page ends just after it), by room for the red dot after line 2
    if (emOf(a.trim()) < emOf(c.trim()) + 0.95) f.push(`twoLine: "${s}": the first line is not clearly the longer one`);
    for (const lv of [1, 2, 3]) { const d = LEVELS.track[lv]; if (n < d.words[0] || n > d.words[1]) continue; const g = evenGap(s, d); if (Math.max(trackLineW(a, d, g), trackLineW(c, d, g)) > INNER - 20 - 52 - 40) f.push(`twoLine: "${s}" is too wide for level ${lv}`); }
    printed.push(s.replace('|', ' '));
  }
  for (const lv of [1, 2, 3]) { const d = LEVELS.track[lv]; if (tl.filter((s) => toksOf(s).length >= d.words[0] && toksOf(s).length <= d.words[1]).length < 14) f.push(`twoLine: fewer than fourteen sentences for level ${lv}`); }
  // the pattern books
  const fr = b.frames || [];
  if (fr.length < 4 || fr.some((x) => !/^[A-Z][^{]* (a|the) \{n\}\.$/.test(x))) f.push('frames: fewer than four frames of the form "I see a {n}."');
  const S = b.sets || {};
  if (Object.keys(S).length < 5) f.push('sets: fewer than five sets of things');
  for (const [k, ns] of Object.entries(S)) { if (ns.length < 5 || new Set(ns).size !== ns.length) f.push(`sets: "${k}" has fewer than five things`); for (const n of ns) if (!P[n]) f.push(`sets: "${n}" has no picture`); }
  for (const w of b.anWords || []) if (!/^[aeiou]/.test(w)) f.push(`anWords: "${w}" does not start with a vowel`);
  for (const ns of Object.values(S)) for (const n of ns) if (/^[aeiou]/.test(n) && !(b.anWords || []).includes(n)) f.push(`sets: "${n}" takes an and is not in anWords`);
  // one dot for each word
  const syl = b.syl || {}, more = b.sylMore || {};
  for (const lv of [1, 2, 3]) {
    const list = (b.dots || {})[lv] || [];
    if (list.length < 14) f.push(`dots: fewer than fourteen sentences for level ${lv}`);
    for (const [s, p] of list) {
      const ws = wordsOf(s), n = ws.length, sy = ws.map((w) => syl[w]);
      if (sy.some((x) => !x)) { f.push(`dots: a word of "${s}" has no syllables in syl`); continue; }
      if (!P[p] || !ws.some((w) => w === p || w === p + 's' || (p === 'cat' && w === 'kitten'))) f.push(`dots: "${s}" has no picture of a thing it names`);
      if (!/^[A-Z].*\.$/.test(s)) f.push(`dots: "${s}" is not a sentence`);
      if (lv === 1 && (n !== 3 || sy.some((x) => x !== 1) || ws.some((w) => more[w]))) f.push(`dots level 1: "${s}" is not three words of one syllable (for every speaker)`);
      if (lv === 2 && (n < 4 || n > 5 || !sy.some((x) => x === 2) || sy.some((x) => x > 2) || sy[n - 1] !== 1)) f.push(`dots level 2: "${s}" is not four or five words with a word of two syllables (not last)`);
      if (lv === 3 && (n < 5 || n > 6 || !sy.some((x) => x >= 3) || sy[n - 1] !== 1)) f.push(`dots level 3: "${s}" is not five or six words with a word of three syllables or more (not last)`);
      if (pxOf(s, LEVELS.dots[lv].font) + (n - 1) * 0.42 * LEVELS.dots[lv].font * 0.6 > INNER - 24 - LEVELS.dots[lv].pic - 30) f.push(`dots level ${lv}: "${s}" does not fit one line`);
      printed.push(s);
    }
  }
  const lw = b.lookWords || [], ll = b.lookLetters || [], ln = b.lookNumbers || [];
  if (lw.length < 12 || lw.some((w) => !/^[a-z]{2,5}$/.test(w)) || lw.filter((w) => w.length <= 3).length < 8) f.push('lookWords: fewer than twelve short words (eight of three letters at most)');
  if (ll.length < 6 || ll.some((w) => !/^[a-z]$/.test(w) || w === 'a' || w === 'i')) f.push('lookLetters: fewer than six single letters (never a or i: they are words too)');
  if (ln.length < 4 || ln.some((w) => !/^[1-9]$/.test(w))) f.push('lookNumbers: fewer than four single digits');
  for (const [l, g] of CONFUSABLE) if (!(b.confusable || []).some(([x, y]) => x === l && y === g)) f.push(`confusable: the pair ${l} ${g} is missing`);
  // the lengths of K-670: every row the bank can draw (any two words of one letter in neighbouring lengths) is told apart
  // by its printed width and its letters
  const L = b.lengths || {}, LS = b.lengthSyl || {}, LP = new Set(b.lengthPics || []);
  const allLen = new Set();
  for (const [ch, cls] of Object.entries(L)) {
    for (const c of ['S', 'M', 'L']) {
      const ws = cls[c] || [];
      if (!ws.length) f.push(`lengths: "${ch}" has no ${c} word`);
      for (const w of ws) {
        if (w[0] !== ch) f.push(`lengths: "${w}" does not start with ${ch}`);
        if (allLen.has(w)) f.push(`lengths: "${w}" stands twice`);
        allLen.add(w);
        const sy = LS[w], n = w.length;
        if (!sy) f.push(`lengths: "${w}" has no syllables`);
        else if (c === 'S' ? sy !== 1 || n > 4 : c === 'M' ? sy !== 2 || n < 5 || n > 7 : sy < 3 || n < 8) f.push(`lengths: "${w}" is not a ${c} word (${n} letters, ${sy} syllables)`);
        printed.push(w);
      }
    }
    for (const [lo, hi] of [['S', 'M'], ['M', 'L'], ['S', 'L']]) for (const x of cls[lo] || []) for (const y of cls[hi] || []) {
      const ratio = emOf(y) / emOf(x), dl = y.length - x.length;
      if (ratio < RATIO + 0.05 || dl < (lo === 'S' && hi === 'M' ? 2 : 3)) f.push(`lengths: "${x}" and "${y}" are too alike in print (${ratio.toFixed(2)} times, ${dl} letters)`);
    }
  }
  for (const [x, y] of b.neverRow || []) for (const cls of Object.values(L)) { const all = [].concat(cls.S || [], cls.M || [], cls.L || []); if (all.includes(x) && all.includes(y)) f.push(`lengths: "${x}" and "${y}" may share a row`); }
  if ((b.neverRow || []).length !== NEVER_ROW.length) f.push('neverRow: not the ruled list of pairs');
  for (const w of LP) if (!allLen.has(w) || !P[w]) f.push(`lengthPics: "${w}" is no word of the lengths with a picture`);
  if (Object.keys(L).filter((ch) => ['S', 'L'].every((c) => (L[ch][c] || []).some((w) => LP.has(w)))).length < 6) f.push('lengthPics: fewer than six letters with a short and a long picture');
  if (['S', 'M', 'L'].some((c) => Object.keys(L).filter((ch) => (L[ch][c] || []).some((w) => LP.has(w))).length < 6)) f.push('lengthPics: fewer than six letters with a picture of each length');
  // the sentence pairs of K-670 level 3
  const pairs = b.pairs || [];
  if (pairs.length < 12) f.push('pairs: fewer than twelve');
  for (const [p, s1, s2] of pairs) {
    if (!P[p]) f.push(`pairs: "${p}" has no picture`);
    const a = toksOf(s1), c = toksOf(s2);
    if (a.slice(0, 2).join(' ') !== c.slice(0, 2).join(' ') || c.length - a.length < 2 || !/\.$/.test(s1) || !/\.$/.test(s2)) f.push(`pairs: "${s1}" and "${s2}" do not start alike, or the long one is not two words longer`);
    if (pxOf(s2, LEVELS.match[3].font) + 16 > INNER - 24 - LEVELS.match[3].pic - 28 - 36) f.push(`pairs: "${s2}" does not fit one line`);
    printed.push(s1, s2);
  }
  // the sentences of K-671
  for (const lv of [1, 2, 3]) {
    const list = (b.count || {})[lv] || [];
    if (list.length < 14) f.push(`count: fewer than fourteen sentences for level ${lv}`);
    for (const [s, p] of list) {
      const ws = wordsOf(s), n = ws.length, sy = ws.map((w) => syl[w]);
      if (sy.some((x) => !x)) { f.push(`count: a word of "${s}" has no syllables in syl`); continue; }
      if (!P[p] || !ws.some((w) => w === p || w === p + 's' || (p === 'cat' && w === 'kitten'))) f.push(`count: "${s}" has no picture of a thing it names`);
      // the beats of the sentence for every speaker: from its syllables to one more for each word some say with a beat more
      const be = sy.reduce((a, x) => a + x, 0), beMax = be + ws.reduce((a, w) => a + (more[w] || 0), 0);
      if (lv === 1 && (n < 2 || n > 3 || be !== n || beMax !== n)) f.push(`count level 1: "${s}" is not two or three words of one syllable (for every speaker)`);
      if (lv === 2 && (n < 3 || n > 5 || be <= n)) f.push(`count level 2: "${s}" is not three to five words with more beats than words (for every speaker)`);
      if (lv === 3 && (n < 4 || n > 6 || be <= n || !sy.some((x) => x >= 2))) f.push(`count level 3: "${s}" is not four to six words with a word of two syllables (for every speaker)`);
      if (countLineW(s, LEVELS.count[lv]) > INNER - 24 - 36) f.push(`count level ${lv}: "${s}" does not fit one line`);
      printed.push(s);
    }
  }
  // the sentences of K-672
  const sp = b.spaces || {};
  for (const [k, lo, hi] of [['read', 3, 4], ['cards1', 3, 3], ['cards2', 4, 4], ['cards3', 5, 5], ['copy', 3, 3]]) {
    const list = sp[k] || [];
    if (list.length < 14) f.push(`spaces: fewer than fourteen sentences in ${k}`);
    for (const s of list) {
      const n = toksOf(s).length;
      if (n < lo || n > hi || !/^[A-Z].*\.$/.test(s)) f.push(`spaces ${k}: "${s}" is not a sentence of ${lo} to ${hi} words`);
      if (k === 'read' && spacedW(s, LEVELS.spaces[1].font) > (INNER - 12) / 2 - 24) f.push(`spaces read: "${s}" does not fit half a row`);
      if (k === 'copy' && (s.replace(/\s/g, '').length > 11 || fingerW(s) > INNER - 24)) f.push(`spaces copy: "${s}" is too long to copy on one row with finger spaces`);
      if (k.startsWith('cards')) { const lv = +k.slice(-1), d = LEVELS.spaces[lv], st = stripOf(s, d.cardFont);
        if (st.w + 5 > INNER || (lv < 3 && st.rows.length !== 1)) f.push(`spaces ${k}: "${s}" makes a glue strip wider than the page (or in two rows below level 3)`); }
      printed.push(s);
    }
  }
  // no printed word is on the never list; no straight quote anywhere
  for (const t of printed) { for (const w of wordsOf(t)) if (banned.has(w)) f.push(`"${t}" holds "${w}", a word of the never list`); if (/['"]/.test(t)) f.push(`"${t}" holds a straight apostrophe or quote`); }
  if (f.length) return f;
  // every level of every page can be drawn: trial draws with fixed seeds
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let s = 1; s <= 12; s++) {
    try { drawPage(b, mode, lv, seedRng(s * 7 + lv)); } catch (e) { f.push(`${mode} level ${lv}: ${e.message}`); break; }
  }
  return f;
}
/** a small seeded generator for the trial draws (the pages use ctx.rng) */
function seedRng(seed) { let x = seed >>> 0 || 1; const next = () => { x ^= x << 13; x >>>= 0; x ^= x >> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; return { int: (a, c) => a + Math.floor(next() * (c - a + 1)) }; }
/** the gap between the words of a K-667 sentence: on level 3 one even gap for the whole sentence, wide enough that the
 *  boxes under two neighbouring words keep 12 px between them */
function evenGap(s, d) {
  let g = Math.round(0.42 * d.font);
  if (!d.boxes) return g;
  for (const line of String(s).split('|')) { const ws = toksOf(line).map((w) => pxOf(w, d.font)); for (let i = 1; i < ws.length; i++) g = Math.max(g, Math.ceil(BOX + 12 - (ws[i - 1] + ws[i]) / 2)); }
  return g;
}
/** the width of a line of K-667 with the gap g (on level 3 the box under a short last word reaches out past it) */
function trackLineW(line, d, g) { const ws = toksOf(line), px = ws.map((w) => pxOf(w, d.font)); return px.reduce((a, x) => a + x, 0) + (ws.length - 1) * g + (d.boxes ? Math.max(0, (BOX - px[px.length - 1]) / 2) : 0); }
/** the width of a sentence of K-671 with its wide spaces */
const SPACE_EM = 0.7;
function countLineW(s, d) { const ws = toksOf(s); return ws.reduce((a, w) => a + pxOf(w, d.font), 0) + (ws.length - 1) * (SPACE_EM * d.font + 12); }
/** a spaced sentence of K-672 (spaces of half an em) */
function spacedW(s, font) { const ws = toksOf(s); return ws.reduce((a, w) => a + pxOf(w, font), 0) + (ws.length - 1) * 0.55 * font; }
/** a word card of K-672: 96 x 86 px or more (the word at the card font with 13 px on either side) */
const cardW = (t, font) => Math.max(CARD_W, Math.ceil(pxOf(t, font)) + 26);
/** the glue strip of a K-672 sentence: its cards in one row, or in two rows (the first holds the first half, rounded up) when
 *  one row is wider than a task card; FINGER px between two cards, between the rows and to every edge. w and h are the
 *  strip's inner size; rows the word numbers of each row */
function stripOf(s, font) {
  const ws = toksOf(s).map((t) => cardW(t, font)), rowW = (r) => r.reduce((a, i) => a + ws[i], 0) + (r.length + 1) * FINGER;
  const all = ws.map((_, i) => i);
  if (rowW(all) + 5 <= INNER) return { rows: [all], w: rowW(all), h: CARD_H + 2 * FINGER };
  const k = Math.ceil(ws.length / 2), rows = [all.slice(0, k), all.slice(k)];
  return { rows, w: Math.max(...rows.map(rowW)), h: 2 * CARD_H + 3 * FINGER };
}
/** the key's copied sentence of K-672 level 3 on a Kindergarten row: its letter size (the row's own rules) and its width
 *  with a finger space of FINGER + 10 px between two words */
const KEY_PX = (() => { const r = (() => { const ys = [...rowSvg(400, COPY_ROW).matchAll(/<line\b[^>]*\by1="([\d.]+)"[^>]*\by2="([\d.]+)"/g)].filter((m) => m[1] === m[2]).map((m) => +m[1]).sort((a, b) => a - b); return { mid: ys[1], base: ys[2] }; })();
  return Math.round(((r.base - r.mid) / require('../../primitives/font-metrics.json')['nunito-700'].xHeight) * 2) / 2; })();
const fingerW = (s) => toksOf(s).reduce((a, w) => a + emOf(w) * KEY_PX * 1.04, 0) + (toksOf(s).length - 1) * (FINGER + 10);

/* ---------------------------------------------------------------- the draws (pure: the bank check runs them too) ---------------------------------------------------------------- */
const PARTS3 = ['front', 'title', 'back'], PARTS4 = ['front', 'title', 'story', 'back'];
/** an order of the parts that is not the order of a book or its reverse */
function partOrder(parts, rng) {
  for (let k = 0; k < 200; k++) { const p = shuffle(parts, rng); if (p.join() !== parts.join() && p.join() !== parts.slice().reverse().join()) return p; }
  throw new Error('no mixed order of the parts');
}
function drawPage(b, mode, lv, rng, variant) {
  const d = LEVELS[mode][lv];
  const P = b.pics;
  const kindOf = (w) => P[w].kind;
  if (mode === 'parts') {
    if (lv === 1) {
      for (let k = 0; k < 400; k++) {
        const two = shuffle(b.books, rng).slice(0, 2);
        if (kindOf(two[0].cover) === kindOf(two[1].cover)) continue;
        const o1 = partOrder(PARTS3, rng), o2 = partOrder(PARTS3, rng);
        if (o1.some((x, i) => x === o2[i])) continue;
        return { books: two, orders: [o1, o2], items: [...two.map((x) => 'book:' + x.title), 'order:' + o1.join('-') + '|' + o2.join('-')] };
      }
      throw new Error('no two books');
    }
    const book = shuffle(b.books, rng)[0];
    const order = partOrder(lv === 3 ? PARTS4 : PARTS3, rng);
    const labelled = order.filter((p) => p !== 'story');
    let cards = null;
    for (let k = 0; k < 100 && !cards; k++) { const c = shuffle(PARTS3, rng); if (c.join() !== labelled.join()) cards = c; }
    if (!cards) throw new Error('the labels in the order of the parts');
    return { books: [book], orders: [order], cards, items: ['book:' + book.title, 'order:' + order.join('-'), 'cards:' + cards.join('-')] };
  }
  if (mode === 'make') {
    // one title a copy: copy N of a level takes the Nth title of a fixed mixed order, so that the copies differ
    const t = variant ? shuffle(b.makeTitles, seedRng(lv * 97 + 13))[(variant - 1) % b.makeTitles.length] : shuffle(b.makeTitles, rng)[0];
    return { title: t, items: ['title:' + t] };
  }
  if (mode === 'track') {
    const pool = b.twoLine.filter((s) => toksOf(s).length >= d.words[0] && toksOf(s).length <= d.words[1]);
    const pick = shuffle(pool, rng).slice(0, d.n);
    if (pick.length !== d.n) throw new Error('not enough sentences');
    return { sents: pick, items: pick.map((s) => 'sent:' + s) };
  }
  if (mode === 'pages') {
    const groupsN = lv === 2 ? 1 : 2;
    const room = lv === 1 ? INNER - 24 - BOX - d.pic - 50 : lv === 3 ? (INNER - 24 - 40) / 2 - BOX - 30 : (INNER - 24 - 40) / 2 - 30;
    for (let t = 0; t < 400; t++) {
      const kinds = new Set(), groups = [];
      const ss = shuffle(Object.keys(b.sets), rng).slice(0, groupsN), fs = shuffle(b.frames, rng).slice(0, groupsN);
      let ok = true;
      for (let g = 0; g < groupsN && ok; g++) {
        const ns = shuffle(b.sets[ss[g]].filter((n) => !(takesA(fs[g]) && b.anWords.includes(n)) && !kinds.has(kindOf(n)) && pxOf(lineOf(fs[g], n), d.font) <= room), rng).slice(0, d.per);
        if (ns.length !== d.per) { ok = false; break; }
        ns.forEach((n) => kinds.add(kindOf(n)));
        groups.push({ set: ss[g], frame: fs[g], nouns: ns, lines: ns.map((n) => lineOf(fs[g], n)) });
      }
      if (!ok) continue;
      let traps = null;
      if (lv === 3) { traps = groups.map(() => rng.int(0, 9) < 6); if (!traps.some(Boolean)) traps[rng.int(0, 1)] = true; }
      return { groups, traps, items: groups.map((g) => 'page:' + g.lines.join(' ')) };
    }
    throw new Error('no pattern pages');
  }
  if (mode === 'dots') {
    const kindsRow = d.items === 3 ? ['word', 'letter', 'scribble'] : ['word', 'letter', 'number', 'scribble'];
    const words = shuffle(b.lookWords.filter((w) => !d.short || w.length <= 3), rng).slice(0, d.rows);
    // a letter is never the first letter of the word of its row (m beside mop could be taken for its start)
    const letters = [];
    for (const w of words) { const l = shuffle(b.lookLetters.filter((x) => x !== w[0] && !letters.includes(x)), rng)[0]; if (!l) throw new Error('no letter'); letters.push(l); }
    // a digit is never one a child can take for a letter of its row (g 9, s 5, o 0, l 1)
    const numbers = [];
    for (let r = 0; r < d.rows; r++) {
      const ok = (n) => !numbers.includes(n) && !(b.confusable || []).some(([l, g]) => g === n && (letters[r] === l || words[r].includes(l)));
      const n = shuffle(b.lookNumbers.filter(ok), rng)[0]; if (!n) throw new Error('no digit'); numbers.push(n);
    }
    const at = mixedPlaces(d.rows, d.items, rng);
    const scr = shuffle(SCRIBBLES.map((_, i) => i), rng);
    const rows = words.map((w, r) => { const o = shuffle(kindsRow.slice(1), rng); o.splice(at[r], 0, 'word');
      return o.map((k) => ({ k, text: k === 'word' ? w : k === 'letter' ? letters[r] : k === 'number' ? numbers[r] : '', scribble: k === 'scribble' ? scr[r % scr.length] : null })); });
    const sents = [], kinds = new Set();
    for (const [s, p] of shuffle(b.dots[lv], rng)) { if (sents.length === d.n) break; if (kinds.has(kindOf(p))) continue; kinds.add(kindOf(p)); sents.push({ s, p }); }
    if (sents.length !== d.n) throw new Error('not enough sentences');
    return { rows, at, sents, items: [...words.map((w) => 'look:' + w), ...sents.map((x) => 'dot:' + x.s)] };
  }
  if (mode === 'match') {
    if (lv === 3) {
      for (let t = 0; t < 500; t++) {
        const four = [], kinds = new Set();
        for (const p of shuffle(b.pairs, rng)) { if (four.length === d.items) break; if (kinds.has(kindOf(p[0]))) continue; kinds.add(kindOf(p[0])); four.push(p); }
        if (four.length !== d.items) continue;
        const longTop = four.map(() => rng.int(0, 1) === 0);
        const read = mixedPlaces(d.items, 2, rng);             // 0 the top sentence is read, 1 the bottom one
        const readLong = four.map((_, i) => (read[i] === 0) === longTop[i]);
        // the teacher reads two long and two short sentences (never always the long one)
        if (readLong.filter(Boolean).length !== d.items / 2) continue;
        if (longTop.every(Boolean) || longTop.every((x) => !x)) continue;
        return { pairs: four.map((p, i) => ({ pic: p[0], short: p[1], long: p[2], longTop: longTop[i], read: read[i] })), items: four.map((p) => 'pair:' + p[0]) };
      }
      throw new Error('no sentence pairs');
    }
    const L = b.lengths, LP = new Set(b.lengthPics);
    for (let t = 0; t < 3000; t++) {
      const ls = shuffle(Object.keys(L), rng).slice(0, d.rows);
      const want = d.opts === 2 ? shuffle(['S', 'S', 'S', 'L', 'L', 'L'], rng).slice(0, d.rows) : ls.map(() => 'SML'[rng.int(0, 2)]);
      if (d.opts === 3 && (['S', 'M', 'L'].some((c) => !want.includes(c)) || want.filter((c) => c === 'L').length > Math.floor(d.rows / 2))) continue;
      if (/(.)\1\1/.test(want.join(''))) continue;
      const rows = []; let ok = true;
      for (let r = 0; r < d.rows && ok; r++) {
        const ch = ls[r], c = want[r];
        const target = shuffle(L[ch][c].filter((w) => LP.has(w)), rng)[0];
        if (!target) { ok = false; break; }
        const others = (d.opts === 2 ? [c === 'S' ? 'L' : 'S'] : ['S', 'M', 'L'].filter((x) => x !== c)).map((x) => shuffle(L[ch][x], rng)[0]);
        rows.push({ letter: ch, target, cls: c, others });
      }
      if (!ok || new Set(rows.map((x) => kindOf(x.target))).size !== d.rows) continue;
      const at = mixedPlaces(d.rows, d.opts, rng);
      const out = rows.map((x, r) => { const o = shuffle(x.others, rng); o.splice(at[r], 0, x.target); return { ...x, opts: o }; });
      // word length is an answer place: the right word is the longest of its row in at most half of the rows
      const longest = out.filter((x) => x.opts.every((o) => o === x.target || o.length < x.target.length)).length;
      if (longest > Math.floor(d.rows / 2)) continue;
      return { rows: out, at, items: out.map((x) => 'pic:' + x.target) };
    }
    throw new Error('no rows of words');
  }
  if (mode === 'count') {
    for (let t = 0; t < 2000; t++) {
      const pick = [], kinds = new Set();
      for (const [s, p] of shuffle(b.count[lv], rng)) { if (pick.length === d.n) break; if (kinds.has(kindOf(p))) continue; kinds.add(kindOf(p)); pick.push({ s, p, n: toksOf(s).length }); }
      if (pick.length !== d.n || !countsOk(pick.map((x) => x.n))) continue;
      return { sents: pick, items: pick.map((x) => 'count:' + x.s) };
    }
    throw new Error('no sentences to count');
  }
  if (mode === 'spaces') {
    const used = new Set();
    const read = shuffle(b.spaces.read, rng).slice(0, d.read);
    read.forEach((s) => used.add(s));
    const at = d.read >= 4 ? mixedPlaces(d.read, 2, rng) : (rng.int(0, 1) ? [0, 1] : [1, 0]);
    let copy = null, cards = null;
    if (d.copy) { copy = shuffle(b.spaces.copy.filter((s) => !used.has(s)), rng)[0]; used.add(copy); }
    if (d.cards) {
      const s = shuffle(b.spaces[d.cards].filter((x) => !used.has(x) && x !== copy), rng)[0], toks = toksOf(s), id = toks.map((_, i) => i);
      let order = null;
      for (let k = 0; k < 300 && !order; k++) { const o = shuffle(id, rng); if (o[0] !== 0 && o.join() !== id.join() && o.join() !== id.slice().reverse().join()) order = o; }
      if (!order) throw new Error('no mixed order of the cards');
      cards = { s, toks, order };
    }
    return { read, at, copy, cards, items: [...read.map((s) => 'read:' + s), ...(copy ? ['copy:' + copy] : []), ...(cards ? ['cards:' + cards.s] : [])] };
  }
  throw new Error('print-concepts-k: unknown mode ' + mode);
}

{ const fb = pckFaultsOf(BANK); if (fb.length) throw new Error('print-concepts-k.en.json: ' + fb.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
/** In this font an f before i, f, l or t and a t before t touch the next letter even with ligatures off: every such f or t
 *  gets a little room of its own (text inside tags, <svg> and <style> is left alone) */
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
/** the same room inside a writing row's svg text (a key's answer, a title to trace) */
function svgRoom(html) {
  return html.replace(/(<text\b[^>]*\bfont-size="([\d.]+)"[^>]*>)([^<]*)(<\/text>)/g, (m, open, fsz, body, close) => open + body.replace(/(?<=[ft])([iflt])/g, (c) => `<tspan dx="${(0.07 * +fsz).toFixed(2)}" data-lcs-fsep>${c}</tspan>`) + close);
}
const img = (w, size, more = '') => `<img class="ws-icon" data-lcs-pic="${attr(w)}" data-lcs-pickind="${attr(BANK.pics[w].kind)}" src="${fileUri(BANK.pics[w].pic[0], BANK.pics[w].pic[1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain;${more}">`;
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (k, html) => `<div data-lcs-label data-lcs-read style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal}">${k}.</span> ${html}</div>`;
const badge = (n) => `<span data-lcs-badge style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 17px/1 'Nunito',sans-serif">${n}</span>`;
/** a box for ONE number (72 px or more); the key prints the number in teal */
const numBox = (attrs, size, text, round = false, more = '') => `<span ${attrs} style="flex:0 0 auto;box-sizing:border-box;width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:${round ? '50%' : '12px'};background:#FFFFFF;font:800 ${Math.round(size * 0.62)}px/1 'Nunito',sans-serif;color:${T.teal};${more}">${text}</span>`;
/** the key's ring around a word, a picture or a sentence */
const ring = (inset = '-6px -8px') => { const [v, h] = inset.split(' '); return `<span data-lcs-ring style="position:absolute;left:${h};right:${h};top:${v};bottom:${v};border:3.5px solid ${T.teal};border-radius:999px;pointer-events:none"></span>`; };
/** a green dot (start) and a red dot (stop) */
const greenDot = (attrs, size = 24, more = '') => `<span ${attrs} style="display:block;width:${size}px;height:${size}px;border-radius:50%;background:${GREEN};${more}"></span>`;
const redDot = (attrs, size = 24, more = '') => `<span ${attrs} style="display:block;width:${size}px;height:${size}px;border-radius:50%;background:${RED};${more}"></span>`;
/** a writing row; `trace` prints the word in light grey to trace, `answer` (the key) in teal; `spaced` sets the key's words
 *  apart by a finger space (FINGER + 10 px) */
function row({ w, h = ROW, trace, answer, spaced }) {
  const base = rowSvg(w, h);
  const text = answer || trace;
  let svg = text ? seatOnRow(base, text, { fill: answer ? T.teal : T.grid, em: (emOf(text) / text.length) * 1.05 }) : base;
  if (text && spaced) { const body = `>${esc(text)}</text>`; svg = svg.replace(body, '>' + toksOf(text).map((x, i) => `<tspan data-lcs-kw="${i}"${i ? ` dx="${FINGER + 10}"` : ''}>${esc(x)}</tspan>`).join('') + '</text>'); }
  return `<div data-lcs-line${trace && !answer ? ` data-lcs-trace="${attr(trace)}"` : ''}${answer ? ` data-lcs-answer="${attr(answer)}"` : ''} style="line-height:0">${svg}</div>`;
}
/** the y of a writing row's base rule (its lowest horizontal rule) */
const baseOf = (w, h) => Math.max(...[...rowSvg(w, h).matchAll(/<line\b[^>]*\by1="([\d.]+)"[^>]*\by2="([\d.]+)"/g)].filter((m) => m[1] === m[2]).map((m) => +m[1]));
/** a printed word that stands on a writing row's base rule beside it (Nunito, line-height 1: the baseline is 0.171 em above
 *  the box's foot) */
const onRow = (text, px, attrs = '', h = ROW) => `<span ${attrs} data-lcs-read style="flex:0 0 auto;padding-bottom:${Math.max(0, Math.round(h - baseOf(300, h) - 0.171 * px))}px;font:800 ${px}px/1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(text)}</span>`;
/** a small pair of scissors at the start of a cut line */
const SCISSORS = `<svg data-lcs-scissors width="24" height="22" viewBox="0 0 24 22" style="position:absolute;left:-26px;top:-12px;display:block"><circle cx="5" cy="5" r="3.6" fill="none" stroke="${T.inkSoft}" stroke-width="2.2"/><circle cx="5" cy="17" r="3.6" fill="none" stroke="${T.inkSoft}" stroke-width="2.2"/><path d="M8 7.5 L22 15 M8 14.5 L22 7" stroke="${T.inkSoft}" stroke-width="2.2" stroke-linecap="round"/></svg>`;

/* ---------- the books of K-665 and K-666 ---------- */
const spine = (side) => `<span data-lcs-spine="${side}" style="position:absolute;${side}:0;top:0;bottom:0;width:${SPINE}px;background:${T.tealSoft};border-${side === 'left' ? 'right' : 'left'}:2.5px solid ${T.ink}"></span>`;
function frontCover(bk, w, h, d, key, ringTitle) {
  return `<div data-lcs-part="front" style="position:relative;box-sizing:border-box;width:${w}px;height:${h}px;border:3px solid ${T.ink};border-radius:5px 12px 12px 5px;background:#FFFFFF;display:flex;flex-direction:column;align-items:center;justify-content:space-around;gap:4px;padding:8px 8px 8px ${SPINE + 8}px">` + spine('left') +
    `<div data-lcs-booktitle="front" data-lcs-read style="position:relative;margin:0 6px;text-align:center;font:700 ${d.tfont}px/1.1 'Baloo 2',cursive;color:${T.ink}">${esc(bk.title)}${key && ringTitle ? ring('-4px -6px') : ''}</div>` +
    img(bk.cover, d.pic) +
    `<div data-lcs-author data-lcs-read style="text-align:center;font:700 ${d.afont}px/1.2 'Nunito',sans-serif;color:${T.ink}">by ${esc(bk.author)}</div></div>`;
}
const BARS = [90, 76, 84, 58];
const barcode = () => `<svg data-lcs-barcode width="56" height="30" viewBox="0 0 56 30" style="display:block">${[[0, 3], [5, 2], [9, 4], [15, 2], [19, 3], [24, 2], [28, 4], [34, 2], [38, 3], [43, 2], [47, 4], [53, 3]].map(([x, wd]) => `<rect x="${x}" y="0" width="${wd}" height="30" fill="${T.ink}"/>`).join('')}</svg>`;
function backCover(w, h) {
  return `<div data-lcs-part="back" style="position:relative;box-sizing:border-box;width:${w}px;height:${h}px;border:3px solid ${T.ink};border-radius:12px 5px 5px 12px;background:#FFFFFF;display:flex;flex-direction:column;justify-content:space-between;padding:14px ${SPINE + 12}px 12px 12px">` + spine('right') +
    `<div style="display:flex;flex-direction:column;gap:10px">${BARS.map((p) => `<span data-lcs-blurb style="display:block;height:7px;width:${p}%;border-radius:4px;background:${T.grid}"></span>`).join('')}</div>` +
    `<div style="align-self:flex-end">${barcode()}</div></div>`;
}
/** an OPEN book seen from above: the left page (narrower, in perspective) and the right page, their top and bottom edges
 *  curving down to the fold; leftHtml and rightHtml stand on the two pages */
function openBook(kind, leftHtml, rightHtml, w, h, frac, extra = '', inset = [7, 7]) {
  const g = Math.round(w * frac), r = w - g, top = 10, bot = h - 4, f = (x) => x.toFixed(1);
  const lp = `M${g} ${top + 8} C${f(g * 0.62)} ${top - 2}, ${f(g * 0.3)} ${top - 2}, 3 ${top + 2} L3 ${bot - 6} C${f(g * 0.3)} ${bot - 10}, ${f(g * 0.62)} ${bot - 10}, ${g} ${bot} Z`;
  const rp = `M${g} ${top + 8} C${f(g + r * 0.38)} ${top - 2}, ${f(g + r * 0.7)} ${top - 2}, ${w - 3} ${top + 2} L${w - 3} ${bot - 6} C${f(g + r * 0.7)} ${bot - 10}, ${f(g + r * 0.38)} ${bot - 10}, ${g} ${bot} Z`;
  return `<div data-lcs-part="${kind}" data-lcs-gutter="${g}" style="position:relative;box-sizing:border-box;width:${w}px;height:${h}px">` +
    `<svg data-lcs-bookline style="position:absolute;left:0;top:0;display:block" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d="${lp}" fill="${T.cream}" stroke="${T.ink}" stroke-width="2.5" stroke-linejoin="round"/><path d="${rp}" fill="#FFFFFF" stroke="${T.ink}" stroke-width="2.5" stroke-linejoin="round"/><line x1="${g}" y1="${top + 8}" x2="${g}" y2="${bot}" stroke="${T.ink}" stroke-width="2.5"/></svg>` +
    `<div data-lcs-leftpage style="position:absolute;left:8px;width:${g - 14}px;top:${top + 12}px;bottom:14px;display:flex;align-items:center;justify-content:center">${leftHtml}</div>` +
    `<div data-lcs-page style="position:absolute;left:${g + inset[0]}px;right:${inset[1]}px;top:${top + 12}px;bottom:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px">${rightHtml}</div>${extra}</div>`;
}
/** the Baloo 2 title of a title page: the font that lets its widest word keep ROOM px from the gutter and the page edge
 *  (Baloo 2 700 measures at most 0.98 of the Nunito table, 2026-11-17; never under 16 px) */
const titleFont = (title, room, font) => { const widest = Math.max(...toksOf(title).map((x) => emOf(x))); return Math.max(16, Math.min(font, Math.floor(room / (widest * 1.08 * 1.02)))); };
/** the title page: the right page of an open book shows the title and the author again (the left page is blank); the title
 *  keeps ROOM px from the gutter and from the page edge (it shrinks to fit or wraps) */
const TITLE_FRAC = 0.24;
const titlePage = (bk, w, h, d, key, ringTitle) => { const g = Math.round(w * TITLE_FRAC), room = w - g - 4 - 2 * ROOM - 2, tf = titleFont(bk.title, room, d.tfont);
  return openBook('title', '', `<div data-lcs-booktitle="title" data-lcs-read style="position:relative;text-align:center;font:700 ${tf}px/1.1 'Baloo 2',cursive;color:${T.ink}">${esc(bk.title)}${key && ringTitle ? ring('-3px -4px') : ''}</div>` +
    `<div data-lcs-author data-lcs-read style="text-align:center;font:700 ${d.afont}px/1.2 'Nunito',sans-serif;color:${T.ink}">by ${esc(bk.author)}</div>`, w, h, TITLE_FRAC, '', [ROOM + 3, ROOM + 4]); };
/** the first page of the story: a picture on the left page, the first sentence on the right page */
const storyPage = (bk, w, h, d, frac) => openBook('story', img(bk.pic2, d.spic), `<div data-lcs-first data-lcs-read style="text-align:center;font:700 ${d.sfont}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(bk.first)}</div>`, w, h, frac || 0.45);
/** the key of K-665 level 3: either page of the story spread is right (a ring round the spread, a green dot and the words) */
const eitherMark = () => ring('-6px -6px').replace('border-radius:999px', 'border-radius:16px') +
  `<div data-lcs-keyspread style="position:absolute;left:0;right:0;bottom:calc(100% + 12px);display:flex;align-items:center;justify-content:center;gap:6px">${greenDot('data-lcs-keydot', 22, 'flex:0 0 auto')}` +
  `<span data-lcs-read style="font:800 16px/1.15 'Nunito',sans-serif;color:${T.teal}"><span style="display:inline-block">either page</span> <span style="display:inline-block">is right</span></span></div>`;
const xMark = () => `<svg data-lcs-xmark style="position:absolute;left:12%;top:12%;width:76%;height:76%" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="4" y1="4" x2="96" y2="96" stroke="${T.teal}" stroke-width="6" vector-effect="non-scaling-stroke"/><line x1="96" y1="4" x2="4" y2="96" stroke="${T.teal}" stroke-width="6" vector-effect="non-scaling-stroke"/></svg>`;

/* ---------- scribbles (marks that cannot be read as letters or digits) ---------- */
const scribble = (k) => `<svg data-lcs-scribble="${k}" width="84" height="40" viewBox="0 0 84 40" style="display:block"><path d="${SCRIBBLES[k]}" fill="none" stroke="${T.ink}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ---------------------------------------------------------------- the blocks of each page ---------------------------------------------------------------- */
function renderPage(plan, mode, lv, d, key) {
  const blocks = [];
  const L = LINES[mode][lv];
  let rootAttr = '';

  if (mode === 'parts') {
    blocks.push(`<div data-lcs-legend style="display:flex;flex-direction:column;gap:1px;padding:6px 14px;border-radius:12px;background:${T.cream};border-left:6px solid ${T.teal}">` +
      LEGEND.map(([k, head, rest]) => `<div data-lcs-legendline="${k}" data-lcs-read style="font:700 18px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="font-weight:800;color:${T.teal}">${head}</b> ${rest}</div>`).join('') + `</div>`);
    const size = (p) => (p === 'front' || p === 'back' ? d.cover : p === 'story' ? d.story || d.spread : d.spread);
    const draw = (bk, p, ringTitles) => p === 'front' ? frontCover(bk, d.cover[0], d.cover[1], d, key, ringTitles) : p === 'back' ? backCover(d.cover[0], d.cover[1]) : p === 'title' ? titlePage(bk, d.spread[0], d.spread[1], d, key, ringTitles) : storyPage(bk, size('story')[0], size('story')[1], d, d.storyFrac);
    // every drawing stands in a room as tall as a closed book (an open book is lower and wider): centred on level 1; on
    // levels 2 and 3 on the room's floor, so that the feet of all parts are level and each glue box stands right under its part
    const area = (bk, p, ringTitles, marks = '', h = d.cover[1], foot = false) => `<div data-lcs-area style="flex:0 0 auto;width:${foot ? size(p)[0] : Math.max(d.cover[0], d.spread[0])}px;height:${h}px;display:flex;align-items:${foot ? 'flex-end' : 'center'};justify-content:center"><div data-lcs-drawwrap style="position:relative;line-height:0">${draw(bk, p, ringTitles)}${marks}</div></div>`;
    const glue = (p) => `<div data-lcs-glue="${p}" style="flex:0 0 auto;box-sizing:border-box;width:${d.glue[0]}px;height:${d.glue[1]}px;border:2.5px dashed ${T.grid};border-radius:10px;background:#FFFFFF;display:flex;align-items:center;justify-content:center">` +
      (key && p !== 'story' ? `<span data-lcs-keylabel="${p}" style="width:${d.card[0] - 4}px;text-align:center;font:800 ${d.cardFont}px/1.1 'Nunito',sans-serif;color:${T.teal}">${CARD[p]}</span>` : '') + `</div>`;
    if (lv === 1) {
      const rows = plan.books.map((bk, r) => `<div data-lcs-partrow="${r + 1}" data-lcs-book="${attr(bk.title)}" style="display:flex;align-items:center;gap:6px">${badge(r + 1)}` +
        plan.orders[r].map((p, i) => `<div data-lcs-cell="${i}" data-lcs-cellpart="${p}" style="flex:1 1 0;min-width:0;display:flex;justify-content:center;padding:9px 0">${area(bk, p, false, (key && p === 'front' ? ring('-8px -9px').replace('border-radius:999px', 'border-radius:22px') : '') + (key && p === 'back' ? xMark() : ''))}</div>`).join('') + `</div>`).join('');
      blocks.push(cream('data-lcs-task="parts"', label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${rows}</div>`, 8, 6, 'flex:1 1 auto;'));
    } else {
      const bk = plan.books[0], order = plan.orders[0];
      // levels 2 and 3: the parts in one row, each with its glue box right under it (d.under px below its foot); a column is
      // as wide as its part or its glue box, and the columns spread over the row, so that a glue box is far nearer to its
      // own part than to its neighbour (level 3: the story page gets a glue box too, and stays empty)
      const cells = `<div style="flex:1 1 auto;display:flex;align-items:center;justify-content:space-between;padding-top:4px">` + order.map((p, i) =>
        `<div data-lcs-cell="${i}" data-lcs-cellpart="${p}" style="flex:0 0 auto;width:${Math.max(size(p)[0], d.glue[0])}px;display:flex;flex-direction:column;align-items:center;gap:${d.under}px">` +
        `${area(bk, p, lv === 2, key && p === 'story' ? eitherMark() : '', d.cover[1], true)}${glue(p)}</div>`).join('') + `</div>`;
      blocks.push(cream(`data-lcs-task="parts" data-lcs-book="${attr(bk.title)}"`, label(1, esc(L[0])) + label(2, esc(L[1])) + cells, 8, 4, 'flex:1 1 auto;'));
      blocks.push(`<div data-lcs-cards style="display:flex;justify-content:center;padding:8px 12px;border-radius:14px;background:${T.cream}"><div data-lcs-cardgrid style="display:grid;grid-template-columns:repeat(3,${d.card[0]}px);border-top:2px dashed ${T.ink};border-left:2px dashed ${T.ink}">` +
        plan.cards.map((p) => `<div data-lcs-card="${p}" data-lcs-read style="box-sizing:border-box;width:${d.card[0]}px;height:${d.card[1]}px;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 2px;border-right:2px dashed ${T.ink};border-bottom:2px dashed ${T.ink};background:#FFFFFF;font:800 ${d.cardFont}px/1.1 'Nunito',sans-serif;color:${T.ink}">${CARD[p]}</div>`).join('') + `</div></div>`);
    }
  }

  if (mode === 'make') {
    const t = plan.title;
    rootAttr = ` data-lcs-title="${attr(t)}"`;
    const lines = L.map((x, i) => label(i + 1, esc(x).replace('{T}', `<b data-lcs-model style="font-weight:800;font-size:23px;line-height:1;color:${T.teal}">${esc(t)}</b>`))).join('');
    blocks.push(cream('data-lcs-task="make"', lines, 8, 4));
    const RW = ROW_MAKE, byW = Math.ceil(pxOf('by', 30)) + 10;
    const coverRow = W - 6 - (SPINE + 14) - 12;          // the whole width inside the cover
    const drawBox = (more) => `<div data-lcs-drawbox style="box-sizing:border-box;border:2.5px dashed ${T.grid};border-radius:10px;${more}"></div>`;
    blocks.push(`<div data-lcs-part="front" data-lcs-make style="position:relative;box-sizing:border-box;width:100%;border:3px solid ${T.ink};border-radius:6px 16px 16px 6px;background:#FFFFFF;display:flex;flex-direction:column;gap:6px;padding:4px 12px 6px ${SPINE + 14}px">` + spine('left') +
      // level 3: the title printed large (cap height about 0.6 in) in a model box right above the title row, the box to draw in
      // beside it
      (d.model ? `<div data-lcs-modelrow style="display:flex;align-items:stretch;gap:12px"><div data-lcs-modelbox data-lcs-read style="flex:0 0 auto;display:flex;align-items:center;padding:6px 14px 4px;border:2.5px solid ${T.ink};border-radius:12px;background:${T.cream};font:800 ${d.model}px/1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(t)}</div>${drawBox('flex:1 1 auto;min-width:0')}</div>` : '') +
      `<div data-lcs-titlerow="front">${row({ w: coverRow, h: RW, trace: d.trace >= 1 ? t : null, answer: key ? t : null })}</div>` +
      // levels 1 and 2: the box to draw in under the title, as wide as the cover
      (d.model ? '' : drawBox(`height:${d.draw}px`)) +
      // "by" and the row for the name run the full width of the cover (a long first name fits)
      `<div data-lcs-byrow="front" style="display:flex;align-items:flex-end;gap:10px">${onRow('by', 30, '', RW)}${row({ w: coverRow - byW, h: RW })}</div></div>`);
    // the title page: the right page of an open book (its left page blank), the title and "by" and the name on it
    const FR = 0.26, tpH = 2 * RW + 46, pageRow = W - Math.round(W * FR) - 14 - 8;
    blocks.push(openBook('title', '', `<div data-lcs-titlerow="title">${row({ w: pageRow, h: RW, trace: d.trace >= 2 ? t : null, answer: key ? t : null })}</div>` +
      `<div data-lcs-byrow="title" style="display:flex;align-items:flex-end;gap:10px">${onRow('by', 30, '', RW)}${row({ w: pageRow - byW, h: RW })}</div>`, W, tpH, FR).replace('data-lcs-part="title"', 'data-lcs-part="title" data-lcs-make'));
  }

  if (mode === 'track') {
    const ARR = 12, SW = d.gap - ARR - 14;
    const sentence = (s, k) => {
      const lines = s.split('|').map((x) => toksOf(x)), all = lines.flat();
      const G = evenGap(s, d);
      let wi = 0;
      const showArrows = !d.boxes && (d.arrows === 'trace' || key);
      const col = key ? T.teal : T.grid, dash = !key;
      const showDots = d.dots || key;
      const word = (w) => {
        const i = wi++, first = i === 0, last = i === all.length - 1;
        return `<span data-lcs-tw="${i}" style="position:relative;display:inline-block">` +
          `<span data-lcs-twtext data-lcs-read style="display:block;font:800 ${d.font}px/1.15 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(w)}</span>` +
          // level 3: the box hangs centred under its word (the gap between the words stays even)
          (d.boxes ? numBox(`data-lcs-nbox="${i + 1}"`, BOX, key ? String(i + 1) : '', false, `position:absolute;left:50%;margin-left:-${BOX / 2}px;top:calc(100% + 8px)`) : '') +
          (first && showDots ? greenDot('data-lcs-start', 24, `position:absolute;right:calc(100% + 10px);top:${Math.round((d.font * 1.15 - 24) / 2)}px`) : '') +
          (last && showDots ? redDot('data-lcs-stop', 24, `position:absolute;left:calc(100% + 8px);top:${Math.round((d.font * 1.15 - 24) / 2)}px`) : '') + `</span>`;
      };
      const arrow = (n) => (showArrows ? `<span data-lcs-arrow="${n}" style="position:absolute;left:0;right:10px;bottom:-${ARR}px;height:0;border-top:4px ${dash ? 'dashed' : 'solid'} ${col}"></span>` +
        `<span data-lcs-arrowhead="${n}" style="position:absolute;right:-2px;bottom:-${ARR + 8}px;width:0;height:0;border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:14px solid ${col}"></span>` : '');
      // the return sweep: from the end of line 1 back down to the start of line 2, with the same solid head as the arrows,
      // turned along the sweep (its slope from the estimated width of line 1)
      const w1 = trackLineW(s.split('|')[0], d, G), tilt = (Math.atan2(SW, Math.max(80, w1 - 16)) * 180 / Math.PI).toFixed(1);
      const sweep = showArrows ? `<svg data-lcs-sweep style="position:absolute;left:8px;right:6px;top:calc(100% + ${ARR + 8}px);height:${SW}px;width:calc(100% - 14px);overflow:visible" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="100" y1="0" x2="0" y2="100" stroke="${col}" stroke-width="4" vector-effect="non-scaling-stroke"${dash ? ' stroke-dasharray="10 7"' : ''}/></svg>` +
        `<span data-lcs-sweephead style="position:absolute;left:-6px;top:calc(100% + ${ARR + 8 + SW - 8}px);width:0;height:0;border-top:8px solid transparent;border-bottom:8px solid transparent;border-right:16px solid ${col};transform-origin:0 50%;transform:rotate(-${tilt}deg)"></span>` : '';
      const lineHtml = (ws, n) => `<div data-lcs-tline="${n}" style="position:relative;display:inline-flex;align-items:flex-start;gap:${G}px;${d.boxes ? `padding-bottom:${BOX + 8}px;` : ''}">${ws.map(word).join('')}${arrow(n)}${n === 1 ? sweep : ''}</div>`;
      // the sentence on a page-shaped frame whose right edge comes just after line 1 (the longer line, as in a book; on level
      // 3 past the box under its last word)
      const last1 = pxOf(lines[0][lines[0].length - 1], d.font);
      const pr = 18 + (d.boxes ? Math.ceil(Math.max(0, (BOX - last1) / 2)) : 0);
      return `<div data-lcs-sent="${k + 1}" data-lcs-text="${attr(s)}" style="position:relative;flex:1 1 auto;align-self:flex-start;box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:${d.boxes ? 10 : d.gap}px;padding:${d.boxes ? 8 : 12}px ${pr}px ${d.boxes ? 4 : ARR + 16}px 52px;border:2.5px solid ${T.ink};border-radius:6px 14px 14px 6px;background:#FFFFFF;box-shadow:inset 9px 0 0 ${T.creamDeep}">${lineHtml(lines[0], 1)}${lineHtml(lines[1], 2)}</div>`;
    };
    blocks.push(cream('data-lcs-task="track"', label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px">${plan.sents.map(sentence).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
  }

  if (mode === 'pages') {
    const wordsHtml = (line, firstWord, lastWord, keyDots) => { const ts = toksOf(line);
      return ts.map((w, i) => { const fst = firstWord && i === 0, lst = lastWord && i === ts.length - 1;
        return `<span data-lcs-pw${fst ? '="first"' : lst ? '="last"' : ''} style="position:relative;display:inline-block">${esc(w)}${keyDots && fst ? greenDot('data-lcs-keydot="first"', 16, 'position:absolute;left:50%;margin-left:-8px;top:-14px') : ''}${keyDots && lst ? `<span data-lcs-keydot="last" style="position:absolute;left:50%;margin-left:-8px;top:-14px;width:16px;height:16px;border-radius:50%;background:${RED}"></span>` : ''}</span>`; }).join(' '); };
    if (lv === 1) {
      const page = (g, k) => `<div data-lcs-bpage="${k + 1}" style="position:relative;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;border:2.5px solid ${T.ink};border-radius:6px 14px 14px 6px;background:#FFFFFF;box-shadow:inset 9px 0 0 ${T.creamDeep};padding:8px 16px 8px 22px;flex:1 1 auto">` +
        g.lines.map((ln, j) => `<div data-lcs-pline="${j + 1}" data-lcs-text="${attr(ln)}" style="display:flex;align-items:center;gap:16px">${numBox(`data-lcs-lbox="${j + 1}"`, BOX, key ? String(j + 1) : '')}` +
          `<span data-lcs-ptext data-lcs-read style="flex:1 1 auto;font:800 ${d.font}px/1.2 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${wordsHtml(ln, j === 0, j === g.lines.length - 1, key)}</span>${img(g.nouns[j], d.pic)}</div>`).join('') + `</div>`;
      blocks.push(cream('data-lcs-task="pages"', label(1, esc(L[0])) + label(2, esc(L[1])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:14px;padding-top:4px">${plan.groups.map(page).join('')}</div>`, 8, 4, 'flex:1 1 auto;'));
    } else if (lv === 2) {
      const g = plan.groups[0];
      const page = (j) => { const left = j % 2 === 0, n = j + 1;
        return `<div data-lcs-spage="${n}" data-lcs-side="${left ? 'left' : 'right'}" data-lcs-text="${attr(g.lines[j])}" style="flex:1 1 0;min-width:0;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px;${left ? `border-right:2.5px solid ${T.ink};box-shadow:inset -8px 0 0 ${T.creamDeep}` : `box-shadow:inset 8px 0 0 ${T.creamDeep}`}">` +
          img(g.nouns[j], d.pic) + `<span data-lcs-ptext data-lcs-read style="font:800 ${d.font}px/1.2 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${wordsHtml(g.lines[j], j === 0, j === 3, key)}</span>` +
          `<div style="align-self:stretch;display:flex;justify-content:${left ? 'flex-start' : 'flex-end'}">${numBox(`data-lcs-pnum="${n}"`, BOX, key ? String(n) : '', true)}</div></div>`; };
      const spread = (s) => `<div data-lcs-spread="${s + 1}" style="flex:1 1 auto;display:flex;box-sizing:border-box;border:3px solid ${T.ink};border-radius:10px;background:#FFFFFF">${page(2 * s)}${page(2 * s + 1)}</div>`;
      // between the spreads a small curved arrow: turn the page
      const turn = `<div data-lcs-turn style="flex:0 0 auto;align-self:flex-end;margin-right:40px;line-height:0"><svg width="64" height="30" viewBox="0 0 64 30" style="display:block"><path d="M58 5 C 40 0, 22 2, 15 18" fill="none" stroke="${T.ink}" stroke-width="3" stroke-linecap="round"/><path d="M7 14 L14 27 L23 16 Z" fill="${T.ink}"/></svg></div>`;
      blocks.push(cream('data-lcs-task="pages"', label(1, esc(L[0])) + label(2, esc(L[1])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:2px;padding-top:4px">${spread(0)}${turn}${spread(1)}</div>`, 8, 4, 'flex:1 1 auto;'));
    } else {
      const spread = (g, s) => { const trap = plan.traps[s];
        const lineRow = (ln, j) => `<div data-lcs-pline="${j + 1}" data-lcs-text="${attr(ln)}" style="display:flex;align-items:center;gap:10px">${numBox(`data-lcs-lbox="${j + 1}"`, BOX, key ? String(j + 1) : '')}<span data-lcs-ptext data-lcs-read style="font:800 ${d.font}px/1.2 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(ln)}</span></div>`;
        const pics = (a, c) => `<div data-lcs-picrow style="display:flex;justify-content:center;gap:16px">${img(g.nouns[a], d.pic)}${img(g.nouns[c], d.pic)}</div>`;
        const lines = (a) => `<div data-lcs-plines style="display:flex;flex-direction:column;gap:10px">${lineRow(g.lines[a], a)}${lineRow(g.lines[a + 1], a + 1)}</div>`;
        // the left page: pictures first when the spread is a trap (its lines stand low); the right page the other way round
        const leftPage = `<div data-lcs-spage="left" style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;justify-content:space-between;gap:10px;padding:10px 12px;border-right:2.5px solid ${T.ink};box-shadow:inset -8px 0 0 ${T.creamDeep}">${trap ? pics(0, 1) + lines(0) : lines(0) + pics(0, 1)}</div>`;
        const rightPage = `<div data-lcs-spage="right" style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;justify-content:space-between;gap:10px;padding:10px 12px;box-shadow:inset 8px 0 0 ${T.creamDeep}">${trap ? lines(2) + pics(2, 3) : pics(2, 3) + lines(2)}</div>`;
        return `<div data-lcs-spread="${s + 1}" data-lcs-trap="${trap ? 1 : 0}" style="flex:1 1 auto;display:flex;align-items:stretch;gap:8px">${badge(s + 1)}<div style="flex:1 1 auto;display:flex;box-sizing:border-box;border:3px solid ${T.ink};border-radius:10px;background:#FFFFFF">${leftPage}${rightPage}</div></div>`; };
      blocks.push(cream('data-lcs-task="pages"', label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:14px;padding-top:4px">${plan.groups.map(spread).join('')}</div>`, 8, 4, 'flex:1 1 auto;'));
    }
  }

  if (mode === 'dots') {
    const lookRow = (items, r) => `<div data-lcs-lookrow="${r + 1}" style="display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:12px;background:#FFFFFF">${badge(r + 1)}` +
      items.map((x, i) => `<div data-lcs-lslot="${i}" style="flex:1 1 0;display:flex;justify-content:center;align-items:center">` +
        (x.k === 'scribble' ? `<span data-lcs-look="scribble" style="position:relative;display:block">${scribble(x.scribble)}</span>`
          : `<span data-lcs-look="${x.k}"${x.k === 'word' ? ' data-lcs-ok="1"' : ''} data-lcs-choice style="position:relative;display:inline-block;font:800 ${d.look}px/1.15 'Nunito',sans-serif;color:${T.ink};padding:0 6px">${esc(x.text)}${key && x.k === 'word' ? ring('-5px -6px') : ''}</span>`) + `</div>`).join('') + `</div>`;
    blocks.push(cream('data-lcs-task="look"', label(1, esc(L[0])) + `<div style="display:flex;flex-direction:column;gap:6px">${plan.rows.map(lookRow).join('')}</div>`, 8, 6));
    const sent = (x, k) => { const ts = toksOf(x.s);
      return `<div data-lcs-dsent="${k + 1}" data-lcs-text="${attr(x.s)}" style="display:flex;align-items:center;gap:12px;padding:4px 12px;border-radius:12px;background:#FFFFFF">` +
        `<div data-lcs-dwords style="flex:1 1 auto;display:flex;align-items:flex-start;gap:${Math.round(0.42 * d.font)}px;border-bottom:2px solid ${T.grid}">` +
        ts.map((w, i) => `<span data-lcs-dw="${i}" style="display:inline-flex;flex-direction:column;align-items:center"><span data-lcs-dwtext data-lcs-read style="font:800 ${d.font}px/1.15 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(w)}</span><span data-lcs-dotcell style="height:26px;display:flex;align-items:center">${key ? `<span data-lcs-keydot style="display:block;width:14px;height:14px;border-radius:50%;background:${T.teal}"></span>` : ''}</span></span>`).join('') +
        `</div>${img(x.p, d.pic)}</div>`; };
    blocks.push(cream('data-lcs-task="dots"', label(2, esc(L[1])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${plan.sents.map(sent).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
  }

  if (mode === 'match') {
    if (lv < 3) {
      const mrow = (x, r) => `<div data-lcs-mrow="${r + 1}" data-lcs-letter="${x.letter}" style="display:flex;align-items:center;gap:10px;padding:4px 12px;border-radius:12px;background:#FFFFFF">${badge(r + 1)}${img(x.target, d.pic)}` +
        `<div data-lcs-opts style="flex:1 1 auto;display:flex;justify-content:space-evenly">${x.opts.map((o, i) => `<div data-lcs-slot="${i}" style="flex:0 0 auto;display:flex;justify-content:center;align-items:center"><span data-lcs-opt="${attr(o)}"${o === x.target ? ' data-lcs-ok="1"' : ''} data-lcs-choice style="position:relative;display:inline-block;font:800 ${d.font}px/1.15 'Nunito',sans-serif;color:${T.ink};padding:0 6px;white-space:nowrap">${esc(o)}${key && o === x.target ? ring('-5px -8px') : ''}</span></div>`).join('')}</div></div>`;
      blocks.push(cream('data-lcs-task="match"', label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${plan.rows.map(mrow).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
    } else {
      const item = (x, k) => { const two = x.longTop ? [x.long, x.short] : [x.short, x.long];
        return `<div data-lcs-pitem="${k + 1}" style="flex:1 1 auto;display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:12px;background:#FFFFFF">${badge(k + 1)}${img(x.pic, d.pic)}` +
          `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:16px">${two.map((s, j) => `<div data-lcs-psent="${j}" data-lcs-long="${s === x.long ? 1 : 0}"${j === x.read ? ' data-lcs-ok="1"' : ''} data-lcs-read style="position:relative;font:700 ${d.font}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:0 8px;white-space:nowrap">${esc(s)}${key && j === x.read ? ring('-5px -6px') : ''}</div>`).join('')}</div></div>`; };
      blocks.push(cream('data-lcs-task="match"', label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px">${plan.pairs.map(item).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
      // the teacher strip: under a dashed cut line with a pair of scissors, the sentences to read, numbered by picture (the
      // teacher cuts it off before copying the page; nothing of the child's page stands under the cut line)
      const readOf = (x) => (x.longTop ? [x.long, x.short] : [x.short, x.long])[x.read];
      blocks.push(`<div data-lcs-tstrip style="flex:0 0 auto;display:flex;flex-direction:column;gap:5px">` +
        `<div data-lcs-cutline style="position:relative;height:0;margin:12px 0 6px 28px;border-top:2.5px dashed ${T.inkSoft}">${SCISSORS}</div>` +
        `<div data-lcs-tstriphead data-lcs-read style="font:800 16px/1.3 'Nunito',sans-serif;color:${T.inkSoft}">${esc(TSTRIP)}</div>` +
        `<div style="display:flex;flex-wrap:wrap;column-gap:24px;row-gap:2px">` + plan.pairs.map((x, i) => `<span data-lcs-tstripitem="${i + 1}" data-lcs-read style="white-space:nowrap;font:600 16px/1.3 'Nunito',sans-serif;color:${T.inkSoft}"><b style="font-weight:800">${i + 1}</b> ${esc(readOf(x))}</span>`).join('') + `</div></div>`);
    }
  }

  if (mode === 'count') {
    const SPW = Math.round(SPACE_EM * d.font);
    const item = (x, k) => { const ts = toksOf(x.s);
      const line = ts.map((w, i) => `<span data-lcs-cw="${i}" data-lcs-read style="font:800 ${d.font}px/1.15 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(w)}</span>` +
        (i < ts.length - 1 ? `<span data-lcs-space="${i}" style="position:relative;flex:0 0 ${SPW}px;margin:0 6px;box-sizing:border-box;height:${Math.round(d.font * 1.05)}px;${lv === 1 ? `border:2.5px dotted ${T.inkSoft};border-radius:8px;` : ''}">${key ? `<span data-lcs-spaceline style="position:absolute;left:50%;top:3px;bottom:3px;width:4px;margin-left:-2px;border-radius:2px;background:${T.teal}"></span>` : ''}</span>` : '')).join('');
      const answer = d.chips ? `<div data-lcs-chips style="display:flex;gap:18px">${d.chips.map((c) => `<span data-lcs-chip="${c}"${c === x.n ? ' data-lcs-ok="1"' : ''} data-lcs-choice style="position:relative;display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;font:800 34px/1 'Nunito',sans-serif;color:${T.ink}">${c}${key && c === x.n ? ring('-2px -2px') : ''}</span>`).join('')}</div>`
        : `<div style="display:flex;align-items:center;gap:10px">${numBox('data-lcs-nbox', BOX, key ? String(x.n) : '')}<span data-lcs-read style="font:700 20px/1 'Nunito',sans-serif;color:${T.ink}">words</span></div>`;
      return `<div data-lcs-citem="${k + 1}" data-lcs-n="${x.n}" data-lcs-text="${attr(x.s)}" style="display:flex;flex-direction:column;gap:4px;padding:8px 12px;border-radius:12px;background:#FFFFFF">` +
        `<div style="display:flex;align-items:center;gap:8px">${badge(k + 1)}<div data-lcs-cline style="display:flex;align-items:center">${line}</div></div>` +
        `<div style="display:flex;align-items:center;justify-content:space-between;padding-left:36px">${img(x.p, d.pic)}${answer}</div></div>`; };
    blocks.push(cream('data-lcs-task="count"', label(1, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${plan.sents.map(item).join('')}</div>`, 8, 6, 'flex:1 1 auto;'));
  }

  if (mode === 'spaces') {
    // level 3 holds four tasks: its cards keep their size, its padding is tight and its copy row is a low Kindergarten row
    let k = 0; const PAD = lv === 3 ? 4 : 7;
    const spaced = (s, font, attrs = '', gap = Math.round(0.55 * font)) => `<span ${attrs} style="display:inline-flex;gap:${gap}px">${toksOf(s).map((w) => `<span data-lcs-sw>${esc(w)}</span>`).join('')}</span>`;
    const rrow = (s, r) => { const two = plan.at[r] === 0 ? ['spaced', 'joined'] : ['joined', 'spaced'];
      return `<div data-lcs-rrow="${r + 1}" style="flex:1 1 auto;display:flex;align-items:stretch;gap:12px"><span style="align-self:center;display:flex">${badge(r + 1)}</span>` + two.map((v) => `<div data-lcs-ver="${v}"${v === 'spaced' ? ' data-lcs-ok="1"' : ''} data-lcs-read style="position:relative;flex:1 1 0;min-width:0;display:flex;align-items:center;justify-content:center;padding:${lv === 3 ? 5 : 8}px 8px;border-radius:12px;background:#FFFFFF;font:800 ${d.font}px/1.2 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">` +
        (v === 'spaced' ? spaced(s, d.font) : `<span>${esc(toksOf(s).join(''))}</span>`) + (key && v === 'spaced' ? ring('3px 3px').replace('border-radius:999px', 'border-radius:14px') : '') + `</div>`).join('') + `</div>`; };
    blocks.push(cream('data-lcs-task="read"', label(++k, esc(L[0])) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${plan.read.map(rrow).join('')}</div>`, PAD, 5, 'flex:1 1 auto;'));
    if (plan.copy) {
      // the model has finger spaces too; the key writes the sentence on the row with a finger space between the words
      blocks.push(cream('data-lcs-task="copy"', label(++k, esc(L[1])) + `<div data-lcs-copymodel data-lcs-read style="align-self:flex-start;padding:0 14px;border-radius:10px;background:#FFFFFF;font:800 30px/1.2 'Nunito',sans-serif;color:${T.ink}">${spaced(plan.copy, 30, '', 40)}</div>` +
        `<div data-lcs-copyrow>${row({ w: INNER, h: COPY_ROW, answer: key ? plan.copy : null, spaced: true })}</div>`, PAD, 3));
    }
    if (plan.cards) {
      // the glue strip: the cards in one row (two rows for five words), FINGER px between two cards, between the rows and to
      // every edge; the key prints the words where the cards go
      const c = plan.cards, f = d.cardFont, st = stripOf(c.s, f), two = st.rows.length > 1;
      const keyWords = key ? st.rows.map((r, ri) => { let x = FINGER; return r.map((i) => { const w = cardW(c.toks[i], f), h = `<span data-lcs-keyword="${attr(c.toks[i])}" style="position:absolute;left:${x}px;top:${FINGER + ri * (CARD_H + FINGER)}px;width:${w}px;height:${CARD_H}px;display:flex;align-items:center;justify-content:center;font:800 ${f}px/1 'Nunito',sans-serif;color:${T.teal}">${esc(c.toks[i])}</span>`; x += w + FINGER; return h; }).join(''); }).join('') : '';
      const strip = `<div data-lcs-strip data-lcs-striprows="${st.rows.map((r) => r.length).join(',')}" style="flex:0 0 auto;position:relative;box-sizing:content-box;width:${st.w}px;height:${st.h}px;border:2.5px dashed ${T.grid};border-radius:10px;background:#FFFFFF">${keyWords}</div>`;
      // level 3 (a strip of two rows): the model sentence stands beside the strip, over two lines
      const model = `<div data-lcs-model data-lcs-read style="${two ? 'flex:1 1 auto;min-width:0;text-align:center;' : 'align-self:center;'}font:800 ${two ? 26 : 30}px/1.25 'Nunito',sans-serif;color:${T.ink}">${two ? toksOf(c.s).map((w) => `<span data-lcs-sw style="display:inline-block;margin:0 7px">${esc(w)}</span>`).join(' ') : spaced(c.s, 30)}</div>`;
      blocks.push(cream('data-lcs-task="glue"', label(++k, esc(L[L.length - 1])) + (two ? `<div style="display:flex;align-items:center;gap:12px">${strip}${model}</div>` : model + `<div style="align-self:center;display:flex">${strip}</div>`), PAD, 5, 'flex:1 1 auto;justify-content:space-evenly;'));
      blocks.push(`<div data-lcs-cards style="display:flex;justify-content:center;padding:${PAD - 1}px 12px;border-radius:14px;background:${T.cream}"><div data-lcs-cardgrid style="display:flex;border-top:2px dashed ${T.ink};border-left:2px dashed ${T.ink}">` +
        c.order.map((i) => `<div data-lcs-card="${attr(c.toks[i])}" data-lcs-cardi="${i}" data-lcs-read style="box-sizing:border-box;width:${cardW(c.toks[i], f)}px;height:${CARD_H}px;display:flex;align-items:center;justify-content:center;border-right:2px dashed ${T.ink};border-bottom:2px dashed ${T.ink};background:#FFFFFF;font:800 ${f}px/1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(c.toks[i])}</div>`).join('') + `</div></div>`);
    }
  }
  return { blocks, rootAttr };
}

/* ---------------------------------------------------------------- verify's own copy of the ruled texts and measures ---------------------------------------------------------------- */
/** verify() does not read the build's constants (INSTR, LINES, LEGEND, CARD, the sizes): a build that changes one of them
 *  fails its pages */
const SPEC = {
  INSTR: {
    parts: { 1: 'A book has a front cover, a title page, and a back cover.', 2: 'A book has a front cover, a title page, and a back cover.', 3: 'A book has a front cover, a title page, and a back cover. The story starts after the title page.' },
    make: { 1: 'The title is on the front cover and again on the title page.', 2: 'The title is on the front cover and again on the title page.', 3: 'The title is on the front cover and again on the title page.' },
    track: { 1: 'We read left to right, then go down to the next line.', 2: 'We read left to right, then go down to the next line.', 3: 'We read left to right, then go down to the next line.' },
    pages: { 1: 'We read the lines from top to bottom.', 2: 'We read the left page, then the right page, then we turn the page.', 3: 'We read the lines of the left page before the lines of the right page.' },
    dots: { 1: 'Each word we say is one word on the page.', 2: 'Each word we say is one word on the page.', 3: 'Each word we say is one word on the page.' },
    match: { 1: 'A word that takes longer to say usually has more letters.', 2: 'A word that takes longer to say usually has more letters.', 3: 'When we say more words, we see more words.' },
    count: { 1: 'A space comes between two words.', 2: 'A space comes between two words.', 3: 'A space comes between two words.' },
    spaces: { 1: 'Spaces between words make a sentence easy to read.', 2: 'Spaces between words make a sentence easy to read.', 3: 'Spaces between words make a sentence easy to read.' },
  },
  LINES: {
    parts: { 1: ['Circle the front cover in each row. Put an X on the back cover in each row.'],
      2: ['Cut out the labels. Glue each label under its part of the book.', 'Circle the title on the front cover and on the title page.'],
      3: ['Cut out the labels. Glue each label under its part of the book. One part gets no label.', 'Put a green dot on the page where the story starts.'] },
    make: { 1: ['Trace the title. Draw a picture for your book. Write your name after by.', 'Trace the title on the title page. Write your name again.'],
      2: ['Trace the title. Draw a picture for your book. Write your name after by.', 'Write the title again on the title page. Write your name again.'],
      3: ['Write the title {T} on the front cover. Draw a picture. Write your name after by.', 'Write the title again on the title page. Write your name again.'] },
    track: { 1: ['Your teacher reads each sentence. Touch each word. Trace the arrows.'],
      2: ['Your teacher reads each sentence. Put a green dot where you start and a red dot where you stop. Draw an arrow under each line and an arrow back to the next line.'],
      3: ['Your teacher reads each sentence. Write 1 under the first word, 2 under the next word, and so on.'] },
    pages: { 1: ['Write 1, 2, and 3 in the boxes, in the order you read the lines.', 'Put a green dot on the first word and a red dot on the last word of each page.'],
      2: ['Write the page numbers 1, 2, 3, and 4 in the circles.', 'Put a green dot on the first word of the book and a red dot on the last word.'],
      3: ['In each book, write 1, 2, 3, and 4 in the boxes, in the order you read the lines.'] },
    dots: { 1: ['Circle the word in each row.', 'Your teacher reads each sentence. Touch each word. Put one dot under each word.'],
      2: ['Circle the word in each row.', 'Your teacher reads each sentence. Touch each word. Put one dot under each word.'],
      3: ['Circle the word in each row.', 'Your teacher reads each sentence. Touch each word. Put one dot under each word.'] },
    match: { 1: ['Your teacher says the name of each picture. Circle the word you hear.'],
      2: ['Your teacher says the name of each picture. Circle the word you hear.'],
      3: ['Your teacher reads one sentence for each picture. Point to each word. Circle the sentence you hear.'] },
    count: { 1: ['Your teacher reads each sentence. Draw a line in each space. Count the words. Circle the number.'],
      2: ['Your teacher reads each sentence. Draw a line in each space. Count the words. Write the number.'],
      3: ['Your teacher reads each sentence. Draw a line in each space. Count the words. Write the number.'] },
    spaces: { 1: ['Circle the sentence that is easy to read.', 'Cut out the words. Glue them in order with finger spaces.'],
      2: ['Circle the sentence that is easy to read.', 'Cut out the words. Glue them in order with finger spaces.'],
      3: ['Circle the sentence that is easy to read.', 'Copy the sentence. Leave a finger space between the words.', 'Cut out the words. Glue them in order with finger spaces.'] },
  },
  LEGEND: { front: 'Front cover: the title, the author, and a picture.', title: 'Title page: inside the book. It shows the title and the author again.', back: 'Back cover: turn the book over. It is the outside at the back.' },
  CARD: { front: 'front cover', title: 'title page', back: 'back cover' },
  TSTRIP: 'Teacher strip: cut off before you copy the page.', EITHER: 'either page is right',
  // K-669: the scribbles a page may draw (a wave, a low zigzag, a spiral) and the letter and digit pairs never in one row
  SCRIBBLES: ['M4 22 C 12 4, 22 4, 30 22 S 48 40, 56 22 S 72 4, 80 22', 'M4 24 L10 16 L16 24 L22 16 L28 24 L34 16 L40 24 L46 16 L52 24 L58 16 L64 24 L70 16 L76 24',
    'M44 20 a3 3 0 1 0 -6 0 a6 6 0 1 0 12 0 a9 9 0 1 0 -18 0 a12 12 0 1 0 24 0 a15 15 0 1 0 -30 0'],
  CONFUSABLE: [['g', '9'], ['s', '5'], ['o', '0'], ['l', '1']],
  // K-670: words that never share a row
  NEVER_ROW: [['snowman', 'strawberry'], ['balloon', 'broccoli'], ['tractor', 'telephone'], ['ladder', 'lollipop'], ['cake', 'camel'], ['corn', 'camel'], ['tent', 'tiger']],
  // the measures: a Kindergarten row (never under 110 px), a box for one number, pictures, read-aloud text, words to circle,
  // big print to track, the widest blank band, the glue room, the share of the body the blocks fill
  ROW_FLOOR: 110, BOX: 72, PIC: 60, READ: 16, CHOICE: 20, BIG: 30, BAND: 40, GLUE: 30, FILL: 0.8,
  // K-665: a glue box three times nearer to its own part, a title ROOM px from the gutter and the edge of its page; K-666: the
  // box to draw in (levels 1 and 2) at least DRAWW wide, the model title of level 3 at least MODEL px; K-670: neighbouring
  // lengths RATIO times wider and LETTERS more letters; K-672: cards CARD_W x CARD_H or more, FINGER px between two glued
  // cards, to every edge, and between the words of the key's copied sentence
  NEAR: 3, ROOM: 16, DRAWW: 450, MODEL: 78, RATIO: 1.35, LETTERS: { SM: 2, ML: 3, SL: 3 }, CARD_W: 96, CARD_H: 86, FINGER: 50,
  // what each page holds, by level
  HOLD: {
    parts: { 1: { books: 2, parts: 3 }, 2: { books: 1, parts: 3, cards: 3 }, 3: { books: 1, parts: 4, cards: 3 } },
    track: { 1: { n: 3, words: [4, 6] }, 2: { n: 3, words: [4, 6] }, 3: { n: 2, words: [5, 6] } },
    dots: { 1: { rows: 4, items: 3, n: 4, words: [3, 3] }, 2: { rows: 4, items: 4, n: 4, words: [4, 5] }, 3: { rows: 4, items: 4, n: 4, words: [5, 6] } },
    match: { 1: { rows: 6, opts: 2 }, 2: { rows: 6, opts: 3 }, 3: { items: 4 } },
    count: { 1: { n: 4, words: [2, 3] }, 2: { n: 4, words: [3, 5] }, 3: { n: 4, words: [4, 6] } },
    spaces: { 1: { read: 4, cards: [3, 3] }, 2: { read: 4, cards: [4, 4] }, 3: { read: 2, copy: true, cards: [5, 5] } },
  },
};

/** what verify() needs to know of the bank */
function infoOf() {
  return {
    books: Object.fromEntries(BANK.books.map((x) => [x.title, x])), makeTitles: BANK.makeTitles, twoLine: BANK.twoLine,
    syl: BANK.syl, dots: BANK.dots, count: BANK.count, pairs: BANK.pairs, lengths: BANK.lengths, lengthSyl: BANK.lengthSyl, lengthPics: BANK.lengthPics,
    lookWords: BANK.lookWords, lookLetters: BANK.lookLetters, lookNumbers: BANK.lookNumbers, sylMore: BANK.sylMore || {}, frames: BANK.frames, sets: BANK.sets, spaces: BANK.spaces, banned: BANK.banned,
  };
}

function makePrintConceptsKType({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('print-concepts-k: unknown mode ' + mode);
  // the description a search page shows is "Free printable <title> Worksheet for Kindergarten. <level-2 instruction> Download
  // the free PDF.": 120 to 170 letters
  const desc = `Free printable ${i18n.en.title} Worksheet for Kindergarten. ${INSTR[mode][2]} Download the free PDF.`;
  if (desc.length < 120 || desc.length > 170) throw new Error(`${id}: the description has ${desc.length} letters (120 to 170)`);
  const INFO = infoOf();
  return {
    id, slug, gradeBand: 'K', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the books and sentences are English (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const plan = drawPage(BANK, mode, lv, rng, Number(ctx && ctx.variant) || 0);
      const { blocks, rootAttr } = renderPage(plan, mode, lv, d, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-pck="${mode}|${lv}" data-lcs-noliga="1"${rootAttr}${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(svgRoom(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((S, INFO) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-pck]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsPck.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => (e ? e.textContent.replace(/\s+/g, ' ').trim() : '');
        const all = (q, e = root) => [...e.querySelectorAll(q)];
        const one = (q, e = root) => e.querySelector(q);
        const TEAL = 'rgb(20, 107, 94)', GREEN = 'rgb(78, 138, 60)', RED = 'rgb(192, 57, 43)';
        const rb = R(root);
        const toks = (s) => String(s).replace(/\|/g, ' ').split(/\s+/).filter(Boolean);
        const wordsOf = (s) => toks(s).map((w) => w.replace(/[.,!?]/g, '').toLowerCase());
        const inside = (a, b, tol = 0.5) => { const x = R(a), y = R(b); return x.left >= y.left - tol && x.right <= y.right + tol && x.top >= y.top - tol && x.bottom <= y.bottom + tol; };
        // a repeated block: L R L R, or runs all of one length of two or more (R R L L, 2 2 3 3)
        const blockRepeat = (s) => { for (let k = 2; k <= 4; k++) { if (s.length < 2 * k) continue; if ([...s].every((c, i) => c === s[i % k])) return true; }
          const runs = String(s).match(/(.)\1*/g) || []; return runs.length >= 2 && runs[0].length >= 2 && runs.every((r) => r.length === runs[0].length); };
        const placesOk = (p, k) => {
          const n = p.length, s = p.join(''), need = n >= 6 ? Math.min(k, 3) : n >= 3 ? 2 : 1;
          if (new Set(p).size < need) return false;
          if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
          if (p.some((x, i) => i >= 2 && x - p[i - 1] === p[i - 1] - p[i - 2] && Math.abs(x - p[i - 1]) === 1)) return false;
          if (blockRepeat(s)) return false;
          const cap = n === 4 && k === 2 ? 3 : Math.floor((2 * n) / 3);
          if (n >= 3 && Math.max(...[...new Set(p)].map((v) => p.filter((x) => x === v).length)) > cap) return false;
          return true;
        };
        /** the distance between two boxes (0 when they touch or overlap) */
        const gapOf = (a, b) => { const x = R(a), y = R(b), dx = Math.max(0, x.left - y.right, y.left - x.right), dy = Math.max(0, x.top - y.bottom, y.top - x.bottom); return Math.hypot(dx, dy); };
        /** the rectangles of the letters of an element's text (no padding, no border) */
        const inkOf = (e) => { const q = [], tw = document.createTreeWalker(e, NodeFilter.SHOW_TEXT); let n;
          while ((n = tw.nextNode())) { if (!n.textContent.trim()) continue; const rg = document.createRange(); rg.selectNodeContents(n); q.push(...[...rg.getClientRects()].filter((x) => x.width > 0.5)); }
          return q.length ? { left: Math.min(...q.map((x) => x.left)), right: Math.max(...q.map((x) => x.right)), top: Math.min(...q.map((x) => x.top)), bottom: Math.max(...q.map((x) => x.bottom)), width: Math.max(...q.map((x) => x.right)) - Math.min(...q.map((x) => x.left)) } : null; };
        const H = S.HOLD[mode] ? S.HOLD[mode][lv] : null;

        // letters: ligatures off everywhere, and an f before i, f, l, t and a t before t have their own room
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if (all('*').some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg, style') && /f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        // typographic apostrophes and quotes only
        if (/['"]/.test(root.textContent.replace(/\[data-lcs-noliga\][^}]*\}/, ''))) fails.push('a straight apostrophe or quote on the page');
        // pictures: loaded, 60 px or more, no two of one kind
        const imgs = all('img');
        imgs.forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < S.PIC - 0.5 || R(im).height < S.PIC - 0.5) fails.push(`a picture smaller than ${S.PIC} px`); });
        if (new Set(imgs.map((im) => im.dataset.lcsPickind)).size !== imgs.length) fails.push('two pictures of one kind on the page');
        // the instruction at the top of the page is the one of this level
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        // the task lines: numbered 1, 2, ... and the lines of this level
        { const ls = all('[data-lcs-label]'), want = S.LINES[mode][lv];
          if (ls.length !== want.length) fails.push(`${ls.length} task lines, not ${want.length}`);
          ls.forEach((l, i) => { const t = txt(l), m = /^(\d+)\. (.*)$/.exec(t);
            const w = (want[i] || '').replace('{T}', root.dataset.lcsTitle || '{T}');
            if (!m || +m[1] !== i + 1 || m[2] !== w) fails.push(`task line ${i + 1} is not the line of level ${lv}: "${t}"`); }); }
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more, no blank band
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, svg').forEach((e) => { if (e.closest('[data-lcs-sweephead], [data-lcs-sweep]')) return; const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card (' + (Object.keys(e.dataset)[0] || e.tagName) + ')'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        for (let i = 1; i < blocks.length; i++) { const g = R(blocks[i]).top - R(blocks[i - 1]).bottom; if (g > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two parts of the page`); }
        { const gb = rb.bottom - R(blocks[blocks.length - 1]).bottom; if (gb > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(gb)} px under the last block`); }
        // the blank bands a reader SEES inside every block: the union of everything printed (text, pictures, the rules of a
        // writing row, boxes with a border, bars) from the block's inner top to its inner bottom
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
        // sizes: Kindergarten rows, boxes for one number, read-aloud text, words to circle
        const lines = all('[data-lcs-line]');
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < S.ROW_FLOOR - 0.5) fails.push(`a writing row lower than ${S.ROW_FLOOR} px`); });
        all('[data-lcs-nbox], [data-lcs-lbox], [data-lcs-pnum]').forEach((e) => { const r = R(e); if (r.width < S.BOX - 0.5 || r.height < S.BOX - 0.5) fails.push(`a box for one number is ${Math.round(r.width)} x ${Math.round(r.height)} px (${S.BOX} or more)`); });
        all('[data-lcs-read]').forEach((e) => { if (fs(e) < S.READ - 0.1) fails.push(`text the teacher reads is ${fs(e)} px (${S.READ} or more)`); });
        all('[data-lcs-choice]').forEach((e) => { if (fs(e) < S.CHOICE - 0.1) fails.push(`a thing to circle is printed at ${fs(e)} px (${S.CHOICE} or more)`); });
        if (!isKey && (lines.some((l) => l.dataset.lcsAnswer) || all('[data-lcs-ring], [data-lcs-xmark], [data-lcs-keydot], [data-lcs-keyspread], [data-lcs-keylabel], [data-lcs-keyword], [data-lcs-spaceline]').length || all('[data-lcs-nbox], [data-lcs-lbox], [data-lcs-pnum]').some((e) => txt(e)))) fails.push('an answer is marked on the page of the child');
        // the teacher strip: only on level 3 of K-670 (the sentences to read are the dictation), at the foot of the page under
        // a dashed cut line with scissors; nothing of the child's page stands under the cut line
        const tss = all('[data-lcs-tstrip]');
        const wantTS = mode === 'match' && lv === 3;
        if (tss.length !== (wantTS ? 1 : 0)) fails.push(`${tss.length} teacher strips (${wantTS ? 'one' : 'none'} wanted)`);
        tss.forEach((ts) => { const cut = one('[data-lcs-cutline]', ts);
          if (ts !== blocks[blocks.length - 1]) fails.push('the teacher strip is not at the foot of the page');
          if (!cut || cs(cut).borderTopStyle !== 'dashed' || R(cut).width < rb.width * 0.9 || !one('[data-lcs-scissors]', cut)) { fails.push('the teacher strip has no dashed cut line across the page with scissors'); return; }
          blocks.forEach((b) => { if (b !== ts && R(b).bottom > R(cut).top + 0.5) fails.push('the cut line of the teacher strip runs through the page of the child'); });
          [...ts.querySelectorAll('[data-lcs-read]')].forEach((e) => { if (R(e).top < R(cut).bottom - 0.5) fails.push('a part of the teacher strip stands above its cut line'); });
          if (txt(one('[data-lcs-tstriphead]', ts)) !== S.TSTRIP) fails.push('the teacher strip does not say to cut it off before copying'); });
        // a word of the never list never stands on the page
        { const ws = wordsOf(root.textContent); const bad = ws.filter((w) => INFO.banned.includes(w)); if (bad.length) fails.push('a word of the never list: ' + bad.join(', ')); }
        // the cards to cut out share their cut lines and stand at the foot of the page
        const cards = all('[data-lcs-card]');
        if (cards.length) {
          if (root.lastElementChild !== one('[data-lcs-cards]')) fails.push('the cards to cut out are not at the foot of the page');
          cards.forEach((c, i) => { if (cs(c).borderRightStyle !== 'dashed' || cs(c).borderBottomStyle !== 'dashed' || cs(c).borderLeftStyle !== 'none') fails.push('a card does not share its cut lines'); if (i && Math.abs(R(c).left - R(cards[i - 1]).right) > 0.6) fails.push('two cards side by side do not share their cut line'); if (R(c).width < 40 || !txt(c)) fails.push('a card is empty'); });
          // the word cards of K-672 are big enough for five-year-old hands
          if (mode === 'spaces') cards.forEach((c) => { if (R(c).width < S.CARD_W - 0.5 || R(c).height < S.CARD_H - 0.5) fails.push(`a word card is ${Math.round(R(c).width)} x ${Math.round(R(c).height)} px (${S.CARD_W} x ${S.CARD_H} or more)`); });
          cards.forEach((c) => { const sp = document.createRange(); sp.selectNodeContents(c); const q = [...sp.getClientRects()].filter((x) => x.width > 0.5); if (q.some((x) => x.left < R(c).left - 0.5 || x.right > R(c).right + 0.5)) fails.push('a card word leaves its card'); });
        }
        /** a glue box holds n cards of w x h with GLUE between two cards and from a card to every edge (in one row or more) */
        const glueOk = (box, n, w, h) => { const r = R(box), bw = r.width - 2 * parseFloat(cs(box).borderLeftWidth), bh = r.height - 2 * parseFloat(cs(box).borderTopWidth);
          for (let k = 1; k <= n; k++) { const rows = Math.ceil(n / k); if (k * w + (k + 1) * S.GLUE <= bw + 0.5 && rows * h + (rows + 1) * S.GLUE <= bh + 0.5) return true; } return false; };

        // ---------------------------------------------------------------- K-665 the parts of a book
        if (mode === 'parts') {
          const lg = all('[data-lcs-legendline]');
          if (lg.length !== 3 || lg.some((e) => txt(e) !== S.LEGEND[e.dataset.lcsLegendline])) fails.push('the box does not say what each part of a book is');
          if (one('[data-lcs-legend]') !== blocks[0]) fails.push('the box of the parts is not under the instruction');
          const rows = lv === 1 ? all('[data-lcs-partrow]') : [one('[data-lcs-task="parts"]')];
          if (rows.length !== H.books) fails.push(`${rows.length} books, not ${H.books}`);
          const orders = [];
          rows.forEach((rw, r) => {
            const cells = all('[data-lcs-cell]', rw), parts = cells.map((c) => c.dataset.lcsCellpart);
            orders.push(parts);
            if (cells.length !== H.parts) fails.push(`book ${r + 1}: ${cells.length} parts, not ${H.parts}`);
            const want = H.parts === 4 ? ['front', 'title', 'story', 'back'] : ['front', 'title', 'back'];
            if (parts.slice().sort().join() !== want.slice().sort().join()) fails.push(`book ${r + 1}: the parts are ${parts.join(', ')}`);
            if (parts.join() === want.join() || parts.join() === want.slice().reverse().join()) fails.push(`book ${r + 1}: the parts stand in the order of a book or its reverse`);
            const byPos = cells.slice().sort((a, b) => (Math.abs(R(a).top - R(b).top) > 8 ? R(a).top - R(b).top : R(a).left - R(b).left)); if (byPos.some((c, i) => c !== cells[i])) fails.push(`book ${r + 1}: the parts are not printed in their order`);
            cells.forEach((c) => { const p = c.dataset.lcsCellpart, dr = one('[data-lcs-part]', c);
              if (!dr || dr.dataset.lcsPart !== p) { fails.push(`book ${r + 1}: a cell does not draw its part`); return; }
              const ttl = one('[data-lcs-booktitle]', dr), au = one('[data-lcs-author]', dr), pic = one('img', dr), sp = one('[data-lcs-spine]', dr);
              const bk = (rw.dataset.lcsBook && INFO.books[rw.dataset.lcsBook]) || null;
              if (p === 'front') { if (!ttl || !au || !pic || !sp || sp.dataset.lcsSpine !== 'left' || R(sp).left > R(dr).left + 4) fails.push(`book ${r + 1}: the front cover lacks its title, author, picture, or its spine on the left`); }
              if (p === 'title') { if (!ttl || !au || pic || sp || !one('[data-lcs-leftpage]', dr) || txt(one('[data-lcs-leftpage]', dr)) || !ttl.closest('[data-lcs-page]')) fails.push(`book ${r + 1}: the title page is not an open book with the title and the author and no picture`); }
              if (p === 'back') { if (ttl || au || pic || !sp || sp.dataset.lcsSpine !== 'right' || R(sp).right < R(dr).right - 4 || txt(dr) || !one('[data-lcs-barcode]', dr)) fails.push(`book ${r + 1}: the back cover is not a back with its spine on the right, without words or a picture`); }
              if (p === 'story') { if (ttl || au || !pic || !one('[data-lcs-first]', dr) || !one('[data-lcs-leftpage]', dr) || !pic.closest('[data-lcs-leftpage]') || !one('[data-lcs-page] [data-lcs-first]', dr)) fails.push(`book ${r + 1}: the story page is not an open book with a picture and a sentence`); }
              if (bk) { if (ttl && txt(ttl) !== bk.title) fails.push(`book ${r + 1}: a title is not the book's title`); if (au && txt(au) !== 'by ' + bk.author) fails.push(`book ${r + 1}: an author line is not "by ${bk.author}"`);
                if (p === 'front' && pic && pic.dataset.lcsPic !== bk.cover) fails.push(`book ${r + 1}: the cover picture is not the book's`); if (p === 'story' && (!pic || pic.dataset.lcsPic !== bk.pic2 || txt(one('[data-lcs-first]', dr)) !== bk.first)) fails.push(`book ${r + 1}: the story page is not the book's first page`); }
              else fails.push(`book ${r + 1}: not a book of the bank`);
              all('[data-lcs-booktitle], [data-lcs-author], [data-lcs-first]', dr).forEach((e) => { if (!inside(e, dr)) fails.push(`book ${r + 1}: a text leaves its drawing`); });
              // the title on the title page keeps ROOM px from the gutter and from the edge of its page; the key's ring stays on
              // the page
              if (p === 'title' && ttl) { const gx = R(dr).left + +dr.dataset.lcsGutter, ex = R(dr).right - 3, ink = inkOf(ttl), rg = one('[data-lcs-ring]', ttl);
                if (!ink || ink.left < gx + S.ROOM - 0.5 || ink.right > ex - S.ROOM + 0.5) fails.push(`book ${r + 1}: the title on the title page comes nearer than ${S.ROOM} px to the gutter or the page edge`);
                if (rg && (R(rg).left < gx + 1 || R(rg).right > ex - 1)) fails.push(`book ${r + 1}: the key's ring leaves the title page`); }
            });
            if (lv === 1) {
              const front = cells.find((c) => c.dataset.lcsCellpart === 'front'), back = cells.find((c) => c.dataset.lcsCellpart === 'back');
              if (isKey && (!front || !one('[data-lcs-ring]', front) || all('[data-lcs-ring]', rw).length !== 1 || !back || !one('[data-lcs-xmark]', back) || all('[data-lcs-xmark]', rw).length !== 1)) fails.push(`book ${r + 1}: the key does not circle the front cover and cross the back cover`);
            }
          });
          if (lv === 1 && orders.length === 2 && orders[0].some((p, i) => p === orders[1][i])) fails.push('a part stands in one place in both rows: ' + orders.map((o) => o.join('-')).join(' / '));
          if (lv > 1) {
            const glues = all('[data-lcs-glue]'), cw = cards.length ? R(cards[0]).width : 0, ch = cards.length ? R(cards[0]).height : 0;
            if (glues.length !== H.parts || cards.length !== H.cards || cards.map((c) => c.dataset.lcsCard).sort().join() !== 'back,front,title') fails.push('not a glue box under each part and the three labels');
            cards.forEach((c) => { if (txt(c) !== S.CARD[c.dataset.lcsCard]) fails.push(`the label "${txt(c)}" is not "${S.CARD[c.dataset.lcsCard]}"`); });
            const lab = (orders[0] || []).filter((p) => p !== 'story');
            if (cards.map((c) => c.dataset.lcsCard).join() === lab.join()) fails.push('the labels stand in the order of the parts above them');
            const drawn = all('[data-lcs-part]', rows[0]);
            glues.forEach((g) => { const cell = g.closest('[data-lcs-cell]'), dr = cell && one('[data-lcs-part]', cell);
              const ar = cell && one('[data-lcs-area]', cell), mid = (e) => (R(e).left + R(e).right) / 2;
              if (!cell || g.dataset.lcsGlue !== cell.dataset.lcsCellpart || !dr || !ar) { fails.push('a glue box does not belong to a part'); return; }
              // right under its part, centred, and at least NEAR times nearer to it than to any other part (a label glued
              // under its part can never be taken for the label of another one)
              if (R(g).top < R(dr).bottom - 0.5 || Math.abs(mid(g) - mid(dr)) > 3) fails.push(`the glue box of the ${g.dataset.lcsGlue} does not stand under its part`);
              const own = gapOf(g, dr), other = Math.min(...drawn.filter((x) => x !== dr).map((x) => gapOf(g, x)));
              if (other < S.NEAR * Math.max(own, 2)) fails.push(`the glue box of the ${g.dataset.lcsGlue} is ${Math.round(own)} px from its part and ${Math.round(other)} px from another (${S.NEAR} times nearer wanted)`);
              if (!glueOk(g, 1, cw, ch)) fails.push(`a glue box (${Math.round(R(g).width)} x ${Math.round(R(g).height)}) cannot hold its label (${Math.round(cw)} x ${Math.round(ch)}) with ${S.GLUE} px of room`);
              const kl = one('[data-lcs-keylabel]', g);
              if (isKey ? (g.dataset.lcsGlue === 'story' ? !!kl : !kl || txt(kl) !== S.CARD[g.dataset.lcsGlue]) : !!kl) fails.push(`the glue box of the ${g.dataset.lcsGlue} is wrong on the key or filled on the page of the child`); });
            if (lv === 2) { const rg = all('[data-lcs-ring]'); if (isKey && (rg.length !== 2 || !rg.every((x) => x.parentElement.matches('[data-lcs-booktitle]')) || new Set(rg.map((x) => x.parentElement.dataset.lcsBooktitle)).size !== 2)) fails.push('the key does not circle the title on the front cover and on the title page'); }
            // level 3: either page of the story spread is right; the key rings the spread and says so beside a green dot
            if (lv === 3 && isKey) { const kd = all('[data-lcs-keydot]'), ks = all('[data-lcs-keyspread]'), cell = drawn.find((x) => x.dataset.lcsPart === 'story'), wrap = cell && cell.closest('[data-lcs-cell]');
              const rg = wrap ? all('[data-lcs-ring]', wrap) : [];
              if (kd.length !== 1 || ks.length !== 1 || !wrap || !wrap.contains(ks[0]) || !ks[0].contains(kd[0]) || cs(kd[0]).backgroundColor !== GREEN || txt(ks[0]) !== S.EITHER) fails.push('the key does not mark the story spread with a green dot and "' + S.EITHER + '"');
              if (rg.length !== 1 || !(R(rg[0]).left <= R(cell).left && R(rg[0]).right >= R(cell).right && R(rg[0]).top <= R(cell).top && R(rg[0]).bottom >= R(cell).bottom)) fails.push('the key does not ring the whole story spread'); }
          }
          all('[data-lcs-booktitle]').forEach((e) => { if (fs(e) < S.READ) fails.push('a book title is printed smaller than ' + S.READ + ' px'); });
        }

        // ---------------------------------------------------------------- K-666 make a front cover and a title page
        if (mode === 'make') {
          const t = root.dataset.lcsTitle || '';
          if (!INFO.makeTitles.includes(t)) fails.push(`"${t}" is no title of the bank`);
          const front = one('[data-lcs-part="front"]'), tp = one('[data-lcs-part="title"]');
          if (!front || !tp || blocks.indexOf(front) !== 1 || blocks.indexOf(tp) !== 2) fails.push('the page is not the task lines, the front cover and the title page');
          if (front && (!one('[data-lcs-spine="left"]', front) || !one('[data-lcs-drawbox]', front))) fails.push('the front cover has no spine on the left or no box to draw in');
          if (tp && !one('[data-lcs-leftpage]', tp)) fails.push('the title page is not drawn as a page inside a book');
          const tr = (where) => one(`[data-lcs-titlerow="${where}"] [data-lcs-line]`), by = (where) => one(`[data-lcs-byrow="${where}"]`);
          for (const [where, traced] of [['front', lv <= 2], ['title', lv === 1]]) {
            const l = tr(where), b = by(where);
            if (!l) { fails.push(`no row for the title on the ${where}`); continue; }
            if (isKey ? l.dataset.lcsAnswer !== t : traced ? l.dataset.lcsTrace !== t : !!l.dataset.lcsTrace) fails.push(`the title row on the ${where} is not ${isKey ? 'the title on the key' : traced ? 'the title to trace' : 'empty'}`);
            if (traced && !isKey) { const tx = l.querySelector('text'); if (!tx || tx.getAttribute('fill').toUpperCase() !== '#C8BFAE') fails.push('a title to trace is not printed in light grey'); }
            if (!b || txt(b.querySelector('[data-lcs-read]')) !== 'by' || b.querySelectorAll('[data-lcs-line]').length !== 1 || b.querySelector('[data-lcs-line]').dataset.lcsAnswer) fails.push(`the ${where} has no empty row for the name after "by"`);
          }
          // the title (and every row) fits; the model title of level 3 stands in the task line
          lines.forEach((l) => { const tx = l.querySelector('svg text'); if (tx && (tx.getAttribute('textLength') || tx.getBBox().width > R(l.querySelector('svg')).width - 15)) fails.push(`"${tx.textContent}" is squeezed or wider than its row`); });
          const md = all('[data-lcs-model]');
          if (lv === 3 ? md.length !== 1 || txt(md[0]) !== t || fs(md[0]) < 22 : md.length) fails.push('the title to copy is not in the task line (level 3 only)');
          // "by" and the row for the name run the full width of the cover, under the box to draw in
          const fb = by('front'), fbl = fb && one('[data-lcs-line] svg', fb), db = front && one('[data-lcs-drawbox]', front), ftr = tr('front');
          if (front && fbl && R(fbl).right < R(front).right - 3 - 30) fails.push('the row for the name does not run the full width of the cover');
          if (db && fb && R(fb).top < R(db).bottom - 0.5) fails.push('the row for the name does not stand under the box to draw in');
          // levels 1 and 2: the box to draw in is wide (under the title row); level 3: the title printed large in a model box
          // right above the title row, the box to draw in beside it
          const mb = one('[data-lcs-modelbox]');
          if (lv < 3) { if (mb || !db || R(db).width < S.DRAWW || (ftr && R(db).top < R(ftr).bottom - 0.5)) fails.push(`the box to draw in is not under the title and at least ${S.DRAWW} px wide`); }
          else if (!mb || txt(mb) !== t || fs(mb) < S.MODEL || !ftr || R(mb).bottom > R(ftr).top + 0.5 || R(ftr).top - R(mb).bottom > 12 || Math.abs(R(mb).left - R(ftr).left) > 4 || !db || R(db).width < 120 || Math.abs(R(db).top - R(mb).top) > 1) fails.push('level 3: the title is not printed large in a model box right above the title row with the box to draw in beside it');
        }

        // ---------------------------------------------------------------- K-667 read left to right, top to bottom
        if (mode === 'track') {
          const ss = all('[data-lcs-sent]');
          if (ss.length !== H.n) fails.push(`${ss.length} sentences, not ${H.n}`);
          const texts = ss.map((s) => s.dataset.lcsText);
          if (new Set(texts).size !== texts.length) fails.push('a sentence stands twice');
          ss.forEach((s, k) => {
            const tag = `sentence ${k + 1}`, src = s.dataset.lcsText;
            if (!INFO.twoLine.includes(src)) { fails.push(`${tag} is no sentence of the bank`); return; }
            const ls = all('[data-lcs-tline]', s), ws = all('[data-lcs-tw]', s);
            const want = toks(src);
            if (want.length < H.words[0] || want.length > H.words[1]) fails.push(`${tag} has ${want.length} words`);
            if (ls.length !== 2) { fails.push(`${tag} is not printed over two lines`); return; }
            const l1 = src.split('|')[0].trim().split(/\s+/), l2 = src.split('|')[1].trim().split(/\s+/);
            if (all('[data-lcs-twtext]', ls[0]).map(txt).join(' ') !== l1.join(' ') || all('[data-lcs-twtext]', ls[1]).map(txt).join(' ') !== l2.join(' ')) fails.push(`${tag} is not printed as its two lines`);
            if (ws.map((w) => txt(one('[data-lcs-twtext]', w))).join(' ') !== want.join(' ') || ws.some((w, i) => +w.dataset.lcsTw !== i)) fails.push(`${tag}: the words are not in reading order`);
            if (Math.abs(R(ls[1]).left - R(ls[0]).left) > 1.5) fails.push(`${tag}: the second line does not start where the first one starts`);
            if (R(ls[1]).top < R(ls[0]).bottom + 10) fails.push(`${tag}: the second line does not stand below the first`);
            [ls[0], ls[1]].forEach((l) => { const w2 = all('[data-lcs-twtext]', l); w2.forEach((w, i) => { if (i && R(w).left < R(w2[i - 1]).right + 6) fails.push(`${tag}: two words stand too close`); if (Math.abs(R(w).top - R(w2[0]).top) > 1) fails.push(`${tag}: the words of a line are not on one line`); }); });
            all('[data-lcs-twtext]', s).forEach((w) => { if (fs(w) < S.BIG) fails.push(`${tag}: a word is printed smaller than ${S.BIG} px`); });
            const st = all('[data-lcs-start]', s), sp = all('[data-lcs-stop]', s);
            const dotsWanted = lv !== 2 || isKey;
            if (dotsWanted) {
              const w0 = one('[data-lcs-twtext]', ws[0]), wl = one('[data-lcs-twtext]', ws[ws.length - 1]);
              if (st.length !== 1 || sp.length !== 1 || st[0].parentElement !== ws[0] || sp[0].parentElement !== ws[ws.length - 1]) fails.push(`${tag}: no green dot at the first word and red dot at the last`);
              else { if (R(st[0]).right > R(w0).left - 4 || Math.abs((R(st[0]).top + R(st[0]).bottom) / 2 - (R(w0).top + R(w0).bottom) / 2) > 8 || cs(st[0]).backgroundColor !== GREEN) fails.push(`${tag}: the green dot is not just before the first word`);
                // the stop is a red DOT (round, as wide as it is high), never a sign
                if (R(sp[0]).left < R(wl).right + 4 || Math.abs((R(sp[0]).top + R(sp[0]).bottom) / 2 - (R(wl).top + R(wl).bottom) / 2) > 8 || sp[0].tagName !== 'SPAN' || cs(sp[0]).backgroundColor !== RED || cs(sp[0]).borderTopLeftRadius !== '50%' || Math.abs(R(sp[0]).width - R(sp[0]).height) > 0.5) fails.push(`${tag}: the red dot is not just after the last word`); }
            } else if (st.length || sp.length) fails.push(`${tag}: the dots are printed on level 2 (the child puts them)`);
            // the sentence stands on a page-shaped frame whose right edge comes just after its longer line: line 1
            { const fr = R(s), right = Math.max(...[...s.querySelectorAll('[data-lcs-twtext], [data-lcs-stop], [data-lcs-nbox], [data-lcs-arrowhead]')].map((e) => R(e).right)), w1 = all('[data-lcs-twtext]', ls[0]), w2 = all('[data-lcs-twtext]', ls[1]);
              if (cs(s).borderRightStyle !== 'solid' || parseFloat(cs(s).borderRightWidth) < 2 || fr.right - right < 4 || fr.right - right > 30) fails.push(`${tag}: the page frame does not end just after the longer line (${Math.round(fr.right - right)} px)`);
              if (R(w1[w1.length - 1]).right < R(w2[w2.length - 1]).right + 20) fails.push(`${tag}: line 1 is not the longer line, so it does not end at the edge of the page`); }
            const ar = all('[data-lcs-arrow]', s), sw = all('[data-lcs-sweep]', s), sh = all('[data-lcs-sweephead]', s);
            const arrowsWanted = lv === 1 || (lv === 2 && isKey);
            if (arrowsWanted) {
              if (ar.length !== 2 || sw.length !== 1 || all('[data-lcs-arrowhead]', s).length !== 2 || sh.length !== 1) fails.push(`${tag}: not an arrow under each line and a return sweep`);
              ar.forEach((a) => { const l = a.closest('[data-lcs-tline]'), w2 = all('[data-lcs-twtext]', l); const st2 = cs(a);
                if (Math.abs(R(a).left - R(w2[0]).left) > 6 || R(a).right < R(w2[w2.length - 1]).right - 16 || R(a).top < R(w2[0]).bottom - 4 || R(a).top > R(w2[0]).bottom + 26) fails.push(`${tag}: an arrow does not run under its line from the first word to the last`);
                if (isKey ? st2.borderTopStyle !== 'solid' || st2.borderTopColor !== TEAL : st2.borderTopStyle !== 'dashed' || st2.borderTopColor !== 'rgb(200, 191, 174)') fails.push(`${tag}: an arrow is not ${isKey ? 'teal on the key' : 'grey and dashed to trace'}`); });
              if (sw[0]) { const r = R(sw[0]), a = R(ls[0]), c = R(ls[1]); if (r.top < a.bottom || r.bottom > c.top + 4 || Math.abs(r.left - a.left) > 12 || Math.abs(r.right - a.right) > 14) fails.push(`${tag}: the return sweep does not run from the end of the first line to the start of the second`); }
              // its head is a solid triangle like the heads of the arrows, at the start of line 2
              if (sh[0]) { const h = sh[0], q = cs(h), hr = R(h), c = R(ls[1]), a = R(ls[0]), col = isKey ? TEAL : 'rgb(200, 191, 174)';
                if (q.borderRightStyle !== 'solid' || q.borderRightColor !== col || parseFloat(q.borderRightWidth) < 12 || q.borderTopColor !== 'rgba(0, 0, 0, 0)' || q.borderBottomColor !== 'rgba(0, 0, 0, 0)') fails.push(`${tag}: the return sweep has no solid head`);
                if (hr.left > c.left + 4 || hr.right < c.left || hr.top < a.bottom || hr.bottom > c.top + 6) fails.push(`${tag}: the head of the return sweep does not point to the start of line 2`); }
            } else if (ar.length || sw.length || sh.length) fails.push(`${tag}: arrows are printed where the child draws them`);
            const bx = all('[data-lcs-nbox]', s);
            if (lv === 3) {
              if (bx.length !== want.length) fails.push(`${tag}: not a box under every word`);
              bx.forEach((b2, i) => { const w = b2.closest('[data-lcs-tw]'), wt = one('[data-lcs-twtext]', w), wi = inkOf(wt);
                // under the printed word: centred on its letters, not on the box around them
                if (+w.dataset.lcsTw !== i || !wi || R(b2).top < R(wt).bottom - 0.5 || Math.abs((R(b2).left + R(b2).right) / 2 - (wi.left + wi.right) / 2) > 3) fails.push(`${tag}: box ${i + 1} is not under its word`);
                if (i && bx[i - 1].closest('[data-lcs-tline]') === b2.closest('[data-lcs-tline]') && R(b2).left < R(bx[i - 1]).right + 6) fails.push(`${tag}: box ${i + 1} touches the box before it`);
                if (isKey ? txt(b2) !== String(i + 1) : txt(b2)) fails.push(`${tag}: box ${i + 1} is wrong on the key or filled on the page of the child`); });
              // even spacing: every gap a reader sees between two words of the sentence (letter to letter) is the same, give
              // or take the side room of the letters (6 px)
              const gaps = [ls[0], ls[1]].flatMap((l) => { const w2 = all('[data-lcs-twtext]', l).map(inkOf); return w2.slice(1).map((w, i) => (w && w2[i] ? w.left - w2[i].right : -99)); });
              if (Math.max(...gaps) - Math.min(...gaps) > 6) fails.push(`${tag}: the words are not evenly spaced (${gaps.map(Math.round).join(', ')} px)`);
            } else if (bx.length) fails.push(`${tag}: boxes on a level without numbering`);
          });
        }

        // ---------------------------------------------------------------- K-668 lines and pages in order
        if (mode === 'pages') {
          const known = (ln) => INFO.frames.some((f) => Object.values(INFO.sets).some((ns) => ns.some((n) => f.replace('{n}', n) === ln)));
          const dotCheck = (scope, tag) => { const kd = all('[data-lcs-keydot]', scope);
            if (isKey) { const f = kd.find((x) => x.dataset.lcsKeydot === 'first'), l = kd.find((x) => x.dataset.lcsKeydot === 'last');
              if (kd.length !== 2 || !f || !l || cs(f).backgroundColor !== GREEN || cs(l).backgroundColor !== RED) fails.push(`${tag}: the key does not put a green dot and a red dot`);
              return [f && f.parentElement, l && l.parentElement]; } return []; };
          if (lv === 1) {
            const pages = all('[data-lcs-bpage]');
            if (pages.length !== 2) fails.push(`${pages.length} pages, not 2`);
            pages.forEach((pg, k) => { const tag = `page ${k + 1}`, pl = all('[data-lcs-pline]', pg);
              if (pl.length !== 3) { fails.push(`${tag} has ${pl.length} lines`); return; }
              pl.forEach((l, j) => { const b = one('[data-lcs-lbox]', l), t = one('[data-lcs-ptext]', l), im = one('img', l);
                if (!known(l.dataset.lcsText) || txt(t) !== l.dataset.lcsText) fails.push(`${tag}: line ${j + 1} is no line of a pattern book`);
                if (!b || R(b).right > R(t).left || !im || R(im).left < R(t).right) fails.push(`${tag}: line ${j + 1} is not its box, its words and its picture`);
                if (im && !wordsOf(l.dataset.lcsText).includes(im.dataset.lcsPic)) fails.push(`${tag}: the picture of line ${j + 1} is not the thing it names`);
                if (j && R(l).top < R(pl[j - 1]).bottom) fails.push(`${tag}: the lines do not stand one below the other`);
                if (isKey ? txt(b) !== String(j + 1) : txt(b)) fails.push(`${tag}: box ${j + 1} is wrong on the key or filled`);
                if (fs(t) < S.BIG - 6) fails.push(`${tag}: a line is printed smaller than ${S.BIG - 6} px`); });
              const [f, l] = dotCheck(pg, tag);
              if (isKey && (f !== one('[data-lcs-pw="first"]', pl[0]) || l !== one('[data-lcs-pw="last"]', pl[2]))) fails.push(`${tag}: the key's dots are not on the first and the last word`); });
          }
          if (lv === 2) {
            const sp = all('[data-lcs-spread]'), pg = all('[data-lcs-spage]');
            if (sp.length !== 2 || pg.length !== 4) fails.push('not two open spreads of two pages');
            if (sp.length === 2 && R(sp[1]).top < R(sp[0]).bottom) fails.push('the second spread does not stand under the first');
            // a small curved arrow between the two spreads: turn the page
            { const tn = all('[data-lcs-turn]'); if (sp.length === 2 && (tn.length !== 1 || R(tn[0]).top < R(sp[0]).bottom - 0.5 || R(tn[0]).bottom > R(sp[1]).top + 0.5 || tn[0].querySelectorAll('svg path').length < 2)) fails.push('no turn-the-page arrow between the two spreads'); }
            pg.forEach((p, j) => { const n = j + 1, c = one('[data-lcs-pnum]', p), t = one('[data-lcs-ptext]', p), im = one('img', p), left = j % 2 === 0;
              if (+p.dataset.lcsSpage !== n || p.dataset.lcsSide !== (left ? 'left' : 'right') || p.closest('[data-lcs-spread]') !== sp[Math.floor(j / 2)]) fails.push(`page ${n} is not in its place`);
              if (!known(p.dataset.lcsText) || txt(t) !== p.dataset.lcsText || !im || !wordsOf(p.dataset.lcsText).includes(im.dataset.lcsPic)) fails.push(`page ${n} is no page of a pattern book with its picture`);
              if (!c || cs(c).borderRadius !== '50%' || (left ? R(c).left - R(p).left > 24 : R(p).right - R(c).right > 24) || R(p).bottom - R(c).bottom > 24) fails.push(`page ${n}: no circle at the outer foot of the page`);
              if (c && (isKey ? txt(c) !== String(n) : txt(c))) fails.push(`page ${n}: the circle is wrong on the key or filled`); });
            if (pg.length === 4 && new Set(pg.map((p) => p.dataset.lcsText.replace(/ \w+\.$/, ''))).size !== 1) fails.push('the pages of the book do not share one frame');
            const [f, l] = dotCheck(root, 'the book');
            if (isKey && pg.length === 4 && (f !== one('[data-lcs-pw="first"]', pg[0]) || l !== one('[data-lcs-pw="last"]', pg[3]))) fails.push('the key’s dots are not on the first word of page 1 and the last word of page 4');
          }
          if (lv === 3) {
            const sp = all('[data-lcs-spread]');
            if (sp.length !== 2) fails.push(`${sp.length} spreads, not 2`);
            if (!sp.some((s) => s.dataset.lcsTrap === '1')) fails.push('no spread whose right page has its lines higher than the left page');
            sp.forEach((s, k) => { const tag = `book ${k + 1}`, L2 = one('[data-lcs-spage="left"]', s), R2 = one('[data-lcs-spage="right"]', s);
              const pl = all('[data-lcs-pline]', s);
              if (!L2 || !R2 || pl.length !== 4 || all('[data-lcs-pline]', L2).length !== 2 || all('[data-lcs-pline]', R2).length !== 2) { fails.push(`${tag}: not two lines on each page`); return; }
              const lt = R(all('[data-lcs-pline]', L2)[0]).top, rt = R(all('[data-lcs-pline]', R2)[0]).top;
              if (s.dataset.lcsTrap === '1' ? rt >= lt - 20 : rt <= lt + 20) fails.push(`${tag}: the lines of the right page do not stand ${s.dataset.lcsTrap === '1' ? 'higher' : 'lower'} than the left page's (as marked)`);
              pl.forEach((l, j) => { const b = one('[data-lcs-lbox]', l), t = one('[data-lcs-ptext]', l);
                if (!known(l.dataset.lcsText) || txt(t) !== l.dataset.lcsText) fails.push(`${tag}: line ${j + 1} is no line of a pattern book`);
                if (!b || R(b).right > R(t).left) fails.push(`${tag}: line ${j + 1} has no box before it`);
                if (isKey ? txt(b) !== String(j + 1) : txt(b)) fails.push(`${tag}: box ${j + 1} is wrong on the key or filled`);
                if (!inside(t, l.closest('[data-lcs-spage]'))) fails.push(`${tag}: line ${j + 1} leaves its page`); });
              const pics = all('img', s).map((im) => im.dataset.lcsPic), named = pl.map((l) => l.dataset.lcsText).flatMap(wordsOf);
              if (pics.length !== 4 || pics.some((p) => !named.includes(p))) fails.push(`${tag}: the pictures are not the four things the lines name`); });
          }
        }

        // ---------------------------------------------------------------- K-669 one dot for each word
        if (mode === 'dots') {
          const rows = all('[data-lcs-lookrow]');
          if (rows.length !== H.rows) fails.push(`${rows.length} rows to circle the word in, not ${H.rows}`);
          const at = [];
          rows.forEach((rw, r) => { const it = all('[data-lcs-lslot]', rw).map((s) => one('[data-lcs-look]', s)), k = it.map((e) => e && e.dataset.lcsLook);
            const want = H.items === 3 ? ['letter', 'scribble', 'word'] : ['letter', 'number', 'scribble', 'word'];
            if (k.slice().sort().join() !== want.join()) { fails.push(`row ${r + 1} is not ${want.join(', ')}`); return; }
            const w = it.find((e) => e.dataset.lcsLook === 'word'), l = it.find((e) => e.dataset.lcsLook === 'letter'), n = it.find((e) => e.dataset.lcsLook === 'number');
            if (!INFO.lookWords.includes(txt(w)) || (lv === 3 && txt(w).length > 3)) fails.push(`row ${r + 1}: "${txt(w)}" is no word of the list${lv === 3 ? ' of three letters' : ''}`);
            if (!INFO.lookLetters.includes(txt(l)) || txt(l) === txt(w)[0]) fails.push(`row ${r + 1}: "${txt(l)}" is no single letter, or the first letter of the word`);
            if (n && !INFO.lookNumbers.includes(txt(n))) fails.push(`row ${r + 1}: "${txt(n)}" is no single digit`);
            // a digit a child can take for a letter of its row never stands in it (g 9, s 5, o 0, l 1)
            if (n && S.CONFUSABLE.some(([cl, cg]) => txt(n) === cg && (txt(l) === cl || txt(w).includes(cl)))) fails.push(`row ${r + 1}: the digit ${txt(n)} stands beside a letter it looks like`);
            // the scribble is one of the drawn ones (a wave, a zigzag, a spiral, a tight wave: nothing read as a letter)
            const sc = one('[data-lcs-scribble] path', rw);
            if (!sc || !S.SCRIBBLES.includes(sc.getAttribute('d'))) fails.push(`row ${r + 1}: no scribble, or one that is not of the list`);
            at.push(k.indexOf('word'));
            const rg = all('[data-lcs-ring]', rw); if (isKey && (rg.length !== 1 || rg[0].parentElement !== w)) fails.push(`row ${r + 1}: the key does not circle the word`); });
          if (at.length === H.rows && !placesOk(at, H.items)) fails.push('the words stand in a pattern: ' + at.join(''));
          const ss = all('[data-lcs-dsent]');
          if (ss.length !== H.n) fails.push(`${ss.length} sentences, not ${H.n}`);
          ss.forEach((s, k) => { const tag = `sentence ${k + 1}`, src = s.dataset.lcsText, list = (INFO.dots[lv] || []).find((x) => x[0] === src);
            if (!list) { fails.push(`${tag} is no sentence of level ${lv}`); return; }
            const ws = all('[data-lcs-dw]', s), tw = ws.map((w) => txt(one('[data-lcs-dwtext]', w)));
            if (tw.join(' ') !== src || ws.length < H.words[0] || ws.length > H.words[1]) fails.push(`${tag} is not printed word by word (${ws.length} words)`);
            const sy = wordsOf(src).map((w) => INFO.syl[w] || 0), be = sy.reduce((a, x) => a + x, 0);
            if (lv === 1 ? be !== ws.length : be <= ws.length || sy[sy.length - 1] !== 1) fails.push(`${tag}: the beats and the words are not as the level wants (${be} beats, ${ws.length} words)`);
            if (lv === 2 && !sy.some((x) => x === 2)) fails.push(`${tag}: no word of two syllables`);
            if (lv === 3 && !sy.some((x) => x >= 3)) fails.push(`${tag}: no word of three syllables or more`);
            ws.forEach((w, i) => { const t = one('[data-lcs-dwtext]', w); if (fs(t) < S.BIG) fails.push(`${tag}: a word is printed smaller than ${S.BIG} px`); if (i && R(t).left < R(one('[data-lcs-dwtext]', ws[i - 1])).right + 8) fails.push(`${tag}: two words stand too close`);
              const kd = all('[data-lcs-keydot]', w);
              if (isKey) { if (kd.length !== 1 || R(kd[0]).top < R(t).bottom - 1 || Math.abs((R(kd[0]).left + R(kd[0]).right) / 2 - (R(t).left + R(t).right) / 2) > 2) fails.push(`${tag}: the key has no dot under word ${i + 1}`); } });
            const im = one('img', s); if (!im || im.dataset.lcsPic !== list[1]) fails.push(`${tag}: its picture is not the thing it names`); });
        }

        // ---------------------------------------------------------------- K-670 match the word you hear
        if (mode === 'match') {
          if (lv < 3) {
            const rows = all('[data-lcs-mrow]');
            if (rows.length !== H.rows) fails.push(`${rows.length} rows, not ${H.rows}`);
            const at = [], cls = []; let longest = 0;
            const letters = rows.map((r) => r.dataset.lcsLetter);
            if (new Set(letters).size !== letters.length) fails.push('two rows start with one letter');
            rows.forEach((rw, r) => { const tag = `row ${r + 1}`, ch = rw.dataset.lcsLetter, im = one('img', rw), op = all('[data-lcs-opt]', rw), ok = op.filter((o) => o.dataset.lcsOk);
              const L = INFO.lengths[ch];
              if (!L || !im || ok.length !== 1 || op.length !== H.opts) { fails.push(`${tag}: not a picture and ${H.opts} words with one right`); return; }
              const target = im.dataset.lcsPic, clsOf = (w) => ['S', 'M', 'L'].find((c) => (L[c] || []).includes(w));
              if (txt(ok[0]) !== target || !INFO.lengthPics.includes(target)) fails.push(`${tag}: the right word is not the name of the picture`);
              const cs2 = op.map((o) => clsOf(txt(o)));
              if (cs2.some((c) => !c) || new Set(cs2).size !== op.length) fails.push(`${tag}: the words are not of different lengths`);
              if (op.some((o) => txt(o)[0] !== ch)) fails.push(`${tag}: a word does not start with ${ch}`);
              if (H.opts === 2 && cs2.includes('M')) fails.push(`${tag}: level 1 sets a short word against a long one`);
              const sy = op.map((o) => INFO.lengthSyl[txt(o)] || 0), ln = op.map((o) => txt(o).length);
              op.forEach((o, i) => op.forEach((q, j) => { if (i !== j && ((sy[i] > sy[j]) !== (ln[i] > ln[j]))) fails.push(`${tag}: "${txt(o)}" takes longer to say than "${txt(q)}" but is not longer`); }));
              // a child who cannot read sees the lengths: two neighbouring lengths of the row differ by RATIO in printed width
              // and by LETTERS letters (measured on the page)
              const byCls = ['S', 'M', 'L'].map((c) => op.find((o) => clsOf(txt(o)) === c)).filter(Boolean);
              byCls.forEach((o, i) => { if (!i) return; const a = byCls[i - 1], ia = inkOf(a), io = inkOf(o), pair = clsOf(txt(a)) + clsOf(txt(o));
                if (!ia || !io || io.width / ia.width < S.RATIO || txt(o).length - txt(a).length < S.LETTERS[pair]) fails.push(`${tag}: "${txt(a)}" and "${txt(o)}" look alike in length (${ia && io ? (io.width / ia.width).toFixed(2) : '?'} times, ${txt(o).length - txt(a).length} letters)`); });
              if (S.NEVER_ROW.some(([x, y]) => op.some((o) => txt(o) === x) && op.some((o) => txt(o) === y))) fails.push(`${tag}: two words that print almost alike share the row`);
              const slots = all('[data-lcs-slot]', rw); at.push(slots.findIndex((sl) => sl.contains(ok[0])));
              cls.push(clsOf(target));
              if (op.every((o) => o === ok[0] || txt(o).length < target.length)) longest++;
              op.forEach((o) => { if (o !== ok[0] && rows.some((r2) => one('img', r2) && one('img', r2).dataset.lcsPic === txt(o))) fails.push(`${tag}: "${txt(o)}" names a picture of the page`); });
              const rg = all('[data-lcs-ring]', rw); if (isKey && (rg.length !== 1 || rg[0].parentElement !== ok[0])) fails.push(`${tag}: the key does not circle the right word`); });
            if (at.length === H.rows && !placesOk(at, H.opts)) fails.push('the right words stand in a pattern: ' + at.join(''));
            if (longest > Math.floor(H.rows / 2)) fails.push(`the right word is the longest in ${longest} rows (at most ${Math.floor(H.rows / 2)}): length gives the answer`);
            if (lv === 1 && cls.filter((c) => c === 'S').length !== H.rows / 2) fails.push('level 1: the right word is not short in half of the rows');
            if (lv === 2 && ['S', 'M', 'L'].some((c) => !cls.includes(c))) fails.push('level 2: not every length is right at least once');
            if (/(.)\1\1/.test(cls.join(''))) fails.push('three right words of one length in a row');
          } else {
            const it = all('[data-lcs-pitem]');
            if (it.length !== H.items) fails.push(`${it.length} pictures, not ${H.items}`);
            const read = [], readLong = [];
            it.forEach((x, k) => { const tag = `picture ${k + 1}`, im = one('img', x), ps = all('[data-lcs-psent]', x), ok = ps.filter((p) => p.dataset.lcsOk);
              const pr = im && INFO.pairs.find((p) => p[0] === im.dataset.lcsPic);
              if (!pr || ps.length !== 2 || ok.length !== 1) { fails.push(`${tag}: not a picture of the bank with two sentences, one read`); return; }
              const t = ps.map(txt);
              if (t.slice().sort().join('|') !== [pr[1], pr[2]].sort().join('|')) fails.push(`${tag}: the sentences are not the picture's two sentences`);
              if (R(ps[1]).top < R(ps[0]).bottom) fails.push(`${tag}: the sentences are not one above the other`);
              ps.forEach((p) => { if (+p.dataset.lcsLong !== (txt(p) === pr[2] ? 1 : 0)) fails.push(`${tag}: a sentence is marked long or short wrongly`); });
              read.push(ps.indexOf(ok[0])); readLong.push(+ok[0].dataset.lcsLong);
              const rg = all('[data-lcs-ring]', x); if (isKey && (rg.length !== 1 || rg[0].parentElement !== ok[0])) fails.push(`${tag}: the key does not circle the sentence the teacher reads`); });
            if (read.length === H.items && !placesOk(read, 2)) fails.push('the sentences to read stand in a pattern: ' + read.join(''));
            if (readLong.length === H.items && readLong.filter(Boolean).length !== H.items / 2) fails.push(`the teacher reads ${readLong.filter(Boolean).length} long sentences of ${H.items} (half wanted)`);
            // the teacher strip prints, numbered, the sentence to read for each picture
            const items = all('[data-lcs-tstripitem]'), said = it.map((x) => { const ok = one('[data-lcs-psent][data-lcs-ok]', x); return ok ? txt(ok) : ''; });
            if (items.length !== H.items || items.some((e, i) => txt(e) !== `${i + 1} ${said[i]}` || +e.dataset.lcsTstripitem !== i + 1)) fails.push('the teacher strip does not print the sentence to read for each picture, numbered');
          }
        }

        // ---------------------------------------------------------------- K-671 count the words
        if (mode === 'count') {
          const it = all('[data-lcs-citem]');
          if (it.length !== H.n) fails.push(`${it.length} sentences, not ${H.n}`);
          const ns = [];
          it.forEach((x, k) => { const tag = `sentence ${k + 1}`, src = x.dataset.lcsText, list = (INFO.count[lv] || []).find((y) => y[0] === src);
            if (!list) { fails.push(`${tag} is no sentence of level ${lv}`); return; }
            const ws = all('[data-lcs-cw]', x), sp = all('[data-lcs-space]', x), n = toks(src).length;
            ns.push(n);
            if (ws.map(txt).join(' ') !== src || +x.dataset.lcsN !== n || n < H.words[0] || n > H.words[1]) fails.push(`${tag} is not printed word by word, or has ${n} words`);
            if (sp.length !== n - 1) fails.push(`${tag}: ${sp.length} spaces for ${n} words`);
            sp.forEach((s2, i) => { if (!ws[i] || !ws[i + 1] || R(s2).left < R(ws[i]).right - 0.5 || R(s2).right > R(ws[i + 1]).left + 0.5 || R(ws[i + 1]).left - R(ws[i]).right < 30) fails.push(`${tag}: space ${i + 1} is not a clear space between two words`);
              const dotted = cs(s2).borderTopStyle === 'dotted';
              if (lv === 1 ? !dotted : dotted) fails.push(`${tag}: the spaces are ${lv === 1 ? 'not ' : ''}marked with a dotted box`);
              const kl = all('[data-lcs-spaceline]', s2); if (isKey && (kl.length !== 1 || !inside(kl[0], s2))) fails.push(`${tag}: the key has no line in space ${i + 1}`); });
            ws.forEach((w) => { if (fs(w) < S.BIG) fails.push(`${tag}: a word is printed smaller than ${S.BIG} px`); if (Math.abs(R(w).top - R(ws[0]).top) > 1) fails.push(`${tag}: the sentence runs over two lines`); });
            const sy = wordsOf(src).map((w) => INFO.syl[w] || 0), be = sy.reduce((a, z) => a + z, 0);
            if (lv === 1 ? be !== n : be === n) fails.push(`${tag}: ${be} beats for ${n} words`);
            const im = one('img', x); if (!im || im.dataset.lcsPic !== list[1]) fails.push(`${tag}: its picture is not the bank's`);
            if (lv === 1) { const ch = all('[data-lcs-chip]', x); if (ch.map((c) => txt(c)).join() !== '2,3,4' || ch.filter((c) => c.dataset.lcsOk).length !== 1 || txt(ch.find((c) => c.dataset.lcsOk)) !== String(n)) fails.push(`${tag}: the numbers to circle are not 2, 3, 4 with ${n} right`);
              const rg = all('[data-lcs-ring]', x); if (isKey && (rg.length !== 1 || !rg[0].parentElement.dataset.lcsOk)) fails.push(`${tag}: the key does not circle the number`); }
            else { const b = all('[data-lcs-nbox]', x); if (b.length !== 1 || (isKey ? txt(b[0]) !== String(n) : txt(b[0]))) fails.push(`${tag}: the box for the number is missing, wrong on the key, or filled`); } });
          if (ns.length === H.n) { const s = ns.join(''); if (new Set(ns).size < 2 || /(.)\1\1/.test(s) || ns.every((v, i) => !i || v >= ns[i - 1]) || ns.every((v, i) => !i || v <= ns[i - 1]) || blockRepeat(s)) fails.push('the word counts follow a pattern (a staircase, even with steps that stay, or a repeated block): ' + s); }
        }

        // ---------------------------------------------------------------- K-672 finger spaces
        if (mode === 'spaces') {
          const rows = all('[data-lcs-rrow]');
          if (rows.length !== H.read) fails.push(`${rows.length} rows to circle, not ${H.read}`);
          const at = [];
          rows.forEach((rw, r) => { const tag = `row ${r + 1}`, v = all('[data-lcs-ver]', rw);
            if (v.length !== 2) { fails.push(`${tag}: not two sentences`); return; }
            const sp = v.find((x) => x.dataset.lcsVer === 'spaced'), jo = v.find((x) => x.dataset.lcsVer === 'joined');
            if (!sp || !jo || !sp.dataset.lcsOk || jo.dataset.lcsOk) { fails.push(`${tag}: the spaced sentence is not the right one`); return; }
            const words = all('[data-lcs-sw]', sp).map(txt);
            if (!INFO.spaces.read.includes(words.join(' ')) || txt(jo) !== words.join('') || /\s/.test(txt(jo))) fails.push(`${tag}: the two are not one sentence with and without spaces`);
            all('[data-lcs-sw]', sp).forEach((w, i, a) => { if (i && R(w).left - R(a[i - 1]).right < 10) fails.push(`${tag}: the spaces are not wide`); });
            if (fs(sp) < S.BIG || fs(jo) < S.BIG) fails.push(`${tag}: printed smaller than ${S.BIG} px`);
            at.push(v.indexOf(sp));
            const rg = all('[data-lcs-ring]', rw); if (isKey && (rg.length !== 1 || rg[0].parentElement !== sp)) fails.push(`${tag}: the key does not circle the spaced sentence`); });
          if (at.length >= 4 && !placesOk(at, 2)) fails.push('the spaced sentences stand in a pattern: ' + at.join(''));
          if (at.length === 2 && at[0] === at[1]) fails.push('both spaced sentences stand on one side');
          const cp = one('[data-lcs-copymodel]'), cr = one('[data-lcs-copyrow] [data-lcs-line]');
          if (H.copy) { const s = cp ? all('[data-lcs-sw]', cp).map(txt).join(' ') : '';
            if (!cp || !INFO.spaces.copy.includes(s) || !cr || R(cr.querySelector('svg')).width < 600 || (isKey ? cr.dataset.lcsAnswer !== s : !!cr.dataset.lcsAnswer)) fails.push('no sentence to copy on a Kindergarten row the width of the page');
            if (isKey && cr) { const tx = cr.querySelector('svg text'); if (!tx || tx.getAttribute('textLength') || tx.getBBox().width > R(cr.querySelector('svg')).width - 15) fails.push('the key’s sentence does not fit its row');
              // the key writes the sentence with finger spaces: FINGER px or more between two words
              const kw = cr ? [...cr.querySelectorAll('[data-lcs-kw]')] : []; if (kw.length !== toks(s).length || kw.map(txt).join(' ') !== s || kw.some((k2, i) => i && R(k2).left - R(kw[i - 1]).right < S.FINGER - 0.5)) fails.push('the key does not write the sentence with a finger space (' + S.FINGER + ' px) between the words'); } }
          else if (cp) fails.push('a sentence to copy on a level without one');
          const md = one('[data-lcs-model]'), strip = one('[data-lcs-strip]');
          if (H.cards) {
            const s = md ? all('[data-lcs-sw]', md).map(txt).join(' ') : '', tk = toks(s);
            const list = INFO.spaces['cards' + lv] || [];
            if (!md || !list.includes(s) || tk.length < H.cards[0] || tk.length > H.cards[1]) fails.push('no model sentence of the bank to glue');
            if (rows.some((rw) => all('[data-lcs-sw]', rw.querySelector('[data-lcs-ver="spaced"]') || rw).map(txt).join(' ') === s) || (cp && all('[data-lcs-sw]', cp).map(txt).join(' ') === s)) fails.push('the sentence to glue stands twice on the page');
            if (cards.map((c) => c.dataset.lcsCard).slice().sort().join('|') !== tk.slice().sort().join('|') || cards.some((c) => txt(c) !== c.dataset.lcsCard)) fails.push('the cards are not the words of the model sentence');
            const ord = cards.map((c) => +c.dataset.lcsCardi), id = tk.map((_, i) => i);
            if (ord.join() === id.join() || ord.join() === id.slice().reverse().join() || ord[0] === 0) fails.push('the cards stand in the order of the sentence, its reverse, or with its first word first');
            if (!strip) fails.push('no strip to glue the sentence on');
            else { const r = R(strip), bw = r.width - 2 * parseFloat(cs(strip).borderLeftWidth), bh = r.height - 2 * parseFloat(cs(strip).borderTopWidth);
              // the cards in the order of the sentence fit the strip in one row, or two, with FINGER px between two cards, between
              // the rows and to every edge (measured with the real card sizes)
              const wsz = cards.slice().sort((a, c) => +a.dataset.lcsCardi - +c.dataset.lcsCardi).map((c) => R(c).width), ch = Math.max(...cards.map((c) => R(c).height));
              const rowW = (a, z) => wsz.slice(a, z).reduce((x, y) => x + y, 0) + (z - a + 1) * S.FINGER;
              let fit = rowW(0, wsz.length) <= bw + 0.5 && ch + 2 * S.FINGER <= bh + 0.5;
              for (let k2 = 1; k2 < wsz.length && !fit; k2++) if (Math.max(rowW(0, k2), rowW(k2, wsz.length)) <= bw + 0.5 && 2 * ch + 3 * S.FINGER <= bh + 0.5) fit = true;
              if (!fit) fails.push(`the glue strip (${Math.round(bw)} x ${Math.round(bh)}) cannot hold its cards with ${S.FINGER} px between two cards and to every edge`);
              const kw = all('[data-lcs-keyword]', strip).map((e) => e.dataset.lcsKeyword);
              if (isKey ? kw.join(' ') !== s : kw.length) fails.push('the glue strip is wrong on the key or filled on the page of the child'); }
          } else if (md || strip || cards.length) fails.push('a sentence to glue on a level without one');
        }
        return fails;
      }, SPEC, INFO);
    },
  };
}

module.exports = { makePrintConceptsKType, pckFaultsOf, drawPage, LEVELS, INSTR, LINES, LEGEND, CARD, SPEC, MODES, placesOk, countsOk, famousLike, emOf };
