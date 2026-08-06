#!/usr/bin/env node
/* =====================================================================
   audit-no-competition.js — the operator-locked no-competition + 0-line guard
   ---------------------------------------------------------------------
   Two static checks (no browser):

   1. NO-COMPETITION lint (HARD): the games program forbids any
      timer / score / points / streak / countdown / leaderboard surface
      (fun = character delight + sensory juice + collection, never a
      metric). Scans the shipped game runtime + engines + game data
      modules for those tokens.

   2. PROTECTED-CORES 0-LINE guard (HARD): games must NEVER modify the
      shared shell (lcs-shell.js / lcs-shell.css). Asserts they are
      byte-identical to HEAD (git diff --quiet).

   USAGE:
     node scripts/games/audit-no-competition.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MINI = path.join(__dirname, '..', '..', 'mini tools');

/* shipped game files to lint (NOT the dev harness / collection.html) */
function gameFiles() {
  const top = fs.readdirSync(MINI).filter(f =>
    f === 'game-shell.js' || f === 'game-assets.js' || f === 'game-collection.js' || /^engine-.*\.js$/.test(f)
  ).map(f => path.join(MINI, f));
  const gamesDir = path.join(MINI, 'games');
  const games = fs.existsSync(gamesDir)
    ? fs.readdirSync(gamesDir).filter(f => /\.js$/.test(f) && !f.startsWith('.')).map(f => path.join(gamesDir, f))
    : [];
  return top.concat(games);
}

const FORBIDDEN = [
  { re: /\bscore\b/i, name: 'score' },
  { re: /\bhigh[\s-]?score\b/i, name: 'high-score' },
  { re: /\bstreak\b/i, name: 'streak' },
  { re: /\bleaderboard\b/i, name: 'leaderboard' },
  { re: /\bcountdown\b/i, name: 'countdown' },
  { re: /\btimer\b/i, name: 'timer' },
  { re: /\bpoints\b/i, name: 'points' }
];
const WARN = [{ re: /\bsetInterval\b/, name: 'setInterval (recurring clock smell)' }];

let fails = [], warns = [];

/* return the CODE part of a line (comments stripped) so the lint flags
   real surfaces, not documentation about the lock. Tracks /* *​/ blocks
   across lines and strips // line comments (but not :// in a URL). */
function codeOnly(lines) {
  const out = [];
  let inBlock = false;
  for (let raw of lines) {
    let s = raw;
    if (inBlock) {
      const end = s.indexOf('*/');
      if (end === -1) { out.push(''); continue; }
      s = s.slice(end + 2); inBlock = false;
    }
    // strip inline block comments
    s = s.replace(/\/\*[\s\S]*?\*\//g, '');
    const open = s.indexOf('/*');
    if (open !== -1) { inBlock = true; s = s.slice(0, open); }
    // strip line comment // (but keep :// in URLs)
    s = s.replace(/([^:])\/\/.*$/, '$1').replace(/^\/\/.*$/, '');
    out.push(s);
  }
  return out;
}

console.log('=== NO-COMPETITION lint (game runtime + engines + game data — code only) ===');
for (const f of gameFiles()) {
  const src = fs.readFileSync(f, 'utf8');
  const rel = path.relative(path.join(__dirname, '..', '..'), f);
  const code = codeOnly(src.split('\n'));
  code.forEach((line, i) => {
    FORBIDDEN.forEach(p => { if (p.re.test(line)) fails.push(rel + ':' + (i + 1) + '  forbidden token "' + p.name + '"  -> ' + line.trim()); });
    WARN.forEach(p => { if (p.re.test(line)) warns.push(rel + ':' + (i + 1) + '  ' + p.name); });
  });
  console.log('  scanned ' + rel);
}
if (warns.length) { console.log('\n  WARN:'); warns.forEach(w => console.log('    • ' + w)); }

console.log('\n=== PROTECTED-CORES 0-line guard (lcs-shell.js / lcs-shell.css) ===');
const PROTECTED = ['mini tools/lcs-shell.js', 'mini tools/lcs-shell.css'];
try {
  execSync('git diff --quiet HEAD -- ' + PROTECTED.map(p => '"' + p + '"').join(' '), { cwd: path.join(__dirname, '..', '..'), stdio: 'ignore' });
  console.log('  ok   protected shell files are byte-identical to HEAD');
} catch (e) {
  // exit code 1 from git diff --quiet => there IS a diff
  fails.push('protected shell files changed vs HEAD (games must keep lcs-shell.{js,css} 0-line): ' + PROTECTED.join(', '));
  console.log('  FAIL protected shell files differ from HEAD');
}

console.log('');
if (fails.length) { console.error('NO-COMPETITION / 0-LINE GATE FAILED:\n  - ' + fails.join('\n  - ')); process.exit(1); }
console.log('NO-COMPETITION / 0-LINE GATE PASSED — no competition surface, shell untouched.');
process.exit(0);
