/**
 * The planted faults of poison-two-stories-k.js (types/_shared/two-stories-k.js and data/literacy/two-stories-k.en.json):
 * [name, file, text to find, its replacement, type, level, 'key' when the fault shows on the answer key only, and the
 * pattern the NEW report must match]. Every text must stand in its file exactly once (bank: at least once; the first one is
 * changed); the poison script refuses to run otherwise. A fault counts as caught only when the pages report something their
 * clean run does not (the clean control must report nothing).
 */
'use strict';
const fs = require('fs');
// A rule the factory holds in two places is removed in BOTH; a level the fault does not test must still draw. span() reads
// the text between two anchors from the LIVE factory; sub() refuses a change whose text is not in the span exactly once.
const span = (file, from, to) => {
  const s = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'), i = s.indexOf(from), j = i < 0 ? -1 : s.indexOf(to, i);
  if (i < 0 || j < 0) throw new Error('fault anchor not found: ' + (i < 0 ? from : to));
  return s.slice(i, j + to.length);
};
const sub = (s, a, b) => { if (s.split(a).length !== 2) throw new Error('fault change not found once: ' + a); return s.replace(a, () => b); };
const subs = (s, pairs) => pairs.reduce((t, [a, b]) => sub(t, a, b), s);
module.exports = (FACTORY, BANK) => {
  const ANGRY = span(FACTORY, "for (const x of [...rest.filter((y) => y !== 'angry'), ...rest.filter((y) => y === 'angry')]) if (out.length < d.faces - 1) out.push(x); return out; };", "if (w1.includes('angry') && w2.includes('angry')) continue;");
  return [
    // ---------------------------------------------------------------- every page
    ['the page does not mark its letters as unjoined', FACTORY, 'data-lcs-ts="${mode}|${lv}" data-lcs-kind="${plan.kind}" data-lcs-noliga="1"', 'data-lcs-ts="${mode}|${lv}" data-lcs-kind="${plan.kind}"', 'K-685', 1, null, /ligatures/],
    ['an f before i has no room of its own (different)', FACTORY, 'text.replace(/f(?=[iflt])|t(?=t)/g,', 'text.replace(/zq(?=x)/g,', 'K-686', 1, null, /room of its own/],
    ['a task line changed in the factory only', FACTORY, "const LINES = {\n  sort: { 1: ['Listen to both stories. Cut out", "const LINES = {\n  sort: { 1: ['Hear both stories. Cut out", 'K-685', 1, null, /task line 1 is not the line/],
    ['verify’s copy of the level-3 instruction changed', FACTORY, "3: 'We compare two stories: what is the same and what is different.' },\n  },\n  LINES:", "3: 'We compare two stories.' },\n  },\n  LINES:", 'K-686', 3, null, /instruction is not the one of level 3/],
    ['the story text printed at 14 px', FACTORY, "<div data-lcs-stext data-lcs-read style=\"font:600 16px/1.2 'Nunito'", "<div data-lcs-stext data-lcs-read style=\"font:600 14px/1.2 'Nunito'", 'K-685', 2, null, /teacher reads is 14 px/],
    ['a story printed without its last sentence', FACTORY, "${st.text.map(esc).join(' ')}</div></div>`", "${st.text.slice(0, -1).map(esc).join(' ')}</div></div>`", 'K-686', 2, null, /not the story of the bank/],
    ['the key does not say "Answer key"', FACTORY, "blocks.push(storiesBlock(plan, key ? keyTag() : ''));", "blocks.push(storiesBlock(plan, ''));", 'K-685', 1, 'key', /does not say "Answer key"/],
    ['the page of the child says "Answer key"', FACTORY, "blocks.push(storiesBlock(plan, key ? keyTag() : ''));", 'blocks.push(storiesBlock(plan, keyTag()));', 'K-686', 1, null, /says it is the answer key/],
    // ---------------------------------------------------------------- K-685 compare two stories
    ['a Story 1 card keyed Both', FACTORY, "const cards = [...both.map((s) => ({ slot: s, value: pair.s1.slots[s][0], region: 'both' })),\n      ...df.flatMap((s) => [{ slot: s, value: pair.s1.slots[s][0], region: 's1' },", "const cards = [...both.map((s) => ({ slot: s, value: pair.s1.slots[s][0], region: 'both' })),\n      ...df.flatMap((s) => [{ slot: s, value: pair.s1.slots[s][0], region: 'both' },", 'K-685', 2, null, /keyed to where the stories put it/],
    ['a Story 2 card with the value of Story 1', FACTORY, "{ slot: s, value: pair.s2.slots[s][0], region: 's2' }])];", "{ slot: s, value: pair.s1.slots[s][0], region: 's2' }])];", 'K-685', 1, null, /keyed to where the stories put it|stands twice/],
    ['cards of the setting (the weather, where) instead of what happened', FACTORY, 'const both = [...shuffle(pair.shH, rng), ...shuffle(pair.shB, rng)].slice(0, d.both), df = shuffle(pair.dfH, rng).slice(0, d.diff);', 'const both = [...shuffle(pair.shB, rng), ...shuffle(pair.shH, rng)].slice(0, d.both), df = [...pair.df.filter((s) => !pair.dfH.includes(s)), ...pair.dfH].slice(0, d.diff);', 'K-685', 1, null, /tell what happened/],
    ['the glue boxes give the count away', FACTORY, 'Array.from({ length: BOXES }, (_, i) => { const c = per[r][i];', 'Array.from({ length: per[r].length }, (_, i) => { const c = per[r][i];', 'K-685', 2, null, /not 2 in every region|no spare glue box/],
    ['the heads of Story 1 and Story 2 without their character', FACTORY, '${st ? headPic(st) : both}', "${st ? '' : both}", 'K-685', 1, null, /picture of its character/],
    ['the head of Both without its two circles', FACTORY, '${st ? headPic(st) : both}', "${st ? headPic(st) : ''}", 'K-685', 1, null, /two overlapping circles/],
    // the cards are BUILT both, then the values of each slot the stories differ in (no block of regions): the fault sorts
    // them into their regions
    ['the cards in the order of their regions', FACTORY, 'for (let k = 0; k < 400 && !order; k++) { const o = shuffle(cards, rng),', "order = cards.slice().sort((p, q) => ['both', 's1', 's2'].indexOf(p.region) - ['both', 's1', 's2'].indexOf(q.region)); for (let k = 0; k < 400 && !order; k++) { const o = shuffle(cards, rng),", 'K-685', 2, null, /order of their regions/],
    ['cards too small for five-year-old hands', FACTORY, 'const CARD_W = 104, CARD_H = 100,', 'const CARD_W = 104, CARD_H = 80,', 'K-685', 1, null, /96 x 86 or more|leaves the card/],
    ['glue boxes with too little room', FACTORY, 'BW = CARD_W + 2 * GLUE + 6, BH = CARD_H + 2 * GLUE + 6,', 'BW = CARD_W + 2 * GLUE + 6, BH = CARD_H + 6,', 'K-685', 2, null, /cannot hold its card/],
    ['the circles do not share a middle', FACTORY, 'const aR = DW / 2 + BW / 2 + 18, bL = DW / 2 - BW / 2 - 18;', 'const aR = DW / 2 - BW / 2 - 30, bL = DW / 2 + BW / 2 + 30;', 'K-685', 1, null, /two circles that share a middle|inside its own region/],
    ['a Story 1 glue box inside both circles', FACTORY, 'const cx = { s1: DW / 6, both: DW / 2, s2: (5 * DW) / 6 };', 'const cx = { s1: DW / 3, both: DW / 2, s2: (5 * DW) / 6 };', 'K-685', 2, null, /inside its own region only|touch/],
    ['the key glues no card', FACTORY, "(key && c ? `<span data-lcs-keycard=\"${attr(c.text)}\"", "(false ? `<span data-lcs-keycard=\"${attr(c.text)}\"", 'K-685', 1, 'key', /glues other cards/],
    ['the key glues the cards in other regions', FACTORY, "const per = { s1: plan.cards.filter((c) => c.region === 's1'), both: plan.cards.filter((c) => c.region === 'both'), s2: plan.cards.filter((c) => c.region === 's2') };", "const per = { s1: plan.cards.filter((c) => c.region === 's2'), both: plan.cards.filter((c) => c.region === 'both'), s2: plan.cards.filter((c) => c.region === 's1') };", 'K-685', 2, 'key', /glues other cards/],
    ['a card picture of another thing', FACTORY, 'img(c.pic, c.pic[1], CARD_PIC)', "img(['emotions', 'happy'], 'happy', CARD_PIC)", 'K-685', 1, null, /not the thing it names|twice/],
    ['level 3: the key has no sample of one more thing that is the same', FACTORY, "(key && !c && r === 'both' && d.tell && i === per.both.length ? `<span data-lcs-tellsample", "(false && !c && r === 'both' && d.tell && i === per.both.length ? `<span data-lcs-tellsample", 'K-685', 3, 'key', /sample of one more thing/],
    ['level 3: the key’s sample of one more thing is a card', FACTORY, 'const tellSlot = d.tell ? [...pair.shH, ...pair.shB].find((s) => !both.includes(s)) : null;', 'const tellSlot = d.tell ? both[0] : null;', 'K-685', 3, 'key', /sample of one more thing/],
    // ---------------------------------------------------------------- K-686 draw same and different
    ['the right faces in one place in both rows', FACTORY, 'if (at[0] === at[1]) continue;', 'if (at[0] !== at[1]) continue;', 'K-686', 2, null, /one place in both rows/],
    ['a face the story allows offered as wrong', FACTORY, 'rest = shuffle(st.never, rng), out = early.slice(0, d.faces - 1);', "rest = shuffle(['happy', 'sad', 'tired', 'surprised', 'scared'].filter((x) => x !== st.end[0]), rng), out = early.slice(0, d.faces - 1);", 'K-686', 2, null, /never allows or felt before the end/],
    ['the feeling felt before the end not offered', FACTORY, 'rest = shuffle(st.never, rng), out = early.slice(0, d.faces - 1);', 'rest = shuffle(st.never, rng), out = d.faces === 2 ? [] : early.slice(0, d.faces - 1);', 'K-686', 1, null, /felt before the end is not offered/],
    ['the angry face in both rows', FACTORY, ANGRY, subs(ANGRY, [
      ["for (const x of [...rest.filter((y) => y !== 'angry'), ...rest.filter((y) => y === 'angry')])", "for (const x of [...rest.filter((y) => y === 'angry'), ...rest.filter((y) => y !== 'angry')])"],
      ["if (w1.includes('angry') && w2.includes('angry')) continue;", '']]), 'K-686', 2, null, /angry face stands in both rows/],
    ['the tired face without "z z z"', FACTORY, "${fc === 'tired' ? zzz : ''}", "${''}", 'K-686', 2, null, /tired face has no "z z z"/],
    ['a face row not named by its animal’s picture', FACTORY, "${img(st.pic, 'fpic-' + st.id, 60)}", "${img(BANK.faces.happy, 'fpic-' + st.id, 60)}", 'K-686', 1, null, /not named by the picture/],
    ['a face row named for the other animal', FACTORY, "<span data-lcs-fname data-lcs-read style=\"font:800 18px/1.1 'Nunito',sans-serif;color:${COL[i + 1]}\">${esc(st.name)}</span>", "<span data-lcs-fname data-lcs-read style=\"font:800 18px/1.1 'Nunito',sans-serif;color:${COL[i + 1]}\">${esc(i ? plan.s1.name : plan.s2.name)}</span>", 'K-686', 1, null, /not named by the picture and the name/],
    ['the key does not circle the right face', FACTORY, "${key && fc === st.end[0] ? ring() : ''}", "${''}", 'K-686', 1, 'key', /does not circle the right face/],
    ['the key’s sample of the same is a thing only one story tells', FACTORY, 'const sameV = val(plan.s1, plan.same), dA = val(plan.s1, plan.diff), dB = val(plan.s2, plan.diff);', 'const sameV = val(plan.s1, plan.diff), dA = val(plan.s1, plan.diff), dB = val(plan.s2, plan.diff);', 'K-686', 2, 'key', /sample of the same/],
    ['the key’s samples of the different not marked as samples', FACTORY, "${sampleTag(HEADS.sample + ' ' + dA[0])}", '${sampleTag(dA[0])}', 'K-686', 1, 'key', /not marked as samples/],
    ['the key does not say what drawings count', FACTORY, "keyLine('data-lcs-accept', KEY.accept)", "keyLine('data-lcs-accept', KEY.tag)", 'K-686', 2, 'key', /what drawings count/],
    ['level 3: the key writes no word on the rows', FACTORY, '${key ? seatOnRow(rowSvg(w, KEYROW), word, { fill: T.teal }) : rowSvg(w, ROW)}', '${key ? rowSvg(w, KEYROW) : rowSvg(w, ROW)}', 'K-686', 3, 'key', /sounded-out word on each writing row/],
    ['level 3: the key mixes up the word and its sounded-out spelling', FACTORY, 'KEY.spell(ex[3], ex[4])', 'KEY.spell(ex[4], ex[3])', 'K-686', 3, 'key', /sounded-out spellings are right/],
    ['level 3: the row under Different not in two halves', FACTORY, '[[1, dA], [2, dB]].map(([n, v]) =>', '[[1, dA]].map(([n, v]) =>', 'K-686', 3, null, /rows to write on/],
    ['a sample of the key over the number of a half', FACTORY, 'left:42px;right:calc(50% + 6px);top:6px;', 'left:6px;right:calc(50% + 6px);top:6px;', 'K-686', 3, 'key', /covers the number of a half/],
    ['the box for what is different without its halves', FACTORY, '<span data-lcs-half="1" style="position:absolute;left:8px;top:8px">${badge(1)}</span>', '', 'K-686', 1, null, /halves marked 1 and 2/],
    ['no rows to write on at level 3', FACTORY, 'draw: { 1: { faces: 2, boxH: 200 }, 2: { faces: 3, boxH: 200 }, 3: { faces: 3, boxH: 100, row: true } },', 'draw: { 1: { faces: 2, boxH: 200 }, 2: { faces: 3, boxH: 200 }, 3: { faces: 3, boxH: 100, row: false } },', 'K-686', 3, null, /rows to write on/],
    // ---------------------------------------------------------------- the bank
    ['a story too long', BANK, '"Fox looked by the swings.",', '"Fox looked by the swings and by the slide and by the big tree and by the little tree and by the red barn and by the green gate and by the long fence and by the old shed.",', 'K-685', 1, null, /words \(60 to 90\)/],
    ['a slot without the sentence that states it', BANK, '"It was stuck in a tree!"\n    ]', '"The kite was stuck in a tree!"\n    ]', 'K-685', 1, null, /no sentence of the story that states it/],
    ['the end feeling not stated in the last sentence', BANK, '"happy",\n    "Fox was happy."', '"happy",\n    "Fox felt fine."', 'K-686', 1, null, /end feeling is not stated/],
    ['a face the story names on its never list', BANK, '"never": [\n    "angry",', '"never": [\n    "sad",', 'K-686', 1, null, /should never allow|felt earlier|tired face/],
    ['a feeling felt earlier not stated in the story', BANK, '"sad",\n     "Fox felt sad."', '"sad",\n     "Fox felt very sad."', 'K-686', 1, null, /felt earlier/],
    ['two stories that share three things that happened', BANK, '"owl",\n     "Owl came down to help."', '"frog",\n     "Owl came down to help."', 'K-685', 1, null, /share more than two things that happened/],
    ['a thing that happened with no sounded-out spelling', BANK, '"kit"', '"KIT"', 'K-686', 3, null, /sounded-out spelling/],
    ['a black-and-white story picture', BANK, '"animals",\n    "fox"', '"animals bw",\n    "fox"', 'K-685', 1, null, /no colour picture/],
    // round 2: the example of a sounded-out spelling came from the Same sample alone ("hat for hat"), and the ring of the key
    // ran through the letters of the tired face
    ['level 3: the spelling example taken from the Same sample alone', FACTORY, 'const ex = [sameV, dA, dB].find((v) => v[4] !== v[3]);', 'const ex = sameV;', 'K-686', 3, 'key', /spelled otherwise than it sounds/],
    ['the ring of the key over the "z z z" of the tired face', FACTORY, 'z-index:2;padding:0 2px;border-radius:4px;background:#FFFFFF;', '', 'K-686', 3, 'key', /covers the "z z z"/],
    // round 2: padding was not blank to the band check
    ['a blank band of padding at the top of every block', FACTORY, 'gap:${gap}px;padding:${pad}px 12px;border-radius:14px;background:${T.cream}', 'gap:${gap}px;padding:${pad + 40}px 12px ${pad}px;border-radius:14px;background:${T.cream}', 'K-686', 1, null, /blank band/],
    // round 2, the coordinator's rulings: the partner-talk sample is a full sentence (the frame of its slot's kind in the bank),
    // its period inside the quotation marks; happy is never a wrong face in a row whose story ends tired or surprised
    ['a card kind without a frame for the partner-talk sample', BANK, '"place": "Both stories happen {card}."', '"placeX": "Both stories happen {card}."', 'K-685', 3, null, /no frame for the partner-talk sample/],
    ['a frame whose sample has no period', BANK, '"weather": "It was {card} in both stories."', '"weather": "It was {card} in both stories"', 'K-685', 3, null, /not one short sentence ending with a period/],
    ['level 3: the key’s sample is the card text, not a sentence', FACTORY, 'tell: tellSlot ? fillTell(b.kinds[pair.kind].tell[tellSlot], K[tellSlot][pair.s1.slots[tellSlot][0]]) : null,', 'tell: tellSlot ? K[tellSlot][pair.s1.slots[tellSlot][0]][0] : null,', 'K-685', 3, 'key', /sample of one more thing/],
    ['level 3: the period of the sample outside the quotation marks', FACTORY, 'tell: (sentence) => `Sample: “${sentence}” Accept anything both stories tell.`,', 'tell: (sentence) => `Sample: “${sentence.slice(0, -1)}”. Accept anything both stories tell.`,', 'K-685', 3, 'key', /sample of one more thing/],
    ['happy as a wrong face in a story that ends tired', BANK, '"never": [\n    "angry",\n    "surprised"\n   ]', '"never": [\n    "happy",\n    "surprised"\n   ]', 'K-686', 1, null, /happy is offered as a wrong face/],
    ['a straight quote in a story', BANK, '"“I can look from up high,” said Owl."', '"\\"I can look from up high,\\" said Owl."', 'K-685', 1, null, /straight apostrophe or quote/],
  ];
};
