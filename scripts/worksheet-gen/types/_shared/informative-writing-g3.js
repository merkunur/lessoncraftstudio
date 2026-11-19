/**
 * informative-writing-g3.js — eight Grade 3 pages, the unit "Informative Writing and Research" (English literacy year,
 * Daily Teaching System Part 12.3, 2026-11-17). Children are 8 or 9. Every fact comes from the page: the source texts,
 * notes and samples are data/literacy/informative-writing-g3.en.json (written by the scratch script gg-g3inform/bank.js),
 * 17 topics (animals and their homes, weather, plants, how things are made, a simple machine, the Moon, firefighters),
 * each with two short source texts (60 to 120 words), notes under three headings and a fourth, the key words of every
 * heading (every note names a key word of its own heading and none of another: one home), a word to define, and the
 * samples of the keys (a sample says no number and no all / always / every / only / most / never its sources do not).
 * Nothing to copy across a lesson (WRITING-PAGES rule 12): the day-1 pages of the first three lessons (G3-556, G3-558,
 * G3-560) study eight MODEL topics of their own (bank.models: ladybugs, volcanoes, rainbows, bridges, bamboo, spiders,
 * clouds, magnets), never one of the 17 topics; G3-560's word to define is a model's too. Copy n of a level takes the
 * models in its own order (modelPerm): G3-556 the first two, G3-558 the next three and two of the other three, so no
 * copy uses one model on both pages and neighbouring copies start at another model. Copy n of G3-563 is about the
 * topic of copy n of G3-562 (one research project over three days).
 *
 *   notepick  G3-556 Choose and Sort Notes (W.3.8; day 1 of "Take notes and sort them"). A box: what a note is (keep the
 *             key words), with one worked note (bats, owls, snails, or frogs). 1. Sentences of a model (58 letters or
 *             fewer); under each, three notes: the sentence copied whole, a note that changes the fact, the good note
 *             (one right answer; the right note is not the shortest on every item). 2. Numbered notes of another model,
 *             three to a row, to sort under its headings (one home each).
 *               level 1  three sentences; six notes, two headings
 *               level 2  three sentences; nine notes, three headings
 *               level 3  two sentences and one to write a short note for (sample key); ten notes, three headings: one
 *                        note fits none of them (from the model's list of such notes) and is crossed out
 *   notes     G3-557 Take Notes and Sort Them (W.3.8; day 2). The box of good notes. The source text(s) of one topic and a
 *             note organizer with its headings.
 *               level 1  one text; two key word groups of each heading in bold: the child copies each under its heading
 *               level 2  two texts: notes with a box for the source letter (sample key; either letter is right when both
 *                        sources give a fact)
 *               level 3  two texts, three headings and a heading of the child's own (sample key)
 *   intro     G3-558 Introductions and Groups (W.3.2.a; day 1 of "Introduce a topic and group the facts"; model topics).
 *             1. For two models, their notes under headings and sentences to choose from: circle the one that
 *             introduces the topic best (the others: a detail, the introduction of a third model, and on levels 2 and 3
 *             a question the notes do not answer; no sentence twice on a page). 2. Three groups of notes of another
 *             model: write each group's heading from the box (levels 2 and 3 one heading left over; level 3 one note in
 *             the wrong group is crossed out).
 *   plan      G3-559 Plan Informative Writing (W.3.2.a; day 2). Nine numbered notes of one topic, a model plan of another
 *             topic, and a planner: an introduction, three groups with a heading each, a picture box with a caption
 *             line ("Caption" above it on levels 2 and 3), and a check list. Level 1: headings printed, the introduction
 *             and caption started; level 2: three heading words; level 3: four, one left over.
 *   fdd       G3-560 Fact, Definition, or Detail? (W.3.2.b; day 1 of "Facts, definitions, and details"). The rule box (each
 *             part starts with a fact; a definition tells what a word means; a detail tells more about the fact in its
 *             part), the same on every level. 1. Two or three parts of a model's mentor paragraph (parts of 2, 3, 3 and
 *             4 sentences; three are never all of one length), each part a block of its own that starts with its fact,
 *             GIVEN ("Fact:"; on level 3 in bold, no number): a check mark under definition or detail for each sentence
 *             after it (every detail is a fact too: no Fact column, writing review 1119). 2. The word-to-define fact of ANOTHER model and its two notes:
 *             the child writes a definition and a detail (sample key).
 *               level 1  two parts (at most seven sentences) in a table, defined words in bold; both lines started
 *               level 2  three parts (at most nine sentences) in a table; the definition started
 *               level 3  three parts as short numbered paragraphs with a grid of check boxes; no starters
 *   develop   G3-561 Develop Your Topic (W.3.2.b; day 2). The word to define with its meaning, the definition frames
 *             (level 3 adds "___, or ___,"), the linking words (also, another, more, but, for example, and), a model part
 *             of another topic (levels 1 and 2), and the draft: three parts, each with its heading and the first note
 *             of each source (the part of the word: a sentence that uses it, its definition, a sentence with a linking
 *             word), and a concluding sentence; each group of lines holds its sample and one line more (level 3: four
 *             lines a part, fourteen or more in all). Level 1: headings printed, every sentence started; level 2: each
 *             part started; level 3: open lines.
 *   research  G3-562 Notes from Two Sources (W.3.7; day 1 of "A short research report"). The research question (level 3:
 *             the child writes a question both sources can help answer, after "How do" and the topic), a good note of
 *             another topic (level 1), two sources, and an organizer: a row for each category with lines for notes from
 *             Source A and from Source B (three on levels 1 and 2, two on level 3); the key writes the notes of that
 *             source and category and says either letter is right when both sources give a fact.
 *   report    G3-563 Write a Research Report (W.3.7; days 2 and 3). Room for writing first: a full-width introduction,
 *             three parts of three lines (levels 1 and 2: each part shows the first note of each source with its letter;
 *             level 3: the child's own notes from Notes from Two Sources), a concluding sentence beside a diagram box of
 *             2.3 by 1.3 inches or more with a "Caption:" line, the sources, and a check list in one row. Level 1:
 *             headings printed, "Now you know that" starts the concluding sentence; level 2: each part started. Every
 *             level names the topic ("Your topic: ...") and prints the two source titles.
 *
 * Writing lines are single ruled lines 34 px high (a wide-ruled notebook line). A third grader writes about 45 letters
 * across a full-width line (13.5 px a letter): every line of a key holds its sample at that measure, and every task
 * whose key is a sample has at least one line to spare. A label stands above its lines. No blank band of more than 40 px
 * between tasks, blocks, or at the foot of a card. Ligatures are off, and an f before i, f, l, or t and a t before t get
 * room of their own. Typographic apostrophes and quotes on the page. English only; themeless; PDF only. The bank is
 * checked when this file loads (faultsOf), including that every level of every page can be drawn; verify() carries its
 * own copy (SPEC) of every ruled text and measure, so a build that changes one of them fails its pages.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/informative-writing-g3.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle } = _parts;

const READ = 17;         // a sentence, an option, a note a third grader reads
const TEXT = 16;         // the running text of a source or a mentor paragraph
const LABEL = 17;        // a task line
const RULEPX = 15.5;     // a rule box
const ROW = 34;          // a handwriting line (single rule)
const ROWMAX = 40;       // a line may grow to this to fill the sheet
const CHILD = 13.5;      // px a letter at a third grader's handwriting (45 letters across a full-width line)
const PICKMAX = 58;      // a sentence to note (and the choice that copies it) stands on one line
const NOTE_MAX = 20;     // letters in a note of a topic (a few words; children write them on lines)
const NOTE_MAX_MODEL = 24; // letters in a note of a model topic (printed only: it keeps the key words of its sentence)
/** headings that name a whole topic or everything else: every note of an unprinted heading would fit them */
const TOO_WIDE = /^(the plant|the animal|about\b.*|facts|other|more|what they do|what it is like)$/i;
const GAP = 40;          // the largest blank band between tasks, cards, or blocks (px)
const A = (s) => esc(s).replace(/"/g, '&quot;');

/** the page instruction of every level (registered as strings with add-strings.js; verify() checks its own copy) */
const INSTR = {
  notepick: { 1: 'A good note is a few words that tell one fact.', 2: 'Good notes are short. They keep the key words of one fact.', 3: 'Good notes are short, true to the text, and keep the key words.' },
  notes: { 1: 'Key words from a text make good notes.', 2: 'Take short notes. Write which source each note is from.', 3: 'Sort your notes under headings. Add a heading of your own.' },
  intro: { 1: 'An introduction tells what the whole piece is about.', 2: 'An introduction names the topic. Headings name groups of facts.', 3: 'Facts that go together belong under one heading.' },
  plan: { 1: 'Plan your writing: an introduction, groups of facts, and a picture.', 2: 'Plan an introduction, three groups of facts with headings, and a picture.', 3: 'Plan your piece. Group the facts and give each group a heading.' },
  fdd: { 1: 'Facts, definitions, and details each do a different job.', 2: 'A definition tells what a word means. A detail tells more about a fact.', 3: 'Writers build each part with facts, definitions, and details.' },
  develop: { 1: 'Write each part with facts. Define a hard word.', 2: 'Use facts and linking words in each part. Define one hard word.', 3: 'Develop your topic with facts, definitions, and details.' },
  research: { 1: 'Researchers take notes from more than one source.', 2: 'Take notes from both sources to answer the research question.', 3: 'Write your own research question. Then take notes from both sources.' },
  report: { 1: 'A research report answers a question with facts from sources.', 2: 'Write an introduction, three parts with headings, and a concluding sentence.', 3: 'Write your report from your own notes and list your sources.' },
};
/** the task lines */
const LINES = {
  pick: 'Read each sentence from a text about {name}. Circle the best note.',
  write: 'Write a short note for this sentence. Keep the key words.',
  sort: { 1: 'Write the number of each note under its heading.', 2: 'Write the number of each note under its heading.', 3: 'Write the number of each note under its heading. One note fits none of the headings: cross it out.' },
  notes: { 1: 'Copy each group of words in bold under the heading it fits.', 2: 'Write two or more notes under each heading. In the box, write A or B for the source.', 3: 'Write notes under each heading and the letter of the source. Name a fourth heading and write notes for it.' },
  introPick: 'Read the notes. Circle the sentence that introduces the topic best.',
  group: { 1: 'Notes about {name}: write the heading of each group. Use the box.', 2: 'Notes about {name}: write the heading of each group. One heading in the box is left over.', 3: 'Notes about {name}: write the heading of each group. One heading is left over. One note is in the wrong group: cross it out.' },
  planIntro: 'Introduction', planGroups: { 1: 'Write an introduction and the notes that go under each heading.', 2: 'Write an introduction, a heading for each group, and its notes. Headings:', 3: 'Write an introduction, a heading for each group, and its notes. Pick three:' },
  planPic: 'Draw a picture that helps the reader. Write a caption under it.',
  label: { 1: 'Read the paragraph. Each part starts with a fact. Is each sentence after it a definition or a detail? Put a check mark.', 2: 'Read the paragraph. Each part starts with a fact. Is each sentence after it a definition or a detail? Put a check mark.', 3: 'Read the paragraph. Each part starts with a fact in bold. Under each sentence number, put a check mark in the row of its job.' },
  addTo: 'Add a definition and a detail to this fact. Use the notes.',
  draft: { 1: 'Write about {name}. Define the word in one part.', 2: 'Write about {name}. Write each heading. Define the word in one part.', 3: 'Write about {name}. Write each heading. Define the word in one part.' },
  conclude: 'Concluding sentence',
  question: 'Research question', question3: 'Write a question both sources can help you answer.',
  organize: { 1: 'Take notes from each source. Write each note in the row of its category.', 2: 'Name each category. It will be a heading in your report. Take notes in its row.', 3: 'Name each category. It will be a heading in your report. Take notes in its row.' },
  reportTask: { 1: 'Write your report from the notes. Draw a diagram with a caption.', 2: 'Write your report. Add a note of your own to each part.', 3: 'Use your notes from Notes from Two Sources to write your report.' },
};
const RULES = {
  notes: { title: 'Good notes', rows: ['A note is a few words about one fact.', 'Do not copy whole sentences.'], own: 'Keep the key words; say the rest your own way.' },
  intro: { title: 'Introductions and headings', rows: ['An introduction tells what the whole piece is about.', 'A heading names a group of facts that go together.'] },
  fdd: { title: 'Facts, definitions, and details', rows: ['A <b>fact</b> tells one main thing about the topic. Each part starts with a fact.', 'A <b>definition</b> tells what a word means.', 'A <b>detail</b> tells more about the fact in its part, such as an example, a number, or what something looks like.'] },
};
const CHECK_PLAN = ['My introduction names my topic.', 'I grouped facts under headings.', 'I added a picture with a caption.'];
const CHECK_DEVELOP = { 1: ['Each part has facts.', 'I defined a hard word.', 'I used linking words.', 'I wrote a concluding sentence.'], 2: ['Each part has facts.', 'I defined a hard word.', 'I used linking words.', 'I wrote a concluding sentence.'], 3: ['Facts', 'Definition', 'Detail', 'Linking words', 'Concluding sentence'] };
const CHECK_REPORT = ['Introduction', 'Three parts', 'Concluding sentence', 'Diagram', 'Sources'];
/** the definition frames (every definition the keys write follows one of them) */
const FRAMES = { 1: ['A ___ is a ___ that ___.', '___ is ___.', 'To ___ means ___.'], 2: ['A ___ is a ___ that ___.', '___ is ___.', 'To ___ means ___.'], 3: ['A ___ is a ___ that ___.', '___ is ___.', 'To ___ means ___.', '___, or ___,'] };
const SAMPLE_TEXT = 'Sample answers. Others can be right too.';
const SAMPLE_Q = 'Sample question. Others are right if the sources answer them.';
const BOTH_TEXT = 'If both sources give a fact, either letter is right.';
/** a note of the key under a task line (the child's page keeps its room empty) */
const bothNote = (key) => `<span ${key ? 'data-lcs-both' : 'data-lcs-bothroom'} style="float:right;clear:right;margin:4px 0 2px 10px;white-space:nowrap;font:700 11px/13px 'Nunito',sans-serif;color:${T.coral};${key ? '' : 'visibility:hidden;'}">${BOTH_TEXT}</span>`;
/** the starter of the level-3 research question: "How do" and the topic noun when the question names it there */
const q3Start = (X) => { const w = X.q3.split(' '), last = X.name.split(' ').slice(-1)[0].replace(/e?s$/, ''), at = w.slice(0, 5).findIndex((x, i) => i >= 2 && last === lc(x).replace(/e?s$/, '')); return at > 0 ? w.slice(0, at + 1).join(' ') : 'How do'; };

/* ------------------------------------------------------------------ words */
const words = (s) => String(s).split(/\s+/).filter(Boolean).length;
const lc = (s) => String(s).toLowerCase();
const tok = (s) => lc(s).match(/[a-z]+(?:'[a-z]+)?/g) || [];
/** every sentence of a topic with its source letter */
const sentsOf = (T0) => [...T0.A.s.map((x) => ({ ...x, src: 'A' })), ...T0.B.s.map((x) => ({ ...x, src: 'B' }))];
const notesOf = (T0, h, src) => sentsOf(T0).filter((x) => x.h === h && x.note && (!src || x.src === src));
const textWords = (src) => src.s.reduce((a, x) => a + words(x.t), 0);
/** the kinds of a mentor paragraph, group by group */
const devKinds = (dev, n) => dev.g.slice(0, n).flat().map((x) => x[0]);
/** a sentence that refers back (it can only be a detail): a fact never starts this way */
const REF = /^(It|Its|They|Their|This|These|That|Those|There|Then|For example|Also)\b/;
const DEFRE = (w) => new RegExp('^(A|An) ' + w + ' (is|are) |^' + w + ' (is|are) |^To ' + w + ' (a tree )?means ', 'i');
/** the starter of a definition (up to its verb) */
const defStarter = (s) => (s.match(/^(.*? (is|are|means))\b/) || [])[1] || '';
const firstWords = (s, n) => s.split(' ').slice(0, n).join(' ');
/** the first n words of a sentence, one more after The, A, An, Most, Many, Some, or Each (a starter that names something) */
const opener = (s, n) => { const w = String(s).split(' '); return w.slice(0, /^(The|A|An|Most|Many|Some|Each)$/.test(w[0]) ? n + 1 : n).join(' '); };
/** the starter of a detail: up to a comma within its first four words (For example,), or its first word */
const detStart = (s) => { const m = String(s).match(/^((?:\S+ ){0,3}\S+,)/); return m ? m[1] : String(s).split(' ')[0]; };
const GROUPS = ['animal', 'weather', 'plant', 'made', 'machine', 'space', 'people', 'land', 'force'];
/** a word as the key-word check compares it (a plural s dropped) */
const stemW = (w) => (w.length > 3 && /s$/.test(w) && !/ss$/.test(w) ? w.slice(0, -1) : w);
/** the heading(s) of a set whose key words a phrase names (hk: four lists of key words) */
const homesOf = (hk, phrase) => hk.map((ks, j) => (tok(phrase).some((w) => ks.some((k) => stemW(w) === stemW(k))) ? j : -1)).filter((j) => j >= 0);
/** the words a sample may only say when its source says them: numbers and all, always, every, only, most, never */
const STRONG = /^(all|always|every|only|most|never|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|hundred|hundreds|thousand|thousands|million|millions|half|third|fourth|fifth)$/;
const strongOf = (t) => [...tok(t).filter((w) => STRONG.test(w)), ...(String(t).match(/\d+/g) || [])];
/** the eight models of a copy, in the order its pages take them (each type and level its own start; copy n + 8 another
 *  step): G3-556 takes the first two, G3-558 the next three and two more for its other-topic sentences, so no copy
 *  uses one model on both pages; neighbouring copies start at another model */
const modelPerm = (MS, n, lv) => { const L = MS.length, step = [1, 3, 5, 7][Math.floor((n - 1) / L) % 4], start = ((n - 1) * 3 + lv) % L; return Array.from({ length: L }, (_, i) => MS[(start + i * step) % L]); };

/** the patterns a child could read off a column of answers: one value on every other item (three or more), runs of one
 *  length (three runs or more), a block that repeats over two thirds of the column ('' = none) */
function patternOf(o) {
  const n = o.length;
  for (const par of [0, 1]) { const sub = o.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
  const runs = []; o.forEach((x, i) => { if (i && x === o[i - 1]) runs[runs.length - 1]++; else runs.push(1); });
  if (runs.length >= 3 && runs[0] >= 2 && runs.slice(0, -1).every((r) => r === runs[0])) return 'runs of one length';
  for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (o[i + k] !== o[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
  return '';
}
/** an order of kinds: no three alike in a row, never every other one, no repeating cycle or rhythm */
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
/** the parts of the model topics' mentor paragraphs a page can show: n parts in their order, with a fact, a definition,
 *  and a detail among them, five sentences or more, no pattern in their kinds, and three parts never all of one length */
function mentorParts(MS, n) {
  const subsets = (m, k, from = 0) => (k === 0 ? [[]] : Array.from({ length: Math.max(0, m - from) }, (_, i) => from + i).flatMap((i) => subsets(m, k - 1, i + 1).map((r) => [i, ...r])));
  const out = [];
  (MS || []).forEach((X) => subsets(((X.dev || {}).g || []).length, n).forEach((gs) => {
    const rows = gs.flatMap((g) => X.dev.g[g].map((x) => ({ k: x[0], t: x[1], w: x[2] || null }))), ks = rows.map((r) => r.k);
    const lens = gs.map((g) => X.dev.g[g].length);
    if (rows.length >= 5 && rows.length <= (n === 2 ? 7 : 9) && ['F', 'Def', 'D'].every((k) => ks.includes(k)) && orderOk(ks) && (n < 3 || new Set(lens).size > 1)) out.push({ X, gs, rows }); }));
  return out;
}
function kindOrder(counts, rng, extra) {
  const bag = Object.entries(counts).flatMap(([k, c]) => Array(c).fill(k));
  for (let t = 0; t < 5000; t++) { const o = shuffle(bag, rng); if (orderOk(o) && (!extra || extra(o))) return o; }
  throw new Error('no mixed order of ' + JSON.stringify(counts));
}
/** n right answers among m places: every place used when n >= m, none on more than half, no three alike in a row, no
 *  staircase, never the same place on every item */
function placesOk(p, m) {
  const n = p.length, count = (v) => p.filter((x) => x === v).length;
  if (n >= m && new Set(p).size < m) return false;
  if (n >= 2 && new Set(p).size === 1) return false;
  if (n >= 4 && Math.max(...Array.from({ length: m }, (_, v) => count(v))) > Math.ceil(n / 2)) return false;
  if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return false;
  if (m >= 3 && p.some((x, i) => i >= 2 && ((p[i - 1] === p[i - 2] + 1 && x === p[i - 1] + 1) || (p[i - 1] === p[i - 2] - 1 && x === p[i - 1] - 1)))) return false;
  if (patternOf(p)) return false;
  return true;
}
function places(n, m, rng) {
  for (let t = 0; t < 5000; t++) { const p = Array.from({ length: n }, () => rng.int(0, m - 1)); if (placesOk(p, m)) return p; }
  throw new Error(`no mixed places for ${n} answers among ${m}`);
}

/* ------------------------------------------------------------------ the bank */
/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(b) {
  const f = [], TS = b.topics || [], MS = b.models || [];
  if (TS.length < 16) f.push(`only ${TS.length} topics (16 or more: every level of every page needs 14 copies)`);
  if (new Set(TS.map((x) => x.id)).size !== TS.length || new Set(TS.map((x) => x.title)).size !== TS.length) f.push('two topics share an id or a title');
  const LINK = /\b(also|another|more|but|for example|and)\b/i;
  const srcTok = (X) => new Set([...tok(sentsOf(X).map((x) => x.t).join(' ')), ...(sentsOf(X).map((x) => x.t).join(' ').match(/\d+/g) || [])]);
  // a sample never says more than its source: its numbers and its all, always, every, only, most, never stand there
  const strongOk = (t, src) => strongOf(t).every((w) => src.has(w));
  // two texts share a word of four letters or more (a plural s dropped)
  const shares = (a, bb) => tok(bb).filter((w) => w.length >= 4).some((w) => tok(a).some((v) => v.startsWith(stemW(w))));
  const headsOk = (X, at) => {
    [...(X.heads || []), X.extra].forEach((h) => { if (TOO_WIDE.test(h || '')) at(`the heading "${h}" names the whole topic or everything else`); });
    if (!Array.isArray(X.heads) || X.heads.length !== 3 || new Set(X.heads).size !== 3 || !X.extra || X.heads.includes(X.extra)) at('not three headings and a fourth');
    [...(X.heads || []), X.extra].forEach((h) => { if (!/^[A-Z][A-Za-z ]+$/.test(h || '') || h.length > 15) at(`the heading "${h}" is not a short heading (15 letters or fewer)`); });
    if (!Array.isArray(X.hk) || X.hk.length !== 4 || X.hk.some((ks) => !ks.length)) at('no key words for each of the four headings');
  };
  // one home for every note: it names a key word of its own heading and none of another heading of its set
  const homeOk = (X, x, at) => { const hs = homesOf(X.hk || [[], [], [], []], x.note); if (hs.length !== 1 || hs[0] !== x.h) at(`the note "${x.note}" does not have one home: it names key words of ${hs.length ? hs.map((j) => '"' + [...X.heads, X.extra][j] + '"').join(' and ') : 'no heading'}`); };
  const sentOk = (X, x, at, max = NOTE_MAX) => {
    if (!/^[A-Z].*\.$/.test(x.t) || /"/.test(x.t)) at(`"${x.t}" is not one sentence`);
    if (x.h === null) { if (x.note || x.key || x.wrong) at(`"${x.t}" carries a note but no heading`); return; }
    if (![0, 1, 2, 3].includes(x.h)) at(`"${x.t}": heading ${x.h}`);
    if (!x.note || x.note.length > max || words(x.note) > 5 || /\.$/.test(x.note) || x.note.length > 0.6 * x.t.length) at(`the note "${x.note}" is not a few words (${max} letters or fewer, under three fifths of its sentence)`);
    if (x.wrong !== undefined && (!x.wrong || x.wrong === x.note || Math.abs(x.wrong.length - x.note.length) > 8 || x.wrong.length > max + 2)) at(`the wrong note "${x.wrong}" is not a short note near the length of "${x.note}"`);
    if (x.wrong !== undefined && sentsOf(X).some((y) => y.note === x.wrong)) at(`the wrong note "${x.wrong}" is a note of the topic`);
    if (x.note) homeOk(X, x, at);
  };
  const groupOk = (g, gi, at, max) => {
    if (!g.length || g[0][0] !== 'F' || g.slice(1).some((x) => x[0] === 'F') || g.length < 2) at(`part ${gi + 1} of the mentor paragraph does not start with its one fact`);
    g.forEach((x, i) => {
      if (!['F', 'Def', 'D'].includes(x[0]) || !/^[A-Z].*\.$/.test(x[1]) || x[1].length > max) at(`"${x[1]}" is not a sentence of ${max} letters or fewer with a kind`);
      if (x[0] === 'F' && (REF.test(x[1]) || /\bmeans\b/.test(x[1]) || / (is|are) (a|an) [a-z ,-]+ (that|who|which) /.test(x[1]) || /^(A|An) [a-z ]+ is (a|an) /.test(x[1]))) at(`the fact "${x[1]}" refers back or reads like a definition`);
      if (x[0] === 'Def' && (!x[2] || !DEFRE(x[2]).test(x[1]) || !g.slice(0, i).map((y) => lc(y[1])).join(' ').includes(lc(x[2]).replace(/s$/, '')))) at(`the definition "${x[1]}" does not say what a word used before it means`);
      // (writing review 1119: "One is called north, and one is called south." read as a definition) a detail never names
      if (x[0] === 'D' && /^(A|An) [a-z ]+ (is|are) (a|an|the) |\bmeans\b|\b(is|are) called\b/.test(x[1])) at(`the detail "${x[1]}" reads like a definition`);
    });
  };
  // the part of the word to define: its fact, definition, and detail, and the notes a page prints of them
  const hardOk = (X, at) => {
    const G = (X.dev || {}).g || [], H = X.hard || {}, hg = G[H.g] || [];
    const def = hg.find((x) => x[0] === 'Def'), det = hg.find((x) => x[0] === 'D');
    if (!def || !det) { at('the word to define has no fact, definition, and detail'); return null; }
    if (!lc(H.defNote || '').startsWith(lc(def[2]) + ':') || !H.detNote || H.detNote.length > 34) at('the notes of the word to define do not start with the word, or the detail note is long');
    if (!lc(hg[0][1]).includes(lc(def[2]).replace(/s$/, ''))) at('the fact of the word to define does not hold the word');
    // a sample of the word (definition, detail) says nothing its two notes do not say
    const nt = new Set([...tok(H.defNote + ' ' + H.detNote), ...((H.defNote + ' ' + H.detNote).match(/\d+/g) || [])]);
    [def[1], det[1]].forEach((t) => { if (!strongOf(t).every((w) => nt.has(w))) at(`"${t}" says a number or an all-word its notes do not`); });
    return def[2];
  };

  TS.forEach((X) => {
    const at = (m) => f.push(`${X.id}: ${m}`);
    if (!GROUPS.includes(X.group)) at(`group "${X.group}" is not one of ${GROUPS.join(', ')}`);
    headsOk(X, at);
    for (const k of ['A', 'B']) {
      const S = X[k];
      if (!S || !S.title || S.title.length > 20) { at(`source ${k} has no title of 20 letters or fewer`); continue; }
      const n = textWords(S);
      if (n < 60 || n > 120) at(`source ${k} has ${n} words (60 to 120)`);
      // two sources side by side on the research page hold ten lines each beside the note organizer (measured: 391
      // letters take ten lines, 412 take eleven)
      { const len = S.s.map((x) => x.t).join(' ').length; if (len > 395) at(`source ${k} has ${len} letters (395 or fewer)`); }
      S.s.forEach((x) => {
        sentOk(X, x, at);
        // the words in bold on level 1 of the notes page: words of the text A sentence that carry its fact alone and fit
        // only their own heading
        if (x.key !== undefined) { if (k !== 'A' || x.h === 3 || !x.t.includes(x.key) || x.key.length > 40) at(`the key words "${x.key}" are not words of the text A sentence`);
          else { const hs = homesOf(X.hk || [[], [], [], []], x.key); if (hs.length !== 1 || hs[0] !== x.h) at(`the key words "${x.key}" do not fit only their own heading`); } }
      });
    }
    const all = sentsOf(X), src = srcTok(X);
    for (let h = 0; h < 3; h++) {
      if (all.filter((x) => x.src === 'A' && x.h === h && x.key).length < 2) at(`text A has fewer than two key word groups for "${X.heads[h]}"`);
      if (notesOf(X, h, 'A').length < 1 || notesOf(X, h, 'B').length < 1) at(`no note of each source for "${X.heads[h]}"`);
      if (notesOf(X, h).length < 3) at(`fewer than three notes for "${X.heads[h]}"`);
    }
    if (notesOf(X, 3).length < 2) at(`fewer than two notes for the fourth heading "${X.extra}"`);
    // the sentences of the pages
    const stem = lc(X.title.replace(/^The /, '').split(' ')[0]).replace(/e?s$/, '');
    const names = (t) => tok(t).slice(0, 3).some((w) => w.startsWith(stem));
    // an introduction on two lines (one line of a sample and one to spare)
    if (!X.intro || X.intro.length > 46 || !/\.$/.test(X.intro) || !names(X.intro)) at(`the introduction "${X.intro}" is not a sentence of 46 letters or fewer that names the topic first`);
    if (!X.rIntro || X.rIntro.length > 46 || !/\.$/.test(X.rIntro) || !names(X.rIntro)) at(`the report introduction "${X.rIntro}" is not a sentence of 46 letters or fewer that names the topic first`);
    if (!/\?$/.test(X.ask || '') || X.ask.length > 45) at(`"${X.ask}" is not a question of 45 letters or fewer`);
    // the concluding sentence: the topic again in new words, never the introduction, never a sentence of a source
    if (!X.close || X.close.length > 46 || !/[.!]$/.test(X.close)) at(`the concluding sentence "${X.close}" is not a sentence of 46 letters or fewer`);
    if (X.close && ([X.intro, X.rIntro].includes(X.close) || all.some((x) => lc(x.t) === lc(X.close)))) at(`the concluding sentence "${X.close}" repeats the introduction or a sentence of a source`);
    if (X.close1 !== undefined && (X.close1.length > 46 || !names(X.close1) || !/\.$/.test(X.close1))) at(`the level-1 concluding sentence "${X.close1}" does not start with the topic`);
    if (!/\?$/.test(X.q || '') || X.q.length > 64) at(`the research question "${X.q}" is not a question of 64 letters or fewer`);
    if (!/^How do /.test(X.q3 || '') || !/\?$/.test(X.q3) || X.q3.length > 47) at(`the level-3 research question "${X.q3}" does not start with "How do" or takes more than its one line (47 letters)`);
    if (!Array.isArray(X.say) || X.say.length !== 3 || X.say.some((p) => p.length !== 2 || p.some((t) => t.length > 48 || !/^[A-Z].*\.$/.test(t)))) at('not two sample sentences of 48 letters or fewer for every heading');
    (X.say || []).forEach((p) => { if (p[1] && !LINK.test(p[1])) at(`the sample "${p[1]}" uses no linking word`); });
    // level 1 of the draft starts each sample sentence with its first words: the child writes the rest
    [...(X.say || []).flat(), ...(X.rep || []).map((p) => p[0])].forEach((t) => { if (words(t) <= words(opener(t, 3))) at(`the sample "${t}" is no longer than its level-1 starter`); });
    if (!Array.isArray(X.rep) || X.rep.length !== 3 || X.rep.some((p) => p.length !== 2 || p.some((t) => t.length > 48 || !/^[A-Z].*\.$/.test(t)))) at('not two report sentences of 48 letters or fewer for every part');
    // the three lines of a report part: its sample takes two, one to spare
    (X.rep || []).forEach((p) => { if (spread(p.join(' '), Math.floor((W - 24 - 20 - 8) / CHILD)).length > 2) at(`the report part "${p.join(' ')}" takes more than two of its three lines`); });
    // a report part: one sentence from the first note of Source A, one from the first note of Source B with a linking word
    (X.rep || []).forEach((p, h) => { const a = notesOf(X, h, 'A')[0], bb = notesOf(X, h, 'B')[0];
      if (a && !shares(p[0], a.note)) at(`the report sentence "${p[0]}" is not written from the note "${a.note}" (A)`);
      if (bb && !shares(p[1], bb.note)) at(`the report sentence "${p[1]}" is not written from the note "${bb.note}" (B)`);
      if (!LINK.test(p[1] || '')) at(`the report sentence "${p[1]}" uses no linking word`); });
    if (!X.cap || X.cap.length > 34 || /\.$/.test(X.cap)) at(`the caption "${X.cap}" is not a caption of 34 letters or fewer`);
    // every sample says nothing its sources do not
    [...(X.say || []).flat(), ...(X.rep || []).flat(), X.intro, X.rIntro, X.close, X.close1, X.cap].filter(Boolean).forEach((t) => { if (!strongOk(t, src)) at(`"${t}" says ${strongOf(t).filter((w) => !src.has(w)).join(', ')}, which no source of the topic says`); });
    const G = (X.dev || {}).g || [];
    if (G.length !== 3) at('the mentor paragraph has not three parts');
    // a topic's paragraph prints only its word-to-define part, on lines that wrap (60); a model's parts stand in rows of
    // one line on Fact, Definition, or Detail? (52)
    G.forEach((g, gi) => groupOk(g, gi, at, 60));
    const H = X.hard || {};
    if (![0, 1, 2].includes(H.h)) at('the word to define has no part (heading)');
    const word = hardOk(X, at);
    // the draft's part of the word to define starts with a sentence that uses the word; another part's first sentence
    // is written from the notes the draft prints (the first three of its heading)
    (X.say || []).forEach((p, h) => {
      if (h === H.h) { if (word && !lc(p[0]).includes(lc(word).replace(/s$/, ''))) at(`the sample "${p[0]}" of the part of the word to define does not use "${word}"`); }
      else { const ns = [notesOf(X, h, 'A')[0], notesOf(X, h, 'B')[0]]; if (!ns.some((x) => x && shares(p[0], x.note))) at(`the sample "${p[0]}" shares no word with the notes the draft prints`); }
    });
  });

  // ---------------------------------------------------------------- the model topics of the day-1 pages
  const nameW = (X) => tok(X.name + ' ' + X.title).filter((w) => w.length >= 4).map((w) => w.replace(/e?s$/, ''));
  if (MS.length < 8) f.push(`only ${MS.length} model topics (eight: a copy takes seven of them on two pages)`);
  if (new Set(MS.map((x) => x.id)).size !== MS.length) f.push('two model topics share an id');
  const STRUCT = {};
  const topicWords = new Set(TS.map((T) => { const hg = T.dev.g[T.hard.g] || []; const d = hg.find((x) => x[0] === 'Def'); return d ? lc(d[2]) : ''; }));
  const topicTexts = new Set(TS.flatMap((T) => [...sentsOf(T).map((x) => x.t), ...T.dev.g.flat().map((x) => x[1])]));
  MS.forEach((X) => {
    const at = (m) => f.push(`model ${X.id}: ${m}`);
    if (TS.some((T) => T.id === X.id || nameW(T).some((w) => nameW(X).includes(w)))) at('shares its topic with a topic the children write about');
    if (!GROUPS.includes(X.group)) at(`group "${X.group}" is not one of ${GROUPS.join(', ')}`);
    headsOk(X, at);
    const all = sentsOf(X), src = srcTok(X);
    all.forEach((x) => sentOk(X, x, at, NOTE_MAX_MODEL));
    for (let h = 0; h < 3; h++) if (notesOf(X, h, 'A').length < 1 || notesOf(X, h, 'B').length < 1 || notesOf(X, h).length < 4) at(`not four notes for "${X.heads[h]}", one or more in each list`);
    if (notesOf(X, 3).length < 2) at(`fewer than two notes for the fourth heading "${X.extra}"`);
    // the notes that fit none of the three headings: a list, each a note of the fourth heading
    if (!Array.isArray(X.none) || !X.none.length || X.none.some((n) => !notesOf(X, 3).some((x) => x.note === n))) at('no list of notes that fit none of the three headings (each a note of the fourth heading)');
    { const sh = all.filter((x) => x.wrong && x.t.length <= PICKMAX && x.h < 3); if (sh.length < 6 || new Set(sh.map((x) => x.h)).size < 3) at('fewer than six sentences with a wrong note of ' + PICKMAX + ' letters or fewer, from three headings'); }
    if (!all.some((x) => x.wrong && x.wrong.length < x.note.length)) at('no wrong note is shorter than its right note (length would tell the answer)');
    if (all.filter((x) => x.note && x.h !== null && x.h < 3 && x.note.length <= NOTE_MAX && x.t.length >= 40).length < 3) at('fewer than three sentences of 40 letters or more to write a note for');
    const stem = lc(X.title.replace(/^The /, '').split(' ')[0]).replace(/e?s$/, '');
    if (!X.intro || X.intro.length > 80 || !/\.$/.test(X.intro) || !tok(X.intro).slice(0, 3).some((w) => w.startsWith(stem))) at(`the introduction "${X.intro}" is not a sentence of 80 letters or fewer that names the topic first`);
    if (!/\?$/.test(X.ask || '') || X.ask.length > 45) at(`"${X.ask}" is not a question of 45 letters or fewer`);
    if (!Array.isArray(X.say) || X.say.length !== 3 || X.say.some((p) => !p[0] || p[0].length > 46 || !/^[A-Z].*\.$/.test(p[0]))) at('not one detail sentence of 46 letters or fewer for every heading');
    [...(X.say || []).map((p) => p[0]), X.intro].filter(Boolean).forEach((t) => { if (!strongOk(t, src)) at(`"${t}" says ${strongOf(t).filter((w) => !src.has(w)).join(', ')}, which no source of the model says`); });
    const G = (X.dev || {}).g || [];
    if (G.length !== 4 || !X.dev.head) at('the mentor paragraph has not four parts and a heading');
    G.forEach((g, gi) => groupOk(g, gi, at, 52));
    if (G.length === 4) { const k = G.map((g) => g.map((x) => x[0]).join(' ')).join(' | '); STRUCT[k] = (STRUCT[k] || 0) + 1; if (new Set(G.map((g) => g.length)).size < 3) at('the four parts of the mentor paragraph are not of three lengths (two, three, four sentences)'); }
    if (mentorParts([X], 2).length < 3 || mentorParts([X], 3).length < 2) at('the mentor paragraph gives too few pages (three of its pairs of parts and two of its threes must show a fact, a definition, and a detail with no pattern)');
    // the word to define of G3-560 part 2: a model's, never a word or a fact of a topic the children write about
    const word = hardOk(X, at);
    if (word && topicWords.has(lc(word))) at(`its word to define "${word}" is a word to define of a topic the children write about`);
    const hg = G[(X.hard || {}).g] || []; if (hg.some((x) => topicTexts.has(x[1]))) at('a sentence of its word to define stands in a topic the children write about');
  });
  Object.entries(STRUCT).forEach(([k, n]) => { if (n > 1) f.push(`${n} model mentor paragraphs share the kinds ${k}`); });
  if (mentorParts(MS, 2).length < 14 || mentorParts(MS, 3).length < 14) f.push('the model mentor paragraphs give fewer than 14 pages on a level');
  if ((b.examples || []).length < 3 || b.examples.some((e) => !e.t || !e.note || e.note.length > 30 || [...TS, ...MS].some((X) => tok(e.about).some((w) => tok(X.name).includes(w))))) f.push('fewer than three worked notes, or one about a topic of the bank or a model topic');
  if ((b.linking || []).join() !== 'also,another,more,but,for example,and') f.push('the linking words are not also, another, more, but, for example, and');
  // a copy's two day-1 pages of lessons 1 and 2 share no model topic; neighbouring copies start at another model; the
  // report of copy n is about the topic of copy n of the research page (Days 1 to 3 are one project)
  if (!f.length) for (let lv = 1; lv <= 3; lv++) for (let n = 1; n <= 17; n++) {
    const r = (m, k) => plan(b, m, lv, makeRng('informative-writing-g3|cross|' + m + lv + n), k);
    let np, ip, np2;
    try { np = r('notepick', n); ip = r('intro', n); np2 = r('notepick', n + 1); } catch (e) { f.push(`copy ${n}, level ${lv}: the day-1 pages cannot be drawn (${e.message})`); break; }
    const a = [np.X.id, np.Z.id], c = [...ip.items.map((it) => it.X.id), ip.Z.id, ...ip.items.map((it) => it.opts.find((o) => o.k === 'other').of)];
    if (a.some((id) => c.includes(id))) f.push(`copy ${n}, level ${lv}: Choose and Sort Notes and Introductions and Groups use the model ${a.find((id) => c.includes(id))}`);
    if (new Set(c).size !== c.length) f.push(`copy ${n}, level ${lv}: Introductions and Groups uses a model twice`);
    if (np.X.id === np2.X.id) f.push(`copies ${n} and ${n + 1}, level ${lv}: Choose and Sort Notes starts at one model`);
    if (r('report', n).X.id !== r('research', n).X.id) f.push(`copy ${n}, level ${lv}: the report is not about the topic of the research page`);
  }
  // every level of every page can be drawn
  if (!f.length) for (const mode of Object.keys(LEVELS)) for (const lv of [1, 2, 3]) for (let s = 1; s <= 8; s++) {
    try { plan(b, mode, lv, makeRng('informative-writing-g3|' + mode + '|' + lv + '|' + s)); } catch (e) { f.push(`${mode} level ${lv} cannot be drawn: ${e.message}`); break; }
  }
  return f;
}

/* ------------------------------------------------------------------ levels */
const LEVELS = {
  notepick: { 1: { pick: 3, heads: 2, per: 3, none: 0, write: 0 }, 2: { pick: 3, heads: 3, per: 3, none: 0, write: 0 }, 3: { pick: 2, heads: 3, per: 3, none: 1, write: 1 } },
  notes: { 1: { texts: 1, lines: 3 }, 2: { texts: 2, lines: 4 }, 3: { texts: 2, lines: 3, own: true } },
  intro: { 1: { items: 2, opts: 3, chips: 3, per: 3, stray: 0 }, 2: { items: 2, opts: 4, chips: 4, per: 2, stray: 0 }, 3: { items: 2, opts: 4, chips: 4, per: 2, stray: 1 } },
  plan: { 1: { heads: 'printed', words: 0 }, 2: { heads: 'words', words: 3 }, 3: { heads: 'words', words: 4 } },
  fdd: { 1: { groups: 2, table: true, bold: true, starters: 2 }, 2: { groups: 3, table: true, bold: false, starters: 1 }, 3: { groups: 3, table: false, bold: false, starters: 0 } },
  develop: { 1: { heads: true, starters: 'all' }, 2: { heads: false, starters: 'first' }, 3: { heads: false, starters: 'none' } },
  research: { 1: { cats: true, q: true, cell: 3 }, 2: { cats: false, q: true, cell: 3 }, 3: { cats: false, q: false, cell: 2 } },
  report: { 1: { heads: true, starters: 'all' }, 2: { heads: false, starters: 'first' }, 3: { heads: false, starters: 'none' } },
};

/* ------------------------------------------------------------------ what a page holds */
function plan(b, mode, lv, rng, variant) {
  const d = LEVELS[mode][lv], TS = b.topics;
  const pickTopic = (not = []) => shuffle(TS.filter((x) => !not.includes(x.id)), rng)[0];
  // the main topic of a copy steps through the topics with the copy's number (17 copies, 17 topics; each type and level
  // starts at another topic). The report takes the topic of the same copy of the research page: Days 1 to 3 are one
  // research project. Without a number (the bank check) the topic is drawn.
  const shiftOf = (m) => [...(m + lv)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 997, 7);
  const shift = shiftOf(mode === 'report' ? 'research' : mode);
  const primary = () => (variant ? TS[(variant - 1 + shift) % TS.length] : pickTopic());
  const other = (k, not) => (variant ? TS[(variant - 1 + shift + k) % TS.length] : pickTopic(not));
  const example = () => shuffle(b.examples, rng)[0];
  // the day-1 pages of lessons 1 to 3 study MODEL topics, never a topic the children write about (WRITING-PAGES rule
  // 12). Copy n of a level takes the models in the order modelPerm gives: G3-556 the first two, G3-558 the next three and
  // two of the last three for its other-topic sentences, so no copy uses one model on both pages.
  const MS = b.models;
  const n = variant || 1 + rng.int(0, 63), perm = modelPerm(MS, n, lv), cycle = Math.floor((n - 1) / MS.length);
  if (mode === 'notepick') {
    const X = perm[0], Z = perm[1];
    for (let t = 0; t < 600; t++) {
      const cand = shuffle(sentsOf(X).filter((x) => x.wrong && x.t.length <= PICKMAX), rng);
      const picks = [];
      for (const x of cand) if (picks.length < d.pick && !picks.some((y) => y.h === x.h)) picks.push(x);
      for (const x of cand) if (picks.length < d.pick && !picks.includes(x)) picks.push(x);
      if (picks.length < d.pick) continue;
      // the right note is not the shortest on every item (length would tell)
      if (picks.every((x) => x.note.length < x.wrong.length)) continue;
      const at = places(d.pick, 3, rng);
      const items = picks.map((x, i) => { const o = shuffle([{ t: x.t, k: 'copy' }, { t: x.wrong, k: 'wrong' }], rng); o.splice(at[i], 0, { t: x.note, k: 'right' }); return { t: x.t, h: x.h, src: x.src, note: x.note, opts: o }; });
      const write = d.write ? shuffle(sentsOf(X).filter((x) => x.note && x.h !== null && !picks.some((y) => y.t === x.t) && x.note.length <= NOTE_MAX && x.t.length >= 40), rng)[0] : null;
      if (d.write && !write) continue;
      const heads = shuffle([0, 1, 2], rng).slice(0, d.heads);
      const notes = [];
      // the notes of a heading: a window of its four notes that moves with the copy (copy n + 8 another window)
      heads.forEach((h) => { const ns = notesOf(Z, h), o = (cycle + h) % ns.length; [...ns, ...ns].slice(o, o + d.per).forEach((x) => notes.push({ note: x.note, h })); });
      // the note that fits no heading: one of the model's notes that fit none of the three
      if (d.none) notes.push({ note: Z.none[(cycle + n) % Z.none.length], h: 3 });
      if (notes.length !== heads.length * d.per + d.none) continue;
      let ord;
      try { ord = kindOrder(Object.fromEntries([...heads, ...(d.none ? [3] : [])].map((h) => [h, h === 3 ? 1 : d.per])), rng, (o) => [0, 1, 2].every((c) => { const col = o.filter((x, i) => i % 3 === c); return col.length < 3 || new Set(col).size > 1; })); } catch (e) { continue; }
      const q = {}; shuffle(notes, rng).forEach((x) => (q[x.h] = q[x.h] || []).push(x));
      const sorted = ord.map((h) => q[h].shift());
      return { mode, lv, X, Z, ex: example(), items, write: write ? { t: write.t, note: write.note } : null, heads, notes: sorted,
        list: [...items.map((x) => 'pick:' + x.t), ...(write ? ['write:' + write.t] : []), ...sorted.map((x) => 'sort:' + Z.id + ':' + x.note)] };
    }
    throw new Error('no page of notes to choose and sort');
  }
  if (mode === 'notes') {
    const X = primary();
    const heads = [0, 1, 2];
    if (lv === 1) {
      const keys = heads.map((h) => sentsOf(X).filter((x) => x.src === 'A' && x.h === h && x.key).slice(0, 2).map((x) => x.key));
      return { mode, lv, X, ex: example(), heads, keys, list: ['topic:' + X.id, ...keys.flat()] };
    }
    const sample = heads.map((h) => { const a = notesOf(X, h, 'A'), bb = notesOf(X, h, 'B'); return lv === 2 ? [...a, ...bb].slice(0, d.lines - 1) : [a[0], bb[0]]; });
    const own = d.own ? notesOf(X, 3).slice(0, d.lines - 1) : null;
    return { mode, lv, X, ex: example(), heads, sample, own, list: ['topic:' + X.id, ...sample.flat().map((x) => x.note)] };
  }
  if (mode === 'intro') {
    // the six models the copy did not use on G3-556: two to introduce, one to group (always the copy's own), three
    // spare; the copy's own order first, another order of the other five when that one leaves the right introduction the
    // longest on both items
    const six = perm.slice(2), five = [six[0], six[1], ...six.slice(3)];
    for (let t = 0; t < 600; t++) {
      const pk = t < 60 ? five : shuffle(five, rng), X1 = pk[0], X2 = pk[1], Z = six[2], spare = pk.slice(2);
      // the other-topic sentences: two different spare models of the copy, each of another kind than its item's topic
      const os = shuffle(spare, rng), O1 = os.find((y) => y.group !== X1.group), O2 = os.find((y) => y.group !== X2.group && y !== O1);
      if (!O1 || !O2) continue;
      // the place of the right introduction: item 1's moves with the copy and the level, item 2's is another place
      const p0 = (n + lv) % d.opts, at = [p0, shuffle([...Array(d.opts).keys()].filter((p) => p !== p0), rng)[0]];
      const items = [[X1, O1], [X2, O2]].map(([X, O], i) => {
        const h = rng.int(0, 2);
        const opts = shuffle([{ t: X.say[h][0], k: 'detail' }, { t: O.intro, k: 'other', of: O.id }, ...(d.opts === 4 ? [{ t: X.ask, k: 'ask' }] : [])], rng);
        opts.splice(at[i], 0, { t: X.intro, k: 'right' });
        const notes = [0, 1, 2].map((hh) => [notesOf(X, hh, 'A')[0].note, notesOf(X, hh, 'B')[0].note]);
        return { X, h, opts, notes };
      });
      // the right sentence is not the longest of its item on both items (length would tell)
      if (items.every((it) => it.opts.every((o) => o.k === 'right' || o.t.length < it.X.intro.length))) continue;
      const order = shuffle([0, 1, 2], rng);
      const used = new Set();
      // the notes of a group: a window of its heading's notes that moves with the copy
      const groups = order.map((h) => { const all = notesOf(Z, h), o = (cycle + h) % all.length, ns = [...all, ...all].slice(o, o + d.per); ns.forEach((x) => used.add(x.note)); return { h, notes: ns.map((x) => ({ note: x.note, h })) }; });
      if (d.stray) {
        const gi = rng.int(0, 2), j = shuffle([0, 1, 2].filter((h) => h !== groups[gi].h), rng)[0];
        const sx = shuffle(notesOf(Z, j).filter((x) => !used.has(x.note)), rng)[0];
        if (!sx) continue;
        groups[gi].notes.splice(rng.int(0, groups[gi].notes.length), 0, { note: sx.note, h: j, stray: true });
      }
      // the box of headings: no heading stands straight above its own group
      let chips = null;
      for (let k = 0; k < 200 && !chips; k++) { const c = shuffle([0, 1, 2, ...(d.chips === 4 ? [3] : [])], rng); if (c.every((h, ci) => h === 3 || groups.findIndex((g) => g.h === h) !== ci)) chips = c; }
      if (!chips) continue;
      return { mode, lv, items, Z, groups, chips, list: [...items.map((it) => 'intro:' + it.X.id + ':' + it.h), 'group:' + Z.id, ...groups.flatMap((g) => g.notes.map((x) => x.note))] };
    }
    throw new Error('no page of introductions and groups');
  }
  if (mode === 'plan') {
    const Y = primary(), M = other(7, [Y.id]);
    const per = [0, 1, 2].map((h) => [...notesOf(Y, h, 'A'), ...notesOf(Y, h, 'B')].slice(0, 3));
    const ord = kindOrder({ 0: 3, 1: 3, 2: 3 }, rng);
    const q = per.map((p) => shuffle(p, rng));
    const notes = ord.map((h) => ({ note: q[h].shift().note, h: +h }));
    const mh = rng.int(0, 2);
    const wordsBank = d.words ? shuffle([...Y.heads, ...(d.words === 4 ? [Y.extra] : [])], rng) : [];
    return { mode, lv, Y, M, mh, notes, wordsBank, list: ['plan:' + Y.id, ...notes.map((x) => x.note)] };
  }
  if (mode === 'fdd') {
    // the mentor paragraph: parts of a model's paragraph (neighbouring copies another model, copy n + 8 other parts);
    // the fact to add a definition and a detail to: the word to define of ANOTHER model, never a topic the children
    // write about (the draft of Day 2 defines a word of its own topic)
    const parts = mentorParts(MS, d.groups), byModel = MS.map((m) => parts.filter((p) => p.X === m)).filter((l) => l.length);
    const list = byModel[(n - 1 + lv) % byModel.length], part = variant ? list[(cycle + lv) % list.length] : shuffle(list, rng)[0];
    const X = part.X, others = MS.filter((m) => m !== X), Y = others[(n + 2) % others.length];
    const hg = Y.dev.g[Y.hard.g];
    const hard = { fact: hg[0][1], def: hg.find((x) => x[0] === 'Def')[1], word: hg.find((x) => x[0] === 'Def')[2], det: hg.find((x) => x[0] === 'D')[1], defNote: Y.hard.defNote, detNote: Y.hard.detNote };
    return { mode, lv, X, Y, gs: part.gs, rows: part.rows, hard, list: ['dev:' + X.id + ':' + part.gs.join(''), 'hard:' + Y.id] };
  }
  if (mode === 'develop') {
    const Y = primary(), M = other(7, [Y.id]);
    const hg = Y.dev.g[Y.hard.g];
    const hard = { fact: hg[0][1], def: hg.find((x) => x[0] === 'Def')[1], word: hg.find((x) => x[0] === 'Def')[2], defNote: Y.hard.defNote, h: Y.hard.h };
    // the part of the word to define: a sentence from its notes that uses the word, the definition, and a sentence
    // with a linking word; another part: two sentences from its notes
    const parts = [0, 1, 2].map((h) => (h === hard.h ? [Y.say[h][0], hard.def, Y.say[h][1]] : Y.say[h]));
    const notes = [0, 1, 2].map((h) => [notesOf(Y, h, 'A')[0], notesOf(Y, h, 'B')[0]].map((x) => x.note));
    const mg = M.dev.g[M.hard.g];
    const model = [mg[0][1], mg.find((x) => x[0] === 'Def')[1], mg.find((x) => x[0] === 'D')[1]];
    const close = lv === 1 && Y.close1 ? Y.close1 : Y.close;
    return { mode, lv, Y, M, hard, parts, notes, model, close, list: ['develop:' + Y.id, 'model:' + M.id] };
  }
  if (mode === 'research') {
    const X = primary();
    // the key of a cell: the notes of that source and heading, as many as leave one line to spare
    const cells = [0, 1, 2].map((h) => ['A', 'B'].map((s) => notesOf(X, h, s).slice(0, d.cell - 1).map((x) => x.note)));
    // a worked note (another topic) on the shortest examples, so it stands on one line
    const ex = shuffle(b.examples.filter((e) => e.t.length + e.note.length <= 62), rng)[0];
    return { mode, lv, X, ex, cells, list: ['research:' + X.id] };
  }
  if (mode === 'report') {
    // the topic of the same copy of the research page (Days 2 and 3 of the project of Day 1)
    const X = primary();
    // the first note of each source for every part (the part's sample sentences are written from them)
    const notes = [0, 1, 2].map((h) => [notesOf(X, h, 'A')[0], notesOf(X, h, 'B')[0]].map((x) => ({ note: x.note, src: x.src })));
    return { mode, lv, X, notes, list: ['report:' + X.id] };
  }
  throw new Error('informative-writing-g3: no plan for ' + mode);
}

{ const f = faultsOf(BANK); if (f.length) throw new Error('informative-writing-g3.en.json: ' + f.join('; ')); }

/* ------------------------------------------------------------------ the parts of a page */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}[data-lcs-label] b,[data-lcs-ruletext] b{color:' + T.teal + ';font-weight:800}</style>';   // before the root: verify counts the root's children as blocks
/** an f before i, f, l, or t and a t before t touch the next letter in this font even with ligatures off: each gets room
 *  of its own (text inside tags is left alone) */
function fRoom(html) {
  let out = '', i = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += text.replace(/f(?=[iflt])|t(?=t)/g, (m, k, t) => `<span data-lcs-fsep style="margin-right:${t[k + 1] === 'l' ? 0.035 : 0.07}em">${m}</span>`);
    i = j < 0 ? html.length : j;
  }
  return out;
}
/** typographic apostrophes and quotes (’ “ ”) in the TEXT of a page (never in a tag or an attribute) */
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
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} data-lcs-card style="position:relative;display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;box-sizing:border-box;${more}">${inner}</div>`;
/** on the key, a task whose answers are samples carries a badge on the top edge of its card (it takes no room, so the key
 *  is laid out exactly as the page) */
const badge = (text, show) => `<span ${show ? 'data-lcs-sample' : 'data-lcs-sampleroom'} style="float:right;margin:4px 0 2px 10px;box-sizing:border-box;height:14px;padding:0 7px;border:1px solid ${T.coral};border-radius:7px;background:#FFFFFF;white-space:nowrap;font:700 11px/12px 'Nunito',sans-serif;color:${T.coral};${show ? '' : 'visibility:hidden;'}">${text}</span>`;
/** the badge of a task whose key is a sample: on the key the words, on the child's page the same room left empty (in
 *  the task line, or in a small label of the card: data-lcs-badgerow) */
const sm = (key, text = SAMPLE_TEXT) => ({ key: !!key, text });
const label = (k, html, sample) => `<div data-lcs-label style="font:700 ${LABEL}px/1.3 'Nunito',sans-serif;color:${T.ink}">${sample ? badge(sample.text, sample.key) : ''}${k ? `<span style="color:${T.teal}">${k}.</span> ` : ''}${html}</div>`;
const small = (html, attrs = '') => `<div data-lcs-sublabel ${attrs} style="font:800 16px/1.15 'Nunito',sans-serif;color:${T.teal}">${html}</div>`;
const num = (k) => `<span data-lcs-num style="flex:0 0 auto;align-self:flex-start;min-width:24px;font:800 ${READ}px/1.35 'Nunito',sans-serif;color:${T.teal}">${k}.</span>`;
/** a single ruled line: a starter printed on it in ink, a source box at its start, the key's answer in teal */
function wline({ w, starter, answer, box, boxKey, grow = true, slot = false, attrs = '' }) {
  // slot: the place for a heading, drawn like the printed heading bar (a rounded teal frame) so it needs no label
  const rule = slot ? `border:2.5px solid ${T.teal};border-radius:8px;padding:0 8px 4px;` : `border-bottom:2px solid ${T.inkSoft};padding:0 2px 4px;`;
  return `<div data-lcs-line${slot ? ' data-lcs-slot' : ''}${answer ? ` data-lcs-answer="${A(answer)}"` : ''}${starter ? ` data-lcs-starter="${A(starter)}"` : ''}${box ? ` data-lcs-srcline="${boxKey || ''}"` : ''} ${attrs} style="box-sizing:border-box;${w ? `width:${w};` : 'width:100%;'}${grow ? `flex:1 0 ${ROW}px;min-height:${ROW}px;max-height:${ROWMAX}px;` : `flex:0 0 ${ROW}px;height:${ROW}px;`}${rule}display:flex;align-items:flex-end;gap:7px;overflow:hidden">` +
    (box ? `<span data-lcs-box style="flex:0 0 auto;width:26px;height:24px;box-sizing:border-box;border:2px solid ${T.ink};border-radius:6px;background:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;font:800 15px/1 'Nunito',sans-serif;color:${T.teal}">${boxKey && answer ? boxKey : ''}</span>` : '') +
    (starter ? `<span data-lcs-starttext data-lcs-read style="flex:0 0 auto;white-space:nowrap;font:700 ${READ}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(starter)}</span>` : '') +
    (answer ? `<span data-lcs-keytext style="flex:0 1 auto;min-width:0;white-space:nowrap;font:700 15px/1 'Nunito',sans-serif;color:${T.teal}">${esc(answer)}</span>` : '') + `</div>`;
}
/** the key of a sample spread over lines at the child's measure (letters a line from the line's width) */
function spread(text, perLine) {
  const out = []; let cur = '';
  for (const w of String(text).split(' ')) { if (cur && (cur + ' ' + w).length > perLine) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; }
  if (cur) out.push(cur);
  return out;
}
/** n lines for a written sample (sentences): the key spreads the sample at CHILD px a letter over a line `px` wide; the
 *  starters (one per line, or only the first) are printed and the sample of a line with a starter continues it */
/** the lines a sample sentence takes after its printed starter (a starter letter about 9.5 px; the rest at CHILD px) */
function sentLines(x, st, px) {
  const rest = st && x.startsWith(st) ? x.slice(st.length).trim() : x, first = Math.floor((px - 8 - (st ? st.length * 9.5 + 7 : 0)) / CHILD);
  const w = rest.split(' '), out = []; let cur = '', cap = first;
  for (const t of w) { if (cur && (cur + ' ' + t).length > cap) { out.push(cur); cur = t; cap = Math.floor((px - 8) / CHILD); } else cur = cur ? cur + ' ' + t : t; }
  if (cur) out.push(cur);
  return out.map((l, i) => (i === 0 && st && x.startsWith(st) ? st + ' ' + l : l));
}
function writeLines({ n, px, sample, key, starters = [], attrs = '', grow = true }) {
  let parts, sts = starters;
  if (starters.length > 1) {                                // one sentence a line, each after its starter; a long one wraps
    parts = []; sts = [];
    sample.forEach((x, j) => { const ls = sentLines(x, starters[j] || '', px); ls.forEach((l, i) => { parts.push(l); sts.push(i ? '' : starters[j] || ''); }); });
  } else parts = spread(sample.join ? sample.join(' ') : sample, Math.floor((px - 8) / CHILD));
  const lines = Array.from({ length: n }, (_, i) => {
    const st = sts[i] || '', p = parts[i] || '';
    const ans = key && p ? (st && p.startsWith(st) ? p.slice(st.length).trim() : p) : null;
    return wline({ starter: st || null, answer: ans, grow });
  }).join('');
  return `<div data-lcs-writes="${n}"${key ? ` data-lcs-expect="${A([].concat(sample).join(' '))}"` : ''} ${attrs} style="flex:1 1 auto;display:flex;flex-direction:column;gap:0">${lines}</div>`;
}
const opt = (text, ok, key, attr = '') => `<div data-lcs-opt="${A(text)}"${ok ? ' data-lcs-ok="1"' : ''} ${attr} style="min-width:0;box-sizing:border-box;font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:0 9px;border:2.5px solid ${key && ok ? T.teal : 'transparent'};border-radius:16px;background:#FFFFFF">${esc(text)}</div>`;
/** a lettered sentence or note to circle; the options of an item wrap in rows (a long one takes a row of its own) */
const letterOpt = (L, text, ok, key, kind) => `<div data-lcs-optrow data-lcs-kind="${kind}" style="display:flex;align-items:baseline;gap:3px;max-width:100%"><span data-lcs-letter style="flex:0 0 auto;font:800 ${READ}px/1.3 'Nunito',sans-serif;color:${T.teal}">${L}</span>${opt(text, ok, key)}</div>`;
const optRows = (opts, key, stack = false) => `<div data-lcs-opts style="display:flex;${stack ? 'flex-direction:column;align-items:flex-start;gap:3px' : 'flex-wrap:wrap;align-items:baseline;gap:2px 22px'};padding-left:14px">${opts.map((o, j) => letterOpt('abcd'[j] + '.', o.t, o.k === 'right', key, o.k)).join('')}</div>`;
const ruleBox = (title, rows, attrs = '') => `<div data-lcs-rulebox data-lcs-card ${attrs} style="display:flex;flex-direction:column;gap:2px;padding:${title ? 5 : 6}px 14px 7px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
  (title ? `<div data-lcs-boxtitle style="font:700 19px/1.15 'Baloo 2',cursive;color:${T.teal}">${esc(title)}</div>` : '') + rows.map((r) => `<div data-lcs-ruletext style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${r}</div>`).join('') + `</div>`;
const CHECK = `<svg data-lcs-check width="22" height="22" viewBox="0 0 20 20" style="display:block"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const tickBox = (k) => `<span data-lcs-tick="${k}" style="box-sizing:border-box;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF"></span>`;
/** a check list for the child: a box to tick for each line */
const checklist = (rows, cols, more = '') => `<div data-lcs-checklist data-lcs-card style="${more}display:grid;grid-template-columns:repeat(${cols},auto);justify-content:space-between;gap:4px 16px;padding:5px 14px 6px;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF">` +
  rows.map((r) => `<div data-lcs-checkrow style="display:flex;align-items:center;gap:7px;font:700 15px/1.15 'Nunito',sans-serif;color:${T.ink}"><span data-lcs-checkbox style="flex:0 0 auto;display:inline-block;width:18px;height:18px;box-sizing:border-box;border:2px solid ${T.ink};border-radius:4px;background:#FFFFFF"></span><span data-lcs-checktext>${esc(r)}</span></div>`).join('') + `</div>`;
/** a source text: its letter and title, the sentences as one paragraph; level 1 of the notes page bolds the key words */
function srcText(X, k, { bold = false, px = TEXT, grow = false, lh = 1.42 } = {}) {
  const S = X[k];
  const two = new Set([0, 1, 2].flatMap((h) => S.s.filter((x) => x.h === h && x.key).slice(0, 2).map((x) => x.t)));
  const body = S.s.map((x) => { if (!bold || !x.key || !two.has(x.t)) return esc(x.t); const at = x.t.indexOf(x.key); return esc(x.t.slice(0, at)) + `<b data-lcs-key="${A(x.key)}" data-lcs-h="${x.h}" style="font-weight:900">${esc(x.key)}</b>` + esc(x.t.slice(at + x.key.length)); }).join(' ');
  return `<div data-lcs-src="${k}" data-lcs-topic="${X.id}" data-lcs-words="${textWords(S)}" data-lcs-card style="${grow ? 'flex:1 1 0;' : ''}min-width:0;box-sizing:border-box;padding:4px 12px 6px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
    `<div data-lcs-srctitle style="font:700 18px/1.2 'Baloo 2',cursive;color:${T.teal}">Source ${k}: <span style="color:${T.ink}">${esc(S.title)}</span></div>` +
    `<div data-lcs-srctext style="font:700 ${px}px/${lh} 'Nunito',sans-serif;color:${T.ink}">${body}</div></div>`;
}
/** the box of good notes with its worked note (another topic) */
const notesRule = (ex, own, titled = true) => ruleBox(titled ? RULES.notes.title : null, [RULES.notes.rows.join(' ') + (own ? ' ' + RULES.notes.own : ''),
  `<span data-lcs-example="${A(ex.about)}">Example from a text about ${esc(ex.about)}: "${esc(ex.t)}" Note: <b>${esc(ex.note)}</b></span>`]);
const headBar = (h, attrs = '', more = '') => `<div data-lcs-headbar ${attrs} style="${more}box-sizing:border-box;padding:2px 10px;border-radius:8px;background:${T.teal};color:#FFFFFF;font:800 16px/1.3 'Nunito',sans-serif">${esc(h)}</div>`;
/** the head of a part: its heading (printed in a bar on level 1, a line to write it on otherwise) and, beside it, the
 *  notes the part is written from */
const HEADW = 232;       // a heading of 15 letters at a child's handwriting, inside the slot's frame
const headSlot = (head, key, attr = 'data-lcs-headline', w = HEADW) => `<div style="flex:0 0 auto;width:${w}px">${wline({ answer: key ? head : null, grow: false, slot: true, attrs: attr })}</div>`;
const partHead = (L, head, key, notesHtml) => `<div data-lcs-parthead style="display:flex;align-items:flex-end;gap:12px">` +
  (L === 1 ? headBar(head, 'data-lcs-printedhead', `flex:0 0 ${HEADW}px;`) : headSlot(head, key)) +
  `<div data-lcs-partnotes data-lcs-read style="flex:1 1 auto;min-width:0;padding-bottom:2px;font:700 16px/1.28 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">Notes:</b> ${notesHtml}</div></div>`;

/* ------------------------------------------------------------------ the blocks of each page */
function render(P, key) {
  const b = [];
  const half = Math.floor((W - 24 - 14) / 2);   // a half line inside a card
  if (P.mode === 'notepick') {
    b.push(notesRule(P.ex, true, false));
    const items = P.items.map((x, i) => `<div data-lcs-item data-lcs-pick="${A(x.t)}" data-lcs-note="${A(x.note)}" style="display:flex;gap:6px;padding:5px 10px 6px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:4px">` +
      `<div data-lcs-read data-lcs-picksent style="font:700 ${READ}px/1.35 'Nunito',sans-serif;color:${T.ink}"><i>"${esc(x.t)}"</i></div>` +
      optRows(x.opts, key) + `</div></div>`).join('');
    b.push(cream('data-lcs-task="pick"', label(1, LINES.pick.replace('{name}', esc(P.X.name))) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${items}</div>`, 8, 6, 'flex:1 1 auto'));
    if (P.write) b.push(cream('data-lcs-task="write"', label(2, LINES.write) + `<div data-lcs-item data-lcs-writeitem="${A(P.write.t)}" style="display:flex;flex-direction:column;gap:2px;padding:4px 10px 4px;border-radius:12px;background:#FFFFFF"><div data-lcs-read style="font:700 ${READ}px/1.35 'Nunito',sans-serif;color:${T.ink}"><i>"${esc(P.write.t)}"</i></div>` +
      `<div style="display:flex;align-items:flex-start;gap:12px"><div style="flex:0 0 ${half}px">${writeLines({ n: 2, px: half, sample: P.write.note, key })}</div><div data-lcs-badgerow style="flex:1 1 auto;min-width:0;padding-top:6px">${badge(SAMPLE_TEXT, key)}</div></div></div>`, 8, 4));
    // the notes to sort: numbered, three to a row (16 px, so a note of 20 letters stands on one line); the headings each with a line for the numbers
    const list = `<div data-lcs-sortlist style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr 1fr;align-content:space-evenly;gap:3px 16px;padding:4px 10px 5px;border-radius:12px;background:#FFFFFF">` +
      P.notes.map((x, i) => `<div data-lcs-item data-lcs-sortnote="${A(x.note)}" data-lcs-h="${x.h}" style="position:relative;display:flex;gap:6px;align-items:baseline">${num(i + 1)}<span data-lcs-read data-lcs-notetext style="position:relative;font:700 16px/1.35 'Nunito',sans-serif;color:${T.ink}">${esc(x.note)}${key && x.h === 3 ? `<span data-lcs-cross style="position:absolute;left:-3px;right:-3px;top:52%;height:3px;background:${T.teal}"></span>` : ''}</span></div>`).join('') + `</div>`;
    const cols = P.heads.map((h) => { const ns = P.notes.map((x, i) => (x.h === h ? i + 1 : 0)).filter(Boolean); return `<div data-lcs-sorthead="${h}" style="flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:2px;padding:4px 8px 6px;border-radius:12px;background:#FFFFFF">${headBar(P.Z.heads[h])}${wline({ answer: key ? ns.join(', ') : null, grow: false })}</div>`; }).join('');
    b.push(cream('data-lcs-task="sort"', label(P.write ? 3 : 2, `${LINES.sort[P.lv]} <span data-lcs-sorttopic style="color:${T.teal}">Notes about ${esc(P.Z.name)}</span>`) + list + `<div data-lcs-sortheads style="display:flex;gap:10px">${cols}</div>`, 8, 6, 'flex:1 1 auto'));
  }
  if (P.mode === 'notes') {
    b.push(P.lv > 1 ? notesRule(P.ex, true).replace(`>${RULES.notes.title}</div>`, `>${bothNote(key)}${RULES.notes.title}</div>`) : notesRule(P.ex, false));
    if (P.lv === 1) b.push(srcText(P.X, 'A', { bold: true }));
    else b.push(`<div data-lcs-srcpair style="display:flex;gap:10px">${srcText(P.X, 'A', { grow: true, px: 15.5, lh: 1.36 })}${srcText(P.X, 'B', { grow: true, px: 15.5, lh: 1.36 })}</div>`);
    const H = P.X.heads;
    let boxes;
    if (P.lv === 1) {
      boxes = `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px">` + P.heads.map((h) => `<div data-lcs-item data-lcs-notebox="${h}" style="flex:1 1 auto;display:flex;flex-direction:column;gap:2px;padding:4px 10px 4px;border-radius:12px;background:#FFFFFF">${headBar(H[h])}` +
        `<div data-lcs-writes="3" style="flex:1 1 auto;display:flex;flex-direction:column">${[0, 1, 2].map((i) => wline({ answer: key && P.keys[h][i] ? P.keys[h][i] : null })).join('')}</div></div>`).join('') + `</div>`;
    } else {
      const box = (h, head, notes, own) => `<div data-lcs-item data-lcs-notebox="${h}" style="min-width:0;display:flex;flex-direction:column;gap:2px;padding:4px ${P.lv === 3 ? 8 : 10}px 4px;border-radius:12px;background:#FFFFFF">` +
        (own ? `<div data-lcs-ownhead style="display:flex;flex-direction:column;gap:1px">${small('My own heading:')}${wline({ answer: key ? head : null, grow: false })}</div>` : headBar(head)) +
        `<div data-lcs-writes="${P.lv === 2 ? 4 : 3}" data-lcs-notelines style="flex:1 1 auto;display:${P.lv === 2 ? 'grid;grid-template-columns:1fr 1fr;column-gap:14px' : 'flex;flex-direction:column'}">` +
        Array.from({ length: P.lv === 2 ? 4 : 3 }, (_, i) => { const x = key ? notes[i] : null; return wline({ box: true, boxKey: x ? x.src : '', answer: x ? x.note : null }); }).join('') + `</div></div>`;
      if (P.lv === 2) boxes = `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px">${P.heads.map((h) => box(h, H[h], P.sample[h])).join('')}</div>`;
      else boxes = `<div style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:6px">${P.heads.map((h) => box(h, H[h], P.sample[h])).join('')}${box(3, P.X.extra, P.own, true)}</div>`;
    }
    b.push(cream('data-lcs-task="notes"', label(0, LINES.notes[P.lv], P.lv > 1 ? sm(key) : null) + boxes, 8, 6, 'flex:1 1 auto'));
  }
  if (P.mode === 'intro') {
    b.push(ruleBox(null, RULES.intro.rows));
    const items = P.items.map((it, i) => `<div data-lcs-item data-lcs-introitem="${it.X.id}" style="display:flex;gap:6px;padding:3px 10px 3px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:4px">` +
      `<div data-lcs-mininotes style="padding:2px 10px 3px;border:2px solid ${T.creamDeep};border-radius:10px"><div style="font:800 16px/1.25 'Nunito',sans-serif;color:${T.teal}">Notes about ${esc(it.X.name)}</div>` +
      it.notes.map((ns, h) => `<div data-lcs-miniline data-lcs-h="${h}" style="font:700 16px/1.2 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">${esc(it.X.heads[h])}:</b> ${ns.map(esc).join(' · ')}</div>`).join('') + `</div>` +
      optRows(it.opts, key, P.lv === 1) + `</div></div>`).join('');
    b.push(cream('data-lcs-task="introPick"', label(1, LINES.introPick) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:4px">${items}</div>`, 6, 4, 'flex:1 1 auto'));
    const allH = [...P.Z.heads, P.Z.extra];
    const chips = `<div data-lcs-chipbox style="display:flex;justify-content:space-around;gap:10px;padding:4px 10px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF">${P.chips.map((h) => `<span data-lcs-chip="${h}" style="font:800 ${READ + 1}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(allH[h])}</span>`).join('')}</div>`;
    // a row for each group: its number, the slot for its heading (as wide as the longest heading of the three at a child's
    // handwriting, so two notes stand side by side), its notes
    const gw = Math.min(HEADW, Math.ceil(Math.max(...P.Z.heads.map((h) => h.length)) * CHILD + 34));
    const groups = `<div data-lcs-groups style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:4px">${P.groups.map((g, gi) => `<div data-lcs-item data-lcs-group="${g.h}" style="display:flex;align-items:center;gap:10px;padding:3px 10px 4px;border-radius:12px;background:#FFFFFF">` +
      num(gi + 1).replace('align-self:flex-start;', 'align-self:center;') + headSlot(P.Z.heads[g.h], key, 'data-lcs-groupline', gw) +
      `<div data-lcs-groupnotes style="flex:1 1 auto;min-width:0;display:flex;flex-wrap:wrap;gap:0 18px">` +
      g.notes.map((x) => `<span data-lcs-groupnote="${A(x.note)}" data-lcs-h="${x.h}"${x.stray ? ' data-lcs-stray="1"' : ''} style="white-space:nowrap;font:700 16px/1.32 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal}">•</span> <span data-lcs-read style="position:relative">${esc(x.note)}${key && x.stray ? `<span data-lcs-cross style="position:absolute;left:-3px;right:-3px;top:52%;height:3px;background:${T.teal}"></span>` : ''}</span></span>`).join('') + `</div></div>`).join('')}</div>`;
    b.push(cream(`data-lcs-task="group" data-lcs-grouptopic="${P.Z.id}"`, label(2, LINES.group[P.lv].replace('{name}', `<b>${esc(P.Z.name)}</b>`)) + chips + groups, 6, 3, 'flex:1 1 auto'));
  }
  if (P.mode === 'plan') {
    const Y = P.Y, M = P.M;
    b.push(cream('data-lcs-task="plannotes"', `<div data-lcs-label style="font:800 ${LABEL}px/1.25 'Nunito',sans-serif;color:${T.teal}">Notes about ${esc(Y.name)}</div>` +
      `<div data-lcs-notelist style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px 14px">${P.notes.map((x, i) => `<div data-lcs-plannote="${A(x.note)}" data-lcs-h="${x.h}" style="display:flex;gap:5px;align-items:baseline">${num(i + 1).replace('min-width:24px', 'min-width:20px')}<span data-lcs-read style="font:700 16px/1.28 'Nunito',sans-serif;color:${T.ink}">${esc(x.note)}</span></div>`).join('')}</div>`, 5, 2));
    const mNotes = [...notesOf(M, P.mh, 'A'), ...notesOf(M, P.mh, 'B')].slice(0, 2).map((x) => x.note);
    b.push(`<div data-lcs-model="${M.id}" data-lcs-card style="padding:3px 14px 4px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF;font:700 15.5px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">A model plan about ${esc(M.name)}.</b> Introduction: <i>${esc(M.intro)}</i> Heading: <b>${esc(M.heads[P.mh])}</b>. Notes: <i>${mNotes.map(esc).join(', ')}</i></div>`);
    const L = P.lv;
    const introSt = L === 1 ? opener(Y.intro, 3) : L === 2 ? opener(Y.intro, 2) : '';
    const intro = `<div data-lcs-item data-lcs-part="intro" style="display:flex;flex-direction:column;gap:0;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF">${small('Introduction')}${writeLines({ n: 2, px: W - 24 - 20, sample: Y.intro, key, starters: introSt ? [introSt] : [] })}</div>`;
    const words = P.wordsBank.length ? ' ' + P.wordsBank.map((w) => `<b data-lcs-headword="${A(w)}">${esc(w)}</b>`).join(', ') + '.' : '';
    const groups = [0, 1, 2].map((h) => { const ns = P.notes.filter((x) => x.h === h).map((x) => x.note);
      return `<div data-lcs-item data-lcs-part="group" data-lcs-h="${h}" style="display:flex;flex-direction:column;gap:1px;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF">` +
        (L === 1 ? headBar(Y.heads[h], 'data-lcs-printedhead', `width:${HEADW}px;`) : headSlot(Y.heads[h], key)) +
        `<div data-lcs-writes="4" style="display:grid;grid-template-columns:1fr 1fr;column-gap:14px">${[0, 1, 2, 3].map((i) => wline({ answer: key && ns[i] ? ns[i] : null, grow: false })).join('')}</div></div>`; }).join('');
    // the picture box beside the check list; the caption line under them, full width (level 1: a frame, "This shows")
    const capSample = L === 1 ? 'This shows ' + Y.cap[0].toLowerCase() + Y.cap.slice(1) + '.' : Y.cap;
    const pic = `<div data-lcs-item data-lcs-part="picture" style="flex:1 1 auto;display:flex;flex-direction:column;gap:2px;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF">` +
      `<div style="flex:1 1 auto;display:flex;gap:12px;align-items:stretch"><div data-lcs-drawbox style="position:relative;flex:1 1 auto;min-height:74px;border:2.5px dashed ${T.teal};border-radius:12px;display:flex;align-items:center;justify-content:center"><span data-lcs-boxname style="position:absolute;top:4px;left:9px;right:9px;font:800 14px/1.15 'Nunito',sans-serif;color:${T.teal}">${LINES.planPic}</span>${key ? `<span data-lcs-vary style="font:700 14px/1.2 'Nunito',sans-serif;color:${T.coral}">(Pictures vary.)</span>` : ''}</div>` +
      checklist(CHECK_PLAN, 1, 'flex:0 0 auto;align-self:center;') + `</div>` +
      `${L > 1 ? small('Caption', 'data-lcs-caplabel') : ''}${writeLines({ n: 1, px: W - 24 - 20, sample: capSample, key, starters: L === 1 ? ['This shows'] : [], attrs: 'data-lcs-caption' })}</div>`;
    b.push(cream('data-lcs-task="plan"', label(0, LINES.planGroups[L] + words, sm(key)) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:5px">${intro}${groups}${pic}</div>`, 6, 4, 'flex:1 1 auto'));
  }
  if (P.mode === 'fdd') {
    const d = LEVELS.fdd[P.lv];
    b.push(ruleBox(null, RULES.fdd.rows));
    // (writing review 1119) the first sentence of each part is GIVEN as its fact (printed "Fact:", no boxes); every
    // sentence after it is a definition or a detail, so those are the two columns (every detail is a fact too: a Fact
    // column after the fact had two right answers)
    const kinds = [['Def', 'definition'], ['D', 'detail']];
    // level 1: each defined word is in bold where the paragraph first uses it (before its definition)
    const toBold = new Set(d.bold ? P.rows.filter((r) => r.k === 'Def').map((r) => r.w) : []);
    const showBold = (t) => { let h = esc(t); for (const w of [...toBold]) { const re = new RegExp('\\b(' + w + '(s|ed)?)\\b', 'i'); if (re.test(h)) { h = h.replace(re, `<b data-lcs-bold="${w}" style="font-weight:900">$1</b>`); toBold.delete(w); } } return h; };
    const asked = P.rows.filter((r) => r.k !== 'F');
    let table;
    if (d.table) {
      const colW = 92;
      const head = `<div data-lcs-thead style="display:flex;align-items:flex-end;padding:0 10px"><span style="flex:1 1 auto;font:800 16px/1.1 'Nunito',sans-serif;color:${T.teal}">${esc(P.X.dev.head)} (about ${esc(P.X.name)})</span>${kinds.map(([k, n]) => `<span data-lcs-col="${k}" style="flex:0 0 ${colW}px;text-align:center;font:800 15px/1.1 'Nunito',sans-serif;color:${T.teal}">${n}</span>`).join('')}</div>`;
      // a part: its fact, then its other sentences, in one white block; the parts apart from each other
      let i0 = 0;
      const partHtml = (gi, pi) => { const [fact, ...rows] = P.X.dev.g[gi].map((x) => ({ k: x[0], t: x[1] }));
        const out = `<div data-lcs-partblock="${pi + 1}" style="flex:${rows.length + 1} 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:1px;padding:2px 0;border-radius:10px;background:#FFFFFF">` +
          `<div data-lcs-item data-lcs-givenfact data-lcs-text="${A(fact.t)}" style="display:flex;align-items:center;padding:1px 10px"><span data-lcs-read data-lcs-ftext style="flex:1 1 auto;min-width:0;padding-right:8px;font:700 16px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="font-weight:800;color:${T.teal}">Fact:</b> ${showBold(fact.t)}</span></div>` +
          rows.map((r, j) => `<div data-lcs-item data-lcs-krow="${r.k}" data-lcs-text="${A(r.t)}" style="display:flex;align-items:center;padding:1px 10px">${num(i0 + j + 1)}<span data-lcs-read data-lcs-ktext style="flex:1 1 auto;min-width:0;padding-right:8px;font:700 16px/1.3 'Nunito',sans-serif;color:${T.ink}">${showBold(r.t)}</span>` +
            kinds.map(([k]) => `<span data-lcs-cell="${k}" style="flex:0 0 ${colW}px;display:flex;justify-content:center">${key && k === r.k ? tickBox(k).replace('></span>', '>' + CHECK + '</span>') : tickBox(k)}</span>`).join('') + `</div>`).join('') + `</div>`;
        i0 += rows.length; return out; };
      table = head + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:7px">` + P.gs.map(partHtml).join('') + `</div>`;
    } else {
      const para = `<div data-lcs-paragraph data-lcs-read style="padding:4px 12px 5px;border-radius:12px;background:#FFFFFF;font:700 ${READ}px/1.42 'Nunito',sans-serif;color:${T.ink}"><div style="font:800 16px/1.2 'Nunito',sans-serif;color:${T.teal}">${esc(P.X.dev.head)} (about ${esc(P.X.name)})</div>` +
        // a short paragraph for each part: its fact in bold (no number), then its other sentences (the numbers go on)
        (() => { let i0 = 0; return P.gs.map((gi, pi) => { const [fact, ...rows] = P.X.dev.g[gi]; const html = `<div data-lcs-partblock="${pi + 1}"><span data-lcs-psent data-lcs-givenfact data-lcs-text="${A(fact[1])}"><b style="font-weight:900">${esc(fact[1])}</b></span> ` + rows.map((x, j) => `<span data-lcs-psent data-lcs-krow="${x[0]}" data-lcs-text="${A(x[1])}"><sup data-lcs-snum style="font:800 13px/1 'Nunito',sans-serif;color:${T.teal}">${i0 + j + 1}</sup>${esc(x[1])}</span>`).join(' ') + `</div>`; i0 += rows.length; return html; }).join(''); })() + `</div>`;
      const n = asked.length, cw = Math.floor((W - 24 - 20 - 118) / n);
      const grid = `<div data-lcs-kgrid style="padding:4px 10px 6px;border-radius:12px;background:#FFFFFF"><div style="display:flex;align-items:flex-end"><span style="flex:0 0 118px;font:800 15px/1.1 'Nunito',sans-serif;color:${T.teal}">sentence</span>${asked.map((r, i) => `<span data-lcs-colnum="${i + 1}" style="flex:0 0 ${cw}px;text-align:center;font:800 16px/1.1 'Nunito',sans-serif;color:${T.teal}">${i + 1}</span>`).join('')}</div>` +
        kinds.map(([k, nm]) => `<div data-lcs-gridrow="${k}" style="display:flex;align-items:center;margin-top:3px"><span style="flex:0 0 118px;font:800 16px/1.1 'Nunito',sans-serif;color:${T.ink}">${nm}</span>${asked.map((r, i) => `<span data-lcs-gcell="${i + 1}" data-lcs-cell="${k}" style="flex:0 0 ${cw}px;display:flex;justify-content:center">${key && r.k === k ? tickBox(k).replace('></span>', '>' + CHECK + '</span>') : tickBox(k)}</span>`).join('')}</div>`).join('') + `</div>`;
      table = `<div data-lcs-item style="display:flex;flex-direction:column;gap:6px">${para}${grid}</div>`;
    }
    b.push(cream(`data-lcs-task="label" data-lcs-dgroups="${P.gs.join(',')}"`, label(1, LINES.label[P.lv]) + table, 8, 5, d.table ? 'flex:1 1 auto' : ''));
    const h = P.hard;
    const defSt = d.starters >= 1 ? defStarter(h.def) : '', detSt = d.starters >= 2 ? detStart(h.det) : '';
    const part = (name, sample, st) => `<div data-lcs-item data-lcs-addpart="${name}" style="flex:1 1 auto;display:flex;flex-direction:column;gap:1px;padding:3px 10px 3px;border-radius:12px;background:#FFFFFF"><div data-lcs-badgerow style="font:800 16px/1.15 'Nunito',sans-serif;color:${T.teal}">${name === 'def' ? badge(SAMPLE_TEXT, key) : ''}${name === 'def' ? 'Definition' : 'Detail'}</div>${writeLines({ n: 2, px: W - 24 - 20, sample, key, starters: st ? [st] : [] })}</div>`;
    b.push(cream('data-lcs-task="addto"', label(2, LINES.addTo) +
      `<div data-lcs-barefact="${A(h.fact)}" style="display:flex;flex-direction:column;gap:2px;padding:4px 12px 5px;border:2px solid ${T.creamDeep};border-radius:12px;background:#FFFFFF"><div data-lcs-read style="font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">Fact:</b> ${esc(h.fact)}</div>` +
      `<div data-lcs-read data-lcs-addnotes style="font:700 ${READ}px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">Notes:</b> ${esc(h.defNote)} · ${esc(h.detNote)}</div></div>` +
      part('def', h.def, defSt) + part('det', h.det, detSt), 8, 5, d.table ? '' : 'flex:1 1 auto'));
  }
  if (P.mode === 'develop') {
    const Y = P.Y, L = P.lv, H = Y.heads, full = W - 24 - 20;
    // what the child needs to start: the word to define with its meaning, the definition frame, a model part (another topic)
    b.push(`<div data-lcs-helpers data-lcs-card style="display:flex;flex-direction:column;gap:1px;padding:3px 14px 5px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF;font:700 15.5px/1.3 'Nunito',sans-serif;color:${T.ink}">` +
      `<div data-lcs-read data-lcs-hardword="${A(P.hard.word)}" style="font-size:16px"><b style="color:${T.teal}">Word to define:</b> ${esc(P.hard.defNote)}</div>` +
      `<div data-lcs-read style="font-size:16px"><b style="color:${T.teal}">Definition frames:</b> <span data-lcs-frame>${FRAMES[L].map((f) => `<span style="white-space:nowrap">${esc(f)}</span>`).join(` <span style="color:${T.teal}">·</span> `)}</span></div>` +
      (L < 3 ? `<div data-lcs-model="${P.M.id}"><b style="color:${T.teal}">A model part about ${esc(P.M.name)}:</b> <i>${P.model.map(esc).join(' ')}</i></div>` : '') +
      `<div data-lcs-read data-lcs-linking style="font-size:16px"><b style="color:${T.teal}">Linking words:</b> <span data-lcs-linkwords>${BANK.linking.map(esc).join(', ')}</span></div></div>`);
    const partHtml = (h) => {
      const s = P.parts[h], starters = L === 1 ? s.map((x, i) => (s.length === 3 && i === 1 ? defStarter(x) : opener(x, 3))) : L === 2 ? [opener(s[0], 2)] : [];
      // as many lines as the sample takes and one to spare (four or more for the part of the word, and on level 3)
      const need = L === 1 ? s.reduce((a, x, i) => a + sentLines(x, starters[i] || '', full).length, 0) : spread(s.join(' '), Math.floor((full - 8) / CHILD)).length;
      const nl = Math.max(L === 3 || s.length === 3 ? 4 : 3, need + 1);
      return `<div data-lcs-item data-lcs-part="part" data-lcs-h="${h}" style="display:flex;flex-direction:column;gap:0;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF">` +
        partHead(L, H[h], key, P.notes[h].map((n) => `<span data-lcs-pnote>${esc(n)}</span>`).join(' · ')) +
        writeLines({ n: nl, px: full, sample: L === 1 ? s : s.join(' '), key, starters }) + `</div>`; };
    const cNeed = spread(P.close, Math.floor((full - 8) / CHILD)).length;
    const conc = `<div data-lcs-item data-lcs-part="conclude" style="display:flex;flex-direction:column;gap:0;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF"><div data-lcs-badgerow style="font:800 13px/18px 'Nunito',sans-serif;color:${T.teal}">${badge(SAMPLE_TEXT, key)}${LINES.conclude}</div>${writeLines({ n: Math.max(2, cNeed + 1), px: full, sample: P.close, key, starters: L === 1 ? [opener(P.close, Y.close1 ? 2 : 3)] : [] })}</div>`;
    b.push(cream(`data-lcs-task="draft" data-lcs-drafttopic="${Y.id}"`, label(0, LINES.draft[L].replace('{name}', esc(Y.name))) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">${[0, 1, 2].map(partHtml).join('')}${conc}</div>`, 6, 4, 'flex:1 1 auto'));
    b.push(checklist(CHECK_DEVELOP[L], L === 3 ? 5 : 2));
  }
  if (P.mode === 'research') {
    const X = P.X, L = P.lv;
    b.push(cream('data-lcs-task="question"', (L < 3 ? `<div data-lcs-read data-lcs-question="${A(X.q)}" style="font:700 ${READ + 1}px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">${LINES.question}:</b> ${esc(X.q)}</div>`
      : `<div data-lcs-q3 style="display:flex;flex-direction:column;gap:0">${label(0, LINES.question3, sm(key, SAMPLE_Q))}${writeLines({ n: 1, px: W - 24, sample: X.q3, key, starters: [q3Start(X)] })}</div>`) +
      // a worked note of another topic (level 1): a few words that keep the key words, never the copied sentence
      (L > 1 ? '' : `<div data-lcs-example="${A(P.ex.about)}" style="font:700 15.5px/1.3 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">A good note:</b> "${esc(P.ex.t)}" → <b style="color:${T.teal}">${esc(P.ex.note)}</b></div>`), 6, 2));
    b.push(`<div data-lcs-srcpair style="display:flex;gap:10px">${srcText(X, 'A', { grow: true, px: 15.5, lh: 1.3 })}${srcText(X, 'B', { grow: true, px: 15.5, lh: 1.3 })}</div>`);
    const cell = Math.floor((W - 24 - 20 - 14) / 2);
    const head = `<div data-lcs-thead style="display:flex;gap:14px;padding:0 10px;font:800 16px/1.1 'Nunito',sans-serif;color:${T.teal}"><span style="flex:1 1 0">Notes from Source A</span><span style="flex:1 1 0">Notes from Source B</span></div>`;
    // a row for each category: its heading (printed on level 1, a heading slot to fill in on levels 2 and 3), then three
    // lines from each source
    const rows = [0, 1, 2].map((h) => `<div data-lcs-item data-lcs-orgrow="${h}" style="display:flex;flex-direction:column;gap:1px;padding:1px 10px 2px;border-radius:12px;background:#FFFFFF">` +
      `<div data-lcs-cat>${L === 1 ? headBar(X.heads[h], 'data-lcs-printedhead', `width:${HEADW}px;`) : headSlot(X.heads[h], key, 'data-lcs-catline')}</div>` +
      `<div style="display:flex;gap:14px">` + ['A', 'B'].map((s, k) => `<div data-lcs-orgcell="${s}" style="flex:1 1 0;min-width:0;display:flex;flex-direction:column"><div data-lcs-writes="${LEVELS.research[L].cell}" style="flex:1 1 auto;display:flex;flex-direction:column">${Array.from({ length: LEVELS.research[L].cell }, (_, i) => wline({ answer: key && P.cells[h][k][i] ? P.cells[h][k][i] : null })).join('')}</div></div>`).join('') + `</div></div>`).join('');
    b.push(cream('data-lcs-task="organize"', label(0, bothNote(key) + LINES.organize[L], sm(key)) + head + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:2px">${rows}</div>`, 6, 2, 'flex:1 1 auto'));
  }
  if (P.mode === 'report') {
    const X = P.X, L = P.lv, H = X.heads, full = W - 24 - 20, hw = Math.min(HEADW, Math.ceil(Math.max(...H.map((h) => h.length)) * CHILD + 34));
    // the room for writing comes first: a full-width introduction, three lines for each part, a concluding sentence
    // beside the diagram (2.3 by 1.3 inches or more) and its caption line, the sources; the check list in one row
    const top = `<div data-lcs-item data-lcs-part="top" style="display:flex;flex-direction:column;gap:0;padding:1px 10px 2px;border-radius:12px;background:#FFFFFF">` +
      `<div data-lcs-badgerow data-lcs-introlabel style="font:800 13px/18px 'Nunito',sans-serif;color:${T.teal}">${badge(SAMPLE_TEXT, key)}Introduction<span data-lcs-reportabout style="margin-left:16px;font:700 15px/18px 'Nunito',sans-serif;color:${T.ink}">Your topic: <b>${esc(X.name)}</b></span></div>${writeLines({ n: 2, px: full, sample: X.rIntro, key, starters: L === 1 ? [opener(X.rIntro, 2)] : [], attrs: 'data-lcs-introlines' })}</div>`;
    const part = (h) => { const s = X.rep[h], st = L === 1 ? [opener(s[0], 3)] : L === 2 ? [opener(s[0], 2)] : [];
      const ns = L === 3 ? '' : P.notes[h].map((x) => `<span data-lcs-pnote="${x.src}">${esc(x.note)} (${x.src})</span>`).join(' · ');
      const hd = L === 3 ? `<div data-lcs-parthead style="display:flex">${headSlot(H[h], key)}</div>`
        : `<div data-lcs-parthead style="display:flex;align-items:flex-end;gap:12px">${L === 1 ? headBar(H[h], 'data-lcs-printedhead', 'flex:0 0 auto;') : headSlot(H[h], key, 'data-lcs-headline', hw)}<div data-lcs-partnotes data-lcs-read style="flex:1 1 auto;min-width:0;padding-bottom:2px;font:700 16px/1.28 'Nunito',sans-serif;color:${T.ink}">${L === 1 ? `<b style="color:${T.teal}">Notes:</b> ` : ''}${ns}</div></div>`;
      return `<div data-lcs-item data-lcs-part="part" data-lcs-h="${h}" style="display:flex;flex-direction:column;gap:0;padding:1px 10px 2px;border-radius:12px;background:#FFFFFF">${hd}` +
        writeLines({ n: 3, px: full, sample: s.join(' '), key, starters: st }) + `</div>`; };
    // the concluding sentence (level 1: "Now you know that") beside the diagram, on as many lines as it takes and one more
    const lw = full - 224 - 12, cSample = L === 1 ? 'Now you know that ' + X.close[0].toLowerCase() + X.close.slice(1) : X.close;
    const cst = L === 1 ? ['Now you know that'] : [], cNeed = spread(cSample, Math.floor((lw - 20 - 8) / CHILD)).length;
    const conc = `<div data-lcs-item data-lcs-part="conclude" style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:0;padding:1px 10px 2px;border-radius:12px;background:#FFFFFF">${small('Concluding sentence')}${writeLines({ n: Math.max(3, cNeed + 1), px: lw - 20, sample: L === 1 ? [cSample] : cSample, key, starters: cst })}</div>`;
    const diagram = `<div data-lcs-diagram style="flex:0 0 224px;display:flex;flex-direction:column;gap:2px">` +
      `<div data-lcs-drawbox style="position:relative;box-sizing:border-box;flex:1 0 126px;border:2.5px dashed ${T.teal};border-radius:12px;display:flex;align-items:center;justify-content:center;background:#FFFFFF"><span data-lcs-boxname style="position:absolute;top:4px;left:9px;font:800 13px/1.1 'Nunito',sans-serif;color:${T.teal}">Diagram: a drawing with labels</span>${key ? `<span data-lcs-vary style="font:700 14px/1.2 'Nunito',sans-serif;color:${T.coral}">(Diagrams vary.)</span>` : ''}</div>` +
      `<div data-lcs-caption style="padding:0 6px;border-radius:10px;background:#FFFFFF">${wline({ starter: 'Caption:', grow: false })}</div></div>`;
    const sources = `<div data-lcs-item data-lcs-part="sources" style="display:flex;flex-direction:column;gap:0;padding:1px 10px 2px;border-radius:12px;background:#FFFFFF">${small(`My sources: <span data-lcs-sources style="color:${T.ink}">A. ${esc(X.A.title)} · B. ${esc(X.B.title)}</span>`)}<div style="display:flex;gap:14px">${['A', 'B'].map((s) => `<div style="flex:1 1 0;min-width:0">${wline({ starter: s + '.', answer: key ? X[s].title : null })}</div>`).join('')}</div></div>`;
    const bottom = `<div data-lcs-item data-lcs-bottom style="display:flex;gap:12px;align-items:stretch">${conc}${diagram}</div>`;
    b.push(cream(`data-lcs-task="report" data-lcs-reporttopic="${X.id}"`, label(0, LINES.reportTask[L]) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:2px">${top}${[0, 1, 2].map(part).join('')}${bottom}${sources}</div>`, 5, 2, 'flex:1 1 auto'));
    b.push(checklist(CHECK_REPORT, 5));
  }
  return b;
}

/* ------------------------------------------------------------------ verify()'s own copy of the ruled texts and measures */
const SPEC = {
  INSTR: {
    notepick: { 1: 'A good note is a few words that tell one fact.', 2: 'Good notes are short. They keep the key words of one fact.', 3: 'Good notes are short, true to the text, and keep the key words.' },
    notes: { 1: 'Key words from a text make good notes.', 2: 'Take short notes. Write which source each note is from.', 3: 'Sort your notes under headings. Add a heading of your own.' },
    intro: { 1: 'An introduction tells what the whole piece is about.', 2: 'An introduction names the topic. Headings name groups of facts.', 3: 'Facts that go together belong under one heading.' },
    plan: { 1: 'Plan your writing: an introduction, groups of facts, and a picture.', 2: 'Plan an introduction, three groups of facts with headings, and a picture.', 3: 'Plan your piece. Group the facts and give each group a heading.' },
    fdd: { 1: 'Facts, definitions, and details each do a different job.', 2: 'A definition tells what a word means. A detail tells more about a fact.', 3: 'Writers build each part with facts, definitions, and details.' },
    develop: { 1: 'Write each part with facts. Define a hard word.', 2: 'Use facts and linking words in each part. Define one hard word.', 3: 'Develop your topic with facts, definitions, and details.' },
    research: { 1: 'Researchers take notes from more than one source.', 2: 'Take notes from both sources to answer the research question.', 3: 'Write your own research question. Then take notes from both sources.' },
    report: { 1: 'A research report answers a question with facts from sources.', 2: 'Write an introduction, three parts with headings, and a concluding sentence.', 3: 'Write your report from your own notes and list your sources.' },
  },
  NOTES_RULE: 'A note is a few words about one fact. Do not copy whole sentences.', OWN: 'Keep the key words; say the rest your own way.',
  INTRO_RULE: ['An introduction tells what the whole piece is about.', 'A heading names a group of facts that go together.'],
  FDD_RULE: ['A fact tells one main thing about the topic. Each part starts with a fact.', 'A definition tells what a word means.', 'A detail tells more about the fact in its part, such as an example, a number, or what something looks like.'],
  CHECK: { plan: ['My introduction names my topic.', 'I grouped facts under headings.', 'I added a picture with a caption.'], develop: { 1: ['Each part has facts.', 'I defined a hard word.', 'I used linking words.', 'I wrote a concluding sentence.'], 2: ['Each part has facts.', 'I defined a hard word.', 'I used linking words.', 'I wrote a concluding sentence.'], 3: ['Facts', 'Definition', 'Detail', 'Linking words', 'Concluding sentence'] }, report: ['Introduction', 'Three parts', 'Concluding sentence', 'Diagram', 'Sources'] },
  FRAME: { 1: 'A ___ is a ___ that ___. · ___ is ___. · To ___ means ___.', 2: 'A ___ is a ___ that ___. · ___ is ___. · To ___ means ___.', 3: 'A ___ is a ___ that ___. · ___ is ___. · To ___ means ___. · ___, or ___,' }, LINKING: 'also, another, more, but, for example, and', SAMPLE: 'Sample answers. Others can be right too.',
  BOTH: 'If both sources give a fact, either letter is right.', SAMPLEQ: 'Sample question. Others are right if the sources answer them.',
  COUNTS: { notepick: { 1: [3, 2, 6, 0], 2: [3, 3, 9, 0], 3: [2, 3, 10, 1] }, intro: { 1: [3, 3, 0, 3], 2: [4, 4, 0, 2], 3: [4, 4, 1, 2] } },
  // the task line of every card, per level ({name} = the topic of the card); a line may go on after it (a topic, words)
  TASKS: {
    pick: 'Read each sentence from a text about {name}. Circle the best note.', write: 'Write a short note for this sentence. Keep the key words.',
    sort: { 1: 'Write the number of each note under its heading.', 2: 'Write the number of each note under its heading.', 3: 'Write the number of each note under its heading. One note fits none of the headings: cross it out.' },
    notes: { 1: 'Copy each group of words in bold under the heading it fits.', 2: 'Write two or more notes under each heading. In the box, write A or B for the source.', 3: 'Write notes under each heading and the letter of the source. Name a fourth heading and write notes for it.' },
    introPick: 'Read the notes. Circle the sentence that introduces the topic best.',
    group: { 1: 'Notes about {name}: write the heading of each group. Use the box.', 2: 'Notes about {name}: write the heading of each group. One heading in the box is left over.', 3: 'Notes about {name}: write the heading of each group. One heading is left over. One note is in the wrong group: cross it out.' },
    plan: { 1: 'Write an introduction and the notes that go under each heading.', 2: 'Write an introduction, a heading for each group, and its notes. Headings:', 3: 'Write an introduction, a heading for each group, and its notes. Pick three:' },
    label: { 1: 'Read the paragraph. Each part starts with a fact. Is each sentence after it a definition or a detail? Put a check mark.', 2: 'Read the paragraph. Each part starts with a fact. Is each sentence after it a definition or a detail? Put a check mark.', 3: 'Read the paragraph. Each part starts with a fact in bold. Under each sentence number, put a check mark in the row of its job.' },
    addto: 'Add a definition and a detail to this fact. Use the notes.',
    draft: { 1: 'Write about {name}. Define the word in one part.', 2: 'Write about {name}. Write each heading. Define the word in one part.', 3: 'Write about {name}. Write each heading. Define the word in one part.' },
    organize: { 1: 'Take notes from each source. Write each note in the row of its category.', 2: 'Name each category. It will be a heading in your report. Take notes in its row.', 3: 'Name each category. It will be a heading in your report. Take notes in its row.' },
    report: { 1: 'Write your report from the notes. Draw a diagram with a caption.', 2: 'Write your report. Add a note of your own to each part.', 3: 'Use your notes from Notes from Two Sources to write your report.' },
    question3: 'Write a question both sources can help you answer.',
  },
  ROW: 34, CHILD: 13.5, GAP: 40, READ: 17, TEXT: 15.5, LABEL: 16, RULE: 15, NOTE_MAX: 20, PICKMAX: 58,
};

function makeInformativeWritingG3Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('informative-writing-g3: unknown mode ' + mode);
  const topics = Object.fromEntries(BANK.topics.map((X) => [X.id, X]));
  const INFO = { mode, LEVELS: D, SPEC, topics, models: Object.fromEntries(BANK.models.map((X) => [X.id, X])), examples: BANK.examples };
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // the unit check (Part 7.6): the day-1 pages' tasks made small, one card a task (iw3CheckPage below); the pages the child
    // writes from notes give the check its writing task (iw3CheckWrite)
    ...(['notepick', 'intro', 'fdd'].includes(mode) ? { checkPage(args, ctx) { return iw3CheckPage(mode, args, ctx); } } : {}),
    ...(['plan', 'develop', 'report'].includes(mode) ? { checkWrite(args, ctx) { return iw3CheckWrite(mode, args, ctx); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the texts are English texts (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const P = plan(BANK, mode, lv, rng, Number(ctx && ctx.variant) || 0);
      const blocks = render(P, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-g3iw="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + fRoom(typo(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + P.list.slice(0, 2).join(','), items: P.list },
      };
    },

    async verify(page) {
      return page.evaluate((I) => {
        const fails = [];
        const S = I.SPEC, TP = I.topics, MO = I.models;   // MO: the model topics of the day-1 pages (never a prompt)
        const root = document.querySelector('[data-lcs-g3iw]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsG3iw.split('|'), lv = +lvS, d = I.LEVELS[lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect(), cs = (e) => getComputedStyle(e), fs = (e) => parseFloat(cs(e).fontSize);
        const straight = (s) => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
        const txt = (e) => (e ? straight(e.textContent).replace(/\s+/g, ' ').trim() : '');
        const TEAL = 'rgb(20, 107, 94)';
        const rb = R(root);
        const notesOf = (X, h, src) => [...X.A.s.map((x) => ({ ...x, src: 'A' })), ...X.B.s.map((x) => ({ ...x, src: 'B' }))].filter((x) => x.h === h && x.note && (!src || x.src === src));
        // the check's own copy of the starter rules: n words (one more after The, A, An, Most, Many, Some, Each); a
        // detail starts up to a comma in its first four words, or with its first word
        const opener = (s, n) => { const w = String(s).split(' '); return w.slice(0, /^(The|A|An|Most|Many|Some|Each)$/.test(w[0]) ? n + 1 : n).join(' '); };
        const detStart = (s) => { const m = String(s).match(/^((?:\S+ ){0,3}\S+,)/); return m ? m[1] : String(s).split(' ')[0]; };
        const lc = (s) => String(s).toLowerCase();
        // a note's homes: the headings whose key words it names (the check's own copy of the rule: a plural s dropped)
        const tok = (s) => lc(s).match(/[a-z]+(?:'[a-z]+)?/g) || [], stemW = (w) => (w.length > 3 && /s$/.test(w) && !/ss$/.test(w) ? w.slice(0, -1) : w);
        const homes = (X, p) => (X.hk || []).map((ks, j) => (tok(p).some((w) => ks.some((k) => stemW(w) === stemW(k))) ? j : -1)).filter((j) => j >= 0);
        // a task line without its sample note
        const labelText = (lb) => { const c = lb.cloneNode(true); c.querySelectorAll('[data-lcs-sample], [data-lcs-sampleroom], [data-lcs-both], [data-lcs-bothroom]').forEach((e) => e.remove()); return txt(c); };
        const lineText = (ls) => ls.map((l) => [l.dataset.lcsStarter, l.dataset.lcsAnswer].filter(Boolean).join(' ')).filter(Boolean).join(' ');
        // letters: ligatures off everywhere, an f before i, f, l, t and a t before t with room of its own
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        // every element that holds text (fRoom splits each f before i, f, l, t into a span, so no text node holds "fi")
        if ([...root.querySelectorAll('*')].some((e) => [...e.childNodes].some((n) => n.nodeType === 3 && /\S/.test(n.nodeValue)) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, or ff may join its letters: the ligatures are on');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('style') && /f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        // the instruction of this level (the check's own copy)
        const ins = document.querySelector('[data-lcs-instruction]');
        if (!ins) fails.push('no instruction at the top of the page'); else if (txt(ins) !== S.INSTR[mode][lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(ins)}"`);
        // typographic apostrophes and quotes only
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n, bad = ''; while ((n = tw.nextNode())) if (!n.parentElement.closest('style') && /['"]/.test(n.nodeValue)) { bad = n.nodeValue.trim().slice(0, 30); break; }
          if (!bad && ins && /['"]/.test(ins.textContent)) bad = ins.textContent.trim().slice(0, 30);
          if (bad) fails.push('a straight apostrophe or quotation mark is printed: ' + bad); }
        if (root.querySelector('img')) fails.push('a picture on a page of printed texts');
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        root.querySelectorAll('[data-lcs-card]').forEach((c) => { const q = R(c); c.querySelectorAll('span, div, b, i, svg').forEach((e) => { if (e.dataset && e.dataset.lcsCross !== undefined) return; const r = R(e); if (r.width && (r.bottom > q.bottom + 0.5 || r.right > q.right + 0.5 || r.left < q.left - 0.5 || r.top < q.top - 0.5)) fails.push('something leaves its card (' + (c.dataset.lcsTask || Object.keys(c.dataset)[0]) + ')'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        // sizes
        root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < S.READ - 1.01) fails.push(`text a third grader reads is ${fs(e)} px (16 or more)`); });
        root.querySelectorAll('[data-lcs-srctext]').forEach((e) => { if (fs(e) < S.TEXT) fails.push(`a source text printed at ${fs(e)} px (15.5 or more)`); });
        root.querySelectorAll('[data-lcs-opt]').forEach((e) => { if (fs(e) < S.READ) fails.push('a sentence or a note to circle is smaller than 17 px'); });
        root.querySelectorAll('[data-lcs-ruletext]').forEach((e) => { if (fs(e) < S.RULE) fails.push('a rule box printed smaller than 15 px'); });
        root.querySelectorAll('[data-lcs-label]').forEach((e) => { if (fs(e) < S.LABEL) fails.push('a task line smaller than 16 px'); });
        // writing lines: 34 px or more, the key's text fits its line at a third grader's handwriting (CHILD px a letter)
        const lines = [...root.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const h = R(l).height, w = R(l).width;
          if (h < S.ROW - 0.5) fails.push(`a writing line ${h.toFixed(1)} px high (34 or more)`);
          const k = l.querySelector('[data-lcs-keytext]');
          if (!isKey && (l.dataset.lcsAnswer !== undefined || k)) fails.push('a line is filled on the page of the child');
          if (k) { if (k.scrollWidth > k.clientWidth + 1 || R(k).right > R(l).right + 0.5) fails.push('a key answer does not fit its line');
            const st = l.querySelector('[data-lcs-starttext]'), bx = l.querySelector('[data-lcs-box]');
            // the room inside the line: less its padding and frame (a heading slot has both)
            const pad = parseFloat(cs(l).paddingLeft) + parseFloat(cs(l).paddingRight) + parseFloat(cs(l).borderLeftWidth) + parseFloat(cs(l).borderRightWidth);
            const need = txt(k).length * S.CHILD + (st ? R(st).width + 7 : 0) + (bx ? R(bx).width + 7 : 0) + pad;
            if (need > w + 0.5) fails.push(`the key's "${txt(k)}" (${txt(k).length} letters) does not fit its ${Math.round(w)} px line at a child's handwriting`); }
          const bx = l.querySelector('[data-lcs-box]'); if (bx && isKey && l.dataset.lcsAnswer && !['A', 'B'].includes(txt(bx))) fails.push('a source box of the key holds no source letter'); });
        // every group of lines for a sample keeps one line to spare
        root.querySelectorAll('[data-lcs-writes]').forEach((g) => { const ls = [...g.querySelectorAll('[data-lcs-line]')], n = +g.dataset.lcsWrites, filled = ls.filter((l) => l.dataset.lcsAnswer).length;
          if (ls.length !== n) fails.push(`a group of ${ls.length} lines is filed as ${n}`);
          if (isKey && n >= 2 && filled > n - 1) fails.push(`a sample fills all ${n} lines of its task (one line to spare)`); });
        // the key of open writing says it is a sample, inside the task line of its card, covering none of its words; the
        // page of the child says nothing of it and keeps its room (so the two pages are laid out alike)
        { const sm = [...root.querySelectorAll('[data-lcs-sample]')], rm = [...root.querySelectorAll('[data-lcs-sampleroom]')];
          if (!isKey && sm.length) fails.push('the page of the child says "sample"');
          if (isKey && rm.length) fails.push('the key leaves a sample note out');
          sm.forEach((e) => { if (![S.SAMPLE, S.SAMPLEQ].includes(txt(e))) fails.push('the sample note is not the one of the key: "' + txt(e) + '"'); if (fs(e) < 11) fails.push('the sample note is smaller than 11 px'); });
          [...sm, ...rm].forEach((e) => { const lb = e.closest('[data-lcs-label], [data-lcs-badgerow]'), c = e.closest('[data-lcs-card]'), q = R(e);
            if (!lb || !c) { fails.push('the sample note does not stand in the task line of its card'); return; }
            const cr = R(c); if (q.right > cr.right - 4 || q.top < cr.top || q.bottom > cr.bottom) fails.push('the sample note leaves its card');
            const tw = document.createTreeWalker(lb, NodeFilter.SHOW_TEXT); let n;
            while ((n = tw.nextNode())) { if (e.contains(n) || !/\S/.test(n.nodeValue)) continue; const rg = document.createRange(); rg.selectNodeContents(n);
              if ([...rg.getClientRects()].some((r) => r.width && r.left < q.right - 0.5 && r.right > q.left + 0.5 && r.top < q.bottom - 0.5 && r.bottom > q.top + 0.5)) { fails.push('the sample note covers words of the task line'); break; } } }); }
        const cards = (sel) => [...root.querySelectorAll(sel)];
        // the task line of every card is the one of its level (the check's own copy); a topic or words may follow it
        root.querySelectorAll('[data-lcs-task]').forEach((c) => { const want = S.TASKS[c.dataset.lcsTask], lb = c.querySelector(':scope > [data-lcs-label]');
          if (want === undefined || !lb) return;
          const w = typeof want === 'string' ? want : want[lv], got = labelText(lb).replace(/^\d+\.\s*/, '');
          const re = new RegExp('^' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('\\{name\\}', '[a-zA-Z ]+'));
          if (!re.test(got)) fails.push(`the task line of "${c.dataset.lcsTask}" is not the one of level ${lv}: "${got.slice(0, 60)}"`); });
        // the cards that must have a task line have one
        ['pick', 'sort', 'notes', 'introPick', 'group', 'plan', 'label', 'addto', 'draft', 'organize', 'report'].forEach((t) => { const c = root.querySelector(`[data-lcs-task="${t}"]`); if (c && !c.querySelector(':scope > [data-lcs-label]')) fails.push(`the task "${t}" has no task line`); });
        const wantSample = (sel) => { const c = root.querySelector(sel); if (!c) { fails.push('no task ' + sel); return; } const has = !!c.querySelector('[data-lcs-sample]'), room = !!c.querySelector('[data-lcs-sampleroom]');
          if (isKey ? !has : has || !room) fails.push(`the task ${sel} ${isKey ? 'does not say' : 'says, or leaves no room to say,'} that its key is a sample`); };
        // the key says either letter is right when both sources give a fact; the child's page keeps the room
        const bothOk = () => { const bn = root.querySelector('[data-lcs-both]'), br = root.querySelector('[data-lcs-bothroom]'); if (isKey ? !bn || txt(bn) !== S.BOTH || br : !!bn || !br) fails.push('the key does not say that either letter is right when both sources give a fact (or the page of the child does)'); };
        // the patterns a column of answers may not show
        const patternOf = (o) => { const n = o.length;
          for (const par of [0, 1]) { const sub = o.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
          const runs = []; o.forEach((x, i) => { if (i && x === o[i - 1]) runs[runs.length - 1]++; else runs.push(1); });
          if (runs.length >= 3 && runs[0] >= 2 && runs.slice(0, -1).every((r) => r === runs[0])) return 'runs of one length';
          for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (o[i + k] !== o[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
          return ''; };
        const orderBad = (o) => { if (o.some((x, i) => i >= 2 && x === o[i - 1] && x === o[i - 2])) return 'three alike in a row'; const ks = [...new Set(o)];
          if (ks.length === 2 && o.length >= 4 && o.every((x, i) => !i || x !== o[i - 1])) return 'every other one'; if (ks.length === 2 && /(ab){3}|(ba){3}/.test(o.map((x) => (x === ks[0] ? 'a' : 'b')).join(''))) return 'six alternating';
          if (ks.length >= 3 && o.length > ks.length && o.every((x, i) => i < ks.length || x === o[i - ks.length])) return 'a repeating cycle';
          for (let p = 2; p <= 4; p++) if (o.length >= 2 * p + 2 && o.filter((x, i) => i >= p && x === o[i - p]).length >= o.length - p - 1) return 'a rhythm that repeats every ' + p; return patternOf(o); };
        const placesBad = (p, m) => { const n = p.length, count = (v) => p.filter((x) => x === v).length;
          if (n >= m && new Set(p).size < m) return 'not every place is used'; if (n >= 2 && new Set(p).size === 1) return 'one place for every item';
          if (n >= 4 && Math.max(...Array.from({ length: m }, (_, v) => count(v))) > Math.ceil(n / 2)) return 'one place holds too many';
          if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return 'three in a row in one place';
          if (m >= 3 && p.some((x, i) => i >= 2 && ((p[i - 1] === p[i - 2] + 1 && x === p[i - 1] + 1) || (p[i - 1] === p[i - 2] - 1 && x === p[i - 1] - 1)))) return 'a staircase';
          return patternOf(p); };
        const rings = (scope) => scope.querySelectorAll('[data-lcs-opt]').forEach((o) => { const ringed = cs(o).borderTopColor === TEAL; if (isKey ? ringed !== !!o.dataset.lcsOk : ringed) fails.push('an answer is ringed on the page of the child, or the key rings the wrong one'); });
        const ruleText = () => [...root.querySelectorAll('[data-lcs-ruletext]')].map(txt);
        const exampleOk = (topicIds) => { const ex = root.querySelector('[data-lcs-example]'), e = ex && I.examples.find((x) => x.about === ex.dataset.lcsExample);
          if (!e || txt(ex) !== `Example from a text about ${e.about}: "${e.t}" Note: ${e.note}`) fails.push('the box has no worked note');
          else if (topicIds.some((id) => (TP[id] || MO[id]) && (TP[id] || MO[id]).name.split(' ').some((w) => e.about.includes(w)))) fails.push('the worked note is about the topic of the page'); };

        if (mode === 'notepick') {
          const [nPick, nHeads, nNotes, nNone] = S.COUNTS.notepick[lv];
          const rt = ruleText(); if (rt[0] !== S.NOTES_RULE + ' ' + S.OWN) fails.push('the box does not say what a good note is');
          const items = cards('[data-lcs-pick]'); if (items.length !== nPick) fails.push(`${items.length} sentences to choose a note for, not ${nPick}`);
          const sortTopic = root.querySelector('[data-lcs-sorttopic]'), Zname = sortTopic ? txt(sortTopic).replace(/^Notes about /, '') : '';
          const Z = Object.values(MO).find((X) => X.name === Zname);
          let X = null;
          items.forEach((it, i) => { const t = it.dataset.lcsPick; const s = Object.values(MO).flatMap((x) => [...x.A.s, ...x.B.s].map((y) => ({ ...y, X: x }))).find((y) => y.t === t);
            if (!s || !s.wrong) { fails.push(`sentence ${i + 1} is no sentence of a model topic with a wrong note (a day-1 page never prints a topic the children write about)`); return; }
            if (t.length > S.PICKMAX) fails.push(`sentence ${i + 1} is longer than ${S.PICKMAX} letters (it and its copied choice must stand on one line)`);
            X = s.X;
            if (txt(it.querySelector('[data-lcs-picksent]')) !== '"' + t + '"') fails.push(`sentence ${i + 1} is not printed as the bank has it`);
            const os = [...it.querySelectorAll('[data-lcs-optrow]')], texts = os.map((o) => txt(o.querySelector('[data-lcs-opt]')));
            if (os.length !== 3 || [...os].map((o) => txt(o.querySelector('[data-lcs-letter]'))).join('') !== 'a.b.c.') fails.push(`sentence ${i + 1} has not three notes a, b, c`);
            if (texts.slice().sort().join('|') !== [s.note, t, s.wrong].sort().join('|')) fails.push(`sentence ${i + 1}: the notes are not its note, the sentence copied, and its wrong note`);
            const ok = os.filter((o) => o.querySelector('[data-lcs-ok]'));
            if (ok.length !== 1 || txt(ok[0].querySelector('[data-lcs-opt]')) !== s.note) fails.push(`sentence ${i + 1} is not keyed to its note "${s.note}"`); });
          rings(root);
          { const p = items.map((it) => [...it.querySelectorAll('[data-lcs-optrow]')].findIndex((o) => o.querySelector('[data-lcs-ok]'))); const bad = placesBad(p, 3); if (bad) fails.push(`the right notes: ${bad} (${p.join('')})`); }
          // length must not tell: the right note is not the shortest on every item
          if (items.length >= 2 && items.every((it) => { const os = [...it.querySelectorAll('[data-lcs-opt]')], r = os.find((o) => o.dataset.lcsOk); return r && os.every((o) => o === r || txt(o).length > txt(r).length); })) fails.push('the right note is the shortest on every item');
          const wi = root.querySelector('[data-lcs-writeitem]');
          if (!!wi !== (nNone === 1)) fails.push('a sentence to write a note for belongs to level 3 only');
          if (wi) { const s = X && [...X.A.s, ...X.B.s].find((y) => y.t === wi.dataset.lcsWriteitem); if (!s || !s.note) fails.push('the sentence to write a note for is no sentence of the topic');
            else { if (items.some((it) => it.dataset.lcsPick === s.t)) fails.push('the sentence to write a note for is also a sentence to choose for');
              const ls = [...wi.querySelectorAll('[data-lcs-line]')]; if (ls.length !== 2) fails.push('the note to write has not two lines');
              if (isKey && (ls[0].dataset.lcsAnswer !== s.note || ls[1].dataset.lcsAnswer)) fails.push('the key of the note to write is not its sample note'); }
            wantSample('[data-lcs-task="write"]'); }
          // the sort
          if (!Z) fails.push('the notes to sort name no model topic (a day-1 page never prints a topic the children write about)');
          else {
            if (X && X.id === Z.id) fails.push('the notes to sort are of the topic of the sentences');
            const ns = cards('[data-lcs-sortnote]'), hs = cards('[data-lcs-sorthead]');
            if (ns.length !== nNotes || hs.length !== nHeads) fails.push(`${ns.length} notes under ${hs.length} headings, not ${nNotes} under ${nHeads}`);
            const heads = hs.map((e) => +e.dataset.lcsSorthead);
            hs.forEach((e) => { if (txt(e.querySelector('[data-lcs-headbar]')) !== Z.heads[+e.dataset.lcsSorthead]) fails.push('a heading bar is not a heading of the topic'); });
            const hOf = ns.map((e) => { const all = [0, 1, 2, 3].filter((h) => notesOf(Z, h).some((x) => x.note === e.dataset.lcsSortnote)); return all.length === 1 ? all[0] : -1; });
            ns.forEach((e, i) => { if (hOf[i] < 0 || hOf[i] !== +e.dataset.lcsH) fails.push(`note ${i + 1} is no note of one heading of the topic`); if (txt(e.querySelector('[data-lcs-notetext]')) !== e.dataset.lcsSortnote) fails.push(`note ${i + 1} is not printed as the bank has it`); });
            heads.forEach((h) => { if (hOf.filter((x) => x === h).length !== 3) fails.push(`not three notes for "${Z.heads[h]}"`); });
            ns.forEach((e, i) => { const hm = homes(Z, e.dataset.lcsSortnote); if (hm.length !== 1 || hm[0] !== hOf[i]) fails.push(`note ${i + 1} "${e.dataset.lcsSortnote}" does not have one home (it names key words of ${hm.length} headings)`);
              if (hOf[i] === 3 && !(Z.none || []).includes(e.dataset.lcsSortnote)) fails.push(`the note that fits none, "${e.dataset.lcsSortnote}", is not one of the notes that fit none of the three headings`); });
            if (hOf.filter((x) => x === 3).length !== nNone || hOf.some((x) => x >= 0 && x !== 3 && !heads.includes(x))) fails.push('a note fits a heading the page does not show, or the note that fits none is missing');
            const bad = orderBad(hOf); if (bad) fails.push(`the headings of the notes stand in a pattern: ${bad} (${hOf.join('')})`);
            [0, 1, 2].forEach((c) => { const col = hOf.filter((x, i) => i % 3 === c); if (col.length >= 3 && new Set(col).size === 1) fails.push('one column of notes holds one heading only'); });
            if (getComputedStyle(root.querySelector('[data-lcs-sortlist]')).gridTemplateColumns.split(' ').length !== 3) fails.push('the notes to sort do not stand three to a row');
            if (isKey) hs.forEach((e) => { const h = +e.dataset.lcsSorthead, want = hOf.map((x, i) => (x === h ? i + 1 : 0)).filter(Boolean).join(', '), l = e.querySelector('[data-lcs-line]'); if (!l || l.dataset.lcsAnswer !== want) fails.push(`the key of "${Z.heads[h]}" is not ${want}`); });
            const cross = ns.filter((e) => e.querySelector('[data-lcs-cross]'));
            if (isKey ? cross.length !== nNone || cross.some((e) => +e.dataset.lcsH !== 3) : cross.length) fails.push('the key does not cross out the note that fits no heading (or the page of the child does)');
            if (X) { const pickNotes = [...X.A.s, ...X.B.s].map((y) => y.note); if (ns.some((e) => pickNotes.includes(e.dataset.lcsSortnote))) fails.push('a note to sort is a note of the sentences above'); }
          }
          exampleOk([X && X.id, Z && Z.id].filter(Boolean));
        }

        if (mode === 'notes') {
          const src = cards('[data-lcs-src]'), X = TP[(src[0] || {}).dataset ? src[0].dataset.lcsTopic : ''];
          if (!X) return fails.concat('no topic of the bank');
          const rt = ruleText(); if (rt[0] !== S.NOTES_RULE + (lv > 1 ? ' ' + S.OWN : '')) fails.push('the box of good notes is not the one of this level');
          exampleOk([X.id]);
          if (src.map((e) => e.dataset.lcsSrc).join('') !== (lv === 1 ? 'A' : 'AB')) fails.push(`level ${lv} does not print ${lv === 1 ? 'Source A' : 'Sources A and B'}`);
          src.forEach((e) => { const k = e.dataset.lcsSrc, n = +e.dataset.lcsWords; if (txt(e.querySelector('[data-lcs-srctext]')) !== X[k].s.map((x) => x.t).join(' ') || txt(e.querySelector('[data-lcs-srctitle]')) !== `Source ${k}: ${X[k].title}` || n < 60 || n > 120) fails.push(`Source ${k} is not printed as the bank has it (60 to 120 words)`); });
          const boxes = cards('[data-lcs-notebox]');
          if (boxes.length !== (lv === 3 ? 4 : 3)) fails.push(`${boxes.length} heading boxes`);
          const bold = cards('[data-lcs-key]');
          if (lv === 1) {
            if (bold.length !== 6) fails.push(`${bold.length} word groups in bold, not six`);
            [0, 1, 2].forEach((h) => { const want = X.A.s.filter((x) => x.h === h && x.key).slice(0, 2).map((x) => x.key), got = bold.filter((e) => +e.dataset.lcsH === h).map((e) => txt(e));
              if (got.join('|') !== want.join('|')) fails.push(`the words in bold for "${X.heads[h]}" are not its key words`); });
            boxes.forEach((bx) => { const h = +bx.dataset.lcsNotebox, ls = [...bx.querySelectorAll('[data-lcs-line]')];
              if (txt(bx.querySelector('[data-lcs-headbar]')) !== X.heads[h]) fails.push('a heading box is not headed by its heading');
              if (ls.length !== 3) fails.push('a heading box of level 1 has not three lines');
              if (isKey) { const want = X.A.s.filter((x) => x.h === h && x.key).slice(0, 2).map((x) => x.key); if (ls.map((l) => l.dataset.lcsAnswer || '').filter(Boolean).join('|') !== want.join('|')) fails.push(`the key of "${X.heads[h]}" does not write its words in bold`); } });
          } else {
            if (bold.length) fails.push('words in bold on a level where the child writes notes in own words');
            boxes.forEach((bx) => { const h = +bx.dataset.lcsNotebox, ls = [...bx.querySelectorAll('[data-lcs-line]')].filter((l) => l.dataset.lcsSrcline !== undefined);
              if (h < 3 && txt(bx.querySelector('[data-lcs-headbar]')) !== X.heads[h]) fails.push('a heading box is not headed by its heading');
              if (ls.length !== (lv === 2 ? 4 : 3)) fails.push(`a heading box has ${ls.length} note lines`);
              if (isKey) ls.forEach((l) => { if (!l.dataset.lcsAnswer) return; const n = notesOf(X, h).find((x) => x.note === l.dataset.lcsAnswer); if (!n || l.dataset.lcsSrcline !== n.src) fails.push(`the sample note "${l.dataset.lcsAnswer}" is not a note of "${h < 3 ? X.heads[h] : X.extra}" with its source letter`); });
              if (isKey && !ls.some((l) => l.dataset.lcsSrcline === 'B') && h < 3 && lv === 3) fails.push('a sample of level 3 takes no note from Source B'); });
            const own = root.querySelector('[data-lcs-ownhead]');
            if (!!own !== (lv === 3)) fails.push('the box for a heading of the child\'s own belongs to level 3 only');
            if (own && isKey && (own.querySelector('[data-lcs-line]') || {}).dataset.lcsAnswer !== X.extra) fails.push('the key does not name the fourth heading');
            wantSample('[data-lcs-task="notes"]');
            bothOk();
          }
          if (lv === 1) bold.forEach((e) => { const hm = homes(X, txt(e)); if (hm.length !== 1 || hm[0] !== +e.dataset.lcsH) fails.push(`the words in bold "${txt(e)}" fit ${hm.length} headings, not only their own`); });
          if (lv === 1 && root.querySelector('[data-lcs-both], [data-lcs-bothroom]')) fails.push('level 1 has one source: no either-letter note');
        }

        if (mode === 'intro') {
          const [nOpt, nChip, nStray, nPer] = S.COUNTS.intro[lv];
          const rt = ruleText(); if (rt.join(' | ') !== S.INTRO_RULE.join(' | ')) fails.push('the box does not say what an introduction and a heading do');
          // the notes of a group are as many as the level's (three on level 1, where they show the heading most plainly)
          const its = cards('[data-lcs-introitem]');
          if (its.length !== 2) fails.push(`${its.length} topics to choose an introduction for`);
          const topicsOn = its.map((e) => e.dataset.lcsIntroitem);
          its.forEach((it, i) => { const X = MO[it.dataset.lcsIntroitem]; if (!X) { fails.push(`item ${i + 1} is no model topic (a day-1 page never prints a topic the children write about)`); return; }
            const os = [...it.querySelectorAll('[data-lcs-optrow]')], kinds = os.map((o) => o.dataset.lcsKind);
            if (os.length !== nOpt || kinds.slice().sort().join() !== (nOpt === 4 ? 'ask,detail,other,right' : 'detail,other,right')) fails.push(`item ${i + 1} does not offer ${nOpt} sentences: the introduction, a detail, another topic${nOpt === 4 ? ', a question the notes do not answer' : ''}`);
            os.forEach((o) => { const k = o.dataset.lcsKind, t = txt(o.querySelector('[data-lcs-opt]'));
              if (k === 'right' && t !== X.intro) fails.push(`item ${i + 1}: the right sentence is not the introduction of ${X.name}`);
              if (k === 'detail' && !X.say.some((p) => p[0] === t)) fails.push(`item ${i + 1}: the detail is not a fact of ${X.name}`);
              if (k === 'ask' && t !== X.ask) fails.push(`item ${i + 1}: the question is not one the notes leave open`);
              if (k === 'other') { const O = Object.values(MO).find((y) => y.intro === t); if (!O || O.group === X.group || topicsOn.includes(O.id)) fails.push(`item ${i + 1}: the sentence about another topic is not about a topic of another kind`); }
              if (k === 'right' && !o.querySelector('[data-lcs-ok]')) fails.push(`item ${i + 1} is not keyed to its introduction`); });
            const ml = [...it.querySelectorAll('[data-lcs-miniline]')];
            if (ml.length !== 3 || ml.some((m) => !txt(m).startsWith(X.heads[+m.dataset.lcsH] + ':'))) fails.push(`item ${i + 1} does not show its notes under the three headings`);
            ml.forEach((m) => { const ns = txt(m).split(': ').slice(1).join(': ').split(' · '); if (ns.some((n) => !notesOf(X, +m.dataset.lcsH).some((x) => x.note === n))) fails.push(`item ${i + 1}: a note is not a note of its heading`); }); });
          { const all = cards('[data-lcs-opt]').map(txt); if (new Set(all).size !== all.length) fails.push('a sentence is printed twice on the page'); }
          rings(root);
          { const p = its.map((it) => [...it.querySelectorAll('[data-lcs-optrow]')].findIndex((o) => o.querySelector('[data-lcs-ok]'))); const bad = placesBad(p, nOpt); if (bad) fails.push(`the right sentences: ${bad} (${p.join('')})`); }
          if (its.length === 2 && its.every((it) => { const os = [...it.querySelectorAll('[data-lcs-opt]')], r = os.find((o) => o.dataset.lcsOk); return r && os.every((o) => o === r || txt(o).length < txt(r).length); })) fails.push('the right sentence is the longest on every item');
          // the groups
          const gs = cards('[data-lcs-group]'), chips = cards('[data-lcs-chip]');
          const gt = root.querySelector('[data-lcs-task="group"]'), Z = gt && MO[gt.dataset.lcsGrouptopic];
          if (Z && !txt(gt.querySelector('[data-lcs-label]')).startsWith(`2. Notes about ${Z.name}: write the heading of each group.`)) fails.push('the task of the groups does not name their topic');
          if (!Z) fails.push('the groups name no model topic (a day-1 page never prints a topic the children write about)');
          else {
            if (topicsOn.includes(Z.id)) fails.push('the groups are of a topic of part 1');
            if (gs.length !== 3 || chips.length !== nChip) fails.push(`${gs.length} groups and ${chips.length} headings in the box, not 3 and ${nChip}`);
            const allH = [...Z.heads, Z.extra];
            chips.forEach((c) => { if (txt(c) !== allH[+c.dataset.lcsChip]) fails.push('a heading in the box is not a heading of the topic'); });
            if (new Set(chips.map((c) => c.dataset.lcsChip)).size !== chips.length || [0, 1, 2].some((h) => !chips.some((c) => +c.dataset.lcsChip === h)) || (nChip === 4) !== chips.some((c) => c.dataset.lcsChip === '3')) fails.push('the box does not hold the three headings (and on levels 2 and 3 a fourth)');
            gs.forEach((g, gi) => { const h = +g.dataset.lcsGroup, ns = [...g.querySelectorAll('[data-lcs-groupnote]')], home = ns.filter((n) => +n.dataset.lcsH === h), stray = ns.filter((n) => n.dataset.lcsStray);
              ns.forEach((n) => { const hh = +n.dataset.lcsH; if (!notesOf(Z, hh).some((x) => x.note === n.dataset.lcsGroupnote) || [0, 1, 2, 3].filter((k) => notesOf(Z, k).some((x) => x.note === n.dataset.lcsGroupnote)).length !== 1) fails.push(`a note of group ${gi + 1} is no note of one heading`); });
              if (home.length !== nPer) fails.push(`group ${gi + 1} has ${home.length} notes of its own heading (${nPer})`);
              if (stray.some((n) => +n.dataset.lcsH === h)) fails.push(`the note in the wrong group ${gi + 1} belongs to it`);
              const l = g.querySelector('[data-lcs-line]'); if (!l || (isKey ? l.dataset.lcsAnswer !== Z.heads[h] : l.dataset.lcsAnswer)) fails.push(`the heading line of group ${gi + 1} is not keyed to "${Z.heads[h]}"`);
              const ci = chips.findIndex((c) => +c.dataset.lcsChip === h); if (ci === gi) fails.push(`the heading of group ${gi + 1} stands straight above it in the box`);
              ns.forEach((n) => { const cr = !!n.querySelector('[data-lcs-cross]'); if (isKey ? cr !== !!n.dataset.lcsStray : cr) fails.push('the key does not cross out the note in the wrong group (or the page of the child does)'); }); });
            its.forEach((it, i) => { const o = [...it.querySelectorAll('[data-lcs-optrow]')].find((x) => x.dataset.lcsKind === 'other'), O = o && Object.values(MO).find((y) => y.intro === txt(o.querySelector('[data-lcs-opt]'))); if (O && O.id === Z.id) fails.push(`item ${i + 1}: the sentence about another topic is about the topic of the groups`); });
            cards('[data-lcs-groupnote]').forEach((n) => { const hm = homes(Z, n.dataset.lcsGroupnote); if (hm.length !== 1 || hm[0] !== +n.dataset.lcsH) fails.push(`the note "${n.dataset.lcsGroupnote}" does not have one home`); });
            const strays = cards('[data-lcs-stray]');
            if (strays.length !== nStray) fails.push(`${strays.length} notes in a wrong group, not ${nStray}`);
            if (new Set(cards('[data-lcs-groupnote]').map((e) => e.dataset.lcsGroupnote)).size !== cards('[data-lcs-groupnote]').length) fails.push('one note stands twice in the groups');
          }
        }

        if (mode === 'plan') {
          const nl = cards('[data-lcs-plannote]');
          const Yt = (root.querySelector('[data-lcs-task="plannotes"] [data-lcs-label]') || { textContent: '' }).textContent.replace(/^Notes about /, '').trim(), Y = Object.values(TP).find((X) => X.name === straight(Yt));
          if (!Y) return fails.concat('the notes name no topic');
          if (nl.length !== 9) fails.push(`${nl.length} notes, not nine`);
          const hOf = nl.map((e) => +e.dataset.lcsH);
          nl.forEach((e, i) => { if (!notesOf(Y, hOf[i]).some((x) => x.note === e.dataset.lcsPlannote) || txt(e).replace(/^\d+\. ?/, '') !== e.dataset.lcsPlannote) fails.push(`note ${i + 1} is not a note of its heading`); });
          [0, 1, 2].forEach((h) => { if (hOf.filter((x) => x === h).length !== 3) fails.push(`not three notes for "${Y.heads[h]}"`); });
          { const bad = orderBad(hOf); if (bad) fails.push(`the notes stand in a pattern of their headings: ${bad}`); }
          const md = root.querySelector('[data-lcs-model]'), M = md && TP[md.dataset.lcsModel];
          if (!M || M.id === Y.id || !txt(md).includes(M.intro)) fails.push('no model plan of another topic');
          const parts = cards('[data-lcs-part]').map((e) => e.dataset.lcsPart);
          if (parts.join() !== 'intro,group,group,group,picture') fails.push('the planner is not an introduction, three groups, and a picture');
          const intro = root.querySelector('[data-lcs-part="intro"]'), ils = intro ? [...intro.querySelectorAll('[data-lcs-line]')] : [];
          const ist = ils[0] && ils[0].dataset.lcsStarter;
          if ((ist || '') !== (lv === 1 ? opener(Y.intro, 3) : lv === 2 ? opener(Y.intro, 2) : '')) fails.push('the introduction does not start with the frame or the starter of this level');
          if (isKey && ils.map((l) => [l.dataset.lcsStarter, l.dataset.lcsAnswer].filter(Boolean).join(' ')).filter(Boolean).join(' ') !== Y.intro) fails.push('the key of the introduction is not the sample introduction');
          const wb = cards('[data-lcs-headword]').map((e) => e.dataset.lcsHeadword);
          if (lv === 1 ? wb.length : wb.slice().sort().join() !== (lv === 2 ? Y.heads : [...Y.heads, Y.extra]).slice().sort().join()) fails.push('the heading words are not the ones of this level');
          cards('[data-lcs-part="group"]').forEach((g, gi) => { const h = +g.dataset.lcsH, pr = g.querySelector('[data-lcs-printedhead]'), hl = g.querySelector('[data-lcs-headline]');
            if (lv === 1 ? !pr || txt(pr) !== Y.heads[h] : !hl || pr) fails.push(`group ${gi + 1} does not ${lv === 1 ? 'print its heading' : 'have a line for its heading'}`);
            if (hl && isKey && hl.dataset.lcsAnswer !== Y.heads[h]) fails.push(`the key of the heading of group ${gi + 1} is not "${Y.heads[h]}"`);
            if (isKey) { const got = [...g.querySelectorAll('[data-lcs-writes] [data-lcs-line]')].map((l) => l.dataset.lcsAnswer).filter(Boolean), want = nl.filter((e) => +e.dataset.lcsH === h).map((e) => e.dataset.lcsPlannote);
              if (got.join('|') !== want.join('|')) fails.push(`the key of group ${gi + 1} does not write its notes`); } });
          const pic = root.querySelector('[data-lcs-part="picture"]'), cap = pic && pic.querySelector('[data-lcs-caption] [data-lcs-line]');
          if (!pic || !pic.querySelector('[data-lcs-drawbox]') || !cap) fails.push('no picture box with a caption line');
          else { if ((lv === 1) !== (cap.dataset.lcsStarter === 'This shows')) fails.push('the caption frame belongs to level 1');
            if (R(pic.querySelector('[data-lcs-drawbox]')).height < 72) fails.push('the picture box is lower than 72 px');
            if (txt(pic.querySelector('[data-lcs-boxname]')) !== 'Draw a picture that helps the reader. Write a caption under it.') fails.push('the picture box does not say what to draw');
            if (R(cap).width < 560) fails.push('the caption line is not a full-width line');
            { const cl = pic.querySelector('[data-lcs-caplabel]'); if (lv > 1 ? !cl || txt(cl) !== 'Caption' : !!cl) fails.push('the caption line of levels 2 and 3 is not named "Caption"'); }
            const want = lv === 1 ? 'This shows ' + Y.cap[0].toLowerCase() + Y.cap.slice(1) + '.' : Y.cap;
            if (isKey && [cap.dataset.lcsStarter, cap.dataset.lcsAnswer].filter(Boolean).join(' ') !== want) fails.push('the key of the caption is not the sample caption'); }
          const cl = cards('[data-lcs-checktext]').map(txt); if (cl.join('|') !== S.CHECK.plan.join('|')) fails.push('the check list is not the one of the planner');
          wantSample('[data-lcs-task="plan"]');
        }

        if (mode === 'fdd') {
          const rt = ruleText(); if (rt.join(' | ') !== S.FDD_RULE.join(' | ')) fails.push('the box does not tell a fact, a definition, and a detail');
          const rows = cards('[data-lcs-krow]');
          const lab = root.querySelector('[data-lcs-task="label"]');
          const X = Object.values(MO).find((x) => lab && txt(lab).includes(`${x.dev.head} (about ${x.name})`));
          if (!X) return fails.concat('the paragraph is no mentor paragraph of a model topic (a day-1 page never prints a topic the children write about)');
          // two parts (level 1) or three of the model's paragraph, in their order; three are never all of one length (the
          // facts would stand at one step)
          const gsel = ((lab && lab.dataset.lcsDgroups) || '').split(',').filter((x) => x !== '').map(Number);
          if (gsel.length !== (lv === 1 ? 2 : 3) || gsel.some((g, i) => !(g >= 0 && g < X.dev.g.length) || (i > 0 && g <= gsel[i - 1]))) fails.push(`the paragraph is not ${lv === 1 ? 'two' : 'three'} parts of the mentor paragraph in their order`);
          if (gsel.length === 3 && new Set(gsel.map((g) => (X.dev.g[g] || []).length)).size === 1) fails.push('the three parts are of one length: the facts stand at one step');
          // (writing review 1119) the first sentence of each part is GIVEN as its fact (no boxes, no number); the child marks
          // only the sentences after it, each a definition or a detail: two columns, never a Fact column (every detail is
          // a fact too)
          const facts = cards('[data-lcs-givenfact]'), want = gsel.flatMap((g) => (X.dev.g[g] || []).slice(1));
          if (facts.length !== gsel.length || facts.some((f, i) => f.dataset.lcsText !== ((X.dev.g[gsel[i]] || [])[0] || [])[1] || ((X.dev.g[gsel[i]] || [])[0] || [])[0] !== 'F')) fails.push('the fact of each part is not given at its start');
          facts.forEach((f, i) => { const t = f.dataset.lcsText; if ((lv < 3 ? txt(f) !== 'Fact: ' + t : txt(f) !== t || !f.querySelector('b')) || f.querySelector('[data-lcs-cell]')) fails.push(`the fact of part ${i + 1} is not printed as a given fact (${lv < 3 ? '"Fact:" and its sentence' : 'its sentence in bold'}, no box)`); });
          if (root.querySelector('[data-lcs-col="F"], [data-lcs-gridrow="F"], [data-lcs-cell="F"]') || want.some((x) => x[0] === 'F')) fails.push('a Fact column after the fact: a sentence after it is a definition or a detail');
          if (rows.length !== want.length || rows.some((r, i) => r.dataset.lcsText !== want[i][1] || r.dataset.lcsKrow !== want[i][0])) fails.push('the sentences are not the mentor paragraph in its order with their kinds');
          rows.forEach((r, i) => { const t = r.dataset.lcsText, sp = r.querySelector('[data-lcs-ktext]'); if (sp ? txt(sp) !== t : txt(r).replace(/^\d+/, '') !== t) fails.push(`sentence ${i + 1} is not printed as the bank has it`); });
          if (lv === 3 && cards('[data-lcs-colnum]').length !== rows.length) fails.push('the grid has a column for a sentence that is no definition or detail');
          // the parts are seen: each in a block of its own, below the one before, its fact first
          { const pb = cards('[data-lcs-partblock]');
            if (pb.length !== gsel.length) fails.push(`${pb.length} parts shown, not ${gsel.length}`);
            pb.forEach((b, i) => { const own = [...b.querySelectorAll('[data-lcs-givenfact], [data-lcs-krow]')].map((r) => r.dataset.lcsText), w = (X.dev.g[gsel[i]] || []).map((x) => x[1]);
              if (own.join('|') !== w.join('|')) fails.push(`part ${i + 1} does not hold the sentences of its part`);
              if (i && R(b).top < R(pb[i - 1]).bottom + (lv < 3 ? 4 : -0.5)) fails.push(`part ${i + 1} does not stand apart below part ${i}`); }); }
          if (rows.length + facts.length > (lv === 1 ? 7 : 9)) fails.push(`${rows.length + facts.length} sentences (${lv === 1 ? 7 : 9} or fewer)`);
          const ks = gsel.flatMap((g) => (X.dev.g[g] || []).map((x) => x[0]));
          ['Def', 'D'].forEach((k) => { if (!rows.some((r) => r.dataset.lcsKrow === k)) fails.push(`no ${k} on the page`); });
          { const bad = orderBad(ks); if (bad) fails.push(`the kinds stand in a pattern: ${bad} (${ks.join(' ')})`); }
          const cells = cards('[data-lcs-cell]'), ticks = cells.filter((c) => c.querySelector('[data-lcs-check]'));
          if (cells.length !== rows.length * 2) fails.push('not a box under definition and detail for every sentence after the fact');
          if (lv < 3) rows.forEach((r, i) => { const on = [...r.querySelectorAll('[data-lcs-cell]')].filter((c) => c.querySelector('[data-lcs-check]')); if (isKey ? on.length !== 1 || on[0].dataset.lcsCell !== r.dataset.lcsKrow : on.length) fails.push(`sentence ${i + 1}: ${on.length} check marks`); });
          else rows.forEach((r, i) => { const on = cells.filter((c) => c.dataset.lcsGcell === String(i + 1) && c.querySelector('[data-lcs-check]')); if (isKey ? on.length !== 1 || on[0].dataset.lcsCell !== r.dataset.lcsKrow : on.length) fails.push(`sentence ${i + 1}: ${on.length} check marks`); });
          if (!isKey && ticks.length) fails.push('check marks on the page of the child');
          if (lv < 3) rows.forEach((r) => r.querySelectorAll('[data-lcs-cell]').forEach((c) => { const col = root.querySelector(`[data-lcs-col="${c.dataset.lcsCell}"]`); if (col && Math.abs((R(c).left + R(c).right) / 2 - (R(col).left + R(col).right) / 2) > 3) fails.push('a box does not stand under its column'); }));
          if ((lv === 3) !== !!root.querySelector('[data-lcs-paragraph]')) fails.push('the paragraph as running text belongs to level 3');
          const bold = cards('[data-lcs-bold]').map((e) => e.dataset.lcsBold), defW = want.filter((x) => x[0] === 'Def').map((x) => x[2]);
          if (lv === 1 ? bold.slice().sort().join() !== defW.slice().sort().join() : bold.length) fails.push('the defined words are not in bold on level 1 (or are on another level)');
          // part 2: the word to define of ANOTHER model topic (rule 12: never a topic the children write about, and never
          // a word or a fact Day 2 gives them)
          const bf = root.querySelector('[data-lcs-barefact]'), Y = bf && Object.values(MO).find((y) => y.dev.g[y.hard.g][0][1] === bf.dataset.lcsBarefact);
          if (!Y || Y.id === X.id) fails.push('the fact to add to is no word-to-define fact of another model topic');
          else {
            const hg = Y.dev.g[Y.hard.g], dx = hg.find((x) => x[0] === 'Def'), def = dx[1], det = hg.find((x) => x[0] === 'D')[1];
            if (Object.values(TP).some((T) => T.dev.g.flat().some((x) => [hg[0][1], def, det].includes(x[1])) || lc(T.dev.g[T.hard.g].find((x) => x[0] === 'Def')[2]) === lc(dx[2]))) fails.push('the fact to add to, or its word, is one of a topic the children write about');
            if (txt(bf.querySelector('[data-lcs-addnotes]')) !== `Notes: ${Y.hard.defNote} · ${Y.hard.detNote}`) fails.push('the notes of the fact are not its definition note and its detail note');
            if (want.some((x) => x[1] === bf.dataset.lcsBarefact)) fails.push('the fact to add to stands in the paragraph');
            [['def', def], ['det', det]].forEach(([k, s]) => { const p = root.querySelector(`[data-lcs-addpart="${k}"]`), ls = p ? [...p.querySelectorAll('[data-lcs-line]')] : [];
              if (ls.length !== 2) { fails.push(`the ${k === 'def' ? 'definition' : 'detail'} has not two lines`); return; }
              const st = ls[0].dataset.lcsStarter || '', wantSt = k === 'def' ? (lv <= 2 ? (s.match(/^(.*? (is|are|means))\b/) || [])[1] : '') : (lv === 1 ? detStart(s) : '');
              if (st !== (wantSt || '')) fails.push(`the ${k === 'def' ? 'definition' : 'detail'} line does not start as level ${lv} wants ("${wantSt || ''}")`);
              if (isKey && ls.map((l) => [l.dataset.lcsStarter, l.dataset.lcsAnswer].filter(Boolean).join(' ')).filter(Boolean).join(' ') !== s) fails.push(`the key of the ${k === 'def' ? 'definition' : 'detail'} is not its sample`); });
          }
          wantSample('[data-lcs-task="addto"]');
        }

        if (mode === 'develop') {
          const dt = root.querySelector('[data-lcs-task="draft"]'), Y = dt && TP[dt.dataset.lcsDrafttopic];
          if (!Y) return fails.concat('the draft names no topic');
          // every part shows the notes of its heading (two or more), and no note of another heading
          cards('[data-lcs-part="part"]').forEach((p, i) => { const h = +p.dataset.lcsH, ns = [...p.querySelectorAll('[data-lcs-pnote]')].map(txt);
            if (ns.length < 2 || ns.some((n) => !notesOf(Y, h).some((x) => x.note === n))) fails.push(`part ${i + 1} does not show the notes of its heading`); });
          const hw = root.querySelector('[data-lcs-hardword]'); if (!hw || txt(hw) !== `Word to define: ${Y.hard.defNote}`) fails.push('no word to define with its meaning');
          // the word to define is never a word of the day-1 page (a model topic's)
          { const w = (T) => lc(T.dev.g[T.hard.g].find((x) => x[0] === 'Def')[2]); if (Object.values(MO).some((m) => w(m) === w(Y))) fails.push('the word to define is one the day-1 page defines'); }
          const lk = root.querySelector('[data-lcs-linkwords]'); if (!lk || txt(lk) !== S.LINKING) fails.push(`the linking words are not ${S.LINKING}`);
          const fr = root.querySelector('[data-lcs-frame]'); if (!fr || txt(fr) !== S.FRAME[lv]) fails.push('the definition frames are not the ones of this level');
          const md = root.querySelector('[data-lcs-model]'), M = md && TP[md.dataset.lcsModel];
          if (lv === 3 ? !!md : !M || M.id === Y.id) fails.push(lv === 3 ? 'level 3 shows a model part' : 'no model part of another topic');
          else if (M) { const mg = M.dev.g[M.hard.g]; if (!txt(md).includes([mg[0][1], mg.find((x) => x[0] === 'Def')[1], mg.find((x) => x[0] === 'D')[1]].join(' '))) fails.push('the model part is not a fact, a definition, and a detail of its topic'); }
          const parts = cards('[data-lcs-part="part"]');
          if (parts.length !== 3) fails.push(`${parts.length} parts, not three`);
          const hardH = Y.hard.h, hg = Y.dev.g[Y.hard.g], def = hg.find((x) => x[0] === 'Def')[1];
          let total = 0;
          parts.forEach((p, i) => { const h = +p.dataset.lcsH, ls = [...p.querySelectorAll('[data-lcs-writes] [data-lcs-line]')];
            // the part of the word to define: a sentence that uses the word, its definition, a sentence with a linking word
            const s = h === hardH ? [Y.say[h][0], def, Y.say[h][1]] : Y.say[h];
            total += ls.length;
            const least = lv === 3 || s.length === 3 ? 4 : 3;
            if (ls.length < least) fails.push(`part ${i + 1} has ${ls.length} lines (${least} or more)`);
            const pr = p.querySelector('[data-lcs-printedhead]'), hl = p.querySelector('[data-lcs-headline]');
            if (lv === 1 ? !pr || txt(pr) !== Y.heads[h] : !hl) fails.push(`part ${i + 1} has no ${lv === 1 ? 'printed heading' : 'heading line'}`);
            if (hl && isKey && hl.dataset.lcsAnswer !== Y.heads[h]) fails.push(`the key of the heading of part ${i + 1} is not "${Y.heads[h]}"`);
            const st = ls.map((l) => l.dataset.lcsStarter || '');
            const wantSt = lv === 1 ? s.map((x, j) => (s.length === 3 && j === 1 ? (x.match(/^(.*? (is|are|means))\b/) || [])[1] || '' : opener(x, 3))) : lv === 2 ? [opener(s[0], 2)] : [];
            if (st.filter(Boolean).join('|') !== wantSt.filter(Boolean).join('|') || (st[0] || '') !== (wantSt[0] || '')) fails.push(`part ${i + 1} does not have the starters of level ${lv}`);
            if (isKey && lineText(ls) !== s.join(' ')) fails.push(`the key of part ${i + 1} is not its sample`); });
          const cc = root.querySelector('[data-lcs-part="conclude"]'), cls = cc ? [...cc.querySelectorAll('[data-lcs-line]')] : [];
          if (cls.length < 2) fails.push('the concluding sentence has fewer than two lines');
          if (lv === 3 && total + cls.length < 14) fails.push(`level 3 gives ${total + cls.length} lines to write on (14 or more)`);
          const close = lv === 1 && Y.close1 ? Y.close1 : Y.close;
          if (cls[0] && (cls[0].dataset.lcsStarter || '') !== (lv === 1 ? opener(close, Y.close1 ? 2 : 3) : '')) fails.push('the concluding sentence does not start as level ' + lv + ' wants');
          if (isKey && lineText(cls) !== close) fails.push('the key of the concluding sentence is not its sample');
          const cl = cards('[data-lcs-checktext]').map(txt); if (cl.join('|') !== S.CHECK.develop[lv].join('|')) fails.push('the check list is not the one of the draft');
          // the sample uses linking words and defines the hard word
          if (isKey) { const all = parts.map((p) => lineText([...p.querySelectorAll('[data-lcs-writes] [data-lcs-line]')])).join(' ').toLowerCase();
            if (!/\b(also|another|more|but|for example)\b/.test(all)) fails.push('the sample uses no linking word');
            if (!all.includes(def.toLowerCase())) fails.push('the sample does not define the hard word'); }
          wantSample('[data-lcs-task="draft"]');
        }

        if (mode === 'research') {
          const src = cards('[data-lcs-src]'), X = TP[src[0] && src[0].dataset.lcsTopic];
          if (!X) return fails.concat('no topic of the bank');
          if (src.map((e) => e.dataset.lcsSrc).join('') !== 'AB') fails.push('the page does not print Sources A and B');
          // the worked note (another topic): a few words, never the copied sentence
          { const ex = root.querySelector('[data-lcs-example]'), e = ex && I.examples.find((y) => y.about === ex.dataset.lcsExample);
            if (lv > 1) { if (ex) fails.push('a worked note on level ' + lv + ' (level 1 only)'); }
            else if (!e || txt(ex) !== `A good note: "${e.t}" → ${e.note}` || X.name.split(' ').some((w) => e.about.includes(w))) fails.push('the research page has no worked note of another topic'); }
          src.forEach((e) => { const k = e.dataset.lcsSrc, n = +e.dataset.lcsWords; if (txt(e.querySelector('[data-lcs-srctext]')) !== X[k].s.map((x) => x.t).join(' ') || n < 60 || n > 120) fails.push(`Source ${k} is not printed as the bank has it`); });
          const qq = root.querySelector('[data-lcs-question]'), q3 = root.querySelector('[data-lcs-q3]');
          if (lv < 3 ? !qq || qq.dataset.lcsQuestion !== X.q || txt(qq) !== 'Research question: ' + X.q || q3 : !!qq || !q3) fails.push('the research question is not printed on levels 1 and 2 (or written by the child on level 3)');
          if (q3) {
            // level 3: a question both sources can help answer, after "How do" and the topic noun when the question names it
            const lb = q3.querySelector('[data-lcs-label]'), ls = [...q3.querySelectorAll('[data-lcs-line]')];
            if (!lb || txt(lb).replace(S.SAMPLEQ, '').trim() !== S.TASKS.question3) fails.push('the line of the question is not "' + S.TASKS.question3 + '"');
            const w = X.q3.split(' '), at = w.slice(0, 5).findIndex((x, i) => i >= 2 && X.name.split(' ').slice(-1)[0].replace(/e?s$/, '') === lc(x).replace(/e?s$/, '')), wantSt = at > 0 ? w.slice(0, at + 1).join(' ') : 'How do';
            if (ls.length !== 1 || ls[0].dataset.lcsStarter !== wantSt) fails.push(`the question line does not start "${wantSt}"`);
            if (isKey && lineText(ls) !== X.q3) fails.push('the key of the question is not the sample question');
            const sq = q3.querySelector('[data-lcs-sample]'), rq = q3.querySelector('[data-lcs-sampleroom]');
            if (isKey ? !sq || txt(sq) !== S.SAMPLEQ : !!sq || !rq) fails.push('the key of the question does not say other questions are right');
          }
          bothOk();
          const rows = cards('[data-lcs-orgrow]'), cell = lv === 3 ? 2 : 3;
          if (rows.length !== 3) fails.push(`${rows.length} rows, not three`);
          rows.forEach((r, i) => { const h = +r.dataset.lcsOrgrow, pr = r.querySelector('[data-lcs-printedhead]'), cl = r.querySelector('[data-lcs-catline]');
            if (lv === 1 ? !pr || txt(pr) !== X.heads[h] : !cl || pr) fails.push(`row ${i + 1} does not ${lv === 1 ? 'print its category' : 'have a line for its category'}`);
            if (cl && isKey && cl.dataset.lcsAnswer !== X.heads[h]) fails.push(`the key of the category of row ${i + 1} is not "${X.heads[h]}"`);
            ['A', 'B'].forEach((s) => { const c = r.querySelector(`[data-lcs-orgcell="${s}"]`), ls = c ? [...c.querySelectorAll('[data-lcs-line]')] : [];
              if (ls.length !== cell) fails.push(`row ${i + 1} has ${ls.length} lines for Source ${s}`);
              // the key: the notes of that source and category, as many as leave one line to spare
              if (isKey) { const a = ls.map((l) => l.dataset.lcsAnswer).filter(Boolean), want = notesOf(X, h, s).slice(0, cell - 1).map((x) => x.note);
                if (!a.length || a.join('|') !== want.join('|')) fails.push(`the key of row ${i + 1}, Source ${s}, is not the notes of that source and category`); } }); });
          wantSample('[data-lcs-task="organize"]');
        }

        if (mode === 'report') {
          const rc = root.querySelector('[data-lcs-task="report"]'), X = rc && TP[rc.dataset.lcsReporttopic];
          if (!X) return fails.concat('the report names no topic of the bank');
          if (root.querySelector('[data-lcs-question], [data-lcs-model]')) fails.push('the report page prints a question card or a model part (the room is for writing)');
          const parts = cards('[data-lcs-part]').map((e) => e.dataset.lcsPart);
          if (parts.join() !== 'top,part,part,part,conclude,sources') fails.push('the report frame is not an introduction, three parts, a concluding sentence, and sources');
          const top = root.querySelector('[data-lcs-part="top"]'), il = top && top.querySelector('[data-lcs-introlines]');
          const ils = il ? [...il.querySelectorAll('[data-lcs-line]')] : [];
          if (ils.length !== 2) fails.push('the introduction has not two lines');
          if (ils.some((l) => R(l).width < 560)) fails.push('the introduction lines are not full width');
          if (ils[0] && (ils[0].dataset.lcsStarter || '') !== (lv === 1 ? opener(X.rIntro, 2) : '')) fails.push('the introduction does not start as level ' + lv + ' wants');
          if (isKey && lineText(ils) !== X.rIntro) fails.push('the key of the introduction is not the sample introduction');
          cards('[data-lcs-part="part"]').forEach((p, i) => { const h = +p.dataset.lcsH, ls = [...p.querySelectorAll('[data-lcs-writes] [data-lcs-line]')], s = X.rep[h];
            if (ls.length !== 3) fails.push(`part ${i + 1} has ${ls.length} lines, not three`);
            // levels 1 and 2: the first note of each source, with its letter (level 2: and a note of the child's own);
            // level 3: no notes (the child's own, from Notes from Two Sources)
            const ns = [...p.querySelectorAll('[data-lcs-pnote]')].map((e) => [e.dataset.lcsPnote, txt(e)]);
            const wantN = lv === 3 ? [] : ['A', 'B'].map((k) => { const n = notesOf(X, h, k)[0]; return [k, `${n.note} (${k})`]; });
            if (ns.map((x) => x.join(':')).join('|') !== wantN.map((x) => x.join(':')).join('|')) fails.push(`part ${i + 1} does not show the first note of each source${lv === 3 ? ' (level 3 shows none)' : ''}`);
            const pr = p.querySelector('[data-lcs-printedhead]'), hl = p.querySelector('[data-lcs-headline]');
            if (lv === 1 ? !pr || txt(pr) !== X.heads[h] : !hl || pr) fails.push(`part ${i + 1} has no ${lv === 1 ? 'printed heading' : 'heading line'}`);
            if (hl && isKey && hl.dataset.lcsAnswer !== X.heads[h]) fails.push(`the key of the heading of part ${i + 1} is not "${X.heads[h]}"`);
            const st = ls[0] ? ls[0].dataset.lcsStarter || '' : '', want = lv === 1 ? opener(s[0], 3) : lv === 2 ? opener(s[0], 2) : '';
            if (st !== want || ls.slice(1).some((l) => l.dataset.lcsStarter)) fails.push(`part ${i + 1} does not start as level ${lv} wants`);
            // a part's sample: a sentence from the Source A note, one from the Source B note with a linking word
            if (isKey && lineText(ls) !== s.join(' ')) fails.push(`the key of part ${i + 1} is not its sample`); });
          const cp = root.querySelector('[data-lcs-part="conclude"]'), cls = cp ? [...cp.querySelectorAll('[data-lcs-line]')] : [];
          if (cls.length < 3) fails.push('the concluding sentence has fewer than three lines');
          if (!cp || !txt(cp).startsWith('Concluding sentence')) fails.push('the concluding sentence is not named "Concluding sentence"');
          const cs1 = lv === 1 ? 'Now you know that ' + X.close[0].toLowerCase() + X.close.slice(1) : X.close;
          if (cls[0] && (cls[0].dataset.lcsStarter || '') !== (lv === 1 ? 'Now you know that' : '')) fails.push('the concluding sentence does not start as level ' + lv + ' wants');
          if (isKey && lineText(cls) !== cs1) fails.push('the key of the concluding sentence is not its sample');
          // the diagram: a box of 2.3 by 1.3 inches or more, named, with a caption line under it named "Caption"
          { const dg = root.querySelector('[data-lcs-diagram]'), bx = dg && dg.querySelector('[data-lcs-drawbox]'), cl = dg && dg.querySelector('[data-lcs-caplabel]'), cap = dg && dg.querySelectorAll('[data-lcs-caption] [data-lcs-line]');
            if (!bx || R(bx).width < 220.8 - 0.5 || R(bx).height < 124.8 - 0.5) fails.push('the diagram box is smaller than 2.3 by 1.3 inches');
            if (!bx || txt(bx.querySelector('[data-lcs-boxname]')) !== 'Diagram: a drawing with labels') fails.push('the diagram box is not named');
            if (!cap || cap.length !== 1 || cap[0].dataset.lcsStarter !== 'Caption:' || R(cap[0]).width < 200) fails.push('the diagram has no caption line named "Caption:"');
            if (!!(bx && bx.querySelector('[data-lcs-vary]')) !== isKey) fails.push('the key does not say diagrams vary (or the page of the child does)'); }
          // every level names the topic of the report and its two sources (level 3 prints no notes, so this is all that
          // tells a child which report to write)
          const ab = root.querySelector('[data-lcs-reportabout]'); if (!ab || txt(ab) !== 'Your topic: ' + X.name) fails.push('the page does not name the topic of the report');
          const so = root.querySelector('[data-lcs-sources]'); if (!so || txt(so) !== `A. ${X.A.title} · B. ${X.B.title}`) fails.push('the source titles are not printed');
          const sl = cards('[data-lcs-part="sources"] [data-lcs-line]');
          if (sl.length !== 2 || sl.map((l) => l.dataset.lcsStarter).join() !== 'A.,B.') fails.push('the source list has not two lines A and B');
          if (isKey && sl.map((l) => l.dataset.lcsAnswer).join('|') !== X.A.title + '|' + X.B.title) fails.push('the key of the source list is not the two titles');
          // the check list: one row
          { const cr = cards('[data-lcs-checkrow]'), cl = cr.map(txt);
            if (cl.join('|') !== S.CHECK.report.join('|')) fails.push('the check list is not the one of the report');
            if (cr.some((e) => Math.abs(R(e).top - R(cr[0]).top) > 2)) fails.push('the check list of the report is not one row'); }
          wantSample('[data-lcs-task="report"]');
        }

        // no blank band of more than GAP px between two tasks of a card, two blocks, or at the foot of a card
        { const byParent = new Map();
          root.querySelectorAll('[data-lcs-item]').forEach((e) => { const p = e.parentElement; if (!byParent.has(p)) byParent.set(p, []); byParent.get(p).push(R(e)); });
          for (const rs of byParent.values()) { rs.sort((a, b) => a.top - b.top); let low = rs.length ? rs[0].bottom : 0; for (let k = 1; k < rs.length; k++) { const g = rs[k].top - low; if (g > S.GAP + 0.5) { fails.push(`a blank band of ${Math.round(g)} px between two tasks`); break; } low = Math.max(low, rs[k].bottom); } }
          const bl = blocks.map(R); for (let k = 1; k < bl.length; k++) { const g = bl[k].top - bl[k - 1].bottom; if (g > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two blocks`); }
          root.querySelectorAll('[data-lcs-task]').forEach((c) => { const low = Math.max(...[...c.querySelectorAll('[data-lcs-item], [data-lcs-line], [data-lcs-read], [data-lcs-label], [data-lcs-srctext]')].map((e) => R(e).bottom));
            const g = R(c).bottom - parseFloat(cs(c).paddingBottom) - low; if (g > S.GAP + 0.5) fails.push(`a blank band of ${Math.round(g)} px at the foot of a card (${c.dataset.lcsTask})`); });
          // inside a group of lines, no line stands far from the one above
          root.querySelectorAll('[data-lcs-item]').forEach((it) => { const kids = [...it.children].map(R).filter((r) => r.height); for (let k = 1; k < kids.length; k++) { const g = kids[k].top - kids[k - 1].bottom; if (g > S.GAP + 0.5) { fails.push(`a blank band of ${Math.round(g)} px inside a task`); break; } } }); }
        return fails;
      }, INFO);
    },
  };
}

/* ------------------------------------------------------------------ the unit check (Part 7.6) */
/**
 * iw3CheckPage — the cards a unit check cuts from the day-1 pages (PART-7-DESIGN.md 7.6): every item of the MODEL topics as a
 * card of its own (never a topic the children write about), at the level the lesson hands out, built from the page's own bank
 * and rules (no new task):
 *   notepick  G3-556  a sentence of a model (one line) and three notes: the sentence copied whole, a note that changes the
 *                     fact, the good note: circle the good note (data-lcs-notelen: the good note is the shortest or not,
 *                     so that a part asks both)
 *   intro     G3-558  a model's notes under its headings and the sentences of the level (its introduction, a detail, the
 *                     introduction of a model of another kind, a question the notes do not answer): circle the one that
 *                     introduces the topic best
 *   fdd       G3-560  one part of a model's mentor paragraph, its fact given (Fact:): a check mark under definition or
 *                     detail for each sentence after it
 * A card names its item (data-lcs-text) so that form B asks other ones than form A.
 */
function iw3CheckPage(mode, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`informative-writing-g3 check: the texts are English (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, d = LEVELS[mode][lv] || LEVELS[mode][2], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const A = (s) => esc(s).replace(/"/g, '&quot;');
  const MS = BANK.models;
  const shell = (id, inner, more = '') => `<div data-lcs-text="${A(id)}"${more} style="display:flex;flex-direction:column;gap:3px;padding:4px 12px;border-radius:12px;background:#FFFFFF">${inner}</div>`;
  const choice = (t, ok) => `<div${ok ? ' data-lcs-correct="1"' : ''} style="display:flex"><span style="padding:0 9px;border:2.5px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;font:700 18px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span></div>`;
  const tick = (ok) => `<span style="box-sizing:border-box;width:25px;height:25px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF">${key && ok ? `<svg width="20" height="20" viewBox="0 0 20 20" style="display:block"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}</span>`;
  const cards = [];
  if (mode === 'notepick') for (const X of shuffle(MS, rng)) for (const x of shuffle(sentsOf(X).filter((y) => y.wrong && y.note && y.t.length <= PICKMAX), rng)) {
    const o = shuffle([{ t: x.t }, { t: x.wrong }], rng); o.splice(rng.int(0, 2), 0, { t: x.note, ok: true });
    const short = o.every((y) => y.ok || y.t.length > x.note.length) ? 'short' : 'other';
    cards.push(shell(x.t, `<div style="font:700 18px/1.3 'Nunito',sans-serif;color:${T.ink}"><span style="color:${T.teal};font-weight:800">${esc(X.title)}:</span> ${esc(x.t)}</div><div data-lcs-ckopts style="display:flex;flex-direction:column;gap:1px;padding-left:12px">${o.map((y) => choice(y.t, y.ok)).join('')}</div>`, ` data-lcs-notelen="${short}"`));
  }
  if (mode === 'intro') for (const X of shuffle(MS, rng)) {
    // (the page's rule: the right sentence is not the one to find by its length: a model of another kind and a detail that
    //  leave a longer sentence beside it; a model whose introduction is longer than every other choice gives no card)
    const combos = shuffle(MS.filter((y) => y !== X && y.group !== X.group).flatMap((y) => [0, 1, 2].map((h) => ({ O: y, h }))), rng);
    if (!combos.length) continue;
    const pickC = combos.find((c) => Math.max(c.O.intro.length, X.say[c.h][0].length) > X.intro.length);
    if (!pickC) continue;
    const { O, h } = pickC;
    const opts = shuffle([{ t: X.say[h][0] }, { t: O.intro }, ...(d.opts === 4 ? [{ t: X.ask }] : [])], rng); opts.splice(rng.int(0, opts.length), 0, { t: X.intro, ok: true });
    const notes = [0, 1, 2].map((hh) => `<div style="font:700 16px/1.25 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">${esc(X.heads[hh])}:</b> ${[notesOf(X, hh, 'A')[0], notesOf(X, hh, 'B')[0]].filter(Boolean).map((y) => esc(y.note)).join(' · ')}</div>`).join('');
    cards.push(shell(X.id, `<div style="padding:1px 10px 2px;border:2.5px solid ${T.creamDeep};border-radius:10px"><div style="font:700 16px/1.2 'Baloo 2',cursive;color:${T.teal}">Notes: ${esc(X.title)}</div>${notes}</div><div data-lcs-ckopts style="display:flex;flex-direction:column;gap:1px;padding-left:12px">${opts.map((y) => choice(y.t, y.ok)).join('')}</div>`));
  }
  if (mode === 'fdd') for (const X of shuffle(MS, rng)) for (const g of shuffle(X.dev.g, rng)) {
    // (parts of two or three sentences: two cards of a part stand within the part's height)
    if (g.length < 2 || g.length > 3) continue;
    // (writing review 1119, as the page: the first sentence is GIVEN as the part's fact, no boxes; each sentence after it
    //  is a definition or a detail, the only two columns: a Fact column there had two right answers)
    const name = { Def: 'definition', D: 'detail' };
    const head = `<div style="display:flex;align-items:flex-end"><span style="flex:1 1 auto"></span>${['Definition', 'Detail'].map((c) => `<span style="flex:0 0 92px;text-align:center;font:800 15px/1.1 'Nunito',sans-serif;color:${T.teal}">${c}</span>`).join('')}</div>`;
    const fact = `<div data-lcs-ckfact style="font:700 17px/1.25 'Nunito',sans-serif;color:${T.ink}"><b style="font-weight:800;color:${T.teal}">Fact:</b> ${esc(g[0][1])}</div>`;
    cards.push(shell(g[0][1], fact + head + g.slice(1).map((x) => `<div style="display:flex;align-items:center;gap:4px"><span style="flex:1 1 auto;min-width:0;font:700 17px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(x[1])}</span><span style="display:flex">` +
      ['definition', 'detail'].map((c) => `<span${c === name[x[0]] ? ' data-lcs-correct="1"' : ''} data-lcs-choice="${c}" style="flex:0 0 92px;display:flex;justify-content:center">${tick(c === name[x[0]])}</span>`).join('') + `</span></div>`).join('')));
  }
  if (!cards.length) throw new Error('informative-writing-g3 check: no cards for ' + mode);
  return { bodyHtml: STYLE + `<div data-lcs-iw3check="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}">` + fRoom(typo(checkGrid(cards, { cols: 1 }))) + `</div>`, meta: {} };
}
/** iw3CheckWrite — the writing task of the unit check: every topic the children write about, with the notes the plan page
 *  prints for it (the first three of each heading, from both sources; the bank's own words) */
function iw3CheckWrite(mode, { locale }) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`informative-writing-g3 check: the topics are English (no ${locale} bank)`);
  return { tasks: BANK.topics.map((Y) => ({ id: 'topic:' + Y.id, prompt: `${Y.title}. Notes: ` + [0, 1, 2].map((h) => `${Y.heads[h]}: ${[...notesOf(Y, h, 'A'), ...notesOf(Y, h, 'B')].slice(0, 3).map((x) => x.note).join('; ')}.`).join(' ') })) };
}

module.exports = { makeInformativeWritingG3Type, faultsOf, plan, LEVELS, INSTR, LINES, SPEC };
