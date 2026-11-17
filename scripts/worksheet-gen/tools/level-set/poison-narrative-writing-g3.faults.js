/**
 * The planted faults of poison-narrative-writing-g3.js (types/_shared/narrative-writing-g3.js and
 * data/literacy/narrative-writing-g3.en.json): [name, file, text to find, its replacement, types (+), level, 'load' when a
 * factory fault must stop the factory as it loads, and, for a fault that other checks report too, the words of the report
 * of its own rule, which must be among the reports]. A factory text must stand in the factory exactly once (text and
 * replacement may be lists: several changes at once); the poison script refuses to run otherwise, so a changed factory
 * cannot pass with a stale list. A bank fault changes a copy of the bank and writes it whole (the text to find is the whole
 * bank file). One fault for every rule verify() measures and every rule the bank check (faultsOf) holds.
 */
'use strict';
const fs = require('fs');
module.exports = (FACTORY, BANK) => {
  const orig = fs.readFileSync(BANK, 'utf8').replace(/\r\n/g, '\n');
  /** a bank fault: change a copy of the bank, expect the bank's check (the factory throws when it loads) */
  const B = (name, mutate) => { const b = JSON.parse(orig); mutate(b); return ['bank: ' + name, BANK, orig, JSON.stringify(b, null, 1) + '\n', 'G3-564', 1]; };
  const F = (name, find, repl, types, level, where, expect) => [name, FACTORY, find, repl, types, level, where, expect];
  const ST = (b, id) => b.stories.find((s) => s.id === id);
  const ID = (b, id) => b.ideas.find((d) => d.id === id);
  // texts that several faults change
  const HALVES_GUARD = "      if (qs.some((q) => (q.q === 'chars' || q.q === 'setting') && halvesTell(q.opts, q.right, optParts(s, b.pools, q.q)))) continue;\n";
  const PICK_STORY = "const s = stepOf(pool, 'parts|' + lv, v);";
  const FAR_WRONG = 'if (lo.p !== hi.p && lo.t !== hi.t) { wrong = [lo.s, hi.s]; break; }';
  const L3_ANS = "setting: s.place + ' ' + s.time, problem: s.problem, narrator: s.pov === 'first' ? s.narrator : cap1(NARRATOR_OUT) };";
  const ALSO_STYLE = "<div data-lcs-alsorow style=\"min-height:16px;font:700 13px/1.25 'Nunito',sans-serif;color:${T.teal};${key ? '' : 'visibility:hidden'}\"";
  const PLAN_EX = 'const ex = shuffle(b.exampleIdeas, rng)[0];\n    return { mode, lv, ideas, ex,';
  const DRAFT_EX = 'const ex = shuffle(b.exampleIdeas, rng)[0];\n    return { mode, lv, idea, ex,';
  const SHOW_CHECK = 'b.push(checklist([...CHECK.show, P.lv === 1 ? CHECK.showSaid : P.lv === 2 ? CHECK.showNoFeel : CHECK.showAct]));';
  const IDEAS_INFO = 'ideas: Object.fromEntries([...BANK.ideas, ...BANK.exampleIdeas].map((x) => [x.id, x])),';
  const DRAFT_L2 = '2: { start: false, strip: true, lines: { beginning: 4, events: 7, ending: 3 } }';
  const DRAFT_BEG1 = "writeGroup({ n: d.lines.beginning, w, h, text: x.oneDay, starter: 'One day,', key })";
  const DRAFT_X = 'const x = P.idea.draft, w = INNER - 20;';
  return [
    // ------------------------------------------------------------------------------------------- every page
    F('the font joins fi and fl (no rule before the root)', "const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{", "const STYLE = '<style>[data-lcs-nolig],[data-lcs-nolig] *{", 'G3-564', 1),
    F('the root without its mark for no joined letters', 'data-lcs-nw3="${mode}|${lv}" data-lcs-noliga="1"', 'data-lcs-nw3="${mode}|${lv}" data-lcs-noliga="0"', 'G3-564', 1),
    F('no room after an f before i, f, l, or t', "fRoom(typo(blocks.join('')))", "(typo(blocks.join('')))", 'G3-569', 1),
    F('straight apostrophes and quotation marks printed', "fRoom(typo(blocks.join('')))", "fRoom(blocks.join(''))", 'G3-566', 1),
    F('the instruction of level 1 is not the one of its level', "const INSTR = {\n  parts: { 1: 'Every story has characters, a setting, and a problem.'", "const INSTR = {\n  parts: { 1: 'Every story has characters and a problem.'", 'G3-564', 1),
    F('a picture on a page without pictures', "    b.push(ruleBox('The parts of a story', rows));", "    b.push(ruleBox('The parts of a story', rows) + '<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==\" style=\"width:4px;height:4px\">');", 'G3-564', 1),
    F('a block leaves the page', '<fieldset data-lcs-checklist data-lcs-card ${attrs} style="margin:0;min-width:0;display:grid;', '<fieldset data-lcs-checklist data-lcs-card ${attrs} style="margin:300px 0 0;min-width:0;display:grid;', 'G3-569', 1),
    F('a choice leaves its card', 'style="flex:0 0 auto;align-self:flex-start;white-space:nowrap;font:700 ${OPT}px', 'style="margin-left:-90px;flex:0 0 auto;align-self:flex-start;white-space:nowrap;font:700 ${OPT}px', 'G3-570', 1),
    F('the blocks fill too little of the page (the second task left out, the cards do not grow)', ["    b.push(cream('data-lcs-task=\"order2\"'", 'min-width:0;${more}">${inner}</div>`;'], ["    if (0) b.push(cream('data-lcs-task=\"order2\"'", 'min-width:0;">${inner}</div>`;'], 'G3-568', 1, null, 'the blocks fill \\d+ % of the page body'),
    F('sentences printed at 16 px', 'const READ = 18;', 'const READ = 16;', 'G3-564', 1),
    F('choices printed at 19 px', 'const OPT = 20;', 'const OPT = 19;', 'G3-570', 1),
    F('the boxes printed at 14 px', 'const RULEPX = 15.5;', 'const RULEPX = 14;', 'G3-570', 1),
    F('task lines printed at 15 px', 'const LABEL = 17;', 'const LABEL = 15;', 'G3-568', 1),
    F('writing lines of 30 px', 'const ROW = 34;', 'const ROW = 30;', 'G3-571', 2),
    F('a key answer too big for its line', "font:700 16px/1 'Nunito',sans-serif;color:${T.teal}\">${esc(answer)}</span>` : '') + `</div>`;", "font:700 40px/1 'Nunito',sans-serif;color:${T.teal}\">${esc(answer)}</span>` : '') + `</div>`;", 'G3-569', 2),
    F('a line filled on the page of the child', ['const parts = key ? spread(text, caps) : [];', "answer: key ? parts[i] || null : null })).join('')"], ['const parts = spread(text, caps);', "answer: parts[i] || null })).join('')"], 'G3-566', 1),
    F('the page of the child rings the answers', "border:3px solid ${key && ok ? T.teal : 'transparent'}", "border:3px solid ${ok ? T.teal : 'transparent'}", 'G3-570', 1),
    F('every right answer in the first place', 'for (let t = 0; t < 5000; t++) { const p = Array.from({ length: n }, () => rng.int(0, m - 1)); if (placesOk(p, m)) return p; }', 'return Array(n).fill(0);', 'G3-570', 1),
    F('the length of the choices tells the answer', 'function lengthOk(rows) {\n  if (rows.length < 3) return true;', 'function lengthOk(rows) {\n  return true;', 'G3-571', 1),
    F('a blank band between two tasks (the choice boxes do not grow)', 'data-lcs-q="${q.q}" data-lcs-right="${A(q.right)}" style="flex:1 1 auto;display:flex;', 'data-lcs-q="${q.q}" data-lcs-right="${A(q.right)}" style="display:flex;', 'G3-564', 1),
    F("the key's note shows on the page of the child", "style=\"color:${T.coral};${key ? '' : 'visibility:hidden'}\"", "style=\"color:${T.coral};\"", 'G3-569', 1),
    F('the key does not mark its sample as one', "const VARY = '(Sample)';", "const VARY = '(Example)';", 'G3-569', 1),
    // ------------------------------------------------------------------------------------------- G3-564
    F('a wrong pair of characters is the right pair turned round', 'wrong = [pick(WR.chars.lo), pick(WR.chars.hi)]; }', "wrong = [pick(WR.chars.lo), s.chars[1] + ' and ' + s.chars[0]]; }", 'G3-564', 1),
    F('the right pair is the only one that shares a name with each wrong pair', ['wrong = [pick(WR.chars.lo), pick(WR.chars.hi)]; }', HALVES_GUARD], ["wrong = [pick(WR.chars.lo), pick(WR.chars.hi).split(' and ')[1] + ' and ' + s.chars[1]]; }", ''], 'G3-564', 1, null, 'the only one that shares a part with each wrong one'),
    F('the wrong settings of level 2 keep different halves of the right one', ['else { const L = WR.near[famK]; for (let k = 0; k < 200; k++) { const a = pick(L.filter((x) => x.length < set.length)), c = pick(L.filter((x) => x.length > set.length)); if (a !== c) { wrong = [a, c]; break; } } }', HALVES_GUARD], ['else { for (let k = 0; k < 200; k++) { const a = pick(WR.near.nT || WR.near.nP), c = pick(WR.near.nP || WR.near.nT); if (a !== c) { wrong = [a, c]; break; } } }', ''], 'G3-564', 2, null, 'do not keep the same half of the right one'),
    F('a wrong place that is another name for the right one (playground for the school field)', [PICK_STORY, FAR_WRONG], ["const s = b.stories.find((x) => x.id === 'race');", "if (lo.p !== hi.p && lo.t !== hi.t) { wrong = ['on the playground ' + lo.t, hi.s]; break; }"], 'G3-564', 1, null, 'is another name for the right one'),
    F('a wrong time that can be the right one (before school for a morning)', [PICK_STORY, FAR_WRONG], ["const s = b.stories.find((x) => x.id === 'volcano');", "if (lo.p !== hi.p && lo.t !== hi.t) { wrong = [lo.p + ' before school on Thursday', hi.s]; break; }"], 'G3-564', 1, null, 'can be the right one'),
    F('a story at school offers wrong times outside the school day', 'const TP = s.school === false ? PO.times : PO.schoolTimes;', 'const TP = PO.times;', 'G3-564', 1, null, "is not one of the bank's"),
    F('the bank check: a wrong pair that does not keep the first character', "const forms = names.map((n) => s.chars[0] + ' and ' + n);", "const forms = names.map((n, i) => (i % 2 ? s.chars[0] + ' and ' + n : n + ' and ' + s.chars[1]));", 'G3-564', 1, 'load', 'does not keep the first character'),
    F('the bank check: a wrong setting of level 1 keeps the right time', "far.push({ p, t, s: p + ' ' + t })", "far.push({ p, t: s.time, s: p + ' ' + s.time })", 'G3-564', 1, 'load', 'keeps the place or the time of the right one'),
    F('the bank check: a family of level 2 that does not keep its half', "const nT = times.map((t) => s.place + ' ' + t).filter((x) => x.length <= SET_MAX)", "const nT = times.map((t, i) => (i % 2 ? s.place : places[0]) + ' ' + t).filter((x) => x.length <= SET_MAX)", 'G3-564', 1, 'load', 'does not keep its half'),
    F('the bank check: wrong places that are another name for the right one', 'absentIn(p, s.place) && !placeClash(p, s.place))', 'absentIn(p, s.place))', 'G3-564', 1, 'load', 'can be the right one'),
    F('the bank check: wrong times that can be the right one', 'absentIn(t, s.time) && !timeClash(t, s.time))', 'absentIn(t, s.time))', 'G3-564', 1, 'load', 'can be the right one'),
    F('a question keyed to a wrong answer', 'data-lcs-right="${A(q.right)}" style="flex:1 1 auto;display:flex;align-items:center;gap:6px;padding:3px 10px 4px', 'data-lcs-right="${A(q.opts.find((o) => o !== q.right))}" style="flex:1 1 auto;display:flex;align-items:center;gap:6px;padding:3px 10px 4px', 'G3-564', 1),
    F('the box of level 1 without the narrator row', 'const rows = [...RULES.parts, RULES.partsNarrator];', 'const rows = [...RULES.parts, ...(P.lv > 1 ? [RULES.partsNarrator] : [])];', 'G3-564', 1),
    F('the narrator row says I inside the quotation marks counts', "partsNarrator: '<b>Narrator</b>: the one who tells the story. If the narrator says I or my outside the quotation marks,", "partsNarrator: '<b>Narrator</b>: the one who tells the story. If the narrator says I or my,", 'G3-564', 2),
    F('level 3 keys the problem to a wrong one', L3_ANS, "setting: s.place + ' ' + s.time, problem: s.near[0][0], narrator: s.pov === 'first' ? s.narrator : cap1(NARRATOR_OUT) };", 'G3-564', 3),
    F('level 3 keys the narrator to a character of a story told from outside', L3_ANS, "setting: s.place + ' ' + s.time, problem: s.problem, narrator: cap1(s.chars[0]) };", 'G3-564', 3, null, 'is not keyed to'),
    F('level 3 does not ask who tells the story', "3: { write: ['chars', 'setting', 'problem', 'narrator'] } },", "3: { write: ['chars', 'setting', 'problem'] } },", 'G3-564', 3, null, 'who tells the story'),
    F('the key of level 3 does not name the other right answers', "const also = [...(s.alsoChars ? ['a. ' + s.alsoChars] : []), ...(s.also ? ['c. ' + s.also] : []), 'd. ' + (s.pov === 'first' ? 'the ' + s.narratorIs + ' who says I' : 'someone who is not in the story')];", "const also = [...(s.alsoChars ? ['a. ' + s.alsoChars] : []), ...(s.also ? ['c. ' + s.also] : [])];", 'G3-564', 3, null, 'does not name the other right answers'),
    F('the key of level 3 does not name the mother of the sandcastle story', [PICK_STORY, "const also = [...(s.alsoChars ? ['a. ' + s.alsoChars] : []),"], ["const s = b.stories.find((x) => x.id === 'sandcastle');", 'const also = ['], 'G3-564', 3, null, 'does not name the other right answers'),
    F('the printed title names the time of the setting (levels with choices)', "<div data-lcs-stitle style=\"font:700 20px/1.2 'Baloo 2',cursive;color:${T.ink}\">${esc(P.story.title)}</div>", "<div data-lcs-stitle style=\"font:700 20px/1.2 'Baloo 2',cursive;color:${T.ink}\">${esc(P.story.title + ' ' + P.story.time)}</div>", 'G3-564', 1, null, 'the title names'),
    F('the printed title names the time of the setting (level 3)', "<div data-lcs-stitle style=\"font:700 20px/1.2 'Baloo 2',cursive;color:${T.ink}\">${esc(P.story.title)}</div>", "<div data-lcs-stitle style=\"font:700 20px/1.2 'Baloo 2',cursive;color:${T.ink}\">${esc(P.story.title + ' ' + P.story.time)}</div>", 'G3-564', 3, null, 'the title names'),
    F('the bank check: a wrong pair names the mother of the sandcastle story', 'const names = PO.names.filter((n) => absentIn(n, s.text) && !s.chars.some((c) => words(c).includes(n.toLowerCase())));', "const names = [...PO.names, 'Mother'].filter((n) => (n === 'Mother' || absentIn(n, s.text)) && !s.chars.some((c) => words(c).includes(n.toLowerCase())));", 'G3-564', 1, 'load', "names a person of the key's other right characters"),
    F('the other right answers shown on the page of the child', ALSO_STYLE, "<div data-lcs-alsorow style=\"min-height:16px;font:700 13px/1.25 'Nunito',sans-serif;color:${T.teal};\"", 'G3-564', 3, null, 'shown on the page of the child'),
    F('the other right answers do not fit their row', ALSO_STYLE, "<div data-lcs-alsorow style=\"min-height:16px;font:700 60px/1.25 'Nunito',sans-serif;white-space:nowrap;overflow:hidden;color:${T.teal};${key ? '' : 'visibility:hidden'}\"", 'G3-564', 3, null, 'do not fit their row'),
    F('level 1 takes stories told by a character', 'const pool = d.pov ? third : [...third.slice(0, first.length), ...first];', 'const pool = d.pov ? first : [...third.slice(0, first.length), ...first];', 'G3-564', 1),
    // ------------------------------------------------------------------------------------------- G3-565
    F('the example is the plan of an idea the child may choose', PLAN_EX, 'const ex = first;\n    return { mode, lv, ideas, ex,', 'G3-565', 1, null, 'the child may choose'),
    F('the example is the plan of a prompt idea that is not on the page', PLAN_EX, 'const ex = shuffle(b.ideas.filter((x) => !ideas.includes(x)), rng)[0];\n    return { mode, lv, ideas, ex,', 'G3-565', 1, null, 'is a prompt of the unit'),
    F('an example idea offered as a prompt', 'const ideas = [first, ...rest.slice(0, d.ideas - 1)];', 'const ideas = [first, ...rest.slice(0, d.ideas - 2), b.exampleIdeas[0]];', 'G3-565', 1, null, 'offered as a prompt'),
    F('a starter for the characters on level 2', "d.start === 'events' && (row === 'events' || row === 'ending')", "d.start === 'events' && (row === 'events' || row === 'ending' || row === 'chars')", 'G3-565', 2),
    F('the story mountain without its events', "[105, 22, 'Events', 105, 14, 'middle']", "[105, 22, 'Middle', 105, 14, 'middle']", 'G3-565', 1),
    F('a checklist line of another wording', "const CHECK = {\n  plan: ['I named my characters.'", "const CHECK = {\n  plan: ['I named the characters.'", 'G3-565', 1),
    F('the word bank on level 2', "2: { ideas: 3, start: 'events' }", "2: { ideas: 3, start: 'events', bank: true }", 'G3-565', 2),
    F('the events with no line to spare', "${ls.join('')}${wline({ w })}</div></div>`;", "${ls.join('')}</div></div>`;", 'G3-565', 1),
    F('the characters on two lines (no line to spare)', 'writeGroup({ n: half ? 3 : 2,', 'writeGroup({ n: 2,', 'G3-565', 1),
    F('the example plan shares its topic with an idea offered', IDEAS_INFO, "ideas: Object.fromEntries([...BANK.ideas, ...BANK.exampleIdeas].map((x) => [x.id, { ...x, topic: 'school' }])),", 'G3-565', 1, null, 'the example shares its topic'),
    // ------------------------------------------------------------------------------------------- G3-566
    F('level 2 offers other words, not other marks', "const wrong = d.kind === 'words' ?", "const wrong = d.kind !== 'never' ?", 'G3-566', 2),
    F('level 1 asks for a question mark', "if (lv === 1 && p2.some((x) => x.tag === 'asked')) continue;", "if (lv === 1 && !p2.some((x) => x.tag === 'asked')) continue;", 'G3-566', 1),
    F('a mark printed in the line to punctuate', '  return `${core} ${d.tag} ${d.n}.`;\n}', '  return `${core}, ${d.tag} ${d.n}.`;\n}', 'G3-566', 1),
    F('the key writes the line without its marks', '${writeGroup({ n: 2, w: WQ, text: dlgRight(x, x.form), key })}', '${writeGroup({ n: 2, w: WQ, text: dlgRaw(x, x.form), key })}', 'G3-566', 1),
    F('level 3 never puts the speaker first', ["const formOf = (x) => (lv === 3 && tagOk(x) && rng.int(0, 2) === 0 ? 'tag' : 'first');", "if (lv === 3 && (![...p1, ...p2].some((x) => x.form === 'tag') || !p2.some((x) => x.form === 'tag') || p2.every((x) => x.form === 'tag'))) continue;"], ["const formOf = (x) => 'first';", ''], 'G3-566', 3),
    F('the speech bubble shows other words', '${esc(x.s)}<span style="position:absolute;left:22px;', '${esc(x.other)}<span style="position:absolute;left:22px;', 'G3-566', 1),
    F('the box of level 1 without the rule for the speaker first', "b.push(ruleBox('Writing dialogue', RULES.marks));", "b.push(ruleBox('Writing dialogue', RULES.marks.slice(0, 3)));", 'G3-566', 1, null, 'the rules of this level'),
    F('the box says only a comma or a question mark goes inside', "\n  marks: ['Quotation marks go around the exact words a speaker says: \"We won,\" said Kim.', 'A comma or an end mark (. ? !) goes inside", "\n  marks: ['Quotation marks go around the exact words a speaker says: \"We won,\" said Kim.', 'A comma or a question mark goes inside", 'G3-566', 3, null, 'the rules of this level'),
    // ------------------------------------------------------------------------------------------- G3-567
    F('the frame prints two opening marks', "${mark('”', 12)}", "${mark('“', 12)}", 'G3-567', 1),
    F('a frame blank too narrow for its words', "${blank(frameSay(x), FRAME_SAY, 'say')}", "${blank(frameSay(x), 150, 'say')}", 'G3-567', 1),
    F('the story idea for the dialogue is not printed', '${esc(LINES.idea)} <i>${esc(P.idea.idea)}</i>', '${esc(LINES.idea)} <i>${esc(P.idea.id)}</i>', 'G3-567', 2),
    F('the idea for the dialogue is an example idea', '<div data-lcs-idealine data-lcs-idea="${A(P.idea.id)}" data-lcs-read style="font:700 ${READ - 1}px/1.3 \'Nunito\',sans-serif;color:${T.ink}">${esc(LINES.idea)} <i>${esc(P.idea.idea)}</i></div>', '<div data-lcs-idealine data-lcs-idea="${A(BANK.exampleIdeas[0].id)}" data-lcs-read style="font:700 ${READ - 1}px/1.3 \'Nunito\',sans-serif;color:${T.ink}">${esc(LINES.idea)} <i>${esc(BANK.exampleIdeas[0].idea)}</i></div>', 'G3-567', 2, null, 'is an example idea'),
    F('the box of level 2 holds the words that show', "(P.lv === 2 ? BANK.saidWords : BANK.showWords).join(', ')", "(BANK.showWords).join(', ')", 'G3-567', 2),
    F('level 1 offers two sentences that show the feeling', 'const opts = [x.wrong]; opts.splice(at[k], 0, x.right);', 'const opts = [x.act]; opts.splice(at[k], 0, x.right);', 'G3-567', 1),
    F('the checklist of level 1 without its said-word line', SHOW_CHECK, 'b.push(checklist([...CHECK.show, ...(P.lv === 1 ? [] : [P.lv === 2 ? CHECK.showNoFeel : CHECK.showAct])]));', 'G3-567', 1, null, 'the checklist is not the one of this level'),
    F('the checklist of level 2 without its feeling-word line', SHOW_CHECK, 'b.push(checklist([...CHECK.show, ...(P.lv === 2 ? [] : [P.lv === 1 ? CHECK.showSaid : CHECK.showAct])]));', 'G3-567', 2, null, 'the checklist is not the one of this level'),
    F('the checklist of level 3 without its action line', SHOW_CHECK, 'b.push(checklist([...CHECK.show, ...(P.lv === 3 ? [] : [P.lv === 1 ? CHECK.showSaid : CHECK.showNoFeel])]));', 'G3-567', 3, null, 'the checklist is not the one of this level'),
    // ------------------------------------------------------------------------------------------- G3-568
    F('the events printed in order', 'o = shuffle([...ev.keys()], rng); if (orderOk(o)) break; o = null;', 'o = [...ev.keys()]; break;', 'G3-568', 1),
    F('the key numbers the events wrong', "${key ? k + 1 : ''}</span><span data-lcs-read data-lcs-evtext", "${key ? k : ''}</span><span data-lcs-read data-lcs-evtext", 'G3-568', 1),
    F('a second time word that fits is offered', 'const opts = shuffle(g.wrong.map((x) => x[0]), rng); opts.splice(at[k], 0, g.right);', 'const opts = shuffle([g.wrong[0][0], g.fits.find((w) => w !== g.right)], rng); opts.splice(at[k], 0, g.right);', 'G3-568', 2),
    F('the answer does not fit its blank', 'width:${Math.max(110, Math.max(...g.opts.map((o) => o.length)) * 9 + 18)}px', 'width:50px', 'G3-568', 2),
    F('one time word answers three tiny stories', 'if (gs.some((g) => gs.filter((h) => h.right === g.right).length > 2)) continue;', "if (lv === 1 && gs.filter((g) => g.right === 'First').length < 3) continue;", 'G3-568', 1, null, 'is the answer of more than'),
    F('six events on level 2', 'order: { 1: { events: 4, gaps: 4 }, 2: { events: 5, gaps: 3 }', 'order: { 1: { events: 4, gaps: 4 }, 2: { events: 6, gaps: 3 }', 'G3-568', 2),
    // ------------------------------------------------------------------------------------------- G3-569
    F('the idea of the draft is an example idea', "const idea = stepOf(b.ideas, 'draft|' + lv, v);", "const idea = stepOf(b.exampleIdeas, 'draft|' + lv, v);", 'G3-569', 2, null, 'is an example idea'),
    F('the example is the story of a prompt idea', DRAFT_EX, 'const ex = shuffle(b.ideas.filter((x) => x !== idea), rng)[0];\n    return { mode, lv, idea, ex,', 'G3-569', 1, null, 'is a prompt of the unit'),
    F('the example is the idea the child writes about', DRAFT_EX, 'const ex = idea;\n    return { mode, lv, idea, ex,', 'G3-569', 1, null, 'the idea the child writes about'),
    F('the example story shares its topic with the idea written about', IDEAS_INFO, "ideas: Object.fromEntries([...BANK.ideas, ...BANK.exampleIdeas].map((x) => [x.id, { ...x, topic: 'school' }])),", 'G3-569', 1, null, 'the example shares its topic'),
    F('the example story without its ending', 'const exText = [dr.beginning, ...dr.events, dr.ending].map(teal).join(\' \');', 'const exText = [dr.beginning, ...dr.events].map(teal).join(\' \');', 'G3-569', 1, null, 'not printed as the bank has it'),
    F('the example takes more than three lines', "<div data-lcs-read data-lcs-extext style=\"font:700 ${STORY}px/1.3 'Nunito',sans-serif;", "<div data-lcs-read data-lcs-extext style=\"max-width:520px;font:700 ${STORY}px/1.3 'Nunito',sans-serif;", 'G3-569', 1, null, 'takes more than'),
    F('the row of time words missing on level 1', '(d.strip ? `<div data-lcs-timerow', '(false ? `<div data-lcs-timerow', 'G3-569', 1),
    F('the row of time words of another list', "const TIME_ROW = ['first', 'next', 'then', 'after that', 'later that day', 'suddenly', 'finally'];", "const TIME_ROW = ['first', 'next', 'then', 'after that', 'the night before', 'suddenly', 'finally'];", 'G3-569', 1, null, 'not the one of this level'),
    F('the row of time words on two lines', "<div data-lcs-timerow data-lcs-ruletext style=\"font:700 ${RULEPX}px/1.3", "<div data-lcs-timerow data-lcs-ruletext style=\"max-width:420px;font:700 ${RULEPX}px/1.3", 'G3-569', 2, null, 'takes more than one line'),
    F('a time word twice in the word bank', "const TIME_BANK = ['one morning', 'at first', 'after a while', 'the next day', 'just then', 'at last'];", "const TIME_BANK = ['one morning', 'at first', 'after a while', 'the next day', 'just then', 'at last', 'just then'];", 'G3-569', 3, null, 'stands twice in the list of time words'),
    F('a heading of another wording', "const DRAFT_HEAD = { beginning: 'Beginning: the characters, the setting, and the problem'", "const DRAFT_HEAD = { beginning: 'Beginning'", 'G3-569', 1),
    F('starters on level 2', DRAFT_L2, '2: { start: true, strip: true, lines: { beginning: 4, events: 7, ending: 3 } }', 'G3-569', 2, null, 'the starters are'),
    F('level 2 with a line less for the events', DRAFT_L2, '2: { start: false, strip: true, lines: { beginning: 4, events: 6, ending: 3 } }', 'G3-569', 2, null, 'the draft has'),
    F('an event with three lines', "return writeGroup({ n: 2, w, h, text: e, key, attrs: 'data-lcs-event' }); });", "return writeGroup({ n: 3, w, h, text: e, key, attrs: 'data-lcs-event' }); });", 'G3-569', 2, null, 'two lines each'),
    F("level 1 starts the beginning with the idea's own time words", DRAFT_BEG1, 'writeGroup({ n: d.lines.beginning, w, h, text: x.oneDay, starter: x.beginning.match(/^([^,]+,)/)[1], key })', 'G3-569', 1, null, 'the starters are'),
    F('the sample beginning of level 1 is not the one written for "One day,"', DRAFT_BEG1, "writeGroup({ n: d.lines.beginning, w, h, text: x.beginning.replace(/^[^,]+, /, ''), starter: 'One day,', key })", 'G3-569', 1, null, 'not the story of the idea'),
    F('the sample story has no line of dialogue', DRAFT_X, 'const x = JSON.parse(JSON.stringify(P.idea.draft).split(String.fromCharCode(92, 34)).join(\'\')), w = INNER - 20;', 'G3-569', 2, null, 'has no line of dialogue'),
    F('the sample story shows no feeling', DRAFT_X, "const x = JSON.parse(JSON.stringify(P.idea.draft).replace(/\\b(smiled|grinned|laughed|cheered|gasped|sighed|frowned|shook|trembled|giggled|jumped|hugged|clapped)\\b/g, 'nodded')), w = INNER - 20;", 'G3-569', 2, null, 'shows a feeling'),
    F('the checklist of the draft without its dialogue line', "\n  draft: ['I used a time word for each event.', 'My events are in order.', 'My ending solves the problem.', 'I used one line of dialogue.', 'A character", "\n  draft: ['I used a time word for each event.', 'My events are in order.', 'My ending solves the problem.', 'A character", 'G3-569', 3, null, 'the checklist is not the one of the draft'),
    // ------------------------------------------------------------------------------------------- G3-570
    F('level 3 offers wrong words of another group', "3: { n: 4, wk: 'w3', pairs: 2 }", "3: { n: 4, wk: 'w2', pairs: 2 }", 'G3-570', 3),
    F('the tired word not underlined', '<u data-lcs-tiredword style="text-decoration-thickness:2.5px;text-underline-offset:4px">${esc(w)}</u>', '<span data-lcs-tiredword>${esc(w)}</span>', 'G3-570', 1),
    F('the right word of one sentence offered in another', ['const items = xs.map((x, k) => { const opts = shuffle(x[d.wk], rng);', 'if (items.some((x) => items.some((y) => y !== x && y.opts.includes(x.right)))) continue;'], ['const items = xs.map((x, k) => { const opts = shuffle([x[d.wk][0], xs[(k + 1) % xs.length].right], rng);', ''], 'G3-570', 1),
    F('the clearer sentence is the longer one in both pairs', 'const shorter = shuffle(cp.filter((c) => c.strong.length < c.weak.length), rng)[0]', 'const shorter = shuffle(cp.filter((c) => c.strong.length > c.weak.length && c.i < 4), rng)[0]', 'G3-570', 1),
    F('one line for the why (no line to spare)', '${writeGroup({ n: 2, w: WI, text: c.why, key })}', '${writeGroup({ n: 1, w: WI, text: c.why, key: false })}', 'G3-570', 1),
    // ------------------------------------------------------------------------------------------- G3-571
    F('the page of the child rings the tired words', '${esc(w)}${key ? `<span data-lcs-ringmark', '${esc(w)}${true ? `<span data-lcs-ringmark', 'G3-571', 3),
    F('level 2 heads the answers without their tired word', "${j + 1}.${d.find ? '' : ' ' + esc(w)}", '${j + 1}.', 'G3-571', 2),
    F('the key names no other word that fits', '${key && also.length ?', '${false ?', 'G3-571', 2),
    F('a changed word printed as its tired word', '<span data-lcs-slot="${k}" data-lcs-done="1">${esc(s.fits[0])}</span>', '<span data-lcs-slot="${k}" data-lcs-done="1">${esc(w)}</span>', 'G3-571', 1),
    F('the box without one group', 'Object.entries(BANK.box).map(([g, ws])', 'Object.entries(BANK.box).slice(1).map(([g, ws])', 'G3-571', 1),
    F('level 1 offers one word in two items', ['const s = p.sents[k], right = s.fits[0], opts = [s.l1];', '        if (new Set(items.flatMap((x) => x.opts)).size !== items.length * 2) continue;\n'], ['const s = p.sents[k], right = s.fits[0], opts = [j ? p.sents[ks[0]].fits[0] : s.l1];', ''], 'G3-571', 1, null, 'offered in two items'),
    F('the samples of the own story are those of a prompt idea', 'const sample = shuffle(b.exampleIdeas, rng)[0];', 'const sample = shuffle(b.ideas, rng)[0];', 'G3-571', 1, null, 'is a prompt of the unit'),
    F('two sentences of the own story only', 'P.sample.revise.map((s, i) =>', 'P.sample.revise.slice(1).map((s, i) =>', 'G3-571', 1),
    F('the samples of the own story are those of another idea', 'P.sample.revise.map((s, i) =>', 'BANK.ideas.find((x) => x !== P.sample).revise.map((s, i) =>', 'G3-571', 1, null, 'is not keyed to a revised sentence of the idea'),
    F('the key note of the box words names only the group', "note('(Any word of the box that fits is right.)', key)", "note('(Any word of the group that fits is right.)', key)", 'G3-571', 2, null, 'is not one that says'),
    F('the key names another idea for its samples', "note(SAMPLES_FOR + P.sample.idea + ')', key)", "note(SAMPLES_FOR + BANK.ideas.find((x) => x !== P.sample).idea + ')', key)", 'G3-571', 1, null, 'does not name the story idea of its samples'),
    // ------------------------------------------------------------------------------------------- the bank
    B('a story told by a narrator outside it says I', (b) => { const s = ST(b, 'play'); s.text = s.text.replace('She wore a crown', 'I saw that she wore a crown'); }),
    B('a wrong problem names a word of the text', (b) => { ST(b, 'glue').far[0][1] = ['glue']; }),
    B('both wrong problems shorter than the right one', (b) => { ST(b, 'door').near[0][0] = 'The pot breaks.'; }),
    B('a story beginning of 40 words', (b) => { const s = ST(b, 'knot'); s.text = s.text.split('. ').slice(0, 3).join('. ') + '.'; }),
    B('a problem to circle of more than 50 letters', (b) => { ST(b, 'play').far[1][0] = 'Kofi trips over a long black cable and falls right off the stage.'; }),
    B('a setting to circle longer than its column holds', (b) => { ST(b, 'volcano').time = 'on the morning of the science fair'; }),
    B('fewer than ten stories told by a character', (b) => { b.stories = b.stories.filter((s) => s.id !== 'window'); }),
    B('too few names in the pools', (b) => { b.pools.names = b.pools.names.slice(0, 5); }),
    B('too few school-day times in the pools', (b) => { b.pools.schoolTimes = b.pools.schoolTimes.slice(0, 6); }),
    B('a title that names the trouble', (b) => { ST(b, 'glue').title = 'The Dried Glue Stick'; }),
    B('a title that names a word of the setting', (b) => { ST(b, 'recorder').title = 'Music Class'; }),
    B('a title that names the second character', (b) => { ST(b, 'play').title = 'Kofi Helps Out'; }),
    B('the sandcastle story without its mother among the other right characters', (b) => { delete ST(b, 'sandcastle').alsoChars; }),
    B('a story not marked as set at school or outside it', (b) => { delete ST(b, 'glue').school; }),
    B('a story told by a character whose key cannot name the narrator', (b) => { delete ST(b, 'room12').narratorIs; }),
    B('an other right problem that is not one sentence', (b) => { ST(b, 'pencils').also = 'Their pencils are dull, and the sharpener is broken'; }),
    B('other right answers longer than two lines of the key', (b) => { ST(b, 'pencils').also = 'Their pencils are all dull, the sharpener is broken, and they need sharp pencils to write the words of their spelling test this morning before the bell rings.'; }),
    B('a plan note longer than its lines', (b) => { b.ideas[0].plan.problem = "Ana's red mitten is gone and nobody can find it"; }),
    B('a setting note without a time', (b) => { ID(b, 'newstudent').plan.setting = 'in the classroom'; }),
    B('an event of a draft without its time word', (b) => { b.ideas[1].draft.events[0] = 'Sam said hi, but she looked down.'; }),
    B('a draft beginning that leaves the first character out', (b) => { ID(b, 'bee').draft.beginning = 'One spring morning, a bee flew into the classroom where Rosa sat.'; }),
    B('a draft beginning that does not name the place', (b) => { ID(b, 'newstudent').draft.beginning = 'On Monday morning, a new girl named Priya met Sam and sat all alone.'; }),
    B('a draft with no line of dialogue', (b) => { ID(b, 'bee').draft.events[0] = 'First, Rosa saw the bee and pointed at it.'; }),
    B('a draft with no sentence that shows a feeling', (b) => { ID(b, 'bee').draft.ending = 'Finally, the bee flew out of the window.'; }),
    B('no level-1 beginning after "One day,"', (b) => { delete ID(b, 'newstudent').draft.oneDay; }),
    B('a level-1 beginning that does not name the place', (b) => { ID(b, 'newstudent').draft.oneDay = "a new girl named Priya joined Sam's group and sat all alone."; }),
    B('a level-1 beginning that does not name the characters', (b) => { ID(b, 'newstudent').draft.oneDay = 'a new girl came into the classroom and sat all alone.'; }),
    B('an example draft longer than three printed lines', (b) => { b.exampleIdeas[0].draft.events[2] = 'Then, he dug in the deep white snow with both of his hands until his fingers were cold and red and wet.'; }),
    B('fewer than three example ideas', (b) => { b.exampleIdeas = b.exampleIdeas.slice(0, 2); }),
    B('an example idea shares its topic with a prompt', (b) => { b.exampleIdeas[0].topic = b.ideas[0].topic; }),
    B('no line of dialogue of an idea uses cried, shouted, or whispered', (b) => { ID(b, 'newstudent').dialogue.forEach((d) => { if (d.tag === 'cried') d.tag = 'said'; }); }),
    B('no action of the dialogue of an idea uses a word that shows', (b) => { ID(b, 'newstudent').dialogue[0].act = 'He moved his books to make room.'; }),
    B('a said-word of a dialogue sample that is not in the box', (b) => { b.saidWords = b.saidWords.map((w) => (w === 'cried' ? 'called' : w)); }),
    B('an idea that assumes a holiday', (b) => { b.ideas[0].idea = 'A mitten goes missing on Christmas.'; }),
    B('a revised sentence that keeps a tired word', (b) => { b.ideas[2].revise[0] = 'Tomas looked at the gray sky.'; }),
    B('a line of dialogue with a comma of its own', (b) => { b.dialogue[0].s = 'Leo, where is my hat?'; }),
    B('the other version changes two words', (b) => { b.dialogue[1].other = "Let's run to the slide."; }),
    B('a told version that shows the exact words', (b) => { b.dialogue[2].rep = 'Omar asked, "Can I sit here?"'; }),
    B('a sentence that shows the feeling names it', (b) => { b.telling[0].right = 'Mia was so scared that she hid.'; }),
    B('two telling sentences of one feeling', (b) => { b.telling[1].f = b.telling[0].f; b.telling[1].t = b.telling[1].n + ' was ' + b.telling[0].f + '.'; }),
    B('two events of a story that the time words cannot order', (b) => { const o = b.orderStories[0]; [o.events[1], o.events[2]] = [o.events[2], o.events[1]]; }),
    B('an event to order that starts with then', (b) => { b.orderStories[1].events[2] = 'Then, they nailed the pieces together.'; }),
    B('a story to order that does not say what orders it', (b) => { delete b.orderStories[0].kind; }),
    B('the seasons story on level 1 (its four seasons make a circle)', (b) => { delete b.orderStories.find((o) => o.id === 'appletree').minLevel; }),
    B('a wrong time word that fits', (b) => { const g = b.gaps[0]; g.fits.push(g.wrong[0][0]); }),
    B('the ending word offered is not the one the tiny story ends with', (b) => { b.gaps[1].wrong[1][0] = 'At last'; }),
    B('a level-3 wrong word of another group', (b) => { b.choose[0].w3 = ['shouted', 'raced']; }),
    B('a sentence with two tired words', (b) => { b.choose[1].t = 'The big bus was about to leave, so Leo {went} to the bus stop.'; }),
    B('a why that does not fit its lines', (b) => { b.compare[0].why = 'Splashed tells how the dog went into the pond with a big splash.'; }),
    B('the clearer sentence is the longer one in nearly every pair', (b) => { b.compare.filter((c) => c.strong.length < c.weak.length).slice(0, 3).forEach((c) => { while (c.strong.length <= c.weak.length) c.strong = c.strong.slice(0, -1) + ' again.'; }); }),
    B('a tired word outside the slots of a paragraph', (b) => { b.paragraphs[0].sents[0].text = 'The big library was so quiet that Ella {said} hello to Mr. Grant.'; }),
    B('a level-1 wrong word that fits', (b) => { b.paragraphs[0].sents[0].l1 = 'whispered'; }),
    B('a word that fits a paragraph slot and is no word of the box', (b) => { b.paragraphs[0].sents[0].fits.push('murmured'); }),
    B('a group of the box with three words', (b) => { b.box.big = b.box.big.slice(0, 3); }),
    B('a level-3 tiny story longer than two lines', (b) => { b.gaps.find((g) => g.lv === 3).s[0] = 'Kim was reading a long book about whales and sharks in the quiet school library.'; }),
    B('a beginning of lesson 1 shares its topic with a story idea', (b) => { b.stories.find((x) => x.id === 'airplane').topic = b.ideas[0].topic; }),
    B('a story to order shares its topic with a story idea', (b) => { b.orderStories[0].topic = b.ideas[1].topic; }),
    B('a tiny story shares its topic with a story idea', (b) => { b.gaps[10].topic = b.ideas[2].topic; }),
    B('two story ideas share a topic', (b) => { b.ideas[1].topic = b.ideas[0].topic; }),
    B('a piece without a topic', (b) => { delete b.gaps[3].topic; }),
  ];
};
