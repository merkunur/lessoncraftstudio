#!/usr/bin/env node
/**
 * The decodability gate of the readers (Daily Teaching System, Part 8.1).
 *
 *   node scripts/readers/gate.js                 checks the word list, its recorded parses and every book
 *   node scripts/readers/gate.js --write         writes scripts/readers/lexicon.en.json from words.en.js (then read it)
 *   node scripts/readers/gate.js --poison        proves each rule: a book or word made wrong on purpose must fail
 *   node scripts/readers/gate.js --list          prints every book with its words by kind (for the reviewer)
 *
 * Rules, decodable books (a book of set N):
 *   F1  every word is in the lexicon with all its correspondences taught by set N, or is a heart word taught by N
 *   F2  a word outside the lexicon is refused (the lexicon is the authority: English cannot be parsed by rule);
 *       the one exception is the ending s on a lexicon word (cats, sits, naps), with the sound English gives it
 *   F3  before the set that teaches blends, a word holds no two consonant letters side by side that each say their own
 *       sound (x and qu count as one unit; the ending s and the word "and" apart)
 *   F4  a book has a cover title and three pages; a page has one or two sentences and 2 to 14 words; from set 5 on
 *       every page has two sentences (one sheet carries three pages, so the later sets must carry more text a page);
 *       the title obeys F1 to F3 too
 *   F5  a rare word or a word that needs care (words.en.js RARE, CARE) stands in a book only when the book allows it
 * Rules, picture readers (level A, B or C):
 *   T1  every word is a sight word of the level, decodable by the level's set, a word its page's picture shows
 *       (the adult names the pictures with the child BEFORE reading), or one of the book's new words (three at most)
 *   T2  every page has a picture, and the picture's word stands in the page's text
 *   T3  a page of level A has one sentence of at most 6 words; level B at most 8; level C at most two sentences
 * Rules of the word list:
 *   L1  lexicon.en.json is exactly what the word list writes (a parse is never edited by hand in the JSON)
 *   L2  every correspondence of a parse is in the scope; the letters of the parse spell the word
 *   L3  every word has a vowel sound, and a word of sets 1 to 8 has exactly one
 *
 * In a page's text " | " marks where the line breaks on the printed page (at a phrase, never before a last word alone).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const SCOPE = require('./scope.en.js');
const { WORDS, NAMES, PARSES, EARLY, RARE, CARE } = require('./words.en.js');
const LEX_FILE = path.join(__dirname, 'lexicon.en.json');

const stageOf = new Map(); const firstSound = new Map(); const FINAL = new Set();
for (const s of SCOPE.stages) { for (const g of s.gpc) { stageOf.set(g, s.n); const sp = g.split(':')[0]; if (!firstSound.has(sp)) firstSound.set(sp, g); } for (const g of s.final || []) FINAL.add(g.split(':')[0]); }
const SPELLINGS = [...firstSound.keys()].filter((x) => !x.includes('_') && !FINAL.has(x)).sort((a, b) => b.length - a.length);
const BLEND_STAGE = SCOPE.stages.find((s) => s.blends).n;
const heartStage = new Map(); for (const s of SCOPE.stages) for (const h of s.heart) heartStage.set(h === 'I' ? 'I' : h.toLowerCase(), s.n);
const isVowel = (ph) => SCOPE.vowels.includes(ph);
const stageName = (n) => (SCOPE.stages.find((s) => s.n === n) || {}).name || '';

/** the default parse: the longest taught spelling first, each with its first sound in the scope */
function defaultParse(word) {
  const w = word.toLowerCase(); const out = [];
  for (let i = 0; i < w.length;) {
    const sp = SPELLINGS.find((x) => w.startsWith(x, i));
    if (!sp) return null;
    out.push(firstSound.get(sp)); i += sp.length;
  }
  return out.join(' ');
}
function entryOf(word, parse) {
  const gs = parse.split(' ');
  const stage = Math.max(...gs.map((g) => stageOf.get(g) || 99));
  const sounds = gs.map((g) => g.split(':')[1]);
  let blend = false; for (let i = 1; i < sounds.length; i++) if (!isVowel(sounds[i]) && !isVowel(sounds[i - 1])) blend = true;
  const early = EARLY[word.toLowerCase()];
  return { parse, stage: early || (blend ? Math.max(stage, BLEND_STAGE) : stage), ...(blend ? { blend: true } : {}) };
}
function buildLexicon() {
  const lex = {};
  for (const word of [...WORDS, ...NAMES]) {
    const key = word.toLowerCase();
    const parse = PARSES[key] || defaultParse(word);
    if (!parse) throw new Error('no parse for "' + word + '"');
    lex[key] = Object.assign(entryOf(word, parse), NAMES.includes(word) ? { name: word } : {});
  }
  return lex;
}
const tokens = (text) => text.replace(/[“”"!?.,|]/g, ' ').split(/\s+/).filter(Boolean);
const norm = (t) => (t === 'I' ? 'I' : t.toLowerCase());
const plain = (text) => text.replace(/\s*\|\s*/g, ' ');
// (what a speaker says inside speech marks ends with its own mark and is still part of ONE sentence: "Quack!" said the duck.)
const sentences = (text) => plain(text).replace(/[“"][^”"]*[”"]/g, 'Q').split(/[.!?]+/).map((x) => x.trim()).filter(Boolean).length;

/** why a word may NOT stand in a decodable book of the set (null = it may) */
function refuseFirst(tok, stage, lex) {
  const w = norm(tok);
  const hs = heartStage.get(w);
  const e = lex[w];
  if (e && e.stage <= stage) return null;
  if (hs !== undefined && hs <= stage) return null;
  if (e) return '"' + tok + '" is taught at set ' + e.stage + (e.blend ? ' (two consonant sounds side by side)' : '');
  if (hs !== undefined) return '"' + tok + '" is a heart word of set ' + hs;
  // the ending s on a word of the list
  if (w.length > 2 && w.endsWith('s') && lex[w.slice(0, -1)]) {
    const b = lex[w.slice(0, -1)]; const last = b.parse.split(' ').pop().split(':')[1];
    if (SCOPE.sibilant.includes(last)) return '"' + tok + '": English adds -es after ' + last + ', not s';
    const s = SCOPE.unvoiced.includes(last) ? 's:s' : 's:z';
    const need = Math.max(b.stage, stageOf.get(s), 2);
    return need <= stage ? null : '"' + tok + '" (the ending s says ' + s.split(':')[1] + ') is readable from set ' + need;
  }
  return '"' + tok + '" is not in the word list';
}
const LEVELS = {
  A: { stage: 3, words: 6, sentences: 1, sight: ['I', 'a', 'the', 'see', 'look', 'at', 'like', 'my', 'can', 'go', 'is', 'it', 'in', 'we', 'to', 'and', 'big', 'little'] },
  B: { stage: 7, words: 8, sentences: 1, sight: ['this', 'here', 'you', 'are', 'he', 'she', 'said', 'too', 'very', 'has', 'have', 'not', 'on', 'up', 'no', 'yes'] },
  C: { stage: 8, words: 9, sentences: 2, sight: ['they', 'was', 'with', 'for', 'of', 'what', 'come', 'all', 'when', 'eat', 'eats', 'get', 'put', 'some', 'out', 'day', 'play'] },
};
const sightOf = (level) => { const out = new Set(); for (const k of ['A', 'B', 'C']) { for (const w of LEVELS[k].sight) out.add(w === 'I' ? 'I' : w.toLowerCase()); if (k === level) break; } return out; };
const special = (w, b) => ((RARE.includes(w) || CARE.includes(w)) && !(b.allow || []).includes(w) ? (RARE.includes(w) ? 'a rare word' : 'a word that needs care') : null);

function checkBook(b, lex) {
  const bad = [];
  if (!b.title || !Array.isArray(b.pages) || b.pages.length !== 3) bad.push('F4/T: a book has a title and three pages');
  if (!Array.isArray(b.talk) || b.talk.length < 2 || b.talk.length > 3 || !b.note) bad.push('a book has two or three talk questions and a teacher note');
  for (const [i, text] of (b.pages || []).entries()) if (/\|\s*\S+[.!?"”]*\s*$/.test(text) && tokens(text.split('|').pop()).length < 2) bad.push('page ' + (i + 1) + ': the last line holds one word alone');
  if (b.series === 'first') {
    if (!SCOPE.stages.some((s) => s.n === b.stage)) bad.push('no set ' + b.stage);
    for (const [i, text] of [b.title, ...(b.pages || [])].entries()) {
      const ts = tokens(text);
      if (i > 0 && (ts.length < 2 || ts.length > 14)) bad.push('F4 page ' + i + ': ' + ts.length + ' words');
      if (i > 0 && sentences(text) > 2) bad.push('F4 page ' + i + ': ' + sentences(text) + ' sentences');
      if (i > 0 && b.stage >= 5 && sentences(text) < 2) bad.push('F4 page ' + i + ': one sentence (from set 5 on a page has two)');
      for (const t of ts) {
        const r = refuseFirst(t, b.stage, lex); if (r) bad.push('F1 ' + (i ? 'page ' + i : 'title') + ': ' + r);
        const sp = special(norm(t), b); if (sp) bad.push('F5 ' + (i ? 'page ' + i : 'title') + ': "' + t + '" is ' + sp);
      }
    }
    if (b.pics || b.cover) bad.push('a decodable book carries no picture (the child draws)');
  } else if (b.series === 'theme') {
    const L = LEVELS[b.level];
    if (!L) { bad.push('no level ' + b.level); return bad; }
    const sight = sightOf(b.level); const nw = new Set((b.newWords || []).map((x) => x.toLowerCase()));
    if (nw.size > 3) bad.push('T1: ' + nw.size + ' new words (three at most)');
    if (!b.cover || !Array.isArray(b.pics) || b.pics.length !== 3) bad.push('T2: a picture reader has a cover picture and one picture a page');
    const usedNew = new Set();
    for (const [i, text] of [b.title, ...(b.pages || [])].entries()) {
      const ts = tokens(text);
      const carried = new Set(i > 0 && b.pics && b.pics[i - 1] ? b.pics[i - 1].words.map((x) => x.toLowerCase()) : (b.cover && b.cover.words) || []);
      if (i > 0) {
        if (ts.length > L.words) bad.push('T3 page ' + i + ': ' + ts.length + ' words (level ' + b.level + ': ' + L.words + ' at most)');
        if (sentences(text) > L.sentences) bad.push('T3 page ' + i + ': ' + sentences(text) + ' sentences');
        if (b.pics && b.pics[i - 1] && !b.pics[i - 1].words.some((w) => ts.map(norm).includes(w.toLowerCase()))) bad.push('T2 page ' + i + ': the word of its picture (' + b.pics[i - 1].words.join(', ') + ') is not in the text');
      }
      for (const t of ts) {
        const w = norm(t);
        if (sight.has(w) || carried.has(w)) continue;
        if (nw.has(w)) { usedNew.add(w); continue; }
        if (!refuseFirst(t, L.stage, lex)) continue;
        bad.push('T1 ' + (i ? 'page ' + i : 'title') + ': "' + t + '" is no sight word of level ' + b.level + ', not decodable by set ' + L.stage + ', not shown by the picture and no new word');
      }
    }
    for (const w of nw) if (!usedNew.has(w)) bad.push('T1: the new word "' + w + '" stands nowhere in the book');
  } else bad.push('series ' + b.series);
  return bad;
}
function checkLexicon(lex) {
  const bad = [];
  for (const [w, e] of Object.entries(lex)) {
    const gs = e.parse.split(' ');
    for (const g of gs) if (!stageOf.has(g)) bad.push('L2 "' + w + '": ' + g + ' is no correspondence of the scope');
    if (gs.map((g) => g.split(':')[0]).join('') !== w) bad.push('L2 "' + w + '": the parse spells "' + gs.map((g) => g.split(':')[0]).join('') + '"');
    const v = gs.filter((g) => isVowel(g.split(':')[1])).length;
    if (v < 1 || (e.stage <= 8 && v !== 1)) bad.push('L3 "' + w + '": ' + v + ' vowel sounds');
  }
  return bad;
}
/** the words of a book by kind, as the book prints them (a name keeps its capital), for the companion page */
function wordsOf(b, lex) {
  const seen = new Set(); const out = { decodable: [], heart: [], sight: [], picture: [], new: [] };
  const stage = b.series === 'first' ? b.stage : LEVELS[b.level].stage; const sight = b.series === 'theme' ? sightOf(b.level) : new Set();
  const nw = new Set((b.newWords || []).map((x) => x.toLowerCase()));
  for (const [i, text] of [b.title, ...b.pages].entries()) for (const t of tokens(text)) {
    const w = norm(t); if (seen.has(w)) continue; seen.add(w);
    const shown = lex[w] && lex[w].name && /^[A-Z]/.test(t) ? lex[w].name : w;
    const carried = b.series === 'theme' && (i > 0 ? b.pics[i - 1].words : (b.cover.words || [])).map((x) => x.toLowerCase()).includes(w);
    if (b.series === 'first') (heartStage.has(w) && !(lex[w] && lex[w].stage <= stage) ? out.heart : out.decodable).push(shown);
    else if (nw.has(w)) out.new.push(shown); else if (carried) out.picture.push(shown); else if (sight.has(w)) out.sight.push(shown); else out.decodable.push(shown);
  }
  return out;
}
/** six words of the book's own set that are NOT in the book: read before the book is opened (decodable books only) */
function warmUp(b, lex) {
  if (b.series !== 'first') return [];
  const inBook = new Set([b.title, ...b.pages].flatMap((t) => tokens(t).map(norm)));
  const pool = Object.keys(lex).filter((w) => lex[w].stage === b.stage && !lex[w].name && !inBook.has(w) && !RARE.includes(w) && !CARE.includes(w) && !EARLY[w]);
  const step = Math.max(1, Math.floor(pool.length / 6));
  return pool.filter((_, i) => i % step === 0).slice(0, 6);
}
module.exports = { SCOPE, LEVELS, buildLexicon, checkBook, checkLexicon, wordsOf, warmUp, stageName, refuseFirst, tokens, plain, heartStage };

if (require.main === module) {
  const arg = (k) => process.argv.includes('--' + k);
  const built = buildLexicon();
  const text = JSON.stringify(built, null, 1) + '\n';
  if (arg('write')) { fs.writeFileSync(LEX_FILE, text); console.log('lexicon: ' + Object.keys(built).length + ' words → ' + path.relative(process.cwd(), LEX_FILE)); process.exit(0); }
  let fails = 0; const fail = (m) => { fails++; console.log('FAIL  ' + m); };
  if (!fs.existsSync(LEX_FILE) || fs.readFileSync(LEX_FILE, 'utf8').replace(/\r\n/g, '\n') !== text) fail('L1 lexicon.en.json is not what the word list writes (node scripts/readers/gate.js --write)');
  const lex = fs.existsSync(LEX_FILE) ? JSON.parse(fs.readFileSync(LEX_FILE, 'utf8')) : built;
  for (const m of checkLexicon(lex)) fail(m);
  const books = require('./books.en.js');
  const ids = new Set();
  for (const b of books) { if (ids.has(b.id)) fail(b.id + ' stands twice'); ids.add(b.id); for (const m of checkBook(b, lex)) fail(b.id + ': ' + m); }
  if (arg('list')) for (const b of books) { const w = wordsOf(b, lex); console.log('\n' + b.id + ' [' + (b.series === 'first' ? 'set ' + b.stage + ': ' + stageName(b.stage) : 'level ' + b.level) + '] ' + b.title + '\n  ' + b.pages.map(plain).join(' / ') + '\n  ' + Object.entries(w).filter(([, v]) => v.length).map(([k, v]) => k + ': ' + v.join(' ')).join(' · ') + (b.series === 'first' ? '\n  warm up: ' + warmUp(b, lex).join(' ') : '')); }
  if (arg('poison')) {
    const clone = (x) => JSON.parse(JSON.stringify(x));
    const first = () => clone(books.find((b) => b.series === 'first' && b.stage === 3));
    const late = () => clone(books.find((b) => b.series === 'first' && b.stage >= 5));
    const theme = () => clone(books.find((b) => b.series === 'theme' && b.level === 'A'));
    const P = [
      ['a word of a later set (ship at set 3)', 'F1', () => { const b = first(); b.pages[0] = 'Kit sat on a ship.'; return checkBook(b, lex); }],
      ['a heart word of a later set (said at set 3)', 'F1', () => { const b = first(); b.pages[1] = 'A dog said no.'; return checkBook(b, lex); }],
      ['a word outside the list (house)', 'F1', () => { const b = first(); b.pages[2] = 'Kit hid in a house.'; return checkBook(b, lex); }],
      ['a blend before the blend set (frog at set 8)', 'F1', () => { const l = clone(lex); l.frog = entryOf('frog', defaultParse('frog')); const b = first(); b.stage = 8; b.pages[0] = 'A frog sat on a mat. | It is big.'; return checkBook(b, l); }],
      ['an ending s that says z before s:z is taught (dogs at set 3)', 'F1', () => { const b = first(); b.pages[1] = 'The dogs got on the mat.'; return checkBook(b, lex); }],
      ['-s after a hissing sound (boxs)', 'F1', () => { const b = first(); b.stage = 8; b.pages[1] = 'The boxs fell. | It is bad.'; return checkBook(b, lex); }],
      ['a page of fifteen words', 'F4', () => { const b = first(); b.pages[0] = 'Kit sat on a mat and a dog sat on it and a cat sat.'; return checkBook(b, lex); }],
      ['three sentences on a page', 'F4', () => { const b = first(); b.pages[0] = 'Kit sat. A dog sat. A cat sat.'; return checkBook(b, lex); }],
      ['one sentence on a page of set 5 or later', 'F4', () => { const b = late(); b.pages[0] = tokens(b.pages[0].split(/[.!?]/)[0]).join(' ') + '.'; return checkBook(b, lex); }],
      ['a rare word (cot)', 'F5', () => { const b = first(); b.pages[0] = 'Kit the cat sat on a cot.'; return checkBook(b, lex); }],
      ['a word that needs care (hit)', 'F5', () => { const b = first(); b.pages[1] = 'A dog hit the mat.'; return checkBook(b, lex); }],
      ['one word alone on the last line', 'alone', () => { const b = first(); b.pages[0] = 'Kit the cat sat on a | mat.'; return checkBook(b, lex); }],
      ['a picture in a decodable book', 'no picture', () => { const b = first(); b.cover = { theme: 'animals', noun: 'cat', words: [] }; return checkBook(b, lex); }],
      ['a title with an untaught word', 'F1 title', () => { const b = first(); b.title = 'Kit and the Fish'; return checkBook(b, lex); }],
      ['picture reader: a word nobody carries (elephant with a cat picture)', 'T1', () => { const b = theme(); b.pages[0] = 'I see a cat and an elephant.'; return checkBook(b, lex); }],
      ['picture reader: the picture word is not in the text', 'T2', () => { const b = theme(); b.pages[1] = 'I see it.'; return checkBook(b, lex); }],
      ['picture reader: seven words at level A', 'T3', () => { const b = theme(); b.pages[2] = 'I see a big big big fish.'; return checkBook(b, lex); }],
      ['picture reader: four new words', 'T1', () => { const b = theme(); b.newWords = ['pets', 'one', 'two', 'three']; return checkBook(b, lex); }],
      ['picture reader: a new word that stands nowhere', 'T1', () => { const b = theme(); b.newWords = (b.newWords || []).concat(['house']); return checkBook(b, lex); }],
      ['lexicon: a parse with a correspondence the scope lacks', 'L2', () => checkLexicon(Object.assign(clone(lex), { cat: { parse: 'c:s a:ae t:t', stage: 3 } }))],
      ['lexicon: a parse that spells another word', 'L2', () => checkLexicon(Object.assign(clone(lex), { cat: { parse: 'c:k a:ae p:p', stage: 3 } }))],
      ['lexicon: two vowel sounds at set 5', 'L3', () => checkLexicon(Object.assign(clone(lex), { rabid: { parse: 'r:r a:ae b:b i:ih d:d', stage: 5 } }))],
      ['lexicon: a parse without a vowel (get read as ge + t)', 'L3', () => checkLexicon(Object.assign(clone(lex), { get: { parse: 'ge:j t:t', stage: 10 } }))],
    ];
    let caught = 0;
    for (const [name, rule, run] of P) { const got = run(); if (got.some((m) => m.includes(rule))) caught++; else fail('POISON not caught: ' + name + ' (wanted ' + rule + '; got ' + (got.join(' | ') || 'nothing') + ')'); }
    if (defaultParse('get') !== 'g:g e:eh t:t') fail('POISON: the default parser reads "get" as ' + defaultParse('get'));
    console.log(caught + ' of ' + P.length + ' poisons caught');
  }
  console.log(fails ? fails + ' problem(s)' : 'readers: ' + Object.keys(lex).length + ' words, ' + books.length + ' books (' + books.filter((b) => b.series === 'first').length + ' decodable, ' + books.filter((b) => b.series === 'theme').length + ' picture readers); all gates pass');
  process.exit(fails ? 1 : 0);
}
