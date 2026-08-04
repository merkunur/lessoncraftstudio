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
const TOOL_PATH = path.join(process.env.FRK_TOOL_DIR || path.join(REPO, 'mini tools'), 'fraction-kitchen.js');
/* the raw source — §8 audits the SHAPE of the code, not just its output */
const SRC = fs.readFileSync(TOOL_PATH, 'utf8').replace(/\r\n/g, '\n');
try {
  vm.createContext(sandbox);
  vm.runInContext(SRC, sandbox);
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

/* ---- 4b. RENDERED strings: the doubling the templates can produce ----
   §4 checks each template in isolation, which cannot see a defect that
   only exists once a FRAC form is slotted into it. English shipped
   `pieceName: 'one {fs}'` while all ten siblings were bare `{fs}` —
   and the `s` form already carries its own article, so it rendered
   "one one half". The native ensembles caught exactly this doubling in
   the equiv template and fixed it across eleven locales; they missed it
   here, in the one locale none of them was asked to read.

   So render every template that slots a fraction form, in every locale,
   and look for an immediately repeated word. ================== */
{
  const jobs = [
    ['cutPrompt', (L) => ({ food: S.foodPizza[L], n: 4, fp: T.FRAC[4].p[L] })],
    ['cutPrompt/bar', (L) => ({ food: S.foodBar[L], n: 4, fp: T.FRAC[4].p[L] })],
    ['cutPrompt/cake', (L) => ({ food: S.foodCake[L], n: 4, fp: T.FRAC[4].p[L] })],
    ['cutDone', (L) => ({ n: 4, fp: T.FRAC[4].p[L] })],
    ['pieceName', (L) => ({ fs: T.FRAC[4].s[L] })],
    ['sharePrompt', (L) => ({ f: 3, food: S.foodCake[L] })],
    ['equivPrompt', (L) => ({ a: 2, small: T.FRAC[4].c[L], big: T.FRAC[2].s[L] })],
    ['equivDone', (L) => ({ a: 2, small: T.FRAC[4].c[L], big: T.FRAC[2].s[L] })]
  ];
  let rendered = 0;
  for (const [key, args] of jobs) {
    const base = key.split('/')[0];
    if (!S[base]) { E(`4b: no such string "${base}"`); continue; }
    for (const L of LOCALES) {
      const tpl = S[base][L];
      if (!tpl) continue;
      const out = tpl.replace(/\{(\w+)\}/g, (m, k) => {
        const a = args(L);
        return (k in a) ? String(a[k]) : m;
      });
      rendered++;
      const dbl = /(?:^|\s)(\p{L}+)\s+\1(?=\s|[.!?,]|$)/iu.exec(out);
      if (dbl) E(`4b DOUBLING: strings.${key}.${L} renders "${out}" — "${dbl[1]} ${dbl[1]}" (the template adds an article the FRAC form already carries)`);
    }
  }
  if (rendered < 80) E(`4b NON-VACUITY: only ${rendered} template renders checked (expected ≥80)`);
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

/* =================== 8. SOURCE SHAPE ==============================
   The output-level proofs above cannot see a method that is CALLED and
   never DEFINED, a pointer handler bound to a node its own re-render
   will replace, or an `id` inside a body that gets injected eight times
   per render. Those are properties of the SOURCE, so they are measured
   here — the gate implements its own ground truth and never asks the
   tool to confirm its own shape.

   Every check below asserts NON-VACUITY first: a regex that matched
   nothing must FAIL, not pass quietly. A scan that silently selects an
   empty set is the shape of a gate that cannot fail.
   ================================================================== */

/* ---- 8a. every this./self. call resolves to a definition ---------- */
{
  const defs = new Set();
  let m;
  const defRe = /^ {2}([A-Za-z_$][\w$]*)\s*:/gm;          /* object-literal members */
  while ((m = defRe.exec(SRC))) defs.add(m[1]);
  const calls = new Map();
  const callRe = /(?:self|this)\.([A-Za-z_$][\w$]*)\s*\(/g;
  while ((m = callRe.exec(SRC))) {
    if (!calls.has(m[1])) calls.set(m[1], SRC.slice(0, m.index).split('\n').length);
  }
  if (defs.size < 40) E(`8a NON-VACUITY: only ${defs.size} member definitions parsed (expected ≥40) — the definition scan is broken, not the tool`);
  if (calls.size < 20) E(`8a NON-VACUITY: only ${calls.size} self./this. call sites parsed (expected ≥20)`);
  for (const [name, line] of calls) {
    if (!defs.has(name)) E(`8a UNDEFINED METHOD: this.${name}() is called at line ${line} and never defined — this throws at runtime`);
  }
}

/* ---- 8b. pointer handlers follow the house drag contract ---------- */
{
  /* body of the function literal that starts at/after `from` */
  const bodyAt = (from) => {
    const open = SRC.indexOf('{', from);
    if (open < 0) return '';
    let d = 0, i = open, q = null;
    for (; i < SRC.length; i++) {
      const c = SRC[i];
      if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
      if (c === '"' || c === "'" || c === '`') { q = c; continue; }
      if (c === '{') d++;
      else if (c === '}') { d--; if (!d) return SRC.slice(open, i + 1); }
    }
    return '';
  };

  /* pointermove/up/cancel must be bound to WINDOW — a re-render replaces
     the element and takes its listeners (and its pointer capture) with
     it. unit-handle.js:680-686 / cold-line.js:578 paid for this. */
  let m, moves = 0;
  const bindRe = /([A-Za-z_$][\w$.]*)\.addEventListener\(\s*'(pointermove|pointerup|pointercancel)'/g;
  while ((m = bindRe.exec(SRC))) {
    moves++;
    if (m[1] !== 'window') {
      E(`8b DRAG CONTRACT: '${m[2]}' bound to \`${m[1]}\` at line ${SRC.slice(0, m.index).split('\n').length} — must be bound to window`);
    }
  }
  if (!moves) E('8b NON-VACUITY: no pointermove/up/cancel bindings found at all — the scan is broken');

  /* every pointerdown handler must suppress the browser gesture, or a
     touch drag becomes a page pan and dies on pointercancel */
  let downs = 0;
  const downRe = /addEventListener\(\s*'pointerdown'\s*,/g;
  while ((m = downRe.exec(SRC))) {
    downs++;
    const body = bodyAt(m.index);
    if (!body) { E('8b: could not parse a pointerdown handler body'); continue; }
    if (!/preventDefault\s*\(/.test(body)) {
      E(`8b DRAG CONTRACT: the pointerdown handler at line ${SRC.slice(0, m.index).split('\n').length} never calls preventDefault() — on touch the browser pans and cancels the drag`);
    }
  }
  if (!downs) E('8b NON-VACUITY: no pointerdown handler found at all — the scan is broken');
  /* ⚠ the floor is NOT a handler count. Three drag surfaces funnelling
     through ONE shared primitive is the goal, not a smell — an earlier
     version of this check demanded ≥2 handlers and so condemned exactly
     the architecture it exists to encourage. What must be non-vacuous is
     that every surface goes through the contract: count the CALL SITES. */
  const grabs = (SRC.match(/this\._grab\s*\(/g) || []).length;
  if (grabs < 3) E(`8b NON-VACUITY: _grab() is used by only ${grabs} surfaces (knife, pieces and supply chips must all go through it)`);

  /* touch-action:none is INERT on a non-root SVG element. Setting it on
     one is the defect, not the fix — the target must be an HTML node.
     ⚠ `.frk-piece` must NOT match `.frk-piecebtn`, which is an HTML
     button where touch-action is correct and required. The first version
     of this check had no boundary and condemned the repair. */
  if (/\.frk-piece(?![\w-])[^{]*\{[^}]*touch-action/.test(SRC) || /\bg\.style\.touchAction/.test(SRC)) {
    E('8b DRAG CONTRACT: touch-action is being set on the SVG <g> .frk-piece — it is inert there; the pointer target must be an HTML element');
  }
}

/* ---- 8c. _bodySVG is injected many times per render: no ids ------- */
{
  let injected = 0;
  for (const food of Object.keys(T.MENU)) {
    const body = T._bodySVG(food);
    injected++;
    if (/\sid\s*=/.test(body)) E(`8c: _bodySVG('${food}') contains an id — it is injected up to 8× per render, so every id would be duplicated`);
    if (body.length < 100) E(`8c NON-VACUITY: _bodySVG('${food}') returned ${body.length} chars`);
    /* the no-shame colour ban, at source. Same predicate as local-test F,
       so the two can never disagree about what "alarm red" means. */
    let h;
    const hexRe = /#([0-9A-Fa-f]{6})\b/g;
    while ((h = hexRe.exec(body))) {
      const r = parseInt(h[1].slice(0, 2), 16), g2 = parseInt(h[1].slice(2, 4), 16), b = parseInt(h[1].slice(4, 6), 16);
      if (r > 185 && g2 < 90 && b < 90) E(`8c NO-SHAME: ${food} body uses alarm-red #${h[1]} — local-test F bans it; pick a hue outside r>185 & g<90 & b<90`);
      if (g2 > 150 && r < 100 && b < 100) E(`8c NO-SHAME: ${food} body uses verdict-green #${h[1]}`);
    }
  }
  if (injected < 3) E(`8c NON-VACUITY: only ${injected} foods checked`);
}

/* ---- 8d. the foodbox must stay SQUARE ----------------------------
   The hit overlay is positioned in the foodbox's percentage space, and
   viewBox units map isotropically to px ONLY while it is square. A
   one-sided clamp would skew every hit target silently. */
{
  let m, blocks = 0, sized = 0;
  const boxRe = /\.frk-foodbox\s*\{([^}]*)\}/g;
  while ((m = boxRe.exec(SRC))) {
    blocks++;
    const decl = m[1];
    if (/aspect-ratio\s*:\s*1\b/.test(decl)) { sized++; continue; }
    const w = (decl.match(/(?:^|;)\s*width\s*:\s*([^;]+)/) || [])[1];
    const h = (decl.match(/(?:^|;)\s*height\s*:\s*([^;]+)/) || [])[1];
    if (!w && !h) continue;
    /* ⚠ a rule that sets ONE axis is the defect this section exists to
       catch, and an earlier version skipped exactly those (`if (!w || !h)
       continue`) — it could only ever see a mismatch it was already
       looking at. */
    if (!w || !h) {
      E(`8d SQUARE INVARIANT: .frk-foodbox rule #${blocks} sets ${w ? 'width' : 'height'} alone — the other axis keeps its old value and the box goes oblong`);
      continue;
    }
    sized++;
    if (w.trim() !== h.trim()) {
      E(`8d SQUARE INVARIANT: .frk-foodbox rule #${blocks} has width:${w.trim()} but height:${h.trim()} — the hit overlay's percentage maths needs a square box (or an explicit aspect-ratio:1)`);
    }
  }
  /* the floor is what the invariant NEEDS — one rule that sizes both axes
     — not a count of breakpoints, which moved into a custom property */
  if (!sized) E(`8d NON-VACUITY: no .frk-foodbox rule sizes both axes (${blocks} rules parsed)`);
}

/* =================== 9. THE FREEHAND MODEL ========================
   The decoy guides are no longer drawn, but cuts().distractors is kept
   BECAUSE it is the ideal fixture set: hand-authored segments already
   proven (§1) to split the food measurably unequally. So they are what
   the runtime area maths gets measured against.

   ⚠ The oracle is CLOSED-FORM and written here, not read off the tool.
   An earlier version asserted only that the designed demos "measure
   unequal", and it condemned two correct ones: the pizza thirds decoy is
   a RADIUS and the sixths decoy a DIAMETER, so as standalone lines they
   split the circle into equal halves. They are unequal as members of a
   PARTITION (what §1 measures by swapping), not as single cuts — and a
   seesaw sitting level on them is the honest outcome.
   ================================================================== */
{
  const G2 = T.GEO;
  /* minor circular segment cut off by a chord at distance d from centre */
  const capShare = (d) => {
    const R = G2.R;
    if (d >= R) return 0;
    return (R * R * Math.acos(d / R) - d * Math.sqrt(R * R - d * d)) / (Math.PI * R * R);
  };
  const measure = (food, a, b) => {
    T.food = food;
    const ar = T._splitAreas(a, b);
    const total = ar[0] + ar[1];
    return { small: Math.min(...ar) / total, ratio: Math.max(...ar) / Math.max(1, Math.min(...ar)) };
  };
  let checked = 0;
  /* pizza: vertical chords at a known offset from the centre */
  for (const off of [0, 6, 14, 22, 30]) {
    const x = G2.CX - off;
    const got = measure('pizza', { x: x, y: 0 }, { x: x, y: 100 }).small;
    const want = capShare(off);
    checked++;
    if (Math.abs(got - want) > 0.012) {
      E(`9: pizza chord at offset ${off} — _splitAreas says ${(100 * got).toFixed(1)}%, closed form says ${(100 * want).toFixed(1)}%`);
    }
  }
  /* a diameter at ANY angle must measure exactly half */
  for (const deg of [0, 30, 45, 75]) {
    const r = deg * Math.PI / 180;
    const a = { x: G2.CX - 60 * Math.cos(r), y: G2.CY - 60 * Math.sin(r) };
    const b = { x: G2.CX + 60 * Math.cos(r), y: G2.CY + 60 * Math.sin(r) };
    const m = measure('pizza', a, b);
    checked++;
    if (m.ratio > 1.06) E(`9: a pizza diameter at ${deg}° measures UNEQUAL (ratio ${m.ratio.toFixed(3)}) — the beat would seesaw over equal halves`);
  }
  /* rect foods: the share is just the fraction of the width */
  for (const food of ['bar', 'cake']) {
    for (const x of [50, 42, 34, 22]) {
      const got = measure(food, { x: x, y: 0 }, { x: x, y: 100 }).small;
      const w = G2.RR - G2.RX;
      const want = Math.min(x - G2.RX, G2.RR - x) / w;
      checked++;
      if (Math.abs(got - want) > 0.012) {
        E(`9: ${food} vertical cut at x=${x} — _splitAreas says ${(100 * got).toFixed(1)}%, geometry says ${(100 * want).toFixed(1)}%`);
      }
    }
  }
  /* the food mask itself. _splitAreas only ever samples INSIDE the
     bounding box, so a mask that forgets an edge is invisible to the
     area checks above — but _knifeMove asks _onFood whether the stroke
     has landed on the food at all, and a leaky mask anchors a cut in
     mid-air beside the cake. */
  {
    const inside = [{ f: 'pizza', p: { x: 50, y: 50 } }, { f: 'cake', p: { x: 50, y: 50 } }, { f: 'bar', p: { x: 20, y: 40 } }];
    const outside = [
      { f: 'pizza', p: { x: 50, y: 4 } }, { f: 'pizza', p: { x: 4, y: 50 } }, { f: 'pizza', p: { x: 96, y: 96 } },
      { f: 'cake', p: { x: 50, y: 12 } }, { f: 'cake', p: { x: 50, y: 90 } }, { f: 'cake', p: { x: 2, y: 50 } }, { f: 'cake', p: { x: 98, y: 50 } },
      { f: 'bar', p: { x: 50, y: 12 } }, { f: 'bar', p: { x: 50, y: 90 } }
    ];
    for (const c of inside) { T.food = c.f; if (!T._onFood(c.p)) E(`9: _onFood says (${c.p.x},${c.p.y}) is OFF the ${c.f}, but it is on it`); }
    for (const c of outside) { T.food = c.f; if (T._onFood(c.p)) E(`9: _onFood accepts (${c.p.x},${c.p.y}), which is OFF the ${c.f} — a stroke would anchor in mid-air`); }
    checked += inside.length + outside.length;
  }
  /* the floor, both directions: it must refuse a corner clip and accept
     a genuine lopsided attempt */
  for (const food of Object.keys(T.MENU)) {
    /* ⚠ assert the floor the TOOL uses, not one the gate re-derives.
       An earlier version computed it here and only checked the geometry
       against itself, so the tool could have shipped any floor at all and
       this section would still have passed. */
    const floor = T._cutFloor(food);
    const want = 1 / (Math.max(...T.MENU[food]) + 1);
    if (Math.abs(floor - want) > 1e-9) {
      E(`9: ${food} — the tool's free-cut floor is ${floor.toFixed(4)}, not the derived ${want.toFixed(4)} (one piece finer than this food's finest partition)`);
    }
    const clipX = food === 'pizza' ? G2.CX + G2.R * 0.80 : G2.RR - 4;
    const clip = measure(food, { x: clipX, y: 0 }, { x: clipX, y: 100 });
    if (clip.small >= floor) E(`9: ${food} — a corner clip (${(100 * clip.small).toFixed(1)}%) clears the floor ${(100 * floor).toFixed(1)}%; travel between two guides would cut the food`);
    const lopX = food === 'pizza' ? G2.CX - 18 : G2.RX + (G2.RR - G2.RX) * 0.28;
    const lop = measure(food, { x: lopX, y: 0 }, { x: lopX, y: 100 });
    if (lop.small < floor) E(`9: ${food} — a genuine lopsided attempt (${(100 * lop.small).toFixed(1)}%) is refused by the floor ${(100 * floor).toFixed(1)}%; the teachable cut would do nothing`);
    if (lop.ratio <= 1.06) E(`9: ${food} — a lopsided cut measures EQUAL (ratio ${lop.ratio.toFixed(3)})`);
    checked += 2;
  }
  if (checked < 18) E(`9 NON-VACUITY: only ${checked} freehand measurements taken (expected ≥18)`);
  T.food = 'pizza';
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
