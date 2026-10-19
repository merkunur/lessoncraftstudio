#!/usr/bin/env node
/* =====================================================================
   verify-pip-museum-core.js — the model gate for ACTIVITY #38, Professor
   Pip's Museum (K.G.A.2; G2 solids). Its OWN oracle: what a treasure IS is
   re-derived here from its points (side count, closed, straight, equal
   sides within 1 %, square corners within 1°, constant radius) — never from
   its authored name and never through the core's kindOf; the rounds are
   re-typed from designs/038 §6.
   Env PM_CORE_DIR = a directory holding a (mutated) pip-museum-core.js.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const DIR = process.env.PM_CORE_DIR || path.join(ROOT, 'mini tools');
const C = require(path.join(DIR, 'pip-museum-core.js'));
const L = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };

/* ---------- the oracle ---------- */
const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const cen = (p) => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];
const angleAt = (p, i) => { const a = p[(i + p.length - 1) % p.length], b = p[i], c = p[(i + 1) % p.length], u = [a[0] - b[0], a[1] - b[1]], v = [c[0] - b[0], c[1] - b[1]]; return Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180 / Math.PI; };
function oracle(t) {
  const g = C.shapePts(t); if (!g) return null;
  if (g.open) return 'open';
  if (g.curve) { const c = cen(g.pts), r = g.pts.map(q => d(q, c)); return Math.max(...r) - Math.min(...r) < Math.max(...r) * 0.02 ? 'circle' : 'oval'; }
  if (g.rounded || g.curvedSide != null) return 'bent';
  const p = g.pts, n = p.length, s = p.map((q, i) => d(q, p[(i + 1) % n])), eq = s.every(x => Math.abs(x - s[0]) <= s[0] * 0.01), right = p.every((q, i) => Math.abs(angleAt(p, i) - 90) <= 1);
  if (n === 3) return 'triangle';
  if (n === 4) return eq && right ? 'square' : right ? 'rectangle' : eq ? 'rhombus' : 'quad';
  if (n === 5) return 'pentagon'; if (n === 6) return 'hexagon'; return 'other';
}
const holds = (ped, t) => t.solid ? t.solid === ped : (oracle(t) === ped || (ped === 'rectangle' && oracle(t) === 'square'));

/* ---------- 1. the oracle against the core, every turn and size ---------- */
const mk = (k, more) => Object.assign({ k, a: 0, s: 0.8, id: 't0' }, more || {});
for (let a = 0; a < 360; a += 15) for (const s of [0.3, 0.6, 1]) {
  is(C.canHold('square', mk('square', { a, s })), `a square at ${a}°, ${s}: the square clasp holds it`);
  is(C.canHold('rectangle', mk('rect', { a, s, st: 3 })) && !C.canHold('square', mk('rect', { a, s, st: 1.15 })), `rectangles at ${a}°: the rectangle clasp holds 1:3, the square clasp refuses 1.15:1`);
  is(C.canHold('triangle', mk('tri-iso', { a, s })) && C.canHold('triangle', mk('tri-obtuse', { a, s })), `skinny and obtuse triangles at ${a}°`);
  is(C.canHold('hexagon', mk('hex-irr', { a, s })) && !C.canHold('hexagon', mk('pent', { a, s })), `irregular hexagon held, pentagon refused at ${a}°`);
  is(!C.canHold('square', mk('rhombus', { a, s, ang: 60 })), `a 60° rhombus at ${a}°: the square clasp refuses`);
}
is(C.canHold('circle', mk('circle', { s: 0.3 })) && !C.canHold('circle', mk('oval', { st: 1.4 })) && !C.canHold('circle', mk('cring')), 'the hoop holds a tiny circle, refuses an oval and an open ring');
is(!C.canHold('triangle', mk('tri', { open: true })) && !C.canHold('triangle', mk('tri', { curved: 1 })) && !C.canHold('rectangle', mk('rect', { st: 1.6, rounded: true })), 'open, curved-sided and rounded figures are refused');
for (const t of [mk('square', { a: 30 }), mk('rect', { st: 3, a: 60 }), mk('tri', { a: 250 }), mk('hex-irr'), mk('rhombus', { ang: 60 }), mk('oval', { st: 1.6 }), mk('pent'), mk('cring'), mk('tri', { curved: 1 })]) is(C.kindOf(t) === oracle(t), `kindOf ${JSON.stringify(t)} = ${oracle(t)}`);
/* the geometry, not the name: a "square" stretched is refused */
is(!C.canHold('square', Object.assign(mk('rect', { st: 1.15 }), { name: 'square' })), 'a 1.15:1 rectangle is refused by the square clasp whatever it is called');

/* ---------- 2. the rounds (design §6, re-typed) ---------- */
const SH = {
  S1: [['triangle', 'square', 'circle'], 0, ['square', 'triangle', 'circle', 'triangle']],
  S2: [['circle', 'hexagon', 'triangle'], 0, ['hexagon', 'triangle', 'hexagon', 'circle']],
  S3: [['square', 'circle'], 1, ['square', 'mystery', 'circle', 'mystery']],
  S4: [['triangle', 'square'], 1, ['square', 'mystery', 'triangle', 'mystery']],
  S5: [['hexagon', 'rectangle'], 1, ['rectangle', 'mystery', 'rectangle', 'hexagon', 'mystery']],
  S6: [['circle', 'triangle', 'rectangle'], 1, ['mystery', 'rectangle', 'circle', 'triangle']],
  S7: [['square', 'circle', 'hexagon'], 0, ['square', 'hexagon', 'circle', 'square', 'hexagon']],
  S8: [['rectangle', 'triangle', 'circle'], 1, ['mystery', 'rectangle', 'mystery', 'triangle', 'circle']],
  S9: [['hexagon', 'triangle', 'square'], 0, ['square', 'hexagon', 'triangle', 'square', 'hexagon', 'triangle', 'triangle', 'square']]
};
const SO = {
  D1: [['sphere', 'cube', 'cylinder'], 0, ['sphere', 'cube', 'cylinder', 'cube']], D2: [['box', 'sphere', 'cylinder'], 0, ['box', 'sphere', 'cylinder', 'box']],
  D3: [['cylinder', 'cube'], 1, ['cylinder', 'mystery', 'cube', 'mystery']], D4: [['box', 'sphere'], 1, ['box', 'sphere', 'mystery', 'box']],
  D5: [['sphere', 'cube', 'cylinder'], 0, ['cube', 'cylinder', 'sphere', 'cylinder']], D6: [['cylinder', 'box', 'sphere'], 1, ['box', 'cylinder', 'sphere', 'mystery', 'box']],
  D7: [['sphere', 'cylinder', 'cube'], 0, ['cube', 'sphere', 'cylinder', 'cylinder']], D8: [['cylinder', 'box'], 1, ['box', 'cylinder', 'mystery', 'mystery']]
};
const OBJ_SOLID = { ball: 'sphere', orange: 'sphere', dice: 'cube', present: 'cube', can: 'cylinder', drum: 'cylinder', book: 'box', eraser: 'box' };
for (const [h, TBL] of [['shapes', SH], ['solids', SO]]) {
  const rs = C.rounds(h);
  is(rs.map(r => r.id).join() === Object.keys(TBL).join(), `${h}: the round ids`);
  let tot = 0, mys = 0; const cnt = [0, 0, 0], exp = [0, 0, 0];
  for (const r of rs) {
    const T = TBL[r.id], peds = r.peds.map(p => p.kind);
    is(peds.join() === T[0].join() && !!r.mystery === !!T[1], `${r.id}: pedestals ${T[0].join('/')}${T[1] ? ' + Mystery' : ''}`);
    is(r.belt.length === T[2].length, `${r.id}: ${T[2].length} treasures`);
    r.belt.forEach((t, i) => {
      const own = peds.filter(p => holds(p, t)), want = own.length ? own : (r.mystery ? ['mystery'] : []);
      is(want.length === 1 && want[0] === T[2][i], `${r.id} treasure ${i}: exactly one place — ${T[2][i]} (oracle ${want.join('+') || 'none'})`);
      is(C.rightOf(r, t) === T[2][i], `${r.id} treasure ${i}: the core agrees (${C.rightOf(r, t)})`);
      tot++; if (T[2][i] === 'mystery') mys++; else cnt[peds.indexOf(T[2][i])]++;
    });
    const n = peds.length, k = T[2].filter(x => x !== 'mystery').length; for (let i = 0; i < n; i++) exp[i] += k / n;
    if (h === 'shapes') {
      is(!(peds.includes('rectangle') && r.belt.some(t => oracle(t) === 'square')), `${r.id}: no square beside a rectangle pedestal`);
      const shapesOnly = r.belt.filter(t => t.k);
      is(shapesOnly.some(t => ((t.a || 0) % 90 + 90) % 90 >= 30 || (t.k === 'circle')), `${r.id}: at least one treasure turned ≥ 30°`);
      is(shapesOnly.some(t => (t.s || 1) <= 0.5), `${r.id}: at least one treasure at ≤ 50 % size`);
    } else {
      r.peds.forEach(p => is(OBJ_SOLID[p.object] === p.kind, `${r.id}: the ${p.object} is a ${p.kind}`));
      is(!(peds.includes('box') && r.belt.some(t => t.solid === 'cube')), `${r.id}: no cube beside a box pedestal`);
      is(r.belt.filter(t => t.solid === 'cone' || t.solid === 'pyramid').every(t => C.rightOf(r, t) === 'mystery'), `${r.id}: cones and pyramids only go to the Mystery Gallery`);
      is(r.pair && OBJ_SOLID[r.pair] && r.peds.some(p => p.object === r.pair), `${r.id}: the success pair is one of the round's objects`);
    }
  }
  is(mys / tot <= 0.25, `${h}: the Mystery Gallery takes ≤ 25 % (${mys}/${tot})`);
  for (let i = 0; i < 3; i++) is(Math.abs(cnt[i] - exp[i]) <= 1, `${h}: answers in pedestal slot ${i + 1}: ${cnt[i]} vs a fair ${exp[i].toFixed(1)}`);
}
{ const cap = C.rounds('shapes').find(r => r.capstone), n = (k) => cap.belt.filter(t => oracle(t) === k).length;
  is(cap.capstone.triangle === n('triangle') && cap.capstone.square === n('square') && n('triangle') === 3 && n('square') === 3, `the capstone: 3 triangles and 3 squares, counted from the treasures (${n('triangle')}, ${n('square')})`); }

/* ---------- 3. the state ---------- */
{
  const r = C.rounds('shapes').find(x => x.id === 'S3'), st = C.newState(r, null), ids = r.belt.map(t => t.id);
  is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintBelt', 'Check with treasures on the belt asks — not a miss');
  C.route(st, ids[0], 'square'); C.route(st, ids[1], 'square'); C.route(st, ids[2], 'circle'); C.route(st, ids[3], 'mystery');
  let res = C.check(st);
  is(res.result === 'wrong' && res.refused.length === 1 && res.refused[0] === ids[1] && st.belt[0] === ids[1] && st.held[ids[0]] === 'square', 'the rhombus is refused by the square clasp and goes back to the belt; the turned square is held');
  is(C.hint(st) === 'hintTruth' && st.help === 1, 'miss 1: count its corners, which clasp can hold it');
  is(!C.route(st, ids[0], 'circle'), 'a held treasure stays held');
  C.route(st, ids[1], 'circle'); is(st.last === null && C.hint(st) === null && st.help === 1, 'a new drag clears the showing (the help level stays)');
  res = C.check(st); is(res.result === 'wrong' && st.help === 2 && C.hint(st) === 'hintGlow', 'the second refusal: miss 2 — the glowing place');
  C.route(st, ids[1], 'mystery'); is(C.check(st).result === 'ok' && st.done, 'the rhombus to the Mystery Gallery: done');
  is(C.route(st, ids[0], 'circle') && st.free && st.free.holds === false && st.done, 'free play after the win: the circle hoop refuses the square, the round stays done');
  /* the capstone */
  const cr = C.rounds('shapes').find(x => x.capstone), cs = C.newState(cr, null);
  cr.belt.forEach(t => C.route(cs, t.id, C.rightOf(cr, t)));
  is(C.check(cs).result === 'held' && cs.phase === 'count' && C.hint(cs) === 'hintCount', 'the capstone: all held → Pip asks how many');
  is(C.check(cs).result === 'empty' && cs.misses === 0, 'counters unset: asks');
  cs.count.triangle = 4; cs.count.square = 3; is(C.check(cs).result === 'wrong' && C.hint(cs) === 'hintCountOne', '4 triangles is wrong — count them one by one');
  is(C.setCount(cs, 'triangle', -1) && C.check(cs).result === 'ok', '3 and 3 wins');
  { const z = C.newState(cr, null); z.phase = 'count'; z.count.triangle = 1; is(!C.setCount(z, 'triangle', -1), 'the counter never goes to 0'); }
  /* the belt order is shuffled per round when asked, and only reordered */
  let seed = 3; const rnd = () => { seed = (seed * 1103515245 + 12345) >>> 0; return (seed >>> 8) / 16777216; };
  const orders = new Set(); for (let i = 0; i < 40; i++) { const s2 = C.newState(cr, rnd); is(s2.belt.slice().sort().join() === cr.belt.map(t => t.id).sort().join(), 'a shuffled belt holds the same treasures'); orders.add(s2.belt.join()); }
  is(orders.size > 20, `the belt order varies (${orders.size} orders in 40)`);
  /* solids */
  const sr = C.rounds('solids').find(x => x.id === 'D8'), ss = C.newState(sr, null);
  sr.belt.forEach(t => C.route(ss, t.id, t.solid === 'sphere' ? 'box' : C.rightOf(sr, t)));
  is(C.check(ss).result === 'wrong' && C.hint(ss) === 'hintTruthSolid', 'solids: a sphere in the box cage is refused — look at its faces');
}

/* ---------- 4. the ghost clasp is built from the treasure ---------- */
{
  const g1 = C.ghostClasp(mk('rect', { st: 1.15 })), g2 = C.ghostClasp(mk('square', { a: 45 })), g3 = C.ghostClasp(mk('rhombus', { ang: 60 })), g4 = C.ghostClasp(mk('oval', { st: 1.6 })), g5 = C.ghostClasp(mk('tri', { open: true }));
  is(g1.rods.length === 4 && new Set(g1.rods.map(r => r.group)).size === 2 && g1.locks.every(Boolean), 'a 1.15:1 rectangle builds 4 rods in TWO length groups, all corners square');
  is(g2.rods.length === 4 && new Set(g2.rods.map(r => r.group)).size === 1 && g2.locks.every(Boolean), 'a turned square builds 4 equal rods, all corners square');
  is(new Set(g3.rods.map(r => r.group)).size === 1 && g3.locks.every(x => !x), 'a rhombus builds 4 equal rods, NO square corners');
  is(g4.hoop && g4.stretch > 1.5, 'an oval builds a stretched hoop');
  is(g5.rods.some(r => r.gap), 'an open triangle builds a rod with a gap');
}

/* ---------- 5. the words ---------- */
const ctx = { window: {}, PipMuseumCore: C }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'pip-museum-activity.js'), 'utf8') + '\n;this.__A = PipMuseumActivity;', ctx);
const S = ctx.__A.strings;
const need = ['title', 'instruction', 'pShapes', 'pSolids', 'pCount', 'check', 'mystery', 'hintBelt', 'hintTruth', 'hintTruthSolid', 'hintGlow', 'hintCount', 'hintCountOne', 'hintCountNum', 'setHall', 'hShapes', 'hSolids', 'setPlates', 'pNames', 'pRiddles', 'ariaTreasure', 'ariaBelt', 'ariaPed', 'ariaPip', 'ariaMore', 'ariaLess'];
['triangle', 'square', 'circle', 'hexagon', 'rectangle', 'sphere', 'cube', 'cylinder', 'box'].forEach(k => need.push('n_' + k, 'r_' + k));
Object.keys(OBJ_SOLID).forEach(o => need.push('o_' + o));
['shapes', 'solids'].forEach(h => C.rounds(h).forEach(r => need.push('ok_' + r.id)));
for (const k of need) for (const l of L) is(S[k] && typeof S[k][l] === 'string' && S[k][l].trim(), `string ${k}.${l}`);
/* a riddle never names its own shape */
['triangle', 'square', 'circle', 'hexagon', 'rectangle', 'sphere', 'cube', 'cylinder', 'box'].forEach(k => L.forEach(l => is(!new RegExp('(?<!\\p{L})' + S['n_' + k][l] + '(?!\\p{L})', 'iu').test(S['r_' + k][l]), `r_${k}.${l} does not name the shape`)));
/* the dice and the cube are different words in every locale (de Würfel, da/no terning) */
L.forEach(l => is(S.o_dice[l].toLowerCase() !== S.n_cube[l].toLowerCase(), `${l}: the dice (${S.o_dice[l]}) is not called a cube (${S.n_cube[l]})`));
/* the solid success names the round's object and its solid */
C.rounds('solids').forEach(r => is(S['ok_' + r.id].en.includes(S['o_' + r.pair].en) && S['ok_' + r.id].en.includes(S['n_' + OBJ_SOLID[r.pair]].en), `ok_${r.id}: the ${r.pair} and its solid`));
/* no object word equals its own solid word (fi pallo = ball = sphere) */
C.rounds('solids').forEach(r => L.forEach(l => is(S['o_' + r.pair][l].toLowerCase() !== S['n_' + OBJ_SOLID[r.pair]][l].toLowerCase(), `ok_${r.id}.${l}: "${S['o_' + r.pair][l]}" is not its own solid word`)));
for (const k in S) for (const l of L) { const s = S[k][l] || ''; is(!/  /.test(s) && !/undefined|\{(?!k\}|t\}|s\})/.test(s), `${k}.${l}: clean`); if (l === 'fr') is(!/ [!?:;]/.test(s), `${k}.fr: U+202F`); const FREE = { en: 'free', de: 'kostenlos|gratis|frei', fr: 'gratuit\\w*|libre', es: 'gratis|libre', pt: 'gr[aá]tis|livre', it: 'gratis|libero|gratuit\\w*', nl: 'gratis|vrij', sv: 'gratis|ledig|fri', da: 'gratis|ledig|fri', no: 'gratis|ledig|fri', fi: 'ilmai\\w*|vapaa' }[l]; is(!new RegExp('(?<!\\p{L})(' + FREE + ')(?!\\p{L})', 'iu').test(s), `${k}.${l}: no word for "free" in this language`); }

/* the per-language ban, poisoned both ways: pt "livre" (free) fires; fr "livre" (book) passes */
{ const ban = (l, s) => { const F = { fr: 'gratuit\\w*|libre', pt: 'gr[aá]tis|livre', sv: 'gratis|ledig|fri' }[l]; return new RegExp('(?<!\\p{L})(' + F + ')(?!\\p{L})', 'iu').test(s); };
  is(ban('pt', 'Atividade livre para todos') && ban('sv', 'en ledig plats') && !ban('fr', 'le livre a la forme d’un pavé') && !ban('sv', 'en friare form'), 'the ban fires on pt "livre" and sv "ledig", passes fr "livre" (a book) and sv "friare"'); }

/* ---------- 6. pictures, order, layout ---------- */
function exact(rel) { const parts = rel.split('/'); let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
for (const o in C.OBJ) is(exact(C.OBJ[o][0] + '/' + o + '@2x.webp') && C.OBJ[o][1] === OBJ_SOLID[o], `picture ${C.OBJ[o][0]}/${o} exists (case-exact) and is a ${OBJ_SOLID[o]}`);
is(exact(C.PIP[0] + '/' + C.PIP[1] + '@2x.webp'), 'Pip the penguin exists (case-exact)');
is(!Object.keys(C.OBJ).some(o => /butter|cone|diamond|package|globe|candle/.test(o)), 'no refused picture (butter, cone, diamond, package, globe, candle)');
{ const mkr = (sd) => () => { sd = (sd * 1103515245 + 12345) >>> 0; return (sd >>> 8) / 16777216; };
  for (const h of ['shapes', 'solids']) { const pool = C.rounds(h); for (let sd = 1; sd <= 40; sd++) { const o1 = C.order(pool, mkr(sd), null), o2 = C.order(pool, mkr(sd), o1); is(o1.slice().sort((a, b) => a - b).join() === pool.map((_, i) => i).join() && o2.join() !== o1.join(), `${h}: seed ${sd} — a permutation, never the last one again`); } } }
for (let W = 288; W <= 1100; W += 16) for (const n of [3, 4]) {
  const Lo = C.layout(W, n), used = Lo.pip + n * Lo.pedW + (n - 1) * Lo.gap;
  is(used <= W, `layout @${W} × ${n}: fits (${used})`);
  is(Lo.cell >= 64 && Lo.trayCell >= 44 && Lo.pedW >= 66, `layout @${W} × ${n}: belt cells ${Lo.cell}, tray cells ${Lo.trayCell}, pedestals ${Lo.pedW} — all ≥ the tap floor`);
  is(Lo.pipPic >= (W >= 700 ? 96 : 64) && Lo.obj >= (W >= 700 ? 96 : 64), `layout @${W}: Pip and the objects at the picture floor`);
}
console.log(`verify-pip-museum-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
