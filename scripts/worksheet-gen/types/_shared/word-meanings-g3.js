/**
 * word-meanings-g3.js — four Grade 3 pages of the unit "Words and Their Meanings" (English literacy year, Daily Teaching
 * System Part 12.3, 2026-11-18): two for the lesson "Context clues" (L.3.4.a: use sentence-level context as a clue to
 * the meaning of a word or phrase) and two for "Use a dictionary and a glossary" (L.3.4.d: use glossaries or beginning
 * dictionaries to determine or clarify the precise meaning of key words and phrases). The words, texts, and dictionary
 * pages are data/literacy/word-meanings-g3.en.json (written by the scratch script dd-g3wm/bank.js; every passage, entry
 * and definition is written for this bank). PDF only, letter portrait, no picture.
 *
 *   kinds    G3-540 Context Clues: What Kind of Clue? (day 1 of "Context clues"): sentences, each with one bold word that
 *            is new to most third graders and a clue in the same sentence. The child underlines the clue and writes the
 *            letter of its kind in a box (D definition, S synonym, A antonym, E example; a key to the letters stands at
 *            the top). Level 1: six sentences, three with a definition and three with an antonym clue; the meaning is
 *            circled among three. Level 2: eight sentences, two of each kind; the meaning is circled among three.
 *            Level 3: six sentences of all four kinds (signal words such as "including", "while", a semicolon); the
 *            child writes the meaning on a line (the key's meanings are samples).
 *   passage  G3-541 Context Clues in a Passage (day 2): one passage with eight clue words; six of them are bold on a copy
 *            (copy v of a level shows passage ((v-1) mod 8) of a fixed order and leaves two neighbouring words plain:
 *            the words 1-2 on copies 1-8, 3-4 on copies 9-16, so no two copies share more than four of six items).
 *            For each bold word the child underlines the clue and gives the meaning. Level 1: a short passage in two
 *            paragraphs, every clue a definition in the same sentence, three meanings to circle. Level 2: about 140
 *            words, example and antonym clues in the same sentence, the meaning written on a line. Level 3: about 150
 *            words, every clue in the NEXT sentence, the child writes the kind of clue and the meaning.
 *   dict     G3-542 Use a Dictionary: Guide Words and Meanings (day 1 of "Use a dictionary and a glossary"): a printed
 *            dictionary page (guide words at the top, twelve entries in ABC order in two columns, each with its part
 *            of speech, one or two numbered meanings, some with an example sentence) and questions with one answer on
 *            the page: which page (guide words) a word is on, which meaning a sentence uses, which spelling is right,
 *            the part of speech, how many meanings, which word comes next. Level 1: guide words differ in the first
 *            letter; level 2: all guide words share the first letter (the second or third decides); level 3: the
 *            third letter decides, five questions, and the child writes an entry for a new word that belongs on the
 *            page (where it goes, its part of speech, a meaning, a sentence).
 *   gloss    G3-543 Use a Glossary: Find the Meaning (day 2): a short science text with six bold words and its glossary
 *            beside it (ABC order, the meaning the word has in this book). The child circles yes or no for sentences
 *            the glossary proves, and writes between which two glossary words a new word would go. Level 1: the
 *            glossary holds the six words of the text, each with its own first letter, and the new words are placed by
 *            their first letter; level 2: the glossary also holds two words from other pages of the book that share a
 *            first letter with a text word, so the second or third letter decides; level 3: as level 2, and one bold
 *            word is missing from the glossary: the child finds it and writes its entry from the text.
 *
 * Rules every page keeps (the reviews of the earlier batches, PLAN.md literacy G to X): one right answer (every wrong
 * meaning is wrong in its sentence; a guide-word pair, a neighbour in a glossary, a spelling, the next word are computed
 * on the page); no answer printed elsewhere on its page (a clue word appears once in its passage; no instruction word is
 * a task word of its type); answer places in no pattern and never found by length (the right meaning is the longest of
 * its three at most half the time, and the shortest at most half the time); writing lines are single-rule Grade 3 lines
 * of 34 px with room for a third grader's hand (15.5 px a letter, about 43 letters on a full line); a key answer fits its
 * line; no blank band higher than 40 px; typographic apostrophes and quotes on the page; ligatures off and an f before
 * i, f, l, t or a t before t with room of its own. The instruction of each level is INSTR (registered as strings;
 * verify() reads it on the page). English only; themeless. The bank is checked when this file loads (faultsOf),
 * including that every level can draw its pages.
 */
'use strict';
const T = require('../../primitives/_tokens.js').color;
const { makeRng } = require('../../lib/rng.js');
const BANK = require('../../data/literacy/word-meanings-g3.en.json');
const { _parts } = require('./info-text.js');
const { W, shuffle } = _parts;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ROWH = 34;          // a writing line (Grade 3: one baseline; 34 px = 0.43 in)
const MARKBOX = 36;       // a box for one letter (the kind of a clue)
const BAND = 40;          // no blank band higher than this between the tasks or inside one
const HAND = 15.5;
const CHOICE_MAX = 40;   // a meaning to circle on G3-540 (a long one moves its row to a second line)
const SAMPLE_MAX = 40;   // a sample meaning (its lines grow with it: linesFor)
const WORDLINE = 250;    // a line for one word (Goes between ___ and ___, Word: ___)
const WORDCOL = 165;     // the column of the word on G3-541 levels 2 and 3
const INSCOL = 110;      // the column of a new word on G3-543        // px a third grader needs for one letter of a written answer (675 px = 43.5 letters)
const MODES = ['kinds', 'passage', 'dict', 'gloss'];
const KINDS = { D: 'definition', S: 'synonym', A: 'antonym', E: 'example' };
/** the page instruction of every level (registered as strings with add-strings.js; verify() reads it on the page) */
const INSTR = {
  kinds: { 1: 'Some clues tell what a new word means. Some clues tell its opposite.', 2: 'Four kinds of context clues: definition, synonym, antonym, and example.', 3: 'Find the clue near each new word. Name its kind and write the meaning.' },
  passage: { 1: 'A definition clue tells what a new word means: a den, a hidden home.', 2: 'Examples and opposites near a new word are clues to what it means.', 3: 'Sometimes the clue to a new word is in the next sentence.' },
  dict: { 1: 'Guide words at the top of a dictionary page show its first and last words.', 2: 'Guide words show the first and last words on a dictionary page.', 3: 'A dictionary entry tells the part of speech and the meanings of a word.' },
  gloss: { 1: "A glossary is a book's own small dictionary, in alphabetical (ABC) order.", 2: 'A glossary gives the meaning a word has in that book, in ABC order.', 3: 'A glossary lists the important words of a book in alphabetical (ABC) order.' },
};
/** the task lines (the bank's check reads them too) */
const LINES = {
  kinds1: 'Read each sentence. Underline the clue. Write D or A in the box. Circle the meaning of the bold word.',
  kinds2: 'Read each sentence. Underline the clue. Write its letter in the box. Circle the meaning of the bold word.',
  kinds3: 'Read each sentence. Underline the clue. Write its letter in the box. Write what the bold word means.',
  pass1: 'Underline the clue for each bold word. Then circle what the word means.',
  pass2: 'Underline the clue for each bold word. Then write what the word means.',
  pass3: 'Underline the clue in the next sentence. Write its letter in the box. Write what the word means.',
  means: 'It means',
  dictQ: 'Use the dictionary page. Circle the answer. For a page, circle its guide words.',
  guideTop: 'Guide words',
  entry: 'This word belongs on the dictionary page. Write its entry.',
  between: 'Goes between', and: 'and', pos: 'Part of speech:', meaning: 'Meaning:', sentence: 'Sentence:',
  glossTitle: 'Glossary',
  yesno: 'Use the glossary. Circle yes or no.',
  insert: 'Where would each new word go in the glossary? Write the two words it goes between.',
  missing: 'One bold word is missing from the glossary. Write it, what it means, and where it goes.',
  word: 'Word:', itMeans: 'It means:',
};
const KIND_TEXT = { D: 'definition: the clue tells what the word means', S: 'synonym: a word with almost the same meaning', A: 'antonym: words with the opposite meaning', E: 'example: examples show what the word means' };
const POS = ['noun', 'verb', 'adjective'];

/* ---------------------------------------------------------------- the levels ---------------------------------------------------------------- */
const LEVELS = {
  kinds: {
    1: { n: 6, kinds: ['D', 'A'], per: 3, pool: 'choose', font: 17.5, pfont: 16.5 },
    2: { n: 8, kinds: ['D', 'S', 'A', 'E'], per: 2, pool: 'choose', font: 17, pfont: 16 },
    3: { n: 6, kinds: ['D', 'S', 'A', 'E'], per: 0, pool: 'write', font: 17.5 },
  },
  passage: {
    1: { ask: 6, answer: 'choose', font: 17.5, lh: 1.55, pfont: 15.5 },
    2: { ask: 6, answer: 'write', font: 17, lh: 1.55 },
    3: { ask: 6, answer: 'kind', font: 16.5, lh: 1.5 },
  },
  dict: {
    1: { tasks: [['guide', 2], ['meaning', 2], ['spell', 2], ['pos', 1], ['count', 1]], depth: 1, font: 14.6, qfont: 15.5 },
    2: { tasks: [['guide', 2], ['meaning', 2], ['spell', 2], ['pos', 1], ['after', 1]], depth: 2, font: 14.6, qfont: 15.5 },
    3: { tasks: [['guide', 2], ['meaning', 1], ['spell', 1]], depth: 3, entry: 1, font: 14.2, qfont: 15.5 },
  },
  gloss: {
    1: { yn: 4, ins: 3, extra: false, missing: false, font: 15.5 },
    2: { yn: 5, ins: 3, extra: true, missing: false, font: 15.5 },
    3: { yn: 3, ins: 2, extra: true, missing: true, font: 15 },
  },
};

/* ---------------------------------------------------------------- small helpers ---------------------------------------------------------------- */
const tokens = (text) => (String(text).toLowerCase().replace(/[‘’]/g, "'").match(/[a-z]+(?:'[a-z]+)?/g) || []).map((w) => w.replace(/'s$/, ''));
const hasWord = (text, w) => tokens(text).includes(String(w).toLowerCase());
const wordsIn = (s) => String(s).split(/\s+/).filter(Boolean).length;
/** a word and its plain endings count as one word (level, levels; orbit, orbits) */
const stemOf = (w) => { w = String(w).toLowerCase(); return w.length > 4 ? w.replace(/(ing|ed|es|s)$/, '') : w; };
/** all rising or all falling (three or more) */
const monotonic = (g) => g.length >= 3 && (g.every((x, i) => !i || x > g[i - 1]) || g.every((x, i) => !i || x < g[i - 1]));
const staircase = (idx) => idx.length >= 3 && (idx.every((x, i) => !i || x === idx[i - 1] + 1) || idx.every((x, i) => !i || x === idx[i - 1] - 1));
const alternating = (p, m) => m === 2 && p.length >= 3 && p.every((x, i) => !i || x !== p[i - 1]);
const placeMax = (n, m) => Math.ceil((m === 2 ? 0.6 : 0.5) * n);
const tooMany = (p, m) => p.length >= 4 && Math.max(...Array.from({ length: m }, (_, k) => p.filter((x) => x === k).length)) > placeMax(p.length, m);
/** places among m for n answers: every place used where n allows, never a staircase, never every other one, never three
 *  alike in a row, no place holding more than 6 in 10 (two places) or half (three) */
function places(n, m, rng) { for (let k = 0; k < 600; k++) { const p = Array.from({ length: n }, () => rng.int(0, m - 1)); if (new Set(p).size < Math.min(n, m) || staircase(p) || alternating(p, m) || tooMany(p, m) || p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2])) continue; return p; } throw new Error(`no places for ${n} answers among ${m}`); }
/** an order of kinds: never three alike in a row; two kinds never every other one all the way */
const kindOrderOk = (ks) => !ks.some((x, i) => i >= 2 && x === ks[i - 1] && x === ks[i - 2]) && !(new Set(ks).size === 2 && ks.every((x, i) => !i || x !== ks[i - 1]));
/** how many of the options' rows have the right one strictly the longest / strictly the shortest */
const lengthTells = (rows) => ({ longest: rows.filter((r) => r.opts.every((o) => o === r.right || o.length < r.right.length)).length, shortest: rows.filter((r) => r.opts.every((o) => o === r.right || o.length > r.right.length)).length });
/** the sentences of a paragraph: [start, end] offsets */
function sentencesOf(text) { const out = []; let s = 0; const re = /[.!?]["”]?(?=\s+["“]?[A-Z0-9]|\s*$)/g; let m; while ((m = re.exec(text))) { out.push([s, m.index + m[0].length]); s = m.index + m[0].length; while (text[s] === ' ') s++; } return out; }
const sentenceAt = (text, at) => sentencesOf(text).findIndex(([a, b]) => at >= a && at < b);
const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
/** how many first letters two words share */
const prefixLen = (a, b) => { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return i; };
/** the main words of a text (no small words), by stem */
const STOP = new Set('a an the of to in on for with and or that is are was were it its as by at from who which means mean very like not so be this what you your he she they them his her their one some all can do does did has have had will would there here when where how much many more most than then also into out up down over under about after before but if our we us i me my am being been each every other any no only just too own same few such these those while because'.split(' '));
const mainWords = (t) => tokens(t).filter((w) => !STOP.has(w)).map(stemOf);
const INSTR_WORDS = Object.fromEntries(MODES.map((m) => [m, new Set(Object.values(INSTR[m]).flatMap(tokens))]));

/* ---------------------------------------------------------------- the bank's check ---------------------------------------------------------------- */
function faultsOf(b) {
  const f = [];
  const C = (b.ctx || {});
  // ---- passages
  const WC = { 1: [90, 135], 2: [135, 200], 3: [145, 210] };
  for (const lv of [1, 2, 3]) {
    const ps = ((C.passages || {})[lv]) || [];
    if (ps.length < 8) f.push(`passage level ${lv}: fewer than eight passages`);
    if (new Set(ps.map((p) => p.id)).size !== ps.length) f.push(`passage level ${lv}: an id twice`);
    ps.forEach((p) => {
      const all = p.paras.join(' '), n = wordsIn(all), where = `passage ${p.id}`;
      if (n < WC[lv][0] || n > WC[lv][1]) f.push(`${where}: ${n} words (level ${lv} has ${WC[lv][0]} to ${WC[lv][1]})`);
      if (lv === 1 && p.paras.length !== 2) f.push(`${where}: level 1 is two short paragraphs`);
      if (!Array.isArray(p.targets) || p.targets.length !== 8) { f.push(`${where}: not eight clue words`); return; }
      const kinds = p.targets.map((t) => t.kind).join('');
      const want = lv === 1 ? 'DDDDDDDD' : lv === 2 ? 'AAAAEEEE' : 'AADDEESS';
      if (kinds.split('').sort().join('') !== want) f.push(`${where}: the kinds of its clues are ${kinds}, not those of level ${lv}`);
      const toks = tokens(all);
      p.targets.forEach((t, k) => {
        const para = p.paras[t.p] || '';
        if (para.slice(t.at[0], t.at[1]) !== t.w) f.push(`${where}: "${t.w}" is not at its place`);
        if ((p.paras[t.cp] || '').slice(t.cat[0], t.cat[1]) !== t.clue) f.push(`${where}: the clue of "${t.w}" is not at its place`);
        // a clue word stands once in its passage (in no form of its own): the answer is never printed again
        if (toks.filter((x) => stemOf(x) === stemOf(t.w)).length !== 1) f.push(`${where}: "${t.w}" stands more than once in the passage`);
        // the clue and the word: the same sentence (levels 1, 2), the next sentence (level 3)
        const ws = sentenceAt(para, t.at[0]), cs = t.cp === t.p ? sentenceAt(para, t.cat[0]) : -9;
        if (lv < 3 ? cs !== ws : cs !== ws + 1) f.push(`${where}: the clue of "${t.w}" is not in ${lv < 3 ? 'its sentence' : 'the next sentence'}`);
        if (t.cp === t.p && t.cat[0] < t.at[1] && t.at[0] < t.cat[1]) f.push(`${where}: the clue of "${t.w}" overlaps the word`);
        if (k && (t.p < p.targets[k - 1].p || (t.p === p.targets[k - 1].p && t.at[0] < p.targets[k - 1].at[0]))) f.push(`${where}: the words are not in text order`);
        if (hasWord(t.clue, t.w)) f.push(`${where}: the clue of "${t.w}" holds the word`);
        // the clue kinds keep their signals: an antonym clue stands with a word of contrast; an example clue lists two or more
        const sent = (() => { const pp = p.paras[t.cp], ss = sentencesOf(pp), i = sentenceAt(pp, t.cat[0]); return pp.slice(ss[i][0], ss[i][1]); })();
        if (t.kind === 'A' && lv < 3 && !/\b(not|but|unlike|instead|while|yet)\b/i.test(sent)) f.push(`${where}: the antonym clue of "${t.w}" stands with no word of contrast`);
        if (t.kind === 'E' && !/,| and /.test(t.clue)) f.push(`${where}: the example clue of "${t.w}" gives one example`);
        if (t.kind === 'S' && wordsIn(t.clue) !== 1) f.push(`${where}: the synonym clue of "${t.w}" is not one word`);
        if (t.kind === 'D' && wordsIn(t.clue) < 3) f.push(`${where}: the definition clue of "${t.w}" is shorter than three words`);
        if (lv === 1) {
          const o = [t.meaning, ...(t.wrong || [])];
          if (o.length !== 3 || new Set(o).size !== 3 || o.some((x) => !x || x.length > 32)) f.push(`${where}: "${t.w}" has not three different meanings to choose from of 32 letters or fewer (one line of its column)`);
          const flatS = (x) => x.toLowerCase().replace(/[^a-z ]/g, '').trim();
          if (flatS(t.clue).includes(flatS(t.meaning))) f.push(`${where}: the right meaning of "${t.w}" is a copy of its clue ("${t.meaning}")`);
        } else if (!t.meaning || t.meaning.length > SAMPLE_MAX) f.push(`${where}: the sample meaning of "${t.w}" is missing or longer than ${SAMPLE_MAX} letters`);
      });
      if (!omitPairs(p.targets, lv)) f.push(`${where}: the clue words cannot be paired by kind`);
      // the spans of the passage never overlap
      const spans = p.targets.flatMap((t) => [[t.p, ...t.at], [t.cp, ...t.cat]]).sort((a, c) => a[0] - c[0] || a[1] - c[1]);
      spans.forEach((s, i) => { if (i && s[0] === spans[i - 1][0] && s[1] < spans[i - 1][2]) f.push(`${where}: two marked spans overlap`); });
      // level 1: no copy finds the meaning by its length (any six of the eight: the right one is the longest or the shortest of its three at most three times)
      if (lv === 1) { const lt = lengthTells(p.targets.map((t) => ({ right: t.meaning, opts: [t.meaning, ...t.wrong] }))); if (lt.longest > 3 || lt.shortest > 3) f.push(`${where}: the right meaning is the longest ${lt.longest} times or the shortest ${lt.shortest} times of eight`); }
      // no clue word is an instruction word of its type
      p.targets.forEach((t) => { if (INSTR_WORDS.passage.has(t.w.toLowerCase())) f.push(`${where}: "${t.w}" is printed in an instruction`); });
    });
  }
  // ---- sentences of G3-540
  const S = C.sentences || {};
  const sentOk = (x, where) => {
    if (!/^[A-Z][^]*[.!?]$/.test(x.text) || x.text.slice(x.at[0], x.at[1]) !== x.w || x.text.slice(x.cat[0], x.cat[1]) !== x.clue) f.push(`${where}: "${x.text}" is no sentence with its word and clue at their places`);
    if (tokens(x.text).filter((y) => stemOf(y) === stemOf(x.w)).length !== 1) f.push(`${where}: "${x.w}" stands twice in "${x.text}"`);
    if (!KINDS[x.kind]) f.push(`${where}: "${x.w}" has no kind`);
    if (x.kind === 'S' && wordsIn(x.clue) !== 1) f.push(`${where}: the synonym clue of "${x.w}" is not one word`);
    if (x.kind === 'D' && wordsIn(x.clue) < 3) f.push(`${where}: the definition clue of "${x.w}" is shorter than three words`);
    if (x.kind === 'E' && !/,| and /.test(x.clue)) f.push(`${where}: the example clue of "${x.w}" gives one example`);
    if (x.kind === 'A' && !/\b(not|but|unlike|instead|while|yet)\b/i.test(x.text)) f.push(`${where}: the antonym clue of "${x.w}" stands with no word of contrast`);
    if (x.kind === 'E' && !/\b(such as|like|including)\b/.test(x.text)) f.push(`${where}: the example clue of "${x.w}" has no signal word`);
    if (x.text.length > 96) f.push(`${where}: "${x.w}": the sentence is longer than 96 letters`);
    if (INSTR_WORDS.kinds.has(x.w.toLowerCase()) || tokens(Object.values(KIND_TEXT).join(' ') + ' ' + LINES.kinds1 + ' ' + LINES.kinds2 + ' ' + LINES.kinds3).includes(x.w.toLowerCase())) f.push(`${where}: "${x.w}" is printed in an instruction or a task line`);
  };
  // no antonym sentence takes "not" as its signal ("X, not Y" reads as a definition too): but, unlike, while, instead of
  [...(S.choose || []), ...(S.write || [])].filter((x) => x.kind === 'A').forEach((x) => { if (/\bnot\b/i.test(x.text)) f.push(`sentences: the antonym sentence of "${x.w}" uses "not"`); });
  // the right meaning repeats no main word of its clue; with an example clue no choice repeats an example
  (S.choose || []).forEach((x) => { const cw = mainWords(x.clue); if (mainWords(x.meaning).some((w) => cw.includes(w))) f.push(`choose: the right meaning of "${x.w}" ("${x.meaning}") repeats a word of its clue`); if (x.kind === 'E' && (x.wrong || []).some((o) => mainWords(o).some((w) => cw.includes(w)))) f.push(`choose: a meaning of "${x.w}" repeats an example of its sentence`); });
  (S.choose || []).forEach((x) => { sentOk(x, 'choose'); const o = [x.meaning, ...(x.wrong || [])]; if (o.length !== 3 || new Set(o).size !== 3 || o.some((y) => !y || y.length > CHOICE_MAX)) f.push(`choose: "${x.w}" has not three different meanings of ${CHOICE_MAX} letters or fewer`); });
  (S.write || []).forEach((x) => { sentOk(x, 'write'); if (!x.meaning || x.meaning.length > SAMPLE_MAX) f.push(`write: the sample meaning of "${x.w}" is missing or too long`); });
  const cnt = (list, k) => list.filter((x) => x.kind === k).length;
  if (['D', 'A'].some((k) => cnt(S.choose || [], k) < 8) || ['S', 'E'].some((k) => cnt(S.choose || [], k) < 6)) f.push('choose: fewer than eight definition or antonym sentences, or six synonym or example sentences');
  if (['D', 'S', 'A', 'E'].some((k) => cnt(S.write || [], k) < 4)) f.push('write: fewer than four sentences of a kind');
  const allW = [...(S.choose || []), ...(S.write || [])].map((x) => x.w.toLowerCase());
  if (new Set(allW).size !== allW.length) f.push('sentences: a word twice');
  // ---- dictionary pages
  const D = b.dict || {};
  const pages = D.pages || [];
  if (pages.length < 6) f.push('dict: fewer than six dictionary pages');
  pages.forEach((pg) => {
    const es = pg.entries || [], where = `dict ${pg.id}`, ws = es.map((e) => e.w);
    if (es.length !== 12) f.push(`${where}: not twelve entries`);
    ws.forEach((w, i) => { if (!/^[a-z]+$/.test(w)) f.push(`${where}: "${w}" is no plain word`); if (i && cmp(ws[i - 1], w) >= 0) f.push(`${where}: "${w}" is not in ABC order after "${ws[i - 1]}"`); });
    es.forEach((e) => {
      if (!POS.includes(e.pos) || !Array.isArray(e.meanings) || e.meanings.length < 1 || e.meanings.length > 2 || e.meanings.some((m) => !m || m.length > 90)) f.push(`${where}: "${e.w}" has no part of speech or not one or two meanings`);
      if (e.ex && !hasWord(e.ex, e.w)) f.push(`${where}: the example of "${e.w}" does not use it`);
      if (e.spell && (e.spell.length !== 2 || e.spell.some((s) => s === e.w || ws.includes(s) || !/^[a-z]+$/.test(s)) || new Set(e.spell).size !== 2)) f.push(`${where}: the misspellings of "${e.w}" are not two other letter strings`);
      if (e.spell && !e.spell.some((s) => s.length === e.w.length)) f.push(`${where}: no misspelling of "${e.w}" has its length (the right word would be found by its length)`);
      if (e.meanings.length === 2) {
        const u = e.uses || [];
        if ([1, 2].some((k) => u.filter((x) => x[1] === k).length < 2)) f.push(`${where}: "${e.w}" has fewer than two sentences for a meaning`);
        u.forEach(([t]) => { if (!/^[A-Z][^]*[.!?]$/.test(t) || !hasWord(t, e.w) || t === e.ex) f.push(`${where}: "${t}" is no sentence with "${e.w}", or it is the example`); });
      } else if (e.uses) f.push(`${where}: "${e.w}" has one meaning and sentences to choose a meaning`);
      if (INSTR_WORDS.dict.has(e.w)) f.push(`${where}: "${e.w}" is printed in an instruction`);
    });
    if (es.filter((e) => e.meanings.length === 2).length < 3) f.push(`${where}: fewer than three entries with two meanings`);
    if (es.filter((e) => e.spell).length < 4) f.push(`${where}: fewer than four entries with misspellings`);
    (pg.news || []).forEach((x) => { if (!(cmp(ws[0], x.w) < 0 && cmp(x.w, ws[ws.length - 1]) < 0) || ws.includes(x.w) || !POS.includes(x.pos) || !x.meaning || !x.sentence || !hasWord(x.sentence, x.w)) f.push(`${where}: the new word "${x.w}" does not belong between the guide words, or it has no part of speech, meaning, or sentence`); if (x.meaning.length > 32 || x.sentence.length > 32) f.push(`${where}: the sample entry of "${x.w}" is longer than a line holds`); });
    if ((pg.news || []).length < 2) f.push(`${where}: fewer than two new words`);
    // nothing printed on the page holds a new word (its entry is written by the child)
    const printed = es.flatMap((e) => [e.w, ...e.meanings, e.ex || '']).join(' ');
    (pg.news || []).forEach((x) => { if (hasWord(printed, x.w)) f.push(`${where}: the new word "${x.w}" is printed on the page`); });
  });
  Object.entries(D.words || {}).forEach(([k, ws]) => { if (ws.some((w) => !/^[a-z]+$/.test(w) || w[0] !== k) || new Set(ws).size !== ws.length || ws.length < 12) f.push(`dict words "${k}": fewer than twelve plain words of the letter, or a word twice`); });
  // ---- glossary texts
  const G = (b.gloss || {}).texts || [];
  if (G.length < 6) f.push('gloss: fewer than six texts');
  G.forEach((g) => {
    const where = `gloss ${g.id}`, bw = (g.bold || []).map((x) => x.w), ew = (g.extra || []).map((x) => x.w);
    if (bw.length !== 6 || new Set(bw.map((w) => w[0])).size !== 6) f.push(`${where}: not six bold words with six first letters`);
    (g.bold || []).forEach((x) => { if ((g.paras[x.p] || '').slice(x.at[0], x.at[1]) !== x.form || !x.meaning || x.meaning.length > 66) f.push(`${where}: "${x.w}" is not at its place or has no glossary meaning`); if (x.ctx && x.ctx.length > SAMPLE_MAX) f.push(`${where}: the meaning from the text of "${x.w}" is too long for its line`); });
    if ((g.bold || []).filter((x) => x.ctx).length < 2) f.push(`${where}: fewer than two bold words the text explains`);
    if (ew.length !== 2 || ew.some((w) => bw.includes(w)) || !ew.some((w) => bw.some((y) => y[0] === w[0]))) f.push(`${where}: not two other words of the book, one of them sharing a first letter with a bold word`);
    const n = wordsIn(g.paras.join(' ')); if (n < 60 || n > 110) f.push(`${where}: ${n} words (a glossary text has 60 to 110)`);
    (g.statements || []).forEach((s) => { if (!['yes', 'no'].includes(s.a) || ![...bw, ...ew].includes(s.about) || !/^[A-Z][^]*[.!?]$/.test(s.text) || !(hasWord(s.text, s.about) || tokens(s.text).some((t) => stemOf(t) === stemOf(s.about)))) f.push(`${where}: "${s.text}" is no yes/no sentence about a glossary word`); });
    for (const k of ['yes', 'no']) if ((g.statements || []).filter((s) => s.a === k && bw.includes(s.about)).length < 3) f.push(`${where}: fewer than three ${k} sentences about the bold words`);
    (g.insert || []).forEach((w) => { if (!/^[a-z]+$/.test(w) || bw.includes(w) || ew.includes(w) || w.length > 10) f.push(`${where}: "${w}" is no new word for the glossary (or longer than its column)`); });
    // a new word to place is never printed inside a definition of the glossary
    { const defs = [...(g.bold || []), ...(g.extra || [])].flatMap((x) => tokens(x.meaning)).map(stemOf); (g.insert || []).forEach((w) => { if (defs.includes(stemOf(w))) f.push(`${where}: the new word "${w}" is printed in a definition of the glossary`); }); }
    // every level has new words to place: level 1 by the first letter, levels 2 and 3 by a later letter
    // (each new word of a page goes in a gap of its own: count the gaps)
    const gl1 = bw.slice().sort(cmp), gl2 = [...bw, ...ew].sort(cmp);
    const gapsOf = (gl, k) => new Set((g.insert || []).filter((w) => insertKind(w, gl) === k).map((w) => gl.findIndex((x) => cmp(w, x) < 0))).size;
    if (gapsOf(gl1, 1) < 3) f.push(`${where}: fewer than three gaps of the glossary take a new word by its first letter`);
    if (gapsOf(gl2, 2) < 3) f.push(`${where}: fewer than three gaps of the glossary take a new word by a later letter`);
    // level 3: the missing word is one the text explains and that goes between two words of the glossary
    const missable = (g.bold || []).filter((x) => x.ctx && insertKind(x.w, gl2.filter((w) => w !== x.w)) > 0 && sharedPair(gl2.filter((w) => w !== x.w)));
    if (missable.length < 2) f.push(`${where}: fewer than two bold words the text explains that go between two glossary words`);
    missable.forEach((x) => { const gl3 = gl2.filter((w) => w !== x.w); if (gapsOf(gl3, 2) < 2) f.push(`${where}: with "${x.w}" missing, fewer than two gaps take a new word by a later letter`); });
    [...bw, ...ew].forEach((w) => { if (INSTR_WORDS.gloss.has(w)) f.push(`${where}: "${w}" is printed in an instruction`); });
  });
  if (f.length) return f;
  // every level can draw its pages: 40 seeded draws a level
  const senseCount = { 1: { 1: 0, 2: 0 }, 2: { 1: 0, 2: 0 }, 3: { 1: 0, 2: 0 } };
  for (const mode of MODES) for (const lv of [1, 2, 3]) for (let k = 1; k <= 40; k++) {
    try { const p = drawPage(b, mode, lv, makeRng(`g3wm-check|${mode}|${lv}|${k}`), k); if (mode === 'dict') p.qs.filter((q) => q.kind === 'meaning').forEach((q) => { senseCount[lv][q.right]++; }); } catch (e) { f.push(`${mode} level ${lv}: a page cannot be drawn (${e.message})`); break; }
  }
  // over the copies of a level, the meaning questions ask meaning 1 and meaning 2 equally often (40 copies: within 2)
  for (const lv of [1, 2, 3]) if (Math.abs(senseCount[lv][1] - senseCount[lv][2]) > 2) f.push(`dict level ${lv}: over 40 copies meaning 1 is asked ${senseCount[lv][1]} times and meaning 2 ${senseCount[lv][2]} times`);
  return f;
}
/** where a new word goes in a glossary (sorted words): 1 = by its first letter (it differs from both neighbours'),
 *  2 = by a later letter (it shares the first letter with a neighbour), 0 = not between two words (first, last, or in it) */
function insertKind(w, gl) {
  if (gl.includes(w)) return 0;
  const i = gl.findIndex((x) => cmp(w, x) < 0);
  if (i <= 0) return 0;
  const a = gl[i - 1], c = gl[i];
  return a[0] !== w[0] && c[0] !== w[0] ? 1 : 2;
}
/** a sorted glossary has two words with one first letter (so a later letter decides somewhere: levels 2 and 3) */
const sharedPair = (gl) => gl.some((w, i) => i > 0 && gl[i - 1][0] === w[0]);
const neighbours = (w, gl) => { const i = gl.findIndex((x) => cmp(w, x) < 0); return [gl[i - 1], gl[i]]; };

/* ---------------------------------------------------------------- drawing a page (data only) ---------------------------------------------------------------- */
function drawPage(b, mode, lv, rng, variant) {
  let last;
  for (let k = 0; k < 60; k++) { try { return drawOnce(b, mode, lv, rng, variant); } catch (e) { last = e; } }
  throw last;
}
/** the four pairs of clue words a passage leaves plain, one pair a copy (copy v: pair floor((v-1)/8) mod 4); levels 2 and 3
 *  pair two words of different kinds, so a level-2 copy keeps three example and three antonym clues and a level-3 copy
 *  keeps all four kinds */
function omitPairs(targets, lv) {
  const n = targets.length, used = new Array(n).fill(false), pairs = [];
  const rec = () => { const i = used.indexOf(false); if (i < 0) return true; used[i] = true; for (let j = i + 1; j < n; j++) { if (used[j] || (lv > 1 && targets[j].kind === targets[i].kind)) continue; used[j] = true; pairs.push([i, j]); if (rec()) return true; pairs.pop(); used[j] = false; } used[i] = false; return false; };
  return rec() ? pairs : null;
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const count = (d, kind) => (d.tasks.find((t) => t[0] === kind) || [])[1] || 0;
/** copy v of a level shows item ((v-1) mod n) of a fixed order of the level */
const nth = (list, key, variant) => { const order = makeRng(key).shuffle(list.map((_, i) => i)); return { at: order[((Number(variant) || 1) - 1) % list.length], visit: Math.floor(((Number(variant) || 1) - 1) / list.length) }; };

function drawOnce(b, mode, lv, rng, variant) {
  const d = LEVELS[mode][lv];
  const items = [];

  if (mode === 'kinds') {
    const pool = b.ctx.sentences[d.pool].filter((x) => d.kinds.includes(x.kind));
    let pick = null;
    for (let t = 0; t < 400 && !pick; t++) {
      // the sentences of copy v: for each kind a window of a fixed order of its sentences (copy after copy the window
      // moves on, so two copies share at most a few sentences); a window that breaks a rule moves on by one
      const per = d.per || 2;
      let got = d.kinds.flatMap((k, ki) => { const list = makeRng(`g3wm-kinds|${lv}|${k}`).shuffle(pool.filter((x) => x.kind === k)); const P = list.length;
        const a = [3, 7, 9, 11, 13, 17].filter((m) => gcd(m, P) === 1)[ki % 2] || 1, v0 = (Number(variant) || 1) - 1;
        const at0 = (a * v0 + (ki + 1) * Math.floor(v0 / P) + Math.floor(t / 20)) % P;
        return Array.from({ length: per }, (_, j) => list[(at0 + j) % P]); });
      // level 3: six of the eight, two kinds keep one sentence
      if (!d.per) { const drop = shuffle(d.kinds, rng).slice(0, 2); drop.forEach((k) => { const i = got.findIndex((x) => x.kind === k); got.splice(i, 1); }); }
      const order = shuffle(got, rng);
      if (order.length !== d.n || !kindOrderOk(order.map((x) => x.kind))) continue;
      // no word of a sentence is the clue word of another sentence of the page
      if (order.some((x) => order.some((y) => y !== x && tokens(y.text).some((tk) => stemOf(tk) === stemOf(x.w))))) continue;
      // the meanings to circle: in no pattern of places, and never found by their length (the window moves on if it must)
      if (d.pool === 'choose' && (() => { const r = order.map((x) => ({ right: x.meaning, opts: [x.meaning, ...x.wrong] })), lt = lengthTells(r); return lt.longest > Math.floor(d.n / 2) || lt.shortest > Math.floor(d.n / 2); })()) continue;
      pick = order;
    }
    if (!pick) throw new Error('no sentences for the page');
    let rows;
    if (d.pool === 'choose') { const at = places(d.n, 3, rng); rows = pick.map((x, i) => { const opts = shuffle(x.wrong, rng); opts.splice(at[i], 0, x.meaning); return { ...x, opts, right: x.meaning }; }); }
    else rows = pick.map((x) => ({ ...x }));
    items.push(...rows.map((x) => 'kinds:' + x.w));
    return { mode, lv, rows, items };
  }

  if (mode === 'passage') {
    const ps = b.ctx.passages[lv];
    const { at, visit } = nth(ps, `g3wm-passage|${lv}`, variant);
    const p = ps[at];
    const omit = omitPairs(p.targets, lv)[visit % 4];
    const asked = p.targets.filter((_, k) => !omit.includes(k));
    let rows = asked.map((t) => ({ ...t }));
    if (d.answer === 'choose') {
      let ok = null;
      for (let t = 0; t < 200 && !ok; t++) {
        const pl = places(asked.length, 3, rng);
        const r = asked.map((x, i) => { const opts = shuffle(x.wrong, rng); opts.splice(pl[i], 0, x.meaning); return { ...x, opts, right: x.meaning }; });
        const lt = lengthTells(r);
        if (lt.longest > 3 || lt.shortest > 3) continue;
        ok = r;
      }
      if (!ok) throw new Error('no meanings that length does not give away');
      rows = ok;
    }
    if (d.answer === 'kind' && (new Set(rows.map((x) => x.kind)).size < 4 || !kindOrderOk(rows.map((x) => x.kind)))) throw new Error('the kinds of the copy follow a pattern');
    items.push(...asked.map((t) => 'p:' + p.id + ':' + t.w));
    return { mode, lv, p, asked: asked.map((t) => t.w), rows, items };
  }

  if (mode === 'dict') {
    const D = b.dict, { at } = nth(D.pages, 'g3wm-dict', variant), pg = D.pages[at];
    const es = pg.entries, ws = es.map((e) => e.w);
    const banned = new Set([...ws, ...pg.news.map((x) => x.w), ...INSTR_WORDS.dict, ...tokens(Object.values(LINES).join(' ')), ...tokens(es.flatMap((e) => [...e.meanings, e.ex || '', ...(e.uses || []).map((u) => u[0])]).join(' '))]);
    const qs = [];
    // guide words: two questions, other dictionary pages (pairs of words of the word lists)
    const guide = guideQuestions(D.words, d.depth, banned, rng, count(d, 'guide'));
    qs.push(...guide);
    const used = new Set();
    // which meaning: one or two words with two meanings
    const two = shuffle(es.filter((e) => e.meanings.length === 2), rng).slice(0, count(d, 'meaning'));
    if (two.length < count(d, 'meaning')) throw new Error('too few words with two meanings');
    // the meaning each question asks: no rule on a page (both questions may ask one meaning, or one each), and over the
    // copies of a level both meanings are asked equally often (the first question turns every copy, the second every two)
    const cv = (Number(variant) || 1) - 1, senses = two.map((e, i) => 1 + (i === 0 ? cv % 2 : Math.floor(cv / 2) % 2));
    two.forEach((e, i) => { const u = shuffle(e.uses.filter((x) => x[1] === senses[i]), rng)[0]; qs.push({ kind: 'meaning', w: e.w, sentence: u[0], right: senses[i], opts: [1, 2] }); used.add(e.w); });
    // spelling
    const sp = shuffle(es.filter((e) => e.spell && !used.has(e.w)), rng).slice(0, count(d, 'spell'));
    if (sp.length < count(d, 'spell')) throw new Error('too few words to spell');
    { const lt = lengthTells(sp.map((e) => ({ right: e.w, opts: [e.w, ...e.spell] }))); if (lt.longest > Math.floor(sp.length / 2) || lt.shortest > Math.floor(sp.length / 2)) throw new Error('the right spellings are found by their length'); }
    sp.forEach((e) => { qs.push({ kind: 'spell', w: e.w, right: e.w, opts: e.spell.slice(), three: true }); used.add(e.w); });
    // part of speech: the part of speech asked is drawn first (so "noun" is not the answer every time)
    if (count(d, 'pos')) { const kinds = [...new Set(es.filter((e) => !used.has(e.w)).map((e) => e.pos))]; const k = kinds[rng.int(0, kinds.length - 1)]; const e = shuffle(es.filter((x) => x.pos === k && !used.has(x.w)), rng)[0]; qs.push({ kind: 'pos', w: e.w, right: e.pos, opts: POS.slice() }); used.add(e.w); }
    // how many meanings
    if (count(d, 'count')) { const k = rng.int(1, 2); const e = shuffle(es.filter((x) => x.meanings.length === k && !used.has(x.w)), rng)[0]; if (!e) throw new Error('no word for how many meanings'); qs.push({ kind: 'count', w: e.w, right: String(k), opts: ['1', '2'] }); used.add(e.w); }
    // the next word on the page
    if (count(d, 'after')) { const i = rng.int(1, es.length - 3); const e = es[i]; if (used.has(e.w)) throw new Error('the word is asked already'); const others = shuffle([es[i - 1], es[i + 2]].map((x) => x.w), rng); qs.push({ kind: 'after', w: e.w, right: es[i + 1].w, opts: others, three: true }); used.add(e.w); }
    // the places of the three-choice answers, together
    const three = qs.filter((q) => q.kind === 'guide' || q.three);
    const pl = places(three.length, 3, rng);
    three.forEach((q, i) => { if (q.kind === 'guide') { const o = q.wrongPairs.slice(); o.splice(pl[i], 0, q.pair); q.opts = o; q.right = q.pair; } else { const o = shuffle(q.opts, rng); o.splice(pl[i], 0, q.right); q.opts = o; } });
    // a new word for the entry (level 3)
    const entry = d.entry ? shuffle(pg.news.filter((x) => !qs.some((q) => q.probe === x.w)), rng)[0] : null;
    if (d.entry && !entry) throw new Error('no new word');
    items.push('dict:' + pg.id, ...qs.map((q) => q.kind + ':' + (q.probe || q.w) + ':' + (q.sentence || '')), ...(entry ? ['entry:' + entry.w] : []));
    return { mode, lv, pg, qs, entry, items };
  }

  if (mode === 'gloss') {
    const G = b.gloss.texts, { at, visit } = nth(G, 'g3wm-gloss', variant), g = G[at];
    const turn = (list, k) => { const o = makeRng(`g3wm-gloss|${g.id}|${k}`).shuffle(list), sh = (visit * (k === 'yn' ? 5 : 3)) % Math.max(1, o.length); return [...o.slice(sh), ...o.slice(0, sh)]; };
    const bw = g.bold.map((x) => x.w), ew = g.extra.map((x) => x.w);
    const missing = d.missing ? shuffle(g.bold.filter((x) => x.ctx && insertKind(x.w, [...bw, ...ew].filter((w) => w !== x.w).sort(cmp)) > 0 && sharedPair([...bw, ...ew].filter((w) => w !== x.w).sort(cmp))), rng)[0].w : null;
    const glossWords = [...bw, ...(d.extra ? ew : [])].filter((w) => w !== missing).sort(cmp);
    // yes/no sentences: about the glossary words of the page, one a word, in no pattern
    const pat = places(d.yn, 2, rng).map((x) => (x ? 'no' : 'yes'));
    const usedAbout = new Set(), yn = [];
    const stOrder = turn(g.statements, 'yn');
    for (const a of pat) { const s = stOrder.find((x) => x.a === a && glossWords.includes(x.about) && !usedAbout.has(x.about)); if (!s) throw new Error('too few yes/no sentences'); usedAbout.add(s.about); yn.push(s); }
    // new words: placed by the first letter (level 1) or a later letter; each in its own gap; not in the order of the glossary
    const want = d.extra ? 2 : 1;
    const pool = turn(g.insert.filter((w) => insertKind(w, glossWords) === want), 'ins');
    let ins = null;
    for (let t = 0; t < 200 && !ins; t++) {
      // the first tries keep the copy's own words (other copies of the text take others); then any
      const got = t < 40 ? shuffle(pool.slice(0, d.ins + 2), rng).slice(0, d.ins) : shuffle(pool, rng).slice(0, d.ins);
      if (got.length < d.ins) break;
      const gaps = got.map((w) => glossWords.findIndex((x) => cmp(w, x) < 0));
      if (new Set(gaps).size !== got.length || monotonic(gaps)) continue;
      ins = got;
    }
    if (!ins) throw new Error('no new words for the glossary');
    items.push('gloss:' + g.id, ...yn.map((s) => 'yn:' + s.text), ...ins.map((w) => 'ins:' + w), ...(missing ? ['miss:' + missing] : []));
    return { mode, lv, g, glossWords, missing, yn, ins, items };
  }
  throw new Error('word-meanings-g3: unknown mode ' + mode);
}

/** guide-word questions: n questions, each with a probe word and three guide-word pairs (one of them holds the probe).
 *  depth 1: the pairs have three different first letters, the probe's first letter decides; depth 2: all words share the
 *  first letter (a later letter decides); depth 3: as 2, and the probe shares its first two letters with a guide word next
 *  to it (the third letter decides). */
function guideQuestions(lists, depth, banned, rng, n) {
  const L = Object.fromEntries(Object.entries(lists).map(([k, ws]) => [k, ws.filter((w) => !banned.has(w)).sort(cmp)]));
  const out = [], usedLetters = new Set(), usedWords = new Set();
  for (let t = 0; t < 600 && out.length < n; t++) {
    let pairs = null, probe = null, right = null;
    if (depth === 1) {
      const letters = shuffle(Object.keys(L).filter((k) => !usedLetters.has(k) && L[k].length >= 5), rng).slice(0, 3).sort();
      if (letters.length < 3) continue;
      pairs = letters.map((k) => { const ws = L[k], i = rng.int(0, ws.length - 5), j = rng.int(i + 4, ws.length - 1); return [ws[i], ws[j]]; });
      right = rng.int(0, 2);
      const [a, c] = pairs[right], inner = L[letters[right]].filter((w) => cmp(a, w) < 0 && cmp(w, c) < 0);
      probe = inner[rng.int(0, inner.length - 1)];
      if (!probe) continue;
      letters.forEach((k) => usedLetters.add(k));
    } else {
      const k = shuffle(Object.keys(L).filter((x) => !usedLetters.has(x) && L[x].length >= 12), rng)[0];
      if (!k) continue;
      const ws = L[k];
      // three chunks of three or four words in a row, with a gap of 0 to 2 words between them
      const sizes = [rng.int(3, 4), rng.int(3, 4), rng.int(3, 4)], gaps = [rng.int(0, 2), rng.int(0, 2)];
      const span = sizes.reduce((s, x) => s + x, 0) + gaps[0] + gaps[1];
      if (span > ws.length) continue;
      let i0 = rng.int(0, ws.length - span); const chunks = [];
      sizes.forEach((sz, c) => { chunks.push(ws.slice(i0, i0 + sz)); i0 += sz + (gaps[c] || 0); });
      pairs = chunks.map((ch) => [ch[0], ch[ch.length - 1]]);
      right = rng.int(0, 2);
      const inner = chunks[right].slice(1, -1);
      probe = inner[rng.int(0, inner.length - 1)];
      if (depth === 3) {
        // the third letter decides: the probe shares two letters with a guide word of its pair or of a pair beside it
        const near = [...pairs[right], ...(pairs[right - 1] ? [pairs[right - 1][1]] : []), ...(pairs[right + 1] ? [pairs[right + 1][0]] : [])];
        if (!near.some((w) => prefixLen(w, probe) >= 2)) continue;
      }
      usedLetters.add(k);
    }
    const words = [...pairs.flat(), probe];
    if (words.some((w) => usedWords.has(w))) continue;
    words.forEach((w) => usedWords.add(w));
    out.push({ kind: 'guide', probe, pair: pairs[right].join(' – '), wrongPairs: pairs.filter((_, i) => i !== right).map((p) => p.join(' – ')), depth });
  }
  if (out.length < n) throw new Error('no guide-word questions');
  return out;
}

{ const f = faultsOf(BANK); if (f.length) throw new Error('word-meanings-g3.en.json: ' + f.slice(0, 12).join('; ') + (f.length > 12 ? ` (and ${f.length - 12} more)` : '')); }

/* ---------------------------------------------------------------- the parts of a page ---------------------------------------------------------------- */
const LIGS = "font-variant-ligatures:none;font-feature-settings:'liga' 0,'clig' 0;";
const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{font-variant-ligatures:none !important;font-feature-settings:"liga" 0,"clig" 0 !important}</style>';   // before the root: verify counts the root's children as blocks
/** typographic apostrophe and quotes on the page (the bank and the attributes keep straight ones) */
const typo = (t) => t.replace(/'/g, '’').replace(/&quot;/g, (m, at, s) => (at === 0 || /[\s([]$/.test(s.slice(0, at)) ? '“' : '”'));
/** an f before i, f, l, or t and a t before t get room of their own; every printed text passes through typo() here */
function fRoom(html) {
  let out = '', i = 0;
  while (i < html.length) {
    if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1; continue; }
    const j = html.indexOf('<', i), text = html.slice(i, j < 0 ? html.length : j);
    out += typo(text).replace(/f(?=[iflt])|t(?=t)/g, (m) => `<span data-lcs-fsep style="margin-right:0.07em">${m}</span>`);
    i = j < 0 ? html.length : j;
  }
  return out;
}
const grow = (rows) => `flex:${rows} 1 auto`;
const cream = (attrs, inner, pad = 8, gap = 6, more = '') => `<div ${attrs} style="display:flex;flex-direction:column;gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream};min-width:0;${more}">${inner}</div>`;
const label = (html, px = 16.5) => `<div data-lcs-label data-lcs-read style="font:700 ${px}px/1.25 'Nunito',sans-serif;color:${T.ink}">${html}</div>`;
const num = (k) => `<span style="color:${T.teal}">${k}.</span> `;
const pill = (text, ok, key, font, attr = '') => `<span data-lcs-pill data-lcs-word="${esc(text)}"${ok ? ' data-lcs-ok="1"' : ''}${attr} style="flex:0 0 auto;font:800 ${font}px/1.2 'Nunito',sans-serif;color:${T.ink};padding:1px 10px;border:3px solid ${key && ok ? T.teal : 'transparent'};border-radius:999px;background:#FFFFFF">${esc(text)}</span>`;
/** a single-rule writing line; `room`: the letters of the longest answer a child writes on it */
function rule({ w, h = ROWH, answer, sample, room, min }) {
  const px = answer ? Math.max(12, Math.min(19, (w - 10) / (String(answer).length * 0.56))) : 0;
  return `<div data-lcs-line data-lcs-room="${room || 0}"${min ? ` data-lcs-min="${min}"` : ''}${answer ? ` data-lcs-answer="${esc(answer)}"` : ''}${answer && sample ? ' data-lcs-key-sample="1"' : ''} style="box-sizing:border-box;flex:0 0 auto;width:${w}px;height:${h}px;border-bottom:1.5px solid #8C8479;display:flex;align-items:flex-end;gap:6px;padding:0 4px 3px;overflow:hidden">` +
    (answer ? `<span data-lcs-keytext style="flex:0 0 auto;white-space:nowrap;font:700 ${px.toFixed(1)}px/1 'Nunito',sans-serif;color:${T.teal}">${esc(answer)}</span>` : '') + `</div>`;
}
/** a line that fills the rest of a flex row */
const ruleFlex = (o) => `<div data-lcs-linewrap style="flex:1 1 auto;min-width:0">${rule(o)}</div>`;
const boxMark = (want, key, size = MARKBOX) => `<span data-lcs-markbox data-lcs-want="${esc(want)}" style="flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border:2.5px solid ${T.ink};border-radius:7px;background:#FFFFFF;font:800 ${Math.round(size * 0.6)}px/1 'Nunito',sans-serif;color:${T.teal}">${key ? esc(want) : ''}</span>`;
const UNDER = `box-shadow:inset 0 -3px 0 ${T.teal}`;
/** a text with spans: [start, end, open, close] (sorted, never overlapping) */
function marked(text, spans) {
  let out = '', i = 0;
  spans.slice().sort((a, c) => a[0] - c[0]).forEach(([s, e, o, c]) => { out += esc(text.slice(i, s)) + o + esc(text.slice(s, e)) + c; i = e; });
  return out + esc(text.slice(i));
}
/** a sentence card's text: the bold word and the clue (underlined on the key) */
const clueText = (x, key) => marked(x.text, [[x.at[0], x.at[1], `<b data-lcs-target="${esc(x.w)}" style="font-weight:900">`, '</b>'], [x.cat[0], x.cat[1], `<span data-lcs-clue="${esc(x.w)}"${key ? ` style="${UNDER}"` : ''}>`, '</span>']]);
const keyLine = (k) => k.split('').map((c) => `<div data-lcs-kindkey="${c}" data-lcs-read style="font:700 15.5px/1.22 'Nunito',sans-serif;color:${T.ink}"><b style="color:${T.teal}">${c}</b>&nbsp;${esc(KIND_TEXT[c])}</div>`).join('');
const small = (text, px = 16) => `<span data-lcs-read style="flex:0 0 auto;padding-bottom:5px;font:700 ${px}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(text)}</span>`;
/** a line for one word of a list (Goes between ___ and ___, Word: ___): 250 px at least, wider for a long word */
const wordLineW = (words) => Math.max(WORDLINE, Math.ceil(Math.max(...words.map((w) => w.length)) * HAND + 14));
/** lines for a written meaning: the first `w1` wide (in its row), then full-width lines under it until the lines hold
 *  `room` letters in a third grader's hand (the room counts the clue a child may copy as well as the key's answer);
 *  `min` forces a number of lines. Returns [the first line, the lines under it]; the item carries data-lcs-lines. */
function linesFor({ w1, wf, room, answer, sample, min = 1 }) {
  const ws = [w1];
  while (ws.length < min || ws.reduce((s, x) => s + x, 0) < room * HAND) ws.push(wf);
  const ls = ws.map((w, i) => (i === 0 ? rule({ w, answer, sample, room: 0 }) : rule({ w, answer: null, sample, room: 0 }).replace('<div data-lcs-line', '<div data-lcs-line data-lcs-more')));
  return [ls[0], ls.slice(1).join('')];
}

/* ---------------------------------------------------------------- the pages ---------------------------------------------------------------- */
function renderPage(plan, key) {
  const { mode, lv } = plan, d = LEVELS[mode][lv], inner = W - 24;
  const blocks = [];
  const roomOf = (x) => Math.max(x.meaning.length, x.clue.length);

  if (mode === 'kinds') {
    blocks.push(cream('data-lcs-task="legend"', `<div data-lcs-legend style="display:flex;flex-direction:column;gap:1px;padding-left:4px">${keyLine(d.kinds.join(''))}</div>`, 6, 2));
    const card = (x, i) => {
      let row2;
      if (d.pool === 'choose') row2 = `<div style="display:flex;align-items:center;gap:10px;padding-left:20px"><div data-lcs-opts style="flex:1 1 auto;display:flex;flex-wrap:wrap;gap:4px 8px">${x.opts.map((o) => pill(o, o === x.right, key, d.pfont)).join('')}</div>${boxMark(x.kind, key)}</div>`;
      else { const [l1, more] = linesFor({ w1: inner - 16, wf: inner - 16, room: roomOf(x), answer: key ? 'Sample answer: ' + x.meaning : null, sample: true }); row2 = `<div data-lcs-lines data-lcs-room="${roomOf(x)}" style="display:flex;flex-direction:column;gap:2px">${l1}${more}</div>`; }
      const head = d.pool === 'choose' ? `<div data-lcs-sent data-lcs-read style="font:600 ${d.font}px/1.3 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${clueText(x, key)}</div>`
        : `<div style="display:flex;align-items:center;gap:12px"><div data-lcs-sent data-lcs-read style="flex:1 1 auto;min-width:0;font:600 ${d.font}px/1.3 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${clueText(x, key)}</div>${boxMark(x.kind, key)}</div>`;
      return `<div data-lcs-card="${esc(x.w)}" data-lcs-kind="${x.kind}" data-lcs-text="${esc(x.text)}" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:2px;padding:3px 8px;border-radius:10px;background:#FFFFFF">${head}${row2}</div>`;
    };
    blocks.push(cream('data-lcs-task="kinds"', label(lv === 1 ? LINES.kinds1 : lv === 2 ? LINES.kinds2 : LINES.kinds3) + `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:5px">${plan.rows.map(card).join('')}</div>`, 7, 5, grow(10)));
  }

  if (mode === 'passage') {
    const p = plan.p, asked = new Set(plan.asked);
    const paras = p.paras.map((text, pi) => {
      const spans = [];
      p.targets.filter((t) => asked.has(t.w)).forEach((t) => {
        if (t.p === pi) spans.push([t.at[0], t.at[1], `<b data-lcs-target="${esc(t.w)}" style="font-weight:900">`, '</b>']);
        if (t.cp === pi) spans.push([t.cat[0], t.cat[1], `<span data-lcs-clue="${esc(t.w)}"${key ? ` style="${UNDER}"` : ''}>`, '</span>']);
      });
      return `<p data-lcs-para="${pi}" data-lcs-read style="margin:0;text-indent:22px;font:600 ${d.font}px/${d.lh} 'Nunito',sans-serif;color:${T.ink}">${marked(text, spans)}</p>`;
    }).join('');
    blocks.push(cream(`data-lcs-task="text"`, `<div data-lcs-title style="font:700 21px/1.1 'Baloo 2',cursive;color:${T.ink};text-align:center">${esc(p.title)}</div>` + `<div data-lcs-passage style="display:flex;flex-direction:column;gap:5px;padding:6px 12px;border-radius:10px;background:#FFFFFF">${paras}</div>`, 7, 4));
    const rows = plan.rows;
    let body;
    if (d.answer === 'choose') {
      const item = (x, i) => `<div data-lcs-item="${esc(x.w)}" style="display:flex;flex-direction:column;justify-content:space-around;gap:3px;padding:4px 8px;border-radius:10px;background:#FFFFFF">` +
        `<div data-lcs-read style="font:800 17px/1.2 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${esc(x.w.toLowerCase())}</div>` +
        `<div data-lcs-opts style="display:flex;flex-direction:column;align-items:flex-start;gap:3px;padding-left:20px">${x.opts.map((o) => pill(o, o === x.right, key, d.pfont)).join('')}</div></div>`;
      body = `<div data-lcs-rows style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:8px 12px">${rows.map(item).join('')}</div>`;
    } else {
      // the word (and the box for its kind) at the left, the line to the margin, more full lines where the clue is long
      const lw = inner - WORDCOL - 10 - (d.answer === 'kind' ? MARKBOX + 10 : 0);
      const item = (x, i) => { const [l1, more] = linesFor({ w1: lw, wf: inner, room: roomOf(x), answer: key ? 'Sample answer: ' + x.meaning : null, sample: true });
        return `<div data-lcs-item="${esc(x.w)}" data-lcs-lines data-lcs-room="${roomOf(x)}" style="display:flex;flex-direction:column;gap:2px"><div style="display:flex;align-items:flex-end;gap:10px">` +
          `<span data-lcs-read style="flex:0 0 auto;width:${WORDCOL}px;padding-bottom:5px;font:800 16.5px/1 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${esc(x.w.toLowerCase())}</span>` +
          (d.answer === 'kind' ? boxMark(x.kind, key) : '') + l1 + `</div>${more}</div>`; };
      body = (d.answer === 'kind' ? `<div data-lcs-legend data-lcs-read style="font:700 15.5px/1.3 'Nunito',sans-serif;color:${T.inkSoft}">${['D', 'S', 'A', 'E'].map((k) => `<b style="color:${T.teal}">${k}</b>&nbsp;${KINDS[k]}`).join(' · ')}</div>` : '') +
        `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:5px">${rows.map(item).join('')}</div>`;
    }
    blocks.push(cream('data-lcs-task="items"', label(lv === 1 ? LINES.pass1 : lv === 2 ? LINES.pass2 : LINES.pass3) + body, 7, 5, grow(6)));
  }

  if (mode === 'dict') {
    const pg = plan.pg, es = pg.entries, ws = es.map((e) => e.w);
    // a meaning's number never stands alone at the end of a line: it is kept with the first word of its meaning
    const meanHtml = (m, n) => { const [w0, ...rest] = m.split(' '); return `<span data-lcs-mean="${n}"><span data-lcs-numhead style="white-space:nowrap"><b style="color:${T.teal}">${n}.</b> ${esc(w0)}</span>${rest.length ? ' ' + esc(rest.join(' ')) : ''}.</span>`; };
    const entry = (e) => `<div data-lcs-entry="${e.w}" data-lcs-pos="${e.pos}" data-lcs-nmean="${e.meanings.length}" data-lcs-read style="font:600 ${d.font}px/1.24 'Nunito',sans-serif;color:${T.ink}">` +
      `<b data-lcs-head style="font:800 ${d.font + 2.2}px/1.2 'Nunito',sans-serif">${esc(e.w)}</b> <i data-lcs-posmark style="color:${T.teal}">${e.pos}</i> ` +
      (e.meanings.length === 1 ? `<span data-lcs-mean="1">${esc(e.meanings[0])}.</span>` : e.meanings.map((m, i) => meanHtml(m, i + 1)).join(' ')) +
      (e.ex ? ` <i data-lcs-ex>${esc(e.ex)}</i>` : '') + `</div>`;
    const half = Math.ceil(es.length / 2);
    const col = (list) => `<div style="display:flex;flex-direction:column;gap:4px;min-width:0">${list.map(entry).join('')}</div>`;
    const guide = (which, w) => `<span style="display:flex;align-items:baseline;gap:6px"><span data-lcs-guidelabel style="font:700 12.5px/1 'Nunito',sans-serif;color:${T.inkSoft}">${which === 'first' ? esc(LINES.guideTop) : ''}</span><b data-lcs-guide="${which}" data-lcs-read style="font:800 18px/1.15 'Nunito',sans-serif;color:${T.teal}">${esc(w)}</b><span data-lcs-guidelabel style="font:700 12.5px/1 'Nunito',sans-serif;color:${T.inkSoft}">${which === 'last' ? esc(LINES.guideTop) : ''}</span></span>`;
    const dictBox = `<div data-lcs-dictpage style="display:flex;flex-direction:column;gap:4px;padding:4px 12px 7px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF">` +
      `<div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid ${T.ink};padding-bottom:2px">${guide('first', ws[0])}${guide('last', ws[ws.length - 1])}</div>` +
      `<div style="display:grid;grid-template-columns:1fr 1fr;column-gap:20px">${col(es.slice(0, half))}${col(es.slice(half))}</div></div>`;
    blocks.push(cream('data-lcs-task="dictpage"', dictBox, 5, 3));
    const q = (x, i) => {
      const w = `<b>${esc(x.probe || x.w)}</b>`;
      const text = x.kind === 'guide' ? `Which page is ${w} on?`
        : x.kind === 'meaning' ? `<i>${esc(x.sentence)}</i> Which meaning of ${w} is it?`
          : x.kind === 'spell' ? 'Which spelling is right?'
            : x.kind === 'pos' ? `What part of speech is ${w} on this page?`
              : x.kind === 'count' ? `How many meanings does this page give for ${w}?`
                : `Which word comes right after ${w} on this page?`;
      return `<div data-lcs-q="${x.kind}" data-lcs-qw="${esc(x.probe || x.w)}"${x.sentence ? ` data-lcs-sentence="${esc(x.sentence)}"` : ''} style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:2px 12px;padding:2px 8px;border-radius:10px;background:#FFFFFF">` +
        `<div data-lcs-qtext data-lcs-read style="flex:1 1 170px;font:600 ${d.qfont}px/1.3 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${text}</div>` +
        `<div data-lcs-opts style="flex:0 0 auto;display:flex;gap:6px;margin-left:auto">${x.opts.map((o) => pill(x.kind === 'meaning' ? 'meaning ' + o : String(o), String(o) === String(x.right), key, 15.5)).join('')}</div></div>`;
    };
    blocks.push(cream('data-lcs-task="questions"', label(LINES.dictQ) + `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:4px">${plan.qs.map(q).join('')}</div>`, 6, 4, grow(plan.qs.length)));
    if (plan.entry) {
      const x = plan.entry, [a, c] = neighbours(x.w, ws), gw = wordLineW(ws);
      const lab = (t) => `<span data-lcs-read style="flex:0 0 auto;width:120px;padding-bottom:5px;font:700 16px/1 'Nunito',sans-serif;color:${T.ink}">${esc(t)}</span>`;
      const grp = (t, o) => { const [l1, more] = linesFor(o); return `<div data-lcs-lines data-lcs-room="${o.room}" style="display:flex;flex-direction:column;gap:2px"><div style="display:flex;align-items:flex-end;gap:10px">${lab(t)}${l1}</div>${more}</div>`; };
      blocks.push(cream(`data-lcs-task="entry" data-lcs-newword="${x.w}"`, label(`${num(plan.qs.length + 1)}${LINES.entry} <b style="font-size:19px">${esc(x.w)}</b>`) +
        `<div style="display:flex;align-items:flex-end;gap:4px">${small(LINES.between)}${rule({ w: gw, answer: key ? a : null, room: a.length, min: WORDLINE })}${small(LINES.and)}${rule({ w: gw, answer: key ? c : null, room: c.length, min: WORDLINE })}</div>` +
        `<div style="display:flex;align-items:flex-end;gap:10px">${lab(LINES.pos)}${rule({ w: 220, answer: key ? x.pos : null, room: 9 })}</div>` +
        grp(LINES.meaning, { w1: inner - 130, wf: inner, room: x.meaning.length, answer: key ? 'Sample answer: ' + x.meaning : null, sample: true }) +
        grp(LINES.sentence, { w1: inner - 130, wf: inner, room: x.sentence.length, answer: key ? 'Sample answer: ' + x.sentence : null, sample: true, min: 2 }), 6, 3));
    }
  }

  if (mode === 'gloss') {
    const g = plan.g, glossOf = Object.fromEntries([...g.bold, ...g.extra].map((x) => [x.w, x.meaning])), gl = plan.glossWords;
    const paras = g.paras.map((text, pi) => `<p data-lcs-para="${pi}" data-lcs-read style="margin:0;text-indent:20px;font:600 ${d.font}px/1.42 'Nunito',sans-serif;color:${T.ink}">${marked(text, g.bold.filter((x) => x.p === pi).map((x) => [x.at[0], x.at[1], `<b data-lcs-bold="${x.w}" style="font-weight:900">`, '</b>']))}</p>`).join('');
    const glossary = `<div data-lcs-glossary style="display:flex;flex-direction:column;gap:4px;padding:5px 10px;border:2.5px solid ${T.ink};border-radius:6px;background:#FFFFFF">` +
      `<div data-lcs-read style="font:700 19px/1.1 'Baloo 2',cursive;color:${T.teal};text-align:center">${esc(LINES.glossTitle)}</div>` +
      gl.map((w) => `<div data-lcs-gentry="${w}" data-lcs-read style="font:600 14.4px/1.25 'Nunito',sans-serif;color:${T.ink}"><b data-lcs-ghead style="font-weight:900;font-size:15.5px">${esc(w)}</b> ${esc(glossOf[w])}</div>`).join('') + `</div>`;
    blocks.push(cream('data-lcs-task="text"', `<div style="display:grid;grid-template-columns:1.15fr 1fr;gap:12px;align-items:stretch">` +
      `<div style="display:flex;flex-direction:column;justify-content:flex-start;gap:5px;padding:6px 10px;border-radius:10px;background:#FFFFFF"><div data-lcs-title style="font:700 20px/1.1 'Baloo 2',cursive;color:${T.ink};text-align:center">${esc(g.title)}</div>${paras}</div>${glossary}</div>`, 7, 4));
    const ynRows = plan.yn.map((s, i) => `<div data-lcs-yn="${s.a}" data-lcs-text="${esc(s.text)}" data-lcs-about="${s.about}" style="display:flex;align-items:center;gap:12px;padding:1px 0 1px 4px">` +
      `<span data-lcs-read style="flex:1 1 auto;font:600 16.5px/1.3 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${esc(s.text)}</span>` +
      `<span data-lcs-opts style="flex:0 0 auto;display:inline-flex;gap:8px">${['yes', 'no'].map((a) => pill(a, a === s.a, key, 16.5)).join('')}</span></div>`).join('');
    blocks.push(cream('data-lcs-task="yesno"', label(LINES.yesno) + `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:3px">${ynRows}</div>`, 6, 4, grow(plan.yn.length)));
    const gw = wordLineW([...gl, ...plan.ins]);
    const insRows = plan.ins.map((w, i) => { const [a, c] = neighbours(w, gl); return `<div data-lcs-ins="${w}" style="display:flex;align-items:flex-end;gap:4px">` +
      `<span data-lcs-read style="flex:0 0 auto;width:${INSCOL}px;padding-bottom:5px;font:800 16px/1 'Nunito',sans-serif;color:${T.ink}">${num(i + 1)}${esc(w)}</span>` +
      rule({ w: gw, answer: key ? a : null, room: a.length, min: WORDLINE }) + small(LINES.and) + rule({ w: gw, answer: key ? c : null, room: c.length, min: WORDLINE }) + `</div>`; }).join('');
    blocks.push(cream('data-lcs-task="insert"', label(LINES.insert) + `<div data-lcs-rows style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:4px">${insRows}</div>`, 6, 4, grow(plan.ins.length)));
    if (plan.missing) {
      const x = g.bold.find((y) => y.w === plan.missing), [a, c] = neighbours(x.w, gl), gw2 = wordLineW([...gl, x.w]);
      const [l1, more] = linesFor({ w1: inner - 90, wf: inner, room: x.ctx.length, answer: key ? 'Sample answer: ' + x.ctx : null, sample: true });
      blocks.push(cream(`data-lcs-task="missing" data-lcs-miss="${x.w}"`, label(LINES.missing) +
        `<div style="display:flex;align-items:flex-end;gap:10px">${small(LINES.word, 16)}${rule({ w: gw2, answer: key ? x.w : null, room: x.w.length, min: WORDLINE })}</div>` +
        `<div data-lcs-lines data-lcs-room="${x.ctx.length}" style="display:flex;flex-direction:column;gap:2px"><div style="display:flex;align-items:flex-end;gap:10px">${small(LINES.itMeans)}${l1}</div>${more}</div>` +
        `<div style="display:flex;align-items:flex-end;gap:4px">${small(LINES.between)}${rule({ w: gw2, answer: key ? a : null, room: a.length, min: WORDLINE })}${small(LINES.and)}${rule({ w: gw2, answer: key ? c : null, room: c.length, min: WORDLINE })}</div>`, 6, 3));
    }
  }
  return blocks;
}

/** what verify() needs to know of the bank */
function infoOf() {
  const C = BANK.ctx;
  return {
    sent: Object.fromEntries([...C.sentences.choose.map((x) => ['choose', x]), ...C.sentences.write.map((x) => ['write', x])].map(([pool, x]) => [x.w, { pool, text: x.text, kind: x.kind, clue: x.clue, meaning: x.meaning, wrong: x.wrong || null }])),
    passages: Object.fromEntries([1, 2, 3].map((lv) => [lv, Object.fromEntries(C.passages[lv].map((p) => [p.id, { title: p.title, paras: p.paras, targets: p.targets.map((t) => ({ w: t.w, kind: t.kind, clue: t.clue, meaning: t.meaning, wrong: t.wrong || null })) }]))])),
    dict: Object.fromEntries(BANK.dict.pages.map((p) => [p.entries[0].w, { id: p.id, entries: p.entries.map((e) => ({ w: e.w, pos: e.pos, meanings: e.meanings, ex: e.ex, spell: e.spell, uses: e.uses })), news: p.news }])),
    words: BANK.dict.words,
    gloss: Object.fromEntries(BANK.gloss.texts.map((g) => [g.title, { id: g.id, paras: g.paras, bold: g.bold.map((x) => ({ w: x.w, form: x.form, meaning: x.meaning, ctx: x.ctx })), extra: g.extra, statements: g.statements, insert: g.insert }])),
  };
}

function makeWordMeaningsG3Type({ id, slug, mode, exerciseType, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error('word-meanings-g3: unknown mode ' + mode);
  const INFO = { ...infoOf(), instr: INSTR[mode], lines: LINES, kindText: KIND_TEXT, instrAll: INSTR };
  return {
    id, slug, gradeBand: 'G3', assetClass: 'none', exerciseType,
    themeAxis: { applicable: false },
    difficulty: D,
    i18n,

    build({ difficulty, locale }, ctx) {
      if (String(locale || 'en').slice(0, 2) !== 'en') throw new Error(`${id}: the words are English words (no ${locale} bank)`);
      const lv = Number(difficulty) || 2;
      const key = !!(ctx && ctx.answerKey);
      const plan = drawPage(BANK, mode, lv, ctx.rng, (ctx && ctx.variant) || 1);
      const blocks = renderPage(plan, key);
      const ids = mode === 'passage' ? ` data-lcs-pid="${plan.p.id}" data-lcs-asked="${plan.asked.join('|')}"` : '';
      return {
        bodyHtml: STYLE + `<div data-ws-content data-lcs-wm="${mode}|${lv}" data-lcs-noliga="1"${key ? ' data-lcs-iskey="1"' : ''}${ids} style="${LIGS}flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-height:0">` + fRoom(blocks.join('')) + `</div>`,
        meta: { text: mode + ':' + lv + ':' + plan.items.slice(0, 3).join(','), items: plan.items },
      };
    },

    async verify(page) {
      return page.evaluate((LEVELS, INFO, CFG) => {
        const fails = [];
        const root = document.querySelector('[data-lcs-wm]');
        if (!root) return ['no page'];
        const [mode, lvS] = root.dataset.lcsWm.split('|'), lv = +lvS, d = LEVELS[mode][lv];
        const isKey = root.dataset.lcsIskey === '1';
        const R = (e) => e.getBoundingClientRect();
        const cs = (e) => getComputedStyle(e);
        const fs = (e) => parseFloat(cs(e).fontSize);
        const straight = (s) => String(s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
        const txt = (e) => straight(e.textContent.replace(/\s+/g, ' ').trim());
        const flat = (s) => straight(String(s).replace(/\s+/g, ''));
        const toks = (t) => (straight(t).toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || []).map((w) => w.replace(/'s$/, ''));
        const stem = (w) => { w = String(w).toLowerCase(); return w.length > 4 ? w.replace(/(ing|ed|es|s)$/, '') : w; };
        const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
        const TEAL = 'rgb(20, 107, 94)';
        const rb = R(root);
        // letters: ligatures off, room after an f before i, f, l, t and a t before t
        if (cs(root).fontVariantLigatures !== 'none' || root.dataset.lcsNoliga !== '1') fails.push('the page does not turn ligatures off');
        if ([...root.querySelectorAll('*')].some((e) => !e.children.length && /f[iflt]|tt/.test(e.textContent) && cs(e).fontVariantLigatures !== 'none')) fails.push('a word with fi, fl, ff, ft, or tt joins its letters (ligatures on)');
        { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (/f[iflt]|tt/.test(n.textContent)) { fails.push('an f before i, f, l, or t or a t before t has no room of its own: "' + n.textContent.trim().slice(0, 20) + '"'); break; } }
        if ([...root.querySelectorAll('[data-lcs-fsep]')].some((e) => /flex|grid/.test(cs(e.parentElement).display))) fails.push('the letters of a line stand as boxes of a flex row: its spaces vanish');
        if (root.querySelectorAll('img').length) fails.push('a picture on a page without pictures');
        { const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
          while ((n = tw.nextNode())) { const pe = n.parentElement; if (!pe || /^(STYLE|SCRIPT|NOSCRIPT|TEMPLATE)$/.test(pe.tagName)) continue; if (/['"]/.test(n.textContent)) { fails.push('a printed text holds a straight apostrophe or quote: "' + n.textContent.trim().slice(0, 40) + '"'); break; } } }
        // the blocks: on the page, one below the other, nothing out of its card, 80 % of the body or more
        const blocks = [...root.children];
        blocks.forEach((b, i) => { const r = R(b); if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.bottom > rb.bottom + 1 || r.top < rb.top - 1) fails.push(`block ${i + 1} leaves the page`); if (i && r.top < R(blocks[i - 1]).bottom - 0.5) fails.push(`block ${i + 1} overlaps the one above`);
          b.querySelectorAll('span, div, p, b, i').forEach((e) => { const q = R(e); if (q.width && (q.bottom > r.bottom + 0.5 || q.right > r.right + 0.5 || q.left < r.left - 0.5 || q.top < r.top - 0.5)) fails.push('something leaves its card'); }); });
        const used = blocks.reduce((s, b) => s + R(b).height, 0);
        if (used < rb.height * 0.8) fails.push(`the blocks fill ${Math.round(100 * used / rb.height)} % of the page body`);
        const kinds = blocks.map((b) => b.dataset.lcsTask).join();
        // what a level holds is fixed by its number (a changed level table cannot pass its own check)
        const wantKinds = mode === 'kinds' ? 'legend,kinds' : mode === 'passage' ? 'text,items' : mode === 'dict' ? 'dictpage,questions' + (lv === 3 ? ',entry' : '') : 'text,yesno,insert' + (d.missing ? ',missing' : '');
        if (kinds !== wantKinds) fails.push(`the tasks are ${kinds}, not ${wantKinds}`);
        // sizes
        root.querySelectorAll('[data-lcs-lines]').forEach((g) => { const ls = [...g.querySelectorAll('[data-lcs-line]')], sum = ls.reduce((t, l) => t + R(l).width, 0); if (!ls.length || sum < (+g.dataset.lcsRoom) * CFG.HAND - 0.5) fails.push(`lines of ${Math.round(sum)} px in all have no room for a third grader to write ${g.dataset.lcsRoom} letters`); });
        root.querySelectorAll('[data-lcs-min]').forEach((l) => { if (R(l).width < 250 - 0.5) fails.push(`a line for a word is ${Math.round(R(l).width)} px, not 250 or more`); });
        { const n = (sel) => root.querySelectorAll(sel).length; if ([...root.querySelectorAll('[data-lcs-ins] [data-lcs-line]')].some((l) => !l.dataset.lcsMin) || (n('[data-lcs-task="missing"]') && n('[data-lcs-task="missing"] [data-lcs-min]') !== 3) || (n('[data-lcs-task="entry"]') && n('[data-lcs-task="entry"] [data-lcs-min]') !== 2)) fails.push('a line for a word has no width of its own (250 px)'); }
        root.querySelectorAll('[data-lcs-line]').forEach((l) => { if (R(l).height < CFG.ROWH - 0.5) fails.push(`a writing line lower than ${CFG.ROWH} px`); if (R(l).width < (+l.dataset.lcsRoom) * CFG.HAND - 0.5) fails.push(`a writing line of ${Math.round(R(l).width)} px has no room for a third grader to write ${l.dataset.lcsRoom} letters`); });
        root.querySelectorAll('[data-lcs-read]').forEach((e) => { if (fs(e) < 14.2) fails.push('text a third grader reads is smaller than 14.2 px'); });
        root.querySelectorAll('[data-lcs-pill]').forEach((e) => { if (fs(e) < 15.5) fails.push('a word to circle is smaller than 15.5 px'); });
        root.querySelectorAll('[data-lcs-label]').forEach((e) => { if (fs(e) < 16) fails.push('a task line is smaller than 16 px'); });
        root.querySelectorAll('[data-lcs-markbox]').forEach((e) => { if (R(e).width < CFG.MARKBOX - 0.5 || R(e).height < CFG.MARKBOX - 0.5) fails.push(`a box for a letter is smaller than ${CFG.MARKBOX} px`); });
        // no blank band higher than BAND px between the tasks or inside one
        { const ink = [];
          const visible = (e) => { const s = cs(e); return s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity !== 0; };
          const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
          while ((n = tw.nextNode())) { if (!n.textContent.trim() || !visible(n.parentElement)) continue; const rg = document.createRange(); rg.selectNodeContents(n); [...rg.getClientRects()].forEach((q) => q.height && ink.push([q.top, q.bottom])); }
          root.querySelectorAll('*').forEach((e) => { if (!visible(e)) return; const s = cs(e), q = R(e); if (!q.height) return;
            const border = ['Top', 'Right', 'Bottom', 'Left'].some((sd) => parseFloat(s['border' + sd + 'Width']) > 0 && s['border' + sd + 'Style'] !== 'none' && !/rgba\(0, 0, 0, 0\)|transparent/.test(s['border' + sd + 'Color']));
            const fill = !/rgba\(0, 0, 0, 0\)|transparent/.test(s.backgroundColor) && s.backgroundColor !== cs(e.closest('[data-lcs-task]') || root).backgroundColor;
            if (border || fill) ink.push([q.top, q.bottom]); });
          ink.sort((a, c) => a[0] - c[0]);
          let reach = rb.top, worst = 0, at = 0;
          for (const [t, bt] of ink) { if (t - reach > worst) { worst = t - reach; at = reach; } reach = Math.max(reach, bt); }
          if (rb.bottom - reach > worst) { worst = rb.bottom - reach; at = reach; }
          if (worst > CFG.BAND) fails.push(`a blank band of ${Math.round(worst)} px ${Math.round(at - rb.top)} px below the top of the page body (most ${CFG.BAND})`); }
        // the key: its words stand whole on their lines, at the key's size (samples may be smaller)
        root.querySelectorAll('[data-lcs-keytext]').forEach((k) => { const l = k.closest('[data-lcs-line]'); if (R(k).right > R(l).right - 3 || (!l.dataset.lcsKeySample && fs(k) < 18.5) || fs(k) < 12) fails.push(`the key's answer "${txt(k)}" is wider than its line, or shrunk to fit it`); });
        root.querySelectorAll('[data-lcs-line]').forEach((l) => { const k = l.querySelector('[data-lcs-keytext]'); if (!isKey && (k || l.dataset.lcsAnswer)) fails.push('a writing line of the child\'s page holds an answer'); if (isKey && !k && l.dataset.lcsMore === undefined) fails.push('a line of the key is empty'); if (l.dataset.lcsMore !== undefined && (!l.closest('[data-lcs-lines]') || l.closest('[data-lcs-lines]').querySelector('[data-lcs-line]') === l)) fails.push('a line left empty in the key is not a further line of a written answer'); if (k && txt(k) !== straight(l.dataset.lcsAnswer)) fails.push('a key line does not write its answer'); if (k && l.dataset.lcsKeySample && !/^Sample answer: /.test(txt(k))) fails.push('a key line of the child\'s own words is not marked as a sample'); });
        root.querySelectorAll('[data-lcs-pill]').forEach((p) => { const ringed = cs(p).borderTopColor === TEAL; if (isKey ? ringed !== !!p.dataset.lcsOk : ringed) fails.push('a choice is ringed on the page of the child, or the key rings the wrong one'); });
        root.querySelectorAll('[data-lcs-markbox]').forEach((q) => { if (isKey ? txt(q) !== q.dataset.lcsWant : txt(q)) fails.push('a box is filled on the page of the child, or the key does not fill it'); });
        root.querySelectorAll('[data-lcs-clue]').forEach((c) => { const u = /inset/.test(cs(c).boxShadow); if (u !== isKey) fails.push('a clue is underlined on the page of the child, or the key does not underline it'); });
        const instr = document.querySelector('[data-lcs-instruction]');
        if (!instr) fails.push('no instruction at the top of the page');
        else if (txt(instr) !== INFO.instr[lv]) fails.push(`the instruction is not the one of level ${lv}: "${txt(instr)}"`);
        const checkPlaces = (ps, m, what) => { if (ps.length >= 2 && new Set(ps).size < Math.min(ps.length, m)) fails.push(`the right ${what} stands in one place every time`); if (ps.length >= 4 && Math.max(...Array.from({ length: m }, (_, k) => ps.filter((x) => x === k).length)) > Math.ceil((m === 2 ? 0.6 : 0.5) * ps.length)) fails.push(`the right ${what} stands in one place too often`); if (ps.length >= 3 && (ps.every((x, i) => !i || x === ps[i - 1] + 1) || ps.every((x, i) => !i || x === ps[i - 1] - 1))) fails.push(`the right ${what} stands in a staircase`);
          if (m === 2 && ps.length >= 3 && ps.every((x, i) => !i || x !== ps[i - 1])) fails.push(`the right ${what} stands every other time in the other place`); if (ps.some((x, i) => i >= 2 && x === ps[i - 1] && x === ps[i - 2])) fails.push(`the right ${what} stands three times in a row in one place`); };
        const pillsOf = (e) => [...e.querySelectorAll('[data-lcs-pill]')];
        const okIndex = (e) => pillsOf(e).findIndex((p) => p.dataset.lcsOk);
        const lengthCheck = (rows) => { const n = rows.length; let lo = 0, so = 0; rows.forEach((ps) => { const ls = ps.map((p) => p.dataset.lcsWord.length), r = ps.findIndex((p) => p.dataset.lcsOk); if (ls.every((l, i) => i === r || l < ls[r])) lo++; if (ls.every((l, i) => i === r || l > ls[r])) so++; }); if (lo > Math.floor(n / 2) || so > Math.floor(n / 2)) fails.push(`the right meaning is the longest ${lo} times or the shortest ${so} times of ${n}: length gives it away`); };
        const kindOrder = (ks) => { if (ks.some((x, i) => i >= 2 && x === ks[i - 1] && x === ks[i - 2])) fails.push('three clues of one kind stand in a row'); if (new Set(ks).size === 2 && ks.length >= 3 && ks.every((x, i) => !i || x !== ks[i - 1])) fails.push('the two kinds of clue take turns all the way'); };
        // what the page prints outside a task (instruction, task lines, the key to the letters)
        const chrome = [instr ? txt(instr) : '', ...[...root.querySelectorAll('[data-lcs-label], [data-lcs-legend]')].map(txt)].join(' ');

        if (mode === 'kinds') {
          const cards = [...root.querySelectorAll('[data-lcs-card]')];
          if (cards.length !== d.n) fails.push(`${cards.length} sentences, not ${d.n}`);
          const ks = [], pl = [], prows = [];
          const legendKinds = [...root.querySelectorAll('[data-lcs-kindkey]')].map((e) => e.dataset.lcsKindkey).join('');
          if (legendKinds !== d.kinds.join('')) fails.push(`the key to the letters shows ${legendKinds}, not the kinds of the level`);
          [...root.querySelectorAll('[data-lcs-kindkey]')].forEach((e) => { if (txt(e) !== e.dataset.lcsKindkey + ' ' + INFO.kindText[e.dataset.lcsKindkey]) fails.push('a line of the key to the letters is not its own'); });
          cards.forEach((c) => {
            const w = c.dataset.lcsCard, x = INFO.sent[w];
            if (!x || x.pool !== d.pool || !d.kinds.includes(x.kind)) { fails.push(`"${w}" is no sentence of this level`); return; }
            if (flat(txt(c.querySelector('[data-lcs-sent]')).replace(/^\d+\./, '')) !== flat(x.text)) fails.push(`"${x.text}" is not printed as the bank has it`);
            const bold = [...c.querySelectorAll('[data-lcs-target]')], clue = [...c.querySelectorAll('[data-lcs-clue]')];
            if (bold.length !== 1 || txt(bold[0]) !== w || cs(bold[0]).fontWeight < 800) fails.push(`"${w}" is not bold once in its sentence`);
            if (clue.length !== 1 || txt(clue[0]) !== straight(x.clue)) fails.push(`the clue of "${w}" is not marked`);
            const box = c.querySelector('[data-lcs-markbox]');
            if (!box || box.dataset.lcsWant !== x.kind) fails.push(`the box of "${w}" does not want its kind`);
            ks.push(x.kind);
            if (d.pool === 'choose') {
              const ps = pillsOf(c), want = [x.meaning, ...x.wrong].sort().join('|');
              if (ps.length !== 3 || ps.map((p) => straight(p.dataset.lcsWord)).sort().join('|') !== want || ps.filter((p) => p.dataset.lcsOk).length !== 1 || straight(ps[okIndex(c)].dataset.lcsWord) !== x.meaning) fails.push(`the meanings of "${w}" are not its own three, or the right one is not marked`);
              pl.push(okIndex(c)); prows.push(ps);
            } else { const g = c.querySelector('[data-lcs-lines]'); if (!g || +g.dataset.lcsRoom !== Math.max(x.meaning.length, x.clue.length)) fails.push(`"${w}" has no lines for its meaning and its clue`); }
            // the clue word is printed nowhere else on the page
            const elsewhere = [chrome, ...cards.filter((o) => o !== c).map(txt)].join(' ');
            if (toks(elsewhere).some((t) => stem(t) === stem(w))) fails.push(`"${w}" is also printed elsewhere on the page`);
          });
          d.kinds.forEach((k) => { const n = ks.filter((x) => x === k).length; if (d.per ? n !== d.per : n < 1 || n > 2) fails.push(`${n} clues of the kind ${k}`); });
          kindOrder(ks);
          if (pl.length) { checkPlaces(pl, 3, 'meaning'); lengthCheck(prows); }
        }

        if (mode === 'passage') {
          const P = INFO.passages[lv][root.dataset.lcsPid];
          if (!P) return ['the passage is no passage of this level'];
          const asked = root.dataset.lcsAsked.split('|'), tw = P.targets.map((t) => t.w);
          const idx = asked.map((w) => tw.indexOf(w));
          const omitted = tw.map((_, i) => i).filter((i) => !idx.includes(i));
          if (asked.length !== d.ask || idx.some((i) => i < 0) || omitted.length !== 2 || (lv > 1 && P.targets[omitted[0]].kind === P.targets[omitted[1]].kind)) fails.push('the bold words are not the passage\'s words but two (of two kinds on levels 2 and 3)');
          const paras = [...root.querySelectorAll('[data-lcs-para]')];
          if (paras.length !== P.paras.length || paras.some((p, i) => flat(txt(p)) !== flat(P.paras[i]))) fails.push('the passage is not printed as the bank has it');
          if (txt(root.querySelector('[data-lcs-title]')) !== straight(P.title)) fails.push('the title is not the passage\'s');
          const bold = [...root.querySelectorAll('[data-lcs-passage] b[data-lcs-target]')];
          if (bold.map((b) => txt(b)).join('|') !== asked.join('|')) fails.push('the bold words of the passage are not the words asked, in order');
          if ([...root.querySelectorAll('[data-lcs-passage] b, [data-lcs-passage] strong')].length !== bold.length) fails.push('a word of the passage is bold that is not asked');
          const clues = [...root.querySelectorAll('[data-lcs-clue]')];
          asked.forEach((w) => { const t = P.targets.find((x) => x.w === w), c = clues.filter((x) => x.dataset.lcsClue === w); if (c.length !== 1 || txt(c[0]) !== straight(t.clue)) fails.push(`the clue of "${w}" is not marked`); });
          // each asked word stands once in the passage and nowhere else on the page
          const ptext = paras.map(txt).join(' ');
          asked.forEach((w) => { if (toks(ptext).filter((t) => stem(t) === stem(w)).length !== 1) fails.push(`"${w}" stands more than once in the passage`); if (toks(chrome).some((t) => stem(t) === stem(w))) fails.push(`"${w}" is printed in a task line or the instruction`); });
          const items = [...root.querySelectorAll('[data-lcs-item]')];
          if (items.map((e) => e.dataset.lcsItem).join('|') !== asked.join('|')) fails.push('the items are not the bold words in the order of the passage');
          const pl = [], prows = [], ks = [];
          items.forEach((e) => {
            const w = e.dataset.lcsItem, t = P.targets.find((x) => x.w === w);
            if (!t) return;
            if (d.answer === 'choose') { const ps = pillsOf(e), want = [t.meaning, ...t.wrong].sort().join('|'); if (ps.length !== 3 || ps.map((p) => straight(p.dataset.lcsWord)).sort().join('|') !== want || ps.filter((p) => p.dataset.lcsOk).length !== 1 || straight(ps[okIndex(e)].dataset.lcsWord) !== t.meaning) fails.push(`the meanings of "${w}" are not its own three, or the right one is not marked`); pl.push(okIndex(e)); prows.push(ps); }
            else { const g = e.dataset.lcsLines !== undefined ? e : null; if (!g || +g.dataset.lcsRoom !== Math.max(t.meaning.length, t.clue.length)) fails.push(`"${w}" has no lines for its meaning and its clue`); }
            if (d.answer === 'kind') { const box = e.querySelector('[data-lcs-markbox]'); if (!box || box.dataset.lcsWant !== t.kind) fails.push(`the box of "${w}" does not want its kind`); ks.push(t.kind); }
            else if (e.querySelector('[data-lcs-markbox]')) fails.push('a box for a kind on a level that does not name kinds');
            if (lv < 3 && (lv === 1 ? t.kind !== 'D' : !['E', 'A'].includes(t.kind))) fails.push(`"${w}" has a clue of a kind its level does not teach`);
          });
          if (pl.length) { checkPlaces(pl, 3, 'meaning'); lengthCheck(prows); }
          if (ks.length) { if (new Set(ks).size < 4) fails.push('a kind of clue is missing on a page that names the kinds'); kindOrder(ks); }
          if (lv === 2) { const e = items.filter((x) => (P.targets.find((t) => t.w === x.dataset.lcsItem) || {}).kind === 'E').length; if (e !== 3) fails.push(`${e} example clues and ${items.length - e} antonym clues, not three of each`); }
        }

        if (mode === 'dict') {
          const entries = [...root.querySelectorAll('[data-lcs-entry]')], ws = entries.map((e) => e.dataset.lcsEntry);
          const B = INFO.dict[ws[0]];
          if (!B) return ['the dictionary page is no page of the bank'];
          if (ws.join('|') !== B.entries.map((e) => e.w).join('|')) fails.push('the entries are not the page\'s');
          ws.forEach((w, i) => { if (i && cmp(ws[i - 1], w) >= 0) fails.push(`"${w}" is not in ABC order`); });
          entries.forEach((e, i) => { const x = B.entries[i]; if (!x) return; const want = x.w + ' ' + x.pos + ' ' + (x.meanings.length === 1 ? x.meanings[0] + '.' : x.meanings.map((m, k) => (k + 1) + '. ' + m + '.').join(' ')) + (x.ex ? ' ' + x.ex : ''); if (flat(txt(e)) !== flat(want)) fails.push(`the entry "${x.w}" is not printed as the bank has it`); if (e.dataset.lcsPos !== x.pos || +e.dataset.lcsNmean !== x.meanings.length) fails.push(`the entry "${x.w}" carries the wrong marks`); });
          root.querySelectorAll('[data-lcs-numhead]').forEach((e) => { if (cs(e).whiteSpace !== 'nowrap' || new Set([...e.getClientRects()].map((q) => Math.round(q.bottom))).size !== 1) fails.push('the number of a meaning can stand alone at the end of a line'); });
          entries.forEach((e) => { if (+e.dataset.lcsNmean === 2 && e.querySelectorAll('[data-lcs-numhead]').length !== 2) fails.push(`the numbers of "${e.dataset.lcsEntry}" are not kept with their meanings`); });
          const g1 = root.querySelector('[data-lcs-guide="first"]'), g2 = root.querySelector('[data-lcs-guide="last"]');
          if (!g1 || !g2 || txt(g1) !== ws[0] || txt(g2) !== ws[ws.length - 1]) fails.push('the guide words are not the first and last entries');
          if (g1 && g2 && R(g2).left < R(g1).right) fails.push('the guide words do not stand at the two corners');
          const qs = [...root.querySelectorAll('[data-lcs-q]')];
          const want = d.tasks.flatMap(([k, n]) => Array(n).fill(k)).join();
          if (qs.map((q) => q.dataset.lcsQ).join() !== want) fails.push(`the questions are ${qs.map((q) => q.dataset.lcsQ).join()}, not ${want}`);
          const dictText = txt(root.querySelector('[data-lcs-dictpage]'));
          const three = [], senses = [];
          qs.forEach((q) => {
            const k = q.dataset.lcsQ, w = q.dataset.lcsQw, ps = pillsOf(q), ok = ps.filter((p) => p.dataset.lcsOk);
            if (ok.length !== 1) { fails.push(`question "${w}" has not one marked answer`); return; }
            const right = straight(ok[0].dataset.lcsWord);
            if (k === 'guide') {
              const pairs = ps.map((p) => straight(p.dataset.lcsWord).split(' – '));
              const holds = pairs.map(([a, c]) => cmp(a, w) < 0 && cmp(w, c) < 0);
              if (pairs.some((p) => p.length !== 2 || cmp(p[0], p[1]) >= 0)) fails.push(`a pair of guide words for "${w}" is not in ABC order`);
              if (holds.filter(Boolean).length !== 1 || !holds[ps.indexOf(ok[0])]) fails.push(`the guide words of "${w}" are not one pair, or the key marks another`);
              // pages of a dictionary never overlap
              const sorted = pairs.slice().sort((a, c) => cmp(a[0], c[0]));
              if (sorted.some((p, i) => i && cmp(sorted[i - 1][1], p[0]) >= 0)) fails.push(`the pages of the guide words for "${w}" overlap`);
              const letters = pairs.flat().map((x) => x[0]);
              if (lv === 1) { if (new Set(pairs.map((p) => p[0][0])).size !== 3 || pairs.some((p) => p[0][0] !== p[1][0]) || pairs.filter((p) => p[0][0] === w[0]).length !== 1) fails.push(`on level 1 the first letter of "${w}" does not decide its page`); }
              else { if (letters.some((l) => l !== w[0])) fails.push(`on level ${lv} the guide words for "${w}" do not all share its first letter`); }
              if (lv === 3) { const at = ps.indexOf(ok[0]), near = [...pairs[at], ...(pairs[at - 1] ? [pairs[at - 1][1]] : []), ...(pairs[at + 1] ? [pairs[at + 1][0]] : [])]; const sortedAt = sorted.findIndex((p) => p === pairs[at]); const nb = [...pairs[at], ...(sorted[sortedAt - 1] ? [sorted[sortedAt - 1][1]] : []), ...(sorted[sortedAt + 1] ? [sorted[sortedAt + 1][0]] : [])]; if (!nb.some((x) => { let i = 0; while (i < x.length && i < w.length && x[i] === w[i]) i++; return i >= 2; }) || !near.length) fails.push(`on level 3 the third letter does not decide the page of "${w}"`); }
              if (toks(dictText).includes(w) || ws.includes(w)) fails.push(`"${w}" is printed on the dictionary page`);
              three.push(ps.indexOf(ok[0]));
            } else {
              const ei = ws.indexOf(w), e = entries[ei], x = B.entries[ei];
              if (ei < 0) { fails.push(`"${w}" of a question is no entry of the page`); return; }
              if (k === 'meaning') { const s = straight(q.dataset.lcsSentence), u = (x.uses || []).find((y) => y[0] === s); if (+e.dataset.lcsNmean !== 2 || !u || right !== 'meaning ' + u[1] || ps.map((p) => p.dataset.lcsWord).join() !== 'meaning 1,meaning 2') fails.push(`the meaning of "${w}" in "${s}" is not the one the key marks`); senses.push(u ? u[1] : 0); }
              if (k === 'spell') { const onPage = ps.filter((p) => ws.includes(p.dataset.lcsWord)); if (ps.length !== 3 || onPage.length !== 1 || onPage[0] !== ok[0] || right !== w) fails.push(`the spellings of "${w}" are not one word of the page and two others`); three.push(ps.indexOf(ok[0])); }
              if (k === 'pos') { if (right !== e.dataset.lcsPos || ps.map((p) => p.dataset.lcsWord).join() !== 'noun,verb,adjective') fails.push(`the part of speech of "${w}" is not the one its entry prints`); }
              if (k === 'count') { if (right !== String(e.querySelectorAll('[data-lcs-mean]').length)) fails.push(`the number of meanings of "${w}" is not the one its entry prints`); }
              if (k === 'after') { if (right !== ws[ei + 1] || ps.length !== 3 || ps.some((p) => !ws.includes(p.dataset.lcsWord))) fails.push(`the word after "${w}" is not the next entry, or a choice is no entry`); three.push(ps.indexOf(ok[0])); }
            }
          });
          checkPlaces(three, 3, 'answer');
          qs.filter((q) => q.dataset.lcsQ === 'spell').forEach((q) => { const ps = pillsOf(q), r = ps.find((p) => p.dataset.lcsOk), L = r ? r.dataset.lcsWord.length : 0, o = ps.filter((p) => p !== r).map((p) => p.dataset.lcsWord.length); if (r && (o.every((l) => l > L) || o.every((l) => l < L))) fails.push(`the right spelling "${r.dataset.lcsWord}" is the only shortest or the only longest of its three`); });
          if (lv === 3) {
            const eb = root.querySelector('[data-lcs-task="entry"]'), nw = eb && eb.dataset.lcsNewword;
            const nx = nw && B.news.find((x) => x.w === nw);
            if (!nx || !(cmp(ws[0], nw) < 0 && cmp(nw, ws[ws.length - 1]) < 0) || ws.includes(nw)) fails.push(`the new word "${nw}" does not belong on the page`);
            else {
              const i = ws.findIndex((x) => cmp(nw, x) < 0), lines = [...eb.querySelectorAll('[data-lcs-line]')];
              if (isKey && (straight(lines[0].dataset.lcsAnswer) !== ws[i - 1] || straight(lines[1].dataset.lcsAnswer) !== ws[i] || lines[2].dataset.lcsAnswer !== nx.pos)) fails.push(`the key does not say that "${nw}" goes between ${ws[i - 1]} and ${ws[i]}, or its part of speech`);
              { const gs = [...eb.querySelectorAll('[data-lcs-lines]')]; if (gs.length !== 2 || gs[1].querySelectorAll('[data-lcs-line]').length < 2) fails.push('the Sentence of the entry has fewer than two lines'); }
              const others = [...root.querySelectorAll('[data-lcs-dictpage], [data-lcs-q]')].map(txt).join(' ') + ' ' + (instr ? txt(instr) : '');
              if (toks(others).includes(nw)) fails.push(`the new word "${nw}" is printed elsewhere on the page`);
            }
          }
        }

        if (mode === 'gloss') {
          const G = INFO.gloss[txt(root.querySelector('[data-lcs-title]'))];
          if (!G) return ['the text is no glossary text of the bank'];
          const paras = [...root.querySelectorAll('[data-lcs-para]')];
          if (paras.length !== G.paras.length || paras.some((p, i) => flat(txt(p)) !== flat(G.paras[i]))) fails.push('the text is not printed as the bank has it');
          const bold = [...root.querySelectorAll('[data-lcs-bold]')];
          if (bold.map((b) => txt(b)).join('|') !== G.bold.map((x) => x.form).join('|')) fails.push('the bold words are not the text\'s');
          const gw = [...root.querySelectorAll('[data-lcs-gentry]')].map((e) => e.dataset.lcsGentry);
          gw.forEach((w, i) => { if (i && cmp(gw[i - 1], w) >= 0) fails.push(`the glossary is not in ABC order at "${w}"`); });
          const all = [...G.bold, ...G.extra];
          [...root.querySelectorAll('[data-lcs-gentry]')].forEach((e) => { const x = all.find((y) => y.w === e.dataset.lcsGentry); if (!x || flat(txt(e)) !== flat(x.w + ' ' + x.meaning)) fails.push(`the glossary entry "${e.dataset.lcsGentry}" is not the bank's`); });
          const miss = G.bold.map((x) => x.w).filter((w) => !gw.includes(w));
          const extraOn = G.extra.map((x) => x.w).filter((w) => gw.includes(w));
          if (lv >= 2 ? extraOn.length !== 2 : extraOn.length) fails.push(`the glossary holds ${extraOn.length} words from other pages of the book`);
          if (miss.length !== (lv === 3 ? 1 : 0)) fails.push(`${miss.length} bold words are missing from the glossary`);
          if (lv === 1 && new Set(gw.map((w) => w[0])).size !== gw.length) fails.push('on level 1 two glossary words share a first letter');
          if (lv >= 2 && !gw.some((w, i) => i && w[0] === gw[i - 1][0])) fails.push(`on level ${lv} no two glossary words share a first letter`);
          const yn = [...root.querySelectorAll('[data-lcs-yn]')];
          if (yn.length !== d.yn) fails.push(`${yn.length} yes/no sentences, not ${d.yn}`);
          const pl = [];
          yn.forEach((e) => { const s = G.statements.find((x) => x.text === straight(e.dataset.lcsText)); if (!s || !gw.includes(s.about)) { fails.push(`"${e.dataset.lcsText}" is no sentence about a word of this glossary`); return; } if (flat(txt(e)).replace(/^\d+\./, '') !== flat(s.text + 'yesno')) fails.push(`"${s.text}" is not printed as the bank has it`); const ok = pillsOf(e).find((p) => p.dataset.lcsOk); if (!ok || ok.dataset.lcsWord !== s.a) fails.push(`the key of "${s.text}" is not ${s.a}`); pl.push(s.a === 'yes' ? 0 : 1); });
          if (new Set(yn.map((e) => e.dataset.lcsAbout)).size !== yn.length) fails.push('two yes/no sentences ask about one word');
          checkPlaces(pl, 2, 'answer (yes or no)');
          const ins = [...root.querySelectorAll('[data-lcs-ins]')];
          if (ins.length !== d.ins) fails.push(`${ins.length} new words, not ${d.ins}`);
          const gaps = [];
          ins.forEach((e) => { const w = e.dataset.lcsIns, i = gw.findIndex((x) => cmp(w, x) < 0); if (gw.includes(w) || i <= 0) { fails.push(`"${w}" does not go between two glossary words`); return; } const a = gw[i - 1], c = gw[i]; gaps.push(i);
            const byFirst = a[0] !== w[0] && c[0] !== w[0]; if (lv === 1 ? !byFirst : byFirst) fails.push(`"${w}" is placed by ${byFirst ? 'its first letter' : 'a later letter'} on level ${lv}`);
            if (G.insert.indexOf(w) < 0) fails.push(`"${w}" is no new word of the text`);
            const ls = [...e.querySelectorAll('[data-lcs-line]')]; if (ls.length !== 2 || (isKey && (straight(ls[0].dataset.lcsAnswer) !== a || straight(ls[1].dataset.lcsAnswer) !== c))) fails.push(`the key does not say that "${w}" goes between ${a} and ${c}`); });
          if (new Set(gaps).size !== gaps.length) fails.push('two new words go in one gap');
          if (gaps.length >= 3 && (gaps.every((x, i) => !i || x > gaps[i - 1]) || gaps.every((x, i) => !i || x < gaps[i - 1]))) fails.push('the new words go in the order of the glossary');
          if (lv === 3) { const mb = root.querySelector('[data-lcs-task="missing"]'); const w = mb && mb.dataset.lcsMiss; if (!w || w !== miss[0]) fails.push('the missing word is not the bold word left out of the glossary'); else { const ls = [...mb.querySelectorAll('[data-lcs-line]')], i = gw.findIndex((x) => cmp(w, x) < 0); const x = G.bold.find((y) => y.w === w); if (!x.ctx) fails.push(`the text does not explain the missing word "${w}"`); const k = ls.length; if (k < 4 || !ls[1].dataset.lcsKeySample !== !isKey || (isKey && (straight(ls[0].dataset.lcsAnswer) !== w || straight(ls[k - 2].dataset.lcsAnswer) !== gw[i - 1] || straight(ls[k - 1].dataset.lcsAnswer) !== gw[i]))) fails.push(`the key of the missing word "${w}" is not the word and its neighbours`); if (i <= 0) fails.push(`the missing word "${w}" does not go between two glossary words`); if (toks(chrome).includes(w)) fails.push(`the missing word "${w}" is printed in a task line`); } }
        }
        return [...new Set(fails)];
      }, LEVELS, INFO, { ROWH, MARKBOX, BAND, HAND });
    },
  };
}

module.exports = { makeWordMeaningsG3Type, faultsOf, drawPage, LEVELS, INSTR, LINES, KIND_TEXT, insertKind };
