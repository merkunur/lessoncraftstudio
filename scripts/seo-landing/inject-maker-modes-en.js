#!/usr/bin/env node
/* One-shot: inject EN mode explanations + modeNames + samplesIntro into
 * frontend/messages/maker-content/en.json, and extend the labels block.
 * Idempotent (overwrites the added keys). Mode keys match the DB exerciseMode
 * strings ("default" = the null/standard mode). Run once; commit the JSON. */
'use strict';
const fs = require('fs');
const path = 'frontend/messages/maker-content/en.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const LABELS = {
  samplesHeading: 'See what you can make',
  samplesIntroDefault: 'Each style below is a ready-made sample — tap to play it, and every worksheet is free to print.',
  playSample: 'Play sample',
  crossLangHeading: 'Make ‘learn a language’ worksheets',
  crossLangIntro: 'The same maker also builds picture-vocabulary worksheets for learning a new language.',
  seeAllLang: 'See all {lang} worksheets',
  closeSample: 'Close sample',
};

// maker -> { modes?: {key:explanation}, modeNames?: {key:name}, samplesIntro? }
const MAKERS = {
  addition: { modes: {
    'find-addend': 'Show one part and the total; children work out the missing addend.',
    'image-image': 'Add two groups of pictures and count them all to find the sum.',
    'image-number': 'Count a group of pictures, then add it to a number for the total.',
    'mixed': 'A mix of picture sums and number sums together on one page.',
  } },
  subtraction: { modes: {
    'cross-out': 'Children cross out pictures to take them away and count what is left.',
    'find-subtrahend': 'Show the start and the answer; children find the number taken away.',
    'image-number': 'Count a group of pictures, then subtract a number from it.',
    'mixed': 'A mix of picture and number take-away problems on one sheet.',
  } },
  'math-puzzle': { modes: {
    'addition': 'Number-grid puzzles where every clue is an addition fact.',
    'subtraction': 'Number-grid puzzles built entirely from take-away facts.',
    'mixed': 'Puzzle grids that mix addition and subtraction clues.',
  } },
  'math-worksheet': {
    modes: {
      'two-symbols-add-sub': 'Two-number sums with a plus or minus, neatly laid out to solve.',
      'three-symbols-add-sub': 'Three-number problems combining plus and minus in one line.',
      'four-symbols-add-sub': 'Longer four-number strings of plus and minus to work through.',
    },
    modeNames: { 'two-symbols-add-sub': 'Two Numbers', 'three-symbols-add-sub': 'Three Numbers', 'four-symbols-add-sub': 'Four Numbers' },
  },
  'more-less': { modes: {
    'check-cross': 'Children mark which group has more and which has fewer.',
    'image-image': 'Compare two groups of pictures and decide which is more or less.',
    'image-number': 'Compare a group of pictures against a number — more, less or equal?',
  } },
  'big-small': {
    modes: {
      'findBig': 'Children spot and tap the biggest (or smallest) picture in each set.',
      'orderAsc': 'Put the pictures in order from smallest to biggest.',
    },
    modeNames: { 'findBig': 'Find the Biggest', 'orderAsc': 'Order by Size' },
  },
  'code-addition': {
    modes: {
      'default': 'Solve each sum, then use the number key to crack a hidden picture code.',
      'secret-word': 'Solve the sums and the answers spell out a fun secret word.',
    },
    modeNames: { 'default': 'Number Code' },
  },
  'find-and-count': { modes: {
    'hidden-object': 'Children hunt for hidden objects in a busy scene and count them.',
    'letter-spotting': 'Search the picture for a target letter and count every one found.',
  } },
  'find-objects': { modes: {
    'find-odd': 'Spot the one picture in the row that does not belong with the others.',
    'i-spy': 'An I-Spy scene where children find and count the named objects.',
  } },
  matching: { modes: {
    'letter': 'Draw a line from each picture to the letter it starts with.',
    'name': 'Match each picture to its written word.',
  } },
  'missing-pieces': { modes: {
    'one-missing': 'One piece is missing from the picture — children pick the part that completes it.',
    'two-missing': 'Two pieces are missing, so children choose both parts to finish the picture.',
  } },
  'odd-one-out': { modes: {
    'same-theme': 'Every picture shares a theme except one — find the odd one out.',
    'cross-theme': 'Pictures come from different themes; children spot the one that does not fit.',
  } },
  'pattern-train': {
    modes: {
      'aab': 'Repeating A-A-B picture patterns for children to continue.',
      'aabb': 'A-A-B-B patterns that build a steady two-by-two rhythm.',
      'abb': 'A-B-B patterns to read, predict and extend.',
      'abc': 'Three-part A-B-C patterns with a longer repeating unit.',
      'default': 'Mixed repeating patterns where children work out what comes next.',
    },
    modeNames: { 'default': 'Mixed Patterns' },
  },
  'picture-path': { modes: {
    'choose-path': 'Children choose the correct route through a picture maze.',
    'classic-maze': 'A classic maze to trace from start to finish without crossing walls.',
    'pathway': 'Follow the picture pathway from one end to the other.',
  } },
  prepositions: { modes: {
    'fillin': 'Children write the position word (in, on, under…) that fits each picture.',
    'multiplechoice': 'Pick the correct position word for each picture from the choices.',
  } },
  'shadow-match': { modes: {
    'find-shadow': 'Match each picture to its matching shadow shape.',
    'make-whole': 'Join the two halves that make each picture whole again.',
  } },
  sudoku: { modes: {
    'easy': 'Gentle picture sudoku grids for a first try at the puzzle.',
    'medium': 'A step up, with slightly fuller grids to reason through.',
    'hard': 'Trickier grids that need more careful logic to complete.',
  } },
  'treasure-hunt': { modes: {
    'cardinal-arrows': 'Follow up, down, left and right arrows across the grid to the treasure.',
    'compass': 'Use compass directions to navigate the map and find the treasure.',
  } },
  'word-guess': { modes: {
    'easy': 'Shorter words with picture clues for early readers to guess.',
    'normal': 'Longer words and trickier clues for confident readers.',
  } },
  'word-scramble': { modes: {
    'easy': 'Unscramble short, familiar words with a picture clue to help.',
    'normal': 'Unscramble longer words for a bigger spelling challenge.',
  } },
  wordsearch: {
    modes: {
      'default': 'Hide a list of words in the grid for children to find and circle.',
      'image-only': 'A picture word search — children find the words for the pictures shown.',
    },
    modeNames: { 'default': 'Word Hunt', 'image-only': 'Picture Hunt' },
  },
  'alphabet-train': {
    modes: {
      'letter-hint': 'Each carriage shows a letter hint to help build the alphabet train.',
      'default': 'Build the alphabet train by placing the letters in the right order.',
    },
    modeNames: { 'default': 'Classic' },
  },
  // single-mode makers -> samplesIntro
  bingo: { samplesIntro: 'Make picture and word bingo cards your whole class can play together.' },
  'chart-count': { samplesIntro: 'Build count-and-graph worksheets where children tally pictures into a chart.' },
  crossword: { samplesIntro: 'Create picture crosswords where children spell each word into the grid.' },
  cryptogram: { samplesIntro: 'Make decode-the-message puzzles where symbols stand in for letters.' },
  'grid-match': { samplesIntro: 'Build grid-matching worksheets that pair pictures across a grid.' },
  'pattern-worksheet': { samplesIntro: 'Create mixed pattern worksheets for children to read and complete.' },
  'picture-sort': { samplesIntro: 'Make sorting worksheets where children group pictures into the right baskets.' },
};

Object.assign(data.labels, LABELS);
let applied = 0;
for (const [key, patch] of Object.entries(MAKERS)) {
  if (!data[key]) { console.log('WARN no maker entry:', key); continue; }
  if (patch.modes) data[key].modes = patch.modes;
  if (patch.modeNames) data[key].modeNames = patch.modeNames;
  if (patch.samplesIntro) data[key].samplesIntro = patch.samplesIntro;
  applied++;
}
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('applied to ' + applied + ' makers + labels; wrote ' + path);
