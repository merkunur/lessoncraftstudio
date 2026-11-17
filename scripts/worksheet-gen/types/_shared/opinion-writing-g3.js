/**
 * opinion-writing-g3.js — eight Grade 3 writing pages, the unit "Opinion Writing" (English literacy year, Daily Teaching
 * System Part 12.3, 2026-11-17). Children are 8 or 9. The texts are data/literacy/opinion-writing-g3.en.json (written by
 * the scratch script ff-g3opin/bank.js). Every piece is original; each piece stands on ONE page type, so no text comes
 * back on another day of the unit. No picture stands on these pages: they are led by printed words.
 *
 *   mark      G3-548 Find the Opinion and the Reasons (W.3.1.a; lesson 1, day 1). The box "Parts of an opinion piece"
 *             (opinion, fact, reason, example, conclusion). 1. Six sentences: a check mark under fact or opinion (facts
 *             a teacher can confirm anywhere; opinions with a word people can disagree with). 2. An opinion piece of 50
 *             to 90 words with numbered sentences: underline the opinion, circle the number of each reason, draw a box
 *             around the conclusion. 3. One more reason the writer could give (two lines).
 *               level 1  reasons begin "One reason is that", "Another reason is that"; two reasons, each with an example
 *               level 2  three reasons (the third begins "Also,"), two examples, one fact about something else
 *               level 3  three reasons with no signal words, two examples, one fact about something else; part 1 holds
 *                        a fact with a word like "tallest" and an opinion with no "best" or "should"
 *   plan      G3-549 Plan Your Opinion Piece (W.3.1.a; lesson 1, day 2). 1. Two questions: circle one (a worked example
 *             of one reason and its example, on another topic, under them). 2. The planner: Introduction (two lines),
 *             Opinion (two lines), Reasons and examples (three rows of three lines: the reason, its fact or example, a
 *             line to spare), Conclusion (two lines). 3. The check list (I introduced the topic. I stated my opinion. I
 *             wrote three reasons, each with a fact or an example.).
 *               level 1  a sentence frame on every part ("Have you ever thought about ___?", "I think ___.", "One reason
 *                        is that ___.", "For example, ___.", "That is why ___.")
 *               level 2  starters only ("Have you ever", "I think", "One reason", "For example", "That is why")
 *               level 3  open lines and a word bank
 *   link      G3-550 Choose the Linking Word (W.3.1.c; lesson 2, day 1). The box of linking words with their jobs. 1.
 *             Sentences with a gap and the linking words to choose from: circle the one that fits and write it (because
 *             and since give a reason, therefore what follows, for example an example; a gap is offered ONE word that
 *             fits: never because and since together). 2. Two opinions with their reasons: join each into one sentence
 *             on two full-width lines (the key: because; "Also right: since").
 *               level 1  six gaps, two words to choose from · level 2  six gaps, three words · level 3  seven gaps, three
 *                        words; the second sentence to join starts with Since
 *   draft     G3-551 Draft Your Opinion Piece (W.3.1.c; lesson 2, days 2 and 3). A draft page of sixteen lines under the
 *             planner's headings; beside them a margin with the linking words (because, since, therefore, for example,
 *             another reason), a short model piece on another topic, two ideas for a topic and the check list (Each
 *             reason has a fact or an example. I used linking words.).
 *               level 1  Introduction and opinion, Reasons 1, 2, 3 (four lines each); a sentence frame starts each
 *                        sentence ("Have you ever thought about", "I think", "One reason is that", "For example,")
 *               level 2  the same parts, starters only · level 3  Introduction and opinion, Reason 1, Reason 2,
 *                        Conclusion (four lines each), open lines; the margin is the word bank
 *   pickend   G3-552 Find the Concluding Statement (W.3.1.d; lesson 3, day 1). The box "Concluding statements". Three
 *             short opinion pieces (50 to 90 words), each with three endings: a concluding statement (the opinion again
 *             in new words), a new reason, a sentence that changes the subject.
 *               level 1  circle the concluding statement · level 2  write C, R, or X next to each ending · level 3  the
 *                        same, with reasons that carry no signal words
 *   writeend  G3-553 Write a Concluding Statement (W.3.1.d; lesson 3, day 2). The box "Concluding statements" with a
 *             worked example. 1. A piece with a weak ending (The end. / That is all. / the opinion word for word): write
 *             a new concluding statement. 2. A piece with no ending: write one. 3. Four lines for the conclusion of the
 *             child's own draft.
 *               level 1  the frame "That is why ___." · level 2  starters (For all these reasons, / As you can see, /
 *                        That is why) · level 3  open lines and a word bank
 *   edit      G3-554 Revise and Edit an Opinion Paragraph (W.3.5; lesson 4, day 1). The box "Find and fix" names each
 *             mistake and how to fix it. 1. A paragraph with planted mistakes, each with ONE right fix: a sentence that
 *             starts with a small letter, a sentence with no end mark (the next sentence starts with a capital), a
 *             sentence that does not belong (a fact about something else: cross it out), a blank for a missing linking
 *             word (the words to choose from in the box; one fits). 2. The paragraph written again with the fixes.
 *               level 1  six sentences, four mistakes · level 2  seven sentences, five (+ a missing comma after For
 *                        example) · level 3  eight sentences, six (+ a misspelled word-wall word)
 *   revise    G3-555 Revise Your Opinion Piece (W.3.5; lesson 4, day 2). Two worked examples (a sentence before and
 *             after a revision). 1. A check list the child checks by looking, with a box for Me and one for My
 *             partner. 2. A comment from a partner (one thing I like, one thing to add or fix). 3. Level 1 and 2: one
 *             sentence the child will add (with a linking word); level 3: one change the child made.
 *               level 1  three checks · level 2  five checks · level 3  five checks and the change
 *
 * Writing lines are single ruled lines 34 px high (about 11/32 in, wide-ruled paper); a third grader writes 40 to 45
 * letters across a full-width line, measured here as 14.5 px a letter (CHILD). Every part the child writes in holds the
 * key's sample at that measure with at least one line to spare (checked for every sample in the bank when this file
 * loads, and measured on every rendered key). A label stands above its lines. No blank band of more than 40 px between
 * tasks, cards, or blocks. The places of right answers follow no pattern. Ligatures are off, and an f before i, f, l, or t
 * and a t before t get room of their own. Apostrophes and quotation marks are typographic on everything printed. English
 * only; themeless: a copy draws other pieces, prompts, and sentences. PDF only. verify() carries its own copy (SPEC) of
 * every ruled text and measure; it does not read the build's constants.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/opinion-writing-g3.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle } = _parts;

const READ = 18;           // a text the child reads
const LABEL = 17;         // a task line
const OPT = 20;           // a word to circle
const ROW = 34;           // a writing line: single rule, 34 px from top to rule
const RULEPX = 15.5;      // a rule box
const SMALL = 15;         // the draft margin, the worked examples
const STARTPX = 17;       // a frame or starter printed on a line
const KEYPX = 15;         // the key's sample on a line
const CHILD = 14.5;       // a third grader's printed letter (45 letters across a full-width line)
const GAP = 40;           // the largest blank band
const INNER = W - 24;     // a card's inner width (651)
const MARGIN = 150;       // the draft page's margin column
const DRAFTW = INNER - MARGIN - 14;   // a draft line (487)
const A = (s) => esc(s).replace(/"/g, '&quot;');
const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);
const lc1 = (s) => (/^I\b/.test(s) ? s : String(s).charAt(0).toLowerCase() + String(s).slice(1));
const noEnd = (s) => String(s).replace(/[.?!]$/, '');

/** the page instruction of every level (registered as strings with add-strings.js; verify() has its own copy) */
const INSTR = {
  mark: { 1: 'An opinion tells what a writer thinks. A reason tells why.', 2: 'An opinion piece states an opinion and gives reasons for it.', 3: 'Not every sentence is a reason. Look for the ones that tell why.' },
  plan: { 1: 'A plan has an introduction, an opinion, reasons, and a conclusion.', 2: 'Plan before you write: an opinion and reasons that tell why.', 3: 'Plan your opinion piece in notes. Use the word bank if you need it.' },
  link: { 1: 'Linking words connect an opinion and its reasons.', 2: 'Because and since tell why. Therefore tells what happens as a result.', 3: 'Choose each linking word by its job in the sentence.' },
  draft: { 1: 'Use the frames to write your opinion and three reasons.', 2: 'Write your opinion and reasons. Join them with linking words.', 3: 'Write your whole opinion piece, from introduction to conclusion.' },
  pickend: { 1: 'A concluding statement says the opinion again at the end.', 2: 'A concluding statement says the opinion again in new words.', 3: 'A conclusion does not give a new reason or change the subject.' },
  writeend: { 1: 'End your piece by saying your opinion again in new words.', 2: 'Say your opinion again in new words at the end of your piece.', 3: 'End with a concluding statement in your own words.' },
  edit: { 1: 'Writers read their work again and fix mistakes.', 2: 'Writers read their work again to fix capitals, end marks, and commas.', 3: 'Edit like a writer: check every sentence, word, and mark.' },
  revise: { 1: 'Writers make their work better before they share it.', 2: 'Revise your opinion piece with a checklist and a partner.', 3: 'Revise your opinion piece, then tell one change you made.' },
};
/** the task lines */
const LINES = {
  fo: { 1: 'Read each sentence. Put a check mark under fact or opinion.', 2: 'Read each sentence. Put a check mark under fact or opinion.', 3: 'Read each sentence. Ask: Can it be checked? Put a check mark under fact or opinion.' },
  mark: { 1: 'Read the opinion piece. Underline the opinion. Circle the number of each reason. Draw a box around the conclusion.', 2: 'Read the opinion piece. Underline the opinion. Circle the number of each reason. Cross out the sentence that does not belong. Draw a box around the conclusion.', 3: 'Read the opinion piece. Underline the opinion. Circle the number of each reason. Cross out the sentence that does not belong. Draw a box around the conclusion.' },
  more: 'Write one more reason the writer could give.',
  q: 'Choose one question. Circle it.',
  plan: 'Plan your opinion piece.',
  planCheck: 'Check your plan. Put a check mark in each box that is true.',
  link: 'Circle the linking word that fits each blank.',
  join: { 1: 'Join the opinion and the reason. Use because or since. Write one sentence.', 2: 'Join the opinion and the reason. Use because or since. Write one sentence.', 3: 'Join each opinion and its reason in one sentence. Use because or since. Start number 2 with Since.' },
  draftQ: 'Choose one question and circle it, or use your own plan.', draft: 'Write your opinion piece.',
  draftNote: 'You will add your conclusion in the next lesson.',
  pick: { 1: 'Read each piece. Circle its concluding statement.', 2: 'Read each piece. Next to each ending, write C for the concluding statement, R for the new reason, or X for the sentence that changes the subject.', 3: 'Read each piece. Next to each ending, write C for the concluding statement, R for the new reason, or X for the sentence that changes the subject.' },
  weak: 'The ending is weak. Write a better conclusion.',
  none: 'There is no ending. Write a concluding statement.',
  own: 'Write a conclusion for the piece you drafted. Add it to your draft.',
  edit: 'Read the paragraph. Find and fix the {N} mistakes.',
  rewrite: 'Write each sentence you fixed, with no mistakes.',
  check: 'Check your piece in the Me boxes. Then a partner checks it.',
  peer: 'Partner: read the piece and write a comment.',
  change: 'Write one change you made to your piece.',
  add: 'Write a sentence to add. Use a linking word.',
};
/** the box of the reading page (G3-548) */
const MARKRULES = [['Opinion', 'tells what the writer thinks. People can disagree with it.'], ['Fact', 'can be checked and proved true. A fact can use a word like biggest if it can be checked.'],['Reason', 'tells why the writer thinks so.'], ['Example', 'shows that a reason is true. It often starts with For example.'], ['Conclusion', "says the writer's opinion again at the end."]];
/** the frames (level 1) and starters (level 2) of the writing parts; [printed words, end mark] */
const FRAME = { intro: ['Have you ever thought about', '?'], op: ['I think', '.'], r1: ['One reason is that', '.'], r2: ['Another reason is that', '.'], r3: ['The last reason is that', '.'], ex: ['For example,', '.'], close: ['That is why', '.'] };
const STARTER = { intro: 'Have you ever thought about', op: 'I think', r1: 'One reason', r2: 'Another reason', r3: 'The last reason', ex: 'For example', close: 'That is why' };
const WORDBANK = ['I think', 'In my opinion', 'because', 'since', 'For example', 'That is why'];
const PLANCHECK = ['I introduced the topic.', 'I stated my opinion.', 'I wrote three reasons, each with a fact or an example.', 'I planned a conclusion that says my opinion again.'];
const DRAFTCHECK = { 1: ['Each reason has a fact or an example.', 'I used because or since at least once.'], 2: ['Each reason has a fact or an example.', 'I used because or since at least once.'], 3:['Each reason has a fact or an example.', 'I used linking words.', 'My last part says my opinion again.'] };
/** G3-553: the conclusion frame and starters, the word bank */
const ENDFRAME = ['That is why', '.'];
const ENDSTARTERS = ['For all these reasons,', 'As you can see,', 'That is why'];
const ENDBANK = ['That is why', 'For all these reasons,', 'As you can see,', 'Now you know why'];
const ENDRULES = ['A concluding statement comes at the end. It says the opinion again in new words.', 'It does not give a new reason. It does not change the subject.'];
/** G3-554: what to find and how to fix it */
const FIXROWS = { cap: 'A sentence starts with a small letter: write the capital letter above it.', end: 'A sentence has no end mark: add the period.', off: 'A sentence does not belong: cross it out.', link: 'A linking word is missing: write {W} in the blank.', comma: 'A comma is missing after For example: add it.', spell: 'A word-wall word is spelled wrong: write it the right way above it.' };
/** G3-555: the check list the child checks by looking */
const REVCHECK = ['Each reason has a fact or an example.', 'I used a linking word, such as because.', 'Each sentence has a capital and an end mark.', 'I put a comma after each For example (and after Therefore, if I used it).', 'Word-wall words are spelled like the word wall.', 'My last part says my opinion again in new words.'];
/** the key's notes of what else is right (G3-550 joins, G3-554 blank) and the key's naming of a sample's prompt */
const ALSOJOIN = 'Also right: since; or start with Because or Since and a comma (Since everyone can play, tag is fun.)';
const ALSOBLANK = { because: '(since is also right)', since: '(because is also right)' };
const sampleFor = (q) => `(Sample for: ${q})`;
const SIGNAL = ['One reason is that ', 'Another reason is that ', 'Also, '];
const COORD = BANK.link.words;
/** the words that make a sentence an opinion, and the evaluative words of the level-3 opinions */
const OPW = /\b(best|better|should|favorite|fun|most|great|important|amazing|prettiest|coolest|hardest|interesting|beautiful|wonderful|boring|creepy|cute|lovely|too|fascinating|perfect|needs?|deserves?|love|like|good|helpful)\b/i;
/** a statement about the speaker is a fact, never printed as an opinion */
const SPEAKER = /^I (like|love|think)\b/i;
/** the judging words no fact, introduction, or fact about something else may hold (need, like, too have other uses) */
const JUDGE = /\b(best|better|should|favorite|fun|most|great|important|amazing|prettiest|coolest|hardest|interesting|beautiful|wonderful|boring|creepy|cute|lovely|fascinating|perfect|love|good|helpful)\b/i;
const tok = (s) => String(s).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
const STOP = new Set(['about', 'after', 'again', 'also', 'because', 'before', 'being', 'could', 'every', 'from', 'have', 'here', 'into', 'just', 'like', 'many', 'more', 'most', 'much', 'other', 'over', 'should', 'some', 'than', 'that', 'their', 'them', 'there', 'they', 'this', 'very', 'what', 'when', 'where', 'which', 'while', 'with', 'would', 'your', 'think', 'reason', 'example', 'another', 'those', 'these', 'thing', 'things', 'kids', 'each', 'once', 'only', 'were', 'will', 'does', 'make', 'makes']);
const stem = (w) => w.replace(/(ies)$/, 'y').replace(/(es|s)$/, '');
const content = (s) => new Set(tok(s).filter((w) => w.length >= 4 && !STOP.has(w)).map(stem));
const shares = (a, b) => { const B = content(b); return [...content(a)].filter((w) => B.has(w)); };
const words = (s) => String(s).split(/\s+/).filter(Boolean).length;

/* ------------------------------------------------------------------ the measure of a line */
/** the width (px) of every word group printed on a line, measured at STARTPX in the page font with ligatures off (scratch
 *  ff-g3opin/measure-starters.js, 2026-11-17); a text not in the table is estimated at 0.56 em a letter (wider than the font
 *  runs). verify() measures the printed width itself. */
const PRINTW = { 'Have you ever thought about': 229.7, '?': 7.9, 'I think': 49.5, '.': 4.3, 'One reason is that': 144.6, 'Another reason is that': 177, 'The last reason is that': 176.8, 'For example,': 101.9, 'That is why': 92.5, 'Have you ever': 111.8, 'One reason': 90.2, 'Another reason': 122.6, 'The last reason': 122.5, 'For example': 97.7, 'Topic:': 45.9, 'Opinion:': 66.2, 'Reason:': 62.3, 'Example:': 72.6, 'Conclusion:': 90.6, 'For all these reasons,': 168.6, 'As you can see,': 121.3, 'Partner:': 64 };
const estW = (s) => (PRINTW[s] !== undefined ? PRINTW[s] + 1 : String(s).length * STARTPX * 0.56);
/** how many of a child's letters a line holds after what is printed on it */
const freeOf = (ln) => Math.floor((ln.w - 6 - (ln.starter ? estW(ln.starter) + 7 : 0) - (ln.end ? estW(ln.end) + 7 : 0)) / CHILD);
/**
 * Places the sentences of a part on its lines as a child writes them: each sentence starts on its own line (at: the line
 * index, after the line's printed words) and runs on to the next lines; a sentence never runs into a line where another
 * starts. lines: [{ w, starter, end }]; sents: [{ at, text }] (text = what the child writes). Returns the text of every
 * line, or null when the part cannot hold its sentences.
 */
function place(lines, sents) {
  const out = lines.map(() => '');
  for (let k = 0; k < sents.length; k++) {
    // a frame that prints its end mark holds its sentence on its own line
    const s = sents[k], stop = lines[s.at].end ? s.at + 1 : k + 1 < sents.length ? sents[k + 1].at : lines.length;
    let i = s.at;
    for (const w of String(s.text).split(' ').filter(Boolean)) {
      const room = freeOf(lines[i]), next = out[i] ? out[i] + ' ' + w : w;
      if (next.length <= room) { out[i] = next; continue; }
      i++;
      if (i >= stop) return null;
      if (w.length > freeOf(lines[i])) return null;
      out[i] = w;
    }
  }
  return out;
}
/** the part holds its sample with at least one line left empty (a line on which the key writes nothing) */
const fitsWithSpare = (lines, sents) => { const o = place(lines, sents); return !!o && o.some((x) => !x); };
/** the advance (px) of every letter the key writes (Nunito 700, KEYPX, ligatures off; scratch ff-g3opin/measure-keychars.js,
 *  2026-11-17); fRoom() adds 0.07 em after an f before i, f, l, t and after a t before t */
const KEYW = { 0: 9, 1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 9, 9: 9, a: 8.21, b: 9, c: 6.94, d: 9, e: 8.13, f: 5.13, g: 9.06, h: 8.78, i: 3.83, j: 3.89, k: 8.04, l: 4.79, m: 13.16, n: 8.78, o: 8.64, p: 9, q: 9, r: 5.88, s: 7.32, t: 5.36, u: 8.69, v: 8.48, w: 13.37, x: 8.19, y: 8.46, z: 7.11, A: 11.16, B: 10.32, C: 9.87, D: 11.43, E: 8.96, F: 8.43, G: 11.04, H: 11.6, I: 4.23, J: 5.03, K: 9.98, L: 8.43, M: 13.02, N: 11.22, O: 11.78, P: 9.78, Q: 11.78, R: 10.29, S: 9.47, T: 9.5, U: 11.07, V: 10.7, W: 16.7, X: 10.08, Y: 9.34, Z: 9.07, '.': 3.72, ',': 3.72, '?': 7.07, '!': 3.72, "'": 3.72, ';': 3.72, ':': 3.72, '-': 6.51, '(': 5.37, ')': 5.37, ' ': 4.07 };
const keyW = (s) => [...String(s)].reduce((a, c) => a + (KEYW[c] !== undefined ? KEYW[c] : 9.5), 0) + (String(s).match(/f(?=[iflt])|t(?=t)/g) || []).length * 0.07 * KEYPX;
/** the room (px) a line leaves the key's sample after its printed words */
const keyRoom = (ln) => ln.w - 6 - (ln.starter ? estW(ln.starter) + 6 : 0) - (ln.end ? estW(ln.end) + 7 : 0) - 1;
/**
 * The key's sample placed as the KEY writes it (G3-551, G3-554): each line runs to its end in the key's own letters; a
 * sentence starts on the line given (at) or, with no at, on the line after the sentence before it ends (G3-554: each fixed
 * sentence starts on a new line). The child's room is checked apart, by place() at a child's letter width.
 */
function placeKey(lines, sents) {
  const out = lines.map(() => '');
  let next = 0;
  for (let k = 0; k < sents.length; k++) {
    const s = sents[k], at = s.at === undefined ? next : s.at, nk = sents[k + 1];
    if (at >= lines.length) return null;
    const stop = lines[at].end ? at + 1 : nk && nk.at !== undefined ? nk.at : lines.length;
    let i = at;
    for (const w of String(s.text).split(' ').filter(Boolean)) {
      const nx = out[i] ? out[i] + ' ' + w : w;
      if (keyW(nx) <= keyRoom(lines[i])) { out[i] = nx; continue; }
      i++;
      if (i >= stop || keyW(w) > keyRoom(lines[i])) return null;
      out[i] = w;
    }
    next = i + 1;
  }
  return out;
}

/* ------------------------------------------------------------------ the samples of the writing parts */
/** what the child writes after the printed words of a line (level 1 frame, level 2 starter, level 3 nothing) */
const after = (full, printed) => { if (!printed) return full; if (!full.startsWith(printed)) throw new Error(`"${full}" does not start with "${printed}"`); return full.slice(printed.length).replace(/^ /, ''); };
/** the sentences of a prompt's sample (G3-549, G3-551) */
function promptSentences(p, draft) {
  // the draft's sample joins one reason with because (the plan's notes do not)
  const r = (k) => p.rs[k][0] + (draft && p.bc && p.bc[0] === k ? ' because ' + p.bc[1] : '');
  return { intro: `Have you ever thought about ${p.tp}?`, op: `I think ${p.op}.`, r1: `One reason is that ${r(0)}.`, r2: `Another reason is that ${r(1)}.`, r3: `The last reason is that ${r(2)}.`, e1: `For example, ${p.rs[0][1]}.`, e2: `For example, ${p.rs[1][1]}.`, e3: `For example, ${p.rs[2][1]}.`, close: `That is why ${p.cl}.` };
}
/** the notes of level 3 (planner): an organizer word on each line and a note after it */
const NOTEWORD = { intro: 'Topic:', op: 'Opinion:', r: 'Reason:', ex: 'Example:', close: 'Conclusion:' };
const PLANW = INNER - 16;   // a line of the planner (a row's box has 8 px of padding each side)
/**
 * The parts of the planner (G3-549), each { name, label, lines: [{ w, starter, end }], sents: [{ at, text, full }] }:
 * Introduction and opinion (three lines), three reason rows (the reason, its fact or example, a line to spare), and the
 * conclusion (two lines). Level 1 prints a frame on each line (with its end mark), level 2 a starter, level 3 an organizer
 * word: the child writes notes (the key: the prompt's notes).
 */
function planParts(lv, p) {
  const S = promptSentences(p), help = LEVELS.plan[lv].help;
  const ln = (key, nk) => (help === 'frame' ? { w: PLANW, starter: FRAME[key][0], end: FRAME[key][1] } : help === 'starter' ? { w: PLANW, starter: STARTER[key] } : { w: PLANW, starter: NOTEWORD[nk || key] });
  const sent = (at, key, full, note) => (help === 'frame' ? { at, full, text: noEnd(after(full, FRAME[key][0])) } : help === 'starter' ? { at, full, text: after(full, STARTER[key]) } : { at, full: NOTEWORD[note] + ' ' + full, text: full });
  const parts = [{ name: 'intro', label: help === 'open' ? '' : 'Introduction and opinion', lines: [ln('intro'), ln('op'), { w: PLANW }], sents: [sent(0, 'intro', help === 'open' ? p.tp : S.intro, 'intro'), sent(1, 'op', help === 'open' ? p.op : S.op, 'op')] }];
  for (let k = 1; k <= 3; k++) {
    const rk = 'r' + k, ek = 'e' + k;
    parts.push({ name: 'reason' + k, label: '', lines: [ln(rk, 'r'), ln('ex'), { w: PLANW }], sents: [sent(0, rk, help === 'open' ? p.rs[k - 1][0] : S[rk], 'r'), sent(1, 'ex', help === 'open' ? p.rs[k - 1][1] : S[ek], 'ex')] });
  }
  parts.push({ name: 'close', label: help === 'open' ? '' : 'Conclusion', lines: [ln('close'), { w: PLANW }], sents: [sent(0, 'close', help === 'open' ? p.cl : S.close, 'close')] });
  return parts;
}
/** the parts of the draft page (G3-551). Levels 1 and 2: introduction and three reasons, four lines each, frames (1) or
 *  starters (2) at the start of each sentence, each part with a line to spare (the conclusion comes in lesson 3). Level 3:
 *  introduction (three lines), three reasons (four lines each), and the conclusion (two lines) on open lines, the draft
 *  with a line to spare (a third grader's reason, example, and because run past three lines of the column). */
const DRAFTN = { 1: { intro: 4, reason: 4 }, 2: { intro: 4, reason: 4 }, 3: { intro: 3, reason: 4, close: 2 } };
function draftParts(lv, p) {
  const S = promptSentences(p, true), help = LEVELS.draft[lv].help, N = DRAFTN[lv];
  const pr = (key) => (help === 'frame' ? FRAME[key][0] : help === 'starter' ? STARTER[key] : '');
  const L = (key) => ({ w: DRAFTW, ...(key && pr(key) ? { starter: pr(key) } : {}) });
  const n = (k) => Array.from({ length: k }, () => L());
  const two = (name, label, k1, f1, k2, f2, k) => (help === 'open'
    ? { name, label, lines: n(k), sents: [{ at: 0, full: f1 + ' ' + f2, text: f1 + ' ' + f2 }] }
    : { name, label, lines: [L(k1), L(), L(k2), L()], sents: [{ at: 0, full: f1, text: after(f1, pr(k1)) }, { at: 2, full: f2, text: after(f2, pr(k2)) }] });
  const parts = [two('intro', 'Introduction and opinion', 'intro', S.intro, 'op', S.op, N.intro)];
  for (let k = 1; k <= 3; k++) parts.push(two('reason' + k, `Reason ${k} and an example`, 'r' + k, S['r' + k], 'ex', S['e' + k], N.reason));
  if (N.close) parts.push({ name: 'close', label: 'Conclusion', lines: n(N.close), sents: [{ at: 0, full: S.close, text: S.close }] });
  return parts;
}
/** the draft holds its sample at a child's letter width: levels 1 and 2 every part with a line to spare, level 3 every part
 *  and the whole draft with a line to spare */
const draftFits = (lv, parts) => { const o = parts.map((pt) => place(pt.lines, pt.sents)); if (o.some((x) => !x)) return false; return lv === 3 ? o.some((x) => x.some((y) => !y)) : o.every((x) => x.some((y) => !y)); };
/** the conclusion a G3-553 part asks for, written after its printed words */
function endSample(lv, k, why, close) {
  if (lv === 1) return { full: `${ENDFRAME[0]} ${why}${ENDFRAME[1]}`, starter: ENDFRAME[0], end: ENDFRAME[1], text: why };
  if (lv === 2) return { full: `${ENDSTARTERS[k]} ${why}.`, starter: ENDSTARTERS[k], text: `${why}.` };
  return { full: close, text: close };
}

/* ------------------------------------------------------------------ the pieces */
/** the sentences of a piece of G3-548 at a level, in order: [{ role, text, n? }] (offAt: where the fact about something
 *  else stands, an index among the slots after the first reason's example) */
function markSentences(t, lv, offText, offAt) {
  const d = LEVELS.mark[lv], s = [];
  t.intro.forEach((x) => s.push({ role: 'intro', text: x }));
  s.push({ role: 'op', text: t.op });
  const R = (k) => ({ role: 'reason', text: d.signals ? SIGNAL[k] + t.rs[k][0] + '.' : cap(t.rs[k][0]) + '.' });
  const E = (k) => ({ role: 'example', text: 'For example, ' + t.rs[k][1] + '.' });
  const body = [R(0), E(0), R(1), E(1)];
  if (d.reasons === 3) body.push(R(2));
  if (d.off) body.splice(2 + offAt * 2 > body.length ? body.length : 2 + offAt * 2, 0, { role: 'off', text: offText });
  s.push(...body, { role: 'close', text: t.close });
  return s;
}
/** the body of a short piece (G3-552, G3-553): intro, opinion, two reasons each with an example */
function pieceBody(t, signals) {
  return [...t.intro, t.op, signals ? SIGNAL[0] + t.rs[0][0] + '.' : cap(t.rs[0][0]) + '.', 'For example, ' + t.rs[0][1] + '.', signals ? SIGNAL[1] + t.rs[1][0] + '.' : cap(t.rs[1][0]) + '.', 'For example, ' + t.rs[1][1] + '.'];
}
/** the whole small model piece of the level-3 draft margin (G3-551): one introduction sentence, the opinion, the three
 *  reasons, the conclusion */
function modelPiece(t, html) {
  const e = html ? esc : (s) => s, b = (s) => (html ? `<b>${s}</b>` : s);
  return `${e(t.intro[0])} ${e(t.op)} ${b('One reason')} is that ${e(t.rs[0][0])}. ${b('Another reason')} is that ${e(t.rs[1][0])}. ${b('The last reason')} is that ${e(t.rs[2][0])}. ${e(t.close)}`;
}
const MODELMAX = 300;
const OWNQ = 56;   // the longest prompt the key names after a sample of the child's own piece (its task line stays two lines)   // the longest model piece the level-3 margin holds (letters; measured on the rendered margin)
/** the new-reason ending of G3-552 */
const newReason = (t, signals) => (signals ? 'Another reason is that ' + t.x + '.' : cap(t.x) + '.');
/** the sentences of a G3-554 paragraph before its mistakes: [{ role, text, k }] */
function editSentences(t, lv, offText, offAt) {
  const s = [{ role: 'intro', text: t.intro[0] }, { role: 'op', text: noEnd(t.op) + ' because ' + t.rs[0][0] + '.' }, { role: 'example', k: 0, text: 'For example, ' + t.rs[0][1] + '.' }, { role: 'reason', k: 1, text: 'Another reason is that ' + t.rs[1][0] + '.' }];
  if (lv >= 2) s.push({ role: 'example', k: 1, text: 'For example, ' + t.rs[1][1] + '.' });
  if (lv === 3) s.push({ role: 'reason', k: 2, text: 'Also, ' + t.rs[2][0] + '.' });
  s.splice(3 + offAt, 0, { role: 'off', text: offText });
  s.push({ role: 'close', text: t.close });
  return s;
}

/* ------------------------------------------------------------------ the places of right answers */
/** the patterns a child could read off a column of answers or kinds */
function patternOf(o) {
  const n = o.length;
  for (const par of [0, 1]) { const sub = o.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
  const runs = []; o.forEach((x, i) => { if (i && x === o[i - 1]) runs[runs.length - 1]++; else runs.push(1); });
  if (runs.length >= 3 && runs[0] >= 2 && runs.slice(0, -1).every((r) => r === runs[0])) return 'runs of one length';
  for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (o[i + k] !== o[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
  if (n >= 6 && [2, 3, 4].some((L) => o.every((x, i) => i < L || x === o[i - L]))) return 'a block repeated to the end';
  return '';
}
/** n answers among m places: every place used (n >= m), no place more than half (two places: 60 %), never three in a row,
 *  never a staircase of three, two places never alternating, no pattern */
function placesOk(p, m) {
  const n = p.length, count = (v) => p.filter((x) => x === v).length, s = p.join('');
  if (n >= m && new Set(p).size < m) return false;
  if (m === 2 && n >= 4 && (count(0) < 2 || count(1) < 2)) return false;
  if (n >= 4 && Math.max(...Array.from({ length: m }, (_, v) => count(v))) > Math.ceil(n * (m === 2 ? 0.6 : 0.5))) return false;
  if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
  if (m >= 3 && p.some((x, i) => i >= 2 && ((p[i - 1] === p[i - 2] + 1 && x === p[i - 1] + 1) || (p[i - 1] === p[i - 2] - 1 && x === p[i - 1] - 1)))) return false;
  if (m === 2 && (/01010|10101/.test(s) || (n >= 4 && p.every((x, i) => !i || x !== p[i - 1])))) return false;
  if (patternOf(p)) return false;
  return true;
}
function places(n, m, rng) {
  for (let t = 0; t < 5000; t++) { const p = Array.from({ length: n }, () => rng.int(0, m - 1)); if (placesOk(p, m)) return p; }
  throw new Error(`no mixed places for ${n} answers among ${m}`);
}
/** an order of kinds with no three alike in a row, never every other one, never a repeating cycle */
function orderOk(o) {
  if (o.some((x, i) => i >= 2 && x === o[i - 1] && x === o[i - 2])) return false;
  const kinds = [...new Set(o)];
  if (kinds.length === 2 && o.every((x, i) => !i || x !== o[i - 1])) return false;
  if (kinds.length === 2 && /(ab){3}|(ba){3}/.test(o.map((x) => (x === kinds[0] ? 'a' : 'b')).join(''))) return false;
  const k = kinds.length; if (k >= 3 && o.length > k && o.every((x, i) => i < k || x === o[i - k])) return false;
  for (let p = 2; p <= 4; p++) if (o.length >= 2 * p + 2 && o.filter((x, i) => i >= p && x === o[i - p]).length >= o.length - p - 1) return false;
  if (patternOf(o)) return false;
  return true;
}
function kindOrder(counts, rng) {
  const bag = Object.entries(counts).flatMap(([k, c]) => Array(c).fill(k));
  for (let t = 0; t < 5000; t++) { const o = shuffle(bag, rng); if (orderOk(o)) return o; }
  throw new Error('no mixed order of ' + JSON.stringify(counts));
}

/* ------------------------------------------------------------------ levels */
const LEVELS = {
  mark: { 1: { fo: 6, hard: 0, reasons: 2, off: 0, signals: true }, 2: { fo: 6, hard: 0, reasons: 3, off: 1, signals: true }, 3: { fo: 6, hard: 2, reasons: 3, off: 1, signals: false } },
  plan: { 1: { help: 'frame' }, 2: { help: 'starter' }, 3: { help: 'open', bank: true } },
  link: { 1: { n: 6, opts: 2, joins: 2 }, 2: { n: 6, opts: 3, joins: 2 }, 3: { n: 6, opts: 3, joins: 2, since: true } },
  draft: { 1: { help: 'frame' }, 2: { help: 'starter' }, 3: { help: 'open' } },
  pickend: { 1: { letters: false, signals: true }, 2: { letters: true, signals: true }, 3: { letters: true, signals: false } },
  writeend: { 1: { help: 'frame' }, 2: { help: 'starter' }, 3: { help: 'open' } },
  edit: { 1: { faults: ['cap', 'end', 'off', 'link'], opts: 2, rewrite: 9 }, 2: { faults: ['cap', 'end', 'off', 'link', 'comma'], opts: 3, rewrite: 8 }, 3: { faults: ['cap', 'end', 'off', 'link', 'comma', 'spell'], opts: 3, rewrite: 8 } },
  revise: { 1: { checks: 3, ownLines: 3, peerLines: 3 }, 2: { checks: 6, ownLines: 3, peerLines: 2 }, 3: { checks: 6, change: true, ownLines: 3, peerLines: 2 } },
};
/** the lines of the parts of G3-553 and G3-554 (fixed: the bank is checked against them) */
const ENDLINES = { weak: 2, none: 2, own: 3 };

/* ------------------------------------------------------------------ what a page holds */
const topicsOf = (b, set) => b.topics.filter((t) => t.set === set);
/** copy `variant` of a level takes the item at its place in a fixed order of the pool (seeded by the mode and the level):
 *  the first copies of a level never repeat their main piece, prompt, or example while the pool lasts */
const rot = (pool, mode, lv, variant) => { const o = makeRng('opinion-writing-g3|' + mode + '|' + lv).shuffle(pool); return o[((variant || 1) - 1) % o.length]; };
/** a worked example on a topic no prompt of the page has (its tag, its key, its words) */
function modelFor(b, keys, rng, whole) { const ps = keys.map((k) => b.prompts.find((p) => p.key === k)); return shuffle(topicsOf(b, 'mark').filter((t) => !keys.includes(t.key) && !ps.some((p) => p.tag === t.tag || shares(t.op, p.q).length) && (!whole || modelPiece(t, false).length <= MODELMAX)), rng)[0]; }
/** a sentence about something else that shares no word with the piece and never stands in a piece whose theme it touches
 *  (list: strings, or { t, avoid: [piece keys] }) */
const offText = (o) => (typeof o === 'string' ? o : o.t);
function offFor(list, t, rng, used) { const all = [...t.intro, t.op, ...t.rs.flat(), t.x, t.close].join(' '); return shuffle(list.filter((o) => !shares(offText(o), all).length && !(o.avoid || []).includes(t.key) && !(used && used.has(offText(o)))), rng).map(offText)[0]; }

function plan(b, mode, lv, rng, variant) {
  const d = LEVELS[mode][lv];
  if (mode === 'mark') {
    const t = rot(topicsOf(b, 'mark'), mode, lv, variant);
    const offText = d.off ? offFor(b.off, t, rng) : null, offAt = rng.int(0, 2);
    const sents = markSentences(t, lv, offText, offAt);
    // part 1: three facts and three opinions that share no word with the piece (six in two kinds admit no mixed order with
    // four of one kind); level 3 holds a hard fact and a hard opinion
    for (let k = 0; k < 400; k++) {
      const all = [...t.intro, t.op, ...t.rs.flat(), t.x, t.close].join(' ');
      const pool = (L) => shuffle(L.filter((x) => (lv === 3 || !x.hard) && !shares(x.t, all).length), rng);
      const nf = 3, F = pool(b.fo.facts), O = pool(b.fo.opinions);
      let fs = F.slice(0, nf), os = O.slice(0, d.fo - nf);
      if (lv === 3) { fs = [F.find((x) => x.hard), ...F.filter((x) => !x.hard).slice(0, nf - 1)]; os = [O.find((x) => x.hard), ...O.filter((x) => !x.hard).slice(0, d.fo - nf - 1)]; }
      const ord = kindOrder({ fact: nf, opinion: d.fo - nf }, rng), q = { fact: shuffle(fs, rng), opinion: shuffle(os, rng) };
      const fo = ord.map((k2) => ({ kind: k2, t: q[k2].shift().t }));
      if (new Set(fo.map((x) => x.t)).size !== fo.length) continue;
      return { mode, lv, t, sents, fo, more: t.x, list: ['piece:' + t.key, ...fo.map((x) => 'fo:' + x.t)] };
    }
    throw new Error('no page of facts and opinions');
  }
  if (mode === 'plan' || mode === 'draft') {
    const first = rot(b.prompts, mode, lv, variant), [p1, p2] = shuffle([first, shuffle(b.prompts.filter((q) => q !== first), rng)[0]], rng);
    const model = modelFor(b, [p1.key, p2.key], rng, mode === 'draft' && lv === 3);
    // the key's sample answers one of the two questions (drawn)
    return { mode, lv, qs: [p1, p2], sampleAt: rng.int(0, 1), model, list: ['q:' + p1.key, 'q:' + p2.key, 'model:' + model.key] };
  }
  if (mode === 'link') {
    for (let t = 0; t < 600; t++) {
      // the kinds of the page: reason, result, example, mixed so that the right word is sometimes the longest offered
      const counts = { reason: 2, result: 2, example: 2 };
      const order = kindOrder(counts, rng), used = new Set(), items = [];
      for (const k of order) {
        const c = shuffle(b.link.items.filter((x) => x.kind === k && !used.has(x.t) && (k !== 'reason' || lv > 1 || x.at === 'mid')), rng)[0];
        if (!c) break; used.add(c.t);
        const right = k === 'reason' ? (rng.int(0, 1) ? 'because' : 'since') : c.fits[0];
        const one = rng.int(0, 1) ? 'because' : 'since';   // because and since both give a reason: one of them at most
        // level 1 cannot be solved by the comma: a gap followed by a comma offers therefore and for example (both take a
        // comma), a gap inside a sentence offers because or since and therefore
        const wrongPool = lv === 1 ? [c.kind === 'result' ? 'for example' : 'therefore']
          : COORD.filter((w) => !c.fits.includes(w) && (!['because', 'since'].includes(w) || (!['because', 'since'].includes(right) && w === one)));
        items.push({ ...c, right, wrong: shuffle(wrongPool, rng).slice(0, d.opts - 1) });
      }
      if (items.length !== order.length) continue;
      if (lv === 3 && !items.some((x) => x.kind === 'reason' && x.at === 'start')) continue;
      const at = places(items.length, d.opts, rng);
      const out = items.map((x, i) => { const opts = x.wrong.slice(); opts.splice(at[i], 0, x.right); return { t: x.t, kind: x.kind, at: x.at, right: x.right, fits: x.fits, opts }; });
      // word length gives nothing away: the right word is the longest offered in some rows and not in others
      const longest = out.map((x) => x.opts.every((o) => o.length <= x.right.length));
      if (longest.every(Boolean) || !longest.some(Boolean)) continue;
      let joins = shuffle(b.link.joins, rng).slice(0, d.joins);
      // level 3 starts the second sentence with Since: its reason does not start with a pronoun (it would point ahead)
      if (d.since) { const np = shuffle(b.link.joins.filter((j) => !/^(They|It|You)\b/.test(j.r)), rng)[0]; joins = [shuffle(b.link.joins.filter((j) => j !== np), rng)[0], np]; }
      if (joins.some((j) => out.some((x) => shares(j.op + ' ' + j.r, x.t).length >= 2))) continue;
      return { mode, lv, items: out, joins, list: [...out.map((x) => 'gap:' + x.t), ...joins.map((j) => 'join:' + j.op)] };
    }
    throw new Error('no page of linking words');
  }
  if (mode === 'pickend') {
    for (let k = 0; k < 400; k++) {
      const first = rot(topicsOf(b, 'pick'), mode, lv, variant), ts = shuffle([first, ...shuffle(topicsOf(b, 'pick').filter((t) => t !== first), rng).slice(0, 2)], rng);
      const at = places(3, 3, rng);
      const usedS = new Set();
      const pieces = ts.map((t, i) => {
        const subj = offFor(b.subj, t, rng, usedS); usedS.add(subj);
        const ends = [{ kind: 'reason', text: newReason(t, d.signals) }, { kind: 'subject', text: subj }];
        const rest = shuffle(ends, rng); rest.splice(at[i], 0, { kind: 'close', text: t.close });
        return { t, body: pieceBody(t, d.signals), ends: rest };
      });
      // the order of the three kinds is not the same in every piece
      if (new Set(pieces.map((p) => p.ends.map((e) => e.kind[0]).join(''))).size < 2) continue;
      if (new Set(pieces.map((p) => p.ends[0].text)).size < 3) continue;
      return { mode, lv, pieces, list: pieces.map((p) => 'piece:' + p.t.key) };
    }
    throw new Error('no page of endings');
  }
  if (mode === 'writeend') {
    // two pieces, a worked example, and the sample of the child's own piece, four topics (nothing to copy across the page)
    const w1 = rot(topicsOf(b, 'write'), mode, lv, variant), w2 = shuffle(topicsOf(b, 'write').filter((t) => t !== w1 && t.tag !== w1.tag), rng)[0];
    // level 1 asks for the opinion again in new words, so its weak ending is never the opinion word for word
    const kinds = lv === 1 ? b.weak : [...b.weak, 'SAME'], wk = shuffle(kinds, rng)[0];
    const weak = wk === 'SAME' ? w1.op : wk;
    const ex = shuffle(topicsOf(b, 'mark').filter((t) => t.tag !== w1.tag && t.tag !== w2.tag), rng)[0];
    const own = shuffle(b.prompts.filter((p) => ![w1.tag, w2.tag, ex.tag].includes(p.tag) && p.q.length <= OWNQ), rng)[0];
    return { mode, lv, weakT: w1, weak, noneT: w2, own, ex, list: ['weak:' + w1.key, 'none:' + w2.key, 'own:' + own.key, 'ex:' + ex.key] };
  }
  if (mode === 'edit') {
    for (let k = 0; k < 600; k++) {
      const t = rot(topicsOf(b, 'edit'), mode, lv, variant);
      const offText = offFor(b.off, t, rng), offAt = rng.int(0, lv === 1 ? 1 : 2);
      const s = editSentences(t, lv, offText, offAt);
      const iOp = s.findIndex((x) => x.role === 'op'), iR2 = s.findIndex((x) => x.role === 'reason' && x.k === 1);
      // the linking word: because in the opinion, or Another reason at the start of the second reason
      const linkKind = rng.int(0, 1) ? 'because' : 'another';
      const linkAt = linkKind === 'because' ? iOp : iR2;
      const right = linkKind === 'because' ? (rng.int(0, 1) ? 'because' : 'since') : 'Another reason';
      const wrongPool = linkKind === 'because' ? ['therefore', 'for example'] : ['Therefore', 'For example'];
      const opts = shuffle([right, ...shuffle(wrongPool, rng).slice(0, d.opts - 1)], rng);
      const free = s.map((x, i) => i).filter((i) => s[i].role !== 'off');
      // the end mark: a statement where only a period is right (never the opinion or the conclusion, which may take an
      // exclamation point), not just before the blank that starts a sentence, not just before the sentence that does not belong
      const offI = s.findIndex((x) => x.role === 'off');
      const endAt = shuffle(free.filter((i) => (i !== linkAt - 1 || linkKind === 'because') && i !== offI - 1 && s[i].role !== 'op' && s[i].role !== 'close'), rng)[0];
      // the capital: another sentence that does not start with the blank and does not follow the missing end mark
      const capAt = shuffle(free.filter((i) => i !== endAt && i !== endAt + 1 && !(linkKind === 'another' && i === linkAt)), rng)[0];
      if (capAt === undefined || endAt === undefined) continue;
      if (/^I\b/.test(s[capAt].text)) continue;
      const faults = { link: linkAt, end: endAt, cap: capAt, off: s.findIndex((x) => x.role === 'off') };
      if (d.faults.includes('comma')) { const ex = shuffle(s.map((x, i) => i).filter((i) => s[i].role === 'example'), rng)[0]; if (ex === undefined) continue; faults.comma = ex; }
      if (d.faults.includes('spell')) {
        // a word of the word wall that stands once in the paragraph (so its right spelling is printed nowhere else), never
        // the linking word of the blank
        const all = tok(s.map((y) => y.text).join(' ')), cand = [];
        s.forEach((x, i) => { if (x.role === 'off') return; tok(x.text).forEach((w) => { if (b.spell[w] && all.filter((v) => v === w).length === 1 && w !== 'because' && w !== 'since') cand.push([i, w]); }); });
        const c = shuffle(cand, rng)[0];
        if (!c) continue; faults.spell = c[0]; faults.spellWord = c[1];
      }
      // two mistakes never share a sentence (the sentence that does not belong has none of the others)
      const at = d.faults.map((f) => faults[f]);
      if (at.some((x) => x === undefined) || new Set(at).size !== at.length) continue;
      // the fixed sentences fit their lines with a line to spare
      if (!fitsWithSpare(Array.from({ length: d.rewrite }, () => ({ w: INNER })), [{ at: 0, text: editRewrite(s, faults, right) }])) continue;
      return { mode, lv, t, s, faults, linkKind, right, opts, list: ['para:' + t.key] };
    }
    throw new Error('no paragraph to edit');
  }
  if (mode === 'revise') {
    // one content change (revise) and one mark fix (edit), in this order
    const ex = [rot(b.revise.filter((x) => x.kind === 'content'), mode, lv, variant), shuffle(b.revise.filter((x) => x.kind === 'mark'), rng)[0]];
    const own = shuffle(b.prompts.filter((p) => p.q.length <= OWNQ), rng)[0];
    return { mode, lv, ex, own, list: [...ex.map((x) => 'ex:' + x.b), 'own:' + own.key] };
  }
  throw new Error('opinion-writing-g3: no plan for ' + mode);
}

/* ------------------------------------------------------------------ the smaller writing parts */
const ITEMW = INNER - 20;   // a line inside a white item box (10 px of padding each side)
/** G3-548 part 3: one more reason (level 1 frame, level 2 starter, level 3 open) */
function moreParts(lv, x) {
  const full = `${FRAME.r2[0]} ${x}${FRAME.r2[1]}`;
  if (lv === 1) return { lines: [{ w: INNER, starter: FRAME.r2[0], end: FRAME.r2[1] }, { w: INNER }], sents: [{ at: 0, full, text: x }] };
  if (lv === 2) return { lines: [{ w: INNER, starter: STARTER.r2 }, { w: INNER }], sents: [{ at: 0, full, text: after(full, STARTER.r2) }] };
  return { lines: [{ w: INNER }, { w: INNER }], sents: [{ at: 0, full: cap(x) + '.', text: cap(x) + '.' }] };
}
/** G3-550 part 2: the joined sentence (because; level 3's second one starts with Since) */
const joinSample = (j, since) => (since ? 'Since ' + lc1(noEnd(j.r)) + ', ' + lc1(j.op) : noEnd(j.op) + ' because ' + lc1(j.r));
/** G3-553: a part to write a conclusion in (k: 0 the weak ending, 1 no ending, 2 the child's own piece) */
function endParts(lv, k, why, close, n) {
  const s = endSample(lv, k, why, close);
  return { lines: [{ w: INNER, ...(s.starter ? { starter: s.starter } : {}), ...(s.end ? { end: s.end } : {}) }, ...Array.from({ length: n - 1 }, () => ({ w: INNER }))], sents: [{ at: 0, full: s.full, text: s.text }] };
}
/** G3-554: the sentences that hold a mistake, fixed, in the order of the paragraph (the sentence that does not belong is
 *  crossed out, not written again) */
const editRewriteList = (s, faults, right) => s.map((x, i) => [x, i]).filter(([x, i]) => x.role !== 'off' && [faults.cap, faults.end, faults.link, faults.comma, faults.spell].includes(i)).map(([x]) => (x.role === 'op' && right === 'since' ? x.text.replace(' because ', ' since ') : x.text));
const editRewrite = (s, faults, right) => editRewriteList(s, faults, right).join(' ');
/** G3-555: what a partner might write (the key's samples) */
const PEER = [['You gave a fact for every reason.', 'Add a comma after For example.'], ['Your opinion is easy to find.', 'Add an example to your second reason.'], ['I like the linking words you used.', 'Start each sentence with a capital.'], ['Your reasons tell why.', 'Use because to join two ideas.']];

/* ------------------------------------------------------------------ the bank */
const BANNED = /\b(pets?|dogs?|cats?|puppy|kitten|brothers?|sisters?|video|tablets?|phones?|tv|computers?|christmas|halloween|easter|thanksgiving|holidays?|church|god|vote|president|toys?|candy|birthday|money)\b/i;
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(b) {
  const f = [];
  const L = b.link || {};
  if ((L.words || []).join() !== 'because,since,therefore,for example') f.push('linking words: not because, since, therefore, for example');
  (L.words || []).forEach((w) => { if (!(L.jobs || {})[w]) f.push(`linking words: "${w}" has no job`); });
  if ((L.margin || []).map((x) => x[0]).join() !== 'because,since,therefore,for example,another reason') f.push('linking words: the margin is not because, since, therefore, for example, another reason');
  const seenL = new Set();
  (L.items || []).forEach((x) => {
    const t = String(x.t);
    if (seenL.has(t)) f.push(`linking: "${t}" twice`); seenL.add(t);
    if ((t.split('___').length - 1) !== 1 || !/\.$/.test(t)) f.push(`linking: "${t}" is not a sentence with one blank`);
    const want = { reason: 'because,since', result: 'therefore', example: 'for example' }[x.kind];
    if (!want || (x.fits || []).join() !== want) f.push(`linking: "${t}" is not judged by its kind (the words that fit it)`);
    if (x.kind === 'reason' && x.at === 'mid' && !/[a-z] ___ ([a-z]|I )/.test(t)) f.push(`linking: "${t}": a blank in the middle stands between two words`);
    if (x.kind === 'reason' && x.at === 'start' && !/^___ [a-z][^,]*, [a-z]/.test(t)) f.push(`linking: "${t}": a reason at the start is followed by a comma and the rest of the sentence`);
    if (x.kind !== 'reason' && (x.at !== 'start' || !/^[A-Z][^.]*\. ___, [a-z]/.test(t))) f.push(`linking: "${t}": a result or an example begins the second sentence, with a comma after the blank`);
    // no linking word of its own: a second linking word could answer the blank
    if (/\b(because|since|therefore|for example|so)\b/i.test(t.replace('___', ' '))) f.push(`linking: "${t}" holds a linking word of its own`);
    // an example names one member of a group the first sentence names (so it cannot be read as a result); a result follows
    // from the first sentence and names no member of a group (so it cannot be read as an example)
    if (x.kind !== 'reason') {
      const [s1, s2] = t.split('___'), lo2 = s2.replace(/^,\s*/, '').toLowerCase();
      if (x.kind === 'example' && (!x.group || !x.member || !s1.toLowerCase().includes(x.group) || !lo2.includes(x.member.toLowerCase()) || x.group === x.member || /\b(so|should|must|needs?)\b/.test(lo2))) f.push(`linking: "${t}" is an example that could be read as a result (no group in the first sentence, or no member of it in the second)`);
      if (x.kind === 'result' && (/\b(many|kinds of|different)\b/i.test(s1) || /^(one|some|a|an|many)\b/.test(lo2))) f.push(`linking: "${t}" is a result that could be read as an example`);
    }
  });
  for (const [k, n] of [['reason', 12], ['result', 10], ['example', 10]]) if ((L.items || []).filter((x) => x.kind === k).length < n) f.push(`linking: fewer than ${n} sentences of the kind ${k}`);
  if ((L.items || []).filter((x) => x.kind === 'reason' && x.at === 'start').length < 4) f.push('linking: fewer than four reason sentences with the blank at the start (level 3)');
  (L.joins || []).forEach((j) => {
    if (!/^[A-Z][^.]*\.$/.test(j.op) || !/^[A-Z][^.]*\.$/.test(j.r) || !OPW.test(j.op) || SPEAKER.test(j.op)) f.push(`joins: "${j.op} ${j.r}" is not an opinion and a reason, each one sentence`);
    for (const since of [false, true]) { const s = joinSample(j, since); if (!fitsWithSpare([{ w: ITEMW }, { w: ITEMW }], [{ at: 0, text: s }])) f.push(`joins: "${s}" does not fit one line with a line to spare`); }
  });
  if ((L.joins || []).filter((j) => !/^(They|It|You)\b/.test(j.r)).length < 6) f.push('joins: fewer than six reasons that do not start with a pronoun (level 3 starts the second one with Since)');
  if ((L.joins || []).length < 12) f.push('joins: fewer than twelve');
  // the prompts: questions every third grader can answer, and samples that fit their lines; no prompt on the topic of a
  // day-1 piece (G3-548)
  const keys = new Set(), tags = new Set(), markTags = new Set((b.topics || []).filter((t) => t.set === 'mark').map((t) => t.tag));
  (b.prompts || []).forEach((p) => {
    if (keys.has(p.key)) f.push(`prompts: the key ${p.key} twice`); keys.add(p.key);
    if (!/^[A-Z].*\?$/.test(p.q) || p.q.length > 64) f.push(`prompts: "${p.q}" is not a question of 64 letters or fewer`);
    if (!p.tag || tags.has(p.tag)) f.push(`prompts: "${p.q}" has no topic of its own (tag)`); tags.add(p.tag);
    if (markTags.has(p.tag)) f.push(`prompts: "${p.q}" is on the topic of a piece of G3-548 (${p.tag}): day 1 would be a copy`);
    if (SPEAKER.test(p.op)) f.push(`prompts: "${p.op}" is a statement about the speaker, not an opinion`);
    if (!shares(p.cl, p.op).length) f.push(`prompts: the conclusion "${p.cl}" does not name the topic of "${p.op}"`);
    if (!Array.isArray(p.bc) || ![0, 1, 2].includes(p.bc[0]) || !/^[a-z]/.test(p.bc[1] || '') || /[.?!]$/.test(p.bc[1]) || /\b(because|since|therefore|for example)\b/.test(p.bc[1])) f.push(`prompts: "${p.q}" has no reason the draft joins with because`);
    if (BANNED.test(p.q + ' ' + [p.tp, p.op, ...p.rs.flat(), p.cl].join(' '))) f.push(`prompts: "${p.q}" names a pet, a family member, a screen, a holiday, a toy, money, religion, or politics`);
    if ((p.rs || []).length !== 3) f.push(`prompts: "${p.q}" has not three reasons`);
    [p.tp, p.op, ...p.rs.flat(), p.cl].forEach((s) => { if (!/^([a-z]|I |Friday )/.test(s) || /[.?!]$/.test(s)) f.push(`prompts: "${s}" is not a note (small first letter, no end mark)`); });
    if (tok(p.cl).join(' ') === tok(p.op).join(' ')) f.push(`prompts: the conclusion of "${p.q}" repeats the opinion word for word`);
    for (const lv of [1, 2, 3]) {
      planParts(lv, p).forEach((pt) => { if (!fitsWithSpare(pt.lines, pt.sents)) f.push(`prompts: "${p.key}": the planner part ${pt.name} of level ${lv} does not hold its sample with a line to spare`); });
      { const dp = draftParts(lv, p); if (!draftFits(lv, dp)) f.push(`prompts: "${p.key}": the draft of level ${lv} does not hold its sample at a child's letter width with a line to spare (${dp.filter((pt) => { const o = place(pt.lines, pt.sents); return !o || !o.some((y) => !y); }).map((pt) => pt.name).join(', ')})`);
        dp.forEach((pt) => { if (!placeKey(pt.lines, pt.sents)) f.push(`prompts: "${p.key}": the key cannot write the draft part ${pt.name} of level ${lv}`); }); }
      const o = endParts(lv, 2, p.cl, `That is why ${p.cl}.`, ENDLINES.own); if (!fitsWithSpare(o.lines, o.sents)) f.push(`prompts: "${p.key}": the conclusion of level ${lv} does not fit three lines with a line to spare`);
    }
  });
  if ((b.prompts || []).length < 16) f.push('prompts: fewer than sixteen');
  // the pieces
  const T = b.topics || [];
  for (const [set, n] of [['mark', 15], ['pick', 10], ['write', 8], ['edit', 14]]) if (T.filter((t) => t.set === set).length < n) f.push(`pieces: fewer than ${n} of the set ${set}`);
  const tk = new Set();
  const longOff = (list) => list.map(offText).reduce((a, s) => (words(s) > words(a) ? s : a), '');
  const shortOff = (list) => list.map(offText).reduce((a, s) => (!a || words(s) < words(a) ? s : a), '');
  T.forEach((t) => {
    if (tk.has(t.key)) f.push(`pieces: the key ${t.key} twice`); tk.add(t.key);
    (t.intro || []).forEach((s) => { if (!/^[A-Z].*[.?]$/.test(s) || JUDGE.test(s)) f.push(`pieces: the introduction "${s}" is not a sentence that is no opinion`); });
    if (!/^[A-Z].*\.$/.test(t.op) || !OPW.test(t.op) || SPEAKER.test(t.op)) f.push(`pieces: "${t.op}" is not an opinion (or is a statement about the speaker)`);
    if (!t.tag) f.push(`pieces: "${t.op}" has no topic (tag)`);
    if (!/^[A-Z].*\.$/.test(t.close) || /^(Another reason|Also)\b/.test(t.close) || tok(t.close).join(' ') === tok(t.op).join(' ')) f.push(`pieces: "${t.close}" is not a conclusion in new words`);
    if (!shares(t.close, t.op).length) f.push(`pieces: the conclusion "${t.close}" does not name the topic of "${t.op}"`);
    const need = t.set === 'pick' || t.set === 'write' ? 2 : 3;
    if ((t.rs || []).length < need) f.push(`pieces: "${t.op}" has fewer than ${need} reasons`);
    [...(t.rs || []).flat(), t.x].forEach((s) => { if (!/^([a-z]|I )/.test(s) || /[.?!]$/.test(s) || /\b(because|since|therefore|for example)\b/i.test(s)) f.push(`pieces: "${s}" is not a clause without a linking word`); });
    if ([...t.intro, t.op, t.close].some((s) => /\b(because|since|therefore)\b/i.test(s))) f.push(`pieces: "${t.op}": a linking word stands outside the reasons`);
    const all = [...t.intro, t.op, ...t.rs.flat(), t.x, t.close].join(' ');
    if (t.set === 'mark' || t.set === 'edit') { if (b.off.filter((o) => !shares(offText(o), all).length && !(o.avoid || []).includes(t.key)).length < 3) f.push(`pieces: fewer than three facts about something else share no word and no theme with "${t.op}"`); }
    if (t.set === 'pick' && b.subj.filter((s) => !shares(s, all).length).length < 3) f.push(`pieces: fewer than three sentences that change the subject share no word with "${t.op}"`);
    if (t.set === 'mark') for (const lv of [1, 2, 3]) {
      for (const o of [longOff(b.off), shortOff(b.off)]) { const n = words(markSentences(t, lv, o, 0).map((s) => s.text).join(' ')); if (n < 50 || n > 90) f.push(`pieces: "${t.op}" has ${n} words on level ${lv} (50 to 90)`); }
      const m = moreParts(lv, t.x); if (!fitsWithSpare(m.lines, m.sents)) f.push(`pieces: the reason "${t.x}" does not fit two lines with a line to spare (level ${lv})`);
    }
    if (t.set === 'pick' || t.set === 'write') for (const sig of [true, false]) { const n = words(pieceBody(t, sig).join(' ')); if (n < 50 || n > 90) f.push(`pieces: "${t.op}" has ${n} words (50 to 90)`); }
    if (t.set === 'pick' && tok(newReason(t, false)).join(' ') === tok(t.close).join(' ')) f.push(`pieces: "${t.op}": the new reason is its conclusion`);
    if (t.set === 'write') {
      if (!t.why || !/^([a-z]|I )/.test(t.why) || /[.?!]$/.test(t.why) || tok(t.why).join(' ') === tok(noEnd(t.op)).join(' ') || !shares(t.why, t.op).length) f.push(`pieces: "${t.op}" has no conclusion in new words to write after a frame`);
      for (const lv of [1, 2, 3]) for (const k of [0, 1]) { const e = endParts(lv, k, t.why, t.close, ENDLINES.weak); if (!fitsWithSpare(e.lines, e.sents)) f.push(`pieces: the conclusion of "${t.op}" does not fit ${ENDLINES.weak} lines with a line to spare (level ${lv}, part ${k + 1})`); }
    }
    if (t.set === 'edit') {
      if (t.intro.length !== 1) f.push(`pieces: "${t.op}" has not one sentence of introduction`);
      if (/^I\b/.test(t.op) || /\b(because|since)\b/.test(t.op)) f.push(`pieces: "${t.op}" cannot take "because" and a reason`);
      for (const lv of [1, 2, 3]) {
        const s = editSentences(t, lv, longOff(b.off), 0);
        for (const o of [longOff(b.off), shortOff(b.off)]) { const n = words(editSentences(t, lv, o, 0).map((x) => x.text).join(' ')); if (n < 50 || n > 90) f.push(`pieces: "${t.op}" has ${n} words on level ${lv} of the paragraph to edit (50 to 90)`); }
        if (lv === 3) { const ws = tok(s.filter((x) => x.role !== 'off').map((x) => x.text).join(' ')); if (!ws.some((w) => b.spell[w] && w !== 'because' && ws.filter((v) => v === w).length === 1)) f.push(`pieces: "${t.op}" has no word-wall word that stands once (level 3 misspells one)`); }
      }
    }
  });
  // facts and opinions
  const FO = b.fo || {};
  (FO.facts || []).forEach((x) => { if (!/^[A-Z].*\.$/.test(x.t) || (x.hard ? !/\b[a-z]+est\b/.test(x.t) || /\b(should|better|fun|favorite)\b/.test(x.t) : JUDGE.test(x.t))) f.push(`facts: "${x.t}" is not a fact a teacher can check`); });
  (FO.opinions || []).forEach((x) => { if (!/^[A-Z].*\.$/.test(x.t) || !OPW.test(x.t) || SPEAKER.test(x.t) || (x.hard && /\b(best|better|should|most)\b/.test(x.t))) f.push(`opinions: "${x.t}" is not an opinion${x.hard ? ' without best, better, should, or most' : ''}`); });
  for (const [list, what] of [[FO.facts || [], 'facts'], [FO.opinions || [], 'opinions']]) { if (list.filter((x) => !x.hard).length < 10 || list.filter((x) => x.hard).length < 3) f.push(`${what}: fewer than ten plain ones or three hard ones`); if (new Set(list.map((x) => x.t)).size !== list.length) f.push(`${what}: one twice`); }
  // the other lists
  if ((b.off || []).length < 8 || (b.off || []).some((o) => JUDGE.test(offText(o)) || !/^[A-Z].*\.$/.test(offText(o)))) f.push('off: fewer than eight facts about something else, or one that is an opinion');
  (b.off || []).forEach((o) => (o.avoid || []).forEach((k) => { if (!T.some((t) => t.key === k)) f.push(`off: "${offText(o)}" avoids a piece that does not exist (${k})`); }));
  if ((b.subj || []).length < 8) f.push('subj: fewer than eight sentences that change the subject');
  if ((b.weak || []).length < 2) f.push('weak: fewer than two weak endings');
  Object.entries(b.spell || {}).forEach(([w, m]) => { if (!/^[a-z]+$/.test(w) || !/^[a-z]+$/.test(m) || w === m) f.push(`spell: "${w}" is not a word with a misspelling`); });
  if ((b.revise || []).length < 14 || (b.revise || []).some((x) => x.b === x.a || !/\.$/.test(x.how) || !['content', 'mark'].includes(x.kind))) f.push('revise: fewer than fourteen worked examples, or one that does not change, or one that is neither a content change nor a mark fix');
  if ((b.revise || []).filter((x) => x.kind === 'content').length < 8 || (b.revise || []).filter((x) => x.kind === 'mark').length < 5) f.push('revise: fewer than eight content changes or five mark fixes');
  // every level of every page can be drawn
  if (!f.length) for (const mode of Object.keys(LEVELS)) for (const lv of [1, 2, 3]) for (let s = 1; s <= 20; s++) {
    try { plan(b, mode, lv, makeRng('opinion-writing-g3|' + mode + '|' + lv + '|' + s), s); } catch (e) { f.push(`${mode} level ${lv} cannot be drawn: ${e.message}`); break; }
  }
  // G3-548: the order of facts and opinions and the place of the planted fact are drawn per copy (no fixed slot)
  if (!f.length) for (const lv of [1, 2, 3]) {
    const ps = Array.from({ length: 20 }, (_, s) => plan(b, 'mark', lv, makeRng('opinion-writing-g3|mark|' + lv + '|' + (s + 1)), s + 1));
    if (new Set(ps.map((p) => p.fo.map((x) => x.kind[0]).join(''))).size < 3) f.push(`mark level ${lv}: the facts and opinions stand in fewer than three orders over 20 copies`);
    if (LEVELS.mark[lv].off && new Set(ps.map((p) => p.sents.findIndex((x) => x.role === 'off'))).size < 2) f.push(`mark level ${lv}: the fact about something else stands in one place over 20 copies`);
  }
  return f;
}
{ const f = faultsOf(BANK); if (f.length) throw new Error('opinion-writing-g3.en.json: ' + f.join('; ')); }

/* ------------------------------------------------------------------ the parts of a page */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}[data-lcs-label] b,[data-lcs-ruletext] b{color:' + T.teal + ';font-weight:800}</style>';   // before the root: verify counts the root's children as blocks
/** In this font an f before i, f, l, or t and a t before t touch the next letter even with ligatures off: every such f or t
 *  gets a little room of its own (text inside tags is left alone) */
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
/** Typographic apostrophes and quotation marks in the TEXT of a page or a key (never in a tag or an attribute) */
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
const cream = (attrs, inner, pad = 7, gap = 5, more = '') => `<div ${attrs} data-lcs-card style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (k, html, px = LABEL) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${k ? `<span style="color:${T.teal}">${k}.</span> ` : ''}${html}</div>`;
const num = (k) => `<span data-lcs-num style="flex:0 0 auto;align-self:flex-start;display:inline-block;min-width:22px;font:800 ${READ}px/1.3 'Nunito',sans-serif;color:${T.teal}">${k}.</span>`;
const VARY = `<span data-lcs-vary style="color:${T.coral}">(Sample answer.)</span>`;
/** the note of a sample of the child's own piece: the prompt it answers */
const varyFor = (q) => `<span data-lcs-vary data-lcs-varyfor="${A(q)}" style="font-size:15px;color:${T.coral}">${esc(sampleFor(q))}</span>`;
const CHECK = `<svg data-lcs-check width="20" height="20" viewBox="0 0 20 20" style="display:block"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
/** a single ruled line: what is printed on it in ink (a frame, a starter, an organizer word; a frame's end mark at its
 *  right end), the key's sample in teal */
function wline({ w, starter, end, answer }) {
  const lead = answer && starter && !/^[,.?!]/.test(answer) ? 6 : 0;
  return `<div data-lcs-line${starter ? ` data-lcs-starter="${A(starter)}"` : ''}${end ? ` data-lcs-end="${A(end)}"` : ''}${answer ? ` data-lcs-answer="${A(answer)}"` : ''} style="box-sizing:border-box;flex:0 0 auto;width:${w}px;height:${ROW}px;border-bottom:2px solid ${T.inkSoft};display:flex;align-items:flex-end;padding:0 3px 4px;overflow:hidden">` +
    (starter ? `<span data-lcs-starttext data-lcs-read style="flex:0 0 auto;white-space:nowrap;font:700 ${STARTPX}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(starter)}</span>` : '') +
    (answer ? `<span data-lcs-keytext style="flex:0 1 auto;min-width:0;margin-left:${lead}px;white-space:nowrap;font:700 ${KEYPX}px/1 'Nunito',sans-serif;color:${T.teal}">${esc(answer)}</span>` : '') +
    (end ? `<span data-lcs-endtext data-lcs-read style="margin-left:auto;flex:0 0 auto;font:700 ${STARTPX}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(end)}</span>` : '') + `</div>`;
}
/** a part the child writes in: its label above its lines; on the key, the sample placed as a child writes it */
function part(name, labelText, lines, sents, key, more = '', flow = null) {
  // flow: the key writes its sample to the end of each line in its own letters (flow.sents: each starting where it says)
  const texts = key ? (flow ? placeKey(lines, flow.sents || sents) : place(lines, sents)) : null;
  if (key && !texts) throw new Error(`opinion-writing-g3: the part ${name} cannot hold its sample`);
  return `<div data-lcs-wpart="${name}" data-lcs-expect="${A(sents.map((s) => s.full).join(' '))}"${flow ? ' data-lcs-flow="1"' : ''} style="display:flex;flex-direction:column;gap:0;${more}">` +
    (labelText ? `<div data-lcs-wlabel style="font:800 16px/1.05 'Nunito',sans-serif;color:${T.teal}">${esc(labelText)}</div>` : '') +
    lines.map((ln, i) => wline({ ...ln, answer: texts && texts[i] ? texts[i] : null })).join('') + `</div>`;
}
const ruleBox = (title, rows, attrs = '', corner = '') => `<div data-lcs-rulebox data-lcs-card ${attrs} style="position:relative;display:flex;flex-direction:column;gap:2px;padding:5px 14px 7px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` + corner +
  `<div data-lcs-boxtitle style="font:700 19px/1.15 'Baloo 2',cursive;color:${T.teal}">${esc(title)}</div>` + rows.map((r) => `<div data-lcs-ruletext style="font:700 ${RULEPX}px/1.25 'Nunito',sans-serif;color:${T.ink}">${r}</div>`).join('') + `</div>`;
const wordBank = (list, title = 'Word bank:') => `<div data-lcs-wordbank style="display:flex;flex-wrap:wrap;align-items:baseline;gap:3px 12px;padding:3px 10px 4px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF"><span style="font:800 15px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(title)}</span>${list.map((w) => `<span data-lcs-bankword data-lcs-read style="font:700 17px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</span>`).join('')}</div>`;
const checkBox = (k = '') => `<span data-lcs-box${k ? ` data-lcs-boxfor="${k}"` : ''} style="box-sizing:border-box;flex:0 0 auto;display:inline-block;width:22px;height:22px;border:2.5px solid ${T.ink};border-radius:5px;background:#FFFFFF"></span>`;
/** a word or a phrase to circle; the key rings the right one */
const opt = (text, ok, key) => `<span data-lcs-opt="${A(text)}"${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;white-space:nowrap;font:800 ${OPT}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 12px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
/** a blank inside a printed sentence; the key writes its answer in it */
const BLANKW = 64;   // a gap in a printed sentence (G3-550: the child circles the word; G3-554: the child writes it, see EBLANKW)
const EBLANKW = Math.ceil(14 * CHILD + 12);   // G3-554: the longest word the child writes in the gap (Another reason) at a child's letter width
const blank = (want, key, w = BLANKW) => `<span data-lcs-blank data-lcs-want="${A(want)}" style="position:relative;display:inline-block;box-sizing:border-box;width:${w}px;height:1.15em;vertical-align:-0.22em;border-bottom:2.5px solid ${T.ink}">${key ? `<span data-lcs-blankkey style="position:absolute;left:0;right:0;bottom:4px;text-align:center;white-space:nowrap;font:700 16px/1 'Nunito',sans-serif;color:${T.teal}">${esc(want)}</span>` : ''}</span>`;
const withBlank = (t, want, key) => { const [a, c] = String(t).split('___'); return `<span data-lcs-read data-lcs-sent style="font:700 ${READ}px/1.5 'Nunito',sans-serif;color:${T.ink}">${a.trim() ? esc(a.trimEnd()) + ' ' : ''}${blank(want, key)}${/^[.,?!]/.test(c) ? '' : ' '}${esc(c.trimStart())}</span>`; };
const shownWord = (w, atStart) => (atStart ? cap(w) : w);
const NUMW = { 4: 'four', 5: 'five', 6: 'six' };
const orList = (ws) => (ws.length === 2 ? `${ws[0]} or ${ws[1]}` : `${ws.slice(0, -1).join(', ')}, or ${ws[ws.length - 1]}`);
const LETTER = { close: 'C', reason: 'R', subject: 'X' };

/* ------------------------------------------------------------------ the blocks of each page */
function render(P, key) {
  const b = [];
  if (P.mode === 'mark') {
    b.push(ruleBox('Parts of an opinion piece', MARKRULES.map(([k, v]) => `<b>${k}</b>: ${esc(v)}`)));
    const head = `<div data-lcs-thead style="display:flex;align-items:flex-end;padding:0 10px"><span style="flex:1 1 auto"></span>${['fact', 'opinion'].map((c) => `<span data-lcs-col="${c}" style="flex:0 0 92px;text-align:center;font:800 16px/1.1 'Nunito',sans-serif;color:${T.teal}">${c}</span>`).join('')}</div>`;
    b.push(cream('data-lcs-task="fo"', label(1, LINES.fo[P.lv]) + head + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:2px">` +
      P.fo.map((x, i) => `<div data-lcs-item data-lcs-forow="${x.kind}" data-lcs-text="${A(x.t)}" style="display:flex;align-items:center;padding:1px 10px;border-radius:10px;background:#FFFFFF">${num(i + 1)}<span data-lcs-read style="flex:1 1 auto;min-width:0;font:700 17px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x.t)}</span>` +
        ['fact', 'opinion'].map((c) => `<span data-lcs-cell="${c}" style="flex:0 0 92px;display:flex;justify-content:center"><span data-lcs-tick="${c}" style="box-sizing:border-box;width:25px;height:25px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF">${key && c === x.kind ? CHECK : ''}</span></span>`).join('') + `</div>`).join('') + `</div>`, 7, 4, 'flex:1 1 auto'));
    // a sentence number is an inline box with no break after it, so it never ends a line apart from its sentence
    const piece = P.sents.map((s, i) => `<span data-lcs-sent="${i + 1}" data-lcs-role="${s.role}"><span data-lcs-snum style="display:inline;margin-right:4px;padding:0 5px;font:800 16px/1.3 'Nunito',sans-serif;color:${T.teal};border:2.5px solid ${key && s.role === 'reason' ? T.teal : 'transparent'};border-radius:999px">${i + 1}</span>` +
      `<span data-lcs-stext style="${key && s.role === 'op' ? `text-decoration:underline;text-decoration-color:${T.teal};text-decoration-thickness:3px;text-underline-offset:5px;` : key && s.role === 'off' ? `text-decoration:line-through;text-decoration-color:${T.teal};text-decoration-thickness:3px;` : ''}border:2.5px solid ${key && s.role === 'close' ? T.teal : 'transparent'};border-radius:5px;padding:0 2px;box-decoration-break:clone;-webkit-box-decoration-break:clone">${esc(s.text)}</span></span>`).join(' ');
    b.push(cream(`data-lcs-task="mark" data-lcs-tkey="${P.t.key}"`, label(2, LINES.mark[P.lv]) + `<div data-lcs-piece data-lcs-read style="padding:1px 12px 3px;border-radius:12px;background:#FFFFFF;font:700 17px/1.7 'Nunito',sans-serif;color:${T.ink}">${piece}</div>`, 7, 5));
    const m = moreParts(P.lv, P.more);
    b.push(cream('data-lcs-task="more"', label(3, LINES.more + (key ? ' ' + VARY : '')) + part('more', '', m.lines, m.sents, key), 7, 3));
  }
  if (P.mode === 'plan') {
    const qs = `<div data-lcs-qs style="display:flex;gap:10px">` + P.qs.map((p, i) => `<span data-lcs-q="${p.key}"${i === P.sampleAt ? ' data-lcs-ok="1"' : ''} data-lcs-read style="flex:1 1 0;min-width:0;box-sizing:border-box;padding:3px 12px;border:3px solid ${key && i === P.sampleAt ? T.teal : T.creamDeep};border-radius:16px;background:#FFFFFF;font:700 17px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(p.q)}</span>`).join('') + `</div>`;
    const model = `<div data-lcs-model="${P.model.key}" data-lcs-small style="font:700 ${SMALL}px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">A plan for another question.</b> Opinion: ${esc(P.model.op)} Reason: ${esc(P.model.rs[0][0])}. Example: ${esc(P.model.rs[0][1])}.</div>`;
    b.push(cream('data-lcs-task="q"', label(1, LINES.q) + qs + model, 6, 4));
    const parts = planParts(P.lv, P.qs[P.sampleAt]);
    b.push(cream('data-lcs-task="plan"', label(2, LINES.plan + (key ? ' ' + VARY : '')) + (P.lv === 3 ? wordBank(WORDBANK) : '') + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:1px">` +
      parts.map((pt) => `<div data-lcs-item data-lcs-ppart="${pt.name}" style="padding:0 8px 0;border-radius:12px;background:#FFFFFF">${part(pt.name, pt.label, pt.lines, pt.sents, key)}</div>`).join('') + `</div>`, 6, 4, 'flex:1 1 auto'));
    b.push(cream('data-lcs-task="check"', label(3, LINES.planCheck) + `<div data-lcs-checks style="display:flex;flex-wrap:wrap;gap:3px 22px">` + PLANCHECK.map((t) => `<span data-lcs-checkrow="${A(t)}" style="display:flex;align-items:flex-start;gap:7px">${checkBox()}<span data-lcs-read style="font:700 17px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span></span>`).join('') + `</div>`, 5, 3));
  }
  if (P.mode === 'link') {
    const d = LEVELS.link[P.lv];
    b.push(`<div data-lcs-wordbox data-lcs-card style="display:grid;grid-template-columns:1fr 1fr;gap:3px 16px;padding:6px 14px 7px;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF">` +
      COORD.map((w) => `<div data-lcs-boxword="${w}" style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="font:800 ${OPT - 2}px/1.2 'Nunito',sans-serif;color:${T.teal}">${w}</b> ${esc(BANK.link.jobs[w])}</div>`).join('') + `</div>`);
    b.push(cream('data-lcs-task="gaps"', label(1, LINES.link) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">` +
      P.items.map((x, i) => { const st = x.at === 'start'; return `<div data-lcs-item data-lcs-gap="${x.kind}" data-lcs-at="${x.at}" data-lcs-text="${A(x.t)}" data-lcs-right="${A(x.right)}" style="display:flex;gap:6px;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<div style="flex:1 1 auto;min-width:0;line-height:1.7">${withBlank(x.t, shownWord(x.right, st), false)}<span data-lcs-opts style="display:inline-flex;gap:8px;margin-left:14px;vertical-align:middle;white-space:nowrap">${x.opts.map((o) => opt(shownWord(o, st), o === x.right, key)).join('')}</span></div></div>`; }).join('') + `</div>`, 7, 4, 'flex:1 1 auto'));
    b.push(cream('data-lcs-task="join"', label(2, LINES.join[P.lv] + (key ? ' ' + VARY : '')) + `<div style="display:flex;flex-direction:column;gap:4px">` + P.joins.map((j, i) => {
      const since = !!d.since && i === 1, s = joinSample(j, since);
      return `<div data-lcs-item data-lcs-join="${A(j.op)}" data-lcs-since="${since ? 1 : 0}" style="padding:2px 10px 2px;border-radius:12px;background:#FFFFFF"><div style="display:flex;gap:6px">${num(i + 1)}<span data-lcs-read data-lcs-jtext style="font:700 17px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">Opinion:</b> ${esc(j.op)} <b style="color:${T.teal};margin-left:10px">Reason:</b> ${esc(j.r)}</span></div>` +
        part('join' + (i + 1), '', [{ w: ITEMW }, { w: ITEMW }], [{ at: 0, full: s, text: s }], key) +
        `<div data-lcs-alsorow style="min-height:14px;text-align:right;font:700 13px/1.15 'Nunito',sans-serif;color:${T.teal}">${key && !since ? `<span data-lcs-also>${esc(ALSOJOIN)}</span>` : ''}</div></div>`; }).join('') + `</div>`, 7, 4));
  }
  if (P.mode === 'draft') {
    const parts = draftParts(P.lv, P.qs[P.sampleAt]);
    const left = parts.map((pt) => part(pt.name, pt.label, pt.lines, pt.sents, key, '', {})).join('') +
      (P.lv < 3 ? `<div data-lcs-draftnote data-lcs-small style="font:700 ${SMALL}px/1.25 'Nunito',sans-serif;color:${T.teal}">${esc(LINES.draftNote)}</div>` : '');
    const mt = P.model;
    const sm = (html, attrs = '', lh = 1.3) => `<div data-lcs-small ${attrs} style="font:700 ${SMALL}px/${lh} 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
    const head = (t) => `<div data-lcs-mhead style="font:800 15px/1.15 'Nunito',sans-serif;color:${T.teal}">${t}</div>`;
    // level 3: the word bank names the words only, and the model is a whole small piece
    const margin = (P.lv === 3
      ? `<div data-lcs-mbox="words" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:1px">${head('Word bank')}${BANK.link.margin.map(([w]) => sm(`<b>${esc(w)}</b>`, `data-lcs-mword="${w}"`)).join('')}</div>`
      : `<div data-lcs-mbox="words" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:2px">${head('Linking words')}${BANK.link.margin.map(([w, j]) => sm(`<b>${esc(w)}</b>: ${esc(j)}`, `data-lcs-mword="${w}"`)).join('')}</div>`) +
      `<div data-lcs-mbox="model" data-lcs-modelkey="${mt.key}" style="display:flex;flex-direction:column;gap:2px">${head('A model')}${sm(P.lv === 3 ? modelPiece(mt, true) : `${esc(mt.op)} <b>One reason</b> is that ${esc(mt.rs[0][0])}. <b>For example</b>, ${esc(mt.rs[0][1])}.`, 'data-lcs-model', P.lv === 3 ? 1.2 : 1.3)}</div>` +
      `<div data-lcs-mbox="check" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:3px">${head('Check')}${DRAFTCHECK[P.lv].map((t) => `<div data-lcs-checkrow="${A(t)}" style="display:flex;align-items:flex-start;gap:5px">${checkBox()}<span data-lcs-small style="font:700 ${SMALL}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span></div>`).join('')}</div>`;
    b.push(cream('data-lcs-task="ideas"', label(1, LINES.draftQ) + `<div data-lcs-qs style="display:flex;gap:10px">` + P.qs.map((p, i) => `<span data-lcs-idea="${p.key}"${i === P.sampleAt ? ' data-lcs-ok="1"' : ''} data-lcs-read style="flex:1 1 0;min-width:0;box-sizing:border-box;padding:3px 12px;border:3px solid ${key && i === P.sampleAt ? T.teal : T.creamDeep};border-radius:16px;background:#FFFFFF;font:700 17px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(p.q)}</span>`).join('') + `</div>`, 6, 4));
    b.push(cream('data-lcs-task="draft"', label(2, LINES.draft + (key ? ' ' + VARY : '')) + `<div style="flex:1 1 auto;display:flex;gap:14px">` +
      `<div data-lcs-draftlines style="flex:0 0 ${DRAFTW}px;width:${DRAFTW}px;display:flex;flex-direction:column;justify-content:space-between;gap:0">${left}</div>` +
      `<div data-lcs-margin style="flex:0 0 ${MARGIN}px;width:${MARGIN}px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;gap:4px;padding:6px 8px;border-left:2.5px dashed ${T.teal};background:#FFFFFF;border-radius:0 12px 12px 0">${margin}</div></div>`, 7, 5, 'flex:1 1 auto'));
  }
  if (P.mode === 'pickend') {
    const d = LEVELS.pickend[P.lv];
    b.push(ruleBox('Concluding statements', ENDRULES.map(esc)));
    const ending = (e) => (d.letters
      ? `<div data-lcs-ending="${e.kind}" style="display:flex;align-items:center;gap:8px"><span data-lcs-letterbox style="box-sizing:border-box;flex:0 0 27px;height:27px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF;font:800 18px/1 'Nunito',sans-serif;color:${T.teal}">${key ? LETTER[e.kind] : ''}</span><span data-lcs-read data-lcs-etext style="font:700 17px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(e.text)}</span></div>`
      : `<div data-lcs-ending="${e.kind}" style="display:flex"><span data-lcs-read data-lcs-etext${e.kind === 'close' ? ' data-lcs-ok="1"' : ''} style="padding:0 10px;border:3px solid ${key && e.kind === 'close' ? T.teal : 'transparent'};border-radius:16px;font:700 17px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(e.text)}</span></div>`);
    b.push(cream('data-lcs-task="pick"', label(1, LINES.pick[P.lv]) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:5px">` +
      P.pieces.map((pc, i) => `<div data-lcs-item data-lcs-pc="${pc.t.key}" style="flex:1 1 auto;display:flex;gap:6px;padding:3px 10px 4px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;justify-content:space-around;gap:3px"><div data-lcs-body data-lcs-read style="font:700 17px/1.32 'Nunito',sans-serif;color:${T.ink}">${esc(pc.body.join(' '))}</div>` +
        `<div data-lcs-ends style="display:flex;flex-direction:column;gap:1px;padding:2px 0 0 10px;border-left:3px solid ${T.creamDeep}">${pc.ends.map(ending).join('')}</div></div></div>`).join('') + `</div>`, 7, 5, 'flex:1 1 auto'));
  }
  if (P.mode === 'writeend') {
    const d = LEVELS.writeend[P.lv];
    b.push(ruleBox('Concluding statements', [...ENDRULES.map(esc), `<b>Example.</b> Opinion: <i>${esc(P.ex.op)}</i> Conclusion: <i>${esc(P.ex.close)}</i>`], `data-lcs-extopic="${P.ex.key}"`));
    if (P.lv === 3) b.push(wordBank(ENDBANK));
    const sig = P.lv < 3;
    const one = (k, task, t, ending) => { const e = endParts(P.lv, k, t.why, t.close, ENDLINES[task]);
      return cream(`data-lcs-task="${task}" data-lcs-tkey="${t.key}"`, label(k + 1, LINES[task] + (key ? ' ' + VARY : '')) + `<div data-lcs-body data-lcs-read style="padding:2px 10px 3px;border-radius:12px;background:#FFFFFF;font:700 17px/1.32 'Nunito',sans-serif;color:${T.ink}">${esc(pieceBody(t, sig).join(' '))}${ending ? ` <span data-lcs-weak>${esc(ending)}</span>` : ''}</div>` + part(task, '', e.lines, e.sents, key), 6, 4); };
    b.push(one(0, 'weak', P.weakT, P.weak), one(1, 'none', P.noneT, ''));
    const o = endParts(P.lv, 2, P.own.cl, `That is why ${P.own.cl}.`, ENDLINES.own);
    b.push(cream(`data-lcs-task="own" data-lcs-pkey="${P.own.key}"`, label(3, LINES.own + (key ? ' ' + varyFor(P.own.q) : '')) + part('own', '', o.lines, o.sents, key), 6, 3));
  }
  if (P.mode === 'edit') {
    const d = LEVELS.edit[P.lv];
    // the key names the other right word where because and since both fit the blank
    const alsoB = key && P.linkKind === 'because' ? `<span data-lcs-alsoblank style="position:absolute;top:8px;right:14px;font:800 15px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc('Blank: ' + P.right + ' ' + ALSOBLANK[P.right])}</span>` : '';
    b.push(ruleBox(`Find and fix ${d.faults.length} mistakes`, d.faults.map((k) => esc(FIXROWS[k].replace('{W}', orList(P.opts)))), '', alsoB));
    const F = P.faults;
    const html = P.s.map((x, i) => {
      let h;
      const t = x.text;
      if (i === F.link) h = P.linkKind === 'because' ? (() => { const [a, c] = t.split(' because '); return `${esc(a)} ${blank(P.right, key, EBLANKW)} ${esc(c)}`; })() : `${blank(P.right, key, EBLANKW)}${esc(t.slice('Another reason'.length))}`;
      else if (i === F.cap) h = `<span data-lcs-fault="cap" data-lcs-fix="${t[0]}" style="position:relative">${t[0].toLowerCase()}${key ? `<span data-lcs-fixmark style="position:absolute;left:-1px;top:-0.9em;font:800 17px/1 'Nunito',sans-serif;color:${T.teal}">${t[0]}</span>` : ''}</span>${esc(t.slice(1))}`;
      else if (i === F.end) h = `${esc(t.slice(0, -1))}<span data-lcs-fault="end">${key ? `<span data-lcs-fixmark style="font-weight:800;color:${T.teal}">.</span>` : ''}</span>`;
      else if (i === F.comma) h = `For example<span data-lcs-fault="comma">${key ? `<span data-lcs-fixmark style="font-weight:800;color:${T.teal}">,</span>` : ''}</span> ${esc(t.slice('For example, '.length))}`;
      else if (i === F.spell) { const w = F.spellWord, re = new RegExp('\\b' + w + '\\b', 'i'), m = t.match(re), mis = BANK.spell[w], shown = m[0][0] === m[0][0].toUpperCase() ? cap(mis) : mis, fix = m[0];
        h = `${esc(t.slice(0, m.index))}<span data-lcs-fault="spell" data-lcs-fix="${fix}" style="position:relative">${shown}${key ? `<span data-lcs-fixmark style="position:absolute;left:0;top:-0.95em;white-space:nowrap;font:800 15px/1 'Nunito',sans-serif;color:${T.teal}">${fix}</span>` : ''}</span>${esc(t.slice(m.index + m[0].length))}`; }
      else if (i === F.off) h = `<span data-lcs-fault="off" style="${key ? `text-decoration:line-through;text-decoration-color:${T.teal};text-decoration-thickness:3px;` : ''}">${esc(t)}</span>`;
      else h = esc(t);
      return `<span data-lcs-esent="${i}" data-lcs-role="${x.role}"${x.k !== undefined ? ` data-lcs-k="${x.k}"` : ''}>${h}</span>`;
    }).join(' ');
    b.push(cream(`data-lcs-task="edit" data-lcs-tkey="${P.t.key}" data-lcs-link="${P.linkKind}" data-lcs-opts="${A(P.opts.join('|'))}"`, label(1, LINES.edit.replace('{N}', NUMW[d.faults.length])) + `<div data-lcs-para data-lcs-read style="padding:8px 12px 4px;border-radius:12px;background:#FFFFFF;font:700 ${READ}px/${P.lv === 1 ? 2.5 : P.lv === 2 ? 2.25 : 2.1} 'Nunito',sans-serif;color:${T.ink}">${html}</div>`, 7, 4));
    // the key writes each fixed sentence on a new line, to the end of the line; the child's room is the same text run on
    const fl = editRewriteList(P.s, P.faults, P.right), fx = fl.join(' ');
    b.push(cream('data-lcs-task="rewrite"', label(2, LINES.rewrite) + part('rewrite', '', Array.from({ length: d.rewrite }, () => ({ w: INNER })), [{ at: 0, full: fx, text: fx }], key, 'flex:1 1 auto;justify-content:space-between', { sents: fl.map((t) => ({ text: t })) }), 7, 3, 'flex:1 1 auto'));
  }
  if (P.mode === 'revise') {
    const d = LEVELS.revise[P.lv];
    b.push(ruleBox('How writers revise and edit', P.ex.map((x) => `<span data-lcs-rev="${A(x.b)}"><b>Before:</b> ${esc(x.b)} <b>After:</b> ${esc(x.a)} <i>(${esc(x.how)})</i></span>`)));
    const head = `<div data-lcs-thead style="display:flex;align-items:flex-end;padding:0 10px"><span style="flex:1 1 auto"></span>${['Me', 'My partner'].map((c) => `<span data-lcs-col="${c}" style="flex:0 0 92px;text-align:center;font:800 16px/1.1 'Nunito',sans-serif;color:${T.teal}">${c}</span>`).join('')}</div>`;
    b.push(cream('data-lcs-task="check"', label(1, LINES.check) + head + `<div style="display:flex;flex-direction:column;gap:2px">` +
      REVCHECK.slice(0, d.checks).map((t, i) => `<div data-lcs-item data-lcs-checkrow="${A(t)}" style="display:flex;align-items:center;padding:0 10px;border-radius:10px;background:#FFFFFF">${num(i + 1)}<span data-lcs-read style="flex:1 1 auto;min-width:0;font:700 17px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span>${['Me', 'My partner'].map((c) => `<span data-lcs-cell="${c}" style="flex:0 0 92px;display:flex;justify-content:center">${checkBox(c)}</span>`).join('')}</div>`).join('') + `</div>`, 7, 4));
    const ps = PEER[P.own.key.length % PEER.length];
    b.push(cream('data-lcs-task="peer"', label(2, LINES.peer + (key ? ' ' + VARY : '')) + `<div data-lcs-item style="display:flex;flex-direction:column;gap:3px;padding:1px 10px 3px;border-radius:12px;background:#FFFFFF">` +
      part('name', '', [{ w: 300, starter: 'Partner:' }], [{ at: 0, full: 'Partner:', text: '' }], false) +
      part('like', 'One thing I like:', Array.from({ length: d.peerLines }, () => ({ w: ITEMW })), [{ at: 0, full: ps[0], text: ps[0] }], key) +
      part('add', 'One thing to add or fix:', Array.from({ length: d.peerLines }, () => ({ w: ITEMW })), [{ at: 0, full: ps[1], text: ps[1] }], key) + `</div>`, 7, 4));
    const own = d.change ? `I added the reason that ${P.own.rs[2][0]}.` : `For example, ${P.own.rs[0][1]}.`;
    b.push(cream(`data-lcs-task="own" data-lcs-pkey="${P.own.key}"`, label(3, (d.change ? LINES.change : LINES.add) + (key ? ' ' + varyFor(P.own.q) : '')) + part('own', '', Array.from({ length: d.ownLines }, () => ({ w: INNER })), [{ at: 0, full: own, text: own }], key), 7, 3));
  }
  return b;
}

/** verify()'s OWN copy of every text a page must print and every measure it is held to: the check does not read the
 *  build's constants, so a build that changes one of them fails its pages */
const SPEC = {
  INSTR: {
    mark: { 1: 'An opinion tells what a writer thinks. A reason tells why.', 2: 'An opinion piece states an opinion and gives reasons for it.', 3: 'Not every sentence is a reason. Look for the ones that tell why.' },
    plan: { 1: 'A plan has an introduction, an opinion, reasons, and a conclusion.', 2: 'Plan before you write: an opinion and reasons that tell why.', 3: 'Plan your opinion piece in notes. Use the word bank if you need it.' },
    link: { 1: 'Linking words connect an opinion and its reasons.', 2: 'Because and since tell why. Therefore tells what happens as a result.', 3: 'Choose each linking word by its job in the sentence.' },
    draft: { 1: 'Use the frames to write your opinion and three reasons.', 2: 'Write your opinion and reasons. Join them with linking words.', 3: 'Write your whole opinion piece, from introduction to conclusion.' },
    pickend: { 1: 'A concluding statement says the opinion again at the end.', 2: 'A concluding statement says the opinion again in new words.', 3: 'A conclusion does not give a new reason or change the subject.' },
    writeend: { 1: 'End your piece by saying your opinion again in new words.', 2: 'Say your opinion again in new words at the end of your piece.', 3: 'End with a concluding statement in your own words.' },
    edit: { 1: 'Writers read their work again and fix mistakes.', 2: 'Writers read their work again to fix capitals, end marks, and commas.', 3: 'Edit like a writer: check every sentence, word, and mark.' },
    revise: { 1: 'Writers make their work better before they share it.', 2: 'Revise your opinion piece with a checklist and a partner.', 3: 'Revise your opinion piece, then tell one change you made.' },
  },
  TASK: {
    fo: { 1: 'Read each sentence. Put a check mark under fact or opinion.', 2: 'Read each sentence. Put a check mark under fact or opinion.', 3: 'Read each sentence. Ask: Can it be checked? Put a check mark under fact or opinion.' },
    mark: { 1: 'Read the opinion piece. Underline the opinion. Circle the number of each reason. Draw a box around the conclusion.', 2: 'Read the opinion piece. Underline the opinion. Circle the number of each reason. Cross out the sentence that does not belong. Draw a box around the conclusion.', 3: 'Read the opinion piece. Underline the opinion. Circle the number of each reason. Cross out the sentence that does not belong. Draw a box around the conclusion.' },
    more: 'Write one more reason the writer could give.', q: 'Choose one question. Circle it.', plan: 'Plan your opinion piece.', planCheck: 'Check your plan. Put a check mark in each box that is true.',
    link: 'Circle the linking word that fits each blank.',
    join: { 1: 'Join the opinion and the reason. Use because or since. Write one sentence.', 2: 'Join the opinion and the reason. Use because or since. Write one sentence.', 3: 'Join each opinion and its reason in one sentence. Use because or since. Start number 2 with Since.' },
    draftQ: 'Choose one question and circle it, or use your own plan.', draft: 'Write your opinion piece.', draftNote: 'You will add your conclusion in the next lesson.',
    pick: { 1: 'Read each piece. Circle its concluding statement.', 2: 'Read each piece. Next to each ending, write C for the concluding statement, R for the new reason, or X for the sentence that changes the subject.', 3: 'Read each piece. Next to each ending, write C for the concluding statement, R for the new reason, or X for the sentence that changes the subject.' },
    weak: 'The ending is weak. Write a better conclusion.', none: 'There is no ending. Write a concluding statement.', own: 'Write a conclusion for the piece you drafted. Add it to your draft.',
    edit: 'Read the paragraph. Find and fix the {N} mistakes.', rewrite: 'Write each sentence you fixed, with no mistakes.',
    check: 'Check your piece in the Me boxes. Then a partner checks it.', peer: 'Partner: read the piece and write a comment.',
    change: 'Write one change you made to your piece.', add: 'Write a sentence to add. Use a linking word.',
  },
  MARKRULES: ['Opinion: tells what the writer thinks. People can disagree with it.', 'Fact: can be checked and proved true. A fact can use a word like biggest if it can be checked.', 'Reason: tells why the writer thinks so.', 'Example: shows that a reason is true. It often starts with For example.', "Conclusion: says the writer's opinion again at the end."],
  FRAME: { intro: ['Have you ever thought about', '?'], op: ['I think', '.'], r1: ['One reason is that', '.'], r2: ['Another reason is that', '.'], r3: ['The last reason is that', '.'], ex: ['For example,', '.'], close: ['That is why', '.'] },
  STARTER: { intro: 'Have you ever thought about', op: 'I think', r1: 'One reason', r2: 'Another reason', r3: 'The last reason', ex: 'For example', close: 'That is why' },
  NOTEWORD: { intro: 'Topic:', op: 'Opinion:', r: 'Reason:', ex: 'Example:', close: 'Conclusion:' },
  WORDBANK: ['I think', 'In my opinion', 'because', 'since', 'For example', 'That is why'],
  PLANCHECK: ['I introduced the topic.', 'I stated my opinion.', 'I wrote three reasons, each with a fact or an example.', 'I planned a conclusion that says my opinion again.'],
  DRAFTCHECK: { 1: ['Each reason has a fact or an example.', 'I used because or since at least once.'], 2: ['Each reason has a fact or an example.', 'I used because or since at least once.'], 3: ['Each reason has a fact or an example.', 'I used linking words.', 'My last part says my opinion again.'] },
  DRAFTPARTS: { 1: ['intro', 'reason1', 'reason2', 'reason3'], 2: ['intro', 'reason1', 'reason2', 'reason3'], 3: ['intro', 'reason1', 'reason2', 'reason3', 'close'] },
  DRAFTLABEL: { intro: 'Introduction and opinion', reason1: 'Reason 1 and an example', reason2: 'Reason 2 and an example', reason3: 'Reason 3 and an example', close: 'Conclusion' },
  WORDS4: ['because', 'since', 'therefore', 'for example'],
  JOBS: { because: 'tells why (gives a reason)', since: 'tells why (gives a reason)', therefore: 'tells what happens as a result', 'for example': 'gives an example' },
  MARGIN: [['because', 'tells why'], ['since', 'tells why'], ['therefore', 'tells what happens as a result'], ['for example', 'gives an example'], ['another reason', 'adds a reason']],
  ENDFRAME: ['That is why', '.'], ENDSTARTERS: ['For all these reasons,', 'As you can see,', 'That is why'], ENDBANK: ['That is why', 'For all these reasons,', 'As you can see,', 'Now you know why'],
  ENDRULES: ['A concluding statement comes at the end. It says the opinion again in new words.', 'It does not give a new reason. It does not change the subject.'],
  FIXROWS: { cap: 'A sentence starts with a small letter: write the capital letter above it.', end: 'A sentence has no end mark: add the period.', off: 'A sentence does not belong: cross it out.', link: 'A linking word is missing: write {W} in the blank.', comma: 'A comma is missing after For example: add it.', spell: 'A word-wall word is spelled wrong: write it the right way above it.' },
  REVCHECK: ['Each reason has a fact or an example.', 'I used a linking word, such as because.', 'Each sentence has a capital and an end mark.', 'I put a comma after each For example (and after Therefore, if I used it).', 'Word-wall words are spelled like the word wall.', 'My last part says my opinion again in new words.'],
REVTITLE: 'How writers revise and edit',
ALSOJOIN: 'Also right: since; or start with Because or Since and a comma (Since everyone can play, tag is fun.)',
ALSOBLANK: { because: '(since is also right)', since: '(because is also right)' },
SAMPLEFOR: '(Sample for: ',
  SIGNAL: ['One reason is that ', 'Another reason is that ', 'Also, '],
  LETTER: { close: 'C', reason: 'R', subject: 'X' },
  LV: {
    mark: { 1: { fo: 6, reasons: 2, off: 0, signals: true }, 2: { fo: 6, reasons: 3, off: 1, signals: true }, 3: { fo: 6, reasons: 3, off: 1, signals: false } },
    plan: { 1: 'frame', 2: 'starter', 3: 'open' }, draft: { 1: 'frame', 2: 'starter', 3: 'open' }, writeend: { 1: 'frame', 2: 'starter', 3: 'open' },
    link: { 1: { n: 6, opts: 2, joins: 2 }, 2: { n: 6, opts: 3, joins: 2 }, 3: { n: 6, opts: 3, joins: 2, since: true } },
    pickend: { 1: { letters: false, signals: true }, 2: { letters: true, signals: true }, 3: { letters: true, signals: false } },
    edit: { 1: { faults: ['cap', 'end', 'off', 'link'], opts: 2, rewrite: 9, sents: 6 }, 2: { faults: ['cap', 'end', 'off', 'link', 'comma'], opts: 3, rewrite: 8, sents: 7 }, 3: { faults: ['cap', 'end', 'off', 'link', 'comma', 'spell'], opts: 3, rewrite: 8, sents: 8 } },
    revise: { 1: { checks: 3, ownLines: 3, peerLines: 3 }, 2: { checks: 6, ownLines: 3, peerLines: 2 }, 3: { checks: 6, change: true, ownLines: 3, peerLines: 2 } },
  },
  // the measures
  ROW: 34, ROWMAX: 36, CHILD: 14.5, PAD: 6, SEP: 7, GAP: 40, READ: 17, LABEL: 16, OPT: 20, SMALL: 15, RULE: 15, BLANKW: 64, EBLANKW: 215, FILL: 0.8, WMIN: 50, WMAX: 90,
  FULLMIN: 620, DRAFTMIN: 480, PLANLINES: { intro: 3, reason1: 3, reason2: 3, reason3: 3, close: 2 }, DRAFTLINES: { 1: { intro: 4, reason: 4 }, 2: { intro: 4, reason: 4 }, 3: { intro: 3, reason: 4, close: 2 } }, KEYPX: 15, ENDROLES: ['op', 'close'], ENDLINES: { weak: 2, none: 2, own: 3 }, VARY: { mark: 1, plan: 1, link: 1, draft: 1, pickend: 0, writeend: 3, edit: 0, revise: 2 },
  STOP: ['about', 'after', 'again', 'also', 'because', 'before', 'being', 'could', 'every', 'from', 'have', 'here', 'into', 'just', 'like', 'many', 'more', 'most', 'much', 'other', 'over', 'should', 'some', 'than', 'that', 'their', 'them', 'there', 'they', 'this', 'very', 'what', 'when', 'where', 'which', 'while', 'with', 'would', 'your', 'think', 'reason', 'example', 'another', 'those', 'these', 'thing', 'things', 'kids', 'each', 'once', 'only', 'were', 'will', 'does', 'make', 'makes'],
};

function makeOpinionWritingG3Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('opinion-writing-g3: unknown mode ' + mode);
  const set = { mark: 'mark', pickend: 'pick', writeend: 'write', edit: 'edit' }[mode];
  const INFO = {
    topics: Object.fromEntries(BANK.topics.filter((t) => !set || t.set === set || t.set === 'mark').map((t) => [t.key, t])),
    prompts: Object.fromEntries(BANK.prompts.map((p) => [p.key, p])),
    items: mode === 'link' ? Object.fromEntries(BANK.link.items.map((x) => [x.t, x])) : {},
    joins: mode === 'link' ? Object.fromEntries(BANK.link.joins.map((j) => [j.op, j])) : {},
    facts: mode === 'mark' ? BANK.fo.facts : [], opinions: mode === 'mark' ? BANK.fo.opinions : [],
    off: BANK.off.map(offText), offAvoid: Object.fromEntries(BANK.off.map((o) => [offText(o), o.avoid || []])), subj: BANK.subj, weak: BANK.weak, spell: mode === 'edit' ? BANK.spell : {},
    revise: mode === 'revise' ? BANK.revise : [], peer: PEER,
  };
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType,
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
        bodyHtml: STYLE + `<div data-ws-content data-lcs-ow3="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + fRoom(typo(blocks.join(''))) + `</div>`,
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
  const root = document.querySelector('[data-lcs-ow3]');
  if (!root) return ['no page'];
  const [mode, lvS] = root.dataset.lcsOw3.split('|'), lv = +lvS;
  const isKey = root.dataset.lcsIskey === '1';
  const R = (e) => e.getBoundingClientRect(), cs = (e) => getComputedStyle(e), fs = (e) => parseFloat(cs(e).fontSize);
  const straight = (s) => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  const txt = (e) => (e ? straight(e.textContent).replace(/\s+/g, ' ').trim() : '');
  const TEAL = 'rgb(20, 107, 94)';
  const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  const lc1 = (s) => (/^I\b/.test(s) ? s : String(s).charAt(0).toLowerCase() + String(s).slice(1));
  const noEnd = (s) => String(s).replace(/[.?!]$/, '');
  const tok = (s) => String(s).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
  const stem = (w) => w.replace(/(ies)$/, 'y').replace(/(es|s)$/, '');
  const content = (s) => new Set(tok(s).filter((w) => w.length >= 4 && !S.STOP.includes(w)).map(stem));
  const shares = (a, b) => { const B = content(b); return [...content(a)].filter((w) => B.has(w)); };
  const words = (s) => String(s).split(/\s+/).filter(Boolean).length;
  const topicText = (t) => [...t.intro, t.op, ...t.rs.flat(), t.x, t.close].join(' ');
  const rb = R(root);

  // the instruction of this level
  const ins = document.querySelector('[data-lcs-instruction]');
  if (!ins) fails.push('no instruction at the top of the page'); else if (txt(ins) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(ins)}"`);
  // typographic apostrophes and quotes on everything printed
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n, bad = ''; while ((n = tw.nextNode())) if (!n.parentElement.closest('style') && /['"]/.test(n.nodeValue)) { bad = n.nodeValue.trim().slice(0, 30); break; }
    if (!bad && ins && /['"]/.test(ins.textContent)) bad = ins.textContent.trim().slice(0, 30);
    if (bad) fails.push('a straight apostrophe or quotation mark is printed: ' + bad); }
  // letters: ligatures off, an f before i, f, l, t and a t before t with room of its own
  if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
  if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[ifl]/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, or ff may join its letters (ligatures on)');
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('style') && /f[iflt]|tt/.test(n.nodeValue)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.nodeValue.trim().slice(0, 20) + '"'); break; } }
  // no picture: these pages are led by printed words
  if (root.querySelector('img')) fails.push('a picture on a page of printed words');
  // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
  const blocks = [...root.children];
  blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
  root.querySelectorAll('[data-lcs-card]').forEach((c) => { const q = R(c); for (const e of c.querySelectorAll('span, div, b, i, svg')) { const r = R(e); if (r.width && (r.bottom > q.bottom + 0.5 || r.right > q.right + 0.5 || r.left < q.left - 0.5 || r.top < q.top - 0.5)) { fails.push('something leaves its card (' + (c.dataset.lcsTask || Object.keys(c.dataset)[0]) + ')'); break; } } });
  const used = blocks.reduce((s, b) => s + R(b).height, 0);
  if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
  // sizes
  root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < S.READ) fails.push(`text a third grader reads is ${fs(e)} px (${S.READ} or more)`); });
  root.querySelectorAll('[data-lcs-label]').forEach((e) => { if (fs(e) < S.LABEL) fails.push(`a task line smaller than ${S.LABEL} px`); });
  root.querySelectorAll('[data-lcs-opt]').forEach((e) => { if (fs(e) < S.OPT) fails.push(`a word to circle smaller than ${S.OPT} px`); });
  root.querySelectorAll('[data-lcs-ruletext], [data-lcs-boxword], [data-lcs-small], [data-lcs-wlabel], [data-lcs-mhead]').forEach((e) => { if (fs(e) < S.RULE) fails.push(`a box or a label printed smaller than ${S.RULE} px`); });
  // the writing lines
  root.querySelectorAll('[data-lcs-line]').forEach((l) => {
    const h = R(l).height; if (h < S.ROW - 0.5 || h > S.ROWMAX + 0.5) fails.push(`a writing line ${Math.round(h)} px high (${S.ROW} to ${S.ROWMAX})`);
    const k = l.querySelector('[data-lcs-keytext]');
    if (k && (k.scrollWidth > k.clientWidth + 1 || R(k).right > R(l).right + 0.5)) fails.push('a key answer does not fit its line');
    if (k && fs(k) < 13) fails.push('a key answer smaller than 13 px');
    if (!isKey && k) fails.push('a line is filled on the page of the child');
  });
  // every part the child writes in: its label above its lines, its lines hold the sample at a child's letter width with
  // a line to spare (measured on the page and on the key); on the key, the sample itself
  const freeOf = (l) => { const st = l.querySelector('[data-lcs-starttext]'), en = l.querySelector('[data-lcs-endtext]'); return Math.floor((R(l).width - S.PAD - (st ? R(st).width + S.SEP : 0) - (en ? R(en).width + S.SEP : 0)) / S.CHILD); };
  const segmentsOf = (ls, expect) => {
    const pr = ls.map((l) => txt(l.querySelector('[data-lcs-starttext]'))), en = ls.map((l) => txt(l.querySelector('[data-lcs-endtext]')));
    const starts = pr.map((p, i) => (p ? i : -1)).filter((i) => i >= 0);
    if (!starts.length) return [{ at: 0, stop: ls.length, text: expect }];
    if (starts[0] !== 0) return null;
    const segs = []; let rest = expect;
    for (let k = 0; k < starts.length; k++) {
      const i = starts[k], p = pr[i];
      if (!rest.startsWith(p)) return null;
      const body = rest.slice(p.length), nextP = k + 1 < starts.length ? pr[starts[k + 1]] : null;
      let cut = body.length;
      if (nextP) { const j = body.indexOf(' ' + nextP); if (j < 0) return null; cut = j; }
      let seg = body.slice(0, cut).trim(); rest = body.slice(cut).trim();
      if (en[i]) { if (!seg.endsWith(en[i])) return null; seg = seg.slice(0, -en[i].length).trim(); }
      segs.push({ at: i, stop: en[i] ? i + 1 : (k + 1 < starts.length ? starts[k + 1] : ls.length), text: seg });
    }
    return rest ? null : segs;
  };
  const simulate = (segs, free) => { const u = new Set(); for (const s of segs) { let i = s.at, cur = 0; for (const w of s.text.split(' ').filter(Boolean)) { const add = cur ? cur + 1 + w.length : w.length; if (add <= free[i]) { cur = add; u.add(i); continue; } i++; if (i >= s.stop || w.length > free[i]) return null; cur = w.length; u.add(i); } } return u; };
  const parts = {}, spareChild = [], spareKey = [];
  // the key's letters measured in the key's own font (the parts where the key writes to the end of each line)
  const ctx2 = document.createElement('canvas').getContext('2d');
  const keyWidth = (el, s) => { const c = cs(el); ctx2.font = `${c.fontWeight} ${c.fontSize} ${c.fontFamily}`; return ctx2.measureText(s).width; };
  // level 3 of the draft holds its sample with a line to spare in the whole draft, every other part in the part itself
  const taskSpare = mode === 'draft' && lv === 3;
  root.querySelectorAll('[data-lcs-wpart]').forEach((p) => {
    const name = p.dataset.lcsWpart, ls = [...p.querySelectorAll(':scope > [data-lcs-line]')], lab = p.querySelector(':scope > [data-lcs-wlabel]');
    parts[name] = p;
    // the key writes to the end of each line on the draft and in the fixed sentences of the edit page
    const flow = mode === 'draft' || (mode === 'edit' && name === 'rewrite');
    if ((p.dataset.lcsFlow === '1') !== flow) fails.push(`${name}: the key does not write to the end of its lines, or writes so where it should not`);
    if (lab && ls[0] && R(lab).bottom > R(ls[0]).top + 0.5) fails.push(`${name}: its label does not stand above its lines`);
    const exp = straight(p.dataset.lcsExpect || ''), free = ls.map(freeOf), segs = segmentsOf(ls, exp);
    if (!segs) { fails.push(`${name}: the sample does not follow the words printed on its lines`); return; }
    const u = simulate(segs, free);
    if (!u) fails.push(`${name}: the lines do not hold the sample at a child's letter width`);
    else if (taskSpare && parts[name].closest('[data-lcs-draftlines]')) spareChild.push(u.size < ls.length);
    else if (u.size >= ls.length && exp.replace(/^\S+:$/, '')) fails.push(`${name}: the sample leaves no line to spare`);
    if (isKey) {
      const kt = ls.map((l) => txt(l.querySelector('[data-lcs-keytext]')));
      if (!flow) kt.forEach((t, i) => { if (t.length > free[i]) fails.push(`${name}: the key writes ${t.length} letters on a line that holds ${free[i]}`); });
      else {
        // the key's line runs to its end: the next word would not have fit on it (a frame on the next line starts a sentence)
        ls.forEach((l, i) => { const k = l.querySelector('[data-lcs-keytext]'); if (!k || !kt[i] || !kt[i + 1] || ls[i + 1].querySelector('[data-lcs-starttext]')) return;
          if (mode === 'edit' && /[.?!]$/.test(kt[i])) return;
          const en = l.querySelector('[data-lcs-endtext]'), room = (en ? R(en).left : R(l).right - 3) - R(k).left, next = kt[i + 1].split(' ')[0];
          if (keyWidth(k, kt[i] + ' ' + next) <= room - 6) fails.push(`${name}: the key breaks line ${i + 1} before its end ("${kt[i].slice(-15)}" / "${next}")`); });
        if (mode === 'edit' && kt.some((t) => /[.?!] \S/.test(t))) fails.push(`${name}: two fixed sentences share a line (each starts on a new line)`);
      }
      if (taskSpare && parts[name].closest('[data-lcs-draftlines]')) spareKey.push(kt.some((t) => !t));
      else if (!kt.some((t) => !t)) fails.push(`${name}: the key leaves no line to spare`);
      const all = ls.map((l, i) => [txt(l.querySelector('[data-lcs-starttext]')), kt[i], txt(l.querySelector('[data-lcs-endtext]'))].filter(Boolean).join(' ')).filter(Boolean).join(' ').replace(/ ([,.?!])/g, '$1');
      if (all !== exp) fails.push(`${name}: the key does not write its sample ("${all.slice(0, 40)}")`);
    }
  });
  if (taskSpare && !spareChild.some(Boolean)) fails.push('the draft leaves no line to spare at a child\'s letter width');
  if (taskSpare && isKey && !spareKey.some(Boolean)) fails.push('the key of the draft leaves no line to spare');
  // the printed words of a part, line by line: [starter, end]
  const printed = (name) => { const p = parts[name]; return p ? [...p.querySelectorAll(':scope > [data-lcs-line]')].map((l) => [txt(l.querySelector('[data-lcs-starttext]')), txt(l.querySelector('[data-lcs-endtext]'))]) : null; };
  const expectOf = (name) => (parts[name] ? straight(parts[name].dataset.lcsExpect) : null);
  // the key's notes that answers vary: one for each open task
  const vary = root.querySelectorAll('[data-lcs-vary]').length;
  if (vary !== (isKey ? S.VARY[mode] : 0)) fails.push(`${vary} notes that answers vary (${isKey ? S.VARY[mode] : 0} wanted)`);
  // rings: only the key rings, and only the right one
  root.querySelectorAll('[data-lcs-opt], [data-lcs-q], [data-lcs-idea]').forEach((o) => { const ringed = cs(o).borderTopColor === TEAL; if (isKey ? ringed !== !!o.dataset.lcsOk : ringed) fails.push('a choice is ringed on the page of the child, or the key rings the wrong one'); });
  // the places of right answers and the order of kinds
  const patternOf = (o) => { const n = o.length;
    for (const par of [0, 1]) { const sub = o.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
    const runs = []; o.forEach((x, i) => { if (i && x === o[i - 1]) runs[runs.length - 1]++; else runs.push(1); });
    if (runs.length >= 3 && runs[0] >= 2 && runs.slice(0, -1).every((r) => r === runs[0])) return 'runs of one length';
    for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (o[i + k] !== o[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
    if (n >= 6 && [2, 3, 4].some((L) => o.every((x, i) => i < L || x === o[i - L]))) return 'a block repeated to the end';
    return ''; };
  const placesBad = (p, m) => { const n = p.length, count = (v) => p.filter((x) => x === v).length, s = p.join('');
    if (n >= m && new Set(p).size < m) return 'not every place is used';
    if (m === 2 && n >= 4 && (count(0) < 2 || count(1) < 2)) return 'one place is used once';
    if (n >= 4 && Math.max(...Array.from({ length: m }, (_, v) => count(v))) > Math.ceil(n * (m === 2 ? 0.6 : 0.5))) return 'one place holds too many';
    if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return 'three in a row in one place';
    if (m >= 3 && p.some((x, i) => i >= 2 && ((p[i - 1] === p[i - 2] + 1 && x === p[i - 1] + 1) || (p[i - 1] === p[i - 2] - 1 && x === p[i - 1] - 1)))) return 'a staircase';
    if (m === 2 && (/01010|10101/.test(s) || (n >= 4 && p.every((x, i) => !i || x !== p[i - 1])))) return 'every other one';
    return patternOf(p); };
  const orderBad = (o) => { if (o.some((x, i) => i >= 2 && x === o[i - 1] && x === o[i - 2])) return 'three of a kind in a row'; const ks = [...new Set(o)];
    if (ks.length === 2 && o.every((x, i) => !i || x !== o[i - 1])) return 'every other one'; if (ks.length === 2 && /(ab){3}|(ba){3}/.test(o.map((x) => (x === ks[0] ? 'a' : 'b')).join(''))) return 'six alternating';
    if (ks.length >= 3 && o.length > ks.length && o.every((x, i) => i < ks.length || x === o[i - ks.length])) return 'a repeating cycle';
    for (let p = 2; p <= 4; p++) if (o.length >= 2 * p + 2 && o.filter((x, i) => i >= p && x === o[i - p]).length >= o.length - p - 1) return 'a rhythm that repeats every ' + p;
    return patternOf(o); };
  const labelIs = (sel, k, text) => { const c = root.querySelector(sel), l = c && c.querySelector('[data-lcs-label]'); if (!l) { fails.push(`no task line in ${sel}`); return; } const cl = l.cloneNode(true); cl.querySelectorAll('[data-lcs-vary]').forEach((x) => x.remove()); if (txt(cl) !== (k ? k + '. ' : '') + text) fails.push(`the task line "${txt(cl).slice(0, 40)}" is not "${text.slice(0, 40)}"`); };
  const rows = (sel) => [...root.querySelectorAll(sel)].map(txt);
  const sameList = (got, want, what) => { if (got.join('|') !== want.join('|')) fails.push(`${what} is not as ruled ("${got.join(' | ').slice(0, 60)}")`); };
  const printedIs = (name, want) => { const got = printed(name); if (!got) { fails.push(`no part ${name}`); return; } if (got.length !== want.length || got.some((x, i) => x[0] !== want[i][0] || x[1] !== want[i][1])) fails.push(`${name}: the words printed on its lines are not those of level ${lv} (${got.map((x) => x.join('/')).join(' · ')})`); };
  const expectIs = (name, want) => { const e = expectOf(name); if (e === null) fails.push(`no part ${name}`); else if (e !== want) fails.push(`${name}: the sample is not "${want.slice(0, 50)}"`); };
  const widthAtLeast = (name, min) => { const p = parts[name]; if (p) p.querySelectorAll(':scope > [data-lcs-line]').forEach((l) => { if (R(l).width < min - 0.5) fails.push(`${name}: a line ${Math.round(R(l).width)} px wide (${min} or more)`); }); };

  if (mode === 'mark') {
    const d = S.LV.mark[lv];
    sameList(rows('[data-lcs-ruletext]'), S.MARKRULES, 'the box of the parts of an opinion piece');
    labelIs('[data-lcs-task="fo"]', 1, S.TASK.fo[lv]); labelIs('[data-lcs-task="mark"]', 2, S.TASK.mark[lv]); labelIs('[data-lcs-task="more"]', 3, S.TASK.more);
    const fo = [...root.querySelectorAll('[data-lcs-forow]')], kinds = fo.map((r) => r.dataset.lcsForow);
    if (fo.length !== d.fo) fails.push(`${fo.length} sentences in part 1, not ${d.fo}`);
    const card = root.querySelector('[data-lcs-task="mark"]'), t = card && I.topics[card.dataset.lcsTkey];
    fo.forEach((r, i) => {
      const s = straight(r.dataset.lcsText), k = r.dataset.lcsForow, hit = (k === 'fact' ? I.facts : I.opinions).find((x) => x.t === s);
      if (!hit) fails.push(`sentence ${i + 1} of part 1 is not a ${k} of the bank`); else if (hit.hard && lv < 3) fails.push(`level ${lv} holds the level-3 ${k} "${s}"`);
      if (txt(r.querySelector('[data-lcs-read]')) !== s) fails.push(`sentence ${i + 1} of part 1 is not printed as it is filed`);
      if (t && shares(s, topicText(t)).length) fails.push(`sentence ${i + 1} of part 1 is about the topic of the piece`);
      const ticks = [...r.querySelectorAll('[data-lcs-tick]')];
      if (ticks.map((x) => x.dataset.lcsTick).join() !== 'fact,opinion') fails.push(`sentence ${i + 1} of part 1 has no boxes under fact and opinion`);
      ticks.forEach((x) => { if (!!x.querySelector('[data-lcs-check]') !== (isKey && x.dataset.lcsTick === k)) fails.push(`sentence ${i + 1} of part 1: a check mark on the page of the child, or the key checks the wrong box`); });
    });
    if (rows('[data-lcs-col]').join() !== 'fact,opinion') fails.push('the columns of part 1 are not fact and opinion');
    if (kinds.filter((k) => k === 'fact').length < 2 || kinds.filter((k) => k === 'opinion').length < 2) fails.push('part 1 has fewer than two facts or two opinions');
    { const bad = orderBad(kinds); if (bad) fails.push('facts and opinions of part 1 stand in a pattern: ' + bad); }
    if (lv === 3 && (!fo.some((r) => r.dataset.lcsForow === 'fact' && (I.facts.find((x) => x.t === straight(r.dataset.lcsText)) || {}).hard) || !fo.some((r) => r.dataset.lcsForow === 'opinion' && (I.opinions.find((x) => x.t === straight(r.dataset.lcsText)) || {}).hard))) fails.push('level 3 has no fact with a word like tallest or no opinion without best or should');
    if (!t || t.set !== 'mark') fails.push('the piece is not a piece of this page');
    else {
      const ss = [...card.querySelectorAll('[data-lcs-sent]')];
      ss.forEach((s, i) => { if (s.dataset.lcsSent !== String(i + 1) || txt(s.querySelector('[data-lcs-snum]')) !== String(i + 1)) fails.push(`sentence ${i + 1} of the piece does not carry its number`); });
      const roles = ss.map((s) => s.dataset.lcsRole), texts = ss.map((s) => txt(s.querySelector('[data-lcs-stext]')));
      const R2 = (k) => (d.signals ? S.SIGNAL[k] + t.rs[k][0] + '.' : cap(t.rs[k][0]) + '.'), E2 = (k) => 'For example, ' + t.rs[k][1] + '.';
      const want = [...t.intro.map((x) => ['intro', x]), ['op', t.op], ['reason', R2(0)], ['example', E2(0)], ['reason', R2(1)], ['example', E2(1)], ...(d.reasons === 3 ? [['reason', R2(2)]] : []), ['close', t.close]];
      const offs = roles.map((r, i) => (r === 'off' ? i : -1)).filter((i) => i >= 0), got = roles.map((r, i) => [r, texts[i]]).filter((x) => x[0] !== 'off');
      if (got.map((x) => x.join(':')).join('|') !== want.map((x) => x.join(':')).join('|')) fails.push('the piece is not printed as it is filed, in the order of its parts');
      if (offs.length !== d.off) fails.push(`${offs.length} facts about something else, not ${d.off}`);
      offs.forEach((i) => { const ex1 = roles.indexOf('example'); if (!I.off.includes(texts[i]) || shares(texts[i], topicText(t)).length || (I.offAvoid[texts[i]] || []).includes(t.key)) fails.push(`"${texts[i]}" is not a fact about something else`); if (i < ex1 || i > roles.lastIndexOf('reason') + 1) fails.push('the fact about something else does not stand among the reasons'); });
      const n = words(texts.join(' ')); if (n < S.WMIN || n > S.WMAX) fails.push(`the piece has ${n} words (${S.WMIN} to ${S.WMAX})`);
      if (roles.filter((r) => r === 'op').length !== 1 || roles[roles.length - 1] !== 'close') fails.push('the piece has not one opinion and its conclusion last');
      ss.forEach((s, i) => { const r = roles[i], st = s.querySelector('[data-lcs-stext]'), nm = s.querySelector('[data-lcs-snum]');
        const ul = cs(st).textDecorationLine.includes('underline'), ring = cs(nm).borderTopColor === TEAL, box = cs(st).borderTopColor === TEAL, out = cs(st).textDecorationLine.includes('line-through');
        if (ul !== (isKey && r === 'op') || ring !== (isKey && r === 'reason') || box !== (isKey && r === 'close') || out !== (isKey && r === 'off')) fails.push(`sentence ${i + 1}: the key marks it wrong (opinion, reasons, conclusion, the sentence that does not belong), or the page of the child marks it`);
        // a sentence number never ends a line: it stands on the line of the sentence's first word
        const tn = [...st.childNodes].find((c) => c.nodeType === 3 && c.nodeValue.trim()) || st.querySelector('*');
        if (tn) { const rg = document.createRange(); rg.setStart(tn.nodeType === 3 ? tn : tn.firstChild || tn, 0); rg.setEnd(tn.nodeType === 3 ? tn : tn.firstChild || tn, 1); const fr = rg.getClientRects()[0], nr = nm.getClientRects();
          if (fr && nr.length && Math.abs(nr[nr.length - 1].bottom - fr.bottom) > 8) fails.push(`sentence ${i + 1}: its number ends a line apart from the sentence`); } });
      const x = t.x;
      expectIs('more', lv === 3 ? cap(x) + '.' : `${S.FRAME.r2[0]} ${x}${S.FRAME.r2[1]}`);
      printedIs('more', lv === 1 ? [[S.FRAME.r2[0], S.FRAME.r2[1]], ['', '']] : lv === 2 ? [[S.STARTER.r2, ''], ['', '']] : [['', ''], ['', '']]);
      widthAtLeast('more', S.FULLMIN);
      if (t.rs.flat().some((s) => s === x)) fails.push('the sample of part 3 is a reason of the piece');
    }
  }
  if (mode === 'plan' || mode === 'draft') {
    const help = S.LV[mode][lv];
    const qs = [...root.querySelectorAll(mode === 'plan' ? '[data-lcs-q]' : '[data-lcs-idea]')];
    if (qs.length !== 2 || new Set(qs.map((q) => q.dataset.lcsQ || q.dataset.lcsIdea)).size !== 2) fails.push('not two different questions to choose from');
    qs.forEach((q) => { const p = I.prompts[q.dataset.lcsQ || q.dataset.lcsIdea]; if (!p || txt(q) !== straight(p.q)) fails.push('a question is not a prompt of the bank'); });
    const okQ = qs.filter((q) => q.dataset.lcsOk), sp = okQ.length === 1 ? I.prompts[okQ[0].dataset.lcsQ || okQ[0].dataset.lcsIdea] : null;
    if (!sp) fails.push('the key does not answer one of the two questions');
    const mEl = root.querySelector(mode === 'plan' ? '[data-lcs-model]' : '[data-lcs-mbox="model"]'), mt = mEl && I.topics[mEl.dataset.lcsModel || mEl.dataset.lcsModelkey];
    if (!mt || mt.set !== 'mark') fails.push('no worked example on another topic');
    else {
      const want = mode === 'plan' ? `A plan for another question. Opinion: ${mt.op} Reason: ${mt.rs[0][0]}. Example: ${mt.rs[0][1]}.` : lv === 3 ? `${mt.intro[0]} ${mt.op} One reason is that ${mt.rs[0][0]}. Another reason is that ${mt.rs[1][0]}. The last reason is that ${mt.rs[2][0]}. ${mt.close}` : `${mt.op} One reason is that ${mt.rs[0][0]}. For example, ${mt.rs[0][1]}.`;
      const mText = mode === 'plan' ? txt(mEl) : txt(mEl.querySelector('[data-lcs-model]'));
      if (mText !== want || (mode === 'draft' && txt(mEl.querySelector('[data-lcs-mhead]')) !== 'A model')) fails.push(`the worked example is not printed as ruled ("${mText.slice(0, 60)}")`);
      if (qs.some((q) => { const p = I.prompts[q.dataset.lcsQ || q.dataset.lcsIdea]; return p && (p.key === mt.key || p.tag === mt.tag || shares(mt.op, p.q).length); })) fails.push('the worked example is on the topic of a question the child may write about');
    }
    const S2 = sp ? { intro: `${S.FRAME.intro[0]} ${sp.tp}${S.FRAME.intro[1]}`, op: `${S.FRAME.op[0]} ${sp.op}${S.FRAME.op[1]}`, close: `${S.FRAME.close[0]} ${sp.cl}${S.FRAME.close[1]}` } : null;
    // the draft's sample joins one reason with because (the plan's notes do not)
    const rsent = (k) => `${S.FRAME['r' + k][0]} ${sp.rs[k - 1][0]}${mode === 'draft' && sp.bc && sp.bc[0] === k - 1 ? ' because ' + sp.bc[1] : ''}${S.FRAME['r' + k][1]}`, esent = (k) => `${S.FRAME.ex[0]} ${sp.rs[k - 1][1]}${S.FRAME.ex[1]}`;
    if (mode === 'plan') {
      labelIs('[data-lcs-task="q"]', 1, S.TASK.q); labelIs('[data-lcs-task="plan"]', 2, S.TASK.plan); labelIs('[data-lcs-task="check"]', 3, S.TASK.planCheck);
      const names = [...root.querySelectorAll('[data-lcs-ppart]')].map((e) => e.dataset.lcsPpart);
      if (names.join() !== 'intro,reason1,reason2,reason3,close') fails.push('the planner does not hold Introduction and opinion, three reasons, and the conclusion');
      names.forEach((nm) => { const g = printed(nm); if (g && g.length !== S.PLANLINES[nm]) fails.push(`${nm}: ${g.length} lines, not ${S.PLANLINES[nm]}`); });
      const lab = (nm) => txt(parts[nm] && parts[nm].querySelector(':scope > [data-lcs-wlabel]'));
      if (lab('intro') !== (help === 'open' ? '' : 'Introduction and opinion') || lab('close') !== (help === 'open' ? '' : 'Conclusion')) fails.push('the parts of the planner are not labeled Introduction and opinion and Conclusion (level 3: by the words on their lines)');
      const P1 = (k) => (help === 'frame' ? [S.FRAME[k][0], S.FRAME[k][1]] : help === 'starter' ? [S.STARTER[k], ''] : null);
      printedIs('intro', help === 'open' ? [[S.NOTEWORD.intro, ''], [S.NOTEWORD.op, ''], ['', '']] : [P1('intro'), P1('op'), ['', '']]);
      for (const k of [1, 2, 3]) printedIs('reason' + k, help === 'open' ? [[S.NOTEWORD.r, ''], [S.NOTEWORD.ex, ''], ['', '']] : [P1('r' + k), P1('ex'), ['', '']]);
      printedIs('close', help === 'open' ? [[S.NOTEWORD.close, ''], ['', '']] : [P1('close'), ['', '']]);
      if (sp) {
        expectIs('intro', help === 'open' ? `${S.NOTEWORD.intro} ${sp.tp} ${S.NOTEWORD.op} ${sp.op}` : `${S2.intro} ${S2.op}`);
        for (const k of [1, 2, 3]) expectIs('reason' + k, help === 'open' ? `${S.NOTEWORD.r} ${sp.rs[k - 1][0]} ${S.NOTEWORD.ex} ${sp.rs[k - 1][1]}` : `${rsent(k)} ${esent(k)}`);
        expectIs('close', help === 'open' ? `${S.NOTEWORD.close} ${sp.cl}` : S2.close);
      }
      Object.keys(parts).forEach((nm) => widthAtLeast(nm, S.FULLMIN));
      sameList(rows('[data-lcs-bankword]'), lv === 3 ? S.WORDBANK : [], 'the word bank');
      sameList([...root.querySelectorAll('[data-lcs-checkrow]')].map((e) => straight(e.dataset.lcsCheckrow)), S.PLANCHECK, 'the check list of the plan');
      root.querySelectorAll('[data-lcs-checkrow]').forEach((e) => { if (!e.querySelector('[data-lcs-box]')) fails.push('a line of the check list has no box to check'); });
    } else {
      labelIs('[data-lcs-task="ideas"]', 1, S.TASK.draftQ); labelIs('[data-lcs-task="draft"]', 2, S.TASK.draft);
      const names = Object.keys(parts);
      sameList(names, S.DRAFTPARTS[lv], 'the parts of the draft');
      const nOf = (nm) => S.DRAFTLINES[lv][nm.replace(/[0-9]$/, '')];
      names.forEach((nm) => { const g = printed(nm); if (g.length !== nOf(nm)) fails.push(`${nm}: ${g.length} lines, not ${nOf(nm)}`); if (txt(parts[nm].querySelector(':scope > [data-lcs-wlabel]')) !== S.DRAFTLABEL[nm]) fails.push(`${nm}: its label is not ${S.DRAFTLABEL[nm]}`); widthAtLeast(nm, S.DRAFTMIN); });
      { const want = S.DRAFTPARTS[lv].reduce((a, nm) => a + nOf(nm), 0); if (root.querySelectorAll('[data-lcs-draftlines] [data-lcs-line]').length !== want) fails.push(`the draft has not ${want} lines`); }
      { const nt = root.querySelector('[data-lcs-draftnote]'); if (lv < 3 ? !nt || txt(nt) !== S.TASK.draftNote || !parts.reason3 || R(nt).top < R(parts.reason3).bottom - 0.5 : nt) fails.push('the draft does not say under Reason 3 that the conclusion comes in the next lesson (levels 1 and 2), or level 3 says so'); }
      const P1 = (k) => (help === 'frame' ? [S.FRAME[k][0], ''] : help === 'starter' ? [S.STARTER[k], ''] : ['', '']);
      if (parts.intro) printedIs('intro', help === 'open' ? Array.from({ length: S.DRAFTLINES[lv].intro }, () => ['', '']) : [P1('intro'), ['', ''], P1('op'), ['', '']]);
      const open = (n) => Array.from({ length: n }, () => ['', '']);
      for (const k of [1, 2, 3]) if (parts['reason' + k]) printedIs('reason' + k, help === 'open' ? open(nOf('reason')) : [P1('r' + k), ['', ''], P1('ex'), ['', '']]);
      if (parts.close) printedIs('close', open(nOf('close')));
      if (sp) {
        expectIs('intro', `${S2.intro} ${S2.op}`);
        for (const k of [1, 2, 3]) if (parts['reason' + k]) expectIs('reason' + k, `${rsent(k)} ${esent(k)}`);
        if (parts.close) expectIs('close', S2.close);
        if (!/\b(because|since)\b/.test(Object.keys(parts).map(expectOf).join(' '))) fails.push('the sample of the draft never uses because or since');
      }
      sameList(rows('[data-lcs-mword]'), S.MARGIN.map(([w, j]) => (lv === 3 ? w : `${w}: ${j}`)), 'the linking words of the margin');
      if (txt(root.querySelector('[data-lcs-mbox="words"] [data-lcs-mhead]')) !== (lv === 3 ? 'Word bank' : 'Linking words')) fails.push('the margin does not name its linking words');
      sameList([...root.querySelectorAll('[data-lcs-checkrow]')].map((e) => straight(e.dataset.lcsCheckrow)), S.DRAFTCHECK[lv], 'the check list of the draft');
    }
  }
  if (mode === 'link') {
    const d = S.LV.link[lv];
    labelIs('[data-lcs-task="gaps"]', 1, S.TASK.link); labelIs('[data-lcs-task="join"]', 2, S.TASK.join[lv]);
    const bw = [...root.querySelectorAll('[data-lcs-boxword]')];
    if (bw.map((e) => e.dataset.lcsBoxword).join() !== S.WORDS4.join() || bw.some((e) => txt(e) !== e.dataset.lcsBoxword + ' ' + S.JOBS[e.dataset.lcsBoxword])) fails.push('the box does not hold the four linking words with their jobs');
    const rs = [...root.querySelectorAll('[data-lcs-gap]')], at = [], longest = [];
    if (rs.length !== d.n) fails.push(`${rs.length} sentences with a blank, not ${d.n}`);
    rs.forEach((r, i) => {
      const it = I.items[straight(r.dataset.lcsText)];
      if (!it) { fails.push(`sentence ${i + 1} is not a sentence of the bank`); return; }
      const st = it.at === 'start', os = [...r.querySelectorAll('[data-lcs-opt]')], ws = os.map((o) => straight(o.dataset.lcsOpt)), low = ws.map((w) => w.toLowerCase());
      if (os.length !== d.opts || new Set(low).size !== os.length || low.some((w) => !S.WORDS4.includes(w))) fails.push(`sentence ${i + 1}: not ${d.opts} different linking words to choose from`);
      if (ws.some((w, k) => w !== (st ? cap(low[k]) : low[k]) || txt(os[k]) !== w)) fails.push(`sentence ${i + 1}: a word to choose is not written as it would stand in the sentence`);
      const ok = os.filter((o) => o.dataset.lcsOk), right = ok[0] ? straight(ok[0].dataset.lcsOpt).toLowerCase() : '';
      if (ok.length !== 1 || !it.fits.includes(right) || right !== straight(r.dataset.lcsRight)) fails.push(`sentence ${i + 1}: the keyed word "${right}" does not fit`);
      low.filter((w) => w !== right).forEach((w) => { if (it.fits.includes(w)) fails.push(`sentence ${i + 1}: "${w}" fits too (two right answers)`); });
      if (low.includes('because') && low.includes('since')) fails.push(`sentence ${i + 1} offers because and since`);
      if (lv === 1 && it.kind === 'reason' && it.at !== 'mid') fails.push(`level 1: sentence ${i + 1} has the reason first`);
      // level 1 cannot be solved by the comma: a gap with a comma after it offers therefore and for example, a gap inside a
      // sentence offers because or since and therefore
      if (lv === 1) { const comma = /(^|\. )___,/.test(it.t), mid = /[a-z] ___ [a-z]/i.test(it.t);
        if (comma ? low.some((w) => !['therefore', 'for example'].includes(w)) : mid ? low.some((w) => !['because', 'since', 'therefore'].includes(w)) : true) fails.push(`level 1: sentence ${i + 1} offers a word its punctuation rules out (${low.join(', ')})`); }
      const c = r.querySelector('[data-lcs-sent]').cloneNode(true); c.querySelectorAll('[data-lcs-blank]').forEach((x) => x.replaceWith('___'));
      if (straight(c.textContent).replace(/\s+/g, ' ').trim() !== it.t) fails.push(`sentence ${i + 1} is not printed as it is filed`);
      const bl = r.querySelector('[data-lcs-blank]');
      if (!bl || straight(bl.dataset.lcsWant) !== (st ? cap(right) : right)) fails.push(`sentence ${i + 1}: the blank does not want the keyed word`);
      if (bl && Math.abs(R(bl).width - S.BLANKW) > 1) fails.push(`a blank ${Math.round(R(bl).width)} px wide, not ${S.BLANKW} (one width on every row)`);
      if (bl && bl.querySelector('[data-lcs-blankkey]')) fails.push('a blank holds a word (the child circles; the key rings)');
      at.push(os.indexOf(ok[0])); longest.push(ws.every((w) => w.length <= right.length));
    });
    { const bad = placesBad(at, d.opts); if (bad) fails.push('the places of the right words: ' + bad + ' (' + at.join('') + ')'); }
    { const bad = orderBad(rs.map((r) => r.dataset.lcsGap)); if (bad) fails.push('the kinds of blanks stand in a pattern: ' + bad); }
    if (rs.length >= 4 && (longest.every(Boolean) || !longest.some(Boolean))) fails.push('word length gives the answers away (the right word is always, or never, the longest)');
    if (lv === 3 && !rs.some((r) => r.dataset.lcsGap === 'reason' && r.dataset.lcsAt === 'start')) fails.push('level 3 has no sentence that starts with its reason');
    const js = [...root.querySelectorAll('[data-lcs-join]')];
    if (js.length !== d.joins) fails.push(`${js.length} opinions to join, not ${d.joins}`);
    js.forEach((e, i) => {
      const j = I.joins[straight(e.dataset.lcsJoin)], since = !!d.since && i === 1;
      if (!j) { fails.push(`join ${i + 1} is not a pair of the bank`); return; }
      if (txt(e.querySelector('[data-lcs-jtext]')) !== `Opinion: ${j.op} Reason: ${j.r}`) fails.push(`join ${i + 1} is not printed as Opinion and Reason`);
      if ((e.dataset.lcsSince === '1') !== since) fails.push(`join ${i + 1}: level ${lv} asks Since ${since ? 'here' : 'nowhere here'}`);
      if (since && /^(They|It|You)\b/.test(j.r)) fails.push('a sentence that starts with Since would point to a noun that comes after it');
      expectIs('join' + (i + 1), since ? 'Since ' + lc1(noEnd(j.r)) + ', ' + lc1(j.op) : noEnd(j.op) + ' because ' + lc1(j.r));
      widthAtLeast('join' + (i + 1), S.FULLMIN);
      const also = e.querySelector('[data-lcs-also]');
      if (isKey ? !!also === since || (also && txt(also) !== S.ALSOJOIN) : also) fails.push(`join ${i + 1}: the key does not name since as also right, or the page of the child does`);
    });
  }
  if (mode === 'pickend') {
    const d = S.LV.pickend[lv];
    sameList(rows('[data-lcs-ruletext]'), S.ENDRULES, 'the box of concluding statements');
    labelIs('[data-lcs-task="pick"]', 1, S.TASK.pick[lv]);
    const pcs = [...root.querySelectorAll('[data-lcs-pc]')], at = [], orders = [];
    if (pcs.length !== 3 || new Set(pcs.map((e) => e.dataset.lcsPc)).size !== 3) fails.push('not three different pieces');
    pcs.forEach((e, i) => {
      const t = I.topics[e.dataset.lcsPc];
      if (!t || t.set !== 'pick') { fails.push(`piece ${i + 1} is not a piece of this page`); return; }
      const R2 = (k) => (d.signals ? S.SIGNAL[k] + t.rs[k][0] + '.' : cap(t.rs[k][0]) + '.');
      const body = [...t.intro, t.op, R2(0), 'For example, ' + t.rs[0][1] + '.', R2(1), 'For example, ' + t.rs[1][1] + '.'].join(' ');
      if (txt(e.querySelector('[data-lcs-body]')) !== body) fails.push(`piece ${i + 1} is not printed as it is filed`);
      { const n = words(body); if (n < S.WMIN || n > S.WMAX) fails.push(`piece ${i + 1} has ${n} words`); }
      const es = [...e.querySelectorAll('[data-lcs-ending]')], ks = es.map((x) => x.dataset.lcsEnding);
      if (ks.slice().sort().join() !== 'close,reason,subject') fails.push(`piece ${i + 1} has not a conclusion, a new reason, and a sentence that changes the subject`);
      es.forEach((x) => { const k = x.dataset.lcsEnding, s = txt(x.querySelector('[data-lcs-etext]'));
        if (k === 'close' && s !== t.close) fails.push(`piece ${i + 1}: the conclusion is not the piece's own`);
        if (k === 'reason' && s !== (d.signals ? 'Another reason is that ' + t.x + '.' : cap(t.x) + '.')) fails.push(`piece ${i + 1}: the new reason is not the piece's own`);
        if (k === 'subject' && (!I.subj.includes(s) || shares(s, topicText(t)).length)) fails.push(`piece ${i + 1}: "${s}" does not change the subject`);
        const lb = x.querySelector('[data-lcs-letterbox]'), et = x.querySelector('[data-lcs-etext]');
        if (d.letters) { if (!lb || txt(lb) !== (isKey ? S.LETTER[k] : '')) fails.push(`piece ${i + 1}: a box for C, R, or X is missing, filled on the page of the child, or keyed wrong`); }
        else { if (lb) fails.push('level 1 has boxes for letters'); if ((cs(et).borderTopColor === TEAL) !== (isKey && k === 'close')) fails.push(`piece ${i + 1}: the key does not ring the conclusion alone, or the page of the child rings one`); } });
      at.push(ks.indexOf('close')); orders.push(ks.join());
    });
    { const bad = placesBad(at, 3); if (bad) fails.push('the places of the conclusions: ' + bad + ' (' + at.join('') + ')'); }
    if (new Set(orders).size < 2) fails.push('the endings stand in one order in every piece');
    { const subs = [...root.querySelectorAll('[data-lcs-ending="subject"] [data-lcs-etext]')].map(txt); if (new Set(subs).size !== subs.length) fails.push('one sentence that changes the subject stands under two pieces'); }
  }
  if (mode === 'writeend') {
    const help = S.LV.writeend[lv];
    const box = root.querySelector('[data-lcs-rulebox]'), ex = box && I.topics[box.dataset.lcsExtopic];
    if (!ex || ex.set !== 'mark') fails.push('the box has no worked example');
    else sameList(rows('[data-lcs-ruletext]'), [...S.ENDRULES, `Example. Opinion: ${ex.op} Conclusion: ${ex.close}`], 'the box of concluding statements');
    sameList(rows('[data-lcs-bankword]'), lv === 3 ? S.ENDBANK : [], 'the word bank');
    labelIs('[data-lcs-task="weak"]', 1, S.TASK.weak); labelIs('[data-lcs-task="none"]', 2, S.TASK.none); labelIs('[data-lcs-task="own"]', 3, S.TASK.own);
    const used2 = [];
    [['weak', 0], ['none', 1]].forEach(([task, k]) => {
      const c = root.querySelector(`[data-lcs-task="${task}"]`), t = c && I.topics[c.dataset.lcsTkey];
      if (!t || t.set !== 'write') { fails.push(`the piece of part ${k + 1} is not a piece of this page`); return; }
      used2.push(t.key);
      const R2 = (j) => (lv < 3 ? S.SIGNAL[j] + t.rs[j][0] + '.' : cap(t.rs[j][0]) + '.');
      const body = [...t.intro, t.op, R2(0), 'For example, ' + t.rs[0][1] + '.', R2(1), 'For example, ' + t.rs[1][1] + '.'].join(' ');
      const w = c.querySelector('[data-lcs-weak]');
      if (task === 'weak' && (!w || !(I.weak.includes(txt(w)) || (lv > 1 && txt(w) === t.op)))) fails.push('the piece of part 1 has no weak ending (level 1: never the opinion word for word, since it asks for new words)');
      if (task === 'none' && w) fails.push('the piece of part 2 has an ending');
      if (txt(c.querySelector('[data-lcs-body]')) !== body + (w ? ' ' + txt(w) : '')) fails.push(`the piece of part ${k + 1} is not printed as it is filed`);
      if (printed(task) && printed(task).length !== S.ENDLINES[task]) fails.push(`part ${k + 1} has not ${S.ENDLINES[task]} lines`);
      printedIs(task, [help === 'frame' ? [S.ENDFRAME[0], S.ENDFRAME[1]] : help === 'starter' ? [S.ENDSTARTERS[k], ''] : ['', ''], ...Array.from({ length: S.ENDLINES[task] - 1 }, () => ['', ''])]);
      expectIs(task, help === 'frame' ? `${S.ENDFRAME[0]} ${t.why}${S.ENDFRAME[1]}` : help === 'starter' ? `${S.ENDSTARTERS[k]} ${t.why}.` : t.close);
      widthAtLeast(task, S.FULLMIN);
    });
    if (used2.length === 2 && used2[0] === used2[1]) fails.push('one piece stands twice');
    // nothing to copy across the page: the two pieces, the worked example, and the prompt of part 3 on four topics
    { const oc2 = root.querySelector('[data-lcs-task="own"]'), pr = oc2 && I.prompts[oc2.dataset.lcsPkey], tg = [...used2.map((k) => I.topics[k].tag), ex && ex.tag, pr && pr.tag];
      if (tg.some((x) => !x) || new Set(tg).size !== tg.length) fails.push('two things on this page share a topic (pieces, worked example, prompt of part 3)'); }
    const oc = root.querySelector('[data-lcs-task="own"]'), op = oc && I.prompts[oc.dataset.lcsPkey];
    if (!op) fails.push('the sample of part 3 is no prompt of the bank');
    else {
      printedIs('own', [help === 'frame' ? [S.ENDFRAME[0], S.ENDFRAME[1]] : help === 'starter' ? [S.ENDSTARTERS[2], ''] : ['', ''], ...Array.from({ length: S.ENDLINES.own - 1 }, () => ['', ''])]);
      expectIs('own', `That is why ${op.cl}.`);
      const vf = oc.querySelector('[data-lcs-varyfor]'); if (isKey && (!vf || txt(vf) !== S.SAMPLEFOR + op.q + ')')) fails.push('the key does not name the prompt of the sample of part 3');
    }
    widthAtLeast('own', S.FULLMIN);
  }
  if (mode === 'edit') {
    const d = S.LV.edit[lv];
    const card = root.querySelector('[data-lcs-task="edit"]'), t = card && I.topics[card.dataset.lcsTkey];
    if (!t || t.set !== 'edit') { fails.push('the paragraph is not a paragraph of this page'); return fails; }
    const opts = straight(card.dataset.lcsOpts).split('|'), link = card.dataset.lcsLink;
    const orList = (ws) => (ws.length === 2 ? `${ws[0]} or ${ws[1]}` : `${ws.slice(0, -1).join(', ')}, or ${ws[ws.length - 1]}`);
    if (txt(root.querySelector('[data-lcs-boxtitle]')) !== `Find and fix ${d.faults.length} mistakes`) fails.push('the box does not say how many mistakes there are');
    const boxRows = [...root.querySelectorAll('[data-lcs-ruletext]')].map((e) => { const c = e.cloneNode(true); c.querySelectorAll('[data-lcs-alsoblank]').forEach((x) => x.remove()); return txt(c); });
    sameList(boxRows, d.faults.map((k) => S.FIXROWS[k].replace('{W}', orList(opts))), 'the box of what to find and fix');
    labelIs('[data-lcs-task="edit"]', 1, S.TASK.edit.replace('{N}', ['', '', '', '', 'four', 'five', 'six'][d.faults.length])); labelIs('[data-lcs-task="rewrite"]', 2, S.TASK.rewrite);
    if (printed('rewrite') && printed('rewrite').length !== d.rewrite) fails.push(`${printed('rewrite').length} lines for the fixed sentences, not ${d.rewrite}`);
    const fits = link === 'because' ? ['because', 'since'] : ['Another reason'];
    const allowed = link === 'because' ? ['because', 'since', 'therefore', 'for example'] : ['Another reason', 'Therefore', 'For example'];
    const right = opts.filter((o) => fits.includes(o));
    if (opts.length !== d.opts || new Set(opts).size !== opts.length || opts.some((o) => !allowed.includes(o)) || right.length !== 1) fails.push(`the words to choose for the blank are not ${d.opts} words with one that fits (${opts.join(', ')})`);
    const es = [...card.querySelectorAll('[data-lcs-esent]')];
    if (es.length !== d.sents) fails.push(`${es.length} sentences, not ${d.sents}`);
    const roles = es.map((e) => e.dataset.lcsRole), offI = roles.indexOf('off'), offText = offI >= 0 ? txt(es[offI]) : '';
    if (roles.filter((r) => r === 'off').length !== 1 || !I.off.includes(offText) || shares(offText, topicText(t)).length) fails.push('the sentence that does not belong is not one fact about something else');
    const seq = ['intro', 'op', 'example', 'reason', ...(lv >= 2 ? ['example'] : []), ...(lv === 3 ? ['reason'] : []), 'close'];
    if (roles.filter((r) => r !== 'off').join() !== seq.join() || offI < 3 || offI === es.length - 1) fails.push('the sentences are not in the order of the paragraph (the sentence that does not belong among the reasons)');
    const origOf = (e) => { const r = e.dataset.lcsRole, k = +e.dataset.lcsK;
      return r === 'intro' ? t.intro[0] : r === 'op' ? noEnd(t.op) + ' because ' + t.rs[0][0] + '.' : r === 'example' ? 'For example, ' + t.rs[k][1] + '.' : r === 'reason' ? (k === 1 ? 'Another reason is that ' : 'Also, ') + t.rs[k][0] + '.' : r === 'close' ? t.close : offText; };
    const orig = es.map(origOf);
    { const n = words(orig.join(' ')); if (n < S.WMIN || n > S.WMAX) fails.push(`the paragraph has ${n} words`); }
    // where the mistakes stand
    const where = {};
    es.forEach((e, i) => { e.querySelectorAll('[data-lcs-fault]').forEach((f) => { const k = f.dataset.lcsFault; if (where[k] !== undefined) fails.push(`two mistakes of the kind ${k}`); where[k] = i; }); if (e.querySelector('[data-lcs-blank]')) { if (where.link !== undefined) fails.push('two blanks'); where.link = i; } });
    const kinds = Object.keys(where).sort().join();
    if (kinds !== d.faults.slice().sort().join()) fails.push(`the mistakes are ${kinds}, not ${d.faults.join(', ')}`);
    if (new Set(Object.values(where)).size !== Object.keys(where).length) fails.push('two mistakes stand in one sentence');
    if (where.off !== offI) fails.push('the sentence that does not belong is not marked as one');
    // the missing end mark: a statement where only a period is right (never the opinion or the conclusion), never just
    // before the sentence that does not belong
    if (where.end !== undefined && (S.ENDROLES.includes(roles[where.end]) || where.end === offI - 1)) fails.push('the missing end mark stands where an exclamation point is also right, or just before the sentence that does not belong');
    if ((I.offAvoid[offText] || []).includes(t.key)) fails.push('the sentence that does not belong touches the theme of the paragraph');
    { const ab = [...root.querySelectorAll('[data-lcs-alsoblank]')], want = isKey && link === 'because' ? ['Blank: ' + right[0] + ' ' + S.ALSOBLANK[right[0]]] : [];
      if (ab.map(txt).join('|') !== want.join('|')) fails.push('the key does not name the other right word for the blank (because and since), or the page of the child does'); }
    // each sentence printed with its own mistake (and only that one)
    es.forEach((e, i) => {
      let want = orig[i];
      if (i === where.link) want = link === 'because' ? want.replace(' because ', ' ___ ') : '___' + want.slice('Another reason'.length);
      if (i === where.cap) want = want[0].toLowerCase() + want.slice(1);
      if (i === where.end) want = want.replace(/\.$/, '');
      if (i === where.comma) want = want.replace(/^For example, /, 'For example ');
      if (i === where.spell) { const f = e.querySelector('[data-lcs-fault="spell"]'), w = f ? f.dataset.lcsFix : '', mis = I.spell[w.toLowerCase()];
        if (!mis || tok(orig.join(' ')).filter((v) => v === w.toLowerCase()).length !== 1) fails.push(`the misspelled word "${w}" is no word of the word wall that stands once`);
        else want = want.replace(new RegExp('\\b' + w + '\\b'), w[0] === w[0].toUpperCase() ? cap(mis) : mis); }
      const c = e.cloneNode(true); c.querySelectorAll('[data-lcs-fixmark]').forEach((x) => x.remove()); c.querySelectorAll('[data-lcs-blank]').forEach((x) => x.replaceWith('___'));
      if (straight(c.textContent).replace(/\s+/g, ' ').trim() !== want) fails.push(`sentence ${i + 1} is not printed as "${want.slice(0, 50)}"`);
    });
    // one right fix each: the capital is the only small letter that starts a sentence; the sentence after the missing end mark
    // starts with a capital; every other For example keeps its comma
    es.forEach((e, i) => { const c = e.cloneNode(true); c.querySelectorAll('[data-lcs-fixmark]').forEach((x) => x.remove()); const s = straight(c.textContent).trim();
      if (i !== where.cap && !(i === where.link && link === 'another') && !/^[A-Z]/.test(s)) fails.push(`sentence ${i + 1} starts with a small letter but is not the mistake`); });
    if (where.end !== undefined && where.end + 1 < es.length) { const c = es[where.end + 1].cloneNode(true); c.querySelectorAll('[data-lcs-fixmark]').forEach((x) => x.remove()); if (!/^[A-Z]/.test(straight(c.textContent).trim())) fails.push('the sentence after the missing end mark does not start with a capital'); }
    // the key's fixes; nothing marked on the page of the child
    const fm = (k) => { const i = where[k]; return i === undefined ? null : es[i].querySelector('[data-lcs-fixmark]'); };
    if (isKey) {
      if (!fm('cap') || txt(fm('cap')) !== orig[where.cap][0]) fails.push('the key does not write the capital letter');
      if (!fm('end') || txt(fm('end')) !== '.') fails.push('the key does not add the period');
      if (where.comma !== undefined && (!fm('comma') || txt(fm('comma')) !== ',')) fails.push('the key does not add the comma');
      if (where.spell !== undefined) { const f = es[where.spell].querySelector('[data-lcs-fault="spell"]'); if (!fm('spell') || !f || txt(fm('spell')) !== f.dataset.lcsFix) fails.push('the key does not spell the word right'); }
      const bk = es[where.link] && es[where.link].querySelector('[data-lcs-blankkey]'); if (!bk || txt(bk) !== right[0]) fails.push('the key does not write the linking word');
      { const bl = es[where.link] && es[where.link].querySelector('[data-lcs-blank]'); if (bl && R(bl).width < S.EBLANKW - 1) fails.push(`the blank for the linking word is ${Math.round(R(bl).width)} px wide (${S.EBLANKW}: Another reason at a child's letter width)`); }
    } else if (root.querySelector('[data-lcs-fixmark], [data-lcs-blankkey]')) fails.push('a mistake is fixed on the page of the child');
    { const o = es[offI] && es[offI].querySelector('[data-lcs-fault="off"]'); if (o && cs(o).textDecorationLine.includes('line-through') !== isKey) fails.push('the key does not cross out the sentence that does not belong, or the page of the child does'); }
    // the paragraph written again
    const fixedAt = [where.cap, where.end, where.link, where.comma, where.spell].filter((x) => x !== undefined).sort((a, b) => a - b);
    expectIs('rewrite', fixedAt.map((i) => (right[0] === 'since' ? orig[i].replace(' because ', ' since ') : orig[i])).join(' '));
    widthAtLeast('rewrite', S.FULLMIN);
  }
  if (mode === 'revise') {
    const d = S.LV.revise[lv];
    labelIs('[data-lcs-task="check"]', 1, S.TASK.check); labelIs('[data-lcs-task="peer"]', 2, S.TASK.peer); labelIs('[data-lcs-task="own"]', 3, d.change ? S.TASK.change : S.TASK.add);
    if (txt(root.querySelector('[data-lcs-boxtitle]')) !== S.REVTITLE) fails.push('the box is not titled ' + S.REVTITLE);
    const rv = [...root.querySelectorAll('[data-lcs-rev]')];
    { const ks = rv.map((e) => (I.revise.find((y) => y.b === straight(e.dataset.lcsRev)) || {}).kind); if (ks.join() !== 'content,mark') fails.push('the box does not show one content change and then one mark fix'); }
    if (rv.length !== 2 || new Set(rv.map((e) => e.dataset.lcsRev)).size !== 2) fails.push('not two worked examples of a revision');
    rv.forEach((e) => { const x = I.revise.find((y) => y.b === straight(e.dataset.lcsRev)); if (!x || txt(e) !== `Before: ${x.b} After: ${x.a} (${x.how})`) fails.push('a worked example is not printed as it is filed'); });
    sameList([...root.querySelectorAll('[data-lcs-checkrow]')].map((e) => straight(e.dataset.lcsCheckrow)), S.REVCHECK.slice(0, d.checks), 'the check list');
    if (rows('[data-lcs-col]').join() !== 'Me,My partner') fails.push('the check list has no columns for Me and My partner');
    root.querySelectorAll('[data-lcs-checkrow]').forEach((e) => { if ([...e.querySelectorAll('[data-lcs-box]')].map((x) => x.dataset.lcsBoxfor).join() !== 'Me,My partner') fails.push('a line of the check list has not two boxes'); });
    printedIs('name', [['Partner:', '']]); printedIs('like', Array.from({ length: d.peerLines }, () => ['', ''])); printedIs('add', Array.from({ length: d.peerLines }, () => ['', ''])); printedIs('own', Array.from({ length: d.ownLines }, () => ['', '']));
    if (txt(parts.like && parts.like.querySelector(':scope > [data-lcs-wlabel]')) !== 'One thing I like:' || txt(parts.add && parts.add.querySelector(':scope > [data-lcs-wlabel]')) !== 'One thing to add or fix:') fails.push('the comment of the partner is not One thing I like and One thing to add or fix');
    if (!I.peer.some((p) => expectOf('like') === p[0] && expectOf('add') === p[1])) fails.push('the sample comment is not one of the samples');
    const oc = root.querySelector('[data-lcs-task="own"]'), op = oc && I.prompts[oc.dataset.lcsPkey];
    if (!op) fails.push('the sample of part 3 is no prompt of the bank'); else { expectIs('own', d.change ? `I added the reason that ${op.rs[2][0]}.` : `For example, ${op.rs[0][1]}.`); const vf = oc.querySelector('[data-lcs-varyfor]'); if (isKey && (!vf || txt(vf) !== S.SAMPLEFOR + op.q + ')')) fails.push('the key does not name the prompt of the sample of part 3'); }
    widthAtLeast('own', S.FULLMIN); widthAtLeast('like', S.FULLMIN); widthAtLeast('add', S.FULLMIN);
  }
  // no blank band of more than GAP px between two tasks, between two blocks, or at the foot of a card
  { const byParent = new Map();
    root.querySelectorAll('[data-lcs-item], [data-lcs-wpart]').forEach((e) => { const p = e.parentElement; if (!byParent.has(p)) byParent.set(p, []); byParent.get(p).push(R(e)); });
    for (const rs of byParent.values()) { rs.sort((a, b) => a.top - b.top); let low = rs.length ? rs[0].bottom : 0; for (let k = 1; k < rs.length; k++) { const g = rs[k].top - low; if (g > S.GAP + 0.5) { fails.push(`a blank band of ${Math.round(g)} px between two tasks`); break; } low = Math.max(low, rs[k].bottom); } }
    const bl = blocks.map(R); for (let k = 1; k < bl.length; k++) { const g = bl[k].top - bl[k - 1].bottom; if (g > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two blocks`); }
    root.querySelectorAll('[data-lcs-task]').forEach((c) => { const low = Math.max(...[...c.querySelectorAll('[data-lcs-item], [data-lcs-line], [data-lcs-read], [data-lcs-label], [data-lcs-opts], [data-lcs-small], [data-lcs-wpart]')].map((e) => R(e).bottom));
      const g = R(c).bottom - parseFloat(cs(c).paddingBottom) - low; if (g > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(g)} px at the foot of a card (${c.dataset.lcsTask})`); });
    // the margin of the draft and its groups: the blank above the first, between two, and below the last
    root.querySelectorAll('[data-lcs-margin], [data-lcs-mbox]').forEach((p) => { const kids = [...p.children].map(R).filter((r) => r.height > 0).sort((a, b) => a.top - b.top); if (!kids.length) return;
      const c = cs(p); let low = R(p).top + parseFloat(c.paddingTop), g = 0; for (const k of kids) { g = Math.max(g, k.top - low); low = Math.max(low, k.bottom); } g = Math.max(g, R(p).bottom - parseFloat(c.paddingBottom) - low);
      if (g > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(g)} px in the margin (${p.dataset.lcsMbox || 'margin'})`); }); }
  return fails;
}

module.exports = { makeOpinionWritingG3Type, faultsOf, plan, LEVELS, INSTR, LINES, SPEC, place, placeKey, draftFits, modelPiece, editRewriteList, offText, planParts, draftParts, moreParts, endParts, joinSample, editRewrite, markSentences, pieceBody, editSentences };
