/**
 * The planted faults of poison-blends-g1.js (types/_shared/blends-g1.js and data/literacy/blends-g1.en.json):
 * [name, file, text to find, its replacement, type, level]. Every text must stand in its file exactly once (bank: at
 * least once; the first one is changed); the poison script refuses to run otherwise, so a changed factory cannot pass
 * with a stale list.
 */
'use strict';
module.exports = (FACTORY, BANK) => [
  // level 1: the new-word card, the words to finish, the sentences
  ['a new-word card of four new words', FACTORY, 'rng).slice(0, d.card + 1 - fromSents.length);', 'rng).slice(0, d.card - fromSents.length);', 'G1-588', 1],
  ['no worked row on the new-word card', FACTORY, '[pairRow(example, true), ...card.map((p) => pairRow(p, false))]', '[...card.map((p) => pairRow(p, false))]', 'G1-591', 1],
  ['a gap filled on the page of the child', FACTORY, "font:800 ${font}px/1.1 'Nunito',sans-serif\">${key || example ? g : ''}</span>`;", "font:800 ${font}px/1.1 'Nunito',sans-serif\">${g}</span>`;", 'G1-591', 1],
  ['every right word of the sentences holds the spelling', FACTORY, 'if (tr >= 1 && tr < d.sents && new Set(', 'if (tr === d.sents && new Set(', 'G1-589', 1],
  ['the right word on the left in every sentence', FACTORY, 'const at = twoWay(sents.length, rng);', 'const at = sents.map(() => 0);', 'G1-590', 1],
  ['a sentence keyed to the word that does not fit', FACTORY, 'const two = [[c.right, true], [c.wrong, false]];', 'const two = [[c.right, false], [c.wrong, true]];', 'G1-588', 1],
  ['words to finish that the card already shows', FACTORY, 'groups.push({ g: sp, example: example[1], words: take(ws, d.gaps) });', 'groups.push({ g: sp, example: example[1], words: shuffle(ws, rng).slice(0, d.gaps) });', 'G1-588', 1],
  ['one blend card where the page needs two', FACTORY, '!seen(w)).length >= 3), rng).slice(0, 2);', '!seen(w)).length >= 3), rng).slice(0, 1);', 'G1-590', 1],
  ['a gap of 60 px for two letters', FACTORY, 'width:${g.length === 1 ? GAP1 : GAP2}px', 'width:${GAP1}px', 'G1-589', 1],
  ['words that start with a blend on a digraph page', FACTORY, 'const ok = (w) => !plainLv || !startsWithBlend(w);', 'const ok = (w) => true;', 'G1-589', 1],
  ['a period apart from the last word to circle', FACTORY, '`<span data-lcs-tail>${esc(tail)}</span>` : \'\'}</span>${b2', '`<span data-lcs-tail style="margin-left:8px">${esc(tail)}</span>` : \'\'}</span>${b2', 'G1-591', 1],
  ['ligatures left on', FACTORY, 'data-lcs-noliga="1"${key', 'data-lcs-nolig="1"${key', 'G1-588', 1],
  ['an f with no room before i', FACTORY, 'text.replace(/f(?=[ifl])/g,', 'text.replace(/q(?=[ifl])/g,', 'G1-590', 1],
  // level 2: six words for four pictures and the sort
  ['a picture straight across from its word', FACTORY, 'if (off.every((o) => Math.abs(o) >= 18) && new Set(off.map((o) => Math.round(o / 10))).size > 1) break;', 'if (off.some((o) => Math.abs(o) < 18)) break;', 'G1-588', 2],
  ['the two words without a picture side by side', FACTORY, 'if (Math.abs(di[0] - di[1]) === 1) continue;', 'if (Math.abs(di[0] - di[1]) !== 1) continue;', 'G1-591', 2],
  ['a word without a picture that names a picture', FACTORY, 'dec = ps.map((x) => ({ w: shuffle((M.decoys[x.w] || []).filter((y) => ok(y) && !seen(y)), rng)[0], of: x.w, sp: x.sp }));', "dec = ps.map((x) => ({ w: x.w + 's', of: x.w, sp: x.sp }));", 'G1-589', 2],
  ['one word without a picture', FACTORY, 'const ps = shuffle(pics4.filter((x) => (M.decoys[x.w] || []).length), rng).slice(0, d.decoys);', 'const ps = shuffle(pics4.filter((x) => (M.decoys[x.w] || []).length), rng).slice(0, 1);', 'G1-590', 2],
  ['writing rows of 40 px', FACTORY, 'sort: 3, rowH: ROW, pad: 8 }', 'sort: 3, rowH: 40, pad: 8 }', 'G1-591', 2],
  ['the words to sort in the order of their columns', FACTORY, 'const bank = mixed(ws, rng);', 'const bank = ws;', 'G1-589', 2],
  ['white sort heads', FACTORY, 'const headBar = (text) => `<div data-lcs-colhead style="background:${T.teal};', 'const headBar = (text) => `<div data-lcs-colhead style="background:#FFFFFF;', 'G1-588', 2],
  // level 3: the pictures to write, the sort, the sentences to finish
  ['the sentences take one spelling', FACTORY, 'if (new Set(spsK).size < 2 || staircase(spsK.map((s) => sps.indexOf(s)))) continue;', 'if (new Set(spsK).size > 1) continue;', 'G1-588', 3],
  ['the sentences take the spellings in a staircase', FACTORY, 'if (new Set(spsK).size < 2 || staircase(spsK.map((s) => sps.indexOf(s)))) continue;', 'if (spsK.join() !== sps.slice(0, nF).join()) continue;', 'G1-589', 3],
  ['a print-only picture to write', FACTORY, 'const pool = (M.write || []).map(', 'const pool = [...(M.write || []), ...(BANK.printOnly || []).filter((w) => PICS[w] && picSpellingOf(M, w))].map(', 'G1-588', 3],
  ['the four endings sorted in one block', FACTORY, 'const layout = sps.length > 3 ? [sps.slice(0, 2), sps.slice(2)] : [sps];', 'const layout = [sps];', 'G1-591', 3],
  ['a sentence for a word the page already shows', FACTORY, 'M.fill[sp].filter((x) => !seen(x.word) && !used.has(x.word))', 'M.fill[sp].filter((x) => !used.has(x.word))', 'G1-588', 3],
  // the bank's own check (it runs when the factory loads)
  ['bank: a word with a silent e', BANK, '"cloth"', '"clothe"', 'G1-588', 1],
  ['bank: ck in the middle of a word', BANK, '"neck"', '"necks"', 'G1-589', 1],
  ['bank: an old word with a silent e', BANK, '"sell"', '"sale"', 'G1-588', 1],
  ['bank: a sentence with two blanks', BANK, '"Cars ___ at a red light."', '"Cars ___ at a red ___."', 'G1-590', 1],
  ['bank: "from" back in the r-blends', BANK, '"drill"', '"from"', 'G1-590', 3],
  ['bank: a gap that leaves "ag" printed', BANK, '"word": "plan"', '"word": "flag"', 'G1-590', 3],
  ['bank: a print-only picture to write', BANK, '"chin"', '"bench"', 'G1-588', 3],
  ['bank: a word without a picture that differs in its vowel', BANK, '"dug"', '"dig"', 'G1-589', 2],
  ['bank: a gap whose other word was not checked', BANK, '"word": "sock",\n      "rivals": [\n       "song"\n      ]', '"word": "sock",\n      "rivals": []', 'G1-589', 3],
  ['bank: a picture from a black-and-white theme', BANK, '"truck": [\n   "toys",', '"truck": [\n   "toys bw",', 'G1-590', 3],
  ['bank: a gap that can make a word on the list of words never to make', BANK, '"hell"', '"chick"', 'G1-588', 3],
];
