/* =====================================================================
   mutate-unit-handle.js — does verify-unit-handle.js actually BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-unit-handle.js

   A green gate proves nothing until it has been shown to go red. Each
   mutation is a plausible defect — the kind a refactor introduces, not a
   random character swap. EVERY ONE MUST BE KILLED.

   ⚠ THREE RECORDED LESSONS ARE BUILT IN:
     1. THE HARNESS CARRIES EVERY DATA FILE THE GATE READS into the temp
        dir. verify- opens unit-handle-objects.json; without the copy,
        V13 errors for the wrong reason and every mutation "dies"
        without being tested.
     2. AN INERT MUTATION IS A BAD MUTATION. A needle that does not
        appear, or a patch that leaves the file byte-identical, is a
        HARNESS FAULT reported as a failure — never a silent skip.
     3. A GATE THAT HANGS COUNTS AS SURVIVED. Each run is capped.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'unit-handle.js'), 'utf8');
const CARRY = ['unit-handle-objects.json'];   /* lesson 1 */
const TIMEOUT = 60000;                         /* lesson 3 */

const M = [
  /* ---- V1 / V2 THE ARITHMETIC ---- */
  ['the count rounds up instead of down', 'return Math.floor(L / u);', 'return Math.ceil(L / u);'],
  ['the count is off by one', 'return Math.floor(L / u);', 'return Math.floor(L / u) + 1;'],
  ['the remainder forgets the count', 'return L - u * this.countOf(st, which);', 'return L - u;'],
  ['the remainder is swallowed', 'return L - u * this.countOf(st, which);', 'return 0;'],
  ['a whole unit is left sitting in the remainder', "if (rem > 0) out.push({ x: x0 + n * u, w: rem, part: true });", "out.push({ x: x0 + n * u, w: rem + u, part: true });"],
  ['the tiles walk by an accumulator and drift', 'for (i = 0; i < n; i++) out.push({ x: x0 + i * u, w: u, part: false });', 'var acc = x0; for (i = 0; i < n; i++) { out.push({ x: acc, w: u, part: false }); acc += u + 1; }'],
  ['the remainder tile is counted as whole', "if (rem > 0) out.push({ x: x0 + n * u, w: rem, part: true });", "if (rem > 0) out.push({ x: x0 + n * u, w: rem, part: false });"],
  ['the tape stops one tile short', 'for (i = 0; i < n; i++) out.push', 'for (i = 0; i < n - 1; i++) out.push'],

  /* ---- V3 MONOTONE ---- */
  ['a bigger unit gives a bigger count', 'return Math.floor(L / u);', 'return Math.floor(L / u) + Math.floor(u / 50);'],

  /* ---- V4 THE OBJECT CANNOT FLINCH ---- */
  ['the object shifts with the unit', 'placement: function (o, X0, L, baseY) {\n    if (!o) return null;', 'placement: function (o, X0, L, baseY) {\n    if (!o) return null;\n    X0 = X0 + (this.st ? this.st.uA : 0);'],
  ['the object is scaled by the unit', 'var k = L / t.h;', 'var k = L / t.h * (this.st ? this.st.uA / 160 : 1);'],
  ['the object hangs off the wrong edge', 'return { width: o.iw * k0, left: X0 - t.x * k0,', 'return { width: o.iw * k0, left: X0 + t.x * k0,'],

  /* ---- V5 THE TAPES ARE INDEPENDENT ---- */
  ['moving one tape drags the other with it', "if (which === 'b') s.uB = v; else s.uA = v;", "s.uA = v; s.uB = v;"],
  ['tape 2 secretly reads tape 1', "return which === 'b' ? s.uB : s.uA;", "return s.uA;"],

  /* ---- V6 / V7 THE REFUSALS ---- */
  ['the tool starts comparing the two counts', "    var over = this.remainderOf(s, 'a') > 0", "    if (this.countOf(s, 'a') === this.countOf(s, 'b')) hint.textContent = 'same';\n    var over = this.remainderOf(s, 'a') > 0"],
  ['a verdict word appears in the source', "  STORE_KEY: 'lcs:unit-handle:v1',", "  correct: 1,\n  STORE_KEY: 'lcs:unit-handle:v1',"],
  ['a unit gets a name', 'en: "Make it come out even"', 'en: "Make it come out even in cm"'],
  ['the bench writes text onto itself', "var zone = api.el('div', 'unh-objzone');", "box.textContent = 'x';\\n    var zone = api.el('div', 'unh-objzone');"],

  /* ---- V8 THE LOCALES ---- */
  ['a verdict word reaches a German string', 'de: "Anderer Gegenstand"', 'de: "Anderer Gegenstand richtig"'],
  ['an invisible character is pasted into a string', 'sv: "Samma enhet på båda"', 'sv: "Samma​ enhet på båda"'],

  /* ---- V9 DETERMINISM ---- */
  ['the tape becomes unseeded', 'for (i = 0; i < n; i++) out.push({ x: x0 + i * u, w: u, part: false });', 'for (i = 0; i < n; i++) out.push({ x: x0 + i * u + Math.random(), w: u, part: false });'],

  /* ---- V10 LABELS ARE TRUE ---- */
  ['"come out even" does not come out even', 'for (u = this.U_MIN; u <= this.uMax(L); u++) if (L % u === 0) out.push(u);', 'for (u = this.U_MIN; u <= this.uMax(L); u++) if (L % u === 1) out.push(u);'],
  ['"come out even" lands where it started', "for (i = 0; i < fits.length; i++) if (fits[i] > cur) return this.setUnit(st, which, fits[i]);", "return this.setUnit(st, which, cur);"],
  ['the "another object" button matches the units instead', "api.t('newObjBtn')", "api.t('matchBtn')"],

  /* ---- V11 PURITY + REFUSALS ---- */
  ['a unit below the legibility floor is accepted', 'if (v < this.U_MIN || v > this.uMax(L)) return null;', ''],
  ['a no-op unit change reports success', 'if (v === this.unitOf(s, which)) return null;', ''],
  ['the totality guard is dropped', "return (st && typeof st === 'object' &&", 'return (st &&\n      false &&'],
  ['changing the object leaves an illegal unit behind', 's.uA = Math.max(this.U_MIN, Math.min(hi, s.uA));\n    s.uB = Math.max(this.U_MIN, Math.min(hi, s.uB));', ''],
  ['the state grows an undeclared field', 's.obj = (s.obj + 1) % shelf.length;', 's.obj = (s.obj + 1) % shelf.length;\n    s.lastObj = 1;'],
  ['setUnit mutates its input', 'var s = this._clone(st);\n    var L = this.lengthOf(s);', 'var s = st;\n    var L = this.lengthOf(s);'],

  /* ---- V12 IDENTITY ---- */
  ['the tool declares tasks and becomes an activity', "  id: 'unit-handle',", "  id: 'unit-handle',\n  tasks: [],"],
  ['the tool starts POSTing somewhere', "fetch('/api/auth/me'", "fetch('/api/auth/me', { method: 'POST' }, "],
  ['the tool reaches into the class roster', "STORE_KEY: 'lcs:unit-handle:v1',", "STORE_KEY: 'lcs:my-classes',"],

  /* ---- V13 THE OBJECT SHELF ---- */
  ['the offline fallback degrades to nothing', 'version: 1, freeCount: 6, premiumCount: 12,\n    objects: [', 'version: 1, freeCount: 6, premiumCount: 12,\n    objects: [].concat([], ['],
  ['the fallback drifts from the free shelf', "{ k: 'crayon', theme: 'classroom', noun: 'crayon', w: 180,", "{ k: 'crayon', theme: 'classroom', noun: 'crayon', w: 200,"],
  ['entitlement stops filtering the shelf', 'for (i = 0; i < all.length; i++) if (i < this.FREE_OBJECTS || this.premium) out.push(all[i]);', 'for (i = 0; i < all.length; i++) out.push(all[i]);'],

  /* ---- V14 NO DEAD STRINGS ---- */
  ['the leftover hint becomes unreachable', 'else if (over) {', 'else if (over && false) {'],
  ['the opening hint becomes unreachable', 'if (s.uA === s.uB) hint.textContent', 'if (false) hint.textContent']
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'unh-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));

let killed = 0;
const survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'unit-handle.js'), mutated, 'utf8');
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-unit-handle.js')], {
      env: Object.assign({}, process.env, { UNH_TOOL_DIR: tmp }),
      timeout: TIMEOUT, stdio: 'pipe'
    });
  } catch (e) {
    died = true;
    why = (e.signal === 'SIGTERM' || /ETIMEDOUT/.test(String(e.code))) ? 'TIMEOUT' : 'gate';
  }
  if (died && why === 'TIMEOUT') survived.push(`${name} (the gate HUNG — that is a survival)`);
  else if (died) killed++;
  else survived.push(name);
}

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}

console.log(`mutations: ${M.length}   killed: ${killed}   survived: ${survived.length}   harness faults: ${harness.length}`);
if (harness.length) { console.error('\nHARNESS FAULTS (a mutation that was never actually tested):'); for (const h of harness) console.error('  ' + h); }
if (survived.length) { console.error('\nSURVIVED (verify-unit-handle.js does not see these):'); for (const s of survived) console.error('  ' + s); }
if (survived.length || harness.length) process.exit(1);
console.log('\nPASS — every mutation killed');
