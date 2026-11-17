/**
 * The planted faults of poison-sound-position-g1.js (types/_shared/sound-position-g1.js and
 * data/literacy/sound-position-g1.en.json): [name, file, text to find, its replacement, type, level, 'key' when the fault
 * shows on the answer key only, and the pattern the NEW report must match]. Every text must stand in its file exactly once
 * (bank: at least once; the first one is changed); the poison script refuses to run otherwise. A fault counts as caught only
 * when the pages report something their clean run does not (the clean control must report nothing).
 */
'use strict';
const fs = require('fs');
// A rule the factory holds in two places is removed in BOTH; a level the fault does not test must still draw, or the
// factory's load-time check refuses the whole module and the page never shows the defect. span() reads the text between two
// anchors from the LIVE factory; sub() refuses a change whose text is not in the span exactly once (2026-11-17).
const span = (file, from, to) => {
  const s = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'), i = s.indexOf(from), j = i < 0 ? -1 : s.indexOf(to, i);
  if (i < 0 || j < 0) throw new Error('fault anchor not found: ' + (i < 0 ? from : to));
  return s.slice(i, j + to.length);
};
const sub = (s, a, b) => { if (s.split(a).length !== 2) throw new Error('fault change not found once: ' + a); return s.replace(a, () => b); };
const subs = (s, pairs) => pairs.reduce((t, [a, b]) => sub(t, a, b), s);
const L2 = '(d.asks.length === 3 && !d.write)';
// two words a dialect vowel joins (bag and leg: ā or ĕ; fan and pen: ĕ) must never be keyed as sharing ONE sound: the fault
// drops the dialect vowels from the draw's comparison and takes the pair first; verify keeps them (review 2026-11-17, H)
const PAIR = (x, y) => (t) => subs(t, [
  ['function shareOf(a, b) { const vs = (w) => [w.sounds[1], ...(w.alt || [])];', 'function shareOf(a, b) { const vs = (w) => [w.sounds[1]];'],
  ['const a = free[0], c = free.find((x) => { if (x === a) return false; const s = shareOf(Wd[a], Wd[x]); return s.sure && !s.cross && d.pos.includes(POS[s.same[0]]); });',
   `const a = free.includes('${x}') && free.includes('${y}') ? '${x}' : free[0], c = a === '${x}' && free.includes('${y}') ? '${y}' : free.find((x) => { if (x === a) return false; const s = shareOf(Wd[a], Wd[x]); return s.sure && !s.cross && d.pos.includes(POS[s.same[0]]); });`]]);
module.exports = (FACTORY, BANK) => {
  const MID = span(FACTORY, 'if (d.asks.some((p) => asks.filter((x) => x === p).length < (d.asks.length === 2 ? 4 : 3))) continue;', '!placesOk(k.slice(6), d.asks.length)) continue;');
  const SHARE = span(FACTORY, 'function shareOf(a, b) { const vs = (w) => [w.sounds[1], ...(w.alt || [])];', 'const a = free[0], c = free.find((x) => { if (x === a) return false; const s = shareOf(Wd[a], Wd[x]); return s.sure && !s.cross && d.pos.includes(POS[s.same[0]]); });');
  return [
    // ---------------------------------------------------------------- every page
    ['the page does not mark its letters as unjoined', FACTORY, 'data-lcs-sp="${mode}|${lv}" data-lcs-noliga="1"', 'data-lcs-sp="${mode}|${lv}"', 'G1-624', 1, null, /ligatures/],
    ['an f before i has no room of its own (first)', FACTORY, 'text.replace(/f(?=[iflt])|t(?=t)/g,', 'text.replace(/zq(?=x)/g,', 'G1-625', 2, null, /room of its own/],
    ['a task line changed in the factory only', FACTORY, "const LINES = {\n  where: { 1: ['Your teacher says a picture word", "const LINES = {\n  where: { 1: ['Your teacher reads a picture word", 'G1-624', 1, null, /task line 1 is not the line/],
    ['verify’s copy of the level-1 instruction changed', FACTORY, "    where: { 1: 'A sound can come first or last in a word.',", "    where: { 1: 'A sound can come first in a word.',", 'G1-624', 1, null, /instruction is not the one of level 1/],
    ['pictures smaller than 60 px', FACTORY, "share: { 1: { rows: 5, pos: ['first', 'last'], pic: 76, kpic: 66, tbox: 32 }", "share: { 1: { rows: 5, pos: ['first', 'last'], pic: 50, kpic: 66, tbox: 32 }", 'G1-625', 1, null, /smaller than 60/],
    // ---------------------------------------------------------------- the teacher lines (on the key only) and the key's tag
    ['the teacher lines on the page of the child (G1-624)', FACTORY, "    if (key) blocks.push(strip('where', plan.cards.map(", "    blocks.push(strip('where', plan.cards.map(", 'G1-624', 1, null, /text of the teacher lines/],
    ['the teacher lines on the page of the child (G1-625)', FACTORY, "    if (key) blocks.push(strip('share', plan.rows.map(", "    blocks.push(strip('share', plan.rows.map(", 'G1-625', 1, null, /text of the teacher lines/],
    ['the key’s teacher lines miss a picture', FACTORY, "strip('where', plan.cards.map((c) =>", "strip('where', plan.cards.slice(1).map((c) =>", 'G1-624', 2, 'key', /teacher lines for|do not say/],
    ['the teacher lines do not say they are read aloud', FACTORY, "const TSTRIP = 'For the teacher: read these lines aloud.';", "const TSTRIP = 'Teacher strip.';", 'G1-625', 1, 'key', /read aloud/],
    ['the key does not say "Answer key"', FACTORY, "blocks.push(cream('data-lcs-task=\"where\"', (key ? keyTag() : '') +", "blocks.push(cream('data-lcs-task=\"where\"', (false ? keyTag() : '') +", 'G1-624', 1, 'key', /does not say "Answer key"/],
    ['the page of the child says "Answer key"', FACTORY, "blocks.push(cream('data-lcs-task=\"share\"', (key ? keyTag() : '') +", "blocks.push(cream('data-lcs-task=\"share\"', (true ? keyTag() : '') +", 'G1-625', 1, null, /says it is the answer key/],
    // ---------------------------------------------------------------- G1-624 first, middle, or last?
    ['a middle sound asked on level 1', FACTORY, "where: { 1: { n: 12, box: 50, pic: 84, kpic: 76, asks: ['first', 'last'] }", "where: { 1: { n: 12, box: 50, pic: 84, kpic: 76, asks: ['first', 'middle', 'last'] }", 'G1-624', 1, null, /not asked on this level|asked fewer|places asked/],
    ['a middle asked of a vowel some say another way', FACTORY, "return i >= 0 && !(pos === 'middle' && wd.alt) && !(pos === 'first' && wd.noFirst) &&", "return i >= 0 && !(pos === 'first' && wd.noFirst) &&", 'G1-624', 2, null, /said more than one way/],
    ['the first sound of dress, drum, or truck asked', FACTORY, "return i >= 0 && !(pos === 'middle' && wd.alt) && !(pos === 'first' && wd.noFirst) &&", "return i >= 0 && !(pos === 'middle' && wd.alt) &&", 'G1-624', 1, null, /dr or tr/],
    ['a word whose sound stands in two places (pop)', BANK, '"pot": {\n   "pic": [\n    "kitchen tools",\n    "pot"\n   ],\n   "kind": "pot",\n   "cls": "thing",\n   "sounds": [\n    "p",\n    "ŏ",\n    "t"\n   ],\n   "letters": [\n    "p",\n    "o",\n    "t"\n   ]', '"pop": {\n   "pic": [\n    "kitchen tools",\n    "pot"\n   ],\n   "kind": "pop",\n   "cls": "thing",\n   "sounds": [\n    "p",\n    "ŏ",\n    "p"\n   ],\n   "letters": [\n    "p",\n    "o",\n    "p"\n   ]', 'G1-624', 1, null, /no sound of it can be asked/],
    ['level 3: a sound spelled by two letters to write', FACTORY, "const writable = (wd, pos) => { const i = boxOf(wd, pos); return i >= 0 && wd.letters[i].length === 1 && wd.sounds[i] !== 'k'; };", 'const writable = (wd, pos) => { const i = boxOf(wd, pos); return i >= 0; };', 'G1-624', 3, null, /spelled by one letter/],
    // twelve asks of first and last alone never pass the place balance two lines below: on level 2 only, the fault keeps
    // pages with one middle sound at most and drops both guards
    ['too few middle sounds on level 2', FACTORY, MID, subs(MID, [
      ['if (d.asks.some((p) => asks.filter((x) => x === p).length < (d.asks.length === 2 ? 4 : 3))) continue;', 'if (' + L2 + " ? asks.filter((x) => x === 'middle').length > 1 : d.asks.some((p) => asks.filter((x) => x === p).length < (d.asks.length === 2 ? 4 : 3))) continue;"],
      ['if (!placesOk(k, d.asks.length) || !placesOk(k.slice(0, 6), d.asks.length) || !placesOk(k.slice(6), d.asks.length)) continue;', 'if (!' + L2 + ' && (!placesOk(k, d.asks.length) || !placesOk(k.slice(0, 6), d.asks.length) || !placesOk(k.slice(6), d.asks.length))) continue;']]), 'G1-624', 2, null, /asked fewer than 3 times|pattern/],
    ['the places asked in a pattern down a column', FACTORY, 'if (!placesOk(k, d.asks.length) || !placesOk(k.slice(0, 6), d.asks.length) || !placesOk(k.slice(6), d.asks.length)) continue;', 'if (!placesOk(k, d.asks.length) || placesOk(k.slice(0, 6), d.asks.length)) continue;', 'G1-624', 2, null, /follow a pattern/],
    ['boxes too small to write a letter', FACTORY, '3: { n: 12, box: 60, pic: 84, kpic: 76, asks: POS, write: true }', '3: { n: 12, box: 50, pic: 84, kpic: 76, asks: POS, write: true }', 'G1-624', 3, null, /box smaller than 60/],
    ['the key’s teacher lines say another sound', FACTORY, '<span data-lcs-ssound>${esc(say(c.sound))}</span>', "<span data-lcs-ssound>${esc(say(BANK.words[c.word].sounds[0]))}</span>", 'G1-624', 2, 'key', /do not say/],
    ['the key marks the first box always', FACTORY, 'soundBoxes(c.word, d.box, key ? c.box : -1,', 'soundBoxes(c.word, d.box, key ? 0 : -1,', 'G1-624', 2, 'key', /does not mark the box/],
    ['a box marked on the page of the child', FACTORY, 'soundBoxes(c.word, d.box, key ? c.box : -1,', 'soundBoxes(c.word, d.box, c.box,', 'G1-624', 1, null, /answer is marked/],
    // ---------------------------------------------------------------- G1-625 two words, one sound
    ['a pair that shares two places', FACTORY, 'return s.sure && !s.cross && d.pos.includes(POS[s.same[0]]); });', 'return s.same.length >= 1 && d.pos.includes(POS[s.same[0]]); });', 'G1-625', 2, null, /share one sound in one place/],
    ['bag and leg keyed as sharing one sound (the vowel too for many)', FACTORY, SHARE, PAIR('bag', 'leg')(SHARE), 'G1-625', 1, null, /share one sound in one place/],
    ['fan and pen keyed as sharing one sound (the vowel too for many)', FACTORY, SHARE, PAIR('fan', 'pen')(SHARE), 'G1-625', 1, null, /share one sound in one place/],
    ['flag and leg keyed as sharing one sound (the vowel too for many)', FACTORY, SHARE, PAIR('flag', 'leg')(SHARE), 'G1-625', 1, null, /share one sound in one place/],
    ['level 3: a third picture that shares a sound', FACTORY, 'const e = free.find((x) => x !== a && x !== c && [a, c].every((y) => { const s = shareOf(Wd[x], Wd[y]); return !s.same.length && !s.cross; }));', 'const e = free.find((x) => x !== a && x !== c && [a].every((y) => { const s = shareOf(Wd[x], Wd[y]); return !s.same.length && !s.cross; }));', 'G1-625', 3, null, /third picture shares a sound/],
    ['the places shared in a pattern', FACTORY, 'if (!placesOk(k, d.pos.length) || (d.pos.length === 3 && !d.three && new Set(k).size < 3)) continue;', 'if (placesOk(k, d.pos.length)) continue;', 'G1-625', 1, null, /follow a pattern/],
    ['level 2 without a middle shared', FACTORY, '(d.pos.length === 3 && !d.three && new Set(k).size < 3)) continue;', '(d.pos.length === 3 && !d.three && k.includes(1))) continue;', 'G1-625', 2, null, /not every place is shared/],
    ['the key circles the wrong place', FACTORY, "${key && p === x.pos ? ring('999px') : ''}", "${key && p !== x.pos ? ring('999px') : ''}", 'G1-625', 2, 'key', /does not circle the place/],
    ['the key does not circle the two pictures', FACTORY, "${key && ok && d.three ? ring('16px') : ''}", "${''}", 'G1-625', 3, 'key', /does not circle the two pictures/],
    ['too few boxes to touch', FACTORY, '${[0, 1, 2].map(() => `<span data-lcs-tbox', '${[0, 1].map(() => `<span data-lcs-tbox', 'G1-625', 1, null, /three boxes to touch/],
    ['the key’s teacher lines name the pictures in another order', FACTORY, "plan.rows.map((x) => `<span data-lcs-snames>${x.ws.map(esc).join(', ')}</span>`)", "plan.rows.map((x) => `<span data-lcs-snames>${x.ws.slice().reverse().map(esc).join(', ')}</span>`)", 'G1-625', 2, 'key', /do not name its pictures/],
    // round 2: padding under the rule of the teacher lines was not blank to the band check (the first run missed this)
    ['a blank band above the teacher lines', FACTORY, 'gap:3px;padding-top:8px;border-top:2px solid ${T.inkSoft}', 'gap:3px;padding-top:80px;border-top:2px solid ${T.inkSoft}', 'G1-624', 1, 'key', /blank band/],
    // ---------------------------------------------------------------- the bank
    ['a black-and-white picture', BANK, '"pets",\n    "cat"', '"pets bw",\n    "cat"', 'G1-624', 1, null, /colour picture/],
    ['letters that do not spell the word', BANK, '"letters": [\n    "c",\n    "a",\n    "t"', '"letters": [\n    "k",\n    "a",\n    "t"', 'G1-624', 1, null, /do not spell the word/],
    ['a word with two vowels', BANK, '"sounds": [\n    "k",\n    "ă",\n    "t"', '"sounds": [\n    "k",\n    "ă",\n    "ĕ"', 'G1-624', 1, null, /one short vowel/],
    ['a refused picture as a picture word', BANK, '"hat": {', '"mop": {', 'G1-624', 1, null, /refused|model word/],
    ['the doll (a girl) back as a picture word', BANK, '"cat": {', '"doll": {', 'G1-624', 1, null, /refused/],
    ['the duckling back as a picture word', BANK, '"bat": {', '"duck": {', 'G1-624', 1, null, /refused/],
    ['dress without its mark', BANK, '"noFirst": true,', '"noFirstX": true,', 'G1-624', 1, null, /dr or tr/],
  ];
};
