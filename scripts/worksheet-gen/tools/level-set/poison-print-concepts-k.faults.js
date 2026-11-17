/**
 * The planted faults of poison-print-concepts-k.js (types/_shared/print-concepts-k.js and
 * data/literacy/print-concepts-k.en.json): [name, file, text to find, its replacement, type, level, 'key' when the fault
 * shows on the answer key only, and the pattern the NEW report must match]. Every text must stand in its file exactly once
 * (bank: at least once; the first one is changed); the poison script refuses to run otherwise, so a changed factory cannot
 * pass with a stale list. A fault counts as caught only when the pages report something their clean run does not (the
 * clean run of each type and level is the baseline). Every check the specialist's review added (2026-11-17) has a fault.
 */
'use strict';
module.exports = (FACTORY, BANK) => [
  // ---------------------------------------------------------------- every page: letters, task lines, sizes
  ['the page does not mark its letters as unjoined', FACTORY, 'data-lcs-noliga="1"${rootAttr}', '${rootAttr}', 'K-669', 1, null, /ligatures/],
  ['an f before i has no room of its own (the line "first word")', FACTORY, 'text.replace(/f(?=[iflt])|t(?=t)/g,', 'text.replace(/zq(?=x)/g,', 'K-668', 1, null, /room of its own/],
  ['a task line changed in the factory only', FACTORY, "const LINES = {\n  parts: { 1: ['Circle the front cover in each row.", "const LINES = {\n  parts: { 1: ['Color the front cover in each row.", 'K-665', 1, null, /task line 1 is not the line/],
  ['the read-aloud box printed at 14 px', FACTORY, 'data-lcs-legendline="${k}" data-lcs-read style="font:700 18px/1.3', 'data-lcs-legendline="${k}" data-lcs-read style="font:700 14px/1.3', 'K-665', 2, null, /text the teacher reads is 14 px/],
  ['pictures smaller than 60 px', FACTORY, 'match: { 1: { rows: 6, opts: 2, font: 36, pic: 84 }', 'match: { 1: { rows: 6, opts: 2, font: 36, pic: 50 }', 'K-670', 1, null, /smaller than 60/],
  ['Kindergarten rows lower than 110 px', FACTORY, 'const ROW_MAKE = 120;', 'const ROW_MAKE = 100;', 'K-666', 1, null, /writing row lower than 110/],
  // ---------------------------------------------------------------- K-665 the parts of a book
  ['the box says something untrue of the back cover', FACTORY, "['back', 'Back cover:', 'turn the book over. It is the outside at the back.']", "['back', 'Back cover:', 'the last page of the book.']", 'K-665', 1, null, /what each part of a book is/],
  ['the parts in the order of a book', FACTORY, 'const order = partOrder(lv === 3 ? PARTS4 : PARTS3, rng);', 'const order = (lv === 3 ? PARTS4 : PARTS3).slice();', 'K-665', 2, null, /order of a book/],
  ['a part in one place in both rows', FACTORY, 'if (o1.some((x, i) => x === o2[i])) continue;', 'if (!o1.some((x, i) => x === o2[i])) continue;', 'K-665', 1, null, /one place in both rows/],
  ['the back cover drawn with its spine on the left', FACTORY, "border-radius:12px 5px 5px 12px;background:#FFFFFF;display:flex;flex-direction:column;justify-content:space-between;padding:14px ${SPINE + 12}px 12px 12px\">` + spine('right')", "border-radius:12px 5px 5px 12px;background:#FFFFFF;display:flex;flex-direction:column;justify-content:space-between;padding:14px ${SPINE + 12}px 12px 12px\">` + spine('left')", 'K-665', 1, null, /back cover is not a back/],
  ['the picture of the story page on its right page', FACTORY, "openBook('story', img(bk.pic2, d.spic), `<div data-lcs-first", "openBook('story', '', img(bk.pic2, d.spic) + `<div data-lcs-first", 'K-665', 3, null, /story page is not an open book/],
  ['glue boxes too low for their label and 30 px of room', FACTORY, 'card: [140, 50], cardFont: 22, glue: [205, 140]', 'card: [140, 50], cardFont: 22, glue: [205, 100]', 'K-665', 2, null, /cannot hold its label/],
  ['a glue box far below its part (level 2)', FACTORY, 'glue: [205, 140], under: 6 }', 'glue: [205, 140], under: 60 }', 'K-665', 2, null, /times nearer wanted/],
  ['the glue boxes crowded together (level 3)', FACTORY, 'display:flex;align-items:center;justify-content:space-between;padding-top:4px">` + order.map((p, i) =>', 'display:flex;align-items:center;justify-content:center;gap:1px;padding-top:4px">` + order.map((p, i) =>', 'K-665', 3, null, /times nearer wanted/],
  ['a title page title too big for its page', FACTORY, 'tf = titleFont(bk.title, room, d.tfont);', 'tf = d.tfont + 30;', 'K-665', 2, null, /nearer than 16 px to the gutter or the page edge/],
  ['the labels in the order of the parts above them', FACTORY, 'if (c.join() !== labelled.join()) cards = c;', 'cards = labelled.slice();', 'K-665', 3, null, /labels stand in the order of the parts/],
  ['the key does not cross out the back cover', FACTORY, "(key && p === 'back' ? xMark() : '')", "('')", 'K-665', 1, 'key', /cross the back cover/],
  ['the key does not mark the story spread', FACTORY, "key && p === 'story' ? eitherMark() : ''", "''", 'K-665', 3, 'key', /does not mark the story spread/],
  // ---------------------------------------------------------------- K-666 make a front cover and a title page
  ['the title traced on the title page of level 2', FACTORY, 'trace: d.trace >= 2 ? t : null', 'trace: d.trace >= 1 ? t : null', 'K-666', 2, null, /title row on the title is not empty/],
  ['no title to copy in the task line of level 3', FACTORY, "replace('{T}', `<b data-lcs-model ", "replace('{T}', `<b data-lcs-modelx ", 'K-666', 3, null, /title to copy is not in the task line/],
  ['the box to draw in as narrow as before', FACTORY, "drawBox(`height:${d.draw}px`)", "drawBox(`height:${d.draw}px;width:250px`)", 'K-666', 1, null, /at least 450 px wide/],
  ['the row for the name not across the cover', FACTORY, '${row({ w: coverRow - byW, h: RW })}</div></div>`);', '${row({ w: 300, h: RW })}</div></div>`);', 'K-666', 2, null, /does not run the full width of the cover/],
  ['the model title of level 3 printed small', FACTORY, "font:800 ${d.model}px/1 'Nunito',sans-serif", "font:800 40px/1 'Nunito',sans-serif", 'K-666', 3, null, /printed large in a model box/],
  // ---------------------------------------------------------------- K-667 read left to right, top to bottom
  ['the dots printed on level 2', FACTORY, 'const showDots = d.dots || key;', 'const showDots = true;', 'K-667', 2, null, /dots are printed on level 2/],
  ['the stop not a red dot', FACTORY, "redDot('data-lcs-stop', 24,", "greenDot('data-lcs-stop', 24,", 'K-667', 1, null, /red dot is not just after the last word/],
  ['the second line does not start where the first starts', FACTORY, '<div data-lcs-tline="${n}" style="position:relative;display:inline-flex;', '<div data-lcs-tline="${n}" style="position:relative;${n === 2 ? \'margin-left:40px;\' : \'\'}display:inline-flex;', 'K-667', 1, null, /second line does not start/],
  ['the arrows to trace printed solid', FACTORY, "border-top:4px ${dash ? 'dashed' : 'solid'} ${col}", 'border-top:4px solid ${col}', 'K-667', 1, null, /grey and dashed to trace/],
  ['the page frame far past the longer line', FACTORY, 'const pr = 18 + ', 'const pr = 120 + ', 'K-667', 2, null, /page frame does not end just after the longer line/],
  ['the return sweep without a solid head', FACTORY, 'border-right:16px solid ${col};transform-origin', 'border-right:16px dotted ${col};transform-origin', 'K-667', 1, null, /return sweep has no solid head/],
  ['the words of level 3 unevenly spaced', FACTORY, '<span data-lcs-tw="${i}" style="position:relative;display:inline-block">', '<span data-lcs-tw="${i}" style="position:relative;display:inline-block;min-width:${BOX}px">', 'K-667', 3, null, /not evenly spaced/],
  ['the key numbers the words from 2', FACTORY, "BOX, key ? String(i + 1) : '', false,", "BOX, key ? String(i + 2) : '', false,", 'K-667', 3, 'key', /box 1 is wrong on the key/],
  // ---------------------------------------------------------------- K-668 lines and pages in order
  ['no spread with the lines of the right page higher', FACTORY, 'if (!traps.some(Boolean)) traps[rng.int(0, 1)] = true;', 'traps = groups.map(() => false);', 'K-668', 3, null, /no spread whose right page/],
  ['a trap spread drawn with the left lines high', FACTORY, '${trap ? pics(0, 1) + lines(0) : lines(0) + pics(0, 1)}', '${lines(0) + pics(0, 1)}', 'K-668', 3, null, /do not stand higher/],
  ['the page numbers at the inner foot of the pages', FACTORY, "justify-content:${left ? 'flex-start' : 'flex-end'}", "justify-content:${left ? 'flex-end' : 'flex-start'}", 'K-668', 2, null, /no circle at the outer foot/],
  ['no turn-the-page arrow between the spreads', FACTORY, '${spread(0)}${turn}${spread(1)}', '${spread(0)}${spread(1)}', 'K-668', 2, null, /no turn-the-page arrow/],
  ['the key puts the green dot on the second line', FACTORY, 'wordsHtml(ln, j === 0, j === g.lines.length - 1, key)', 'wordsHtml(ln, j === 1, j === g.lines.length - 1, key)', 'K-668', 1, 'key', /dots are not on the first and the last word/],
  // ---------------------------------------------------------------- K-669 one dot for each word
  ['the letter of a row is the first letter of its word', FACTORY, 'b.lookLetters.filter((x) => x !== w[0] && !letters.includes(x))', 'b.lookLetters.filter((x) => !letters.includes(x)).concat([w[0]]).slice(-1)', 'K-669', 2, null, /no single letter, or the first letter/],
  ['a digit beside a letter it looks like', FACTORY, '(letters[r] === l || words[r].includes(l))', '(false)', 'K-669', 2, null, /stands beside a letter it looks like/],
  ['a scribble that is not of the list', FACTORY, "const SCRIBBLES = ['M4 22 C 12 4, 22 4,", "const SCRIBBLES = ['M4 22 C 12 4, 22 8,", 'K-669', 1, null, /one that is not of the list/],
  ['the words to circle in a repeating place', FACTORY, 'const at = mixedPlaces(d.rows, d.items, rng);', 'const at = [0, 1, 0, 1].slice(0, d.rows);', 'K-669', 2, null, /words stand in a pattern/],
  ['the key puts no dot under the words', FACTORY, '${key ? `<span data-lcs-keydot style="display:block;width:14px', '${false ? `<span data-lcs-keydot style="display:block;width:14px', 'K-669', 1, 'key', /no dot under word/],
  // ---------------------------------------------------------------- K-670 match the word you hear
  ['the right word short in four rows of level 1', FACTORY, "shuffle(['S', 'S', 'S', 'L', 'L', 'L'], rng)", "shuffle(['S', 'S', 'S', 'S', 'L', 'L'], rng)", 'K-670', 1, null, /not short in half of the rows/],
  ['the right words in a staircase', FACTORY, 'const at = mixedPlaces(d.rows, d.opts, rng);', 'const at = Array.from({ length: d.rows }, (_, i) => i % d.opts);', 'K-670', 2, null, /right words stand in a pattern/],
  ['short words printed as wide as long ones', FACTORY, 'color:${T.ink};padding:0 6px;white-space:nowrap">${esc(o)}', 'color:${T.ink};padding:0 6px;white-space:nowrap;letter-spacing:${o.length <= 4 ? 0.7 : 0}em">${esc(o)}', 'K-670', 1, null, /look alike in length/],
  ['the teacher strip names the wrong sentence', FACTORY, '[x.short, x.long])[x.read];', '[x.short, x.long])[1 - x.read];', 'K-670', 3, null, /teacher strip does not print the sentence/],
  ['the teacher strip without a dashed cut line', FACTORY, 'margin:12px 0 6px 28px;border-top:2.5px dashed', 'margin:12px 0 6px 28px;border-top:2.5px solid', 'K-670', 3, null, /no dashed cut line/],
  // ---------------------------------------------------------------- K-671 count the words
  ['the spaces of level 1 not marked', FACTORY, '${lv === 1 ? `border:2.5px dotted', '${lv === 9 ? `border:2.5px dotted', 'K-671', 1, null, /marked with a dotted box/],
  ['the word counts of a page in a pattern', FACTORY, 'if (pick.length !== d.n || !countsOk(pick.map((x) => x.n))) continue;', 'if (pick.length !== d.n || countsOk(pick.map((x) => x.n))) continue;', 'K-671', 1, null, /word counts follow a pattern/],
  ['the word counts of a page as steps that stay (2, 2, 3, 3)', FACTORY, "return { sents: pick, items: pick.map((x) => 'count:' + x.s) };", "pick.sort((a, c) => a.n - c.n); return { sents: pick, items: pick.map((x) => 'count:' + x.s) };", 'K-671', 1, null, /word counts follow a pattern/],
  ['the key writes one word too many', FACTORY, "numBox('data-lcs-nbox', BOX, key ? String(x.n) : '')", "numBox('data-lcs-nbox', BOX, key ? String(x.n + 1) : '')", 'K-671', 2, 'key', /wrong on the key/],
  // ---------------------------------------------------------------- K-672 finger spaces
  ['word cards too low for five-year-old hands', FACTORY, 'const CARD_W = 96, CARD_H = 86;', 'const CARD_W = 96, CARD_H = 52;', 'K-672', 1, null, /96 x 86 or more/],
  ['a glue strip without finger spaces', FACTORY, 'const FINGER = 50; ', 'const FINGER = 20; ', 'K-672', 2, null, /cannot hold its cards with 50 px/],
  ['the key copies the sentence without finger spaces', FACTORY, 'answer: key ? plan.copy : null, spaced: true })', 'answer: key ? plan.copy : null, spaced: false })', 'K-672', 3, 'key', /finger space \(50 px\)/],
  ['the cards in the order of the sentence', FACTORY, 'if (o[0] !== 0 && o.join() !== id.join() && o.join() !== id.slice().reverse().join()) order = o;', 'order = id.slice();', 'K-672', 3, null, /cards stand in the order/],
  ['the easy sentence always on alternating sides', FACTORY, 'const at = d.read >= 4 ? mixedPlaces(d.read, 2, rng) :', 'const at = d.read >= 4 ? [0, 1, 0, 1, 0, 1].slice(0, d.read) :', 'K-672', 1, null, /spaced sentences stand in a pattern/],
  ['the easy sentence in a block of sides (R R L L)', FACTORY, 'const at = d.read >= 4 ? mixedPlaces(d.read, 2, rng) :', 'const at = d.read >= 4 ? [1, 1, 0, 0] :', 'K-672', 2, null, /spaced sentences stand in a pattern/],
  // ---------------------------------------------------------------- the bank
  ['a famous title in the bank', BANK, '"title": "Cat Naps"', '"title": "Goodnight Moon"', 'K-665', 1, null, /famous/],
  ['an author name too long for a title page', BANK, '"author": "Leo Park"', '"author": "Leopold Parkington"', 'K-665', 2, null, /short first and last name/],
  ['a black-and-white picture', BANK, '"animals",\n    "fox"', '"animals bw",\n    "fox"', 'K-665', 1, null, /not a colour theme/],
  ['a sentence over two lines with seven words', BANK, '"The dog runs to | the park."', '"The big dog runs to | the park."', 'K-667', 1, null, /has 7 words/],
  ['a sentence whose second line is the longer one', BANK, '"The dog runs to | the park."', '"The dog | runs to the park."', 'K-667', 1, null, /first line is not clearly the longer one/],
  ['a level-1 dot sentence with a word some say with two beats', BANK, '"Fish can swim."', '"Fish like school."', 'K-669', 1, null, /for every speaker/],
  ['a level-2 dot sentence without a word of two syllables', BANK, '"The rabbit can hop."', '"The cat can hop."', 'K-669', 2, null, /two syllables/],
  ['a count sentence of level 2 with as many beats as words', BANK, '"A zebra runs."', '"A dog runs."', 'K-671', 2, null, /more beats than words/],
  ['a short word of two syllables in the lengths', BANK, '"S": [\n    "bus",', '"S": [\n    "bucket",', 'K-670', 2, null, /is not a S word|stands twice/],
  ['two words of a row that print almost alike', BANK, '"S": [\n    "cat",', '"S": [\n    "cake",', 'K-670', 1, null, /too alike in print|may share a row/],
  ['a long sentence of a pair that is not longer', BANK, '"The dog runs to the big tree."', '"The dog runs fast."', 'K-670', 3, null, /two words longer/],
  ['a word of the never list in a sentence', BANK, '"Pigs can dig."', '"Pigs can die."', 'K-672', 1, null, /never list/],
];
