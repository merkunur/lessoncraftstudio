/**
 * The planted faults of poison-vowels-g2b.js (types/_shared/vowels-g2b.js and data/literacy/vowels-g2b.en.json):
 * [name, file, text to find, its replacement, type, level]. Every text must stand in its file exactly once (bank: at
 * least once; the first is replaced); the poison script refuses to run otherwise, so a changed factory cannot pass with a
 * stale list. The probe renders the child's pages only: a rule only a key can break is planted so that it breaks the
 * child's page (a ring, a heart, a split line, a letter drawn on it).
 */
'use strict';
module.exports = (FACTORY, BANK) => [
  // the whole page
  ['an instruction that is not the one of its level', FACTORY, "1: 'oo can say two sounds: the sound in moon and the sound in book.'", "1: 'oo says two sounds: moon and book.'", 'G2-543', 1],
  ['an instruction that is not the one of its level (G2-544 level 2, the old long sentence)', FACTORY, "2: 'Bossy r: ar says the sound in park, and or says the sound in storm.',", "2: 'Bossy r changes the vowel sound: ar says the sound in park, and or says the sound in storm.',", 'G2-544', 2],
  ['a task line with a word whose ou says another sound (your)', FACTORY, "draw: 'Read the sentence. Draw what it says.',", "draw: 'Read the sentence. Draw what it says in your box.',", 'G2-543', 1],
  ['the page root without its no-ligature mark', FACTORY, 'data-lcs-noliga="1"${key ?', 'data-lcs-noliga-x="1"${key ?', 'G2-543', 1],
  ['an f before i with no room of its own ("first")', FACTORY, 'text.replace(/f(?=[iflt])|t(?=t)/g', 'text.replace(/f(?=[x])|t(?=t)/g', 'G2-547', 1],
  ['a t before t with no room of its own ("letter")', FACTORY, 'text.replace(/f(?=[iflt])|t(?=t)/g', 'text.replace(/f(?=[ifl])/g', 'G2-548', 1],
  ['a level too full for the page (nine sentences)', FACTORY, "1: { tasks: [['yesno', 4], ['riddles', 2], ['draw', 1]], box: 2,", "1: { tasks: [['yesno', 9], ['riddles', 2], ['draw', 1]], box: 2,", 'G2-543', 1],
  ['a page that fills less than 80 %', FACTORY, "1: { say: ['mailbox'], tasks: [['join', 6], ['yesno', 5]],", "1: { say: ['mailbox'], tasks: [['join', 2], ['yesno', 2]],", 'G2-547', 1],
  ['writing rows lower than 89 px', FACTORY, 'line({ w: 190, h: ROW, starter: word[0]', 'line({ w: 190, h: ROW - 12, starter: word[0]', 'G2-548', 1],
  ['task lines of 17 px', FACTORY, 'const label = (html, px = 20) =>', 'const label = (html, px = 17) =>', 'G2-546', 2],
  ['words to circle of 17 px', FACTORY, "pill(w, w === s.right, key, 20, 'data-lcs-pill', '0 12px')", "pill(w, w === s.right, key, 17, 'data-lcs-pill', '0 12px')", 'G2-546', 1],
  // three edits: the period set apart, and a page that surely has a sentence ending in its blank (friend: "... with my ___.")
  ['a period set apart from its line', FACTORY,
    ['`<span data-lcs-tail style="padding-bottom:${pb}px">${esc(tail)}</span>`', 'const s = shuffle(words, rng).slice(0, nS);', "tasks.push({ kind: 'heartsent', items: sw.map((w) => ({ w, text: shuffle(H.sentences[w], rng)[0] })) });"],
    ['`<span data-lcs-tail style="padding-bottom:${pb}px;margin-left:20px">${esc(tail)}</span>`', "const s = ['friend', ...shuffle(words.filter((w) => w !== 'friend'), rng)].slice(0, nS);", "tasks.push({ kind: 'heartsent', items: sw.map((w) => ({ w, text: w === 'friend' ? 'I like to play tag with my ___.' : shuffle(H.sentences[w], rng)[0] })) });"],
    'G2-548', 2],
  ["the right word ringed on the child's page", FACTORY, "border:3px solid ${key && ok ? T.teal : 'transparent'}", "border:3px solid ${ok ? T.teal : 'transparent'}", 'G2-543', 1],
  // yes or no
  ['yes and no every other time', FACTORY, "const pat = (Number.isInteger(v) && v > 0 ? P[(3 * v + 2 * (PATTERN_OFFSET[mode] || 0)) % P.length] : places(k, 2, rng)).map((x) => (x ? 'no' : 'yes'));", "const pat = Array.from({ length: k }, (_, i) => (i % 2 ? 'no' : 'yes'));", 'G2-544', 2],
  ['two types of one copy with the same yes/no order', FACTORY, 'const PATTERN_OFFSET = { diph: 0, aror: 1, erirur: 2, syllread: 3 };', 'const PATTERN_OFFSET = { diph: 0, aror: 0, erirur: 2, syllread: 3 };', 'G2-544', 1],
  ['a yes/no sentence keyed to the wrong answer', FACTORY, "pill(a, a === s.a, key, 21, 'data-lcs-pill', '0 10px')", "pill(a, a !== s.a, key, 21, 'data-lcs-pill', '0 10px')", 'G2-545', 1],
  ['yes/no sentences of spellings the level does not read', FACTORY, "const yn = yesno(R.yesno.filter((s) => usableOn(R, s.text, lv) && clean(s.text)), n('yesno'));", "const yn = yesno(R.yesno.filter((s) => clean(s.text) && !usableOn(R, s.text, lv)), n('yesno'));", 'G2-543', 1],
  ['yes and no not in one column', FACTORY, '`<span data-lcs-ynpills style="flex:0 0 auto;', '`<span data-lcs-ynpills style="flex:0 0 auto;margin-right:${(s.text.length % 3) * 9}px;', 'G2-544', 1],
  // riddles
  ['a riddle answer as a box word that answers another riddle', FACTORY, 'const fill = shuffle(set.flatMap((g) => R.fillers[g] || [])', 'const fill = shuffle(R.riddles.map((r) => r.a).filter((w) => !answers.includes(w))', 'G2-544', 2],
  ['a level-3 riddle line that names no spellings', FACTORY, "diph: 'Read each riddle. Write the answer. It has oo, ou, ow, oi, or oy. Its first letter is on the line.'", "diph: 'Read each riddle. Write the answer. Its first letter is on the line.'", 'G2-543', 3],
  ['"What am I?" that may break over two lines', FACTORY, 'return esc(text.slice(0, at)) + `<span data-lcs-wai style="white-space:nowrap">What am I?</span>`;', 'return esc(text);', 'G2-544', 2],
  ['no first letter on the rows of level 3', FACTORY, 'starter: t.starter ? r.a[0] : null', 'starter: null', 'G2-543', 3],
  ['riddles all of one spelling on level 2', FACTORY, 'if (set.length > 1 && new Set(got.map((r) => spellIn(R, r.a))).size < 2) continue;', 'if (set.length > 1 && new Set(got.map((r) => spellIn(R, r.a))).size > 1) continue;', 'G2-545', 2],
  ['two riddles that each answer the other (girl, sister)', FACTORY,
    "const got = shuffle(pool, rng).slice(0, n('riddles'));\n      if (got.length < n('riddles')) break;\n      if (got.some((r) => got.some((o) => o !== r && ((r.fits || []).includes(o.a) || hasWord(r.text, o.a))))) continue;",
    "const got = (mode === 'erirur' && lv > 1 ? [pool.find((r) => r.a === 'girl'), pool.find((r) => r.a === 'sister'), ...shuffle(pool.filter((r) => r.a !== 'girl' && r.a !== 'sister'), rng)] : shuffle(pool, rng)).slice(0, n('riddles'));\n      if (got.length < n('riddles')) break;", 'G2-545', 2],
  // read and draw
  ["a note in the drawing box of the child's page", FACTORY, '${key ? `<span data-lcs-keynote', '${true ? `<span data-lcs-keynote', 'G2-544', 3],
  ['a sentence to draw of spellings the level does not read', FACTORY, 'const dr = shuffle(R.draw.filter((t) => usableOn(R, t, lv) && clean(t)), rng)[0];', 'const dr = shuffle(R.draw.filter((t) => !usableOn(R, t, lv) && clean(t)), rng)[0];', 'G2-545', 1],
  // the split (G2-546)
  ["the split line on the child's page", FACTORY, '${key && i === 1 ? `<span data-lcs-splitbar', '${i === 1 ? `<span data-lcs-splitbar', 'G2-546', 1],
  ['a gap between the syllables that gives the split away', FACTORY, '`<span data-lcs-syl="${i}" style="position:relative;display:inline-block">', '`<span data-lcs-syl="${i}" style="position:relative;display:inline-block;margin-left:${i ? 6 : 0}px">', 'G2-546', 2],
  ['a word split in the wrong place', FACTORY, 'data-lcs-at="${x.parts[0].length}"', 'data-lcs-at="${x.parts[0].length + 1}"', 'G2-546', 3],
  ["the long syllables circled on the child's page", FACTORY, '${key && x.long.includes(i) ? `<span data-lcs-ring', '${x.long.includes(i) ? `<span data-lcs-ring', 'G2-546', 2],
  // choose from three (G2-546)
  ['the right word first in every sentence', FACTORY, 'const at = placesFor3(nS, rng);', 'const at = Array(nS).fill(0);', 'G2-546', 1],
  ['a word that also fits offered with its sentence', FACTORY, 'const two = shuffle(pool, rng).slice(0, 2);', 'const two = [...s.fits, ...shuffle(pool, rng)].slice(0, 2);', 'G2-546', 2],
  ['an article before the blank that fits only some words', FACTORY, "const a = art(s.text), okArt = (w) => (!a ? true : a.toLowerCase() === 'an' ? vowelSound(w) : !vowelSound(w));", 'const a = art(s.text), okArt = (w) => true;', 'G2-546', 3],
  ['a word offered twice on a page', FACTORY, 'two.forEach((w) => offered.add(w));', '', 'G2-546', 1],
  ['an answer also among the words to split', FACTORY, "const split = shuffle(ws.filter((x) => !answers.has(x.w)), rng).slice(0, n('split'));", "const split = [...ws.filter((x) => answers.has(x.w)).slice(0, 1), ...shuffle(ws.filter((x) => !answers.has(x.w)), rng)].slice(0, n('split'));", 'G2-546', 1],
  // build words (G2-547)
  ['a box part that makes a word with a first part it is not meant for', FACTORY, '.filter((c) => !seconds.includes(c) && !firsts.some((a) => joins(a, c)))', '.filter((c) => !seconds.includes(c) && firsts.some((a) => joins(a, c)))', 'G2-547', 3],
  ['no first part on the row', FACTORY, 'line({ w: cw, h: d.jrow || ROW, starter: x.first, answer: key ? x.w : null })', 'line({ w: cw, h: d.jrow || ROW, starter: null, answer: key ? x.w : null })', 'G2-547', 1],
  ['a word to build printed in a yes/no sentence', FACTORY, "const yn = yesno(S.yesno[lv].filter((s) => !answers.some((w) => hasWord(s.text, w))), n('yesno'));", "const yn = yesno(S.yesno[lv].filter((s) => answers.some((w) => hasWord(s.text, w))).concat(S.yesno[lv].filter((s) => s.a === 'yes').slice(0, 3)).concat(S.yesno[lv].filter((s) => s.a === 'no').slice(0, 3)), n('yesno'));", 'G2-547', 1],
  // heart words (G2-548)
  ['no fold line between the words and the sentences', FACTORY, "if (mode === 'heart') blocks.splice(1, 0,", 'if (false) blocks.splice(1, 0,', 'G2-548', 1],
  ['no line asking to fold the words back (level 2)', FACTORY, "${lv > 1 ? LINES.fold + ' ' : ''}", "${lv > 9 ? LINES.fold + ' ' : ''}", 'G2-548', 2],
  ["the heart on the child's page", FACTORY, '${key && x.heart.includes(i) ? heartSvg(', '${x.heart.includes(i) ? heartSvg(', 'G2-548', 1],
  ["the sound boxes filled on the child's page", FACTORY, 'color:${T.teal}">${key ? esc(g) : \'\'}</div></div>`', 'color:${T.teal}">${esc(g)}</div></div>`', 'G2-548', 2],
  ['two heart words with one first letter', FACTORY,
    "if (!words.some((x) => x[0] === w[0])) words.push(w); }\n    }\n    if (words.length !== k || new Set(words.map((w) => w[0])).size !== k) throw new Error('no heart words of other first letters');",
    "words.push(w); }\n    }\n    if (words.length !== k) throw new Error('no heart words');", 'G2-548', 3],
  ['the sentences in the order of the boxes', FACTORY,
    "for (let t = 0; t < 300; t++) { const s = shuffle(words, rng).slice(0, nS); if (s.filter((w) => H.always.includes(w)).length >= Math.min(2, nS - 1) && !staircase(s.map((w) => order.indexOf(w)))) { sw = s; break; } }",
    'sw = order.slice(0, nS);', 'G2-548', 1],
  ['no first letter on the row of a heart sentence', FACTORY, 'line({ w: 190, h: ROW, starter: word[0]', 'line({ w: 190, h: ROW, starter: null', 'G2-548', 2],
  ['one row for the sentence of the child\'s own', FACTORY, "line({ w: inner - 8, h: ROW, answer: key ? 'Sentences will vary.' : null }) + line({ w: inner - 8, h: ROW })", "line({ w: inner - 8, h: ROW, answer: key ? 'Sentences will vary.' : null })", 'G2-548', 3],
  ['could missing from the page', FACTORY, 'let words = [...H.always];', 'let words = [...H.always.slice(1), H.words[5].w];', 'G2-548', 2],
  // the bank's own check (it runs when the factory loads)
  ['bank: a word with these letters and another sound (snow) in a sentence', BANK, '"text": "A cow can bark."', '"text": "A cow can snow."', 'G2-543', 2],
  ['bank: a riddle that prints its answer', BANK, '"text": "A king wears me on his head. What am I?"', '"text": "A king wears me on his head. I am a crown. What am I?"', 'G2-543', 2],
  ['bank: a riddle that does not ask "What am I?"', BANK, '"text": "You hit a nail with me. What am I?"', '"text": "You hit a nail with me."', 'G2-545', 1],
  ['bank: a box word that answers a riddle', BANK, '"oo": [\n     "noon",', '"oo": [\n     "moon",', 'G2-543', 1],
  ['bank: a yes/no sentence with no word of the lesson', BANK, '"text": "A foot has five toes."', '"text": "A hand has five fingers."', 'G2-543', 1],
  ['bank: a yes/no sentence without yes or no', BANK, '"a": "yes"', '"a": "maybe"', 'G2-544', 1],
  ['bank: a sentence to draw that does not say Draw', BANK, '"Draw a moon over a pool."', '"Make a moon over a pool."', 'G2-543', 1],
  ['bank: a two-syllable word whose parts do not spell it', BANK, '"w": "tiger"', '"w": "tigers"', 'G2-546', 3],
  ['bank: a sentence that prints a word of its level', BANK, '"text": "I put syrup on my ___."', '"text": "I put syrup on my ___ and my cupcake."', 'G2-546', 2],
  ['bank: a word of the level missing from the joins', BANK, '"joins": {\n   "1": [\n    [\n     "mail",\n     "box"', '"joins": {\n   "1": [\n    [\n     "mail",\n     "boxx"', 'G2-547', 1],
  ['bank: heart boxes that do not spell the word', BANK, '"w": "could",\n    "boxes": [\n     "c",\n     "oul",', '"w": "could",\n    "boxes": [\n     "c",\n     "ou",', 'G2-548', 1],
  ['bank: the heart of could not over oul', BANK, '"oul",\n     "d"\n    ],\n    "heart": [\n     1', '"oul",\n     "d"\n    ],\n    "heart": [\n     0', 'G2-548', 1],
  ['bank: warm (its ar says another sound) on G2-544', BANK, '"text": "A shark can swim."', '"text": "A shark can swim in warm water."', 'G2-544', 1],
  ['bank: have (a silent e that does not make the vowel long) on level 2', BANK, '"text": "You can eat a pancake."', '"text": "You can have a pancake."', 'G2-547', 2],
  ['bank: seven (a short first syllable) on level 3', BANK, '"text": "A tiger has stripes."', '"text": "A tiger has seven stripes."', 'G2-547', 3],
  ['bank: head (its ea says short e) on level 1', BANK, '"text": "A snowman can melt in the sun."', '"text": "A snowman has a big head."', 'G2-547', 1],
  ['bank: shoulder (its oul is not the oul of could)', BANK, '"___ you like some milk?"', '"___ you like a shoulder bag?"', 'G2-548', 1],
  ['bank: a heart sentence that prints a heart word', BANK, '"My best ___ sits next to me."', '"My best ___ could sit next to me."', 'G2-548', 2],
];
