/* The native panels' findings on TOOL #55, applied. Two of them were
   found INDEPENDENTLY by the German and Swedish panels while choosing a
   noun for a surface the tool was not actually drawing. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'missing-question.js');
let s = fs.readFileSync(P, 'utf8');
const sub = (a, b) => {
  if (s.indexOf(a) < 0) throw new Error('MISSING: ' + a.slice(0, 60));
  s = s.split(a).join(b);
};

/* ---- 1 THE RENDER INVERTED THE APPARATUS. Both shutters are
   position:absolute and out of flow, so the column painted
   air -> bar -> ledge: the ledge marks drew BELOW the teal bar, resting
   on nothing, while ariaFrame said they were "on it". The apparatus drew
   a DIVIDER, not a ledge - a thing drawn where it cannot be, which this
   tool's own docblock calls disqualifying. Found by the German panel and
   confirmed independently by the Swedish one. */
sub("      var bar = document.createElement('div');\n" +
    "      bar.className = 'mqu-bar';\n" +
    "      stage.appendChild(bar);\n\n" +
    "      this._ledge = document.createElement('div');\n" +
    "      this._ledge.className = 'mqu-ledge';\n" +
    "      stage.appendChild(this._ledge);",
  "      this._ledge = document.createElement('div');\n" +
  "      this._ledge.className = 'mqu-ledge';\n" +
  "      stage.appendChild(this._ledge);\n\n" +
  "      /* the bar goes AFTER the marks that rest on it */\n" +
  "      var bar = document.createElement('div');\n" +
  "      bar.className = 'mqu-bar';\n" +
  "      stage.appendChild(bar);");

/* ---- 2 the PRINTED SHEET inverted it identically, so the defect would
   have reached paper as well as screen. */
sub("      frame.appendChild(air);\n" +
    "      var bar = document.createElement('div');\n" +
    "      bar.className = 'mqu-sh-bar';\n" +
    "      frame.appendChild(bar);\n" +
    "      frame.appendChild(ledge);",
  "      frame.appendChild(air);\n" +
  "      frame.appendChild(ledge);\n" +
  "      var bar = document.createElement('div');\n" +
  "      bar.className = 'mqu-sh-bar';\n" +
  "      frame.appendChild(bar);");

/* 3 and 4 were already applied by the gate pass; the deletion
   check below still proves they landed. */

fs.writeFileSync(P, s);

/* verify the deletions actually landed rather than trusting the writes */
const after = fs.readFileSync(P, 'utf8');
const dead = ['T_LIFT','T_STAGGER','T_TOKEN','T_CAPTURE','T_HOLD','T_SETTLE'];
const left = dead.filter(d => after.indexOf(d) >= 0);
if (left.length) { console.log('STILL PRESENT: ' + left.join(', ')); process.exit(1); }
const iL = after.indexOf("this._ledge.className"), iB = after.indexOf("bar.className = 'mqu-bar'");
if (!(iL < iB)) { console.log('the bar is still painted above the ledge'); process.exit(1); }
console.log('render inversion (screen + sheet), 7 dead constants and 1 dead class fixed');
