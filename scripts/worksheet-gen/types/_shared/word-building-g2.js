/**
 * word-building-g2.js — three Grade 2 word-building pages (English literacy year, Daily Teaching System Part 12.3,
 * 2026-11-17; the unit "Spelling and Word Building" of Grade 2). The words are data/literacy/word-building-g2.en.json.
 * The pages are led by PRINTED WORDS (a second grader reads and writes them); pictures stand only on the apostrophe page,
 * each printed with its word (an owner and the thing it owns). Revised the same day after a Grade 2 teacher's review.
 *
 *   prefix      Prefixes un- and re- (L.2.4.b; level 3: Prefixes un-, re-, and pre-)   G2-535
 *   suffix      Suffixes -ful, -less, and -ly (RF.2.3.d)                                G2-536
 *   apostrophe  Apostrophes: contractions and one owner (L.2.2.c)                       G2-537
 *
 * prefix   level 1  un- only: 1. a done example in grey, then three bases to add un- to and write the new word (rows of
 *                   89 px); 2. four meanings (not happy, the opposite of lock), each with three words to circle: the un-
 *                   word, its base, and another un- word; 3. three sentences with a base and its un- word to circle (the
 *                   right word is the base in some sentences and the un- word in others)
 *          level 2  un- and re-: 1. two meanings (not fair, fold again: one un-, one re-) to write the new word for;
 *                   2. four words of two bases (untie, retie, unpack, repack) to match to their meanings with a line;
 *                   3. three sentences with a 96 px gap where un or re stands before the printed base word
 *          level 3  un-, re-, and pre-: 1. two meanings to write the new word for; 2. three sentences with a 128 px gap
 *                   for un, re, or pre (pre- once at least on the page); 3. two rows to write a sentence with both words of
 *                   part 1 (the key prints a sample answer)
 * suffix   level 1  -ful only: 1. a done example in grey, then five -ful words: circle the base word, underline -ful;
 *                   2. a done example in grey, then three meanings (full of help) to write the -ful word for; 3. three
 *                   sentences with a base and its -ful word to circle
 *          level 2  -ful and -less: 1. six words to mark; 2. four words of two bases (careful, careless) to match to
 *                   their meanings; 3. three sentences with a 160 px gap after the base for ful or less
 *          level 3  -ful, -less, and -ly: 1. six words to mark and one word with the letters of a suffix but no base
 *                   (jelly, bless) to cross out; 2. four words (a -ful and -less pair and two -ly words) to match; 3. three
 *                   sentences with a gap for ful, less, or ly
 * apostrophe level 1 contractions only: 1. a done example in grey (it is: it's), then five contractions to write from their
 *                   words; 2. four contractions of two first words (we're, we'll, they're, they've) to match to their two
 *                   words; 3. three contractions to write the two words for
 *          level 2  1. three contractions to write; 2. three contractions to write the two words for; 3. a done example in
 *                   grey, then three owners with a thing (a picture of an animal, or a child's name, and a picture of the
 *                   thing, each printed with its word) to write as the owner's thing (dog's bowl, Omar's kite)
 *          level 3  1. three cells, to write the contraction or the two words; 2. two sentences (The kite belongs to
 *                   Omar.) to write who owns it; 3. four sentences with one missing apostrophe (contraction or one owner;
 *                   the word stands inside the sentence in two or more) to write the word right; "its" stands only here
 *
 * Handwriting rows are 89 px high; an answer of the key always fits its row in the key font (measured). A gap in a sentence
 * has the width of the longest choice of its page (96 px for two letters, 128 for three, 160 for four), so its width tells
 * nothing, and it has half an inch (89 px) of clear space above it for the letters the child writes; a sentence takes one
 * or two lines (the gap on a line of its own height), at most one sentence of two lines on a page. Ligatures are off on the
 * whole page (fi, ff), and an f before i, f, or l gets room of its own. English only. Themeless: a copy draws other words.
 * PDF only (the answer key is for checks and review). The bank is checked when this file loads (wbFaultsOf); no picture
 * is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/word-building-g2.en.json');
const { _parts } = require('./info-text.js');
const { seatOnRow } = require('../../lib/key-on-row.js');
const { W, esc, shuffle, rowSvg } = _parts;

const ROW = 89;                                     // every handwriting row (half an inch from the top rule to the baseline)
const BAND = 40;                                    // the most blank room between two tasks or under the last one (80 px on a 2x render)
const CLEAR = 89;                                   // the clear space above a gap for the letters a child writes
const GAPW = { 2: 96, 3: 128, 4: 160 };             // a gap for two, three, and four letters
const KEY_PX = 55;                                  // the size of an answer the key seats on an 89 px row (key-on-row.js)
const AP = '’';                                // the apostrophe printed on the page
const pr = (s) => String(s).replace(/'/g, AP);
const PREFIXES = ['un', 're', 'pre'], SUFFIXES = ['ful', 'less', 'ly'];
/** the advance of each letter of Nunito 700 in em (measured 2026-11-17 on a rendered page, canvas measureText) */
const GLYPH_EM = { a: 0.55, b: 0.6, c: 0.47, d: 0.6, e: 0.54, f: 0.36, g: 0.6, h: 0.59, i: 0.26, j: 0.26, k: 0.54, l: 0.32, m: 0.88, n: 0.59, o: 0.58, p: 0.6, q: 0.6, r: 0.39, s: 0.49, t: 0.38, u: 0.58, v: 0.53, w: 0.85, x: 0.55, y: 0.53, z: 0.47, A: 0.74, B: 0.69, C: 0.68, D: 0.76, E: 0.6, F: 0.56, G: 0.74, H: 0.77, I: 0.28, J: 0.35, K: 0.67, L: 0.56, M: 0.87, N: 0.75, O: 0.79, P: 0.65, Q: 0.79, R: 0.69, S: 0.63, T: 0.62, U: 0.74, V: 0.71, W: 1.11, X: 0.67, Y: 0.62, Z: 0.61, "'": 0.25, [AP]: 0.25, ' ': 0.27, '.': 0.27, ',': 0.27, '!': 0.3, '?': 0.5 };
const emOf = (s) => [...String(s)].reduce((n, c) => n + (GLYPH_EM[c] || 0.6), 0);
/** does an answer fit a writing row of w px in the key font (8 px inset each side, 2 px to spare)? */
const fitsRow = (text, w) => emOf(pr(text)) * KEY_PX <= w - 18;
const W2 = Math.floor((W - 24 - 12) / 2), W2O = Math.floor((W - 24 - 18) / 2), W3 = Math.floor((W - 24 - 24) / 3);
/** words with two pronunciations, or words whose letters are not the sounds a child reads (no base may be one) */
const TWO_SOUNDS = ['read', 'bow', 'wind', 'tear', 'live', 'lead', 'close', 'wound', 'dove', 'row', 'sow', 'present', 'record', 'object', 'minute'];
const SUBJECTS = ['I', 'we', 'you', 'they', 'he', 'she', 'it', 'that', 'what', 'here', 'there', 'who'];
const words = (s) => String(s).toLowerCase().match(/[a-z']+/g) || [];
/** the contraction the rule makes of two words (cannot -> can't, let us -> let's; won't is never made) */
function contractionOf(w) {
  if (w === 'cannot') return "can't";
  if (w === 'let us') return "let's";
  const [a, b, x] = w.split(' ');
  if (!a || !b || x) return null;
  if (b === 'not') return ['do', 'is', 'did', 'are', 'was', 'were', 'does', 'have', 'has', 'could', 'would', 'should'].includes(a) ? a + "n't" : null;
  if (!SUBJECTS.includes(a)) return null;
  return { is: a + "'s", are: a + "'re", will: a + "'ll", have: a + "'ve", am: a === 'I' ? "I'm" : null }[b] || null;
}
const KIND_OF = { not: 'not', is: 'is', are: 'are', will: 'will', have: 'have', am: 'am', us: 'us' };
/** an owner's thing as the child writes it, and its letters (at most 8 in a cell of half the page) */
const ownPhrase = (o, t) => o + "'s " + t;
const lettersOf = (s) => (String(s).match(/[A-Za-z]/g) || []).length;

/** What must be true of the word bank before any page prints it. Returns the list of faults (empty = sound). */
function wbFaultsOf(b) {
  const f = [];
  const bad = new Set(b.bad || []);
  if (bad.size < 15) f.push('no list of words a page may never print or let a child build');
  const noBad = (where, text) => { const hit = words(text).map((w) => w.replace(/'s$/, '')).filter((w) => bad.has(w)); if (hit.length) f.push(`${where}: "${text}" holds ${hit.join(', ')}`); };
  for (const [w, p] of Object.entries(b.pics || {})) if (!Array.isArray(p) || p.length !== 2 || !p.every((x) => typeof x === 'string' && x) || /bw( ?\d+)?$/i.test(p[0])) f.push('picture of ' + w + ': not a colour theme and a noun');
  // a sentence with one blank; before a prefix gap no "a" or "an" (it would tell whether the word starts with a vowel)
  const sentenceOk = (s, max, article) => typeof s === 'string' && s.split('___').length === 2 && /[.!?]$/.test(s) && s.length <= max && !(article && /\b(a|an)\s+___/i.test(s)) && /^[A-Z]/.test(s);

  // ---- prefixes
  const P = b.prefix || {};
  const PB = P.bases || {};
  for (const [base, x] of Object.entries(PB)) {
    if (!/^[a-z]+$/.test(base) || TWO_SOUNDS.includes(base) || !['adj', 'verb', 'noun'].includes(x.pos) || !Array.isArray(x.forms) || !x.forms.length || x.forms.some((p) => !PREFIXES.includes(p))) f.push(`prefix base "${base}": no word, a word with two sounds, or forms outside un, re, pre`);
    (x.forms || []).forEach((p) => { if (bad.has(p + base)) f.push(`prefix: ${p}${base} is on the list of words never to build`); });
  }
  const pMean = (p, base) => (p === 'un' ? (PB[base].pos === 'adj' ? 'not ' + base : 'the opposite of ' + base) : p === 're' ? base + ' again' : base + ' before');
  const pSplit = (w) => { const p = PREFIXES.find((q) => w.startsWith(q) && PB[w.slice(q.length)] && PB[w.slice(q.length)].forms.includes(q)); return p ? { p, base: w.slice(p.length) } : null; };
  for (const [w, m] of Object.entries(P.meanings || {})) { const s = pSplit(w); if (!s || m !== pMean(s.p, s.base) || !fitsRow(w, W2)) f.push(`prefix meaning of "${w}": no word of the bank, not "${s ? pMean(s.p, s.base) : '?'}", or wider than its row`); }
  for (const w of ['undo', 'unroll', 'rename', 'preschool']) if ((P.meanings || {})[w]) f.push(`prefix: "${w}" is asked by a meaning it does not have`);
  // a re- word a child writes from its meaning is one a second grader hears (never relock, reopen, recheck, remake, replant, revisit)
  const RE_HEARD = ['redo', 'retie', 'repack', 'refill', 'reheat', 'rewrite', 'replay', 'repaint', 'restart', 'rebuild', 'reload', 'rewrap', 'refold', 'retell', 'reuse'];
  for (const w of Object.keys(P.meanings || {})) if (pSplit(w) && pSplit(w).p === 're' && !RE_HEARD.includes(w)) f.push(`prefix: "${w}" is no re- word a second grader hears, so it is never asked by its meaning`);
  if (PB.lock && (PB.lock.forms || []).includes('re')) f.push('prefix: lock takes un- only (relock is a word no second grader meets)');
  for (const p of PREFIXES) if (Object.keys(P.meanings || {}).filter((w) => pSplit(w) && pSplit(w).p === p).length < (p === 'pre' ? 2 : 12)) f.push(`prefix: too few ${p}- words to ask by meaning`);
  (P.l1Build || []).forEach((base) => { if (!PB[base] || !PB[base].forms.includes('un') || !fitsRow('un' + base, W2)) f.push(`prefix level 1: "${base}" takes no un-, or un${base} is wider than its row`); });
  if ((P.l1Build || []).length < 14) f.push('prefix level 1: fewer than fourteen bases to add un- to');
  (P.choose || []).forEach((c) => {
    const base = c.right.length < c.wrong.length ? c.right : c.wrong;
    if (!sentenceOk(c.text, 52, true) || !PB[base] || !PB[base].forms.includes('un') || [c.right, c.wrong].sort().join() !== [base, 'un' + base].sort().join()) f.push(`prefix level 1: "${c.text}" has not one blank and a base with its un- word`);
    noBad('prefix sentence', c.text);
  });
  if ((P.choose || []).filter((c) => c.right.startsWith('un')).length < 8 || (P.choose || []).filter((c) => !c.right.startsWith('un')).length < 6) f.push('prefix level 1: the right words of the sentences are not both kinds (the un- word and the base) often enough');
  if (new Set((P.choose || []).map((c) => c.right)).size !== (P.choose || []).length) f.push('prefix level 1: two sentences have one right word');
  (P.match || []).forEach((base) => { if (!PB[base] || base === 'lock' || !['un', 're'].every((p) => (P.meanings || {})[p + base])) f.push(`prefix level 2: "${base}" has no common un- word and re- word to ask by meaning`); });
  if ((P.match || []).length < 5) f.push('prefix level 2: fewer than five bases to match');
  (P.gaps || []).forEach((g) => {
    const x = PB[g.base];
    if (!sentenceOk(g.text, 75, true) || !gapLines(g.text, '___' + g.base, g.answer + g.base, 0, g.answer, 22, g.answer === 'pre' ? GAPW[3] : GAPW[2]) || !x || g.text.split('___' + g.base).length !== 2 || /[a-z]/i.test(g.text.split('___' + g.base)[1][0] || '') || !x.forms.includes(g.answer)) { f.push(`prefix gap: "${g.text}" has not one gap before "${g.base}", or ${g.answer}${g.base} is no word`); return; }
    const other = x.forms.filter((p) => p !== g.answer);
    if (other.slice().sort().join() !== (g.rivals || []).slice().sort().join()) f.push(`prefix gap: "${g.text}" (${g.answer}${g.base}): the other real words ${other.map((p) => p + g.base).join(', ') || '(none)'} are not all declared as read and rejected`);
    noBad('prefix gap', g.text);
  });
  for (const p of PREFIXES) if ((P.gaps || []).filter((g) => g.answer === p).length < (p === 'pre' ? 2 : 10)) f.push(`prefix: too few gap sentences for ${p}`);
  const both = [...new Set((P.gaps || []).map((g) => g.base))].filter((base) => ['un', 're'].every((p) => (P.gaps || []).some((g) => g.base === base && g.answer === p)));
  if (both.length < 5) f.push('prefix: fewer than five bases whose un- word and re- word both have a sentence that decides between them');
  (P.samples || []).forEach((s) => {
    if (!Array.isArray(s.words) || s.words.length !== 2 || s.words[0] === s.words[1] || s.words.some((w) => !(P.meanings || {})[w] || !pSplit(w)) || s.words.some((w) => !new RegExp('\\b' + w + '\\b', 'i').test(s.text)) || !/[.!?]$/.test(s.text) || pSplit(s.words[0]).base === pSplit(s.words[1]).base && s.words.join() !== 'untie,retie' && s.words.join() !== 'unfold,refold') f.push(`prefix sample: "${s.text}" does not use its two words`);
    noBad('prefix sample', s.text);
  });
  if ((P.samples || []).length < 12) f.push('prefix level 3: fewer than twelve sample sentences');

  // ---- suffixes
  const S = b.suffix || {};
  const SB = S.bases || {};
  for (const [base, forms] of Object.entries(SB)) {
    if (!/^[a-z]+$/.test(base) || TWO_SOUNDS.includes(base) || !Array.isArray(forms) || !forms.length || forms.some((s) => !SUFFIXES.includes(s))) f.push(`suffix base "${base}": no word, a word with two sounds, or forms outside ful, less, ly`);
    if (/[^aeiou]y$/.test(base)) f.push(`suffix base "${base}" changes its spelling (y to i)`);
    forms.forEach((s) => { if (bad.has(base + s)) f.push(`suffix: ${base}${s} is on the list of words never to build`); });
  }
  const sMean = (s, base) => (s === 'ful' ? 'full of ' + base : s === 'less' ? 'without ' + ({ spot: 'spots', seed: 'seeds', tooth: 'teeth', end: 'an end' }[base] || base) : 'in a ' + base + ' way');
  const sSplit = (w) => { const s = SUFFIXES.find((q) => w.endsWith(q) && SB[w.slice(0, -q.length)] && SB[w.slice(0, -q.length)].includes(q)); return s ? { s, base: w.slice(0, -s.length) } : null; };
  (S.words || []).forEach((w) => { if (!sSplit(w)) f.push(`suffix word to mark "${w}": no base and suffix of the bank`); });
  for (const s of SUFFIXES) if ((S.words || []).filter((w) => sSplit(w) && sSplit(w).s === s).length < 12) f.push(`suffix: fewer than twelve -${s} words to mark`);
  for (const [w, m] of Object.entries(S.meanings || {})) { const s = sSplit(w); if (!s || m !== sMean(s.s, s.base) || !(S.words || []).includes(w) || !fitsRow(w, W2)) f.push(`suffix meaning of "${w}": no word of the bank, not its meaning, or wider than its row`); }
  // these words do not mean what the rule says: full of thanks (thanksful), wonderful (very good), useful, harmful
  for (const w of ['thankful', 'wonderful', 'useful', 'useless', 'harmful', 'harmless']) if ((S.meanings || {})[w]) f.push(`suffix: "${w}" is asked by a meaning it does not have`);
  for (const s of SUFFIXES) if (Object.keys(S.meanings || {}).filter((w) => sSplit(w) && sSplit(w).s === s).length < 12) f.push(`suffix: fewer than twelve -${s} words with a meaning`);
  (S.choose || []).forEach((c) => {
    const base = c.right.length < c.wrong.length ? c.right : c.wrong;
    if (!sentenceOk(c.text, 52) || !SB[base] || !SB[base].includes('ful') || [c.right, c.wrong].sort().join() !== [base, base + 'ful'].sort().join()) f.push(`suffix level 1: "${c.text}" has not one blank and a base with its -ful word`);
    noBad('suffix sentence', c.text);
  });
  if ((S.choose || []).filter((c) => c.right.endsWith('ful')).length < 8 || (S.choose || []).filter((c) => !c.right.endsWith('ful')).length < 6) f.push('suffix level 1: the right words of the sentences are not both kinds often enough');
  (S.match || []).forEach((base) => { if (!SB[base] || !['ful', 'less'].every((s) => (S.meanings || {})[base + s])) f.push(`suffix level 2: "${base}" has no -ful word and -less word with a meaning`); });
  if ((S.match || []).length < 6) f.push('suffix: fewer than six bases to match');
  (S.gaps || []).forEach((g) => {
    const forms = SB[g.base];
    const parts = g.text.split(g.base + '___');
    if (!sentenceOk(g.text, 62) || !gapLines(g.text, g.base + '___', g.base + g.answer, g.base.length, g.answer, 22, GAPW[4]) || !forms || parts.length !== 2 || /[a-z]/i.test(parts[0].slice(-1)) || !forms.includes(g.answer)) { f.push(`suffix gap: "${g.text}" has not one gap after "${g.base}", or ${g.base}${g.answer} is no word`); return; }
    const other = forms.filter((s) => s !== g.answer);
    if (other.slice().sort().join() !== (g.rivals || []).slice().sort().join()) f.push(`suffix gap: "${g.text}" (${g.base}${g.answer}): the other real words are not all declared as read and rejected`);
    // an -ly word stands before its verb or at the end of a sentence whose bare word is no good speech: never right after
    // walk, bark, talk, hop, shine, dress, write (walks slow, shine bright)
    if (g.answer === 'ly' && /\b(walks?|barks?|talk|hops?|shines?|dress|write)\s+\w*___/i.test(g.text)) f.push(`suffix gap: "${g.text}" reads well without -ly`);
    noBad('suffix gap', g.text);
  });
  for (const s of SUFFIXES) if ((S.gaps || []).filter((g) => g.answer === s).length < 10) f.push(`suffix: fewer than ten gap sentences for ${s}`);
  const sBoth = [...new Set((S.gaps || []).map((g) => g.base))].filter((base) => ['ful', 'less'].every((s) => (S.gaps || []).some((g) => g.base === base && g.answer === s)));
  if (sBoth.length < 6) f.push('suffix: fewer than six bases whose -ful and -less words both have a sentence that decides between them');
  (S.traps || []).forEach((t) => { if (!/^[a-z]+$/.test(t) || !SUFFIXES.some((s) => t.endsWith(s)) || sSplit(t) || SB[t.replace(/(ful|less|ly)$/, '')]) f.push(`suffix trap "${t}": it has no suffix letters, or a base of the bank is in it`); });
  if ((S.traps || []).length < 4) f.push('suffix: fewer than four words to cross out');

  // ---- apostrophes
  const A = b.apostrophe || {};
  const C = A.contractions || [];
  C.forEach((c) => { if (contractionOf(c.words) !== c.c || !KIND_OF[c.kind] || (c.kind !== 'not' && c.words.split(' ')[1] !== c.kind) || (c.kind === 'not' && !/not$/.test(c.words)) || c.c.length > 8 || !fitsRow(c.c, W3)) f.push(`contraction "${c.c}" is not the contraction of "${c.words}" (${c.kind}), or wider than a row of a third of the page`); });
  if (new Set(C.map((c) => c.c)).size !== C.length) f.push('a contraction stands twice');
  if (C.length < 24) f.push('fewer than 24 contractions');
  if (C.some((c) => /^won/.test(c.c))) f.push("won't is given only, never asked");
  if (!C.some((c) => c.c === "it's")) f.push("no it's for the done example of level 1");
  // a contraction to write the two words for: never an 's (he's is he is OR he has); the words fit a third of the page
  const splitable = C.filter((c) => c.kind !== 'is' && c.words.includes(' ') && fitsRow(c.words, W3));
  if (splitable.length < 12) f.push('fewer than twelve contractions whose two words fit a row of a third of the page');
  for (const [a, ts] of Object.entries(A.animalPairs || {})) { if (!(b.pics || {})[a]) f.push(`owner "${a}" has no picture`); ts.forEach((t) => { if (!(b.pics || {})[t] || lettersOf(ownPhrase(a, t)) > 8) f.push(`thing "${t}" has no picture, or ${a}'s ${t} has more than 8 letters`); }); }
  if ((A.animalPairs || {}).cat && (A.animalPairs.cat.length !== 1 || A.animalPairs.cat[0] !== 'bowl')) f.push('the cat owns only the bowl');
  (A.nameThings || []).forEach((t) => { if (!(b.pics || {})[t] || t === 'sock') f.push(`thing "${t}" has no picture, or is one of a pair (sock)`); });
  (A.names || []).forEach((n) => { if (!/^[A-Z][a-z]{2,3}$/.test(n) || /[sxz]$/.test(n)) f.push(`name "${n}": not a short name that takes 's`); });
  if (new Set(A.names || []).size < 20) f.push('fewer than twenty names');
  const noFix = new Set(A.noFix || []);
  if (!['well', 'were', 'hell', 'shell', 'ill'].every((w) => noFix.has(w))) f.push('the list of contractions that are real words without their apostrophe is not complete');
  const bare = new Set(C.map((c) => c.c.replace("'", '').toLowerCase()));
  (A.fix || []).forEach((x) => {
    const toks = x.text.match(/[A-Za-z']+/g) || [];
    const at = toks.indexOf(x.wrong);
    const ok = toks.filter((t) => t === x.wrong).length === 1 && x.right.replace("'", '') === x.wrong && /[.!?]$/.test(x.text) && !x.text.includes("'") && !noFix.has(x.wrong.toLowerCase());
    // one owner: a name of the list (anywhere), or "the baby"; never "the dogs" (it could be two dogs)
    const kindOk = x.kind === 'c' ? C.some((c) => c.c.toLowerCase() === x.right.toLowerCase()) : x.kind === 'p' && /'s$/.test(x.right) && ((A.names || []).includes(x.right.slice(0, -2)) || (x.right === "baby's" && /^(The|the)$/.test(toks[at - 1] || '')));
    const others = toks.filter((t) => t !== x.wrong && bare.has(t.toLowerCase()));
    if (!ok || !kindOk || others.length) f.push(`fix sentence "${x.text}": not one word that needs one apostrophe (${x.wrong} -> ${x.right}), or another word could take one`);
    noBad('fix sentence', x.text);
  });
  if ((A.fix || []).filter((x) => x.kind === 'c').length < 8 || (A.fix || []).filter((x) => x.kind === 'p').length < 6) f.push('too few sentences to fix of each kind');
  if ((A.fix || []).filter((x) => (x.text.match(/[A-Za-z']+/g) || [])[0] !== x.wrong).length < 8) f.push('fewer than eight sentences to fix whose word stands inside the sentence');
  return f;
}

const LEVELS = {
  prefix: {
    1: { build: 3, bcols: 2, mean: 5, meanMax: 20, sents: 3, pfont: 26, mfont: 22, pill: 22, sfont: 22, pad: 8 },
    2: { write: 2, wcols: 2, match: 4, gaps: 3, wfont: 24, mword: 26, mmean: 22, gfont: 22, pad: 9 },
    3: { write: 2, wcols: 2, gaps: 3, wfont: 24, gfont: 22, rows: 2, pad: 7 },
  },
  suffix: {
    1: { mark: 5, mcols: 3, mfont: 36, write: 3, wcols: 2, sents: 4, spad: 6, wfont: 24, pill: 22, sfont: 22, pad: 10 },
    2: { mark: 6, mcols: 3, mfont: 34, match: 4, mword: 26, mmean: 22, gaps: 3, gfont: 22, pad: 10 },
    3: { mark: 6, traps: 1, mcols: 4, mfont: 32, match: 4, mword: 26, mmean: 22, gaps: 3, gfont: 22, pad: 7 },
  },
  apostrophe: {
    1: { join: 5, jcols: 3, match: 4, mword: 28, mmean: 24, split: 3, scols: 3, wfont: 26, pad: 10 },
    2: { join: 3, jcols: 3, split: 3, scols: 3, own: 3, ocols: 2, wfont: 26, pic: 64, pad: 9 },
    3: { mixed: 6, mcols: 3, ownSent: 2, ocols: 2, fix: 4, fcols: 2, wfont: 24, sfont: 22, pad: 7 },
  },
};
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks

/** In this font an f before i, f, or l touches the next letter even with ligatures off (the i of "fill" loses its dot):
 *  every printed f before i, f, or l gets a little room of its own. Text inside tags, <svg> and <style> is left alone. */
function fRoom(html) {
  let out = '', i = 0, inSvg = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); const tag = html.slice(i, j + 1); if (/^<svg\b/i.test(tag)) inSvg++; else if (/^<\/svg>/i.test(tag)) inSvg--; out += tag; i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += inSvg ? text : text.replace(/f(?=[ifl])/g, '<span data-lcs-fsep style="margin-right:0.07em">f</span>');
    i = j < 0 ? html.length : j;
  }
  return out;
}
const PICS = BANK.pics || {};
const img = (w, size) => `<img class="ws-icon" data-lcs-pic="${esc(w)}" src="${fileUri(PICS[w][0], PICS[w][1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const cream = (attrs, inner, pad = 8, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:6px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 20) => `<div data-lcs-label data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
const orList = (xs) => (xs.length === 2 ? `${teal(xs[0])} or ${teal(xs[1])}` : xs.slice(0, -1).map(teal).join(', ') + `, or ${teal(xs[xs.length - 1])}`);
/** a word to circle (the key rings the right one) */
const pill = (text, ok, key, font, kind, padX = 12) => `<span data-lcs-pill${ok ? ' data-lcs-ok="1"' : ''} data-lcs-kind="${kind}" style="flex:0 0 auto;font:800 ${font}px/1.15 'Nunito',sans-serif;color:${T.ink};padding:2px ${padX}px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(pr(text))}</span>`;
/** a writing row of 89 px; the key seats the answer in teal, a done example in grey on every page (every answer is chosen
 *  to fit its row in the key font, so the text is never squeezed) */
const row = (w, answer, key, example) => {
  const base = rowSvg(w, ROW);
  const shown = key || example ? seatOnRow(base, pr(answer), { fill: example ? T.inkSoft : T.teal, em: 0.3 }) : base;
  return `<div data-lcs-line${key ? ` data-lcs-answer="${esc(pr(answer))}"` : ''} style="line-height:0">${shown}</div>`;
};
/** a cell to write in: what to read above a row; `answer` is what the row takes; `after` stands under the row (the key) */
const writeCell = (attrs, promptHtml, answer, w, key, example, font, after = '', before = '') => `<div ${attrs} data-lcs-wcell="${esc(pr(answer))}"${example ? ' data-lcs-example="1"' : ''} style="display:flex;flex-direction:column;gap:3px;min-width:0"><div data-lcs-prompt data-lcs-read style="font:700 ${font}px/1.2 'Nunito',sans-serif;color:${example ? T.inkSoft : T.ink};padding-left:6px">${promptHtml}</div>${before}${row(w, answer, key, example)}${after}</div>`;
const grid = (cols, cells, gap = 12) => `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:8px ${gap}px">${cells.join('')}</div>`;
const cellW = (cols, gap = 12) => Math.floor((W - 24 - gap * (cols - 1)) / cols);
/** a place to write letters into a printed word: every gap of a page has one width; the key prints its letters */
const gapBox = (g, key, font, width, tight) => `<span data-lcs-gap="${g}" style="display:inline-block;width:${width}px;height:${Math.round(font * 1.15)}px;margin:0 ${tight ? 0 : 3}px 0 3px;border-bottom:3.5px solid ${T.ink};text-align:center;color:${T.teal};font:800 ${font}px/1.1 'Nunito',sans-serif">${key ? g : ''}</span>`;
const gapWord = (word, at, g, key, font, width, tail = '') => {
  const core = `<span data-lcs-gapword="${word}" style="display:inline-flex;align-items:flex-end;font:800 ${font}px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(word.slice(0, at))}${gapBox(g, key, font, width, !!tail && at + g.length === word.length)}${esc(word.slice(at + g.length))}</span>`;
  return tail ? `<span style="display:inline-flex;align-items:flex-end">${core}<span data-lcs-tail>${esc(tail)}</span></span>` : core;
};
/** a sentence split at its blank; punctuation right after the blank stays with the word (no space before a period) */
const splitAt = (text, mark = '___') => { const [a, b] = text.split(mark); const m = b.match(/^[.!?,]+/); return { a: a.trim(), tail: m ? m[0] : '', b: (m ? b.slice(m[0].length) : b).trim() }; };
const GAP_LINE_W = 615;   // what one printed line of a gap sentence may hold (the card holds 637 px)
/** the lines of a gap sentence: one if it fits, else two with the gap on the FIRST line and two words or more on the second
 *  (the clear space above a gap then stands between two sentences, never inside one); null when that cannot be printed (the sentence is not drawn). Widths
 *  are measured with the glyph table (text 700, the word 800). */
function gapLines(text, mark, word, at, g, font, width) {
  const { a, tail, b } = splitAt(text.replace(mark, '§'), '§');
  const tw = (s) => (s ? emOf(s) * font : 0);
  const gw = emOf(word.slice(0, at) + word.slice(at + g.length) + tail) * (font + 3) * 1.04 + width + 6;
  const lineW = (aw, bw) => [aw ? tw(aw) : 0, gw, bw ? tw(bw) : 0].filter((x, i) => i === 1 || x).reduce((s, x) => s + x, 0) + 8 * ((aw ? 1 : 0) + (bw ? 1 : 0));
  if (lineW(a, b) <= GAP_LINE_W) return [{ a, b, gap: true }];
  const bw = b ? b.split(' ') : [];
  for (let k = bw.length - 1; k >= 0; k--) { const b1 = bw.slice(0, k).join(' '), b2 = bw.slice(k).join(' '); if (b2.split(' ').length >= 2 && lineW(a, b1) <= GAP_LINE_W && tw(b2) <= GAP_LINE_W) return [{ a, b: b1, gap: true }, { a: b2, b: '', gap: false, plain: true }]; }
  return null;
}
/** n places for a two-way choice: both used, never three in a row in one place, never four that alternate */
function twoWay(n, rng) { for (let k = 0; k < 100; k++) { const p = Array.from({ length: n }, () => rng.int(0, 1)); if (n < 2 || (new Set(p).size === 2 && !p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2]) && !fourAlternate(p))) return p; } return Array.from({ length: n }, (_, i) => i % 2); }
/** n places for a three-way choice: every place used, never three in a row in one place, no staircase */
function threeWay(n, rng) {
  for (let k = 0; k < 300; k++) {
    const p = Array.from({ length: n }, () => rng.int(0, 2));
    if (n >= 3 && new Set(p).size < 3) continue;
    if (p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) continue;
    if (p.some((x, i) => i >= 2 && ((p[i - 2] + 1 === p[i - 1] && p[i - 1] + 1 === x) || (p[i - 2] - 1 === p[i - 1] && p[i - 1] - 1 === x)))) continue;
    return p;
  }
  return [1, 0, 2, 1].slice(0, n);
}
/** four answers that alternate (a b a b) somewhere in a sequence */
const fourAlternate = (s) => s.some((x, i) => i >= 3 && x !== s[i - 1] && s[i - 2] === x && s[i - 3] === s[i - 1]);
/** a sequence of kinds for n gap sentences: two kinds or more, never three of one in a row, no staircase, never four
 *  alternating answers */
function kindSeq(n, kinds, rng, must) {
  for (let k = 0; k < 400; k++) {
    const s = Array.from({ length: n }, () => kinds[rng.int(0, kinds.length - 1)]);
    if (new Set(s).size < 2 || (must && !s.includes(must))) continue;
    if (s.some((x, i) => i >= 2 && x === s[i - 1] && x === s[i - 2])) continue;
    const ix = s.map((x) => kinds.indexOf(x));
    if (ix.some((x, i) => i >= 2 && ((ix[i - 2] + 1 === ix[i - 1] && ix[i - 1] + 1 === x) || (ix[i - 2] - 1 === ix[i - 1] && ix[i - 1] - 1 === x)))) continue;
    if (fourAlternate(s)) continue;
    return s;
  }
  return null;
}
/** an order of the right-hand column of a matching task: nobody straight across, three different line offsets or more
 *  (so not every meaning stands the same number of rows away) */
function matchPerm(n, rng) {
  for (let k = 0; k < 300; k++) { const p = shuffle([...Array(n).keys()], rng); const d = p.map((j, i) => j - i); if (d.every((x) => x !== 0) && new Set(d).size >= 3) return p; }
  return null;
}

// the bank is checked when this file loads (after the helpers it uses are defined)
{ const f = wbFaultsOf(BANK); if (f.length) throw new Error('word-building-g2.en.json: ' + f.join('; ')); }

function makeWordBuildingType({ id, slug, mode, i18n, exerciseType }) {
  const LV = LEVELS[mode];
  if (!LV) throw new Error('word-building-g2: unknown mode ' + mode);
  return {
    id, slug, gradeBand: 'G2', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: LV,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English words (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = LV[lv] || LV[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const blocks = [], items = [];
      const usedBase = new Set();
      // the copy number (variant): the first copies of a level take different match pairs (level 2) and different sample
      // sentences (level 3), so no two of them share most of their items; without it the draw is random
      const copyNo = Number(ctx && (ctx.seedVariant || ctx.variant)) || 0;
      const nth = (list, step) => (copyNo ? list[((copyNo - 1) * step) % list.length] : list[rng.int(0, list.length - 1)]);
      const free = (list, n, more = () => true) => { const got = shuffle(list.filter((x) => !usedBase.has(x) && more(x)), rng).slice(0, n); got.forEach((x) => usedBase.add(x)); return got; };

      /** a matching task: words on the left, what they mean on the right, a line from each word to its meaning */
      function matchBlock(k, pairs, instr, fw, fm) {
        const H = 44, G = 6, n = pairs.length;
        const left = shuffle(pairs, rng);
        const perm = matchPerm(n, rng);   // right row j shows left[perm[j]]
        const yc = (i) => i * (H + G) + H / 2, Ht = n * H + (n - 1) * G;
        const LW = 200, GW = 120, RW = 300;
        const lines = key ? left.map((x, i) => { const j = perm.indexOf(i); return `<line data-lcs-keyline="${i}-${j}" x1="7" y1="${yc(i)}" x2="${GW - 7}" y2="${yc(j)}" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>`; }).join('') : '';
        const dots = left.map((_, i) => `<circle cx="7" cy="${yc(i)}" r="7" fill="${T.ink}"/><circle cx="${GW - 7}" cy="${yc(i)}" r="7" fill="${T.ink}"/>`).join('');
        items.push(...left.map((x) => 'match:' + x.w));
        return cream('data-lcs-matchcard="1"', label(`${num(k)}${instr}`) +
          `<div data-lcs-match="${n}" style="display:grid;grid-template-columns:${LW}px ${GW}px ${RW}px;justify-content:center;align-items:start">` +
          `<div style="display:flex;flex-direction:column;gap:${G}px">${left.map((x, i) => `<div data-lcs-mword="${esc(pr(x.w))}" data-lcs-row="${i}" data-lcs-read style="height:${H}px;box-sizing:border-box;display:flex;align-items:center;justify-content:flex-end;padding-right:14px;font:800 ${fw}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(pr(x.w))}</div>`).join('')}</div>` +
          `<svg data-lcs-gutter width="${GW}" height="${Ht}" viewBox="0 0 ${GW} ${Ht}" style="display:block">${lines}${dots}</svg>` +
          `<div style="display:flex;flex-direction:column;gap:${G}px">${perm.map((s, j) => `<div data-lcs-mmean="${esc(pr(left[s].w))}" data-lcs-row="${j}" data-lcs-read style="height:${H}px;box-sizing:border-box;display:flex;align-items:center;padding-left:14px;font:700 ${fm}px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(pr(left[s].m))}</div>`).join('')}</div></div>`, d.pad);
      }
      /** sentences with a gap; `kinds` are the letters a gap may take (named in the line), every gap of the page as wide as
       *  the longest; the line that holds a gap has half an inch of clear space above it */
      const gapWidth = (kinds) => GAPW[Math.max(...kinds.map((x) => x.length))];
      const layoutOf = (r, kinds) => gapLines(r.text, r.mark, r.full, r.at, r.g, d.gfont, gapWidth(kinds));
      function gapBlock(k, rows, kinds, instr) {
        const width = gapWidth(kinds);
        items.push(...rows.map((r) => 'gap:' + r.full));
        const pad = CLEAR - Math.round((d.gfont + 3) * 1.15) + 4;
        return cream(`data-lcs-gapcard="1" data-lcs-kinds="${kinds.join(',')}"`, label(`${num(k)}${instr}`) +
          rows.map((r) => { const { tail } = splitAt(r.text.replace(r.mark, '§'), '§');
            return `<div data-lcs-gaprow="${r.full}" data-lcs-sp="${r.g}" data-lcs-read style="display:flex;flex-direction:column;font:700 ${d.gfont}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:0 0 2px 14px">` +
              layoutOf(r, kinds).map((ln) => `<div data-lcs-gapline${ln.gap ? '="gap"' : ''} style="display:flex;align-items:flex-end;gap:0 8px;white-space:nowrap;padding-top:${ln.gap ? pad : 0}px">${ln.a ? `<span>${esc(pr(ln.a))}</span>` : ''}${ln.gap ? gapWord(r.full, r.at, r.g, key, d.gfont + 3, width, tail) : ''}${ln.b ? `<span>${esc(pr(ln.b))}</span>` : ''}</div>`).join('') + `</div>`; }).join(''), d.pad);
      }
      /** sentences with two words to circle (a base and the word built on it) */
      function chooseBlock(k, sents) {
        const at = twoWay(sents.length, rng);
        items.push(...sents.map((c) => 'sent:' + c.right));
        return cream('data-lcs-choose="1"', label(`${num(k)}Read each sentence. Circle the word that fits.`) + sents.map((c, i) => {
          const two = [[c.right, true], [c.wrong, false]]; if (at[i]) two.reverse();
          const longer = c.right.length > c.wrong.length ? c.right : c.wrong;
          const { a, tail, b: b2 } = splitAt(c.text);
          return `<div data-lcs-sentence="${c.right}" data-lcs-pair="${longer}|${longer === c.right ? c.wrong : c.right}" data-lcs-read style="display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;font:700 ${d.sfont}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:${d.spad || 4}px 0 ${d.spad || 4}px 14px">${a ? `<span>${esc(pr(a))}</span>` : ''}<span style="display:inline-flex;align-items:center"><span style="display:inline-flex;align-items:center;gap:4px">${two.map(([w, okk]) => pill(w, okk, key, d.pill, w === longer ? 'built' : 'base', 10)).join('')}</span>${tail ? `<span data-lcs-tail>${esc(tail)}</span>` : ''}</span>${b2 ? `<span>${esc(pr(b2))}</span>` : ''}</div>`;
        }).join(''), d.pad);
      }
      const pick = (list, test, tries = 600) => { for (let k = 0; k < tries; k++) { const x = test(); if (x) return x; } throw new Error(`${id}: no copy could be drawn (${list})`); };
      /** gap sentences for a sequence of kinds: bases unused and different, each one printable in two lines or fewer, at most
       *  one of two lines; `more` asks more of the set */
      const drawGaps = (pool, seq, kinds, rowOf, more = () => true) => {
        const got = [], bs = new Set(); let two = 0;
        for (const kd of seq) {
          const g = shuffle(pool.filter((x) => x.answer === kd && !usedBase.has(x.base) && !bs.has(x.base) && layoutOf(rowOf(x), kinds) && (two < 1 || layoutOf(rowOf(x), kinds).length === 1)), rng)[0];
          if (!g) return null;
          got.push(g); bs.add(g.base); if (layoutOf(rowOf(g), kinds).length === 2) two++;
        }
        return more(got) ? got : null;
      };

      // =============================================================== PREFIX
      if (mode === 'prefix') {
        const P = BANK.prefix, PB = P.bases, M = P.meanings;
        const meanWords = (ps) => Object.keys(M).filter((w) => ps.some((p) => w.startsWith(p) && PB[w.slice(p.length)] && PB[w.slice(p.length)].forms.includes(p)));
        const split = (w) => { const p = PREFIXES.find((q) => w.startsWith(q) && PB[w.slice(q.length)] && PB[w.slice(q.length)].forms.includes(q)); return { p, base: w.slice(p.length) }; };
        const pTag = (p, base, example) => `${example ? p : teal(p)} + ${esc(base)}`;
        const rowOf = (g) => ({ text: g.text, mark: '___' + g.base, full: g.answer + g.base, at: 0, g: g.answer });
        /** a base that takes two of the prefixes offered (the sentence decides between two real words) */
        const twoTaken = (g, kinds) => PB[g.base].forms.filter((p) => kinds.includes(p)).length >= 2;
        if (lv === 1) {
          // 3. the sentences (they take three bases first)
          const sents = pick('prefix choose', () => { const s = shuffle(P.choose, rng).slice(0, d.sents); const bs = s.map((c) => (c.right.length < c.wrong.length ? c.right : c.wrong)); const tr = s.filter((c) => c.right.startsWith('un')).length; return new Set(bs).size === s.length && tr >= 1 && tr < s.length ? s : null; });
          sents.forEach((c) => usedBase.add(c.right.length < c.wrong.length ? c.right : c.wrong));
          // 2. the meanings: the un- word, its base, and another un- word
          const mBases = free(meanWords(['un']).filter((w) => M[w].length <= d.meanMax).map((w) => w.slice(2)), d.mean);
          const others = free(P.l1Build.filter((b) => b !== 'do' && b.length <= 6), d.mean);
          const at = threeWay(d.mean, rng);
          // 1. the bases to add un- to (a done example and d.build more)
          const bBases = free(P.l1Build, d.build + 1);
          const cw = cellW(d.bcols);
          blocks.push(cream('data-lcs-buildcard="1"', label(`${num(1)}Add ${teal('un-')}. Write the new word. Read your new words to a partner.`) +
            grid(d.bcols, bBases.map((b, i) => writeCell(`data-lcs-build="${b}" data-lcs-pre="un"`, pTag('un', b, i === 0), 'un' + b, cw, key, i === 0, d.pfont))), d.pad));
          items.push(...bBases.slice(1).map((b) => 'build:un' + b));
          blocks.push(cream('data-lcs-meancard="1"', label(`${num(2)}Read the meaning. Circle the word that means it.`) +
            mBases.map((b, i) => { const list = ['un' + b, b, 'un' + others[i]]; const wrong = shuffle(list.slice(1), rng); const three = wrong.slice(); three.splice(at[i], 0, list[0]);
              return `<div data-lcs-meanrow="un${b}" style="display:flex;align-items:center;gap:8px;padding:2px 0 2px 14px"><span data-lcs-meantext data-lcs-read style="flex:0 0 218px;font:700 ${d.mfont}px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(M['un' + b])}</span>${three.map((w) => pill(w, w === list[0], key, d.pill, w === b ? 'base' : 'built', 8)).join('')}</div>`; }).join(''), d.pad));
          items.push(...mBases.map((b) => 'mean:un' + b));
          blocks.push(chooseBlock(3, sents));
        }
        if (lv === 2) {
          const kinds = ['un', 're'];
          // 2. the matching: two bases, each with un- and re-
          const pairs = P.match.flatMap((a, i) => P.match.slice(i + 1).map((b) => [a, b]));
          const mb = shuffle(nth(pairs, 3), rng); mb.forEach((b) => usedBase.add(b));
          // 3. the gaps: three sentences, each draws its prefix; two of them at least on a base that takes un- and re-
          const gaps = pick('prefix gaps', () => { const seq = kindSeq(d.gaps, kinds, rng); return seq && drawGaps(P.gaps, seq, kinds, rowOf, (got) => got.filter((g) => twoTaken(g, kinds)).length >= 2); });
          gaps.forEach((g) => usedBase.add(g.base));
          // 1. the meanings to write: one un- word and one re- word of other bases
          const wr = pick('prefix write', () => { const ws = shuffle(meanWords(kinds).filter((w) => !usedBase.has(split(w).base)), rng); const got = []; const bs = new Set(); for (const w of ws) { const s = split(w); if (bs.has(s.base)) continue; got.push(w); bs.add(s.base); if (got.length === d.write) break; } return new Set(got.map((w) => split(w).p)).size === 2 ? got : null; });
          wr.forEach((w) => usedBase.add(split(w).base));
          const cw = cellW(d.wcols);
          blocks.push(cream('data-lcs-writecard="1"', label(`${num(1)}Read the meaning. Write the new word with ${teal('un-')} or ${teal('re-')}.`) +
            grid(d.wcols, wr.map((w) => writeCell(`data-lcs-write="${w}"`, esc(M[w]), w, cw, key, false, d.wfont))), d.pad));
          items.push(...wr.map((w) => 'write:' + w));
          blocks.push(matchBlock(2, mb.flatMap((b) => kinds.map((p) => ({ w: p + b, m: M[p + b] }))), 'Read each word. Draw a line to its meaning.', d.mword, d.mmean));
          blocks.push(gapBlock(3, gaps.map(rowOf), kinds, `Read each sentence. Write ${orList(kinds)} to finish the word.`));
        }
        if (lv === 3) {
          const kinds = ['un', 're', 'pre'];
          // 1. the two words of a sample sentence (the key prints it for part 3)
          const smp = nth(P.samples, 7);
          smp.words.forEach((w) => usedBase.add(split(w).base));
          const hasPre = smp.words.some((w) => split(w).p === 'pre');
          // 2. the gaps: three sentences, each draws its prefix (pre- on the page at least once); two at least on a base
          //    that takes two of the offered prefixes
          const gaps = pick('prefix gaps', () => { const seq = kindSeq(d.gaps, kinds, rng, hasPre ? null : 'pre'); return seq && drawGaps(P.gaps, seq, kinds, rowOf, (got) => got.filter((g) => twoTaken(g, kinds)).length >= 2); });
          gaps.forEach((g) => usedBase.add(g.base));
          const wr = shuffle(smp.words, rng);
          const cw = cellW(d.wcols);
          blocks.push(cream('data-lcs-writecard="1"', label(`${num(1)}Read the meaning. Write the new word with ${orList(['un-', 're-', 'pre-'])}.`) +
            grid(d.wcols, wr.map((w) => writeCell(`data-lcs-write="${w}"`, esc(M[w]), w, cw, key, false, d.wfont))), d.pad));
          items.push(...wr.map((w) => 'write:' + w));
          blocks.push(gapBlock(2, gaps.map(rowOf), kinds, `Read each sentence. Write ${orList(kinds)} to finish the word.`));
          blocks.push(cream(`data-lcs-ownsentence="${smp.words.join('|')}"`, label(`${num(3)}Write a sentence that uses both words you wrote in part 1.`) +
            (key ? `<div data-lcs-sample="${esc(smp.text)}" style="font:700 15px/1.1 'Nunito',sans-serif;color:${T.teal};margin-bottom:-15px">Sample answer: ${esc(pr(smp.text))} (Answers vary.)</div>` : '') +
            Array.from({ length: d.rows }, () => `<div data-lcs-line style="line-height:0">${rowSvg(W - 24, ROW)}</div>`).join(''), d.pad));
        }
      }

      // =============================================================== SUFFIX
      if (mode === 'suffix') {
        const S = BANK.suffix, SB = S.bases, M = S.meanings;
        const split = (w) => { const s = SUFFIXES.find((q) => w.endsWith(q) && SB[w.slice(0, -q.length)] && SB[w.slice(0, -q.length)].includes(q)); return { s, base: w.slice(0, -s.length) }; };
        const markWords = (ss) => S.words.filter((w) => ss.includes(split(w).s));
        const meanWords = (ss) => Object.keys(M).filter((w) => ss.includes(split(w).s));
        const rowOf = (g) => ({ text: g.text, mark: g.base + '___', full: g.base + g.answer, at: g.base.length, g: g.answer });
        /** a printed word to mark: the key rings the base and underlines the suffix (a trap is crossed out) */
        const markWord = (w, example, trap) => {
          const on = example ? T.inkSoft : key ? T.teal : 'transparent', col = example ? T.inkSoft : T.ink;
          if (trap) return `<span data-lcs-markword="${w}" data-lcs-trap="1" data-lcs-read style="justify-self:center;font:800 ${d.mfont}px/1.3 'Nunito',sans-serif;color:${col};padding:4px 6px;text-decoration:${key ? `line-through ${T.teal} 4px` : 'none'}">${esc(w)}</span>`;
          const { s, base } = split(w);
          // the ring and the line take no room on the page of the child: the word prints whole, as on any page; a marked
          // word (the key, the done example) gives its base room so the ring ends before the first letter of the suffix
          const mark = on !== 'transparent';
          return `<span data-lcs-markword="${w}" data-lcs-base="${base}" data-lcs-suf="${s}"${example ? ' data-lcs-example="1"' : ''} data-lcs-read style="justify-self:center;font:800 ${d.mfont}px/1.3 'Nunito',sans-serif;color:${col};white-space:nowrap"><span data-lcs-ring style="padding:0 ${mark ? 3 : 0}px;margin-right:${mark ? 7 : 0}px;border-radius:999px;outline:${mark ? `3px solid ${on}` : 'none'};outline-offset:0">${esc(base)}</span><span data-lcs-under style="text-decoration:${mark ? `underline ${on} 4px` : 'none'};text-underline-offset:5px;text-decoration-skip-ink:none">${esc(s)}</span></span>`;
        };
        const markBlock = (k, ws, instr) => cream('data-lcs-markcard="1"', label(`${num(k)}${instr}`) +
          `<div style="display:grid;grid-template-columns:repeat(${d.mcols},1fr);gap:10px 8px;align-items:center;padding:4px 0">${ws.map((x) => markWord(x.w, x.example, x.trap)).join('')}</div>`, d.pad);
        if (lv === 1) {
          const sents = pick('suffix choose', () => { const s = shuffle(S.choose, rng).slice(0, d.sents); const bs = s.map((c) => (c.right.length < c.wrong.length ? c.right : c.wrong)); const tr = s.filter((c) => c.right.endsWith('ful')).length; return new Set(bs).size === s.length && tr >= 1 && tr < s.length ? s : null; });
          sents.forEach((c) => usedBase.add(c.right.length < c.wrong.length ? c.right : c.wrong));
          const wr = free(meanWords(['ful']).map((w) => split(w).base), d.write + 1);
          const mk = free(markWords(['ful']).map((w) => split(w).base), d.mark + 1);
          blocks.push(markBlock(1, mk.map((b, i) => ({ w: b + 'ful', example: i === 0 })), `Circle the base word. Underline ${teal('-ful')}. Read each word to a partner.`));
          items.push(...mk.slice(1).map((b) => 'mark:' + b + 'ful'));
          const cw = cellW(d.wcols);
          blocks.push(cream('data-lcs-writecard="1"', label(`${num(2)}Read the meaning. Write the word with ${teal('-ful')}. Read your new words to a partner.`) +
            grid(d.wcols, wr.map((b, i) => writeCell(`data-lcs-write="${b}ful"`, esc(M[b + 'ful']), b + 'ful', cw, key, i === 0, d.wfont))), d.pad));
          items.push(...wr.slice(1).map((b) => 'write:' + b + 'ful'));
          blocks.push(chooseBlock(3, sents));
        }
        if (lv === 2 || lv === 3) {
          const kinds = lv === 2 ? ['ful', 'less'] : ['ful', 'less', 'ly'];
          // 2. the matching: level 2 two bases with -ful and -less; level 3 one such base and two -ly words
          const pairBases = free(S.match, lv === 2 ? 2 : 1);
          const ly = lv === 3 ? free(meanWords(['ly']).map((w) => split(w).base), 2) : [];
          // 3. the gaps (one on a base with -ful and -less at least)
          const gaps = pick('suffix gaps', () => { const seq = kindSeq(d.gaps, kinds, rng); return seq && drawGaps(S.gaps, seq, kinds, rowOf, (got) => got.some((g) => SB[g.base].length > 1)); });
          gaps.forEach((g) => usedBase.add(g.base));
          // 1. the words to mark: every suffix of the level twice at least
          const mk = pick('suffix mark', () => { const ws = shuffle(markWords(kinds).filter((w) => !usedBase.has(split(w).base)), rng); const got = [], bs = new Set(); for (const w of ws) { const s = split(w); if (bs.has(s.base)) continue; got.push(w); bs.add(s.base); if (got.length === d.mark) break; } return got.length === d.mark && kinds.every((k) => got.filter((w) => split(w).s === k).length >= 2) ? got : null; });
          mk.forEach((w) => usedBase.add(split(w).base));
          const trap = lv === 3 ? S.traps[rng.int(0, S.traps.length - 1)] : null;
          const marks = shuffle([...mk.map((w) => ({ w })), ...(trap ? [{ w: trap, trap: true }] : [])], rng);
          blocks.push(markBlock(1, marks, lv === 2 ? `Circle the base word in each word. Underline the suffix.` : `Circle the base word. Underline the suffix. One word has no suffix: cross it out.`));
          items.push(...marks.map((x) => (x.trap ? 'trap:' : 'mark:') + x.w));
          const pairs = [...pairBases.flatMap((b) => ['ful', 'less'].map((s) => ({ w: b + s, m: M[b + s] }))), ...ly.map((b) => ({ w: b + 'ly', m: M[b + 'ly'] }))];
          blocks.push(matchBlock(2, pairs, 'Read each word. Draw a line to its meaning.', d.mword, d.mmean));
          blocks.push(gapBlock(3, gaps.map(rowOf), kinds, `Read each sentence. Write ${orList(kinds)} to finish the word.`));
        }
      }

      // =============================================================== APOSTROPHE
      if (mode === 'apostrophe') {
        const A = BANK.apostrophe, C = A.contractions;
        const usedC = new Set();
        const takeC = (n, more = () => true) => { const got = shuffle(C.filter((c) => !usedC.has(c.c) && more(c)), rng).slice(0, n); got.forEach((c) => usedC.add(c.c)); return got; };
        const canJoin = (c) => fitsRow(c.c, W3);
        const canSplit = (c) => c.kind !== 'is' && c.words.includes(' ') && fitsRow(c.words, W3);   // he's: he is OR he has
        const ownOk = (o, t, w) => lettersOf(ownPhrase(o, t)) <= 8 && fitsRow(ownPhrase(o, t), w);
        const joinCell = (c, cw, example) => writeCell(`data-lcs-join="${esc(pr(c.c))}"`, `<span data-lcs-words>${esc(c.words)}</span>`, c.c, cw, key, example, d.wfont);
        const splitCell = (c, cw) => writeCell(`data-lcs-split="${esc(pr(c.c))}"`, `<span style="font-weight:800">${esc(pr(c.c))}</span>`, c.words, cw, key, false, d.wfont);
        if (lv === 1) {
          // 1. the done example is always "it is: it's" (it never models an answer of part 3)
          const ex = C.find((c) => c.c === "it's"); usedC.add(ex.c);
          // 2. the matching: two first words, each with two endings (both parts of every contraction must be read)
          const SUBJ = ['I', 'we', 'you', 'they', 'he', 'she'];
          const set = pick('apostrophe match', () => { const ss = shuffle(SUBJ, rng).slice(0, 2); return ss.flatMap((s) => shuffle(C.filter((c) => c.words.split(' ')[0] === s && ['am', 'are', 'is', 'will', 'have'].includes(c.kind)), rng).slice(0, 2)); });
          set.forEach((c) => usedC.add(c.c));
          const sp = takeC(d.split, canSplit);
          const jn = [ex, ...takeC(d.join, canJoin)];
          const cw = cellW(d.jcols);
          blocks.push(cream('data-lcs-joincard="1"', label(`${num(1)}Write the contraction. Put an apostrophe where letters are left out. Read your contractions to a partner.`) +
            grid(d.jcols, jn.map((c, i) => joinCell(c, cw, i === 0))), d.pad));
          items.push(...jn.slice(1).map((c) => 'join:' + c.c));
          blocks.push(matchBlock(2, set.map((c) => ({ w: c.c, m: c.words })), 'Read each contraction. Draw a line to the two words it stands for.', d.mword, d.mmean));
          blocks.push(cream('data-lcs-splitcard="1"', label(`${num(3)}Write the two words for each contraction.`) + grid(d.scols, sp.map((c) => splitCell(c, cellW(d.scols)))), d.pad));
          items.push(...sp.map((c) => 'split:' + c.c));
        }
        if (lv === 2) {
          const jn = takeC(d.join, canJoin), sp = takeC(d.split, canSplit);
          blocks.push(cream('data-lcs-joincard="1"', label(`${num(1)}Write the contraction. Put an apostrophe where letters are left out.`) + grid(d.jcols, jn.map((c) => joinCell(c, cellW(d.jcols), false))), d.pad));
          blocks.push(cream('data-lcs-splitcard="1"', label(`${num(2)}Write the two words for each contraction.`) + grid(d.scols, sp.map((c) => splitCell(c, cellW(d.scols)))), d.pad));
          items.push(...jn.map((c) => 'join:' + c.c), ...sp.map((c) => 'split:' + c.c));
          // 3. the owners: a done example and three more (an animal and a named child among them), every picture once
          const cw = cellW(d.ocols, 18);
          const own = pick('apostrophe owners', () => {
            const animals = shuffle(Object.keys(A.animalPairs), rng), nm = shuffle(A.names, rng);
            const nA = rng.int(1, 2), got = [], things = new Set();
            for (const a of animals) { if (got.length >= nA) break; const t = shuffle(A.animalPairs[a].filter((x) => !things.has(x) && ownOk(a, x, cw)), rng)[0]; if (t) { got.push({ owner: a, thing: t, animal: true }); things.add(t); } }
            for (const n of nm) { if (got.length >= d.own + 1) break; const t = shuffle(A.nameThings.filter((x) => !things.has(x) && ownOk(n, x, cw)), rng)[0]; if (t) { got.push({ owner: n, thing: t, animal: false }); things.add(t); } }
            if (got.length !== d.own + 1) return null;
            const o = shuffle(got, rng); const rest = o.slice(1);
            return rest.some((x) => x.animal) && rest.some((x) => !x.animal) ? o : null;
          });
          const ownerBox = (x, ex) => x.animal
            ? `<div data-lcs-owner="${x.owner}" style="display:flex;flex-direction:column;align-items:center;gap:1px;width:96px">${img(x.owner, d.pic)}<span data-lcs-read style="font:800 20px/1.1 'Nunito',sans-serif;color:${ex ? T.inkSoft : T.ink}">${esc(x.owner)}</span></div>`
            : `<div data-lcs-owner="${x.owner}" style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:96px;height:${d.pic + 23}px"><span data-lcs-nametag data-lcs-read style="font:800 22px/1.2 'Nunito',sans-serif;color:${ex ? T.inkSoft : T.ink};padding:6px 12px;border-radius:10px;border:2.5px solid ${ex ? T.inkSoft : T.teal};background:#FFFFFF">${esc(x.owner)}</span></div>`;
          const thingBox = (x, ex) => `<div data-lcs-thing="${x.thing}" style="display:flex;flex-direction:column;align-items:center;gap:1px;width:96px">${img(x.thing, d.pic)}<span data-lcs-read style="font:800 20px/1.1 'Nunito',sans-serif;color:${ex ? T.inkSoft : T.ink}">${esc(x.thing)}</span></div>`;
          blocks.push(cream('data-lcs-owncard="1"', label(`${num(3)}Who owns it? Write the owner with ${teal(AP + 's')}, then the thing.`) +
            `<div style="display:grid;grid-template-columns:repeat(${d.ocols},1fr);gap:8px 18px">` + own.map((x, i) => `<div data-lcs-own="${esc(pr(ownPhrase(x.owner, x.thing)))}" data-lcs-ownerkind="${x.animal ? 'animal' : 'name'}"${i === 0 ? ' data-lcs-example="1"' : ''} style="display:flex;flex-direction:column;gap:2px"><div style="display:flex;justify-content:center;align-items:flex-end;gap:10px">${ownerBox(x, i === 0)}${thingBox(x, i === 0)}</div>${row(cw, ownPhrase(x.owner, x.thing), key, i === 0)}</div>`).join('') + `</div>`, d.pad));
          items.push(...own.slice(1).map((x) => 'own:' + ownPhrase(x.owner, x.thing)));
        }
        if (lv === 3) {
          // 3. the sentences to fix (a contraction and an owner among them; the word first in at most half of them)
          const first = (x) => (x.text.match(/[A-Za-z']+/g) || [])[0] === x.wrong;
          const fx = pick('apostrophe fix', () => { const s = shuffle(A.fix, rng).slice(0, d.fix); const kinds = s.map((x) => x.kind); const cs = s.filter((x) => x.kind === 'c').map((x) => x.right.toLowerCase()); return kinds.includes('c') && kinds.includes('p') && new Set(cs).size === cs.length && s.filter(first).length <= Math.floor(d.fix / 2) ? s : null; });
          fx.filter((x) => x.kind === 'c').forEach((x) => { const c = C.find((y) => y.c.toLowerCase() === x.right.toLowerCase()); if (c) usedC.add(c.c); });
          // 1. contractions to write, or their two words
          const mixed = pick('apostrophe mixed', () => { const cs = takeC(d.mixed, (c) => canJoin(c) && c.c !== "it's"); cs.forEach((c) => usedC.delete(c.c)); const sp = shuffle(cs.filter(canSplit), rng).slice(0, d.mixed / 2); if (cs.length !== d.mixed || sp.length !== d.mixed / 2) return null; return cs.map((c) => ({ c, kind: sp.includes(c) ? 'split' : 'join' })); });
          mixed.forEach((x) => usedC.add(x.c.c));
          blocks.push(cream('data-lcs-mixedcard="1"', label(`${num(1)}Write the contraction, or write the two words it stands for.`) +
            grid(d.mcols, mixed.map((x) => (x.kind === 'join' ? joinCell(x.c, cellW(d.mcols), false) : splitCell(x.c, cellW(d.mcols))))), d.pad));
          items.push(...mixed.map((x) => x.kind + ':' + x.c.c));
          // 2. the owners in sentences (names that no sentence to fix holds)
          const cw = cellW(d.ocols);
          const own = pick('apostrophe owners', () => {
            const nm = shuffle(A.names.filter((n) => !fx.some((x) => x.text.includes(n))), rng).slice(0, d.ownSent), taken = new Set();
            const got = nm.map((n) => { const t = shuffle(A.nameThings.filter((x) => !taken.has(x) && ownOk(n, x, cw) && !fx.some((y) => new RegExp('\\b' + x + '\\b', 'i').test(y.text))), rng)[0]; if (t) taken.add(t); return { owner: n, thing: t }; });
            return got.every((x) => x.thing) ? got : null; });
          blocks.push(cream('data-lcs-ownsentcard="1"', label(`${num(2)}Read each sentence. Write who owns it with ${teal(AP + 's')}, then the thing.`) +
            grid(d.ocols, own.map((x) => writeCell(`data-lcs-own="${esc(pr(ownPhrase(x.owner, x.thing)))}"`, `The ${esc(x.thing)} belongs to ${esc(x.owner)}.`, ownPhrase(x.owner, x.thing), cw, key, false, d.sfont))), d.pad));
          items.push(...own.map((x) => 'own:' + ownPhrase(x.owner, x.thing)));
          // a contraction that starts its sentence is written with a capital; the key also accepts a lowercase one
          const accept = (x) => (key && x.kind === 'c' && first(x) && !/^I'/.test(x.right) ? `<div data-lcs-accept="${esc(pr(x.right.toLowerCase()))}" style="font:700 14px/1.05 'Nunito',sans-serif;color:${T.teal};padding-left:6px;margin-bottom:-18px">(accept a lowercase ${esc(pr(x.right.toLowerCase()))})</div>` : '');
          blocks.push(cream('data-lcs-fixcard="1"', label(`${num(3)}One word in each sentence needs an apostrophe. Write the word with its apostrophe.`) +
            grid(d.fcols, fx.map((x) => writeCell(`data-lcs-fix="${esc(pr(x.right))}" data-lcs-wrong="${x.wrong}" data-lcs-kind="${x.kind}"`, esc(x.text), x.right, cellW(d.fcols), key, false, d.sfont, '', accept(x)))), d.pad));
          items.push(...fx.map((x) => 'fix:' + x.right));
        }
      }

      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-wbpage="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + items.slice(0, 3).join(','), items },
      };
    },

    async verify(page) {
      return page.evaluate((CFG) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-wbpage]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsWbpage.split('|'), lv = +lvS, d = CFG.LEVELS[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const rb = R(root);
        const AP = '’', pr = (s) => String(s).replace(/'/g, AP);
        const txt = (e) => (e ? e.textContent.replace(/\s+/g, ' ').trim() : '');
        // ligatures off on the whole page (fi, ff), and room after an f
        const ligOff = (e) => cs(e).fontVariantLigatures === 'none' && /"liga" 0/.test(cs(e).fontFeatureSettings);
        if (!ligOff(root)) fails.push('the page does not turn ligatures off');
        if (root.dataset.lcsNoliga !== '1') fails.push('the page root does not carry data-lcs-noliga');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[ifl]/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, or ff joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (!n.parentElement.closest('svg') && /f[ifl]/.test(n.textContent)) { fails.push('an f before i, f, or l has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 60) fails.push('a picture smaller than 60 px'); });
        const pics = [...document.querySelectorAll('img[data-lcs-pic]')].map((i) => i.dataset.lcsPic);
        if (new Set(pics).size !== pics.length) fails.push('a picture stands twice on the page');
        const blocks = [...root.children];
        // no blank band of more than BAND px between two tasks or under the last one (the room goes to more items)
        blocks.forEach((b, i) => { const below = i + 1 < blocks.length ? R(blocks[i + 1]).top : rb.bottom, gap = below - R(b).bottom; if (gap > CFG.BAND + 0.5) fails.push(`a blank band of ${Math.round(gap)} px ${i + 1 < blocks.length ? 'between two tasks' : 'under the last task'}, not ${CFG.BAND} or less`); });
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, div, [data-lcs-line] svg').forEach((e) => { const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < CFG.ROW - 0.5) fails.push(`a writing row lower than ${CFG.ROW} px`); });
        // every answer seated on a row (the key, a done example) fits its row: never squeezed, never past its end
        lines.forEach((l) => { const s = l.querySelector('svg'), t = s && s.querySelector('text'); if (t && (t.hasAttribute('textLength') || R(t).width > R(s).width - 8 || R(t).right > R(s).right - 2)) fails.push('an answer is wider than its row: ' + t.textContent); });
        document.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 19) fails.push('text a second grader reads is smaller than 19 px'); });
        document.querySelectorAll('[data-lcs-pill]').forEach((e) => { if (fs(e) < 20) fails.push('a word to choose is smaller than 20 px'); });
        // punctuation after a chip or a gap stands tight against it, outside it
        document.querySelectorAll('[data-lcs-tail]').forEach((e) => { const p = e.previousElementSibling; if (!p || R(e).left - R(p).right > 1.5 || R(e).left < R(p).right - 0.5) fails.push('a period does not stand tight against its word, outside it'); });
        // every writing cell: the key writes its answer, the page of the child writes nothing (but its done example)
        const cells = [...document.querySelectorAll('[data-lcs-wcell]')];
        cells.forEach((c) => { const ln = c.querySelector('[data-lcs-line]'), ex = c.dataset.lcsExample === '1', t = c.querySelector('text[data-lcs-keytext]');
          if (!ln) { fails.push('a cell to write in has no row'); return; }
          if (isKey) { if (ln.dataset.lcsAnswer !== c.dataset.lcsWcell || !t || t.textContent !== c.dataset.lcsWcell) fails.push('the key writes another answer on a row: ' + c.dataset.lcsWcell); }
          else if (ex ? !t || t.textContent !== c.dataset.lcsWcell : !!t) fails.push('a row is written on the page of the child, or a done example is empty');
          if (R(ln.querySelector('svg')).width < 180) fails.push('a row to write on is narrower than 180 px'); });
        // a done example is the first cell of its card, and only one per card
        document.querySelectorAll('[data-lcs-example="1"]').forEach((e) => { const card = blocks.find((b) => b.contains(e)); const ex = [...card.querySelectorAll('[data-lcs-example="1"]')].filter((x) => !x.parentElement.closest('[data-lcs-example="1"]')); const all = [...card.querySelectorAll('[data-lcs-wcell], [data-lcs-markword], [data-lcs-own]')].filter((x) => !x.parentElement.closest('[data-lcs-wcell], [data-lcs-own]')); if (ex.length !== 1 || all[0] !== ex[0]) fails.push('a card has not one done example, first'); });
        const exSel = (CFG.EXAMPLES[mode] || {})[lv] || [];
        exSel.forEach((sel) => { const els = [...document.querySelectorAll(sel)]; if (!els.length || els[0].dataset.lcsExample !== '1' || els.filter((e) => e.dataset.lcsExample === '1').length !== 1) fails.push('a task has not one done example in grey, first: ' + sel); });
        if (document.querySelectorAll('[data-lcs-example="1"]').length !== exSel.length) fails.push(`${document.querySelectorAll('[data-lcs-example="1"]').length} done examples on the page, not ${exSel.length}`);
        // gaps: one width on the page, as wide as the longest letters offered; empty on the page, right on the key; half an
        // inch of clear space above each one
        const gaps = [...document.querySelectorAll('[data-lcs-gap]')];
        const gcard = document.querySelector('[data-lcs-gapcard]');
        const box = gcard ? gcard.dataset.lcsKinds.split(',') : [];
        if (gcard) { const want = box.length === 2 ? box.join(' or ') : box.slice(0, -1).join(', ') + ', or ' + box[box.length - 1]; if (!txt(gcard.querySelector('[data-lcs-label]')).includes(`Write ${want} to finish the word.`)) fails.push('the task line does not name the letters the gaps take'); }
        if (gaps.length) {
          const want = CFG.GAPW[Math.max(...box.map((x) => x.length))];
          const leaves = [...root.querySelectorAll('*')].filter((e) => (!e.children.length && e.textContent.trim()) || e.tagName === 'IMG' || (e.tagName === 'svg' && e.closest('[data-lcs-line]')));
          gaps.forEach((g) => { if (Math.abs(R(g).width - want) > 1) fails.push(`a gap of ${Math.round(R(g).width)} px, not ${want}`); if (isKey ? g.textContent.trim() !== g.dataset.lcsGap : g.textContent.trim()) fails.push('a gap is filled on the page of the child, or wrong on the key'); if (!box.includes(g.dataset.lcsGap)) fails.push('a gap takes letters the line does not name');
            const q = R(g); let top = R(g.closest('[data-lcs-gapcard]')).top;
            leaves.forEach((e) => { if (g.contains(e) || e.contains(g)) return; const r = R(e); if (r.width && r.right > q.left + 1 && r.left < q.right - 1 && r.bottom <= q.bottom - 2 && r.bottom > top) top = r.bottom; });
            if (q.bottom - top < CFG.CLEAR - 0.5) fails.push(`${Math.round(q.bottom - top)} px of clear space above a gap, not ${CFG.CLEAR}`); });
        }
        const gapFits = (wEl) => { if (!wEl) return false; const c = wEl.cloneNode(true), g = c.querySelector('[data-lcs-gap]'); if (!g) return false; g.textContent = g.dataset.lcsGap; return c.textContent.replace(/\s+/g, '') === wEl.dataset.lcsGapword; };
        const gapRows = [...document.querySelectorAll('[data-lcs-gaprow]')];
        gapRows.forEach((e) => { const gw = e.querySelector('[data-lcs-gapword]'); if (!gw || gw.dataset.lcsGapword !== e.dataset.lcsGaprow || !gapFits(gw) || gw.querySelector('[data-lcs-gap]').dataset.lcsGap !== e.dataset.lcsSp) fails.push(`the sentence for "${e.dataset.lcsGaprow}" has not a gap for its letters`); });
        gapRows.forEach((e) => { const ls = [...e.querySelectorAll('[data-lcs-gapline]')]; if (ls.length > 2 || ls[0].dataset.lcsGapline !== 'gap' || ls.slice(1).some((l) => l.dataset.lcsGapline === 'gap')) fails.push('a sentence to finish does not hold its gap on its first line'); });
        if (gapRows.filter((e) => e.querySelectorAll('[data-lcs-gapline]').length > 1).length > 1) fails.push('more than one sentence to finish takes two lines');
        const seqCheck = (seq, kinds, what) => {
          if (new Set(seq).size < 2) fails.push(`the ${what} take one kind only`);
          if (seq.some((x, i) => i >= 2 && x === seq[i - 1] && x === seq[i - 2])) fails.push(`three ${what} in a row take one kind`);
          const ix = seq.map((x) => kinds.indexOf(x));
          if (ix.some((x, i) => i >= 2 && ((ix[i - 2] + 1 === ix[i - 1] && ix[i - 1] + 1 === x) || (ix[i - 2] - 1 === ix[i - 1] && ix[i - 1] - 1 === x)))) fails.push(`the ${what} take their kinds in a staircase`);
          if (seq.some((x, i) => i >= 3 && x !== seq[i - 1] && seq[i - 2] === x && seq[i - 3] === seq[i - 1])) fails.push(`four ${what} alternate their kinds`);
        };
        // matching: every word has its meaning on the other side, nobody straight across, three line offsets or more
        const matchCheck = (meanOf) => {
          const mw = [...document.querySelectorAll('[data-lcs-mword]')], mm = [...document.querySelectorAll('[data-lcs-mmean]')];
          if (mw.length !== d.match || mm.length !== d.match) fails.push(`not ${d.match} words and ${d.match} meanings to match`);
          const off = [];
          mw.forEach((e) => { const w = e.dataset.lcsMword, m = mm.find((x) => x.dataset.lcsMmean === w);
            if (!m || txt(m) !== pr(meanOf(w.replace(/’/g, "'"))) || txt(e) !== w) fails.push(`"${w}" is not matched to its meaning`);
            if (m) { const o = (R(m).top + R(m).height / 2) - (R(e).top + R(e).height / 2); if (Math.abs(o) < 18) fails.push(`"${w}" stands straight across from its meaning`); off.push(Math.round(o / 10)); } });
          if (new Set(off).size < 3) fails.push('the lines of the matching take fewer than three different offsets');
          const kl = document.querySelectorAll('[data-lcs-keyline]').length; if (kl !== (isKey ? d.match : 0)) fails.push(`${kl} lines are drawn`);
          return mw.map((e) => e.dataset.lcsMword.replace(/’/g, "'"));
        };
        // choices: one right word, rung on the key only; places mixed
        const chooseCheck = (builtOf) => {
          const sn = [...document.querySelectorAll('[data-lcs-sentence]')];
          if (sn.length !== d.sents) fails.push(`${sn.length} sentences to circle in`);
          const kinds = [], places = [];
          sn.forEach((e) => { const pills = [...e.querySelectorAll('[data-lcs-pill]')], okp = pills.filter((p) => p.dataset.lcsOk); const [longer, shorter] = e.dataset.lcsPair.split('|');
            const bank = CFG.choose[mode].find((c) => c.right === e.dataset.lcsSentence);
            if (pills.length !== 2 || okp.length !== 1 || !bank || okp[0].textContent.trim() !== e.dataset.lcsSentence || builtOf(shorter) !== longer || pills.map((p) => p.textContent.trim()).sort().join() !== [longer, shorter].sort().join()) fails.push('a sentence is not keyed to its word among a base and the word built on it');
            kinds.push(okp[0] ? okp[0].dataset.lcsKind : ''); places.push(pills.indexOf(okp[0])); });
          if (!kinds.includes('built') || !kinds.includes('base')) fails.push('the right words of the sentences are all one kind');
          if (new Set(places).size < 2) fails.push('the right word stands in one place in every sentence');
          if (places.some((x, i) => i >= 2 && x === places[i - 1] && x === places[i - 2])) fails.push('three right words of the sentences in a row stand in one place');
          if (places.some((x, i) => i >= 3 && x !== places[i - 1] && places[i - 2] === x && places[i - 3] === places[i - 1])) fails.push('four right words of the sentences alternate their places');
          if (document.querySelectorAll('[data-lcs-pill][data-lcs-ok]').length && isKey !== [...document.querySelectorAll('[data-lcs-pill][data-lcs-ok]')].every((p) => cs(p).borderTopColor === 'rgb(20, 107, 94)')) fails.push('the key does not ring every right word, or the page of the child does');
          return sn.map((e) => e.dataset.lcsPair.split('|'));
        };
        const answers = [];   // what a child writes: never printed elsewhere on the page

        if (mode === 'prefix') {
          const P = CFG.prefix;
          const split = (w) => { const p = ['un', 're', 'pre'].find((q) => w.startsWith(q) && P.bases[w.slice(q.length)] && P.bases[w.slice(q.length)].forms.includes(q)); return p ? { p, base: w.slice(p.length) } : null; };
          const bases = [];
          if (lv === 1) {
            const bc = [...document.querySelectorAll('[data-lcs-build]')];
            if (bc.length !== d.build + 1) fails.push(`${bc.length} bases to add un- to, not ${d.build} and a done example`);
            bc.forEach((c) => { const b = c.dataset.lcsBuild; if (c.dataset.lcsWcell !== 'un' + b || !P.l1Build.includes(b) || txt(c.querySelector('[data-lcs-prompt]')) !== 'un + ' + b) fails.push(`the base "${b}" is not built with un-`); bases.push(b); if (c.dataset.lcsExample !== '1') answers.push('un' + b); });
            const mr = [...document.querySelectorAll('[data-lcs-meanrow]')];
            if (mr.length !== d.mean) fails.push(`${mr.length} meanings to circle a word for`);
            const places = [];
            mr.forEach((e) => { const w = e.dataset.lcsMeanrow, s = split(w), pills = [...e.querySelectorAll('[data-lcs-pill]')], okp = pills.filter((p) => p.dataset.lcsOk), t = pills.map((p) => p.textContent.trim());
              const other = t.find((x) => x !== w && x !== (s && s.base));
              if (!s || s.p !== 'un' || txt(e.querySelector('[data-lcs-meantext]')) !== P.meanings[w] || pills.length !== 3 || okp.length !== 1 || okp[0].textContent.trim() !== w || !t.includes(s.base) || !other || !/^un/.test(other) || !split(other)) fails.push(`the meaning "${txt(e.querySelector('[data-lcs-meantext]'))}" is not keyed to its un- word among the word, its base, and another un- word`);
              if (s) bases.push(s.base); if (other && split(other)) bases.push(split(other).base);
              places.push(pills.indexOf(okp[0])); });
            if (new Set(places).size < 3) fails.push('the right words of the meanings do not stand in all three places');
            if (places.some((x, i) => i >= 2 && x === places[i - 1] && x === places[i - 2])) fails.push('three right words of the meanings stand in one place');
            if (places.some((x, i) => i >= 2 && ((places[i - 2] + 1 === places[i - 1] && places[i - 1] + 1 === x) || (places[i - 2] - 1 === places[i - 1] && places[i - 1] - 1 === x)))) fails.push('the right words of the meanings stand in a staircase');
            chooseCheck((b) => 'un' + b).forEach(([l, s]) => bases.push(s));
            if (lines.length !== d.build + 1) fails.push(`${lines.length} writing rows`);
          }
          if (lv === 2 || lv === 3) {
            const kinds = lv === 2 ? ['un', 're'] : ['un', 're', 'pre'];
            const wc = [...document.querySelectorAll('[data-lcs-write]')];
            if (wc.length !== d.write) fails.push(`${wc.length} meanings to write a word for`);
            const ps = [];
            wc.forEach((c) => { const w = c.dataset.lcsWrite, s = split(w); if (!s || !kinds.includes(s.p) || txt(c.querySelector('[data-lcs-prompt]')) !== P.meanings[w] || c.dataset.lcsWcell !== w) fails.push(`"${w}" is not written from its meaning with ${kinds.join(' or ')}`); if (s) { ps.push(s.p); const pair = lv === 3 && P.samples.some((x) => x.words.every((y) => wc.some((e) => e.dataset.lcsWrite === y)) && split(x.words[0]).base === split(x.words[1]).base); if (!(pair && bases.includes(s.base))) bases.push(s.base); } answers.push(w); });
            if (lv === 2 && new Set(ps).size < 2) fails.push('the words to write take one prefix only');
            if (box.join() !== kinds.join()) fails.push('the letters named for the gaps are not the prefixes of this level');
            if (gapRows.length !== d.gaps) fails.push(`${gapRows.length} sentences to finish`);
            const seq = gapRows.map((e) => e.dataset.lcsSp);
            let two = 0;
            gapRows.forEach((e) => { const w = e.dataset.lcsGaprow, s = split(w), seen = txt(e).replace(/\s/g, ''), bank = P.gaps.find((g) => g.answer + g.base === w && seen === g.text.replace('___' + g.base, isKey ? w : g.base).replace(/'/g, AP).replace(/\s/g, '')); if (!s || !bank || !kinds.includes(s.p)) fails.push(`the sentence for "${w}" is not its sentence of the bank`); if (s) { bases.push(s.base); if (P.bases[s.base].forms.filter((p) => kinds.includes(p)).length >= 2) two++; } answers.push(w); });
            if (two < 2) fails.push('fewer than two sentences to finish decide between two real words of one base');
            seqCheck(seq, kinds, 'sentences to finish');
            if (lv === 2) {
              const m = matchCheck((w) => P.meanings[w]);
              const mb = m.map((w) => split(w)).filter(Boolean);
              const byBase = {}; mb.forEach((s) => { (byBase[s.base] = byBase[s.base] || []).push(s.p); });
              if (Object.keys(byBase).length !== 2 || Object.values(byBase).some((p) => p.slice().sort().join() !== 're,un') || !Object.keys(byBase).every((b) => P.match.includes(b))) fails.push('the words to match are not two bases of the list, each with un- and re-');
              Object.keys(byBase).forEach((b) => bases.push(b));
              if (lines.length !== d.write) fails.push(`${lines.length} writing rows`);
            }
            if (lv === 3) {
              if (!ps.includes('pre') && !seq.includes('pre')) fails.push('level 3 asks for no word with pre-');
              const own = document.querySelector('[data-lcs-ownsentence]');
              const ow = own ? own.dataset.lcsOwnsentence.split('|') : [];
              if (!own || ow.length !== 2 || ow.some((w) => !wc.some((c) => c.dataset.lcsWrite === w))) fails.push('the sentence to write does not use the two words of part 1');
              const rows = own ? [...own.querySelectorAll('[data-lcs-line]')] : [];
              if (rows.length !== d.rows || rows.some((l) => R(l.querySelector('svg')).width < 600)) fails.push('the sentence to write has not two rows the width of the page');
              const smp = own && own.querySelector('[data-lcs-sample]');
              if (isKey ? !smp || !ow.every((w) => new RegExp('\\b' + w + '\\b', 'i').test(smp.dataset.lcsSample)) : !!smp) fails.push('the key gives no sample answer with the two words, or the page of the child does');
              if (lines.length !== d.write + d.rows) fails.push(`${lines.length} writing rows`);
            }
          }
          if (new Set(bases).size !== bases.length) fails.push('a base word stands in two tasks of the page');
        }

        if (mode === 'suffix') {
          const S = CFG.suffix;
          const split = (w) => { const s = ['ful', 'less', 'ly'].find((q) => w.endsWith(q) && S.bases[w.slice(0, -q.length)] && S.bases[w.slice(0, -q.length)].includes(q)); return s ? { s, base: w.slice(0, -s.length) } : null; };
          const kinds = lv === 1 ? ['ful'] : lv === 2 ? ['ful', 'less'] : ['ful', 'less', 'ly'];
          const bases = [];
          const mk = [...document.querySelectorAll('[data-lcs-markword]')];
          const real = mk.filter((e) => !e.dataset.lcsTrap), traps = mk.filter((e) => e.dataset.lcsTrap);
          if (real.length !== d.mark + (lv === 1 ? 1 : 0) || traps.length !== (d.traps || 0)) fails.push(`not ${d.mark} words to mark${d.traps ? ' and one to cross out' : ''}`);
          const tealC = 'rgb(20, 107, 94)';
          real.forEach((e) => { const w = e.dataset.lcsMarkword, s = split(w), ring = e.querySelector('[data-lcs-ring]'), und = e.querySelector('[data-lcs-under]'), ex = e.dataset.lcsExample === '1';
            if (!s || !S.words.includes(w) || s.base !== e.dataset.lcsBase || s.s !== e.dataset.lcsSuf || !kinds.includes(s.s) || txt(ring) !== s.base || txt(und) !== s.s || txt(e) !== w) fails.push(`"${w}" is not split into its base and a suffix of this level`);
            const marked = ex || isKey, want = ex ? 'rgb(138, 130, 118)' : tealC;
            if (ring && (marked ? cs(ring).outlineStyle !== 'solid' || cs(ring).outlineColor !== want || parseFloat(cs(ring).outlineWidth) < 2.5 : cs(ring).outlineStyle !== 'none')) fails.push(`the base of "${w}" is ${marked ? 'not ' : ''}ringed`);
            if (und && (marked ? !/underline/.test(cs(und).textDecorationLine) || cs(und).textDecorationColor !== want : /underline/.test(cs(und).textDecorationLine))) fails.push(`the suffix of "${w}" is ${marked ? 'not ' : ''}underlined`);
            if (ring && und && !marked && (R(und).left - R(ring).right > 1 || parseFloat(cs(ring).paddingLeft) + parseFloat(cs(ring).paddingRight) + parseFloat(cs(ring).marginRight) > 0)) fails.push(`"${w}" is printed with room between its base and its suffix (it shows where the suffix starts)`);
            // the ring of a marked word ends before the first letter of the suffix
            if (ring && und && marked && R(und).left < R(ring).right + parseFloat(cs(ring).outlineWidth) + 1) fails.push(`the ring of "${w}" runs into its suffix`);
            if (s) bases.push(s.base); });
          traps.forEach((e) => { const w = e.dataset.lcsMarkword; if (!S.traps.includes(w) || split(w)) fails.push(`"${w}" is no word without a suffix`); const cross = /line-through/.test(cs(e).textDecorationLine); if (cross !== isKey) fails.push('the word without a suffix is ' + (isKey ? 'not ' : '') + 'crossed out'); });
          const mkk = real.filter((e) => e.dataset.lcsExample !== '1').map((e) => split(e.dataset.lcsMarkword)).filter(Boolean).map((s) => s.s);
          if (kinds.some((k) => mkk.filter((x) => x === k).length < (lv === 1 ? 1 : 2))) fails.push('the words to mark do not show every suffix of this level twice');
          if (lv === 1) {
            const wc = [...document.querySelectorAll('[data-lcs-write]')];
            if (wc.length !== d.write + 1) fails.push(`${wc.length} meanings to write a word for, not ${d.write} and a done example`);
            wc.forEach((c) => { const w = c.dataset.lcsWrite, s = split(w); if (!s || s.s !== 'ful' || !S.meanings[w] || txt(c.querySelector('[data-lcs-prompt]')) !== S.meanings[w]) fails.push(`"${w}" is not written from its meaning`); if (s) bases.push(s.base); if (c.dataset.lcsExample !== '1') answers.push(w); });
            chooseCheck((b) => b + 'ful').forEach(([l, s]) => bases.push(s));
            if (lines.length !== d.write + 1) fails.push(`${lines.length} writing rows`);
            if (gaps.length || document.querySelector('[data-lcs-mword]')) fails.push('level 1 has gaps or a matching task');
          } else {
            const m = matchCheck((w) => S.meanings[w]);
            const ms = m.map((w) => split(w)).filter(Boolean);
            const byBase = {}; ms.forEach((s) => { (byBase[s.base] = byBase[s.base] || []).push(s.s); });
            const pairsN = Object.entries(byBase).filter(([b, x]) => x.slice().sort().join() === 'ful,less' && S.match.includes(b)).length, lyN = ms.filter((s) => s.s === 'ly').length;
            if (lv === 2 ? pairsN !== 2 : pairsN !== 1 || lyN !== 2) fails.push(lv === 2 ? 'the words to match are not two bases of the list, each with -ful and -less' : 'the words to match are not one base of the list with -ful and -less and two -ly words');
            Object.keys(byBase).forEach((b) => bases.push(b));
            if (box.join() !== kinds.join()) fails.push('the letters named for the gaps are not the suffixes of this level');
            if (gapRows.length !== d.gaps) fails.push(`${gapRows.length} sentences to finish`);
            gapRows.forEach((e) => { const w = e.dataset.lcsGaprow, s = split(w), seen = txt(e).replace(/\s/g, ''), bank = S.gaps.find((g) => g.base + g.answer === w && seen === g.text.replace(g.base + '___', isKey ? w : g.base).replace(/'/g, AP).replace(/\s/g, '')); if (!s || !bank || !kinds.includes(s.s)) fails.push(`the sentence for "${w}" is not its sentence of the bank`); if (s) bases.push(s.base); answers.push(w); });
            seqCheck(gapRows.map((e) => e.dataset.lcsSp), kinds, 'sentences to finish');
            if (lines.length) fails.push(`${lines.length} writing rows`);
          }
          if (new Set(bases).size !== bases.length) fails.push('a base word stands in two tasks of the page');
        }

        if (mode === 'apostrophe') {
          const A = CFG.apostrophe;
          const byC = (c) => A.contractions.find((x) => pr(x.c) === c);
          const seenC = [];
          const letters = (s) => (String(s).match(/[A-Za-z]/g) || []).length;
          const joinC = [...document.querySelectorAll('[data-lcs-join]')], splitC = [...document.querySelectorAll('[data-lcs-split]')];
          joinC.forEach((c) => { const x = byC(c.dataset.lcsJoin); if (!x || txt(c.querySelector('[data-lcs-words]')) !== x.words || c.dataset.lcsWcell !== pr(x.c) || x.c.length > 8) fails.push(`"${c.dataset.lcsJoin}" is not the contraction of the words printed, or has more than 8 characters`); seenC.push(c.dataset.lcsJoin); if (c.dataset.lcsExample !== '1') answers.push(c.dataset.lcsJoin); });
          splitC.forEach((c) => { const x = byC(c.dataset.lcsSplit); if (!x || txt(c.querySelector('[data-lcs-prompt]')) !== pr(x.c) || c.dataset.lcsWcell !== x.words || !x.words.includes(' ') || x.words.length > 8 || x.kind === 'is') fails.push(`"${c.dataset.lcsSplit}" is not split into its two words`); seenC.push(c.dataset.lcsSplit); answers.push(x ? x.words : '?'); });
          if (lv === 1) {
            if (joinC.length !== d.join + 1 || splitC.length !== d.split) fails.push(`not ${d.join} contractions to write and a done example, and ${d.split} to split`);
            if (!joinC.length || joinC[0].dataset.lcsJoin !== 'it' + AP + 's') fails.push('the done example is not it is: it’s');
            const m = matchCheck((c) => (A.contractions.find((x) => x.c === c) || {}).words);
            const firsts = m.map((c) => (A.contractions.find((x) => x.c === c) || { words: '?' }).words.split(' ')[0]);
            if (new Set(firsts).size !== 2 || [...new Set(firsts)].some((s) => firsts.filter((x) => x === s).length !== 2) || new Set(m).size !== m.length) fails.push('the contractions to match are not two first words, each with two endings');
            m.forEach((c) => seenC.push(pr(c)));
            if (lines.length !== d.join + 1 + d.split) fails.push(`${lines.length} writing rows`);
          }
          if (lv === 2) {
            if (joinC.length !== d.join || splitC.length !== d.split) fails.push(`not ${d.join} contractions to write and ${d.split} to split`);
            const own = [...document.querySelectorAll('[data-lcs-own]')];
            if (own.length !== d.own + 1 || own[0].dataset.lcsExample !== '1') fails.push(`not ${d.own} owners and a done example, first`);
            own.forEach((e) => { const o = e.querySelector('[data-lcs-owner]'), t = e.querySelector('[data-lcs-thing]'), kind = e.dataset.lcsOwnerkind, ln = e.querySelector('[data-lcs-line]'), key = ln && ln.querySelector('text');
              const ok = o && t && e.dataset.lcsOwn === o.dataset.lcsOwner + AP + 's ' + t.dataset.lcsThing && txt(t) === t.dataset.lcsThing && txt(o) === o.dataset.lcsOwner && (kind === 'animal' ? (A.animalPairs[o.dataset.lcsOwner] || []).includes(t.dataset.lcsThing) && o.querySelector('img') : A.names.includes(o.dataset.lcsOwner) && !o.querySelector('img') && A.nameThings.includes(t.dataset.lcsThing)) && t.querySelector('img');
              if (!ok) fails.push(`"${e.dataset.lcsOwn}" is not its owner and the thing pictured`);
              if (letters(e.dataset.lcsOwn) > 8) fails.push(`"${e.dataset.lcsOwn}" has more than 8 letters for half the page`);
              if (e.dataset.lcsExample === '1' ? !key || key.textContent !== e.dataset.lcsOwn : isKey ? !key || key.textContent !== e.dataset.lcsOwn : !!key) fails.push('a row of the owners is written wrong');
              if (e.dataset.lcsExample !== '1') answers.push(e.dataset.lcsOwn); });
            const rest = own.slice(1).map((e) => e.dataset.lcsOwnerkind);
            if (!rest.includes('animal') || !rest.includes('name')) fails.push('the owners are not an animal and a named child');
            if (new Set(own.map((e) => e.querySelector('[data-lcs-owner]').dataset.lcsOwner)).size !== own.length) fails.push('an owner stands twice');
            if (lines.length !== d.join + d.split + d.own + 1) fails.push(`${lines.length} writing rows`);
          }
          if (lv === 3) {
            if (joinC.length !== d.mixed / 2 || splitC.length !== d.mixed / 2) fails.push(`part 1 has not ${d.mixed / 2} contractions to write and ${d.mixed / 2} to split`);
            if ([...joinC, ...splitC].some((e) => (e.dataset.lcsJoin || e.dataset.lcsSplit) === 'it' + AP + 's')) fails.push('part 1 asks for the worked pair it is: it’s');
            const own = [...document.querySelectorAll('[data-lcs-own]')];
            if (own.length !== d.ownSent) fails.push(`${own.length} sentences about an owner`);
            own.forEach((e) => { const m = /^The ([a-z]+) belongs to ([A-Z][a-z]+)\.$/.exec(txt(e.querySelector('[data-lcs-prompt]'))); if (!m || e.dataset.lcsOwn !== m[2] + AP + 's ' + m[1] || !A.names.includes(m[2]) || !A.nameThings.includes(m[1]) || letters(e.dataset.lcsOwn) > 8) fails.push(`"${e.dataset.lcsOwn}" is not who owns what in its sentence, or has more than 8 letters`); answers.push(e.dataset.lcsOwn); });
            const fx = [...document.querySelectorAll('[data-lcs-fix]')];
            if (fx.length !== d.fix) fails.push(`${fx.length} sentences to fix`);
            let firstN = 0;
            fx.forEach((e) => { const bank = A.fix.find((x) => pr(x.right) === e.dataset.lcsFix && txt(e.querySelector('[data-lcs-prompt]')) === x.text); if (!bank || e.dataset.lcsWrong !== bank.wrong || e.dataset.lcsKind !== bank.kind) fails.push(`the sentence to fix for "${e.dataset.lcsFix}" is not its sentence of the bank`); answers.push(e.dataset.lcsFix);
              const isFirst = bank && (bank.text.match(/[A-Za-z']+/g) || [])[0] === bank.wrong; if (isFirst) firstN++;
              // a contraction that starts its sentence: the key accepts a lowercase one (never for I)
              const acc = e.querySelector('[data-lcs-accept]'), need = isKey && bank && bank.kind === 'c' && isFirst && !/^I'/.test(bank.right);
              if (need ? !acc || acc.dataset.lcsAccept !== pr(bank.right.toLowerCase()) : !!acc) fails.push(`the key ${need ? 'does not accept' : 'accepts'} a lowercase ${e.dataset.lcsFix.toLowerCase()}`);
              if (bank && bank.kind === 'c') seenC.push(e.dataset.lcsFix.replace(/^./, (c) => c.toLowerCase()).replace(/^i(?=’)/, 'I')); });
            if (firstN > Math.floor(d.fix / 2)) fails.push(`the word to fix stands first in ${firstN} of ${d.fix} sentences`);
            const fk = fx.map((e) => e.dataset.lcsKind); if (!fk.includes('c') || !fk.includes('p')) fails.push('the sentences to fix are not contractions and owners');
            const names = [...own.map((e) => e.dataset.lcsOwn.split(AP)[0]), ...fx.map((e) => (e.dataset.lcsKind === 'p' ? e.dataset.lcsFix.split(AP)[0] : null)).filter(Boolean)];
            if (new Set(names).size !== names.length) fails.push('a name stands twice');
            if (lines.length !== d.mixed + d.ownSent + d.fix) fails.push(`${lines.length} writing rows`);
          }
          if (new Set(seenC).size !== seenC.length) fails.push('a contraction stands in two tasks of the page');
          if (lv < 3 && /\bits\b/i.test(txt(root))) fails.push('"its" stands on a level before 3');
        }
        // what the child writes is printed nowhere on the page of the child
        if (!isKey) { const all = txt(root).toLowerCase(); answers.forEach((a) => { const re = new RegExp('(^|[^a-z’])' + pr(a).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z’])'); if (re.test(all)) fails.push(`the answer "${pr(a)}" is printed on the page`); }); }
        if (new Set(answers).size !== answers.length) fails.push('an answer stands twice on the page');
        return fails;
      }, { LEVELS, ROW, CLEAR, BAND, GAPW, EXAMPLES: { prefix: { 1: ['[data-lcs-build]'] }, suffix: { 1: ['[data-lcs-markword]', '[data-lcs-write]'] }, apostrophe: { 1: ['[data-lcs-join]'], 2: ['[data-lcs-own]'] } }, prefix: BANK.prefix, suffix: BANK.suffix, apostrophe: BANK.apostrophe, choose: { prefix: BANK.prefix.choose, suffix: BANK.suffix.choose } });
    },
  };
}

module.exports = { makeWordBuildingType, wbFaultsOf, LEVELS, fitsRow, gapLines };
