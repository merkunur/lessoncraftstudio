/**
 * The planted faults of poison-word-meanings-g3.js (types/_shared/word-meanings-g3.js and
 * data/literacy/word-meanings-g3.en.json): [name, file, text to find, its replacement, type, level]. Every text must stand
 * in its file exactly once (bank: at least once; the first is replaced); the poison script refuses to run otherwise, so a
 * changed factory cannot pass with a stale list. The probe renders the child's pages only: a rule only a key can break is
 * planted so that it breaks the child's page (a ring, an underline, a filled box).
 */
'use strict';
module.exports = (FACTORY, BANK) => [
  // the whole page
  ['an instruction that is not the one of its level', FACTORY, "kinds: { 1: 'Some clues tell what a new word means. Some clues tell its opposite.'", "kinds: { 1: 'Some clues tell what a new word means.'", 'G3-540', 1],
  ['the page root without its no-ligature mark', FACTORY, 'data-lcs-noliga="1"${key ?', 'data-lcs-noliga-x="1"${key ?', 'G3-541', 2],
  ['an f before i with no room of its own', FACTORY, 'typo(text).replace(/f(?=[iflt])|t(?=t)/g', 'typo(text).replace(/f(?=[x])|t(?=t)/g', 'G3-541', 1],
  ['straight apostrophes on the page', FACTORY, "const typo = (t) => t.replace(/'/g, '’')", 'const typo = (t) => t', 'G3-543', 1],
  ['writing lines lower than 34 px', FACTORY, 'function rule({ w, h = ROWH,', 'function rule({ w, h = ROWH - 8,', 'G3-541', 2],
  ["lines with no room for a third grader's hand to write a long clue", FACTORY, 'ws.reduce((s, x) => s + x, 0) < room * HAND)', 'ws.reduce((s, x) => s + x, 0) < room * HAND / 3)', 'G3-541', 3],
  ['the first line of a written answer left empty in the key', FACTORY, '(i === 0 ? rule({ w, answer, sample, room: 0 })', '(i === -1 ? rule({ w, answer, sample, room: 0 })', 'G3-540', 3],
  ['a line for one word lower than 250 px wide', FACTORY, 'const WORDLINE = 250;', 'const WORDLINE = 150;', 'G3-543', 2],
  ['a "goes between" line with no width of its own', FACTORY, 'min: WORDLINE }) + small(LINES.and)', '}) + small(LINES.and)', 'G3-543', 1],
  ['the sentence of a new entry on one line', FACTORY, "room: x.sentence.length, answer: key ? 'Sample answer: ' + x.sentence : null, sample: true, min: 2 }", "room: 0, answer: key ? 'Sample answer: ' + x.sentence : null, sample: true, min: 1 }", 'G3-542', 3],
  ['passage text smaller than a third grader reads (14 px)', FACTORY, "2: { ask: 6, answer: 'write', font: 17, lh: 1.55 },", "2: { ask: 6, answer: 'write', font: 12, lh: 1.55 },", 'G3-541', 2],
  // G3-540
  ["the right meaning ringed on the child's page", FACTORY, "border:3px solid ${key && ok ? T.teal : 'transparent'}", "border:3px solid ${ok ? T.teal : 'transparent'}", 'G3-540', 2],
  ['the right meaning first in every row', FACTORY, "if (d.pool === 'choose') { const at = places(d.n, 3, rng);", "if (d.pool === 'choose') { const at = Array(d.n).fill(0);", 'G3-540', 2],
  ['the sentences in the order of their kinds (D D D A A A)', FACTORY, '      const order = shuffle(got, rng);', '      const order = got.slice();', 'G3-540', 1],
  ['the key to the letters shows kinds the level does not have', FACTORY, "keyLine(d.kinds.join(''))", "keyLine('DSAE')", 'G3-540', 1],
  ['a synonym clue of two words (bank)', BANK, '"clue": "smell"', '"clue": "sweet smell"', 'G3-540', 2],
  ['an antonym sentence with "not" as its signal (bank)', BANK, 'The cookie was brittle, but the gummy worm', 'The cookie was brittle, not the gummy worm', 'G3-540', 1],
  ['a right meaning that repeats a word of its clue (bank)', BANK, '"meaning": "mad and upset"', '"meaning": "angry and mad"', 'G3-540', 2],
  ['a meaning that repeats an example of its sentence (bank)', BANK, '"fruits like apples"', '"fruits like lemons"', 'G3-540', 1],
  // G3-541
  ["a clue underlined on the child's page", FACTORY, "${key ? ` style=\"${UNDER}\"` : ''}>`, '</span>']);", " style=\"${UNDER}\">`, '</span>']);", 'G3-541', 1],
  ['every clue word of the passage bold', FACTORY, 'p.targets.filter((t) => asked.has(t.w)).forEach((t) => {', 'p.targets.forEach((t) => {', 'G3-541', 2],
  ['the two plain words of one kind (a level-3 copy loses a kind)', FACTORY, '(lv > 1 && targets[j].kind === targets[i].kind)', '(lv > 1 && targets[j].kind !== targets[i].kind)', 'G3-541', 3],
  ['level-1 meanings found by their length (bank)', BANK, '"meaning": "leave the water",', '"meaning": "leave the water and climb up",', 'G3-541', 1],
  ['a clue word printed twice in its passage (bank)', BANK, 'The penguins were famished.', 'The penguins were famished, famished.', 'G3-541', 3],
  ['a level-3 clue of the wrong kind count (bank)', BANK, '"kind": "S",\n       "meaning": "very hungry"', '"kind": "D",\n       "meaning": "very hungry"', 'G3-541', 3],
  // G3-542
  ['the key for the next word marks another entry', FACTORY, 'right: es[i + 1].w, opts: others', 'right: es[i - 1].w, opts: [es[i + 1].w, es[i + 2].w]', 'G3-542', 2],
  ['guide words marked that do not hold the word', FACTORY, "pair: pairs[right].join(' – ')", "pair: pairs[(right + 1) % 3].join(' – ')", 'G3-542', 1],
  ['level-2 guide words with different first letters', FACTORY, "2: { tasks: [['guide', 2], ['meaning', 2], ['spell', 2], ['pos', 1], ['after', 1]], depth: 2,", "2: { tasks: [['guide', 2], ['meaning', 2], ['spell', 2], ['pos', 1], ['after', 1]], depth: 1,", 'G3-542', 2],
  ['a right spelling that is the only shortest of its three', FACTORY, 'opts: e.spell.slice(), three: true', "opts: e.spell.map((s) => s + 'e'), three: true", 'G3-542', 1],
  ['meaning 1 asked on every copy, meaning 2 never', FACTORY, 'senses = two.map((e, i) => 1 + (i === 0 ? cv % 2 : Math.floor(cv / 2) % 2));', 'senses = two.map(() => 1);', 'G3-542', 1],
  ['the number of a meaning that can stand alone at the end of a line', FACTORY, 'data-lcs-numhead style="white-space:nowrap"', 'data-lcs-numhead style="white-space:normal"', 'G3-542', 1],
  ['entries out of ABC order (bank)', BANK, '"w": "rake",', '"w": "zrake",', 'G3-542', 1],
  ['a word with no misspelling of its own length (bank)', BANK, '"forst",', '"fforst",', 'G3-542', 1],
  ['a new word printed on the dictionary page (bank)', BANK, 'one of the two steel bars that a train rolls on', 'one of the two steel bars of a railroad', 'G3-542', 3],
  // G3-543
  ['level 1 holds the other words of the book', FACTORY, 'const glossWords = [...bw, ...(d.extra ? ew : [])]', 'const glossWords = [...bw, ...ew]', 'G3-543', 1],
  ['a level-2 glossary without the other words of the book', FACTORY, '2: { yn: 5, ins: 3, extra: true, missing: false, font: 15.5 },', '2: { yn: 5, ins: 3, extra: false, missing: false, font: 15.5 },', 'G3-543', 2],
  ['every yes/no answer is yes', FACTORY, "const pat = places(d.yn, 2, rng).map((x) => (x ? 'no' : 'yes'));", "const pat = places(d.yn, 2, rng).map(() => 'yes');", 'G3-543', 2],
  ['the missing word is one the text does not explain', FACTORY, 'g.bold.filter((x) => x.ctx && insertKind', 'g.bold.filter((x) => !x.ctx && insertKind', 'G3-543', 3],
  ['a new word that stands first or last in the glossary', FACTORY, "const pool = turn(g.insert.filter((w) => insertKind(w, glossWords) === want), 'ins');", "const pool = [...g.insert.filter((w) => !insertKind(w, glossWords) && !glossWords.includes(w)), ...turn(g.insert.filter((w) => insertKind(w, glossWords) === want), 'ins')];", 'G3-543', 1],
  ['a yes/no sentence about a word of no glossary (bank)', BANK, '"about": "larva"', '"about": "lava"', 'G3-543', 1],
  ['a new word printed in a glossary definition (bank)', BANK, 'a bowl-shaped hole at the top of a volcano', 'a cone-shaped hole at the top of a volcano', 'G3-543', 1],
  ['a new word longer than its column (bank)', BANK, '"milkweed",', '"milkweedplant",', 'G3-543', 1],
];
