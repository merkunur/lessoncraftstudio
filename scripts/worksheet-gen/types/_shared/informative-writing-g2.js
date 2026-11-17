/**
 * informative-writing-g2.js — six Grade 2 writing pages for three lessons of the unit "Writing to Inform" (English
 * literacy year, Daily Teaching System Part 12.3, 2026-11-17). Children are 7 or 8. The texts are
 * data/literacy/informative-writing-g2.en.json (written by the scratch script ll-g2inform/bank.js). Four sets of topics
 * never meet: MENTOR and END topics stand only on the day-1 pages of lessons 1 and 2 and in the small worked examples of
 * the other pages; FACT topics are the prompts of the day-2 pages of lessons 1 and 2; RESEARCH topics are the two books
 * of lesson 3. Copy n of the plan (G2-566) and of the draft (G2-568) have one fact topic (the child drafts the piece
 * planned); copy n of the notes (G2-569) and of the report (G2-570) have one research topic (the child writes from the
 * notes). No day-1 page answers a task of the day-2 page of its lesson, on any copy.
 *
 *   parts     G2-565 Parts of an Informative Piece (W.2.2; lesson "Plan an informative piece", day 1). The box "Parts of
 *             an informative piece" (topic sentence, fact, definition, closing sentence, opinion). 1. A mentor piece of 40
 *             to 60 words on a mentor topic (topic sentence, three facts, one definition, closing sentence): underline the
 *             topic sentence, draw a box around the closing sentence (levels 2 and 3: and circle the definition). 2.
 *             Sentences about ANOTHER mentor topic, lettered: write the letter of each fact under its heading (two
 *             headings; every fact fits one heading only) and cross out the sentence that does not belong.
 *               level 1  four facts (two per heading) and a fact about something else
 *               level 2  six facts (three per heading) and an opinion about the topic
 *               level 3  six facts, a fact about something else, and an opinion (cross out two)
 *   plan      G2-566 Plan Your Informative Piece (W.2.2; same lesson, day 2). A fact box about ONE fact topic (six facts
 *             and a fact that names a word and what it means; a library picture where one shows the thing), a one-line
 *             plan for another topic. 1. The planner: topic sentence, facts, a word and what it means, closing sentence.
 *             2. Three things to check.
 *               level 1  a frame on every line ("Here are some facts about ___.", "Foxes ___." for three facts, "A ___
 *                        is", "Now you know about ___.")
 *               level 2  starters; the facts go under two headings chosen from three (one fits no fact)
 *               level 3  notes on open lines under headings of the child's own, and a word bank
 *   endings   G2-567 Closings, Definitions, and Linking Words (W.2.2; lesson "Draft with facts and a closing", day 1).
 *             The box "Facts, definitions, and closings". 1. A piece on an end topic with no ending: circle the closing
 *             sentence (wrong ones: a new fact; an opinion about something else; the topic sentence word for word). 2.
 *             A sentence that names a word and what it means: write the definition in the frame "A ___ is ___." 3.
 *             Circle the linking word that fits (also, another, and: each gap takes one of them only).
 *               level 1  three endings (closing, new fact, opinion about something else); the frame "A drake is ___";
 *                        two words to choose from in each gap
 *               level 2  three endings (closing, new fact, topic sentence again); the frame "A ___ is ___" (the
 *                        child writes the word and its meaning); three words in each gap
 *               level 3  four endings (all of them); the child writes the whole definition; three words in each gap
 *   draft     G2-568 Draft Your Informative Piece (W.2.2; same lesson, day 2). The facts of the plan (the fact topic of
 *             the same copy of G2-566). 1. The draft: topic sentence, three facts, a definition, closing sentence. Under
 *             it, a small model on another topic, the linking words, and the check list.
 *               level 1  frames ("Here are some facts about ___.", "One fact is that", "Another fact is that", "Also,",
 *                        "A ___ is", "Now you know about ___.")
 *               level 2  starters ("Here are some facts about", "One fact", "Another fact", "Also,", "A", "Now you know")
 *               level 3  ten open lines and a word bank
 *   notes     G2-569 Research with Two Books: Take Notes (W.2.7, W.2.8; lesson "Research with two books: a class
 *             report", day 1). A research question with a library picture, Book 1 and Book 2 (40 to 60 words each: they
 *             agree and add to each other). 1. Which book tells it? A check mark under Book 1, Book 2, or Both for each
 *             note. 2. Notes that answer the research question, with a worked note on another topic.
 *               level 1  four notes; notes are words copied from the books (Book 1 says, Book 2 says, Both books say)
 *               level 2  four notes; notes in the child's own words
 *               level 3  five notes; four notes of the child's own, each with the book it came from (1, 2, or B)
 *   report    G2-570 Write Your Part of the Class Report (W.2.7; same lesson, day 2). The topic of the same copy of
 *             G2-569. 1. The heading of the child's part (levels 1 and 2: given; level 3: circle one of three). The
 *             notes for that heading (levels 1 and 2). 2. Three sentences with a fact from each book. 3. A picture with a
 *             label. "We learned this from:" and the check list.
 *               level 1  frames ("One fact is that", "Another fact is that", "Both books say that"); the books to check
 *               level 2  starters ("One fact", "Another fact", "Both books"); the books to check
 *               level 3  open lines; the child writes the books
 *
 * Writing rows are school rows 44 px high (a dotted midline) of the same rule as the other Grade 2 writing pages; a second
 * grader writes about 30 letters across a full-width row (21.7 px a letter, CHILD). Every task the child writes in holds its
 * sample at that measure with at least one row to spare (checked for every sample of the bank when this file loads, and
 * measured on every rendered page). A label stands above its rows. No blank band of more than 40 px, measured over
 * everything printed. The places of right answers follow no pattern. Ligatures are off, and an f before i, f, l, or t and
 * a t before t get room of their own. Apostrophes and quotation marks are typographic on everything printed. English only;
 * themeless: a copy draws other topics. PDF only. verify() carries its own copy (SPEC) of every ruled text and measure.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/informative-writing-g2.en.json');
const { _parts } = require('./info-text.js');
const { rulesOf } = require('../../lib/key-on-row.js');
const { W, esc, shuffle, rowSvg } = _parts;

const READ = 19;            // a piece or a sentence the child reads
const BOOKPX = 17.5;        // the two books, the fact box, the notes
const LABEL = 17;           // a task line
const OPT = 20;             // a word or a sentence to circle
const RULEPX = 16;          // a rule box
const SMALL = 15.5;         // a worked example, a model, the check list
const STARTPX = 22;         // a frame or a starter printed on a row
const KEYPX = 20;           // the key's sample on a row
const ROW = 44;             // a Grade 2 writing row
const INNER = W - 24;       // a card's inner width (651)
const CPL = 30;             // the letters a second grader writes across a full-width row
const CHILD = INNER / CPL;  // a second grader's printed letter (21.7 px)
const GAP = 40;             // the largest blank band
const PADL = 8, SEP = 8, PADR = 8;   // a row: text starts 8 px in; 8 px after the printed words; 8 px free at the right end
const BASE = rulesOf(rowSvg(400, ROW)).base;   // the base rule of a row, from its top
const A = (s) => esc(s).replace(/"/g, '&quot;');
const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);
const lc1 = (s) => String(s).charAt(0).toLowerCase() + String(s).slice(1);
const noEnd = (s) => String(s).replace(/[.?!]$/, '');
const titleCase = (s) => String(s).split(' ').map(cap).join(' ');
const words = (s) => String(s).split(/\s+/).filter(Boolean).length;

/** the page instruction of every level (registered as strings with add-strings.js; verify() has its own copy) */
const INSTR = {
  parts: { 1: 'An informative piece tells facts about one topic.', 2: 'An informative piece has a topic sentence, facts, and a closing sentence.', 3: 'An informative piece tells only facts, and every sentence is about its topic.' },
  plan: { 1: 'Plan a topic sentence, three facts, a definition, and a closing sentence.', 2: 'Plan your piece. Put your facts in groups under two headings.', 3: 'Plan your informative piece in notes. Use the word bank if you need it.' },
  endings: { 1: 'A closing sentence tells about the topic again at the end.', 2: 'A closing sentence tells about the topic again in new words.', 3: 'Writers use facts, definitions, linking words, and a closing sentence.' },
  draft: { 1: 'Use the frames to write your informative piece.', 2: 'Write your piece from your plan. Use linking words.', 3: 'Write your whole piece, from topic sentence to closing sentence.' },
  notes: { 1: 'Researchers read two books and write a few key words as notes.', 2: 'Read both books. Write short notes in your own words.', 3: 'Take notes in your own words. Write which book each note is from.' },
  report: { 1: 'Write your part of our class report with facts from both books.', 2: 'Use the notes to write your part of the class report.', 3: 'Choose a heading and write your part of the class report.' },
};
/** the task lines */
const LINES = {
  mark: { 1: 'Read the piece. Underline the topic sentence. Draw a box around the closing sentence.', 2: 'Read the piece. Underline the topic sentence. Circle the definition. Draw a box around the closing sentence.', 3: 'Read the piece. Underline the topic sentence. Circle the definition. Draw a box around the closing sentence.' },
  sort: { 1: 'Read the sentences about {N}. Write the letter of each fact about {N} under its heading. Cross out the sentence about something else.', 2: 'Read the sentences about {N}. Write the letter of each fact about {N} under its heading. Cross out the opinion.', 3: 'Read the sentences about {N}. Write the letter of each fact about {N} under its heading. Cross out the two sentences that do not belong.' },
  plan: 'Plan a piece about {N}. Use the facts in the box.',
  check: 'Check your plan.',
  close: 'Read the piece. Circle the closing sentence that fits it.',
  defs: { 1: 'Read the sentence. Finish the definition.', 2: 'Read the sentence. Write the word and what it means.', 3: 'Read the sentence. Write a definition: A ___ is ___.' },
  link: 'Circle the linking word that fits each blank.',
  use: 'Use your plan. No plan? Use these facts about {N}.',
  draft: { 1: 'Write your piece. Use the frames.', 2: 'Write your piece. Keep the facts of one heading together.', 3: 'Write your piece: topic sentence, three facts, a definition, closing sentence. Keep the facts of one heading together.' },
  which: 'Which book tells it? Put a check mark under Book 1, Book 2, or Both.',
  chart: { 1: 'Take notes. Copy a few words. Write one note from each book and one both books tell. Use facts that are not in the table.', 2: 'Take notes in your own words. A note is a few words. Write one note from each book and one both books tell. Use facts that are not in the table.', 3: 'Take notes in your own words. Write 1, 2, or B in each box. Use facts that are not in the table.' },
  heading: { 1: 'Circle the heading your teacher gives you.', 2: 'Circle the heading your teacher gives you.', 3: 'Choose the heading of your part. Circle it.' },
  usenotes: 'Use your notes from Research with Two Books: Take Notes. You may read the two books again.',
  headrow: 'Write your heading:',
  write: 'Write three sentences. Use a fact from each book.',
  picture: 'Draw and label a picture.',
  repcheck: 'Check your part.',
};
/** the box of G2-565 (the same on every level) */
const PARTRULES = [['Informative piece', 'tells only facts, and every sentence is about its topic.'], ['Topic sentence', 'tells what the whole piece is about.'], ['Fact', 'tells something true that can be checked.'], ['Definition', 'tells what a word means.'], ['Closing sentence', 'tells about the topic again at the end, in new words. It gives no new fact.'], ['Opinion', 'tells what someone thinks. People can disagree with it. An informative piece leaves opinions out.']];
/** the box of G2-567 (its example word stands on no page; the same on every level) */
const ENDRULES = [['Definition', 'tells what a word means. A kitten is a baby cat.'], ['Linking words', '“also,” “another,” and “and” join facts.'], ['Closing sentence', 'tells about the topic again at the end, in new words. It gives no new fact.']];
const LINKWORDS = ['also', 'another', 'and'];
/** the frames and starters (a frame never prints the period: the child writes it after the last word) */
const PLANFRAME = { ts: 'Here are some facts about', def: ['A', 'is'], close: 'Now you know about' };
const PLANSTART = { ts: 'Here are some facts about', head: 'Heading:', close: 'Now you know' };
const DRAFTFRAME = { ts: 'Here are some facts about', f1: 'One fact is that', f2: 'Another fact is that', f3: 'Also,', close: 'Now you know about' };
const DRAFTSTART = { ts: 'Here are some facts about', f1: 'One fact', f2: 'Another fact', f3: '', def: 'A', close: 'Now you know' };
const REPFRAME = ['One fact is that', 'Another fact is that', 'Both books say that'];
const REPSTART = ['One fact', 'Another fact', 'Both books'];
const PLANBANK = ['Here are some facts about', 'A ___ is', 'Now you know about'];
const DRAFTBANK = ['Here are some facts about', 'One fact is that', 'also', 'another', 'A ___ is', 'Now you know about'];
const PLANCHECK = { 1: ['I named my topic.', 'I wrote three facts.', 'I wrote what a word means.', 'I wrote a closing sentence.', 'Each sentence ends with a period.'], 2: ['I named my topic.', 'I grouped my facts.', 'I wrote what a word means.', 'I wrote a closing sentence.'], 3: ['I named my topic.', 'I grouped my facts.', 'I wrote what a word means.', 'I wrote a closing sentence.'] };
const DRAFTCHECK = { 1: ['I wrote a topic sentence.', 'I wrote three facts.', 'I wrote what a word means.', 'I wrote a closing sentence.'], 2: ['I wrote a topic sentence.', 'I wrote three facts.', 'I kept facts about the same thing together.', 'I used also or another.', 'I wrote what a word means.', 'I wrote a closing sentence.'], 3: ['I wrote a topic sentence.', 'I wrote three facts.', 'I kept facts about the same thing together.', 'I used also or another.', 'I wrote what a word means.', 'I wrote a closing sentence.'] };
const REPCHECK = ['My part has a heading.', 'I wrote three sentences.', 'I used a fact from each book: {B1} and {B2}.', 'My picture has a label.'];
const DEFLABEL = 'Definition (a word and what it means)';
/** the words that keep a note true: a note keeps every one its sentence says before the words it takes */
const QUALS = ['some', 'many', 'most', 'often', 'usually', 'sometimes', 'can', 'a lot', 'every day'];
const sampleFor = (q) => `(Sample for: ${q})`;
/* ------------------------------------------------------------------ the measure of a row */
/** the advance of each letter of Nunito 700 in em (measured on a rendered page; types/_shared/word-choice-g2.js) */
const GLYPH_EM = { a: 0.55, b: 0.6, c: 0.47, d: 0.6, e: 0.54, f: 0.36, g: 0.6, h: 0.59, i: 0.26, j: 0.26, k: 0.54, l: 0.32, m: 0.88, n: 0.59, o: 0.58, p: 0.6, q: 0.6, r: 0.39, s: 0.49, t: 0.38, u: 0.58, v: 0.53, w: 0.85, x: 0.55, y: 0.53, z: 0.47, A: 0.74, B: 0.69, C: 0.68, D: 0.76, E: 0.6, F: 0.56, G: 0.74, H: 0.77, I: 0.28, J: 0.35, K: 0.67, L: 0.56, M: 0.87, N: 0.75, O: 0.79, P: 0.65, Q: 0.79, R: 0.69, S: 0.63, T: 0.62, U: 0.74, V: 0.71, W: 1.11, X: 0.67, Y: 0.62, Z: 0.61, "'": 0.25, ' ': 0.27, '.': 0.27, ',': 0.27, '!': 0.3, '?': 0.5, ':': 0.27, '-': 0.4, '0': 0.6, '1': 0.6, '2': 0.6, '3': 0.6, '4': 0.6, '5': 0.6, '6': 0.6, '7': 0.6, '8': 0.6, '9': 0.6 };
/** the width (px) of a text at a size, a little wider than the font runs (an f before i, f, l, t gets 0.07 em of room) */
const wOf = (s, px) => ([...String(s)].reduce((n, c) => n + (GLYPH_EM[c] !== undefined ? GLYPH_EM[c] : 0.62), 0) + (String(s).match(/f(?=[iflt])|t(?=t)/g) || []).length * 0.07) * px * 1.03;
/** where the child starts writing on a row (px from its left edge) and how many letters fit after it */
const startOf = (r) => PADL + (r.pre ? wOf(r.pre, STARTPX) + SEP : 0) + (r.gap ? r.gap + SEP + (r.mid ? wOf(r.mid, STARTPX) + SEP : 0) : 0);
const endRoom = (r) => (r.end ? wOf(r.end, STARTPX) + SEP : 0) + PADR;
const freeOf = (r) => Math.floor((r.w - startOf(r) - endRoom(r)) / CHILD);
const gapFree = (r) => Math.floor((r.gap - 6) / CHILD);
/** the gap of "A ___ is" on a plan or a draft holds the word of its topic (the word stands in the fact box, so its length
 *  tells nothing the child does not read there) */
const gapFor = (word) => Math.ceil(word.length * CHILD + 12);
/**
 * Places the sentences of a part on its rows as a child writes them: each sentence starts on its row (at), after the
 * row's printed words (its gap word in the gap), and runs on to the next rows; a sentence never runs into a row where
 * another starts, and a frame that prints its end mark holds its sentence on its own row. sents: [{ at, text, gap? }].
 * Returns { out, gaps } (the child's words of every row) or null.
 */
function place(rows, sents) {
  const out = rows.map(() => ''), gaps = rows.map(() => '');
  for (let k = 0; k < sents.length; k++) {
    const s = sents[k];
    if (!rows[s.at]) return null;
    const stop = rows[s.at].end ? s.at + 1 : k + 1 < sents.length ? sents[k + 1].at : rows.length;
    if (s.gap !== undefined) { if (!rows[s.at].gap || s.gap.length > gapFree(rows[s.at])) return null; gaps[s.at] = s.gap; }
    let i = s.at;
    for (const w of String(s.text).split(' ').filter(Boolean)) {
      const next = out[i] ? out[i] + ' ' + w : w;
      if (next.length <= freeOf(rows[i])) { out[i] = next; continue; }
      i++;
      if (i >= stop || w.length > freeOf(rows[i])) return null;
      out[i] = w;
    }
  }
  return { out, gaps };
}
/** the key's sample placed as the KEY writes it (its own letters, each row to its end) */
const keyRoom = (r) => r.w - startOf(r) - endRoom(r) - 4;
function placeKey(rows, sents) {
  const out = rows.map(() => ''), gaps = rows.map(() => '');
  for (let k = 0; k < sents.length; k++) {
    const s = sents[k], stop = rows[s.at].end ? s.at + 1 : k + 1 < sents.length ? sents[k + 1].at : rows.length;
    if (s.gap !== undefined) { if (wOf(s.gap, KEYPX) > rows[s.at].gap - 8) return null; gaps[s.at] = s.gap; }
    let i = s.at;
    for (const w of String(s.text).split(' ').filter(Boolean)) {
      const next = out[i] ? out[i] + ' ' + w : w;
      if (wOf(next, KEYPX) <= keyRoom(rows[i])) { out[i] = next; continue; }
      i++;
      if (i >= stop || wOf(w, KEYPX) > keyRoom(rows[i])) return null;
      out[i] = w;
    }
  }
  return { out, gaps };
}
/** a row to spare: an empty row, or a row onto which a sentence runs with one short word only (the rest of that row is
 *  room for the same sentence); never a row a sentence starts on */
const roomRow = (t, j, starts, r, gap) => !gap && !r.pre && !r.gap && (!t || (!starts.has(j) && !/ /.test(t) && t.length <= 8));
/** a task holds its parts' samples at a child's letter width, with a row to spare in the whole task */
function taskFits(parts) {
  const o = parts.map((p) => place(p.rows, p.sents));
  if (o.some((x) => !x)) return false;
  return o.some((x, i) => { const st = new Set(parts[i].sents.map((q) => q.at)); return x.out.some((t, j) => roomRow(t, j, st, parts[i].rows[j], x.gaps[j])); });
}
const keyFits = (parts) => parts.every((p) => !!placeKey(p.rows, p.sents));

/* ------------------------------------------------------------------ words and their keys */
const tok = (s) => String(s).toLowerCase().replace(/’/g, "'").match(/[a-z]+(?:'[a-z]+)?/g) || [];
const STOP = new Set(['about', 'after', 'again', 'also', 'and', 'another', 'because', 'before', 'being', 'could', 'each', 'every', 'from', 'have', 'here', 'into', 'just', 'many', 'more', 'most', 'much', 'other', 'over', 'some', 'than', 'that', 'their', 'them', 'there', 'they', 'this', 'very', 'what', 'when', 'where', 'which', 'while', 'with', 'would', 'your', 'these', 'those', 'make', 'makes', 'made', 'only', 'once', 'were', 'will', 'does', 'called', 'can', 'the', 'its', 'too', 'for', 'are', 'has', 'not', 'all', 'way']);
const stem = (w) => w.replace(/'s$/, '').replace(/ies$/, 'y').replace(/(sses|ches|shes|xes)$/, (m) => m.slice(0, -2)).replace(/([^s])s$/, '$1');
const content = (s) => new Set(tok(s).filter((w) => w.length >= 4 && !STOP.has(w)).map(stem));
const shares = (a, b) => { const B = content(b); return [...content(a)].filter((w) => B.has(w)); };
/** does a text name one of the key words (a word or its stem)? */
const names = (s, keys) => { const ws = tok(s).map(stem); return keys.some((k) => ws.includes(stem(k))); };
/** an opinion names a word people can disagree with; a statement about the speaker is a fact, never an opinion */
const OPW = /\b(best|better|most fun|prettiest|cutest|coolest|tastiest|funniest|beautiful|boring|fun|great|amazing)\b/i;
const SPEAKER = /^I (like|love|think)\b/i;
/** a sentence that has the shape of a definition (A word is ..., Words are a ...) */
const DEFSHAPE = /^(A|An)\s+[\w ]+?\s+is\s+(a|an|the)\b|^[A-Z][a-z]+\s+(is|are)\s+(a|an|the)\s|^(The|A|An)\s[\w ',]+\s(is|are)\s(a|an|the)\s[\w ',]+\.$/;
/** a word that keeps a note true (some, many, can ...), as a whole word */
const hasQ = (t, q) => new RegExp('(?<!\\p{L})' + q.replace(/ /g, '\\s+') + '(?!\\p{L})', 'iu').test(String(t || ''));
/** the words of QUALS a sentence says before the end of the words a note takes from it (in the same clause) */
const qualsBefore = (sentence, cp) => { const i = sentence.indexOf(cp); if (i < 0) return []; const start = sentence.lastIndexOf(',', i) + 1; const seg = sentence.slice(start, i + cp.length); return QUALS.filter((q) => hasQ(seg, q)); };
/** a note keeps every word of QUALS its sentence says */
const keepsQuals = (sentence, note) => QUALS.filter((q) => hasQ(sentence, q)).every((q) => hasQ(note, q));

/* ------------------------------------------------------------------ the places of right answers (opinion-writing-g3) */
function patternOf(o) {
  const n = o.length;
  for (const par of [0, 1]) { const sub = o.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
  const runs = []; o.forEach((x, i) => { if (i && x === o[i - 1]) runs[runs.length - 1]++; else runs.push(1); });
  if (runs.length >= 3 && runs[0] >= 2 && runs.slice(0, -1).every((r) => r === runs[0])) return 'runs of one length';
  for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (o[i + k] !== o[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
  if (n >= 6 && [2, 3, 4].some((L) => o.every((x, i) => i < L || x === o[i - L]))) return 'a block repeated to the end';
  return '';
}
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
function orderOk(o) {
  if (o.some((x, i) => i >= 2 && x === o[i - 1] && x === o[i - 2])) return false;
  const kinds = [...new Set(o)];
  if (kinds.length === 2 && o.length >= 4 && o.every((x, i) => !i || x !== o[i - 1])) return false;
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

/** the sort of G2-565 never lists all the facts of one heading together (a child could sort by place alone) */
const sortOk = (o) => orderOk(o) && ['h0', 'h1'].every((k) => { const at = o.map((x, i) => (x === k ? i : -1)).filter((i) => i >= 0); return at.length < 2 || at[at.length - 1] - at[0] !== at.length - 1; });
function sortOrder(counts, rng) {
  const bag = Object.entries(counts).flatMap(([k, c]) => Array(c).fill(k));
  for (let t = 0; t < 5000; t++) { const o = shuffle(bag, rng); if (sortOk(o)) return o; }
  throw new Error('no mixed sort of ' + JSON.stringify(counts));
}
/** the closing sentence is never found by its length: on every page another choice is as long or longer, and another
 *  as short or shorter */
const lengthOk = (close, others) => others.some((t) => t.length >= close.length) && others.some((t) => t.length <= close.length);
/** the closing sentence is never found by its opener: if it opens with "Now you know", so does a wrong choice */
const NYK = /^Now you know\b/;
const openerOk = (close, others) => !NYK.test(close) || others.some((t) => NYK.test(t));

/* ------------------------------------------------------------------ levels */
const LEVELS = {
  parts: { 1: { n: 2, off: 1, op: 0, def: false }, 2: { n: 3, off: 0, op: 1, def: true }, 3: { n: 3, off: 1, op: 1, def: true, hook: true } },
  plan: { 1: { help: 'frame' }, 2: { help: 'starter' }, 3: { help: 'open' } },
  endings: { 1: { ch: ['close', 'l1', 'offop'], opts: 2, frame: 'word', links: 4 }, 2: { ch: ['close', 'now', 'ts'], opts: 3, frame: 'gap', links: 4 }, 3: { ch: ['close', 'now', 'ts', 'offop'], opts: 3, frame: 'open', links: 3 } },
  draft: { 1: { help: 'frame' }, 2: { help: 'starter' }, 3: { help: 'open' } },
  notes: { 1: { items: 4, chart: 'copy' }, 2: { items: 4, chart: 'own' }, 3: { items: 5, chart: 'source' } },
  report: { 1: { help: 'frame' }, 2: { help: 'starter' }, 3: { help: 'open' } },
};
const DRAFTROWS = 8;         // the open rows of the level-3 draft
const REPROWS = { 1: 7, 2: 7, 3: 7 };   // the rows of the report's three sentences (level 3 writes them on running rows)
const GAPW2 = Math.ceil(7 * CHILD + 8);  // the gap of G2-567 level 2 holds the longest word to define (droplet, tractor)
const LABELW = 330;                      // the row of the label of the report picture
const DRAWW = 300, DRAWH = 84;          // the least size of the picture box of the report (it grows to the height of its column)
/** the place of the closing sentence among the choices of G2-567, copy by copy: a fixed mixed order (no pattern over
 *  the copies), drawn once per level */
const closePlaces = (lv) => places(20, LEVELS.endings[lv].ch.length, makeRng('informative-writing-g2|closeplace|' + lv));

/* ------------------------------------------------------------------ the writing parts of each page */
const row = (o) => ({ w: INNER, ...o });
/** the planner (G2-566) of a fact topic at a level: [{ name, label, rows, sents }] */
function planParts(lv, t) {
  const help = LEVELS.plan[lv].help, f = t.facts, def = t.def, sample = [f[0][0], f[0][1], f[1][0]];
  const rest = (fact) => fact.t.slice(t.Name.length + 1);
  const P = [];
  if (help === 'frame') {
    P.push({ name: 'ts', label: 'Topic sentence', rows: [row({ pre: PLANFRAME.ts })], sents: [{ at: 0, text: t.name + '.', full: `${PLANFRAME.ts} ${t.name}.` }] });
    P.push({ name: 'facts', label: 'Three facts', rows: [row({ pre: t.Name }), row({ pre: t.Name }), row({ pre: t.Name }), row({})], sents: sample.map((x, i) => ({ at: i, text: rest(x), full: x.t })) });
  } else if (help === 'starter') {
    P.push({ name: 'ts', label: 'Topic sentence', rows: [row({ pre: PLANSTART.ts })], sents: [{ at: 0, text: t.name + '.', full: `${PLANSTART.ts} ${t.name}.` }] });
    P.push({ name: 'facts', label: 'Facts in two groups', rows: [row({ pre: PLANSTART.head }), row({}), row({}), row({ pre: PLANSTART.head }), row({})], sents: [{ at: 0, text: t.heads[0], full: `${PLANSTART.head} ${t.heads[0]}` }, { at: 1, text: sample[0].note, full: sample[0].note }, { at: 2, text: sample[1].note, full: sample[1].note }, { at: 3, text: t.heads[1], full: `${PLANSTART.head} ${t.heads[1]}` }, { at: 4, text: sample[2].note, full: sample[2].note }] });
  } else {
    P.push({ name: 'ts', label: 'Topic sentence', rows: [row({})], sents: [{ at: 0, text: `facts about ${t.name}`, full: `facts about ${t.name}` }] });
    P.push({ name: 'facts', label: 'Facts in two groups, each with a heading', rows: [row({}), row({}), row({}), row({}), row({})], sents: [{ at: 0, text: t.heads[0], full: t.heads[0] }, { at: 1, text: sample[0].note, full: sample[0].note }, { at: 2, text: sample[1].note, full: sample[1].note }, { at: 3, text: t.heads[1], full: t.heads[1] }, { at: 4, text: sample[2].note, full: sample[2].note }] });
  }
  // the definition: two rows, three where its meaning is long (the topic's own measure)
  const defSents = help === 'open' ? [{ at: 0, text: `${def.word}: ${def.meaning}`, full: `${def.word}: ${def.meaning}` }] : [{ at: 0, gap: def.word, text: def.meaning + '.', full: `A ${def.word} is ${def.meaning}.` }];
  const defRows = (n) => [help === 'open' ? row({}) : row({ pre: PLANFRAME.def[0], gap: gapFor(def.word), mid: PLANFRAME.def[1] }), ...Array.from({ length: n - 1 }, () => row({}))];
  P.push({ name: 'def', label: DEFLABEL, rows: defRows(rowsFor(defRows, defSents, 2)), sents: defSents });
  // level 1: a row to spare under the closing frame (a longer closing sentence); level 3: a second row where the note is long
  if (help === 'frame') P.push({ name: 'close', label: 'Closing sentence', rows: [row({ pre: PLANFRAME.close }), row({})], sents: [{ at: 0, text: t.name + '.', full: `${PLANFRAME.close} ${t.name}.` }] });
  else if (help === 'starter') P.push({ name: 'close', label: 'Closing sentence', rows: [row({ pre: PLANSTART.close })], sents: [{ at: 0, text: `about ${t.name}.`, full: `${PLANSTART.close} about ${t.name}.` }] });
  else { const cs3 = [{ at: 0, text: `now you know about ${t.name}`, full: `now you know about ${t.name}` }], cr = (n) => Array.from({ length: n }, () => row({})); P.push({ name: 'close', label: 'Closing sentence', rows: cr(rowsFor(cr, cs3, 1)), sents: cs3 }); }
  // levels 2 and 3: a sixth row for the facts where no other row of the plan is left to spare
  if (help !== 'frame' && !taskFits(P)) P[1].rows.push(row({}));
  return P;
}
/** the fewest rows (from `least`, at most two more) on which a part holds its sentences at a child's letter width */
function rowsFor(make, sents, least) { for (let n = least; n < least + 3; n++) if (place(make(n), sents)) return n; return least; }
/** "They also have pointed ears." from "Foxes have pointed ears." (a can, are, or is moves before also) */
function alsoForm(t, fact) {
  const rest = fact.t.slice(t.Name.length + 1), pro = cap(t.pro);
  const m = /^(can|are|is) (.*)$/.exec(rest);
  return m ? `${pro} ${m[1]} also ${m[2]}` : `${pro} also ${rest}`;
}
/** the sentences of the draft of a fact topic (frames and starters write the same sentences) */
function draftSentences(t, open) {
  const f = t.facts, a = f[0][0], b = f[0][1], c = f[1][0];
  return open
    ? { ts: `Here are some facts about ${t.name}.`, f1: a.t, f2: alsoForm(t, b), f3: c.t, def: `A ${t.def.word} is ${t.def.meaning}.`, close: `Now you know about ${t.name}.` }
    : { ts: `Here are some facts about ${t.name}.`, f1: `One fact is that ${lc1(a.t)}`, f2: `Another fact is that ${lc1(b.t)}`, f3: `Also, ${lc1(c.t)}`, def: `A ${t.def.word} is ${t.def.meaning}.`, close: `Now you know about ${t.name}.` };
}
const after = (full, printed) => { if (!full.startsWith(printed)) throw new Error(`"${full}" does not start with "${printed}"`); return full.slice(printed.length).replace(/^ /, ''); };
/** the draft (G2-568) of a fact topic at a level */
function draftParts(lv, t) {
  const help = LEVELS.draft[lv].help;
  if (help === 'open') {
    const S = draftSentences(t, true), all = [S.ts, S.f1, S.f2, S.f3, S.def, S.close].join(' ');
    const O = [{ name: 'piece', label: 'Your piece', rows: Array.from({ length: DRAFTROWS }, () => row({})), sents: [{ at: 0, text: all, full: all }] }];
    if (!taskFits(O)) O[0].rows.push(row({}));   // a ninth row where eight leave none to spare
    return O;
  }
  const S = draftSentences(t, false), P = help === 'frame' ? DRAFTFRAME : DRAFTSTART;
  const ts = row({ pre: P.ts }), close = row({ pre: P.close });
  const def = help === 'frame' ? row({ pre: 'A', gap: gapFor(t.def.word), mid: 'is' }) : row({ pre: P.def });
  // level 2 leaves the third fact's row open: the child chooses its linking word
  const f3 = P.f3 ? row({ pre: P.f3 }) : row({});
  // the definition gets a second row, a third where its meaning is long; a row to spare under the closing sentence (a
  // longer closing, or a sentence the child adds)
  const dS = help === 'frame' ? { at: 0, gap: t.def.word, text: t.def.meaning + '.', full: S.def } : { at: 0, text: after(S.def, P.def), full: S.def };
  const dn = rowsFor((n) => [def, ...Array.from({ length: n - 1 }, () => row({}))], [dS], 2);
  const rows = [ts, row({ pre: P.f1 }), row({}), row({ pre: P.f2 }), row({}), f3, row({}), def, ...Array.from({ length: dn - 1 }, () => row({})), close];
  const sents = [{ at: 0, text: after(S.ts, P.ts), full: S.ts }, { at: 1, text: after(S.f1, P.f1), full: S.f1 }, { at: 3, text: after(S.f2, P.f2), full: S.f2 }, { at: 5, text: after(S.f3, P.f3), full: S.f3 },
    { ...dS, at: 7 }, { at: 7 + dn, text: after(S.close, P.close), full: S.close }];
  // a row under the closing sentence where no other row of the piece is left to spare
  if (!taskFits([{ name: 'piece', label: '', rows, sents }])) rows.push(row({}));
  return [{ name: 'piece', label: '', rows, sents }];
}
/** the three report sentences of a heading (a fact of Book 1, of Book 2, of both) */
const repFacts = (r, h) => [1, 2, 0].map((src) => r.facts.find((x) => x.h === h && x.src === src));
/** the report part (G2-570): the row for the heading, then the three sentences */
/** the rows of a part of a topic (the same for every heading of the topic: the child writes whichever heading the teacher
 *  gives). Levels 1 and 2: each frame gets two rows, three where a sentence of the topic is long, and a last row to spare
 *  only where some heading would fill every row; level 3: running rows for the three sentences and a row to spare. */
function reportFrameRows(lv, r, h, n, spare) {
  const P = LEVELS.report[lv].help === 'frame' ? REPFRAME : REPSTART, F = repFacts(r, h);
  const full = F.map((x, i) => `${REPFRAME[i]} ${lc1(x.s)}`), rows = [], sents = [];
  full.forEach((f, i) => { sents.push({ at: rows.length, text: after(f, P[i]), full: f }); rows.push(row({ pre: P[i] }), ...Array.from({ length: n[i] - 1 }, () => row({}))); });
  if (spare) rows.push(row({}));
  return { name: 'part', label: '', rows, sents };
}
function reportRows(lv, r) {
  const help = LEVELS.report[lv].help, P = help === 'frame' ? REPFRAME : REPSTART;
  if (help === 'open') return { n: [Math.max(REPROWS[lv], ...[0, 1, 2].map((h) => { const all = repFacts(r, h).map((x) => x.s).join(' '); return rowsFor((n) => Array.from({ length: n }, () => row({})), [{ at: 0, text: all }], REPROWS[lv] - 1) + 1; }))], spare: false };
  const n = [0, 1, 2].map((i) => Math.max(...[0, 1, 2].map((h) => { const x = repFacts(r, h)[i]; return rowsFor((k) => [row({ pre: P[i] }), ...Array.from({ length: k - 1 }, () => row({}))], [{ at: 0, text: after(`${REPFRAME[i]} ${lc1(x.s)}`, P[i]) }], 2); })));
  return { n, spare: [0, 1, 2].some((h) => !taskFits([reportFrameRows(lv, r, h, n, false)])) };
}
function reportParts(lv, r, h) {
  const help = LEVELS.report[lv].help, F = repFacts(r, h), R = reportRows(lv, r);
  const head = { name: 'rhead', label: '', rows: [row({ pre: LINES.headrow })], sents: [{ at: 0, text: r.heads[h], full: `${LINES.headrow} ${r.heads[h]}` }] };
  if (help === 'open') { const all = F.map((x) => x.s).join(' '); return [head, { name: 'part', label: '', rows: Array.from({ length: R.n[0] }, () => row({})), sents: [{ at: 0, text: all, full: all }] }]; }
  return [head, reportFrameRows(lv, r, h, R.n, R.spare)];
}
/** the note chart (G2-569) of a research topic at a level, with the facts of its key */
const CHARTW = INNER - 64;   // a level-3 note row (a box for the book's letter beside it)
function chartParts(lv, r, keys) {
  const kind = LEVELS.notes[lv].chart;
  if (kind === 'source') return [{ name: 'mine', label: '', rows: [...keys.map(() => row({ w: CHARTW })), row({ w: CHARTW })], sents: keys.map((x, i) => ({ at: i, text: x.note, full: x.note, src: x.src })) }];
  const txt = (x) => (kind === 'copy' ? (x.src === 2 ? x.in2 : x.in1) : x.note);
  const by = (s) => keys.filter((x) => x.src === s);
  // one sample note for each book and one for both; the child has room for two notes from each book
  return [
    { name: 'b1', label: '', rows: [row({ pre: 'Book 1:' }), row({})], sents: by(1).map((x) => ({ at: 0, text: txt(x), full: 'Book 1: ' + txt(x) })) },
    { name: 'b2', label: '', rows: [row({ pre: 'Book 2:' }), row({})], sents: by(2).map((x) => ({ at: 0, text: txt(x), full: 'Book 2: ' + txt(x) })) },
    { name: 'both', label: '', rows: [row({ pre: 'Both books:' })], sents: by(0).map((x) => ({ at: 0, text: txt(x), full: 'Both books: ' + txt(x) })) },
  ];
}
/** the definition frame of G2-567 (level 1: the word printed; level 2: the child writes the word in the gap and its
 *  meaning; level 3: the child writes the whole definition) */
function frameParts(lv, fr) {
  const full = `A ${fr.word} is ${fr.meaning}.`, k = LEVELS.endings[lv].frame;
  // two rows; three where the meaning is long (the whole meaning is the key: "a farm machine that pulls tools")
  const first = k === 'word' ? row({ pre: `A ${fr.word} is` }) : k === 'gap' ? row({ pre: 'A', gap: GAPW2, mid: 'is' }) : row({});
  const sents = k === 'word' ? [{ at: 0, text: fr.meaning + '.', full }] : k === 'gap' ? [{ at: 0, gap: fr.word, text: fr.meaning + '.', full }] : [{ at: 0, text: full, full }];
  const make = (n) => [first, ...Array.from({ length: n - 1 }, () => row({}))];
  const n0 = rowsFor(make, sents, 1), n = Math.max(2, taskFits([{ rows: make(n0), sents }]) ? n0 : n0 + 1);   // and room to spare
  return [{ name: 'frame', label: '', rows: make(n), sents }];
}
const frameFits = (lv, fr) => { const p = frameParts(lv, fr); return p[0].rows.length <= 3 && taskFits(p) && keyFits(p); };

/* ------------------------------------------------------------------ what a page holds */
/** copy `variant` takes the item at its place in a fixed order of the pool (seeded by the name of the order): copy n of
 *  two pages that share an order (plan and draft; notes and report) has one topic */
const orderOf = (pool, name) => makeRng('informative-writing-g2|' + name).shuffle(pool);
const at = (o, variant) => o[((variant || 1) - 1) % o.length];
const factTopic = (b, variant) => at(orderOf(b.topics, 'facts'), variant);
const researchTopic = (b, variant) => at(orderOf(b.research, 'research'), variant);
/** the mentor topics of copy `variant` of G2-565: the piece (A) and the sort (B). A fixed order of all pairs; each copy
 *  takes the next pair no earlier copy took whose topics are not near the fact topic of the plan of the same copy, so no
 *  two copies print one pair */
function mentorPair(b, variant) {
  const ord = orderOf(b.mentor, 'mentor'), n = ord.length, pairs = [];
  for (let d = 1; d < n; d++) for (let i = 0; i < n; i++) pairs.push([ord[i], ord[(i + d) % n]]);
  const used = new Set();
  let got = null;
  for (let v = 1; v <= (variant || 1); v++) {
    const F = factTopic(b, v);
    got = pairs.find((p) => !used.has(p[0].key + '|' + p[1].key) && !F.near.includes(p[0].key) && !F.near.includes(p[1].key)) || pairs[(v - 1) % pairs.length];
    used.add(got[0].key + '|' + got[1].key);
  }
  return got;
}
/** the end topic of copy `variant` of G2-567 and the round it is in: each round of copies takes every end topic once, in a
 *  fixed order, skipping a topic near the fact topic of the draft of the same copy */
function endTopic(b, variant) {
  const ord = orderOf(b.ends, 'ends'), n = ord.length;
  let used = new Set(), cyc = 0, got = null;
  for (let v = 1; v <= (variant || 1); v++) {
    const F = factTopic(b, v);
    if (used.size >= n || !ord.some((e) => !used.has(e.key) && !F.near.includes(e.key))) { used = new Set(); cyc++; }
    got = ord.find((e) => !used.has(e.key) && !F.near.includes(e.key)) || ord[(v - 1) % n];
    used.add(got.key);
  }
  return [got, cyc];
}
/** the word to define and the gaps of copy `variant` of G2-567 at a level: from fixed orders of their pools, by the
 *  copy's number, never those of the earlier copy on the same piece; the gaps come from end topics other than the piece
 *  (its sentences would answer them), one per topic. Levels 1 and 2 (four gaps): also, another, and each at least once;
 *  level 3 (three gaps): on two copies in three one word is the answer of two gaps, so the last gap is never found by
 *  elimination */
function endExtras(b, lv, variant) {
  const [C, cyc] = endTopic(b, variant), F = factTopic(b, variant), ok = (k) => !F.near.includes(k), v = variant - 1;
  let prev = null;
  for (let u = variant - 1; u >= 1; u--) if (endTopic(b, u)[0].key === C.key) { prev = endExtras(b, lv, u); break; }
  const frs = orderOf(b.frames, 'frames').filter((x) => ok(x.key) && frameFits(lv, x) && !C.piece.some((s) => tok(s).includes(x.word)));
  if (!frs.length) throw new Error('no word to define on level ' + lv);
  const rotate = (L, start) => Array.from({ length: L.length }, (_, j) => L[(start + j) % L.length]);
  const frame = rotate(frs, v + cyc).find((x) => !prev || x.word !== prev.frame.word) || frs[(v + cyc) % frs.length];
  const extra = LINKWORDS[(v + cyc) % 3], other = LINKWORDS[(v + cyc + 1) % 3], n = LEVELS.endings[lv].links;
  const counts = n === 4 ? { also: 1, another: 1, and: 1, [extra]: 2 } : v % 3 === 2 ? { also: 1, another: 1, and: 1 } : { [extra]: 2, [other]: 1 };
  const ordK = kindOrder(counts, makeRng('informative-writing-g2|kinds|' + lv + '|' + variant));
  const pool = b.links.filter((x) => x.key !== C.key && ok(x.key)), items = [], seen = {};
  for (const kd of ordK) {
    const L = rotate(orderOf(pool.filter((x) => x.want === kd), 'links-' + kd), 2 * v + 3 * cyc + (seen[kd] || 0));
    seen[kd] = (seen[kd] || 0) + 1;
    const free = (x) => !items.some((y) => y.key === x.key || y.t === x.t);
    const c = L.find((x) => free(x) && !(prev && prev.items.some((y) => y.t === x.t))) || L.find(free);
    if (!c) throw new Error('no linking sentence of the kind ' + kd);
    items.push(c);
  }
  return { frame, items };
}
const offFor = (b, texts, keys, rng) => shuffle(b.off.filter((o) => !o.avoid.some((k) => keys.includes(k)) && !texts.some((t) => shares(o.t, t).length)), rng)[0];
const mentorText = (m) => [...m.piece.map((x) => x.t), ...m.sort.flat(), m.op].join(' ');
const endText = (e) => [...e.piece, e.close, e.fact, e.l1, e.now].join(' ');
/** the text of an ending of a kind */
const endingText = (C, kind, off) => (kind === 'close' ? C.close : kind === 'l1' ? C.l1 : kind === 'now' ? C.now : kind === 'ts' ? C.piece[0] : off);
/** the model of G2-568 (a mentor piece cut to five sentences): the topic sentence, the fact that names the word the
 *  definition defines (or the first other fact), the fact with also, the definition, the closing sentence */
function modelOf(m) {
  const facts = m.piece.filter((x) => x.role === 'fact'), def = m.piece.find((x) => x.role === 'def');
  const alsoF = facts.find((x) => /\balso\b/.test(x.t)), dword = def ? stem(tok(def.t)[def.t.startsWith('A ') || def.t.startsWith('An ') ? 1 : 0]) : '';
  const defF = facts.find((x) => x !== alsoF && tok(x.t).map(stem).includes(dword)) || facts.find((x) => x !== alsoF);
  return [m.piece[0], defF, alsoF, def, m.piece[m.piece.length - 1]].filter(Boolean).map((x) => x.t);
}

function plan(b, mode, lv, rng, variant) {
  const v = (variant || 1) - 1;
  if (mode === 'parts') {
    const d = LEVELS.parts[lv], [A, B] = mentorPair(b, variant);
    // the sort: the facts of B (level 1: two per heading), a fact about something else, an opinion
    const fs = [0, 1].map((h) => shuffle(B.sort[h], rng).slice(0, d.n).map((t) => ({ kind: 'h' + h, t })));
    const extra = [];
    if (d.off) { const o = offFor(b, [mentorText(A), mentorText(B)], [A.key, B.key], rng); if (!o) throw new Error('no fact about something else for ' + B.key); extra.push({ kind: 'off', t: o.t }); }
    if (d.op) extra.push({ kind: 'op', t: B.op });
    const counts = { h0: d.n, h1: d.n }; extra.forEach((x) => { counts[x.kind] = 1; });
    const ordK = sortOrder(counts, rng), q = { h0: fs[0].slice(), h1: fs[1].slice(), off: extra.filter((x) => x.kind === 'off'), op: extra.filter((x) => x.kind === 'op') };
    const items = ordK.map((k) => q[k].shift());
    // level 3: every other copy opens the piece with a question, so the topic sentence is found by what it says
    const hook = d.hook && v % 2 === 0 ? A.hook : null;
    return { mode, lv, A, B, hook, items, list: [...(hook ? ['hook:' + hook] : []), ...A.piece.map((x) => 'piece:' + x.t), ...items.map((x) => 'sort:' + x.t)] };
  }
  if (mode === 'plan') {
    // the box: the three facts of the first heading, the first two of the second (one of them is in the sample), the word
    const t = factTopic(b, variant), order = kindOrder({ h0: 3, h1: 2 }, rng), q = [t.facts[0].slice(), t.facts[1].slice(0, 2)];
    const box = order.map((k) => q[+k.slice(1)].shift());
    const ex = shuffle(b.mentor.filter((m) => !t.near.includes(m.key)), rng)[0];
    return { mode, lv, t, box, ex, heads: shuffle([0, 1, 2], rng), list: ['topic:' + t.key, 'ex:' + ex.key] };
  }
  if (mode === 'endings') {
    const d = LEVELS.endings[lv];
    const [C] = endTopic(b, variant);
    const at = closePlaces(lv)[v % 20];
    for (let k = 0; k < 600; k++) {
      const off = shuffle(b.offop.filter((o) => !shares(o, endText(C)).length), rng)[0];
      const wrong = shuffle(d.ch.filter((x) => x !== 'close'), rng);
      const kinds = [...wrong.slice(0, at), 'close', ...wrong.slice(at)];
      const choices = kinds.map((kd) => ({ kind: kd, t: endingText(C, kd, off) }));
      const others = choices.filter((x) => x.kind !== 'close').map((x) => x.t);
      if (!lengthOk(C.close, others) || !openerOk(C.close, others)) continue;
      // the word to define and the gaps are drawn by the copy's number (never by chance), so a copy on the same piece as an
      // earlier copy prints another word and other gaps
      const { frame, items } = endExtras(b, lv, variant);
      if (items.length !== d.links) continue;
      const atP = places(items.length, d.opts, rng);
      const links = items.map((x, i) => { const wrongW = shuffle(LINKWORDS.filter((w) => w !== x.want), rng).slice(0, d.opts - 1); wrongW.splice(atP[i], 0, x.want); return { ...x, opts: wrongW }; });
      return { mode, lv, C, choices, frame, links, list: [...C.piece.map((s) => 'piece:' + s), ...choices.map((x) => 'end:' + x.t), 'frame:' + frame.word, ...links.map((x) => 'gap:' + x.t)] };
    }
    throw new Error('no page of endings');
  }
  if (mode === 'draft') {
    const t = factTopic(b, variant), ex = shuffle(b.mentor.filter((m) => !t.near.includes(m.key)), rng)[0];
    return { mode, lv, t, ex, list: ['topic:' + t.key, 'model:' + ex.key] };
  }
  if (mode === 'notes') {
    const r = researchTopic(b, variant), d = LEVELS.notes[lv];
    for (let k = 0; k < 600; k++) {
      const counts = d.items === 4 ? shuffle([{ 0: 2, 1: 1, 2: 1 }, { 0: 1, 1: 2, 2: 1 }, { 0: 1, 1: 1, 2: 2 }], rng)[0] : shuffle([{ 0: 1, 1: 2, 2: 2 }, { 0: 2, 1: 2, 2: 1 }, { 0: 2, 1: 1, 2: 2 }], rng)[0];
      const ord = kindOrder(counts, rng), q = [0, 1, 2].map((s) => shuffle(r.facts.filter((x) => x.src === s), rng));
      const items = ord.map((s) => q[+s].shift());
      // the chart's key: only facts the which-book task does not show (no note of the table is a note of the chart)
      const unused = (s) => shuffle(r.facts.filter((x) => x.src === s && !items.includes(x)), rng), pick = (s, n) => unused(s).slice(0, n);
      let keys;
      if (d.chart === 'source') { const extra = rng.int(1, 2); keys = shuffle([...pick(1, extra === 1 ? 2 : 1), ...pick(2, extra === 2 ? 2 : 1), ...pick(0, 1)], rng); if (keys.length !== 4 || !placesOk(keys.map((x) => x.src), 3)) continue; }
      else { keys = [...pick(1, 1), ...pick(2, 1), ...pick(0, 1)]; if (keys.length !== 3) continue; }
      const parts = chartParts(lv, r, keys);
      if (!taskFits(parts) || !keyFits(parts)) continue;
      const wk = shuffle(b.worked.filter((x) => !r.near.includes(x.key)), rng)[0];
      return { mode, lv, r, items, keys, wk, list: ['topic:' + r.key, ...items.map((x) => 'note:' + x.note), 'worked:' + wk.key] };
    }
    throw new Error('no page of notes for ' + r.key);
  }
  if (mode === 'report') {
    // levels 1 and 2 print every heading with its notes (the teacher gives each table a heading); the key writes the
    // part of one heading as its sample
    const r = researchTopic(b, variant), h = v % 3;
    return { mode, lv, r, h, hs: shuffle([0, 1, 2], rng), list: ['topic:' + r.key, ...(lv < 3 ? r.facts.map((x) => 'note:' + x.note) : ['head:' + r.heads[h]])] };
  }
  throw new Error('informative-writing-g2: no plan for ' + mode);
}

/* ------------------------------------------------------------------ the bank */
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(b) {
  const f = [];
  const M = b.mentor || [], E = b.ends || [], TP = b.topics || [], RS = b.research || [];
  const keysOf = (L) => L.map((x) => x.key);
  // four sets of topics that never meet
  { const all = [...keysOf(M), ...keysOf(E), ...keysOf(TP), ...keysOf(RS)]; if (new Set(all).size !== all.length) f.push('topics: a topic stands in two sets (or twice)'); }
  // ---- mentor topics (G2-565; the models of G2-568)
  if (M.length < 8) f.push('mentor: fewer than eight topics');
  M.forEach((m) => {
    const roles = m.piece.map((x) => x.role).join(',');
    if (m.piece[0].role !== 'ts' || m.piece[m.piece.length - 1].role !== 'close' || m.piece.filter((x) => x.role === 'fact').length !== 3 || m.piece.filter((x) => x.role === 'def').length !== 1 || m.piece.length !== 6) f.push(`mentor ${m.key}: the piece is not topic sentence, three facts, a definition, closing sentence (${roles})`);
    const n = words(m.piece.map((x) => x.t).join(' ')); if (n < 40 || n > 60) f.push(`mentor ${m.key}: the piece has ${n} words (40 to 60)`);
    m.piece.forEach((x) => { if (!/^[A-Z].*\.$/.test(x.t)) f.push(`mentor ${m.key}: "${x.t}" is not a sentence`); if (x.role !== 'def' && DEFSHAPE.test(x.t)) f.push(`mentor ${m.key}: "${x.t}" has the shape of a definition (a second right answer to "circle the definition")`); if (x.role === 'def' && !/\b(is|are)\b/.test(x.t)) f.push(`mentor ${m.key}: the definition "${x.t}" does not say what a word is`); if (OPW.test(x.t)) f.push(`mentor ${m.key}: "${x.t}" holds an opinion word`); });
    const ts = m.piece[0].t, cl = m.piece[m.piece.length - 1].t;
    if (!names(ts, tok(m.name).filter((w) => w.length > 3))) f.push(`mentor ${m.key}: the topic sentence "${ts}" does not name the topic`);
    if (tok(ts).join(' ') === tok(cl).join(' ')) f.push(`mentor ${m.key}: the closing sentence repeats the topic sentence`);
    if (!names(cl, tok(m.name)) && !shares(cl, ts).length) f.push(`mentor ${m.key}: the closing sentence "${cl}" does not name the topic again`);
    // the model of G2-568: one fact holds also; the model is five sentences
    if (m.piece.filter((x) => x.role === 'fact' && /\balso\b/.test(x.t)).length !== 1) f.push(`mentor ${m.key}: not one fact with "also" (the model shows also)`);
    if (modelOf(m).length !== 5) f.push(`mentor ${m.key}: the model is not five sentences`);
    if (!m.hook || !/^[A-Z][^.!?]*\?$/.test(m.hook) || words(m.hook) > 7 || OPW.test(m.hook)) f.push(`mentor ${m.key}: the opening question "${m.hook}" is not a short question`);
    if ((m.sort || []).length !== 2 || m.sort.some((g) => g.length !== 3) || (m.heads || []).length !== 2 || m.heads[0] === m.heads[1]) f.push(`mentor ${m.key}: not two headings with three facts each`);
    (m.sort || []).forEach((g, h) => g.forEach((t) => {
      if (!/^[A-Z].*\.$/.test(t) || OPW.test(t)) f.push(`mentor ${m.key}: "${t}" is not a fact`);
      if (!names(t, m.hk[h])) f.push(`mentor ${m.key}: "${t}" names no key word of its heading ${m.heads[h]}`);
      if (names(t, m.hk[1 - h])) f.push(`mentor ${m.key}: "${t}" fits the heading ${m.heads[1 - h]} too (one home only)`);
      if (m.piece.some((x) => tok(x.t).join(' ') === tok(t).join(' '))) f.push(`mentor ${m.key}: "${t}" is a sentence of its own piece`);
    }));
    if (!OPW.test(m.op) || SPEAKER.test(m.op) || !/^[A-Z].*\.$/.test(m.op)) f.push(`mentor ${m.key}: "${m.op}" is not an opinion (or is a statement about the speaker)`);
    if (!Array.isArray(m.ex) || ![0, 1].includes(m.ex[0]) || !names(m.ex[1], m.hk[m.ex[0]]) || names(m.ex[1], m.hk[1 - m.ex[0]]) || m.ex[1].length > 22 || !(m.sort[m.ex[0]] || []).includes(m.ex[2]) || !keepsQuals(m.ex[2], m.ex[1])) f.push(`mentor ${m.key}: the plan for another topic is not a fact of its heading with a note that fits that heading only and keeps its can / some / many`);
    if (b.off.filter((o) => !o.avoid.includes(m.key) && !shares(o.t, mentorText(m)).length).length < 3) f.push(`mentor ${m.key}: fewer than three facts about something else share no word with it`);
  });
  (b.off || []).forEach((o) => { if (!/^[A-Z].*\.$/.test(o.t) || OPW.test(o.t)) f.push(`off: "${o.t}" is not a fact`); o.avoid.forEach((k) => { if (!M.some((m) => m.key === k)) f.push(`off: "${o.t}" avoids a topic that does not exist (${k})`); }); });
  // ---- end topics (G2-567)
  if (E.length < 8) f.push('ends: fewer than eight topics');
  E.forEach((e) => {
    const n = words(e.piece.join(' ')); if (e.piece.length !== 4 || n < 28 || n > 50) f.push(`ends ${e.key}: not a topic sentence and three facts of 28 to 50 words (${n})`);
    [...e.piece, e.close, e.fact, e.l1, e.now].forEach((s) => { if (!/^[A-Z].*\.$/.test(String(s))) f.push(`ends ${e.key}: "${s}" is not a sentence`); if (OPW.test(String(s))) f.push(`ends ${e.key}: "${s}" holds an opinion word`); });
    if (tok(e.close).join(' ') === tok(e.piece[0]).join(' ')) f.push(`ends ${e.key}: the closing sentence is the topic sentence again`);
    if (!names(e.close, tok(e.name)) && !shares(e.close, e.piece[0]).length) f.push(`ends ${e.key}: the closing sentence "${e.close}" does not name the topic again`);
    [e.fact, e.l1, e.now].forEach((x) => { if (e.piece.some((s) => shares(s, x).filter((w) => !content(e.name).has(w)).length >= 2)) f.push(`ends ${e.key}: the new fact "${x}" is a fact of the piece`); });
    // the new-fact endings: level 2 and 3 open with "Now you know that"; level 1 opens with "Now you know" where the closing does
    if (!/^Now you know that /.test(e.now) || NYK.test(e.l1) !== NYK.test(e.close)) f.push(`ends ${e.key}: the new-fact endings do not open as the closing does ("Now you know")`);
    // the closing is never the longest or the shortest choice of a level (levels 1 and 3 with an opinion that fits)
    const offs = b.offop.filter((o) => !shares(o, endText(e)).length);
    if (!offs.some((o) => lengthOk(e.close, [e.l1, o]))) f.push(`ends ${e.key}: on level 1 the closing sentence is the longest or the shortest choice`);
    if (!lengthOk(e.close, [e.now, e.piece[0]])) f.push(`ends ${e.key}: on level 2 the closing sentence is the longest or the shortest choice`);
    if (!offs.some((o) => lengthOk(e.close, [e.now, e.piece[0], o]))) f.push(`ends ${e.key}: on level 3 the closing sentence is the longest or the shortest choice`);
    if (offs.length < 2) f.push(`ends ${e.key}: fewer than two opinions about something else share no word with it`);
    for (const k of ['also', 'another', 'and']) if (!b.links.some((x) => x.key === e.key && x.want === k)) f.push(`ends ${e.key}: no linking sentence for ${k}`);
  });
  // the closing is not found by its opener: at most a third of the closings open with "Now you know"
  if (E.filter((e) => NYK.test(e.close)).length > E.length / 3) f.push(`ends: ${E.filter((e) => NYK.test(e.close)).length} of ${E.length} closing sentences open with "Now you know"`);
  (b.offop || []).forEach((o) => { if (!OPW.test(o) || SPEAKER.test(o) || !/^[A-Z].*\.$/.test(o)) f.push(`offop: "${o}" is not an opinion`); });
  const endKeys = keysOf(E);
  // the words to define: "<meaning> is called a <word>." (the key writes the whole meaning); three or more fit each level
  (b.frames || []).forEach((x) => {
    if (!endKeys.includes(x.key)) f.push(`frames: "${x.word}" belongs to no end topic`);
    if (x.context.toLowerCase() !== `${x.meaning} is called a ${x.word}.`.toLowerCase() && x.context.toLowerCase() !== `${x.meaning} is called an ${x.word}.`.toLowerCase()) f.push(`frames: "${x.context}" is not "<meaning> is called a ${x.word}." (the key keeps the whole meaning)`);
    if (x.word.length > 7) f.push(`frames: "${x.word}" is longer than the gap of level 2`);
  });
  for (const lv of [1, 2, 3]) { const n = (b.frames || []).filter((x) => frameFits(lv, x)).length; if (n < 3) f.push(`frames: only ${n} definitions fit the rows of level ${lv} with a row to spare`); }
  // the linking words: one blank in the middle; also between a subject and its verb, another before one thing, and between
  // two words of one kind; no other linking word in the sentence
  (b.links || []).forEach((x) => {
    const t = x.t, [l, r] = t.split('___');
    if (t.split('___').length !== 2 || !l.trim() || !/\.$/.test(t)) f.push(`links: "${t}" is not a sentence with one blank in the middle`);
    if (/\b(also|another|and)\b/i.test(t.replace('___', ' '))) f.push(`links: "${t}" holds a linking word of its own`);
    if (!LINKWORDS.includes(x.want)) f.push(`links: "${t}" wants no linking word of the page`);
    if (x.want === 'also' && !/\b(They|They can|Some)\s*$/.test(l)) f.push(`links: "${t}": also stands between a subject and its verb`);
    if (x.want === 'another' && !/^\s*(kind|animal|crop|plant|way|place|one)\b/.test(r)) f.push(`links: "${t}": another stands before one thing`);
    if (x.want === 'and' && (/\b(They|They can|Some)\s*$/.test(l) || /^\s*(kind|animal|crop|plant|way|place|one)\b/.test(r))) f.push(`links: "${t}": the blank for and looks like a blank for also or another`);
  });
  // ---- fact topics (G2-566, G2-568)
  if (TP.length < 14) f.push('topics: fewer than fourteen fact topics');
  const defWords = (b.frames || []).map((x) => x.word);
  // every sentence of a day-1 page of lessons 1 and 2 (a fact of a plan or a draft never stands on one)
  const day1 = [...M.flatMap((m) => [...m.piece.map((x) => x.t), ...m.sort.flat(), m.op, m.hook]), ...(b.off || []).map((o) => o.t), ...E.flatMap((e) => [...e.piece, e.close, e.fact, e.l1, e.now]), ...(b.offop || []), ...(b.frames || []).map((x) => x.context), ...(b.links || []).map((x) => x.t)];
  TP.forEach((t) => {
    if (t.facts.length !== 2 || t.facts.some((g) => g.length !== 3) || t.heads.length !== 3 || new Set(t.heads).size !== 3) f.push(`topics ${t.key}: not two headings of three facts and a third heading`);
    const nameWords = tok(t.Name).filter((w) => w.length > 3).map(stem);
    t.facts.forEach((g, h) => g.forEach((x, i) => {
      // the facts the samples use start with the topic's name; every fact names the topic
      const sample = (h === 0 && i < 2) || (h === 1 && i === 0);
      if ((sample ? !x.t.startsWith(t.Name + ' ') : !nameWords.some((w) => tok(x.t).map(stem).includes(w))) || !/\.$/.test(x.t) || OPW.test(x.t)) f.push(`topics ${t.key}: "${x.t}" is not a fact that ${sample ? 'starts with ' + t.Name : 'names the topic'}`);
      if (/\btoo\b/.test(x.t)) f.push(`topics ${t.key}: "${x.t}" says "too" (the draft adds "also" to a fact)`);
      if (!names(x.t, t.hk[h])) f.push(`topics ${t.key}: "${x.t}" names no key word of its heading ${t.heads[h]}`);
      if (names(x.t, t.hk[1 - h])) f.push(`topics ${t.key}: "${x.t}" fits the heading ${t.heads[1 - h]} too (one home only)`);
      if (!x.note || x.note.length > 28 || /[.?!]$/.test(x.note)) f.push(`topics ${t.key}: the note "${x.note}" is not a few words`);
      if (!keepsQuals(x.t, x.note)) f.push(`topics ${t.key}: the note "${x.note}" says more than "${x.t}"`);
      if (/^(cannot|do not|does not)\b/.test(x.t.slice(t.Name.length + 1)) && h === 0 && i === 1) f.push(`topics ${t.key}: "${x.t}" cannot take also (the second fact of the level-3 draft)`);
    }));
    // the third heading fits no sentence of the box (its facts and its definition)
    if ([...t.facts.flat().map((x) => x.t), t.def ? t.def.t : ''].some((s) => names(s, tok(t.heads[2]).filter((w) => w.length > 3)))) f.push(`topics ${t.key}: the third heading ${t.heads[2]} fits a sentence of the box (it must fit none)`);
    if (!t.def || !t.def.t.includes(t.def.word) || defWords.includes(t.def.word) || (b.mentor || []).some((m) => m.piece.some((x) => x.role === 'def' && tok(x.t).includes(t.def.word)))) f.push(`topics ${t.key}: the word "${(t.def || {}).word}" is not named in its fact, or is a word of a day-1 page`);
    if (!['they', 'it'].includes(t.pro)) f.push(`topics ${t.key}: no pronoun`);
    t.near.forEach((k) => { if (![...keysOf(M), ...keysOf(E)].includes(k)) f.push(`topics ${t.key}: the near topic ${k} does not exist`); });
    for (const lv of [1, 2, 3]) {
      const p = planParts(lv, t); if (!taskFits(p)) f.push(`topics ${t.key}: the plan of level ${lv} does not hold its sample at a child's letter width with a row to spare (${p.filter((x) => !place(x.rows, x.sents)).map((x) => x.name).join(', ')})`); if (!keyFits(p)) f.push(`topics ${t.key}: the key cannot write the plan of level ${lv}`);
      const q = draftParts(lv, t); if (!taskFits(q)) f.push(`topics ${t.key}: the draft of level ${lv} does not hold its sample at a child's letter width with a row to spare`); if (!keyFits(q)) f.push(`topics ${t.key}: the key cannot write the draft of level ${lv}`);
    }
    // nothing of a day-1 page of lessons 1 and 2 tells about this topic (its own name word: apple, fox, snow)
    const own = [...content(t.Name)].filter((w) => !['tree', 'carrier'].includes(w));
    day1.forEach((s) => { if (own.some((w) => content(s).has(w)) || tok(s).includes(t.def.word)) f.push(`topics ${t.key}: a day-1 page tells about it ("${s}")`); });
    t.facts.flat().forEach((x) => { if (x.note.length > Math.floor((INNER - PADL - PADR) / CHILD)) f.push(`topics ${t.key}: the note "${x.note}" does not fit a row`); });
  });
  // ---- research topics (G2-569, G2-570)
  if (RS.length < 14) f.push('research: fewer than fourteen topics');
  RS.forEach((r) => {
    const bt = r.books.map((x) => x.s.join(' ')), topicWords = new Set([...content(r.Name), ...content(r.q)]);
    r.books.forEach((x, i) => { const n = words(bt[i]); if (n < 40 || n > 60) f.push(`research ${r.key}: Book ${i + 1} has ${n} words (40 to 60)`); });
    if (!/\?$/.test(r.q) || r.heads.length !== 3 || new Set(r.heads).size !== 3) f.push(`research ${r.key}: no research question or not three headings`);
    if (!Array.isArray(r.hk) || r.hk.length !== 3) f.push(`research ${r.key}: no key words for the three headings`);
    if (r.facts.length !== 9) f.push(`research ${r.key}: not nine facts`);
    for (let h = 0; h < 3; h++) for (const s of [0, 1, 2]) if (r.facts.filter((x) => x.h === h && x.src === s).length !== 1) f.push(`research ${r.key}: the heading ${r.heads[h]} has not one fact from Book 1, Book 2, and both`);
    r.facts.forEach((x) => {
      // the proof: the sentence of each book that states the note (Book 1 and Book 2 for a note of both)
      if (x.src !== 2 && (!x.in1 || !x.p1 || !r.books[0].s.includes(x.p1) || !x.p1.includes(x.in1))) f.push(`research ${r.key}: "${x.note}": no sentence of Book 1 states it ("${x.in1}")`);
      if (x.src !== 1 && (!x.in2 || !x.p2 || !r.books[1].s.includes(x.p2) || !x.p2.includes(x.in2))) f.push(`research ${r.key}: "${x.note}": no sentence of Book 2 states it ("${x.in2}")`);
      if (x.src === 1 && (x.in2 || x.p2)) f.push(`research ${r.key}: "${x.note}" is a Book 1 fact with words in Book 2`);
      if (x.src === 2 && (x.in1 || x.p1)) f.push(`research ${r.key}: "${x.note}" is a Book 2 fact with words in Book 1`);
      // a fact of one book only: no word of its note stands in the other book (but the topic's own words and the words ruled harmless)
      if (x.src) { const other = content(bt[2 - x.src]), bad = [...content(x.note)].filter((w) => other.has(w) && !topicWords.has(w) && !x.ok.map(stem).includes(w)); if (bad.length) f.push(`research ${r.key}: "${x.note}" (Book ${x.src} only) has words the other book has too (${bad.join(', ')})`); }
      if (!x.note || x.note.length > 36 || /[.?!]$/.test(x.note) || /^[A-Z]/.test(x.note.replace(/^X-/, 'x-'))) f.push(`research ${r.key}: the note "${x.note}" is not a few words`);
      if (!/^[A-Z].*\.$/.test(x.s)) f.push(`research ${r.key}: "${x.s}" is not a sentence`);
      (x.s.match(/\d+/g) || []).forEach((num) => { if (!bt.some((t) => t.includes(num))) f.push(`research ${r.key}: the number ${num} of "${x.s}" stands in no book`); });
      (x.s.match(/\b(all|always|only|most|never|every)\b/gi) || []).forEach((w) => { if (!bt.some((t) => new RegExp('\\b' + w + '\\b', 'i').test(t))) f.push(`research ${r.key}: "${x.s}" says "${w}", which no book says`); });
      // a note never says more than its book: the copied words keep the words of their sentence that keep it true (some,
      // many, can, often ...); the note and the report sentence keep them too, unless the other book says it plainly
      const q1 = x.src !== 2 && x.p1 ? qualsBefore(x.p1, x.in1) : [], q2 = x.src !== 1 && x.p2 ? qualsBefore(x.p2, x.in2) : [];
      [[x.in1, q1], [x.in2, q2]].forEach(([cp, qs]) => qs.forEach((q) => { if (!hasQ(cp, q)) f.push(`research ${r.key}: the copied words "${cp}" leave out "${q}"`); }));
      const need = x.src === 1 ? q1 : x.src === 2 ? q2 : q1.filter((q) => q2.includes(q));
      need.forEach((q) => { for (const t of [x.note, x.s]) if (!hasQ(t, q)) f.push(`research ${r.key}: "${t}" leaves out "${q}", which its book says`); });
      // one home: the note fits the key words of its heading and of no other heading of its topic
      if (Array.isArray(r.hk) && r.hk.length === 3) { if (!names(x.note, r.hk[x.h])) f.push(`research ${r.key}: the note "${x.note}" fits no key word of its heading ${r.heads[x.h]}`); [0, 1, 2].filter((h) => h !== x.h).forEach((h) => { if (names(x.note, r.hk[h])) f.push(`research ${r.key}: the note "${x.note}" fits the heading ${r.heads[h]} too (one home only)`); }); }
    });
    // (the report parts are drawn only from a sound set of facts: one per heading and book)
    if (r.facts.length === 9 && [0, 1, 2].every((h) => [0, 1, 2].every((s) => r.facts.filter((x) => x.h === h && x.src === s).length === 1)))
    for (let h = 0; h < 3; h++) for (const lv of [1, 2, 3]) { const p = reportParts(lv, r, h); if (!taskFits(p)) f.push(`research ${r.key}: the report part ${r.heads[h]} of level ${lv} does not hold its sample with a row to spare`); if (!keyFits(p)) f.push(`research ${r.key}: the key cannot write the report part ${r.heads[h]} of level ${lv}`); }
    r.near.forEach((k) => { if (!(b.worked || []).some((w) => w.key === k)) f.push(`research ${r.key}: the near worked note ${k} does not exist`); });
    if (!r.one || r.one.length > freeOf(row({ w: LABELW })) - 2) f.push(`research ${r.key}: the sample label "${r.one}" does not fit its row with room to spare`);
    if (!r.pic) f.push(`research ${r.key}: no picture`);
  });
  (b.worked || []).forEach((w) => { if (![...keysOf(M), ...keysOf(E)].includes(w.key) || !w.from.includes(w.copy) || !w.own || w.own.length > 26 || !keepsQuals(w.from, w.copy) || !keepsQuals(w.from, w.own)) f.push(`worked: the note of "${w.from}" is not a model topic's copied and own note that keeps its can / some / many`); });
  // the topics the teacher notes model with stand on no page
  { const text = JSON.stringify({ ...b, modelOnly: [] }).toLowerCase(); (b.modelOnly || []).forEach((w) => { if (new RegExp('(?<![a-z])' + w + '(?![a-z])').test(text)) f.push(`modelOnly: "${w}" stands on a page`); }); if (!(b.modelOnly || []).length) f.push('modelOnly: no topics for the teacher notes'); }
  // ---- every level of every page can be drawn, the first copies differ, and copy n of a day-1 page never stands on a
  // topic near the day-2 page of copy n; across the copies of G2-567 the closing sentence stands in no pattern of places,
  // and on level 3 a linking word answers two gaps on some copies
  if (!f.length) for (const mode of Object.keys(LEVELS)) for (const lv of [1, 2, 3]) {
    const ps = [];
    for (let s = 1; s <= 20; s++) { try { ps.push(plan(b, mode, lv, makeRng('informative-writing-g2|' + mode + '|' + lv + '|' + s), s)); } catch (e) { f.push(`${mode} level ${lv} cannot be drawn: ${e.message}`); break; } }
    if (ps.length < 20) continue;
    for (let i = 0; i < 14; i++) for (let j = i + 1; j < 14; j++) { const A0 = new Set(ps[i].list), same = ps[j].list.filter((x) => A0.has(x)).length; if (same > 0.75 * Math.min(ps[i].list.length, ps[j].list.length)) { f.push(`${mode} level ${lv}: copies ${i + 1} and ${j + 1} share ${same} of their items`); i = 99; break; } }
    if (mode === 'endings') {
      const at = ps.slice(0, 14).map((p) => p.choices.findIndex((x) => x.kind === 'close'));
      if (!placesOk(at, LEVELS.endings[lv].ch.length)) f.push(`endings level ${lv}: the closing sentence stands in a pattern of places over the copies (${at.join('')})`);
      if (lv === 3 && ps.slice(0, 14).filter((p) => new Set(p.links.map((x) => x.want)).size < p.links.length).length < 4) f.push('endings level 3: a linking word answers two gaps on too few copies (the last gap is found by elimination)');
    }
  }
  return f;
}
{ const f = faultsOf(BANK); if (f.length) throw new Error('informative-writing-g2.en.json: ' + f.join('; ')); }

/* ------------------------------------------------------------------ the parts of a page */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}[data-lcs-label] b,[data-lcs-ruletext] b{color:' + T.teal + ';font-weight:800}</style>';
/** In this font an f before i, f, l, or t and a t before t touch the next letter even with ligatures off: every such f or t
 *  gets a little room of its own (HTML text; the SVG text of the rows is split at build, see svgText) */
function fRoom(html) {
  let out = '', i = 0, svg = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i), tag = html.slice(i, j + 1); if (/^<svg\b/i.test(tag)) svg++; if (/^<\/svg>/i.test(tag)) svg--; out += tag; i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += svg ? text : text.replace(/f(?=[iflt])|t(?=t)/g, (m) => `<span data-lcs-fsep style="margin-right:0.07em">${m}</span>`);
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
/** an SVG text, split where an f or a t needs room (each piece after the split moves 0.07 em on) */
function svgText(s, px) {
  const segs = String(s).split(/(?<=f)(?=[iflt])|(?<=t)(?=t)/);
  return esc(segs[0]) + segs.slice(1).map((x) => `<tspan dx="${(0.07 * px).toFixed(2)}">${esc(x)}`).join('') + '</tspan>'.repeat(segs.length - 1);
}
const FONT = `font-family="Nunito, sans-serif" font-weight="700"`;
/** a writing row: the school rules, the words printed on it (ink), the key's words (teal) */
function rowHtml(r, key, ans, txt) {
  const svg0 = rowSvg(r.w, ROW), cut = svg0.lastIndexOf('</svg>'), y = BASE.toFixed(2);
  let inner = '';
  if (r.gap) {
    let x = PADL;
    inner += `<text data-lcs-pre="1" x="${x}" y="${y}" ${FONT} font-size="${STARTPX}" fill="${T.ink}">${svgText(r.pre, STARTPX)}</text>`;
    x += wOf(r.pre, STARTPX) + SEP;
    inner += `<line data-lcs-gapline="1" x1="${x.toFixed(1)}" y1="${y}" x2="${(x + r.gap).toFixed(1)}" y2="${y}" stroke="${T.inkSoft}" stroke-width="2.5"/>`;
    if (key && ans) inner += `<text data-lcs-ans="1" x="${(x + 4).toFixed(1)}" y="${(BASE - 3).toFixed(2)}" ${FONT} font-size="${KEYPX}" fill="${T.teal}">${svgText(ans, KEYPX)}</text>`;
    x += r.gap + SEP;
    if (r.mid) { inner += `<text data-lcs-mid="1" x="${x.toFixed(1)}" y="${y}" ${FONT} font-size="${STARTPX}" fill="${T.ink}">${svgText(r.mid, STARTPX)}</text>`; x += wOf(r.mid, STARTPX) + SEP; }
    if (key && txt) inner += `<text data-lcs-keytext="1" x="${x.toFixed(1)}" y="${y}" ${FONT} font-size="${KEYPX}" fill="${T.teal}">${svgText(txt, KEYPX)}</text>`;
  } else if (r.pre || (key && txt)) {
    inner += `<text x="${PADL}" y="${y}" ${FONT}>` + (r.pre ? `<tspan data-lcs-pre="1" font-size="${STARTPX}" fill="${T.ink}">${svgText(r.pre, STARTPX)}</tspan>` : '') +
      (key && txt ? `<tspan data-lcs-keytext="1"${r.pre ? ` dx="${SEP}"` : ''} font-size="${KEYPX}" fill="${T.teal}">${svgText(txt, KEYPX)}</tspan>` : '') + `</text>`;
  }
  if (r.end) inner += `<text data-lcs-end="1" x="${r.w - PADR}" y="${y}" text-anchor="end" ${FONT} font-size="${STARTPX}" fill="${T.ink}">${svgText(r.end, STARTPX)}</text>`;
  return `<div data-lcs-row="1"${r.pre ? ` data-lcs-rowpre="${A(r.pre)}"` : ''}${r.gap ? ` data-lcs-rowgap="${r.gap}"` : ''}${r.mid ? ` data-lcs-rowmid="${A(r.mid)}"` : ''}${r.end ? ` data-lcs-rowend="${A(r.end)}"` : ''} style="flex:0 0 auto;width:${r.w}px;height:${ROW}px;line-height:0">${svg0.slice(0, cut)}${inner}</svg></div>`;
}
/** a part the child writes in: its label above its rows; the sentences as data (verify re-measures them) */
function part(p, key, more = '', note = '') {
  const k = key ? placeKey(p.rows, p.sents) : null;
  if (key && !k) throw new Error(`informative-writing-g2: the part ${p.name} cannot hold its sample`);
  const sents = p.sents.map((s) => ({ at: s.at, text: s.text, ...(s.gap !== undefined ? { gap: s.gap } : {}) }));
  // note: a key's note at the right end of the label line (its room is kept on the page of the child)
  return `<div data-lcs-wpart="${p.name}" data-lcs-expect="${A(p.sents.map((s) => s.full).join(' '))}" data-lcs-sents="${A(JSON.stringify(sents))}" style="display:flex;flex-direction:column;gap:0;${more}">` +
    (p.label ? `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px"><div data-lcs-wlabel style="font:800 16px/1 'Nunito',sans-serif;color:${T.teal}">${esc(p.label)}</div>${note}</div>` : '') +
    p.rows.map((r, i) => rowHtml(r, key, k ? k.gaps[i] : '', k ? k.out[i] : '')).join('') + `</div>`;
}
const cream = (attrs, inner, pad = 7, gap = 5, more = '') => `<div ${attrs} data-lcs-card style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (k, html, px = LABEL) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${k ? `<span style="color:${T.teal}">${k}.</span> ` : ''}${html}</div>`;
/** the key's notes that an answer is a sample; the page of the child keeps their room (hidden), so the page and its key
 *  have one layout */
const VARYTXT = '(Sample answer.)';
const vary = (key) => (key ? `<span data-lcs-vary style="font-size:15px;color:${T.coral}">${VARYTXT}</span>` : `<span data-lcs-varyspace style="font-size:15px;visibility:hidden">${VARYTXT}</span>`);
const varyFor = (q, key) => (key ? `<span data-lcs-vary data-lcs-varyfor="${A(q)}" style="font-size:15px;color:${T.coral}">${esc(sampleFor(q))}</span>` : `<span data-lcs-varyspace style="font-size:15px;visibility:hidden">${esc(sampleFor(q))}</span>`);
const CHECK = `<svg data-lcs-check width="20" height="20" viewBox="0 0 20 20" style="display:block"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ruleBox = (title, rows) => `<div data-lcs-rulebox data-lcs-card style="display:flex;flex-direction:column;gap:2px;padding:5px 14px 7px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
  (title ? `<div data-lcs-boxtitle style="font:700 19px/1.1 'Baloo 2',cursive;color:${T.teal}">${esc(title)}</div>` : '') + rows.map(([k, v]) => `<div data-lcs-ruletext style="font:700 ${RULEPX}px/1.1 'Nunito',sans-serif;color:${T.ink}"><b>${esc(k)}</b>: ${esc(v)}</div>`).join('') + `</div>`;
const wordBank = (list, title = 'Word bank:') => `<div data-lcs-wordbank style="display:flex;flex-wrap:wrap;align-items:baseline;gap:3px 14px;padding:3px 10px 4px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF"><span data-lcs-small style="font:800 ${SMALL}px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(title)}</span>${list.map((w) => `<span data-lcs-bankword data-lcs-read style="font:700 ${BOOKPX}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</span>`).join('')}</div>`;
const checkBox = (k = '') => `<span data-lcs-box${k ? ` data-lcs-boxfor="${k}"` : ''} style="box-sizing:border-box;flex:0 0 auto;display:inline-block;width:22px;height:22px;border:2.5px solid ${T.ink};border-radius:5px;background:#FFFFFF"></span>`;
const checkList = (items, px = BOOKPX) => `<div data-lcs-checks style="display:flex;flex-wrap:wrap;gap:3px 20px">` + items.map((t) => `<span data-lcs-checkrow="${A(t)}" style="display:flex;align-items:center;gap:7px">${checkBox()}<span data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span></span>`).join('') + `</div>`;
/** a sentence or a word to circle; the key rings the right one */
const opt = (text, ok, key, attrs = '', px = OPT, padX = 10) => `<span data-lcs-opt="${A(text)}"${ok ? ' data-lcs-ok="1"' : ''} ${attrs} style="display:inline-block;font:700 ${px}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:0 ${padX}px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
const pic = (p, size, attrs = '') => (p ? `<img class="ws-icon" data-lcs-pic="${A(p.theme + '/' + p.noun)}" ${attrs} src="${fileUri(p.theme, p.noun)}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;object-fit:contain;display:block">` : '');
const LETTERS = 'abcdefgh';
const NUM = (k) => `<span data-lcs-num style="flex:0 0 auto;min-width:24px;font:800 ${READ}px/1.3 'Nunito',sans-serif;color:${T.teal}">${k}.</span>`;
/** the fact box of a fact topic (G2-566: all its facts and the word; G2-568: the same, smaller) */
function factBox(t, facts, withPic) {
  const items = [...facts.map((x) => x.t), t.def.t];
  return `<div data-lcs-factbox="${t.key}" data-lcs-card style="display:flex;gap:10px;align-items:center;padding:3px 12px 5px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
    (withPic && t.pic ? pic(t.pic, 64, 'data-lcs-factpic="1"') : '') +
    `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px"><div data-lcs-boxtitle style="font:700 19px/1.1 'Baloo 2',cursive;color:${T.teal}">${esc('Facts about ' + titleCase(t.name))}</div>` +
    `<div data-lcs-factcols style="column-count:2;column-gap:16px">` + items.map((s) => `<div data-lcs-fact="${A(s)}" data-lcs-read style="break-inside:avoid;font:700 ${BOOKPX}px/1.2 'Nunito',sans-serif;color:${T.ink};padding-left:12px;text-indent:-12px">• ${esc(s)}</div>`).join('') + `</div></div></div>`;
}

/* ------------------------------------------------------------------ the blocks of each page */
function render(P, key) {
  const b = [];
  if (P.mode === 'parts') {
    const d = LEVELS.parts[P.lv];
    b.push(ruleBox('', PARTRULES));
    const mark = (role) => (!key ? '' : role === 'ts' ? `text-decoration:underline;text-decoration-color:${T.teal};text-decoration-thickness:3px;text-underline-offset:5px;` : role === 'close' ? `outline:3px solid ${T.teal};outline-offset:1px;border-radius:4px;` : role === 'def' && d.def ? `border:3px solid ${T.teal};border-radius:999px;padding:0 4px;` : '');
    const sents = [...(P.hook ? [{ role: 'hook', t: P.hook }] : []), ...P.A.piece];
    const piece = sents.map((x) => `<span data-lcs-psent data-lcs-role="${x.role}" style="${mark(x.role)}box-decoration-break:clone;-webkit-box-decoration-break:clone">${esc(x.t)}</span>`).join(' ');
    b.push(cream(`data-lcs-task="mark" data-lcs-tkey="${P.A.key}"`, label(1, LINES.mark[P.lv]) + `<div data-lcs-piece style="padding:2px 14px 4px;border-radius:12px;background:#FFFFFF"><div data-lcs-ptitle style="font:700 21px/1.15 'Baloo 2',cursive;color:${T.ink}">${esc(titleCase(P.A.name))}</div><div data-lcs-read style="font:700 ${READ}px/1.42 'Nunito',sans-serif;color:${T.ink}">${piece}</div></div>`, 6, 4));
    const items = P.items.map((x, i) => `<div data-lcs-item data-lcs-sortrow="${x.kind}" data-lcs-letter="${LETTERS[i]}" data-lcs-text="${A(x.t)}" style="display:flex;align-items:baseline;gap:6px;padding:0 10px;border-radius:10px;background:#FFFFFF"><span data-lcs-ltr style="flex:0 0 auto;width:22px;font:800 ${READ}px/1.25 'Nunito',sans-serif;color:${T.teal}">${LETTERS[i]}.</span><span data-lcs-read data-lcs-stext style="font:700 ${READ}px/1.25 'Nunito',sans-serif;color:${T.ink};${key && /^(off|op)$/.test(x.kind) ? `text-decoration:line-through;text-decoration-color:${T.teal};text-decoration-thickness:3px;` : ''}">${esc(x.t)}</span></div>`).join('');
    const heads = [0, 1].map((h) => { const mine = P.items.map((x, i) => [x, LETTERS[i]]).filter(([x]) => x.kind === 'h' + h).map(([, l]) => l);
      return `<div data-lcs-headbox="${h}" data-lcs-head="${A(P.B.heads[h])}" style="flex:1 1 0;display:flex;flex-direction:column;gap:4px;padding:4px 10px 6px;border:2.5px solid ${T.teal};border-radius:12px;background:#FFFFFF"><div data-lcs-headbar style="font:800 18px/1.15 'Nunito',sans-serif;color:#FFFFFF;background:${T.teal};border-radius:8px;padding:2px 10px;text-align:center">${esc(P.B.heads[h])}</div>` +
        `<div style="display:flex;gap:10px;justify-content:center">` + mine.map((l) => `<span data-lcs-lbox data-lcs-want="${l}" style="box-sizing:border-box;width:46px;height:46px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:9px;font:800 26px/1 'Nunito',sans-serif;color:${T.teal}">${key ? l : ''}</span>`).join('') + `</div></div>`; }).join('');
    b.push(cream(`data-lcs-task="sort" data-lcs-tkey="${P.B.key}"`, label(2, LINES.sort[P.lv].replace(/\{N\}/g, esc(P.B.name)) + ` <span data-lcs-anyorder style="font-size:15px;color:${T.teal};${key ? '' : 'visibility:hidden'}">(Letters under a heading: any order.)</span>`) + `<div data-lcs-items style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:2px">${items}</div>` + `<div data-lcs-heads style="display:flex;gap:14px">${heads}</div>`, 6, 5, 'flex:1 1 auto'));
  }
  if (P.mode === 'plan') {
    const ex = P.ex;
    const exLine = P.lv === 1 ? `${esc(titleCase(ex.name))}. One fact: ${esc(ex.ex[2])}` : `${esc(titleCase(ex.name))}. Heading: ${esc(ex.heads[ex.ex[0]])}. Note: ${esc(ex.ex[1])}.`;
    b.push(`<div data-lcs-block="facts" style="display:flex;flex-direction:column;gap:3px">` + factBox(P.t, P.box, true) +
      `<div data-lcs-example="${ex.key}" data-lcs-small style="font:700 ${SMALL}px/1.25 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">A plan for another topic:</b> ${exLine}</div></div>`);
    const parts = planParts(P.lv, P.t);
    const headBox = P.lv === 2 ? `<div data-lcs-headchoice style="display:flex;align-items:baseline;gap:6px 14px;flex-wrap:wrap;padding:0 10px 1px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF"><span data-lcs-small style="font:800 ${SMALL}px/1.2 'Nunito',sans-serif;color:${T.teal}">Choose two headings:</span>${P.heads.map((h) => `<span data-lcs-headword="${A(P.t.heads[h])}" data-lcs-read style="font:700 ${BOOKPX}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(P.t.heads[h])}</span>`).join('')}</div>` : '';
    b.push(cream(`data-lcs-task="plan" data-lcs-pkey="${P.t.key}"`, label(1, esc(LINES.plan.replace('{N}', P.t.name))) + (P.lv === 3 ? wordBank(PLANBANK) : '') +
      `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:1px">` + parts.map((p, i) => part(p, key, '', i === 0 ? varyFor(titleCase(P.t.name), key) : i === 1 ? headBox : '')).join('') + `</div>`, 5, 3, 'flex:1 1 auto'));
    b.push(cream('data-lcs-task="check"', `<div data-lcs-checks style="display:flex;flex-wrap:wrap;align-items:center;gap:3px 16px">` + label(2, LINES.check) + PLANCHECK[P.lv].map((t) => `<span data-lcs-checkrow="${A(t)}" style="display:flex;align-items:center;gap:6px">${checkBox()}<span data-lcs-small style="font:700 16px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span></span>`).join('') + `</div>`, 4, 3));
  }
  if (P.mode === 'endings') {
    b.push(ruleBox('', ENDRULES));
    const choices = P.choices.map((x, i) => `<div data-lcs-item data-lcs-choice="${x.kind}" style="display:flex;align-items:center;gap:6px">${NUM(LETTERS[i])}${opt(x.t, x.kind === 'close', key, '', READ)}</div>`).join('');
    b.push(cream(`data-lcs-task="close" data-lcs-tkey="${P.C.key}"`, label(1, LINES.close) + `<div data-lcs-piece data-lcs-read style="padding:2px 14px 3px;border-radius:12px;background:#FFFFFF;font:700 ${READ}px/1.35 'Nunito',sans-serif;color:${T.ink}">${P.C.piece.map((s) => `<span data-lcs-psent>${esc(s)}</span>`).join(' ')}</div>` + `<div data-lcs-choices style="display:flex;flex-direction:column;gap:1px">${choices}</div>`, 6, 3));
    const fp = frameParts(P.lv, P.frame);
    b.push(cream(`data-lcs-task="defs" data-lcs-fword="${A(P.frame.word)}"`, label(2, LINES.defs[P.lv] + ' ' + vary(key)) +
      `<div data-lcs-context data-lcs-read style="font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:2px 12px 3px;border-radius:12px;background:#FFFFFF">${esc(P.frame.context)}</div>` + fp.map((p) => part(p, key)).join(''), 7, 3));
    const gaps = P.links.map((x, i) => { const [l, r] = x.t.split('___');
      return `<div data-lcs-item data-lcs-gap="${x.want}" data-lcs-text="${A(x.t)}" style="display:flex;align-items:center;gap:6px;padding:1px 10px;border-radius:12px;background:#FFFFFF">${NUM(i + 1)}<div style="flex:1 1 auto;min-width:0;display:flex;align-items:center;gap:10px;line-height:1.3"><span data-lcs-read data-lcs-sent style="flex:1 1 auto;min-width:0;font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(l.trimEnd())} <span data-lcs-blank style="display:inline-block;width:64px;height:1.1em;vertical-align:-0.2em;border-bottom:2.5px solid ${T.ink}"></span>${/^[.,?!:]/.test(r) ? '' : ' '}${esc(r.trimStart())}</span><span data-lcs-opts style="flex:0 0 auto;display:inline-flex;gap:2px;white-space:nowrap">${x.opts.map((o) => opt(o, o === x.want, key, '', OPT, 7)).join('')}</span></div></div>`; }).join('');
    b.push(cream('data-lcs-task="link"', label(3, LINES.link) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:3px">${gaps}</div>`, 7, 4, 'flex:1 1 auto'));
  }
  if (P.mode === 'draft') {
    const t = P.t;
    b.push(cream(`data-lcs-task="use" data-lcs-pkey="${t.key}"`, label(1, esc(LINES.use.replace('{N}', t.name))) +
      `<div data-lcs-strip data-lcs-read style="padding:1px 12px 2px;border-radius:12px;background:#FFFFFF;font:700 ${BOOKPX}px/1.22 'Nunito',sans-serif;color:${T.ink}">${[...t.facts[0], ...t.facts[1].slice(0, 2)].map((x) => x.t).concat(t.def.t).map((s) => `<span data-lcs-fact="${A(s)}">${esc(s)}</span>`).join(' ')}</div>`, 4, 3, 'flex:1 1 auto;justify-content:space-evenly'));
    const parts = draftParts(P.lv, t);
    b.push(cream(`data-lcs-task="draft" data-lcs-pkey="${t.key}"`, label(2, LINES.draft[P.lv] + ' ' + varyFor(titleCase(t.name), key)) + (P.lv === 3 ? wordBank(DRAFTBANK) : '') + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly">` + parts.map((p) => part(p, key)).join('') + `</div>`, 4, 3, 'flex:0 1 auto'));
    const ex = P.ex, model = modelOf(ex).join(' ');
    // the foot: a model on another topic with the linking words, and the check list (one card, the whole width)
    b.push(`<div data-lcs-block="foot" data-lcs-card style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:2px;padding:3px 12px 4px;border-radius:14px;background:${T.cream}">` +
      `<div data-lcs-task="model" data-lcs-modelkey="${ex.key}" style="display:flex;flex-direction:column;gap:1px"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:4px 14px;flex-wrap:wrap"><div data-lcs-mhead style="font:800 ${SMALL}px/1.2 'Nunito',sans-serif;color:${T.teal}">A model on another topic</div>` +
      `<div data-lcs-mhead style="font:800 ${SMALL}px/1.2 'Nunito',sans-serif;color:${T.teal}">Linking words: ${LINKWORDS.map((w) => `<span data-lcs-lword>${w}</span>`).join(' · ')}</div></div>` +
      `<div data-lcs-small data-lcs-model style="font:700 ${SMALL}px/1.18 'Nunito',sans-serif;color:${T.ink}">${esc(model)}</div></div>` +
      `<div data-lcs-task="dcheck" style="display:flex;flex-wrap:wrap;align-items:center;gap:2px 16px">` + DRAFTCHECK[P.lv].map((x) => `<span data-lcs-checkrow="${A(x)}" style="display:flex;align-items:center;gap:6px">${checkBox()}<span data-lcs-small style="font:700 ${SMALL}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(x)}</span></span>`).join('') + `</div></div>`);
  }
  if (P.mode === 'notes') {
    const r = P.r, d = LEVELS.notes[P.lv];
    b.push(`<div data-lcs-block="question" data-lcs-card style="display:flex;align-items:center;gap:12px;padding:1px 12px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">${pic(r.pic, 56, 'data-lcs-rpic="1"')}<div data-lcs-question="${A(r.q)}" data-lcs-read style="font:700 21px/1.2 'Baloo 2',cursive;color:${T.ink}"><span style="color:${T.teal}">Research question:</span> ${esc(r.q)}</div></div>`);
    b.push(`<div data-lcs-block="books" style="display:flex;align-items:flex-start;gap:10px">` + r.books.map((x, i) => `<div data-lcs-book="${i + 1}" data-lcs-card style="flex:1 1 0;min-width:0;padding:2px 12px 3px;border:2.5px solid ${T.creamDeep};border-radius:12px;background:#FFFFFF"><div data-lcs-booktitle style="font:700 17.5px/1.1 'Baloo 2',cursive;color:${T.teal}">Book ${i + 1}: ${esc(x.title)}</div><div data-lcs-booktext data-lcs-read style="font:700 ${BOOKPX}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(x.s.join(' '))}</div></div>`).join('') + `</div>`);
    const head = `<div data-lcs-thead style="display:flex;align-items:flex-end;padding:0 10px"><span style="flex:1 1 auto"></span>${['Book 1', 'Book 2', 'Both'].map((c) => `<span data-lcs-col="${c}" style="flex:0 0 74px;text-align:center;font:800 16px/1.1 'Nunito',sans-serif;color:${T.teal}">${c}</span>`).join('')}</div>`;
    const kind = (x) => ['Both', 'Book 1', 'Book 2'][x.src];
    b.push(cream('data-lcs-task="which"', label(1, LINES.which) + head + `<div style="display:flex;flex-direction:column;gap:2px">` + P.items.map((x, i) => `<div data-lcs-item data-lcs-whichrow="${x.src}" data-lcs-text="${A(x.note)}" style="display:flex;align-items:center;padding:0 10px;border-radius:10px;background:#FFFFFF">${NUM(i + 1)}<span data-lcs-read style="flex:1 1 auto;min-width:0;font:700 ${BOOKPX}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(x.note)}</span>` +
      ['Book 1', 'Book 2', 'Both'].map((c) => `<span data-lcs-cell="${c}" style="flex:0 0 74px;display:flex;justify-content:center"><span data-lcs-tick="${c}" style="box-sizing:border-box;width:25px;height:25px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF">${key && c === kind(x) ? CHECK : ''}</span></span>`).join('') + `</div>`).join('') + `</div>`, 4, 3));
    const wk = P.wk, wn = d.chart === 'copy' ? wk.copy : wk.own;
    const parts = chartParts(P.lv, r, P.keys);
    const chart = d.chart === 'source'
      ? `<div data-lcs-mine style="display:flex;flex-direction:column">` + (() => { const k = key ? placeKey(parts[0].rows, parts[0].sents) : null; return `<div data-lcs-wpart="mine" data-lcs-expect="${A(parts[0].sents.map((s) => s.full).join(' '))}" data-lcs-sents="${A(JSON.stringify(parts[0].sents.map((s) => ({ at: s.at, text: s.text }))))}" style="display:flex;flex-direction:column">` +
        parts[0].rows.map((rw, i) => `<div data-lcs-noterow style="display:flex;align-items:flex-end;gap:12px">${rowHtml(rw, key, '', k ? k.out[i] : '')}<span data-lcs-srcbox data-lcs-want="${parts[0].sents[i] ? ['B', '1', '2'][parts[0].sents[i].src] : ''}" style="box-sizing:border-box;flex:0 0 auto;width:40px;height:38px;margin-bottom:3px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:8px;background:#FFFFFF;font:800 22px/1 'Nunito',sans-serif;color:${T.teal}">${key && parts[0].sents[i] ? ['B', '1', '2'][parts[0].sents[i].src] : ''}</span></div>`).join('') + `</div>`; })() + `</div>`
      : parts.map((p) => part(p, key)).join('');
    b.push(cream(`data-lcs-task="chart" data-lcs-tkey="${r.key}"`, label(2, LINES.chart[P.lv] + ' ' + vary(key)) +
      `<div data-lcs-worked="${wk.key}" data-lcs-small style="font:700 ${SMALL}px/1.25 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">Another topic.</b> Book: "${esc(wk.from)}" Note: <i>${esc(wn)}</i></div>` + chart, 4, 3, 'flex:1 1 auto;justify-content:space-between'));
  }
  if (P.mode === 'report') {
    const r = P.r;
    // a heading to circle (the key rings the heading of its sample); it wraps inside its line when it is long
    const pill = (h, cap = true) => `<span data-lcs-opt="${A(r.heads[h])}" data-lcs-headopt="${A(r.heads[h])}"${h === P.h ? ' data-lcs-ok="1"' : ''} style="display:inline-block;flex:0 0 auto;${cap ? `max-width:${PILLW}px;` : ""}font:700 ${OPT}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:0 9px;border:3px solid ${key && h === P.h ? T.teal : 'transparent'};border-radius:16px;background:#FFFFFF">${esc(r.heads[h])}</span>`;
    // a long heading wraps inside its pill (at most 160 px), so its notes keep the width of the line
    const PILLW = Math.min(160, Math.ceil(Math.max(...r.heads.map((x) => wOf(x, OPT)))) + 24);
    // task 1 opens with the research question of the class report
    const head1 = label(1, `<span data-lcs-report="${A(r.q)}" style="color:${T.teal};font-weight:800">${esc(r.q)}</span> ` + LINES.heading[P.lv]);
    if (P.lv < 3) {
      // each heading with its three notes; the notes run on as one text beside the heading (a note may wrap)
      const lines = [0, 1, 2].map((h) => `<div data-lcs-headline="${h}" style="display:flex;align-items:baseline;gap:8px;padding:0 8px;border-radius:12px;background:#FFFFFF"><span style="flex:0 0 ${PILLW}px;display:flex">${pill(h)}</span><span data-lcs-rnotes style="flex:1 1 auto;min-width:0;font:700 ${BOOKPX}px/1.15 'Nunito',sans-serif;color:${T.ink}">` +
        repFacts(r, h).map((x, i) => `<span data-lcs-rnote="${h}|${['Book 1', 'Book 2', 'Both'][i]}" data-lcs-read style="font:700 ${BOOKPX}px/1.15 'Nunito',sans-serif;color:${T.ink};margin-right:14px"><b style="color:${T.teal}">${['Book\u00a01', 'Book\u00a02', 'Both'][i]}:</b>\u00a0${esc(x.note)}</span>`).join(' ') + `</span></div>`).join('');
      b.push(cream(`data-lcs-task="head" data-lcs-tkey="${r.key}"`, head1 + `<div data-lcs-headlines style="display:flex;flex-direction:column;gap:2px">${lines}</div>`, 4, 3, 'flex:1 1 auto;justify-content:space-evenly'));
    } else {
      b.push(cream(`data-lcs-task="head" data-lcs-tkey="${r.key}"`, head1 + `<div data-lcs-headopts style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">${P.hs.map((h) => pill(h, false)).join('')}</div>` +
        `<div data-lcs-usenotes data-lcs-read style="font:700 ${BOOKPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(LINES.usenotes)}</div>`, 4, 3, 'flex:1 1 auto;justify-content:space-evenly'));
    }
    // the part to cut out, inside one dashed line: the heading and the three sentences; under them the picture box, and
    // beside it task 3 and the row of the label (the key's "Pictures vary." stands in the empty box)
    const parts = reportParts(P.lv, r, P.h);
    const write = `<div data-lcs-task="write" data-lcs-pkey="${r.key}" style="display:flex;flex-direction:column;gap:2px">` + label(2, LINES.write + ' ' + vary(key)) + parts.map((p) => part(p, key)).join('') + `</div>`;
    const lab = { name: 'label', label: 'Label', rows: [row({ w: LABELW })], sents: [{ at: 0, text: r.one, full: r.one }] };
    const picture = `<div data-lcs-task="picture" style="flex:1 1 auto;display:flex;gap:12px;align-items:stretch"><div data-lcs-drawbox style="box-sizing:border-box;flex:0 0 ${DRAWW}px;width:${DRAWW}px;min-height:${DRAWH}px;display:flex;align-items:center;justify-content:center;border:2.5px dashed ${T.inkSoft};border-radius:10px;background:#FFFFFF">` +
      (key ? `<span data-lcs-vary style="font:700 15px/1.2 'Nunito',sans-serif;color:${T.coral}">(Pictures vary.)</span>` : '') + `</div>` +
      `<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:3px">${label(3, LINES.picture)}${part(lab, key)}</div></div>`;
    b.push(`<div data-lcs-block="cutout" data-lcs-cut data-lcs-card style="flex:2 1 auto;display:flex;flex-direction:column;gap:3px;padding:3px 12px 4px;border:2.5px dashed ${T.inkSoft};border-radius:14px;background:${T.cream}">` + write + picture + `</div>`);
    // the check list, outside the cut line; it names both books
    const checks = REPCHECK.map((x) => x.replace('{B1}', r.books[0].title).replace('{B2}', r.books[1].title));
    b.push(cream('data-lcs-task="repcheck"', `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:2px 12px"><span data-lcs-mhead style="font:800 ${SMALL}px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(LINES.repcheck)}</span>` + checks.map((x) => `<span data-lcs-checkrow="${A(x)}" style="display:flex;align-items:center;gap:6px">${checkBox()}<span data-lcs-small style="font:700 ${SMALL}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(x)}</span></span>`).join('') + `</div>`, 2, 2));
  }
  return b;
}

/** verify()'s OWN copy of every text a page must print and every measure it is held to */
const SPEC = {
  INSTR: {
    parts: { 1: 'An informative piece tells facts about one topic.', 2: 'An informative piece has a topic sentence, facts, and a closing sentence.', 3: 'An informative piece tells only facts, and every sentence is about its topic.' },
    plan: { 1: 'Plan a topic sentence, three facts, a definition, and a closing sentence.', 2: 'Plan your piece. Put your facts in groups under two headings.', 3: 'Plan your informative piece in notes. Use the word bank if you need it.' },
    endings: { 1: 'A closing sentence tells about the topic again at the end.', 2: 'A closing sentence tells about the topic again in new words.', 3: 'Writers use facts, definitions, linking words, and a closing sentence.' },
    draft: { 1: 'Use the frames to write your informative piece.', 2: 'Write your piece from your plan. Use linking words.', 3: 'Write your whole piece, from topic sentence to closing sentence.' },
    notes: { 1: 'Researchers read two books and write a few key words as notes.', 2: 'Read both books. Write short notes in your own words.', 3: 'Take notes in your own words. Write which book each note is from.' },
    report: { 1: 'Write your part of our class report with facts from both books.', 2: 'Use the notes to write your part of the class report.', 3: 'Choose a heading and write your part of the class report.' },
  },
  TASK: {
    mark: { 1: 'Read the piece. Underline the topic sentence. Draw a box around the closing sentence.', 2: 'Read the piece. Underline the topic sentence. Circle the definition. Draw a box around the closing sentence.', 3: 'Read the piece. Underline the topic sentence. Circle the definition. Draw a box around the closing sentence.' },
    sort: { 1: 'Read the sentences about {N}. Write the letter of each fact about {N} under its heading. Cross out the sentence about something else.', 2: 'Read the sentences about {N}. Write the letter of each fact about {N} under its heading. Cross out the opinion.', 3: 'Read the sentences about {N}. Write the letter of each fact about {N} under its heading. Cross out the two sentences that do not belong.' },
    plan: 'Plan a piece about {N}. Use the facts in the box.', check: 'Check your plan.',
    close: 'Read the piece. Circle the closing sentence that fits it.',
    defs: { 1: 'Read the sentence. Finish the definition.', 2: 'Read the sentence. Write the word and what it means.', 3: 'Read the sentence. Write a definition: A ___ is ___.' },
    link: 'Circle the linking word that fits each blank.', use: 'Use your plan. No plan? Use these facts about {N}.',
    draft: { 1: 'Write your piece. Use the frames.', 2: 'Write your piece. Keep the facts of one heading together.', 3: 'Write your piece: topic sentence, three facts, a definition, closing sentence. Keep the facts of one heading together.' },
    which: 'Which book tells it? Put a check mark under Book 1, Book 2, or Both.',
    chart: { 1: 'Take notes. Copy a few words. Write one note from each book and one both books tell. Use facts that are not in the table.', 2: 'Take notes in your own words. A note is a few words. Write one note from each book and one both books tell. Use facts that are not in the table.', 3: 'Take notes in your own words. Write 1, 2, or B in each box. Use facts that are not in the table.' },
    heading: { 1: 'Circle the heading your teacher gives you.', 2: 'Circle the heading your teacher gives you.', 3: 'Choose the heading of your part. Circle it.' },
    usenotes: 'Use your notes from Research with Two Books: Take Notes. You may read the two books again.', headrow: 'Write your heading:',
    write: 'Write three sentences. Use a fact from each book.', picture: 'Draw and label a picture.', repcheck: 'Check your part.',
  },
  PARTRULES: ['Informative piece: tells only facts, and every sentence is about its topic.', 'Topic sentence: tells what the whole piece is about.', 'Fact: tells something true that can be checked.', 'Definition: tells what a word means.', 'Closing sentence: tells about the topic again at the end, in new words. It gives no new fact.', 'Opinion: tells what someone thinks. People can disagree with it. An informative piece leaves opinions out.'],
  ENDRULES: ['Definition: tells what a word means. A kitten is a baby cat.', 'Linking words: "also," "another," and "and" join facts.', 'Closing sentence: tells about the topic again at the end, in new words. It gives no new fact.'],
  LINKWORDS: ['also', 'another', 'and'],
  PLANCHECK: { 1: ['I named my topic.', 'I wrote three facts.', 'I wrote what a word means.', 'I wrote a closing sentence.', 'Each sentence ends with a period.'], 2: ['I named my topic.', 'I grouped my facts.', 'I wrote what a word means.', 'I wrote a closing sentence.'], 3: ['I named my topic.', 'I grouped my facts.', 'I wrote what a word means.', 'I wrote a closing sentence.'] },
  DRAFTCHECK: { 1: ['I wrote a topic sentence.', 'I wrote three facts.', 'I wrote what a word means.', 'I wrote a closing sentence.'], 2: ['I wrote a topic sentence.', 'I wrote three facts.', 'I kept facts about the same thing together.', 'I used also or another.', 'I wrote what a word means.', 'I wrote a closing sentence.'], 3: ['I wrote a topic sentence.', 'I wrote three facts.', 'I kept facts about the same thing together.', 'I used also or another.', 'I wrote what a word means.', 'I wrote a closing sentence.'] },
  REPCHECK: ['My part has a heading.', 'I wrote three sentences.', 'I used a fact from each book: {B1} and {B2}.', 'My picture has a label.'],
  PLANBANK: ['Here are some facts about', 'A ___ is', 'Now you know about'],
  DRAFTBANK: ['Here are some facts about', 'One fact is that', 'also', 'another', 'A ___ is', 'Now you know about'],
  DEFLABEL: 'Definition (a word and what it means)',
  // the words printed on the rows, per mode and level: [pre, end, mid] row by row of each part (no frame prints a period)
  PLANROWS: { 1: { ts: [['Here are some facts about', '']], facts: [['{Name}', ''], ['{Name}', ''], ['{Name}', ''], ['', '']], def: [['A', '', 'is'], ['', '']], close: [['Now you know about', ''], ['', '']] }, 2: { ts: [['Here are some facts about', '']], facts: [['Heading:', ''], ['', ''], ['', ''], ['Heading:', ''], ['', '']], def: [['A', '', 'is'], ['', '']], close: [['Now you know', '']] }, 3: { ts: [['', '']], facts: [['', ''], ['', ''], ['', ''], ['', ''], ['', '']], def: [['', ''], ['', '']], close: [['', '']] } },
  DRAFTROWS: { 1: [['Here are some facts about', ''], ['One fact is that', ''], ['', ''], ['Another fact is that', ''], ['', ''], ['Also,', ''], ['', ''], ['A', '', 'is'], ['', ''], ['Now you know about', '']], 2: [['Here are some facts about', ''], ['One fact', ''], ['', ''], ['Another fact', ''], ['', ''], ['', ''], ['', ''], ['A', ''], ['', ''], ['Now you know', '']], 3: 8 },
  REPROWS: { 1: ['One fact is that', '', 'Another fact is that', '', 'Both books say that', ''], 2: ['One fact', '', 'Another fact', '', 'Both books', ''], 3: ['', '', '', '', '', '', ''] },
  LV: { parts: { 1: { n: 2, off: 1, op: 0, def: false }, 2: { n: 3, off: 0, op: 1, def: true }, 3: { n: 3, off: 1, op: 1, def: true } }, endings: { 1: { ch: ['close', 'l1', 'offop'], opts: 2 }, 2: { ch: ['close', 'now', 'ts'], opts: 3 }, 3: { ch: ['close', 'now', 'ts', 'offop'], opts: 3 } }, notes: { 1: { items: 4, chart: 'copy' }, 2: { items: 4, chart: 'own' }, 3: { items: 5, chart: 'source' } } },
  NLINKS: { 1: 4, 2: 4, 3: 3 },
  VARY: { parts: 0, plan: 1, endings: 1, draft: 1, notes: 1, report: 2 },
  QUALS: ['some', 'many', 'most', 'often', 'usually', 'sometimes', 'can', 'a lot', 'every day'],
  // the measures
  ROW: 44, CHILD: 651 / 30, PADL: 8, SEP: 8, PADR: 8, GAP: 40, READ: 19, BOOK: 17.5, LABEL: 17, OPT: 20, SMALL: 15.5, RULE: 16, START: 22, KEY: 20, FILL: 0.8, FULL: 640, PIC: 56, DRAWW: 300, DRAWH: 84,
  STOP: ['about', 'after', 'again', 'also', 'and', 'another', 'because', 'before', 'being', 'could', 'each', 'every', 'from', 'have', 'here', 'into', 'just', 'many', 'more', 'most', 'much', 'other', 'over', 'some', 'than', 'that', 'their', 'them', 'there', 'they', 'this', 'very', 'what', 'when', 'where', 'which', 'while', 'with', 'would', 'your', 'these', 'those', 'make', 'makes', 'made', 'only', 'once', 'were', 'will', 'does', 'called', 'can', 'the', 'its', 'too', 'for', 'are', 'has', 'not', 'all', 'way'],
};

function makeInformativeWritingG2Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('informative-writing-g2: unknown mode ' + mode);
  // the bank's data a check needs (verify reads only these, never the build's constants)
  const INFO = {
    mentor: Object.fromEntries(BANK.mentor.map((m) => [m.key, { name: m.name, piece: m.piece, heads: m.heads, hk: m.hk, sort: m.sort, op: m.op, ex: m.ex, hook: m.hook }])),
    off: BANK.off.map((o) => o.t), ends: Object.fromEntries(BANK.ends.map((e) => [e.key, e])), offop: BANK.offop, frames: BANK.frames, links: BANK.links,
    topics: Object.fromEntries(BANK.topics.map((t) => [t.key, t])), research: Object.fromEntries(BANK.research.map((r) => [r.key, r])), worked: Object.fromEntries(BANK.worked.map((w) => [w.key, w])),
  };
  return {
    id, slug, gradeBand: 'G2', assetClass: 'none', exerciseType,
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
        bodyHtml: STYLE + `<div data-ws-content data-lcs-iw2="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px;min-height:0">` + fRoom(typo(blocks.join(''))) + `</div>`,
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
  const root = document.querySelector('[data-lcs-iw2]');
  if (!root) return ['no page'];
  const [mode, lvS] = root.dataset.lcsIw2.split('|'), lv = +lvS;
  const isKey = root.dataset.lcsIskey === '1';
  const R = (e) => e.getBoundingClientRect(), cs = (e) => getComputedStyle(e), fs = (e) => parseFloat(cs(e).fontSize);
  const straight = (s) => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  const txt = (e) => (e ? straight(e.textContent).replace(/\s+/g, ' ').trim() : '');
  const TEAL = 'rgb(20, 107, 94)';
  const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  const lc1 = (s) => String(s).charAt(0).toLowerCase() + String(s).slice(1);
  const noEnd = (s) => String(s).replace(/[.?!]$/, '');
  const titleCase = (s) => String(s).split(' ').map(cap).join(' ');
  const tok = (s) => String(s).toLowerCase().replace(/’/g, "'").match(/[a-z]+(?:'[a-z]+)?/g) || [];
  const stem = (w) => w.replace(/'s$/, '').replace(/ies$/, 'y').replace(/(sses|ches|shes|xes)$/, (m) => m.slice(0, -2)).replace(/([^s])s$/, '$1');
  const content = (s) => new Set(tok(s).filter((w) => w.length >= 4 && !S.STOP.includes(w)).map(stem));
  const shares = (a, b) => { const B = content(b); return [...content(a)].filter((w) => B.has(w)); };
  const names = (s, keys) => { const ws = tok(s).map(stem); return keys.some((k) => ws.includes(stem(k))); };
  const rb = R(root);

  // the instruction of this level
  const ins = document.querySelector('[data-lcs-instruction]');
  if (!ins) fails.push('no instruction at the top of the page'); else if (txt(ins) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(ins)}"`);
  // typographic apostrophes and quotes on everything printed (the rows' SVG text too)
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n, bad = ''; while ((n = tw.nextNode())) if (!n.parentElement.closest('style') && /['"]/.test(n.nodeValue)) { bad = n.nodeValue.trim().slice(0, 30); break; }
    if (!bad && ins && /['"]/.test(ins.textContent)) bad = ins.textContent.trim().slice(0, 30);
    if (bad) fails.push('a straight apostrophe or quotation mark is printed: ' + bad); }
  // letters: ligatures off, an f before i, f, l, t and a t before t with room of its own
  if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
  if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[ifl]/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, or ff may join its letters (ligatures on)');
  { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('style') && /f[iflt]|tt/.test(n.nodeValue)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.nodeValue.trim().slice(0, 20) + '"'); break; } }
  // pictures: only where the page has one, colour library pictures of the topic, big enough
  const imgs = [...root.querySelectorAll('img')];
  imgs.forEach((im) => { const p = im.dataset.lcsPic || '', th = p.split('/')[0]; if (/\bbw\b|\bbw ?\d*$/i.test(th) || !/themes/.test(im.getAttribute('src') || '')) fails.push('a picture that is not a colour library picture: ' + p); if (R(im).width < S.PIC - 0.5) fails.push(`a picture ${Math.round(R(im).width)} px wide (${S.PIC} or more)`); });
  if (!['plan', 'notes'].includes(mode) && imgs.length) fails.push('a picture on a page that has none');
  // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
  const blocks = [...root.children];
  blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
  root.querySelectorAll('[data-lcs-card]').forEach((c) => { const q = R(c); for (const e of c.querySelectorAll('span, div, b, i, svg, img')) { const r = R(e); if (r.width && (r.bottom > q.bottom + 0.5 || r.right > q.right + 0.5 || r.left < q.left - 0.5 || r.top < q.top - 0.5)) { fails.push('something leaves its card (' + (c.dataset.lcsTask || c.dataset.lcsBlock || Object.keys(c.dataset)[0]) + ')'); break; } } });
  const used = blocks.reduce((s, b) => s + R(b).height, 0);
  if (used < rb.height * S.FILL) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
  // sizes
  root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < S.BOOK - 0.01) fails.push(`text a second grader reads is ${fs(e)} px (${S.BOOK} or more)`); });
  root.querySelectorAll('[data-lcs-psent], [data-lcs-sent], [data-lcs-context], [data-lcs-stext], [data-lcs-choice] [data-lcs-opt]').forEach((e) => { if (fs(e) < S.READ - 0.01) fails.push(`a piece or a sentence is printed at ${fs(e)} px (${S.READ} or more)`); });
  root.querySelectorAll('[data-lcs-label]').forEach((e) => { if (fs(e) < S.LABEL) fails.push(`a task line smaller than ${S.LABEL} px`); });
  root.querySelectorAll('[data-lcs-opts] [data-lcs-opt], [data-lcs-headopt]').forEach((e) => { if (fs(e) < S.OPT) fails.push(`a word to circle smaller than ${S.OPT} px`); });
  root.querySelectorAll('[data-lcs-ruletext], [data-lcs-small], [data-lcs-wlabel], [data-lcs-mhead]').forEach((e) => { if (fs(e) < S.SMALL - 0.01) fails.push(`a box, a model, or a label printed smaller than ${S.SMALL} px`); });
  root.querySelectorAll('[data-lcs-ruletext]').forEach((e) => { if (fs(e) < S.RULE - 0.01) fails.push(`a rule box printed smaller than ${S.RULE} px`); });

  // ---- the writing rows: 44 px; the words printed on a row in ink; the key's words in teal, inside the row
  const rowOf = (l) => ({ l, pre: l.querySelector('[data-lcs-pre]'), mid: l.querySelector('[data-lcs-mid]'), end: l.querySelector('[data-lcs-end]'), gap: l.querySelector('[data-lcs-gapline]'), kt: l.querySelector('[data-lcs-keytext]'), ans: l.querySelector('[data-lcs-ans]') });
  const startX = (o) => (o.mid ? R(o.mid).right + S.SEP : o.gap ? R(o.gap).right + S.SEP : o.pre ? R(o.pre).right + S.SEP : R(o.l).left + S.PADL);
  const stopX = (o) => (o.end ? R(o.end).left - S.SEP : R(o.l).right - S.PADR);
  const freeOf = (o) => Math.floor((stopX(o) - startX(o)) / S.CHILD);
  const gapFree = (o) => (o.gap ? Math.floor((R(o.gap).width - 6) / S.CHILD) : 0);
  root.querySelectorAll('[data-lcs-row]').forEach((l) => {
    const o = rowOf(l), h = R(l).height;
    if (Math.abs(h - S.ROW) > 0.5) fails.push(`a writing row ${Math.round(h)} px high (${S.ROW})`);
    if (l.querySelectorAll('line').length < 3) fails.push('a writing row without its school rules');
    [o.pre, o.mid, o.end].forEach((e) => { if (e && fs(e) < S.START - 0.01) fails.push(`a frame printed on a row at ${fs(e)} px (${S.START})`); });
    if (o.pre && o.gap && R(o.pre).right > R(o.gap).left - 2) fails.push('a frame runs into its gap');
    if (o.mid && o.gap && R(o.mid).left < R(o.gap).right + 2) fails.push('the word after a gap runs into the gap');
    if (!isKey && (o.kt || o.ans)) fails.push('a row is filled on the page of the child');
    if (o.kt) { if (fs(o.kt) < S.KEY - 0.01) fails.push(`a key answer smaller than ${S.KEY} px`); if (R(o.kt).right > stopX(o) + S.SEP - 1 || R(o.kt).left < startX(o) - S.SEP - 1) fails.push('a key answer does not fit its row'); }
    if (o.ans && o.gap && (R(o.ans).left < R(o.gap).left - 1 || R(o.ans).right > R(o.gap).right + 1)) fails.push('the key\'s word does not fit its gap');
  });
  // every part the child writes in: its label above its rows; its rows hold the sample at a child's letter width (measured);
  // the task has a row to spare; on the key, the sample itself
  const parts = {}, spare = new Map();
  root.querySelectorAll('[data-lcs-wpart]').forEach((p) => {
    const name = p.dataset.lcsWpart, ls = [...p.querySelectorAll('[data-lcs-row]')], lab = p.querySelector(':scope > [data-lcs-wlabel]'), task = p.closest('[data-lcs-task]');
    parts[name] = p;
    if (lab && ls[0] && R(lab).bottom > R(ls[0]).top + 0.5) fails.push(`${name}: its label does not stand above its rows`);
    let sents; try { sents = JSON.parse(p.dataset.lcsSents); } catch (e) { fails.push(`${name}: no sentences`); return; }
    const os = ls.map(rowOf), free = os.map(freeOf), gfree = os.map(gapFree), out = os.map(() => ''), gaps = os.map(() => '');
    let ok = true;
    sents.forEach((s, k) => {
      if (!os[s.at]) { ok = false; return; }
      const stop = os[s.at].end ? s.at + 1 : k + 1 < sents.length ? sents[k + 1].at : os.length;
      if (s.gap !== undefined) { if (!os[s.at].gap || s.gap.length > gfree[s.at]) ok = false; gaps[s.at] = s.gap; }
      let i = s.at;
      for (const w of String(s.text).split(' ').filter(Boolean)) { const next = out[i] ? out[i] + ' ' + w : w; if (next.length <= free[i]) { out[i] = next; continue; } i++; if (i >= stop || w.length > free[i]) { ok = false; return; } out[i] = w; }
    });
    if (!ok) fails.push(`${name}: the rows do not hold the sample at a child's letter width`);
    // a row left empty; a task of one row has room on it (two letters or more after its sample)
    const sp = spare.get(task) || { empty: false, rows: 0, roomy: false };
    const starts = new Set(sents.map((q) => q.at)); sp.empty = sp.empty || out.some((t, j) => !gaps[j] && !os[j].pre && !os[j].gap && (!t || (!starts.has(j) && !/ /.test(t) && t.length <= 8))); sp.rows += os.length; sp.roomy = os.length === 1 && out[0].length <= free[0] - 2;
    spare.set(task, sp);
    // the sample: the words printed and the sentences, in order (the sentences are the sample the page names)
    const rebuilt = []; sents.forEach((s, k) => { const o = os[s.at]; rebuilt.push([txt(o.pre), s.gap !== undefined ? s.gap : '', txt(o.mid), s.text, o.end && (k + 1 === sents.length || sents[k + 1].at > s.at) ? txt(o.end) : ''].filter(Boolean).join(' ')); });
    const expect = straight(p.dataset.lcsExpect || '');
    if (rebuilt.join(' ').replace(/ ([,.?!])/g, '$1') !== expect) fails.push(`${name}: the sentences do not follow the words printed on its rows ("${rebuilt.join(' ').slice(0, 50)}")`);
    if (isKey) {
      const all = os.map((o) => [txt(o.pre), txt(o.ans), txt(o.mid), txt(o.kt), txt(o.end)].filter(Boolean).join(' ')).filter(Boolean).join(' ').replace(/ ([,.?!])/g, '$1');
      if (all !== expect && name !== 'mine') fails.push(`${name}: the key does not write its sample ("${all.slice(0, 50)}")`);
    }
  });
  spare.forEach((v, task) => { if (!(v.empty || (v.rows === 1 && v.roomy))) fails.push(`${task ? task.dataset.lcsTask : '?'}: the task leaves no row to spare`); });
  // the key's notes that answers vary
  { const vary = root.querySelectorAll('[data-lcs-vary]').length; if (vary !== (isKey ? S.VARY[mode] : 0)) fails.push(`${vary} notes that answers vary (${isKey ? S.VARY[mode] : 0} wanted)`); }
  // rings: only the key rings, and only the right one
  root.querySelectorAll('[data-lcs-opt]').forEach((o) => { const ringed = cs(o).borderTopColor === TEAL; if (isKey ? ringed !== !!o.dataset.lcsOk : ringed) fails.push('a choice is ringed on the page of the child, or the key rings the wrong one'); });
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
    if (ks.length === 2 && o.length >= 4 && o.every((x, i) => !i || x !== o[i - 1])) return 'every other one'; if (ks.length === 2 && /(ab){3}|(ba){3}/.test(o.map((x) => (x === ks[0] ? 'a' : 'b')).join(''))) return 'six alternating';
    if (ks.length >= 3 && o.length > ks.length && o.every((x, i) => i < ks.length || x === o[i - ks.length])) return 'a repeating cycle';
    for (let p = 2; p <= 4; p++) if (o.length >= 2 * p + 2 && o.filter((x, i) => i >= p && x === o[i - p]).length >= o.length - p - 1) return 'a rhythm that repeats every ' + p;
    return patternOf(o); };
  const labelIs = (sel, k, text) => { const c = root.querySelector(sel), l = c && c.querySelector('[data-lcs-label]'); if (!l) { fails.push(`no task line in ${sel}`); return; } const cl = l.cloneNode(true); cl.querySelectorAll('[data-lcs-vary], [data-lcs-varyspace], [data-lcs-anyorder], [data-lcs-report]').forEach((x) => x.remove()); if (txt(cl) !== (k ? k + '. ' : '') + text) fails.push(`the task line "${txt(cl).slice(0, 40)}" is not "${text.slice(0, 40)}"`); };
  const rows = (sel) => [...root.querySelectorAll(sel)].map(txt);
  const sameList = (got, want, what) => { if (got.join('|') !== want.join('|')) fails.push(`${what} is not as ruled ("${got.join(' | ').slice(0, 60)}")`); };
  // the words printed on the rows of a part, row by row; up to `extra` empty rows may stand anywhere from row `at` on (the
  // rows a long sample takes, and a row to spare)
  const printedIs = (name, want, extra = 0, at = want.length) => { const p = parts[name]; if (!p) { fails.push(`no part ${name}`); return; } const got = [...p.querySelectorAll('[data-lcs-row]')].map((l) => { const o = rowOf(l); return [txt(o.pre), txt(o.end), txt(o.mid)]; }); const w2 = want.map((x) => [x[0], x[1] || '', x[2] || '']);
    let i = 0, j = 0, x = 0, ok = true; while (ok && (i < got.length || j < w2.length)) { const g = got[i], w = w2[j]; if (g && w && g[0] === w[0] && g[1] === w[1] && g[2] === w[2]) { i++; j++; } else if (g && !g[0] && !g[1] && !g[2] && i >= at && x < extra) { i++; x++; } else ok = false; }
    if (!ok) fails.push(`${name}: the words printed on its rows are not those of level ${lv} (${got.map((y) => y.filter(Boolean).join('/')).join(' · ')})`); };
  const expectOf = (name) => (parts[name] ? straight(parts[name].dataset.lcsExpect) : null);
  const widthAtLeast = (name, min) => { const p = parts[name]; if (p) p.querySelectorAll('[data-lcs-row]').forEach((l) => { if (R(l).width < min - 0.5) fails.push(`${name}: a row ${Math.round(R(l).width)} px wide (${min} or more)`); }); };
  const checksAre = (want) => sameList([...root.querySelectorAll('[data-lcs-checkrow]')].map((e) => straight(e.dataset.lcsCheckrow)), want, 'the check list');

  if (mode === 'parts') {
    const d = S.LV.parts[lv];
    sameList(rows('[data-lcs-ruletext]'), S.PARTRULES, 'the box of the parts of an informative piece');
    const mc = root.querySelector('[data-lcs-task="mark"]'), sc = root.querySelector('[data-lcs-task="sort"]');
    const A = mc && I.mentor[mc.dataset.lcsTkey], B = sc && I.mentor[sc.dataset.lcsTkey];
    if (!A || !B || mc.dataset.lcsTkey === sc.dataset.lcsTkey) fails.push('the piece and the sort are not two mentor topics');
    else {
      labelIs('[data-lcs-task="mark"]', 1, S.TASK.mark[lv]); labelIs('[data-lcs-task="sort"]', 2, S.TASK.sort[lv].replace(/\{N\}/g, B.name));
      if (txt(root.querySelector('[data-lcs-ptitle]')) !== titleCase(A.name)) fails.push('the piece has not the title of its topic');
      const ps = [...root.querySelectorAll('[data-lcs-psent]')], hook = ps[0] && ps[0].dataset.lcsRole === 'hook';
      if (hook && (lv !== 3 || txt(ps[0]) !== A.hook)) fails.push('a question opens the piece on a level that has none, or not the question of its topic');
      const pp = hook ? ps.slice(1) : ps;
      if (pp.map(txt).join('|') !== A.piece.map((x) => x.t).join('|') || pp.map((e) => e.dataset.lcsRole).join() !== A.piece.map((x) => x.role).join()) fails.push('the piece is not printed as it is filed');
      ps.forEach((e) => { const role = e.dataset.lcsRole, c = cs(e), under = c.textDecorationLine.includes('underline'), box = c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) > 0, ring = parseFloat(c.borderTopWidth) > 0;
        if (under !== (isKey && role === 'ts') || box !== (isKey && role === 'close') || ring !== (isKey && role === 'def' && d.def)) fails.push(`the ${role} sentence is marked wrongly (the key marks the topic sentence, the closing sentence${d.def ? ', and the definition' : ''}; the page of the child marks nothing)`); });
      const its = [...root.querySelectorAll('[data-lcs-sortrow]')], kinds = its.map((e) => e.dataset.lcsSortrow);
      const want = { h0: d.n, h1: d.n, off: d.off, op: d.op };
      Object.entries(want).forEach(([k, n]) => { if (kinds.filter((x) => x === k).length !== n) fails.push(`the sort has ${kinds.filter((x) => x === k).length} sentences of the kind ${k}, not ${n}`); });
      its.forEach((e, i) => { const t = straight(e.dataset.lcsText), k = e.dataset.lcsSortrow;
        if (e.dataset.lcsLetter !== 'abcdefgh'[i] || txt(e.querySelector('[data-lcs-stext]')) !== t) fails.push(`sentence ${i + 1} of the sort is not lettered or printed as filed`);
        if (k === 'h0' || k === 'h1') { const h = +k[1]; if (!B.sort[h].includes(t)) fails.push(`"${t}" is no fact of the heading ${B.heads[h]}`); if (!names(t, B.hk[h]) || names(t, B.hk[1 - h])) fails.push(`"${t}" does not fit its heading only`); }
        if (k === 'op' && t !== B.op) fails.push(`"${t}" is not the opinion of the topic`);
        if (k === 'off' && (!I.off.includes(t) || shares(t, [...A.piece.map((x) => x.t), ...B.sort.flat(), B.op].join(' ')).length)) fails.push(`"${t}" is not a fact about something else`);
        const crossed = cs(e.querySelector('[data-lcs-stext]')).textDecorationLine.includes('line-through'); if (crossed !== (isKey && (k === 'off' || k === 'op'))) fails.push('a sentence is crossed out on the page of the child, or the key crosses out the wrong one'); });
      { const bad = orderBad(kinds); if (bad) fails.push('the kinds of the sort stand in a pattern: ' + bad); }
      // the facts of one heading never stand all together (a child could sort them by place)
      ['h0', 'h1'].forEach((k) => { const at = kinds.map((x, i) => (x === k ? i : -1)).filter((i) => i >= 0); if (at.length >= 2 && at[at.length - 1] - at[0] === at.length - 1) fails.push(`the facts of the heading ${k === 'h0' ? B.heads[0] : B.heads[1]} stand all together`); });
      [0, 1].forEach((h) => { const box = root.querySelector(`[data-lcs-headbox="${h}"]`), ls = box ? [...box.querySelectorAll('[data-lcs-lbox]')] : [];
        if (!box || box.dataset.lcsHead !== B.heads[h] || txt(box.querySelector('[data-lcs-headbar]')) !== B.heads[h]) fails.push(`the heading ${h + 1} is not ${B.heads[h]}`);
        const mine = its.filter((e) => e.dataset.lcsSortrow === 'h' + h).map((e) => e.dataset.lcsLetter);
        if (ls.length !== mine.length) fails.push(`the heading ${B.heads[h]} has ${ls.length} boxes for ${mine.length} facts`);
        ls.forEach((x) => { if (txt(x) !== (isKey ? x.dataset.lcsWant : '') || !mine.includes(x.dataset.lcsWant)) fails.push('a letter box is filled on the page of the child, or the key writes a letter that is not of its heading'); if (R(x).width < 45 || R(x).height < 45) fails.push('a letter box smaller than 45 px'); }); });
      { const ao = root.querySelector('[data-lcs-anyorder]'); if (!ao || (cs(ao).visibility !== 'hidden') !== isKey) fails.push('the key does not say that the letters under a heading may stand in any order (or the page of the child shows it)'); }
    }
  }
  if (mode === 'plan') {
    const c = root.querySelector('[data-lcs-task="plan"]'), t = c && I.topics[c.dataset.lcsPkey];
    if (!t) fails.push('the plan is about no fact topic');
    else {
      const name = t.Name === 'Snow' ? 'snow' : t.Name.toLowerCase();
      labelIs('[data-lcs-task="plan"]', 1, S.TASK.plan.replace('{N}', name)); labelIs('[data-lcs-task="check"]', 2, S.TASK.check);
      const box = root.querySelector('[data-lcs-factbox]');
      if (!box || box.dataset.lcsFactbox !== t.key || txt(box.querySelector('[data-lcs-boxtitle]')) !== 'Facts about ' + titleCase(name)) fails.push('the fact box is not about the topic of the plan');
      const fsx = [...root.querySelectorAll('[data-lcs-factbox] [data-lcs-fact]')].map((e) => straight(e.dataset.lcsFact));
      if (fsx.length !== 6 || fsx[5] !== t.def.t || fsx.slice(0, 5).sort().join('|') !== [...t.facts[0], ...t.facts[1].slice(0, 2)].map((x) => x.t).sort().join('|')) fails.push('the fact box does not hold five facts and the word of its topic');
      fsx.forEach((s, i) => { const e = root.querySelectorAll('[data-lcs-factbox] [data-lcs-fact]')[i]; if (txt(e) !== '• ' + s) fails.push('a fact of the box is not printed as filed'); });
      { const hs = fsx.slice(0, 5).map((s) => (t.facts[0].some((x) => x.t === s) ? 'a' : 'b')); const bad = orderBad(hs); if (bad) fails.push('the facts of the box stand grouped by heading: ' + bad); }
      const pi = root.querySelector('[data-lcs-factpic]');
      if (t.pic ? !pi || pi.dataset.lcsPic !== t.pic.theme + '/' + t.pic.noun : pi) fails.push('the fact box has not the picture of its topic');
      const ex = root.querySelector('[data-lcs-example]'), m = ex && I.mentor[ex.dataset.lcsExample];
      const exWant = m && (lv === 1 ? `A plan for another topic: ${titleCase(m.name)}. One fact: ${m.ex[2]}` : `A plan for another topic: ${titleCase(m.name)}. Heading: ${m.heads[m.ex[0]]}. Note: ${m.ex[1]}.`);
      if (!m || t.near.includes(ex.dataset.lcsExample) || txt(ex) !== exWant || !names(m.ex[1], m.hk[m.ex[0]]) || names(m.ex[1], m.hk[1 - m.ex[0]])) fails.push('the plan for another topic is not a mentor topic away from the page\'s topic, in the form of its level');
      const PR = S.PLANROWS[lv], fill = (x) => x.map((r) => [r[0].replace('{Name}', t.Name), r[1], r[2] || '']);
      printedIs('ts', fill(PR.ts)); printedIs('facts', fill(PR.facts), lv > 1 ? 1 : 0); printedIs('def', fill(PR.def), 1); printedIs('close', fill(PR.close), lv === 3 ? 1 : 0);
      ['ts', 'facts', 'def', 'close'].forEach((n) => widthAtLeast(n, S.FULL));
      if (txt(parts.def && parts.def.querySelector('[data-lcs-wlabel]')) !== S.DEFLABEL) fails.push('the part of the definition is not labeled "' + S.DEFLABEL + '"');
      const hc = root.querySelector('[data-lcs-headchoice]');
      if (lv === 2) { const hw = hc ? [...hc.querySelectorAll('[data-lcs-headword]')].map((e) => straight(e.dataset.lcsHeadword)) : []; if (hw.slice().sort().join('|') !== t.heads.slice().sort().join('|')) fails.push('level 2 does not offer the two headings and one that fits no fact'); if ([...t.facts.flat().map((x) => x.t), t.def.t].some((s) => names(s, tok(t.heads[2]).filter((w) => w.length > 3)))) fails.push('the third heading fits a sentence of the box'); }
      else if (hc) fails.push(`level ${lv} offers headings to choose`);
      if (!!root.querySelector('[data-lcs-wordbank]') !== (lv === 3)) fails.push('the word bank stands on a level that has none, or is missing on level 3');
      if (lv === 3) sameList([...root.querySelectorAll('[data-lcs-bankword]')].map(txt), S.PLANBANK, 'the word bank');
      checksAre(S.PLANCHECK[lv]);
      // the sample: the facts and the word of the box; level 3 closes with words of the word bank
      const f3 = [t.facts[0][0], t.facts[0][1], t.facts[1][0]];
      if (lv === 1 && expectOf('facts') !== f3.map((x) => x.t).join(' ')) fails.push('the sample facts are not facts of the box');
      if (lv > 1 && expectOf('facts') !== [`${lv === 2 ? 'Heading: ' : ''}${t.heads[0]}`, f3[0].note, f3[1].note, `${lv === 2 ? 'Heading: ' : ''}${t.heads[1]}`, f3[2].note].join(' ')) fails.push('the sample notes are not notes of the box under their headings');
      if (lv < 3 ? expectOf('def') !== `A ${t.def.word} is ${t.def.meaning}.` : expectOf('def') !== `${t.def.word}: ${t.def.meaning}`) fails.push('the sample definition is not the word of the box');
      if (lv === 3 && expectOf('close') !== `now you know about ${name}`) fails.push('the level-3 closing note is not "now you know about ' + name + '"');
      const vf = root.querySelector('[data-lcs-varyfor]'); if (isKey && (!vf || txt(vf) !== `(Sample for: ${titleCase(name)})`)) fails.push('the key does not name the topic of its sample');
    }
  }
  if (mode === 'endings') {
    const d = S.LV.endings[lv];
    sameList(rows('[data-lcs-ruletext]'), S.ENDRULES, 'the box of facts, definitions, and closings');
    labelIs('[data-lcs-task="close"]', 1, S.TASK.close); labelIs('[data-lcs-task="defs"]', 2, S.TASK.defs[lv]); labelIs('[data-lcs-task="link"]', 3, S.TASK.link);
    const cc = root.querySelector('[data-lcs-task="close"]'), C = cc && I.ends[cc.dataset.lcsTkey];
    if (!C) fails.push('the piece is no end topic');
    else {
      if ([...root.querySelectorAll('[data-lcs-task="close"] [data-lcs-psent]')].map(txt).join('|') !== C.piece.join('|')) fails.push('the piece is not printed as it is filed');
      const ch = [...root.querySelectorAll('[data-lcs-choice]')], kinds = ch.map((e) => e.dataset.lcsChoice);
      if (kinds.slice().sort().join() !== d.ch.slice().sort().join()) fails.push(`the endings of level ${lv} are not ${d.ch.join(', ')}`);
      const texts = {};
      ch.forEach((e) => { const k = e.dataset.lcsChoice, t = txt(e.querySelector('[data-lcs-opt]')); texts[k] = t;
        const want = k === 'close' ? C.close : k === 'l1' ? C.l1 : k === 'now' ? C.now : k === 'ts' ? C.piece[0] : null;
        if (want !== null ? t !== straight(want) : !I.offop.includes(t) || shares(t, [...C.piece, C.close, C.fact, C.l1, C.now].join(' ')).length) fails.push(`the ending of the kind ${k} is not as filed`);
        if (!!e.querySelector('[data-lcs-opt]').dataset.lcsOk !== (k === 'close')) fails.push('an ending other than the closing sentence is the right one'); });
      // the closing sentence is not found by its length or by its opener
      const others = kinds.filter((k) => k !== 'close').map((k) => texts[k] || ''), cl = texts.close || '';
      if (!(others.some((x) => x.length >= cl.length) && others.some((x) => x.length <= cl.length))) fails.push('the closing sentence is the longest or the shortest choice');
      if (/^Now you know\b/.test(cl) && !others.some((x) => /^Now you know\b/.test(x))) fails.push('only the closing sentence opens with "Now you know"');
      // the links: from other topics than the piece; one blank each; the right word offered once; places mixed
      const gs = [...root.querySelectorAll('[data-lcs-gap]')];
      if (gs.length !== S.NLINKS[lv]) fails.push(`${gs.length} linking-word gaps, not ${S.NLINKS[lv]}`);
      const ks = gs.map((e) => e.dataset.lcsGap);
      if (S.NLINKS[lv] === 4 ? S.LINKWORDS.some((w) => !ks.includes(w)) : new Set(ks).size < 2) fails.push('the linking words that answer the gaps are not the ones of the level (four gaps: all three words; three gaps: at least two)');
      { const bad = orderBad(ks); if (bad) fails.push('the linking words stand in a pattern: ' + bad); }
      const at = gs.map((e) => { const os = [...e.querySelectorAll('[data-lcs-opt]')].map((o) => straight(o.dataset.lcsOpt)), t = straight(e.dataset.lcsText), x = I.links.find((y) => y.t === t);
        if (!x || x.want !== e.dataset.lcsGap || x.key === C.key) fails.push(`"${t}" is no linking sentence of another end topic`);
        if (os.length !== d.opts || new Set(os).size !== os.length || os.some((o) => !S.LINKWORDS.includes(o)) || !os.includes(e.dataset.lcsGap)) fails.push(`"${t}" does not offer ${d.opts} linking words with the right one`);
        if (/\b(also|another|and)\b/i.test(t.replace('___', ' '))) fails.push(`"${t}" holds a linking word of its own`);
        if (txt(e.querySelector('[data-lcs-sent]')) !== t.replace(/\s*___\s*/, ' ').replace(/ ([.,?!:])/, '$1').trim().replace(/\s+/g, ' ') && txt(e.querySelector('[data-lcs-sent]')) !== t.split('___').map((s) => s.trim()).join(' ').replace(/ ([.,?!:])/, '$1')) fails.push(`"${t}" is not printed with its blank`);
        return os.indexOf(e.dataset.lcsGap); });
      { const bad = placesBad(at, d.opts); if (bad) fails.push('the right linking words stand in a pattern: ' + bad); }
      // the word to define: a word of another end topic's sentence, the frame of the level, the whole meaning as the sample
      const dc = root.querySelector('[data-lcs-task="defs"]'), fr = I.frames.find((x) => dc && x.word === dc.dataset.lcsFword);
      if (!fr) fails.push('the word to define is no word of the bank');
      else {
        if (txt(dc.querySelector('[data-lcs-context]')) !== straight(fr.context)) fails.push('the sentence of the word to define is not printed as filed');
        printedIs('frame', lv === 1 ? [[`A ${fr.word} is`, ''], ['', '']] : lv === 2 ? [['A', '', 'is'], ['', '']] : [['', ''], ['', '']], 1);
        widthAtLeast('frame', S.FULL);
        if (expectOf('frame') !== straight(`A ${fr.word} is ${fr.meaning}.`) || straight(fr.context).toLowerCase() !== straight(`${fr.meaning} is called a ${fr.word}.`).toLowerCase()) fails.push('the sample definition is not the whole meaning of the word');
        if (C.piece.some((s) => tok(s).includes(fr.word))) fails.push('the piece holds the word to define');
      }
    }
  }
  if (mode === 'draft') {
    const c = root.querySelector('[data-lcs-task="draft"]'), t = c && I.topics[c.dataset.lcsPkey];
    if (!t) fails.push('the draft is about no fact topic');
    else {
      const name = t.Name === 'Snow' ? 'snow' : t.Name.toLowerCase();
      labelIs('[data-lcs-task="use"]', 1, S.TASK.use.replace('{N}', name)); labelIs('[data-lcs-task="draft"]', 2, S.TASK.draft[lv]);
      const fsx = [...root.querySelectorAll('[data-lcs-strip] [data-lcs-fact]')].map((e) => straight(e.dataset.lcsFact));
      if (fsx.join('|') !== [...t.facts[0], ...t.facts[1].slice(0, 2)].map((x) => x.t).concat(t.def.t).join('|')) fails.push('the facts of the plan are not the facts of the box of the plan');
      if (lv < 3) printedIs('piece', S.DRAFTROWS[lv], 2, 9);
      else { const p = parts.piece, ls = p ? [...p.querySelectorAll('[data-lcs-row]')] : []; if (ls.length < S.DRAFTROWS[3] || ls.length > S.DRAFTROWS[3] + 1 || ls.some((l) => rowOf(l).pre)) fails.push(`level 3 has not ${S.DRAFTROWS[3]} open rows (nine where eight leave none to spare)`); }
      widthAtLeast('piece', S.FULL);
      if (!!root.querySelector('[data-lcs-wordbank]') !== (lv === 3)) fails.push('the word bank stands on a level that has none, or is missing on level 3');
      if (lv === 3) sameList([...root.querySelectorAll('[data-lcs-bankword]')].map(txt), S.DRAFTBANK, 'the word bank');
      const e = expectOf('piece') || '', fsT = t.facts.flat().map((x) => x.t);
      if (!e.startsWith(`Here are some facts about ${name}.`) || !e.endsWith(`Now you know about ${name}.`) || !e.includes(`A ${t.def.word} is ${t.def.meaning}.`)) fails.push('the sample draft has not the topic sentence, the definition, and the closing sentence of its topic');
      if (fsT.filter((s) => e.toLowerCase().includes(noEnd(s.slice(t.Name.length + 1)).toLowerCase())).length < 3) fails.push('the sample draft does not use three facts of its topic');
      if (lv > 1 && !/\b(also|another)\b/i.test(e)) fails.push('the sample draft uses no linking word (the check list asks for one)');
      if (/\btoo\b/i.test(e)) fails.push('the sample draft says "too" (with "also" it says the same twice)');
      const mk = root.querySelector('[data-lcs-modelkey]'), m = mk && I.mentor[mk.dataset.lcsModelkey];
      if (!m || t.near.includes(mk.dataset.lcsModelkey)) fails.push('the model is not a mentor topic away from the page\'s topic');
      else {
        // the model: the topic sentence, the fact that names the defined word, the fact with also, the definition, the closing
        const facts = m.piece.filter((x) => x.role === 'fact'), def = m.piece.find((x) => x.role === 'def'), alsoF = facts.find((x) => /\balso\b/.test(x.t));
        const dword = def ? stem(tok(def.t)[/^(A|An) /.test(def.t) ? 1 : 0]) : '', defF = facts.find((x) => x !== alsoF && tok(x.t).map(stem).includes(dword)) || facts.find((x) => x !== alsoF);
        const want = [m.piece[0], defF, alsoF, def, m.piece[m.piece.length - 1]].filter(Boolean).map((x) => straight(x.t));
        if (want.length !== 5 || txt(root.querySelector('[data-lcs-model]')) !== want.join(' ')) fails.push('the model is not its five sentences (topic sentence, the fact of the word, the fact with also, the definition, the closing sentence)');
      }
      sameList([...root.querySelectorAll('[data-lcs-lword]')].map(txt), S.LINKWORDS, 'the linking words');
      checksAre(S.DRAFTCHECK[lv]);
      const vf = root.querySelector('[data-lcs-varyfor]'); if (isKey && (!vf || txt(vf) !== `(Sample for: ${titleCase(name)})`)) fails.push('the key does not name the topic of its sample');
    }
  }
  if (mode === 'notes') {
    const d = S.LV.notes[lv], c = root.querySelector('[data-lcs-task="chart"]'), r = c && I.research[c.dataset.lcsTkey];
    if (!r) fails.push('the notes are about no research topic');
    else {
      labelIs('[data-lcs-task="which"]', 1, S.TASK.which); labelIs('[data-lcs-task="chart"]', 2, S.TASK.chart[lv]);
      const q = root.querySelector('[data-lcs-question]'); if (!q || q.dataset.lcsQuestion !== r.q || txt(q) !== 'Research question: ' + r.q) fails.push('the research question is not printed');
      const rp = root.querySelector('[data-lcs-rpic]'); if (!rp || rp.dataset.lcsPic !== r.pic.theme + '/' + r.pic.noun) fails.push('the picture is not the picture of the topic');
      [1, 2].forEach((n) => { const bk = root.querySelector(`[data-lcs-book="${n}"]`); if (!bk || txt(bk.querySelector('[data-lcs-booktitle]')) !== `Book ${n}: ${straight(r.books[n - 1].title)}` || txt(bk.querySelector('[data-lcs-booktext]')) !== straight(r.books[n - 1].s.join(' '))) fails.push(`Book ${n} is not printed as it is filed`); });
      const bt = r.books.map((x) => x.s.join(' '));
      const its = [...root.querySelectorAll('[data-lcs-whichrow]')], src = its.map((e) => e.dataset.lcsWhichrow);
      if (its.length !== d.items) fails.push(`${its.length} notes to mark, not ${d.items}`);
      if (new Set(src).size < 3) fails.push('the notes to mark do not use Book 1, Book 2, and Both');
      { const bad = orderBad(src); if (bad) fails.push('the books of the notes stand in a pattern: ' + bad); }
      its.forEach((e, i) => { const n = straight(e.dataset.lcsText), x = r.facts.find((y) => straight(y.note) === n);
        if (!x || String(x.src) !== e.dataset.lcsWhichrow) fails.push(`note ${i + 1} is no note of the topic, or not of its book`);
        else { if (x.src !== 2 && (!x.p1 || !r.books[0].s.includes(x.p1))) fails.push(`note ${i + 1}: no sentence of Book 1 states it`); if (x.src !== 1 && (!x.p2 || !r.books[1].s.includes(x.p2))) fails.push(`note ${i + 1}: no sentence of Book 2 states it`); if (x.src === 1 && x.in2) fails.push(`note ${i + 1}: a Book 1 note that Book 2 tells`); if (x.src === 2 && x.in1) fails.push(`note ${i + 1}: a Book 2 note that Book 1 tells`); }
        const ticks = [...e.querySelectorAll('[data-lcs-tick]')], want = ['Both', 'Book 1', 'Book 2'][+e.dataset.lcsWhichrow];
        if (ticks.map((t) => t.dataset.lcsTick).join() !== 'Book 1,Book 2,Both') fails.push(`note ${i + 1} has no boxes under Book 1, Book 2, and Both`);
        ticks.forEach((t) => { if (!!t.querySelector('[data-lcs-check]') !== (isKey && t.dataset.lcsTick === want)) fails.push(`note ${i + 1}: a check mark on the page of the child, or the key checks the wrong book`); }); });
      sameList(rows('[data-lcs-col]'), ['Book 1', 'Book 2', 'Both'], 'the columns of the notes to mark');
      const tableNotes = its.map((e) => straight(e.dataset.lcsText));
      // the worked note: another topic, the note of the level
      const wk = root.querySelector('[data-lcs-worked]'), w = wk && I.worked[wk.dataset.lcsWorked];
      if (!w || r.near.includes(wk.dataset.lcsWorked) || txt(wk) !== straight(`Another topic. Book: "${w.from}" Note: ${d.chart === 'copy' ? w.copy : w.own}`)) fails.push('the worked note is not a note of the level on another topic');
      // the chart: the parts of the level; the key's notes are notes of their book (level 1: words copied from it), and
      // none is a fact of the table
      const keyFacts = [];
      if (d.chart === 'source') {
        const nr = [...root.querySelectorAll('[data-lcs-noterow]')];
        if (nr.length !== 5) fails.push(`${nr.length} rows for notes, not 5`);
        nr.forEach((x) => { const bx = x.querySelector('[data-lcs-srcbox]'); if (!bx || R(bx).width < 38 || txt(bx) !== (isKey ? bx.dataset.lcsWant : '')) fails.push('a box for the book is missing, small, or filled on the page of the child'); });
        let sents = []; try { sents = JSON.parse(parts.mine.dataset.lcsSents); } catch (e) { fails.push('no notes'); }
        const lets = nr.map((x) => (x.querySelector('[data-lcs-srcbox]') || {}).dataset.lcsWant);
        sents.forEach((s, i) => { const x = r.facts.find((y) => straight(y.note) === straight(s.text)); keyFacts.push(x); if (!x || ['B', '1', '2'][x.src] !== lets[i]) fails.push(`the note "${s.text}" is not a note of the book its box names`); });
        if (new Set(lets).size < 3) fails.push('the sample notes are not from Book 1, Book 2, and both');
      } else {
        printedIs('b1', [['Book 1:', ''], ['', '']]); printedIs('b2', [['Book 2:', ''], ['', '']]); printedIs('both', [['Both books:', '']]);
        ['b1', 'b2', 'both'].forEach((n) => widthAtLeast(n, S.FULL));
        [['b1', 1], ['b2', 2], ['both', 0]].forEach(([n, s]) => { let sents = []; try { sents = JSON.parse(parts[n].dataset.lcsSents); } catch (e) { fails.push('no notes in ' + n); }
          if (!sents.length) fails.push(`no sample note for ${n}`);
          sents.forEach((x) => { const f = r.facts.find((y) => y.src === s && straight(d.chart === 'copy' ? (s === 2 ? y.in2 : y.in1) : y.note) === straight(x.text)); keyFacts.push(f); if (!f) fails.push(`the sample note "${x.text}" is not a note of ${n}`); if (d.chart === 'copy' && !bt[s === 2 ? 1 : 0].includes(x.text)) fails.push(`the copied note "${x.text}" is not words of the book`); }); });
      }
      if (keyFacts.some((x) => x && tableNotes.includes(straight(x.note)))) fails.push('a note of the chart is a note of the table (the chart asks for other facts)');
    }
  }
  if (mode === 'report') {
    const c = root.querySelector('[data-lcs-task="head"]'), r = c && I.research[c.dataset.lcsTkey];
    if (!r) fails.push('the report is about no research topic');
    else {
      labelIs('[data-lcs-task="head"]', 1, S.TASK.heading[lv]); labelIs('[data-lcs-task="write"]', 2, S.TASK.write); labelIs('[data-lcs-task="picture"]', 3, S.TASK.picture);
      if (txt(root.querySelector('[data-lcs-task="head"] [data-lcs-label] [data-lcs-report]')) !== r.q) fails.push('task 1 does not open with the research question of the report');
      // every level offers the three headings to circle; the key rings one (the heading of its sample)
      const os = [...root.querySelectorAll('[data-lcs-headopt]')];
      if (os.map((e) => straight(e.dataset.lcsHeadopt)).sort().join('|') !== r.heads.slice().sort().join('|')) fails.push('the page does not offer the three headings of the topic');
      os.forEach((e) => { if (txt(e) !== straight(e.dataset.lcsHeadopt) || cs(e).fontSize && fs(e) < S.OPT) fails.push('a heading to circle is printed otherwise or smaller than ' + S.OPT + ' px'); });
      const ok = os.filter((e) => e.dataset.lcsOk), h = ok.length === 1 ? r.heads.indexOf(straight(ok[0].dataset.lcsHeadopt)) : -1;
      if (h < 0) fails.push('not one heading is the key\'s');
      os.forEach((e) => { const ringed = cs(e).borderTopColor === TEAL; if (ringed !== (isKey && !!e.dataset.lcsOk)) fails.push('a heading is ringed on the page of the child, or the key rings another one'); });
      if (lv < 3) {
        // levels 1 and 2: each heading with its three notes (Book 1, Book 2, Both), every note under the heading it fits
        [0, 1, 2].forEach((hh) => { const line = root.querySelector(`[data-lcs-headline="${hh}"]`), F3 = [1, 2, 0].map((s) => r.facts.find((x) => x.h === hh && x.src === s));
          const ns = line ? [...line.querySelectorAll('[data-lcs-rnote]')] : [];
          if (!line || straight((line.querySelector('[data-lcs-headopt]') || {}).dataset ? line.querySelector('[data-lcs-headopt]').dataset.lcsHeadopt : '') !== straight(r.heads[hh])) fails.push(`the line of the heading ${r.heads[hh]} is missing`);
          if (ns.map(txt).join('|') !== F3.map((x, i) => straight(`${['Book 1', 'Book 2', 'Both'][i]}: ${x.note}`)).join('|')) fails.push(`the notes under ${r.heads[hh]} are not the notes of that heading`);
          F3.forEach((x) => { if (!names(x.note, r.hk[hh]) || [0, 1, 2].some((o) => o !== hh && names(x.note, r.hk[o]))) fails.push(`the note "${x.note}" does not fit its heading only`); }); });
        if (root.querySelector('[data-lcs-usenotes]')) fails.push('level ' + lv + ' sends the child to the day-1 notes');
      } else {
        if (root.querySelector('[data-lcs-rnote]')) fails.push('level 3 prints the notes');
        if (txt(root.querySelector('[data-lcs-usenotes]')) !== S.TASK.usenotes) fails.push('level 3 does not send the child to the notes and the books');
      }
      if (h >= 0) {
        const F = [1, 2, 0].map((s) => r.facts.find((x) => x.h === h && x.src === s));
        printedIs('rhead', [[S.TASK.headrow, '']]);
        if (expectOf('rhead') !== straight(`${S.TASK.headrow} ${r.heads[h]}`)) fails.push('the part has no row for its heading (the key writes the heading of its sample)');
        if (lv === 3) printedIs('part', S.REPROWS[3].map((x) => [x, '']), 3); else { const got = parts.part ? [...parts.part.querySelectorAll('[data-lcs-row]')].map((l) => txt(rowOf(l).pre)) : [], pres = got.map((x, i) => [x, i]).filter(([x]) => x); if (pres.map(([x]) => x).join('|') !== S.REPROWS[lv].filter(Boolean).join('|') || pres[0][1] !== 0 || pres.some(([, i], k) => (k + 1 < pres.length ? pres[k + 1][1] : got.length) - i < 2) || got.length < S.REPROWS[lv].length) fails.push('part: the frames of level ' + lv + ' do not stand each on its row with a row after it'); }
        widthAtLeast('part', S.FULL); widthAtLeast('rhead', S.FULL);
        const want = lv === 3 ? F.map((x) => x.s).join(' ') : F.map((x, i) => `${['One fact is that', 'Another fact is that', 'Both books say that'][i]} ${lc1(x.s)}`).join(' ');
        if (expectOf('part') !== straight(want)) fails.push('the sample is not a fact from each book and one from both, of the heading');
        const vf = root.querySelector('[data-lcs-task="write"] [data-lcs-label] [data-lcs-vary]'); if (isKey && (!vf || txt(vf) !== '(Sample answer.)')) fails.push('the key does not mark its sentences as a sample');
        // the rows of the part follow one another (44 px rows, no space spread between them)
        if (parts.part) { const ls = [...parts.part.querySelectorAll('[data-lcs-row]')]; ls.forEach((l, i) => { if (i && R(l).top - R(ls[i - 1]).top > S.ROW + 1) fails.push('the rows of the part are spread apart'); }); }
      }
      if (expectOf('label') !== straight(r.one)) fails.push('the sample label does not name the animal or the person of the topic');
      if (txt(parts.label && parts.label.querySelector('[data-lcs-wlabel]')) !== 'Label') fails.push('the label row has no label above it');
      const db = root.querySelector('[data-lcs-drawbox]'); if (!db || R(db).width < S.DRAWW - 0.5 || R(db).height < S.DRAWH - 0.5) fails.push(`the picture box is smaller than ${S.DRAWW} by ${S.DRAWH} px`);
      printedIs('label', [['', '']]);
      // the part to cut out: the heading, the sentences and the picture inside one dashed line; the check list outside
      const cut = root.querySelector('[data-lcs-cut]');
      if (!cut || cs(cut).borderTopStyle !== 'dashed' || !['write', 'picture'].every((k) => cut.querySelector(`[data-lcs-task="${k}"]`)) || cut.querySelector('[data-lcs-checkrow]') || !cut.contains(db)) fails.push('the part to cut out is not inside one dashed line, or holds the check list');
      { const pv = db && db.querySelector('[data-lcs-vary]'); if (isKey ? !pv || txt(pv) !== '(Pictures vary.)' : !!(db && db.textContent.trim())) fails.push('the key does not say in the picture box that pictures vary (or the page of the child prints in it)'); }
      if (txt(root.querySelector('[data-lcs-task="repcheck"] [data-lcs-mhead]')) !== S.TASK.repcheck) fails.push('the check list has no title');
      // the check list names both books (every copy names its topic and both titles)
      checksAre(S.REPCHECK.map((x) => x.replace('{B1}', straight(r.books[0].title)).replace('{B2}', straight(r.books[1].title))));
    }
  }
  // no blank band of more than GAP px, over everything printed: between blocks, and inside every card (its padding to its
  // first and last thing, and between any two things)
  { const visible = (e) => { const r = R(e); if (!r.width || !r.height) return false; const c = cs(e); return e.matches('[data-lcs-row], img, svg, [data-lcs-drawbox], [data-lcs-lbox], [data-lcs-box], [data-lcs-tick], [data-lcs-srcbox], [data-lcs-srctick], [data-lcs-headbar]') || [...e.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim()) || c.borderTopStyle !== 'none' && parseFloat(c.borderTopWidth) > 0; };
    // (a card's padding is blank too: the band runs from the inside of its border)
    const bandIn = (box, kids, what) => { const q = R(box), c = cs(box), top = q.top + parseFloat(c.borderTopWidth), bot = q.bottom - parseFloat(c.borderBottomWidth);
      const iv = kids.map(R).map((r) => [Math.max(top, r.top), Math.min(bot, r.bottom)]).filter(([a, b2]) => b2 > a).sort((a, b2) => a[0] - b2[0]);
      if (!iv.length) return; let low = top, g = 0; for (const [a, b2] of iv) { g = Math.max(g, a - low); low = Math.max(low, b2); } g = Math.max(g, bot - low);
      if (g > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(g)} px ${what}`); };
    root.querySelectorAll('[data-lcs-card]').forEach((c) => bandIn(c, [...c.querySelectorAll('*')].filter((e) => e !== c && visible(e) && !e.closest('svg') || e.tagName && e.tagName.toLowerCase() === 'svg' && e.parentElement && !e.parentElement.closest('svg')), 'in a card (' + (c.dataset.lcsTask || c.dataset.lcsBlock || 'box') + ')'));
    const bl = blocks.map(R); for (let k = 1; k < bl.length; k++) { const g = bl[k].top - bl[k - 1].bottom; if (g > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two blocks`); }
    if (bl.length && bl[0].top - rb.top > S.GAP + 0.5) fails.push('a blank band above the first block');
    if (bl.length && rb.bottom - bl[bl.length - 1].bottom > S.GAP + 0.5) fails.push('a blank band below the last block'); }
  return fails;
}

module.exports = { makeInformativeWritingG2Type, faultsOf, plan, LEVELS, INSTR, LINES, SPEC, place, placeKey, taskFits, keyFits, planParts, draftParts, reportParts, chartParts, frameParts, draftSentences, alsoForm, repFacts, PARTRULES, ENDRULES, PLANCHECK, DRAFTCHECK, REPCHECK, PLANBANK, DRAFTBANK };
