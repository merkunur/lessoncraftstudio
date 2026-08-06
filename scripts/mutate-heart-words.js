#!/usr/bin/env node
/* =====================================================================
   mutate-heart-words.js — the harness that proves the Heart Words gates
   have no holes.

   Each needle is a deliberate defect. It must be KILLED by
   verify-heart-words.js, or — for anything the model gate structurally
   cannot see (geometry, containment, the DOM) — by local-test-heart-words.js,
   which only the verify-survivors pay the browser cost for.

   THREE BUCKETS, and two of them are failures:
     killed   — a gate caught it. Good.
     survived — no gate caught it. THE GATE HAS A HOLE.
     fault    — the needle never applied (anchor missing, or the patch was
                a no-op). That is a harness defect, not a pass: a dropped
                needle silently shrinks the denominator while the run still
                reports "every mutation killed".

   ⚠ A HANG COUNTS AS A SURVIVAL. A gate that never terminates has not
   caught anything, and scoring a timeout as a kill is how an unbounded
   loop in a gate goes unnoticed.

   ⚠ CRLF. `git checkout` normalises line endings through core.autocrlf,
   and a multi-line needle is silently sensitive to it — seven needles
   went blind that way on a sibling tool. Everything is read through lf().

   Usage: node scripts/mutate-heart-words.js [--only=<substring>]
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const TOOLS = path.join(__dirname, '..', 'mini tools');
const TOOL = path.join(TOOLS, 'heart-words.js');
const GATE = path.join(__dirname, 'verify-heart-words.js');
const BROWSER_GATE = path.join(__dirname, 'local-test-heart-words.js');
const CARRY = ['heart-words-en.json', 'heart-words.html'];
const TIMEOUT = 60000;
const BROWSER_TIMEOUT = 300000;

const lf = (t) => t.replace(/\r\n/g, '\n');
const ORIGINAL = lf(fs.readFileSync(TOOL, 'utf8'));
const onlyArg = process.argv.find(a => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.split('=')[1] : null;

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no'];

/* ---------------------------------------------------------------------
   Self-anchoring locale needles. The strings block is rewritten wholesale
   by the native-panel apply step, so a needle carrying the literal English
   text has a half-life measured in one commit. These read the CURRENT
   value off the live file and mutate that.
   --------------------------------------------------------------------- */
/* ⚠ `:\s*'` — the strings block is written `{en:'Heart Words',de:'…'}` with
   NO space after the locale colon. A regex demanding one anchors nothing,
   and every locale needle then reports as a harness fault rather than a
   pass, which is the only reason this was visible at all. */
const strAnchor = (key, loc) => {
  const re = new RegExp('(^\\s*' + key + ":\\s*\\{[^\\n]*?\\b" + loc + ":\\s*')((?:[^'\\\\]|\\\\.)*)'", 'm');
  const m = re.exec(ORIGINAL);
  return m ? { full: m[0], head: m[1], value: m[2] } : null;
};
const strMut = (label, key, loc, replacement) => {
  const a = strAnchor(key, loc);
  /* THROW, never skip — a needle that cannot anchor must be visible */
  if (!a) return [label, ' NO-ANCHOR ' + key + '.' + loc, ''];
  return [label, a.full, a.head + replacement + "'"];
};

const M = [];

/* ---- THE STRUCTURAL PREMIUM GATE (T9/T10) ---- */
M.push(['wordsForShelf hands out a LOCKED shelf',
  'if (!this._shelfUnlocked(shelf)) return [];',
  'if (false) return [];']);
M.push(['_shelfUnlocked treats every shelf as free',
  "return !!(shelf.free || this.premium);",
  'return true;']);
M.push(['resolveDeepLink resolves a locked shelf without premium',
  'if (!shelf.free && !premium) return null;',
  'if (false) return null;']);

/* ---- THE HEART MODEL (D8/T11) ---- */
M.push(['isHeart answers true for every box',
  'for (var k = 0; k < word.heart.length; k++) if (word.heart[k] === i) return true;',
  'return true;']);
M.push(['heartCap allows a whole word to be hearted',
  'heartCap: function (n) { return Math.min(2, Math.floor(n / 2)); },',
  'heartCap: function (n) { return n; },']);

/* ---- REASSEMBLY + THE TAIL (D5) ---- */
M.push(['reassemble drops the silent tail',
  "return out + tail + (word.silentTail || '');",
  'return out + tail;']);
M.push(['tailText drops the split-digraph tail',
  "if (m) tail += m[2];",
  'if (m) tail += "";']);
M.push(['boxFace shows the WHOLE split token, tail and all',
  'return m ? m[1] : box;',
  'return box;']);

/* ---- THE SEGMENTER: it must REFUSE, never truncate ---- */
M.push(['⭐ segment TRUNCATES past the box cap instead of refusing',
  'if (out.length > this.MAX_BOXES) return null;',
  'while (out.length > this.MAX_BOXES) { out[out.length - 2] += out[out.length - 1]; out.pop(); }']);
M.push(['segment ignores multi-letter graphemes',
  'if (s.substr(i, inv[k].length) === inv[k]) { hit = inv[k]; break; }',
  'if (false) { hit = inv[k]; break; }']);
M.push(['MAX_BOXES raised past what the row can hold',
  '  MAX_BOXES: 6,', '  MAX_BOXES: 12,']);

/* ---- THE SEAM EDITOR round-trip ---- */
M.push(['cutsToBoxes loses the last letter',
  "if (cuts[i + 1] || i === letters.length - 1) { out.push(cur); cur = ''; }",
  "if (cuts[i + 1]) { out.push(cur); cur = ''; }"]);
M.push(['boxesToCuts is off by one',
  'for (i = 0; i < boxes.length - 1; i++) { at += boxes[i].length; cuts[at] = true; }',
  'for (i = 0; i < boxes.length - 1; i++) { at += boxes[i].length; cuts[at + 1] = true; }']);

/* ---- THE UNTRUSTED SHARED LIST ---- */
M.push(['⭐ a shared list is trusted without re-validation',
  'var c = this._sanitiseCustom(parsed[i]);',
  'var c = parsed[i];']);
M.push(['_sanitiseCustom accepts boxes that do not spell the word',
  'if (boxes.join(\'\') !== fold) return null;',
  'if (false) return null;']);
M.push(['_sanitiseCustom accepts a fully-hearted word',
  'if (!heart.length || heart.length > this.heartCap(boxes.length)) return null;',
  'if (false) return null;']);
/* ⚠ the strip now KEEPS the apostrophe and the hyphen (they are part of the
   word — `l’ape`, `guarda-chuva`) and no longer case-folds the display */
M.push(['_sanitiseCustom lets non-letters through',
  "var display = String(raw.display || '').replace(/'/g, '’').replace(/[^\\p{L}’-]/gu, '');",
  "var display = String(raw.display || '');"]);

/* ---- THE SPEECH LOCK (T6) — no isolated phonemes, ever ---- */
M.push(['speech leaks an isolated-phoneme type',
  "LCSAudio.speak({ type: 'word', text: w.display, lang: this.api.lang });",
  "LCSAudio.speak({ type: 'syllable', text: w.display, lang: this.api.lang });"]);
M.push(['speech loses its lang, so every locale speaks English',
  "LCSAudio.speak({ type: 'ui', text: w.sentence, lang: this.api.lang, rate: 0.95 });",
  "LCSAudio.speak({ type: 'ui', text: w.sentence, rate: 0.95 });"]);

/* ---- IDENTITY + ENTITLEMENT (T1) ---- */
M.push(['premium defaults to TRUE', '  premium: false,', '  premium: true,']);
M.push(['the store key changes under the teacher',
  "STORE_KEY: 'lcs:heart-words:v1',", "STORE_KEY: 'lcs:heart-words:v2',"]);
M.push(['the cached entitlement is trusted forever',
  '  ENT_TRUST_DAYS: 14,', '  ENT_TRUST_DAYS: 3650,']);

/* ---- CSS / DOM claims — the model gate structurally cannot see these,
        so they exist to prove the BROWSER gate is doing real work ---- */
M.push(['⭐ the tail goes back on its own line (the shipped defect)',
  "row.appendChild(tl);", 'front0.appendChild(tl);']);
M.push(['⭐ the container query is removed — sizing goes cyclic again',
  "'margin-block:clamp(4px,1.4vmin,14px);container-type:inline-size;'",
  "'margin-block:clamp(4px,1.4vmin,14px);'"]);
M.push(['the tile is pinned to its floor',
  "+ '.hw-boxrow{--hw-u:clamp(44px,calc((var(--hw-row) - (var(--hw-n) - 1) * var(--hw-g)) / var(--hw-n)),184px);'",
  "+ '.hw-boxrow{--hw-u:44px;'"]);
M.push(['the heart seal shrinks below the back of the room',
  "'height:max(16px,calc(var(--hw-u) * .30));color:var(--hw-seal);'",
  "'height:8px;color:var(--hw-seal);'"]);
M.push(['the seal sits INSIDE the tile, over the letters',
  "'.hw-heart{position:absolute;z-index:3;top:calc(var(--hw-u) * -.09);'",
  "'.hw-heart{position:absolute;z-index:3;top:calc(var(--hw-u) * .30);'"]);
M.push(['the write face carries the answer',
  "tl.textContent = blank ? '' : tail;", 'tl.textContent = tail;']);
M.push(['⭐ the write boxes print the word the child is meant to retrieve',
  "var b = api.el(blank ? 'div' : 'button', 'hw-box');",
  "var b = api.el(blank ? 'div' : 'button', 'hw-box'); if (blank) b.textContent = w.boxes[i];"]);
M.push(['⭐ the machine GUESSES the heart',
  "store.drafts.push({ id: 'my:' + raw, display: shown, boxes: boxes, heart: [], sentence: '' });",
  "store.drafts.push({ id: 'my:' + raw, display: shown, boxes: boxes, heart: [0], sentence: '' });"]);
M.push(['⭐ the keep control is available before the teacher has marked anything',
  "    save.setAttribute('aria-disabled', d.heart.length ? 'false' : 'true');",
  "    save.setAttribute('aria-disabled', 'false');"]);
/* ⚠ the teacher's capital is a GERMAN correctness matter, not cosmetics:
   a bank full of capitalised nouns beside her own lowercased "kuh" is two
   spellings of one word, in a tool about which letters a word has */
M.push(["the teacher's capital is folded away (Kuh -> kuh)",
  "      var shown = parts[i].trim().replace(/'/g, '’').replace(/[^\\p{L}’-]/gu, '');",
  "      var shown = parts[i].trim().toLowerCase().replace(/[^\\p{L}]/gu, '');"]);
M.push(['⭐ a free visitor can keep the list',
  "      if (!self.premium) { self.notice = 'gateSave'; self.render(); return; }",
  '      if (false) { return; }']);
M.push(['⭐ the paid print sheets are BUILT for a free visitor (the Ctrl+P bypass)',
  "var kind = (this._printSheet !== 'cards' && !this.premium) ? 'cards' : this._printSheet;",
  'var kind = this._printSheet;']);
M.push(['sheet A is withheld from a free visitor (the blank-page defect)',
  '    wrap.appendChild(this._buildPrintSheet());',
  '    if (this.premium) wrap.appendChild(this._buildPrintSheet());']);
M.push(['⭐ the desk search iterates bank.words and leaks the catalogue',
  '        var ws = this.wordsForShelf(shelves[i].id);',
  '        var ws = (this.bank.words || []).filter(function (w) { return w.shelf === shelves[i].id; });']);
/* ⚠ NOT a needle: `if (unlocked && open)` -> `if (open || true)`.
   It SURVIVES, and correctly so — wordsForShelf() still returns [] for a
   locked shelf, so no chip is built whatever the render condition says.
   That is defence in depth working, not a hole, and keeping it as a
   "survivor" would train the next reader to loosen a correct gate. The
   real entitlement needle is the wordsForShelf one at the top. */
M.push(['⭐ a free PREVIEW is recorded on the shelf as if it were saved',
  '    if (!this.transient) {', '    if (true) {']);
M.push(['the bookshelf starts counting',
  "    head.textContent = api.t('bookshelf');",
  "    head.textContent = api.t('bookshelf') + ' ' + Object.keys(this._store.known || {}).length;"]);

/* ---- LOCALE NEEDLES — self-anchored so they survive an apply- pass ---- */
for (const loc of LOCALES) {
  M.push(strMut('a verdict word in the ' + loc + ' instruction', 'instruction', loc,
    loc === 'en' ? 'That answer is wrong, try again.' : 'Test: correct or incorrect?'));
}
M.push(strMut('a {n} count in the bookshelf label', 'bookshelf', 'en', 'We know {n} words by heart'));
M.push(strMut('a placeholder that no other locale carries', 'heartLine', 'de', 'Diesen Teil merken wir uns: {word}.'));
M.push(strMut('an empty string in a locale', 'writeIt', 'sv', ''));

/* --------------------------------------------------------------------- */

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hw-mut-'));
for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(tmp, f));
const tmpTool = path.join(tmp, 'heart-words.js');

/* ⚠ --locales=en, because the tmp dir CARRIES only the English bank. Run
   the gate across all ten against a one-bank directory and it fails for a
   reason that has nothing to do with the mutation — a baseline failure
   that would make every needle below meaningless. */
const run = (gate, timeout) => {
  const args = gate === GATE ? [gate, '--locales=en'] : [gate];
  try {
    execFileSync(process.execPath, args, {
      env: Object.assign({}, process.env, { HW_TOOL_DIR: tmp, HW_DATA_DIR: tmp }),
      timeout: timeout, stdio: 'pipe'
    });
    return 'ok';
  } catch (e) {
    if (e.signal === 'SIGTERM' || /ETIMEDOUT/.test(String(e.code))) return 'hang';
    return 'died';
  }
};

/* baseline: the gate MUST pass on the unmutated tool, or nothing below means anything */
fs.writeFileSync(tmpTool, ORIGINAL, 'utf8');
if (run(GATE, TIMEOUT) !== 'ok') {
  console.error('FATAL: verify-heart-words.js fails on the UNMUTATED tool — fix that first.');
  process.exit(1);
}
console.log('baseline: the gate passes on the unmutated tool\n');

let killed = 0, browserKills = 0;
const survived = [], faults = [];
const list = ONLY ? M.filter(m => m[0].indexOf(ONLY) >= 0) : M;

for (const [label, from, to] of list) {
  if (typeof from === 'string' && from.indexOf(' NO-ANCHOR ') === 0) {
    faults.push(label + ' (locale anchor not found:' + from.replace(' NO-ANCHOR ', ' ') + ')');
    continue;
  }
  if (ORIGINAL.indexOf(from) === -1) { faults.push(label + ' (needle not found in the tool)'); continue; }
  const mutated = ORIGINAL.replace(from, to);
  if (mutated === ORIGINAL) { faults.push(label + ' (inert — the patch changed nothing)'); continue; }

  fs.writeFileSync(tmpTool, mutated, 'utf8');

  const v = run(GATE, TIMEOUT);
  if (v === 'hang') { survived.push(label + '  (the model gate HUNG — that is a survival)'); continue; }
  if (v === 'died') { killed++; console.log('  killed (verify)   ' + label); continue; }

  /* only verify-survivors pay the browser cost */
  const b = run(BROWSER_GATE, BROWSER_TIMEOUT);
  if (b === 'hang') { survived.push(label + '  (the browser gate HUNG — that is a survival)'); continue; }
  if (b === 'died') { killed++; browserKills++; console.log('  killed (browser)  ' + label); continue; }
  survived.push(label);
}

console.log('');
console.log(`${killed} killed, ${survived.length} survived, ${faults.length} harness fault(s) of ${list.length}`);
console.log(`  ${browserKills} of those were killed ONLY by the browser gate`);
if (faults.length) {
  console.error('\nHARNESS FAULTS (a mutation that was never actually tested):');
  for (const f of faults) console.error('  ' + f);
}
if (survived.length) {
  console.error('\nSURVIVED (no gate sees these):');
  for (const s of survived) console.error('  ' + s);
}
try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}
if (survived.length || faults.length) { console.error('\nFAIL — the gate has a hole, or a needle is misanchored'); process.exit(1); }
console.log('\nPASS — every mutation killed');
