#!/usr/bin/env node
/* =====================================================================
   verify-wodb.js — MEASURED build-gate for Which One Doesn't Belong.
   Fix the tool, never the gate.

   ⭐⭐ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH. It never calls the
   tool's own helper to decide what the tool's answer should be — reading
   the expectation off the artefact means the gate marks its own
   homework, which is how 19 of 51 mutations survived on number-sieve.
   The quarter-turn is recomputed here from a hand-written permutation;
   the weekly rotation is recomputed from an independently-written ISO
   week; the deck is rebuilt by filtering the raw payload.

   ⚠ This file supersedes verify-wodb-grids.js, which could only reach
   the STRINGS and the DATA — it ran the tool through a `vm` sandbox with
   a fake document, because wodb.js was not requirable in Node. It is
   now, so the MODEL is reachable and can be enumerated.

   V1  TOTALITY      turnCells / reasonListFor / reasonedCount / deckFor /
                     featuredIdFor survive junk without throwing
   V2  THE TURN      it is a real quarter turn, turn^4 = identity, and
                     turn^1..3 never fix all four corners
   V3  THE DECK      band-scoped, ordered, and it NEVER contains a grid
                     from another band
   V4  THE ROTATION  deterministic, band-scoped, and it covers the whole
                     band over enough weeks
   V5  FREE GATE     a ?grid= deep link cannot reach a grid the free tier
                     was never given; and what it WAS given, it keeps
   V6  REASONS       arrays, legacy shapes, and reasonedCount agree
   V7  RENDER        every cell kind renders; dots draw exactly n; the
                     clock's hand angles are exact
   V8  NO VERDICT    the no-shame lock, in all 11 locales
   V9  ONE INK       colour cannot be an answer (delegates to the palette
                     gate's law, re-checked here so a mutation to the
                     renderer is caught by BOTH)
   V10 STRINGS       every key the tool ASKS FOR exists, and every key
                     authored is REACHED — by driving the builders, not
                     by grepping the source
   V11 SHAPES        every shape is well-formed and optically balanced
   V12 STRUCTURE     0 protected-core imports; no `tasks`; print block

   Usage: node scripts/verify-wodb.js
   Override for mutation testing: WDB_TOOL_DIR
   Exit 1 on any ERROR.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.WDB_TOOL_DIR || path.join(ROOT, 'mini tools');
const TOOL_JS = path.join(TOOL_DIR, 'wodb.js');
const SRC = fs.readFileSync(TOOL_JS, 'utf8');
delete require.cache[require.resolve(TOOL_JS)];
const T = require(TOOL_JS);
const DATA = JSON.parse(fs.readFileSync(path.join(TOOL_DIR, 'wodb-grids.json'), 'utf8'));

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
let ERRORS = 0, PASS = 0;
const err = (m) => { ERRORS++; console.log('  FAIL  ' + m); };
const ok = (m) => { PASS++; if (!process.env.WDB_QUIET) console.log('  ok    ' + m); };

/* ⚠⚠ CAPTURED AT LOAD, BEFORE ANY ASSERTION CAN TOUCH IT. A mutation
   that empties a constant can otherwise be repaired by the gate's own
   later reads and survive. */
const DECLARED_BANDS = (T.BANDS || []).slice();
const DECLARED_INK = T.INK;

/* ── the gate's own ground truth, written index-first so it does not
      share a loop shape with the tool ─────────────────────────────── */
const oTurn = (c) => {          /* clockwise: TL->TR, TR->BR, BR->BL, BL->TL */
  const o = new Array(4);
  o[1] = c[0]; o[3] = c[1]; o[2] = c[3]; o[0] = c[2];
  return o;
};
function oIsoWeek(d) {          /* an independent implementation */
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dow = (t.getUTCDay() + 6) % 7;
  t.setUTCDate(t.getUTCDate() - dow + 3);
  const jan4 = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  return 1 + Math.round(((t - jan4) / 86400000 - 3 + ((jan4.getUTCDay() + 6) % 7)) / 7);
}

console.log('verify-wodb — ' + TOOL_DIR);

/* ══════════════ V1 TOTALITY ══════════════ */
(function V1() {
  const junk = [undefined, null, 0, '', 'x', {}, [], [1, 2], { length: 4 }, NaN, true];
  let threw = 0;
  for (const j of junk) {
    try { T.turnCells(j); } catch (e) { threw++; err('V1 turnCells threw on ' + JSON.stringify(j)); }
    try { T.reasonListFor(j, 0, 'en'); } catch (e) { threw++; err('V1 reasonListFor threw on ' + JSON.stringify(j)); }
    try { T.reasonedCount(j, 'en'); } catch (e) { threw++; err('V1 reasonedCount threw on ' + JSON.stringify(j)); }
    try { T.deckFor(j, 'K'); } catch (e) { threw++; err('V1 deckFor threw on ' + JSON.stringify(j)); }
    try { T.featuredIdFor(j, 'K', new Date(2026, 0, 5)); } catch (e) { threw++; err('V1 featuredIdFor threw'); }
  }
  /* out-of-range indices must return empty, not throw and not invent */
  for (const i of [-1, 4, 99, NaN]) {
    const r = T.reasonListFor(DATA.grids[0], i, 'en');
    if (!Array.isArray(r) || r.length) err('V1 reasonListFor(' + i + ') returned ' + JSON.stringify(r));
  }
  if (!threw) ok('V1 the model is total over ' + junk.length + ' junk inputs and 4 bad indices');
}());

/* ══════════════ V2 THE TURN ══════════════ */
(function V2() {
  const c = ['a', 'b', 'c', 'd'];
  const got = T.turnCells(c);
  const want = oTurn(c);
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    err('V2 turnCells gave ' + JSON.stringify(got) + ', the gate computes ' + JSON.stringify(want));
    return;
  }
  /* turn^4 = identity is the property a wrong permutation cannot also
     satisfy — a mirror or a transpose fails it */
  let x = c.slice();
  for (let i = 0; i < 4; i++) x = T.turnCells(x);
  if (JSON.stringify(x) !== JSON.stringify(c)) { err('V2 four turns are not the identity'); return; }
  /* and no intermediate turn may be the identity, or the free control
     would silently do nothing */
  let y = c.slice();
  for (let i = 1; i <= 3; i++) {
    y = T.turnCells(y);
    if (JSON.stringify(y) === JSON.stringify(c)) { err('V2 turn^' + i + ' is the identity — Turn it would appear dead'); return; }
    let fixed = 0;
    for (let k = 0; k < 4; k++) if (y[k] === c[k]) fixed++;
    if (fixed) err('V2 turn^' + i + ' leaves ' + fixed + ' corner(s) in place');
  }
  /* it must not mutate its argument — the tool copies the grid around it */
  const orig = ['a', 'b', 'c', 'd'];
  T.turnCells(orig);
  if (JSON.stringify(orig) !== JSON.stringify(['a', 'b', 'c', 'd'])) err('V2 turnCells mutates its argument');
  ok('V2 the turn is a real quarter turn; turn^4 = identity; turn^1..3 fix nothing');
}());

/* ══════════════ V3 THE DECK ══════════════ */
(function V3() {
  if (!DECLARED_BANDS.length) { err('V3 the tool declares no BANDS'); return; }
  let total = 0;
  for (const b of DECLARED_BANDS) {
    const deck = T.deckFor(DATA, b);
    total += deck.length;
    /* the gate rebuilds it independently */
    const want = DATA.grids.filter((g) => g.band === b).map((g) => g.id);
    if (JSON.stringify(deck) !== JSON.stringify(want)) {
      err('V3 deckFor(' + b + ') = ' + deck.length + ' ids; the gate computes ' + want.length);
    }
    /* ⭐ the load-bearing one: a Year-1 class must never be handed a
       Grade-2 grid mid-lesson */
    const byId = {}; DATA.grids.forEach((g) => { byId[g.id] = g; });
    for (const id of deck) if (byId[id].band !== b) err('V3 the ' + b + ' deck contains ' + id + ' (band ' + byId[id].band + ')');
    if (!deck.length) err('V3 band ' + b + ' has an EMPTY deck — Next would have nowhere to go');
  }
  if (total !== DATA.grids.length) err('V3 the bands partition ' + total + ' grids, the payload has ' + DATA.grids.length);
  ok('V3 the three decks partition all ' + DATA.grids.length + ' grids and never cross a band');
}());

/* ══════════════ V4 THE ROTATION ══════════════ */
(function V4() {
  const byId = {}; DATA.grids.forEach((g) => { byId[g.id] = g; });
  for (const b of DECLARED_BANDS) {
    const seen = {};
    let bad = 0;
    for (let w = 0; w < 120; w++) {
      const d = new Date(Date.UTC(2026, 0, 5 + w * 7));
      const id = T.featuredIdFor(DATA, b, d);
      if (!id) { err('V4 no featured grid for band ' + b); return; }
      if (!byId[id]) { err('V4 featured id ' + id + ' is not in the payload'); return; }
      /* ⭐ THE DEFECT THIS EXISTS FOR: the shipped rotation ignored band,
         so a reception teacher's one free grid was age-appropriate in
         8 weeks out of 21. */
      if (byId[id].band !== b) { bad++; }
      seen[id] = (seen[id] || 0) + 1;
      /* deterministic: the same date must always give the same grid */
      if (T.featuredIdFor(DATA, b, d) !== id) err('V4 the rotation is not deterministic');
    }
    if (bad) { err('V4 band ' + b + ' was handed ' + bad + '/120 grids from ANOTHER band'); return; }
    const deck = T.deckFor(DATA, b);
    const covered = Object.keys(seen).length;
    if (covered < deck.length) {
      err('V4 band ' + b + ' rotates over only ' + covered + ' of its ' + deck.length +
        ' grids — the rest are unreachable to a free teacher forever');
    }
  }
  /* the gate's own ISO week must agree with the tool's */
  for (const ds of ['2026-01-01', '2026-01-05', '2026-06-15', '2026-12-31', '2027-01-04']) {
    const d = new Date(ds + 'T12:00:00Z');
    if (T.isoWeek(d) !== oIsoWeek(d)) err('V4 isoWeek(' + ds + ') = ' + T.isoWeek(d) + ', gate says ' + oIsoWeek(d));
  }
  ok('V4 the rotation is deterministic, band-scoped, and covers every grid in each band');
}());

/* ══════════════ V5 FREE GATE ══════════════ */
(function V5() {
  const mk = (premium, seen) => {
    const o = Object.create(T);
    o.premium = premium;
    o.grids = DATA;
    o.byId = {}; DATA.grids.forEach((g) => { o.byId[g.id] = g; });
    o.api = { lang: 'en', settings: { band: 'K' } };
    o._store = { seenFree: seen || [], savedGrids: [] };
    o._saveStore = function () {};
    return o;
  };
  const free = mk(false);
  const featured = free._featuredGrid();
  if (!featured) { err('V5 no featured grid'); return; }

  /* a deep link must not reach a grid the free tier was never given */
  let leaked = 0;
  for (const g of DATA.grids) {
    const f = mk(false);
    f._wantGrid = g.id;
    const got = f._resolveGrid();
    if (got && got.id !== f._featuredGrid().id && !f._canOpen(got)) leaked++;
    if (got && !f._canOpen(got)) leaked++;
  }
  if (leaked) err('V5 a ?grid= deep link reached ' + leaked + ' grid(s) the free tier cannot open');

  /* premium reaches everything */
  for (const g of DATA.grids) {
    const p = mk(true);
    p._wantGrid = g.id;
    const got = p._resolveGrid();
    if (!got || got.id !== g.id) err('V5 premium could not deep-link to ' + g.id);
  }

  /* ⭐ what a free teacher was given, they KEEP */
  const kept = mk(false, ['wodb-num-k-lines']);
  if (!kept._canOpen(kept.byId['wodb-num-k-lines'])) {
    err('V5 a grid recorded in seenFree is not openable — the free tier takes back what it gave');
  }
  const notGiven = mk(false, []);
  if (notGiven._canOpen(notGiven.byId['wodb-num-23-twofour'])) {
    err('V5 a grid never given is openable — the free gate does not hold');
  }
  ok('V5 the free gate holds; deep links cannot leak; what was given is kept');
}());

/* ══════════════ V6 REASONS ══════════════ */
(function V6() {
  /* every shape the data can legally take */
  const cases = [
    [{ reasons: [['a', 'b'], null, null, null] }, 0, 2],
    [{ reasons: [[{ en: 'x', de: 'y' }], null, null, null] }, 0, 1],
    [{ reasons: [{ en: 'x' }, null, null, null] }, 0, 1],            /* legacy single map */
    [{ reasons: ['plain', null, null, null] }, 0, 1],                /* custom saved grid */
    [{ reasons: [[], null, null, null] }, 0, 0],
    [{}, 0, 0],
  ];
  for (const c of cases) {
    const got = T.reasonListFor(c[0], c[1], 'en').length;
    if (got !== c[2]) err('V6 reasonListFor gave ' + got + ', expected ' + c[2] + ' for ' + JSON.stringify(c[0]));
  }
  /* locale fallback: a missing locale falls to en, never to a key */
  const g = { reasons: [[{ en: 'english', de: 'deutsch' }], null, null, null] };
  if (T.reasonListFor(g, 0, 'de')[0] !== 'deutsch') err('V6 the de reason did not resolve');
  if (T.reasonListFor(g, 0, 'fi')[0] !== 'english') err('V6 a missing locale did not fall back to en');

  /* ⭐ reasonedCount must count CELLS WITH REASONS, not assume four. The
     shipped code compared against a hard 4, so a custom grid with two
     reasons could never reach the closing line. */
  const two = { reasons: [['a'], null, ['b'], null] };
  if (T.reasonedCount(two, 'en') !== 2) err('V6 reasonedCount says ' + T.reasonedCount(two, 'en') + ' for a 2-reason grid');
  for (const gr of DATA.grids) {
    const n = T.reasonedCount(gr, 'en');
    if (n !== 4) err('V6 curated grid ' + gr.id + ' has ' + n + '/4 reasons');
  }
  ok('V6 reasons resolve across all four data shapes; reasonedCount counts, never assumes');
}());

/* ══════════════ V7 RENDER ══════════════ */
(function V7() {
  /* ⭐ THE DEFECT THIS EXISTS FOR: a counting renderer that silently drew
     the wrong number. Three separate fallbacks did it. */
  let miscount = 0;
  for (const arr of ['dice', 'row', 'circle', 'scatter', 'tenframe']) {
    for (let n = 1; n <= 20; n++) {
      const svg = T._dotsSVG(arr, n, false);
      if (!svg) { err('V7 ' + arr + ' n=' + n + ' rendered nothing'); continue; }
      const solid = (svg.match(new RegExp('<circle [^>]*fill="' + DECLARED_INK + '"\\/>', 'g')) || []).length;
      if (solid !== n) { miscount++; err('V7 ' + arr + ' n=' + n + ' drew ' + solid + ' dots'); }
    }
  }
  if (!miscount) ok('V7 every dot arrangement draws exactly n, for n = 1..20 (100 cases)');

  /* the clock's hands are the standard formulas, checked from the
     emitted transform rather than from the tool's own arithmetic */
  const times = [[3, 0, 90, 0], [6, 0, 180, 0], [12, 0, 0, 0], [4, 30, 135, 180], [4, 45, 142.5, 270]];
  let bad = 0;
  for (const t of times) {
    const svg = T._clockSVG(t[0], t[1], false);
    const rots = (svg.match(/rotate\((-?[\d.]+) 50 50\)/g) || []).map((s) => parseFloat(s.slice(7)));
    if (rots.length < 2) { err('V7 the clock emitted ' + rots.length + ' hand rotations'); bad++; continue; }
    if (Math.abs(rots[0] - t[2]) > 0.06) { err('V7 ' + t[0] + ':' + t[1] + ' hour hand at ' + rots[0] + ', want ' + t[2]); bad++; }
    if (Math.abs(rots[1] - t[3]) > 0.06) { err('V7 ' + t[0] + ':' + t[1] + ' minute hand at ' + rots[1] + ', want ' + t[3]); bad++; }
  }
  /* ⚠ AND THE DIAL MUST DRAW EVERY NUMERAL ITS OWN REASONS NAME. The
     shipped dial drew 12/3/6/9 while `wodb-clock-23-four` cell 4 reads
     "the little hand is closer to the 5". */
  const dial = T._clockSVG(4, 45, false);
  for (let i = 1; i <= 12; i++) {
    if (dial.indexOf('>' + i + '</text>') < 0) { err('V7 the clock dial has no "' + i + '"'); bad++; }
  }
  /* ⚠⚠ THE MINI DIAL HAD NO COVERAGE AT ALL, AND THE MUTATION HARNESS IS
     HOW I FOUND OUT: two clock mutations "survived" because the hand
     line is byte-identical in both branches, `replace` took the first —
     the mini one — and nothing here ever rendered it. The library
     thumbnails are a real surface: at the true ~52px minicell a teacher
     picks the next grid by looking at them. */
  for (const t of times) {
    const svg = T._clockSVG(t[0], t[1], true);
    if (!svg) { err('V7 the mini clock rendered nothing'); bad++; continue; }
    const rots = (svg.match(/rotate\((-?[\d.]+) 50 50\)/g) || []).map((s) => parseFloat(s.slice(7)));
    if (rots.length < 2) { err('V7 the mini clock emitted ' + rots.length + ' hand rotations'); bad++; continue; }
    if (Math.abs(rots[0] - t[2]) > 0.06) { err('V7 mini ' + t[0] + ':' + t[1] + ' hour hand at ' + rots[0] + ', want ' + t[2]); bad++; }
    if (Math.abs(rots[1] - t[3]) > 0.06) { err('V7 mini ' + t[0] + ':' + t[1] + ' minute hand at ' + rots[1] + ', want ' + t[3]); bad++; }
    /* a thumbnail must still SHOW two hands, or it is a blank face */
    const hands = (svg.match(/<line[^>]*stroke-width="(13|9)"/g) || []).length;
    if (hands !== 2) { err('V7 the mini dial draws ' + hands + ' hands, not 2'); bad++; }
  }
  /* and its strokes must be heavier than the full dial's, or the whole
     point of a separate mini drawing is lost */
  const fullFace = parseFloat((T._clockSVG(3, 0, false).match(/stroke-width="([\d.]+)"/) || [])[1]);
  const miniFace = parseFloat((T._clockSVG(3, 0, true).match(/stroke-width="([\d.]+)"/) || [])[1]);
  if (!(miniFace > fullFace)) { err('V7 the mini dial is not drawn heavier (' + miniFace + ' vs ' + fullFace + ') — at 52px it is mud'); bad++; }

  if (!bad) ok('V7 both clock dials are exact; the full dial carries all twelve numerals; the mini draws two heavy hands');

  /* every cell kind produces something */
  for (const c of [{ t: 'num', v: '7' }, { t: 'word', w: { en: 'six' } }, { t: 'shape', shape: 'hexagon' },
    { t: 'dots', arr: 'dice', n: 6 }, { t: 'clock', h: 3, m: 0 }]) {
    const s = c.t === 'shape' ? T._shapeSVG(c, false)
      : c.t === 'dots' ? T._dotsSVG(c.arr, c.n, false)
        : c.t === 'clock' ? T._clockSVG(c.h, c.m, false) : 'ok';
    if (!s) err('V7 cell kind ' + c.t + ' rendered nothing');
  }
}());

/* ══════════════ V8 NO VERDICT ══════════════ */
(function V8() {
  /* per-locale, because a ban tested in English is tested in the one
     language where it happens to be easy. (?<!\p{L}) rather than \b,
     which is ASCII-only even under /u. */
  /* ⚠⚠ A BAN CAN BE TOO WIDE, AND ONLY A MUST-PASS EXAMPLE IN THE POLICED
     LANGUAGE FINDS IT. The first version of this list banned Finnish
     `pisteet` as "score" — but `pisteet` is also simply DOTS, and it is
     the tool's own name for its dot arrangements (`tabDots.fi`). A ban
     that condemns correct native copy teaches a panel to reword around it
     instead of reporting it. The score sense is `pistemäärä`.
     ⚠⚠ AND IT CAN BE TOO NARROW: the Italian entry read `giusto`, so it
     could not fire on `la risposta è giusta` — the feminine, which is the
     form that actually agrees with `risposta`. Romance verdicts inflect;
     the pattern has to. */
  const BAN = {
    en: '(correct|incorrect|wrong|right answer|score|winner)',
    de: '(richtig|falsch|Punktzahl|Gewinner|Lösung)',
    fr: '(bonne réponse|mauvaise réponse|faux|incorrecte?|score|gagnant)',
    it: '(giust[oaie]|sbagliat[oaie]|corrett[oaie]|punteggio|vincitore)',
    es: '(correct[oa]s?|incorrect[oa]s?|equivocad[oa]s?|puntaje|ganador)',
    pt: '(corret[oa]s?|errad[oa]s?|incorret[oa]s?|pontuação|vencedor)',
    nl: '(goed antwoord|fout|juiste antwoord|score|winnaar)',
    sv: '(rätt svar|fel svar|poäng|vinnare)',
    da: '(rigtigt svar|forkert|point|vinder)',
    no: '(riktig svar|feil svar|poeng|vinner)',
    fi: '(oikea vastaus|väärin|väärä|pistemäärä|voittaja)',
  };
  /* ⚠⚠ AN EXEMPTION MUST EXEMPT A WORD, NOT A KEY. My first version
     exempted the whole `doctrine` key because the doctrine line contains
     "answer" — and a mutation that put "That is the correct answer."
     into it then SURVIVED. The exemption is now only the noun; every
     verdict term is still banned everywhere, including on the one line
     whose entire job is to say there is no verdict. */
  const ANSWER_NOUN = /(?<!\p{L})(answers?|Antworten?|réponses?|rispost[ae]|respuestas?|respostas?|antwoord(en)?|svar|vastaus|vastaukse\w*)(?!\p{L})/giu;
  const EXEMPT = {
    closing: 'contains the noun "answer" — "Every one was a good answer!"',
    instruction: 'the doctrine line, shell-consumed',
    doctrine: 'the doctrine line, stage-rendered',
  };
  let hits = 0;
  for (const key of Object.keys(T.strings)) {
    for (const loc of LOCALES) {
      const raw = T.strings[key][loc];
      if (!raw) continue;
      /* the exemption removes only the NOUN, then the full ban runs on
         what is left — so "every answer can be right" passes and
         "that is the correct answer" does not */
      const v = EXEMPT[key] ? raw.replace(ANSWER_NOUN, '') : raw;
      const re = new RegExp('(?<!\\p{L})' + BAN[loc] + '(?!\\p{L})', 'iu');
      if (re.test(v)) { hits++; err('V8 verdict vocabulary in strings.' + key + '.' + loc + ': "' + raw + '"'); }
    }
  }
  /* poison: the ban must be able to fire in every language it polices */
  const POISON = { en: 'that is the right answer', de: 'das ist richtig', fr: 'bonne réponse',
    it: 'la risposta è giusta', es: 'eso es correcto', pt: 'isso está correto',
    nl: 'dat is een goed antwoord', sv: 'det är rätt svar', da: 'det er et rigtigt svar',
    no: 'det er riktig svar', fi: 'se on oikea vastaus' };
  let dead = [];
  for (const loc of LOCALES) {
    const re = new RegExp('(?<!\\p{L})' + BAN[loc] + '(?!\\p{L})', 'iu');
    if (!re.test(POISON[loc])) dead.push(loc);
  }
  if (dead.length) err('V8 the ban CANNOT FIRE in: ' + dead.join(', ') + ' — it is not policing those languages');
  if (!hits && !dead.length) ok('V8 the no-shame lock holds in all 11 locales, and the ban fires in all 11');
}());

/* ══════════════ V9 ONE INK ══════════════ */
(function V9() {
  const probes = [
    T._shapeSVG({ shape: 'hexagon', fill: 'solid' }, false),
    T._shapeSVG({ shape: 'star', fill: 'hatch', color: 'plum' }, false),
    T._dotsSVG('dice', 6, false),
    T._clockSVG(4, 45, false),
  ].filter(Boolean);
  if (probes.length < 4) { err('V9 only ' + probes.length + '/4 probes rendered — vacuous'); return; }
  const seen = new Set();
  for (const p of probes) for (const m of (p.match(/#[0-9A-Fa-f]{6}/g) || [])) seen.add(m.toUpperCase());
  const allowed = new Set(['#FFFEFB', '#FFFFFF', DECLARED_INK.toUpperCase(), (T.UI.warm || '').toUpperCase()]);
  const extra = [...seen].filter((h) => !allowed.has(h));
  if (extra.length) err('V9 the stage emits a second ink: ' + extra.join(', ') + ' — colour could be an answer again');
  else ok('V9 the stage emits one ink; colour cannot be an answer');
}());

/* ══════════════ V10 STRINGS ══════════════ */
(function V10() {
  /* forward: every key the tool asks for exists.
     ⚠ READ EVERY LITERAL INSIDE THE CALL, NOT JUST A BARE ONE. My first
     version matched `api.t('literal')` only, so it was blind to
     `api.t(cond ? 'a' : 'b')` — and then the BACKWARD check condemned
     nine live keys as dead. A scan that cannot see a ternary is a scan
     that manufactures dead strings. */
  const asked = new Set();
  for (const m of SRC.matchAll(/api\.t\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g)) {
    /* Two things in the argument are NOT keys, and both produced false
       reports before this was written:
         - a ternary's CONDITION — `api.t(sz === 'sm' ? … : …)` asks for
           neither `sm` nor `md`;
         - a CONCATENATION fragment — `api.t('shape_' + cell.shape)` asks
           for no key called `shape_`; the dyn list below resolves that
           family properly.
       Strip both, then take whatever literals remain — which handles a
       nested ternary without this needing to be a JS parser. */
    const arg = m[1]
      .replace(/[!=]==?\s*'[^']*'/g, '')       /* === 'sm'  → gone      */
      .replace(/'[^']*'\s*\+/g, '')            /* 'shape_' + → gone     */
      .replace(/\+\s*'[^']*'/g, '');           /* + 'suffix' → gone     */
    for (const lit of arg.matchAll(/'([a-zA-Z0-9_]+)'/g)) asked.add(lit[1]);
  }
  const missing = [...asked].filter((k) => !T.strings[k]);
  if (missing.length) err('V10 the tool asks for ' + missing.length + ' key(s) that do not exist: ' + missing.join(', '));

  /* the dynamically-composed families, resolved for real rather than
     assumed — a family whose members are built by concatenation is
     invisible to a source grep */
  const dyn = [];
  for (const s of Object.keys(T.SHAPES)) dyn.push('shape_' + s);
  /* `renderedArr` can substitute, so its outputs are part of the family */
  for (const a of ['dice', 'row', 'rowWrapped', 'circle', 'scatter', 'tenframe']) dyn.push('arr_' + a);
  for (const f of T.FILLS) dyn.push('fill' + f.charAt(0).toUpperCase() + f.slice(1));
  for (const p of T.POS_KEY) dyn.push(p);
  for (const b of Object.keys(T.BAND_KEY)) dyn.push(T.BAND_KEY[b]);
  const dynMissing = dyn.filter((k) => !T.strings[k]);
  if (dynMissing.length) err('V10 composed key(s) with no string: ' + dynMissing.join(', '));

  /* backward: NO DEAD STRINGS.
     ⚠⚠ MY FIRST VERSION OF THIS CHECK CONDEMNED TWENTY CORRECT KEYS. A
     source grep for `api.t('literal')` cannot see a key reached through
     indirection — `api.t(stems[i])`, `api.t(cond ? 'a' : 'b')`,
     `api.t(key)` where key is a variable, or a `labelKey` the SHELL
     resolves. Twenty of the twenty-two it flagged were alive; two were
     genuinely dead. So the indirect routes are enumerated here, each with
     the line that reaches it, and the list is a RATCHET: adding a key to
     it is a claim you have to justify, not a way to make the gate quiet. */
  const REACHED_INDIRECTLY = {
    stem1: 'wodb.js _cellSlot — stems[self._stemIdx % 3]',
    stem2: 'wodb.js _cellSlot — stems[self._stemIdx % 3]',
    stem3: 'wodb.js _cellSlot — stems[self._stemIdx % 3]',
    showReasons: 'wodb.js _dock — api.t(this.revealMode ? … : "showReasons")',
    hideReasons: 'wodb.js _dock — api.t(this.revealMode ? "hideReasons" : …)',
    invite: 'wodb.js _paintHint — api.t(key), key = "invite"',
    stemPrompt: 'wodb.js _paintHint — api.t(key), key = "stemPrompt"',
    chosenToTalk: 'wodb.js _cellSlot — api.t(self.lifted[i] ? "chosenToTalk" : …)',
    noLongerChosen: 'wodb.js _cellSlot — api.t(… : "noLongerChosen")',
    gateLibrary: 'wodb.js _tileEl — self._panelGate("gateLibrary") -> api.t(key)',
    gateBuilder: 'wodb.js _renderPanel — self._panelGate("gateBuilder")',
    gatePrint: 'wodb.js _print / _renderPanel — gate key passed as a variable',
    setShowWords: 'settings[].labelKey — resolved by lcs-shell, not by api.t',
    setBand: 'settings[].labelKey — resolved by lcs-shell, not by api.t',
    tabPicture: 'wodb.js _renderPicker — the [id, labelKey] tab table',
    tabNumber: 'wodb.js _renderPicker — the tab table',
    tabWord: 'wodb.js _renderPicker — the tab table',
    tabShape: 'wodb.js _renderPicker — the tab table',
    tabDots: 'wodb.js _renderPicker — the tab table',
    tabClock: 'wodb.js _renderPicker — the tab table',
    title: 'lcs-shell.js:448 — the h1 and the application aria-label',
    instruction: 'lcs-shell.js:449 — the aria-label composition',
  };
  const referenced = new Set([...asked, ...dyn, ...Object.keys(REACHED_INDIRECTLY)]);
  const dead = Object.keys(T.strings).filter((k) => !referenced.has(k));
  if (dead.length) err('V10 ' + dead.length + ' authored string(s) are never reached: ' + dead.join(', '));
  /* the ratchet has to stay honest in the other direction too: a key
     listed as indirectly-reached but no longer authored is a stale
     excuse, and it would hide the next dead string behind it */
  const stale = Object.keys(REACHED_INDIRECTLY).filter((k) => !T.strings[k]);
  if (stale.length) err('V10 the indirect-reach list names ' + stale.length +
    ' key(s) that no longer exist: ' + stale.join(', ') + ' — delete them from the list');

  /* every key carries a non-empty en */
  const noEn = Object.keys(T.strings).filter((k) => !T.strings[k].en);
  if (noEn.length) err('V10 no en value for: ' + noEn.join(', '));

  if (!missing.length && !dynMissing.length && !dead.length && !noEn.length) {
    ok('V10 ' + Object.keys(T.strings).length + ' strings: all asked-for keys exist, none is dead');
  }

  /* the 11-locale coverage is reported, not failed, until the panels land */
  const partial = Object.keys(T.strings).filter((k) => LOCALES.some((l) => !T.strings[k][l]));
  if (partial.length) {
    console.log('  ..    ' + partial.length + ' key(s) are not yet 11/11 — the native panels are pending');
  } else ok('V10 every string is authored in all 11 locales');
}());

/* ══════════════ V11 SHAPES ══════════════ */
(function V11() {
  const names = Object.keys(T.SHAPES);
  if (names.length < 8) { err('V11 only ' + names.length + ' shapes — the vocabulary shrank'); return; }
  for (const n of names) {
    const s = T.SHAPES[n];
    if (!s.d || s.d.charAt(0) !== 'M') err('V11 ' + n + ' has no path');
    if (!s.a || s.a.length !== 2 || !isFinite(s.a[0]) || !isFinite(s.a[1])) err('V11 ' + n + ' has no optical anchor');
    if (!(s.k > 0.5 && s.k < 1.6)) err('V11 ' + n + ' scale ' + s.k + ' is outside the keyline range');
    /* the anchor must be INSIDE the box, or a rotation throws the shape
       out of its own cell */
    if (s.a[0] < 10 || s.a[0] > 90 || s.a[1] < 10 || s.a[1] > 90) err('V11 ' + n + ' anchor is outside the box');
  }
  /* ⚠ the star must be REGULAR. The shipped one had radii varying 11%
     and angles of 74.4/70.2/70.8/70.2/74.4 instead of a constant 72. */
  const pts = [...T.SHAPES.star.d.matchAll(/([ML])\s*([\d.]+)\s+([\d.]+)/g)].map((m) => [+m[2], +m[3]]);
  if (pts.length !== 10) err('V11 the star has ' + pts.length + ' points, not 10');
  else {
    const outer = pts.filter((p, i) => i % 2 === 0);
    const rs = outer.map((p) => Math.hypot(p[0] - 50, p[1] - 50.5));
    const spread = Math.max(...rs) / Math.min(...rs);
    if (spread > 1.03) err('V11 the star is not regular — outer radii vary by ' + ((spread - 1) * 100).toFixed(1) + '%');
    else ok('V11 ' + names.length + ' shapes are well-formed; the star is regular to ' + ((spread - 1) * 100).toFixed(1) + '%');
  }
}());

/* ══════════════ V12 STRUCTURE ══════════════ */
(function V12() {
  const NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  if (/\btasks\s*:/.test(NC) || /\bnextTask\s*:/.test(NC)) {
    err('V12 the tool declares tasks/nextTask — that switches on the whole activity chrome ' +
      'and gives it an educationalAlignment it must not have');
  }
  for (const bad of ['lcs-shell', 'sort-bins-core', 'clock-core', 'place-value-core']) {
    if (NC.indexOf("require('" + bad) >= 0 || NC.indexOf('from "' + bad) >= 0) err('V12 imports ' + bad);
  }
  /* ⚠ a Print chip with no @media print block prints the WHOLE WEB PAGE,
     and the generic liveness gate scores that green because window.print
     fires either way. Match the EMISSION, not a comment about one. */
  if (/window\.print\s*\(/.test(NC) && !/['"`]@media print\s*\{/.test(NC)) {
    err('V12 window.print() with no emitted @media print block');
  }
  /* ⚠⚠ AND THE SCOPE CHECK HAS TO READ THE BLOCK, NOT THE FILE. My first
     version asked whether `wdb-paid` appeared ANYWHERE in the source —
     and it does, in render(), where the class is added. So a mutation
     that stripped the scoping off the print rule itself sailed through.
     A check that looks in the wrong place certifies. */
  const pm = /['"`]@media print\s*\{/.exec(NC);
  if (pm) {
    /* the emitted CSS is a concatenation of quoted fragments; take
       everything from the @media to the closing '}' fragment */
    const tail = NC.slice(pm.index);
    const endRel = tail.indexOf("+ '}'");
    const block = endRel > 0 ? tail.slice(0, endRel) : tail.slice(0, 4000);
    const rules = (block.match(/'[^']*\{[^']*\}[^']*'/g) || []).concat(block.match(/'[^']*display\s*:[^']*'/g) || []);
    if (!rules.length) err('V12 the print block has no rules — this check would be vacuous');
    else {
      const unscoped = rules.filter((r) => /display\s*:\s*(block|flex|grid)\s*!important/.test(r) && r.indexOf('wdb-paid') < 0);
      if (unscoped.length) {
        err('V12 ' + unscoped.length + ' print rule(s) reveal the sheet WITHOUT body.wdb-paid — ' +
          'Ctrl+P is guarded by no chip, so a free visitor would get the paid sheet: ' + unscoped[0]);
      }
      if (block.indexOf('wdb-paid') < 0) {
        err('V12 the print block never mentions body.wdb-paid at all');
      }
    }
  }
  if (!/vector-effect/.test(NC)) err('V12 outline strokes are not non-scaling — line weight would vary with size');
  /* vh is forbidden inside a manipulative: the iframe height is
     content-driven, so vh means nothing there */
  const vh = NC.match(/[\d.]+vh\b/g);
  if (vh) err('V12 ' + vh.length + ' use(s) of vh — meaningless inside a content-sized iframe: ' + vh.join(', '));
  ok('V12 no protected-core import, no tasks, print block present and entitlement-scoped');
}());

console.log('');
if (ERRORS) { console.log('FAIL — ' + ERRORS + ' error(s), ' + PASS + ' section(s) clear'); process.exit(1); }
console.log('PASS — ' + PASS + ' sections');
