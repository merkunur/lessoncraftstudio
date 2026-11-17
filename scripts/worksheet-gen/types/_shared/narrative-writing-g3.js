/**
 * narrative-writing-g3.js — eight Grade 3 writing pages, the unit "Narrative Writing" (English literacy year, Daily
 * Teaching System Part 12.3, 2026-11-17). Children are 8 or 9. Every text is data/literacy/narrative-writing-g3.en.json
 * (written by the scratch script hh-g3narr/bank.js; hand-written and hand-judged). No picture stands on these pages.
 *
 *   parts   G3-564 The Parts of a Story (W.3.3.a; day 1 of "Plan a story"). A box tells the
 *           parts of a story; the beginning of a story (60 to 100 words, original) in a box; questions about it.
 *             level 1  a story told by a narrator who is not in it; who / where and when / what goes wrong: three
 *                      answers to circle each (the wrong ones name a person, a place, a time or a trouble that is not
 *                      in the story at all)
 *             level 2  any story (some are told by a character who says I); four questions, one of them "Who tells the
 *                      story?"; the wrong places and times keep one half of the right answer, the wrong troubles are
 *                      near the real one (they are still not in the story)
 *             level 3  any story; the child writes who, where and when, and what goes wrong on lines (the key gives the
 *                      answer and says that other words with the same meaning are right)
 *   plan    G3-565 Plan Your Story (W.3.3.a; day 2). Story ideas to circle (level 1
 *           two, levels 2 and 3 three) beside a story mountain; a planner (characters, setting, problem, three events,
 *           ending) with an example note from an idea that is not offered beside each part; a checklist.
 *             level 1  a sentence starter on every part ("My characters are", "First,", "In the end,")
 *             level 2  starters for the events and the ending only
 *             level 3  no starters; a word bank (words for when, where, feelings)
 *   marks   G3-566 Quotation Marks in Dialogue (W.3.3.b with L.3.2.c; day 1 of "Dialogue and description").
 *           A box with the rules; three speech bubbles, each with three sentences to circle; two lines of dialogue
 *           printed without marks to write with them (each on two lines; the key: the one right version).
 *             level 1  the sentences say the bubble's words in other ways: with quotation marks, told without them, with
 *                      one word changed; the lines to write are telling sentences (a comma)
 *             level 2  the three sentences have the same words and differ only in their marks; a question is written too
 *             level 3  as level 2, and the speaker comes first in some ("Kim said, ...")
 *   show    G3-567 Show Feelings in a Story (W.3.3.b; day 2). A box: telling and showing; then
 *             level 1  three telling sentences, each with two sentences to circle (the one that shows that feeling);
 *                      three lines of dialogue on frames (opening and closing quotation marks printed)
 *             level 2  two telling sentences to rewrite with an action; three lines of dialogue on two lines each, with
 *                      a box of said-words
 *             level 3  one telling sentence to rewrite with an action and a thought; three lines of dialogue, each with
 *                      an action or a thought, with a box of words that show
 *           The dialogue is for the child's own story, or for a story idea printed on the page; the key gives samples
 *           (marked) for that idea. A checklist.
 *   order   G3-568 Time Words in a Story (W.3.3.c; day 1 of "Time words"). A box of time words (to start,
 *           in the middle, to end; level 3 also for a surprise). 1. A story's events printed out of order, each starting
 *           with its time word: number them (level 1 four, level 2 five, level 3 six). The time words alone give ONE
 *           order (one day and the next morning, the days of a week, or the seasons; every time word of a story has its
 *           own place). 2. Tiny stories told in order, each with a blank: circle the time word that fits (three offered;
 *           each wrong one begins a story that has begun, ends a story whose ending is still to come, or goes back
 *           before an event it must follow). Level 1 four tiny stories with first, next, then, after that, finally;
 *           levels 2 and 3 three, with later that day, the next morning, suddenly, by dinnertime ...
 *   draft   G3-569 Write with Time Words (W.3.3.c; day 2). An example (another idea's story, its time words
 *           in teal); the child writes a story under three headings (beginning, three events, ending) for the own plan
 *           or a printed idea. Level 1: a time-word starter on the first line of the beginning, of each event and of the
 *           ending, and a row of time words; level 2: the row of time words, no starters; level 3: a word bank with more
 *           time words, no starters. The key: a sample for the printed idea. A checklist.
 *   choose  G3-570 Choose a More Exact Word (L.3.3.a; day 1 of "Revise for words that work"). A box: tired
 *           words (said, went, looked, nice, big, good). 1. Four sentences with a tired word underlined, three words to
 *           circle under each: exactly one fits. Level 1: the wrong ones are of another kind (a said-word where a
 *           went-word goes); level 2: one of the same group that a clue rules out; level 3: both of the same group.
 *           2. Two pairs of sentences: circle the one that paints a clearer picture and write why (the key: a sample).
 *           In half the pairs the clearer sentence is the shorter one.
 *   revise  G3-571 Revise for Words That Work (L.3.3.a; day 2). A box of more exact words for said, went, looked, nice,
 *           big, good; a story paragraph with eight tired words, one in each of its eight parts (its dialogue punctuated as G3-566
 *           teaches). Level 1: four of them underlined,
 *           two words to circle for each; level 2: all eight underlined, a word from the box to write for each (the key
 *           writes one and names, in a row of its own, every other word of the box that fits); level 3: nothing underlined: the child finds the eight and writes a
 *           word for each. 2. The child circles three tired words in the own story and writes the sentences again (the
 *           key: samples, and the story idea they come from).
 *
 * Writing lines are single ruled lines 34 px high (about 11/32 in, wide-ruled paper). A third grader writes about 45
 * letters across a full-width line: verify() measures that every sample of the key fits its lines at 14 px a letter
 * (CH) with at least one line to spare, a frame's blank holds its sample, and a label stands above its lines. No blank
 * band of more than 40 px between tasks, cards or blocks. The places of right answers are mixed and measured (every
 * place used, never three in a row, no staircase, never one place on every other item, no repeating block), and the
 * length of a choice never gives the answer away. Ligatures are off, an f before i, f, l or t and a t before t get room
 * of their own; apostrophes and quotation marks are typographic on everything printed (the bank keeps straight ones).
 * English only; themeless: a copy draws another story, idea, sentence set or paragraph. PDF only. The bank is checked
 * when this file loads (faultsOf), including that every level of every page can be drawn and that nothing can be copied
 * across a lesson: every piece names its topic, and no story idea (the prompt of every writing day) shares its topic
 * with a day-1 piece of its lesson or with the example printed beside it. verify() carries its own copy
 * of every ruled text and measure (SPEC) and never reads the build's constants.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/narrative-writing-g3.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle } = _parts;

const READ = 18;         // a sentence the child reads
const STORY = 17;        // a story text (17 px: what a third grader reads)
const LABEL = 17;        // a task line
const OPT = 20;          // a word or a sentence to circle
const ROW = 34;          // a handwriting line (single rule)
const RULEPX = 15.5;     // the rule box and the examples
const CH = 14;           // a third grader's printed letter with its space (45 letters across 630 px)
const GAP = 40;          // the largest blank band between tasks, cards or blocks (px)
const A = (s) => esc(s).replace(/"/g, '&quot;');
const INNER = W - 24;    // what a card holds inside its padding (651 px)
const WF = INNER;        // a line as wide as its card (the planner)
const WQ = INNER - 20;   // a line in a task row (631 px)
const WI = INNER - 54;   // a line beside a row's letter (597 px)
const WH = Math.floor((INNER - 14) / 2);   // a half line of the planner (characters, setting: 318 px)
/** the frame of a line of dialogue (G3-567 level 1): “ [the words] ” [who says them] . on one line of a task row */
const FRAME_WHO = 14 * 14 + 12, FRAME_SAY = WQ - 2 * 12 - 8 - 4 * 8 - FRAME_WHO;

/* ------------------------------------------------------------------ the texts the pages print (the build's copy) */
/** the page instruction of every level (registered as strings with add-strings.js) */
const INSTR = {
  parts: { 1: 'Every story has characters, a setting, and a problem.', 2: 'The narrator is the one who tells the story.', 3: 'A story beginning tells who, where, when, and what goes wrong.' },
  plan: { 1: 'Plan your story before you write it.', 2: 'Plan the beginning, the middle, and the end of your story.', 3: 'A story plan names the characters, setting, problem, events, and ending.' },
  marks: { 1: 'Quotation marks go around the exact words a character says.', 2: 'A comma or a question mark goes inside the closing quotation mark.', 3: 'If the speaker comes first, put a comma before the quotation marks.' },
  show: { 1: 'Show how a character feels instead of just telling it.', 2: 'An action can show how a character feels.', 3: 'Actions, thoughts, and dialogue show how a character feels.' },
  order: { 1: 'Time words tell the order of the events in a story.', 2: 'Time words such as “later that day” tell when things happen.', 3: 'Time words tell when things happen, even when something happens suddenly.' },
  draft: { 1: 'Start each event with a time word.', 2: 'Time words help a reader follow the events in order.', 3: 'Tell the events in order with time words, then end the story.' },
  choose: { 1: 'A more exact word paints a clearer picture than a tired word.', 2: 'Choose the word that fits what happens in the sentence.', 3: 'The right word matches every clue in the sentence.' },
  revise: { 1: 'Writers change tired words to more exact words.', 2: 'When writers revise, they change tired words to words that work.', 3: 'Find the tired words in a story and change them to words that work.' },
};
/** the task lines */
const LINES = {
  partsPick: 'Read the beginning of the story. Circle the answer to each question.',
  partsWrite: 'Write the answer to each question.',
  q: { chars: 'Who are the characters?', setting: 'Where and when does the story happen?', problem: 'What is the problem?', narrator: 'Who tells the story?' },
  ideas: 'Choose one story idea and circle it.',
  plan: { 1: 'Plan your story. Finish each sentence with a short note.', 2: 'Plan your story. Write short notes.', 3: 'Plan your story in short notes. Use the word bank.' },
  marks1: { 1: 'Read the words in each speech bubble. Circle the sentence that shows those exact words.', 2: 'Circle the sentence that is written the right way.', 3: 'Circle the sentence that is written the right way.' },
  marks2: { 1: 'Add quotation marks and a comma. Write the sentence.', 2: 'Add quotation marks and a comma or a question mark. Write the sentence.', 3: 'Add quotation marks and a comma or a question mark. Write the sentence. Some speakers come first.' },
  show1: { 1: 'Circle the sentence that shows how the character feels.', 2: 'Show the feeling with an action. Write a new sentence.', 3: 'Show the feeling with an action and a thought. Write two sentences.' },
  show2: { 1: 'Write three lines of dialogue: the exact words, then who says them.', 2: 'Write three lines of dialogue. Use a said-word from the box.', 3: 'Write three lines of dialogue. Add an action or a thought to each.' },
  idea: 'Your story, or this idea:',
  order1: 'Read the time words. Number the events from 1 to {n} in the order they happen.',
  order2: 'Each tiny story tells the events in order. Circle the time word that fits the blank.',
  draft: 'Write your story with one line of dialogue and one feeling.',
  draftIdea: 'Your plan, or this idea:',
  choose1: 'Circle the word that could take the place of the underlined tired word.',
  choose2: 'Circle the sentence that paints a clearer picture. Write why.',
  revise1: { 1: 'Circle the better word for each underlined word.', 2: 'Write a more exact word from the box for each underlined word.', 3: 'Find the 8 tired words in the story and circle them. Write a more exact word from the box for each one, in order.' },
  revise2: 'Circle three tired words in your own story. Write the new sentences.',
};
const RULES = {
  parts: ['<b>Characters</b>: the people or animals in a story.', '<b>Setting</b>: where and when a story happens.', '<b>Problem</b>: what goes wrong for a character.'],
  partsNarrator: '<b>Narrator</b>: the one who tells the story. If the narrator says I or my outside the quotation marks, the narrator is a character.',
  marks: ['Quotation marks go around the exact words a speaker says: "We won," said Kim.', 'A comma or an end mark (. ? !) goes inside the closing mark.', 'A ? or ! takes the place of the comma: "Who won?" asked Ted.', 'If the speaker comes first, add a comma after said and a capital: Kim said, "We won."'],
    show: ['<b>Telling</b>: Ben was curious. <b>Showing with an action</b>: Ben peeked inside the box.', '<b>Showing with a thought</b>: He thought, "What could be in there?"'],
  showDialogue: '<b>Showing with dialogue</b>: "Can I open it?" Ben asked.',
  order: { 1: ['<b>To start</b>: first', '<b>In the middle</b>: next, then, after that', '<b>To end</b>: finally'], 2: ['<b>To start</b>: first, one morning, one day', '<b>In the middle</b>: next, then, after that, after a while, later that day, the next morning', '<b>To end</b>: finally, at last, in the end'], 3: ['<b>To start</b>: first, one morning, one day', '<b>In the middle</b>: next, then, after that, after a while, later that day, the next morning', '<b>For a surprise</b>: suddenly, just then', '<b>To end</b>: finally, at last, in the end'] },
  choose: ['<b>Said, went, looked, nice, big,</b> and <b>good</b> are tired words: they tell very little.', 'A more exact word paints a clearer picture: "gobbled" tells more than "ate."'],
};
const CHECK = {
  plan: ['I named my characters.', 'I wrote where and when.', 'I wrote the problem.', 'I wrote three events in order.', 'My ending solves the problem.'],
  show: ['I put the exact words in quotation marks.', 'My comma, ? or ! is inside the marks.', 'I wrote who is talking.'],
  showAct: 'Each line has an action or a thought.',
  showSaid: 'I used a said-word that shows a feeling (cried, shouted, whispered).',
  showNoFeel: 'My new sentences do not use the feeling word.',
  draft: ['I used a time word for each event.', 'My events are in order.', 'My ending solves the problem.', 'I used one line of dialogue.', 'A character shows a feeling with an action or a thought.'],
};
const PLAN_START = { chars: 'My characters are', setting: 'The story happens', problem: 'The problem is that', events: ['First,', 'Next,', 'Then,'], ending: 'In the end,' };
const PLAN_ROWS = ['chars', 'setting', 'problem', 'events', 'ending'];
const PLAN_HEAD = { chars: 'Characters', setting: 'Setting', problem: 'Problem', events: 'Events', ending: 'Ending' };
const DRAFT_HEAD = { beginning: 'Beginning: the characters, the setting, and the problem', events: 'Middle: three events', ending: 'Ending: how the problem is solved' };
const NARRATOR_OUT = 'a narrator who is not in the story';
const VARY = '(Sample)';
const VARY_MANY = '(Samples)';
// a key sample of the child's own piece names its prompt (WRITING-PAGES.md rule 18): G3-571's samples name their idea
const SAMPLES_FOR = '(Samples for the idea: ';
const SAME_MEANING = '(Answers in other words are right.)';
const TIME_ROW = ['first', 'next', 'then', 'after that', 'later that day', 'suddenly', 'finally'];
// the time words of G3-569 on one line each: the row of levels 1 and 2, the word bank of level 3 (finding 18); "at first"
// stays in the level-3 bank and out of the samples, which start with "First," (finding 32)
const TIME_BANK = ['one morning', 'at first', 'after a while', 'the next day', 'just then', 'at last'];

/** verify()'s OWN copy of every ruled text and measure (the check never reads the build's constants: a build that changes
 *  one of them fails its pages). Written out again on purpose. */
const SPEC = {
  INSTR: {
    parts: { 1: 'Every story has characters, a setting, and a problem.', 2: 'The narrator is the one who tells the story.', 3: 'A story beginning tells who, where, when, and what goes wrong.' },
    plan: { 1: 'Plan your story before you write it.', 2: 'Plan the beginning, the middle, and the end of your story.', 3: 'A story plan names the characters, setting, problem, events, and ending.' },
    marks: { 1: 'Quotation marks go around the exact words a character says.', 2: 'A comma or a question mark goes inside the closing quotation mark.', 3: 'If the speaker comes first, put a comma before the quotation marks.' },
    show: { 1: 'Show how a character feels instead of just telling it.', 2: 'An action can show how a character feels.', 3: 'Actions, thoughts, and dialogue show how a character feels.' },
    order: { 1: 'Time words tell the order of the events in a story.', 2: 'Time words such as “later that day” tell when things happen.', 3: 'Time words tell when things happen, even when something happens suddenly.' },
    draft: { 1: 'Start each event with a time word.', 2: 'Time words help a reader follow the events in order.', 3: 'Tell the events in order with time words, then end the story.' },
    choose: { 1: 'A more exact word paints a clearer picture than a tired word.', 2: 'Choose the word that fits what happens in the sentence.', 3: 'The right word matches every clue in the sentence.' },
    revise: { 1: 'Writers change tired words to more exact words.', 2: 'When writers revise, they change tired words to words that work.', 3: 'Find the tired words in a story and change them to words that work.' },
  },
  LINES: {
    partsPick: 'Read the beginning of the story. Circle the answer to each question.',
    partsWrite: 'Write the answer to each question.',
    q: { chars: 'Who are the characters?', setting: 'Where and when does the story happen?', problem: 'What is the problem?', narrator: 'Who tells the story?' },
    ideas: 'Choose one story idea and circle it.',
    plan: { 1: 'Plan your story. Finish each sentence with a short note.', 2: 'Plan your story. Write short notes.', 3: 'Plan your story in short notes. Use the word bank.' },
    marks1: { 1: 'Read the words in each speech bubble. Circle the sentence that shows those exact words.', 2: 'Circle the sentence that is written the right way.', 3: 'Circle the sentence that is written the right way.' },
    marks2: { 1: 'Add quotation marks and a comma. Write the sentence.', 2: 'Add quotation marks and a comma or a question mark. Write the sentence.', 3: 'Add quotation marks and a comma or a question mark. Write the sentence. Some speakers come first.' },
    show1: { 1: 'Circle the sentence that shows how the character feels.', 2: 'Show the feeling with an action. Write a new sentence.', 3: 'Show the feeling with an action and a thought. Write two sentences.' },
    show2: { 1: 'Write three lines of dialogue: the exact words, then who says them.', 2: 'Write three lines of dialogue. Use a said-word from the box.', 3: 'Write three lines of dialogue. Add an action or a thought to each.' },
    idea: 'Your story, or this idea:',
    order1: 'Read the time words. Number the events from 1 to {n} in the order they happen.',
    order2: 'Each tiny story tells the events in order. Circle the time word that fits the blank.',
    draft: 'Write your story with one line of dialogue and one feeling.',
    draftIdea: 'Your plan, or this idea:',
    choose1: 'Circle the word that could take the place of the underlined tired word.',
    choose2: 'Circle the sentence that paints a clearer picture. Write why.',
    revise1: { 1: 'Circle the better word for each underlined word.', 2: 'Write a more exact word from the box for each underlined word.', 3: 'Find the 8 tired words in the story and circle them. Write a more exact word from the box for each one, in order.' },
    revise2: 'Circle three tired words in your own story. Write the new sentences.',
  },
  RULES: {
    parts: ['Characters: the people or animals in a story.', 'Setting: where and when a story happens.', 'Problem: what goes wrong for a character.'],
    partsNarrator: 'Narrator: the one who tells the story. If the narrator says I or my outside the quotation marks, the narrator is a character.',
    marks: ['Quotation marks go around the exact words a speaker says: "We won," said Kim.', 'A comma or an end mark (. ? !) goes inside the closing mark.', 'A ? or ! takes the place of the comma: "Who won?" asked Ted.', 'If the speaker comes first, add a comma after said and a capital: Kim said, "We won."'],
        show: ['Telling: Ben was curious. Showing with an action: Ben peeked inside the box.', 'Showing with a thought: He thought, "What could be in there?"'],
    showDialogue: 'Showing with dialogue: "Can I open it?" Ben asked.',
    order: { 1: ['To start: first', 'In the middle: next, then, after that', 'To end: finally'], 2: ['To start: first, one morning, one day', 'In the middle: next, then, after that, after a while, later that day, the next morning', 'To end: finally, at last, in the end'], 3: ['To start: first, one morning, one day', 'In the middle: next, then, after that, after a while, later that day, the next morning', 'For a surprise: suddenly, just then', 'To end: finally, at last, in the end'] },
    choose: ['Said, went, looked, nice, big, and good are tired words: they tell very little.', 'A more exact word paints a clearer picture: "gobbled" tells more than "ate."'],
  },
  CHECK: {
    plan: ['I named my characters.', 'I wrote where and when.', 'I wrote the problem.', 'I wrote three events in order.', 'My ending solves the problem.'],
    show: ['I put the exact words in quotation marks.', 'My comma, ? or ! is inside the marks.', 'I wrote who is talking.'],
    showAct: 'Each line has an action or a thought.',
  showSaid: 'I used a said-word that shows a feeling (cried, shouted, whispered).',
  showNoFeel: 'My new sentences do not use the feeling word.',
    draft: ['I used a time word for each event.', 'My events are in order.', 'My ending solves the problem.', 'I used one line of dialogue.', 'A character shows a feeling with an action or a thought.'],
  },
  PLAN_START: { chars: 'My characters are', setting: 'The story happens', problem: 'The problem is that', events: ['First,', 'Next,', 'Then,'], ending: 'In the end,' },
  PLAN_HEAD: { chars: 'Characters', setting: 'Setting', problem: 'Problem', events: 'Events', ending: 'Ending' },
  DRAFT_HEAD: { beginning: 'Beginning: the characters, the setting, and the problem', events: 'Middle: three events', ending: 'Ending: how the problem is solved' },
  NARRATOR_OUT: 'a narrator who is not in the story',
  TITLE_STOP: ['in', 'on', 'at', 'the', 'a', 'an', 'of', 'after', 'before', 'to', 'and', 'outside', 'is', 'are', 'was', 'his', 'her', 'their', 'its', 'with', 'for', 'from', 'by', 'not', 'no', 'cannot', 'does', 'do', 'that', 'this', 'it', 'he', 'she', 'they', 'i', 'my', 'our', 'we', 'up', 'out', 'all', 'so', 'too', 'very'],
  VARY: '(Sample)', VARY_MANY: '(Samples)', SAME_MEANING: '(Answers in other words are right.)',
  NOTES: ['(Sample)', '(Samples)', '(Answers in other words are right.)', '(Sample plan: idea 1)', '(Any word of the box that fits is right.)'],
  SAMPLES_FOR: '(Samples for the idea: ',
  TIME_ROW: ['first', 'next', 'then', 'after that', 'later that day', 'suddenly', 'finally'],
  ONE_DAY: 'One day,', EX_LINES: 3,
  FEEL: ['smiled', 'grinned', 'laughed', 'cheered', 'gasped', 'sighed', 'frowned', 'shook', 'trembled', 'giggled', 'jumped', 'hugged', 'clapped'],
  TIME_BANK: ['one morning', 'at first', 'after a while', 'the next day', 'just then', 'at last'],
  PLACE_GROUPS: [['playground', 'blacktop', 'schoolyard', 'field'], ['classroom', 'class'], ['lunchroom', 'cafeteria'], ['hallway', 'hall']],
  DAY_PARTS: { morning: ['morning', 'before school', 'breakfast', 'sunrise', 'early'], noon: ['lunch', 'noon'], afternoon: ['afternoon', 'after school', 'after lunch'], evening: ['evening', 'dinner', 'sunset'], night: ['night', 'bedtime'] },
  ALSO: '(Also right: ',
  // the measures: a line, a child's letter, the largest blank band, the sizes of what a child reads and circles
  ROW: 34, CH: 14, GAP: 40, READ: 17, OPT: 20, RULE: 15, LABEL: 16, KEY: 13, FILL: 0.8, SAME_ANSWER_MAX: 2,
  // the levels (literal here: a check that read them from LEVELS would agree with any change)
  N: { parts: { 1: 3, 2: 4, 3: 3 }, ideas: { 1: 2, 2: 3, 3: 3 }, marks1: { 1: 3, 2: 3, 3: 3 }, marks2: { 1: 2, 2: 2, 3: 2 }, show1: { 1: 3, 2: 2, 3: 1 }, events: { 1: 4, 2: 5, 3: 6 }, gaps: { 1: 4, 2: 3, 3: 3 }, choose: { 1: 4, 2: 4, 3: 4 }, pairs: { 1: 2, 2: 2, 3: 2 }, slots: { 1: 4, 2: 8, 3: 8 }, draftLines: { 1: [3, 7, 3], 2: [4, 7, 3], 3: [4, 7, 3] } },
};

/* ------------------------------------------------------------------ words and texts */
const words = (s) => String(s).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
const hasWord = (s, w) => { const ws = words(s), q = words(w); for (let i = 0; i + q.length <= ws.length; i++) if (q.every((x, k) => ws[i + k] === x)) return true; return false; };
/** the text outside the quotation marks (the narrator's words) */
const outside = (s) => String(s).replace(/"[^"]*"/g, ' ');
const insideQ = (s) => (String(s).match(/"[^"]*"/g) || []).join(' ');
const sentencesOf = (s) => String(s).match(/[^.!?]+[.!?]+"?/g).map((x) => x.trim());
const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
/** a line of dialogue written the right way: the words first ("...," said Leo.) or the speaker first (Leo said, "...") */
function dlgRight(d, form) {
  const end = d.s.slice(-1), core = d.s.slice(0, -1);
  if (form === 'tag') return `${d.n} ${d.tag}, "${d.s}"`;
  return end === '?' || end === '!' ? `"${d.s}" ${d.tag} ${d.n}.` : `"${core}," ${d.tag} ${d.n}.`;
}
/** the words a frame of level 1 holds inside its quotation marks: a question or an exclamation keeps its mark, a telling
 *  sentence ends with a comma */
const frameSay = (d) => (/[?!]$/.test(d.s) ? d.s : d.s.slice(0, -1) + ',');
/** the same words printed without their marks (what the child writes with them) */
function dlgRaw(d, form) {
  // the period that ends the sentence is printed (the child adds the quotation marks and the comma or question mark the
  // rule box teaches); speaker first, the spoken words keep their capital and their own end mark
  const core = d.s.slice(0, -1);
  if (form === 'tag') return `${d.n} ${d.tag} ${d.s}`;
  return `${core} ${d.tag} ${d.n}.`;
}
/** two sentences with the same words and wrong marks (levels 2 and 3) */
function dlgWrong(d, form) {
  const end = d.s.slice(-1), core = d.s.slice(0, -1);
  if (form === 'tag') return [`${d.n} ${d.tag} "${d.s}"`, `${d.n} ${d.tag}, "${core}"${end}`];
  if (end === '?') return [`"${core}," ${d.tag} ${d.n}.`, `"${core}"? ${d.tag} ${d.n}.`];
  return [`"${core}" ${d.tag} ${d.n}.`, `"${core}", ${d.tag} ${d.n}.`];
}
/** a third grader's letters on a line: how many a line of w px holds after a starter of sw px */
const capOf = (w, sw) => Math.max(0, Math.floor((w - (sw ? sw + 8 : 0) - 10) / CH));
/** the key's text spread over lines whose capacities are caps (greedy, word by word); null when it does not fit */
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
/** a starter's printed width (17-18 px bold Nunito: about 10 px a letter, counted generously) */
const starterW = (s) => (s ? Math.ceil(String(s).length * 10) : 0);
/** the places of the right answers: every place used (n >= m), no place more than half (two places: 60 %), never three
 *  in a row, no staircase, two places never alternating all the way, and no pattern a child could read */
function patternOf(o) {
  const n = o.length;
  for (const par of [0, 1]) { const sub = o.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
  const runs = []; o.forEach((x, i) => { if (i && x === o[i - 1]) runs[runs.length - 1]++; else runs.push(1); });
  if (runs.length >= 3 && runs[0] >= 2 && runs.slice(0, -1).every((r) => r === runs[0])) return 'runs of one length';
  for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (o[i + k] !== o[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
  return '';
}
function placesOk(p, m) {
  const n = p.length, count = (v) => p.filter((x) => x === v).length, s = p.join('');
  if (n >= m && new Set(p).size < m) return false;
  if (n >= 4 && Math.max(...Array.from({ length: m }, (_, v) => count(v))) > Math.ceil(n * (m === 2 ? 0.6 : 0.5))) return false;
  if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
  if (m >= 3 && p.some((x, i) => i >= 2 && ((p[i - 1] === p[i - 2] + 1 && x === p[i - 1] + 1) || (p[i - 1] === p[i - 2] - 1 && x === p[i - 1] - 1)))) return false;
  if (m === 2 && (/01010|10101/.test(s) || (n >= 4 && p.every((x, i) => !i || x !== p[i - 1])))) return false;
  return !patternOf(p);
}
function places(n, m, rng) {
  for (let t = 0; t < 5000; t++) { const p = Array.from({ length: n }, () => rng.int(0, m - 1)); if (placesOk(p, m)) return p; }
  throw new Error(`no mixed places for ${n} answers among ${m}`);
}
/** the length of a choice gives nothing away: over a task of three items or more, the right one is the longest of its
 *  row in at most half the rows and the shortest in at most half */
function lengthOk(rows) {
  if (rows.length < 3) return true;
  const longest = rows.filter((r) => r.opts.every((o) => o === r.right || o.length < r.right.length)).length;
  const shortest = rows.filter((r) => r.opts.every((o) => o === r.right || o.length > r.right.length)).length;
  return longest <= rows.length / 2 && shortest <= rows.length / 2;
}
/** the printed order of events to number: not in order or backward, no run of three in order either way, the first
 *  printed is not the first event and the last printed not the last */
function orderOk(o) {
  const n = o.length;
  if (o[0] === 0 || o[n - 1] === n - 1) return false;
  if (o.some((x, i) => i >= 2 && ((o[i - 1] === o[i - 2] + 1 && x === o[i - 1] + 1) || (o[i - 1] === o[i - 2] - 1 && x === o[i - 1] - 1)))) return false;
  if (o.filter((x, i) => i && x === o[i - 1] + 1).length > 1) return false;
  return true;
}

/* ------------------------------------------------------------------ the bank check */
const TIRED = ['said', 'went', 'looked', 'nice', 'big', 'good'];
const NARRATOR_WORDS = /\b(I|me|my|we|us|our)\b/;
/** caps of the planner's notes (short notes: the rows hold more, but a plan is notes) */
const PLAN_CAP = { chars: 30, setting: 30, problem: 30, events: 26, ending: 34 };
// G3-564: a setting to circle (place and time) has 52 letters at most: its column holds about 56 at 20 px
const SET_MAX = 52;
/** the samples of the unit name a place and (setting notes) a time, and show a feeling in an action (rule 4: a sample
 *  follows the page's own rules); "class" is the children, not a place */
const PLACE_WORDS = ['classroom', 'library', 'room', 'hallway', 'hall', 'lunchroom', 'playground', 'gym', 'water table', 'corner', 'schoolyard', 'field', 'bus', 'office'];
const TIME_WORDS = ['morning', 'afternoon', 'evening', 'recess', 'lunch', 'noon', 'after school', 'before school', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'spring', 'summer', 'fall', 'winter', 'early'];
const FEEL_WORDS = ['smiled', 'grinned', 'laughed', 'cheered', 'gasped', 'sighed', 'frowned', 'shook', 'trembled', 'giggled', 'jumped', 'hugged', 'clapped'];
/** letters of one line in a task row (a written answer of G3-564 that takes one line) */
const LINE_CAP = 44;
/** the sample fits n lines of w px (the first after its starter) at a child's letter width, with the last line free */
const fitsLines = (text, w, n, starter) => !!spread(text, Array.from({ length: n - 1 }, (_, i) => capOf(w, i === 0 ? starterW(starter) : 0)));
/** the lines of a written answer of G3-564 level 3: two when it takes one line, three when it takes two */
const partsLines = (t) => (spread(t, [capOf(WQ, 0)]) ? 2 : 3);
/** a line of dialogue can be printed with the speaker first (its words are then printed in small letters): never one
 *  that starts with I */
const tagOk = (d) => !/^I\b/.test(d.s);
/** G3-564: a name, a place or a time of the pools is a wrong answer for a story only where none of its words stands in
 *  the story (nor in the right place or time) */
const STOPW = new Set(['in', 'on', 'at', 'the', 'a', 'an', 'of', 'after', 'before', 'to', 'and', 'outside']);
const contentW = (p) => words(p).filter((w) => !STOPW.has(w));
/** G3-564: the words of a title compared with the right answers (round 3, ruling 1): function words dropped, a
 *  possessive and a plural or past ending taken off ("Nina's" = "nina", "beads" = "bead") */
const TITLE_STOP = ['in', 'on', 'at', 'the', 'a', 'an', 'of', 'after', 'before', 'to', 'and', 'outside', 'is', 'are', 'was', 'his', 'her', 'their', 'its', 'with', 'for', 'from', 'by', 'not', 'no', 'cannot', 'does', 'do', 'that', 'this', 'it', 'he', 'she', 'they', 'i', 'my', 'our', 'we', 'up', 'out', 'all', 'so', 'too', 'very'];
const titleWords = (x) => words(x).map((w) => w.replace(/'s$/, '')).filter((w) => !TITLE_STOP.includes(w)).map((w) => w.replace(/(ing|ed|es|s)$/, ''));
/** a grown-up a story may name beside its two characters; the key of level 3 then names that person too */
const GROWN_UPS = ['mom', 'mother', 'dad', 'father', 'grandma', 'grandpa', 'aunt', 'uncle', 'teacher', 'coach'];
const absentIn = (p, text) => { const t = words(text); return contentW(p).every((w) => !t.includes(w)); };
/** the wrong answers a page may offer for a story, each list split into the ones shorter (lo) and longer (hi) than the
 *  right answer; null where the pools give no shorter or no longer one */
/** G3-564: a wrong place or time is never a synonym, nor a wider or narrower name, of the right one (blacktop and
 *  playground; morning and before school): places of one group, and times of one day or of one part of the day where
 *  either names no day, clash */
const PLACE_GROUPS = [['playground', 'blacktop', 'schoolyard', 'field'], ['classroom', 'class'], ['lunchroom', 'cafeteria'], ['hallway', 'hall']];
const DAY_PARTS = { morning: ['morning', 'before school', 'breakfast', 'sunrise', 'early'], noon: ['lunch', 'noon'], afternoon: ['afternoon', 'after school', 'after lunch'], evening: ['evening', 'dinner', 'sunset'], night: ['night', 'bedtime'] };
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const groupsOf = (p) => PLACE_GROUPS.map((g, i) => (g.some((w) => hasWord(p, w)) ? i : -1)).filter((i) => i >= 0);
const placeClash = (a, b) => groupsOf(a).some((g) => groupsOf(b).includes(g));
const partsOf = (t) => { const ps = Object.keys(DAY_PARTS).filter((k) => DAY_PARTS[k].some((w) => hasWord(t, w))); return hasWord(t, 'recess') ? [...new Set([...ps, 'morning', 'noon', 'afternoon'])] : ps; };
const dayOf = (t) => DAYS.find((d) => words(t).includes(d)) || null;
const timeClash = (a, b) => { const da = dayOf(a), db = dayOf(b); if (da && db && da !== db) return false; const pa = partsOf(a), pb = partsOf(b);
  if (pa.some((p) => pb.includes(p))) return true; return !!(da && db && da === db && (!pa.length || !pb.length)); };
/** a question gives its answer away when the right option is the only one that shares a part (a name; a place or a time)
 *  with each of the other two (finding 2 of the review) */
const halvesTell = (opts, right, partsOfOpt) => { const P = opts.map(partsOfOpt), sh = (i, j) => P[i].some((x) => P[j].includes(x));
  const both = (i) => opts.every((_, j) => j === i || sh(i, j)); const r = opts.indexOf(right); return both(r) && opts.every((_, i) => i === r || !both(i)); };
/** the parts of an option of a story's question: the two names of a pair; the place and the time of a setting */
const optParts = (s, PO, q) => (o) => { if (q === 'chars') return o.split(' and ');
  const p = [s.place, ...PO.places].find((x) => o.startsWith(x + ' ')) || ''; return [p, o.slice(p.length + 1)]; };
function wrongsOf(s, PO) {
  const R = s.chars.join(' and '), set = s.place + ' ' + s.time;
  const names = PO.names.filter((n) => absentIn(n, s.text) && !s.chars.some((c) => words(c).includes(n.toLowerCase())));
  // every wrong pair keeps the first character: the right pair is then never the one that shares a name with each wrong one
  const forms = names.map((n) => s.chars[0] + ' and ' + n);
  const split = (list, len, key = (x) => x) => { const lo = list.filter((o) => key(o).length < len), hi = list.filter((o) => key(o).length > len); return lo.length && hi.length ? { lo, hi } : null; };
  // a story at school takes its wrong times from the school day (a Sunday morning in a classroom is ruled out without reading)
  const TP = s.school === false ? PO.times : PO.schoolTimes;
  const places = PO.places.filter((p) => absentIn(p, s.text) && absentIn(p, s.place) && !placeClash(p, s.place)), times = TP.filter((t) => absentIn(t, s.text) && absentIn(t, s.time) && !timeClash(t, s.time));
  // a setting to circle stands on one line of its column (SET_MAX letters at 20 px), the right one too (the bank check)
  const far = []; places.forEach((p) => times.forEach((t) => { if ((p + ' ' + t).length <= SET_MAX) far.push({ p, t, s: p + ' ' + t }); }));
  const nT = times.map((t) => s.place + ' ' + t).filter((x) => x.length <= SET_MAX), nP = places.map((p) => p + ' ' + s.time).filter((x) => x.length <= SET_MAX);
  // level 2: both wrong settings keep the SAME half (two wrong times with the right place, or two wrong places with the
  // right time), one shorter and one longer than the right one; a family that cannot do that is left out
  const fam = (list) => (list.some((x) => x.length > set.length) && list.some((x) => x.length < set.length) ? list : null);
  const near = fam(nT) || fam(nP) ? { nT: fam(nT), nP: fam(nP) } : null;
  return { chars: split(forms, R.length), far: split(far, set.length, (x) => x.s), near, names, places, times };
}

function faultsOf(b) {
  const f = [];
  const S = b.stories || [], ID = b.ideas || [];
  // G3-564: the beginnings
  if (S.filter((s) => s.pov === 'third').length < 14 || S.filter((s) => s.pov === 'first').length < 10) f.push('stories: fewer than 14 told by a narrator who is not in them, or fewer than 10 told by a character');
  const PO = b.pools || {};
  if ((PO.names || []).length < 12 || (PO.places || []).length < 12 || (PO.times || []).length < 12 || (PO.schoolTimes || []).length < 12) f.push('pools: fewer than 12 names, places, times, or school-day times');
  if (new Set(S.map((s) => s.id)).size !== S.length) f.push('stories: an id stands twice');
  S.forEach((s) => {
    const tag = `story "${s.id}"`, n = words(s.text).length;
    if (n < 60 || n > 100) f.push(`${tag}: ${n} words (60 to 100)`);
    if ((s.text.match(/"/g) || []).length % 2) f.push(`${tag}: a quotation mark has no partner`);
    if (s.pov === 'third' && NARRATOR_WORDS.test(outside(s.text))) f.push(`${tag}: the narrator says I, me, my, we, us, or our outside the quotation marks`);
    if (s.pov === 'first' && (!/\b(I|my)\b/.test(outside(s.text)) || !new RegExp('"' + s.narrator + ', ').test(s.text))) f.push(`${tag}: a narrator who is a character must say I and be called by name in a line of dialogue`);
    if (!Array.isArray(s.chars) || s.chars.length !== 2) f.push(`${tag}: not two characters`);
    (s.chars || []).forEach((c) => { const bare = c.replace(/^his /, '').replace(/^her /, ''); if (!new RegExp('\\b' + bare + '\\b', 'i').test(s.text) && !(s.pov === 'first' && c === s.narrator)) f.push(`${tag}: the character "${c}" is not in the text`); });
    if (s.pov === 'first' && !s.chars.includes(s.narrator)) f.push(`${tag}: the narrator is not one of the characters`);
    if (!hasWord(s.text, s.place.replace(/^(in|on|at|outside) (the )?/, '')) || !s.time.replace(/^(on|at|in|after) (a |the )?/, '').split(' ').every((w) => hasWord(s.text, w))) f.push(`${tag}: the setting "${s.place} ${s.time}" is not in the text word for word`);
    const absentOk = (list, what) => list.forEach(([opt, absent]) => { if (!opt) f.push(`${tag}: an empty ${what}`); (absent || []).forEach((w) => { if (hasWord(s.text, w)) f.push(`${tag}: the wrong ${what} "${opt}" names "${w}", which is in the text`); }); });
    absentOk(s.far || [], 'problem'); absentOk(s.near || [], 'problem');
    if ((s.far || []).length !== 2 || (s.near || []).length !== 2) f.push(`${tag}: not two wrong problems of each kind`);
    // the length of a problem tells nothing: of its two wrong ones, one is longer and one is shorter
    for (const tier of ['far', 'near']) { const ls = (s[tier] || []).map((x) => x[0].length); if (!(ls.some((l) => l > s.problem.length) && ls.some((l) => l < s.problem.length))) f.push(`${tag}: the ${tier} wrong problems are not one longer and one shorter than the right one`); }
    // a problem to circle fits its column (50 letters at 20 px)
    if ([s.problem, ...(s.far || []), ...(s.near || [])].map((x) => (Array.isArray(x) ? x[0] : x)).some((o) => o.length > 50)) f.push(`${tag}: a problem to circle is longer than 50 letters`);
    if ((s.place + ' ' + s.time).length > SET_MAX) f.push(`${tag}: the setting to circle "${s.place} ${s.time}" is longer than ${SET_MAX} letters`);
    // the pools give wrong names, places, and times that are not in the story, one longer and one shorter than the right one
    const W3 = wrongsOf(s, PO);
    // every wrong pair keeps the first character; no wrong place or time is another name for the right one
    if (W3.chars && [...W3.chars.lo, ...W3.chars.hi].some((o) => !o.startsWith(s.chars[0] + ' and '))) f.push(`${tag}: a wrong pair does not keep the first character`);
    for (const o of [...(W3.far ? [...W3.far.lo, ...W3.far.hi] : [])]) if (placeClash(o.p, s.place) || timeClash(o.t, s.time)) f.push(`${tag}: the wrong setting "${o.s}" can be the right one`);
    // level 1: a wrong setting keeps neither the place nor the time of the right one (no half to match); level 2: both
    // wrong settings of a family keep the same half (the right one is then never the only one that shares a half)
    for (const o of [...(W3.far ? [...W3.far.lo, ...W3.far.hi] : [])]) if (o.p === s.place || o.t === s.time) f.push(`${tag}: a wrong setting of level 1 keeps the place or the time of the right one`);
    if (W3.near && ((W3.near.nT || []).some((o) => !o.startsWith(s.place + ' ')) || (W3.near.nP || []).some((o) => !o.endsWith(' ' + s.time)))) f.push(`${tag}: a family of wrong settings of level 2 does not keep its half`);
    for (const o of [...((W3.near && W3.near.nT) || []), ...((W3.near && W3.near.nP) || [])]) { const pl = [s.place, ...PO.places].find((x) => o.startsWith(x + ' ')) || '', tm = o.slice(pl.length + 1);
      if ((pl !== s.place && placeClash(pl, s.place)) || (tm !== s.time && timeClash(tm, s.time))) f.push(`${tag}: the wrong setting "${o}" can be the right one`); }
    // a title names no word of the right characters, setting or problem (nor of the other right problem of the key),
    // unless every wrong choice of that question carries the word too (finding 10; round 3, ruling 1): an answer is
    // never found by matching the title
    const tW = titleWords(s.title);
    const wrongSet = [...(W3.far ? [...W3.far.lo, ...W3.far.hi].map((o) => o.s) : []), ...((W3.near && W3.near.nT) || []), ...((W3.near && W3.near.nP) || [])];
    for (const [q, right, wrongs] of [['characters', s.chars.join(' and '), W3.chars ? [...W3.chars.lo, ...W3.chars.hi] : []], ['setting', s.place + ' ' + s.time, wrongSet], ['problem', s.problem + ' ' + (s.also || ''), [...(s.far || []), ...(s.near || [])].map(([o]) => o)]])
      [...new Set(titleWords(right))].filter((w) => tW.includes(w)).forEach((w) => { if (!wrongs.length || !wrongs.every((o) => titleWords(o).includes(w))) f.push(`${tag}: the title "${s.title}" names "${w}" of the right ${q}, and not every wrong choice carries it`); });
    // a grown-up the story names beside its two characters (the mother of the sandcastle story) is named in the key's
    // other right answers of level 3, and no wrong pair of levels 1 and 2 names that person
    const grown = [...new Set(words(outside(s.text)).filter((w) => GROWN_UPS.includes(w) && !words(s.chars.join(' ')).includes(w)))];
    if (grown.length && (!s.alsoChars || grown.some((w) => !hasWord(s.alsoChars, w)) || s.chars.some((c) => !hasWord(s.alsoChars, c.replace(/^(his|her) /, ''))))) f.push(`${tag}: the story names ${grown.join(', ')} beside its characters, and the key's other right characters do not name them all`);
    const avoid = [...(grown.length ? GROWN_UPS : []), ...(s.alsoChars ? words(s.alsoChars).map((w) => w.replace(/'s$/, '')).filter((w) => !words(s.chars.join(' ')).includes(w) && !TITLE_STOP.includes(w)) : [])];
    if (avoid.length && W3.chars && [...W3.chars.lo, ...W3.chars.hi].some((o) => words(o).some((w) => avoid.includes(w)))) f.push(`${tag}: a wrong pair of characters names a person of the key's other right characters`);
    if (typeof s.school !== 'boolean') f.push(`${tag}: not marked as set at school or outside it`);
    if (s.pov === 'first' && !['girl', 'boy'].includes(s.narratorIs)) f.push(`${tag}: the key cannot name the narrator as the girl or the boy who says I`);
    // the key's row of other right answers (level 3) stands on two lines at 13 px at most (about 190 letters)
    if (s.also && !/\.$/.test(s.also)) f.push(`${tag}: the other right problem is not one sentence`);
    if (('Also right: ' + (s.alsoChars ? 'a. ' + s.alsoChars + ' · ' : '') + (s.also ? 'c. ' + s.also + ' · ' : '') + 'd. someone who is not in the story').length > 190) f.push(`${tag}: the other right answers do not fit two lines of the key`);
    if (!W3.chars || !W3.far || !W3.near) f.push(`${tag}: the pools give no wrong ${!W3.chars ? 'characters' : 'settings'} of a longer and a shorter length`);
    for (const [q, t] of [['chars', cap1(s.chars.join(' and '))], ['setting', cap1(s.place + ' ' + s.time)], ['problem', s.problem]]) if (!fitsLines(t, WQ, partsLines(t), null)) f.push(`${tag}: the written answer of ${q} does not fit its lines at a child's letter width`);
    const opts = [s.problem, ...s.far.map((x) => x[0]), ...s.near.map((x) => x[0])];
    if (new Set(opts).size !== 5) f.push(`${tag}: two problems are one`);
    if (s.near.some(([o]) => o === s.problem) || s.far.some(([o]) => o === s.problem)) f.push(`${tag}: a wrong problem is the right one`);
  });
  // ideas: the prompts (offered on G3-565, printed as "this idea" on G3-567 and G3-569) and the example ideas (the example
  // notes of G3-565, the example drafts of G3-569 and the samples of G3-571: never a prompt, finding 7)
  const EX = b.exampleIdeas || [];
  if (ID.length < 13 || EX.length < 3) f.push('ideas: fewer than 13 prompts or fewer than 3 example ideas');
  const storyTopics = S.map((s) => s.title.toLowerCase());
  [...ID, ...EX].forEach((d) => {
    const isEx = EX.includes(d), tag = `${isEx ? 'example idea' : 'idea'} "${d.id}"`, p = d.plan || {}, dr = d.draft || {};
    if (/\b(christmas|halloween|easter|hanukkah|church|god|birthday|vacation|trip to|my dog|my cat|my brother|my sister|my house)\b/i.test(d.idea)) f.push(`${tag}: the idea assumes a holiday, a belief, a trip, a pet, a sibling, or a house`);
    for (const k of ['chars', 'setting', 'problem', 'ending']) if (!p[k] || p[k].length > PLAN_CAP[k]) f.push(`${tag}: the plan note "${k}" is missing or longer than ${PLAN_CAP[k]} letters`);
    if (!Array.isArray(p.events) || p.events.length !== 3 || p.events.some((e) => e.length > PLAN_CAP.events)) f.push(`${tag}: not three event notes of ${PLAN_CAP.events} letters or fewer`);
    for (const k of ['chars', 'setting', 'problem', 'ending']) { const half = k === 'chars' || k === 'setting', w = half ? WH : WF, n = half ? 3 : 2; if (p[k] && (!fitsLines(p[k], w, n, PLAN_START[k]) || !fitsLines(cap1(p[k]), w, n, null))) f.push(`${tag}: the plan note "${k}" does not fit its lines`); }
    (p.events || []).forEach((e, k) => { if (!fitsLines(e, WF, 2, PLAN_START.events[k]) || !fitsLines(cap1(e), WF, 2, null)) f.push(`${tag}: the event note "${e}" does not fit its line`); });
    if (/[.?!]$/.test(p.chars + p.setting + p.problem) || (p.events || []).some((e) => /[.?!]$/.test(e))) f.push(`${tag}: a plan note ends with a mark (notes are not sentences)`);
    if (!/^(in|on|at|outside) /.test(p.setting || '')) f.push(`${tag}: the setting note does not start with in, on, at, or outside`);
    const all = [dr.beginning, ...(dr.events || []), dr.ending];
    if (all.length !== 5 || all.some((s) => !s || !/^[A-Z][^,]*, /.test(s) || !/[.!?]"?$/.test(s))) f.push(`${tag}: the draft is not a beginning, three events and an ending, each starting with its time word and a comma`);
    if (all.length === 5 && all.every(Boolean)) {
      const [st, rest] = [(s) => s.match(/^([^,]+,)/)[1], (s) => s.replace(/^[^,]+, /, '')];
      if (!fitsLines(dr.beginning, WQ, 4, null)) f.push(`${tag}: the beginning does not fit three lines`);
      if (!fitsLines(rest(dr.ending), WQ, 3, st(dr.ending)) || !fitsLines(dr.ending, WQ, 3, null)) f.push(`${tag}: the ending does not fit two lines`);
      for (const s of dr.events) if (!fitsLines(rest(s), WQ, 2, st(s)) || !fitsLines(s, WQ, 2, null)) f.push(`${tag}: the event "${s}" does not fit one line`);
    }
    if (!/^(Finally|In the end|At last),/.test(dr.ending || '')) f.push(`${tag}: the ending does not start with finally, in the end, or at last`);
    // every event of the sample draft starts with a time word (what the page asks of the child), the beginning with a time
    (dr.events || []).forEach((s, k) => { const m = (s || '').match(/^([^,]+),/); if (!m || !/^(first|at first|next|then|after that|after a while|later that day|the next morning|suddenly|just then|after lunch|at lunch)$/i.test(m[1])) f.push(`${tag}: event ${k + 1} of the draft does not start with a time word`); });
    if (!/^(One|On|At|After|Before|Early)\b/.test(dr.beginning || '')) f.push(`${tag}: the beginning of the draft does not start with when it happens`);
    // the heading over the beginning asks for the characters: the sample names every one of its plan in the beginning or,
    // a friend who comes in at once, in the first event (the reviewer's readaloud: "she read it to her friend Max")
    const nms = (p.chars || '').split(/\s+/).map((w) => w.replace(/[^A-Za-z]/g, '')).filter((w) => /^[A-Z]/.test(w) && !['Mr', 'Ms', 'Mrs'].includes(w));
    const intro = (t) => (t || '') + ' ' + ((dr.events || [])[0] || '');
    for (const nm of nms) if (!new RegExp('\\b' + nm + '\\b').test(intro(dr.beginning))) f.push(`${tag}: the beginning of the draft does not name ${nm}`);
    if (nms.length && !new RegExp('\\b' + nms[0] + '\\b').test(dr.beginning || '')) f.push(`${tag}: the beginning of the draft does not name ${nms[0]}`);
    // the sample follows the page's own rules (finding 8, ruling E): a setting note names a place and a time; the beginning
    // names the place; the draft has a line of dialogue and a sentence that shows a feeling (ruling G)
    if (!PLACE_WORDS.some((w) => hasWord(p.setting || '', w)) || !TIME_WORDS.some((w) => hasWord(p.setting || '', w))) f.push(`${tag}: the setting note "${p.setting}" does not name a place and a time`);
    if (!PLACE_WORDS.some((w) => hasWord(dr.beginning || '', w))) f.push(`${tag}: the beginning of the draft does not name the place`);
    const story = [dr.beginning, ...(dr.events || []), dr.ending].join(' ');
    if (!/"[^"]+[,.!?]"/.test(story)) f.push(`${tag}: the draft has no line of dialogue`);
    if (!words(story).some((w) => FEEL_WORDS.includes(w))) f.push(`${tag}: no sentence of the draft shows a feeling`);
    if (isEx) { if (story.length > 200) f.push(`${tag}: the example draft is longer than three printed lines (200 letters)`); }
    else {
      // level 1 of G3-569 starts the beginning with "One day," (it fits any plan): the sample after it names the characters
      // and the place and fits two lines
      if (!dr.oneDay || !fitsLines(dr.oneDay, WQ, 3, 'One day,') || /^[A-Z]/.test(dr.oneDay) && !/^(Mr|Ms|Mrs|[A-Z][a-z]+'s|[A-Z][a-z]+ and)\b/.test(dr.oneDay)) f.push(`${tag}: no level-1 beginning after "One day," that fits two lines`);
      if (!PLACE_WORDS.some((w) => hasWord(dr.oneDay || '', w))) f.push(`${tag}: the level-1 beginning does not name the place`);
      for (const nm of nms) if (!new RegExp('\\b' + nm + '\\b').test(intro(dr.oneDay))) f.push(`${tag}: the level-1 beginning does not name ${nm}`);
    }
    if (isEx) { if (!Array.isArray(d.revise) || d.revise.length !== 3) f.push(`${tag}: not three revised sentences`); }
    else if (!Array.isArray(d.dialogue) || d.dialogue.length !== 3) f.push(`${tag}: not three lines of dialogue`);
    // G3-567 (finding 17): a level-1 frame shows a feeling with its said-word; a level-3 line uses a word of the box
    if (!isEx && !(d.dialogue || []).some((x) => ['cried', 'shouted', 'whispered'].includes(x.tag))) f.push(`${tag}: no line of dialogue uses cried, shouted, or whispered`);
    if (!isEx && !(d.dialogue || []).some((x) => (b.showWords || []).some((w) => hasWord(x.act, w)))) f.push(`${tag}: no action of the dialogue uses a word of the box of words that show`);
    (d.dialogue || []).forEach((x) => {
      const full = dlgRight(x, 'first');
      if (!/[.?!]$/.test(x.s) || !/^[A-Z]/.test(x.s)) f.push(`${tag}: "${x.s}" is not a sentence with its end mark`);
      if (!fitsLines(full, WQ, 2, '1.')) f.push(`${tag}: the line "${full}" does not fit one line`);
      if (!fitsLines(full + ' ' + x.act, WQ, 3, '1.')) f.push(`${tag}: the line with its action does not fit two lines`);
      if (frameSay(x).length * CH + 12 > FRAME_SAY || (x.tag + ' ' + x.n).length * CH + 12 > FRAME_WHO) f.push(`${tag}: "${x.s}" does not fit the frame of level 1`);
      if (!/^(She|He|Her|His) /.test(x.act) || !/\.$/.test(x.act)) f.push(`${tag}: the action "${x.act}" is not a sentence about the speaker`);
      // level 2 asks for a said-word from the box: the samples use one
      if (!(b.saidWords || []).includes(x.tag)) f.push(`${tag}: the said-word "${x.tag}" of a sample is not in the box of said-words`);
    });
    if (!Array.isArray(d.revise) || d.revise.length !== 3 || d.revise.some((s) => !fitsLines(s, WQ, 2, '1.') || !/^[A-Z]/.test(s))) f.push(`${tag}: not three revised sentences of one line`);
    (d.revise || []).forEach((s) => { if (words(s).some((w) => TIRED.includes(w))) f.push(`${tag}: the revised sentence "${s}" still has a tired word`); });
    if (storyTopics.some((t) => t.includes(d.id))) f.push(`${tag}: a mentor beginning has the same topic`);
  });
  if (new Set([...ID, ...EX].map((d) => d.id)).size !== ID.length + EX.length) f.push('ideas: an id stands twice');
  // G3-566: dialogue
  const DL = b.dialogue || [];
  if (DL.length < 20) f.push('dialogue: fewer than 20 lines');
  DL.forEach((d, i) => {
    const tag = `dialogue ${i + 1} ("${d.s}")`;
    if (!/^[A-Z][^"]*[.?]$/.test(d.s) || /[,;:!"]/.test(d.s.slice(0, -1).replace(/'/g, ''))) f.push(`${tag}: not one sentence that ends with a period or a question mark and has no comma of its own`);
    if ((d.s.slice(-1) === '?') !== (d.tag === 'asked')) f.push(`${tag}: a question takes asked, a telling sentence another said-word`);
    if (!['said', 'asked', 'called', 'whispered', 'shouted'].includes(d.tag)) f.push(`${tag}: the said-word ${d.tag}`);
    if (/"/.test(d.rep) || hasWord(d.rep, d.s.replace(/[.?]$/, '')) || !d.rep.startsWith(d.n + ' ')) f.push(`${tag}: the told version shows the exact words or does not start with the speaker`);
    const a = words(d.s), o = words(d.other);
    if (a.length !== o.length || a.filter((w, k) => w !== o[k]).length !== 1 || d.other.slice(-1) !== d.s.slice(-1)) f.push(`${tag}: the other version does not change exactly one word`);
    for (const form of ['first', 'tag']) if (!fitsLines(dlgRight(d, form), WQ, 2, null)) f.push(`${tag}: the line written right does not fit one line`);
    const opts = [dlgRight(d, 'first'), ...dlgWrong(d, 'first')];
    if (new Set(opts).size !== 3) f.push(`${tag}: two versions are one`);
    // a choice beside the speech bubble holds 40 letters at most (its column is 450 px at 20 px a letter)
    if ([d.rep, dlgRight({ ...d, s: d.other }, 'first'), ...opts, ...(tagOk(d) ? [dlgRight(d, 'tag'), ...dlgWrong(d, 'tag')] : [])].some((o) => o.length > 41)) f.push(`${tag}: a sentence to circle is longer than 41 letters`);
  });
  if (DL.filter((d) => d.tag === 'asked').length < 8 || DL.filter((d) => d.tag !== 'asked').length < 8) f.push('dialogue: fewer than eight questions or eight telling sentences');
  if (DL.filter(tagOk).length < 8) f.push('dialogue: fewer than eight lines that can be printed with the speaker first');
  // G3-567: telling sentences
  const TL = b.telling || [];
  if (TL.length < 15) f.push('telling: fewer than 15');
  if (new Set(TL.map((x) => x.f)).size !== TL.length) f.push('telling: one feeling stands twice');
  TL.forEach((x) => {
    const tag = `telling "${x.t}"`;
    if (x.t !== `${x.n} was ${x.f}.`) f.push(`${tag}: not "<name> was <feeling>."`);
    for (const k of ['right', 'wrong', 'act', 'thought']) if (!x[k] || hasWord(x[k], x.f)) f.push(`${tag}: the ${k} sentence names the feeling`);
    if (!fitsLines(x.act, WQ, 2, null)) f.push(`${tag}: the action does not fit one line`);
    if (!fitsLines(x.act + ' ' + x.thought, WQ, 3, null)) f.push(`${tag}: the action and the thought do not fit two lines`);
    if (!/^(She|He) thought, "/.test(x.thought)) f.push(`${tag}: the thought is not "He thought, ..." or "She thought, ..."`);
    if (!x.right.startsWith(x.n + ' ') || !x.wrong.startsWith(x.n + ' ')) f.push(`${tag}: a sentence to circle is not about ${x.n}`);
    if ([...RULES.show, RULES.showDialogue].some((r) => hasWord(r.replace(/<[^>]+>/g, ''), x.f))) f.push(`${tag}: the box names the feeling`);
  });
  // G3-568
  const RK = b.rank || {};
  const OS = b.orderStories || [];
  if (OS.length < 14) f.push('order: fewer than 14 stories');
  OS.forEach((o) => {
    const tag = `order "${o.id}"`;
    if (o.events.length !== 6) f.push(`${tag}: not six events`);
    const lead = o.events.map((e) => (e.match(/^([^,]+),/) || [])[1]);
    lead.forEach((l, i) => { if (!(l in RK)) f.push(`${tag}: event ${i + 1} does not start with a time word of the list`); });
    const r = lead.map((l) => RK[l]);
    if (r.some((x, i) => i && !(x > r[i - 1]))) f.push(`${tag}: the time words do not give one order (${lead.join(' / ')})`);
    if (lead.some((l) => /^(Next|Then|After that)$/.test(l))) f.push(`${tag}: an event starts with next, then, or after that`);
    // written out per story: what its time words are and what makes its first event come first; a circle of seasons is
    // printed only where its closing "The next ..." event stands among the events a level takes
    if (!['day', 'week', 'seasons'].includes(o.kind) || !o.first) f.push(`${tag}: the story does not say what its time words are and what makes its first event first`);
    if (o.kind === 'seasons') for (const lv of [1, 2, 3]) if ((o.minLevel || 1) <= lv && !o.events.slice(0, LEVELS.order[lv].events).some((e) => /^The next /.test(e))) f.push(`${tag}: on level ${lv} its seasons make a circle (no "The next ..." among the events)`);
    o.events.forEach((e, i) => { if (!/^[A-Z].*[.!?]$/.test(e) || e.length > 70) f.push(`${tag}: event ${i + 1} is not one sentence of 70 letters or fewer`); });
  });
  const GP = b.gaps || [];
  for (const lv of [1, 2, 3]) if (GP.filter((g) => g.lv === lv).length < 7) f.push(`gaps: fewer than seven tiny stories on level ${lv}`);
  GP.forEach((g, i) => {
    const tag = `tiny story ${i + 1}`, at = g.s.findIndex((s) => s.includes('___'));
    if (g.s.length !== 3 || g.s.filter((s) => s.includes('___')).length !== 1 || at > 1) f.push(`${tag}: not three sentences with one blank in the first or second`);
    if (!g.s[at].startsWith('___, ')) f.push(`${tag}: the blank does not open its sentence`);
    if (!g.fits.includes(g.right)) f.push(`${tag}: the right word "${g.right}" is not one that fits`);
    if (g.wrong.length !== 2 || g.wrong.some(([w]) => g.fits.includes(w) || w === g.right)) f.push(`${tag}: a wrong word fits, or not two wrong words`);
    const endW = (g.s[2].match(/^([^,]+),/) || [])[1];
    g.wrong.forEach(([w, why]) => {
      if (why === 'end' && w !== endW) f.push(`${tag}: the ending word offered is not the one the story ends with`);
      if (why === 'start' && (at !== 1 || !g.s[0].startsWith(w + ','))) f.push(`${tag}: the start word offered is not the one the story starts with`);
      if (why === 'end-of-nothing' && (at !== 0 || !['Next', 'Then', 'After that'].includes(w))) f.push(`${tag}: a word that points back is offered but not at the start`);
      if (why === 'back' && !/before|that morning/i.test(w)) f.push(`${tag}: a word that goes back in time is not one`);
      if (!['end', 'start', 'end-of-nothing', 'back'].includes(why)) f.push(`${tag}: no reason for the wrong word "${w}"`);
    });
    if (at === 0 && g.lv === 1 && !g.s[1].match(/^(Next|Then|After that),/)) f.push(`${tag}: the second sentence does not continue with a middle word`);
    if (!/^(Finally|In the end|At last),/.test(g.s[2])) f.push(`${tag}: the last sentence does not start with an ending word`);
    // a level-3 page holds six events and three tiny stories: each tiny story stands on two lines at 18 px (about 135
    // letters, its blank counted at its printed width)
    if (g.lv === 3) { const ow = Math.max(110, Math.max(g.right.length, ...g.wrong.map(([w]) => w.length)) * 9 + 18); if (g.s.join(' ').length - 3 + Math.ceil(ow / 9.4) > 135) f.push(`${tag}: longer than two lines with its blank`); }
  });
  // G3-570
  const CH3 = b.choose || [];
  if (CH3.length < 16) f.push('choose: fewer than 16 sentences');
  const BX = b.box || {}, groupOf = Object.fromEntries(Object.entries(BX).flatMap(([g, ws]) => ws.map((w) => [w, g])));
  CH3.forEach((x, i) => {
    const tag = `choose "${x.t}"`, m = x.t.match(/\{(\w+)\}/g);
    if (!m || m.length !== 1 || m[0] !== '{' + x.tired + '}' || !TIRED.includes(x.tired)) f.push(`${tag}: not one tired word in braces`);
    if (words(x.t.replace(/\{\w+\}/, '')).some((w) => TIRED.includes(w))) f.push(`${tag}: another tired word stands in the sentence`);
    for (const k of ['w1', 'w2', 'w3']) if (!Array.isArray(x[k]) || x[k].length !== 2 || x[k].includes(x.right) || new Set(x[k]).size !== 2) f.push(`${tag}: ${k} is not two other words`);
    if (x.w3 && x.w3.some((w) => groupOf[w] && groupOf[w] !== x.tired)) f.push(`${tag}: a level-3 wrong word is of another group`);
    if (x.w1 && x.w1.some((w) => groupOf[w] === x.tired)) f.push(`${tag}: a level-1 wrong word is of the same group`);
    if (RULES.choose.some((r) => hasWord(r.replace(/<[^>]+>/g, ''), x.right))) f.push(`${tag}: the box prints the answer`);
  });
  // G3-570 pairs
  const CP = b.compare || [];
  if (CP.length < 14) f.push('compare: fewer than 14 pairs');
  CP.forEach((c) => { if (!fitsLines(c.why, WI, 2, null) || !/\.$/.test(c.why)) f.push(`compare "${c.strong}": the why is not one sentence of one line`); if (!words(c.weak).some((w) => TIRED.includes(w) || ['little', 'noise', 'lot'].includes(w))) f.push(`compare "${c.weak}": the weak sentence has no tired word`); });
  if (CP.filter((c) => c.strong.length < c.weak.length).length < 6 || CP.filter((c) => c.strong.length > c.weak.length).length < 6) f.push('compare: the clearer sentence is not the shorter one in six pairs and the longer in six');
  // G3-571
  if (Object.keys(BX).join() !== TIRED.join() || Object.values(BX).some((ws) => ws.length !== 4)) f.push('box: not four words for each of said, went, looked, nice, big, good');
  const PA = b.paragraphs || [];
  if (PA.length < 14) f.push('paragraphs: fewer than 14');
  PA.forEach((p) => {
    const tag = `paragraph "${p.id}"`;
    if (p.sents.length !== 8) f.push(`${tag}: not eight sentences`);
    p.sents.forEach((s, i) => {
      const m = s.text.match(/\{(\w+)\}/g), w = m && m[0].slice(1, -1);
      if (!m || m.length !== 1 || !TIRED.includes(w)) { f.push(`${tag}: sentence ${i + 1} has not one tired word in braces`); return; }
      if (words(s.text.replace(/\{\w+\}/, '')).some((x) => TIRED.includes(x))) f.push(`${tag}: sentence ${i + 1} has another tired word`);
      if (!s.fits.length || groupOf[s.fits[0]] !== w || s.fits.some((x) => !groupOf[x])) f.push(`${tag}: sentence ${i + 1}: the first fit is not of the group of "${w}", or a fit is no word of the box`);
      if (!groupOf[s.l1] || s.fits.includes(s.l1)) f.push(`${tag}: sentence ${i + 1}: the level-1 wrong word "${s.l1}" is no word of the box, or it fits`);
      if (BX[w] && BX[w].every((x) => s.fits.includes(x)) && groupOf[s.l1] === w) f.push(`${tag}: sentence ${i + 1}: every word of the group fits`);
    });
    if (words(p.sents.map((s) => s.text.replace(/\{\w+\}/, '')).join(' ')).some((x) => Object.values(BX).flat().includes(x))) f.push(`${tag}: a word of the box stands in the text`);
  });
  // nothing to copy across a lesson (WRITING-PAGES.md rule 12): every piece names its topic; no two story ideas share one;
  // no idea (the prompt of every writing day) shares its topic with a day-1 piece of its lesson: the beginnings of G3-564
  // (lesson 1) or the stories to order and the tiny stories of G3-568 (lesson 3)
  const IT = ID.map((d) => d.topic), ALLT = [...ID, ...(b.exampleIdeas || [])].map((d) => d.topic);
  [['story', S], ['idea', [...ID, ...(b.exampleIdeas || [])]], ['story to order', b.orderStories || []], ['tiny story', b.gaps || []]].forEach(([what, list]) => list.forEach((x, i) => { if (!x.topic || typeof x.topic !== 'string') f.push(`${what} ${x.id || i + 1}: no topic`); }));
  if (new Set(ALLT).size !== ALLT.length) f.push('ideas: two ideas share a topic');
  S.forEach((s) => { if (IT.includes(s.topic)) f.push(`story "${s.id}": its topic "${s.topic}" is the topic of a story idea of the planning page (lesson 1)`); });
  (b.orderStories || []).forEach((o) => { if (IT.includes(o.topic)) f.push(`order "${o.id}": its topic "${o.topic}" is the topic of a story idea of the writing page (lesson 3)`); });
  (b.gaps || []).forEach((g, i) => { if (IT.includes(g.topic)) f.push(`tiny story ${i + 1}: its topic "${g.topic}" is the topic of a story idea of the writing page (lesson 3)`); });
  // every level of every page can be drawn
  if (!f.length) for (const mode of Object.keys(LEVELS)) for (const lv of [1, 2, 3]) for (let s = 1; s <= 6; s++) {
    try { plan(b, mode, lv, makeRng('nw3|' + mode + '|' + lv + '|' + s), s); } catch (e) { f.push(`${mode} level ${lv} cannot be drawn: ${e.message}`); break; }
  }
  return f;
}

/* ------------------------------------------------------------------ levels */
const LEVELS = {
  parts: { 1: { qs: ['chars', 'setting', 'problem'], tier: 'far', pov: 'third' }, 2: { qs: ['chars', 'narrator', 'setting', 'problem'], tier: 'near' }, 3: { write: ['chars', 'setting', 'problem', 'narrator'] } },
  plan: { 1: { ideas: 2, start: 'all' }, 2: { ideas: 3, start: 'events' }, 3: { ideas: 3, start: 'none', bank: true } },
  marks: { 1: { pick: 3, kind: 'words', punct: 2, forms: ['first'] }, 2: { pick: 3, kind: 'marks', punct: 2, forms: ['first'] }, 3: { pick: 3, kind: 'marks', punct: 2, forms: ['first', 'tag'] } },
  show: { 1: { choose: 3, dlg: 'frame' }, 2: { rewrite: 2, dlg: 'open' }, 3: { rewrite: 1, dlg: 'act' } },
  order: { 1: { events: 4, gaps: 4 }, 2: { events: 5, gaps: 3 }, 3: { events: 6, gaps: 3 } },
  // the draft: lines of each part (Grade 3: a story of one sitting, two lines for each event and a line to spare)
  draft: { 1: { start: true, strip: true, lines: { beginning: 3, events: 7, ending: 3 } }, 2: { start: false, strip: true, lines: { beginning: 4, events: 7, ending: 3 } }, 3: { start: false, bank: true, lines: { beginning: 4, events: 7, ending: 3 } } },
  choose: { 1: { n: 4, wk: 'w1', pairs: 2 }, 2: { n: 4, wk: 'w2', pairs: 2 }, 3: { n: 4, wk: 'w3', pairs: 2 } },
  revise: { 1: { slots: 4, choices: true }, 2: { slots: 8, under: true }, 3: { slots: 8, find: true } },
};

/* ------------------------------------------------------------------ what a page holds */
/** copy v takes item v of a fixed order of a pool: copies step through the bank */
const stepOf = (pool, key, v) => { const order = makeRng('nw3-order|' + key).shuffle(pool); return order[(Math.max(1, v) - 1) % order.length]; };
function plan(b, mode, lv, rng, v) {
  const d = LEVELS[mode][lv];
  v = Number(v) || rng.int(1, 20);
  if (mode === 'parts') {
    // level 1: stories told by a narrator who is not in them; levels 2 and 3: ten of those and the ten told by a character
    const third = b.stories.filter((s) => s.pov === 'third'), first = b.stories.filter((s) => s.pov === 'first');
    const pool = d.pov ? third : [...third.slice(0, first.length), ...first];
    const s = stepOf(pool, 'parts|' + lv, v);
    if (d.write) return { mode, lv, story: s, list: ['story:' + s.id] };
    const WR = wrongsOf(s, b.pools), pick = (list) => list[rng.int(0, list.length - 1)];
    const set = s.place + ' ' + s.time;
    // level 2: the copies take turns between two wrong times and two wrong places (where the story's pools give both)
    const fams = WR.near ? ['nT', 'nP'].filter((k) => WR.near[k]) : [], famK = fams[v % Math.max(1, fams.length)];
    for (let t = 0; t < 400; t++) {
      const at = places(d.qs.length, 3, rng);
      const qs = d.qs.map((q, i) => {
        let right, wrong;
        // one wrong answer shorter and one longer than the right one (the length of a choice tells nothing)
        if (q === 'chars') { right = s.chars.join(' and '); wrong = [pick(WR.chars.lo), pick(WR.chars.hi)]; }
        if (q === 'narrator') { right = s.pov === 'first' ? s.narrator : NARRATOR_OUT; wrong = s.pov === 'first' ? [cap1(s.chars.find((c) => c !== s.narrator)), NARRATOR_OUT] : s.chars.map((c) => cap1(c)); }
        if (q === 'setting') {
          right = set;
          if (d.tier === 'far') { for (let k = 0; k < 200; k++) { const lo = pick(WR.far.lo), hi = pick(WR.far.hi); if (lo.p !== hi.p && lo.t !== hi.t) { wrong = [lo.s, hi.s]; break; } } }
          else { const L = WR.near[famK]; for (let k = 0; k < 200; k++) { const a = pick(L.filter((x) => x.length < set.length)), c = pick(L.filter((x) => x.length > set.length)); if (a !== c) { wrong = [a, c]; break; } } }
          if (!wrong) throw new Error('no wrong settings for story ' + s.id);
        }
        if (q === 'problem') { right = s.problem; wrong = s[d.tier].map((x) => x[0]); }
        const opts = shuffle(wrong, rng); opts.splice(at[i], 0, right);
        return { q, right, opts };
      });
      if (!lengthOk(qs)) continue;
      // no question gives its answer away by the parts its options share (finding 2)
      if (qs.some((q) => (q.q === 'chars' || q.q === 'setting') && halvesTell(q.opts, q.right, optParts(s, b.pools, q.q)))) continue;
      return { mode, lv, story: s, qs, list: ['story:' + s.id, ...qs.map((q) => q.q + ':' + q.opts.join('/'))] };
    }
    throw new Error('no mixed questions for story ' + s.id);
  }
  if (mode === 'plan') {
    const first = stepOf(b.ideas, 'plan|' + lv, v);
    const rest = shuffle(b.ideas.filter((x) => x !== first), rng);
    const ideas = [first, ...rest.slice(0, d.ideas - 1)];
    // the example notes come from an example idea, never offered as a prompt (finding 7)
    const ex = shuffle(b.exampleIdeas, rng)[0];
    return { mode, lv, ideas, ex, list: [...ideas.map((x) => 'idea:' + x.id), 'ex:' + ex.id] };
  }
  if (mode === 'marks') {
    const DL = b.dialogue.map((x, i) => ({ ...x, i }));
    for (let t = 0; t < 600; t++) {
      const pickS = shuffle(DL, rng).slice(0, d.pick + d.punct);
      const pick = pickS.slice(0, d.pick), punct = pickS.slice(d.pick);
      // the forms: level 3 prints the speaker first in some (one or two of the five), and only where the words do not
      // start with I or a name (they would have to be printed in small letters)
      const formOf = (x) => (lv === 3 && tagOk(x) && rng.int(0, 2) === 0 ? 'tag' : 'first');
      const p1 = pick.map((x) => ({ ...x, form: formOf(x) })), p2 = punct.map((x) => ({ ...x, form: formOf(x) }));
      if (lv === 3 && (![...p1, ...p2].some((x) => x.form === 'tag') || !p2.some((x) => x.form === 'tag') || p2.every((x) => x.form === 'tag'))) continue;
      if (lv >= 2 && !p2.some((x) => x.tag === 'asked')) continue;
      if (lv === 1 && p2.some((x) => x.tag === 'asked')) continue;
      if (lv >= 2 && !p2.some((x) => x.tag !== 'asked')) continue;
      if (!p1.some((x) => x.tag === 'asked') || !p1.some((x) => x.tag !== 'asked')) continue;
      const at = places(d.pick, 3, rng);
      const items = p1.map((x, k) => {
        const right = dlgRight(x, x.form);
        const wrong = d.kind === 'words' ? [x.rep, dlgRight({ ...x, s: x.other }, x.form)] : dlgWrong(x, x.form);
        const opts = shuffle(wrong, rng); opts.splice(at[k], 0, right);
        return { ...x, right, opts };
      });
      if (!lengthOk(items)) continue;
      return { mode, lv, items, punct: p2, list: [...items.map((x) => 'say:' + x.i), ...p2.map((x) => 'punct:' + x.i)] };
    }
    throw new Error('no page of dialogue');
  }
  if (mode === 'show') {
    const idea = stepOf(b.ideas, 'show|' + lv, v);
    if (d.choose) {
      const first = stepOf(b.telling, 'show-tell|' + lv, v);
      for (let t = 0; t < 400; t++) {
        const tl = [first, ...shuffle(b.telling.filter((x) => x !== first), rng).slice(0, d.choose - 1)];
        const at = places(d.choose, 2, rng);
        const items = shuffle(tl, rng).map((x, k) => { const opts = [x.wrong]; opts.splice(at[k], 0, x.right); return { ...x, opts }; });
        if (!lengthOk(items)) continue;
        return { mode, lv, items, idea, list: [...items.map((x) => 'tell:' + x.f), 'idea:' + idea.id] };
      }
      throw new Error('no three telling sentences whose length tells nothing');
    }
    const first = stepOf(b.telling, 'show-tell|' + lv, v);
    const tl = [first, ...shuffle(b.telling.filter((x) => x !== first), rng).slice(0, d.rewrite - 1)];
    return { mode, lv, items: tl, idea, list: [...tl.map((x) => 'tell:' + x.f), 'idea:' + idea.id] };
  }
  if (mode === 'order') {
    // a story whose time words make a circle (the seasons) stands only on the levels that print its closing event
    const st = stepOf(b.orderStories.filter((o) => (o.minLevel || 1) <= lv), 'order|' + lv, v);
    const ev = st.events.slice(0, d.events);
    let o; for (let t = 0; t < 5000; t++) { o = shuffle([...ev.keys()], rng); if (orderOk(o)) break; o = null; }
    if (!o) throw new Error('no mixed order of ' + d.events + ' events');
    for (let t = 0; t < 600; t++) {
      const gs = shuffle(b.gaps.map((g, i) => ({ ...g, i })).filter((g) => g.lv === lv), rng).slice(0, d.gaps);
      // one time word answers two tiny stories at most (three blanks that all take "First" teach a guess, not a word)
      if (gs.some((g) => gs.filter((h) => h.right === g.right).length > 2)) continue;
      const at = places(d.gaps, 3, rng);
      const items = gs.map((g, k) => { const opts = shuffle(g.wrong.map((x) => x[0]), rng); opts.splice(at[k], 0, g.right); return { ...g, opts }; });
      if (!lengthOk(items)) continue;
      return { mode, lv, story: st, shown: o, items, list: ['order:' + st.id, ...items.map((g) => 'gap:' + g.i)] };
    }
    throw new Error('no page of tiny stories');
  }
  if (mode === 'draft') {
    // the example is a story of an example idea, never one a child may have planned (finding 7)
    const idea = stepOf(b.ideas, 'draft|' + lv, v);
    const ex = shuffle(b.exampleIdeas, rng)[0];
    return { mode, lv, idea, ex, list: ['idea:' + idea.id, 'ex:' + ex.id] };
  }
  if (mode === 'choose') {
    for (let t = 0; t < 600; t++) {
      const xs = shuffle(b.choose.map((x, i) => ({ ...x, i })), rng).slice(0, d.n);
      if (new Set(xs.map((x) => x.tired)).size < 3 || new Set(xs.map((x) => x.right)).size !== xs.length) continue;
      const at = places(d.n, 3, rng);
      const items = xs.map((x, k) => { const opts = shuffle(x[d.wk], rng); opts.splice(at[k], 0, x.right); return { ...x, opts }; });
      if (!lengthOk(items)) continue;
      // no right word of one sentence is offered in another (a child could take it from there)
      if (items.some((x) => items.some((y) => y !== x && y.opts.includes(x.right)))) continue;
      const cp = b.compare.map((c, i) => ({ ...c, i }));
      const shorter = shuffle(cp.filter((c) => c.strong.length < c.weak.length), rng)[0], longer = shuffle(cp.filter((c) => c.strong.length > c.weak.length), rng)[0];
      const pairs = shuffle([shorter, longer], rng);
      const pat = shuffle([0, 1], rng);
      return { mode, lv, items, pairs: pairs.map((c, k) => ({ ...c, strongAt: pat[k] })), list: [...items.map((x) => 'tired:' + x.i), ...pairs.map((c) => 'pair:' + c.i)] };
    }
    throw new Error('no page of tired words');
  }
  if (mode === 'revise') {
    const p = stepOf(b.paragraphs, 'revise|' + lv, v);
    const sample = shuffle(b.exampleIdeas, rng)[0];
    if (d.choices) {
      for (let t = 0; t < 600; t++) {
        const ks = shuffle([...p.sents.keys()], rng).slice(0, d.slots).sort((a, c) => a - c);
        if (new Set(ks.map((k) => p.sents[k].text.match(/\{(\w+)\}/)[1])).size < 3) continue;
        const at = places(d.slots, 2, rng);
        const items = ks.map((k, j) => { const s = p.sents[k], right = s.fits[0], opts = [s.l1]; opts.splice(at[j], 0, right); return { k, right, opts }; });
        if (!lengthOk(items)) continue;
        // no word is offered in two items (a word ringed in one could be taken for the answer of another)
        if (new Set(items.flatMap((x) => x.opts)).size !== items.length * 2) continue;
        return { mode, lv, para: p, slots: ks, items, sample, list: ['para:' + p.id, ...ks.map((k) => 'slot:' + k)] };
      }
      throw new Error('no four slots of three groups');
    }
    return { mode, lv, para: p, slots: [...p.sents.keys()], sample, list: ['para:' + p.id] };
  }
  throw new Error('narrative-writing-g3: no plan for ' + mode);
}

{ const f = faultsOf(BANK); if (f.length) throw new Error('narrative-writing-g3.en.json: ' + f.join('; ')); }

/* ------------------------------------------------------------------ the parts of a page */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}[data-lcs-label] b,[data-lcs-ruletext] b{color:' + T.teal + ';font-weight:800}</style>';   // before the root: verify counts the root's children as blocks
/** an f before i, f, l, or t and a t before t touch the next letter even with ligatures off: each gets room of its own
 *  (text inside tags is left alone) */
function fRoom(html) {
  let out = '', i = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += text.replace(/f(?=[iflt])|t(?=t)/g, (m) => `<span data-lcs-fsep style="margin-right:0.07em">${m}</span>`);
    i = j < 0 ? html.length : j;
  }
  return out;
}
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
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} data-lcs-card style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (k, html, extra = '') => `<div data-lcs-label style="font:700 ${LABEL}px/1.3 'Nunito',sans-serif;color:${T.ink}">${k ? `<span data-lcs-labelnum style="color:${T.teal}">${k}.</span> ` : ''}${html}${extra}</div>`;
const num = (k, px = READ) => `<span data-lcs-num style="flex:0 0 auto;align-self:flex-start;display:inline-block;min-width:24px;font:800 ${px}px/1.35 'Nunito',sans-serif;color:${T.teal}">${k}.</span>`;
/** a key's note (sample answer, other answers right): printed on the key, kept hidden on the child's page so that the key
 *  has the geometry of its page */
const note = (text, key) => ` <span data-lcs-vary style="color:${T.coral};${key ? '' : 'visibility:hidden'}"${key ? '' : ' aria-hidden="true"'}>${esc(text)}</span>`;
/** a single ruled line; a starter printed on it in ink, the key's text in teal */
function wline({ w, h = ROW, starter, answer, attrs = '' }) {
  return `<div data-lcs-line${answer ? ` data-lcs-answer="${A(answer)}"` : ''}${starter ? ` data-lcs-starter="${A(starter)}"` : ''} ${attrs} style="box-sizing:border-box;${w ? `flex:0 0 auto;width:${w}px;` : 'width:100%;'}height:${h}px;border-bottom:2px solid ${T.inkSoft};display:flex;align-items:flex-end;gap:8px;padding:0 4px 4px;overflow:hidden">` +
    (starter ? `<span data-lcs-starttext data-lcs-read style="flex:0 0 auto;white-space:nowrap;font:700 ${READ}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(starter)}</span>` : '') +
    (answer ? `<span data-lcs-keytext style="flex:0 1 auto;min-width:0;white-space:nowrap;font:700 16px/1 'Nunito',sans-serif;color:${T.teal}">${esc(answer)}</span>` : '') + `</div>`;
}
/** n lines for one text the child writes (a starter on the first); the key spreads its sample over them at a child's
 *  letter width, leaving the last line free */
function writeGroup({ n, w, text, starter, key, attrs = '', h = ROW }) {
  const caps = Array.from({ length: n - 1 }, (_, i) => capOf(w, i === 0 ? starterW(starter) : 0));
  const parts = key ? spread(text, caps) : [];
  if (key && !parts) throw new Error(`the sample "${text}" does not fit ${n - 1} lines of ${w} px`);
  return `<div data-lcs-writes="${n}" data-lcs-expect="${A(text)}" ${attrs} style="display:flex;flex-direction:column;gap:0">` +
    Array.from({ length: n }, (_, i) => wline({ w, h, starter: i === 0 ? starter : null, answer: key ? parts[i] || null : null })).join('') + `</div>`;
}
/** a word or a sentence to circle; the key rings the right one */
const opt = (text, ok, key, more = '') => `<span data-lcs-opt="${A(text)}"${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;align-self:flex-start;white-space:nowrap;font:700 ${OPT}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 12px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF;${more}">${esc(text)}</span>`;
const ruleBox = (title, rows, attrs = '') => `<div data-lcs-rulebox data-lcs-card ${attrs} style="display:flex;flex-direction:column;gap:1px;padding:4px 14px 5px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
  `<div data-lcs-boxtitle style="font:700 19px/1.15 'Baloo 2',cursive;color:${T.teal}">${esc(title)}</div>` + rows.map((r) => `<div data-lcs-ruletext style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${keepEx(r)}</div>`).join('') + `</div>`;
/** a rule row keeps its tags (<b>) and is escaped elsewhere */
const typoRule = (r) => r.split(/(<\/?b>)/).map((p) => (/^<\/?b>$/.test(p) ? p : esc(p))).join('');
/** a short quoted example after the row's colon stays on one line ("Kim said, “We won.”" never breaks inside) */
const keepEx = (r) => { const m = r.match(/^(.*?: )([^:]*"[^:]*)$/); return m && m[2].length <= 34 ? typoRule(m[1]) + `<span data-lcs-example-words style="white-space:nowrap">${typoRule(m[2])}</span>` : typoRule(r); };
/** the checklist: its title on a row of its own (finding 40: the lines then read in order), a box to tick before each line;
 *  an odd last line takes the whole row */
const checklist = (items, attrs = '') => `<fieldset data-lcs-checklist data-lcs-card ${attrs} style="margin:0;min-width:0;display:grid;grid-template-columns:1fr 1fr;gap:2px 16px;padding:0 14px 6px;border:2px dashed ${T.teal};border-radius:14px;background:#FFFFFF">` +
  `<legend data-lcs-boxtitle style="padding:0 6px;margin-left:-4px;font:700 17px/1.1 'Baloo 2',cursive;color:${T.teal}">Check your writing:</legend>` +
  items.map((s, i) => `<div data-lcs-check style="${items.length % 2 && i === items.length - 1 ? 'grid-column:1 / -1;' : ''}display:flex;align-items:flex-start;gap:7px;font:700 ${RULEPX}px/1.25 'Nunito',sans-serif;color:${T.ink}"><span data-lcs-tickbox style="flex:0 0 auto;display:inline-block;width:17px;height:17px;margin-top:1px;border:2px solid ${T.ink};border-radius:4px;background:#FFFFFF"></span><span data-lcs-checktext>${esc(s)}</span></div>`).join('') + `</fieldset>`;
const Bw = (w) => `<b style="font-weight:800;color:${T.teal}">${esc(w)}</b>`;
/** the story mountain (G3-565): a path up to a peak and down, its four parts named */
const MOUNTAIN = `<svg data-lcs-mountain viewBox="0 0 210 118" width="210" height="118" style="flex:0 0 auto;display:block">` +
  `<path d="M10 96 L62 70 L105 22 L148 70 L200 96" fill="none" stroke="${T.teal}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>` +
  `<line x1="4" y1="98" x2="206" y2="98" stroke="${T.inkSoft}" stroke-width="2"/>` +
  [[10, 96, 'Beginning', 4, 114, 'start'], [62, 70, 'Problem', 68, 86, 'start'], [105, 22, 'Events', 105, 14, 'middle'], [200, 96, 'Ending', 206, 114, 'end']].map(([x, y, t, tx, ty, an]) => `<circle cx="${x}" cy="${y}" r="5" fill="${T.coral}"/><text data-lcs-mtn x="${tx}" y="${ty}" text-anchor="${an}" style="font:800 15px 'Nunito',sans-serif;fill:${T.ink}">${t}</text>`).join('') + `</svg>`;

/* ------------------------------------------------------------------ the blocks of each page */
const letter = (i) => `<span data-lcs-letter style="color:${T.teal}">${String.fromCharCode(97 + i)}.</span> `;
function render(P, key) {
  const b = [];
  if (P.mode === 'parts') {
    // the same box on every level (ruling A): the narrator line is true on all of them
    const rows = [...RULES.parts, RULES.partsNarrator];
    b.push(ruleBox('The parts of a story', rows));
    b.push(`<div data-lcs-card data-lcs-story="${A(P.story.id)}" style="padding:6px 16px 8px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div data-lcs-stitle style="font:700 20px/1.2 'Baloo 2',cursive;color:${T.ink}">${esc(P.story.title)}</div><div data-lcs-stext data-lcs-read style="font:700 ${STORY}px/1.4 'Nunito',sans-serif;color:${T.ink}">${esc(P.story.text)}</div></div>`);
    if (P.qs) {
      b.push(cream('data-lcs-task="parts"', label(1, LINES.partsPick) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px">` +
        P.qs.map((q, i) => { const row = q.q === 'chars' || q.q === 'narrator';
          return `<div data-lcs-item data-lcs-q="${q.q}" data-lcs-right="${A(q.right)}" style="flex:1 1 auto;display:flex;align-items:center;gap:6px;padding:3px 10px 4px;border-radius:12px;background:#FFFFFF">${num(String.fromCharCode(97 + i))}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px"><span data-lcs-read data-lcs-qtext style="font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(LINES.q[q.q])}</span>` +
            `<div data-lcs-opts style="display:flex;flex-direction:${row ? 'row' : 'column'};flex-wrap:wrap;gap:${row ? '4px 16px' : '3px'}">${q.opts.map((o) => opt(o, o === q.right, key)).join('')}</div></div></div>`; }).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
    } else {
      // level 3 asks who tells the story too (finding 12); the key names other answers a careful reader writes
      const s = P.story, ans = { chars: s.chars.join(' and '), setting: s.place + ' ' + s.time, problem: s.problem, narrator: s.pov === 'first' ? s.narrator : cap1(NARRATOR_OUT) };
      const also = [...(s.alsoChars ? ['a. ' + s.alsoChars] : []), ...(s.also ? ['c. ' + s.also] : []), 'd. ' + (s.pov === 'first' ? 'the ' + s.narratorIs + ' who says I' : 'someone who is not in the story')];
      b.push(cream('data-lcs-task="partswrite"', label(1, LINES.partsWrite + note(SAME_MEANING, key)) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px">` +
        LEVELS.parts[3].write.map((q, i) => { const t = q === 'chars' || q === 'setting' ? cap1(ans[q]) : ans[q];
          return `<div data-lcs-item data-lcs-wq="${q}" style="display:flex;flex-direction:column;gap:0;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF"><span data-lcs-read data-lcs-qtext style="font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink}">${letter(i)}${esc(LINES.q[q])}</span>` +
          writeGroup({ n: partsLines(t), w: WQ, text: t, key }) + `</div>`; }).join('') + `</div>` +
        `<div data-lcs-alsorow style="min-height:16px;font:700 13px/1.25 'Nunito',sans-serif;color:${T.teal};${key ? '' : 'visibility:hidden'}"${key ? '' : ' aria-hidden="true"'}><span data-lcs-also>${esc('Also right: ' + also.join(' · '))}</span></div>`, 8, 5, 'flex:1 1 auto'));
    }
  }
  if (P.mode === 'plan') {
    const d = LEVELS.plan[P.lv];
    b.push(cream('data-lcs-task="ideas"', `<div style="display:flex;gap:14px;align-items:center"><div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:5px">` + label(1, LINES.ideas + note('(Sample plan: idea 1)', key)) +
      P.ideas.map((x, i) => `<div data-lcs-item data-lcs-idea="${A(x.id)}" style="display:flex;gap:6px;align-items:center;padding:3px 10px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<span data-lcs-read data-lcs-ideatext style="font:700 ${READ - 1}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(x.idea)}</span></div>`).join('') + `</div>${MOUNTAIN}</div>`, 7, 4));
    const x = P.ideas[0].plan, ex = P.ex.plan, w = INNER;
    const startOf = (row, k) => (d.start === 'all' ? (row === 'events' ? PLAN_START.events[k] : PLAN_START[row]) : d.start === 'events' && (row === 'events' || row === 'ending') ? (row === 'events' ? PLAN_START.events[k] : PLAN_START.ending) : null);
    const noteOf = (t, st) => (st ? t : cap1(t));
    // the example beside each part: the plan of another idea (for the events, its first event)
    const exOf = (row) => (row === 'events' ? ex.events[0] : ex[row]);
    const rowHtml = (row) => {
      const half = row === 'chars' || row === 'setting', rw = half ? WH : w;
      const head = `<div data-lcs-rowhead style="display:flex;flex-wrap:wrap;align-items:baseline;gap:0 10px"><span data-lcs-rowname style="font:800 16px/1.2 'Nunito',sans-serif;color:${T.teal}">${PLAN_HEAD[row]}</span><span data-lcs-ex style="font:700 ${RULEPX}px/1.25 'Nunito',sans-serif;color:${T.inkSoft}"><i>Example:</i> ${esc(exOf(row))}</span></div>`;
      if (row === 'events') {
        const ls = [0, 1, 2].map((k) => { const st = startOf(row, k), t = noteOf(x.events[k], st); return wline({ w, starter: st, answer: key ? t : null, attrs: `data-lcs-lineexpect="${A(t)}"` }); });
        return `<div data-lcs-item data-lcs-row="events" style="display:flex;flex-direction:column;gap:0">${head}<div data-lcs-perline="4" style="display:flex;flex-direction:column;gap:0">${ls.join('')}${wline({ w })}</div></div>`;
      }
      const st = startOf(row, 0);
      return `<div data-lcs-item data-lcs-row="${row}" style="display:flex;flex-direction:column;gap:0;min-width:0">${head}${writeGroup({ n: half ? 3 : 2, w: rw, text: noteOf(x[row], st), starter: st, key })}</div>`;
    };
    // characters and setting side by side (three lines each), then problem, events, and ending
    b.push(cream(`data-lcs-task="plan" data-lcs-example="${A(P.ex.id)}"`, label(2, LINES.plan[P.lv] + note(VARY, key)) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:2px"><div style="display:grid;grid-template-columns:${WH}px ${WH}px;gap:0 ${WF - 2 * WH}px">${rowHtml('chars')}${rowHtml('setting')}</div>${['problem', 'events', 'ending'].map(rowHtml).join('')}</div>`, 7, 4, 'flex:1 1 auto'));
    // level 3: a word bank in the planner card, under its task line (words for when, where, and feelings)
    const bank = BANK.planBank;
    const wb = d.bank ? `<div data-lcs-wordbank data-lcs-ruletext style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${Bw('Word bank:')} ${[bank.when, bank.where, bank.feel].map((ws) => esc(ws.join(', '))).join(' · ')}</div>` : '';
    b[b.length - 1] = b[b.length - 1].replace('<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:2px"><div style="display:grid', wb + '<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:2px"><div style="display:grid');
    b.push(checklist(CHECK.plan));
  }
  if (P.mode === 'marks') {
    const d = LEVELS.marks[P.lv];
    b.push(ruleBox('Writing dialogue', RULES.marks));
    const bubble = (x) => `<div data-lcs-bubble style="flex:0 0 140px;display:flex;flex-direction:column;align-items:flex-start;gap:3px"><div data-lcs-saytext data-lcs-read style="position:relative;box-sizing:border-box;width:140px;padding:7px 12px;border:2.5px solid ${T.ink};border-radius:18px;background:#FFFFFF;font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x.s)}<span style="position:absolute;left:22px;bottom:-11px;width:16px;height:16px;background:#FFFFFF;border-right:2.5px solid ${T.ink};border-bottom:2.5px solid ${T.ink};transform:rotate(45deg) skew(12deg,12deg)"></span></div><span data-lcs-speaker data-lcs-read style="margin:1px 0 0 46px;font:800 ${READ}px/1 'Nunito',sans-serif;color:${T.teal}">${esc(x.n)}</span></div>`;
    b.push(cream('data-lcs-task="marks1"', label(1, LINES.marks1[P.lv]) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px">` +
      P.items.map((x, i) => `<div data-lcs-item data-lcs-say="${x.i}" data-lcs-form="${x.form}" data-lcs-right="${A(x.right)}" style="flex:1 1 auto;display:flex;gap:10px;align-items:center;padding:4px 10px;border-radius:12px;background:#FFFFFF">${num(String.fromCharCode(97 + i))}${bubble(x)}<div data-lcs-opts style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px">${x.opts.map((o) => opt(o, o === x.right, key)).join('')}</div></div>`).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
    b.push(cream('data-lcs-task="marks2"', label(2, LINES.marks2[P.lv]) + `<div style="display:flex;flex-direction:column;gap:5px">` +
      P.punct.map((x, i) => `<div data-lcs-item data-lcs-punct="${x.i}" data-lcs-form="${x.form}" style="display:flex;flex-direction:column;gap:0;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF"><span data-lcs-read style="font:700 ${READ}px/1.35 'Nunito',sans-serif;color:${T.ink}">${letter(i)}<span data-lcs-raw>${esc(dlgRaw(x, x.form))}</span></span>${writeGroup({ n: 2, w: WQ, text: dlgRight(x, x.form), key })}</div>`).join('') + `</div>`, 8, 6));
  }
  if (P.mode === 'show') {
    const d = LEVELS.show[P.lv];
    b.push(ruleBox("Show, don't tell", [...RULES.show, ...(P.lv === 3 ? [RULES.showDialogue] : [])]));
    if (d.choose) {
      b.push(cream('data-lcs-task="show1"', label(1, LINES.show1[1]) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px">` +
        P.items.map((x, i) => `<div data-lcs-item data-lcs-tell="${A(x.f)}" data-lcs-right="${A(x.right)}" style="flex:1 1 auto;display:flex;align-items:center;gap:6px;padding:3px 10px 4px;border-radius:12px;background:#FFFFFF">${num(String.fromCharCode(97 + i))}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px"><span data-lcs-read data-lcs-telltext style="font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink}">Telling: ${esc(x.t)}</span><div data-lcs-opts style="display:flex;flex-direction:column;gap:3px">${x.opts.map((o) => opt(o, o === x.right, key)).join('')}</div></div></div>`).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
    } else {
      b.push(cream('data-lcs-task="show1"', label(1, LINES.show1[P.lv] + note(VARY, key)) + `<div style="display:flex;flex-direction:column;gap:5px">` +
        P.items.map((x, i) => `<div data-lcs-item data-lcs-tell="${A(x.f)}" style="display:flex;flex-direction:column;gap:0;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF"><span data-lcs-read style="font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink}">${letter(i)}<span data-lcs-telltext>Telling: ${esc(x.t)}</span></span>${writeGroup({ n: P.lv === 2 ? 2 : 3, w: WQ, text: P.lv === 2 ? x.act : x.act + ' ' + x.thought, key })}</div>`).join('') + `</div>`, 8, 6));
    }
    const dl = P.idea.dialogue;
    const box = P.lv === 1 ? '' : `<div data-lcs-wordrow style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${Bw(P.lv === 2 ? 'Said-words:' : 'Words that show:')} ${esc((P.lv === 2 ? BANK.saidWords : BANK.showWords).join(', '))}</div>`;
    let lines;
    if (d.dlg === 'frame') {
      // the marks of the frame are printed typographic here (a mark alone in its element would be read as an opening one)
      const blank = (t, w, kind) => `<span data-lcs-fblank="${kind}" data-lcs-expect="${A(t)}" style="position:relative;flex:0 0 auto;box-sizing:border-box;width:${w}px;height:${ROW}px;border-bottom:2px solid ${T.inkSoft}">${key ? `<span data-lcs-keytext style="position:absolute;left:4px;bottom:5px;white-space:nowrap;font:700 16px/1 'Nunito',sans-serif;color:${T.teal}">${esc(t)}</span>` : ''}</span>`;
      const mark = (t, w) => `<span data-lcs-read data-lcs-mark style="flex:0 0 ${w}px;text-align:center;font:800 24px/1 'Nunito',sans-serif;color:${T.ink};padding-bottom:2px">${t}</span>`;
      lines = dl.map((x, i) => `<div data-lcs-item data-lcs-frame="${i}" style="display:flex;align-items:flex-end;gap:8px;padding:0 10px">${mark('“', 12)}${blank(frameSay(x), FRAME_SAY, 'say')}${mark('”', 12)}${blank(x.tag + ' ' + x.n, FRAME_WHO, 'who')}${mark('.', 8)}</div>`);
    } else {
      lines = dl.map((x, i) => { const t = P.lv === 2 ? dlgRight(x, 'first') : dlgRight(x, 'first') + ' ' + x.act;
        return `<div data-lcs-item data-lcs-dlg="${i}" style="padding:0 10px">${writeGroup({ n: P.lv === 2 ? 2 : 3, w: WQ, text: t, starter: (i + 1) + '.', key })}</div>`; });
    }
    b.push(cream('data-lcs-task="show2"', label(2, LINES.show2[P.lv] + note(VARY, key)) + `<div data-lcs-idealine data-lcs-idea="${A(P.idea.id)}" data-lcs-read style="font:700 ${READ - 1}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(LINES.idea)} <i>${esc(P.idea.idea)}</i></div>` + box +
      `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">${lines.join('')}</div>`, 8, 5, 'flex:1 1 auto'));
    // a line a child can see for what the level asks (finding 17): a said-word that shows a feeling; no feeling word; an action or a thought
    b.push(checklist([...CHECK.show, P.lv === 1 ? CHECK.showSaid : P.lv === 2 ? CHECK.showNoFeel : CHECK.showAct]));
  }
  if (P.mode === 'order') {
    const d = LEVELS.order[P.lv];
    b.push(ruleBox('Time words', RULES.order[P.lv]));
    const ev = P.story.events.slice(0, d.events);
    b.push(cream(`data-lcs-task="order1" data-lcs-order="${A(P.story.id)}"`, label(1, LINES.order1.replace('{n}', d.events)) + `<div data-lcs-otitle style="font:700 19px/1.2 'Baloo 2',cursive;color:${T.ink};padding-left:10px">${esc(P.story.title)}</div><div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">` +
      P.shown.map((k) => `<div data-lcs-item data-lcs-ev="${k}" style="flex:1 1 auto;display:flex;gap:10px;align-items:center;padding:2px 10px;border-radius:12px;background:#FFFFFF"><span data-lcs-numbox style="flex:0 0 auto;box-sizing:border-box;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF;font:800 20px/1 'Nunito',sans-serif;color:${T.teal}">${key ? k + 1 : ''}</span><span data-lcs-read data-lcs-evtext style="flex:1 1 auto;min-width:0;font:700 ${STORY}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(ev[k])}</span></div>`).join('') + `</div>`, 8, 5, 'flex:1 1 auto'));
    b.push(cream('data-lcs-task="order2"', label(2, LINES.order2) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px">` +
      P.items.map((g, i) => `<div data-lcs-item data-lcs-gap="${g.i}" data-lcs-right="${A(g.right)}" style="flex:1 1 auto;display:flex;align-items:center;gap:6px;padding:3px 10px 4px;border-radius:12px;background:#FFFFFF">${num(String.fromCharCode(97 + i))}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px"><span data-lcs-read data-lcs-gaptext style="font:700 ${STORY}px/1.35 'Nunito',sans-serif;color:${T.ink}">${g.s.map((s) => (s.includes('___') ? `<span data-lcs-blank data-lcs-want="${A(g.right)}" style="position:relative;display:inline-block;width:${Math.max(110, Math.max(...g.opts.map((o) => o.length)) * 9 + 18)}px;height:1.1em;vertical-align:-0.2em;border-bottom:2.5px solid ${T.ink}">${key ? `<span data-lcs-blankkey style="position:absolute;left:0;right:0;bottom:3px;text-align:center;white-space:nowrap;font:700 15px/1 'Nunito',sans-serif;color:${T.teal}">${esc(g.right)}</span>` : ''}</span>${esc(s.slice(3))}` : esc(s))).join(' ')}</span><div data-lcs-opts style="display:flex;flex-wrap:wrap;gap:4px 18px">${g.opts.map((o) => opt(o, o === g.right, key)).join('')}</div></div></div>`).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
  }
  if (P.mode === 'draft') {
    const d = LEVELS.draft[P.lv];
    // the example: a whole story of an example idea on three lines, its time words in teal; levels 1 and 2 add one line
    // of time words under it
    const dr = P.ex.draft, teal = (s) => { const m = s.match(/^([^,]+,)(.*)$/); return `${Bw(m[1])}${esc(m[2])}`; };
    const exText = [dr.beginning, ...dr.events, dr.ending].map(teal).join(' ');
    b.push(`<div data-lcs-card data-lcs-example="${A(P.ex.id)}" style="display:flex;flex-direction:column;gap:1px;padding:3px 14px 4px;border:2.5px solid ${T.creamDeep};border-radius:14px;background:#FFFFFF"><div data-lcs-boxtitle style="font:700 18px/1.1 'Baloo 2',cursive;color:${T.teal}">Example: ${esc(P.ex.idea)}</div><div data-lcs-read data-lcs-extext style="font:700 ${STORY}px/1.3 'Nunito',sans-serif;color:${T.ink}">${exText}</div>` +
      (d.strip ? `<div data-lcs-timerow data-lcs-ruletext style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${Bw('Time words:')} ${esc(TIME_ROW.join(', '))}</div>` : '') + `</div>`);
    const x = P.idea.draft, w = INNER - 20;
    const split = (s) => { const m = s.match(/^([^,]+,) (.*)$/); return [m[1], m[2]]; };
    const sec = (k, html) => `<div data-lcs-item data-lcs-sec="${k}" style="display:flex;flex-direction:column;gap:0;padding:0 10px"><span data-lcs-sechead style="font:800 15.5px/1.05 'Nunito',sans-serif;color:${T.teal}">${esc(DRAFT_HEAD[k])}</span>${html}</div>`;
    // the draft's lines are 34 px, the Grade 3 row; each part keeps a line free under its sample
    const h = ROW;
    // level 1: "One day," starts the beginning (it fits any plan); each event starts with its own time word
    const beg = d.start ? writeGroup({ n: d.lines.beginning, w, h, text: x.oneDay, starter: 'One day,', key }) : writeGroup({ n: d.lines.beginning, w, h, text: x.beginning, key });
    const evs = x.events.map((e) => { if (d.start) { const [st, rest] = split(e); return writeGroup({ n: 2, w, h, text: rest, starter: st, key, attrs: 'data-lcs-event' }); } return writeGroup({ n: 2, w, h, text: e, key, attrs: 'data-lcs-event' }); });
    const spare = Array.from({ length: d.lines.events - 2 * x.events.length }, () => wline({ w, h, attrs: 'data-lcs-spare' })).join('');
    const end = d.start ? (() => { const [st, rest] = split(x.ending); return writeGroup({ n: d.lines.ending, w, h, text: rest, starter: st, key }); })() : writeGroup({ n: d.lines.ending, w, h, text: x.ending, key });
    const bankBox = d.bank ? `<div data-lcs-wordbank data-lcs-ruletext style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:0 10px">${Bw('Word bank:')} ${esc(TIME_BANK.join(', '))}</div>` : '';
    b.push(cream('data-lcs-task="draft"', label(1, LINES.draft + note(VARY, key)) + `<div data-lcs-idealine data-lcs-idea="${A(P.idea.id)}" data-lcs-read style="font:700 ${READ - 1}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(LINES.draftIdea)} <i>${esc(P.idea.idea)}</i></div>` + bankBox +
      `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:2px">` + sec('beginning', beg) + sec('events', `<div data-lcs-eventlines style="display:flex;flex-direction:column;gap:0">${evs.join('')}${spare}</div>`) + sec('ending', end) + `</div>`, 6, 3, 'flex:1 1 auto'));
    b.push(checklist(CHECK.draft));
  }
  if (P.mode === 'choose') {
    b.push(ruleBox('Tired words', RULES.choose));
    const under = (t) => { const [a, rest] = t.split(/\{\w+\}/), w = t.match(/\{(\w+)\}/)[1]; return `${esc(a)}<u data-lcs-tiredword style="text-decoration-thickness:2.5px;text-underline-offset:4px">${esc(w)}</u>${esc(rest)}`; };
    b.push(cream('data-lcs-task="choose1"', label(1, LINES.choose1) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px">` +
      P.items.map((x, i) => `<div data-lcs-item data-lcs-tired="${x.i}" data-lcs-right="${A(x.right)}" style="flex:1 1 auto;display:flex;align-items:center;gap:6px;padding:3px 10px 4px;border-radius:12px;background:#FFFFFF">${num(String.fromCharCode(97 + i))}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px"><span data-lcs-read data-lcs-tiredtext style="font:700 ${READ}px/1.35 'Nunito',sans-serif;color:${T.ink}">${under(x.t)}</span><div data-lcs-opts style="display:flex;gap:18px">${x.opts.map((o) => opt(o, o === x.right, key)).join('')}</div></div></div>`).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
    b.push(cream('data-lcs-task="choose2"', label(2, LINES.choose2 + note(VARY, key)) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px">` +
      P.pairs.map((c, i) => { const two = c.strongAt === 0 ? [c.strong, c.weak] : [c.weak, c.strong];
        return `<div data-lcs-item data-lcs-pair="${c.i}" style="flex:1 1 auto;display:flex;align-items:center;gap:6px;padding:3px 10px 2px;border-radius:12px;background:#FFFFFF">${num(String.fromCharCode(97 + i))}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px"><div data-lcs-opts style="display:flex;flex-direction:column;gap:3px">${two.map((o) => opt(o, o === c.strong, key)).join('')}</div>${writeGroup({ n: 2, w: WI, text: c.why, key })}</div></div>`; }).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
  }
  if (P.mode === 'revise') {
    const d = LEVELS.revise[P.lv];
    // the box: its title, then one column for each tired word (the word in teal, its more exact words under it)
    b.push(`<div data-lcs-rulebox data-lcs-wordbox data-lcs-card style="display:flex;gap:10px;align-items:flex-start;padding:5px 12px 6px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF"><div data-lcs-boxtitle style="flex:0 0 74px;font:700 19px/1.1 'Baloo 2',cursive;color:${T.teal}">Words that work</div><div style="flex:1 1 auto;display:grid;grid-template-columns:repeat(6,1fr);gap:0 6px">` +
      Object.entries(BANK.box).map(([g, ws]) => `<div data-lcs-group="${g}" style="display:flex;flex-direction:column;gap:0"><span data-lcs-ruletext data-lcs-grouphead style="font:800 ${RULEPX + 0.5}px/1.18 'Nunito',sans-serif;color:${T.teal}">${esc(g)}</span>${ws.map((w) => `<span data-lcs-ruletext data-lcs-boxword style="font:700 ${RULEPX}px/1.18 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</span>`).join('')}</div>`).join('') + `</div></div>`);
    const P2 = P.para;
    let n = 0;
    const html = P2.sents.map((s, k) => { const [a, rest] = s.text.split(/\{\w+\}/), w = s.text.match(/\{(\w+)\}/)[1], on = P.slots.includes(k);
      if (!on) return esc(a) + `<span data-lcs-slot="${k}" data-lcs-done="1">${esc(s.fits[0])}</span>` + esc(rest);
      n++;
      const shown = d.find ? `<span data-lcs-slot="${k}" style="position:relative;display:inline-block;margin:0 4px">${esc(w)}${key ? `<span data-lcs-ringmark style="position:absolute;left:-6px;right:-6px;top:-2px;bottom:-3px;border:2.5px solid ${T.teal};border-radius:999px"></span>` : ''}</span>`
        : `<span data-lcs-slot="${k}" data-lcs-under="1" style="white-space:nowrap"><span data-lcs-slotnum style="font:800 12px/1 'Nunito',sans-serif;color:${T.teal};vertical-align:super;margin-right:1px">${n}</span><u style="text-decoration-thickness:2px;text-underline-offset:4px">${esc(w)}</u></span>`;
      return esc(a) + shown + esc(rest); }).join(' ');
    b.push(`<div data-lcs-card data-lcs-para="${A(P2.id)}" style="padding:5px 16px 6px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div data-lcs-ptitle style="font:700 20px/1.2 'Baloo 2',cursive;color:${T.ink}">${esc(P2.title)}</div><div data-lcs-ptext data-lcs-read style="font:700 ${STORY}px/1.42 'Nunito',sans-serif;color:${T.ink}">${html}</div></div>`);
    if (d.choices) {
      b.push(cream('data-lcs-task="revise1"', label(1, LINES.revise1[1]) + `<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 14px">` +
        P.items.map((x, j) => { const w = P2.sents[x.k].text.match(/\{(\w+)\}/)[1];
          return `<div data-lcs-item data-lcs-cell="${x.k}" data-lcs-right="${A(x.right)}" style="display:flex;gap:6px;padding:3px 10px;border-radius:12px;background:#FFFFFF">${num(j + 1)}<div style="display:flex;flex-direction:column;gap:2px"><span data-lcs-read style="font:700 ${READ}px/1.2 'Nunito',sans-serif;color:${T.inkSoft}">${esc(w)}</span><div data-lcs-opts style="display:flex;gap:14px">${x.opts.map((o) => opt(o, o === x.right, key)).join('')}</div></div></div>`; }).join('') + `</div>`, 8, 6));
    } else {
      const cw = Math.floor((INNER - 3 * 10) / 4);
      const also = P.slots.map((k, j) => [j + 1, P2.sents[k].fits.slice(1)]).filter(([, f]) => f.length);
      b.push(cream('data-lcs-task="revise1"', label(1, LINES.revise1[P.lv] + note('(Any word of the box that fits is right.)', key)) + `<div style="display:grid;grid-template-columns:repeat(4,${cw}px);gap:4px 10px">` +
        P.slots.map((k, j) => { const w = P2.sents[k].text.match(/\{(\w+)\}/)[1];
          return `<div data-lcs-item data-lcs-cell="${k}" style="display:flex;flex-direction:column;gap:0"><span data-lcs-cellhead style="font:800 15px/1.15 'Nunito',sans-serif;color:${T.teal}">${j + 1}.${d.find ? '' : ' ' + esc(w)}</span>${wline({ w: cw, answer: key ? P2.sents[k].fits[0] : null, attrs: `data-lcs-fits="${A(P2.sents[k].fits.join(','))}"` })}</div>`; }).join('') + `</div>` +
        `<div data-lcs-alsorow style="min-height:16px;font:700 13px/1.2 'Nunito',sans-serif;color:${T.teal}">${key && also.length ? `<span data-lcs-also>${esc('Also right: ' + also.map(([j, f]) => j + '. ' + f.join(', ')).join(' · '))}</span>` : ''}</div>`, 8, 4));
    }
    b.push(cream(`data-lcs-task="revise2" data-lcs-sampleidea="${A(P.sample.id)}"`, label(2, LINES.revise2 + note(SAMPLES_FOR + P.sample.idea + ')', key)) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">` +
      P.sample.revise.map((s, i) => `<div data-lcs-item data-lcs-own="${i}" style="padding:0 10px">${writeGroup({ n: 2, w: WQ, text: s, starter: (i + 1) + '.', key })}</div>`).join('') + `</div>`, 8, 5, 'flex:1 1 auto'));
  }
  return b;
}

function makeNarrativeG3Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('narrative-writing-g3: unknown mode ' + mode);
  const INFO = {
    mode, SPEC,
    stories: mode === 'parts' ? Object.fromEntries(BANK.stories.map((s) => [s.id, s])) : {}, pools: BANK.pools,
    ideas: Object.fromEntries([...BANK.ideas, ...BANK.exampleIdeas].map((x) => [x.id, x])),
    // the example ideas: never a prompt; the examples and the samples of G3-571 come only from them (finding 7)
    exampleIds: BANK.exampleIdeas.map((x) => x.id),
    dialogue: mode === 'marks' ? BANK.dialogue : [],
    telling: mode === 'show' ? Object.fromEntries(BANK.telling.map((x) => [x.f, x])) : {},
    orders: mode === 'order' ? Object.fromEntries(BANK.orderStories.map((o) => [o.id, o])) : {},
    rank: BANK.rank, gaps: mode === 'order' ? BANK.gaps : [],
    choose: mode === 'choose' ? BANK.choose : [], compare: mode === 'choose' ? BANK.compare : [],
    box: BANK.box, paras: mode === 'revise' ? Object.fromEntries(BANK.paragraphs.map((p) => [p.id, p])) : {},
    saidWords: BANK.saidWords, showWords: BANK.showWords, timeBox: BANK.timeBox,
  };
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType,
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
        bodyHtml: STYLE + `<div data-ws-content data-lcs-nw3="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px;min-height:0">` + fRoom(typo(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + P.list.slice(0, 2).join(','), items: P.list },
      };
    },

    async verify(page) {
      return page.evaluate(VERIFY_IN_PAGE, INFO);
    },
  };
}

/* ------------------------------------------------------------------ the check, run in the rendered page */
/* eslint-disable no-new-func */
function VERIFY_IN_PAGE(INFO) {
  const fails = [], S = INFO.SPEC;
  const root = document.querySelector('[data-lcs-nw3]');
  if (!root) return ['no page'];
  const [mode, lvS] = root.dataset.lcsNw3.split('|'), lv = +lvS, N = S.N;
  const isKey = root.dataset.lcsIskey === '1';
  const R = (e) => e.getBoundingClientRect(), cs = (e) => getComputedStyle(e), fs = (e) => parseFloat(cs(e).fontSize);
  const straight = (s) => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  const txt = (e) => (e ? straight(e.textContent).replace(/\s+/g, ' ').trim() : '');
  const TEAL = 'rgb(20, 107, 94)';
  const rb = R(root);
  const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  // letters: ligatures off everywhere, an f before i, f, l, t and a t before t with room of its own
  if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
  if ([...root.querySelectorAll('*')].some((e) => [...e.childNodes].some((n) => n.nodeType === 3 && /[a-z]/i.test(n.nodeValue)) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word may join its letters: the ligatures are on in an element with text');
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (/f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
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
  root.querySelectorAll('[data-lcs-card]').forEach((c) => { const q = R(c); c.querySelectorAll('span, div, b, i, u, svg').forEach((e) => { if (e.dataset && e.dataset.lcsRingmark !== undefined) return; const r = R(e); if (r.width && (r.bottom > q.bottom + 0.5 || r.right > q.right + 0.5 || r.left < q.left - 0.5 || r.top < q.top - 0.5)) fails.push('something leaves its card (' + (c.dataset.lcsTask || Object.keys(c.dataset).filter((k) => k !== 'lcsCard')[0]) + ')'); }); });
  const used = blocks.reduce((s, b) => s + R(b).height, 0);
  if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
  // sizes
  root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < S.READ) fails.push(`text a third grader reads is ${fs(e)} px (${S.READ} or more)`); });
  root.querySelectorAll('[data-lcs-opt]').forEach((e) => { if (fs(e) < S.OPT) fails.push(`a choice to circle is ${fs(e)} px (${S.OPT} or more)`); });
  root.querySelectorAll('[data-lcs-ruletext], [data-lcs-ex], [data-lcs-check], [data-lcs-wordrow]').forEach((e) => { if (fs(e) < S.RULE) fails.push(`a box or an example is printed at ${fs(e)} px (${S.RULE} or more)`); });
  root.querySelectorAll('[data-lcs-label]').forEach((e) => { if (fs(e) < S.LABEL) fails.push('a task line smaller than ' + S.LABEL + ' px'); });
  root.querySelectorAll('[data-lcs-mtn]').forEach((e) => { if (fs(e) < 14) fails.push('a word of the story mountain smaller than 14 px'); });
  // the lines: 34 px, filled only on the key, the key's text inside its line
  root.querySelectorAll('[data-lcs-line]').forEach((l) => { if (R(l).height < S.ROW - 0.5) fails.push(`a writing line ${Math.round(R(l).height)} px high (${S.ROW})`);
    const k = l.querySelector('[data-lcs-keytext]'); if (k && (k.scrollWidth > k.clientWidth + 1 || R(k).right > R(l).right + 0.5)) fails.push('a key answer does not fit its line'); if (k && fs(k) < S.KEY) fails.push('a key answer smaller than ' + S.KEY + ' px');
    if (!isKey && (l.dataset.lcsAnswer !== undefined || k)) fails.push('a line is filled on the page of the child'); });
  root.querySelectorAll('[data-lcs-opt]').forEach((o) => { const ringed = cs(o).borderTopColor === TEAL; if (isKey ? ringed !== !!o.dataset.lcsOk : ringed) fails.push('a choice is ringed on the page of the child, or the key rings the wrong one'); });
  // a label stands above its lines, never beside them
  root.querySelectorAll('[data-lcs-rowhead], [data-lcs-sechead], [data-lcs-whylabel], [data-lcs-cellhead], [data-lcs-qtext], [data-lcs-telltext], [data-lcs-raw]').forEach((h) => { const box = h.closest('[data-lcs-item]') || h.parentElement, l = box && box.querySelector('[data-lcs-line]'); if (l && R(h).bottom > R(l).top + 0.5) fails.push('a label stands beside its line, not above it: ' + txt(h).slice(0, 30)); });
  /** how many lines a text needs at a child's letter width on these lines (the first after its starter) */
  const need = (text, ls) => { let k = 0, cur = '';
    const capAt = (i) => { const l = ls[i]; if (!l) return 0; const st = l.querySelector('[data-lcs-starttext]'); return Math.max(0, Math.floor((R(l).width - (st ? R(st).width + 8 : 0) - 10) / S.CH)); };
    for (const w of String(text).split(' ')) { if (cur && (cur + ' ' + w).length > capAt(k)) { k++; cur = w; } else cur = cur ? cur + ' ' + w : w; if (cur.length > capAt(k)) return Infinity; }
    return k + 1; };
  /** a group of lines for one text: the text fits at a child's letter width with a line to spare; the key's lines hold it */
  const groupCheck = (g, what) => {
    const ls = [...g.querySelectorAll(':scope > [data-lcs-line]')], text = straight(g.dataset.lcsExpect || ''), n = +g.dataset.lcsWrites;
    if (ls.length !== n) fails.push(`${what}: ${ls.length} lines, not ${n}`);
    if (!text) { fails.push(`${what}: no sample to measure`); return; }
    const k = need(text, ls);
    if (k > ls.length - 1) fails.push(`${what}: the sample (${text.length} letters) needs ${k === Infinity ? 'more' : k} of ${ls.length} lines at ${S.CH} px a letter (one line must be left free)`);
    if (isKey) { const parts = ls.map((l) => straight(l.dataset.lcsAnswer || '')).filter(Boolean); if (parts.join(' ') !== text) fails.push(`${what}: the key's lines do not hold its sample`); if (ls[ls.length - 1].dataset.lcsAnswer) fails.push(`${what}: the key fills the line that is to be left free`); }
  };
  root.querySelectorAll('[data-lcs-writes]').forEach((g, i) => groupCheck(g, 'writing task ' + (i + 1)));
  /** lines with one text each (the events): each text fits its line, and one line is left free */
  root.querySelectorAll('[data-lcs-perline]').forEach((g) => { const ls = [...g.querySelectorAll(':scope > [data-lcs-line]')], ex = ls.filter((l) => l.dataset.lcsLineexpect);
    if (ls.length !== +g.dataset.lcsPerline || ex.length !== ls.length - 1) fails.push('the event lines are not three with one to spare');
    ex.forEach((l, i) => { if (need(straight(l.dataset.lcsLineexpect), [l]) > 1) fails.push(`event line ${i + 1}: the sample does not fit the line at ${S.CH} px a letter`);
      if (isKey && straight(l.dataset.lcsAnswer || '') !== straight(l.dataset.lcsLineexpect)) fails.push(`event line ${i + 1}: the key does not write its sample`); }); });
  // the places of right answers and the length of the choices
  const placesBad = (p, m) => { const n = p.length, count = (v) => p.filter((x) => x === v).length, s = p.join('');
    if (n >= m && new Set(p).size < m) return 'not every place is used';
    if (n >= 4 && Math.max(...Array.from({ length: m }, (_, v) => count(v))) > Math.ceil(n * (m === 2 ? 0.6 : 0.5))) return 'one place holds too many';
    if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return 'three in a row in one place';
    if (m >= 3 && p.some((x, i) => i >= 2 && ((p[i - 1] === p[i - 2] + 1 && x === p[i - 1] + 1) || (p[i - 1] === p[i - 2] - 1 && x === p[i - 1] - 1)))) return 'a staircase';
    if (m === 2 && (/01010|10101/.test(s) || (n >= 4 && p.every((x, i) => !i || x !== p[i - 1])))) return 'every other one';
    for (const par of [0, 1]) { const sub = p.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
    for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (p[i + k] !== p[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
    return ''; };
  const choiceCheck = (rows, what, m) => {
    const p = rows.map((r) => [...r.querySelectorAll('[data-lcs-opt]')].findIndex((o) => o.dataset.lcsOk));
    rows.forEach((r, i) => { const os = [...r.querySelectorAll('[data-lcs-opt]')]; if (os.length !== m || os.filter((o) => o.dataset.lcsOk).length !== 1 || new Set(os.map((o) => o.dataset.lcsOpt)).size !== m) fails.push(`${what} ${i + 1}: not ${m} different choices with one right`); if (r.dataset.lcsRight !== undefined && (os.find((o) => o.dataset.lcsOk) || {}).dataset.lcsOpt !== r.dataset.lcsRight) fails.push(`${what} ${i + 1}: the right choice is not keyed`); });
    if (p.some((x) => x < 0)) return;
    const bad = placesBad(p, m); if (bad && rows.length >= 2) fails.push(`the right ${what}s: ${bad} (${p.join('')})`);
    if (rows.length >= 3) { const L = rows.map((r) => { const os = [...r.querySelectorAll('[data-lcs-opt]')].map((o) => straight(o.dataset.lcsOpt)), right = straight((r.querySelector('[data-lcs-ok]') || {}).dataset.lcsOpt || ''); return { long: os.every((o) => o === right || o.length < right.length), short: os.every((o) => o === right || o.length > right.length) }; });
      if (L.filter((x) => x.long).length > rows.length / 2 || L.filter((x) => x.short).length > rows.length / 2) fails.push(`the length of the choices gives the ${what}s away (the right one is the longest or the shortest in more than half)`); }
  };
  // the task lines and the boxes of this level
  const labelOf = (sel) => { const l = root.querySelector(sel + ' [data-lcs-label]'); if (!l) return null; const c = l.cloneNode(true); c.querySelectorAll('[data-lcs-vary], [data-lcs-labelnum]').forEach((e) => e.remove()); return txt(c); };
  const needLabel = (sel, want) => { const got = labelOf(sel); if (got !== want) fails.push(`the task line of ${sel} is not the one of level ${lv}: "${got}"`); };
  const boxRows = (sel) => [...root.querySelectorAll(sel + ' [data-lcs-ruletext]')].map(txt);
  const checkRows = () => [...root.querySelectorAll('[data-lcs-checklist] [data-lcs-checktext]')].map(txt);
  const vary = [...root.querySelectorAll('[data-lcs-vary]')].filter((e) => cs(e).visibility !== 'hidden');
  if (!isKey && vary.length) fails.push('the page of the child says what the key says (sample, answers vary)');
  // the samples of the child's own piece name their idea (G3-571): that note is the one other note a key may carry
  const spEl = root.querySelector('[data-lcs-sampleidea]'), spIdea = spEl && INFO.ideas[spEl.dataset.lcsSampleidea], spNote = spIdea ? S.SAMPLES_FOR + spIdea.idea + ')' : null;
  vary.forEach((e) => { if (!S.NOTES.includes(txt(e)) && !(spNote && straight(txt(e)) === spNote)) fails.push(`the key's note "${txt(e)}" is not one that says it is a sample or what else is right`); });
  const words = (s) => String(s).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];

  if (mode === 'parts') {
    const want = [...S.RULES.parts, S.RULES.partsNarrator];
    if (boxRows('[data-lcs-rulebox]').join('|') !== want.join('|')) fails.push('the box does not tell the parts of a story of this level');
    const box = root.querySelector('[data-lcs-story]'), st = box && INFO.stories[box.dataset.lcsStory];
    if (!st) { fails.push('no story of the bank'); return fails; }
    if (txt(box.querySelector('[data-lcs-stext]')) !== st.text) fails.push('the story is not printed as the bank has it');
    if (lv === 1 && st.pov !== 'third') fails.push('a story told by a character on level 1');
    // the printed title names no word of a right answer that not every wrong choice of the question carries (round 3,
    // ruling 1); level 3 has no choices: its title names no word of the setting, the problem or the second character
    const cwT = (x) => words(x).map((w) => w.replace(/'s$/, '')).filter((w) => !S.TITLE_STOP.includes(w)).map((w) => w.replace(/(ing|ed|es|s)$/, ''));
    const tW = cwT(txt(box.querySelector('[data-lcs-stitle]')));
    if (lv === 3) for (const [q, t] of [['characters', st.chars.slice(1).join(' ')], ['setting', st.place + ' ' + st.time], ['problem', st.problem + ' ' + (st.also || '')]]) [...new Set(cwT(t))].filter((w) => tW.includes(w)).forEach((w) => fails.push(`the title names "${w}" of the right ${q}`));
    if (lv < 3) {
      needLabel('[data-lcs-task="parts"]', S.LINES.partsPick);
      const rows = [...root.querySelectorAll('[data-lcs-q]')], qs = rows.map((r) => r.dataset.lcsQ);
      if (qs.join() !== (lv === 1 ? 'chars,setting,problem' : 'chars,narrator,setting,problem')) fails.push('the questions are not the ones of this level: ' + qs.join(','));
      rows.forEach((r, i) => {
        const q = r.dataset.lcsQ, os = [...r.querySelectorAll('[data-lcs-opt]')].map((o) => straight(o.dataset.lcsOpt)), right = straight(r.dataset.lcsRight);
        if (txt(r.querySelector('[data-lcs-qtext]')) !== S.LINES.q[q]) fails.push(`question ${i + 1} is not "${S.LINES.q[q]}"`);
        const wantRight = q === 'chars' ? st.chars.join(' and ') : q === 'setting' ? st.place + ' ' + st.time : q === 'problem' ? st.problem : st.pov === 'first' ? st.narrator : S.NARRATOR_OUT;
        if (right !== wantRight) fails.push(`question ${i + 1} is keyed to "${right}", not "${wantRight}"`);
        const wrong = os.filter((o) => o !== right);
        const far = lv === 1;
        // a wrong name, place or time is one of the pools and none of its words stands in the story
        const STOPW = ['in', 'on', 'at', 'the', 'a', 'an', 'of', 'after', 'before', 'to', 'and', 'outside'], tw = words(st.text);
        const absent = (p) => words(p).filter((w) => !STOPW.includes(w)).every((w) => !tw.includes(w));
        const P = INFO.pools;
        const isName = (x) => P.names.includes(x) && absent(x), isPlace = (x) => P.places.includes(x) && absent(x) && words(x).filter((w) => !STOPW.includes(w)).every((w) => !words(st.place).includes(w)), isTime = (x) => (st.school === false ? P.times : P.schoolTimes).includes(x) && absent(x) && words(x).filter((w) => !STOPW.includes(w)).every((w) => !words(st.time).includes(w));
        const okWrong = (o) => {
          if (q === 'chars') return o.startsWith(st.chars[0] + ' and ') && isName(o.slice(st.chars[0].length + 5));
          if (q === 'narrator') return (st.pov === 'first' ? [cap1(st.chars.find((c) => c !== st.narrator)), S.NARRATOR_OUT] : st.chars.map((c) => cap1(c))).includes(o);
          if (q === 'problem') return (far ? st.far : st.near).map((x) => x[0]).includes(o);
          if (far) return P.places.some((p) => o.startsWith(p + ' ') && isPlace(p) && isTime(o.slice(p.length + 1)));
          return (o.startsWith(st.place + ' ') && isTime(o.slice(st.place.length + 1))) || (o.endsWith(' ' + st.time) && isPlace(o.slice(0, -(st.time.length + 1))));
        };
        if (wrong.some((o) => !okWrong(o))) fails.push(`question ${i + 1} offers a wrong answer that is not one of the bank's for level ${lv}: ${wrong.join(' / ')}`);
        if (q === 'setting' && !far && !(wrong.every((o) => o.startsWith(st.place + ' ')) || wrong.every((o) => o.endsWith(' ' + st.time)))) fails.push(`question ${i + 1}: the wrong settings of level 2 do not keep the same half of the right one`);
        if (q !== 'narrator') [...new Set(cwT(right + (q === 'problem' && st.also ? ' ' + st.also : '')))].filter((w) => tW.includes(w) && !wrong.every((o) => cwT(o).includes(w))).forEach((w) => fails.push(`question ${i + 1}: the title names "${w}" of the right answer, and not every wrong choice carries it`));
        // no option gives the answer away by the parts it shares (finding 2): the right one is not the only one that shares
        // a name, a place, or a time with each of the other two
        if (q === 'chars' || q === 'setting') { const partsO = (o) => (q === 'chars' ? o.split(' and ') : (() => { const pl = [st.place, ...P.places].find((x) => o.startsWith(x + ' ')) || ''; return [pl, o.slice(pl.length + 1)]; })());
          const PS = os.map(partsO), sh = (x, y) => PS[x].some((c) => PS[y].includes(c)), both = (x) => os.every((_, y) => y === x || sh(x, y)), r = os.indexOf(right);
          if (r >= 0 && both(r) && os.every((_, x) => x === r || !both(x))) fails.push(`question ${i + 1}: the right answer is the only one that shares a part with each wrong one`); }
        // no wrong place or time is a synonym, or a wider or narrower name, of the right one (findings 2 and 3)
        if (q === 'setting') { const grp = (x) => S.PLACE_GROUPS.map((g, k) => (g.some((w) => words(x).includes(w)) ? k : -1)).filter((k) => k >= 0);
          const partsT = (x) => { const ws = words(x), ps = Object.keys(S.DAY_PARTS).filter((k) => S.DAY_PARTS[k].some((w) => { const q2 = w.split(' '); return ws.some((_, j) => q2.every((y, m) => ws[j + m] === y)); })); return ws.includes('recess') ? [...new Set([...ps, 'morning', 'noon', 'afternoon'])] : ps; };
          const dayT = (x) => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].find((d) => words(x).includes(d)) || null;
          const clashT = (a2, b2) => { const da = dayT(a2), db = dayT(b2); if (da && db && da !== db) return false; const pa = partsT(a2), pb = partsT(b2); return pa.some((x) => pb.includes(x)) || !!(da && db && da === db && (!pa.length || !pb.length)); };
          wrong.forEach((o) => { const [pl, tm] = (() => { const x = [st.place, ...P.places].find((y) => o.startsWith(y + ' ')) || ''; return [x, o.slice(x.length + 1)]; })();
            if (pl !== st.place && grp(pl).some((k) => grp(st.place).includes(k))) fails.push(`question ${i + 1}: the wrong place "${pl}" is another name for the right one`);
            if (tm !== st.time && clashT(tm, st.time)) fails.push(`question ${i + 1}: the wrong time "${tm}" can be the right one`); }); }
      });
      choiceCheck(rows, 'answer', 3);
    } else {
      needLabel('[data-lcs-task="partswrite"]', S.LINES.partsWrite);
      const gs = [...root.querySelectorAll('[data-lcs-wq]')];
      if (gs.map((g) => g.dataset.lcsWq).join() !== 'chars,setting,problem,narrator') fails.push('level 3 does not ask who, where and when, what goes wrong, and who tells the story');
      gs.forEach((g, i) => { const q = g.dataset.lcsWq, want = q === 'chars' ? cap1(st.chars.join(' and ')) : q === 'setting' ? cap1(st.place + ' ' + st.time) : q === 'problem' ? st.problem : st.pov === 'first' ? st.narrator : cap1(S.NARRATOR_OUT), grp = g.querySelector('[data-lcs-writes]');
        if (!grp || straight(grp.dataset.lcsExpect) !== want) fails.push(`question ${i + 1} is not keyed to "${want}"`);
        if (txt(g.querySelector('[data-lcs-qtext]')) !== String.fromCharCode(97 + i) + '. ' + S.LINES.q[q]) fails.push(`question ${i + 1} is not "${S.LINES.q[q]}"`); });
      if (isKey && (vary.length !== 1 || txt(vary[0]) !== S.SAME_MEANING)) fails.push('the key does not say that other words with the same meaning are right');
      // the key names the other answers a careful reader writes: the problem's consequence where the bank has one, and the
      // narrator as the girl or the boy who says I (or someone who is not in the story); hidden on the page of the child
      const al = root.querySelector('[data-lcs-alsorow]'), wantAl = 'Also right: ' + [...(st.alsoChars ? ['a. ' + st.alsoChars] : []), ...(st.also ? ['c. ' + st.also] : []), 'd. ' + (st.pov === 'first' ? 'the ' + st.narratorIs + ' who says I' : 'someone who is not in the story')].join(' · ');
      if (!al || txt(al) !== wantAl) fails.push('the key does not name the other right answers of level 3');
      else if ((cs(al).visibility === 'hidden') === isKey) fails.push('the other right answers are hidden on the key or shown on the page of the child');
      else if (al.scrollWidth > al.clientWidth + 1) fails.push('the other right answers do not fit their row');
    }
  }
  if (mode === 'plan') {
    const ideas = [...root.querySelectorAll('[data-lcs-idea]')];
    if (ideas.length !== N.ideas[lv]) fails.push(`${ideas.length} story ideas, not ${N.ideas[lv]}`);
    needLabel('[data-lcs-task="ideas"]', S.LINES.ideas); needLabel('[data-lcs-task="plan"]', S.LINES.plan[lv]);
    ideas.forEach((e, i) => { const x = INFO.ideas[e.dataset.lcsIdea]; if (!x || txt(e.querySelector('[data-lcs-ideatext]')) !== x.idea) fails.push(`idea ${i + 1} is not an idea of the bank`); });
    const mt = root.querySelector('[data-lcs-mountain]'); if (!mt || [...mt.querySelectorAll('[data-lcs-mtn]')].map(txt).join() !== 'Beginning,Problem,Events,Ending') fails.push('no story mountain with its four parts');
    const x = INFO.ideas[(ideas[0] || {}).dataset.lcsIdea || ''];
    const rows = [...root.querySelectorAll('[data-lcs-row]')];
    if (rows.map((r) => r.dataset.lcsRow).join() !== 'chars,setting,problem,events,ending') fails.push('the planner does not have characters, setting, problem, events, and ending');
    const exIdea = [...root.querySelectorAll('[data-lcs-ex]')].map(txt);
    const starts = { all: () => true, events: (row) => row === 'events' || row === 'ending', none: () => false }[{ 1: 'all', 2: 'events', 3: 'none' }[lv]];
    rows.forEach((r) => { const row = r.dataset.lcsRow, st = [...r.querySelectorAll('[data-lcs-starttext]')].map(txt), wantSt = !starts(row) ? [] : row === 'events' ? S.PLAN_START.events : [S.PLAN_START[row]];
      if (st.join('|') !== wantSt.join('|')) fails.push(`the ${row} of the planner have the starters "${st.join(' ')}" (level ${lv} wants "${wantSt.join(' ')}")`);
      if (txt(r.querySelector('[data-lcs-rowname]')) !== S.PLAN_HEAD[row]) fails.push(`the planner row ${row} is not headed "${S.PLAN_HEAD[row]}"`);
      if (x) { const want = row === 'events' ? x.plan.events.map((e) => (starts(row) ? e : cap1(e))) : [starts(row) ? x.plan[row] : cap1(x.plan[row])];
        const got = row === 'events' ? [...r.querySelectorAll('[data-lcs-lineexpect]')].map((l) => straight(l.dataset.lcsLineexpect)) : [straight((r.querySelector('[data-lcs-writes]') || {}).dataset.lcsExpect || '')];
        if (got.join('|') !== want.join('|')) fails.push(`the sample of ${row} is not the plan of the first idea`); } });
    // the example is another idea's plan, never one of the ideas offered, printed beside each part
    const pc = root.querySelector('[data-lcs-task="plan"]'), exId = pc && pc.dataset.lcsExample, ex = exId && INFO.ideas[exId];
    if (!ex) fails.push('the example is no plan of the bank');
    else { if (ideas.some((e) => e.dataset.lcsIdea === exId)) fails.push('the example is the plan of an idea the child may choose');
      if (!INFO.exampleIds.includes(exId)) fails.push('the example is the plan of an idea that is a prompt of the unit');
      if (ideas.some((e) => INFO.exampleIds.includes(e.dataset.lcsIdea))) fails.push('an example idea is offered as a prompt');
      // nothing to copy (WRITING-PAGES.md rule 12): the example's topic is the topic of no idea offered
      if (ideas.some((e) => INFO.ideas[e.dataset.lcsIdea] && INFO.ideas[e.dataset.lcsIdea].topic === ex.topic)) fails.push(`the example shares its topic "${ex.topic}" with an idea the child may choose`);
      const wantEx = ['chars', 'setting', 'problem', 'events', 'ending'].map((r) => 'Example: ' + (r === 'events' ? ex.plan.events[0] : ex.plan[r]));
      if (exIdea.join('|') !== wantEx.join('|')) fails.push('the examples beside the parts are not the plan of one other idea'); }
    if (checkRows().join('|') !== S.CHECK.plan.join('|')) fails.push('the checklist is not the one of the planner');
    const wb = root.querySelector('[data-lcs-wordbank]'); if (!!wb !== (lv === 3)) fails.push('the word bank belongs to level 3 only');
    if (isKey && vary.length !== 2) fails.push('the key does not mark its plan as a sample');
  }
  if (mode === 'marks') {
    const want = S.RULES.marks;
    if (boxRows('[data-lcs-rulebox]').join('|') !== want.join('|')) fails.push('the box does not tell the rules of this level');
    needLabel('[data-lcs-task="marks1"]', S.LINES.marks1[lv]); needLabel('[data-lcs-task="marks2"]', S.LINES.marks2[lv]);
    const DL = INFO.dialogue;
    const right = (d, form) => { const end = d.s.slice(-1), core = d.s.slice(0, -1); if (form === 'tag') return `${d.n} ${d.tag}, "${d.s}"`; return end === '?' || end === '!' ? `"${d.s}" ${d.tag} ${d.n}.` : `"${core}," ${d.tag} ${d.n}.`; };
    const raw = (d, form) => (form === 'tag' ? `${d.n} ${d.tag} ${d.s}` : `${d.s.slice(0, -1)} ${d.tag} ${d.n}.`);
    const rows = [...root.querySelectorAll('[data-lcs-say]')], ps = [...root.querySelectorAll('[data-lcs-punct]')];
    if (rows.length !== N.marks1[lv] || ps.length !== N.marks2[lv]) fails.push(`${rows.length} speech bubbles and ${ps.length} lines to write (${N.marks1[lv]} and ${N.marks2[lv]} wanted)`);
    const used = [...rows, ...ps].map((r) => r.dataset.lcsSay || r.dataset.lcsPunct); if (new Set(used).size !== used.length) fails.push('one line of dialogue stands twice on the page');
    rows.forEach((r, i) => { const d = DL[+r.dataset.lcsSay], form = r.dataset.lcsForm; if (!d) { fails.push(`bubble ${i + 1} is no line of the bank`); return; }
      if (txt(r.querySelector('[data-lcs-saytext]')) !== d.s || txt(r.querySelector('[data-lcs-speaker]')) !== d.n) fails.push(`bubble ${i + 1} does not hold the exact words and the speaker`);
      if (straight(r.dataset.lcsRight) !== right(d, form)) fails.push(`bubble ${i + 1} is not keyed to "${right(d, form)}"`);
      const os = [...r.querySelectorAll('[data-lcs-opt]')].map((o) => straight(o.dataset.lcsOpt)).filter((o) => o !== right(d, form));
      if (lv === 1) { if (form !== 'first' || os.sort().join('|') !== [d.rep, right({ ...d, s: d.other }, 'first')].sort().join('|')) fails.push(`bubble ${i + 1}: level 1 offers other words (told without marks, one word changed)`); }
      else { if (os.some((o) => words(o).join(' ') !== words(right(d, form)).join(' '))) fails.push(`bubble ${i + 1}: a sentence of level ${lv} has other words, not other marks`);
        if (os.some((o) => o === right(d, form))) fails.push(`bubble ${i + 1}: a wrong sentence is the right one`); }
      if (form === 'tag' && lv < 3) fails.push('the speaker comes first on level ' + lv); });
    choiceCheck(rows, 'sentence', 3);
    ps.forEach((r, i) => { const d = DL[+r.dataset.lcsPunct], form = r.dataset.lcsForm, g = r.querySelector('[data-lcs-writes]');
      if (!d) { fails.push(`line ${i + 1} is no line of the bank`); return; }
      if (txt(r.querySelector('[data-lcs-raw]')) !== raw(d, form)) fails.push(`line ${i + 1} is not printed without its marks: "${txt(r.querySelector('[data-lcs-raw]'))}"`);
      if (/[",?“”]/.test(txt(r.querySelector('[data-lcs-raw]')).replace(/['’]/g, '').replace(/[.?]$/, ''))) fails.push(`line ${i + 1} prints a mark the child is to write`);
      if (!g || straight(g.dataset.lcsExpect) !== right(d, form)) fails.push(`line ${i + 1} is not keyed to "${right(d, form)}"`);
      if (form === 'tag' && /^I\b/.test(d.s)) fails.push(`line ${i + 1} prints the word I in a small letter`); });
    const pf = ps.map((r) => ({ form: r.dataset.lcsForm, q: (DL[+r.dataset.lcsPunct] || {}).tag === 'asked' }));
    if (lv === 1 && pf.some((x) => x.q || x.form === 'tag')) fails.push('level 1 asks for a question mark or puts the speaker first');
    if (lv >= 2 && (!pf.some((x) => x.q) || !pf.some((x) => !x.q))) fails.push(`level ${lv} does not write a question and a telling sentence`);
    if (lv === 3 && (!pf.some((x) => x.form === 'tag') || !pf.some((x) => x.form !== 'tag'))) fails.push('level 3 does not put the speaker first in one line of two');
    const rq = rows.map((r) => (DL[+r.dataset.lcsSay] || {}).tag === 'asked'); if (!rq.some(Boolean) || rq.every(Boolean)) fails.push('the bubbles are not questions and telling sentences');
  }
  if (mode === 'show') {
    const want = [...S.RULES.show, ...(lv === 3 ? [S.RULES.showDialogue] : [])];
    if (boxRows('[data-lcs-rulebox]').join('|') !== want.join('|')) fails.push('the box does not tell telling and showing of this level');
    needLabel('[data-lcs-task="show1"]', S.LINES.show1[lv]); needLabel('[data-lcs-task="show2"]', S.LINES.show2[lv]);
    const items = [...root.querySelectorAll('[data-lcs-tell]')];
    if (items.length !== N.show1[lv]) fails.push(`${items.length} telling sentences, not ${N.show1[lv]}`);
    items.forEach((r, i) => { const x = INFO.telling[r.dataset.lcsTell]; if (!x) { fails.push(`telling sentence ${i + 1} is no sentence of the bank`); return; }
      if (txt(r.querySelector('[data-lcs-telltext]')) !== 'Telling: ' + x.t) fails.push(`telling sentence ${i + 1} is not printed as the bank has it`);
      if (lv === 1) { const os = [...r.querySelectorAll('[data-lcs-opt]')].map((o) => straight(o.dataset.lcsOpt)); if (os.slice().sort().join('|') !== [x.right, x.wrong].sort().join('|') || straight(r.dataset.lcsRight) !== x.right) fails.push(`telling sentence ${i + 1}: not the sentence that shows it and one that shows another feeling, with the right one keyed`);
        if (os.some((o) => words(o).includes(x.f))) fails.push(`telling sentence ${i + 1}: a sentence to circle names the feeling`); }
      else { const g = r.querySelector('[data-lcs-writes]'), wantT = lv === 2 ? x.act : x.act + ' ' + x.thought; if (!g || straight(g.dataset.lcsExpect) !== wantT || +g.dataset.lcsWrites < (lv === 2 ? 2 : 3)) fails.push(`telling sentence ${i + 1}: the lines do not take ${lv === 2 ? 'an action' : 'an action and a thought'}`); } });
    if (lv === 1) choiceCheck(items, 'sentence', 2);
    if (new Set(items.map((r) => r.dataset.lcsTell)).size !== items.length) fails.push('one feeling stands twice');
    const il = root.querySelector('[data-lcs-idealine]'), idea = il && INFO.ideas[il.dataset.lcsIdea];
    if (!idea || txt(il) !== S.LINES.idea + ' ' + idea.idea) fails.push('the story idea for the dialogue is not printed');
    if (idea && INFO.exampleIds.includes(idea.id)) fails.push('the idea printed as the prompt is an example idea');
    const wr = root.querySelector('[data-lcs-wordrow]');
    if (lv === 1 ? wr : !wr || txt(wr) !== (lv === 2 ? 'Said-words: ' + INFO.saidWords.join(', ') : 'Words that show: ' + INFO.showWords.join(', '))) fails.push('the box of words is not the one of this level');
    if (idea && !Array.isArray(idea.dialogue)) fails.push('the idea printed has no lines of dialogue to key');
    else if (idea) {
      const right = (d) => (/[?!]$/.test(d.s) ? `"${d.s}" ${d.tag} ${d.n}.` : `"${d.s.slice(0, -1)}," ${d.tag} ${d.n}.`);
      if (lv === 1) { const fr = [...root.querySelectorAll('[data-lcs-frame]')]; if (fr.length !== 3) fails.push(`${fr.length} frames for dialogue, not 3`);
        fr.forEach((e, i) => { const d = idea.dialogue[i], bl = [...e.querySelectorAll('[data-lcs-fblank]')], qm = [...e.querySelectorAll('[data-lcs-mark]')].map((m) => m.textContent).join('');
          if (qm !== '“”.') fails.push(`frame ${i + 1} does not print its opening and closing quotation marks and its period: "${qm}"`);
          if (bl.length !== 2 || straight(bl[0].dataset.lcsExpect) !== (/[?!]$/.test(d.s) ? d.s : d.s.slice(0, -1) + ',') || straight(bl[1].dataset.lcsExpect) !== d.tag + ' ' + d.n) fails.push(`frame ${i + 1} is not keyed to the idea's dialogue`);
          bl.forEach((x) => { if (straight(x.dataset.lcsExpect).length * S.CH + 12 > R(x).width) fails.push(`frame ${i + 1}: a blank ${Math.round(R(x).width)} px wide does not hold "${x.dataset.lcsExpect}" at ${S.CH} px a letter`); if (R(x).height < S.ROW - 0.5) fails.push(`frame ${i + 1}: a blank lower than ${S.ROW} px`);
            const k = x.querySelector('[data-lcs-keytext]'); if (isKey ? !k || straight(txt(k)) !== straight(x.dataset.lcsExpect) || R(k).right > R(x).right + 0.5 : k) fails.push(`frame ${i + 1}: the key does not fill the blank, or the child's page does`); }); }); }
      else { const ds = [...root.querySelectorAll('[data-lcs-dlg]')]; if (ds.length !== 3) fails.push(`${ds.length} lines of dialogue, not 3`);
        ds.forEach((e, i) => { const d = idea.dialogue[i], g = e.querySelector('[data-lcs-writes]'), wantT = lv === 2 ? right(d) : right(d) + ' ' + d.act; if (!g || straight(g.dataset.lcsExpect) !== wantT || +g.dataset.lcsWrites < (lv === 2 ? 2 : 3)) fails.push(`dialogue line ${i + 1} is not keyed to the idea's dialogue`);
          if (lv === 2 && wr && !txt(wr).replace(/^[^:]*: /, '').split(', ').includes(d.tag)) fails.push(`the sample of dialogue line ${i + 1} uses "${d.tag}", which is not in the box of said-words the page asks for`); }); }
    }
    const wantC = [...S.CHECK.show, lv === 1 ? S.CHECK.showSaid : lv === 2 ? S.CHECK.showNoFeel : S.CHECK.showAct]; if (checkRows().join('|') !== wantC.join('|')) fails.push('the checklist is not the one of this level');
    if (isKey && vary.length !== (lv === 1 ? 1 : 2)) fails.push('the key does not mark its samples');
  }
  if (mode === 'order') {
    if (boxRows('[data-lcs-rulebox]').join('|') !== S.RULES.order[lv].join('|')) fails.push('the box of time words is not the one of this level');
    needLabel('[data-lcs-task="order1"]', S.LINES.order1.replace('{n}', N.events[lv])); needLabel('[data-lcs-task="order2"]', S.LINES.order2);
    const card = root.querySelector('[data-lcs-order]'), st = card && INFO.orders[card.dataset.lcsOrder];
    if (!st) { fails.push('no story of the bank to put in order'); return fails; }
    const evs = [...root.querySelectorAll('[data-lcs-ev]')], ks = evs.map((e) => +e.dataset.lcsEv);
    if (evs.length !== N.events[lv]) fails.push(`${evs.length} events, not ${N.events[lv]}`);
    if (ks.slice().sort((a, b) => a - b).join() !== [...Array(N.events[lv]).keys()].join()) fails.push('the events are not the first ones of the story, each once');
    evs.forEach((e, i) => { const k = +e.dataset.lcsEv, t = txt(e.querySelector('[data-lcs-evtext]')); if (t !== st.events[k]) fails.push(`event ${i + 1} is not printed as the bank has it`);
      const box = e.querySelector('[data-lcs-numbox]'); if (R(box).width < 34 || R(box).height < 34) fails.push('a box for a number smaller than 34 px'); if (isKey ? txt(box) !== String(k + 1) : txt(box)) fails.push(`the box of event ${i + 1} is ${isKey ? 'not keyed to ' + (k + 1) : 'filled on the page of the child'}`); });
    // the time words alone give ONE order: every event starts with a time word of the list, each with its own rank
    const lead = ks.slice().sort((a, b) => a - b).map((k) => (st.events[k].match(/^([^,]+),/) || [])[1]), rk = lead.map((l) => INFO.rank[l]);
    if (rk.some((x) => x === undefined) || rk.some((x, i) => i && !(x > rk[i - 1]))) fails.push('the time words of the events do not give one order: ' + lead.join(' / '));
    const n = ks.length;
    if (ks[0] === 0 || ks[n - 1] === n - 1 || ks.some((x, i) => i >= 2 && ((ks[i - 1] === ks[i - 2] + 1 && x === ks[i - 1] + 1) || (ks[i - 1] === ks[i - 2] - 1 && x === ks[i - 1] - 1))) || ks.filter((x, i) => i && x === ks[i - 1] + 1).length > 1) fails.push('the events are printed nearly in order: ' + ks.map((k) => k + 1).join(','));
    const gs = [...root.querySelectorAll('[data-lcs-gap]')];
    if (gs.length !== N.gaps[lv]) fails.push(`${gs.length} tiny stories, not ${N.gaps[lv]}`);
    gs.forEach((r, i) => { const g = INFO.gaps[+r.dataset.lcsGap]; if (!g || g.lv !== lv) { fails.push(`tiny story ${i + 1} is no tiny story of level ${lv}`); return; }
      const c = r.querySelector('[data-lcs-gaptext]').cloneNode(true); c.querySelectorAll('[data-lcs-blank]').forEach((x) => x.replaceWith('___')); if (txt(c) !== g.s.join(' ')) fails.push(`tiny story ${i + 1} is not printed as the bank has it`);
      const os = [...r.querySelectorAll('[data-lcs-opt]')].map((o) => o.dataset.lcsOpt); if (os.slice().sort().join('|') !== [g.right, ...g.wrong.map((x) => x[0])].sort().join('|')) fails.push(`tiny story ${i + 1} does not offer its time word and its two wrong ones`);
      if (os.some((o) => o !== g.right && g.fits.includes(o))) fails.push(`tiny story ${i + 1} offers a second word that fits`);
      const bl = r.querySelector('[data-lcs-blank]'); if (!bl || bl.dataset.lcsWant !== g.right || (isKey ? txt(bl) !== g.right : txt(bl))) fails.push(`the blank of tiny story ${i + 1} is not keyed to "${g.right}", or it is filled on the page of the child`);
      if (bl) { const k = bl.querySelector('[data-lcs-blankkey]'); if (k) { const rg = document.createRange(); rg.selectNodeContents(k); const q = rg.getBoundingClientRect(), bb = R(bl); if (q.left < bb.left - 0.5 || q.right > bb.right + 0.5) fails.push(`the answer of tiny story ${i + 1} does not fit its blank`); } } });
    choiceCheck(gs, 'time word', 3);
    if (new Set(gs.map((r) => r.dataset.lcsGap)).size !== gs.length) fails.push('one tiny story stands twice');
    { const rs = gs.map((r) => r.dataset.lcsRight); const w = rs.find((x) => rs.filter((y) => y === x).length > S.SAME_ANSWER_MAX); if (w) fails.push(`"${w}" is the answer of more than ${S.SAME_ANSWER_MAX} tiny stories`); }
  }
  if (mode === 'draft') {
    needLabel('[data-lcs-task="draft"]', S.LINES.draft);
    const il = root.querySelector('[data-lcs-idealine]'), idea = il && INFO.ideas[il.dataset.lcsIdea];
    if (!idea || txt(il) !== S.LINES.draftIdea + ' ' + idea.idea) { fails.push('the story idea is not printed'); return fails; }
    if (INFO.exampleIds.includes(idea.id)) fails.push('the idea printed as the prompt is an example idea');
    // the example is the whole story of an example idea (never one a child may have planned), on three lines at most
    const exc = root.querySelector('[data-lcs-example]'), ex = exc && INFO.ideas[exc.dataset.lcsExample];
    if (!ex || ex === idea) fails.push('the example is no story of the bank, or it is the idea the child writes about');
    else {
      if (!INFO.exampleIds.includes(ex.id)) fails.push('the example is the story of an idea that is a prompt of the unit (a child may have planned it)');
      if (ex.topic === idea.topic) fails.push(`the example shares its topic "${ex.topic}" with the idea the child writes about`);
      const et = exc.querySelector('[data-lcs-extext]');
      if (txt(et) !== [ex.draft.beginning, ...ex.draft.events, ex.draft.ending].join(' ')) fails.push('the example is not printed as the bank has it');
      if (R(et).height > S.EX_LINES * parseFloat(cs(et).lineHeight) + 1) fails.push(`the example takes more than ${S.EX_LINES} lines`);
    }
    const tr = root.querySelector('[data-lcs-timerow]'), wbk = root.querySelector('[data-lcs-wordbank]');
    if (!!tr !== (lv < 3) || !!wbk !== (lv === 3)) fails.push('the row of time words belongs to levels 1 and 2, the word bank to level 3');
    // the time words: one line of them, none twice (the row of levels 1 and 2, the bank of level 3)
    { const el = wbk || tr; if (el) { const ws = txt(el).replace(/^[^:]*: /, '').split(', '), want = lv === 3 ? S.TIME_BANK : S.TIME_ROW;
      if (new Set(ws).size !== ws.length) fails.push('a time word stands twice in the list of time words');
      if (ws.join('|') !== want.join('|')) fails.push('the list of time words is not the one of this level');
      if (R(el).height > 1.5 * parseFloat(cs(el).lineHeight)) fails.push('the list of time words takes more than one line'); } }
    const secs = [...root.querySelectorAll('[data-lcs-sec]')];
    if (secs.map((s) => s.dataset.lcsSec).join() !== 'beginning,events,ending') fails.push('the draft is not under the headings beginning, events, ending');
    secs.forEach((s) => { if (txt(s.querySelector('[data-lcs-sechead]')) !== S.DRAFT_HEAD[s.dataset.lcsSec]) fails.push(`the heading of ${s.dataset.lcsSec} is not "${S.DRAFT_HEAD[s.dataset.lcsSec]}"`); });
    // room for a story of one sitting: the lines of each part, two lines for each event
    const nL = (k) => root.querySelectorAll(`[data-lcs-sec="${k}"] [data-lcs-line]`).length, gotL = ['beginning', 'events', 'ending'].map(nL);
    if (gotL.join() !== S.N.draftLines[lv].join()) fails.push(`the draft has ${gotL.join(' / ')} lines (level ${lv} wants ${S.N.draftLines[lv].join(' / ')})`);
    const evg = [...root.querySelectorAll('[data-lcs-sec="events"] [data-lcs-event]')];
    if (evg.length !== 3 || evg.some((g) => +g.dataset.lcsWrites !== 2)) fails.push('the three events do not have two lines each');
    // level 1: "One day," starts the beginning (it fits any plan); each event and the ending start with their own time word
    const st = [...root.querySelectorAll('[data-lcs-task="draft"] [data-lcs-starttext]')].map(txt);
    const lead = (p) => p.match(/^([^,]+,)/)[1], rest = (p) => p.replace(/^[^,]+, /, '');
    const wantSt = [S.ONE_DAY, ...idea.draft.events.map(lead), lead(idea.draft.ending)];
    if (lv === 1 ? st.join('|') !== wantSt.join('|') : st.length) fails.push(`the starters are "${st.join(' ')}" (level ${lv} wants ${lv === 1 ? wantSt.join(' ') : 'none'})`);
    const got = [...root.querySelectorAll('[data-lcs-sec] [data-lcs-writes]')].map((g) => straight(g.dataset.lcsExpect));
    const want = lv === 1 ? [idea.draft.oneDay, ...idea.draft.events.map(rest), rest(idea.draft.ending)] : [idea.draft.beginning, ...idea.draft.events, idea.draft.ending];
    if (got.join('|') !== want.join('|')) fails.push('the samples of the draft are not the story of the idea');
    // the sample the key prints does what the page asks: a line of dialogue and a sentence that shows a feeling
    const all = got.join(' ');
    if (!/"[^"]+[,.!?]"/.test(all)) fails.push('the sample story has no line of dialogue');
    if (!words(all).some((w) => S.FEEL.includes(w))) fails.push('no sentence of the sample story shows a feeling');
    if (checkRows().join('|') !== S.CHECK.draft.join('|')) fails.push('the checklist is not the one of the draft');
    if (isKey && vary.length !== 1) fails.push('the key does not mark its story as a sample');
  }
  if (mode === 'choose') {
    if (boxRows('[data-lcs-rulebox]').join('|') !== S.RULES.choose.join('|')) fails.push('the box does not tell the tired words');
    needLabel('[data-lcs-task="choose1"]', S.LINES.choose1); needLabel('[data-lcs-task="choose2"]', S.LINES.choose2);
    const rows = [...root.querySelectorAll('[data-lcs-tired]')];
    if (rows.length !== N.choose[lv]) fails.push(`${rows.length} sentences, not ${N.choose[lv]}`);
    const groupOf = Object.fromEntries(Object.entries(INFO.box).flatMap(([g, ws]) => ws.map((w) => [w, g])));
    rows.forEach((r, i) => { const x = INFO.choose[+r.dataset.lcsTired]; if (!x) { fails.push(`sentence ${i + 1} is no sentence of the bank`); return; }
      const t = txt(r.querySelector('[data-lcs-tiredtext]')), u = r.querySelector('[data-lcs-tiredword]');
      if (t !== x.t.replace(/\{(\w+)\}/, '$1') || !u || txt(u) !== x.tired || !/underline/.test(cs(u).textDecorationLine)) fails.push(`sentence ${i + 1} is not printed with its tired word underlined`);
      const os = [...r.querySelectorAll('[data-lcs-opt]')].map((o) => o.dataset.lcsOpt), wk = { 1: 'w1', 2: 'w2', 3: 'w3' }[lv];
      if (os.slice().sort().join() !== [x.right, ...x[wk]].sort().join() || r.dataset.lcsRight !== x.right) fails.push(`sentence ${i + 1} does not offer its word and the wrong words of level ${lv}`);
      const wrong = os.filter((o) => o !== x.right);
      if (lv === 1 && wrong.some((o) => groupOf[o] === x.tired)) fails.push(`sentence ${i + 1}: level 1 offers a wrong word of the same group`);
      if (lv === 3 && wrong.some((o) => groupOf[o] && groupOf[o] !== x.tired)) fails.push(`sentence ${i + 1}: level 3 offers a wrong word of another group`); });
    choiceCheck(rows, 'word', 3);
    const rights = rows.map((r) => r.dataset.lcsRight); if (rows.some((r) => [...r.querySelectorAll('[data-lcs-opt]')].some((o) => o.dataset.lcsOpt !== r.dataset.lcsRight && rights.includes(o.dataset.lcsOpt)))) fails.push('the right word of one sentence is offered in another');
    const ps = [...root.querySelectorAll('[data-lcs-pair]')];
    if (ps.length !== N.pairs[lv]) fails.push(`${ps.length} pairs of sentences, not ${N.pairs[lv]}`);
    const longer = [];
    ps.forEach((r, i) => { const c = INFO.compare[+r.dataset.lcsPair]; if (!c) { fails.push(`pair ${i + 1} is no pair of the bank`); return; }
      const os = [...r.querySelectorAll('[data-lcs-opt]')]; if (os.map((o) => straight(o.dataset.lcsOpt)).slice().sort().join('|') !== [c.weak, c.strong].sort().join('|') || os.filter((o) => o.dataset.lcsOk).length !== 1 || straight(os.find((o) => o.dataset.lcsOk).dataset.lcsOpt) !== c.strong) fails.push(`pair ${i + 1}: not its two sentences with the clearer one keyed`);
      const g = r.querySelector('[data-lcs-writes]'); if (!g || straight(g.dataset.lcsExpect) !== c.why) fails.push(`pair ${i + 1}: the why is not keyed to its sample`);
      longer.push(c.strong.length > c.weak.length); });
    if (ps.length === 2 && longer[0] === longer[1]) fails.push('the clearer sentence is the longer one in both pairs (or the shorter in both): length gives it away');
    choiceCheck(ps, 'clearer sentence', 2);
    if (isKey && vary.length !== 1) fails.push('the key does not mark its why as a sample');
  }
  if (mode === 'revise') {
    const bx = [...root.querySelectorAll('[data-lcs-wordbox] [data-lcs-group]')];
    if (bx.map((e) => e.dataset.lcsGroup).join() !== 'said,went,looked,nice,big,good' || bx.some((e) => [...e.querySelectorAll('[data-lcs-ruletext]')].map(txt).join(',') !== [e.dataset.lcsGroup, ...INFO.box[e.dataset.lcsGroup]].join(','))) fails.push('the box does not hold the more exact words for each tired word');
    needLabel('[data-lcs-task="revise1"]', S.LINES.revise1[lv]); needLabel('[data-lcs-task="revise2"]', S.LINES.revise2);
    const pc = root.querySelector('[data-lcs-para]'), p = pc && INFO.paras[pc.dataset.lcsPara];
    if (!p) { fails.push('no paragraph of the bank'); return fails; }
    const slots = [...pc.querySelectorAll('[data-lcs-slot]')];
    const shown = p.sents.map((s, k) => { const el = slots.find((e) => +e.dataset.lcsSlot === k); const w = s.text.match(/\{(\w+)\}/)[1]; return s.text.replace(/\{\w+\}/, el && el.dataset.lcsDone ? s.fits[0] : w); }).join(' ');
    const ptext = pc.querySelector('[data-lcs-ptext]').cloneNode(true); ptext.querySelectorAll('[data-lcs-slotnum]').forEach((e) => e.remove());
    if (txt(ptext) !== shown) fails.push('the paragraph is not printed as the bank has it');
    const open = slots.filter((e) => !e.dataset.lcsDone), under = open.filter((e) => e.dataset.lcsUnder);
    if (open.length !== N.slots[lv]) fails.push(`${open.length} tired words left in the paragraph, not ${N.slots[lv]}`);
    if (lv < 3 ? under.length !== open.length : under.length || pc.querySelector('[data-lcs-slotnum]')) fails.push(lv < 3 ? 'a tired word to change is not underlined and numbered' : 'level 3 underlines or numbers a tired word');
    if (lv === 3) { const rings = open.filter((e) => e.querySelector('[data-lcs-ringmark]')); if (isKey ? rings.length !== open.length : rings.length) fails.push('the key does not ring every tired word, or the page of the child rings one'); }
    if (lv < 3) under.forEach((e, j) => { if (txt(e.querySelector('[data-lcs-slotnum]')) !== String(j + 1)) fails.push(`the tired words are not numbered in order`); });
    const TIRED = ['said', 'went', 'looked', 'nice', 'big', 'good'];
    if (words(txt(ptext)).filter((w) => TIRED.includes(w)).length !== open.length) fails.push('the paragraph holds a tired word that is not one to change, or a done one');
    const cells = [...root.querySelectorAll('[data-lcs-cell]')];
    if (cells.map((c) => +c.dataset.lcsCell).join() !== open.map((e) => +e.dataset.lcsSlot).join()) fails.push('the answers are not one for each tired word, in order');
    cells.forEach((c, j) => { const s = p.sents[+c.dataset.lcsCell], w = s.text.match(/\{(\w+)\}/)[1];
      if (lv === 1) { const os = [...c.querySelectorAll('[data-lcs-opt]')].map((o) => o.dataset.lcsOpt), right = c.dataset.lcsRight; if (!s.fits.includes(right) || os.length !== 2 || !os.includes(s.l1) || !os.includes(right)) fails.push(`answer ${j + 1}: not a word that fits and the wrong word of the bank`); }
      else { const l = c.querySelector('[data-lcs-line]'); if (!l || l.dataset.lcsFits !== s.fits.join(',')) fails.push(`answer ${j + 1} is not keyed to the words that fit`); else { if (isKey && l.dataset.lcsAnswer !== s.fits[0]) fails.push(`the key of answer ${j + 1} is not a word that fits`); if (Math.max(...INFO.box[w].map((x) => x.length)) * S.CH + 10 > R(l).width) fails.push(`the line of answer ${j + 1} is too short for the longest word of its group`); }
        if (txt(c.querySelector('[data-lcs-cellhead]')) !== (lv === 2 ? `${j + 1}. ${w}` : `${j + 1}.`)) fails.push(`answer ${j + 1} is not headed ${lv === 2 ? 'with its number and its tired word' : 'with its number only'}`); } });
    if (lv === 1) choiceCheck(cells, 'word', 2);
    // level 1: no word is offered in two items (finding 21)
    if (lv === 1) { const ws = cells.flatMap((c) => [...c.querySelectorAll('[data-lcs-opt]')].map((o) => o.dataset.lcsOpt)); if (new Set(ws).size !== ws.length) fails.push('a word is offered in two items'); }
    if (lv > 1) { const al = root.querySelector('[data-lcs-also]'), want = cells.map((c, j) => [j + 1, p.sents[+c.dataset.lcsCell].fits.slice(1)]).filter(([, f]) => f.length);
      if (isKey ? (want.length ? !al || txt(al) !== 'Also right: ' + want.map(([j, f]) => j + '. ' + f.join(', ')).join(' · ') : al) : al) fails.push('the key does not name every other word that fits'); if (al && (al.scrollWidth > al.clientWidth + 1 || R(al).right > R(al.parentElement).right + 0.5)) fails.push('the other right words do not fit their row'); }
    const own = [...root.querySelectorAll('[data-lcs-own]')]; if (own.length !== 3) fails.push(`${own.length} sentences of the child's own, not 3`);
    if (isKey && vary.length !== (lv > 1 ? 2 : 1)) fails.push('the key does not mark its samples');
    // the samples are the revised sentences of one story idea, and the key names that idea (rule 18)
    if (!spIdea) fails.push('the samples of the own story belong to no story idea of the bank');
    else if (!INFO.exampleIds.includes(spIdea.id)) fails.push('the samples of the own story belong to an idea that is a prompt of the unit');
    else { own.forEach((o, i) => { const g = o.querySelector('[data-lcs-writes]'); if (!g || straight(g.dataset.lcsExpect) !== spIdea.revise[i]) fails.push(`own sentence ${i + 1} is not keyed to a revised sentence of the idea "${spIdea.idea}"`); });
      if (isKey && !vary.some((e) => straight(txt(e)) === spNote)) fails.push('the key does not name the story idea of its samples'); }
  }
  // no blank band of more than GAP px between two tasks, two blocks, or under the last task of a card
  { const byParent = new Map();
    root.querySelectorAll('[data-lcs-item]').forEach((e) => { const p = e.parentElement; if (!byParent.has(p)) byParent.set(p, []); byParent.get(p).push(R(e)); });
    for (const rs of byParent.values()) { rs.sort((a, b) => a.top - b.top); let low = rs.length ? rs[0].bottom : 0; for (let k = 1; k < rs.length; k++) { const g = rs[k].top - low; if (g > S.GAP + 0.5) { fails.push(`a blank band of ${Math.round(g)} px between two tasks`); break; } low = Math.max(low, rs[k].bottom); } }
    const bl = blocks.map(R); for (let k = 1; k < bl.length; k++) { const g = bl[k].top - bl[k - 1].bottom; if (g > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two blocks`); }
    root.querySelectorAll('[data-lcs-task]').forEach((c) => { const low = Math.max(...[...c.querySelectorAll('[data-lcs-item], [data-lcs-line], [data-lcs-read], [data-lcs-label], [data-lcs-opts]')].map((e) => R(e).bottom));
      const g = R(c).bottom - parseFloat(cs(c).paddingBottom) - low; if (g > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(g)} px at the foot of a card (${c.dataset.lcsTask})`); }); }
  return fails;
}

module.exports = { makeNarrativeG3Type, faultsOf, plan, LEVELS, INSTR, LINES, SPEC, dlgRight, dlgRaw, dlgWrong, wrongsOf };
