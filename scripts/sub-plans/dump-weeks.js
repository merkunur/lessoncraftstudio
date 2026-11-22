#!/usr/bin/env node
/**
 * The review dump of the week days (Part 5.4), for ONE reviewer (a US K-3 teacher, and a guest teacher who has only
 * these pages): per week day its blocks (kind, minutes, teaching point, page, printed title, instruction); then once
 * per teaching point the guest teacher's script: each of say / first / stuck once per distinct text, with the
 * worksheet types and pages that get it (a type's own sentences, or one page's picture words). Plain text.
 *
 *   node scripts/sub-plans/dump-weeks.js --loc=en --out=<file>
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const out = arg('out', path.join(REPO, 'out', 'sub-plans', 'weeks-dump.txt'));
const S = path.join(REPO, 'frontend', 'content', 'sub-plans');
const packs = JSON.parse(fs.readFileSync(path.join(S, 'packs.' + loc + '.json'), 'utf8')).packs.filter((p) => p.week);
const ui = JSON.parse(fs.readFileSync(path.join(S, 'ui.' + loc + '.json'), 'utf8'));
const GRADE = { K: 'Kindergarten', 1: 'Grade 1', 2: 'Grade 2', 3: 'Grade 3' };
// point → field → text → set of "type (page)" that get it
const byPoint = new Map();
const L = [];
L.push('WEEK DAYS OF THE ENGLISH (US) SUB PLANS — review dump (' + packs.length + ' days)');
L.push('');
L.push('PART 1, the days. A block line: kind, minutes, teaching point, worksheet type, the page for everyone (its address: www.lessoncraftstudio.com/en/decks/<address>/), the title printed on it, and the instruction printed on it. A "+" after a type: its harder page is the page for everyone.');
L.push('PART 2, the scripts, once per teaching point: what the guest teacher SAYS, how to START TOGETHER (FIRST), and what to do when a child is STUCK. Where a type or a page has its own text, the text names the types and pages that get it.');
let grade = '';
for (const p of packs) {
  if (p.grade !== grade) { grade = p.grade; L.push('', '=================== ' + GRADE[grade] + ' ===================='); }
  L.push('', p.title + ' — ' + p.minutes + ' minutes, ' + p.blocks.length + ' blocks');
  for (const b of p.blocks) {
    const t = b.type + (b.level ? '+' : '');
    L.push('  ' + ui['block_' + b.key] + ' ' + b.minutes + ' min · ' + b.point + ' · ' + t + ' · ' + b.core + ' · "' + b.title + '" · ' + b.instruction);
    if (!byPoint.has(b.point)) byPoint.set(b.point, { say: new Map(), first: new Map(), stuck: new Map() });
    const P = byPoint.get(b.point);
    for (const k of ['say', 'first', 'stuck']) { const m = P[k]; if (!m.has(b.script[k])) m.set(b.script[k], new Set()); m.get(b.script[k]).add(t + ' ' + b.core); }
  }
}
L.push('', '', '=================== PART 2: THE GUEST TEACHER SCRIPTS (' + byPoint.size + ' teaching points) ====================');
for (const [point, P] of [...byPoint].sort()) {
  L.push('', '## ' + point);
  for (const k of ['say', 'first', 'stuck']) {
    const m = P[k];
    for (const [text, uses] of m) {
      // name who gets the text only when the point has more than one text for this part
      const who = m.size > 1 ? ' [' + [...new Set([...uses].map((u) => u.split(' ')[0]))].map((t) => { const pages = [...uses].filter((u) => u.split(' ')[0] === t).map((u) => u.split(' ')[1]); const all = [...m.values()].every((s) => [...s].every((u) => u.split(' ')[0] !== t) || s === uses); return all ? t : t + ' page ' + pages.join(', '); }).join('; ') + ']' : '';
      L.push('  ' + k.toUpperCase() + who + ': ' + text);
    }
  }
}
fs.writeFileSync(out, L.join('\n') + '\n');
console.log(out + ': ' + packs.length + ' days, ' + byPoint.size + ' points, ' + Math.round(L.join('\n').length / 1024) + ' KB');
