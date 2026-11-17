/**
 * writing-g1.js — eight Grade 1 writing pages, the unit "Writing: Stories, Opinions, and Facts" (English literacy year,
 * Daily Teaching System Part 12.3, 2026-11-18). Children are 6 or 7; the teacher reads every instruction and task line
 * aloud. The texts are data/literacy/writing-g1.en.json (written by the scratch script kk-g1write/bank.js); every piece is
 * original. Two page types per lesson: the first is read and marked or planned, the second is the child's own writing.
 *
 * Lesson "Write a true story: plan and draft" (W.1.3)
 *   storyplan  G1-616 Plan a True Story (day 1). 1. A true story of 25 to 40 words (three events after First, Next, Last and
 *              an ending sentence) to read with the teacher: circle the time words. 2. The three events in mixed order: write
 *              1, 2, 3 in the boxes (one right answer; never 1-2-3 or 3-2-1 down the rows). 3. The child's own plan: circle
 *              one of two ideas (or "My own idea"), then four bands First, Next, Last, The end: a box to draw and a row for
 *              a few words beside each.
 *                level 1  "Circle First, Next, and Last."; the band The end has the feeling words and the frame "I felt"
 *                level 2  "Circle the time words." and underline the ending sentence; The end: a box to draw, "I felt"
 *                level 3  as level 2, and part 2 holds one sentence that did not happen: the child crosses it out; The end
 *                         has an open row
 *   storydraft G1-617 Write a True Story (days 2 and 3). A tiny model story on another day (never an idea of the plan page),
 *              the draft on rows, and a check list of things a first grader can see.
 *                level 1  frames on every sentence: "First, I" / "Next, I" / "Last, I" (two rows each) / "I felt" (one row)
 *                level 2  starters: "First," / "Next," / "Last," (two rows each) / "At the end," (one row)
 *                level 3  six open rows and a word bank of time words
 *
 * Lesson "My opinion and a reason" (W.1.1)
 *   opread     G1-618 Opinion or Reason? (day 1). The box: an opinion tells what you think; a reason tells why. 1. Sentences
 *              to sort with a check mark under opinion or reason. 2. Opinions and reasons in two columns: draw a line from
 *              each opinion to its reason (every reason is read with every opinion of the task: one fits). 3. Two sentences
 *              with because: circle because (levels 2 and 3: and underline the reason).
 *                level 1  four sentences to sort, three pairs to match; opinions with "I think"
 *                level 2  six sentences, four pairs
 *                level 3  six sentences with opinions that do not start with "I think", four pairs and one reason that
 *                         fits no opinion (cross it out)
 *              "I like apples" is a fact about the speaker: no sentence on these pages is printed as an opinion that way.
 *   opwrite    G1-619 Write My Opinion (day 2). Two questions to choose from with a box to draw the answer, a tiny model on
 *              another topic, and the child's own piece: a topic sentence, an opinion with because and a reason, an ending
 *              that says the opinion again in new words ("That is why I pick fall.").
 *                level 1  frames: "This is about the best ___." / "I think ___ is the best" / "because ___." / "That is
 *                         why I pick ___."
 *                level 2  starters: "This is about" / "I think" (two rows) / "because" (two rows) / "That is why"
 *                level 3  six open rows and a word bank
 *
 * Lesson "All about a topic: facts and a closing" (W.1.2)
 *   factread   G1-620 Facts and a Closing (day 1). 1. A fact file (a library picture and three facts): write its topic on
 *              the line. 2. Sentences to sort under yes or no: is it about the topic? 3. Circle the closing sentence.
 *                level 1  four sentences to sort, two endings to choose from
 *                level 2  six sentences, three endings (a closing, a fact about the topic, a fact about something else)
 *                level 3  as level 2, and one sentence that is not about the topic is about a thing near it (a pond)
 *   factwrite  G1-621 Write an All About Page (day 2). A box to draw the topic with a row for two labels, a tiny model All
 *              About page on another topic (a topic of day 1), and five rows: the topic sentence, three facts, a closing.
 *                level 1  the fact box (picture and three notes) and frames "This is all about" / "Cows eat" / "Cows have" /
 *                         "Cows can" / "Now you know about"
 *                level 2  the fact box, starters "This is all about" / "Cows" (three times, with the words can, have, are,
 *                         eat, live in a box) / "Now you know"
 *                level 3  no fact box: two topics a child knows to choose from (or "My own idea"), open rows, a word bank
 *
 * Lesson "Revise and edit with a checklist" (W.1.5)
 *   edit       G1-622 Edit and Add a Detail (day 1). The box says how many mistakes and of which kind. 1. A short piece by a
 *              first grader with planted mistakes only (one per sentence, each with one right fix): fix them. 2. A partner's
 *              question about the sentence with the star: write it again with the detail.
 *                level 1  two mistakes (a small letter at the start, a missing period) · level 2  three (+ i for I) ·
 *                level 3  four (+ a name with a small letter)
 *   revise     G1-623 Revise with a Checklist (day 2). Two worked examples (a detail added; a capital or end mark fixed),
 *              the check list (Me and Partner boxes), the partner's question and the detail the child added.
 *                level 1  three checks; circle the question your partner asked · level 2  four checks, circle the question ·
 *                level 3  four checks; write the question, the detail, and what the partner liked
 *
 * Writing rows are 89 px (half an inch from the top rule to the base rule, with a dashed midline). A first grader writes
 * about 22 letters across a full row of 651 px: measured here as 29 px a letter (CHILD). The rows of a task hold the key's
 * sample at that width with a row to spare, or, where every row carries its own frame (one sentence a row), with at least
 * three letters of room left on every row (ROOM); verify() measures both on the rendered page. Text a child reads is 19 px
 * or more; words to circle 20 px or more. No blank band of more than 40 px between or inside blocks. Ligatures are off, and
 * an f before i, f, l, or t and a t before t get room of their own. Apostrophes and quotation marks are typographic. English
 * only; themeless: a copy draws other pieces. PDF only. verify() carries its own copy (SPEC) of every ruled text and measure.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
// The picture cache is on the PC only (the server has none): nothing that runs while this file LOADS may draw a page.
const HAS_PICTURE_CACHE = require('fs').existsSync(require('path').join(__dirname, '../../cache/manifest.json'));
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const { seatOnRow, rulesOf } = require('../../lib/key-on-row.js');
const BANK = require('../../data/literacy/writing-g1.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, rowSvg } = _parts;

const ROW = 89;            // every writing row
const CHILD = 27;          // a first grader's letter (about 23 letters across a full row)
const PAD = 6;             // a row's inset before the child's letters
const ROOM = 3;            // letters left free on a one-sentence row
const LABELROOM = 1;       // letters left free on a row for one label word
const BAND = 40;           // the widest blank band
const INNER = W - 24;      // a card's inner width (651)
const READ = 20;           // text a child reads
const LABEL = 20;          // a task line
const OPT = 21;            // a word or sentence to circle
const LEADPX = 22;         // words printed on a writing row
const GAPX = 8;            // the gap between printed words and the row beside them
const MATCHH = 50;         // a row of the matching task (G1-618)
const A = (s) => esc(s).replace(/"/g, '&quot;');
const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);
const NAMES = /^(I|Sam|Kim|Max|Ben|Mia)\b/;
const lc1 = (s) => (NAMES.test(s) ? s : String(s).charAt(0).toLowerCase() + String(s).slice(1));
const noEnd = (s) => String(s).replace(/[.?!]$/, '');
const tok = (s) => String(s).toLowerCase().replace(/’/g, "'").match(/[a-z]+(?:'[a-z]+)?/g) || [];
const stem = (w) => w.replace(/(ies)$/, 'y').replace(/(es|s)$/, '');

/** the advance widths (em) of Nunito 700 with its joined letters off (measured 2026-11-17, sentences-k.js) */
const NUNITO700 = { a: 0.547, b: 0.6, c: 0.4625, d: 0.6, e: 0.542, f: 0.3422, g: 0.604, h: 0.585, i: 0.255, j: 0.259, k: 0.536, l: 0.319, m: 0.877,
  n: 0.585, o: 0.576, p: 0.6, q: 0.6, r: 0.392, s: 0.488, t: 0.3574, u: 0.579, v: 0.565, w: 0.891, x: 0.546, y: 0.564, z: 0.474, A: 0.744, B: 0.688,
  C: 0.6582, D: 0.762, E: 0.597, F: 0.562, G: 0.736, H: 0.773, I: 0.282, J: 0.335, K: 0.665, L: 0.562, M: 0.868, N: 0.748, O: 0.785, P: 0.652,
  Q: 0.785, R: 0.686, S: 0.631, T: 0.6334, U: 0.738, V: 0.713, W: 1.113, X: 0.672, Y: 0.6228, Z: 0.605, ' ': 0.271, '.': 0.27, '?': 0.47, "'": 0.22, '’': 0.22, ',': 0.27, ':': 0.27, '-': 0.33, '!': 0.3 };
const emOf = (t) => [...String(t)].reduce((a, c) => a + (NUNITO700[c] || (/[0-9]/.test(c) ? 0.56 : 0.9)), 0);
/** a model runs to two lines at most (a third line pushed a page past its foot): its words wrapped at 19 px over 600 px
 *  (the model's line holds 623 px; the rest is a margin for the bold label and the estimate) */
const MODELW = 600;
const modelLines = (text, W = MODELW) => { let n = 1, w = 0; const sp = emOf(' ') * 19; for (const word of ('Model: ' + text).split(' ')) { const x = emOf(word) * 19; if (w && w + sp + x > W) { n++; w = x; } else w += (w ? sp : 0) + x; } return n; };
/** the model of G1-619 stands beside the box to draw in (OPMODELW wide inside its card), in OPMODELLINES lines at most */
const OPMODELW = 335, OPMODELLINES = 4;
/** the size of a key's answer seated on a row (lib/key-on-row.js: its x-height fills the row's band) */
const KEY_PX = (() => { const m = require('../../primitives/font-metrics.json')['nunito-700']; const r = rulesOf(rowSvg(200, ROW)); return Math.round(((r.base - r.mid) / m.xHeight) * 2) / 2; })();
const BASE = rulesOf(rowSvg(300, ROW)).base;
/** the width (px) of words printed on a row, and of a key's answer (the widths of NUNITO700 run up to 4 % short) */
const leadW = (s) => Math.ceil(emOf(s) * LEADPX * 1.05) + 2;
const keyFits = (text, w) => emOf(text) * KEY_PX * 1.05 <= w - 16;
const freeOf = (w) => Math.floor((w - PAD) / CHILD);

/* ------------------------------------------------------------------ the instructions and task lines (strings; verify() has its own copy) */
const INSTR = {
  storyplan: { 1: 'A true story tells what happened first, next, and last.', 2: 'Time words like first, next, and last tell the order of a story.', 3: 'A true story tells what happened in order and how it ended.' },
  storydraft: { 1: 'Use your plan. Tell what happened first, next, and last.', 2: 'Use your plan and the time words to write your true story.', 3: 'Write your story in order. Then tell how it ended.' },
  opread: { 1: 'An opinion tells what you think. A reason tells why.', 2: 'An opinion tells what you think. A reason tells why you think so.', 3: 'A reason tells why you think so. It must fit its opinion.' },
  opwrite: { 1: 'Tell what you think. Then tell why.', 2: 'Name your topic, tell what you think and why, and end your piece.', 3: 'Write your topic, your opinion, a reason, and an ending.' },
  factread: { 1: 'A fact is something true. Every fact in a piece tells about its topic.', 2: 'Every fact tells about the topic. A closing sentence ends the piece.', 3: 'Keep to the topic. A closing sentence ends the piece.' },
  factwrite: { 1: 'Write facts about the topic. Use the fact box.', 2: 'Name your topic, write facts about it, and end with a closing.', 3: 'Write about a topic you know: facts and a closing.' },
  edit: { 1: 'Writers read their work again and fix mistakes.', 2: 'Writers fix capitals and end marks, and they add details.', 3: 'Edit like a writer: capitals, end marks, and a detail.' },
  revise: { 1: 'Add the detail your partner asked for. Then check your writing.', 2: 'Answer your partner with a detail. Then check your writing together.', 3: 'Answer your partner, add a detail, and check your writing.' },
};
const LINES = {
  story: { 1: 'Read the story with your teacher. Circle First, Next, and Last.', 2: 'Read the story. Circle the time words. Underline the ending.', 3: 'Read the story. Circle the time words. Underline the ending.' },
  order: { 1: 'Write 1, 2, or 3 in each box to show the order.', 2: 'Write 1, 2, or 3 in each box to show the order.', 3: 'Write 1, 2, or 3. One is not in the story: put an X in its box.' },
  plan: 'Circle an idea. Draw and write a few words in each box.',
  draft: 'Write your story. Then check the boxes that are true.',
  kind: { 1: 'Read each sentence with your teacher. Put a check mark under opinion or reason.', 2: 'Read each sentence. Put a check mark under opinion or reason.', 3: 'Read each sentence. Put a check mark under opinion or reason.' },
  match: { 1: 'Draw a line from each opinion to its reason.', 2: 'Draw a line from each opinion to its reason.', 3: 'Draw a line to match each pair. Cross out the extra reason.' },
  because: { 1: 'Read each sentence. Circle the word because.', 2: 'Read each sentence. Circle because. Underline the reason after it.', 3: 'Read each sentence. Circle because. Underline the reason after it.' },
  choose: 'Circle one question. Draw your answer in the box.',
  opdraft: 'Write your opinion about the question you circled.',
  file: 'Read the fact file with your teacher. Write its topic on the line.',
  sort: 'Read each sentence. Is it about the topic? Put a check mark under yes or no.',
  close: 'Which sentence is a closing? Circle it.',
  factbox: { 1: 'Read the fact box. Draw the topic. Write two labels.', 2: 'Read the fact box. Draw the topic. Write two labels.', 3: 'Circle a topic or use your own. Draw it. Write two labels.' },
  factdraft: 'Write your All About page.',
  edit: 'Read the story by a first grader. Find and fix the {N} mistakes.',
  detail: 'Write the star sentence again with a detail.',
  check: 'Check your writing in the Me boxes. Then your partner checks it.',
  partner: { 1: 'Circle the question your partner asked. Add the detail to your draft and write it here.', 2: 'Circle the question your partner asked. Add the detail to your draft and write it here.', 3: 'Circle the question your partner asked. Add the detail to your draft and write it here. Write what your partner liked.' },
};
const TW = ['First', 'Next', 'Last'];
const BANDS = ['First', 'Next', 'Last', 'The end'];
const STORYLEAD = { 1: ['First, I', 'Next, I', 'Last, I', 'I felt'], 2: ['First,', 'Next,', 'Last,', 'At the end,'] };
/** a check list of things a first grader can see; an item with an icon of G1-623 carries it ('' = none) */
const ENDMARK = 'Each sentence ends with an end mark.';
const DRAFTCHECK = { 1: [ENDMARK, 'I wrote how I felt.'], 2: [ENDMARK, 'I wrote how it ended.'], 3: ['Each sentence starts with a capital.', ENDMARK, 'I used time words.', 'I wrote how it ended.'] };
const OPCHECK = ['I wrote because.', 'I wrote an ending.', ENDMARK];
const FACTCHECK = ['Each fact tells about my topic.', 'I wrote a closing.'];
const ICONOF = { [ENDMARK]: '.?!', 'Each sentence starts with a capital.': 'Aa' };
const OPRULE = ['An opinion tells what you think:', 'A reason tells why:'];
const OPLEAD = { 1: { topic: ['This is about the best', '.'], op: ['I think', 'is the best'], why: 'because', end: ['That is why I pick', '.'] }, 2: { topic: 'This is about the best', op: 'I think', why: 'because', end: 'That is why' } };
const FACTLEAD = { topic: 'This is all about', close1: 'Now you know about' };
/** the closings of the fact files of day 1 (one per file): not always the one with !, not always the longest */
const CLOSINGS = ['That is all about', 'Now you know about', 'I hope you learned a lot about'];
const FIXROWS = { cap: 'A sentence starts with a small letter. Write the capital letter above it.', end: 'A sentence has no end mark. Add the end mark.', i: 'The word I is a small i. Write a capital I above it.', name: 'A name starts with a small letter. Write the capital letter above it.' };
const ASKED = "The writer's partner asked:";
const REVCHECK = [['Aa', 'Each sentence starts with a capital letter.'], ['.?!', 'Each sentence ends with an end mark.'], ['I', 'I and names start with a capital letter.'], ['+', 'I added a detail.']];
const REVLEVEL = { 1: [0, 1, 3], 2: [0, 1, 2, 3], 3: [0, 1, 2, 3] };
const OTHERQ = 'Other: ________';
const sampleFor = (q) => `(Sample for: ${q})`;

/* ------------------------------------------------------------------ levels */
const LEVELS = {
  storyplan: { 1: { extra: 0, named: true, ending: false, end: 'feel' }, 2: { extra: 0, named: false, ending: true, end: 'draw' }, 3: { extra: 1, named: false, ending: true, end: 'open' } },
  storydraft: { 1: { help: 'frame' }, 2: { help: 'starter' }, 3: { help: 'open', rows: 6 } },
  opread: { 1: { kind: 2, match: 3, odd: 0, think: true, under: false, bare: 0, nounReason: 0 }, 2: { kind: 3, match: 4, odd: 0, think: true, under: true, bare: 1, nounReason: 0 }, 3: { kind: 3, match: 4, odd: 1, think: false, under: true, bare: 0, nounReason: 1 } },
  opwrite: { 1: { help: 'frame', model: true }, 2: { help: 'starter', model: true }, 3: { help: 'open', rows: 6, model: false } },
  factread: { 1: { about: 2, not: 2, near: 0, ends: 2, bang: false }, 2: { about: 3, not: 3, near: 0, ends: 3, bang: true }, 3: { about: 3, not: 3, near: 1, ends: 3, bang: true } },
  factwrite: { 1: { help: 'frame', model: true }, 2: { help: 'starter', model: true }, 3: { help: 'open', model: false } },
  edit: { 1: { faults: ['cap', 'end'] }, 2: { faults: ['cap', 'end', 'i'] }, 3: { faults: ['cap', 'end', 'i', 'name'] } },
  revise: { 1: { liked: false }, 2: { liked: false }, 3: { liked: true } },
};

/* ------------------------------------------------------------------ placing a sample on rows (at a child's letter width) */
/** lines: [{ lead, tail, w }] (w = the row's width); sents: [{ at, text }] (text = what the child writes after the printed
 *  words). A sentence starts on its line and runs on until the line where the next one starts; a line with words after its
 *  row (a tail) holds its sentence alone. A line holds a text when a child's letters fit and the key's letters fit too.
 *  Returns the text of every line, or null. */
function place(lines, sents) {
  const out = lines.map(() => '');
  for (let k = 0; k < sents.length; k++) {
    const s = sents[k], stop = lines[s.at].tail ? s.at + 1 : k + 1 < sents.length ? sents[k + 1].at : lines.length;
    let i = s.at;
    for (const w of String(s.text).split(' ').filter(Boolean)) {
      const nx = out[i] ? out[i] + ' ' + w : w;
      if (nx.length <= freeOf(lines[i].w) && keyFits(nx, lines[i].w)) { out[i] = nx; continue; }
      i++;
      if (i >= stop || w.length > freeOf(lines[i].w) || !keyFits(w, lines[i].w)) return null;
      out[i] = w;
    }
  }
  return out;
}
/** the rule of a task: 'spare' (a row of the task stays empty) or 'room' (every row keeps ROOM letters free) */
function fitsRule(parts, rule) {
  const outs = parts.map((p) => place(p.lines, p.sents));
  if (outs.some((o) => !o)) return false;
  if (rule === 'spare') return outs.some((o) => o.some((x) => !x));
  return parts.every((p, k) => outs[k].every((x, i) => !x || freeOf(p.lines[i].w) - x.length >= (p.room || ROOM)));
}
/** a line's row width inside a card of width avail: what its printed words leave */
const widthOf = (avail, lead, tail) => avail - (lead ? leadW(lead) + GAPX : 0) - (tail ? leadW(tail) + GAPX : 0);
/** builds a part: rows [{ lead, tail }] in a card of width avail, the sentences, the full sample (what the key reads) */
const mkPart = (name, avail, rows, sents, full) => ({ name, lines: rows.map((r) => ({ ...r, w: r.w || widthOf(avail, r.lead, r.tail) })), sents, full });

/* ------------------------------------------------------------------ the parts of each writing task */
/** the time word of the middle event: Next on level 1 (its task line names First, Next, and Last); on levels 2 and 3 some
 *  stories say Then or After that, so that "circle the time words" asks more than level 1 */
const midWord = (s, lv) => (lv >= 2 && s.alt ? s.alt : TW[1]);
const timeWords = (s, lv) => [TW[0], midWord(s, lv), TW[2]];
const storyText = (s, lv = 1) => `${TW[0]}, ${lc1(s.e[0])}. ${midWord(s, lv)}, ${lc1(s.e[1])}. ${TW[2]}, ${lc1(s.e[2])}. ${s.end}`;
const storyWords = (s) => Math.max(...[1, 3].map((lv) => storyText(s, lv).split(/\s+/).length));
/** the plan's four bands: a row beside the drawing (BANDROW wide), the notes of the sample idea; a band is as tall as its
 *  box to draw in (the bands share the card: a box is a row high or more), the row stands in its middle */
const CHIPW = 92, DRAWW = 150, BANDROW = INNER - CHIPW - DRAWW - 2 * GAPX;
function planParts(lv, p) {
  const d = LEVELS.storyplan[lv], ps = [0, 1, 2].map((k) => mkPart('band' + (k + 1), BANDROW, [{}], [{ at: 0, text: p.notes[k] }], p.notes[k]));
  ps.push(d.end === 'open' ? mkPart('band4', BANDROW, [{}], [{ at: 0, text: p.felt }], p.felt) : mkPart('band4', BANDROW, [{ lead: 'I felt' }], [{ at: 0, text: p.felt }], 'I felt ' + p.felt));
  return ps;
}
function draftParts(lv, p) {
  const d = LEVELS.storydraft[lv];
  if (d.help === 'open') {
    const t = `First, I ${p.e[0]}. Next, I ${p.e[1]}. Last, I ${p.e[2]}. I felt ${p.felt}.`;
    return [mkPart('story', INNER, Array.from({ length: d.rows }, () => ({})), [{ at: 0, text: t }], t)];
  }
  const L = STORYLEAD[lv];
  const ev = (k) => (lv === 1 ? `${p.e[k]}.` : `I ${p.e[k]}.`);
  const ps = [0, 1, 2].map((k) => mkPart('event' + (k + 1), INNER, [{ lead: L[k] }, {}], [{ at: 0, text: ev(k) }], `${L[k]} ${ev(k)}`));
  const fe = lv === 1 ? `${p.felt}.` : `I felt ${p.felt}.`;
  ps.push(mkPart('ending', INNER, [{ lead: L[3] }], [{ at: 0, text: fe }], `${L[3]} ${fe}`));
  return ps;
}
/** the opinion piece (G1-619) of a prompt at a level */
function opParts(lv, p) {
  const d = LEVELS.opwrite[lv];
  const topic = `This is about the best ${p.y}.`, opn = `I think ${p.x} is the best because ${p.why}.`, end = `That is why I pick ${p.x}.`;
  if (d.help === 'open') { const t = `${topic} ${opn} ${end}`; return [mkPart('piece', INNER, Array.from({ length: d.rows }, () => ({})), [{ at: 0, text: t }], t)]; }
  const L = OPLEAD[lv];
  // the opinion has two rows (a book title runs on to the second: TITLEMIN letters or more at a first grader's width)
  if (lv === 1) return [
    mkPart('topic', INNER, [{ lead: L.topic[0] }], [{ at: 0, text: `${p.y}.` }], topic),
    mkPart('opinion', INNER, [{ lead: L.op[0] }, { tail: L.op[1] }, { lead: L.why }], [{ at: 0, text: p.x }, { at: 2, text: `${p.why}.` }], opn),
    mkPart('ending', INNER, [{ lead: L.end[0] }], [{ at: 0, text: `${p.x}.` }], end),
  ];
  return [
    mkPart('topic', INNER, [{ lead: L.topic }], [{ at: 0, text: `${p.y}.` }], topic),
    mkPart('opinion', INNER, [{ lead: L.op }, {}, { lead: L.why }], [{ at: 0, text: `${p.x} is the best` }, { at: 2, text: `${p.why}.` }], opn),
    mkPart('ending', INNER, [{ lead: L.end }], [{ at: 0, text: `I pick ${p.x}.` }], end),
  ];
}
const TITLEMIN = 24;
/** level 3 of G1-621: the check list stands beside the fourth (spare) row of facts, SPARECHECKW wide */
const SPARECHECKW = 352;
/** the model of day 2: one day-1 topic said in the singular, in exactly the shape of the frame */
const opModel = (t) => `This is about the best ${t.ys}. I think ${t.xs} is the best because ${t.ms}. That is why I pick ${t.xs}.`;
/** the All About page (G1-621): t = a fact box topic (levels 1, 2) or an own topic (level 3) */
const lcNoun = (n) => (/^The /.test(n) ? n.toLowerCase() : n.toLowerCase());
function factParts(lv, t) {
  const n = t.noun, low = lcNoun(n), topic = `${FACTLEAD.topic} ${low}.`, close = `${FACTLEAD.close1} ${low}!`;
  if (lv === 3) {
    // three open rows for the facts and a fourth to spare (the child composes them)
    return [mkPart('topic', INNER, [{ lead: FACTLEAD.topic }], [{ at: 0, text: `${low}.` }], topic), ...t.facts.map((f, k) => mkPart('fact' + (k + 1), INNER, [{}], [{ at: 0, text: f }], f)), mkPart('spare', INNER - SPARECHECKW - 12, [{}], [], ''), mkPart('closing', INNER, [{ lead: FACTLEAD.close1 }], [{ at: 0, text: `${low}!` }], close)];
  }
  const ps = [mkPart('topic', INNER, [{ lead: FACTLEAD.topic }], [{ at: 0, text: `${low}.` }], topic)];
  t.notes.forEach(([v, note], k) => ps.push(lv === 1 ? mkPart('fact' + (k + 1), INNER, [{ lead: `${n} ${v}` }], [{ at: 0, text: `${note}.` }], `${n} ${v} ${note}.`) : mkPart('fact' + (k + 1), INNER, [{ lead: n }], [{ at: 0, text: `${v} ${note}.` }], `${n} ${v} ${note}.`)));
  ps.push(mkPart('closing', INNER, [{ lead: FACTLEAD.close1 }], [{ at: 0, text: `${low}!` }], close));
  return ps;
}
const factModel = (t) => `${FACTLEAD.topic} ${t.noun.toLowerCase()}. ${t.file.join(' ')} ${FACTLEAD.close1} ${t.noun.toLowerCase()}!`;
const PICW = 330, LABELW = Math.floor((PICW - GAPX) / 2);   // the box to draw in, and a row for one label under it
const labelParts = (labels) => labels.map((l, k) => ({ ...mkPart('label' + (k + 1), LABELW, [{ w: LABELW }], [{ at: 0, text: l }], l), room: LABELROOM }));
const DETAILROWS = { 1: 3, 2: 3, 3: 3 };
const RING = 3.5;            // the padding and border of a ring the key draws round a word (given back by its margins)
const MARKPX = 26;          // a capital the key writes above a word
const ENDPX = 34;           // an end mark the key adds
const FBPIC = 70;           // the picture of a fact box (G1-621)
const PARATOP = 14; // room above the first line for the letters the key writes above its words (they cleared the title by 2 px)
const PARALH = { 1: 3.15, 2: 2.95, 3: 2.85 };
const PIECEPADB = { 1: 26, 2: 14, 3: 4 };   // the room under the piece (the detail card below keeps its rows close together)   // the line height of the piece to edit (room above each word for the fix)
/** the lines a piece to edit takes in its box (623 px at 22 px, the page font; a word that runs past the line wraps) */
const paraFit = (p) => { let n = 1, cur = 0; for (const w of p.s.map((x) => (x.detail ? '★ ' : '') + x.t).join(' ').split(' ')) { const ww = emOf(w) * 22 * 1.02, sp = emOf(' ') * 22; if (cur && cur + sp + ww > 623) { n++; cur = ww; } else cur += (cur ? sp : 0) + ww; } return { n, last: cur }; };
const paraLines = (p) => paraFit(p).n;
/** the last line of a piece keeps clear of both ends (the estimate is not the browser: a piece whose last line holds one word
 *  wraps onto two lines once a capital is lowered and an end mark taken away, and a full one onto four) */
const PARALAST = [160, 480];
const detailPart = (s, lv) => mkPart('detail', INNER, Array.from({ length: DETAILROWS[lv] }, () => ({})), [{ at: 0, text: s.a }], s.a);
function partnerParts(lv, s) {
  // levels 1, 2: three rows for the detail (one to spare); level 3: two rows and a row for what the partner liked (the
  // partner's own words: no sample on the key, it is the row to spare)
  if (lv < 3) return [mkPart('added', INNER, [{ lead: 'I added:' }, {}, {}], [{ at: 0, text: s.added }], 'I added: ' + s.added)];
  return [mkPart('added', INNER, [{ lead: 'I added:' }, {}], [{ at: 0, text: s.added }], 'I added: ' + s.added), mkPart('liked', INNER, [{ lead: 'My partner liked:' }], [], 'My partner liked:')];
}

/* ------------------------------------------------------------------ the places of answers */
/** an order of n numbered rows (0-based answers) that is never 0-1-2 or 2-1-0 down three rows that follow each other */
const stair = (a) => a.some((x, i) => i >= 2 && ((a[i - 1] === a[i - 2] + 1 && x === a[i - 1] + 1) || (a[i - 1] === a[i - 2] - 1 && x === a[i - 1] - 1)));
/** an order of kinds with no three alike in a row, never every other one, never a block that repeats */
function orderOk(o) {
  if (o.some((x, i) => i >= 2 && x === o[i - 1] && x === o[i - 2])) return false;
  const ks = [...new Set(o)];
  if (ks.length === 2 && o.length >= 4 && o.every((x, i) => !i || x !== o[i - 1])) return false;
  if (o.length >= 6 && [2, 3].some((L) => o.every((x, i) => i < L || x === o[i - L]))) return false;
  if (o.length === 4 && o[0] === o[2] && o[1] === o[3]) return false;
  return true;
}
function kindOrder(counts, rng) {
  const bag = Object.entries(counts).flatMap(([k, c]) => Array(c).fill(k));
  for (let t = 0; t < 4000; t++) { const o = shuffle(bag, rng); if (orderOk(o)) return o; }
  throw new Error('writing-g1: no mixed order of ' + JSON.stringify(counts));
}
/** a matching order: right[i] = the row of the reason of opinion i; never straight across, never all the same distance */
function matchOrder(n, m, rng) {
  for (let t = 0; t < 4000; t++) {
    const rows = shuffle(Array.from({ length: m }, (_, i) => i), rng).slice(0, n);
    if (rows.some((r, i) => r === i)) continue;
    if (new Set(rows.map((r, i) => r - i)).size < 2) continue;
    return rows;
  }
  throw new Error('writing-g1: no matching order');
}
/** every matching order of n opinions to m reasons (never straight across, never all the same distance), and the one copy
 *  `variant` takes: the orders in a fixed shuffle per level, taken in turn (the patterns of the lines spread evenly over copies) */
function matchCands(n, m) {
  const out = [], rec = (a) => { if (a.length === n) { if (!a.some((r, i) => r === i) && new Set(a.map((r, i) => r - i)).size >= 2) out.push(a.slice()); return; } for (let r = 0; r < m; r++) if (!a.includes(r)) { a.push(r); rec(a); a.pop(); } };
  rec([]); return out;
}
const matchPick = (n, m, lv, variant) => { const c = makeRng('writing-g1|match|' + lv).shuffle(matchCands(n, m)); return c[((variant || 1) - 1) % c.length]; };
/** two different items of a pool for copy `variant`: the unordered pairs in a fixed shuffle per mode and level, taken in turn */
const pairOf = (pool, tag, lv, variant, rng) => { const ps = []; for (let i = 0; i < pool.length; i++) for (let j = i + 1; j < pool.length; j++) ps.push([pool[i], pool[j]]); const o = makeRng('writing-g1|' + tag + '-pairs|' + lv).shuffle(ps); return shuffle(o[((variant || 1) - 1) % o.length], rng); };
/** the lengths of two groups overlap (word length gives nothing away) */
const overlap = (a, b) => a.length && b.length && Math.max(...a) > Math.min(...b) && Math.max(...b) > Math.min(...a);

/* ------------------------------------------------------------------ what a page holds */
/** copy `variant` of a level takes the item at its place in a fixed order of the pool (seeded by the mode and the level) */
const rot = (pool, mode, lv, variant) => { const o = makeRng('writing-g1|' + mode + '|' + lv).shuffle(pool); return o[((variant || 1) - 1) % o.length]; };
const opOf = (t, lv) => (LEVELS.opread[lv].think ? `I think ${t.x} are the best ${t.y}.` : t.op3);
/** a reason that starts with the topic's noun instead of They (level 3 prints one, so that They does not mark the reasons) */
const nounReason = (t, r) => (/^They /.test(t.rs[r]) ? cap(t.x) + t.rs[r].slice(4) : null);
const becauseOf = (t, r, think) => `${noEnd(think ? `I think ${t.x} are the best ${t.y}.` : t.op3)} because ${lc1(t.rs[r])}`;
/** a reason r of topic t may stand with the opinion of topic u (also-lists of the bank) */
const fitsAlso = (t, r, u) => ((t.also || {})[r] || []).includes(u.key);
/** the three closings of a fact file's topic */
const closingsOf = (noun) => CLOSINGS.map((c) => `${c} ${noun.toLowerCase()}${c === 'Now you know about' ? '!' : '.'}`);

function plan(b, mode, lv, rng, variant) {
  const d = LEVELS[mode][lv];
  if (mode === 'storyplan') {
    const s = rot(b.story.stories, mode, lv, variant);
    for (let t = 0; t < 400; t++) {
      const rows = [0, 1, 2].map((k) => ({ t: cap(s.e[k]) + '.', n: k + 1 }));
      if (d.extra) rows.push({ t: s.extra, n: 0 });
      const o = shuffle(rows, rng), nums = o.filter((x) => x.n).map((x) => x.n);
      if (stair(nums) || (d.extra && (o[o.length - 1].n === 0 || o[0].n === 0) && rng.int(0, 2))) continue;
      // two ideas and "My own idea" on one row of chips (measured with the page font)
      const ideas = shuffle(b.story.prompts, rng).slice(0, 2), sampleAt = rng.int(0, 1);
      if ([...ideas.map((x) => x.text), 'My own idea'].reduce((a, t) => a + emOf(t) * OPT * 1.05 + 26, 0) + 20 > INNER - 6) continue;
      return { mode, lv, s, rows: o, ideas, sampleAt, list: ['story:' + s.key, ...ideas.map((x) => 'idea:' + x.key)] };
    }
    throw new Error('writing-g1: no order of events');
  }
  if (mode === 'storydraft') {
    const m = rot(b.story.models, mode, lv, variant), p = shuffle(b.story.prompts, rng)[0];
    return { mode, lv, m, p, list: ['model:' + m.key, 'sample:' + p.key] };
  }
  if (mode === 'opread') {
    for (let t = 0; t < 800; t++) {
      const first = rot(b.opinion.topics, mode, lv, variant), pool = shuffle(b.opinion.topics.filter((x) => x !== first), rng);
      // no two topics of one kind on a page (two "best toys" opinions confuse a first grader)
      const ts = []; for (const x of [first, ...pool]) if (!ts.some((y) => y.y === x.y)) ts.push(x);
      const need = d.kind + d.match + d.odd + 2;
      if (ts.length < need) break;
      ts.length = need;
      const kindT = ts.slice(0, d.kind), matchT = ts.slice(d.kind, d.kind + d.match), oddT = ts.slice(d.kind + d.match, d.kind + d.match + d.odd), becT = ts.slice(-2);
      // part 1: the opinion and one reason of each topic, in a mixed order of kinds; lengths of the two kinds overlap; a reason
      // that is a taste or a look (judge) never stands here; level 2 prints one opinion without "I think", level 3 one reason
      // that starts with the noun (no single word marks a kind)
      const ord = kindOrder({ opinion: d.kind, reason: d.kind }, rng), q = { opinion: shuffle(kindT, rng), reason: shuffle(kindT, rng) };
      const bareAt = d.bare ? rng.int(0, d.kind - 1) : -1;
      let ok = 0, nounAt = -1;
      const kind = ord.map((k) => { const x = q[k].shift(); if (k === 'opinion') return { kind: k, t: ok++ === bareAt ? x.op3 : opOf(x, lv), key: x.key };
        const rr = [0, 1].filter((r) => !(x.judge || []).includes(r)); return { kind: k, r: rr[rng.int(0, rr.length - 1)], key: x.key, x }; });
      if (d.nounReason) { const can = kind.map((y, i) => (y.kind === 'reason' && nounReason(y.x, y.r) ? i : -1)).filter((i) => i >= 0); if (!can.length) continue; nounAt = can[rng.int(0, can.length - 1)]; }
      kind.forEach((y, i) => { if (y.kind === 'reason') { y.t = i === nounAt ? nounReason(y.x, y.r) : y.x.rs[y.r]; delete y.x; } });
      if (!overlap(kind.filter((x) => x.kind === 'opinion').map((x) => x.t.length), kind.filter((x) => x.kind === 'reason').map((x) => x.t.length))) continue;
      // part 2: each opinion's reason fits it alone (every reason read with every opinion of the task)
      const reasons = matchT.map((x) => ({ key: x.key, r: rng.int(0, 1) }));
      if (reasons.some((rr, i) => matchT.some((u, j) => j !== i && fitsAlso(matchT[i], rr.r, u)))) continue;
      const odd = oddT.map((x) => ({ key: x.key, r: rng.int(0, 1) }));
      if (odd.some((rr) => matchT.some((u) => fitsAlso(oddT[0], rr.r, u)))) continue;
      const m = matchT.length + odd.length, at = matchPick(matchT.length, m, lv, variant), right = Array(m).fill(null);
      reasons.forEach((rr, i) => { right[at[i]] = { ...rr, t: matchT[i].rs[rr.r], of: i }; });
      const free = right.map((x, i) => (x ? -1 : i)).filter((i) => i >= 0); odd.forEach((rr, k) => { right[free[k]] = { ...rr, t: oddT[k].rs[rr.r], of: -1 }; });
      // part 3: two sentences with because
      const bec = becT.map((x) => ({ key: x.key, r: rng.int(0, 1) }));
      return { mode, lv, kind, left: matchT.map((x) => ({ key: x.key, t: opOf(x, lv) })), right, bec, list: [...kind.map((x) => 'kind:' + x.t), ...matchT.map((x) => 'match:' + x.key), ...bec.map((x) => 'because:' + x.key)] };
    }
    throw new Error('writing-g1: no page of opinions');
  }
  if (mode === 'opwrite') {
    // level 3 (open rows) offers only the questions whose sample fits its rows with one to spare, and not the book question,
    // whose key says on an extra line that any book the class read is right (the open page has no line to spare)
    // (open: false = levels 1 and 2)
    const pool = b.opinion.prompts.filter((x) => d.help !== 'open' || x.open !== false);
    const qs = pairOf(pool, mode, lv, variant, rng);
    const model = d.model ? rot(b.opinion.topics, mode + '-model', lv, variant) : null;
    return { mode, lv, qs, sampleAt: rng.int(0, 1), model, list: ['q:' + qs[0].key, 'q:' + qs[1].key, ...(model ? ['model:' + model.key] : [])] };
  }
  if (mode === 'factread') {
    for (let k = 0; k < 400; k++) {
      const t = rot(b.facts.day1, mode, lv, variant), others = shuffle(b.facts.day1.filter((x) => x !== t), rng);
      const about = shuffle(t.about.filter((x) => x !== t.bang), rng).slice(0, d.about);
      // not about the topic: facts of other topics (their file or about facts), and on level 3 the sentence about a thing near it
      const notPool = others.map((o) => shuffle([...o.file, ...o.about], rng)[0]);
      const not = [...(d.near ? [t.near] : []), ...notPool].slice(0, d.not);
      const ord = kindOrder({ yes: d.about, no: d.not }, rng), qq = { yes: shuffle(about, rng), no: shuffle(not, rng) };
      const sort = ord.map((x) => ({ kind: x, t: qq[x].shift() }));
      if (!overlap(sort.filter((x) => x.kind === 'yes').map((x) => x.t.length), sort.filter((x) => x.kind === 'no').map((x) => x.t.length))) continue;
      // the endings: the closing, the file's bang fact (about the topic, nowhere else on the page; with ! on levels 2 and 3,
      // so the closing is never the one sentence with !), a fact about something else
      const spareFact = d.bang ? t.bang.replace(/\.$/, '!') : t.bang;
      const offFact = shuffle(others.slice(d.not).map((o) => o.file[rng.int(0, 2)]), rng)[0];
      const ends = shuffle([{ kind: 'close', t: t.closing }, { kind: 'fact', t: spareFact }, ...(d.ends === 3 ? [{ kind: 'off', t: offFact }] : [])], rng);
      return { mode, lv, t, sort, ends, list: ['file:' + t.key, ...sort.map((x) => 'sort:' + x.t)] };
    }
    throw new Error('writing-g1: no page of facts');
  }
  if (mode === 'factwrite') {
    const model = d.model ? rot(b.facts.day1.filter((t) => modelLines(factModel(t)) <= 2), mode + '-model', lv, variant) : null;
    if (lv === 3) {
      const qs = pairOf(b.facts.own, mode, lv, variant, rng);
      return { mode, lv, qs, sampleAt: rng.int(0, 1), model, list: ['own:' + qs[0].key, 'own:' + qs[1].key, ...(model ? ['model:' + model.key] : [])] };
    }
    const t = rot(b.facts.day2, mode, lv, variant);
    return { mode, lv, t, model, list: ['box:' + t.key, 'model:' + model.key] };
  }
  if (mode === 'edit') {
    const p = rot(b.edit.pieces, mode, lv, variant), faults = editFaults(p, lv, rng);
    return { mode, lv, p, faults, list: ['piece:' + p.key, 'cap:' + faults.cap, 'end:' + faults.end] };
  }
  if (mode === 'revise') {
    const ex = [rot(b.revise.examples.filter((x) => x.kind === 'detail'), mode, lv, variant), rot(b.revise.examples.filter((x) => x.kind === 'mark'), mode + '-mark', lv, variant)];
    const s = rot(b.revise.samples, mode + '-sample', lv, variant);
    return { mode, lv, ex, s, list: [...ex.map((x) => 'ex:' + x.b), 'sample:' + s.for] };
  }
  throw new Error('writing-g1: no plan for ' + mode);
}

/** where the mistakes of a piece stand at a level: one per sentence; the capital on a sentence that does not start with I
 *  or a name, the missing period on a plain statement (never one that may take !), and never just before the sentence that
 *  lost its capital (the break would not show) */
function editFaults(p, lv, rng) {
  const d = LEVELS.edit[lv], S = p.s, idx = S.map((x, i) => i);
  for (let k = 0; k < 400; k++) {
    const capAt = shuffle(idx.filter((i) => S[i].cap), rng)[0], endAt = shuffle(idx.filter((i) => S[i].end && i !== capAt), rng)[0];
    if (capAt === undefined || endAt === undefined || endAt + 1 === capAt) continue;
    const faults = { cap: capAt, end: endAt };
    if (d.faults.includes('i')) faults.i = idx.find((i) => S[i].i);
    if (d.faults.includes('name')) faults.name = idx.find((i) => S[i].name);
    return faults;
  }
  throw new Error('writing-g1: no place for the mistakes of ' + p.key);
}

/* ------------------------------------------------------------------ the bank */
const TIMEWORDS = /\b(first|next|last|then|after|before|soon|later|finally|now|once|when|while|until|again|today|yesterday|tomorrow)\b/i;
/** a sentence that opens with one of these time words or phrases carries a comma after it (the unit's frames teach First, I) */
const OPENTIME = /^(First|Next|Then|Last|After that|Later|Finally|At recess|At lunch|After school|After lunch|In the morning|Each day|Every day|One day|Today|Yesterday|Soon|Now|At the end)\b(?!,)/;
/** the small words of a title (they may come back in small letters) */
const TITLESMALL = ['a', 'an', 'the', 'and', 'of', 'in', 'on', 'at', 'to', 'my', 'our', 'for', 'with', 'is', 'it', 'we', 'i'];
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(b) {
  const f = [];
  const banned = new Set(b.banned || []);
  const words = (s) => tok(s);
  const content = (s) => new Set(tok(s).filter((w) => w.length >= 4 && !['about', 'with', 'that', 'this', 'they', 'them', 'have', 'from', 'what', 'best', 'time', 'made', 'felt'].includes(w)).map(stem));
  const shares = (a, c) => { const B = content(c); return [...content(a)].filter((w) => B.has(w)); };
  const Sb = b.story || {}, P = Sb.prompts || [], St = Sb.stories || [], Md = Sb.models || [];
  // lesson 1: ideas, stories, models
  if (P.length < 8) f.push('story: fewer than eight ideas');
  P.forEach((p) => {
    if (words(p.text).some((w) => banned.has(w))) f.push(`story idea "${p.text}" names a pet, a family member, a trip, a party, or a holiday`);
    if ((p.notes || []).length !== 3 || p.notes.some((n) => !/^[a-z][a-z ]*$/.test(n))) f.push(`story idea "${p.text}": not three notes in small letters`);
    if ((p.e || []).length !== 3 || p.e.some((e) => !/^[a-z]/.test(e) || /[.?!]$/.test(e) || TIMEWORDS.test(e))) f.push(`story idea "${p.text}": not three events after "I" without a time word`);
    if (!(Sb.feelings || []).includes(p.felt) && p.felt !== 'brave') f.push(`story idea "${p.text}": the feeling "${p.felt}" is no feeling word of the page`);
    for (const lv of [1, 2, 3]) {
      if (!fitsRule(planParts(lv, p), 'room')) f.push(`story idea "${p.text}": the notes of level ${lv} do not fit their rows with room`);
      if (!fitsRule(draftParts(lv, p), 'spare')) f.push(`story idea "${p.text}": the draft of level ${lv} does not hold its sample with a row to spare`);
    }
  });
  const pTags = P.map((p) => p.key);
  if (St.length < 16) f.push('story: fewer than sixteen true stories');
  St.forEach((s) => {
    const n = storyWords(s); if (n < 25 || n > 40) f.push(`story "${s.title}" has ${n} words (25 to 40)`);
    if (s.alt !== undefined && !['Then', 'After that'].includes(s.alt)) f.push(`story "${s.title}": its time word for Next is not Then or After that`);
    if ((s.e || []).length !== 3 || s.e.some((e) => !/^[A-Z]/.test(e) || /[.?!]$/.test(e) || TIMEWORDS.test(e))) f.push(`story "${s.title}": not three events without a time word`);
    if (TIMEWORDS.test(s.end) || TIMEWORDS.test(s.extra) || !/[.!]$/.test(s.end)) f.push(`story "${s.title}": a time word in its ending or extra sentence, or no ending sentence`);
    if (s.e.some((e) => tok(e).join(' ') === tok(s.extra).join(' ')) || shares(s.extra, s.e.join(' ')).length > 2) f.push(`story "${s.title}": the sentence that did not happen is too near an event`);
    if (P.some((p) => shares(p.text, s.title + ' ' + s.e.join(' ')).filter((w) => !['school'].includes(w)).length)) f.push(`story "${s.title}" shares its topic with an idea (${P.filter((p) => shares(p.text, s.title + ' ' + s.e.join(' ')).length).map((p) => p.key)})`);
    if (s.e.some((e) => (cap(e) + '.').length > 46)) f.push(`story "${s.title}": an event is too long for one line of part 2`);
    { const L = s.e.map((e) => (cap(e) + '.').length); if (s.extra.length <= Math.min(...L) || s.extra.length >= Math.max(...L)) f.push(`story "${s.title}": the sentence that did not happen is the shortest or the longest of part 2 (found by length)`); }
  });
  if (Md.length < 16) f.push('story: fewer than sixteen tiny models');
  Md.forEach((m) => {
    if ((m.e || []).length !== 3 || m.e.some((e) => !/^[a-z]/.test(e) || TIMEWORDS.test(e))) f.push(`model "${m.key}": not three events after "I"`);
    if (pTags.includes(m.key) || P.some((p) => shares(p.text, m.e.join(' ')).length)) f.push(`model "${m.key}" shares a topic with an idea`);
    if (St.some((s) => s.key === m.key)) f.push(`model "${m.key}" is a story of day 1`);
  });
  // lesson 2: opinions and reasons
  const O = b.opinion || {}, Ot = O.topics || [], Op = O.prompts || [];
  if (Ot.length < 18) f.push('opinion: fewer than eighteen topics');
  const OK = new Set(Ot.map((t) => t.key));
  Ot.forEach((t) => {
    if (!/^[A-Z][^.]*\.$/.test(t.op3) || !/\b(best|cutest|coolest|prettiest|funniest|most fun)\b/.test(t.op3) || /^I (like|love|think)\b/.test(t.op3)) f.push(`opinion "${t.op3}" is not an opinion people can disagree with`);
    (t.rs || []).forEach((r) => { if (!/^(They|You|Their|Birds|Rabbits)\b/.test(r) || !/\.$/.test(r) || /\b(best|cutest|coolest|prettiest|funniest|fun|good|great|favorite|love|nice|pretty)\b/i.test(r)) f.push(`reason "${r}" is not a sentence that tells why, without an opinion word`); });
    if ((t.rs || []).length !== 2) f.push(`opinion "${t.key}" has not two reasons`);
    // an opinion with a narrow word (cutest, funniest ...) names the words of each reason that carry that word
    if (/\b(cutest|coolest|prettiest|funniest|most fun)\b/.test(t.op3) && ((t.carry || []).length !== 2 || t.carry.some((w, i) => !(t.rs[i] || '').includes(w)))) f.push(`opinion "${t.op3}": the words of its reasons that carry it are not named`);
    if ((t.judge || []).some((r) => r !== 0 && r !== 1) || (t.judge || []).length > 1) f.push(`opinion "${t.key}": its reasons for the sort are not one or two of its own`);
    Object.values(t.also || {}).flat().forEach((k) => { if (!OK.has(k)) f.push(`opinion "${t.key}": also names a topic that does not exist (${k})`); });
    if (shares(t.x, O.example.op).length) f.push(`opinion "${t.key}" is the example of the rule box`);
    if (Op.some((p) => shares(p.q + ' ' + p.y, t.x + ' ' + t.y).length)) f.push(`opinion "${t.key}" shares its topic with a question of day 2`);
    // the model of day 2, singular, in the frame's shape
    if (!/^[a-z][a-z ]+$/.test(t.ys || '') || !/^(the|a|an) [a-z ]+$/.test(t.xs || '') || !/^[a-z][a-z ]+$/.test(t.ms || '') || /\b(because|best)\b/.test(t.ms || '') || /s$/.test(t.ys || '')) f.push(`opinion "${t.key}": its model is not one thing said in the singular (the best ${t.ys}; ${t.xs}; because ${t.ms})`);
  });
  { const all = Ot.flatMap((t) => t.rs); if (new Set(all).size !== all.length) f.push('opinion: one reason stands under two topics'); }
  if (Op.length < 7) f.push('opinion: fewer than seven questions');
  Op.forEach((p) => {
    if (!/^What is the best [a-z ]+\?$/.test(p.q) || !p.q.includes(p.y)) f.push(`question "${p.q}" does not ask for the best ${p.y}`);
    if (words(p.q + ' ' + p.x + ' ' + p.why).some((w) => banned.has(w)) || /\b(homework|uniform|recess is too)\b/i.test(p.q)) f.push(`question "${p.q}" names a pet, a family member, or a school rule`);
    for (const lv of p.open === false ? [1, 2] : [1, 2, 3]) if (!fitsRule(opParts(lv, p), 'spare')) f.push(`question "${p.q}": the piece of level ${lv} does not hold its sample with a row to spare`);
    // the opinion's first two rows hold a real book title (TITLEMIN letters at a first grader's width)
    for (const lv of [1, 2]) { const ls = opParts(lv, p)[1].lines; if (freeOf(ls[0].w) + freeOf(ls[1].w) < TITLEMIN) f.push(`question "${p.q}": the opinion of level ${lv} holds fewer than ${TITLEMIN} letters for a title`); }
    if (p.also !== undefined && !/right\.$/.test(p.also)) f.push(`question "${p.q}": its note of what else is right does not end "right."`);
  });
  // lesson 3: facts
  const F = b.facts || {}, F1 = F.day1 || [], F2 = F.day2 || [], F3 = F.own || [];
  if (F1.length < 16 || F2.length < 15 || F3.length < 7) f.push('facts: fewer than sixteen fact files, fifteen fact boxes, or seven own topics');
  const about = (s, t) => tok(s).includes(t.noun.toLowerCase()) || tok(s).includes(t.one);
  F1.forEach((t) => {
    const all = [...t.file, ...t.about];
    if (t.file.length !== 3 || t.about.length < 4 || all.some((s) => !about(s, t) || !/^[A-Z].*\.$/.test(s))) f.push(`fact file "${t.key}": not three facts and four more about ${t.noun}`);
    if (new Set(all).size !== all.length) f.push(`fact file "${t.key}": a fact twice`);
    if (all.some((s) => /\b(all|always|only|never|every)\b/i.test(s))) f.push(`fact file "${t.key}": a fact says all, always, only, never, or every`);
    if (about(t.near, t) || F1.some((o) => o !== t && about(t.near, o))) f.push(`fact file "${t.key}": the sentence about a thing near it names an animal of the files`);
    if (!closingsOf(t.noun).includes(t.closing)) f.push(`fact file "${t.key}": its closing is not one of the three closings`);
    if (!t.about.includes(t.bang)) f.push(`fact file "${t.key}": the fact that stands among the endings is not one of its facts`);
    F1.forEach((o) => { if (o !== t && [...o.file, ...o.about].some((s) => about(s, t))) f.push(`fact file "${o.key}": a fact names ${t.noun} (a sentence to sort would be about two topics)`); });
    if (F2.some((u) => u.key === t.key) || F3.some((u) => shares(u.noun, t.noun).length)) f.push(`fact file "${t.key}" shares its topic with a topic of day 2`);
  });
  F2.forEach((t) => {
    if ((t.notes || []).length !== 3 || t.notes.some(([v]) => !(F.verbs || []).includes(v))) f.push(`fact box "${t.key}": not three notes with can, have, are, eat, or live`);
    for (const lv of [1, 2]) if (!fitsRule(factParts(lv, t), 'room')) f.push(`fact box "${t.key}": the page of level ${lv} does not hold its sample with room`);
    if (!fitsRule(labelParts(t.labels), 'room')) f.push(`fact box "${t.key}": a label does not fit its row with room`);
  });
  F3.forEach((t) => {
    if ((t.facts || []).length !== 3 || t.facts.some((s) => !/^[A-Z].*\.$/.test(s) || !tok(s).includes(tok(t.noun).pop()))) f.push(`own topic "${t.key}": not three facts that name the topic`);
    if (F1.some((u) => u.key === t.key || tok(u.noun).pop() === tok(t.noun).pop())) f.push(`own topic "${t.key}" is a topic of a fact file`);
    if (!fitsRule(factParts(3, t), 'room')) f.push(`own topic "${t.key}": the page of level 3 does not hold its sample with room`);
    if (!fitsRule(labelParts(t.labels), 'room')) f.push(`own topic "${t.key}": a label does not fit its row with room`);
  });
  // lesson 4: pieces to edit, worked examples
  const E = (b.edit || {}).pieces || [];
  if (E.length < 16) f.push('edit: fewer than sixteen pieces');
  E.forEach((p) => {
    const S = p.s || [], ty = (r) => S.filter((x) => x[r]).length;
    { const pf = paraFit(p); if (pf.n !== 3) f.push(`piece "${p.key}" takes ${pf.n} lines in its box, not 3`); else if (pf.last < PARALAST[0] || pf.last > PARALAST[1]) f.push(`piece "${p.key}": its last line is ${Math.round(pf.last)} px wide (${PARALAST[0]} to ${PARALAST[1]}, or it can wrap onto two or four lines)`); }
    if (S.length !== 5 || ty('i') !== 1 || ty('name') !== 1 || ty('detail') !== 1) f.push(`piece "${p.key}": not five sentences with one for i, one for a name, and one for a detail`);
    S.forEach((x) => {
      if (!/^[A-Z].*\.$/.test(x.t) || /[!?]/.test(x.t)) f.push(`piece "${p.key}": "${x.t}" is not a sentence with a capital and a period`);
      const ws = x.t.replace(/\.$/, '').split(' ');
      if (ws.slice(1).some((w) => w === 'i')) f.push(`piece "${p.key}": "${x.t}" holds a small i`);
      if ((x.cap || x.end) && (x.i || x.name || x.detail)) f.push(`piece "${p.key}": "${x.t}" carries two kinds of mistake`);
      if (x.cap && /^(I|[A-Z][a-z]+)\b/.test(x.t) && (ws[0] === 'I' || NAMES.test(ws[0]) || /^(Leo|Max|Nora|Lily|Zoe|Omar|Ana|Sam|Kim|Ben|Maya|Noah|Rosa|Jada)$/.test(ws[0]))) f.push(`piece "${p.key}": "${x.t}" starts with I or a name and cannot lose its capital alone`);
      // a sentence that opens with a time word carries its comma, as the unit's own frames teach (First, I): without it
      // a first grader finds a mistake nobody planted
      if ([x.t, x.a || ''].some((y) => OPENTIME.test(y))) f.push(`piece "${p.key}": "${x.t}" opens with a time word and no comma`);
      if (x.detail && /\b(you|your)\b/i.test(x.q || '')) f.push(`piece "${p.key}": the partner's question "${x.q}" speaks to the reader (you, your), not about the piece`);
      if (x.bang && !x.end) f.push(`piece "${p.key}": "${x.t}" may take ! but cannot lose its end mark`);
      if (x.i && (ws[0] === 'I' || ws.filter((w) => w === 'I').length !== 1)) f.push(`piece "${p.key}": "${x.t}" does not hold one I in the middle`);
      if (x.name && (ws[0] === x.name || ws.filter((w) => w === x.name).length !== 1 || S.filter((y) => y !== x && y.t.includes(x.name)).length)) f.push(`piece "${p.key}": the name ${x.name} does not stand once, in the middle of its sentence`);
      if (x.detail && (!/\?$/.test(x.q) || !x.a || tok(x.a).length <= tok(x.t).length || !tok(x.t).every((w) => tok(x.a).includes(w)) || !/right\.$/.test(x.also || ''))) f.push(`piece "${p.key}": the detail sentence has no question, no sample that adds to it, or no note of what else is right`);
      if (x.detail && [1, 2, 3].some((lv) => !fitsRule([detailPart(x, lv)], 'spare'))) f.push(`piece "${p.key}": the detail does not fit two rows with a row to spare`);
    });
    for (const lv of [1, 2, 3]) { try { editFaults(p, lv, makeRng('writing-g1|editcheck|' + p.key + '|' + lv)); } catch (e) { f.push(`piece "${p.key}": level ${lv} cannot place its mistakes`); } }
    // no word its title capitalizes comes back in small letters (a child would "fix" it: Show and Tell, Picture Day)
    { const tw = tok(p.title).filter((w) => !TITLESMALL.includes(w)), body = S.flatMap((x) => tok(x.t)); const back = tw.filter((w) => body.includes(w)); if (back.length) f.push(`piece "${p.key}": "${back.join(', ')}" of its title comes back in small letters`); }
  });
  // the places of the mistakes and of the star vary over the pieces (no place is learned from the bank)
  for (const r of ['i', 'name', 'detail']) { const at = E.map((p) => (p.s || []).findIndex((x) => x[r])); if (new Set(at).size < 3 || Math.max(...[0, 1, 2, 3, 4].map((k) => at.filter((a) => a === k).length)) > E.length / 3) f.push(`edit: the sentence for ${r} stands in too few places over the pieces (${at.join('')})`); }
  if (E.filter((p) => (p.s || []).some((x) => x.name && x.t.toLowerCase().includes('my friend ' + x.name.toLowerCase()))).length > E.length / 4) f.push('edit: too many names stand after "my friend"');
  const R = (b.revise || {}).examples || [];
  if (R.filter((x) => x.kind === 'detail').length < 10 || R.filter((x) => x.kind === 'mark').length < 5 || R.some((x) => x.a === x.b || !/\.$/.test(x.how))) f.push('revise: fewer than ten detail examples or five mark fixes, or one that does not change');
  ((b.revise || {}).samples || []).forEach((s) => { if (!P.some((p) => p.text === s.for) || !(b.revise.questions[s.qi])) f.push(`revise sample "${s.added}" names no idea of the unit or no question`); for (const lv of [1, 3]) if (!fitsRule(partnerParts(lv, s), 'spare')) f.push(`revise sample "${s.added}" does not fit its rows`); });
  // every model runs to two lines at most; the fact files too long for a model of day 2 are left out of its models
  (((b.story || {}).models) || []).forEach((m) => { if ([1, 2, 3].some((lv) => modelLines(draftModel(m, lv)) > 2)) f.push(`story model "${m.key}" runs to three lines`); });
  (((b.opinion || {}).topics) || []).forEach((t) => { if (modelLines(opModel(t), OPMODELW) > OPMODELLINES) f.push(`opinion "${t.key}": its model runs to more than ${OPMODELLINES} lines beside the box to draw in`); });
  // the notes model with a sentence, a topic and a story that are on no page of the unit
  { const pages = JSON.stringify({ s: b.story, o: b.opinion, f: b.facts, e: b.edit, r: b.revise }).toLowerCase(); ((b.modelOnly || {}).phrases || []).forEach((w) => { if (pages.includes(w.toLowerCase())) f.push(`the notes' model "${w}" stands on a page of the unit`); }); if (!((b.modelOnly || {}).phrases || []).length) f.push('no list of what the notes model'); }
  if ((((b.facts || {}).day1) || []).filter((t) => modelLines(factModel(t)) <= 2).length < 12) f.push('facts: fewer than twelve fact files give a model of two lines');
  // every level of every page can be drawn, and gives 14 different copies that share no more than three quarters
  if (!f.length) for (const mode of Object.keys(LEVELS)) for (const lv of [1, 2, 3]) {
    const ps = [];
    for (let s = 1; s <= 20; s++) { try { ps.push(plan(b, mode, lv, makeRng('writing-g1|' + mode + '|' + lv + '|' + s), s)); } catch (e) { f.push(`${mode} level ${lv} cannot be drawn: ${e.message}`); break; } }
    if (ps.length < 20) continue;
    const sig = ps.slice(0, 14).map((p) => p.list.join('|'));
    if (new Set(sig).size < 14) f.push(`${mode} level ${lv}: fewer than 14 different copies`);
    for (let i = 0; i < 14; i++) for (let j = i + 1; j < 14; j++) { const a = ps[i].list, c = new Set(ps[j].list); if (a.filter((x) => c.has(x)).length > 0.75 * Math.max(a.length, ps[j].list.length)) { f.push(`${mode} level ${lv}: copies ${i + 1} and ${j + 1} share more than three quarters`); i = 14; break; } }
    if (mode === 'factread') { const closeT = (p) => p.ends.find((e) => e.kind === 'close').t;
      const feats = { 'the only ending with !': (p) => /!$/.test(closeT(p)) && p.ends.filter((e) => /!$/.test(e.t)).length === 1, 'the longest ending': (p) => p.ends.every((e) => e.t.length <= closeT(p).length), 'the shortest ending': (p) => p.ends.every((e) => e.t.length >= closeT(p).length), 'the first ending': (p) => p.ends[0].kind === 'close', 'the last ending': (p) => p.ends[p.ends.length - 1].kind === 'close' };
      for (const [n, fn] of Object.entries(feats)) { const k = ps.filter(fn).length; if (k > (ps.length * 2) / 3) f.push(`factread level ${lv}: the closing is ${n} on ${k} of ${ps.length} copies (found without reading it)`); } }
    if (mode === 'opread') { const d = LEVELS.opread[lv], lf = ps.filter((p) => p.right[0] && p.right[0].of === p.left.length - 1).length; if (lf > (ps.length * 2) / 3) f.push(`opread level ${lv}: the last opinion goes to the first reason on ${lf} of ${ps.length} copies`); if (new Set(ps.map((p) => p.right.map((r) => r.of).join())).size < Math.min(3, matchCands(d.match, d.match + d.odd).length)) f.push(`opread level ${lv}: the lines of the matching follow fewer than three patterns`); }
    // the PAGE of the child (not only its items) differs over 14 copies
    if (HAS_PICTURE_CACHE) { const pg = ps.slice(0, 14).map((p) => render(p, false).join('')); if (new Set(pg).size < 14) f.push(`${mode} level ${lv}: fewer than 14 different pages for the child`); }
    if (mode === 'edit') { if (new Set(ps.map((p) => p.faults.cap + ',' + p.faults.end)).size < 2) f.push(`edit level ${lv}: the mistakes stand in one place over 20 copies`); }
  }
  return f;
}
function draftModel(m, lv) { return `First, I ${m.e[0]}. Next, I ${m.e[1]}. Last, I ${m.e[2]}. ${lv === 2 ? 'At the end, I' : 'I'} felt ${m.felt}.`; }

/* ------------------------------------------------------------------ the parts of a page */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks
/** an f before i, f, l, or t and a t before t get room of their own (text in tags and <svg> is left alone) */
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
/** the same room inside a writing row's svg text (a key's answer) */
const svgRoom = (html) => html.replace(/(<text\b[^>]*\bfont-size="([\d.]+)"[^>]*>)([^<]*)(<\/text>)/g, (m, open, fsz, body, close) => open + body.replace(/(?<=[ft])([iflt])/g, (c, x, k, s) => (/[ft]/.test(s[k - 1]) && (s[k - 1] === 'f' || c === 't') ? `<tspan dx="${(0.07 * +fsz).toFixed(2)}" data-lcs-fsep>${c}</tspan>` : c)) + close);
/** typographic apostrophes and quotation marks in the TEXT of a page (never in a tag or an attribute) */
function typo(html) {
  let out = '', i = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += text.replace(/'/g, '’').replace(/"/g, (m, k, s) => (k === 0 || /[\s([]/.test(s[k - 1]) ? '“' : '”'));
    i = j < 0 ? html.length : j;
  }
  return out;
}
const cream = (attrs, inner, pad = 7, gap = 6, more = '') => `<div ${attrs} data-lcs-card style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (k, html) => `<div data-lcs-label data-lcs-read style="font:700 ${LABEL}px/1.25 'Nunito',sans-serif;color:${T.ink}">${k ? `<span style="color:${T.teal}">${k}.</span> ` : ''}${html}</div>`;
const VARY = (q, more = '') => `<span data-lcs-vary${q ? ` data-lcs-varyfor="${A(q)}"` : ''} style="font:700 15px/1.2 'Nunito',sans-serif;color:${T.coral}">${esc(q ? sampleFor(q) : more ? `(Sample. ${more})` : '(Sample.)')}</span>`;
/** printed words that stand on a writing row's base rule beside it (Nunito, line-height 1: the baseline is 0.171 em above
 *  the box's foot) */
const onRow = (text, attrs) => `<span ${attrs} data-lcs-read style="flex:0 0 auto;padding-bottom:${Math.max(0, Math.round(ROW - BASE - 0.171 * LEADPX))}px;font:700 ${LEADPX}px/1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap">${esc(text)}</span>`;
/** a writing row of width w; the key's answer seated with the letter widths of the page font */
function rowHtml(w, answer) {
  const base = rowSvg(w, ROW);
  const svg = answer ? seatOnRow(base, answer, { fill: T.teal, em: (emOf(answer) / [...String(answer)].length) * 1.05 }) : base;
  return `<div data-lcs-line${answer ? ` data-lcs-answer="${A(answer)}"` : ''} style="flex:0 0 auto;line-height:0">${svg}</div>`;
}
/** a part the child writes in: its lines (printed words, the row, words after the row); on the key, the sample placed as a
 *  child writes it */
function partHtml(pt, key, more = '') {
  const texts = key ? place(pt.lines, pt.sents) : null;
  if (key && !texts) throw new Error(`writing-g1: the part ${pt.name} cannot hold its sample`);
  return `<div data-lcs-wpart="${pt.name}" data-lcs-expect="${A(pt.full)}" style="display:flex;flex-direction:column;gap:0;${more}">` +
    pt.lines.map((ln, i) => `<div data-lcs-wline${ln.lead ? ` data-lcs-lead="${A(ln.lead)}"` : ''}${ln.tail ? ` data-lcs-tail="${A(ln.tail)}"` : ''} style="display:flex;align-items:flex-end;gap:${GAPX}px">` +
      (ln.lead ? onRow(ln.lead, 'data-lcs-leadtext') : '') + rowHtml(ln.w, texts && texts[i] ? texts[i] : null) + (ln.tail ? onRow(ln.tail, 'data-lcs-tailtext') : '') + `</div>`).join('') + `</div>`;
}
const task = (attrs, k, line, inner, fit, pad = 7, gap = 6, more = '') => cream(`data-lcs-task="${attrs}"${fit ? ` data-lcs-fit="${fit}"` : ''}`, label(k, line) + inner, pad, gap, more);
const checkBox = (k = '') => `<span data-lcs-box${k ? ` data-lcs-boxfor="${k}"` : ''} style="box-sizing:border-box;flex:0 0 auto;display:inline-block;width:26px;height:26px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF"></span>`;
const CHECK = `<svg data-lcs-check width="22" height="22" viewBox="0 0 20 20" style="display:block"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const chip = (text, ok, key, attrs = '', px = OPT) => `<span ${attrs}${ok ? ' data-lcs-ok="1"' : ''} data-lcs-opt data-lcs-read style="flex:0 0 auto;display:inline-block;white-space:nowrap;font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink};padding:1px 10px;border:3px solid ${key && ok ? T.teal : T.creamDeep};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
/** a box to draw in: w wide; in a row of boxes it keeps its width, in a column it grows to fill the room (h at least) */
const drawBox = (w, h, grow = false) => `<div data-lcs-draw style="box-sizing:border-box;${grow ? `flex:1 1 auto;min-height:${h}px` : `flex:0 0 ${w}px;height:${h}px`};width:${w}px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF"></div>`;
/** the key's note that a part is a sample, on a line of its own (empty on the page of the child, so both keep one layout) */
const noteSlot = (key, q) => `<div data-lcs-noteslot style="min-height:17px;line-height:17px">${key ? VARY(q) : ''}</div>`;
const tickTable = (heads, rows, key, rowH) => {
  const head = `<div data-lcs-thead style="display:flex;align-items:flex-end;padding:0 10px"><span style="flex:1 1 auto"></span>${heads.map((c) => `<span data-lcs-col="${c}" style="flex:0 0 96px;text-align:center;font:800 18px/1.1 'Nunito',sans-serif;color:${T.teal}">${c}</span>`).join('')}</div>`;
  return head + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:2px">` + rows.map((x, i) => `<div data-lcs-item data-lcs-row="${x.kind}" data-lcs-text="${A(x.t)}" style="flex:1 1 auto;min-height:${rowH}px;box-sizing:border-box;display:flex;align-items:center;gap:6px;padding:2px 10px;border-radius:10px;background:#FFFFFF"><span style="flex:0 0 auto;min-width:24px;font:800 ${READ}px/1.25 'Nunito',sans-serif;color:${T.teal}">${i + 1}.</span><span data-lcs-read data-lcs-rtext style="flex:1 1 auto;min-width:0;font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x.t)}</span>` +
    heads.map((c, j) => `<span data-lcs-cell="${c}" style="flex:0 0 96px;display:flex;justify-content:center"><span data-lcs-tick="${j}" style="box-sizing:border-box;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF">${key && x.col === j ? CHECK : ''}</span></span>`).join('') + `</div>`).join('') + `</div>`;
};
const ruleBox = (title, rows) => `<div data-lcs-rulebox data-lcs-card style="display:flex;flex-direction:column;gap:1px;padding:3px 14px 4px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">${title ? `<div data-lcs-boxtitle data-lcs-read style="font:700 21px/1.2 'Baloo 2',cursive;color:${T.teal}">${esc(title)}</div>` : ''}` + rows.map((r) => `<div data-lcs-ruletext data-lcs-read style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">${r}</div>`).join('') + `</div>`;
const img = (pic, size, key2) => `<img class="ws-icon" data-lcs-pic="${A(key2)}" src="${fileUri(pic[0], pic[1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const wordBank = (list, title = 'Word bank:') => `<div data-lcs-wordbank style="display:flex;flex-wrap:wrap;align-items:center;gap:2px 10px;padding:2px 10px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF"><span style="font:800 18px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(title)}</span>${list.map((w) => `<span data-lcs-bankword data-lcs-read style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</span>`).join('')}</div>`;
const model = (k, text, bg = T.cream) => `<div data-lcs-model="${k}" data-lcs-card style="padding:4px 14px;border-radius:14px;background:${bg}"><div data-lcs-read data-lcs-mtext style="font:700 19px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">Model:</b> ${esc(text)}</div></div>`;
const rowsBox = (parts, key, more = '', partMore = '') => `<div data-lcs-rows style="display:flex;flex-direction:column;gap:0;${more}">${parts.map((pt) => partHtml(pt, key, partMore)).join('')}</div>`;
/** a check list of things a first grader can see, under the rows of a draft (an item of G1-623 carries its icon) */
const checkStrip = (items, stacked = false) => `<div data-lcs-checkstrip style="display:flex;${stacked ? `flex:0 0 ${SPARECHECKW}px;box-sizing:border-box;flex-direction:column;align-items:flex-start;gap:2px` : 'flex-wrap:wrap;align-items:center;gap:2px 14px'};padding:3px 10px;border-radius:10px;background:#FFFFFF"><span data-lcs-read style="font:800 19px/1.25 'Nunito',sans-serif;color:${T.teal}">Check:</span>` +
  items.map((t) => `<span data-lcs-checkrow="${A(t)}" style="display:flex;align-items:center;gap:6px">${checkBox()}${ICONOF[t] ? `<span data-lcs-icon="${A(ICONOF[t])}" style="box-sizing:border-box;flex:0 0 auto;height:26px;padding:0 6px;display:flex;align-items:center;border-radius:6px;background:${T.tealSoft};font:800 17px/1 'Nunito',sans-serif;color:${T.teal}">${esc(ICONOF[t])}</span>` : ''}<span data-lcs-read style="font:700 19px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span></span>`).join('') + `</div>`;

/* ------------------------------------------------------------------ the blocks of each page */
function render(P, key) {
  const b = [], lv = P.lv;
  if (P.mode === 'storyplan') {
    const d = LEVELS.storyplan[lv], s = P.s, tw = timeWords(s, lv);
    // the key's ring holds the time word AND its comma; on the page of the child it takes no room (no gap before the comma, no
    // wider gap around the word: RING = padding + border, given back by the margins); on the key it keeps 3 px from its neighbours
    const ev = (k) => `<span data-lcs-twring style="display:inline-block;margin:0 ${key ? 3 : -RING}px 0 ${key && k ? 3 : -RING}px;padding:0 1px;border:2.5px solid ${key ? T.teal : 'transparent'};border-radius:999px;line-height:1.1"><span data-lcs-tw="${tw[k]}">${tw[k]}</span>,</span> ${esc(lc1(s.e[k]))}.`;
    const text = `${ev(0)} ${ev(1)} ${ev(2)} <span data-lcs-ending style="${key && d.ending ? `text-decoration:underline;text-decoration-color:${T.teal};text-decoration-thickness:3px;text-underline-offset:4px;` : ''}">${esc(s.end)}</span>`;
    const story = `<div data-lcs-story="${s.key}" style="padding:2px 14px 4px;border-radius:12px;background:#FFFFFF"><div data-lcs-stitle data-lcs-read style="font:700 21px/1.2 'Baloo 2',cursive;color:${T.teal}">${esc(s.title)}</div><div data-lcs-stext data-lcs-read data-lcs-even style="font:700 19px/1.4 'Nunito',sans-serif;color:${T.ink}">${text}</div></div>`;
    const order = `<div style="display:flex;flex-direction:column;gap:3px">` + P.rows.map((x) => `<div data-lcs-item data-lcs-orow="${x.n}" style="display:flex;align-items:center;gap:12px;padding:1px 10px;border-radius:10px;background:#FFFFFF"><span data-lcs-numbox style="box-sizing:border-box;flex:0 0 38px;width:38px;height:36px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF;font:800 23px/1 'Nunito',sans-serif;color:${T.teal}">${key ? (x.n ? x.n : 'X') : ''}</span><span data-lcs-read data-lcs-otext style="font:700 19px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x.t)}</span></div>`).join('') + `</div>`;
    b.push(cream('data-lcs-task="story"', label(1, LINES.story[lv]) + story + label(2, LINES.order[lv]) + order, 6, 4));
    const sp = P.ideas[P.sampleAt], parts = planParts(lv, sp);
    const ideas = `<div data-lcs-ideas style="display:flex;flex-wrap:wrap;gap:4px 10px">${P.ideas.map((x, i) => chip(x.text, i === P.sampleAt, key, `data-lcs-idea="${x.key}"`)).join('')}${chip('My own idea', false, key, 'data-lcs-idea="own"')}</div>`;
    const feel = `<div data-lcs-feel style="box-sizing:border-box;flex:0 0 ${DRAWW}px;width:${DRAWW}px;min-height:${ROW}px;display:grid;grid-template-columns:1fr 1fr;align-content:center;gap:0 6px;padding:2px 8px;border:2.5px solid ${T.teal};border-radius:12px;background:#FFFFFF">${BANK.story.feelings.slice(0, 6).map((w) => `<span data-lcs-feelword data-lcs-read style="font:700 19px/1.25 'Nunito',sans-serif;color:${T.ink}">${w}</span>`).join('')}</div>`;
    // a band: its name, a box to draw in (the bands share the card's height), the row for a few words in its middle
    const band = (k) => `<div data-lcs-item data-lcs-band="${BANDS[k]}" style="flex:1 1 0;display:flex;align-items:stretch;gap:${GAPX}px">` +
      `<span data-lcs-bandchip data-lcs-read style="box-sizing:border-box;flex:0 0 ${CHIPW}px;width:${CHIPW}px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:${T.teal};color:#FFFFFF;font:700 21px/1.1 'Baloo 2',cursive;text-align:center">${BANDS[k]}</span>` +
      (k === 3 && d.end === 'feel' ? feel : `<div data-lcs-draw style="box-sizing:border-box;flex:0 0 ${DRAWW}px;width:${DRAWW}px;min-height:${ROW}px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF"></div>`) + partHtml(parts[k], key, 'justify-content:center') + `</div>`;
    b.push(task('plan', 3, LINES.plan + (key ? ' ' + VARY('') : ''), ideas + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:3px">${[0, 1, 2, 3].map(band).join('')}</div>`, 'room', 6, 4, 'flex:1 1 auto'));
  }
  if (P.mode === 'storydraft') {
    const m = P.m, parts = draftParts(lv, P.p);
    b.push(model(m.key, draftModel(m, lv)));
    // the rows spread over the card (no band under the last one); the check list under them
    const inner = (lv === 3 ? wordBank(BANK.story.wordBank) : '') + rowsBox(parts, key, 'flex:1 1 auto;justify-content:space-between', lv === 3 ? 'flex:1 1 auto;justify-content:space-between' : '') + checkStrip(DRAFTCHECK[lv]) + noteSlot(key, P.p.text);
    b.push(task('draft', 1, LINES.draft, inner, 'spare', 5, 3, 'flex:1 1 auto'));
  }
  if (P.mode === 'opread') {
    const d = LEVELS.opread[lv], E = BANK.opinion.example;
    b.push(ruleBox('', [`<b style="color:${T.teal}">${OPRULE[0]}</b> ${esc(E.op)}`, `<b style="color:${T.teal}">${OPRULE[1]}</b> ${esc(E.r)}`]));
    b.push(task('kind', 1, LINES.kind[lv], tickTable(['opinion', 'reason'], P.kind.map((x) => ({ ...x, col: x.kind === 'opinion' ? 0 : 1 })), key, 30), '', 6, 3, 'flex:1 1 auto'));
    // the matching: rows of a fixed height, so the key's lines run from dot to dot
    const MH = MATCHH, LW = 340, GW = 64, RW = INNER - LW - GW, n = Math.max(P.left.length, P.right.length);
    const dot = (side) => `<span data-lcs-dot="${side}" style="position:absolute;${side === 'l' ? 'right:-18px' : 'left:-18px'};top:50%;margin-top:-7px;width:14px;height:14px;border-radius:50%;background:${T.ink}"></span>`;
    // the key crosses the extra reason out through its words (a bar across the cell fell between the two lines of a long reason)
    const cell = (t, side, extra = '', strike = false) => `<div data-lcs-mcell="${side}" ${extra} style="position:relative;box-sizing:border-box;height:${MH - 4}px;margin:2px 0;display:flex;align-items:center;padding:0 10px;border-radius:10px;background:#FFFFFF"><span data-lcs-read data-lcs-mtext${strike ? ' data-lcs-strike' : ''} style="font:700 19px/1.15 'Nunito',sans-serif;color:${T.ink}${strike ? `;text-decoration:line-through;text-decoration-color:${T.teal};text-decoration-thickness:3px` : ''}">${esc(t)}</span>${dot(side)}</div>`;
    const lines = key ? `<svg data-lcs-mlines width="${GW}" height="${n * MH}" style="position:absolute;left:${LW}px;top:0;overflow:visible">${P.left.map((x, i) => { const j = P.right.findIndex((r) => r.of === i); return `<line x1="11" y1="${i * MH + MH / 2}" x2="${GW - 11}" y2="${j * MH + MH / 2}" stroke="${T.teal}" stroke-width="3.5" stroke-linecap="round"/>`; }).join('')}</svg>` : '';
    const strike = (x) => key && x.of < 0;
    const match = `<div data-lcs-match style="position:relative;display:flex;gap:${GW}px;height:${n * MH}px"><div style="flex:0 0 ${LW}px;width:${LW}px;display:flex;flex-direction:column">${P.left.map((x) => cell(x.t, 'l', `data-lcs-op="${x.key}"`)).join('')}</div>` +
      `<div style="flex:0 0 ${RW}px;width:${RW}px;display:flex;flex-direction:column">${P.right.map((x) => cell(x.t, 'r', `data-lcs-reason="${x.key}" data-lcs-of="${x.of}"`, strike(x))).join('')}</div>${lines}</div>`;
    b.push(task('match', 2, LINES.match[lv], match, '', 6, 3));
    // because: the key's ring takes no room (the same gaps on the page of the child)
    const bec = P.bec.map((x, i) => { const t = BANK.opinion.topics.find((y) => y.key === x.key), full = becauseOf(t, x.r, d.think), [a, c] = full.split(' because ');
      return `<div data-lcs-item data-lcs-bec="${x.key}" style="padding:1px 10px;border-radius:10px;background:#FFFFFF"><span data-lcs-read data-lcs-even style="font:700 19px/1.4 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal};font-weight:800">${i + 1}.</span> ${esc(a)} <span data-lcs-because style="display:inline-block;margin:0 ${key ? 3 : -RING}px;padding:0 1px;border:2.5px solid ${key ? T.teal : 'transparent'};border-radius:999px;line-height:1.15">because</span> <span data-lcs-breason style="${key && d.under ? `text-decoration:underline;text-decoration-color:${T.teal};text-decoration-thickness:3px;text-underline-offset:4px;` : ''}">${esc(c)}</span></span></div>`; }).join('');
    b.push(task('because', 3, LINES.because[lv], `<div style="display:flex;flex-direction:column;gap:3px">${bec}</div>`, '', 6, 3));
  }
  if (P.mode === 'opwrite') {
    const d = LEVELS.opwrite[lv], sp = P.qs[P.sampleAt], parts = opParts(lv, sp);
    // the questions to circle, and on levels 1 and 2 the model under them (beside the box to draw in)
    const left = `<div data-lcs-qcol style="flex:1 1 auto;display:flex;flex-direction:column;gap:6px;justify-content:center">${P.qs.map((x, i) => chip(x.q, i === P.sampleAt, key, `data-lcs-q="${x.key}"`, OPT - 1)).join('')}${P.model ? model(P.model.key, opModel(P.model), '#FFFFFF') : ''}</div>`;
    b.push(task('choose', 1, LINES.choose + (key ? ' ' + VARY('') : ''), `<div style="flex:1 1 auto;display:flex;gap:12px;align-items:stretch">${left}<div style="flex:0 0 250px;display:flex;flex-direction:column">${drawBox(250, 90, true)}</div></div>`, '', 6, 4, 'flex:1 1 auto'));
    b.push(task('write', 2, LINES.opdraft + (key ? ' ' + VARY('', sp.also || '') : ''), (d.help === 'open' ? wordBank(BANK.opinion.wordBank) : '') + rowsBox(parts, key) + checkStrip(OPCHECK), 'spare', 6, 3));
  }
  if (P.mode === 'factread') {
    const d = LEVELS.factread[lv], t = P.t;
    const tw = INNER - 28 - 112 - 16, topicPart = mkPart('topic', tw, [{ lead: 'Topic:' }], [{ at: 0, text: t.noun }], 'Topic: ' + t.noun);
    b.push(task('file', 1, LINES.file, `<div data-lcs-file="${t.key}" style="display:flex;gap:16px;align-items:center;padding:2px 14px 4px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">${img(t.pic, 112, t.key)}<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:1px">${partHtml(topicPart, key)}${t.file.map((x) => `<div data-lcs-fact data-lcs-read style="font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink}">• ${esc(x)}</div>`).join('')}</div></div>`, 'room', 6, 4));
    b.push(task('sort', 2, LINES.sort, tickTable(['yes', 'no'], P.sort.map((x) => ({ ...x, col: x.kind === 'yes' ? 0 : 1 })), key, 40), '', 6, 3, 'flex:1 1 auto'));
    b.push(task('close', 3, LINES.close, `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:5px">${P.ends.map((e) => chip(e.t, e.kind === 'close', key, `data-lcs-end="${e.kind}"`)).join('')}</div>`, '', 6, 4));
  }
  if (P.mode === 'factwrite') {
    const t = lv === 3 ? P.qs[P.sampleAt] : P.t, parts = factParts(lv, t), labs = labelParts(t.labels);
    // level 1: the notes with their verbs (the frames print the verb too); level 2: the notes alone and the verbs to use
    const note = ([v, n]) => (lv === 1 ? `• <b>${esc(v)}</b> ${esc(n)}` : `• ${esc(n)}`);
    const left = lv === 3
      ? `<div data-lcs-ownbox style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;gap:8px"><div data-lcs-own style="display:flex;flex-wrap:wrap;gap:6px 10px">${P.qs.map((x, i) => chip(x.noun, i === P.sampleAt, key, `data-lcs-ownq="${x.key}"`)).join('')}${chip('My own idea', false, key, 'data-lcs-ownq="own"')}</div>${wordBank(['This is all about', ...BANK.facts.ownVerbs, 'Now you know about'])}</div>`
      : `<div data-lcs-factbox="${t.key}" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;gap:2px;padding:3px 12px;border:2.5px solid ${T.teal};border-radius:12px;background:#FFFFFF"><div style="display:flex;align-items:center;gap:10px">${img(t.pic, FBPIC, t.key)}<div data-lcs-fbtitle data-lcs-read style="font:700 22px/1.15 'Baloo 2',cursive;color:${T.teal}">Fact box: ${esc(t.noun)}</div></div><div style="display:flex;flex-direction:column;gap:0">${t.notes.map(([v, n]) => `<div data-lcs-note="${A(lv === 1 ? v + ' ' + n : n)}" data-lcs-read style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink}">${note([v, n])}</div>`).join('')}${lv === 2 ? `<div data-lcs-verbs data-lcs-read style="font:700 19px/1.25 'Nunito',sans-serif;color:${T.teal}">Use: ${BANK.facts.verbs.join(', ')}</div>` : ''}</div></div>`;
    const right = `<div data-lcs-picbox style="flex:0 0 ${PICW}px;width:${PICW}px;display:flex;flex-direction:column;gap:2px">${drawBox(PICW, 90, true)}<div data-lcs-labels style="display:flex;gap:${GAPX}px">${labs.map((pt) => partHtml(pt, key)).join('')}</div></div>`;
    b.push(task('box', 1, LINES.factbox[lv] + (key ? ' ' + VARY('') : ''), `<div style="flex:1 1 auto;display:flex;gap:12px;align-items:stretch">${left}${right}</div>`, 'room', 6, 4, 'flex:1 1 auto'));
    if (P.model) b.push(model(P.model.key, factModel(P.model)));
    // the check list under the rows (levels 1, 2); on level 3 beside the fourth row, the one to spare (no room under the rows)
    const rowsHtml = lv === 3 ? `<div data-lcs-rows style="display:flex;flex-direction:column;gap:0">${parts.map((pt) => (pt.name === 'spare' ? `<div style="display:flex;align-items:center;gap:12px">${partHtml(pt, key)}${checkStrip(FACTCHECK, true)}</div>` : partHtml(pt, key))).join('')}</div>` : rowsBox(parts, key) + checkStrip(FACTCHECK);
    b.push(task('write', 2, LINES.factdraft + (key ? ' ' + VARY(lv === 3 ? t.noun : '') : ''), rowsHtml, 'room', 6, 3));
  }
  if (P.mode === 'edit') {
    const d = LEVELS.edit[lv], F = P.faults, S = P.p.s;
    b.push(ruleBox(`Find and fix ${d.faults.length} mistakes`, d.faults.map((k) => esc(FIXROWS[k]))));
    // the key writes a capital above its word (MARKPX, clear of the line above) and draws the added end mark large
    const mark = (ch) => (key ? `<span data-lcs-fixmark style="position:absolute;left:-1px;top:-0.95em;font:800 ${MARKPX}px/1 'Nunito',sans-serif;color:${T.teal}">${ch}</span>` : '');
    const html = S.map((x, i) => {
      const t = x.t; let h;
      if (i === F.cap) h = `<span data-lcs-fault="cap" data-lcs-fix="${t[0]}" style="position:relative">${t[0].toLowerCase()}${mark(t[0])}</span>${esc(t.slice(1))}`;
      else if (i === F.i) { const k = t.indexOf(' I '); h = `${esc(t.slice(0, k + 1))}<span data-lcs-fault="i" data-lcs-fix="I" style="position:relative">i${mark('I')}</span>${esc(t.slice(k + 2))}`; }
      else if (i === F.name) { const k = t.indexOf(x.name); h = `${esc(t.slice(0, k))}<span data-lcs-fault="name" data-lcs-fix="${x.name[0]}" style="position:relative">${x.name[0].toLowerCase()}${mark(x.name[0])}</span>${esc(t.slice(k + 1))}`; }
      else h = esc(t);
      if (i === F.end) h = h.replace(/\.$/, '') + `<span data-lcs-fault="end" style="position:relative">${key ? `<span data-lcs-fixmark style="font:800 ${ENDPX}px/0 'Nunito',sans-serif;color:${T.teal}">.</span>${x.bang ? `<span data-lcs-orbang style="position:absolute;left:50%;transform:translateX(-50%);top:-1.45em;font:800 16px/1 'Nunito',sans-serif;color:${T.teal};white-space:nowrap">or !</span>` : ''}` : ''}</span>`;
      return `<span data-lcs-esent="${i}"${x.detail ? ' data-lcs-detail="1"' : ''}>${x.detail ? `<span data-lcs-star style="color:${T.coral}">★</span> ` : ''}${h}</span>`;
    }).join(' ');
    b.push(task('edit', 1, LINES.edit.replace('{N}', ['', '', 'two', 'three', 'four'][d.faults.length]), `<div data-lcs-piece="${P.p.key}" style="padding:2px 14px ${PIECEPADB[lv]}px;border-radius:12px;background:#FFFFFF"><div data-lcs-ptitle data-lcs-read style="font:700 22px/1.3 'Baloo 2',cursive;color:${T.teal}">${esc(P.p.title)}</div><div data-lcs-para data-lcs-read data-lcs-even style="padding-top:${PARATOP}px;font:700 22px/${PARALH[lv]} 'Nunito',sans-serif;color:${T.ink}">${html}</div></div>`, '', 6, 5));
    const det = S.find((x) => x.detail);
    b.push(task('detail', 2, LINES.detail + (key ? ' ' + VARY('', det.also) : ''), `<div style="display:flex;align-items:center;gap:12px"><div data-lcs-asked data-lcs-read style="flex:0 0 auto;padding:3px 14px;border:2.5px solid ${T.teal};border-radius:18px;background:#FFFFFF;font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">${esc(ASKED)}</b> ${esc(det.q)}</div></div>` + `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly">${partHtml(detailPart(det, lv), key, 'flex:1 1 auto;justify-content:space-evenly')}</div>`, 'spare', 6, 3, 'flex:1 1 auto'));
  }
  if (P.mode === 'revise') {
    const s = P.s;
    b.push(ruleBox('How writers revise and edit', P.ex.map((x) => `<span data-lcs-rev="${A(x.b)}"><b style="color:${T.teal}">Before:</b> ${esc(x.b)} <b style="color:${T.teal}">After:</b> ${esc(x.a)} <i>(${esc(x.how)})</i></span>`)));
    // 1. the partner's question and the detail the child adds to the draft; 2. then the check list (I added a detail is true)
    const parts = partnerParts(lv, s);
    const qchips = `<div data-lcs-pqs style="display:flex;flex-wrap:wrap;gap:4px 10px">${BANK.revise.questions.map((q, i) => chip(q, i === s.qi, key, `data-lcs-pq="${i}"`)).join('')}${chip(OTHERQ, false, key, 'data-lcs-pq="other"')}</div>`;
    b.push(task('partner', 1, LINES.partner[lv], noteSlot(key, s.for) + qchips + rowsBox(parts, key), 'spare', 6, 3));
    const rows = REVLEVEL[lv].map((k) => REVCHECK[k]);
    const head = `<div data-lcs-thead style="display:flex;align-items:flex-end;padding:0 10px"><span style="flex:1 1 auto"></span>${['Me', 'Partner'].map((c) => `<span data-lcs-col="${c}" style="flex:0 0 92px;text-align:center;font:800 18px/1.1 'Nunito',sans-serif;color:${T.teal}">${c}</span>`).join('')}</div>`;
    b.push(task('check', 2, LINES.check, head + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:3px">${rows.map(([ic, t]) => `<div data-lcs-item data-lcs-checkrow="${A(t)}" style="flex:1 1 auto;min-height:34px;display:flex;align-items:center;gap:10px;padding:1px 10px;border-radius:10px;background:#FFFFFF"><span data-lcs-icon="${A(ic)}" style="box-sizing:border-box;flex:0 0 50px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:${T.tealSoft};font:800 21px/1 'Nunito',sans-serif;color:${T.teal}">${esc(ic)}</span><span data-lcs-read style="flex:1 1 auto;min-width:0;font:700 ${READ}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span>${['Me', 'Partner'].map((c) => `<span data-lcs-cell="${c}" style="flex:0 0 92px;display:flex;justify-content:center">${checkBox(c)}</span>`).join('')}</div>`).join('')}</div>`, '', 6, 4, 'flex:1 1 auto'));
  }
  return b;
}

/** verify()'s OWN copy of every text a page must print and every measure it is held to */
const SPEC = {
  INSTR: {
    storyplan: { 1: 'A true story tells what happened first, next, and last.', 2: 'Time words like first, next, and last tell the order of a story.', 3: 'A true story tells what happened in order and how it ended.' },
    storydraft: { 1: 'Use your plan. Tell what happened first, next, and last.', 2: 'Use your plan and the time words to write your true story.', 3: 'Write your story in order. Then tell how it ended.' },
    opread: { 1: 'An opinion tells what you think. A reason tells why.', 2: 'An opinion tells what you think. A reason tells why you think so.', 3: 'A reason tells why you think so. It must fit its opinion.' },
    opwrite: { 1: 'Tell what you think. Then tell why.', 2: 'Name your topic, tell what you think and why, and end your piece.', 3: 'Write your topic, your opinion, a reason, and an ending.' },
    factread: { 1: 'A fact is something true. Every fact in a piece tells about its topic.', 2: 'Every fact tells about the topic. A closing sentence ends the piece.', 3: 'Keep to the topic. A closing sentence ends the piece.' },
    factwrite: { 1: 'Write facts about the topic. Use the fact box.', 2: 'Name your topic, write facts about it, and end with a closing.', 3: 'Write about a topic you know: facts and a closing.' },
    edit: { 1: 'Writers read their work again and fix mistakes.', 2: 'Writers fix capitals and end marks, and they add details.', 3: 'Edit like a writer: capitals, end marks, and a detail.' },
    revise: { 1: 'Add the detail your partner asked for. Then check your writing.', 2: 'Answer your partner with a detail. Then check your writing together.', 3: 'Answer your partner, add a detail, and check your writing.' },
  },
  TASK: {
    story: { 1: 'Read the story with your teacher. Circle First, Next, and Last.', 2: 'Read the story. Circle the time words. Underline the ending.', 3: 'Read the story. Circle the time words. Underline the ending.' },
    order: { 1: 'Write 1, 2, or 3 in each box to show the order.', 2: 'Write 1, 2, or 3 in each box to show the order.', 3: 'Write 1, 2, or 3. One is not in the story: put an X in its box.' },
    plan: 'Circle an idea. Draw and write a few words in each box.',
    draft: 'Write your story. Then check the boxes that are true.',
    kind: { 1: 'Read each sentence with your teacher. Put a check mark under opinion or reason.', 2: 'Read each sentence. Put a check mark under opinion or reason.', 3: 'Read each sentence. Put a check mark under opinion or reason.' },
    match: { 1: 'Draw a line from each opinion to its reason.', 2: 'Draw a line from each opinion to its reason.', 3: 'Draw a line to match each pair. Cross out the extra reason.' },
    because: { 1: 'Read each sentence. Circle the word because.', 2: 'Read each sentence. Circle because. Underline the reason after it.', 3: 'Read each sentence. Circle because. Underline the reason after it.' },
    choose: 'Circle one question. Draw your answer in the box.', opdraft: 'Write your opinion about the question you circled.',
    file: 'Read the fact file with your teacher. Write its topic on the line.', sort: 'Read each sentence. Is it about the topic? Put a check mark under yes or no.', close: 'Which sentence is a closing? Circle it.',
    factbox: { 1: 'Read the fact box. Draw the topic. Write two labels.', 2: 'Read the fact box. Draw the topic. Write two labels.', 3: 'Circle a topic or use your own. Draw it. Write two labels.' }, factdraft: 'Write your All About page.',
    edit: 'Read the story by a first grader. Find and fix the {N} mistakes.', detail: 'Write the star sentence again with a detail.',
    check: 'Check your writing in the Me boxes. Then your partner checks it.',
    partner: { 1: 'Circle the question your partner asked. Add the detail to your draft and write it here.', 2: 'Circle the question your partner asked. Add the detail to your draft and write it here.', 3: 'Circle the question your partner asked. Add the detail to your draft and write it here. Write what your partner liked.' },
  },
  TW: ['First', 'Next', 'Last'], ALT: ['Then', 'After that'], BANDS: ['First', 'Next', 'Last', 'The end'],
  STORYLEAD: { 1: ['First, I', 'Next, I', 'Last, I', 'I felt'], 2: ['First,', 'Next,', 'Last,', 'At the end,'] },
  DRAFTCHECK: { 1: ['Each sentence ends with an end mark.', 'I wrote how I felt.'], 2: ['Each sentence ends with an end mark.', 'I wrote how it ended.'], 3: ['Each sentence starts with a capital.', 'Each sentence ends with an end mark.', 'I used time words.', 'I wrote how it ended.'] },
  OPCHECK: ['I wrote because.', 'I wrote an ending.', 'Each sentence ends with an end mark.'],
  FACTCHECK: ['Each fact tells about my topic.', 'I wrote a closing.'],
  ICONOF: { 'Each sentence ends with an end mark.': '.?!', 'Each sentence starts with a capital.': 'Aa' },
  OPRULE: ['An opinion tells what you think:', 'A reason tells why:'],
  OPLEAD: { 1: ['This is about the best', 'I think', 'because', 'That is why I pick'], 2: ['This is about the best', 'I think', 'because', 'That is why'] }, OPTAIL: 'is the best',
  FACTLEAD: { topic: 'This is all about', close1: 'Now you know about' },
  CLOSINGS: ['That is all about', 'Now you know about', 'I hope you learned a lot about'],
  FIXROWS: { cap: 'A sentence starts with a small letter. Write the capital letter above it.', end: 'A sentence has no end mark. Add the end mark.', i: 'The word I is a small i. Write a capital I above it.', name: 'A name starts with a small letter. Write the capital letter above it.' },
  ASKED: "The writer's partner asked:", ORBANG: 'or !',
  REVCHECK: [['Aa', 'Each sentence starts with a capital letter.'], ['.?!', 'Each sentence ends with an end mark.'], ['I', 'I and names start with a capital letter.'], ['+', 'I added a detail.']], REVLEVEL: { 1: [0, 1, 3], 2: [0, 1, 2, 3], 3: [0, 1, 2, 3] },
  OTHERQ: 'Other: ________',
  LV: {
    storyplan: { 1: { extra: 0, named: true, ending: false, end: 'feel' }, 2: { extra: 0, named: false, ending: true, end: 'draw' }, 3: { extra: 1, named: false, ending: true, end: 'open' } },
    storydraft: { 1: [2, 2, 2, 1], 2: [2, 2, 2, 1], 3: [6] },
    opread: { 1: { kind: 2, match: 3, odd: 0, think: true, under: false, bare: 0, nounReason: 0 }, 2: { kind: 3, match: 4, odd: 0, think: true, under: true, bare: 1, nounReason: 0 }, 3: { kind: 3, match: 4, odd: 1, think: false, under: true, bare: 0, nounReason: 1 } },
    opwrite: { 1: [1, 3, 1], 2: [1, 3, 1], 3: [6] }, opmodel: { 1: true, 2: true, 3: false },
    factread: { 1: { about: 2, not: 2, near: 0, ends: 2, bang: false }, 2: { about: 3, not: 3, near: 0, ends: 3, bang: true }, 3: { about: 3, not: 3, near: 1, ends: 3, bang: true } },
    factmodel: { 1: true, 2: true, 3: false },
    edit: { 1: ['cap', 'end'], 2: ['cap', 'end', 'i'], 3: ['cap', 'end', 'i', 'name'] },
    revise: { 1: false, 2: false, 3: true },
  },
  VARY: { storyplan: 1, storydraft: 1, opread: 0, opwrite: 2, factread: 0, factwrite: 2, edit: 1, revise: 1 },
  ROW: 89, CHILD: 27, PAD: 6, ROOM: 3, LABELROOM: 1, BAND: 40, READ: 19, LABEL: 19, OPT: 20, PIC: 60, FILL: 0.8, WMIN: 25, WMAX: 40, DETAILROWS: { 1: 3, 2: 3, 3: 3 }, PARALINES: 3, MODELLINES: { opwrite: 4, other: 2 }, MARKTOL: 6, TITLEMIN: 24, GAPTOL: 1.5, MARKMIN: 26, ENDMIN: 30, TITLESMALL: ['a', 'an', 'the', 'and', 'of', 'in', 'on', 'at', 'to', 'my', 'our', 'for', 'with', 'is', 'it', 'we', 'i'],
  TIMEWORDS: 'first|next|last|then|after|before|soon|later|finally|now|once|when|while|until|again|today|yesterday|tomorrow',
};

function makeWritingG1Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('writing-g1: unknown mode ' + mode);
  const B = BANK;
  const INFO = {
    stories: Object.fromEntries(B.story.stories.map((s) => [s.key, s])), prompts: Object.fromEntries(B.story.prompts.map((p) => [p.key, p])), promptByText: Object.fromEntries(B.story.prompts.map((p) => [p.text, p])),
    models: Object.fromEntries(B.story.models.map((m) => [m.key, m])), feelings: B.story.feelings, storyBank: B.story.wordBank,
    optopics: Object.fromEntries(B.opinion.topics.map((t) => [t.key, t])), opexample: B.opinion.example, opprompts: Object.fromEntries(B.opinion.prompts.map((p) => [p.key, p])), opBank: B.opinion.wordBank,
    facts1: Object.fromEntries(B.facts.day1.map((t) => [t.key, t])), facts2: Object.fromEntries(B.facts.day2.map((t) => [t.key, t])), facts3: Object.fromEntries(B.facts.own.map((t) => [t.key, t])), verbs: B.facts.verbs, ownVerbs: B.facts.ownVerbs,
    pieces: Object.fromEntries(B.edit.pieces.map((p) => [p.key, p])), revise: B.revise,
  };
  return {
    id, slug, gradeBand: 'G1', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the pieces are English pieces (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const P = plan(BANK, mode, lv, rng, (ctx && ctx.variant) || 1);
      const blocks = render(P, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-wg1="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + fRoom(svgRoom(typo(blocks.join('')))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + P.list.slice(0, 2).join(','), items: P.list },
      };
    },

    async verify(page) {
      return page.evaluate(verifyPage, SPEC, INFO);
    },
  };
}

/** the check of a rendered page (runs in the page; S = SPEC, I = the bank's data) */
function verifyPage(S, I) {
  const fails = [];
  const root = document.querySelector('[data-lcs-wg1]');
  if (!root) return ['no page'];
  const [mode, lvS] = root.dataset.lcsWg1.split('|'), lv = +lvS;
  const isKey = root.dataset.lcsIskey === '1';
  const R = (e) => e.getBoundingClientRect(), cs = (e) => getComputedStyle(e), fs = (e) => parseFloat(cs(e).fontSize);
  const straight = (s) => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  const txt = (e) => (e ? straight(e.textContent).replace(/\s+/g, ' ').trim() : '');
  const TEAL = 'rgb(20, 107, 94)';
  const tok = (s) => String(s).toLowerCase().replace(/’/g, "'").match(/[a-z]+(?:'[a-z]+)?/g) || [];
  const stem = (w) => w.replace(/(ies)$/, 'y').replace(/(es|s)$/, '');
  const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  const lc1 = (s) => (/^(I|Sam|Kim|Max|Ben|Mia)\b/.test(s) ? s : String(s).charAt(0).toLowerCase() + String(s).slice(1));
  const noEnd = (s) => String(s).replace(/[.?!]$/, '');
  const TIMEW = new RegExp('\\b(' + S.TIMEWORDS + ')\\b', 'i');
  const rb = R(root);
  const ringed = (e) => parseFloat(cs(e).borderTopWidth) >= 2 && cs(e).borderTopColor === TEAL;
  const under = (e) => cs(e).textDecorationLine.includes('underline') && cs(e).textDecorationColor === TEAL;

  // the instruction of this level
  const ins = document.querySelector('[data-lcs-instruction]');
  if (!ins) fails.push('no instruction at the top of the page'); else if (txt(ins) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(ins)}"`);
  // typographic apostrophes and quotes on everything printed
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n, bad = ''; while ((n = tw.nextNode())) if (!n.parentElement.closest('style') && /['"]/.test(n.nodeValue)) { bad = n.nodeValue.trim().slice(0, 30); break; }
    if (!bad && ins && /['"]/.test(ins.textContent)) bad = ins.textContent.trim().slice(0, 30);
    if (bad) fails.push('a straight apostrophe or quotation mark is printed: ' + bad); }
  // letters: ligatures off, an f before i, f, l, t and a t before t with room of their own
  if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
  if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[ifl]/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, or ff may join its letters (ligatures on)');
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('style') && /f[iflt]|tt/.test(n.nodeValue)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.nodeValue.trim().slice(0, 20) + '"'); break; } }
  // pictures: only on the fact pages (levels 1 and 2 of G1-621), loaded, 60 px or more, no two of one kind
  const imgs = [...root.querySelectorAll('img')];
  if (imgs.length && !(mode === 'factread' || (mode === 'factwrite' && lv < 3))) fails.push('a picture on a page of printed words');
  imgs.forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < S.PIC) fails.push(`a picture smaller than ${S.PIC} px`); });
  if (new Set(imgs.map((im) => im.dataset.lcsPic)).size !== imgs.length) fails.push('two pictures of one kind on the page');
  // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
  const blocks = [...root.children];
  blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
  root.querySelectorAll('[data-lcs-card]').forEach((c) => { const q = R(c); for (const e of c.querySelectorAll('span, div, b, i, svg, img')) { if (e.closest('[data-lcs-mlines]')) continue; const r = R(e); if (r.width && (r.bottom > q.bottom + 0.5 || r.right > q.right + 0.5 || r.left < q.left - 0.5 || r.top < q.top - 0.5)) { fails.push('something leaves its card (' + (c.dataset.lcsTask || Object.keys(c.dataset)[0]) + ')'); break; } } });
  const used = blocks.reduce((s, b) => s + R(b).height, 0);
  if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
  // no blank band a reader sees: between blocks, under the last one, and inside every block (the union of everything printed)
  for (let i = 1; i < blocks.length; i++) { const g = R(blocks[i]).top - R(blocks[i - 1]).bottom; if (g > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two blocks`); }
  { const gb = rb.bottom - R(blocks[blocks.length - 1]).bottom; if (gb > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(gb)} px under the last block`); }
  // a box: an element with a visible border or a fill of its own; inside every block and every box (a box to draw in is
  // left empty on purpose) the union of what is printed (text, pictures, the rules of a writing row, the boxes in it) leaves
  // no band higher than BAND
  const bg = (e) => cs(e).backgroundColor;
  const isBox = (e) => { const st = cs(e); return ['Top', 'Right', 'Bottom', 'Left'].some((q) => parseFloat(st['border' + q + 'Width']) >= 2 && st['border' + q + 'Style'] !== 'none' && st['border' + q + 'Color'] !== 'rgba(0, 0, 0, 0)') || (bg(e) !== 'rgba(0, 0, 0, 0)' && e.parentElement && bg(e) !== bg(e.parentElement)); };
  // a writing row is seen from its top rule to half its x-height below its base rule (the room of a child's tails; the rest
  // of its box is blank)
  const rowSeen = (sv, r) => { const ls = [...sv.querySelectorAll('line')].map((l) => R(l).top).sort((p, q) => p - q); return ls.length >= 3 ? [ls[0], ls[ls.length - 1] + (ls[ls.length - 1] - ls[1]) / 2] : [r.top, r.bottom]; };
  const seenOf = (e) => { const iv = []; const walk = (x) => { for (const n of x.childNodes) if (n.nodeType === 3 && n.nodeValue.trim()) { const rg = document.createRange(); rg.selectNodeContents(n); for (const q of rg.getClientRects()) if (q.height) iv.push([q.top, q.bottom]); }
      for (const c of x.children) { const r = R(c); if (!r.width || !r.height) continue; const tg = c.tagName.toLowerCase(); if (tg === 'svg') { iv.push(c.closest('[data-lcs-line]') ? rowSeen(c, r) : [r.top, r.bottom]); continue; } if (tg === 'img' || isBox(c)) { iv.push([r.top, r.bottom]); continue; } walk(c); } };
    if (isBox(e) || e.dataset.lcsDraw !== undefined) return [[R(e).top, R(e).bottom]]; walk(e); return iv; };
  const worstIn = (box) => { const iv = [], s = cs(box);
    const walk = (e) => { for (const n of e.childNodes) if (n.nodeType === 3 && n.nodeValue.trim()) { const rg = document.createRange(); rg.selectNodeContents(n); for (const q of rg.getClientRects()) if (q.height) iv.push([q.top, q.bottom]); }
      for (const c of e.children) { const r = R(c); if (!r.width || !r.height) continue; const tg = c.tagName.toLowerCase();
      if (tg === 'svg') { if (c.closest('[data-lcs-line]')) iv.push(rowSeen(c, r)); else iv.push([r.top, r.bottom]); continue; }
      if (tg === 'img' || isBox(c) || [...c.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) { iv.push([r.top, r.bottom]); if (!isBox(c)) walk(c); continue; }
      walk(c); } };
    walk(box); iv.sort((p, q) => p[0] - q[0]);
    let top = R(box).top + parseFloat(s.paddingTop) + parseFloat(s.borderTopWidth), worst = 0;
    for (const [a, z] of iv) { if (a > top) worst = Math.max(worst, a - top); top = Math.max(top, z); }
    return Math.max(worst, R(box).bottom - parseFloat(s.paddingBottom) - parseFloat(s.borderBottomWidth) - top); };
  blocks.forEach((b) => { [b, ...[...b.querySelectorAll('*')].filter((e) => !e.closest('svg') && e.dataset.lcsDraw === undefined && isBox(e))].forEach((x) => { const w = worstIn(x);
    if (w > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(w)} px that a reader sees in the ${b.dataset.lcsTask || (b.dataset.lcsModel ? 'model' : 'box')} block${x === b ? '' : ' (inside a box)'}`); }); });
  // beside a box to draw in, every other column's own content leaves no band over BAND above or below it (a column of
  // questions floating in the middle of a tall box: the band is seen in that column alone)
  root.querySelectorAll('div').forEach((e) => { if (cs(e).display !== 'flex' || !cs(e).flexDirection.startsWith('row') || e.children.length < 2) return;
    const holds = (c) => c.dataset.lcsDraw !== undefined || !!c.querySelector(':scope > [data-lcs-draw]');
    if (![...e.children].some(holds)) return;
    const er = R(e);
    [...e.children].forEach((c) => { if (holds(c)) return; const iv = seenOf(c); if (!iv.length) return;
      const g = Math.max(Math.min(...iv.map((x) => x[0])) - er.top, er.bottom - Math.max(...iv.map((x) => x[1])));
      if (g > S.BAND + 0.5) fails.push(`a blank band of ${Math.round(g)} px beside a box to draw in`); }); });
  // the key's rings take no room: on the page of the child the gaps between the words of a line are equal
  if (!isKey) root.querySelectorAll('[data-lcs-even]').forEach((el) => { const ws = []; const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n;
    while ((n = tw.nextNode())) { const re = /\S+/g; let m; while ((m = re.exec(n.nodeValue))) { const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length); const q = rg.getBoundingClientRect(); if (q.width) ws.push({ top: q.top, left: q.left, right: q.right }); } }
    const W = []; for (const q of ws) { const last = W[W.length - 1]; if (last && Math.abs(last.top - q.top) <= 4 && q.left - last.right < 3 && q.left >= last.left) last.right = Math.max(last.right, q.right); else W.push({ ...q }); }
    const gaps = []; for (let i = 1; i < W.length; i++) if (Math.abs(W[i].top - W[i - 1].top) <= 4) gaps.push(W[i].left - W[i - 1].right);
    if (gaps.length >= 2 && Math.max(...gaps) - Math.min(...gaps) > S.GAPTOL) fails.push(`the gaps between the words of a line are not equal on the page of the child (${Math.round(Math.min(...gaps) * 10) / 10} to ${Math.round(Math.max(...gaps) * 10) / 10} px)`); });
  // sizes
  root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < S.READ) fails.push(`text a first grader reads is ${fs(e)} px (${S.READ} or more)`); });
  root.querySelectorAll('[data-lcs-label]').forEach((e) => { if (fs(e) < S.LABEL) fails.push(`a task line smaller than ${S.LABEL} px`); });
  root.querySelectorAll('[data-lcs-opt]').forEach((e) => { if (fs(e) < S.OPT) fails.push(`a word or sentence to circle smaller than ${S.OPT} px`); });
  // the tasks are numbered 1, 2, ... in order
  { const ns = [...root.querySelectorAll('[data-lcs-label]')].map((l) => +((txt(l).match(/^(\d+)\./) || [])[1])); if (ns.some((x, i) => x !== i + 1)) fails.push('the tasks are numbered ' + ns.join(', ')); }
  // rings and marks: only the key rings, and only the right ones
  root.querySelectorAll('[data-lcs-opt]').forEach((o) => { if (isKey ? ringed(o) !== !!o.dataset.lcsOk : ringed(o)) fails.push('a choice is ringed on the page of the child, or the key rings the wrong one'); });
  // the writing rows: 89 px or more; a key's answer fits its row and is not squeezed; the page of the child is empty
  const rows = [...root.querySelectorAll('[data-lcs-line]')];
  rows.forEach((l) => { const sv = l.querySelector('svg'); if (!sv || R(sv).height < S.ROW - 0.5) fails.push(`a writing row lower than ${S.ROW} px`);
    const tx = l.querySelector('svg text'); if (!tx) return; if (!isKey) { fails.push('a row is filled on the page of the child'); return; }
    if (tx.getAttribute('textLength')) fails.push(`the key's answer "${tx.textContent}" is squeezed to fit its row`); else if (tx.getBBox().width > R(sv).width - 15) fails.push(`the key's answer "${tx.textContent}" is wider than its row`); });
  // every part the child writes in: the sample follows the printed words, a child's letters hold it, and the task keeps a
  // row to spare ('spare') or room on every row ('room'); on the key, the sample itself
  const partsOf = {};
  const simulate = (segs, free) => { const out = free.map(() => 0); for (const s of segs) { let i = s.at, cur = 0; for (const w of s.text.split(' ').filter(Boolean)) { const add = cur ? cur + 1 + w.length : w.length; if (add <= free[i]) { cur = add; out[i] = cur; continue; } i++; if (i >= s.stop || w.length > free[i]) return null; cur = w.length; out[i] = cur; } } return out; };
  root.querySelectorAll('[data-lcs-task]').forEach((tk) => {
    const fit = tk.dataset.lcsFit, ps = [...tk.querySelectorAll('[data-lcs-wpart]')];
    if (!ps.length) { if (fit) fails.push(`the task ${tk.dataset.lcsTask} has no rows to write on`); return; }
    if (!fit) fails.push(`the task ${tk.dataset.lcsTask} does not say how its rows are measured`);
    let emptyChild = 0, emptyKey = 0;
    ps.forEach((p) => {
      const name = p.dataset.lcsWpart, ls = [...p.querySelectorAll(':scope > [data-lcs-wline]')], exp = straight(p.dataset.lcsExpect || '');
      partsOf[name] = p;
      const lead = ls.map((l) => txt(l.querySelector('[data-lcs-leadtext]'))), tail = ls.map((l) => txt(l.querySelector('[data-lcs-tailtext]')));
      if (ls.some((l, i) => (l.dataset.lcsLead ? straight(l.dataset.lcsLead) : '') !== lead[i])) fails.push(`${name}: its printed words are not those it declares`);
      const free = ls.map((l) => Math.floor((R(l.querySelector('[data-lcs-line] svg')).width - S.PAD) / S.CHILD));
      // the segments: each line with printed words starts one; a line with words after its row holds its segment alone
      const starts = lead.map((x, i) => (x || i === 0 ? i : -1)).filter((i) => i >= 0);
      const segs = []; let rest = exp, ok = true;
      for (let k = 0; k < starts.length && ok; k++) {
        const i = starts[k], nx = k + 1 < starts.length ? starts[k + 1] : ls.length;
        if (lead[i]) { if (!rest.startsWith(lead[i])) { ok = false; break; } rest = rest.slice(lead[i].length).trim(); }
        let cut = rest.length;
        const tj = Array.from({ length: nx - i }, (_, q) => i + q).find((q) => tail[q]);
        if (tj !== undefined) { const j = rest.indexOf(' ' + tail[tj]); if (j < 0) { ok = false; break; } cut = j; }
        else if (k + 1 < starts.length) { const j = rest.indexOf(' ' + lead[nx]); if (j < 0) { ok = false; break; } cut = j; }
        segs.push({ at: i, stop: tj !== undefined ? tj + 1 : nx, text: rest.slice(0, cut).trim() });
        rest = rest.slice(cut).trim(); if (tj !== undefined) rest = rest.slice(tail[tj].length).trim();
      }
      if (!ok || rest) { fails.push(`${name}: the sample does not follow the words printed on its lines`); return; }
      const u = simulate(segs, free);
      if (!u) { fails.push(`${name}: the rows do not hold the sample at a child's letter width`); return; }
      emptyChild += u.filter((x) => !x).length;
      const room = /^label[12]$/.test(name) ? S.LABELROOM : S.ROOM;
      if (fit === 'room') u.forEach((x, i) => { if (x && free[i] - x < room) fails.push(`${name}: row ${i + 1} keeps ${free[i] - x} letters of room (${room} or more)`); });
      if (isKey) {
        const kt = ls.map((l) => txt(l.querySelector('[data-lcs-line] svg text')));
        emptyKey += kt.filter((x) => !x).length;
        const all = ls.map((l, i) => [lead[i], kt[i], tail[i]].filter(Boolean).join(' ')).filter(Boolean).join(' ').replace(/ ([,.?!])/g, '$1');
        if (all !== exp) fails.push(`${name}: the key does not write its sample ("${all.slice(0, 40)}")`);
      }
    });
    if (fit === 'spare' && !emptyChild) fails.push(`the task ${tk.dataset.lcsTask} keeps no row to spare at a child's letter width`);
    if (fit === 'spare' && isKey && !emptyKey) fails.push(`the key of the task ${tk.dataset.lcsTask} leaves no row empty`);
  });
  // the key's notes that a sample is a sample (open tasks), and the prompt they answer
  { const ml = S.MODELLINES[mode] || S.MODELLINES.other; root.querySelectorAll('[data-lcs-model] > [data-lcs-mtext]').forEach((e) => { const lh = parseFloat(cs(e).lineHeight); if (R(e).height > (ml + 0.5) * lh) fails.push('a model runs to ' + Math.round(R(e).height / lh) + ' lines (' + ml + ' at most)'); }); }
  { const v = root.querySelectorAll('[data-lcs-vary]').length; if (v !== (isKey ? S.VARY[mode] : 0)) fails.push(`${v} notes that answers vary (${isKey ? S.VARY[mode] : 0} wanted)`); }
  const labelIs = (sel, k, text) => { const c = root.querySelector(sel), l = c && c.querySelector('[data-lcs-label]'); if (!l) { fails.push(`no task line in ${sel}`); return; } const cl = l.cloneNode(true); cl.querySelectorAll('[data-lcs-vary]').forEach((x) => x.remove()); if (txt(cl) !== `${k}. ${text}`) fails.push(`the task line "${txt(cl).slice(0, 50)}" is not "${text.slice(0, 50)}"`); };
  const sameList = (got, want, what) => { if (got.join('|') !== want.join('|')) fails.push(`${what} is not as ruled ("${got.join(' | ').slice(0, 70)}")`); };
  const leadsOf = (name) => { const p = partsOf[name]; return p ? [...p.querySelectorAll(':scope > [data-lcs-wline]')].map((l) => txt(l.querySelector('[data-lcs-leadtext]'))) : null; };
  const expectIs = (name, want) => { const p = partsOf[name]; if (!p) fails.push(`no part ${name}`); else if (straight(p.dataset.lcsExpect) !== want) fails.push(`${name}: the sample is not "${want.slice(0, 50)}"`); };
  // a check list of things a first grader can see, under the rows of its task, each line with its box and its icon
  const stripIs = (task, items, beside = '') => { const st = root.querySelector(`[data-lcs-task="${task}"] [data-lcs-checkstrip]`), last = [...root.querySelectorAll(`[data-lcs-task="${task}"] [data-lcs-wpart]`)].pop(), by = beside && root.querySelector(`[data-lcs-task="${task}"] [data-lcs-wpart="${beside}"]`);
    if (!st || (beside ? !by || R(st).left < R(by).right - 0.5 || R(st).top < R(by).top - 0.5 || R(st).bottom > R(by).bottom + 0.5 : last && R(st).top < R(last).bottom - 0.5)) { fails.push(`the check list does not stand ${beside ? 'beside the row ' + beside : 'under the rows'} of the task ${task}`); return; }
    sameList([...st.querySelectorAll('[data-lcs-checkrow]')].map((e) => straight(e.dataset.lcsCheckrow)), items, 'the check list');
    st.querySelectorAll('[data-lcs-checkrow]').forEach((e) => { const t = straight(e.dataset.lcsCheckrow), ic = e.querySelector('[data-lcs-icon]');
      if (!e.querySelector('[data-lcs-box]') || txt(e).replace(/^(\.\?!|Aa)\s*/, '') !== t) fails.push(`the line "${t}" of the check list has no box, or another text`);
      if ((ic ? straight(ic.dataset.lcsIcon) : '') !== (S.ICONOF[t] || '')) fails.push(`the line "${t}" of the check list has not its icon`); }); };
  const varyFor = (want) => { const v = root.querySelector('[data-lcs-varyfor]'); if (isKey && (!v || txt(v) !== `(Sample for: ${want})`)) fails.push(`the key does not name the prompt of its sample (${want})`); };
  const pattern = (o) => { if (o.some((x, i) => i >= 2 && x === o[i - 1] && x === o[i - 2])) return 'three alike in a row'; const ks = [...new Set(o)]; if (ks.length === 2 && o.length >= 4 && o.every((x, i) => !i || x !== o[i - 1])) return 'every other one'; if (o.length >= 6 && [2, 3].some((L) => o.every((x, i) => i < L || x === o[i - L]))) return 'a block repeated'; if (o.length === 4 && o[0] === o[2] && o[1] === o[3]) return 'a block of two repeated'; return ''; };
  const overlap = (a, b) => a.length && b.length && Math.max(...a) > Math.min(...b) && Math.max(...b) > Math.min(...a);
  const tickRows = (heads) => { const rs = [...root.querySelectorAll('[data-lcs-row]')]; if (rows && [...root.querySelectorAll('[data-lcs-col]')].map(txt).join() !== heads.join()) fails.push(`the columns are not ${heads.join(' and ')}`);
    rs.forEach((r, i) => { const tk = [...r.querySelectorAll('[data-lcs-tick]')]; if (tk.length !== 2) fails.push(`row ${i + 1} has not two boxes`); const want = r.dataset.lcsRow === 'opinion' || r.dataset.lcsRow === 'yes' ? '0' : '1'; tk.forEach((x) => { if (!!x.querySelector('[data-lcs-check]') !== (isKey && x.dataset.lcsTick === want)) fails.push(`row ${i + 1}: a check mark on the page of the child, or the key checks the wrong box`); }); if (txt(r.querySelector('[data-lcs-rtext]')) !== straight(r.dataset.lcsText)) fails.push(`row ${i + 1} is not printed as it is filed`); });
    return rs; };

  if (mode === 'storyplan') {
    const d = S.LV.storyplan[lv];
    labelIs('[data-lcs-task="story"]', 1, S.TASK.story[lv]); labelIs('[data-lcs-task="plan"]', 3, S.TASK.plan);
    { const ls = [...root.querySelectorAll('[data-lcs-task="story"] [data-lcs-label]')]; if (ls.length !== 2 || txt(ls[1]) !== '2. ' + S.TASK.order[lv]) fails.push('the task line of part 2 is not that of level ' + lv); }
    const sEl = root.querySelector('[data-lcs-story]'), s = sEl && I.stories[sEl.dataset.lcsStory];
    if (!s) { fails.push('the story is not a story of the bank'); return fails; }
    // the time words: First, Next, Last on level 1; on levels 2 and 3 a story may say Then or After that for Next
    if (s.alt !== undefined && !S.ALT.includes(s.alt)) fails.push('the story has a time word for Next that is not Then or After that');
    const tw = lv >= 2 && s.alt ? [S.TW[0], s.alt, S.TW[2]] : S.TW;
    const want = `${tw[0]}, ${lc1(s.e[0])}. ${tw[1]}, ${lc1(s.e[1])}. ${tw[2]}, ${lc1(s.e[2])}. ${s.end}`;
    if (txt(sEl.querySelector('[data-lcs-stitle]')) !== s.title || txt(sEl.querySelector('[data-lcs-stext]')) !== want) fails.push('the story is not printed as it is filed');
    { const n = want.split(/\s+/).length; if (n < S.WMIN || n > S.WMAX) fails.push(`the story has ${n} words (${S.WMIN} to ${S.WMAX})`); }
    const tws = [...sEl.querySelectorAll('[data-lcs-tw]')];
    if (tws.map(txt).join() !== tw.join()) fails.push('the story does not hold its time words ' + tw.join(', '));
    { const rest = sEl.querySelector('[data-lcs-stext]').cloneNode(true); rest.querySelectorAll('[data-lcs-tw]').forEach((x) => x.remove()); if (TIMEW.test(txt(rest))) fails.push('the story holds a time word besides the ones to circle (two right answers)'); }
    tws.forEach((x) => { const ring = x.closest('[data-lcs-twring]'); if (!ring || ringed(ring) !== isKey || txt(ring) !== txt(x) + ',') fails.push('a time word is ringed on the page of the child, or not on the key, or its ring holds more than the word and its comma'); });
    { const t0 = sEl.querySelector('[data-lcs-twring]'), p = sEl.querySelector('[data-lcs-stext]'); if (t0 && Math.abs(R(t0).left + parseFloat(cs(t0).borderLeftWidth) + parseFloat(cs(t0).paddingLeft) - (R(p).left + parseFloat(cs(p).paddingLeft))) > 1.5) fails.push('the story does not start flush with its title (a gap before First)'); }
    { const e = sEl.querySelector('[data-lcs-ending]'); if (!e || txt(e) !== s.end || under(e) !== (isKey && d.ending)) fails.push('the ending sentence is not underlined on the key of this level, or the page of the child shows it'); }
    const orows = [...root.querySelectorAll('[data-lcs-orow]')], nums = [];
    if (orows.length !== 3 + d.extra) fails.push(`${orows.length} sentences to number, not ${3 + d.extra}`);
    orows.forEach((r) => { const n = +r.dataset.lcsOrow, t = txt(r.querySelector('[data-lcs-otext]')), box = r.querySelector('[data-lcs-numbox]');
      if (n ? t !== cap(s.e[n - 1]) + '.' : t !== s.extra) fails.push(`"${t}" is not ${n ? 'event ' + n : 'the sentence that is not in the story'} of the story`);
      if (!n && (tok(want).join(' ').includes(tok(t).join(' ')))) fails.push(`"${t}" is in the story`);
      if (txt(box) !== (isKey ? (n ? String(n) : 'X') : '')) fails.push('a box is filled on the page of the child, or the key writes the wrong number');
      if (R(box).width < 38) fails.push('a box for a number is smaller than 38 px');
      if (n) nums.push(n); });
    if (nums.some((x, i) => i >= 2 && ((nums[i - 1] === nums[i - 2] + 1 && x === nums[i - 1] + 1) || (nums[i - 1] === nums[i - 2] - 1 && x === nums[i - 1] - 1)))) fails.push('the numbers run 1-2-3 or 3-2-1 down the rows: ' + nums.join(''));
    { const ls = orows.map((r) => txt(r.querySelector('[data-lcs-otext]')).length), xi = orows.findIndex((r) => r.dataset.lcsOrow === '0'); if (xi >= 0 && (ls[xi] <= Math.min(...ls.filter((x, i) => i !== xi)) || ls[xi] >= Math.max(...ls.filter((x, i) => i !== xi)))) fails.push('the sentence that is not in the story is the shortest or the longest: found by length'); }
    const ideas = [...root.querySelectorAll('[data-lcs-idea]')];
    if (ideas.length !== 3 || ideas[2].dataset.lcsIdea !== 'own' || txt(ideas[2]) !== 'My own idea' || ideas.slice(0, 2).some((x) => !I.prompts[x.dataset.lcsIdea] || txt(x) !== I.prompts[x.dataset.lcsIdea].text) || ideas[0].dataset.lcsIdea === ideas[1].dataset.lcsIdea) fails.push('not two different ideas of the bank and My own idea');
    const ok = ideas.filter((x) => x.dataset.lcsOk), sp = ok.length === 1 ? I.prompts[ok[0].dataset.lcsIdea] : null;
    if (!sp) { fails.push('the key does not answer one idea'); return fails; }
    const bands = [...root.querySelectorAll('[data-lcs-band]')];
    if (bands.map((x) => x.dataset.lcsBand).join() !== S.BANDS.join() || bands.some((x) => txt(x.querySelector('[data-lcs-bandchip]')) !== x.dataset.lcsBand)) fails.push('the plan has not the bands First, Next, Last, The end');
    bands.forEach((x, k) => { const dr = x.querySelector('[data-lcs-draw]'), fe = x.querySelector('[data-lcs-feel]');
      if (k === 3 && d.end === 'feel') { if (!fe || [...fe.querySelectorAll('[data-lcs-feelword]')].map(txt).join() !== I.feelings.slice(0, 6).join() || dr) fails.push('the band The end of level 1 has not the feeling words'); }
      else if (!dr || R(dr).height < S.ROW - 1 || R(dr).width < 140) fails.push(`the band ${S.BANDS[k]} has no box to draw in as tall as its row`); });
    for (const k of [1, 2, 3]) expectIs('band' + k, sp.notes[k - 1]);
    expectIs('band4', d.end === 'open' ? sp.felt : 'I felt ' + sp.felt);
    { const l4 = leadsOf('band4'); if (!l4 || l4[0] !== (d.end === 'open' ? '' : 'I felt')) fails.push('the band The end does not print I felt (levels 1 and 2), or level 3 does'); }
    if (s.e.some((e) => sp.text.toLowerCase().split(' ').filter((w) => w.length > 4).some((w) => e.toLowerCase().includes(w)))) fails.push('the story shares its topic with the idea of the sample');
  }
  if (mode === 'storydraft') {
    labelIs('[data-lcs-task="draft"]', 1, S.TASK.draft);
    stripIs('draft', S.DRAFTCHECK[lv]);
    const mEl = root.querySelector('[data-lcs-model]'), m = mEl && I.models[mEl.dataset.lcsModel];
    if (!m) fails.push('no tiny model of the bank');
    else if (txt(mEl.querySelector('[data-lcs-mtext]')) !== `Model: First, I ${m.e[0]}. Next, I ${m.e[1]}. Last, I ${m.e[2]}. ${lv === 2 ? 'At the end, I' : 'I'} felt ${m.felt}.`) fails.push('the model is not printed as ruled');
    const v = root.querySelector('[data-lcs-varyfor]'), sp = v ? I.promptByText[straight(v.dataset.lcsVaryfor)] : null;
    if (isKey && !sp) fails.push('the key does not name the idea of its sample');
    if (m && Object.values(I.prompts).some((p) => p.key === m.key)) fails.push('the model is an idea the child may write about');
    const names = Object.keys(partsOf), shape = S.LV.storydraft[lv];
    if (names.map((n) => leadsOf(n).length).join() !== shape.join()) fails.push(`the rows of the draft are not ${shape.join(', ')}`);
    if (lv < 3) names.forEach((n, k) => { if (leadsOf(n)[0] !== S.STORYLEAD[lv][k] || leadsOf(n).slice(1).some(Boolean)) fails.push(`${n}: its starter is not "${S.STORYLEAD[lv][k]}"`); });
    else { if (leadsOf(names[0]).some(Boolean)) fails.push('level 3 prints starters'); sameList([...root.querySelectorAll('[data-lcs-bankword]')].map(txt), I.storyBank, 'the word bank'); }
    if (lv < 3 && root.querySelector('[data-lcs-wordbank]')) fails.push('a word bank on level ' + lv);
    if (sp) { const ev = (k) => (lv === 1 ? `${S.STORYLEAD[1][k]} ${sp.e[k]}.` : `${S.STORYLEAD[2][k]} I ${sp.e[k]}.`);
      if (lv < 3) { [0, 1, 2].forEach((k) => expectIs('event' + (k + 1), ev(k))); expectIs('ending', lv === 1 ? `I felt ${sp.felt}.` : `At the end, I felt ${sp.felt}.`); }
      else expectIs('story', `First, I ${sp.e[0]}. Next, I ${sp.e[1]}. Last, I ${sp.e[2]}. I felt ${sp.felt}.`); }
  }
  if (mode === 'opread') {
    const d = S.LV.opread[lv], E = I.opexample;
    sameList([...root.querySelectorAll('[data-lcs-ruletext]')].map(txt), [`${S.OPRULE[0]} ${E.op}`, `${S.OPRULE[1]} ${E.r}`], 'the box of opinion and reason');
    labelIs('[data-lcs-task="kind"]', 1, S.TASK.kind[lv]); labelIs('[data-lcs-task="match"]', 2, S.TASK.match[lv]); labelIs('[data-lcs-task="because"]', 3, S.TASK.because[lv]);
    const op = (t) => (d.think ? `I think ${t.x} are the best ${t.y}.` : t.op3);
    const nounR = (t, r) => (/^They /.test(t.rs[r]) ? cap(t.x) + t.rs[r].slice(4) : null);
    const topicOf = (t) => Object.values(I.optopics).find((x) => op(x) === t || x.op3 === t || x.rs.includes(t) || [0, 1].some((q) => nounR(x, q) === t));
    const keysOnPage = [];
    const rs = tickRows(['opinion', 'reason']);
    if (rs.length !== 2 * d.kind) fails.push(`${rs.length} sentences to sort, not ${2 * d.kind}`);
    let bare = 0, noun = 0;
    rs.forEach((r, i) => { const t = straight(r.dataset.lcsText), k = r.dataset.lcsRow;
      const hit = Object.values(I.optopics).find((x) => (k === 'opinion' ? op(x) === t || x.op3 === t : x.rs.includes(t) || [0, 1].some((q) => nounR(x, q) === t)));
      if (!hit) { fails.push(`sentence ${i + 1} is not ${k === 'opinion' ? 'an opinion' : 'a reason'} of the bank`); return; } keysOnPage.push(hit.key);
      if (k === 'opinion' && op(hit) !== t) bare++;
      if (k === 'reason') { const q = hit.rs.includes(t) ? hit.rs.indexOf(t) : [0, 1].find((y) => nounR(hit, y) === t); if (!hit.rs.includes(t)) noun++; if ((hit.judge || []).includes(q)) fails.push(`the reason "${t}" is a taste or a look a child could call an opinion`); }
      if (k === 'opinion' && /^I (like|love)\b/.test(t)) fails.push(`"${t}" is a fact about the speaker printed as an opinion`); });
    if (bare !== d.bare) fails.push(`${bare} opinions are printed without I think (${d.bare} on level ${lv})`);
    if (noun !== d.nounReason) fails.push(`${noun} reasons start with the noun (${d.nounReason} on level ${lv})`);
    { const bad = pattern(rs.map((r) => r.dataset.lcsRow)); if (bad) fails.push('opinions and reasons stand in a pattern: ' + bad); }
    if (!overlap(rs.filter((r) => r.dataset.lcsRow === 'opinion').map((r) => r.dataset.lcsText.length), rs.filter((r) => r.dataset.lcsRow === 'reason').map((r) => r.dataset.lcsText.length))) fails.push('the opinions and reasons can be sorted by length');
    const L = [...root.querySelectorAll('[data-lcs-op]')], Rr = [...root.querySelectorAll('[data-lcs-reason]')];
    if (L.length !== d.match || Rr.length !== d.match + d.odd) fails.push(`${L.length} opinions and ${Rr.length} reasons to match, not ${d.match} and ${d.match + d.odd}`);
    const offs = [];
    L.forEach((l, i) => { const t = I.optopics[l.dataset.lcsOp]; if (!t || txt(l) !== op(t)) { fails.push(`opinion ${i + 1} of part 2 is not an opinion of this level`); return; } keysOnPage.push(t.key);
      const j = Rr.findIndex((r) => r.dataset.lcsReason === t.key); if (j < 0) { fails.push(`opinion ${i + 1} has no reason of its own`); return; }
      if (+Rr[j].dataset.lcsOf !== i) fails.push(`the reason of opinion ${i + 1} is not keyed to it`);
      if (j === i) fails.push(`opinion ${i + 1} stands straight across from its reason`); offs.push(j - i);
      Rr.forEach((r, k) => { if (k === j) return; const u = I.optopics[r.dataset.lcsReason], ri = u ? u.rs.indexOf(txt(r)) : -1; if (u && ((u.also || {})[ri] || []).includes(t.key)) fails.push(`the reason "${txt(r)}" fits opinion ${i + 1} too (two right answers)`); }); });
    if (offs.length >= 2 && new Set(offs).size < 2) fails.push('every opinion stands the same number of rows from its reason');
    Rr.forEach((r, i) => { const u = I.optopics[r.dataset.lcsReason]; if (!u || !u.rs.includes(txt(r))) fails.push(`reason ${i + 1} of part 2 is not a reason of the bank`); else keysOnPage.push(u.key);
      const odd = +r.dataset.lcsOf < 0, st = r.querySelector('[data-lcs-strike]');
      if (odd !== (L.every((l) => l.dataset.lcsOp !== r.dataset.lcsReason))) fails.push(`reason ${i + 1} is marked as fitting no opinion, or not`);
      if (!!st !== (isKey && odd) || (st && !/line-through/.test(cs(st).textDecorationLine))) fails.push('the key does not cross out the reason that fits no opinion through its words, or the page of the child does'); });
    { const ln = root.querySelector('[data-lcs-mlines]'); if (isKey ? !ln || ln.querySelectorAll('line').length !== d.match : !!ln) fails.push('the key does not draw a line for each opinion, or the page of the child does');
      if (ln && isKey) [...ln.querySelectorAll('line')].forEach((x, i) => { const a = R(L[i].querySelector('[data-lcs-dot]')), j = Rr.findIndex((r) => r.dataset.lcsReason === L[i].dataset.lcsOp), z = j >= 0 ? R(Rr[j].querySelector('[data-lcs-dot]')) : null, lr = x.getBoundingClientRect(); const y1 = +x.getAttribute('y1') + R(ln).top, y2 = +x.getAttribute('y2') + R(ln).top; if (!z || Math.abs(y1 - (a.top + a.height / 2)) > 3 || Math.abs(y2 - (z.top + z.height / 2)) > 3) fails.push(`the key's line ${i + 1} does not run from the opinion's dot to its reason's dot`); }); }
    const bc = [...root.querySelectorAll('[data-lcs-bec]')];
    if (bc.length !== 2) fails.push(`${bc.length} sentences with because, not 2`);
    bc.forEach((e, i) => { const t = I.optopics[e.dataset.lcsBec]; if (!t) { fails.push(`sentence ${i + 1} of part 3 is not of the bank`); return; } keysOnPage.push(t.key);
      const sent = txt(e).replace(/^\d+\.\s*/, ''), want = t.rs.map((r) => `${noEnd(op(t))} because ${lc1(r)}`);
      if (!want.includes(sent)) fails.push(`sentence ${i + 1} of part 3 is not an opinion and its reason joined with because`);
      const bw = e.querySelector('[data-lcs-because]'), br = e.querySelector('[data-lcs-breason]');
      if (!bw || txt(bw) !== 'because' || ringed(bw) !== isKey) fails.push(`sentence ${i + 1}: because is not ringed on the key, or it is on the page of the child`);
      if (!br || under(br) !== (isKey && d.under) || !t.rs.map((r) => lc1(r)).includes(txt(br))) fails.push(`sentence ${i + 1}: the reason is not underlined on the key of this level, or it is on the page of the child`); });
    { const ys = [...new Set(keysOnPage)].map((k) => I.optopics[k].y); if (new Set(ys).size !== ys.length) fails.push('two topics of one kind stand on the page (two opinions on the best ' + ys.find((y, i) => ys.indexOf(y) !== i) + ')'); }
    { const all = [...rs.map((r) => r.dataset.lcsText), ...L.map(txt), ...Rr.map(txt)]; if (new Set(all).size !== all.length) fails.push('a sentence stands twice on the page'); }
    { const topicsOf = (sel, at) => [...root.querySelectorAll(sel)].map((e) => e.dataset[at]); const a = new Set([...rs.map((r) => topicOf(straight(r.dataset.lcsText))).filter(Boolean).map((x) => x.key)]), m = topicsOf('[data-lcs-op]', 'lcsOp'), c = topicsOf('[data-lcs-bec]', 'lcsBec');
      if ([...m, ...c].some((k) => a.has(k)) || c.some((k) => m.includes(k)) || topicsOf('[data-lcs-reason]', 'lcsReason').some((k) => a.has(k) || c.includes(k))) fails.push('a topic stands in two parts of the page'); }
    if ([...root.querySelectorAll('[data-lcs-mtext], [data-lcs-rtext], [data-lcs-bec]')].some((e) => /\bowls?\b/i.test(txt(e)))) fails.push('the example of the box is an item of the page');
  }
  if (mode === 'opwrite') {
    labelIs('[data-lcs-task="choose"]', 1, S.TASK.choose); labelIs('[data-lcs-task="write"]', 2, S.TASK.opdraft);
    const qs = [...root.querySelectorAll('[data-lcs-q]')];
    if (qs.length !== 2 || qs.some((q) => !I.opprompts[q.dataset.lcsQ] || txt(q) !== I.opprompts[q.dataset.lcsQ].q) || qs[0].dataset.lcsQ === qs[1].dataset.lcsQ) fails.push('not two different questions of the bank');
    const ok = qs.filter((q) => q.dataset.lcsOk), sp = ok.length === 1 ? I.opprompts[ok[0].dataset.lcsQ] : null;
    if (!sp) { fails.push('the key does not answer one question'); return fails; }
    { const dr = root.querySelector('[data-lcs-task="choose"] [data-lcs-draw]'); if (!dr || R(dr).width < 200 || R(dr).height < 90) fails.push('no box of 200 by 90 px or more to draw the answer'); }
    // the model (levels 1 and 2): a day-1 topic said in the singular, in exactly the shape of the frame; level 3 has none
    const mEl = root.querySelector('[data-lcs-model]'), mt = mEl && I.optopics[mEl.dataset.lcsModel];
    if (S.LV.opmodel[lv]) { if (!mt) fails.push('no model of the bank');
      else { if (txt(mEl.querySelector('[data-lcs-mtext]')) !== `Model: This is about the best ${mt.ys}. I think ${mt.xs} is the best because ${mt.ms}. That is why I pick ${mt.xs}.`) fails.push('the model is not printed as ruled (one thing, in the shape of the frame)');
        if (qs.some((q) => { const p = I.opprompts[q.dataset.lcsQ]; return p && (tok(p.q).map(stem).some((w) => w.length > 3 && tok(mt.x + ' ' + mt.y).map(stem).includes(w))); })) fails.push('the model shares its topic with a question of the page');
        // the model stands under the questions, beside the box to draw in (the column fills the height of the box)
        { const dr = root.querySelector('[data-lcs-task="choose"] [data-lcs-draw]'); if (!mEl.closest('[data-lcs-task="choose"]') || !dr || R(mEl).right > R(dr).left + 0.5) fails.push('the model does not stand under the questions, beside the box to draw in'); } } }
    else if (mEl) fails.push('a model on level ' + lv);
    if (lv === 3 && qs.some((q) => (I.opprompts[q.dataset.lcsQ] || {}).open === false)) fails.push('level 3 offers a question kept to levels 1 and 2 (its sample or its key note does not fit the open page)');
    stripIs('write', S.OPCHECK);
    if (isKey && sp.also) { const v = root.querySelector('[data-lcs-task="write"] [data-lcs-vary]'); if (!v || txt(v) !== '(Sample. ' + sp.also + ')') fails.push('the key does not say what else is right for the question ' + sp.key); }
    const names = Object.keys(partsOf), shape = S.LV.opwrite[lv];
    if (names.map((n) => leadsOf(n).length).join() !== shape.join()) fails.push(`the rows of the piece are not ${shape.join(', ')}`);
    const topic = `This is about the best ${sp.y}.`, opn = `I think ${sp.x} is the best because ${sp.why}.`, end = `That is why I pick ${sp.x}.`;
    if (lv < 3) {
      const Lw = S.OPLEAD[lv];
      if (leadsOf('topic')[0] !== Lw[0] || (leadsOf('opinion') || []).filter(Boolean).join('|') !== [Lw[1], Lw[2]].join('|') || leadsOf('ending')[0] !== Lw[3]) fails.push('the frames or starters are not those of level ' + lv);
      if (txt(partsOf.opinion && partsOf.opinion.querySelector('[data-lcs-tailtext]')) !== (lv === 1 ? S.OPTAIL : '')) fails.push('the frame of level 1 does not print "is the best" after its second row, or level 2 prints it');
      // the opinion's first two rows hold a book title (TITLEMIN letters or more at a first grader's width; the second row prints no words before its row)
      { const ol = partsOf.opinion ? [...partsOf.opinion.querySelectorAll(':scope > [data-lcs-wline]')] : []; const fr = ol.slice(0, 2).map((l) => Math.floor((R(l.querySelector('[data-lcs-line] svg')).width - S.PAD) / S.CHILD)); if (ol.length < 2 || txt(ol[1].querySelector('[data-lcs-leadtext]')) || fr[0] + fr[1] < S.TITLEMIN) fails.push(`the opinion holds ${fr[0] + (fr[1] || 0)} letters for a title on its first two rows (${S.TITLEMIN} or more)`); }
      expectIs('topic', topic); expectIs('opinion', opn); expectIs('ending', end);
      if (root.querySelector('[data-lcs-wordbank]')) fails.push('a word bank on level ' + lv);
    } else { expectIs('piece', `${topic} ${opn} ${end}`); sameList([...root.querySelectorAll('[data-lcs-bankword]')].map(txt), I.opBank, 'the word bank'); if (leadsOf('piece').some(Boolean)) fails.push('level 3 prints starters'); }
  }
  if (mode === 'factread') {
    const d = S.LV.factread[lv];
    labelIs('[data-lcs-task="file"]', 1, S.TASK.file); labelIs('[data-lcs-task="sort"]', 2, S.TASK.sort); labelIs('[data-lcs-task="close"]', 3, S.TASK.close);
    const fEl = root.querySelector('[data-lcs-file]'), t = fEl && I.facts1[fEl.dataset.lcsFile];
    if (!t) { fails.push('the fact file is not of the bank'); return fails; }
    const named = (s) => tok(s).includes(t.noun.toLowerCase()) || tok(s).includes(t.one);
    if ([...fEl.querySelectorAll('[data-lcs-fact]')].map((e) => txt(e).replace(/^•\s*/, '')).join('|') !== t.file.join('|')) fails.push('the fact file does not print its three facts');
    { const im = fEl.querySelector('img'); if (!im || im.dataset.lcsPic !== t.key || R(im).width < 100) fails.push('the fact file has no picture of its topic of 100 px or more'); }
    expectIs('topic', 'Topic: ' + t.noun);
    const rs = tickRows(['yes', 'no']);
    if (rs.length !== d.about + d.not) fails.push(`${rs.length} sentences to sort, not ${d.about + d.not}`);
    const seen = new Set(t.file);
    rs.forEach((r, i) => { const s = straight(r.dataset.lcsText), yes = r.dataset.lcsRow === 'yes', has = named(s);
      if (seen.has(s)) fails.push(`sentence ${i + 1} stands twice on the page`); seen.add(s);
      if (yes ? !t.about.includes(s) : (has || ![...Object.values(I.facts1).flatMap((o) => o === t ? [t.near] : [...o.file, ...o.about])].includes(s))) fails.push(`sentence ${i + 1} is not ${yes ? 'a fact about ' + t.noun : 'a fact that is not about ' + t.noun}`); });
    if (rs.filter((r) => r.dataset.lcsRow === 'yes').length !== d.about) fails.push(`not ${d.about} sentences about the topic`);
    if (d.near && !rs.some((r) => straight(r.dataset.lcsText) === t.near)) fails.push('level 3 has no sentence about a thing near the topic');
    { const bad = pattern(rs.map((r) => r.dataset.lcsRow)); if (bad) fails.push('yes and no stand in a pattern: ' + bad); }
    if (!overlap(rs.filter((r) => r.dataset.lcsRow === 'yes').map((r) => r.dataset.lcsText.length), rs.filter((r) => r.dataset.lcsRow === 'no').map((r) => r.dataset.lcsText.length))) fails.push('the sentences can be sorted by length');
    const ends = [...root.querySelectorAll('[data-lcs-end]')];
    if (ends.length !== d.ends) fails.push(`${ends.length} endings to choose from, not ${d.ends}`);
    // the endings: the file's closing (one of the three closings); the file's own fact for the endings (with ! on levels 2 and
    // 3, so the closing is never the one sentence with !); a fact about something else; no fact starts like a closing
    const closings = S.CLOSINGS.map((c) => `${c} ${t.noun.toLowerCase()}${c === S.CLOSINGS[1] ? '!' : '.'}`), bare = (x) => x.replace(/[.!?]$/, '');
    if (!closings.includes(t.closing)) fails.push('the closing of the file is not one of the three closings');
    ends.forEach((e) => { const k = e.dataset.lcsEnd, s = txt(e);
      if (k === 'close' ? s !== t.closing || !e.dataset.lcsOk : e.dataset.lcsOk || (k === 'fact' ? s !== (d.bang ? bare(t.bang) + '!' : t.bang) || !t.about.includes(t.bang) : named(s)) || S.CLOSINGS.some((c) => s.startsWith(c))) fails.push(`the ending "${s}" is not ${k === 'close' ? 'the closing' : k === 'fact' ? 'the fact of the file for the endings' + (d.bang ? ', with !' : '') : 'a fact about something else'}`);
      if ([...seen].some((x) => bare(x) === bare(s))) fails.push(`the ending "${s}" stands twice on the page`); seen.add(s); });
    if (d.bang && ends.filter((e) => /!$/.test(txt(e))).length === 1 && /!$/.test(txt(ends.find((e) => e.dataset.lcsEnd === 'close') || ends[0]))) fails.push('the closing is the one ending with ! (found by its end mark)');
    if (new Set(ends.map((e) => e.dataset.lcsEnd)).size !== ends.length || !ends.some((e) => e.dataset.lcsEnd === 'close')) fails.push('the endings are not one closing and other kinds');
  }
  if (mode === 'factwrite') {
    labelIs('[data-lcs-task="box"]', 1, S.TASK.factbox[lv]); labelIs('[data-lcs-task="write"]', 2, S.TASK.factdraft);
    let t;
    if (lv < 3) {
      const fb = root.querySelector('[data-lcs-factbox]'); t = fb && I.facts2[fb.dataset.lcsFactbox];
      if (!t) { fails.push('the fact box is not of the bank'); return fails; }
      if (txt(fb.querySelector('[data-lcs-fbtitle]')) !== 'Fact box: ' + t.noun) fails.push('the fact box does not name its topic');
      // level 1 prints each note with its verb (its frame prints the verb too); level 2 the note alone, so the verb is chosen
      sameList([...fb.querySelectorAll('[data-lcs-note]')].map((e) => txt(e).replace(/^•\s*/, '')), t.notes.map(([v, n]) => (lv === 1 ? v + ' ' + n : n)), 'the notes of the fact box');
      { const im = fb.querySelector('img'); if (!im || im.dataset.lcsPic !== t.key) fails.push('the fact box has no picture of its topic'); }
      { const vb = fb.querySelector('[data-lcs-verbs]'); if (lv === 2 ? !vb || txt(vb) !== 'Use: ' + I.verbs.join(', ') : vb) fails.push('the words can, have, are, eat, live are not printed on level 2 alone'); }
      const n = t.noun, low = n.toLowerCase();
      expectIs('topic', `${S.FACTLEAD.topic} ${low}.`); t.notes.forEach(([v, note], k) => expectIs('fact' + (k + 1), `${n} ${v} ${note}.`)); expectIs('closing', `${S.FACTLEAD.close1} ${low}!`);
      if (leadsOf('topic')[0] !== S.FACTLEAD.topic) fails.push('the topic row does not print This is all about');
      t.notes.forEach(([v], k) => { if ((leadsOf('fact' + (k + 1)) || [''])[0] !== (lv === 1 ? `${n} ${v}` : n)) fails.push(`fact ${k + 1}: its frame is not that of level ${lv}`); });
      if ((leadsOf('closing') || [''])[0] !== S.FACTLEAD.close1) fails.push('the closing row does not print Now you know about');
    } else {
      const qs = [...root.querySelectorAll('[data-lcs-ownq]')];
      if (qs.length !== 3 || qs[2].dataset.lcsOwnq !== 'own' || qs.slice(0, 2).some((q) => !I.facts3[q.dataset.lcsOwnq] || txt(q) !== I.facts3[q.dataset.lcsOwnq].noun)) fails.push('not two topics a child knows and My own idea');
      const ok = qs.filter((q) => q.dataset.lcsOk); t = ok.length === 1 ? I.facts3[ok[0].dataset.lcsOwnq] : null;
      if (!t) { fails.push('the key does not answer one topic'); return fails; }
      varyFor(t.noun);
      const low = t.noun.toLowerCase();
      expectIs('topic', `${S.FACTLEAD.topic} ${low}.`); t.facts.forEach((x, k) => expectIs('fact' + (k + 1), x)); expectIs('closing', `${S.FACTLEAD.close1} ${low}!`);
      expectIs('spare', '');
      if ((leadsOf('topic') || [''])[0] !== S.FACTLEAD.topic || (leadsOf('closing') || [''])[0] !== S.FACTLEAD.close1 || ['fact1', 'fact2', 'fact3', 'spare'].some((k) => (leadsOf(k) || ['x']).some(Boolean))) fails.push('level 3 does not print This is all about and Now you know about alone (the facts on open rows, one to spare)');
      sameList([...root.querySelectorAll('[data-lcs-bankword]')].map(txt), ['This is all about', ...I.ownVerbs, 'Now you know about'], 'the word bank');
      if (root.querySelector('img')) fails.push('a picture on level 3');
    }
    t.labels.forEach((l, k) => expectIs('label' + (k + 1), l));
    { const dr = root.querySelector('[data-lcs-picbox] [data-lcs-draw]'); if (!dr || R(dr).width < 300 || R(dr).height < 90) fails.push('no box of 300 by 90 px or more to draw the topic'); }
    const mEl = root.querySelector('[data-lcs-model]'), mt = mEl && I.facts1[mEl.dataset.lcsModel];
    if (!S.LV.factmodel[lv]) { if (mEl) fails.push('a model on level ' + lv); }
    else if (!mt) fails.push('no model of the bank');
    else { if (txt(mEl.querySelector('[data-lcs-mtext]')) !== `Model: ${S.FACTLEAD.topic} ${mt.noun.toLowerCase()}. ${mt.file.join(' ')} ${S.FACTLEAD.close1} ${mt.noun.toLowerCase()}!`) fails.push('the model is not printed as ruled');
      if (mt.key === t.key || tok(mt.noun).some((w) => tok(t.noun).includes(w))) fails.push('the model is on the topic of the page'); }
    Object.keys(partsOf).filter((n) => !/^label/.test(n)).forEach((n) => { if (leadsOf(n).length !== 1) fails.push(`${n} has not one row`); });
    { const want = lv === 3 ? 6 : 5; if (Object.keys(partsOf).filter((n) => !/^label/.test(n)).length !== want) fails.push(`the page has not ${want} rows: the topic, three facts${lv === 3 ? ', one to spare' : ''}, and a closing`); }
    stripIs('write', S.FACTCHECK, lv === 3 ? 'spare' : '');
  }
  if (mode === 'edit') {
    const fl = S.LV.edit[lv];
    const pEl = root.querySelector('[data-lcs-piece]'), p = pEl && I.pieces[pEl.dataset.lcsPiece];
    if (!p) { fails.push('the piece is not of the bank'); return fails; }
    if (txt(root.querySelector('[data-lcs-boxtitle]')) !== `Find and fix ${fl.length} mistakes`) fails.push('the box does not say how many mistakes there are');
    sameList([...root.querySelectorAll('[data-lcs-ruletext]')].map(txt), fl.map((k) => S.FIXROWS[k]), 'the box of what to find and fix');
    labelIs('[data-lcs-task="edit"]', 1, S.TASK.edit.replace('{N}', ['', '', 'two', 'three', 'four'][fl.length])); labelIs('[data-lcs-task="detail"]', 2, S.TASK.detail);
    if (txt(pEl.querySelector('[data-lcs-ptitle]')) !== p.title) fails.push('the piece has not its title');
    { const pa = pEl.querySelector('[data-lcs-para]'), n = Math.round(R(pa).height / parseFloat(cs(pa).lineHeight)); if (n !== S.PARALINES) fails.push(`the piece takes ${n} lines, not ${S.PARALINES}`); }
    const es = [...pEl.querySelectorAll('[data-lcs-esent]')], where = {};
    if (es.length !== p.s.length) fails.push(`${es.length} sentences, not ${p.s.length}`);
    es.forEach((e, i) => { e.querySelectorAll('[data-lcs-fault]').forEach((f) => { const k = f.dataset.lcsFault; if (where[k] !== undefined) fails.push(`two mistakes of the kind ${k}`); where[k] = i; }); });
    if (Object.keys(where).sort().join() !== fl.slice().sort().join()) fails.push(`the mistakes are ${Object.keys(where).join(', ')}, not ${fl.join(', ')}`);
    if (new Set(Object.values(where)).size !== Object.keys(where).length) fails.push('two mistakes stand in one sentence');
    es.forEach((e, i) => { const x = p.s[i]; if (!x) return; let want = x.t;
      if (i === where.cap) { if (!x.cap) fails.push(`sentence ${i + 1} cannot lose its capital alone`); want = want[0].toLowerCase() + want.slice(1); }
      if (i === where.end) { if (!x.end) fails.push(`sentence ${i + 1} may also end with ! (no missing period there)`); want = want.replace(/\.$/, ''); }
      if (i === where.i) { if (!x.i) fails.push(`sentence ${i + 1} has no I in the middle`); want = want.replace(' I ', ' i '); }
      if (i === where.name) { if (!x.name) fails.push(`sentence ${i + 1} has no name in the middle`); want = want.replace(x.name, x.name[0].toLowerCase() + x.name.slice(1)); }
      if (x.detail && Object.values(where).includes(i)) fails.push('the sentence with the star holds a mistake');
      const c = e.cloneNode(true); c.querySelectorAll('[data-lcs-fixmark], [data-lcs-star], [data-lcs-orbang]').forEach((y) => y.remove());
      if (txt(c) !== want) fails.push(`sentence ${i + 1} is not printed as "${want.slice(0, 40)}"`);
      if (!!e.querySelector('[data-lcs-star]') !== !!x.detail) fails.push(`sentence ${i + 1}: the star is on the wrong sentence`); });
    if (where.end !== undefined && where.end + 1 < es.length && where.end + 1 === where.cap) fails.push('the sentence after the missing period starts with a small letter (the break does not show)');
    const fm = (k) => { const i = where[k]; return i === undefined ? null : es[i].querySelector('[data-lcs-fixmark]'); };
    if (isKey) {
      if (!fm('cap') || txt(fm('cap')) !== p.s[where.cap].t[0]) fails.push('the key does not write the capital letter');
      if (!fm('end') || txt(fm('end')) !== '.') fails.push('the key does not add the period');
      // the key's marks are large enough to see at a glance (a capital I in this font is a bare stroke; an end mark a dot)
      if (fm('end') && fs(fm('end')) < S.ENDMIN) fails.push(`the end mark the key adds is ${fs(fm('end'))} px (${S.ENDMIN} or more)`);
      ['cap', 'i', 'name'].forEach((k) => { const m = fm(k); if (m && fs(m) < S.MARKMIN) fails.push(`the letter the key writes is ${fs(m)} px (${S.MARKMIN} or more)`); });
      if (where.i !== undefined && (!fm('i') || txt(fm('i')) !== 'I')) fails.push('the key does not write I');
      if (where.name !== undefined && (!fm('name') || txt(fm('name')) !== p.s[where.name].name[0])) fails.push('the key does not write the capital of the name');
      // a letter written above a word clears the title and the line above it (its glyph box may reach S.MARKTOL px into
      // theirs: the room above a capital and below a baseline is empty)
      { const box = (e) => { const q = document.createRange(); q.selectNodeContents(e); return q; };
        const tR = box(pEl.querySelector('[data-lcs-ptitle]')).getBoundingClientRect(), para = pEl.querySelector('[data-lcs-para]'), lines = [];
        const w = document.createTreeWalker(para, NodeFilter.SHOW_TEXT); let tn; while ((tn = w.nextNode())) if (!tn.parentElement.closest('[data-lcs-fixmark], [data-lcs-orbang]') && tn.textContent.trim()) lines.push(...box(tn).getClientRects());
        para.querySelectorAll('[data-lcs-fixmark]').forEach((m) => { if (cs(m).position !== 'absolute') return; const mr = box(m).getBoundingClientRect(), host = m.parentElement.getBoundingClientRect();
          const lim = Math.max(tR.bottom, ...lines.filter((r) => r.bottom <= host.top + 2 && r.right > mr.left && r.left < mr.right).map((r) => r.bottom));
          if (mr.top < lim - S.MARKTOL) fails.push(`the letter ${txt(m)} written above a word touches the line above it (${Math.round(lim - mr.top)} px into it)`); });
        // "or !" stands above the added period, clear of the words, of the letters the key writes, and of the title
        { const ob = para.querySelector('[data-lcs-orbang]'); if (ob) { const r = box(ob).getBoundingClientRect(), pr = R(pEl);
          const xs = (q) => q.right > r.left && q.left < r.right, into = (q) => Math.min(r.bottom, q.bottom) - Math.max(r.top, q.top);
          const letters = [...para.querySelectorAll('[data-lcs-fixmark]')].filter((m) => cs(m).position === 'absolute').map((m) => box(m).getBoundingClientRect());
          if ([...lines, ...letters].filter(xs).some((q) => into(q) > S.MARKTOL) || r.top < tR.bottom - S.MARKTOL || r.left < pr.left || r.right > pr.right) fails.push('the "or !" of the key touches a word, a letter the key writes, or the title, or leaves the piece'); } } }
    } else if (root.querySelector('[data-lcs-fixmark]')) fails.push('a mistake is fixed on the page of the child');
    const det = p.s.find((x) => x.detail);
    if (txt(root.querySelector('[data-lcs-asked]')) !== S.ASKED + ' ' + det.q) fails.push('the question of the partner of the writer is not printed');
    if (/(you|your)/i.test(det.q)) fails.push('the question of the partner speaks to the reader (you, your), not about the piece');
    { const nb = root.querySelectorAll('[data-lcs-orbang]'), want = isKey && where.end !== undefined && p.s[where.end] && p.s[where.end].bang ? 1 : 0; if (nb.length !== want || (nb.length && txt(nb[0]) !== S.ORBANG)) fails.push('the key does not say that ! is right too where the sentence can take it, or says it where it cannot'); }
    { const tw = tok(p.title).filter((w) => !S.TITLESMALL.includes(w)), body = p.s.flatMap((x) => tok(x.t)); if (tw.some((w) => body.includes(w))) fails.push('a word the title capitalizes comes back in small letters in the piece'); }
    expectIs('detail', det.a);
    if (leadsOf('detail') && leadsOf('detail').length !== S.DETAILROWS[lv]) fails.push(`the sentence with the detail has not ${S.DETAILROWS[lv]} rows`);
    { const al = root.querySelector('[data-lcs-task="detail"] [data-lcs-vary]'); if (isKey ? !al || txt(al) !== '(Sample. ' + det.also + ')' : al) fails.push('the key does not say what else is right, or the page of the child does'); }
  }
  if (mode === 'revise') {
    const chips = S.LV.revise[lv];
    if (txt(root.querySelector('[data-lcs-boxtitle]')) !== 'How writers revise and edit') fails.push('the box is not titled How writers revise and edit');
    const rv = [...root.querySelectorAll('[data-lcs-rev]')], ex = rv.map((e) => I.revise.examples.find((y) => y.b === straight(e.dataset.lcsRev)));
    if (rv.length !== 2 || ex.some((x) => !x) || ex.map((x) => x && x.kind).join() !== 'detail,mark') fails.push('the box does not show a detail added and then a mark fixed');
    rv.forEach((e, i) => { const x = ex[i]; if (x && txt(e) !== `Before: ${x.b} After: ${x.a} (${x.how})`) fails.push('a worked example is not printed as it is filed'); });
    // the child answers the partner first (and adds the detail to the draft), then checks: I added a detail is then true
    labelIs('[data-lcs-task="partner"]', 1, S.TASK.partner[lv]); labelIs('[data-lcs-task="check"]', 2, S.TASK.check);
    { const pt = root.querySelector('[data-lcs-task="partner"]'), ck = root.querySelector('[data-lcs-task="check"]'); if (!pt || !ck || R(pt).top > R(ck).top) fails.push('the check list stands before the detail it asks about'); }
    const want = S.REVLEVEL[lv].map((k) => S.REVCHECK[k]);
    sameList([...root.querySelectorAll('[data-lcs-checkrow]')].map((e) => straight(e.dataset.lcsCheckrow)), want.map((x) => x[1]), 'the check list');
    sameList([...root.querySelectorAll('[data-lcs-icon]')].map((e) => straight(e.dataset.lcsIcon)), want.map((x) => x[0]), 'the icons of the check list');
    if ([...root.querySelectorAll('[data-lcs-col]')].map(txt).join() !== 'Me,Partner') fails.push('the check list has no columns Me and Partner');
    root.querySelectorAll('[data-lcs-checkrow]').forEach((e) => { if ([...e.querySelectorAll('[data-lcs-box]')].map((x) => x.dataset.lcsBoxfor).join() !== 'Me,Partner') fails.push('a line of the check list has not two boxes'); });
    const v = root.querySelector('[data-lcs-varyfor]'), s = v ? I.revise.samples.find((y) => y.for === straight(v.dataset.lcsVaryfor)) : null;
    if (isKey && !s) fails.push('the key does not name the piece of its sample');
    const pq = [...root.querySelectorAll('[data-lcs-pq]')], liked = chips;
    if (pq.map(txt).join('|') !== [...I.revise.questions, S.OTHERQ].join('|')) fails.push('the questions of a partner to circle (and Other) are not printed');
    if (s) { expectIs('added', 'I added: ' + s.added); if (isKey && (!pq[s.qi] || !pq[s.qi].dataset.lcsOk || pq.filter((x) => x.dataset.lcsOk).length !== 1)) fails.push('the key does not ring the question of its sample alone'); if (liked) expectIs('liked', 'My partner liked:'); }
    { const ad = leadsOf('added'); if (!ad || ad.join('|') !== (liked ? 'I added:|' : 'I added:||')) fails.push(`the detail the child added has not ${liked ? 'two' : 'three'} rows from I added:`); }
    if (liked) { const lk = leadsOf('liked'); if (!lk || lk.join('|') !== 'My partner liked:') fails.push('level 3 has no row for what the partner liked'); }
    if (Object.keys(partsOf).join() !== (liked ? 'added,liked' : 'added')) fails.push('the rows of part 1 are not those of level ' + lv);
  }
  return fails;
}

/* the bank is checked when the factory loads (after every helper a page is built with) */
{ const f = faultsOf(BANK); if (f.length) throw new Error('writing-g1.en.json: ' + f.join('; ')); }

module.exports = { makeWritingG1Type, faultsOf, plan, LEVELS, INSTR, LINES, SPEC, place, planParts, draftParts, opParts, factParts, labelParts, partnerParts, detailPart, fitsRule, storyText, draftModel, opModel, factModel, modelLines };
