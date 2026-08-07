/* =====================================================================
   mutate-number-sieve.js — the mutation harness for verify-number-sieve.js
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-number-sieve.js

   Each mutation is a defect a future edit could plausibly introduce; the
   gate must FAIL on every one. A SURVIVOR is a hole in the gate, never an
   acceptable mutation — fix the gate, never the mutation list. An INERT
   mutation is not a gate hole either: it is a bad mutation, and the
   honest fix is to write one that actually bites.
   A gate run that HANGS counts as failed too, hence the timeout.

   The tool file is never written to: every mutant is a copy in a temp
   dir, reached through NSV_TOOL_DIR.
   ===================================================================== */

'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC_PATH = path.join(ROOT, 'mini tools', 'number-sieve.js');
const ORIG = fs.readFileSync(SRC_PATH, 'utf8');

/* anchor on the GENERATED shape of a strings line, so a locale pass
   (which rewrites the whole block) cannot silently un-anchor a mutation */
const sline = (k) => {
  const m = new RegExp('^ {4}' + k + ':\\s+\\{ en: "[^"]*"', 'm').exec(ORIG);
  if (!m) throw new Error('cannot anchor string ' + k);
  return m[0];
};
const restring = (k, text) => [sline(k), sline(k).replace(/en: "[^"]*"/, 'en: "' + text + '"')];

const M = [
  /* ---- the predicates ---------------------------------------- */
  ['a magnitude card is off by one (ge)', 'if (clue.op === \'ge\') return n >= clue.a;', 'if (clue.op === \'ge\') return n > clue.a;'],
  ['a magnitude card is off by one (le)', 'if (clue.op === \'le\') return n <= clue.a;', 'if (clue.op === \'le\') return n < clue.a;'],
  ['the parity card keeps the wrong half', 'return ((n % 2) + 2) % 2 === (clue.r ? 1 : 0);', 'return ((n % 2) + 2) % 2 === (clue.r ? 0 : 1);'],
  ['the multiples comb is inverted', 'return clue.keep ? hit : !hit;', 'return clue.keep ? !hit : hit;'],
  ['the digit card reads the wrong place', 'var d = (clue.place === \'tens\') ? Math.floor(Math.abs(n) / 10) % 10 : Math.abs(n) % 10;', 'var d = (clue.place === \'tens\') ? Math.abs(n) % 10 : Math.floor(Math.abs(n) / 10) % 10;'],
  ['the digit card is inverted', 'return clue.keep ? same : !same;', 'return clue.keep ? !same : same;'],
  ['the dot card is off by one', 'if (clue.op === \'lt\') return n < clue.q;', 'if (clue.op === \'lt\') return n <= clue.q;'],
  ['the dot card compares the wrong way', 'return n > clue.q;', 'return n >= clue.q;'],
  ['the nearer card lets the midpoint through', 'return Math.abs(n - clue.a) < Math.abs(n - clue.b);', 'return Math.abs(n - clue.a) <= Math.abs(n - clue.b);'],
  ['the nearer card picks the far anchor', 'return Math.abs(n - clue.a) < Math.abs(n - clue.b);', 'return Math.abs(n - clue.a) > Math.abs(n - clue.b);'],
  ['a thing that is not a number is treated as zero', 'if (typeof n !== \'number\' || !isFinite(n)) return false;', 'n = Number(n); if (!isFinite(n)) return false;'],
  ['an unknown card silently keeps everything it should drop', 'if (f === \'parity\') {', 'if (f === \'parity\' && false) {'],

  /* ---- the deck ------------------------------------------------ */
  ['turning a card skips one', 's.turned += 1;', 's.turned += 2;'],
  ['⭐ turning the first card no longer commits the marker', 's.committed = true;   /* the marker is committed from the first card */', 's.committed = false;'],
  ['⭐ the marker can be moved after the cards start turning', 'if (s.committed) return s;', 'if (false) return s;'],
  ['a marker can be parked off the field', 'if (!isFinite(v) || v < 1 || v > s.field) return s;', 'if (!isFinite(v)) return s;'],
  ['the shuffle drops a card instead of moving it', 's.clues = s.clues.slice(1).concat(s.clues.slice(0, 1));', 's.clues = s.clues.slice(1);'],
  ['the shuffle leaves cards already turned', 's.turned = 0;\n    s.chosen = -1;', 's.turned = 1;\n    s.chosen = -1;'],
  /* ⭐ NEW: the defect this rebuild found by driving the model — a
     shuffle that un-commits the markers lets a class move a guess
     onto an answer they have just watched the deck reveal. */
  ['⭐ a shuffle un-commits the markers', 's.spares = this._deriveSpares(s.field, s.clues);\n    return s;', 's.spares = this._deriveSpares(s.field, s.clues);\n    s.committed = false;\n    return s;'],
  ['⭐ the emblems stop travelling with their cards', 's.emblems = eh.slice(1).concat(eh.slice(0, 1)).concat(et);', 's.emblems = s.emblems.slice();'],
  ['the fold stops one card short', 'var upto = Math.max(0, Math.min(k === undefined ? s.turned : k, s.clues.length));', 'var upto = Math.max(0, Math.min(k === undefined ? s.turned : k, s.clues.length) - 1);'],
  ['the fold applies every card regardless of what has been turned', 'var upto = Math.max(0, Math.min(k === undefined ? s.turned : k, s.clues.length));', 'var upto = s.clues.length;'],

  /* ---- the leak ------------------------------------------------ */
  ['⭐ the answer is readable before the last card', 'if (!s.clues || !s.clues.length || s.turned < s.clues.length) {', 'if (false) {'],
  ['⭐ the answer accessor stops throwing', 'throw new Error(\'the number is not available until every card has been turned\');', 'return s.target;'],

  /* ---- the apparatus limits ------------------------------------ */
  ['⭐ magnitude bounds go back to free values (the pincer returns)', 'for (a = step; a <= f - 1; a += step) { out.push({ f: \'range\', op: \'ge\', a: a }); out.push({ f: \'range\', op: \'le\', a: a }); }', 'for (a = 2; a <= f - 1; a++) { out.push({ f: \'range\', op: \'ge\', a: a }); out.push({ f: \'range\', op: \'le\', a: a }); }'],
  ['the coarse grid collapses to every number', 'COARSE: function (field) { return this.allNumbers(field).length <= 20 ? 5 : 10; },', 'COARSE: function (field) { return 1; },'],
  ['the dot card shows more dots than a class can see', 'MAX_DOTS: 20,', 'MAX_DOTS: 120,'],
  /* ⚠ the first cut here flipped `len >= live.length` to `len >`, which is
     INERT: the schedule always prefers a real cut, so a no-op card is
     never actually chosen. An inert mutation is a bad mutation, not a
     gate hole. This one makes the last card AIM at taking nothing away. */
  ['⭐ a card that takes nothing away reaches the board', 'var ideal = (remaining <= 1) ? 1', 'var ideal = (remaining <= 1) ? live.length'],
  ['the search stops filtering to cards the target survives', 'for (i = 0; i < uni.length; i++) if (this.satisfies(uni[i], t)) keepers.push(uni[i]);', 'for (i = 0; i < uni.length; i++) keepers.push(uni[i]);'],
  /* ⚠ NOT HERE: "invert the comparability mask". Measured and PROVABLY
     INERT — comparability is tested in both directions, and
     (¬A ⊆ ¬B) or (¬B ⊆ ¬A) is exactly (B ⊆ A) or (A ⊆ B). Inverting both
     masks cannot change the answer. A bad mutation, not a gate hole.
     Likewise "isolation accepts more than one survivor" as a change to
     _isolates' final return: the early `if (n > 1) return false;` shadows
     it completely. And loosening that early exit alone (`n > 1` to
     `n > 2`) is inert for the mirror-image reason — the final return
     still demands exactly one. Three inert mutations in one small
     function, each found by measuring rather than by reading. The part
     that actually carries the answer is the loop body. */
  ['isolation forgets WHICH number was left standing', 'if (ok) { n++; only = all[i]; if (n > 1) return false; }', 'if (ok) { n++; if (n > 1) return false; }'],
  ['⭐ cards that imply each other are allowed into one deck', 'if (this._comparableWithAny(keeperSets[k], chosenMasks)) continue;', 'if (false) continue;'],
  ['comparability only blocks identical cards', 'if (aSubB || bSubA) return true;', 'if (aSubB && bSubA) return true;'],
  ['comparability blocks everything', 'return false;\n  },\n\n  _isolates:', 'return true;\n  },\n\n  _isolates:'],
  ['the deck may end on more than one survivor', 'if (live.length !== 1 || live[0] !== t) return null;', 'if (live.length < 1) return null;'],
  ['⭐ redundant cards are left in the deck', 'if (this._isolates(field, without, t)) pruned = without;', 'if (false) pruned = without;'],
  ['⭐ the builder goes back to cutting as fast as it can', 'AIM_LADDER: [4, 3, 5, 2, 6],', 'AIM_LADDER: [2],'],
  ['the deck is capped below what the awkward targets need', 'MAX_CARDS: 6,', 'MAX_CARDS: 2,'],
  ['the search gives up after one card', 'guard++ < 40', 'guard++ < 1'],

  /* ---- the stance ---------------------------------------------- */
  ['the tool declares tasks and becomes a graded activity', 'STORE_KEY: \'lcs:number-sieve:v1\',', 'tasks: [],\n  STORE_KEY: \'lcs:number-sieve:v1\','],
  ['an inked counter appears (this field never accumulates)', 'MAX_DOTS: 20,', 'MAX_DOTS: 20,\n  inked: 0,'],
  ['a columns control appears', 'MAX_DOTS: 20,', 'MAX_DOTS: 20,\n  cols: 10,'],
  ['per-digit tinting leaks in', 'MAX_DOTS: 20,', 'MAX_DOTS: 20,\n  tintOnes: false,'],
  ['a score field appears', 'MAX_DOTS: 20,', 'MAX_DOTS: 20,\n  score: 0,'],
  ['the state grows a hidden field', 'markers: [],      /* the committed guesses, in the order parked */', 'markers: [], tally: 0,'],
  ['a third network call appears', 'fetch(\'/api/auth/me\', {', 'fetch(\'/api/track\', {'],
  ['⭐ locked boards reach the free array', 'for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);', 'for (i = 0; i < all.length; i++) out.push(all[i]);'],
  ['⭐ unknown entitlement becomes optimistic', 'if (!token) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }', 'if (!token) { self.premium = true; self.premiumKnown = true; if (self._wrap) self.render(); return; }'],

  /* ---- the render + the geometry -------------------------------- */
  ['⭐ the render path learns what the deck is converging on', 'var dying = this._dying || {};', 'var dying = this._dying || {}; void this.st.target;'],
  ['a control drops below the tap floor', '.nsv-chip{min-height:44px;', '.nsv-chip{min-height:30px;'],
  ['the field cell drops below the canvas floor', '--nsv-cell:clamp(34px,6.4vmin,46px);', '--nsv-cell:clamp(22px,6.4vmin,46px);'],
  ['⭐ the cell stops carrying min-width:0/min-height:0', '.nsv-cell{min-width:0;min-height:0;', '.nsv-cell{'],
  ['a verdict colour class appears', '.nsv-back{fill:#146B5E;}', '.nsv-back{fill:#146B5E;}\' + \'.nsv-correct{fill:#146B5E;}'],
  ['⚠ an inline background SHORTHAND is set on a cell', 'b.setAttribute(\'data-n\', String(n));', 'b.setAttribute(\'data-n\', String(n));\n    b.style.background = \'#FBF3E4\';'],
  ['a card face draws a word instead of a numeral', 'e.textContent = String(digits).replace(/[^0-9]/g, \'\');', 'e.textContent = String(digits);'],

  /* ---- the label must be true ----------------------------------- */
  ['⭐ "New cards" goes back to only arming a mode', 'self._dealNewTarget();\n      self._picking = \'target\';', 'self._picking = \'target\';'],
  ['the new board is not actually different', 'cand = all[((start + k * 7) % all.length + all.length) % all.length];', 'cand = all[((start + k * 0) % all.length + all.length) % all.length];'],
  ['the deal stride cycles a short orbit', 'cand = all[((start + k * 7) % all.length + all.length) % all.length];', 'cand = all[((start + k * 10) % all.length + all.length) % all.length];'],
  ['⭐ setTarget returns the old deck instead of failing', 'if (!built) return null;', 'if (!built) return s;'],
  ['the caller guards on the old clues again', 'if (built) { this.st = built; this._fromLibrary = false; this._boardId = null; }', 'if (built.clues.length) { this.st = built; this._fromLibrary = false; }'],
  ['the unobeyable hint comes back', 'if (picking === \'target\') return \'pickHint\';\n    if (!s.clues.length) return \'\';', 'if (picking === \'target\' || !s.clues.length) return \'pickHint\';'],
  /* ⭐ NEW, for the rebuild's own inventions */
  ['⭐ the closing choice loses its only closer', 'if (res.length === 1 && res[0] === t) { if (!closer) closer = uni[k]; continue; }', 'if (res.length === 1) { if (!closer) closer = uni[k]; continue; }'],
  ['⭐ two closing candidates may leave the same numbers', 'if (seenRes[key]) continue;', 'if (false) continue;'],
  ['⭐ a closing candidate may be implied by a card already on the table', 'if (this._comparableWithAny(this._maskOf(all, uni[k]), masks)) continue;', 'if (false) continue;'],
  ['⭐ the emblem is derived from the clue family', 'for (i = 0; i < n; i++) out.push(i % this.EMBLEMS);', 'for (i = 0; i < n; i++) out.push(0);'],
  ['⭐ the quantity face goes back to lying about its own count', 'var q = Math.max(0, Math.min(this.MAX_DOTS, Math.round(c.q)));', 'var q = Math.max(0, Math.min(10, Math.round(c.q)));'],
  ['⭐ the dead cell loses its second channel', 'background-image:repeating-linear-gradient(45deg,#0E5147 0 1.5px,rgba(0,0,0,0) 1.5px 6px);', 'background-image:none;'],
  ['⭐ the card bar goes back to a light ground', '.nsv-fbar{fill:#0E5147;}', '.nsv-fbar{fill:#E8E1D2;}'],
  ['⭐ start again throws the teacher back to library board one', 's.turned = 0;\n    s.markers = [];\n    s.chosen = -1;\n    s.committed = false;\n    return s;', 'return this.newState();'],
  ['⭐ the offline fallback degrades to nothing again', 'premiumMax: 8,\n    boards: [', 'premiumMax: 8,\n    boards: [] || ['],

  /* ---- the words ----------------------------------------------- */
  ['⭐ a string starts counting', ...restring('instruction', 'Turn 3 cards and watch the field.')],
  ['a string carries a comparison glyph', ...restring('tryAnother', 'Is it > ten?')],
  ['a string carries a verdict', ...restring('gateLine', 'Correct! The library is part of the teacher plan.')],
  ['⭐ a string NAMES a clue family', ...restring('pickHint', 'Tap a number to see the even numbers go.')],
  ['a locale silently loses a string', 'da: "Start forfra", ', '']
];

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'nsv-mut-'));
let died = 0;
const survivors = [];

M.forEach(([name, from, to], n) => {
  if (ORIG.indexOf(from) === -1) { survivors.push(`${name}  [ANCHOR NOT FOUND — mutation never applied]`); return; }
  const mutated = ORIG.split(from).join(to);
  if (mutated === ORIG) { survivors.push(`${name}  [INERT — the mutation changed nothing]`); return; }
  const dir = path.join(TMP, 'm' + n);
  fs.mkdirSync(dir, { recursive: true });
  /* ⚠ LF explicitly: a CRLF rewrite silently un-anchors every multi-line
     mutation and they then report ANCHOR NOT FOUND for no visible reason */
  fs.writeFileSync(path.join(dir, 'number-sieve.js'), mutated.replace(/\r\n/g, '\n'), 'utf8');
  let failed = false;
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-number-sieve.js')],
      { env: Object.assign({}, process.env, { NSV_TOOL_DIR: dir }), stdio: 'pipe', timeout: 30000 });
  } catch (e) { failed = true; }
  if (failed) { died++; console.log(`  killed   ${name}`); }
  else survivors.push(name);
});

console.log('');
survivors.forEach((s) => console.error(`  SURVIVED ${s}`));
console.log(`${died}/${M.length} mutations killed`);
process.exit(died === M.length ? 0 : 1);
