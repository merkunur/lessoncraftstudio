#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/info-text-g2b.js (G2-521 What the Diagram Shows, G2-522 Steps in
 * Order, G2-524 Text or Diagram?, G2-525 Before and After) can fail: each planted fault changes the factory (or the text bank), renders the page it concerns, and
 * expects the page's own check or the bank's check to report it. The file is restored after every fault (and on any
 * error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-info-text-g2b.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'info-text-g2b.js');
const BANK = path.join(WG, 'data', 'literacy', 'info-texts.en.json');
// [name, file, text to find, its replacement, type, level, draws (8 unless the fault shows on one text only)]
const FAULTS = [
  // the diagram page (G2-521)
  ["no arrow from the last stage back to the first", FACTORY, "for (let i = 0; i < n; i++) {\n    const j = (i + 1) % n, miss = i === gap;", "for (let i = 0; i < n - 1; i++) {\n    const j = (i + 1) % n, miss = i === gap;", "G2-521", 1],
  ["a label left out on the easy level", FACTORY, "blank = lv === 3 ? t.diagram.blank : -1,", "blank = t.diagram.blank,", "G2-521", 1],
  ["the missing arrow is printed on the child page", FACTORY, "if (miss && !key) continue;", "if (miss && key) continue;", "G2-521", 3],
  ["no label left out on the hardest level", FACTORY, "const lab = i === blank\n", "const lab = i === -9\n", "G2-521", 3],
  ["the hardest level asks about the stage without a label", FACTORY, "const one = order.find((x) => usableAt3(t, x));", "const one = order.find((x) => !usableAt3(t, x));", "G2-521", 3],
  ["an arrow runs into a drawing", FACTORY, "const reach = size / 2 + 5;", "const reach = size / 2 - 30;", "G2-521", 2],
  ["the text-and-diagram question stands first", FACTORY, "const qs = [...shuffle(dq, rng), both], at = placesFor(5, rng);", "const qs = [both, ...shuffle(dq, rng)], at = placesFor(5, rng);", "G2-521", 1],
  ["the labels above the drawings", FACTORY, ">${artOf(s.art, size, `${t.id}-${i}`)}</div>${lab}</div>`;", ">${lab}${artOf(s.art, size, `${t.id}-${i}`)}</div></div>`;", "G2-521", 2],
  ["small print on the diagram page", FACTORY, "diagram: { 1: { font: 16 }", "diagram: { 1: { font: 13 }", "G2-521", 1],
  ["a text too big for the diagram page", FACTORY, "diagram: { 1: { font: 16 }", "diagram: { 1: { font: 23 }", "G2-521", 1],
  ["no why-question on the hardest diagram page", FACTORY, "cream('data-lcs-explain=\"1\"',", "cream('data-lcs-explainx=\"1\"',", "G2-521", 3],
  ["level 2 asks how many stages there are", FACTORY, "const order = dq.filter((x) => !readsOf(t, x).count);", "const order = dq.slice(0, 3);", "G2-521", 2],
  ["level 2 does not ask what the diagram adds", FACTORY, "'adds', FULL),\n            qCard(5, both", "'diagram', FULL),\n            qCard(5, both", "G2-521", 2],
  ["a new moon drawn bright", FACTORY, "phase === 0 ? '' : `<path data-lcs-lit", "phase === 9 ? '' : `<path data-lcs-lit", "G2-521", 1, 30],
  ["a moon without its dark sky", FACTORY, "<rect data-lcs-sky x=\"-48\"", "<rect x=\"-48\"", "G2-521", 1, 30],
  // the steps page (G2-522)
  ["the steps to number stand in their order", FACTORY, "if (seq !== '1234' && seq !== '4321') break; }", "rows = t.steps.map((s, i) => ({ n: i + 1, text: s })); break; }", "G2-522", 1],
  ["a box keyed to another step", FACTORY, "numBox(r.n, key)", "numBox((r.n % 4) + 1, key)", "G2-522", 1],
  ["two pictures only", FACTORY, "t.pictures.map((p) => `<img", "t.pictures.slice(0, 2).map((p) => `<img", "G2-522", 1],
  ["no first words in the boxes of level 2", FACTORY, "starter: lv === 2 ? SIGNALS[i] + ',' : null,", "starter: null,", "G2-522", 2],
  ["first words in the boxes of level 3", FACTORY, "starter: lv === 2 ? SIGNALS[i] + ',' : null,", "starter: lv >= 2 ? SIGNALS[i] + ',' : null,", "G2-522", 3],
  ["no why-question on the hardest steps page", FACTORY, "const why = lv === 3 ? cream(", "const why = lv === 9 ? cream(", "G2-522", 3],
  ["no arrows between the boxes", FACTORY, "lv === 3 ? 3 : 4)).join(downArrow);", "lv === 3 ? 3 : 4)).join('');", "G2-522", 2],
  ["one line only in each box", FACTORY, "sample: true }) + line({ w: lineW, h: d.rowH }) + `</div></div>`, lv === 3 ? 3 : 4))", "sample: true }) + `</div></div>`, lv === 3 ? 3 : 4))", "G2-522", 3],
  ["a steps page half empty", FACTORY, "3: { font: 14.8, rowH: 30 } },", "3: { font: 14.6, rowH: 16 } },", "G2-522", 3],
  // the page Text or Diagram? (G2-524)
  ["the right box is the other one", FACTORY, "${tick(r.w === 'text')}${tick(r.w === 'diagram')}", "${tick(r.w === 'diagram')}${tick(r.w === 'text')}", "G2-524", 1],
  ["text and diagram take turns", FACTORY, "if (!/ttt|ddd/.test(seq) && !/^(td)+$|^(dt)+$/.test(seq) && !/^(tt|dd)(tt|dd)$/.test(seq)) break; }", "rows = [tx[0], dg[0], tx[1], dg[1], ...(tx[2] ? [tx[2], dg[2]] : [])]; break; }", "G2-524", 2],
  ["four facts in two blocks", FACTORY, "if (!/ttt|ddd/.test(seq) && !/^(td)+$|^(dt)+$/.test(seq) && !/^(tt|dd)(tt|dd)$/.test(seq)) break; }", "rows = [tx[0], tx[1], dg[0], dg[1]]; break; }", "G2-524", 1],
  ["the hardest level does not ask how the diagram helps", FACTORY, "cream('data-lcs-more=\"help\"',", "cream('data-lcs-more=\"text\"',", "G2-524", 3],
  ["a diagram with a label missing on the page Text or Diagram?", FACTORY, "top = diagramBox(t, { font: d.font, lv: 1, key });   // the whole diagram", "top = diagramBox(t, { font: d.font, lv: 3, key });   // the whole diagram", "G2-524", 1],
  ["no fact to write on the hardest level", FACTORY, "const more = lv === 3\n", "const more = lv === 9\n", "G2-524", 3],
  ["a check mark printed on the child page", FACTORY, "${key && on ? CHECK : ''}</span></span>`;", "${on ? CHECK : ''}</span></span>`;", "G2-524", 1],
  // the page Before and After (G2-525)
  ["a sentence keyed to the wrong word", FACTORY, "(flip[x] ? { a: k, b: i, w: 'after' } : { a: i, b: k, w: 'before' })", "(flip[x] ? { a: k, b: i, w: 'before' } : { a: i, b: k, w: 'after' })", "G2-525", 1],
  ["the other word is the right one", FACTORY, "${word('before', r.w === 'before')}${word('after', r.w === 'after')}", "${word('before', r.w === 'after')}${word('after', r.w === 'before')}", "G2-525", 1],
  ["a question keyed to a step that is not the one right before", FACTORY, "const qs = shuffle([{ w: 'before', of: 1, ans: 0 }, { w: 'after', of: 2, ans: 3 }], rng);", "const qs = shuffle([{ w: 'before', of: 2, ans: 0 }, { w: 'after', of: 2, ans: 3 }], rng);", "G2-525", 2],
  ["a question prints the step that answers the other one", FACTORY, "const qs = shuffle([{ w: 'before', of: 1, ans: 0 }, { w: 'after', of: 2, ans: 3 }], rng);", "const qs = shuffle([{ w: 'before', of: 1, ans: 0 }, { w: 'after', of: 0, ans: 1 }], rng);", "G2-525", 2],
  ["the sentence with a word to write is keyed to the other word", FACTORY, "? { a: 2, b: 1, w: 'after' } : { a: 1, b: 2, w: 'before' };", "? { a: 2, b: 1, w: 'before' } : { a: 1, b: 2, w: 'after' };", "G2-525", 2],
  ["the word of the sentence is printed on the child page", FACTORY, "${key ? mid.w : ''}</span> ${esc(C[mid.b])}.</div>`", "${mid.w}</span> ${esc(C[mid.b])}.</div>`", "G2-525", 2],
  ["one line only for a sentence to finish", FACTORY, "rows(3, `${W} ${C[q.of]},`", "rows(1, `${W} ${C[q.of]},`", "G2-525", 3],
  ["no sentence of the child's own on the hardest level", FACTORY, "'data-lcs-own=\"1\"') + `</div>`;", "'data-lcs-ownx=\"1\"') + `</div>`;", "G2-525", 3],
  // the bank's own check (it runs when the factory loads)
  ["bank: a diagram question with an answer the diagram does not give", BANK, "\"q\": \"Which stage comes right after the chrysalis?\"", "\"q\": \"Which stage comes right after the caterpillar?\"", "G2-521", 2],
  ["bank: the text names a stage the diagram is to tell", BANK, "\"It eats leaves day after day and grows fast.\"", "\"The caterpillar eats leaves day after day and grows fast.\"", "G2-521", 2],
  ["bank: the text says how many stages there are", BANK, "\"The diagram shows the stages of its life in order.\"", "\"The diagram shows the five stages of its life in order.\"", "G2-521", 2],
  ["bank: the arrow left out is the arrow back to the first stage", BANK, "\"gap\": 3,", "\"gap\": 4,", "G2-521", 3],
  ["bank: the text-and-diagram question answered by the text alone", BANK, "\"It looks a little like a tiny alligator.\"", "\"This larva looks a little like a tiny alligator.\"", "G2-521", 2],
  ["bank: a signal word twice in a text", BANK, "\"Next, the dough rests in a warm place.\"", "\"Next, the dough rests first in a warm place.\"", "G2-522", 2],
  ["bank: a signal question that names the place of its step", BANK, "\"q\": \"Which word starts the step about the beekeeper?\"", "\"q\": \"Which word starts the third step?\"", "G2-522", 1],
  ["bank: a signal question keyed to another step", BANK, "\"step\": 3,\n     \"q\": \"Which word starts the step about the beekeeper?\"", "\"step\": 2,\n     \"q\": \"Which word starts the step about the beekeeper?\"", "G2-522", 1],
  ["bank: a step that does not begin with its signal word", BANK, "\"Then, the wool is spun.\"", "\"After that, the wool is spun.\"", "G2-522", 2],
  ["bank: a text fact that names a stage only the diagram tells", BANK, "\"A young butterfly sheds its skin.\"", "\"A young caterpillar sheds its skin.\"", "G2-524", 1],
  ["bank: a diagram fact the diagram does not show", BANK, "\"The chrysalis comes before the butterfly.\"", "\"The butterfly comes before the chrysalis.\"", "G2-524", 1],
  ["bank: a step clause that holds the word before", BANK, "\"the dough rests and rises\"", "\"the dough rests and rises before noon\"", "G2-525", 1],
  ["bank: no sample of a sentence of the child's own", BANK, "\"ownSample\": \"The dough rises before the baker shapes a loaf.\"", "\"ownSample\": \"The dough rises.\"", "G2-525", 3],
];
const ORIG = { [FACTORY]: fs.readFileSync(FACTORY, 'utf8'), [BANK]: fs.readFileSync(BANK, 'utf8') };
let caught = 0;
try {
  for (const [name, file, find, repl, type, level, draws = 8] of FAULTS) {
    const src = ORIG[file].replace(/\r\n/g, '\n');
    const hits = src.split(find).length - 1;
    if (hits !== 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
    fs.writeFileSync(file, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=' + type, '--levels=' + level, '--locales=en', '--seeds=' + draws], { cwd: WG, encoding: 'utf8' });
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR|Error/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || out.match(/Error: [^\n]*/) || [''])[0].replace(/^(?:FAIL|ERROR) +\S+ \S+ \S+ \S+: /, '').slice(0, 120)) : ''));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
