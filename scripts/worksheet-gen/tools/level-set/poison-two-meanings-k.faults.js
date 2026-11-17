/**
 * The planted faults of poison-two-meanings-k.js (types/_shared/two-meanings-k.js and data/literacy/two-meanings-k.en.json):
 * [name, file, text to find, its replacement, type, level, 'key' when the fault shows on the answer key only, and the
 * pattern the NEW report must match]. Every text must stand in its file exactly once (bank: at least once; the first one is
 * changed); the poison script refuses to run otherwise. A fault counts as caught only when the pages report something their
 * clean run does not (the clean control must report nothing).
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
module.exports = (FACTORY, BANK) => {
  const FIRST = span(FACTORY, 'const r = rng.int(0, 1), ms = Wd[w].m, sr = shuffle(ms[r].sents, rng)', 'm.id === x.right))).size < 2) continue;');
  const ODD = span(FACTORY, 'const fw = shuffle(Object.keys(F), rng).find((fw) => fillerOk(fw, used, sents, ws));', 'if (odd > Math.floor(d.rows / 2)) continue;');
  const SAME = span(FACTORY, 'if (perm.some((j, i) => Math.abs(yr(j) - yl(i)) < (H / m) / 2 + 2)) return false;', 'if (new Set(off).size === 1) return false;');
  return [
    // ---------------------------------------------------------------- every page
    ['the page does not mark its letters as unjoined', FACTORY, 'data-lcs-tm="${mode}|${lv}" data-lcs-noliga="1"', 'data-lcs-tm="${mode}|${lv}"', 'K-683', 1, null, /ligatures/],
    ['an f before i has no room of its own (first sentence)', FACTORY, 'text.replace(/f(?=[iflt])|t(?=t)/g,', 'text.replace(/zq(?=x)/g,', 'K-683', 3, 'key', /room of its own/],
    ['a task line changed in the factory only', FACTORY, "const LINES = {\n  choose: { 1: ['Your teacher reads a sentence", "const LINES = {\n  choose: { 1: ['Your teacher says a sentence", 'K-683', 1, null, /task line 1 is not the line/],
    ['verify’s copy of the level-2 instruction changed', FACTORY, "    match: { 1: 'One word can name two different things.', 2: 'One word can name two different things.',", "    match: { 1: 'One word can name two different things.', 2: 'One word can name two things.',", 'K-684', 2, null, /instruction is not the one of level 2/],
    ['pictures smaller than 60 px', FACTORY, '2: { rows: 4, opts: 3, pic: 124, kpic: 104 }', '2: { rows: 4, opts: 3, pic: 50, kpic: 104 }', 'K-683', 2, null, /smaller than 60/],
    ['the word of a row printed small', FACTORY, "font:800 26px/1.1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap;${more}", "font:800 18px/1.1 'Nunito',sans-serif;color:${T.ink};white-space:nowrap;${more}", 'K-684', 1, null, /word for the teacher is printed at 18 px/],
    // ---------------------------------------------------------------- the teacher lines (on the key only) and the key's tag
    ['the sentences on the page of the child', FACTORY, '    if (key) {\n      const item = (x, i) => d.two', '    if (true) {\n      const item = (x, i) => d.two', 'K-683', 1, null, /teacher lines stand on the page of the child|sentence or a text of the teacher lines/],
    ['the key reads no sentence for a row', FACTORY, "plan.rows.map(item).join('') + `</div>`);", "plan.rows.slice(1).map(item).join('') + `</div>`);", 'K-683', 2, 'key', /sentences on the key for|does not read a sentence/],
    ['the key does not say "Answer key"', FACTORY, "const L = LINES[mode][lv], tag = key ? keyTag() : '';", "const L = LINES[mode][lv], tag = '';", 'K-684', 1, 'key', /does not say "Answer key"/],
    ['the page of the child says "Answer key"', FACTORY, "const L = LINES[mode][lv], tag = key ? keyTag() : '';", "const L = LINES[mode][lv], tag = keyTag();", 'K-683', 1, null, /says it is the answer key/],
    ['the key does not say which sentence is circled', FACTORY, "s2: 'Second sentence (children draw a line under):' };", "s2: 'Line under:' };", 'K-683', 3, 'key', /which sentence is circled/],
    ['the key does not say both marks may stand under one picture', FACTORY, "const TSAME = 'Sometimes both sentences use the same meaning: then both marks go under one picture.';", "const TSAME = 'Read them slowly.';", 'K-683', 3, 'key', /how to read the sentences/],
    // ---------------------------------------------------------------- K-683 words with two meanings
    ['every row keys the meaning listed first', FACTORY, FIRST, subs(FIRST, [['const r = rng.int(0, 1)', 'const r = 0'], ['if (new Set(rows.map((x) => Wd[x.word].m.findIndex((m) => m.id === x.right))).size < 2) continue;', '']]), 'K-683', 1, null, /same meaning of its word/],
    ['the pictures to circle in a staircase', FACTORY, 'const at = []; for (let k = 0; k < 400 && !at.length; k++) { const p = rows.map(() => rng.int(0, d.opts - 1)); if (placesOk(p, d.opts)) at.push(...p); }', 'const at = rows.map((_, i) => i % d.opts);', 'K-683', 2, null, /stand in a pattern/],
    // with this bank a filler can share only the OTHER meaning's class of bat, ear, palm, or heart (and assoc keeps leaf off
    // palm, star off heart), so no clean draw can make more than two of four rows odd: the fault picks that filler and keeps
    // only pages with three odd rows
    ['the right picture the only one of its class in many rows', FACTORY, ODD, subs(ODD, [
      ['const fw = shuffle(Object.keys(F), rng).find((fw) => fillerOk(fw, used, sents, ws));', 'const fw = Object.keys(F).find((fw) => !used.includes(fw) && F[fw][2] === Wd[x.word].m.find((m) => m.id === x.alt).cls) || shuffle(Object.keys(F), rng).find((fw) => fillerOk(fw, used, sents, ws));'],
      ['if (odd > Math.floor(d.rows / 2)) continue;', 'if (odd <= Math.floor(d.rows / 2)) continue;']]), 'K-683', 2, null, /only one of its class/],
    ['level 3: no row reads two sentences of one meaning', FACTORY, 'kpic: 88, two: true, same: [1, 2] } },', 'kpic: 88, two: true, same: [0] } },', 'K-683', 3, null, /rows read two sentences of one meaning/],
    ['level 3: the third picture a thing that is no meaning', FACTORY, 'opts.push({ w: w2, m: m2, filler: true, mean: true }); }', 'opts.push({ w: Object.keys(F).find((fw) => !used.includes(fw) && fillerOk(fw, used, sents, ws)), filler: true }); }', 'K-683', 3, null, /not a meaning of another word of the page/],
    ['a sentence of the other meaning for the circle', FACTORY, '<span data-lcs-s1>${esc(x.s1)}</span>`) + `</div>`;', '<span data-lcs-s1>${esc(BANK.words[x.word].m.find((m) => m.id === x.alt).sents[0][0])}</span>`) + `</div>`;', 'K-683', 1, 'key', /does not read a sentence for the meaning keyed/],
    ['the ball as the other picture of a row, whatever the page', FACTORY, 'const fw = shuffle(Object.keys(F), rng).find((fw) => fillerOk(fw, used, sents, ws));', "const fw = ['ball', ...shuffle(Object.keys(F), rng)].find((fw) => !used.includes(fw));", 'K-683', 2, null, /named in a sentence|goes with/],
    ['the key does not circle the right picture', FACTORY, "${key && right ? ring() : ''}", "${''}", 'K-683', 1, 'key', /key does not circle/],
    ['the key draws no line under the picture of the second sentence', FACTORY, "${key && other ? underline() : ''}", "${''}", 'K-683', 3, 'key', /line under the picture of the second sentence/],
    ['a ring on the page of the child', FACTORY, "${key && right ? ring() : ''}", "${right ? ring() : ''}", 'K-683', 2, null, /answer is marked/],
    // ---------------------------------------------------------------- K-684 two pictures, one word
    ['the old task line ("the same name")', FACTORY, "  match: { 1: ['Your teacher reads each word. Draw a line to the other picture that the same word names.'],\n    2:", "  match: { 1: ['Your teacher reads each word. Draw a line from each picture to the picture with the same name.'],\n    2:", 'K-684', 1, null, /task line 1 is not the line/],
    ['the new meaning on the left', FACTORY, "const pick = fam ? [kind === 'pair' ? fam : ms.find((x) => x !== fam)] : ms;", "const pick = fam ? [kind === 'pair' ? ms.find((x) => x !== fam) : fam] : ms;", 'K-684', 1, null, /not its familiar meaning/],
    ['the word under its picture', FACTORY, '${wordTag(x.word)}${img(x.word, x.left, picL)}</div>`).join(\'\');', '${img(x.word, x.left, picL)}${wordTag(x.word)}</div>`).join(\'\');', 'K-684', 1, null, /word does not stand above its picture/],
    ['a partner straight across', FACTORY, 'if (matchOk(p, n, m, H)) out.push(p.slice());', 'out.push(p.slice());', 'K-684', 1, null, /straight across|same number of rows/],
    // a constant offset other than 0 is no permutation when both columns have four rows, so the fault drops the straight-across
    // guard too, where the columns are equal only (levels 2 and 3 must still draw); the walk then has one line pattern only,
    // which the load-time check also reports
    ['every partner the same number of rows away', FACTORY, SAME, subs(SAME, [
      ['if (perm.some((j, i) => Math.abs(yr(j) - yl(i)) < (H / m) / 2 + 2)) return false;', 'if (n !== m && perm.some((j, i) => Math.abs(yr(j) - yl(i)) < (H / m) / 2 + 2)) return false;'],
      ['if (new Set(off).size === 1) return false;', 'if (n === m ? new Set(off).size !== 1 : new Set(off).size === 1) return false;']]), 'K-684', 1, null, /same number of rows away|one line pattern/],
    ['two copies in a row with one line pattern', FACTORY, 'function cycle(v, count, salt) { if (count < 2) return 0;', 'function cycle(v, count, salt) { return 0;', 'K-684', 1, null, /one line pattern/],
    ['the key joins a picture to the wrong partner', FACTORY, 'const lines = key ? plan.perm.map((j, i) => `<line data-lcs-keyline="${i}-${j}" x1="9" y1="${yl(i).toFixed(1)}" x2="${GW - 9}" y2="${yr(j).toFixed(1)}"', 'const lines = key ? plan.perm.map((j, i) => `<line data-lcs-keyline="${i}-${(j + 1) % m}" x1="9" y1="${yl(i).toFixed(1)}" x2="${GW - 9}" y2="${yr((j + 1) % m).toFixed(1)}"', 'K-684', 2, 'key', /does not join it to its partner/],
    ['no picture without a partner on level 2', FACTORY, '2: { pairs: 4, extra: 1, H: 720, gw: 230 }', '2: { pairs: 4, extra: 0, H: 720, gw: 230 }', 'K-684', 2, null, /pictures on the left|no partner/],
    ['the key does not mark the picture with no partner', FACTORY, '${key ? `<span data-lcs-nopart', '${false ? `<span data-lcs-nopart', 'K-684', 2, 'key', /as the picture with no partner/],
    ['a ball without a partner on a page with bat', FACTORY, 'const extras = d.extra ? shuffle(Object.keys(F), rng).filter((fw) => fillerOk(fw, ws, [], ws)).slice(0, d.extra) : [];', "const extras = d.extra ? ['ball'] : [];", 'K-684', 2, null, /goes with/],
    ['level 3: the pictures to match too small', FACTORY, '3: { pairs: 3, extra: 1, H: 416,', '3: { pairs: 3, extra: 1, H: 336,', 'K-684', 3, null, /picture to match is smaller than 84/],
    // the box stretches to its row, so its min-height alone never sets its size: the fault stops the stretch as well
    ['the box to draw in too small', FACTORY, 'flex:1 1 auto;align-self:stretch;min-height:${d.drawH}px;', 'flex:1 1 auto;align-self:center;height:60px;min-height:60px;', 'K-684', 3, null, /box to draw in is smaller|blank band/],
    ['the key’s sample names the meaning shown', FACTORY, 'const row = (x, i) => { const o = BANK.words[x.word].m.find((mm) => mm.id === x.other);', 'const row = (x, i) => { const o = BANK.words[x.word].m.find((mm) => mm.id === x.shown);', 'K-684', 3, 'key', /sample is not the other meaning/],
    ['the key does not say what drawing counts', FACTORY, "color:${T.teal}\">${esc(o.accept)}</div>`", "color:${T.teal}\">${esc(o.draw)}</div>`", 'K-684', 3, 'key', /what counts/],
    ['a word matched and drawn on one page', FACTORY, "const draws = c.filter((o) => o.kind === 'draw').map(", "const draws = c.filter((o) => o.kind === 'pair').slice(0, d.draw || 0).map(", 'K-684', 3, null, /matched above|stands twice|two pictures of one kind/],
    // ---------------------------------------------------------------- the bank
    ['a black-and-white picture', BANK, '"animals",\n      "bat"', '"animals bw",\n      "bat"', 'K-683', 1, null, /colour picture/],
    ['a sentence without its word', BANK, '"The bat sleeps upside down all day."', '"The animal sleeps upside down all day."', 'K-683', 1, null, /does not stand in it once|decide/],
    ['a sentence without the words that decide', BANK, '"sleeps upside down"', '"hangs by its toes"', 'K-683', 1, null, /words that decide/],
    ['a sentence with a straight apostrophe', BANK, '"Mia whispers in my ear."', '"Mia\'s friend whispers in my ear."', 'K-683', 1, null, /straight apostrophe/],
    ['a sentence that holds a model word', BANK, '"Hammer the nail into the wood."', '"Duck! Hammer the nail into the wood."', 'K-683', 1, null, /model word/],
    ['the two meanings of a word of one class', BANK, '"cls": "animal",\n     "draw": "a bat that flies"', '"cls": "game",\n     "draw": "a bat that flies"', 'K-683', 1, null, /one class/],
    ['a key name that does not name the word', BANK, '"draw": "a bat that flies"', '"draw": "an animal that flies"', 'K-684', 3, null, /does not name the word/],
    ['a filler that is a word with two meanings', BANK, '"fillers": {\n  "cat": [', '"fillers": {\n  "bat": [', 'K-683', 2, null, /is a word with two meanings/],
    ['a familiar meaning that is no meaning of its word', BANK, '"familiar": "tree"', '"familiar": "leaf"', 'K-684', 1, null, /familiar meaning/],
    ['no "Accept ..." line for the key of a drawing', BANK, '"accept": "Accept any bat with wings."', '"accept": "Any bat."', 'K-684', 3, null, /Accept/],
    ['orange neither a word nor refused', BANK, '"orange": "the fruit is orange too', '"oranges": "the fruit is orange too', 'K-683', 1, null, /neither a word of the pages nor refused/],
    // round 2: padding under the rule of the teacher lines was not blank to the band check (the first run missed this)
    ['a blank band above the teacher lines', FACTORY, 'gap:3px;padding-top:8px;border-top:2px solid ${T.inkSoft}', 'gap:3px;padding-top:80px;border-top:2px solid ${T.inkSoft}', 'K-683', 1, 'key', /blank band/],
    ['a refused word that is a word of the pages', BANK, '"mouse": "the library has the animal', '"bat": "the library has the animal', 'K-683', 1, null, /word of the pages and a refused one/],
    // the first keys run of round 2 found "can" (a model word) in the ear's sample sentence on one key in 96: the load check
    // now reads the key's three texts of every meaning
    ['a model word in a sample sentence of the key', BANK, '"say": "I hear the bell with my ear."', '"say": "My ear can hear the bell."', 'K-684', 3, 'key', /model or never word "can"|model word: can/],
    ['a never word in an "Accept ..." line of the key', BANK, '"accept": "Accept any bat with wings."', '"accept": "Accept any bat with wings, even an ' + JSON.parse(fs.readFileSync(BANK, 'utf8')).banned.find((w) => /^[a-z]+$/.test(w)) + ' one."', 'K-684', 3, 'key', /model or never word/],
  ];
};
