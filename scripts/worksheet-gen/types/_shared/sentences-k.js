/**
 * sentences-k.js — seven Kindergarten grammar pages on words and sentences (English literacy year, Daily Teaching System
 * Part 12.3, 2026-11-16; the unit "Words and Sentences" of Kindergarten; a US Kindergarten teacher's review applied
 * 2026-11-17). The words, sentences and pictures are data/literacy/sentences-k.en.json. THE TEACHER READS: a child
 * answers by cutting out and gluing a card or a strip, circling a picture, a letter, a word or a mark, writing one letter
 * or one mark in a box (72 px or more), or writing a few words on a Kindergarten row.
 *
 *   sort     Naming Words and Action Words (L.K.1.b: use frequently occurring nouns and verbs)
 *              every level: two glue boxes ("Naming words (nouns)", "Action words (verbs)") at the top and twelve cards to
 *              cut out at the foot of the page, in three rows of four that share their cut lines (125 px wide): six naming
 *              words and six action words, two of each in a row, mixed; each glue box holds six cards with room to spare
 *              level 1  pictures only (an animal or a thing; a person who SHOWS the action); the teacher names each card:
 *                       the words to say stand in small grey type at the foot of the page, row by row as the cards stand
 *                       (the pages ship without their key)
 *              level 2  the pictures with the word under each
 *              level 3  word cards only (short regular words a reader knows), and "The ___ can ___." to finish
 *   capital  A Sentence Starts with a Capital Letter (L.K.2.a: capitalize the first word in a sentence and the pronoun I)
 *              every level: six sentences in big print, three printed with a small first letter, a 72 px box in front of
 *              every sentence; the child circles each first letter and every word I, and writes the capital letter in the
 *              box where a sentence starts with a small letter. No names (no capital inside a sentence but I).
 *              level 1  three-word sentences
 *              level 2  four- and five-word sentences
 *              level 3  four- and five-word sentences, and a three-word sentence printed with a small letter above a
 *                       Kindergarten row the width of the page, to copy with its capital
 *   marks    A Period or a Question Mark? (L.K.2.b: recognize and name end punctuation)
 *              every level: sentences without their end mark, each beside its picture, half telling and half asking
 *              level 1  six sentences the teacher reads; the child circles the period or the question mark
 *              level 2  eight short sentences a kindergartner can read; the child writes the mark in a 72 px box
 *              level 3  four short sentences with a box, and a picture (of nothing the sentences name) to write one telling
 *                       and one asking sentence about
 *   longer   Say More: Make the Sentence Longer (L.K.1.f: produce and expand complete sentences)
 *              every level: four pictures, each a subject doing what its short sentence says (The cat sits.) with ONE sign
 *              of where or when beside it (the sun, the moon, rain, snow; every page shows the four signs once)
 *              level 1  three add-ons under each sentence (in the sun, at night, in the rain, in the snow): the child
 *                       circles the one the picture shows
 *              level 2  the child circles the add-on and writes it on a Kindergarten row
 *              level 3  the child writes words of his or her own (where or when) on a Kindergarten row
 *   find     Find the Action Word (L.K.1.b, the second page of the lesson on naming and action words)
 *              level 1  four rows of three pictures the teacher names: one action (a person who shows it), one person who
 *                       stands still (a naming word: doctor, farmer, firefighter, astronaut) and one animal or thing (never
 *                       the thing the action picture shows); the child circles the action; the words the teacher says for
 *                       each row stand in small grey type at the foot of the page (two rows to a line)
 *              level 2  eight rows of three printed words (one action word, two naming words); the child reads and circles
 *                       the action word
 *              level 3  six short sentences, each with ONE naming word and ONE action word (a worked example first); in two
 *                       or more a word follows the action word: the child circles the naming word and underlines the action word
 *   strips   Telling or Asking? Sort the Sentences (L.K.2.b, the second page of the lesson on the end marks)
 *              every level: a period box and a question-mark box at the top and numbered sentence strips printed
 *              WITHOUT their end mark, to cut out and glue; half telling, half asking, mixed in reading order and in the
 *              printed grid of two columns
 *              level 1  eight strips (300 px wide) with a picture each; the teacher reads them
 *              level 2  eight short strips (300 px wide) with a picture each; a kindergartner reads them
 *              level 3  six strips (305 px wide) with NO picture: the sentence on one line at 22 px (the bank's `short`
 *                       list, each checked to fit) and a 72 px box right after its last word; the child writes the mark
 *                       before gluing
 *   pair     Fix the First Letter (L.K.2.a, the second page of the lesson on the capital letter)
 *              level 1  six three-word sentences, each printed twice side by side, once with its capital and once with a
 *                       small first letter: the child circles the one written right
 *              level 2  five four- and five-word sentences printed twice, one above the other: circle the one written right
 *                       and write its capital letter in a 72 px box
 *              level 3  five sentences printed with a small first letter: the child writes the first word with its capital
 *                       on a Kindergarten row
 *
 * Every two-way choice (left or right, top or bottom) is mixed: each place used twice or more, never three in a row in one
 * place, never more than four alternating (R L R L is the limit). The page turns the font's joined letters off (fi, fl, ff).
 * Handwriting rows are about 3/4 in from top rule to baseline (Kindergarten ruling). English only. Themeless: a copy
 * draws other words and sentences. PDF only. The bank is checked when this file loads (faultsOf); no picture is looked
 * up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/sentences-k.en.json');
const { _parts, placesFor } = require('./info-text.js');
const { W, esc, shuffle, line, placed, rowSvg } = _parts;

/** an asking sentence begins with a question word or with can, is, do ...; a telling sentence never does */
const ASK = /^(Can|Is|Do|Does|Did|Will|Are|Who|What|Where|When|Why|How)\b/;
/** a command takes a period too, but it is no telling sentence: none in the bank */
const COMMAND = /^(Look|Go|Come|Get|Put|Give|Let|Please|Sit|Stop|Help|Find|Take|Make)\b/;
/** the first letters a kindergartner can tell from their small form (never c o s u v w x y z k p, never l: a small l
 *  looks like a capital I) — and the word I */
const CAP_START = /^(I |[ABDEFGHJMNQRT])/;
const canLower = (s) => /^[ABDEFGHJMNQRT]/.test(s);                 // printed with a small first letter
const hasI = (s) => /(^| )I( |\.)/.test(s);
const midI = (s) => / I( |\.)/.test(s);
/** verbs a kindergartner uses: an action word must be one, a naming word must never be one (fish, duck, swing ...) */
const VERBS = new Set(['run', 'jump', 'swim', 'read', 'write', 'dance', 'sing', 'dig', 'bake', 'hop', 'walk', 'play', 'kick', 'ride', 'fly',
  'clap', 'climb', 'sleep', 'eat', 'cook', 'paint', 'draw', 'skate', 'ski', 'sled', 'bike', 'swing', 'slide', 'brush', 'comb', 'drum', 'saw',
  'hammer', 'rake', 'mop', 'nap', 'hug', 'kiss', 'bat', 'watch', 'ring', 'rock', 'dress', 'cut', 'light', 'plant', 'water', 'milk', 'pet',
  'train', 'bark', 'tie', 'pin', 'stamp', 'spin', 'fish', 'duck', 'park', 'box', 'shop', 'snow', 'rain', 'help', 'smile', 'step', 'sail', 'jog',
  'wave', 'wash', 'cry', 'sit', 'look', 'push', 'pull', 'catch', 'throw', 'bounce', 'roll', 'bug', 'mug', 'map', 'net', 'jam', 'pan', 'pot',
  'nurse', 'teach', 'fix', 'mix', 'tap', 'peck', 'buzz', 'shine', 'top', 'bowl', 'iron', 'clean', 'sweep', 'stand', 'quack']);
/** the words a kindergartner reads on levels 2 and 3 of the end-mark pages (sight words and short decodable words); the
 *  pictured noun is the only other word */
const READ_WORDS = new Set('I a see big my can sit the is pink we go on hop like swim up red says moo fly hot have blue green kick run little jump do you where what did say'.split(' '));
/** the words of the sentences of Find the Action Word, level 3 (sight words and short regular words) */
const FIND_WORDS = new Set(('the a big little red pink fast away down up dog dogs cat frog frogs bird ducks pig fish baby hens hen cows sun girl boy ' +
  'bees ant runs run digs naps jumps hop hops sings swim swims sits peck eat sets reads buzz walks').split(' '));
/** the advance widths (em) of the page's Nunito at weight 700 with its joined letters off, measured in a browser on the
 *  page's own font files (2026-11-17; a sentence's sum came within 1.6 % of its rendered width): the bank checks with
 *  them that each sentence of a level-3 strip stands on one line */
const NUNITO700 = { a: 0.547, b: 0.6, c: 0.4625, d: 0.6, e: 0.542, f: 0.3422, g: 0.604, h: 0.585, i: 0.255, j: 0.259, k: 0.536, l: 0.319, m: 0.877,
  n: 0.585, o: 0.576, p: 0.6, q: 0.6, r: 0.392, s: 0.488, t: 0.3574, u: 0.579, v: 0.565, w: 0.891, x: 0.546, y: 0.564, z: 0.474, A: 0.744, B: 0.688,
  C: 0.6582, D: 0.762, E: 0.597, F: 0.562, G: 0.736, H: 0.773, I: 0.282, J: 0.335, K: 0.665, L: 0.562, M: 0.868, N: 0.748, O: 0.785, P: 0.652,
  Q: 0.785, R: 0.686, S: 0.631, T: 0.6334, U: 0.738, V: 0.713, W: 1.113, X: 0.672, Y: 0.6228, Z: 0.605, ' ': 0.271 };
const emOf = (t) => [...String(t)].reduce((a, c) => a + (NUNITO700[c] || 0.9), 0);   // a letter not measured counts wide
/** level 3 of Telling or Asking?: the sentence on ONE line at 22 px between the strip's number and a 72 px box, in a strip
 *  305 px wide (the glue box is 313 px wide inside and keeps 4 px beside the strip): border 2, padding 6, number 28, two
 *  gaps of 6 and the box leave 177 px for the words; the bank keeps 4 % to spare */
const STRIP3 = { font: 22, stripW: 305, room: 305 - 2 * 2 - 2 * 6 - 28 - 6 - 6 - 72 };
const fitsStrip3 = (t) => emOf(t) * STRIP3.font * 1.04 <= STRIP3.room;
const pk = (p) => (p ? p.join('/') : '');
/** more than four answers in a row alternating between two places (R L R L R) */
const altRun5 = (s) => /01010|10101/.test(s);
/** the printed grid of two columns (reading order t/a): not every row mixed, not every row alike, no column alternating all the way down */
function gridOk(s) {
  const rows = s.match(/../g), col = (c) => rows.map((r) => r[c]).join('');
  const alt = (x) => /^(ta)+t?$|^(at)+a?$/.test(x);
  return !rows.every((r) => r[0] !== r[1]) && !rows.every((r) => r === rows[0]) && !alt(col(0)) && !alt(col(1));
}

/** What must be true of the bank before any page prints it. Returns the list of faults (empty = sound). */
function faultsOf(b) {
  const f = [];
  const P = b.pics || {};
  for (const [w, p] of Object.entries(P)) if (!Array.isArray(p) || p.length !== 2 || !p.every((x) => typeof x === 'string' && x) || /(^| )bw( \d+)?$/i.test(p[0])) f.push('picture of ' + w + ': not a colour theme and a noun');
  // Naming Words and Action Words
  const so = b.sort || {}, nm = so.naming || [], ac = so.action || [], sw = so.words || {};
  if (nm.length < 12 || ac.length < 8) f.push('sort: fewer than twelve naming pictures or eight action pictures');
  if (new Set([...nm, ...ac]).size !== nm.length + ac.length) f.push('sort: a word stands twice');
  for (const w of [...nm, ...ac]) { if (!P[w]) f.push(`sort: "${w}" has no picture`); if (!/^[a-z]{3,6}$/.test(w)) f.push(`sort: "${w}" is no short word in small letters`); }
  for (const w of nm) if (VERBS.has(w)) f.push(`sort: the naming word "${w}" is also a verb a kindergartner uses`);
  for (const w of ac) if (!VERBS.has(w)) f.push(`sort: "${w}" is not in the list of action words`);
  for (const w of ['dig', 'bake', 'sing']) if (ac.includes(w)) f.push(`sort: the library has no picture that shows "${w}" being done`);
  if (new Set(ac.map((w) => pk(P[w]))).size !== ac.length) f.push('sort: two action words share one picture');
  const swa = sw.action || [], swn = sw.naming || [], can = sw.can || {};
  if (swa.length < 6 || swn.length < 6 || new Set([...swa, ...swn]).size !== swa.length + swn.length) f.push('sort: fewer than six action words or six naming words for the word cards, or a word twice');
  swa.forEach((w) => { if (!VERBS.has(w) || !/^[a-z]{2,4}$/.test(w)) f.push(`sort: "${w}" is no short action word`); });
  swn.forEach((w) => { if (VERBS.has(w) || !/^[a-z]{2,4}$/.test(w)) f.push(`sort: "${w}" is no short naming word that is never a verb`); });
  for (const [a, list] of Object.entries(can)) if (!swn.includes(a) || !Array.isArray(list) || !list.length || list.some((x) => !swa.includes(x))) f.push(`sort: "${a}" can do no action word of the word cards`);
  if (Object.keys(can).length < 4) f.push('sort: fewer than four animals for "The ___ can ___."');
  { const doable = new Set(Object.values(can).flat()); if (swa.filter((x) => !doable.has(x)).length >= 6) f.push('sort: six action words can be drawn of which no animal can do one'); }
  // A Sentence Starts with a Capital Letter
  const cp = b.capitals || {};
  for (const [set, lo, hi, len] of [['three', 3, 3, 16], ['long', 4, 5, 24]]) {
    const ss = cp[set] || [];
    if (ss.length < 12 || new Set(ss).size !== ss.length) f.push(`capitals: ${set} has fewer than twelve different sentences`);
    ss.forEach((s) => {
      const n = String(s).split(' ').length;
      if (n < lo || n > hi || !/^[A-Z][a-z]*( ([a-z]+|I))*\.$/.test(s) || s.length > len) f.push(`capitals: "${s}" is not a sentence of ${lo === hi ? lo : lo + ' or ' + hi} words with a capital only at the start and in I`);
      if (!CAP_START.test(s)) f.push(`capitals: "${s}" begins with a letter whose small form looks like its capital`);
    });
    if (ss.filter(canLower).length < 6) f.push(`capitals: ${set} has fewer than six sentences to print with a small letter`);
    if (ss.filter(hasI).length < 4 || ss.filter(midI).length < 3 || ss.filter((s) => canLower(s) && midI(s)).length < 1) f.push(`capitals: ${set} has too few sentences with the word I (inside a sentence too)`);
    if (ss.filter((s) => !/^I /.test(s)).length < 6) f.push(`capitals: ${set} has too few sentences that do not start with I`);
    if (new Set(ss.filter(canLower).map((s) => s.split(' ')[0])).size < 6) f.push(`capitals: ${set} has fewer than six first words for Fix the First Letter`);
  }
  if ((cp.three || []).filter((s) => canLower(s) && s.length <= 14).length < 4) f.push('capitals: fewer than four short sentences to copy');
  // A Period or a Question Mark?
  const mk = b.marks || {};
  for (const [set, lo, hi] of [['listen', 4, 7], ['read', 3, 5]]) {
    const ss = mk[set] || [];
    if (new Set(ss.map((s) => s.text)).size !== ss.length) f.push(`marks: ${set} has a sentence twice`);
    ss.forEach((s) => {
      const w = String(s.text).split(' ').map((x, k) => (k === 0 && x !== 'I' ? x.toLowerCase() : x));
      if (!/^[A-Z][a-z]*( ([a-z]+|I))*$/.test(s.text || '') || w.length < lo || w.length > hi) f.push(`marks: "${s.text}" is not ${lo} to ${hi} words without an end mark`);
      if (!['tell', 'ask'].includes(s.kind) || (s.kind === 'ask') !== ASK.test(s.text) || COMMAND.test(s.text)) f.push(`marks: "${s.text}" is no ${s.kind} sentence (an asking sentence begins with a question word or can, is, do ...; a telling one never does, and it is no command)`);
      if (!P[s.pic] || !new RegExp('\\b' + s.pic + '\\b').test(s.text)) f.push(`marks: "${s.text}" does not name its picture (${s.pic})`);
      if (set === 'read' && w.some((x) => x !== s.pic && !READ_WORDS.has(x))) f.push(`marks: "${s.text}" has a word a kindergartner does not read (${w.filter((x) => x !== s.pic && !READ_WORDS.has(x)).join(', ')})`);
    });
    const tp = new Set(ss.filter((s) => s.kind === 'tell').map((s) => s.pic)), ap = new Set(ss.filter((s) => s.kind === 'ask').map((s) => s.pic));
    if (tp.size < 4 || ap.size < 4 || new Set([...tp, ...ap]).size < 10) f.push(`marks: ${set} does not give eight sentences with eight different pictures, half telling and half asking`);
  }
  // the sentences of the level-3 strips (no picture; the child reads): each a read sentence that stands on one line
  const short = mk.short || [];
  if (new Set(short).size !== short.length) f.push('marks: a sentence of the level-3 strips stands twice');
  short.forEach((t) => { if (!(mk.read || []).some((x) => x.text === t)) f.push(`marks: "${t}" of the level-3 strips is no sentence a kindergartner reads`);
    else if (!fitsStrip3(t)) f.push(`marks: "${t}" does not fit one line of a level-3 strip (${Math.round(emOf(t) * STRIP3.font * 1.04)} px of ${STRIP3.room} at ${STRIP3.font} px)`); });
  { const rs = (mk.read || []).filter((x) => short.includes(x.text)), tp = new Set(rs.filter((x) => x.kind === 'tell').map((x) => x.pic)), ap = new Set(rs.filter((x) => x.kind === 'ask').map((x) => x.pic));
    if (tp.size < 5 || ap.size < 5) f.push('marks: fewer than five telling and five asking sentences about different things for the level-3 strips'); }
  const wr = mk.write || [];
  if (wr.length < 5 || new Set(wr.map((x) => x.pic)).size !== wr.length) f.push('marks: fewer than five different pictures to write about');
  wr.forEach((x) => { const re = new RegExp('\\b' + x.pic + '\\b');
    if (!P[x.pic] || !/^The [a-z ]+\.$/.test(x.tell || '') || ASK.test(x.tell) || !re.test(x.tell) || !ASK.test(x.ask || '') || !/^[A-Z][a-z ]+\?$/.test(x.ask) || !re.test(x.ask) || x.tell.length > 22 || x.ask.length > 22) f.push(`marks: the samples for the ${x.pic} are not a short telling and a short asking sentence about it`);
    // the picture to write about never stands in the sentences of its page: enough sentences that do not name it
    const free = (mk.read || []).filter((s) => !re.test(s.text));
    if (free.filter((s) => s.kind === 'tell').length < 4 || free.filter((s) => s.kind === 'ask').length < 4) f.push(`marks: too few sentences that do not name the ${x.pic} to write about`); });
  // Say More: Make the Sentence Longer
  const lg = b.longer || {}, cues = lg.cues || {}, items = lg.items || [];
  if (Object.keys(cues).sort().join() !== 'night,rain,snow,sun') f.push('longer: the signs are not sun, night, rain and snow');
  if (new Set(Object.values(cues).map((c) => c.add)).size !== 4 || Object.values(cues).some((c) => !P[c.pic] || !/^(in|at) [a-z ]+$/.test(c.add || ''))) f.push('longer: not four different add-ons, each with its picture');
  if (new Set(items.map((x) => x.text)).size !== items.length || new Set(items.map((x) => x.pic)).size !== items.length) f.push('longer: two items share a sentence or a picture');
  items.forEach((x) => { if (!/^The [a-z]+ [a-z]+s\.$/.test(x.text || '') || !P[x.pic] || !Array.isArray(x.cues) || !x.cues.length || x.cues.some((c) => !cues[c])) f.push(`longer: "${x.text}" is no short sentence with its picture and the signs that fit it`);
    if (/ (plays|sings|hoots|walks)\.$/.test(x.text || '') && !/^girl_/.test(x.pic)) f.push(`longer: "${x.text}" says what the animal picture does not show`); });
  for (const c of Object.keys(cues)) if (items.filter((x) => (x.cues || []).includes(c)).length < 2) f.push(`longer: fewer than two subjects fit "${(cues[c] || {}).add}"`);
  { const ks = Object.keys(cues); const match = (i, used) => i === ks.length || items.some((x, j) => !used.has(j) && (x.cues || []).includes(ks[i]) && match(i + 1, new Set([...used, j]))); if (ks.length === 4 && !match(0, new Set())) f.push('longer: no page can show the four signs with four different subjects'); }
  // Find the Action Word
  const fd = b.find || {}, pp = fd.people || [], aw = fd.actWords || [], nw = fd.nameWords || [], shown = fd.shownIn || {};
  if (pp.length < 4 || new Set(pp).size !== pp.length || pp.some((w) => !P[w] || VERBS.has(w) || nm.includes(w) || ac.includes(w))) f.push('find: not four different pictured people who are naming words');
  if (pp.some((w) => P[w] && ac.some((a) => P[a] && pk(P[a]) === pk(P[w])))) f.push('find: a person is shown with the picture of an action');
  for (const [a, list] of Object.entries(shown)) if (!ac.includes(a) || !Array.isArray(list) || list.some((x) => !nm.includes(x))) f.push(`find: the things shown in "${a}" are no naming pictures`);
  if (aw.length < 8 || nw.length < 16 || new Set([...aw, ...nw]).size !== aw.length + nw.length) f.push('find: fewer than eight action words or sixteen naming words to read, or a word twice');
  aw.forEach((w) => { if (!VERBS.has(w) || !/^[a-z]{2,4}$/.test(w)) f.push(`find: "${w}" is no short action word`); });
  nw.forEach((w) => { if (VERBS.has(w) || !/^[a-z]{2,4}$/.test(w)) f.push(`find: "${w}" is no short naming word that is never a verb`); });
  const fsn = fd.sentences || [];
  if (fsn.length < 12 || new Set(fsn).size !== fsn.length) f.push('find: fewer than twelve different sentences');
  [...fsn, fd.example].forEach((s) => { const t = tagged(s || '');
    if (!/^[A-Z][a-z]*(\/[na])?( [a-z]+(\/[na])?)*\.$/.test(s || '') || t.length < 2 || t.length > 5 || t.filter((x) => x.c === 'n').length !== 1 || t.filter((x) => x.c === 'a').length !== 1) f.push(`find: "${s}" has not one naming word and one action word in two to five words`);
    else if (t.some((x) => x.c === 'o' && (VERBS.has(x.w.toLowerCase()) || nm.includes(x.w.toLowerCase()) || nw.includes(x.w.toLowerCase())))) f.push(`find: "${s}" has a second naming or action word`);
    if (s !== fd.example && t.some((x) => !FIND_WORDS.has(x.w.toLowerCase()))) f.push(`find: "${s}" has a word that is not on the reading list (${t.filter((x) => !FIND_WORDS.has(x.w.toLowerCase())).map((x) => x.w).join(', ')})`); });
  { const at = fsn.map((s) => tagged(s).findIndex((x) => x.c === 'n')); for (const k of [0, 1, 2]) if (at.filter((x) => x === k).length < 3) f.push(`find: fewer than three sentences whose naming word is word ${k + 1}`); }
  if (new Set(fsn.filter(wordAfter).map(stemOf)).size < 4) f.push('find: fewer than four things with a sentence in which a word follows the action word');
  if (fd.example && fsn.some((s) => stemOf(s) === stemOf(fd.example))) f.push('find: the worked example names the naming word of a sentence');
  return f;
}
/** a sentence of the Find page: "The big dog/n runs/a." -> [{ w, c }] (c: n naming, a action, o other) */
function tagged(s) { return String(s).replace(/\.$/, '').split(' ').map((t) => { const [w, c] = t.split('/'); return { w, c: c || 'o' }; }); }
/** the naming word of a Find sentence, without its plural s: two sentences about dogs never stand on one page */
function stemOf(s) { const n = tagged(s).find((x) => x.c === 'n'); return n ? n.w.toLowerCase().replace(/s$/, '') : ''; }
/** a word stands after the action word (The frog hops away.) */
function wordAfter(s) { const t = tagged(s); return t.findIndex((x) => x.c === 'a') < t.length - 1; }
{ const f = faultsOf(BANK); if (f.length) throw new Error('sentences-k.en.json: ' + f.join('; ')); }

const P = BANK.pics, SO = BANK.sort, CP = BANK.capitals, MK = BANK.marks, LG = BANK.longer;
const GLUE = 40;   // the room a glue box keeps beyond the summed size of its cards

const LEVELS = {
  sort: { 1: { pic: 68, cardW: 125, cardH: 94, perBox: 2 }, 2: { words: true, pic: 60, cardW: 125, cardH: 94, perBox: 2 }, 3: { words: true, wordOnly: true, frame: true, cardW: 125, cardH: 60, perBox: 2, rowH: 128 } },
  capital: { 1: { set: 'three', font: 40, box: 72, pad: 18 }, 2: { set: 'long', font: 36, box: 72, pad: 18 }, 3: { set: 'long', font: 30, box: 72, pad: 4, copy: true, rowH: 128 } },
  marks: { 1: { set: 'listen', n: 6, choose: true, pic: 92, font: 22, pad: 8 }, 2: { set: 'read', n: 8, pic: 70, font: 27, box: 72, pad: 4 }, 3: { set: 'read', n: 4, write: true, pic: 72, font: 27, box: 72, pad: 6, rowH: 128 } },
  longer: { 1: { pick: true, pic: 150, cue: 66, font: 24, chip: 24 }, 2: { pick: true, write: true, pic: 92, cue: 60, font: 20, chip: 20, rowH: 128 }, 3: { own: true, write: true, pic: 92, cue: 60, font: 20, rowH: 128 } },
  find: { 1: { rows: 4, pic: 116 }, 2: { rows: 8, font: 38 }, 3: { sents: 6, font: 36 } },
  strips: { 1: { set: 'listen', n: 8, font: 18, pic: 60, stripW: 300, stripH: 72 }, 2: { set: 'read', n: 8, font: 21, pic: 60, stripW: 300, stripH: 72 }, 3: { set: 'read', short: true, n: 6, font: STRIP3.font, stripW: STRIP3.stripW, stripH: 92, box: 72, glue: 40 } },
  pair: { 1: { set: 'three', n: 6, font: 34, side: true }, 2: { set: 'long', n: 5, font: 30, box: 72 }, 3: { set: 'long', n: 5, font: 30, rowH: 128 } },
};
/** places (0 or 1) of the right one of two in n rows: each place two times or more, never three in a row in one place, never more than four alternating */
function twoPlaces(n, rng) {
  for (let k = 0; k < 500; k++) { const p = Array.from({ length: n }, () => rng.int(0, 1)), s = p.join(''); if (s.split('1').length - 1 >= 2 && s.split('0').length - 1 >= 2 && !/000|111/.test(s) && !altRun5(s) && !/^(01)+0?$|^(10)+1?$/.test(s)) return p; }
  throw new Error('sentences-k: no mixed places for two');
}

const img = (w, size, attr = 'data-lcs-pic') => `<img class="ws-icon" ${attr}="${esc(w)}" src="${fileUri(P[w][0], P[w][1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const label = (html, px = 19, color = T.ink) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${color}">${html}</div>`;
const badge = (n) => `<span data-lcs-badge style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 17px/1 'Nunito',sans-serif">${n}</span>`;
/** a box for ONE letter or mark, 72 px square or more (the key prints the answer in it) */
const oneBox = (attrs, size, text) => `<span ${attrs} style="flex:0 0 auto;box-sizing:border-box;width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;border:2.5px solid ${T.ink};border-radius:12px;background:#FFFFFF;font:800 ${Math.round(size * 0.72)}px/1 'Nunito',sans-serif;color:${T.teal}">${text}</span>`;
/** the y of a writing row's base rule (its lowest horizontal rule) */
const baseOf = (w, h) => Math.max(...[...rowSvg(w, h).matchAll(/<line\b[^>]*\by1="([\d.]+)"[^>]*\by2="([\d.]+)"/g)].filter((m) => m[1] === m[2]).map((m) => +m[1]));
/** printed words that stand on a writing row's base rule beside it (Nunito, line-height 1: the baseline is 0.171 em above the box's foot) */
const onRow = (text, px, h, attr = 'data-lcs-frameword') => `<span ${attr} style="flex:0 0 auto;padding-bottom:${Math.max(0, Math.round(h - baseOf(300, h) - 0.171 * px))}px;font:800 ${px}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(text)}</span>`;

/** a pattern of n/2 telling and n/2 asking sentences: no three of a kind in a row, never every other one, never two blocks
 *  (grid: also mixed in the printed grid of two columns) */
function kindPattern(n, rng, grid) {
  for (let k = 0; k < 2000; k++) {
    const p = shuffle([...Array(n / 2).fill('tell'), ...Array(n / 2).fill('ask')], rng), s = p.map((x) => x[0]).join('');
    if (/ttt|aaa/.test(s) || /^(ta)+$|^(at)+$/.test(s) || s === 't'.repeat(n / 2) + 'a'.repeat(n / 2) || s === 'a'.repeat(n / 2) + 't'.repeat(n / 2)) continue;
    if (grid && !gridOk(s)) continue;
    return p;
  }
  throw new Error('sentences-k: no mixed order of telling and asking sentences');
}
/** the places (of six) of the three sentences printed with a small letter: never three together, never every other one */
const LOW_PLACES = [];
for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++) for (let c = b + 1; c < 6; c++) { const k = '' + a + b + c; if (!['012', '345', '024', '135'].includes(k) && !(b === a + 1 && c === b + 1)) LOW_PLACES.push([a, b, c]); }
/** the order of the two kinds of card in a row of four: two of each, never every other one */
const ROW4 = ['aann', 'anna', 'naan', 'nnaa'];
/** three rows of four cards: not all rows alike, no column of one kind, no column alternating all the way down */
const cardGridOk = (rows) => !rows.every((r) => r === rows[0]) && [0, 1, 2, 3].every((c) => { const col = rows.map((r) => r[c]).join(''); return !/^(a+|n+)$/.test(col) && !/^(an)+a?$|^(na)+n?$/.test(col); });

function makeSentencesKType({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('sentences-k: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'K', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words and sentences are English (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const inner = W - 24;
      let blocks = [], items = [];
      const VARY = key ? ` <span data-lcs-vary style="color:${T.coral}">(Answers vary.)</span>` : '';   // the key of an open task
      // the ring of the key around a word or a letter, and its line under a word, drawn over the line (the word keeps its place)
      const ringOver = (on) => (on ? `<span data-lcs-ringmark style="position:absolute;left:-9px;right:-9px;top:-3px;bottom:-5px;border:3px solid ${T.teal};border-radius:50%"></span>` : '');
      const lineUnder = (on) => (on ? `<span data-lcs-underline style="position:absolute;left:-2px;right:-2px;bottom:-7px;height:4px;border-radius:2px;background:${T.teal}"></span>` : '');
      // where the teacher names pictures whose words are not printed (the pages ship without their key): the words to say,
      // in small grey type at the foot of the page body, below a rule, apart from the child's task
      const teacherLine = (html) => `<div data-lcs-teacherline style="flex:0 0 auto;margin-top:5px;padding-top:4px;border-top:1.5px solid ${T.grid};font:600 12.5px/1.25 'Nunito',sans-serif;color:${T.inkSoft}">${html}</div>`;

      if (mode === 'sort') {
        // six action words and six naming words; on the word cards an animal that can do one of the actions (the sample of "The ___ can ___.")
        let acts, names, doer = null, doing = null;
        if (d.wordOnly) {
          const SW = SO.words;
          acts = shuffle(SW.action, rng).slice(0, 6);
          doer = shuffle(Object.keys(SW.can).filter((a) => SW.can[a].some((x) => acts.includes(x))), rng)[0];
          doing = shuffle(SW.can[doer].filter((x) => acts.includes(x)), rng)[0];
          names = shuffle([doer, ...shuffle(SW.naming.filter((w) => w !== doer), rng).slice(0, 5)], rng);
        } else { acts = shuffle(SO.action, rng).slice(0, 6); names = shuffle(SO.naming, rng).slice(0, 6); }
        let pats;
        for (let k = 0; k < 500; k++) { pats = [0, 1, 2].map(() => ROW4[rng.int(0, 3)]); if (cardGridOk(pats)) break; }
        const qa = acts.slice(), qn = names.slice();
        const rows = pats.map((p) => [...p].map((c) => (c === 'a' ? { w: qa.shift(), kind: 'action' } : { w: qn.shift(), kind: 'naming' })));
        // the cards share their cut lines: the grid draws its top and left edge, every card its right and bottom edge
        const card = (c, r, k) => `<div data-lcs-card="${c.w}" data-lcs-kind="${c.kind}" data-lcs-r="${r}" data-lcs-c="${k}" style="box-sizing:border-box;width:${d.cardW}px;height:${d.cardH}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border-right:2px dashed ${T.ink};border-bottom:2px dashed ${T.ink};background:#FFFFFF">` +
          (d.wordOnly ? `<span data-lcs-cardword style="font:800 30px/1.1 'Nunito',sans-serif;color:${T.ink}">${c.w}</span>`
            : img(c.w, d.pic) + (d.words ? `<span data-lcs-cardword style="font:800 22px/1.1 'Nunito',sans-serif;color:${T.ink}">${c.w}</span>`
              : `<span data-lcs-cardslot style="display:block;height:20px;font:800 17px/20px 'Nunito',sans-serif;color:${T.teal}">${key ? c.w : ''}</span>`)) + `</div>`;
        const pasteH = Math.ceil(6 / d.perBox) * d.cardH + GLUE, pasteW = d.perBox * d.cardW + 16;
        const box = (kind, title, sub, ws) => `<div data-lcs-sortbox="${kind}" style="box-sizing:border-box;flex:1 1 0;display:flex;flex-direction:column;gap:2px;padding:6px 8px 8px;border:3px solid ${T.teal};border-radius:16px;background:#FFFFFF;min-width:0">` +
          `<div data-lcs-boxtitle style="font:700 26px/1.1 'Baloo 2',cursive;color:${T.teal}">${title}</div>${label(sub, 16)}` +
          `<div data-lcs-paste="${kind}" style="height:${pasteH}px;min-width:${pasteW}px;margin-top:4px;border-radius:10px;background:${T.cream};display:grid;grid-template-columns:repeat(2,1fr);align-content:center;justify-items:center;gap:10px 4px">` +
          (key ? ws.map((w) => `<span data-lcs-keyword="${w}" style="font:800 22px/1.2 'Nunito',sans-serif;color:${T.teal}">${w}</span>`).join('') : '') + `</div></div>`;
        blocks.push(`<div data-lcs-boxes style="display:flex;gap:12px">${box('naming', 'Naming words (nouns)', 'They name people, animals, and things.', names)}${box('action', 'Action words (verbs)', 'They tell what someone does.', acts)}</div>`);
        if (d.frame) {
          const fw = Math.floor((inner - 2 * 62 - 14 - 4 * 8) / 2);
          blocks.push(`<div data-lcs-frame style="display:flex;flex-direction:column;gap:0;padding:2px 12px 2px;border-radius:14px;background:${T.cream}">` + label('Write a naming word and an action word.' + VARY, 19) +
            `<div style="display:flex;align-items:flex-end;gap:8px">${onRow('The', 34, d.rowH)}<div style="flex:0 0 auto">${line({ w: fw, h: d.rowH, answer: key ? doer : null, sample: true })}</div>${onRow('can', 34, d.rowH)}<div style="flex:0 0 auto">${line({ w: fw, h: d.rowH, answer: key ? doing : null, sample: true })}</div>${onRow('.', 34, d.rowH)}</div></div>`);
        }
        blocks.push(`<div data-lcs-cards style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:5px 12px 10px;border-radius:14px;background:${T.cream}">` + `<div style="align-self:stretch">${label('Cut out the cards.', 18, T.teal)}</div>` +
          `<div data-lcs-cardgrid style="display:grid;grid-template-columns:repeat(4,${d.cardW}px);gap:0;border-top:2px dashed ${T.ink};border-left:2px dashed ${T.ink}">${rows.map((r, ri) => r.map((c, k) => card(c, ri, k)).join('')).join('')}</div></div>`);
        // level 1: the cards are pictures only; the words the teacher says, row by row as the cards stand
        if (!d.words) blocks.push(teacherLine('Teacher: say, row by row: ' + rows.map((r) => r.map((c) => esc(c.w)).join(', ')).join(' · ')));
        items = [...names, ...acts];
      }

      if (mode === 'capital') {
        const pool = CP[d.set];
        let lows, rest;
        for (let k = 0; k < 500; k++) {
          lows = shuffle(pool.filter(canLower), rng).slice(0, 3);
          rest = shuffle(pool.filter((s) => !lows.includes(s)), rng).slice(0, 3);
          const all = [...lows, ...rest];
          if (all.filter(hasI).length >= 2 && all.some(midI) && rest.some((s) => !/^I /.test(s))) break;
        }
        const at = rng.sample(LOW_PLACES, 1)[0];
        const order = [];
        { const ql = lows.slice(), qr = rest.slice(); for (let i = 0; i < 6; i++) order.push(at.includes(i) ? { s: ql.shift(), low: true } : { s: qr.shift(), low: false }); }
        const ring = (ch, kind, extra = '') => `<span data-lcs-ring="${kind}"${extra} style="position:relative">${esc(ch)}${ringOver(key)}</span>`;
        // the box to write the capital in stands IN FRONT of the sentence (72 px: six sentences with a box above each would not fit the page)
        const sentence = ({ s, low }, i) => {
          const ws = s.slice(0, -1).split(' ');
          const first = ws[0], f0 = low ? first[0].toLowerCase() : first[0];
          const words = [`<span data-lcs-firstword>${ring(f0, 'first', first === 'I' ? ' data-lcs-isi="1"' : '')}${esc(first.slice(1))}${ws.length === 1 ? '.' : ''}</span>`,
            ...ws.slice(1).map((w, k) => `<span data-lcs-word>${w === 'I' ? ring('I', 'i') : esc(w)}${k === ws.length - 2 ? '.' : ''}</span>`)];
          return `<div data-lcs-sentence="${i + 1}" data-lcs-low="${low ? 1 : 0}" data-lcs-text="${esc(s)}" style="display:flex;align-items:center;gap:16px;padding:${d.pad}px 14px;border-radius:14px;background:${T.cream}">` +
            `${badge(i + 1)}${oneBox(`data-lcs-capbox data-lcs-want="${low ? first[0] : ''}"`, d.box, key && low ? first[0] : '')}<span data-lcs-print style="white-space:nowrap;font:700 ${d.font}px/1.15 'Nunito',sans-serif;color:${T.ink}">${words.join(' ')}</span></div>`;
        };
        blocks = order.map(sentence);
        let copy = null;
        if (d.copy) {
          // the model sentence ABOVE the row; the row takes the width of the page
          copy = shuffle(CP.three.filter((s) => canLower(s) && s.length <= 14), rng)[0];
          const lowered = copy[0].toLowerCase() + copy.slice(1);
          blocks.push(`<div data-lcs-copy="${esc(copy)}" style="display:flex;flex-direction:column;gap:2px;padding:4px 12px 2px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
            `<div style="display:flex;align-items:baseline;gap:14px">${label('Copy this sentence. Start it with a capital letter.', 18)}<span data-lcs-copytext style="flex:0 0 auto;font:700 32px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(lowered)}</span></div>` +
            `<div>${line({ w: inner - 4, h: d.rowH, answer: key ? copy : null })}</div></div>`);
        }
        items = [...order.map((o) => o.s), ...(copy ? ['copy:' + copy] : [])];
      }

      if (mode === 'marks') {
        const pool = MK[d.set];
        const kinds = kindPattern(d.n, rng);
        let rows;
        for (let k = 0; k < 500; k++) {
          const q = { tell: shuffle(pool.filter((s) => s.kind === 'tell'), rng), ask: shuffle(pool.filter((s) => s.kind === 'ask'), rng) }, used = new Set();
          rows = kinds.map((kd) => { const s = q[kd].find((x) => !used.has(x.pic)); if (s) used.add(s.pic); return s; });
          if (rows.every(Boolean)) break;
        }
        const want = (s) => (s.kind === 'ask' ? '?' : '.');
        let flips = null;
        if (d.choose) for (let k = 0; k < 500; k++) {
          flips = rows.map(() => rng.int(0, 1));
          const at = rows.map((s, i) => (want(s) === '.' ? flips[i] : 1 - flips[i])).join('');
          if (/0/.test(at) && /1/.test(at) && !/000|111/.test(at) && !altRun5(at)) break;
        }
        const rowPad = `${d.pad}px 14px`;
        const markPill = (m, ok) => `<span data-lcs-mark="${m === '.' ? 'period' : 'question'}"${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;box-sizing:border-box;width:62px;height:62px;display:inline-flex;align-items:center;justify-content:center;border:3px solid ${key && ok ? T.teal : T.creamDeep};border-radius:50%;background:#FFFFFF;font:800 50px/1 'Nunito',sans-serif;color:${T.ink}">${m}</span>`;
        blocks = rows.map((s, i) => `<div data-lcs-row="${i + 1}" data-lcs-kind="${s.kind}" data-lcs-text="${esc(s.text)}" style="display:flex;align-items:center;gap:12px;padding:${rowPad};border-radius:14px;background:${T.cream}">` +
          badge(i + 1) + img(s.pic, d.pic) +
          (d.choose
            ? `<span data-lcs-stext style="flex:1 1 auto;min-width:0;font:700 ${d.font}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(s.text)}</span><span data-lcs-marks style="flex:0 0 auto;display:inline-flex;gap:14px">${(flips[i] ? ['?', '.'] : ['.', '?']).map((m) => markPill(m, m === want(s))).join('')}</span>`
            : `<span style="flex:1 1 auto;min-width:0;display:flex;align-items:center;gap:10px"><span data-lcs-stext style="font:700 ${d.font}px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(s.text)}</span>${oneBox(`data-lcs-markbox data-lcs-want="${s.kind === 'ask' ? 'question' : 'period'}"`, d.box, key ? want(s) : '')}</span>`) + `</div>`);
        let wr = null;
        if (d.write) {
          // the picture to write about is nothing a sentence of the page names
          wr = shuffle(MK.write.filter((x) => !rows.some((s) => new RegExp('\\b' + x.pic + '\\b').test(s.text))), rng)[0];
          blocks.push(`<div data-lcs-write="${wr.pic}" style="display:flex;flex-direction:column;gap:0;padding:6px 12px 2px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
            `<div style="display:flex;align-items:center;gap:12px">${img(wr.pic, 74)}${label(`Write about the ${wr.pic}. Write one sentence that tells and one sentence that asks.` + VARY, 19)}</div>` +
            [['tell', '.', wr.tell], ['ask', '?', wr.ask]].map(([k, m, sample]) => `<div data-lcs-writerow="${k}" style="display:flex;align-items:flex-end;gap:10px"><span data-lcs-markbadge="${k}" style="flex:0 0 50px;height:50px;margin-bottom:${Math.round(d.rowH - baseOf(300, d.rowH) - 4)}px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 42px/1 'Nunito',sans-serif">${m}</span><div style="flex:1 1 auto;min-width:0">${line({ w: inner - 60 - 4, h: d.rowH, answer: key ? sample : null, sample: true })}</div></div>`).join('') + `</div>`);
        }
        items = [...rows.map((s) => s.text), ...(wr ? ['write:' + wr.pic] : [])];
      }

      if (mode === 'longer') {
        let its;
        for (let k = 0; k < 500; k++) {
          const used = new Set(); its = [];
          for (const c of shuffle(Object.keys(LG.cues), rng)) { const x = shuffle(LG.items.filter((y) => y.cues.includes(c) && !used.has(y.pic)), rng)[0]; if (!x) break; used.add(x.pic); its.push({ x, cue: c }); }
          if (its.length === 4) break;
        }
        const at = placesFor(4, rng);
        const choiceLists = its.map((it, i) => placed(LG.cues[it.cue].add, shuffle(Object.keys(LG.cues).filter((c) => c !== it.cue), rng).slice(0, 2).map((c) => LG.cues[c].add), at[i]));
        const chip = (text, ok, px) => `<span data-lcs-choice${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;white-space:nowrap;font:800 ${px}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:3px 12px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
        const scene = (it) => `<div data-lcs-scene="${it.x.pic}|${it.cue}" style="position:relative;flex:0 0 auto;width:${d.pic + d.cue + 6}px;height:${d.pic + 4}px">` +
          `<img class="ws-icon" data-lcs-pic="${it.x.pic}" src="${fileUri(P[it.x.pic][0], P[it.x.pic][1])}" alt="" style="position:absolute;left:0;bottom:0;width:${d.pic}px;height:${d.pic}px;object-fit:contain">` +
          `<img class="ws-icon" data-lcs-cue="${it.cue}" src="${fileUri(P[LG.cues[it.cue].pic][0], P[LG.cues[it.cue].pic][1])}" alt="" style="position:absolute;right:0;top:0;width:${d.cue}px;height:${d.cue}px;object-fit:contain"></div>`;
        const card = (it, i) => `<div data-lcs-picture="${i + 1}" style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 10px 8px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF">` +
          `<div style="display:flex;align-items:flex-start;gap:6px">${badge(i + 1)}${scene(it)}</div><span data-lcs-short style="white-space:nowrap;font:700 ${d.font}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(it.x.text)}</span></div>`;
        if (lv === 1) {
          blocks = [0, 2].map((r) => `<div data-lcs-pair style="display:flex;gap:12px">${[r, r + 1].map((i) => `<div data-lcs-item="${i + 1}" data-lcs-cuekey="${its[i].cue}" style="flex:1 1 0;display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px 10px 12px;border-radius:16px;background:${T.cream};min-width:0">` +
            card(its[i], i) + `<div data-lcs-choices style="display:flex;flex-direction:column;align-items:center;gap:6px">${choiceLists[i].map((c, k) => chip(c, k === at[i], d.chip)).join('')}</div></div>`).join('')}</div>`);
        } else {
          const cw = 28 + 6 + d.pic + d.cue + 6 + 20 + 5, rw = inner - 4 - cw - 12;   // the card: badge, scene, padding and border
          blocks = its.map((it, i) => `<div data-lcs-item="${i + 1}" data-lcs-cuekey="${it.cue}" style="display:flex;align-items:stretch;gap:12px;padding:6px 10px 4px;border-radius:16px;background:${T.cream}">` +
            `<div style="flex:0 0 ${cw}px;display:flex;justify-content:center">${card(it, i)}</div><div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;justify-content:flex-end;gap:2px">` +
            (d.pick ? `<div data-lcs-choices style="display:flex;justify-content:space-between;gap:4px">${choiceLists[i].map((c, k) => chip(c, k === at[i], d.chip)).join('')}</div>`
              : label('Where? When? Tell more.' + VARY, 19, T.teal)) +
            line({ w: rw, h: d.rowH, answer: key ? LG.cues[it.cue].add : null, sample: !!d.own }) + `</div></div>`);
        }
        items = its.map((it) => it.x.text + ' ' + LG.cues[it.cue].add);
      }

      if (mode === 'find') {
        const FD = BANK.find;
        const cell = (inner2, c, ok) => `<span data-lcs-pick="${esc(c.w)}" data-lcs-kind="${c.kind}"${c.person ? ' data-lcs-person="1"' : ''}${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;display:inline-flex;flex-direction:column;align-items:center;gap:2px;padding:4px 14px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:18px;background:#FFFFFF">${inner2}</span>`;
        if (lv === 1) {
          // one action (a person who shows it), one PERSON standing still (a naming word) and one animal or thing: "circle the person" is no way through
          const acts = shuffle(SO.action, rng).slice(0, d.rows), people = shuffle(FD.people, rng).slice(0, d.rows), at = placesFor(d.rows, rng);
          // the thing of a row is never a thing the action picture shows (the girl who reads holds a book)
          const pool = shuffle(SO.naming, rng), things = acts.map((a) => { const k = pool.findIndex((w) => !(FD.shownIn[a] || []).includes(w)); return pool.splice(k, 1)[0]; });
          const lists = acts.map((a, i) => placed({ w: a, kind: 'action' }, shuffle([{ w: people[i], kind: 'naming', person: 1 }, { w: things[i], kind: 'naming' }], rng), at[i]));
          blocks = lists.map((list, i) => `<div data-lcs-findrow="${i + 1}" style="display:flex;align-items:center;gap:12px;padding:6px 14px;border-radius:14px;background:${T.cream}">${badge(i + 1)}<div data-lcs-picks style="flex:1 1 auto;display:flex;justify-content:space-around">` +
              list.map((c, k) => cell(img(c.w, d.pic) + `<span data-lcs-pickword style="display:block;height:20px;font:800 17px/20px 'Nunito',sans-serif;color:${T.teal}">${key ? esc(c.w) : ''}</span>`, c, k === at[i])).join('') + `</div></div>`);
          // the words the teacher says for each row, in the order the pictures stand (two rows to a line: four rows with
          // firefighter and astronaut measure up to 740 px at 12.5 px, wider than the 675 px page body)
          const say = lists.map((list, i) => `${i + 1} ${list.map((c) => esc(c.w)).join(', ')}`);
          blocks.push(teacherLine('Teacher, say for each row: ' + say.slice(0, 2).join(' · ') + ' ·<br>' + say.slice(2).join(' · ')));
          items = acts.map((a, i) => a + '|' + people[i] + '|' + things[i]);
        } else if (lv === 2) {
          const acts = shuffle(FD.actWords, rng).slice(0, d.rows), names = shuffle(FD.nameWords, rng).slice(0, 2 * d.rows), at = placesFor(d.rows, rng);
          blocks = acts.map((a, i) => { const list = placed({ w: a, kind: 'action' }, [{ w: names[2 * i], kind: 'naming' }, { w: names[2 * i + 1], kind: 'naming' }], at[i]);
            return `<div data-lcs-findrow="${i + 1}" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:14px;background:${T.cream}">${badge(i + 1)}<div data-lcs-picks style="flex:1 1 auto;display:flex;justify-content:space-around">` +
              list.map((c, k) => cell(`<span data-lcs-pickword style="font:800 ${d.font}px/1.15 'Nunito',sans-serif;color:${T.ink}">${esc(c.w)}</span>`, c, k === at[i])).join('') + `</div></div>`; });
          items = acts.map((a, i) => a + '|' + names[2 * i] + '|' + names[2 * i + 1]);
        } else {
          // six sentences about six different things: the naming word first, second or third (each place at least once), and
          // in two or more of them a word after the action word (the action word is not always last)
          let ss;
          for (let k = 0; k < 2000; k++) {
            ss = []; const seen = new Set();
            for (const s of shuffle(FD.sentences, rng)) { if (ss.length < d.sents && !seen.has(stemOf(s))) { seen.add(stemOf(s)); ss.push(s); } }
            const at = ss.map((s) => tagged(s).findIndex((x) => x.c === 'n'));
            if ([0, 1, 2].every((p) => at.includes(p)) && [0, 1, 2].every((p) => at.filter((x) => x === p).length <= 3) && ss.filter(wordAfter).length >= 2) break;
          }
          const words = (s, mark) => tagged(s).map((t, k, all) => `<span data-lcs-w data-lcs-cls="${t.c}" style="position:relative">${esc(t.w)}${t.c === 'n' ? ringOver(mark) : t.c === 'a' ? lineUnder(mark) : ''}</span>${k === all.length - 1 ? '.' : ''}`).join(' ');
          const row = (s, i, attr, mark, lead) => `<div ${attr} data-lcs-text="${esc(s)}" style="display:flex;align-items:center;gap:14px;padding:26px 16px 28px;border-radius:14px;background:${T.cream}">${lead}<span data-lcs-print style="white-space:nowrap;font:700 ${d.font}px/1.2 'Nunito',sans-serif;color:${T.ink}">${words(s, mark)}</span></div>`;
          blocks = [row(FD.example, 0, 'data-lcs-example', true, `<span style="flex:0 0 auto;font:800 22px/1 'Nunito',sans-serif;color:${T.coral}">Look:</span>`), ...ss.map((s, i) => row(s, i, `data-lcs-findsent="${i + 1}"`, key, badge(i + 1)))];
          items = ss.slice();
        }
      }

      if (mode === 'strips') {
        // level 3: only the sentences that stand on one line of a strip (the bank checks each)
        const pool = d.short ? MK[d.set].filter((s) => MK.short.includes(s.text)) : MK[d.set];
        const kinds = kindPattern(d.n, rng, true);
        let rows;
        for (let k = 0; k < 500; k++) {
          const q = { tell: shuffle(pool.filter((s) => s.kind === 'tell'), rng), ask: shuffle(pool.filter((s) => s.kind === 'ask'), rng) }, used = new Set();
          rows = kinds.map((kd) => { const hit = q[kd].find((y) => !used.has(y.pic)); if (hit) used.add(hit.pic); return hit; });
          if (rows.every(Boolean)) break;
        }
        const mark = (s) => (s.kind === 'ask' ? '?' : '.');
        // level 3 (the child reads): no picture; the sentence on ONE line and the box for the mark right after its last word
        const strip = (s, i) => `<div data-lcs-strip="${i + 1}" data-lcs-about="${esc(s.pic)}" data-lcs-kind="${s.kind}" data-lcs-text="${esc(s.text)}" style="box-sizing:border-box;flex:0 0 ${d.stripW}px;width:${d.stripW}px;height:${d.stripH}px;display:flex;align-items:center;justify-content:flex-start;gap:6px;padding:3px 6px;border:2px dashed ${T.ink};border-radius:6px;background:#FFFFFF">` +
          badge(i + 1) + (d.pic ? img(s.pic, d.pic) : '') + (d.box ? `<span data-lcs-stext style="flex:0 0 auto;white-space:nowrap;font:700 ${d.font}px/1.15 'Nunito',sans-serif;color:${T.ink}">${esc(s.text)}</span>`
            : `<span data-lcs-stext style="flex:1 1 auto;min-width:0;font:700 ${d.font}px/1.15 'Nunito',sans-serif;color:${T.ink}">${esc(s.text)}</span>`) +
          (d.box ? oneBox(`data-lcs-markbox data-lcs-want="${s.kind === 'ask' ? 'question' : 'period'}"`, d.box, key ? mark(s) : '') : '') + `</div>`;
        const perBox = d.n / 2, pasteH = perBox * d.stripH + (perBox - 1) * 4 + (d.glue || 8);
        const box = (kind, m, title) => `<div data-lcs-stripbox="${kind}" style="box-sizing:border-box;flex:1 1 0;display:flex;flex-direction:column;gap:4px;padding:6px 6px 8px;border:3px solid ${T.teal};border-radius:16px;background:#FFFFFF;min-width:0">` +
          `<div style="display:flex;align-items:center;gap:10px;padding-left:4px"><span data-lcs-boxmark="${m}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:${T.teal};color:#FFFFFF;font:800 40px/1 'Nunito',sans-serif">${m}</span><span data-lcs-boxtitle style="font:700 24px/1.1 'Baloo 2',cursive;color:${T.teal}">${title}</span></div>` +
          `<div data-lcs-paste="${kind}" style="height:${pasteH}px;border-radius:10px;background:${T.cream};display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:6px 18px">` +
          (key ? rows.map((s, i) => (s.kind === kind ? `<span data-lcs-keynum="${i + 1}" style="font:800 30px/1 'Nunito',sans-serif;color:${T.teal}">${i + 1}</span>` : '')).join('') : '') + `</div></div>`;
        blocks = [`<div data-lcs-stripboxes style="display:flex;gap:12px">${box('tell', '.', 'Telling sentences')}${box('ask', '?', 'Asking sentences')}</div>`,
          `<div data-lcs-strips style="display:flex;flex-direction:column;gap:6px;padding:5px 12px 10px;border-radius:14px;background:${T.cream}">` + label('Cut out the strips.', 18, T.teal) +
          Array.from({ length: d.n / 2 }, (_, r) => 2 * r).map((r) => `<div data-lcs-striprow style="display:flex;justify-content:space-around">${strip(rows[r], r)}${strip(rows[r + 1], r + 1)}</div>`).join('') + `</div>`];
        items = rows.map((s) => s.text);
      }

      if (mode === 'pair') {
        // n sentences with different first words, each printable with a small first letter that looks unlike its capital
        let ss;
        for (let k = 0; k < 500; k++) {
          ss = []; const seen = new Set();
          for (const s of shuffle(CP[d.set].filter(canLower), rng)) { const fw = s.split(' ')[0]; if (ss.length < d.n && !seen.has(fw)) { seen.add(fw); ss.push(s); } }
          if (ss.length === d.n) break;
        }
        const small = (s) => s[0].toLowerCase() + s.slice(1);
        const sides = twoPlaces(d.n, rng);
        const option = (text, ok) => `<span data-lcs-option${ok ? ' data-lcs-ok="1"' : ''} style="flex:0 0 auto;white-space:nowrap;padding:5px 16px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:18px;background:#FFFFFF;font:700 ${d.font}px/1.15 'Nunito',sans-serif;color:${T.ink}">${esc(text)}</span>`;
        const two = (s, i) => (sides[i] === 0 ? [option(s, true), option(small(s), false)] : [option(small(s), false), option(s, true)]).join('');
        if (lv === 1) blocks = ss.map((s, i) => `<div data-lcs-pairrow="${i + 1}" data-lcs-text="${esc(s)}" style="display:flex;align-items:center;gap:12px;padding:28px 14px;border-radius:14px;background:${T.cream}">${badge(i + 1)}<div data-lcs-options style="flex:1 1 auto;display:flex;justify-content:space-around;gap:12px">${two(s, i)}</div></div>`);
        else if (lv === 2) blocks = ss.map((s, i) => `<div data-lcs-pairrow="${i + 1}" data-lcs-text="${esc(s)}" style="display:flex;align-items:center;gap:14px;padding:14px 14px;border-radius:14px;background:${T.cream}">${badge(i + 1)}<div data-lcs-options style="flex:1 1 auto;display:flex;flex-direction:column;align-items:flex-start;gap:6px">${two(s, i)}</div>` +
          oneBox(`data-lcs-capwrite data-lcs-want="${s[0]}"`, d.box, key ? s[0] : '') + `</div>`);
        else {
          const sw = 280, rw = inner - 28 - 28 - 12 - sw - 12;
          blocks = ss.map((s, i) => `<div data-lcs-pairrow="${i + 1}" data-lcs-text="${esc(s)}" style="display:flex;align-items:center;gap:12px;padding:2px 14px 4px;border-radius:14px;background:${T.cream}">${badge(i + 1)}` +
            `<span data-lcs-small style="flex:0 0 ${sw}px;font:700 ${d.font}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(small(s))}</span><div style="flex:0 0 auto">${line({ w: rw, h: d.rowH, answer: key ? s.split(' ')[0] : null })}</div></div>`);
        }
        items = ss.slice();
      }

      return {
        // the font joins fi, fl and ff into one letter (the i loses its dot): the rule stands BEFORE the root (an inline font
        // shorthand resets the property, and the checks count the root's children as blocks)
        bodyHtml: `<style>[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>` +
          `<div data-ws-content data-lcs-noliga="1" data-lcs-sentkpage="${mode}|${lv}"${key ? ' data-lcs-iskey="1"' : ''} style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0">` + blocks.join('') + `</div>`,
        meta: { text: mode + ':' + items.slice(0, 2).join(','), items },
      };
    },

    async verify(page) {
      return page.evaluate((ARGS) => {
        const { SIZES, CUES, ASKRE, SHOWN, GLUE } = ARGS;
        const ASK = new RegExp(ASKRE);
        const fails = [];
        const root = document.querySelector('[data-lcs-sentkpage]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsSentkpage.split('|'), lv = +lvS, d = SIZES[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const rb = R(root);
        // no joined letters: every text with fi, fl or ff is set with the font's ligatures off
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let joined = 0;
          while (tw.nextNode()) { const n = tw.currentNode; if (/f[fil]/.test(n.nodeValue) && n.parentElement && getComputedStyle(n.parentElement).fontVariantLigatures !== 'none') joined++; }
          if (joined || root.dataset.lcsNoliga !== '1') fails.push(`ligatures are on in ${joined} places: fi and ff print as one joined letter (the page needs its rule before the root)`); }
        // the sheet: pictures loaded and big enough, nothing leaves the page or its card, the blocks fill the body
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 60) fails.push('a picture smaller than 60 px (Kindergarten)'); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        root.querySelectorAll('[data-lcs-sortbox], [data-lcs-card], [data-lcs-frame], [data-lcs-cards], [data-lcs-sentence], [data-lcs-copy], [data-lcs-row], [data-lcs-write], [data-lcs-item], [data-lcs-picture], [data-lcs-findrow], [data-lcs-findsent], [data-lcs-example], [data-lcs-stripbox], [data-lcs-strip], [data-lcs-strips], [data-lcs-pairrow]').forEach((c) => { const cb = R(c);
          c.querySelectorAll('img, span, [data-lcs-label], [data-lcs-line] svg').forEach((e) => { const r = R(e); if (r.width && (r.bottom > cb.bottom + 0.5 || r.right > cb.right + 0.5 || r.left < cb.left - 0.5 || r.top < cb.top - 0.5)) fails.push('something leaves its card (' + Object.keys(c.dataset)[0] + ')'); }); });
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < 110) fails.push('a writing row lower than 110 px (Kindergarten ruling: about 3/4 in from top rule to baseline)'); });
        // every box for ONE letter or mark is 72 px square or more
        document.querySelectorAll('[data-lcs-capbox], [data-lcs-markbox], [data-lcs-capwrite]').forEach((b) => { const r = R(b); if (r.width < 71.5 || r.height < 71.5) fails.push(`a box to write one letter or mark in is ${Math.round(r.width)} x ${Math.round(r.height)} px (72 or more)`); });
        const fs = (e) => parseFloat(getComputedStyle(e).fontSize);
        const place = (list) => list.findIndex((e) => e.dataset.lcsOk);
        const mixed3 = (p) => new Set(p).size === 3 && !p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2]) && !/^(012|210)/.test(p.join(''));
        const altRun5 = (s) => /01010|10101/.test(s);
        // an open task (the frame, the sentences to write, the child's own words): the key says that answers vary
        const open = (mode === 'sort' && d.frame) || (mode === 'marks' && d.write) || (mode === 'longer' && d.own);
        const vary = document.querySelectorAll('[data-lcs-vary]').length;
        if (isKey ? vary !== (open ? (mode === 'longer' ? 4 : 1) : 0) : vary) fails.push(`${vary} notes that answers vary`);
        // the words the teacher says where the page names its pictures by no printed word (K-654 and K-658, level 1): a small
        // grey line at the foot of the page body, apart from the task, naming exactly the pictures in their printed order
        const tls = [...root.querySelectorAll('[data-lcs-teacherline]')], wantTL = (mode === 'sort' && !d.words) || (mode === 'find' && lv === 1);
        const tasks = blocks.filter((b) => !b.matches('[data-lcs-teacherline]'));
        if (tls.length !== (wantTL ? 1 : 0)) fails.push(`${tls.length} lines of words for the teacher (${wantTL ? 'one' : 'none'} wanted)`);
        if (wantTL && tls.length === 1) {
          const t = tls[0], tr = R(t), prev = tasks[tasks.length - 1];
          if (t !== blocks[blocks.length - 1] || t.parentElement !== root) fails.push('the words for the teacher are not at the foot of the page body');
          if (fs(t) < 12 || fs(t) > 13 || getComputedStyle(t).color !== 'rgb(138, 130, 118)') fails.push(`the words for the teacher are not small grey type (${fs(t)} px, ${getComputedStyle(t).color})`);
          if (prev && tr.top - R(prev).bottom < 8) fails.push('the words for the teacher stand close against the task');
          const rg = document.createRange(); rg.selectNodeContents(t);
          const rects = [...rg.getClientRects()].filter((q) => q.width > 0.5);
          if (rects.some((q) => q.left < rb.left - 0.5 || q.right > rb.right + 0.5 || q.bottom > rb.bottom + 0.5)) fails.push('the words for the teacher leave the page');
          const nLines = new Set(rects.map((q) => Math.round(q.top))).size;
          if (nLines !== (mode === 'sort' ? 1 : 2)) fails.push(`the words for the teacher take ${nLines} lines (${mode === 'sort' ? 'one' : 'two'} wanted)`);
          const said = t.innerText.replace(/\s+/g, ' ').trim();
          const posOf = (e) => [Math.round(R(e).top), R(e).left];
          const byPlace = (a, b) => { const [ta, la] = posOf(a), [tb, lb] = posOf(b); return Math.abs(ta - tb) > 8 ? ta - tb : la - lb; };
          let want;
          if (mode === 'sort') {
            // the cards as they stand, row by row (their picture is the word: the picture of each card is checked to be its word)
            const cs = [...document.querySelectorAll('[data-lcs-card]')].sort(byPlace);
            cs.forEach((c) => { const im = c.querySelector('img'); if (!im || im.dataset.lcsPic !== c.dataset.lcsCard) fails.push(`the picture of the card "${c.dataset.lcsCard}" is another word`); });
            const rowsW = []; cs.forEach((c, k) => { (rowsW[Math.floor(k / 4)] = rowsW[Math.floor(k / 4)] || []).push(c.dataset.lcsCard); });
            want = 'Teacher: say, row by row: ' + rowsW.map((r) => r.join(', ')).join(' · ');
          } else {
            const fr = [...document.querySelectorAll('[data-lcs-findrow]')].sort(byPlace);
            want = 'Teacher, say for each row: ' + fr.map((r, i) => { const ps = [...r.querySelectorAll('[data-lcs-pick]')].sort((a, b) => R(a).left - R(b).left);
              ps.forEach((p) => { const im = p.querySelector('img'); if (!im || im.dataset.lcsPic !== p.dataset.lcsPick) fails.push(`the picture of "${p.dataset.lcsPick}" is another word`); });
              return `${i + 1} ` + ps.map((p) => p.dataset.lcsPick).join(', '); }).join(' · ');
          }
          if (said !== want) fails.push(`the words for the teacher do not name the pictures as they stand: "${said}" (wanted "${want}")`);
        }

        if (mode === 'sort') {
          const cards = [...document.querySelectorAll('[data-lcs-card]')];
          if (cards.length !== 12 || new Set(cards.map((c) => c.dataset.lcsCard)).size !== 12) fails.push(`${cards.length} cards, not twelve different ones`);
          const rows = [0, 1, 2].map((r) => cards.filter((c) => +c.dataset.lcsR === r).sort((a, b) => a.dataset.lcsC - b.dataset.lcsC));
          const pats = rows.map((r) => r.map((c) => (c.dataset.lcsKind === 'action' ? 'a' : 'n')).join(''));
          pats.forEach((s, i) => { if (s.length !== 4 || s.split('a').length - 1 !== 2) fails.push(`card row ${i + 1} is not two naming and two action cards: ${s}`); if (/^(an)+$|^(na)+$/.test(s)) fails.push(`card row ${i + 1} sorts itself by its place: ${s}`); });
          if (pats.every((p) => p === pats[0])) fails.push('every card row has one order of kinds: ' + pats[0]);
          [0, 1, 2, 3].forEach((c) => { const col = pats.map((p) => p[c]).join(''); if (/^(a+|n+)$/.test(col) || /^(an)+a?$|^(na)+n?$/.test(col)) fails.push(`card column ${c + 1} is one kind or alternates all the way down: ${col}`); });
          // the cards share their cut lines: no gap between neighbours, each card about 125 px wide
          rows.forEach((r) => r.forEach((c, k) => { const cr = R(c); if (Math.abs(cr.width - d.cardW) > 2 || cr.width < 120) fails.push(`a card is ${Math.round(cr.width)} px wide (about 125 wanted, 120 or more)`);
            if (k && Math.abs(cr.left - R(r[k - 1]).right) > 0.5) fails.push('two cards side by side do not share their cut line');
            if (getComputedStyle(c).borderLeftStyle !== 'none' || getComputedStyle(c).borderTopStyle !== 'none') fails.push('a card draws its own left or top cut line (cut lines are shared)'); }));
          for (let r = 1; r < 3; r++) if (rows[r][0] && rows[r - 1][0] && Math.abs(R(rows[r][0]).top - R(rows[r - 1][0]).bottom) > 0.5) fails.push('two card rows do not share their cut line');
          cards.forEach((c) => { const im = c.querySelector('img'), wd = c.querySelector('[data-lcs-cardword]'), slot = c.querySelector('[data-lcs-cardslot]');
            if (d.wordOnly) { if (im) fails.push('a word card on level 3 shows a picture'); if (!wd || wd.textContent.trim() !== c.dataset.lcsCard || fs(wd) < 26) fails.push('a word card without its word printed 26 px or more'); }
            else { if (!im || R(im).width < 60) fails.push('a card picture smaller than 60 px');
              if (d.words) { if (!wd || wd.textContent.trim() !== c.dataset.lcsCard || fs(wd) < 20) fails.push('a card without its word printed 20 px or more'); }
              else { if (wd) fails.push('a level-1 card prints its word'); if (!slot || (isKey ? slot.textContent.trim() !== c.dataset.lcsCard : slot.textContent.trim())) fails.push('a card\'s word is on the page of the child, or missing on the key'); } } });
          const bx = [...document.querySelectorAll('[data-lcs-sortbox]')];
          if (bx.map((b) => b.dataset.lcsSortbox).join() !== 'naming,action' || bx.map((b) => b.querySelector('[data-lcs-boxtitle]').textContent.trim()).join() !== 'Naming words (nouns),Action words (verbs)') fails.push('not the two boxes "Naming words (nouns)" and "Action words (verbs)"');
          // a glue box holds its six cards with room: the summed size of the cards plus a margin
          const cw = cards.length ? R(cards[0]).width : 0, ch = cards.length ? R(cards[0]).height : 0;
          bx.forEach((b) => { const p = R(b.querySelector('[data-lcs-paste]')), per = Math.floor((p.width - 8) / cw);
            if (per < 1 || p.height < Math.ceil(6 / per) * ch + GLUE || p.width * p.height < 6 * cw * ch * 1.15) fails.push(`the ${b.dataset.lcsSortbox} box cannot hold six cards with room (${Math.round(p.width)} x ${Math.round(p.height)} for cards of ${Math.round(cw)} x ${Math.round(ch)})`); });
          const kw = bx.map((b) => [...b.querySelectorAll('[data-lcs-keyword]')].map((e) => e.dataset.lcsKeyword).sort().join());
          if (isKey) { ['naming', 'action'].forEach((k, i) => { const want = cards.filter((c) => c.dataset.lcsKind === k).map((c) => c.dataset.lcsCard).sort().join(); if (kw[i] !== want) fails.push(`the key of the ${k} box is not its six cards`); }); }
          else if (kw.some((x) => x)) fails.push('a box is filled on the page of the child');
          const fr = document.querySelector('[data-lcs-frame]');
          if (!!fr !== !!d.frame) fails.push('the sentence frame belongs to level 3 only');
          if (fr) { const ws = [...fr.querySelectorAll('[data-lcs-frameword]')].map((e) => e.textContent.trim()).join(' '), ls = fr.querySelectorAll('[data-lcs-line]');
            if (ws !== 'The can .' || ls.length !== 2) fails.push('the frame is not "The ___ can ___."');
            if (isKey) { const a = [...ls].map((l) => l.dataset.lcsAnswer); const kinds = Object.fromEntries(cards.map((c) => [c.dataset.lcsCard, c.dataset.lcsKind])); if (kinds[a[0]] !== 'naming' || kinds[a[1]] !== 'action') fails.push('the sample sentence is not a naming word and an action word of the cards'); } }
          else if (lines.length) fails.push('a writing row without the frame');
          if (document.querySelector('[data-lcs-cards]') !== tasks[tasks.length - 1]) fails.push('the cards to cut out are not at the foot of the page');
        }

        if (mode === 'capital') {
          const ss = [...document.querySelectorAll('[data-lcs-sentence]')];
          if (ss.length !== 6) fails.push(`${ss.length} sentences`);
          const low = ss.map((s) => s.dataset.lcsLow === '1'), at = low.map((x, i) => (x ? i : -1)).filter((i) => i >= 0).join('');
          if (at.length !== 3) fails.push(`${at.length} sentences start with a small letter, not three`);
          if (['012', '123', '234', '345', '024', '135'].includes(at)) fails.push('the sentences with a small letter stand together or every other one: ' + at);
          const texts = ss.map((s) => s.dataset.lcsText);
          if (new Set(texts).size !== texts.length) fails.push('a sentence stands twice');
          let iCount = 0, iMid = 0;
          ss.forEach((s, i) => {
            const t = s.dataset.lcsText, ws = t.slice(0, -1).split(' ');
            if (lv === 1 ? ws.length !== 3 : ws.length < 4 || ws.length > 5) fails.push(`sentence ${i + 1} has ${ws.length} words on level ${lv}`);
            const shown = [...s.querySelectorAll('[data-lcs-firstword], [data-lcs-word]')].map((e) => e.textContent.trim()).join(' ');
            // the first letter stands IN its word: no gap between it and the next letter (the key's ring is drawn over the line)
            const fw = s.querySelector('[data-lcs-firstword]'), rest = fw && [...fw.childNodes].find((n) => n.nodeType === 3 && n.nodeValue.length);
            if (rest) { const rg = document.createRange(); rg.setStart(rest, 0); rg.setEnd(rest, 1); const gap = rg.getBoundingClientRect().left - R(fw.querySelector('[data-lcs-ring="first"]')).right; if (gap > 3) fails.push(`sentence ${i + 1}: its first letter stands ${Math.round(gap)} px apart from its word`); }
            const expect = low[i] ? t[0].toLowerCase() + t.slice(1) : t;
            if (shown !== expect) fails.push(`sentence ${i + 1} prints "${shown}", not "${expect}"`);
            if (/[A-Z]/.test(shown.replace(/(^| )I(?= |\.)/g, '$1').slice(1)) || (low[i] && /[A-Z]/.test(shown[0]) && shown[0] !== 'I') || (!low[i] && !/[A-Z]/.test(shown[0]))) fails.push(`sentence ${i + 1} has a capital where it does not belong, or none where it does`);
            if (low[i] && /^(I |[cklopsuvwxyz])/i.test(t)) fails.push(`sentence ${i + 1} starts with a small letter that looks like its capital`);
            if (!low[i] && !/^(I |[ABDEFGHJMNQRT])/.test(t)) fails.push(`sentence ${i + 1} starts with a capital that looks like its small letter`);
            const box = s.querySelector('[data-lcs-capbox]'), first = s.querySelector('[data-lcs-ring="first"]');
            if (!box || !first) { fails.push(`sentence ${i + 1} has no box for its capital letter`); return; }
            const br = R(box), fr = R(first);
            if (br.right > fr.left || fr.left - br.right > 40 || br.bottom < fr.top || br.top > fr.bottom) fails.push(`the box of sentence ${i + 1} does not stand in front of its first letter`);
            if (box.dataset.lcsWant !== (low[i] ? t[0] : '')) fails.push(`the box of sentence ${i + 1} is keyed to "${box.dataset.lcsWant}"`);
            if (isKey ? box.textContent.trim() !== box.dataset.lcsWant : box.textContent.trim()) fails.push('a box is filled on the page of the child, or wrong on the key');
            if (!s.querySelector('[data-lcs-print]') || fs(s.querySelector('[data-lcs-print]')) < 28) fails.push(`sentence ${i + 1} is printed smaller than 28 px`);
            const is = [...s.querySelectorAll('[data-lcs-ring="i"]')];
            const nI = ws.filter((w, k) => k > 0 && w === 'I').length;
            if (is.length !== nI || is.some((e) => e.textContent.trim() !== 'I')) fails.push(`sentence ${i + 1}: the word I is not marked where it stands`);
            iCount += nI + (ws[0] === 'I' ? 1 : 0); iMid += nI;
            if ((ws[0] === 'I') !== (first.dataset.lcsIsi === '1')) fails.push(`sentence ${i + 1}: the first word I is not marked`);
          });
          if (iCount < 2 || iMid < 1) fails.push('fewer than two words I, or none inside a sentence');
          if (ss.filter((s, i) => !low[i]).every((s) => /^I /.test(s.dataset.lcsText))) fails.push('every sentence printed with its capital starts with I (the child could fix every other one)');
          const rings = [...document.querySelectorAll('[data-lcs-ring]')], on = rings.filter((e) => [...e.children].some((x) => x.matches('[data-lcs-ringmark]')));
          if (isKey ? on.length !== rings.length || document.querySelectorAll('[data-lcs-ringmark]').length !== rings.length : document.querySelector('[data-lcs-ringmark]')) fails.push(`${on.length} of ${rings.length} letters ringed`);
          if (isKey) document.querySelectorAll('[data-lcs-ringmark]').forEach((m) => { const r = R(m), l = R(m.parentElement); if (r.left > l.left || r.right < l.right || r.top > l.top + 4 || r.bottom < l.bottom - 6) fails.push('a ring of the key does not go round its letter'); });
          if (rings.length !== 6 + iMid) fails.push(`${rings.length} places to circle, not ${6 + iMid}`);
          const cp = document.querySelector('[data-lcs-copy]');
          if (!!cp !== !!d.copy) fails.push('the sentence to copy belongs to level 3 only');
          if (cp) { const c = cp.dataset.lcsCopy, ct = cp.querySelector('[data-lcs-copytext]'), shown = ct.textContent.trim();
            if (shown !== c[0].toLowerCase() + c.slice(1) || shown[0] === c[0] || c.split(' ').length !== 3) fails.push('the sentence to copy is not a three-word sentence printed with a small letter');
            if (texts.includes(c)) fails.push('the sentence to copy is one of the six');
            const l = cp.querySelector('[data-lcs-line]'), lr = l && R(l.querySelector('svg'));
            if (!l || lr.width < rb.width * 0.9) fails.push('the row to copy on does not take the width of the page');
            if (l && R(ct).bottom > lr.top + 2) fails.push('the sentence to copy does not stand above its row');
            if (isKey && (!l || l.dataset.lcsAnswer !== c)) fails.push('the key does not copy the sentence with its capital'); }
          else if (lines.length) fails.push('a writing row on a level without the sentence to copy');
        }

        if (mode === 'marks') {
          const rows = [...document.querySelectorAll('[data-lcs-row]')];
          if (rows.length !== d.n) fails.push(`${rows.length} sentences, not ${d.n}`);
          const kinds = rows.map((r) => r.dataset.lcsKind[0]).join('');
          if (kinds.split('a').length - 1 !== d.n / 2) fails.push('not half telling and half asking: ' + kinds);
          if (/ttt|aaa/.test(kinds) || /^(ta)+$|^(at)+$/.test(kinds) || kinds === 't'.repeat(d.n / 2) + 'a'.repeat(d.n / 2) || kinds === 'a'.repeat(d.n / 2) + 't'.repeat(d.n / 2)) fails.push('the telling and asking sentences stand in a pattern: ' + kinds);
          const pics = rows.map((r) => r.querySelector('img') && r.querySelector('img').dataset.lcsPic);
          if (new Set(pics).size !== rows.length) fails.push('two sentences share a picture');
          const want = [];
          rows.forEach((r, i) => {
            const t = r.dataset.lcsText, st = r.querySelector('[data-lcs-stext]');
            if (!st || st.textContent.trim() !== t || /[.?!]$/.test(t)) fails.push(`sentence ${i + 1} is not printed without its end mark`);
            if (pics[i] && !new RegExp('\\b' + pics[i] + '\\b').test(t)) fails.push(`the picture of sentence ${i + 1} is not what it names`);
            if ((r.dataset.lcsKind === 'ask') !== ASK.test(t)) fails.push(`sentence ${i + 1} is keyed as ${r.dataset.lcsKind}ing: "${t}"`);
            want.push(ASK.test(t) ? 'question' : 'period');
            if (st && fs(st) < (lv === 1 ? 16 : 22)) fails.push(`sentence ${i + 1} is printed too small`);
            if (lv > 1 && t.split(' ').length > 5) fails.push(`sentence ${i + 1} is longer than five words on a page a kindergartner reads`);
            const im = r.querySelector('img'); if (!im || R(im).width < 60) fails.push('a picture smaller than 60 px');
          });
          if (d.choose) {
            const sets = rows.map((r) => [...r.querySelectorAll('[data-lcs-mark]')]);
            sets.forEach((ms, i) => { if (ms.length !== 2 || ms.map((m) => m.dataset.lcsMark).sort().join() !== 'period,question' || ms.filter((m) => m.dataset.lcsOk).length !== 1 || ms.find((m) => m.dataset.lcsOk).dataset.lcsMark !== want[i]) fails.push(`sentence ${i + 1}: not a period and a question mark with the right one keyed`);
              ms.forEach((m) => { if (R(m).width < 50 || fs(m) < 40) fails.push('a mark to circle smaller than 50 px'); }); });
            const at = sets.map(place).join('');
            if (!/0/.test(at) || !/1/.test(at) || /000|111/.test(at) || altRun5(at)) fails.push('the right marks stand in one place, three in a row in one place, or alternate more than four times: ' + at);
            const on = sets.flat().filter((m) => getComputedStyle(m).borderTopColor === 'rgb(20, 107, 94)');
            if (isKey ? on.length !== rows.length || on.some((m) => !m.dataset.lcsOk) : on.length) fails.push(`${on.length} marks ringed`);
            if (document.querySelector('[data-lcs-markbox]') || lines.length) fails.push('level 1 has boxes or rows');
          } else {
            const bx = rows.map((r) => r.querySelector('[data-lcs-markbox]'));
            bx.forEach((b, i) => { if (!b) { fails.push(`sentence ${i + 1} has no box for its mark`); return; } if (b.dataset.lcsWant !== want[i]) fails.push(`the box of sentence ${i + 1} is keyed to the wrong mark`);
              const st = rows[i].querySelector('[data-lcs-stext]'); if (st && R(b).left - R(st).right > 24) fails.push(`the box of sentence ${i + 1} does not stand at its end`);
              const mk = { period: '.', question: '?' }[want[i]]; if (isKey ? b.textContent.trim() !== mk : b.textContent.trim()) fails.push('a box is filled on the page of the child, or wrong on the key'); });
            if (document.querySelector('[data-lcs-mark]')) fails.push('a level that writes the mark offers marks to circle');
          }
          const wr = document.querySelector('[data-lcs-write]');
          if (!!wr !== !!d.write) fails.push('the sentences to write belong to level 3 only');
          if (wr) { const wp = wr.dataset.lcsWrite, rs = [...wr.querySelectorAll('[data-lcs-writerow]')];
            if (pics.includes(wp) || rows.some((r) => new RegExp('\\b' + wp + '\\b').test(r.dataset.lcsText))) fails.push('the picture to write about is named by a sentence of the page');
            if (rs.map((r) => r.dataset.lcsWriterow).join() !== 'tell,ask' || rs.some((r) => r.querySelectorAll('[data-lcs-line]').length !== 1) || rs.map((r) => r.querySelector('[data-lcs-markbadge]').textContent.trim()).join('') !== '.?') fails.push('not a row for a telling sentence (.) and a row for an asking sentence (?)');
            if (isKey) { const a = rs.map((r) => (r.querySelector('[data-lcs-line]').dataset.lcsAnswer || '')); if (!/\.$/.test(a[0]) || ASK.test(a[0]) || !/\?$/.test(a[1]) || !ASK.test(a[1]) || !a.every((x) => new RegExp('\\b' + wp + '\\b').test(x))) fails.push('the samples are not a telling and an asking sentence about the picture'); } }
          else if (lines.length) fails.push('a writing row on a level without the sentences to write');
        }

        if (mode === 'longer') {
          const its = [...document.querySelectorAll('[data-lcs-item]')];
          if (its.length !== 4) fails.push(`${its.length} pictures, not four`);
          const cues = its.map((e) => e.dataset.lcsCuekey);
          if (new Set(cues).size !== 4 || cues.some((c) => !CUES[c])) fails.push('the four pictures do not show the four signs once each: ' + cues.join());
          const subj = its.map((e) => { const sc = e.querySelector('[data-lcs-scene]'); return sc ? sc.dataset.lcsScene.split('|') : ['', '']; });
          if (new Set(subj.map((x) => x[0])).size !== its.length) fails.push('two pictures show one subject');
          its.forEach((e, i) => {
            const sc = e.querySelector('[data-lcs-scene]'), cueImg = e.querySelector('[data-lcs-cue]'), subImg = sc && sc.querySelector('[data-lcs-pic]');
            if (!sc || subj[i][1] !== cues[i] || !cueImg || cueImg.dataset.lcsCue !== cues[i] || !subImg) fails.push(`picture ${i + 1} does not show its subject and its sign`);
            if (cueImg && subImg) { const a = R(cueImg), b = R(subImg); if (!(a.right <= b.left + 4 || a.left >= b.right - 4 || a.bottom <= b.top + 4 || a.top >= b.bottom - 4) && Math.min(a.right, b.right) - Math.max(a.left, b.left) > 12 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 12) fails.push(`the sign of picture ${i + 1} covers its subject`); if (a.width < 60 || b.width < 80) fails.push('a subject smaller than 80 px or a sign smaller than 60 px'); }
            const sh = e.querySelector('[data-lcs-short]'); if (!sh || !/^The [a-z]+ [a-z]+s\.$/.test(sh.textContent.trim()) || fs(sh) < 20) fails.push(`picture ${i + 1} has no short sentence printed 20 px or more`);
            // the teacher reads what is printed: the printed sentence names the subject its picture shows
            else if (subImg && sh.textContent.trim().split(' ')[1] !== subImg.dataset.lcsPic.split('_')[0]) fails.push(`picture ${i + 1}: its printed sentence does not name what the picture shows ("${sh.textContent.trim()}", ${subImg.dataset.lcsPic})`);
            const ch = [...e.querySelectorAll('[data-lcs-choice]')];
            if (d.pick) {
              if (ch.length !== 3 || ch.filter((c) => c.dataset.lcsOk).length !== 1 || new Set(ch.map((c) => c.textContent.trim())).size !== 3) fails.push(`picture ${i + 1}: not three add-ons with one right`);
              const ok = ch.find((c) => c.dataset.lcsOk); if (!ok || ok.textContent.trim() !== CUES[cues[i]]) fails.push(`picture ${i + 1}: the add-on keyed is not the one its picture shows`);
              ch.forEach((c) => { if (!Object.values(CUES).includes(c.textContent.trim())) fails.push(`picture ${i + 1}: "${c.textContent.trim()}" is no add-on of the signs`); if (fs(c) < 20) fails.push('an add-on printed smaller than 20 px'); });
              const on = ch.filter((c) => !/rgba\(0, 0, 0, 0\)|transparent/.test(getComputedStyle(c).borderTopColor)); if (isKey ? on.length !== 1 || !on[0].dataset.lcsOk : on.length) fails.push(`picture ${i + 1}: ${on.length} add-ons ringed`);
            } else if (ch.length) fails.push('level 3 offers add-ons to choose from');
            const ls = e.querySelectorAll('[data-lcs-line]');
            if (ls.length !== (d.write ? 1 : 0)) fails.push(`picture ${i + 1} has ${ls.length} writing rows on level ${lv}`);
            ls.forEach((l) => { if (R(l.querySelector('svg')).width < 380) fails.push('a row for the add-on narrower than 380 px'); if (isKey && (l.dataset.lcsAnswer !== CUES[cues[i]] || (!!d.own) !== (l.dataset.lcsKeySample === '1'))) fails.push(`picture ${i + 1}: the key does not write its add-on${d.own ? ' as a sample' : ''}`); });
          });
          if (d.pick) { const at = its.map((e) => place([...e.querySelectorAll('[data-lcs-choice]')])); if (!mixed3(at)) fails.push('the right add-ons stand in one place or as a staircase: ' + at.join('')); }
        }

        const ringed = (e) => !!e.querySelector(':scope > [data-lcs-ringmark]'), lined = (e) => !!e.querySelector(':scope > [data-lcs-underline]');
        const notPattern2 = (s) => s.split('1').length - 1 >= 2 && s.split('0').length - 1 >= 2 && !/000|111/.test(s) && !altRun5(s) && !/^(01)+0?$|^(10)+1?$/.test(s);

        if (mode === 'find') {
          if (lv < 3) {
            const rows = [...document.querySelectorAll('[data-lcs-findrow]')];
            if (rows.length !== d.rows) fails.push(`${rows.length} rows, not ${d.rows}`);
            const at = rows.map((r, i) => { const ps = [...r.querySelectorAll('[data-lcs-pick]')], ok = ps.filter((p) => p.dataset.lcsOk);
              if (ps.length !== 3 || ok.length !== 1 || ok[0].dataset.lcsKind !== 'action' || ps.filter((p) => p.dataset.lcsKind === 'action').length !== 1 || new Set(ps.map((p) => p.dataset.lcsPick)).size !== 3) fails.push(`row ${i + 1}: not one action and two naming words, with the action keyed`);
              const on = ps.filter((p) => getComputedStyle(p).borderTopColor === 'rgb(20, 107, 94)'); if (isKey ? on.length !== 1 || !on[0].dataset.lcsOk : on.length) fails.push(`row ${i + 1}: ${on.length} answers ringed`);
              if (lv === 1) { const act = ps.find((p) => p.dataset.lcsKind === 'action'); if (act && ps.some((p) => (SHOWN[act.dataset.lcsPick] || []).includes(p.dataset.lcsPick))) fails.push(`row ${i + 1}: a naming picture is a thing the action picture shows`);
                if (ps.filter((p) => p.dataset.lcsPerson).length !== 1 || ps.some((p) => p.dataset.lcsPerson && p.dataset.lcsKind !== 'naming')) fails.push(`row ${i + 1}: not one person who is a naming word (a child could circle the person)`);
                ps.forEach((p) => { const im = p.querySelector('img'), w = p.querySelector('[data-lcs-pickword]'); if (!im || R(im).width < 90) fails.push('a picture to circle smaller than 90 px'); if (!w || (isKey ? w.textContent.trim() !== p.dataset.lcsPick : w.textContent.trim())) fails.push('a picture\'s word is printed on the page of the child, or missing on the key'); }); }
              else { if (r.querySelector('img')) fails.push('level 2 shows pictures (the child reads the words)'); ps.forEach((p) => { const w = p.querySelector('[data-lcs-pickword]'); if (!w || w.textContent.trim() !== p.dataset.lcsPick || fs(w) < 30) fails.push('a word to read printed smaller than 30 px'); }); }
              return place(ps); });
            if (!mixed3(at)) fails.push('the action words stand in one place or as a staircase: ' + at.join(''));
            if (document.querySelector('[data-lcs-findsent]')) fails.push('sentences on a level of rows');
          } else {
            const ss = [...document.querySelectorAll('[data-lcs-findsent]')], ex = document.querySelector('[data-lcs-example]');
            if (ss.length !== d.sents) fails.push(`${ss.length} sentences, not ${d.sents}`);
            if (!ex || ex !== blocks[0]) fails.push('no worked example at the top');
            if (ex) { const n = [...ex.querySelectorAll('[data-lcs-cls="n"]')], a = [...ex.querySelectorAll('[data-lcs-cls="a"]')]; if (n.length !== 1 || a.length !== 1 || !ringed(n[0]) || !lined(a[0]) || ex.querySelectorAll('[data-lcs-ringmark]').length !== 1 || ex.querySelectorAll('[data-lcs-underline]').length !== 1) fails.push('the worked example does not circle its naming word and underline its action word'); }
            const at = [], stems = []; let last = 0;
            ss.forEach((s, i) => { const ws = [...s.querySelectorAll('[data-lcs-w]')], n = ws.filter((w) => w.dataset.lcsCls === 'n'), a = ws.filter((w) => w.dataset.lcsCls === 'a');
              if (n.length !== 1 || a.length !== 1 || ws.length < 2 || ws.length > 5) { fails.push(`sentence ${i + 1}: not one naming word and one action word`); return; }
              at.push(ws.indexOf(n[0])); stems.push(n[0].textContent.trim().toLowerCase().replace(/s$/, '')); if (ws.indexOf(a[0]) === ws.length - 1) last++;
              if (isKey ? !ringed(n[0]) || !lined(a[0]) || s.querySelectorAll('[data-lcs-ringmark]').length !== 1 || s.querySelectorAll('[data-lcs-underline]').length !== 1 : s.querySelector('[data-lcs-ringmark], [data-lcs-underline]')) fails.push(`sentence ${i + 1}: marked on the page of the child, or not circled and underlined on the key`);
              if (fs(s.querySelector('[data-lcs-print]')) < 30) fails.push(`sentence ${i + 1} is printed smaller than 30 px`);
              const shown = s.querySelector('[data-lcs-print]').textContent.replace(/\s+/g, ' ').trim(); if (shown !== s.dataset.lcsText.replace(/\/[na]/g, '')) fails.push(`sentence ${i + 1} prints "${shown}"`); });
            if (new Set(stems).size !== stems.length) fails.push('two sentences name one thing');
            if (new Set(at).size < 3) fails.push('the naming words do not stand first, second and third: ' + at.join(''));
            if (last > 4) fails.push(`the action word is the last word in ${last} of ${ss.length} sentences`);
            if (document.querySelector('[data-lcs-findrow]')) fails.push('rows of words on the level of sentences');
          }
        }

        if (mode === 'strips') {
          const st = [...document.querySelectorAll('[data-lcs-strip]')];
          if (st.length !== d.n || st.map((s) => s.dataset.lcsStrip).join() !== st.map((_, i) => i + 1).join()) fails.push(`${st.length} strips, not ${d.n} numbered in order`);
          const kinds = st.map((s) => s.dataset.lcsKind[0]).join('');
          if (kinds.split('a').length - 1 !== d.n / 2) fails.push('not half telling and half asking: ' + kinds);
          if (/ttt|aaa/.test(kinds) || /^(ta)+$|^(at)+$/.test(kinds) || kinds === 't'.repeat(d.n / 2) + 'a'.repeat(d.n / 2) || kinds === 'a'.repeat(d.n / 2) + 't'.repeat(d.n / 2)) fails.push('the telling and asking strips stand in a pattern: ' + kinds);
          // the printed grid: rows of two strips, read from what is printed
          const prow = [...document.querySelectorAll('[data-lcs-striprow]')].map((r) => [...r.querySelectorAll('[data-lcs-strip]')].sort((a, b) => R(a).left - R(b).left).map((s) => s.dataset.lcsKind[0]).join(''));
          if (prow.length !== d.n / 2 || prow.some((r) => r.length !== 2)) fails.push('the strips are not printed in rows of two');
          else { const col = (c) => prow.map((r) => r[c]).join(''), alt = (x) => /^(ta)+t?$|^(at)+a?$/.test(x);
            if (prow.every((r) => r[0] !== r[1])) fails.push('every printed row holds one telling and one asking strip: ' + prow.join(' '));
            if (prow.every((r) => r === prow[0])) fails.push('every printed row has one pattern: ' + prow.join(' '));
            if (alt(col(0)) || alt(col(1))) fails.push('a printed column alternates all the way down: ' + prow.join(' ')); }
          const abouts = st.map((s) => s.dataset.lcsAbout);
          if (new Set(abouts).size !== st.length) fails.push('two strips are about one thing');
          st.forEach((s, i) => { const t = s.dataset.lcsText, tx = s.querySelector('[data-lcs-stext]'), im = s.querySelector('img');
            if (R(s).width > 316) fails.push(`strip ${i + 1} is wider than 316 px`);
            if (!tx || tx.textContent.trim() !== t || /[.?!]$/.test(t)) fails.push(`strip ${i + 1} is not printed without its end mark`);
            if ((s.dataset.lcsKind === 'ask') !== ASK.test(t)) fails.push(`strip ${i + 1} is filed as ${s.dataset.lcsKind}ing: "${t}"`);
            if (!new RegExp('\\b' + abouts[i] + '\\b').test(t)) fails.push(`strip ${i + 1} does not name what it is about`);
            // levels 1 and 2: the picture of what the strip names; level 3 (the child reads): no picture
            if (d.pic ? !im || im.dataset.lcsPic !== abouts[i] : im) fails.push(d.pic ? `the picture of strip ${i + 1} is not what it names` : `strip ${i + 1} shows a picture on level 3 (the child reads the strip)`);
            if (tx && fs(tx) < (lv === 1 ? 16 : lv === 2 ? 19 : 20)) fails.push(`strip ${i + 1} is printed too small (${fs(tx)} px)`);
            if (lv > 1 && t.split(' ').length > 5) fails.push(`strip ${i + 1} is longer than five words on a level the child reads`);
            const mb = s.querySelector('[data-lcs-markbox]');
            if (!!mb !== !!d.box) fails.push(`strip ${i + 1}: a box for the mark ${d.box ? 'is missing' : 'on a level that does not write it'}`);
            if (mb) { const want = ASK.test(t) ? 'question' : 'period'; if (mb.dataset.lcsWant !== want) fails.push(`the box of strip ${i + 1} is keyed to the wrong mark`);
              // the sentence on ONE line, and the box on the line of its last word, within 14 px after its last letter
              const tw = tx && document.createTreeWalker(tx, NodeFilter.SHOW_TEXT); let last = null;
              while (tw && tw.nextNode()) if (tw.currentNode.nodeValue.trim()) last = tw.currentNode;
              if (!last) fails.push(`strip ${i + 1} has no words before its box`);
              else {
                const all = document.createRange(); all.selectNodeContents(tx);
                const tops = new Set([...all.getClientRects()].filter((q) => q.width > 0.5).map((q) => Math.round(q.top)));
                if (tops.size !== 1) fails.push(`strip ${i + 1}: its sentence stands on ${tops.size} lines, not one`);
                const end = last.nodeValue.replace(/\s+$/, '').length, g = document.createRange(); g.setStart(last, end - 1); g.setEnd(last, end);
                const gr = g.getBoundingClientRect(), br = R(mb), mid = (gr.top + gr.bottom) / 2, gap = br.left - gr.right;
                if (gap > 14 || gap < -1 || mid < br.top || mid > br.bottom) fails.push(`the box of strip ${i + 1} does not stand on the line of its last word, within 14 px after its last letter (${Math.round(gap)} px)`);
              }
              if (isKey ? mb.textContent.trim() !== { period: '.', question: '?' }[want] : mb.textContent.trim()) fails.push('a box is filled on the page of the child, or wrong on the key'); } });
          const bx = [...document.querySelectorAll('[data-lcs-stripbox]')];
          if (bx.map((b) => b.dataset.lcsStripbox + b.querySelector('[data-lcs-boxmark]').textContent.trim()).join() !== 'tell.,ask?') fails.push('not a period box for telling and a question-mark box for asking');
          const sw = st.length ? R(st[0]).width : 0, sh = st.length ? R(st[0]).height : 0;
          bx.forEach((b) => { const p = R(b.querySelector('[data-lcs-paste]')); if (p.width < sw + 8 || p.height < (d.n / 2) * sh) fails.push(`the ${b.dataset.lcsStripbox} box cannot hold its strips with room (${Math.round(p.width)} x ${Math.round(p.height)})`);
            const nums = [...b.querySelectorAll('[data-lcs-keynum]')].map((e) => e.dataset.lcsKeynum).join(), want = st.filter((s) => s.dataset.lcsKind === b.dataset.lcsStripbox).map((s) => s.dataset.lcsStrip).join();
            if (isKey ? nums !== want : nums) fails.push(`the key of the ${b.dataset.lcsStripbox} box is not its strips`); });
          if (document.querySelector('[data-lcs-strips]') !== blocks[blocks.length - 1]) fails.push('the strips to cut out are not at the foot of the page');
        }

        if (mode === 'pair') {
          const rows = [...document.querySelectorAll('[data-lcs-pairrow]')];
          if (rows.length !== d.n) fails.push(`${rows.length} sentences, not ${d.n}`);
          const texts = rows.map((r) => r.dataset.lcsText), firsts = texts.map((t) => t.split(' ')[0]);
          if (new Set(firsts).size !== firsts.length) fails.push('two sentences start with one word');
          const at = [];
          rows.forEach((r, i) => { const t = r.dataset.lcsText, ws = t.slice(0, -1).split(' '), small = t[0].toLowerCase() + t.slice(1);
            if (lv === 1 ? ws.length !== 3 : ws.length < 4 || ws.length > 5) fails.push(`sentence ${i + 1} has ${ws.length} words on level ${lv}`);
            if (!/^[ABDEFGHJMNQRT]/.test(t) || /[A-Z]/.test(t.slice(1).replace(/(^| )I(?= |\.)/g, '$1'))) fails.push(`sentence ${i + 1} starts with a letter whose small form looks like its capital, or has another capital`);
            const op = [...r.querySelectorAll('[data-lcs-option]')];
            if (lv < 3) {
              const ok = op.filter((o) => o.dataset.lcsOk);
              if (op.length !== 2 || ok.length !== 1 || ok[0].textContent.trim() !== t || op.find((o) => !o.dataset.lcsOk).textContent.trim() !== small) fails.push(`sentence ${i + 1}: not the sentence written right and written with a small first letter, the right one keyed`);
              at.push(op.findIndex((o) => o.dataset.lcsOk));
              op.forEach((o) => { if (fs(o) < 28) fails.push('a sentence printed smaller than 28 px'); });
              const on = op.filter((o) => getComputedStyle(o).borderTopColor === 'rgb(20, 107, 94)'); if (isKey ? on.length !== 1 || !on[0].dataset.lcsOk : on.length) fails.push(`sentence ${i + 1}: ${on.length} ringed`);
              if (op.length === 2) { const a = R(op[0]), b = R(op[1]); if (d.side ? !(a.right <= b.left && Math.abs(a.top - b.top) < 4) : !(a.bottom <= b.top + 1)) fails.push(`sentence ${i + 1}: the two ways do not stand ${d.side ? 'side by side' : 'one above the other'}`); }
            } else if (op.length) fails.push('level 3 offers sentences to circle');
            const cw = r.querySelector('[data-lcs-capwrite]');
            if (!!cw !== !!d.box) fails.push(`sentence ${i + 1}: a box for the capital letter ${d.box ? 'is missing' : 'on a level without one'}`);
            if (cw) { if (cw.dataset.lcsWant !== t[0]) fails.push(`the box of sentence ${i + 1} is keyed to "${cw.dataset.lcsWant}"`); if (isKey ? cw.textContent.trim() !== t[0] : cw.textContent.trim()) fails.push('a box is filled on the page of the child, or wrong on the key'); }
            const ls = r.querySelectorAll('[data-lcs-line]'), sm = r.querySelector('[data-lcs-small]');
            if (lv === 3) {
              if (!sm || sm.textContent.trim() !== small || fs(sm) < 28) fails.push(`sentence ${i + 1} is not printed with its small first letter`);
              if (ls.length !== 1 || R(ls[0].querySelector('svg')).width < 260) fails.push(`sentence ${i + 1} has no row of 260 px or more for its first word`);
              if (isKey && ls[0] && ls[0].dataset.lcsAnswer !== ws[0]) fails.push(`the key of sentence ${i + 1} does not write its first word with a capital`);
            } else if (ls.length || sm) fails.push('a row for the first word on a level without one');
          });
          if (lv < 3 && !notPattern2(at.join(''))) fails.push('the right way stands in one place, three in a row, or alternates more than four times: ' + at.join(''));
        }
        return fails;
      }, { SIZES: LEVELS, CUES: Object.fromEntries(Object.entries(LG.cues).map(([k, c]) => [k, c.add])), ASKRE: ASK.source, SHOWN: BANK.find.shownIn, GLUE });
    },
  };
}

module.exports = { makeSentencesKType, faultsOf, LEVELS, ASK, READ_WORDS, FIND_WORDS };
