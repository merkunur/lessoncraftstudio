#!/usr/bin/env node
/* =====================================================================
   mutate-learning-clock.js — every mutation must be killed.

   verify-learning-clock.js reports 106 green assertions. That number
   means nothing until something has been broken on purpose and the gate
   has noticed. Each needle below is a defect this tool either SHIPPED or
   could plausibly ship; the run fails if any survives.

   ⚠ A TIMEOUT IS SCORED AS A SURVIVAL, explicitly. #38 met an unbounded
   loop and the harness read the hang as a pass.
   ⚠ A NEEDLE THAT MISSES IS A HARNESS FAULT, NOT A SKIP. A dropped needle
   shrinks the total while the run still says "every mutation killed".
   ⚠ AND AN INERT NEEDLE IS ALSO A FAULT — replacing text with itself
   tests nothing, so every substitution is checked for actually changing.
   ⚠ LINE ENDINGS ARE COLLAPSED FIRST: `git checkout` restores through
   core.autocrlf and seven of #43's multi-line needles went blind to it.

   Run:  node scripts/mutate-learning-clock.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SRC = fs.readFileSync(path.join(MINI, 'learning-clock.js'), 'utf8').replace(/\r\n/g, '\n');
const VERIFY = path.join(__dirname, 'verify-learning-clock.js');
const TIMEOUT = 30000;
/* every data file the gate reads must travel with the copy, or every
   mutation is "killed" by a missing file and the sweep reports nothing */
const CARRY = [];

const faults = [];
function needle(name, from, to) {
  if (SRC.indexOf(from) < 0) { faults.push(`${name}: needle NOT FOUND — ${JSON.stringify(from.slice(0, 60))}`); return null; }
  if (from === to) { faults.push(`${name}: needle is INERT`); return null; }
  const out = SRC.split(from).join(to);
  if (out === SRC) { faults.push(`${name}: substitution changed nothing`); return null; }
  return { name, src: out };
}
/* a self-anchoring needle for an authored English string */
function enNeedle(name, key, replacement) {
  const re = new RegExp(key + ':\\s*\\{en:\'((?:[^\'\\\\]|\\\\.)*)\'');
  const m = re.exec(SRC);
  if (!m) { faults.push(`${name}: no en value for "${key}"`); return null; }
  if (m[1] === replacement) { faults.push(`${name}: "${key}" already reads that — INERT`); return null; }
  const from = `${key}: {en:'${m[1]}'`.replace(/\s+/, ': {'); /* normalise the spacing we matched */
  const whole = m[0];
  const out = SRC.replace(whole, whole.replace(m[1], replacement));
  if (out === SRC) { faults.push(`${name}: en substitution changed nothing`); return null; }
  return { name, src: out };
}

/* ⚠ THE STRING NEEDLES ARE SELF-ANCHORING. Five of them went blind at
   once when apply-learning-clock-locales rewrote the block from single to
   double quotes and eleven native panels rewrote the values — and the
   harness reported five FAULTS rather than quietly shrinking the sweep,
   which is the only reason this was visible. A needle that encodes the
   current TEXT of what it mutates has a half-life; these read the value
   off the file and mutate whatever they find. */
function locNeedle(name, key, loc, replacement) {
  /* line-scoped: the value can itself contain braces ({n} minutes), so a
     [^}] bound cannot reach past the first placeholder — a first version
     failed on exactly that and reported a missing locale on a key that
     was present. */
  const line = SRC.split(String.fromCharCode(10)).find(l => l.trim().indexOf(key + ':') === 0);
  if (!line) { faults.push(`${name}: no line for "${key}"`); return null; }
  /* ⚠ BUILT FROM A PLAIN STRING, character by character. Writing this as
     a literal cost three attempts: a backslash class inside a shell
     heredoc, inside a python string, inside a JS regex loses a level at
     every layer, and the file stopped parsing each time. */
  const BS = String.fromCharCode(92), DQ = String.fromCharCode(34);
  const VAL = '((?:[^' + DQ + BS + BS + ']|' + BS + BS + '.)*)';
  const re = new RegExp('(' + loc + ':' + DQ + ')' + VAL + '(' + DQ + ')');
  const m = re.exec(line);
  if (!m) { faults.push(`${name}: no ${loc} value on the "${key}" line`); return null; }
  if (m[2] === replacement) { faults.push(`${name}: "${key}.${loc}" already reads that — INERT`); return null; }
  const newLine = line.replace(m[0], m[1] + replacement.replace(/"/g, '\\"') + m[3]);
  const out = SRC.split(line).join(newLine);
  if (out === SRC) { faults.push(`${name}: substitution changed nothing`); return null; }
  return { name, src: out };
}
function enCopyNeedle(name, key, loc) {
  const line = SRC.split(String.fromCharCode(10)).find(l => l.trim().indexOf(key + ':') === 0);
  if (!line) { faults.push(`${name}: no line for "${key}"`); return null; }
  const BS = String.fromCharCode(92), DQ = String.fromCharCode(34);
  const m = new RegExp('en:' + DQ + '((?:[^' + DQ + BS + BS + ']|' + BS + BS + '.)*)' + DQ).exec(line);
  if (!m) { faults.push(`${name}: no en value for "${key}"`); return null; }
  return locNeedle(name, key, loc, m[1]);
}

const M = [
  /* --- the model ------------------------------------------------- */
  needle('hour-angle drifts', 'hourAngle: function (total) { return total / 2; }', 'hourAngle: function (total) { return total / 2.4; }'),
  needle('minute-angle drifts', 'minuteAngle: function (total) { return (total % 60) * 6; }', 'minuteAngle: function (total) { return (total % 60) * 5; }'),
  needle('minute gearing wrong', "which === 'minute' ? deg / 6 : deg * 2", "which === 'minute' ? deg / 5 : deg * 2"),
  needle('hour gearing wrong', "which === 'minute' ? deg / 6 : deg * 2", "which === 'minute' ? deg / 6 : deg * 3"),
  needle('signed delta loses a wrap', 'if (d < -180) d += 360;', 'if (d < -1800) d += 360;'),
  needle('snap floors instead of rounding', 'snapTo: function (total, g) { return (Math.round(total / g) * g) % 720; }', 'snapTo: function (total, g) { return (Math.floor(total / g) * g) % 720; }'),

  /* --- the pointing contract, i.e. the shipped defects ------------ */
  needle('hour hand overshoots its numerals', 'hourTip: 258, minTip: 418,', 'hourTip: 330, minTip: 418,'),
  needle('minute hand misses the dot ring', 'hourTip: 258, minTip: 418,', 'hourTip: 258, minTip: 360,'),
  needle('hour hand ends on the 24h ring', 'hourTip: 258, minTip: 418,', 'hourTip: 226, minTip: 418,'),
  needle('grips collapse onto one radius', 'gripHourR: 190, gripMinR: 418,', 'gripHourR: 400, gripMinR: 418,'),
  needle('hour grip leaves its blade', 'gripHourR: 190, gripMinR: 418,', 'gripHourR: 300, gripMinR: 418,'),

  /* --- the hand silhouette, i.e. what only a render caught -------- */
  needle('blade starts on the tip side', "var d = 'M' + (cx - w0) + ' ' + (cy + back) +", "var d = 'M' + (cx - w0) + ' ' + (cy - back) +"),
  needle('blade base flips at the far corner', "' L' + (cx + w0) + ' ' + (cy + back) + ' Z';", "' L' + (cx + w0) + ' ' + (cy - back) + ' Z';"),
  needle('counterweight moves to the tip', "g.appendChild(elNS('circle', { cx: cx, cy: cy + back, r: cw,", "g.appendChild(elNS('circle', { cx: cx, cy: cy - back, r: cw,"),
  needle('keyline dropped — hands merge at 12:00', "stroke: C.FACE, 'stroke-width': 7, 'paint-order': 'stroke', 'stroke-linejoin': 'round' }));", "stroke: 'none', 'stroke-width': 0, 'stroke-linejoin': 'round' }));"),
  needle('hour hand no longer the wider one', 'var w0 = hour ? 34 : 15, w1 = hour ? 21 : 7,', 'var w0 = hour ? 12 : 15, w1 = hour ? 8 : 7,'),

  /* --- the arc, the signature feature ----------------------------- */
  needle('arc reverts to the hardcoded locale list', 'return /\\{N2?3?\\}/.test(tpl);', "return ['de','nl','sv','da','no','fi'].indexOf(this.api.lang) >= 0 ? m >= 20 : m > 30;"),
  needle('arc ignores the regional overlay', "if (this._store.deQuarter && rules.overlays && rules.overlays.deQuarter &&", 'if (false && rules.overlays && rules.overlays.deQuarter &&'),

  /* --- practice -------------------------------------------------- */
  needle('start pose hands over the answer', 'startPoseFor: function (target) { return (target === 0) ? 360 : 0; }', 'startPoseFor: function (target) { return (target + 180) % 720; }'),

  /* --- tiering --------------------------------------------------- */
  needle('quarter hours go behind the paywall', "FREE_STEPS: ['60', '30', '15', '5'],", "FREE_STEPS: ['60', '30'],"),
  needle('the paid rung is given away', "FREE_STEPS: ['60', '30', '15', '5'],", "FREE_STEPS: ['60', '30', '15', '5', '1'],"),

  /* --- strings --------------------------------------------------- */
  enCopyNeedle('an untranslated English leak', 'countFives', 'de'),
  locNeedle('a locale goes blank', 'granHour', 'de', ''),
  locNeedle('a placeholder is lost', 'durMinutes', 'de', 'Minuten'),
  needle('a control character sneaks in', "api.t('taskPrompt')).split('{time}')", "api.t('taskPrompt')).split('')"),
  needle('a dead string ships', '  strings: {', '  strings: {\n    sheetNever: {en:"x",de:"x",fr:"x",it:"x",es:"x",pt:"x",nl:"x",sv:"x",da:"x",no:"x",fi:"x"},'),

  /* --- the CSS bans ---------------------------------------------- */
  needle('a vh unit returns', '.lck-face{position:relative;width:100%;aspect-ratio:1;', '.lck-face{position:relative;width:min(100%,52vh);aspect-ratio:1;'),
  needle('a height-keyed media query returns', "'@media (min-width:1367px){body.lck-wide .lck-wrap{", "'@media (min-width:1367px) and (min-height:880px){body.lck-wide .lck-wrap{"),
  needle('faux bold returns', "+ '.lck-panel-title{font-family:var(--lcs-font-display);font-weight:700;font-size:18px;'", "+ '.lck-panel-title{font-family:var(--lcs-font-display);font-weight:800;font-size:18px;'"),

  /* --- the touch fix itself, all three surfaces ------------------- */
  needle('touch-action lost on the face wrapper', ".lck-face{position:relative;width:100%;aspect-ratio:1;touch-action:none;", '.lck-face{position:relative;width:100%;aspect-ratio:1;'),
  needle('touch-action lost on the svg root', ".lck-svg{display:block;width:100%;height:auto;touch-action:none;", ".lck-svg{display:block;width:100%;height:auto;"),
  needle('touch-action lost on the grips', "'touch-action:none;-webkit-tap-highlight-color:transparent;'", "'-webkit-tap-highlight-color:transparent;'"),

  /* --- the print sheet's second lock ------------------------------ */
  needle('a print rule loses its tier scope', "+   'body.lck-paid .lck-sheet{display:block !important;}'", "+   '.lck-sheet{display:block !important;}'"),
  needle('the print block disappears', "+ '@media print{'", "+ '@media screen and (min-width:99999px){'")
].filter(Boolean);

if (faults.length) {
  faults.forEach(f => console.log('  ✗ HARNESS FAULT ' + f));
  console.log(`\nFAIL — ${faults.length} harness fault(s); the sweep would have measured nothing`);
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lck-mut-'));
CARRY.forEach(f => fs.copyFileSync(path.join(MINI, f), path.join(tmp, f)));

const survived = [];
let killed = 0;
console.log(`applying ${M.length} mutations…\n`);
M.forEach(m => {
  fs.writeFileSync(path.join(tmp, 'learning-clock.js'), m.src);
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { LCK_TOOL_DIR: tmp }),
      timeout: TIMEOUT, stdio: 'pipe'
    });
  } catch (e) {
    died = true;
    why = (e.signal === 'SIGTERM' || e.killed) ? 'TIMEOUT' : 'FAIL';
  }
  if (died && why === 'TIMEOUT') { survived.push(m.name + '  (the gate HUNG — that is a survival)'); }
  else if (died) { killed++; console.log('  ✓ killed  ' + m.name); }
  else { survived.push(m.name); console.log('  ✗ SURVIVED ' + m.name); }
});

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}

console.log(`\nmutations: ${M.length}   killed: ${killed}   survived: ${survived.length}   harness faults: 0`);
if (survived.length) {
  survived.forEach(s => console.log('  ✗ ' + s));
  console.log('\nFAIL');
  process.exit(1);
}
console.log('PASS — every mutation killed');
