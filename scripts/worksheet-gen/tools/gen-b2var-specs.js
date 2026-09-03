/**
 * gen-b2var-specs.js — nt20-B-VAR: emits the thin variation spec modules for the
 * second batch of 20 printable types (nt20-B, shipped 2026-09-02).
 *
 * Each emitted file spreads its base spec and overrides {id, slug, difficulty,
 * i18n} only — the same shape as the 113 shipped nt20-VAR files, none of which
 * overrides `build`. That is what makes a PARAM face near-zero-risk.
 *
 * Difficulty is emitted as `{...base.difficulty[SRC], ...overrides}` rather than
 * a JSON literal, for two reasons: it keeps the diff to the keys that actually
 * change, and it carries FUNCTION-valued params through untouched (G1-243's
 * `exclude` is a function, which a JSON literal would silently stringify).
 * All three levels get the same object, per the VAR convention: the waves ship
 * d2 only, so a face must render identically whichever level is asked for.
 *
 * This file emits the PARAM faces only. The CODE faces — those needing an
 * additive knob on a base `build` plus a `verify` branch — are hand-written.
 *
 * Idempotent: re-running overwrites exactly its own files.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction
const ROWS = [
  // ---------------- K-284 word-tracing ----------------
  ['k', 'K-289', 'word-tracing-first-words', 'K-284-word-tracing.js', 1, {},
    'Trace Your First Words', 'Trace the dashed word, then write it on the empty line.'],
  ['k', 'K-290', 'word-tracing-trace-and-write-twice', 'K-284-word-tracing.js', 3, {},
    'Trace Once, Write It Twice', 'Trace the word once, then write it twice on your own.'],
  // cardW widened to 210 and maxLetters pulled back to 12: the caption under the
  // picture does not shrink to fit, so at the base's cardW 150 a 10+ letter word
  // ("skateboard", "dinosaur") rendered outside its own card. Caught by reading
  // the render - nothing in the gate suite measures caption containment.
  ['k', 'K-291', 'word-tracing-long-words', 'K-284-word-tracing.js', 3, { rows: 3, minLetters: 8, maxLetters: 12, glyphH: 42, laneH: 54, pic: 104, cardW: 210, rowH: 218 },
    'Trace the Longer Words', 'These words are long. Trace each one, then write it yourself.'],

  // ---------------- K-285 dot-to-dot ----------------
  ['k', 'K-294', 'dot-to-dot-1-to-10', 'K-285-dot-to-dot.js', 1, {},
    'Dot-to-Dot 1 to 10', 'Start at the orange dot. Join the dots from 1 to 10 to finish the picture.'],
  ['k', 'K-295', 'dot-to-dot-teen-numbers', 'K-285-dot-to-dot.js', 1, { startAt: 11 },
    'Dot-to-Dot 11 to 20', 'Start at the orange dot. Join the dots from 11 to 20 to finish the picture.'],
  ['k', 'K-296', 'dot-to-dot-count-on-11-to-30', 'K-285-dot-to-dot.js', 3, {},
    'Dot-to-Dot: Count On from 11', 'Start at the orange dot. Count on from 11 to 30 to find the picture.'],

  // ---------------- K-286 grid-copy ----------------
  ['k', 'K-298', 'grid-copy-6x6', 'K-286-grid-copy.js', 1, {},
    'Copy the Grid Picture: First Steps', 'No letters or numbers here. Color the same squares on the empty grid.'],
  ['k', 'K-299', 'grid-copy-with-letters-and-numbers', 'K-286-grid-copy.js', 1, { labels: true },
    'Copy the Picture Using Letters and Numbers', 'Use the letter and number of each square to copy the picture.'],
  ['k', 'K-300', 'grid-copy-8x8', 'K-286-grid-copy.js', 3, {},
    'Copy the Picture on an 8x8 Grid', 'A bigger grid: find each square by its letter and number, then copy.'],

  // ---------------- K-287 singular-plural ----------------
  ['k', 'K-302', 'singular-plural-first-words', 'K-287-singular-plural.js', 1, {},
    'One and Many: First Words', 'One or many? Trace the word that names more than one.'],
  ['k', 'K-303', 'singular-plural-longer-words', 'K-287-singular-plural.js', 3, {},
    'One and Many: Longer Words', 'These words are longer. Trace the word that names many.'],

  // ---------------- K-288 articles ----------------
  ['k', 'K-306', 'articles-four-pictures', 'K-288-articles.js', 1, {},
    'Circle the Right Word: Four Pictures', 'Say each picture word, then circle the word that belongs with it.'],
  ['k', 'K-307', 'articles-eight-pictures', 'K-288-articles.js', 3, {},
    'Circle the Right Word: Eight Pictures', 'Eight pictures this time. Circle the word that belongs with each.'],

  // ---------------- G1-242 read-and-color ----------------
  ['g1', 'G1-251', 'read-and-color-four-sentences', 'G1-242-read-and-color.js', 1, {},
    'Read and Color: Four Sentences', 'Read each sentence, then color exactly what it asks for.'],
  ['g1', 'G1-252', 'read-and-color-busy-page', 'G1-242-read-and-color.js', 3, {},
    'Read and Color: A Busy Page', 'More pictures and more colors. Read each sentence carefully.'],

  // ---------------- G1-243 number-of-the-day ----------------
  ['g1', 'G1-255', 'number-of-the-day-teen-numbers', 'G1-243-number-of-the-day.js', 1, {},
    'Number of the Day: Teen Numbers', 'Look at the big number. Fill in every box on the page for that number.'],
  ['g1', 'G1-256', 'number-of-the-day-ten-more-ten-less', 'G1-243-number-of-the-day.js', 1, { frames: false, tenMore: true, line: { max: 30, tick: 1, label: 5 } },
    'Number of the Day: Ten More, Ten Less', 'Find ten more and ten less than the number of the day.'],
  // line.tick forced to 1. The base's d3 carries {max:100, tick:5} while N ranges
  // over 21..99 excluding multiples of 10, so 64 of the 79 possible numbers have
  // no tick to sit on and verify's "N has no tick" fires - a latent defect in a
  // level that has never shipped. Every unit ticked, every tenth tick labelled.
  ['g1', 'G1-257', 'number-of-the-day-to-99', 'G1-243-number-of-the-day.js', 3, { line: { max: 100, tick: 1, label: 10 } },
    'Number of the Day: Up to 99', 'Show a two-digit number in tens and ones, then fill every box.'],

  // ---------------- G1-244 write-the-word ----------------
  ['g1', 'G1-258', 'write-the-word-with-a-word-bank', 'G1-244-write-the-word.js', 1, {},
    'Write the Word: The First Letter Is Given', 'Use the word bank. The first letter is already on the line to start you off.'],
  ['g1', 'G1-259', 'write-the-word-word-bank-only', 'G1-244-write-the-word.js', 1, { cards: 8, rows: 4, starter: false, pic: 80, glyphH: 30, rulingW: 214, maxLetters: 12 },
    'Write the Word: Word Bank, No First Letter', 'Every word is in the bank. Write the right one by each picture.'],
  ['g1', 'G1-260', 'write-the-word-on-plain-lines', 'G1-244-write-the-word.js', 3, {},
    'Write the Word on Plain Lines', 'No word bank this time. Write each picture word on the lines.'],

  // ---------------- G1-245 alphabetical-order ----------------
  ['g1', 'G1-262', 'alphabetical-order-number-the-words', 'G1-245-alphabetical-order.js', 1, { rulings: false },
    'ABC Order: Number the Words', 'Number the four cards to put the words in ABC order.'],
  ['g1', 'G1-263', 'alphabetical-order-four-words', 'G1-245-alphabetical-order.js', 1, {},
    'ABC Order: Number Them, Then Write Them', 'Number the cards, then copy the words onto the lines in order.'],
  ['g1', 'G1-264', 'alphabetical-order-same-first-letter', 'G1-245-alphabetical-order.js', 3, {},
    'ABC Order: When Words Start the Same', 'Two pairs start with the same letter. Use the second letter to order them.'],

  // ---------------- G1-246 number-walls ----------------
  ['g1', 'G1-266', 'number-walls-to-10', 'G1-246-number-walls.js', 1, {},
    'Number Walls to 10', 'Each brick is the sum of the two bricks under it. Build every wall to the top.'],
  ['g1', 'G1-267', 'number-walls-four-courses', 'G1-246-number-walls.js', 3, { gap: false, walls: 4, courses: 4, baseMin: 1, baseMax: 3, topMax: 20 },
    'Number Walls: Build Every Row', 'Four rows and no gaps. Add each pair of bricks up to the top.'],
  ['g1', 'G1-268', 'number-walls-missing-brick', 'G1-246-number-walls.js', 3, {},
    'Number Walls: Find the Missing Brick', 'One bottom brick is missing. Find it, then build the whole wall.'],

  // ---------------- G1-247 doubles-halves ----------------
  ['g1', 'G1-270', 'doubles-and-halves-first-steps', 'G1-247-doubles-halves.js', 1, {},
    'Doubles and Halves: First Steps', 'Some cards ask you to double a group. Others ask you to halve one.'],
  ['g1', 'G1-271', 'doubles-and-halves-to-20', 'G1-247-doubles-halves.js', 3, {},
    'Doubles and Halves to 20', 'Numbers only this time. Work out each double and half up to 20.'],

  // ---------------- G1-248 number-lines ----------------
  ['g1', 'G1-274', 'number-line-to-10', 'G1-248-number-line-position.js', 1, {},
    'Where on the Number Line? 0 to 10', 'Write the number each arrow points to, from 0 to 10.'],
  ['g1', 'G1-275', 'number-line-to-20-fewer-labels', 'G1-248-number-line-position.js', 2, { label: 10 },
    'Number Line to 20: Fewer Labels', 'Only 0, 10 and 20 are printed. Count on to each arrow.'],
  ['g1', 'G1-276', 'number-line-to-30', 'G1-248-number-line-position.js', 2, { max: 30 },
    'Where on the Number Line? 0 to 30', 'Count on to 30. Write the number each arrow points to.'],
  ['g1', 'G1-277', 'number-line-to-50', 'G1-248-number-line-position.js', 2, { max: 50, label: 10 },
    'Where on the Number Line? 0 to 50', 'Count on to 50. Every tenth number is printed to help you.'],
  // 0-50 in steps of 5 leaves exactly 11 ticks. Labelling every 2nd tick leaves
  // only 5 unlabelled candidates (5,15,25,35,45) and pointers may not repeat a
  // value across the page - but verify also requires >=2 pointers per line, so
  // fewer pointers is not available. Labelling every 5th tick (0, 25, 50) lifts
  // the pool to 8 and lets 3 lines x 2 pointers fit with room to spare.
  ['g1', 'G1-278', 'number-line-to-50-counting-in-fives', 'G1-248-number-line-position.js', 2, { max: 50, tick: 5, label: 5, lines: 3, pointers: 2, gap: 2 },
    'Number Line to 50: Counting in Fives', 'Count on in fives from 0, 25 or 50 to reach each arrow.'],
  ['g1', 'G1-279', 'number-line-to-100-counting-in-fives', 'G1-248-number-line-position.js', 3, {},
    'Number Line to 100: Counting in Fives', 'Each tick is five, up to 100. Which number is each arrow on?'],
  ['g1', 'G1-280', 'number-line-to-100-counting-in-tens', 'G1-248-number-line-position.js', 3, { lines: 3, max: 100, tick: 10, label: 5, pointers: 2, gap: 2 },
    'Number Line to 100: Counting in Tens', 'Each tick is ten. Count on in tens to reach each arrow.'],
  ['g1', 'G1-281', 'number-line-to-120', 'G1-248-number-line-position.js', 3, { lines: 3, max: 120, tick: 10, label: 5, pointers: 2, gap: 2 },
    'Where on the Number Line? 0 to 120', 'This line goes past 100. Count on in tens to each arrow.'],

  // ---------------- G1-249 sentence-building ----------------
  ['g1', 'G1-282', 'unscramble-the-sentence-with-clues', 'G1-249-unscramble-sentence.js', 1, {},
    'Unscramble the Sentence: With Clues', 'The capital letter and the end mark show where a sentence begins and ends.'],
  // minTok/maxTok widened back to the d2 band on purpose: this face's axis is
  // CLUES (no capital, no end mark), not sentence length. At d3's 5-7 tokens the
  // frame pool is too thin to build - de has 3 qualifying frames and fi has 1,
  // which is why the base d3 has never been shippable in those locales.
  ['g1', 'G1-283', 'unscramble-the-sentence-no-clues', 'G1-249-unscramble-sentence.js', 3, { minTok: 4, maxTok: 6 },
    'Unscramble the Sentence: No Clues', 'No capital, no full stop. Find the one order that works.'],

  // ---------------- G2-274 capitals-punctuation ----------------
  // ends widened from the base d1's full-stop-only set. This face's axis is that
  // it carries NO NAMES (its checklist has two chips, not three), and the guard
  // in G2-274 now enforces that from the config. Restricting it to full stops as
  // well leaves too small a pool: measured, only en (5), de and fr (4) have four
  // name-free frames ending in a period - es and pt have 3, it/nl/sv/da/fi 2, no 1.
  // Allowing the question mark lifts every locale to at least 5, and three lanes
  // (one fewer than the base d1) leave the sampler room to find a set in it and
  // da, whose name-free pools are the smallest. It is the gentlest of the three
  // fix-the-sentence faces, which suits the entry step. needQ:1 guarantees at
  // least one question actually appears - with a mixed pool but no floor, a
  // three-lane page can draw three statements and the "right end mark" promise
  // is never exercised (the Italian panel's catch, the mirror of G2-294's).
  ['g2', 'G2-281', 'fix-the-sentence-capital-and-end-mark', 'G2-274-fix-the-sentence.js', 1, { ends: ['.', '?'], lanes: 3, needQ: 1 },
    'Fix the Sentence: Capital and End Mark', 'Rewrite each sentence with a capital letter and the right end mark.'],
  ['g2', 'G2-282', 'fix-the-sentence-choose-the-end-mark', 'G2-274-fix-the-sentence.js', 3, {},
    'Fix the Sentence: Choose the End Mark', 'Fix the capital letters and the names, and choose the right end mark.'],

  // ---------------- G2-275 word-classes ----------------
  ['g2', 'G2-285', 'word-classes-nine-words', 'G2-275-word-classes.js', 1, {},
    'Word Classes: Sort Nine Words', 'Each noun chip has a picture to help. Sort every word into a bin.'],
  ['g2', 'G2-286', 'word-classes-without-pictures', 'G2-275-word-classes.js', 2, { pics: false },
    'Word Classes: Sort Twelve Words', 'No pictures to help. Read each word and sort it into a bin.'],
  ['g2', 'G2-287', 'word-classes-fifteen-words', 'G2-275-word-classes.js', 3, {},
    'Word Classes: Sort Fifteen Words', 'Fifteen words and no pictures. Sort each one into its bin.'],

  // ---------------- G2-276 money ----------------
  // TWO cards, not three. Each card is drawn independently with rng.pick and
  // nothing dedupes, which is harmless while a page mixes kinds and stops being
  // harmless once a face pins every card to one kind: three cards drawn from five
  // items collide about half the time, and the English "How Much Change?" page
  // really did render cards 1 and 3 as the same problem. Raising the shelf to
  // eight items fixed the collision and then OVERFLOWED the page in Spanish and
  // Italian, whose currency words are long — so the shelf cannot grow. Searching
  // items<=6 across all ELEVEN locales, two cards is the only shape that is clean
  // everywhere; the taller card keeps the page from reading sparse. Each
  // card is drawn independently with rng.pick and nothing dedupes, which is
  // harmless while a page mixes kinds and stops being harmless once a face pins
  // every card to one kind: three cards drawn from five items collide about half
  // the time, and the English "How Much Change?" page really did render cards 1
  // and 3 as the same problem. These values are the first that
  // tools/scan-duplicate-problems.js reports CLEAN in all ELEVEN locales - the
  // frame banks differ per locale, so the rng stream does too, and a combination
  // clean in English can still collide in German.
  ['g2', 'G2-289', 'shopping-math-two-stories', 'G2-276-shopping-math.js', 1, {},
    'Shopping Math: Two Stories', 'Read each story and use the shelf prices to answer it.'],
  // Five shelf items, not the base d3's six. Six fit in English and OVERFLOW the
  // page box in Portuguese, whose currency sub-unit is spelled out in full
  // ("centavos" per the nt20 currency ruling) so every price tag is wide; the
  // shelf is a fixed 640px row, so shrinking the icon does not help — the tag
  // text is what overflows. Four question cards is this face's axis and is kept.
  // The base d3 has never shipped, so no long locale had ever built it.
  ['g2', 'G2-290', 'shopping-math-four-questions', 'G2-276-shopping-math.js', 3, { items: 5 },
    'Shopping Math: Four Questions', 'Four cards, four different shopping questions to answer.'],
  ['g2', 'G2-291', 'shopping-math-add-up-the-basket', 'G2-276-shopping-math.js', 2, { kinds: ['total', 'total', 'total'] },
    'Shopping Math: Add Up the Basket', 'Every card asks for a total. Add the prices together.'],
  ['g2', 'G2-292', 'shopping-math-three-things', 'G2-276-shopping-math.js', 2, { kinds: ['total3', 'total3', 'total3'] },
    'Shopping Math: Buying Three Things', 'Each basket holds three things. Add all three prices.'],
  ['g2', 'G2-293', 'shopping-math-how-much-change', 'G2-276-shopping-math.js', 2, { kinds: ['change', 'change'], cards: 2, items: 5, cardH: 240, dots: 100 },
    'Shopping Math: How Much Change?', 'Count the coins paid, then work out the change.'],
  ['g2', 'G2-294', 'shopping-math-is-there-enough-money', 'G2-276-shopping-math.js', 2, { kinds: ['canBuy', 'canBuy'], cards: 2, items: 5, cardH: 240, dots: 100 },
    'Shopping Math: Is There Enough Money?', 'Compare the money with the price. Circle yes or no, then write the total.'],
  ['g2', 'G2-295', 'shopping-math-how-much-more', 'G2-276-shopping-math.js', 2, { kinds: ['diff', 'diff', 'diff'] },
    'Shopping Math: How Much More?', 'Compare two prices and work out the difference between them.'],

  // ---------------- G2-277 calendar ----------------
  ['g2', 'G2-296', 'read-the-calendar-four-questions', 'G2-277-read-the-calendar.js', 1, {},
    'Read the Calendar: A First Look', 'Look at the month. Answer each question by reading the calendar.'],
  // FIVE questions, not the base d3's six. Six question cards overflow the page in
  // German and Norwegian, whose question wording is the longest of the eleven, and
  // the base d3 has never shipped so no long locale had ever built it. Shrinking
  // the calendar cells was the wrong lever — it is the CARDS that overflow, not
  // the grid. Five still separates this face from its two four-question siblings,
  // and it keeps the two question kinds unique to it (a week later, and how many
  // days after one sticker the other falls). sixRows is off for the same reason:
  // a six-week grid is taller and leaves Norwegian no room for its cards.
  ['g2', 'G2-297', 'read-the-calendar-a-busy-month', 'G2-277-read-the-calendar.js', 3, { questions: ['dayOfDate', 'countWeekday', 'stickerDate', 'weekLater', 'after'], sixRows: false, cellH: 50 },
    // cellH: 50, and the number is MEASURED rather than borrowed. Without it the
    // five question cards pushed content to 933 against a footer band starting
    // at 921 in en and pt — the two locales with the longest question text. Only
    // 12px, and invisible to the page-box lint, which measures the 945 page edge
    // and not the 921 footer; a native panel reading its own render found it.
    // ⚠ My first attempt copied the siblings' cellH: 72 on the assumption it was
    // a shrink. It is a GROWTH: G2-277.build defaults to
    // `d.cellH || (sixRows || rows === 6 ? 54 : 58)`, so this face was already
    // at 54 and 72 pushed it clean off the page in nine locales. Read the
    // default before overriding it.
    'Read the Calendar: A Busy Month', 'Find the date one week later, and count the days between the stickers.'],
  ['g2', 'G2-298', 'read-the-calendar-days-of-the-week', 'G2-277-read-the-calendar.js', 1, { questions: ['dayOfDate', 'countWeekday', 'firstDay', 'lastDay'], stickers: 2, cellH: 72 },
    'Read the Calendar: Days of the Week', 'Every question is about the days. Read down the columns.'],

  // ---------------- G2-278 picture-writing ----------------
  ['g2', 'G2-299', 'write-about-the-picture-what-you-see', 'G2-278-write-about-the-picture.js', 1, {},
    'Write About the Picture: What You See', 'Sentence starters help you begin. The word bank names everything.'],
  // rowH 58 -> 56. The base d3 config this face inherits overlaps the attribution
  // band in TEN of eleven locales (all but `no`) — six writing rows at 58px push
  // content to ~925 against a footer starting at 921. Only 4px, and invisible to
  // the page-box lint, which measures the 945 page edge. Six rows x 2px is triple
  // the margin needed. Fixed HERE rather than on the base, because the base wave
  // ships d2 and nothing else uses d3.
  ['g2', 'G2-300', 'write-about-the-picture-your-own-words', 'G2-278-write-about-the-picture.js', 3, { rowH: 56 },
    'Write About the Picture: Your Own Words', 'No sentence starters this time. Use the word bank and write your own story.'],

  // ---------------- G2-279 grid-coordinates ----------------
  ['g2', 'G2-302', 'grid-coordinates-6x6', 'G2-279-grid-coordinates.js', 1, {},
    'Grid Coordinates on a 6x6 Grid', 'Find each square by its letter and number. Color it to reveal the picture.'],
  ['g2', 'G2-303', 'grid-coordinates-10x10', 'G2-279-grid-coordinates.js', 3, {},
    'Grid Coordinates on a 10x10 Grid', 'A bigger grid with more squares. Work through the list carefully.'],

  // ---------------- G3-370 word-problems ----------------
  // Group-op faces carry a smaller icon and a lower product ceiling so the strip
  // the child rings into groups fits on ONE line. At the base size a 20-icon
  // strip wrapped into two visible rows under a story reading "20 koalas in rows
  // of 5", so the picture showed 2 rows while the answer was 4 - the apparatus
  // contradicted the question. Reported by the Swedish panel, reproduced in
  // English. (The story's "rows" wording on a strip is a separate frame-bank
  // issue in all 11 locales and is recorded, not fixed here.)
  ['g3', 'G3-371', 'multiplication-word-problems', 'G3-370-muldiv-word-problems.js', 1, {},
    'Multiplication Word Problems', 'The picture shows the equal groups. Write each answer in the box.'],
  ['g3', 'G3-372', 'division-word-problems-sharing', 'G3-370-muldiv-word-problems.js', 2, { ops: ['share', 'share'] },
    'Division Word Problems: Sharing', 'Each story shares things out. Deal them into the boxes.'],
  ['g3', 'G3-373', 'division-word-problems-grouping', 'G3-370-muldiv-word-problems.js', 2, { ops: ['group', 'group'], n1: [2, 4], n2: [2, 5], max: 20, icon: 16 },
    'Division Word Problems: Making Groups', 'Ring the equal groups in the picture, then write the answer.'],
  ['g3', 'G3-374', 'division-word-problems-two-ways', 'G3-370-muldiv-word-problems.js', 2, { ops: ['share', 'group'], n1: [2, 4], n2: [2, 5], max: 20, icon: 16 },
    'Division Word Problems: Two Ways', 'One story shares out, the other makes groups. Both are division.'],
  ['g3', 'G3-375', 'multiplication-and-grouping-word-problems', 'G3-370-muldiv-word-problems.js', 2, { ops: ['mul', 'group'], n1: [2, 4], n2: [2, 5], max: 20, icon: 16 },
    'Multiply and Group: Word Problems', 'One story builds groups, the other breaks them up.'],
  // Tightened from the base d3. Three stories on one page fits in English but
  // OVERFLOWS the page box in French, which runs longer — and the base d3 has
  // never shipped (the waves emit d2), so nothing had ever built it in a long
  // locale. Smaller icons, font and dot panel buy the room without dropping a
  // story, which is the whole point of the mixed face.
  ['g3', 'G3-376', 'multiplication-and-division-word-problems-mixed', 'G3-370-muldiv-word-problems.js', 3, { icon: 13, font: 14, dots: 20, slotH: 26 },
    'Multiplication and Division: Mixed Problems', 'Three stories. Decide what each one asks before you answer.'],

  // ── nt20-B-VAR wave 2 ────────────────────────────────────────────────────
  // Designed by a pedagogy panel that read every base module's build() AND
  // verify() plus the data files feeding them, and REFUSED 14 of the 38 slots
  // it was asked to fill (a size interpolation is not a face; an all-questions
  // capitals page cannot be built because pt/it have 2 question frames and fi
  // has 0; read-and-color has exactly one teaching move). Honest 93, not 100.

  // dot-to-dot: `step` is one line in K-285.build. dotFigure has always taken it
  // and verify has always checked labels AND strip chips against start + i*step.
  ['k',  'K-308', 'dot-to-dot-count-back-from-10', 'K-285-dot-to-dot.js', 1, { startAt: 10, step: -1 },
    'Dot-to-Dot: Count Back from 10', 'Ten numbered dots to join backwards; the rest of the outline is already drawn.'],
  ['g1', 'G1-285', 'dot-to-dot-count-by-twos', 'K-285-dot-to-dot.js', 1, { startAt: 2, step: 2 },
    'Dot-to-Dot: Count by Twos', 'Ten numbered dots counting in twos; the rest of the outline is already drawn.'],
  ['g1', 'G1-294', 'dot-to-dot-count-back-from-20', 'K-285-dot-to-dot.js', 1, { startAt: 20, step: -1, window: null },
    'Dot-to-Dot: Count Back from 20', 'Every dot is numbered here, and the whole way is backwards.'],
  ['g2', 'G2-304', 'dot-to-dot-count-by-fives', 'K-285-dot-to-dot.js', 1, { startAt: 5, step: 5 },
    'Dot-to-Dot: Count by Fives', 'Ten numbered dots counting in fives; the rest of the outline is already drawn.'],

  // word-tracing: traceLane:false drops the dashed lane from the caption variant.
  ['k',  'K-311', 'word-tracing-copy-the-word', 'K-284-word-tracing.js', 3, { traceLane: false },
    'Copy the Word', 'There are no dashed letters. Look at the word on the card and copy it twice.'],

  // PARAM faces on levels the waves have never published.
  ['g1', 'G1-291', 'write-the-word-first-letter-only', 'G1-244-write-the-word.js', 1,
    { bank: false, starter: true, cards: 6, maxLetters: 12, pic: 80, glyphH: 30, rulingW: 214 },
    'Write the Word: Only the First Letter', 'No word bank. The first letter is on the line to start you off.'],
  ['g1', 'G1-286', 'doubles-and-halves-pictures-to-20', 'G1-247-doubles-halves.js', 2,
    { cards: 4, cols: 2, rows: 2, dMin: 5, dMax: 10, hMin: 5, hMax: 10, icon: 20, perRow: 5, numeric: false },
    // TWO measured constraints, and they pull against each other.
    // (1) THE CARD COUNT MUST BE EVEN: `const half = d.cards / 2` in G1-247.build,
    //     so cards:3 renders a phantom fourth card and verify reports "answer NaN".
    // (2) At icon 32 the last card's equation row lands at bottom 954 against a
    //     945 page. The card BOX reports 184 while its content measures 217, so
    //     the spill is invisible to any card-height arithmetic and only the
    //     page-box lint sees it. icon 24 reclaims two picture-row heights on the
    //     doubles stage and one on the halves stage.
    // (3) cols:2 became possible only AT icon 20. The halves stage is a single
    //     non-wrapping flex row, so ten icons need 10*icon + 9*gap: 454px at
    //     icon 40 and 254px at icon 20, against a ~320px half-width card. At
    //     icon 24 in one column the content still reached 930 against a footer
    //     band starting at 921 — the icon was never the dominant term, the pill
    //     and the 48px equation row were. Two columns halve the vertical demand
    //     instead of shaving it.
    'Doubles and Halves with Pictures to 20', 'Count the bigger groups, double them, and halve them.'],

  // number-lines: `min` is two lines in G1-248.build (plus the label test made
  // relative to min, which the render has always required). Every shipped face
  // starts at 0; these three do not, which removes the count-from-the-start
  // fallback and forces the landmark strategy.
  ['g2', 'G2-305', 'number-line-between-40-and-60', 'G1-248-number-line-position.js', 2,
    { min: 40, max: 60, lines: 3, tick: 1, label: 5, pointers: 2, gap: 3 },
    'Where on the Number Line? 40 to 60', 'This line does not start at zero. Count on from the nearest printed number.'],
  // MEASURED: at tick 5 / label 2 this range offers only FOUR unlabelled ticks
  // (65, 75, 85, 95) against six pointers with page-wide no-repeat, so it cannot
  // build — and the pairs that would fit violate gap 3. Unit ticks give 32
  // candidates over the same span, and counting on by ones from a printed
  // landmark in the sixties is the skill the face is for.
  ['g2', 'G2-310', 'number-line-between-60-and-100', 'G1-248-number-line-position.js', 2,
    { min: 60, max: 100, lines: 3, tick: 1, label: 5, pointers: 2, gap: 3 },
    'Where on the Number Line? 60 to 100', 'The line starts at sixty. Count on from the nearest printed number.'],
  ['g1', 'G1-295', 'number-line-between-20-and-40', 'G1-248-number-line-position.js', 2,
    { min: 20, max: 40, lines: 4, tick: 1, label: 5, pointers: 3, gap: 3 },
    'Where on the Number Line? 20 to 40', 'The line starts at twenty. Count on from the nearest printed number.'],

  // doubles-halves `ops`: one page, one move, repeated — the fluency sheet.
  // The base always builds cards/2 of each, so every shipped face mixes; doubling
  // and halving are taught on separate days.
  // ⚠ Ranges are MEASURED, not symmetric. Doubles run 2-7 (six distinct values for
  // six cards — rng.sample on a five-value range silently returns five). Halves cap
  // at 6, not 7: at icon 40 a seven-icon non-wrapping row measures 316px inside a
  // ~320px card. Both stay inside verify's answer-in-1..20 band.
  ['g1', 'G1-287', 'doubles-only', 'G1-247-doubles-halves.js', 2, { ops: ['double'], cards: 6, dMin: 2, dMax: 7 },
    'Doubles to 14', 'Every card doubles a group. Say it, then write the answer.'],
  ['g1', 'G1-288', 'halves-only', 'G1-247-doubles-halves.js', 2, { ops: ['half'], cards: 6, hMin: 1, hMax: 6 },
    'Halves to 12', 'Every card cuts a group in half. Write the two equal parts.'],
  ['g1', 'G1-296', 'doubles-only-to-20', 'G1-247-doubles-halves.js', 2, { ops: ['double'], cards: 6, dMin: 5, dMax: 10, icon: 28, perRow: 5 },
    'Doubles to 20', 'Bigger groups to double, all the way to twenty.'],
  ['g1', 'G1-297', 'halves-only-to-20', 'G1-247-doubles-halves.js', 2, { ops: ['half'], cards: 6, hMin: 5, hMax: 10, icon: 28, perRow: 5 },
    'Halves to 20', 'Bigger groups to halve, starting from twenty.'],

  // singular-plural: both shipped faces give the plural in dashed strokes to
  // trace. Removing the model turns a motor task into a recall task — the child
  // produces the ending from the singular and the crowd of pictures alone.
  ['k', 'K-314', 'singular-plural-write-it-yourself', 'K-287-singular-plural.js', 3, { plurModel: false },
    'One and Many: Write It Yourself', 'No dashed letters this time. Write the word for many on the empty line.'],

  // word-classes two-bin entry rung. All three shipped faces are three-bin; a
  // two-way noun/verb sort is where the sequence starts, and it takes a G1 id
  // because that is the band the CONTENT belongs to.
  ['g1', 'G1-293', 'word-classes-two-bins', 'G2-275-word-classes.js', 1,
    { classes: ['noun', 'verb'], per: 5, pics: true, tiers: [1], lines: 6 },
    'Naming Words and Doing Words', 'Two bins this time. Is each word a naming word or a doing word?'],

  // word-tracing in block capitals. Glyph coverage MEASURED, not assumed:
  // CORE_GLYPHS carries all 52 ASCII letters and COMPOSED carries Ä Ö Ü Å Á À Â
  // É È Ê Ë Í Ó Ô Õ Ú Ù Ñ, with NEW_GLYPHS adding Æ Ø Ç ß — every capital any of
  // the eleven locales needs has centreline stroke data. Height is safe too:
  // strokeWordLane sizes on the ascender-to-baseline band (ascender 14) and
  // capitals sit at capTop 16, SHORTER than an ascender, so caps cannot overflow
  // a lane sized for lowercase.
  ['k', 'K-310', 'word-tracing-capital-letters', 'K-284-word-tracing.js', 1, { case: 'upper' },
    'Trace the Words in Capital Letters', 'Trace each word in big capital letters, then write it yourself.'],

  // number-walls from the top down. Every shipped face gives the base and builds
  // upward by addition; giving the apex inverts the operation to subtraction.
  ['g1', 'G1-289', 'number-walls-from-the-top-down', 'G1-246-number-walls.js', 2, { topGiven: true },
    'Number Walls: Start at the Top', 'The top brick is given and the bottom row is not. Work downwards.'],

  // singular-plural REVERSED. Both shipped faces run one -> many; going the other
  // way is the harder and more diagnostic direction, because the child removes an
  // ending rather than adding one, and that is where the misconceptions live.
  ['k', 'K-313', 'singular-plural-many-to-one', 'K-287-singular-plural.js', 1, { direction: 'toSingular' },
    'Many and One', 'This time the word for many is given. Write the word for just one.'],

  // grid-coordinates INVERSE: the picture is printed and the child writes the
  // codes — producing a coordinate rather than locating one. Sourced at 6x6
  // deliberately: those figures fill 18-25 cells (a page of writing) where the
  // 8x8 figures fill 29-36 (too much).
  ['g2', 'G2-308', 'grid-coordinates-write-the-codes', 'G2-279-grid-coordinates.js', 1, { inverse: true },
    'Grid Coordinates: Write the Codes', 'The picture is already colored. Write the letter and number of every colored square.'],

  // ABC dot-to-dot: the dots are joined in ALPHABET order, not number order — a
  // different ordering system and a genuine pre-K/K printable genre. The sequence
  // comes from each locale's own PRINTED strip, so Italian's 21 letters and the
  // Nordic ae/oe/aa are honoured rather than an a-z assumption.
  ['k', 'K-309', 'dot-to-dot-abc-order', 'K-285-dot-to-dot.js', 1, { letters: true, window: null, chip: 30 },
    'ABC Dot-to-Dot', 'Join the dots in alphabet order to find the hidden picture.'],

  // run-on sentences: the broken pill holds TWO sentences joined, all marks
  // stripped, so the child must decide where the first one ENDS before
  // capitalising anything. A different noticing from restoring a mark you can
  // see is missing, and the L.2.2 run-on lesson teachers print on its own.
  // Pool measured: the '.'-ended fix frames number 10-12 per locale against the
  // 6 distinct frames three paired lanes need.
  ['g2', 'G2-307', 'fix-the-sentence-where-does-it-end', 'G2-274-fix-the-sentence.js', 2,
    { joinPairs: true, lanes: 3, ends: ['.'], needCaps: 1, rulH: 80 },
    'Fix the Sentence: Where Does It End?', 'Two sentences have run together. Write them again as two sentences.'],

  // articles SORT: all the nouns against the same categories at once, read rather
  // than named — there is no picture to lean on. A G1 id because reading printed
  // words and copying them is not a Vorschule job.
  ['g1', 'G1-292', 'articles-sort-the-words', 'K-288-articles.js', 3, { sortWords: true, cards: 8 },
    'Sort the Words', 'Read every word. Write it under the word that belongs in front of it.'],

  // ── wave 3 ───────────────────────────────────────────────────────────────
  // A second pedagogy pass re-tested the 87 ceiling AFTER the eleven knobs
  // existed — many of the first pass's refusals were "this would need a code
  // change", and that premise had stopped being true. It found ten more, each
  // probed across 11 locales x 4 themes x 3 seeds, and named nine families as
  // genuinely exhausted with the measurement for each.

  // doubles/halves at d3: `numeric:true` replaces the picture with a blank
  // working panel. Every shipped doubles face puts a mirrored GROUP on the card,
  // so the answer is reachable by counting objects; these are the fact pages.
  ['g1', 'G1-298', 'doubles-only-numbers-to-20', 'G1-247-doubles-halves.js', 3, { ops: ['double'], cards: 8, dMin: 2, dMax: 10 },
    'Doubles to 20', 'Write the double of each number.'],
  ['g1', 'G1-299', 'halves-only-numbers-to-20', 'G1-247-doubles-halves.js', 3, { ops: ['half'], cards: 8, hMin: 2, hMax: 10 },
    'Halves to 20', 'Split each number into two equal parts.'],

  // noun vs ADJECTIVE is a different confusion from noun vs verb (the only
  // two-bin face shipped). pics:false also closes an answer leak the noun/verb
  // page carries: with pictures, only nouns get one, so the picture IS the answer.
  ['g1', 'G1-300', 'word-classes-nouns-and-adjectives', 'G2-275-word-classes.js', 1,
    { classes: ['noun', 'adj'], per: 5, pics: false, tiers: [1], lines: 6 },
    'Naming Words and Describing Words', 'Sort each word into the right bin.'],

  // the {bank, starter, boxes} cube ships five of eight corners; this is the
  // entry rung below the dictee muette — segment the word with the spelling given.
  ['g1', 'G1-301', 'write-the-word-bank-and-letter-boxes', 'G1-244-write-the-word.js', 2,
    { bank: true, starter: false, boxes: true, cards: 6, cols: 2, rows: 3, maxLetters: 9 },
    'Word Bank and Letter Boxes', 'Find the word in the bank. Write one letter in each box.'],

  // both the boundary AND the mark are open. G2-307 fixes the mark at a full
  // stop; G2-282 gives the boundary. This is the cell where neither is given.
  ['g2', 'G2-311', 'fix-the-sentence-two-sentences-one-mark', 'G2-274-fix-the-sentence.js', 2,
    { joinPairs: true, lanes: 3, ends: ['.', '?'], needQ: 1, needCaps: 1, rulH: 80 },
    'Where Does It End?', 'Two sentences ran together. Split them and mark each one.'],

  // intervals instead of lookup. `after` appears only inside d3's six-question
  // mix and has never been a page's subject.
  ['g2', 'G2-312', 'read-the-calendar-how-many-days-later', 'G2-277-read-the-calendar.js', 2,
    { questions: ['stickerDate', 'after', 'weekLater', 'dayOfDate'], stickers: 3, cellH: 68 },
    'How Many Days Later?', 'Use the calendar to work out each date.'],

  // the only face in the family that reaches 100, and not a subset of any
  // shipped label set. ⚠ chip 44 because a three-digit label needs the room.
  ['g2', 'G2-314', 'dot-to-dot-count-by-tens', 'K-285-dot-to-dot.js', 1, { startAt: 10, step: 10, chip: 44 },
    'Dot-to-Dot: Count by Tens', 'Join the dots counting in tens to 100.'],

  // capitals with no dashed guide — the rung above tracing them. Unlocked by the
  // traceable-after-uppercasing fix, which also repaired the live K-310.
  ['k', 'K-315', 'word-tracing-copy-the-capitals', 'K-284-word-tracing.js', 3,
    { case: 'upper', traceLane: false, rows: 3, minLetters: 2, maxLetters: 8, glyphH: 46, laneH: 58, pic: 120, cardW: 170, rowH: 230 },
    'Copy the Capitals', 'Look at the capitals, then write them yourself.'],

  // the 2x2 of {direction x model} had an unreachable corner: many-to-one with
  // NO model. Removing an ending from memory is where the misconceptions live.
  ['k', 'K-316', 'singular-plural-write-the-word-for-one', 'K-287-singular-plural.js', 3, { direction: 'toSingular', plurModel: false },
    'Write the Word for One', 'Read the word for many, then write the word for one.'],

  // two-digit addition inside the pyramid. Every shipped wall keeps the top under
  // 20, so every brick is a within-20 fact; with a base of 5-12 the tops land
  // between 40 and 96 and the upper courses need a written strategy. 2.NBT.B.5
  // rather than 1.OA.C.6 — hence the G2 band. The earlier pass refused a FIVE-
  // course wall for exceeding topMax arithmetically, which was right; it did not
  // test raising the ceiling instead of the depth.
  ['g2', 'G2-313', 'number-walls-to-100', 'G1-246-number-walls.js', 3,
    { gap: false, courses: 4, walls: 4, baseMin: 5, baseMax: 12, topMax: 100 },
    'Number Walls to 100', 'Each brick is the sum of the two under it.'],

  // ── wave 4: three CORNERS, not rungs ─────────────────────────────────────
  // The wave-3 pass called sentence-building "one act over a three-rung clue
  // ladder — all shipped". {showCap, showEnd} is a 2x2, not a ladder, and the
  // shipped three are (T,T), (T,F), (F,F). The fourth corner is a real face and
  // the reverse scaffold of the others: the END MARK is shown and the capital is
  // not, so the child is told which word finishes the sentence and must work out
  // which one starts it. Finding the start from the end is a different search
  // from finding the end from the start.
  ['g1', 'G1-302', 'unscramble-the-sentence-end-mark-only', 'G1-249-unscramble-sentence.js', 2, { showCap: false, showEnd: true },
    'Unscramble the Sentence: Find the Beginning', 'One tile carries the end mark. Work out which word starts the sentence.'],

  // write-the-word is a 2x2x2 of {bank, starter, boxes} and six corners ship.
  // These are the other two. The family's own logic — used to justify G1-291 and
  // G1-301 — is that each corner is a measurably different amount of help.
  ['g1', 'G1-303', 'write-the-word-letter-boxes-and-first-letter', 'G1-244-write-the-word.js', 2,
    { bank: false, starter: true, boxes: true, cards: 6, cols: 2, rows: 3, maxLetters: 9 },
    'Letter Boxes and the First Letter', 'One box for each letter, and the first letter is already there.'],
  ['g1', 'G1-304', 'write-the-word-every-clue', 'G1-244-write-the-word.js', 2,
    { bank: true, starter: true, boxes: true, cards: 6, cols: 2, rows: 3, maxLetters: 9 },
    'Write the Word: Every Clue', 'The word bank, the letter boxes and the first letter are all there to help.'],
];

function emit(row) {
  const [dir, id, slug, baseFile, src, over, title, instr, extra] = row;
  const baseId = baseFile.replace(/^([A-Z0-9]+-[0-9]+)-.*$/, '$1');
  const lines = [];
  lines.push('/** ' + id + ' — ' + title + '. nt20-B-VAR variation of ' + baseId + '. */');
  lines.push("'use strict';");
  // The base may live in a DIFFERENT band directory. Six wave-2 faces take an id
  // from the band their CONTENT belongs to rather than their family's usual one
  // — dot-to-dot is a K family, but counting by twos to 20 is G1 and by fives to
  // 50 is G2 — so `./<baseFile>` is wrong for them and the module throws
  // MODULE_NOT_FOUND at load. Resolve the base's directory from its own id.
  const baseDir = { K: 'k', G1: 'g1', G2: 'g2', G3: 'g3' }[baseId.split('-')[0]];
  if (!baseDir) throw new Error('gen-b2var-specs: cannot resolve band dir for base ' + baseId);
  const rel = baseDir === dir ? './' + baseFile : '../' + baseDir + '/' + baseFile;
  lines.push("const base = require('" + rel + "');");
  lines.push('// One object for all three levels: the waves ship d2 only, so a face must');
  lines.push('// render identically whichever level is asked for. Spreading the base entry');
  lines.push('// (not a JSON literal) carries function-valued params through intact.');
  lines.push('const D = { ...base.difficulty[' + src + '], ...' + JSON.stringify(over || {}) + ' };');
  lines.push('module.exports = {');
  lines.push('  ...base,');
  lines.push("  id: '" + id + "',");
  lines.push("  slug: '" + slug + "',");
  lines.push('  difficulty: { 1: D, 2: D, 3: D },');
  const ins = instr === null ? '' : ', instruction: ' + JSON.stringify(instr);
  lines.push('  i18n: { en: { title: ' + JSON.stringify(title) + ins + ' } },');
  if (extra) for (const k of Object.keys(extra)) lines.push('  ' + k + ': ' + JSON.stringify(extra[k]) + ',');
  lines.push('};');
  const file = path.join(ROOT, 'types', dir, id + '-' + slug + '.js');
  fs.writeFileSync(file, lines.join('\n') + '\n');
  return file;
}

/**
 * Remove any file this generator previously emitted for an id whose slug has
 * since changed. Renaming G2-281's slug left the OLD file on disk beside the new
 * one, so two modules declared id G2-281; loadType returns the first
 * readdirSync match with no duplicate detection, so it resolved to the right one
 * by directory-order luck, and loadAllTypes would have emitted both. Caught
 * independently by the German and Dutch panels, not by any gate.
 */
function pruneStale(rows) {
  const want = new Map(rows.map((r) => [r[1], r[0] + '/' + r[1] + '-' + r[2] + '.js']));
  let removed = 0;
  for (const dir of ['k', 'g1', 'g2', 'g3']) {
    const abs = path.join(ROOT, 'types', dir);
    for (const f of fs.readdirSync(abs)) {
      const m = /^([A-Z0-9]+-[0-9]+)-/.exec(f);
      if (!m || !want.has(m[1])) continue;
      if (want.get(m[1]) !== dir + '/' + f) { fs.unlinkSync(path.join(abs, f)); removed++; }
    }
  }
  return removed;
}

const ids = new Set(), slugs = new Set();
for (const r of ROWS) {
  if (ids.has(r[1])) throw new Error('duplicate id ' + r[1]);
  if (slugs.has(r[2])) throw new Error('duplicate slug ' + r[2]);
  ids.add(r[1]); slugs.add(r[2]);
}
const pruned = pruneStale(ROWS);
for (const r of ROWS) emit(r);
console.log('gen-b2var-specs: emitted ' + ROWS.length + ' PARAM variation specs' +
  (pruned ? ' (pruned ' + pruned + ' stale file(s) from a slug rename)' : ''));
module.exports = { ROWS };
