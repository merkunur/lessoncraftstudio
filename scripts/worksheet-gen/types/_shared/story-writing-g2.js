/**
 * story-writing-g2.js — five Grade 2 writing pages, the unit "Writing Stories" (English literacy year, Daily Teaching
 * System Part 12.3, 2026-11-17), lessons 3 and 4: "Plan and draft a true story" (W.2.3, 3 days) and "Revise and edit a
 * story with a checklist" (W.2.5, 2 days). Children are 7 or 8. Every text is data/literacy/story-writing-g2.en.json
 * (written by the scratch script mm-g2story/bank.js; hand-written and hand-judged). No picture stands on these pages.
 *
 *   read    G2-571 Parts of a True Story (W.2.3; day 1). A box tells the parts of a true story (details tell more about what
 *           I did, saw, thought, or felt); a true story told with I (one small moment, 50 to 70 words with its ending)
 *           printed WITHOUT its ending. 1. circle the 3 time words that tell the order (the story holds no other word of
 *           the bank's list of time words: before, when, soon ... would be a fourth); 2. underline the one sentence that
 *           tells a feeling (level 1) or a thought or a feeling (levels 2 and 3; no other sentence holds a feeling word
 *           or an action that shows one); 3. number its three events (printed without their time words in one of four
 *           orders, 2-3-1, 3-1-2, 1-3-2, 2-1-3, each in a quarter of the copies; never in order, never backward);
 *           4. the ending:
 *             level 1  the story with First, Next, Then; circle the sentence that ends it among three (one closes the
 *                      story, one starts something new, one tells the beginning again)
 *             level 2  a longer story with other time words (after that, later, finally) and one more detail that opens
 *                      with a place or a manner phrase and its comma; circle the ending
 *             level 3  the story of level 2; the child WRITES an ending that closes it on four rows (the key: a sample,
 *                      and what else is right)
 *           The feeling sentence is never the last one printed (a story that ends on a feeling would seem finished). No
 *           surface finds the right ending on more than a third of the stories: its place over the copies, its length,
 *           its first words, two choices that open alike (counted over the bank when it loads and by verify()).
 *   plan    G2-572 Plan Your True Story (W.2.3; day 2). Two story ideas every second grader has lived (A and B, one place
 *           and one stretch of time each), or "my own idea" (C); a planner (who was there / where and when / what
 *           happened: first, next, last / how I felt at the end), the notes of an example idea (never offered as a
 *           prompt) beside each part; a checklist of four. The key: a sample plan for idea A (its box says "the sample
 *           plan") and what else is right.
 *             level 1  sentence frames on the events and the feeling ("First, I", "At the end, I felt")
 *             level 2  starters on the events and the feeling ("First,", "I felt")
 *             level 3  no starters; a word bank (time words, feeling words, places and times); the key writes each event
 *                      with its time word
 *   draft   G2-573 Draft Your True Story (W.2.3; day 3). A tiny example story (an example idea; its time words in
 *           teal); the child writes the own story (the plan, or a printed idea) under Beginning, Middle, and Ending on
 *           10 rows of 44 px; a checklist. The key: a sample for the printed idea, named, and what else is right.
 *             level 1  "One day," starts the beginning, "First, I" / "Next, I" / "Last, I" start the events (one row
 *                      each), "At the end, I felt" the ending; tell one thing you thought or felt
 *             level 2  a row of time words, no starters; tell one thing you thought or felt
 *             level 3  less support: a word bank of I felt, I thought, I wondered, I saw, I heard, no time words, no
 *                      starters; tell one thing you did, saw, thought, or felt (a detail: its sample shows one; the
 *                      checklist asks for it)
 *   edit    G2-574 Edit a Story (W.2.5 with L.2.2; day 1 of "Revise and edit"). A box: the rules and HOW MANY things to fix;
 *           a story "by a second grader" (written right in the bank; the factory plants the mistakes) with 26 px clear
 *           above the letters of every line for a child's capital. Exactly one name, always planted in small letters;
 *           every opening time word keeps its comma; no word whose capital is a matter of taste (field day); no mistake
 *           nobody planted. The key adds a period; its line says that a ! is right too where the sentence can take it.
 *           2. The two sentences with two mistakes each are written again the right way on five rows (the key prints
 *           them with no "(Sample)": they have one right answer).
 *             level 1  6 sentences on strips: 2 capital letters (a sentence start, the name) and 2 end marks; the box
 *                      leaves out the line of time words (nothing is ordered)
 *             level 2  + 1 more capital letter at a sentence start, and the First sentence or the last sentence moved to
 *                      a wrong place (its time word places it): the child numbers the sentences
 *             level 3  the story as ONE paragraph (a missing end mark is found by reading), + 1 more end mark and 1
 *                      sentence that does not belong (crossed out, no number)
 *   revise  G2-575 Revise with a Partner (W.2.5; day 2). An example of adding a detail (a plain sentence, the partner's
 *           question, the detail added; 17 examples); a Me / Partner checklist of things one can see, read by the writer
 *           and the partner together; "My partner asked:", "I added a detail to my story with a caret (^):", "A sentence I
 *           fixed or checked for its capital letter and end mark:" on rows. The key: samples for an example idea, named,
 *           and what else is right.
 *             level 1  three checks (time words, capital letters, end marks), a row of question words; 2 / 3 / 3 rows
 *             level 2  five checks; 2 / 3 / 2 rows
 *             level 3  six checks (the story has an ending); "My partner liked:" first, beside "My partner asked:" (three
 *                      half rows each); 3 / 2 rows
 *
 * Writing rows are Grade 2 handwriting rows 44 px high (a dotted midline; the key seats its text on the base rule). A
 * second grader writes about 30 letters across a full-width row: verify() measures that every sample of the key fits its
 * rows at 21 px a letter (CH) with at least one row to spare, that a key text fits its row (measured), and that a label
 * stands above its rows. No blank band of more than 40 px anywhere a reader looks (between blocks, between tasks, inside
 * a card, measured on the lines of visible text: a note of the key hidden on the child's page counts as blank). Ligatures
 * are off by the font features; in the body font an f before i, f, l or t and a t before t get 1 px of room (HTML and the
 * rows' SVG text), the heading font none: verify() measures the gap after them against the mean gap of their line.
 * Apostrophes and quotation marks are typographic on everything printed (the bank keeps straight ones). English only;
 * themeless: a copy draws another story, idea pair, example, or story to edit. PDF only. The bank is checked when this file
 * loads (faultsOf), including that every level of every page can be drawn and that nothing can be copied across a lesson:
 * every piece names its topic, no prompt shares its topic (or its theme words) with a day-1 piece, an example or a model of
 * the teacher notes (modelOnly). verify() carries its own copy of every ruled text, list and measure (SPEC) and never reads
 * the build's constants.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const FONT = require('../../primitives/_tokens.js').font.body;
const FONT_METRICS = require('../../primitives/font-metrics.json');
const { makeRng } = require('../../lib/rng.js');
const { rulesOf } = require('../../lib/key-on-row.js');
const BANK = require('../../data/literacy/story-writing-g2.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, rowSvg } = _parts;

const ROW = 44;          // a Grade 2 handwriting row (top rule, dotted midline, base rule)
const CH = 21;           // a second grader's printed letter with its space (30 letters across 630 px)
const READ = 18;         // a sentence the child reads
const STORY1 = 19;       // the level-1 story text
const LABEL = 17;        // a task line
const OPT = 20;          // a sentence to circle
const RULEPX = 16;       // the boxes, examples, checklists
const GAP = 40;          // the largest blank band anywhere a reader looks (px)
const A = (s) => esc(s).replace(/"/g, '&quot;');
const INNER = W - 24;    // what a card holds inside its padding (651 px)
const WR = INNER - 20;   // a row inside a task (631 px)
const WH = Math.floor((INNER - 14) / 2);   // a half-width row (318 px)
const PW = W - 14;       // the rows of the planner (its card keeps 7 px at each side: 661 px, 31 letters of a child)
const PWH = Math.floor((PW - 14) / 2);     // a half-width row of the planner (323 px)
const PAIR = Math.floor((W - 10) / 2);     // a card of a pair side by side (G2-575 level 3: 332 px)
const PAIR_R = PAIR - 24 - 4;              // a row inside it (304 px)
const ROOM = 26;         // the clear room above a line of the story to edit, for a child's capital (px)
const BASE_RULES = rulesOf(rowSvg(400, ROW));
/** the size of a starter or a key text seated on a row: its x-height fills the band between the midline and the base */
const KEYPX = Math.round(((BASE_RULES.base - BASE_RULES.mid) / FONT_METRICS['nunito-700'].xHeight) * 2) / 2;
/** the advance of each letter of Nunito 700 in em (measured 2026-11-17 on a rendered page, canvas measureText) */
const GLYPH_EM = { a: 0.55, b: 0.6, c: 0.47, d: 0.6, e: 0.54, f: 0.36, g: 0.6, h: 0.59, i: 0.26, j: 0.26, k: 0.54, l: 0.32, m: 0.88, n: 0.59, o: 0.58, p: 0.6, q: 0.6, r: 0.39, s: 0.49, t: 0.38, u: 0.58, v: 0.53, w: 0.85, x: 0.55, y: 0.53, z: 0.47, A: 0.74, B: 0.69, C: 0.68, D: 0.76, E: 0.6, F: 0.56, G: 0.74, H: 0.77, I: 0.28, J: 0.35, K: 0.67, L: 0.56, M: 0.87, N: 0.75, O: 0.79, P: 0.65, Q: 0.79, R: 0.69, S: 0.63, T: 0.62, U: 0.74, V: 0.71, W: 1.11, X: 0.67, Y: 0.62, Z: 0.61, "'": 0.25, '’': 0.25, ' ': 0.27, '.': 0.27, ',': 0.27, '!': 0.3, '?': 0.5, '-': 0.36 };
const emOf = (s) => [...String(s)].reduce((n, c) => n + (GLYPH_EM[c] || 0.6), 0);
/** the room an f before i, f, l, or t and a t before t get in the body font (1 px at most more than the normal gap; the
 *  heading font gets none) */
const FROOM = 1;
/** the printed width of a starter on a row (with the room an f or a t gets) */
const starterW = (s) => (s ? emOf(s) * KEYPX + FROOM * ((String(s).match(/f(?=[iflt])|t(?=t)/g) || []).length) : 0);

/* ------------------------------------------------------------------ the texts the pages print (the build's copy) */
/** the page instruction of every level (registered as strings with add-strings.js) */
const INSTR = {
  read: { 1: 'A true story tells what happened to me, in order.', 2: 'Time words tell the order of what happened in a true story.', 3: 'A true story has a beginning, a middle, and an ending.' },
  plan: { 1: 'Plan a true story about one small moment.', 2: 'A plan tells who, where, when, and what happened.', 3: 'Plan who, where, when, what happened, and how you felt.' },
  draft: { 1: 'Write your true story from your plan.', 2: 'Tell what happened in order, with time words.', 3: 'Tell what happened in order, then end your true story.' },
  edit: { 1: 'Writers fix capital letters and end marks.', 2: 'Writers fix capital letters, end marks, and the order of sentences.', 3: 'Writers fix mistakes and take out a sentence that does not belong.' },
  revise: { 1: 'Read your story with a partner and make it better.', 2: 'Writers revise to add details and edit to fix mistakes.', 3: 'A partner helps a writer add details and fix mistakes.' },
};
/** the task lines */
const LINES = {
  markTW: 'Circle the 3 time words that tell the order.',
  markFeel: { 1: 'Underline the sentence that tells how I felt.', 2: 'Underline the sentence that tells what I thought or felt.', 3: 'Underline the sentence that tells what I thought or felt.' },
  order: 'Number the events 1, 2, and 3 in the order they happen in the story.',
  endPick: 'The story needs an ending. Circle the sentence that ends it.',
  endWrite: 'The story needs an ending. Write an ending that closes it.',
  ideas: 'Choose one idea for your true story and circle it, or write your own idea.',
  own: 'My own idea:',
  plan: { 1: 'Plan your story. Write notes and finish each sentence.', 2: 'Plan your story. Write short notes.', 3: 'Plan your story in short notes. Use the word bank.' },
  draft: { 1: 'Write your true story. Tell one thing you thought or felt.', 2: 'Write your true story. Tell one thing you thought or felt.', 3: 'Write your true story. Tell one thing you did, saw, thought, or felt.' },
  draftIdea: 'Your plan, or this idea:',
  edit: { 1: 'Read the story. Fix the capital letters and add the end marks.', 2: 'Fix the capital letters and add the end marks. Number the sentences in order.', 3: 'Fix the capital letters and add the end marks. Cross out the sentence that does not belong. Number the other sentences in order.' },
  rewrite: 'Two sentences have 2 mistakes each. Write them again the right way.',
  checks: 'Read your story to a partner. Then look at it together and put a check mark in each box that is true.',
  asked: 'My partner asked:',
  added: 'I added a detail to my story with a caret (^):',
  fixed: 'A sentence I fixed or checked for its capital letter and end mark:',
  liked: 'My partner liked:',
};
const RULES = {
  read: ['<b>Beginning</b>: who was there, where, and when.', '<b>Middle</b>: what happened, in order. Time words tell the order: first, next, then, after that, later, finally.', '<b>Details</b> tell more about what I did, saw, thought, or felt.', '<b>Ending</b>: how it ended. It does not start something new.'],
  // level 1 orders nothing: its box leaves out the line of time words
  edit: { 1: ['A capital letter starts every sentence and every name.', 'An end mark (. ? !) ends every sentence.'], 2: ['A capital letter starts every sentence and every name.', 'An end mark (. ? !) ends every sentence.', 'Time words tell the order: first, next, then, at the end.'], 3: ['A capital letter starts every sentence and every name.', 'An end mark (. ? !) ends every sentence.', 'Time words tell the order: first, next, then, at the end.'] },
  editCount: { 1: 'In this story: 2 capital letters and 2 end marks to fix.', 2: 'In this story: 3 capital letters, 2 end marks, and 1 sentence in the wrong place.', 3: 'In this story: 3 capital letters, 3 end marks, 1 sentence in the wrong place, and 1 sentence that does not belong.' },
};
const CHECK = {
  plan: ['I wrote who was there.', 'I wrote where and when.', 'I wrote three things that happened.', 'I wrote how I felt.'],
  draft: { 1: ['I told who, where, and when.', 'I used time words.', 'I told what I thought or felt.', 'I wrote an ending.'], 2: ['I told who, where, and when.', 'I used time words.', 'I told what I thought or felt.', 'I wrote an ending.'], 3: ['I told who, where, and when.', 'I used time words.', 'I told what I thought or felt.', 'I added a detail.', 'I wrote an ending.'] },
  // the checks are read for the writer's story by the writer and by the partner: "The story ..." reads right in both columns
  revise: { 1: ['The story uses time words.', 'Every sentence starts with a capital letter.', 'Every sentence ends with an end mark.'], 2: ['The story tells who, where, and when.', 'The story uses time words.', 'The story tells what I thought or felt.', 'Every sentence starts with a capital letter.', 'Every sentence ends with an end mark.'], 3: ['The story tells who, where, and when.', 'The story uses time words.', 'The story tells what I thought or felt.', 'Every sentence starts with a capital letter.', 'Every sentence ends with an end mark.', 'The story has an ending.'] },
};
const CHECK_LEGEND = 'Put a check mark next to what you did:';
const PLAN_HEAD = { who: 'Who was there?', where: 'Where and when?', events: 'What happened, in order?', felt: 'How did I feel at the end?' };
const PLAN_START = { 1: { first: 'First, I', next: 'Next, I', last: 'Last, I', felt: 'At the end, I felt' }, 2: { first: 'First,', next: 'Next,', last: 'Last,', felt: 'I felt' } };
/** the time words level 3 of the planner writes before each event (its word bank offers them) */
const PLAN_TW = ['First', 'Next', 'Last'];
const PLAN_BANK = 'Word bank: first, next, last · happy, proud, excited · in class, at recess';
const IDEA_MARK = ['A.', 'B.', 'C.'];
const DRAFT_HEAD = { beginning: 'Beginning: who, where, and when', middle: 'Middle: what happened, in order', ending: 'Ending: how it ended and how I felt' };
const DRAFT_START = { beginning: 'One day,', events: ['First, I', 'Next, I', 'Last, I'], ending: 'At the end, I felt' };
const TIME_ROW = 'Time words: first, next, then, after that, later, last';
const DRAFT_BANK = 'Word bank: I felt · I thought · I wondered · I saw · I heard';
const QWORDS = 'Question words: Who? What? Where? When? Why? How?';
/** the key's notes: a sample, and what else is right (WRITING-PAGES.md rule 4) */
const NOTES = {
  endWrite: '(Sample. Any ending that wraps up this moment is right; a new event is not.)',
  plan: '(Any notes that answer each question are right.)',
  draft: '(Any story with who, where, when, events in order with time words, a thought or feeling, and an ending is right.)',
  revise: "(Any question, detail, and fixed sentence from the child's own story are right.)",
  excl: '(! is right too where the sentence can take it.)',
};
const SAMPLE_FOR = '(Sample for: ';
const SAMPLES_FOR = '(Samples for: ';
const SAMPLE_PLAN = '(the sample plan)';
const BYLINE = 'A story by a second grader';
const EX_DETAIL = 'Example: adding a detail';
const EX_ROWS = ['My sentence:', 'My partner asked:', 'I added:'];

/** verify()'s OWN copy of every ruled text and measure (the check never reads the build's constants: a build that changes
 *  one of them fails its pages). Written out again on purpose. */
const SPEC = {
  INSTR: {
    read: { 1: 'A true story tells what happened to me, in order.', 2: 'Time words tell the order of what happened in a true story.', 3: 'A true story has a beginning, a middle, and an ending.' },
    plan: { 1: 'Plan a true story about one small moment.', 2: 'A plan tells who, where, when, and what happened.', 3: 'Plan who, where, when, what happened, and how you felt.' },
    draft: { 1: 'Write your true story from your plan.', 2: 'Tell what happened in order, with time words.', 3: 'Tell what happened in order, then end your true story.' },
    edit: { 1: 'Writers fix capital letters and end marks.', 2: 'Writers fix capital letters, end marks, and the order of sentences.', 3: 'Writers fix mistakes and take out a sentence that does not belong.' },
    revise: { 1: 'Read your story with a partner and make it better.', 2: 'Writers revise to add details and edit to fix mistakes.', 3: 'A partner helps a writer add details and fix mistakes.' },
  },
  LINES: {
    markTW: 'Circle the 3 time words that tell the order.',
    markFeel: { 1: 'Underline the sentence that tells how I felt.', 2: 'Underline the sentence that tells what I thought or felt.', 3: 'Underline the sentence that tells what I thought or felt.' },
    order: 'Number the events 1, 2, and 3 in the order they happen in the story.',
    endPick: 'The story needs an ending. Circle the sentence that ends it.',
    endWrite: 'The story needs an ending. Write an ending that closes it.',
    ideas: 'Choose one idea for your true story and circle it, or write your own idea.',
    own: 'My own idea:',
    plan: { 1: 'Plan your story. Write notes and finish each sentence.', 2: 'Plan your story. Write short notes.', 3: 'Plan your story in short notes. Use the word bank.' },
    draft: { 1: 'Write your true story. Tell one thing you thought or felt.', 2: 'Write your true story. Tell one thing you thought or felt.', 3: 'Write your true story. Tell one thing you did, saw, thought, or felt.' },
    draftIdea: 'Your plan, or this idea:',
    edit: { 1: 'Read the story. Fix the capital letters and add the end marks.', 2: 'Fix the capital letters and add the end marks. Number the sentences in order.', 3: 'Fix the capital letters and add the end marks. Cross out the sentence that does not belong. Number the other sentences in order.' },
    rewrite: 'Two sentences have 2 mistakes each. Write them again the right way.',
    checks: 'Read your story to a partner. Then look at it together and put a check mark in each box that is true.',
    asked: 'My partner asked:', added: 'I added a detail to my story with a caret (^):', fixed: 'A sentence I fixed or checked for its capital letter and end mark:', liked: 'My partner liked:',
  },
  RULES: {
    read: ['Beginning: who was there, where, and when.', 'Middle: what happened, in order. Time words tell the order: first, next, then, after that, later, finally.', 'Details tell more about what I did, saw, thought, or felt.', 'Ending: how it ended. It does not start something new.'],
    edit: { 1: ['A capital letter starts every sentence and every name.', 'An end mark (. ? !) ends every sentence.'], 2: ['A capital letter starts every sentence and every name.', 'An end mark (. ? !) ends every sentence.', 'Time words tell the order: first, next, then, at the end.'], 3: ['A capital letter starts every sentence and every name.', 'An end mark (. ? !) ends every sentence.', 'Time words tell the order: first, next, then, at the end.'] },
    editCount: { 1: 'In this story: 2 capital letters and 2 end marks to fix.', 2: 'In this story: 3 capital letters, 2 end marks, and 1 sentence in the wrong place.', 3: 'In this story: 3 capital letters, 3 end marks, 1 sentence in the wrong place, and 1 sentence that does not belong.' },
  },
  CHECK: {
    plan: ['I wrote who was there.', 'I wrote where and when.', 'I wrote three things that happened.', 'I wrote how I felt.'],
    draft: { 1: ['I told who, where, and when.', 'I used time words.', 'I told what I thought or felt.', 'I wrote an ending.'], 2: ['I told who, where, and when.', 'I used time words.', 'I told what I thought or felt.', 'I wrote an ending.'], 3: ['I told who, where, and when.', 'I used time words.', 'I told what I thought or felt.', 'I added a detail.', 'I wrote an ending.'] },
    revise: { 1: ['The story uses time words.', 'Every sentence starts with a capital letter.', 'Every sentence ends with an end mark.'], 2: ['The story tells who, where, and when.', 'The story uses time words.', 'The story tells what I thought or felt.', 'Every sentence starts with a capital letter.', 'Every sentence ends with an end mark.'], 3: ['The story tells who, where, and when.', 'The story uses time words.', 'The story tells what I thought or felt.', 'Every sentence starts with a capital letter.', 'Every sentence ends with an end mark.', 'The story has an ending.'] },
  },
  CHECK_LEGEND: 'Put a check mark next to what you did:',
  PLAN_HEAD: { who: 'Who was there?', where: 'Where and when?', events: 'What happened, in order?', felt: 'How did I feel at the end?' },
  PLAN_START: { 1: { first: 'First, I', next: 'Next, I', last: 'Last, I', felt: 'At the end, I felt' }, 2: { first: 'First,', next: 'Next,', last: 'Last,', felt: 'I felt' }, 3: {} },
  PLAN_TW: ['First', 'Next', 'Last'], IDEA_MARK: ['A.', 'B.', 'C.'],
  PLAN_BANK: 'Word bank: first, next, last · happy, proud, excited · in class, at recess',
  DRAFT_HEAD: { beginning: 'Beginning: who, where, and when', middle: 'Middle: what happened, in order', ending: 'Ending: how it ended and how I felt' },
  DRAFT_START: { beginning: 'One day,', events: ['First, I', 'Next, I', 'Last, I'], ending: 'At the end, I felt' },
  TIME_ROW: 'Time words: first, next, then, after that, later, last',
  DRAFT_BANK: 'Word bank: I felt · I thought · I wondered · I saw · I heard',
  QWORDS: 'Question words: Who? What? Where? When? Why? How?',
  NOTES: {
    endWrite: '(Sample. Any ending that wraps up this moment is right; a new event is not.)',
    plan: '(Any notes that answer each question are right.)',
    draft: '(Any story with who, where, when, events in order with time words, a thought or feeling, and an ending is right.)',
    revise: "(Any question, detail, and fixed sentence from the child's own story are right.)",
    excl: '(! is right too where the sentence can take it.)',
  },
  SAMPLE_FOR: '(Sample for: ', SAMPLES_FOR: '(Samples for: ', SAMPLE_PLAN: '(the sample plan)',
  BYLINE: 'A story by a second grader', EX_DETAIL: 'Example: adding a detail', EX_ROWS: ['My sentence:', 'My partner asked:', 'I added:'],
  /** the time words of the read page (the box's list) */
  TW: ['first', 'next', 'then', 'after that', 'later', 'finally'],
  /** the words and phrases US Grade 2 lists teach as time words: a story to mark holds none outside its three keyed ones */
  TIMEWORDS: ['first', 'second', 'third', 'next', 'then', 'after', 'after that', 'afterward', 'afterwards', 'later', 'finally', 'last', 'at last', 'at the end', 'in the end', 'at first', 'before', 'when', 'while', 'until', 'soon', 'now', 'once', 'today', 'tonight', 'yesterday', 'tomorrow', 'one day', 'suddenly', 'just then', 'meanwhile', 'during', 'still'],
  /** the words that name a feeling or a thought, or an action that shows one: only one sentence of a story holds them */
  FEEL: ['felt', 'feel', 'feeling', 'happy', 'glad', 'proud', 'excited', 'nervous', 'worried', 'scared', 'afraid', 'sad', 'calm', 'cozy', 'surprised', 'thought', 'think', 'wondered', 'wonder', 'hoped', 'hope', 'wished', 'wish', 'loved', 'love', 'liked', 'like', 'enjoyed', 'smiled', 'laughed', 'grinned', 'giggled', 'cheered', 'cried', 'yelled', 'shouted', 'screamed', 'hugged', 'frowned', 'upset', 'mad', 'angry', 'grumpy', 'silly', 'brave', 'shy', 'lonely', 'bored', 'tired', 'thankful', 'curious', 'sorry', 'embarrassed', 'fun', 'great', 'best', 'favorite', 'kind', 'welcome', 'nice'],
  THINK: ['thought', 'wondered', 'hoped', 'wished'],
  /** words some writers capitalize and some do not: never in a story to edit (WRITING-PAGES.md rule 16) */
  TASTE: ['field day', 'show and tell', 'fun run', 'picture day', 'spirit week', 'earth day', 'mom', 'dad', 'grandma', 'grandpa'],
  TITLE_STOP: ['a', 'an', 'the', 'and', 'in', 'on', 'at', 'of', 'to', 'for', 'with', 'by', 'up', 'i', 'my', 'our', 'we', 'it', 'is', 'where', 'one'],
  /** the orders the events of G2-571 may be printed in (top to bottom; never in order, never backward) */
  EV_ORDERS: ['120', '201', '021', '102'],
  // the measures: a row, a child's letter, the largest blank band, the sizes of what a child reads and circles, the room
  // above a line of the story to edit, the room an f or a t may get (body font; the heading font gets none)
  ROW: 44, CH: 21, GAP: 40, READ: 18, OPT: 20, RULE: 16, LABEL: 17, FILL: 0.8, EX_LINES: 3, ROOM: 26, FROOM: 1,
  // the levels (literal here: a check that read them from LEVELS would agree with any change)
  N: { draftLines: { 1: [3, 4, 3], 2: [3, 4, 3], 3: [3, 4, 3] }, strips: { 1: 6, 2: 6, 3: 7 }, caps: { 1: 2, 2: 3, 3: 3 }, ends: { 1: 2, 2: 2, 3: 3 }, checks: { 1: 3, 2: 5, 3: 6 }, endRows: 4, rewriteRows: { 1: 5, 2: 5, 3: 5 }, reviseRows: { 1: { asked: 2, added: 3, fixed: 3 }, 2: { asked: 2, added: 3, fixed: 2 }, 3: { liked: 3, asked: 3, added: 3, fixed: 2 } } },
};

/* ------------------------------------------------------------------ words and texts */
const words = (s) => String(s).toLowerCase().replace(/’/g, "'").match(/[a-z]+(?:[-'][a-z]+)*/g) || [];
const hasWord = (s, w) => { const ws = words(s), q = words(w); for (let i = 0; i + q.length <= ws.length; i++) if (q.every((x, k) => ws[i + k] === x)) return true; return false; };
const countPhrase = (s, w) => { const ws = words(s), q = words(w); let n = 0; for (let i = 0; i + q.length <= ws.length; i++) if (q.every((x, k) => ws[i + k] === x)) n++; return n; };
const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const low1 = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const sentencesOf = (s) => (String(s).match(/[^.!?]+[.!?]+/g) || []).map((x) => x.trim());
/** the time word that opens a sentence ("After that" in "After that, we ..."), or null */
const leadOf = (s) => { const m = String(s).match(/^([A-Za-z ]+), /); return m ? m[1] : null; };
const STOP = new Set(['a', 'an', 'the', 'and', 'in', 'on', 'at', 'of', 'to', 'for', 'with', 'by', 'up', 'i', 'my', 'our', 'we', 'it', 'is', 'was', 'were', 'me', 'us', 'he', 'she', 'they', 'them', 'his', 'her', 'its', 'so', 'then', 'that', 'this', 'when', 'out', 'back', 'one', 'into', 'onto', 'went', 'put', 'over', 'went', 'where', 'there', 'all', 'just', 'did', 'not', 'had', 'got']);
const content = (s) => words(s).filter((w) => !STOP.has(w)).map((w) => w.replace(/'s$/, '').replace(/(ing|ed|es|s)$/, ''));
/** a second grader's letters on a row: how many a row of w px holds after a starter */
const capOf = (w, starter) => Math.max(0, Math.floor((w - (starter ? 8 + starterW(starter) + 8 : 0) - 10) / CH));
/** the key's text spread over rows whose capacities are caps (greedy, word by word); null when it does not fit */
function spread(text, caps) {
  const out = []; let cur = '', k = 0;
  for (const w of String(text).split(' ')) {
    if (cur && (cur + ' ' + w).length > caps[k]) { out.push(cur); cur = w; k++; if (k >= caps.length) return null; }
    else cur = cur ? cur + ' ' + w : w;
    if (cur.length > caps[k]) return null;
  }
  if (cur) out.push(cur);
  return out;
}
/** the sample fits n rows of w px (the first after its starter) at a child's letter width, with the last row free */
const fitsRows = (text, w, n, starter) => !!spread(text, Array.from({ length: n - 1 }, (_, i) => capOf(w, i === 0 ? starter : null)));

/* ------------------------------------------------------------------ the bank check */
const TW_READ = ['first', 'next', 'then', 'after that', 'later', 'finally'];
const THINK = SPEC.THINK;
/** a sentence tells a feeling or a thought (the draw; the bank check reads the bank's own list, checked equal to this) */
const feelsIn = (s) => words(s).some((w) => SPEC.FEEL.includes(w));
const twCount = (s) => TW_READ.reduce((n, w) => n + countPhrase(s, w), 0);
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/** how far a child gets on the endings of G2-571 by a surface feature, over the stories: the expected right answers of a
 *  child who picks the longest or the shortest choice, the choice that opens with given words (its first one, two, or
 *  three words, or the phrase before its comma), or one of two choices that open alike; never more than a third of the
 *  stories, rounded up (a feature that only one right ending has gives that much and no less). verify() runs its own copy
 *  of this check over the bank. */
function endingTells(S) {
  const out = [], n = S.length, lim = Math.ceil(n / 3), ch = (s) => [s.end.right, s.end.newEvent, s.end.again];
  const longest = S.filter((s) => [s.end.newEvent, s.end.again].every((o) => o.length < s.end.right.length)).length;
  const shortest = S.filter((s) => [s.end.newEvent, s.end.again].every((o) => o.length > s.end.right.length)).length;
  if (longest > lim || shortest > lim) out.push(`the right ending is the longest in ${longest} and the shortest in ${shortest} of ${n} stories (${lim} at most)`);
  const feats = (o) => { const ws = String(o).toLowerCase().split(/[\s,]+/).filter(Boolean); const x = [1, 2, 3].map((k) => ws.slice(0, k).join(' ')); const m = String(o).match(/^([^,]+),/); if (m) x.push(m[1].toLowerCase()); return x; };
  const all = new Set(); S.forEach((s) => ch(s).forEach((o) => feats(o).forEach((x) => all.add(x))));
  for (const x of all) {
    let e = 0; S.forEach((s) => { const hit = ch(s).filter((o) => feats(o).includes(x)); e += hit.length ? (hit.includes(s.end.right) ? 1 / hit.length : 0) : 1 / 3; });
    if (e > lim + 1e-9) out.push(`a child who picks the choice that opens with "${x}" finds the right ending in ${e.toFixed(1)} of ${n} stories (${lim} at most)`);
  }
  let e2 = 0; S.forEach((s) => { const w = ch(s).map((o) => String(o).split(/[\s,]/)[0].toLowerCase()); const same = [[0, 1], [0, 2], [1, 2]].filter(([i, j]) => w[i] === w[j]); e2 += same.length === 1 ? (same[0].includes(0) ? 0.5 : 0) : 1 / 3; });
  if (e2 > lim + 1e-9) out.push(`a child who picks one of the two choices that open alike finds the right ending in ${e2.toFixed(1)} of ${n} stories (${lim} at most)`);
  return out;
}
/** the places of the answers over the copies (a fixed order): every value stands in its share of the copies, rounded up,
 *  at most, and never three copies in a row (the order read round) */
function seqFaults(seq, vals, what) {
  const out = [], lim = Math.ceil(seq.length / vals.length);
  vals.forEach((v) => { const c = seq.filter((x) => x === v).length; if (!c || c > lim) out.push(`${what}: ${v} stands in ${c} of ${seq.length} copies (1 to ${lim})`); });
  const q = [...seq, ...seq.slice(0, 2)];
  if (q.some((x, i) => i >= 2 && x === q[i - 1] && x === q[i - 2])) out.push(`${what}: the same in three copies in a row`);
  return out;
}

function faultsOf(b) {
  const f = [];
  const S = b.stories || [], ID = b.ideas || [], EX = b.exampleIdeas || [], DT = b.details || [], ED = b.editStories || [], MO = b.modelOnly || [];
  // the lists of the bank (ruling C): the ones verify() carries
  const TWL = b.timeWords || [], FWL = b.feelingWords || [], TC = b.tasteCaps || [];
  const same = (x, y) => x.length === y.length && x.every((w) => y.includes(w));
  if (!same(TWL, SPEC.TIMEWORDS)) f.push('the bank\'s list of time words is not the list verify() checks');
  if (!same(FWL, SPEC.FEEL)) f.push('the bank\'s list of feeling words is not the list verify() checks');
  if (!same(TC, SPEC.TASTE)) f.push('the bank\'s list of words some writers capitalize is not the list verify() checks');
  // eslint-disable-next-line no-shadow
  const feelsIn = (s) => words(s).some((w) => FWL.includes(w));
  // ---- G2-571 stories
  if (S.length < 14) f.push('stories: fewer than 14');
  if (new Set(S.map((s) => s.id)).size !== S.length) f.push('stories: an id stands twice');
  S.forEach((s) => {
    const tag = `story "${s.id}"`;
    for (const ver of ['l1', 'l2']) {
      const L = s[ver] || [], vt = `${tag} (${ver})`;
      if (L.length !== (ver === 'l1' ? 5 : 6)) { f.push(`${vt}: not ${ver === 'l1' ? 5 : 6} sentences`); continue; }
      L.forEach((x, k) => { if (sentencesOf(x).length !== 1 || !/^[A-Z]/.test(x) || !/\.$/.test(x)) f.push(`${vt}: sentence ${k + 1} is not one sentence with a capital and a period`); });
      const text = L.join(' ');
      const nw = words(text).length + words(s.end.right).length;
      if (nw < 50 || nw > 70) f.push(`${vt}: ${nw} words with its ending (50 to 70)`);
      // the beginning (sentence 1) says who, where, and when, with no time word and no feeling
      if (leadOf(L[0]) || twCount(L[0]) || feelsIn(L[0])) f.push(`${vt}: the beginning opens with a time word or has a time word or a feeling`);
      if (!DAYS.some((d) => hasWord(L[0], d)) && !/recess|class|art|gym|music|math/.test(L[0])) f.push(`${vt}: the beginning does not tell when`);
      // three events, each opening with a time word of the box (level 1: First, Next, Then in this order) and its comma
      const ev = L.map((x, k) => (leadOf(x) && TW_READ.includes(leadOf(x).toLowerCase()) ? k : -1)).filter((k) => k >= 0);
      if (ev.length !== 3) f.push(`${vt}: not three events that open with a time word`);
      if (twCount(text) !== 3) f.push(`${vt}: the box's time words stand ${twCount(text)} times in the story (3: one at the start of each event)`);
      if (ver === 'l1' && ev.map((k) => leadOf(L[k])).join() !== 'First,Next,Then') f.push(`${vt}: the level-1 events do not open with First, Next, Then`);
      if (ver === 'l2' && leadOf(L[ev[0]]) !== 'First') f.push(`${vt}: the first event does not open with First`);
      // EXACTLY three time words: the title and every sentence hold no word of the list of time words outside the three
      // keyed ones (the opener of each event); "before", "when", "soon" ... would be a fourth a child can rightly circle
      [s.title, ...L.map((x, k) => (ev.includes(k) && leadOf(x) ? x.slice(leadOf(x).length + 1) : x))].forEach((x) => { const w = TWL.find((t) => hasWord(x, t)); if (w) f.push(`${vt}: "${w}" is a time word outside the three to circle: "${x.slice(0, 40)}"`); });
      // exactly one sentence tells a feeling (level 1: a feeling, no thought) or a thought (level 2); no other sentence
      // holds a feeling word or an action that shows a feeling
      const fs = L.map((x, k) => (feelsIn(x) ? k : -1)).filter((k) => k >= 0);
      if (fs.length !== 1) f.push(`${vt}: ${fs.length} sentences tell a feeling or a thought (1)`);
      else {
        if (ev.includes(fs[0]) || fs[0] === 0) f.push(`${vt}: the feeling is in the beginning or in an event`);
        // a story printed without its ending must not seem to end already: its feeling is never its last sentence
        if (fs[0] === L.length - 1) f.push(`${vt}: the feeling is the last sentence (the story would seem to have its ending)`);
        if (ver === 'l1' && (words(L[fs[0]]).some((w) => THINK.includes(w)) || !/^I (felt|was)\b/.test(L[fs[0]]))) f.push(`${vt}: the level-1 feeling is not "I felt ..." or "I was ..."`);
        // level 2: the one more sentence (the detail) opens with a place or a manner phrase and its comma, so that a comma
        // after an opener no longer marks the three time words (never a when-phrase: it would be a time word to circle)
        if (ver === 'l2' && ev.length === 3) {
          const dk = L.map((x, k) => k).filter((k) => k !== 0 && !ev.includes(k) && k !== fs[0]);
          const ld = dk.length === 1 ? leadOf(L[dk[0]]) : null;
          if (!ld || TWL.some((t) => hasWord(ld, t)) || DAYS.some((d) => hasWord(ld, d)) || /\b(morning|afternoon|recess|lunch|night)\b/i.test(ld)) f.push(`${vt}: the detail sentence does not open with a place or a manner phrase and its comma`);
        }
      }
      if (ver === 'l2' && s.l1 && s.l1.length === 5) {
        const ev1 = s.l1.filter((x) => leadOf(x) && TW_READ.includes(leadOf(x).toLowerCase())).map((x) => x.replace(/^[^,]+, /, ''));
        const ev2 = ev.map((k) => L[k].replace(/^[^,]+, /, ''));
        if (ev1.join('|') !== ev2.join('|')) f.push(`${tag}: the events of level 2 are not those of level 1`);
        if (L[0] !== s.l1[0]) f.push(`${tag}: the beginning of level 2 is not that of level 1`);
        if (nw <= words(s.l1.join(' ')).length + words(s.end.right).length) f.push(`${tag}: the level-2 story is not longer than the level-1 story`);
      }
      // the title names no word of the feeling sentence, nor of the right ending unless both wrong ones carry it
      const tw = content(s.title);
      if (fs.length === 1) content(L[fs[0]]).filter((w) => tw.includes(w)).forEach((w) => f.push(`${vt}: the title names "${w}" of the feeling sentence`));
    }
    const E = s.end || {};
    const opts = [E.right, E.newEvent, E.again];
    if (opts.some((o) => !o || sentencesOf(o).length !== 1 || !/^[A-Z]/.test(o) || !/\.$/.test(o))) f.push(`${tag}: an ending choice is not one sentence with a capital and a period`);
    if (opts.some((o) => o && feelsIn(o))) f.push(`${tag}: an ending choice tells a feeling (it would point at the ending)`);
    if (opts.some((o) => o && o.length > 60)) f.push(`${tag}: an ending choice is longer than 60 letters (one line at 20 px)`);
    if (E.right && !fitsRows(E.right, WR, 4, null)) f.push(`${tag}: the sample ending does not fit three rows (level 3 writes it on four)`);
    if (E.right && (s.l2 || []).some((x) => leadOf(x) === leadOf(E.right) && leadOf(x) === 'Finally')) f.push(`${tag}: the ending opens with Finally after an event that opens with Finally`);
    content(s.title).filter((w) => content(E.right || '').includes(w) && !(content(E.newEvent || '').includes(w) && content(E.again || '').includes(w))).forEach((w) => f.push(`${tag}: the title names "${w}" of the right ending, and not every wrong choice carries it`));
    // the beginning again tells the beginning in other words; every choice shares a word with the story
    if (E.again && (E.again === s.l1[0] || content(E.again).filter((w) => content(s.l1[0]).includes(w)).length < 2)) f.push(`${tag}: the "beginning again" choice is the beginning word for word or shares too little with it`);
    if (opts.some((o) => o && !content(o).some((w) => content(s.l1.join(' ') + ' ' + s.l2.join(' ')).includes(w)))) f.push(`${tag}: an ending choice shares no word with the story`);
    // no choice is the only one that shares a word with each of the other two (the right one least of all)
    const P = opts.map((o) => content(o || '')), sh = (i, j) => P[i].some((x) => P[j].includes(x)), both = (i) => [0, 1, 2].every((j) => j === i || sh(i, j));
    if (both(0) && !both(1) && !both(2)) f.push(`${tag}: the right ending is the only choice that shares a word with each wrong one`);
    if (!s.topic || typeof s.topic !== 'string') f.push(`${tag}: no topic`);
  });
  // over the pool: the length, the opening words, and two choices that open alike find the right ending on a third of
  // the stories at most (ruling E; verify() runs its own copy); the right endings and the new events share their openers
  if (S.length && S.every((s) => s.end && s.end.right && s.end.newEvent && s.end.again)) endingTells(S).forEach((x) => f.push('stories: ' + x));
  const rFirst = S.map((s) => words(s.end.right)[0]), nFirst = S.map((s) => words(s.end.newEvent)[0]);
  if (new Set(rFirst.filter((w) => nFirst.includes(w))).size < 3) f.push('stories: the right endings and the new events share fewer than three opening words (an opener tells the ending)');
  // the places of the right ending and the orders of the events over the copies of a level
  [1, 2, 3].forEach((lv) => { seqFaults(AT_SEQ[lv], [0, 1, 2], `the place of the right ending (level ${lv})`).forEach((x) => f.push(x)); seqFaults(EV_SEQ[lv], [0, 1, 2, 3], `the order of the events (level ${lv})`).forEach((x) => f.push(x)); });
  // the feeling sentence stands in several places (never one place in more than half of the stories)
  for (const ver of ['l1', 'l2']) { const at = S.map((s) => (s[ver] || []).findIndex((x) => feelsIn(x))); const most2 = Math.max(...[...new Set(at)].map((k) => at.filter((x) => x === k).length)); if (new Set(at).size < 3 || most2 > S.length / 2) f.push(`stories (${ver}): the feeling sentence stands in too few places`); }

  // ---- ideas (prompts) and example ideas
  if (ID.length < 6 || EX.length < 4) f.push('ideas: fewer than 6 prompts or fewer than 4 example ideas');
  const W631 = WR, W318 = PWH;
  [...ID, ...EX].forEach((d) => {
    const isEx = EX.includes(d), tag = `${isEx ? 'example idea' : 'idea'} "${d.id}"`, p = d.plan || {};
    if (/\b(christmas|halloween|easter|hanukkah|church|god|birthday|vacation|trip|my dog|my cat|my brother|my sister|my house|tooth|teeth)\b/i.test(d.idea)) f.push(`${tag}: the idea assumes a holiday, a belief, a trip, a pet, a sibling, a house, or a lost tooth`);
    for (const k of ['who', 'where', 'first', 'next', 'last', 'felt']) if (!p[k] || /[.?!]$/.test(p[k]) || /^[A-Z]/.test(p[k]) && k !== 'who' && k !== 'where') f.push(`${tag}: the plan note "${k}" is missing, ends with a mark, or starts with a capital`);
    // the notes fit the planner: who and where on two half-width rows (three with one to spare); the events after
    // "First, I" and "First," on one row; the feeling after "At the end, I felt" and "I felt" on one row
    for (const k of ['who', 'where']) if (p[k] && !fitsRows(cap1(p[k]), W318, 3, null)) f.push(`${tag}: the note "${p[k]}" does not fit two half rows`);
    if (p.where && (!/\b(class|recess|gym|art|music|math|playground|library|room|yard|park|lunch)\b/.test(p.where) || !(DAYS.some((x) => hasWord(p.where, x)) || /recess|lunch|morning|afternoon/.test(p.where)))) f.push(`${tag}: the where-and-when note "${p.where}" does not name a place and a time`);
    ['first', 'next', 'last'].forEach((k, i) => { if (p[k] && (!fitsRows(p[k], W631, 2, PLAN_START[1][k]) || !fitsRows('I ' + p[k], W631, 2, PLAN_START[2][k]) || !fitsRows('I ' + p[k], W631, 2, null))) f.push(`${tag}: the event note "${p[k]}" does not fit one row after its starter`); if (p[k] && twCount(p[k])) f.push(`${tag}: the event note "${p[k]}" holds a time word`);
      // level 3 writes each note with its time word (First, I ...) on one row of the planner
      if (p[k] && !isEx && !fitsRows(PLAN_TW[i] + ', I ' + p[k], PW, 2, null)) f.push(`${tag}: the level-3 event "${PLAN_TW[i]}, I ${p[k]}" does not fit one row`); });
    if (p.felt && (!fitsRows(p.felt, PW, 2, PLAN_START[1].felt) || !fitsRows(p.felt, PW, 2, PLAN_START[2].felt) || !fitsRows('I felt ' + p.felt, PW, 2, null))) f.push(`${tag}: the feeling note does not fit one row`);
    if (p.felt && !feelsIn(p.felt)) f.push(`${tag}: the feeling note names no feeling`);
    if (isEx) {
      // the tiny model: three lines at most, time words First, Next, Last, a feeling at the end
      if (!d.model || d.model.length > 210) f.push(`${tag}: no model, or a model longer than 210 letters (three printed lines)`);
      const ms = sentencesOf(d.model || '');
      if (!/^On [A-Z][a-z]+$/.test(leadOf(ms[0] || '') || '') || ms.slice(1).map(leadOf).join() !== 'First,Next,Last,At the end') f.push(`${tag}: the model's sentences do not open with First, Next, Last, and At the end`);
      if (!feelsIn(ms[ms.length - 1] || '')) f.push(`${tag}: the model's ending tells no feeling`);
      const r = d.revise || {};
      if (!/\?$/.test(r.asked || '') || !/^[A-Z]/.test(r.asked || '')) f.push(`${tag}: the partner's question is not a question`);
      for (const k of ['added', 'fixed']) if (!/^[A-Z].*[.!]$/.test(r[k] || '') || sentencesOf(r[k]).length !== 1) f.push(`${tag}: the sample "${k}" is not one sentence`);
      if (!r.liked || /[.?!]$/.test(r.liked) || /^[A-Z]/.test(r.liked)) f.push(`${tag}: the sample "liked" is not a note after "My partner liked:"`);
      // what the partner asked and liked fit one full row and two rows of a card of a pair (level 3); the detail added two
      // rows; the sentence fixed one row (each with a row to spare)
      for (const [k, w, n] of [['asked', W631, 2], ['asked', PAIR_R, 3], ['liked', W631, 2], ['liked', PAIR_R, 3], ['added', W631, 3], ['fixed', W631, 2]]) if (r[k] && !fitsRows(r[k], w, n, null)) f.push(`${tag}: the sample "${k}" does not fit ${n - 1} rows of ${w} px`);
    } else {
      const d1 = d.draft1 || {}, d2 = d.draft2 || {};
      if (!d1.beginning || !fitsRows(d1.beginning, W631, 3, DRAFT_START.beginning) || !/[.!]$/.test(d1.beginning)) f.push(`${tag}: no level-1 beginning that fits two rows after "One day,"`);
      // after "One day," the sentence goes on with I or a small letter (never a second time phrase such as "On Monday")
      if (d1.beginning && !/^(I\b|[a-z])/.test(d1.beginning)) f.push(`${tag}: the level-1 beginning does not continue "One day,"`);
      if (!d2.beginning || !fitsRows(d2.beginning, W631, 3, null) || !/^On (a [a-z]+ )?[A-Z][a-z]+, /.test(d2.beginning)) f.push(`${tag}: the beginning of the sample does not open with its day or does not fit two rows`);
      if (!d2.middle || !fitsRows(d2.middle, W631, 4, null)) f.push(`${tag}: the middle of the sample does not fit three rows`);
      const ms = sentencesOf(d2.middle || '');
      if (ms.length !== 3 || ms.map(leadOf).join() !== 'First,Next,Last') f.push(`${tag}: the middle of the sample is not three sentences that open with First, Next, Last`);
      if (!d2.ending || !fitsRows(d2.ending, W631, 3, null) || !/^At the end, /.test(d2.ending)) f.push(`${tag}: the ending of the sample does not open with "At the end," or does not fit two rows`);
      if (!feelsIn(d2.ending || '')) f.push(`${tag}: the sample tells no thought or feeling (the page asks for one)`);
      // level 3 asks for one detail: the sample names its words, and they stand in it
      if (!d2.detail || ![d2.beginning, d2.middle, d2.ending].join(' ').includes(d2.detail) || d2.detail.split(' ').length < 2) f.push(`${tag}: the sample names no detail of its own (level 3 asks for one)`);
      ['first', 'next', 'last'].forEach((k, i) => { if (p[k] && !fitsRows(p[k] + '.', W631, 2, DRAFT_START.events[i])) f.push(`${tag}: the level-1 event "${p[k]}" does not fit its row`); });
      if (p.felt && !fitsRows(p.felt + '.', W631, 3, DRAFT_START.ending)) f.push(`${tag}: the level-1 ending does not fit its two rows`);
      if (!Array.isArray(d.theme) || !d.theme.length) f.push(`${tag}: no theme words`);
    }
  });
  if (new Set([...ID, ...EX].map((d) => d.id)).size !== ID.length + EX.length) f.push('ideas: an id stands twice');
  // ---- G2-575 detail examples
  if (DT.length < 14) f.push('details: fewer than 14 examples of adding a detail');
  DT.forEach((x) => {
    const tag = `detail "${x.id}"`;
    if (!/^[A-Z].*\.$/.test(x.plain || '') || !/^[A-Z].*\?$/.test(x.asked || '') || !/^[A-Z].*\.$/.test(x.added || '')) f.push(`${tag}: not a sentence, a question, and a sentence`);
    if ([x.plain, x.asked, x.added].some((t) => t && (EX_ROWS[1] + ' ' + t).length > 62)) f.push(`${tag}: a row of the example is longer than one line`);
    if (x.added && content(x.added).every((w) => content(x.plain).includes(w))) f.push(`${tag}: the added sentence adds nothing`);
  });
  if (new Set(DT.map((x) => x.id)).size !== DT.length) f.push('details: an id stands twice');
  // ---- G2-574 stories to edit (written RIGHT: the factory plants every mistake)
  if (ED.length < 14) f.push('edit stories: fewer than 14');
  ED.forEach((e) => {
    const tag = `edit story "${e.id}"`, L = e.sents || [];
    if (L.length !== 6) { f.push(`${tag}: not six sentences`); return; }
    L.forEach((x, k) => {
      if (sentencesOf(x).length !== 1 || !/^[A-Z]/.test(x) || !/\.$/.test(x)) f.push(`${tag}: sentence ${k + 1} is not one sentence with a capital and a period`);
      // no other capital inside a sentence than I, the name, and the capital after an opening time word's comma (none)
      const inner = x.slice(1).match(/\b[A-Z][a-z]*/g) || [];
      if (inner.some((w) => w !== 'I' && w !== e.name)) f.push(`${tag}: sentence ${k + 1} has a capital inside it that is not I or the name`);
      if (DAYS.some((d) => hasWord(x, d))) f.push(`${tag}: sentence ${k + 1} names a day or a month (a name printed right)`);
      // no word whose capital is a matter of taste (field day): a child who capitalizes it makes a fix nobody counted
      { const w = TC.find((t) => hasWord(x, t)); if (w) f.push(`${tag}: sentence ${k + 1} holds "${w}", a word some writers capitalize`); }
      const ld = leadOf(x); if (/^(First|Next|Then|After that|Later|Finally|At the end)\b/.test(x) && !ld) f.push(`${tag}: sentence ${k + 1} opens with a time word without its comma`);
      if (!fitsRows(x, WR, 3, null)) f.push(`${tag}: sentence ${k + 1} does not fit two rows when it is written again`);
      if (x.length > 52) f.push(`${tag}: sentence ${k + 1} is longer than one strip (52 letters)`);
    });
    if (L.filter((x) => hasWord(x, e.name)).length !== 1 || countPhrase(L.join(' '), e.name) !== 1) f.push(`${tag}: the name ${e.name} does not stand exactly once`);
    const nameAt = L.findIndex((x) => hasWord(x, e.name));
    if (nameAt >= 0 && (nameAt === 1 || nameAt === 5 || L[nameAt].startsWith(e.name))) f.push(`${tag}: the name stands in a sentence that may be moved, or at the start of a sentence`);
    if (leadOf(L[1]) !== 'First' || !/^(At the end|Finally)\b/.test(L[5])) f.push(`${tag}: sentence 2 does not open with First, or the last does not open with At the end or Finally`);
    if (leadOf(L[2]) !== 'Next' || leadOf(L[3]) !== 'Then') f.push(`${tag}: sentences 3 and 4 do not open with Next and Then`);
    if ([L[0], L[4]].some((x) => /^(First|Next|Then|After that|Later|Finally|At the end)\b/.test(x))) f.push(`${tag}: the beginning or the detail opens with a time word`);
    // a sentence that starts with I cannot take a planted small letter; at least two others (never moved) can
    if (L.filter((x, k) => k !== nameAt && k !== 1 && k !== 5 && !/^I\b/.test(x)).length < 2) f.push(`${tag}: too few sentences can take a small first letter`);
    // the two sentences written again (the one with a small first letter and the name sentence, in the story's order)
    // fit the rows of level 3 (five, one to spare) whichever sentence takes the small first letter
    L.forEach((x, k) => { if (k === nameAt || /^I\b/.test(x) || nameAt < 0) return; const both = (k < nameAt ? [x, L[nameAt]] : [L[nameAt], x]).join(' '); if (!fitsRows(both, WR, 5, null)) f.push(`${tag}: sentences ${k + 1} and ${nameAt + 1} together do not fit four rows`); });
    if (!e.off || !/^[A-Z].*\.$/.test(e.off) || content(e.off).some((w) => content(L.join(' ')).includes(w)) || e.off.length > 52) f.push(`${tag}: the sentence that does not belong is not a short sentence that shares no word with the story`);
    { const w = TC.find((t) => hasWord(e.off || '', t)); if (w) f.push(`${tag}: the sentence that does not belong holds "${w}", a word some writers capitalize`); }
    if (!e.topic) f.push(`${tag}: no topic`);
  });
  if (new Set(ED.map((e) => e.id)).size !== ED.length) f.push('edit stories: an id stands twice');
  // ---- nothing to copy across a lesson (WRITING-PAGES.md rule 12): the topics are all different, and no day-1 piece, no
  // example and no model of the notes carries the theme words of a prompt
  const ALL = [...S.map((s) => ['story', s.id, s.topic]), ...ID.map((d) => ['idea', d.id, d.topic]), ...EX.map((d) => ['example idea', d.id, d.topic]), ...DT.map((d) => ['detail', d.id, d.topic]), ...ED.map((e) => ['edit story', e.id, e.topic]), ...MO.map((m) => ['model of the notes', m.lesson, m.topic])];
  const seen = new Map(); ALL.forEach(([w, id, t]) => { if (seen.has(t)) f.push(`${w} "${id}" shares its topic "${t}" with ${seen.get(t)}`); else seen.set(t, `${w} "${id}"`); });
  const THEME = ID.flatMap((d) => d.theme || []);
  const pieces = [...S.map((s) => [`story "${s.id}"`, [s.title, ...s.l1, ...s.l2, s.end.right].join(' ')]), ...EX.map((d) => [`example idea "${d.id}"`, [d.idea, d.model, ...Object.values(d.plan)].join(' ')]), ...DT.map((x) => [`detail "${x.id}"`, [x.plain, x.asked, x.added].join(' ')]), ...ED.map((e) => [`edit story "${e.id}"`, [e.title, ...e.sents, e.off].join(' ')])];
  pieces.forEach(([w, t]) => THEME.filter((x) => hasWord(t, x)).forEach((x) => f.push(`${w} holds "${x}", a theme word of a prompt`)));
  // the models of the teacher notes are on no page
  const allText = JSON.stringify({ S, ID, EX, DT, ED }).toLowerCase();
  MO.forEach((m) => (m.words || []).forEach((w) => { if (allText.includes(w.toLowerCase())) f.push(`the model of the notes "${m.topic}" is on a page ("${w}")`); }));
  // every level of every page can be drawn
  if (!f.length) for (const mode of Object.keys(LEVELS)) for (const lv of [1, 2, 3]) for (let s = 1; s <= 8; s++) {
    try { plan(b, mode, lv, makeRng('sw2|' + mode + '|' + lv + '|' + s), s); } catch (e) { f.push(`${mode} level ${lv} cannot be drawn: ${e.message}`); break; }
  }
  return f;
}

/* ------------------------------------------------------------------ levels */
const LEVELS = {
  read: { 1: { ver: 'l1', end: 'pick' }, 2: { ver: 'l2', end: 'pick' }, 3: { ver: 'l2', end: 'write' } },
  plan: { 1: { start: 1 }, 2: { start: 2 }, 3: { start: 3, bank: true } },
  draft: { 1: { start: true, lines: { beginning: 3, middle: 4, ending: 3 } }, 2: { strip: true, lines: { beginning: 3, middle: 4, ending: 3 } }, 3: { bank: true, lines: { beginning: 3, middle: 4, ending: 3 } } },
  // pad: the room above the text of a strip (26 px clear above its letters: ROOM); level 3 prints the story as one
  // paragraph (a missing end mark is found by reading, not at the end of a strip), its lines 50 px apart
  edit: { 1: { caps: 2, ends: 2, move: false, off: false, rows: 5, pad: 23 }, 2: { caps: 3, ends: 2, move: true, off: false, rows: 5, pad: 17 }, 3: { caps: 3, ends: 3, move: true, off: true, rows: 5, para: true } },
  // level 3: what the partner liked first (a compliment, then a question), the two side by side
  revise: { 1: { checks: 3, qwords: true, rows: { asked: 2, added: 3, fixed: 3 } }, 2: { checks: 5, rows: { asked: 2, added: 3, fixed: 2 } }, 3: { checks: 6, rows: { liked: 3, asked: 3, added: 3, fixed: 2 }, liked: true, pair: true } },
};

/* ------------------------------------------------------------------ what a page holds */
/** copy v takes item v of a fixed order of a pool: copies step through the bank */
const stepOf = (pool, key, v) => { const order = makeRng('sw2-order|' + key).shuffle(pool); return order[(Math.max(1, v) - 1) % order.length]; };
/** the place of the right ending over the copies of a level (G2-571): each place six times in eighteen copies, never three
 *  in a row, no staircase; copy v takes place v of this fixed order (a class set shows no favourite place) */
const AT_SEQ = Object.fromEntries([1, 2, 3].map((lv) => {
  const r = makeRng('sw2-at|' + lv);
  for (let t = 0; t < 5000; t++) {
    const p = r.shuffle([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2]), q = [...p, ...p.slice(0, 2)];
    if (q.every((x, i) => i < 2 || !((x === q[i - 1] && x === q[i - 2]) || (q[i - 1] === q[i - 2] + 1 && x === q[i - 1] + 1) || (q[i - 1] === q[i - 2] - 1 && x === q[i - 1] - 1)))) return [lv, p];
  }
  throw new Error('no order for the places of the endings');
}));
/** the orders the events of G2-571 are printed in (top to bottom: the event printed first, second, third), never in order
 *  and never backward; each order five times in twenty copies, never three in a row; copy v takes order v of this fixed
 *  sequence (a class set shows every event at every place) */
const EV_ORDERS = [[1, 2, 0], [2, 0, 1], [0, 2, 1], [1, 0, 2]];
const EV_SEQ = Object.fromEntries([1, 2, 3].map((lv) => {
  const r = makeRng('sw2-ev|' + lv);
  for (let t = 0; t < 5000; t++) {
    const p = r.shuffle([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3]), q = [...p, ...p.slice(0, 2)];
    if (q.every((x, i) => i < 2 || !(x === q[i - 1] && x === q[i - 2]))) return [lv, p];
  }
  throw new Error('no order for the events');
}));
function plan(b, mode, lv, rng, v) {
  const d = LEVELS[mode][lv];
  v = Number(v) || rng.int(1, 20);
  if (mode === 'read') {
    const st = stepOf(b.stories, 'read|' + lv, v), sents = st[d.ver];
    const ev = sents.map((s, k) => (leadOf(s) && TW_READ.includes(leadOf(s).toLowerCase()) ? k : -1)).filter((k) => k >= 0);
    const feel = sents.findIndex((s) => feelsIn(s));
    // the events are printed never in order and never backward: 2-3-1, 3-1-2, 1-3-2, or 2-1-3 by the copy (the key numbers them)
    const shown = EV_ORDERS[EV_SEQ[lv][(v - 1) % EV_SEQ[lv].length]];
    const at = AT_SEQ[lv][(v - 1) % AT_SEQ[lv].length], opts = shuffle([st.end.newEvent, st.end.again], rng); opts.splice(at, 0, st.end.right);
    return { mode, lv, story: st, sents, ev, feel, shown, opts, list: ['story:' + st.id, 'ev:' + shown.join(''), 'end:' + (d.end === 'pick' ? opts.map((o) => (o === st.end.right ? 'R' : o === st.end.newEvent ? 'N' : 'A')).join('') : 'write')] };
  }
  if (mode === 'plan') {
    const combos = []; b.ideas.forEach((a) => b.ideas.forEach((c) => { if (a !== c) b.exampleIdeas.forEach((x) => combos.push([a, c, x])); }));
    const [a, c, x] = stepOf(combos, 'plan|' + lv, v);
    return { mode, lv, ideas: [a, c], ex: x, list: ['idea:' + a.id, 'idea:' + c.id, 'ex:' + x.id] };
  }
  if (mode === 'draft') {
    const combos = []; b.ideas.forEach((a) => b.exampleIdeas.forEach((x) => combos.push([a, x])));
    const [a, x] = stepOf(combos, 'draft|' + lv, v);
    return { mode, lv, idea: a, ex: x, list: ['idea:' + a.id, 'ex:' + x.id] };
  }
  if (mode === 'edit') {
    const st = stepOf(b.editStories, 'edit|' + lv, v), S = st.sents, N = S.length;
    const nameAt = S.findIndex((s) => hasWord(s, st.name));
    for (let t = 0; t < 2000; t++) {
      // the moved sentence (levels 2 and 3): the First sentence put after a later one, or the last sentence put before an
      // earlier one; its time word alone tells where it belongs
      let order = [...Array(N).keys()], moved = -1;
      if (d.move) {
        if (rng.int(0, 1)) { moved = 1; const to = rng.int(2, 4); order = order.filter((k) => k !== 1); order.splice(to, 0, 1); }
        else { moved = N - 1; const to = rng.int(2, 4); order = order.filter((k) => k !== N - 1); order.splice(to, 0, N - 1); }
      }
      // the sentence that does not belong (level 3): never first, never last
      let offAt = -1; if (d.off) { offAt = rng.int(1, N - 1); order.splice(offAt, 0, 'off'); }
      const free = (k) => k !== nameAt && k !== moved;
      const startOk = (k) => free(k) && !/^I\b/.test(S[k]);
      const pickA = shuffle([...Array(N).keys()].filter(startOk), rng);
      if (!pickA.length) continue;
      const A1 = pickA[0];
      const C1 = d.caps === 3 ? shuffle([...Array(N).keys()].filter((k) => startOk(k) && k !== A1), rng)[0] : -1;
      const D1 = d.ends === 3 ? shuffle([...Array(N).keys()].filter((k) => free(k) && k !== A1 && k !== C1), rng)[0] : -1;
      if ((d.caps === 3 && C1 === undefined) || (d.ends === 3 && D1 === undefined)) continue;
      // the places of the two sentences with two mistakes are not neighbours on the strip
      const posOf = (k) => order.indexOf(k);
      if (Math.abs(posOf(A1) - posOf(nameAt)) < 2) continue;
      const marks = {}; [...Array(N).keys()].forEach((k) => { marks[k] = { start: k === A1 || k === C1, name: k === nameAt, end: k === A1 || k === nameAt || k === D1 }; });
      // the items of a copy name its story with every planted place (two copies of other stories share nothing)
      const id = st.id;
      return { mode, lv, story: st, order, moved, nameAt, A: A1, C: C1, D: D1, marks, list: ['edit:' + id, `A:${id}:${A1}`, `B:${id}:${nameAt}`, ...(C1 >= 0 ? [`C:${id}:${C1}`] : []), ...(D1 >= 0 ? [`D:${id}:${D1}`] : []), ...(moved >= 0 ? [`order:${id}:${order.join('')}`] : [])] };
    }
    throw new Error('no page of mistakes for ' + st.id);
  }
  if (mode === 'revise') {
    const x = stepOf(b.details, 'revise|' + lv, v);
    const sample = b.exampleIdeas[rng.int(0, b.exampleIdeas.length - 1)];
    return { mode, lv, detail: x, sample, list: ['detail:' + x.id, 'sample:' + sample.id] };
  }
  throw new Error('story-writing-g2: no plan for ' + mode);
}

{ const f = faultsOf(BANK); if (f.length) throw new Error('story-writing-g2.en.json: ' + f.join('; ')); }

/* ------------------------------------------------------------------ the parts of a page */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}[data-lcs-label] b,[data-lcs-ruletext] b{color:' + T.teal + ';font-weight:800}</style>';   // before the root: verify counts the root's children as blocks
/** ligatures are off by the font features; in the body font an f before i, f, l, or t and a t before t still touch the
 *  next letter, so each gets FROOM px (1 px at most more than the normal gap); the heading font (Baloo 2, the elements
 *  marked data-lcs-noroom) gets none: a word there is never split. Text inside tags is left alone; the SVG text of the rows
 *  is done when the row is drawn. */
function fRoom(html) {
  let out = '', i = 0, inSvg = 0, skip = null;
  while (i < html.length) {
    if (html[i] === '<') {
      const j = html.indexOf('>', i), tag = html.slice(i, j + 1);
      if (/^<svg\b/.test(tag)) inSvg++; if (/^<\/svg>/.test(tag)) inSvg--;
      if (!skip && /\sdata-lcs-noroom[\s>=]/.test(tag)) skip = tag.match(/^<(\w+)/)[1];
      else if (skip && tag === `</${skip}>`) skip = null;
      out += tag; i = j + 1; continue;
    }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += inSvg || skip ? text : text.replace(/f(?=[iflt])|t(?=t)/g, (m) => `<span data-lcs-fsep style="margin-right:${FROOM}px">${m}</span>`);
    i = j < 0 ? html.length : j;
  }
  return out;
}
/** the same room in the SVG text of a row: the letter after an f or a t moves FROOM px (a tspan of its own) */
const svgRoom = (s) => `<tspan>${String(s).replace(/(f(?=[iflt])|t(?=t))/g, `$1</tspan><tspan dx="${FROOM}" data-lcs-fsep="1">`)}</tspan>`;
/** typographic apostrophes and quotation marks in the TEXT of a page or a key (never in a tag or an attribute) */
function typo(html) {
  let out = '', i = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += text.replace(/'/g, '’').replace(/"/g, (m, k, s) => (k === 0 || /[\s([—]/.test(s[k - 1]) ? '“' : '”'));
    i = j < 0 ? html.length : j;
  }
  return out;
}
const cream = (attrs, inner, pad = 7, gap = 5, more = '') => `<div ${attrs} data-lcs-card style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (k, html, extra = '') => `<div data-lcs-label style="font:700 ${LABEL}px/1.3 'Nunito',sans-serif;color:${T.ink}">${k ? `<span data-lcs-labelnum style="color:${T.teal}">${k}.</span> ` : ''}${html}${extra}</div>`;
/** a key's note (a sample, what else is right): printed on the key, kept hidden on the child's page so that the key has
 *  the geometry of its page (verify() measures that the room it keeps there is no blank band) */
const note = (text, key, size = 14) => ` <span data-lcs-vary style="font-size:${size}px;color:${T.coral};${key ? '' : 'visibility:hidden'}"${key ? '' : ' aria-hidden="true"'}>${esc(text)}</span>`;
/** a row of the key's notes under a task line (13 px) */
const alsoRow = (notes, key) => `<div data-lcs-also style="font:700 13px/1.1 'Nunito',sans-serif;padding:0 10px">${notes.map((t) => note(t, key, 13)).join('').slice(1)}</div>`;
/** a Grade 2 handwriting row; a starter printed on it in ink, the key's text in teal after it (both seated on the base rule
 *  at the size whose x-height fills the band between the dotted midline and the base) */
function row({ w, starter, answer, attrs = '' }) {
  let svg = rowSvg(w, ROW);
  const r = rulesOf(svg), y = r.base.toFixed(2);
  const ax = starter ? 8 + starterW(starter) + Math.round(0.3 * KEYPX) : 8;
  const txt = (s, x, fill, kind) => `<text x="${x.toFixed(1)}" y="${y}" font-family="${esc(FONT)}" font-size="${KEYPX}" font-weight="700" fill="${fill}" data-lcs-${kind}="1">${svgRoom(esc(s))}</text>`;
  const end = svg.lastIndexOf('</svg>');
  svg = svg.slice(0, end) + (starter ? txt(starter, 8, T.ink, 'starttext') : '') + (answer ? txt(answer, ax, T.teal, 'keytext') : '') + svg.slice(end);
  return `<div data-lcs-line${answer ? ` data-lcs-answer="${A(answer)}"` : ''}${starter ? ` data-lcs-starter="${A(starter)}"` : ''} ${attrs} style="flex:0 0 auto;width:${w}px;height:${ROW}px;line-height:0">${svg}</div>`;
}
/** n rows for one text the child writes (a starter on the first); the key spreads its sample over them at a child's
 *  letter width, leaving the last row free */
function writeGroup({ n, w, text, starter, key, attrs = '' }) {
  const caps = Array.from({ length: n - 1 }, (_, i) => capOf(w, i === 0 ? starter : null));
  const parts = key ? spread(text, caps) : [];
  if (key && !parts) throw new Error(`the sample "${text}" does not fit ${n - 1} rows of ${w} px`);
  return `<div data-lcs-writes="${n}" data-lcs-expect="${A(text)}" ${attrs} style="display:flex;flex-direction:column;gap:0">` +
    Array.from({ length: n }, (_, i) => row({ w, starter: i === 0 ? starter : null, answer: key ? parts[i] || null : null })).join('') + `</div>`;
}
/** a sentence to circle; the key rings the right one */
const opt = (text, ok, key) => `<span data-lcs-opt="${A(text)}"${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;align-self:flex-start;white-space:nowrap;font:700 ${OPT}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 12px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
const typoRule = (r) => r.split(/(<\/?b>)/).map((p) => (/^<\/?b>$/.test(p) ? p : esc(p))).join('');
const ruleBox = (title, rows, attrs = '') => `<div data-lcs-rulebox data-lcs-card ${attrs} style="display:flex;flex-direction:column;gap:1px;padding:4px 14px 6px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
  `<div data-lcs-boxtitle data-lcs-noroom style="font:700 19px/1.15 'Baloo 2',cursive;color:${T.teal}">${esc(title)}</div>` + rows.map((r) => `<div data-lcs-ruletext style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${typoRule(r)}</div>`).join('') + `</div>`;
/** the checklist: its title on a row of its own, a box to tick before each line; an odd last line takes the whole row */
const checklist = (items, attrs = '') => `<fieldset data-lcs-checklist data-lcs-card ${attrs} style="margin:0;min-width:0;display:grid;grid-template-columns:1fr 1fr;gap:2px 16px;padding:0 14px 5px;border:2px dashed ${T.teal};border-radius:14px;background:#FFFFFF">` +
  `<legend data-lcs-boxtitle data-lcs-noroom style="padding:0 6px;margin-left:-4px;font:700 17px/1.1 'Baloo 2',cursive;color:${T.teal}">${esc(CHECK_LEGEND)}</legend>` +
  items.map((s, i) => `<div data-lcs-check style="${items.length % 2 && i === items.length - 1 ? 'grid-column:1 / -1;' : ''}display:flex;align-items:flex-start;gap:7px;font:700 ${RULEPX}px/1.2 'Nunito',sans-serif;color:${T.ink}"><span data-lcs-tickbox style="flex:0 0 auto;display:inline-block;width:17px;height:17px;margin-top:1px;border:2px solid ${T.ink};border-radius:4px;background:#FFFFFF"></span><span data-lcs-checktext>${esc(s)}</span></div>`).join('') + `</fieldset>`;
const Bw = (w) => `<b style="font-weight:800;color:${T.teal}">${esc(w)}</b>`;
const numBox = (want, key, size = 34) => `<span data-lcs-numbox data-lcs-want="${want}" style="flex:0 0 auto;box-sizing:border-box;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF;font:800 20px/1 'Nunito',sans-serif;color:${T.teal}">${key && want ? want : ''}</span>`;
/** a box to number a sentence inside a paragraph (G2-574 level 3) */
const numBoxIn = (want, key) => `<span data-lcs-numbox data-lcs-want="${want}" style="display:inline-flex;vertical-align:text-bottom;box-sizing:border-box;width:26px;height:26px;margin-right:6px;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF;font:800 18px/1 'Nunito',sans-serif;color:${T.teal}">${key && want ? want : ''}</span>`;

/* ------------------------------------------------------------------ the blocks of each page */
function render(P, key) {
  const b = [];
  if (P.mode === 'read') {
    const d = LEVELS.read[P.lv], st = P.story;
    b.push(ruleBox('A true story', RULES.read));
    // the story: every sentence a span; the time words in spans of their own (the key rings them: the ring is placed
    // absolutely and takes no room); the feeling sentence underlined on the key only
    const html = P.sents.map((s, k) => {
      const ev = P.ev.includes(k), lead = ev ? leadOf(s) : null;
      const inner = ev ? `<span data-lcs-tw="${A(lead)}" style="position:relative">${esc(lead)}${key ? `<span data-lcs-ring style="position:absolute;left:-4px;right:-4px;top:-1px;bottom:-2px;border:2.5px solid ${T.teal};border-radius:999px"></span>` : ''}</span>${esc(s.slice(lead.length))}` : esc(s);
      const fe = k === P.feel;
      return `<span data-lcs-sent="${k}"${fe ? ` data-lcs-feel="1" style="${key ? `text-decoration:underline;text-decoration-color:${T.teal};text-decoration-thickness:3px;text-underline-offset:5px` : ''}"` : ''}>${inner}</span>`;
    }).join(' ');
    const fs = P.lv === 1 ? STORY1 : READ;
    b.push(`<div data-lcs-card data-lcs-story="${A(st.id)}" style="padding:6px 16px 8px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div data-lcs-stitle data-lcs-noroom style="font:700 21px/1.2 'Baloo 2',cursive;color:${T.ink}">${esc(st.title)}</div><div data-lcs-stext data-lcs-read style="font:700 ${fs}px/1.62 'Nunito',sans-serif;color:${T.ink}">${html}</div></div>`);
    b.push(cream('data-lcs-task="mark"', `<div data-lcs-item>${label(1, esc(LINES.markTW))}</div><div data-lcs-item>${label(2, esc(LINES.markFeel[P.lv]))}</div>`, 6, 3));
    const evText = (k) => cap1(P.sents[P.ev[k]].replace(/^[^,]+, /, ''));
    b.push(cream('data-lcs-task="order"', label(3, esc(LINES.order)) + `<div style="display:flex;flex-direction:column;gap:5px">` +
      P.shown.map((k) => `<div data-lcs-item data-lcs-ev="${k}" style="display:flex;gap:10px;align-items:center;padding:5px 10px;border-radius:12px;background:#FFFFFF">${numBox(k + 1, key, 36)}<span data-lcs-read data-lcs-evtext style="flex:1 1 auto;min-width:0;font:700 ${P.lv === 1 ? STORY1 : READ}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(evText(k))}</span></div>`).join('') + `</div>`, 7, 5));
    if (d.end === 'pick') {
      b.push(cream(`data-lcs-task="end" data-lcs-right="${A(st.end.right)}"`, label(4, esc(LINES.endPick)) + `<div data-lcs-item data-lcs-opts style="display:flex;flex-direction:column;gap:9px;padding:6px 10px;border-radius:12px;background:#FFFFFF">${P.opts.map((o) => opt(o, o === st.end.right, key)).join('')}</div>`, 7, 5));
    } else {
      b.push(cream('data-lcs-task="endwrite"', label(4, esc(LINES.endWrite) + note(NOTES.endWrite, key)) + `<div data-lcs-item style="padding:0 10px">${writeGroup({ n: 4, w: WR, text: st.end.right, key })}</div>`, 7, 4));
    }
  }
  if (P.mode === 'plan') {
    const d = LEVELS.plan[P.lv], x = P.ideas[0].plan, ex = P.ex.plan, S = PLAN_START[d.start] || {};
    // the key's sample plan is for idea A: the note "(the sample plan)" stands in that idea's box (it names the prompt)
    b.push(cream('data-lcs-task="ideas"', label(1, esc(LINES.ideas)) +
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 14px">` + P.ideas.map((i, k) => `<div data-lcs-item data-lcs-idea="${A(i.id)}" style="display:flex;gap:8px;align-items:center;padding:3px 10px;border-radius:12px;background:#FFFFFF"><span data-lcs-num style="font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.teal}">${IDEA_MARK[k]}</span><span data-lcs-read data-lcs-ideatext style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(i.idea)}${k === 0 ? note(SAMPLE_PLAN, key) : ''}</span></div>`).join('') + `</div>` +
      `<div data-lcs-item data-lcs-own style="display:flex;flex-direction:column;gap:0;padding:0 10px"><span data-lcs-rowhead data-lcs-read style="font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.ink}">${IDEA_MARK[2]} ${esc(LINES.own)}</span>${row({ w: WR })}</div>`, 6, 4));
    const head = (k, exText) => `<div data-lcs-rowhead style="display:flex;flex-wrap:wrap;align-items:baseline;gap:0 10px"><span data-lcs-rowname style="font:800 17px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(PLAN_HEAD[k])}</span><span data-lcs-ex style="font:700 ${RULEPX}px/1.25 'Nunito',sans-serif;color:${T.inkSoft}"><i>Example:</i> ${esc(exText)}</span></div>`;
    const evStart = (k) => S[k] || null;
    // level 1 finishes a frame, level 2 writes after a starter, level 3 writes the note with its time word
    const evText = (k, i) => (d.start === 1 ? x[k] : d.start === 2 ? 'I ' + x[k] : PLAN_TW[i] + ', I ' + x[k]);
    const feltStart = S.felt || null, feltText = d.start === 3 ? 'I felt ' + x.felt : x.felt;
    const half = (k) => `<div data-lcs-item data-lcs-row="${k}" style="display:flex;flex-direction:column;gap:0;min-width:0">${head(k, cap1(ex[k]))}${writeGroup({ n: 3, w: PWH, text: cap1(x[k]), key })}</div>`;
    const evRows = ['first', 'next', 'last'].map((k, i) => row({ w: PW, starter: evStart(k), answer: key ? evText(k, i) : null, attrs: `data-lcs-lineexpect="${A(evText(k, i))}"` })).join('') + row({ w: PW });
    const events = `<div data-lcs-item data-lcs-row="events" style="display:flex;flex-direction:column;gap:0">${head('events', 'First, I ' + ex.first + '.')}<div data-lcs-perline="4" style="display:flex;flex-direction:column;gap:0">${evRows}</div></div>`;
    // the example of the feeling matches the level's frame
    const felt = `<div data-lcs-item data-lcs-row="felt" style="display:flex;flex-direction:column;gap:0">${head('felt', (d.start === 1 ? 'At the end, I felt ' : 'I felt ') + ex.felt + '.')}${writeGroup({ n: 2, w: PW, text: feltText, starter: feltStart, key })}</div>`;
    const wb = d.bank ? `<div data-lcs-wordbank data-lcs-ruletext style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${Bw(PLAN_BANK.split(': ')[0] + ':')} ${esc(PLAN_BANK.split(': ').slice(1).join(': '))}</div>` : '';
    // the planner keeps 7 px at each side of its card: its rows are 661 px (31 letters of a child)
    b.push(cream(`data-lcs-task="plan" data-lcs-example="${A(P.ex.id)}"`, `<div style="display:flex;flex-direction:column;gap:4px;padding:0 5px">${label(2, esc(LINES.plan[P.lv]) + note(NOTES.plan, key))}${wb}</div>` + `<div style="display:grid;grid-template-columns:${PWH}px ${PWH}px;gap:0 ${PW - 2 * PWH}px">${half('who')}${half('where')}</div>` + events + felt, 7, 4, 'padding-left:7px;padding-right:7px'));
    b.push(checklist(CHECK.plan));
  }
  if (P.mode === 'draft') {
    const d = LEVELS.draft[P.lv], ex = P.ex;
    // the tiny example: a whole story of an example idea, its time words in teal
    const exHtml = sentencesOf(ex.model).map((s) => { const l = leadOf(s); return l && /^(First|Next|Last|At the end)$/.test(l) ? Bw(l + ',') + esc(s.slice(l.length + 1)) : esc(s); }).join(' ');
    b.push(`<div data-lcs-card data-lcs-example="${A(ex.id)}" style="display:flex;flex-direction:column;gap:2px;padding:3px 14px 4px;border:2.5px solid ${T.creamDeep};border-radius:14px;background:#FFFFFF"><div data-lcs-boxtitle data-lcs-noroom style="font:700 18px/1.15 'Baloo 2',cursive;color:${T.teal}">Example: ${esc(ex.idea)}</div><div data-lcs-read data-lcs-extext style="font:700 ${READ}px/1.32 'Nunito',sans-serif;color:${T.ink}">${exHtml}</div>` +
      (d.strip ? `<div data-lcs-timerow data-lcs-ruletext style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${Bw('Time words:')} ${esc(TIME_ROW.split(': ')[1])}</div>` : '') + `</div>`);
    const x = P.idea, w = WR;
    const sec = (k, html) => `<div data-lcs-item data-lcs-sec="${k}" style="display:flex;flex-direction:column;gap:0;padding:0 10px"><span data-lcs-sechead style="font:800 16px/1 'Nunito',sans-serif;color:${T.teal}">${esc(DRAFT_HEAD[k])}</span>${html}</div>`;
    let beg, mid, end;
    if (d.start) {
      beg = writeGroup({ n: d.lines.beginning, w, text: x.draft1.beginning, starter: DRAFT_START.beginning, key });
      const ev = ['first', 'next', 'last'].map((k, i) => row({ w, starter: DRAFT_START.events[i], answer: key ? x.plan[k] + '.' : null, attrs: `data-lcs-lineexpect="${A(x.plan[k] + '.')}"` }));
      mid = `<div data-lcs-perline="4" style="display:flex;flex-direction:column;gap:0">${ev.join('')}${row({ w })}</div>`;
      end = writeGroup({ n: d.lines.ending, w, text: x.plan.felt + '.', starter: DRAFT_START.ending, key });
    } else {
      beg = writeGroup({ n: d.lines.beginning, w, text: x.draft2.beginning, key });
      mid = writeGroup({ n: d.lines.middle, w, text: x.draft2.middle, key });
      end = writeGroup({ n: d.lines.ending, w, text: x.draft2.ending, key });
    }
    const bankBox = d.bank ? `<div data-lcs-wordbank data-lcs-ruletext style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:0 10px">${Bw('Word bank:')} ${esc(DRAFT_BANK.split(': ')[1])}</div>` : '';
    // the key names the idea of its sample and says what else is right (a row of notes under the task line)
    b.push(cream('data-lcs-task="draft"', label(1, esc(LINES.draft[P.lv])) + alsoRow([SAMPLE_FOR + x.idea + ')', NOTES.draft], key) + `<div data-lcs-idealine data-lcs-idea="${A(x.id)}" data-lcs-read style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink};padding:0 10px">${esc(LINES.draftIdea)} <i>${esc(x.idea)}</i></div>` + bankBox +
      sec('beginning', beg) + sec('middle', mid) + sec('ending', end), 4, 2));
    b.push(checklist(CHECK.draft[P.lv]));
  }
  if (P.mode === 'edit') {
    const d = LEVELS.edit[P.lv], st = P.story, S = st.sents;
    b.push(ruleBox('Find and fix', [...RULES.edit[P.lv], RULES.editCount[P.lv]]));
    // the story: one sentence on each strip (levels 1 and 2), or one paragraph (level 3), with room above every line for a
    // child's capital; the key writes the capital above its small letter and the end mark after the last word (both placed
    // absolutely: they take no room)
    const rank = {}; [...Array(S.length).keys()].forEach((k) => { rank[k] = k + 1; });
    // an f or a t to fix keeps the room it gets before i, f, l, t (inside the mark, so the mark itself takes none)
    const cap = (ch, next) => `<span data-lcs-fixcap="${A(ch.toUpperCase())}" style="position:relative">${(ch === 'f' && /[iflt]/.test(next || '')) || (ch === 't' && next === 't') ? `<span data-lcs-fsep style="margin-right:${FROOM}px">${esc(ch)}</span>` : esc(ch)}${key ? `<span data-lcs-keycap style="position:absolute;left:-1px;top:-0.8em;font:800 16px/1 'Nunito',sans-serif;color:${T.teal}">${esc(ch.toUpperCase())}</span>` : ''}</span>`;
    const endMark = () => `<span data-lcs-fixend style="position:relative;display:inline-block;width:0;height:1em;vertical-align:baseline">${key ? `<span data-lcs-keyend style="position:absolute;left:1px;bottom:-0.12em;font:800 22px/1 'Nunito',sans-serif;color:${T.teal}">.</span>` : ''}</span>`;
    const planted = (k) => {
      const s = S[k], m = P.marks[k];
      let out = '';
      const body = m.end ? s.slice(0, -1) : s;
      if (m.start) { out = cap(body.charAt(0).toLowerCase(), body.charAt(1)) + esc(body.slice(1)); }
      else if (m.name) { const at = body.indexOf(st.name); out = esc(body.slice(0, at)) + cap(st.name.charAt(0).toLowerCase(), st.name.charAt(1)) + esc(st.name.slice(1) + body.slice(at + st.name.length)); }
      else out = esc(body);
      return out + (m.end ? endMark() : '');
    };
    const offStyle = key ? `text-decoration:line-through;text-decoration-color:${T.teal};text-decoration-thickness:3px` : '';
    let story;
    if (d.para) {
      // level 3: the story as one paragraph, a box to number before each sentence; its lines 50 px apart (26 px clear
      // above the letters of each line: verify measures it)
      story = `<div data-lcs-para style="padding:10px 10px 2px;border-radius:12px;background:#FFFFFF;font:700 ${READ + 1}px/50px 'Nunito',sans-serif;color:${T.ink}">` + P.order.map((k) => {
        const off = k === 'off';
        return `<span data-lcs-strip="${off ? 'off' : k}">${numBoxIn(off ? '' : rank[k], key)}<span data-lcs-read data-lcs-striptext style="font:700 ${READ + 1}px/50px 'Nunito',sans-serif;color:${T.ink};${off ? offStyle : ''}">${off ? esc(st.off) : planted(k)}</span></span>`;
      }).join(' ') + `</div>`;
    } else {
      story = `<div style="display:flex;flex-direction:column;gap:${{ 1: 6, 2: 5 }[P.lv]}px">` + P.order.map((k) => {
        const off = k === 'off';
        return `<div data-lcs-item data-lcs-strip="${off ? 'off' : k}" style="display:flex;gap:10px;align-items:flex-end;padding:${d.pad}px 10px 2px;border-radius:12px;background:#FFFFFF">` +
          (d.move ? numBox(off ? '' : rank[k], key, 30) : `<span data-lcs-bullet style="flex:0 0 auto;width:10px;height:10px;margin-bottom:8px;border-radius:50%;background:${T.teal}"></span>`) +
          `<span data-lcs-read data-lcs-striptext style="flex:1 1 auto;min-width:0;white-space:nowrap;font:700 ${READ + 1}px/1.25 'Nunito',sans-serif;color:${T.ink};${off ? offStyle : ''}">${off ? esc(st.off) : planted(k)}</span></div>`;
      }).join('') + `</div>`;
    }
    // the key's line: a ! is right where the sentence can take it (the key prints the period)
    b.push(cream(`data-lcs-task="edit" data-lcs-edit="${A(st.id)}"`, label(1, esc(LINES.edit[P.lv]) + note(NOTES.excl, key)) + `<div data-lcs-etitle style="display:flex;align-items:baseline;gap:12px;padding:0 10px"><span data-lcs-stitle data-lcs-noroom style="font:700 21px/1.15 'Baloo 2',cursive;color:${T.ink}">${esc(st.title)}</span><span data-lcs-byline style="font:700 italic 15px/1.2 'Nunito',sans-serif;color:${T.inkSoft}">${esc(BYLINE)}</span></div>` + story, 6, 3));
    // the two sentences with two mistakes each, in the order of the story, written again the right way on one group of
    // five rows (the second goes on after the first; one row to spare; the bank check proves every pair fits)
    const two = P.order.filter((k) => k !== 'off' && (k === P.A || k === P.nameAt)), both = two.map((k) => S[k]).join(' ');
    b.push(cream('data-lcs-task="rewrite"', label(2, esc(LINES.rewrite)) + `<div data-lcs-item data-lcs-rewrite="${two.join(',')}" style="padding:0 10px">${writeGroup({ n: d.rows, w: WR, text: both, key })}</div>`, 6, 3));
  }
  if (P.mode === 'revise') {
    const d = LEVELS.revise[P.lv], x = P.detail, sm = P.sample.revise;
    b.push(`<div data-lcs-card data-lcs-detail="${A(x.id)}" style="display:flex;flex-direction:column;gap:1px;padding:2px 14px 3px;border:2.5px solid ${T.creamDeep};border-radius:14px;background:#FFFFFF"><div data-lcs-boxtitle data-lcs-noroom style="font:700 18px/1.1 'Baloo 2',cursive;color:${T.teal}">${esc(EX_DETAIL)}</div>` +
      [x.plain, x.asked, x.added].map((t, i) => `<div data-lcs-exrow="${i}" data-lcs-read style="font:700 ${READ}px/1.2 'Nunito',sans-serif;color:${T.ink}">${Bw(EX_ROWS[i])} ${esc(t)}</div>`).join('') + `</div>`);
    const checks = CHECK.revise[P.lv];
    const tick = (who) => `<span data-lcs-tickbox data-lcs-who="${who}" style="justify-self:center;display:inline-block;width:20px;height:20px;border:2.5px solid ${T.ink};border-radius:5px;background:#FFFFFF"></span>`;
    b.push(cream('data-lcs-task="checks"', label(1, esc(LINES.checks)) + `<div data-lcs-checktable style="display:grid;grid-template-columns:1fr 72px 72px;gap:2px 6px;align-items:center;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF">` +
      `<span></span><span data-lcs-colhead style="justify-self:center;font:800 ${RULEPX}px/1.15 'Nunito',sans-serif;color:${T.teal}">Me</span><span data-lcs-colhead style="justify-self:center;font:800 ${RULEPX}px/1.15 'Nunito',sans-serif;color:${T.teal}">Partner</span>` +
      checks.map((c) => `<span data-lcs-item data-lcs-check data-lcs-checktext style="font:700 ${RULEPX}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(c)}</span>${tick('me')}${tick('partner')}`).join('') + `</div>`, 6, 3));
    // a writing part: its task line (the first names the idea of the key's samples), its rows; a part of a pair is half wide
    const card = (k, i, text, o = {}) => cream(`data-lcs-task="${k}"`, label(i, esc(LINES[k])) + (o.extra || '') + `<div data-lcs-item style="padding:0 ${o.half ? 2 : 10}px">${writeGroup({ n: d.rows[k], w: o.half ? PAIR_R : WR, text, key })}</div>`, 3, 2);
    const qw = d.qwords ? `<div data-lcs-qwords data-lcs-ruletext style="padding:0 10px;font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${Bw(QWORDS.split(': ')[0] + ':')} ${esc(QWORDS.split(': ')[1])}</div>` : '';
    // the key names the example idea of its samples and says what else is right (one row of notes under the task line of
    // the detail)
    const also = alsoRow([SAMPLES_FOR + P.sample.idea + ')', NOTES.revise], key);
    if (d.pair) {
      b.push(`<div data-lcs-pair style="display:grid;grid-template-columns:${PAIR}px ${PAIR}px;gap:0 ${W - 2 * PAIR}px">${card('liked', 2, sm.liked, { half: true })}${card('asked', 3, sm.asked, { half: true })}</div>`);
      b.push(card('added', 4, sm.added, { extra: also }));
      b.push(card('fixed', 5, sm.fixed));
    } else {
      b.push(card('asked', 2, sm.asked, { extra: qw }));
      b.push(card('added', 3, sm.added, { extra: also }));
      b.push(card('fixed', 4, sm.fixed));
    }
  }
  return b;
}

function makeStoryG2Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('story-writing-g2: unknown mode ' + mode);
  const INFO = {
    mode, SPEC,
    stories: mode === 'read' ? Object.fromEntries(BANK.stories.map((s) => [s.id, s])) : {},
    ideas: Object.fromEntries([...BANK.ideas, ...BANK.exampleIdeas].map((x) => [x.id, x])),
    // the example ideas: never a prompt; the examples and the samples of G2-575 come only from them
    exampleIds: BANK.exampleIdeas.map((x) => x.id),
    details: mode === 'revise' ? Object.fromEntries(BANK.details.map((x) => [x.id, x])) : {},
    edits: mode === 'edit' ? Object.fromEntries(BANK.editStories.map((e) => [e.id, e])) : {},
  };
  return {
    id, slug, gradeBand: 'G2', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the stories and sentences are English (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const P = plan(BANK, mode, lv, rng, (ctx && (ctx.seedVariant || ctx.variant)) || null);
      const blocks = render(P, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-sw2="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:5px;min-height:0">` + fRoom(typo(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + P.list.slice(0, 2).join(','), items: P.list },
      };
    },

    async verify(page) {
      return page.evaluate(VERIFY_IN_PAGE, INFO);
    },
  };
}

/* ------------------------------------------------------------------ the check, run in the rendered page */
function VERIFY_IN_PAGE(INFO) {
  const fails = [], S = INFO.SPEC;
  const root = document.querySelector('[data-lcs-sw2]');
  if (!root) return ['no page'];
  const [mode, lvS] = root.dataset.lcsSw2.split('|'), lv = +lvS, N = S.N;
  const isKey = root.dataset.lcsIskey === '1';
  const R = (e) => e.getBoundingClientRect(), cs = (e) => getComputedStyle(e), fs = (e) => parseFloat(cs(e).fontSize);
  const straight = (s) => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  const txt = (e) => (e ? straight(e.textContent).replace(/\s+/g, ' ').trim() : '');
  const TEAL = 'rgb(20, 107, 94)';
  const rb = R(root);
  const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const words = (s) => String(s).toLowerCase().replace(/’/g, "'").match(/[a-z]+(?:[-'][a-z]+)*/g) || [];
  const hasWord = (s, w) => { const ws = words(s), q = words(w); for (let i = 0; i + q.length <= ws.length; i++) if (q.every((x, k) => ws[i + k] === x)) return true; return false; };
  const countPhrase = (s, w) => { const ws = words(s), q = words(w); let n = 0; for (let i = 0; i + q.length <= ws.length; i++) if (q.every((x, k) => ws[i + k] === x)) n++; return n; };
  const feels = (s) => words(s).some((w) => S.FEEL.includes(w));
  const visible = (e) => cs(e).visibility !== 'hidden' && cs(e).display !== 'none';
  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  // letters: ligatures off everywhere by the font features
  if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
  if ([...root.querySelectorAll('*')].some((e) => [...e.childNodes].some((n) => n.nodeType === 3 && /[a-z]/i.test(n.nodeValue)) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word may join its letters: the ligatures are on in an element with text');
  // in the body font an f before i, f, l, or t and a t before t get room of their own; the heading font gets none
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (/f[iflt]|tt/.test(n.textContent) && !(n.parentElement && n.parentElement.closest('[data-lcs-noroom]'))) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
  // ... and that room is never more than FROOM px beyond the mean gap of two letters of the same line (a word is never seen
  // split: "Let ting", "butterf lies"); measured on the rendered letters, in HTML and in the SVG text of the rows
  { const chars = [], tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = tw.nextNode())) {
      const el = n.parentElement; if (!el || el.closest('svg') || !visible(el) || el.closest('[data-lcs-keycap], [data-lcs-keyend]')) { chars.push(null); continue; }
      const t = n.nodeValue, c = cs(el), head = !!el.closest('[data-lcs-noroom]');
      for (let i = 0; i < t.length; i++) { if (!/[A-Za-z]/.test(t[i])) { chars.push(null); continue; } const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + 1); chars.push({ ch: t[i], r: r.getBoundingClientRect(), font: c.fontFamily + '|' + c.fontSize + '|' + c.fontWeight, head }); }
    }
    const groups = new Map();
    for (let i = 0; i + 1 < chars.length; i++) { const a = chars[i], b = chars[i + 1]; if (!a || !b || Math.abs(a.r.top - b.r.top) > 1 || a.font !== b.font || b.r.left < a.r.left) continue;
      const sp = (a.ch === 'f' && /[iflt]/.test(b.ch)) || (a.ch === 't' && b.ch === 't'), k = Math.round(a.r.top) + '|' + a.font;
      if (!groups.has(k)) groups.set(k, { norm: [], sp: [], head: a.head }); groups.get(k)[sp ? 'sp' : 'norm'].push({ gap: b.r.left - a.r.right, ch: a.ch + b.ch }); }
    let bad = '';
    for (const g of groups.values()) { if (!g.sp.length || g.norm.length < 3) continue; const mean = g.norm.reduce((s, x) => s + x.gap, 0) / g.norm.length;
      for (const x of g.sp) { const extra = x.gap - mean; if (g.head ? extra > 0.3 : extra > S.FROOM + 0.05) { bad = `"${x.ch}" ${extra.toFixed(1)} px beyond the gap of its line (${g.head ? 'none in the heading font' : S.FROOM + ' px at most'})`; break; } } if (bad) break; }
    if (!bad) root.querySelectorAll('svg text').forEach((t) => { if (bad) return; const s = t.textContent, ex = [...s].map((_, i) => { try { return t.getExtentOfChar(i); } catch (e) { return null; } }); const norm = [], sp = [];
      for (let i = 0; i + 1 < s.length; i++) { if (!/[A-Za-z]/.test(s[i]) || !/[A-Za-z]/.test(s[i + 1]) || !ex[i] || !ex[i + 1]) continue; const gap = ex[i + 1].x - (ex[i].x + ex[i].width); (((s[i] === 'f' && /[iflt]/.test(s[i + 1])) || (s[i] === 't' && s[i + 1] === 't')) ? sp : norm).push({ gap, ch: s[i] + s[i + 1] }); }
      if (sp.length && norm.length >= 3) { const mean = norm.reduce((a, x) => a + x.gap, 0) / norm.length; const x = sp.find((y) => y.gap - mean > S.FROOM + 0.05); if (x) bad = `"${x.ch}" on a row ${(x.gap - mean).toFixed(1)} px beyond the gap of its text (${S.FROOM} px at most)`; } });
    if (bad) fails.push('a word is seen split after an f or a t: the letters ' + bad); }
  // the instruction of this level
  const ins = document.querySelector('[data-lcs-instruction]');
  if (!ins) fails.push('no instruction at the top of the page'); else if (txt(ins) !== straight(S.INSTR[mode][lv])) fails.push(`the instruction is not the one of level ${lv}: "${txt(ins)}"`);
  // typographic apostrophes and quotes on everything printed
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n, bad = ''; while ((n = tw.nextNode())) if (/['"]/.test(n.nodeValue)) { bad = n.nodeValue.trim().slice(0, 30); break; }
    if (!bad && ins && /['"]/.test(ins.textContent)) bad = ins.textContent.trim().slice(0, 30);
    const tt = document.querySelector('[data-lcs-title]'); if (!bad && tt && /['"]/.test(tt.textContent)) bad = tt.textContent.trim().slice(0, 30);
    if (bad) fails.push('a straight apostrophe or quotation mark is printed: ' + bad); }
  if (root.querySelector('img')) fails.push('a picture on a page without pictures');
  // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
  const blocks = [...root.children];
  blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
  root.querySelectorAll('[data-lcs-card]').forEach((c) => { const q = R(c); c.querySelectorAll('span, div, b, i, svg').forEach((e) => { if (e.dataset && (e.dataset.lcsRing !== undefined || e.dataset.lcsKeycap !== undefined || e.dataset.lcsKeyend !== undefined)) return; const r = R(e); if (r.width && (r.bottom > q.bottom + 0.5 || r.right > q.right + 0.5 || r.left < q.left - 0.5 || r.top < q.top - 0.5)) fails.push('something leaves its card (' + (c.dataset.lcsTask || Object.keys(c.dataset).filter((k) => k !== 'lcsCard')[0]) + ')'); }); });
  const used = blocks.reduce((s, b) => s + R(b).height, 0);
  if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
  // sizes
  root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < S.READ) fails.push(`text a second grader reads is ${fs(e)} px (${S.READ} or more)`); });
  root.querySelectorAll('[data-lcs-opt]').forEach((e) => { if (fs(e) < S.OPT) fails.push(`a choice to circle is ${fs(e)} px (${S.OPT} or more)`); });
  root.querySelectorAll('[data-lcs-ruletext], [data-lcs-ex], [data-lcs-check], [data-lcs-colhead]').forEach((e) => { if (fs(e) < S.RULE) fails.push(`a box or an example is printed at ${fs(e)} px (${S.RULE} or more)`); });
  root.querySelectorAll('[data-lcs-label]').forEach((e) => { if (fs(e) < S.LABEL) fails.push('a task line smaller than ' + S.LABEL + ' px'); });
  root.querySelectorAll('[data-lcs-numbox], [data-lcs-tickbox]').forEach((e) => { if (R(e).width < 16 || R(e).height < 16) fails.push('a box to write in or to tick is smaller than 16 px'); });
  // the rows: 44 px, with three rules; filled only on the key; the key's text inside its row and after its starter
  root.querySelectorAll('[data-lcs-line]').forEach((l) => {
    const sv = l.querySelector('svg');
    if (!sv || R(sv).height < S.ROW - 0.5) fails.push(`a writing row ${sv ? Math.round(R(sv).height) : 0} px high (${S.ROW})`);
    if (sv && sv.querySelectorAll('line').length !== 3) fails.push('a writing row without its three rules');
    const k = l.querySelector('[data-lcs-keytext]'), st = l.querySelector('[data-lcs-starttext]');
    if (k) { const kb = R(k), lb = R(sv); if (k.hasAttribute('textLength')) fails.push('a key answer is squeezed to fit its row'); if (kb.right > lb.right - 2 || kb.left < lb.left) fails.push('a key answer does not fit its row: ' + straight(l.dataset.lcsAnswer || '').slice(0, 30)); if (st && kb.left < R(st).right + 2) fails.push('a key answer runs into the starter of its row'); }
    if (!isKey && (l.dataset.lcsAnswer !== undefined || k)) fails.push('a row is filled on the page of the child');
    if (st && straight(l.dataset.lcsStarter || '') !== txt(st)) fails.push('a starter is not printed as it is given');
  });
  root.querySelectorAll('[data-lcs-opt]').forEach((o) => { const ringed = cs(o).borderTopColor === TEAL; if (isKey ? ringed !== !!o.dataset.lcsOk : ringed) fails.push('a choice is ringed on the page of the child, or the key rings the wrong one'); });
  // a label stands above its rows, never beside them
  root.querySelectorAll('[data-lcs-rowhead], [data-lcs-sechead], [data-lcs-label]').forEach((h) => { const box = h.closest('[data-lcs-item]') || h.closest('[data-lcs-card]'), l = box && box.querySelector('[data-lcs-line]'); if (l && R(h).bottom > R(l).top + 0.5 && R(h).top < R(l).bottom) fails.push('a label stands beside its row, not above it: ' + txt(h).slice(0, 30)); });
  /** how many rows a text needs at a child's letter width on these rows (the first after its starter) */
  const need = (text, ls) => { let k = 0, cur = '';
    const capAt = (i) => { const l = ls[i]; if (!l) return 0; const sv = l.querySelector('svg'), st = l.querySelector('[data-lcs-starttext]'); const w = R(sv).width, x0 = st ? R(st).right - R(sv).left + 8 : 0; return Math.max(0, Math.floor((w - x0 - 10) / S.CH)); };
    for (const w of String(text).split(' ')) { if (cur && (cur + ' ' + w).length > capAt(k)) { k++; cur = w; } else cur = cur ? cur + ' ' + w : w; if (cur.length > capAt(k)) return Infinity; }
    return k + 1; };
  /** a group of rows for one text: the text fits at a child's letter width with a row to spare; the key's rows hold it */
  const groupCheck = (g, what) => {
    const ls = [...g.querySelectorAll(':scope > [data-lcs-line]')], text = straight(g.dataset.lcsExpect || ''), n = +g.dataset.lcsWrites;
    if (ls.length !== n) fails.push(`${what}: ${ls.length} rows, not ${n}`);
    if (!text) { fails.push(`${what}: no sample to measure`); return; }
    const k = need(text, ls);
    if (k > ls.length - 1) fails.push(`${what}: the sample (${text.length} letters) needs ${k === Infinity ? 'more' : k} of ${ls.length} rows at ${S.CH} px a letter (one row must be left free)`);
    if (isKey) { const parts = ls.map((l) => straight(l.dataset.lcsAnswer || '')).filter(Boolean); if (parts.join(' ') !== text) fails.push(`${what}: the key's rows do not hold its sample`); if (ls[ls.length - 1].dataset.lcsAnswer) fails.push(`${what}: the key fills the row that is to be left free`); }
  };
  root.querySelectorAll('[data-lcs-writes]').forEach((g, i) => groupCheck(g, 'writing task ' + (i + 1)));
  /** rows with one text each (the events): each text fits its row, and one row is left free */
  root.querySelectorAll('[data-lcs-perline]').forEach((g) => { const ls = [...g.querySelectorAll(':scope > [data-lcs-line]')], ex = ls.filter((l) => l.dataset.lcsLineexpect);
    if (ls.length !== +g.dataset.lcsPerline || ex.length !== ls.length - 1) fails.push('the event rows are not three with one to spare');
    ex.forEach((l, i) => { if (need(straight(l.dataset.lcsLineexpect), [l]) > 1) fails.push(`event row ${i + 1}: the sample does not fit the row at ${S.CH} px a letter`);
      if (isKey && straight(l.dataset.lcsAnswer || '') !== straight(l.dataset.lcsLineexpect)) fails.push(`event row ${i + 1}: the key does not write its sample`); }); });
  // the task lines, the boxes, the checklists
  const labelOf = (sel) => { const l = root.querySelector(sel + ' [data-lcs-label]'); if (!l) return null; const c = l.cloneNode(true); c.querySelectorAll('[data-lcs-vary], [data-lcs-labelnum]').forEach((e) => e.remove()); return txt(c); };
  const needLabel = (sel, want) => { const got = labelOf(sel); if (got !== want) fails.push(`the task line of ${sel} is not the one of level ${lv}: "${got}"`); };
  const boxRows = (sel) => [...root.querySelectorAll(sel + ' [data-lcs-ruletext]')].map(txt);
  const checkRows = () => [...root.querySelectorAll('[data-lcs-checklist] [data-lcs-checktext]')].map(txt);
  const legend = () => txt(root.querySelector('[data-lcs-checklist] legend'));
  // the key's notes (a sample, what else is right): printed on the key in the order the page asks for them, hidden on the
  // page of the child (where they keep their room: the page and the key have one geometry)
  const varyAll = [...root.querySelectorAll('[data-lcs-vary]')], vary = varyAll.filter(visible);
  if (!isKey && vary.length) fails.push('the page of the child says what the key says (a note of the key)');
  const notesWanted = (want) => { if (varyAll.length !== want.length) fails.push(`the ${isKey ? 'key' : 'page'} keeps ${varyAll.length} notes of the key, not ${want.length}`); else if (isKey && varyAll.map(txt).join('|') !== want.map(straight).join('|')) fails.push(`the notes of the key are not "${want.join(' / ')}": "${varyAll.map(txt).join(' / ')}"`); };
  /** the places of the right answers (a row of positions among m) */
  // the key marks take no room: a ring, a capital above a letter, an end mark after a word stand absolutely; the words of
  // the page keep their normal gaps
  root.querySelectorAll('[data-lcs-tw], [data-lcs-fixcap], [data-lcs-fixend]').forEach((e) => { const c = cs(e); if (['paddingLeft', 'paddingRight', 'marginLeft', 'marginRight', 'borderLeftWidth', 'borderRightWidth'].some((k) => parseFloat(c[k]) > 0)) fails.push('a key mark takes room in a line of words'); if (e.dataset.lcsFixend !== undefined && R(e).width > 0.5) fails.push('an end mark to add takes room in its line'); });
  root.querySelectorAll('[data-lcs-ring], [data-lcs-keycap], [data-lcs-keyend]').forEach((e) => { if (cs(e).position !== 'absolute') fails.push('a key mark is not placed apart from the line (it takes room)'); if (!isKey) fails.push('the page of the child shows a key mark'); });
  /** the ink of the text lines of an element (the key's marks and the number boxes left out): the top of its tallest
   *  letters and the bottom of its lowest, measured with the font of the element */
  const inkLines = (el) => { const c = cs(el), cv = document.createElement('canvas').getContext('2d'); cv.font = `${c.fontWeight} ${c.fontSize} ${c.fontFamily}`;
    const up = cv.measureText('Hbdfhklt'), dn = cv.measureText('gjpqy'), asc = up.fontBoundingBoxAscent, L = [];
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n;
    while ((n = tw.nextNode())) { const p = n.parentElement; if (!n.nodeValue.trim() || !p || p.closest('[data-lcs-keycap], [data-lcs-keyend], [data-lcs-numbox]')) continue; const r = document.createRange(); r.selectNodeContents(n);
      for (const q of r.getClientRects()) { if (!q.width) continue; const top = q.top + asc - up.actualBoundingBoxAscent, bot = q.top + asc + dn.actualBoundingBoxDescent; const l = L.find((x) => Math.abs(x.y - q.top) < 3); if (l) { l.top = Math.min(l.top, top); l.bot = Math.max(l.bot, bot); } else L.push({ y: q.top, top, bot }); } }
    return L.sort((a, b) => a.y - b.y); };

  if (mode === 'read') {
    if (boxRows('[data-lcs-rulebox]').join('|') !== S.RULES.read.join('|')) fails.push('the box does not tell the parts of a true story');
    const box = root.querySelector('[data-lcs-story]'), st = box && INFO.stories[box.dataset.lcsStory];
    if (!st) { fails.push('no story of the bank'); return fails; }
    const sents = lv === 1 ? st.l1 : st.l2;
    if (txt(box.querySelector('[data-lcs-stext]')) !== sents.join(' ')) fails.push('the story is not printed as the bank has it for this level');
    // the 3 time words: the box's words stand exactly three times in the story, each at the start of an event, ringed on
    // the key only (counted on the story as it is PRINTED, never on the bank's text)
    const storyText = txt(box.querySelector('[data-lcs-stext]'));
    if (S.TW.reduce((n, w) => n + countPhrase(storyText, w), 0) !== 3) fails.push('the story does not hold exactly 3 time words of the box');
    const tws = [...box.querySelectorAll('[data-lcs-tw]')];
    if (tws.length !== 3 || tws.some((t) => !S.TW.includes(txt(t).toLowerCase()) || !txt(t.closest('[data-lcs-sent]')).startsWith(txt(t) + ','))) fails.push('the time words are not three words of the box, each at the start of its event with its comma');
    if (lv === 1 && tws.map(txt).join() !== 'First,Next,Then') fails.push('the time words of level 1 are not First, Next, Then');
    tws.forEach((t) => { const ring = t.querySelector('[data-lcs-ring]'); if (isKey ? !ring || !visible(ring) || cs(ring).borderTopColor !== TEAL : ring) fails.push('a time word is not ringed on the key, or is ringed on the page of the child'); });
    // ... and no OTHER time word anywhere a child reads in the story (its title and every sentence, the ringed ones left
    // out): "before" or "when" would be a fourth that a child can rightly circle
    { const ss0 = [...box.querySelectorAll('[data-lcs-sent]')].map((s) => { const t = s.querySelector('[data-lcs-tw]'); return t ? txt(s).slice(txt(t).length + 1) : txt(s); });
      [txt(box.querySelector('[data-lcs-stitle]')), ...ss0].forEach((x) => { const w = S.TIMEWORDS.find((t) => hasWord(x, t)); if (w) fails.push(`"${w}" is a time word outside the three to circle: "${x.slice(0, 40)}"`); }); }
    { const ls = [...root.querySelectorAll('[data-lcs-task="mark"] [data-lcs-label]')].map((l) => { const c = l.cloneNode(true); c.querySelectorAll('[data-lcs-labelnum]').forEach((e) => e.remove()); return txt(c); }); if (ls.join('|') !== [S.LINES.markTW, S.LINES.markFeel[lv]].join('|')) fails.push('the marking tasks are not the ones of this level'); }
    // one sentence, and only one, tells a feeling (level 1) or a thought or a feeling; underlined on the key only
    const ss = [...box.querySelectorAll('[data-lcs-sent]')], fe = ss.filter((s) => feels(txt(s)));
    if (fe.length !== 1 || fe[0].dataset.lcsFeel !== '1' || box.querySelectorAll('[data-lcs-feel]').length !== 1) fails.push('not exactly one sentence of the story tells a feeling or a thought, or it is not the one keyed');
    if (lv === 1 && fe.length === 1 && words(txt(fe[0])).some((w) => S.THINK.includes(w))) fails.push('the feeling sentence of level 1 tells a thought (the task asks how I felt)');
    const fl = box.querySelector('[data-lcs-feel]');
    if (fl && (isKey ? !/underline/.test(cs(fl).textDecorationLine) || cs(fl).textDecorationColor !== TEAL : /underline/.test(cs(fl).textDecorationLine))) fails.push('the feeling sentence is not underlined on the key, or is underlined on the page of the child');
    if (ss.some((s) => s !== fl && /underline/.test(cs(s).textDecorationLine))) fails.push('another sentence is underlined');
    // levels 2 and 3: the detail sentence opens with a place or a manner phrase and its comma (a comma after an opener no
    // longer marks the time words), never a time phrase
    if (lv > 1) { const dt = ss.filter((s, k) => k && !s.querySelector('[data-lcs-tw]') && s !== fl);
      const m = dt.length === 1 && txt(dt[0]).match(/^([A-Za-z ]+), /);
      if (!m || S.TIMEWORDS.some((t) => hasWord(m[1], t)) || DAYS.some((d) => hasWord(m[1], d))) fails.push('the detail sentence of the story does not open with a place or a manner phrase and its comma'); }
    // the events: three, printed without their time words, in an order of the ruled ones (never in order, never backward);
    // numbered on the key
    needLabel('[data-lcs-task="order"]', S.LINES.order);
    const evs = [...root.querySelectorAll('[data-lcs-ev]')], evSents = sents.filter((x) => { const m = x.match(/^([A-Za-z ]+), /); return m && S.TW.includes(m[1].toLowerCase()); });
    if (evs.length !== 3) fails.push(`${evs.length} events to number, not 3`);
    const shown = evs.map((e) => +e.dataset.lcsEv);
    evs.forEach((e) => { const k = +e.dataset.lcsEv, want = evSents[k] && cap1(evSents[k].replace(/^[^,]+, /, '')); if (txt(e.querySelector('[data-lcs-evtext]')) !== want) fails.push(`event ${k + 1} is not printed as the story tells it, without its time word`);
      const nb = e.querySelector('[data-lcs-numbox]'); if (txt(nb) !== (isKey ? String(k + 1) : '')) fails.push('an event is not numbered on the key, or is numbered on the page of the child'); });
    if (!S.EV_ORDERS.includes(shown.join(''))) fails.push(`the events are printed in an order a child can copy or that is not ruled (${shown.join('')})`);
    // the title names no word of the feeling sentence, nor of the right ending unless both wrong ones carry it
    const cw = (x) => words(x).filter((w) => !S.TITLE_STOP.includes(w)).map((w) => w.replace(/'s$/, '').replace(/(ing|ed|es|s)$/, ''));
    const tW = cw(txt(box.querySelector('[data-lcs-stitle]')));
    if (fl && cw(txt(fl)).some((w) => tW.includes(w))) fails.push('the title names a word of the feeling sentence');
    // over the bank: no surface feature finds the right ending on more than a third of the stories (rounded up): the
    // length, the first one, two, or three words or the phrase before the comma, two choices that open alike
    { const St = Object.values(INFO.stories), n = St.length, lim = Math.ceil(n / 3), ch = (s) => [s.end.right, s.end.newEvent, s.end.again];
      const longest = St.filter((s) => [s.end.newEvent, s.end.again].every((o) => o.length < s.end.right.length)).length, shortest = St.filter((s) => [s.end.newEvent, s.end.again].every((o) => o.length > s.end.right.length)).length;
      if (longest > lim || shortest > lim) fails.push(`the right ending is the longest in ${longest} and the shortest in ${shortest} of ${n} stories of the bank (${lim} at most)`);
      const feats = (o) => { const ws = String(o).toLowerCase().split(/[\s,]+/).filter(Boolean); const x = [1, 2, 3].map((k) => ws.slice(0, k).join(' ')); const m = String(o).match(/^([^,]+),/); if (m) x.push(m[1].toLowerCase()); return x; };
      const all = new Set(); St.forEach((s) => ch(s).forEach((o) => feats(o).forEach((x) => all.add(x))));
      for (const x of all) { let e = 0; St.forEach((s) => { const hit = ch(s).filter((o) => feats(o).includes(x)); e += hit.length ? (hit.includes(s.end.right) ? 1 / hit.length : 0) : 1 / 3; }); if (e > lim + 1e-9) { fails.push(`the opener "${x}" finds the right ending in ${e.toFixed(1)} of ${n} stories of the bank (${lim} at most)`); break; } }
      let e2 = 0; St.forEach((s) => { const w = ch(s).map((o) => String(o).split(/[\s,]/)[0].toLowerCase()); const sm = [[0, 1], [0, 2], [1, 2]].filter(([i, j]) => w[i] === w[j]); e2 += sm.length === 1 ? (sm[0].includes(0) ? 0.5 : 0) : 1 / 3; });
      if (e2 > lim + 1e-9) fails.push(`two choices that open alike find the right ending in ${e2.toFixed(1)} of ${n} stories of the bank (${lim} at most)`); }
    if (lv < 3) {
      needLabel('[data-lcs-task="end"]', S.LINES.endPick);
      const card = root.querySelector('[data-lcs-task="end"]'), os = [...card.querySelectorAll('[data-lcs-opt]')].map((o) => straight(o.dataset.lcsOpt));
      if (os.length !== 3 || os.slice().sort().join('|') !== [st.end.right, st.end.newEvent, st.end.again].sort().join('|')) fails.push('the endings to circle are not the story\'s ending, a new event, and the beginning again');
      if (straight(card.dataset.lcsRight) !== st.end.right || os.length && card.querySelectorAll('[data-lcs-ok]').length !== 1 || (card.querySelector('[data-lcs-ok]') && straight(card.querySelector('[data-lcs-ok]').dataset.lcsOpt) !== st.end.right)) fails.push('the ending is not keyed to the one that closes the story');
      cw(st.end.right).filter((w) => tW.includes(w) && !(cw(st.end.newEvent).includes(w) && cw(st.end.again).includes(w))).forEach((w) => fails.push(`the title names "${w}" of the right ending`));
      if (os.some((o) => feels(o))) fails.push('an ending to circle tells a feeling');
      notesWanted([]);
    } else {
      needLabel('[data-lcs-task="endwrite"]', S.LINES.endWrite);
      const g = root.querySelector('[data-lcs-task="endwrite"] [data-lcs-writes]');
      if (!g || straight(g.dataset.lcsExpect) !== st.end.right) fails.push('the sample ending of level 3 is not the story\'s ending');
      if (g && +g.dataset.lcsWrites !== N.endRows) fails.push(`the ending is written on ${g.dataset.lcsWrites} rows (${N.endRows})`);
      // the key marks its ending as a sample and says what else is right
      notesWanted([S.NOTES.endWrite]);
      if (root.querySelector('[data-lcs-opt]')) fails.push('level 3 offers endings to circle');
    }
  }
  if (mode === 'plan') {
    needLabel('[data-lcs-task="ideas"]', S.LINES.ideas); needLabel('[data-lcs-task="plan"]', S.LINES.plan[lv]);
    const ideas = [...root.querySelectorAll('[data-lcs-idea]')];
    if (ideas.length !== 2 || ideas[0].dataset.lcsIdea === ideas[1].dataset.lcsIdea) fails.push('not two different story ideas');
    if ([...root.querySelectorAll('[data-lcs-task="ideas"] [data-lcs-num]')].map(txt).join() !== S.IDEA_MARK.slice(0, 2).join()) fails.push('the ideas are not lettered A and B');
    const noNote = (el) => { if (!el) return ''; const c = el.cloneNode(true); c.querySelectorAll('[data-lcs-vary]').forEach((v) => v.remove()); return txt(c); };
    ideas.forEach((e, i) => { const x = INFO.ideas[e.dataset.lcsIdea]; if (!x || INFO.exampleIds.includes(x.id) || noNote(e.querySelector('[data-lcs-ideatext]')) !== x.idea) fails.push(`idea ${i + 1} is not a prompt of the bank`); });
    const own = root.querySelector('[data-lcs-own]'); if (!own || txt(own.querySelector('[data-lcs-rowhead]')) !== S.IDEA_MARK[2] + ' ' + S.LINES.own || own.querySelectorAll('[data-lcs-line]').length !== 1) fails.push('no row for the child\'s own idea (C)');
    const x = INFO.ideas[(ideas[0] || {}).dataset.lcsIdea || ''];
    const rows = [...root.querySelectorAll('[data-lcs-row]')];
    if (rows.map((r) => r.dataset.lcsRow).join() !== 'who,where,events,felt') fails.push('the planner does not ask who, where and when, what happened, and how I felt');
    const ST = S.PLAN_START[lv];
    rows.forEach((r) => { const k = r.dataset.lcsRow;
      if (txt(r.querySelector('[data-lcs-rowname]')) !== S.PLAN_HEAD[k]) fails.push(`the planner part ${k} is not headed "${S.PLAN_HEAD[k]}"`);
      const st = [...r.querySelectorAll('[data-lcs-starttext]')].map(txt), wantSt = k === 'events' ? ['first', 'next', 'last'].map((e) => ST[e]).filter(Boolean) : k === 'felt' && ST.felt ? [ST.felt] : [];
      if (st.join('|') !== wantSt.join('|')) fails.push(`the ${k} of the planner have the starters "${st.join(' / ')}" (level ${lv} wants "${wantSt.join(' / ')}")`);
      // the key: level 1 finishes the frames, level 2 writes after the starters, level 3 writes each event with its time word
      if (x) { const P = x.plan, want = k === 'events' ? ['first', 'next', 'last'].map((e, i) => (lv === 1 ? P[e] : lv === 2 ? 'I ' + P[e] : S.PLAN_TW[i] + ', I ' + P[e])) : k === 'felt' ? [lv === 3 ? 'I felt ' + P.felt : P.felt] : [cap1(P[k])];
        const got = k === 'events' ? [...r.querySelectorAll('[data-lcs-lineexpect]')].map((l) => straight(l.dataset.lcsLineexpect)) : [straight((r.querySelector('[data-lcs-writes]') || {}).dataset.lcsExpect || '')];
        if (got.join('|') !== want.join('|')) fails.push(`the sample of ${k} is not the plan of the first idea as level ${lv} writes it`); }
      const nRows = r.querySelectorAll('[data-lcs-line]').length; if (nRows !== { who: 3, where: 3, events: 4, felt: 2 }[k]) fails.push(`the ${k} part has ${nRows} rows`); });
    // the example: the plan of an example idea (never a prompt; its topic is the topic of no idea offered), beside each part;
    // the feeling written as the level's frame has it
    const pc = root.querySelector('[data-lcs-task="plan"]'), ex = pc && INFO.ideas[pc.dataset.lcsExample];
    if (!ex || !INFO.exampleIds.includes(ex.id)) fails.push('the examples are not the plan of an example idea (an example is never a prompt)');
    else { if (ideas.some((e) => INFO.ideas[e.dataset.lcsIdea] && INFO.ideas[e.dataset.lcsIdea].topic === ex.topic)) fails.push('the example shares its topic with an idea the child may choose');
      const want = ['Example: ' + cap1(ex.plan.who), 'Example: ' + cap1(ex.plan.where), 'Example: First, I ' + ex.plan.first + '.', 'Example: ' + (lv === 1 ? 'At the end, I felt ' : 'I felt ') + ex.plan.felt + '.'];
      if ([...root.querySelectorAll('[data-lcs-ex]')].map(txt).join('|') !== want.join('|')) fails.push('the examples beside the parts are not the plan of one example idea as the level writes it'); }
    const wb = root.querySelector('[data-lcs-wordbank]'); if (!!wb !== (lv === 3) || (wb && txt(wb) !== S.PLAN_BANK)) fails.push('the word bank belongs to level 3 only, as it is ruled');
    if (legend() !== S.CHECK_LEGEND || checkRows().join('|') !== S.CHECK.plan.join('|')) fails.push('the checklist is not the one of the planner');
    // the key names the idea of its sample plan (the note in the box of idea A) and says what else is right
    notesWanted([S.SAMPLE_PLAN, S.NOTES.plan]);
    if (varyAll.length && varyAll[0].closest('[data-lcs-idea]') !== ideas[0]) fails.push('the note "(the sample plan)" does not stand in the box of idea A');
  }
  if (mode === 'draft') {
    needLabel('[data-lcs-task="draft"]', S.LINES.draft[lv]);
    const il = root.querySelector('[data-lcs-idealine]'), idea = il && INFO.ideas[il.dataset.lcsIdea];
    if (!idea || txt(il) !== S.LINES.draftIdea + ' ' + idea.idea) { fails.push('the story idea is not printed'); return fails; }
    if (INFO.exampleIds.includes(idea.id)) fails.push('the idea printed as the prompt is an example idea');
    const exc = root.querySelector('[data-lcs-example]'), ex = exc && INFO.ideas[exc.dataset.lcsExample];
    if (!ex || !INFO.exampleIds.includes(ex.id)) fails.push('the example is not the story of an example idea (never a prompt)');
    else {
      if (ex.topic === idea.topic) fails.push('the example shares its topic with the idea the child writes about');
      if (txt(exc.querySelector('[data-lcs-boxtitle]')) !== 'Example: ' + ex.idea) fails.push('the example does not name its idea');
      const et = exc.querySelector('[data-lcs-extext]');
      if (txt(et) !== ex.model) fails.push('the example is not printed as the bank has it');
      if (R(et).height > S.EX_LINES * parseFloat(cs(et).lineHeight) + 1) fails.push(`the example takes more than ${S.EX_LINES} lines`);
      if ([...et.querySelectorAll('b')].map(txt).join('|') !== 'First,|Next,|Last,|At the end,') fails.push('the time words of the example are not in teal');
    }
    // level 2 has a row of time words, level 3 a word bank of thoughts and things seen and heard (less support), level 1 frames
    const tr = root.querySelector('[data-lcs-timerow]'), wbk = root.querySelector('[data-lcs-wordbank]');
    if (!!tr !== (lv === 2) || !!wbk !== (lv === 3) || (tr && txt(tr) !== S.TIME_ROW) || (wbk && txt(wbk) !== S.DRAFT_BANK)) fails.push('the row of time words belongs to level 2, the word bank to level 3, as they are ruled');
    [tr, wbk].filter(Boolean).forEach((el) => { if (R(el).height > 1.5 * parseFloat(cs(el).lineHeight)) fails.push('the list of words takes more than one line'); });
    const secs = [...root.querySelectorAll('[data-lcs-sec]')];
    if (secs.map((s) => s.dataset.lcsSec).join() !== 'beginning,middle,ending') fails.push('the draft is not under the headings beginning, middle, ending');
    secs.forEach((s) => { if (txt(s.querySelector('[data-lcs-sechead]')) !== S.DRAFT_HEAD[s.dataset.lcsSec]) fails.push(`the heading of ${s.dataset.lcsSec} is not "${S.DRAFT_HEAD[s.dataset.lcsSec]}"`); });
    const nL = (k) => root.querySelectorAll(`[data-lcs-sec="${k}"] [data-lcs-line]`).length, gotL = ['beginning', 'middle', 'ending'].map(nL);
    if (gotL.join() !== N.draftLines[lv].join()) fails.push(`the draft has ${gotL.join(' / ')} rows (level ${lv} wants ${N.draftLines[lv].join(' / ')})`);
    if (lv > 1 && gotL.reduce((a, c) => a + c, 0) < 10) fails.push('fewer than 10 rows to write the story on');
    const st = [...root.querySelectorAll('[data-lcs-task="draft"] [data-lcs-starttext]')].map(txt), wantSt = lv === 1 ? [S.DRAFT_START.beginning, ...S.DRAFT_START.events, S.DRAFT_START.ending] : [];
    if (st.join('|') !== wantSt.join('|')) fails.push(`the starters are "${st.join(' / ')}" (level ${lv} wants ${lv === 1 ? wantSt.join(' / ') : 'none'})`);
    const got = [...root.querySelectorAll('[data-lcs-sec] [data-lcs-writes], [data-lcs-sec] [data-lcs-lineexpect]')].map((g) => straight(g.dataset.lcsExpect || g.dataset.lcsLineexpect));
    const P = idea.plan, want = lv === 1 ? [idea.draft1.beginning, P.first + '.', P.next + '.', P.last + '.', P.felt + '.'] : [idea.draft2.beginning, idea.draft2.middle, idea.draft2.ending];
    if (got.join('|') !== want.join('|')) fails.push('the samples of the draft are not the story of the printed idea');
    // the sample does what the page asks: time words, one thing thought or felt; level 3 one detail
    const all = (lv === 1 ? [S.DRAFT_START.beginning, ...S.DRAFT_START.events, S.DRAFT_START.ending] : []).join(' ') + ' ' + got.join(' ');
    if (!feels(all)) fails.push('the sample story tells no thought or feeling');
    if (!/\b(First|Next|Last|Then)\b/.test(all)) fails.push('the sample story uses no time word');
    if (lv === 3 && (!idea.draft2.detail || !all.includes(straight(idea.draft2.detail)))) fails.push('the sample of level 3 shows no detail (the page asks for one)');
    if (legend() !== S.CHECK_LEGEND || checkRows().join('|') !== S.CHECK.draft[lv].join('|')) fails.push(`the checklist is not the one of the draft at level ${lv}`);
    // the key names the idea of its sample and says what else is right (a row of notes under the task line)
    notesWanted([S.SAMPLE_FOR + idea.idea + ')', S.NOTES.draft]);
    if (varyAll.some((v) => !v.closest('[data-lcs-also]'))) fails.push('a note of the key does not stand in the row of notes under the task line');
  }
  if (mode === 'edit') {
    if (boxRows('[data-lcs-rulebox]').join('|') !== [...S.RULES.edit[lv], S.RULES.editCount[lv]].join('|')) fails.push('the box does not tell the rules and the counts of this level');
    needLabel('[data-lcs-task="edit"]', S.LINES.edit[lv]); needLabel('[data-lcs-task="rewrite"]', S.LINES.rewrite);
    const card = root.querySelector('[data-lcs-edit]'), e = card && INFO.edits[card.dataset.lcsEdit];
    if (!e) { fails.push('no story of the bank to edit'); return fails; }
    if (txt(card.querySelector('[data-lcs-stitle]')) !== e.title || txt(card.querySelector('[data-lcs-byline]')) !== S.BYLINE) fails.push('the story to edit does not carry its title and "by a second grader"');
    const para = card.querySelector('[data-lcs-para]');
    if (!!para !== (lv === 3)) fails.push('the story is not one paragraph on level 3 and one sentence on each strip on levels 1 and 2');
    const strips = [...card.querySelectorAll('[data-lcs-strip]')];
    if (strips.length !== N.strips[lv]) fails.push(`${strips.length} sentences, not ${N.strips[lv]}`);
    const ids = strips.map((s) => s.dataset.lcsStrip), offs = ids.filter((x) => x === 'off');
    if (offs.length !== (lv === 3 ? 1 : 0)) fails.push('the sentence that does not belong is missing on level 3 or stands on another level');
    if (lv === 3 && (ids[0] === 'off' || ids[ids.length - 1] === 'off')) fails.push('the sentence that does not belong is first or last');
    // the order: level 1 as written; levels 2 and 3 with exactly one sentence moved, the First one or the last one
    const ord = ids.filter((x) => x !== 'off').map(Number);
    const sorted = ord.slice().sort((a, c) => a - c);
    if (lv === 1) { if (ord.join() !== sorted.join()) fails.push('the sentences of level 1 are not in order'); }
    else { const movedOk = [1, e.sents.length - 1].some((m) => { const rest = ord.filter((k) => k !== m); return rest.join() === sorted.filter((k) => k !== m).join() && ord.join() !== sorted.join(); });
      if (!movedOk) fails.push('the order of levels 2 and 3 is not the story with only its First sentence or its last sentence moved'); }
    // every sentence: its printed text with the planted fixes made is the bank's sentence; count the planted kinds
    let caps = 0, ends = 0, nameCaps = 0; const two = [];
    /** what the child sees of a sentence: its text without the key's marks */
    const childText = (t) => { let o = ''; const walk = (n) => { if (n.nodeType === 3) { o += n.nodeValue; return; } if (n.dataset && (n.dataset.lcsKeycap !== undefined || n.dataset.lcsKeyend !== undefined)) return; [...n.childNodes].forEach(walk); }; walk(t); return straight(o).replace(/\s+/g, ' ').trim(); };
    // the lines of the paragraph (level 3): their ink, and the lowest thing printed on each (a box to number goes lower)
    const pLines = para ? inkLines(para) : [];
    if (para) para.querySelectorAll('[data-lcs-numbox]').forEach((nb) => { const q = R(nb), c = (q.top + q.bottom) / 2; let best = null; pLines.forEach((l) => { if (!best || Math.abs((l.top + l.bot) / 2 - c) < Math.abs((best.top + best.bot) / 2 - c)) best = l; }); if (best) best.low = Math.max(best.low || best.bot, q.bottom); });
    const floorAbove = (i) => (i ? pLines[i - 1].low || pLines[i - 1].bot : R(para).top);
    strips.forEach((s, i) => {
      const t = s.querySelector('[data-lcs-striptext]'), shown = childText(t);
      if (s.dataset.lcsStrip === 'off') { if (shown !== e.off) fails.push('the sentence that does not belong is not printed right'); if (isKey ? !/line-through/.test(cs(t).textDecorationLine) : /line-through/.test(cs(t).textDecorationLine)) fails.push('the key does not cross out the sentence that does not belong, or the page of the child does'); }
      else {
        const want = e.sents[+s.dataset.lcsStrip];
        const fc = [...t.querySelectorAll('[data-lcs-fixcap]')], fe = [...t.querySelectorAll('[data-lcs-fixend]')];
        // the fixed text: every small letter to fix made a capital, every missing end mark added
        let fixed = ''; const walk = (n) => { if (n.nodeType === 3) { fixed += n.nodeValue; return; } if (n.dataset && (n.dataset.lcsKeycap !== undefined || n.dataset.lcsKeyend !== undefined)) return; if (n.dataset && n.dataset.lcsFixcap !== undefined) { fixed += n.dataset.lcsFixcap; return; } if (n.dataset && n.dataset.lcsFixend !== undefined) { fixed += '.'; return; } [...n.childNodes].forEach(walk); };
        walk(t); fixed = straight(fixed).replace(/\s+/g, ' ').trim();
        if (fixed !== want) fails.push(`sentence ${i + 1} holds a mistake nobody planted, or a fix that is no mistake: "${shown.slice(0, 40)}"`);
        const startSmall = /^[a-z]/.test(shown), nameSmall = hasWord(shown, e.name) && !shown.includes(e.name), noEnd = !/[.?!]$/.test(shown);
        if (fc.length !== (startSmall ? 1 : 0) + (nameSmall ? 1 : 0) || fe.length !== (noEnd ? 1 : 0)) fails.push(`sentence ${i + 1}: its mistakes are not the ones planted`);
        caps += (startSmall ? 1 : 0) + (nameSmall ? 1 : 0); nameCaps += nameSmall ? 1 : 0; ends += noEnd ? 1 : 0;
        if ((startSmall || nameSmall) && noEnd) two.push(want);
        fc.forEach((c) => { const k = c.querySelector('[data-lcs-keycap]'); if (isKey ? !k || txt(k) !== c.dataset.lcsFixcap || cs(k).color !== TEAL : k) fails.push('the key does not write the capital letter, or the page of the child does');
          // the key's capital stands above its small letter, in the room of its own line (never over the line above)
          if (k && !para && (R(k).top < R(s).top - 1 || R(k).bottom > R(c).bottom)) fails.push(`the capital letter of the key stands outside its strip (sentence ${i + 1})`);
          if (k && para) { const cy = (R(c).top + R(c).bottom) / 2, li = pLines.findIndex((l) => cy >= l.top - 12 && cy <= l.bot + 6); if (li < 0 || R(k).top < floorAbove(li) - 0.5 || R(k).bottom > R(c).bottom) fails.push(`the capital letter of the key does not stand in the room above its line (sentence ${i + 1})`); } });
        // the key adds a period; a ! is right too where the sentence can take it (the key's line says so)
        fe.forEach((c) => { const k = c.querySelector('[data-lcs-keyend]'); if (isKey ? !k || txt(k) !== '.' : k) fails.push('the key does not add the end mark, or the page of the child does'); });
      }
      // the number of the sentence (levels 2 and 3): its place in the story, on the key only; empty for the one that does
      // not belong
      const nb = s.querySelector('[data-lcs-numbox]');
      if (lv > 1 && (!nb || txt(nb) !== (isKey && s.dataset.lcsStrip !== 'off' ? String(+s.dataset.lcsStrip + 1) : ''))) fails.push(`sentence ${i + 1} is not numbered on the key by its place in the story, or is numbered on the page of the child`);
      if (lv === 1 && nb) fails.push('level 1 has boxes to number');
      // a strip: room for a capital above its letters (ROOM px clear from the top of the strip), and the sentence fits it
      if (!para) { const L = inkLines(t); const room = L.length ? L[0].top - R(s).top : 0; if (room < S.ROOM - 0.25) fails.push(`sentence ${i + 1} has ${room.toFixed(1)} px clear above its letters for a capital (${S.ROOM})`); if (t.scrollWidth > t.clientWidth + 1) fails.push(`sentence ${i + 1} does not fit its strip`); }
    });
    // the paragraph: ROOM px clear above the letters of every line (from the lowest thing printed on the line above)
    if (para) { if (pLines.length < 3) fails.push('the paragraph of level 3 has fewer than three lines'); pLines.forEach((l, i) => { const room = l.top - floorAbove(i); if (room < S.ROOM - 0.25) fails.push(`line ${i + 1} of the story has ${room.toFixed(1)} px clear above its letters for a capital (${S.ROOM})`); }); }
    if (caps !== N.caps[lv] || ends !== N.ends[lv]) fails.push(`the story holds ${caps} capital letters and ${ends} end marks to fix (level ${lv}: ${N.caps[lv]} and ${N.ends[lv]})`);
    const storyShown = strips.map((s) => childText(s.querySelector('[data-lcs-striptext]'))).join(' ');
    if (nameCaps !== 1 || countPhrase(storyShown, e.name) !== 1) fails.push('the name is not the one name of the story, printed once in small letters (every name is a target)');
    // no word whose capital is a matter of taste (a child who capitalizes it makes a fix nobody counted)
    { const w = S.TASTE.find((x) => hasWord(storyShown, x)); if (w) fails.push(`the story holds "${w}", a word some writers capitalize`); }
    // the two sentences with two mistakes each are written again the right way, in the order of the story
    const rw = [...root.querySelectorAll('[data-lcs-rewrite] [data-lcs-writes]')].map((g) => straight(g.dataset.lcsExpect));
    if (two.length !== 2 || rw.length !== 1 || rw[0] !== two.join(' ')) fails.push('the sentences to write again are not the two with two mistakes each, in the order of the story');
    { const g = root.querySelector('[data-lcs-rewrite] [data-lcs-writes]'); if (g && +g.dataset.lcsWrites !== N.rewriteRows[lv]) fails.push(`the sentences are written again on ${g.dataset.lcsWrites} rows (level ${lv}: ${N.rewriteRows[lv]})`); }
    // the key's one note: a ! is right too (the sentences written again have one right answer: no "(Sample)")
    notesWanted([S.NOTES.excl]);
    if (varyAll.length && !varyAll[0].closest('[data-lcs-task="edit"] [data-lcs-label]')) fails.push('the line about the ! does not stand in the task line of the story to edit');
  }
  if (mode === 'revise') {
    const mc = root.querySelector('[data-lcs-detail]'), x = mc && INFO.details[mc.dataset.lcsDetail];
    if (!x) { fails.push('no example of adding a detail'); return fails; }
    if (txt(mc.querySelector('[data-lcs-boxtitle]')) !== S.EX_DETAIL || [...mc.querySelectorAll('[data-lcs-exrow]')].map(txt).join('|') !== [x.plain, x.asked, x.added].map((t, i) => S.EX_ROWS[i] + ' ' + t).join('|')) fails.push('the example of adding a detail is not printed as the bank has it');
    needLabel('[data-lcs-task="checks"]', S.LINES.checks);
    const tb = root.querySelector('[data-lcs-checktable]');
    if (!tb || [...tb.querySelectorAll('[data-lcs-colhead]')].map(txt).join() !== 'Me,Partner') fails.push('the checklist has no columns Me and Partner');
    const cr = [...root.querySelectorAll('[data-lcs-checktable] [data-lcs-checktext]')].map(txt);
    if (cr.join('|') !== S.CHECK.revise[lv].join('|') || cr.length !== N.checks[lv]) fails.push(`the checklist is not the one of level ${lv}`);
    if (tb && tb.querySelectorAll('[data-lcs-tickbox]').length !== 2 * cr.length) fails.push('a check has not two boxes to tick');
    // the writing parts: level 3 starts with what the partner liked (a compliment, then the question), the two side by side
    const want = lv === 3 ? ['liked', 'asked', 'added', 'fixed'] : ['asked', 'added', 'fixed'];
    const cards = [...root.querySelectorAll('[data-lcs-task]')].map((c) => c.dataset.lcsTask).filter((k) => k !== 'checks');
    if (cards.join() !== want.join()) fails.push(`the writing parts are not ${want.join(', ')}`);
    want.forEach((k) => needLabel(`[data-lcs-task="${k}"]`, S.LINES[k]));
    if (lv === 3) { const a = root.querySelector('[data-lcs-task="liked"]'), c = root.querySelector('[data-lcs-task="asked"]'); if (!a || !c || Math.abs(R(a).top - R(c).top) > 0.5 || R(a).right > R(c).left) fails.push('what the partner liked and asked do not stand side by side'); }
    const qw = root.querySelector('[data-lcs-qwords]'); if (!!qw !== (lv === 1) || (qw && txt(qw) !== S.QWORDS)) fails.push('the question words belong to level 1 only, as they are ruled');
    // the key names the example idea of its samples and says what else is right (one row of notes under the task line of
    // the detail)
    const sp = root.querySelector('[data-lcs-task="added"] [data-lcs-also] [data-lcs-vary]');
    const sIdea = sp && Object.values(INFO.ideas).find((d) => d.revise && straight(sp.textContent) === S.SAMPLES_FOR + d.idea + ')');
    if (!sIdea || !INFO.exampleIds.includes(sIdea.id)) fails.push('the samples do not name an example idea (never a prompt)');
    else { want.forEach((k) => { const g = root.querySelector(`[data-lcs-task="${k}"] [data-lcs-writes]`); if (!g || straight(g.dataset.lcsExpect) !== sIdea.revise[k]) fails.push(`the sample of "${k}" is not the one of the idea "${sIdea.idea}"`); if (g && +g.dataset.lcsWrites !== N.reviseRows[lv][k]) fails.push(`the part "${k}" has ${g.dataset.lcsWrites} rows (${N.reviseRows[lv][k]})`); });
      if (sIdea.topic === x.topic) fails.push('the samples share their topic with the example');
      notesWanted([S.SAMPLES_FOR + sIdea.idea + ')', S.NOTES.revise]); }
    if (varyAll.some((v) => !v.closest('[data-lcs-task="added"] [data-lcs-also]'))) fails.push('a note of the key does not stand in the row of notes under the task line of the detail');
  }
  // no blank band of more than GAP px anywhere a reader looks: between two blocks, and inside every card between two
  // things printed (the lines of its visible text, its rows, its boxes), above the first and under the last; what is
  // hidden (a note of the key on the child's page) keeps no ink and counts as blank
  { const inkOf = (c) => { const out = [];
      const tw = document.createTreeWalker(c, NodeFilter.SHOW_TEXT); let n;
      while ((n = tw.nextNode())) { if (!n.nodeValue.trim()) continue; const el = n.parentElement; if (!el || el.closest('svg') || !visible(el)) continue; const r = document.createRange(); r.selectNodeContents(n); for (const q of r.getClientRects()) if (q.width && q.height) out.push(q); }
      c.querySelectorAll('svg, [data-lcs-numbox], [data-lcs-tickbox], [data-lcs-ring], [data-lcs-bullet], [data-lcs-opt]').forEach((e) => { if (e.tagName.toLowerCase() !== 'svg' && e.closest('svg')) return; if (!visible(e)) return; const q = R(e); if (q.width && q.height) out.push(q); });
      return out.sort((a, d) => a.top - d.top); };
    const bands = (c, what) => { const q = R(c), c2 = cs(c), top = q.top + parseFloat(c2.borderTopWidth), bot = q.bottom - parseFloat(c2.borderBottomWidth);
      let low = top;
      for (const r of inkOf(c)) { if (r.top - low > S.GAP + 0.5) { fails.push(`a blank band of ${Math.round(r.top - low)} px in ${what}`); return; } low = Math.max(low, r.bottom); }
      if (bot - low > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(bot - low)} px at the foot of ${what}`); };
    root.querySelectorAll('[data-lcs-card]').forEach((c) => bands(c, c.dataset.lcsTask || Object.keys(c.dataset).filter((k) => k !== 'lcsCard')[0] || 'a card'));
    const bl = blocks.map(R); for (let k = 1; k < bl.length; k++) { const g = bl[k].top - bl[k - 1].bottom; if (g > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two blocks`); }
    if (bl.length && rb.bottom - bl[bl.length - 1].bottom > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(rb.bottom - bl[bl.length - 1].bottom)} px under the last block`); }
  return fails;
}

module.exports = { makeStoryG2Type, faultsOf, plan, LEVELS, INSTR, LINES, SPEC };
