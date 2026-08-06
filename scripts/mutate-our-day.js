#!/usr/bin/env node
/* =====================================================================
   mutate-our-day.js — break one invariant at a time and require
   verify-our-day.js to FAIL on each.

   ⚠ A GATE THAT HAS ONLY EVER BEEN SEEN TO PASS IS INDISTINGUISHABLE
   FROM A GATE THAT CANNOT FAIL. verify-our-day.js existed for two weeks
   without one of these, and every model bug this rebuild fixed was
   sitting underneath it, green.

   Every poison below is a defect this tool could plausibly have shipped,
   and SIX OF THEM IT ACTUALLY DID — they are marked SHIPPED.

   ⚠ Needles self-anchor on the LIVE file, never on a remembered literal:
   apply-our-day-locales.js rewrites whole blocks and a stale needle
   silently reports ANCHOR NOT FOUND, which shrinks the total while the
   run still says "every mutation killed". A missing needle is a FAULT
   here, not a skip.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..');
const SRC = path.join(REPO, 'mini tools', 'our-day.js');
const original = fs.readFileSync(SRC, 'utf8');

/* [name, find, replace, shipped?] */
const MUTATIONS = [
  ['advance() lands on skipped cards (SHIPPED)',
    'while (n < day.items.length && day.items[n].skipped) n++;',
    'while (false) n++;', true],

  ['insert before the sun does not move it (SHIPPED)',
    'if (at <= day.sunIdx) day.sunIdx++;',
    'if (false) day.sunIdx++;', true],

  ['a reorder loses which card is current (SHIPPED)',
    'for (var i = 0; i < day.items.length; i++) if (day.items[i] === cur) { day.sunIdx = i; break; }',
    'day.sunIdx = day.sunIdx;', true],

  ['the past becomes skippable (SHIPPED)',
    'canSkip: function (day, i) { return i >= 0 && i < day.items.length && (!day.started || i > day.sunIdx); }',
    'canSkip: function (day, i) { return i >= 0 && i < day.items.length; }', true],

  ['the past becomes swappable (SHIPPED)',
    'canSwap: function (day, i) { return i >= 0 && i < day.items.length && (!day.started || i >= day.sunIdx); }',
    'canSwap: function (day, i) { return i >= 0 && i < day.items.length; }', true],

  /* the step-back must walk BACK over moon-folded cards too, or it lands
     on a card the class was told is not happening today. */
  ['the step-back lands on a skipped card',
    'while (p >= 0 && day.items[p].skipped) p--;',
    'while (false) p--;', false],

  ['the warning stage is skipped, so one tap crosses',
    "if (!force && !day.warned && n < day.items.length) { day.warned = true; return 'warned'; }",
    "if (false) { day.warned = true; return 'warned'; }", false],

  ['the warning flag survives the crossing',
    'day.warned = false;\n    day.sunIdx = n;',
    'day.sunIdx = n;', false],

  ['coerceDay stops clamping sunIdx',
    'if (s > out.items.length) s = out.items.length;',
    'if (false) s = out.items.length;', false],

  ['coerceDay stops being total (the `st || newDay()` shape)',
    'if (!d || typeof d !== \'object\') return out;',
    'if (false) return out;', false],

  ['the 16-card ceiling is lifted',
    'if (day.items.length >= this.MAX_CARDS) return false;',
    'if (false) return false;', false],

  ['the custom-card cap is lifted',
    "if (!editId && list.length >= this.MAX_CUSTOM) return 'listFull';",
    "if (false) return 'listFull';", false],

  ['an over-long name is accepted instead of refused',
    "if (clean.length > this.MAX_NAME) return 'tooLong';",
    "if (false) return 'tooLong';", false],

  ['two custom cards may share icon AND colour',
    "if (list[i].icon === icon && list[i].tint === tint) return 'duplicate';",
    "if (false) return 'duplicate';", false],

  ['an empty custom name is accepted',
    "if (!clean) return 'empty';",
    "if (false) return 'empty';", false],

  ['cleanName stops collapsing whitespace',
    ".replace(/\\s+/g, ' ')",
    ".replace(/\\s{99}/g, ' ')", false],

  ['a template drops its snapshots, so a plan is locale-blind again (SHIPPED)',
    'out.push({ id: it.id, time: it.time ? { h: it.time.h, m: it.time.m } : null, snap: it.snap });',
    'out.push({ id: it.id, time: it.time ? { h: it.time.h, m: it.time.m } : null });', true],

  ['dayFromTemplate stops being total',
    "var src = (items && items.length !== undefined && typeof items !== 'string') ? items : [];",
    'var src = items;', false],

  ['a vh unit reappears in the stylesheet',
    "'.od-palwrap{max-height:none;}'",
    "'.od-palwrap{max-height:70vh;}'", false],

  ['a hard-coded English aria-label reappears',
    "x.setAttribute('aria-label', api.t('closeAria'));",
    "x.setAttribute('aria-label', 'close');", false],

  ['a locale loses a new string',
    'dayDoneTitle: {en:',
    'dayDoneTitle: {XX:', false]
];

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith('--only='));
const list = only ? MUTATIONS.filter((m) => m[0].indexOf(only.split('=')[1]) >= 0) : MUTATIONS;

/* control: the UNMUTATED tool must PASS, or every "killed" below is
   meaningless because the gate would fail on anything. */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'our-day-mut-'));
const dir = path.join(tmp, 'mini tools');
fs.mkdirSync(dir, { recursive: true });
/* ⚠ carry EVERY file the gate reads, or every mutation is "killed" by a
   missing file and the harness reports a clean sweep of nothing. */
['our-day.js', 'learning-clock.js'].forEach((f) => {
  fs.copyFileSync(path.join(REPO, 'mini tools', f), path.join(dir, f));
});

function runGate() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-our-day.js')], {
      env: Object.assign({}, process.env, { OUR_DAY_TOOL_DIR: dir }),
      stdio: 'pipe',
      timeout: 30000
    });
    return { pass: true };
  } catch (e) {
    if (e.killed || e.signal) return { pass: false, timedOut: true };
    return { pass: false };
  }
}

console.log('control: the unmutated tool must PASS');
const control = runGate();
if (!control.pass) {
  console.error('  FATAL: verify-our-day.js fails on the UNMUTATED tool. Every result below would be a false kill.');
  process.exit(1);
}
console.log('  ok\n');

let killed = 0, survived = [], faults = [];
list.forEach(function (m) {
  const [name, find, repl, shipped] = m;
  const n = original.split(find).length - 1;
  if (n === 0) { faults.push(name + '  [ANCHOR NOT FOUND]'); console.log('  FAULT ' + name + ' — anchor not found'); return; }
  if (n > 1) { faults.push(name + '  [ANCHOR AMBIGUOUS x' + n + ']'); console.log('  FAULT ' + name + ' — anchor matches ' + n + ' times'); return; }
  fs.writeFileSync(path.join(dir, 'our-day.js'), original.replace(find, repl), 'utf8');
  const r = runGate();
  if (r.timedOut) { survived.push(name + ' [TIMED OUT]'); console.log('  SURVIVED (timeout) ' + name); return; }
  if (r.pass) { survived.push(name); console.log('  SURVIVED ' + name); }
  else { killed++; console.log('  killed   ' + name + (shipped ? '   <- this one actually shipped' : '')); }
});

fs.writeFileSync(path.join(dir, 'our-day.js'), original, 'utf8');
try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) {}

console.log('\n' + killed + '/' + list.length + ' mutations killed');
if (faults.length) { console.error('FAULTS (a missing anchor SHRINKS the total — it is not a pass):'); faults.forEach((f) => console.error('  ' + f)); }
if (survived.length) { console.error('SURVIVED — the gate is blind to these:'); survived.forEach((s) => console.error('  ' + s)); }
process.exit((survived.length || faults.length) ? 1 : 0);
