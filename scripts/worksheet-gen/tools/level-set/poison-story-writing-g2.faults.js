/**
 * The planted faults of poison-story-writing-g2.js (types/_shared/story-writing-g2.js and
 * data/literacy/story-writing-g2.en.json): [name, file, text to find, its replacement, types (+), level, 'load' when a
 * factory fault must stop the factory as it loads, and the words of the report of its own rule, which must be among the
 * reports]. A factory text must stand in the factory exactly once (text and replacement may be lists: several changes at
 * once); the poison script refuses to run otherwise, so a changed factory cannot pass with a stale list. A bank fault
 * changes a copy of the bank and writes it whole (the text to find is the whole bank file). One fault for every rule
 * verify() measures and every rule the bank check (faultsOf) holds. (Round 2, 2026-11-17: the rules of the Grade 2
 * writing specialist's review and the rulings of fix-orders.md have faults of their own.)
 */
'use strict';
const fs = require('fs');
module.exports = (FACTORY, BANK) => {
  const orig = fs.readFileSync(BANK, 'utf8').replace(/\r\n/g, '\n');
  /** a bank fault: change a copy of the bank, expect the bank's check (the factory throws when it loads) */
  const B = (name, mutate, expect) => { const b = JSON.parse(orig); mutate(b); return ['bank: ' + name, BANK, orig, JSON.stringify(b, null, 1) + '\n', 'G2-571', 1, null, expect]; };
  const F = (name, find, repl, types, level, where, expect) => [name, FACTORY, find, repl, types, level, where, expect];
  const ST = (b, id) => b.stories.find((s) => s.id === id);
  const ID = (b, id) => b.ideas.find((d) => d.id === id);
  const EX = (b, id) => b.exampleIdeas.find((d) => d.id === id);
  const ED = (b, id) => b.editStories.find((e) => e.id === id);
  // texts that several faults change
  const ROOT_JOIN = "fRoom(typo(blocks.join('')))";
  const ROOT_FLEX = 'justify-content:space-evenly;gap:5px;min-height:0">';
  const BYLINE = "const BYLINE = 'A story by a second grader';";
  const READ_STORY = "const st = stepOf(b.stories, 'read|' + lv, v), sents = st[d.ver];";
  const FE = 'const fe = k === P.feel;';
  const STORY_JOIN = "    }).join(' ');\n    const fs = P.lv === 1 ? STORY1 : READ;";
  const NUM_EV = 'numBox(k + 1, key, 36)';
  const OPTS = 'opts = shuffle([st.end.newEvent, st.end.again], rng);';
  const TITLE = "<div data-lcs-stitle data-lcs-noroom style=\"font:700 21px/1.2 'Baloo 2',cursive;color:${T.ink}\">${esc(st.title)}</div>";
  const END_W = 'writeGroup({ n: 4, w: WR, text: st.end.right, key })';
  const END_LABEL = 'label(4, esc(LINES.endWrite) + note(NOTES.endWrite, key))';
  const SHOWN = 'const shown = EV_ORDERS[EV_SEQ[lv][(v - 1) % EV_SEQ[lv].length]];';
  const PLAN_RET = 'return { mode, lv, ideas: [a, c], ex: x,';
  const EV_TEXT = "const evText = (k, i) => (d.start === 1 ? x[k] : d.start === 2 ? 'I ' + x[k] : PLAN_TW[i] + ', I ' + x[k]);";
  const PLAN_LABEL = 'label(2, esc(LINES.plan[P.lv]) + note(NOTES.plan, key))';
  const INFO_IDEAS = 'ideas: Object.fromEntries([...BANK.ideas, ...BANK.exampleIdeas].map((x) => [x.id, x])),';
  const INFO_TOPIC = "ideas: Object.fromEntries([...BANK.ideas, ...BANK.exampleIdeas].map((x) => [x.id, { ...x, topic: 'one topic' }])),";
  const EX_IDS = 'exampleIds: BANK.exampleIdeas.map((x) => x.id),';
  const DRAFT_L2 = '2: { strip: true, lines: { beginning: 3, middle: 4, ending: 3 } }';
  const DRAFT_LABEL = "label(1, esc(LINES.draft[P.lv])) + alsoRow([SAMPLE_FOR + x.idea + ')', NOTES.draft], key)";
  const ANSWER = "answer: key ? parts[i] || null : null })).join('')";
  const NUM_STRIP = "numBox(off ? '' : rank[k], key, 30)";
  const MOVE_PICK = 'if (rng.int(0, 1)) { moved = 1;';
  const EDIT_L1 = '1: { caps: 2, ends: 2, move: false, off: false, rows: 5, pad: 23 }';
  const EDIT_L2 = '2: { caps: 3, ends: 2, move: true, off: false, rows: 5, pad: 17 }';
  const PLANTED = '      const s = S[k], m = P.marks[k];';
  const EDIT_LABEL = 'label(1, esc(LINES.edit[P.lv]) + note(NOTES.excl, key))';
  const KEYCAP = "top:-0.8em;font:800 16px/1 'Nunito',sans-serif;color:${T.teal}\">${esc(ch.toUpperCase())}";
  const CHECKS_REV = 'const checks = CHECK.revise[P.lv];';
  const PAIR = "b.push(`<div data-lcs-pair style=\"display:grid;grid-template-columns:${PAIR}px ${PAIR}px;gap:0 ${W - 2 * PAIR}px\">${card('liked', 2, sm.liked, { half: true })}${card('asked', 3, sm.asked, { half: true })}</div>`);";
  const ALSO_REV = "const also = alsoRow([SAMPLES_FOR + P.sample.idea + ')', NOTES.revise], key);";
  const ADDED_12 = "b.push(card('added', 3, sm.added, { extra: also }));";
  const FIXED_12 = "b.push(card('fixed', 4, sm.fixed));";
  const IMG = '<img src=\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==\\" style=\\"width:4px;height:4px\\">';
  return [
    // ------------------------------------------------------------------------------------------- every page
    F('the font joins fi and fl (no rule before the root)', "const STYLE = '<style>[data-lcs-noliga],[data-lcs-noliga] *{", "const STYLE = '<style>[data-lcs-nolig],[data-lcs-nolig] *{", 'G2-571', 1, null, 'may join its letters'),
    F('the root without its mark for no joined letters', 'data-lcs-sw2="${mode}|${lv}" data-lcs-noliga="1"', 'data-lcs-sw2="${mode}|${lv}" data-lcs-noliga="0"', 'G2-571', 1, null, 'does not turn ligatures off'),
    F('no room after an f before i, f, l, or t (HTML)', ROOT_JOIN, "(typo(blocks.join('')))", 'G2-573', 2, null, 'has no room of its own'),
    F('no room after an f before i, f, l, or t (the rows)', 'const svgRoom = (s) => `<tspan>${String(s).replace(/(f(?=[iflt])|t(?=t))/g, `$1</tspan><tspan dx="${FROOM}" data-lcs-fsep="1">`)}</tspan>`;', 'const svgRoom = (s) => `<tspan>${String(s)}</tspan>`;', 'G2-573', 2, null, 'has no room of its own'),
    // ruling L: a word is never seen split after an f or a t (1 px at most in the body font, none in the heading font)
    F('too much room after an f or a t (the body font: a word seen split)', 'const FROOM = 1;', 'const FROOM = 4;', 'G2-571', 1, null, 'a word is seen split after an f or a t'),
    F('room after an f in the heading font ("Find and f ix")', '/\\sdata-lcs-noroom[\\s>=]/.test(tag)', '/\\sdata-lcs-noroomx[\\s>=]/.test(tag)', 'G2-574', 1, null, 'none in the heading font'),
    F('too much room after an f or a t on a row (the SVG text)', ['`$1</tspan><tspan dx="${FROOM}" data-lcs-fsep="1">`', "const DRAFT_START = { beginning: 'One day,',"], ['`$1</tspan><tspan dx="${FROOM + 4}" data-lcs-fsep="1">`', "const DRAFT_START = { beginning: 'One day after,',"], 'G2-573', 1, null, 'on a row'),
    F('the instruction of level 1 is not the one of its level', "\n  read: { 1: 'A true story tells what happened to me, in order.'", "\n  read: { 1: 'A true story tells what happened, in order.'", 'G2-571', 1, null, 'is not the one of level 1'),
    F('straight apostrophes and quotation marks printed', [ROOT_JOIN, BYLINE], ["fRoom(blocks.join(''))", "const BYLINE = \"A second grader's story\";"], 'G2-574', 1, null, 'straight apostrophe'),
    F('a picture on a page without pictures', "    b.push(ruleBox('A true story', RULES.read));", "    b.push(ruleBox('A true story', RULES.read) + '" + IMG + "');", 'G2-571', 1, null, 'a picture on a page without pictures'),
    F('a block leaves the page', '<fieldset data-lcs-checklist data-lcs-card ${attrs} style="margin:0;min-width:0;display:grid;', '<fieldset data-lcs-checklist data-lcs-card ${attrs} style="margin:300px 0 0;min-width:0;display:grid;', 'G2-573', 1, null, 'leaves the page'),
    F('a choice leaves its card', 'style="flex:0 0 auto;align-self:flex-start;white-space:nowrap;font:700 ${OPT}px', 'style="margin-left:-90px;flex:0 0 auto;align-self:flex-start;white-space:nowrap;font:700 ${OPT}px', 'G2-571', 1, null, 'leaves its card'),
    F('the blocks fill too little of the page (the events left out)', "    b.push(cream('data-lcs-task=\"order\"'", "    if (0) b.push(cream('data-lcs-task=\"order\"'", 'G2-571', 1, null, 'of the page body'),
    F('sentences printed at 16 px', 'const READ = 18;', 'const READ = 16;', 'G2-572', 1, null, 'text a second grader reads is 16'),
    F('choices printed at 19 px', 'const OPT = 20;', 'const OPT = 19;', 'G2-571', 1, null, 'a choice to circle is 19'),
    F('the boxes printed at 14 px', 'const RULEPX = 16;', 'const RULEPX = 14;', 'G2-574', 1, null, 'a box or an example is printed at 14'),
    F('task lines printed at 15 px', 'const LABEL = 17;', 'const LABEL = 15;', 'G2-574', 1, null, 'a task line smaller than 17'),
    F('a box to number of 12 px', NUM_EV, 'numBox(k + 1, key, 12)', 'G2-571', 1, null, 'smaller than 16 px'),
    F('writing rows of 40 px', 'const ROW = 44;', 'const ROW = 40;', 'G2-573', 1, null, 'a writing row 40 px high'),
    F('a writing row without its dotted midline', 'line-height:0">${svg}</div>`;', 'line-height:0">${svg.replace(/<line[^>]*stroke-dasharray[^>]*\\/>/, \'\')}</div>`;', 'G2-573', 1, null, 'without its three rules'),
    F('a key answer squeezed to fit its row', 'data-lcs-${kind}="1">${svgRoom(esc(s))}</text>`;', 'data-lcs-${kind}="1"${kind === \'keytext\' ? \' textLength="150"\' : \'\'}>${svgRoom(esc(s))}</text>`;', 'G2-573', 1, null, 'squeezed'),
    F('a key answer too big for its row', 'font-size="${KEYPX}" font-weight="700" fill="${fill}"', 'font-size="${kind === \'keytext\' ? 70 : KEYPX}" font-weight="700" fill="${fill}"', 'G2-573', 2, null, 'does not fit its row'),
    F('a key answer written over its starter', 'const ax = starter ? 8 + starterW(starter) + Math.round(0.3 * KEYPX) : 8;', 'const ax = 8;', 'G2-572', 1, null, 'runs into the starter'),
    F('a row filled on the page of the child', ['const parts = key ? spread(text, caps) : [];', ANSWER], ['const parts = spread(text, caps);', "answer: parts[i] || null })).join('')"], 'G2-573', 2, null, 'filled on the page of the child'),
    F('a starter not printed as it is given', "(starter ? txt(starter, 8, T.ink, 'starttext') : '')", "(starter ? txt(starter + ' so', 8, T.ink, 'starttext') : '')", 'G2-573', 1, null, 'a starter is not printed as it is given'),
    F('the page of the child rings the answers', "border:3px solid ${key && ok ? T.teal : 'transparent'}", "border:3px solid ${ok ? T.teal : 'transparent'}", 'G2-571', 1, null, 'ringed on the page of the child'),
    F('a label beside its row', 'data-lcs-own style="display:flex;flex-direction:column;gap:0;padding:0 10px"', 'data-lcs-own style="display:flex;flex-direction:row;align-items:flex-end;gap:0;padding:0 10px"', 'G2-572', 1, null, 'beside its row'),
    F('no row left free under a sample (the middle of level 2 on three rows)', DRAFT_L2, '2: { strip: true, lines: { beginning: 3, middle: 3, ending: 3 } }', 'G2-573', 2, null, 'must be left free'),
    F("the key's rows do not hold its sample", ANSWER, "answer: key ? parts[(i + 1) % n] || null : null })).join('')", 'G2-573', 2, null, 'do not hold its sample'),
    F('the key fills the row that is left free', ANSWER, "answer: key ? (i === n - 1 ? 'yes' : parts[i] || null) : null })).join('')", 'G2-573', 2, null, 'fills the row that is to be left free'),
    F('the event rows have no row to spare', "attrs: `data-lcs-lineexpect=\"${A(evText(k, i))}\"` })).join('') + row({ w: PW });", "attrs: `data-lcs-lineexpect=\"${A(evText(k, i))}\"` })).join('');", 'G2-572', 1, null, 'three with one to spare'),
    F('an event sample too long for its row', EV_TEXT, "const evText = (k, i) => (d.start === 1 ? x[k] + ' and then we all went back to our class' : d.start === 2 ? 'I ' + x[k] : PLAN_TW[i] + ', I ' + x[k]);", 'G2-572', 1, null, 'the sample does not fit the row at 21'),
    F('the key does not write the sample of an event row', 'row({ w: PW, starter: evStart(k), answer: key ? evText(k, i) : null,', 'row({ w: PW, starter: evStart(k), answer: key ? evText(k, i).toUpperCase() : null,', 'G2-572', 1, null, 'the key does not write its sample'),
    F('the task line of level 1 is not the one of its level', "\n  plan: { 1: 'Plan your story. Write notes and finish each sentence.'", "\n  plan: { 1: 'Plan your story. Finish each sentence.'", 'G2-572', 1, null, 'Finish each sentence.'),
    F("the key's notes show on the page of the child", "style=\"font-size:${size}px;color:${T.coral};${key ? '' : 'visibility:hidden'}\"", 'style="font-size:${size}px;color:${T.coral};"', 'G2-573', 1, null, 'says what the key says'),
    F('the page of the child keeps no room for the notes of the key (another geometry)', 'const note = (text, key, size = 14) => ` <span data-lcs-vary', "const note = (text, key, size = 14) => !key ? '' : ` <span data-lcs-vary", 'G2-574', 1, null, 'the page keeps 0 notes'),
    F('a ringed time word takes room in its line', '<span data-lcs-tw="${A(lead)}" style="position:relative">', '<span data-lcs-tw="${A(lead)}" style="position:relative;padding:0 4px">', 'G2-571', 1, null, 'takes room in a line of words'),
    F('an end mark to add takes room in its line', 'display:inline-block;width:0;height:1em;vertical-align:baseline', 'display:inline-block;width:6px;height:1em;vertical-align:baseline', 'G2-574', 1, null, 'an end mark to add takes room'),
    F('the ring of a time word stands in the line', '<span data-lcs-ring style="position:absolute;', '<span data-lcs-ring style="position:relative;display:inline-block;', 'G2-571', 1, null, 'is not placed apart'),
    F('the page of the child shows a ring', '${key ? `<span data-lcs-ring', '${true ? `<span data-lcs-ring', 'G2-571', 1, null, 'the page of the child shows a key mark'),
    F('a blank band in a card (the endings spread out)', 'data-lcs-opts style="display:flex;flex-direction:column;gap:9px;', 'data-lcs-opts style="display:flex;flex-direction:column;gap:60px;', 'G2-571', 1, null, 'px in end'),
    F('a blank band between two blocks (the marking card left out, the room pushed between the blocks)', ["    b.push(cream('data-lcs-task=\"mark\"'", ROOT_FLEX], ["    if (0) b.push(cream('data-lcs-task=\"mark\"'", 'justify-content:space-between;gap:5px;min-height:0">'], 'G2-571', 1, null, 'between two blocks'),
    F('a blank band at the foot of a card', 'padding:0 14px 5px;border:2px dashed', 'padding:0 14px 60px;border:2px dashed', 'G2-572', 1, null, 'at the foot of'),
    F('a blank band under the last block', ROOT_FLEX, 'justify-content:flex-start;gap:5px;min-height:0">', 'G2-571', 1, null, 'under the last block'),
    F("a blank band kept by the notes of the key on the page of the child", 'notes.map((t) => note(t, key, 13))', 'notes.map((t) => note(t, key, 34))', 'G2-573', 1, null, 'a blank band of'),
    // ------------------------------------------------------------------------------------------- G2-571
    F('the box does not tell the parts of a true story', "'<b>Details</b> tell more about what I did, saw, thought, or felt.'", "'<b>Details</b> tell what I did, thought, or felt.'", 'G2-571', 1, null, 'the box does not tell the parts of a true story'),
    F('the story of level 1 printed on level 2', READ_STORY, "const st = stepOf(b.stories, 'read|' + lv, v), sents = st.l1;", 'G2-571', 2, null, 'not printed as the bank has it for this level'),
    F('a fourth time word of the box in the story', STORY_JOIN, "    }).join(' ') + ' Then we sat.';\n    const fs = P.lv === 1 ? STORY1 : READ;", 'G2-571', 1, null, 'does not hold exactly 3 time words'),
    F('another time word in the story (before)', STORY_JOIN, "    }).join(' ').replace('.</span>', ' before lunch.</span>');\n    const fs = P.lv === 1 ? STORY1 : READ;", 'G2-571', 2, null, 'is a time word outside the three to circle'),
    F('a time word not marked as one', 'const ev = P.ev.includes(k), lead = ev ? leadOf(s) : null;', 'const ev = P.ev.slice(1).includes(k), lead = ev ? leadOf(s) : null;', 'G2-571', 2, null, 'are not three words of the box'),
    F('level 1 with other time words than First, Next, Then', READ_STORY, "const st = stepOf(b.stories, 'read|' + lv, v), sents = st[d.ver].map((x) => x.replace(/^Next, /, 'After that, '));", 'G2-571', 1, null, 'of level 1 are not First, Next, Then'),
    F('the key rings the time words in another color', 'border:2.5px solid ${T.teal};border-radius:999px"></span>` : \'\'}</span>${esc(s.slice(lead.length))}', 'border:2.5px solid ${T.coral};border-radius:999px"></span>` : \'\'}</span>${esc(s.slice(lead.length))}', 'G2-571', 1, null, 'a time word is not ringed on the key'),
    F('the marking task of level 1 is not its own', "\n  markFeel: { 1: 'Underline the sentence that tells how I felt.'", "\n  markFeel: { 1: 'Underline the sentence that tells how I feel.'", 'G2-571', 1, null, 'the marking tasks are not the ones of this level'),
    F('two sentences keyed as the feeling', FE, 'const fe = k === P.feel || k === 0;', 'G2-571', 1, null, 'not exactly one sentence of the story tells a feeling'),
    F('the feeling sentence of level 1 tells a thought', ': esc(s);\n      ' + FE, ": esc(k === P.feel && P.lv === 1 ? 'I thought it was fun.' : s);\n      " + FE, 'G2-571', 1, null, 'tells a thought'),
    F('the detail sentence of level 2 printed without its phrase and comma', ': esc(s);\n      ' + FE, ": esc(P.lv > 1 && k && !P.ev.includes(k) && k !== P.feel ? s.replace(/^[^,]+, /, '') : s);\n      " + FE, 'G2-571', 2, null, 'the detail sentence of the story does not open with a place'),
    F('the key underlines the feeling in another color', 'text-decoration:underline;text-decoration-color:${T.teal};text-decoration-thickness:3px;text-underline-offset:5px', 'text-decoration:underline;text-decoration-color:${T.coral};text-decoration-thickness:3px;text-underline-offset:5px', 'G2-571', 1, null, 'is not underlined on the key'),
    F('another sentence underlined', '      return `<span data-lcs-sent="${k}"${fe ?', '      return `<span data-lcs-sent="${k}"${k === 0 ? \' style="text-decoration:underline"\' : \'\'}${fe ?', 'G2-571', 1, null, 'another sentence is underlined'),
    F('an event printed with its time word', "const evText = (k) => cap1(P.sents[P.ev[k]].replace(/^[^,]+, /, ''));", 'const evText = (k) => cap1(P.sents[P.ev[k]]);', 'G2-571', 1, null, 'without its time word'),
    F('the key numbers an event wrong', NUM_EV, 'numBox(k + 2, key, 36)', 'G2-571', 1, null, 'an event is not numbered on the key'),
    F('the events printed in order', SHOWN, 'const shown = [0, 1, 2];', 'G2-571', 1, null, 'printed in an order a child can copy'),
    F('the events printed backward', SHOWN, 'const shown = [2, 1, 0];', 'G2-571', 2, null, 'printed in an order a child can copy'),
    F('the title names a word of the feeling sentence', TITLE, "<div data-lcs-stitle data-lcs-noroom style=\"font:700 21px/1.2 'Baloo 2',cursive;color:${T.ink}\">${esc(st.title + ' ' + P.sents[P.feel].replace(/[.]/g, '').split(' ').sort((a, c) => c.length - a.length)[0])}</div>", 'G2-571', 1, null, 'the title names a word of the feeling sentence'),
    F('the endings to circle are not the three of the story', OPTS, 'opts = shuffle([st.end.newEvent, sents[1]], rng);', 'G2-571', 1, null, 'the endings to circle are not'),
    F('the ending keyed to the beginning again', 'P.opts.map((o) => opt(o, o === st.end.right, key))', 'P.opts.map((o) => opt(o, o === st.end.again, key))', 'G2-571', 1, null, 'the ending is not keyed'),
    F('the title names a word of the right ending', TITLE, "<div data-lcs-stitle data-lcs-noroom style=\"font:700 21px/1.2 'Baloo 2',cursive;color:${T.ink}\">${esc(st.title + ' ' + st.end.right.replace(/[.,]/g, '').split(' ').sort((a, c) => c.length - a.length)[0])}</div>", 'G2-571', 1, null, 'of the right ending'),
    F('a wrong ending tells a feeling', OPTS, "opts = shuffle([st.end.newEvent.replace(/\\.$/, ', and I felt sad.'), st.end.again], rng);", 'G2-571', 1, null, 'an ending to circle tells a feeling'),
    F('the length of the endings over the bank finds the right one (verify)', "stories: mode === 'read' ? Object.fromEntries(BANK.stories.map((s) => [s.id, s])) : {},", "stories: mode === 'read' ? Object.fromEntries(BANK.stories.map((s) => [s.id, s.id === 'garden' ? s : { ...s, end: { ...s.end, newEvent: s.end.newEvent.split(',')[0] + '.', again: s.end.again.split(' ').slice(0, 4).join(' ') + '.' } }])) : {},", 'G2-571', 1, null, 'stories of the bank'),
    F('the sample ending of level 3 is the beginning again', END_W, 'writeGroup({ n: 4, w: WR, text: st.end.again, key })', 'G2-571', 3, null, 'the sample ending of level 3 is not'),
    F('the ending of level 3 on five rows', END_W, 'writeGroup({ n: 5, w: WR, text: st.end.right, key })', 'G2-571', 3, null, 'the ending is written on 5 rows'),
    F('the key of level 3 does not mark its ending as a sample', END_LABEL, 'label(4, esc(LINES.endWrite))', 'G2-571', 3, null, 'notes of the key, not 1'),
    F('the key of level 3 says only "(Sample)" (not what else is right)', END_LABEL, "label(4, esc(LINES.endWrite) + note('(Sample)', key))", 'G2-571', 3, null, 'the notes of the key are not'),
    F('level 3 offers endings to circle', "if (d.end === 'pick') {", "if (d.end === 'pick' || P.lv === 3) {", 'G2-571', 3, null, 'level 3 offers endings to circle'),
    F('the key of a choice page carries a note', 'label(4, esc(LINES.endPick))', "label(4, esc(LINES.endPick) + note('(Sample)', key))", 'G2-571', 1, null, 'notes of the key, not 0'),
    // ------------------------------------------------------------------------------------------- G2-572
    F('the same idea offered twice', PLAN_RET, 'return { mode, lv, ideas: [a, a], ex: x,', 'G2-572', 1, null, 'not two different story ideas'),
    F('an example idea offered as a prompt', PLAN_RET, 'return { mode, lv, ideas: [a, x], ex: x,', 'G2-572', 1, null, 'idea 2 is not a prompt of the bank'),
    F("no row for the child's own idea", '${esc(LINES.own)}</span>${row({ w: WR })}</div>`, 6, 4));', '${esc(LINES.own)}</span></div>`, 6, 4));', 'G2-572', 1, null, 'no row for the child'),
    F('the ideas numbered, not lettered', "const IDEA_MARK = ['A.', 'B.', 'C.'];", "const IDEA_MARK = ['1.', '2.', '3.'];", 'G2-572', 1, null, 'the ideas are not lettered A and B'),
    F('the planner parts in another order', "${half('who')}${half('where')}", "${half('where')}${half('who')}", 'G2-572', 1, null, 'the planner does not ask who'),
    F('a planner part headed otherwise', "const PLAN_HEAD = { who: 'Who was there?',", "const PLAN_HEAD = { who: 'Who was with me?',", 'G2-572', 1, null, 'is not headed'),
    F('the starters of level 2 are not ruled', "2: { first: 'First,', next: 'Next,', last: 'Last,', felt: 'I felt' } };", "2: { first: 'First,', next: 'Then,', last: 'Last,', felt: 'I felt' } };", 'G2-572', 2, null, 'of the planner have the starters'),
    F('the sample plan is not the plan of idea A', 'const d = LEVELS.plan[P.lv], x = P.ideas[0].plan,', 'const d = LEVELS.plan[P.lv], x = P.ideas[1].plan,', 'G2-572', 1, null, 'is not the plan of the first idea'),
    F('the key of level 3 writes the events without their time words', EV_TEXT, "const evText = (k, i) => (d.start === 1 ? x[k] : 'I ' + x[k]);", 'G2-572', 3, null, 'as level 3 writes it'),
    F('a planner part with four rows', 'writeGroup({ n: 3, w: PWH, text: cap1(x[k]), key })', 'writeGroup({ n: 4, w: PWH, text: cap1(x[k]), key })', 'G2-572', 1, null, 'part has 4 rows'),
    F('the example plan is a prompt', PLAN_RET, 'return { mode, lv, ideas: [a, c], ex: c,', 'G2-572', 1, null, 'not the plan of an example idea'),
    F('the example shares its topic with an idea offered', INFO_IDEAS, INFO_TOPIC, 'G2-572', 1, null, 'shares its topic with an idea the child may choose'),
    F('the examples beside the parts are the sample plan', '${head(k, cap1(ex[k]))}', '${head(k, cap1(x[k]))}', 'G2-572', 1, null, 'not the plan of one example idea'),
    F('the example of the feeling on level 1 does not match its frame', "(d.start === 1 ? 'At the end, I felt ' : 'I felt ')", "('I felt ')", 'G2-572', 1, null, 'as the level writes it'),
    F('a word bank on level 2', 'const wb = d.bank ? `<div data-lcs-wordbank', 'const wb = true ? `<div data-lcs-wordbank', 'G2-572', 2, null, 'the word bank belongs to level 3 only'),
    F('the checklist of the planner is not ruled', "\n  plan: ['I wrote who was there.',", "\n  plan: ['I wrote who it was.',", 'G2-572', 1, null, 'the checklist is not the one of the planner'),
    F('the note of the sample plan in the box of idea B', '${k === 0 ? note(SAMPLE_PLAN, key) : \'\'}', '${k === 1 ? note(SAMPLE_PLAN, key) : \'\'}', 'G2-572', 1, null, 'does not stand in the box of idea A'),
    F('the key of the planner does not say what else is right', PLAN_LABEL, 'label(2, esc(LINES.plan[P.lv]))', 'G2-572', 1, null, 'notes of the key, not 2'),
    // ------------------------------------------------------------------------------------------- G2-573
    F('the idea printed by its topic', '${esc(LINES.draftIdea)} <i>${esc(x.idea)}</i>', '${esc(LINES.draftIdea)} <i>${esc(x.topic)}</i>', 'G2-573', 1, null, 'the story idea is not printed'),
    F('the prompt counted as an example idea', EX_IDS, 'exampleIds: [...BANK.exampleIdeas, ...BANK.ideas].map((x) => x.id),', 'G2-573', 1, null, 'the idea printed as the prompt is an example idea'),
    F('the example is no example idea', EX_IDS, 'exampleIds: [],', 'G2-573', 1, null, 'the example is not the story of an example idea'),
    F('the example shares its topic with the idea', INFO_IDEAS, INFO_TOPIC, 'G2-573', 1, null, 'shares its topic with the idea the child writes about'),
    F('the example named by its topic', 'Example: ${esc(ex.idea)}</div><div data-lcs-read data-lcs-extext', 'Example: ${esc(ex.topic)}</div><div data-lcs-read data-lcs-extext', 'G2-573', 1, null, 'the example does not name its idea'),
    F('the example printed without its first sentence', ".join(' ');\n    b.push(`<div data-lcs-card data-lcs-example=", ".slice(1).join(' ');\n    b.push(`<div data-lcs-card data-lcs-example=", 'G2-573', 1, null, 'the example is not printed as the bank has it'),
    F('the example takes more than three lines', 'data-lcs-extext style="font:700 ${READ}px/1.32', 'data-lcs-extext style="font:700 26px/1.32', 'G2-573', 1, null, 'the example takes more than 3 lines'),
    F('the time words of the example not in teal', "? Bw(l + ',') + esc(s.slice(l.length + 1)) : esc(s);", "? esc(l + ',') + esc(s.slice(l.length + 1)) : esc(s);", 'G2-573', 1, null, 'the time words of the example are not in teal'),
    F('a row of time words on level 1', '(d.strip ? `<div data-lcs-timerow', '(true ? `<div data-lcs-timerow', 'G2-573', 1, null, 'the row of time words belongs to level 2'),
    F('the row of time words takes two lines', '`<div data-lcs-timerow data-lcs-ruletext style="font:700 ${RULEPX}px/1.3', '`<div data-lcs-timerow data-lcs-ruletext style="font:700 40px/1.3', 'G2-573', 2, null, 'takes more than one line'),
    F('the word bank of level 3 offers the time words of level 2 (as much support)', "const DRAFT_BANK = 'Word bank: I felt · I thought · I wondered · I saw · I heard';", "const DRAFT_BANK = 'Word bank: first, next, then, after that, later, last · I felt · I thought · I wondered';", 'G2-573', 3, null, 'the word bank to level 3, as they are ruled'),
    F('the parts of the draft in another order', "sec('beginning', beg) + sec('middle', mid) + sec('ending', end)", "sec('middle', mid) + sec('beginning', beg) + sec('ending', end)", 'G2-573', 2, null, 'is not under the headings'),
    F('a heading of the draft not ruled', "const DRAFT_HEAD = { beginning: 'Beginning: who, where, and when',", "const DRAFT_HEAD = { beginning: 'Beginning: who and where',", 'G2-573', 2, null, 'the heading of beginning'),
    F('the middle of level 2 on five rows', DRAFT_L2, '2: { strip: true, lines: { beginning: 3, middle: 5, ending: 3 } }', 'G2-573', 2, null, 'the draft has 3 / 5 / 3 rows'),
    F('fewer than ten rows on level 3', '3: { bank: true, lines: { beginning: 3, middle: 4, ending: 3 } }', '3: { bank: true, lines: { beginning: 3, middle: 4, ending: 2 } }', 'G2-573', 3, null, 'fewer than 10 rows'),
    F('starters on level 2', '    if (d.start) {\n      beg = writeGroup(', '    if (d.start || P.lv === 2) {\n      beg = writeGroup(', 'G2-573', 2, null, 'the starters are'),
    F('the sample beginning is not the beginning of the idea', 'beg = writeGroup({ n: d.lines.beginning, w, text: x.draft2.beginning, key });', 'beg = writeGroup({ n: d.lines.beginning, w, text: x.draft2.ending, key });', 'G2-573', 2, null, 'are not the story of the printed idea'),
    F('the sample tells no thought or feeling', 'end = writeGroup({ n: d.lines.ending, w, text: x.draft2.ending, key });', "end = writeGroup({ n: d.lines.ending, w, text: 'At the end, we went home.', key });", 'G2-573', 2, null, 'tells no thought or feeling'),
    F('the sample uses no time word', 'mid = writeGroup({ n: d.lines.middle, w, text: x.draft2.middle, key });', "mid = writeGroup({ n: d.lines.middle, w, text: 'We played.', key });", 'G2-573', 2, null, 'uses no time word'),
    F('the sample of level 3 shows no detail', INFO_IDEAS, "ideas: Object.fromEntries([...BANK.ideas, ...BANK.exampleIdeas].map((x) => [x.id, x.draft2 ? { ...x, draft2: { ...x.draft2, detail: 'a big red balloon' } } : x])),", 'G2-573', 3, null, 'shows no detail'),
    F('the task line of the draft of level 1 is not the one of its level', "\n  draft: { 1: 'Write your true story. Tell one thing you thought or felt.'", "\n  draft: { 1: 'Write your true story.'", 'G2-573', 1, null, 'is not the one of level 1'),
    F('the checklist of the draft is not ruled', "\n  draft: { 1: ['I told who, where, and when.',", "\n  draft: { 1: ['I told who and where.',", 'G2-573', 1, null, 'the checklist is not the one of the draft'),
    F('level 3 of the draft without its check of a detail', 'b.push(checklist(CHECK.draft[P.lv]));', 'b.push(checklist(CHECK.draft[1]));', 'G2-573', 3, null, 'the checklist is not the one of the draft at level 3'),
    F('the key names the topic, not the idea, of its sample', DRAFT_LABEL, "label(1, esc(LINES.draft[P.lv])) + alsoRow([SAMPLE_FOR + x.topic + ')', NOTES.draft], key)", 'G2-573', 1, null, 'the notes of the key are not'),
    F('the notes of the key stand in the task line, not in their row', DRAFT_LABEL, "label(1, esc(LINES.draft[P.lv]) + note(SAMPLE_FOR + x.idea + ')', key) + note(NOTES.draft, key))", 'G2-573', 1, null, 'does not stand in the row of notes under the task line'),
    // ------------------------------------------------------------------------------------------- G2-574
    F('the box counts another number', "\n  editCount: { 1: 'In this story: 2 capital letters and 2 end marks to fix.'", "\n  editCount: { 1: 'In this story: 3 capital letters and 2 end marks to fix.'", 'G2-574', 1, null, 'the box does not tell the rules and the counts'),
    F('the box of level 1 tells the time words (nothing is ordered there)', "\n  edit: { 1: ['A capital letter starts every sentence and every name.', 'An end mark (. ? !) ends every sentence.'], 2:", "\n  edit: { 1: ['A capital letter starts every sentence and every name.', 'An end mark (. ? !) ends every sentence.', 'Time words tell the order: first, next, then, at the end.'], 2:", 'G2-574', 1, null, 'the box does not tell the rules and the counts'),
    F('the story is not by a second grader', BYLINE, "const BYLINE = 'A story by a child';", 'G2-574', 1, null, 'does not carry its title'),
    F('no sentence that does not belong on level 3', 'let offAt = -1; if (d.off) {', 'let offAt = -1; if (false) {', 'G2-574', 3, null, 'sentences, not 7'),
    F('the sentence that does not belong stands first', "offAt = rng.int(1, N - 1); order.splice(offAt, 0, 'off');", "offAt = 0; order.splice(offAt, 0, 'off');", 'G2-574', 3, null, 'is first or last'),
    F('a sentence moved on level 1', 'edit: { 1: { caps: 2, ends: 2, move: false,', 'edit: { 1: { caps: 2, ends: 2, move: true,', 'G2-574', 1, null, 'the sentences of level 1 are not in order'),
    F('a sentence without its own time word moved', [MOVE_PICK, 'order = order.filter((k) => k !== N - 1); order.splice(to, 0, N - 1); }'], ['if (false) { moved = 1;', 'order = order.filter((k) => k !== N - 2); order.splice(to, 0, N - 2); }'], 'G2-574', 2, null, 'is not the story with only its First sentence'),
    F('a mistake nobody planted (the comma after a time word dropped)', PLANTED, "      const s = S[k].replace(', ', ' '), m = P.marks[k];", 'G2-574', 1, null, 'holds a mistake nobody planted'),
    F('a word some writers capitalize printed in the story (field day)', PLANTED, "      const s = k === 0 ? S[k].replace(/\\.$/, ' on field day.') : S[k], m = P.marks[k];", 'G2-574', 2, null, 'a word some writers capitalize'),
    F('a fix marked on a right letter', '      else out = esc(body);', '      else out = cap(body.charAt(0), body.charAt(1)) + esc(body.slice(1));', 'G2-574', 1, null, 'its mistakes are not the ones planted'),
    F('level 2 plants two capital letters, not three', EDIT_L2, '2: { caps: 2, ends: 2, move: true, off: false, rows: 5, pad: 17 }', 'G2-574', 2, null, 'the story holds 2 capital letters'),
    F('level 2 prints the story as a paragraph', EDIT_L2, '2: { caps: 3, ends: 2, move: true, off: false, rows: 5, pad: 17, para: true }', 'G2-574', 2, null, 'is not one paragraph on level 3'),
    F('the key writes the small letter', 'color:${T.teal}">${esc(ch.toUpperCase())}</span>` : \'\'}</span>`;', 'color:${T.teal}">${esc(ch)}</span>` : \'\'}</span>`;', 'G2-574', 1, null, 'the key does not write the capital letter'),
    F('the key adds another end mark', 'color:${T.teal}">.</span>` : \'\'}</span>`;', 'color:${T.teal}">!</span>` : \'\'}</span>`;', 'G2-574', 1, null, 'the key does not add the end mark'),
    F('the key of the story to edit does not say that ! is right too', EDIT_LABEL, 'label(1, esc(LINES.edit[P.lv]))', 'G2-574', 1, null, 'notes of the key, not 1'),
    F('the line about the ! stands under the sentences written again', [EDIT_LABEL, 'label(2, esc(LINES.rewrite)) +'], ['label(1, esc(LINES.edit[P.lv]))', 'label(2, esc(LINES.rewrite) + note(NOTES.excl, key)) +'], 'G2-574', 1, null, 'does not stand in the task line of the story to edit'),
    F('the key numbers a sentence wrong (strips)', NUM_STRIP, "numBox(off ? '' : rank[k] + 1, key, 30)", 'G2-574', 2, null, 'is not numbered on the key by its place'),
    F('the key numbers a sentence wrong (the paragraph)', "numBoxIn(off ? '' : rank[k], key)", "numBoxIn(off ? '' : rank[k] + 1, key)", 'G2-574', 3, null, 'is not numbered on the key by its place'),
    F('boxes to number on level 1', '(d.move ? ' + NUM_STRIP, '(true ? ' + NUM_STRIP, 'G2-574', 1, null, 'level 1 has boxes to number'),
    F('the key does not cross out the sentence that does not belong', 'const offStyle = key ? `text-decoration:line-through;', 'const offStyle = false ? `text-decoration:line-through;', 'G2-574', 3, null, 'the key does not cross out'),
    F('the name printed with its capital', 'name: k === nameAt, end:', 'name: false, end:', 'G2-574', 1, null, 'every name is a target'),
    F('only one sentence to write again', '(k === P.A || k === P.nameAt)), both', '(k === P.A)), both', 'G2-574', 1, null, 'not the two with two mistakes each'),
    F('six rows to write the sentences again on level 1', EDIT_L1, '1: { caps: 2, ends: 2, move: false, off: false, rows: 6, pad: 23 }', 'G2-574', 1, null, 'written again on 6 rows'),
    F('the sentences written again marked as a sample', 'label(2, esc(LINES.rewrite)) +', "label(2, esc(LINES.rewrite) + note('(Sample)', key)) +", 'G2-574', 1, null, 'notes of the key, not 1'),
    F('no room above a strip for a capital (ruling I)', EDIT_L1, '1: { caps: 2, ends: 2, move: false, off: false, rows: 5, pad: 8 }', 'G2-574', 1, null, 'clear above its letters for a capital'),
    F('no room above a line of the paragraph for a capital (ruling I)', ["font:700 ${READ + 1}px/50px 'Nunito',sans-serif;color:${T.ink}\">` + P.order", "font:700 ${READ + 1}px/50px 'Nunito',sans-serif;color:${T.ink};${off ? offStyle : ''}"], ["font:700 ${READ + 1}px/36px 'Nunito',sans-serif;color:${T.ink}\">` + P.order", "font:700 ${READ + 1}px/36px 'Nunito',sans-serif;color:${T.ink};${off ? offStyle : ''}"], 'G2-574', 3, null, 'clear above its letters for a capital'),
    F("the key's capital over the strip above", KEYCAP, "top:-1.6em;font:800 16px/1 'Nunito',sans-serif;color:${T.teal}\">${esc(ch.toUpperCase())}", 'G2-574', 2, null, 'stands outside its strip'),
    F("the key's capital over the line above (the paragraph)", KEYCAP, "top:-1.6em;font:800 16px/1 'Nunito',sans-serif;color:${T.teal}\">${esc(ch.toUpperCase())}", 'G2-574', 3, null, 'does not stand in the room above its line'),
    F('a sentence wider than its strip', 'white-space:nowrap;font:700 ${READ + 1}px/1.25', 'white-space:nowrap;font:700 30px/1.25', 'G2-574', 1, null, 'does not fit its strip'),
    // ------------------------------------------------------------------------------------------- G2-575
    F('the example of a detail not printed as ruled', "const EX_ROWS = ['My sentence:', 'My partner asked:', 'I added:'];", "const EX_ROWS = ['I wrote:', 'My partner asked:', 'I added:'];", 'G2-575', 1, null, 'the example of adding a detail is not printed'),
    F('no column for the partner', 'color:${T.teal}">Partner</span>`', 'color:${T.teal}">Friend</span>`', 'G2-575', 1, null, 'has no columns Me and Partner'),
    F('the partner only listens (the task line of the checks)', "\n  checks: 'Read your story to a partner. Then look at it together and put a check mark in each box that is true.',", "\n  checks: 'Read your story to a partner. Put a check mark in each box that is true.',", 'G2-575', 1, null, 'task line of [data-lcs-task="checks"]'),
    F('the checks of level 2 on level 1', CHECKS_REV, 'const checks = CHECK.revise[2];', 'G2-575', 1, null, 'the checklist is not the one of level 1'),
    F('level 3 without its check of an ending', CHECKS_REV, 'const checks = CHECK.revise[P.lv === 3 ? 2 : P.lv];', 'G2-575', 3, null, 'the checklist is not the one of level 3'),
    F('a check with one box to tick', "${esc(c)}</span>${tick('me')}${tick('partner')}", "${esc(c)}</span>${tick('me')}<span></span>", 'G2-575', 1, null, 'has not two boxes to tick'),
    F('no "My partner liked" on level 3', PAIR, "b.push(`<div data-lcs-pair style=\"display:grid;grid-template-columns:${PAIR}px ${PAIR}px;gap:0 ${W - 2 * PAIR}px\">${card('asked', 3, sm.asked, { half: true })}</div>`);", 'G2-575', 3, null, 'the writing parts are not'),
    F('the question before what the partner liked', PAIR, "b.push(`<div data-lcs-pair style=\"display:grid;grid-template-columns:${PAIR}px ${PAIR}px;gap:0 ${W - 2 * PAIR}px\">${card('asked', 2, sm.asked, { half: true })}${card('liked', 3, sm.liked, { half: true })}</div>`);", 'G2-575', 3, null, 'the writing parts are not'),
    F('what the partner liked and asked one under the other', 'display:grid;grid-template-columns:${PAIR}px ${PAIR}px;gap:0 ${W - 2 * PAIR}px', 'display:grid;grid-template-columns:${PAIR}px;gap:0 ${W - 2 * PAIR}px', 'G2-575', 3, null, 'do not stand side by side'),
    F('a task line of the revise page not ruled', "  added: 'I added a detail to my story with a caret (^):',\n", "  added: 'I added a detail:',\n", 'G2-575', 1, null, 'task line of [data-lcs-task="added"]'),
    F('the question words on level 2', 'd.qwords ? `<div data-lcs-qwords', 'true ? `<div data-lcs-qwords', 'G2-575', 2, null, 'the question words belong to level 1 only'),
    F('the samples name a prompt', ALSO_REV, "const also = alsoRow([SAMPLES_FOR + 'A rainy recess' + ')', NOTES.revise], key);", 'G2-575', 1, null, 'the samples do not name an example idea'),
    F('the key of the revise page does not say what else is right', ALSO_REV, "const also = alsoRow([SAMPLES_FOR + P.sample.idea + ')'], key);", 'G2-575', 1, null, 'notes of the key, not 2'),
    F('the notes of the key stand under the fixed sentence', [ADDED_12, FIXED_12], ["b.push(card('added', 3, sm.added));", "b.push(card('fixed', 4, sm.fixed, { extra: also }));"], 'G2-575', 1, null, 'the task line of the detail'),
    F('the sample of "I added" is the fixed sentence', ADDED_12, "b.push(card('added', 3, sm.fixed, { extra: also }));", 'G2-575', 1, null, 'the sample of "added"'),
    F('two rows for the detail on level 1', 'revise: { 1: { checks: 3, qwords: true, rows: { asked: 2, added: 3, fixed: 3 } },', 'revise: { 1: { checks: 3, qwords: true, rows: { asked: 2, added: 2, fixed: 3 } },', 'G2-575', 1, null, 'the part "added" has 2 rows'),
    F('the samples share their topic with the example', [INFO_IDEAS, "details: mode === 'revise' ? Object.fromEntries(BANK.details.map((x) => [x.id, x])) : {},"], [INFO_TOPIC, "details: mode === 'revise' ? Object.fromEntries(BANK.details.map((x) => [x.id, { ...x, topic: 'one topic' }])) : {},"], 'G2-575', 1, null, 'the samples share their topic with the example'),
    // ------------------------------------------------------------------------------------------- the factory as it loads
    F('the bank check: a level that cannot be drawn', 'if (Math.abs(posOf(A1) - posOf(nameAt)) < 2) continue;', 'if (true) continue;', 'G2-571', 1, 'load', 'cannot be drawn'),
    F('the right ending in one place in more than a third of the copies', 'const p = r.shuffle([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2])', 'const p = r.shuffle([0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2])', 'G2-571', 1, 'load', 'the place of the right ending'),
    F('the events of G2-571 never in one of the ruled orders', 'const p = r.shuffle([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3])', 'const p = r.shuffle([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2])', 'G2-571', 1, 'load', 'the order of the events'),
    // ------------------------------------------------------------------------------------------- the bank: the lists (ruling C)
    B("the bank's list of time words is not verify's", (b) => { b.timeWords = b.timeWords.filter((w) => w !== 'before'); }, 'list of time words is not the list verify() checks'),
    B("the bank's list of feeling words is not verify's", (b) => { b.feelingWords.push('sleepy'); }, 'list of feeling words is not the list verify() checks'),
    B("the bank's list of words some writers capitalize is not verify's", (b) => { b.tasteCaps = []; }, 'words some writers capitalize is not the list'),
    // ------------------------------------------------------------------------------------------- the bank: G2-571 stories
    B('fewer than 14 stories', (b) => { b.stories = b.stories.slice(0, 13); }, 'stories: fewer than 14'),
    B('a story id twice', (b) => { b.stories[1].id = b.stories[0].id; }, 'stories: an id stands twice'),
    B('a level-1 story of four sentences', (b) => { ST(b, 'garden').l1.pop(); }, 'not 5 sentences'),
    B('a sentence without its period', (b) => { ST(b, 'garden').l2[1] = 'By the fence, the ground was dry and hard'; }, 'is not one sentence with a capital and a period'),
    B('a story of 49 words', (b) => { ST(b, 'garden').l1[1] = 'First, we pulled weeds.'; ST(b, 'garden').l1[2] = 'I felt happy outside.'; }, 'words with its ending'),
    B('a beginning that opens with a time word', (b) => { const s = ST(b, 'garden'); s.l1[0] = s.l2[0] = 'Later, my friend Ana and I went to the school garden on Monday.'; }, 'the beginning opens with a time word'),
    B('a beginning that does not tell when', (b) => { const s = ST(b, 'garden'); s.l1[0] = s.l2[0] = 'My friend Ana and I went to the school garden to help out.'; }, 'the beginning does not tell when'),
    B('an event without its time word', (b) => { ST(b, 'garden').l2[3] = 'We filled two cans with water.'; }, 'not three events that open with a time word'),
    B('a time word of the box inside a sentence', (b) => { ST(b, 'garden').l2[1] = 'Then the ground was dry and hard.'; }, 'time words stand 4 times'),
    B('a fourth time word in a story (before; MUST 2)', (b) => { ST(b, 'bubbles').l1[4] = 'Then, we ran to catch them before they popped.'; }, '"before" is a time word outside the three to circle'),
    B('a fourth time word in the feeling sentence (when)', (b) => { ST(b, 'relay').l1[2] = 'I was nervous when it was my turn.'; }, '"when" is a time word outside the three to circle'),
    B('level 1 with After that', (b) => { ST(b, 'garden').l1[3] = 'After that, we filled two cans with water.'; }, 'do not open with First, Next, Then'),
    B('the first event of level 2 with Next', (b) => { const s = ST(b, 'garden'); s.l2[2] = 'Next, we pulled the weeds by the fence.'; s.l2[3] = 'First, we filled two cans with water.'; }, 'the first event does not open with First'),
    B('two sentences tell a feeling', (b) => { ST(b, 'garden').l2[1] = 'By the fence, the ground was dry, and I was sad.'; }, '2 sentences tell a feeling or a thought'),
    B('an action that shows a feeling in a second sentence', (b) => { ST(b, 'garden').l2[1] = 'By the fence, we laughed at the dry ground.'; }, '2 sentences tell a feeling or a thought'),
    B('the feeling in an event', (b) => { const s = ST(b, 'garden'); s.l1[2] = 'The sun was hot.'; s.l1[4] = 'Then, we were happy to give water to every bean plant.'; }, 'the feeling is in the beginning or in an event'),
    B('the feeling as the last sentence', (b) => { const s = ST(b, 'garden'); s.l1 = [s.l1[0], s.l1[1], s.l1[3], s.l1[4], s.l1[2]]; }, 'the feeling is the last sentence'),
    B('a thought on level 1', (b) => { ST(b, 'garden').l1[2] = 'I thought it was nice to be outside.'; }, 'the level-1 feeling is not'),
    B('the detail sentence of level 2 without its phrase and comma', (b) => { ST(b, 'garden').l2[1] = 'The ground was dry and hard.'; }, 'the detail sentence does not open with a place or a manner phrase'),
    B('the detail sentence of level 2 opens with a when-phrase', (b) => { ST(b, 'garden').l2[1] = 'On Monday, the ground was dry and hard.'; }, 'the detail sentence does not open with a place or a manner phrase'),
    B('other events on level 2', (b) => { ST(b, 'garden').l2[5] = 'Later, we gave water to every flower.'; }, 'the events of level 2 are not those of level 1'),
    B('another beginning on level 2', (b) => { ST(b, 'garden').l2[0] = 'My friend Ana and I went to the class garden on Monday.'; }, 'the beginning of level 2 is not that of level 1'),
    B('level 2 no longer than level 1', (b) => { const s = ST(b, 'garden'); s.l2[1] = 'By the fence, it was dry.'; s.l2[4] = 'I wondered.'; s.l1[2] = 'I felt so very happy to be outside with Ana.'; }, 'the level-2 story is not longer than the level-1 story'),
    B('the title names the feeling', (b) => { ST(b, 'garden').title = 'Happy in the Garden'; }, 'of the feeling sentence'),
    B('an ending choice of two sentences', (b) => { ST(b, 'garden').end.again = 'Ana and I went out. It was Monday at school.'; }, 'an ending choice is not one sentence'),
    B('an ending choice tells a feeling', (b) => { ST(b, 'garden').end.newEvent = 'At the end, a big dog ran in, and I was scared.'; }, 'an ending choice tells a feeling'),
    B('an ending choice longer than one line', (b) => { ST(b, 'garden').end.newEvent = 'At the end, a big brown dog ran right into the middle of the garden.'; }, 'longer than 60 letters'),
    B('a sample ending longer than three rows', (b) => { ST(b, 'garden').end.right = 'Soon, the bell rang, and we carried all of the watering cans and the buckets back to the shed by the gate.'; }, 'the sample ending does not fit three rows'),
    B('the ending opens with Finally after a Finally event', (b) => { ST(b, 'chalk').end.right = 'Finally, we put the chalk away.'; }, 'the ending opens with Finally after an event'),
    B('the title names a word of the right ending', (b) => { ST(b, 'garden').title = 'The Shed'; }, 'of the right ending, and not every wrong choice carries it'),
    B('the beginning again is the beginning word for word', (b) => { const s = ST(b, 'garden'); s.end.again = s.l1[0]; }, 'the "beginning again" choice'),
    B('an ending choice shares no word with the story', (b) => { ST(b, 'garden').end.newEvent = 'Just then, a big brown cow walked by us.'; }, 'an ending choice shares no word with the story'),
    B('the right ending is the only one that shares a word with each wrong one', (b) => { const s = ST(b, 'garden'); s.end.right = 'When the dog ran off, we put the cans back on Monday.'; s.end.newEvent = 'Just then, a big dog ran by.'; }, 'the only choice that shares a word with each wrong one'),
    B('a story without its topic', (b) => { delete ST(b, 'garden').topic; }, 'no topic'),
    B('the right ending the longest in most stories', (b) => { b.stories.forEach((s) => { s.end.newEvent = s.end.newEvent.length > 42 ? s.end.newEvent.split(',')[0] + ', it was over.' : s.end.newEvent; s.end.again = s.end.again.split(' ').slice(0, 6).join(' ') + '.'; }); }, 'the right ending is the longest in'),
    B('the right endings and the new events open apart', (b) => { b.stories.forEach((s) => { s.end.newEvent = 'Suddenly, ' + s.end.newEvent.replace(/^[^,]+, /, ''); }); }, 'share fewer than three opening words'),
    B('one opener finds the right ending (ruling E)', (b) => { b.stories.forEach((s) => { if (!/^When /.test(s.end.right)) s.end.right = 'When ' + s.end.right.charAt(0).toLowerCase() + s.end.right.slice(1); }); }, 'a child who picks the choice that opens with "when"'),
    B('two choices that open alike find the right ending (ruling E)', (b) => { b.stories.forEach((s) => { s.end.newEvent = s.end.right.split(/[ ,]/)[0] + ', ' + s.end.newEvent.replace(/^[^,]+, /, ''); }); }, 'one of the two choices that open alike'),
    B('the feeling always in one place', (b) => { b.stories.forEach((s) => { const k = s.l1.findIndex((x) => /^I (felt|was)\b/.test(x)); const f = s.l1.splice(k, 1)[0]; s.l1.splice(3, 0, f); }); }, 'the feeling sentence stands in too few places'),
    // ------------------------------------------------------------------------------------------- the bank: ideas
    B('fewer than four example ideas', (b) => { b.exampleIdeas.pop(); }, 'fewer than 6 prompts or fewer than 4 example ideas'),
    B('an idea that assumes a pet', (b) => { ID(b, 'helped').idea = 'A time I helped my dog'; }, 'the idea assumes'),
    B('a plan note that ends with a period', (b) => { ID(b, 'helped').plan.next = 'helped him sort them.'; }, 'the plan note "next" is missing'),
    B('a who note longer than two half rows', (b) => { ID(b, 'helped').plan.who = 'my best friend Dev and his big cousin Malia'; }, 'does not fit two half rows'),
    B('a where-and-when note without a time', (b) => { ID(b, 'helped').plan.where = 'in our class'; }, 'does not name a place and a time'),
    B('an event note longer than its row', (b) => { ID(b, 'helped').plan.first = 'picked up every single one of his crayons'; }, 'does not fit one row after its starter'),
    B('an event note with a time word', (b) => { ID(b, 'helped').plan.next = 'then sorted them'; }, 'holds a time word'),
    B('an event of level 3 longer than its row with its time word', (b) => { ID(b, 'helped').plan.first = 'picked up all his crayons'; }, 'the level-3 event'),
    B('a feeling note longer than its row', (b) => { ID(b, 'helped').plan.felt = 'happy and proud of myself and Dev'; }, 'the feeling note does not fit one row'),
    B('a feeling note without a feeling', (b) => { ID(b, 'helped').plan.felt = 'done'; }, 'the feeling note names no feeling'),
    B('a model longer than three lines', (b) => { EX(b, 'chain').model += ' We made one more chain for the hall, and it was even longer.'; }, 'a model longer than 210 letters'),
    B('a model without its time words', (b) => { EX(b, 'chain').model = EX(b, 'chain').model.replace('Next, we', 'We'); }, 'do not open with First, Next, Last'),
    B('a model ending without a feeling', (b) => { EX(b, 'chain').model = EX(b, 'chain').model.replace('At the end, I felt so proud of it.', 'At the end, we went to lunch.'); }, "the model's ending tells no feeling"),
    B("the partner's question without its question mark", (b) => { EX(b, 'chain').revise.asked = 'How long was it.'; }, 'is not a question'),
    B('a sample of two sentences', (b) => { EX(b, 'chain').revise.added = 'It was long. It went across.'; }, 'the sample "added" is not one sentence'),
    B('the sample of "liked" as a sentence', (b) => { EX(b, 'chain').revise.liked = 'The part about the glue.'; }, 'the sample "liked" is not a note'),
    B('a question longer than one row', (b) => { EX(b, 'chain').revise.asked = 'What colors were all the strips of your paper chain?'; }, 'the sample "asked" does not fit'),
    B('a note of what the partner liked too long for a half row', (b) => { EX(b, 'chain').revise.liked = 'the part about the gluesticks and scissors'; }, 'the sample "liked" does not fit'),
    B('a level-1 beginning longer than two rows', (b) => { ID(b, 'helped').draft1.beginning = 'I helped my good friend Dev when he dropped all of his crayons on the floor of our class.'; }, 'no level-1 beginning that fits two rows'),
    B('a level-1 beginning that does not go on from "One day,"', (b) => { ID(b, 'helped').draft1.beginning = 'On Monday I helped Dev.'; }, 'does not continue "One day,"'),
    B('a sample beginning without its day', (b) => { ID(b, 'helped').draft2.beginning = 'My friend Dev dropped his crayons in class on Monday.'; }, 'the beginning of the sample does not open with its day'),
    B('a sample middle longer than three rows', (b) => { ID(b, 'helped').draft2.middle = 'First, I picked up all of them from the floor. Next, we sorted the colors into piles. Last, he put them in his box.'; }, 'the middle of the sample does not fit three rows'),
    B('a sample middle with Then for Last', (b) => { ID(b, 'helped').draft2.middle = 'First, I picked them up. Next, we sorted the colors. Then, he put them in his box.'; }, 'is not three sentences that open with First, Next, Last'),
    B('a sample ending without "At the end,"', (b) => { ID(b, 'helped').draft2.ending = 'Dev said thanks, and I felt glad I helped.'; }, 'does not open with "At the end,"'),
    B('a sample story without a feeling', (b) => { ID(b, 'helped').draft2.ending = 'At the end, Dev said thanks.'; }, 'the sample tells no thought or feeling'),
    B('a sample without its detail (level 3 asks for one)', (b) => { ID(b, 'helped').draft2.detail = 'a big red balloon'; }, 'names no detail of its own'),
    B('a level-1 event that does not fit its row', (b) => { ID(b, 'helped').plan.last = 'put every crayon in his box'; }, 'the level-1 event'),
    B('a level-1 ending that does not fit its two rows', (b) => { ID(b, 'helped').plan.felt = 'happy and glad and proud of myself and so very thankful'; }, 'the level-1 ending does not fit its two rows'),
    B('an idea without theme words', (b) => { ID(b, 'helped').theme = []; }, 'no theme words'),
    B('an idea id twice', (b) => { EX(b, 'chain').id = 'helped'; }, 'ideas: an id stands twice'),
    // ------------------------------------------------------------------------------------------- the bank: G2-575 details
    B('fewer than 14 details', (b) => { b.details = b.details.slice(0, 13); }, 'details: fewer than 14'),
    B('a detail question without its question mark', (b) => { b.details[0].asked = 'What did it look like.'; }, 'not a sentence, a question, and a sentence'),
    B('a detail row longer than one line', (b) => { b.details[0].added = 'It was a big lion with a long yellow mane and orange whiskers.'; }, 'a row of the example is longer than one line'),
    B('a detail that adds nothing', (b) => { b.details[0].added = 'I made a mask.'; }, 'the added sentence adds nothing'),
    B('a detail id twice', (b) => { b.details[1].id = b.details[0].id; }, 'details: an id stands twice'),
    // ------------------------------------------------------------------------------------------- the bank: G2-574 stories to edit
    B('fewer than 14 stories to edit', (b) => { b.editStories = b.editStories.slice(0, 13); }, 'edit stories: fewer than 14'),
    B('a story to edit of five sentences', (b) => { ED(b, 'soccer').sents.pop(); }, 'not six sentences'),
    B('a story to edit with a mistake of its own', (b) => { ED(b, 'soccer').sents[2] = 'Next, I kicked the ball down the field'; }, 'sentence 3 is not one sentence with a capital and a period'),
    B('a capital inside a sentence that is not I or the name', (b) => { ED(b, 'soccer').sents[3] = 'Then, the ball rolled into the Net.'; }, 'has a capital inside it'),
    B('a day printed right', (b) => { ED(b, 'soccer').sents[0] = 'My friend Kofi and I played soccer on monday.'; }, 'names a day or a month'),
    B('a word some writers capitalize (field day; MUST 6)', (b) => { ED(b, 'tug').sents[0] = 'My class played tug-of-war on field day.'; }, 'a word some writers capitalize'),
    B('a time word without its comma', (b) => { ED(b, 'soccer').sents[3] = 'Then the ball rolled into the net.'; }, 'opens with a time word without its comma'),
    B('a sentence too long to write again', (b) => { ED(b, 'soccer').sents[4] = 'Everybody cheered extraordinarily loudly at recess.'; }, 'does not fit two rows when it is written again'),
    B('a sentence longer than its strip', (b) => { ED(b, 'soccer').sents[4] = 'Everyone on my team and the other team gave a big cheer.'; }, 'is longer than one strip'),
    B('the name twice', (b) => { ED(b, 'soccer').sents[3] = 'Then, Kofi saw the ball roll into the net.'; }, 'does not stand exactly once'),
    B('the name in a sentence that may move', (b) => { const e = ED(b, 'soccer'); e.sents[0] = 'My friend and I played soccer at recess.'; e.sents[1] = 'First, Kofi and I picked teams on the grass.'; }, 'the name stands in a sentence that may be moved'),
    B('the last sentence without its time word', (b) => { ED(b, 'soccer').sents[5] = 'We lined up by the door after recess.'; }, 'the last does not open with At the end or Finally'),
    B('the third sentence with After that', (b) => { ED(b, 'soccer').sents[2] = 'After that, I kicked the ball down the field.'; }, 'sentences 3 and 4 do not open with Next and Then'),
    B('the detail sentence with a time word', (b) => { ED(b, 'soccer').sents[4] = 'Later, everyone on my team gave a cheer.'; }, 'the beginning or the detail opens with a time word'),
    B('too few sentences can take a small first letter', (b) => { const e = ED(b, 'soccer'); e.sents[3] = 'I saw the ball roll into the net.'; e.sents[4] = 'I gave a big cheer with my team.'; e.sents[0] = 'I played soccer with my friend Kofi at recess.'; }, 'too few sentences can take a small first letter'),
    B('two sentences together longer than four rows', (b) => { const e = ED(b, 'soccer'); e.sents[0] = 'My good friend Kofi and I played a game of soccer.'; e.sents[4] = 'Everybody cheered extraordinarily loudly at recess.'; }, 'together do not fit four rows'),
    B('the sentence that does not belong shares a word', (b) => { ED(b, 'soccer').off = 'Many bears play soccer.'; }, 'the sentence that does not belong is not'),
    B('a story to edit without its topic', (b) => { delete ED(b, 'soccer').topic; }, 'edit story "soccer": no topic'),
    B('a story to edit id twice', (b) => { b.editStories[1].id = b.editStories[0].id; }, 'edit stories: an id stands twice'),
    // ------------------------------------------------------------------------------------------- the bank: nothing to copy
    B('a mentor story shares the topic of a prompt', (b) => { ST(b, 'garden').topic = 'helping a friend'; }, 'shares its topic'),
    B('a mentor story holds a theme word of a prompt', (b) => { ST(b, 'garden').l2[1] = 'By the fence, we tried to dig the hard ground.'; }, 'a theme word of a prompt'),
    B('the model of the notes is on a page', (b) => { b.details[0].plain = 'I found a ladybug in art.'; }, 'the model of the notes'),
  ];
};
