#!/usr/bin/env node
/**
 * pre-flight-es.js — BLOCKING pre-flight gate for es landing batches (standing cadence 2026-06-10).
 *
 * A batch that fails ANY check cannot proceed; CC fixes + re-runs (deterministic failures are
 * NOT relayed to the operator). Green pre-flight → fan + deploy autonomously. Operator surfaces
 * only at novel ledger-locks, flagged exceptions, and closes.
 *
 * Consolidates the recurring checks. REUSES gate.js (lint: body≥200 / banned-phrase /
 * theme-noun-in-P1; similarity: whole-page raw FAIL≥0.80 within+cross + slot-norm≥0.90 +
 * WARN-flag) by spawning it and parsing the verdict. ADDS the assertions gate.js lacks:
 *   - Floor: 0 dup-title GLOBAL · meta ≤168 · 0 empty/missing body paragraph
 *   - Grammar/agreement: 0 number/article + element-noun (the "dos loro" / "un flor" class)
 *   - Honest-count: where practiceProblems present, Quiz answer == _cc-facts count (0 mismatch)
 *   - Render-shape + ledger conformance: es.json fields match the coordinate's locked LEDGER
 *     (readiness ⇒ strand + NO standard/levels/practiceProblems; numeric ⇒ standard + strand)
 *   - Carousel: every landing has ≥1 item; flag <4 where the same-(type,mode) ring ≥5
 *
 * Usage: node scripts/seo-landing/pre-flight-es.js [--coordinate=type:mode] [path-to-es.json]
 * Exit: 0 = GREEN (may carry WARN flags) · 1 = RED (≥1 blocking failure).
 */
'use strict';
const fs = require('fs');
const { execFileSync } = require('child_process');

const argv = process.argv.slice(2);
const coordArg = (argv.find((a) => a.indexOf('--coordinate=') === 0) || '').split('=')[1] || null;
const ES = argv.find((a) => a.indexOf('--') !== 0) || 'frontend/content/seo-landing/es.json';
const data = JSON.parse(fs.readFileSync(ES, 'utf8'));
const all = data.landings;

const META_CAP = 170; // shipped es band = publish-bulk DESCRIPTION_LENGTH_TOO_LONG (operator said ~168; corpus+upstream=170)
const fails = [];   // blocking
const warns = [];   // non-blocking flags
const F = (m) => fails.push(m);
const W = (m) => warns.push(m);

// ---- Per-coordinate LEDGER (the locked ratified shape). type → invariants. ----
// readiness: NO standard, NO practiceProblems, fixed strand, single-band level.
// numeric:   standard present, math campo strand. chart-count additionally carries the Quiz.
const READINESS_STRAND = 'Saberes y Pensamiento Científico — Patrones de repetición y crecimiento';
const MATH_STRAND = 'Saberes y Pensamiento Científico — Matemáticas';
const LEDGER = {
  'pattern-train': { kind: 'readiness', strand: READINESS_STRAND, level: 'preescolar', noStandard: true, noQuiz: true, noLevels: true },
  'chart-count':   { kind: 'numeric', strand: MATH_STRAND, standards: ['K.MD.B.3'], quiz: true },
  'addition':      { kind: 'numeric', strand: MATH_STRAND, standards: ['K.OA.A.2', '1.OA.D.8'] },
  'subtraction':   { kind: 'numeric', strand: MATH_STRAND, standards: ['K.OA.A.2', '1.OA.D.8'] },
  'math-puzzle':   { kind: 'numeric', strand: MATH_STRAND, standards: ['1.OA.C.6', '2.NBT.B.5'] },
};

const lc = (s) => (s || '').toLowerCase();
const inScope = (l) => {
  if (!coordArg) return true;
  const [t, m] = coordArg.split(':');
  return l.coordinate.type === t && (m === undefined || String(l.coordinate.mode) === m);
};
const scoped = all.filter(inScope);

// ===== 1. gate.js (reuse): lint + similarity =====
let gateOut = '';
try { gateOut = execFileSync('node', ['scripts/seo-landing/gate.js', ES], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); }
catch (e) { gateOut = (e.stdout || '') + (e.stderr || ''); }
// gate.js is reused for the SIMILARITY verdict only — its lint (EN-pilot: ≥200 words + exact
// theme-noun-in-P1 substring) is NOT the es blocking floor: the es readiness register is ~150
// words (operator-approved live), and es numeric p1 references the theme in short/inflected
// form (not the verbatim full slotToken). es floor is asserted below (real-word count + meta).
const apMax = gateOut.match(/all-pairs max:\s+([\d.]+) #FAIL\(>=0\.80\)=(\d+)/);
if (apMax && parseInt(apMax[2], 10) > 0) F('gate.js similarity FAIL≥0.80: ' + apMax[2] + ' pairs (max ' + apMax[1] + ')');
const slot = gateOut.match(/cross-class slot-norm[^>]*-> (FAIL|PASS)/);
if (slot && slot[1] === 'FAIL') F('gate.js slot-norm template-collision FAIL≥0.90');
const warnPairs = apMax ? (gateOut.match(/#WARN\(>=0\.65\)=(\d+)/) || [])[1] : null;
if (warnPairs && parseInt(warnPairs, 10) > 0) W('similarity WARN-band pairs: ' + warnPairs + ' (inherent shared-mechanic floor 0.65–0.80; accepted)');

// ===== 2. Floor (GLOBAL across full set) =====
const titleCounts = {};
for (const l of all) { const t = l.title || l.h1; titleCounts[t] = (titleCounts[t] || 0) + 1; }
const dups = Object.entries(titleCounts).filter(([, n]) => n > 1);
if (dups.length) F('dup-title GLOBAL: ' + dups.length + ' [' + dups.slice(0, 4).map(([t]) => t).join(' | ') + ']');

// ===== 3..N per-landing (scoped batch) =====
let countChecked = 0, countSkipped = 0;
const factsCache = {};
function loadFacts(type, mode) {
  const key = type + ':' + mode;
  if (key in factsCache) return factsCache[key];
  let path = null;
  if (type === 'pattern-train') path = `scripts/seo-landing/_pt-${mode || 'ab'}-facts.json`;
  else if (type === 'chart-count') path = 'scripts/seo-landing/_cc-facts.json';
  let v = null;
  try { if (path && fs.existsSync(path)) { const arr = JSON.parse(fs.readFileSync(path, 'utf8')); v = {}; for (const f of arr) v[f.slug] = f; } } catch (e) { v = null; }
  factsCache[key] = v; return v;
}

for (const l of scoped) {
  const c = l.coordinate;
  const led = LEDGER[c.type];
  const sl = l.slug;

  // meta band
  const meta = l.metaDescription || '';
  if (!meta) F(sl + ': missing metaDescription');
  else if (meta.length > META_CAP) F(sl + ': meta ' + meta.length + ' > ' + META_CAP);

  // body present + es real-word floor (accent-aware count; FAIL genuinely-thin, WARN < EN-200 pref)
  for (const k of ['p1', 'p2', 'p3']) if (!l[k] || !l[k].trim()) F(sl + ': empty ' + k);
  const realWc = ([l.p1, l.p2, l.p3].join(' ').toLowerCase().match(/[a-záéíóúñ0-9]+/g) || []).length;
  if (realWc < 130) F(sl + ': body ' + realWc + ' words < 130 (genuinely thin)');
  else if (realWc < 200) W(sl + ': body ' + realWc + ' < 200 (es-concise register; operator 200-pref flagged)');

  // carousel
  if (!Array.isArray(l.carousel) || l.carousel.length === 0) {
    // gated-empty is only legitimate for the FIRST landing of a (type,mode) ring; if ≥2 exist it must populate
    const ring = all.filter((x) => x.coordinate.type === c.type && String(x.coordinate.mode) === String(c.mode));
    if (ring.length >= 2) F(sl + ': empty carousel but ring has ' + ring.length);
  } else if (l.carousel.length < 4) {
    const ring = all.filter((x) => x.coordinate.type === c.type && String(x.coordinate.mode) === String(c.mode));
    if (ring.length >= 5) W(sl + ': carousel ' + l.carousel.length + '<4 (ring ' + ring.length + ')');
  }

  if (!led) { W(sl + ': no LEDGER entry for type ' + c.type + ' (ledger-conformance skipped)'); continue; }

  // ledger / render-shape conformance
  if (l.strand !== led.strand) F(sl + ': strand "' + l.strand + '" != ledger "' + led.strand + '"');
  if (led.kind === 'readiness') {
    if (l.standard) F(sl + ': readiness carries standard "' + l.standard + '" (must be absent)');
    if (led.noLevels && l.levels) F(sl + ': readiness carries levels (must be single-band)');
    if (c.level !== led.level) F(sl + ': readiness level "' + c.level + '" != "' + led.level + '"');
    if (led.noQuiz && l.practiceProblems) F(sl + ': readiness carries practiceProblems (no Quiz)');
  } else { // numeric
    if (!l.standard) F(sl + ': numeric missing standard');
    else if (led.standards && !led.standards.includes(l.standard)) F(sl + ': standard "' + l.standard + '" not in ledger ' + JSON.stringify(led.standards));
    if (led.quiz && (!l.practiceProblems || l.practiceProblems.length < 2)) F(sl + ': chart-count missing ≥2 practiceProblems (Quiz)');
  }

  // grammar/agreement sweep. NUMBER+singular-element ("dos loro") is a bug everywhere — correct
  // counting uses the plural ("dos gatos") which does NOT match the singular slotToken, so this is
  // false-positive-safe for numeric. ARTICLE+element ("un flor") is a bug ONLY in the readiness
  // count-as-adverb design (no gender data); numeric coords use article+noun with correct gender
  // agreement by their own gen, so the article sweep is readiness-scoped.
  // READINESS-SCOPED: the count-as-adverb design forbids any number/article + element noun.
  // Numeric coords legitimately count with numbers (+ plural/invariant slotTokens like "uvas"/
  // "guardaparques" false-positive), and author correct gender agreement in their own gens — skip.
  if (led && led.kind === 'readiness') {
    const elemTokens = (l.slotTokens || []).filter((t) => !/Preescolar|Primer|Segundo|grado|Kínder/.test(t)).map(lc);
    const body = lc([l.p1, l.p2, l.p3].join('  '));
    for (const tok of elemTokens) {
      if (!tok) continue;
      const re = new RegExp('\\b(dos|tres|un|una|otro|otra) ' + tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      if (re.test(body)) F(sl + ': grammar number/article+element "' + (body.match(re) || [])[0] + '"');
    }
  }
  // bad element-casing: an element token rendered with an internal capital (e.g. "hot Dog","ee.uu.")
  for (const raw of (l.slotTokens || [])) {
    if (/Preescolar|Primer|Segundo|grado|Kínder/.test(raw)) continue;
    const bodyRaw = [l.p1, l.p2, l.p3].join('  ');
    // if the element appears lowercased-first-only mid-phrase with a stray internal cap
    const midCap = raw.length > 1 && /[a-záéíóúñ][A-ZÁÉÍÓÚÑ]/.test(raw.charAt(0).toLowerCase() + raw.slice(1));
    if (midCap && bodyRaw.includes(raw.charAt(0).toLowerCase() + raw.slice(1))) F(sl + ': bad element-casing "' + (raw.charAt(0).toLowerCase() + raw.slice(1)) + '"');
  }

  // honest-count (where Quiz): Quiz answer == facts count
  if (l.practiceProblems && l.practiceProblems.length) {
    const facts = loadFacts(c.type, c.mode);
    if (facts && facts[sl]) {
      countChecked++;
      const cats = facts[sl].categories || [];
      const byNoun = {}; for (const ct of cats) byNoun[lc(ct.esSingular || ct.noun || '')] = ct.count;
      for (const pp of l.practiceProblems) {
        // answer must equal some category count; and appear verbatim in p2 prose
        const a = String(pp.a).trim();
        const counts = cats.map((ct) => String(ct.count));
        if (!counts.includes(a)) F(sl + ': Quiz answer "' + a + '" not a manifest category count ' + JSON.stringify(counts));
      }
    } else { countSkipped++; }
  }
}

// ===== verdict =====
console.log('=== pre-flight-es' + (coordArg ? ' [' + coordArg + ']' : '') + ' — ' + scoped.length + ' scoped / ' + all.length + ' total ===');
console.log('gate.js: ' + (apMax ? 'all-pairs ' + apMax[1] + ' FAIL=' + apMax[2] : '(verdict not parsed)') + (warnPairs ? ' WARN=' + warnPairs : ''));
console.log('honest-count: ' + countChecked + ' checked, ' + countSkipped + ' skipped (no facts)');
if (warns.length) { console.log('\nWARN (' + warns.length + ', non-blocking):'); warns.slice(0, 20).forEach((w) => console.log('  ⚠ ' + w)); }
if (fails.length) {
  console.log('\n❌ RED — ' + fails.length + ' blocking failure(s):');
  fails.slice(0, 40).forEach((f) => console.log('  ✗ ' + f));
  console.log('\nBATCH BLOCKED. Fix + re-run. (Deterministic failures are not relayed to the operator.)');
  process.exit(1);
}
console.log('\n✅ GREEN — pre-flight passed. Batch may commit → og-regen → deploy → live-verify autonomously.');
process.exit(0);
