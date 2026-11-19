/**
 * sentences-g3.js — ten Grade 3 grammar pages, the unit "Sentences and Conventions" (English literacy year, Daily Teaching
 * System Part 12.3, 2026-11-18). Children are 8 or 9. The words and sentences are data/literacy/sentences-g3.en.json
 * (written by the scratch script y-g3sent/bank.js; every sentence with a blank names every joining word that fits it).
 *
 *   joinpick  G3-521 Choose the Joining Word (L.3.1.h; day 1 of "Joining words"). A box of the level's joining words, each
 *             with its job. Sentences with a blank and no comma printed before it; under each sentence the joining words
 *             to choose from: the child circles the one that fits and writes it in the blank WITH a comma when it is
 *             and, but, so or or (so a printed comma never tells the answer; the key writes ", so").
 *               level 1  eight sentences, and, but, so: two words to choose from (and fits nearly every so-sentence, so a
 *                        sentence never offers a second word that fits)
 *               level 2  seven sentences, and, but, or, so, because: three words to choose from
 *               level 3  seven sentences, all nine words (when, if, after, before too): three words to choose from; every
 *                        because / when / if / after / before item offers one more word of that group that common sense
 *                        rules out (the bank's "out"), so the child cannot pick "the new word"
 *   join      G3-520 Join Sentences with Joining Words (L.3.1.h; day 2). The box of the level's words with their jobs. 1. Four
 *             pairs of short sentences: the child writes them as one sentence on two full-width lines with a word of the box
 *             and circles it (the key writes one right sentence and names EVERY other word of the box that joins the pair
 *             right, "and" marked when a word of the box says it better). 2. Sentences that end in a joining word: the child
 *             finishes them (answers vary; the key gives one). Level 1 and, but, so; level 2 and, but, or, so, because;
 *             level 3 all nine words.
 *   kinds     G3-522 Simple, Compound, and Complex Sentences (L.3.1.i; day 1). A box that tells each kind with an example; a
 *             table of sentences: the child puts a check mark under the kind of each one.
 *               level 1  ten sentences, simple or compound; two simple sentences have a list with series commas (a comma
 *                        alone does not make a compound sentence)
 *               level 2  twelve sentences, simple, compound or complex (one simple sentence with series commas)
 *               level 3  twelve sentences; some simple sentences have two subjects or two verbs (the box says so), and one
 *                        has after or before with no subject and verb of its own ("We played outside after lunch.")
 *   build     G3-523 Build Compound and Complex Sentences (L.3.1.i; days 2 and 3). Every sentence the child writes gets two
 *             full-width lines (a third grader writes 40 to 45 letters across one); "compound" / "complex" stands above
 *             its first line.
 *               level 1  six pairs: write each as a compound sentence
 *               level 2  three pairs: write each as a compound sentence and as a complex sentence (four do not fit the
 *                        page at two lines a sentence)
 *               level 3  one pair (both ways), and a paragraph of six short simple sentences to rewrite with two compound
 *                        sentences and one complex sentence (a check list for the child; six lines)
 *   compare   G3-524 Better, Best: Comparing with Adjectives and Adverbs (L.3.1.g; day 2). 1. Three animals of three sizes
 *             (library pictures drawn at three sizes, the name under each) and four sentences about them: write the form of
 *             the word in ( ) (than: -er; the ... of the three: -est; very: the word itself). 2. A table: the child writes
 *             the two forms of six words (grey example rows first: the spelling moves big, bigger, biggest and happy,
 *             happier, happiest; level 2 and 3 also careful, more careful, most careful). Level 1: words with -er and -est;
 *             level 2: three that take -er and three that take more and most (the child decides); level 3: two of each and
 *             two that change (good, bad, well, badly).
 *   comparepick G3-525 Comparing Words: Choose the Right Form (L.3.1.g; day 1). Nine sentences, three real forms of one word
 *             under each: circle the one that fits. Level 1 -er and -est; level 2 more and most (and some -er); level 3
 *             five with good, bad, well, badly and four that ask the adjective or the adverb (careful or carefully).
 *   possess   G3-526 Possessive Nouns: One Owner or More (L.3.2.d; day 1). 1. Six owners and things ("Two dogs have bones."):
 *             write who owns it on a line that starts with "the". 2. Five sentences: circle the word that fits (the
 *             sentence before says how many owners there are, or the word is a plural with no owner). Level 1 one owner
 *             ('s) and plurals; level 2 one owner or more (s'); level 3 plurals that do not end in s too (children's).
 *   apostrophe G3-527 Add the Apostrophe: Fix the Possessives (L.3.2.d; day 2). The underlined word of a sentence is printed
 *             without an apostrophe: the child writes it the right way (some need none). Level 1: one sentence each, and
 *             the child decides by whether something owned follows the word (no number given); levels 2 and 3: a first
 *             sentence says how many there are. A plural that does not end in s is printed bare (children), never as a
 *             word that is no word.
 *   titles    G3-528 Capitals in Titles (L.3.2.a; day 2). The rule box with the small words. 1. Titles printed in small letters
 *             to write with the right capitals (level 1 eight titles of three words in two columns; level 2 six titles with
 *             a, the, of, and, in; level 3 five titles with a colon or a name). 2. The child writes the titles of three
 *             books he or she likes and a title for a report (answers vary).
 *   titlecircle G3-529 Find the Capitals in Titles (L.3.2.a; day 1). The rule box; titles in small letters: circle each word
 *             that needs a capital (level 1 eight, level 2 seven, level 3 six), then two titles printed two ways: circle the
 *             one written right.
 *
 * Every title follows ONE rule printed on the page: the first word, the last word and every other word but a, an, the,
 * and, but, or, of, in, on, to, at, for get a capital (level 3: and the first word after a colon); words whose
 * treatment style guides dispute (is, it, with, from, up, about, into ...) are never in a title. All titles are invented.
 * The places of the right answers are mixed and measured (never one place on every other item, never a repeating block).
 * Handwriting lines are single ruled lines 34 px high (about 11/32 in, wide-ruled notebook paper); a sentence the child
 * writes gets two full-width lines, measured at 45 letters a line (CPL). No blank band of more than 40 px between tasks.
 * Ligatures are off, and an f before i, f, l or t and a t before t get room of their own. English only; themeless: a
 * copy draws other sentences. PDF only. The bank is checked when this file loads (faultsOf), including that every level
 * of every page can be drawn. The instruction of each level is INSTR here (registered as strings; verify() reads it).
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/sentences-g3.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle } = _parts;

const READ = 18;         // a sentence the child reads
const LABEL = 17;        // a task line
const OPT = 20;          // a word or a form to circle
const ROW = 34;          // a handwriting line (single rule)
const RULEPX = 15.5;     // the rule box
const CPL = 45;          // a third grader writes about 45 letters across a full-width line: a written sentence gets lines for it
const GAP = 40;          // the largest blank band between tasks, cards or blocks (px)
const A = (s) => esc(s).replace(/"/g, '&quot;');

/** the page instruction of every level (registered as strings with add-strings.js; verify() reads it on the page) */
const INSTR = {
  join: { 1: 'A joining word can join two sentences into one sentence.', 2: 'A joining word shows how two ideas go together.', 3: 'Some joining words tell why, when, or what has to happen first.' },
  joinpick: { 1: 'A joining word shows how two ideas go together.', 2: 'Pick the joining word that makes sense with both ideas.', 3: 'Words like because, when, if, after, and before join ideas too.' },
  kinds: { 1: 'A compound sentence is two sentences joined with a comma and a joining word.', 2: 'Sentences can be simple, compound, or complex.', 3: 'A simple sentence can have two subjects or two verbs and still be simple.' },
  build: { 1: 'Two short sentences can make one compound sentence.', 2: 'Two short sentences can make a compound or a complex sentence.', 3: 'Joining short sentences makes your writing smoother.' },
  compare: { 1: 'Add -er to compare two things and -est to compare three or more.', 2: 'Most longer words use more and most: more careful.', 3: 'Some words change their form to compare. Learn them by heart.' },
  comparepick: { 1: 'Use -er with than. Use -est to compare three or more.', 2: 'Short words take -er and -est. Most longer words take more and most.', 3: 'Some words change their form to compare. Learn them by heart.' },
  possess: { 1: "Add 's to show that one owner has something: the bee's hive.", 2: "One owner: the bee's hive. More than one owner: the bees' hives.", 3: "Plurals that do not end in s take 's: the people's kites." },
  apostrophe: { 1: 'An apostrophe shows who owns something. A plural that owns nothing needs no apostrophe.', 2: 'Look at how many owners there are before you write the apostrophe.', 3: "Count the owners: the bee's hive, the bees' hives, the people's kites." },
  titles: { 1: 'In a title, the first word, the last word, and every important word get a capital.', 2: 'Small words like a, the, of, and in stay small in the middle of a title.', 3: 'A name always gets a capital. So does the first word after a colon.' },
  titlecircle: { 1: 'In a title, the first word, the last word, and every important word get a capital.', 2: 'Small words like a, the, of, and in stay small in the middle of a title.', 3: 'A name always gets a capital. So does the first word after a colon.' },
};
/** the task lines */
const LINES = {
  pick: { 1: 'Circle the joining word that fits. Write it in the blank. When <b>and</b>, <b>but</b>, or <b>so</b> joins two sentences, put a comma in front of it.', 2: 'Circle the joining word that fits. Write it in the blank. When <b>and</b>, <b>but</b>, <b>or</b>, or <b>so</b> joins two sentences, put a comma in front of it.', 3: 'Circle the joining word that fits. Write it in the blank. When <b>and</b>, <b>but</b>, <b>or</b>, or <b>so</b> joins two sentences, put a comma in front of it.' },
  join: 'Join the two sentences with a word from the box. Write the new sentence. Circle the joining word you used. Put a comma before <b>and</b>, <b>but</b>, <b>or</b>, <b>so</b>.',
  finish: 'Finish each sentence.',
  kinds: 'Read each sentence. Put a check mark under the kind of sentence it is.',
  build1: 'Join the two sentences to make one compound sentence.',
  build2: 'Write each pair as a compound and as a complex sentence.',
  build3: 'Write the pair as a compound and as a complex sentence.',
  para: 'Rewrite the paragraph. Make two compound sentences and one complex sentence.',
  trio: 'Write the right form of the word in ( ).',
  table: 'Write the two forms of each word, as in the example.',
  cmp: 'Circle the word that fits each sentence.',
  own: { 1: "Write who owns it. Use 's.", 2: "Write who owns it. Use 's or s'.", 3: "Write who owns it. Use 's or s'." },
  ownPick: 'Circle the word that fits.',
  fix: { 1: 'Read each sentence. Write the underlined word the right way. Some words do not need an apostrophe.', 2: 'Read the sentences. Write the underlined word the right way. Some words do not need an apostrophe.', 3: 'Read the sentences. Write the underlined word the right way. Some words do not need an apostrophe.' },
  titles: 'Write each title with capital letters where they belong.',
  own3: 'Write the titles of three books you like and a title for a report.',
  circle: 'Circle each word that needs a capital letter.',
  which: 'Circle the title that is written the right way.',
};
const SUB = ['because', 'when', 'if', 'after', 'before'];
const COORD = ['and', 'but', 'or', 'so'];

/* ------------------------------------------------------------------ words and rules */
const tok = (s) => String(s).toLowerCase().match(/[a-z]+(?:'[a-z]*)?/g) || [];
const hasW = (s, w) => tok(s).includes(String(w).toLowerCase());
const SUBRE = /\b(because|when|if|after|before|while|until|since|although)\b/i;
const COORDRE = /, (and|but|so|or) /;
/** a list of three words with series commas ("apples, pears, and plums") and after / before with no subject and verb of
 *  its own ("after lunch"): neither makes a sentence compound or complex, so both are read away before the kind is told */
const SERIESRE = /\b([a-z]+), ([a-z]+), (and|or) ([a-z]+)\b/;
const PREPRE = /\b(after|before) (lunch|bed|recess|breakfast|dinner|school)\b/i;
const plainOf = (s) => String(s).replace(SERIESRE, '$1 $2 $4').replace(PREPRE, '');
/** the kind of a sentence read from its words: simple, compound or complex (as the table asks) */
function kindOf(s) {
  const t = plainOf(s);
  const sub = (t.match(/\b(because|when|if|after|before|while|until|since|although)\b/gi) || []).length, co = (t.match(/, (and|but|so|or) /g) || []).length;
  if (sub === 1 && co === 0) return 'complex';
  if (co === 1 && sub === 0) return 'compound';
  if (co === 0 && sub === 0 && !/,/.test(t)) return 'simple';
  return 'none';
}
/** the key of a sentence the child writes, spread over its lines at the child's measure (CPL letters a line) */
function keyLines(s) {
  const out = []; let cur = '';
  for (const w of String(s).split(' ')) { if (cur && (cur + ' ' + w).length > CPL) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; }
  if (cur) out.push(cur);
  return out;
}
/** what the key prints after "Also right:" for an "and" that is right but weaker than the key's word */
const BETTER = { so: 'so tells the result better', because: 'because tells why better', when: 'when tells the time better', after: 'after tells the order better', before: 'before tells the order better', but: 'but shows the difference better' };
const alsoText = (sample, also, weak) => 'Also right: ' + [...also.filter((w) => !weak.includes(w)), ...also.filter((w) => weak.includes(w)).map((w) => `${w} (${BETTER[sample]})`)].join(', ');
/** the patterns a child could read off a column of answers or kinds: one value on every other item (three or more of
 *  them), runs of one length of two or more (three runs or more), or a block of two or more that repeats over two thirds
 *  of the column. Returns what it found ('' = none). */
function patternOf(o) {
  const n = o.length;
  for (const par of [0, 1]) { const sub = o.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
  const runs = []; o.forEach((x, i) => { if (i && x === o[i - 1]) runs[runs.length - 1]++; else runs.push(1); });
  if (runs.length >= 3 && runs[0] >= 2 && runs.slice(0, -1).every((r) => r === runs[0])) return 'runs of one length';
  for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (o[i + k] !== o[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
  return '';
}
/** title case under the page's one rule (small words small but first, last and after a colon) */
function titleCase(lc, small) {
  const ws = String(lc).split(' ');
  return ws.map((w, i) => { const bare = w.replace(/[:]$/, ''), afterColon = i > 0 && /:$/.test(ws[i - 1]);
    const keep = small.includes(bare) && i > 0 && i < ws.length - 1 && !afterColon;
    return keep ? w : w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
}
const isVowel = (w) => /^[aeiou]/i.test(w);
const an = (w) => (isVowel(w) ? 'an ' : 'a ') + w;
const NUMW = ['two', 'three'];
const posses = (N, kind) => (kind === 'one' ? N.one + "'s" : N.irr ? N.many + "'s" : N.many + "'");
/** the word printed without its apostrophe (G3-527): one owner as the plural a child writes by mistake (dogs), more than
 *  one owner and a plain plural as the bare plural (dogs, children: never a word that is no word, such as childrens) */
const unfixed = (N, kind) => (kind === 'one' ? N.one + 's' : N.many);
const formsOf = (w) => [...BANK.compare.words, ...BANK.compare.formsExtra].find((x) => x.base === w);
/** the words of a sentence that tell what it is about (four letters or more, not a joining word): a sentence to finish never
 *  shares one with a pair of its page (it would print the pair's answer) */
const STOP = new Set(['because', 'after', 'before', 'when', 'with', 'they', 'them', 'their', 'there', 'then', 'this', 'that', 'have', 'some', 'very', 'what', 'were', 'from', 'your', 'into', 'will']);
const content = (s) => tok(s).filter((w) => w.length >= 4 && !STOP.has(w));

/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(b) {
  const f = [];
  const C = b.conj || {}, WORDS = C.words || [];
  if (WORDS.join() !== 'and,but,or,so,because,when,if,after,before') f.push('joining words: not and, but, or, so, because, when, if, after, before');
  if ((C.levels || {})[1] + '' !== 'and,but,so' || (C.levels || {})[2] + '' !== 'and,but,or,so,because' || (C.levels || {})[3] + '' !== WORDS.join()) f.push('joining words: the levels are not 1 and, but, so; 2 and, but, or, so, because; 3 all nine');
  WORDS.forEach((w) => { if (!(C.jobs || {})[w]) f.push(`joining words: "${w}" has no job`); });
  // G3-521: one blank, no comma before it, the key fits, every word judged
  const seenT = new Set();
  (b.pick || []).forEach((p) => {
    if (seenT.has(p.t)) f.push(`pick: "${p.t}" twice`); seenT.add(p.t);
    if ((String(p.t).split('___').length - 1) !== 1 || !/^[A-Z]/.test(p.t) || !/[.?]$/.test(p.t)) f.push(`pick: "${p.t}" is not one sentence with one blank`);
    if (/,\s*___/.test(p.t) || /___\s*,/.test(p.t)) f.push(`pick: "${p.t}" prints a comma at the blank (it would tell the answer)`);
    if (!WORDS.includes(p.k) || !Array.isArray(p.fits) || !p.fits.includes(p.k) || p.fits.some((w) => !WORDS.includes(w)) || new Set(p.fits).size !== p.fits.length) f.push(`pick: "${p.t}" is not keyed to a joining word that fits`);
    if (/\?$/.test(p.t) !== (p.k === 'or')) f.push(`pick: "${p.t}": only the or-sentences ask a question`);
    if (p.k === 'so' && p.fits.includes('but')) f.push(`pick: "${p.t}": but fits a so-sentence (a result that fixes a problem)`);
    if (p.k === 'but' && p.fits.includes('so')) f.push(`pick: "${p.t}": so fits a but-sentence`);
    if (/[,;]/.test(String(p.t).replace(/,? ___/, ''))) f.push(`pick: "${p.t}" has a comma of its own`);
    { const rest = String(p.t).replace('___', ' ').replace(/water and sun/, ''); if (WORDS.some((w) => hasW(rest, w))) f.push(`pick: "${p.t}" prints a joining word of its own`); }
    // out: the words of because, when, if, after, before that common sense rules out (level 3 offers one of them)
    if (p.out !== undefined && (!SUB.includes(p.k) || !Array.isArray(p.out) || !p.out.length || p.out.some((w) => !SUB.includes(w) || w === p.k || p.fits.includes(w)))) f.push(`pick: "${p.t}": its out words are not words of because, when, if, after, before that do not fit`);
  });
  for (const k of SUB) if ((b.pick || []).filter((p) => p.k === k && (p.out || []).length).length < 2) f.push(`pick: fewer than two ${k}-sentences with a word that common sense rules out (level 3)`);
  // G3-520: the pairs and their right joins
  const lc1 = (s) => String(s).replace(/\.$/, '');
  (b.pairs || []).forEach((p) => {
    if (!/^[A-Z][^.?!]*\.$/.test(p.a) || !/^[A-Z][^.?!]*\.$/.test(p.b)) f.push(`pairs: "${p.a} ${p.b}" are not two short telling sentences`);
    if (!Array.isArray(p.forms) || !p.forms.length || new Set(p.forms.map((x) => x[0])).size !== p.forms.length) f.push(`pairs: "${p.a}" has no right joins, or a word twice`);
    // every one of the nine words is judged: it makes a true, natural sentence of the pair (forms) or it does not (not)
    { const fw = (p.forms || []).map((x) => x[0]), nw = p.not || []; if (fw.length + nw.length !== WORDS.length || WORDS.some((w) => fw.includes(w) === nw.includes(w))) f.push(`pairs: "${p.a}": the nine joining words are not each judged once (forms or not)`); }
    if ((p.weak || []).some((w) => !(p.forms || []).some((x) => x[0] === w))) f.push(`pairs: "${p.a}": a weaker word is not a right join`);
    if ((p.forms || []).length && (p.weak || []).includes(p.forms[0][0])) f.push(`pairs: "${p.a}": the first join is a weaker one`);
    (p.forms || []).forEach(([w, s]) => {
      if (!WORDS.includes(w) || !hasW(s, w) || !/^[A-Z].*\.$/.test(s)) f.push(`pairs: the join "${s}" does not use "${w}"`);
      if (COORD.includes(w)) { if ((lc1(p.a) + ', ' + w + ' ' + p.b).toLowerCase() !== s.toLowerCase()) f.push(`pairs: "${s}" is not "${lc1(p.a)}, ${w} ..." with a comma before ${w}`); }
      else if (new RegExp('^' + w + ' ', 'i').test(s) ? (s.match(/,/g) || []).length !== 1 : /,/.test(s)) f.push(`pairs: "${s}": a comma only after a part that starts with ${w}`);
      if (!COORD.includes(w)) { const content = tok(p.a + ' ' + p.b).filter((x) => x.length >= 4 && !['they', 'them', 'their', 'there'].includes(x)); if (content.filter((x) => !tok(s).includes(x)).length > 1) f.push(`pairs: "${s}" leaves out words of the two sentences`); }
    });
  });
  (b.stems || []).forEach((s) => {
    if (!WORDS.includes(s.w) || !new RegExp((COORD.includes(s.w) ? ', ' : '[a-z] ') + s.w + '$').test(s.s) || (!COORD.includes(s.w) && /,/.test(s.s)) || !/^([a-z]|I ).*\.$/.test(s.sample || '')) f.push(`stems: "${s.s}" does not end in its joining word (with a comma before and, but, or, so only), or has no sample`);
  });
  // G3-522 and G3-523
  const K = b.kinds || {};
  for (const [set, want, n] of [['simple', 'simple', 14], ['compound', 'compound', 12], ['complex', 'complex', 12]]) {
    const L = K[set] || [];
    if (L.length < n || new Set(L).size !== L.length) f.push(`kinds: fewer than ${n} different ${set} sentences`);
    L.forEach((s) => { if (kindOf(s) !== want || !/^[A-Z].*\.$/.test(s)) f.push(`kinds: "${s}" is not a ${want} sentence (read from its words)`);
      if (set === 'simple' && /\b(and|or|but|so)\b/i.test(s)) f.push(`kinds: the simple sentence "${s}" has and, or, but or so in it`);
      if (set !== 'complex' && SUBRE.test(s)) f.push(`kinds: "${s}" has because, when, if, after or before in it`);
      if (set === 'complex' && (s.match(/,/g) || []).length !== (SUBRE.test(s.split(' ')[0]) ? 1 : 0)) f.push(`kinds: the complex sentence "${s}": a comma only after a first part that starts with its joining word`);
      if (/\bowls?\b/i.test(s)) f.push(`kinds: "${s}" is about owls (the examples of the box)`); });
  }
  (K.two || []).forEach((x) => { if (kindOf(x.t) !== 'simple' || (x.t.match(/ and /g) || []).length !== 1 || !['subjects', 'verbs'].includes(x.two) || /,/.test(x.t)) f.push(`kinds: "${x.t}" is not a simple sentence with two subjects or two verbs`); });
  // simple sentences with series commas (a list of three words), and with after or before that has no subject and verb
  (K.series || []).forEach((s) => { if (!/^[A-Z].*\.$/.test(s) || !SERIESRE.test(s) || (s.match(/,/g) || []).length !== 2 || kindOf(s) !== 'simple' || SUBRE.test(s) || /\bowls?\b/i.test(s)) f.push(`kinds: "${s}" is not a simple sentence with a list of three words`); });
  if ((K.series || []).length < 4) f.push('kinds: fewer than four simple sentences with series commas');
  (K.prep || []).forEach((s) => { if (!/^[A-Z].*\.$/.test(s) || !PREPRE.test(s) || /,/.test(s) || kindOf(s) !== 'simple' || (s.match(/\b(because|when|if|after|before|while|until|since|although)\b/gi) || []).length !== 1 || /\b(and|or|but|so)\b/i.test(s) || /\bowls?\b/i.test(s)) f.push(`kinds: "${s}" is not a simple sentence with after or before and no subject and verb after it`); });
  if ((K.prep || []).length < 3) f.push('kinds: fewer than three simple sentences with after or before and no subject and verb after it');
  if ((K.two || []).filter((x) => x.two === 'subjects').length < 3 || (K.two || []).filter((x) => x.two === 'verbs').length < 3) f.push('kinds: fewer than three sentences with two subjects and three with two verbs');
  const EX = K.examples || {};
  if (kindOf(EX.simple) !== 'simple' || kindOf(EX.compound) !== 'compound' || kindOf(EX.complex) !== 'complex' || kindOf(EX.two) !== 'simple') f.push('kinds: an example of the box is not of its kind');
  if (kindOf(EX.complexFirst) !== 'complex' || !/^(When|Because|If|After|Before) [^,]+, [a-z]/.test(EX.complexFirst || '')) f.push('kinds: the example of the comma rule is not a complex sentence that starts with its part that cannot stand alone');
  const comp = (p, w) => (lc1(p.a) + ', ' + w + ' ' + p.b).toLowerCase();
  const BU = b.build || {};
  (BU.themes || []).forEach((th) => {
    if (!th.name || (th.pairs || []).length < 5) f.push(`build: the story "${th.name}" has fewer than five pairs`);
    (th.pairs || []).forEach((p) => {
      const m = String(p.comp).match(/, (and|but|so|or) /);
      if (!m || p.comp.toLowerCase() !== comp(p, m[1])) f.push(`build: "${p.comp}" is not the compound sentence of "${p.a} ${p.b}"`);
      if (kindOf(p.cx) !== 'complex') f.push(`build: "${p.cx}" is not a complex sentence`);
      if ([p.a, p.b].some((s) => kindOf(s) !== 'simple' || / and /.test(s))) f.push(`build: "${p.a} ${p.b}" are not two simple sentences`);
      { const content = tok(p.a + ' ' + p.b).filter((x) => x.length >= 4 && !['they', 'them', 'their'].includes(x)); if (content.filter((x) => !tok(p.cx).includes(x)).length > 1) f.push(`build: "${p.cx}" leaves out words of the two sentences`); }
    });
  });
  { const as = [...(BU.themes || []).flatMap((t) => t.pairs.map((p) => p.a)), ...(BU.compOnly || []).map((p) => p.a)]; if (new Set(as).size !== as.length) f.push('build: two pairs start with one sentence'); }
  (BU.themes || []).forEach((th) => (th.pairs || []).forEach((p, i) => { if (/^(She|He|They)\b/.test(p.a) && i > 0) f.push(`build: "${p.a}" starts a pair of "${th.name}" with a word that points to a pair the paragraph may leave out`); }));
  (BU.compOnly || []).forEach((p) => { const m = String(p.comp).match(/, (and|but|so|or) /); if (!m || p.comp.toLowerCase() !== comp(p, m[1])) f.push(`build: "${p.comp}" is not the compound sentence of "${p.a} ${p.b}"`); });
  // G3-524 and G3-525
  const CM = b.compare || {}, both = new Set(CM.bothForms || []);
  const allW = [...(CM.words || []), ...(CM.formsExtra || [])];
  allW.forEach((x) => {
    if (both.has(x.base)) f.push(`compare: "${x.base}" takes both forms in common use`);
    const ok = x.form === 'er' ? /er$/.test(x.comp) && /est$/.test(x.sup) && !/^more /.test(x.comp) : x.form === 'more' ? x.comp === 'more ' + x.base && x.sup === 'most ' + x.base : x.form === 'irr' && ['good better best', 'bad worse worst', 'well better best', 'badly worse worst'].includes([x.base, x.comp, x.sup].join(' '));
    if (!ok || !['adj', 'adv'].includes(x.kind)) f.push(`compare: the forms of "${x.base}" are not ${x.form} forms`);
    if (/more better|more worse|most best|more good/.test(x.comp + x.sup)) f.push(`compare: "${x.comp}" doubles a comparison`);
  });
  if (new Set(allW.map((x) => x.base)).size !== allW.length) f.push('compare: a word stands twice');
  (CM.trios || []).forEach((tr) => { if (tr.length !== 3 || new Set(tr.map((x) => x[0])).size !== 3 || tr.some((x) => x[0] !== x[2].replace(/_.*/, '') || /(^| )bw( \d+)?$/i.test(x[1]))) f.push(`compare: the animals ${tr.map((x) => x[0]).join(', ')} are not three colour pictures named with their word`); });
  if ((CM.trios || []).length < 6) f.push('compare: fewer than six sets of three animals');
  (CM.trioLines || []).forEach((x) => {
    const sig = x.want === 'comp' ? /___ than the \{[SML]\}\.$/ : x.want === 'sup' ? /the ___ of the three\.$/ : /very ___\.$/;
    if (!sig.test(x.t) || !['big', 'small', 'heavy', 'tall', 'short'].includes(x.w)) f.push(`compare: "${x.t}" does not decide its form (${x.want})`);
    const m = x.t.match(/^The \{([SML])\} is (?:___ than the \{([SML])\}|the ___ of the three|very ___)\.$/);
    if (!m) { f.push(`compare: "${x.t}" is not a sentence about the three animals`); return; }
    const big = { S: 0, M: 1, L: 2 }, a = big[m[1]], c = m[2] ? big[m[2]] : null;
    if (x.want === 'comp' && (['big', 'heavy', 'tall'].includes(x.w) ? a <= c : a >= c)) f.push(`compare: "${x.t}" (${x.w}) is not true of three animals of three sizes`);
    if (x.want === 'comp' && ['tall', 'short', 'heavy'].includes(x.w) && Math.abs(a - c) !== 2) f.push(`compare: "${x.t}" compares a ${x.w} of two animals whose difference may be small`);
    if (x.want === 'sup' && (x.w === 'small' ? a !== 0 : a !== 2)) f.push(`compare: "${x.t}" is not true`);
    if (x.want === 'base' && (x.w === 'small' ? a !== 0 : a !== 2)) f.push(`compare: "${x.t}" is not true`);
  });
  for (const lv of [1, 2, 3]) (((CM.cmp || {})[lv]) || []).forEach((x) => {
    const F = allW.find((y) => y.base === x.w);
    if (!F || (String(x.t).split('___').length - 1) !== 1) { f.push(`compare: "${x.t}" has no forms of "${x.w}" or not one blank`); return; }
    // "than anyone else" compares with everyone (the page's rule says -est for three or more)
    if (/\bthan (anyone|anybody|anything|any other|everyone|everybody|all)\b/i.test(x.t)) f.push(`compare: "${x.t}" compares with everyone after than`);
    const opts = x.opts || [F.base, F.comp, F.sup];
    if (opts.length !== 3 || new Set(opts).size !== 3 || !opts.includes(x.right) || opts.some((o) => !allW.some((y) => [y.base, y.comp, y.sup].includes(o)))) f.push(`compare: "${x.t}" does not offer three real forms with its answer`);
    if (opts.some((o) => /more better|more worse|most best/.test(o))) f.push(`compare: "${x.t}" offers a doubled form`);
    const right = allW.find((y) => [y.base, y.comp, y.sup].includes(x.right)), want = right && (right.comp === x.right ? 'comp' : right.sup === x.right ? 'sup' : 'base');
    const sig = want === 'comp' ? /___ than\b/.test(x.t) || /___ [a-z ]+ than\b/.test(x.t) : want === 'sup' ? /\bthe ___/.test(x.t) && /\b(of all|in the|on Earth|ever|of anyone|in our|in town|so far|of my|in my|of the)\b/i.test(x.t) : !/\bthan\b|\bthe ___/.test(x.t);
    if (!sig) f.push(`compare: "${x.t}" does not decide "${x.right}" by its words`);
    if (want === 'base' && !x.opts && !/\b(very|too|as) ___/.test(x.t)) f.push(`compare: "${x.t}": the word itself needs very, too or as ... as`);
    if (lv < 3 && x.opts) f.push(`compare: "${x.t}": the adjective or the adverb belongs to level 3`);
    if (lv === 1 && F.form !== 'er') f.push(`compare: "${x.t}" is not an -er word on level 1`);
    if (lv === 3 && !x.opts && F.form !== 'irr') f.push(`compare: "${x.t}" is no word that changes, on level 3`);
  });
  // G3-526 and G3-527
  const PO = b.possess || {}, OWN = PO.owners || [];
  const byOne = Object.fromEntries(OWN.map((n) => [n.one, n]));
  OWN.forEach((n) => {
    if (/s$/.test(n.one)) f.push(`possess: "${n.one}" ends in s`);
    if (n.irr !== (n.many !== n.one + 's') || /s$/.test(n.many) === n.irr) f.push(`possess: "${n.one}, ${n.many}" is not filed as a plural with s or a plural without s`);
    if (!(n.things || []).length || n.things.some(([t, ts]) => ts !== t + 's')) f.push(`possess: the things of "${n.one}" are not one thing and things (+ s)`);
  });
  if (OWN.filter((n) => n.irr).length < 4) f.push('possess: fewer than four plurals that do not end in s');
  (PO.plain || []).forEach((p) => { if (!byOne[p.n] || (String(p.t).split('___').length - 1) !== 1 || hasW(p.t.replace('___', ''), p.n) || hasW(p.t.replace('___', ''), (byOne[p.n] || {}).many)) f.push(`possess: "${p.t}" is no plural sentence about one noun`);
    if (!['are', 'ran', 'played', 'sat', 'chased', 'like', 'hopped', 'flew', 'worked', 'came', 'walked', 'made', 'galloped', 'fixed', 'sang', 'swam', 'at'].includes((String(p.t).split('___')[1] || '').trim().split(' ')[0])) f.push(`possess: in "${p.t}" a thing follows the blank (an owner could stand there)`); });
  (PO.fix || []).forEach((x) => {
    const N = byOne[x.n];
    if (!N) { f.push(`possess: "${x.n}" is no owner`); return; }
    if (!new RegExp('\\b(one|One) (art )?(new )?' + N.one + '\\b').test(x.ctx.one) || !new RegExp('\\b(two|three|four|Two|Three) (art )?(new )?' + N.many + '\\b').test(x.ctx.many)) f.push(`possess: the first sentences of "${x.n}" do not say one and more than one`);
    for (const k of ['one', 'many', 'plain']) if ((String(x[k]).split('___').length - 1) !== 1) f.push(`possess: "${x[k]}" has not one blank`);
    // level 1 gives no number: a sentence of one owner never holds a number word or both
    if (/\b(one|two|three|four|five|six|both|many|several)\b/i.test(x.one)) f.push(`possess: "${x.one}" (one owner) holds a number word or both`);
    if (!/^(The|My) ___ [a-z]+/.test(x.one) || !/^(The|My) ___ [a-z]+/.test(x.many) || /^(The|My) ___ (are|is|was|were|ran|like|run|sleep|want|sing|play|pick|hang|eat|roll|rested|wrote|worked|bake|swim|ate)\b/.test(x.one)) f.push(`possess: in "${x.one}" no thing follows the owner`);
    if (!/^(The|My) ___ (like|run|sleep|want|sing|play|pick|hang|eat|roll|rested|wrote|worked|bake|swim|ate)\b/.test(x.plain)) f.push(`possess: in "${x.plain}" the word is not a plural with a verb after it`);
  });
  // G3-528 and G3-529
  const TI = b.titles || {}, SM = TI.small || [], NEV = new Set(TI.never || []), NAMES = new Set((TI.names || []).map((x) => x.toLowerCase()));
  if (SM.join() !== 'a,an,the,and,but,or,of,in,on,to,at,for') f.push('titles: the small words are not a, an, the, and, but, or, of, in, on, to, at, for');
  if (['with', 'from', 'about', 'into'].some((w) => !NEV.has(w))) f.push('titles: with, from, about, or into is not kept out of the titles');
  const allT = [1, 2, 3].flatMap((lv) => ((TI.list || {})[lv] || []).map((x) => x[0]));
  if (new Set(allT).size !== allT.length) f.push('titles: a title stands twice');
  for (const lv of [1, 2, 3]) ((TI.list || {})[lv] || []).forEach(([t, kind]) => {
    const ws = t.split(' '), bare = ws.map((w) => w.replace(/:$/, '')), named = bare.some((w) => NAMES.has(w)), colon = /:/.test(t);
    if (t !== t.toLowerCase() || !/^[a-z]+(:? [a-z.]+)*$/.test(t) || !['book', 'story', 'song'].includes(kind)) f.push(`titles: "${t}" is not a title in small letters with its kind`);
    bare.forEach((w) => { if (NEV.has(w)) f.push(`titles: "${t}" has "${w}", whose capital style guides dispute`); });
    if (lv === 1 && (ws.length !== 3 || named || colon)) f.push(`titles: "${t}" is not a title of three words without a name`);
    if (lv === 2 && (ws.length < 4 || ws.length > 7 || named || colon || !bare.slice(1, -1).some((w) => SM.includes(w)))) f.push(`titles: "${t}" is not a level-2 title with a small word in the middle`);
    if (lv === 3 && !named && !colon) f.push(`titles: "${t}" has no colon and no name`);
    if (lv === 3 && colon && (t.match(/:/g) || []).length !== 1) f.push(`titles: "${t}" has two colons`);
    if (Object.values(TI.examples || {}).some((e) => e.toLowerCase() === t)) f.push(`titles: "${t}" is an example of the rule box`);
  });
  Object.entries(TI.examples || {}).forEach(([lv, e]) => { if (titleCase(e.toLowerCase(), SM) !== e) f.push(`titles: the example "${e}" does not follow the rule`); });
  // every level of every page can be drawn
  if (!f.length) for (const mode of Object.keys(LEVELS)) for (const lv of [1, 2, 3]) for (let s = 1; s <= 6; s++) {
    try { plan(b, mode, lv, makeRng('sentences-g3|' + mode + '|' + lv + '|' + s)); } catch (e) { f.push(`${mode} level ${lv} cannot be drawn: ${e.message}`); break; }
  }
  return f;
}

/* ------------------------------------------------------------------ levels */
const LEVELS = {
  joinpick: { 1: { n: 8, opts: 2 }, 2: { n: 7, opts: 3 }, 3: { n: 7, opts: 3 } },
  join: { 1: { pairs: 4, stems: 3 }, 2: { pairs: 4, stems: 2 }, 3: { pairs: 3, stems: 2 } },
  kinds: { 1: { n: 10, cols: ['simple', 'compound'], colW: 104, twoLines: 6, series: 2 }, 2: { n: 12, cols: ['simple', 'compound', 'complex'], colW: 80, twoLines: 6, series: 1 }, 3: { n: 12, cols: ['simple', 'compound', 'complex'], two: 2, prep: 1, colW: 80, twoLines: 5 } },
  build: { 1: { pairs: 6 }, 2: { pairs: 3, both: true }, 3: { pairs: 1, both: true, para: true, lines: 6 } },
  compare: { 1: { lines: 4, er: 6, more: 0, irr: 0, ex: ['big', 'happy'] }, 2: { lines: 4, er: 3, more: 3, irr: 0, ex: ['big', 'happy', 'careful'] }, 3: { lines: 4, er: 2, more: 2, irr: 2, ex: ['big', 'happy', 'careful'] } },
  comparepick: { 1: { n: 8 }, 2: { n: 8 }, 3: { n: 7, irr: 4, ad: 3 } },
  possess: { 1: { own: { one: 6 }, pick: { one: 2, plain: 2 }, opts: 2 }, 2: { own: { one: 3, many: 3 }, pick: { one: 1, many: 2, plain: 1 }, opts: 3 }, 3: { own: { one: 2, many: 2, imany: 2 }, pick: { one: 1, many: 1, imany: 1, iplain: 1 }, opts: 3 } },
  apostrophe: { 1: { kinds: { one: 5, plain: 5 } }, 2: { kinds: { one: 3, many: 3, plain: 2 } }, 3: { kinds: { one: 3, many: 3, plain: 2 }, irr: 3 } },
  titles: { 1: { n: 8, cols: 2 }, 2: { n: 6, cols: 1 }, 3: { n: 5, cols: 1 } },
  titlecircle: { 1: { n: 8, which: 2 }, 2: { n: 7, which: 2 }, 3: { n: 6, which: 2 } },
};

/* ------------------------------------------------------------------ the places of right answers */
/** n answers among m places: every place used (n >= m), no place more than half (two places: 60 %), never three in a row
 *  in one place, never a staircase of three, two places never alternating more than four times or all the way */
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
/** an order of kinds (counts given) with no three alike in a row, never every other one, never a repeating cycle */
function kindOrder(counts, rng) {
  const bag = Object.entries(counts).flatMap(([k, c]) => Array(c).fill(k));
  for (let t = 0; t < 5000; t++) { const o = shuffle(bag, rng); if (orderOk(o)) return o; }
  throw new Error('no mixed order of ' + JSON.stringify(counts));
}
function orderOk(o) {
  if (o.some((x, i) => i >= 2 && x === o[i - 1] && x === o[i - 2])) return false;
  const kinds = [...new Set(o)];
  if (kinds.length === 2 && o.every((x, i) => !i || x !== o[i - 1])) return false;
  if (kinds.length === 2 && /(ab){3}|(ba){3}/.test(o.map((x) => (x === kinds[0] ? 'a' : 'b')).join(''))) return false;
  const k = kinds.length; if (k >= 3 && o.length > k && o.every((x, i) => i < k || x === o[i - k])) return false;
  // a rhythm: the order repeats itself with a period of 2, 3 or 4, all but once
  for (let p = 2; p <= 4; p++) if (o.length >= 2 * p + 2 && o.filter((x, i) => i >= p && x === o[i - p]).length >= o.length - p - 1) return false;
  if (patternOf(o)) return false;
  return true;
}

/* ------------------------------------------------------------------ what a page holds */
function plan(b, mode, lv, rng) {
  const d = LEVELS[mode][lv];
  const LW = b.conj.levels[lv];
  if (mode === 'joinpick') {
    const need = d.opts - 1;
    // level 3: a because / when / if / after / before item stands only with a word of that group that common sense rules out
    const usable = b.pick.filter((p) => LW.includes(p.k) && LW.filter((w) => !p.fits.includes(w)).length >= need && (lv < 3 || !SUB.includes(p.k) || (p.out || []).length));
    // the keys of the page: level 1 three, three and two of and, but, so; level 2 every word; level 3 when, if, after, before, because and two of and, but, or, so
    const plans = { 1: () => shuffle(['and', 'and', 'but', 'but', 'so', 'so', ...shuffle(['and', 'but', 'so'], rng).slice(0, 2)], rng),
      2: () => shuffle(['and', 'but', 'or', 'so', 'because', 'because', ...shuffle(['and', 'but', 'or', 'so'], rng).slice(0, 1)], rng),
      3: () => shuffle(['when', 'if', 'after', 'before', 'because', ...shuffle(['and', 'but', 'or', 'so'], rng).slice(0, 2)], rng) };
    for (let t = 0; t < 400; t++) {
      const keys = plans[lv](), used = new Set(), items = [];
      for (const k of keys) { const c = shuffle(usable.filter((p) => p.k === k && !used.has(p.t)), rng)[0]; if (!c) break; used.add(c.t); items.push(c); }
      if (items.length !== d.n || !orderOk(items.map((p) => p.k))) continue;
      const at = places(d.n, d.opts, rng);
      const out = items.map((p, i) => {
        let wrong;
        if (lv === 3 && SUB.includes(p.k)) { const o = shuffle(p.out, rng)[0]; wrong = shuffle([o, ...shuffle(LW.filter((w) => !p.fits.includes(w) && w !== o), rng).slice(0, need - 1)], rng); }
        else wrong = shuffle(LW.filter((w) => !p.fits.includes(w)), rng).slice(0, need);
        const opts = wrong.slice(); opts.splice(at[i], 0, p.k); return { t: p.t, k: p.k, opts }; });
      return { mode, lv, items: out, words: LW, list: out.map((x) => 'pick:' + x.t) };
    }
    throw new Error('no page of joining-word sentences');
  }
  if (mode === 'join') {
    const preferSub = lv === 3;
    const sampleOf = (p) => { const ok = p.forms.filter(([w]) => LW.includes(w)); if (!ok.length) return null; const s = preferSub ? (ok.find(([w]) => SUB.includes(w)) || ok[0]) : ok[0]; const also = ok.filter((x) => x !== s).map((x) => x[0]); return { w: s[0], s: s[1], also, weak: (p.weak || []).filter((w) => also.includes(w)) }; };
    for (let t = 0; t < 400; t++) {
      const ps = shuffle(b.pairs.filter((p) => sampleOf(p)), rng).slice(0, d.pairs).map((p) => ({ a: p.a, b: p.b, ...sampleOf(p) }));
      const ws = ps.map((p) => p.w);
      if (ps.length < d.pairs || new Set(ws).size < 3 || Math.max(...ws.map((w) => ws.filter((x) => x === w).length)) > 2) continue;
      if (lv >= 2 && !ws.some((w) => ['because', 'or'].includes(w))) continue;
      if (lv === 3 && ws.filter((w) => SUB.includes(w)).length < 3) continue;
      const stems = [];
      const pw = new Set(ps.flatMap((p) => content(p.a + ' ' + p.b)));
      for (const s of shuffle(b.stems.filter((s) => LW.includes(s.w) && !content(s.s + ' ' + s.sample).some((w) => pw.has(w))), rng)) if (stems.length < d.stems && !stems.some((x) => x.w === s.w)) stems.push(s);
      if (stems.length < d.stems || (lv === 3 && stems.filter((s) => SUB.includes(s.w)).length < 2) || (lv === 2 && !stems.some((s) => s.w === 'because'))) continue;
      return { mode, lv, pairs: ps, stems, words: LW, list: [...ps.map((p) => 'pair:' + p.a), ...stems.map((s) => 'stem:' + s.s)] };
    }
    throw new Error('no page of pairs to join');
  }
  if (mode === 'kinds') {
    const K = b.kinds, per = d.cols.length === 2 ? { simple: 5, compound: 5 } : { simple: 4, compound: 4, complex: 4 };
    // the sentence column: the page body less the row's padding, its number, the check columns and 8 px; at 17 px a letter of
    // this font is about 8.9 px wide (a sentence wider than its column takes two lines)
    const room = W - 24 - 20 - 32 - d.cols.length * d.colW - 8, twoLine = (t) => t.length * 8.9 > room;
    for (let tries = 0; tries < 400; tries++) {
    const order = kindOrder(per, rng);
    const special = [...shuffle(K.two, rng).slice(0, d.two || 0).map((x) => x.t), ...shuffle(K.series, rng).slice(0, d.series || 0), ...shuffle(K.prep, rng).slice(0, d.prep || 0)];
    const simple = [...special, ...shuffle(K.simple, rng).slice(0, per.simple - special.length)];
    const q = { simple: shuffle(simple, rng), compound: shuffle(K.compound, rng).slice(0, per.compound), complex: shuffle(K.complex, rng).slice(0, per.complex || 0) };
    const rows = order.map((k) => ({ t: q[k].shift(), kind: k }));
    if (rows.filter((r) => twoLine(r.t)).length > d.twoLines) continue;
    return { mode, lv, rows, list: rows.map((r) => 'kind:' + r.t) };
    }
    throw new Error('no copy of the kinds table that fits the page');
  }
  if (mode === 'build') {
    const th = b.build.themes;
    if (lv === 1) {
      const pool = [...b.build.compOnly.map((p) => ({ ...p, from: 'only' })), ...th.flatMap((x) => x.pairs.map((p) => ({ ...p, from: x.name })))];
      for (let t = 0; t < 400; t++) {
        const ps = shuffle(pool, rng).slice(0, d.pairs), ws = ps.map((p) => p.comp.match(/, (and|but|so|or) /)[1]);
        if (new Set(ws).size < 3 || Math.max(...ws.map((w) => ws.filter((x) => x === w).length)) > 3 || new Set(ps.map((p) => p.from)).size < 4) continue;
        return { mode, lv, pairs: ps, list: ps.map((p) => 'pair:' + p.a) };
      }
      throw new Error('no page of pairs');
    }
    if (lv === 2) {
      const themes = shuffle(th, rng).slice(0, d.pairs);
      const ps = themes.map((x) => ({ ...shuffle(x.pairs, rng)[0], from: x.name }));
      return { mode, lv, pairs: ps, list: ps.map((p) => 'pair:' + p.a) };
    }
    const [story, other] = shuffle(th, rng);
    const at0 = rng.int(0, story.pairs.length - 3);
    const para = story.pairs.slice(at0, at0 + 3);
    const one = { ...shuffle(other.pairs, rng)[0], from: other.name };
    // the sample of the key: two compound sentences and one complex sentence, the complex one in a place drawn
    const cxAt = rng.int(0, 2);
    return { mode, lv, pairs: [one], story: story.name, para, cxAt, list: ['pair:' + one.a, ...para.map((p) => 'para:' + p.a)] };
  }
  if (mode === 'compare') {
    const CM = b.compare;
    const trio = rng.sample(CM.trios, 1)[0];
    let lines;
    // an example row prints its forms: no sentence about the animals asks a word of an example row
    for (let t = 0; t < 400; t++) {
      lines = shuffle(CM.trioLines.filter((x) => !d.ex.includes(x.w)), rng).slice(0, d.lines);
      const wants = lines.map((x) => x.want);
      if (wants.filter((x) => x === 'comp').length >= 2 && wants.filter((x) => x === 'sup').length === 1 && wants.filter((x) => x === 'base').length === 1 && new Set(lines.map((x) => x.w + x.want)).size === lines.length) break;
      lines = null;
    }
    if (!lines) throw new Error('no four sentences about the animals');
    const names = { S: trio[0][0], M: trio[1][0], L: trio[2][0] };
    const sent = lines.map((x) => { const F = formsOf(x.w); return { t: x.t.replace(/\{([SML])\}/g, (m, k) => names[k]), w: x.w, want: x.want, right: F[x.want === 'base' ? 'base' : x.want] }; });
    // long: the level-2 instruction says "longer words" (it would print the answer longer)
    const avoid = new Set(['big', 'small', 'heavy', 'tall', 'short', 'long', ...d.ex]);
    const tw = (form, n, kind) => shuffle(CM.words.filter((x) => x.form === form && !avoid.has(x.base) && (!kind || x.kind === kind)), rng).slice(0, n);
    let rows;
    for (let t = 0; t < 400; t++) {
      rows = [...tw('er', d.er), ...tw('more', d.more), ...tw('irr', d.irr)];
      if (rows.some((x) => x.kind === 'adv') && (lv === 1 || rows.some((x) => x.kind === 'adj' && x.form !== 'er'))) break;
    }
    rows = shuffle(rows, rng);
    // the order on the strip: drawn, but never small, middle, big (or big, middle, small) from the left
    let order; do { order = shuffle([0, 1, 2], rng); } while (/012|210/.test(order.join('')));
    return { mode, lv, trio, order, sent, rows, examples: d.ex, list: ['trio:' + trio.map((x) => x[0]).join('/'), ...sent.map((s) => 'line:' + s.t + s.w), ...rows.map((r) => 'word:' + r.base)] };
  }
  if (mode === 'comparepick') {
    const pool = b.compare.cmp[lv];
    for (let t = 0; t < 600; t++) {
      let items;
      if (lv === 3) items = [...shuffle(pool.filter((x) => !x.opts), rng).slice(0, d.irr), ...shuffle(pool.filter((x) => x.opts), rng).slice(0, d.ad)];
      else items = shuffle(pool, rng).slice(0, d.n);
      items = shuffle(items, rng);
      const answers = items.map((x) => x.right), ws = items.map((x) => x.w);
      if (new Set(answers).size !== items.length || (lv < 3 && new Set(ws).size !== items.length)) continue;
      const kinds = items.filter((x) => !x.opts).map((x) => { const F = formsOf(x.w); return F.comp === x.right ? 'comp' : F.sup === x.right ? 'sup' : 'base'; });
      if (lv < 3 && (kinds.filter((k) => k === 'comp').length < 2 || kinds.filter((k) => k === 'sup').length < 2 || !kinds.includes('base'))) continue;
      const at = places(items.length, 3, rng);
      const out = items.map((x, i) => { const F = formsOf(x.w), all = x.opts || [F.base, F.comp, F.sup]; const wrong = shuffle(all.filter((o) => o !== x.right), rng); wrong.splice(at[i], 0, x.right); return { t: x.t, w: x.w, right: x.right, opts: wrong, ad: !!x.opts }; });
      return { mode, lv, items: out, list: out.map((x) => 'cmp:' + x.t) };
    }
    throw new Error('no page of forms to choose');
  }
  if (mode === 'possess' || mode === 'apostrophe') {
    const PO = b.possess, byOne = Object.fromEntries(PO.owners.map((n) => [n.one, n]));
    if (mode === 'possess') {
      for (let t = 0; t < 600; t++) {
        const used = new Set(), things = new Set(), take = (irr) => { const n = shuffle(PO.owners.filter((x) => x.irr === irr && !used.has(x.one) && x.things.some((t) => !things.has(t[0]))), rng)[0]; if (n) used.add(n.one); return n; };
        const thingOf = (n) => { const t = shuffle(n.things.filter((t) => !things.has(t[0])), rng)[0]; things.add(t[0]); return t; };
        const own = [], pickI = [];
        let bad = false;
        for (const [k, c] of Object.entries(d.own)) for (let i = 0; i < c; i++) { const n = take(k === 'imany'); if (!n) { bad = true; break; } const th = thingOf(n); own.push({ kind: k === 'imany' ? 'many' : k, ord: k, n, thing: th, num: k === 'one' ? 1 : rng.sample(NUMW, 1)[0] }); }
        for (const [k, c] of Object.entries(d.pick)) for (let i = 0; i < c; i++) {
          if (k === 'plain' || k === 'iplain') { const p = shuffle(PO.plain.filter((x) => byOne[x.n].irr === (k === 'iplain') && !used.has(x.n)), rng)[0]; if (!p) { bad = true; break; } used.add(p.n); pickI.push({ kind: 'plain', n: byOne[p.n], t: p.t }); }
          else { const n = take(k === 'imany'); if (!n) { bad = true; break; } const th = thingOf(n), kind = k === 'imany' ? 'many' : k, det = n.det || 'the';
            const num = kind === 'many' ? rng.sample(NUMW, 1)[0] : null;
            const t2 = kind === 'one' ? `The ${th[0]} belongs to ${det} ${n.one}. It is ${det} ___ ${th[0]}.` : `The ${th[1]} belong to ${det} ${num} ${n.many}. They are ${det} ___ ${th[1]}.`;
            pickI.push({ kind, n, t: t2 }); }
        }
        if (bad) continue;
        // the order of part 1: one owner, more than one, and (level 3) plurals that do not end in s are three kinds to mix
        if (Object.keys(d.own).length > 1) { const cnt = own.reduce((a, x) => ((a[x.ord] = (a[x.ord] || 0) + 1), a), {}), ord = kindOrder(cnt, rng), q = {}; shuffle(own, rng).forEach((x) => (q[x.ord] = q[x.ord] || []).push(x)); own.splice(0, own.length, ...ord.map((k) => q[k].shift())); }
        // ... and one owner and more than one never stand in two blocks (the plurals without s count as more than one)
        if (Object.keys(d.own).length > 1 && /^(o+m+|m+o+)$/.test(own.map((x) => x.kind[0]).join(''))) continue;
        // an irregular owner of level 3 stands among the others, not in one place
        const pk = shuffle(pickI, rng);
        if (!orderOk(pk.map((x) => x.kind)) && pk.length >= 4) continue;
        const at = places(pk.length, d.opts, rng);
        const items = pk.map((x, i) => { const all = d.opts === 2 ? [x.n.one + "'s", x.n.many] : [x.n.one + "'s", x.n.many, posses(x.n, 'many')]; const right = x.kind === 'plain' ? x.n.many : posses(x.n, x.kind); const wrong = shuffle(all.filter((o) => o !== right), rng); wrong.splice(at[i], 0, right); return { ...x, n: x.n.one, right, opts: wrong }; });
        return { mode, lv, own: own.map((x) => ({ kind: x.kind, n: x.n.one, prompt: x.kind === 'one' ? `${an(x.n.one).replace(/^a/, 'A')} has ${an(x.thing[0])}.` : `${x.num[0].toUpperCase() + x.num.slice(1)} ${x.n.many} have ${x.thing[1]}.`, right: x.kind === 'one' ? `${posses(x.n, 'one')} ${x.thing[0]}` : `${posses(x.n, 'many')} ${x.thing[1]}` })), items, list: [...own.map((x) => 'own:' + x.n.one + x.kind), ...items.map((x) => 'pick:' + x.n + x.kind)] };
      }
      throw new Error('no page of owners');
    }
    // apostrophe
    for (let t = 0; t < 600; t++) {
      const ord = kindOrder(d.kinds, rng);
      const fx = shuffle(PO.fix, rng);
      const irrs = fx.filter((x) => byOne[x.n].irr), regs = fx.filter((x) => !byOne[x.n].irr);
      const nIrr = d.irr || 0;
      const chosen = [...irrs.slice(0, nIrr), ...regs.slice(0, ord.length - nIrr)];
      if (chosen.length < ord.length) continue;
      const ordered = shuffle(chosen, rng);
      if (ordered.some((x, i) => byOne[x.n].irr && ord[i] === 'one')) continue;
      const items = ordered.map((x, i) => { const N = byOne[x.n], k = ord[i]; return { kind: k, n: N.one, ctx: k === 'one' ? x.ctx.one : x.ctx.many, t: x[k], shown: unfixed(N, k), right: k === 'plain' ? N.many : posses(N, k), irr: N.irr }; });
      if (lv === 3 && items.filter((x) => x.irr).length !== nIrr) continue;
      if (lv === 3 && new Set(items.filter((x) => x.irr).map((x) => x.kind)).size < 2) continue;
      return { mode, lv, items, list: items.map((x) => 'fix:' + x.n + x.kind) };
    }
    throw new Error('no page of sentences to fix');
  }
  if (mode === 'titles' || mode === 'titlecircle') {
    const TI = b.titles, list = TI.list[lv].map((x) => x[0]);
    const n = d.n + (d.which || 0);
    // level 1: half the titles or more have a small word in the middle (the child must decide, not circle every word)
    const mid = (t) => t.split(' ').slice(1, -1).some((w) => TI.small.includes(w));
    let pickT = shuffle(list, rng).slice(0, n);
    if (lv === 1) { const m = shuffle(list.filter(mid), rng), o = shuffle(list.filter((t) => !mid(t)), rng), k = Math.ceil(d.n / 2); pickT = [...shuffle([...m.slice(0, k), ...o.slice(0, d.n - k)], rng), ...shuffle([...m.slice(k), ...o.slice(d.n - k)], rng).slice(0, n - d.n)]; }
    if (pickT.length < n) throw new Error('too few titles');
    const ts = pickT.slice(0, d.n).map((t) => ({ lc: t, right: titleCase(t, TI.small) }));
    let which = [];
    if (d.which) {
      const at = shuffle([0, 1], rng);
      which = pickT.slice(d.n).map((t, i) => {
        const right = titleCase(t, TI.small), ws = right.split(' ');
        // the wrong way: a small word in the middle with a capital, or an important word without one (a level-3 name)
        const smallAt = ws.map((w, j) => (j > 0 && j < ws.length - 1 && TI.small.includes(w) ? j : -1)).filter((j) => j >= 0);
        const bigAt = ws.map((w, j) => (j > 0 && !TI.small.includes(w.toLowerCase()) ? j : -1)).filter((j) => j >= 0);
        let wrong;
        if (smallAt.length && (lv < 3 || rng.int(0, 1))) { const j = rng.sample(smallAt, 1)[0]; wrong = ws.map((w, k) => (k === j ? w[0].toUpperCase() + w.slice(1) : w)).join(' '); }
        else { const j = rng.sample(bigAt, 1)[0]; wrong = ws.map((w, k) => (k === j ? w[0].toLowerCase() + w.slice(1) : w)).join(' '); }
        const two = [wrong]; two.splice(at[i], 0, right);
        return { lc: t, right, opts: two };
      });
    }
    return { mode, lv, titles: ts, which, list: [...ts.map((x) => 'title:' + x.lc), ...which.map((x) => 'which:' + x.lc)] };
  }
  throw new Error('sentences-g3: no plan for ' + mode);
}

{ const f = faultsOf(BANK); if (f.length) throw new Error('sentences-g3.en.json: ' + f.join('; ')); }

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
/** A child reads typographic apostrophes and quotation marks (’ “ ”): every straight ' and " in the TEXT of a page or a key
 *  (never in a tag or an attribute) is turned here, once, for all ten types. The bank, the data attributes and the teacher
 *  notes keep straight ones; verify() straightens what it reads before it compares with the bank. */
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
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} data-lcs-card style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (k, html, px = LABEL) => `<div data-lcs-label style="font:700 ${px}px/1.3 'Nunito',sans-serif;color:${T.ink}">${k ? `<span style="color:${T.teal}">${k}.</span> ` : ''}${html}</div>`;
const num = (k) => `<span data-lcs-num style="flex:0 0 auto;align-self:flex-start;display:inline-block;min-width:${k >= 10 ? 32 : 24}px;font:800 ${READ}px/1.35 'Nunito',sans-serif;color:${T.teal}">${k}.</span>`;
/** a single ruled line; starter printed on it in ink, the key's answer in teal */
function wline({ w, h = ROW, starter, starterPx = READ, answer, sample, keyPx = 16, attrs = '' }) {
  return `<div data-lcs-line${answer ? ` data-lcs-answer="${A(answer)}"` : ''}${sample && answer ? ' data-lcs-key-sample="1"' : ''}${starter ? ` data-lcs-starter="${A(starter)}"` : ''} ${attrs} style="box-sizing:border-box;${w ? `flex:0 0 auto;width:${w}px;` : 'width:100%;'}height:${h}px;border-bottom:2px solid ${T.inkSoft};display:flex;align-items:flex-end;gap:7px;padding:0 2px 4px;overflow:hidden">` +
    (starter ? `<span data-lcs-starttext data-lcs-read style="flex:0 0 auto;white-space:nowrap;font:700 ${starterPx}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(starter)}</span>` : '') +
    (answer ? `<span data-lcs-keytext style="flex:0 1 auto;min-width:0;white-space:nowrap;font:700 ${keyPx}px/1 'Nunito',sans-serif;color:${T.teal}">${esc(answer)}</span>` : '') + `</div>`;
}
/** the room for a sentence the child writes: n full-width lines (two for a sentence); the key spreads its sample over them
 *  at the child's measure (CPL letters a line) */
function writeLines(answer, key, n = 2, h = ROW) {
  const parts = key && answer ? keyLines(answer) : [];
  return `<div data-lcs-writes="${n}"${key && answer ? ` data-lcs-expect="${A(answer)}"` : ''} style="display:flex;flex-direction:column;gap:0">` +
    Array.from({ length: n }, (_, k) => wline({ h, answer: parts[k] || null, sample: true })).join('') + `</div>`;
}
/** a word or a form to circle; the key rings the right one */
const opt = (text, ok, key, attr = '') => `<span data-lcs-opt="${A(text)}"${ok ? ' data-lcs-ok="1"' : ''} ${attr} style="flex:0 0 auto;white-space:nowrap;font:800 ${OPT}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 12px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
/** a blank inside a printed sentence (the key writes the answer in it) */
const blank = (w, want, key) => `<span data-lcs-blank data-lcs-want="${A(want)}" style="position:relative;display:inline-block;box-sizing:border-box;width:${w}px;height:1.15em;vertical-align:-0.22em;border-bottom:2.5px solid ${T.ink}">${key ? `<span data-lcs-blankkey style="position:absolute;left:0;right:0;bottom:4px;text-align:center;white-space:nowrap;font:700 16px/1 'Nunito',sans-serif;color:${T.teal}">${esc(want)}</span>` : ''}</span>`;
const ruleBox = (title, rows, attrs = '') => `<div data-lcs-rulebox data-lcs-card ${attrs} style="display:flex;flex-direction:column;gap:2px;padding:5px 14px 7px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
  `<div data-lcs-boxtitle style="font:700 19px/1.15 'Baloo 2',cursive;color:${T.teal}">${esc(title)}</div>` + rows.map((r) => `<div data-lcs-ruletext style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}">${r}</div>`).join('') + `</div>`;
const Bw = (w) => `<b style="font-weight:800;color:${T.teal}">${esc(w)}</b>`;
const CHECK = `<svg data-lcs-check width="22" height="22" viewBox="0 0 20 20" style="display:block"><path d="M3.5 10.5 L8.5 15.5 L16.5 4.5" fill="none" stroke="${T.teal}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const VARY = `<span data-lcs-vary style="color:${T.coral}">(Answers vary.)</span>`;
/** the box of joining words, each with its job */
const wordBox = (ws) => `<div data-lcs-wordbox data-lcs-card style="display:grid;grid-template-columns:repeat(${ws.length === 3 ? 3 : 2},1fr);gap:4px 16px;padding:7px 14px 8px;border:2.5px dashed ${T.teal};border-radius:14px;background:#FFFFFF">` +
  ws.map((w) => `<div data-lcs-boxword="${w}" style="font:700 ${RULEPX}px/1.3 'Nunito',sans-serif;color:${T.ink}"><b data-lcs-bw style="font:800 ${OPT}px/1.2 'Nunito',sans-serif;color:${T.teal}">${w}</b> ${esc(BANK.conj.jobs[w])}</div>`).join('') + `</div>`;
/** a printed sentence with its blank: "It was raining ___ we played inside." */
const withBlank = (t, bw, want, key, px = READ) => { const [a, c] = t.split('___'); return `<span data-lcs-read data-lcs-sent style="font:700 ${px}px/1.5 'Nunito',sans-serif;color:${T.ink}">${esc(a.trimEnd())} ${blank(bw, want, key)}${/^[.,?!]/.test(c) ? '' : ' '}${esc(c.trimStart())}</span>`; };

/* ------------------------------------------------------------------ the blocks of each page */
function render(P, key) {
  const inner = W - 24, b = [];
  const T3 = BANK.titles;
  if (P.mode === 'joinpick') {
    b.push(wordBox(P.words));
    b.push(cream('data-lcs-task="pick"', label(0, LINES.pick[P.lv]) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">` +
      P.items.map((x, i) => `<div data-lcs-item data-lcs-pickrow="${x.k}" data-lcs-text="${A(x.t)}" style="display:flex;gap:6px;padding:3px 10px 4px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px">` +
        withBlank(x.t, 128, COORD.includes(x.k) ? ', ' + x.k : x.k, key) + `<div data-lcs-opts style="display:flex;gap:18px">${x.opts.map((o) => opt(o, o === x.k, key)).join('')}</div></div></div>`).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
  }
  if (P.mode === 'join') {
    b.push(wordBox(P.words));
    b.push(cream('data-lcs-task="join"', label(1, LINES.join) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px">` +
      P.pairs.map((p, i) => `<div data-lcs-item data-lcs-pair="${A(p.a)}" data-lcs-b="${A(p.b)}" data-lcs-sample="${p.w}" data-lcs-also="${p.also.join(',')}" data-lcs-weak="${p.weak.join(',')}" style="display:flex;gap:6px;padding:2px 10px 2px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:0">` +
        `<span data-lcs-read data-lcs-pairtext style="font:700 ${READ}px/1.35 'Nunito',sans-serif;color:${T.ink}">${esc(p.a)} ${esc(p.b)}</span>` +
        writeLines(p.s, key) +
        // the other right words: a row of its own under the lines (empty on the page of the child)
        `<div data-lcs-alsorow style="min-height:15px;padding-top:1px;text-align:right;font:700 13px/1.15 'Nunito',sans-serif;color:${T.teal}">${key && p.also.length ? `<span data-lcs-also>${esc(alsoText(p.w, p.also, p.weak))}</span>` : ''}</div>` + `</div></div>`).join('') + `</div>`, 8, 6, 'flex:3 1 auto'));
    b.push(cream('data-lcs-task="finish"', label(2, LINES.finish + (key ? ' ' + VARY : '')) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px">` +
      // one full-width line: the printed start and the child's ending (measured: the ending fits the rest of the line at the
      // child's CPL letters a line)
      P.stems.map((s, i) => `<div data-lcs-item data-lcs-stem="${s.w}" style="display:flex;align-items:flex-end;gap:6px;padding:0 10px">${num(i + 1).replace('align-self:flex-start;', 'align-self:flex-end;padding-bottom:4px;')}<div style="flex:1 1 auto;min-width:0">${wline({ h: ROW + 4, starter: s.s, answer: key ? s.sample : null, sample: true })}</div></div>`).join('') + `</div>`, 8, 4, 'flex:1 1 auto'));
  }
  if (P.mode === 'kinds') {
    const EX = BANK.kinds.examples, d = LEVELS.kinds[P.lv];
    const rows = [`${Bw('Simple')}: one complete thought with a subject and a verb. <i>${esc(EX.simple)}</i>`, `${Bw('Compound')}: two sentences joined by a comma and a joining word (<b>and</b>, <b>but</b>, <b>so</b>, <b>or</b>). <i>${esc(EX.compound)}</i>`];
    if (d.cols.length === 3) rows.push(`${Bw('Complex')}: a sentence plus a part that cannot stand alone. The part ${P.lv === 3 ? 'has its own subject and verb and ' : ''}starts with <b>because</b>, <b>when</b>, <b>if</b>, <b>after</b>, or <b>before</b>. <i>${esc(EX.complex)}</i>`);
    if (d.two) rows.push(`A simple sentence can have two subjects or two verbs. <i>${esc(EX.two)}</i>`);
    b.push(ruleBox('Three kinds of sentences'.replace('Three', d.cols.length === 2 ? 'Two' : 'Three'), rows));
    const colW = d.colW;
    const head = `<div data-lcs-thead style="display:flex;align-items:flex-end;gap:0;padding:0 10px"><span style="flex:1 1 auto"></span>${d.cols.map((c) => `<span data-lcs-col="${c}" style="flex:0 0 ${colW}px;text-align:center;font:800 16px/1.1 'Nunito',sans-serif;color:${T.teal}">${c}</span>`).join('')}</div>`;
    b.push(cream('data-lcs-task="kinds"', label(0, LINES.kinds) + head + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:3px">` +
      P.rows.map((r, i) => `<div data-lcs-item data-lcs-krow="${r.kind}" data-lcs-text="${A(r.t)}" style="display:flex;align-items:center;gap:0;padding:2px 10px;border-radius:10px;background:#FFFFFF">${num(i + 1)}<span data-lcs-read style="flex:1 1 auto;min-width:0;padding-right:8px;font:700 17px/1.3 'Nunito',sans-serif;color:${T.ink}">${esc(r.t)}</span>` +
        d.cols.map((c) => `<span data-lcs-cell="${c}" style="flex:0 0 ${colW}px;display:flex;justify-content:center"><span data-lcs-tick="${c}" style="box-sizing:border-box;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF">${key && c === r.kind ? CHECK : ''}</span></span>`).join('') + `</div>`).join('') + `</div>`, 8, 5, 'flex:1 1 auto'));
  }
  if (P.mode === 'build') {
    const EX = BANK.kinds.examples;
    const rows = [`${Bw('Compound')}: two sentences joined by a comma and a joining word (<b>and</b>, <b>but</b>, <b>so</b>, <b>or</b>). <i>${esc(EX.compound)}</i>`];
    if (P.lv > 1) rows.push(`${Bw('Complex')}: a sentence plus a part that cannot stand alone. The part starts with <b>because</b>, <b>when</b>, <b>if</b>, <b>after</b>, or <b>before</b>. <i>${esc(EX.complex)}</i> If the part that cannot stand alone comes first, put a comma after it: <i>${esc(EX.complexFirst)}</i>`);
    b.push(ruleBox(P.lv === 1 ? 'Compound sentences' : 'Compound and complex sentences', rows));
    // every sentence the child writes: two full-width lines; "compound" / "complex" stands above its first line
    const pairHtml = (p, i, both) => `<div data-lcs-item data-lcs-pair="${A(p.a)}" data-lcs-b="${A(p.b)}" style="display:flex;gap:6px;padding:1px 10px 3px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:0">` +
      `<span data-lcs-read data-lcs-pairtext style="white-space:nowrap;font:700 17px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(p.a)} ${esc(p.b)}</span>` +
      (both ? [['compound', p.comp], ['complex', p.cx]].map(([k, s]) => `<div data-lcs-wrow="${k}" style="display:flex;flex-direction:column;gap:0"><span data-lcs-wlabel style="padding-top:0;font:800 15px/1 'Nunito',sans-serif;color:${T.teal}">${k}</span>${writeLines(s, key)}</div>`).join('')
        : writeLines(p.comp, key)) + `</div></div>`;
    if (P.lv < 3) {
      b.push(cream('data-lcs-task="build"', label(1, (P.lv === 1 ? LINES.build1 : LINES.build2) + (key ? ' ' + VARY : '')) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">` + P.pairs.map((p, i) => pairHtml(p, i, P.lv === 2)).join('') + `</div>`, 6, 5, 'flex:1 1 auto'));
    } else {
      b.push(cream('data-lcs-task="build"', label(1, LINES.build3 + (key ? ' ' + VARY : '')) + pairHtml(P.pairs[0], 0, true), 6, 4));
      const sents = P.para.flatMap((p) => [p.a, p.b]);
      const sample = P.para.map((p, i) => (i === P.cxAt ? p.cx : p.comp)).join(' ');
      // the key spreads its sample over the lines at the child's measure (CPL letters a line)
      const lines = keyLines(sample);
      const d = LEVELS.build[3];
      b.push(cream(`data-lcs-task="para" data-lcs-story="${A(P.story)}" data-lcs-cxat="${P.cxAt}"`, label(2, LINES.para + (key ? ' ' + VARY : '')) +
        // the story's title and, beside it, the child's check list
        `<div data-lcs-para style="padding:4px 12px 6px;border:2px solid ${T.creamDeep};border-radius:12px;background:#FFFFFF"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><div data-lcs-paratitle style="font:700 18px/1.2 'Baloo 2',cursive;color:${T.ink}">${esc(P.story)}</div>` +
        `<div data-lcs-checklist style="display:flex;gap:18px;font:700 15px/1.2 'Nunito',sans-serif;color:${T.ink}">${['two compound sentences', 'one complex sentence'].map((s) => `<span style="display:inline-flex;align-items:center;gap:6px"><span style="display:inline-block;width:18px;height:18px;border:2px solid ${T.ink};border-radius:4px;background:#FFFFFF"></span>${s}</span>`).join('')}</div></div>` +
        `<div data-lcs-read data-lcs-paratext style="font:700 17px/1.45 'Nunito',sans-serif;color:${T.ink}">${sents.map((s) => `<span data-lcs-psent>${esc(s)}</span>`).join(' ')}</div></div>` +
        `<div data-lcs-paralines data-lcs-writes="${d.lines}"${key ? ` data-lcs-expect="${A(sample)}"` : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:0">${Array.from({ length: d.lines }, (_, i) => wline({ answer: key && lines[i] ? lines[i] : null, sample: true })).join('')}</div>`, 8, 5, 'flex:1 1 auto'));
    }
  }
  if (P.mode === 'compare') {
    const sizes = [74, 104, 140];
    const strip = `<div data-lcs-trio style="display:flex;justify-content:space-around;align-items:flex-end;padding:2px 10px 0">` + P.order.map((k) => { const [name, theme, noun] = P.trio[k];
      return `<div data-lcs-animal="${name}" data-lcs-size="${k}" style="display:flex;flex-direction:column;align-items:center;gap:2px"><img class="ws-icon" data-lcs-pic="${A(theme + '/' + noun)}" src="${fileUri(theme, noun)}" alt="" style="width:${sizes[k]}px;height:${sizes[k]}px;object-fit:contain;display:block"><span data-lcs-read data-lcs-animalname style="font:800 ${READ}px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(name)}</span></div>`; }).join('') + `</div>`;
    b.push(cream('data-lcs-task="trio"', label(1, LINES.trio) + strip + `<div style="display:flex;flex-direction:column;gap:6px;padding:2px 4px">` +
      P.sent.map((s, i) => `<div data-lcs-item data-lcs-tline="${s.want}" data-lcs-w="${s.w}" data-lcs-text="${A(s.t)}" style="display:flex;gap:6px;align-items:baseline">${num(i + 1)}${withBlank(s.t, 140, s.right, key)}<span data-lcs-read data-lcs-paren style="font:700 ${READ}px/1.5 'Nunito',sans-serif;color:${T.inkSoft}">(${esc(s.w)})</span></div>`).join('') + `</div>`, 8, 6));
    const colW = 214;
    const ex = P.examples.map((w) => formsOf(w));
    const row = (x, isEx) => `<div data-lcs-item ${isEx ? `data-lcs-exrow="${x.base}"` : `data-lcs-trow="${x.base}" data-lcs-form="${x.form}"`} style="display:flex;align-items:flex-end;gap:12px;padding:2px 10px;border-radius:10px;background:#FFFFFF">` +
      `<span data-lcs-read data-lcs-tword style="flex:1 1 auto;min-width:0;padding-bottom:5px;font:800 ${READ + 1}px/1 'Nunito',sans-serif;color:${isEx ? T.inkSoft : T.ink}">${esc(x.base)}</span>` +
      [x.comp, x.sup].map((v, k) => (isEx ? `<span data-lcs-exform style="flex:0 0 ${colW}px;padding-bottom:5px;font:700 ${READ}px/1 'Nunito',sans-serif;color:${T.inkSoft}">${esc(v)}</span>` : `<div data-lcs-cellline="${k ? 'sup' : 'comp'}" style="flex:0 0 ${colW}px">${wline({ answer: key ? v : null })}</div>`)).join('') + `</div>`;
    b.push(cream('data-lcs-task="table"', label(2, LINES.table) +
      `<div data-lcs-thead style="display:flex;gap:12px;padding:0 10px"><span style="flex:1 1 auto;font:800 15px/1.1 'Nunito',sans-serif;color:${T.teal}">word</span><span style="flex:0 0 ${colW}px;font:800 15px/1.1 'Nunito',sans-serif;color:${T.teal}">comparing two</span><span style="flex:0 0 ${colW}px;font:800 15px/1.1 'Nunito',sans-serif;color:${T.teal}">comparing three or more</span></div>` +
      `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">${ex.map((x) => row(x, true)).join('')}${P.rows.map((x) => row(x, false)).join('')}</div>`, 8, 5, 'flex:1 1 auto'));
  }
  if (P.mode === 'comparepick') {
    const rows = [`Comparing two: ${Bw('-er')} or ${Bw('more')}, and often <b>than</b>. <i data-lcs-example>smarter than, more famous than</i>`, `Comparing three or more: ${Bw('-est')} or ${Bw('most')}, and often <b>the</b>. <i data-lcs-example>the smartest, the most famous</i>`];
    if (P.lv === 2) rows.push(`Words with one syllable take ${Bw('-er')} and ${Bw('-est')}. Most longer words (<i>careful, beautiful</i>) take ${Bw('more')} and ${Bw('most')}.`);
    if (P.lv < 3) rows.push(`With <b>very</b>, <b>too</b>, or <b>as</b> ... <b>as</b>, use the word as it is: <i data-lcs-example>very tall</i>.`);
    if (P.lv === 3) rows.push(`Some words change: <i>good, better, best · bad, worse, worst · well, better, best · badly, worse, worst</i>.`, `An adverb tells how someone does something: <i data-lcs-example>Owls fly silently.</i>`);
    b.push(ruleBox('Comparing words', rows));
    b.push(cream('data-lcs-task="cmp"', label(0, LINES.cmp) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">` +
      P.items.map((x, i) => `<div data-lcs-item data-lcs-cmp="${A(x.right)}" data-lcs-w="${x.w}" data-lcs-text="${A(x.t)}"${x.ad ? ' data-lcs-ad="1"' : ''} style="display:flex;gap:6px;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px">` +
        withBlank(x.t, Math.max(120, Math.ceil(Math.max(...x.opts.map((o) => o.length)) * 9.2) + 18), x.right, key) + `<div data-lcs-opts style="display:flex;gap:18px">${x.opts.map((o) => opt(o, o === x.right, key)).join('')}</div></div></div>`).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
  }
  if (P.mode === 'possess' || P.mode === 'apostrophe') {
    const rows = [`${Bw('One owner')}: add <b>'s</b>. <i>one bee: the bee's hive</i>`];
    if (P.lv > 1) rows.push(`${Bw('More than one owner')}, plural ends in s: add <b>'</b> after the s. <i>two bees: the bees' hives</i>`);
    if (P.lv === 3) rows.push(`${Bw('More than one owner')}, plural does not end in s: add <b>'s</b>. <i>two people: the people's kites</i>`);
    rows.push(`A plural that owns nothing needs no apostrophe. <i>Three bees buzz.</i>`);
    // G3-527 level 1 gives no number: the box says that every owner is one (true of every copy: no plural owner there)
    if (P.mode === 'apostrophe' && P.lv === 1) rows.push('On this page, every owner is one person or one animal.');
    b.push(ruleBox('Who owns it?', rows));
  }
  if (P.mode === 'possess') {
    b.push(cream('data-lcs-task="own"', label(1, LINES.own[P.lv]) + `<div style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;gap:6px 16px;align-content:space-between">` +
      P.own.map((x, i) => `<div data-lcs-item data-lcs-own="${x.kind}" data-lcs-n="${x.n}" data-lcs-right="${A(x.right)}" style="display:flex;flex-direction:column;gap:0;padding:3px 10px 2px;border-radius:12px;background:#FFFFFF"><div style="display:flex;gap:6px">${num(i + 1)}<span data-lcs-read data-lcs-prompt style="font:700 ${READ}px/1.35 'Nunito',sans-serif;color:${T.ink}">${esc(x.prompt)}</span></div>${wline({ starter: 'the', answer: key ? x.right : null })}</div>`).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
    b.push(cream('data-lcs-task="ownpick"', label(2, LINES.ownPick) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">` +
      P.items.map((x, i) => `<div data-lcs-item data-lcs-ownpick="${x.kind}" data-lcs-n="${x.n}" data-lcs-text="${A(x.t)}" style="display:flex;gap:6px;padding:2px 10px 3px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px">` +
        withBlank(x.t, 110, x.right, key) + `<div data-lcs-opts style="display:flex;gap:18px">${x.opts.map((o) => opt(o, o === x.right, key)).join('')}</div></div></div>`).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
  }
  if (P.mode === 'apostrophe') {
    // level 1: no first sentence with a number; the child decides by whether something owned follows the word
    b.push(cream('data-lcs-task="fix"', label(0, LINES.fix[P.lv]) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">` +
      P.items.map((x, i) => { const [a, c] = x.t.split('___'), ctx = P.lv > 1 ? x.ctx : '';
        return `<div data-lcs-item data-lcs-fix="${x.kind}" data-lcs-n="${x.n}" data-lcs-right="${A(x.right)}" data-lcs-ctx="${A(ctx)}" data-lcs-text="${A((ctx ? ctx + ' ' : '') + x.t)}" style="display:flex;align-items:flex-start;gap:6px;padding:3px 10px 3px;border-radius:12px;background:#FFFFFF">${num(i + 1)}` +
          `<span data-lcs-read style="flex:1 1 auto;min-width:0;font:700 ${READ}px/1.4 'Nunito',sans-serif;color:${T.ink}">${ctx ? esc(ctx) + ' ' : ''}${esc(a.trimEnd())} <u data-lcs-shown style="text-decoration-thickness:2px;text-underline-offset:3px">${esc(x.shown)}</u>${/^[.,?!]/.test(c) ? '' : ' '}${esc(c.trimStart())}</span>` +
          `<div style="flex:0 0 auto;align-self:flex-end">${wline({ w: 170, answer: key ? x.right : null })}</div>` + `</div>`; }).join('') + `</div>`, 8, 6, 'flex:1 1 auto'));
  }
  if (P.mode === 'titles' || P.mode === 'titlecircle') {
    const rows = [`The first word, the last word, and every important word start with a capital letter: <i>${esc(T3.examples[P.lv])}</i>`,
      `These small words stay small in the middle of a title: ${T3.small.map((w) => `<b>${w}</b>`).join(', ')}.`];
    if (P.lv === 3) rows.push(`A name always starts with a capital letter. After a colon ( : ), the first word starts with a capital letter.`);
    b.push(ruleBox('Capitals in titles', rows));
  }
  if (P.mode === 'titles') {
    const d = LEVELS.titles[P.lv];
    b.push(cream('data-lcs-task="titles"', label(1, LINES.titles) + `<div style="flex:1 1 auto;display:grid;grid-template-columns:repeat(${d.cols},1fr);gap:6px 16px;align-content:space-between">` +
      P.titles.map((x, i) => `<div data-lcs-item data-lcs-title="${A(x.lc)}" data-lcs-right="${A(x.right)}" style="display:flex;flex-direction:column;gap:0;padding:3px 10px 2px;border-radius:12px;background:#FFFFFF"><div style="display:flex;gap:6px">${num(i + 1)}<span data-lcs-read data-lcs-tl style="font:700 ${READ + 1}px/1.35 'Nunito',sans-serif;color:${T.ink}">${esc(x.lc)}</span></div>${wline({ answer: key ? x.right : null })}</div>`).join('') + `</div>`, 8, 6, 'flex:3 1 auto'));
    b.push(cream('data-lcs-task="own3"', label(2, LINES.own3 + (key ? ' ' + VARY : '')) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">` +
      ['Book', 'Book', 'Book', 'Report'].map((s, i) => `<div data-lcs-item data-lcs-ownline="${s}" style="padding:0 10px">${wline({ starter: s + ':', starterPx: 17, answer: key && i === 3 ? 'My Report on Sea Turtles' : null, sample: true })}</div>`).join('') + `</div>`, 8, 4, 'flex:2 1 auto'));
  }
  if (P.mode === 'titlecircle') {
    const ring = `<span data-lcs-ringmark style="position:absolute;left:-8px;right:-8px;top:-4px;bottom:-5px;border:3px solid ${T.teal};border-radius:999px"></span>`;
    b.push(cream('data-lcs-task="circle"', label(1, LINES.circle) + `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:4px">` +
      P.titles.map((x, i) => { const R = x.right.split(' ');
        return `<div data-lcs-item data-lcs-ctitle="${A(x.lc)}" data-lcs-right="${A(x.right)}" style="display:flex;align-items:center;gap:6px;padding:5px 10px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<span data-lcs-read style="display:flex;flex-wrap:wrap;gap:6px 26px;font:700 ${OPT + 1}px/1.35 'Nunito',sans-serif;color:${T.ink}">` +
          x.lc.split(' ').map((w, k) => { const cap = R[k][0] !== R[k][0].toLowerCase(); return `<span data-lcs-tw="${A(w)}"${cap ? ' data-lcs-cap="1"' : ''} style="position:relative;display:inline-block">${esc(w)}${key && cap ? ring : ''}</span>`; }).join('') + `</span></div>`; }).join('') + `</div>`, 8, 6, 'flex:3 1 auto'));
    b.push(cream('data-lcs-task="which"', label(2, LINES.which) + `<div style="display:flex;flex-direction:column;gap:6px">` +
      P.which.map((x, i) => `<div data-lcs-item data-lcs-which="${A(x.right)}" style="display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:12px;background:#FFFFFF">${num(i + 1)}<div data-lcs-opts style="display:flex;flex-direction:column;gap:3px">${x.opts.map((o) => opt(o, o === x.right, key, 'data-lcs-way')).join('')}</div></div>`).join('') + `</div>`, 8, 6));
  }
  return b;
}

function makeSentencesG3Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('sentences-g3: unknown mode ' + mode);
  const INFO = {
    mode, instr: INSTR[mode], lines: LINES, levels: BANK.conj.levels, jobs: BANK.conj.jobs, coord: COORD, sub: SUB,
    fits: mode === 'joinpick' ? Object.fromEntries(BANK.pick.map((p) => [p.t, p.fits])) : {},
    pairs: mode === 'join' ? Object.fromEntries(BANK.pairs.map((p) => [p.a, p.forms])) : {},
    weak: mode === 'join' ? Object.fromEntries(BANK.pairs.map((p) => [p.a, p.weak || []])) : {},
    better: BETTER, cpl: CPL, gap: GAP,
    stems: mode === 'join' ? Object.fromEntries(BANK.stems.map((s) => [s.s, s])) : {},
    kinds: mode === 'kinds' ? { examples: BANK.kinds.examples, two: BANK.kinds.two.map((x) => x.t), series: BANK.kinds.series, prep: BANK.kinds.prep } : {},
    build: mode === 'build' ? Object.fromEntries([...BANK.build.themes.flatMap((t) => t.pairs.map((p) => [p.a, { ...p, story: t.name }])), ...BANK.build.compOnly.map((p) => [p.a, { ...p, story: '' }])]) : {},
    stories: mode === 'build' ? Object.fromEntries(BANK.build.themes.map((t) => [t.name, t.pairs.flatMap((p) => [p.a, p.b])])) : {},
    words: ['compare', 'comparepick'].includes(mode) ? [...BANK.compare.words, ...BANK.compare.formsExtra] : [],
    both: BANK.compare.bothForms,
    owners: ['possess', 'apostrophe'].includes(mode) ? Object.fromEntries(BANK.possess.owners.map((n) => [n.one, n])) : {},
    small: BANK.titles.small, never: BANK.titles.never, names: BANK.titles.names, plain: BANK.possess.plain.map((p) => p.t),
  };
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // THE ITEM BANK of the unit checks (Part 7.6): G3-521, G3-522, G3-525, G3-526, G3-528 (sentCheckPage below)
    ...(SENT_CHECK_MODES.has(mode) ? { checkPage(args, ctx) { return sentCheckPage(mode, args, ctx); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the sentences are English sentences (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const P = plan(BANK, mode, lv, rng);
      const blocks = render(P, key);
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-g3s="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(typo(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + P.list.slice(0, 2).join(','), items: P.list },
      };
    },

    async verify(page) {
      return page.evaluate((LEVELS, INFO, CFG) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-g3s]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsG3s.split('|'), lv = +lvS, d = LEVELS[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect(), cs = (e) => getComputedStyle(e), fs = (e) => parseFloat(cs(e).fontSize);
        // the page prints typographic ’ “ ”; what is read is straightened before it is compared with the bank
        const straight = (s) => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
        const txt = (e) => (e ? straight(e.textContent).replace(/\s+/g, ' ').trim() : '');
        const TEAL = 'rgb(20, 107, 94)';
        const tok = (s) => String(s).toLowerCase().match(/[a-z]+(?:'[a-z]*)?/g) || [];
        const rb = R(root);
        // letters: ligatures off everywhere, an f before i, f, l, t and a t before t with room of its own
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if ([...root.querySelectorAll('*')].some((e) => [...e.childNodes].some((n) => n.nodeType === 3 && /[a-z]/i.test(n.nodeValue)) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word may join its letters: the ligatures are on in an element with text');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (/f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        // the instruction of this level
        const ins = document.querySelector('[data-lcs-instruction]');
        if (!ins) fails.push('no instruction at the top of the page'); else if (txt(ins) !== INFO.instr[lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(ins)}"`);
        // a child reads typographic apostrophes and quotes: no straight ' or " in the printed text (page, key, instruction)
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n, bad = ''; while ((n = tw.nextNode())) if (/['"]/.test(n.nodeValue)) { bad = n.nodeValue.trim().slice(0, 30); break; }
          if (!bad && ins && /['"]/.test(ins.textContent)) bad = ins.textContent.trim().slice(0, 30);
          if (bad) fails.push('a straight apostrophe or quotation mark is printed: ' + bad); }
        // pictures: only on the comparing page (three animals), loaded and big enough
        const imgs = [...root.querySelectorAll('img')];
        if (mode !== 'compare' && imgs.length) fails.push('a picture on a page without pictures');
        imgs.forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 60) fails.push('a picture smaller than 60 px'); });
        if (new Set(imgs.map((im) => im.dataset.lcsPic)).size !== imgs.length) fails.push('one picture twice on a page');
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        root.querySelectorAll('[data-lcs-card]').forEach((c) => { const q = R(c); c.querySelectorAll('span, div, b, i, u, img, svg').forEach((e) => { if (e.dataset && e.dataset.lcsRingmark !== undefined) return; const r = R(e); if (r.width && (r.bottom > q.bottom + 0.5 || r.right > q.right + 0.5 || r.left < q.left - 0.5 || r.top < q.top - 0.5)) fails.push('something leaves its card (' + (c.dataset.lcsTask || Object.keys(c.dataset)[0]) + ')'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        // sizes: what a third grader reads 17 px or more, words to circle 20 px, rules 15 px, task lines 16 px, lines 34 px
        root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 17) fails.push(`text a third grader reads is ${fs(e)} px (17 or more)`); });
        root.querySelectorAll('[data-lcs-opt]').forEach((e) => { if (fs(e) < 20) fails.push('a word to circle is smaller than 20 px'); });
        root.querySelectorAll('[data-lcs-ruletext], [data-lcs-boxword]').forEach((e) => { if (fs(e) < 15) fails.push('the rule box is printed smaller than 15 px'); });
        root.querySelectorAll('[data-lcs-label]').forEach((e) => { if (fs(e) < 16) fails.push('a task line smaller than 16 px'); });
        const lines = [...root.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { if (R(l).height < 33.5) fails.push('a writing line lower than 34 px'); if (R(l).width < 160) fails.push(`a writing line ${Math.round(R(l).width)} px wide`);
          const k = l.querySelector('[data-lcs-keytext]'); if (k && (k.scrollWidth > k.clientWidth + 1 || R(k).right > R(l).right + 0.5)) fails.push('a key answer does not fit its line'); if (k && fs(k) < 13) fails.push('a key answer smaller than 13 px');
          if (isKey ? false : (l.dataset.lcsAnswer !== undefined || k)) fails.push('a line is filled on the page of the child'); });
        root.querySelectorAll('[data-lcs-blank]').forEach((bl) => { if (isKey ? txt(bl) !== bl.dataset.lcsWant : txt(bl)) fails.push('a blank is filled on the page of the child, or does not hold its answer on the key'); if (R(bl).width < 100) fails.push('a blank narrower than 100 px');
          const k = bl.querySelector('[data-lcs-blankkey]'); if (k) { const r = document.createRange(); r.selectNodeContents(k); const q = r.getBoundingClientRect(), b = R(bl); if (q.left < b.left - 0.5 || q.right > b.right + 0.5 || q.bottom > b.bottom + 0.5) fails.push('the answer does not fit its blank'); } });
        // rings: only the key rings, and only the right one
        root.querySelectorAll('[data-lcs-opt]').forEach((o) => { const ringed = cs(o).borderTopColor === TEAL; if (isKey ? ringed !== !!o.dataset.lcsOk : ringed) fails.push('a word is ringed on the page of the child, or the key rings the wrong one'); });
        const vary = root.querySelectorAll('[data-lcs-vary]').length;
        const openTasks = { join: 1, build: lv === 3 ? 2 : 1, titles: 1 }[mode] || 0;
        if (vary !== (isKey ? openTasks : 0)) fails.push(`${vary} notes that answers vary (${isKey ? openTasks : 0} wanted)`);
        // the place of the right answer: every place used, none more than half, no three alike in a row, no staircase
        const placesOk = (p, m) => { const n = p.length, count = (v) => p.filter((x) => x === v).length, s = p.join('');
          if (n >= m && new Set(p).size < m) return 'not every place is used';
          if (m === 2 && n >= 4 && (count(0) < 2 || count(1) < 2)) return 'one place is used once';
          if (n >= 4 && Math.max(...Array.from({ length: m }, (_, v) => count(v))) > Math.ceil(n * (m === 2 ? 0.6 : 0.5))) return 'one place holds too many';
          if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) return 'three in a row in one place';
          if (m >= 3 && p.some((x, i) => i >= 2 && ((p[i - 1] === p[i - 2] + 1 && x === p[i - 1] + 1) || (p[i - 1] === p[i - 2] - 1 && x === p[i - 1] - 1)))) return 'a staircase';
          if (m === 2 && (/01010|10101/.test(s) || (n >= 4 && p.every((x, i) => !i || x !== p[i - 1])))) return 'every other one';
          return patternOf(p); };
        // one value on every other item, runs of one length, or a block that repeats over two thirds of the column
        const patternOf = (o) => { const n = o.length;
          for (const par of [0, 1]) { const sub = o.filter((x, i) => i % 2 === par); if (sub.length >= 3 && sub.every((x) => x === sub[0])) return 'one place on every other item'; }
          const runs = []; o.forEach((x, i) => { if (i && x === o[i - 1]) runs[runs.length - 1]++; else runs.push(1); });
          if (runs.length >= 3 && runs[0] >= 2 && runs.slice(0, -1).every((r) => r === runs[0])) return 'runs of one length';
          for (let L = 2; 2 * L <= n; L++) if (2 * L >= Math.ceil(2 * n / 3)) for (let i = 0; i + 2 * L <= n; i++) { let same = true; for (let k = 0; k < L; k++) if (o[i + k] !== o[i + L + k]) { same = false; break; } if (same) return 'a block of ' + L + ' that repeats'; }
          return ''; };
        const placeCheck = (groups, what) => { const p = groups.map((g) => g.findIndex((o) => o.dataset.lcsOk)), m = groups[0] ? groups[0].length : 0; if (p.some((x) => x < 0)) return; const bad = placesOk(p, m); if (bad) fails.push(`the ${what}: ${bad} (${p.join('')})`); };
        const orderBad = (o) => { if (o.some((x, i) => i >= 2 && x === o[i - 1] && x === o[i - 2])) return 'three of a kind in a row'; const ks = [...new Set(o)];
          if (ks.length === 2 && o.every((x, i) => !i || x !== o[i - 1])) return 'every other one'; if (ks.length === 2 && /(ab){3}|(ba){3}/.test(o.map((x) => (x === ks[0] ? 'a' : 'b')).join(''))) return 'six alternating';
          if (ks.length >= 3 && o.length > ks.length && o.every((x, i) => i < ks.length || x === o[i - ks.length])) return 'a repeating cycle';
          for (let p = 2; p <= 4; p++) if (o.length >= 2 * p + 2 && o.filter((x, i) => i >= p && x === o[i - p]).length >= o.length - p - 1) return 'a rhythm that repeats every ' + p; return patternOf(o); };
        const textOf = (row, sel) => { const c = row.querySelector(sel).cloneNode(true); c.querySelectorAll('[data-lcs-blank]').forEach((x) => x.replaceWith('___')); return straight(c.textContent).replace(/\s+/g, ' ').replace(/ ___/g, ' ___').trim(); };
        const plainOf = (s) => String(s).replace(/\b([a-z]+), ([a-z]+), (and|or) ([a-z]+)\b/, '$1 $2 $4').replace(/\b(after|before) (lunch|bed|recess|breakfast|dinner|school)\b/i, '');
        const kindOf = (s0) => { const s = plainOf(s0), sub = (s.match(/\b(because|when|if|after|before|while|until|since|although)\b/gi) || []).length, co = (s.match(/, (and|but|so|or) /g) || []).length;
          if (sub === 1 && co === 0) return 'complex'; if (co === 1 && sub === 0) return 'compound'; if (co === 0 && sub === 0 && !/,/.test(s)) return 'simple'; return 'none'; };
        // a sentence the child writes: its lines, full width, and the sentence fits them at the child's measure (CPL letters a
        // line); on the key, the sample spread over the lines (no line over CPL letters) and nothing else
        const FULL = 560;
        const room = (grp, expect, what) => {
          if (!grp) { fails.push(`${what}: no lines to write on`); return; }
          const n = +grp.dataset.lcsWrites, ls = [...grp.querySelectorAll(':scope > [data-lcs-line]')];
          if (ls.length !== n) fails.push(`${what}: ${ls.length} lines, not ${n}`);
          ls.forEach((l) => { if (R(l).width < FULL) fails.push(`${what}: a writing line ${Math.round(R(l).width)} px wide (a full-width line wanted)`); });
          if (expect && expect.length > INFO.cpl * n) fails.push(`${what}: the sentence (${expect.length} letters) does not fit ${n} lines at ${INFO.cpl} letters a line`);
          if (isKey && expect !== undefined) {
            const parts = ls.map((l) => l.dataset.lcsAnswer || '').filter(Boolean);
            if (grp.dataset.lcsExpect !== undefined && grp.dataset.lcsExpect !== expect) fails.push(`${what}: the key writes another sentence`);
            if (parts.join(' ') !== expect) fails.push(`${what}: the key's lines do not hold "${expect}"`);
            if (parts.some((p) => p.length > INFO.cpl)) fails.push(`${what}: a line of the key holds more than ${INFO.cpl} letters`); } };
        const LW = INFO.levels[lv];

        if (mode === 'joinpick' || mode === 'join') {
          const bw = [...root.querySelectorAll('[data-lcs-boxword]')];
          if (bw.map((e) => e.dataset.lcsBoxword).join() !== LW.join() || bw.some((e) => txt(e) !== e.dataset.lcsBoxword + ' ' + INFO.jobs[e.dataset.lcsBoxword])) fails.push('the box does not hold the words of this level with their jobs');
          if (root.firstElementChild !== root.querySelector('[data-lcs-wordbox]')) fails.push('the box of joining words is not at the top');
        }
        if (mode === 'joinpick') {
          const rows = [...root.querySelectorAll('[data-lcs-pickrow]')];
          if (rows.length !== d.n) fails.push(`${rows.length} sentences, not ${d.n}`);
          const ks = rows.map((r) => r.dataset.lcsPickrow);
          rows.forEach((r, i) => {
            const t = r.dataset.lcsText, k = r.dataset.lcsPickrow, fits = INFO.fits[t], os = [...r.querySelectorAll('[data-lcs-opt]')], ws = os.map((o) => o.dataset.lcsOpt);
            if (!fits) { fails.push(`sentence ${i + 1} is no sentence of the bank`); return; }
            if (textOf(r, '[data-lcs-sent]') !== t) fails.push(`sentence ${i + 1} is not printed as the bank has it: "${textOf(r, '[data-lcs-sent]')}"`);
            if (/,\s*$/.test(t.split('___')[0])) fails.push(`sentence ${i + 1} prints a comma before its blank`);
            if (os.length !== d.opts || new Set(ws).size !== d.opts || os.filter((o) => o.dataset.lcsOk).length !== 1 || (os.find((o) => o.dataset.lcsOk) || {}).dataset.lcsOpt !== k) fails.push(`sentence ${i + 1}: not ${d.opts} joining words with "${k}" keyed`);
            if (!fits.includes(k)) fails.push(`sentence ${i + 1}: its answer "${k}" does not fit it`);
            ws.forEach((w) => { if (!LW.includes(w)) fails.push(`sentence ${i + 1} offers "${w}", which is not a word of this level`); if (w !== k && fits.includes(w)) fails.push(`sentence ${i + 1} offers "${w}", which fits it too`); });
            const bl = r.querySelector('[data-lcs-blank]'); if (!bl || bl.dataset.lcsWant !== (INFO.coord.includes(k) ? ', ' + k : k)) fails.push(`the blank of sentence ${i + 1} is not keyed to "${INFO.coord.includes(k) ? ', ' + k : k}"`);
            // level 3: a because / when / if / after / before item offers another word of that group (one that does not fit)
            if (lv === 3 && INFO.sub.includes(k) && !ws.some((w) => w !== k && INFO.sub.includes(w) && !fits.includes(w))) fails.push(`sentence ${i + 1} offers no other word of because, when, if, after, before (the new word can be picked unread)`);
          });
          placeCheck(rows.map((r) => [...r.querySelectorAll('[data-lcs-opt]')]), 'joining word');
          const cnt = (w) => ks.filter((x) => x === w).length;
          if (lv === 1 && (['and', 'but', 'so'].some((w) => cnt(w) < 2 || cnt(w) > 3))) fails.push('level 1 does not ask and, but, and so two or three times each: ' + ks.join(','));
          if (lv === 2 && (LW.some((w) => !cnt(w)) || Math.max(...LW.map(cnt)) > 3)) fails.push('level 2 does not ask every word of its box: ' + ks.join(','));
          if (lv === 3 && (['when', 'if', 'after', 'before', 'because'].some((w) => !cnt(w)) || Math.max(...LW.map(cnt)) > 2)) fails.push('level 3 does not ask because, when, if, after, and before: ' + ks.join(','));
          if (orderBad(ks)) fails.push('the answers stand in a pattern: ' + ks.join(','));
          const lbl = txt(root.querySelector('[data-lcs-task="pick"] [data-lcs-label]')).replace(/^\d+\.\s*/, ''); if (lbl !== INFO.lines.pick[lv].replace(/<[^>]+>/g, '')) fails.push('the task line is not the one of this level');
        }
        if (mode === 'join') {
          const ps = [...root.querySelectorAll('[data-lcs-pair]')];
          if (ps.length !== d.pairs) fails.push(`${ps.length} pairs, not ${d.pairs}`);
          const ws = [];
          ps.forEach((p, i) => {
            const forms = INFO.pairs[p.dataset.lcsPair];
            if (!forms) { fails.push(`pair ${i + 1} is no pair of the bank`); return; }
            if (txt(p.querySelector('[data-lcs-pairtext]')) !== p.dataset.lcsPair + ' ' + p.dataset.lcsB) fails.push(`pair ${i + 1} is not printed as the bank has it`);
            const ok = forms.filter(([w]) => LW.includes(w)), s = forms.find(([w]) => w === p.dataset.lcsSample);
            if (!s || !LW.includes(s[0])) { fails.push(`pair ${i + 1}: its sample is not a join of the box`); return; }
            if (lv === 3 && ok.some(([w]) => INFO.sub.includes(w)) && !INFO.sub.includes(s[0])) fails.push(`pair ${i + 1}: level 3 shows a join with and, but, or, so where because, when, if, after, or before joins it`);
            if (lv < 3 && s !== ok[0]) fails.push(`pair ${i + 1}: the sample is not the first right join of the box`);
            const alsoW = ok.filter((x) => x !== s).map((x) => x[0]), also = alsoW.join(','), weak = (INFO.weak[p.dataset.lcsPair] || []).filter((w) => alsoW.includes(w));
            if (p.dataset.lcsAlso !== also) fails.push(`pair ${i + 1}: the other right words are not all named`);
            const al = p.querySelector('[data-lcs-also]');
            room(p.querySelector('[data-lcs-writes]'), s[1], `pair ${i + 1}`);
            if (p.querySelectorAll('[data-lcs-line]').length !== 2) fails.push(`pair ${i + 1} has not two lines`);
            const want = 'Also right: ' + [...alsoW.filter((w) => !weak.includes(w)), ...alsoW.filter((w) => weak.includes(w)).map((w) => `${w} (${INFO.better[s[0]]})`)].join(', ');
            if (isKey) { if (also ? !al || txt(al) !== want : al) fails.push(`the key of pair ${i + 1} does not name the other right words`);
              if (al && (R(al).right > R(p).right + 0.5 || al.scrollWidth > al.clientWidth + 1)) fails.push(`the other right words of pair ${i + 1} do not fit their row`); }
            else if (al) fails.push('the page of the child names the right words');
            ws.push(s[0]);
          });
          if (new Set(ws).size < 3) fails.push('the pairs ask fewer than three joining words: ' + ws.join(','));
          if (lv === 3 && ws.filter((w) => INFO.sub.includes(w)).length < 3) fails.push('level 3 asks fewer than three of because, when, if, after, before');
          const st = [...root.querySelectorAll('[data-lcs-stem]')];
          if (st.length !== d.stems || new Set(st.map((e) => e.dataset.lcsStem)).size !== st.length) fails.push(`${st.length} sentences to finish (${d.stems} with different joining words wanted)`);
          { const STOP = ['because', 'after', 'before', 'when', 'with', 'they', 'them', 'their', 'there', 'then', 'this', 'that', 'have', 'some', 'very', 'what', 'were', 'from', 'your', 'into', 'will'], cw = (x) => tok(x).filter((w) => w.length >= 4 && !STOP.includes(w));
            const pw = new Set(ps.flatMap((p) => cw(p.dataset.lcsPair + ' ' + p.dataset.lcsB)));
            st.forEach((e, i) => { const l = e.querySelector('[data-lcs-line]'), x = l && INFO.stems[l.dataset.lcsStarter]; if (x && cw(x.s + ' ' + x.sample).some((w) => pw.has(w))) fails.push(`sentence to finish ${i + 1} repeats a word of a pair on the page`); }); }
          st.forEach((e, i) => { const l = e.querySelector('[data-lcs-line]'), s = l && INFO.stems[l.dataset.lcsStarter];
            if (!s || s.w !== e.dataset.lcsStem || !LW.includes(s.w) || txt(l.querySelector('[data-lcs-starttext]')) !== s.s) { fails.push(`sentence to finish ${i + 1} does not start the line with a stem of this level`); return; }
            if (isKey && l.dataset.lcsAnswer !== s.sample) fails.push(`the key of sentence to finish ${i + 1} gives no sample`);
            // a full-width line, and the ending fits what the printed start leaves of it at the child's measure (CPL letters
            // across the whole line)
            const st0 = l.querySelector('[data-lcs-starttext]'), lw = R(l).width, left = lw - R(st0).width - 12;
            if (lw < FULL) fails.push(`sentence to finish ${i + 1}: a writing line ${Math.round(lw)} px wide`);
            if (s.sample.length * lw / INFO.cpl > left) fails.push(`sentence to finish ${i + 1}: its ending (${s.sample.length} letters) does not fit the rest of the line at ${INFO.cpl} letters a line`); });
        }
        if (mode === 'kinds') {
          const rows = [...root.querySelectorAll('[data-lcs-krow]')], cols = [...root.querySelectorAll('[data-lcs-col]')].map((e) => e.dataset.lcsCol);
          if (rows.length !== d.n) fails.push(`${rows.length} sentences, not ${d.n}`);
          if (cols.join() !== d.cols.join()) fails.push('the columns are not ' + d.cols.join(', '));
          const ks = rows.map((r) => r.dataset.lcsKrow);
          rows.forEach((r, i) => { const t = r.dataset.lcsText, k = kindOf(t);
            if (k !== r.dataset.lcsKrow) fails.push(`sentence ${i + 1} is filed as ${r.dataset.lcsKrow} but is ${k}: "${t}"`);
            if (txt(r.querySelector('[data-lcs-read]')) !== t) fails.push(`sentence ${i + 1} is not printed as it is filed`);
            if (Object.values(INFO.kinds.examples).includes(t)) fails.push(`sentence ${i + 1} is an example of the box`);
            if (lv < 3 && k === 'simple' && / and /.test(plainOf(t))) fails.push(`sentence ${i + 1} is a simple sentence with two subjects or verbs on level ${lv}`);
            const ticks = [...r.querySelectorAll('[data-lcs-tick]')], on = ticks.filter((x) => x.querySelector('[data-lcs-check]'));
            if (ticks.map((x) => x.dataset.lcsTick).join() !== d.cols.join()) fails.push(`sentence ${i + 1} has not a box under every kind`);
            if (isKey ? on.length !== 1 || on[0].dataset.lcsTick !== k : on.length) fails.push(`sentence ${i + 1}: ${on.length} check marks`);
            ticks.forEach((x, j) => { const c = cols[j] && root.querySelector(`[data-lcs-col="${cols[j]}"]`); if (c && Math.abs((R(x).left + R(x).right) / 2 - (R(c).left + R(c).right) / 2) > 3) fails.push('a box does not stand under its column'); }); });
          d.cols.forEach((c) => { const n = ks.filter((k) => k === c).length; if (n !== d.n / d.cols.length) fails.push(`${n} ${c} sentences (${d.n / d.cols.length} wanted)`); });
          if (orderBad(ks)) fails.push('the kinds stand in a pattern: ' + ks.join(','));
          if (lv === 3 && rows.filter((r) => INFO.kinds.two.includes(r.dataset.lcsText)).length < 2) fails.push('level 3 has fewer than two simple sentences with two subjects or two verbs');
          // a comma alone does not make a compound sentence: series commas (level 1 two, level 2 one); level 3 one simple
          // sentence with after or before and no subject and verb of its own
          const nSer = rows.filter((r) => INFO.kinds.series.includes(r.dataset.lcsText)).length, nPrep = rows.filter((r) => INFO.kinds.prep.includes(r.dataset.lcsText)).length;
          { const wantSer = { 1: 2, 2: 1, 3: 0 }[lv], wantPrep = { 1: 0, 2: 0, 3: 1 }[lv];   // literal: never read from LEVELS
            if (nSer !== wantSer) fails.push(`${nSer} simple sentences with series commas (${wantSer} wanted)`);
            if (nPrep !== wantPrep) fails.push(`${nPrep} simple sentences with after or before and no subject and verb (${wantPrep} wanted)`); }
          const boxText = txt(root.querySelector('[data-lcs-rulebox]'));
          if (!/Simple: one complete thought with a subject and a verb\./.test(boxText) || /one subject and one verb/.test(boxText) || !/Compound:/.test(boxText) || /Complex: a sentence plus a part that cannot stand alone\./.test(boxText) !== (d.cols.length === 3) || /two subjects or two verbs/.test(boxText) !== (lv === 3) || /has its own subject and verb/.test(boxText) !== (lv === 3)) fails.push('the rule box does not tell the kinds of this level');
        }
        if (mode === 'build') {
          { const bx = txt(root.querySelector('[data-lcs-rulebox]'));
            if (/Complex: a sentence plus a part that cannot stand alone\. The part starts with because, when, if, after, or before\./.test(bx) !== (lv > 1) || /If the part that cannot stand alone comes first, put a comma after it: When it gets dark, owls hoot\./.test(bx) !== (lv > 1)) fails.push('the rule box does not tell the complex sentence and its comma on levels 2 and 3'); }
          const ps = [...root.querySelectorAll('[data-lcs-pair]')];
          if (ps.length !== d.pairs) fails.push(`${ps.length} pairs, not ${d.pairs}`);
          ps.forEach((p, i) => { const x = INFO.build[p.dataset.lcsPair];
            if (!x || x.b !== p.dataset.lcsB || txt(p.querySelector('[data-lcs-pairtext]')) !== x.a + ' ' + x.b) { fails.push(`pair ${i + 1} is no pair of the bank`); return; }
            if (d.both && !x.cx) fails.push(`pair ${i + 1} cannot be written as a complex sentence`);
            const ls = [...p.querySelectorAll('[data-lcs-line]')], wr = [...p.querySelectorAll('[data-lcs-wrow]')], gs = [...p.querySelectorAll('[data-lcs-writes]')];
            if (ls.length !== (d.both ? 4 : 2) || gs.length !== (d.both ? 2 : 1) || (d.both && wr.map((e) => e.dataset.lcsWrow).join() !== 'compound,complex')) fails.push(`pair ${i + 1} has not ${d.both ? 'two lines for the compound sentence and two for the complex one' : 'two lines'}`);
            // the label stands above its first line, never beside it
            wr.forEach((e) => { const lb = e.querySelector('[data-lcs-wlabel]'), l0 = e.querySelector('[data-lcs-line]'); if (!lb || !l0 || R(lb).bottom > R(l0).top + 0.5) fails.push(`pair ${i + 1}: "${e.dataset.lcsWrow}" does not stand above its lines`); });
            room(gs[0], x.comp, `the compound sentence of pair ${i + 1}`);
            if (d.both) room(gs[1], x.cx, `the complex sentence of pair ${i + 1}`);
            if (kindOf(x.comp) !== 'compound' || (x.cx && kindOf(x.cx) !== 'complex')) fails.push(`the samples of pair ${i + 1} are not of their kinds`); });
          if (lv === 1) { const ws = ps.map((p) => ((INFO.build[p.dataset.lcsPair] || {}).comp || '').match(/, (and|but|so|or) /)).filter(Boolean).map((m) => m[1]); if (new Set(ws).size < 3) fails.push('the compound sentences of level 1 use fewer than three joining words'); }
          const pa = root.querySelector('[data-lcs-task="para"]');
          if (!!pa !== !!d.para) fails.push('the paragraph belongs to level 3 only');
          if (pa) {
            const story = INFO.stories[pa.dataset.lcsStory], ss = [...pa.querySelectorAll('[data-lcs-psent]')].map(txt);
            if (!story || ss.length !== 6 || ss.some((s) => !story.includes(s))) fails.push('the paragraph is not six sentences of one story');
            else { const at = ss.map((s) => story.indexOf(s)); if (at.some((x, i) => i && x !== at[i - 1] + 1) || at[0] % 2 !== 0) fails.push('the paragraph is not three pairs in a row of its story'); }
            if (ss.some((s) => kindOf(s) !== 'simple' || / and /.test(s))) fails.push('a sentence of the paragraph is not a short simple sentence');
            if (ps.some((p) => INFO.build[p.dataset.lcsPair] && INFO.build[p.dataset.lcsPair].story === pa.dataset.lcsStory)) fails.push('the pair of part 1 is a pair of the story');
            const ls = [...pa.querySelectorAll('[data-lcs-line]')];
            if (ls.length !== d.lines) fails.push(`${ls.length} lines for the paragraph`);
            // the paragraph's three sentences (any order of the kinds) fit its lines at the child's measure
            { const story = INFO.stories[pa.dataset.lcsStory] || [], ps = Object.values(INFO.build).filter((x) => x.story === pa.dataset.lcsStory && ss.includes(x.a)), longest = ps.reduce((a, x) => a + Math.max(x.comp.length, (x.cx || '').length) + 1, 0);
              if (ps.length === 3 && longest > INFO.cpl * d.lines) fails.push(`the paragraph does not fit its ${d.lines} lines at ${INFO.cpl} letters a line`);
              if (isKey) { const cx = +pa.dataset.lcsCxat, ordered = ss.filter((x, k) => k % 2 === 0).map((a) => ps.find((x) => x.a === a)).filter(Boolean); room(pa.querySelector('[data-lcs-writes]'), ordered.length === 3 ? ordered.map((x, k) => (k === cx ? x.cx : x.comp)).join(' ') : undefined, 'the paragraph'); } else room(pa.querySelector('[data-lcs-writes]'), undefined, 'the paragraph'); }
            if (isKey) { const s = ls.map((l) => l.dataset.lcsAnswer || '').join(' ').trim(), sents = s.match(/[^.]+\./g) || [], kinds = sents.map((x) => kindOf(x.trim()));
              if (kinds.filter((k) => k === 'compound').length !== 2 || kinds.filter((k) => k === 'complex').length !== 1 || sents.length !== 3) fails.push('the key\'s paragraph is not two compound sentences and one complex sentence');
              if (+pa.dataset.lcsCxat !== kinds.indexOf('complex')) fails.push('the complex sentence of the key is not in its place'); }
            { const cl = pa.querySelector('[data-lcs-checklist]'); if (!cl || !/two compound sentences/.test(txt(cl)) || !/one complex sentence/.test(txt(cl))) fails.push('no check list for the paragraph'); }
          }
        }
        if (mode === 'compare') {
          const an = [...root.querySelectorAll('[data-lcs-animal]')];
          if (an.length !== 3) fails.push(`${an.length} animals, not three`);
          const size = {}, wd = {};
          an.forEach((a) => { const im = a.querySelector('img'), nm = txt(a.querySelector('[data-lcs-animalname]')); size[nm] = +a.dataset.lcsSize; wd[nm] = im ? R(im).width : 0;
            if (nm !== a.dataset.lcsAnimal || !im || im.dataset.lcsPic.split('/')[1].replace(/_.*/, '') !== nm) fails.push(`the picture of the ${nm} is not named with its word`);
            if (R(a.querySelector('[data-lcs-animalname]')).top < R(im).bottom - 1) fails.push(`the name of the ${nm} is not under its picture`); });
          const bySize = Object.keys(size).sort((x, y) => size[x] - size[y]);
          if (bySize.length === 3 && !(wd[bySize[0]] * 1.2 < wd[bySize[1]] && wd[bySize[1]] * 1.2 < wd[bySize[2]])) fails.push('the three animals are not drawn at three sizes');
          if (/012|210/.test(an.map((a) => a.dataset.lcsSize).join(''))) fails.push('the animals stand from small to big');
          const tl = [...root.querySelectorAll('[data-lcs-tline]')];
          if (tl.length !== d.lines) fails.push(`${tl.length} sentences about the animals, not ${d.lines}`);
          const wants = tl.map((e) => e.dataset.lcsTline);
          if (wants.filter((w) => w === 'comp').length < 2 || wants.filter((w) => w === 'sup').length !== 1 || wants.filter((w) => w === 'base').length !== 1) fails.push('the sentences do not ask two or more comparisons, one -est, and one word as it is');
          tl.forEach((e, i) => { const t = e.dataset.lcsText, w = e.dataset.lcsW, F = INFO.words.find((x) => x.base === w), bl = e.querySelector('[data-lcs-blank]');
            if (!F || !bl) { fails.push(`sentence ${i + 1} has no word or no blank`); return; }
            if (textOf(e, '[data-lcs-sent]') !== t || txt(e.querySelector('[data-lcs-paren]')) !== '(' + w + ')') fails.push(`sentence ${i + 1} is not printed with its word in ( )`);
            const want = e.dataset.lcsTline, form = want === 'base' ? F.base : F[want];
            if (bl.dataset.lcsWant !== form) fails.push(`the blank of sentence ${i + 1} is keyed to "${bl.dataset.lcsWant}", not "${form}"`);
            const sig = want === 'comp' ? /___ than the [a-z]+\.$/.test(t) : want === 'sup' ? /the ___ of the three\.$/.test(t) : /very ___\.$/.test(t);
            if (!sig) fails.push(`sentence ${i + 1} does not decide its form by its words`);
            // the fact is true of the animals as they are drawn
            const nm = (t.match(/^The ([a-z]+) /) || [])[1], other = (t.match(/than the ([a-z]+)\.$/) || [])[1], bigW = ['big', 'heavy', 'tall'].includes(w);
            if (!(nm in size)) fails.push(`sentence ${i + 1} names an animal not on the page`);
            else if (want === 'comp') { if (!(other in size) || (bigW ? wd[nm] <= wd[other] : wd[nm] >= wd[other])) fails.push(`sentence ${i + 1} is not true of the animals as they are drawn`); }
            else if (bigW ? wd[nm] !== Math.max(...Object.values(wd)) : wd[nm] !== Math.min(...Object.values(wd))) fails.push(`sentence ${i + 1} is not true of the animals as they are drawn`); });
          const tr = [...root.querySelectorAll('[data-lcs-trow]')], ex = [...root.querySelectorAll('[data-lcs-exrow]')].map((e) => e.dataset.lcsExrow);
          const want = { er: d.er, more: d.more, irr: d.irr };
          Object.entries(want).forEach(([f, n]) => { if (tr.filter((r) => r.dataset.lcsForm === f).length !== n) fails.push(`the table has not ${n} ${f} words`); });
          // the example rows (literal here, not read from LEVELS: a check that read them there would agree with any change)
          if (ex.join() !== (lv === 1 ? 'big,happy' : 'big,happy,careful')) fails.push('the example rows are not the ones of this level');
          // the spelling moves stand in grey example rows; no sentence about the animals asks a word of an example row
          [...root.querySelectorAll('[data-lcs-exrow]')].forEach((r) => { const F = INFO.words.find((x) => x.base === r.dataset.lcsExrow), shown = [...r.querySelectorAll('[data-lcs-tword], [data-lcs-exform]')].map(txt).join(', ');
            if (!F || shown !== [F.base, F.comp, F.sup].join(', ')) fails.push(`the example row "${r.dataset.lcsExrow}" does not show its three forms`);
            if (r.querySelector('[data-lcs-line]')) fails.push(`the example row "${r.dataset.lcsExrow}" has lines to write on`); });
          tl.forEach((e, i) => { if (ex.includes(e.dataset.lcsW)) fails.push(`sentence ${i + 1} asks "${e.dataset.lcsW}", whose forms an example row prints`); });
          tr.forEach((r, i) => { const F = INFO.words.find((x) => x.base === r.dataset.lcsTrow), ls = [...r.querySelectorAll('[data-lcs-line]')];
            if (!F || F.form !== r.dataset.lcsForm || txt(r.querySelector('[data-lcs-tword]')) !== F.base) { fails.push(`row ${i + 1} of the table is not a word of the bank`); return; }
            if (INFO.both.includes(F.base)) fails.push(`"${F.base}" takes both forms in common use`);
            if (ex.includes(F.base) || tl.some((e) => e.dataset.lcsW === F.base)) fails.push(`"${F.base}" is printed elsewhere on the page with its forms`);
            if (ls.length !== 2) fails.push(`row ${i + 1} has not two lines`);
            if (isKey && (ls[0] && ls[0].dataset.lcsAnswer !== F.comp || ls[1] && ls[1].dataset.lcsAnswer !== F.sup)) fails.push(`the key of "${F.base}" is not ${F.comp}, ${F.sup}`); });
          if (!tr.some((r) => (INFO.words.find((x) => x.base === r.dataset.lcsTrow) || {}).kind === 'adv')) fails.push('the table has no adverb');
        }
        if (mode === 'comparepick') {
          const rows = [...root.querySelectorAll('[data-lcs-cmp]')];
          if (rows.length !== d.n) fails.push(`${rows.length} sentences, not ${d.n}`);
          const all = (F) => [F.base, F.comp, F.sup];
          rows.forEach((r, i) => { const t = r.dataset.lcsText, F = INFO.words.find((x) => x.base === r.dataset.lcsW), os = [...r.querySelectorAll('[data-lcs-opt]')].map((o) => o.dataset.lcsOpt), right = r.dataset.lcsCmp;
            if (!F) { fails.push(`sentence ${i + 1} has no word of the bank`); return; }
            if (textOf(r, '[data-lcs-sent]') !== t) fails.push(`sentence ${i + 1} is not printed as the bank has it`);
            if (os.length !== 3 || new Set(os).size !== 3 || !os.includes(right) || (r.querySelector('[data-lcs-ok]') || {}).dataset.lcsOpt !== right) fails.push(`sentence ${i + 1}: not three forms with its answer keyed`);
            if (!r.dataset.lcsAd && os.sort().join() !== all(F).sort().join()) fails.push(`sentence ${i + 1} does not offer the three forms of "${F.base}"`);
            if (os.some((o) => !INFO.words.some((x) => all(x).includes(o)) || /more better|more worse|most best/.test(o))) fails.push(`sentence ${i + 1} offers a form that is not a real one`);
            const kind = F.comp === right ? 'comp' : F.sup === right ? 'sup' : F.base === right ? 'base' : 'other';
            if (!r.dataset.lcsAd) { const sig = kind === 'comp' ? /___ (\w+ )?than\b/.test(t) || /___ [a-z ]+than\b/.test(t) : kind === 'sup' ? /\bthe ___/.test(t) : kind === 'base' ? /\b(very|too|as) ___/.test(t) && !/\bthan\b/.test(t) : false; if (!sig) fails.push(`sentence ${i + 1} does not decide "${right}" by its words`);
              if (lv === 1 && F.form !== 'er') fails.push(`sentence ${i + 1} is not an -er word on level 1`); if (lv === 3 && F.form !== 'irr') fails.push(`sentence ${i + 1} is no word that changes on level 3`); }
            else if (lv < 3) fails.push('the adjective or the adverb belongs to level 3'); });
          placeCheck(rows.map((r) => [...r.querySelectorAll('[data-lcs-opt]')]), 'form');
          if (new Set(rows.map((r) => r.dataset.lcsCmp)).size !== rows.length) fails.push('two sentences have one answer');
          if (lv === 3 && rows.filter((r) => r.dataset.lcsAd).length !== d.ad) fails.push(`not ${d.ad} sentences that ask the adjective or the adverb`);
          // the rule box: the rows of this level, and no example that answers an item
          { const box = txt(root.querySelector('[data-lcs-rulebox]')), exs = [...root.querySelectorAll('[data-lcs-rulebox] [data-lcs-example]')].map(txt).join(' | ').toLowerCase();
            if (/Words with one syllable take -er and -est\. Most longer words \(careful, beautiful\) take more and most\./.test(box) !== (lv === 2) || /With very, too, or as \.\.\. as, use the word as it is: very tall\./.test(box) !== (lv < 3) || /badly, worse, worst/.test(box) !== (lv === 3) || /Owls fly silently\./.test(box) !== (lv === 3)) fails.push('the rule box does not hold the rows of this level');
            rows.forEach((r, i) => { const w = r.dataset.lcsCmp.toLowerCase(); if (new RegExp("(^|[^a-z'])" + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "($|[^a-z'])").test(exs)) fails.push(`an example of the rule box answers sentence ${i + 1} ("${w}")`); }); }
        }
        if (mode === 'possess' || mode === 'apostrophe') {
          const box = txt(root.querySelector('[data-lcs-rulebox]'));
          if (/On this page, every owner is one person or one animal\./.test(box) !== (mode === 'apostrophe' && lv === 1)) fails.push('the rule box of level 1 does not say that every owner is one (or another level says it)');
          if (!/One owner: add 's/.test(box) || /More than one owner, plural ends in s/.test(box) !== (lv > 1) || /does not end in s/.test(box) !== (lv === 3)) fails.push('the rule box does not tell the rules of this level');
          const nouns = [...root.querySelectorAll('[data-lcs-n]')].map((e) => e.dataset.lcsN);
          if (new Set(nouns).size !== nouns.length) fails.push('one owner word stands twice on the page');
          // plurals that do not end in s (child, man, woman, mouse, goose) belong to level 3 only
          if (lv < 3 && nouns.some((n) => (INFO.owners[n] || {}).irr)) fails.push(`a plural that does not end in s stands on level ${lv}`);
          const pos = (N, k) => (k === 'one' ? N.one + "'s" : N.irr ? N.many + "'s" : N.many + "'");
          if (mode === 'possess') {
            const own = [...root.querySelectorAll('[data-lcs-own]')];
            const want = d.own, got = {}; own.forEach((e) => { const N = INFO.owners[e.dataset.lcsN], k = e.dataset.lcsOwn === 'many' && N && N.irr ? 'imany' : e.dataset.lcsOwn; got[k] = (got[k] || 0) + 1; });
            if (JSON.stringify(Object.keys(want).sort().map((k) => [k, want[k]])) !== JSON.stringify(Object.keys(got).sort().map((k) => [k, got[k]]))) fails.push('the owners of part 1 are not the ones of this level: ' + JSON.stringify(got));
            own.forEach((e, i) => { const N = INFO.owners[e.dataset.lcsN], k = e.dataset.lcsOwn, pr = txt(e.querySelector('[data-lcs-prompt]')), l = e.querySelector('[data-lcs-line]');
              if (!N) { fails.push(`owner ${i + 1} is no owner of the bank`); return; }
              const m = k === 'one' ? pr.match(new RegExp('^An? ' + N.one + ' has an? ([a-z]+)\\.$')) : pr.match(new RegExp('^(Two|Three) ' + N.many + ' have ([a-z]+)\\.$'));
              if (!m) { fails.push(`owner ${i + 1}: "${pr}" does not say how many owners there are`); return; }
              const thing = k === 'one' ? m[1] : m[2], right = pos(N, k) + ' ' + thing;
              if (e.dataset.lcsRight !== right) fails.push(`owner ${i + 1} is keyed to "${e.dataset.lcsRight}", not "${right}"`);
              if (!N.things.some(([t, ts]) => (k === 'one' ? t : ts) === thing)) fails.push(`owner ${i + 1}: "${thing}" is no thing of the ${N.one}`);
              if (!l || l.dataset.lcsStarter !== 'the' || (isKey && l.dataset.lcsAnswer !== right)) fails.push(`owner ${i + 1}: the line does not start with "the", or the key does not write "${right}"`); });
            { const ok = own.map((e) => (e.dataset.lcsOwn === 'many' && (INFO.owners[e.dataset.lcsN] || {}).irr ? 'imany' : e.dataset.lcsOwn)); if (new Set(ok).size > 1 && orderBad(ok)) fails.push('the owners of part 1 stand in a pattern: ' + ok.join(',')); }
            if (Object.keys(d.own).length > 1 && /^(o+m+|m+o+)$/.test(own.map((e) => e.dataset.lcsOwn[0]).join(''))) fails.push('the owners of part 1 stand in two blocks');
            const pk = [...root.querySelectorAll('[data-lcs-ownpick]')];
            const nPick = Object.values(d.pick).reduce((a, c) => a + c, 0);
            if (pk.length !== nPick) fails.push(`${pk.length} sentences to circle in, not ${nPick}`);
            pk.forEach((e, i) => { const N = INFO.owners[e.dataset.lcsN], k = e.dataset.lcsOwnpick, t = e.dataset.lcsText, os = [...e.querySelectorAll('[data-lcs-opt]')].map((o) => o.dataset.lcsOpt);
              if (!N) { fails.push(`sentence ${i + 1} is about no owner of the bank`); return; }
              const right = k === 'plain' ? N.many : pos(N, k);
              const all = d.opts === 2 ? [N.one + "'s", N.many] : [N.one + "'s", N.many, pos(N, 'many')];
              if (os.length !== d.opts || os.slice().sort().join() !== all.slice().sort().join() || (e.querySelector('[data-lcs-ok]') || {}).dataset.lcsOpt !== right) fails.push(`sentence ${i + 1}: the words to choose from are not ${all.join(', ')} with "${right}" keyed`);
              if (textOf(e, '[data-lcs-sent]') !== t) fails.push(`sentence ${i + 1} is not printed as it is filed`);
              const how = k === 'plain' ? INFO.plain.includes(t) : k === 'one' ? new RegExp('belongs to (the|my) ' + N.one + '\\. It is (the|my) ___ ').test(t) : new RegExp('belong to (the|my) (two|three) ' + N.many + '\\. They are (the|my) ___ ').test(t);
              if (!how) fails.push(`sentence ${i + 1} does not make the number of owners plain`); });
            placeCheck(pk.map((e) => [...e.querySelectorAll('[data-lcs-opt]')]), 'word');
            if (lv === 3 && pk.filter((e) => (INFO.owners[e.dataset.lcsN] || {}).irr).length < 2) fails.push('level 3 has fewer than two plurals that do not end in s to circle');
            { const th = [...own.map((e) => e.dataset.lcsRight.split(' ').pop()), ...pk.filter((e) => e.dataset.lcsOwnpick !== 'plain').map((e) => e.dataset.lcsText.split(' ')[1])].map((w) => w.replace(/s$/, '')); if (new Set(th).size !== th.length) fails.push('one thing is owned twice on the page: ' + th.join(',')); }
          } else {
            const fx = [...root.querySelectorAll('[data-lcs-fix]')], want = d.kinds, ks = fx.map((e) => e.dataset.lcsFix);
            Object.entries(want).forEach(([k, n]) => { if (ks.filter((x) => x === k).length !== n) fails.push(`not ${n} sentences of the kind ${k}`); });
            if (orderBad(ks)) fails.push('the kinds stand in a pattern: ' + ks.join(','));
            fx.forEach((e, i) => { const N = INFO.owners[e.dataset.lcsN], k = e.dataset.lcsFix, sh = txt(e.querySelector('[data-lcs-shown]')), l = e.querySelector('[data-lcs-line]');
              if (!N) { fails.push(`sentence ${i + 1} is about no owner of the bank`); return; }
              const shown = k === 'one' ? N.one + 's' : N.many, right = k === 'plain' ? N.many : pos(N, k);
              if (sh !== shown || /'/.test(sh)) fails.push(`sentence ${i + 1} does not print "${shown}" without an apostrophe`);
              if (N.irr && (k === 'one' || sh !== N.many)) fails.push(`sentence ${i + 1} prints a word that is no word (${sh})`);
              if (e.dataset.lcsRight !== right || (isKey && (!l || l.dataset.lcsAnswer !== right))) fails.push(`sentence ${i + 1} is not keyed to "${right}"`);
              const t = e.dataset.lcsText, first = e.dataset.lcsCtx || '';
              // level 1: no number given (the child decides by whether something owned follows); levels 2 and 3: a first
              // sentence says how many there are
              if (lv === 1) { if (first || /\b(one|two|three|four|One|Two|Three)\b/.test(txt(e.querySelector('[data-lcs-read]')))) fails.push(`sentence ${i + 1}: level 1 gives a number of owners`); }
              else { const say = k === 'one' ? new RegExp('\\b(one|One) (art )?(new )?' + N.one + '\\b').test(first) : new RegExp('\\b(two|three|four|Two|Three) (art )?(new )?' + N.many + '\\b').test(first);
                if (!say) fails.push(`sentence ${i + 1}: the first sentence does not say how many there are`); }
              if (txt(e.querySelector('[data-lcs-read]')) !== t.replace('___', shown)) fails.push(`sentence ${i + 1} is not printed as it is filed`); });
            if (lv === 3 && fx.filter((e) => (INFO.owners[e.dataset.lcsN] || {}).irr).length !== d.irr) fails.push(`not ${d.irr} plurals that do not end in s`);
          }
        }
        if (mode === 'titles' || mode === 'titlecircle') {
          const tc = (lc) => { const ws = lc.split(' '); return ws.map((w, i) => { const bare = w.replace(/:$/, ''), ac = i > 0 && /:$/.test(ws[i - 1]); return INFO.small.includes(bare) && i > 0 && i < ws.length - 1 && !ac ? w : w[0].toUpperCase() + w.slice(1); }).join(' '); };
          const box = txt(root.querySelector('[data-lcs-rulebox]'));
          if (INFO.small.some((w) => !new RegExp('\\b' + w + '\\b').test(box.split('middle of a title:')[1] || '')) || /colon/.test(box) !== (lv === 3)) fails.push('the rule box does not list the small words (and the colon rule on level 3)');
          if (/\b(with|from|about|into)\b/.test(((box.split('middle of a title:')[1] || '').split('.')[0]))) fails.push('the rule box lists a word whose capital style guides dispute');
          const check = (lc) => { const ws = lc.split(' '), bare = ws.map((w) => w.replace(/:$/, '')), named = bare.some((w) => INFO.names.map((x) => x.toLowerCase()).includes(w));
            if (bare.some((w) => INFO.never.includes(w))) return 'has a word whose capital is disputed';
            if (lv === 1 && (ws.length !== 3 || named || /:/.test(lc))) return 'is not three words';
            if (lv === 2 && (ws.length < 4 || /:/.test(lc) || named || !bare.slice(1, -1).some((w) => INFO.small.includes(w)))) return 'has no small word in the middle';
            if (lv === 3 && !/:/.test(lc) && !named) return 'has no colon and no name';
            return ''; };
          if (mode === 'titles') {
            const ts = [...root.querySelectorAll('[data-lcs-title]')];
            if (ts.length !== d.n) fails.push(`${ts.length} titles, not ${d.n}`);
            ts.forEach((e, i) => { const lc = e.dataset.lcsTitle, l = e.querySelector('[data-lcs-line]'), bad = check(lc);
              if (bad) fails.push(`title ${i + 1} ${bad}`);
              if (txt(e.querySelector('[data-lcs-tl]')) !== lc || lc !== lc.toLowerCase()) fails.push(`title ${i + 1} is not printed in small letters`);
              if (e.dataset.lcsRight !== tc(lc) || (isKey && (!l || l.dataset.lcsAnswer !== tc(lc)))) fails.push(`title ${i + 1} is not keyed to "${tc(lc)}"`); });
            const own = [...root.querySelectorAll('[data-lcs-ownline]')].map((e) => e.dataset.lcsOwnline);
            if (own.join() !== 'Book,Book,Book,Report') fails.push('not three lines for books and one for a report');
          } else {
            const ts = [...root.querySelectorAll('[data-lcs-ctitle]')];
            if (ts.length !== d.n) fails.push(`${ts.length} titles, not ${d.n}`);
            ts.forEach((e, i) => { const lc = e.dataset.lcsCtitle, R2 = tc(lc).split(' '), ws = [...e.querySelectorAll('[data-lcs-tw]')], bad = check(lc);
              if (bad) fails.push(`title ${i + 1} ${bad}`);
              if (ws.map(txt).join(' ') !== lc) fails.push(`title ${i + 1} is not printed in small letters word by word`);
              ws.forEach((w, k) => { const cap = R2[k] && R2[k][0] !== R2[k][0].toLowerCase(), ring = !!w.querySelector('[data-lcs-ringmark]');
                if (!!w.dataset.lcsCap !== cap) fails.push(`title ${i + 1}: "${txt(w)}" is filed ${w.dataset.lcsCap ? 'with' : 'without'} a capital`);
                if (isKey ? ring !== cap : ring) fails.push(`title ${i + 1}: "${txt(w)}" is ringed on the page of the child, or the key rings it wrong`);
                if (ring) { const q = R(w.querySelector('[data-lcs-ringmark]')), r = R(w); if (q.left > r.left || q.right < r.right) fails.push('a ring of the key does not go round its word'); } });
              if (ws.length >= 2 && Math.min(...ws.slice(1).map((w, k) => R(w).left - R(ws[k]).right).filter((g) => g > 0)) < 22) fails.push(`title ${i + 1}: two words stand closer than 22 px (a ring would touch the next word)`);
              { const rr = [...e.querySelectorAll('[data-lcs-ringmark]')].map(R); for (let a = 1; a < rr.length; a++) if (rr[a].left < rr[a - 1].right + 3 && Math.abs(rr[a].top - rr[a - 1].top) < 5) fails.push(`title ${i + 1}: two rings of the key touch`); }
              if (lv === 1 && ts.filter((t) => t.dataset.lcsCtitle.split(' ').slice(1, -1).some((w) => INFO.small.includes(w))).length < Math.ceil(d.n / 2)) fails.push('fewer than half the titles of level 1 have a small word in the middle'); });
            const wh = [...root.querySelectorAll('[data-lcs-which]')];
            if (wh.length !== d.which) fails.push(`${wh.length} titles printed two ways, not ${d.which}`);
            wh.forEach((e, i) => { const os = [...e.querySelectorAll('[data-lcs-opt]')], right = e.dataset.lcsWhich, ok = os.filter((o) => o.dataset.lcsOk);
              if (os.length !== 2 || ok.length !== 1 || ok[0].dataset.lcsOpt !== right || tc(right.toLowerCase()) !== right) fails.push(`title ${i + 1} of part 2 is not printed right and wrong with the right one keyed`);
              const wrong = os.find((o) => !o.dataset.lcsOk); if (wrong && (wrong.dataset.lcsOpt.toLowerCase() !== right.toLowerCase() || wrong.dataset.lcsOpt === right || wrong.dataset.lcsOpt.split(' ').filter((w, k) => w !== right.split(' ')[k]).length !== 1)) fails.push(`the wrong way of title ${i + 1} differs in more than one capital`);
              if (ts.some((t) => t.dataset.lcsCtitle === right.toLowerCase())) fails.push(`title ${i + 1} of part 2 stands in part 1 too`); });
            if (wh.length === 2 && wh.map((e) => [...e.querySelectorAll('[data-lcs-opt]')].findIndex((o) => o.dataset.lcsOk)).join('') !== '01' && wh.map((e) => [...e.querySelectorAll('[data-lcs-opt]')].findIndex((o) => o.dataset.lcsOk)).join('') !== '10') fails.push('both right titles of part 2 stand in one place');
          }
        }
        // no blank band of more than GAP px between two tasks (the rows of a card) or between two blocks of the page
        { const byParent = new Map();
          root.querySelectorAll('[data-lcs-item]').forEach((e) => { const p = e.parentElement; if (!byParent.has(p)) byParent.set(p, []); byParent.get(p).push(R(e)); });
          for (const rs of byParent.values()) { rs.sort((a, b) => a.top - b.top); let low = rs.length ? rs[0].bottom : 0; for (let k = 1; k < rs.length; k++) { const g = rs[k].top - low; if (g > INFO.gap + 0.5) { fails.push(`a blank band of ${Math.round(g)} px between two tasks`); break; } low = Math.max(low, rs[k].bottom); } }
          const bl = blocks.map(R); for (let k = 1; k < bl.length; k++) { const g = bl[k].top - bl[k - 1].bottom; if (g > INFO.gap + 0.5) fails.push(`a blank band of ${Math.round(g)} px between two blocks`); }
          // and none at the foot of a card, below its last task
          root.querySelectorAll('[data-lcs-task]').forEach((c) => { const low = Math.max(...[...c.querySelectorAll('[data-lcs-item], [data-lcs-line], [data-lcs-read], [data-lcs-label], [data-lcs-opts], [data-lcs-para], [data-lcs-trio]')].map((e) => R(e).bottom));
            const g = R(c).bottom - parseFloat(cs(c).paddingBottom) - low; if (g > INFO.gap + 0.5) fails.push(`a blank band of ${Math.round(g)} px at the foot of a card (${c.dataset.lcsTask})`); }); }
        // no answer the child writes is printed in the instruction, a task line or a rule box of the page
        { const other = [ins, ...root.querySelectorAll('[data-lcs-rulebox], [data-lcs-label]')].filter(Boolean).map(txt).join(' | ').toLowerCase(), ans = [];
          if (mode === 'compare') { root.querySelectorAll('[data-lcs-trow]').forEach((r) => { const F = INFO.words.find((x) => x.base === r.dataset.lcsTrow); if (F) ans.push(F.comp, F.sup); }); root.querySelectorAll('[data-lcs-tline] [data-lcs-blank]').forEach((b) => ans.push(b.dataset.lcsWant)); }
          if (mode === 'possess') { root.querySelectorAll('[data-lcs-own]').forEach((e) => ans.push(e.dataset.lcsRight.split(' ')[0])); root.querySelectorAll('[data-lcs-ownpick] [data-lcs-blank]').forEach((b) => ans.push(b.dataset.lcsWant)); }
          if (mode === 'apostrophe') root.querySelectorAll('[data-lcs-fix]').forEach((e) => ans.push(e.dataset.lcsRight));
          ans.filter(Boolean).forEach((w) => { const re = new RegExp("(^|[^a-z'])" + w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "($|[^a-z'])"); if (re.test(other)) fails.push(`the answer "${w}" is printed in a line or a box of the page`); }); }
        return fails;
      }, LEVELS, INFO, { ROW });
    },
  };
}

/* ------------------------------------------------------------------ the item bank of the unit checks */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's own items (plan(), the page's
 *  draw, with its rules: one right answer, the places mixed), each made a card of its own with its answer in its markup.
 *   joinpick (G3-521)  a sentence with its blank and the joining words to choose from: the right word carries
 *            data-lcs-correct, the blank carries what the child writes in it (", so": and, but, or, so take their comma).
 *   kinds (G3-522)  one sentence of the table and its three kinds as words to circle (simple, compound, complex: the
 *            columns of the page, in their order); the right kind carries data-lcs-correct. Eight of the page's rows.
 *   comparepick (G3-525)  a sentence and the three forms of its word: the right form carries data-lcs-correct, and the key
 *            writes it into the blank.
 *   possess (G3-526)  an owner and its thing (task 1: "Two dogs have bones."): the line starts with "the" and carries
 *            the right words (data-lcs-answer: dogs' bones).
 *   titles (G3-528)  a title printed in small letters and a line to write it with the right capitals (task 1;
 *            data-lcs-answer). Its lesson's first page, G3-529, is circled word by word: its first word is always the
 *            first right answer, so its cards would all have the answer in one place. */
const SENT_CHECK_MODES = new Set(['joinpick', 'kinds', 'comparepick', 'possess', 'titles']);
function sentCheckPage(mode, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`sentences-g3 check: the sentences are English sentences (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  const P = plan(BANK, mode, lv, rng);
  const choice = (o, okk) => opt(o, okk, key, `data-lcs-choice="${A(o)}"${okk ? ' data-lcs-correct="1"' : ''}`);
  const opts = (xs, right) => `<div data-lcs-checkopts style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px 18px">${xs.map((o) => choice(o, o === right)).join('')}</div>`;
  const answered = (html, a) => html.replace('<span data-lcs-blank', `<span data-lcs-answer="${A(a)}" data-lcs-blank`);
  const card = (attrs, inner) => `<div ${attrs} style="display:flex;flex-direction:column;align-items:center;gap:7px;padding:7px 14px 9px">${inner}</div>`;
  const cards = [];
  // (review en-1119-lit) every card names its kind (data-lcs-ckind): form B asks the kinds form A asks, card by card, and the
  // first cards of a page are one of each kind (a check takes the first cards first)
  const lead = (list, kindOf, kinds) => { const out = []; for (const k of kinds) { const i = list.findIndex((x) => kindOf(x) === k && !out.includes(x)); if (i >= 0) out.push(list[i]); } return [...out, ...list.filter((x) => !out.includes(x))]; };
  if (mode === 'joinpick') {
    // with a comma (and, but, or, so join two sentences) and without (because)
    const ck = (x) => (COORD.includes(x.k) ? 'comma' : 'nocomma');
    for (const x of lead(P.items, ck, ['comma', 'nocomma'])) { const want = COORD.includes(x.k) ? ', ' + x.k : x.k;
      cards.push(card(`data-lcs-pickcheck="${x.k}" data-lcs-ckind="${ck(x)}" data-lcs-text="${A(x.t)}"`, `<div style="text-align:center">${answered(withBlank(x.t, 64 * 2, want, key, 19), want)}</div>` + opts(x.opts, x.k))); }
  } else if (mode === 'kinds') {
    const cols = LEVELS.kinds[lv].cols;
    // simple with a list (the trap of the page: commas do not make a sentence compound), compound, complex
    const ck = (r) => (r.kind === 'simple' && BANK.kinds.series.includes(r.t) ? 'list' : r.kind);
    // (the three kinds in an order that is no staircase of the columns simple, compound, complex: the right word of the
    // three cards a check takes never steps 1, 2, 3)
    const ORDERS = [['list', 'complex', 'compound'], ['compound', 'list', 'complex'], ['compound', 'complex', 'list'], ['complex', 'list', 'compound']];
    for (const r of lead(P.rows, ck, ORDERS[rng.int(0, ORDERS.length - 1)]).slice(0, 8)) cards.push(card(`data-lcs-kindcheck="${r.kind}" data-lcs-ckind="${ck(r)}" data-lcs-text="${A(r.t)}"`, `<span data-lcs-read style="text-align:center;font:700 19px/1.35 'Nunito',sans-serif;color:${T.ink}">${esc(r.t)}</span>` + opts(cols, r.kind)));
  } else if (mode === 'comparepick') {
    // the word as it is (very, as … as), comparing two (-er, more), comparing three or more (-est, most)
    const ck = (x) => { if (x.ad) return 'ad'; const F = formsOf(x.w); return F.comp === x.right ? 'comp' : F.sup === x.right ? 'sup' : 'base'; };
    for (const x of lead(P.items, ck, ['base', 'comp', 'sup'])) cards.push(card(`data-lcs-cmpcheck="${A(x.right)}" data-lcs-ckind="${ck(x)}" data-lcs-text="${A(x.t)}"`, `<div style="text-align:center">${withBlank(x.t, Math.max(120, Math.ceil(Math.max(...x.opts.map((o) => o.length)) * 9.2) + 18), x.right, key, 19)}</div>` + opts(x.opts, x.right)));
  } else if (mode === 'possess') {
    // one owner ('s) and more than one (s')
    for (const x of lead(P.own, (y) => y.kind, ['one', 'many'])) cards.push(card(`data-lcs-owncheck="${x.kind}" data-lcs-ckind="${x.kind}" data-lcs-n="${x.n}"`, `<span data-lcs-read style="font:700 20px/1.35 'Nunito',sans-serif;color:${T.ink}">${esc(x.prompt)}</span>` +
      `<div style="width:330px">${wline({ starter: 'the', answer: key ? x.right : null, attrs: key ? '' : `data-lcs-answer="${A(x.right)}"` })}</div>`));
  } else {
    for (const x of P.titles) cards.push(card(`data-lcs-titlecheck="${A(x.lc)}"`, `<span data-lcs-read style="font:700 20px/1.35 'Nunito',sans-serif;color:${T.ink}">${esc(x.lc)}</span>` +
      `<div style="width:520px;max-width:100%">${wline({ answer: key ? x.right : null, attrs: key ? '' : `data-lcs-answer="${A(x.right)}"` })}</div>`));
  }
  return { bodyHtml: STYLE + `<div data-lcs-noliga="1" style="${LIGS}">` + fRoom(typo(checkGrid(cards, { cols: 1 }))) + `</div>`, meta: {} };
}

module.exports = { makeSentencesG3Type, faultsOf, plan, LEVELS, INSTR, LINES, titleCase, kindOf };
