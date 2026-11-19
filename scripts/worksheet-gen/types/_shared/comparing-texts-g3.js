/**
 * comparing-texts-g3.js — nine Grade 3 pages of the unit "Point of View and Comparing Texts" (English literacy year,
 * Daily Teaching System Part 12.3, 2026-11-19; reviewed twice by US Grade 3 reading specialists 2026-11-17, every
 * finding applied). The texts are data/literacy/comparing-texts-g3.en.json (written by the scratch script
 * ii-g3pov/bank.js; every play, poem, story and information text is written for this bank). PDF only, letter portrait,
 * no picture. Themeless: a copy is another text (or the same text with other questions).
 *
 *   stage      G3-572 Scenes and Stanzas (RL.3.5, day 1): a short play in two scenes side by side (a cast list, each
 *              scene heading on one line with its stage direction) over a poem of three stanzas side by side (boxes as
 *              wide as their lines; no line wraps). Level 1: four questions to circle ("In which scene ...?", "In
 *              which stanza ...?", "What happens in Scene 2 that could not happen without Scene 1?" and "What does
 *              Stanza 3 add to the poem?" with three sentences each; the poems that fit side by side at 16 px). Level
 *              2: a stanza question circled (and a scene question where the play is short); the two "build" questions
 *              written on the frames "In Scene 2, ___ because in Scene 1, ___." and "In Stanza 3, ___." Level 3:
 *              "What does Stanza 3 add" written and Scene 3 of the play on seven lines at the least (where it happens
 *              in parentheses, four speeches with the names of the cast, the key's note, one to spare).
 *   chapters   G3-573 Chapters: How Parts Build (RL.3.5, day 2): a story in three titled chapters; no chapter question
 *              can be answered from a chapter title (the bank is checked). Level 1: three "In which chapter ...?"
 *              questions and the two build questions with three sentences each. Level 2: one chapter question, the
 *              build questions written on the frames "In Chapter 2, ___ because in Chapter 1, ___." Level 3: a chart
 *              of what happens in each chapter, one build question written, one chapter question.
 *   teller     G3-574 Who Is Telling the Story? (RL.3.6, day 1): a story in three numbered paragraphs, told in the first
 *              person by a character (seven stories) or by a narrator outside the story (five). "Who is telling the
 *              story?" with the rule "Words in quotation marks are what a character says." under it (every level).
 *              Level 1: circle the teller, "Who thinks this?" (three), "What do YOU think?" on the frame "I think ___
 *              because ___." Level 2: the same with a circled "How do you know?" and four "Who thinks this?". Level
 *              3: the teller (the key says what else is right) and how you know written, three "Who thinks this?",
 *              the own view written.
 *   views      G3-575 Their View and My View (RL.3.6, day 2): the same stories; the page asks about one character.
 *              Level 1: circle what the character thinks and the sentence that shows it, write what you think (the
 *              question printed, the frame). Level 2: a chart of three parts (the character and the other character
 *              side by side, "What I think" across under them with its question printed and the frame) and a sentence
 *              of the story copied as proof. Level 3: the chart of the character and me, the proof, one paragraph
 *              retold by another character. The cells of a chart row get the same number of rows of room.
 *   literal    G3-576 Literal or Nonliteral? (L.3.5.a): sentences with one bold phrase, literal in some and nonliteral in
 *              others. Level 1: six sentences, circle literal or nonliteral and the meaning. Level 2: eight sentences,
 *              L or N in a box and the meaning written. Level 3: six as Level 2 and two sentences of the child's own.
 *              Levels 2 and 3: one key line under the task line.
 *   storysort  G3-577 Two Stories by One Author (RL.3.9, day 1): two short stories about the same characters by one
 *              (invented) author, side by side; circle Story 1, Story 2, or Both. Level 1: seven sentences. Level 2:
 *              eight and one sentence finished on the frame "In both stories, ___." Level 3: five, then "In both
 *              stories, ___." and "In Story 1, ___, but in Story 2, ___."
 *   storychart G3-578 Compare Two Stories (RL.3.9, day 2): a chart (setting, problem, how it is solved, lesson) for each
 *              story. Level 1: the setting and problem of one story printed as gray examples, eight strips to letter
 *              into the boxes (two in neither story). Level 2: the gray examples and six cells written. Level 3: all
 *              eight cells written (no examples). Levels 2 and 3: one key line under the chart; the pair whose lesson
 *              needs four lines of a cell is left out.
 *   textsort   G3-579 Two Texts on One Topic (RI.3.9, day 1): two information texts side by side and a two-circle
 *              diagram. Level 1: eight fact strips. Level 2: ten (two in neither text, crossed out). Level 3: ten (two
 *              in neither) and a sentence of the child's own on how the texts are different.
 *   textchart  G3-580 Compare Two Texts (RI.3.9, day 2): the same pairs. Level 1: circle the most important point of
 *              each text among its own point and two details of the same text (every detail names what the point
 *              names; the point is the longest of its three on about half the copies and the shortest on some; no
 *              point repeats a word of its title), and the key detail both texts give. Level 2: a chart of the point
 *              and one more detail of each text, and something both texts tell. Level 3: a chart of one part (the
 *              point, or a key detail on the next copy of a pair) and how the texts are alike AND how they are
 *              different. Levels 2 and 3: one key line under the chart.
 *
 * Rules every page keeps (the reviews of the earlier batches, PLAN.md literacy G to CC, and the two reviews of this
 * batch): one right answer; answer places in no pattern; word length gives nothing away; ONE writing row height on
 * every page (36 px, rows never spread apart); the lines of an answer hold its sample key at 15.5 px a letter with one
 * line to spare, chart cells too, and no answer gets more lines than that; a key answer fits its line; every open
 * answer in the key is marked as a sample and says what else is right (in one size); the easier levels give sentence
 * frames; every passage at 15.5 px at the least (16 on Level 1, 17.5 at the most), set as large as its copy's room
 * allows; no blank band higher than 40 px anywhere a reader looks (between the tasks and INSIDE every box); typographic
 * apostrophes and quotes; ligatures off and an f before i, f, l, t or a t before t with room of its own. verify()
 * carries its own copy of every ruled text and measure. English only. The bank is checked when this file loads
 * (faultsOf): among the rest, the sentence of each story or text that states each strip, and the examples only the
 * teacher's notes use.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/comparing-texts-g3.en.json');
const { _parts } = require('./info-text.js');
const { W, shuffle } = _parts;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ROWH = 36;          // ONE writing row on every page (Grade 3: one baseline); rows stand at this pitch, never spread
const HAND = 15.5;        // px a third grader needs for one letter (a full line of 620 px holds 40 letters)
const BAND = 40;          // no blank band higher than this, between the tasks or inside a box
const MARKBOX = 36;       // a box for one letter
const KEYPX = 17;         // the key's font on a line (0.56 em a letter)
const NOTEPX = 14;        // ONE size for every line of the key that says what else is right (finding 40)
const STARTPX = 15.5;     // the printed words of a sentence frame
const STARTEM = 0.6;      // their width a letter (estimate; verify() measures the room that is left)
const MODES = ['stage', 'chapters', 'teller', 'views', 'literal', 'storysort', 'storychart', 'textsort', 'textchart'];
const OUTSIDE = 'a narrator who is not in the story';
const HOW = ['The narrator says I and my.', 'The narrator does not say I or my outside quotation marks.'];
const ROWS = ['setting', 'problem', 'solution', 'lesson'];
const ROWNAME = { setting: 'Setting', problem: 'Problem', solution: 'How it is solved', lesson: 'Lesson' };
const SRC = ['Story 1', 'Story 2', 'Both'];
const REGION = ['Only Text 1', 'Both texts', 'Only Text 2'];

/** the page instruction of every level (registered as strings with add-strings.js; verify() has its own copy) */
const INSTR = {
  stage: { 1: 'A play is divided into scenes. A poem is divided into stanzas.', 2: 'Each scene and each stanza builds on the parts before it.', 3: 'A new scene builds on what happened in the scenes before it.' },
  chapters: { 1: 'A long story is divided into parts called chapters.', 2: 'Each chapter builds on what happened in the chapter before.', 3: 'Tell what happens in each chapter and how the parts connect.' },
  teller: { 1: 'The narrator is the one who tells the story.', 2: 'A narrator who says I and my is a character in the story.', 3: 'You can think differently from the characters in a story.' },
  views: { 1: 'Characters in a story can think differently from you.', 2: 'Tell what a character thinks, then tell what you think.', 3: 'Tell a part of the story the way another character would.' },
  literal: { 1: 'Literal words mean just what they say. Nonliteral words do not.', 2: 'A nonliteral phrase means something different from its words.', 3: 'Use the sentence to tell if a phrase is literal or nonliteral.' },
  storysort: { 1: 'One author can write two stories about the same characters.', 2: 'Find what is alike and different in the two stories.', 3: 'Compare the settings, plots, and lessons of two stories.' },
  storychart: { 1: 'Stories by one author can have different settings and problems.', 2: 'Compare the setting, problem, solution, and lesson of each story.', 3: 'Compare the two stories part by part, with no examples to help.' },
  textsort: { 1: 'Two texts on one topic can tell different facts.', 2: 'Some facts are in one text, and some are in both texts.', 3: 'Compare the facts in two texts on the same topic.' },
  textchart: { 1: 'Each text has its own most important point.', 2: 'Compare the most important points and key details.', 3: 'Tell how two texts on one topic are alike and different.' },
};
/** the task lines (fixed texts; {x} is filled from the text of the page) */
const LINES = {
  circle: 'Circle the answer to each question.',
  circleWrite: 'Circle or write the answer to each question.',
  build: 'What happens in Scene 2 that could not happen without Scene 1?',
  adds: 'What does Stanza 3 add to the poem?',
  scene3: 'Write Scene 3. First write where it happens, in parentheses. Then write four lines for the characters to say. Use the names in the cast.',
  build2: 'How does Chapter 2 build on Chapter 1?',
  build3: 'How does Chapter 3 build on Chapter 2?',
  happens: 'Write what happens in each chapter.',
  tell: 'Who is telling the story? Circle the answer.',
  tellWrite: 'Who is telling the story?',
  quoteNote: 'Words in quotation marks are what a character says.',
  howCircle: 'How do you know? Circle the answer.',
  howKnow: 'How do you know?',
  thinks: 'Who thinks this? Circle the name.',
  own: 'What do YOU think? Write your idea and a reason.',
  viewQ: 'What does {x} think? Circle the answer.',
  proofQ: 'Which sentence from the story shows what {x} thinks? Circle it.',
  viewHead: 'What {x} thinks',
  myHead: 'What I think',
  proofCopy: 'Copy a sentence from the story that shows what {x} thinks.',
  rewrite: 'Tell paragraph {x} the way {y} would tell it. Use I and my.',
  lit1: 'Is the bold phrase literal or nonliteral? Circle one. Then circle what it means here.',
  lit2: 'Write L (literal) or N (nonliteral). Then write what the bold words mean here.',
  litOwn: 'Choose two sayings from the box. Write a sentence for each that uses it nonliterally.',
  means: 'It means:',
  sort: 'Which story tells this? Circle Story 1, Story 2, or Both.',
  alike: 'How are the two stories alike? Finish the sentence.',
  differ: 'How are the two stories different? Finish the sentence.',
  strips: 'Write the letter of each strip in its box. Cross out the two strips that are in neither story.',
  chart: 'Fill in the chart for each story. The gray words are examples.',
  chartAll: 'Fill in every box of the chart for each story.',
  venn: 'Write the letter of each fact in the right part of the diagram.',
  vennNeither: 'Write the letter of each fact in the right part. Two facts are in neither text: cross them out.',
  textDiffer: 'How are the two texts different? Write a sentence.',
  textAlike: 'How are the two texts alike? Write a sentence.',
  main1: 'What is the most important point of Text 1?',
  main2: 'What is the most important point of Text 2?',
  bothQ: 'Which key detail do both texts give?',
  tcChart: 'Fill in the chart for each text.',
  rowMain: 'Most important point',
  rowDetail: 'A key detail',
  rowOnly: 'A detail only this text gives',
  bothNote: 'Something both texts tell:',
};
/** the printed words of the sentence frames (Levels 1 and 2); the child writes after them */
const FRAME = {
  build: ['In Scene 2,', 'because in Scene 1,'],
  build2: ['In Chapter 2,', 'because in Chapter 1,'],
  build3: ['In Chapter 3,', 'because in Chapter 2,'],
  adds: ['In Stanza 3,'],
  own: ['I think', 'because'],
  alike: ['In both stories,'],
  differ: ['In Story 1,', 'but in Story 2,'],
};
/** what the key says is also right, for each kind of open answer (rule 4: the key says what else is right) */
const NOTE = {
  build: 'Accept any answer that names what the earlier part made happen.',
  build2: 'Accept any answer that names what the earlier part made happen.',
  build3: 'Accept any answer that names what the earlier part made happen.',
  adds: 'Accept any answer that names what Stanza 3 adds.',
  happens: 'Any words that tell what happens.',
  own: 'Any idea with a reason is right.',
  how: 'Accept any answer about the words I and my.',
  view: 'Any words that tell this view.',
  proof: 'Any sentence that shows this view.',
  rewrite: 'Any retelling with I and my that keeps what happens.',
  ownSaying: 'Any sentence that uses the saying nonliterally.',
  alike: 'Any way the stories are alike is right.',
  differ: 'Any way the stories are different is right.',
  lesson: 'Any lesson the story shows.',
  main: 'Any words that give the main point.',
  detail: 'Any key detail of this text.',
  only: 'Any detail that only this text gives.',
  both: 'Any fact that both texts give.',
  textAlike: 'Any way the texts are alike is right.',
  textDiffer: 'Any way the texts are different is right.',
  scene3: 'Any four lines with names from the cast that follow from Scene 2.',
};
/** key lines that stand once over a task (on the child's page the same room stays empty) */
const KEYONLY = {
  chartNotes: '(The notes are samples: any words that tell the same setting, problem, solution, or lesson are right.)',
  meanings: '(Any words with the same meaning are right.)',
  tcNotes: '(The notes are samples: any words that give the same point or detail are right.)',
};

/* ---------------------------------------------------------------- the levels ---------------------------------------------------------------- */
// font: the poem / story / text paragraphs; pfont: the lines of the play; ownN: the lines of the child's own view (one
// more to spare where the page has the room)
const LEVELS = {
  stage: { 1: { pwhere: 1, swhere: 1, build: 'choose', adds: 'choose', font: 16, pfont: 16, poems: ['seed', 'ant', 'maple', 'tooth'] }, 2: { pwhere: 0, pwhereShort: true, swhere: 1, build: 'frame', adds: 'frame', font: 15.5, pfont: 15.5 }, 3: { pwhere: 0, swhere: 0, build: null, adds: 'write', scene3: true, font: 15.5, pfont: 15.5, plays: ['library-book', 'lost-mitten', 'goalie', 'bird-feeder', 'new-student', 'kite'] } },
  chapters: { 1: { where: 3, builds: ['build2', 'build3'], answer: 'choose', font: 16.5 }, 2: { where: 1, builds: ['build2', 'build3'], answer: 'frame', font: 15.5 }, 3: { where: 1, builds: null, answer: 'write', chart: true, font: 15.5 } },
  teller: { 1: { tell: 'choose', how: null, thinks: 3, own: 'frame', font: 17.5 }, 2: { tell: 'choose', how: 'choose', thinks: 4, own: 'frame', font: 15.5, lh: 1.36 }, 3: { tell: 'write', how: 'write', thinks: 3, own: 'write', font: 15.5, lh: 1.36 } },
  views: { 1: { answer: 'choose', own: 'frame', font: 17.5 }, 2: { answer: 'chart', own: 'frame', font: 17.5 }, 3: { answer: 'chart', own: 'write', rewrite: true, font: 15.5, lh: 1.32 } },
  literal: { 1: { n: 6, answer: 'choose', font: 17.5, pill: 16.5 }, 2: { n: 8, answer: 'write', font: 17.5 }, 3: { n: 6, answer: 'write', own: true, font: 16.5 } },
  storysort: { 1: { n: 7, font: 17.5, row: 16.5, tw: 0.5 }, 2: { n: 8, alike: true, font: 15.5, row: 15.5 }, 3: { n: 5, alike: true, differ: true, font: 15.5, row: 15.5 } },
  storychart: { 1: { answer: 'strips', examples: true, font: 16, tw: 0.5 }, 2: { answer: 'write', examples: true, font: 15.5, skip: ['dot'] }, 3: { answer: 'write', examples: false, font: 15.5, skip: ['dot'] } },
  textsort: { 1: { n: 8, neither: 0, font: 17.5, tw: 0.5 }, 2: { n: 8, neither: 2, font: 16, tw: 0.5 }, 3: { n: 8, neither: 2, differ: true, font: 15.5 } },
  textchart: { 1: { answer: 'choose', font: 16 }, 2: { answer: 'chart', bottom: 'both', font: 15.5 }, 3: { answer: 'chart', bottom: 'compare', font: 16.5 } },
};

/* ---------------------------------------------------------------- small helpers ---------------------------------------------------------------- */
const wordsIn = (s) => String(s).split(/\s+/).filter(Boolean).length;
const tokens = (text) => (String(text).toLowerCase().replace(/[‘’]/g, "'").match(/[a-z]+(?:'[a-z]+)?/g) || []);
const STOP = new Set('a an the of in on to and at by for with from is are was be do does did which chapter it its her his he she they their them who what that this up out so as or not but into has have had can will one all very there then when how say says i my me we our you your'.split(' '));
const stem = (w) => w.replace(/'s$/, '').replace(/(ing|ed|es|s|y|e)$/, '');
/** the content words of a text (stems; no small words) */
const content = (text) => tokens(text).filter((t) => t.length >= 3 && !STOP.has(t)).map(stem);
/** a sentence names one of the nouns in its first n words (stems; "A sea turtle's" names turtle) */
const namesTopic = (text, nouns, n) => tokens(text).slice(0, n).some((t) => nouns.some((x) => stem(t) === stem(x) || stem(t) === x || stem(t).startsWith(stem(x))));
/** the content words two texts share (one stem the start of the other counts, from four letters on) */
const sharedWords = (a, b) => { const B = content(b); return content(a).filter((x) => B.some((y) => x === y || (x.length >= 4 && y.length >= 4 && (x.startsWith(y) || y.startsWith(x))))); };
const staircase = (idx) => idx.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1));
const alternating = (p, m) => m === 2 && p.length >= 3 && p.every((x, i) => !i || x !== p[i - 1]);
const placeMax = (n, m) => Math.ceil((m === 2 ? 0.6 : 0.5) * n);
const tooMany = (p, m) => p.length >= 4 && Math.max(...Array.from({ length: m }, (_, k) => p.filter((x) => x === k).length)) > placeMax(p.length, m);
const triple = (p) => p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2]);
/** a block of two, three or four places repeated to the end (0 2 1 0 2 1) */
const repeats = (p) => [2, 3, 4].some((b) => p.length >= 2 * b && p.every((x, i) => i < b || x === p[i - b]));
/** a list of answer places (0 .. m-1) is free of every pattern the reviews named */
const placesOk = (p, m) => !(p.length >= 2 && new Set(p).size < Math.min(p.length, m, 2)) && !(p.length >= 3 && new Set(p).size === 1) && !staircase(p) && !alternating(p, m) && !tooMany(p, m) && !triple(p) && !repeats(p);
/** places among m for n answers in no pattern */
function places(n, m, rng) { for (let k = 0; k < 800; k++) { const p = Array.from({ length: n }, () => rng.int(0, m - 1)); if (n >= 3 && new Set(p).size < Math.min(n, m)) continue; if (placesOk(p, m)) return p; } throw new Error(`no places for ${n} answers among ${m}`); }
/** how many rows have the right one strictly the longest / strictly the shortest */
const lengthTells = (rows) => ({ longest: rows.filter((r) => r.opts.every((o) => o === r.right || o.length < r.right.length)).length, shortest: rows.filter((r) => r.opts.every((o) => o === r.right || o.length > r.right.length)).length });
const lengthOk = (rows) => { const lt = lengthTells(rows); return lt.longest <= Math.floor(rows.length / 2) && lt.shortest <= Math.floor(rows.length / 2); };
/** where the right one stands by length among its choices: 'L' the strictly longest, 'S' the strictly shortest, else 'M' */
const lengthRole = (right, opts) => (opts.every((o) => o === right || o.length < right.length) ? 'L' : opts.every((o) => o === right || o.length > right.length) ? 'S' : 'M');
/** a fixed order of a list (by a key: the same on every copy) */
const order = (n, key) => makeRng(key).shuffle(Array.from({ length: n }, (_, i) => i));
/** copy v of a level shows set ((v-1) mod n) of a fixed order; visit = how often the order went round before */
const nth = (n, key, variant) => { const v = (Number(variant) || 1) - 1; return { at: order(n, key)[v % n], visit: Math.floor(v / n) }; };
/** a window of k items of a fixed order of a list, turned on by `step` places on every visit */
const rot = (list, key, visit, k, step) => { const o = order(list.length, key).map((i) => list[i]); const s = (visit * step) % Math.max(1, o.length); return Array.from({ length: k }, (_, j) => o[(s + j) % o.length]); };
/** the advance widths of the page's font (Nunito 600) at 100 px, measured on the page (scratch charw.js) */
const NW = {"0":60,"1":60,"2":60,"3":60,"4":60,"5":60,"6":60,"7":60,"8":60,"9":60," ":26.4,"!":23.7,"\"":41.7,"%":93.7,"&":70.8,"'":23.1,"(":33.6,")":33.6,",":23.7,"-":42.9,".":23.7,"/":25.6,":":23.7,";":23.7,"?":45.8,"A":73.6,"B":68.2,"C":65.5,"D":75.1,"E":58.9,"F":55.4,"G":73.1,"H":76.7,"I":26.8,"J":31.9,"K":64.3,"L":55.2,"M":86.1,"N":74.3,"O":77.5,"P":64.2,"Q":77.5,"R":67.7,"S":62.2,"T":62.3,"U":73.3,"V":70,"W":110.7,"X":66,"Y":60.9,"Z":59.6,"a":53.7,"b":59.1,"c":45.8,"d":59.1,"e":53.7,"f":32.9,"g":59.4,"h":57.6,"i":24.3,"j":24.6,"k":51.6,"l":30.6,"m":86.6,"n":57.6,"o":56.5,"p":59.1,"q":59.1,"r":37.3,"s":48.4,"t":34.6,"u":56.9,"v":54.7,"w":87.3,"x":53.4,"y":54.7,"z":46.8};
/** the lines of a paragraph at px in a width w (word by word, as the page wraps it; about one line either way) */
const wrapLines = (text, px, w, indent = 0) => { const sp = (NW[' '] * px) / 100; let n = 1, x = indent, first = true; for (const word of String(text).split(/\s+/).filter(Boolean)) { const ww = (([...word].reduce((t, c) => t + (NW[c.replace(/[‘’]/, "'")] || 56), 0) + 7 * (word.match(/f(?=[iflt])|t(?=t)/g) || []).length) * px) / 100; if (!first && x + sp + ww > w) { n++; x = ww; } else x += (first ? 0 : sp) + ww; first = false; } return n; };
/** the room (CSS px) the two texts of a pair have on a level (the page less its other tasks at their tallest, 12 px
 *  kept), and the size that fills it: the largest of 17.5, 17, ... 15.5 (16 on Level 1) whose taller text fits (a text
 *  card: 73 px of its own and the lines at 1.32) */
const TEXTROOM = { storysort: { 1: 478, 2: 358, 3: 320 }, storychart: { 1: 407, 2: 300, 3: 300 }, textsort: { 1: 517, 2: 446, 3: 333 }, textchart: { 1: 385, 2: 336, 3: 372 } };
const textsFont = (texts, mode, lv, room = TEXTROOM[mode][lv], lh = 1.32) => { const min = lv === 1 ? 16 : 15.5; for (let f = 17.5; f > min; f -= 0.5) { if (67 + Math.max(...texts.map((x) => x.paras.reduce((n, p) => n + wrapLines(p, f, 312, 12), 0))) * f * lh <= room) return f; } return min; };
/** the height a story of the point-of-view pages fills on a level (its room: the page less its other tasks at their
 *  tallest), and the line spacing that fills it (Levels 1 and 2 never closer than the level's own; Level 3 of the views
 *  page a little closer where a long story needs it). The rest of the room goes between the paragraphs. */
const STORYFIT = { teller: { 1: 345, 2: 241 }, views: { 1: 366, 2: 317, 3: 236 } };
const storyLh = (s, d, mode, lv, room) => { const base = d.lh || 1.42, T = room || (STORYFIT[mode] || {})[lv]; if (!T) return base; const lines = s.paras.reduce((n, p, i) => n + wrapLines((i + 1) + '  ' + p, d.font, 627), 0); const lh = (T - 64) / (lines * d.font); return Math.round(100 * Math.max(lv === 3 ? 1.26 : base, Math.min(room ? 1.85 : 1.65, lh))) / 100; };
/** the estimated rows of the longer scene of a play (15.5 px in a scene of 296 px; a short play leaves room) */
const playRows = (p) => { const tl = (x) => Math.max(1, Math.ceil((x.length * 15.5 * 0.5) / 296)); return Math.max(...p.scenes.map((sc) => tl('Scene 1 (' + sc.set + ')') + sc.lines.reduce((n, l) => n + tl(l.who + ': ' + (l.dir ? '(' + l.dir + ') ' : '') + l.say), 0))); };
const lcFirst = (s) => s[0].toLowerCase() + s.slice(1);
/** the words of a text outside quotation marks (what the narrator says) */
const narration = (text) => String(text).replace(/"[^"]*"/g, ' ');
const quoted = (text) => (String(text).match(/"[^"]*"/g) || []).join(' ');
/** the child's own view as one sentence (Level 3) */
const ownFull = (o) => `I think ${o.think} because ${o.why}.`;
/** the sample of "How do you know?" (Level 3 of G3-574) */
function howSample(s) {
  if (s.person === 'first') return 'The narrator says I and my.';
  const nar = tokens(narration(s.paras.join(' '))), pr = ['he', 'she'].filter((p) => nar.includes(p));
  const q = tokens(quoted(s.paras.join(' '))), qi = [q.some((t) => /^i('|$)/.test(t)) ? 'I' : null, q.includes('my') ? 'my' : null, q.includes('me') ? 'me' : null].filter(Boolean);
  return `The narrator says ${pr.join(' and ') || 'the names'}, not I.` + (qi.includes('I') ? ' The I words are in quotation marks.' : qi.length ? ` The word ${qi[0]} is in quotation marks.` : '');
}

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
function faultsOf(b) {
  const f = [];
  const one = (s, max) => typeof s === 'string' && s.length > 1 && s.length <= max && /^[A-Z"']/.test(s);
  const threeOk = (where, right, wrong, max) => { const o = [right, ...(wrong || [])]; if (o.length !== 3 || new Set(o).size !== 3 || o.some((x) => !one(x, max))) f.push(`${where}: not one right and two different wrong choices of ${max} letters or fewer`); };
  // a frame's parts fit the lines after their printed words (max: the letters of each part; the second part follows the
  // longer printed words "because in Scene 1," or "but in Story 2,")
  const frameOk = (where, fr, max) => { if (!Array.isArray(fr) || fr.length !== max.length || fr.some((x, i) => !x || x.length > max[i] || /[.!?]$/.test(x))) f.push(`${where}: no frame of ${max.length} parts of ${max.join(' and ')} letters or fewer (without an end mark)`); };
  // ---- plays and poems
  if ((b.plays || []).length < 8 || (b.poems || []).length < 8) f.push('stage: fewer than eight plays or eight poems');
  (b.plays || []).forEach((p) => {
    const w = `play ${p.id}`;
    if (!p.title || p.cast.length < 2 || p.cast.length > 3 || p.scenes.length !== 2) f.push(`${w}: no title, not two or three in the cast, or not two scenes`);
    const tags = p.cast.map((c) => c.tag);
    p.scenes.forEach((s, i) => { if (!s.set || s.lines.length < 3 || s.lines.length > 5) f.push(`${w} scene ${i + 1}: no stage direction or not three to five lines`); s.lines.forEach((l) => { if (!tags.includes(l.who) || !l.say || l.say.length > 60 || (l.dir && l.dir.length > 26)) f.push(`${w}: a line of "${l.who}" is not of the cast, or too long`); }); });
    if (tags.some((t) => !p.scenes.some((s) => s.lines.some((l) => l.who === t)))) f.push(`${w}: a member of the cast never speaks`);
    if ((p.where || []).length < 4 || [1, 2].some((a) => p.where.filter((q) => q.a === a).length < 2) || p.where.some((q) => !/^In which scene .+\?$/.test(q.q))) f.push(`${w}: not two "In which scene" questions for each scene`);
    threeOk(`${w} build`, p.build.right, p.build.wrong, 58);
    if (!p.build.sample || p.build.sample.length > 40) f.push(`${w}: the build sample is missing or longer than 40 letters`);
    frameOk(`${w} build`, p.build.frame, [32, 26]);
    const s3 = p.scene3 || {};
    if (!s3.set || ('(' + s3.set + ')').length > 38 || (s3.lines || []).length !== 4 || s3.lines.some((l) => !tags.includes(l.who) || (l.who + ': ' + l.say).length > 52)) f.push(`${w}: the sample Scene 3 is not a place of 38 letters or fewer and four lines of the cast of 52 letters or fewer`);
  });
  (b.poems || []).forEach((p) => {
    const w = `poem ${p.id}`;
    if (!p.title || p.stanzas.length !== 3 || p.stanzas.some((s) => s.length !== 4 || s.some((l) => !l || l.length > 31))) f.push(`${w}: not three stanzas of four lines of 31 letters or fewer`);
    if ((p.where || []).length < 4 || new Set(p.where.map((q) => q.a)).size !== 3 || p.where.some((q) => !/^In which stanza .+\?$/.test(q.q))) f.push(`${w}: not four "In which stanza" questions with all three stanzas as answers`);
    threeOk(`${w} adds`, p.adds.right, p.adds.wrong, 58);
    if (!p.adds.sample || p.adds.sample.length > 40 || !/^The /.test(p.adds.sample)) f.push(`${w}: the adds sample is missing, longer than 40 letters, or does not begin with "The" (the frame "In Stanza 3, the ...")`);
  });
  // ---- stories in chapters
  if ((b.chapters || []).length < 8) f.push('chapters: fewer than eight stories');
  (b.chapters || []).forEach((s) => {
    const w = `chapters ${s.id}`;
    const n = wordsIn(s.chapters.map((c) => c.text).join(' '));
    if (s.chapters.length !== 3 || n < 95 || n > 160) f.push(`${w}: not three chapters of 95 to 160 words in all (${n})`);
    if (s.where.length !== 6 || [1, 2, 3].some((a) => s.where.filter((q) => q.a === a).length !== 2) || s.where.some((q) => !/^In which chapter .+\?$/.test(q.q))) f.push(`${w}: not two "In which chapter" questions for each chapter`);
    // no chapter question can be answered from a chapter title (finding 18): it shares no content word with any title
    s.where.forEach((q) => s.chapters.forEach((c) => { const sh = sharedWords(q.q, c.title); if (sh.length) f.push(`${w}: "${q.q}" shares "${sh.join(', ')}" with the chapter title "${c.title}"`); }));
    for (const k of ['build2', 'build3']) { threeOk(`${w} ${k}`, s[k].right, s[k].wrong, 58); if (!s[k].sample || s[k].sample.length > 40) f.push(`${w}: the ${k} sample is missing or too long`); frameOk(`${w} ${k}`, s[k].frame, [31, 26]); }
    if (s.happens.length !== 3 || s.happens.some((x) => !x || x.length > 26)) f.push(`${w}: not three samples of what happens of 26 letters or fewer`);
  });
  // ---- point-of-view stories
  const P = b.pov || [];
  if (P.length < 12 || P.filter((s) => s.person === 'first').length < 6 || P.filter((s) => s.person === 'third').length < 5) f.push('pov: fewer than twelve stories, six first-person and five third-person');
  const roles = [];
  P.forEach((s) => {
    const w = `pov ${s.id}`, all = s.paras.join(' '), nar = tokens(narration(all));
    if (s.paras.length !== 3 || wordsIn(all) < 90 || wordsIn(all) > 135) f.push(`${w}: not three paragraphs of 90 to 135 words`);
    if (s.chars.length !== 2 || s.descs.length !== 2) f.push(`${w}: not two characters with a description each`);
    const sayI = nar.some((t) => ['i', 'my', 'me'].includes(t) || /^i'/.test(t));
    if (s.person === 'first' ? !sayI : sayI) f.push(`${w}: the narrator ${s.person === 'first' ? 'never says' : 'says'} I, me, or my outside quotation marks`);
    if (s.person === 'first' && !all.includes(s.chars[0])) f.push(`${w}: the narrator's name is not in the story`);
    s.chars.forEach((c) => { if (!all.includes(c.replace(/^Aunt /, ''))) f.push(`${w}: "${c}" is not in the story`); });
    if (s.thinks.length !== 6 || [0, 1].some((k) => s.thinks.filter((t) => t.who === k).length !== 3) || new Set(s.thinks.map((t) => t.s)).size !== 6) f.push(`${w}: not three different "thinks" sentences for each character`);
    // "Who is telling?": the right one is never the longest in a third-person story nor the shortest in a first-person
    // story (Level 2 adds "How do you know?", whose right choice is the long one or the short one)
    const opts = [...s.descs, OUTSIDE], right = s.person === 'first' ? s.descs[0] : OUTSIDE, role = lengthRole(right, opts);
    roles.push(role);
    if (new Set(opts).size !== 3 || (s.person === 'third' && role === 'L') || (s.person === 'first' && role === 'S')) f.push(`${w}: the right teller is the ${role === 'L' ? 'longest' : 'shortest'} of its three beside the right "How do you know?"`);
    s.views.forEach((v, k) => { threeOk(`${w} view ${k + 1}`, v.right, v.wrong, 46); if (v.right.length > 38) f.push(w + ': the view of ' + s.chars[k] + ' is longer than 38 letters (a column of the chart)'); if (!v.wrong.includes(s.views[1 - k].right)) f.push(`${w}: a wrong view of ${s.chars[k]} is not the other character's view`); });
    s.proofs.forEach((p, k) => { threeOk(`${w} proof ${k + 1}`, p.right, p.wrong, 72); [p.right, ...p.wrong].forEach((x) => { if (!all.replace(/\s+/g, ' ').includes(x.replace(/^"|"$/g, '').replace(/"$/, ''))) f.push(`${w}: the proof sentence "${x.slice(0, 30)}" is not a sentence of the story`); }); });
    if (!s.own || !s.own.q || !/\?$/.test(s.own.q) || s.own.q.length > 72 || !s.own.think || s.own.think.length > 30 || !s.own.why || s.own.why.length > 30 || /[.!?]$/.test(s.own.think + s.own.why) || /^[A-Z]/.test(s.own.think) && !/^I\b/.test(s.own.think)) f.push(`${w}: no question of the child's own view, or the halves of its sample for "I think ___ because ___." are not 30 letters or fewer`);
    if (!s.rewrite[1] || (s.person === 'third' && !s.rewrite[0])) f.push(`${w}: no paragraph told by another character`);
    s.rewrite.forEach((r, k) => { if (r && (!(r.para >= 1 && r.para <= 3) || !r.sample || r.sample.length > 150 || !/\bI\b/.test(r.sample) || !/\b[Mm]y\b/.test(r.sample))) f.push(`${w}: a retold paragraph has no number, or its sample is not told with I and my, or is longer than 150 letters`); if (r && !s.thinks.filter((t) => t.who === k).some((t) => sharedWords(r.sample, t.s).length)) f.push(`${w}: the sample retold by ${s.chars[k]} does not keep ${s.chars[k]}'s view`); });
    if (!s.tellAlso || s.tellAlso.length > 56) f.push(`${w}: no line of what else is right for "Who is telling the story?"`);
  });
  // the right teller stands in every length place on some stories, in none on more than half (finding 20)
  if (P.length && (roles.filter((r) => r === 'L').length < 2 || roles.filter((r) => r === 'S').length < 2 || ['L', 'S', 'M'].some((r) => roles.filter((x) => x === r).length > P.length / 2))) f.push(`pov: the right teller is the longest on ${roles.filter((r) => r === 'L').length}, the shortest on ${roles.filter((r) => r === 'S').length} of ${P.length} stories (at least two each, no place on more than half)`);
  // ---- literal and nonliteral phrases
  const L = b.phrases || [];
  if (L.length < 24 || L.filter((p) => p.lit).length < 14) f.push('phrases: fewer than 24 sayings, or fewer than 14 with a literal sentence');
  if (new Set(L.map((p) => p.id)).size !== L.length) f.push('phrases: an id twice');
  L.forEach((p) => {
    const w = `phrase "${p.p}"`;
    const once = (s, forms) => s && [p.p, ...(forms || [])].reduce((n, x) => n + s.toLowerCase().split(x.toLowerCase()).length - 1, 0) === 1;
    if (!once(p.non) || (p.lit && !once(p.lit))) f.push(`${w}: does not stand exactly once in its sentences`);
    [p.lit, p.non].forEach((s) => { if (s && (!/^[A-Z]/.test(s) || !/[.!?]$/.test(s) || s.length > 78)) f.push(`${w}: "${s}" is no sentence of 78 letters or fewer`); });
    const m = [p.litMean, p.nonMean, p.off];
    if (new Set(m).size !== 3 || m.some((x) => !x || x.length > 30)) f.push(`${w}: not three different meanings of 30 letters or fewer`);
    if (!p.own || !once(p.own, p.forms) || p.own.length > 44) f.push(`${w}: no sample sentence of the child's own of 44 letters or fewer (with the saying once)`);
    if (p.own === p.non || p.own === p.lit) f.push(`${w}: the sample sentence is a sentence of the page`);
  });
  // ---- story pairs
  const S = b.series || [];
  if (S.length < 8) f.push('series: fewer than eight pairs of stories');
  S.forEach((s) => {
    const w = `series ${s.id}`;
    if (!s.author || s.stories.length !== 2) f.push(`${w}: no author or not two stories`);
    s.stories.forEach((t, i) => { const n = wordsIn(t.paras.join(' ')); if (!t.title || t.paras.length !== 2 || n < 60 || n > 95) f.push(`${w} story ${i + 1}: not two paragraphs of 60 to 95 words (${n})`); });
    // a chart note fits two lines of a cell with a line to spare (31 letters)
    ROWS.forEach((r) => { const c = s.chart[r]; if (!c || c.length !== 2 || c.some((x) => !x || x.length > 40) || c[0] === c[1]) f.push(`${w}: the ${r} row is not two different notes of 40 letters or fewer`); });
    // ruling B: the sentence of each story that states each chart note and each strip (a 'both' strip: of each story)
    const said = (p, i) => [].concat(p).every((x) => typeof x === 'string' && x.length > 3 && s.stories[i].paras.join(' ').replace(/\s+/g, ' ').includes(x));
    ROWS.forEach((r) => { const p = (s.chartProof || {})[r]; if (!p || [0, 1].some((i) => !p[i] || !said(p[i], i))) f.push(`${w}: the ${r} note of a story has no sentence of that story that states it`); });
    s.facts.forEach((x) => { const st = x.a === 'both' ? [0, 1] : [x.a - 1]; if (!Array.isArray(x.proof) || x.proof.length !== 2 || [0, 1].some((i) => (st.includes(i) ? !x.proof[i] || !said(x.proof[i], i) : x.proof[i] !== null))) f.push(`${w}: "${x.s}" has no sentence of ${x.a === 'both' ? 'each story' : 'its story'} that states it`); });
    if (s.neither.length < 4 || ROWS.some((r) => !s.neither.some((x) => x.row === r)) || s.neither.some((x) => x.s.length > 31)) f.push(`${w}: not one strip in neither story for every row`);
    const cats = [1, 2, 'both'];
    if (s.facts.length !== 12 || cats.some((c) => s.facts.filter((x) => x.a === c).length !== 4) || new Set(s.facts.map((x) => x.s)).size !== 12 || s.facts.some((x) => x.s.length > 44)) f.push(`${w}: not four facts of each kind (Story 1, Story 2, both) of 44 letters or fewer`);
    if (!s.alike || s.alike.length > 36 || /[.!?]$/.test(s.alike) || /^[A-Z]/.test(s.alike) && !s.stories.some((t) => t.paras.join(' ').includes(s.alike.split(' ')[0] + ' '))) f.push(`${w}: no ending of "In both stories, ___." of 36 letters or fewer`);
    frameOk(`${w} differ`, s.differ, [26, 26]);
  });
  // ---- text pairs
  const X = b.topics || [];
  if (X.length < 8) f.push('topics: fewer than eight pairs of texts');
  X.forEach((t) => {
    const w = `topic ${t.id}`;
    t.texts.forEach((x, i) => { const n = wordsIn(x.paras.join(' ')); if (!x.title || x.paras.length !== 2 || n < 65 || n > 105) f.push(`${w} text ${i + 1}: not two paragraphs of 65 to 105 words (${n})`); });
    const cats = [1, 2, 'both'];
    if (t.facts.length !== 12 || cats.some((c) => t.facts.filter((x) => x.a === c).length !== 4) || new Set(t.facts.map((x) => x.s)).size !== 12 || t.facts.some((x) => x.s.length > 44)) f.push(`${w}: not four facts of each kind of 44 letters or fewer (one line of a strip)`);
    if (t.neither.length < 3 || t.neither.some((x) => x.length > 44)) f.push(`${w}: fewer than three facts in neither text`);
    const said = (p, i) => [].concat(p).every((x) => typeof x === 'string' && x.length > 3 && t.texts[i].paras.join(' ').replace(/\s+/g, ' ').includes(x));
    t.facts.forEach((x) => { const st = x.a === 'both' ? [0, 1] : [x.a - 1]; if (!Array.isArray(x.proof) || x.proof.length !== 2 || [0, 1].some((i) => (st.includes(i) ? !x.proof[i] || !said(x.proof[i], i) : x.proof[i] !== null))) f.push(`${w}: "${x.s}" has no sentence of ${x.a === 'both' ? 'each text' : 'its text'} that states it`); });
    if (!Array.isArray(t.subject) || t.subject.length !== 2) f.push(`${w}: no noun each point names`);
    else [0, 1].forEach((i) => { const d = (t.dets || [])[i] || []; if (!namesTopic(t.main[i], t.subject[i], 99)) f.push(`${w} text ${i + 1}: the point does not name ${t.subject[i].join(' or ')}`); d.forEach((x) => { if (!namesTopic(x, t.subject[i], 4)) f.push(`${w} text ${i + 1}: the detail "${x}" does not name ${t.subject[i].join(' or ')} in its first words (the point would be the only choice that names it)`); }); });
    // the most important point of each text (finding 2): offered beside two details of its OWN text; at least two
    // details shorter and two longer (so the point is the longest on some copies and the shortest on others); the
    // point repeats no content word of its text's title
    if (!Array.isArray(t.main) || t.main.length !== 2 || t.main.some((m) => !one(m, 60))) f.push(`${w}: not two most important points of 60 letters or fewer`);
    else t.main.forEach((m, i) => {
      const d = (t.dets || [])[i] || [];
      if (d.length < 4 || new Set(d).size !== d.length || d.some((x) => !one(x, 66) || x === m || t.main.includes(x))) f.push(`${w} text ${i + 1}: not four or more different details of 66 letters or fewer`);
      if (d.filter((x) => x.length < m.length).length < 2 || d.filter((x) => x.length > m.length).length < 2) f.push(`${w} text ${i + 1}: not two details shorter and two longer than its point (the point would always be the ${d.filter((x) => x.length < m.length).length < 2 ? 'shortest' : 'longest'})`);
      const sh = sharedWords(m, t.texts[i].title); if (sh.length) f.push(`${w} text ${i + 1}: the point "${m}" repeats "${sh.join(', ')}" of the title "${t.texts[i].title}"`);
    });
    if (t.details.length !== 2 || t.details.some((d) => d.length !== 2 || d.some((x) => !x || x.length > 30))) f.push(`${w}: not two key details of 30 letters or fewer for each text`);
    if (!Array.isArray(t.only) || t.only.length !== 2 || t.only.some((x) => !x || x.length > 30)) f.push(`${w}: no sample of a detail only one text gives, 30 letters or fewer, for each text`);
    if (!t.both || t.both.length > 36 || !t.alike || t.alike.length > 40 || !t.differ || t.differ.length > 40) f.push(`${w}: no sample of a shared fact (36), of alike or of different (40)`);
    if (!t.facts.some((x) => x.a === 'both' && x.s === t.both)) f.push(`${w}: the sample of something both texts tell is no "both" fact`);
  });
  if (!Array.isArray(b.modelOnly) || !b.modelOnly.length) f.push('no list of what only the notes model with');
  else { const text = JSON.stringify({ ...b, modelOnly: null }).toLowerCase(); b.modelOnly.forEach((m) => { if (text.includes(String(m).toLowerCase())) f.push(`"${m}" (what a note models with) is printed on a page`); }); }
  if (f.length) return f;
  // every level can draw its pages: 40 seeded draws a level
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let k = 1; k <= 40; k++) {
    try { drawPage(b, mode, lv, makeRng(`ctg3-check|${mode}|${lv}|${k}`), k); } catch (e) { f.push(`${mode} level ${lv}: a page cannot be drawn (${e.message})`); break; }
  }
  return f;
}

/* ---------------------------------------------------------------- drawing a page (data only) ---------------------------------------------------------------- */
function drawPage(b, mode, lv, rng, variant) {
  let last;
  for (let k = 0; k < 60; k++) { try { return DRAW[mode](b, lv, rng, Number(variant) || 1); } catch (e) { last = e; } }
  throw last;
}
/** three choices with the right one at a place */
const placed = (right, wrong, at, rng) => { const o = shuffle(wrong, rng); o.splice(at, 0, right); return o; };
/** places for the three-choice items of a page; `fixed` holds places that the answers themselves set (null where free) */
function placesWith(fixed, rng) {
  for (let k = 0; k < 600; k++) { const p = fixed.map((x) => (x === null ? rng.int(0, 2) : x)); if (placesOk(p, 3) && (p.length < 3 || new Set(p).size >= 2)) return p; }
  throw new Error('no places for the three-choice questions');
}

const DRAW = {
  stage(b, lv, rng, v) {
    const d = LEVELS.stage[lv], P = b.plays, Q = b.poems, P2 = d.plays ? P.filter((x) => d.plays.includes(x.id)) : P;
    const i = (v - 1) % P2.length, visit = Math.floor((v - 1) / P2.length);
    const Q2 = d.poems ? Q.filter((x) => d.poems.includes(x.id)) : Q;
    const play = P2[order(P2.length, `ct-stage-play|${lv}`)[i]], poem = Q2[order(Q2.length, `ct-stage-poem|${lv}`)[(i + 3 * visit) % Q2.length]];
    const nPw = d.pwhere + (d.pwhereShort && playRows(play) <= 8 ? 1 : 0);
    const pw = nPw ? rot(play.where, `ct-pw|${play.id}`, visit, nPw, 2) : [];
    const sw = d.swhere ? rot(poem.where, `ct-sw|${poem.id}`, visit + rng.int(0, 1), d.swhere, 2) : [];
    const qs = [];
    pw.forEach((q) => qs.push({ kind: 'pwhere', q: q.q, right: 'Scene ' + q.a, opts: ['Scene 1', 'Scene 2'] }));
    if (d.build) qs.push({ kind: 'build', q: LINES.build, right: play.build.right, wrong: play.build.wrong, sample: play.build.sample, frame: play.build.frame, answer: d.build });
    sw.forEach((q) => qs.push({ kind: 'swhere', q: q.q, right: 'Stanza ' + q.a, opts: ['Stanza 1', 'Stanza 2', 'Stanza 3'] }));
    qs.push({ kind: 'adds', q: LINES.adds, right: poem.adds.right, wrong: poem.adds.wrong, sample: poem.adds.sample, frame: [lcFirst(poem.adds.sample).replace(/\.$/, '')], answer: d.adds });
    choosePlaces(qs, rng);
    return { mode: 'stage', lv, set: play.id + '|' + poem.id, visit, play, poem, qs, items: qs.map((q) => q.kind + ':' + q.q + (q.kind === 'build' ? play.id : q.kind === 'adds' ? poem.id : '')).concat(d.scene3 ? ['scene3:' + play.id] : []) };
  },
  chapters(b, lv, rng, v) {
    const d = LEVELS.chapters[lv], C = b.chapters, { at, visit } = nth(C.length, `ct-ch|${lv}`, v), s = C[at];
    // the chapter questions of a visit: half of a fixed order of the six (each half holds two different answers)
    const o = order(6, `ct-ch-where|${s.id}`).map((k) => s.where[k]);
    let half = (visit % 2 ? o.slice(3) : o.slice(0, 3));
    if (new Set(half.map((q) => q.a)).size < 2) half = [half[0], ...o.filter((q) => !half.includes(q) && q.a !== half[0].a).slice(0, 2)];
    const where = shuffle(half, rng).slice(0, d.where);
    const builds = d.builds || [visit % 2 ? 'build2' : 'build3'];
    const qs = where.map((q) => ({ kind: 'where', q: q.q, right: 'Chapter ' + q.a, opts: ['Chapter 1', 'Chapter 2', 'Chapter 3'] }));
    if (qs.length >= 3 && (staircase(qs.map((q) => +q.right.slice(-1))) || new Set(qs.map((q) => q.right)).size === 1)) throw new Error('the chapter answers follow a pattern');
    builds.forEach((k) => qs.push({ kind: k, q: LINES[k], right: s[k].right, wrong: s[k].wrong, sample: s[k].sample, frame: s[k].frame, answer: d.answer }));
    choosePlaces(qs, rng);
    return { mode: 'chapters', lv, set: s.id, visit, s, qs, items: qs.map((q) => q.kind + ':' + s.id + ':' + q.q).concat(d.chart ? s.happens.map((h, k) => 'happens:' + s.id + ':' + k) : []) };
  },
  teller(b, lv, rng, v) {
    const d = LEVELS.teller[lv], S = b.pov, { at, visit } = nth(S.length, `ct-tell|${lv}`, v), s = S[at];
    const right = s.person === 'first' ? s.descs[0] : OUTSIDE;
    const tell = { kind: 'tell', right, opts: placed(right, [...s.descs, OUTSIDE].filter((x) => x !== right), rng.int(0, 2), rng), answer: d.tell };
    const howRight = HOW[s.person === 'first' ? 0 : 1];
    const how = d.how === 'choose' ? { kind: 'how', right: howRight, opts: rng.int(0, 1) ? [HOW[1], HOW[0]] : [HOW[0], HOW[1]] } : null;
    if (how && !lengthOk([tell, how])) throw new Error('the right teller and the right reason are found by their length');
    // "Who thinks this?": each character's three sentences in a fixed order; a visit takes two and one (or two and two)
    const A = order(3, `ct-th|${s.id}|0`).map((k) => s.thinks.filter((t) => t.who === 0)[k]), B = order(3, `ct-th|${s.id}|1`).map((k) => s.thinks.filter((t) => t.who === 1)[k]);
    const pick = d.thinks === 3 ? (visit % 2 ? [B[1], B[2], A[2]] : [A[0], A[1], B[0]]) : (visit % 2 ? [A[2], B[2], A[0], B[1]] : [A[0], A[1], B[0], B[1]]);
    let th = null;
    for (let k = 0; k < 200 && !th; k++) { const o = shuffle(pick, rng); if (placesOk(o.map((t) => t.who), 2)) th = o; }
    if (!th) throw new Error('no order of the "thinks" sentences without a pattern');
    return { mode: 'teller', lv, set: s.id, visit, s, tell, how, thinks: th, items: ['tell:' + s.id, ...(d.how ? ['how:' + s.id] : []), ...th.map((t) => 'thinks:' + t.s), 'own:' + s.id] };
  },
  views(b, lv, rng, v) {
    const d = LEVELS.views[lv], S = b.pov, { at, visit } = nth(S.length, `ct-views|${lv}`, v), s = S[at];
    const who = visit % 2;
    const out = { mode: 'views', lv, set: s.id + '|' + who, visit, s, who, rw: s.person === 'first' ? 1 : 1 - who };
    if (d.answer === 'choose') {
      const vw = s.views[who], pr = s.proofs[who];
      const p = placesWith([null, null], rng);
      out.view = { right: vw.right, opts: placed(vw.right, vw.wrong, p[0], rng) };
      out.proof = { right: pr.right, opts: placed(pr.right, pr.wrong, p[1], rng) };
      if (!lengthOk([out.view, out.proof])) throw new Error('the right answers are found by their length');
    }
    out.items = ['view:' + s.id + ':' + who, 'proof:' + s.id + ':' + who, 'own:' + s.id].concat(d.rewrite ? ['rewrite:' + s.id + ':' + out.rw] : []);
    return out;
  },
  literal(b, lv, rng) {
    const d = LEVELS.literal[lv], L = b.phrases;
    for (let t = 0; t < 400; t++) {
      const pick = rng.sample(L, d.n);
      const lits = pick.filter((p) => p.lit).length;
      if (lits < 2) continue;
      // literal or nonliteral, drawn for each phrase that has both (at least two of each on a page, in no pattern)
      const use = pick.map((p) => (p.lit ? rng.int(0, 1) : 1));
      if (use.filter((u) => !u).length < 2 || use.filter((u) => u).length < 2 || !placesOk(use, 2)) continue;
      const rows = pick.map((p, i) => ({ p, use: use[i] ? 'N' : 'L', text: use[i] ? p.non : p.lit, right: use[i] ? p.nonMean : p.litMean }));
      if (new Set(rows.map((r) => r.right)).size !== rows.length) continue;
      if (d.answer === 'choose') {
        let pl; try { pl = places(rows.length, 3, rng); } catch (e) { continue; }
        rows.forEach((r, i) => { r.opts = placed(r.right, [r.p.litMean, r.p.nonMean, r.p.off].filter((x) => x !== r.right), pl[i], rng); });
        if (!lengthOk(rows)) continue;
      }
      let box = null;
      if (d.own) box = rng.sample(L.filter((p) => !pick.includes(p)), 4);
      return { mode: 'literal', lv, set: pick.map((p) => p.id).join(','), visit: 0, rows, box, items: rows.map((r) => r.p.id + ':' + r.use).concat(box ? ['own'] : []) };
    }
    throw new Error('no sentences for the page');
  },
  storysort(b, lv, rng, v) {
    const d = LEVELS.storysort[lv], S = b.series, { at, visit } = nth(S.length, `ct-ss|${lv}`, v), s = S[at];
    const cats = [1, 2, 'both'];
    for (let t = 0; t < 300; t++) {
      // how many of each kind: never the same three numbers on every page (one to three each; two to four on Level 2)
      const lo = d.n >= 8 ? 2 : 1, hi = d.n >= 8 ? 4 : d.n >= 6 ? 3 : 2;
      const cnt = cats.map(() => rng.int(lo, hi));
      if (cnt.reduce((x, y) => x + y, 0) !== d.n) continue;
      const pick = cats.flatMap((c, ci) => rot(s.facts.filter((x) => x.a === c), `ct-ss-f|${s.id}|${c}`, visit, cnt[ci], 2));
      const o = shuffle(pick, rng), pl = o.map((x) => cats.indexOf(x.a));
      if (!placesOk(pl, 3)) continue;
      return { mode: 'storysort', lv, set: s.id, visit, s, facts: o, items: o.map((x) => 'fact:' + x.s).concat(d.alike ? ['alike:' + s.id] : [], d.differ ? ['differ:' + s.id] : []) };
    }
    throw new Error('no sentences for the page');
  },
  storychart(b, lv, rng, v) {
    const d = LEVELS.storychart[lv], S = d.skip ? b.series.filter((x) => !d.skip.includes(x.id)) : b.series, { at, visit } = nth(S.length, `ct-sc|${lv}`, v), s = S[at];
    const ex = visit % 2;   // the story whose setting and problem are printed as examples (Levels 1 and 2)
    const cells = [0, 1].flatMap((st) => ROWS.map((r) => ({ st, row: r, text: s.chart[r][st], example: d.examples && st === ex && (r === 'setting' || r === 'problem') })));
    const out = { mode: 'storychart', lv, set: s.id, visit, s, cells };
    if (d.answer === 'strips') {
      const neither = rot(s.neither, `ct-sc-n|${s.id}`, visit, 2, 2);
      for (let t = 0; t < 400; t++) {
        const strips = shuffle([...cells.filter((c) => !c.example).map((c) => ({ text: c.text, cell: c })), ...neither.map((x) => ({ text: x.s, cell: null }))], rng);
        strips.forEach((x, k) => { x.letter = 'ABCDEFGH'[k]; });
        // the letters of the cells in reading order (row by row, Story 1 then Story 2) follow no pattern
        const seq = ROWS.flatMap((r) => [0, 1].map((st) => strips.find((x) => x.cell && x.cell.row === r && x.cell.st === st))).filter(Boolean).map((x) => x.letter.charCodeAt(0));
        if (seq.some((c, k) => k >= 2 && ((c === seq[k - 1] + 1 && c === seq[k - 2] + 2) || (c === seq[k - 1] - 1 && c === seq[k - 2] - 2)))) continue;
        if (strips.slice(-2).every((x) => !x.cell) || strips.slice(0, 2).every((x) => !x.cell)) continue;
        out.strips = strips; break;
      }
      if (!out.strips) throw new Error('no order of the strips');
    }
    out.items = cells.filter((c) => !c.example).map((c) => 'cell:' + s.id + ':' + c.st + ':' + c.row).concat(out.strips ? out.strips.filter((x) => !x.cell).map((x) => 'neither:' + x.text) : []);
    return out;
  },
  textsort(b, lv, rng, v) {
    const d = LEVELS.textsort[lv], X = b.topics, { at, visit } = nth(X.length, `ct-ts|${lv}`, v), t = X[at];
    const cats = [1, 'both', 2];
    for (let k = 0; k < 400; k++) {
      const cnt = cats.map(() => rng.int(2, 3));
      if (cnt.reduce((x, y) => x + y, 0) !== d.n) continue;
      const pick = cats.flatMap((c, ci) => rot(t.facts.filter((x) => x.a === c), `ct-ts-f|${t.id}|${c}`, visit, cnt[ci], 2).map((x) => ({ text: x.s, region: ci })));
      const neither = d.neither ? rot(t.neither, `ct-ts-n|${t.id}`, visit + (lv === 3 ? 1 : 0), d.neither, 1).map((x) => ({ text: x, region: -1 })) : [];
      const strips = shuffle([...pick, ...neither], rng);
      strips.forEach((x, i) => { x.letter = 'ABCDEFGHIJ'[i]; });
      // no three strips in a row of one part; the neither strips are not the last two
      const r = strips.map((x) => x.region);
      if (triple(r) || (neither.length && r.slice(-2).every((x) => x < 0))) continue;
      return { mode: 'textsort', lv, set: t.id, visit, t, strips, items: strips.map((x) => 'fact:' + x.text).concat(d.differ ? ['differ:' + t.id] : []) };
    }
    throw new Error('no strips for the page');
  },
  textchart(b, lv, rng, v) {
    const d = LEVELS.textchart[lv], X = b.topics, { at, visit } = nth(X.length, `ct-tc|${lv}`, v), t = X[at];
    const out = { mode: 'textchart', lv, set: t.id, visit, t };
    if (d.answer === 'choose') {
      // each point beside two details of its OWN text: on every page one point is the longest of its three, the other
      // the middle or the shortest one (so over the copies the point is the longest about half the time, the shortest on
      // some); the shared detail of a visit beside one fact of each text
      // the shared fact of the visit: on about two copies in three the first one in its turn that can be the middle of its
      // three (a page already has its longest right answer in a point), so the shared fact is never the shortest on most copies
      const bothFacts = t.facts.filter((x) => x.a === 'both'), turn = rot(bothFacts, `ct-tc-b|${t.id}`, visit, bothFacts.length, 2);
      const canMiddle = (bf) => t.facts.some((o) => o.a === 1 && t.facts.some((w) => w.a === 2 && lengthRole(bf.s, [bf.s, o.s, w.s]) === 'M'));
      const wantM = rng.int(0, 2) > 0, both = (wantM && turn.find(canMiddle)) || turn[0];
      const plans = [['L', 'M'], ['M', 'L'], ['L', 'S'], ['S', 'L']];
      for (let k = 0; k < 400 && !out.qs; k++) {
        const roles = plans[rng.int(0, plans.length - 1)];
        const dets = [0, 1].map((i) => { const m = t.main[i], pool = t.dets[i]; const pairs = []; for (let a = 0; a < pool.length; a++) for (let c = a + 1; c < pool.length; c++) if (lengthRole(m, [m, pool[a], pool[c]]) === roles[i]) pairs.push([pool[a], pool[c]]); return pairs.length ? pairs[rng.int(0, pairs.length - 1)] : null; });
        if (dets.some((x) => !x)) continue;
        const byRole = { L: [], M: [], S: [] };
        for (const o of t.facts.filter((x) => x.a === 1)) for (const w of t.facts.filter((x) => x.a === 2)) byRole[lengthRole(both.s, [both.s, o.s, w.s])].push([o, w]);
        const [one, two] = rng.pick(byRole[(wantM ? ['M', 'S', 'L'] : ['S', 'M', 'L']).find((r) => byRole[r].length)]);
        const rows = [{ kind: 'main1', q: LINES.main1, right: t.main[0], wrong: dets[0] }, { kind: 'main2', q: LINES.main2, right: t.main[1], wrong: dets[1] }, { kind: 'both', q: LINES.bothQ, right: both.s, wrong: [one.s, two.s] }];
        const p = places(3, 3, rng); const r = rows.map((x, i) => ({ ...x, opts: placed(x.right, x.wrong, p[i], rng) }));
        if (lengthOk(r)) { out.qs = r; out.roles = roles; }
      }
      if (!out.qs) throw new Error('the right answers are found by their length');
      out.items = out.qs.map((q) => q.kind + ':' + q.right).concat(out.qs.slice(0, 2).map((q) => 'with:' + q.wrong.slice().sort().join('|')));
    } else {
      // Level 2: the second row is a key detail on one visit and a detail only this text gives on the next; Level 3 the other way
      out.row2 = visit % 2 ? 'only' : 'detail';
      // Level 2: the point and one more detail of each text; Level 3: one row (the point, or a key detail on the next
      // visit) and the two sentences on how the texts are alike and how they are different
      out.rows = lv === 2 ? ['main', out.row2] : [visit % 2 ? 'detail' : 'main'];
      out.bottom = d.bottom === 'both' ? 'both' : 'compare';
      out.only = t.only;
      out.items = [...out.rows.flatMap((r) => [r + '1', r + '2']), ...(out.bottom === 'both' ? ['both'] : ['alike', 'differ'])].map((x) => x + ':' + t.id);
    }
    return out;
  },
};
/** places of the choices of a page: two-choice questions keep their answer's place; three-choice questions where the
 *  answer is a part (stanza, chapter) keep it too; the sentences to choose are placed so that the page has no pattern */
function choosePlaces(qs, rng) {
  const three = qs.filter((q) => (q.opts && q.opts.length === 3) || (q.wrong && q.answer === 'choose'));
  for (let k = 0; k < 400; k++) {
    const p = placesWith(three.map((q) => (q.opts && !q.wrong ? q.opts.indexOf(q.right) : null)), rng);
    three.forEach((q, i) => { if (q.wrong) q.opts = placed(q.right, q.wrong, p[i], rng); });
    const sent = three.filter((q) => q.wrong);
    if (sent.length < 2 || lengthOk(sent)) return;
  }
  throw new Error('no places for the choices');
}

{ const f = faultsOf(BANK); if (f.length) throw new Error('comparing-texts-g3.en.json: ' + f.slice(0, 12).join('; ') + (f.length > 12 ? ` (and ${f.length - 12} more)` : '')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks
/** typographic apostrophe and quotes on the page (the bank and the attributes keep straight ones) */
const typo = (t) => t.replace(/'/g, '’').replace(/&quot;/g, (m, at, s) => (at === 0 || /[\s([—]$/.test(s.slice(0, at)) ? '“' : '”'));
/** an f before i, f, l, or t and a t before t get room of their own; every printed text passes through typo() here */
function fRoom(html) {
  let out = '', i = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += typo(text).replace(/f(?=[iflt])|t(?=t)/g, (m) => `<span data-lcs-fsep style="margin-right:0.07em">${m}</span>`);
    i = j < 0 ? html.length : j;
  }
  return out;
}
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;flex:0 0 auto;${more}">${inner}</div>`;
const white = (inner, attrs = '', more = '') => `<div data-lcs-bandbox ${attrs} style="display:flex;flex-direction:column;gap:3px;padding:5px 10px;border-radius:10px;background:#FFFFFF;min-width:0;${more}">${inner}</div>`;
const label = (rule, text, px = 16.5) => `<div data-lcs-label data-lcs-rule="${rule}" data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(text)}</div>`;
const num = (k) => `<span data-lcs-num style="color:${T.teal}">${k}.</span> `;
const pill = (text, ok, key, font, attr = '') => `<span data-lcs-pill data-lcs-word="${esc(text)}"${ok ? ' data-lcs-ok="1"' : ''}${attr} style="flex:0 0 auto;font:800 ${font}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 10px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
const boxMark = (want, key, size = MARKBOX) => `<span data-lcs-markbox data-lcs-want="${esc(want)}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF;font:800 ${Math.round(size * 0.6)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(want) : ''}</span>`;
const title = (t, px = 19) => `<div data-lcs-ttl data-lcs-read style="font:700 ${px}px/1.15 'Baloo 2',cursive;color:${T.ink};text-align:center">${esc(t)}</div>`;
/** the width of a frame's printed words (an estimate; verify() measures what is left) */
const startW = (s) => Math.ceil(String(s).length * STARTPX * STARTEM);
/** a single-rule writing line of ROWH; `starter` (a frame's printed words) stands at its start; `answer` (key only) is
 *  printed in the key's font after it, shrunk only if it must */
function rule({ w, answer, sample, more, example, starter, note, attrs = '' }) {
  const room = w - 12 - (starter ? startW(starter) + 8 : 0);
  const px = answer ? (note ? NOTEPX : Math.max(12, Math.min(KEYPX, room / (String(answer).length * 0.56)))) : 0;
  return `<div data-lcs-line${more ? ' data-lcs-more' : ''}${answer ? ` data-lcs-answer="${esc(answer)}"` : ''}${answer && sample ? ' data-lcs-key-sample="1"' : ''}${note ? ' data-lcs-keynote' : ''}${example ? ' data-lcs-exampleline' : ''}${attrs} style="box-sizing:border-box;flex:0 0 auto;width:${w}px;height:${ROWH}px;border-bottom:1.5px solid #8C8479;display:flex;align-items:flex-end;gap:8px;padding:0 4px 3px;overflow:hidden">` +
    (starter ? `<span data-lcs-starter data-lcs-read style="flex:0 0 auto;white-space:nowrap;font:800 ${STARTPX}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(starter)}</span>` : '') +
    (answer ? `<span data-lcs-keytext style="flex:0 0 auto;white-space:nowrap;font:700 ${px.toFixed(1)}px/1 'Nunito',sans-serif;color:${T.teal}">${esc(answer)}</span>` : '') +
    (example ? `<span data-lcs-example data-lcs-read style="flex:0 0 auto;white-space:nowrap;font:600 15px/1 'Nunito',sans-serif;color:#8C8479">${esc(example)}</span>` : '') + `</div>`;
}
/** the words of a key cut into lines of the given widths (each piece fits its line in the key's font) */
function cutInto(text, widths, px = KEYPX) {
  const out = [];
  let cur = '', i = 0;
  const max = (k) => Math.floor((widths[Math.min(k, widths.length - 1)] - 12) / (px * 0.56));
  for (const word of String(text).split(' ')) { if (cur && (cur + ' ' + word).length > max(i)) { out.push(cur); cur = word; i++; } else cur = cur ? cur + ' ' + word : word; }
  if (cur) out.push(cur);
  return out;
}
const cut = (text, w) => cutInto(text, [w]);
/** a note of the key: NOTEPX on every line of every page, cut into lines where it does not fit one */
const noteParts = (text, w) => cutInto(text, [w], NOTEPX);
/** a line of the key over a task (the page keeps its room empty) */
const keyOnly = (k, key, w) => (key ? `<div data-lcs-keyonly="${k}" style="flex:0 0 auto;font:700 ${NOTEPX}px/18px 'Nunito',sans-serif;color:${T.teal}">${noteParts(KEYONLY[k], w).map((p) => `<div data-lcs-keyonlytext>${esc(p)}</div>`).join('')}</div>` : '');
/** how many lines a group of `room` letters needs at a width (and one to spare) */
const lineNeed = (room, w, spare = true) => Math.ceil((room * HAND) / w) + (spare ? 1 : 0);
/** the lines of one written answer: as many as the room needs and one to spare (or `n`); the key cuts its sample into
 *  them and, where another answer is right too, says so on the lines after it (kind: the NOTE it prints) */
function lines({ w, room, spare = true, key, sample, prefix = 'Sample answer: ', n, kind, noteText }) {
  const note = noteText || (kind ? NOTE[kind] : null);
  const kparts = cut(prefix + sample, w), nparts = note ? noteParts('(' + note + ')', w) : [];
  const k = Math.max(n || 0, lineNeed(room, w, spare), kparts.length + nparts.length, 1);
  const ls = Array.from({ length: k }, (_, i) => { const isNote = i >= kparts.length && i < kparts.length + nparts.length; const ans = key ? (i < kparts.length ? kparts[i] : isNote ? nparts[i - kparts.length] : null) : null; return rule({ w, answer: ans, sample: !!prefix, more: !ans, note: key && isNote }); });
  return `<div data-lcs-lines data-lcs-room="${room}" data-lcs-spare="${spare ? 1 : 0}" data-lcs-prefix="${prefix}"${kind ? ` data-lcs-note="${kind}"` : ''} style="display:flex;flex-direction:column;gap:0">${ls.join('')}</div>`;
}
const linesCount = ({ w, room, spare = true, sample, prefix = 'Sample answer: ', n, kind, noteText }) => Math.max(n || 0, lineNeed(room, w, spare), cut(prefix + sample, w).length + (noteText || kind ? noteParts('(' + (noteText || NOTE[kind]) + ')', w).length : 0), 1);
/** a sentence frame: the printed words of each part start a line and the child writes after them (a part that needs
 *  more room goes on to the next line); one line to spare. parts: the key's words after each printed part. In the key a
 *  note on the spare line says it is a sample and what else is right. */
function frameLayout({ w, kind, parts }) {
  const starters = FRAME[kind];
  const rows = starters.map((st, ri) => {
    const first = w - 8 - startW(st) - 8;               // room left on the starter's own line
    const room = parts[ri].length;                        // the letters of the child's part (the key's words)
    const more = Math.max(0, Math.ceil((room * HAND - first) / (w - 8)));
    const kp = cutInto(parts[ri], [first + 12, w]);
    return { st, room, n: 1 + Math.max(more, kp.length - 1), kp };
  });
  const note = noteParts('(Sample answer. ' + NOTE[kind] + ')', w);
  return { rows, note, total: rows.reduce((s, r) => s + r.n, 0) + Math.max(1, note.length) };
}
function frame({ w, kind, parts, key, n }) {
  const L = frameLayout({ w, kind, parts });
  const out = [];
  L.rows.forEach((r, ri) => { for (let j = 0; j < r.n; j++) out.push(rule({ w, starter: j ? null : r.st, answer: key ? r.kp[j] || null : null, sample: true, more: !(key && r.kp[j]), attrs: j ? ` data-lcs-cont="${ri}"` : ` data-lcs-framerow="${ri}" data-lcs-room="${r.room}"` })); });
  const spare = Math.max(1, L.note.length, (n || 0) - (L.total - Math.max(1, L.note.length)));
  for (let j = 0; j < spare; j++) out.push(rule({ w, answer: key ? L.note[j] || null : null, sample: true, more: !(key && L.note[j]), note: key && !!L.note[j], attrs: ' data-lcs-spareline' }));
  return `<div data-lcs-frame="${kind}" data-lcs-note="${kind}" style="display:flex;flex-direction:column;gap:0">${out.join('')}</div>`;
}
const frameCount = (o) => { const L = frameLayout(o); return Math.max(L.total, o.n || 0); };
/** a question with three sentences (or parts) to circle, one under the other or in a row */
function choiceQ(q, i, key, { font = 15.5, row = false } = {}) {
  const opts = q.opts.map((o) => pill(o, o === q.right, key, font)).join('');
  return `<div data-lcs-q="${q.kind}" data-lcs-qtext="${esc(q.q || q.kind)}" style="flex:0 0 auto;display:flex;${row ? 'flex-wrap:wrap;align-items:center;justify-content:space-between;' : 'flex-direction:column;'}gap:2px 10px;padding:3px 8px;border-radius:10px;background:#FFFFFF">` +
    `<div data-lcs-qt data-lcs-read style="${row ? 'flex:1 1 300px;' : ''}font:700 ${font}px/1.28 'Nunito',sans-serif;color:${T.ink}">${num(i)}${esc(q.q)}</div>` +
    `<div data-lcs-opts style="display:flex;${row ? 'flex:0 0 auto;gap:6px;margin-left:auto' : 'flex-direction:column;align-items:flex-start;gap:2px;padding-left:20px'}">${opts}</div></div>`;
}
/** a question written on lines (or, on the easier levels, on its sentence frame) */
const writeQ = (q, i, key, w) => `<div data-lcs-q="${q.kind}" data-lcs-qtext="${esc(q.q)}" data-lcs-written style="flex:0 0 auto;display:flex;flex-direction:column;gap:1px;padding:3px 8px;border-radius:10px;background:#FFFFFF">` +
  `<div data-lcs-qt data-lcs-read style="font:700 15.5px/1.28 'Nunito',sans-serif;color:${T.ink}">${num(i)}${esc(q.q)}</div>` +
  (q.answer === 'frame' ? frame({ w, kind: q.kind, parts: q.frame.map((x, k) => (k === q.frame.length - 1 ? x + '.' : x)), key }) : lines({ w, room: q.sample.length, key, sample: q.sample, kind: q.kind })) + `</div>`;
/** rows that share the room of their card: the room goes around each row evenly (a row itself never stretches) */
const rowsBox = (inner, gap = 4) => `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:${gap}px">${inner}</div>`;
/** a paragraph of a story or a text */
const para = (text, font, lh, n, attrs = '') => `<p data-lcs-para${attrs} data-lcs-read style="margin:0;${n ? '' : 'text-indent:18px;'}font:600 ${font}px/${lh} 'Nunito',sans-serif;color:${T.ink}">${n ? `<b data-lcs-pnum style="color:${T.teal};font-weight:800">${n}</b>&nbsp; ` : ''}${esc(text)}</p>`;
/** two texts side by side (the story pairs and the text pairs): both boxes as high as the longer text; the shorter
 *  one spreads its paragraphs (verify measures the blank inside each box) */
const twoTexts = (heads, texts, font, lh, top, tw = 1) => cream('data-lcs-task="texts"', (top ? `<div data-lcs-byline data-lcs-read style="font:700 15.5px/1.2 'Nunito',sans-serif;color:${T.inkSoft};text-align:center">${esc(top)}</div>` : '') +
  `<div style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;align-content:space-evenly;column-gap:10px;row-gap:3px">${texts.map((x, i) => `<div data-lcs-text="${i + 1}" style="display:grid;grid-template-rows:subgrid;grid-row:span 2;min-width:0"><div data-lcs-thead style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:center;column-gap:8px"><div data-lcs-texthead data-lcs-read style="font:800 14.5px/1.1 'Nunito',sans-serif;color:${T.teal}">${esc(heads[i])}</div>` + title(x.title, 17) + `</div>` + white(x.paras.map((p) => para(p, font, lh).replace('text-indent:18px;', 'text-indent:12px;')).join(''), 'data-lcs-paras', 'align-self:start;gap:6px;padding:5px 6px') + `</div>`).join('')}</div>`, 3, 3, `flex:${tw} 1 auto`);
/** estimated lines of a text in a width (verify() measures the page; this only balances the cells of a chart) */
const textLines = (s, px, w, em = 0.56) => Math.max(1, Math.ceil((String(s).length * px * em) / w));

/* ---------------------------------------------------------------- the pages ---------------------------------------------------------------- */
function renderPage(plan, key) {
  const { mode, lv } = plan, d = LEVELS[mode][lv], inner = W - 24, iw = inner - 16;
  const blocks = [];
  const grow = 'flex:3 1 auto';
  const questions = (qs, lab, g = grow) => cream('data-lcs-task="questions"', (lab ? label(lab, LINES[lab]) : '') + rowsBox(qs.map((q, i) => (q.answer === 'write' || q.answer === 'frame' ? writeQ(q, i + 1, key, iw) : choiceQ(q, i + 1, key, { font: 15.5, row: !q.wrong }))).join('')), 6, 4, g);

  if (mode === 'stage') {
    const p = plan.play, poem = plan.poem, pfont = d.pfont + (playRows(p) <= 8 ? (lv === 1 ? 1.5 : lv === 3 ? 0.5 : 0) : 0);
    const cast = `<div data-lcs-cast data-lcs-read style="font:600 ${pfont}px/1.3 'Nunito',sans-serif;color:${T.ink};text-align:center"><b style="color:${T.teal}">Cast:</b> ${p.cast.map((c) => `<span data-lcs-castname><b>${esc(c.tag)}</b>, ${esc(c.about)}</span>`).join(' · ')}</div>`;
    const scene = (s, i) => white(`<div style="display:flex;flex-wrap:wrap;align-items:baseline;column-gap:8px"><div data-lcs-sceneh data-lcs-read style="font:800 16px/1.2 'Nunito',sans-serif;color:${T.teal}">Scene ${i + 1}</div>` +
      `<div data-lcs-dir data-lcs-read style="font:italic 600 ${pfont}px/1.2 'Nunito',sans-serif;color:${T.inkSoft}">(${esc(s.set)})</div></div>` +
      s.lines.map((l) => `<div data-lcs-speech data-lcs-read style="font:600 ${pfont}px/1.22 'Nunito',sans-serif;color:${T.ink}"><b data-lcs-who style="font-weight:800">${esc(l.who)}:</b> ${l.dir ? `<i data-lcs-sdir style="color:${T.inkSoft}">(${esc(l.dir)})</i> ` : ''}${esc(l.say)}</div>`).join(''), `data-lcs-scene="${i + 1}"`, 'gap:3px;padding:4px 8px');
    blocks.push(cream(`data-lcs-task="play" data-lcs-id="${p.id}"`, title(p.title, 18) + cast + `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:start">${p.scenes.map(scene).join('')}</div>`, 5, 3));
    // the stanzas side by side, each box as wide as its longest line and 10 px inside (no line wraps or touches its
    // box); the title close over them
    blocks.push(cream(`data-lcs-task="poem" data-lcs-id="${poem.id}"`, title(poem.title, 18) + `<div data-lcs-stanzas style="display:flex;justify-content:space-evenly;gap:3px">${poem.stanzas.map((st, i) => white(st.map((l) => `<div data-lcs-pline data-lcs-read style="white-space:nowrap;font:600 ${d.font}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(l)}</div>`).join(''), `data-lcs-stanza="${i + 1}"`, 'flex:0 0 auto;gap:0;padding:4px 10px')).join('')}</div>`, 5, 3, 'padding:5px 0'));
    // Level 3 asks one question (written): no task line over it
    blocks.push(questions(plan.qs, lv === 1 ? 'circle' : lv === 2 ? 'circleWrite' : null, lv === 3 ? 'flex:0 0 auto' : grow));
    if (d.scene3) {
      const s3 = p.scene3, sl = s3.lines;
      // where it happens, four lines of the play, and two to spare; each line holds one speech (its name and its words)
      const keyed = ['(' + s3.set + ')', ...sl.map((l) => l.who + ': ' + l.say)];
      const note = noteParts('(' + NOTE.scene3 + ')', inner), hand = keyed.reduce((t, x) => t + Math.ceil((x.length * HAND) / (inner - 8)), 0) + 1;
      const rows = Math.max(7, hand, keyed.length + note.length + 1);
      const rowsHtml = Array.from({ length: rows }, (_, i) => { const isNote = i >= keyed.length && i < keyed.length + note.length; const a = key ? (i < keyed.length ? (i === 0 ? 'Sample answer: ' : '') + keyed[i] : isNote ? note[i - keyed.length] : null) : null; return rule({ w: inner, answer: a, sample: true, more: !a, note: key && isNote }); }).join('');
      blocks.push(cream('data-lcs-task="scene3"', label('scene3', LINES.scene3) + `<div data-lcs-scene3 data-lcs-note="scene3" data-lcs-room="${keyed.reduce((t, x) => t + x.length, 0)}" style="display:flex;flex-direction:column;gap:0">${rowsHtml}</div>`, 6, 3));
    }
  }

  if (mode === 'chapters') {
    const s = plan.s;
    blocks.push(cream(`data-lcs-task="story" data-lcs-id="${s.id}"`, title(s.title, 20) + white(s.chapters.map((c, i) => `<div data-lcs-chapter="${i + 1}" style="display:flex;flex-direction:column;gap:1px"><div data-lcs-chead data-lcs-read style="font:800 15.5px/1.2 'Nunito',sans-serif;color:${T.teal}">Chapter ${i + 1}: ${esc(c.title)}</div>${para(c.text, d.font, 1.42)}</div>`).join(''), '', 'flex:1 1 auto;justify-content:space-evenly;gap:7px;padding:6px 12px'), 6, 4, 'flex:1 1 auto'));
    if (d.chart) {
      const cw = Math.floor((inner - 2 * 8) / 3) - 20;
      const n = Math.max(...s.happens.map((h) => linesCount({ w: cw, room: h.length, sample: h, prefix: 'Sample: ', kind: 'happens' })));
      blocks.push(cream('data-lcs-task="chart"', label('happens', LINES.happens) + `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${s.happens.map((h, i) => white(`<div data-lcs-colhead data-lcs-read style="font:800 15px/1.2 'Nunito',sans-serif;color:${T.teal}">Chapter ${i + 1}</div>` + lines({ w: cw, room: h.length, key, sample: h, prefix: 'Sample: ', kind: 'happens', n }), `data-lcs-cell="${i + 1}"`)).join('')}</div>`, 6, 4, 'flex:0.6 1 auto;justify-content:space-between'));
    }
    blocks.push(questions(plan.qs, lv === 1 ? 'circle' : 'circleWrite'));
  }

  // views Level 2: the story's room is the page less the chart (320 px) and the proof of this copy (its lines)
  const viewsRoom = (s) => { const pr = s.proofs[plan.who].right.replace(/^"([^"]*)"$/, '$1'); return 811 - 320 - (35.6 + ROWH * linesCount({ w: inner, room: pr.length, sample: pr, kind: 'proof' })) - 12 - 6; };
  // views Level 3: the story's room is the page less this copy's chart (its rows), proof and retelling (their lines), and
  // never more than the room it had before; the four cards of the page sit 4 px inside (ruling F: tighter boxes)
  const pad3 = mode === 'views' && lv === 3 ? 4 : 6;
  const viewsRoom3 = (s) => { const cw = Math.floor((inner - 10) / 2) - 20, vw = s.views[plan.who].right, own = ownFull(s.own), pr = s.proofs[plan.who].right.replace(/^"([^"]*)"$/, '$1'), rs = s.rewrite[plan.rw].sample;
    const rowN = Math.max(linesCount({ w: cw, room: vw.length, sample: vw, prefix: 'Sample: ', kind: 'view' }), linesCount({ w: cw, room: own.length, sample: own, prefix: 'Sample: ', kind: 'own' }) + Math.round((textLines(s.own.q, 14.5, cw, 0.52) * 18.1) / ROWH));
    const n = rowN + linesCount({ w: inner, room: pr.length, sample: pr, kind: 'proof' }) + linesCount({ w: inner, room: rs.length, sample: rs, kind: 'rewrite' });
    return Math.min(STORYFIT.views[3], 811 - 17 - 105 - ROWH * n - 6 + 4); };
  const povStory = (s) => { const room = mode === 'views' && lv === 2 ? viewsRoom(s) : mode === 'views' && lv === 3 ? viewsRoom3(s) : 0, fit = room || (STORYFIT[mode] || {})[lv]; return cream(`data-lcs-task="story" data-lcs-id="${s.id}"`, title(s.title, 20) + white(s.paras.map((p, i) => para(p, d.font, storyLh(s, d, mode, lv, room), i + 1)).join(''), '', `flex:1 1 auto;justify-content:${fit ? 'space-between' : 'space-evenly'};gap:6px;padding:6px 12px`), pad3, 4, 'flex:1 1 auto'); };
  const ownQ = (s, px = 16) => `<div data-lcs-ownq data-lcs-read style="font:600 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(s.own.q)}</div>`;
  const ownAnswer = (s, w, how, n, prefix) => (how === 'frame' ? frame({ w, kind: 'own', parts: [s.own.think, s.own.why + '.'], key, n }) : lines({ w, room: ownFull(s.own).length, key, sample: ownFull(s.own), prefix, kind: 'own', n }));
  const quoteNote = `<div data-lcs-quotenote data-lcs-read style="font:italic 600 15px/1.25 'Nunito',sans-serif;color:${T.inkSoft}">${esc(LINES.quoteNote)}</div>`;

  if (mode === 'teller') {
    const s = plan.s;
    blocks.push(povStory(s));
    if (plan.tell.answer === 'choose') {
      const how = plan.how ? label('howCircle', LINES.howCircle) + `<div data-lcs-q="how" data-lcs-opts style="display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:0 4px">${plan.how.opts.map((o) => pill(o, o === plan.how.right, key, 15.5)).join('')}</div>` : '';
      blocks.push(cream('data-lcs-task="tell"', label('tell', LINES.tell) + quoteNote + `<div data-lcs-q="tell" data-lcs-opts style="display:flex;flex-wrap:wrap;gap:4px 8px;padding:2px 4px">${plan.tell.opts.map((o) => pill(o, o === plan.tell.right, key, 15.5)).join('')}</div>` + how, 6, 4));
    } else {
      const who = s.person === 'first' ? s.chars[0] : OUTSIDE, how = howSample(s);
      blocks.push(cream('data-lcs-task="tell"', label('tellWrite', LINES.tellWrite) + quoteNote + `<div data-lcs-q="tell" data-lcs-written data-lcs-right="${esc(who)}">${lines({ w: inner, room: OUTSIDE.length, spare: false, key, sample: who, prefix: '', kind: 'tell', noteText: s.tellAlso })}</div>` + label('howKnow', LINES.howKnow) + `<div data-lcs-q="how">${lines({ w: inner, room: how.length, key, sample: how, kind: 'how' })}</div>`, 6, 3));
    }
    const rows = plan.thinks.map((t, i) => `<div data-lcs-q="thinks" data-lcs-qtext="${esc(t.s)}" style="flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:${lv === 1 ? 3 : 1}px 8px;border-radius:10px;background:#FFFFFF"><span data-lcs-read style="flex:1 1 auto;font:600 ${lv === 1 ? 17 : 16}px/1.25 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${esc(t.s)}</span><span data-lcs-opts style="flex:0 0 auto;display:inline-flex;gap:6px">${s.chars.map((c, k) => pill(c, k === t.who, key, 15.5)).join('')}</span></div>`).join('');
    blocks.push(cream('data-lcs-task="thinks"', label('thinks', LINES.thinks) + rowsBox(rows), 6, 4, 'flex:1.5 1 auto'));
    blocks.push(cream('data-lcs-task="own"', label('own', LINES.own) + ownQ(s) + ownAnswer(s, inner, d.own, 0), 6, 3));
  }

  if (mode === 'views') {
    const s = plan.s, who = plan.who, name = who === 0 && s.person === 'first' ? 'the narrator, ' + s.chars[0] + ',' : s.chars[who];
    blocks.push(povStory(s));
    if (d.answer === 'choose') {
      blocks.push(cream('data-lcs-task="view"', label('viewQ', LINES.viewQ.replace('{x}', name)) + `<div data-lcs-q="view" data-lcs-opts style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;align-items:flex-start;gap:3px;padding-left:8px">${plan.view.opts.map((o) => pill(o, o === plan.view.right, key, 15.5)).join('')}</div>`, 6, 3, 'flex:1 1 auto'));
      blocks.push(cream('data-lcs-task="proof"', label('proofQ', LINES.proofQ.replace('{x}', name)) + `<div data-lcs-q="proof" data-lcs-opts style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;align-items:flex-start;gap:3px;padding-left:8px">${plan.proof.opts.map((o) => pill(o, o === plan.proof.right, key, 15.5)).join('')}</div>`, 6, 3, 'flex:1 1 auto'));
      blocks.push(cream('data-lcs-task="own"', label('own', LINES.own) + ownQ(s) + ownAnswer(s, inner, 'frame', 0), 6, 3));
    } else {
      // Level 2: the character asked about and the other character side by side, "What I think" across the chart under
      // them; Level 3: the character and me side by side. "What I think" prints the question it answers; every cell holds
      // its sample with a line to spare, and the cells of a row end level: their lines fill the cell to the height of the
      // row (the lines a cell does not hold are cut off under its edge)
      const cw = Math.floor((inner - 10) / 2) - 20, wide = inner - 20;
      const head = (t) => `<div data-lcs-colhead data-lcs-read style="font:800 15.5px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(t)}</div>`;
      const other = 1 - who, oName = other === 0 && s.person === 'first' ? 'the narrator, ' + s.chars[0] + ',' : s.chars[other];
      const hView = LINES.viewHead.replace('{x}', name), hOther = LINES.viewHead.replace('{x}', oName);
      const mineW = lv === 2 ? wide : cw;
      const cellMore = 'padding-bottom:3px';
      // the rows of room of each cell: its lines, and in "What I think" the printed question (about 18 px a line)
      const viewN = (k) => linesCount({ w: cw, room: s.views[k].right.length, sample: s.views[k].right, prefix: 'Sample: ', kind: 'view' });
      const mineN = lv === 2 ? 0 : linesCount({ w: cw, room: ownFull(s.own).length, sample: ownFull(s.own), prefix: 'Sample: ', kind: 'own' });
      const qRows = Math.round((textLines(s.own.q, 14.5, cw, 0.52) * 18.1) / ROWH);
      const rowN = lv === 2 ? Math.max(viewN(0), viewN(1)) : Math.max(viewN(who), mineN + qRows);
      const viewCell = (k, at) => white(head(k === who ? hView : hOther) + lines({ w: cw, room: s.views[k].right.length, key, sample: s.views[k].right, prefix: 'Sample: ', kind: 'view', n: rowN }), `data-lcs-cell="${at}"`, cellMore);
      const mineCell = white(head(LINES.myHead) + ownQ(s, 14.5) + ownAnswer(s, mineW, d.own, lv === 3 ? Math.max(mineN, rowN - qRows) : 0, 'Sample: '), 'data-lcs-cell="mine"', lv === 2 ? 'grid-column:1 / span 2' : cellMore);
      const cells = lv === 2 ? [viewCell(who, 'view'), viewCell(other, 'other'), mineCell] : [viewCell(who, 'view'), mineCell];
      blocks.push(cream('data-lcs-task="chart"', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:stretch">${cells.join('')}</div>`, pad3, 4));
      const proof = s.proofs[who].right.replace(/^"([^"]*)"$/, '$1');
      blocks.push(cream('data-lcs-task="proof"', label('proofCopy', LINES.proofCopy.replace('{x}', name)) + lines({ w: inner, room: proof.length, key, sample: proof, kind: 'proof' }), pad3, 3));
      if (d.rewrite) {
        const r = s.rewrite[plan.rw];
        blocks.push(cream(`data-lcs-task="rewrite" data-lcs-para-no="${r.para}" data-lcs-as="${esc(s.chars[plan.rw])}"`, label('rewrite', LINES.rewrite.replace('{x}', r.para).replace('{y}', s.chars[plan.rw])) + lines({ w: inner, room: r.sample.length, key, sample: r.sample, kind: 'rewrite' }), pad3, 3));
      }
    }
  }

  if (mode === 'literal') {
    const row = (r, i) => {
      const at = r.text.toLowerCase().indexOf(r.p.p.toLowerCase()), sent = esc(r.text.slice(0, at)) + `<b data-lcs-phrase style="font-weight:900">${esc(r.text.slice(at, at + r.p.p.length))}</b>` + esc(r.text.slice(at + r.p.p.length));
      const head = `<div data-lcs-sent data-lcs-read style="font:600 ${d.font}px/${d.answer === 'choose' ? 1.45 : 1.3} 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${sent}</div>`;
      let tail;
      if (d.answer === 'choose') tail = `<div style="display:flex;padding-left:20px"><span data-lcs-ln style="display:inline-flex;gap:6px">${['literal', 'nonliteral'].map((x) => pill(x, (x === 'literal') === (r.use === 'L'), key, d.pill, ' data-lcs-lnpill')).join('')}</span></div><div style="display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;padding-left:20px"><span data-lcs-read style="flex:0 0 auto;font:700 ${d.pill}px/1 'Nunito',sans-serif;color:${T.inkSoft}">${esc(LINES.means)}</span><span data-lcs-opts style="display:inline-flex;flex-wrap:wrap;gap:4px 4px">${r.opts.map((o) => pill(o, o === r.right, key, d.pill)).join('')}</span></div>`;
      else tail = `<div style="display:flex;align-items:flex-end;gap:10px;padding-left:20px">${boxMark(r.use, key)}<span data-lcs-read style="flex:0 0 auto;padding-bottom:5px;font:700 16px/1 'Nunito',sans-serif;color:${T.ink}">${esc(LINES.means)}</span><div style="flex:1 1 auto;min-width:0">${lines({ w: inner - 20 - MARKBOX - 10 - 80 - 12, room: r.right.length, spare: false, key, sample: r.right })}</div></div>`;
      return `<div data-lcs-item="${r.p.id}" data-lcs-use="${r.use}" style="flex:0 0 auto;display:flex;flex-direction:column;gap:${d.answer === 'choose' ? 7 : 2}px;padding:${d.answer === 'choose' ? '5px 8px' : '3px 8px'};border-radius:10px;background:#FFFFFF">${head}${tail}</div>`;
    };
    blocks.push(cream('data-lcs-task="items"', label(d.answer === 'choose' ? 'lit1' : 'lit2', d.answer === 'choose' ? LINES.lit1 : LINES.lit2) + (d.answer === 'choose' ? '' : keyOnly('meanings', key, inner)) + rowsBox(plan.rows.map(row).join('')), 6, 4, grow));
    if (plan.box) {
      const box = `<div data-lcs-box style="display:grid;grid-template-columns:1fr 1fr;gap:2px 14px;padding:4px 10px;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF">${plan.box.map((p) => `<div data-lcs-saying="${p.id}" data-lcs-read style="font:600 15px/1.25 'Nunito',sans-serif;color:${T.ink}"><b>${esc(p.p)}</b>: ${esc(p.nonMean)}</div>`).join('')}</div>`;
      const own = [0, 1].map((k) => `<div data-lcs-ownline="${k + 1}" style="display:flex;flex-direction:column;gap:1px">${lines({ w: inner, room: plan.box[k].own.length, key, sample: plan.box[k].own, kind: 'ownSaying' })}</div>`).join('');
      blocks.push(cream('data-lcs-task="own"', label('litOwn', LINES.litOwn) + box + own, 6, 3));
    }
  }

  if (mode === 'storysort' || mode === 'storychart') {
    const s = plan.s;
    let room;
    if (mode === 'storychart' && d.answer !== 'strips') { const cw = Math.floor((inner - 72 - 2 * 6) / 2) - 16; const rows = ROWS.reduce((t2, r) => t2 + Math.max(...[0, 1].map((st) => linesCount({ w: cw, room: s.chart[r][st].length, sample: s.chart[r][st], prefix: 'Sample: ', kind: r === 'lesson' ? 'lesson' : null }))), 0); room = 811 - 6 - (51 + ROWH * rows + 4 + 18 * noteParts(KEYONLY.chartNotes, inner).length + 2) - 14; }
    blocks.push(twoTexts(['Story 1', 'Story 2'], s.stories, textsFont(s.stories, mode, lv, room, room ? 1.27 : 1.32), room ? 1.27 : 1.32, 'Two stories by ' + s.author, room ? 1 : 0));
  }
  if (mode === 'storysort') {
    const s = plan.s;
    const rows = plan.facts.map((x, i) => `<div data-lcs-q="fact" data-lcs-qtext="${esc(x.s)}" style="flex:0 0 auto;display:flex;align-items:center;gap:10px;padding:${d.row > 16 ? 5 : 1}px 8px;border-radius:10px;background:#FFFFFF"><span data-lcs-read style="flex:1 1 auto;font:600 ${d.row}px/1.25 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${esc(x.s)}</span><span data-lcs-opts style="flex:0 0 auto;display:inline-flex;gap:4px">${SRC.map((o, k) => pill(o, [1, 2, 'both'][k] === x.a, key, d.row > 16 ? 16 : 15.5)).join('')}</span></div>`).join('');
    blocks.push(cream('data-lcs-task="facts"', label('sort', LINES.sort) + rowsBox(rows, 3), 6, 4, grow));
    if (d.alike) blocks.push(cream('data-lcs-task="compare"', label('alike', LINES.alike) + frame({ w: inner, kind: 'alike', parts: [s.alike + '.'], key }) + (d.differ ? label('differ', LINES.differ) + frame({ w: inner, kind: 'differ', parts: [s.differ[0] + ',', s.differ[1] + '.'], key }) : ''), 6, 2));
  }
  if (mode === 'storychart') {
    const s = plan.s, LW = 72, cw = Math.floor((inner - LW - 2 * 6) / 2) - 16;
    const rowN = {};
    if (d.answer !== 'strips') ROWS.forEach((r) => { rowN[r] = Math.max(...[0, 1].map((st) => linesCount({ w: cw, room: s.chart[r][st].length, sample: s.chart[r][st], prefix: 'Sample: ', kind: r === 'lesson' ? 'lesson' : null }))); });
    const cell = (c) => {
      const strip = plan.strips && plan.strips.find((x) => x.cell === c);
      let body;
      if (d.answer === 'strips') body = c.example ? rule({ w: cw, example: c.text }) : `<div style="display:flex;justify-content:center;padding:2px 0">${boxMark(strip.letter, key)}</div>`;
      else if (c.example) body = `<div data-lcs-examplecell style="display:flex;flex-direction:column;gap:0">${Array.from({ length: rowN[c.row] }, (_, i) => rule({ w: cw, example: i ? null : c.text })).join('')}</div>`;
      else body = lines({ w: cw, room: c.text.length, key, sample: c.text, prefix: 'Sample: ', kind: c.row === 'lesson' ? 'lesson' : null, n: rowN[c.row] });
      return white(body, `data-lcs-cell="${c.st + 1}|${c.row}"${c.example ? ' data-lcs-isexample' : ''}`, 'padding:0 8px;justify-content:center');
    };
    const head = `<div></div>${['Story 1', 'Story 2'].map((h) => `<div data-lcs-colhead data-lcs-read style="font:800 15.5px/1.2 'Nunito',sans-serif;color:${T.teal};text-align:center">${h}</div>`).join('')}`;
    const rowsHtml = ROWS.map((r) => `<div data-lcs-rowname="${r}" data-lcs-read style="align-self:center;font:800 14.5px/1.2 'Nunito',sans-serif;color:${T.ink}">${ROWNAME[r]}</div>` + [0, 1].map((st) => cell(plan.cells.find((c) => c.st === st && c.row === r))).join('')).join('');
    const chart = `<div data-lcs-chart style="flex:1 1 auto;display:grid;grid-template-columns:${LW}px 1fr 1fr;align-items:stretch;align-content:space-between;gap:0 6px">${head}${rowsHtml}</div>`;
    const lab = d.answer === 'strips' ? 'strips' : d.examples ? 'chart' : 'chartAll';
    blocks.push(cream('data-lcs-task="chart"', label(lab, LINES[lab]) + chart + (d.answer === 'strips' ? '' : keyOnly('chartNotes', key, inner)), 4, d.answer === 'strips' ? 4 : 3, d.answer === 'strips' ? 'flex:0.6 1 auto' : 'flex:0 1 auto'));
    if (plan.strips) blocks.push(cream('data-lcs-task="strips"', `<div data-lcs-striplist style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;align-content:space-around;gap:3px 14px">${plan.strips.map((x) => `<div data-lcs-strip="${x.letter}"${x.cell ? '' : ' data-lcs-neither'} data-lcs-read style="font:600 15px/1.25 'Nunito',sans-serif;color:${T.ink};padding:2px 8px;border:2px dashed #8C8479;border-radius:8px;background:#FFFFFF"><b style="color:${T.teal}">${x.letter}</b>&nbsp; <span data-lcs-striptext style="${key && !x.cell ? `text-decoration:line-through;text-decoration-color:${T.teal};text-decoration-thickness:2.5px` : ''}">${esc(x.text)}</span></div>`).join('')}</div>`, 6, 3, 'flex:1 1 auto'));
  }

  if (mode === 'textsort' || mode === 'textchart') {
    const t = plan.t;
    let room;
    if (mode === 'textchart' && d.answer !== 'choose') { const cw = Math.floor((inner - 10) / 2) - 20, smp = (r, k) => (r === 'main' ? t.main[k] : r === 'only' ? plan.only[k] : t.details[k][0]); const rows = plan.rows.reduce((t2, r) => t2 + Math.max(...[0, 1].map((k) => linesCount({ w: cw, room: smp(r, k).length, sample: smp(r, k), prefix: 'Sample: ' }))), 0); const bl = (plan.bottom === 'both' ? [[t.both, 'both']] : [[t.alike, 'textAlike'], [t.differ, 'textDiffer']]).reduce((t2, [sm, k]) => t2 + linesCount({ w: inner, room: sm.length, sample: sm, kind: k }), 0); room = 811 - 12 - (lv === 2 ? 88 : 64) - ROWH * rows - 4 - 18 * noteParts(KEYONLY.tcNotes, inner).length - (lv === 2 ? 31 : 55) - ROWH * bl - 20; }
    blocks.push(twoTexts(['Text 1', 'Text 2'], t.texts, textsFont(t.texts, mode, lv, room, room ? 1.27 : 1.32), room ? 1.27 : 1.32, 'Two texts about ' + t.topic.split(' ').map((w) => (/^(Moon|Earth)$/.test(w) ? w : w.toLowerCase())).join(' '), room ? 1 : 0));
  }
  if (mode === 'textsort') {
    // two ovals as tall as their column allows (at least round, at most 1.5 times as tall as wide); the side parts are
    // named above, the shared middle below
    const VW = 300, R = 95, D = 110, C1 = VW / 2 - D / 2, C2 = VW / 2 + D / 2, VMIN = 2 * R + 48, VMAX = Math.round(2 * R * 1.5) + 48;
    const cx = [(C1 - R + (C2 - R)) / 2, VW / 2, (C1 + R + (C2 + R)) / 2];
    const letters = key ? [0, 1, 2].flatMap((rg) => { const ls = plan.strips.filter((x) => x.region === rg).map((x) => x.letter).sort(); return ls.map((l, k) => `<span data-lcs-keyletter="${l}" data-lcs-region="${rg}" style="position:absolute;left:${(cx[rg] - 10).toFixed(1)}px;top:calc(50% + ${(k * 26 - ls.length * 13).toFixed(1)}px);width:20px;text-align:center;font:800 20px/24px 'Nunito',sans-serif;color:${T.teal}">${l}</span>`); }).join('') : '';
    const venn = `<div data-lcs-venn data-lcs-vw="${VW}" style="position:relative;width:${VW}px;min-height:${VMIN}px;flex:0 0 auto;align-self:stretch"><div data-lcs-vennbox style="position:absolute;left:0;width:${VW}px;top:50%;height:min(100%, ${VMAX}px);transform:translateY(-50%)">` +
      [C1, C2].map((c, i) => `<div data-lcs-circle="${i + 1}" style="position:absolute;left:${c - R}px;width:${2 * R}px;top:24px;bottom:24px;box-sizing:border-box;border:2.5px solid ${T.teal};border-radius:50%"></div>`).join('') +
      REGION.map((x, k) => `<div data-lcs-regionlabel="${k}" data-lcs-read style="position:absolute;left:${(cx[k] - 60).toFixed(1)}px;${k === 1 ? 'bottom:0' : 'top:0'};width:120px;text-align:center;font:800 15px/20px 'Nunito',sans-serif;color:${T.ink}">${esc(x)}</div>`).join('') + letters + `</div></div>`;
    const strips = `<div data-lcs-striplist style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;justify-content:space-evenly;gap:3px">${plan.strips.map((x) => `<div data-lcs-strip="${x.letter}"${x.region < 0 ? ' data-lcs-neither' : ''} data-lcs-region="${x.region}" data-lcs-read style="white-space:nowrap;font:600 14.5px/1.25 'Nunito',sans-serif;color:${T.ink};padding:2px 8px;border:2px dashed #8C8479;border-radius:8px;background:#FFFFFF"><b style="color:${T.teal}">${x.letter}</b>&nbsp; <span data-lcs-striptext style="${key && x.region < 0 ? `text-decoration:line-through;text-decoration-color:${T.teal};text-decoration-thickness:2.5px` : ''}">${esc(x.text)}</span></div>`).join('')}</div>`;
    blocks.push(cream('data-lcs-task="venn"', label(d.neither ? 'vennNeither' : 'venn', d.neither ? LINES.vennNeither : LINES.venn) + `<div style="flex:1 1 auto;display:flex;align-items:stretch;gap:12px">${venn}${strips}</div>`, 6, 5, grow));
    if (d.differ) blocks.push(cream('data-lcs-task="compare"', label('textDiffer', LINES.textDiffer) + lines({ w: inner, room: plan.t.differ.length, key, sample: plan.t.differ, kind: 'textDiffer' }), 6, 2));
  }
  if (mode === 'textchart') {
    const t = plan.t;
    if (d.answer === 'choose') {
      blocks.push(cream('data-lcs-task="questions"', label('circle', LINES.circle) + rowsBox(plan.qs.map((q, i) => choiceQ(q, i + 1, key, { font: 16.5 })).join('')), 6, 4, grow));
    } else {
      // a card for each text: its most important point and one more detail, each with a line to spare; both cards
      // get the same number of lines in each part
      const cw = Math.floor((inner - 10) / 2) - 20;
      const smp = (r, k) => (r === 'main' ? t.main[k] : r === 'only' ? plan.only[k] : t.details[k][0]);
      const NAME = { main: LINES.rowMain, detail: LINES.rowDetail, only: LINES.rowOnly };
      const nOf = (r) => Math.max(...[0, 1].map((k) => linesCount({ w: cw, room: smp(r, k).length, sample: smp(r, k), prefix: 'Sample: ' })));
      const rn = (r, text) => `<div data-lcs-rowname="${r}" data-lcs-read style="font:800 15px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(text)}</div>`;
      const card = (k) => white(plan.rows.map((r, ri) => (ri ? rn(r, NAME[r]) : `<div style="display:flex;align-items:baseline;justify-content:space-between;gap:8px">${rn(r, NAME[r])}<div data-lcs-colhead data-lcs-read style="font:800 15.5px/1.2 'Nunito',sans-serif;color:${T.teal}">Text ${k + 1}</div></div>`) +
        `<div data-lcs-cell="${k + 1}|${r}">${lines({ w: cw, room: smp(r, k).length, key, sample: smp(r, k), prefix: 'Sample: ', n: nOf(r) })}</div>`).join(''), `data-lcs-card="${k + 1}"`);
      // what else is right: one line of the key under the chart (the notes are samples)
      blocks.push(cream('data-lcs-task="chart"', label('tcChart', LINES.tcChart) + `<div data-lcs-chart style="display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:stretch">${card(0)}${card(1)}</div>` + keyOnly('tcNotes', key, inner), 4, 4));
      const parts = plan.bottom === 'both' ? [['bothNote', t.both, 'both']] : [['textAlike', t.alike, 'textAlike'], ['textDiffer', t.differ, 'textDiffer']];
      blocks.push(cream(`data-lcs-task="bottom" data-lcs-bottom="${plan.bottom}"`, parts.map(([lb, sample, kind]) => `<div data-lcs-ask style="display:flex;flex-direction:column;gap:2px">${label(lb, LINES[lb])}${lines({ w: inner, room: sample.length, key, sample, kind })}</div>`).join(''), 4, 6));
    }
  }
  return blocks;
}

/** what verify() needs to know of the bank */
function infoOf() {
  return {
    plays: Object.fromEntries(BANK.plays.map((p) => [p.id, p])), poems: Object.fromEntries(BANK.poems.map((p) => [p.id, p])),
    chapters: Object.fromEntries(BANK.chapters.map((s) => [s.id, s])), pov: Object.fromEntries(BANK.pov.map((s) => [s.id, { ...s, howSample: howSample(s) }])),
    phrases: Object.fromEntries(BANK.phrases.map((p) => [p.id, p])), series: Object.fromEntries(BANK.series.map((s) => [s.id, s])),
    topics: Object.fromEntries(BANK.topics.map((t) => [t.id, t])),
  };
}

function makeComparingTextsG3Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('comparing-texts-g3: unknown mode ' + mode);
  const INFO = infoOf();
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // the unit checks (Part 7.6): the page's task made small, one card a task (ctCheckPage below; the pages whose tasks
    // need more text than a check card holds, or ask for the child's own words, give no check)
    ...(CT_CHECK_MODES.has(mode) ? { checkPage(args, ctx) { return ctCheckPage(mode, args, ctx); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the texts are English texts (no ${locale} bank)`);
      const lv = Number(difficulty) || 2;
      const key = !!(ctx && ctx.answerKey);
      const plan = drawPage(BANK, mode, lv, ctx.rng, (ctx && ctx.variant) || 1);
      const blocks = renderPage(plan, key);
      const extra = mode === 'views' ? ` data-lcs-who="${plan.who}" data-lcs-rw="${plan.rw}"` : mode === 'textchart' && plan.rows ? ` data-lcs-rows="${plan.rows.join(',')}" data-lcs-bottom="${plan.bottom}"` : mode === 'storychart' ? ` data-lcs-exstory="${plan.visit % 2}"` : '';
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-ct="${mode}|${lv}" data-lcs-set="${esc(plan.set)}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''}${extra} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.set, items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((INFO) => {
        // ---- the ruled texts and measures: verify's OWN copy (a changed build constant cannot pass its own check)
        const RULED = {
          ROWH: 36, HAND: 15.5, BAND: 40, MARKBOX: 36, READ: 14.2, PILL: 15.5, LABEL: 16, FILL: 0.8, PASSAGE: 15.5, PASSAGE1: 16, NOTEPX: 14,
          keyOnly: { chartNotes: '(The notes are samples: any words that tell the same setting, problem, solution, or lesson are right.)', meanings: '(Any words with the same meaning are right.)', tcNotes: '(The notes are samples: any words that give the same point or detail are right.)' },
          keyOnlyOf: { storychart: { 2: 'chartNotes', 3: 'chartNotes' }, literal: { 2: 'meanings', 3: 'meanings' }, textchart: { 2: 'tcNotes', 3: 'tcNotes' } },
          OUTSIDE: 'a narrator who is not in the story',
          HOW: ['The narrator says I and my.', 'The narrator does not say I or my outside quotation marks.'],
          instr: {
            stage: { 1: 'A play is divided into scenes. A poem is divided into stanzas.', 2: 'Each scene and each stanza builds on the parts before it.', 3: 'A new scene builds on what happened in the scenes before it.' },
            chapters: { 1: 'A long story is divided into parts called chapters.', 2: 'Each chapter builds on what happened in the chapter before.', 3: 'Tell what happens in each chapter and how the parts connect.' },
            teller: { 1: 'The narrator is the one who tells the story.', 2: 'A narrator who says I and my is a character in the story.', 3: 'You can think differently from the characters in a story.' },
            views: { 1: 'Characters in a story can think differently from you.', 2: 'Tell what a character thinks, then tell what you think.', 3: 'Tell a part of the story the way another character would.' },
            literal: { 1: 'Literal words mean just what they say. Nonliteral words do not.', 2: 'A nonliteral phrase means something different from its words.', 3: 'Use the sentence to tell if a phrase is literal or nonliteral.' },
            storysort: { 1: 'One author can write two stories about the same characters.', 2: 'Find what is alike and different in the two stories.', 3: 'Compare the settings, plots, and lessons of two stories.' },
            storychart: { 1: 'Stories by one author can have different settings and problems.', 2: 'Compare the setting, problem, solution, and lesson of each story.', 3: 'Compare the two stories part by part, with no examples to help.' },
            textsort: { 1: 'Two texts on one topic can tell different facts.', 2: 'Some facts are in one text, and some are in both texts.', 3: 'Compare the facts in two texts on the same topic.' },
            textchart: { 1: 'Each text has its own most important point.', 2: 'Compare the most important points and key details.', 3: 'Tell how two texts on one topic are alike and different.' },
          },
          lines: {
            circle: 'Circle the answer to each question.', circleWrite: 'Circle or write the answer to each question.',
            build: 'What happens in Scene 2 that could not happen without Scene 1?', adds: 'What does Stanza 3 add to the poem?',
            scene3: 'Write Scene 3. First write where it happens, in parentheses. Then write four lines for the characters to say. Use the names in the cast.',
            build2: 'How does Chapter 2 build on Chapter 1?', build3: 'How does Chapter 3 build on Chapter 2?', happens: 'Write what happens in each chapter.',
            tell: 'Who is telling the story? Circle the answer.', tellWrite: 'Who is telling the story?', quoteNote: 'Words in quotation marks are what a character says.',
            howCircle: 'How do you know? Circle the answer.', howKnow: 'How do you know?',
            thinks: 'Who thinks this? Circle the name.', own: 'What do YOU think? Write your idea and a reason.',
            viewQ: 'What does {x} think? Circle the answer.', proofQ: 'Which sentence from the story shows what {x} thinks? Circle it.',
            viewHead: 'What {x} thinks', myHead: 'What I think', proofCopy: 'Copy a sentence from the story that shows what {x} thinks.',
            rewrite: 'Tell paragraph {x} the way {y} would tell it. Use I and my.',
            lit1: 'Is the bold phrase literal or nonliteral? Circle one. Then circle what it means here.',
            lit2: 'Write L (literal) or N (nonliteral). Then write what the bold words mean here.',
            litOwn: 'Choose two sayings from the box. Write a sentence for each that uses it nonliterally.', means: 'It means:',
            sort: 'Which story tells this? Circle Story 1, Story 2, or Both.',
            alike: 'How are the two stories alike? Finish the sentence.', differ: 'How are the two stories different? Finish the sentence.',
            strips: 'Write the letter of each strip in its box. Cross out the two strips that are in neither story.',
            chart: 'Fill in the chart for each story. The gray words are examples.', chartAll: 'Fill in every box of the chart for each story.',
            venn: 'Write the letter of each fact in the right part of the diagram.',
            vennNeither: 'Write the letter of each fact in the right part. Two facts are in neither text: cross them out.',
            textDiffer: 'How are the two texts different? Write a sentence.', textAlike: 'How are the two texts alike? Write a sentence.',
            main1: 'What is the most important point of Text 1?', main2: 'What is the most important point of Text 2?', bothQ: 'Which key detail do both texts give?',
            tcChart: 'Fill in the chart for each text.', rowMain: 'Most important point', rowDetail: 'A key detail', rowOnly: 'A detail only this text gives', bothNote: 'Something both texts tell:',
          },
          frames: { build: ['In Scene 2,', 'because in Scene 1,'], build2: ['In Chapter 2,', 'because in Chapter 1,'], build3: ['In Chapter 3,', 'because in Chapter 2,'], adds: ['In Stanza 3,'], own: ['I think', 'because'], alike: ['In both stories,'], differ: ['In Story 1,', 'but in Story 2,'] },
          notes: {
            build: 'Accept any answer that names what the earlier part made happen.', build2: 'Accept any answer that names what the earlier part made happen.', build3: 'Accept any answer that names what the earlier part made happen.',
            adds: 'Accept any answer that names what Stanza 3 adds.', happens: 'Any words that tell what happens.', own: 'Any idea with a reason is right.',
            how: 'Accept any answer about the words I and my.', view: 'Any words that tell this view.', proof: 'Any sentence that shows this view.',
            rewrite: 'Any retelling with I and my that keeps what happens.', ownSaying: 'Any sentence that uses the saying nonliterally.',
            alike: 'Any way the stories are alike is right.', differ: 'Any way the stories are different is right.', lesson: 'Any lesson the story shows.',
            main: 'Any words that give the main point.', detail: 'Any key detail of this text.', only: 'Any detail that only this text gives.',
            both: 'Any fact that both texts give.', textAlike: 'Any way the texts are alike is right.', textDiffer: 'Any way the texts are different is right.',
            scene3: 'Any four lines with names from the cast that follow from Scene 2.',
          },
          // the open answers that must say in the key what else is right
          mustNote: { stage: { 2: 'build,adds', 3: 'adds,scene3' }, chapters: { 2: 'build2,build3', 3: 'happens' }, teller: { 1: 'own', 2: 'own', 3: 'tell,how,own' }, views: { 1: 'own', 2: 'view,own,proof', 3: 'view,own,proof,rewrite' }, literal: { 3: 'ownSaying' }, storysort: { 2: 'alike', 3: 'alike,differ' }, storychart: { 2: 'lesson', 3: 'lesson' }, textsort: { 3: 'textDiffer' }, textchart: { 2: 'both', 3: 'textAlike,textDiffer' } },
          // the sentence frames of each level (the easier levels; none on Level 3 but the storysort compare)
          frameKinds: { stage: { 2: 'build,adds' }, chapters: { 2: 'build2,build3' }, teller: { 1: 'own', 2: 'own' }, views: { 1: 'own', 2: 'own' }, storysort: { 2: 'alike', 3: 'alike,differ' } },
          // what each level holds (the order of its tasks)
          tasks: {
            stage: { 1: 'play,poem,questions', 2: 'play,poem,questions', 3: 'play,poem,questions,scene3' },
            chapters: { 1: 'story,questions', 2: 'story,questions', 3: 'story,chart,questions' },
            teller: { 1: 'story,tell,thinks,own', 2: 'story,tell,thinks,own', 3: 'story,tell,thinks,own' },
            views: { 1: 'story,view,proof,own', 2: 'story,chart,proof', 3: 'story,chart,proof,rewrite' },
            literal: { 1: 'items', 2: 'items', 3: 'items,own' },
            storysort: { 1: 'texts,facts', 2: 'texts,facts,compare', 3: 'texts,facts,compare' },
            storychart: { 1: 'texts,chart,strips', 2: 'texts,chart', 3: 'texts,chart' },
            textsort: { 1: 'texts,venn', 2: 'texts,venn', 3: 'texts,venn,compare' },
            textchart: { 1: 'texts,questions', 2: 'texts,chart,bottom', 3: 'texts,chart,bottom' },
          },
          counts: { stage: { 1: 'pwhere,build,swhere,adds', 2: 'build,swhere,adds|pwhere,build,swhere,adds', 3: 'adds' }, chapters: { 1: 5, 2: 3, 3: 2 }, thinks: { 1: 3, 2: 4, 3: 3 }, literal: { 1: 6, 2: 8, 3: 6 }, storysort: { 1: 7, 2: 8, 3: 5 }, textsort: { 1: 8, 2: 10, 3: 10 } },
        };
        const fails = [];
        const root = document.querySelector('[data-lcs-ct]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsCt.split('|'), lv = +lvS;
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const straight = (s) => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
        const txt = (e) => straight(e.textContent.replace(/\s+/g, ' ').trim());
        const flat = (s) => straight(String(s).replace(/\s+/g, ''));
        const TEAL = 'rgb(20, 107, 94)';
        const rb = R(root);
        // ---- letters: ligatures off, room after an f before i, f, l, t and a t before t; typographic quotes; no picture
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (/f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        if ([...root.querySelectorAll('[data-lcs-fsep]')].some((e) => /flex|grid/.test(cs(e.parentElement).display))) fails.push('the letters of a line stand as boxes of a flex row: its spaces vanish');
        if (root.querySelectorAll('img').length) fails.push('a picture on a page without pictures');
        { const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
          while ((n = tw.nextNode())) { const pe = n.parentElement; if (!pe || /^(STYLE|SCRIPT|NOSCRIPT|TEMPLATE)$/.test(pe.tagName)) continue; if (/['"]/.test(n.textContent)) { fails.push('a printed text holds a straight apostrophe or quote: "' + n.textContent.trim().slice(0, 40) + '"'); break; } } }
        // ---- the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
        // lines that fill the room under the last answer: the ones under the edge of their box are cut off (not seen)
        const fillOf = (e) => e.closest('[data-lcs-fill]');
        const cutOff = (e) => { const f = fillOf(e); if (!f) return false; const q = R(e), fr = R(f); return q.width < 1 || q.left >= fr.right - 0.5 || q.bottom > fr.bottom + 0.5; };
        const seen = (g) => [...g.querySelectorAll('[data-lcs-line]')].filter((l) => !cutOff(l));
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('span, div, p, b, i, svg').forEach((e) => { const q = R(e); if (q.width && !cutOff(e) && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * RULED.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const kinds = blocks.map((b) => b.dataset.lcsTask).join();
        if (kinds !== RULED.tasks[mode][lv]) fails.push(`the tasks are ${kinds}, not ${RULED.tasks[mode][lv]}`);
        // ---- sizes; ONE row height: every writing line is ROWH high and the lines of an answer stand at that pitch
        root.querySelectorAll('[data-lcs-line]').forEach((l) => { if (Math.abs(R(l).height - RULED.ROWH) > 0.5) fails.push(`a writing line ${Math.round(R(l).height)} px high, not ${RULED.ROWH} (one row height on every page)`); });
        root.querySelectorAll('[data-lcs-lines], [data-lcs-frame], [data-lcs-scene3], [data-lcs-examplecell]').forEach((g) => { const ls = seen(g); ls.forEach((l, i) => { if (i && Math.abs(R(l).top - R(ls[i - 1]).top - RULED.ROWH) > 0.5) fails.push(`the lines of an answer stand ${Math.round(R(l).top - R(ls[i - 1]).top)} px apart, not ${RULED.ROWH} (rows spread)`); }); });
        root.querySelectorAll('[data-lcs-lines]').forEach((g) => { const ls = seen(g), ws = ls.map((l) => R(l).width), sum = ws.reduce((t, x) => t + x, 0), need = (+g.dataset.lcsRoom) * RULED.HAND + (g.dataset.lcsSpare === '1' ? Math.max(...ws) : 0);
          if (!ls.length || sum < need - 0.5) fails.push(`lines of ${Math.round(sum)} px in all have no room for a third grader to write ${g.dataset.lcsRoom} letters${g.dataset.lcsSpare === '1' ? ' with a line to spare' : ''}`); });
        // a sentence frame: its printed words are the ruled ones; each part has room after them (and on the lines that go
        // on from it) for its letters; one line to spare
        root.querySelectorAll('[data-lcs-frame]').forEach((g) => {
          const kind = g.dataset.lcsFrame, want = RULED.frames[kind] || [], st = [...g.querySelectorAll('[data-lcs-starter]')].map(txt);
          if (st.join('|') !== want.map(straight).join('|')) fails.push(`the frame "${st.join(' ___ ')} ___" is not the ruled "${want.join(' ___ ')} ___"`);
          g.querySelectorAll('[data-lcs-framerow]').forEach((l) => { const ri = l.dataset.lcsFramerow, s = l.querySelector('[data-lcs-starter]'); const free = R(l).right - 4 - (s ? R(s).right + 8 : R(l).left + 4); const cont = [...g.querySelectorAll(`[data-lcs-cont="${ri}"]`)].reduce((t, c) => t + R(c).width - 8, 0); if (free + cont < (+l.dataset.lcsRoom) * RULED.HAND - 0.5) fails.push(`the frame "${s ? txt(s) : ''} ___" leaves ${Math.round(free + cont)} px for ${l.dataset.lcsRoom} letters`); });
          if (!g.querySelector('[data-lcs-spareline]')) fails.push('a sentence frame has no line to spare');
        });
        const fk = ((RULED.frameKinds[mode] || {})[lv] || '').split(',').filter(Boolean);
        if ([...root.querySelectorAll('[data-lcs-frame]')].map((g) => g.dataset.lcsFrame).sort().join() !== fk.slice().sort().join()) fails.push(`the sentence frames are ${[...root.querySelectorAll('[data-lcs-frame]')].map((g) => g.dataset.lcsFrame).join() || 'none'}, not those of level ${lv} (${fk.join() || 'none'})`);
        root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < RULED.READ) fails.push('text a third grader reads is smaller than ' + RULED.READ + ' px'); });
        root.querySelectorAll('[data-lcs-pill]').forEach((e) => { if (fs(e) < RULED.PILL) fails.push('a word to circle is smaller than ' + RULED.PILL + ' px'); });
        root.querySelectorAll('[data-lcs-label]').forEach((e) => { if (fs(e) < RULED.LABEL) fails.push('a task line is smaller than ' + RULED.LABEL + ' px'); });
        root.querySelectorAll('[data-lcs-markbox]').forEach((e) => { if (R(e).width < RULED.MARKBOX - 0.5 || R(e).height < RULED.MARKBOX - 0.5) fails.push(`a box for a letter is smaller than ${RULED.MARKBOX} px`); });
        // ---- no blank band higher than BAND px a reader sees: on the whole page (between and inside the tasks) and inside
        // every box (a text box, a scene, a stanza, a chart cell). Ink is what is printed: text, ruled lines and borders,
        // the circles; a box's own background is no ink (an empty white box is a blank band)
        { const visible = (e) => { const s = cs(e); return s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity !== 0; };
          const ink = [];
          const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
          // what is printed inside a box that cuts off its lines counts only above that edge
          const put = (e, t, b2, l, r) => { const f = fillOf(e); if (f) { const fr = R(f); if (r <= fr.left + 0.5 || l >= fr.right - 0.5) return; t = Math.max(t, fr.top); b2 = Math.min(b2, fr.bottom); } if (b2 > t) ink.push([t, b2, l, r]); };
          while ((n = tw.nextNode())) { if (!n.textContent.trim() || !visible(n.parentElement)) continue; const rg = document.createRange(); rg.selectNodeContents(n); [...rg.getClientRects()].forEach((q) => q.height && put(n.parentElement, q.top, q.bottom, q.left, q.right)); }
          root.querySelectorAll('*').forEach((e) => { if (!visible(e)) return; const s = cs(e), q = R(e); if (!q.height) return;
            const on = (sd) => parseFloat(s['border' + sd + 'Width']) > 0 && s['border' + sd + 'Style'] !== 'none' && !/rgba\(0, 0, 0, 0\)|transparent/.test(s['border' + sd + 'Color']);
            if (on('Left') || on('Right') || e.tagName === 'circle') put(e, q.top, q.bottom, q.left, q.right);
            else { if (on('Top')) put(e, q.top, q.top + parseFloat(s.borderTopWidth), q.left, q.right); if (on('Bottom')) put(e, q.bottom - parseFloat(s.borderBottomWidth), q.bottom, q.left, q.right); } });
          const worstIn = (box) => { const iv = ink.filter((x) => x[1] > box.top + 0.5 && x[0] < box.bottom - 0.5 && x[3] > box.left + 0.5 && x[2] < box.right - 0.5).sort((a, c) => a[0] - c[0]); let reach = box.top, worst = 0, at = box.top; for (const [t, bt] of iv) { if (t - reach > worst) { worst = t - reach; at = reach; } reach = Math.max(reach, bt); } if (box.bottom - reach > worst) { worst = box.bottom - reach; at = reach; } return { worst, at }; };
          const all = worstIn(rb);
          if (all.worst > RULED.BAND) fails.push(`a blank band of ${Math.round(all.worst)} px ${Math.round(all.at - rb.top)} px below the top of the page body (most ${RULED.BAND})`);
          root.querySelectorAll('[data-lcs-bandbox]').forEach((bx) => { const r = R(bx), w = worstIn(r); if (w.worst > RULED.BAND) fails.push(`a blank band of ${Math.round(w.worst)} px inside a box ${Math.round(w.at - rb.top)} px below the top of the page body (most ${RULED.BAND})`); }); }
        // ---- the key: its words stand whole on their lines; nothing keyed on the child's page
        root.querySelectorAll('[data-lcs-keytext]').forEach((k) => { const l = k.closest('[data-lcs-line]'); if (R(k).right > R(l).right - 3 || fs(k) < 12) fails.push(`the key's answer "${txt(k)}" is wider than its line, or shrunk to fit it`); });
        root.querySelectorAll('[data-lcs-line]').forEach((l) => { const k = l.querySelector('[data-lcs-keytext]'); if (!isKey && (k || l.dataset.lcsAnswer)) fails.push('a writing line of the child\'s page holds an answer'); if (k && txt(k) !== straight(l.dataset.lcsAnswer)) fails.push('a key line does not write its answer'); });
        const keyLines = (g) => [...g.querySelectorAll('[data-lcs-line]')].map((l) => l.querySelector('[data-lcs-keytext]')).filter(Boolean).map(txt);
        root.querySelectorAll('[data-lcs-lines]').forEach((g) => { const ls = [...g.querySelectorAll('[data-lcs-line]')]; if (isKey && (!ls[0] || !ls[0].querySelector('[data-lcs-keytext]')) && !g.closest('[data-lcs-isexample]')) fails.push('the first line of a written answer is empty in the key'); if (isKey && ls.some((l, i) => i && l.querySelector('[data-lcs-keytext]') && !ls[i - 1].querySelector('[data-lcs-keytext]'))) fails.push('a key leaves a line empty inside its answer'); const k0 = ls[0] && ls[0].querySelector('[data-lcs-keytext]'); const fixed = !!g.closest('[data-lcs-q="tell"]'); if (k0 && (fixed ? /^Sample/.test(txt(k0)) : !/^Sample( answer)?: /.test(txt(k0)))) fails.push(fixed ? 'the key marks a fixed answer as a sample' : 'a key of the child\'s own words is not marked as a sample'); if (g.closest('[data-lcs-cell]') && k0 && !/^Sample: /.test(txt(k0))) fails.push('a chart cell of the key is not marked as a sample'); });
        // what else is right: every open answer of its kind ends, in the key, with the ruled note; a frame's note also
        // marks it as a sample
        root.querySelectorAll('[data-lcs-note]').forEach((g) => { const kind = g.dataset.lcsNote, note = kind === 'tell' ? ((INFO.pov[(root.dataset.lcsSet || '').split('|')[0]] || {}).tellAlso) : RULED.notes[kind]; if (!note) { fails.push(`an answer says "${kind}" is right in another way, but no note is ruled for it`); return; }
          const nl = [...g.querySelectorAll('[data-lcs-keynote]')]; if (!isKey) { if (nl.length) fails.push('a note of the key stands on the child\'s page'); return; }
          const want = straight(g.dataset.lcsFrame !== undefined ? '(Sample answer. ' + note + ')' : '(' + note + ')'); if (nl.map(txt).join(' ') !== want) fails.push(`the key does not say what else is right after "${keyLines(g)[0] || ''}": "${nl.map(txt).join(' ')}", not "${want}"`); });
        { const must = ((RULED.mustNote[mode] || {})[lv] || '').split(',').filter(Boolean), got = new Set([...root.querySelectorAll('[data-lcs-note]')].map((g) => g.dataset.lcsNote)); must.forEach((k) => { if (!got.has(k)) fails.push(`the ${k} answer does not say in the key what else is right`); }); }
        // what else is right prints in ONE size on every page (finding 40)
        root.querySelectorAll('[data-lcs-keynote] [data-lcs-keytext], [data-lcs-keyonlytext]').forEach((e) => { if (Math.abs(fs(e) - RULED.NOTEPX) > 0.05) fails.push(`a line of the key that says what else is right is ${fs(e)} px, not ${RULED.NOTEPX} (one size)`); });
        // the key lines that stand once over a task (findings 22 and 39): on the key the ruled words, on the page nothing
        { const want = (RULED.keyOnlyOf[mode] || {})[lv], ko = [...root.querySelectorAll('[data-lcs-keyonly]')]; if (!isKey) { if (ko.length) fails.push('a line of the key stands on the child\'s page'); } else if ((want ? 1 : 0) !== ko.length || (want && ko[0].dataset.lcsKeyonly !== want)) fails.push(`the key line of the task is ${ko.map((e) => e.dataset.lcsKeyonly).join() || 'missing'}, not ${want || 'none'}`); else if (want && [...ko[0].querySelectorAll('[data-lcs-keyonlytext]')].map(txt).join(' ') !== straight(RULED.keyOnly[want])) fails.push(`the key does not say "${RULED.keyOnly[want]}"`); }
        // an answer gets the lines its sample needs and one to spare (and the key's note), not the room left on the page
        // (ruling F; the cells of a chart row are equal, so they may hold more)
        root.querySelectorAll('[data-lcs-lines]').forEach((g) => { if (g.closest('[data-lcs-cell]')) return; const ls = seen(g); if (!ls.length) return; const w = Math.max(...ls.map((l) => R(l).width)), need = Math.ceil((+g.dataset.lcsRoom * RULED.HAND) / w) + 2; if (ls.length > need) fails.push(`an answer of ${g.dataset.lcsRoom} letters has ${ls.length} lines (it needs ${need} at the most)`); });
        // every passage a child reads is 15.5 px at the least, 16 on Level 1 (finding 9, ruling F)
        root.querySelectorAll('[data-lcs-para], [data-lcs-speech], [data-lcs-pline], [data-lcs-cast], [data-lcs-dir], [data-lcs-sent]').forEach((e) => { const min = lv === 1 ? RULED.PASSAGE1 : RULED.PASSAGE; if (fs(e) < min - 0.01) fails.push(`a passage is set at ${fs(e)} px (at the least ${min} on level ${lv})`); });
        root.querySelectorAll('[data-lcs-scene3]').forEach((g) => { const ls = seen(g), ws = ls.map((l) => R(l).width); if (ls.length < 7 || ws.reduce((t, x) => t + x, 0) < (+g.dataset.lcsRoom) * RULED.HAND + Math.max(...ws) - 0.5) fails.push('Scene 3 has not seven lines, or no room for the whole scene with a line to spare'); if (isKey && ls[0] && !/^Sample answer: \(.+\)$/.test(txt(ls[0]))) fails.push('the sample Scene 3 does not start with where it happens, marked as a sample'); });
        root.querySelectorAll('[data-lcs-pill]').forEach((p) => { const ringed = cs(p).borderTopColor === TEAL; if (isKey ? ringed !== !!p.dataset.lcsOk : ringed) fails.push('a choice is ringed on the page of the child, or the key rings the wrong one'); });
        root.querySelectorAll('[data-lcs-markbox]').forEach((q) => { if (isKey ? txt(q) !== q.dataset.lcsWant : txt(q)) fails.push('a box is filled on the page of the child, or the key does not fill it'); });
        root.querySelectorAll('[data-lcs-striptext]').forEach((e) => { const crossed = /line-through/.test(cs(e).textDecorationLine); const neither = !!e.closest('[data-lcs-neither]'); if (isKey ? crossed !== neither : crossed) fails.push('a strip is crossed out on the page of the child, or the key crosses out the wrong one'); });
        if (!isKey && root.querySelectorAll('[data-lcs-keyletter]').length) fails.push('the diagram of the child\'s page holds letters');
        root.querySelectorAll('[data-lcs-strip]').forEach((x) => { if (x.scrollWidth > x.clientWidth + 1) fails.push('a strip is wider than its box: "' + txt(x).slice(0, 30) + '"'); });
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== RULED.instr[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        // ---- the places of the right answers
        const pillsOf = (e) => [...e.querySelectorAll('[data-lcs-pill]')];
        const okIndex = (e) => pillsOf(e).findIndex((p) => p.dataset.lcsOk);
        const checkPlaces = (ps, m, what) => {
          if (ps.length >= 3 && new Set(ps).size === 1) fails.push(`the right ${what} stands in one place every time`);
          if (ps.length >= 4 && Math.max(...Array.from({ length: m }, (_, k) => ps.filter((x) => x === k).length)) > Math.ceil((m === 2 ? 0.6 : 0.5) * ps.length)) fails.push(`the right ${what} stands in one place too often`);
          if (ps.length >= 3 && (ps.every((x, i) => !i || x === ps[i - 1] + 1) || ps.every((x, i) => !i || x === ps[i - 1] - 1))) fails.push(`the right ${what} stands in a staircase`);
          if (m === 2 && ps.length >= 3 && ps.every((x, i) => !i || x !== ps[i - 1])) fails.push(`the right ${what} stands every other time in the other place`);
          if (ps.some((x, i) => i >= 2 && x === ps[i - 1] && x === ps[i - 2])) fails.push(`the right ${what} stands three times in a row in one place`);
          if ([2, 3, 4].some((b) => ps.length >= 2 * b && ps.every((x, i) => i < b || x === ps[i - b]))) fails.push(`the places of the right ${what} repeat a block to the end`);
        };
        const lengthCheck = (rows, what) => { const n = rows.length; let lo = 0, so = 0; rows.forEach((ps) => { const ls = ps.map((p) => straight(p.dataset.lcsWord).length), r = ps.findIndex((p) => p.dataset.lcsOk); if (ls.every((l, i) => i === r || l < ls[r])) lo++; if (ls.every((l, i) => i === r || l > ls[r])) so++; }); if (lo > Math.floor(n / 2) || so > Math.floor(n / 2)) fails.push(`the right ${what} is the longest ${lo} times or the shortest ${so} times of ${n}: length gives it away`); };
        const ruled = (e, k, x, y) => { const want = RULED.lines[k].replace('{x}', x).replace('{y}', y); if (!e || !RULED.lines[k] || txt(e) !== straight(want)) fails.push(`the task line "${e ? txt(e) : ''}" is not the ruled "${want}"`); };
        // the content words of a text (the same small words as the bank check leaves out)
        const STOP = new Set('a an the of in on to and at by for with from is are was be do does did which chapter it its her his he she they their them who what that this up out so as or not but into has have had can will one all very there then when how say says i my me we our you your'.split(' '));
        const words = (t) => (straight(t).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []).filter((w) => w.length >= 3 && !STOP.has(w)).map((w) => w.replace(/'s$/, '').replace(/(ing|ed|es|s|y|e)$/, ''));
        const shares = (a, b) => { const B = words(b); return words(a).filter((x) => B.some((y) => x === y || (x.length >= 4 && y.length >= 4 && (x.startsWith(y) || y.startsWith(x))))); };
        const set = root.dataset.lcsSet;
        const optsOf = (q) => pillsOf(q).map((p) => straight(p.dataset.lcsWord));
        const sameSet = (a, b) => a.slice().sort().join('|') === b.map(straight).slice().sort().join('|');
        const sentChoice = (q, right, wrong, what) => { const o = optsOf(q); if (o.length !== 3 || !sameSet(o, [right, ...wrong]) || pillsOf(q).filter((p) => p.dataset.lcsOk).length !== 1 || o[okIndex(q)] !== straight(right)) fails.push(`${what}: the choices are not its own three, or the key marks another`); };
        const blockOf = (k) => root.querySelector(`[data-lcs-task="${k}"]`);
        // a key written on a frame: its parts after the printed words
        const frameKey = (g) => [...g.querySelectorAll('[data-lcs-line]:not([data-lcs-spareline])')].map((l) => l.querySelector('[data-lcs-keytext]')).filter(Boolean).map(txt).join(' ');

        if (mode === 'stage') {
          const [pid, qid] = set.split('|'), P = INFO.plays[pid], Q = INFO.poems[qid];
          if (!P || !Q) return ['the play or the poem is not of the bank'];
          const pb = blockOf('play');
          if (txt(pb.querySelector('[data-lcs-ttl]')) !== straight(P.title)) fails.push('the title of the play is not the bank\'s');
          const cast = [...pb.querySelectorAll('[data-lcs-castname]')].map(txt);
          if (cast.join('|') !== P.cast.map((c) => straight(c.tag + ', ' + c.about)).join('|')) fails.push('the cast list is not the play\'s');
          const scenes = [...pb.querySelectorAll('[data-lcs-scene]')];
          if (scenes.length !== 2) fails.push('the play is not two scenes');
          scenes.forEach((s, i) => { const S = P.scenes[i]; if (!S) return; if (txt(s.querySelector('[data-lcs-sceneh]')) !== 'Scene ' + (i + 1) || txt(s.querySelector('[data-lcs-dir]')) !== straight('(' + S.set + ')')) fails.push(`scene ${i + 1} has not its heading and its stage direction`); const sp = [...s.querySelectorAll('[data-lcs-speech]')].map(txt); if (sp.join('|') !== S.lines.map((l) => straight(l.who + ': ' + (l.dir ? '(' + l.dir + ') ' : '') + l.say)).join('|')) fails.push(`scene ${i + 1} is not printed as the bank has it`); });
          const sp = scenes.map((s) => [...s.querySelectorAll('[data-lcs-speech]')]);
          sp.forEach((ls, i) => ls.forEach((l, k) => { if (k && Math.abs((R(l).top - R(ls[k - 1]).bottom) - (R(sp[0][1] || l).top - R(sp[0][0]).bottom)) > 1.5) fails.push(`the lines of scene ${i + 1} are spread farther apart than those of scene 1`); }));
          const st = [...blockOf('poem').querySelectorAll('[data-lcs-stanza]')];
          if (st.length !== 3) fails.push('the poem is not three stanzas');
          st.forEach((s, i) => { const ls = [...s.querySelectorAll('[data-lcs-pline]')]; if (ls.map(txt).join('|') !== Q.stanzas[i].map(straight).join('|')) fails.push(`stanza ${i + 1} is not printed as the bank has it`); ls.forEach((l) => { const rg = document.createRange(); rg.selectNodeContents(l); const tr = rg.getBoundingClientRect(); if (tr.right > R(s).right - 10 || tr.left < R(s).left + 10 || R(l).height > fs(l) * 1.6) fails.push(`a line of stanza ${i + 1} wraps or comes nearer than 10 px to the edge of its box`); }); });
          if (st.length === 3 && !(R(st[0]).right <= R(st[1]).left && R(st[1]).right <= R(st[2]).left)) fails.push('the stanzas do not stand side by side in their order');
          { const pt = blockOf('poem').querySelector('[data-lcs-ttl]'); if (st.length && R(st[0]).top - R(pt).bottom > 14) fails.push(`the poem title stands ${Math.round(R(st[0]).top - R(pt).bottom)} px over its first stanza (14 at the most, finding 21)`); }
          const qs = [...root.querySelectorAll('[data-lcs-q]')];
          if (!RULED.counts.stage[lv].split('|').some((c) => qs.map((q) => q.dataset.lcsQ).sort().join() === c.split(',').sort().join())) fails.push(`the questions are ${qs.map((q) => q.dataset.lcsQ).join()}, not those of level ${lv}`);
          const three = [], sent = [];
          qs.forEach((q) => {
            const k = q.dataset.lcsQ, text = straight(q.dataset.lcsQtext);
            if (k === 'pwhere' || k === 'swhere') { const W2 = (k === 'pwhere' ? P : Q).where.find((x) => straight(x.q) === text); const want = k === 'pwhere' ? ['Scene 1', 'Scene 2'] : ['Stanza 1', 'Stanza 2', 'Stanza 3']; if (!W2 || optsOf(q).join('|') !== want.join('|') || okIndex(q) !== W2.a - 1) fails.push(`"${text}": not a question of the text, or the key does not mark ${k === 'pwhere' ? 'Scene' : 'Stanza'} ${W2 ? W2.a : '?'}`); if (k === 'swhere') three.push(okIndex(q)); }
            if (k === 'build' || k === 'adds') { if (txt(q.querySelector('[data-lcs-qt]')).replace(/^\d+\. /, '') !== RULED.lines[k]) fails.push(`"${text}" is not the ruled question`); const B = k === 'build' ? P.build : Q.adds; if (q.dataset.lcsWritten !== undefined) { const g = q.querySelector('[data-lcs-lines], [data-lcs-frame]'); if (!g) fails.push(`"${text}" has no lines`); else if (g.dataset.lcsFrame !== undefined) { const want = k === 'build' ? B.frame.join(' ') + '.' : B.sample[0].toLowerCase() + B.sample.slice(1); if (isKey && frameKey(g) !== straight(want)) fails.push(`the key of "${text}" does not finish the frame with the sample`); } else if (+g.dataset.lcsRoom !== B.sample.length) fails.push(`"${text}" has no lines for its sample`); } else { sentChoice(q, B.right, B.wrong, text); three.push(okIndex(q)); sent.push(pillsOf(q)); } }
          });
          if (lv === 1) checkPlaces(three, 3, 'answer'); if (sent.length >= 2) lengthCheck(sent, 'sentence');
          if (lv === 3) { ruled(blockOf('scene3').querySelector('[data-lcs-label]'), 'scene3'); const g = root.querySelector('[data-lcs-scene3]'), ls = g ? [...g.querySelectorAll('[data-lcs-line]')] : []; if (isKey) { const tags = P.cast.map((c) => c.tag); const keyed = ls.filter((l) => l.dataset.lcsKeynote === undefined).map((l) => l.querySelector('[data-lcs-keytext]')).filter(Boolean).map(txt); if (keyed.length !== 5 || keyed[0] !== straight('Sample answer: (' + P.scene3.set + ')') || keyed.slice(1).some((x) => !tags.some((t) => x.startsWith(t + ': ')))) fails.push('the sample Scene 3 is not where it happens and four lines of the cast'); } }
        }

        if (mode === 'chapters') {
          const S = INFO.chapters[set]; if (!S) return ['the story is not of the bank'];
          const ch = [...root.querySelectorAll('[data-lcs-chapter]')];
          if (ch.length !== 3) fails.push('the story is not three chapters');
          ch.forEach((c, i) => { if (txt(c.querySelector('[data-lcs-chead]')) !== straight(`Chapter ${i + 1}: ${S.chapters[i].title}`) || flat(txt(c.querySelector('[data-lcs-para]'))) !== flat(S.chapters[i].text)) fails.push(`chapter ${i + 1} is not printed as the bank has it`); });
          // the chapter titles as the page prints them: no chapter question can be answered from one of them
          const titles = ch.map((c) => txt(c.querySelector('[data-lcs-chead]')).replace(/^Chapter \d+: /, ''));
          const qs = [...root.querySelectorAll('[data-lcs-q]')];
          if (qs.length !== RULED.counts.chapters[lv]) fails.push(`${qs.length} questions, not ${RULED.counts.chapters[lv]}`);
          const three = [], sent = [];
          qs.forEach((q) => {
            const k = q.dataset.lcsQ, text = straight(q.dataset.lcsQtext);
            if (k === 'where') { const W2 = S.where.find((x) => straight(x.q) === text); if (!W2 || optsOf(q).join('|') !== 'Chapter 1|Chapter 2|Chapter 3' || okIndex(q) !== W2.a - 1) fails.push(`"${text}": not a question of the story, or the key does not mark Chapter ${W2 ? W2.a : '?'}`); three.push(okIndex(q)); titles.forEach((t) => { const sh = shares(text, t); if (sh.length) fails.push(`"${text}" can be answered from the chapter title "${t}" (${sh.join(', ')})`); }); }
            else { if (!['build2', 'build3'].includes(k) || text !== RULED.lines[k]) fails.push(`"${text}" is not a ruled build question`); const B = S[k]; if (!B) return; if (q.dataset.lcsWritten !== undefined) { if (lv === 1) fails.push('a build question is written on level 1'); const g = q.querySelector('[data-lcs-lines], [data-lcs-frame]'); if (!g) fails.push(`"${text}" has no lines`); else if (g.dataset.lcsFrame !== undefined) { if (isKey && frameKey(g) !== straight(B.frame.join(' ') + '.')) fails.push(`the key of "${text}" does not finish the frame with the sample`); } else if (+g.dataset.lcsRoom !== B.sample.length) fails.push(`"${text}" has no lines for its sample`); } else { if (lv !== 1) fails.push(`a build question is circled on level ${lv}`); sentChoice(q, B.right, B.wrong, text); three.push(okIndex(q)); sent.push(pillsOf(q)); } }
          });
          checkPlaces(three, 3, 'answer'); if (sent.length >= 2) lengthCheck(sent, 'sentence');
          if (lv === 3) { const cells = [...root.querySelectorAll('[data-lcs-cell]')]; if (cells.length !== 3 || cells.some((c, i) => txt(c.querySelector('[data-lcs-colhead]')) !== 'Chapter ' + (i + 1) || +c.querySelector('[data-lcs-lines]').dataset.lcsRoom !== S.happens[i].length || c.querySelector('[data-lcs-lines]').dataset.lcsSpare !== '1')) fails.push('the chart is not three chapters with lines for what happens and a line to spare'); if (isKey && cells.some((c, i) => keyLines(c).filter((x, k) => !c.querySelectorAll('[data-lcs-keytext]')[k].closest('[data-lcs-keynote]')).join(' ') !== 'Sample: ' + straight(S.happens[i]))) fails.push('the key of the chart is not what happens in each chapter'); }
        }

        if (mode === 'teller' || mode === 'views') {
          const S = INFO.pov[set.split('|')[0]]; if (!S) return ['the story is not of the bank'];
          const ps = [...root.querySelectorAll('[data-lcs-task="story"] [data-lcs-para]')];
          if (ps.length !== 3 || ps.some((p, i) => flat(txt(p)) !== flat((i + 1) + S.paras[i]))) fails.push('the story is not printed as the bank has it, with its paragraphs numbered');
          // the child's own view answers a question the page prints, and the key's sample answers that question
          const oq = [...root.querySelectorAll('[data-lcs-ownq]')];
          if (oq.length !== 1 || txt(oq[0]) !== straight(S.own.q)) fails.push('the question of the child\'s own view is not printed, or not the story\'s');
          const og = oq[0] && oq[0].parentElement.querySelector('[data-lcs-frame], [data-lcs-lines]');
          if (!og || og.dataset.lcsNote !== 'own') fails.push('the child\'s own view has no lines under its question');
          else if (isKey && (og.dataset.lcsFrame !== undefined ? frameKey(og) !== straight(S.own.think + ' ' + S.own.why + '.') : keyLines(og)[0] && !keyLines(og).join(' ').startsWith(straight((og.dataset.lcsPrefix || 'Sample answer: ') + 'I think ' + S.own.think)))) fails.push('the key of the child\'s own view is not the sample that answers the printed question');
          if (mode === 'teller') {
            const right = S.person === 'first' ? S.descs[0] : RULED.OUTSIDE;
            const tq = root.querySelector('[data-lcs-q="tell"]');
            const qn = blockOf('tell').querySelector('[data-lcs-quotenote]'); if (!qn || txt(qn) !== RULED.lines.quoteNote) fails.push('"Words in quotation marks are what a character says." is not under "Who is telling the story?"');
            if (lv < 3) { ruled(blockOf('tell').querySelector('[data-lcs-label]'), 'tell'); const o = optsOf(tq); if (!sameSet(o, [...S.descs, RULED.OUTSIDE]) || o[okIndex(tq)] !== straight(right)) fails.push('"Who is telling?" has not its three choices, or the key marks another');
              const hq = root.querySelector('[data-lcs-q="how"]');
              if (lv === 2) { ruled(blockOf('tell').querySelectorAll('[data-lcs-label]')[1], 'howCircle'); const ho = hq ? optsOf(hq) : []; if (!sameSet(ho, RULED.HOW) || ho[okIndex(hq)] !== RULED.HOW[S.person === 'first' ? 0 : 1]) fails.push('"How do you know?" has not its two choices, or the key marks the other'); else lengthCheck([pillsOf(tq), pillsOf(hq)], 'answer'); }
              else if (hq) fails.push('"How do you know?" is circled on level 1'); }
            else { const ls = [...blockOf('tell').querySelectorAll('[data-lcs-label]')]; ruled(ls[0], 'tellWrite'); ruled(ls[1], 'howKnow'); if (isKey && (keyLines(tq)[0] || '') !== straight(S.person === 'first' ? S.chars[0] : RULED.OUTSIDE)) fails.push('the key does not name who tells the story'); const hg = root.querySelector('[data-lcs-q="how"] [data-lcs-lines]'); if (!hg || +hg.dataset.lcsRoom !== S.howSample.length) fails.push('"How do you know?" has no lines for its sample'); else if (isKey && keyLines(hg).filter((x) => !/^\(/.test(x)).join(' ') !== 'Sample answer: ' + straight(S.howSample)) fails.push('the key of "How do you know?" is not the story\'s sample'); }
            ruled(blockOf('thinks').querySelector('[data-lcs-label]'), 'thinks');
            const th = [...root.querySelectorAll('[data-lcs-q="thinks"]')];
            if (th.length !== RULED.counts.thinks[lv]) fails.push(`${th.length} "Who thinks this?" sentences, not ${RULED.counts.thinks[lv]}`);
            const pl = [];
            th.forEach((q) => { const t = S.thinks.find((x) => straight(x.s) === straight(q.dataset.lcsQtext)); if (!t || optsOf(q).join('|') !== S.chars.map(straight).join('|') || okIndex(q) !== t.who) fails.push(`"${q.dataset.lcsQtext}": not a sentence of the story, or the key marks the other character`); pl.push(okIndex(q)); });
            checkPlaces(pl, 2, 'name'); if (new Set(pl).size < 2) fails.push('every sentence is thought by one character');
            ruled(blockOf('own').querySelector('[data-lcs-label]'), 'own');
          } else {
            const who = +root.dataset.lcsWho, rw = +root.dataset.lcsRw, nameQ = who === 0 && S.person === 'first' ? 'the narrator, ' + S.chars[0] + ',' : S.chars[who];
            if (rw !== (S.person === 'first' ? 1 : 1 - who)) fails.push('the retold paragraph is told by the wrong character');
            if (lv === 1) {
              ruled(blockOf('view').querySelector('[data-lcs-label]'), 'viewQ', nameQ); ruled(blockOf('proof').querySelector('[data-lcs-label]'), 'proofQ', nameQ);
              const vq = root.querySelector('[data-lcs-q="view"]'), pq = root.querySelector('[data-lcs-q="proof"]');
              sentChoice(vq, S.views[who].right, S.views[who].wrong, 'what the character thinks'); sentChoice(pq, S.proofs[who].right, S.proofs[who].wrong, 'the proof sentence');
              if (okIndex(vq) === okIndex(pq)) fails.push('both right answers stand in one place');
              lengthCheck([pillsOf(vq), pillsOf(pq)], 'answer');
              ruled(blockOf('own').querySelector('[data-lcs-label]'), 'own');
            } else {
              const heads = [...root.querySelectorAll('[data-lcs-colhead]')].map(txt);
              const oName = who === 1 && S.person === 'first' ? 'the narrator, ' + S.chars[0] + ',' : S.chars[1 - who];
              const wantHeads = [RULED.lines.viewHead.replace('{x}', nameQ), ...(lv === 2 ? [RULED.lines.viewHead.replace('{x}', oName)] : []), RULED.lines.myHead].map(straight);
              if (heads.join('|') !== wantHeads.join('|')) fails.push(`the chart heads are "${heads.join('", "')}", not "${wantHeads.join('", "')}"`);
              const mine = root.querySelector('[data-lcs-cell="mine"]'); if (!mine || !mine.querySelector('[data-lcs-ownq]')) fails.push('"What I think" does not print the question it answers');
              const cells = [...root.querySelectorAll('[data-lcs-cell]')].filter((c) => c.dataset.lcsCell !== 'mine');
              cells.forEach((c, i) => { const g = c.querySelector('[data-lcs-lines]'), want = [S.views[who].right, S.views[1 - who].right][i]; if (!g || +g.dataset.lcsRoom !== want.length || g.dataset.lcsSpare !== '1') fails.push('a chart cell has no lines for its view with a line to spare'); else if (isKey && keyLines(g).filter((x) => !/^\(/.test(x)).join(' ') !== 'Sample: ' + straight(want)) fails.push('the key of the chart is not the views of the story'); });
              ruled(blockOf('proof').querySelector('[data-lcs-label]'), 'proofCopy', nameQ);
              const pg = blockOf('proof').querySelector('[data-lcs-lines]'), proof = straight(S.proofs[who].right).replace(/^"([^"]*)"$/, '$1');
              if (!pg || +pg.dataset.lcsRoom !== proof.length) fails.push('the lines for the proof do not hold its sentence');
              if (lv === 3) { const rb2 = blockOf('rewrite'), r = S.rewrite[rw]; if (!rb2 || !r || +rb2.dataset.lcsParaNo !== r.para || straight(rb2.dataset.lcsAs) !== straight(S.chars[rw])) fails.push('the paragraph to retell is not the bank\'s'); else ruled(rb2.querySelector('[data-lcs-label]'), 'rewrite', String(r.para), S.chars[rw]); }
            }
          }
        }

        if (mode === 'literal') {
          const items = [...root.querySelectorAll('[data-lcs-item]')];
          if (items.length !== RULED.counts.literal[lv]) fails.push(`${items.length} sentences, not ${RULED.counts.literal[lv]}`);
          ruled(blockOf('items').querySelector('[data-lcs-label]'), lv === 1 ? 'lit1' : 'lit2');
          const uses = [], pl = [], rows = [], seen = new Set();
          items.forEach((e) => {
            const P = INFO.phrases[e.dataset.lcsItem], use = e.dataset.lcsUse; if (!P) { fails.push('a sentence of no saying of the bank'); return; }
            if (seen.has(P.id)) fails.push(`"${P.p}" stands twice on the page`); seen.add(P.id);
            const text = use === 'L' ? P.lit : P.non; if (!text) { fails.push(`"${P.p}" has no ${use === 'L' ? 'literal' : 'nonliteral'} sentence`); return; }
            if (flat(txt(e.querySelector('[data-lcs-sent]')).replace(/^\d+\./, '')) !== flat(text)) fails.push(`"${text}" is not printed as the bank has it`);
            const b = [...e.querySelectorAll('[data-lcs-phrase]')]; if (b.length !== 1 || txt(b[0]).toLowerCase() !== straight(P.p).toLowerCase() || parseFloat(cs(b[0]).fontWeight) < 800) fails.push(`"${P.p}" is not bold once in its sentence`);
            const right = use === 'L' ? P.litMean : P.nonMean; uses.push(use === 'L' ? 0 : 1);
            if (lv === 1) {
              const ln = [...e.querySelectorAll('[data-lcs-lnpill]')]; if (ln.map((p) => p.dataset.lcsWord).join('|') !== 'literal|nonliteral' || ln.findIndex((p) => p.dataset.lcsOk) !== (use === 'L' ? 0 : 1)) fails.push(`"${P.p}": literal or nonliteral is keyed wrong`);
              const ps = [...e.querySelectorAll('[data-lcs-opts] [data-lcs-pill]')], o = ps.map((p) => straight(p.dataset.lcsWord));
              if (!sameSet(o, [P.litMean, P.nonMean, P.off]) || ps.filter((p) => p.dataset.lcsOk).length !== 1 || o[ps.findIndex((p) => p.dataset.lcsOk)] !== straight(right)) fails.push(`"${P.p}": the meanings are not its own three, or the key marks another`);
              pl.push(ps.findIndex((p) => p.dataset.lcsOk)); rows.push(ps);
            } else { const box = e.querySelector('[data-lcs-markbox]'); if (!box || box.dataset.lcsWant !== use) fails.push(`"${P.p}": the box does not want ${use}`); const g = e.querySelector('[data-lcs-lines]'); if (!g || +g.dataset.lcsRoom !== right.length) fails.push(`"${P.p}": no line for its meaning`); }
          });
          if (uses.filter((u) => !u).length < 2 || uses.filter((u) => u).length < 2) fails.push('fewer than two literal or two nonliteral sentences');
          checkPlaces(uses, 2, 'kind (literal or nonliteral)');
          if (pl.length) { checkPlaces(pl, 3, 'meaning'); lengthCheck(rows, 'meaning'); }
          if (lv === 3) { const ob = blockOf('own'); ruled(ob.querySelector('[data-lcs-label]'), 'litOwn'); const box = [...ob.querySelectorAll('[data-lcs-saying]')]; if (box.length !== 4) fails.push('the box has not four sayings'); box.forEach((x) => { const P = INFO.phrases[x.dataset.lcsSaying]; if (!P || txt(x) !== straight(P.p + ': ' + P.nonMean)) fails.push('a saying of the box is not printed with its meaning'); if (P && seen.has(P.id)) fails.push(`the saying "${P.p}" of the box is a sentence of the page`); }); if (ob.querySelectorAll('[data-lcs-ownline]').length !== 2) fails.push('the page has not two own sentences to write'); }
        }

        if (mode === 'storysort' || mode === 'storychart' || mode === 'textsort' || mode === 'textchart') {
          const story = mode.startsWith('story'), S = story ? INFO.series[set] : INFO.topics[set];
          if (!S) return ['the texts are not of the bank'];
          const tx = [...root.querySelectorAll('[data-lcs-text]')], texts = story ? S.stories : S.texts;
          if (tx.length !== 2 || tx.some((e, i) => txt(e.querySelector('[data-lcs-texthead]')) !== (story ? 'Story ' : 'Text ') + (i + 1) || txt(e.querySelector('[data-lcs-ttl]')) !== straight(texts[i].title) || flat([...e.querySelectorAll('[data-lcs-para]')].map(txt).join('')) !== flat(texts[i].paras.join('')))) fails.push('the two texts are not printed as the bank has them');
          if (tx.length === 2 && !(R(tx[0]).right <= R(tx[1]).left + 0.5 && Math.abs(R(tx[0]).top - R(tx[1]).top) < 1)) fails.push('the two texts do not stand side by side');
          if (tx.length === 2) { const p0 = tx.map((e) => e.querySelector('[data-lcs-para]')); if (p0.every(Boolean) && Math.abs(R(p0[0]).top - R(p0[1]).top) > 1) fails.push(`the first lines of the two texts stand ${Math.round(Math.abs(R(p0[0]).top - R(p0[1]).top))} px apart (they begin at one height)`); }
          if (story && txt(root.querySelector('[data-lcs-byline]')) !== straight('Two stories by ' + S.author)) fails.push('the author is not named over the two stories');
          if (mode === 'storysort') {
            ruled(blockOf('facts').querySelector('[data-lcs-label]'), 'sort');
            const qs = [...root.querySelectorAll('[data-lcs-q="fact"]')];
            if (qs.length !== RULED.counts.storysort[lv]) fails.push(`${qs.length} sentences, not ${RULED.counts.storysort[lv]}`);
            const pl = [];
            qs.forEach((q) => { const F = S.facts.find((x) => straight(x.s) === straight(q.dataset.lcsQtext)); if (!F || optsOf(q).join('|') !== 'Story 1|Story 2|Both' || okIndex(q) !== [1, 2, 'both'].indexOf(F.a)) fails.push(`"${q.dataset.lcsQtext}": not a sentence of the pair, or the key marks another story`); pl.push(okIndex(q)); });
            checkPlaces(pl, 3, 'answer'); if (new Set(pl).size < 3) fails.push('Story 1, Story 2, and Both are not all answers on the page');
            if (lv >= 2) { const cb = blockOf('compare'), ls = cb ? [...cb.querySelectorAll('[data-lcs-label]')] : []; ruled(ls[0], 'alike'); const ga = cb && cb.querySelector('[data-lcs-frame="alike"]'); if (isKey && ga && frameKey(ga) !== straight(S.alike + '.')) fails.push('the key does not finish "In both stories, ___." with the sample'); if (lv === 3) { ruled(ls[1], 'differ'); const gd = cb && cb.querySelector('[data-lcs-frame="differ"]'); if (isKey && gd && frameKey(gd) !== straight(S.differ[0] + ', ' + S.differ[1] + '.')) fails.push('the key does not finish "In Story 1, ___, but in Story 2, ___." with the sample'); } }
          }
          if (mode === 'storychart') {
            const ex = +root.dataset.lcsExstory;
            ruled(blockOf('chart').querySelector('[data-lcs-label]'), lv === 1 ? 'strips' : lv === 2 ? 'chart' : 'chartAll');
            const rn = [...root.querySelectorAll('[data-lcs-rowname]')].map(txt).join('|');
            if (rn !== 'Setting|Problem|How it is solved|Lesson') fails.push('the rows of the chart are not setting, problem, how it is solved, lesson');
            const cells = [...root.querySelectorAll('[data-lcs-cell]')];
            if (cells.length !== 8) fails.push('the chart has not eight cells');
            const exs = cells.filter((c) => c.dataset.lcsIsexample !== undefined);
            if (exs.map((c) => c.dataset.lcsCell).sort().join() !== (lv === 3 ? '' : [(ex + 1) + '|problem', (ex + 1) + '|setting'].join())) fails.push(lv === 3 ? 'gray examples on the level without examples' : 'the gray examples are not the setting and the problem of one story');
            exs.forEach((c) => { const [st, r] = c.dataset.lcsCell.split('|'); if (txt(c) !== straight(S.chart[r][+st - 1])) fails.push('a gray example is not the bank\'s'); });
            const strips = [...root.querySelectorAll('[data-lcs-strip]')];
            if (lv === 1) {
              if (strips.length !== 8 || strips.map((x) => x.dataset.lcsStrip).join('') !== 'ABCDEFGH') fails.push('not eight strips lettered A to H');
              const neither = strips.filter((x) => x.dataset.lcsNeither !== undefined);
              if (neither.length !== 2 || neither.some((x) => !S.neither.some((n) => straight(n.s) === txt(x.querySelector('[data-lcs-striptext]'))))) fails.push('not two strips that are in neither story');
              const seq = [];
              cells.filter((c) => c.dataset.lcsIsexample === undefined).forEach((c) => { const [st, r] = c.dataset.lcsCell.split('|'), box = c.querySelector('[data-lcs-markbox]'), s2 = box && strips.find((x) => x.dataset.lcsStrip === box.dataset.lcsWant); if (!s2 || txt(s2.querySelector('[data-lcs-striptext]')) !== straight(S.chart[r][+st - 1])) fails.push(`the box of ${r} in story ${st} does not want its strip`); else seq.push(box.dataset.lcsWant.charCodeAt(0)); });
              if (seq.some((c, k) => k >= 2 && ((c === seq[k - 1] + 1 && c === seq[k - 2] + 2) || (c === seq[k - 1] - 1 && c === seq[k - 2] - 2)))) fails.push('the letters of the chart follow the order of the strips');
            } else {
              if (strips.length) fails.push('strips on a level where the child writes');
              // every cell holds its note with a line to spare (three lines where the note needs two), at 15.5 px a letter
              cells.filter((c) => c.dataset.lcsIsexample === undefined).forEach((c) => { const [st, r] = c.dataset.lcsCell.split('|'), g = c.querySelector('[data-lcs-lines]'); if (!g || +g.dataset.lcsRoom !== S.chart[r][+st - 1].length || g.dataset.lcsSpare !== '1') fails.push(`the cell of ${r} in story ${st} has no lines for its note with a line to spare`); else if (isKey && keyLines(g).filter((x) => !/^\(/.test(x)).join(' ') !== 'Sample: ' + straight(S.chart[r][+st - 1])) fails.push(`the key of ${r} in story ${st} is not the story's`); });
            }
          }
          if (mode === 'textsort') {
            ruled(blockOf('venn').querySelector('[data-lcs-label]'), lv >= 2 ? 'vennNeither' : 'venn');
            const strips = [...root.querySelectorAll('[data-lcs-strip]')];
            if (strips.length !== RULED.counts.textsort[lv] || strips.map((x) => x.dataset.lcsStrip).join('') !== 'ABCDEFGHIJ'.slice(0, strips.length)) fails.push(`not ${RULED.counts.textsort[lv]} strips lettered in order`);
            const regs = strips.map((x) => +x.dataset.lcsRegion);
            strips.forEach((x) => { const t2 = txt(x.querySelector('[data-lcs-striptext]')), F = S.facts.find((f) => straight(f.s) === t2); const want = F ? [1, 'both', 2].indexOf(F.a) : S.neither.some((n) => straight(n) === t2) ? -1 : null; if (want === null || want !== +x.dataset.lcsRegion) fails.push(`the strip "${t2}" is not a fact of the texts, or its part is wrong`); });
            if ([0, 1, 2].some((k) => regs.filter((r) => r === k).length < 2)) fails.push('a part of the diagram has fewer than two facts');
            if (regs.filter((r) => r < 0).length !== (lv >= 2 ? 2 : 0)) fails.push('not the number of facts in neither text of the level');
            if (regs.some((x, i) => i >= 2 && x === regs[i - 1] && x === regs[i - 2])) fails.push('three strips in a row belong to one part');
            const venn = root.querySelector('[data-lcs-venn]'), cs2 = [...venn.querySelectorAll('[data-lcs-circle]')].map((c) => { const q = R(c); return { x: q.left + q.width / 2, y: q.top + q.height / 2, rx: q.width / 2, ry: q.height / 2 }; });
            const inside = (p, c) => ((p.x - c.x) / (c.rx - 4)) ** 2 + ((p.y - c.y) / (c.ry - 4)) ** 2 < 1;
            { const col = R(venn), box = R(venn.querySelector('[data-lcs-vennbox]')); if (box.top - col.top > 40.5 || col.bottom - box.bottom > 40.5) fails.push(`the diagram leaves ${Math.round(Math.max(box.top - col.top, col.bottom - box.bottom))} px of its column empty (most 40)`); if (cs2.some((c) => c.ry < c.rx - 1 || c.ry > c.rx * 1.5 + 1)) fails.push('a circle of the diagram is flatter than round or taller than one and a half times its width'); }
            [...venn.querySelectorAll('[data-lcs-regionlabel]')].forEach((e, k) => { if (txt(e) !== ['Only Text 1', 'Both texts', 'Only Text 2'][k]) fails.push('a part of the diagram is not named'); });
            if (isKey) { const kl = [...venn.querySelectorAll('[data-lcs-keyletter]')]; if (kl.length !== regs.filter((r) => r >= 0).length) fails.push('the key does not write every letter in the diagram'); kl.forEach((e) => { const q = R(e), p = { x: q.left + q.width / 2, y: q.top + q.height / 2 }, s2 = strips.find((x) => x.dataset.lcsStrip === txt(e)), want = s2 ? +s2.dataset.lcsRegion : -9; const got = inside(p, cs2[0]) && inside(p, cs2[1]) ? 1 : inside(p, cs2[0]) ? 0 : inside(p, cs2[1]) ? 2 : -1; if (got !== want) fails.push(`the key writes ${txt(e)} in the wrong part of the diagram`); }); }
            if (lv === 3) ruled(blockOf('compare').querySelector('[data-lcs-label]'), 'textDiffer');
          }
          if (mode === 'textchart') {
            if (lv === 1) {
              ruled(blockOf('questions').querySelector('[data-lcs-label]'), 'circle');
              const qs = [...root.querySelectorAll('[data-lcs-q]')];
              if (qs.map((q) => q.dataset.lcsQ).join() !== 'main1,main2,both') fails.push('the questions are not the two most important points and a shared detail');
              const pl = [], rows = [];
              qs.forEach((q) => { const k = q.dataset.lcsQ; if (straight(q.dataset.lcsQtext) !== RULED.lines[k === 'both' ? 'bothQ' : k]) fails.push(`"${q.dataset.lcsQtext}" is not a ruled question`); const o = optsOf(q), right = o[okIndex(q)];
                if (k === 'main1' || k === 'main2') {
                  // its OWN point beside two details of the SAME text (never the other text's point), and the point
                  // repeats no content word of the title printed over its text
                  const i = k === 'main1' ? 0 : 1, wrong = o.filter((x) => x !== straight(S.main[i]));
                  if (o.length !== 3 || right !== straight(S.main[i]) || pillsOf(q).filter((p) => p.dataset.lcsOk).length !== 1 || wrong.length !== 2 || wrong.some((x) => !S.dets[i].map(straight).includes(x))) fails.push(`"${q.dataset.lcsQtext}": not the text's point beside two details of the same text, or the key marks another`);
                  if (o.includes(straight(S.main[1 - i]))) fails.push(`"${q.dataset.lcsQtext}" offers the other text's point`);
                  const nouns = (S.subject || [])[i] || [], st2 = (w) => w.replace(/'s$/, '').replace(/(ing|ed|es|s|y|e)$/, ''), names = (x) => (straight(x).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []).slice(0, 4).some((w) => nouns.some((n) => st2(w).startsWith(st2(n))));
                  if (!nouns.length || o.filter(names).length < 2) fails.push(`"${q.dataset.lcsQtext}": the right point is the only choice that names ${nouns.join(' or ') || 'its topic'}`);
                  const tt = tx[i] && tx[i].querySelector('[data-lcs-ttl]'), sh = tt ? shares(S.main[i], txt(tt)) : []; if (sh.length) fails.push(`the point of Text ${i + 1} repeats "${sh.join(', ')}" of its title: it can be picked without reading`);
                }
                else { const fa = o.map((x) => (S.facts.find((f) => straight(f.s) === x) || {}).a); if (fa.filter((a) => a === 'both').length !== 1 || fa.filter((a) => a === 1).length !== 1 || fa.filter((a) => a === 2).length !== 1 || (S.facts.find((f) => straight(f.s) === right) || {}).a !== 'both') fails.push('the shared detail is not one "both" fact beside one fact of each text'); }
                pl.push(okIndex(q)); rows.push(pillsOf(q)); });
              checkPlaces(pl, 3, 'answer'); if (new Set(pl).size < 2) fails.push('the right answers stand in one place'); lengthCheck(rows, 'answer');
            } else {
              ruled(blockOf('chart').querySelector('[data-lcs-label]'), 'tcChart');
              const rows = (root.dataset.lcsRows || '').split(','), bottom = root.dataset.lcsBottom, NAME = { main: RULED.lines.rowMain, detail: RULED.lines.rowDetail, only: RULED.lines.rowOnly };
              if (lv === 2 ? !(rows.length === 2 && rows[0] === 'main' && ['detail', 'only'].includes(rows[1])) : !(rows.length === 1 && ['main', 'detail'].includes(rows[0]))) fails.push(`the chart rows ${rows.join(', ')} are not those of level ${lv}`);
              const rn = [...root.querySelectorAll('[data-lcs-rowname]')].map(txt);
              if (rn.join('|') !== [...rows, ...rows].map((r) => NAME[r]).join('|')) fails.push('the parts of the chart are not the ruled ones');
              const cells = [...root.querySelectorAll('[data-lcs-cell]')];
              if (cells.length !== 2 * rows.length) fails.push('the chart has not its parts for each text');
              cells.forEach((c) => { const [k, part] = c.dataset.lcsCell.split('|'), g = c.querySelector('[data-lcs-lines]'), smp = part === 'main' ? S.main[+k - 1] : part === 'only' ? S.only[+k - 1] : S.details[+k - 1][0]; if (!g || +g.dataset.lcsRoom !== smp.length || g.dataset.lcsSpare !== '1') fails.push('a cell of the chart has no lines for its sample with a line to spare'); });
              const bb = blockOf('bottom'), bl = [...bb.querySelectorAll('[data-lcs-label]')], want = lv === 2 ? ['bothNote'] : ['textAlike', 'textDiffer'];
              if (bl.length !== want.length) fails.push(`the last task asks ${bl.length} things, not ${want.length} (level 3: how the texts are alike and how they are different)`); else want.forEach((k, i) => ruled(bl[i], k));
              if ((lv === 2) !== (bottom === 'both')) fails.push('the last task is not the one of the level');
            }
          }
        }
        return [...new Set(fails)];
      }, INFO);
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small, each card one
 *  task of the page with its answer in its markup and the text it is answered from printed on it at the page's size; the
 *  text's id is data-lcs-text (form B takes another text).
 *   stage (G3-572)     one "In which stanza ...?" question of the page under its poem (title and the three stanzas side by
 *                      side, as the page prints them, closer together), Stanza 1, 2 and 3 to circle (data-lcs-correct); a
 *                      poem whose stanzas side by side are wider than the card gives no card (a box cut off at its edge is
 *                      refused by the check: the stage page had no part). The play of the page
 *                      with its two scenes and the two "build" answers (sentence frames in the child's own words) stay out.
 *   literal (G3-576)   one sentence of the page with its bold phrase (literal or nonliteral), the box for L or N and the
 *                      line "It means:" (both data-lcs-answer; the key's meaning is a sample, as on the page); the card says
 *                      L or N in data-lcs-use, so a part takes one of each (lists: kindAttr use, mixKinds).
 *   teller (G3-574)    one "Who thinks this?" sentence of the page under the whole story (title and three numbered
 *                      paragraphs, as the page prints it) and the two characters' names to circle, in an order drawn for
 *                      each card. Only the stories told by an "I" narrator (the lesson's point: both forms of one kind). "Who is telling the
 *                      story?" with its rule and three answers makes the card taller than a check takes (334 to 376 px)
 *                      and stays out, and so does the child's own view (any idea with a reason is right).
 *   storysort (G3-577) the two stories side by side (title, two paragraphs each) and three sentences of the page in one
 *                      row, to circle the one that is true of both stories (the part's instruction asks it): a story-level
 *                      likeness (the characters, the setting, what one does for the other), a sentence of only Story 1 and
 *                      one of only Story 2, in a drawn place (review en.review-1119-read: RL.3.9 compares; a card that
 *                      asked where ONE detail is stood below it, and its right answer stood first).
 *   textsort (G3-579)  one fact of the page and the two texts side by side, Only Text 1, Both texts or Only Text 2 to circle
 *                      (the page's diagram has these three parts; a fact in neither text stays out: the card has no box to
 *                      cross it out in). The card says whether the fact is in both texts or in one (data-lcs-where), so a
 *                      part takes one of each (lists: kindAttr where, mixKinds; review en.review-1119-read: the first
 *                      option was right in every form). Only the pairs whose texts fit a card (twelve lines a column at the
 *                      most).
 *   textchart (G3-580) "What is the most important point of Text 1 (2)?" under that text alone, with its point and two
 *                      details of the same text to circle (the page's level-1 question; the level-2 chart writes the point
 *                      in the child's own words); over the cards the point is the longest of its three, the middle or the
 *                      shortest about equally often. The detail both texts give needs both texts and stays out.
 *  A card is at most 330 px high: a task whose text does not fit (the teller of a point-of-view story, a story in
 *  chapters, the play of the stage page) gives no card. */
const CT_CHECK_MODES = new Set(['stage', 'teller', 'literal', 'storysort', 'textsort', 'textchart']);
function ctCheckPage(mode, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`comparing-texts-g3 check: the texts are English texts (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, d = LEVELS[mode][lv] || LEVELS[mode][2], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const inner = W - 52;
  const ok = (html) => html.replace(' data-lcs-ok="1"', ' data-lcs-ok="1" data-lcs-correct="1"');
  const ask = (text) => `<div data-lcs-checkq data-lcs-read style="font:700 16px/1.28 'Nunito',sans-serif;color:${T.ink}">${esc(text)}</div>`;
  const holder = (id, inner2) => `<div data-lcs-text="${esc(id)}" style="display:flex;flex-direction:column;gap:5px;padding:0 4px">${inner2}</div>`;
  const pillRow = (opts, right, column) => ok(`<div data-lcs-opts style="display:flex;${column ? 'flex-direction:column;align-items:flex-start;gap:2px' : 'flex-wrap:wrap;gap:4px 8px'};padding-left:16px">${opts.map((o) => pill(o, o === right, key, 15.5)).join('')}</div>`);
  // two texts side by side (the story pairs and the text pairs), each under its head and title, at the page's size
  const twoCols = (heads, texts, font) => `<div data-lcs-twocols style="display:grid;grid-template-columns:1fr 1fr;column-gap:8px">` +
    texts.map((x, i) => `<div data-lcs-col="${i + 1}" style="display:flex;flex-direction:column;gap:2px;min-width:0"><div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:center;column-gap:8px"><div data-lcs-colhead data-lcs-read style="font:800 14.5px/1.1 'Nunito',sans-serif;color:${T.teal}">${esc(heads[i])}</div>${title(x.title, 17)}</div>` +
      white(x.paras.map((pp) => para(pp, font, 1.27).replace('text-indent:18px;', 'text-indent:12px;')).join(''), 'data-lcs-paras', 'gap:3px;padding:3px 7px;flex:1 1 auto;border:2px solid ' + T.creamDeep) + `</div>`).join('') + `</div>`;
  // the sentence to sort and its three answers in one row, as the page prints its rows
  const sortRow = (text, opts, right) => `<div data-lcs-sortrow style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:3px 10px"><div data-lcs-checkq data-lcs-read style="flex:1 1 260px;font:700 16px/1.28 'Nunito',sans-serif;color:${T.ink}">${esc(text)}</div>` +
    ok(`<div data-lcs-opts style="flex:0 0 auto;display:flex;gap:6px">${opts.map((o) => pill(o, o === right, key, 15.5)).join('')}</div>`) + `</div>`;
  const cards = [];
  if (mode === 'stage') for (const poem of shuffle(BANK.poems, rng)) {
    const stanzas = `<div data-lcs-poemcard style="display:flex;flex-direction:column;gap:3px;padding:5px 0;border-radius:14px;background:${T.cream}">${title(poem.title, 18)}<div data-lcs-stanzas style="display:flex;justify-content:space-evenly;gap:2px">` +
      poem.stanzas.map((st, i) => white(st.map((l) => `<div data-lcs-pline data-lcs-read style="font:600 ${d.font}px/1.3 'Nunito',sans-serif;white-space:nowrap;color:${T.ink}">${esc(l)}</div>`).join(''), `data-lcs-stanza="${i + 1}"`, 'flex:0 0 auto;gap:0;padding:4px 6px')).join('') + `</div></div>`;
    // the widest line of each stanza (the page's own letter widths) and 13 px of its box, three side by side with their
    // gaps in the card, 639 px inside (W - 36), 4 px to spare: measured 2026-11-19, a stanza box is its widest line and 31
    // to 39 px; Moving (650) is cut off by 3 px, Puddle and Night Sounds (634) keep 7 and 9 px
    const wide = poem.stanzas.reduce((n, st) => n + Math.max(...st.map((l) => [...l].reduce((w, ch) => w + (NW[ch.replace(/[‘’]/, "'")] || 56), 0) * d.font / 100)) + 13, 0) + 2 * 2;
    if (wide > W - 36 - 4) continue;
    // (in a drawn order: the check keeps the first card it meets of each text)
    for (const q of shuffle(poem.where, rng)) cards.push(holder(poem.id, stanzas + ask(q.q) + pillRow(['Stanza 1', 'Stanza 2', 'Stanza 3'], 'Stanza ' + q.a, false)));
  }
  if (mode === 'teller') for (const s of shuffle(BANK.pov.filter((x) => x.person === 'first'), rng)) {
    const story = `<div data-lcs-povstory style="display:flex;flex-direction:column;gap:2px;padding:4px 8px 6px;border-radius:14px;background:${T.cream}">${title(s.title, 18)}` +
      white(s.paras.map((pp, i) => para(pp, d.font, d.lh || 1.36, i + 1)).join(''), 'data-lcs-paras', 'gap:3px;padding:4px 10px') + `</div>`;
    // (in a drawn order: the check keeps the first card it meets of each text)
    for (const th of shuffle(s.thinks, rng)) cards.push(holder(s.id, story + ask(LINES.thinks) + sortRow(th.s, rng.int(0, 1) ? s.chars.slice().reverse() : s.chars, s.chars[th.who])));
  }
  if (mode === 'literal') for (const p of shuffle(BANK.phrases, rng)) {
    for (const use of shuffle(p.lit ? ['L', 'N'] : ['N'], rng)) {
      const text = use === 'N' ? p.non : p.lit, mean = use === 'N' ? p.nonMean : p.litMean;
      const at = text.toLowerCase().indexOf(p.p.toLowerCase());
      const sent = esc(text.slice(0, at)) + `<b data-lcs-phrase style="font-weight:900">${esc(text.slice(at, at + p.p.length))}</b>` + esc(text.slice(at + p.p.length));
      const box = boxMark(use, key).replace('<span data-lcs-markbox', `<span data-lcs-answer="${use}" data-lcs-markbox`);
      const w = inner - MARKBOX - 10 - 80 - 12;
      const line = key ? rule({ w, answer: mean, sample: true }) : rule({ w }).replace('<div data-lcs-line', `<div data-lcs-line data-lcs-answer="${esc(mean)}"`);
      cards.push(holder(p.id, ask(LINES.lit2) + `<div data-lcs-sent data-lcs-use="${use}" data-lcs-read style="padding:4px 10px;border-radius:10px;background:#FFFFFF;font:600 ${d.font}px/1.3 'Nunito',sans-serif;color:${T.ink}">${sent}</div>` +
        `<div style="display:flex;align-items:flex-end;gap:10px;padding-left:10px">${box}<span data-lcs-read style="flex:0 0 auto;padding-bottom:5px;font:700 16px/1 'Nunito',sans-serif;color:${T.ink}">${esc(LINES.means)}</span><div style="flex:1 1 auto;min-width:0">${line}</div></div>`));
    }
  }
  // a wrong pair for a sentence true of both stories: one sentence of only the first story, one of only the second, the
  // three in ONE row (a second row made the card taller than a check takes: 341 to 361 px; a pill is 1.06 times its letters
  // at the page's widths and 26 px wide more, measured 2026-11-19, the row 623 px with its gaps), so that over the cards
  // the right one is the longest, the middle or the shortest of the three about equally often; none fits: no card
  const pillW = (t) => 1.06 * [...t].reduce((w, ch) => w + (NW[ch.replace(/[‘’]/, "'")] || 56), 0) * 15.5 / 100 + 26;
  const bothWrong = (set, x) => {
    const by = { L: [], M: [], S: [] };
    for (const o of set.facts.filter((y) => y.a === 1)) for (const w of set.facts.filter((y) => y.a === 2)) if (pillW(x.s) + pillW(o.s) + pillW(w.s) + 16 <= 600) by[lengthRole(x.s, [x.s, o.s, w.s])].push([o.s, w.s]);
    const roles = ['L', 'M', 'S'].filter((r) => by[r].length);
    if (!roles.length) return null;
    const r = roles[rng.int(0, roles.length - 1)];
    return by[r][rng.int(0, by[r].length - 1)];
  };
  // (the question is the part's instruction, as the sorting row of the page had none: a line of its own made the card taller
  // than a check takes, 393 to 413 px)
  const bothCard = (set, cols, x) => { const wrong = bothWrong(set, x); if (wrong) cards.push(holder(set.id, cols + `<div data-lcs-bothq>` + pillRow(placed(x.s, wrong, rng.int(0, 2), rng), x.s, false) + `</div>`)); };
  if (mode === 'storysort') for (const s of shuffle(BANK.series, rng)) {
    const both = twoCols(['Story 1', 'Story 2'], s.stories, 15.5);
    for (const x of shuffle(s.facts.filter((y) => y.a === 'both'), rng)) bothCard(s, both, x);     // (in a drawn order: the check keeps the first card it meets of each text)
  }
  if (mode === 'textsort') for (const t of shuffle(BANK.topics, rng)) {
    // two texts of more than twelve lines in a column (15.5 px, 289 px: the page's own estimate) make a card taller than
    // 330 px (measured 2026-11-19: 350 to 364 px for bees, frogs, moon and turtles); such a pair gives no card
    if (Math.max(...t.texts.map((x) => x.paras.reduce((n, pp) => n + wrapLines(pp, 15.5, 289, 12), 0))) > 12) continue;
    const both = twoCols(['Text 1', 'Text 2'], t.texts, 15.5);
    // (in a drawn order: the check keeps the first card it meets of each text)
    for (const x of shuffle(t.facts, rng)) cards.push(holder(t.id, both + sortRow(x.s, REGION, REGION[[1, 'both', 2].indexOf(x.a)]).replace('<div data-lcs-sortrow', `<div data-lcs-where="${x.a === 'both' ? 'both' : 'only'}" data-lcs-sortrow`)));
  }
  if (mode === 'textchart') for (const t of shuffle(BANK.topics, rng)) {
    [0, 1].forEach((i) => {
      const m = t.main[i], pool = t.dets[i], pairs = { L: [], M: [], S: [] };
      for (let a = 0; a < pool.length; a++) for (let c = a + 1; c < pool.length; c++) pairs[lengthRole(m, [m, pool[a], pool[c]])].push([pool[a], pool[c]]);
      const roles = ['L', 'M', 'S'].filter((r) => pairs[r].length), role = roles[rng.int(0, roles.length - 1)];
      const wrong = pairs[role][rng.int(0, pairs[role].length - 1)], at = rng.int(0, 2), x = t.texts[i];
      const textBox = `<div data-lcs-onetext style="display:flex;flex-direction:column;gap:2px;padding:4px 8px 6px;border-radius:14px;background:${T.cream}"><div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:center;column-gap:8px"><div data-lcs-colhead data-lcs-read style="font:800 14.5px/1.1 'Nunito',sans-serif;color:${T.teal}">Text ${i + 1}</div>${title(x.title, 17)}</div>` +
        white(x.paras.map((pp) => para(pp, d.font, 1.32)).join(''), 'data-lcs-paras', 'gap:3px;padding:4px 8px') + `</div>`;
      cards.push(holder(t.id + '|' + (i + 1), textBox + ask(i ? LINES.main2 : LINES.main1) + pillRow(placed(m, wrong, at, rng), m, true)));
    });
  }
  return { bodyHtml: STYLE + `<div data-lcs-ctcheck="${mode}|${lv}" data-lcs-noliga="on"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}">` + fRoom(checkGrid(cards, { cols: 1 })) + `</div>`, meta: {} };
}

module.exports = { makeComparingTextsG3Type, faultsOf, drawPage, LEVELS, INSTR, LINES, NOTE, FRAME, MODES, OUTSIDE, HOW, ownFull, howSample, KEYONLY };
