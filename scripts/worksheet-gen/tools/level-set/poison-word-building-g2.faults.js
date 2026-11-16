/**
 * The planted faults of poison-word-building-g2.js (types/_shared/word-building-g2.js and
 * data/literacy/word-building-g2.en.json): [name, file, text to find, its replacement, type, level]. Every text must
 * stand in its file exactly once (bank: at least once; the first one is changed); the poison script refuses to run
 * otherwise, so a changed factory cannot pass with a stale list. Each fault is rendered as a page AND as its answer key.
 */
'use strict';
module.exports = (FACTORY, BANK) => {
const FIX = (() => {
  const t = require('fs').readFileSync(BANK, 'utf8').replace(/\r\n/g, '\n'), fix = JSON.parse(t).apostrophe.fix;
  const ind = (a) => JSON.stringify(a, null, 1).split('\n').map((l, i) => (i ? '  ' + l : l)).join('\n');
  const first = (x) => (x.text.match(/[A-Za-z']+/g) || [])[0] === x.wrong;
  const out = fix.slice(); let n = 0;
  for (let i = out.length - 1; i >= 0 && n < 5; i--) { if (first(out[i])) continue; const twin = fix.find((y) => first(y) && y.kind === out[i].kind); if (!twin) continue; out[i] = twin; n++; }
  return { find: '"fix": ' + ind(fix), repl: '"fix": ' + ind(out) };
})();
return [
  // shared: the page, the rows, the gaps, the matching, the choices
  ['ligatures left on', FACTORY, 'data-lcs-noliga="1"${key', 'data-lcs-nolig="1"${key', 'G2-536', 2],
  ['an f with no room before i ("fits")', FACTORY, 'text.replace(/f(?=[ifl])/g,', 'text.replace(/q(?=[ifl])/g,', 'G2-535', 1],
  ['writing rows of 60 px', FACTORY, 'const base = rowSvg(w, ROW);', 'const base = rowSvg(w, 60);', 'G2-537', 1],
  ['rows to write on a third as wide', FACTORY, 'const cellW = (cols, gap = 12) => Math.floor((W - 24 - gap * (cols - 1)) / cols);', 'const cellW = (cols, gap = 12) => Math.floor((W - 24 - gap * (cols - 1)) / cols / 3);', 'G2-537', 2],
  ['cards cut short (the blocks fill too little and their content leaves them)', FACTORY, 'padding:${pad}px 12px;border-radius:14px', 'padding:${pad}px 12px;max-height:90px;overflow:hidden;border-radius:14px', 'G2-536', 1],
  ['a gap filled on the page of the child', FACTORY, "${key ? g : ''}</span>", '${g}</span>', 'G2-535', 2],
  ['the key leaves the gaps empty', FACTORY, "${key ? g : ''}</span>", "${''}</span>", 'G2-536', 3],
  ['each gap as wide as its own answer (the width tells the answer)', FACTORY, 'gapWord(r.full, r.at, r.g, key, d.gfont + 3, width, tail)', 'gapWord(r.full, r.at, r.g, key, d.gfont + 3, GAPW[r.g.length], tail)', 'G2-535', 3],
  ['a period apart from its gap', FACTORY, '${core}<span data-lcs-tail>', '${core}<span data-lcs-tail style="margin-left:10px">', 'G2-536', 2],
  ['the gaps take other prefixes than the level (the named letters)', FACTORY, "M[p + b] }))), 'Read each word. Draw a line to its meaning.', d.mword, d.mmean));\n          blocks.push(gapBlock(3, gaps.map(rowOf), kinds, `Read each sentence. Write ${orList(kinds)}", "M[p + b] }))), 'Read each word. Draw a line to its meaning.', d.mword, d.mmean));\n          blocks.push(gapBlock(3, gaps.map(rowOf), ['un', 'pre'], `Read each sentence. Write ${orList(kinds)}", 'G2-535', 2],
  ['the task line names other letters than the gaps take', FACTORY, "M[p + b] }))), 'Read each word. Draw a line to its meaning.', d.mword, d.mmean));\n          blocks.push(gapBlock(3, gaps.map(rowOf), kinds, `Read each sentence. Write ${orList(kinds)}", "M[p + b] }))), 'Read each word. Draw a line to its meaning.', d.mword, d.mmean));\n          blocks.push(gapBlock(3, gaps.map(rowOf), kinds, `Read each sentence. Write ${orList(['un', 'pre'])}", 'G2-535', 2],
  ['a meaning partner straight across', FACTORY, 'const perm = matchPerm(n, rng);', 'const perm = [...Array(n).keys()];', 'G2-536', 2],
  ['every meaning one row from its word', FACTORY, 'const perm = matchPerm(n, rng);', 'const perm = [1, 0, 3, 2];', 'G2-537', 1],
  ['the key draws no lines', FACTORY, 'const lines = key ? left.map(', 'const lines = false ? left.map(', 'G2-535', 2],
  ['a sentence keyed to the word that does not fit', FACTORY, 'const two = [[c.right, true], [c.wrong, false]];', 'const two = [[c.right, false], [c.wrong, true]];', 'G2-536', 1],
  ['the right word on the left in every sentence', FACTORY, 'const at = twoWay(sents.length, rng);', 'const at = sents.map(() => 0);', 'G2-535', 1],
  ['the page of the child rings the right word', FACTORY, "border:3px solid ${key && ok ? T.teal : 'transparent'}", "border:3px solid ${ok ? T.teal : 'transparent'}", 'G2-535', 1],
  ['the key rings a wrong word', FACTORY, "border:3px solid ${key && ok ? T.teal : 'transparent'}", "border:3px solid ${key && !ok ? T.teal : 'transparent'}", 'G2-536', 1],
  ['the key writes another answer on the rows (and the worked rows change)', FACTORY, 'seatOnRow(base, pr(answer),', 'seatOnRow(base, pr(answer).toUpperCase(),', 'G2-537', 2],
  // prefix
  ['prefix: no worked row', FACTORY, 'key, i === 0, d.pfont', 'key, false, d.pfont', 'G2-535', 1],
  ['prefix: a base in two tasks (its un- word printed)', FACTORY, 'const bBases = free(P.l1Build, d.build + 1);', 'const bBases = [...mBases.slice(0, 1), ...free(P.l1Build, d.build)];', 'G2-535', 1],
  ['prefix: the right meaning word in one place', FACTORY, 'three.splice(at[i], 0, list[0])', 'three.splice(0, 0, list[0])', 'G2-535', 1],
  ['prefix: the meaning rows without another un- word', FACTORY, "const others = free(P.l1Build.filter((b) => b !== 'do' && b.length <= 6), d.mean);", "const others = mBases.slice();", 'G2-535', 1],
  ['prefix: every right word of the sentences is an un- word', FACTORY, "const tr = s.filter((c) => c.right.startsWith('un')).length; return new Set(bs).size === s.length && tr >= 1 && tr < s.length", "const tr = s.filter((c) => c.right.startsWith('un')).length; return new Set(bs).size === s.length && tr === s.length", 'G2-535', 1],
  ['prefix: the words to match one base twice', FACTORY, 'const mb = shuffle(nth(pairs, 3), rng);', 'const mb = shuffle(nth(pairs, 3), rng); mb[1] = mb[0];', 'G2-535', 2],
  ['prefix: the meanings to write take un- only', FACTORY, 'return new Set(got.map((w) => split(w).p)).size === 2 ? got : null; });', "return got.every((w) => split(w).p === 'un') ? got : null; });", 'G2-535', 2],
  ['prefix: the meaning to write prints its word', FACTORY, "grid(d.wcols, wr.map((w) => writeCell(`data-lcs-write=\"${w}\"`, esc(M[w]), w, cw, key, false, d.wfont))), d.pad));\n          items.push(...wr.map((w) => 'write:' + w));\n          blocks.push(matchBlock", "grid(d.wcols, wr.map((w) => writeCell(`data-lcs-write=\"${w}\"`, esc(M[w] + ' (' + w + ')'), w, cw, key, false, d.wfont))), d.pad));\n          items.push(...wr.map((w) => 'write:' + w));\n          blocks.push(matchBlock", 'G2-535', 2],
  ['prefix: three sentences with re', FACTORY, 'const seq = kindSeq(d.gaps, kinds, rng); return seq && drawGaps(P.gaps,', "const seq = ['re', 're', 're']; return seq && drawGaps(P.gaps,", 'G2-535', 2],
  ['prefix: one row for the sentence of level 3', FACTORY, 'Array.from({ length: d.rows }', 'Array.from({ length: 1 }', 'G2-535', 3],
  ['prefix: the key gives no sample sentence', FACTORY, '(key ? `<div data-lcs-sample', '(false ? `<div data-lcs-sample', 'G2-535', 3],
  // suffix
  ['suffix: the base ringed on the page of the child', FACTORY, "const on = example ? T.inkSoft : key ? T.teal : 'transparent'", 'const on = example ? T.inkSoft : T.teal', 'G2-536', 2],
  ['suffix: room between base and suffix (it shows where the suffix starts)', FACTORY, 'padding:0 ${mark ? 3 : 0}px', 'padding:0 3px', 'G2-536', 3],
  ['suffix: no word to cross out on level 3', FACTORY, 'const trap = lv === 3 ? S.traps[rng.int(0, S.traps.length - 1)] : null;', 'const trap = null;', 'G2-536', 3],
  ['suffix: the key does not cross out the word without a suffix', FACTORY, 'text-decoration:${key ? `line-through', 'text-decoration:${false ? `line-through', 'G2-536', 3],
  ['suffix: the words to mark take -ful only', FACTORY, 'kinds.every((k) => got.filter((w) => split(w).s === k).length >= 2)', "got.every((w) => split(w).s === 'ful')", 'G2-536', 2],
  ['suffix: the words to match are one base twice with -ful', FACTORY, "...pairBases.flatMap((b) => ['ful', 'less'].map(", "...pairBases.flatMap((b) => ['ful', 'ful'].map(", 'G2-536', 3],
  // apostrophe
  ['apostrophe: no worked row', FACTORY, 'c.c, cw, key, example, d.wfont)', 'c.c, cw, key, false, d.wfont)', 'G2-537', 1],
  ['apostrophe: the contraction to write is spelled without its apostrophe', FACTORY, 'c.c, cw, key, example, d.wfont)', "c.c.replace(\"'\", ''), cw, key, example, d.wfont)", 'G2-537', 2],
  ['apostrophe: a contraction to split is written as the contraction', FACTORY, '`<span style="font-weight:800">${esc(pr(c.c))}</span>`, c.words, cw', '`<span style="font-weight:800">${esc(pr(c.c))}</span>`, c.c, cw', 'G2-537', 2],
  ["apostrophe: an 's contraction to write the two words for (he is or he has)", FACTORY, 'const sp = takeC(d.split, canSplit);', "const sp = takeC(d.split, (c) => c.kind === 'is' && c.words.length <= 8);", 'G2-537', 1],
  ['apostrophe: the contractions to match are one first word', FACTORY, 'const ss = shuffle(SUBJ, rng).slice(0, 2);', "const ss = ['we', 'we'];", 'G2-537', 1],
  ['apostrophe: the owners are named children only', FACTORY, 'rest.some((x) => x.animal) && rest.some((x) => !x.animal)', 'rest.every((x) => !x.animal)', 'G2-537', 2],
  ['apostrophe: one picture of a thing for every owner', FACTORY, '${img(x.thing, d.pic)}', '${img(own[0].thing, d.pic)}', 'G2-537', 2],
  ['apostrophe: pictures of 40 px', FACTORY, 'own: 3, ocols: 2, wfont: 26, pic: 64', 'own: 3, ocols: 2, wfont: 26, pic: 40', 'G2-537', 2],
  ['apostrophe: "its" on level 2', FACTORY, 'Put an apostrophe where letters are left out.`) + grid(d.jcols', 'Put its apostrophe where letters are left out.`) + grid(d.jcols', 'G2-537', 2],
  ['apostrophe: the sentences to fix hold no owner', FACTORY, "kinds.includes('c') && kinds.includes('p') &&", "!kinds.includes('p') &&", 'G2-537', 3],
  // the bank's own check (it runs when the factory loads)
  ['bank: a prefix gap whose other real word was not declared', BANK, '"text": "We are home, so let\'s ___pack our bags.",\n    "base": "pack",\n    "answer": "un",\n    "rivals": [\n     "re",\n     "pre"\n    ]', '"text": "We are home, so let\'s ___pack our bags.",\n    "base": "pack",\n    "answer": "un",\n    "rivals": [\n     "re"\n    ]', 'G2-535', 2],
  ['bank: "an" before a prefix blank', BANK, '"text": "It is ___ to push a friend."', '"text": "It is an ___ thing to push a friend."', 'G2-535', 1],
  ['bank: a sentence with two blanks', BANK, '"text": "Fish can sing? That is ___!"', '"text": "Fish can ___? That is ___!"', 'G2-535', 1],
  ['bank: a base with two sounds', BANK, '"zip": {', '"read": {', 'G2-535', 3],
  ['bank: a wrong meaning', BANK, '"retell": "tell again"', '"retell": "tell before"', 'G2-535', 2],
  ['bank: a suffix meaning that is the other suffix', BANK, '"careful": "full of care"', '"careful": "without care"', 'G2-536', 2],
  ['bank: a base that changes its spelling', BANK, '"glad": [', '"happy": [', 'G2-536', 3],
  ['bank: a word to cross out that has a suffix', BANK, '"bless"', '"careless"', 'G2-536', 3],
  ['bank: a contraction with its apostrophe in the wrong place', BANK, '"c": "don\'t"', '"c": "do\'nt"', 'G2-537', 1],
  ['bank: a name that ends in x', BANK, '"Mia",', '"Max",', 'G2-537', 2],
  ['bank: a sentence to fix with a second word that needs an apostrophe', BANK, '"text": "Whats in the box?"', '"text": "Whats in the box? Its red."', 'G2-537', 3],
  ['bank: a sentence to fix with "Well" (we\'ll without its apostrophe)', BANK, '"text": "We dont have school today.",\n    "wrong": "dont",\n    "right": "don\'t"', '"text": "Well have school today.",\n    "wrong": "Well",\n    "right": "We\'ll"', 'G2-537', 3],
  ['bank: a picture from a black-and-white theme', BANK, '"dog": [\n   "pets",', '"dog": [\n   "pets bw",', 'G2-537', 2],
  ['bank: an unkind word in a sentence', BANK, '"text": "Fish can sing? That is ___!"', '"text": "Dumb fish can sing? That is ___!"', 'G2-535', 1],
  // the checks of the review round (2026-11-16)
  ['a gap with less than half an inch of clear space above it', FACTORY, 'const pad = CLEAR - Math.round((d.gfont + 3) * 1.15) + 4;', 'const pad = CLEAR - Math.round((d.gfont + 3) * 1.15) - 30;', 'G2-536', 2],
  ['a sentence breaks before its gap (the gap on its second line)', FACTORY, "return [{ a, b: b1, gap: true }, { a: b2, b: '', gap: false, plain: true }]; }", "return [{ a: b2, b: '', gap: false, plain: true }, { a, b: b1, gap: true }]; }", 'G2-535', 2],
  ['two sentences of one page take two lines', FACTORY, '&& (two < 1 || layoutOf(rowOf(x), kinds).length === 1)), rng)[0];', '), rng).sort((p, q) => layoutOf(rowOf(q), kinds).length - layoutOf(rowOf(p), kinds).length)[0];', 'G2-535', 2],
  ['the matching takes two line offsets only', FACTORY, 'const perm = matchPerm(n, rng);', 'const perm = [2, 3, 0, 1];', 'G2-535', 2],
  ['four sentences to finish alternate their suffixes', FACTORY, '    const s = Array.from({ length: n }, () => kinds[rng.int(0, kinds.length - 1)]);\n', "    const s = kinds.join() === 'ful,less' ? ['ful', 'less', 'ful', 'less'] : Array.from({ length: n }, () => kinds[rng.int(0, kinds.length - 1)]);\n    if (s.length === 4) return s;\n", 'G2-536', 2],
  ['prefix: fewer than two sentences decide between two prefixes of one base', FACTORY, 'const seq = kindSeq(d.gaps, kinds, rng); return seq && drawGaps(P.gaps, seq, kinds, rowOf, (got) => got.filter((g) => twoTaken(g, kinds)).length >= 2);', 'const seq = kindSeq(d.gaps, kinds, rng); return seq && drawGaps(P.gaps, seq, kinds, rowOf, (got) => got.filter((g) => twoTaken(g, kinds)).length <= 1);', 'G2-535', 2],
  ['suffix: the ring of a marked word runs into its suffix', FACTORY, 'margin-right:${mark ? 7 : 0}px', 'margin-right:${mark ? 0 : 0}px', 'G2-536', 2],
  ["apostrophe: the done example of level 1 is not it is: it's", FACTORY, 'const ex = C.find((c) => c.c === "it\'s");', 'const ex = C.find((c) => c.c === "we\'re");', 'G2-537', 1],
  ['apostrophe: an owner and a thing of nine letters in a half-width cell', FACTORY, 'const ownOk = (o, t, w) => lettersOf(ownPhrase(o, t)) <= 8 && fitsRow(ownPhrase(o, t), w);', 'const ownOk = (o, t, w) => lettersOf(ownPhrase(o, t)) >= 9;', 'G2-537', 3],
  ['apostrophe: the key writes an owner wider than its cell', FACTORY, 'ownPhrase(x.owner, x.thing), cw, key, false, d.sfont)))', 'ownPhrase(x.owner, x.thing), 200, key, false, d.sfont)))', 'G2-537', 3],
  ['apostrophe: the word to fix stands first in most sentences', FACTORY, '&& s.filter(first).length <= Math.floor(d.fix / 2) ? s : null; });', '&& s.filter(first).length >= 3 ? s : null; });', 'G2-537', 3],
  ["apostrophe: the key does not accept a lowercase that's", FACTORY, "const accept = (x) => (key && x.kind === 'c'", "const accept = (x) => (false && x.kind === 'c'", 'G2-537', 3],
  ['apostrophe: fewer than twelve contractions whose two words fit a third of the page', FACTORY, "const splitable = C.filter((c) => c.kind !== 'is' && c.words.includes(' ') && fitsRow(c.words, W3));", "const splitable = C.filter((c) => c.kind !== 'is' && c.words.includes(' ') && fitsRow(c.words, W3 / 2));", 'G2-537', 1],
  ['bank: thankful asked by its meaning (full of thanks)', BANK, '"skillful": "full of skill"', '"thankful": "full of thank",\n   "skillful": "full of skill"', 'G2-536', 1],
  ['bank: wonderful asked by its meaning', BANK, '"skillful": "full of skill"', '"wonderful": "full of wonder",\n   "skillful": "full of skill"', 'G2-536', 1],
  ['bank: use among the bases to match (useful is not full of use)', BANK, '"match": [\n   "care",', '"match": [\n   "use",\n   "care",', 'G2-536', 2],
  ['bank: unroll asked by its meaning (the opposite of roll)', BANK, '"unfold": "the opposite of fold",', '"unroll": "the opposite of roll",\n   "unfold": "the opposite of fold",', 'G2-535', 2],
  ['bank: one pre- word to ask by its meaning', BANK, '"preheat": "heat before",\n   ', '', 'G2-535', 3],
  ['bank: one gap sentence for pre-', BANK, '"text": "Please ___heat the oven before we bake.",\n    "base": "heat",\n    "answer": "pre",\n    "rivals": [\n     "re"\n    ]', '"text": "Please ___heat the oven before we bake.",\n    "base": "heat",\n    "answer": "re",\n    "rivals": [\n     "pre"\n    ]', 'G2-535', 3],
  ['bank: a gap sentence that two lines cannot hold with its gap on the first', BANK, '"text": "Fish can sing? That is ___true!"', '"text": "We looked at the big map and the small map, and it was all ___true!"', 'G2-535', 2],
  ['bank: an -ly word right after its verb (walks slowly reads well as walks slow)', BANK, '"text": "The turtle slow___ crawled to the pond."', '"text": "The turtle walks slow___ to the pond."', 'G2-536', 3],
  ['bank: the cat owns a ball', BANK, '"cat": [\n    "bowl"\n   ]', '"cat": [\n    "bowl",\n    "ball"\n   ]', 'G2-537', 2],
  ['bank: a sock to own (one of a pair)', BANK, '"nameThings": [\n   "kite",', '"nameThings": [\n   "sock",\n   "kite",', 'G2-537', 2],
  ["bank: a contraction of nine characters (shouldn't)", BANK, '"contractions": [\n', '"contractions": [\n   { "c": "shouldn\'t", "words": "should not", "kind": "not" },\n', 'G2-537', 1],
  ['bank: fewer than eight sentences to fix with the word inside', BANK, FIX.find, FIX.repl, 'G2-537', 3],
  // the checks of the coordinator ruling 2026-11-16
  ['a blank band of more than 40 px between two tasks (three sentences on suffix level 1)', FACTORY, 'sents: 4, spad: 6', 'sents: 3, spad: 6', 'G2-536', 1],
  ['apostrophe: level 3 task 1 not three to write and three to split', FACTORY, "return cs.map((c) => ({ c, kind: sp.includes(c) ? 'split' : 'join' }));", "return cs.map((c) => ({ c, kind: sp.includes(c) && c !== sp[0] ? 'split' : 'join' }));", 'G2-537', 3],
  ["apostrophe: level 3 task 1 asks for the worked pair it is: it's", FACTORY, 'takeC(d.mixed, (c) => canJoin(c) && c.c !== "it\'s")', '[C.find((c) => c.c === "it\'s"), ...takeC(d.mixed - 1, (c) => canJoin(c) && c.c !== "it\'s")]', 'G2-537', 3],
  ['three right words of the sentences in a row in one place', FACTORY, '(new Set(p).size === 2 && !p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2]) && !fourAlternate(p))', "(n === 4 ? p.join() === '0,1,1,1' : new Set(p).size === 2)", 'G2-536', 1],
  ['four right words of the sentences alternate their places', FACTORY, '(new Set(p).size === 2 && !p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2]) && !fourAlternate(p))', "(n === 4 ? p.join() === '0,1,0,1' : new Set(p).size === 2)", 'G2-536', 1],
  ['bank: lock takes re- (relock)', BANK, '"lock": {\n    "pos": "verb",\n    "forms": [\n     "un"\n    ]', '"lock": {\n    "pos": "verb",\n    "forms": [\n     "un",\n     "re"\n    ]', 'G2-535', 2],
  ['bank: a re- word no second grader hears asked by its meaning (reopen)', BANK, '"retie": "tie again"', '"reopen": "open again",\n   "retie": "tie again"', 'G2-535', 2],
];
};
