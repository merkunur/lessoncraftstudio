/* =====================================================================
   verify-number-line.js — the MODEL gate for TOOL #1 (number-line)
   ---------------------------------------------------------------------
   Run:  node scripts/verify-number-line.js [--locales=en,de]
   Tool dir overridable via env NL_TOOL_DIR (mutate- uses it).

   ⭐ THE GROUND TRUTH HERE IS IMPLEMENTED INDEPENDENTLY. Where the tool
   computes how many hops fit by integer division, this gate computes it
   by REPEATED ADDITION and walks the landings one at a time. Reading the
   expectation off the tool is how a gate marks its own homework — #44
   shipped a MIRRORED profile past every gate because the oracle shared
   the tool's own index convention.

   ⭐ AND THE HINT DISPATCH IS DRIVEN, NOT REIMPLEMENTED. `hintKey` is a
   pure model function precisely so this file can call it. #44's inline
   dispatch had to be copied into its gate, and three mutations of the
   real one survived.

   THE GATES:
     V1  every hop in a reachable trail has the SAME length
         ⚠ NON-VACUOUS FIRST: a trail of <2 arcs cannot witness equality,
           so the gate asserts it saw enough multi-arc trails before it
           is allowed to pass. #40 shipped a check that compared two
           EMPTY NodeLists and reported green.
     V2  at the wall a hop is REFUSED, never clamped short
     V3  arc endpoints sit exactly on xOf(from)/xOf(to); the dome is
         capped, floored, and above the axis; sweep keeps a backward hop
         ABOVE the line
     V4  never below zero, by any path (#43 cites this floor by name)
     V5  landings are RECOMPUTED, never stored
     V6  a range chip relabels the axis AND preserves the value
     V7  the numeral ladder never removes a tick or an end, and the
         tick ruling does not move when the numerals do
     V8  no verdict/score/timer word in any locale — POISON-TESTED IN
         BOTH DIRECTIONS, and NOT with \b (ASCII-only, born dead on
         Finnish and Portuguese)
     V9  no dead strings, by ENUMERATION over the reachable space
     V10 no tasks/nextTask, no educationalAlignment, no CCSS code
     V11 the offline fallback IS the free tier; locked records absent
     V12 every repertoire record clears floor((max-s)/|h|) >= 2
     V13 no exfil; the fetch allow-list
     V14 the model is pure, total and deterministic
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const TOOL_DIR = process.env.NL_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const SRC = path.join(TOOL_DIR, 'number-line.js');
const BOOK = path.join(TOOL_DIR, 'number-line-lines.json');

const only = (process.argv.find((a) => a.indexOf('--locales=') === 0) || '').split('=')[1];
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const CHECK_LOCALES = only ? only.split(',') : LOCALES;

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL  ' + m); } };
const head = (s) => console.log('\n' + s);

/* load the tool with no DOM at all — if it touches document at require
   time, that is itself a defect and this throws. */
const T = require(SRC);
const rawSrc = fs.readFileSync(SRC, 'utf8');
const book = JSON.parse(fs.readFileSync(BOOK, 'utf8'));

/* ---------------------------------------------------------------------
   ⭐⭐ STRIP THE COMMENTS BEFORE SCANNING, AND THIS IS NOT A CONVENIENCE.
   The first run of this gate FAILED FIVE ASSERTIONS against a correct
   tool, because the fence checks were matching THE HEADER COMMENT THAT
   DOCUMENTS THE FENCE: the file says "therefore no `educationalAlignment`"
   and names 2.NBT.A.2 / 2.MD.B.6 / 1.OA.C.6 as the activities it is
   fenced AGAINST, and it says "no `&& premiumKnown` on a gate". Every one
   of those is the tool declaring the rule, and the gate read each as a
   violation of it.
   That is the ban-too-wide trap wearing its plainest disguise — a fence
   that condemns the prose describing the fence teaches you to delete the
   documentation. `code()` is what every source scan below reads.
   ⚠ It must respect string literals, or 'http://www.w3.org/2000/svg'
   loses its tail to the line-comment rule and the SVG namespace check
   silently passes on nothing.
   --------------------------------------------------------------------- */
function code(s) {
  let out = '', i = 0, q = null;
  while (i < s.length) {
    const c = s[i], n = s[i + 1];
    if (q) {
      if (c === '\\') { out += '  '; i += 2; continue; }
      if (c === q) q = null;
      out += c; i++; continue;
    }
    if (c === '"' || c === "'" || c === '`') { q = c; out += c; i++; continue; }
    if (c === '/' && n === '*') { const e = s.indexOf('*/', i + 2); const seg = s.slice(i, e < 0 ? s.length : e + 2); out += seg.replace(/[^\n]/g, ' '); i = e < 0 ? s.length : e + 2; continue; }
    if (c === '/' && n === '/') { const e = s.indexOf('\n', i); const stop = e < 0 ? s.length : e; out += ' '.repeat(stop - i); i = stop; continue; }
    out += c; i++;
  }
  return out;
}
const src = code(rawSrc);

/* the stripper is itself poison-tested, or it is just another claim */
{
  const probe = code("var a='http://x/y'; /* educationalAlignment */ var b=1; // 2.NBT.A.2\nvar c=2;");
  if (/educationalAlignment/.test(probe) || /2\.NBT/.test(probe)) {
    console.error('FATAL: the comment stripper does not strip. This gate is not a gate.');
    process.exit(1);
  }
  if (probe.indexOf('http://x/y') < 0) {
    console.error('FATAL: the comment stripper ate a string literal. This gate would pass on nothing.');
    process.exit(1);
  }
}

/* ---------------------------------------------------------------------
   THE INDEPENDENT ORACLE. Repeated addition, one landing at a time —
   deliberately NOT the tool's floor-division.
   --------------------------------------------------------------------- */
function oracleTrail(max, start, hop) {
  const out = [start];
  let v = start;
  let guard = 0;
  for (;;) {
    const next = v + hop;
    if (next < 0 || next > max) break;
    out.push(next);
    v = next;
    if (++guard > 5000) throw new Error('oracle runaway');
  }
  return out;
}
function oracleFits(max, start, hop) {
  const t = oracleTrail(max, start, hop);
  const end = hop > 0 ? max : 0;
  return t[t.length - 1] === end;
}

/* the reachable space, sampled densely enough to be a proof in practice */
const SPACE = [];
for (const max of T.RANGES) {
  const sStep = Math.max(1, Math.floor(max / 11));
  const hStep = Math.max(1, Math.floor(max / 9));
  for (let start = 0; start <= max; start += sStep) {
    for (let h = -max; h <= max; h += hStep) {
      if (h === 0) continue;
      SPACE.push({ max, start, hop: h });
    }
  }
}

/* =====================================================================
   V1 — every hop the same length, and the check is NON-VACUOUS
   ===================================================================== */
head('V1  equal hops');
{
  let multiArc = 0, bad = 0;
  for (const c of SPACE) {
    let st = T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 });
    st = T.allTheWay(st) || st;
    const L = T.landings(st);
    if (L.length >= 3) multiArc++;
    for (let i = 1; i < L.length; i++) if (L[i] - L[i - 1] !== st.hop) bad++;
  }
  /* ⚠ THE NON-VACUITY ASSERT COMES FIRST. Two arcs is the minimum that
     can witness "the same as each other"; without this the whole gate
     passes on a tool that draws no arcs at all. */
  is(multiArc >= 200, 'V1 non-vacuity: saw ' + multiArc + ' trails of >=2 arcs (need >=200)');
  is(bad === 0, 'V1 ' + bad + ' unequal steps across ' + SPACE.length + ' reachable trails');

  /* and it must be UNREACHABLE, not merely absent: changing the hop or
     the start must clear the trail, or a mixed-length trail exists. */
  let mixable = 0;
  for (const c of SPACE.slice(0, 400)) {
    const st = T.allTheWay(T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 }));
    if (!st || st.n < 2) continue;
    const h2 = T.setHop(st, c.hop > 0 ? -1 : 1);
    const s2 = T.setStart(st, st.start === 0 ? 1 : 0);
    if (h2 && h2.n !== 0) mixable++;
    if (s2 && s2.n !== 0) mixable++;
  }
  is(mixable === 0, 'V1 setHop/setStart always clear the trail (' + mixable + ' leaks)');
}

/* =====================================================================
   V2 — the wall REFUSES; it never clamps
   ===================================================================== */
head('V2  refuse at the wall');
{
  let bad = 0, walls = 0;
  for (const c of SPACE) {
    const full = T.allTheWay(T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 }))
      || T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 });
    if (!T.atWall(full)) { bad++; continue; }
    walls++;
    if (T.hop(full) !== null) bad++;            /* must refuse */
    if (T.allTheWay(full) !== null) bad++;
    /* and the trail the oracle says exists is exactly the trail we have */
    const o = oracleTrail(c.max, c.start, c.hop);
    const L = T.landings(full);
    if (o.length !== L.length) bad++;
    else for (let i = 0; i < o.length; i++) if (o[i] !== L[i]) bad++;
  }
  is(walls > 300, 'V2 non-vacuity: reached the wall ' + walls + ' times');
  is(bad === 0, 'V2 ' + bad + ' clamps / trail mismatches vs the repeated-addition oracle');

  /* a short final arc must not exist anywhere */
  let shortArc = 0;
  for (const c of SPACE) {
    const full = T.allTheWay(T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 }))
      || T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 });
    const L = T.landings(full);
    for (let i = 1; i < L.length; i++) if (Math.abs(L[i] - L[i - 1]) !== Math.abs(full.hop)) shortArc++;
  }
  is(shortArc === 0, 'V2 no short final arc exists in any reachable state');
}

/* =====================================================================
   V3 — the arc geometry
   ===================================================================== */
head('V3  arcs');
{
  let bad = 0, drawn = 0;
  const num = (s) => s.split(/[MAL ]+/).filter((x) => x !== '').map(Number);
  for (const c of SPACE) {
    const st = T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 });
    const to = c.start + c.hop;
    if (to < 0 || to > c.max) continue;
    drawn++;
    const d = T.arcPath(st, c.start, to);
    const x1 = T.xOf(st, c.start), x2 = T.xOf(st, to);
    /* endpoints, read out of the emitted path string */
    const parts = num(d);
    if (Math.abs(parts[0] - x1) > 0.02) bad++;
    if (d.indexOf('A') >= 0 && Math.abs(parts[parts.length - 2] - x2) > 0.02) bad++;
    if (Math.abs(parts[1] - T.AXIS_Y) > 1e-9) bad++;
    /* the dome: capped, floored, above the axis */
    const ry = T.arcRy(st, c.start, to);
    if (ry < T.ARC_MIN - 1e-9 || ry > T.ARC_MAX + 1e-9) bad++;
    /* ⚠ THE APEX IS CHECKED AGAINST THE PATH'S OWN ry, NOT AGAINST
       arcRy. Comparing `arcApex` to `arcRy` is the tool agreeing with
       itself — a mutation that halved the apex survived that version,
       because both sides moved together. The ry parsed out of the
       emitted `A` command is what the browser will actually draw. */
    const apex = T.arcApex(st, c.start, to);
    if (d.indexOf('A') >= 0) {
      const pathRy = parts[3];
      if (Math.abs((T.AXIS_Y - apex.y) - pathRy) > 0.02) bad++;
      if (Math.abs(apex.x - (x1 + x2) / 2) > 0.02) bad++;
    }
    if (!(apex.y < T.AXIS_Y)) bad++;
    if (apex.y < 0) bad++;                       /* never domes off the top */
    /* ⚠ SWEEP: a backward hop must stay ABOVE the line, not flip under */
    if (d.indexOf('A') >= 0) {
      const want = (to >= c.start) ? ' 1 ' : ' 0 ';
      if (d.indexOf('0 0' + want) < 0) bad++;
    }
  }
  is(drawn > 300, 'V3 non-vacuity: measured ' + drawn + ' arcs');
  is(bad === 0, 'V3 ' + bad + ' geometry defects');

  /* ⚠ xOf ITSELF, ANCHORED — not just "the arc agrees with xOf". A
     mutation that dropped the inset moved the arc and the reference
     together and survived: the tool marking its own homework. The
     anchors are the two things the map is FOR. */
  for (const max of T.RANGES) {
    const st = T._st({ max, start: 0, hop: 1, n: 0 });
    is(Math.abs(T.xOf(st, 0) - T.INSET) < 1e-9, 'V3 xOf(0) is the inset (max ' + max + ')');
    is(Math.abs(T.xOf(st, max) - (T.W - T.INSET)) < 1e-9, 'V3 xOf(max) is W-inset (max ' + max + ')');
    /* affine, and strictly increasing */
    let mono = true, lin = true;
    const step = Math.max(1, Math.floor(max / 20));
    let prevX = -Infinity, d0 = null;
    for (let v = 0; v <= max; v += step) {
      const x = T.xOf(st, v);
      if (x <= prevX) mono = false;
      if (prevX > -Infinity) { const d = x - prevX; if (d0 === null) d0 = d; else if (Math.abs(d - d0) > 1e-6) lin = false; }
      prevX = x;
    }
    is(mono, 'V3 xOf is strictly increasing (max ' + max + ')');
    is(lin, 'V3 xOf is affine — no squash anywhere (max ' + max + ')');
  }

  /* congruence: equal |hop| gives an equal dome, wherever it sits */
  let inc = 0;
  for (const max of T.RANGES) {
    for (const h of [1, 2, 5, Math.max(1, Math.floor(max / 4))]) {
      const st = T._st({ max, start: 0, hop: h, n: 0 });
      const trail = oracleTrail(max, 0, h);
      const r0 = T.arcRy(st, trail[0], trail[1]);
      for (let i = 1; i < trail.length - 1; i++) {
        if (Math.abs(T.arcRy(st, trail[i], trail[i + 1]) - r0) > 1e-9) inc++;
      }
    }
  }
  is(inc === 0, 'V3 congruence: every dome in a trail is identical (' + inc + ' outliers)');
}

/* =====================================================================
   V4 — never below zero
   ===================================================================== */
head('V4  the floor');
{
  is(T.DMIN === 0, 'V4 DMIN is 0');
  let neg = 0;
  for (const c of SPACE) {
    const full = T.allTheWay(T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 }))
      || T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 });
    for (const v of T.landings(full)) if (v < 0 || v > c.max) neg++;
  }
  is(neg === 0, 'V4 ' + neg + ' landings outside [0,max]');
  /* and no reducer can be talked below it */
  const s0 = T._st({ max: 20, start: 0, hop: 5, n: 0 });
  is(T.setStart(s0, -1) === null, 'V4 setStart(-1) refuses');
  is(T._st({ max: 20, start: -99, hop: 5, n: 0 }).start === 0, 'V4 _st clamps a negative start');
  is(T.hop(T._st({ max: 20, start: 0, hop: -5, n: 0 })) === null, 'V4 a backward hop from 0 refuses');
}

/* =====================================================================
   V5 — landings recomputed, never stored
   ===================================================================== */
head('V5  derived state');
{
  is(!/landings\s*:\s*\[/.test(src), 'V5 no stored landings array in the source');
  const a = T._st({ max: 100, start: 10, hop: 10, n: 3 });
  const b = JSON.parse(JSON.stringify(a));
  is(JSON.stringify(T.landings(a)) === JSON.stringify(T.landings(b)),
    'V5 landings depend only on (max,start,hop,n)');
  is(Object.keys(a).sort().join(',') === 'hop,max,n,start', 'V5 the state has exactly four fields');
}

/* =====================================================================
   V6 — the range chip has a CONSEQUENCE, and it is the axis
   ===================================================================== */
head('V6  the range chip');
{
  let moved = 0, kept = 0, bad = 0;
  for (const from of T.RANGES) {
    for (const to of T.RANGES) {
      if (from === to) { is(T.setMax(T._st({ max: from, start: 0, hop: 1, n: 0 }), to) === null,
        'V6 same range refuses (' + from + ')'); continue; }
      const st = T._st({ max: from, start: Math.min(3, from), hop: 1, n: 0 });
      const n = T.setMax(st, to);
      if (!n) { bad++; continue; }
      if (n.max !== to) bad++;
      /* the value is PRESERVED where it still fits — the same number
         landing in a new place is the whole consequence */
      if (Math.min(3, from) <= to && n.start !== Math.min(3, from)) bad++; else kept++;
      /* and it lands somewhere else on screen, which is the visible part */
      const xBefore = T.xOf(st, n.start);
      const xAfter = T.xOf(n, n.start);
      if (Math.abs(xBefore - xAfter) > 0.5) moved++;
    }
  }
  is(bad === 0, 'V6 ' + bad + ' defects');
  is(kept >= 10, 'V6 the value is preserved across ' + kept + ' range changes');
  is(moved >= 10, 'V6 and it RELABELS the axis: the value moved on screen ' + moved + ' times');
}

/* =====================================================================
   V7 — the numeral ladder
   ===================================================================== */
head('V7  the numeral ladder');
{
  let bad = 0;
  for (const max of T.RANGES) {
    const ruling = [];
    for (let v = 0; v <= max; v += T.tickStep(max)) ruling.push(v);
    let prev = Infinity;
    for (let stop = 0; stop < T.NUM_STOPS; stop++) {
      const labels = T.labelsFor({ max }, stop);
      if (labels.indexOf(0) < 0) bad++;               /* both ends, always */
      if (labels.indexOf(max) < 0) bad++;
      if (labels.length > prev) bad++;                /* monotonically fewer */
      prev = labels.length;
      for (const v of labels) if (ruling.indexOf(v) < 0) bad++;  /* on a tick */
      /* ⚠ THE TICKS MUST NOT MOVE WHEN THE NUMERALS DO, and this has to
         be checked by ACTUALLY MOVING THE LADDER. The first version
         recomputed the ruling with the same `tickStep(max)` call inside
         the same loop, so a tickStep that read `this._numStop` changed
         both sides at once and the mutation walked straight through. */
      const before = T._numStop;
      T._numStop = stop;
      const r2 = [];
      for (let v = 0; v <= max; v += T.tickStep(max)) r2.push(v);
      T._numStop = before;
      if (r2.join() !== ruling.join()) bad++;
    }
    /* a major tick is a NUMBERED tick — derived, never typed twice */
    if (T.majorStep(max) !== T.labelStep(max, 0)) bad++;
  }
  is(bad === 0, 'V7 ' + bad + ' ladder defects');
  is(T.labelsFor({ max: 100 }, 2).length === 2, 'V7 the last stop is the two ends only');
}

/* =====================================================================
   V8 — no verdict vocabulary, POISON-TESTED IN BOTH DIRECTIONS
   ===================================================================== */
head('V8  content ban');
{
  /* ⚠ NOT \b — it is ASCII-only, so \bpiste\b can never match a Finnish
     case ending and the ban would be born dead. Unicode lookaround. */
  const W = (s) => new RegExp('(?<!\\p{L})' + s + '(?!\\p{L})', 'iu');
  /* ⚠⚠ THE BAN IS LOCALE-SCOPED, AND THE THIRD BAN-TOO-WIDE DEFECT OF
     THIS BUILD IS WHY. A flat cross-locale list condemned the FRENCH
     `point de départ` — "starting point", the most ordinary phrase in the
     tool — because `point` is a Danish score word. Two before it: the
     fence checks matched the header comment that documents the fence,
     and a Norwegian ban would have killed the arc noun.
     ⚠ `juste` and `fel` are also out: fr `les bonds tombent juste`
     means "come out even" (the exact mathematics), and sv `fel` is a
     substring hazard in ordinary compounds. A ban that rejects correct
     native prose teaches a panel to write around it instead of
     reporting it. */
  const SHARED = ['correct', 'incorrect', 'wrong', 'right answer', 'well done',
    'score', 'timer', 'streak'];
  const PER_LOCALE = {
    de: ['richtig', 'falsch', 'punkte'],
    fr: ['bravo', 'bonne réponse', 'mauvaise réponse'],
    it: ['corretto', 'sbagliato', 'punteggio', 'bravo'],
    es: ['correcto', 'incorrecto', 'puntos'],
    pt: ['correto', 'errado', 'pontos'],
    nl: ['goed zo', 'fout', 'punten'],
    sv: ['rätt', 'poäng'],
    /* ⚠⚠ THE MARE, AND IT LIVES IN BOTH FILES ON PURPOSE. `en hoppe` is
       A MARE, so `hoppen`/`hoppene` read as "the mare"/"the mares" — and
       in bokmål the plural collides with "the hops" exactly. The Nordic
       panel engineered it out of their strings; I then walked into it
       myself writing the trail-wipe clause afterwards, and `apply-`
       caught me. It is repeated here because a rule that lives in one
       file gets half-fixed: `apply-` guards what is WRITTEN, `verify-`
       guards what is SHIPPED, and `mutate-` only ever runs `verify-`. */
    da: ['rigtigt', 'forkert', 'point', 'points', 'hoppen', 'hoppene'],
    no: ['riktig', 'feil', 'poeng', 'hoppen', 'hoppene'],
    /* ⚠ `hyppy*` is `open-number-line`'s shipped Finnish TITLE
       (`Piirrä hypyt`) — a sibling's name, not a verdict, but banned all
       the same. Finnish uses `loikka`. */
    fi: ['oikein', 'väärin', 'pisteet', 'hyppy\\p{L}*']
  };
  const banFor = (loc) => SHARED.concat(PER_LOCALE[loc] || []).map(W);
  const BAN = SHARED.map(W);

  /* ⭐ POISON, BOTH DIRECTIONS. A ban is only trustworthy when it has
     been shown to FIRE on something it must catch AND to PASS something
     it must not. The Draw Bag defect was a ban wide enough to reject a
     German panel's own correct register; the Cold Line defect was one
     too narrow to catch a Norwegian plural. */
  const MUST_FIRE = [
    ['de', 'Das ist richtig!'], ['en', 'Well done!'], ['fi', 'Oikein!'],
    ['fi', 'Se on väärin'], ['sv', 'Din poäng: 4'], ['da', 'Du fik 4 point'],
    ['es', '¡Correcto!'], ['nl', 'Goed zo!'],
    ['no', 'forsvinner hoppene som allerede er tegnet'],   /* the mare */
    ['da', 'Se på hoppen'],
    ['fi', 'Paina Hyppy']                                   /* the sibling's title */
  ];
  const MUST_PASS = [
    ['de', 'Jede Sprungweite ist gleich lang.'],
    ['fi', 'Jokainen loikka on yhtä pitkä.'],
    ['fr', 'Point de départ du lapin.'],          /* the ban-too-wide case */
    ['fr', 'Les bonds tombent juste : il ne reste rien.'],
    ['nl', 'De sprongen zijn even lang.'],
    ['sv', 'Det gick jämnt ut — ingenting blev över.'],
    ['no', 'Det gikk akkurat opp.'],
    ['da', 'Det gik lige op.'],
    ['pt', 'Os saltos deram certinho.'],
    ['it', 'I balzi tornano esatti.'],
    /* ⚠ the NEUTER singular must survive — only the definite is a mare */
    ['no', 'Dra i hoppet for å bestemme hvor langt ett hopp er.'],
    ['da', 'Træk i hoppet, hvert hop er lige langt.'],
    ['fi', 'Vedä loikkaa ja päätä, kuinka pitkä loikka on.']
  ];
  let pf = 0;
  for (const [loc, s] of MUST_FIRE) if (!banFor(loc).some((r) => r.test(s))) { pf++; console.error('  POISON: ' + loc + ' ban did NOT fire on "' + s + '"'); }
  for (const [loc, s] of MUST_PASS) { const hit = banFor(loc).find((r) => r.test(s)); if (hit) { pf++; console.error('  POISON: ' + loc + ' ban wrongly fired on "' + s + '" via ' + hit); } }
  is(pf === 0, 'V8 the ban is poison-tested in both directions, per locale');

  /* ⚠ AND `hop`/`jump` ARE NOT BANNED. They are this tool's own subject
     word, the printable family's English uses "hop" five times, and the
     Finnish and Dutch panels need theirs. Banning the subject is the
     recorded ban-too-wide trap; we ban the VERDICT. */
  is(!BAN.some((r) => r.test('hop')) && !BAN.some((r) => r.test('jump')),
    'V8 the subject word is NOT banned');

  let hits = 0;
  for (const k of Object.keys(T.strings)) {
    for (const loc of CHECK_LOCALES) {
      const v = T.strings[k][loc];
      if (v === undefined) continue;
      if (typeof v !== 'string' || !v.trim()) { hits++; console.error('  V8 empty ' + k + '.' + loc); continue; }
      const bad = banFor(loc).find((r) => r.test(v));
      if (bad) { hits++; console.error('  V8 ' + k + '.' + loc + ' matched ' + bad); }
      if (/['"]/.test(v) && !/[‘’“”]/.test(v) && /'/.test(v)) {
        hits++; console.error('  V8 straight apostrophe in ' + k + '.' + loc);
      }
      if (/-\d/.test(v)) { hits++; console.error('  V8 hyphen used as a minus in ' + k + '.' + loc); }
    }
  }
  is(hits === 0, 'V8 ' + hits + ' string defects across ' + CHECK_LOCALES.length + ' locale(s)');

  /* every checked locale is present for every key */
  let missing = 0;
  for (const k of Object.keys(T.strings)) {
    for (const loc of CHECK_LOCALES) if (T.strings[k][loc] === undefined) { missing++; }
  }
  is(missing === 0, 'V8 ' + missing + ' missing (key, locale) pairs');
}

/* =====================================================================
   V9 — no dead strings, BY ENUMERATION
   ===================================================================== */
head('V9  string reachability');
{
  /* the four hints are proved reachable by driving the SHIPPED dispatch
     over the whole space — not by grepping for t('hintWall'). */
  const seen = new Set();
  for (const c of SPACE) {
    const base = T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 });
    seen.add(T.hintKey(base));
    const full = T.allTheWay(base) || base;
    seen.add(T.hintKey(full));
    if (full.n > 1) seen.add(T.hintKey({ max: full.max, start: full.start, hop: full.hop, n: 1 }));
  }
  for (const k of ['hintSetHop', 'hintGoing', 'hintExact', 'hintWall', 'hintNoRoom']) {
    is(seen.has(k), 'V9 ' + k + ' is reachable');
  }
  is(seen.size === 5, 'V9 the dispatch returns exactly the five authored hints');

  /* ⚠ AND hintWall MUST BE REACHABLE BACKWARDS, from the SHIPPED book.
     A native panel found that both backward records divided their line
     exactly, so the one string carrying the leftover-space thesis could
     never appear in the direction children find hardest. Reachable in
     principle is not reachable in the product. */
  const backGap = book.lines.filter((r) => r.h < 0)
    .some((r) => T.hintKey(T.allTheWay(T._st({ max: r.max, start: r.s, hop: r.h, n: 0 }))
      || T._st({ max: r.max, start: r.s, hop: r.h, n: 0 })) === 'hintWall');
  is(backGap, 'V9 hintWall is reachable BACKWARDS from a shipped record');

  /* Every other authored key must at least APPEAR in the code.
     ⚠ AND THIS IS THE WEAK HALF OF THE CHECK, SAID OUT LOUD. A key can
     be reached through a variable — `_grip(rail, cls, ariaKey)` calls
     `api.t(ariaKey)`, so `t('startAria')` appears nowhere and the first
     version of this assertion condemned two perfectly live strings.
     Matching the literal anywhere fixes the false alarm but weakens the
     check to "the key is mentioned", which is #39's defeated grep: a
     `t()` call in a DEAD BRANCH still passes.
     ⭐ SO THE REAL REACHABILITY PROOF LIVES IN local-test-number-line.js,
     which drives the tool over a state matrix with a RECORDING PROXY over
     the strings object and requires every authored key to be asked for.
     This half only catches a key nobody wired up at all. */
  const KNOWN_SHELL = ['title', 'instruction'];   /* the shell reads these itself */
  let dead = 0;
  for (const k of Object.keys(T.strings)) {
    if (KNOWN_SHELL.indexOf(k) >= 0) continue;
    if (k.indexOf('hint') === 0) continue;        /* proved by enumeration above */
    if (src.indexOf("'" + k + "'") < 0 && src.indexOf('"' + k + '"') < 0) {
      dead++; console.error('  V9 authored but never referenced in code: ' + k);
    }
  }
  is(dead === 0, 'V9 ' + dead + ' unwired strings (runtime reachability is local-test-\'s job)');
}

/* =====================================================================
   V10 — ungraded, and that is what holds the fence
   ===================================================================== */
head('V10 ungraded');
{
  is(T.tasks === undefined, 'V10 no tasks');
  is(T.nextTask === undefined, 'V10 no nextTask');
  is(!/educationalAlignment/.test(src), 'V10 no educationalAlignment');
  /* ⚠ a CCSS code anywhere would collide with three shipped activities */
  is(!/\b[K1-8]\.(OA|NBT|MD|G|CC|NF|RF)\.[A-C]?\.?\d/.test(src), 'V10 no CCSS code');
  is(!/settings\s*:\s*\[\s*\{/.test(src), 'V10 no shell settings drawer');
  const VERDICT_UI = /\bcheckBtn\b|\bscore\b|\bstreak\b|setInterval\s*\(\s*[^)]*tick/i;
  is(!VERDICT_UI.test(src), 'V10 no verdict/score/timer machinery');
}

/* =====================================================================
   V11 — the offline fallback IS the free tier
   ===================================================================== */
head('V11 free tier');
{
  const fb = T.FALLBACK_LINES;
  is(fb && fb.lines && fb.lines.length === T.FREE_LINES,
    'V11 FALLBACK_LINES holds exactly the ' + T.FREE_LINES + ' free records');
  is(fb.freeCount === book.freeCount, 'V11 fallback freeCount matches the book');
  for (let i = 0; i < fb.lines.length; i++) {
    is(JSON.stringify(fb.lines[i]) === JSON.stringify(book.lines[i]),
      'V11 fallback record ' + i + ' is byte-identical to the book');
  }
  /* locked records are ABSENT from the array, never merely hidden */
  const inst = Object.create(T);
  inst.premium = false; inst._book = book;
  const free = inst._lines();
  is(free.length === book.freeCount, 'V11 a free visitor sees ' + free.length + ' records');
  inst.premium = true;
  is(inst._lines().length === book.lines.length, 'V11 a subscriber sees all ' + book.lines.length);
  is(!/display\s*:\s*none[^;]*lock/i.test(src), 'V11 locked records are absent, not hidden');
  /* UNKNOWN IS PESSIMISTIC — no `&& premiumKnown` guarding a gate.
     ⚠ `(this\.)?` was too narrow: every gate in this file is inside a
     closure and says `self.`, so the mutation sailed through the check
     written to catch it. Match either receiver, or neither. */
  is(!/premiumKnown\s*&&/.test(src) && !/&&\s*(?:(?:this|self)\.)?premiumKnown/.test(src),
    'V11 no premiumKnown on a gate (unknown is pessimistic)');
}

/* =====================================================================
   V12 — every repertoire record can witness the claim
   ===================================================================== */
head('V12 repertoire');
{
  let bad = 0;
  const ids = new Set();
  for (const r of book.lines) {
    if (T.RANGES.indexOf(r.max) < 0) { bad++; console.error('  V12 bad max ' + r.id); }
    if (r.s < 0 || r.s > r.max) { bad++; console.error('  V12 bad start ' + r.id); }
    if (!r.h) { bad++; console.error('  V12 zero hop ' + r.id); }
    if (ids.has(r.id)) { bad++; console.error('  V12 duplicate id ' + r.id); }
    ids.add(r.id);
    /* ⚠ THE CLAIM IS "every hop is the same length". One arc cannot be
       the same length as anything, so a one-hop record is vacuous. */
    const n = oracleTrail(r.max, r.s, r.h).length - 1;
    if (n < 2) { bad++; console.error('  V12 vacuous (' + n + ' hop) record ' + r.id); }
  }
  is(bad === 0, 'V12 ' + bad + ' record defects across ' + book.lines.length);
  /* the free five must between them reach every claim the header makes */
  const free = book.lines.slice(0, book.freeCount);
  is(free.some((r) => oracleFits(r.max, r.s, r.h)), 'V12 free set contains a hop that FITS');
  is(free.some((r) => !oracleFits(r.max, r.s, r.h)), 'V12 free set contains a hop that leaves a GAP');
  is(free.some((r) => r.h < 0), 'V12 free set contains a BACKWARD hop');
  is(new Set(free.map((r) => r.max)).size >= 2, 'V12 free set spans more than one range');
}

/* =====================================================================
   V13 — no exfil
   ===================================================================== */
head('V13 network');
{
  const fetches = (src.match(/fetch\((['"`])([^'"`]+)\1/g) || [])
    .map((m) => m.replace(/^fetch\(['"`]/, '').replace(/['"`]$/, ''));
  const ALLOW = ['/api/auth/me', '/mini-tools/number-line-lines.json'];
  for (const f of fetches) is(ALLOW.indexOf(f) >= 0, 'V13 fetch allow-list: ' + f);
  is(fetches.length === ALLOW.length, 'V13 exactly ' + ALLOW.length + ' fetches');
  is(!/XMLHttpRequest|sendBeacon|WebSocket|new Image\(\)/.test(src), 'V13 no other transport');
  is(!/\bhttps?:\/\/(?!www\.w3\.org)/.test(src), 'V13 no absolute external URL');
}

/* =====================================================================
   V14 — pure, total, deterministic
   ===================================================================== */
head('V14 purity');
{
  is(!/Math\.random|Date\.now\(\)(?![^\n]*checkedAt)|new Date\(\)(?!\.toISOString)/.test(
    src.replace(/_fetchEntitlement[\s\S]*?\n    \},/, '')), 'V14 no randomness in the model');

  /* TOTAL: every shape of garbage maps to a legal state */
  const JUNK = [null, undefined, 0, '', [], NaN, Infinity, -0, {}, { max: 'x' },
    { max: 20, start: NaN, hop: Infinity, n: -5 }, { max: 1e9, start: 1e9, hop: 1e9, n: 1e9 }];
  let bad = 0;
  for (const j of JUNK) {
    let s;
    try { s = T._st(j); } catch (e) { bad++; console.error('  V14 threw on ' + JSON.stringify(j)); continue; }
    if (T.RANGES.indexOf(s.max) < 0) bad++;
    if (!(s.start >= 0 && s.start <= s.max)) bad++;
    if (!Number.isInteger(s.hop) || s.hop === 0) bad++;
    if (!(s.n >= 0)) bad++;
    /* and every derived read must survive it too */
    try { T.landings(s); T.at(s); T.gap(s); T.fitsExactly(s); T.hintKey(s); T.arcPath(s, 0, 1); }
    catch (e) { bad++; console.error('  V14 derived read threw on ' + JSON.stringify(j)); }
  }
  is(bad === 0, 'V14 ' + bad + ' totality defects');

  /* IMMUTABLE: no reducer mutates its input */
  let mut = 0;
  for (const c of SPACE.slice(0, 300)) {
    const st = T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 });
    const before = JSON.stringify(st);
    T.hop(st); T.allTheWay(st); T.setHop(st, 2); T.setStart(st, 1); T.setMax(st, 100);
    if (JSON.stringify(st) !== before) mut++;
  }
  is(mut === 0, 'V14 ' + mut + ' reducers mutated their input');

  /* DETERMINISTIC */
  let nd = 0;
  for (const c of SPACE.slice(0, 300)) {
    const a = JSON.stringify(T.landings(T.allTheWay(T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 })) || {}));
    const b = JSON.stringify(T.landings(T.allTheWay(T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 })) || {}));
    if (a !== b) nd++;
  }
  is(nd === 0, 'V14 ' + nd + ' non-deterministic results');

  /* ⚠ NO SOURCE-SCAN FOR "0 LINES TO THE SHELL" HERE, DELIBERATELY.
     The first version asserted the string `lcs-shell` never appears in
     code and failed a CORRECT tool: the print block MUST hide
     `.lcs-header`, which is the shell's own node and is exactly what a
     print sheet is required to suppress. Referencing a shell SELECTOR is
     not modifying the shell.
     The real invariant is a GIT DIFF, not a grep, and it is asserted in
     the definition of done. Stated here so the omission is a decision on
     the record rather than a gap. */
  is(!/require\(.*lcs-shell/.test(src) && !/lcs-shell\.(js|css)['"]/.test(src),
    'V14 the tool does not load or rewrite the shell');
}

/* ---- the derivation this gate and local-test- agree on ---------------- */
head('the ruling, derived');
for (const m of T.RANGES) {
  console.log('  max ' + String(m).padStart(4) +
    '  tick every ' + String(T.tickStep(m)).padStart(3) +
    '  numeral every ' + String(T.labelStep(m, 0)).padStart(3) +
    '  -> ' + String(T.labelsFor({ max: m }, 0).length).padStart(2) + ' numerals' +
    '  (a numeral every ' + (T.labelStep(m, 0) / m * (T.W - 2 * T.INSET)).toFixed(0) +
    ' model units; ~' + (T.labelStep(m, 0) / m * 296).toFixed(0) + 'px at a 320px viewport)');
}

console.log('\n' + (FAIL ? 'FAIL' : 'PASS') + '  ' + PASS + ' passed, ' + FAIL + ' failed');
process.exit(FAIL ? 1 : 0);
