#!/usr/bin/env node
/**
 * mzl-text-dump.js — the Maze Puzzles Level Set's visible TEXT in every locale, compact, for the ONE native-speaker +
 * pedagogy reviewer (CLAUDE.md rule #2). Per locale: every scene's title | print title | instruction | screen
 * instruction (+ the "missed" sentence of a collect scene), with the pictures it names (library srcs, so the reviewer
 * can check the words name what is DRAWN); then the first-sound card pools (route cards + decoys) the pages draw from.
 * Read through the real text files (data/hmx/text/<loc>.js) and the allocation, never re-authored here.
 *   node tools/level-set/mzl-text-dump.js > dump.txt   [--locales=en,de]
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const { skinOf } = require('../../lib/hmx.js');
const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'hmx', 'allocation.json'), 'utf8'));
const LOCALES = ((process.argv.find((a) => a.startsWith('--locales=')) || '').slice(10) || 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const units = [];
for (const [id, lvs] of Object.entries(A.faces)) for (const [lv, list] of Object.entries(lvs)) for (const c of list) units.push({ id, lv, unit: c.unit });
const pic = (o) => (o && o.src ? o.src : '');
// --compact: per face ONE scene in full; every other scene shows each string with the words it shares with that example
// trimmed off the front and the back ("…"), so the declined nouns stay in their grammatical frame at a third of the size
const COMPACT = process.argv.includes('--compact');
function trimTo(s, ex) {
  if (!ex || s === ex) return s === ex ? '=' : s;
  const a = s.split(' '), b = ex.split(' '); let i = 0, j = 0;
  while (i < a.length - 1 && i < b.length - 1 && a[i] === b[i]) i++;
  while (j < a.length - i - 1 && j < b.length - 1 && a[a.length - 1 - j] === b[b.length - 1 - j]) j++;
  i = Math.max(0, i - 1); j = Math.max(0, j - 1);   // keep one shared word each side as grammatical context
  return (i ? '…' : '') + a.slice(i, a.length - j).join(' ') + (j ? '…' : '');
}
const out = [];
for (const loc of LOCALES) {
  const T = require('../../data/hmx/text/' + loc + '.js');
  out.push(`\n==================== ${loc} ====================`);
  let face = '', ex = null;
  for (const u of units) {
    const sk = skinOf(u.unit); const t = T[u.unit];
    const first = sk.face !== face;
    if (first) { face = sk.face; ex = t; out.push(`-- ${face} (${u.id}) --`); }
    const pics = [pic(sk.hero), pic(sk.goal)].filter(Boolean).join(' → ') + (sk.labels && sk.labels.item ? ' · item ' + sk.labels.item : '') + (sk.labels && sk.labels.kinds ? ' · avoid ' + sk.labels.kinds.join('+') : '');
    out.push(`${u.unit} L${u.lv} [${pics}]`);
    const f = (s, e) => (COMPACT && !first ? trimTo(s, e) : s);
    out.push(`  T: ${f(t.title, ex.title)}\n  P: ${f(t.printTitle, ex.printTitle)}\n  I: ${f(t.instruction, ex.instruction)}\n  S: ${f(t.tap, ex.tap)}` + (t.missed ? `\n  M: ${f(t.missed, ex.missed)}` : ''));
  }
  const P = require('../../data/hmx/sound-pools.json')[loc]; const Q = require('../../data/hm/sound-pools.json')[loc];
  out.push('-- FIRST-SOUND CARDS --');
  out.push(`  /l/ route: ${Q.l.map((c) => c.word).join(', ')}`);
  for (const k of ['t', 'p']) {
    out.push(`  /${k}/ route: ${P[k].l.map((c) => c.word).join(', ')}`);
    out.push(`  /${k}/ decoys: ${P[k].decoy.map((c) => c.word).join(', ')}`);
  }
}
process.stdout.write(out.join('\n') + '\n');
