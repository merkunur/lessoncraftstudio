/**
 * data/fl/new-templates.js — the templates of the flagship programme built on lib/color-glyphs.js (docs/makers/FLAGSHIP.md):
 * id · slug · the maker's exercise type · grade · mode (types/_shared/glyph-tasks.js) · unit axis · English title and instruction.
 * tools/fl-new-templates.js writes each type file from this table.
 */
'use strict';
const G = [
  ['K-579', 'color-the-letter', 'coloring-page', 'K', 'letter', 'letters', 'Coloring Alphabet: {U}', 'Color the page. Make it as bright and beautiful as you can.'],
  ['K-580', 'color-the-number', 'coloring-page', 'K', 'number', 'numbers', 'Coloring Numbers: {U}', 'Color everything on the page. Count the stars.'],
  ['K-581', 'color-your-name', 'coloring-page', 'K', 'name', null, 'Color Your Name', 'Color every letter of your name.'],
  ['K-603', 'count-and-color-the-number', 'counting-pictures', 'K', 'count-color', null, 'Count and Color the Number', 'Count the pictures in each row. Color the number that tells how many.'],
  ['K-604', 'color-the-number-path', 'number-charts', 'K', 'numpath', null, 'Color the Number Path', 'Find 1. Color the numbers in order up to {N}, one next to the other, to make a path.'],
  ['G1-554', 'color-the-odd-numbers', 'odd-and-even', 'G1', 'parity', null, 'Color the Odd Numbers', 'Color every odd number. Leave the even numbers white.'],
  ['K-606', 'color-the-bigger-number', 'comparing-numbers', 'K', 'bigger', null, 'Color the Greater Number', 'Look at the two numbers in each box. Color the greater number.'],
  ['K-607', 'solve-and-color-the-answer', 'mental-math', 'K', 'solve', null, 'Solve and Color the Answer', 'Solve each problem. Color the number that is the answer.'],
  ['G2-499', 'color-the-multiples', 'arrays-multiplication', 'G2', 'multiples', null, 'Color the Multiples', 'Color every number you say when you count by {N}s.'],
  ['K-608', 'color-the-pair', 'number-bonds', 'K', 'bonds', null, 'Color the Pair', 'Color the two numbers in each row that make {N} together.'],
  ['G1-551', 'color-the-tens-digit', 'base-ten', 'G1', 'tens', null, 'Color the Tens Digit', 'Color the digit in the tens place of each number.'],
  ['K-610', 'color-and-trace-the-number', 'number-tracing', 'K', 'num-trace', 'numbers', 'Color and Trace: {U}', 'Color the big number. Then trace the numbers on the lines.'],
  ['K-612', 'color-the-number-fill-the-frame', 'counting-frames', 'K', 'frame', null, 'Color the Number, Fill the Frame', 'Color each number. Then color that many squares in its frame.'],
  ['K-611', 'my-number-poster', 'number-of-the-day', 'K', 'poster', 'numbers', 'My Number Poster: {U}', 'Color the number and the number word. Then color that many squares in the frame.', { unitMax: 10 }],
  ['K-614', 'color-the-letter-pattern', 'patterns', 'K', 'pattern', null, 'Color the Letter Pattern', 'Color the same letters the same color. Write the letter that comes next.'],
  ['K-615', 'color-the-letters', 'sorting-categories', 'K', 'sort-ln', null, 'Letters or Numbers?', 'Color all the letters. Leave the numbers white.'],
  ['K-616', 'find-and-color-the-letter', 'letter-knowledge', 'K', 'find-letter', 'letters', 'Find and Color: {U}', 'Look at the letter at the top. Find it in the grid and color it every time.'],
  ['K-617', 'color-and-trace-the-letter', 'letter-tracing', 'K', 'letter-trace', 'letters', 'Color and Trace: {U}', 'Color the big letters. Then trace the letters on the lines.'],
  ['K-618', 'color-the-first-letter', 'beginning-sounds', 'K', 'first-letter', null, 'Color the First Letter', 'Say the name of each picture. Color the letter it starts with.'],
  ['K-623', 'color-bingo', 'bingo', 'K', 'bingo-color', null, 'Color Bingo', 'Take one card. Listen to the numbers from 1 to {N}. Color each number you hear. Three in a row wins.'],
  ['K-624', 'alphabet-coloring-cards', 'picture-word-cards', 'K', 'letter-cards', null, 'Alphabet Coloring Cards', 'Color each card. Then cut out the cards along the dashed lines.'],
  ['K-625', 'my-name-poster', 'all-about-me', 'K', 'name-poster', null, 'My Name Poster', 'Color the letters of your name. Draw yourself in the box.'],
  ['K-626', 'color-the-letter-in-its-place', 'ordinal-numbers', 'K', 'ordinal', null, 'Color the Letter in Its Place', 'Start at the arrow in each row and count the places. Color the letter in the place shown.'],
  ['K-613', 'color-the-days', 'calendar', 'K', 'month', null, 'Color the Days', 'Color today’s number every day until the whole month is colored.'],
  ['K-619', 'color-the-sight-word', 'sight-words', 'K', 'sight-word', 'sight', 'Color the Sight Word: {U}', 'Read the word. Color it every time you find it.'],
  ['G1-552', 'color-the-right-spelling', 'word-building', 'G1', 'right-spelling', null, 'Color the Right Spelling', 'Look at each picture. Color the word that is spelled the right way.'],
  ['K-620', 'color-the-syllables', 'syllable-split', 'K', 'syllables', null, 'Color the Syllables', 'Say each word and clap its parts. Color each part a different color.'],
  ['K-621', 'color-and-write-the-word', 'write-the-word', 'K', 'word-write', null, 'Color and Write the Word', 'Say the word. Color the big letters. Then write the word on the line.'],
];
/** the flagship templates (types/_shared/flagship-new.js): id · slug · type · grade · mode · unit axis · title · instruction · { kind, unitMax } */
const F = [
  ['K-582', 'color-and-count', 'coloring-page', 'K', 'color-count', null, 'Color and Count', 'Color the pictures. Count each kind and write how many.'],
  ['K-583', 'coloring-bookmarks', 'coloring-page', 'K', 'bookmarks', null, 'Coloring Bookmarks', 'Color the bookmarks. Cut them out along the dashed lines.'],
  ['K-584', 'letter-dot-to-dot', 'dot-to-dot', 'K', 'letter-dots', 'letters', 'Letter Dot-to-Dot: {U}', 'Start at the orange dot. Connect the dots in number order to make the letter. Then color it.'],
  ['K-585', 'number-dot-to-dot', 'dot-to-dot', 'K', 'number-dots', 'numbers', 'Number Dot-to-Dot: {U}', 'Start at the orange dot. Connect the dots in number order to make the number. Then color it.', { unitMax: 9 }],
  ['K-586', 'two-mini-dot-to-dots', 'dot-to-dot', 'K', 'two-dots', null, 'Two Mini Dot-to-Dots', 'Start at the orange dot in each picture. Connect the dots in number order.'],
  ['G1-547', 'dot-to-dot-write-the-word', 'dot-to-dot', 'G1', 'dots-word', null, 'Dot-to-Dot, Then Write the Word', 'Connect the dots in number order. Then write the name of the picture.'],
  ['G1-553', 'hidden-letter-mosaic', 'color-by-number', 'G1', 'mosaic', 'letters', 'Hidden Letter Mosaic', 'Color every box with an odd number. Which letter do you see? Write it in the answer box.'],
  ['G1-555', 'mystery-grid-picture', 'color-by-number', 'G1', 'pixel', null, 'Mystery Grid Picture', 'Color each box with the color of its number. What picture appears?'],
  ['K-591', 'letter-grid-differences', 'find-the-differences', 'K', 'letter-grid', null, 'Letter Grid: Find the Differences', 'Look at the top grid. Find the {N} letters that changed in the bottom grid. Color them.'],
  ['K-592', 'number-grid-differences', 'find-the-differences', 'K', 'number-grid', null, 'Number Grid: Find the Differences', 'Look at the top grid. Find the {N} numbers that changed in the bottom grid. Color them.'],
  ['G1-548', 'picture-grid-differences', 'find-the-differences', 'G1', 'picture-grid', null, 'Picture Grid: Find the Differences', 'Look at the top grid. Find the {N} pictures that changed in the bottom grid. Circle them.'],
  ['K-593', 'flip-find', 'find-the-differences', 'K', 'flip', null, 'Which One Faces the Other Way?', 'In each row one picture faces the other way. Circle it.'],
  ['K-594', 'odd-size-in-the-row', 'find-the-differences', 'K', 'odd-size', null, 'Which Size Is Different?', 'In each row one picture has a different size. Circle it.'],
  ['K-595', 'roll-and-draw-a-monster', 'how-to-draw', 'K', 'roll', null, 'Roll and Draw a Monster', 'Roll a die for each row. Draw the part under your number in the empty box.', { kind: 'monster' }],
  ['K-596', 'roll-and-draw-a-robot', 'how-to-draw', 'K', 'roll', null, 'Roll and Draw a Robot', 'Roll a die for each row. Draw the part under your number in the empty box.', { kind: 'robot' }],
  ['K-597', 'roll-and-draw-a-bug', 'how-to-draw', 'K', 'roll', null, 'Roll and Draw a Bug', 'Roll a die for each row. Draw the part under your number in the empty box.', { kind: 'bug' }],
  ['K-598', 'how-to-draw-poster', 'how-to-draw', 'K', 'poster', null, 'How to Draw Poster', 'Look at the steps in order. Color the name and the finished picture.'],
  ['G1-549', 'draw-it-three-times', 'how-to-draw', 'G1', 'three-times', null, 'Draw It Three Times', 'Follow the steps. Draw the picture big, then smaller, then very small.'],
  ['K-599', 'two-pictures-to-trace', 'picture-tracing', 'K', 'two-trace', null, 'Two Pictures to Trace', 'Trace all the lines of both pictures. Start at the black dots.'],
  ['K-600', 'trace-the-path', 'picture-tracing', 'K', 'trace-way', null, 'Trace the Path', 'In each row, start at the black dot. Trace the path to the other picture.'],
  ['K-601', 'trace-the-frame', 'picture-tracing', 'K', 'frame', null, 'Trace the Frame', 'Start at the black dot and trace the frame. Then draw something you like inside it.'],
  ['K-602', 'trace-the-giant-letter', 'picture-tracing', 'K', 'giant-letter', 'letters', 'Trace the Giant Letter: {U}', 'Start at the black dot. Trace the outline. Then color the letter.'],
  ['K-609', 'trace-the-giant-number', 'picture-tracing', 'K', 'giant-number', 'numbers', 'Trace the Giant Number: {U}', 'Start at the black dot. Trace the outline. Then color the number.'],
];
module.exports = { G, F };
