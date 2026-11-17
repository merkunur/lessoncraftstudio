/**
 * The planted faults of poison-onset-rime-k.js (types/_shared/onset-rime-k.js and data/literacy/onset-rime-k.en.json):
 * [name, file, text to find, its replacement, type, level, 'key' when the fault shows on the answer key only, and the
 * pattern the NEW report must match]. Every text must stand in its file exactly once (bank: at least once; the first one is
 * changed); the poison script refuses to run otherwise, so a changed factory cannot pass with a stale list. A fault counts as
 * caught only when the pages report something their clean run does not (the clean control must report nothing).
 */
'use strict';
const fs = require('fs');
// A rule the factory holds in two places is removed in BOTH, and the fault prefers the words that break it; a level the
// fault does not test must still draw. span() reads the text between two anchors from the LIVE factory; sub() refuses a
// change whose text is not in the span exactly once (2026-11-17).
const span = (file, from, to) => {
  const s = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'), i = s.indexOf(from), j = i < 0 ? -1 : s.indexOf(to, i);
  if (i < 0 || j < 0) throw new Error('fault anchor not found: ' + (i < 0 ? from : to));
  return s.slice(i, j + to.length);
};
const sub = (s, a, b) => { if (s.split(a).length !== 2) throw new Error('fault change not found once: ' + a); return s.replace(a, () => b); };
const subs = (s, pairs) => pairs.reduce((t, [a, b]) => sub(t, a, b), s);
module.exports = (FACTORY, BANK) => {
  const L2 = span(FACTORY, 'const a = free[0], c = free.find((w) => w !== a && sameOn(w, a) && !sameV(w, a));', 'if (!row || !rowFair(row.ws)) { ok = false; break; }');
  const CHAIN = span(FACTORY, 'const tg = free.find((w) => steady(w) && canTarget(w) && !fams.has(P[w].rest) && free.some((x) => x !== w && steady(x) && sameRest(x, w)) && free.some((x) => x !== w && sameOn(x, w) && !sameV(x, w)));', 'const pa = free.find((x) => x !== tg && steady(x) && sameRest(x, tg)),');
  const LOG = span(FACTORY, 'const canTarget = (w) => !P[w].noTarget;', 'const a = free[0], c = free.find((w) => w !== a && !sameOn(w, a) && !sameV(w, a));');
  const ORDER = span(FACTORY, 'const o = shuffle(rows.map((_, i) => i), rng), re = o.map((i) => rows[i]);', 'if (/(.)\\1\\1/.test(ks)) continue; }');
  return [
    // ---------------------------------------------------------------- every page: letters, lines, sizes
    ['the page does not mark its letters as unjoined', FACTORY, 'data-lcs-or="${mode}|${lv}" data-lcs-noliga="1"', 'data-lcs-or="${mode}|${lv}"', 'K-681', 1, null, /ligatures/],
    ['an f before i has no room of its own (first sound)', FACTORY, 'text.replace(/f(?=[iflt])|t(?=t)/g,', 'text.replace(/zq(?=x)/g,', 'K-682', 1, null, /room of its own/],
    ['a task line changed in the factory only', FACTORY, "const LINES = {\n  blend: { 1: ['Your teacher says the first sound", "const LINES = {\n  blend: { 1: ['Your teacher reads the first sound", 'K-681', 1, null, /task line 1 is not the line/],
    ['verify’s copy of the level-1 instruction changed', FACTORY, "    blend: { 1: 'Blend the first sound and the rest to make a word.',", "    blend: { 1: 'Blend the first sound and the rest to make a new word.',", 'K-681', 1, null, /instruction is not the one of level 1/],
    ['pictures smaller than 60 px', FACTORY, '2: { rows: 7, pic: 72, kpic: 62 }, 3:', '2: { rows: 7, pic: 50, kpic: 62 }, 3:', 'K-681', 2, null, /smaller than 60/],
    ['fewer rows than the level holds', FACTORY, 'blend: { 1: { rows: 6, pic: 86', 'blend: { 1: { rows: 4, pic: 86', 'K-681', 1, null, /rows, not 6/],
    // ---------------------------------------------------------------- the teacher lines (on the key only) and the key's tag
    ['the teacher lines on the page of the child (K-681)', FACTORY, "    if (key) blocks.push(strip('blend', plan.rows.map((rw) => blendSay(rw.target))));", "    blocks.push(strip('blend', plan.rows.map((rw) => blendSay(rw.target))));", 'K-681', 1, null, /teacher lines stand on the page of the child|text of the teacher lines/],
    ['the teacher lines on the page of the child (K-682)', FACTORY, '      if (key) blocks.push(strip(\'split\', plan.cards.map(splitSay)));', '      blocks.push(strip(\'split\', plan.cards.map(splitSay)));', 'K-682', 1, null, /teacher lines stand on the page of the child|text of the teacher lines/],
    ['the key’s teacher lines miss a row', FACTORY, "strip('blend', plan.rows.map((rw) => blendSay(rw.target)))", "strip('blend', plan.rows.slice(1).map((rw) => blendSay(rw.target)))", 'K-681', 2, 'key', /teacher lines for|do not say the parts/],
    ['the teacher lines printed at 14 px', FACTORY, "white-space:nowrap;font:600 16px/1.35 'Nunito'", "white-space:nowrap;font:600 14px/1.35 'Nunito'", 'K-681', 1, 'key', /teacher reads is 14 px/],
    ['the teacher lines do not say they are read aloud', FACTORY, "const TSTRIP = 'For the teacher: read these lines aloud.';", "const TSTRIP = 'Teacher strip.';", 'K-681', 1, 'key', /read aloud/],
    ['a blank band above the teacher lines', FACTORY, 'gap:4px;padding-top:8px;border-top:2px solid ${T.inkSoft}', 'gap:4px;padding-top:80px;border-top:2px solid ${T.inkSoft}', 'K-681', 1, 'key', /blank band/],
    ['the key does not say "Answer key"', FACTORY, "const pic = key ? d.kpic : d.pic, tag = key ? keyTag() : '';", "const pic = key ? d.kpic : d.pic, tag = '';", 'K-681', 1, 'key', /does not say "Answer key"/],
    ['the page of the child says "Answer key"', FACTORY, "const pic = key ? d.kpic : d.pic, tag = key ? keyTag() : '';", "const pic = key ? d.kpic : d.pic, tag = keyTag();", 'K-682', 1, null, /says it is the answer key/],
    ['the "Answer key" tag over the task line', FACTORY, 'right:14px;top:-17px;padding:2px 10px;', 'right:14px;top:6px;padding:2px 10px;', 'K-681', 2, 'key', /tag touches/],
    // ---------------------------------------------------------------- K-681 blend the first sound and the rest
    ['level 1: two pictures of a row with one first sound', FACTORY, 'const a = free[0], c = free.find((w) => w !== a && !sameOn(w, a) && !sameV(w, a));', 'const a = free[0], c = free.find((w) => w !== a && !sameV(w, a));', 'K-681', 1, null, /three different sounds/],
    ['level 2: a row with two first sounds', FACTORY, 'const a = free[0], c = free.find((w) => w !== a && sameOn(w, a) && !sameV(w, a));', 'const a = free[0], c = free.find((w) => w !== a && !sameOn(w, a) && !sameV(w, a));', 'K-681', 2, null, /start with one sound/],
    ['level 2: two pictures of a row with one vowel', FACTORY, L2, subs(L2, [
      ['const a = free[0], c = free.find((w) => w !== a && sameOn(w, a) && !sameV(w, a));', 'const a = free.find((w) => free.some((x) => x !== w && sameOn(x, w) && sameV(x, w)) && free.some((x) => x !== w && sameOn(x, w) && !sameV(x, w))) || free[0], c = free.find((w) => w !== a && sameOn(w, a) && !sameV(w, a));'],
      ['const e = c && free.find((w) => w !== a && w !== c && sameOn(w, a) && !sameV(w, a) && !sameV(w, c));', 'const e = c && (free.find((w) => w !== a && w !== c && sameOn(w, a) && sameV(w, a)) || free.find((w) => w !== a && w !== c && sameOn(w, a) && !sameV(w, c)));'],
      ['if (!row || !rowFair(row.ws)) { ok = false; break; }', 'if (!row) { ok = false; break; }']]), 'K-681', 2, null, /three different vowels|one first sound and one vowel/],
    ['log as the picture to circle', FACTORY, LOG, subs(LOG, [
      ['const canTarget = (w) => !P[w].noTarget;', 'const canTarget = (w) => true;'],
      ['const pickTarget = (ws) => { const c = ws.filter(canTarget); return c.length ? c[rng.int(0, c.length - 1)] : null; };', "const pickTarget = (ws) => (ws.includes('log') ? 'log' : ws[rng.int(0, ws.length - 1)]);"],
      ['const a = free[0], c = free.find((w) => w !== a && !sameOn(w, a) && !sameV(w, a));', "const a = free.includes('log') ? 'log' : free[0], c = free.find((w) => w !== a && !sameOn(w, a) && !sameV(w, a));"]]), 'K-681', 1, null, /name another way/],
    ['level 3: no row of three rhymes', FACTORY, '3: { rows: 7, pic: 72, kpic: 62, rhyme: [1, 2], end: 2 } },', '3: { rows: 7, pic: 72, kpic: 62, rhyme: [0], end: 2 } },', 'K-681', 3, null, /of three rhymes/],
    ['level 3: the rows of one kind in a block', FACTORY, ORDER, subs(ORDER, [
      ['const o = shuffle(rows.map((_, i) => i), rng), re = o.map((i) => rows[i]);', 'const o = rows.map((_, i) => i).sort((p, q) => rows[p].kind.localeCompare(rows[q].kind)), re = o.map((i) => rows[i]);'],
      ['if (/(.)\\1\\1/.test(ks)) continue; }', '}']]), 'K-681', 3, null, /three rows of one kind/],
    ['level 3: the decoy does not share the first sound', FACTORY, 'de = free.find((x) => x !== tg && sameOn(x, tg) && !sameV(x, tg) && x !== pa)', 'de = free.find((x) => x !== tg && !sameOn(x, tg) && !sameV(x, tg) && x !== pa)', 'K-681', 3, null, /not a row of three rhymes/],
    ['level 3: dog and log keyed as one rest', FACTORY, CHAIN, subs(CHAIN, [
      ['const tg = free.find((w) => steady(w) && canTarget(w)', "const tg = ['dog', 'log'].every((w) => free.includes(w)) && free.some((x) => x !== 'log' && sameOn(x, 'log') && !sameV(x, 'log')) ? 'log' : free.find((w) => steady(w) && canTarget(w)"],
      ['const pa = free.find((x) => x !== tg && steady(x) && sameRest(x, tg)),', 'const pa = free.find((x) => x !== tg && sameRest(x, tg)),']]), 'K-681', 3, null, /some say another way/],
    ['the circled picture the only one of its class in many rows', FACTORY, 'if (rows.filter((rw) => oddClass(rw.ws, P) === rw.target).length > Math.floor(d.rows / 3)) continue;', 'if (lv === 1 ? rows.filter((rw) => oddClass(rw.ws, P) === rw.target).length < 3 : rows.filter((rw) => oddClass(rw.ws, P) === rw.target).length > Math.floor(d.rows / 3)) continue;', 'K-681', 1, null, /only one of its class/],
    ['the pictures to circle in a staircase', FACTORY, '.length > Math.floor(d.rows / 3)) continue;\n      const at = mixedPlaces(d.rows, 3, rng);', '.length > Math.floor(d.rows / 3)) continue;\n      const at = Array.from({ length: d.rows }, (_, i) => i % 3);', 'K-681', 2, null, /stand in a pattern/],
    ['the key’s teacher lines say the first sound twice', FACTORY, 'const blendSay = (w) => `<span data-lcs-parts>${esc(say(BANK.pics[w].on))} … ${esc(say(BANK.pics[w].rest))}</span>', 'const blendSay = (w) => `<span data-lcs-parts>${esc(say(BANK.pics[w].on))} … ${esc(say(BANK.pics[w].on))}</span>', 'K-681', 1, 'key', /do not say the parts/],
    ['the key does not circle the picture', FACTORY, "${key && w === rw.target ? ring('-4px -6px') : ''}", "${''}", 'K-681', 1, 'key', /key does not circle/],
    ['a ring on the page of the child', FACTORY, "${key && w === rw.target ? ring('-4px -6px') : ''}", "${w === rw.target ? ring('-4px -6px') : ''}", 'K-681', 2, null, /answer is marked/],
    // ---------------------------------------------------------------- K-682 say the first sound and the rest
    ['level 1 words whose first sound cannot be stretched', FACTORY, '(lv === 1 ? (b.continuous || []).includes(P[w].on) : STOPS.includes(P[w].on))', '(lv === 1 ? STOPS.includes(P[w].on) : (b.continuous || []).includes(P[w].on))', 'K-682', 1, null, /one can stretch/],
    ['boxes too small for a dot', FACTORY, 'split: { 1: { cards: 4, cols: 2, pic: 156, kpic: 140, box: 72, rest: 132 }', 'split: { 1: { cards: 4, cols: 2, pic: 156, kpic: 140, box: 50, rest: 132 }', 'K-682', 1, null, /boxes are smaller than 72/],
    ['the key prints the rest in the first-sound box', FACTORY, "color:${T.teal}\">${key ? esc(say(BANK.pics[w].on)) : ''}</span>", "color:${T.teal}\">${key ? esc(say(BANK.pics[w].rest)) : ''}</span>", 'K-682', 2, 'key', /does not print the two parts/],
    ['level 3: the task line does not say rhyme', FACTORY, "    3: ['Say each picture name in two parts: the first sound, then the rest. Touch the boxes as you say them.', 'Circle the two pictures in each row that rhyme: they have the same rest.'] },\n};", "    3: ['Say each picture name in two parts: the first sound, then the rest. Touch the boxes as you say them.', 'Circle the two pictures in each row that have the same rest.'] },\n};", 'K-682', 3, null, /task line 2 is not the line/],
    ['level 3: the third picture has the vowel of the two', FACTORY, '!sameRest(x, a) && !sameV(x, a) && rowFair([a, c, x]));\n        // the odd one shares its first sound with one of the two where the bank allows (the rest must be listened to)\n        const odd = others.find((x) => sameOn(x, a) || sameOn(x, c)) || others[0];',
      '!sameRest(x, a) && rowFair([a, c, x]));\n        // the odd one shares its first sound with one of the two where the bank allows (the rest must be listened to)\n        const odd = others.find((x) => sameV(x, a)) || others[0];', 'K-682', 3, null, /another rest and another vowel/],
    ['level 3: dog and log keyed as one rest', FACTORY, 'const a = free.find((w) => steady(w) && free.some((x) => x !== w && steady(x) && sameRest(x, w)) && !rows.some((rw) => sameRest(rw.pair[0], w)));\n        if (!a) { ok = false; break; }\n        const c = free.find((x) => x !== a && steady(x) && sameRest(x, a));',
      "const a = ['dog', 'log'].every((w) => free.includes(w)) && !rows.some((rw) => sameRest(rw.pair[0], 'dog')) ? 'dog' : free.find((w) => steady(w) && free.some((x) => x !== w && steady(x) && sameRest(x, w)) && !rows.some((rw) => sameRest(rw.pair[0], w)));\n        if (!a) { ok = false; break; }\n        const c = free.find((x) => x !== a && sameRest(x, a));", 'K-682', 3, null, /some say another way/],
    ['level 3: the key’s teacher lines name the row backward', FACTORY, "plan.rows.map((rw) => rw.ws.map(splitSay).join(' · '))", "plan.rows.map((rw) => rw.ws.slice().reverse().map(splitSay).join(' · '))", 'K-682', 3, 'key', /do not name the three pictures/],
    // ---------------------------------------------------------------- the bank
    ['a black-and-white picture', BANK, '"pets",\n    "cat"', '"pets bw",\n    "cat"', 'K-681', 1, null, /colour theme/],
    ['a first sound of two consonants', BANK, '"on": "k",\n   "rest": "ăt"', '"on": "kr",\n   "rest": "ăt"', 'K-681', 1, null, /ONE consonant sound|first letter/],
    ['a rest with two vowels', BANK, '"rest": "ăt",\n   "v": "ă"', '"rest": "ăăt",\n   "v": "ă"', 'K-681', 1, null, /ONE vowel/],
    ['a first sound that is not the sound of the first letter', BANK, '"on": "h",', '"on": "b",', 'K-681', 1, null, /first letter|same parts/],
    ['a refused picture as a picture word', BANK, '"hat": {', '"ship": {', 'K-681', 1, null, /refused/],
    ['the doll (a girl) back as a picture word', BANK, '"cat": {', '"doll": {', 'K-681', 1, null, /refused/],
    ['a model word as a picture word', BANK, '"modelOnly": [\n  "mop",', '"modelOnly": [\n  "cat",', 'K-681', 1, null, /model-only/],
    ['a stop sound on the list of sounds one can stretch', BANK, '"continuous": [\n  "f",', '"continuous": [\n  "b",', 'K-682', 1, null, /stop sound/],
    ['a mark that never-the-picture-to-circle is not true', BANK, '"noTarget": true', '"noTarget": 1', 'K-681', 1, null, /noTarget is not true/],
    ['too few rests that three steady words share', BANK, '"kind": "lock",', '"alt": [\n    "ô"\n   ],\n   "kind": "lock",', 'K-681', 3, null, /three steady words share/],
  ];
};
