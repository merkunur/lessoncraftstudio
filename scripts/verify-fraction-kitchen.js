#!/usr/bin/env node
/* =====================================================================
   verify-fraction-kitchen.js — MEASURED build-gate for Fraction Kitchen
   (mini tools/fraction-kitchen.js). Fix the data, never the gate.

   Invariants (all measured, none asserted-by-construction):
     GEOMETRY — for every (food, n) in MENU: the correct cut set
       partitions the food into EXACTLY n pieces whose point-sampled
       areas agree within ratio ≤ 1.06 (equal parts proven, incl. the
       kitchen-local builders: pizza sixths, bar lattice, cake strips +
       4×2 grid). For every task WITH distractors: swapping one correct
       line for the distractor yields ratio ≥ 1.12 (the unequal-beat is
       genuinely unequal). pieces() count matches n.
     ART CLEARANCE — every decorative circle/ellipse parsed from the
       RENDERED body SVG (crust dots, mushrooms, olives, berries,
       highlights) sits ≥ r+3 units from EVERY candidate segment of that
       food across ALL its n (correct + distractors) — a distractor can
       never be telegraphed by topping placement.
     FRAC TABLES — 5 denominators × 3 forms × 11 locales complete;
       plural forms DISTINCT within each locale; no digits or fraction
       notation anywhere in the tables.
     STRINGS — completeness ×11; placeholder parity vs en; verdict-
       vocabulary ban per locale (no wrong/right-class words — the
       kitchen has no opinion); NO symbolic notation (½, 3/4 …) in any
       child-facing string; no "Common Core".
     EQUIV — every task cross-multiplies exactly (count × big === small,
       whole big=1 → count === small); foods + denominators resolvable.
     STORIES — 8 well-formed; discussion flag ⟺ friends ≠ n;
       per checked locale story+closing present.
     FREE_TASKS ⊆ MENU.
   Usage: node scripts/verify-fraction-kitchen.js [--locales=en]
   Exit 1 on any ERROR.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.includes(l)) : ALL;

const REPO = path.join(__dirname, '..');
const errors = [];
const E = (m) => errors.push(m);

const VERDICT = {
  en: /\b(correct|incorrect|wrong|oops)\b/i,
  de: /\b(richtig|falsch)\b/i,
  fr: /\b(correct|correcte|faux|fausse)\b/i,
  it: /\b(giusto|sbagliato|corretto)\b/i,
  es: /\b(correcto|incorrecto|equivocad)\b/i,
  pt: /\b(correto|errado|incorreto)\b/i,
  nl: /\b(goed antwoord|fout|onjuist)\b/i,
  sv: /\b(rätt svar|fel)\b/i,
  da: /\b(rigtigt svar|forkert)\b/i,
  no: /\b(riktig svar|feil)\b/i,
  fi: /\b(oikein|väärin|väärä)\b/i
};
const NOTATION_RE = /\d\s*\/\s*\d|[½⅓¼⅙⅛⅔¾⅚⅜]/;

/* ---- load the tool in a vm sandbox ---- */
const sandbox = {
  window: {},
  document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {}, body: { classList: { add: () => {} } } },
  navigator: {}, location: { search: '', hostname: 'gate' },
  localStorage: { getItem: () => null, setItem: () => {} },
  URLSearchParams: URLSearchParams, Math: Math, JSON: JSON, Date: Date
};
sandbox.global = sandbox;
try {
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(REPO, 'mini tools', 'fraction-kitchen.js'), 'utf8'), sandbox);
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
const T = sandbox.FractionKitchen;
if (!T || !T.strings || !T.FRAC) { console.log('FAIL  FractionKitchen not found'); process.exit(1); }

/* =================== 1. GEOMETRY: equal-area proof ================= */
const G = T.GEO;
const STEP = 0.4;

function segIsRadius(s) {
  const atCenter = (x, y) => Math.hypot(x - G.CX, y - G.CY) < 0.5;
  return atCenter(s.x1, s.y1) !== atCenter(s.x2, s.y2);
}
function rimAngle(x, y) {
  return ((Math.atan2(G.CY - y, x - G.CX) * 180 / Math.PI) + 360) % 360;
}
/* classify circle points by rim-angle sectors (radius cuts) */
function sampleCircleByAngle(segs) {
  const bounds = segs.map((s) => {
    const end = Math.hypot(s.x1 - G.CX, s.y1 - G.CY) < 0.5 ? [s.x2, s.y2] : [s.x1, s.y1];
    return rimAngle(end[0], end[1]);
  }).sort((a, b) => a - b);
  const counts = new Array(bounds.length).fill(0);
  for (let x = G.CX - G.R; x <= G.CX + G.R; x += STEP) {
    for (let y = G.CY - G.R; y <= G.CY + G.R; y += STEP) {
      if (Math.hypot(x - G.CX, y - G.CY) > G.R) continue;
      const a = rimAngle(x, y);
      let idx = bounds.length - 1;
      for (let i = 0; i < bounds.length; i++) if (a >= bounds[i]) idx = i;
      counts[idx]++;
    }
  }
  return counts;
}
/* classify by side-of-line signature (full-line cuts: diameters/chords/rect) */
function sampleBySignature(segs, isCircle) {
  const buckets = new Map();
  const x0 = isCircle ? G.CX - G.R : G.RX, x1 = isCircle ? G.CX + G.R : G.RR;
  const y0 = isCircle ? G.CY - G.R : G.RY, y1 = isCircle ? G.CY + G.R : G.RB;
  for (let x = x0; x <= x1; x += STEP) {
    for (let y = y0; y <= y1; y += STEP) {
      if (isCircle && Math.hypot(x - G.CX, y - G.CY) > G.R) continue;
      let sig = '';
      for (const s of segs) {
        const cross = (s.x2 - s.x1) * (y - s.y1) - (s.y2 - s.y1) * (x - s.x1);
        sig += cross >= 0 ? '1' : '0';
      }
      buckets.set(sig, (buckets.get(sig) || 0) + 1);
    }
  }
  return [...buckets.values()];
}
function measure(food, segs) {
  const isCircle = food === 'pizza';
  if (isCircle && segs.every(segIsRadius)) return sampleCircleByAngle(segs);
  if (isCircle && segs.some(segIsRadius)) return null; /* mixed — unsupported */
  return sampleBySignature(segs, isCircle);
}

for (const food of Object.keys(T.MENU)) {
  for (const n of T.MENU[food]) {
    const cuts = T.cuts(food, n);
    const counts = measure(food, cuts.correct);
    if (!counts) { E(`${food} n=${n}: mixed radius/line cut set — cannot measure`); continue; }
    const real = counts.filter((c) => c > 20);
    if (real.length !== n) { E(`${food} n=${n}: ${real.length} pieces sampled (need ${n})`); continue; }
    const ratio = Math.max(...real) / Math.min(...real);
    if (ratio > 1.06) E(`${food} n=${n}: area ratio ${ratio.toFixed(3)} > 1.06 — NOT equal parts`);
    /* pieces() agreement */
    const pieceCount = T.pieces(food, n).length;
    if (pieceCount !== n) E(`${food} n=${n}: pieces() returns ${pieceCount} paths (need ${n})`);
    /* distractor swap must be measurably unequal */
    if (cuts.distractors.length) {
      const swapped = cuts.correct.slice(1).concat([cuts.distractors[0]]);
      const sw = measure(food, swapped);
      if (sw) {
        const swReal = sw.filter((c) => c > 20);
        const swRatio = Math.max(...swReal) / Math.min(...swReal);
        if (swRatio < 1.12) E(`${food} n=${n}: distractor swap ratio ${swRatio.toFixed(3)} < 1.12 — distractor not unequal enough`);
      } else E(`${food} n=${n}: distractor swap unmeasurable (mixed set)`);
    }
  }
}

/* =================== 2. ART CLEARANCE (rendered SVG) =============== */
function distToSeg(px, py, s) {
  const dx = s.x2 - s.x1, dy = s.y2 - s.y1;
  const t = Math.max(0, Math.min(1, ((px - s.x1) * dx + (py - s.y1) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (s.x1 + t * dx), py - (s.y1 + t * dy));
}
for (const food of Object.keys(T.MENU)) {
  if (food === 'bar') continue; /* the molded lattice IS the cut set by design */
  const allSegs = [];
  for (const n of T.MENU[food]) {
    const c = T.cuts(food, n);
    allSegs.push(...c.correct, ...c.distractors);
  }
  const svg = T._bodySVG(food);
  const deco = [];
  let m;
  const circleRe = /<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/g;
  while ((m = circleRe.exec(svg))) {
    const r = parseFloat(m[3]);
    if (r >= 12) continue; /* body base shapes */
    deco.push({ x: parseFloat(m[1]), y: parseFloat(m[2]), r });
  }
  const ellipseRe = /<ellipse cx="([\d.]+)" cy="([\d.]+)" rx="([\d.]+)"/g;
  while ((m = ellipseRe.exec(svg))) deco.push({ x: parseFloat(m[1]), y: parseFloat(m[2]), r: parseFloat(m[3]) });
  for (const d of deco) {
    for (const s of allSegs) {
      const dist = distToSeg(d.x, d.y, s);
      if (dist < d.r + 3) {
        E(`${food}: decoration at (${d.x},${d.y}) r${d.r} only ${dist.toFixed(1)} from a candidate segment (need ≥ ${(d.r + 3).toFixed(1)})`);
        break;
      }
    }
  }
}

/* =================== 3. FRAC tables ================================ */
const DENS = [2, 3, 4, 6, 8];
for (const den of DENS) {
  const row = T.FRAC[den];
  if (!row || !row.s || !row.p || !row.c) { E(`FRAC[${den}]: missing s/p/c forms`); continue; }
  for (const form of ['s', 'p', 'c']) {
    for (const L of LOCALES) {
      const v = row[form][L];
      if (!v || !v.trim()) E(`FRAC[${den}].${form}.${L}: empty`);
      else if (NOTATION_RE.test(v) || /\d/.test(v)) E(`FRAC[${den}].${form}.${L}: contains digits/notation ("${v}")`);
    }
  }
}
for (const L of LOCALES) {
  const plurals = DENS.map((d) => T.FRAC[d] && T.FRAC[d].p && T.FRAC[d].p[L]).filter(Boolean);
  if (new Set(plurals).size !== plurals.length) E(`FRAC plurals not distinct for ${L}: ${plurals.join(' | ')}`);
}

/* =================== 4. strings ==================================== */
const S = T.strings;
for (const key of Object.keys(S)) {
  const en = S[key].en;
  if (!en) { E(`strings.${key}: missing en`); continue; }
  const ph = (en.match(/\{\w+\}/g) || []);
  for (const L of LOCALES) {
    const v = S[key][L];
    if (!v || !v.trim()) { E(`strings.${key}.${L}: empty`); continue; }
    for (const p of ph) if (!v.includes(p)) E(`strings.${key}.${L}: drops placeholder ${p}`);
    if (VERDICT[L] && VERDICT[L].test(v)) E(`strings.${key}.${L}: verdict vocabulary ("${v}")`);
    if (NOTATION_RE.test(v)) E(`strings.${key}.${L}: fraction notation ("${v}")`);
    if (/Common Core/.test(v)) E(`strings.${key}.${L}: mentions Common Core`);
  }
}

/* =================== 5. equivalence cross-multiply ================= */
if (!Array.isArray(T.EQUIV) || T.EQUIV.length !== 6) E(`EQUIV: ${(T.EQUIV || []).length} tasks (need 6)`);
for (const q of T.EQUIV || []) {
  if (q.count * q.big !== q.small) E(`EQUIV ${q.id}: ${q.count} × ${q.big} ≠ ${q.small} — cross-multiply fails`);
  if (!T.MENU[q.food]) E(`EQUIV ${q.id}: unknown food ${q.food}`);
  else {
    if (q.big !== 1 && T.MENU[q.food].indexOf(q.big) < 0) E(`EQUIV ${q.id}: big=${q.big} not in MENU.${q.food}`);
    if (T.MENU[q.food].indexOf(q.small) < 0) E(`EQUIV ${q.id}: small=${q.small} not in MENU.${q.food}`);
  }
}

/* ---- 5b. tray slots exactly tile the reference piece (measured) ---- */
function boundsFromSegs(segs) {
  const out = [];
  for (const s of segs) {
    if (segIsRadius(s)) {
      const end = Math.hypot(s.x1 - G.CX, s.y1 - G.CY) < 0.5 ? [s.x2, s.y2] : [s.x1, s.y1];
      out.push(rimAngle(end[0], end[1]));
    } else {
      out.push(rimAngle(s.x1, s.y1), rimAngle(s.x2, s.y2));
    }
  }
  return [...new Set(out.map((a) => Math.round(a * 10) / 10))].sort((a, b) => a - b);
}
for (const q of T.EQUIV || []) {
  const slots = T._equivSlots(q);
  if (slots.length !== q.count) { E(`EQUIV ${q.id}: ${slots.length} tiling slots (need ${q.count})`); continue; }
  if (q.big === 1) continue;
  let mismatch = 0, total = 0;
  if (q.food === 'pizza') {
    const bigB = boundsFromSegs(T.cuts('pizza', q.big).correct);
    const smallB = boundsFromSegs(T.cuts('pizza', q.small).correct);
    for (let x = G.CX - G.R; x <= G.CX + G.R; x += STEP) {
      for (let y = G.CY - G.R; y <= G.CY + G.R; y += STEP) {
        if (Math.hypot(x - G.CX, y - G.CY) > G.R) continue;
        const a = rimAngle(x, y);
        const inRef = a >= bigB[0] && a < bigB[1];
        let si = smallB.length - 1;
        for (let i = 0; i < smallB.length; i++) if (a >= smallB[i]) si = i;
        total++;
        if (inRef !== slots.includes(si)) mismatch++;
      }
    }
  } else {
    const xs = [G.RX], ys = [G.RY];
    T.cuts(q.food, q.small).correct.forEach((s) => { if (s.x1 === s.x2) xs.push(s.x1); else ys.push(s.y1); });
    xs.push(G.RR); ys.push(G.RB);
    xs.sort((a, b) => a - b); ys.sort((a, b) => a - b);
    const bb = T._pieceBBox(q.food, q.big, 0);
    for (let x = G.RX + 0.1; x < G.RR; x += STEP) {
      for (let y = G.RY + 0.1; y < G.RB; y += STEP) {
        let xi = 0, yi = 0;
        for (let i = 0; i < xs.length - 1; i++) if (x >= xs[i]) xi = i;
        for (let i = 0; i < ys.length - 1; i++) if (y >= ys[i]) yi = i;
        const si = yi * (xs.length - 1) + xi;
        const inRef = x > bb.x && x < bb.x + bb.w && y > bb.y && y < bb.y + bb.h;
        total++;
        if (inRef !== slots.includes(si)) mismatch++;
      }
    }
  }
  if (mismatch / total > 0.015) E(`EQUIV ${q.id}: slot union ≠ reference piece (${(100 * mismatch / total).toFixed(1)}% of points mismatch)`);
}

/* =================== 6. stories ==================================== */
if (!Array.isArray(T.STORIES) || T.STORIES.length !== 8) E(`STORIES: ${(T.STORIES || []).length} (need 8)`);
const sids = new Set();
let discussions = 0;
for (const st of T.STORIES || []) {
  if (sids.has(st.id)) E(`STORIES: duplicate id ${st.id}`);
  sids.add(st.id);
  if (!T.MENU[st.food] || T.MENU[st.food].indexOf(st.n) < 0) E(`STORIES ${st.id}: (${st.food}, ${st.n}) not in MENU`);
  const mismatch = st.friends !== st.n;
  if (st.discussion !== mismatch) E(`STORIES ${st.id}: discussion=${st.discussion} but friends ${st.friends} vs n ${st.n}`);
  if (st.discussion) discussions++;
  for (const L of LOCALES) {
    if (!st.story || !st.story[L]) E(`STORIES ${st.id}: story.${L} missing`);
    if (!st.closing || !st.closing[L]) E(`STORIES ${st.id}: closing.${L} missing`);
    for (const fld of ['story', 'closing']) {
      const v = st[fld] && st[fld][L];
      if (v && VERDICT[L] && VERDICT[L].test(v)) E(`STORIES ${st.id}.${fld}.${L}: verdict vocabulary`);
      if (v && NOTATION_RE.test(v)) E(`STORIES ${st.id}.${fld}.${L}: notation`);
    }
  }
}
if ((T.STORIES || []).length === 8 && discussions !== 2) E(`STORIES: ${discussions} discussion stories (need exactly 2)`);

/* =================== 7. free/premium menu ========================== */
for (const food of Object.keys(T.FREE_TASKS)) {
  if (!T.MENU[food]) E(`FREE_TASKS: unknown food ${food}`);
  else for (const n of T.FREE_TASKS[food]) if (T.MENU[food].indexOf(n) < 0) E(`FREE_TASKS: ${food} ${n} not in MENU`);
}

/* =================== report ======================================== */
if (errors.length) {
  console.log(`FAIL — ${errors.length} error(s):`);
  errors.slice(0, 40).forEach((e) => console.log('  ✗ ' + e));
  if (errors.length > 40) console.log(`  … +${errors.length - 40} more`);
  process.exit(1);
}
console.log(`PASS — fraction-kitchen verified (locales: ${LOCALES.join(',')})`);
console.log('  ✓ geometry: every (food,n) → n pieces, area ratio ≤1.06; distractor swaps ≥1.12');
console.log('  ✓ art clearance: every decoration ≥ r+3 from every candidate segment');
console.log(`  ✓ FRAC tables ${DENS.length}×3×${LOCALES.length} complete + distinct + notation-free`);
console.log(`  ✓ ${Object.keys(S).length} strings complete; verdict + notation bans hold`);
console.log('  ✓ 6 equivalence tasks cross-multiply exactly; 8 stories well-formed (2 discussion)');
