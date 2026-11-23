/**
 * vowels-g1.js — four Grade 1 phonics pages on long vowels (English literacy year, Daily Teaching System Part 12.3,
 * 2026-11-17; the unit "Long Vowels: Silent e and Vowel Teams" of Grade 1). The words are data/literacy/long-vowels.en.json
 * (reviewed 2026-11-16 by a US Grade 1 reading specialist; this file carries the fix orders of that review).
 * The pages are led by PRINTED WORDS (a first grader reads and writes them); a picture stands only where the library
 * has one that a child names with that word. The instruction at the top of every page states the concept ("The e at the
 * end is silent. It makes the vowel say its name." / "ai and ay both spell long a."); the numbered tasks say what to do.
 *
 *   silente   Silent e Changes the Vowel (RF.1.3.c: final -e and common vowel team conventions for long vowels)
 *               every level: 1. pairs to finish (cap -> cap_ : add e, read both words to a partner); 2. four pictures, the
 *               two words of a pair stacked under each in a random order (at least two pictures show the SHORT word, at
 *               least one the long word); 3. a third task
 *               level 1  a_e: six pairs, four pictures (two show the short word, two the long word), two sentences with
 *                        the two words of a pair to circle (one right word short, one long)
 *               level 2  a_e and i_e: six pairs, four pictures, three sentences
 *               level 3  a_e, i_e, o_e, u_e: eight pairs, four pictures (one of each vowel), three silent-e words to write
 *                        under their pictures (one a_e, one i_e, one o_e word; the first letter is printed on the row, the
 *                        key prints the word)
 *             No word repeats across the tasks where the lists allow it: a pair shown in task 2 is never used in task 3
 *             (a sentence or a word to write), and task 1 takes the pairs used by no other task first (on Level 1 the
 *             eight a_e pairs cannot fill twelve places, so two task-2 pairs, both pictured by their LONG word, and the
 *             two sentence pairs come back there; Levels 2 and 3 repeat nothing).
 *   team      Long a: ai and ay · Long e: ee and ea · Long o: oa and ow (RF.1.3.c), one pair of spellings a type
 *               level 1  four words to match to their pictures; four words to finish with the first spelling, four with
 *                        the second (gaps for two letters, 96 px wide)
 *               level 2  eight words in two rows (4 + 4) to read out loud and write under their spelling (two columns of
 *                        four rows, the spellings as heads: large letters with a rule under them); six words with a gap
 *                        (3 + 3, no row or column all one spelling): ai/ay and oa/ow print the rule of the place in the
 *                        word, ee/ea (no rule) shows the picture of each word
 *               level 3  six words and an ODD word in two rows (4 + 3): cross out the word that does not say the long vowel
 *                        (said, head, cow; the key strikes it through in teal), write the others under their spelling
 *                        (two columns of three rows, headed by a tinted bar with the spelling at their left); three
 *                        pictures to write the word for (the first letter printed on the row); two sentences to finish from
 *                        a box of four words (one sentence for each spelling)
 *             No word is printed twice on a page: the rule's example words, the sort, the gap words, the words to write
 *             (never printed) and the word box are all different words.
 *
 * Handwriting rows (LEVELS rowH; verify() fails a row lower than its level's size, and any row under 76 px): 89 px, half
 * an inch from the top rule to the baseline, on silent e Level 3 and on the Level 2 sort; 80 px on the Level 3 vowel-team
 * page, the largest its sort, pictures and sentences leave room for. A sentence that ends at its blank keeps its stop on
 * the blank. English only. Themeless: a copy draws other words. PDF only. The bank is checked when this file loads
 * (vowelFaultsOf), including that every draw a page can make is completable; no picture is looked up at load.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const T = require('../../primitives/_tokens.js').color;
const BANK = require('../../data/literacy/long-vowels.en.json');
const { _parts } = require('./info-text.js');
const { W, esc, shuffle, line } = _parts;

const VOWELS = ['a', 'i', 'o', 'u'];
const PICS = BANK.pics || {};
const SE = BANK.silentE || { pairs: {}, pictured: {}, write: {}, sentences: {} };
const TEAMS = BANK.teams || {};
const isLong = (w) => /e$/.test(w);   // the long word of a silent-e pair ends in e; no short word of the bank does
/** pictures WITHDRAWN from every page (US K-3 reading teacher, review en-1119-lit, 2026-11-19): christmas/candy_cane for cane
 *  (a child says candy cane, and its first part can is the decoy of the pair) and vehicles/jeep for jeep (a brand-derived
 *  word many children say car or truck for). They leave a page AFTER its shuffle, so a page that never drew them is the
 *  page it was; the word stays a word of its list where no picture stands. verify() carries its own copy. */
const WITHDRAWN = new Set(['cane', 'jeep']);
const picShown = (w) => !WITHDRAWN.has(w);

const LEVELS = {
  // level 1 shows two short and two long pictures: its eight a_e pairs cannot fill all three tasks, and the two task-2 pairs
  // that come back in task 1 are then pairs whose pictured word is the LONG one (task 1 prints only the short word)
  silente: { 1: { vowels: ['a'], pairs: 6, sents: 2, write: 0, longPics: 2, font: 38, pic: 132, gap: 34, sfont: 28, pill: 26, pad: 18 }, 2: { vowels: ['a', 'i'], pairs: 6, sents: 3, write: 0, font: 36, pic: 124, gap: 32, sfont: 26, pill: 24, pad: 17 }, 3: { vowels: ['a', 'i', 'o', 'u'], pairs: 8, sents: 0, write: 3, font: 32, pic: 100, gap: 22, sfont: 22, pill: 22, pad: 13, wpic: 96, rowH: 89 } },
  team: { 1: { font: 36, pic: 80, row: 88, pad: 12 }, 2: { font: 34, pic: 62, rowH: 89, pad: 9 }, 3: { pic: 66, rowH: 80, pad: 7, write: 3 } },
};

/* ---------------------------------------------------------------- silent e: the draws ---------------------------------------------------------------- */
const seEntry = (v, w, se = SE) => { const p = ((se.pairs || {})[v] || []).find((x) => x.includes(w)); return p ? { v, w, s: p[0], l: p[1] } : null; };
/** four pictures from four pairs, two or more showing the short word, one or more the long word (exactly d.longPics where
 *  the level sets it), every vowel of the level that has a picture */
const picsOk = (shown, d, se = SE) => { const longs = shown.filter((x) => x.w === x.l).length;
  return shown.length === 4 && shown.every((x) => picShown(x.w)) && new Set(shown.map((x) => x.s)).size === 4 && shown.length - longs >= 2 && longs >= 1 && (!d.longPics || longs === d.longPics) &&
    d.vowels.every((v) => !((se.pictured || {})[v] || []).length || shown.some((x) => x.v === v)); };
/** sentences of n different pairs, none of them a pictured pair and none printing a word of a pictured pair in its text
 *  ("I can ___ the box shut." never stands beside the picture of a can), right words short and long */
const textWords = (s) => s.text.replace('___', ' ').toLowerCase().match(/[a-z]+/g) || [];
const sentsOk = (sents, n, banned) => sents.length === n && new Set(sents.flatMap((s) => [s.right, s.wrong])).size === n * 2 && sents.some((s) => isLong(s.right)) && sents.some((s) => !isLong(s.right)) && sents.every((s) => !banned.has(s.right) && !banned.has(s.wrong) && !textWords(s).some((w) => banned.has(w)));
const pictPool = (vs, se = SE) => vs.flatMap((v) => ((se.pictured || {})[v] || []).map((w) => seEntry(v, w, se)).filter(Boolean));
const sentPool = (vs, se = SE) => vs.flatMap((v) => ((se.sentences || {})[v] || []).map((s) => ({ ...s, v })));
const writePool = (vs, banned, se = SE) => vs.flatMap((v) => ((se.write || {})[v] || []).filter((w) => !banned.has(w)).map((w) => ({ v, w })));
/** words to write: one of each vowel that has some, then any; none a word of a pictured pair */
function pickWrites(vs, n, banned, rng) {
  const pool = writePool(vs, banned), first = [];
  for (const v of vs) { const c = shuffle(pool.filter((x) => x.v === v), rng)[0]; if (c) first.push(c); }
  return shuffle([...first, ...shuffle(pool.filter((x) => !first.includes(x)), rng)].slice(0, n), rng).map((x) => x.w);
}
const subsets = (list, k) => { const out = []; const go = (i, acc) => { if (acc.length === k) { out.push(acc.slice()); return; } for (let j = i; j < list.length; j++) { acc.push(list[j]); go(j + 1, acc); acc.pop(); } }; go(0, []); return out; };

/* ---------------------------------------------------------------- vowel teams: the draws ---------------------------------------------------------------- */
const teamAll = (tm) => [...tm.a.words, ...tm.b.words];
const wordRe = (w) => new RegExp('(^|[^a-z])' + w + '([^a-z]|$)', 'i');
/** the words of the lists that a printed text (the rule, a sentence) holds */
const listWordsIn = (tm, text) => teamAll(tm).filter((w) => wordRe(w).test(text || ''));
const isApart = (tm, x, y) => (tm.apart || []).some(([p, q]) => (p === x && q === y) || (p === y && q === x));

/** What must be true of the word bank before any page prints it. Returns the list of faults (empty = sound). */
function vowelFaultsOf(b) {
  const f = [];
  const pics = b.pics || {};
  for (const [w, p] of Object.entries(pics)) if (!Array.isArray(p) || p.length !== 2 || !p.every((x) => typeof x === 'string' && x) || /\bbw(\s*\d+)?$/i.test(p[0])) f.push('picture of ' + w + ': not a colour theme and a noun');
  const noWrite = new Set(b.noWrite || []);
  if (!noWrite.size) f.push('no list of words that are never written under a picture');
  const se = b.silentE || {};
  const P = se.pairs || {};
  for (const v of VOWELS) {
    const pairs = P[v] || [];
    if (pairs.length < 3) f.push(v + '_e: fewer than three pairs');
    const shortRe = new RegExp('^[^aeiou]*' + v + '[^aeiou]+$');
    pairs.forEach(([s, l]) => { if (l !== s + 'e' || !shortRe.test(s)) f.push(`${v}_e: "${s}" and "${l}" are no pair of a short-vowel word and the same word with a silent e`); });
    if (new Set(pairs.flat()).size !== pairs.length * 2) f.push(v + '_e: a word stands in two pairs');
    const pict = (se.pictured || {})[v] || [];
    for (const w of pict) if (!pics[w] || !pairs.some((p) => p.includes(w))) f.push(`${v}_e: the pictured word "${w}" has no picture or stands in no pair`);
    if (!pict.length) f.push(v + '_e: no pictured word');
    for (const w of (se.write || {})[v] || []) if (!pics[w] || !new RegExp('^[^aeiou]*' + v + '[^aeiou]e$').test(w) || noWrite.has(w)) f.push(`${v}_e: "${w}" to write has no picture, is no silent-e word, or is a word never to write`);
    const ss = (se.sentences || {})[v] || [];
    if (ss.length < 4) f.push(v + '_e: fewer than four sentences');
    ss.forEach((s) => { if (typeof s.text !== 'string' || s.text.split('___').length !== 2 || s.text.length > 42 || !/[.!?]$/.test(s.text) || !pairs.some((p) => p.includes(s.right) && p.includes(s.wrong) && s.right !== s.wrong)) f.push(`${v}_e: the sentence "${s.text}" has not one blank and the two words of a pair`); });
  }
  if (f.length) return f;
  // every page a level can draw must be completable: every valid set of pictures leaves sentences (or words to write) of other pairs
  for (const lv of [1, 2, 3]) {
    const d = LEVELS.silente[lv], vs = d.vowels, pool = pictPool(vs, se);
    const valid = subsets(pool, 4).filter((s) => picsOk(s, d, se));
    if (!valid.length) { f.push(`silent e level ${lv}: no four pictures of four pairs with two short words and a long word`); continue; }
    for (const shown of valid) {
      const banned = new Set(shown.flatMap((x) => [x.s, x.l]));
      if (d.sents && !subsets(sentPool(vs, se), d.sents).some((s) => sentsOk(s, d.sents, banned))) { f.push(`silent e level ${lv}: with the pictures ${shown.map((x) => x.w).join(', ')} no ${d.sents} sentences of other pairs (short and long answers) are left`); break; }
      if (d.write && writePool(vs, banned, se).length < d.write) { f.push(`silent e level ${lv}: with the pictures ${shown.map((x) => x.w).join(', ')} fewer than ${d.write} words to write are left`); break; }
    }
  }
  for (const [id, tm] of Object.entries(b.teams || {})) {
    const sides = [tm.a, tm.b];
    if (!tm.sound || sides.some((s) => !s || !/^[a-z]{2}$/.test(s.g || '') || !Array.isArray(s.words) || s.words.length < 8) || id !== sides.map((s) => s.g).join('-')) { f.push(id + ': not two spellings with eight words or more each'); continue; }
    const all = sides.flatMap((s) => s.words);
    if (new Set(all).size !== all.length) f.push(id + ': a word stands twice');
    sides.forEach((s, k) => s.words.forEach((w) => {
      const at = w.indexOf(s.g);
      if (at < 0 || w.indexOf(s.g, at + 1) >= 0 || /[aeiou]/.test(w.slice(0, at) + w.slice(at + 2)) || !/^[a-z]{2,6}$/.test(w)) f.push(`${id}: "${w}" does not hold ${s.g} once as its only vowel`);
      else if (tm.rule && (k === 0 ? at + 2 === w.length : at + 2 !== w.length)) f.push(`${id}: "${w}" breaks the rule of the place (${s.g} ${k === 0 ? 'in the middle' : 'at the end'})`);
    }));
    if (typeof tm.odd !== 'string' || !/^[a-z]{2,6}$/.test(tm.odd) || all.includes(tm.odd) || !sides.some((s) => tm.odd.includes(s.g))) f.push(id + ': the odd word does not hold one of the two spellings, or stands in a word list');
    const pic = sides.map((s) => s.words.filter((w) => pics[w]));
    if (pic[0].length + pic[1].length < 4) f.push(id + ': fewer than four pictured words');
    if (!tm.rule && (pic[0].length < 3 || pic[1].length < 3)) f.push(id + ': no rule tells the spelling, and one spelling has fewer than three pictured words');
    sides.forEach((s, k) => { if (s.words.length - pic[k].length < 4) f.push(`${id}: fewer than four ${s.g} words without a picture to finish on Level 1`); });
    const ruleW = tm.rule ? listWordsIn(tm, tm.rule) : [];
    if (tm.rule && (ruleW.length < 2 || sides.some((s) => s.words.filter((w) => !ruleW.includes(w)).length < 7))) f.push(id + ': the rule names no example words, or leaves fewer than seven words of a spelling for the sort and the gaps');
    const write = tm.write;
    if (!Array.isArray(write) || write.length < LEVELS.team[3].write || new Set(write).size !== write.length || write.some((w) => !all.includes(w) || !pics[w] || noWrite.has(w))) f.push(id + ': not enough pictured words to write (no word never to write)');
    const ss = tm.sentences || [];
    if (ss.length !== 4 || ss.some((s) => typeof s.text !== 'string' || s.text.split('___').length !== 2 || s.text.length > 40 || !/[.!?]$/.test(s.text) || !all.includes(s.right)) || new Set(ss.map((s) => s.right)).size !== 4) { f.push(id + ': not four sentences with one blank and four different words'); continue; }
    const answers = ss.map((s) => s.right);
    if (ss.some((s) => listWordsIn(tm, s.text.replace('___', ' ')).length)) f.push(id + ': a sentence prints a word of the lists');
    if (!Array.isArray(tm.box) || new Set(tm.box).size !== tm.box.length || tm.box.some((w) => !all.includes(w) || answers.includes(w)) || tm.box.filter((w) => !(write || []).includes(w)).length < 2) f.push(id + ': the word box does not hold words of the pair that answer no sentence (two or more that are no word to write)');
    if ((tm.apart || []).some((p) => !Array.isArray(p) || p.length !== 2 || p.some((w) => !answers.includes(w)))) f.push(id + ': an "apart" pair is not two sentence answers');
    // Level 3 can always be drawn: a sentence of each spelling outside the words to write, not kept apart; three words of each spelling for the sort beside two box words
    const free = sides.map((s) => ss.filter((x) => s.words.includes(x.right) && !(write || []).includes(x.right)));
    if (!free[0].length || !free[1].length || !free[0].some((x) => free[1].some((y) => !isApart(tm, x.right, y.right)))) f.push(id + ': Level 3 has no sentence of each spelling whose answer is no word to write');
    sides.forEach((s) => { if (s.words.filter((w) => !(write || []).includes(w) && !answers.includes(w)).length < 5) f.push(`${id}: fewer than five ${s.g} words that are no word to write and no sentence answer (three for the sort, two for the box)`); });
  }
  return f;
}
{ const f = vowelFaultsOf(BANK); if (f.length) throw new Error('long-vowels.en.json: ' + f.join('; ')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const picOf = (w) => ({ theme: PICS[w][0], noun: PICS[w][1] });
const img = (w, size) => `<img class="ws-icon" data-lcs-pic="${esc(w)}" src="${fileUri(PICS[w][0], PICS[w][1])}" alt="" style="flex:0 0 auto;width:${size}px;height:${size}px;display:block;object-fit:contain">`;
const cream = (attrs, inner, pad = 8, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:6px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 19, color = T.ink) => `<div data-lcs-label style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${color}">${html}</div>`;
const num = (n) => `<span style="color:${T.teal}">${n}.</span> `;
const teal = (x) => `<b style="font-weight:800;color:${T.teal}">${x}</b>`;
/** a word to circle (the key rings the right one) */
const pill = (text, ok, key, font, kind, padX = 12) => `<span data-lcs-pill${ok ? ' data-lcs-ok="1"' : ''}${kind ? ` data-lcs-kind="${kind}"` : ''} style="flex:0 0 auto;font:800 ${font}px/1.15 'Nunito',sans-serif;color:${T.ink};padding:2px ${padX}px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
/** a place to write letters into a printed word (the key prints them) */
const gapBox = (g, key, font, w) => `<span data-lcs-gap="${g}" style="display:inline-block;width:${w}px;height:${Math.round(font * 1.15)}px;margin:0 3px;border-bottom:3.5px solid ${T.ink};text-align:center;color:${T.teal};font:800 ${font}px/1.1 'Nunito',sans-serif">${key ? g : ''}</span>`;
const TEAM_GAP = 96;   // a gap for the two letters of a vowel team
const gapWord = (word, g, key, font, pic) => { const at = word.indexOf(g); return `<span data-lcs-gapword="${word}" style="display:inline-flex;align-items:center;gap:8px">${pic ? img(word, pic) : ''}<span style="display:inline-flex;align-items:flex-end;font:800 ${font}px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(word.slice(0, at))}${gapBox(g, key, font, TEAM_GAP)}${esc(word.slice(at + g.length))}</span></span>`; };
/** a printed word to read (a word bank or a word box); the key strikes the odd word out */
const chip = (text, attr, font, strike) => `<span ${attr} style="font:800 ${font}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:2px 14px;border-radius:999px;background:#FFFFFF;border:2px solid ${T.teal}${strike ? `;text-decoration:line-through;text-decoration-color:${T.teal};text-decoration-thickness:4px` : ''}">${esc(text)}</span>`;
/** the head of a sort column, never a chip (it is no word to sort): large plain letters with a rule under them on top of
 *  the column, or (Level 3, where the page has no room for a row of heads) a filled teal bar with the letters at its left */
const colHead = (g) => `<div data-lcs-colhead="${g}" style="text-align:center;font:800 32px/1.05 'Nunito',sans-serif;color:${T.teal};padding-bottom:3px;border-bottom:3px solid ${T.teal}">${g}</div>`;
const sideHead = (g) => `<div data-lcs-colhead="${g}" style="flex:0 0 46px;display:flex;align-items:center;justify-content:center;border-radius:6px 0 0 6px;background:${T.tealSoft};border-right:4px solid ${T.teal};color:${T.teal};font:800 30px/1 'Nunito',sans-serif">${g}</div>`;
/** a sentence ending at the blank keeps its stop on the blank: "a long mane." never "a long mane ." */
const endsAtBlank = (b) => /^[.?!]$/.test(b.trim());
/** a handwriting row that starts with the first letter of the word (the key prints the whole word) */
const writeRow = (w, width, h, key) => line({ w: width, h, starter: w[0], answer: key ? w : null });

function makeVowelType({ id, slug, mode, pair, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('vowels-g1: unknown mode ' + mode);
  if (mode === 'team' && !TEAMS[pair]) throw new Error('vowels-g1: no pair of spellings ' + pair);
  // what verify() needs to know of the bank: the silent-e pairs (to count the pairs a level has), the words of a team
  const INFO = mode === 'silente' ? { pairs: SE.pairs } : { words: teamAll(TEAMS[pair]), odd: TEAMS[pair].odd, apart: TEAMS[pair].apart || [] };
  // verify's OWN copy of the withdrawn pictures (a build that prints one again fails its page)
  INFO.withdrawnPics = ['cane', 'jeep'];
  return {
    // existing keys of topics-taxonomy axes['exercise-type']: silent e is a spelling rule, ai/ay ee/ea oa/ow are vowel digraphs
    id, slug, gradeBand: 'G1', assetClass: 'none', exerciseType: 'spelling-rules',   // the family that holds the spelling rules of the long vowels (magic e, ee or ea, ai or ay)
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,
    // THE ITEM BANK of the unit checks (Part 7.6): G1-584 to G1-587 (vowelCheckPage below)
    checkPage(args, ctx) { return vowelCheckPage(mode, pair, args, ctx); },

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English words (no ${locale} bank)`);
      const lv = Number(difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng;
      const key = !!(ctx && ctx.answerKey);
      const inner = W - 24;
      let blocks = [], items = [];

      if (mode === 'silente') {
        const vs = d.vowels;
        // task 2: four pictures (two short words or more, a long word or more)
        let shown;
        for (let k = 0; k < 500; k++) { shown = shuffle(pictPool(vs), rng).slice(0, 4); if (picsOk(shown, d)) break; }
        if (!picsOk(shown, d)) throw new Error(`${id}: no four pictures for level ${lv}`);
        const banned = new Set(shown.flatMap((x) => [x.s, x.l]));
        // task 3: sentences or words to write, of pairs that task 2 does not show
        let sents = [];
        if (d.sents) { const sp = sentPool(vs); for (let k = 0; k < 500; k++) { sents = shuffle(sp, rng).slice(0, d.sents); if (sentsOk(sents, d.sents, banned)) break; } if (!sentsOk(sents, d.sents, banned)) throw new Error(`${id}: no sentences for level ${lv}`); }
        const writes = d.write ? pickWrites(vs, d.write, banned, rng) : [];
        if (writes.length !== d.write) throw new Error(`${id}: no words to write for level ${lv}`);
        // task 1: the pairs no other task uses first, a few of each vowel; then the sentence pairs, then the pictured pairs
        const p3 = new Map();   // short word of a task-3 pair -> its right word is long
        sents.forEach((s) => { const short = isLong(s.right) ? s.wrong : s.right; p3.set(short, isLong(s.right)); });
        writes.forEach((w) => { for (const v of vs) { const e = seEntry(v, w); if (e) p3.set(e.s, true); } });
        const p2 = new Map(shown.map((x) => [x.s, x.w === x.l]));
        const rank = (p) => (p2.has(p.s) ? (p2.get(p.s) ? 3 : 4) : p3.has(p.s) ? (p3.get(p.s) ? 1 : 2) : 0);
        const allPairs = shuffle(vs.flatMap((v) => SE.pairs[v].map((p) => ({ v, s: p[0], l: p[1] }))), rng);
        const per = Math.ceil(d.pairs / vs.length), pairs = [];
        for (const v of vs) pairs.push(...allPairs.filter((p) => p.v === v && rank(p) === 0).slice(0, per));
        for (const r of [0, 1, 2, 3, 4]) for (const p of allPairs) if (pairs.length < d.pairs && rank(p) === r && !pairs.includes(p)) pairs.push(p);
        const t1 = shuffle(pairs.slice(0, d.pairs), rng);
        blocks.push(cream('data-lcs-pairs="1"', label(`${num(1)}Add ${teal('e')} to the end. Read both words to a partner.`) +
          `<div style="display:grid;grid-template-columns:1fr 1fr;gap:${d.gap}px 30px;padding:4px 18px">` + t1.map((p) => `<div data-lcs-pair="${p.s}|${p.l}" style="display:flex;align-items:flex-end;gap:14px;font:800 ${d.font}px/1.1 'Nunito',sans-serif;color:${T.ink}"><span style="flex:0 0 ${Math.round(d.font * 2.9)}px">${p.s}</span><span style="color:${T.teal}">&#8594;</span><span style="display:inline-flex;align-items:flex-end">${p.s}${gapBox('e', key, d.font, Math.round(d.font * 0.95))}</span></div>`).join('') + `</div>`, d.pad));
        // the right word sits on top under some pictures and below under others (never all in one place)
        let tops; for (let k = 0; k < 100; k++) { tops = shown.map(() => rng.int(0, 1)); if (new Set(tops).size > 1) break; }
        if (new Set(tops).size < 2) tops[0] = 1 - tops[1];
        blocks.push(cream('data-lcs-pictures="1"', label(`${num(2)}Circle the word for each picture.`) +
          `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px 24px;padding:0 6px">` + shown.map((x, i) => {
            const right = x.w, other = right === x.s ? x.l : x.s;
            const two = [[right, true], [other, false]]; if (!tops[i]) two.reverse();
            return `<div data-lcs-pchoice="${x.w}" style="display:flex;flex-direction:column;align-items:center;gap:6px">${img(x.w, d.pic)}<div data-lcs-stack style="display:flex;flex-direction:column;align-items:center;gap:4px">${two.map(([w, ok]) => pill(w, ok, key, d.pill, w === x.s ? 'short' : 'long')).join('')}</div></div>`;
          }).join('') + `</div>`, d.pad));
        if (d.sents) blocks.push(cream('data-lcs-sentences="1"', label(`${num(3)}Read the sentence. Circle the word that fits.`) + sents.map((s) => {
          const short = isLong(s.right) ? s.wrong : s.right, long = short + 'e'; const [a, b] = s.text.split('___');
          // the stop sits on the last word: a pill keeps 8 px of white and a 3 px border after its word and the group a 6 px
          // gap, so the stop moves back 15 px on the page of the child; on the key it follows the teal ring
          const end = endsAtBlank(b) ? `<span data-lcs-endpunct style="margin-left:${key ? -4 : -15}px">${esc(b.trim())}</span>` : '';
          return `<div data-lcs-sentence="${s.right}" style="display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;font:700 ${d.sfont}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:${Math.round(d.pad / 3)}px 0 ${Math.round(d.pad / 3)}px 18px">${a.trim() ? `<span>${esc(a.trim())}</span>` : ''}<span data-lcs-blankgroup style="display:inline-flex;align-items:center;gap:6px">${pill(short, s.right === short, key, d.pill, 'short', 8)}${pill(long, s.right === long, key, d.pill, 'long', 8)}${end}</span>${!end && b.trim() ? `<span>${esc(b.trim())}</span>` : ''}</div>`;
        }).join(''), d.pad));
        if (d.write) blocks.push(cream('data-lcs-writes="1"', label(`${num(3)}Write the word for each picture.`) +
          `<div style="display:grid;grid-template-columns:repeat(${d.write},1fr);gap:10px">` + writes.map((w) => `<div data-lcs-write="${w}" style="display:flex;flex-direction:column;align-items:center;gap:3px">${img(w, d.wpic)}${writeRow(w, Math.floor((inner - 10 * (d.write - 1)) / d.write), d.rowH, key)}</div>`).join('') + `</div>`, d.pad));
        items = [...t1.map((p) => p.l), ...shown.map((x) => 'pic:' + x.w), ...sents.map((s) => 'sent:' + s.right), ...writes.map((w) => 'write:' + w)];
      }

      if (mode === 'team') {
        const tm = TEAMS[pair], A = tm.a, B = tm.b;
        const picA = A.words.filter((w) => PICS[w]), picB = B.words.filter((w) => PICS[w]);
        const ruleWords = tm.rule ? listWordsIn(tm, tm.rule) : [];
        const takePics = (n) => { const nb = Math.min(Math.floor(n / 2), picB.length); return shuffle([...shuffle(picA, rng).filter(picShown).slice(0, n - nb), ...shuffle(picB, rng).filter(picShown).slice(0, nb)], rng); };
        const colW = Math.floor((inner - 20) / 2);
        /** the sort: a bank of words in two rows (each row holds both spellings), two columns headed by the spellings */
        const sortBlock = (k, wa, wb, odd) => {
          const words = [...wa, ...wb, ...(odd ? [odd] : [])];
          let order; for (let t = 0; t < 300; t++) { order = shuffle(words, rng); if ([order.slice(0, 4), order.slice(4)].every((r) => r.some((w) => wa.includes(w)) && r.some((w) => wb.includes(w)))) break; }
          items.push(...wa, ...wb, ...(odd ? ['odd:' + odd] : []));
          const rowsOf = [order.slice(0, 4), order.slice(4)];
          const text = odd ? `Read the words. Cross out the word that does not say ${tm.sound}. Write the others under their spelling.` : 'Read each word out loud. Then write it under its spelling.';
          return cream('data-lcs-sort="1"', label(`${num(k)}${text}`) +
            `<div data-lcs-bank style="display:flex;flex-direction:column;align-items:center;gap:6px;margin:${odd ? 0 : 2}px 0 ${odd ? 2 : 6}px">` + rowsOf.map((r) => `<div data-lcs-bankrow style="display:flex;justify-content:center;gap:12px">${r.map((w) => chip(w, `data-lcs-bankword="${w}"${w === odd ? ' data-lcs-odd="1"' : ''}`, odd ? 20 : 21, key && w === odd)).join('')}</div>`).join('') + `</div>` +
            `<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px">` + [[A, wa], [B, wb]].map(([s, ws]) => (odd
              ? `<div data-lcs-column="${s.g}" style="display:flex;gap:8px">${sideHead(s.g)}<div style="display:flex;flex-direction:column;gap:2px">${ws.map((w) => line({ w: colW - 54, h: d.rowH, answer: key ? w : null, sample: true })).join('')}</div></div>`
              : `<div data-lcs-column="${s.g}" style="display:flex;flex-direction:column;gap:4px">${colHead(s.g)}${ws.map((w) => line({ w: colW, h: d.rowH, answer: key ? w : null, sample: true })).join('')}</div>`)).join('') + `</div>`, d.pad);
        };
        if (lv === 1) {
          const ws = takePics(4);
          let perm; for (let k = 0; k < 300; k++) { perm = shuffle([0, 1, 2, 3], rng); if (perm.every((x, i) => x !== i) && new Set(perm.map((x, i) => (x - i + 4) % 4)).size > 1) break; }
          const H = d.row, G = 8, LW = 190, GW = 170, RW = 130, yc = (i) => i * (H + G) + H / 2;
          const lines = key ? perm.map((s, j) => `<line data-lcs-keyline="${s}-${j}" x1="7" y1="${yc(s)}" x2="${GW - 7}" y2="${yc(j)}" stroke="${T.teal}" stroke-width="4" stroke-linecap="round"/>`).join('') : '';
          const dots = ws.map((_, i) => `<circle cx="7" cy="${yc(i)}" r="7" fill="${T.ink}"/><circle cx="${GW - 7}" cy="${yc(i)}" r="7" fill="${T.ink}"/>`).join('');
          blocks.push(cream('data-lcs-matchcard="1"', label(`${num(1)}Read each word. Draw a line to its picture.`) +
            `<div data-lcs-match="4" style="display:grid;grid-template-columns:${LW}px ${GW}px ${RW}px;justify-content:center;align-items:start">` +
            `<div style="display:flex;flex-direction:column;gap:${G}px">${ws.map((w, i) => `<div data-lcs-mword="${i}" style="height:${H}px;box-sizing:border-box;display:flex;align-items:center;justify-content:flex-end;padding-right:16px;font:800 ${d.font}px/1 'Nunito',sans-serif;color:${T.ink}">${w}</div>`).join('')}</div>` +
            `<svg data-lcs-gutter width="${GW}" height="${4 * H + 3 * G}" viewBox="0 0 ${GW} ${4 * H + 3 * G}" style="display:block">${lines}${dots}</svg>` +
            `<div style="display:flex;flex-direction:column;gap:${G}px">${perm.map((s) => `<div data-lcs-mpic="${s}" style="height:${H}px;box-sizing:border-box;display:flex;align-items:center;padding-left:16px">${img(ws[s], d.pic)}</div>`).join('')}</div></div>`, d.pad));
          [[A, 2], [B, 3]].forEach(([s, k]) => { const gw = shuffle(s.words.filter((w) => !ws.includes(w)), rng).slice(0, 4);
            blocks.push(cream(`data-lcs-gaps="${s.g}"`, label(`${num(k)}Write ${teal(s.g)} in each word. Then read the word.`) + `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px 20px;justify-items:center;align-items:end;padding:6px 0 4px">${gw.map((w) => gapWord(w, s.g, key, d.font)).join('')}</div>`, d.pad));
            items.push(...gw); });
          items.push(...ws.map((w) => 'pic:' + w));
        } else if (lv === 2) {
          // the gap words first (with pictures where no rule tells the spelling), then the sort from the other words
          const withPic = !tm.rule;
          const ga = shuffle(withPic ? picA : A.words.filter((w) => !ruleWords.includes(w)), rng).filter(picShown).slice(0, 3), gb = shuffle(withPic ? picB : B.words.filter((w) => !ruleWords.includes(w)), rng).slice(0, 3);
          const rest = (s, gs) => shuffle(s.words.filter((w) => !gs.includes(w) && !ruleWords.includes(w)), rng).slice(0, 4);
          blocks.push(sortBlock(1, rest(A, ga), rest(B, gb)));
          const cols = withPic ? 2 : 3;
          // no row or column of the grid holds three or more gaps of one spelling
          const lineUps = (n) => { const rows = [], c = []; for (let i = 0; i < n; i += cols) rows.push([...Array(Math.min(cols, n - i)).keys()].map((j) => i + j)); for (let j = 0; j < cols; j++) c.push([...Array(n).keys()].filter((i) => i % cols === j)); return [...rows, ...c]; };
          let mix; for (let k = 0; k < 300; k++) { mix = shuffle([...ga.map((w) => [w, A.g]), ...gb.map((w) => [w, B.g])], rng); if (!lineUps(6).some((ix) => ix.length >= 3 && ix.every((i) => mix[i][1] === mix[ix[0]][1]))) break; }
          // the task line, then the rule it asks the child to read, then the words (each in a cell of the grid; with pictures the
          // cells start at the same place so the pictures stand in a column)
          blocks.push(cream('data-lcs-gaps="both"', label(`${num(2)}${withPic ? 'Say the word for each picture.' : 'Read the rule.'} Write ${teal(A.g)} or ${teal(B.g)}. Then read each word.`) +
            (tm.rule ? `<div data-lcs-rule style="padding:4px 12px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF;font:700 19px/1.25 'Nunito',sans-serif;color:${T.ink}">${esc(tm.rule)}</div>` : '') +
            `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:${withPic ? 8 : 34}px 10px;align-items:center;padding:${withPic ? 2 : 16}px 0 ${withPic ? 2 : 12}px">${mix.map(([w, g]) => `<div data-lcs-gapcell style="display:flex;justify-content:${withPic ? 'flex-start' : 'center'};padding-left:${withPic ? 60 : 0}px">${gapWord(w, g, key, withPic ? d.font - 4 : d.font, withPic ? d.pic : 0)}</div>`).join('')}</div>`, d.pad));
          items.push(...mix.map((x) => 'gap:' + x[0]));
        } else {
          // the words to write, the sentences (one of each spelling, answers that are no word to write), the box, then the sort from what is left
          const ws = shuffle(tm.write, rng).slice(0, d.write);
          const sa = tm.sentences.filter((s) => A.words.includes(s.right) && !ws.includes(s.right)), sb = tm.sentences.filter((s) => B.words.includes(s.right) && !ws.includes(s.right));
          let two; for (let k = 0; k < 300; k++) { two = shuffle([shuffle(sa, rng)[0], shuffle(sb, rng)[0]], rng); if (two.every(Boolean) && !isApart(tm, two[0].right, two[1].right)) break; }
          if (!two.every(Boolean) || isApart(tm, two[0].right, two[1].right)) throw new Error(`${id}: no two sentences for level 3`);
          const answers = two.map((s) => s.right);
          let fill, wa, wb;
          for (let k = 0; k < 300; k++) {
            fill = shuffle(tm.box.filter((w) => !ws.includes(w)), rng).slice(0, 2);
            const left = (s) => s.words.filter((w) => !ws.includes(w) && !answers.includes(w) && !fill.includes(w) && !tm.sentences.some((x) => x.right === w));
            wa = shuffle(left(A), rng).slice(0, 3); wb = shuffle(left(B), rng).slice(0, 3);
            if (wa.length === 3 && wb.length === 3) break;
          }
          blocks.push(sortBlock(1, wa, wb, tm.odd));
          const cw = Math.floor((inner - 10 * (d.write - 1)) / d.write);
          blocks.push(cream('data-lcs-writes="1"', label(`${num(2)}Write the word for each picture.`) +
            `<div style="display:grid;grid-template-columns:repeat(${d.write},1fr);gap:10px">` + ws.map((w) => `<div data-lcs-write="${w}" style="display:flex;flex-direction:column;align-items:center;gap:3px">${img(w, d.pic)}${writeRow(w, cw, d.rowH, key)}</div>`).join('') + `</div>`, d.pad));
          const boxWords = shuffle([...answers, ...fill], rng);
          const pb = Math.round(d.rowH * 0.2);   // the words of a sentence sit on the baseline of its row
          blocks.push(cream('data-lcs-sentences="1"', label(`${num(3)}Finish each sentence with a word from the box.`) +
            `<div style="display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center">` +
            `<div data-lcs-wordbox style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:5px 10px;border:2.5px dashed ${T.teal};border-radius:12px;background:#FFFFFF">${boxWords.map((w) => chip(w, `data-lcs-boxword="${w}"`, 20)).join('')}</div>` +
            `<div style="display:flex;flex-direction:column;gap:2px">` + two.map((s) => { const [a, b] = s.text.split('___'); const end = endsAtBlank(b);
              return `<div data-lcs-cloze="${s.right}" style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:2px 8px;font:700 21px/1.3 'Nunito',sans-serif;color:${T.ink}">${a.trim() ? `<span style="padding-bottom:${pb}px">${esc(a.trim())}</span>` : ''}<span data-lcs-blankgroup style="display:inline-flex;align-items:flex-end">${line({ w: 150, h: d.rowH, answer: key ? s.right : null })}${end ? `<span data-lcs-endpunct style="padding-bottom:${pb}px;margin-left:1px">${esc(b.trim())}</span>` : ''}</span>${!end && b.trim() ? `<span style="padding-bottom:${pb}px">${esc(b.trim())}</span>` : ''}</div>`; }).join('') + `</div></div>`, d.pad));
          items.push(...ws.map((w) => 'write:' + w), ...two.map((s) => 'sent:' + s.right));
        }
      }

      return {
        bodyHtml: `<style>[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style><div data-ws-content data-lcs-vowelpage="${mode}|${lv}|${pair || ''}"${key ? ' data-lcs-iskey="1"' : ''} data-lcs-noliga="1" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:0;font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0">` + blocks.join('') + `</div>`,
        meta: { text: (pair || 'silent-e') + ':' + items.slice(0, 3).join(','), items },
      };
    },

    async verify(page) {
      return page.evaluate((SIZES, INFO) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-vowelpage]');
        if (!root) return ['no page'];
        // letters are the content of a phonics page: no joined fi or ff (review 2026-11-17: the i lost its dot in fin, fish)
        { const joined = [...root.querySelectorAll('span, div')].filter((e) => e.children.length === 0 && /f[fil]/.test(e.textContent) && getComputedStyle(e).fontVariantLigatures !== 'none'); if (joined.length) fails.push('ligatures are on in ' + joined.length + ' places: fi and ff print as one joined letter (the font shorthand resets them: the page needs its rule)'); }
        const [mode, lvS, pair] = root.dataset.lcsVowelpage.split('|'), lv = +lvS, d = SIZES[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const txt = (e) => e.textContent.trim();
        const rb = R(root);
        document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); if (R(im).width < 60) fails.push('a picture smaller than 60 px'); });
        document.querySelectorAll('img[data-lcs-pic]').forEach((im) => { if ((INFO.withdrawnPics || []).includes(im.dataset.lcsPic)) fails.push('a withdrawn picture on the page: ' + im.dataset.lcsPic); });
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('img, span, [data-lcs-label], [data-lcs-line] svg, [data-lcs-colhead]').forEach((e) => { const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        // print size: what a first grader reads 19 px or more, words to circle or to read in a box 20 px or more
        const fs = (e) => parseFloat(getComputedStyle(e).fontSize);
        document.querySelectorAll('[data-lcs-label], [data-lcs-rule], [data-lcs-sentence], [data-lcs-cloze], [data-lcs-pair], [data-lcs-mword], [data-lcs-gapword] span').forEach((e) => { if (fs(e) < 19) fails.push('text smaller than 19 px'); });
        document.querySelectorAll('[data-lcs-pill], [data-lcs-bankword], [data-lcs-boxword]').forEach((e) => { if (fs(e) < 20) fails.push('a word to circle or read smaller than 20 px'); });
        // handwriting rows: the size of the level (89 px = half an inch from the top rule to the baseline, where the page carries it)
        const lines = [...document.querySelectorAll('[data-lcs-line]')];
        lines.forEach((l) => { const s = l.querySelector('svg'); if (!s || R(s).height < (d.rowH || 89) - 0.5 || R(s).height < 76) fails.push(`a writing row lower than ${d.rowH || 89} px`); });
        const gaps = [...document.querySelectorAll('[data-lcs-gap]')];
        gaps.forEach((g) => { if (R(g).width < (g.dataset.lcsGap.length === 2 ? 90 : 24)) fails.push('a gap too narrow for its letters'); if (isKey ? txt(g) !== g.dataset.lcsGap : txt(g)) fails.push('a gap is filled on the page of the child, or wrong on the key'); });
        // a sentence ending at its blank keeps its stop on the blank
        document.querySelectorAll('[data-lcs-endpunct]').forEach((e) => { const prev = e.previousElementSibling; if (!prev || !e.parentElement.hasAttribute('data-lcs-blankgroup') || R(e).left - R(prev).right > 4) fails.push('a space before the stop at the end of a sentence'); });
        document.querySelectorAll('[data-lcs-sentence], [data-lcs-cloze]').forEach((e) => { const last = [...e.children].pop(); if (last && !last.hasAttribute('data-lcs-blankgroup') && /^[.?!]$/.test(txt(last))) fails.push('a stop stands apart from the blank'); });
        // the words to write: a picture of the word, the first letter printed on the row (the key prints the whole word)
        const wr = [...document.querySelectorAll('[data-lcs-write]')];
        wr.forEach((e) => { const w = e.dataset.lcsWrite, l = e.querySelector('[data-lcs-line]'), im = e.querySelector('img');
          if (!im || im.dataset.lcsPic !== w) fails.push('a word to write has no picture of its own');
          if (!l || (isKey ? l.dataset.lcsAnswer !== w : l.dataset.lcsStartertext !== w[0])) fails.push('a row to write a word on does not start with its first letter (or the key does not print the word)'); });
        if (new Set(wr.map((e) => e.dataset.lcsWrite)).size !== wr.length) fails.push('a word to write stands twice');
        const pillSets = (sel) => [...document.querySelectorAll(sel)].map((e) => ({ e, pills: [...e.querySelectorAll('[data-lcs-pill]')] }));

        if (mode === 'silente') {
          const prs = [...document.querySelectorAll('[data-lcs-pair]')].map((e) => e.dataset.lcsPair.split('|'));
          if (prs.length !== d.pairs || prs.some(([s, l]) => l !== s + 'e') || new Set(prs.map((p) => p[0])).size !== prs.length) fails.push(`not ${d.pairs} different pairs of a word and the same word with e`);
          const vow = new Set(prs.map(([s]) => (s.match(/[aeiou]/) || [''])[0]));
          if ([...vow].sort().join('') !== d.vowels.slice().sort().join('')) fails.push('the pairs do not show the vowels of this level: ' + [...vow].join(''));
          if (gaps.length !== d.pairs) fails.push(`${gaps.length} places for an e`);
          const pcs = pillSets('[data-lcs-pchoice]');
          if (pcs.length !== 4) fails.push('not four pictures with two words each');
          const tops = [];
          const kinds = pcs.map(({ e, pills }) => {
            const ok = pills.filter((p) => p.dataset.lcsOk), w = pills.map(txt), s = w.find((x) => !/e$/.test(x));
            if (pills.length !== 2 || ok.length !== 1 || txt(ok[0]) !== e.dataset.lcsPchoice || !s || !w.includes(s + 'e') || e.querySelector('img').dataset.lcsPic !== e.dataset.lcsPchoice) fails.push('a picture is not keyed to its own word among the two words of a pair');
            if (pills.length === 2 && R(pills[1]).top < R(pills[0]).bottom - 0.5) fails.push('the two words under a picture are not stacked');
            tops.push(ok[0] === pills[0]);
            return ok[0] ? ok[0].dataset.lcsKind : '';
          });
          if (kinds.filter((k) => k === 'short').length < 2 || !kinds.includes('long')) fails.push('fewer than two pictures of a short word, or none of a long word');
          if (d.longPics && kinds.filter((k) => k === 'long').length !== d.longPics) fails.push(`not ${d.longPics} pictures of a long word`);
          if (pcs.length === 4 && new Set(tops).size < 2) fails.push('the right word stands in the same place under every picture');
          for (let i = 1; i < pcs.length; i++) { const a = pcs[i - 1].pills.map(R), b = pcs[i].pills.map(R); if (Math.min(...b.map((r) => r.left)) - Math.max(...a.map((r) => r.right)) < 20) fails.push('the words of two pictures stand too close'); }
          const sn = pillSets('[data-lcs-sentence]');
          if (sn.length !== d.sents) fails.push(`${sn.length} sentences`);
          const sk = sn.map(({ e, pills }) => { const ok = pills.filter((p) => p.dataset.lcsOk); if (pills.length !== 2 || ok.length !== 1 || txt(ok[0]) !== e.dataset.lcsSentence || txt(pills[1]) !== txt(pills[0]) + 'e') fails.push('a sentence is not keyed to its word'); return ok[0] ? ok[0].dataset.lcsKind : ''; });
          if (d.sents && (!sk.includes('short') || !sk.includes('long'))) fails.push('the right words of the sentences are all short or all long');
          if (lines.length !== d.write || wr.length !== d.write) fails.push(`${lines.length} words to write`);
          // no word repeats across the tasks where the lists allow it
          const shortOf = (w) => (/e$/.test(w) && Object.values(INFO.pairs).some((ps) => ps.some((p) => p[1] === w)) ? w.slice(0, -1) : w);
          const p2 = new Set(pcs.flatMap(({ pills }) => pills.map((p) => shortOf(txt(p)))));
          const p3 = new Set([...sn.flatMap(({ pills }) => pills.map((p) => shortOf(txt(p)))), ...wr.map((e) => shortOf(e.dataset.lcsWrite)).filter((s) => Object.values(INFO.pairs).some((ps) => ps.some((p) => p[0] === s)))]);
          if ([...p2].some((s) => p3.has(s))) fails.push('a pair shown in task 2 is used again in task 3');
          const picWords = new Set(pcs.flatMap(({ pills }) => pills.map(txt)));
          sn.forEach(({ e }) => { const words = [...e.children].filter((c) => !c.hasAttribute('data-lcs-blankgroup')).map((c) => c.textContent).join(' ').toLowerCase().match(/[a-z]+/g) || []; if (words.some((w) => picWords.has(w))) fails.push('a sentence prints a word that answers a picture'); });
          const printed = [...document.querySelectorAll('[data-lcs-pill]')].map(txt);
          wr.forEach((e) => { if (printed.includes(e.dataset.lcsWrite)) fails.push('a word to write is printed on the page'); });
          const N = d.vowels.reduce((s, v) => s + (INFO.pairs[v] || []).length, 0), t1 = prs.map((p) => p[0]);
          const both = new Set([...p2, ...p3]);
          if (t1.filter((s) => p2.has(s)).length > Math.max(0, d.pairs - (N - p2.size))) fails.push('task 1 repeats a pair of task 2 although other pairs are left');
          if (t1.filter((s) => both.has(s)).length > Math.max(0, d.pairs - (N - both.size))) fails.push('task 1 repeats a pair of another task although other pairs are left');
        }
        if (mode === 'team') {
          const [ga, gb] = pair.split('-');
          const holds = (w, g) => w.includes(g);
          const LIST = new Set(INFO.words);
          const tokens = (s) => (s.toLowerCase().match(/[a-z]+/g) || []).filter((w) => LIST.has(w) || w === INFO.odd);
          const heads = [...document.querySelectorAll('[data-lcs-colhead]')];
          // a column head is large plain letters with a rule under them, or a filled teal bar: never a chip like the words to sort
          heads.forEach((h) => { const cs = getComputedStyle(h), filled = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'rgb(255, 255, 255)';
            if (h.closest('[data-lcs-bank]') || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderTopLeftRadius) > 10 || fs(h) < 26 || !(filled || parseFloat(cs.borderBottomWidth) >= 2)) fails.push('a column head looks like a word chip'); });
          if (lv > 1 && heads.map((h) => h.dataset.lcsColhead).join('-') !== pair) fails.push('the sort columns have no heads of their spellings');
          // no word is printed twice on the page, and no word to write is printed at all
          const printed = [...[...document.querySelectorAll('[data-lcs-bankword], [data-lcs-boxword], [data-lcs-gapword], [data-lcs-mword]')].map((e) => e.dataset.lcsBankword || e.dataset.lcsBoxword || e.dataset.lcsGapword || txt(e)),
            ...[...document.querySelectorAll('[data-lcs-rule], [data-lcs-cloze]')].flatMap((e) => tokens(isKey ? [...e.childNodes].filter((n) => !(n.nodeType === 1 && n.hasAttribute('data-lcs-blankgroup'))).map((n) => n.textContent).join(' ') : txt(e)))];
          const dup = printed.filter((w, i) => printed.indexOf(w) !== i);
          if (dup.length) fails.push('a word is printed twice on the page: ' + [...new Set(dup)].join(', '));
          wr.forEach((e) => { if (printed.includes(e.dataset.lcsWrite)) fails.push('a word to write is printed on the page'); });
          if (lv === 1) {
            const mw = [...document.querySelectorAll('[data-lcs-mword]')], mp = [...document.querySelectorAll('[data-lcs-mpic]')].map((e) => +e.dataset.lcsMpic);
            if (mw.length !== 4 || mp.slice().sort().join('') !== '0123' || mp.some((s, j) => s === j) || new Set(mp.map((s, j) => (s - j + 4) % 4)).size === 1) fails.push('not four words with their pictures mixed (none straight across, not all one row away): ' + mp.join(''));
            mw.forEach((e, i) => { const pc = document.querySelector(`[data-lcs-mpic="${i}"] img`); if (!pc || pc.dataset.lcsPic !== txt(e)) fails.push('a word has no picture of its own'); });
            const kl = document.querySelectorAll('[data-lcs-keyline]').length; if (kl !== (isKey ? 4 : 0)) fails.push(`${kl} lines are drawn`);
            for (const g of [ga, gb]) { const c = document.querySelector(`[data-lcs-gaps="${g}"]`), ws = c ? [...c.querySelectorAll('[data-lcs-gapword]')] : []; if (ws.length !== 4 || ws.some((w) => !holds(w.dataset.lcsGapword, g) || w.querySelector('[data-lcs-gap]').dataset.lcsGap !== g)) fails.push(`not four words to finish with ${g}`); }
            if (lines.length) fails.push('level 1 has writing rows');
          } else {
            const n = lv === 2 ? 4 : 3;
            const bankEls = [...document.querySelectorAll('[data-lcs-bankword]')], bank = bankEls.map((e) => e.dataset.lcsBankword), cols = [...document.querySelectorAll('[data-lcs-column]')];
            const oddEls = bankEls.filter((e) => e.dataset.lcsOdd === '1'), plain = bank.filter((w, i) => !bankEls[i].dataset.lcsOdd);
            const rowsN = [...document.querySelectorAll('[data-lcs-bankrow]')].map((r) => [...r.querySelectorAll('[data-lcs-bankword]')]);
            if (plain.length !== 2 * n || plain.filter((w) => holds(w, ga)).length !== n || plain.filter((w) => holds(w, gb)).length !== n || cols.map((c) => c.dataset.lcsColumn).join('-') !== pair || cols.some((c) => c.querySelectorAll('[data-lcs-line]').length !== n)) fails.push(`the sort is not ${2 * n} words, ${n} of each spelling, and two columns of ${n} rows`);
            if (rowsN.length !== 2 || rowsN[0].length !== 4 || rowsN[1].length !== bank.length - 4 || rowsN.some((r) => !r.some((e) => !e.dataset.lcsOdd && holds(e.dataset.lcsBankword, ga)) || !r.some((e) => !e.dataset.lcsOdd && holds(e.dataset.lcsBankword, gb)))) fails.push('the word bank is not two even rows that each hold both spellings');
            if (isKey) cols.forEach((c) => { [...c.querySelectorAll('[data-lcs-line]')].forEach((l) => { const a = l.dataset.lcsAnswer || ''; if (!holds(a, c.dataset.lcsColumn) || !plain.includes(a) || a === INFO.odd) fails.push('the key sorts a word into the wrong column'); }); });
            const struck = bankEls.filter((e) => /line-through/.test(getComputedStyle(e).textDecorationLine));
            if (lv === 3) {
              const odd = oddEls[0];
              if (oddEls.length !== 1 || odd.dataset.lcsBankword !== INFO.odd || LIST.has(INFO.odd) || !(holds(INFO.odd, ga) || holds(INFO.odd, gb))) fails.push('not one odd word that holds a spelling and stands in no word list');
              if (isKey ? struck.length !== 1 || struck[0] !== odd : struck.length) fails.push('the key does not cross out the odd word (or the page of the child does)');
            } else if (oddEls.length || struck.length) fails.push('level 2 has an odd word');
            if (lv === 2) {
              const ws = [...document.querySelectorAll('[data-lcs-gaps="both"] [data-lcs-gapword]')], gs = ws.map((w) => w.querySelector('[data-lcs-gap]').dataset.lcsGap);
              if (ws.length !== 6 || gs.filter((g) => g === ga).length !== 3 || gs.filter((g) => g === gb).length !== 3 || ws.some((w, i) => !holds(w.dataset.lcsGapword, gs[i]))) fails.push('not six words with a gap, three of each spelling');
              const rule = !!document.querySelector('[data-lcs-rule]'), pics = ws.filter((w) => w.querySelector('img')).length;
              if (rule ? pics !== 0 : pics !== 6) fails.push('a gap has no rule and no picture to tell its spelling');
              // where the spellings sit: no row and no column of the grid all one spelling (three or more)
              const groups = (f) => { const m = new Map(); ws.forEach((w, i) => { const c = w.closest('[data-lcs-gapcell]') || w, k = Math.round(f(R(c)) / 6); m.set(k, [...(m.get(k) || []), gs[i]]); }); return [...m.values()]; };
              if ([...groups((r) => r.top + r.height / 2), ...groups((r) => r.left + r.width / 2)].some((g) => g.length >= 3 && new Set(g).size === 1)) fails.push('a row or a column of the gap words holds one spelling only');
              if (lines.length !== 8) fails.push(`${lines.length} writing rows`);
            } else {
              const cz = [...document.querySelectorAll('[data-lcs-cloze]')].map((e) => e.dataset.lcsCloze), box = [...document.querySelectorAll('[data-lcs-boxword]')].map((e) => e.dataset.lcsBoxword);
              if (wr.length !== d.write || wr.some((e) => e.querySelector('img').dataset.lcsPic !== e.dataset.lcsWrite) || new Set(wr.map((e) => e.dataset.lcsWrite)).size !== d.write) fails.push(`not ${d.write} different pictures to write the word for`);
              if (cz.length !== 2 || box.length !== 4 || new Set(box).size !== 4 || cz.some((w) => !box.includes(w)) || holds(cz[0], ga) === holds(cz[1], ga)) fails.push('not two sentences, one for each spelling, with their words in a box of four');
              if (cz.length === 2 && INFO.apart.some(([p, q]) => cz.includes(p) && cz.includes(q))) fails.push('two sentence answers that are kept apart stand in one box');
              if (lines.length !== 6 + d.write + 2) fails.push(`${lines.length} writing rows`);
            }
          }
        }
        return fails;
      }, LEVELS, INFO);
    },
  };
}

/* ---------------------------------------------------------------- the item bank of the unit checks ---------------------------------------------------------------- */
/** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): the page's task made small, each card one
 *  task with its answer in its markup.
 *   silente (G1-584)  task 2: one picture of the level's vowels with the two words of its pair stacked (cap / cape), the word
 *                     for the picture carries data-lcs-correct (the child circles it); one card per pair (can and cane
 *                     never both), the right word on top on some cards and below on others. data-lcs-ckind says whether
 *                     the picture is the short word or the silent-e word, so that each form asks one of each (review
 *                     en-1119-lit: form A had asked two short words and form B two silent-e words). No withdrawn picture.
 *   team (G1-585 to G1-587)  the level-2 gap task: one word with a gap for its two letters (96 px), the gap carries
 *                     data-lcs-answer (the spelling). ai/ay and oa/ow take the words the rule does not print (the rule is
 *                     the check's direction line); ee/ea, which no rule tells, shows the picture of each word, as its page
 *                     does (no withdrawn picture; drawn 100 px: the letters are 34 px). Both spellings on a page, never three of
 *                     one in a row. The key leaves the gap empty: the check writes the letters in, in its answer colour. */
/** (fix round 2026-11-23, review of the placement checks) THE PLACEMENT CHECK OF BLENDING AND DECODING asks long a by READING
 *  it: a picture and three words to circle, the word that names the picture with ai, a short-a word and an ay word (rain, ran,
 *  ray). Its page (build-checks.js seeds it "check|placement-blending-decoding|…") holds these four cards; any other page is
 *  the page it was (the spelling ladder still asks the gap). Every right word names its picture; no wrong word does. */
const PLACE_READ = [['rain', ['ran', 'ray']], ['train', ['trap', 'tray']], ['snail', ['snap', 'sail']], ['nail', ['nap', 'mail']]];
function vowelCheckPage(mode, pair, { difficulty, locale }, ctx) {
  if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`vowels-g1 check: the words are English words (no ${locale} bank)`);
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(difficulty) || 2, d = LEVELS[mode][lv] || LEVELS[mode][2], rng = ctx.rng;
  const cards = [];
  const readPlace = mode === 'team' && pair === 'ai-ay' && /^check\|placement-blending-decoding\|/.test(String((rng && rng.seed) || ''));
  if (readPlace) {
    // the right word in each place of the three, never in the same place on every card
    const at = rng.shuffle([0, 1, 2, rng.int(0, 2)]);
    PLACE_READ.forEach(([w, wrong], i) => {
      const three = rng.shuffle(wrong.slice()); three.splice(at[i], 0, w);
      cards.push('<div data-lcs-readcheck="' + w + '" data-lcs-ckind="read" style="display:flex;align-items:center;justify-content:center;gap:26px;padding:6px 8px">' + img(w, 100) +
        '<div data-lcs-three style="display:flex;flex-direction:column;align-items:flex-start;gap:4px">' + three.map((x) => pill(x, x === w, false, 30).replace('<span data-lcs-pill', '<span data-lcs-choice="' + x + '"' + (x === w ? ' data-lcs-correct="1"' : '') + ' data-lcs-pill')).join('') + '</div></div>');
    });
  } else if (mode === 'silente') {
    const shown = [], pairs = new Set();
    for (const x of shuffle(pictPool(d.vowels), rng)) { if (shown.length === 8) break; if (pairs.has(x.s) || WITHDRAWN.has(x.w)) continue; pairs.add(x.s); shown.push(x); }
    if (shown.length < 4) throw new Error(`vowels-g1 check: ${shown.length} pictured pairs`);
    let at; for (let k = 0; k < 200; k++) { at = shown.map(() => rng.int(0, 1)); if (new Set(at).size === 2 && !/000|111/.test(at.join(''))) break; }
    shown.forEach((x, i) => {
      const other = x.w === x.s ? x.l : x.s, two = [[x.w, true], [other, false]]; if (at[i]) two.reverse();
      cards.push(`<div data-lcs-vowelcheck="${x.w}" data-lcs-ckind="${x.w === x.l ? 'long' : 'short'}" style="display:flex;align-items:center;justify-content:center;gap:22px;padding:6px 8px">${img(x.w, 100)}<div data-lcs-two style="display:flex;flex-direction:column;align-items:center;gap:10px">` +
        two.map(([w, okk]) => pill(w, okk, false, 32, w === x.s ? 'short' : 'long').replace('<span data-lcs-pill', `<span data-lcs-choice="${w}"${okk ? ' data-lcs-correct="1"' : ''} data-lcs-pill`)).join('') + `</div></div>`);
    });
  } else {
    const tm = TEAMS[pair], A = tm.a, B = tm.b, ruleWords = tm.rule ? listWordsIn(tm, tm.rule) : [], withPic = !tm.rule;
    const from = (s) => shuffle(s.words.filter((w) => !ruleWords.includes(w) && (!withPic || (PICS[w] && picShown(w)))), rng).slice(0, 4).map((w) => ({ w, g: s.g }));
    let mix = [];
    const all = [...from(A), ...from(B)];
    for (let k = 0; k < 300; k++) { mix = shuffle(all, rng); if (!mix.some((x, i) => i >= 2 && x.g === mix[i - 1].g && x.g === mix[i - 2].g)) break; }
    if (mix.length < 6) throw new Error(`vowels-g1 check: ${mix.length} words for ${pair}`);
    for (const x of mix) cards.push(`<div data-lcs-vowelcheck="${x.w}" style="display:flex;align-items:center;justify-content:center;padding:10px 8px">` +
      gapWord(x.w, x.g, false, 34, withPic ? 100 : 0).replace(`data-lcs-gap="${x.g}"`, `data-lcs-gap="${x.g}" data-lcs-answer="${x.g}"`) + `</div>`);
  }
  return { bodyHtml: `<style>[data-lcs-noliga] * {font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style><div data-lcs-noliga="1" style="font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0">` + checkGrid(cards, { cols: 2 }) + `</div>`, meta: {} };
}

module.exports = { makeVowelType, vowelFaultsOf, LEVELS, picOf };
