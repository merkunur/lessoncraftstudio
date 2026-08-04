/* =====================================================================
   mutate-fraction-kitchen.js — does verify-fraction-kitchen.js BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-fraction-kitchen.js

   A green gate proves nothing until it has been shown to go red. Every
   mutation must be KILLED.

   ⚠ THE RECORDED LESSONS, BUILT IN:
     1. CARRY every data file the gate reads into the temp dir. This tool
        has none — geometry, strings and art all live in the one file —
        so CARRY is empty BY MEASUREMENT, not by omission.
     2. AN INERT MUTATION IS A HARNESS FAULT, never a silent skip: if the
        needle text already equals the replacement, throw.
     3. A GATE THAT HANGS COUNTS AS SURVIVED — hence the cap, and hence
        verify- doing zero browser work.
     4. NEEDLES SELF-ANCHOR on the LIVE file. The strings block is
        rewritten wholesale by the locale applier, so a needle carrying a
        literal English string goes blind the moment it is re-padded.
     5. A NEEDLE THAT MISSES IS A HARNESS FAULT TOO — throw, never skip.
        Dropping one shrinks the total while the run still says "every
        mutation killed".
     6. LINE ENDINGS. `git checkout` restores through core.autocrlf and
        multi-line needles go blind when it does. Collapse \r\n here, in
        the harness, not in the working copy.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'fraction-kitchen.js'), 'utf8').replace(/\r\n/g, '\n');
const CARRY = [];          /* measured: verify- reads nothing but the tool */
const TIMEOUT = 30000;

/* ⭐ SELF-ANCHORING STRING NEEDLE. Reads the CURRENT English value of
   `key` out of the live strings block, so it survives a re-pad. THROWS
   rather than returning null — a needle that cannot find its key is a
   fault to surface at load. ⚠ This block is SINGLE-quoted, unlike the
   double-quoted blocks in the newer tools. */
function enNeedle(key, replacement, name) {
  const re = new RegExp(key + ":\\s*\\{\\s*en:\\s*'((?:[^'\\\\]|\\\\.)*)'");
  const m = re.exec(SRC);
  if (!m) throw new Error(`enNeedle: no en value for "${key}" in the live strings block`);
  const from = m[0];
  const to = from.slice(0, from.length - m[1].length - 1) + replacement + "'";
  if (to === from) throw new Error(`enNeedle: "${key}" already reads "${replacement}" — the mutation would be INERT`);
  return [name, from, to];
}

const M = [
  /* ---- geometry: killed by §1's point-sampled equal-area proof ------ */
  ['_diam returns a radius, so "halves" is one piece',
    'return { x1: G.CX + G.R * Math.cos(a), y1: G.CY - G.R * Math.sin(a),\n             x2: G.CX - G.R * Math.cos(a), y2: G.CY + G.R * Math.sin(a) };',
    'return { x1: G.CX, y1: G.CY,\n             x2: G.CX - G.R * Math.cos(a), y2: G.CY + G.R * Math.sin(a) };'],
  ['pizza thirds are 90° apart, not 120°',
    'if (n === 3) return { correct: [this._radiusLn(90), this._radiusLn(210), this._radiusLn(330)]',
    'if (n === 3) return { correct: [this._radiusLn(90), this._radiusLn(200), this._radiusLn(330)]'],
  ['pizza sixths use three RADII where three diameters are needed',
    'return { correct: [this._diam(90), this._diam(30), this._diam(150)], distractors: [this._diam(60)] };',
    'return { correct: [this._radiusLn(90), this._radiusLn(30), this._radiusLn(150)], distractors: [this._diam(60)] };'],
  ['the bar is cut off its own moulded lattice',
    'if (n === 3) return { correct: [this._vLine(36), this._vLine(64)], distractors: [this._vLine(22)] };',
    'if (n === 3) return { correct: [this._vLine(33), this._vLine(67)], distractors: [this._vLine(22)] };'],
  ['cake thirds are halves',
    'var h3a = G.RY + (G.RB - G.RY) / 3, h3b = G.RY + 2 * (G.RB - G.RY) / 3;',
    'var h3a = G.RY + (G.RB - G.RY) / 2, h3b = G.RY + 2 * (G.RB - G.RY) / 3;'],
  /* ⚠ NOT a mutation of _chordV's clipping. I wrote that one first and it
     SURVIVED — correctly. The parts of a cut line lying outside the circle
     cannot change which side a point falls on, so a full-height line at
     x=34 splits the pizza identically to the chord. It was inert-in-effect,
     not a gate hole. Measure before accusing the gate. Moving the chord is
     a real defect: it changes the split. */
  ['the pizza-halves decoy moves onto the diameter, so the beat is a lie',
    'if (n === 2) return { correct: [this._diam(90)], distractors: [this._chordV(34)] };',
    'if (n === 2) return { correct: [this._diam(90)], distractors: [this._chordV(50)] };'],
  ['the pizza-fourths decoy becomes a real diameter, so the beat is a lie',
    'if (n === 4) return { correct: [this._diam(90), this._diam(0)], distractors: [this._chordV(30)] };',
    'if (n === 4) return { correct: [this._diam(90), this._diam(0)], distractors: [this._diam(45)] };'],
  ['pieces() disagrees with the cut count',
    'var angles = this.PIZZA_ANGLES[n].slice().sort(function (a, b) { return a - b; });',
    'var angles = this.PIZZA_ANGLES[n].slice(1).sort(function (a, b) { return a - b; });'],

  /* ---- the freehand model: killed by §9's closed-form oracle -------- */
  ['the area split uses a dot product, so it splits along the wrong axis',
    'if (dx * (y - a.y) - dy * (x - a.x) >= 0) lo++; else hi++;',
    'if (dx * (x - a.x) + dy * (y - a.y) >= 0) lo++; else hi++;'],
  ['the free-cut floor drops, so travel between two guides cuts the food',
    '_cutFloor: function (food) { return 1 / (Math.max.apply(null, this.MENU[food]) + 1); },',
    '_cutFloor: function (food) { return 0.01; },'],
  ['the food mask leaks, so a diameter stops measuring equal',
    "if (this.food === 'pizza') return Math.hypot(p.x - G.CX, p.y - G.CY) <= G.R;",
    "if (this.food === 'pizza') return Math.hypot(p.x - G.CX, p.y - G.CY) <= G.R && p.x < 62;"],
  ['the rect mask forgets its top edge',
    'return p.x >= G.RX && p.x <= G.RR && p.y >= G.RY && p.y <= G.RB;',
    'return p.x >= G.RX && p.x <= G.RR && p.y <= G.RB;'],

  /* ---- the art locks: killed by §2 clearance and §8c ---------------- */
  ['a topping moves onto a candidate cut line',
    "{ t: 'mushroom', x: 61.00, y: 69.05, r: 5.0 }",
    "{ t: 'mushroom', x: 50.00, y: 69.05, r: 5.0 }"],
  ['the injected body grows an id, so eight copies share it',
    "s += '<circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"#C1813F\"/>';",
    "s += '<circle id=\"crust\" cx=\"50\" cy=\"50\" r=\"40\" fill=\"#C1813F\"/>';"],
  ['alarm-red enters the food, and the no-shame lock with it',
    "s += '<path d=\"' + this._lobed(34.00, 0.90, 12) + '\" fill=\"#CB5F3C\"/>';",
    "s += '<path d=\"' + this._lobed(34.00, 0.90, 12) + '\" fill=\"#D2553A\"/>';"],

  /* ---- the drag contract: killed by §8b ---------------------------- */
  ['the drag primitive stops suppressing the browser pan gesture',
    '      if (opts.enabled && !opts.enabled()) return;\n      e.preventDefault();',
    '      if (opts.enabled && !opts.enabled()) return;'],
  ['pointermove is rebound to the element a repaint will replace',
    "      window.addEventListener('pointermove', move, { passive: false });",
    "      btn.addEventListener('pointermove', move, { passive: false });"],
  ['pointerup is rebound to the element',
    "      window.addEventListener('pointerup', up);",
    "      btn.addEventListener('pointerup', up);"],
  ['touch-action goes back on the SVG <g>, where it is inert',
    "  + '.frk-piece{transform:translate(0,0);",
    "  + '.frk-piece{touch-action:none;transform:translate(0,0);"],
  ['a surface bypasses the shared drag contract',
    '    this._grab(chip, {',
    '    this._grabX(chip, {'],
  ['a method is called and never defined — the shipped #16 defect, re-armed',
    'self._dropOnPlate(i, e.clientX, e.clientY, d.targets);',
    'self._dropOnTray(i, e.clientX, e.clientY, d.targets);'],

  /* ---- the square invariant the hit overlay rests on: §8d ---------- */
  ['the foodbox goes oblong and every hit target skews with it',
    "+ '.frk-foodbox{position:relative;width:var(--frk-fb);height:var(--frk-fb);}'",
    "+ '.frk-foodbox{position:relative;width:var(--frk-fb);height:calc(var(--frk-fb) * 0.8);}'"],

  /* ---- equivalence: killed by §5 + §5b ----------------------------- */
  ['an equivalence task stops cross-multiplying',
    "{ id: 'eq-b26', food: 'bar', big: 2, small: 6, count: 3 }",
    "{ id: 'eq-b26', food: 'bar', big: 2, small: 6, count: 2 }"],
  ['the tray slots stop tiling the reference piece',
    'return (a > A1 && a < A2) ? i : -1;',
    'return (a > A1) ? i : -1;'],

  /* ---- stories + menu: §6 + §7 ------------------------------------- */
  ['a discussion story stops being flagged as one',
    "{ id:'st-left3', food:'pizza', n:4, friends:3, discussion:true,",
    "{ id:'st-left3', food:'pizza', n:4, friends:3, discussion:false,"],
  ['the free tier quietly widens past the menu',
    'FREE_TASKS: { pizza: [2, 4], cake: [2, 4] },',
    'FREE_TASKS: { pizza: [2, 4, 5], cake: [2, 4] },'],

  /* ---- the FRAC tables: §3 ----------------------------------------- */
  ['two denominators share a plural, so thirds and sixths sound alike',
    "p:{en:'sixths',de:'Sechstel'",
    "p:{en:'thirds',de:'Sechstel'"],

  /* ---- the string locks: §4, all self-anchored --------------------- */
  enNeedle('wobbleLine', 'That is wrong — try again.', 'a verdict enters the kind line'),
  enNeedle('cutDone', 'You made 1/2 of it!', 'fraction notation enters a child-facing string'),
  enNeedle('equivPrompt', 'A Common Core aligned task.', 'Common Core is named in the tool strings'),
  enNeedle('shareDone', '', 'a string is emptied in English'),
  /* ⚠ SELF-ANCHORED. The literal form of this needle died the moment
     apply-…-locales re-padded the whole block — exactly the failure the
     header warns about, on the very run that introduced the applier. */
  enNeedle('pieceName', 'one {fs}', 'pieceName gets its doubled article back — the shipped EN defect')
];

/* ---- run ---------------------------------------------------------- */
function runVerify(source) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'frk-mut-'));
  fs.writeFileSync(path.join(dir, 'fraction-kitchen.js'), source, 'utf8');
  for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(dir, f));
  let code = 0, out = '';
  try {
    out = execFileSync(process.execPath, [path.join(__dirname, 'verify-fraction-kitchen.js')],
      { env: Object.assign({}, process.env, { FRK_TOOL_DIR: dir }), encoding: 'utf8', timeout: TIMEOUT });
  } catch (e) {
    /* ⚠ a TIMEOUT is not a kill. A gate that hangs reports nothing, and
       counting it as a kill is how a hole hides. */
    if (e.killed || e.signal) return { killed: false, hung: true };
    code = e.status || 1;
    out = (e.stdout || '') + (e.stderr || '');
  }
  fs.rmSync(dir, { recursive: true, force: true });
  return { killed: code !== 0, hung: false, out };
}

console.log(`mutate-fraction-kitchen — ${M.length} mutations\n`);
let killed = 0, survived = 0, faults = 0;
const bad = [];

/* sanity: the UNMUTATED file must pass, or every "kill" below is noise */
const base = runVerify(SRC);
if (base.killed || base.hung) {
  console.error('HARNESS FAULT: the unmutated tool does not pass verify — every kill below would be meaningless.');
  process.exit(1);
}
console.log('  baseline: the unmutated tool passes\n');

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) < 0) {
    faults++; bad.push(name);
    console.log(`  FAULT  ${name}\n         needle not found: ${JSON.stringify(String(from).slice(0, 76))}`);
    continue;
  }
  if (from === to) { faults++; bad.push(name); console.log(`  FAULT  ${name} — INERT (needle === replacement)`); continue; }
  const r = runVerify(SRC.replace(from, to));
  if (r.hung) { survived++; bad.push(name); console.log(`  HUNG   ${name} — scored SURVIVED`); }
  else if (r.killed) { killed++; console.log(`  killed ${name}`); }
  else { survived++; bad.push(name); console.log(`  SURVIVED  ${name}`); }
}

console.log(`\n${killed} killed, ${survived} survived, ${faults} harness faults`);
if (survived || faults) { console.log('FAILED: ' + bad.join(' · ')); process.exit(1); }
console.log('mutate-fraction-kitchen: every mutation killed');
