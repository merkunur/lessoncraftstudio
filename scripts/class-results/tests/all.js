#!/usr/bin/env node
/**
 * Every check of class links and results, in order; stops at the first that fails.
 *
 *   node scripts/class-results/tests/all.js            the local checks (about six minutes; four of them open a browser)
 *   node scripts/class-results/tests/all.js --live     also the reporter on 26 published decks of the live site (read only)
 *   node scripts/class-results/tests/all.js --quick    only the checks without a browser
 *
 * Each robot is run a second time with --poison: a check that cannot fail proves nothing.
 */
'use strict';
const path = require('path');
const { spawnSync } = require('child_process');
const D = __dirname;
const QUICK = process.argv.includes('--quick'), LIVE = process.argv.includes('--live');
const list = [
  ['the rules', 'class-store.test.js'],
  ['the rules, planted faults', 'mutate-class-store.js'],
  ['the retention job and the backup step', 'retention.test.js'],
  ['the texts in 11 languages', 'strings.js'],
  ['the 40 seat pictures', '../seat-icons-sheet.js'],
];
if (!QUICK) list.push(
  ['the reporter on a maker worksheet', 'reporter-maker.js'], ['… poisoned', 'reporter-maker.js', '--poison'],
  ['the children\'s class page', 'class-page.js'], ['… poisoned', 'class-page.js', '--poison'],
  ['the teacher screen', 'teacher-app.js'], ['… poisoned', 'teacher-app.js', '--poison'],
  ['an activity through a class link', 'activity-class.js'], ['… poisoned', 'activity-class.js', '--poison'],
);
if (LIVE) list.push(['the reporter on 26 live decks', 'reporter-live.js'], ['… poisoned', 'reporter-live.js', '--poison']);
// which hosts a browser talks to on the pages a child reaches (the live origin; legal decision 2026-11-14, E3d)
if (LIVE) list.push(['pages a child reaches talk to this site only; a class visit is not counted', 'live-hosts.js', '--origin', '--beacon']);

for (const [name, file, ...args] of list) {
  const t = Date.now();
  const run = () => spawnSync(process.execPath, [path.join(D, file), ...args], { encoding: 'utf8', timeout: 15 * 60 * 1000 });
  let r = run();
  // Windows: the makers' local store file can still be held for a moment by the run before (EPERM on rename); once more
  if (r.status !== 0 && /EPERM|EBUSY/.test(r.stderr || '')) { spawnSync(process.execPath, ['-e', 'setTimeout(()=>{},3000)']); r = run(); }
  const last = (r.stdout || '').trim().split('\n').pop() || '';
  if (r.status !== 0) {
    console.log('FAIL  ' + name + '\n' + (r.stdout || '').split('\n').filter((l) => /^FAIL|FAILURE|did NOT/.test(l)).slice(0, 12).join('\n') + (r.stderr ? '\n' + r.stderr.slice(0, 600) : ''));
    process.exit(1);
  }
  console.log('ok    ' + name + ' — ' + last + ' (' + Math.round((Date.now() - t) / 1000) + ' s)');
}
console.log('\nclass results: every check passes');
