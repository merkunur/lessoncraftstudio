#!/usr/bin/env node
/* =====================================================================
   poison-calendar-wall-layout.js — prove the BROWSER gate can fail.
   ---------------------------------------------------------------------
   Run:  node scripts/poison-calendar-wall-layout.js

   `mutate-calendar-wall.js` never opens a browser, so every assertion in
   `local-test-calendar-wall.js` has only ever been seen to PASS. A gate
   in that state is indistinguishable from one that cannot fail — and
   this tool is the reason to care: its previous browser gate ran green
   for months while asserting `.cwl-cell:not(.empty)` >= 28, which counts
   CELLS, and a face-down card with no number on it is a cell.

   Each poison below is a defect this tool ACTUALLY SHIPPED. Every one
   must make the DoD exit non-zero, and the restored file must pass.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const TOOL = path.join(__dirname, '..', 'mini tools', 'calendar-wall.js');
const DOD = path.join(__dirname, 'local-test-calendar-wall.js');
const raw = fs.readFileSync(TOOL, 'utf8');
const HAD_CRLF = raw.indexOf('\r\n') >= 0;
const orig = raw.split('\r\n').join('\n');
const denorm = (t) => (HAD_CRLF ? t.split('\n').join('\r\n') : t);

const POISONS = [
  {
    name: 'THE SHIPPED DEFECT: the numeral is suppressed on days that have not happened',
    find: "      var num = api.el('span', 'cwl-cellnum');\n      num.textContent = String(info.day);\n      cell.appendChild(num);",
    to:   "      var num = api.el('span', 'cwl-cellnum');\n      num.textContent = String(info.day);\n      if (key <= this._todayKey || !MODEL.meetsDow(wall, MODEL.dowOf(key))) cell.appendChild(num);",
  },
  {
    name: 'the free tier asserts a false zero again',
    find: "    _numeralPanel: function (count) {",
    to:   "    _numeralPanel: function (count) {\n      if (!this.premium) count = 0;",
  },
  {
    name: 'the ghost stamps come back',
    find: "        var cnt = api.el('span', 'cwl-wcount');",
    to:   "        for (var gg = 0; gg < 2; gg++) { var gh = api.el('span', 'cwl-stamp ghost'); gh.innerHTML = w3.svg; track.appendChild(gh); }\n        var cnt = api.el('span', 'cwl-wcount');",
  },
  {
    name: 'the axis key is a faded copy of the unit',
    find: "    + '.cwl-wkeyicon{width:30px;height:30px;flex:0 0 auto;}'",
    to:   "    + '.cwl-wkeyicon{width:30px;height:30px;flex:0 0 auto;opacity:.85;}'\n    + '.cwl-wkeyicon svg{opacity:.85;}'",
  },
  {
    name: 'the hundreds column is hidden until a hundred (the sliding columns)',
    find: "      for (var j = 0; j < cfg.length; j++) {\n        var col = api.el('div', 'cwl-jarcol');",
    to:   "      for (var j = 0; j < cfg.length; j++) {\n        if (cfg[j].cls === 'hundreds' && cfg[j].n === 0) continue;\n        var col = api.el('div', 'cwl-jarcol');",
  },
  {
    name: '--i is never set, so the rebundle gather is a no-op again',
    find: "          it.style.setProperty('--i', String(i));",
    to:   "          void i;",
  },
  {
    /* ⭐⭐ THIS POISON HAS TO BREAK BOTH LOCKS AT ONCE, AND THAT IS THE
       FINDING. My first two attempts broke one each and both reported
       SURVIVED — which reads exactly like a hole in the gate and was
       nothing of the kind. The print sheet is genuinely double-locked:
       the caller refuses to invoke the builder when unpaid, AND the
       builder refuses to fill the node. Breaking either one leaves the
       other holding, so a single-point mutation is INERT, not survived.
       An inert poison is a harness fault wearing a hole's clothes, and
       the only way to tell them apart is to go and read why.
       Breaking both proves the assertion can fail; needing to break both
       proves the lock is worth having. */
    name: 'BOTH print locks removed at once (a single lock is not enough)',
    find: "      if (this.premium) this._buildPrintSheet(); else this._sheetDoc.innerHTML = '';",
    to:   "      this._buildPrintSheet();",
    also: {
      find: "      sheet.innerHTML = '';\n      if (!this.premium) return;",
      to:   "      sheet.innerHTML = '';",
    },
  },
  {
    name: 'days become spans again — you cannot tab to a day',
    find: "      var cell = api.el('button', cls);\n      cell.type = 'button';\n      cell.setAttribute('role', 'gridcell');",
    to:   "      var cell = api.el(isToday ? 'button' : 'span', cls);\n      cell.type = 'button';\n      cell.setAttribute('role', 'gridcell');",
  },
  {
    name: 'the document keydown reaches through an open dialog',
    find: "      if (t && t.closest && (t.closest('.lcs-drawer') || t.closest('.cwl-sheetdlg') || t.closest('.cwl-panel'))) {",
    to:   "      if (false) {",
  },
  {
    name: 'the cell floor is abandoned and the board squashes below it',
    find: "        var MIN_ROW = 38;",
    to:   "        var MIN_ROW = 1;",
  },
];

let survived = 0, faults = 0;
console.log('poisoning ' + POISONS.length + ' browser-visible invariants\n');
for (const p of POISONS) {
  if (orig.indexOf(p.find) < 0) {
    console.log('  FAULT     needle missing :: ' + p.name);
    faults++; continue;                    /* a missing needle is a harness fault, not a skip */
  }
  let poisoned = orig.split(p.find).join(p.to);
  if (p.also) {
    if (orig.indexOf(p.also.find) < 0) {
      console.log('  FAULT     second needle missing :: ' + p.name);
      faults++; continue;
    }
    poisoned = poisoned.split(p.also.find).join(p.also.to);
  }
  fs.writeFileSync(TOOL, denorm(poisoned), 'utf8');
  let died = false;
  try { execFileSync(process.execPath, [DOD], { stdio: 'pipe', timeout: 300000 }); }
  catch (e) { died = true; }
  console.log((died ? '  killed    ' : '  SURVIVED  ') + p.name);
  if (!died) survived++;
}
fs.writeFileSync(TOOL, denorm(orig), 'utf8');

let control = true;
try { execFileSync(process.execPath, [DOD], { stdio: 'pipe', timeout: 300000 }); }
catch (e) { control = false; }
console.log('\ncontrol (restored file passes): ' + (control ? 'yes' : 'NO — the restore is broken'));
const ok = survived === 0 && faults === 0 && control;
console.log(ok ? 'RESULT: PASS — every poison killed, control clean'
               : 'RESULT: FAIL — survived ' + survived + ', harness faults ' + faults);
process.exit(ok ? 0 : 1);
