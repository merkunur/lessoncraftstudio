/* =====================================================================
   mutate-number-hotel.js — poison TOOL #49's model, one edit at a
   time, and require `verify-number-hotel.js` to notice every one.
   Run:  node scripts/mutate-number-hotel.js

   ⚠ A CONTROL RUN COMES FIRST. A crashed gate is indistinguishable
   from a failing one, so an unmutated copy must PASS before any
   mutation's failure means anything.

   ⚠ A MISSING NEEDLE THROWS, IT DOES NOT SKIP. A dropped needle
   silently shrinks the total while the run still reports "every
   mutation killed" — #43 lost seven needles that way to a line-ending
   change alone.

   ⚠ \r\n IS COLLAPSED BEFORE SEARCHING. git checkout normalises line
   endings through core.autocrlf, and multi-line needles are silently
   sensitive to it.

   ⚠ EVERY DATA FILE THE GATE READS IS CARRIED INTO THE TMP DIR. This
   tool loads none — it is numerals and geometry — but the harness
   copies the whole directory anyway so that stays true if it changes.

   ⚠ timeout: 30000. A gate that HANGS is a gate that SURVIVED.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = path.join(__dirname, '..', 'mini tools', 'number-hotel.js');
const VERIFY = path.join(__dirname, 'verify-number-hotel.js');
const ORIGINAL = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

/* [label, find, replace] — each must change BEHAVIOUR, not comments */
const MUTATIONS = [
  /* --- the corridor IS the tens digit ---------------------------- */
  ['corridorOf is off by one', 'return Math.floor(this._st({ room: room }).room / ROOMS);',
    'return Math.floor(this._st({ room: room }).room / ROOMS) + 1;'],
  ['doorOf reads the tens digit', 'return this._st({ room: room }).room % ROOMS;',
    'return Math.floor(this._st({ room: room }).room / ROOMS);'],
  ['a corridor holds nine rooms', 'ROOMS = GEO.ROOMS', 'ROOMS = 9'],

  /* --- the wall, which is the whole tool ------------------------- */
  ['the corridor wraps silently on the right', 'return this.doorOf(this._st(st).room) < ROOMS - 1;', 'return true;'],
  ['the corridor wraps silently on the left', 'return this.doorOf(this._st(st).room) > 0;', 'return true;'],
  ['the walk crosses the wall anyway', 'if (!this.canWalkRight(st)) return null;', 'if (false) return null;'],

  /* --- the elevator must not move the ones digit ------------------ */
  ['the elevator moves the ones digit', "return { st: this._go(st, st.room + ROOMS), kind: 'ride' };",
    "return { st: this._go(st, st.room + ROOMS + 1), kind: 'ride' };"],
  ['the elevator skips a corridor', "return { st: this._go(st, st.room - ROOMS), kind: 'ride' };",
    "return { st: this._go(st, st.room - ROOMS * 2), kind: 'ride' };"],
  ['the elevator runs off the top', 'return this.corridorOf(this._st(st).room) < CORRIDORS - 1;', 'return true;'],
  ['the elevator runs off the bottom', 'return this.corridorOf(this._st(st).room) > 0;', 'return true;'],

  /* --- the stairs are the carry ---------------------------------- */
  ['the stairs exist mid-corridor', 'if (d === ROOMS - 1) return c < CORRIDORS - 1;', 'if (d >= 0) return true;'],
  ['the stairs behave like the elevator', 'var to = (d === ROOMS - 1) ? st.room + 1 : st.room - 1;',
    'var to = (d === ROOMS - 1) ? st.room + ROOMS : st.room - ROOMS;'],
  ['the stairs land on the wrong door', 'var to = (d === ROOMS - 1) ? st.room + 1 : st.room - 1;',
    'var to = (d === ROOMS - 1) ? st.room + 2 : st.room - 1;'],
  ['the stairs climb off the top', 'if (d === ROOMS - 1) return c < CORRIDORS - 1;', 'if (d === ROOMS - 1) return true;'],

  /* --- readability, the decision the tool is built around --------- */
  ['every door is readable from anywhere', 'return this.corridorOf(room) === this.corridorOf(st.room);', 'return true;'],
  ['no door is readable at all', 'return this.corridorOf(room) === this.corridorOf(st.room);', 'return false;'],
  ['readability keys off the ones digit', 'return this.corridorOf(room) === this.corridorOf(st.room);',
    'return this.doorOf(room) === this.doorOf(st.room);'],

  /* --- refusals mutate nothing ----------------------------------- */
  /* ⚠ Nudging inside a mutator is EQUIVALENT, not a survivor: `_st`
     returns a FRESH object every call, so a refused move structurally
     cannot reach the caller's state. Poison that guarantee instead —
     alias the input and the refusal becomes able to mutate. */
  ['_st aliases its input, so a refusal can mutate the caller',
    'return { room: room, visited: visited };', 'o.room = room; o.visited = visited; return o;'],
  ['walkLeft clamps instead of refusing', "if (!this.canWalkLeft(st)) return null;",
    "if (!this.canWalkLeft(st)) return { st: this._go(st, st.room), kind: 'walk' };"],
  ['stairs clamp instead of refusing', "if (!this.canStairs(st)) return null;",
    "if (!this.canStairs(st)) return { st: this._go(st, st.room), kind: 'stairs' };"],

  /* --- totality --------------------------------------------------- */
  ['_st has no fallback', "var o = (st && typeof st === 'object' && !Array.isArray(st)) ? st : {};", "var o = st;"],
  ['_st lets the room run past the top', 'if (room > MAX_ROOM) room = MAX_ROOM;', 'if (room > MAX_ROOM + 500) room = MAX_ROOM;'],
  ['_st lets the room go negative', 'if (room < 0) room = 0;', 'if (room < -500) room = 0;'],
  ['_st trusts a non-array visited', 'var visited = Array.isArray(o.visited) ? o.visited : [];', 'var visited = o.visited || [];'],

  /* --- geometry ---------------------------------------------------- */
  ['the hotel overflows the viewBox', 'SHAFT_X: 0, SHAFT_W: 110,', 'SHAFT_X: 0, SHAFT_W: 400,'],
  ['the numeral falls under the legibility floor', 'NUM_F: 0.60,', 'NUM_F: 0.30,'],
  ['corridor 0 is put at the top', 'return GEO.MARGIN + (CORRIDORS - 1 - corr) * GEO.CORR_H;',
    'return GEO.MARGIN + corr * GEO.CORR_H;'],
  ['a repeated mark drops under the minimum-feature law', 'KNOB_F: 0.055,', 'KNOB_F: 0.005,'],
  ['the end wall drops under the minimum-feature law', 'WALL_W: 0.16,', 'WALL_W: 0.01,'],

  /* --- dead constants (the art panel's finding) ------------------- */
  ['a motion constant stops being read', 'total: this._dur(GEO.T_WALK)', 'total: this._dur(220)'],

  /* --- strings ----------------------------------------------------- */
  ['an owned noun reaches the copy', "en: 'Take the stairs'", "en: 'Take the stairs to the next floor'"],
  ['an operator glyph reaches the copy', "en: 'Room {n}.'", "en: 'Room {n} = here.'"],
  ['a string is emptied', "en: 'Take the stairs'", "en: ''"],
  ['the refusal scolds', "saidWallEnd:  { en: 'The corridor ends here.", "saidWallEnd:  { en: 'Wrong = the corridor ends here."]
];

function run(dir) {
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { NUMBER_HOTEL_TOOL_DIR: dir }),
      stdio: 'pipe', timeout: 30000
    });
    return 'PASS';
  } catch (e) {
    if (e.killed || /ETIMEDOUT/.test(String(e.code))) return 'TIMEOUT';
    return 'FAIL';
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ccp-mut-'));
/* carry the whole directory, so a future data file travels too */
const srcDir = path.dirname(SRC);
for (const f of fs.readdirSync(srcDir)) {
  const fp = path.join(srcDir, f);
  if (fs.statSync(fp).isFile()) fs.copyFileSync(fp, path.join(tmp, f));
}
const target = path.join(tmp, 'number-hotel.js');

console.log('CONTROL: an unmutated copy must PASS');
fs.writeFileSync(target, ORIGINAL);
const control = run(tmp);
console.log('  control = ' + control);
if (control !== 'PASS') {
  console.log('\n*** THE HARNESS IS BROKEN. Every "kill" below would be meaningless.');
  process.exit(1);
}

let killed = 0, survived = 0, faults = 0;
console.log('\n' + MUTATIONS.length + ' mutations:');
for (const [label, find, repl] of MUTATIONS) {
  const hits = ORIGINAL.split(find).length - 1;
  if (hits === 0) {
    faults++;
    console.log('  ⚠ FAULT  ' + label + ' — needle not found, the mutation never ran');
    continue;
  }
  fs.writeFileSync(target, ORIGINAL.replace(find, repl));
  const r = run(tmp);
  if (r === 'FAIL') { killed++; console.log('  ✓ killed  ' + label); }
  else { survived++; console.log('  ✗ ' + r + '  ' + label); }
}
fs.writeFileSync(target, ORIGINAL);

console.log('\n' + '='.repeat(64));
console.log(`killed ${killed}/${MUTATIONS.length}, survived ${survived}, harness faults ${faults}`);
console.log('='.repeat(64));
try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) { /* leave it */ }
process.exit(survived || faults ? 1 : 0);
