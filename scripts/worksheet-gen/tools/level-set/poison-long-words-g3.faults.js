/**
 * The planted faults of poison-long-words-g3.js (types/_shared/long-words-g3.js and data/literacy/long-words-g3.en.json):
 * [name, file, text to find, its replacement, type, level]. Every text must stand in its file exactly once (bank: at
 * least once; the first is replaced); the poison script refuses to run otherwise, so a changed factory cannot pass with a
 * stale list. The probe renders the child's pages only: a rule only a key can break is planted so that it breaks the
 * child's page (a ring, a heart, a split line, a crossing-out, a word on a line).
 */
'use strict';
module.exports = (FACTORY, BANK) => [
  // the whole page
  ['an instruction that is not the one of its level', FACTORY, "co: { 1: 'A closed syllable ends with a consonant, and its vowel is short: nap | kin.'", "co: { 1: 'A closed syllable ends with a consonant: nap | kin.'", 'G3-512', 1],
  ['the page root without its no-ligature mark', FACTORY, 'data-lcs-noliga="1"${key ?', 'data-lcs-noliga-x="1"${key ?', 'G3-513', 1],
  ['an f before i with no room of its own ("first")', FACTORY, 'typo(text).replace(/f(?=[iflt])|t(?=t)/g', 'typo(text).replace(/f(?=[x])|t(?=t)/g', 'G3-514', 1],
  ['a t before t with no room of its own (kettle, little)', FACTORY, 'typo(text).replace(/f(?=[iflt])|t(?=t)/g', 'typo(text).replace(/f(?=[ifl])/g', 'G3-514', 1],
  ['the room after an f inside a flex row (its spaces vanish)', FACTORY, "text-align:center\"><span>${esc(headText[h])}</span></div>`).join('');", "text-align:center\">${esc(headText[h])}</div>`).join('');", 'G3-514', 1],
  ['a level too full for the page (24 words to split)', FACTORY, "1: { tasks: [['split', 16], ['choose3', 6]], cols: 4,", "1: { tasks: [['split', 24], ['choose3', 6]], cols: 4,", 'G3-512', 1],
  ['a page that fills less than 80 %', FACTORY,
    ["1: { tasks: [['join', 6], ['yesno', 8]], extra: 1,", "label(`${num(k)}${LINES.yesno}`) + `<div data-lcs-rows style=\"flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-around;gap:4px\">${rows}</div>`, d.pad, 6, grow(t.items.length))"],
    ["1: { tasks: [['join', 2], ['yesno', 2]], extra: 1,", "label(`${num(k)}${LINES.yesno}`) + `<div data-lcs-rows style=\"display:flex;flex-direction:column;gap:4px\">${rows}</div>`, d.pad, 6, '')"], 'G3-515', 1],
  ['writing lines lower than 34 px', FACTORY, 'function rule({ w, h = ROWH,', 'function rule({ w, h = ROWH - 8,', 'G3-519', 1],
  ['task lines of 16 px', FACTORY, 'const label = (html, px = 18) =>', 'const label = (html, px = 16) =>', 'G3-512', 2],
  ['words to circle of 17 px', FACTORY, "pill(w, w === s.right, key, 20, '0 11px')", "pill(w, w === s.right, key, 17, '0 11px')", 'G3-512', 1],
  ["the right word ringed on the child's page", FACTORY, "border:3px solid ${key && ok ? T.teal : 'transparent'}", "border:3px solid ${ok ? T.teal : 'transparent'}", 'G3-517', 1],
  // the split (G3-512, G3-514)
  ["the split line on the child's page", FACTORY, '${key && i > 0 ? `<span data-lcs-splitbar', '${i > 0 ? `<span data-lcs-splitbar', 'G3-512', 1],
  ['a gap between the syllables that gives the split away', FACTORY, '`<span data-lcs-syl="${i}" style="position:relative;display:inline-block">', '`<span data-lcs-syl="${i}" style="position:relative;display:inline-block;margin-left:${i ? 7 : 0}px">', 'G3-514', 2],
  ['a word split in the wrong place', FACTORY, "data-lcs-at=\"${x.parts.map((p) => p.length).join(',')}\"", "data-lcs-at=\"${x.parts.map((p) => p.length + 1).join(',')}\"", 'G3-512', 3],
  ['the boxes not centered under the word (they point at a syllable)', FACTORY, '<span data-lcs-marks style="display:flex;gap:8px">', '<span data-lcs-marks style="display:flex;gap:8px;margin-left:40px">', 'G3-514', 3],
  ['no choice of marks on level 1 (every second syllable closed)', FACTORY, "const want = lv === 1 ? [(x) => x.marks[1] === 'O', 2, 3]", "const want = lv === 1 ? [(x) => x.marks[1] === 'O', 0, 0]", 'G3-512', 1],
  // choose from three (G3-512)
  ['the right word first in every sentence', FACTORY, 'const at = places(nS, 3, rng);', 'const at = Array(nS).fill(0);', 'G3-512', 2],
  ['a word that also fits offered with its sentence', FACTORY, 'const two = shuffle(pool, rng).slice(0, 2);', 'const two = [...s.fits, ...shuffle(pool, rng)].slice(0, 2);', 'G3-512', 3],
  ['an article before the blank that fits only some words (an oval / a basket)', FACTORY,
    ["const okArt = (w) => (!a ? true : a.toLowerCase() === 'an' ? vowelSound(w) : !vowelSound(w));", "for (const s of shuffle(C.sentences[lv].filter((x) => byW[x.right]), rng))"],
    ['const okArt = (w) => true;', 'for (const s of [...C.sentences[lv].filter((x) => /\\ban ___/.test(x.text)), ...shuffle(C.sentences[lv].filter((x) => byW[x.right]), rng)])'], 'G3-512', 2],
  ['a word offered twice on a page', FACTORY, 'two.forEach((w) => offered.add(w));', '', 'G3-512', 1],
  ['an answer also among the words to split', FACTORY, 'const rest = ws.filter((x) => !answers.has(x.w));', 'const rest = ws;', 'G3-512', 1],
  // the sorts (G3-513, G3-514, G3-519)
  ['a word keyed to the other head', FACTORY, 'col: w === cross ? null : keyOf(w)', 'col: w === cross ? null : (keyOf(w) === heads[0] ? heads[1] : heads[0])', 'G3-513', 1],
  ['no word to cross out on level 3', FACTORY, 'const cross = d.cross ? shuffle(CS.neither, rng)[0].w : null;', 'const cross = null;', 'G3-513', 3],
  ['the word to cross out first in the box', FACTORY, 'const at = rng.int(1, order.length - 1);', 'const at = 0;', 'G3-519', 3],
  ['the words of a sort in an order of their heads', FACTORY, 'if (!sortOrderOk(cols)) continue;', 'if (cols.some((x, i) => i && x !== cols[i - 1] && cols.slice(i).some((y) => y === cols[i - 1]))) continue;', 'G3-514', 1],
  ['a column with one line too few', FACTORY, 'Array.from({ length: d.lines }, (_, i) => heads.map', 'Array.from({ length: d.lines - 1 }, (_, i) => heads.map', 'G3-519', 2],
  // yes or no
  ['yes too often (6 of 8)', FACTORY, "const pat = places(k, 2, rng).map((x) => (x ? 'no' : 'yes'));", "const pat = [0, 0, 1, 0, 0, 1, 0, 0].slice(0, k).map((x) => (x ? 'no' : 'yes'));", 'G3-515', 2],
  ['a yes/no sentence keyed to the wrong answer', FACTORY, "pill(a, a === s.a, key, 20, '0 10px')", "pill(a, a !== s.a, key, 20, '0 10px')", 'G3-513', 2],
  ['two yes/no sentences about one word (chimpanzee)', FACTORY, 'rng, (w) => lvWords.has(w));', 'rng);', 'G3-515', 3],
  ['a yes/no sentence that prints a word of the sort', FACTORY, "const yn = yesnoOf(O.yesno.filter((s) => !tokens(s.text).some((w) => shown.has(w))), count(d, 'yesno'), rng", "const yn = yesnoOf(O.yesno.filter((s) => tokens(s.text).some((w) => shown.has(w))).concat(O.yesno.slice(0, 12)), count(d, 'yesno'), rng", 'G3-519', 1],
  // build words (G3-515)
  ['the first part not printed as the bank has it', FACTORY, '<span data-lcs-first data-lcs-read style="flex:0 0 auto;padding-bottom:4px;font:800 21px/1 \'Nunito\',sans-serif;color:${T.ink}">${esc(x.first)}</span>', '<span data-lcs-first data-lcs-read style="flex:0 0 auto;padding-bottom:4px;font:800 21px/1 \'Nunito\',sans-serif;color:${T.ink}">${esc(x.first.slice(1))}</span>', 'G3-515', 1],
  ['a box part that makes a word with a first part it is not meant for', FACTORY, '.filter((c) => !seconds.includes(c) && !firsts.some((a) => joins(a, c)))', '.filter((c) => !seconds.includes(c))', 'G3-515', 2],
  ['the box parts in the order of the rows', FACTORY, 'const bx = shuffle([...pick.map((x) => x[1]), ...extra], rng);', 'const bx = [...pick.map((x) => x[1]), ...extra];', 'G3-515', 3],
  // suffixes (G3-516, G3-517)
  ["the suffix underlined on the child's page", FACTORY, "${key ? `box-shadow:inset 0 -3.5px 0 ${T.teal};padding-bottom:3px;margin-bottom:-3px` : ''}", "${`box-shadow:inset 0 -3.5px 0 ${T.teal};padding-bottom:3px;margin-bottom:-3px`}", 'G3-516', 1],
  ['the base and the suffix split in the wrong place', FACTORY, '${esc(x.shown)}</span>` +', '${esc(x.shown.slice(0, -1))}</span>` +', 'G3-516', 2],
  ['a word straight across from its meaning', FACTORY, 'for (let t = 0; t < 200; t++) { const o = shuffle(words, rng);', 'order = words.slice(); for (let t = 0; t < 0; t++) { const o = shuffle(words, rng);', 'G3-516', 1],
  ['words to match of four bases (careful, hopeful, helpful, useful)', FACTORY, 'const pairs = lv === 3 ? [P1[0], P3[0]] : [P1[0], P1[1]];', 'const pairs = lv === 3 ? [P1[0], P3[0]] : [[P1[0][0], P1[1][0]], [P1[2][0], P1[3][0]]];', 'G3-516', 2],
  ['a cue that prints the whole word', FACTORY, '${esc(x.base)} + ${esc(x.suf)}</span></span>`', '${esc(x.w)}</span></span>`', 'G3-516', 1],
  ['the other word of the base not offered', FACTORY, 'const opts = at[items.length] === 0 ? [right, other] : [other, right];', "const opts = at[items.length] === 0 ? [right, other + 'ly'] : [other + 'ly', right];", 'G3-517', 2],
  ["the word to build written on the child's page", FACTORY, 'rule({ w: 230, answer: key ? x.w : null })', 'rule({ w: 230, answer: x.w })', 'G3-517', 3],
  // heart words (G3-518)
  ["the heart on the child's page", FACTORY, '${key && x.heart.includes(i) ? heartSvg', '${x.heart.includes(i) ? heartSvg', 'G3-518', 2],
  ['a page without enough', FACTORY, 'const ws = [...H.always, ...rest];', 'const ws = [...H.always.slice(1), ...rest, H.words.map((x) => x.w).find((w) => !H.always.includes(w) && !rest.includes(w))];', 'G3-518', 1],
  ['the sentences in the order of the boxes', FACTORY, ['const sw = extra ? shuffle([...words, ...shuffle(H.always, rng).slice(0, extra)], rng) : shuffle(words, rng).slice(0, nS);', ' || staircase(sw.map((w) => order.indexOf(w)))'], ['const sw = order.slice(0, nS);', ''], 'G3-518', 2],
  ['no first letter on the line of a sentence', FACTORY, 'starter: first ? wd[0] : null,', 'starter: null,', 'G3-518', 1],
  ['a heart word printed in a task line (ocean)', FACTORY, "own: 'Open the page again. Write a sentence of your own with two heart words from the top.',", "own: 'Open the page again. Write a sentence of your own with two heart words, like ocean.',", 'G3-518', 3],
  ['no fold line', FACTORY, "if (mode === 'heart') blocks.splice(1, 0,", "if (false) blocks.splice(1, 0,", 'G3-518', 3],
  // the bank (its check when the factory loads)
  ['a sentence that prints a word of its level (robot)', BANK, '"text": "Smile for the ___!"', '"text": "Smile for the robot ___!"', 'G3-512', 2],
  ['a syllable marked against how it ends (hip | po as C C)', BANK, '"w": "hippo",\n     "parts": [\n      "hip",\n      "po"\n     ],\n     "marks": [\n      "C",\n      "O"', '"w": "hippo",\n     "parts": [\n      "hip",\n      "po"\n     ],\n     "marks": [\n      "C",\n      "C"', 'G3-512', 1],
  ['a word with a short first vowel on the open-syllable page (river)', BANK, '"text": "Please be ___ in the library."', '"text": "Please be ___ in the river library."', 'G3-512', 2],
  ['a word to cross out that is a list word', BANK, '"w": "oven"', '"w": "camel"', 'G3-513', 3],
  ['a silent e that keeps the vowel short on a syllable-type page (give)', BANK, '"text": "A candle can make light."', '"text": "A candle can give light."', 'G3-515', 1],
  ['a base that does not change by its rule (happy + ness)', BANK, '"shown": "happi"', '"shown": "happ"', 'G3-516', 3],
  ['a heart-word sentence that prints a heart word', BANK, '"Whales swim in the ___."', '"Whales swim through the ___."', 'G3-518', 1],
  ['a yes/no sentence with two ough words', BANK, '"text": "Sandpaper feels rough."', '"text": "Sandpaper feels rough and tough."', 'G3-519', 1],
  // the reading specialist's review (2026-11-16): a fault for every check it added
  ['a bank word of an instruction that is no example of its type (table of level 1, a task word of level 2)', FACTORY, "types: { 1: ['table'], 2: ['cupcake']", "types: { 1: [], 2: ['cupcake']", 'G3-514', 2],
  ['level 2 without level-1 words split again (the first box is no choice)', FACTORY, 'const rv = lv === 2 ?', 'const rv = false ?', 'G3-512', 2],
  ['the mark after a blank alone at the start of a line', FACTORY, '<span data-lcs-punct>', '<span data-lcs-punct style="display:block">', 'G3-512', 1],
  ['the right word of G3-517 in one place 5 times of 7', FACTORY, 'const at = places(nP, 2, rng, PICK_CAP);', 'const at = [0, 0, 1, 0, 0, 1, 0].slice(0, nP);', 'G3-517', 1],
  ['a base word to circle that carries a suffix of its own (friendliness)', FACTORY, '(x) => !bset.has(x.base) && !x.two), nP,', '(x) => !bset.has(x.base)), nP,', 'G3-516', 3],
  ['a word that does not mean what its suffix means in a meaning task (wonderful)', FACTORY,
    ['const mpool = S.words.filter((x) => !x.odd && (', 'const got = shuffle(mpool, rng).slice(0, nM);'],
    ['const mpool = S.words.filter((x) => (', 'const got = [...mpool.filter((x) => x.odd), ...shuffle(mpool.filter((x) => !x.odd), rng)].slice(0, nM);'], 'G3-517', 1],
  ['a meaning that is not the meaning of its suffix, the word not marked (wonderful: very good)', BANK, '"odd": true', '"odd": false', 'G3-516', 1],
  ['a blank band of 49 px (the key note room back under the sort)', FACTORY, '+ anyOrder + bank + grid, d.pad', '+ bank + grid + anyOrder, d.pad', 'G3-513', 1],
  ['letter boxes of 30 px', FACTORY, 'const box = MARKBOX;', 'const box = 30;', 'G3-512', 2],
  ['a build line too short for its word (90 px)', FACTORY, 'rule({ w: BUILDLINE,', 'rule({ w: 90,', 'G3-516', 2],
  ['a cue that does not stand under its line', FACTORY, 'transform:translateX(-50%);margin-top:2px;', 'transform:translateX(-10%);margin-top:2px;', 'G3-516', 1],
  ['level 3 sound boxes as wide as their letters (the widths tell the letters)', FACTORY, 'wbox = (g) => (d.uw ? d.uw : B + hs * (g.length - 1));', 'wbox = (g) => (d.uw ? d.uw + 8 * g.length : B + hs * (g.length - 1));', 'G3-518', 3],
  ['a heart word nearer to the row above than to its own boxes', FACTORY, 'gap:${d.uw ? 3 : hs + 12}px 18px;', 'gap:${d.uw ? 3 : 6}px 18px;', 'G3-518', 2],
  ['a first letter on the line on level 2', FACTORY, 'starter: first ? wd[0] : null,', 'starter: wd[0],', 'G3-518', 2],
  ['three rows found by a doubled letter on level 2 (bub + ble)', FACTORY, 'if (lv <= 2 && got.filter((x) => x[0].slice(-1) === x[1][0]).length > 2) continue;', 'if (lv <= 2 && got.filter((x) => x[0].slice(-1) === x[1][0]).length < 3) continue;', 'G3-515', 2],
  ['level 1 builds fewer than two -less words', FACTORY, "const need = lv === 1 ? [['ful', 2], ['less', 2]]", "const need = lv === 1 ? [['ful', 4]]", 'G3-516', 1],
  ['the word to cross out is cough (off is close to aw)', BANK, '"w": "drought"', '"w": "cough"', 'G3-519', 3],
  ['an oo word in the level-1 sort by the first vowel (noodle)', BANK, '"sortPool": {\n   "1": [\n    {\n     "w": "bubble",\n     "parts": [\n      "bub",\n      "ble"\n     ],\n     "marks": [\n      "C",\n      "L"\n     ]', '"sortPool": {\n   "1": [\n    {\n     "w": "noodle",\n     "parts": [\n      "noo",\n      "dle"\n     ],\n     "marks": [\n      "V",\n      "L"\n     ]', 'G3-514', 1],
  // the coordinator's last rulings (2026-11-17)
  ['the own sentence without its line "Open the page again. ..." (level 3)', FACTORY, 'label(`${num(k)}${LINES.own}`)', 'label(`${num(k)}Write a sentence of your own. Use two heart words from this page.`)', 'G3-518', 3],
  ["a straight apostrophe on the page (syllable's)", FACTORY, 'out += typo(text).replace(', 'out += text.replace(', 'G3-514', 1],
  ['a level-3 sort word ending in an e of another type (applesauce)', BANK, '"3": [\n    {\n     "w": "bubble",\n     "parts": [\n      "bub",\n      "ble"\n     ],\n     "marks": [\n      "C",\n      "L"\n     ]', '"3": [\n    {\n     "w": "applesauce",\n     "parts": [\n      "ap",\n      "ple",\n      "sauce"\n     ],\n     "marks": [\n      "C",\n      "L",\n      "V"\n     ]', 'G3-514', 3],
  // review en-1119-lit (2026-11-19): a vowel-team syllable on level 2 of G3-514; every box of a heart word one width
  ['level 2 of G3-514 with no vowel-team word (V of the legend never an answer)', FACTORY, "if (lv === 2 && m.filter((s) => s.includes('V')).length < 2) continue;", "if (lv === 2 && m.some((s) => s.includes('V'))) continue;", 'G3-514', 2],
  ['heart boxes as wide as their letters on level 2 (the widths tell which box holds ough)', FACTORY, 'style="width:${d.uw ? wbox(g) : wordW(x)}px;', 'style="width:${wbox(g)}px;', 'G3-518', 2],
];
