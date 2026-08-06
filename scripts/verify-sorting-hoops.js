#!/usr/bin/env node
/* =====================================================================
   verify-sorting-hoops.js — MEASURED build-gate for Sorting Hoops.
   Fix the tool, never the gate.

   ⚠ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH. Where it needs to know what
   an answer should be, it computes it here rather than asking the tool —
   reading the expectation off the subject is how 19 of 51 mutations
   survived on number-sieve.

   Invariants:
     S1  TOTAL        satisfies() over EVERY (rule x item) pair returns a
                      strict boolean — never undefined, never a throw
     S2  OFFERED      every rule the tool OFFERS splits the pool AND clears
                      the >=24 floor. Splitting alone is not enough:
                      habitat:water splits 933 with 48 members and is empty
                      in a twelve-card tray more than half the time
     S3  REGION       regionFor is exhaustive and agrees with satisfies;
                      an item true of both rules lands in the OVERLAP
     S4  ⭐ LANDING   the refusal table, exhausted over every
                      (ruleA x ruleB x item x target). "Not where you put
                      it" is not "outside": only a TRUE counter-example
                      accumulates outside, everything else returns to the
                      tray. Nothing is ever destroyed
     S5  ⭐ PAIRS     pairOK is symmetric, rejects same-field pairs
                      (contradiction, nesting AND identity), and every pair
                      it admits has all four regions populated
     S6  NO TELL      the hover path may not consult the rule. Structural:
                      _hover/_regionAt/_clearHover may not mention
                      satisfies, regionFor, landingFor, ruleA or ruleB
     S7  NO LEAK      the rule is never rendered before reveal
     S8  ⭐ SYLLABLES the offered values are computed per locale against
                      the >=25 floor, never hardcoded. Italian has EIGHT
                      one-syllable words in the corpus
     S9  NO VERDICT   no grading vocabulary, no score/streak/timer field,
                      no correct/wrong class anywhere
     S10 FENCE        zero lines imported from sort-bins-core; no .sb-
     S11 IDENTITY     id, STORE_KEY, premium:false, no tasks/nextTask
     S12 NO EXFIL     every fetch is on the allowlist
     S13 STRINGS      every key the tool uses exists; no dead strings
     S14 CSS          idempotent injector, print block scoped to the paid
                      sheet, reduced-motion, ring stroke >= 4, no .lcs-
                      selector beyond the sanctioned body.hp-wide
     S15 ⭐ PALETTE   the block inks are >= 18 dE00 apart under normal,
                      protan, deutan AND tritan vision, and the ring ink is
                      >= 26 from every one of them. THE GATE IS
                      AUTHORITATIVE OVER ANY PROPOSED HEX, including the
                      art panel's and mine
     S16 POOL         the K-2 pool is present, its corrections are all
                      live (never inert), and it leaves every rule family
                      viable in all eleven locales

   Usage: node scripts/verify-sorting-hoops.js
   Override for mutation testing: HP_TOOL_DIR   Quiet: HP_QUIET
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.HP_TOOL_DIR || path.join(ROOT, 'mini tools');
const DATA_DIR = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'sorting-hoops.js'), 'utf8');
/* one stripper, used by the real checks AND by their poison, so the two
   cannot exercise different pipelines */
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const SRC_NC = strip(SRC);
const QUIET = !!process.env.HP_QUIET;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; if (!QUIET) console.log('  warn   ' + m); };
const say = (m) => { if (!QUIET) console.log(m); };
/* ⚠ a section reports on ITS OWN result. `if (!ERRORS)` reads a GLOBAL,
   so a section that passed stayed silent because an EARLIER one failed —
   which reads exactly like the section having been skipped. */
let MARK = 0;
const mark = () => { MARK = ERRORS; };
const clean = (m) => { if (ERRORS === MARK) say(m); };

/* ---------- load the tool in a sandbox ---------- */
const stubEl = () => ({ style: {}, setAttribute() {}, appendChild() {}, querySelector: () => null,
  classList: { add() {}, remove() {} } });
const sandbox = {
  document: { getElementById: () => null, createElement: stubEl, createElementNS: stubEl,
    head: { appendChild() {} }, body: { classList: { add() {} } }, activeElement: null },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
try { vm.runInContext(SRC + '\n;this.__T = SortingHoops;', sandbox); }
catch (e) { console.error('FATAL — the tool did not evaluate: ' + e.message); process.exit(1); }
const T = sandbox.__T;
if (!T) { console.error('FATAL — SortingHoops is not defined'); process.exit(1); }

T.api = { t: (k) => k, lang: 'en' };

/* ⚠ SNAPSHOT THE DECLARED IDENTITY BEFORE ANY TEST TOUCHES IT. S11 used to
   read T.premium at the end, by which time S2 had set it true and back —
   so "premium defaults true" survived mutation testing. A stateful gate
   that checks a field it has itself written checks nothing. */
const DECLARED = { id: T.id, STORE_KEY: T.STORE_KEY, premium: T.premium,
  tasks: T.tasks, nextTask: T.nextTask, defaults: JSON.parse(JSON.stringify(T.defaults || {})) };

/* ---------- fixtures ---------- */
const ALL_LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const blocks = T.blockSet();
const ATTR = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'object-attributes.json'), 'utf8'));
const SYLRAW = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'syllable-counts.json'), 'utf8'));
let POOL = null;
try { POOL = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'sorting-hoops-pool.json'), 'utf8')); } catch (_) {}

function picsFor(loc) {
  const idx = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'pww-index-' + loc + '.json'), 'utf8'));
  const syl = {};
  Object.keys(SYLRAW.keys).forEach((k) => { if (SYLRAW.keys[k][loc]) syl[k] = SYLRAW.keys[k][loc]; });
  const items = T.buildPictures(idx, ATTR, syl, POOL, T.ONSETS[loc] || T.ONSETS.en);
  /* the corrections ride in the pool file; apply them the way the tool
     will, so the gate sees the same data the child does */
  if (POOL && POOL.fix) {
    items.forEach((it) => {
      const f = POOL.fix[it.key];
      if (!f) return;
      it.attr = Object.assign({}, it.attr);
      Object.keys(f).forEach((k) => { it.attr[k] = f[k]; });
    });
  }
  return items;
}
const pics = picsFor('en');
const ITEMS = blocks.concat(pics);

say(`[fixtures] ${blocks.length} blocks + ${pics.length} pictures = ${ITEMS.length} items`);
if (blocks.length !== 32) err(`S0 expected 32 logic blocks, got ${blocks.length}`);
if (pics.length < 200) err(`S0 only ${pics.length} picture items built — the pool join is broken`);

/* every rule the tool can pose, premium included, built HERE */
const RULES = [];
T.COLOURS.forEach((c) => RULES.push({ f: 'colour', v: c.k }));
T.SHAPES.forEach((s) => RULES.push({ f: 'shape', v: s.k }));
T.SIZES.forEach((s) => RULES.push({ f: 'size', v: s.k }));
Object.keys(T.FIELD_VALUES).forEach((f) => T.FIELD_VALUES[f].forEach((v) => RULES.push({ f, v })));
[1, 2, 3, 4, 5].forEach((n) => RULES.push({ f: 'syllables', v: n }));
(T.ONSETS.en || []).forEach((o) => RULES.push({ f: 'initial', v: o }));

/* ---------- S1 totality ---------- */
say('[engine]');
{
  let nonBool = 0, threw = 0;
  RULES.forEach((r) => ITEMS.forEach((it) => {
    let v;
    try { v = T.satisfies(r, it); } catch (_) { threw++; return; }
    if (v !== true && v !== false) nonBool++;
  }));
  [[null, ITEMS[0]], [{ f: 'nope', v: 1 }, ITEMS[0]], [{ f: 'colour' }, ITEMS[0]],
   [RULES[0], null], [RULES[0], {}], [undefined, undefined], [{}, {}]]
    .forEach((p) => { try { if (typeof T.satisfies(p[0], p[1]) !== 'boolean') nonBool++; } catch (_) { threw++; } });
  if (threw) err(`S1 satisfies() threw ${threw} time(s)`);
  if (nonBool) err(`S1 satisfies() returned a non-boolean ${nonBool} time(s)`);
  if (!threw && !nonBool) say(`  S1 satisfies() total over ${RULES.length * ITEMS.length} pairs + hostile inputs`);
}

/* ---------- S2 every OFFERED rule splits AND clears the floor ----------
   ⚠ THE GATE STATES THE FLOOR ITSELF rather than reading T.ruleFloor: a
   gate that asks the subject what the answer should be marks its own
   homework. The principle, written out here independently: two tray-fuls
   so the stratified dealer can always find three, but NEVER more than a
   quarter of the pool — a floor calibrated on the 302-card sampled
   picture pool cannot be applied unchanged to the 32-card exhaustive
   Dienes set, where a colour rule is 8 blocks and perfectly guessable. */
{
  const gateFloor = (pool) => Math.max(3, Math.min(24, Math.ceil(pool.length / 4)));
  let checked = 0;
  ['block', 'picture'].forEach((world) => {
    T.world = world; T.premium = true;
    T.pool = world === 'block' ? blocks : pics;
    const floor = gateFloor(T.pool);
    const offered = T._availableRules();
    checked += offered.length;
    if (!offered.length) { err(`S2 the ${world} world offers no rules at all`); return; }
    const notSplit = offered.filter((r) => !T.splits(r, T.pool));
    const thin = offered.filter((r) => {
      let n = 0; T.pool.forEach((it) => { if (T.satisfies(r, it)) n++; });
      return n < floor;
    });
    if (notSplit.length) err(`S2 ${world}: ${notSplit.length} offered rule(s) do not split: ` +
      notSplit.slice(0, 5).map((r) => r.f + '=' + r.v).join(', '));
    if (thin.length) err(`S2 ${world}: ${thin.length} offered rule(s) below the ${floor} floor: ` +
      thin.slice(0, 5).map((r) => r.f + '=' + r.v).join(', '));
    say(`  S2 ${world}: ${offered.length} rules offered, floor ${floor} over a ${T.pool.length}-item pool`);
  });
  if (checked < 10) err(`S2 near-vacuous: only ${checked} rules were offered in total`);
  /* ⭐ the "admits everything" clause is UNREACHABLE over the real pools —
     no colour covers all 32 blocks and no attribute value covers all 302
     cards — so a mutation deleting it survived. Reach it with a synthetic
     pool instead, which is what makes the clause load-bearing rather than
     decorative. A law no test can reach is a comment. */
  const allRed = blocks.filter((b) => b.colour === 'red');
  if (T.ruleViable({ f: 'colour', v: 'red' }, allRed))
    err('S2 a rule that admits the WHOLE pool is offered — it splits nothing and cannot be guessed');
  if (!T.ruleViable({ f: 'colour', v: 'red' }, blocks))
    err('S2 the floor rejects a rule that is 8 of 32 — that is a perfectly guessable Dienes rule');
  T.premium = DECLARED.premium;
}

/* ---------- S3 regionFor agrees with satisfies ---------- */
{
  let bad3 = 0, seen = {};
  const sample = RULES.slice(0, 24);
  sample.forEach((rA) => sample.forEach((rB) => ITEMS.forEach((it) => {
    const a = T.satisfies(rA, it), b = T.satisfies(rB, it);
    const want = a && b ? 'both' : a ? 'a' : b ? 'b' : 'out';
    const got = T.regionFor(it, rA, rB);
    seen[got] = 1;
    if (got !== want) bad3++;
  })));
  if (bad3) err(`S3 regionFor disagreed with satisfies ${bad3} time(s)`);
  ['a', 'b', 'both', 'out'].forEach((r) => { if (!seen[r]) err(`S3 near-vacuous: region ${r} never occurred`); });
  if (!bad3) say('  S3 regionFor exhaustive and consistent, all four regions exercised');
  /* a null rule is an empty hoop */
  if (T.regionFor(ITEMS[0], null, null) !== 'out') err('S3 two null rules must put everything outside');
}

/* ---------- S4 ⭐ THE REFUSAL TABLE ---------- */
{
  /* the gate's OWN ground truth, written out rather than read from the
     tool: if the truth is the target it is kept; else if the truth is
     outside the card is a genuine counter-example and goes outside; else
     it belongs somewhere and is merely undecided, so it goes to the tray */
  const truthTable = (truth, target) => {
    if (truth === target) return { land: target, kept: true };
    if (truth === 'out') return { land: 'out', kept: false };
    return { land: 'tray', kept: false };
  };
  const targets = ['a', 'b', 'both', 'out'];
  let bad4 = 0, poisoned = 0, n = 0, cover = {};
  const rs = RULES.slice(0, 14);
  rs.forEach((rA) => rs.forEach((rB) => ITEMS.forEach((it) => targets.forEach((tg) => {
    const truth = T.regionFor(it, rA, rB);
    const want = truthTable(truth, tg);
    const got = T.landingFor(it, tg, rA, rB);
    n++;
    cover[truth + '>' + tg] = 1;
    if (!got || got.land !== want.land || got.kept !== want.kept) bad4++;
    /* the poison the shipped tool actually shipped: a card whose truth is
       another HOOP being filed outside */
    if (truth !== 'out' && truth !== tg && got && got.land === 'out') poisoned++;
  }))));
  if (bad4) err(`S4 landingFor disagreed with the table ${bad4} of ${n} times`);
  if (poisoned) err(`S4 ⭐ THE OUTSIDE PILE IS POISONED: ${poisoned} card(s) whose true region is a HOOP ` +
    'were filed outside. That pile is the evidence a child reads to deduce the rule.');
  if (Object.keys(cover).length < 12) err(`S4 near-vacuous: only ${Object.keys(cover).length} (truth,target) combinations occurred`);
  if (!bad4 && !poisoned) say(`  S4 landingFor exhausted over ${n} (ruleA x ruleB x item x target) — nothing is misfiled`);
  /* and it never destroys: every landing is a real region */
  const legal = { a: 1, b: 1, both: 1, out: 1, tray: 1 };
  let illegal = 0;
  rs.forEach((rA) => ITEMS.slice(0, 60).forEach((it) => targets.forEach((tg) => {
    const g = T.landingFor(it, tg, rA, null);
    if (!g || !legal[g.land]) illegal++;
  })));
  if (illegal) err(`S4 landingFor returned a non-region ${illegal} time(s) — an item would vanish`);
}

/* ---------- S5 ⭐ PAIR VIABILITY ---------- */
{
  let asym = 0, sameField = 0, admitted = 0, badAdmit = 0;
  const rs = RULES.slice(0, 26);
  rs.forEach((rA) => rs.forEach((rB) => {
    const ab = T.pairOK(rA, rB, pics), ba = T.pairOK(rB, rA, pics);
    if (ab !== ba) asym++;
    if (rA.f === rB.f && ab) sameField++;
    if (ab) {
      admitted++;
      const s = T.pairStats(rA, rB, pics);
      if (s.both < 2 || s.aOnly < 2 || s.bOnly < 2 || s.neither < 2) badAdmit++;
    }
  }));
  if (asym) err(`S5 pairOK is not symmetric (${asym} disagreements)`);
  if (sameField) err(`S5 pairOK admitted ${sameField} SAME-FIELD pair(s) — contradiction, nesting and identity`);
  if (badAdmit) err(`S5 pairOK admitted ${badAdmit} pair(s) with an empty region`);
  if (!admitted) err('S5 near-vacuous: pairOK admitted nothing at all, so the checks above proved nothing');
  else if (!asym && !sameField && !badAdmit) say(`  S5 pairOK symmetric, same-field-blocked, ${admitted} admitted pairs all four-region-populated`);
  /* the identity case by name */
  if (T.pairOK({ f: 'colour', v: 'red' }, { f: 'colour', v: 'red' }, blocks))
    err('S5 both hoops can be given the IDENTICAL rule — every card lands in the lens and A and B can never be used');
  /* a one-hoop lesson is legal */
  if (!T.pairOK({ f: 'colour', v: 'red' }, null, blocks)) err('S5 a one-hoop lesson must be allowed');
}

/* ---------- S6 NO TELL ---------- */
{
  mark();
  const fns = ['_hover', '_regionAt', '_clearHover'];
  const banned = /satisfies|regionFor|landingFor|ruleA|ruleB|premium/;
  fns.forEach((f) => {
    const m = new RegExp(f + ':\\s*function[\\s\\S]*?\\n  \\}').exec(SRC_NC);
    if (!m) { err(`S6 could not find ${f} to inspect — the check is vacuous`); return; }
    if (banned.test(m[0])) err(`S6 ${f} consults the rule — the hoop must give nothing away before you let go`);
  });
  clean('  S6 the hover path cannot see the rule');
}

/* ---------- S7 NO LEAK ---------- */
{
  mark();
  T.mode = 'guess'; T.revealed = false;
  T.ruleA = { f: 'colour', v: 'red' }; T.ruleB = { f: 'shape', v: 'circle' };
  const capA = T._capFor('a'), capB = T._capFor('b'), capBoth = T._capFor('both');
  const leak = [capA, capB, capBoth].filter((c) => /vRed|vCircle|rColour|rShape/.test(c));
  if (leak.length) err(`S7 the rule leaks before reveal: ${leak.join(' | ')}`);
  /* ⚠ THE LENS IS CHECKED IN BOTH STATES. The first version asserted a
     caption only AFTER reveal, so a mutation that emptied the HIDDEN
     branch survived — and hidden is the state a guess-my-rule class spends
     the whole lesson in. */
  if (!T._capFor('both')) err('S7 the LENS has no caption BEFORE reveal — the one region the tool is named for');
  T.revealed = true;
  const shown = T._capFor('a');
  if (!/rColour/.test(shown)) err('S7 the rule is NOT shown after reveal — the reveal does nothing');
  if (!T._capFor('both')) err('S7 the LENS has no caption AFTER reveal');
  clean('  S7 hidden before reveal, shown after, and the lens is named');
  T.mode = 'labelled'; T.revealed = false; T.ruleA = null; T.ruleB = null;
}

/* ---------- S8 ⭐ per-locale syllable values ---------- */
{
  const got = {};
  ALL_LOCALES.forEach((loc) => {
    const items = picsFor(loc);
    /* the gate's own count */
    const c = {};
    items.forEach((it) => { if (typeof it.syl === 'number') c[it.syl] = (c[it.syl] || 0) + 1; });
    const want = [];
    for (let v = 1; v <= 6; v++) if ((c[v] || 0) >= T.SYLL_FLOOR) want.push(v);
    const have = T.syllableValues(items);
    got[loc] = have.join(',');
    if (have.join(',') !== want.join(',')) err(`S8 ${loc}: offered [${have}] but the corpus supports [${want}]`);
    have.forEach((v) => {
      if ((c[v] || 0) < T.SYLL_FLOOR) err(`S8 ${loc}: value ${v} offered with only ${c[v] || 0} cards (floor ${T.SYLL_FLOOR})`);
    });
  });
  const distinct = Object.keys(got).map((l) => got[l]).filter((v, i, a) => a.indexOf(v) === i);
  /* ⚠ NON-VACUITY: if every locale got the same list the computation is
     indistinguishable from the hardcoded [1,2,3] this replaced. */
  if (distinct.length < 2) err('S8 every locale offers the SAME syllable values — the per-locale computation is not doing anything');
  else say(`  S8 syllable values are genuinely per-locale: ${distinct.join('  |  ')}`);
}

/* ---------- S9 NO VERDICT ----------
   ⚠⚠ THE BAN IS SCOPED TO THE CODE, NOT THE COMMENTS, and that correction
   is the recorded `Zufallsbeutel` trap in a new dress: the first version
   scanned the whole file and condemned FOUR CORRECT LINES — this tool's
   own doctrine comments legitimately contain "timer", "wrong" and "900ms
   timer" while explaining the defects it refuses. A ban that rejects
   correct prose teaches the next author to reword around it. */
{
  const bannedWord = /\b(score|streak|timer|countdown|incorrect|well done|try again)\b/i;
  const bannedCls = /hp-(correct|wrong|right|error|bad|good)\b/;
  const scan = (text, label) => {
    const hits = [];
    text.split('\n').forEach((l, i) => {
      if (bannedWord.test(l) || bannedCls.test(l)) hits.push(label + ' ' + (i + 1) + ': ' + l.trim().slice(0, 70));
    });
    return hits;
  };
  const hits = scan(SRC_NC, 'code');
  if (hits.length) err(`S9 grading vocabulary reached the tool:\n      ${hits.slice(0, 4).join('\n      ')}`);
  else say('  S9 no score, streak, timer or verdict in the code or the strings');
  /* ⭐ POISON, BOTH DIRECTIONS — and THROUGH THE SAME PIPELINE. My first
     version handed the must-pass case straight to scan() while the real
     check runs on comment-stripped source, so the poison exercised a
     different code path than the thing it was certifying and reported a
     failure against a correct build. A poison that skips a stage of the
     pipeline is testing a stage that does not exist. */
  if (!scan(strip("var s = 'Your score: 3';"), 'poison').length)
    err('S9 the ban is INERT — it does not fire on a real violation');
  if (scan(strip('/* the 900ms timer that render() cleared — never a verdict */'), 'poison').length)
    err('S9 the ban is TOO WIDE — it condemns a doctrine comment');
  ['score', 'streak', 'tries', 'attempts', 'correctCount'].forEach((f) => {
    if (Object.prototype.hasOwnProperty.call(T, f)) err(`S9 the tool carries a "${f}" field`);
  });
}

/* ---------- S10 FENCE ----------
   ⚠ comments-stripped for the same reason: this tool's header NAMES the
   four things it must not drift into, sort-bins-core among them. */
{
  const fence = /sort-bins-core|SortBinsCore|\.sb-/;
  if (fence.test(SRC_NC)) err('S10 the sort-bins fence is broken');
  else say('  S10 fence clean — zero lines from sort-bins-core');
  if (!fence.test("var x = require('sort-bins-core');")) err('S10 the fence check is INERT');
}

/* ---------- S11 IDENTITY ---------- */
{
  mark();
  if (DECLARED.id !== 'sorting-hoops') err(`S11 id is "${DECLARED.id}"`);
  if (!/^lcs:sorting-hoops:v\d+$/.test(DECLARED.STORE_KEY || '')) err(`S11 STORE_KEY is "${DECLARED.STORE_KEY}"`);
  if (DECLARED.premium !== false) err('S11 premium must DECLARE false — unknown entitlement is pessimistic');
  if (DECLARED.tasks || DECLARED.nextTask) err('S11 a free-play instrument must declare no tasks');
  /* ⭐ the redundant colour channel is not a preference */
  if (DECLARED.defaults.patterns !== true)
    err('S15 defaults.patterns must be TRUE: colour is a sortable attribute here, yellow is 1.94:1 ' +
        'on the ground and red/green collapse to dE 14.5 under protanopia');
  clean('  S11 identity declared correctly');
}

/* ---------- S12 NO EXFIL ---------- */
{
  mark();
  const allow = [/\/api\/auth\/me/, /\/mini-tools\/pww-index-/, /\/mini-tools\/object-attributes\.json/,
    /\/mini-tools\/syllable-counts\.json/, /\/mini-tools\/sorting-hoops-pool\.json/];
  const found = SRC.match(/fetch\(\s*(['"`][^'"`]+|[A-Za-z_$][\w$]*)/g) || [];
  const urls = SRC.match(/['"`](\/[^'"`]*)['"`]/g) || [];
  urls.map((u) => u.slice(1, -1)).filter((u) => /^\/(api|mini-tools)\//.test(u)).forEach((u) => {
    if (!allow.some((re) => re.test(u))) err(`S12 unexpected endpoint: ${u}`);
  });
  if (/navigator\.sendBeacon|new WebSocket|XMLHttpRequest|gtag\(|analytics/i.test(SRC))
    err('S12 a beacon, socket or analytics call reached the tool');
  if (!found.length) err('S12 near-vacuous: no fetch call was found at all');
  else clean(`  S12 ${found.length} fetch site(s), all on the allowlist`);
}

/* ---------- S13 STRINGS ---------- */
{
  const keys = Object.keys(T.strings);
  /* every locale block must carry en */
  keys.forEach((k) => { if (!T.strings[k].en) err(`S13 strings.${k} has no en`); });
  /* placeholder parity across the locales that DO exist */
  keys.forEach((k) => {
    const ph = [];
    ALL_LOCALES.forEach((L) => {
      const v = T.strings[k][L];
      if (!v) return;
      (v.match(/\{\w+\}/g) || []).forEach((p) => { if (ph.indexOf(p) < 0) ph.push(p); });
    });
    ALL_LOCALES.forEach((L) => {
      const v = T.strings[k][L];
      if (!v) return;
      ph.forEach((p) => { if (v.indexOf(p) < 0) err(`S13 strings.${k}.${L} drops placeholder ${p}`); });
    });
  });
  /* ⚠ A15 NO DEAD STRINGS. A key can be reached through a ternary or a
     lookup map, so a scan for a literal t('key') false-flags live keys —
     these are the keys reachable only through a MAP, each named. */
  const VIA_MAP = ['rColour', 'rShape', 'rSize', 'rLiving', 'rNatural', 'rEdible', 'rMoves',
    'rSizeBand', 'rHabitat', 'rSyll', 'rInitial', 'famColour', 'famShape', 'famSize', 'famSyll',
    'famInitial', 'famLiving', 'famNatural', 'famEdible', 'famMoves', 'famSizeBand', 'famHabitat',
    'vRed', 'vBlue', 'vYellow', 'vGreen', 'vCircle', 'vSquare', 'vTriangle', 'vHexagon',
    'vBig', 'vSmall', 'vLiving', 'vOnceLiving', 'vNeverLiving', 'vNatural', 'vMade', 'vEdible',
    'vNotEdible', 'vSelf', 'vMoved', 'vStill', 'vHand', 'vPerson', 'vBigger', 'vLand', 'vWater',
    'vAir', 'modeLabelled', 'modeGuess', 'modeChild', 'trayBlocks', 'trayPictures',
    'hintOpenStart', 'hintOpenLens', 'hintOpenBoth', 'hintChoose', 'hintSecret', 'hintGuessStart',
    'hintGuessOut', 'hintGuessRead', 'hintRevealed', 'hintTrayEmpty', 'hintCarry',
    'hintRuleChanged', 'hintChildTurn', 'refuseNoRule', 'refuseSameRule', 'refuseNoPair',
    'confirmClear', 'gatePrint', 'gateRules', 'rSyll1'];
  /* SHELL-CONSUMED: read by lcs-shell.js:448-449 before mount, never by us */
  const SHELL = ['title', 'instruction', 'setSpeak'];
  const dead = keys.filter((k) => {
    if (SHELL.indexOf(k) > -1 || VIA_MAP.indexOf(k) > -1) return false;
    return SRC_NC.indexOf("'" + k + "'") < 0 && SRC_NC.indexOf('"' + k + '"') < 0;
  });
  if (dead.length) err(`S13 dead string(s) — authored and never referenced: ${dead.join(', ')}`);
  /* and the reverse: every key the tool ASKS for must exist */
  const asked = (SRC_NC.match(/api\.t\(\s*'([A-Za-z0-9_]+)'/g) || [])
    .map((s) => s.replace(/.*'([A-Za-z0-9_]+)'/, '$1'));
  const missing = asked.filter((k) => !T.strings[k]).filter((v, i, a) => a.indexOf(v) === i);
  if (missing.length) err(`S13 the tool asks for string(s) that do not exist: ${missing.join(', ')}`);
  if (!dead.length && !missing.length) say(`  S13 ${keys.length} strings, none dead, none missing`);
}

/* ---------- S14 CSS ---------- */
{
  mark();
  if (!/getElementById\('hp-style'\)/.test(SRC)) err('S14 the CSS injector is not idempotent');
  if (!/@media print/.test(SRC)) err('S14 no print block');
  if (!/prefers-reduced-motion/.test(SRC)) err('S14 no reduced-motion block');
  /* ⭐ the ring stroke, read out of the emitted CSS */
  const m = /\.hp-ring\{[^}]*stroke-width:\s*([\d.]+)/.exec(SRC);
  if (!m) err('S14 could not find the ring stroke-width in the emitted CSS');
  else if (parseFloat(m[1]) < 4) err(`S14 ⭐ the ring stroke is ${m[1]} — vector-effect:non-scaling-stroke ` +
    'resolves it in VIEWPORT units, so this is CSS pixels and a sub-pixel hairline');
  /* the print block must be scoped so a free Ctrl+P gets nothing: the
     sheet is only in the DOM when the account carries it */
  if (!/if \(!this\.premium\) return;/.test(SRC)) err('S14 the print sheet is not entitlement-gated in the DOM');
  /* aspect-bound ring box */
  if (!/aspect-ratio:3 \/ 2/.test(SRC)) err('S14 the ring box is not aspect-bound — the SVG will letterbox and the zones will drift');
  const lcs = (SRC.match(/\.lcs-[a-z-]+/g) || []).filter((s) => s !== '.lcs-app');
  if (lcs.length) warn(`S14 references shell classes: ${lcs.slice(0, 4).join(', ')}`);
  clean('  S14 CSS contract holds');
}

/* ---------- S15 ⭐ THE PALETTE, MEASURED ---------- */
{
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16) / 255);
  const rgb2lms = (r, g, b) => { r = lin(r); g = lin(g); b = lin(b);
    return [17.8824 * r + 43.5161 * g + 4.11935 * b, 3.45565 * r + 27.1554 * g + 3.86714 * b,
      0.0299566 * r + 0.184309 * g + 1.46709 * b]; };
  const lms2rgb = (l, m, s) => {
    const r = 0.0809444479 * l - 0.130504409 * m + 0.116721066 * s;
    const g = -0.0102485335 * l + 0.0540193266 * m - 0.113614708 * s;
    const b = -0.000365296938 * l - 0.00412161469 * m + 0.693511405 * s;
    const un = (c) => { c = Math.max(0, Math.min(1, c)); return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; };
    return [un(r), un(g), un(b)];
  };
  const SIM = { normal: (v) => v,
    protan: (v) => [2.02344 * v[1] - 2.52581 * v[2], v[1], v[2]],
    deutan: (v) => [v[0], 0.494207 * v[0] + 1.24827 * v[2], v[2]],
    tritan: (v) => [v[0], v[1], -0.395913 * v[0] + 0.801109 * v[1]] };
  const lab = (rgb) => { const [r, g, b] = rgb.map(lin);
    let X = 0.4124 * r + 0.3576 * g + 0.1805 * b, Y = 0.2126 * r + 0.7152 * g + 0.0722 * b,
        Z = 0.0193 * r + 0.1192 * g + 0.9505 * b;
    X /= 0.95047; Z /= 1.08883;
    const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
    return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]; };
  const dE = (a, b) => Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) * (v - b[i]), 0));
  const sim = (hex, mode) => lab(lms2rgb.apply(null, SIM[mode](rgb2lms.apply(null, hex2rgb(hex)))));

  const P = T.PALETTE;
  const inks = Object.keys(P.blocks).map((k) => ({ k, hex: P.blocks[k].fill }));
  if (inks.length !== 4) err(`S15 expected 4 block inks, found ${inks.length}`);
  const BLOCK_FLOOR = 18, RING_FLOOR = 26;
  let worst = 1e9, worstPair = '', worstRing = 1e9, worstRingPair = '';
  Object.keys(SIM).forEach((mode) => {
    const L = {};
    inks.forEach((i) => { L[i.k] = sim(i.hex, mode); });
    const ring = sim(P.ink, mode);
    for (let i = 0; i < inks.length; i++) {
      const d0 = dE(L[inks[i].k], ring);
      if (d0 < worstRing) { worstRing = d0; worstRingPair = mode + ' ring~' + inks[i].k; }
      for (let j = i + 1; j < inks.length; j++) {
        const d = dE(L[inks[i].k], L[inks[j].k]);
        if (d < worst) { worst = d; worstPair = mode + ' ' + inks[i].k + '~' + inks[j].k; }
      }
    }
  });
  if (worst < BLOCK_FLOOR) err(`S15 the block inks collapse: worst pair ${worstPair} = dE ${worst.toFixed(1)} (floor ${BLOCK_FLOOR}). ` +
    'Colour is a SORTABLE ATTRIBUTE here — a child must be able to sort by it.');
  else say(`  S15 block inks >= dE ${worst.toFixed(1)} under all four vision types (worst ${worstPair})`);
  if (worstRing < RING_FLOOR) err(`S15 ⭐ the RING INK puns on a block colour: ${worstRingPair} = dE ${worstRing.toFixed(1)} ` +
    `(floor ${RING_FLOOR}). The shipped ring A was byte-identical to block blue.`);
  else say(`  S15 the ring ink is >= dE ${worstRing.toFixed(1)} from every block colour (worst ${worstRingPair})`);
  /* the ring must not BE one of them, literally */
  inks.forEach((i) => { if (i.hex.toLowerCase() === P.ink.toLowerCase()) err(`S15 the ring ink IS block ${i.k}`); });
}

/* ---------- S16 THE POOL ---------- */
{
  mark();
  if (!POOL) err('S16 sorting-hoops-pool.json is missing — the tray falls back to the whole 933-card corpus');
  else {
    if (!POOL.keys || POOL.keys.length < 200) err(`S16 the pool is ${(POOL.keys || []).length} cards`);
    /* ⭐ THE POOL MUST ACTUALLY RESTRICT. Checking that the file exists and
       that the families are viable both PASS when buildPictures ignores the
       pool entirely and falls back to all 933 attribute-carrying cards —
       a mutation proved it. Compare the filtered build against the
       unfiltered one and require a real reduction. */
    const idxEn = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'pww-index-en.json'), 'utf8'));
    const sylEn = {};
    Object.keys(SYLRAW.keys).forEach((k) => { if (SYLRAW.keys[k].en) sylEn[k] = SYLRAW.keys[k].en; });
    const unfiltered = T.buildPictures(idxEn, ATTR, sylEn, null, T.ONSETS.en);
    const filtered = T.buildPictures(idxEn, ATTR, sylEn, POOL, T.ONSETS.en);
    if (filtered.length >= unfiltered.length)
      err(`S16 the pool does NOT restrict: ${filtered.length} with it, ${unfiltered.length} without. ` +
        'A five-year-old gets Dimetrodon and a Vacuum Cleaner again.');
    else if (filtered.length !== POOL.keys.length)
      err(`S16 the built set is ${filtered.length} but the pool names ${POOL.keys.length}`);
    else say(`  S16 the pool restricts ${unfiltered.length} -> ${filtered.length}`);
    /* every correction must be LIVE — a fix that matches what is already
       there is inert and should be deleted, not carried */
    let inert = 0, orphan = 0;
    Object.keys(POOL.fix || {}).forEach((k) => {
      if (POOL.keys.indexOf(k) < 0) { orphan++; return; }
      Object.keys(POOL.fix[k]).forEach((f) => {
        if (ATTR.keys[k] && ATTR.keys[k][f] === POOL.fix[k][f]) inert++;
      });
    });
    if (orphan) err(`S16 ${orphan} correction(s) for a key that is not in the pool — silent no-ops`);
    if (inert) err(`S16 ${inert} correction(s) are INERT (they already match the corpus)`);
    /* the curated pool must still leave every family viable in every locale */
    ALL_LOCALES.forEach((loc) => {
      const items = picsFor(loc);
      T.world = 'picture'; T.pool = items; T.premium = true;
      const fams = {};
      T._availableRules().forEach((r) => { fams[r.f] = (fams[r.f] || 0) + 1; });
      ['syllables', 'initial', 'living', 'natural', 'edible', 'moves', 'size_band', 'habitat']
        .forEach((f) => { if (!fams[f]) err(`S16 ${loc}: rule family "${f}" has no viable value in the curated pool`); });
    });
    T.premium = DECLARED.premium;
    clean(`  S16 pool ${POOL.keys.length} cards, ${Object.keys(POOL.fix || {}).length} live corrections, every family viable in 11 locales`);
  }
}

/* ---------- report ---------- */
say('');
if (ERRORS) { console.error(`verify-sorting-hoops: ${ERRORS} ERROR(S), ${WARNS} warning(s)`); process.exit(1); }
say(`verify-sorting-hoops: clean (${WARNS} warning(s))`);
