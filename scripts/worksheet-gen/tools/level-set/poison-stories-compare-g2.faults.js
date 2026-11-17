/**
 * The planted faults of poison-stories-compare-g2.js (types/_shared/stories-compare-g2.js and
 * data/literacy/stories-compare-g2.en.json): [name, file, text to find, its replacement, type, level, where, expect].
 * A fault may change several texts at once (find and replacement as two lists of the same length). Every text must stand
 * in the factory exactly once (bank: at least once; the first one is changed); the poison script refuses to run
 * otherwise, so a changed factory cannot pass with a stale list. `where` 'load' says the fault must stop the factory when
 * it loads; `expect` names the report of the rule the fault is planted against (a regular expression, so no brackets in
 * it): it must be among the reports, not only some other one. A fault that a plan would refuse to draw for some copy is
 * written so the plan falls back to a correct page after its tries (the bank check at load draws every copy).
 */
'use strict';
module.exports = (FACTORY, BANK) => [
  // ================= G2-576 How a Story Begins and Ends
  // the questions
  ['the key rings a wrong answer to a question', FACTORY, "q.opts.map((o) => pill(o, o === q.right, key)).join('')", "q.opts.map((o) => pill(o, o === q.opts.find((x) => x !== q.right), key)).join('')", 'G2-576', 1, '', 'the right choice is not keyed'],
  // (ruling C) a pattern over the copies is caught by the bank check when the factory loads, so these two are 'load'
  ['both right answers of the questions in the first place', FACTORY, 'const at = places(qs.length, 3, rng);', 'const at = qs.map(() => 0);', 'G2-576', 1, 'load', 'stands in one place too often'],
  ['a wrong problem taken from the beginning', FACTORY, "o = take(lv === 1 ? evs('e') : evs('b').filter((e) => e.tag !== 'react'));", "o = take(lv === 1 ? evs('b') : evs('b').filter((e) => e.tag !== 'react'));", 'G2-576', 1, '', 'the wrong problems are not one of the middle and one of the ending'],
  // (ruling C) on levels 2 and 3 each question has a wrong choice from the same part as the right one
  ['a wrong problem of level 2 that only reacts to the problem', FACTORY, "o = take(lv === 1 ? evs('e') : evs('b').filter((e) => e.tag !== 'react'));", "o = take(lv === 1 ? evs('e') : lv === 2 && t < 1500 ? evs('b').filter((e) => e.tag === 'react') : evs('b').filter((e) => e.tag !== 'react'));", 'G2-576', 2, '', 'the wrong problems are not one of the middle and one of the beginning that is not the problem'],
  ['a wrong solution of level 2 taken from the beginning', FACTORY, "o = take(lv === 1 ? evs('b') : evs('e').filter((e) => e.tag !== 'sol'));", "o = take(lv === 1 ? evs('b') : lv === 2 && t < 1500 ? evs('b') : evs('e').filter((e) => e.tag !== 'sol'));", 'G2-576', 2, '', 'the wrong solutions are not something tried in the middle and an event of the ending'],
  ['two choices where a question needs three', FACTORY, 'o.splice(at[i], 0, q.right); q.opts = o;', 'o.splice(at[i], 1, q.right); q.opts = o;', 'G2-576', 2, '', 'not 3 different choices'],
  ['the right answer the longest choice of every question', FACTORY, 'if (!lengthOk(qs)) continue;', 'if (lv === 1 && t < 1500 ? qs.some((q) => q.opts.some((o) => o !== q.right && o.length >= q.right.length)) : !lengthOk(qs)) continue;', 'G2-576', 1, 'load', 'the right choice is the longest in'],
  ['level 3 without a smaller trouble among the problems', FACTORY, 'notIn: true, near: true }', 'notIn: true, near: false }', 'G2-576', 3, '', 'is not a smaller trouble'],
  // the sentences to sort
  ['a sentence to sort keyed to another part', FACTORY, ['data-lcs-strip="${x.id}" data-lcs-want="${x.want}"', '${box1(x.want, key)}<span data-lcs-striptext'], ["data-lcs-strip=\"${x.id}\" data-lcs-want=\"${({ B: 'M', M: 'E', E: 'B', X: 'X' })[x.want]}\"", "${box1(({ B: 'M', M: 'E', E: 'B', X: 'X' })[x.want], key)}<span data-lcs-striptext"], 'G2-576', 1, '', 'is not keyed to the part that tells it'],
  ['the sentences to sort in the order of the story', FACTORY, "if (!placesOk(idx, d.notIn ? 4 : 3) || seq.join('') === 'BME') continue;", "if (seq.length === 3 ? seq.join('') !== 'BME' : !placesOk(idx, d.notIn ? 4 : 3)) continue;", 'G2-576', 1, '', 'stand in the order of the story'],
  ['no sentence about whom we first meet on level 2', FACTORY, "2: { qs: ['problem', 'solution'], events: 3, meets: 1 }", "2: { qs: ['problem', 'solution'], events: 3, meets: 0 }", 'G2-576', 2, '', 'sentences about whom we first meet'],
  ['whom we first meet keyed to the wrong part', FACTORY, "b: [s.who.right, 'B'], m: [s.who.wrong[0], 'M'], e: [s.who.wrong[1], 'E']", "b: [s.who.wrong[0], 'B'], m: [s.who.wrong[1], 'M'], e: [s.who.right, 'E']", 'G2-576', 2, '', 'is not keyed to the part that tells it'],
  ['level 3 without a sentence the story does not tell', FACTORY, 'if (d.notIn) strips.push', 'if (false) strips.push', 'G2-576', 3, '', 'sentences that are not in the story'],
  ['the letters missing from the boxes of the key', FACTORY, "${key ? esc(want) : ''}</span>`;", "${''}</span>`;", 'G2-576', 2, '', 'does not hold its letter'],
  // the story and the page
  ['a part of the story not printed as the bank has it', FACTORY, "${esc(s[p].join(' '))}</span></div>", "${esc(s[p].slice(1).join(' '))}</span></div>", 'G2-576', 3, '', 'part is not printed as the bank has it'],
  ['a story too big for the page', FACTORY, 'const room = L.room - rows * ROW;', 'const room = 900 - rows * ROW;', 'G2-576', 1, '', 'leaves the page'],
  ['choices of 18 px', FACTORY, 'const CHOICE = 20;', 'const CHOICE = 18;', 'G2-576', 1, '', 'a thing to circle is 18'],
  ['an instruction that is not the ruled one', FACTORY, "\n  arc: { 1: 'The beginning of a story tells the problem.", "\n  arc: { 1: 'A story has a beginning, a middle, and an end.", 'G2-576', 1, '', 'is not the one of level 1'],
  ['a title that is not the type’s', FACTORY, "\n  arc: 'How a Story Begins and Ends'", "\n  arc: 'How Stories Begin and End'", 'G2-576', 3, '', 'the title is not the type'],
  // ================= G2-577 Write How a Story Begins and Ends
  ['the page of the child carries the answers on its rows', FACTORY, 'const shown = key && answer ? seatOnRow(base, answer, { fill: T.teal }) : base;', 'const shown = answer ? seatOnRow(base, answer, { fill: T.teal }) : base;', 'G2-577', 1, '', 'a row is written on the page of the child'],
  ['writing rows of 40 px', FACTORY, 'const ROW = 44;', 'const ROW = 40;', 'G2-577', 1, '', 'px high, not 44'],
  ['a frame that is not the ruled one', FACTORY, "const FRAME = { who: ['We meet', '.'],", "const FRAME = { who: ['We see', '.'],", 'G2-577', 1, '', 'is not the frame of level 1'],
  ['no row to spare under the ending', FACTORY, "slotHtml(fr.solved + '.', FRAME.solved, key, FULLW, 'data-lcs-frame=\"solved\"'), 1, FULLW, '', nw)", "slotHtml(fr.solved + '.', FRAME.solved, key, FULLW, 'data-lcs-frame=\"solved\"'), 0, FULLW, '', nw)", 'G2-577', 1, '', 'has no row to spare'],
  ['the story title not the bank’s', FACTORY, "21px/1.15 'Baloo 2',cursive;color:${T.ink}\">${esc(s.title)}</div>` +", "21px/1.15 'Baloo 2',cursive;color:${T.ink}\">${esc(s.title.toUpperCase())}</div>` +", 'G2-577', 1, '', 'the story title is not the bank'],
  ['the parts of the story not labeled', FACTORY, '${PARTNAME[p].toUpperCase()}', '${PARTNAME[p]}', 'G2-577', 2, '', 'a part of the story is not labeled'],
  ['a starter keyed to half of its sample', FACTORY, 'slotHtml(`${fr.who} ${fr.where}.`, [START.begin, \'\']', 'slotHtml(`${fr.who}.`, [START.begin, \'\']', 'G2-577', 2, '', 'the starter of begin is not keyed'],
  ['the version that writes a new beginning prints the old one', FACTORY, "storyCard(s, P.variant === 'begin' ? ['m', 'e'] : ['b', 'm', 'e']", "storyCard(s, ['b', 'm', 'e']", 'G2-577', 3, '', 'the story does not print its parts'],
  ['an open answer with a frame', FACTORY, 'partHtml(slotHtml(smp, null, key', "partHtml(slotHtml(smp, ['So', ''], key", 'G2-577', 3, '', 'carries a frame'],
  ['an open answer keyed to the other sample', FACTORY, "const qa = P.variant === 'end' ? [['beginQ', s.beginSample]", "const qa = P.variant === 'end' ? [['beginQ', s.endSample]", 'G2-577', 3, '', 'the open answer beginQ is not keyed'],
  ['the key writes 40 letters on a row', FACTORY, 'const CPL = 30;', 'const CPL = 40;', 'G2-577', 3, '', 'letters on a row a second grader fills'],
  // (ruling E) the key of an open answer says what else is right
  ['the key of an open answer says only that it is a sample', FACTORY, 'keyNote(key, NOTE.open[q])', 'keyNote(key, NOTE.sample)', 'G2-577', 3, '', 'does not say what else is right'],
  // ================= G2-578 Who Is Talking? Points of View
  ['a numbered line keyed to another speaker', FACTORY, 'box1(P.letters[p.who], key)', 'box1(P.letters[P.s.chars.find((c) => c !== p.who)], key)', 'G2-578', 1, '', 'is not keyed to its speaker'],
  ['the letters in the boxes of the child', FACTORY, "${key ? esc(want) : ''}</span>`;", '${esc(want)}</span>`;', 'G2-578', 1, '', 'a box is filled on the page of the child'],
  ['a paragraph not printed as the bank has it', FACTORY, 'let h = typo(esc(p.t));', "let h = typo(esc(p.t + ' Yes.'));", 'G2-578', 1, '', 'of the story is not printed as the bank has it'],
  ['level 1 numbers lines named before the words', FACTORY, "1: { lines: 4, forms: ['after'], views: 2 }", "1: { lines: 4, forms: ['after', 'before'], views: 2 }", 'G2-578', 1, '', 'is named in a way level 1 does not ask for'],
  ['the views in the order of the letters', FACTORY, "if (views.map((x) => x.want).join('') === [...shown.map((c) => letters[c]), 'X'].join('')) continue;", "if (views.map((x) => x.want).join('') !== [...shown.map((c) => letters[c]), 'X'].join('')) continue;", 'G2-578', 1, '', 'stand in the order of the letters'],
  ['a story printed below 17 px', FACTORY, "style=\"font:700 ${L.pf}px/${L.plh} 'Nunito',sans-serif;color:${T.ink}\">${h}</div>", "style=\"font:700 15.5px/${L.plh} 'Nunito',sans-serif;color:${T.ink}\">${h}</div>", 'G2-578', 1, '', 'a story or play is printed at'],
  ['straight apostrophes', FACTORY, "if (ch === \"'\") t += AP;", "if (ch === \"'\") t += \"'\";", 'G2-578', 1, '', 'a straight apostrophe or quotation mark'],
  ['five numbered lines on level 2', FACTORY, "2: { lines: 6, forms: ['after', 'before'], views: 2 }", "2: { lines: 5, forms: ['after', 'before'], views: 2 }", 'G2-578', 2, '', 'numbered lines, not 6'],
  ['the letters of the speakers not printed', FACTORY, '${teal(P.letters[c])} = ${esc(c)}', '${teal(P.letters[c])} is ${esc(c)}', 'G2-578', 2, '', 'the letters of the speakers are not printed'],
  ['a view keyed to another speaker', FACTORY, '({ text: s.views[c].text, want: letters[c] })', '({ text: s.views[c].text, want: letters[shown.find((x) => x !== c)] })', 'G2-578', 2, '', 'is not keyed to who thinks it'],
  ['boxes for letters of 36 px', FACTORY, 'const BOX = 42;', 'const BOX = 36;', 'G2-578', 2, '', 'a box for a letter is'],
  ['a task line that is not the ruled one', FACTORY, "\n  who: 'Who says it?", "\n  who: 'Who said it?", 'G2-578', 2, '', 'Who says it'],
  ['the speakers of the numbered lines in a pattern', FACTORY, 'if (!seqOk(seq, lv === 1 ? 2 : 3)) continue;', 'if (lv === 3 ? seqOk(seq, 3) : !seqOk(seq, lv === 1 ? 2 : 3)) continue;', 'G2-578', 3, '', 'the speakers of the numbered lines'],
  ['two views where level 3 asks for three', FACTORY, "3: { lines: 8, forms: ['after', 'before', 'beat'], views: 3 }", "3: { lines: 8, forms: ['after', 'before', 'beat'], views: 2 }", 'G2-578', 3, '', 'views, not 4'],
  ['a number before the narration instead of the words', FACTORY, "h = h.replace('“', mark(num[i]) + '“')", 'h = mark(num[i]) + h', 'G2-578', 3, '', 'does not stand at the opening quotation mark'],
  // (ruling D) the box shows each way the level names a speaker, with an example on no page
  ['the box of level 1 shows the ways of level 3', FACTORY, 'LEVELS.voices[lv].forms.map((fm) =>', "['after', 'before', 'beat'].map((fm) =>", 'G2-578', 1, '', 'the box does not show the ways level 1'],
  ['an example of the box that is not the ruled one', FACTORY, "const SPEAK = { after: ['After the words:', '\"Hi!\" said Rosa.']", "const SPEAK = { after: ['After the words:', '\"Hi!\" said Rosa to me.']", 'G2-578', 2, '', 'the box does not show the ways level 2'],
  // ================= G2-579 Reader's Theater: Different Voices
  ['a voice word keyed to another character', FACTORY, ['data-lcs-voice="${A(r.name)}" data-lcs-right="${r.right}"', 'r.opts.map((o) => pill(o, o === r.right, key, L.ch || CHOICE)).join'], ['data-lcs-voice="${A(r.name)}" data-lcs-right="${r.opts.find((x) => x !== r.right)}"', 'r.opts.map((o) => pill(o, o === r.opts.find((x) => x !== r.right), key, L.ch || CHOICE)).join'], 'G2-579', 1, '', 'is not keyed to the bank'],
  ['the box no longer says how to read a play', FACTORY, "const PLAY_RULES = ['Read only your part. Do not read the names or the words in ( ) out loud.', 'The words in ( ) tell you how to say your line.'];", "const PLAY_RULES = ['Read only your part. Do not read the names or the words in ( ) out loud.'];", 'G2-579', 1, '', 'does not say how to read a play'],
  // (ruling F) level 1: each character's word beside a word that fits nobody, another one in each row
  ['level 1 offers another character’s word', FACTORY, 'const wrong = d.opts === 2 ? [nfs[i]] : [other, nf];', 'const wrong = d.opts === 2 ? [cast.find((x) => x !== c).word] : [other, nf];', 'G2-579', 1, '', 'are not a word that fits nobody'],
  ['level 1 offers one word that fits nobody in both rows', FACTORY, 'const wrong = d.opts === 2 ? [nfs[i]] : [other, nf];', 'const wrong = d.opts === 2 ? [nfs[0]] : [other, nf];', 'G2-579', 1, '', 'a voice word stands in two rows'],
  ['a checklist that is not the ruled one', FACTORY, "const READ_CHECK = ['I read only the lines of my part.',", "const READ_CHECK = ['I read my part.',", 'G2-579', 1, '', 'the checklist for reading the play is not the ruled one'],
  ['the parts of the play at 16 px', FACTORY, '<div data-lcs-cast data-lcs-read style="font:700 ${READ}px/1.2', '<div data-lcs-cast data-lcs-read style="font:700 ${READ - 2}px/1.2', 'G2-579', 1, '', 'text a second grader reads is'],
  ['a play not printed as the bank has it', FACTORY, '${esc(l.who.toUpperCase())}:</b> ${body}</div>', '${esc(l.who)}:</b> ${body}</div>', 'G2-579', 2, '', 'the play is not printed as the bank has it'],
  ['a play that prints the voice words', FACTORY, '${esc(l.who.toUpperCase())}:</b> ${body}</div>', "${esc(l.who.toUpperCase())}:</b> ${body} ${esc((s.cast.find((c) => c.name === l.who) || { word: '' }).word)}</div>", 'G2-579', 2, '', 'the play prints the voice word'],
  ['two characters to give a voice on level 2', FACTORY, '2: { chars: 3, opts: 3 }', '2: { chars: 2, opts: 3 }', 'G2-579', 2, '', 'characters to give a voice, not 3'],
  ['wrong voice words that are both another character’s', FACTORY, 'const wrong = d.opts === 2 ? [nfs[i]] : [other, nf];', 'const wrong = d.opts === 2 ? [nfs[i]] : [other, s.cast.find((x) => x !== c && x.word !== other).word];', 'G2-579', 3, '', 'are not another character'],
  ['the parts of the play not named', FACTORY, "const castLine = (s) => 'Parts: Narrator, ' +", "const castLine = (s) => 'Parts: ' +", 'G2-579', 3, '', 'the parts of the play are not named'],
  ['level 3 asks for no new line', FACTORY, '3: { chars: 3, opts: 3, next: true }', '3: { chars: 3, opts: 3 }', 'G2-579', 3, '', 'level 3 does not ask for one more line'],
  ['the new line keyed to another sample', FACTORY, "slotHtml(s.next[c.name], [c.name.toUpperCase() + ':', '']", "slotHtml(s.next[c.name] + ' Now!', [c.name.toUpperCase() + ':', '']", 'G2-579', 3, '', 'level 3 does not ask for one more line'],
  ['a key note that is not one of the ruled notes', FACTORY, "const NOTE = { sample: '(Sample)'", "const NOTE = { sample: '(Example)'", 'G2-581', 1, '', 'is not one that says it is a sample'],
  ['the key of the new line says only that it is a sample', FACTORY, 'keyNote(key, NOTE.line(c.word))', 'keyNote(key, NOTE.sample)', 'G2-579', 3, '', 'does not say which lines are right'],
  // ================= G2-580 Two Versions of One Tale: Sort the Facts
  ['the facts keyed to the other version', FACTORY, "a ? 'V1' : b ? 'V2'", "a ? 'V2' : b ? 'V1'", 'G2-580', 1, '', 'is not keyed to what the versions tell'],
  ['the page of the child rings the answers', FACTORY, "border:3px solid ${key && ok ? T.teal : 'transparent'}", "border:3px solid ${ok ? T.teal : 'transparent'}", 'G2-580', 1, '', 'the page of the child rings an answer'],
  ['the answers of the chart in a pattern', FACTORY, 'if (!placesOk(p, d.neither ? 4 : 3)) continue;', 'if (t < 3000 ? placesOk(p, d.neither ? 4 : 3) : !placesOk(p, d.neither ? 4 : 3)) continue;', 'G2-580', 1, '', 'the answers of the chart'],
  ['a fact in neither version on level 2', FACTORY, '2: { facts: 7, neither: 0 }', '2: { facts: 6, neither: 1 }', 'G2-580', 2, '', 'sentences in neither version'],
  ['a version not printed as the bank has it', FACTORY, "${esc(x.text)}</span></div>`).join('')}</div>", "${esc(x.text.replace(/\\./, '!'))}</span></div>`).join('')}</div>", 'G2-580', 2, '', 'the two versions are not printed as the bank has them'],
  ['five facts where level 3 asks for six', FACTORY, '3: { facts: 6, neither: 1 }', '3: { facts: 5, neither: 1 }', 'G2-580', 3, '', 'sentences in the chart, not 7'],
  ['a row of the chart not labeled', FACTORY, '${KIND_NAME[k]}</span><div style="flex:1 1 auto', '${k}</span><div style="flex:1 1 auto', 'G2-580', 3, '', 'a row of the chart is not labeled'],
  // (ruling B) a row whose facts in the pair are all Both is not printed; every row takes more than one answer over the copies
  ['a chart row whose facts are all Both', FACTORY, "const kindsOk = KINDS.filter((k) => told.some((x) => x.kind === k && x.status !== 'Both'));", 'const kindsOk = KINDS;', 'G2-580', 1, '', 'the chart does not hold the rows'],
  ['the problem row always Both', FACTORY, 'const inPair = told.filter((x) => kindsOk.includes(x.kind))', "const inPair = told.filter((x) => kindsOk.includes(x.kind) && (x.kind !== 'problem' || x.status === 'Both'))", 'G2-580', 1, 'load', 'the problem row always takes one answer'],
  ['a fact that runs out of its card', FACTORY, '<span data-lcs-facttext data-lcs-read style="flex:1 1 auto;min-width:0;', '<span data-lcs-facttext data-lcs-read style="flex:0 0 auto;white-space:nowrap;', 'G2-580', 3, '', 'leaves its card'],
  // ================= G2-581 Two Versions of One Tale: Compare Them
  ['the sample of the difference crosses the versions', FACTORY, "const diffOf = (k) => (k === 'setting' ? [V[0].diff.setting, V[1].diff.setting] : [V[0].notes[k], V[1].notes[k]]);", "const diffOf = (k) => (k === 'setting' ? [V[1].diff.setting, V[0].diff.setting] : [V[1].notes[k], V[0].notes[k]]);", 'G2-581', 1, '', 'not one difference of the two versions'],
  // (SHOULD 19) the difference is a row of the chart: the problem or the ending, else where it happens
  ['the difference taken from the characters', FACTORY, "const kinds = ['problem', 'ending'].filter((k) => V[0].notes[k] !== V[1].notes[k]);", "const kinds = ['characters'];", 'G2-581', 2, '', 'not one difference of the two versions'],
  // (SHOULD 20) the version a child likes is circled
  ['the version to like not ringed in the key', FACTORY, "['1', '2'].map((o) => pill(o, Number(o) === P.pickV, key)).join('')", "['1', '2'].map((o) => pill(o, false, key)).join('')", 'G2-581', 1, '', 'is not keyed to that version'],
  ['the version I like given the other version’s reason', FACTORY, 'like = V[P.pickV - 1].like', 'like = V[2 - P.pickV].like', 'G2-581', 1, '', 'is not keyed to that version'],
  ['a frame of level 1 that is not the ruled one', FACTORY, "const CMP = { both: ['In both versions,', '.'],", "const CMP = { both: ['In the two versions,', '.'],", 'G2-581', 1, '', 'the frame "both"'],
  ['frame words above the base rule of their row', FACTORY, 'const START_PAD = Math.round((BASE_Y - 0.829 * START_PX) * 10) / 10;', 'const START_PAD = Math.round((BASE_Y - 0.829 * START_PX) * 10) / 10 - 8;', 'G2-581', 1, '', 'off the base rule'],
  ['a key note on the page of the child', FACTORY, 'const keyNote = (key, text) => (key && text ?', 'const keyNote = (key, text) => (text ?', 'G2-581', 1, '', 'the page of the child carries a key note'],
  ['an f with no room before i, f, or l', FACTORY, 't.replace(/f(?=[ifl])/g,', 't.replace(/q(?=[ifl])/g,', 'G2-581', 2, '', 'has no room of its own'],
  ['a sample of “In both versions” that only one version tells', FACTORY, 'const cands = both.flatMap((bf) =>', "const cands = fs.filter((x) => x.status !== 'Both' && x.clause).concat(both).slice(0, 1).flatMap((bf) =>", 'G2-581', 2, '', 'is not something both versions tell'],
  ['one of the two samples not marked', FACTORY, 'const ns = keyNote(key, NOTE.sample), ne = keyNote(key, NOTE.either);', "const ns = keyNote(key, NOTE.sample), ne = '';", 'G2-581', 2, '', 'the key does not mark its samples'],
  ['the chart of the versions not the bank’s', FACTORY, '${esc(x.notes[k])}</span>', "${esc(x.notes[k] + '!')}</span>", 'G2-581', 3, '', 'the chart of the two versions is not the bank'],
  ['a level 3 sample that does not compare', FACTORY, 'In both versions, ${bothS}. In Version 1, ${d1}, but in Version 2, ${d2}.', 'In both versions, ${bothS}. In Version 1, ${d1}. In Version 2, ${d2}.', 'G2-581', 3, '', 'does not tell how the versions are alike and different'],
  // ================= G2-582 Book Club Talk: Build on What Others Say
  ['a reply that changes the subject keyed as the one that builds', FACTORY, ['data-lcs-comment="${r.ci}" data-lcs-right="${A(r.right)}"', 'pill(o, o === r.right, key, L.ch)'], ['data-lcs-comment="${r.ci}" data-lcs-right="${A(r.opts.find((x) => x !== r.right))}"', 'pill(o, o === r.opts.find((x) => x !== r.right), key, L.ch)'], 'G2-582', 1, '', 'the replies of comment'],
  ['every right reply in the first place', FACTORY, 'const at = places(idx.length, d.replies, rng);', 'const at = idx.map(() => 0);', 'G2-582', 1, 'load', 'stands in one place too often'],
  // (SHOULD 21) level 3: one wrong reply about the story that does not build on the idea
  ['level 3 without the reply about the story', FACTORY, '[shuffle(c.wrong, rng)[0], c.near]', '[c.wrong[0], c.wrong[1]]', 'G2-582', 3, '', 'the replies of comment'],
  ['the key of the own reply says only that it is a sample', FACTORY, 'keyNote(key, NOTE.reply(t.own.name))', 'keyNote(key, NOTE.sample)', 'G2-582', 3, '', 'the key does not mark its sample'],
  ['a comment not printed as the bank has it', FACTORY, '${esc(r.name)} said, "${esc(r.says)}"', '${esc(r.name)} says, "${esc(r.says)}"', 'G2-582', 1, '', 'is not the bank'],
  ['a blank band between the parts of the page', FACTORY, '<div data-lcs-card data-lcs-tiny="${A(t.id)}" style="flex:1 1 auto;', '<div data-lcs-card data-lcs-tiny="${A(t.id)}" style="margin-bottom:60px;flex:1 1 auto;', 'G2-582', 1, '', 'a blank band of'],
  ['questions and sentences at 17.6 px', FACTORY, 'const READ = 18;', 'const READ = 17.6;', 'G2-582', 1, '', 'a task line or a sentence is'],
  ['the tiny story not printed as the bank has it', FACTORY, '${esc(t.text)}</div></div>', "${esc(t.text.replace(/\\./, '!'))}</div></div>", 'G2-582', 2, '', 'the tiny story is not printed as the bank has it'],
  ['two comments where level 2 asks for three', FACTORY, '2: { replies: 3, comments: 3 }', '2: { replies: 3, comments: 2 }', 'G2-582', 2, '', 'comments, not 3'],
  ['level 2 asks for a reply of the child’s own', FACTORY, '2: { replies: 3, comments: 3 }', '2: { replies: 3, comments: 3, own: true }', 'G2-582', 2, '', 'asks for a reply of the child'],
  ['the reply of level 3 keyed to another sample', FACTORY, 'partHtml(slotHtml(t.own.sample, null', 'partHtml(slotHtml(t.comments[0].right, null', 'G2-582', 3, '', 'the reply of level 3 is not keyed'],
  ['replies to circle at 19 px', FACTORY, 'pill(o, o === r.right, key, L.ch)', 'pill(o, o === r.right, key, 19)', 'G2-582', 3, '', 'a thing to circle is 19'],
  // ================= G2-583 Book Club Talk Card
  ['a talk stem missing', FACTORY, "const STEM_TEXT = ['I agree with ___ because', 'I want to add that', 'I see it another way:'];", "const STEM_TEXT = ['I agree with ___ because', 'I want to add that'];", 'G2-583', 1, '', 'the talk stems are not the ruled ones'],
  ['a sample of the key not marked as one', FACTORY, "slotHtml(C.said, CARD_F.said, key, FULLW, 'data-lcs-frame=\"said\"'), 1, FULLW, '', nb);", "slotHtml(C.said, CARD_F.said, key, FULLW, 'data-lcs-frame=\"said\"'), 1);", 'G2-583', 1, '', 'does not say it is a sample'],
  // (SHOULD 24) after the talk: whose idea, the idea itself, and what I said
  ['the card does not ask for the idea built on', FACTORY, " + slotHtml(C.idea, CARD_F.idea, key, FULLW, 'data-lcs-frame=\"idea\"')", '', 'G2-583', 1, '', 'the frame .idea. is not the frame of level 1'],
  ['ligatures left on', FACTORY, 'data-lcs-noliga="1"', 'data-lcs-nolig="1"', 'G2-583', 1, '', 'does not turn ligatures off'],
  ['the model talk does not say what it is about', FACTORY, 'How a talk sounds (about ${esc(m.about)}):', 'How a talk sounds:', 'G2-583', 1, '', 'does not say what story it is about'],
  ['a task line of the card that is not the ruled one', FACTORY, "\n  before: 'Before the talk'", "\n  before: 'Before book club'", 'G2-583', 1, '', 'the task lines of the talk card are not the ruled ones'],
  ['the model talk not the bank’s', FACTORY, '${esc(st[1])}</span>${esc(st[2])}', '${esc(st[1])}</span>${esc(st[2])} Yes!', 'G2-583', 2, '', 'the model talk is not one of the bank'],
  ['a starter of level 2 that is not the ruled one', FACTORY, "const CARD_S = { think: 'I think',", "const CARD_S = { think: 'I feel',", 'G2-583', 2, '', 'the starter "think" is not the starter of level 2'],
  ['the card no longer asks for a question', FACTORY, '${esc(LINES.ask2)}</', '${esc(LINES.ask2.toUpperCase())}</', 'G2-583', 2, '', 'does not ask for a question'],
  ['a word kept for the teacher’s model in the key', FACTORY, "wonder: 'the dog run away', name: 'Maya'", "wonder: 'the lighthouse keeper left', name: 'Maya'", 'G2-583', 2, '', 'prints a word kept for the teacher'],
  ['a band inside a box', FACTORY, "<div data-lcs-legend data-lcs-read style=\"font:700 ${READ}px/1.25 'Nunito',sans-serif;", "<div data-lcs-legend data-lcs-read style=\"margin-bottom:60px;font:700 ${READ}px/1.25 'Nunito',sans-serif;", 'G2-578', 1, '', 'that a reader sees'],
  ['the open rows of level 3 with a frame', FACTORY, "slotHtml(`I think ${C.think} because ${C.because}.`, null, key", "slotHtml(`${C.think} because ${C.because}.`, ['I think', ''], key", 'G2-583', 3, '', 'the open rows of "think" carry a frame'],
  ['the stems of the model talk not marked', FACTORY, '<span data-lcs-stemused style=', '<span data-lcs-stemuse style=', 'G2-583', 3, '', 'the stems of the model talk are not marked'],
  ['a talk checklist that is not the ruled one', FACTORY, "const TALK_CHECK = ['I said one idea about our book.',", "const TALK_CHECK = ['I said one idea.',", 'G2-583', 3, '', 'the talk checklist is not the ruled one'],
  ['a line cut off at its end', FACTORY, 'const ask = `<div data-lcs-head data-lcs-read style="', 'const ask = `<div data-lcs-head data-lcs-read style="width:120px;white-space:nowrap;overflow:hidden;', 'G2-583', 3, '', 'a line is cut off'],
  ['the word free in a key', FACTORY, "const CARD_SAMPLE = { think: 'the girl was brave'", "const CARD_SAMPLE = { think: 'the girl felt free'", 'G2-583', 3, '', 'says free or premium'],

  // ================= the bank's own check (it runs when the factory loads)
  // the stories of RL.2.5
  ['bank: a dash in a story', BANK, '"Nia\'s eyes filled with tears."', '"Nia\'s eyes filled with tears — big ones."', 'G2-576', 1, 'load', 'a dash in'],
  ['bank: the beginning does not name whom we meet first', BANK, '"right": "Nia"', '"right": "Omar"', 'G2-576', 1, 'load', 'the beginning does not name'],
  ['bank: the problem’s proof not a sentence of the beginning', BANK, '"Then the string caught on a branch, and the kite got stuck at the top of an oak tree."', '"Then the string caught on a branch, and the kite stuck at the top of an oak tree."', 'G2-576', 1, 'load', 'the problem.s proof is not a sentence of the beginning'],
  ['bank: an event with no proof in its part', BANK, '"proof": "The wind lifted the kite high above the pond."', '"proof": "The wind lifted the kite high above the river."', 'G2-576', 1, 'load', 'has no proof sentence in its part'],
  ['bank: an event key not in its sentence', BANK, '"pond"', '"lake"', 'G2-576', 1, 'load', 'is not in its sentence'],
  ['bank: an event longer than 52 letters', BANK, '"Nia and Grandpa take a kite to the park."', '"Nia and Grandpa take a big new red kite to the park by the pond."', 'G2-576', 1, 'load', 'no sentence of 52 letters'],
  ['bank: a title that names the answer', BANK, '"A Windy Saturday"', '"A Kite Gets Stuck"', 'G2-576', 1, 'load', 'the title names'],
  ['bank: a frame answer that ends with a mark', BANK, '"where": "at the park"', '"where": "at the park."', 'G2-577', 1, 'load', 'is missing or ends with a mark'],
  ['bank: a place that does not start with at, in, or on', BANK, '"where": "at the park"', '"where": "the park"', 'G2-577', 1, 'load', 'does not start with at, in, or on'],
  ['bank: a sentence not in the story that names a word of it', BANK, '"buys"', '"kite"', 'G2-576', 3, 'load', 'names a word of the story'],
  ['bank: a word kept for the teacher’s model on a page', BANK, '"lifeguard"', '"kite"', 'G2-576', 1, 'load', 'a word kept for the teacher'],
  ['bank: a story that says free', BANK, '"Nia gave her a big hug."', '"Nia gave her a free hug."', 'G2-576', 1, 'load', 'says free or premium in'],
  ['bank: a story that says frees', BANK, '"She climbed up and unhooked the kite."', '"She climbed up and frees the kite."', 'G2-576', 1, 'load', 'says free or premium in'],
  // (ruling C) the events a wrong choice of the same part may be: a beginning event that is not the problem, an ending
  // event that is not the solution
  ['bank: an event with a tag its part does not allow', BANK, '"tag": "react"', '"tag": "echo"', 'G2-576', 2, 'load', 'has the tag .echo.'],
  // (ruling E) every sample holds what its task asks for
  ['bank: a beginning sample that does not tell where', BANK, '"beginSample": "We meet Nia at the park, and her kite gets stuck."', '"beginSample": "We meet Nia, and her kite gets stuck."', 'G2-577', 3, 'load', 'beginSample does not tell where'],
  ['bank: an ending sample that does not tell what was solved', BANK, '"endSample": "Ms. Bell unhooks the kite, so the problem is solved."', '"endSample": "Ms. Bell helps Nia, so the problem is solved."', 'G2-577', 3, 'load', 'endSample does not tell what was solved'],
  ['bank: an asked part that is not in the story', BANK, '"where": [\n     "park"', '"where": [\n     "moon"', 'G2-577', 3, 'load', 'the asked part where is missing'],
  // the dialogues of RL.2.6
  ['bank: a view that repeats a character’s words', BANK, '"The worm is cool."', '"Look at this cool worm!"', 'G2-578', 1, 'load', 'repeats a character'],
  ['bank: a paragraph named after the words where the bank says before', BANK, '"Ms. Park said, \\"Worms help the garden. They make the soil soft.\\""', '"\\"Worms help the garden. They make the soil soft,\\" said Ms. Park."', 'G2-578', 1, 'load', 'not named by a said-word before the words'],
  ['bank: a paragraph named before the words where the bank says after', BANK, '"\\"Look at this cool worm!\\" said Zoe."', '"Zoe said, \\"Look at this cool worm!\\""', 'G2-578', 1, 'load', 'not named by a said-word after the words'],
  ['bank: a paragraph named by a said-word where the bank says a sentence before', BANK, '"Zoe held out her hand. \\"He tickles!\\""', '"\\"He tickles!\\" said Zoe."', 'G2-578', 1, 'load', 'not named in a sentence before the words'],
  ['bank: a speaker not of the story', BANK, '"who": "Zoe"', '"who": "Zack"', 'G2-578', 1, 'load', 'a speaker not of the story'],
  ['bank: the view of nobody names a word of the story', BANK, '"eat"', '"puppy"', 'G2-578', 1, 'load', 'the view of nobody names a word of the story'],
  ['bank: a story that names the speaker of the examples', BANK, '"text": "Rain spoils the fun."', '"text": "Rosa says rain spoils the fun."', 'G2-578', 1, 'load', 'names Rosa'],
  ['bank: a view longer than 48 letters', BANK, '"Worms are too slimy to touch."', '"Worms are much too slimy and wiggly for anyone to touch."', 'G2-578', 1, 'load', '48 letters or fewer'],
  // the plays of RL.2.6
  ['bank: a stage direction that names the voice word', BANK, '"(gently) Your plant', '"(calmly) Your plant', 'G2-579', 1, 'load', 'or a form of it'],
  ['bank: two characters with one voice word', BANK, '"word": "sleepy"', '"word": "excited"', 'G2-579', 1, 'load', 'not three characters with three different voice words'],
  ['bank: a voice word that fits nobody is a character’s', BANK, '"sad"', '"sleepy"', 'G2-579', 1, 'load', 'not two voice words that fit nobody'],
  ['bank: a line of a play with quotation marks', BANK, '"Bear! The flowers are out! I can\'t wait to see them!"', '"Bear! \\"The flowers are out!\\" I can\'t wait to see them!"', 'G2-579', 1, 'load', 'holds quotation marks'],
  ['bank: a line of a play by a speaker not in the cast', BANK, '"who": "Crow"', '"who": "Owl"', 'G2-579', 1, 'load', 'a speaker not in the cast'],
  ['bank: a new line longer than one row', BANK, '"Rabbit": "Come on, Bear! Hurry!"', '"Rabbit": "Come on, Bear! Hurry up! The flowers will not wait for us!"', 'G2-579', 3, 'load', 'the next line of Rabbit is missing or longer'],
  // the tales of RL.2.9
  ['bank: a fact with no proof in a version that tells it', BANK, '"0": "Three little pigs lived in the woods."', '"0": "Three little pigs lived in a castle."', 'G2-580', 1, 'load', 'no proof sentence in version 1'],
  ['bank: a fact whose key word a version names without saying otherwise', BANK, '"pig"', '"house"', 'G2-580', 1, 'load', 'names a key word of it'],
  ['bank: a fact longer than 48 letters', BANK, '"text": "There are three little pigs."', '"text": "There are three little pigs who build three houses."', 'G2-580', 1, 'load', '48 letters or fewer'],
  ['bank: a fact that starts with its own answer word', BANK, '"text": "There are three little pigs."', '"text": "Both have three little pigs."', 'G2-580', 1, 'load', 'starts with an answer word'],
  ['bank: a note of a version longer than 44 letters', BANK, '"setting": "the woods"', '"setting": "deep in the dark woods far from any town at all"', 'G2-581', 1, 'load', 'longer than 44 letters'],
  ['bank: a setting clause that does not hold its note', BANK, '"setting": "it happens in the woods"', '"setting": "it happens in a forest"', 'G2-581', 1, 'load', 'no clause of the setting that holds its note'],
  ['bank: a version with no reason to like it', BANK, '"like": "the wolf has to give up and run away"', '"like": ""', 'G2-581', 1, 'load', 'no reason to like it'],
  // the talk of SL.2.1.b
  ['bank: a wrong reply that stays on the comment', BANK, '"I want to add that I like to play tag at recess."', '"I want to add that Ben is a kind brother."', 'G2-582', 1, 'load', 'shares'],
  ['bank: a comment that does not start with I think', BANK, '"I think Ben is a kind brother."', '"Ben is a kind brother."', 'G2-582', 1, 'load', 'does not start with I think'],
  ['bank: a reply with no talk stem', BANK, '"I agree with Ava because he made the hat just for his sister."', '"Yes, he made the hat just for his sister."', 'G2-582', 1, 'load', 'does not start with a talk stem'],
  ['bank: a reply that agrees with someone who did not speak', BANK, '"I agree with Ava because he made the hat just for his sister."', '"I agree with Mia because he made the hat just for his sister."', 'G2-582', 1, 'load', 'agrees with someone who did not speak'],
  ['bank: a reply about the story that stays on the comment', BANK, '"near": "I want to add that Rafael whispered."', '"near": "I want to add that the birds ate fast."', 'G2-582', 3, 'load', 'the near reply .* shares'],
  ['bank: a model talk on the topic of a play', BANK, '"about": "two friends who build a sandcastle"', '"about": "two friends who build a snow fort"', 'G2-583', 1, 'load', 'the model story is about'],
  ['bank: a sample reply of three rows', BANK, '"sample": "I agree with Tyler because folding it made the hat fit."', '"sample": "I agree with Tyler because folding the edge of the paper made the hat fit his head just right."', 'G2-582', 3, 'load', 'the fourth comment or its sample'],
];
