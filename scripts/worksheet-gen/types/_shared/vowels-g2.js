/**
 * vowels-g2.js — five Grade 2 phonics pages on vowel sounds (English literacy year, Daily Teaching System Part 12.3,
 * 2026-11-17; the units "Long Vowels and Vowel Teams" and "Bossy R and Longer Words" of Grade 2). The words are
 * data/literacy/vowels-g2.en.json (written by the scratch script s-g2vow/bank.js). The pages are led by PRINTED WORDS (a
 * second grader reads and writes them); a picture stands only where the library has one that a child names with that word.
 * The instruction at the top of every page states the concept; each numbered task has its own line naming the letters.
 *
 *   shortlong  G2-530 Short or Long Vowel? (RF.2.3.a)
 *     level 1  1. four pictures, under each the two words of a pair (cap / cape, cot / coat; a short word and the same word
 *              with a silent e or a vowel team), stacked in a random order: circle the word for the picture (two pictures
 *              show the short word, two the long word); 2. six simple words to sort under short vowel and long vowel
 *              (three each); 3. two sentences with the two words of a pair to circle (one right word short, one long)
 *     level 2  1. eight words (blends and digraphs allowed) to sort, four short and four long; 2. four sentences to circle in
 *     level 3  1. six harder words to sort (three each, five letters or fewer) and ONE word that is neither short nor long
 *              (car, star, park, cow, now, boy; never first or last) to cross out; 2. three pictures to write the word for,
 *              short and long words (the first letter is printed on the row); 3. a sentence with the two words of a pair
 *              after it: write the word that fits on the row
 *     The long words are spelled with silent e or ai, ay, ee, ea, oa, ow; a long u only where it says its name (cute, mule:
 *     not tube, rule, tune, flute); no a or e before a final g in a sort (bag, leg, flag). The column heads carry the US
 *     marks: a breve for a short vowel (ă ĕ ĭ ŏ ŭ), a macron for a long vowel (ā ē ī ō ū).
 *   teams      G2-531 Vowel Teams for Long a, e, and o (RF.2.3.b)
 *     level 1  ONE long vowel a copy (ai/ay, ee/ea, or oa/ow): 1. six words with a gap for the team (three of each), with
 *              the rule of the place where one exists (ai/ay, oa/ow); ee/ea has none: the line says that they say the same
 *              sound and asks for the one that looks right; 2. two pictures to write the word for; 3. two sentences to
 *              finish from a box of four words
 *     level 2  TWO long vowels: 1. six words to sort by their vowel SOUND (both teams of a sound in its column); 2. nine
 *              words with a gap, the four teams named on the line (every team at least once; only one team makes a word),
 *              the rules of the sounds that have one
 *     level 3  ALL six teams: 1. six words with a gap, the teams drawn one by one (a team may come twice, so no gap is
 *              found by leaving it for last; four teams or more, a long a and a long o), both rules; 2. three pictures to
 *              write the word for (one long a, one long e, one long o); 3. two sentences from a box of four
 *     An ee or ea gap stands only in a word a second grader knows by sight (the bank's gapE: see, tree, green, eat, leaf...).
 *   diph       G2-532 Vowel Sounds: oo, ou, ow, oi, and oy (RF.2.3.b)
 *     level 1  oo: 1. six words to sort by the sound of oo (moon or book, three each; never hoop, which many say with the
 *              oo of book); 2. three sentences with an oo word of each sound to circle (one right word of each sound or more)
 *     level 2  ou, ow, oi, oy: 1. two rows of three words with a gap: "Write ou or ow." under the rule of ou/ow, then
 *              "Write oi or oy." under the rule of oi/oy (both spellings in each row; oy only in boy, toy, joy); 2. six words
 *              to sort by sound (the sound in cow / the sound in boy, three each): the two sounds meet only in the sort
 *     level 3  all five: 1. six words with a gap (oo, ou, ow, oi and two more of any; an oy gap is not on every copy, the
 *              box sentences hold oy), both rules; 2. three pictures to write; 3. two sentences from a box of four
 *     ow also spells long o (snow): no word on these pages can be read both ways, and the note says that ow has two sounds.
 *   aror       G2-533 Bossy r: ar and or (RF.2.3.b)
 *     level 1  ar: 1. six printed words (four with a picture, two without: the pictured word with ar written another way,
 *              cart / coat) to match to four pictures; 2. a worked word in grey and five words with a gap for ar;
 *              3. three sentences with an ar word and the same word without r to circle (cart / cat; both kinds right)
 *     level 2  ar and or: 1. eight words to sort under ar and or (four each); 2. four sentences with an ar word and an or
 *              word to circle (barn / born; both kinds right)
 *     level 3  1. three pictures to write the word for (at least one ar and one or; never a word that starts with ar, arm);
 *              2. six words with a gap for ar or or (only one makes a word); 3. three sentences to finish from a box of five
 *   erirur     G2-534 er, ir, and ur: One Sound, Three Spellings (RF.2.3.e)
 *     level 1  er: 1. a worked word in grey and five words with a gap for er (one-syllable words and two-syllable words
 *              that end in er); 2. two pictures to write (blender, mixer, hamster: no doubled letter the lesson does not
 *              teach); 3. two sentences from a box of four
 *     level 2  er, ir, ur: 1. nine words to sort (three each; the er words have one syllable); 2. three pictures, each with
 *              its word spelled three ways (bird / berd / burd; the wrong ones are no words): circle the one that looks right
 *     level 3  1. six one-syllable words and an ODD word (here, there, where: the letters, not the sound) to sort: cross out
 *              the odd word, write the others under er, ir, ur; 2. three pictures (about 84 px), a box of er, ir, ur beside
 *              each: circle the right letters, then write the word (the first letter on the row; the key rings the
 *              letters); 3. two sentences, each with its word and one other word: write the one that fits
 *     her, first, turn (the examples of the instruction) are never a word the child writes or chooses.
 *
 * One right answer: every sentence names in the bank every other word of its type's lists that also fits (`fits`); no such
 * word is printed on a page that shows the sentence. A gap offers only spellings with which no other real word (the bank's
 * `real` list) and no rude word can be built, and the letters beside it are never a banned fragment. No word is printed
 * twice on a page; a word to write is never printed. Handwriting rows are 89 px (half an inch); gaps are 96 px for two
 * letters. Ligatures are off on the whole page (fi, fl, ff) and an f before i, f, l, or t and a t before t get room of
 * their own. A period after the last word of a sentence stands outside its pill. English only.
 * Themeless: a copy draws other words. PDF only (the answer key is for checks and review; sort answers are marked "any
 * order"). The bank is checked when this file loads (g2VowelFaultsOf), including that every level can draw its pages; no
 * picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/vowels-g2.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, line } = _parts;

const ROW = 89;                                     // every handwriting row (half an inch from the top rule to the baseline)
const GAP2 = 96, GAP1 = 60;                         // a gap for two letters and for one
const PICS = BANK.pics || {};
const SL = BANK.shortlong || {}, TM = BANK.teams || {}, DI = BANK.diph || {}, AO = BANK.aror || {}, EI = BANK.erirur || {};
const stem = (w) => w.replace(/s$/, '');
const VOWEL_GROUPS = (w) => (w.match(/[aeiouy]+/g) || []).length;
const LONG_SPELLINGS = ['ai', 'ay', 'ee', 'ea', 'oa', 'ow'];
/** the long-vowel spelling of a word of G2-530: a team, or a silent e after one consonant sound */
const longSpelling = (w) => LONG_SPELLINGS.find((t) => w.includes(t)) || (/^[^aeiou]*[aeiou][^aeiou]+e$/.test(w) ? w.match(/[aeiou]/)[0] + '_e' : null);
const isShortWord = (w) => /^[^aeiou]*[aeiou][^aeiou]+$/.test(w) && !/ng|nk|all$|^wa|r$|[aeiou]r|y/.test(w);
const fragmentsOf = (w, at, g) => [w.slice(0, at), w.slice(at + g.length)].filter(Boolean);

/* ---------------------------------------------------------------- the levels ---------------------------------------------------------------- */
// say: the words of the type's lists that the level instruction at the top of the page prints (its examples: hop, hope);
// no task uses them, and verify() reads the printed instruction to hold the page to it. tasks: in page order, [kind, count]
// (picpair: pictures; sort: words a column; pillsent / choicewrite / boxsent: sentences; gaps: words without the worked one;
// write, match, check: pictures). The rest are sizes.
const LEVELS = {
  shortlong: {
    1: { say: ['hop', 'hope', 'name', 'say'], tasks: [['picpair', 4], ['sort', 3], ['pillsent', 2]], pic: 72, pill: 24, chip: 24, sfont: 24, pad: 7 },
    2: { say: ['hop', 'hope', 'name', 'say'], tasks: [['sort', 4], ['pillsent', 4]], chip: 23, sfont: 24, pill: 24, spad: 1, pad: 7 },
    3: { say: ['hop', 'hope', 'name', 'say'], tasks: [['sort', 3], ['write', 3], ['choicewrite', 1]], chip: 21, chipPad: 10, sortMax: 5, textMax: 32, wpic: 66, sfont: 22, pad: 9 },
  },
  teams: {
    1: { say: [], tasks: [['gaps', 6], ['write', 2], ['boxsent', 2]], gfont: 38, grow: 26, wpic: 76, sfont: 23, pad: 11 },
    2: { say: [], tasks: [['sort', 3], ['gaps', 9]], chip: 24, gfont: 34, grow: 16, pad: 9 },
    3: { say: [], tasks: [['gaps', 6], ['write', 3], ['boxsent', 2]], gfont: 32, grow: 14, wpic: 64, sfont: 22, pad: 7 },
  },
  diph: {
    1: { say: ['moon', 'book', 'sound'], tasks: [['sort', 3], ['pillsent', 3]], chip: 25, sfont: 28, pill: 28, spad: 10, pad: 14 },
    2: { say: ['cow', 'boy', 'sound'], tasks: [['gaps', 6], ['sort', 3]], gfont: 34, chip: 24, pad: 9 },
    3: { say: ['moon', 'book', 'cow', 'boy', 'sound'], tasks: [['gaps', 6], ['write', 3], ['boxsent', 2]], gfont: 32, grow: 14, wpic: 62, sfont: 22, pad: 7 },
  },
  aror: {
    1: { say: ['park'], tasks: [['match', 4], ['gaps', 5], ['pillsent', 3]], mfont: 28, mrow: 44, mgap: 8, mpic: 66, gfont: 36, sfont: 26, pill: 26, pad: 9 },
    2: { say: ['park', 'storm'], tasks: [['sort', 3], ['pillsent', 4]], chip: 24, sfont: 26, pill: 26, spad: 6, pad: 12 },
    3: { say: ['park', 'storm'], tasks: [['write', 3], ['gaps', 6], ['boxsent', 3]], wpic: 66, gfont: 34, sfont: 22, pad: 8 },
  },
  erirur: {
    1: { say: ['her'], tasks: [['gaps', 5], ['write', 2], ['boxsent', 2]], gfont: 38, gapMax: 6, grow: 24, wpic: 80, sfont: 23, pad: 11 },
    2: { say: ['her', 'first', 'turn'], tasks: [['sort', 3], ['check', 3]], chip: 23, pic: 82, pill: 25, pad: 10 },
    3: { say: ['her', 'first', 'turn'], tasks: [['sort', 2], ['write', 3], ['choicewrite', 2]], chip: 22, chipPad: 10, sortMax: 5, textMax: 32, wmax: 5, wpic: 84, sfont: 21, pad: 4, gap: 3, cgap: 3 },
  },
};

/* ---------------------------------------------------------------- what the modes are made of ---------------------------------------------------------------- */
const flat = (o) => (Array.isArray(o) ? o.flatMap(flat) : o && typeof o === 'object' ? Object.values(o).flatMap(flat) : typeof o === 'string' ? [o] : []);
const DI_SP = { oo: [...((DI.words || {})['oo-moon'] || []), ...((DI.words || {})['oo-book'] || [])], ou: (DI.words || {}).ou || [], ow: (DI.words || {}).ow || [], oi: (DI.words || {}).oi || [], oy: (DI.words || {}).oy || [] };
/** the spellings a gap of a mode can hold, with their words */
const SPELL = { teams: TM.words || {}, diph: DI_SP, aror: AO.words || {}, erirur: EI.words || {} };
/** every word of a type's lists (what a sentence's `fits` is judged against) */
const unionOf = (b, mode) => {
  const s = b.shortlong || {}, d = b.diph || {};
  if (mode === 'shortlong') return new Set([...flat(s.short), ...flat(s.long), ...(s.pairs || []).flat(), ...flat(s.write)]);
  if (mode === 'teams') return new Set(flat((b.teams || {}).words));
  if (mode === 'diph') return new Set([...flat(d.words), ...flat(d.write)]);
  if (mode === 'aror') return new Set(flat((b.aror || {}).words));
  return new Set(flat((b.erirur || {}).words));
};
const UNION = Object.fromEntries(Object.keys(LEVELS).map((m) => [m, unionOf(BANK, m)]));
const REAL = new Set(BANK.real || []), BAD = new Set(BANK.bad || []), BADFRAG = new Set(BANK.badFragments || []);
/** the spelling of a word in a mode (the one spelling it holds), or null */
function spellingIn(mode, w, sp = SPELL[mode]) { const has = Object.keys(sp).filter((g) => (sp[g] || []).includes(w)); return has.length === 1 ? has[0] : null; }
/** what a gap in w (spelling g) can build with the other offered spellings: [real or rude words] */
function rivalsOf(w, g, offered, real = REAL, bad = BAD) { const at = w.indexOf(g); return offered.filter((o) => o !== g).map((o) => w.slice(0, at) + o + w.slice(at + g.length)).filter((x) => real.has(x) || bad.has(x)); }
/** a word can stand with a gap for g when the offered spellings build no other real or rude word and its fragments are clean */
const gapOk = (w, g, offered, real = REAL, bad = BAD, frag = BADFRAG) => { const at = w.indexOf(g); return at >= 0 && w.indexOf(g, at + 1) < 0 && !rivalsOf(w, g, offered, real, bad).length && !bad.has(w) && !fragmentsOf(w, at, g).some((x) => frag.has(x)); };
/** the words of a sentence's text that are words of the type's lists */
const textWords = (s, union) => (s.text.replace('___', ' ').toLowerCase().match(/[a-z]+/g) || []).filter((w) => union.has(w));
/** the example words of a rule (words of the lists it prints) */
const ruleWords = (text, union) => (text.toLowerCase().match(/[a-z]+/g) || []).filter((w) => union.has(w));

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
/** What must be true of the word bank before any page prints it. Returns the list of faults (empty = sound). */
function g2VowelFaultsOf(b) {
  const f = [];
  const pics = b.pics || {};
  for (const [w, p] of Object.entries(pics)) if (!Array.isArray(p) || p.length !== 2 || !p.every((x) => typeof x === 'string' && x) || /\bbw(\s*\d+)?$/i.test(p[0])) f.push('picture of ' + w + ': not a colour theme and a noun');
  const printOnly = new Set(b.printOnly || []);
  if (printOnly.size < 10) f.push('no list of print-only pictures');
  for (const w of printOnly) if (pics[w]) f.push(`"${w}" is print-only and has a picture to write or choose from`);
  const bad = new Set(b.bad || []), frag = new Set(b.badFragments || []), real = new Set(b.real || []);
  if (bad.size < 10 || !['fart', 'turd', 'coon', 'shart', 'hate'].every((x) => bad.has(x))) f.push('no list of words a gap may never build');
  if (!frag.has('ass') || !frag.has('ag')) f.push('no list of letters that may never stand beside a gap');
  const U = Object.fromEntries(Object.keys(LEVELS).map((m) => [m, unionOf(b, m)]));
  // no word of any list, pair, or picture is a word a gap may never build (hate: many classrooms ban the word)
  for (const m of Object.keys(U)) for (const w of U[m]) if (bad.has(w)) f.push(`${m}: "${w}" is a word no page may print`);
  const SP = { teams: (b.teams || {}).words || {}, diph: { oo: [...(((b.diph || {}).words || {})['oo-moon'] || []), ...(((b.diph || {}).words || {})['oo-book'] || [])], ou: ((b.diph || {}).words || {}).ou || [], ow: ((b.diph || {}).words || {}).ow || [], oi: ((b.diph || {}).words || {}).oi || [], oy: ((b.diph || {}).words || {}).oy || [] }, aror: (b.aror || {}).words || {}, erirur: (b.erirur || {}).words || {} };
  // a sentence: one blank (not at the start), at most 42 letters, an end mark; its fits are words of the type's lists
  const sentOk = (s, mode, where) => {
    if (!s || typeof s.text !== 'string' || s.text.split('___').length !== 2 || /^___/.test(s.text) || s.text.length > 42 || !/[.!?]$/.test(s.text)) { f.push(`${where}: "${s && s.text}" has not one blank inside a short sentence`); return false; }
    if (!Array.isArray(s.fits) || s.fits.some((x) => !U[mode].has(x)) || s.fits.includes(s.right) || (s.wrong && s.fits.includes(s.wrong))) { f.push(`${where}: "${s.text}": its fits are not other words of the lists`); return false; }
    if (textWords(s, U[mode]).some((w) => w === s.right || w === s.wrong || s.fits.includes(w))) { f.push(`${where}: "${s.text}" prints its own answer, its other word, or a word that fits`); return false; }
    return true;
  };
  // every list word holds its spelling once; no word stands under two spellings
  for (const [mode, by] of Object.entries(SP)) {
    const all = Object.values(by).flat();
    if (new Set(all).size !== all.length) f.push(mode + ': a word stands under two spellings or twice');
    for (const [g, ws] of Object.entries(by)) {
      if (!ws.length) f.push(`${mode}: no ${g} words`);
      ws.forEach((w) => {
        const at = w.indexOf(g);
        if (!/^[a-z]{2,8}$/.test(w) || at < 0 || w.indexOf(g, at + 1) >= 0) f.push(`${mode}: "${w}" does not hold ${g} once`);
        else if (mode !== 'erirur' && VOWEL_GROUPS(w.replace(/e$/, '')) !== 1) f.push(`${mode}: "${w}" is not one syllable`);
        else if (mode === 'erirur' && !(VOWEL_GROUPS(w.replace(/e$/, '')) === 1 || (g === 'er' && /er$/.test(w) && VOWEL_GROUPS(w) === 2))) f.push(`erirur: "${w}" is not one syllable or a two-syllable word that ends in er`);
        // the rules of the place printed on the pages
        const end = at + g.length === w.length, start = at === 0, next = w.slice(at + g.length);
        const breaks = { ai: end || start, ay: !end, oa: end || start, ow: mode === 'teams' ? !end : !(end || /^[nl]$/.test(next)), ou: end || start || /^[nl]$/.test(next), oi: end || start, oy: !end }[g];
        if (breaks) f.push(`${mode}: "${w}" breaks the rule of the place of ${g}`);
      });
    }
  }
  // the gap pools and the rules' example words
  const T2 = b.teams || {}, D2 = b.diph || {}, A2 = b.aror || {}, E2 = b.erirur || {}, S2 = b.shortlong || {};
  for (const [k, txt] of Object.entries(T2.rules || {})) if (ruleWords(txt, U.teams).length !== 2) f.push(`teams: the rule of long ${k} does not name two example words`);
  for (const [k, txt] of Object.entries(D2.rules || {})) if (ruleWords(txt, U.diph).length < 2) f.push(`diph: the rule of ${k} names no example words`);
  if (!T2.rules || !T2.rules.a || !T2.rules.o || T2.rules.e) f.push('teams: the rules are not those of long a and long o');
  if (!D2.rules || !D2.rules.ou || !D2.rules.oi) f.push('diph: the rules of ou/ow and oi/oy are missing');
  // G2-530
  const short = [...(S2.short || {}).simple || [], ...(S2.short || {}).hard || []], long = [...(S2.long || {}).simple || [], ...(S2.long || {}).hard || []];
  short.forEach((w) => { if (!isShortWord(w) || VOWEL_GROUPS(w) !== 1) f.push(`shortlong: "${w}" is not a one-syllable short-vowel word`); });
  // a or e before a final g is said long in many American classrooms (bag, leg, flag): no such word in the sort
  short.forEach((w) => { if (/[ae]g$/.test(w)) f.push(`shortlong: "${w}" (a or e before g) is in the sort`); });
  long.forEach((w) => { if (!longSpelling(w) || VOWEL_GROUPS(w.replace(/e$/, '')) !== 1 || /[aeiou]r/.test(w)) f.push(`shortlong: "${w}" is not a one-syllable long-vowel word of a Grade 1 spelling`); });
  // a long u says its name (cute, mule) only after a letter that keeps the y sound in American speech: never after t, d, n,
  // l, r, s, z, j, ch, sh (tube, tune, rule, flute say oo)
  long.forEach((w) => { if (longSpelling(w) === 'u_e' && /(?:[tdnlrszj]|ch|sh)u[^aeiou]+e$/.test(w)) f.push(`shortlong: the u of "${w}" does not say its name`); });
  // the odd words of Level 3: neither short nor long (a bossy r or a vowel team of another sound), no word of the lists
  const odd5 = S2.odd || [];
  if (odd5.length < 3) f.push('shortlong: fewer than three odd words');
  odd5.forEach((w) => { if (U.shortlong.has(w) || !/^[a-z]{3,5}$/.test(w) || !/[ao]r|ow|oy|oi|ou/.test(w)) f.push(`shortlong: the odd word "${w}" is a list word or is short or long`); });
  if (new Set([...short, ...long]).size !== short.length + long.length) f.push('shortlong: a word stands twice in the short and long lists');
  const pairs = S2.pairs || [];
  // a pair: the short word with a silent e added, or with its vowel written as a team that starts with that vowel (ck -> k)
  const madeLong = (s) => { const v = (s.match(/[aeiou]/) || [''])[0]; return [s + 'e', ...LONG_SPELLINGS.filter((t) => t[0] === v).flatMap((t) => [s.replace(v, t), s.replace(v, t).replace('ck', 'k')])]; };
  pairs.forEach(([s, l]) => { if (!isShortWord(s) || !longSpelling(l) || !madeLong(s).includes(l)) f.push(`shortlong: "${s}" and "${l}" are no pair of a short word and the same word made long`); });
  if (new Set(pairs.flat()).size !== pairs.length * 2) f.push('shortlong: a word stands in two pairs');
  const pp = S2.pairPics || [];
  pp.forEach((w) => { if (!pics[w] || !pairs.some((p) => p.includes(w))) f.push(`shortlong: the pictured pair word "${w}" has no picture or no pair`); });
  if (pp.filter((w) => pairs.some((p) => p[0] === w)).length < 4 || pp.filter((w) => pairs.some((p) => p[1] === w)).length < 4) f.push('shortlong: fewer than four pictured short words or four pictured long words');
  const wr = S2.write || {};
  [...(wr.short || []), ...(wr.long || [])].forEach((w) => { if (!pics[w] || printOnly.has(w)) f.push(`shortlong: "${w}" to write has no picture or is print-only`); });
  (wr.short || []).forEach((w) => { if (!isShortWord(w.replace(/sh|ch|th/, 'x'))) f.push(`shortlong: "${w}" to write under short is not a short-vowel word`); });
  (wr.long || []).forEach((w) => { if (!longSpelling(w) && !/ow/.test(w)) f.push(`shortlong: "${w}" to write under long is not a long-vowel word`); });
  (S2.sentences || []).forEach((s) => { if (sentOk(s, 'shortlong', 'shortlong') && !pairs.some((p) => p.includes(s.right) && p.includes(s.wrong) && s.right !== s.wrong)) f.push(`shortlong: "${s.text}" does not offer the two words of a pair`); });
  // G2-531
  for (const [g, ws] of Object.entries(T2.words || {})) if (!(T2.sound || {})[g]) f.push(`teams: ${g} has no long vowel`);
  // the ee and ea words a gap may stand in (no rule tells the two apart: words a second grader knows by sight)
  if ((T2.gapE || []).length < 10) f.push('teams: no list of the ee and ea words that may stand with a gap');
  (T2.gapE || []).forEach((w) => { if (!((SP.teams.ee || []).includes(w) || (SP.teams.ea || []).includes(w))) f.push(`teams: the gap word "${w}" is no ee or ea word`); });
  for (const [v, ws] of Object.entries(T2.write || {})) ws.forEach((w) => { if (!pics[w] || printOnly.has(w) || (T2.sound || {})[spellingIn('teams', w, SP.teams)] !== v) f.push(`teams: "${w}" to write has no picture or does not say long ${v}`); });
  const boxCheck = (mode, sents, fillers, where) => {
    const ok = sents.filter((s) => sentOk(s, mode, where));
    if (new Set(sents.map((s) => s.right)).size !== sents.length) f.push(where + ': two sentences have one answer');
    sents.forEach((s) => { if (!U[mode].has(s.right) || s.wrong) f.push(`${where}: "${s.text}": its answer is no word of the lists`); });
    fillers.forEach((w) => { if (!U[mode].has(w) || sents.some((s) => s.right === w || s.fits.includes(w))) f.push(`${where}: the box word "${w}" fits a sentence or is no word of the lists`); });
    return ok;
  };
  boxCheck('teams', T2.sentences || [], flat(T2.fillers), 'teams');
  // G2-532
  const dw = D2.words || {};
  (D2.pairSentences || []).forEach((s) => { if (sentOk(s, 'diph', 'diph') && !(((dw['oo-moon'] || []).includes(s.right) && (dw['oo-book'] || []).includes(s.wrong)) || ((dw['oo-book'] || []).includes(s.right) && (dw['oo-moon'] || []).includes(s.wrong)))) f.push(`diph: "${s.text}" does not offer an oo word of each sound`); });
  boxCheck('diph', D2.sentences || [], flat(D2.fillers), 'diph');
  (D2.write || []).forEach((w) => { if (!pics[w] || printOnly.has(w) || !U.diph.has(w)) f.push(`diph: "${w}" to write has no picture or is no list word`); });
  (D2.notSort || []).forEach((w) => { if (!SP.diph.oo.includes(w)) f.push(`diph: "${w}" kept out of the oo sort is no oo word`); });
  if (!(D2.oyGap || []).length || (D2.oyGap || []).some((w) => !(SP.diph.oy || []).includes(w))) f.push('diph: no list of the oy words that may stand with a gap');
  // G2-533
  const isNoR = (x, y) => { const at = x.indexOf('ar'); if (at < 0) return false; const h = x.slice(0, at), t = x.slice(at + 2); if (!y.startsWith(h) || !y.endsWith(t) || y.length < h.length + t.length) return false; const mid = y.slice(h.length, y.length - t.length); return mid.length <= 2 && mid !== 'ar' && !/r/.test(mid); };
  (A2.rSentences || []).forEach((s) => { const arW = [s.right, s.wrong].find((x) => (A2.words.ar || []).includes(x)), other = arW === s.right ? s.wrong : s.right; if (sentOk(s, 'aror', 'aror') && (!arW || U.aror.has(other) || !isNoR(arW, other))) f.push(`aror: "${s.text}" does not offer an ar word and the same word without r`); });
  (A2.arorSentences || []).forEach((s) => { const a = [s.right, s.wrong].find((x) => (A2.words.ar || []).includes(x)), o = [s.right, s.wrong].find((x) => (A2.words.or || []).includes(x)); if (sentOk(s, 'aror', 'aror') && (!a || !o || a.replace('ar', 'or') !== o)) f.push(`aror: "${s.text}" does not offer an ar word and the same word with or`); });
  boxCheck('aror', A2.sentences || [], A2.fillers || [], 'aror');
  (A2.match || []).forEach((w) => { if (!pics[w] || !(A2.words.ar || []).includes(w)) f.push(`aror: the pictured word "${w}" has no picture or is no ar word`); ((A2.decoys || {})[w] || []).forEach((x) => { if (U.aror.has(x) || !isNoR(w, x) || (A2.match || []).includes(x)) f.push(`aror: "${x}" is no word that differs from "${w}" only in ar`); }); });
  if ((A2.match || []).filter((w) => ((A2.decoys || {})[w] || []).length).length < 4) f.push('aror: fewer than four pictured ar words have a word without a picture');
  for (const [g, ws] of Object.entries(A2.write || {})) ws.forEach((w) => { if (!pics[w] || printOnly.has(w) || !(A2.words[g] || []).includes(w)) f.push(`aror: "${w}" to write has no picture or is no ${g} word`); });
  // a word to write never starts with the spelling the page teaches (the printed first letter would give half of it away: arm)
  for (const [g, ws] of Object.entries(A2.write || {})) ws.forEach((w) => { if (w.indexOf(g) === 0) f.push(`aror: "${w}" to write starts with ${g}`); });
  // G2-534
  // here, there, where: the letters er without the sound of her (fire, tire, wire, sure say it in American speech)
  (E2.odd || []).forEach((w) => { if (U.erirur.has(w) || !/er|ir|ur/.test(w) || /[iu]re$/.test(w)) f.push(`erirur: the odd word "${w}" is a list word, holds no er, ir, ur, or says the sound of her`); });
  // the keywords of the instruction (her, first, turn) are printed at the top: never a word the child produces or chooses
  const kw = E2.keywords || [];
  if (kw.join() !== 'her,first,turn') f.push('erirur: the keywords of the instruction are not her, first, turn');
  kw.forEach((w) => {
    if ([...(E2.sentences || []), ...(E2.pairSentences || [])].some((s) => s.right === w) || (E2.write || []).includes(w) || (E2.check || {})[w]) f.push(`erirur: the keyword "${w}" is an answer`);
    const er = (SP.erirur.er || []).includes(w);
    [1, 2, 3].forEach((lv) => { if ((er || lv > 1) && !LEVELS.erirur[lv].say.includes(w)) f.push(`erirur level ${lv}: the keyword "${w}" is not kept out of the tasks`); });
  });
  // no word to write with a doubled letter the lesson does not teach (ladder, hammer, pepper)
  (E2.write || []).forEach((w) => { if (/([a-z])\1/.test(w)) f.push(`erirur: "${w}" to write has a doubled letter`); });
  if ((E2.odd || []).length < 3) f.push('erirur: fewer than three odd words');
  for (const [w, wrong] of Object.entries(E2.check || {})) {
    const g = spellingIn('erirur', w, SP.erirur);
    if (!pics[w] || printOnly.has(w) || !g || wrong.length !== 2) { f.push(`erirur: "${w}" to check has no picture, no spelling, or not two wrong spellings`); continue; }
    const at = w.indexOf(g), made = ['er', 'ir', 'ur'].filter((x) => x !== g).map((x) => w.slice(0, at) + x + w.slice(at + 2));
    if (made.slice().sort().join() !== wrong.slice().sort().join() || wrong.some((x) => real.has(x) || bad.has(x) || U.erirur.has(x))) f.push(`erirur: the wrong spellings of "${w}" are not its other two spellings, or one is a real word`);
  }
  if (Object.keys(E2.check || {}).length < 4) f.push('erirur: fewer than four words to check');
  (E2.write || []).forEach((w) => { if (!pics[w] || printOnly.has(w) || !spellingIn('erirur', w, SP.erirur)) f.push(`erirur: "${w}" to write has no picture or no spelling`); });
  (E2.pairSentences || []).forEach((s) => { if (sentOk(s, 'erirur', 'erirur') && (!(SP.erirur.er || []).includes(s.right) || !(SP.erirur.er || []).includes(s.wrong))) f.push(`erirur: "${s.text}" does not offer two er words`); });
  boxCheck('erirur', E2.sentences || [], E2.fillers || [], 'erirur');
  if (f.length) return f;
  // every level can draw its pages: 60 seeded draws a level, none may fail (a draw may start again on its rng; a level
  // counts as a dead end only when 30 tries of one draw fail)
  for (const mode of Object.keys(LEVELS)) for (const lv of [1, 2, 3]) for (let k = 1; k <= 60; k++) {
    try { drawPage(b, mode, lv, makeRng(`g2v-check|${mode}|${lv}|${k}`)); } catch (e) { f.push(`${mode} level ${lv}: a page cannot be drawn (${e.message})`); break; }
  }
  return f;
}

/* ---------------------------------------------------------------- drawing a page (data only) ---------------------------------------------------------------- */
/** n places for a two-way choice (both used, never one place everywhere) */
function twoWay(n, rng) { for (let k = 0; k < 100; k++) { const p = Array.from({ length: n }, () => rng.int(0, 1)); if (n < 2 || new Set(p).size === 2) return p; } return Array.from({ length: n }, (_, i) => i % 2); }
/** a staircase: three or more places that step by one the same way */
const staircase = (idx) => idx.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1));
/** a two-way choice taken in turns (every other one): three or more places that each differ from the one before */
const alternating = (p, m) => m === 2 && p.length >= 3 && p.every((x, i) => !i || x !== p[i - 1]);
/** places among m for n items: every place used where n allows, never a staircase, never every other one, never three alike in a row */
function places(n, m, rng) { for (let k = 0; k < 300; k++) { const p = Array.from({ length: n }, () => rng.int(0, m - 1)); if (new Set(p).size < Math.min(n, m) || staircase(p) || alternating(p, m) || p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) continue; return p; } throw new Error(`no places for ${n} answers among ${m}`); }
/** a word that the article before the gap rules out: "a ___" and a word that starts with a vowel letter, "an ___" and a
 *  word that starts with a consonant letter (the child could reject it without reading the vowel team) */
function articleTell(text, w) {
  const m = /(?:^|[^\p{L}])(an?)\s+_{2,}/iu.exec(String(text));
  if (!m) return false;
  const vowel = /^[aeiou]/i.test(String(w));
  return m[1].toLowerCase() === 'a' ? vowel : !vowel;
}
/** a word box: the answers and the fillers, the answers (in sentence order) at places that are no staircase */
function boxOrder(answers, fillers, rng) { for (let k = 0; k < 300; k++) { const box = shuffle([...answers, ...fillers], rng); if (!staircase(answers.map((w) => box.indexOf(w)))) return box; } throw new Error('no word box without a staircase'); }
/** the words of a sort with the odd word put among them, never first or last */
function oddIn(words, odd, rng) { const all = words.slice(); all.splice(rng.int(1, all.length - 1), 0, { w: odd, col: 'odd' }); return all; }
/** an order of column-tagged words with no three of one column in a row */
function mixed(items, rng) { let o = items; for (let k = 0; k < 300; k++) { o = shuffle(items, rng); if (!o.some((x, i) => i >= 2 && x.col === o[i - 1].col && x.col === o[i - 2].col)) break; } return o; }

/**
 * Draws what a page holds (no html, no pictures): { mode, lv, variant, tasks: [{ kind, ... }], items }. A draw that runs
 * into a dead end (an early task took the words a later one needs) starts again on the same rng; after 30 tries it throws
 * (the load check then reports that the bank cannot fill the level). `b` is a bank (the load check passes its own).
 */
function drawPage(b, mode, lv, rng) {
  let last;
  for (let k = 0; k < 30; k++) { try { return drawOnce(b, mode, lv, rng); } catch (e) { last = e; } }
  throw last;
}
function drawOnce(b, mode, lv, rng) {
  const d = LEVELS[mode][lv];
  const U = unionOf(b, mode);
  const real = new Set(b.real || []), bad = new Set(b.bad || []), frag = new Set(b.badFragments || []);
  const used = new Set(), banned = new Set();
  /** the words of the instruction at the top of the page (its examples) are printed there: no task uses them */
  const say = new Set(d.say || []);
  const seen = (w) => used.has(w) || used.has(stem(w)) || [...used].some((x) => stem(x) === w || stem(x) === stem(w));
  const ok = (w) => !seen(w) && !banned.has(w) && !banned.has(stem(w));
  const use = (...ws) => ws.forEach((w) => used.add(w));
  use(...say);
  const take = (list, n, more = () => true) => { const got = shuffle(list.filter((w) => ok(w) && more(w)), rng).slice(0, n); if (got.length < n) throw new Error(`fewer than ${n} words left of ${list.slice(0, 4).join(', ')}…`); use(...got); return got; };
  /** a sentence can stand on the page: its words are free and nothing that fits it is printed */
  const sentFree = (s) => ok(s.right) && (!s.wrong || ok(s.wrong)) && textWords(s, U).every((w) => ok(w)) && !s.fits.some((w) => seen(w));
  const takeSent = (s) => { use(s.right, ...(s.wrong ? [s.wrong] : []), ...textWords(s, U)); s.fits.forEach((w) => banned.add(w)); return s; };
  /** draws n sentences of a pool so that `good(list)` holds. A sentence of the box (no other word of its own) that is to be
   *  circled takes its other word from `wrongOf(s)`: words that fit no box sentence (the fillers), so it cannot fit either */
  const pickSents = (pool0, n, good = () => true, wrongOf = null) => {
    const pool = pool0.filter((s) => s.text.length <= (d.textMax || 99));   // a level whose sentences must keep one line
    for (let k = 0; k < 400; k++) {
      const got = [], u0 = new Set(used), b0 = new Set(banned);
      for (const s0 of shuffle(pool, rng)) {
        if (got.length === n) break;
        let s = s0;
        // (2026-11-19, found by a unit-check builder) the other word never shows by its article that it does not fit:
        // after "a ___" no word that starts with a vowel ("I eat with a (fork)(art)."), after "an ___" none that starts
        // with a consonant. The same shuffle is drawn and the first word without that tell is taken, so a page that had
        // no tell is drawn as before.
        if (!s.wrong && wrongOf) { const w = shuffle(wrongOf(s).filter((x) => x !== s.right && !s.fits.includes(x) && ok(x)), rng).find((x) => !articleTell(s.text, x)); if (!w) continue; s = { ...s0, wrong: w }; }
        if (sentFree(s) && !got.some((x) => x.right === s.right)) got.push(takeSent(s));
      }
      if (got.length === n && good(got)) return got;
      used.clear(); u0.forEach((w) => used.add(w)); banned.clear(); b0.forEach((w) => banned.add(w));
    }
    throw new Error(`no ${n} sentences fit together`);
  };
  /** n gap words of the offered spellings (each word: no rival, clean fragments); `per` = the spellings to draw */
  const SP = mode === 'diph' ? { oo: [...b.diph.words['oo-moon'], ...b.diph.words['oo-book']], ou: b.diph.words.ou, ow: b.diph.words.ow, oi: b.diph.words.oi, oy: b.diph.words.oy } : mode === 'teams' ? b.teams.words : mode === 'aror' ? b.aror.words : b.erirur.words;
  // the words a gap of a spelling may stand in: ee and ea only in the words a second grader knows by sight (no rule tells the
  // two apart), oy only in boy, toy, joy
  const gapPool = (g) => (mode === 'teams' && (g === 'ee' || g === 'ea') ? SP[g].filter((w) => b.teams.gapE.includes(w)) : mode === 'diph' && g === 'oy' ? SP.oy.filter((w) => b.diph.oyGap.includes(w)) : SP[g]);
  const gapWords = (seq, offered, more = () => true) => seq.map((g) => ({ w: take(gapPool(g), 1, (w) => gapOk(w, g, offered, real, bad, frag) && w.length <= (d.gapMax || 99) && more(w))[0], g }));
  /** the odd word of a sort: never first or last, never a word a sentence of the page prints */
  const oddOf = (list, sents) => take(list, 1, (w) => !sents.some((s) => new RegExp('(^|[^a-z])' + w + '([^a-z]|$)', 'i').test(s.text)))[0];
  const tasks = [];
  let variant = '';

  if (mode === 'shortlong') {
    const P = b.shortlong.pairs, kindOf = (w) => (P.some((p) => p[0] === w) ? 'short' : 'long');
    const pairOf = (w) => P.find((p) => p.includes(w));
    if (lv === 1 || lv === 2) {
      // the pictures first (four pairs: two pictures show the short word, two the long word), then the sentences of other pairs
      if (lv === 1) {
        let shown;
        for (let k = 0; k < 400; k++) { shown = shuffle(b.shortlong.pairPics.filter((w) => pairOf(w).every((x) => ok(x))), rng).slice(0, 4); if (shown.length === 4 && shown.filter((w) => kindOf(w) === 'short').length === 2 && new Set(shown.map((w) => pairOf(w)[0])).size === 4) break; }
        if (!shown || shown.length < 4 || shown.filter((w) => kindOf(w) === 'short').length !== 2) throw new Error('no four pictured pairs (two short, two long)');
        shown.forEach((w) => use(...pairOf(w)));
        const tops = places(4, 2, rng);
        tasks.push({ kind: 'picpair', items: shown.map((w, i) => ({ w, pair: pairOf(w), top: tops[i] })) });
      }
      const n = d.tasks.find((t) => t[0] === 'pillsent')[1];
      const sents = pickSents(b.shortlong.sentences, n, (ss) => ss.some((s) => kindOf(s.right) === 'short') && ss.some((s) => kindOf(s.right) === 'long'));
      const at = places(n, 2, rng);
      const per = d.tasks.find((t) => t[0] === 'sort')[1];
      const lists = lv === 1 ? [b.shortlong.short.simple, b.shortlong.long.simple] : [[...b.shortlong.short.hard, ...b.shortlong.short.simple], [...b.shortlong.long.hard, ...b.shortlong.long.simple]];
      const hardFirst = (list, hard, n) => { if (lv === 1) return take(list, n); const h = take(hard, Math.ceil(n / 2)); return [...h, ...take(list, n - h.length)]; };
      const ss = hardFirst(lists[0], b.shortlong.short.hard, per), ll = hardFirst(lists[1], b.shortlong.long.hard, per);
      tasks.push({ kind: 'sort', cols: ['short', 'long'], words: mixed([...ss.map((w) => ({ w, col: 'short' })), ...ll.map((w) => ({ w, col: 'long' }))], rng) });
      tasks.push({ kind: 'pillsent', items: sents.map((s, i) => ({ ...s, kind: kindOf(s.right), first: at[i] })) });
    } else {
      // the pictures first (a short and a long word, and one more of either kind), then the sentence with its pair, then the
      // sort of what is left with one word that is neither short nor long
      const nW = d.tasks.find((t) => t[0] === 'write')[1];
      const ws = [...take(b.shortlong.write.short, 1), ...take(b.shortlong.write.long, 1)];
      ws.push(...take(rng.int(0, 1) ? b.shortlong.write.short : b.shortlong.write.long, nW - 2));
      const nS = d.tasks.find((t) => t[0] === 'choicewrite')[1];
      const sents = pickSents(b.shortlong.sentences, nS, (ss) => nS < 2 || (ss.some((s) => kindOf(s.right) === 'short') && ss.some((s) => kindOf(s.right) === 'long')));
      const firsts = nS < 2 ? [rng.int(0, 1)] : twoWay(nS, rng);
      const per = d.tasks.find((t) => t[0] === 'sort')[1];
      const short5 = (w) => w.length <= (d.sortMax || 99), ss = take(b.shortlong.short.hard, per, short5), ll = take(b.shortlong.long.hard, per, short5);
      const odd = oddOf(b.shortlong.odd, sents);
      tasks.push({ kind: 'sort', cols: ['short', 'long'], words: oddIn(mixed([...ss.map((w) => ({ w, col: 'short' })), ...ll.map((w) => ({ w, col: 'long' }))], rng), odd, rng), odd });
      tasks.push({ kind: 'write', items: shuffle(ws, rng).map((w) => ({ w })) });
      tasks.push({ kind: 'choicewrite', items: sents.map((s, i) => ({ ...s, kind: kindOf(s.right), first: firsts[i] })) });
    }
  }

  if (mode === 'teams') {
    const TS = b.teams, soundOf = (g) => TS.sound[g], teamsOf = (v) => Object.keys(TS.words).filter((g) => TS.sound[g] === v);
    const sentsOf = (v) => TS.sentences.filter((s) => soundOf(spellingIn('teams', s.right, TS.words)) === v);
    const ruleUse = (vs) => vs.filter((v) => TS.rules[v]).forEach((v) => use(...ruleWords(TS.rules[v], U)));
    const fillerPick = (vs, n) => take(vs.flatMap((v) => TS.fillers[v] || []), n);
    if (lv === 1) {
      const v = ['a', 'e', 'o'][rng.int(0, 2)], [t1, t2] = teamsOf(v);
      variant = v;
      ruleUse([v]);
      // the pictures, then the gaps, then the sentences (one of each team) and their box
      const ws = take(TS.write[v], d.tasks.find((t) => t[0] === 'write')[1]);
      const n = d.tasks.find((t) => t[0] === 'gaps')[1];
      const seq = shuffle([...Array(n / 2).fill(t1), ...Array(n / 2).fill(t2)], rng);
      const gw = gapWords(seq, [t1, t2]);
      const sents = pickSents(sentsOf(v), 2, (ss) => ss.some((s) => TS.words[t1].includes(s.right)) && ss.some((s) => TS.words[t2].includes(s.right)));
      const box = boxOrder(sents.map((s) => s.right), fillerPick([v], 2), rng);
      tasks.push({ kind: 'gaps', offered: [t1, t2], rules: TS.rules[v] ? [TS.rules[v]] : [], items: lineUp(gw, 3, rng) });
      tasks.push({ kind: 'write', items: shuffle(ws, rng).map((w) => ({ w })) });
      tasks.push({ kind: 'boxsent', box, items: sents });
    } else if (lv === 2) {
      const pair = [['a', 'e'], ['a', 'o'], ['e', 'o']][rng.int(0, 2)];
      variant = pair.join('');
      ruleUse(pair);
      const offered = pair.flatMap(teamsOf);
      // the gaps first (each team once, two more), then the sort of two words of every team
      const n = d.tasks.find((t) => t[0] === 'gaps')[1];
      const seq = shuffle([...offered, ...Array.from({ length: n - offered.length }, () => offered[rng.int(0, offered.length - 1)])], rng);
      const gw = gapWords(seq, offered);
      // the sort: three words a sound, both of its teams in every column
      const per = d.tasks.find((t) => t[0] === 'sort')[1];
      const words = pair.flatMap((v) => { const [g1, g2] = teamsOf(v), more = rng.int(0, 1) ? g1 : g2; return [...take(TS.words[g1], 1), ...take(TS.words[g2], 1), ...take(TS.words[more], per - 2)].map((w) => ({ w, col: v })); });
      tasks.push({ kind: 'sort', cols: pair, words: mixed(words, rng) });
      tasks.push({ kind: 'gaps', offered, rules: pair.filter((v) => TS.rules[v]).map((v) => TS.rules[v]), items: lineUp(gw, 3, rng) });
    } else {
      ruleUse(['a', 'o']);
      const offered = Object.keys(TS.words);
      const ws = ['a', 'e', 'o'].map((v) => take(TS.write[v], 1)[0]);
      // the teams of the gaps drawn one by one (a team may come twice, so the last gap is never found by leaving it for last):
      // four teams or more, and a long a and a long o, so both rules are needed
      const n = d.tasks.find((t) => t[0] === 'gaps')[1];
      let seq = [];
      for (let k = 0; k < 300; k++) { seq = Array.from({ length: n }, () => offered[rng.int(0, offered.length - 1)]); if (new Set(seq).size >= 4 && seq.some((g) => soundOf(g) === 'a') && seq.some((g) => soundOf(g) === 'o')) break; }
      if (new Set(seq).size < 4) throw new Error('no six gaps of four teams or more');
      const gw = gapWords(seq, offered);
      const s1 = pickSents(TS.sentences, 2, (ss) => soundOf(spellingIn('teams', ss[0].right, TS.words)) !== soundOf(spellingIn('teams', ss[1].right, TS.words)));
      const box = boxOrder(s1.map((s) => s.right), fillerPick(['a', 'e', 'o'], 2), rng);
      tasks.push({ kind: 'gaps', offered, rules: [TS.rules.a, TS.rules.o], items: lineUp(gw, 3, rng) });
      tasks.push({ kind: 'write', items: shuffle(ws, rng).map((w) => ({ w })) });
      tasks.push({ kind: 'boxsent', box, items: s1 });
    }
  }

  if (mode === 'diph') {
    const DW = b.diph.words, R = b.diph.rules;
    const ruleUse = (ks) => ks.forEach((k) => use(...ruleWords(R[k], U)));
    if (lv === 1) {
      use('moon', 'book');   // the heads of the sort
      const n = d.tasks.find((t) => t[0] === 'pillsent')[1];
      const ooBox = b.diph.sentences.filter((s) => DW['oo-moon'].includes(s.right) || DW['oo-book'].includes(s.right));
      const sents = pickSents([...b.diph.pairSentences, ...ooBox], n, (ss) => ss.some((s) => DW['oo-moon'].includes(s.right)) && ss.some((s) => DW['oo-book'].includes(s.right)), (s) => b.diph.fillers[DW['oo-moon'].includes(s.right) ? 'oo-book' : 'oo-moon'] || []);
      const at = places(n, 2, rng);
      const per = d.tasks.find((t) => t[0] === 'sort')[1];
      // never a word whose oo many say the other way (hoop)
      const sortable = (w) => !b.diph.notSort.includes(w);
      const words = [...take(DW['oo-moon'], per, sortable).map((w) => ({ w, col: 'oo-moon' })), ...take(DW['oo-book'], per, sortable).map((w) => ({ w, col: 'oo-book' }))];
      tasks.push({ kind: 'sort', cols: ['oo-moon', 'oo-book'], words: mixed(words, rng) });
      tasks.push({ kind: 'pillsent', items: sents.map((s, i) => ({ ...s, kind: DW['oo-moon'].includes(s.right) ? 'oo-moon' : 'oo-book', first: at[i] })) });
    } else if (lv === 2) {
      ruleUse(['ou', 'oi']);
      const offered = ['ou', 'ow', 'oi', 'oy'];
      // the gaps in two rows: ou or ow (three words, both spellings), then oi or oy (three words, both spellings); the two
      // sounds are mixed only in the sort
      const row = (a, c) => shuffle([a, c, [a, c][rng.int(0, 1)]], rng);
      const groups = [['ou', 'ow'], ['oi', 'oy']].map(([a, c]) => ({ offered: [a, c], items: gapWords(row(a, c), [a, c]) }));
      const per = d.tasks.find((t) => t[0] === 'sort')[1];
      // the sort by sound: the sound of cow (ou, ow) and the sound of boy (oi, oy); oy words are few, so at most one
      const cow = shuffle([...take(DW.ou, 2), ...take(DW.ow, per - 2)], rng), boy = [...take(DW.oi, per - 1), ...take(DW.oy, 1)];
      tasks.push({ kind: 'gaps', offered, rules: [R.ou, R.oi], groups, items: groups.flatMap((g) => g.items) });
      tasks.push({ kind: 'sort', cols: ['cow', 'boy'], words: mixed([...cow.map((w) => ({ w, col: 'cow' })), ...boy.map((w) => ({ w, col: 'boy' }))], rng) });
    } else {
      ruleUse(['ou', 'oi']);
      const offered = ['oo', 'ou', 'ow', 'oi', 'oy'];
      let ws;
      for (let k = 0; k < 200; k++) { const pool = b.diph.write.filter((w) => ok(w)); ws = shuffle(pool, rng).slice(0, 3); if (new Set(ws.map((w) => spellingIn('diph', w, SP))).size >= 2) break; }
      if (!ws || ws.length < 3) throw new Error('no three pictures to write');
      use(...ws);
      // oo, ou, ow, oi and two more of any spelling (an oy gap is not needed on every copy: the box sentences hold oy words)
      const gw = gapWords(shuffle(['oo', 'ou', 'ow', 'oi', ...Array.from({ length: 2 }, () => offered[rng.int(0, offered.length - 1)])], rng), offered);
      const sents = pickSents(b.diph.sentences, 2, (ss) => spellingIn('diph', ss[0].right, SP) !== spellingIn('diph', ss[1].right, SP));
      const box = boxOrder(sents.map((s) => s.right), take(flat(b.diph.fillers), 2), rng);
      tasks.push({ kind: 'gaps', offered, rules: [R.ou, R.oi], items: lineUp(gw, 3, rng) });
      tasks.push({ kind: 'write', items: ws.map((w) => ({ w })) });
      tasks.push({ kind: 'boxsent', box, items: sents });
    }
  }

  if (mode === 'aror') {
    const A = b.aror;
    if (lv === 1) {
      // four pictured ar words, two printed words without a picture; then the gaps; then the sentences
      // the sentences first (an ar word right, and a word without r right); then the match: the draw that leaves the fewest
      // pictured words alone with their first letter (ruling 9: the match cannot be done by first letters)
      const n = d.tasks.find((t) => t[0] === 'pillsent')[1];
      const sents = pickSents(A.rSentences, n, (ss) => ss.some((s) => A.words.ar.includes(s.right)) && ss.some((s) => !A.words.ar.includes(s.right)));
      const at = places(n, 2, rng);
      let pics4, dec, best = null, bestScore = -1;
      for (let k = 0; k < 400; k++) {
        pics4 = shuffle(A.match.filter((w) => ok(w)), rng).slice(0, 4);
        const withD = shuffle(pics4.filter((w) => (A.decoys[w] || []).some((x) => ok(x))), rng).slice(0, 2);
        dec = withD.map((w) => ({ w: shuffle(A.decoys[w].filter((x) => ok(x) && !pics4.includes(x)), rng)[0], of: w }));
        if (pics4.length !== 4 || dec.length !== 2 || !dec.every((x) => x.w) || dec[0].w === dec[1].w) continue;
        const left = [...pics4, ...dec.map((x) => x.w)], score = pics4.filter((w) => left.some((x) => x !== w && x[0] === w[0])).length;
        if (score > bestScore) { best = { pics4, dec }; bestScore = score; }
        if (score === 4) break;
      }
      if (!best) throw new Error('no four pictures with two words without a picture');
      ({ pics4, dec } = best);
      use(...pics4, ...dec.map((x) => x.w));
      const m = matchLayout(pics4, dec, d, rng);
      const ex = take(A.words.ar, 1, (w) => gapOk(w, 'ar', ['ar'], real, bad, frag))[0];
      const gw = gapWords(Array(d.tasks.find((t) => t[0] === 'gaps')[1]).fill('ar'), ['ar']);
      tasks.push({ kind: 'match', ...m });
      tasks.push({ kind: 'gaps', offered: ['ar'], rules: [], example: { w: ex, g: 'ar' }, items: gw });
      tasks.push({ kind: 'pillsent', items: sents.map((s, i) => ({ ...s, kind: A.words.ar.includes(s.right) ? 'r' : 'no-r', first: at[i] })) });
    } else if (lv === 2) {
      const n = d.tasks.find((t) => t[0] === 'pillsent')[1];
      const sents = pickSents([...A.arorSentences, ...A.sentences], n, (ss) => ss.some((s) => A.words.ar.includes(s.right)) && ss.some((s) => A.words.or.includes(s.right)), (s) => A.fillers.filter((w) => !A.words[A.words.ar.includes(s.right) ? 'ar' : 'or'].includes(w)));
      const at = places(n, 2, rng);
      const per = d.tasks.find((t) => t[0] === 'sort')[1];
      const words = [...take(A.words.ar, per).map((w) => ({ w, col: 'ar' })), ...take(A.words.or, per).map((w) => ({ w, col: 'or' }))];
      tasks.push({ kind: 'sort', cols: ['ar', 'or'], words: mixed(words, rng) });
      tasks.push({ kind: 'pillsent', items: sents.map((s, i) => ({ ...s, kind: A.words.ar.includes(s.right) ? 'ar' : 'or', first: at[i] })) });
    } else {
      const nW = d.tasks.find((t) => t[0] === 'write')[1];
      const ws = shuffle([...take(A.write.or, 1), ...take(A.write.ar, 1), ...take([...A.write.ar, ...A.write.or], nW - 2)], rng);
      const gw = gapWords(shuffle(['ar', 'ar', 'ar', 'or', 'or', 'or'], rng), ['ar', 'or']);
      const n = d.tasks.find((t) => t[0] === 'boxsent')[1];
      const sents = pickSents(A.sentences, n, (ss) => ss.some((s) => A.words.ar.includes(s.right)) && ss.some((s) => A.words.or.includes(s.right)));
      const box = boxOrder(sents.map((s) => s.right), take(A.fillers, 2), rng);
      tasks.push({ kind: 'write', items: ws.map((w) => ({ w })) });
      tasks.push({ kind: 'gaps', offered: ['ar', 'or'], rules: [], items: lineUp(gw, 3, rng) });
      tasks.push({ kind: 'boxsent', box, items: sents });
    }
  }

  if (mode === 'erirur') {
    const E = b.erirur;
    // the sorts (levels 2 and 3) hold one-syllable words only: a two-syllable word that ends in er (sister) is no er word to
    // sort beside bird and fur
    const oneSyl = (w) => VOWEL_GROUPS(w.replace(/e$/, '')) === 1;
    if (lv === 1) {
      // the pictures of er words first (ladder, hammer...), then the gaps, then the sentences (er words) and their box
      const ws = take(E.write.filter((w) => E.words.er.includes(w)), d.tasks.find((t) => t[0] === 'write')[1]);
      const ex = take(E.words.er, 1, (w) => gapOk(w, 'er', ['er'], real, bad, frag) && w.length <= (d.gapMax || 99))[0];
      const gw = gapWords(Array(d.tasks.find((t) => t[0] === 'gaps')[1]).fill('er'), ['er']);
      const erSents = [...E.sentences, ...E.pairSentences.map((s) => ({ ...s, wrong: null }))].filter((s) => E.words.er.includes(s.right));
      const bs = pickSents(erSents, 2);
      const box = boxOrder(bs.map((s) => s.right), take(E.fillers.filter((w) => E.words.er.includes(w)), 2), rng);
      tasks.push({ kind: 'gaps', offered: ['er'], rules: [], example: { w: ex, g: 'er' }, items: gw });
      tasks.push({ kind: 'write', items: shuffle(ws, rng).map((w) => ({ w })) });
      tasks.push({ kind: 'boxsent', box, items: bs });
    } else if (lv === 2) {
      const n = d.tasks.find((t) => t[0] === 'check')[1];
      const cw = take(Object.keys(E.check), n);
      const at = places(n, 3, rng);
      const per = d.tasks.find((t) => t[0] === 'sort')[1];
      const words = ['er', 'ir', 'ur'].flatMap((g) => take(E.words[g], per, oneSyl).map((w) => ({ w, col: g })));
      tasks.push({ kind: 'sort', cols: ['er', 'ir', 'ur'], words: mixed(words, rng) });
      tasks.push({ kind: 'check', items: cw.map((w, i) => { const wrong = shuffle(E.check[w], rng); const opts = wrong.slice(); opts.splice(at[i], 0, w); return { w, opts }; }) });
    } else {
      let ws;
      for (let k = 0; k < 200; k++) { ws = shuffle(E.write.filter((w) => ok(w) && w.length <= (d.wmax || 99)), rng).slice(0, 3); if (ws.length === 3 && new Set(ws.map((w) => spellingIn('erirur', w, E.words))).size >= 2) break; }
      if (!ws || ws.length < 3) throw new Error('no three pictures to write');
      use(...ws);
      // two sentences of two spellings, each shown with one other word (its er pair word, or a word that fits no sentence)
      const bs = pickSents([...E.sentences, ...E.pairSentences], 2, (ss) => spellingIn('erirur', ss[0].right, E.words) !== spellingIn('erirur', ss[1].right, E.words), () => E.fillers);
      const firsts = twoWay(2, rng);
      const odd = oddOf(E.odd, bs);
      const per = d.tasks.find((t) => t[0] === 'sort')[1];
      const words = ['er', 'ir', 'ur'].flatMap((g) => take(E.words[g], per, (w) => oneSyl(w) && w.length <= (d.sortMax || 99)).map((w) => ({ w, col: g })));
      tasks.push({ kind: 'sort', cols: ['er', 'ir', 'ur'], words: oddIn(mixed(words, rng), odd, rng), odd });
      tasks.push({ kind: 'write', items: ws.map((w) => ({ w, cue: spellingIn('erirur', w, E.words) })) });
      tasks.push({ kind: 'choicewrite', items: bs.map((s, i) => ({ ...s, kind: spellingIn('erirur', s.right, E.words), first: firsts[i] })) });
    }
  }

  const items = [];
  for (const t of tasks) {
    if (t.kind === 'picpair') items.push(...t.items.flatMap((x) => ['pic:' + x.w, 'other:' + x.pair.find((y) => y !== x.w)]));
    if (t.kind === 'sort') items.push(...t.words.map((x) => (x.col === 'odd' ? 'odd:' : 'sort:') + x.w));
    if (t.kind === 'pillsent' || t.kind === 'choicewrite') items.push(...t.items.flatMap((s) => ['sent:' + s.right, 'other:' + s.wrong]));
    if (t.kind === 'boxsent') items.push(...t.items.map((s) => 'box:' + s.right), ...t.box.filter((w) => !t.items.some((s) => s.right === w)).map((w) => 'fill:' + w));
    if (t.kind === 'gaps') items.push(...(t.example ? ['ex:' + t.example.w] : []), ...t.items.map((x) => 'gap:' + x.w));
    if (t.kind === 'write') items.push(...t.items.map((x) => 'write:' + x.w));
    if (t.kind === 'match') items.push(...t.rows.map((r) => (r.pic ? 'pic:' : 'no-pic:') + r.w));
    if (t.kind === 'check') items.push(...t.items.map((x) => 'check:' + x.w));   // the two wrong spellings are no words
  }
  return { mode, lv, variant, tasks, items };
}
/** gap words laid out in rows of `cols`: no row and no column all one spelling where it holds three or more */
function lineUp(gw, cols, rng) {
  const lines = (n) => { const out = []; for (let i = 0; i < n; i += cols) out.push([...Array(Math.min(cols, n - i)).keys()].map((j) => i + j)); for (let j = 0; j < cols; j++) out.push([...Array(n).keys()].filter((i) => i % cols === j)); return out; };
  let o = gw;
  for (let k = 0; k < 300; k++) { o = shuffle(gw, rng); if (!lines(o.length).some((ix) => ix.length >= 3 && ix.every((i) => o[i].g === o[ix[0]].g))) break; }
  return o;
}
/** six rows of words (four pictured, two not), four rows of pictures: none straight across, not all one distance away */
function matchLayout(pics4, dec, d, rng) {
  const Hw = d.mrow, G = d.mgap, n6 = pics4.length + dec.length, Hp = Math.floor((n6 * Hw + (n6 - 1) * G - (pics4.length - 1) * G) / pics4.length);
  const yw = (i) => i * (Hw + G) + Hw / 2, yp = (j) => j * (Hp + G) + Hp / 2;
  let rows, perm;
  for (let k = 0; k < 500; k++) {
    rows = shuffle([...pics4.map((w) => ({ w, pic: true })), ...dec.map((x) => ({ w: x.w, of: x.of, pic: false }))], rng);
    const di = rows.map((r, i) => (r.pic ? -1 : i)).filter((i) => i >= 0);
    if (Math.abs(di[0] - di[1]) === 1) continue;
    perm = shuffle([...pics4.keys()], rng);
    const off = pics4.map((w, s) => yp(perm.indexOf(s)) - yw(rows.findIndex((r) => r.w === w)));
    if (off.every((o) => Math.abs(o) >= 18) && new Set(off.map((o) => Math.round(o / 10))).size > 1) break;
  }
  return { rows, pics: perm.map((s) => pics4[s]), Hw, Hp, G };
}

{ const f = g2VowelFaultsOf(BANK); if (f.length) throw new Error('vowels-g2.en.json: ' + f.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
/** A child reads typographic apostrophes and quotation marks: every straight ' and " in the TEXT of a page or a key
 *  (never in a tag or an attribute) is turned here, once, for all types of this factory (2026-11-17: published pages
 *  printed straight ones). The bank and the data attributes keep straight ones; verify() straightens what it reads. */
function typo(html) {
  let out = '', i = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += text.replace(/'/g, '\u2019').replace(/"/g, (m, k, s) => (k === 0 || /[\s([]/.test(s[k - 1]) ? '\u201C' : '\u201D'));
    i = j < 0 ? html.length : j;
  }
  return out;
}
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks
/** In this font an f before i, f, l, or t and a t before t touch the next letter even with ligatures off (fi, fl, ff, ft in
 *  after, tt in letter): every such printed f or t gets a little room of its own. Text inside tags, <svg> and <style> is
 *  left alone. */
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
const img = (w, size) => `<img class="ws-icon" data-lcs-pic="${esc(w)}" src="${fileUri(PICS[w][0], PICS[w][1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const cream = (attrs, inner, pad = 8, gap = 6) => `<div ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0">${inner}</div>`;
const label = (html, px = 20) => `<div data-lcs-label data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
const orList = (xs) => (xs.length === 2 ? `${teal(xs[0])} or ${teal(xs[1])}` : xs.slice(0, -1).map(teal).join(', ') + `, or ${teal(xs[xs.length - 1])}`);
/** a word to circle (the key rings the right one) */
const pill = (text, ok, key, font, kind) => `<span data-lcs-pill data-lcs-word="${esc(text)}"${ok ? ' data-lcs-ok="1"' : ''}${kind ? ` data-lcs-kind="${kind}"` : ''} style="flex:0 0 auto;font:800 ${font}px/1.15 'Nunito',sans-serif;color:${T.ink};padding:2px 12px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
/** a place to write letters into a printed word: 96 px for two letters, 60 px for one; the key prints them in teal, a worked
 *  example prints them in grey on every page */
const gapBox = (g, key, font, example, tight) => `<span data-lcs-gap="${g}"${example ? ' data-lcs-example-gap="1"' : ''} style="display:inline-block;width:${g.length === 1 ? GAP1 : GAP2}px;height:${Math.round(font * 1.15)}px;margin:0 ${tight ? 0 : 3}px 0 3px;border-bottom:3.5px solid ${example ? T.inkSoft : T.ink};text-align:center;color:${example ? T.inkSoft : T.teal};font:800 ${font}px/1.1 'Nunito',sans-serif">${key || example ? g : ''}</span>`;
const gapWord = (w, g, key, font, example = false) => { const at = w.indexOf(g); return `<span data-lcs-gapword="${w}"${example ? ' data-lcs-example="1"' : ''} data-lcs-read style="display:inline-flex;align-items:flex-end;font:800 ${font}px/1.1 'Nunito',sans-serif;color:${example ? T.inkSoft : T.ink}">${esc(w.slice(0, at))}${gapBox(g, key, font, example, at + g.length === w.length)}${esc(w.slice(at + g.length))}</span>`; };
const chip = (text, attr, font = 22, strike = false, padX = 14) => `<span ${attr} style="font:800 ${font}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px ${padX}px;border-radius:999px;background:#FFFFFF;border:2px solid ${T.teal}${strike ? `;text-decoration:line-through;text-decoration-color:${T.teal};text-decoration-thickness:4px` : ''}">${esc(text)}</span>`;
/** a sort column head: a filled teal bar with white letters (never a chip like the words to sort) */
const headBar = (html, key) => `<div data-lcs-colhead="${key}" style="background:${T.teal};color:#FFFFFF;border-radius:8px;text-align:center;font:800 21px/1.4 'Nunito',sans-serif;padding:1px 6px;white-space:nowrap">${html}</div>`;
/** a sentence split at its blank; punctuation right after the blank stays with the word (no space before a period) */
const splitAt = (text) => { const [a, b] = text.split('___'); const m = b.match(/^[.!?,]+/); return { a: a.trim(), tail: m ? m[0] : '', b: (m ? b.slice(m[0].length) : b).trim() }; };
/** the heads of the sort columns */
const HEADS = {
  short: 'short vowel <span style="letter-spacing:2px">ă ĕ ĭ ŏ ŭ</span>', long: 'long vowel <span style="letter-spacing:2px">ā ē ī ō ū</span>',
  a: 'long a', e: 'long e', o: 'long o', 'oo-moon': 'oo as in moon', 'oo-book': 'oo as in book', cow: 'the sound in cow', boy: 'the sound in boy',
  ar: 'ar', or: 'or', er: 'er', ir: 'ir', ur: 'ur',
};
const SORT_LINE = {
  shortlong: 'Read each word. Write it under short vowel or long vowel.', teams: 'Read each word. Write it under its vowel sound.',
  diph1: `Read each word. Is its ${teal('oo')} the sound in moon or in book? Write it there.`, diph2: `Read each word. Write it under the sound of its vowel team.`,
  aror: `Read each word out loud. Write it under ${teal('ar')} or ${teal('or')}.`, erirur: `Read each word. Write it under ${orList(['er', 'ir', 'ur'])}.`,
};

/* ---------------------------------------------------------------- the blocks ---------------------------------------------------------------- */
function renderTask(t, k, mode, lv, d, key, inner) {
  if (t.kind === 'picpair') {
    return cream(`data-lcs-task="picpair"`, label(`${num(k)}Circle the word for each picture.`) +
      `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px 22px;padding:0 6px">` + t.items.map((x) => {
        const [s, l] = x.pair, two = [[x.w, true], [x.w === s ? l : s, false]]; if (!x.top) two.reverse();
        return `<div data-lcs-picpair="${x.w}" data-lcs-pair="${s}|${l}" style="display:flex;flex-direction:column;align-items:center;gap:6px">${img(x.w, d.pic)}<div data-lcs-stack style="display:flex;flex-direction:column;align-items:center;gap:5px">${two.map(([w, ok]) => pill(w, ok, key, d.pill, w === s ? 'short' : 'long')).join('')}</div></div>`;
      }).join('') + `</div>`, d.pad, d.cgap);
  }
  if (t.kind === 'sort') {
    const cols = t.cols, per = t.words.filter((x) => x.col !== 'odd').length / cols.length;
    const text = !t.odd ? SORT_LINE[mode === 'diph' ? 'diph' + lv : mode]
      : mode === 'shortlong' ? 'Read the words. One word is not short or long. Cross it out. Write the others under short vowel or long vowel.'
        : `Read the words. Cross out the word that does not say the sound in her. Write the others under ${orList(['er', 'ir', 'ur'])}.`;
    const colW = Math.floor((inner - 16 * (cols.length - 1)) / cols.length);
    return cream('data-lcs-task="sort"', label(`${num(k)}${text}${t.odd ? '' : ' Cross out each word when you write it.'}`) +
      `<div data-lcs-bank style="display:flex;flex-wrap:wrap;justify-content:center;gap:7px 10px;margin:2px 0 4px">${t.words.map((x) => chip(x.w, `data-lcs-bankword="${x.w}" data-lcs-col="${x.col}"${x.col === 'odd' ? ' data-lcs-odd="1"' : ''}`, d.chip, key && x.col === 'odd', d.chipPad || 14)).join('')}</div>` +
      // the key says the sort may be written in any order; the line is kept on the child's page too (empty), so the page and
      // its key have one height
      `<div ${key ? 'data-lcs-anyorder ' : ''}style="height:16px;margin-top:-4px;text-align:right;font:700 14px/16px 'Nunito',sans-serif;color:${T.teal}">${key ? 'any order' : ''}</div>` +
      `<div style="display:grid;grid-template-columns:repeat(${cols.length},1fr);gap:4px 16px">` + cols.map((c) => `<div data-lcs-column="${c}" style="display:flex;flex-direction:column;gap:2px">${headBar(HEADS[c], c)}${t.words.filter((x) => x.col === c).map((x) => line({ w: colW, h: ROW, answer: key ? x.w : null, sample: true })).join('')}</div>`).join('') + `</div>`, d.pad, d.cgap);
  }
  if (t.kind === 'pillsent') {
    return cream('data-lcs-task="pillsent"', label(`${num(k)}Read the sentence. Circle the word that fits.`) + t.items.map((s) => {
      const two = [[s.right, true], [s.wrong, false]]; if (s.first) two.reverse();
      const { a, tail, b: b2 } = splitAt(s.text);
      // a period after the last word stands outside its pill, tight to it (on the page and on the key alike)
      return `<div data-lcs-sentence="${s.right}" data-lcs-wrong="${s.wrong}" data-lcs-kind="${s.kind}" data-lcs-text="${esc(s.text)}" data-lcs-read style="display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;font:700 ${d.sfont}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:${d.spad == null ? 4 : d.spad}px 0 ${d.spad == null ? 4 : d.spad}px 18px">${a ? `<span>${esc(a)}</span>` : ''}<span style="display:inline-flex;align-items:center"><span data-lcs-pills style="display:inline-flex;align-items:center;gap:4px">${two.map(([w, ok]) => pill(w, ok, key, d.pill)).join('')}</span>${tail ? `<span data-lcs-tail style="margin-left:1px">${esc(tail)}</span>` : ''}</span>${b2 ? `<span>${esc(b2)}</span>` : ''}</div>`;
    }).join(''), d.pad, d.cgap);
  }
  if (t.kind === 'gaps') {
    const many = t.offered.length > 1;
    // long e (ee, ea): no rule tells the two apart, so the line says what to do (review 2026-11-17)
    const text = t.groups ? 'Read each rule. Write the letters that make a word.'
      : !many ? `Write ${teal(t.offered[0])} in each word. Read your new words to a partner.`
        : mode === 'teams' && lv === 1 && !t.rules.length ? `${teal(t.offered[0])} and ${teal(t.offered[1])} say the same sound. Write the one that looks right.`
          : t.rules.length ? `Read the rule${t.rules.length > 1 ? 's' : ''}. Write ${orList(t.offered)} to make a word. Then read the word.`
            : `Write ${orList(t.offered)} to make a word. Then read the word.`;
    const ruleBox = (r) => `<div data-lcs-rule data-lcs-read style="padding:3px 12px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF;font:700 19px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r)}</div>`;
    const grid = (items, ex) => { const cells = [...(ex ? [gapWord(ex.w, ex.g, key, d.gfont, true)] : []), ...items.map((x) => gapWord(x.w, x.g, key, d.gfont))];
      return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:${d.grow || 22}px 10px;justify-items:center;align-items:end;padding:${t.groups ? '2px 0 2px' : '8px 0 6px'}">${cells.map((c) => `<div data-lcs-gapcell>${c}</div>`).join('')}</div>`; };
    // G2-532 level 2: a row of ou or ow and a row of oi or oy, each with its own rule and its own line
    const body = t.groups ? t.groups.map((g, i) => `<div data-lcs-gapgroup data-lcs-offered="${g.offered.join(',')}" style="display:flex;flex-direction:column;gap:4px">${ruleBox(t.rules[i])}<div data-lcs-grouplabel data-lcs-read style="font:700 20px/1.25 'Nunito',sans-serif;color:${T.ink};padding-left:4px">Write ${orList(g.offered)}.</div>${grid(g.items)}</div>`).join('')
      : t.rules.map(ruleBox).join('') + grid(t.items, t.example);
    return cream(`data-lcs-task="gaps" data-lcs-offered="${t.offered.join(',')}"`, label(`${num(k)}${text}`) + body, d.pad, d.cgap);
  }
  if (t.kind === 'write') {
    const n = t.items.length, cw = Math.floor((inner - 12 * (n - 1)) / n);
    const cued = t.items.some((x) => x.cue);
    // G2-534 level 3: the box beside each picture shows er, ir, ur; the child circles the right letters (the key rings them)
    const cueBox = (x) => `<span data-lcs-cuebox style="display:inline-flex;flex-direction:column;align-items:center;gap:0;padding:1px 4px;border:2.5px dashed ${T.teal};border-radius:10px;background:#FFFFFF">${['er', 'ir', 'ur'].map((g) => `<span data-lcs-cueopt="${g}"${g === x.cue ? ' data-lcs-ok="1"' : ''} style="font:800 20px/1 'Nunito',sans-serif;color:${T.ink};padding:1px 8px;border:2.5px solid ${key && g === x.cue ? T.teal : 'transparent'};border-radius:999px">${g}</span>`).join('')}</span>`;
    return cream('data-lcs-task="write"', label(`${num(k)}${cued ? 'Circle the right letters in the box. Then write the word.' : 'Write the word for each picture.'}`) +
      `<div style="display:grid;grid-template-columns:repeat(${n},1fr);gap:12px">` + t.items.map((x) => `<div data-lcs-write="${x.w}"${x.cue ? ` data-lcs-cue="${x.cue}"` : ''} style="display:flex;flex-direction:column;align-items:center;gap:3px"><div style="display:flex;align-items:center;gap:10px">${img(x.w, d.wpic)}${x.cue ? cueBox(x) : ''}</div>${line({ w: cw, h: ROW, starter: x.w[0], answer: key ? x.w : null })}</div>`).join('') + `</div>`, d.pad, d.cgap);
  }
  if (t.kind === 'boxsent' || t.kind === 'choicewrite') {
    const pb = Math.round(ROW * 0.2);
    const head = t.kind === 'boxsent' ? `Finish each sentence with a word from the box.` : `Read the sentence. Write the word that fits on the line.`;
    const box = t.kind === 'boxsent' ? `<div data-lcs-wordbox style="display:flex;justify-content:center;gap:12px;padding:5px 10px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF">${t.box.map((w) => chip(w, `data-lcs-boxword="${w}"`, 21)).join('')}</div>` : '';
    return cream(`data-lcs-task="${t.kind}"`, label(`${num(k)}${head}`) + box + `<div style="display:flex;flex-direction:column;gap:2px">` + t.items.map((s) => {
      const { a, tail, b: b2 } = splitAt(s.text);
      const two = t.kind === 'choicewrite' ? (s.first ? [s.wrong, s.right] : [s.right, s.wrong]) : null;
      // the two words to choose from, stacked one above the other after the sentence (the sentence keeps one line)
      const choice = two ? `<span data-lcs-choices style="display:inline-flex;flex-direction:column;align-items:flex-start;gap:3px;padding-bottom:2px;margin-left:12px">${two.map((w) => chip(w, `data-lcs-choiceword="${w}"`, 20, false, 10)).join('')}</span>` : '';
      return `<div data-lcs-cloze="${s.right}"${s.wrong ? ` data-lcs-wrong="${s.wrong}"` : ''} data-lcs-text="${esc(s.text)}" data-lcs-read style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:2px 8px;font:700 ${d.sfont}px/1.3 'Nunito',sans-serif;color:${T.ink}">${a ? `<span style="padding-bottom:${pb}px">${esc(a)}</span>` : ''}<span data-lcs-blankgroup style="display:inline-flex;align-items:flex-end">${line({ w: 180, h: ROW, answer: key ? s.right : null })}${tail ? `<span data-lcs-tail style="padding-bottom:${pb}px">${esc(tail)}</span>` : ''}</span>${b2 ? `<span style="padding-bottom:${pb}px">${esc(b2)}</span>` : ''}${choice}</div>`;
    }).join('') + `</div>`, d.pad, d.cgap);
  }
  if (t.kind === 'match') {
    const { rows, pics, Hw, Hp, G } = t, n6 = rows.length;
    const yw = (i) => i * (Hw + G) + Hw / 2, yp = (j) => j * (Hp + G) + Hp / 2, LW = 200, GW = 170, RW = 130, Htot = n6 * Hw + (n6 - 1) * G;
    const lines = key ? rows.map((r, i) => (r.pic ? `<line data-lcs-keyline="${i}-${pics.indexOf(r.w)}" x1="7" y1="${yw(i)}" x2="${GW - 7}" y2="${yp(pics.indexOf(r.w))}" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>` : '')).join('') : '';
    const dots = rows.map((_, i) => `<circle cx="7" cy="${yw(i)}" r="7" fill="${T.ink}"/>`).join('') + pics.map((_, j) => `<circle cx="${GW - 7}" cy="${yp(j)}" r="7" fill="${T.ink}"/>`).join('');
    return cream('data-lcs-task="match"', label(`${num(k)}Read each word. Draw a line to its picture. Two words have no picture.`) +
      `<div data-lcs-match="${n6}" style="display:grid;grid-template-columns:${LW}px ${GW}px ${RW}px;justify-content:center;align-items:start;padding:4px 0">` +
      `<div style="display:flex;flex-direction:column;gap:${G}px">${rows.map((r, i) => `<div data-lcs-mword="${i}" data-lcs-word="${r.w}"${r.pic ? '' : ` data-lcs-decoy="${r.of}"`} data-lcs-read style="height:${Hw}px;box-sizing:border-box;display:flex;align-items:center;justify-content:flex-end;padding-right:16px;font:800 ${d.mfont}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(r.w)}</div>`).join('')}</div>` +
      `<svg data-lcs-gutter width="${GW}" height="${Htot}" viewBox="0 0 ${GW} ${Htot}" style="display:block">${lines}${dots}</svg>` +
      `<div style="display:flex;flex-direction:column;gap:${G}px">${pics.map((w) => `<div data-lcs-mpic="${w}" style="height:${Hp}px;box-sizing:border-box;display:flex;align-items:center;padding-left:16px">${img(w, d.mpic)}</div>`).join('')}</div></div>`, d.pad, d.cgap);
  }
  if (t.kind === 'check') {
    return cream('data-lcs-task="check"', label(`${num(k)}Say the word for each picture. Circle the word that is spelled right.`) +
      `<div style="display:grid;grid-template-columns:repeat(${t.items.length},1fr);gap:6px 18px;padding:0 6px">` + t.items.map((x) => `<div data-lcs-check="${x.w}" style="display:flex;flex-direction:column;align-items:center;gap:6px">${img(x.w, d.pic)}<div data-lcs-stack style="display:flex;flex-direction:column;align-items:center;gap:5px">${x.opts.map((o) => pill(o, o === x.w, key, d.pill)).join('')}</div></div>`).join('') + `</div>`, d.pad, d.cgap);
  }
  throw new Error('vowels-g2: no block for ' + t.kind);
}

/** what verify() needs to know of the bank, per mode */
function infoOf(mode) {
  const sentPools = { shortlong: SL.sentences, teams: TM.sentences, diph: [...DI.pairSentences, ...DI.sentences], aror: [...AO.rSentences, ...AO.arorSentences, ...AO.sentences], erirur: [...EI.pairSentences, ...EI.sentences] }[mode];
  const sents = {}; for (const s of sentPools) sents[s.text] = { right: s.right, wrong: s.wrong || null, fits: s.fits };
  return {
    mode, union: [...UNION[mode]], sents, real: BANK.real, bad: BANK.bad, printOnly: BANK.printOnly,
    spell: mode === 'shortlong' ? null : SPELL[mode], sound: TM.sound, pairs: SL.pairs || [], decoys: AO.decoys || {}, check: EI.check || {}, odd: (mode === 'shortlong' ? SL.odd : EI.odd) || [],
    gapE: TM.gapE || [], oyGap: DI.oyGap || [], notSort: DI.notSort || [],
    rules: mode === 'teams' ? TM.rules : mode === 'diph' ? DI.rules : {}, fillers: flat({ teams: TM.fillers, diph: DI.fillers, aror: AO.fillers, erirur: EI.fillers }[mode] || []),
    oo: { moon: (DI.words || {})['oo-moon'] || [], book: (DI.words || {})['oo-book'] || [] }, ar: (AO.words || {}).ar || [], or: (AO.words || {}).or || [],
    short: SL.short ? [...SL.short.simple, ...SL.short.hard] : [], long: SL.long ? [...SL.long.simple, ...SL.long.hard] : [],
  };
}

function makeVowelG2Type({ id, slug, mode, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('vowels-g2: unknown mode ' + mode);
  const INFO = infoOf(mode);
  return {
    // an existing key of topics-taxonomy axes['exercise-type']: the family of the spelling rules of the vowels (the Grade 1 pages)
    id, slug, gradeBand: 'G2', assetClass: 'none', exerciseType: 'spelling-rules',
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // THE ITEM BANK of the unit checks (Part 7.6): G2-530 to G2-533 (g2VowelCheckPage below; not G2-534, whose level-2
    // spelling task has five pictured words, too few for two forms: its lesson takes G2-545)
    ...(G2V_CHECK_MODES.has(mode) ? { checkPage(args, ctx) { return g2VowelCheckPage(mode, args, ctx); } } : {}),

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English words (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const plan = drawPage(BANK, mode, lv, rng);
      const inner = W - 24;
      const blocks = plan.tasks.map((t, i) => renderTask(t, i + 1, mode, lv, d, key, inner));
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-g2v="${mode}|${lv}|${plan.variant}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:${d.gap || 8}px;min-height:0">` + fRoom(typo(blocks.join(''))) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.variant + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((LEVELS, INFO, CFG) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-g2v]');
        if (!root) return ['no page'];
        const [mode, lvS, variant] = root.dataset.lcsG2v.split('|'), lv = +lvS, d = LEVELS[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const txt = (e) => e.textContent.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').trim();
        const stem = (w) => w.replace(/s$/, '');
        const UNION = new Set(INFO.union), REAL = new Set(INFO.real), BAD = new Set(INFO.bad);
        const rb = R(root);
        // letters are the content of a phonics page: ligatures off everywhere, and an f before i, f, or l has its own room
        if (cs(root).fontVariantLigatures !== 'none' || !/"liga" 0/.test(cs(root).fontFeatureSettings) || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg') && /f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('style') && /['"]/.test(n.textContent)) { fails.push('a straight apostrophe or quotation mark on the page: "' + n.textContent.trim().slice(0, 24) + '"'); break; } }
        // pictures: loaded, 60 px or more, never twice, never a print-only picture
        const imgs = [...root.querySelectorAll('img')];
        imgs.forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 60) fails.push('a picture smaller than 60 px'); if (INFO.printOnly.includes(im.dataset.lcsPic)) fails.push('a print-only picture stands on the page'); });
        if (new Set(imgs.map((im) => im.dataset.lcsPic)).size !== imgs.length) fails.push('a picture stands twice on the page');
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, [data-lcs-line] svg').forEach((e) => { const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        // the tasks of the level, in order
        const kinds = blocks.map((b) => b.dataset.lcsTask);
        if (kinds.join() !== d.tasks.map((t) => t[0]).join()) fails.push(`the tasks are ${kinds.join(', ')}, not ${d.tasks.map((t) => t[0]).join(', ')}`);
        const countOf = (kind) => (d.tasks.find((t) => t[0] === kind) || [])[1];
        // sizes
        const lines = [...root.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < CFG.ROW - 0.5) fails.push(`a writing row lower than ${CFG.ROW} px`); });
        root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 19) fails.push('text a second grader reads is smaller than 19 px'); });
        root.querySelectorAll('[data-lcs-pill], [data-lcs-bankword], [data-lcs-boxsp], [data-lcs-boxword], [data-lcs-colhead], [data-lcs-choiceword], [data-lcs-cueopt]').forEach((e) => { if (fs(e) < 20) fails.push('a word to choose or sort is smaller than 20 px'); });
        root.querySelectorAll('[data-lcs-colhead]').forEach((e) => { if (cs(e).backgroundColor !== 'rgb(20, 107, 94)' || cs(e).color !== 'rgb(255, 255, 255)' || e.closest('[data-lcs-bank]')) fails.push('a sort column head is not a teal bar with white letters'); });
        // a period after the last word: tight to it, and outside the pill of a word to circle (never inside its ring)
        root.querySelectorAll('[data-lcs-tail]').forEach((e) => { const p = e.previousElementSibling; if (!p || R(e).left - R(p).right > 1.5) fails.push('a period stands apart from its word'); else if (R(e).left < R(p).right - 0.5) fails.push('a period stands inside the pill of its word'); });
        // gaps: 96 px for two letters, empty on the child's page, filled on the key and in a worked example
        root.querySelectorAll('[data-lcs-gap]').forEach((g) => { const want = g.dataset.lcsGap.length === 1 ? CFG.GAP1 : CFG.GAP2; if (Math.abs(R(g).width - want) > 1) fails.push(`a gap of ${Math.round(R(g).width)} px, not ${want}`);
          const ex = g.dataset.lcsExampleGap === '1'; if ((isKey || ex) ? txt(g) !== g.dataset.lcsGap : txt(g)) fails.push('a gap is filled on the page of the child, or wrong on the key or in a worked example'); });
        const gapFits = (wEl) => { const c = wEl.cloneNode(true), g = c.querySelector('[data-lcs-gap]'); if (!g) return false; g.textContent = g.dataset.lcsGap; return c.textContent.replace(/\s+/g, '') === wEl.dataset.lcsGapword; };
        // what the page prints (words whole or with a gap): none twice
        const printed = [];
        const addPrinted = (w) => printed.push(w);
        // examples: the words of the lists that the instruction at the top of the page, a rule, or a column head prints (they
        // may repeat each other, but no task may use them, and nothing that fits a sentence may be among them)
        const examples = new Set();
        const addExamples = (text) => (text.toLowerCase().match(/[a-z]+/g) || []).filter((w) => UNION.has(w) || UNION.has(stem(w))).forEach((w) => examples.add(UNION.has(w) ? w : stem(w)));
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page'); else addExamples(instr.textContent);
        root.querySelectorAll('[data-lcs-rule], [data-lcs-colhead]').forEach((e) => addExamples(e.textContent));
        // the sentences of the page and the words that fit them
        const sentEls = [...root.querySelectorAll('[data-lcs-sentence], [data-lcs-cloze]')];
        // a sentence is found in the bank by the text it carries, and the page must print exactly that text
        const shownText = (e) => { const copy = e.cloneNode(true); copy.querySelectorAll('[data-lcs-pills], [data-lcs-blankgroup] [data-lcs-line]').forEach((x) => x.replaceWith('___')); copy.querySelectorAll('[data-lcs-choices]').forEach((x) => x.remove()); return copy.textContent.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/\s+/g, ''); };
        const sentRec = (e) => { const rec = INFO.sents[e.dataset.lcsText || '']; return rec && shownText(e) === e.dataset.lcsText.replace(/\s+/g, '') ? rec : null; };
        const fitsOnPage = [];
        sentEls.forEach((e) => {
          const rec = sentRec(e), right = e.dataset.lcsSentence || e.dataset.lcsCloze;
          // its other word: the one the bank names, or (a sentence to finish from a box shown with one other word) a filler
          // (a sentence used in a word box shows no other word at all)
          const pw = e.dataset.lcsWrong || null;
          const wrongOk = rec && (!pw ? !!e.dataset.lcsCloze && !e.querySelector('[data-lcs-choices]') : rec.wrong ? rec.wrong === pw : INFO.fillers.includes(pw));
          if (!rec || rec.right !== right || !wrongOk) { fails.push(`the sentence for "${right}" is not a sentence of the bank keyed to its word`); return; }
          // (2026-11-19) the other word is never ruled out by the article before the gap: "a ___" and a word that starts
          // with a vowel letter, "an ___" and a word that starts with a consonant letter
          { const art = /(?:^|[^\p{L}])(an?)\s+_{2,}/iu.exec(e.dataset.lcsText || ''); if (art && pw) { const v = /^[aeiou]/i.test(pw); if (art[1].toLowerCase() === 'a' ? v : !v) fails.push(`the article before the gap rules out "${pw}" ("${e.dataset.lcsText}")`); } }
          fitsOnPage.push(...rec.fits);
          // the words its text prints
          const copy = e.cloneNode(true); copy.querySelectorAll('[data-lcs-pill], [data-lcs-choices], [data-lcs-blankgroup]').forEach((x) => x.remove());
          (copy.textContent.toLowerCase().match(/[a-z]+/g) || []).filter((w) => UNION.has(w)).forEach(addPrinted);
        });
        const checkPlaces = (ps, m, what) => { if (ps.length >= 2 && new Set(ps).size < Math.min(ps.length, m)) fails.push(`the right ${what} stands in one place every time`); if (ps.length >= 3 && (ps.every((x, i) => !i || x === ps[i - 1] + 1) || ps.every((x, i) => !i || x === ps[i - 1] - 1))) fails.push(`the right ${what} stands in a staircase`);
          if (m === 2 && ps.length >= 3 && ps.every((x, i) => !i || x !== ps[i - 1])) fails.push(`the right ${what} stands every other time in the other place`); };

        for (const b of blocks) {
          const kind = b.dataset.lcsTask, n = countOf(kind);
          if (kind === 'picpair') {
            const items = [...b.querySelectorAll('[data-lcs-picpair]')];
            if (items.length !== n) fails.push(`${items.length} pictures with two words, not ${n}`);
            const tops = [];
            let shorts = 0;
            items.forEach((e) => { const w = e.dataset.lcsPicpair, [s, l] = e.dataset.lcsPair.split('|'), pills = [...e.querySelectorAll('[data-lcs-pill]')], ok = pills.filter((p) => p.dataset.lcsOk);
              if (!INFO.pairs.some((p) => p[0] === s && p[1] === l) || pills.length !== 2 || ok.length !== 1 || ok[0].dataset.lcsWord !== w || ![s, l].includes(w) || pills.map((p) => p.dataset.lcsWord).sort().join() !== [s, l].sort().join() || e.querySelector('img').dataset.lcsPic !== w) fails.push('a picture is not keyed to its own word among the two words of a pair');
              if (pills.length === 2 && R(pills[1]).top < R(pills[0]).bottom - 0.5) fails.push('the two words under a picture are not stacked');
              if (w === s) shorts++;
              tops.push(pills.indexOf(ok[0])); pills.forEach((p) => addPrinted(p.dataset.lcsWord)); });
            if (shorts !== 2) fails.push(`${shorts} pictures show the short word, not two`);
            checkPlaces(tops, 2, 'word under the pictures');
            for (let i = 1; i < items.length; i++) { const a = [...items[i - 1].querySelectorAll('[data-lcs-pill]')].map(R), c = [...items[i].querySelectorAll('[data-lcs-pill]')].map(R); if (Math.min(...c.map((r) => r.left)) - Math.max(...a.map((r) => r.right)) < 14) fails.push('the words of two pictures stand too close'); }
          }
          if (kind === 'sort') {
            const chips = [...b.querySelectorAll('[data-lcs-bankword]')], cols = [...b.querySelectorAll('[data-lcs-column]')];
            const plain = chips.filter((c) => !c.dataset.lcsOdd), odd = chips.filter((c) => c.dataset.lcsOdd);
            const colKeys = cols.map((c) => c.dataset.lcsColumn);
            const want = { shortlong: ['short', 'long'], aror: ['ar', 'or'], erirur: ['er', 'ir', 'ur'] }[mode] || (mode === 'teams' ? variant.split('') : lv === 1 ? ['oo-moon', 'oo-book'] : ['cow', 'boy']);
            if (colKeys.join() !== want.join()) fails.push(`the sort columns are ${colKeys.join(', ')}`);
            // what column a word belongs to, read from the bank
            const colOf = (w) => {
              if (mode === 'shortlong') return INFO.short.includes(w) ? 'short' : INFO.long.includes(w) ? 'long' : null;
              if (mode === 'teams') { const g = Object.keys(INFO.spell).find((k) => INFO.spell[k].includes(w)); return g ? INFO.sound[g] : null; }
              if (mode === 'diph') return INFO.oo.moon.includes(w) ? 'oo-moon' : INFO.oo.book.includes(w) ? 'oo-book' : (INFO.spell.ou.includes(w) || INFO.spell.ow.includes(w)) ? 'cow' : (INFO.spell.oi.includes(w) || INFO.spell.oy.includes(w)) ? 'boy' : null;
              const g = Object.keys(INFO.spell).find((k) => INFO.spell[k].includes(w)); return g || null;
            };
            if (plain.length !== n * want.length || want.some((c) => plain.filter((x) => colOf(x.dataset.lcsBankword) === c && x.dataset.lcsCol === c).length !== n) || cols.some((c) => c.querySelectorAll('[data-lcs-line]').length !== n)) fails.push(`the sort is not ${n} words of each column and a column of ${n} rows for each`);
            if (mode === 'teams' && lv === 2) Object.keys(INFO.spell).filter((g) => want.includes(INFO.sound[g])).forEach((g) => { if (!plain.some((x) => INFO.spell[g].includes(x.dataset.lcsBankword))) fails.push(`the sort holds no word of ${g}`); });
            const seq = plain.map((x) => x.dataset.lcsCol);
            if (seq.some((c, i) => i >= 2 && c === seq[i - 1] && c === seq[i - 2])) fails.push('three words of one column stand in a row in the sort');
            if (isKey) { cols.forEach((c) => [...c.querySelectorAll('[data-lcs-line]')].forEach((l) => { if (colOf(l.dataset.lcsAnswer || '') !== c.dataset.lcsColumn || !plain.some((x) => x.dataset.lcsBankword === l.dataset.lcsAnswer)) fails.push('the key sorts a word into the wrong column'); })); if (!b.querySelector('[data-lcs-anyorder]')) fails.push('the key does not say the sort may be written in any order'); }
            const lbl = txt(b.querySelector('[data-lcs-label]'));
            const struck = chips.filter((e) => /line-through/.test(cs(e).textDecorationLine));
            if ((mode === 'erirur' || mode === 'shortlong') && lv === 3) {
              const ow = odd.length ? odd[0].dataset.lcsBankword : '';
              const oddOk = mode === 'erirur' ? /er|ir|ur/.test(ow) : !INFO.short.includes(ow) && !INFO.long.includes(ow);
              if (odd.length !== 1 || !INFO.odd.includes(ow) || UNION.has(ow) || !oddOk) fails.push(mode === 'erirur' ? 'not one odd word that holds er, ir, or ur but is no list word' : 'not one odd word that is neither short nor long');
              if (!(mode === 'erirur' ? /Cross out the word that does not say/ : /One word is not short or long\. Cross it out\./).test(lbl)) fails.push('the sort does not tell the child to cross out the odd word');
              if (isKey ? struck.length !== 1 || struck[0] !== odd[0] : struck.length) fails.push('the key does not cross out the odd word (or the page of the child does)');
              if (odd.length && (chips.indexOf(odd[0]) === 0 || chips.indexOf(odd[0]) === chips.length - 1)) fails.push('the odd word stands first or last');
              // the odd word is printed once: no sentence of the page holds it
              if (ow && [...root.querySelectorAll('[data-lcs-text]')].some((e) => new RegExp('(^|[^a-z])' + ow + '([^a-z]|$)', 'i').test(e.dataset.lcsText))) fails.push(`the odd word "${ow}" also stands in a sentence of the page`);
            } else {
              if (odd.length || struck.length) fails.push('an odd word on a level without one');
              if (!/Cross out each word when you write it/.test(lbl)) fails.push('the sort does not tell the child to cross out each word');
            }
            // G2-534: the er words of a sort have one syllable (sister is no word to sort beside bird and fur); G2-532: no word
            // whose oo many say the other way (hoop)
            if (mode === 'erirur' && plain.some((x) => x.dataset.lcsCol === 'er' && (x.dataset.lcsBankword.replace(/e$/, '').match(/[aeiouy]+/g) || []).length !== 1)) fails.push('an er word of two syllables in the sort');
            if (mode === 'diph' && plain.some((x) => INFO.notSort.includes(x.dataset.lcsBankword))) fails.push('a word whose oo many say the other way is in the sort');
            chips.forEach((x) => addPrinted(x.dataset.lcsBankword));
          }
          if (kind === 'pillsent') {
            const ss = [...b.querySelectorAll('[data-lcs-sentence]')];
            if (ss.length !== n) fails.push(`${ss.length} sentences to circle in, not ${n}`);
            const kinds = [], pos = [];
            ss.forEach((e) => { const pills = [...e.querySelectorAll('[data-lcs-pill]')], ok = pills.filter((p) => p.dataset.lcsOk);
              if (pills.length !== 2 || ok.length !== 1 || ok[0].dataset.lcsWord !== e.dataset.lcsSentence || pills.map((p) => p.dataset.lcsWord).sort().join() !== [e.dataset.lcsSentence, e.dataset.lcsWrong].sort().join()) fails.push('a sentence is not keyed to its word among its two words');
              kinds.push(e.dataset.lcsKind); pos.push(pills.indexOf(ok[0])); pills.forEach((p) => addPrinted(p.dataset.lcsWord)); });
            const need = { shortlong: ['short', 'long'], diph: ['oo-moon', 'oo-book'], aror: lv === 1 ? ['r', 'no-r'] : ['ar', 'or'], erirur: ['er'] }[mode];
            if (need.some((k) => !kinds.includes(k))) fails.push('the right words of the sentences are all of one kind');
            // the kind a right word is, read from the bank
            ss.forEach((e) => { const w = e.dataset.lcsSentence, k = e.dataset.lcsKind;
              const real = mode === 'shortlong' ? (INFO.pairs.some((p) => p[0] === w) ? 'short' : 'long') : mode === 'diph' ? (INFO.oo.moon.includes(w) ? 'oo-moon' : 'oo-book') : mode === 'aror' ? (lv === 1 ? (INFO.ar.includes(w) ? 'r' : 'no-r') : (INFO.ar.includes(w) ? 'ar' : 'or')) : 'er';
              if (real !== k) fails.push(`"${w}" is not a word of the kind the page says`); });
            checkPlaces(pos, 2, 'word of the sentences');
            if (isKey && b.querySelectorAll('[data-lcs-pill][data-lcs-ok]').length !== n) fails.push('the key does not ring every right word');
          }
          if (kind === 'gaps') {
            const offered = b.dataset.lcsOffered.split(','), ws = [...b.querySelectorAll('[data-lcs-gapword]')], ex = ws.filter((w) => w.dataset.lcsExample === '1'), plain = ws.filter((w) => w.dataset.lcsExample !== '1');
            if (plain.length !== n) fails.push(`${plain.length} words with a gap, not ${n}`);
            const wantOffer = { shortlong: null, teams: lv === 1 ? null : lv === 2 ? Object.keys(INFO.spell).filter((g) => variant.includes(INFO.sound[g])) : Object.keys(INFO.spell), diph: lv === 2 ? ['ou', 'ow', 'oi', 'oy'] : ['oo', 'ou', 'ow', 'oi', 'oy'], aror: lv === 1 ? ['ar'] : ['ar', 'or'], erirur: ['er'] }[mode];
            if (mode === 'teams' && lv === 1 ? offered.length !== 2 || offered.some((g) => INFO.sound[g] !== variant) : offered.join() !== (wantOffer || []).join()) fails.push('the gaps do not offer the spellings of this level: ' + offered.join(', '));
            const single = offered.length === 1;
            if (single ? ex.length !== 1 || ws[0] !== ex[0] : ex.length) fails.push(single ? 'the gaps with one spelling have not one worked word, first' : 'a worked word where the child chooses the spelling');
            // G2-532 level 2: two rows, ou or ow and oi or oy, each with its own line, three words, both spellings
            const groups = [...b.querySelectorAll('[data-lcs-gapgroup]')];
            if (mode === 'diph' && lv === 2 ? groups.map((g) => g.dataset.lcsOffered).join('|') !== 'ou,ow|oi,oy' || groups.some((g) => g.querySelectorAll('[data-lcs-gapword]').length !== n / 2) : groups.length) fails.push('the gaps are not one row of ou or ow and one row of oi or oy');
            ws.forEach((w) => { const word = w.dataset.lcsGapword, g = w.querySelector('[data-lcs-gap]').dataset.lcsGap, at = word.indexOf(g);
              // the spellings this gap offers: those of its row (G2-532 level 2) or of the task
              const off = (w.closest('[data-lcs-gapgroup]') || b).dataset.lcsOffered.split(',');
              if (!off.includes(g) || !(INFO.spell[g] || []).includes(word) || !gapFits(w)) fails.push(`"${word}" has no gap for its own spelling`);
              const built = off.filter((o) => o !== g).map((o) => word.slice(0, at) + o + word.slice(at + g.length)).filter((x) => REAL.has(x) || BAD.has(x));
              if (built.length) fails.push(`the gap of "${word}" also makes ${built.join(', ')}`);
              // ee and ea (no rule tells them apart) only in a word a second grader knows by sight; oy only in boy, toy, joy
              if (mode === 'teams' && (g === 'ee' || g === 'ea') && !INFO.gapE.includes(word)) fails.push(`"${word}" stands with an ${g} gap`);
              if (mode === 'diph' && g === 'oy' && !INFO.oyGap.includes(word)) fails.push(`"${word}" stands with an oy gap`);
              addPrinted(word); });
            // every spelling at least once; teams level 3 draws its teams one by one (four or more, a long a and a long o); the
            // five vowel teams of G2-532 level 3 need no oy gap (its box sentences hold oy)
            const sps = plain.map((w) => w.querySelector('[data-lcs-gap]').dataset.lcsGap);
            if (mode === 'teams' && lv === 3) { if (new Set(sps).size < 4 || !sps.some((g) => INFO.sound[g] === 'a') || !sps.some((g) => INFO.sound[g] === 'o')) fails.push('the gaps are not of four teams or more with a long a and a long o'); }
            else if (!single && offered.some((g) => !sps.includes(g) && !(mode === 'diph' && lv === 3 && g === 'oy'))) fails.push('a spelling of the box has no word with a gap');
            groups.forEach((gr) => { const s = [...gr.querySelectorAll('[data-lcs-gap]')].map((x) => x.dataset.lcsGap); if (gr.dataset.lcsOffered.split(',').some((g) => !s.includes(g))) fails.push('a row of the gaps holds one spelling only'); });
            if (mode === 'teams' && lv === 1 && offered.some((g) => sps.filter((x) => x === g).length !== n / 2)) fails.push(`not ${n / 2} words of each team`);
            // rules: printed where the page has one, never where it has none
            const rules = [...b.querySelectorAll('[data-lcs-rule]')].map(txt), wantRules = mode === 'teams' ? ['a', 'o'].filter((v) => (lv === 1 ? variant === v : lv === 2 ? variant.includes(v) : true)).map((v) => INFO.rules[v]) : mode === 'diph' ? [INFO.rules.ou, INFO.rules.oi] : [];
            if (rules.join('|') !== wantRules.join('|')) fails.push('the rules printed are not the rules of these spellings');
            // the task line names every spelling the gaps offer (G2-532 level 2: the line of each row names its two)
            const namedIn = (e) => (txt(e).match(/\b[a-z]{2}\b/g) || []).filter((x) => Object.keys(INFO.spell).includes(x));
            const lbl = txt(b.querySelector('[data-lcs-label]'));
            (groups.length ? groups.map((gr) => [gr.querySelector('[data-lcs-grouplabel]'), gr.dataset.lcsOffered.split(',')]) : [[b.querySelector('[data-lcs-label]'), offered]]).forEach(([e, want]) => {
              const named = e ? namedIn(e) : [];
              if (want.some((g) => !named.includes(g)) || named.some((g) => !want.includes(g))) fails.push('the task line does not name the spellings of the gaps: ' + named.join(', ')); });
            if (groups.length && namedIn(b.querySelector('[data-lcs-label]')).length) fails.push('the line of the task names spellings its rows name');
            // long e (teams level 1): no rule, so the line says the two teams say the same sound and asks for the one that looks right
            if (mode === 'teams' && lv === 1 && variant === 'e' && !/^\d+\.\s*ee and ea say the same sound\. Write the one that looks right\.$/.test(lbl)) fails.push('the line of the long e gaps does not say that ee and ea say the same sound');
            // where the spellings sit: no row or column of three or more all one spelling
            if (!single) { const groups = (f) => { const m = new Map(); plain.forEach((w, i) => { const c = w.closest('[data-lcs-gapcell]'), k = Math.round(f(R(c)) / 8); m.set(k, [...(m.get(k) || []), sps[i]]); }); return [...m.values()]; };
              if ([...groups((r) => r.top + r.height / 2), ...groups((r) => r.left + r.width / 2)].some((g) => g.length >= 3 && new Set(g).size === 1)) fails.push('a row or a column of the gap words holds one spelling only'); }
          }
          if (kind === 'write') {
            const wr = [...b.querySelectorAll('[data-lcs-write]')];
            if (wr.length !== n || new Set(wr.map((e) => e.dataset.lcsWrite)).size !== n) fails.push(`not ${n} different pictures to write the word for`);
            wr.forEach((e) => { const w = e.dataset.lcsWrite, l = e.querySelectorAll('[data-lcs-line]'), im = e.querySelector('img');
              if (!im || im.dataset.lcsPic !== w || l.length !== 1) fails.push('a word to write has no picture of its own or not one row');
              else if (isKey ? l[0].dataset.lcsAnswer !== w : l[0].dataset.lcsStartertext !== w[0]) fails.push('a row to write a word on does not start with its first letter (or the key does not print the word)');
              // G2-534 level 3: a box of er, ir, ur beside the picture, the right one marked; only the key rings it
              const cue = e.dataset.lcsCue, cb = e.querySelector('[data-lcs-cuebox]');
              if (mode === 'erirur' && lv === 3) {
                const opts = cb ? [...cb.querySelectorAll('[data-lcs-cueopt]')] : [], ok = opts.filter((o) => o.dataset.lcsOk);
                if (!cue || !(INFO.spell[cue] || []).includes(w) || opts.map((o) => o.dataset.lcsCueopt).join() !== 'er,ir,ur' || txt(cb).replace(/\s+/g, '') !== 'erirur' || ok.length !== 1 || ok[0].dataset.lcsCueopt !== cue) fails.push('the box beside a picture does not show er, ir, ur with the right one marked');
                const ringed = opts.filter((o) => cs(o).borderTopColor === 'rgb(20, 107, 94)');
                if (isKey ? ringed.length !== 1 || ringed[0] !== ok[0] : ringed.length) fails.push('the key does not ring the right letters in the box (or the page of the child does)');
              } else if (cue || cb) fails.push('a spelling box beside a picture on a level without one');
              if (!UNION.has(w)) fails.push(`"${w}" to write is no word of the lists`); });
            if (mode === 'erirur' && lv === 3 && !/^\d+\.\s*Circle the right letters in the box\. Then write the word\.$/.test(txt(b.querySelector('[data-lcs-label]')))) fails.push('the line does not ask the child to circle the letters in the box');
            if (mode === 'shortlong') { const sh = wr.filter((e) => INFO.pairs.some((p) => p[0] === e.dataset.lcsWrite) || !/e$|ai|ay|ee|ea|oa|ow/.test(e.dataset.lcsWrite)).length; if (sh < 1 || sh > n - 1) fails.push('the pictures to write are not short and long words'); }
            if (mode === 'teams' && lv === 3 && new Set(wr.map((e) => INFO.sound[Object.keys(INFO.spell).find((g) => INFO.spell[g].includes(e.dataset.lcsWrite))])).size !== 3) fails.push('the pictures to write are not one long a, one long e, one long o');
            if (mode === 'teams' && lv === 1 && wr.some((e) => INFO.sound[Object.keys(INFO.spell).find((g) => INFO.spell[g].includes(e.dataset.lcsWrite))] !== variant)) fails.push('a picture to write does not say the long vowel of this page');
            if (mode === 'aror' && ['ar', 'or'].some((g) => !wr.some((e) => INFO[g].includes(e.dataset.lcsWrite)))) fails.push('the pictures to write are not ar and or words');
          }
          if (kind === 'boxsent' || kind === 'choicewrite') {
            const ss = [...b.querySelectorAll('[data-lcs-cloze]')];
            if (ss.length !== n) fails.push(`${ss.length} sentences to write in, not ${n}`);
            ss.forEach((e) => { const l = e.querySelector('[data-lcs-blankgroup] [data-lcs-line]'); if (!l || (isKey ? l.dataset.lcsAnswer !== e.dataset.lcsCloze : l.dataset.lcsAnswer)) fails.push('a sentence has no row for its word, or the key does not write it'); });
            if (kind === 'boxsent') {
              const box = [...b.querySelectorAll('[data-lcs-boxword]')].map((e) => e.dataset.lcsBoxword), answers = ss.map((e) => e.dataset.lcsCloze);
              if (box.length !== n + 2 || new Set(box).size !== box.length || answers.some((w) => !box.includes(w)) || box.filter((w) => !answers.includes(w)).some((w) => !INFO.fillers.includes(w))) fails.push(`the word box is not the ${n} answers and two words that fit no sentence`);
              checkPlaces(answers.map((w) => box.indexOf(w)), box.length, 'word in the box');
              box.forEach(addPrinted);
            } else {
              // G2-530: the two words of the sentence's pair; G2-534: its word and a word that fits no sentence (a filler)
              ss.forEach((e) => { const two = [...e.querySelectorAll('[data-lcs-choiceword]')].map((x) => x.dataset.lcsChoiceword);
                // (the other word itself was checked with the sentence: the bank's own other word, or a filler)
                const okPair = mode === 'shortlong' ? INFO.pairs.some((p) => p.includes(two[0]) && p.includes(two[1])) : true;
                if (two.length !== 2 || !two.includes(e.dataset.lcsCloze) || !two.includes(e.dataset.lcsWrong) || two[0] === two[1] || !okPair) fails.push('a sentence does not show its word and the one other word it may show');
                two.forEach(addPrinted); });
              const kinds = ss.map((e) => (mode === 'shortlong' ? (INFO.pairs.some((p) => p[0] === e.dataset.lcsCloze) ? 'short' : 'long') : Object.keys(INFO.spell).find((g) => INFO.spell[g].includes(e.dataset.lcsCloze))));
              if (ss.length >= 2 && new Set(kinds).size !== ss.length) fails.push('the right words of the sentences are all of one kind');
              const pos = ss.map((e) => [...e.querySelectorAll('[data-lcs-choiceword]')].findIndex((x) => x.dataset.lcsChoiceword === e.dataset.lcsCloze));
              checkPlaces(pos, 2, 'word of the sentences');
              if (ss.length === 2 && pos[0] === pos[1]) fails.push('the right word of both sentences stands in one place');
            }
            if (mode === 'aror' && lv === 3 && ['ar', 'or'].some((g) => !ss.some((e) => INFO[g].includes(e.dataset.lcsCloze)))) fails.push('the sentences are not of ar and or words');
          }
          if (kind === 'match') {
            const mw = [...b.querySelectorAll('[data-lcs-mword]')], mp = [...b.querySelectorAll('[data-lcs-mpic]')];
            const real = mw.filter((e) => !e.dataset.lcsDecoy), dec = mw.filter((e) => e.dataset.lcsDecoy);
            if (mw.length !== n + 2 || real.length !== n || dec.length !== 2 || mp.length !== n) fails.push(`not ${n + 2} words for ${n} pictures, two of them without a picture`);
            const picWords = mp.map((e) => e.dataset.lcsMpic);
            real.forEach((e) => { const w = e.dataset.lcsWord, pc = mp.find((p) => p.dataset.lcsMpic === w);
              if (!pc || !pc.querySelector('img') || pc.querySelector('img').dataset.lcsPic !== w || !INFO.ar.includes(w)) fails.push('a word has no picture of its own or is no ar word');
              if (pc) { const o = (R(pc).top + R(pc).height / 2) - (R(e).top + R(e).height / 2); e.dataset.off = o; if (Math.abs(o) < 18) fails.push(`"${w}" stands straight across from its picture`); } addPrinted(w); });
            if (new Set(real.map((e) => Math.round(+e.dataset.off / 10))).size < 2) fails.push('every picture stands the same distance from its word');
            const di = mw.map((e, i) => (e.dataset.lcsDecoy ? i : -1)).filter((i) => i >= 0);
            if (di.length === 2 && Math.abs(di[0] - di[1]) === 1) fails.push('the two words without a picture stand next to each other');
            dec.forEach((e) => { const w = e.dataset.lcsWord, of = e.dataset.lcsDecoy; if (!picWords.includes(of) || !(INFO.decoys[of] || []).includes(w) || UNION.has(w)) fails.push(`"${w}" is not a word without a picture made from "${of}"`); addPrinted(w); });
            const kl = b.querySelectorAll('[data-lcs-keyline]').length; if (kl !== (isKey ? n : 0)) fails.push(`${kl} lines are drawn`);
          }
          if (kind === 'check') {
            const items = [...b.querySelectorAll('[data-lcs-check]')];
            if (items.length !== n) fails.push(`${items.length} pictures to check the spelling of, not ${n}`);
            const pos = [];
            items.forEach((e) => { const w = e.dataset.lcsCheck, pills = [...e.querySelectorAll('[data-lcs-pill]')], ok = pills.filter((p) => p.dataset.lcsOk), wrong = pills.filter((p) => !p.dataset.lcsOk).map((p) => p.dataset.lcsWord);
              if (pills.length !== 3 || ok.length !== 1 || ok[0].dataset.lcsWord !== w || e.querySelector('img').dataset.lcsPic !== w || wrong.slice().sort().join() !== (INFO.check[w] || []).slice().sort().join() || wrong.some((x) => REAL.has(x) || UNION.has(x))) fails.push(`"${w}" is not checked among its two wrong spellings`);
              for (let i = 1; i < pills.length; i++) if (R(pills[i]).top < R(pills[i - 1]).bottom - 0.5) fails.push('the three spellings under a picture are not stacked');
              pos.push(pills.indexOf(ok[0])); addPrinted(w); });
            checkPlaces(pos, 3, 'spelling');
          }
        }
        // a word to write is never printed; no word is printed twice; nothing printed fits a sentence of the page
        const writes = [...root.querySelectorAll('[data-lcs-write]')].map((e) => e.dataset.lcsWrite);
        const st = printed.map(stem);
        if (new Set(st).size !== st.length) fails.push('a word is printed twice on the page: ' + [...new Set(st.filter((w, i) => st.indexOf(w) !== i))].join(', '));
        writes.forEach((w) => { if (st.includes(stem(w))) fails.push(`the word to write "${w}" is printed on the page`); });
        st.forEach((w) => { if (examples.has(w)) fails.push(`"${w}" is an example of the instruction, a rule, or a column head and also a task word`); });
        writes.forEach((w) => { if (examples.has(stem(w))) fails.push(`the word to write "${w}" is printed as an example`); });
        const all = [...st, ...writes.map(stem), ...examples];
        fitsOnPage.forEach((w) => { if (all.includes(stem(w))) fails.push(`"${w}" also fits a sentence of the page and is on the page`); });
        return fails;
      }, LEVELS, INFO, { ROW, GAP1, GAP2 });
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the level's task made small, each card one
 *  task with its answer in its markup, drawn from the bank by the page's own rules.
 *   shortlong (G2-530), aror (G2-533)  the sentence to circle in (level 2 of both pages): one sentence with its two words
 *            (cap / cape, barn / born; a sentence of the box takes a word of the other spelling that fits no sentence), the
 *            right word carries data-lcs-correct. A pair stands once a page, the right word sits first on some cards and
 *            second on others, both kinds of right word on every page. A word of the page instruction (hop, hope; park,
 *            storm) is never on a card, and after "a" the other word never starts with a vowel ("a art" gives it away).
 *   teams (G2-531), diph (G2-532)  the level-2 gap: one word with a gap for its vowel team (96 px, data-lcs-answer), the
 *            two spellings of its sound named on the card and, where the page has one, the rule of their place (ai/ay,
 *            oa/ow, ou/ow, oi/oy); ee/ea, which no rule tells apart, only in the words a second grader knows by sight. The
 *            other spelling builds no word (the page's gapOk), the words of the rules and of the instruction are never a
 *            task, and never three cards of one sound in a row. */
const G2V_CHECK_MODES = new Set(['shortlong', 'teams', 'diph', 'aror']);
function g2VowelCheckPage(mode, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`vowels-g2 check: the words are English words (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, d = LEVELS[mode][lv] || LEVELS[mode][2], rng = ctx.rng, key = !!(ctx && ctx.answerKey);
  // level 1 of G2-532 (oo only) and of G2-533 (ar only) teaches less than these cards ask
  if ((mode === 'diph' || mode === 'aror') && lv === 1) throw new Error(`vowels-g2 check: no cards of level 1 for ${mode}`);
  const say = new Set(d.say || []);
  const real = new Set(BANK.real || []), bad = new Set(BANK.bad || []), frag = new Set(BANK.badFragments || []);
  const cards = [];
  const choice = (w, okk, font) => pill(w, okk, key, font).replace('<span data-lcs-pill', `<span data-lcs-choice="${esc(w)}"${okk ? ' data-lcs-correct="1"' : ''} data-lcs-pill`);
  if (mode === 'shortlong' || mode === 'aror') {
    const A = BANK.aror;
    const pool = mode === 'shortlong' ? SL.sentences : [...A.arorSentences, ...A.sentences];
    const isAr = (w) => A.words.ar.includes(w);
    const kindOf = mode === 'shortlong' ? (w) => (SL.pairs.some((p) => p[0] === w) ? 'short' : 'long') : (w) => (isAr(w) ? 'ar' : 'or');
    const vowelStart = (w) => /^[aeiou]/.test(w);
    const wrongOf = (s) => {
      if (s.wrong) return s.wrong;
      const article = (s.text.match(/\b(a|an)\s+___/i) || [])[1];
      const pick = shuffle(A.fillers.filter((w) => !A.words[isAr(s.right) ? 'ar' : 'or'].includes(w) && w !== s.right && !s.fits.includes(w) && !(article && (article.toLowerCase() === 'an') !== vowelStart(w))), rng)[0];
      return pick || null;
    };
    let got = null;
    for (let k = 0; k < 400 && !got; k++) {
      // (a word of the lists one card prints is never a word another card offers: sharp in "A ___ has sharp teeth" and
      // sharp / sport on the next card)
      const out = [], pairs = new Set(), rights = new Set(), offered = new Set(), printed = new Set();
      for (const s0 of shuffle(pool, rng)) {
        if (out.length === 8) break;
        const wrong = wrongOf(s0), tw = textWords(s0, UNION[mode]);
        if (!wrong || [s0.right, wrong, ...tw].some((w) => say.has(w)) || offered.has(s0.right) || rights.has(wrong) || [s0.right, wrong].some((w) => printed.has(w)) || tw.some((w) => offered.has(w))) continue;
        const pk = [s0.right, wrong].sort().join('|');
        if (pairs.has(pk)) continue;
        pairs.add(pk); rights.add(s0.right); offered.add(s0.right); offered.add(wrong); tw.forEach((w) => printed.add(w));
        out.push({ ...s0, wrong, kind: kindOf(s0.right) });
      }
      if (out.length === 8 && new Set(out.map((s) => s.kind)).size === 2 && out.filter((s) => s.kind === out[0].kind).length <= 5) got = out;
    }
    if (!got) throw new Error(`vowels-g2 check: no eight sentences for ${mode}`);
    // (review en-1119-lit) the first two cards of a page are of the two kinds (short and long; ar and or): a check takes the
    // first cards first, and form B asks the kinds form A asks (data-lcs-ckind)
    { const j = got.findIndex((x) => x.kind !== got[0].kind); if (j > 1) got.splice(1, 0, ...got.splice(j, 1)); }
    const at = places(got.length, 2, rng);
    got.forEach((s, i) => {
      const two = [[s.right, true], [s.wrong, false]]; if (at[i]) two.reverse();
      const { a, tail, b: b2 } = splitAt(s.text);
      cards.push(`<div data-lcs-checksent="${esc(s.right)}" data-lcs-kind="${s.kind}" data-lcs-ckind="${s.kind}" data-lcs-text="${esc(s.text)}" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px 8px;padding:8px 10px;font:700 24px/1.3 'Nunito',sans-serif;color:${T.ink}">` +
        `${a ? `<span>${esc(a)}</span>` : ''}<span style="display:inline-flex;align-items:center"><span data-lcs-twochoice style="display:inline-flex;align-items:center;gap:6px">${two.map(([w, okk]) => choice(w, okk, 24)).join('')}</span>${tail ? `<span data-lcs-tail style="margin-left:1px;padding:0">${esc(tail)}</span>` : ''}</span>${b2 ? `<span>${esc(b2)}</span>` : ''}</div>`);
    });
  } else {
    // the sounds of the page and their two spellings; the words a rule or the instruction prints are no task
    const groups = mode === 'teams'
      ? ['a', 'e', 'o'].map((v) => ({ v, sp: Object.keys(TM.words).filter((g) => TM.sound[g] === v), rule: TM.rules[v] || null }))
      : [{ v: 'ou', sp: ['ou', 'ow'], rule: DI.rules.ou }, { v: 'oi', sp: ['oi', 'oy'], rule: DI.rules.oi }];
    const shown = new Set([...say, ...groups.flatMap((gr) => (gr.rule ? ruleWords(gr.rule, UNION[mode]) : []))]);
    const poolOf = (g) => (mode === 'teams' && (g === 'ee' || g === 'ea') ? TM.words[g].filter((w) => TM.gapE.includes(w)) : mode === 'diph' && g === 'oy' ? DI.words.oy.filter((w) => DI.oyGap.includes(w)) : SPELL[mode][g]);
    const words = groups.map((gr) => gr.sp.flatMap((g) => poolOf(g).filter((w) => !shown.has(w) && gapOk(w, g, gr.sp, real, bad, frag)).map((w) => ({ w, g, gr }))));
    // the kind of a card (review en-1119-lit): G2-531 a rule of the place (ai/ay, oa/ow) or a look-right team (ee/ea);
    // G2-532 the first spelling the card names (ou, oi: the middle of a word) or the second (ow, oy: the end); a form asks
    // both, and form B the kinds form A asks
    const ckindOf = (x) => (mode === 'teams' ? (x.gr.rule ? 'rule' : 'look') : x.g === x.gr.sp[0] ? 'first' : 'second');
    // eight cards: every sound of the page, both spellings of each sound, never three cards of one sound in a row, the first
    // two of other kinds
    let got = null;
    for (let k = 0; k < 400 && !got; k++) {
      const per = mode === 'teams' ? shuffle([3, 3, 2], rng) : [4, 4];
      const pick = groups.flatMap((gr, i) => shuffle(words[i], rng).slice(0, per[i]));
      if (pick.length !== 8 || new Set(pick.map((x) => x.w)).size !== 8 || groups.some((gr) => gr.sp.some((g) => !pick.some((x) => x.g === g)))) continue;
      const order = shuffle(pick, rng);
      if (order.some((x, i) => i >= 2 && x.gr === order[i - 1].gr && x.gr === order[i - 2].gr)) continue;
      if (ckindOf(order[0]) === ckindOf(order[1])) continue;
      got = order;
    }
    if (!got) throw new Error(`vowels-g2 check: no eight gap words for ${mode}`);
    const ruleLine = (r) => `<div data-lcs-checkrule data-lcs-read style="padding:2px 12px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF;font:700 17px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(r)}</div>`;
    for (const x of got) {
      const [s1, s2] = x.gr.sp;
      const line1 = x.gr.rule ? `Write ${teal(s1)} or ${teal(s2)}.` : `${teal(s1)} and ${teal(s2)} say the same sound. Write the one that looks right.`;
      cards.push(`<div data-lcs-gapcheck="${esc(x.w)}" data-lcs-sound="${x.gr.v}" data-lcs-ckind="${ckindOf(x)}" style="display:flex;flex-direction:column;gap:6px;padding:6px 10px">` +
        (x.gr.rule ? ruleLine(x.gr.rule) : '') +
        // the line and the word on one row (two cards of a part fit the check's 330 px)
        `<div style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:center;gap:4px 30px;padding:0 0 4px"><div style="flex:0 1 auto">${label(line1, 19)}</div>` + gapWord(x.w, x.g, key, 34).replace(`<span data-lcs-gap="${x.g}"`, `<span data-lcs-gap="${x.g}" data-lcs-answer="${x.g}"`) + `</div></div>`);
    }
  }
  if (mode === 'diph') {
    // (review en-1119-lit) oo leads the lesson and its title; the level-2 page writes ou, ow, oi, oy only, its levels 1 and 3
    // sort oo by its sound: three cards of that sort (one word, moon or book to circle), third on the page and then in turn
    const sortable = (w) => !DI.notSort.includes(w) && !['moon', 'book'].includes(w) && !say.has(w);
    let oo = null;
    for (let k = 0; k < 100 && !oo; k++) { const m = shuffle([...DI.words['oo-moon'].filter(sortable).map((w) => ({ w, c: 'moon' })), ...DI.words['oo-book'].filter(sortable).map((w) => ({ w, c: 'book' }))], rng).slice(0, 3); if (new Set(m.map((x) => x.c)).size === 2) oo = m; }
    const ooCard = (x) => `<div data-lcs-oocheck="${esc(x.w)}" data-lcs-ckind="oo" style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:6px 10px 10px">` +
      label(`Read the word. Is its ${teal('oo')} the sound in moon or in book? Circle one.`, 19) +
      `<div style="display:flex;align-items:center;gap:34px"><span data-lcs-read style="font:800 36px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(x.w)}</span>` +
      `<span data-lcs-twochoice style="display:inline-flex;align-items:center;gap:10px">${['moon', 'book'].map((c) => choice(c, c === x.c, 24)).join('')}</span></div></div>`;
    [6, 4, 2].forEach((at, i) => cards.splice(at, 0, ooCard(oo[i])));
  }
  return { bodyHtml: STYLE + `<div data-lcs-noliga="1" style="${LIGS}">` + fRoom(typo(checkGrid(cards, { cols: 1 }))) + `</div>`, meta: {} };
}

module.exports = { makeVowelG2Type, g2VowelFaultsOf, drawPage, LEVELS };
