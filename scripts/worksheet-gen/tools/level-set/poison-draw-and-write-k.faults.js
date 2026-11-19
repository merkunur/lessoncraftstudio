/**
 * The planted faults of poison-draw-and-write-k.js (types/_shared/draw-and-write-k.js and
 * data/literacy/draw-and-write-k.en.json): [name, file, text to find, its replacement, type, level, 'key' when the fault
 * shows on the answer key only, and the pattern the NEW report must match]. Every text must stand in its file exactly once
 * (bank: at least once; the first one is changed); the poison script refuses to run otherwise, so a changed factory cannot
 * pass with a stale list. A fault counts as caught only when the pages report something their clean run does not (the
 * clean run of each type and level is the baseline). A fault the bank's check catches stops the factory at load: its report
 * is the load error.
 */
'use strict';
module.exports = (FACTORY, BANK) => [
  // ---------------------------------------------------------------- every page: letters, quotes, the texts, sizes, bands
  ['the page does not mark its letters as unjoined', FACTORY, 'data-lcs-noliga="1"${rootAttr}', '${rootAttr}', 'K-674', 1, null, /ligatures/],
  ['an f before i, l or t has no room of its own', FACTORY, 'text.replace(/f(?=[iflt])|t(?=t)/g,', 'text.replace(/zq(?=x)/g,', 'K-673', 2, null, /room of its own/],
  ['a straight apostrophe after the words of a chip', FACTORY, "color:${T.ink}\">${esc(word)}</span>${key && ok ? ring('-3px -3px', '16px') : ''}</div>`;", "color:${T.ink}\">${esc(word)}'</span>${key && ok ? ring('-3px -3px', '16px') : ''}</div>`;", 'K-674', 2, null, /straight apostrophe/],
  // (once the strings are registered a page prints the registered instruction of its level, whatever its type file says:
  //  the fault is a level whose instruction is not the one verify keeps for it, here verify's own copy of level 2 holds
  //  the text of level 3, so the level-2 page prints the instruction of another level for verify)
  ['the page prints the instruction of another level', FACTORY, "    opinion: { 1: 'An opinion tells what you like best.', 2: 'An opinion tells what you like best. A reason tells why.',", "    opinion: { 1: 'An opinion tells what you like best.', 2: 'A writer tells the topic, an opinion, and a reason why.',", 'K-673', 2, null, /instruction is not the one of level 2/],
  ['a task line changed in the factory only', FACTORY, "  opinion: {\n    1: ['Circle the one you like best in each row.',", "  opinion: {\n    1: ['Color the one you like best in each row.',", 'K-673', 1, null, /task line 1 is not the line/],
  ['pictures smaller than 60 px', FACTORY, 'const PIC = 60; ', 'const PIC = 50; ', 'K-674', 1, null, /smaller than 60/],
  ['Kindergarten rows lower than 110 px', FACTORY, 'const ROW = 112; ', 'const ROW = 100; ', 'K-680', 2, null, /writing row lower than 110/],
  ['boxes for one mark smaller than 72 px', FACTORY, 'const BOX = 72; ', 'const BOX = 60; ', 'K-677', 1, null, /box for one mark is/],
  ['the grey model printed at 14 px', FACTORY, "data-lcs-model ${attrs} data-lcs-read style=\"font:700 17px/1.3", "data-lcs-model ${attrs} data-lcs-read style=\"font:700 14px/1.3", 'K-674', 1, null, /text the teacher reads is 14 px/],
  ['the sentences to circle printed at 17 px', FACTORY, "style=\"position:relative;font:700 ${d.font - 1}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:1px 10px\">", "style=\"position:relative;font:700 ${d.font - 6}px/1.3 'Nunito',sans-serif;color:${T.ink};padding:1px 10px\">", 'K-679', 2, null, /thing to circle is printed at/],
  ['a blank band above the rows of things', FACTORY, '<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:6px">${plan.pairs.map(pairRow).join(\'\')}</div>', '<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:6px;margin-top:70px">${plan.pairs.map(pairRow).join(\'\')}</div>', 'K-673', 2, null, /blank band/],
  ['the box to draw the last part shrinks (the blocks no longer fill the page)', FACTORY, "drawBox('data-lcs-drawrole=\"last\"', 'flex:1 1 auto;min-height:150px',", "drawBox('data-lcs-drawrole=\"last\"', 'flex:0 0 auto;height:40px',", 'K-677', 2, null, /the blocks fill|blank band|no box to draw what happened last/],
  ['the frame words do not stand on the base rule', FACTORY, 'style="display:flex;align-items:flex-end;gap:${GAP}px">` +', 'style="display:flex;align-items:flex-start;gap:${GAP}px">` +', 'K-676', 2, null, /do not stand on the base rule/],
  ['the last blank of a row too narrow for a kindergartner', FACTORY, 'const last = width - nb - fixed - sized - GAP * (parts.length - 1) - 4;', 'const last = width - nb - fixed - sized - GAP * (parts.length - 1) - 304;', 'K-674', 1, null, /blank is \d+ px: it holds/],
  ['a box to draw in printed full on the page of the child', FACTORY, "key ? keyNote([`The child draws: ${plan.sents[plan.sents.length - 1]}`, WORDS.keyDraw]) : ''", "keyNote([`The child draws: ${plan.sents[plan.sents.length - 1]}`, WORDS.keyDraw])", 'K-677', 1, null, /answer is marked on the page of the child|not empty/],
  ['a key note too big for its box', FACTORY, 'lv === 1 ? 17 : 16, lv === 1 ? 12 : 7)', 'lv === 1 ? 17 : 26, lv === 1 ? 12 : 7)', 'K-678', 2, 'key', /does not fit in its box/],
  ['the checklist boxes 30 px', FACTORY, 'box-sizing:border-box;width:40px;height:40px;border:2.5px solid ${T.ink};border-radius:8px', 'box-sizing:border-box;width:30px;height:30px;border:2.5px solid ${T.ink};border-radius:8px', 'K-678', 2, null, /no box of 40 px/],
  ['the checklist says something else', FACTORY, "  myfav: [['crayon', 'I drew it.'],", "  myfav: [['crayon', 'I drew.'],", 'K-674', 3, null, /checklist is not the one/],
  ['no checklist at the foot of the opinion page', FACTORY, "    blocks.push(checklist(mode, 3));\n    rootAttr = ` data-lcs-sample=\"${attr(sample.key)}\"`;\n  }\n\n  if (mode === 'teach') {", "    rootAttr = ` data-lcs-sample=\"${attr(sample.key)}\"`;\n  }\n\n  if (mode === 'teach') {", 'K-674', 1, null, /no checklist at the foot/],
  ['the key\'s sample squeezed on one row', FACTORY, "const w3 = wrapRows(sample.l3.replace(/^I /, ''), FIT.rows3) || [];", "const w3 = [sample.l3.replace(/^I /, ''), '', ''];", 'K-674', 3, 'key', /squeezed or wider|needs \d+ px/],
  ['a word no page prints, in the bank', BANK, '"re": "I can dig deep holes in the sand."', '"re": "I can dig dumb holes in the sand."', 'K-673', 1, null, /no page prints/],
  ['two pictures of one kind, in the bank', BANK, '"kind": "balloon"', '"kind": "kite"', 'K-673', 1, null, /two pictures of two kinds|two pictures of one kind/],
  ['a note models a word of a sample, in the bank', BANK, '"facts": [\n   "snail",', '"facts": [\n   "wing",', 'K-675', 1, null, /the note of facts models "wing"/],
  // ---------------------------------------------------------------- K-673 what I like best and why
  ['two rows of things on level 1', FACTORY, 'opinion: { 1: { pairs: 3, pieces: 2, pic: 96,', 'opinion: { 1: { pairs: 2, pieces: 2, pic: 96,', 'K-673', 1, null, /rows of two things, not 3/],
  ['the opinion always first', FACTORY, "const two = p.opFirst ? [[p.op, 'op'], [p.re, 're']] : [[p.reFirst || p.re, 're'], [p.op, 'op']];", "const two = [[p.op, 'op'], [p.re, 're']];", 'K-673', 2, null, /one place in every piece/],
  ['a reason printed before the opinion that says it, on level 3', FACTORY, "const two = p.opFirst ? [[p.op, 'op'], [p.re, 're']] : [[p.reFirst || p.re, 're'], [p.op, 'op']];", "const two = p.opFirst ? [[p.op, 'op'], [p.re, 're']] : [[p.re, 're'], [p.op, 'op']];", 'K-673', 3, null, /is not its re|says it or they/],
  ['the topic sentence of level 3 not first', FACTORY, "const ss = (d.topic ? [[p.topic, 'topic']] : []).concat(two);", "const ss = two.concat(d.topic ? [[p.topic, 'topic']] : []);", 'K-673', 3, null, /first sentence does not tell the topic/],
  ['the key circles the reason and underlines the opinion', FACTORY, "${key && role === 'op' ? ring('-3px -6px') : ''}${key && role === 're' ? underline() : ''}", "${key && role === 're' ? ring('-3px -6px') : ''}${key && role === 'op' ? underline() : ''}", 'K-673', 1, 'key', /does not circle the opinion/],
  ['the key rings a thing liked best', FACTORY, 'gap:2px;padding:2px 10px">${img(x, d.pic)}', 'gap:2px;padding:2px 10px">${img(x, d.pic)}${key ? ring() : \'\'}', 'K-673', 2, 'key', /rings a thing to like best/],
  ['a reason that says best, in the bank', BANK, '"re": "It rolls so fast."', '"re": "It is the best."', 'K-673', 1, null, /says like, favorite or best/],
  ['a reason printed first that says they, in the bank', BANK, '"reFirst": "Balloons float up high."', '"reFirst": "They float up high."', 'K-673', 1, null, /holds it, they or them/],
  // a piece sentence wider than one line: the bank's measured check, the page's one-line check, the column the check counts on
  ['a piece sentence wider than one line of its column, in the bank', BANK, '"reFirst": "The airplane zooms up and down."', '"reFirst": "The toy airplane can zoom up and down."', 'K-673', 1, null, /wider than one line of its column/],
  ['piece sentences printed larger than the width check counts on', FACTORY, "font:700 ${d.font}px/1.35 'Nunito',sans-serif;color:${T.ink};padding:0 4px", "font:700 ${d.font + 6}px/1.35 'Nunito',sans-serif;color:${T.ink};padding:0 4px", 'K-673', 1, null, /wraps to a second line/],
  ['a sentence column narrower than the width check counts on', FACTORY, 'opinion: { 1: { pairs: 3, pieces: 2, pic: 96, ppic: 112, font: 26 }', 'opinion: { 1: { pairs: 3, pieces: 2, pic: 96, ppic: 152, font: 26 }', 'K-673', 1, null, /sentence column is/],
  // ---------------------------------------------------------------- K-674 my favorite and why
  ['the box to draw in lower than a third of the body', FACTORY, "drawBox('data-lcs-drawrole=\"favorite\"', 'flex:1 1 auto', kn)", "drawBox('data-lcs-drawrole=\"favorite\"', 'flex:0 0 auto;height:200px', kn)", 'K-674', 1, null, /less than a third of the body/],
  ['no "my own" to circle', FACTORY, " + chip('data-lcs-topicchip=\"own\"', null, WORDS.own, false, false, 0, 40) + ", ' + ', 'K-674', 2, null, /topics to circle and my own/],
  ['a word bank of three reason words', FACTORY, '${wordBank(plan.bank, \'\', WORDS.bankOwn)}', '${wordBank(plan.bank.slice(1), \'\', WORDS.bankOwn)}', 'K-674', 1, null, /not four reason words/],
  ['a reason word that fits no topic offered', FACTORY, 'const pool = shuffle([...new Set(tops.flatMap((t) => t.reasons))].filter((w) => !need.has(w)), rng);', 'const pool = shuffle(b.reasonWords.filter((w) => !need.has(w) && !tops.some((t) => t.reasons.includes(w))), rng);', 'K-674', 1, null, /fits no topic offered/],
  ['the word bank does not say "or your own word"', FACTORY, '${wordBank(plan.bank, \'\', WORDS.bankOwn)}', '${wordBank(plan.bank)}', 'K-674', 1, null, /or your own word/],
  ['the key\'s sample about the second topic', FACTORY, "  if (mode === 'myfav') {\n    const tops = plan.topics, sample = tops[0];", "  if (mode === 'myfav') {\n    const tops = plan.topics, sample = tops[1];", 'K-674', 2, 'key', /sample is not about the first topic/],
  ['a model on a topic that is offered, in the bank', BANK, '"topic": "season"', '"topic": "game"', 'K-674', 1, null, /a topic that is offered/],
  ['the frames of level 2 printed on level 1', FACTORY, "    1: [['My favorite', { b: 'topic', need: 6 }], ['is', { b: 'answer', need: 10 }], ['because it is', { b: 'reason', need: 7 }]],", "    1: [['My favorite', { b: 'topic', need: 6 }], [{ b: 'answer', need: 13 }], ['because', { b: 'reason', need: 10 }]],", 'K-674', 1, null, /is not the frame/],
  // ---------------------------------------------------------------- K-675 facts and labels
  ['the other sentence of level 1 of the same kind', FACTORY, "facts: { 1: { off: 'other', glue: true, words: 0 },", "facts: { 1: { off: 'same', glue: true, words: 0 },", 'K-675', 1, null, /same kind/],
  ['no check mark after yes in the task line', FACTORY, ".replace('(yes)', '(yes' + tinyMark('check') + ')')", '', 'K-675', 2, null, /check mark after yes/],
  ['the picture not cut to the box of its ink', FACTORY, ';object-view-box:inset(${pc(y0)} ${pc(1 - x1)} ${pc(1 - y1)} ${pc(x0)})">`; };', '">`; };', 'K-675', 2, null, /not cut to the box of its ink/],
  ['a line that does not end on its dot', FACTORY, 'const [x2, y2] = dotXY(g, x, y), x1 = plan.sx[i];', 'const [x2, y2] = dotXY(g, x + 0.06, y), x1 = plan.sx[i];', 'K-675', 2, null, /does not end on its dot/],
  ['a line that crosses the picture', FACTORY, 'for (const x of xs) if (lineClear(t, g, [x, y], d)) return Math.round(x * 10) / 10;', 'for (const x of xs.reverse()) return Math.round(x * 10) / 10;', 'K-675', 3, null, /crosses the picture/],
  ['the two lines cross', FACTORY, 'const pr = shuffle(pairs, rng)[0], lp = pr.lp, rp = pr.rp;', 'const pr = shuffle(pairs, rng)[0], lp = pr.rp, rp = pr.lp;', 'K-675', 3, null, /lines cross|does not start on top of its home|crosses the picture/],
  ['the cards in the order of their boxes', FACTORY, 'const cards = d.glue ? [rp[0], lp[0]] : [];', 'const cards = d.glue ? [lp[0], rp[0]] : [];', 'K-675', 1, null, /order of their boxes/],
  ['the third word of level 3 names a part', FACTORY, 'const extra = d.words === 3 ? shuffle(top.noParts, rng)[0] : null;', 'const extra = d.words === 3 ? rp[0] : null;', 'K-675', 3, null, /names a part of the picture/],
  ['the glue boxes too small for their card and its room', FACTORY, 'const FACT_LAY = { glue: { PS: 152, homeW: CARD_W + 2 * GLUE + 6,', 'const FACT_LAY = { glue: { PS: 152, homeW: CARD_W + 20,', 'K-675', 1, null, /glue box cannot hold/],
  ['label cards too small for five-year-old hands', FACTORY, 'const CARD_W = 120, CARD_H = 86;', 'const CARD_W = 80, CARD_H = 86;', 'K-675', 1, null, /a card is \d+ x \d+/],
  ['a check mark on the child\'s page', FACTORY, "markBox('data-lcs-markbox', key ? (x.ok ? CHECKMARK : XMARK) : '')", "markBox('data-lcs-markbox', (x.ok ? CHECKMARK : XMARK))", 'K-675', 2, null, /answer is marked on the page of the child/],
  ['the key marks the sentences the wrong way', FACTORY, "markBox('data-lcs-markbox', key ? (x.ok ? CHECKMARK : XMARK) : '')", "markBox('data-lcs-markbox', key ? (x.ok ? XMARK : CHECKMARK) : '')", 'K-675', 1, 'key', /does not mark sentence/],
  ['a dot outside the box of its part, in the bank', BANK, '"paw",\n     "L",\n     0.45,', '"paw",\n     "L",\n     0.62,', 'K-675', 1, null, /the dot of "paw" is not inside the box of its part/],
  ['a dot off the picture\'s ink, in the bank', BANK, '0.455,\n     0.97,', '0.455,\n     0.997,', 'K-675', 1, null, /the dot of "paw" is not on the picture's ink/],
  ['a part word too wide for the key\'s label row, in the bank', BANK, '"parts": [\n    [\n     "paw",', '"parts": [\n    [\n     "window",', 'K-675', 2, null, /part "window" is a long word/],
  ['a fact that is not a short sentence about its topic, in the bank', BANK, '"A cat says meow."', '"Cats say meow."', 'K-675', 1, null, /is not a short sentence about/],
  ['a noPart that is a part, in the bank', BANK, '"noParts": [\n    "fin",', '"noParts": [\n    "tail",', 'K-675', 1, null, /noPart "tail" is a part or a long word/],
  // ---------------------------------------------------------------- K-676 I can teach you a fact
  ['the label rows under the box', FACTORY, "`<div style=\"flex:1 1 auto;display:flex;gap:12px;min-height:0\">${drawBox('data-lcs-drawrole=\"topic\"', 'flex:1 1 auto', kn)}${labels}</div>`", "`<div style=\"flex:1 1 auto;display:flex;flex-direction:column;gap:12px;min-height:0\">${drawBox('data-lcs-drawrole=\"topic\"', 'flex:1 1 auto', kn)}${labels}</div>`", 'K-676', 2, null, /does not stand beside the box/],
  ['label rows for five letters', FACTORY, "${row(LBW, 'label', { letters: FIT.label, answer: key ? sample.labels[i] : null })}", "${row(LBW, 'label', { letters: 5, answer: key ? sample.labels[i] : null })}", 'K-676', 2, null, /label row is not to hold 7 letters/],
  ['the key\'s labels swapped', FACTORY, 'answer: key ? sample.labels[i] : null', 'answer: key ? sample.labels[1 - i] : null', 'K-676', 1, 'key', /labels are not the sample/],
  ['a can-word true of no animal offered', FACTORY, "${bankRow('can:', plan.bank.can)}", "${bankRow('can:', [...plan.bank.can.slice(0, 3), 'dig'])}", 'K-676', 1, null, /true of no animal offered|not one to four/],
  ['a model of the family of an animal offered', FACTORY, '      if (tops.some((t) => t.family === m.family)) continue;\n', '', 'K-676', 2, null, /family/],
  ['a topic of the day before offered, in the bank', BANK, '"key": "bat"', '"key": "cat"', 'K-676', 1, null, /a topic of the day before|no picture that carries its name/],
  ['a model about a topic of the day before, in the bank', BANK, '"topic": "duck"', '"topic": "cow"', 'K-676', 2, null, /teachModels "cow": a topic of a page of this lesson/],
  ['a label too long for its row, in the bank', BANK, '"labels": [\n    "wing",', '"labels": [\n    "whiskers",', 'K-676', 1, null, /not two short labels/],
  ['the level-3 frames on level 1', FACTORY, "    1: [['A', { b: 'topic', need: 6 }, 'can', { b: 'can', need: 5 }], ['A', { b: 'topic', need: 6 }, 'has', { b: 'has', need: 5 }]],\n    2:", "    1: [['A', { b: 'open', need: 13 }], [{ b: 'open', need: 14 }]],\n    2:", 'K-676', 1, null, /is not the frame/],
  ['the first row of level 3 too short for a fact', FACTORY, "    3: [['A', { b: 'open', need: 13 }], [{ b: 'open', need: 14 }]] },", "    3: [['A', { b: 'open', need: 9 }], [{ b: 'open', need: 14 }]] },", 'K-676', 3, null, /its blanks are not to hold 13 letters/],
  // ---------------------------------------------------------------- K-677 put a small moment in order
  ['three sentences on level 3', FACTORY, "3: { n: 4, faces: 4 } },\n  moment:", "3: { n: 3, faces: 4 } },\n  moment:", 'K-677', 3, null, /sentence|steps|boxes/],
  ['the sentences printed in their order', FACTORY, '${plan.perm.map(srow).join(\'\')}', '${plan.perm.slice().sort().map(srow).join(\'\')}', 'K-677', 1, null, /in their order or its reverse/],
  ['the right face left out', FACTORY, 'const faces = shuffle([s.feel, ...others], rng);', 'const faces = shuffle(b.feelings.filter((x) => x !== s.feel), rng).slice(0, d.faces);', 'K-677', 2, null, /faces with the one that is right/],
  ['the key rings a wrong face', FACTORY, 'face(fe, 84, true, key, fe === s.feel)', 'face(fe, 84, true, key, fe !== s.feel)', 'K-677', 1, 'key', /does not ring the right face/],
  ['the key does not say any drawing is right', FACTORY, '${plan.sents[plan.sents.length - 1]}`, WORDS.keyDraw])', '${plan.sents[plan.sents.length - 1]}`])', 'K-677', 2, 'key', /any drawing that shows it is right/],
  ['a long sentence in a story, in the bank', BANK, '"I took a bow and grinned from ear to ear."', '"I took a big bow on the stage and then I grinned from ear to ear."', 'K-677', 1, null, /is not one short sentence/],
  // ---------------------------------------------------------------- K-678 my small moment
  ['the boxes say first, then, last', FACTORY, "box: ['First', 'Next', 'Last'], asked:", "box: ['First', 'Then', 'Last'], asked:", 'K-678', 2, null, /not three boxes for first, next, and last/],
  ['small boxes too narrow', FACTORY, 'const BOXW = 150;', 'const BOXW = 100;', 'K-678', 2, null, /small box to draw in is/],
  ['the rows under the small boxes, not beside them', FACTORY, '<div data-lcs-mbox="${i + 1}" style="flex:1 1 0;display:flex;gap:12px;min-height:0">', '<div data-lcs-mbox="${i + 1}" style="flex:1 1 0;display:flex;flex-direction:column;gap:12px;min-height:0">', 'K-678', 3, null, /does not stand beside its box/],
  ['the faces of level 3 with their words', FACTORY, "3: { rows: 3, faceWords: false } },", "3: { rows: 3, faceWords: true } },", 'K-678', 3, null, /faces of level 3 carry their words/],
  ['the word bank of level 3 beside "Last"', FACTORY, '(lv === 3 && i === 0 ? ', '(lv === 3 && i === 2 ? ', 'K-678', 3, null, /does not stand beside "First"/],
  ['the boxes of level 1 lower than a third of the body', FACTORY, 'const boxes = `<div data-lcs-boxes style="flex:1 1 auto;display:grid;', 'const boxes = `<div data-lcs-boxes style="flex:0 0 200px;display:grid;', 'K-678', 1, null, /less than a third of the body/],
  ['the feeling blank too narrow for scared', FACTORY, '${frameRow(fr.felt, 380, { answers: key ? [sample.feel] : null })}', '${frameRow(fr.felt, 300, { answers: key ? [sample.feel] : null })}', 'K-678', 1, null, /felt blank is \d+ px/],
  ['the key\'s sample about the second moment', FACTORY, "  if (mode === 'moment') {\n    const tops = plan.topics, sample = tops[0];", "  if (mode === 'moment') {\n    const tops = plan.topics, sample = tops[1];", 'K-678', 2, 'key', /sample is not about the first moment/],
  ['the key does not say sounded-out spelling is right', FACTORY, '[WORDS.keySpell], [WORDS.keyFeel]][i]', '[WORDS.keyAny], [WORDS.keyFeel]][i]', 'K-678', 3, 'key', /sounded-out spelling/],
  ['a model beside a moment it tells', FACTORY, '      if ((m.notWith || []).some((x) => ts.includes(x))) continue;\n', '', 'K-678', 1, null, /stands beside a moment it tells/],
  ['a sample longer than its blank, in the bank', BANK, '"saw rain",', '"saw the rain fall down",', 'K-678', 1, null, /longer than its blank/],
  ['a sample that uses no word of the word bank, in the bank', BANK, '"made a car",', '"built it",', 'K-678', 3, null, /uses no word of the word bank/],
  // ---------------------------------------------------------------- K-679 a friend asks, I add
  ['the answers always first', FACTORY, 'const at = variant ? PL[(variant - 1) % PL.length].slice(0, d.n) : PL[rng.int(0, PL.length - 1)].slice(0, d.n);', 'const at = PL[0].map(() => 0).slice(0, d.n);', 'K-679', 2, null, /one place in every piece|times in its places/],
  ['the right sentence found by its length', FACTORY, 'if (d.choices === 3 ? (longest > 1 || shortest > 1) : (!longest || !shortest)) continue;', 'if (d.choices === 3 ? (longest < 2) : (!longest || !shortest)) continue;', 'K-679', 2, null, /longest/],
  ['three sentences to choose from on level 1', FACTORY, 'ask: { 1: { n: 3, choices: 2, pic: 160, font: 26 },', 'ask: { 1: { n: 3, choices: 3, pic: 160, font: 26 },', 'K-679', 1, null, /has not 2 different things/],
  ['no sentence that says the piece again on level 3', FACTORY, '3: { n: 3, choices: 3, same: true, pic: 112, font: 22 } },', '3: { n: 3, choices: 3, pic: 112, font: 22 } },', 'K-679', 3, null, /has no sentence that says the piece again/],
  ['the key rings a wrong answer', FACTORY, "${key && o.ok ? ring('-2px -2px') : ''}", "${key && !o.ok ? ring('-2px -2px') : ''}", 'K-679', 2, 'key', /does not ring the answer/],
  ['the page marks the wrong answers as the right ones', FACTORY, "data-lcs-kind=\"${o.kind}\"${o.ok ? ' data-lcs-ok=\"1\"' : ''}", "data-lcs-kind=\"${o.kind}\"${!o.ok ? ' data-lcs-ok=\"1\"' : ''}", 'K-679', 1, null, /keyed wrong/],
  ['the question of a kind not the one verify knows', FACTORY, "  ASKQ: { color: 'What color was it?',", "  ASKQ: { color: 'What color is it?',", 'K-679', 2, null, /does not print its sentence and its question/],
  ['a sentence that says the piece again answers it, in the bank', BANK, '"same": "I had a toy car."', '"same": "It was green."', 'K-679', 1, null, /says the piece again answers the question/],
  ['a sentence that is the piece word for word, in the bank', BANK, '"same": "I had a kite."', '"same": "I flew a kite."', 'K-679', 3, null, /is the piece word for word/],
  // ---------------------------------------------------------------- K-680 author's chair
  ['no question to circle on level 1', FACTORY, 'chair: { 1: { qChips: true, addRows: 1 },', 'chair: { 1: { addRows: 1 },', 'K-680', 1, null, /questions to circle/],
  ['the key of level 1 does not say any question is right', FACTORY, '(key ? `<div data-lcs-keyq ', '(false ? `<div data-lcs-keyq ', 'K-680', 1, 'key', /any question the friend asked is right/],
  ['a worked example of level 1 that asks a question to circle', FACTORY, 'const usable = b.chairExamples.filter((e) => (lv === 1 ? !CHIP_KIND.test(e.q) : qFits(e.q)));', 'const usable = b.chairExamples.filter((e) => (lv === 1 ? true : qFits(e.q)));', 'K-680', 1, null, /does not suit its level|asks one of the four questions/],
  ['the key\'s sample is the worked example', FACTORY, "cands.push({ example: e.name, sample: others[0].name, qs, items: ['example:' + e.name, ...(lv === 1", "cands.push({ example: e.name, sample: e.name, qs, items: ['example:' + e.name, ...(lv === 1", 'K-680', 2, null, /sample is the worked example|not another example/],
  ['one row for a sentence on level 3', FACTORY, '3: { addRows: 2 } },', '3: { addRows: 1 } },', 'K-680', 3, null, /rows for what was added/],
  ['the worked example says something else', FACTORY, "${modelLine(`${e.name} read: “${e.piece}” A friend asked: “${e.q}” ${e.name} added: “${e.added}”`,", "${modelLine(`${e.name} read: “${e.piece}” A pal asked: “${e.q}” ${e.name} added: “${e.added}”`,", 'K-680', 2, null, /worked example is not one of the bank/],
  ['the box to draw the new detail too low', FACTORY, "drawBox('data-lcs-drawrole=\"added\"', 'flex:1 1 auto;min-height:0',", "drawBox('data-lcs-drawrole=\"added\"', 'flex:0 0 150px;min-height:0',", 'K-680', 2, null, /less than a third of the body/],
  ['no "I added a detail." in the checklist', FACTORY, "['ear', 'I listened.'], ['plus', 'I added a detail.']],", "['ear', 'I listened.']],", 'K-680', 3, null, /checklist is not the one/],
  ['the key of level 2 writes the one word of level 1', FACTORY, 'const addAns = lv === 1 ? [sm.word] : lv === 2 ? [sm.short] :', 'const addAns = lv === 1 ? [sm.word] : lv === 2 ? [sm.word] :', 'K-680', 2, 'key', /sample is not the one of its example/],
  ['a yes-or-no question, in the bank', BANK, '"q": "Who is it for?"', '"q": "Is it for you?"', 'K-680', 2, null, /does not ask for a detail/],
  ['questions measured against a row too short', FACTORY, 'const qFits = (q) => [...q].length * KEY_PX * Math.max(0.56, (emOf(q) / [...q].length) * 1.05) <= INNER - 16', 'const qFits = (q) => [...q].length * KEY_PX * Math.max(0.56, (emOf(q) / [...q].length) * 1.05) <= INNER - 316', 'K-680', 2, null, /fewer than fourteen whose question fits the row of the key/],
  // (writing review 1119) the topics only the check asks for (a favorite food) are no topic a page offers
  ['a check topic a page offers, in the bank', BANK, '"key": "food",', '"key": "game",', 'K-674', 2, null, /checkTopics/],
];
