#!/usr/bin/env node
/**
 * What the week days of one grade still need for their guest teacher scripts (Part 5.4): per teaching point and type,
 * whether the block already gets a script and whether that script names something of one page (a word list, "the
 * page for everyone", reference answers), which a week page of the same type must not inherit. Out: stdout.
 *
 *   node scripts/sub-plans/work-todo.js --grade=1
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const grade = arg('grade', '1');
const T = path.join(REPO, 'out', 'sub-plans', 'thumbs', 'text');
const plan = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'sub-plans', 'weeks-plan.json'), 'utf8')).filter((b) => b.grade === grade);
const scripts = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'sub-plans', 'scripts', 'en.json'), 'utf8')).points;
const strings = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.en.json'), 'utf8'));
const packs = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'sub-plans', 'packs.en.json'), 'utf8')).packs.filter((p) => !p.week);
const in24 = new Set(packs.flatMap((p) => p.blocks.map((b) => b.point + ' ' + b.type + (b.level ? '+' : ''))));
const SPEC = /page for everyone|own reference|they are |pairs on|answers? (is|are)|for example,? the|On this page/i;
const clip = (t, n) => t.replace(/Made with LessonCraftStudio[.]com/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
const groups = new Map();
for (const b of plan) { const k = b.point + ' ' + b.type + (b.level ? '+' : ''); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(b); }
let last = '';
for (const [k, bs] of [...groups].sort()) {
  const [point, typeK] = k.split(' ');
  const type = typeK.replace('+', '');
  const sc = scripts[point];
  const bt = sc && sc.byType && sc.byType[typeK];
  const wk = sc && sc.byType && sc.byType[typeK + '@w'];
  const eff = sc ? Object.assign({}, sc, bt || {}, wk || {}) : null;
  const unseen = bs.filter((b) => !(sc && sc.byPage && sc.byPage[b.core]));
  const spec = eff && SPEC.test([eff.say, eff.first, eff.stuck].join(' '));
  let state = !sc ? 'NEW-POINT' : wk ? 'has-week' : bt ? 'has-byType' : 'base-only';
  if (spec && unseen.length) state += ' PAGE-SPECIFIC';
  if (in24.has(k)) state += ' IN24';
  if (process.argv.includes('--open') && !/NEW-POINT|PAGE-SPECIFIC|base-only/.test(state)) continue;
  if (point !== last) { console.log('\n# ' + point + (sc ? '  say: ' + clip(sc.say, 150) : '')); last = point; }
  const s = strings[type] || {};
  console.log('  ' + typeK + ' [' + state + '] wk ' + bs.map((b) => b.week).join(',') + ' | ' + (s.printTitle || s.title) + ' | ' + clip(s.instruction || '', 110));
  if (bt) console.log('     bt: ' + clip(Object.values(bt).join(' / '), 160));
  if (!/NEW-POINT|PAGE-SPECIFIC|base-only/.test(state)) continue;
  for (const b of bs) {
    const m = fs.existsSync(path.join(T, b.core + '.json')) ? JSON.parse(fs.readFileSync(path.join(T, b.core + '.json'), 'utf8')) : {};
    const tx = fs.existsSync(path.join(T, b.core + '.txt')) ? clip(fs.readFileSync(path.join(T, b.core + '.txt'), 'utf8').replace(s.printTitle || s.title || '', '').replace(s.instruction || '', '').replace(/Name: Date:/, ''), 170) : '';
    console.log('     ' + b.core + ((m.vocabulary || []).length ? ' {' + m.vocabulary.join(', ') + '}' : '') + (tx ? ' :: ' + tx : ''));
  }
}
