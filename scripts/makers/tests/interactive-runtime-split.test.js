#!/usr/bin/env node
/**
 * Test: the 2026-11-01 split of emit/interactive-runtime.js into a Node wrapper + emit/interactive-runtime-core.js
 * (no Node import, usable in the makers' browser bundle) changed NOTHING a deck receives. For every kind the catalogue
 * declares, buildInteractive() of the committed reference (git show <ref>:… into a temp tree) and of the working tree
 * give byte-identical { css, stageOpen, stageClose, controls, script } on the same fixture, in en and fi.
 * Poisoned: a fixture built with a different locale must differ (the comparison is not vacuous).
 *
 *   node scripts/makers/tests/interactive-runtime-split.test.js [--ref=<commit>]   (default: the last commit before the split)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO = path.resolve(__dirname, '..', '..', '..');
const REF = (process.argv.find((a) => a.startsWith('--ref=')) || '--ref=8ce93793d').slice(6);
const REL = 'scripts/worksheet-gen/emit';
const tmp = path.join(REPO, '.scratch', 'irt-ref');
fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(path.join(tmp, REL), { recursive: true });
// the DELIBERATE changes to the core since the split, applied to the reference so the test still proves the split itself
// changed nothing else; a patch whose text is no longer in the reference fails the test (it cannot go stale silently)
const DELIBERATE = [
  { since: 'f146b5906', why: 'tap-spell accepts the other right orders a page lists (data-lcs-alts, Unscramble the Sentence)',
    from: 'var right=fold(w)===fold(B.answers[i]);for(var k=0;k<it.slots.length;k++)',
    to: 'var right=fold(w)===fold(B.answers[i]);if(!right){var al=String(((B.items[i]||{}).meta||{})["data-lcs-alts"]||"").split("|");for(var a=0;a<al.length;a++)if(al[a]&&fold(al[a])===fold(w))right=true}for(var k=0;k<it.slots.length;k++)' },
];
let refSrc = execSync(`git show ${REF}:${REL}/interactive-runtime.js`, { cwd: REPO, maxBuffer: 64 << 20, encoding: 'utf8' });
for (const p of DELIBERATE) {
  if (refSrc.split(p.from).length !== 2) { console.log(`FAIL deliberate change ${p.since} (${p.why}): its text is not once in the reference`); process.exit(1); }
  refSrc = refSrc.replace(p.from, () => p.to);
}
fs.writeFileSync(path.join(tmp, REL, 'interactive-runtime.js'), refSrc);
// the three kind modules were not part of the split (unchanged from the reference to the split commit): both sides load
// the working tree's copy, so a later change to one of them (the 2026-11-02 set-clock handle sizing) is not read as the
// split changing a deck
for (const f of ['interactive-type-plus.js', 'interactive-set-clock.js', 'interactive-mark-grid.js']) {
  fs.copyFileSync(path.join(REPO, REL, f), path.join(tmp, REL, f));
}
// the reference reads REFERENCE TRANSLATIONS/translations-shared.js three levels up from emit/
try { fs.symlinkSync(path.join(REPO, 'REFERENCE TRANSLATIONS'), path.join(tmp, 'REFERENCE TRANSLATIONS'), 'junction'); } catch (e) { /* exists */ }
const ref = require(path.join(tmp, REL, 'interactive-runtime.js'));
const cur = require(path.join(REPO, REL, 'interactive-runtime.js'));

const box = (i, n = 4) => ({ x: 10 + (i % n) * 20, y: 10 + Math.floor(i / n) * 20, w: 15, h: 8 });
const sub = (i) => ({ sx: 12 + (i % 4) * 20, sy: 12 + Math.floor(i / 4) * 20, sw: 5, sh: 4 });
const FIX = {
  'tap-order': () => ({ items: [0, 1, 2].map((i) => ({ ...box(i), ...sub(i), label: 'w' + i, answer: [2, 3, 1][i] })) }),
  'tap-order-ranks': () => ({ kind: 'tap-order', items: [0, 1, 2].map((i) => ({ ...box(i), ...sub(i), label: 'w' + i, answer: [2, 5, 3][i] })), ctx: { ranksFromAnswers: true } }),
  'tap-choice': () => ({ items: [0, 1].map((i) => ({ label: 'q' + i, meta: { 'data-lcs-word': 'w' }, options: [0, 1, 2].map((j) => ({ ...box(i * 4 + j), label: 'o' + j })), answer: i })) }),
  'tap-select': () => ({ items: [0, 1, 2, 3].map((i) => ({ ...box(i), label: 'w' + i, answer: i % 2 === 0, meta: {} })) }),
  'tap-select-groups': () => ({ kind: 'tap-select', ctx: { countGroups: true }, items: [0, 1, 2, 3].map((i) => ({ ...box(i), label: 'p' + i, answer: i < 2, meta: { 'data-lcs-group': 'g', 'data-lcs-want': '2' } })) }),
  'tap-spell': () => ({ items: [{ label: 'cat', meta: {}, answer: 'cat', tiles: ['t', 'a', 'c'].map((l, j) => ({ ...box(j), label: l })), slots: [4, 5, 6].map((j) => box(j)) }] }),
  'tap-paint': () => ({ items: [{ region: '1', answer: 'red', label: '' }, { region: '2', answer: 'blue', label: '' }], ctx: { paint: { art: { x: 10, y: 10, w: 80, h: 60, svg: '<svg viewBox="0 0 10 10"><path data-lcs-region="1" d="M0 0h5v5h-5z"/><path data-lcs-region="2" d="M5 5h5v5h-5z"/></svg>' }, crayons: [{ ...box(8), colour: 'red', label: 'red' }, { ...box(9), colour: 'blue', label: 'blue' }], hex: { red: '#f00', blue: '#00f' } } } }),
  'trace-path': () => ({ items: [{ label: 'route 1', meta: {}, answer: '0-1-2' }], ctx: { trace: { nodes: [[10, 10], [50, 10], [50, 50]], edges: [{ a: 0, b: 1, pts: [[10, 10], [50, 10]] }, { a: 1, b: 2, pts: [[50, 10], [50, 50]] }], routes: [{ start: 0, goal: 2, path: [0, 1, 2] }], aspect: 0.75, pageW: 703, w: 40 } } }),
  'type-number': () => ({ items: [0, 1, 2].map((i) => ({ ...box(i), label: 'b' + i, answer: 10 + i, meta: {} })), ctx: { maxDigits: 2 } }),
  'type-number-plus': () => ({ kind: 'type-number', items: [0, 1, 2, 3].map((i) => ({ ...box(i), label: 'b' + i, answer: i, meta: { 'data-lcs-set': i < 2 ? 'odd' : 'even' } })), ctx: { maxDigits: 2, sortSets: { odd: [0, 1], even: [2, 3] }, picks: [{ options: [box(8), box(9)].map((b, j) => ({ ...b, label: 'o' + j })), answer: 1, meta: {} }] } }),
  'type-word': () => ({ items: [0, 1].map((i) => ({ ...box(i), label: 'w' + i, answer: ['cat', 'dog'][i], meta: {} })), ctx: { maxChars: 6, keys: [...'abcdefghijklmnopqrstuvwxyz'] } }),
  'set-clock': () => ({ items: [0, 1].map((i) => ({ cx: 25 + i * 50, cy: 30, r: 12, label: '3:30', answer: '3:30', meta: { 'data-lcs-step': '5' } })), ctx: { clock: { aspect: 0.75, names: { hour: 'hour', minute: 'minute' } } } }),
  'mark-grid': () => ({ items: [0, 1].map((r) => ({ label: 'r' + r, meta: { 'data-lcs-row': 'a:' + r }, answer: r })), ctx: { grid: { cells: [[0, 0], [0, 1], [1, 0], [1, 1]].map(([r, c], i) => ({ ...box(i), g: 'a', r, c, label: r + '-' + c })), cases: [{ g: 'a', mode: 'one', n: 2, clues: [] }] } } }),
  'tap-edit': () => ({ items: [0, 1].map((i) => ({ words: ['the', 'cat'], splitAfter: -1, icon: 'data:image/png;base64,AA==', answer: [{ cap: true, mark: '' }, { cap: false, mark: '.' }], meta: {} })), marks: '.?' }),
};
let fails = 0, n = 0;
for (const [name, mk] of Object.entries(FIX)) {
  for (const locale of ['en', 'fi']) {
    const base = mk();
    const o = { kind: base.kind || name, locale, ...base };
    let a, b;
    try { a = ref.buildInteractive(o); } catch (e) { fails++; console.log(`FAIL ${name} ${locale}: reference threw ${e.message}`); continue; }
    try { b = cur.buildInteractive(o); } catch (e) { fails++; console.log(`FAIL ${name} ${locale}: current threw ${e.message}`); continue; }
    n++;
    for (const k of ['css', 'stageOpen', 'stageClose', 'controls', 'script']) if (a[k] !== b[k]) { fails++; console.log(`FAIL ${name} ${locale}: ${k} differs`); }
  }
}
// poison: the comparison must be able to see a difference (a fi build against an en build)
const pa = ref.buildInteractive({ kind: 'tap-choice', locale: 'en', ...FIX['tap-choice']() }), pb = cur.buildInteractive({ kind: 'tap-choice', locale: 'fi', ...FIX['tap-choice']() });
if (pa.script === pb.script || pa.controls === pb.controls) { fails++; console.log('FAIL poison: an en and a fi build compared equal'); }
// the wrapper still refuses an unknown kind, and the core refuses a call without strings
try { cur.buildInteractive({ kind: 'nope', locale: 'en', items: [] }); fails++; console.log('FAIL unknown kind accepted'); } catch (e) { /* right */ }
try { require(path.join(REPO, 'scripts/worksheet-gen/emit/interactive-runtime-core.js')).buildInteractive({ kind: 'tap-choice', locale: 'en', ...FIX['tap-choice']() }); fails++; console.log('FAIL core accepted a call without strings'); } catch (e) { /* right */ }
fs.rmSync(tmp, { recursive: true, force: true });
console.log(fails ? `interactive-runtime split: ${fails} failing` : `interactive-runtime split: ${n} builds byte-identical to ${REF}, poison fires`);
if (fails) process.exitCode = 1;
