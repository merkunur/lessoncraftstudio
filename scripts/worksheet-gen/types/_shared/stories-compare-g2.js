/**
 * stories-compare-g2.js — eight Grade 2 story pages, the unit "Stories: Beginnings, Endings, and Versions" (English
 * literacy year, Daily Teaching System Part 12.3, 2026-11-17). Children are 7 or 8. Every text is
 * data/literacy/stories-compare-g2.en.json (written by the scratch script nn-g2stories/bank.js): original stories, plays
 * and talks; the tales are my own retellings of public-domain folktales (RL.2.9 asks for versions of one story). No
 * picture stands on these pages. Two page types for each lesson (no screen activity teaches these standards).
 *
 *   arc       G2-576 How a Story Begins and Ends (RL.2.5, day 1). The instruction says what the parts do. A story of
 *             110 to 150 words in three labeled parts (BEGINNING, MIDDLE, ENDING). 1. Two questions with three answers
 *             to circle, every answer a sentence about the story (what problem do we learn about in the beginning: the
 *             problem, something of the middle, and on level 1 something of the ending, on levels 2 and 3 another event
 *             of the beginning that is not the problem; how is the problem solved in the ending: the solution, something
 *             tried in the middle, and on level 1 something of the beginning, on levels 2 and 3 another event of the
 *             ending that is not the solution). 2. Sentences
 *             about the story: which part tells it (B, M, or E in a box).
 *               level 1  three sentences, one of each part
 *               level 2  four: three of the parts and "We first meet ___." (the part that names that character first)
 *               level 3  four: two of the parts, "We first meet ___.", and one the story does not tell (X); the wrong
 *                        problem of the middle is a smaller trouble
 *   arcwrite  G2-577 Write How a Story Begins and Ends (RL.2.5, day 2). Another story than copy n of G2-576. Level 1:
 *             frames (We meet ___. It happens ___. The problem is that ___. In the ending, ___.); level 2: starters
 *             (In the beginning, we meet ___. The problem is that ___. In the ending, ___.); level 3, every other copy
 *             (an odd seed): how the beginning starts the story, and a new ending that still solves the problem; the
 *             other copies (an even seed): the story without its beginning: write a beginning, and how the ending
 *             closes the story. Every answer has the rows its sample needs and a row to spare.
 *   voices    G2-578 Who Is Talking? Points of View (RL.2.6, day 1). A story told mostly in dialogue; three
 *             speakers who think different things about one thing. Some lines carry a number. A box shows each way the
 *             level names a speaker, with an example on no page (Rosa); a list under the story gives each speaker's
 *             letter. 1. Write the letter of the speaker of each numbered line (level 1 four lines, each with said and a
 *             name after the words; level 2 six, the name also before the words; level 3 eight, some named only in an
 *             action sentence beside the words). 2. What each one thinks about it: the speaker's letter beside each view, X beside the
 *             view nobody in the story holds (levels 1 and 2 the two main speakers, level 3 all three, two by two).
 *   script    G2-579 Reader's Theater: Different Voices (RL.2.6, day 2). How to read a play; a short play (a
 *             narrator and three characters). 1. Circle the voice word that fits each character (level 1 two
 *             characters, each word beside a word that fits nobody, another one in each row; levels 2 and 3 three
 *             characters, three words: theirs, another character's, one that fits nobody). Level 3: write one more line for
 *             the first character, in the voice circled. Then: read the play in a group, a checklist.
 *   versions  G2-580 Two Versions of One Tale: Sort the Facts (RL.2.9, day 1). Two versions of a well-known tale side
 *             by side (about 100 to 115 words each). A chart: sentences about the characters, the setting, the problem,
 *             and the ending (a row whose sentences are all Both for the pair is not printed); circle 1, 2, or Both
 *             (level 3 also Neither). Level 1 six sentences, level 2 seven, level 3 seven (one is in neither version).
 *   compare   G2-581 Two Versions of One Tale: Compare Them (RL.2.9, day 2). The chart of the two versions of copy n
 *             of G2-580 (the same pair): characters, setting, problem, ending in short notes. 1. How the versions are
 *             alike and different (one thing both tell; one row of the chart that differs); 2. which one I like better
 *             and why (level 1 circles the version). Level 1 frames, level 2 starters, level 3 open.
 *   build     G2-582 Book Club Talk: Build on What Others Say (SL.2.1.b, day 1). The three talk stems; a tiny story;
 *             children's comments about it, each with replies to circle: one builds on the comment, the others change
 *             the subject (every reply starts with a talk stem). Level 1 three comments with two replies, level 2 three
 *             comments with three replies, level 3 two comments with three replies (one changes the subject, one is about
 *             the story but does not build on the idea) and a reply of the child's own to a fourth comment (two rows).
 *   card      G2-583 Book Club Talk Card (SL.2.1.b, day 2). The stems and how a talk sounds (three children about a
 *             model story); before the talk: one thing to say about our book and one question; after the talk: whose
 *             idea I built on, that idea, and what I said; a checklist. Level 1 frames, level 2 starters, level 3 open rows. The
 *             page prints no book title (it works with any book the class read).
 *
 * Rows to write on are 44 px (Grade 2). A second grader writes about 30 letters across a full-width row (651 px): every
 * key answer is measured against its row, and every answer keeps a row to spare. Stories and versions print at 18 px or
 * more. No blank band of more than 40 px that a reader sees. The places of right answers follow no pattern; the length
 * of a choice gives nothing away. Ligatures are off and an f before i, f, or l gets room. Apostrophes and quotes are
 * typographic on the page. English only. Themeless: a copy draws another story, play, pair of versions, or talk. PDF only.
 * The bank is checked when this file loads (scFaultsOf), including that every level can draw its pages. verify() carries
 * its own copy of every ruled text and measure (SPEC).
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/stories-compare-g2.en.json');
const { _parts } = require('./info-text.js');
const { seatOnRow, rulesOf } = require('../../lib/key-on-row.js');
const { makeRng } = require('../../lib/rng.js');
const { W, esc, shuffle, rowSvg } = _parts;
const A = (x) => esc(x).replace(/"/g, '&quot;');   // a text inside an attribute

// ------------------------------------------------------------------ measures
const ROW = 44;                                   // a Grade 2 writing row
const CPL = 30;                                   // letters a second grader writes across a full-width row
const FULLW = W - 24;                             // a full-width row inside a card (651 px)
const PXCH = FULLW / CPL;                         // the width of one letter of a child's hand
const BAND = 40;                                  // the most blank room a reader may see
const PASSAGE = 17.5;                             // a story, a play, a version (17 px or more)
const READ = 18;                                  // a question, a sentence to sort, a label
const CHOICE = 20;                                // something to circle
const START_PX = 21;                              // a frame or starter printed on its row
const BOX = 42;                                   // a box for one letter
const BASE_Y = rulesOf(rowSvg(400, ROW)).base;    // the base rule of a row, from its top
const START_PAD = Math.round((BASE_Y - 0.829 * START_PX) * 10) / 10;   // puts a starter's baseline on the base rule
const AP = '’';
/** the advance of each letter of Nunito 700 in em (measured 2026-11-17 on a rendered page; the opinion-letters-g2 table) */
const GLYPH_EM = { a: 0.55, b: 0.6, c: 0.47, d: 0.6, e: 0.54, f: 0.36, g: 0.6, h: 0.59, i: 0.26, j: 0.26, k: 0.54, l: 0.32, m: 0.88, n: 0.59, o: 0.58, p: 0.6, q: 0.6, r: 0.39, s: 0.49, t: 0.38, u: 0.58, v: 0.53, w: 0.85, x: 0.55, y: 0.53, z: 0.47, A: 0.74, B: 0.69, C: 0.68, D: 0.76, E: 0.6, F: 0.56, G: 0.74, H: 0.77, I: 0.28, J: 0.35, K: 0.67, L: 0.56, M: 0.87, N: 0.75, O: 0.79, P: 0.65, Q: 0.79, R: 0.69, S: 0.63, T: 0.62, U: 0.74, V: 0.71, W: 1.11, X: 0.67, Y: 0.62, Z: 0.61, "'": 0.25, [AP]: 0.25, ' ': 0.27, '.': 0.27, ',': 0.27, '!': 0.3, '?': 0.5, '“': 0.4, '”': 0.4, '"': 0.4, '-': 0.36, ':': 0.27 };
const emOf = (s) => [...String(s)].reduce((n, c) => n + (GLYPH_EM[c] || 0.6), 0);
const nCh = (s) => [...String(s)].length;
const capOf = (w) => Math.floor(w / PXCH + 1e-9);
const startW = (t) => (t ? Math.ceil(emOf(t) * START_PX) + 18 : 0);
const endW = (t) => (t ? Math.ceil(emOf(t) * START_PX) + 10 : 0);
/** a text spread word by word over rows of the given capacities (letters): the lines, or null when it does not fit */
function spread(text, caps) {
  const out = caps.map(() => '');
  let i = 0;
  for (const w of String(text).split(' ')) {
    for (;;) {
      if (i >= caps.length) return null;
      const cand = out[i] ? out[i] + ' ' + w : w;
      if (nCh(cand) <= caps[i]) { out[i] = cand; break; }
      if (!out[i]) return null;
      i++;
    }
  }
  return out;
}

// ------------------------------------------------------------------ the printed texts (registered with add-strings.js)
const TITLE = {
  arc: 'How a Story Begins and Ends', arcwrite: 'Write How a Story Begins and Ends', voices: 'Who Is Talking? Points of View',
  script: 'Reader’s Theater: Different Voices', versions: 'Two Versions of One Tale: Sort the Facts', compare: 'Two Versions of One Tale: Compare Them',
  build: 'Book Club Talk: Build on What Others Say', card: 'Book Club Talk Card',
};
const INSTR = {
  arc: { 1: 'The beginning of a story tells the problem. The ending tells how it is solved.', 2: 'A beginning tells who, where, and the problem. An ending solves the problem.', 3: 'The middle tells what the characters try. The ending tells how it is solved.' },
  arcwrite: { 1: 'Tell how the beginning starts the story and how the ending solves the problem.', 2: 'Tell how the beginning starts the story and the ending solves the problem.', 3: 'A beginning tells who, where, and the problem. An ending tells how it is solved.' },
  voices: { 1: 'Quotation marks show a character’s words. The name and “said” tell who is talking.', 2: 'Characters think differently. The name can come before or after the words.', 3: 'Characters think differently. No said-word? The character who does something just before the words is talking.' },
  script: { 1: 'In a play, read each part in a voice that fits the character.', 2: 'Characters want different things, so they sound different when read aloud.', 3: 'Read each part in a voice that fits what the character wants and feels.' },
  versions: { 1: 'Two versions of one tale tell the same story in different ways.', 2: 'Two versions of a tale can have different characters and settings.', 3: 'Compare two versions of a tale: what is the same, and what is different?' },
  compare: { 1: 'Tell how two versions of a tale are alike and how they are different.', 2: 'Two versions of a tale are alike in some ways and different in others.', 3: 'Compare two versions of a tale. Then tell which one you like better and why.' },
  build: { 1: 'In a book club, build on what others say: link your words to theirs.', 2: 'To build on a comment, agree, add to it, or see it another way.', 3: 'A reply that builds on a comment talks about the same idea: agree, add, or see it another way, with a reason.' },
  card: { 1: 'Get ready for book club, then tell how you built on what someone said.', 2: 'Plan what to say about our book. After the talk, tell how you built on an idea.', 3: 'Plan for book club. After the talk, tell how you built on what someone said.' },
};
const LINES = {
  ask: 'Circle the answer to each question.',
  q: { who: 'Who do we meet in the beginning?', problem: 'What problem do we learn about in the beginning?', solution: 'How is the problem solved in the ending?' },
  sort: { 1: 'Which part tells it? Write B, M, or E in the box.', 2: 'Which part tells it? Write B, M, or E in the box.', 3: 'Which part tells it? Write B, M, or E, or X if no part tells it.' },
  begin: { 1: 'How does the story begin? Finish each sentence.', 2: 'How does the story begin? Finish each sentence.' },
  end: { 1: 'How does the story end? Finish the sentence.', 2: 'How does the story end? Finish the sentence.' },
  open: { beginQ: 'How does the beginning start the story?', newEnd: 'Write a new ending that still solves the problem.', newBegin: 'The beginning is missing. Write a beginning that tells who, where, and the problem.', endQ: 'How does the ending close the story?' },
  who: 'Who says it? Write the speaker’s letter from the list in each box.',
  views: 'What does each one think about {ABOUT}? Write a letter, or X if nobody thinks it.',
  voice: 'Circle the voice word that fits each character.',
  next: 'Write one more line for {NAME}. Use the voice you circled.',
  read: 'Read the play in your group. Put a check mark by what you did.',
  chart: { 1: 'Circle 1 if only Version 1 tells it, 2 if only Version 2 tells it, or Both.', 2: 'Circle 1 if only Version 1 tells it, 2 if only Version 2 tells it, or Both.', 3: 'Circle 1, 2, Both, or Neither if no version tells it.' },
  same: { 1: 'How are the versions alike and different? Finish the sentences.', 2: 'How are the versions alike and different? Finish the sentences.', 3: 'Write how the two versions are alike and how they are different.' },
  like: { 1: 'Which version do you like better? Finish the sentence.', 2: 'Which version do you like better? Finish the sentence.', 3: 'Which version do you like better? Write why.' },
  pick: 'Circle the reply that builds on what each child said.', circleOne: '(circle one)',
  own: 'Write a reply that builds on what {NAME} said. Start with a talk stem.',
  before: 'Before the talk', after: 'After the talk',
  say: 'One thing I want to say about our book:', ask2: 'One question I want to ask my group:', built: 'How I built on what someone said:',
};
const PLAY_RULES = ['Read only your part. Do not read the names or the words in ( ) out loud.', 'The words in ( ) tell you how to say your line.'];
const STEM_TEXT = ['I agree with ___ because', 'I want to add that', 'I see it another way:'];
const READ_CHECK = ['I read only the lines of my part.', 'I used my character’s voice.', 'I did not read the names or the words in ( ).', 'I waited for my turn.'];
const TALK_CHECK = ['I said one idea about our book.', 'I asked my question.', 'I built on what someone said.', 'I let others finish before I talked.'];
const FRAME = { who: ['We meet', '.'], where: ['It happens', '.'], problem: ['The problem is that', ''], solved: ['In the ending,', ''] };
const START = { begin: 'In the beginning, we meet', problem: 'The problem is that', end: 'In the ending,' };
const CMP = { both: ['In both versions,', '.'], v1: ['In Version 1,', ','], v2: ['but in Version 2,', '.'], like: ['I like Version', 'better because'] };
const CMP_START = { both: 'In both versions,', v1: 'In Version 1,', like: 'I like Version' };
const CARD_F = { think: ['I think', ''], because: ['because', '.'], wonder: ['Why did', '?'], built: ['I built on what', 'said:'], idea: ['', '.'], said: ['I said, "', '."'] };
const CARD_S = { think: 'I think', wonder: 'Why did', built: 'said that' };
/** the key's samples of the talk card (they fit any book; the key says so) */
const CARD_SAMPLE = { think: 'the girl was brave', because: 'she kept trying', wonder: 'the dog run away', name: 'Maya', idea: 'the girl was brave', said: 'I want to add that she went back to help the dog' };
const NOTE = { sample: '(Sample)', words: '(Answers in other words are right.)', either: '(Sample: either version, with a reason from the tale, is right.)', anyBook: '(Samples: answers depend on the book.)',
  // G2-577 level 3: what else is right (MUST 4); G2-579 and G2-582 level 3 (SHOULD 26) name the word or the child
  open: { beginQ: '(Sample: any answer that tells who, where, and the problem is right.)', newBegin: '(Sample: any beginning that tells who, where, and the problem is right.)', newEnd: '(Sample: any ending that solves the problem is right.)', endQ: '(Sample: any answer that tells how the problem is solved is right.)' },
  line: (w) => `(Sample: any line that sounds ${w} is right.)`,
  reply: (n) => `(Sample: any reply that names ${n} or the idea and agrees, adds, or sees it another way with a reason from the story is right.)` };
/** G2-578: how a page says who is talking, each way with an example on no page (Rosa is in no story); a level shows the
 *  ways its numbered lines use (ruling D) */
const SPEAK = { after: ['After the words:', '"Hi!" said Rosa.'], before: ['Before the words:', 'Rosa said, "Hi!"'], beat: ['Only an action:', 'Rosa waved. "Hi!"'] };
const SPEAK_NAME = 'Rosa';
const KINDS = ['characters', 'setting', 'problem', 'ending'];
const KIND_NAME = { characters: 'Characters', setting: 'Setting', problem: 'Problem', ending: 'Ending' };

/** verify()'s OWN copy of every ruled text and measure (written out again on purpose: a build that changes one fails) */
const SPEC = {
  TITLE: { arc: 'How a Story Begins and Ends', arcwrite: 'Write How a Story Begins and Ends', voices: 'Who Is Talking? Points of View', script: "Reader's Theater: Different Voices", versions: 'Two Versions of One Tale: Sort the Facts', compare: 'Two Versions of One Tale: Compare Them', build: 'Book Club Talk: Build on What Others Say', card: 'Book Club Talk Card' },
  INSTR: {
    arc: { 1: 'The beginning of a story tells the problem. The ending tells how it is solved.', 2: 'A beginning tells who, where, and the problem. An ending solves the problem.', 3: 'The middle tells what the characters try. The ending tells how it is solved.' },
    arcwrite: { 1: 'Tell how the beginning starts the story and how the ending solves the problem.', 2: 'Tell how the beginning starts the story and the ending solves the problem.', 3: 'A beginning tells who, where, and the problem. An ending tells how it is solved.' },
    voices: { 1: "Quotation marks show a character's words. The name and \"said\" tell who is talking.", 2: 'Characters think differently. The name can come before or after the words.', 3: 'Characters think differently. No said-word? The character who does something just before the words is talking.' },
    script: { 1: 'In a play, read each part in a voice that fits the character.', 2: 'Characters want different things, so they sound different when read aloud.', 3: 'Read each part in a voice that fits what the character wants and feels.' },
    versions: { 1: 'Two versions of one tale tell the same story in different ways.', 2: 'Two versions of a tale can have different characters and settings.', 3: 'Compare two versions of a tale: what is the same, and what is different?' },
    compare: { 1: 'Tell how two versions of a tale are alike and how they are different.', 2: 'Two versions of a tale are alike in some ways and different in others.', 3: 'Compare two versions of a tale. Then tell which one you like better and why.' },
    build: { 1: 'In a book club, build on what others say: link your words to theirs.', 2: 'To build on a comment, agree, add to it, or see it another way.', 3: 'A reply that builds on a comment talks about the same idea: agree, add, or see it another way, with a reason.' },
    card: { 1: 'Get ready for book club, then tell how you built on what someone said.', 2: 'Plan what to say about our book. After the talk, tell how you built on an idea.', 3: 'Plan for book club. After the talk, tell how you built on what someone said.' },
  },
  LINES: {
    ask: 'Circle the answer to each question.',
    q: { who: 'Who do we meet in the beginning?', problem: 'What problem do we learn about in the beginning?', solution: 'How is the problem solved in the ending?' },
    sort: { 1: 'Which part tells it? Write B, M, or E in the box.', 2: 'Which part tells it? Write B, M, or E in the box.', 3: 'Which part tells it? Write B, M, or E, or X if no part tells it.' },
    begin: 'How does the story begin? Finish each sentence.', end: 'How does the story end? Finish the sentence.',
    open: { beginQ: 'How does the beginning start the story?', newEnd: 'Write a new ending that still solves the problem.', newBegin: 'The beginning is missing. Write a beginning that tells who, where, and the problem.', endQ: 'How does the ending close the story?' },
    who: "Who says it? Write the speaker's letter from the list in each box.",
    views: 'What does each one think about {ABOUT}? Write a letter, or X if nobody thinks it.',
    voice: 'Circle the voice word that fits each character.', next: 'Write one more line for {NAME}. Use the voice you circled.',
    read: 'Read the play in your group. Put a check mark by what you did.',
    chart: { 1: 'Circle 1 if only Version 1 tells it, 2 if only Version 2 tells it, or Both.', 2: 'Circle 1 if only Version 1 tells it, 2 if only Version 2 tells it, or Both.', 3: 'Circle 1, 2, Both, or Neither if no version tells it.' },
    same: { 1: 'How are the versions alike and different? Finish the sentences.', 2: 'How are the versions alike and different? Finish the sentences.', 3: 'Write how the two versions are alike and how they are different.' },
    like: { 1: 'Which version do you like better? Finish the sentence.', 2: 'Which version do you like better? Finish the sentence.', 3: 'Which version do you like better? Write why.' },
    pick: 'Circle the reply that builds on what each child said.', circleOne: '(circle one)', own: 'Write a reply that builds on what {NAME} said. Start with a talk stem.',
    before: 'Before the talk', after: 'After the talk', say: 'One thing I want to say about our book:', ask2: 'One question I want to ask my group:', built: 'How I built on what someone said:',
  },
  PLAY_RULES: ['Read only your part. Do not read the names or the words in ( ) out loud.', 'The words in ( ) tell you how to say your line.'],
  STEMS: ['I agree with ___ because', 'I want to add that', 'I see it another way:'],
  READ_CHECK: ['I read only the lines of my part.', "I used my character's voice.", 'I did not read the names or the words in ( ).', 'I waited for my turn.'],
  TALK_CHECK: ['I said one idea about our book.', 'I asked my question.', 'I built on what someone said.', 'I let others finish before I talked.'],
  FRAME: { who: ['We meet', '.'], where: ['It happens', '.'], problem: ['The problem is that', ''], solved: ['In the ending,', ''] },
  START: { begin: 'In the beginning, we meet', problem: 'The problem is that', end: 'In the ending,' },
  CMP: { both: ['In both versions,', '.'], v1: ['In Version 1,', ','], v2: ['but in Version 2,', '.'], like: ['I like Version', 'better because'] },
  CMP_START: { both: 'In both versions,', v1: 'In Version 1,', like: 'I like Version' },
  CARD_F: { think: ['I think', ''], because: ['because', '.'], wonder: ['Why did', '?'], built: ['I built on what', 'said:'], idea: ['', '.'], said: ['I said, "', '."'] },
  CARD_S: { think: 'I think', wonder: 'Why did', built: 'said that' },
  NOTES: ['(Sample)', '(Answers in other words are right.)', '(Sample: either version, with a reason from the tale, is right.)', '(Samples: answers depend on the book.)'],
  OPEN_NOTES: { beginQ: '(Sample: any answer that tells who, where, and the problem is right.)', newBegin: '(Sample: any beginning that tells who, where, and the problem is right.)', newEnd: '(Sample: any ending that solves the problem is right.)', endQ: '(Sample: any answer that tells how the problem is solved is right.)' },
  LINE_NOTE: ['(Sample: any line that sounds ', ' is right.)'], REPLY_NOTE: ['(Sample: any reply that names ', ' or the idea and agrees, adds, or sees it another way with a reason from the story is right.)'],
  SPEAK: { after: ['After the words:', '"Hi!" said Rosa.'], before: ['Before the words:', 'Rosa said, "Hi!"'], beat: ['Only an action:', 'Rosa waved. "Hi!"'] },
  KIND_NAME: { characters: 'Characters', setting: 'Setting', problem: 'Problem', ending: 'Ending' },
  // the measures: a second grader's row, letters across a full-width row, the blank band, the share of the body, sizes
  ROW: 44, CPL: 30, FULLW: 651, BAND: 40, FILL: 0.8, PASSAGE: 18, READ: 18, CHOICE: 20, LABEL: 18, BOX: 40, KEY: 13,
  // the counts of the levels (literal: a check that read LEVELS would agree with any change)
  N: { arcQ: { 1: 2, 2: 2, 3: 2 }, arcStrips: { 1: 3, 2: 4, 3: 4 }, who: { 1: 4, 2: 6, 3: 8 }, views: { 1: 3, 2: 3, 3: 4 }, voices: { 1: 2, 2: 3, 3: 3 }, voiceOpts: { 1: 2, 2: 3, 3: 3 }, facts: { 1: 6, 2: 7, 3: 7 }, factOpts: { 1: 3, 2: 3, 3: 4 }, replies: { 1: 2, 2: 3, 3: 3 }, comments: { 1: 3, 2: 3, 3: 2 } },
  FORMS: { 1: ['after'], 2: ['after', 'before'], 3: ['after', 'before', 'beat'] },
};

// ------------------------------------------------------------------ words
const lower = (s) => String(s).toLowerCase().replace(/[’‘]/g, "'");
const words = (s) => (lower(s).match(/[a-z]+(?:'[a-z]+)?/g) || []).map((w) => w.replace(/'s$/, ''));
const hasWord = (s, w) => { const ws = words(s), q = words(w); if (!q.length) return false; for (let i = 0; i + q.length <= ws.length; i++) if (q.every((x, k) => ws[i + k] === x)) return true; return false; };
const STOP = new Set(['a', 'an', 'the', 'in', 'on', 'at', 'of', 'to', 'and', 'or', 'is', 'are', 'was', 'were', 'be', 'it', 'its', 'he', 'she', 'they', 'his', 'her', 'their', 'him', 'them', 'with', 'for', 'from', 'by', 'up', 'out', 'so', 'but', 'not', 'no', 'do', 'does', 'did', 'that', 'this', 'what', 'who', 'how', 'we', 'i', 'my', 'me', 'you', 'your', 'our', 'us', 'one', 'can', 'all', 'too', 'very', 'just', 'then', 'get', 'gets', 'into', 'onto', 'over', 'down', 'off', 'as', 'if', 'has', 'have', 'had']);
const stemOf = (w) => w.replace(/'s$/, '').replace(/(ing|ed|es|s)$/, '');
const content = (s) => words(s).filter((w) => !STOP.has(w)).map(stemOf).filter((w) => w.length > 1);
/** the letter a child writes for a speaker, given on the page beside the name: the first letter of the name itself
 *  (Mr. Long: L; Grandma Pat: P; Dad: D) */
const initialOf = (name) => name.split(' ').pop().charAt(0).toUpperCase();
const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ------------------------------------------------------------------ the places of right answers and the length of choices
function patternOf(o) {
  const n = o.length;
  for (const par of [0, 1]) { const sub = o.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
  const runs = []; o.forEach((x, i) => { if (i && x === o[i - 1]) runs[runs.length - 1]++; else runs.push(1); });
  if (runs.length >= 3 && runs[0] >= 2 && runs.slice(0, -1).every((r) => r === runs[0])) return 'runs of one length';
  for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (o[i + k] !== o[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
  return '';
}
/** every place used (when there are as many items), none more than half, never three in a row, no staircase, two places
 *  never alternating all the way, and no pattern a child could read */
function placesOk(p, m) {
  const n = p.length, count = (v) => p.filter((x) => x === v).length, s = p.join('');
  if (n >= m && new Set(p).size < m) return false;
  if (n >= 4 && Math.max(...Array.from({ length: m }, (_, v) => count(v))) > Math.ceil(n * (m === 2 ? 0.6 : 0.5))) return false;
  if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
  if (m >= 3 && p.some((x, i) => i >= 2 && ((p[i - 1] === p[i - 2] + 1 && x === p[i - 1] + 1) || (p[i - 1] === p[i - 2] - 1 && x === p[i - 1] - 1)))) return false;
  if (m === 2 && (/01010|10101/.test(s) || (n >= 4 && p.every((x, i) => !i || x !== p[i - 1])))) return false;
  if (n === 2 && m >= 3 && p[0] === p[1]) return false;
  if (p.some((x, i) => i >= 3 && x !== p[i - 1] && p[i - 2] === x && p[i - 3] === p[i - 1])) return false;   // four alternating (ABAB)
  return !patternOf(p);
}
function places(n, m, rng) {
  for (let t = 0; t < 5000; t++) { const p = Array.from({ length: n }, () => rng.int(0, m - 1)); if (placesOk(p, m)) return p; }
  throw new Error(`no mixed places for ${n} answers among ${m}`);
}
/** the length of a choice gives nothing away: with three choices or more in a row, over three rows or more, the right
 *  answer is the longest of its row in at most half and the shortest in at most half; with two choices in a row (one is
 *  always the longer) or over two rows, it is not the longest in every row and not the shortest in every row */
function lengthOk(rows) {
  const longest = rows.filter((r) => r.opts.every((o) => o === r.right || o.length < r.right.length)).length;
  const shortest = rows.filter((r) => r.opts.every((o) => o === r.right || o.length > r.right.length)).length;
  if (rows.length < 2) return true;
  if (rows.length < 3 || rows.some((r) => r.opts.length < 3)) return longest < rows.length && shortest < rows.length;
  return longest <= rows.length / 2 && shortest <= rows.length / 2;
}
/** a sequence of letters (speakers, parts): no three alike in a row; not two letters alternating all the way (four or more);
 *  no block that repeats */
function seqOk(seq, need) {
  if (new Set(seq).size < need) return false;
  if (seq.some((x, i) => i >= 2 && x === seq[i - 1] && x === seq[i - 2])) return false;
  if (seq.length >= 4 && new Set(seq).size === 2 && seq.every((x, i) => !i || x !== seq[i - 1])) return false;
  if (seq.some((x, i) => i >= 3 && x !== seq[i - 1] && seq[i - 2] === x && seq[i - 3] === seq[i - 1])) return false;   // ABAB
  return !patternOf(seq);
}

// ------------------------------------------------------------------ the pairs of versions and what each fact is for a pair
const PAIRS = [];
(BANK.tales || []).forEach((t) => { for (const [x, y] of [[0, 1], [0, 2], [1, 2]]) PAIRS.push({ id: t.id + ':' + x + y, t, x, y }); });
/** V1, V2, Both, or Neither: a fact of the tale for the pair of versions x, y */
const statusOf = (f, x, y) => { const a = f.in.includes(x), b = f.in.includes(y); return a && b ? 'Both' : a ? 'V1' : b ? 'V2' : 'Neither'; };
/** the facts of a pair: the tale's facts and its neither-facts, each with its status */
const factsOf = (pr) => [...pr.t.facts.map((f, i) => ({ ...f, id: pr.t.id + '-f' + i, status: statusOf(f, pr.x, pr.y) })), ...pr.t.neither.map((f, i) => ({ ...f, id: pr.t.id + '-n' + i, status: 'Neither' }))];
const SIDX = { V1: 0, V2: 1, Both: 2, Neither: 3 };

// ------------------------------------------------------------------ the levels
const LEVELS = {
  arc: { 1: { qs: ['problem', 'solution'], events: 3, meets: 0 }, 2: { qs: ['problem', 'solution'], events: 3, meets: 1 }, 3: { qs: ['problem', 'solution'], events: 2, meets: 1, notIn: true, near: true } },
  arcwrite: { 1: { kind: 'frames' }, 2: { kind: 'starters' }, 3: { kind: 'open' } },
  voices: { 1: { lines: 4, forms: ['after'], views: 2 }, 2: { lines: 6, forms: ['after', 'before'], views: 2 }, 3: { lines: 8, forms: ['after', 'before', 'beat'], views: 3 } },
  script: { 1: { chars: 2, opts: 2 }, 2: { chars: 3, opts: 3 }, 3: { chars: 3, opts: 3, next: true } },
  versions: { 1: { facts: 6, neither: 0 }, 2: { facts: 7, neither: 0 }, 3: { facts: 6, neither: 1 } },
  compare: { 1: { kind: 'frames' }, 2: { kind: 'starters' }, 3: { kind: 'open' } },
  build: { 1: { replies: 2, comments: 3 }, 2: { replies: 3, comments: 3 }, 3: { replies: 3, comments: 2, own: true } },
  card: { 1: { kind: 'frames' }, 2: { kind: 'starters' }, 3: { kind: 'open' } },
};

/** the lines a text takes at px across width (greedy, word by word, at the measured advances of Nunito 700); the first
 *  line starts after `indent` px */
function linesOf(text, px, width, indent = 0) {
  const sp = GLYPH_EM[' '] * px; let lines = 1, x = indent;
  for (const w of String(text).split(/\s+/).filter(Boolean)) { const ww = emOf(w) * px; if (x > 0 && x + sp + ww > width) { lines++; x = ww; } else x += (x > 0 ? sp : 0) + ww; }
  return lines;
}
const TEXTW = W - 28 - 5;                         // the text width of a story box (padding 14, border 2.5)
/** the parts of a play, and whether they fit on the title's line (the title is Baloo 2 at 22 px, measured here with the
 *  Nunito advances and a fifth to spare) */
const castLine = (s) => 'Parts: Narrator, ' + s.cast.map((c) => c.name).join(', ');
const castInline = (s) => emOf(s.title) * 22 * 1.2 + 18 + emOf(castLine(s)) * 18 <= TEXTW;
const TAGW = Math.ceil(emOf('BEGINNING') * 15.5 + 9 * 0.4 + 12 + 7);
/** the estimated height of the passage box of a page at px (the story, the play, the versions, or the tiny story) */
function passageHeight(P, px, lh) {
  const L = px * lh, frame = 4 + 6 + 5 + 24;
  if (P.mode === 'arc' || P.mode === 'arcwrite') return frame + (P.variant === 'begin' ? ['m', 'e'] : ['b', 'm', 'e']).reduce((h, p) => h + 2 + linesOf(P.s[p].join(' '), px, TEXTW, TAGW) * L, 0);
  if (P.mode === 'voices') return frame + P.s.paras.reduce((h, p, i) => h + 1 + linesOf(p.t, px, TEXTW, P.pick.some((q) => q.i === i) ? 27 : 0) * L, 0);
  if (P.mode === 'script') return frame + 1 + (castInline(P.s) ? 0 : 22) + P.s.lines.reduce((h, l) => h + 1 + linesOf(l.who.toUpperCase() + ': ' + l.text, px, TEXTW) * L, 0);
  if (P.mode === 'versions') { const V = [P.pr.t.versions[P.pr.x], P.pr.t.versions[P.pr.y]]; return frame + 3 + 22 + Math.max(...V.map((x) => linesOf(x.text, px, (TEXTW + 2 - 14) / 2) * L)); }
  if (P.mode === 'build') return frame + linesOf(P.t.text, px, TEXTW) * L;
  if (P.mode === 'compare') { const V = [P.pr.t.versions[P.pr.x], P.pr.t.versions[P.pr.y]], cw = (TEXTW + 2 - 110 - 24) / 2;
    return frame + 3 + 22 + KINDS.reduce((h, k) => h + 2 + Math.max(...V.map((x) => linesOf(x.notes[k], px, cw))) * L, 0); }
  return 0;
}
const PF_LADDER = [17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23];
/** the print size of a copy's passage: the largest of the ladder (from the level's least, 17 px or more) whose box fits
 *  the room the level leaves for it (on a page to write on, the room less the rows that copy's answers need); so a short
 *  story prints larger, a long one smaller, and the page stays full */
function fitPf(P, rows = 0) {
  const L = LAY[P.mode][P.lv];
  if (!L.room) return L.pf;
  const room = L.room - rows * ROW;
  const ok = PF_LADDER.filter((px) => px >= L.pf && px <= (L.max || 21) && passageHeight(P, px, L.plh) <= room);
  return ok.length ? ok[ok.length - 1] : L.pf;
}
/** the print size of each story, play, or version (pf, 17 px or more) and its line height, per page and level; `room` is
 *  the height its passage box may take (measured: the page body less the other blocks; on a page to write on, less its
 *  rows too); `ch`/`say` the size of the replies to circle and of the comments (G2-582); on G2-579 level 1 `ch` the
 *  size of the voice words, `rowPad` the room of their rows, and `max` the largest print of a short play (two
 *  characters leave the page more room to fill) */
const LAY = {
  arc: { 1: { pf: 18, plh: 1.3, room: 324 }, 2: { pf: 18, plh: 1.22, room: 292 }, 3: { pf: 18, plh: 1.21, room: 270 } },
  arcwrite: { 1: { pf: 18, plh: 1.3, room: 690 }, 2: { pf: 18, plh: 1.3, room: 690 }, 3: { pf: 18, plh: 1.2, room: 678, max: 23 } },
  voices: { 1: { pf: 18, plh: 1.32, room: 405, max: 23 }, 2: { pf: 18, plh: 1.3, room: 425, max: 23 }, 3: { pf: 18, plh: 1.25, room: 418, max: 23 } },
  script: { 1: { pf: 18, plh: 1.32, room: 440, max: 23, ch: 22, rowPad: 8 }, 2: { pf: 18, plh: 1.3, room: 435, max: 23 }, 3: { pf: 18, plh: 1.19, room: 305 } },
  versions: { 1: { pf: 18, plh: 1.28, room: 510 }, 2: { pf: 18, plh: 1.26, room: 480 }, 3: { pf: 18, plh: 1.2, room: 406 } },
  compare: { 1: { pf: 18, plh: 1.25, room: 650 }, 2: { pf: 18, plh: 1.25, room: 650 }, 3: { pf: 18, plh: 1.25, room: 650 } },
  build: { 1: { pf: 18, plh: 1.42, room: 210, max: 23, ch: 22, say: 21, rowPad: 5 }, 2: { pf: 18, plh: 1.34, room: 200, ch: 21, say: 19 }, 3: { pf: 18, plh: 1.3, room: 150, ch: 20, say: 18 } },
  card: { 1: { pf: 18, plh: 1.3 }, 2: { pf: 18, plh: 1.3 }, 3: { pf: 18, plh: 1.3 } },
};

// ------------------------------------------------------------------ the bank check
const sentencesOf = (s) => (String(s).match(/[^.!?]+[.!?]+["’”]?/g) || []).map((x) => x.trim());
/** the samples a writing part prints on rows: how many rows a sample needs after a start text (frame or starter) */
/** the rows of a slot of n rows: the frame's start on the first, its end on the last (where the answer ends) */
const slotShape = (n, start, end, w = FULLW) => Array.from({ length: n }, (_, i) => ({ w, start: i === 0 ? start : undefined, end: i === n - 1 ? end : undefined }));
const capsOf = (rows) => rows.map((r) => capOf(r.w - startW(r.start) - endW(r.end)));
const rowsNeeded = (text, firstStart, firstEnd, w = FULLW) => {
  for (let n = 1; n <= 8; n++) if (spread(text, capsOf(slotShape(n, firstStart, firstEnd, w)))) return n;
  return 99;
};
const MAXR = { slot: 4 };
function scFaultsOf(b) {
  const f = [];
  const mo = Object.values(b.modelOnly || {}).flat().map((x) => lower(x));
  const noModel = (tag, text) => { mo.forEach((w) => { if (hasWord(text, w)) f.push(`${tag}: prints "${w}", a word kept for the teacher's model`); }); };
  // no text of the bank says "free" or "premium" (the page check refuses them: they read as the site's tiers)
  { const walk = (o, p) => { if (typeof o === 'string') { if (/\b(free|frees|freed|freely|freedom|premium)\b/i.test(o)) f.push(`${p}: says free or premium in "${o.slice(0, 40)}"`); }
    else if (o && typeof o === 'object') Object.entries(o).forEach(([k, x]) => { if (k !== '_note' && k !== 'modelOnly') walk(x, p + '.' + k); }); };
    walk(b, 'bank'); }
  // the name of the examples of G2-578 (how a page says who is talking) is in no text of the bank
  if (hasWord(JSON.stringify(b), SPEAK_NAME)) f.push(`bank: names ${SPEAK_NAME}, the name of the examples of who is talking`);
  const noStraightDash = (tag, s) => { if (/[–—]/.test(s)) f.push(`${tag}: a dash in "${s.slice(0, 30)}"`); };
  // ---- arc
  const A = b.arc || [];
  if (A.length < 15) f.push('arc: fewer than 15 stories');
  if (new Set(A.map((s) => s.id)).size !== A.length) f.push('arc: an id stands twice');
  A.forEach((s) => {
    const tag = `arc "${s.id}"`, all = [...s.b, ...s.m, ...s.e], text = all.join(' '), n = words(text).length;
    if (n < 110 || n > 150) f.push(`${tag}: ${n} words (110 to 150)`);
    if (new Set(all).size !== all.length) f.push(`${tag}: a sentence stands twice`);
    for (const p of ['b', 'm', 'e']) if (!Array.isArray(s[p]) || s[p].length < 4 || s[p].length > 5) f.push(`${tag}: part ${p} has not four or five sentences`);
    all.forEach((x) => { if (!/^[A-Z"].*[.!?]["]?$/.test(x)) f.push(`${tag}: "${x.slice(0, 30)}" is no whole sentence`); if ((x.match(/"/g) || []).length % 2) f.push(`${tag}: a quotation mark has no partner in "${x.slice(0, 30)}"`); noStraightDash(tag, x); });
    noModel(tag, text);
    // the beginning names who; the middle names the main character in its first two sentences (the story without its
    // beginning still says who it is about); where is stated in the beginning
    if (!hasWord(s.b.join(' '), s.who.right)) f.push(`${tag}: the beginning does not name ${s.who.right}`);
    if (!hasWord(s.b.join(' '), s.main) || !s.m.slice(0, 2).some((x) => hasWord(x, s.main))) f.push(`${tag}: the main character ${s.main} is not named in the beginning and in the first two sentences of the middle`);
    // who: the right one is named in the beginning; each wrong one first in the middle or in the ending, never in the beginning
    s.who.wrong.forEach((w, k) => { const where = k === 0 ? s.m : s.e; if (hasWord(s.b.join(' '), w) || !hasWord(where.join(' '), w.replace(/^(Ms\.|Mr\.|Mrs\.) /, ''))) f.push(`${tag}: "${w}" is not first named in the ${k === 0 ? 'middle' : 'ending'}`); if (k === 1 && hasWord(s.m.join(' '), w)) f.push(`${tag}: "${w}" is named in the middle too`); });
    // the problem is told in the beginning, the solution in the ending
    s.problem.proof.forEach((x) => { if (!s.b.includes(x)) f.push(`${tag}: the problem's proof is not a sentence of the beginning`); });
    s.solution.proof.forEach((x) => { if (!s.e.includes(x)) f.push(`${tag}: the solution's proof is not a sentence of the ending`); });
    // events: each in its part (the sentence that proves it), its keys in that sentence and not all in any one sentence of
    // another part; never the problem or the solution sentence
    const others = (p) => ['b', 'm', 'e'].filter((q) => q !== p).flatMap((q) => s[q]);
    s.ev.forEach((ev) => {
      if (!s[ev.p].includes(ev.proof)) f.push(`${tag}: the event "${ev.text}" has no proof sentence in its part`);
      if (!ev.keys.length || !ev.keys.every((k) => hasWord(ev.proof, k))) f.push(`${tag}: a key of "${ev.text}" is not in its sentence`);
      if (others(ev.p).some((x) => ev.keys.every((k) => hasWord(x, k)))) f.push(`${tag}: the keys of "${ev.text}" stand in a sentence of another part too`);
      if (s.problem.proof.includes(ev.proof) || s.solution.proof.includes(ev.proof)) f.push(`${tag}: the event "${ev.text}" is the problem or the solution`);
      if (!/^[A-Z].*\.$/.test(ev.text) || ev.text.length > 52) f.push(`${tag}: the event "${ev.text}" is no sentence of 52 letters or fewer`);
    });
    const evOf = (p, tagW) => s.ev.filter((e) => e.p === p && (!tagW || e.tag === tagW));
    if (evOf('b').length < 3 || evOf('m').length < 3 || evOf('e').length < 2) f.push(`${tag}: fewer than three events of the beginning, three of the middle, or two of the ending`);
    if (!evOf('m', 'attempt').length || !evOf('m', 'near').length) f.push(`${tag}: no attempt or no smaller trouble in the middle`);
    // ruling C: a tag says what an event may stand for (react: a beginning event that echoes or causes the problem, never a
    // wrong problem; sol: an ending event that is part of the solution, never a wrong solution)
    const TAGS = { b: ['', 'react'], m: ['', 'attempt', 'near'], e: ['', 'sol'] };
    s.ev.forEach((ev) => { if (!TAGS[ev.p] || !TAGS[ev.p].includes(ev.tag)) f.push(`${tag}: the event "${ev.text}" has the tag "${ev.tag}" in part ${ev.p}`); });
    if (!s.ev.some((e) => e.p === 'b' && e.tag !== 'react') || !s.ev.some((e) => e.p === 'e' && e.tag !== 'sol')) f.push(`${tag}: no beginning event that can be a wrong problem, or no ending event that can be a wrong solution`);
    if (!/^[A-Z].*\.$/.test(s.problem.text) || !/^[A-Z].*\.$/.test(s.solution.text) || s.problem.text.length > 52 || s.solution.text.length > 52) f.push(`${tag}: the problem or the solution is no sentence of 52 letters or fewer`);
    const ni = s.notIn; if (!ni || !ni.absent.length || ni.absent.some((w) => hasWord(text, w)) || ni.text.length > 52) f.push(`${tag}: the sentence that is not in the story names a word of the story, or is too long`);
    // a title names no word of the right who, problem, or solution (the answers are never found by matching the title)
    const tw = content(s.title);
    for (const [q, r] of [['who', s.who.right], ['problem', s.problem.text], ['solution', s.solution.text]]) content(r).filter((w) => tw.includes(w)).forEach((w) => f.push(`${tag}: the title names "${w}" of the right answer to ${q}`));
    // the frames and samples of G2-577: a fragment fits its frame; samples are sentences of the length the rows hold
    const fr = s.frames || {};
    for (const k of ['who', 'where', 'problem', 'solved']) { if (!fr[k] || /[.!?]$/.test(fr[k])) f.push(`${tag}: the frame answer "${k}" is missing or ends with a mark`); else if (rowsNeeded(fr[k] + (FRAME[k][1] ? '' : '.'), FRAME[k][0], FRAME[k][1]) > (k === 'who' || k === 'where' ? 1 : 2)) f.push(`${tag}: the frame answer "${fr[k]}" needs more rows than its frame has`); }
    if (!/^(at|in|on)\b/.test(fr.where || '')) f.push(`${tag}: the place "${fr.where}" does not start with at, in, or on`);
    for (const k of ['beginSample', 'endSample']) if (!/^[A-Z].*\.$/.test(s[k] || '') || rowsNeeded(s[k]) > 3) f.push(`${tag}: ${k} is no sentence of three rows`);
    // ruling E: a beginning sample names who, where, and what the problem is about; an ending sample names what the problem
    // was about (so it tells how THAT is solved); the words of each list stand in the beginning of the story
    const ask = s.ask || {}, has = (x, list) => (list || []).some((w) => hasWord(x, w) || (!/ /.test(w) && content(x).includes(stemOf(lower(w)))));
    for (const k of ['who', 'where', 'thing']) if (!(ask[k] || []).length || ask[k].some((w) => !has(text, [w])) || !has(s.b.join(' '), ask[k])) f.push(`${tag}: the asked part ${k} is missing, not in the story, or not in its beginning`);
    for (const k of ['beginSample', 'newBeginning']) for (const p of ['who', 'where', 'thing']) if (!has(s[k], ask[p])) f.push(`${tag}: ${k} does not tell ${p}`);
    for (const k of ['endSample', 'newEnding']) if (!has(s[k], ask.thing)) f.push(`${tag}: ${k} does not tell what was solved`);
    for (const k of ['newEnding', 'newBeginning']) if (sentencesOf(s[k]).length < 2 || rowsNeeded(s[k]) > 4) f.push(`${tag}: ${k} is not two sentences of four rows`);
    if (!hasWord(s.newBeginning, s.main)) f.push(`${tag}: the new beginning does not name ${s.main}`);
    if (s.e.some((x) => hasWord(s.newEnding, x))) f.push(`${tag}: the new ending copies the ending`);
  });
  // ---- voices
  const V = b.voices || [];
  if (V.length < 14) f.push('voices: fewer than 14 stories');
  V.forEach((s) => {
    const tag = `voices "${s.id}"`, text = s.paras.map((p) => p.t).join(' ');
    if (s.chars.length !== 3 || new Set(s.chars.map(initialOf)).size !== 3) f.push(`${tag}: not three speakers with three different first letters`);
    if (s.chars.map(initialOf).includes('X')) f.push(`${tag}: a speaker's letter is X`);
    const qs = s.paras.filter((p) => p.who);
    if (qs.length < 8) f.push(`${tag}: fewer than eight lines of dialogue`);
    if (qs.filter((p) => p.form === 'after').length < 4 || qs.filter((p) => p.form !== 'beat').length < 6) f.push(`${tag}: fewer than four lines named after the words or six named by a said-word`);
    s.paras.forEach((p, i) => {
      const q = p.t.match(/"[^"]*"/g) || [];
      if (p.who && q.length !== 1) f.push(`${tag}: paragraph ${i + 1} has ${q.length} quoted parts (one speaker's words in one pair of marks)`);
      if (!p.who && q.length) f.push(`${tag}: paragraph ${i + 1} has words in quotation marks and no speaker`);
      if (p.who && !s.chars.includes(p.who)) f.push(`${tag}: paragraph ${i + 1} has a speaker not of the story`);
      if (!p.who) return;
      const out = p.t.replace(/"[^"]*"/g, ' | ');
      const named = s.chars.filter((c) => hasWord(out, c));
      // the name of the speaker stands outside the words, and no other speaker is named outside them
      if (!named.includes(p.who) || named.length !== 1) f.push(`${tag}: paragraph ${i + 1} does not name only its speaker outside the quotation marks`);
      const [before, after] = out.split(' | ');
      const SAID = /\b(said|asked|shouted|called|groaned|giggled|whispered|cried|grumbled|cheered|laughed|yelled|begged|sighed)\b/;
      if (p.form === 'after' && !(hasWord(after, p.who) && SAID.test(after))) f.push(`${tag}: paragraph ${i + 1} is not named by a said-word after the words`);
      if (p.form === 'before' && !(hasWord(before, p.who) && SAID.test(before))) f.push(`${tag}: paragraph ${i + 1} is not named by a said-word before the words`);
      if (p.form === 'beat' && (!hasWord(before, p.who) || SAID.test(before))) f.push(`${tag}: paragraph ${i + 1} is not named in a sentence before the words`);
    });
    // each speaker's view: the paragraphs that show it are that speaker's; the view of nobody names no word of the story
    for (const c of s.chars) { const vw = s.views[c]; if (!vw || !vw.paras.length || vw.paras.some((i) => !s.paras[i] || s.paras[i].who !== c)) f.push(`${tag}: the view of ${c} is not shown by ${c}'s own words`); }
    if (!s.nobody || s.nobody.absent.some((w) => hasWord(text, w))) f.push(`${tag}: the view of nobody names a word of the story`);
    const vs = [...s.chars.map((c) => s.views[c].text), s.nobody.text];
    // a view is never a character's words word for word (it would be matched by copying, not by reading)
    const norm = (x) => words(x).join(' ');
    const quotes = s.paras.flatMap((p) => (p.t.match(/"[^"]*"/g) || []).map(norm));
    vs.forEach((v) => { if (quotes.some((q) => q.includes(norm(v)) || norm(v).includes(q))) f.push(`${tag}: the view "${v}" repeats a character's words`); });
    if (new Set(vs).size !== 4 || vs.some((x) => x.length > 48)) f.push(`${tag}: four different views of 48 letters or fewer`);
    if (words(text).length < 75 || words(text).length > 130) f.push(`${tag}: ${words(text).length} words (75 to 130)`);
    noModel(tag, text);
  });
  // ---- scripts
  const S = b.scripts || [];
  if (S.length < 14) f.push('scripts: fewer than 14 plays');
  const VW = b.voiceWords || [];
  S.forEach((s) => {
    const tag = `script "${s.id}"`, names = s.cast.map((c) => c.name);
    if (s.cast.length !== 3 || new Set(s.cast.map((c) => c.word)).size !== 3 || s.cast.some((c) => !VW.includes(c.word))) f.push(`${tag}: not three characters with three different voice words of the list`);
    if (s.notFit.length < 2 || s.notFit.some((w) => !VW.includes(w) || s.cast.some((c) => c.word === w))) f.push(`${tag}: not two voice words that fit nobody`);
    s.cast.forEach((c) => { if (!c.proof.length || c.proof.some((i) => !s.lines[i] || s.lines[i].who !== c.name)) f.push(`${tag}: ${c.name}'s voice is not shown by ${c.name}'s own lines`); if (s.lines.filter((l) => l.who === c.name).length < 2) f.push(`${tag}: ${c.name} has fewer than two lines`); });
    s.lines.forEach((l, i) => { if (l.who !== 'Narrator' && !names.includes(l.who)) f.push(`${tag}: line ${i + 1} has a speaker not in the cast`); if (/"/.test(l.text)) f.push(`${tag}: a line of a play holds quotation marks`); noStraightDash(tag, l.text); });
    if (!s.lines.some((l) => l.who === 'Narrator')) f.push(`${tag}: no narrator`);
    for (const c of s.cast.slice(0, 1)) if (!s.next[c.name] || rowsNeeded(s.next[c.name], c.name.toUpperCase() + ':', '') > 1) f.push(`${tag}: the next line of ${c.name} is missing or longer than one row`);
    const n = words(s.lines.map((l) => l.text).join(' ')).length; if (n < 75 || n > 115) f.push(`${tag}: ${n} words (75 to 115)`);
    // the voice word is never printed in the play (the child finds the voice from what the character says and does)
    // nor a form of it (calm and calmly, grumpy and grumpily: a direction that says (calmly) hands over the answer)
    const formsOf = (w) => [w, w + 'ly', ...(w.endsWith('y') ? [w.slice(0, -1) + 'ily'] : [])];
    const prints = (w) => s.lines.some((l) => formsOf(w).some((x) => hasWord(l.text, x)));
    s.cast.forEach((c) => { if (prints(c.word)) f.push(`${tag}: the play prints the voice word "${c.word}" or a form of it`); });
    s.notFit.forEach((w) => { if (prints(w)) f.push(`${tag}: the play prints the voice word "${w}" or a form of it`); });
    noModel(tag, s.lines.map((l) => l.text).join(' '));
  });
  // ---- tales
  const TL = b.tales || [];
  if (TL.length < 5) f.push('tales: fewer than five tales');
  TL.forEach((t) => {
    const tag = `tale "${t.id}"`;
    if (t.versions.length !== 3) f.push(`${tag}: not three versions`);
    t.versions.forEach((v, i) => { const n = words(v.text).length; if (n < 100 || n > 130) f.push(`${tag} version ${i + 1}: ${n} words (100 to 130)`); if ((v.text.match(/"/g) || []).length % 2) f.push(`${tag} version ${i + 1}: a quotation mark has no partner`); noModel(tag, v.text);
      for (const k of KINDS) if (!v.notes[k] || v.notes[k].length > 44) f.push(`${tag} version ${i + 1}: the note ${k} is missing or longer than 44 letters`);
      if (!v.diff || !v.diff.setting || !lower(v.diff.setting).includes(lower(v.notes.setting)) || Object.keys(v.diff).length !== 1) f.push(`${tag} version ${i + 1}: no clause of the setting that holds its note`);
      if (!v.like) f.push(`${tag} version ${i + 1}: no reason to like it`); });
    const all = [...t.facts, ...t.neither.map((x) => ({ ...x, in: [] }))];
    all.forEach((fa) => {
      const ft = `${tag} fact "${fa.text}"`;
      if (!KINDS.includes(fa.kind)) f.push(`${ft}: no kind`);
      if (!/^[A-Z].*\.$/.test(fa.text) || fa.text.length > 48) f.push(`${ft}: no sentence of 48 letters or fewer`);
      if (/^(neither|both)\b/i.test(fa.text)) f.push(`${ft}: starts with an answer word`);
      [0, 1, 2].forEach((vi) => {
        const vt = t.versions[vi].text, inV = fa.in.includes(vi);
        if (inV && (!fa.proof || !fa.proof[vi] || !vt.includes(fa.proof[vi]))) f.push(`${ft}: no proof sentence in version ${vi + 1}`);
        if (!inV) { const keys = fa.keys || fa.absent || [], denied = fa.not && fa.not[vi] && vt.includes(fa.not[vi]);
          if (!denied && (!keys.length || keys.some((k) => hasWord(vt, k)))) f.push(`${ft}: version ${vi + 1} names a key word of it and no sentence of that version says otherwise`); }
      });
    });
    if (new Set(all.map((x) => x.text)).size !== all.length) f.push(`${tag}: a fact stands twice`);
  });
  // every pair gives each level its page; and every Both fact of a pair is said in both versions (checked above)
  // ---- talk
  const TK = b.talk || [];
  if (TK.length < 14) f.push('talk: fewer than 14 tiny stories');
  const STEMRE = /^(I agree with [A-Z][a-z]+ because |I want to add that |I see it another way: )/;
  TK.forEach((t) => {
    const tag = `talk "${t.id}"`, n = words(t.text).length;
    if (n < 30 || n > 55) f.push(`${tag}: ${n} words (30 to 55)`);
    noModel(tag, t.text);
    const nm = [...t.chars];
    const names = [...t.comments.map((c) => c.name), t.own.name];
    if (new Set(names).size !== 4) f.push(`${tag}: two commenters share a name`);
    const kinds = new Set();
    t.comments.forEach((c, i) => {
      const ct = `${tag} comment ${i + 1}`;
      if (!/^I think /.test(c.says) || !/\.$/.test(c.says)) f.push(`${ct}: the comment does not start with I think`);
      for (const r of [c.right, ...c.wrong]) { if (!STEMRE.test(r)) f.push(`${ct}: the reply "${r}" does not start with a talk stem`); if (r.length > 76) f.push(`${ct}: the reply "${r.slice(0, 30)}..." is longer than 76 letters`); noModel(ct, r); }
      kinds.add((c.right.match(STEMRE) || ['', '?'])[1].slice(0, 6));
      // the agree stem names the child who made the comment
      for (const r of [c.right, ...c.wrong]) { const m = r.match(/^I agree with ([A-Z][a-z]+)/); if (m && m[1] !== c.name) f.push(`${ct}: "${r}" agrees with someone who did not speak`); }
      // a wrong reply changes the subject: it shares no word with the comment, nor with the right reply's own words
      c.wrong.forEach((w) => { const cw = content(w.replace(STEMRE, '')); const hit = cw.filter((x) => content(c.says).includes(x)); if (hit.length) f.push(`${ct}: the wrong reply "${w}" shares "${hit.join(', ')}" with the comment`); });
      if (c.wrong.length !== 2 || new Set([c.right, ...c.wrong]).size !== 3) f.push(`${ct}: not three different replies`);
      // level 3's near reply (SHOULD 21): a reply with a stem about the story that shares no word with the comment but the
      // names of the story and of the child who spoke (it does not take up the idea), and is none of the other replies
      { const r = c.near || '', nameW = [...t.chars, c.name].map((x) => stemOf(lower(x)));
        if (!STEMRE.test(r) || r.length > 76 || [c.right, ...c.wrong].includes(r)) f.push(`${ct}: no near reply with a talk stem of 76 letters or fewer`);
        const m = r.match(/^I agree with ([A-Z][a-z]+)/); if (m && m[1] !== c.name) f.push(`${ct}: the near reply agrees with someone who did not speak`);
        const hit = content(r.replace(STEMRE, '')).filter((x) => content(c.says).includes(x) && !nameW.includes(x)); if (hit.length) f.push(`${ct}: the near reply "${r}" shares "${hit.join(', ')}" with the comment`);
        noModel(ct, r); }
      // no reply is told by one surface feature: if the right one names a character of the story, so does a wrong one of
      // level 1; if it names the child who spoke, so does the wrong one of level 1
      const namesChar = (r) => nm.some((x) => hasWord(r.replace(STEMRE, ''), x));
      if (namesChar(c.right) && !namesChar(c.wrong[0])) f.push(`${ct}: the right reply is the only one that names a character`);
      if (/^I agree with/.test(c.right) && !/^I agree with/.test(c.wrong[0])) f.push(`${ct}: the right reply is the only one of level 1 that names the child who spoke`);
    });
    if (kinds.size !== 3) f.push(`${tag}: the right replies do not use the three stems`);
    if (!/^I think /.test(t.own.says) || !STEMRE.test(t.own.sample) || rowsNeeded(t.own.sample) > 2) f.push(`${tag}: the fourth comment or its sample is not a comment and a reply with a stem of two rows`);
    const printed = t.comments.flatMap((c) => [c.says, c.right, ...c.wrong]);
    if (printed.some((p) => { const a = content(p), s2 = content(t.own.sample.replace(STEMRE, '')); return s2.length && s2.filter((x) => a.includes(x)).length / s2.length > 0.6; })) f.push(`${tag}: the sample of the fourth comment is printed on the page`);
  });
  // ---- club
  const CL = b.club || [];
  if (CL.length < 14) f.push('club: fewer than 14 model talks');
  CL.forEach((m, i) => {
    const tag = `club ${i + 1}`;
    if (m.lines.length !== 3 || !/^I think /.test(m.lines[0].text) || !STEMRE.test(m.lines[1].text) || !STEMRE.test(m.lines[2].text)) f.push(`${tag}: not an idea and two replies with stems`);
    const ag = m.lines[1].text.match(/^I agree with ([A-Z][a-z]+)/); if (ag && ag[1] !== m.lines[0].name) f.push(`${tag}: the reply agrees with someone who did not speak first`);
    if (m.lines.some((l) => l.text.length > 80)) f.push(`${tag}: a line longer than 80 letters`);
    if (/^[A-Z]/.test(m.about) || m.about.length > 50) f.push(`${tag}: the model story is not described in a few words`);
    // the model story is none of the stories of these pages: no title of a story, dialogue, play, tale, or talk has all its
    // words in what the model is about (the snow fort of a model and the play "The Snow Fort" were one topic)
    const titles = [...A.map((s) => s.title), ...V.map((s) => s.title), ...S.map((s) => s.title), ...TK.map((t) => t.title), ...TL.map((t) => t.tale)];
    const aw = content(m.about);
    titles.forEach((u) => { const tw = content(u); if (tw.length && tw.every((x) => aw.includes(x))) f.push(`${tag}: the model story is about "${u}" of another page`); });
  });
  // ---- modelOnly words are on no page (checked by noModel above); every level of every page can be drawn
  // and over copies 1 to 20 (the seeds 2 to 21 a page uses), counted per level: every row kind of the chart of G2-580
  // gets more than one answer (ruling B), and the right choice is not told by its length or its place (ruling C)
  if (!f.length) for (const mode of Object.keys(LEVELS)) for (const lv of [1, 2, 3]) {
    const pages = [];
    for (let v = 1; v <= 21; v++) {
      try { const P = plan(b, mode, lv, makeRng('scg2|' + mode + '|' + lv + '|' + v), v); if (v > 1) pages.push(P); } catch (e) { f.push(`${mode} level ${lv} seed ${v} cannot be drawn: ${e.message}`); break; }
    }
    if (pages.length < 20) continue;
    if (mode === 'versions') for (const k of KINDS) { const st = new Set(pages.flatMap((P) => P.rows.filter((x) => x.kind === k).map((x) => x.status))); if (st.size < 2) f.push(`versions level ${lv}: the ${k} row always takes one answer (${[...st].join()})`); }
    const rows = mode === 'arc' ? pages.flatMap((P) => P.qs) : (mode === 'script' && lv > 1) || mode === 'build' ? pages.flatMap((P) => P.rows) : [];
    if (rows.length) {
      const n = rows.length, longest = rows.filter((r) => r.opts.every((o) => o === r.right || o.length < r.right.length)).length, shortest = rows.filter((r) => r.opts.every((o) => o === r.right || o.length > r.right.length)).length;
      const at = {}; rows.forEach((r) => { const i = r.opts.indexOf(r.right); at[i] = (at[i] || 0) + 1; });
      // two choices: the right one is the longer in 30 to 70 % of the rows; three or more: the longest in at most half and
      // the shortest in at most half; no place holds it in more than half the rows (60 % with two places)
      const m = Math.min(...rows.map((r) => r.opts.length));
      if (m === 2 ? longest < 0.3 * n || longest > 0.7 * n : longest > n / 2 || shortest > n / 2) f.push(`${mode} level ${lv}: over the copies the right choice is the longest in ${longest} and the shortest in ${shortest} of ${n} rows`);
      if (Object.values(at).some((c) => c > (m === 2 ? 0.6 : 0.5) * n) || Object.keys(at).length < m) f.push(`${mode} level ${lv}: over the copies the right choice stands in one place too often (${JSON.stringify(at)})`);
    }
  }
  return f;
}

// ------------------------------------------------------------------ what a page holds
/** copy v takes item v of a fixed order of a pool (the same order on every level): copies step through the bank */
const orderOf = (pool, key) => makeRng('scg2-order|' + key).shuffle(pool.map((x, i) => i));
const stepOf = (pool, key, v, shift = 0) => { const o = orderOf(pool, key); return pool[o[(Math.max(1, v) - 1 + shift) % o.length]]; };
const ARC_SHIFT = 7;   // G2-577 copy n prints another story than G2-576 copy n
function plan(b, mode, lv, rng, v) {
  const d = LEVELS[mode][lv];
  v = Number(v) || rng.int(1, 20);
  if (mode === 'arc') {
    const s = stepOf(b.arc, 'arc', v);
    for (let t = 0; t < 2000; t++) {
      const used = new Set(), take = (list) => { const c = shuffle(list.filter((e) => !used.has(e.text)), rng)[0]; if (c) used.add(c.text); return c; };
      const evs = (p, tg) => s.ev.filter((e) => e.p === p && (!tg || e.tag === tg));
      // level 1: a wrong problem of the middle and one of the ending, a wrong solution of the middle and one of the
      // beginning; levels 2 and 3 (ruling C): a wrong choice of the SAME part as the right one, so the label of a part
      // gives nothing away (a beginning event that is not the problem; an ending event that is not the solution)
      const qs = d.qs.map((q) => {
        if (q === 'problem') { const m = take(d.near ? evs('m', 'near') : evs('m').filter((e) => e.tag !== 'near')), o = take(lv === 1 ? evs('e') : evs('b').filter((e) => e.tag !== 'react')); return { q, right: s.problem.text, wrong: [m, o] }; }
        const m = take(evs('m', 'attempt')), o = take(lv === 1 ? evs('b') : evs('e').filter((e) => e.tag !== 'sol')); return { q, right: s.solution.text, wrong: [m, o] };
      });
      if (qs.some((q) => q.wrong.some((x) => !x))) continue;
      qs.forEach((q) => { q.wrong = q.wrong.map((x) => x.text); });
      const at = places(qs.length, 3, rng);
      qs.forEach((q, i) => { const o = shuffle(q.wrong, rng); o.splice(at[i], 0, q.right); q.opts = o; });
      if (!lengthOk(qs)) continue;
      // the sentences to sort: events not printed as a choice, one of each part at least; levels 2 and 3 also say where
      // we first meet a character ("We meet Omar."): the character named first in that part
      const free = s.ev.filter((e) => !used.has(e.text));
      const parts = shuffle(['b', 'm', 'e'], rng), pick = [];
      for (const p of parts.slice(0, d.events)) { const c = shuffle(free.filter((e) => e.p === p), rng)[0]; if (c) pick.push(c); }
      if (pick.length < d.events) continue;
      const strips = pick.map((e) => ({ text: e.text, want: e.p.toUpperCase(), id: e.p + e.i }));
      // the sentence about whom we first meet takes the part no event took (level 3), or any part (level 2)
      const MEET = { b: [s.who.right, 'B'], m: [s.who.wrong[0], 'M'], e: [s.who.wrong[1], 'E'] };
      if (d.meets) { const [n, p] = MEET[d.events < 3 ? parts[2] : parts[rng.int(0, 2)]]; strips.push({ text: `We first meet ${n}.`, want: p, id: 'meet-' + p }); }
      if (d.notIn) strips.push({ text: s.notIn.text, want: 'X', id: 'x' });
      const order = shuffle(strips, rng), seq = order.map((x) => x.want);
      const idx = seq.map((w) => 'BMEX'.indexOf(w));
      if (!placesOk(idx, d.notIn ? 4 : 3) || seq.join('') === 'BME') continue;
      return { mode, lv, s, qs, strips: order, list: ['arc:' + s.id, ...qs.map((q) => q.q + ':' + q.opts.join('/')), ...order.map((x) => 'strip:' + s.id + ':' + x.id + '=' + x.want)] };
    }
    throw new Error('no page for the story ' + s.id);
  }
  if (mode === 'arcwrite') {
    const s = stepOf(b.arc, 'arc', v, ARC_SHIFT);
    const variant = d.kind === 'open' ? (v % 2 ? 'end' : 'begin') : null;
    return { mode, lv, s, variant, list: ['arcwrite:' + s.id, 'variant:' + (variant || d.kind)] };
  }
  if (mode === 'voices') {
    const s = stepOf(b.voices, 'voices', v);
    const elig = s.paras.map((p, i) => ({ ...p, i })).filter((p) => p.who && d.forms.includes(p.form));
    const letters = Object.fromEntries(s.chars.map((c) => [c, initialOf(c)]));
    for (let t = 0; t < 4000; t++) {
      const pick = shuffle(elig, rng).slice(0, d.lines).sort((a, c) => a.i - c.i);
      if (pick.length < d.lines) break;
      const seq = pick.map((p) => letters[p.who]);
      if (!seqOk(seq, lv === 1 ? 2 : 3)) continue;
      if (lv === 3 && !pick.some((p) => p.form === 'beat')) continue;
      if (lv >= 2 && !pick.some((p) => p.form === 'before')) continue;
      const shown = s.chars.slice(0, d.views);
      const views = shuffle([...shown.map((c) => ({ text: s.views[c].text, want: letters[c] })), { text: s.nobody.text, want: 'X' }], rng);
      if (views.map((x) => x.want).join('') === [...shown.map((c) => letters[c]), 'X'].join('')) continue;
      return { mode, lv, s, letters, pick, views, list: ['voices:' + s.id, ...pick.map((p) => s.id + ':line' + p.i), ...views.map((x) => 'view:' + x.text)] };
    }
    throw new Error('no mixed speakers for the story ' + s.id);
  }
  if (mode === 'script') {
    const s = stepOf(b.scripts, 'script', v);
    const cast = s.cast.slice(0, d.chars);
    for (let t = 0; t < 2000; t++) {
      // level 1 (ruling F): each character's word beside a word that fits nobody, another one in each row, in two places,
      // so no row is solved by crossing out the word of the row before
      const at = d.opts === 2 ? places(cast.length, 2, rng) : places(cast.length, 3, rng);
      const nfs = shuffle(s.notFit, rng);
      const rows = cast.map((c, i) => {
        const other = s.cast.filter((x) => x !== c)[rng.int(0, 1)].word, nf = s.notFit[rng.int(0, s.notFit.length - 1)];
        const wrong = d.opts === 2 ? [nfs[i]] : [other, nf];
        const o = shuffle(wrong, rng); o.splice(at[i], 0, c.word); return { name: c.name, right: c.word, opts: o };
      });
      if (d.opts === 3 && !lengthOk(rows)) continue;
      return { mode, lv, s, rows, list: ['script:' + s.id, ...rows.map((r) => r.name + ':' + r.opts.join('/'))] };
    }
    throw new Error('no page for the play ' + s.id);
  }
  if (mode === 'versions') {
    const pr = stepOf(PAIRS, 'pairs', v);
    // ruling B: a row of the chart whose facts in this pair are all Both is not printed (its answer would always be Both)
    const fs = factsOf(pr), told = fs.filter((x) => x.status !== 'Neither');
    const kindsOk = KINDS.filter((k) => told.some((x) => x.kind === k && x.status !== 'Both'));
    const inPair = told.filter((x) => kindsOk.includes(x.kind)), nei = fs.filter((x) => x.status === 'Neither' && kindsOk.includes(x.kind));
    for (let t = 0; t < 6000; t++) {
      const pick = [];
      for (const k of KINDS) { const c = shuffle(inPair.filter((x) => x.kind === k), rng)[0]; if (c) pick.push(c); }
      for (const st of ['V1', 'V2', 'Both']) if (!pick.some((x) => x.status === st)) { const c = shuffle(inPair.filter((x) => x.status === st && !pick.includes(x)), rng)[0]; if (c) pick.push(c); }
      while (pick.length < d.facts) { const c = shuffle(inPair.filter((x) => !pick.includes(x)), rng)[0]; if (!c) break; pick.push(c); }
      if (pick.length !== d.facts) continue;
      if (d.neither) { const c = shuffle(nei, rng)[0]; pick.push(c); }
      const rows = KINDS.flatMap((k) => shuffle(pick.filter((x) => x.kind === k), rng));
      const p = rows.map((x) => SIDX[x.status]);
      if (!placesOk(p, d.neither ? 4 : 3)) continue;
      if (['V1', 'V2', 'Both'].some((st) => !rows.some((x) => x.status === st))) continue;
      return { mode, lv, pr, rows, list: ['pair:' + pr.id, ...rows.map((x) => 'fact:' + x.id + '=' + x.status)] };
    }
    throw new Error('no chart for the pair ' + pr.id);
  }
  if (mode === 'compare') {
    const pr = stepOf(PAIRS, 'pairs', v);
    const fs = factsOf(pr), both = fs.filter((x) => x.status === 'Both' && x.clause);
    const V = [pr.t.versions[pr.x], pr.t.versions[pr.y]];
    // the difference is a row of the chart (SHOULD 19): the problem or the ending row whose two notes differ; when both
    // rows say the same, where it happens (the setting note in a clause). Of the things both versions tell and the rows
    // that differ, the page takes a pair whose sample needs the fewest writing rows (so the page keeps its 18 px print),
    // the copies cycling through the pairs that tie
    const kinds = ['problem', 'ending'].filter((k) => V[0].notes[k] !== V[1].notes[k]);
    const diffOf = (k) => (k === 'setting' ? [V[0].diff.setting, V[1].diff.setting] : [V[0].notes[k], V[1].notes[k]]);
    const cands = both.flatMap((bf) => (kinds.length ? kinds : ['setting']).map((k) => { const [d1, d2] = diffOf(k); return { bf, k, d1, d2, rows: rowsNeeded(`In both versions, ${bf.clause}. In Version 1, ${d1}, but in Version 2, ${d2}.`) }; }));
    const least = Math.min(...cands.map((c) => c.rows)), ties = cands.filter((c) => c.rows === least);
    const { bf, k: kind, d1, d2 } = ties[(v * 7) % ties.length];
    const pickV = v % 2 ? 1 : 2;
    return { mode, lv, pr, V, bothFact: bf, diffKind: kind, d1, d2, pickV, list: ['pair:' + pr.id, 'both:' + bf.text, 'diff:' + kind, 'like:' + pickV] };
  }
  if (mode === 'build') {
    const t = stepOf(b.talk, 'talk', v);
    for (let k = 0; k < 2000; k++) {
      // level 3 takes two of the three comments (it also asks for a reply of the child's own)
      const idx = d.comments < 3 ? shuffle([0, 1, 2], rng).slice(0, d.comments).sort((a, c) => a - c) : [0, 1, 2];
      const at = places(idx.length, d.replies, rng);
      // level 3 (SHOULD 21): one wrong reply changes the subject, the other is about the story but does not build on the idea
      const rows = idx.map((ci, i) => { const c = t.comments[ci]; const o = shuffle(d.own ? [shuffle(c.wrong, rng)[0], c.near] : c.wrong.slice(0, d.replies - 1), rng); o.splice(at[i], 0, c.right); return { ...c, ci, opts: o }; });
      if (!lengthOk(rows)) continue;
      return { mode, lv, t, rows, list: ['talk:' + t.id, ...rows.map((r) => r.name + ':' + r.opts.length)] };
    }
    throw new Error('no page for the talk ' + t.id);
  }
  if (mode === 'card') {
    const m = stepOf(b.club, 'club', v);
    return { mode, lv, m, list: ['club:' + m.about] };
  }
  throw new Error('stories-compare-g2: no plan for ' + mode);
}

{ const f = scFaultsOf(BANK); if (f.length) throw new Error('stories-compare-g2.en.json: ' + f.join('; ')); }

// ------------------------------------------------------------------ the parts of a page
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';
/** an f before i, f, or l touches the next letter even with ligatures off: it gets room of its own (never inside an svg) */
function fRoom(html) {
  let out = '', i = 0, inSvg = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); const tag = html.slice(i, j + 1); if (/^<svg\b/i.test(tag)) inSvg++; else if (/^<\/svg>/i.test(tag)) inSvg--; out += tag; i = j + 1; continue; }
    const j = html.indexOf('<', i), t = html.slice(i, j < 0 ? html.length : j);
    out += inSvg ? t : t.replace(/f(?=[ifl])/g, '<span data-lcs-fsep style="margin-right:0.07em">f</span>');
    i = j < 0 ? html.length : j;
  }
  return out;
}
/** typographic apostrophes and quotation marks in the TEXT of a page or a key (never in a tag or an attribute) */
function typo(html) {
  let out = '', i = 0, prev = ' ';
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    let t = '';
    const chars = [...text.replace(/&quot;/g, '"').replace(/&#39;/g, "'")];
    // a mark opens after a space, a bracket, or at the start of a text whose next letter follows it (a key's answer on its
    // row starts a new text after a starter); otherwise it closes
    chars.forEach((ch, k) => {
      if (ch === "'") t += AP;
      else if (ch === '"') t += /[\s([—]/.test(prev) || (k === 0 && /[A-Za-z0-9]/.test(chars[1] || '')) ? '“' : '”';
      else t += ch;
      prev = ch;
    });
    out += t;
    i = j < 0 ? html.length : j;
  }
  return out;
}
const GROW = 'flex:1 1 auto;justify-content:space-evenly';
const card = (attrs, inner, pad = 7, gap = 5, more = '') => `<div ${attrs} data-lcs-card style="position:relative;display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;box-sizing:border-box;${more}">${inner}</div>`;
const label = (k, html, note = '') => `<div data-lcs-label data-lcs-read style="position:relative;font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${k ? `<span data-lcs-labelnum style="color:${T.teal}">${k}.</span> ` : ''}${html}${note}</div>`;
/** the key's note: it stands at the right end of a part's row to spare (it takes no room; the page of the child has none) */
const keyNote = (key, text) => (key && text ? `<span data-lcs-keynote style="position:absolute;right:4px;bottom:${(ROW - BASE_Y - 2.5).toFixed(1)}px;font:700 13px/1.05 'Nunito',sans-serif;color:${T.coral};white-space:normal;text-align:right">${esc(text)}</span>` : '');
const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
/** a writing row; the key seats its answer on it in teal */
const rowEl = (w, answer, key, attrs = '') => {
  const base = rowSvg(w, ROW);
  const shown = key && answer ? seatOnRow(base, answer, { fill: T.teal }) : base;
  return `<div data-lcs-line${key && answer ? ` data-lcs-answer="${A(answer)}"` : ''} ${attrs} style="line-height:0;flex:0 0 auto">${shown}</div>`;
};
/** a row with a frame or a starter: the words stand on the base rule (left: start, right: end), the child writes between */
function rowOf(r, answer, key) {
  if (!r.start && !r.end) return `<div data-lcs-wrow style="width:${r.w}px">${rowEl(r.w, answer, key)}</div>`;
  const sw = startW(r.start), ew = endW(r.end), mid = r.w - sw - ew;
  const span = (t, attr, width, padL, padR) => `<span ${attr} data-lcs-read style="flex:0 0 auto;width:${width}px;box-sizing:border-box;white-space:nowrap;font:700 ${START_PX}px/${START_PX}px 'Nunito',sans-serif;color:${T.ink};padding:${START_PAD}px ${padR}px 0 ${padL}px">${esc(t)}</span>`;
  return `<div data-lcs-wrow data-lcs-framed${r.end ? ' data-lcs-hasend' : ''} style="display:flex;align-items:flex-start;width:${r.w}px">` + (r.start ? span(r.start, 'data-lcs-start', sw, 4, 10) : '') + rowEl(mid, answer, key) + (r.end ? span(r.end, 'data-lcs-end', ew, 2, 8) : '') + `</div>`;
}
/** a slot: one answer on its rows (the first carries a frame's start, the last its end mark, so a sample that runs on
 *  ends where the mark stands); the key spreads the sample over them */
function slotRows(text, first, w = FULLW) {
  for (let n = 1; n <= 6; n++) { const rows = slotShape(n, first && first[0], first && first[1], w); const s = spread(text, capsOf(rows)); if (s) return { rows, lines: s }; }
  throw new Error(`the sample "${text}" does not fit six rows`);
}
function slotHtml(text, first, key, w = FULLW, attrs = '') {
  const { rows, lines } = slotRows(text, first, w);
  return `<div data-lcs-slot data-lcs-expect="${A(text)}" ${attrs} style="display:flex;flex-direction:column">${rows.map((r, i) => rowOf(r, lines[i], key)).join('')}</div>`;
}
/** a writing part: a head (optional), its slots, and rows to spare (no answer on the key; the key's note, if any, at the
 *  right end of the last one) */
const partHtml = (inner, spare, w = FULLW, attrs = '', note = '') => `<div data-lcs-part ${attrs} style="display:flex;flex-direction:column;gap:0">${inner}${Array.from({ length: spare }, (_, i) => `<div data-lcs-spare style="position:relative">${rowEl(w, null, false)}${i === spare - 1 ? note : ''}</div>`).join('')}</div>`;
/** a check box; the key never ticks the child's own checklist */
const tickBox = () => `<span data-lcs-tick style="flex:0 0 auto;display:inline-block;width:28px;height:28px;box-sizing:border-box;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF"></span>`;
const checklist = (items) => `<div data-lcs-checklist style="display:grid;grid-template-columns:1fr 1fr;gap:6px 16px">${items.map((t) => `<div data-lcs-checkitem style="display:flex;align-items:center;gap:8px">${tickBox()}<span data-lcs-read style="font:700 ${READ}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span></div>`).join('')}</div>`;
/** something to circle (the key rings the right one) */
const pill = (text, ok, key, font = CHOICE) => `<span data-lcs-pill data-lcs-opt="${A(text)}"${ok ? ' data-lcs-ok="1"' : ''} style="display:inline-block;flex:0 0 auto;font:700 ${font}px/1.16 'Nunito',sans-serif;color:${T.ink};padding:0 11px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
/** a box for one letter; the key writes the letter in it */
const box1 = (want, key) => `<span data-lcs-box data-lcs-want="${want}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${BOX}px;height:${BOX}px;box-sizing:border-box;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF;font:800 26px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(want) : ''}</span>`;
const stemsBox = (extra = '') => `<div data-lcs-card data-lcs-stems style="display:flex;flex-direction:column;gap:3px;padding:5px 12px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF"><div style="display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px"><span data-lcs-read style="font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.teal}">Talk stems:</span>${STEM_TEXT.map((x) => `<span data-lcs-stem data-lcs-read style="font:700 ${READ}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 8px;border-radius:999px;background:${T.tealSoft}">${esc(x)}</span>`).join('')}</div>${extra}</div>`;

// ------------------------------------------------------------------ the blocks of each page
const PARTNAME = { b: 'Beginning', m: 'Middle', e: 'Ending' };
/** a story in its three parts; each part starts with its name in a teal tag (the story arc) */
function storyCard(s, parts, font = PASSAGE, lh = 1.34) {
  return `<div data-lcs-card data-lcs-story="${A(s.id)}" style="display:flex;flex-direction:column;gap:2px;padding:4px 14px 6px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div data-lcs-stitle style="font:700 21px/1.15 'Baloo 2',cursive;color:${T.ink}">${esc(s.title)}</div>` +
    parts.map((p) => `<div data-lcs-part-of-story="${p}" style="font:700 ${font}px/${lh} 'Nunito',sans-serif;color:${T.ink}"><span data-lcs-partlabel style="display:inline-block;margin-right:7px;padding:0 6px;border-radius:6px;background:${T.tealSoft};font:800 15.5px/1.35 'Nunito',sans-serif;color:${T.teal};letter-spacing:0.4px">${PARTNAME[p].toUpperCase()}</span><span data-lcs-passage data-lcs-read>${esc(s[p].join(' '))}</span></div>`).join('') + `</div>`;
}
function render(P, key) {
  const b = [], lv = P.lv;
  const L = { ...LAY[P.mode][lv], pf: fitPf(P) };
  if (P.mode === 'arc') {
    b.push(storyCard(P.s, ['b', 'm', 'e'], L.pf, L.plh));
    b.push(card('data-lcs-task="ask"', label(1, LINES.ask) + `<div style="display:flex;flex-direction:column;gap:4px;${GROW}">` + P.qs.map((q, i) =>
      `<div data-lcs-item data-lcs-q="${q.q}" data-lcs-right="${A(q.right)}" style="display:flex;flex-direction:column;align-items:flex-start;gap:0;padding:1px 8px 2px;border-radius:12px;background:#FFFFFF"><span data-lcs-qtext data-lcs-read style="font:700 ${READ}px/1.2 'Nunito',sans-serif;color:${T.ink}">${teal('ab'[i] + '.')} ${esc(LINES.q[q.q])}</span>` +
        `<div data-lcs-opts style="display:flex;flex-direction:column;gap:0;padding-left:18px">${q.opts.map((o) => pill(o, o === q.right, key)).join('')}</div></div>`).join('') + `</div>`, 6, 4, 'flex:1 1 auto'));
    b.push(card('data-lcs-task="sort"', label(2, LINES.sort[lv]) + `<div style="display:flex;flex-direction:column;gap:1px;${GROW}">` +
      P.strips.map((x) => `<div data-lcs-item data-lcs-strip="${x.id}" data-lcs-want="${x.want}" style="display:flex;align-items:center;gap:10px;padding:0 8px;border-radius:12px;background:#FFFFFF">${box1(x.want, key)}<span data-lcs-striptext data-lcs-read style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x.text)}</span></div>`).join('') + `</div>`, 6, 4, 'flex:1 1 auto'));
  }
  if (P.mode === 'arcwrite') {
    const s = P.s, fr = s.frames, kind = LEVELS.arcwrite[lv].kind, cards = [], nw = keyNote(key, NOTE.words);
    // one row to spare in each box (the opinion pages of Grade 2 do the same)
    if (kind === 'frames') {
      cards.push(card('data-lcs-task="begin"', label(1, LINES.begin[1]) + partHtml(['who', 'where', 'problem'].map((k) => slotHtml(fr[k] + (FRAME[k][1] ? '' : '.'), FRAME[k], key, FULLW, `data-lcs-frame="${k}"`)).join(''), 1, FULLW, '', nw), 6, 2, GROW));
      cards.push(card('data-lcs-task="end"', label(2, LINES.end[1]) + partHtml(slotHtml(fr.solved + '.', FRAME.solved, key, FULLW, 'data-lcs-frame="solved"'), 1, FULLW, '', nw), 6, 2, GROW));
    } else if (kind === 'starters') {
      cards.push(card('data-lcs-task="begin"', label(1, LINES.begin[2]) + partHtml(slotHtml(`${fr.who} ${fr.where}.`, [START.begin, ''], key, FULLW, 'data-lcs-frame="begin"') + slotHtml(fr.problem + '.', [START.problem, ''], key, FULLW, 'data-lcs-frame="problem"'), 1, FULLW, '', nw), 6, 2, GROW));
      cards.push(card('data-lcs-task="end"', label(2, LINES.end[2]) + partHtml(slotHtml(fr.solved + '.', [START.end, ''], key, FULLW, 'data-lcs-frame="end"'), 1, FULLW, '', nw), 6, 2, GROW));
    } else {
      const qa = P.variant === 'end' ? [['beginQ', s.beginSample], ['newEnd', s.newEnding]] : [['newBegin', s.newBeginning], ['endQ', s.endSample]];
      qa.forEach(([q, smp], i) => cards.push(card(`data-lcs-task="${q}"`, label(i + 1, esc(LINES.open[q])) + partHtml(slotHtml(smp, null, key, FULLW, `data-lcs-frame="${q}"`), 1, FULLW, '', keyNote(key, NOTE.open[q])), 6, 2, GROW)));
    }
    const pf = fitPf(P, (cards.join('').match(/data-lcs-line[ >]/g) || []).length);
    b.push(storyCard(s, P.variant === 'begin' ? ['m', 'e'] : ['b', 'm', 'e'], pf, L.plh), ...cards);
  }
  if (P.mode === 'voices') {
    const s = P.s, num = Object.fromEntries(P.pick.map((p, k) => [p.i, k + 1]));
    const mark = (n) => `<span data-lcs-mark="${n}" style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;margin:0 3px 0 1px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 14.5px/1 'Nunito',sans-serif;vertical-align:2px">${n}</span>`;
    // the marks are made typographic before the number goes in (a number before an opening mark would read it as a closing one)
    const para = (p, i) => { let h = typo(esc(p.t)); if (num[i]) h = h.replace('“', mark(num[i]) + '“'); return `<div data-lcs-para="${i}"${num[i] ? ` data-lcs-numbered="${num[i]}"` : ''} data-lcs-passage data-lcs-read style="font:700 ${L.pf}px/${L.plh} 'Nunito',sans-serif;color:${T.ink}">${h}</div>`; };
    b.push(`<div data-lcs-card data-lcs-story="${A(s.id)}" style="display:flex;flex-direction:column;gap:1px;padding:5px 14px 7px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div data-lcs-stitle style="font:700 22px/1.15 'Baloo 2',cursive;color:${T.ink}">${esc(s.title)}</div>${s.paras.map(para).join('')}</div>`);
    // ruling D: the box shows each way this level's numbered lines name a speaker, with an example on no page (the name in
    // teal); the page gives each speaker's letter
    const ways = `<div data-lcs-ways style="display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 16px;padding:2px 10px;border:2.5px solid ${T.teal};border-radius:12px;background:#FFFFFF">` +
      LEVELS.voices[lv].forms.map((fm) => `<span data-lcs-way="${fm}" data-lcs-read style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}"><b data-lcs-wayname style="font-weight:800">${esc(SPEAK[fm][0])}</b> ${typo(esc(SPEAK[fm][1])).replace(SPEAK_NAME, teal(SPEAK_NAME))}</span>`).join('') + `</div>`;
    const legend = `<div data-lcs-legend data-lcs-read style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${s.chars.map((c) => `${teal(P.letters[c])} = ${esc(c)}`).join(' &nbsp;·&nbsp; ')}</div>`;
    b.push(card('data-lcs-task="who"', label(1, esc(LINES.who)) + ways + legend + `<div style="display:flex;flex-wrap:wrap;gap:6px 18px;padding-left:4px">` +
      P.pick.map((p, k) => `<div data-lcs-item data-lcs-line-no="${k + 1}" data-lcs-para-of="${p.i}" style="display:flex;align-items:center;gap:6px"><span data-lcs-read style="font:800 ${READ}px/1 'Nunito',sans-serif;color:${T.teal}">${k + 1}</span>${box1(P.letters[p.who], key)}</div>`).join('') + `</div>`, 6, 4, GROW));
    // level 3 (four views) sets them two by two
    const grid = P.views.length > 3 ? 'display:grid;grid-template-columns:1fr 1fr;gap:4px 8px;align-content:space-evenly' : 'display:flex;flex-direction:column;gap:3px';
    b.push(card('data-lcs-task="views"', label(2, esc(LINES.views.replace('{ABOUT}', s.about))) + `<div style="${grid};${GROW}">` +
      P.views.map((x, k) => `<div data-lcs-item data-lcs-view="${k}" data-lcs-want="${x.want}" style="display:flex;align-items:center;gap:10px;padding:1px 8px;border-radius:12px;background:#FFFFFF">${box1(x.want, key)}<span data-lcs-read data-lcs-viewtext style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x.text)}</span></div>`).join('') + `</div>`, 6, 4, GROW));
  }
  if (P.mode === 'script') {
    const s = P.s;
    b.push(`<div data-lcs-card data-lcs-rulebox style="display:flex;flex-direction:column;gap:1px;padding:2px 12px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">${PLAY_RULES.map((r) => `<div data-lcs-ruletext data-lcs-read style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r)}</div>`).join('')}</div>`);
    const line = (l, i) => { const m = l.text.match(/^(\([^)]*\))\s*(.*)$/); const body = m ? `<i data-lcs-dir style="color:${T.inkSoft}">${esc(m[1])}</i> ${esc(m[2])}` : esc(l.text);
      return `<div data-lcs-sline="${i}" data-lcs-who="${A(l.who)}" data-lcs-passage data-lcs-read style="font:700 ${L.pf}px/${L.plh} 'Nunito',sans-serif;color:${T.ink}"><b data-lcs-sname style="font-weight:800;color:${T.teal}">${esc(l.who.toUpperCase())}:</b> ${body}</div>`; };
    // the title and the parts share a line when they fit (castInline, as the estimate of the play's height counts it)
    b.push(`<div data-lcs-card data-lcs-play="${A(s.id)}" style="display:flex;flex-direction:column;gap:1px;padding:5px 14px 7px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div style="display:flex;flex-wrap:wrap;align-items:baseline;column-gap:18px"><div data-lcs-stitle style="font:700 22px/1.15 'Baloo 2',cursive;color:${T.ink}">${esc(s.title)}</div>` +
      `<div data-lcs-cast data-lcs-read style="font:700 ${READ}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(castLine(s))}</div></div>${s.lines.map(line).join('')}</div>`);
    b.push(card('data-lcs-task="voice"', label(1, LINES.voice) + `<div style="display:flex;flex-direction:column;gap:3px;${GROW}">` +
      P.rows.map((r) => `<div data-lcs-item data-lcs-voice="${A(r.name)}" data-lcs-right="${r.right}" style="display:flex;align-items:center;gap:12px;padding:${L.rowPad || 2}px 8px;border-radius:12px;background:#FFFFFF"><span data-lcs-read style="flex:0 0 130px;font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(r.name)}</span><div data-lcs-opts style="display:flex;gap:14px">${r.opts.map((o) => pill(o, o === r.right, key, L.ch || CHOICE)).join('')}</div></div>`).join('') + `</div>`, 6, 4, GROW));
    if (LEVELS.script[lv].next) b.push(card('data-lcs-task="next"', label(2, esc(LINES.next.replace('{NAME}', s.cast[0].name))) + s.cast.slice(0, 1).map((c) => partHtml(slotHtml(s.next[c.name], [c.name.toUpperCase() + ':', ''], key, FULLW, `data-lcs-frame="next-${A(c.name)}"`), 1, FULLW, `data-lcs-nextof="${A(c.name)}"`, keyNote(key, NOTE.line(c.word)))).join(''), 6, 2, GROW));
    b.push(card('data-lcs-task="read"', label(LEVELS.script[lv].next ? 3 : 2, esc(LINES.read)) + checklist(READ_CHECK), 6, 5));
  }
  if (P.mode === 'versions') {
    const pr = P.pr, V = [pr.t.versions[pr.x], pr.t.versions[pr.y]];
    b.push(`<div data-lcs-card data-lcs-pair="${pr.id}" style="display:flex;flex-direction:column;gap:3px;padding:5px 12px 7px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div data-lcs-tale style="font:700 21px/1.15 'Baloo 2',cursive;color:${T.ink}">Two versions of ${esc(pr.t.tale)}</div>` +
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">${V.map((x, i) => `<div data-lcs-version="${i + 1}" style="display:flex;flex-direction:column;gap:1px"><span data-lcs-vhead style="font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.teal}">Version ${i + 1}</span><span data-lcs-passage data-lcs-read style="font:700 ${L.pf}px/${L.plh} 'Nunito',sans-serif;color:${T.ink}">${esc(x.text)}</span></div>`).join('')}</div></div>`);
    const OPTS = LEVELS.versions[lv].neither ? ['1', '2', 'Both', 'Neither'] : ['1', '2', 'Both'];
    const want = { V1: '1', V2: '2', Both: 'Both', Neither: 'Neither' };
    b.push(card('data-lcs-task="chart"', label(1, LINES.chart[lv]) + `<div data-lcs-chart style="display:flex;flex-direction:column;gap:4px;${GROW}">` +
      KINDS.filter((k) => P.rows.some((x) => x.kind === k)).map((k) => `<div data-lcs-kind="${k}" style="display:flex;align-items:stretch;gap:8px;padding:2px 8px;border-radius:12px;background:#FFFFFF"><span data-lcs-kindlabel data-lcs-read style="flex:0 0 104px;align-self:center;font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.teal}">${KIND_NAME[k]}</span><div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px">` +
        P.rows.filter((x) => x.kind === k).map((x) => `<div data-lcs-item data-lcs-fact="${x.id}" data-lcs-right="${want[x.status]}" style="display:flex;align-items:center;justify-content:space-between;gap:8px"><span data-lcs-facttext data-lcs-read style="flex:1 1 auto;min-width:0;font:700 ${READ}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(x.text)}</span><div data-lcs-opts style="flex:0 0 auto;display:flex;gap:2px">${OPTS.map((o) => pill(o, o === want[x.status], key, CHOICE).replace('padding:0 11px', 'padding:0 8px')).join('')}</div></div>`).join('') + `</div></div>`).join('') + `</div>`, 6, 4, 'flex:1 1 auto'));
  }
  if (P.mode === 'compare') {
    const pr = P.pr, V = P.V, kind = LEVELS.compare[lv].kind, cards = [];
    const bothS = P.bothFact.clause, d1 = P.d1, d2 = P.d2, like = V[P.pickV - 1].like;
    const ns = keyNote(key, NOTE.sample), ne = keyNote(key, NOTE.either);
    if (kind === 'frames') {
      cards.push(card('data-lcs-task="same"', label(1, LINES.same[1]) + partHtml(slotHtml(bothS, CMP.both, key, FULLW, 'data-lcs-frame="both"') + slotHtml(d1, CMP.v1, key, FULLW, 'data-lcs-frame="v1"') + slotHtml(d2, CMP.v2, key, FULLW, 'data-lcs-frame="v2"'), 1, FULLW, '', ns), 6, 2, GROW));
      // the version is circled, not written (SHOULD 20): "I like Version (1) (2) better because" and the rows for why
      const pickLine = `<div data-lcs-pickline style="display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;padding-left:4px"><span data-lcs-read style="font:700 ${START_PX}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(CMP.like[0])}</span>` +
        ['1', '2'].map((o) => pill(o, Number(o) === P.pickV, key)).join('') + `<span data-lcs-read data-lcs-circleone style="font:700 ${READ}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(LINES.circleOne)}</span><span data-lcs-read style="font:700 ${START_PX}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(CMP.like[1])}</span></div>`;
      cards.push(card('data-lcs-task="like"', label(2, LINES.like[1]) + pickLine + partHtml(slotHtml(like + '.', null, key, FULLW, 'data-lcs-frame="why"'), 1, FULLW, '', ne), 6, 2, GROW));
    } else if (kind === 'starters') {
      cards.push(card('data-lcs-task="same"', label(1, LINES.same[2]) + partHtml(slotHtml(bothS + '.', [CMP_START.both, ''], key, FULLW, 'data-lcs-frame="both"') + slotHtml(`${d1}, but in Version 2, ${d2}.`, [CMP_START.v1, ''], key, FULLW, 'data-lcs-frame="v1"'), 1, FULLW, '', ns), 6, 2, GROW));
      cards.push(card('data-lcs-task="like"', label(2, LINES.like[2]) + partHtml(slotHtml(`${P.pickV} better because ${like}.`, [CMP_START.like, ''], key, FULLW, 'data-lcs-frame="like"'), 1, FULLW, '', ne), 6, 2, GROW));
    } else {
      cards.push(card('data-lcs-task="same"', label(1, LINES.same[3]) + partHtml(slotHtml(`In both versions, ${bothS}. In Version 1, ${d1}, but in Version 2, ${d2}.`, null, key, FULLW, 'data-lcs-frame="same"'), 1, FULLW, '', ns), 6, 2, GROW));
      cards.push(card('data-lcs-task="like"', label(2, LINES.like[3]) + partHtml(slotHtml(`I like Version ${P.pickV} better because ${like}.`, null, key, FULLW, 'data-lcs-frame="like"'), 1, FULLW, '', ne), 6, 2, GROW));
    }
    const pf = fitPf(P, (cards.join('').match(/data-lcs-line[ >]/g) || []).length);
    b.push(`<div data-lcs-card data-lcs-pair="${pr.id}" style="display:flex;flex-direction:column;gap:3px;padding:5px 12px 7px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div data-lcs-tale style="font:700 21px/1.15 'Baloo 2',cursive;color:${T.ink}">Two versions of ${esc(pr.t.tale)}</div>` +
      `<div data-lcs-chart style="display:grid;grid-template-columns:110px 1fr 1fr;gap:2px 12px;align-items:baseline"><span></span><span data-lcs-vhead style="font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.teal}">Version 1</span><span data-lcs-vhead style="font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.teal}">Version 2</span>` +
      KINDS.map((k) => `<span data-lcs-kindlabel data-lcs-read style="font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.teal}">${KIND_NAME[k]}</span>${V.map((x, i) => `<span data-lcs-note="${k}|${i + 1}" data-lcs-passage data-lcs-read style="font:700 ${pf}px/${L.plh} 'Nunito',sans-serif;color:${T.ink}">${esc(x.notes[k])}</span>`).join('')}`).join('') + `</div></div>`, ...cards);
  }
  if (P.mode === 'build') {
    const t = P.t;
    b.push(stemsBox());
    b.push(`<div data-lcs-card data-lcs-tiny="${A(t.id)}" style="flex:1 1 auto;justify-content:center;display:flex;flex-direction:column;gap:2px;padding:5px 14px 7px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div data-lcs-stitle style="font:700 22px/1.15 'Baloo 2',cursive;color:${T.ink}">${esc(t.title)}</div><div data-lcs-passage data-lcs-read style="font:700 ${L.pf}px/${L.plh} 'Nunito',sans-serif;color:${T.ink}">${esc(t.text)}</div></div>`);
    b.push(card('data-lcs-task="pick"', label(1, LINES.pick) + `<div style="display:flex;flex-direction:column;gap:4px;${GROW}">` +
      P.rows.map((r, i) => `<div data-lcs-item data-lcs-comment="${r.ci}" data-lcs-right="${A(r.right)}" style="display:flex;flex-direction:column;gap:1px;padding:${L.rowPad || 3}px 8px;border-radius:12px;background:#FFFFFF"><span data-lcs-says data-lcs-read style="font:700 ${L.say}px/1.25 'Nunito',sans-serif;color:${T.ink}">${teal('abc'[i] + '.')} ${esc(r.name)} said, "${esc(r.says)}"</span><div data-lcs-opts style="display:flex;flex-direction:column;align-items:flex-start;gap:0;padding-left:16px">${r.opts.map((o) => pill(o, o === r.right, key, L.ch)).join('')}</div></div>`).join('') + `</div>`, 6, 4, 'flex:2 1 auto'));
    if (LEVELS.build[lv].own) b.push(card('data-lcs-task="own"', label(2, esc(LINES.own.replace('{NAME}', t.own.name))) + `<div data-lcs-says data-lcs-read style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink};padding-left:4px">${esc(t.own.name)} said, "${esc(t.own.says)}"</div>` + partHtml(slotHtml(t.own.sample, null, key, FULLW, 'data-lcs-frame="own"'), 1, FULLW, '', keyNote(key, NOTE.reply(t.own.name))), 6, 2, GROW));
  }
  if (P.mode === 'card') {
    const m = P.m, kind = LEVELS.card[lv].kind;
    const model = `<div data-lcs-model style="display:flex;flex-direction:column;gap:1px"><span data-lcs-read style="font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.teal}">How a talk sounds (about ${esc(m.about)}):</span>${m.lines.map((l, i) => { const st = l.text.match(/^(I agree with [A-Z][a-z]+ because|I want to add that|I see it another way:)(.*)$/);
      return `<div data-lcs-modelline="${i}" data-lcs-read style="font:700 ${READ}px/1.26 'Nunito',sans-serif;color:${T.ink}"><b style="font-weight:800">${esc(l.name)}:</b> "${st ? `<span data-lcs-stemused style="color:${T.teal};font-weight:800">${esc(st[1])}</span>${esc(st[2])}` : esc(l.text)}"</div>`; }).join('')}</div>`;
    b.push(stemsBox(model));
    // the key's samples (any class book: a girl who kept trying and a dog that ran away; the note says they are samples)
    const C = CARD_SAMPLE;
    let before, after;
    const nb = keyNote(key, NOTE.anyBook);
    const ask = `<div data-lcs-head data-lcs-read style="font:700 ${READ}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(LINES.ask2)}</div>`;
    if (kind === 'frames') {
      before = partHtml(slotHtml(C.think, CARD_F.think, key, FULLW, 'data-lcs-frame="think"') + slotHtml(C.because, CARD_F.because, key, FULLW, 'data-lcs-frame="because"'), 1, FULLW, '', nb) +
        ask + partHtml(slotHtml(C.wonder, CARD_F.wonder, key, FULLW, 'data-lcs-frame="wonder"'), 1);
      // SHOULD 24: whose idea, the idea itself, and what I said (so a reader sees the link)
      after = partHtml(slotHtml(C.name, CARD_F.built, key, FULLW, 'data-lcs-frame="built"') + slotHtml(C.idea, CARD_F.idea, key, FULLW, 'data-lcs-frame="idea"') + slotHtml(C.said, CARD_F.said, key, FULLW, 'data-lcs-frame="said"'), 1, FULLW, '', nb);
    } else if (kind === 'starters') {
      before = partHtml(slotHtml(`${C.think} because ${C.because}.`, [CARD_S.think, ''], key, FULLW, 'data-lcs-frame="think"'), 1, FULLW, '', nb) +
        ask + partHtml(slotHtml(`${C.wonder}?`, [CARD_S.wonder, ''], key, FULLW, 'data-lcs-frame="wonder"'), 1);
      after = partHtml(slotHtml(C.name, ['', CARD_S.built], key, FULLW, 'data-lcs-frame="built"') + slotHtml(`${C.idea}. I said, "${C.said}."`, null, key, FULLW, 'data-lcs-frame="idea"'), 1, FULLW, '', nb);
    } else {
      before = partHtml(slotHtml(`I think ${C.think} because ${C.because}.`, null, key, FULLW, 'data-lcs-frame="think"'), 1, FULLW, '', nb) + ask + partHtml(slotHtml(`Why did ${C.wonder}?`, null, key, FULLW, 'data-lcs-frame="wonder"'), 1);
      after = partHtml(slotHtml(`${C.name} said ${C.idea}. I said, "${C.said}."`, null, key, FULLW, 'data-lcs-frame="built"'), 1, FULLW, '', nb);
    }
    b.push(card('data-lcs-task="before"', label(1, `${teal(esc(LINES.before))}: ${esc(LINES.say)}`) + before, 6, 2, GROW));
    b.push(card('data-lcs-task="after"', label(2, `${teal(esc(LINES.after))}: ${esc(LINES.built)}`) + after + checklist(TALK_CHECK), 6, 4, GROW));
  }
  return b;
}

function makeStoriesCompareType({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('stories-compare-g2: unknown mode ' + mode);
  const INFO = {
    mode, SPEC,
    arc: mode === 'arc' || mode === 'arcwrite' ? Object.fromEntries(BANK.arc.map((s) => [s.id, s])) : {},
    voices: mode === 'voices' ? Object.fromEntries(BANK.voices.map((s) => [s.id, s])) : {},
    scripts: mode === 'script' ? Object.fromEntries(BANK.scripts.map((s) => [s.id, s])) : {},
    voiceWords: BANK.voiceWords,
    // the RAW facts of the bank (the versions each one is in): verify works out 1, 2, Both, or Neither itself
    pairs: mode === 'versions' || mode === 'compare' ? Object.fromEntries(PAIRS.map((p) => [p.id, { tale: p.t.tale, x: p.x, y: p.y, versions: [p.t.versions[p.x], p.t.versions[p.y]], facts: [...p.t.facts.map((f, i) => ({ id: p.t.id + '-f' + i, kind: f.kind, text: f.text, in: f.in, clause: f.clause || null })), ...p.t.neither.map((f, i) => ({ id: p.t.id + '-n' + i, kind: f.kind, text: f.text, in: [], clause: null }))] }])) : {},
    talk: mode === 'build' ? Object.fromEntries(BANK.talk.map((t) => [t.id, t])) : {},
    club: mode === 'card' ? BANK.club : [],
    modelOnly: Object.values(BANK.modelOnly).flat(),
  };
  return {
    id, slug, gradeBand: 'G2', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // the unit checks (Part 7.6): the page's task made small, one card a task (scCheckPage below; the pages that ask for
    // writing in the child's own words or for a talk give no check)
    ...(CHECK_MODES.has(mode) ? { checkPage(args, ctx) { return scCheckPage(mode, args, ctx); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the stories are English stories (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const P = plan(BANK, mode, lv, rng, (ctx && (ctx.seedVariant || ctx.variant)) || null);
      const blocks = render(P, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-scg2="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''}${P.variant ? ` data-lcs-variant="${P.variant}"` : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px;min-height:0">` + fRoom(typo(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + P.list[0], items: P.list },
      };
    },

    async verify(page) {
      return page.evaluate(VERIFY_IN_PAGE, INFO);
    },
  };
}

// ------------------------------------------------------------------ the check, run in the rendered page
function VERIFY_IN_PAGE(I) {
  const fails = [], S = I.SPEC;
  const root = document.querySelector('[data-lcs-scg2]');
  if (!root) return ['no page'];
  const [mode, lvS] = root.dataset.lcsScg2.split('|'), lv = +lvS, N = S.N;
  const isKey = root.dataset.lcsIskey === '1';
  const R = (e) => e.getBoundingClientRect(), cs = (e) => getComputedStyle(e), fs = (e) => parseFloat(cs(e).fontSize);
  const straight = (s) => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  const txt = (e) => (e ? straight(e.textContent).replace(/\s+/g, ' ').trim() : '');
  const all = (sel, el = root) => [...el.querySelectorAll(sel)], one = (sel, el = root) => el.querySelector(sel);
  const TEAL = 'rgb(20, 107, 94)';
  const rb = R(root);
  const lower = (s) => straight(s).toLowerCase();
  const words = (s) => lower(s).match(/[a-z]+(?:'[a-z]+)?/g) || [];
  const hasWord = (s, w) => { const ws = words(s), q = words(w); if (!q.length) return false; for (let i = 0; i + q.length <= ws.length; i++) if (q.every((x, k) => ws[i + k] === x)) return true; return false; };
  const nCh = (s) => [...String(s)].length, cap = (w) => Math.floor(w / (S.FULLW / S.CPL) + 1e-9);
  const placesBad = (p, m) => { const n = p.length, count = (v) => p.filter((x) => x === v).length, s = p.join('');
    if (n >= m && new Set(p).size < m) return 'not every place is used';
    if (n >= 4 && Math.max(...Array.from({ length: m }, (_, v) => count(v))) > Math.ceil(n * (m === 2 ? 0.6 : 0.5))) return 'one place holds too many';
    if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return 'three in a row in one place';
    if (m >= 3 && p.some((x, i) => i >= 2 && ((p[i - 1] === p[i - 2] + 1 && x === p[i - 1] + 1) || (p[i - 1] === p[i - 2] - 1 && x === p[i - 1] - 1)))) return 'a staircase';
    if (m === 2 && (/01010|10101/.test(s) || (n >= 4 && p.every((x, i) => !i || x !== p[i - 1])))) return 'every other one';
    if (n === 2 && m >= 3 && p[0] === p[1]) return 'both in one place';
    if (p.some((x, i) => i >= 3 && x !== p[i - 1] && p[i - 2] === x && p[i - 3] === p[i - 1])) return 'four answers alternate their places';
    for (const par of [0, 1]) { const sub = p.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
    for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (p[i + k] !== p[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
    return ''; };
  const seqBad = (seq, need) => { if (new Set(seq).size < need) return 'too few different answers';
    if (seq.some((x, i) => i >= 2 && x === seq[i - 1] && x === seq[i - 2])) return 'three alike in a row';
    if (seq.length >= 4 && new Set(seq).size === 2 && seq.every((x, i) => !i || x !== seq[i - 1])) return 'two answers taking turns';
    if (seq.some((x, i) => i >= 3 && x !== seq[i - 1] && seq[i - 2] === x && seq[i - 3] === seq[i - 1])) return 'four answers taking turns';
    // speakers have no order, so no staircase: only a pattern a child could read (one speaker on every other line, runs of
    // one length, a block that repeats)
    const n = seq.length;
    for (const par of [0, 1]) { const sub = seq.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one speaker on every other line'; }
    const runs = []; seq.forEach((x, i) => { if (i && x === seq[i - 1]) runs[runs.length - 1]++; else runs.push(1); });
    if (runs.length >= 3 && runs[0] >= 2 && runs.slice(0, -1).every((r) => r === runs[0])) return 'runs of one length';
    for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (seq[i + k] !== seq[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
    return ''; };

  // ---- the page: title, instruction, ligatures, marks, free/premium
  const ttl = one('[data-lcs-title]', document); if (!ttl || txt(ttl) !== S.TITLE[mode]) fails.push(`the title is not the type's: "${txt(ttl)}"`);
  const ins = one('[data-lcs-instruction]', document);
  if (!ins) fails.push('no instruction at the top of the page'); else if (txt(ins) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(ins)}"`);
  const ligOff = (e) => cs(e).fontVariantLigatures === 'none';
  if (!ligOff(root) || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
  if (all('*').some((e) => !e.children.length && /f[ifl]/.test(e.textContent) && !ligOff(e))) fails.push('a word with fi, fl, or ff joins its letters (ligatures on)');
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg, style') && /f[ifl]/.test(n.textContent)) { fails.push('an f before i, f, or l has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n, bad = ''; while ((n = tw.nextNode())) if (/['"]/.test(n.textContent) && !n.parentElement.closest('style')) { bad = n.textContent.trim().slice(0, 30); break; }
    for (const e of [ins, ttl]) if (!bad && e && /['"]/.test(e.textContent)) bad = e.textContent.trim().slice(0, 30);
    if (bad) fails.push('a straight apostrophe or quotation mark is printed: "' + bad + '"'); }
  // everything a reader sees, one text after another with a space between (textContent runs the last word of a row
  // into the first of the next: "free" at the end of a key's row read as "freebecause")
  const seen = (() => { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), out = []; let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('style')) out.push(n.textContent); return straight(out.join(' ')).replace(/\s+/g, ' '); })();
  if (/\b(free|frees|freed|freely|freedom|premium)\b/i.test(seen)) fails.push('the page says free or premium');
  if (root.querySelector('img')) fails.push('a picture on a page without pictures');
  { const hit = I.modelOnly.filter((w) => hasWord(seen, w)); if (hit.length) fails.push('the page prints a word kept for the teacher\'s model: ' + hit.join(', ')); }

  // ---- the blocks: on the page, one below the other, nothing out of its card, 80 % of the body, no blank band
  const blocks = [...root.children];
  blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
    all('span, div, svg, b, i', b).forEach((e) => { const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5) && !e.matches('[data-lcs-keynote]')) fails.push('something leaves its card (' + (Object.keys(e.dataset)[0] || e.tagName) + ')'); }); });
  all('[data-lcs-keynote]').forEach((e) => { const c = e.closest('[data-lcs-card]'), q = R(e), r = R(c); if (q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < rb.top - 1) fails.push('a key note leaves its card'); });
  const used = blocks.reduce((s, b) => s + R(b).height, 0);
  if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
  for (let i = 1; i < blocks.length; i++) { const g = R(blocks[i]).top - R(blocks[i - 1]).bottom; if (g > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two parts of the page`); }
  if (blocks.length) { const gb = rb.bottom - R(blocks[blocks.length - 1]).bottom; if (gb > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(gb)} px under the last block`); }
  // the blank bands a reader SEES inside every block: the union of everything printed (text, the rules of a row, boxes with
  // a border, white panels) from the block's inner top to its inner bottom
  blocks.forEach((b) => { const iv = [], s = cs(b);
    [b, ...all('*', b)].forEach((e) => {
      const r = R(e); if (!r.width || !r.height) return;
      if (e.closest('svg') && e.tagName.toLowerCase() !== 'svg') { if (!e.closest('[data-lcs-line]') || e.tagName.toLowerCase() === 'text') iv.push([r.top, r.bottom]); return; }
      if (e.tagName.toLowerCase() === 'svg') { if (e.closest('[data-lcs-line]')) { const lns = all('line', e).map((l) => R(l)); iv.push([lns.length ? Math.min(...lns.map((q) => q.top)) : r.top, lns.length ? Math.max(...lns.map((q) => q.bottom)) : r.bottom]); } else iv.push([r.top, r.bottom]); return; }
      if (e === b) return;
      const st = cs(e), own = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      // text counts line by line; a box with a border or a panel of its own color counts only by its top and bottom edge
      // (the room INSIDE a box is room a reader sees: the Grade 3 review, ruling G)
      if (own) { const rg = document.createRange(); rg.selectNodeContents(e); [...rg.getClientRects()].forEach((q) => { if (q.height) iv.push([q.top, q.bottom]); }); }
      const edge = (q) => parseFloat(st['border' + q + 'Width']) >= 2 && st['border' + q + 'Style'] !== 'none' && st['border' + q + 'Color'] !== 'rgba(0, 0, 0, 0)';
      const panel = st.backgroundColor !== 'rgba(0, 0, 0, 0)' && st.backgroundColor !== s.backgroundColor;
      if (edge('Top') || panel) iv.push([r.top, r.top + Math.max(1, parseFloat(st.borderTopWidth) || 0)]);
      if (edge('Bottom') || panel) iv.push([r.bottom - Math.max(1, parseFloat(st.borderBottomWidth) || 0), r.bottom]);
      if (!edge('Top') && !edge('Bottom') && (edge('Left') || edge('Right'))) iv.push([r.top, r.bottom]);
    });
    iv.sort((p, q) => p[0] - q[0]);
    let top = R(b).top + parseFloat(s.paddingTop), worst = 0;
    for (const [a, z] of iv) { if (a > top) worst = Math.max(worst, a - top); top = Math.max(top, z); }
    worst = Math.max(worst, R(b).bottom - parseFloat(s.paddingBottom) - top);
    if (worst > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(worst)} px that a reader sees in the ${b.dataset.lcsTask || Object.keys(b.dataset).filter((k) => k !== 'lcsCard')[0] || 'block'} block`); });

  // ---- print sizes, rows, the key's text on its row
  all('[data-lcs-passage]').forEach((e) => { if (fs(e) < S.PASSAGE - 0.05) fails.push(`a story or play is printed at ${fs(e)} px (${S.PASSAGE} or more)`); });
  all('[data-lcs-read]').forEach((e) => { if (!e.matches('[data-lcs-passage]') && fs(e) < S.LABEL - 0.05) fails.push(`text a second grader reads is ${fs(e)} px (${S.LABEL} or more)`); });
  all('[data-lcs-label], [data-lcs-qtext], [data-lcs-striptext], [data-lcs-viewtext], [data-lcs-facttext], [data-lcs-says]').forEach((e) => { if (fs(e) < S.READ - 0.05) fails.push(`a task line or a sentence is ${fs(e)} px (${S.READ} or more)`); });
  all('[data-lcs-pill]').forEach((e) => { if (fs(e) < S.CHOICE - 0.05) fails.push(`a thing to circle is ${fs(e)} px (${S.CHOICE} or more)`); });
  all('[data-lcs-box]').forEach((e) => { if (R(e).width < S.BOX || R(e).height < S.BOX) fails.push(`a box for a letter is ${Math.round(R(e).width)} px (${S.BOX} or more)`); const t = txt(e); if (isKey ? t !== e.dataset.lcsWant : t) fails.push(isKey ? 'a box of the key does not hold its letter' : 'a box is filled on the page of the child'); });
  all('[data-lcs-head], [data-lcs-start], [data-lcs-end]').forEach((e) => { if (e.scrollWidth > e.clientWidth + 1) fails.push(`a line is cut off at its end: "${txt(e).slice(0, 50)}"`); });
  const lines = all('[data-lcs-line]');
  lines.forEach((l) => { const s = one('svg', l); if (!s || Math.abs(R(s).height - S.ROW) > 0.6) fails.push(`a writing row is ${s ? Math.round(R(s).height) : 0} px high, not ${S.ROW}`); });
  lines.forEach((l) => { const s = one('svg', l), t = s && one('text', s); if (!t) return;
    if (!isKey) { fails.push('a row is written on the page of the child'); return; }
    if (t.hasAttribute('textLength') || R(t).width > R(s).width - 8 || R(t).right > R(s).right - 2) fails.push('a key answer is wider than its row: ' + t.textContent);
    if (nCh(t.textContent) > cap(R(s).width)) fails.push(`the key writes ${nCh(t.textContent)} letters on a row a second grader fills with ${cap(R(s).width)}: "${t.textContent}"`);
    if (straight(t.textContent) !== straight(l.dataset.lcsAnswer)) fails.push('a key answer is not the answer of its row'); });
  // a slot: its rows hold its sample at a child's letter width; a part keeps a row to spare
  all('[data-lcs-slot]').forEach((g, i) => {
    const text = straight(g.dataset.lcsExpect || ''), rs = all(':scope > [data-lcs-wrow]', g);
    if (!text) { fails.push(`writing slot ${i + 1} has no sample`); return; }
    const caps = rs.map((w) => { const sv = one('[data-lcs-line] svg', w); return sv ? cap(R(sv).width) : 0; });
    const outL = caps.map(() => ''); let k = 0, ok = true;
    for (const w of text.split(' ')) { for (;;) { if (k >= caps.length) { ok = false; break; } const c = outL[k] ? outL[k] + ' ' + w : w; if (nCh(c) <= caps[k]) { outL[k] = c; break; } if (!outL[k]) { ok = false; break; } k++; } if (!ok) break; }
    if (!ok) fails.push(`writing slot ${i + 1}: the sample (${text.length} letters) does not fit its ${rs.length} rows at ${S.CPL} letters a full row`);
    if (isKey) { const got = rs.map((w) => straight((one('[data-lcs-line]', w) || { dataset: {} }).dataset.lcsAnswer || '')).filter(Boolean).join(' '); if (got !== text) fails.push(`writing slot ${i + 1}: the key's rows do not hold its sample`); }
  });
  all('[data-lcs-part]').forEach((p, i) => { const sp = all(':scope > [data-lcs-spare]', p); if (!sp.length) fails.push(`writing part ${i + 1} has no row to spare`); if (sp.some((x) => one('text', x))) fails.push(`writing part ${i + 1}: the key fills the row to spare`); });
  // a frame or starter: its words on the base rule, nothing over its lines
  all('[data-lcs-framed]').forEach((e) => { const svg = one('[data-lcs-line] svg', e); if (!svg) { fails.push('a frame has no row'); return; }
    const ys = all('line', svg).filter((l) => l.getAttribute('y1') === l.getAttribute('y2')).map((l) => +l.getAttribute('y1')).sort((a, b) => a - b);
    const rule = R(svg).top + ys[ys.length - 1] * (R(svg).height / +svg.getAttribute('height'));
    all('[data-lcs-start], [data-lcs-end]', e).forEach((sw) => { const probe = document.createElement('span'); probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'; sw.appendChild(probe); const base = R(probe).top; probe.remove();
      if (Math.abs(base - rule) > 2.5) fails.push(`the words "${txt(sw)}" stand ${Math.round(base - rule)} px off the base rule of their row`);
      const rg = document.createRange(); rg.selectNodeContents(sw); const q = rg.getBoundingClientRect();
      if (sw.matches('[data-lcs-start]') ? q.right > R(svg).left + 1 : q.left < R(svg).right - 1) fails.push(`the words "${txt(sw)}" run into the lines of their row`); });
    if (R(svg).width < 40) fails.push('a frame leaves less than 40 px to write'); });
  // the page of the child shows nothing of the key
  const ringed = (e) => cs(e).borderTopColor === TEAL && parseFloat(cs(e).borderTopWidth) >= 2.5;
  all('[data-lcs-pill]').forEach((e) => { if (ringed(e) !== (isKey && e.dataset.lcsOk === '1')) fails.push(isKey ? 'the key does not ring exactly the right answers' : 'the page of the child rings an answer'); });
  const notes = all('[data-lcs-keynote]');
  if (!isKey && notes.length) fails.push('the page of the child carries a key note');
  // every box of the key that writes a sample says that it is one (or what else is right)
  if (isKey) all('[data-lcs-card]').forEach((c) => { if (c.querySelector('[data-lcs-answer]') && !c.querySelector('[data-lcs-keynote]')) fails.push('a written sample of the key does not say it is a sample'); });
  const okNote = (t) => S.NOTES.includes(t) || Object.values(S.OPEN_NOTES).includes(t) || [S.LINE_NOTE, S.REPLY_NOTE].some(([a, z]) => t.startsWith(a) && t.endsWith(z) && t.length > a.length + z.length);
  notes.forEach((e) => { if (!okNote(txt(e))) fails.push(`the key's note "${txt(e)}" is not one that says it is a sample or what else is right`); });
  // the task lines
  const labelText = (l) => { const c = l.cloneNode(true); c.querySelectorAll('[data-lcs-keynote], [data-lcs-labelnum]').forEach((x) => x.remove()); return txt(c); };
  const labels = all('[data-lcs-label]').map(labelText);
  const need = (want) => { if (!labels.includes(want)) fails.push(`the task line "${want}" is not printed`); };
  /** a set of choices: m different, one right and keyed */
  const choiceRows = (rows, m, what) => { const p = rows.map((r) => { const os = all('[data-lcs-pill]', r); if (os.length !== m || os.filter((o) => o.dataset.lcsOk).length !== 1 || new Set(os.map((o) => o.dataset.lcsOpt)).size !== m) fails.push(`${what}: not ${m} different choices with one right`); const ok = os.find((o) => o.dataset.lcsOk); if (r.dataset.lcsRight !== undefined && (!ok || straight(ok.dataset.lcsOpt) !== straight(r.dataset.lcsRight))) fails.push(`${what}: the right choice is not keyed`); return os.indexOf(ok); });
    return p; };
  const lensOk = (rows) => { const L = rows.map((r) => { const os = all('[data-lcs-pill]', r).map((o) => o.dataset.lcsOpt), right = (one('[data-lcs-ok]', r) || { dataset: {} }).dataset.lcsOpt || ''; return { long: os.every((o) => o === right || o.length < right.length), short: os.every((o) => o === right || o.length > right.length) }; });
    if (rows.length < 2) return true;
    if (rows.length < 3 || rows.some((r) => all('[data-lcs-pill]', r).length < 3)) return L.filter((x) => x.long).length < rows.length && L.filter((x) => x.short).length < rows.length;
    return L.filter((x) => x.long).length <= rows.length / 2 && L.filter((x) => x.short).length <= rows.length / 2; };
  const rowsLetters = (sel) => all(sel).map((r) => r.dataset.lcsWant);

  if (mode === 'arc' || mode === 'arcwrite') {
    const box = one('[data-lcs-story]'), s = box && I.arc[box.dataset.lcsStory];
    if (!s) { fails.push('no story of the bank'); return fails; }
    const parts = all('[data-lcs-part-of-story]', box), want = root.dataset.lcsVariant === 'begin' ? ['m', 'e'] : ['b', 'm', 'e'];
    if (parts.map((p) => p.dataset.lcsPartOfStory).join() !== want.join()) fails.push('the story does not print its parts: ' + parts.map((p) => p.dataset.lcsPartOfStory).join());
    parts.forEach((p) => { const k = p.dataset.lcsPartOfStory; if (txt(one('[data-lcs-passage]', p)) !== s[k].join(' ')) fails.push(`the ${k} part is not printed as the bank has it`); if (txt(one('[data-lcs-partlabel]', p)) !== { b: 'BEGINNING', m: 'MIDDLE', e: 'ENDING' }[k]) fails.push('a part of the story is not labeled'); });
    if (txt(one('[data-lcs-stitle]', box)) !== s.title) fails.push('the story title is not the bank\'s');
  }
  if (mode === 'arc') {
    const s = I.arc[one('[data-lcs-story]').dataset.lcsStory];
    need(S.LINES.ask); need(S.LINES.sort[lv]);
    const qs = all('[data-lcs-q]'), qk = qs.map((q) => q.dataset.lcsQ);
    if (qs.length !== N.arcQ[lv] || qk.join() !== 'problem,solution') fails.push(`the questions are not the ones of level ${lv}: ${qk.join()}`);
    qs.forEach((q) => { const t = txt(one('[data-lcs-qtext]', q)).replace(/^[abc]\. /, ''); if (t !== S.LINES.q[q.dataset.lcsQ]) fails.push(`the question "${t}" is not the ruled one`); });
    const p = choiceRows(qs, 3, 'question');
    if (!p.some((x) => x < 0)) { const bad = placesBad(p, 3); if (bad) fails.push(`the right answers: ${bad} (${p.join('')})`); }
    if (!lensOk(qs)) fails.push('the length of the choices gives the answers away');
    const evText = (t) => s.ev.find((e) => e.text === t);
    qs.forEach((q) => { const k = q.dataset.lcsQ, os = all('[data-lcs-pill]', q).map((o) => straight(o.dataset.lcsOpt)), right = straight(q.dataset.lcsRight);
      const wr = os.filter((o) => o !== right);
      if (k === 'who') { if (right !== s.who.right || wr.some((w) => !s.who.wrong.includes(w))) fails.push('the who question is not keyed to the character the beginning names'); }
      // level 1: a wrong problem of the middle and one of the ending, a wrong solution tried in the middle and one of the
      // beginning; levels 2 and 3: the other wrong choice is of the right one's own part and is not its echo, cause, or part
      if (k === 'problem') { if (right !== s.problem.text) fails.push('the problem question is not keyed to the problem'); const es = wr.map(evText), ps = es.map((e) => (e ? e.p : '?')).sort().join('');
        if (lv === 1 ? ps !== 'em' : ps !== 'bm' || es.some((e) => e && e.p === 'b' && e.tag === 'react')) fails.push(`the wrong problems are not one of the middle and one of the ${lv === 1 ? 'ending' : 'beginning that is not the problem'} (${ps})`);
        if (lv === 3 && !es.some((e) => e && e.tag === 'near')) fails.push('the wrong problem of the middle on level 3 is not a smaller trouble'); }
      if (k === 'solution') { if (right !== s.solution.text) fails.push('the solution question is not keyed to the solution'); const es = wr.map(evText);
        if (es.some((e) => !e) || es.map((e) => e.p).sort().join('') !== (lv === 1 ? 'bm' : 'em') || !es.some((e) => e.p === 'm' && e.tag === 'attempt') || (lv > 1 && es.some((e) => e.p === 'e' && e.tag === 'sol'))) fails.push(`the wrong solutions are not something tried in the middle and an event of the ${lv === 1 ? 'beginning' : 'ending that is not the solution'}`); } });
    const st = all('[data-lcs-strip]'), seq = st.map((x) => x.dataset.lcsWant);
    if (st.length !== N.arcStrips[lv]) fails.push(`${st.length} sentences to sort, not ${N.arcStrips[lv]}`);
    // "We first meet X." is keyed to the part that names X first: the beginning for the one it names, the middle and the
    // ending for the two named first there
    const meetOf = { [`We first meet ${s.who.right}.`]: 'B', [`We first meet ${s.who.wrong[0]}.`]: 'M', [`We first meet ${s.who.wrong[1]}.`]: 'E' };
    const nMeet = st.filter((x) => meetOf[txt(one('[data-lcs-striptext]', x))]).length;
    if (nMeet !== (lv === 1 ? 0 : 1)) fails.push(`${nMeet} sentences about whom we first meet on level ${lv}`);
    st.forEach((x) => { const t = txt(one('[data-lcs-striptext]', x)), e = evText(t);
      const ok = x.dataset.lcsWant === 'X' ? (t === s.notIn.text) : meetOf[t] ? meetOf[t] === x.dataset.lcsWant : (e && e.p.toUpperCase() === x.dataset.lcsWant);
      if (!ok) fails.push(`the sentence "${t}" is not keyed to the part that tells it`);
      if (qs.some((q) => all('[data-lcs-pill]', q).some((o) => straight(o.dataset.lcsOpt) === t))) fails.push(`the sentence "${t}" is also a choice of a question`);
      if (t === s.problem.text || t === s.solution.text) fails.push('a sentence to sort is the problem or the solution'); });
    if (['B', 'M', 'E'].some((x) => !seq.includes(x))) fails.push('the sentences to sort do not take each part');
    if (lv === 3 ? seq.filter((x) => x === 'X').length !== 1 : seq.includes('X')) fails.push(`level ${lv} has ${seq.filter((x) => x === 'X').length} sentences that are not in the story`);
    const bad = placesBad(seq.map((x) => 'BMEX'.indexOf(x)), lv === 3 ? 4 : 3); if (bad) fails.push(`the parts of the sentences: ${bad} (${seq.join('')})`);
    if (seq.join('') === 'BME') fails.push('the sentences stand in the order of the story');
  }
  if (mode === 'arcwrite') {
    const s = I.arc[one('[data-lcs-story]').dataset.lcsStory], fr = s.frames, v = root.dataset.lcsVariant;
    const slot = (k) => one(`[data-lcs-frame="${k}"]`), exp = (k) => straight((slot(k) || { dataset: {} }).dataset.lcsExpect || '');
    const frameOf = (k) => { const e = slot(k); if (!e) return null; const st = one('[data-lcs-start]', e), en = one('[data-lcs-end]', e); return [st ? txt(st) : '', en ? txt(en) : '']; };
    if (lv === 1) { need(S.LINES.begin); need(S.LINES.end);
      for (const k of ['who', 'where', 'problem', 'solved']) { const f = frameOf(k); if (!f || f.join('|') !== S.FRAME[k].join('|')) fails.push(`the frame of ${k} is not the frame of level 1`); if (exp(k) !== straight(fr[k]) + (S.FRAME[k][1] ? '' : '.')) fails.push(`the frame of ${k} is not keyed to the bank's sample`); } }
    else if (lv === 2) { need(S.LINES.begin); need(S.LINES.end);
      const want = { begin: [S.START.begin, `${fr.who} ${fr.where}.`], problem: [S.START.problem, fr.problem + '.'], end: [S.START.end, fr.solved + '.'] };
      for (const k of Object.keys(want)) { const f = frameOf(k); if (!f || f[0] !== want[k][0] || f[1]) fails.push(`the starter of ${k} is not the starter of level 2`); if (exp(k) !== straight(want[k][1])) fails.push(`the starter of ${k} is not keyed to the bank's sample`); } }
    else { const qa = v === 'end' ? [['beginQ', s.beginSample], ['newEnd', s.newEnding]] : v === 'begin' ? [['newBegin', s.newBeginning], ['endQ', s.endSample]] : [];
      if (!qa.length) fails.push('level 3 has no variant');
      qa.forEach(([q, smp]) => { need(S.LINES.open[q]); if (exp(q) !== straight(smp)) fails.push(`the open answer ${q} is not keyed to the bank's sample`); if (frameOf(q).some(Boolean)) fails.push(`the open answer ${q} carries a frame`);
        if (isKey) { const nt = one('[data-lcs-keynote]', slot(q).closest('[data-lcs-card]')); if (!nt || txt(nt) !== straight(S.OPEN_NOTES[q])) fails.push(`the key of ${q} does not say what else is right`); } });
      if (isKey && notes.length !== 2) fails.push('the key does not mark its two samples as samples'); }
  }
  if (mode === 'voices') {
    const box = one('[data-lcs-story]'), s = box && I.voices[box.dataset.lcsStory];
    if (!s) { fails.push('no story of the bank'); return fails; }
    need(S.LINES.who); need(S.LINES.views.replace('{ABOUT}', straight(s.about)));
    const ps = all('[data-lcs-para]', box);
    const plain = (p) => { const c = p.cloneNode(true); c.querySelectorAll('[data-lcs-mark]').forEach((x) => x.remove()); return txt(c); };
    if (ps.length !== s.paras.length) fails.push('the story does not print every paragraph');
    ps.forEach((p, i) => { if (s.paras[i] && plain(p) !== straight(s.paras[i].t)) fails.push(`paragraph ${i + 1} of the story is not printed as the bank has it`); });
    const letters = Object.fromEntries(s.chars.map((c) => [c, c.split(' ').pop().charAt(0).toUpperCase()]));
    if (txt(one('[data-lcs-legend]')) !== s.chars.map((c) => `${letters[c]} = ${c}`).join(' · ')) fails.push('the letters of the speakers are not printed');
    // ruling D: the box shows each way this level names a speaker, with its example, and no other
    const ways = all('[data-lcs-way]');
    if (ways.map((w) => w.dataset.lcsWay).join() !== S.FORMS[lv].join() || ways.some((w) => txt(w) !== S.SPEAK[w.dataset.lcsWay].join(' '))) fails.push(`the box does not show the ways level ${lv} names a speaker`);
    const items = all('[data-lcs-line-no]'), nums = all('[data-lcs-mark]', box);
    if (items.length !== N.who[lv] || nums.length !== N.who[lv]) fails.push(`${items.length} numbered lines, not ${N.who[lv]}`);
    nums.forEach((m, k) => { if (+txt(m) !== k + 1) fails.push('the numbers in the story are not 1, 2, 3 in order'); const p = m.closest('[data-lcs-para]'); const after = m.nextSibling; if (!after || !/^["“]/.test(after.textContent || '')) fails.push(`number ${k + 1} does not stand at the opening quotation mark`); });
    items.forEach((it, k) => { const pi = +it.dataset.lcsParaOf, p = s.paras[pi], bx = one('[data-lcs-box]', it);
      if (!p || !p.who) { fails.push(`line ${k + 1} is no line of dialogue`); return; }
      if (bx.dataset.lcsWant !== letters[p.who]) fails.push(`line ${k + 1} is not keyed to its speaker`);
      if (!S.FORMS[lv].includes(p.form)) fails.push(`line ${k + 1} is named in a way level ${lv} does not ask for (${p.form})`);
      const m = one(`[data-lcs-para="${pi}"] [data-lcs-mark]`, box); if (!m || +txt(m) !== k + 1) fails.push(`line ${k + 1} is not the line with number ${k + 1}`); });
    const seq = items.map((it) => one('[data-lcs-box]', it).dataset.lcsWant);
    const sb = seqBad(seq, lv === 1 ? 2 : 3); if (sb) fails.push(`the speakers of the numbered lines: ${sb} (${seq.join('')})`);
    if (lv === 3 && !items.some((it) => s.paras[+it.dataset.lcsParaOf].form === 'beat')) fails.push('level 3 has no line named only before the words');
    const vs = all('[data-lcs-view]');
    if (vs.length !== N.views[lv]) fails.push(`${vs.length} views, not ${N.views[lv]}`);
    const shown = s.chars.slice(0, N.views[lv] - 1);
    vs.forEach((x) => { const t = txt(one('[data-lcs-viewtext]', x)), w = x.dataset.lcsWant;
      const who = shown.find((c) => s.views[c].text === t);
      if (w === 'X' ? t !== s.nobody.text : (!who || letters[who] !== w)) fails.push(`the view "${t}" is not keyed to who thinks it`); });
    const vw = rowsLetters('[data-lcs-view]'); if (vw.filter((x) => x === 'X').length !== 1 || shown.some((c) => !vw.includes(letters[c]))) fails.push('the views are not one for each speaker asked and one of nobody');
    if (vw.join('') === [...shown.map((c) => letters[c]), 'X'].join('')) fails.push('the views stand in the order of the letters');
  }
  if (mode === 'script') {
    const pl = one('[data-lcs-play]'), s = pl && I.scripts[pl.dataset.lcsPlay];
    if (!s) { fails.push('no play of the bank'); return fails; }
    if (all('[data-lcs-rulebox] [data-lcs-ruletext]').map(txt).join('|') !== S.PLAY_RULES.join('|')) fails.push('the box does not say how to read a play');
    const sl = all('[data-lcs-sline]', pl);
    if (sl.length !== s.lines.length || sl.some((l, i) => txt(l) !== `${s.lines[i].who.toUpperCase()}: ${straight(s.lines[i].text)}`)) fails.push('the play is not printed as the bank has it');
    if (txt(one('[data-lcs-cast]', pl)) !== 'Parts: Narrator, ' + s.cast.map((c) => c.name).join(', ')) fails.push('the parts of the play are not named');
    need(S.LINES.voice); need(S.LINES.read);
    const vr = all('[data-lcs-voice]');
    if (vr.length !== N.voices[lv]) fails.push(`${vr.length} characters to give a voice, not ${N.voices[lv]}`);
    const p = choiceRows(vr, N.voiceOpts[lv], 'voice');
    vr.forEach((r) => { const c = s.cast.find((x) => x.name === r.dataset.lcsVoice), os = all('[data-lcs-pill]', r).map((o) => o.dataset.lcsOpt);
      if (!c || r.dataset.lcsRight !== c.word) { fails.push(`the voice of ${r.dataset.lcsVoice} is not keyed to the bank's word`); return; }
      const wr = os.filter((o) => o !== c.word);
      if (wr.some((w) => !I.voiceWords.includes(w))) fails.push('a voice word is not one of the list');
      if (lv === 1 ? wr.some((w) => !s.notFit.includes(w)) : !(wr.some((w) => s.cast.some((x) => x !== c && x.word === w)) && wr.some((w) => s.notFit.includes(w)))) fails.push(`the wrong voice words of ${c.name} are not ${lv === 1 ? 'a word that fits nobody' : "another character's and one that fits nobody"}`); });
    // level 1 (ruling F): no word stands in two rows (a row is never solved by crossing out the word of another)
    if (lv === 1) { const ws = vr.flatMap((r) => all('[data-lcs-pill]', r).map((o) => o.dataset.lcsOpt)); if (new Set(ws).size !== ws.length) fails.push('a voice word stands in two rows of level 1'); if (p.length === 2 && p[0] === p[1]) fails.push('the right voice words of level 1 stand in one place'); }
    // no word of the play is a voice word of the page or a form of it (a direction that says (calmly) hands over "calm")
    const playWords = new Set(words(sl.map(txt).join(' ')));
    vr.forEach((r) => all('[data-lcs-pill]', r).forEach((o) => { const w = o.dataset.lcsOpt; if ([w, w + 'ly', ...(w.endsWith('y') ? [w.slice(0, -1) + 'ily'] : [])].some((x) => playWords.has(x))) fails.push(`the play prints the voice word "${w}" or a form of it`); }));
    if (lv > 1 && !p.some((x) => x < 0)) { const bad = placesBad(p, 3); if (bad) fails.push(`the right voice words: ${bad} (${p.join('')})`); if (!lensOk(vr)) fails.push('the length of the voice words gives the answers away'); }
    if (all('[data-lcs-checklist] [data-lcs-checkitem]').map(txt).join('|') !== S.READ_CHECK.join('|')) fails.push('the checklist for reading the play is not the ruled one');
    if (lv === 3) { need(S.LINES.next.replace('{NAME}', s.cast[0].name)); const nx = all('[data-lcs-nextof]'); if (nx.length !== 1 || nx.some((n, i) => n.dataset.lcsNextof !== s.cast[i].name || straight(one('[data-lcs-slot]', n).dataset.lcsExpect) !== straight(s.next[s.cast[i].name]))) fails.push('level 3 does not ask for one more line for the first character, keyed to the bank');
      if (isKey && (notes.length !== 1 || txt(notes[0]) !== S.LINE_NOTE[0] + s.cast[0].word + S.LINE_NOTE[1])) fails.push('the key does not say which lines are right for the new line'); }
    else if (one('[data-lcs-nextof]')) fails.push(`level ${lv} asks for more lines`);
  }
  if (mode === 'versions' || mode === 'compare') {
    const pc = one('[data-lcs-pair]'), pr = pc && I.pairs[pc.dataset.lcsPair];
    if (!pr) { fails.push('no pair of versions of the bank'); return fails; }
    if (txt(one('[data-lcs-tale]', pc)) !== 'Two versions of ' + pr.tale) fails.push('the page does not name the tale');
    // what a fact is for this pair, worked out here from the versions it is in (never read from the build)
    const stOf = (f) => { const a = f.in.includes(pr.x), b2 = f.in.includes(pr.y); return a && b2 ? 'Both' : a ? 'V1' : b2 ? 'V2' : 'Neither'; };
    if (mode === 'versions') {
      const vs = all('[data-lcs-version]', pc);
      if (vs.length !== 2 || vs.some((v, i) => txt(one('[data-lcs-vhead]', v)) !== 'Version ' + (i + 1) || txt(one('[data-lcs-passage]', v)) !== straight(pr.versions[i].text))) fails.push('the two versions are not printed as the bank has them');
      need(S.LINES.chart[lv]);
      const rows = all('[data-lcs-fact]'), opts = N.factOpts[lv];
      if (rows.length !== N.facts[lv]) fails.push(`${rows.length} sentences in the chart, not ${N.facts[lv]}`);
      choiceRows(rows, opts, 'sentence');
      const want = { V1: '1', V2: '2', Both: 'Both', Neither: 'Neither' };
      rows.forEach((r) => { const f = pr.facts.find((x) => x.id === r.dataset.lcsFact); if (!f || txt(one('[data-lcs-facttext]', r)) !== straight(f.text) || r.dataset.lcsRight !== want[stOf(f)] || r.closest('[data-lcs-kind]').dataset.lcsKind !== f.kind) fails.push(`the sentence "${txt(one('[data-lcs-facttext]', r))}" is not keyed to what the versions tell`); });
      // ruling B: the chart holds, in order, every row whose facts in this pair are not all Both, and no other
      const told = pr.facts.filter((f) => stOf(f) !== 'Neither'), rowKinds = ['characters', 'setting', 'problem', 'ending'].filter((k) => told.some((f) => f.kind === k && stOf(f) !== 'Both'));
      const ks = all('[data-lcs-kind]').map((k) => k.dataset.lcsKind); if (ks.join() !== rowKinds.join() || ks.length < 3) fails.push(`the chart does not hold the rows ${rowKinds.join(', ')} in order (${ks.join(', ')})`);
      all('[data-lcs-kind]').forEach((k) => { if (txt(one('[data-lcs-kindlabel]', k)) !== S.KIND_NAME[k.dataset.lcsKind]) fails.push('a row of the chart is not labeled'); });
      const st = rows.map((r) => r.dataset.lcsRight);
      if (['1', '2', 'Both'].some((x) => !st.includes(x))) fails.push('the chart does not use 1, 2, and Both');
      if (lv === 3 ? st.filter((x) => x === 'Neither').length !== 1 : st.includes('Neither')) fails.push(`level ${lv} has ${st.filter((x) => x === 'Neither').length} sentences in neither version`);
      const bad = placesBad(st.map((x) => ['1', '2', 'Both', 'Neither'].indexOf(x)), lv === 3 ? 4 : 3); if (bad) fails.push(`the answers of the chart: ${bad} (${st.join(',')})`);
    } else {
      const ns = all('[data-lcs-note]', pc);
      if (ns.length !== 8 || ns.some((n) => { const [k, i] = n.dataset.lcsNote.split('|'); return txt(n) !== straight(pr.versions[+i - 1].notes[k]); })) fails.push('the chart of the two versions is not the bank\'s');
      need(S.LINES.same[lv]); need(S.LINES.like[lv]);
      const slot = (k) => one(`[data-lcs-frame="${k}"]`), exp = (k) => straight((slot(k) || { dataset: {} }).dataset.lcsExpect || '');
      const frameOf = (k) => { const e = slot(k); if (!e) return null; const st = one('[data-lcs-start]', e), en = one('[data-lcs-end]', e); return [st ? txt(st) : '', en ? txt(en) : '']; };
      const both = pr.facts.filter((f) => stOf(f) === 'Both' && f.clause).map((f) => straight(f.clause));
      // a difference is told by a row of the chart (SHOULD 19): the problem or the ending notes where they differ, or else
      // where it happens (the setting clause holds the setting note)
      const V2 = pr.versions, N2 = (k, i) => straight(V2[i].notes[k]);
      const differ = ['problem', 'ending'].filter((k) => N2(k, 0) !== N2(k, 1));
      const diffs = differ.length ? differ.map((k) => [N2(k, 0), N2(k, 1)]) : [[straight(V2[0].diff.setting), straight(V2[1].diff.setting)]];
      if (!differ.length && diffs.some(([a, z], i) => !lower(a).includes(lower(V2[i === 0 ? 0 : 1].notes.setting)))) fails.push('the setting clause does not hold the setting note');
      if (lv === 1) {
        for (const k of ['both', 'v1', 'v2']) { const f = frameOf(k); if (!f || f.join('|') !== S.CMP[k].join('|')) fails.push(`the frame "${k}" is not the frame of level 1`); }
        if (!both.includes(exp('both'))) fails.push('the sample of "In both versions" is not something both versions tell');
        if (!diffs.some(([a, z]) => exp('v1') === a && exp('v2') === z)) fails.push('the samples of the difference are not one difference of the two versions');
        // the version is circled (SHOULD 20): "I like Version (1) (2) (circle one) better because" and rows for why
        const pl = one('[data-lcs-pickline]'), pills = pl ? all('[data-lcs-pill]', pl) : [], pk = (pills.find((o) => o.dataset.lcsOk) || { dataset: {} }).dataset.lcsOpt;
        if (!pl || pills.map((o) => o.dataset.lcsOpt).join() !== '1,2' || [...pl.children].map(txt).join(' ') !== `${S.CMP.like[0]} 1 2 ${S.LINES.circleOne} ${S.CMP.like[1]}`) fails.push('the version to like is not circled on a line of its own');
        if (!['1', '2'].includes(pk) || exp('why') !== straight(pr.versions[+pk - 1].like) + '.') fails.push('the sample of the version I like is not keyed to that version');
      } else if (lv === 2) {
        const fb = frameOf('both'), f1 = frameOf('v1'), fl = frameOf('like');
        if (!fb || fb[0] !== S.CMP_START.both || !f1 || f1[0] !== S.CMP_START.v1 || !fl || fl[0] !== S.CMP_START.like) fails.push('the starters are not the starters of level 2');
        if (!both.some((x) => exp('both') === x + '.')) fails.push('the sample of "In both versions" is not something both versions tell');
        if (!diffs.some(([a, z]) => exp('v1') === `${a}, but in Version 2, ${z}.`)) fails.push('the samples of the difference are not one difference of the two versions');
      } else { if (!/^In both versions, .*\. In Version 1, .*, but in Version 2, .*\.$/.test(exp('same'))) fails.push('the sample of level 3 does not tell how the versions are alike and different');
        if (!diffs.some(([a, z]) => exp('same').endsWith(`In Version 1, ${a}, but in Version 2, ${z}.`)) || !both.some((x) => exp('same').startsWith(`In both versions, ${x}.`))) fails.push('the samples of the difference are not one difference of the two versions');
        if (!/^I like Version [12] better because /.test(exp('like'))) fails.push('the sample of level 3 does not name a version and a reason'); }
      if (isKey && notes.length !== 2) fails.push('the key does not mark its samples');
    }
  }
  if (mode === 'build') {
    const tb = one('[data-lcs-tiny]'), t = tb && I.talk[tb.dataset.lcsTiny];
    if (!t) { fails.push('no tiny story of the bank'); return fails; }
    if (txt(one('[data-lcs-passage]', tb)) !== straight(t.text)) fails.push('the tiny story is not printed as the bank has it');
    if (all('[data-lcs-stem]').map(txt).join('|') !== S.STEMS.join('|')) fails.push('the talk stems are not the ruled ones');
    need(S.LINES.pick);
    const rows = all('[data-lcs-comment]');
    if (rows.length !== N.comments[lv]) fails.push(`${rows.length} comments, not ${N.comments[lv]}`);
    const p = choiceRows(rows, N.replies[lv], 'comment');
    rows.forEach((r, i) => { const c = t.comments[+r.dataset.lcsComment]; if (!c || txt(one('[data-lcs-says]', r)).replace(/^[abc]\. /, '') !== `${c.name} said, "${straight(c.says)}"`) fails.push(`comment ${i + 1} is not the bank's`);
      // levels 1 and 2: wrong replies that change the subject; level 3 (SHOULD 21): one that changes the subject and the near
      // reply (about the story, not building on the idea)
      const os = all('[data-lcs-pill]', r).map((o) => straight(o.dataset.lcsOpt)), wr = c ? os.filter((o) => o !== straight(c.right)) : [];
      if (c && (r.dataset.lcsRight !== c.right || (lv === 3 ? !(wr.includes(straight(c.near)) && wr.some((o) => c.wrong.map(straight).includes(o))) : wr.some((o) => !c.wrong.slice(0, N.replies[lv] - 1).map(straight).includes(o))))) fails.push(`the replies of comment ${i + 1} are not the bank's`); });
    if (!p.some((x) => x < 0)) { const bad = placesBad(p, N.replies[lv]); if (bad) fails.push(`the right replies: ${bad} (${p.join('')})`); }
    if (!lensOk(rows)) fails.push('the length of the replies gives the answers away');
    if (lv === 3) { need(S.LINES.own.replace('{NAME}', t.own.name)); const o = one('[data-lcs-frame="own"]'); if (!o || straight(o.dataset.lcsExpect) !== straight(t.own.sample)) fails.push('the reply of level 3 is not keyed to the bank\'s sample'); if (isKey && (notes.length !== 1 || txt(notes[0]) !== S.REPLY_NOTE[0] + t.own.name + S.REPLY_NOTE[1])) fails.push('the key does not mark its sample'); }
    else if (one('[data-lcs-frame="own"]')) fails.push(`level ${lv} asks for a reply of the child's own`);
  }
  if (mode === 'card') {
    if (all('[data-lcs-stem]').map(txt).join('|') !== S.STEMS.join('|')) fails.push('the talk stems are not the ruled ones');
    const ml = all('[data-lcs-modelline]').map(txt), m = I.club.find((x) => x.lines.every((l, i) => ml[i] === `${l.name}: "${straight(l.text)}"`));
    if (ml.length !== 3 || !m) fails.push('the model talk is not one of the bank');
    else { const hd = all('[data-lcs-model] > span[data-lcs-read]').map(txt)[0]; if (hd !== `How a talk sounds (about ${m.about}):`) fails.push('the model talk does not say what story it is about'); }
    if (all('[data-lcs-stemused]').length !== 2) fails.push('the stems of the model talk are not marked');
    if (all('[data-lcs-label]').map(labelText).join('|') !== [`${S.LINES.before}: ${S.LINES.say}`, `${S.LINES.after}: ${S.LINES.built}`].join('|')) fails.push('the task lines of the talk card are not the ruled ones');
    if (!all('[data-lcs-head]').map(txt).includes(S.LINES.ask2)) fails.push('the talk card does not ask for a question');
    if (all('[data-lcs-checklist] [data-lcs-checkitem]').map(txt).join('|') !== S.TALK_CHECK.join('|')) fails.push('the talk checklist is not the ruled one');
    const frameOf = (k) => { const e = one(`[data-lcs-frame="${k}"]`); if (!e) return null; const st = one('[data-lcs-start]', e), en = one('[data-lcs-end]', e); return [st ? txt(st) : '', en ? txt(en) : '']; };
    // SHOULD 24: after the talk, whose idea, the idea, and what I said
    if (lv === 1) for (const k of ['think', 'because', 'wonder', 'built', 'idea', 'said']) { const f = frameOf(k); if (!f || f.join('|') !== S.CARD_F[k].join('|')) fails.push(`the frame "${k}" is not the frame of level 1`); }
    if (lv === 2) for (const k of ['think', 'wonder', 'built']) { const f = frameOf(k); if (!f || (k === 'built' ? f[0] || f[1] !== S.CARD_S[k] : f[0] !== S.CARD_S[k] || f[1])) fails.push(`the starter "${k}" is not the starter of level 2`); }
    if (lv === 3) for (const k of ['think', 'wonder', 'built']) { const f = frameOf(k); if (!f || f.some(Boolean)) fails.push(`the open rows of "${k}" carry a frame`); }
    if (isKey && notes.length !== 2) fails.push('the key does not say its answers (before and after the talk) are samples for any book');
  }
  return fails;
}

// ------------------------------------------------------------------ the item bank of the unit checks
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small, each card one
 *  task with its answer in its markup, the part of the text it is answered from printed on it at the page's size, and the
 *  text's id as data-lcs-text (form B takes another story, or another tale).
 *   arc (G2-576)       the BEGINNING of the story and "What problem do we learn about in the beginning?" with three answers
 *                      to circle: the problem and two events of the beginning that are no problem, chosen per story
 *                      (CHECK_ARC_LURES; review en.review-1119-read2: a middle event named girls the beginning does not
 *                      have, and a middle event that says the problem again would be right too on this card).
 *                      The sorting of sentences into B, M and E needs the whole story and stays out.
 *   voices (G2-578)    POINTS OF VIEW (review en.review-1119-read: a numbered line with the name beside it was a Grade 1
 *                      task): the paragraphs in which the characters show what they think, and one view of the page's
 *                      views task, "Who thinks this?" — the character's letter, or X for the view nobody in the story holds
 *                      (data-lcs-answer). The text id names the story and the answer: a part may take two views.
 *   FORMS: a page built for form A or B of a check reads only the stories, talks and tales of that form (CHECK_IDS).
 *   versions (G2-580)  a sentence of the page's chart about one pair of versions, and from each version the sentences
 *                      that tell what that row is about (the characters, the setting, the problem or the ending: every
 *                      sentence of the version that proves a fact of that kind BY ITSELF, naming the fact's own words),
 *                      and Version 1, Version 2 or Both to circle (level 3 also Neither). A fact is asked only when each
 *                      version that tells it proves it in such a sentence and the other names none of its words. The
 *                      options are words, as the chart's 1 and 2 would make a card of words a card of numbers. In a form
 *                      the card asked first is CHECK_VERSION's: a fact in other words than the versions' (review
 *                      en.review-1119-read2: finding the version's own phrase is no comparing), Version 1 in A, 2 in B. */
const CHECK_MODES = new Set(['arc', 'voices', 'versions']);
/** the stories, talks and tales of each form of the unit check: none in both forms (review en.review-1119-read) */
const CHECK_IDS = {
  A: { arc: ['kite', 'library', 'hamster', 'garden', 'lace', 'puppet', 'snow'], voices: ['rain', 'fish', 'hill', 'puppy', 'beach', 'broccoli', 'worms'], tales: ['pigs', 'gingerbread', 'hen'] },
  B: { arc: ['duckling', 'play', 'wagon', 'ball', 'picnic', 'paint', 'glasses', 'jar'], voices: ['slide', 'tent', 'drum', 'birdhouse', 'recess', 'soup', 'box'], tales: ['goats', 'mice', 'lion'] },
};
/** the statement each form asks first on the versions part (review en.review-1119-read2: both forms answered Version 2 and
 *  the statement repeated the version's words, "by a river", "on a farm": finding a phrase, not comparing): the same fact
 *  in other words, keyed to Version 1 in form A and Version 2 in form B. Pigs 0/1: the woods (many trees) and a meadow by a
 *  river; Lion 0/2: tall grass and a muddy river (near water). */
const CHECK_VERSION = {
  A: { pair: 'pigs:01', kind: 'setting', text: 'It happens where there are many trees.', status: 'V1' },
  B: { pair: 'lion:02', kind: 'setting', text: 'It happens near water.', status: 'V2' },
};
/** the two wrong answers of each story's problem card: events of the BEGINNING (the card prints the beginning only) that are
 *  no problem and do not say the problem again (review en.review-1119-read2: "The girls press the snow hard." named girls
 *  the beginning does not have, and read like a later solution). Hand-picked: "The snow is dry and powdery." is its cause,
 *  "Leo's shoe flops with every step." and "Mila cries that the show can't start." say it again. */
const CHECK_ARC_LURES = {
  kite: ['Nia and Grandpa take a kite to the park.', 'The wind lifts the kite above the pond.'],
  library: ['Malik and June eat breakfast.', 'Malik starts to worry.'],
  hamster: ['Priya feeds Nutmeg every morning.', 'Priya likes to watch Nutmeg run on his wheel.'],
  garden: ["Jada's class grows lettuce.", 'The class waters the rows every Friday.'],
  lace: ['Leo and Asha line up for a race.', 'Leo pulls his laces tight.'],
  puppet: ['Mila and Rafi put on a puppet show.', "Mila's puppet is a green dragon."],
  snow: ['Kira and her dad go out to build a snowman.', 'Kira stomps her boots.'],
  duckling: ['The ducks swim across the pond.', 'Peep peeps and peeps.'],
  play: ["Noemi's class puts on a play about the planets.", 'Noemi plays the sun.'],
  wagon: ['Hugo and his mom pull a wagon of pumpkins.', 'They are taking pumpkins to the farm stand.'],
  ball: ['Cora plays catch with Pickle.', 'Pickle paws at the fence.'],
  picnic: ["Dani's class plans a picnic.", 'They pack a blanket and cups.'],
  paint: ['Tomas paints a poster for the art show.', 'The poster shows a blue ocean.'],
  glasses: ['Yara and Grandpa sit down with a storybook.', 'Grandpa reaches for his glasses.'],
  jar: ['Gia and her dad make a fruit salad.', 'They need honey for the top.'],
};
/** the form a check page is built for: build-checks seeds its pages "check|<unit>|A…" or "…|B…"; none outside a check */
const checkFormOf = (ctx) => { const m = /^check\|[^|]+\|([AB])\d*\|/.exec(String((ctx && ctx.rng && ctx.rng.seed) || '')); return m ? m[1] : null; };
const VERSION_STOP = new Set(['a', 'an', 'the', 'is', 'are', 'there', 'in', 'on', 'of', 'by', 'to', 'it', 'him', 'her', 'them', 'they', 'he', 'she', 'his', 'and', 'part', 'happen', 'begin', 'tale', 'three', 'little', 'big', 'at', 'its', 'for', 'into', 'not', 'doe', 'do', 'with', 'from', 'up']);
const versionStem = (w) => w.toLowerCase().replace(/[’']s$/, '').replace(/(ing|ed|es|s)$/, '');
/** the paragraphs a points-of-view card of the check prints: those in which the characters show what they think, and every
 *  paragraph between two of them that one speaker says (review en.review-1119-write: "A Cold Day Inside" printed Ms. Webb's
 *  "We can play a moving game, too." and then her "Freeze dance!", the question "A moving game? Like what?" cut between) */
function voiceParas(s) {
  const shown = [...new Set(s.chars.flatMap((c) => s.views[c].paras))].sort((a, b) => a - b), out = [];
  // (one paragraph cut between them is printed; more than one would make the card taller than a check takes, "The Giant
  // Box": 351 px, so there the later of the two is left out where that speaker's view stands in another printed paragraph)
  let last = -1;
  shown.forEach((p, k) => {
    const q = last;
    if (k && p > q + 1 && s.paras[q].who && s.paras[q].who === s.paras[p].who) {
      if (p - q - 1 > 1 && s.views[s.paras[p].who] && s.views[s.paras[p].who].paras.some((x) => x !== p && out.includes(x))) return;
      for (let i = q + 1; i < p; i++) out.push(i);
    }
    out.push(p); last = p;
  });
  return out;
}
// (the rule, over the bank when the factory loads: no excerpt lets one speaker speak twice in a row across a cut)
{ const bad = (BANK.voices || []).filter((s) => { const v = voiceParas(s); return v.some((p, k) => k && p > v[k - 1] + 1 && s.paras[p].who && s.paras[p].who === s.paras[v[k - 1]].who); });
  if (bad.length) throw new Error('stories-compare-g2.en.json: the check excerpt of ' + bad.map((s) => s.id).join(', ') + ' lets one speaker speak twice in a row across a cut'); }
function scCheckPage(mode, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`stories-compare-g2 check: the stories are English stories (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const ok = (html) => html.replace(' data-lcs-ok="1"', ' data-lcs-ok="1" data-lcs-correct="1"');
  const ask = (q) => `<div data-lcs-checkq data-lcs-read style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${q}</div>`;
  const holder = (id, inner) => `<div data-lcs-text="${A(id)}" style="display:flex;flex-direction:column;gap:4px;padding:0 4px">${inner}</div>`;
  const cards = [];
  // (review en.review-1119-read) the stories, plays and tales of each form: none in both forms
  const form = checkFormOf(ctx);
  // (each with its copy number: plan() takes copy v from a fixed order of the bank, stepOf)
  const ofForm = (list, kind) => { const o = orderOf(list, kind); return list.map((x, i) => [x, o.indexOf(i) + 1]).filter(([x]) => !form || CHECK_IDS[form][kind].includes(x.id)); };
  // (review en.review-1119-read: only the beginning is printed, so the page's middle answer may be a second right one —
  // "The snow still crumbles.", "The rain does not stop.", "The lid still will not open."): the card's own three answers are
  // the problem, an ATTEMPT of the middle (an action, never the problem again) and an event of the beginning that is not a
  // reaction; the problem's length stands between the two others where the story allows it (no length tell)
  if (mode === 'arc') for (const [s] of shuffle(ofForm(BANK.arc, 'arc'), rng)) {
    const right = s.problem.text, lures = CHECK_ARC_LURES[s.id];
    if (!lures) continue;
    if (!lures.every((l) => s.ev.some((e) => e.p === 'b' && e.text === l && e.text !== right))) throw new Error('stories-compare-g2 check: a wrong answer of ' + s.id + ' is no event of its beginning');
    const opts = shuffle(lures, rng); opts.splice(rng.int(0, 2), 0, right);
    cards.push(holder(s.id, storyCard(s, ['b'], PASSAGE, 1.26) + ask(esc(LINES.q.problem)) +
      ok(`<div data-lcs-opts style="display:flex;flex-direction:column;align-items:flex-start;gap:0;padding-left:18px">${opts.map((o) => pill(o, o === right, key)).join('')}</div>`)));
  }
  // POINTS OF VIEW (RL.2.6; review en.review-1119-read: "who says the words marked 1" with the name beside the words was a
  // Grade 1 task): the paragraphs in which the characters show what they think, and one view of the page's views task —
  // whose is it? The letter of that character, or X when nobody in the story thinks it (the page's "nobody" view).
  if (mode === 'voices') for (const [s] of shuffle(ofForm(BANK.voices, 'voices'), rng)) {
    const letters = Object.fromEntries(s.chars.map((c) => [c, initialOf(c)]));
    const shown = voiceParas(s);
    const paras = shown.map((i) => `<div data-lcs-para="${i}" data-lcs-passage data-lcs-read style="font:700 ${PASSAGE}px/1.3 'Nunito',sans-serif;color:${T.ink}">${typo(esc(s.paras[i].t))}</div>`).join('');
    const legend = `<div data-lcs-read data-lcs-legend style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${s.chars.map((c) => teal(letters[c]) + ' = ' + esc(c)).join(' &nbsp;·&nbsp; ')} &nbsp;·&nbsp; ${teal('X')} = nobody</div>`;
    for (const [whose, view] of [...s.chars.map((c) => [c, s.views[c].text]), [null, s.nobody.text]]) {
      const want = whose ? letters[whose] : 'X';
      cards.push(holder(s.id + '|' + want, `<div data-lcs-excerpt style="display:flex;flex-direction:column;gap:1px;padding:4px 14px 6px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div data-lcs-stitle style="font:700 21px/1.15 'Baloo 2',cursive;color:${T.ink}">${esc(s.title)}</div>${paras}</div>` +
        ask(`Who thinks this? <b style="font-weight:800">${esc(view)}</b>`) +             // (the direction line says: write the letter, or X)
        `<div style="display:flex;align-items:center;gap:16px;padding-left:4px">${box1(want, key).replace('<span data-lcs-box', `<span data-lcs-answer="${want}" data-lcs-box`)}${legend}</div>`));
    }
  }

  // (review en.review-1119-read2) a form asks first the statement CHECK_VERSION plans, of its own tale and pair; the cards of
  // the page's facts stand after it with the same text id (a check page needs two cards; the check keeps the first)
  const vplan = mode === 'versions' && form ? CHECK_VERSION[form] : null;
  if (mode === 'versions') for (const [t] of (vplan ? [[BANK.tales.find((x) => x.id === vplan.pair.split(':')[0])]] : shuffle(ofForm(BANK.tales, 'tales'), rng))) {
    const pr = vplan ? PAIRS.find((x) => x.id === vplan.pair) : shuffle(PAIRS.filter((x) => x.t === t), rng)[0], V = [pr.x, pr.y];
    const words = (s) => String(s).split(/\s+/).filter(Boolean).length;
    // a fact's own words (not "the tale", "it happens", "three little"): the sentence that proves it names every one of them
    // ("Three little pigs lived in the woods." proves "There are three little pigs."; '"Not I," said the cat.' does not prove
    // "A cat, a dog, and a duck say no.", and '"I'm going to eat you up!"' does not prove "Someone at the bridge wants to
    // stop them" without the rest of the tale)
    const own = (s) => (String(s).match(/[A-Za-z’']+/g) || []).map(versionStem).filter((w) => w.length > 1 && !VERSION_STOP.has(w));
    const selfProof = (f, vi) => { const p = f.proof && f.proof[vi]; if (!p || t.versions[vi].text.indexOf(p) < 0) return false; const w = new Set(own(p)); return own(f.text).every((x) => w.has(x)); };
    // from each version: the sentences that prove BY THEMSELVES a fact of this kind it tells, in the order of the version
    const told = (kind, vi) => { const text = t.versions[vi].text; return [...new Set(t.facts.filter((f) => f.kind === kind && (f.in || []).includes(vi) && selfProof(f, vi)).map((f) => f.proof[vi]))].sort((a, b) => text.indexOf(a) - text.indexOf(b)); };
    const OPTS = lv === 3 ? ['Version 1', 'Version 2', 'Both', 'Neither'] : ['Version 1', 'Version 2', 'Both'];
    const want = { V1: 'Version 1', V2: 'Version 2', Both: 'Both', Neither: 'Neither' };
    const vcard = (kind, text, status, both) => holder(t.id, `<div data-lcs-excerpt data-lcs-pair="${pr.id}" style="display:flex;flex-direction:column;gap:3px;padding:5px 12px 7px;border:2.5px solid ${T.creamDeep};border-radius:16px;background:#FFFFFF"><div data-lcs-tale style="font:700 20px/1.15 'Baloo 2',cursive;color:${T.ink}">Two versions of ${esc(t.tale)}: ${esc(KIND_NAME[kind].toLowerCase())}</div>` +
        `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">${both.map((ss, i) => `<div data-lcs-version="${i + 1}" style="display:flex;flex-direction:column;gap:1px"><span data-lcs-vhead style="font:800 ${READ}px/1.2 'Nunito',sans-serif;color:${T.teal}">Version ${i + 1}</span><span data-lcs-passage data-lcs-read style="font:700 ${PASSAGE}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(ss.join(' '))}</span></div>`).join('')}</div></div>` +
        ask(`${esc(text)} <span style="font-weight:600">${lv === 3 ? 'Circle Version 1, Version 2, Both, or Neither if no version tells it.' : 'Which version tells it? Circle Version 1, Version 2, or Both.'}</span>`) +
        ok(`<div data-lcs-opts style="display:flex;gap:10px;padding-left:18px">${OPTS.map((o) => pill(o, o === want[status], key)).join('')}</div>`));
    if (vplan) cards.push(vcard(vplan.kind, vplan.text, vplan.status, V.map((vi) => told(vplan.kind, vi))));
    let taken = 0;
    for (const f of shuffle(factsOf(pr), rng)) {
      if (!OPTS.includes(want[f.status]) || taken >= 3) continue;
      const both = V.map((vi) => told(f.kind, vi)), mine = own(f.text);
      if (both.some((x) => !x.length || words(x.join(' ')) > 40)) continue;
      // a version that tells the fact proves it in its own sentence; a version that does not names none of its words
      if (V.some((vi, i) => ((f.in || []).includes(vi) ? !selfProof(f, vi) : own(both[i].join(' ')).some((w) => mine.includes(w))))) continue;
      taken++;
      cards.push(vcard(f.kind, f.text, f.status, both));
    }
  }
  return { bodyHtml: STYLE + `<div data-lcs-scg2check="${mode}|${lv}" data-lcs-noliga="on"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}">` + fRoom(typo(checkGrid(cards, { cols: 1 }))) + `</div>`, meta: {} };
}

module.exports = { makeStoriesCompareType, scFaultsOf, plan, LEVELS, INSTR, LINES, TITLE, SPEC, PAIRS, factsOf };
