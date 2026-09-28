/**
 * lotw-common.js — Level Set 2026-09-28 (Letter of the Week, whole alphabet): turns the mechanical candidates
 * (lotw-candidates.js) + a native panel's review into full letter blocks, in the published block shape
 * `{L, upper, pair, avoid, items:[{theme,noun,key,word,graphemes,pos,split}], foils:[…]}`.
 * Foils are MECHANICAL: pool words whose NFD base lacks the letter — the pair-initial ones (K-328 + K-317 d3),
 * the avoid-initial ones (K-317 d2) and plain ones (d1) — never a word the panel dropped, never an excluded
 * picture. Used by validate-lotw-content.js (panel self-check) and import-lotw-panels.js (the data file).
 */
'use strict';
const { bank, approvedWords, daStrict, hasChunkLayer, nfdBase, letterFold } = require('../../lib/b3-common.js');
const { candidates } = require('../../lib/b3-picture-index.js');
const { displayWord, traceable } = require('../../lib/b2-common.js');

const BW = /(^|[\s_])(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s\d+)?$/i;
const FOILS = { pair: 6, avoid: 6, plain: 10 };

// digraphs read as ONE grapheme where no verified chunk layer exists (the panel confirms or corrects each item)
const DIGRAPHS = { es: ['ch', 'll', 'rr', 'qu'], it: ['ch', 'gh', 'gn', 'sc', 'gl', 'qu'], pt: ['ch', 'lh', 'nh', 'rr', 'ss', 'qu', 'gu'], fi: ['aa', 'ee', 'ii', 'oo', 'uu', 'yy', 'ää', 'öö', 'kk', 'll', 'mm', 'nn', 'pp', 'rr', 'ss', 'tt', 'ng', 'nk'] };
/** A word's graphemes: the approved chunks (de/nl/sv/no), letters at level "letter", else the digraph pass. */
function segment(loc, word, e, level) {
  const w = word.toLocaleLowerCase(loc);
  if (hasChunkLayer(loc) && e && Array.isArray(e.chunks)) return e.chunks.flat().map((x) => x.toLocaleLowerCase(loc));
  if (level === 'letter' || !DIGRAPHS[loc]) return [...w];
  const out = [];
  for (let i = 0; i < w.length;) {
    const d = DIGRAPHS[loc].find((x) => w.startsWith(x, i));
    if (d) { out.push(d); i += d.length; } else { out.push(w[i]); i++; }
  }
  return out;
}
/** The eligible pool of a locale (approved ∧ colour-pictured ∧ traceable; da strict), words distinct, with graphemes. */
function poolOf(loc, exclude = new Set()) {
  const level = bank('letter-of-the-week', loc).level;
  const seen = new Set(), out = [];
  for (const e of approvedWords(loc)) {
    if (loc === 'da' && !daStrict(e)) continue;
    const word = displayWord(e.word, loc);
    if (seen.has(word) || !traceable(word)) continue;
    const pics = candidates(e.key, loc).filter((c) => !BW.test(c.theme) && !exclude.has(c.theme + '/' + c.noun));
    if (!pics.length) continue;
    seen.add(word);
    out.push({ key: e.key, word, split: e.split, graphemes: segment(loc, word, e, level), pic: { theme: pics[0].theme, noun: pics[0].noun }, altPics: pics.slice(1, 4).map((c) => c.theme + '/' + c.noun) });
  }
  return out;
}

/**
 * The new letter blocks of a locale. `cand` = lotw-candidates.js output, `review` = the panel file,
 * `exclude` = picture refs refused by the picture panel. Returns { blocks, refused, notes }.
 */
/**
 * en is a LETTER-level locale, but its faces print "hear"/"sound" (K-325 "the {U} sound", K-326 "where you hear
 * {U}"), so a word whose letter sits ONLY in a spelling you cannot hear as that letter is not an honest example:
 * sh/ch/th/gh/ph/wh (h, s, c, t, p, g), aw/ew/ow + wr (w), silent final e, kn, gn, mb, ng/nk (n, g), tch, soft c.
 * Returns true when EVERY occurrence of L in the word is unheard (the word is dropped for that letter).
 */
function enUnheardOnly(word, L) {
  const w = word.toLowerCase();
  let seen = 0, heard = 0;
  for (let i = 0; i < w.length; i++) {
    if (w[i] !== L) continue;
    seen++;
    const p = w[i - 1] || '', n = w[i + 1] || '';
    const unheard =
      (L === 'h' && 'scgtwp'.includes(p) && p) ||
      (L === 'w' && ('aeo'.includes(p) && p || (i === 0 && n === 'r'))) ||
      (L === 'e' && i === w.length - 1 && w.length > 2 && !'aeiouy'.includes(p)) ||
      (L === 'k' && i === 0 && n === 'n') ||
      (L === 'g' && (p === 'n' || n === 'h' || (i === 0 && n === 'n'))) ||
      (L === 'n' && (n === 'g' || n === 'k')) ||
      (L === 't' && (n === 'h' || (n === 'c' && w[i + 2] === 'h'))) ||
      (L === 'c' && (n === 'h' || 'eiy'.includes(n) && n)) ||
      (L === 's' && n === 'h') ||
      (L === 'p' && n === 'h') ||
      (L === 'b' && p === 'm' && i === w.length - 1);
    if (!unheard) heard++;
  }
  return seen > 0 && heard === 0;
}

function assemble(loc, cand, review, exclude = new Set()) {
  const B = bank('letter-of-the-week', loc);
  const sound = B.level === 'sound';
  const pool = poolOf(loc, exclude);
  const first = (w, g) => (sound && g ? g[0] : [...w.toLocaleLowerCase(loc)][0]);
  // a pool word's graphemes for foil purposes: the candidate list carries them for words it saw
  const gOf = new Map(pool.map((p) => [p.word, p.graphemes]));
  const blocks = [], refused = [], notes = [];
  for (const l of cand.letters) {
    if (l.published) continue;
    const r = (review.letters || {})[l.L];
    if (!r) { refused.push({ L: l.L, why: 'no panel review' }); continue; }
    if (r.refuse) { refused.push({ L: l.L, why: r.why || 'refused by the panel' }); continue; }
    const drop = new Set(r.drop || []);
    const items = [];
    for (const w of l.words) {
      if (drop.has(w.word) || exclude.has(w.pic.theme + '/' + w.pic.noun)) continue;
      if (loc === 'en' && enUnheardOnly(w.word, l.L)) { notes.push(`${l.L}: "${w.word}" — the letter is not heard (en sound rule) — dropped`); continue; }
      const g = (r.graphemes && r.graphemes[w.word]) || w.graphemes;
      if (g.join('') !== w.word.toLocaleLowerCase(loc)) { notes.push(`${l.L}: "${w.word}" graphemes ${JSON.stringify(g)} do not spell it — dropped`); continue; }
      const pos = g.indexOf(l.L);
      if (pos < 0) { notes.push(`${l.L}: "${w.word}" has no ${l.L} grapheme after review — dropped`); continue; }
      items.push({ theme: w.pic.theme, noun: w.pic.noun, key: w.key, word: w.word, graphemes: g, pos, split: w.split });
    }
    // foils: pool words free of the letter, the panel's drops excluded, never an item word
    const itemWords = new Set(items.map((i) => i.word));
    const clean = pool.filter((p) => !letterFold(p.word, loc).includes(l.L) && !nfdBase(p.word).includes(l.L) && !drop.has(p.word) && !itemWords.has(p.word))
      .sort((a, b) => [...a.word].length - [...b.word].length || (a.word < b.word ? -1 : 1));
    const take = (arr, n) => arr.slice(0, n);
    const initialOf = (p) => first(p.word, gOf.get(p.word));
    const pairF = r.pair ? take(clean.filter((p) => initialOf(p) === r.pair), FOILS.pair) : [];
    const avoidF = take(clean.filter((p) => (r.avoid || []).includes(initialOf(p)) && !pairF.includes(p)), FOILS.avoid);
    // a plain foil starts with neither the pair nor an avoid letter by SOUND or by SPELLING: the builder picks
    // avoid-initial foils by first letter, the verifier by first grapheme, so de "Ei" (e-letter, ei-sound) is neither
    const letter0 = (p) => [...p.word.toLocaleLowerCase(loc)][0];
    const marked = [r.pair, ...(r.avoid || [])].filter(Boolean);
    const plainF = take(clean.filter((p) => !pairF.includes(p) && !avoidF.includes(p) && !marked.includes(initialOf(p)) && !marked.includes(letter0(p))), FOILS.plain);
    const foils = [...pairF, ...avoidF, ...plainF].map((p) => {
      const f = { theme: p.pic.theme, noun: p.pic.noun, key: p.key, word: p.word };
      if (sound) f.graphemes = p.graphemes;   // K-328 reads graphemes[0] at level sound
      return f;
    });
    blocks.push({ L: l.L, upper: l.upper, pair: r.pair || null, avoid: r.avoid || [], items, foils });
  }
  return { blocks, refused, notes };
}

/** Findings of the family gate that only mean "this letter cannot carry that face" (never an error). */
const CAPACITY = /initial items <|medial items <|final items <|foils < |foils begin with|initial words in the eligible/;

module.exports = { enUnheardOnly, poolOf, segment, assemble, CAPACITY };
