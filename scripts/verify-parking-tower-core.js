#!/usr/bin/env node
/* =====================================================================
   verify-parking-tower-core.js — the model gate for ACTIVITY #36,
   Bramble's Parking Tower (K.G.A.1 → G2 grid codes + compass).
   Its OWN oracle: the rounds re-typed from designs/036 §6, the position
   words from their definitions (above = same column one level up; next
   to = same level, touching; left / right = the viewer's, same level;
   between = on one line, one on each side, touching both), the tower
   words, the grid codes (letter across, number DOWN), the compass on a
   turned rose — never read off the core.
   Env PT_CORE_DIR = a directory holding a (mutated) parking-tower-core.js.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const DIR = process.env.PT_CORE_DIR || path.join(ROOT, 'mini tools');
const C = require(path.join(DIR, 'parking-tower-core.js'));
const L = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 40) console.error('  FAIL: ' + m); } };
const k = (s) => typeof s === 'string' ? s : s.c + ',' + s.l;

/* ---------- 1. the position words, by definition ---------- */
const O = {
  above: (s, m) => s.c === m.c && s.l === m.l + 1,
  below: (s, m) => s.c === m.c && s.l === m.l - 1,
  next: (s, m) => s.l === m.l && Math.abs(s.c - m.c) === 1,
  left: (s, m) => s.l === m.l && s.c < m.c,
  right: (s, m) => s.l === m.l && s.c > m.c,
  between: (s, a, b) => (a.c === b.c && s.c === a.c && Math.abs(a.l - b.l) === 2 && s.l === (a.l + b.l) / 2) || (a.l === b.l && s.l === a.l && Math.abs(a.c - b.c) === 2 && s.c === (a.c + b.c) / 2)
};
const bays = []; for (let l = 1; l <= 3; l++) for (let c = 1; c <= 3; c++) bays.push({ c, l });
for (const s of bays) for (const m of bays) {
  if (k(s) === k(m)) continue;
  const rel = C.relation(s, m);
  for (const w of ['above', 'below', 'next', 'left', 'right']) is(rel.includes(w) === O[w](s, m), `relation ${k(s)} vs ${k(m)}: "${w}" ${O[w](s, m)}`);
  for (const b of bays) if (k(b) !== k(m) && k(b) !== k(s)) is(C.between(s, m, b) === O.between(s, m, b), `between ${k(s)} of ${k(m)} & ${k(b)}`);
}

/* ---------- 2. the near rounds (design §6, re-typed) ---------- */
const NEAR = {
  N1: ['place', 'next', 'truck', [['bus', 1, 1]], [[2, 1], [1, 2], [3, 2]], [2, 1]],
  N2: ['place', 'above', 'truck', [['van', 2, 2]], [[2, 3], [1, 2], [3, 1]], [2, 3]],
  N3: ['place', 'below', 'truck', [['car', 3, 2]], [[3, 1], [2, 2], [1, 3]], [3, 1]],
  N4: ['place', 'between', 'truck', [['bus', 1, 2], ['van', 3, 2]], [[2, 2], [2, 3], [1, 1]], [2, 2]],
  N5: ['place', 'left', 'truck', [['bulldozer', 2, 3]], [[1, 3], [3, 3], [2, 2]], [1, 3]],
  N6: ['place', 'right', 'truck', [['ambulance', 2, 1]], [[3, 1], [1, 1], [2, 2]], [3, 1]],
  N7: ['tap', 'above', 'truck', [['bus', 3, 1]], [[3, 2], [2, 1], [2, 2]], [3, 2]],
  N8: ['tap', 'left', 'truck', [['tractor', 2, 3]], [[1, 3], [3, 3], [2, 2]], [1, 3]],
  N9: ['place', 'between', 'car', [['truck', 1, 1], ['truck', 1, 3]], [[1, 2], [2, 2], [2, 1]], [1, 2]]
};
const near = C.rounds('near');
is(near.length === 9 && near.map(r => r.id).join() === Object.keys(NEAR).join(), 'near: nine rounds N1–N9');
const colN = { 1: 0, 2: 0, 3: 0 }, lvlN = { 1: 0, 2: 0, 3: 0 };
for (const r of near) {
  const d = NEAR[r.id]; if (!d) { is(false, 'unknown ' + r.id); continue; }
  const lms = d[3].map(x => ({ v: x[0], c: x[1], l: x[2] })), cands = d[4].map(x => ({ c: x[0], l: x[1] })), right = { c: d[5][0], l: d[5][1] };
  is(r.kind === d[0] && r.rel === d[1] && r.mover === d[2], `${r.id}: kind/word/mover`);
  is(JSON.stringify(r.lms.map(m => [m.v, m.c, m.l])) === JSON.stringify(d[3]), `${r.id}: the landmarks`);
  is(JSON.stringify(r.cands.map(k)) === JSON.stringify(cands.map(k)), `${r.id}: the free bays`);
  const truthOf = (s) => d[1] === 'between' ? O.between(s, lms[0], lms[1]) : O[d[1]](s, lms[0]);
  const ok = cands.filter(truthOf);
  is(ok.length === 1 && k(ok[0]) === k(right), `${r.id}: exactly one candidate is "${d[1]}" — ${k(right)}`);
  is(k(C.rightOf(r)) === k(right), `${r.id}: the core's right bay`);
  /* the core judges every bay the way the oracle does */
  for (const s of bays) { const st = C.newState(r, false); is(C.truth(st, s) === truthOf(s), `${r.id}: truth at ${k(s)}`); }
  /* the candidate set always holds a near miss (design §6: above vs next to, left vs right…) — a bay touching a landmark */
  is(cands.filter(s => k(s) !== k(right)).some(s => lms.some(m => Math.abs(s.c - m.c) <= 1 && Math.abs(s.l - m.l) <= 1)), `${r.id}: a near miss is offered`);
  /* the layout at rest: landmarks where they are, the round's trucks in the
     tap rounds, every other bay a filler that the round never names */
  const P = C.parkedAt(r), named = new Set([d[2]].concat(d[3].map(x => x[0])));
  for (const s of bays) {
    const p = P[k(s)], lm = lms.find(m => m.c === s.c && m.l === s.l), isC = cands.some(x => k(x) === k(s));
    if (lm) is(p && p.role === 'landmark' && p.v === lm.v, `${r.id}: the ${lm.v} at ${k(s)}`);
    else if (isC) is(d[0] === 'tap' ? (p && p.v === 'truck' && p.role === 'cand') : !p, `${r.id}: ${k(s)} is ${d[0] === 'tap' ? 'a truck' : 'free'}`);
    else is(p && p.role === 'filler' && !named.has(p.v), `${r.id}: ${k(s)} holds a filler the round does not name (${p && p.v})`);
  }
  colN[right.c]++; lvlN[right.l]++;
}
is(colN[1] === 3 && colN[2] === 3 && colN[3] === 3, `near: the right bay sits 3 / 3 / 3 across the columns (${JSON.stringify(colN)})`);
is(lvlN[1] === 3 && lvlN[2] === 3 && lvlN[3] === 3, `near: the right bay sits 3 / 3 / 3 across the levels — the middle floor is never a safe guess (${JSON.stringify(lvlN)})`);

/* ---------- 3. the tower words ---------- */
const TR = (s) => s === 'ROOF' ? ['on'] : s === 'BASE' ? ['under'] : s === 'SL' ? ['beside', 'outside', 'leftside'] : s === 'SR' ? ['beside', 'outside', 'rightside'] : ['inside', ['bottom', 'middle', 'top'][s.l - 1]];
const TOWER = {
  T1: ['on', 'car', ['ROOF', [1, 2], 'SR'], 'ROOF'], T2: ['inside', 'van', [[2, 1], 'SL', 'ROOF'], [2, 1]], T3: ['under', 'truck', ['BASE', 'SR', [1, 1]], 'BASE'],
  T4: ['beside', 'bulldozer', ['SR', 'BASE', [2, 3]], 'SR'], T5: ['outside', 'jeep', ['SL', [2, 1], [1, 3]], 'SL'], T6: ['top', 'bus', [[1, 3], [2, 2], [1, 1]], [1, 3]],
  T7: ['middle', 'ambulance', [[2, 2], [1, 1], [2, 3]], [2, 2]], T8: ['bottom', 'tractor', [[1, 1], [2, 2], [1, 3]], [1, 1]], T9: ['leftside', 'car', ['SL', 'SR', 'ROOF'], 'SL']
};
const sp = (x) => typeof x === 'string' ? x : { c: x[0], l: x[1] };
const tower = C.rounds('tower');
is(tower.map(r => r.id).join() === Object.keys(TOWER).join(), 'tower: nine rounds T1–T9');
for (const r of tower) {
  const d = TOWER[r.id], cands = d[2].map(sp);
  is(r.trel === d[0] && r.mover === d[1] && JSON.stringify(r.cands.map(k)) === JSON.stringify(cands.map(k)), `${r.id}: word / mover / candidates`);
  const ok = cands.filter(s => TR(s).includes(d[0]));
  is(ok.length === 1 && k(ok[0]) === k(sp(d[3])), `${r.id}: exactly one candidate is "${d[0]}"`);
  cands.forEach(s => is(C.truth(C.newState(r, false), s) === TR(s).includes(d[0]), `${r.id}: truth at ${k(s)}`));
  for (const s of C.towerRel ? ['ROOF', 'BASE', 'SL', 'SR', { c: 1, l: 1 }, { c: 2, l: 2 }, { c: 1, l: 3 }] : []) is(JSON.stringify(C.towerRel(s).filter(w => w !== 'rightside')) === JSON.stringify(TR(s).filter(w => w !== 'rightside')), `towerRel ${k(s)}`);
  if (d[0] === 'outside') is(!cands.includes('ROOF') && !cands.includes('BASE'), `${r.id}: "outside" never offers the roof or the basement (both arguable)`);
  if (['top', 'middle', 'bottom'].includes(d[0])) is(!C.hasBase(r) && !C.hasRoofSpot(r), `${r.id}: a level round shows no basement and a closed roof`);
  is(C.hasBase(r) === cands.includes('BASE'), `${r.id}: the basement is drawn exactly when it is offered`);
  is(!(C.hasBase(r) && C.hasRoofSpot(r)), `${r.id}: never both a roof deck and a basement (the phone fold)`);
  const P = C.parkedAt(r);
  C.sideSpots(r).forEach(s => { const isC = cands.some(x => k(x) === k(s)); is(isC ? !P[k(s)] : (P[k(s)] && P[k(s)].v !== d[1]), `${r.id}: ${k(s)} ${isC ? 'free' : 'taken by another vehicle'}`); });
}

/* ---------- 4. the roof plan ---------- */
const LET = 'ABCDEFGHIJ', code = (c, r) => LET[c - 1] + r, sq = (s) => ({ c: LET.indexOf(s[0]) + 1, r: +s.slice(1) });
for (let c = 1; c <= 10; c++) for (let r = 1; r <= 10; r++) { is(C.codeOf(c, r) === code(c, r), `codeOf ${c},${r}`); is(JSON.stringify(C.squareOf(code(c, r))) === JSON.stringify({ c, r }), `squareOf ${code(c, r)}`); }
/* compass on a turned rose: (screen) north up at 0°, right at 90°, down at 180° */
const STEP = { 0: { north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0] }, 90: { north: [1, 0], east: [0, 1], south: [-1, 0], west: [0, -1] }, 180: { north: [0, 1], east: [-1, 0], south: [0, -1], west: [1, 0] } };
for (const deg of [0, 90, 180]) for (const dir of ['north', 'east', 'south', 'west']) { const s = C.compassStep(dir, deg); is(s.dc === STEP[deg][dir][0] && s.dr === STEP[deg][dir][1], `compass ${dir} on a rose at ${deg}°`); }
const PLAN6 = { P1: ['code', 'car', 'B2'], P2: ['code', 'van', 'E5'], P3: ['code', 'bulldozer', 'A6'], P4: ['read', 'bus', 'D3'], P5: ['read', 'jeep', 'F1'],
  P6: ['compass', 'car', 'C3', 'bus', 'C4', 'north', 0], P7: ['compass', 'truck', 'E2', 'van', 'D2', 'east', 0], P8: ['compass', 'bulldozer', 'B3', 'car', 'C3', 'south', 90], P9: ['compass', 'jeep', 'C5', 'truck', 'B5', 'west', 180] };
const PLAN10 = { Q1: ['code', 'car', 'C7'], Q2: ['code', 'van', 'H2'], Q3: ['code', 'bulldozer', 'J9'], Q4: ['code', 'jeep', 'E10'], Q5: ['read', 'bus', 'G4'], Q6: ['read', 'truck', 'B8'], Q7: ['read', 'ambulance', 'D1'], Q8: ['read', 'van', 'F6'], Q9: ['read', 'car', 'A3'] };
for (const [m, T, n] of [['plan6', PLAN6, 6], ['plan10', PLAN10, 10]]) {
  const rs = C.rounds(m);
  is(rs.map(r => r.id).join() === Object.keys(T).join(), `${m}: nine rounds`);
  const lets = new Set(), nums = new Set(), dirs = new Set(), roses = new Set();
  for (const r of rs) {
    const d = T[r.id];
    is(r.kind === d[0] && r.mover === d[1], `${r.id}: kind / mover`);
    let want = d[2];
    if (d[0] === 'compass') {
      is(r.lm.v === d[3] && r.lm.code === d[4] && r.dir === d[5] && r.rose === d[6], `${r.id}: the landmark, direction, rose`);
      const a = sq(d[4]), st = STEP[d[6]][d[5]]; want = code(a.c + st[0], a.r + st[1]);
      is(want === d[2], `${r.id}: the oracle's answer ${want} matches the design table (${d[2]})`);
      dirs.add(d[5]); roses.add(d[6]);
    } else is(r.code === d[2], `${r.id}: the code`);
    is(C.planAnswer(r) === want, `${r.id}: the answer ${want}`);
    const q = sq(want); is(q.c >= 1 && q.c <= n && q.r >= 1 && q.r <= n, `${r.id}: the answer is on the ${n} × ${n} plan`);
    lets.add(want[0]); nums.add(want.slice(1));
    /* grey tokens: never on the answer, the landmark, or a landmark neighbour */
    const g = C.greyTokens(r), ban = new Set([want]);
    if (d[0] === 'compass') { const a = sq(d[4]); ban.add(d[4]); [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(v => ban.add(code(a.c + v[0], a.r + v[1]))); }
    is(g.length === (n === 10 ? 9 : 5) && new Set(g).size === g.length && g.every(x => !ban.has(x) && sq(x).c <= n && sq(x).r <= n), `${r.id}: the grey "other cars" (${g.join(' ')})`);
    /* the state: park, read, check */
    const read = d[0] === 'read';
    let st = C.newState(r, false);
    is(st.read === read, `${r.id}: read on the dials = ${read}`);
    if (read) { const free = [code(1, 1), code(2, 1), code(1, 2), code(3, 3)].find(x => x !== want && !g.includes(x)); is(!C.park(st, free) && st.parked == null, `${r.id}: a read round cannot park, even on a free square (${free})`); const t = sq(want); for (let i = 0; i < t.c; i++) C.turn(st, 'l', 1); for (let i = 0; i < t.r; i++) C.turn(st, 'n', 1); is(C.dialCode(st) === want && C.check(st).result === 'ok', `${r.id}: the dials set to ${want} win`); }
    else {
      const other = g[0]; is(!C.park(st, other), `${r.id}: a square with another car refuses the park`);
      const wrong = [code(sq(want).r <= n ? sq(want).r : 1, sq(want).c)].find(x => x !== want && !g.includes(x) && sq(x).c <= n) || code(want === 'A1' ? 2 : 1, 1);
      if (!g.includes(wrong) && wrong !== want && (d[0] !== 'compass' || wrong !== d[4])) { C.park(st, wrong); is(C.check(st).result === 'wrong', `${r.id}: ${wrong} (letter and number swapped) is wrong`); }
      C.park(st, want); is(st.help === 0, `${r.id}: a new park clears the help`); is(C.check(st).result === 'ok', `${r.id}: ${want} wins`);
    }
    if (m === 'plan10') { st = C.newState(r, true); is(st.read, `${r.id}: on a narrow card every 10 × 10 round is read on the dials`); }
  }
  if (m === 'plan6') { is(lets.size === 6, `plan6: the answers use all six letters (${[...lets].sort().join('')})`); is(nums.size >= 5, `plan6: …and five of six numbers`); is(dirs.size === 4, 'plan6: all four directions'); is(roses.has(90) && roses.has(180), 'plan6: two rounds turn the rose'); }
  else { is(lets.size === 9 && nums.size === 9 && nums.has('10'), `plan10: nine letters, nine numbers, the 10th row (${[...lets].join('')} / ${[...nums].join(',')})`); }
}

/* ---------- 5. the state rules ---------- */
{
  const r = near[0]; let st = C.newState(r, false);
  is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintTapFree', 'Check with nothing parked asks, and is not a miss');
  is(!C.park(st, { c: 1, l: 3 }), 'an occupied bay refuses the park');
  is(!C.park(st, { c: 1, l: 1 }), 'the landmark\'s bay refuses the park');
  C.park(st, { c: 1, l: 2 }); C.check(st);
  is(st.help === 1 && st.misses === 1 && C.hint(st) === 'hintNext', 'miss 1: the "next to" hint');
  C.check(st); is(st.help === 2 && C.hint(st) === 'hintStrong', 'miss 2: park where it glows');
  C.park(st, { c: 3, l: 2 }); is(st.help === 0 && C.hint(st) === null, 'a new park clears the showing');
  C.park(st, { c: 2, l: 1 }); is(C.check(st).result === 'ok' && st.done, 'next to the bus wins');
  is(C.park(st, { c: 1, l: 2 }) && st.done, 'after the win the truck may be re-parked anywhere (free play)');
  const rt = near.find(x => x.id === 'N7'); st = C.newState(rt, false);
  is(!C.park(st, { c: 3, l: 2 }), 'a tap round never parks');
  is(!C.select(st, { c: 1, l: 1 }), 'a tap round only selects its trucks');
  C.select(st, { c: 2, l: 2 }); is(C.check(st).result === 'wrong', 'N7: the diagonal truck is not above the bus');
  C.select(st, { c: 3, l: 2 }); is(C.check(st).result === 'ok', 'N7: the truck above the bus');
  const tr = tower.find(x => x.id === 'T5'); st = C.newState(tr, false);
  is(!C.park(st, 'SR'), 'T5: the right street spot is taken');
  is(!C.park(st, 'ROOF') && !C.park(st, 'BASE'), 'T5: no roof deck and no basement to park on');
}

/* ---------- 6. the words ---------- */
const ctx = { window: {}, ParkingTowerCore: C, document: undefined }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'parking-tower-activity.js'), 'utf8') + '\n;this.__A = ParkingTowerActivity;', ctx);
const S = ctx.__A.strings;
const need = new Set(['title', 'instruction', 'check', 'okCode', 'setWords', 'wNear', 'wTower', 'wPlan6', 'wPlan10', 'roseN', 'roseE', 'roseS', 'roseW', 'hintTapFree', 'hintTapTruck', 'hintDials', 'hintStrong', 'hintStrongTap', 'hintStrongRead', 'ariaFree', 'ariaTaken', 'ariaLevel', 'ariaRoof', 'ariaBase', 'ariaStreetL', 'ariaStreetR', 'ariaSquare', 'ariaLetter', 'ariaNumber', 'ariaUp', 'ariaDown', 'ariaBooth']);
for (const m of C.MODES) for (const r of C.rounds(m)) {
  for (const read of [false, true]) { if (read && m !== 'plan10' && r.kind !== 'read') continue; need.add(C.prompt(r, read)); }
  need.add(C.success(r));
  if (m === 'near') { need.add('hint' + C.cap(r.rel)); need.add('u_' + r.id); }
  if (m === 'tower') { need.add('hintT' + C.cap(r.trel)); need.add('u_' + r.id); }
  if (r.kind === 'compass') { need.add('hintNorth'); need.add('u_' + r.id); } else if (m.startsWith('plan')) { need.add('hintCode'); need.add('uv_' + r.mover); }
}
C.VEH.forEach(v => need.add('uv_' + v));
for (const key of need) for (const l of L) is(S[key] && typeof S[key][l] === 'string' && S[key][l].trim(), `string ${key}.${l}`);
/* every underlined word is in its prompt, letter-bounded */
const uw = (u) => String(u).split(/[|,]/).filter(Boolean);
const has = (p, w) => new RegExp('(?<!\\p{L})' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu').test(p);
for (const m of C.MODES) for (const r of C.rounds(m)) for (const l of L) {
  const read = r.kind === 'read';
  const p = S[C.prompt(r, read)][l], u = (m === 'near' || m === 'tower' || r.kind === 'compass') ? S['u_' + r.id][l] : S['uv_' + r.mover][l];
  uw(u).forEach(w => is(has(p, w), `${r.id}.${l}: the underline "${w}" is in "${p}"`));
  if (m.startsWith('plan') && r.kind !== 'compass') is(/\{code\}/.test(S[C.prompt(r, false)][l]) || read, `${r.id}.${l}: the park prompt carries the code`);
}
/* sentences: no doubled spaces, no unfilled slot, fr narrow no-break space before ! ? : ; */
for (const key in S) for (const l of L) {
  const s = S[key][l] || '';
  is(!/  /.test(s) && !/undefined|null|\{(?!code\}|l\}|c\})/.test(s), `${key}.${l}: clean`);
  if (l === 'fr') is(!/ [!?:;]/.test(s), `${key}.fr: U+202F before ! ? : ;`);
}
/* the compass letters per locale (design §9) */
const ROSE = { en: 'NESW', de: 'NOSW', fr: 'NESO', es: 'NESO', it: 'NESO', pt: 'NLSO', nl: 'NOZW', sv: 'NÖSV', da: 'NØSV', no: 'NØSV', fi: 'PIEL' };
for (const l of L) is(['N', 'E', 'S', 'W'].map(d => S['rose' + d][l]).join('') === ROSE[l], `rose letters ${l}`);
/* no word "free" as a price, anywhere */
for (const key in S) for (const l of L) is(!/\b(gratis|kostenlos|gratuit|gratuito|ilmai)/i.test(S[key][l] || ''), `${key}.${l}: no price word`);

/* ---------- 7. the pictures ---------- */
function exact(rel) { const parts = rel.split('/'); let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
for (const v of C.VEH.concat(['beaver'])) is(exact(C.dirOf(v) + '/' + v + '@2x.webp'), `picture ${C.dirOf(v)}/${v} exists (case-exact)`);
is(!C.VEH.includes('taxi') && !C.VEH.includes('police_car') && !C.VEH.includes('school_bus') && !C.VEH.includes('mail_truck'), 'no vehicle with printed English text');
is(JSON.stringify(Object.keys(C.FACES_RIGHT)) === '["truck"]', 'the truck (faces right) is the one picture mirrored to face the lift');
is(C.VEH.every(v => /^#[0-9A-F]{6}$/i.test(C.TOKEN[v])) && new Set(C.VEH.map(v => C.TOKEN[v])).size === C.VEH.length, 'every vehicle has its own map-token colour');

/* ---------- 8. the order: order-only, never the same twice running ---------- */
{
  let seed = 7; const rnd = () => { seed = (seed * 1103515245 + 12345) >>> 0; return (seed >>> 8) / 16777216; };
  for (const m of C.MODES) { const pool = C.rounds(m); let prev = null, bad = 0; for (let i = 0; i < 2500; i++) { const o = C.order(pool, rnd, prev); if (o.slice().sort((a, b) => a - b).join() !== pool.map((_, j) => j).join()) bad++; if (prev && o.join() === prev.join()) bad++; prev = o; } is(bad === 0, `${m}: 2,500 passes, each a permutation, never the last one again`); }
  /* a repeat is 1 in 362,880 at random — force it: replay the seed that made the last pass */
  const mk = (sd) => () => { sd = (sd * 1103515245 + 12345) >>> 0; return (sd >>> 8) / 16777216; };
  for (const m of C.MODES) { const pool = C.rounds(m); for (let sd = 1; sd <= 50; sd++) { const first = C.order(pool, mk(sd), null), again = C.order(pool, mk(sd), first); is(again.join() !== first.join(), `${m}: seed ${sd} replayed — the next pass is not the last one again`); } }
}

/* ---------- 9. the layout ---------- */
/* from 288 px: the stage of a 320 px phone (measured), to a wide desktop card */
for (let W = 288; W <= 1100; W += 12) {
  for (const m of ['near', 'tower']) {
    const Lo = C.layout(m, W), tot = Lo.lift + 2 * Lo.street + Lo.cols * Lo.bayW + (Lo.cols + 1) * Lo.wall;
    is(tot <= W, `${m} @${W}: fits (${tot})`);
    is(Lo.veh >= (W >= 700 ? 96 : 64), `${m} @${W}: vehicles ${Lo.veh} px`);
    /* the pictures are square canvases with the vehicle's ink ~95 % wide (measured); a vehicle may overhang its bay's side lines by ≤ 8 px each (design §4) */
    is(Lo.bayW + 16 >= Math.ceil(Lo.veh * 0.95) && Lo.bayH >= Lo.veh + 4, `${m} @${W}: a bay holds a vehicle (${Lo.bayW}×${Lo.bayH})`);
    is(Math.min(Lo.bayW, Lo.bayH) >= 44, `${m} @${W}: a bay is a ≥ 44 px tap`);
  }
  for (const m of ['plan6', 'plan10']) {
    const Lo = C.layout(m, W), gw = Lo.strip + Lo.n * Lo.sq + (Lo.mode === 'wide' ? Lo.gap + Lo.side : 0);
    is(gw <= W, `${m} @${W}: the plan fits (${gw})`);
    if (Lo.tap) is(Lo.sq >= 44, `${m} @${W}: tap squares ≥ 44 px (${Lo.sq})`);
    if (m === 'plan6') is(Lo.tap, `plan6 @${W}: always tap-to-park`);
    if (m === 'plan10' && W < 600) is(!Lo.tap, `plan10 @${W}: a narrow card reads the codes instead (squares ${Lo.sq} px)`);
    is(Lo.key >= (W >= 700 ? 96 : 64), `${m} @${W}: the key pictures ${Lo.key} px`);
  }
}

console.log(`verify-parking-tower-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
