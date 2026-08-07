#!/usr/bin/env node
/* =====================================================================
   mutate-home-language-bridge.js — prove the Say It Board's gate can
   actually fail.
   ---------------------------------------------------------------------
   `verify-home-language-bridge.js` reports PASS. So did the one it
   replaced, on a board that could not say no and printed a blank page.
   A PASS is worth nothing until each invariant has been observed
   FAILING on a synthetic reintroduction of the defect it exists for.

   ⚠ EVERY MUTATION BELOW IS A DEFECT THAT ACTUALLY SHIPPED, or the
   precise inverse of one. That is deliberate: a mutation harness whose
   needles are invented tests the gate against a fiction.

   ⚠ A MISSING NEEDLE IS A FAULT, NOT A SKIP. When an anchor stops
   matching — because the tool moved on — the harness must say so and
   FAIL, or the run silently shrinks and still reports "every mutation
   killed". This already happened once on the icon gate in this build,
   and the FAULT report is the only reason I noticed.

   ⚠ A GATE THAT HANGS IS A GATE THAT SURVIVED. timeout: 30000.

   ⚠ AND THE CONTROL RUNS FIRST: an unmutated copy must PASS, or every
   "killed" below is just the gate failing to load a file.

   Usage: node scripts/mutate-home-language-bridge.js [--only=<substr>]
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC_FILE = path.join(ROOT, 'mini tools', 'home-language-bridge.js');
const GATE = path.join(__dirname, 'verify-home-language-bridge.js');

/* ⚠ NORMALISE LINE ENDINGS. `git checkout` runs a file through
   core.autocrlf, and a multi-line needle then silently matches nothing. */
const original = fs.readFileSync(SRC_FILE, 'utf8').split('\r\n').join('\n');

/* [name, find, replace, expected tag in the gate's output] */
const MUTATIONS = [
  /* ---- the fence ------------------------------------------------- */
  ['the tool reaches for the vocabulary index again',
   "var ICONS = {", "var PWW = 'pww-index'; var ICONS = {", /H1 reads pww-index/],

  ['a second fetch appears',
   "this._fetchEntitlement();", "fetch('/x'); this._fetchEntitlement();", /H1 expected exactly ONE fetch/],

  /* ---- the drawings ---------------------------------------------- */
  ['an unknown icon falls back to a CURATED picture — a wrong utterance',
   'ICONS[name] || ICONS.saybubble', 'ICONS[name] || ICONS.help', /H2 an unknown icon falls back/],

  ['a board phrase points at an icon nobody drew',
   "medicine: 'medicine',", "medicine: 'medicinne',", /H2 medicine: icon/],

  /* ---- ⭐ the defect the whole rebuild exists for ------------------ */
  ['the board loses "no" from the core — a refusal a child must hunt for',
   "{ id: 'no',      icon: 'no' },", "", /H4b "no" is not in the CORE/],

  ['the board loses "stop" entirely',
   "{ id: 'stop',    icon: 'stop' },", "", /H4b/],

  /* ---- the home language ----------------------------------------- */
  ['a flag creeps in beside a language name',
   "de: 'Deutsch',", "de: 'Deutsch \\u{1F1E9}\\u{1F1EA}',", /H5 a flag codepoint/],

  /* ⚠ ANCHORED WITH THE LINE BELOW IT. `if (card.home) {` occurs THREE
     times — the card, the big view and the print sheet — and an
     ambiguous anchor is a FAULT, not a coin toss about which one gets
     mutated. */
  ['the classroom line is emitted before the home line',
   "      if (card.home) {\n        var h = api.el('span', 'hlb-text');",
   "      if (false) {\n        var h = api.el('span', 'hlb-text');", /H6/],

  ['the aria-label names only the classroom line, erasing the home one',
   "b.setAttribute('aria-label', label + ", "b.setAttribute('aria-label', (text || '') + ", /H6 the aria-label does not carry both/],

  /* ---- ⚠ the record about a child --------------------------------- */
  ['a per-phrase counter is added "just for the teacher"',
   "api.track('print', { sheet: kind });", "api.track('print', { sheet: kind, id: card.id });", /H7b a track call carries a phrase identity/],

  /* ---- the voice -------------------------------------------------- */
  ['the voiceschanged listener is dropped — the guard cannot work on Chrome',
   "addEventListener('voiceschanged'", "removeEventListener('voiceschanged'", /H8 voiceschanged is never bound/],

  ['the provisional "not yet" answer is CACHED, which is the v2 defect',
   "        return true;                      /* provisional, NOT cached */",
   "        this._voiceState = true; return true;", /H8 the provisional answer is CACHED/],

  ['the `|| en` fallback returns, so English is spoken in a Finnish voice',
   'text = t[classroom] || null;', 'text = t[classroom] || t.en || null;', /H8b/],

  /* ---- entitlement ------------------------------------------------ */
  ['ENT_TRUST_DAYS goes back to being declared and never read',
   'if (age >= 0 && age <= self.ENT_TRUST_DAYS)', 'if (age >= 0 && age <= 14)', /H9 ENT_TRUST_DAYS is declared and never read/],

  ['the cached tier is trusted even when the server says free',
   '.catch(trustCache);', '.catch(function () {});', /H9 the cached trust is not limited to a NETWORK failure/],

  /* ---- ⭐ the muted tablet ---------------------------------------- */
  ['a tap stops changing the board, so a muted tablet does nothing at all',
   "el.classList.add('hlb-said');", "", /H10 a tap adds no visible state/],

  ['the tap no longer reaches the live region',
   'if (text) this.api.announce(text);', '', /H10 a tap does not reach the live region/],

  /* ---- ⭐ dignity -------------------------------------------------- */
  ['the wet-clothes card starts announcing itself to the room',
   'var SHOW_NOT_SAY = { dryclothes: 1, besick: 1, cantea: 1 };',
   'var SHOW_NOT_SAY = { besick: 1, cantea: 1 };', /H11 dryclothes is broadcast/],

  /* ---- the teacher's phrases -------------------------------------- */
  ['two refusals start sharing one message, which is false in one of them',
   "return { ok: false, why: 'needWords' };", "return { ok: false, why: 'needStarter' };", /H12/],

  ['the validator stops being total and throws on a malformed draft',
   'var d = draft && typeof draft === \'object\' ? draft : {};', 'var d = draft;', /H12 validate threw/],

  ['the free allowance quietly becomes unlimited',
   'return (((st && st.custom) || []).length) < this.FREE_CUSTOM;', 'return true;', /H12 the free allowance is not enforced/],

  ['a teacher phrase can be promoted into the always-visible core',
   "        if (c) { c.core = true; out.push(c); }", "        if (c) { c.core = true; c.custom = {}; out.push(c); }", /H13 a teacher phrase rendered as core/],

  /* ---- ⭐ print ---------------------------------------------------- */
  ['the printed card drops its picture, becoming a bilingual word list',
   "        cell.appendChild(iconSVG(card.icon, 'hlb-p-icon'));", "", /H19 the print sheet emits no icons/],

  ['the shell reset is dropped and A4 is clipped to one 720px column',
   "+   'html,body{height:auto !important;overflow:visible !important;background:#fff !important;}'",
   "+   'html,body{background:#fff !important;}'", /H19 the print block does not reset the shell height/],

  ['background colour is forced onto a monochrome school printer',
   "+   '@page{size:A4 portrait;margin:12mm;}'",
   "+   '@page{size:A4 portrait;margin:12mm;}' + '.hlb-sheet{print-color-adjust:exact;}'",
   /H19 forces background colour/],

  /* ---- ⭐ the layout that was dead in the embed -------------------- */
  ['the board goes back to media queries, dead inside the 704px embed',
   "+ '@container hlb (min-width:560px){'", "+ '@media (min-width:1560px){'", /H20/],

  /* ---- honesty ---------------------------------------------------- */
  /* ⚠ SELF-ANCHORED ON THE GENERATED FORM. The first needle carried the
     hand-written spacing and single quotes; `apply-…-locales.js` emits
     the whole strings block through JSON.stringify, so the needle went
     blind the moment the locales were applied. A needle that encodes
     the shape of what a GENERATOR writes has a half-life. */
  ['the privacy line goes back to claiming nothing is saved',
   'privacy:      {en:"Nothing about the child is measured',
   'privacy:      {en:"Nothing here is saved, counted or sent anywhere.",_x:"Nothing about the child is measured',
   /H16/]
];

function runGate(dir) {
  try {
    execFileSync(process.execPath, [GATE], {
      env: Object.assign({}, process.env, { HLB_TOOL_DIR: dir }),
      stdio: 'pipe', timeout: 30000, encoding: 'utf8'
    });
    return { pass: true, out: '' };
  } catch (e) {
    if (e.killed || e.signal) return { pass: false, timedOut: true, out: 'TIMED OUT' };
    return { pass: false, out: String(e.stdout || '') + String(e.stderr || '') };
  }
}

const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1];
const list = ONLY ? MUTATIONS.filter((m) => m[0].indexOf(ONLY) >= 0) : MUTATIONS;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sayit-mut-'));
const dir = path.join(tmp, 'mini tools');
fs.mkdirSync(dir, { recursive: true });
const target = path.join(dir, 'home-language-bridge.js');

process.stdout.write('control (unmutated) ... ');
fs.writeFileSync(target, original, 'utf8');
const ctl = runGate(dir);
if (!ctl.pass) {
  console.log('FAIL');
  console.error('\nFATAL the control does not pass — every result below would be meaningless.');
  console.error(ctl.out.split('\n').slice(-14).join('\n'));
  process.exit(1);
}
console.log('PASS\n');

let killed = 0;
const survived = [], faults = [];
list.forEach(([name, find, repl, expect]) => {
  const n = original.split(find).length - 1;
  if (n === 0) { faults.push(`${name}  [ANCHOR NOT FOUND]`); return; }
  if (n > 1) { faults.push(`${name}  [ANCHOR AMBIGUOUS x${n}]`); return; }
  const poisoned = original.split(find).join(
    repl.replace(/\\u\{([0-9A-F]+)\}/gi, (m, h) => String.fromCodePoint(parseInt(h, 16))));
  fs.writeFileSync(target, poisoned, 'utf8');
  const r = runGate(dir);
  if (r.pass) { survived.push(name); console.log(`  SURVIVED  ${name}`); }
  else if (r.timedOut) { survived.push(name + ' (TIMED OUT)'); console.log(`  SURVIVED  ${name}  [hung]`); }
  else if (!expect.test(r.out)) {
    /* ⚠ FAILED, BUT NOT FOR THE RIGHT REASON. A gate that trips on
       something unrelated has not shown that THIS invariant can fire. */
    survived.push(name + ' (wrong reason)');
    console.log(`  SURVIVED  ${name}\n            failed, but not with ${expect}`);
  } else { killed++; console.log(`  killed    ${name}`); }
});

fs.writeFileSync(target, original, 'utf8');
console.log('');
console.log(`${killed}/${list.length} mutations killed`);
if (faults.length) {
  console.log('\nFAULTS — a needle that no longer matches is a failure, not a skip:');
  faults.forEach((f) => console.log('  ' + f));
}
if (survived.length) {
  console.log('\nSURVIVED — these invariants have NOT been shown to be able to fail:');
  survived.forEach((s) => console.log('  ' + s));
}
try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) {}
process.exit((survived.length || faults.length) ? 1 : 0);
