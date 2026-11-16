/**
 * The planted faults of poison-vowels-g1.js (types/_shared/vowels-g1.js and data/literacy/long-vowels.en.json):
 * [name, file, text to find, its replacement, type, level]. Every text must stand in its file exactly once (bank: at
 * least once; the first is replaced); the poison script refuses to run otherwise, so a changed factory cannot pass with a
 * stale list. Rewritten 2026-11-16 for the fix orders of the reading specialist's review (stacked picture words, two
 * short-word pictures, no repeats across tasks, first letters on the rows to write, 89/80 px rows, the odd word, heads that
 * are no chips, 96 px team gaps, the stop on the blank).
 */
'use strict';
module.exports = (FACTORY, BANK) => [
  // Silent e Changes the Vowel (G1-584)
  ['pairs of one vowel on the level of two', FACTORY, 'const allPairs = shuffle(vs.flatMap(', "const allPairs = shuffle(['a'].flatMap(", 'G1-584', 2],
  ['a picture keyed to the other word of its pair', FACTORY, 'const two = [[right, true], [other, false]];', 'const two = [[right, false], [other, true]];', 'G1-584', 1],
  ['fewer than two pictures of a short word', FACTORY, 'if (picsOk(shown, d)) break; }\n        if (!picsOk(shown, d)) throw', 'if (shown.filter((x) => x.w === x.l).length >= 3 && new Set(shown.map((x) => x.s)).size === 4) break; }\n        if (!shown.length) throw', 'G1-584', 2],
  ['the right word in the same place under every picture', FACTORY, 'if (new Set(tops).size < 2) tops[0] = 1 - tops[1];', 'tops = shown.map(() => 1);', 'G1-584', 1],
  ['the two words under a picture side by side', FACTORY, '<div data-lcs-stack style="display:flex;flex-direction:column;', '<div data-lcs-stack style="display:flex;flex-direction:row;', 'G1-584', 2],
  ['a pair of task 2 used again in task 3', FACTORY, 'const banned = new Set(shown.flatMap((x) => [x.s, x.l]));\n        // task 3', 'const banned = new Set();\n        // task 3', 'G1-584', 1],
  ['a sentence that prints a word of a pictured pair', FACTORY, ' && !textWords(s).some((w) => banned.has(w)));', ');', 'G1-584', 2],
  ['task 1 repeats the pictured pairs', FACTORY, 'const t1 = shuffle(pairs.slice(0, d.pairs), rng);', 'const t1 = shuffle([...shown.map((x) => ({ v: x.v, s: x.s, l: x.l })), ...pairs].filter((p, i, a) => a.findIndex((q) => q.s === p.s) === i).slice(0, d.pairs), rng);', 'G1-584', 2],
  ['a sentence keyed to the word that does not fit', FACTORY, "${pill(short, s.right === short, key, d.pill, 'short', 8)}${pill(long, s.right === long, key, d.pill, 'long', 8)}", "${pill(short, s.right !== short, key, d.pill, 'short', 8)}${pill(long, s.right !== long, key, d.pill, 'long', 8)}", 'G1-584', 1],
  ['a stop set apart from its blank (silent e)', FACTORY, 'const end = endsAtBlank(b) ? ', 'const end = false ? ', 'G1-584', 2],
  ['no words to write on level 3', FACTORY, 'if (d.write) blocks.push(', 'if (d.write && lv === 9) blocks.push(', 'G1-584', 3],
  ['a row to write on lower than its level', FACTORY, 'writeRow(w, Math.floor((inner - 10 * (d.write - 1)) / d.write), d.rowH, key)', 'writeRow(w, Math.floor((inner - 10 * (d.write - 1)) / d.write), d.rowH - 10, key)', 'G1-584', 3],
  ['rows of 60 px on silent e level 3', FACTORY, 'pad: 13, wpic: 96, rowH: 89 }', 'pad: 13, wpic: 96, rowH: 60 }', 'G1-584', 3],
  // the pairs of spellings (G1-585 ai and ay, G1-586 ee and ea, G1-587 oa and ow)
  ['every picture straight across from its word', FACTORY, 'if (perm.every((x, i) => x !== i) && new Set(perm.map((x, i) => (x - i + 4) % 4)).size > 1) break; }', 'perm = [0, 1, 2, 3]; break; }', 'G1-585', 1],
  ['every picture one row below its word', FACTORY, 'if (perm.every((x, i) => x !== i) && new Set(perm.map((x, i) => (x - i + 4) % 4)).size > 1) break; }', 'perm = [1, 2, 3, 0]; break; }', 'G1-587', 1],
  ['words to finish with the spelling they do not hold', FACTORY, 'const gw = shuffle(s.words.filter((w) => !ws.includes(w)), rng).slice(0, 4);', 'const gw = shuffle((s === A ? B : A).words.filter((w) => !ws.includes(w)), rng).slice(0, 4);', 'G1-585', 1],
  ['a gap too narrow for two letters', FACTORY, 'const TEAM_GAP = 96;', 'const TEAM_GAP = 54;', 'G1-586', 1],
  ['five words of one spelling and three of the other', FACTORY, 'const rest = (s, gs) => shuffle(s.words.filter((w) => !gs.includes(w) && !ruleWords.includes(w)), rng).slice(0, 4);', 'const rest = (s, gs) => shuffle(s.words.filter((w) => !gs.includes(w) && !ruleWords.includes(w)), rng).slice(0, s === A ? 5 : 3);', 'G1-586', 2],
  ['a word printed twice: a gap word in the sort', FACTORY, 'const rest = (s, gs) => shuffle(s.words.filter((w) => !gs.includes(w) && !ruleWords.includes(w)), rng).slice(0, 4);', 'const rest = (s, gs) => shuffle(s.words.filter((w) => !ruleWords.includes(w)), rng).slice(0, 4);', 'G1-585', 2],
  ["a word printed twice: the rule's example in the sort or the gaps", FACTORY, 'const ruleWords = tm.rule ? listWordsIn(tm, tm.rule) : [];', 'const ruleWords = [];', 'G1-587', 2],
  ['the word bank in one row of eight', FACTORY, 'const rowsOf = [order.slice(0, 4), order.slice(4)];', 'const rowsOf = [order];', 'G1-585', 2],
  ['a column head drawn as a chip', FACTORY, "style=\"text-align:center;font:800 32px/1.05 'Nunito',sans-serif;color:${T.teal};padding-bottom:3px;border-bottom:3px solid ${T.teal}\">${g}</div>`;", "style=\"text-align:center;font:800 32px/1.05 'Nunito',sans-serif;color:${T.teal};padding:2px 14px;border:2px solid ${T.teal};border-radius:999px\">${g}</div>`;", 'G1-585', 2],
  ['gaps of one spelling only', FACTORY, 'gb = shuffle(withPic ? picB : B.words.filter((w) => !ruleWords.includes(w)), rng).slice(0, 3);', 'gb = [];', 'G1-585', 2],
  ['no rule printed where the rule tells the spelling', FACTORY, '(tm.rule ? `<div data-lcs-rule', '(false ? `<div data-lcs-rule', 'G1-587', 2],
  ['no pictures where no rule tells the spelling', FACTORY, 'const withPic = !tm.rule;', 'const withPic = false;', 'G1-586', 2],
  ['pictures of 40 px', FACTORY, '2: { font: 34, pic: 62, rowH: 89, pad: 9 }', '2: { font: 34, pic: 40, rowH: 89, pad: 9 }', 'G1-586', 2],
  ['no odd word in the bank', FACTORY, 'const words = [...wa, ...wb, ...(odd ? [odd] : [])];', 'const words = [...wa, ...wb];', 'G1-586', 3],
  ['the odd word written in a column', FACTORY, 'blocks.push(sortBlock(1, wa, wb, tm.odd));', 'blocks.push(sortBlock(1, [...wa.slice(0, 2), tm.odd], wb, tm.odd));', 'G1-585', 3],
  ["the odd word crossed out on the child's page", FACTORY, "odd ? 20 : 21, key && w === odd)", "odd ? 20 : 21, w === odd)", 'G1-587', 3],
  ['no first letter on a row to write', FACTORY, 'const writeRow = (w, width, h, key) => line({ w: width, h, starter: w[0], answer: key ? w : null });', 'const writeRow = (w, width, h, key) => line({ w: width, h, starter: null, answer: key ? w : null });', 'G1-585', 3],
  ['a word to write printed in the word box', FACTORY, 'fill = shuffle(tm.box.filter((w) => !ws.includes(w)), rng).slice(0, 2);', 'fill = [ws[0], ...shuffle(tm.box.filter((w) => !ws.includes(w)), rng).slice(0, 1)];', 'G1-586', 3],
  ['two sentences for one spelling', FACTORY, 'two = shuffle([shuffle(sa, rng)[0], shuffle(sb, rng)[0]], rng);', 'two = shuffle(tm.sentences.filter((s) => A.words.includes(s.right)), rng).slice(0, 2);', 'G1-585', 3],
  ['an answer that is not in the word box', FACTORY, 'const boxWords = shuffle([...answers, ...fill], rng);', 'const boxWords = shuffle([answers[0], ...fill], rng);', 'G1-587', 3],
  ['a stop set apart from its blank (word box)', FACTORY, 'const end = endsAtBlank(b);', 'const end = false;', 'G1-587', 3],
  ['rows of 70 px on vowel-team level 3', FACTORY, '3: { pic: 66, rowH: 80, pad: 7, write: 3 }', '3: { pic: 66, rowH: 70, pad: 7, write: 3 }', 'G1-586', 3],
  ['fi printed as one joined letter (the page rule against ligatures is gone)', FACTORY, '<style>[data-lcs-noliga] *{font-variant-ligatures:none !important;', '<style>[data-lcs-noliga-off] *{font-variant-ligatures:none !important;', 'G1-584', 2],
  // the bank's own check (it runs when the factory loads)
  ['bank: a pair that does not add an e', BANK, '"can",\n     "cane"', '"can",\n     "cans"', 'G1-584', 1],
  ['bank: level 1 cannot show two long-word pictures', BANK, '"hat",\n    "plane",\n    "cane"', '"hat"', 'G1-584', 1],
  ['bank: a picture from a black-and-white theme', BANK, '"toys",\n   "boat"', '"toys bw",\n   "boat"', 'G1-587', 3],
  ['bank: ay in the middle of a word', BANK, '"tray"', '"trays"', 'G1-585', 2],
  ['bank: a word with two vowels', BANK, '"seed"', '"needle"', 'G1-586', 2],
  ['bank: an odd word that stands in a word list', BANK, '"odd": "cow"', '"odd": "row"', 'G1-587', 3],
  ['bank: a word never to write in a list to write', BANK, '"write": [\n    "bee"', '"write": [\n    "jeep"', 'G1-586', 3],
  ['bank: a box word that answers a sentence', BANK, '"box": [\n    "hay"', '"box": [\n    "play"', 'G1-585', 3],
  ['bank: a sentence whose answer is no word of the pair', BANK, '"right": "snow"', '"right": "rain"', 'G1-587', 3],
  ['bank: a sentence that prints a word of the lists', BANK, '"text": "We sail in a ___."', '"text": "We row in a ___."', 'G1-587', 3],
  ['bank: a word to write that is no word of the pair', BANK, '"write": [\n    "boat"', '"write": [\n    "roast"', 'G1-587', 3],
  ['bank: "apart" names a word that answers no sentence', BANK, '"soap",\n     "snow"', '"soap",\n     "crow"', 'G1-587', 3],
];
