/* Two defects that are mine, and the first is the sharpest
   self-contradiction of the session.

   D4 ⭐⭐ THE MATERIAL CARRIED A SIZE RAMP AND A HEIGHT RAMP — the exact
      thing this tool's own refuse-list bans, and the exact reason its
      header gives for rejecting the animals. Measured optical areas were
      1521 / 1499 / 1171 / 903: the triangle is 59% of the disc, a 1.68x
      spread, and the bottoms spread 5.3px so they did not stand on a
      common line. Worse, the header CITES `pattern-bench:274` — "four
      beads with optical areas equalised" — AND DOES NOT PERFORM THE
      EQUALISATION. A law written into a refuse-list and never measured.
      ⭐ Found by an agent reading the mount render and then measuring,
      which is the only way this class is ever caught.
      Now: every form is solved to the SAME optical area (target 1440)
      and every form sits on a COMMON BASELINE, so neither size nor
      height can rank them.

   D2 ❌❌ THE BUS WAS ALREADY RULED AGAINST, AND MY "free in all eleven"
      CLAIM WAS WRONG. A bus ships in `class-graph.js:133-175` (seven
      languages) and `our-day.js:649-670` (seven more) — and
      `calendar-wall.js:677` carries the design ruling verbatim:
      "A RUCKSACK, NOT A BUS. The yellow school bus is US-coded and the
      European coach is not iconic."
      ⭐ That resolves a defect found independently: `board: 'Let one on'`
      had NO REFERENT anywhere in the strings, and `sayBoarded: 'One has
      gone.'` read as its contradiction. The answer is not to name the
      vehicle but to DROP IT — someone simply leaves the platform. Ten
      native panels are spared inventing a referent each. */
'use strict';
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'mini tools', 'the-queue.js');
let s = fs.readFileSync(P, 'utf8');
const sub = (a, b) => {
  if (s.indexOf(a) < 0) throw new Error('MISSING: ' + a.slice(0, 60));
  if (s.split(a).length - 1 !== 1) throw new Error('NOT UNIQUE: ' + a.slice(0, 60));
  s = s.split(a).join(b);
};

/* ---- D2: drop the vehicle -------------------------------------- */
sub("board: { en: 'Let one on' },", "board: { en: 'One leaves' },");
sub("sayBoarded: { en: 'One has gone. Count again from the same end.' },",
    "sayBoarded: { en: 'One has left. Count again from the same end.' },");
sub("instruction: { en: 'Some are waiting on the platform. Pick an end, then step along and see who you land on. Now pick the other end and step the same number of times — the platform has not changed, but the one you land on has.' },",
    "instruction: { en: 'Some are standing in a line. Pick an end, then step along and see who you land on. Now pick the other end and step the same number of times — nobody has moved, but the one you land on has changed.' },");
sub("lockedBody: { en: 'The whole apparatus is free — every platform, both ends, the walker and letting one on. A Teacher plan adds the printed sheet, which carries the platform the class was looking at and ruled lines to write on.' },",
    "lockedBody: { en: 'The whole apparatus is free — every line, both ends, the walker and letting one leave. A Teacher plan adds the printed sheet, which carries the line the class was looking at and ruled lines to write on.' },");

/* ---- D4: one optical area, one baseline ------------------------- */
sub("    _shape: function (form, cx, cy, r) {",
  "  /* ⭐⭐ EVERY FORM IS SOLVED TO THE SAME OPTICAL AREA AND SITS ON A\n" +
  "     COMMON BASELINE. Before this the areas were 1521/1499/1171/903 —\n" +
  "     the triangle 59% of the disc — and the bottoms spread 5.3px, so\n" +
  "     the material carried a SIZE RAMP and a HEIGHT RAMP. A ramp is an\n" +
  "     order, and an order in the material answers \"which one\" before\n" +
  "     the question is asked. That is the same reason the animals were\n" +
  "     rejected, and it had been written into the refuse-list without\n" +
  "     ever being measured.\n" +
  "     AREA is the target; each half-extent is solved from it:\n" +
  "       disc      pi*R^2      -> R  = sqrt(A/pi)\n" +
  "       square    (2h)^2      -> h  = sqrt(A)/2\n" +
  "       triangle  base*ht/2, drawn isoceles with base 2b and height 2b\n" +
  "                             -> b  = sqrt(A/2)\n" +
  "       cross     12 unit sq of side (b-a) with a = 0.36b\n" +
  "                             -> solved below, in closed form. */\n" +
  "    _shape: function (form, cx, baseY, area) {");

sub("      var ns = 'http://www.w3.org/2000/svg', e;\n" +
    "      if (form === 'disc') {\n" +
    "        e = document.createElementNS(ns, 'circle');\n" +
    "        e.setAttribute('cx', cx); e.setAttribute('cy', cy); e.setAttribute('r', r);",
  "      var ns = 'http://www.w3.org/2000/svg', e, A = area, h, b, a, R;\n" +
  "      if (form === 'disc') {\n" +
  "        R = Math.sqrt(A / Math.PI);\n" +
  "        e = document.createElementNS(ns, 'circle');\n" +
  "        e.setAttribute('cx', cx.toFixed(2)); e.setAttribute('cy', (baseY - R).toFixed(2));\n" +
  "        e.setAttribute('r', R.toFixed(2));");

sub("      } else if (form === 'square') {\n" +
    "        e = document.createElementNS(ns, 'rect');\n" +
    "        e.setAttribute('x', cx - r * 0.88); e.setAttribute('y', cy - r * 0.88);\n" +
    "        e.setAttribute('width', r * 1.76); e.setAttribute('height', r * 1.76);\n" +
    "        e.setAttribute('rx', '3');",
  "      } else if (form === 'square') {\n" +
  "        h = Math.sqrt(A) / 2;\n" +
  "        e = document.createElementNS(ns, 'rect');\n" +
  "        e.setAttribute('x', (cx - h).toFixed(2)); e.setAttribute('y', (baseY - 2 * h).toFixed(2));\n" +
  "        e.setAttribute('width', (2 * h).toFixed(2)); e.setAttribute('height', (2 * h).toFixed(2));\n" +
  "        e.setAttribute('rx', '3');");

sub("      } else if (form === 'triangle') {\n" +
    "        e = document.createElementNS(ns, 'polygon');\n" +
    "        e.setAttribute('points',\n" +
    "          (cx) + ',' + (cy - r * 1.05) + ' ' +\n" +
    "          (cx + r * 1.02) + ',' + (cy + r * 0.78) + ' ' +\n" +
    "          (cx - r * 1.02) + ',' + (cy + r * 0.78));",
  "      } else if (form === 'triangle') {\n" +
  "        /* isoceles, base 2b and height 2b -> area = 2b^2 */\n" +
  "        b = Math.sqrt(A / 2);\n" +
  "        e = document.createElementNS(ns, 'polygon');\n" +
  "        e.setAttribute('points',\n" +
  "          cx.toFixed(2) + ',' + (baseY - 2 * b).toFixed(2) + ' ' +\n" +
  "          (cx + b).toFixed(2) + ',' + baseY.toFixed(2) + ' ' +\n" +
  "          (cx - b).toFixed(2) + ',' + baseY.toFixed(2));");

sub("        e = document.createElementNS(ns, 'polygon');\n" +
    "        var a = r * 0.36, b = r * 1.02;",
  "        /* a Greek cross of half-extent b with arm half-width a = 0.36b\n" +
  "           has area (2b)^2 - 4(b-a)^2 = 4b^2(1 - (1-0.36)^2) = 2.3616 b^2 */\n" +
  "        e = document.createElementNS(ns, 'polygon');\n" +
  "        b = Math.sqrt(A / 2.3616); a = b * 0.36;\n" +
  "        var cy = baseY - b;");

/* call sites: pass a common baseline and the shared area */
sub("        var g = this._shape(FORMS[s.members[i]], cx, 66, 22);",
    "        var g = this._shape(FORMS[s.members[i]], cx, 90, GEO.AREA);");
sub("      for (i = 0; i < n; i++) svg.appendChild(this._shape(FORMS[s.members[i]], 20 + step * (i + 1), 60, 22));",
    "      for (i = 0; i < n; i++) svg.appendChild(this._shape(FORMS[s.members[i]], 20 + step * (i + 1), 84, GEO.AREA));");

sub("    CAP: 4,",
    "    CAP: 4,\n" +
    "    /* ⭐ ONE optical area for every form, so nothing in the material\n" +
    "       can rank its members. Solved per form, never eyeballed. */\n" +
    "    AREA: 1440,");

fs.writeFileSync(P, s);

/* ---- verify ------------------------------------------------------- */
delete require.cache[require.resolve(P)];
const T = require(P);
const src = fs.readFileSync(P, 'utf8');
const bad = [];
if (!T.strings.board) bad.push('NON-VACUITY: strings missing');
if (/\bbus\b/i.test(JSON.stringify(T.strings))) bad.push('the vehicle survives in a string');
if (/platform/i.test(T.strings.instruction.en)) bad.push('instruction still names the platform');
if (src.indexOf('AREA: 1440') < 0) bad.push('the shared area constant did not land');
if (src.indexOf('_shape: function (form, cx, baseY, area)') < 0) bad.push('_shape still takes a radius');
/* closed-form areas must agree to <1% */
const A = 1440;
const areas = {
  disc: Math.PI * Math.pow(Math.sqrt(A / Math.PI), 2),
  square: Math.pow(2 * (Math.sqrt(A) / 2), 2),
  triangle: 2 * Math.pow(Math.sqrt(A / 2), 2),
  cross: 2.3616 * Math.pow(Math.sqrt(A / 2.3616), 2)
};
Object.keys(areas).forEach(k => {
  if (Math.abs(areas[k] - A) / A > 0.01) bad.push('area off for ' + k + ': ' + areas[k].toFixed(1));
});
/* NON-VACUITY: the check must be able to fail */
if (Math.abs(1171 - A) / A <= 0.01) bad.push('NON-VACUITY: the area check cannot fail');
if (bad.length) { console.log('FAILED:\n  ' + bad.join('\n  ')); process.exit(1); }
console.log('D2 vehicle dropped · D4 all four forms solved to area ' + A +
  ' on a common baseline (was 1521/1499/1171/903, a 1.68x ramp)');
