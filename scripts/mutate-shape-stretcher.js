/* =====================================================================
   mutate-shape-stretcher.js — poison TOOL #57's model and its stylesheet,
   one edit at a time, and require `verify-shape-stretcher.js` to notice
   every one.
   Run:  node scripts/mutate-shape-stretcher.js

   ⚠ A CONTROL RUN COMES FIRST. A crashed gate is indistinguishable from
   a failing one, so an unmutated copy must PASS before any mutation's
   failure means anything.

   ⚠ A MISSING NEEDLE IS A FAULT, NOT A SKIP — and so is an AMBIGUOUS
   one. #43 lost seven needles to a line-ending change alone and the run
   still said "every mutation killed". Here a needle that matches zero
   times OR more than once fails the run: `String.replace` takes the
   first hit, so a needle matching twice mutates a place nobody chose.

   ⚠ \r\n IS COLLAPSED BEFORE SEARCHING, in the original AND in the
   needle. `git checkout` normalises line endings through core.autocrlf
   and multi-line needles are silently sensitive to it.

   ⚠ NEEDLES ARE SELF-ANCHORED ON THE SHORTEST DISTINCTIVE FRAGMENT. A
   needle carrying a whole English sentence has a half-life of one
   `apply-` run.

   ⚠ THE GATE READS ONE FILE. `verify-shape-stretcher.js` binds no port
   and opens no browser, so only `shape-stretcher.js` travels to the tmp
   dir — but if a data file is ever added to this tool it MUST be added
   here too, or the CONTROL will fail loudly rather than the mutations
   passing quietly.

   ⚠ timeout: 30000. A gate that HANGS is a gate that SURVIVED.

   ⚠⚠ SIX MUTATIONS ARE DELIBERATELY ABSENT, AND THIS NOTE IS THE
   REASON — reading their "survival" as a gate gap would send the next
   reader hunting an assertion that cannot exist. The last three were
   WRITTEN, RUN, and found to survive; each was then proved equivalent
   rather than answered with a new assertion, which is the only honest
   way to retire a survivor:
     `if (!here.equal && !here.right) continue;` -> `if (false) continue;`
        EQUIVALENT. The push below it requires a tag to hold at the rung,
        so the early-out changes the output by nothing. It is a speed
        guard, not a rule.
     `if (u < r.lo || u > r.hi) continue;` -> `if (false) continue;`
        EQUIVALENT at every reachable state: the tags at the rung one
        step OUTSIDE either ladder agree with the tags at the end rung
        for every form (k = +-83 and theta = 16/164 flip nothing), so no
        detent appears or disappears. ⚠ This equivalence depends on the
        LADDER BOUNDS; if TH_MIN ever moves onto 60 or 90, or K_MAX onto
        40, it becomes a real mutation and belongs back in the list.
     `return GEO.T_POP;` -> `return GEO.T_SEAT;` in _announceTagChange
        EQUIVALENT BY DESIGN — the no-verdict law is that those two
        numbers are equal. The equality itself is mutated instead.
     `var i, c = f.n === 4 ? 4 : 3;` -> `var i, c = 3;`
        EQUIVALENT. The quadrilateral is a PARALLELOGRAM, so
        `cornerRight` returns the same answer at all four of its corners;
        examining three of them cannot change the union. ⚠ Depends on the
        parallelogram construction in `verts`; a general quadrilateral
        would make this a real mutation.
     `for (i = -1; i <= 1; i += 2)` -> `for (i = 1; i <= 1; i += 2)`
        (look only forward) and
     `u = v + i * r.step;` -> `u = v + i * 2 * r.step;` (look two rungs out)
        BOTH EQUIVALENT ON THIS TAG SET, and for one shared reason: every
        rung at which a tag holds-but-not-everywhere is an ISOLATED point
        (k = 0, k = +-40, theta = 60, theta = 90), each at least two rungs
        from the next and none of them at a ladder END. So a forward-only
        look, and a look that skips a rung, both still find a neighbour
        that lacks the tag. ⚠⚠ THIS EQUIVALENCE IS CONDITIONAL AND WORTH
        RE-READING IF THE PREDICATES CHANGE: give a tag a RUN of adjacent
        rungs, or make one hold at TH_MIN / +-K_MAX, and both become real
        mutations and belong back in the list.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = path.join(__dirname, '..', 'mini tools', 'shape-stretcher.js');
const VERIFY = path.join(__dirname, 'verify-shape-stretcher.js');
const ORIGINAL = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

/* =====================================================================
   ⚠⚠ SELF-ANCHORED COPY NEEDLES — read off the LIVE file, never typed.
   ---------------------------------------------------------------------
   The refuse-list mutations below used to carry the English literal
   inline (`title: { en: 'The Shape Stretcher' }`). That is a needle with
   a half-life: it survives exactly until someone rewrites the strings
   block. The eleven-locale fold rewrote all 31 entries at once — new
   quote character, ten more locales on the line — and SEVEN needles went
   unmatchable in one commit. (#43 lost four the same way, and this is the
   second time on this tool: the note further down records the first.)

   `enOf(key)` locates `      <key>: { en: ` in the file it is about to
   mutate and reads the string literal that follows, whatever its quote
   character and whatever else is on the line. The needle is then the
   prefix PLUS that literal, so it is unique by construction.

   ⚠ IT THROWS. A helper that returned null on a miss would shrink the
   total silently while the run still printed "every mutation killed" —
   the exact failure the FAULT counter exists to prevent, moved one level
   up where the counter cannot see it. */
function enOf(key) {
  const anchor = '      ' + key + ': { en: ';
  const at = ORIGINAL.indexOf(anchor);
  if (at === -1) throw new Error('mutate: no `' + anchor.trim() + '` in the tool — the needle cannot self-anchor.');
  if (ORIGINAL.indexOf(anchor, at + 1) !== -1) throw new Error('mutate: `' + key + '` anchors twice; the needle would be ambiguous.');
  const q = ORIGINAL[at + anchor.length];
  if (q !== '"' && q !== "'") throw new Error('mutate: `' + key + '` is not followed by a string literal.');
  let i = at + anchor.length + 1;
  for (; i < ORIGINAL.length; i++) {
    if (ORIGINAL[i] === '\\') { i++; continue; }
    if (ORIGINAL[i] === q) break;
    if (ORIGINAL[i] === '\n') throw new Error('mutate: `' + key + '` literal is unterminated on its line.');
  }
  return { anchor: anchor, quote: q, body: ORIGINAL.slice(at + anchor.length + 1, i) };
}

/* prepend text INSIDE the English literal — the shape every refuse-list
   mutation wants (a banned phrase reaching the shipped copy) */
function enPrefix(key, inject) {
  const e = enOf(key);
  return [e.anchor + e.quote + e.body + e.quote,
    e.anchor + e.quote + inject + e.body + e.quote];
}
/* append text INSIDE the English literal */
function enSuffix(key, inject) {
  const e = enOf(key);
  return [e.anchor + e.quote + e.body + e.quote,
    e.anchor + e.quote + e.body + inject + e.quote];
}
/* replace the English literal outright */
function enSwap(key, text) {
  const e = enOf(key);
  return [e.anchor + e.quote + e.body + e.quote,
    e.anchor + e.quote + text + e.quote];
}

/* [label, find, replace] — each must change BEHAVIOUR, not a comment */
const MUTATIONS = [
  /* --- sidesAllEqual: every clause -------------------------------- */
  ['the rhombus tag accepts a nearly-square stretch', 'if (f.n === 4) return f.k === 0;', 'if (f.n === 4) return Math.abs(f.k) <= 1;'],
  ['the rhombus tag never holds at all', 'if (f.n === 4) return f.k === 0;', 'if (f.n === 4) return false;'],
  ['⭐ the equilateral tag drops the 60 degree clause — two equal sides is not three',
    'return f.k === 0 && f.theta === 60;', 'return f.k === 0;'],
  ['the equilateral tag drops the equal-sides clause', 'return f.k === 0 && f.theta === 60;', 'return f.theta === 60;'],
  ['the equilateral tag holds at the wrong lean', 'return f.k === 0 && f.theta === 60;', 'return f.k === 0 && f.theta === 62;'],

  /* --- cornerRight: every clause, AND THE SHIPPED DEFECT ----------- */
  ['the parallelogram is square-cornered at a second lean', 'if (f.n === 4) return f.theta === 90;      /* all four, or none */',
    'if (f.n === 4) return f.theta === 90 || f.theta === 60;'],
  ['the parallelogram is never square-cornered', 'if (f.n === 4) return f.theta === 90;      /* all four, or none */',
    'if (f.n === 4) return false;'],
  ['the triangle apex is never square', 'if (i === 0) return f.theta === 90;', 'if (i === 0) return false;'],
  ['the triangle apex is square at every lean', 'if (i === 0) return f.theta === 90;', 'if (i === 0) return true;'],
  ['⭐⭐ THE SHIPPED DEFECT: the two base corners are swapped, so the little square is drawn on the THIRTY degree corner',
    'if (i === 1) return f.theta === 60 && f.k === -40;', 'if (i === 1) return f.theta === 60 && f.k === 40;'],
  ['the first base corner is square at the wrong stretch', 'if (i === 1) return f.theta === 60 && f.k === -40;',
    'if (i === 1) return f.theta === 60 && f.k === -41;'],
  ['the second base corner is square at the wrong stretch', 'return f.theta === 60 && f.k === 40;', 'return f.theta === 60 && f.k === 41;'],
  ['the second base corner is square at the wrong lean', 'return f.theta === 60 && f.k === 40;', 'return f.theta === 62 && f.k === 40;'],
  ['⚠ only the apex is ever examined, so a 30-60-90 never shows its square',
    'var i, c = f.n === 4 ? 4 : 3;', 'var i, c = 1;'],

  /* --- tags(): the union it reads ---------------------------------- */
  ['the equal-sides tag is not what sidesAllEqual says', 'return { equal: this.sidesAllEqual(f), right: this.anyCornerRight(f) };',
    'return { equal: false, right: this.anyCornerRight(f) };'],
  ['the square-corner tag is not what the corners say', 'return { equal: this.sidesAllEqual(f), right: this.anyCornerRight(f) };',
    'return { equal: this.sidesAllEqual(f), right: false };'],
  ['⭐⭐ tags() reads the POSE — tilt something and a tag lets go',
    'return { equal: this.sidesAllEqual(f), right: this.anyCornerRight(f) };',
    'return { equal: this.sidesAllEqual(f) && (f.rot === undefined || f.rot < 180), right: this.anyCornerRight(f) };'],

  /* --- _formAt + detentsFor: THE DIAL HAS NO NOTCHES --------------- */
  ['⭐⭐ the rung reaches the form on every track, so the dial grows notches', "k: track === 'len' ? v : f.k,", 'k: v,'],
  ['the lean rung reaches the form on every track', "theta: track === 'skew' ? v : f.theta };", 'theta: v };'],
  ['⭐⭐ A HOME NOTCH AT ZERO — the apparatus asserts that upright is special, which is the misconception itself',
    'for (v = r.lo; v <= r.hi; v += r.step) {', "for (v = r.lo; v <= r.hi; v += r.step) {\n        if (track === 'turn' && v === 0) out.push(0);"],
  ['⭐⭐ THE SHIPPED DEFECT: every rung where a tag merely HOLDS is notched, so the stretch rail draws all 165',
    'if ((here.equal && !there.equal) || (here.right && !there.right)) { out.push(v); break; }',
    'if (here.equal || here.right) { out.push(v); break; }'],
  ['the square-corner detents vanish from both rails', 'if ((here.equal && !there.equal) || (here.right && !there.right)) { out.push(v); break; }',
    'if (here.equal && !there.equal) { out.push(v); break; }'],
  ['the equal-sides detents vanish from both rails', 'if ((here.equal && !there.equal) || (here.right && !there.right)) { out.push(v); break; }',
    'if (here.right && !there.right) { out.push(v); break; }'],

  /* --- the ladders ------------------------------------------------- */
  ['⭐ K_MAX rises past the margin the right-angle mark was sized from', 'K_MAX: 82,', 'K_MAX: 83,'],
  ['K_MAX rises far enough to squeeze the mark out of its corner', 'K_MAX: 82,', 'K_MAX: 120,'],
  ['K_MAX falls below the two 30-60-90 states, so they become unreachable', 'K_MAX: 82,', 'K_MAX: 39,'],
  ['TH_STEP changes, so the lean ladder no longer lands on 60', 'TH_STEP: 2,', 'TH_STEP: 3,'],
  ['TH_MIN moves, so the lean ladder no longer lands on 90', 'TH_MIN: 18,', 'TH_MIN: 19,'],
  ['TH_MAX is cut back', 'TH_MAX: 162,', 'TH_MAX: 160,'],
  ['ROT_STEP changes the dial ladder underneath the sweep', 'ROT_STEP: 2,', 'ROT_STEP: 4,'],
  ['TARGET_R changes, so the shape is not fitted to the extent the pane was built for', 'TARGET_R: 82,', 'TARGET_R: 70,'],
  ['⭐ MARK_MIN drops, so the little square shrinks below the leg it was sized to', 'MARK_MIN: 8,', 'MARK_MIN: 2,'],
  ['the len ladder walks in twos, so the pointer and the keyboard address different state spaces',
    "if (key === 'len') return { lo: -GEO.K_MAX, hi: GEO.K_MAX, step: 1, get: 'k' };",
    "if (key === 'len') return { lo: -GEO.K_MAX, hi: GEO.K_MAX, step: 2, get: 'k' };"],
  ['the dial ladder runs one rung past a full turn', "return { lo: 0, hi: 360 - GEO.ROT_STEP, step: GEO.ROT_STEP, get: 'rot' };",
    "return { lo: 0, hi: 360, step: GEO.ROT_STEP, get: 'rot' };"],
  ['legalTheta drops the lattice, so a lean between the rungs is legal',
    'return t >= GEO.TH_MIN && t <= GEO.TH_MAX && (t - GEO.TH_MIN) % GEO.TH_STEP === 0;',
    'return t >= GEO.TH_MIN && t <= GEO.TH_MAX;'],
  ['legalTheta drops its ceiling', 'return t >= GEO.TH_MIN && t <= GEO.TH_MAX && (t - GEO.TH_MIN) % GEO.TH_STEP === 0;',
    'return t >= GEO.TH_MIN && (t - GEO.TH_MIN) % GEO.TH_STEP === 0;'],

  /* --- the deal ----------------------------------------------------- */
  ['⭐⭐ the tool opens on an UPRIGHT shape — the canonical pose is the misconception itself',
    'var rot = 22 + Math.round(r() * ((90 - 44) / GEO.ROT_STEP)) * GEO.ROT_STEP;', 'var rot = 0;'],
  ['⭐ the deal wanders back inside the 22 degree exclusion',
    'var rot = 22 + Math.round(r() * ((90 - 44) / GEO.ROT_STEP)) * GEO.ROT_STEP;',
    'var rot = 8 + Math.round(r() * ((90 - 44) / GEO.ROT_STEP)) * GEO.ROT_STEP;'],
  ['the deal always opens on an unstretched shape', 'var k = Math.round((r() * 2 - 1) * GEO.K_MAX);', 'var k = 0;'],
  ['the deal opens with a fractional stretch', 'var k = Math.round((r() * 2 - 1) * GEO.K_MAX);', 'var k = (r() * 2 - 1) * GEO.K_MAX;'],
  ['a fresh shape arrives with one already kept beside it', 'return { n: n, k: k, theta: theta, rot: rot, kept: null };',
    'return { n: n, k: k, theta: theta, rot: rot, kept: { n: n, k: k, theta: theta, rot: rot } };'],

  /* --- the moves: one refusal channel ------------------------------ */
  ['the stretch accepts a rung off the ladder', 'if (k !== Math.round(k) || k < -GEO.K_MAX || k > GEO.K_MAX) return null;', 'if (false) return null;'],
  ['the stretch accepts a fractional rung', 'if (k !== Math.round(k) || k < -GEO.K_MAX || k > GEO.K_MAX) return null;',
    'if (k < -GEO.K_MAX || k > GEO.K_MAX) return null;'],
  ['⚠ setting the stretch to where it already is is not a refusal', 'if (k === s.k) return null;', 'if (false) return null;'],
  ['the lean accepts a rung between the rungs', 'if (!this.legalTheta(t) || t === s.theta) return null;', 'if (t === s.theta) return null;'],
  ['leaning to where it already leans is not a refusal', 'if (!this.legalTheta(t) || t === s.theta) return null;', 'if (!this.legalTheta(t)) return null;'],
  ['the dial accepts an odd degree', 'if (r !== Math.round(r) || r % GEO.ROT_STEP !== 0) return null;', 'if (r !== Math.round(r)) return null;'],
  ['⭐ the dial stops wrapping, so a negative turn escapes the circle', 'r = ((r % 360) + 360) % 360;', 'r = r % 360;'],
  ['the dial wraps onto the wrong modulus', 'r = ((r % 360) + 360) % 360;', 'r = ((r % 360) + 360) % 361;'],
  ['⚠ a second shape can be kept, so the pane holds three', 'if (s.kept) return null;', 'if (false) return null;'],
  ['putting away a shape that is not there is not a refusal', 'if (!s.kept) return null;', 'if (false) return null;'],
  ['⭐⭐ the kept shape is not a snapshot — moving the live shape moves it too, and the comparison collapses',
    'return { n: s.n, k: k, theta: s.theta, rot: s.rot, kept: s.kept };',
    'return { n: s.n, k: k, theta: s.theta, rot: s.rot, kept: { n: s.n, k: k, theta: s.theta, rot: s.rot } };'],
  ['⚠ keeping a shape stores nothing to compare against', 'kept: { n: s.n, k: s.k, theta: s.theta, rot: s.rot } };', 'kept: { n: s.n, k: 0, theta: 90, rot: 0 } };'],

  /* --- the renderer, which the model gate can still see ------------ */
  ['⭐⭐ the shape is fitted to something that BREATHES as it turns, so a rotation visibly changes the size',
    'var sc = GEO.TARGET_R / rr,', 'var sc = GEO.TARGET_R / (rr * (1 + 0.001 * rot)),'],
  ['the shape is fitted to the wrong extent entirely', 'var sc = GEO.TARGET_R / rr,', 'var sc = GEO.TARGET_R / (rr * 0.8),'],
  ['⭐ the vertex order is rotated, so every mark lands on its neighbour',
    'out.push([x * c - y * sn, x * sn + y * c]);', 'out.unshift([x * c - y * sn, x * sn + y * c]);'],

  /* --- the constants that carry the no-verdict law ------------------ */
  ['⭐⭐ the seat travels for a different length of time than the pop — a verdict delivered by production values', 'T_SEAT: 260,', 'T_SEAT: 400,'],
  ['⭐⭐ the pop travels further than the seat, the same defect the other way up', 'T_POP: 260,', 'T_POP: 420,'],
  ['⭐ the seat sounds at a different pitch than the pop — the same verdict, by ear', 'SND_SEAT: 430,', 'SND_SEAT: 700,'],
  ['⚠ the travel the announcement returns is thrown away, so the two named numbers stop being read',
    '      this._paint(this._announceTagChange(before, after));',
    '      this._announceTagChange(before, after);\n      this._paint();'],
  /* ⚠ RE-ANCHORED. This carried `this._paint(GEO.T_TURN)`, which became
     AMBIGUOUS the moment the dial got its own path (_turned and _quarter
     both call it) — and an ambiguous needle mutates a place nobody
     chose. T_DEAL has exactly one call site. */
  ['a motion constant stops being read', 'this._paint(GEO.T_DEAL);', 'this._paint(420);'],
  ['a sound constant stops being read', 'this._snd(GEO.SND_REFUSE, true);', 'this._snd(300, true);'],
  ['⚠ reduced motion SKIPS instead of compressing', 'return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));', 'return 0;'],
  ['⚠ reduced motion does nothing at all', 'return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));', 'return ms;'],
  ['GEO stops being reachable from a gate', '    GEO: GEO,\n', '\n'],
  ['the tool declares tasks, so the shell renders activity chrome', '    premium: false,', '    tasks: [{ id: 1 }],\n    premium: false,'],
  ['the apparatus itself stops being free', '    premium: false,', '    premium: true,'],

  /* --- the stylesheet, which only the source can show --------------- */
  ['⚠⚠ the scroll escape becomes a selector LIST, so its html half is unconditional',
    "'html.shp-scroll{", "'html,body.shp-scroll{"],
  ['the scroll escape loses its html rule', "'html.shp-scroll{", "'html.shp-NOPE{"],
  ['the scroll escape loses its body rule', "'body.shp-scroll{", "'body.shp-NOPE{"],
  ['⚠⚠ the html escape keeps its overflow but loses its HEIGHT, becoming inert against the shell',
    "'html.shp-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'html.shp-scroll{overflow-y:auto}'"],
  ['⚠⚠ the body escape becomes inert the same way',
    "'body.shp-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'body.shp-scroll{overflow-y:auto}'"],
  ['the escape class is never added to the document element', "documentElement.classList.add('shp-scroll');", "documentElement.classList.add('shp-nope');"],
  ['the escape class is never added to the body', "body.classList.add('shp-scroll');", "body.classList.add('shp-nope');"],
  ['⭐⭐ THE TAG TAKES A SECOND HUE — a verdict delivered by colour', "'.shp-tag{stroke:#0E5147;", "'.shp-tag{stroke:#B03A2E;"],
  ['a tag carries a state class, so the pop and the seat stop being indistinguishable',
    "'.shp-tag{stroke:#0E5147;", "'.shp-tag.is-pop{stroke:#B03A2E}',\n        '.shp-tag{stroke:#0E5147;"],
  ['the print sheet stops resetting the shell, so Print prints the whole web page',
    '@media print{.lcs-shell,.shp-wrap{display:none !important}', '@media print{.shp-wrap{display:none !important}'],
  ['a `vh` length reaches the manipulative, where it resolves against a pinned iframe',
    'max-height:46vw}', 'max-height:46vh}'],
  ['⚠⚠ the browser\'s own print command hands the paid sheet over', 'if (!self.premium) { if (self._sheet) self._sheet.innerHTML = \'\'; return; }',
    'if (false) { return; }'],
  ['the print control stops checking entitlement', '_print: function () {\n      if (!this.premium)', '_print: function () {\n      if (false)'],
  ['the rail loses its keyboard door', "rail.addEventListener('keydown'", "rail.addEventListener('keyup2'"],
  ['the rail loses its drag door', "rail.addEventListener('pointermove'", "rail.addEventListener('pointermove2'"],
  ['the rail stops being focusable', "rail.setAttribute('tabindex', '0');", "rail.setAttribute('data-tabindex', '0');"],

  /* --- the refuse-list, which is a gate and not a note -------------- */
  /* ⚠⚠ RE-ANCHORED THREE TIMES OVER, and SELF-ANCHORED now so there is no
     fourth. Round 1: these carried the shape labels' old text, "turned
     {rot} degrees", which the tool struck from every channel (taking
     `_fmt`, the substituter, with it). Round 2: the same for the English
     rewrite of six strings. Round 3: the eleven-locale fold changed the
     quote character and put ten more locales on every line, and SEVEN of
     these needles died at once. Each time the harness FAULTED rather than
     quietly shrinking its own total — which is the only reason any of the
     three was noticed, and is why `enOf` throws instead of returning null.
     The needles below are now read off the live file at load time. */
  ['a sibling tool\'s own noun reaches the product name', ...enSwap('title', 'The Shape Bench')],
  ['the copy starts marking the class right or wrong', ...enSuffix('saidPop', ' That is wrong.')],
  ['an efficacy claim reaches the paid copy', ...enPrefix('lockedBody', 'Proven to raise scores. ')],
  ['a readout another instrument owns reaches the copy', ...enPrefix('instruction', 'Watch the perimeter. ')],
  ['a completeness readout reaches the copy', ...enSuffix('saidKept', ' 1 of 2 done.')],
  ['⭐ the banned degree numeral comes back on the shape label',
    ...enSuffix('ariaShape3', ' Turned 90 degrees.')],
  ['⭐⭐ a placeholder comes back with no substituter left, so a screen reader reads the braces aloud',
    ...enSuffix('ariaShape4', ' Turned {rot}.')],
  ['⭐⭐ a DECLARED AND UNCALLED _fmt comes back — a function with no consumer',
    '    _st: function (st) { return st || this.st; },',
    '    _fmt: function (s, v) { return String(s).replace(/\\{(\\w+)\\}/g, function (m, k) { return (v && v[k] != null) ? String(v[k]) : m; }); },\n    _st: function (st) { return st || this.st; },'],

  /* --- the laws the tool grew while this gate was being written ----- */
  ['⭐⭐ the dial announces its degrees again, on the one channel no string edit can reach',
    "if (key !== 'turn') {", 'if (true) {'],
  ['⭐⭐ the dial plays a DETENT TONE on a rail whose detent set is empty by theorem',
    "if (key === 'turn') { this._turned(); return; }", "if (false) { this._turned(); return; }"],
  ['⭐⭐ Home and End land the ring on a chosen rung — and the only rung anyone would choose is upright',
    "if (key === 'turn') return;", 'if (false) return;'],
  /* ⚠ RE-ANCHORED: this carried the rule's EASING, which changed from
     ease-out to ease-in-out between two runs of this harness. A needle
     that encodes the current text of what it mutates has a half-life —
     so it now names only the animation and the duration it is poisoning. */
  ['⭐⭐ the seat travels longer than the pop — the more exciting animation IS the verdict',
    'shp-seat var(--shp-dur,260ms)', 'shp-seat var(--shp-dur,600ms)'],
  ['⭐ the pop takes a colour, so a hue encodes which of the two happened',
    ".shp-tag.is-pop{animation:", ".shp-tag.is-pop{stroke:#B03A2E;animation:"],
  ['⚠⚠ the travel stops being driven by the duration the model computes, so T_POP names nothing again',
    "animation:shp-pop var(--shp-dur,260ms)", 'animation:shp-pop 260ms'],
  ['⭐ the two keyframes stop being one gesture reversed',
    "'@keyframes shp-seat{from{transform:translate(var(--shp-tx,0px),var(--shp-ty,0px)) rotate(var(--shp-rz,14deg));opacity:0}'",
    "'@keyframes shp-seat{from{transform:translate(var(--shp-tx,0px),var(--shp-ty,0px)) rotate(30deg);opacity:0}'"],
  ['a string map is renamed, so the shell renders the KEY', '      sayTagsBoth: {', '      sayTagsBoth2: {'],

  /* --- totality ------------------------------------------------------ */
  ['⚠ _st has no fallback, so every button press reads undefined', 'return st || this.st;', 'return st;'],
];

function run(dir) {
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { SHP_TOOL_DIR: dir }),
      stdio: 'pipe', timeout: 30000
    });
    return 'PASS';
  } catch (e) {
    if (e.killed || /ETIMEDOUT/.test(String(e.code))) return 'TIMEOUT';
    return 'FAIL';
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'shp-mut-'));
const target = path.join(tmp, 'shape-stretcher.js');

console.log('CONTROL: an unmutated copy must PASS');
fs.writeFileSync(target, ORIGINAL);
const control = run(tmp);
console.log('  control = ' + control);
if (control !== 'PASS') {
  console.log('\n*** THE HARNESS IS BROKEN. Every "kill" below would be meaningless.');
  try { execFileSync(process.execPath, [VERIFY], { env: Object.assign({}, process.env, { SHP_TOOL_DIR: tmp }), stdio: 'inherit' }); } catch (e) { /* printed */ }
  process.exit(1);
}

let killed = 0, survived = 0, faults = 0;
console.log('\n' + MUTATIONS.length + ' mutations:');
for (const [label, find, repl] of MUTATIONS) {
  const needle = find.replace(/\r\n/g, '\n');
  const hits = ORIGINAL.split(needle).length - 1;
  if (hits !== 1) {
    faults++;
    console.log('  ⚠ FAULT  ' + label + ' — needle matched ' + hits + ' times, the mutation is ' +
      (hits === 0 ? 'unrunnable' : 'ambiguous (replace() takes the first)'));
    continue;
  }
  fs.writeFileSync(target, ORIGINAL.replace(needle, repl.replace(/\r\n/g, '\n')));
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
