/**
 * The planted faults of poison-story-k.js (types/_shared/story-k.js and the key `k` of the story bank):
 * [name, file, text to find, its replacement, type, level]. Every text must stand in its file exactly once (bank: at
 * least once); the poison script refuses to run otherwise, so a changed factory cannot pass with a stale list.
 */
'use strict';
module.exports = (FACTORY, BANK) => [
  // Who Is in the Story, and Where? (K-650)
  ['the right pictures as a staircase', FACTORY, "const at = rowPlaces(3);\n          const others", "const at = [0, 1, 2];\n          const others", 'K-650', 1],
  ['every right picture in the middle', FACTORY, "const at = rowPlaces(3);\n          const others", "const at = [1, 1, 1];\n          const others", 'K-650', 1],
  ['an animal keyed that the story is not about', FACTORY, "picks(placed(t.hero.picture, shuffle(t.whoWrong, rng), at[0]), at[0], key, d.opt)", "picks(placed(t.hero.picture, shuffle(t.whoWrong, rng), at[0]), (at[0] + 1) % 3, key, d.opt)", 'K-650', 1],
  ['two wrong events that are panels of the story', FACTORY, "const others = shuffle(STORIES.filter((o) => o.id !== t.id), rng).slice(0, 2).map((o) => o.panels[o.bme[1]].pics);", "const others = [t.panels[0].pics, t.panels[3].pics];", 'K-650', 1],
  ['no row for a word on level 3', FACTORY, "${line({ w: inner - 92 - 176 - 20, h: d.rowH, answer: key ? word : null, sample: true })}", "", 'K-650', 3],
  ['a row and a box of 80 px', FACTORY, "3: { pic: 64, font: 16, rowH: 128 } },", "3: { pic: 64, font: 16, rowH: 80 } },", 'K-650', 3],
  // Retell the Story (K-651)
  ['the three pictures in the order of the story', FACTORY, "const ORDERS = ['021', '120', '201', '210', '102'];", "const ORDERS = ['012', '012', '012', '012', '012'];", 'K-651', 1],
  ['a box keyed to another place', FACTORY, "${numBox(i + 1, key, 56)}", "${numBox(((i + 1) % 3) + 1, key, 56)}", 'K-651', 1],
  ['the numbers against the panels of the story', FACTORY, "const ev = t.bme.map((i) => t.panels[i].pics);", "const ev = t.bme.map((i) => t.panels[3 - i].pics);", 'K-651', 1],
  ['numbers on the panels of the page that asks for 1, 2 and 3', FACTORY, "let top = panelsBox(t, d, mode !== 'retell')", "let top = panelsBox(t, d, true)", 'K-651', 1],
  ['three rows that all begin First', FACTORY, "['First', 'Then', 'At the end'].map((st, i) => cream(`data-lcs-frame=", "['First', 'First', 'First'].map((st, i) => cream(`data-lcs-frame=", 'K-651', 3],
  // Ask and Answer Questions (K-652)
  ['what and how questions on level 1', FACTORY, "const qs = lv === 1 ? t.easy : lv === 2 ? t.hard :", "const qs = lv === 1 ? t.hard : lv === 2 ? t.hard :", 'K-652', 1],
  ['every right picture in the middle of the questions', FACTORY, "const at = qs.length === 3 ? rowPlaces(3) : shuffle([0, 1, 2], rng).slice(0, 2);", "const at = [1, 1, 1];", 'K-652', 2],
  ['no box for a question of the child\'s own', FACTORY, "(lv === 3 ? cream('data-lcs-own=\"1\"'", "(lv === 9 ? cream('data-lcs-own=\"1\"'", 'K-652', 3],
  ['a low box for the question of the child', FACTORY, "opt: 58, own: 156 } },", "opt: 58, own: 90 } },", 'K-652', 3],
  // The Pictures and the Words (K-653)
  ['every picture straight across from its sentence', FACTORY, "if (perm.every((x, i) => x !== i) && (n < 4 || new Set(perm.map((x, i) => (x - i + n) % n)).size > 1)) break; }", "perm = idx.map((_, i) => i); break; }", 'K-653', 2],
  ['every picture one row below its sentence', FACTORY, "if (perm.every((x, i) => x !== i) && (n < 4 || new Set(perm.map((x, i) => (x - i + n) % n)).size > 1)) break; }", "perm = idx.map((_, i) => (i + 1) % n); break; }", 'K-653', 2],
  ['the missing picture printed', FACTORY, "(s === missing ? (key ? pair(", "(s === missing ? (true ? pair(", 'K-653', 3],
  ['no picture missing on level 3', FACTORY, "const missing = lv === 3 ? rng.int(0, n - 1) : -1;", "const missing = lv === 9 ? rng.int(0, n - 1) : -1;", 'K-653', 3],
  ['small print for the sentences', FACTORY, "2: { rowHt: 160, font: 20, pic: 80 }, 3:", "2: { rowHt: 160, font: 15, pic: 80 }, 3:", 'K-653', 2],
  ['the two columns of dots close together', FACTORY, "LW = 300, GW = 176,", "LW = 400, GW = 76,", 'K-653', 2],
  ['level 1 without the first sentence of the story', FACTORY, "const idx = lv === 1 ? [0, rng.int(1, 2), 3]", "const idx = lv === 1 ? [1, 2, 3]", 'K-653', 1],
  // the bank's own check (it runs when the factory loads)
  ['bank: a story that does not begin with its character', BANK, '"Duck has a new blue hat. She wears it on a walk."', '"A duck has a new blue hat. She wears it on a walk."', 'K-650', 1],
  ['bank: a story that does not name its place', BANK, '"Rabbit finds a big carrot in her garden. She pulls and pulls."', '"Rabbit finds a big carrot in her yard. She pulls and pulls."', 'K-650', 1],
  ['bank: a what question among the who and where questions', BANK, '"q": "Who has a new hat?"', '"q": "What has a new hat?"', 'K-652', 1],
  ['bank: a label of three words', BANK, '"what": "hat"', '"what": "the blue hat"', 'K-650', 3],
  ['bank: a panel of twenty words', BANK, '"He sees a little bee on a flower."', '"He sees a very little bee that sits on a big red flower and hums a happy song all day."', 'K-653', 2],
  ['bank: a sentence that names both pictures of another panel', BANK, '"The bee is kind. She shares her honey with him."', '"The bee is kind. She shows Bear her honey."', 'K-653', 2],
];
