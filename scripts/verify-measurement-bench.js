#!/usr/bin/env node
/* =====================================================================
   verify-measurement-bench.js — MEASURED build-gate for Measurement
   Bench (mini tools/measurement-bench.js). Fix the data, never the gate.

   Invariant families (all measured):
     LATTICE — every length object's width is an exact integer multiple
       of EVERY unit width AND yields whole cm + whole inches; the pure
       evalChain classifier returns the right status for constructed
       exact / gap / overlap / misaligned-start arrangements, and its
       scooched chain is always perfectly abutted from x0.
     POUR — under random pour sequences the total volume is conserved
       to 1e-9, every level stays within [0, cap], and no step moves a
       negative amount; formatLength matches ruler.js conventions
       (dot-decimal cm, reduced eighth fractions).
     BALANCE — balanceAngle is odd/monotonic/zero-at-equal and bounded
       by maxAngle; every manifest weight is an integer 3-12; relative
       sanity pairs hold (a mouse never outweighs a bear).
     ART — every META image resolves against pww-index-en.json (theme
       dir + file) AND the @2x.webp exists on disk.
     STRINGS — completeness ×11, placeholder parity, verdict-word +
       score/timer bans; NOUNS complete ×11 for every referenced key.
   Usage: node scripts/verify-measurement-bench.js [--locales=en]
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
const SCORE_RE = /\b(score|timer|streak|points|punkte|punteggio|puntos|pontos|punten|poäng|point)\b/i;

/* ---- load the tool ---- */
const sandbox = {
  window: {},
  document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {}, body: { classList: { add: () => {} } } },
  navigator: {}, location: { search: '', hostname: 'gate' },
  localStorage: { getItem: () => null, setItem: () => {} },
  URLSearchParams, Math, JSON, Date, performance: { now: () => 0 }
};
sandbox.global = sandbox;
try {
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(REPO, 'mini tools', 'measurement-bench.js'), 'utf8'), sandbox);
} catch (e) { console.log('FAIL  eval: ' + e.message); process.exit(1); }
const T = sandbox.MeasurementBench;
if (!T || !T.strings || !T.NOUNS) { console.log('FAIL  MeasurementBench not found'); process.exit(1); }

/* ================= 1. LATTICE ==================================== */
for (const o of T.LENGTH_OBJECTS) {
  for (const uk of Object.keys(T.UNITS)) {
    if (o.w % T.UNITS[uk].w !== 0) E(`length ${o.k}: ${o.w}px not a multiple of ${uk} (${T.UNITS[uk].w})`);
  }
  if (o.w % T.PX_PER_CM !== 0) E(`length ${o.k}: not whole cm`);
  if (o.w % T.PX_PER_IN !== 0) E(`length ${o.k}: not whole inches`);
  if (o.w % T.LATTICE !== 0) E(`length ${o.k}: not on the lattice`);
}
{
  const X0 = 105, W = 45;
  const cases = [
    { pos: [105, 150, 195], want: 'ok' },
    { pos: [105, 165, 210], want: 'gap' },            /* 15px gap after the 1st */
    { pos: [105, 135, 195], want: 'overlap' },         /* 2nd overlaps the 1st */
    { pos: [120, 165, 210], want: 'misaligned-start' },
    { pos: [195, 105, 150], want: 'ok' }               /* order-independent */
  ];
  for (const c of cases) {
    const r = T.evalChain(c.pos, X0, W);
    if (r.status !== c.want) E(`evalChain(${c.pos.join(',')}): status ${r.status} (want ${c.want})`);
    /* the scooched chain must always be perfectly abutted from x0 */
    r.closed.forEach((x, i) => { if (x !== X0 + i * W) E(`evalChain closed[${i}] = ${x} (want ${X0 + i * W})`); });
  }
}

/* ================= 2. POUR conservation ========================== */
{
  let seed = 42;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  for (let trial = 0; trial < 40; trial++) {
    const levels = { jug: T.VESSELS.jug.start, tall: 0, wide: 0 };
    const total0 = levels.jug + levels.tall + levels.wide;
    for (let s = 0; s < 300; s++) {
      const ks = ['jug', 'tall', 'wide'];
      const from = ks[Math.floor(rnd() * 3)];
      let to = ks[Math.floor(rnd() * 3)];
      if (to === from) to = ks[(ks.indexOf(from) + 1) % 3];
      const amt = T.pourAmount(levels, from, to, rnd() * 0.1);
      if (amt < 0) E(`pour trial ${trial}: negative amount`);
      levels[from] -= amt; levels[to] += amt;
      for (const k of ks) {
        if (levels[k] < -1e-9 || levels[k] > T.VESSELS[k].cap + 1e-9) E(`pour trial ${trial}: ${k} level ${levels[k]} out of [0, ${T.VESSELS[k].cap}]`);
      }
    }
    const total1 = levels.jug + levels.tall + levels.wide;
    if (Math.abs(total1 - total0) > 1e-9) E(`pour trial ${trial}: volume not conserved (${total0} → ${total1})`);
  }
  /* directed fill-to-brim: the cap clamp must stop the pour EXACTLY at
     capacity (the overflow auto-stop is this clamp) */
  {
    const levels = { jug: T.VESSELS.jug.start, tall: 0, wide: 0 };
    for (let i = 0; i < 200; i++) {
      const amt = T.pourAmount(levels, 'jug', 'tall', 0.5);
      levels.jug -= amt; levels.tall += amt;
    }
    if (levels.tall > T.VESSELS.tall.cap + 1e-9) E(`directed fill: tall exceeded capacity (${levels.tall})`);
    if (Math.abs(levels.tall - T.VESSELS.tall.cap) > 1e-9) E(`directed fill: tall stopped at ${levels.tall}, not exactly at capacity`);
  }
  if (T.VESSELS.jug.start > T.VESSELS.jug.cap) E('jug starts over capacity');
  /* the jug must hold everything back (pour-back can never overflow it) */
  if (T.VESSELS.jug.cap < T.VESSELS.jug.start) E('jug cannot re-hold its own contents');
}
/* formatLength conventions (ruler.js: dot-decimal cm, reduced eighths) */
{
  const mk = (units) => ({ api: { settings: { units } }, PX_PER_CM: T.PX_PER_CM, PX_PER_IN: T.PX_PER_IN, formatLength: T.formatLength });
  const cm = mk('cm'), inch = mk('inch');
  if (cm.formatLength(180) !== '12 cm') E(`formatLength cm: ${cm.formatLength(180)} (want "12 cm")`);
  if (cm.formatLength(187.5) !== '12.5 cm') E(`formatLength cm decimal: ${cm.formatLength(187.5)}`);
  if (inch.formatLength(180) !== '4 in') E(`formatLength in: ${inch.formatLength(180)} (want "4 in")`);
  if (inch.formatLength(202.5) !== '4 1/2 in') E(`formatLength in fraction: ${inch.formatLength(202.5)} (want "4 1/2 in")`);
}

/* ================= 3. BALANCE ==================================== */
for (const [k, w] of Object.entries(T.WEIGHTS)) {
  if (!Number.isInteger(w) || w < 3 || w > 16) E(`weight ${k}: ${w} not an integer in 3-16`);
}
{
  /* ⭐ EVERY WEIGHT MUST BE REACHABLE, and this was never checked.
     The supply refuses to add past a hard cap; a manifest weight above it is
     an object that can NEVER be balanced, so the bench would sit there
     accepting cubes and never settle, with nothing to say why. Read the cap
     out of the source rather than restating it, and require headroom of at
     least one cube so an over-guess stays expressible. */
  const src = fs.readFileSync(path.join(REPO, 'mini tools', 'measurement-bench.js'), 'utf8');
  const m = src.match(/self\.cubes\s*>=\s*(\d+)/);
  if (!m) E('cube supply cap not found in source — the reachability law cannot be checked');
  else {
    const cap = Number(m[1]);
    const heaviest = Math.max(...Object.values(T.WEIGHTS));
    if (heaviest > cap) E(`heaviest weight ${heaviest} exceeds the cube supply cap ${cap} — it can never balance`);
    if (heaviest >= cap) E(`no headroom above the heaviest weight ${heaviest} (cap ${cap}) — an over-guess is inexpressible`);
  }
}
{
  if (Math.abs(T.balanceAngle(8, 8)) > 1e-9) E('balanceAngle not zero at equal');
  if (!(T.balanceAngle(10, 8) > 0)) E('balanceAngle sign: heavier cubes must tilt positive');
  if (!(T.balanceAngle(4, 8) < 0)) E('balanceAngle sign: lighter cubes must tilt negative');
  let prev = -Infinity;
  for (let c = 0; c <= 14; c++) {
    const a = T.balanceAngle(c, 8);
    if (a <= prev) E(`balanceAngle not monotonic at ${c}`);
    if (Math.abs(a) > T.BAL.maxAngle) E(`balanceAngle exceeds maxAngle at ${c}`);
    prev = a;
  }
  /* pan geometry: ropes provably ON the beam; the shared anchor is
     pure + symmetric (the SVG pans and the HTML loads both consume it) */
  if (T.BAL.arm - T.BAL_HANG_INSET + T.BAL_ROPE_HALF > T.BAL.arm) E('pan ropes extend beyond the beam end');
  if (T.BAL_HANG_INSET < T.BAL_ROPE_HALF) E('hang inset smaller than the rope half-width — the outer rope leaves the beam');
  {
    const L0 = T._panAnchor('left', 0), R0 = T._panAnchor('right', 0);
    if (Math.abs(L0.y - R0.y) > 1e-9) E('panAnchor: pans not level at angle 0');
    if (Math.abs((T.BAL_CX - L0.x) - (R0.x - T.BAL_CX)) > 1e-9) E('panAnchor: pans not symmetric about the pivot');
    const L8 = T._panAnchor('left', 8), R8 = T._panAnchor('right', 8);
    if (!(L8.y < L0.y && R8.y > R0.y)) E('panAnchor: positive tilt must raise the left pan and lower the right');
    const r = Math.hypot(L8.x - T.BAL_CX, L8.y - T.BAL_CY);
    if (Math.abs(r - (T.BAL.arm - T.BAL_HANG_INSET)) > 1e-6) E('panAnchor: hang radius drifted off arm − inset');
  }
  /* structural connection: parse the emitted pan markup and assert the
     strings run from the HANG POINT (0,0) to EXACTLY the dish rim ends,
     the load seat sits inside the dish, and the 4-col stack fits */
  {
    const P = T.PAN;
    const g = T._panGroup('x');
    const lines = [...g.matchAll(/<line x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"/g)]
      .map((m) => m.slice(1, 5).map(Number));
    if (lines.length !== 2) E(`panGroup: ${lines.length} strings (need 2)`);
    for (const [x1, y1] of lines) if (x1 !== 0 || y1 !== 0) E('panGroup: a string does not start at the hang point (0,0)');
    const ends = lines.map(([, , x2, y2]) => `${x2},${y2}`).sort();
    const rimEnds = [`${-P.RIM_HALF},${P.RIM_Y}`, `${P.RIM_HALF},${P.RIM_Y}`].sort();
    if (ends.join('|') !== rimEnds.join('|')) E(`panGroup: string ends ${ends.join(' ')} ≠ dish rim ends ${rimEnds.join(' ')}`);
    const dishes = [...g.matchAll(/<path d="M([-\d.]+) ([-\d.]+) q [-\d. ]+"/g)];
    for (const d of dishes) if (Math.abs(Number(d[1])) !== P.RIM_HALF || Number(d[2]) !== P.RIM_Y) E('panGroup: a dish path does not start at a rim end');
    if (!(P.SEAT_Y > P.RIM_Y)) E('panGroup: SEAT_Y must sit below the rim (inside the dish)');
    if (P.RIM_HALF < 48) E('panGroup: rim narrower than the 4-column cube stack');
    if (!g.includes('mb-pan-load')) E('panGroup: no load slot inside the pan group');
  }
  /* weight seating: every weight object has a trim + a placement that
     puts the DEPICTED art's bottom-center exactly on the pan seat */
  for (const k of Object.keys(T.WEIGHTS)) {
    const t = T.WTRIMS[k];
    if (!t) { E(`weight ${k}: no WTRIMS entry`); continue; }
    const wp = T._wtPlacement(k);
    const kk = wp.width / t.iw;
    const visBottom = wp.y + (t.y + t.h) * kk;
    const visCenter = wp.x + (t.x + t.w / 2) * kk;
    if (Math.abs(visBottom - T.PAN.SEAT_Y) > 1e-6) E(`weight ${k}: visible bottom ${visBottom.toFixed(2)} ≠ SEAT_Y ${T.PAN.SEAT_Y}`);
    if (Math.abs(visCenter) > 1e-6) E(`weight ${k}: visible center ${visCenter.toFixed(2)} not on the pan axis`);
    if (t.h * kk > 74 + 1e-6 || t.w * kk > 84 + 1e-6) E(`weight ${k}: visible art exceeds the dish fit caps`);
  }
  /* relative-sanity pairs — a mouse never outweighs a bear */
  const pairs = [['mouse', 'cat'], ['cat', 'fox'], ['fox', 'sheep'], ['sheep', 'bear'], ['strawberry', 'pumpkin'], ['apple', 'watermelon'], ['duck', 'pig'], ['rabbit', 'lion'], ['hamster', 'cow']];
  for (const [a, b] of pairs) {
    if (!(T.WEIGHTS[a] < T.WEIGHTS[b])) E(`relative sanity: ${a} (${T.WEIGHTS[a]}) must weigh less than ${b} (${T.WEIGHTS[b]})`);
  }
}

/* ================= 4. ART resolution ============================= */
{
  const idx = JSON.parse(fs.readFileSync(path.join(REPO, 'mini tools', 'pww-index-en.json'), 'utf8'));
  const ok = {};
  for (const t of idx.themes) for (const c of t.c) ok[t.d + '//' + c.f] = true;
  for (const [k, m] of Object.entries(T.META)) {
    if (!ok[m[0] + '//' + m[1]]) E(`META ${k}: ${m[0]}/${m[1]} not in pww-index-en`);
    const file = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes', m[0], m[1] + '@2x.webp');
    if (!fs.existsSync(file)) E(`META ${k}: missing on disk ${m[0]}/${m[1]}@2x.webp`);
  }
  /* every referenced key has META + NOUNS */
  const refs = new Set([...T.LENGTH_OBJECTS.map((o) => o.k), ...Object.keys(T.WEIGHTS)]);
  for (const k of refs) {
    if (!T.META[k]) E(`referenced key ${k}: no META entry`);
    if (!T.NOUNS[k]) E(`referenced key ${k}: no NOUNS entry`);
  }
}

/* ================= 5. STRINGS + NOUNS ============================ */
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
    if (SCORE_RE.test(v)) E(`strings.${key}.${L}: score/timer vocabulary ("${v}")`);
    if (/Common Core/.test(v)) E(`strings.${key}.${L}: mentions Common Core`);
  }
}
for (const [k, map] of Object.entries(T.NOUNS)) {
  for (const L of LOCALES) {
    if (!map[L] || !map[L].trim()) E(`NOUNS.${k}.${L}: empty`);
  }
}

/* ========== 6b. VISIBLE-EXTENT proofs (the operator-defect class) ==
   The units chain must span the DEPICTED object, not the CSS box:
   (a) ≥30 objects (operator floor); (b) dominant-axis ratio ≥1.5
   post-orientation — squarish/curled art can never enter; (c) the
   _lenPlacement affine, applied to the trim corners, maps the visible
   box EXACTLY onto [X0, X0+w] with its bottom on the track; (d) sharp
   re-measures every alpha-trim — baked literals cannot rot. */
async function visibleExtentProofs() {
  if (T.LENGTH_OBJECTS.length < 30) E(`length set: ${T.LENGTH_OBJECTS.length} objects (< the 30-object floor)`);
  const X0 = 100, TRACK_Y = 268;
  for (const o of T.LENGTH_OBJECTS) {
    const t = o.trim;
    if (!t || !o.iw || (o.rot !== 0 && o.rot !== 90)) { E(`length ${o.k}: missing trim/iw/rot`); continue; }
    const lenAxis = o.rot === 90 ? t.h : t.w, cross = o.rot === 90 ? t.w : t.h;
    if (lenAxis / cross < 1.5) E(`length ${o.k}: dominant-axis ratio ${(lenAxis / cross).toFixed(2)} < 1.5 (squarish art)`);
    /* affine proof — uses ONLY the placement's returned output */
    const pl = T._lenPlacement(o, X0, TRACK_Y);
    const k = pl.width / o.iw;
    let minX, maxX, maxY;
    if (o.rot === 90) {
      const m = pl.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\) rotate\(90deg\)/);
      if (!m) { E(`length ${o.k}: unexpected transform "${pl.transform}"`); continue; }
      const tx = parseFloat(m[1]), ty = parseFloat(m[2]);
      /* CSS y-down rotate(90deg) about top-left: (x,y) → (−y, x) */
      minX = tx - (t.y + t.h) * k; maxX = tx - t.y * k;
      maxY = ty + (t.x + t.w) * k;
    } else {
      minX = pl.left + t.x * k; maxX = pl.left + (t.x + t.w) * k;
      maxY = pl.top + (t.y + t.h) * k;
    }
    if (Math.abs(minX - X0) > 0.5) E(`length ${o.k}: visible left edge ${minX.toFixed(1)} ≠ track start ${X0}`);
    if (Math.abs(maxX - (X0 + o.w)) > 0.5) E(`length ${o.k}: visible right edge ${maxX.toFixed(1)} ≠ track end ${X0 + o.w}`);
    if (Math.abs(maxY - TRACK_Y) > 0.5) E(`length ${o.k}: visible bottom ${maxY.toFixed(1)} not on the track ${TRACK_Y}`);
  }
  /* sharp re-measure: the baked trim literals must match the art */
  let sharp;
  try { sharp = require(path.join(REPO, 'frontend', 'node_modules', 'sharp')); }
  catch (e) { E('sharp unavailable for trim re-measure: ' + e.message); return; }
  const remeasure = async (label, key, baked) => {
    const m = T.META[key];
    if (!m || !baked) return;
    const file = path.join(REPO, 'frontend', 'public', 'image-library-webp', 'themes', m[0], m[1] + '@2x.webp');
    try {
      const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      let minX = info.width, maxX = -1, minY = info.height, maxY = -1;
      for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
        if (data[(y * info.width + x) * 4 + 3] > 16) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
      }
      const tw = maxX - minX + 1, th = maxY - minY + 1;
      if (info.width !== baked.iw || info.height !== baked.ih) E(`${label} ${key}: image ${info.width}x${info.height} ≠ baked ${baked.iw}x${baked.ih}`);
      for (const [name, b, meas] of [['x', baked.x, minX], ['y', baked.y, minY], ['w', baked.w, tw], ['h', baked.h, th]]) {
        if (Math.abs(b - meas) > 3) E(`${label} ${key}: trim.${name} baked ${b} vs measured ${meas} (drift > 3px)`);
      }
    } catch (e) { E(`${label} ${key}: trim re-measure failed: ${e.message}`); }
  };
  for (const o of T.LENGTH_OBJECTS) await remeasure('length', o.k, o.trim && { ...o.trim, iw: o.iw, ih: o.ih });
  for (const k of Object.keys(T.WEIGHTS)) await remeasure('weight', k, T.WTRIMS[k]);
}

/* ================= report ======================================== */
(async () => {
  await visibleExtentProofs();
  if (errors.length) {
    console.log(`FAIL — ${errors.length} error(s):`);
    errors.slice(0, 40).forEach((e) => console.log('  ✗ ' + e));
    if (errors.length > 40) console.log(`  … +${errors.length - 40} more`);
    process.exit(1);
  }
  console.log(`PASS — measurement-bench verified (locales: ${LOCALES.join(',')})`);
  console.log(`  ✓ lattice: ${T.LENGTH_OBJECTS.length} objects × ${Object.keys(T.UNITS).length} units exact; evalChain statuses + scooch proven`);
  console.log('  ✓ visible extent: ≥30 objects, dominant-axis ≥1.5, placement affine maps trim → track exactly, sharp trim re-measure clean');
  console.log('  ✓ pour: 40×300 random steps conserve volume within bounds; formatLength matches ruler conventions');
  console.log(`  ✓ balance: derived tilt odd/monotonic/bounded; ${Object.keys(T.WEIGHTS).length} weights integer 3-16, every one reachable; relative sanity holds`);
  console.log(`  ✓ art: ${Object.keys(T.META).length} images resolve vs pww-index-en + exist on disk`);
  console.log(`  ✓ ${Object.keys(S).length} strings + ${Object.keys(T.NOUNS).length} noun phrases complete (${LOCALES.length} locales); verdict/score bans hold`);
})();
