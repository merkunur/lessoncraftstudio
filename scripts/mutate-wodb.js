#!/usr/bin/env node
/* =====================================================================
   mutate-wodb.js — every mutation must be KILLED by verify-wodb.js.

   ⚠ A gate that has only ever been shown passing is indistinguishable
   from a gate that cannot fail. This breaks the tool in N specific ways
   and requires the gate to notice every one.

   RULES BOUGHT BY REAL DEFECTS ELSEWHERE:
     - a needle that does not match is a HARNESS FAULT, not a skip: a
       dropped needle shrinks the denominator while the run still says
       "every mutation killed"
     - an INERT patch (one that changes nothing behavioural) is a harness
       fault too — it proves nothing and inflates the score
     - a TIMEOUT counts as SURVIVED, never as killed: a gate that hangs
       is a gate that did not run
     - every data file the gate reads is carried into the tmp dir, or the
       mutant fails for the wrong reason
     - the source is normalised to LF before searching, because a git
       checkout can rewrite line endings and blind a multi-line needle

   Run:  node scripts/mutate-wodb.js
   ===================================================================== */

'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'wodb.js'), 'utf8').replace(/\r\n/g, '\n');
const CARRY = ['wodb-grids.json'];
const TIMEOUT = 30000;

/* [name, find, replace] — find must be present exactly once-ish, and the
   replacement must differ from it. */
const M = [];
const add = (name, from, to) => M.push({ name, from, to });

/* ── the turn ── */
add('turn: a mirror instead of a rotation',
  'return [cells[2], cells[0], cells[3], cells[1]];',
  'return [cells[1], cells[0], cells[3], cells[2]];');
add('turn: the identity (the free control does nothing)',
  'return [cells[2], cells[0], cells[3], cells[1]];',
  'return [cells[0], cells[1], cells[2], cells[3]];');
add('turn: anticlockwise',
  'return [cells[2], cells[0], cells[3], cells[1]];',
  'return [cells[1], cells[3], cells[0], cells[2]];');
add('turn: mutates its argument',
  'return [cells[2], cells[0], cells[3], cells[1]];',
  'var t=cells[0];cells[0]=cells[2];cells[2]=cells[3];cells[3]=cells[1];cells[1]=t;return cells;');

/* ── the deck ── */
add('deck: ignores the band (a Year-1 class gets a Grade-2 grid)',
  "for (i = 0; i < all.length; i++) if (all[i].band === band) out.push(all[i].id);",
  "for (i = 0; i < all.length; i++) out.push(all[i].id);");
add('deck: returns nothing (Next has nowhere to go)',
  "for (i = 0; i < all.length; i++) if (all[i].band === band) out.push(all[i].id);",
  "for (i = 0; i < all.length; i++) if (false) out.push(all[i].id);");

/* ── the rotation ── */
add('rotation: ignores the band — THE SHIPPED DEFECT',
  "      if (byId[order[i]] && byId[order[i]].band === band) pool.push(order[i]);",
  "      if (byId[order[i]]) pool.push(order[i]);");
add('rotation: not deterministic',
  'return pool[this.isoWeek(now || new Date()) % pool.length];',
  'return pool[Math.floor(Math.random() * pool.length)];');
add('rotation: always the same grid (the rest are unreachable forever)',
  'return pool[this.isoWeek(now || new Date()) % pool.length];',
  'return pool[0];');
add('isoWeek: off by a day',
  '    d.setUTCDate(d.getUTCDate() - day + 3);',
  '    d.setUTCDate(d.getUTCDate() - day + 4);');

/* ── the free gate ── */
add('free gate: every grid is openable',
  "    if (this._isFeatured(g)) return true;                  /* this week's    */",
  '    if (true) return true;');
add('free gate: what was given is NOT kept',
  "    return (this._store.seenFree || []).indexOf(g.id) >= 0;/* every past week*/",
  '    return false;');
add('free gate: a deep link resolves without the entitlement check',
  '    if (want && this._canOpen(want)) return want;',
  '    if (want) return want;');

/* ── reasons ── */
add('reasons: only the first of an array survives',
  '      for (j = 0; j < r.length; j++) { var v = pick(r[j]); if (v) out.push(v); }',
  '      for (j = 0; j < 1; j++) { var v = pick(r[j]); if (v) out.push(v); }');
add('reasons: the legacy single-map shape stops resolving',
  '    var one = pick(r);\n    return one ? [one] : [];',
  '    var one = null;\n    return one ? [one] : [];');
add('reasons: no locale fallback to en',
  '      return x[lang] || x.en || null;                    /* per-locale map    */',
  '      return x[lang] || null;');
add('reasonedCount: assumes four again (the shipped defect)',
  '    for (i = 0; i < 4; i++) if (this.reasonListFor(g, i, lang).length) n++;\n    return n;',
  '    for (i = 0; i < 4; i++) if (this.reasonListFor(g, i, lang).length) n++;\n    return 4;');

/* ── the counting renderers ── */
add('dots: the dice fallback returns to a WRONG COUNT',
  '      if (!pts) return this._dotsSVG(\'scatter\', n, mini);   /* never a wrong count */',
  '      if (!pts) pts = this.DICE[6];');
add('dots: the ten-frame silently clamps at ten again',
  "    if (n > 10) return this._dotsSVG('scatter', n, mini);",
  '    if (n > 10) n = 10;');
add('dots: scatter drops a counter',
  '      for (i = 0; i < P.length; i++) s += this._dot(P[i][0], P[i][1], R * 0.78, col, mini);',
  '      for (i = 0; i < P.length - 1; i++) s += this._dot(P[i][0], P[i][1], R * 0.78, col, mini);');
add('dots: a row draws one too many',
  '      for (i = 0; i < n; i++) {\n        var rr = Math.floor(i / perRow), cc = i % perRow;',
  '      for (i = 0; i <= n; i++) {\n        var rr = Math.floor(i / perRow), cc = i % perRow;');
/* ⚠⚠ THERE IS NO SCATTER MUTATION HERE, AND THAT IS THE FINDING.
   Two were tried and BOTH correctly survived:
     - poisoning the fallback loop is inert, because the dart throw
       almost always places all n and the fallback never runs;
     - poisoning the dart throw is NEUTRALISED BY DESIGN, because the
       fallback then fills the shortfall back to exactly n.
   That is the guard doing its job: a placement failure must never become
   a miscount, in a tool whose subject is how many there are. Measure
   before accusing the gate — the survivor was the design, not a gap.
   The count itself is proven exhaustively by V7 over n = 1..20. */

/* ── the clock ──
   ⚠ the hand lines are IDENTICAL in the mini branch and the full dial,
   so these needles carry their surrounding indentation to say which one
   they mean. The mini branch has its own mutations below. */
add('clock: the hour hand ignores the minutes (full dial)',
  "    s += '<g transform=\"rotate(' + (30 * (h % 12) + 0.5 * m).toFixed(1) + ' 50 50)\">' +\n      '<path d=\"M46.6 50 L50 24 L53.4 50 Z\"",
  "    s += '<g transform=\"rotate(' + (30 * (h % 12)).toFixed(1) + ' 50 50)\">' +\n      '<path d=\"M46.6 50 L50 24 L53.4 50 Z\"");
add('clock: the minute hand uses the wrong multiplier (full dial)',
  "    s += '<g transform=\"rotate(' + (6 * m).toFixed(1) + ' 50 50)\">' +\n      '<path d=\"M48.3 50 L50 11 L51.7 50 Z\"",
  "    s += '<g transform=\"rotate(' + (5 * m).toFixed(1) + ' 50 50)\">' +\n      '<path d=\"M48.3 50 L50 11 L51.7 50 Z\"");
add('clock: the MINI dial\'s hour hand ignores the minutes',
  "      s += '<g transform=\"rotate(' + (30 * (h % 12) + 0.5 * m).toFixed(1) + ' 50 50)\">' +\n        '<line x1=\"50\" y1=\"50\" x2=\"50\" y2=\"24\"",
  "      s += '<g transform=\"rotate(' + (30 * (h % 12)).toFixed(1) + ' 50 50)\">' +\n        '<line x1=\"50\" y1=\"50\" x2=\"50\" y2=\"24\"");
add('clock: the MINI dial draws no hands at all',
  "      s += '<circle cx=\"50\" cy=\"50\" r=\"7\" fill=\"' + ink + '\"/>';",
  "      s = s.replace(/<line[^>]*stroke-width=\"(13|9)\"[^>]*\\/>/g, '');\n      s += '<circle cx=\"50\" cy=\"50\" r=\"7\" fill=\"' + ink + '\"/>';");
add('clock: back to four numerals, so a reason names one that is not there',
  '    for (i = 1; i <= 12; i++) {\n      a = i * Math.PI / 6;\n      s += \'<text',
  '    for (i = 3; i <= 12; i += 3) {\n      a = i * Math.PI / 6;\n      s += \'<text');

/* ── colour ── */
add('colour: a second ink reaches the stage',
  "    var ink = this.INK;\n    var S = this.SHAPES[cell.shape] || this.SHAPES.circle;",
  "    var ink = cell.color === 'plum' ? '#6B4C9A' : this.INK;\n    var S = this.SHAPES[cell.shape] || this.SHAPES.circle;");

/* ── shapes ── */
add('shapes: the star loses its regularity',
  "star:          { d: 'M50 2 L60.8 35.2 L95.7 35.2 L67.4 55.7 L78.2 88.8 L50 68.3 ' +\n                        'L21.8 88.8 L32.6 55.7 L4.3 35.2 L39.2 35.2 Z',",
  "star:          { d: 'M50 8 L61 38 L93 38 L67 57 L77 88 L50 69 ' +\n                        'L23 88 L33 57 L7 38 L39 38 Z',");
add('shapes: an anchor leaves the box',
  "triangle:      { d: 'M50 8 L94 84.2 L6 84.2 Z',                                           a: [50, 58.8]",
  "triangle:      { d: 'M50 8 L94 84.2 L6 84.2 Z',                                           a: [50, 108]");
add('shapes: the vocabulary shrinks back to the original eight',
  "    pentagon:      {",
  "    __removed_pentagon: { d:'M0 0 Z', a:[50,50], k:1 },\n    pentagon:      {");

/* ── structure ── */
add('structure: the tool declares tasks',
  "var Wodb = {\n  id: 'wodb',",
  "var Wodb = {\n  id: 'wodb',\n  tasks: [],");
add('structure: the print rules stop being entitlement-scoped',
  "  +   'body.wdb-paid .wdb-sheet{display:block !important;}'",
  "  +   '.wdb-sheet{display:block !important;}'");
add('structure: vh creeps into a manipulative',
  "  + '.wdb-hint{width:100%;",
  "  + '.wdb-hint{min-height:6vh;width:100%;");

/* ── the strings ── */
function enNeedle(key, replacement, name) {
  /* ⚠ SELF-ANCHORING. A needle that carries the current English inline
     dies the moment apply-wodb-locales.js re-pads the block, and a dead
     needle shrinks the total while the run still reports success. */
  const re = new RegExp(key + ":(\\s*)\\{en:'((?:[^'\\\\]|\\\\.)*)'");
  const m = re.exec(SRC);
  if (!m) throw new Error('enNeedle: no en value for "' + key + '"');
  const from = m[0];
  const to = key + ':' + m[1] + "{en:'" + replacement + "'";
  if (to === from) throw new Error('enNeedle: "' + key + '" already reads that — the mutation would be INERT');
  add(name, from, to);
}
enNeedle('doctrine', 'That is the correct answer.', 'strings: a verdict reaches the doctrine line');
enNeedle('turnIt', '', 'strings: an empty en value');
enNeedle('nextGrid', 'Score: 4', 'strings: a score reaches a chip');

/* ── run ── */
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'wdbmut-'));
let killed = 0, survived = [], faults = [];

for (const mut of M) {
  const idx = SRC.indexOf(mut.from);
  if (idx < 0) { faults.push(mut.name + ' — NEEDLE NOT FOUND'); continue; }
  /* ⚠⚠ A NEEDLE THAT MATCHES TWICE MUTATES THE WRONG ONE, SILENTLY.
     Two clock mutations "survived" here because the hand-rotation line
     is identical in the MINI branch and the full dial, `replace` takes
     the first, and the gate only tested the full dial. It read as a gate
     gap; it was a needle that could not say which copy it meant. (It
     also WAS a gate gap — the mini branch had no coverage at all — but
     the harness must not be able to hide that. */
  if (SRC.indexOf(mut.from, idx + 1) >= 0) {
    faults.push(mut.name + ' — NEEDLE IS NOT UNIQUE (matches ' +
      (SRC.split(mut.from).length - 1) + ' times); it would mutate whichever comes first');
    continue;
  }
  if (mut.from === mut.to) { faults.push(mut.name + ' — INERT'); continue; }
  const dir = fs.mkdtempSync(path.join(tmpRoot, 'm-'));
  fs.writeFileSync(path.join(dir, 'wodb.js'), SRC.replace(mut.from, mut.to));
  for (const f of CARRY) fs.copyFileSync(path.join(TOOLS, f), path.join(dir, f));
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-wodb.js')], {
      env: Object.assign({}, process.env, { WDB_TOOL_DIR: dir, WDB_QUIET: '1' }),
      timeout: TIMEOUT, stdio: 'pipe',
    });
  } catch (e) {
    /* ⚠ a TIMEOUT is SURVIVED, not killed — a gate that hangs did not run */
    if (e.killed || e.signal === 'SIGTERM' || e.code === 'ETIMEDOUT') { why = 'TIMED OUT'; }
    else died = true;
  }
  if (died) { killed++; console.log('  killed   ' + mut.name); }
  else { survived.push(mut.name + (why ? ' [' + why + ']' : '')); console.log('  SURVIVED ' + mut.name + (why ? ' [' + why + ']' : '')); }
}

try { fs.rmSync(tmpRoot, { recursive: true, force: true }); } catch (_) {}

console.log('');
console.log('  ' + killed + '/' + M.length + ' killed');
if (faults.length) { console.log('  HARNESS FAULTS (' + faults.length + '):'); faults.forEach((f) => console.log('    ' + f)); }
if (survived.length) { console.log('  SURVIVORS (' + survived.length + '):'); survived.forEach((s) => console.log('    ' + s)); }
if (survived.length || faults.length) process.exit(1);
console.log('  every mutation killed');
