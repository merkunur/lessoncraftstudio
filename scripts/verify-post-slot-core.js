#!/usr/bin/env node
/* =====================================================================
   verify-post-slot-core.js — the model gate for ACTIVITY #39, the
   Letterbox (K.G.A.3; G2 count the faces). Its OWN oracle: which shapes
   are flat is re-typed here; how many flat faces each solid has is the
   school table typed here (cube 6, box 6, square pyramid 5, triangular
   pyramid 4, triangular prism 5, hexagonal prism 8, cylinder 2) and is
   compared with the core's vertex/face model, Euler's V − E + F = 2, and
   the net's own face count. Nets are re-checked as real nets: every
   non-root face shares its hinge edge with its parent and no two faces
   overlap. The rounds are re-typed from designs/039 §6.
   Env PS_CORE_DIR = a directory holding a (mutated) post-slot-core.js.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const DIR = process.env.PS_CORE_DIR || path.join(ROOT, 'mini tools');
const C = require(path.join(DIR, 'post-slot-core.js'));
const L = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };

/* ---------- the oracle ---------- */
const FLAT = ['circle', 'square', 'triangle', 'rectangle', 'hexagon', 'oval', 'star'];
const SOLIDS = ['sphere', 'cube', 'box', 'cylinder', 'cone', 'sqpyr', 'tripyr', 'triprism', 'hexprism'];
const FACES = { cube: 6, box: 6, sqpyr: 5, tripyr: 4, triprism: 5, hexprism: 8, cylinder: 2 };
const TWIN = { circle: ['sphere', 'cylinder', 'cone'], square: ['cube', 'box'], triangle: ['sqpyr', 'tripyr', 'cone', 'triprism'], rectangle: ['box'], oval: ['sphere'], hexagon: ['hexprism'] };

/* 1. flat or solid */
FLAT.forEach(k => { is(C.isFlat(k) && !C.isSolid(k), `${k} is flat`); is(C.thicknessEdgeOn(k) === 0, `${k}: edge-on it has no thickness (it fits the slot)`); });
SOLIDS.forEach(k => { is(!C.isFlat(k) && C.isSolid(k), `${k} is solid`); is(C.thicknessEdgeOn(k) > 0.3, `${k}: edge-on it keeps a thickness (${C.thicknessEdgeOn(k).toFixed(2)}) — it jams`); });
is(!C.isFlat('pentagon') && !C.isSolid('pentagon'), 'an unknown kind is neither');

/* 2. the solids: faces, Euler, hidden faces */
Object.keys(FACES).forEach(k => {
  is(C.facesOf(k) === FACES[k], `${k}: ${FACES[k]} flat faces (core says ${C.facesOf(k)})`);
  if (k !== 'cylinder') {
    const P = C.poly(k), E = C.edgesOf(P);
    is(P.V.length - E.length + P.F.length === 2, `${k}: Euler V − E + F = 2`);
    is(E.every(e => e.faces.length === 2), `${k}: every edge joins exactly two faces (closed solid)`);
    /* outward normals: every face's plane has all the other vertices on one side */
    is(P.F.every(f => { const a = P.V[f[0]], b = P.V[f[1]], c = P.V[f[2]], u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]], n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]; return P.V.every(p => (p[0] - a[0]) * n[0] + (p[1] - a[1]) * n[1] + (p[2] - a[2]) * n[2] <= 1e-9); }), `${k}: faces wound outward, the solid convex`);
  }
});
is(C.facesOf('sphere') === 0 && C.facesOf('cone') === 0, 'no flat-face count for a sphere or a cone (never asked)');

/* 3. the nets are real nets */
const area = p => { let s = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; s += a[0] * b[1] - b[0] * a[1]; } return Math.abs(s) / 2; };
const inside = (pt, p) => { let c = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { if (((p[i][1] > pt[1]) !== (p[j][1] > pt[1])) && (pt[0] < (p[j][0] - p[i][0]) * (pt[1] - p[i][1]) / (p[j][1] - p[i][1]) + p[i][0])) c = !c; } return c; };
const onBoundary = (pt, p) => p.some((a, i) => { const b = p[(i + 1) % p.length], L2 = (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2, t = Math.max(0, Math.min(1, ((pt[0] - a[0]) * (b[0] - a[0]) + (pt[1] - a[1]) * (b[1] - a[1])) / (L2 || 1))), q = [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]; return Math.hypot(q[0] - pt[0], q[1] - pt[1]) < 0.02; });
Object.keys(FACES).forEach(k => {
  const n = C.netOf(k), F = n.faces;
  is(F.filter(f => !f.curved).length === FACES[k], `${k} net: ${FACES[k]} flat faces`);
  is(C.flatFacesInNet(n) === FACES[k], `${k} net: flatFacesInNet agrees`);
  is(F.filter(f => f.curved).length === (k === 'cylinder' ? 1 : 0), `${k} net: ${k === 'cylinder' ? 'one curved sheet' : 'no curved sheet'}`);
  is(F.filter(f => f.parent === -1).length === 1, `${k} net: one root face`);
  F.forEach((f, i) => {
    is(area(f.pts) > 0.2, `${k} net face ${i}: has area`);
    if (f.parent >= 0) {
      is(f.parent !== i && F[f.parent], `${k} net face ${i}: its parent exists`);
      is(f.hinge && f.hinge.every(h => onBoundary(h, f.pts) && onBoundary(h, F[f.parent].pts)), `${k} net face ${i}: its hinge lies on its own edge and its parent's`);
    }
  });
  /* the tree reaches every face from the root */
  const seen = new Set([F.findIndex(f => f.parent === -1)]); let grew = true; while (grew) { grew = false; F.forEach((f, i) => { if (!seen.has(i) && seen.has(f.parent)) { seen.add(i); grew = true; } }); }
  is(seen.size === F.length, `${k} net: every face hangs from the root`);
  /* no two faces overlap: sample each face's interior */
  let overlap = 0;
  F.forEach((f, i) => { const xs = f.pts.map(p => p[0]), ys = f.pts.map(p => p[1]); for (let a = 1; a < 8; a++) for (let b = 1; b < 8; b++) { const p = [Math.min(...xs) + (Math.max(...xs) - Math.min(...xs)) * a / 8, Math.min(...ys) + (Math.max(...ys) - Math.min(...ys)) * b / 8]; if (!inside(p, f.pts) || onBoundary(p, f.pts)) continue; F.forEach((g, j) => { if (j !== i && inside(p, g.pts) && !onBoundary(p, g.pts)) overlap++; }); } });
  is(overlap === 0, `${k} net: no two faces overlap (${overlap})`);
  const xs = F.flatMap(f => f.pts.map(p => p[0])), ys = F.flatMap(f => f.pts.map(p => p[1]));
  is(Math.abs(Math.min(...xs)) < 1e-9 && Math.abs(Math.min(...ys)) < 1e-9 && Math.abs(Math.max(...xs) - n.w) < 1e-9 && Math.abs(Math.max(...ys) - n.h) < 1e-9, `${k} net: w/h are its own box`);
});

/* 4. the rounds, re-typed from §6 */
const SORT = {
  B1: 'circle sphere square cube triangle cylinder', B2: 'rectangle box oval cone star sphere', B3: 'square cube hexagon sqpyr circle',
  B4: 'triangle cone sqpyr rectangle cylinder box', B5: 'oval sphere cube star hexagon cylinder', B6: 'circle cylinder cone square triangle box',
  B7: 'hexagon rectangle sphere cube triangle sqpyr', B8: 'star cone circle box square sphere'
};
const sort = C.rounds('sort');
is(sort.length === 8, 'eight mail bags');
sort.forEach(r => {
  is(r.items.map(i => i.kind).join(' ') === SORT[r.id], `${r.id}: the shapes of §6`);
  const flats = r.items.filter(i => FLAT.includes(i.kind));
  is(r.items.every(i => i.flat === FLAT.includes(i.kind)), `${r.id}: every item's flat flag is the oracle's`);
  is(flats.length >= 2 && flats.length <= 4 && r.items.length - flats.length >= 2, `${r.id}: 2–4 flat shapes and at least two solids`);
  is(flats.some(f => (TWIN[f.kind] || []).some(s => r.items.some(i => i.kind === s))), `${r.id}: at least one flat/solid twin pair`);
  is(r.items.every(i => i.s >= 0.4 && i.s <= 1), `${r.id}: sizes 40–100 %`);
});
is(sort.some(r => r.items.some(i => i.a)) && sort.some(r => r.items.some(i => i.s < 0.6)), 'shapes come turned and small');
/* the bag is never a strict flat/solid alternation — seeded and with any rnd */
let alt = 0, perm = 0;
sort.forEach(r => {
  const runs = [C.bagOrder(r)]; for (let s = 1; s <= 400; s++) { let x = s * 7919; runs.push(C.bagOrder(r, () => { x = (x * 1103515245 + 12345) % 2147483648; return x / 2147483648; })); }
  runs.forEach(o => { const fl = o.map(id => C.byId(r, id).flat); let a = fl.length >= 4; for (let i = 1; i < fl.length; i++) if (fl[i] === fl[i - 1]) a = false; if (a) alt++; if (o.slice().sort().join() !== r.items.map(i => i.id).sort().join()) perm++; });
});
is(alt === 0, `no bag order is a strict flat/solid alternation (${alt})`);
is(perm === 0, 'every bag order is a permutation of the bag');
is(C.alternates([true, false, true, false]) && !C.alternates([true, true, false, false]), 'alternates() detects FSFS');

const FA = { F1: ['cube', 6], F2: ['sqpyr', 5], F3: ['cylinder', 2], F4: ['tripyr', 4], F5: ['box', 6], F6: ['hexprism', 8], F7: ['triprism', 5], F8: ['cube', 6] };
const faces = C.rounds('faces');
is(faces.length === 8, 'eight drawn solids');
faces.forEach(r => {
  is(FA[r.id] && r.kind === FA[r.id][0] && r.answer === FA[r.id][1], `${r.id}: ${FA[r.id] && FA[r.id][0]} with ${FA[r.id] && FA[r.id][1]} flat faces`);
  is(r.answer >= 1 && r.answer === FACES[r.kind], `${r.id}: the answer is the oracle's, never 0`);
  is(C.hiddenAt(r.kind, r.pose) >= 1, `${r.id}: at least one face is hidden at the starting pose`);
  is(r.kind !== 'sphere' && r.kind !== 'cone', `${r.id}: no sphere or cone in a counting round`);
});
const tally = {}; faces.forEach(r => { tally[r.answer] = (tally[r.answer] || 0) + 1; });
is(Object.values(tally).every(n => n <= 3) && Object.keys(tally).length >= 5, `no face count answers more than three drawn rounds (${JSON.stringify(tally)})`);
is(faces.some(r => r.id === 'F8') && C.rounds('faces').find(r => r.id === 'F8').s < 0.7, 'the last cube is small and turned');

const TH = { T1: ['dice', 'cube', 6], T2: ['can', 'cylinder', 2], T3: ['book', 'box', 6], T4: ['drum', 'cylinder', 2], T5: ['eraser', 'box', 6], T6: ['present', 'box', 6], T7: ['can', 'cylinder', 2] };
const things = C.rounds('things');
is(things.length === 7, 'seven everyday things');
things.forEach(r => { const t = TH[r.id]; is(t && r.object === t[0] && r.kind === t[1] && r.answer === t[2], `${r.id}: the ${t && t[0]} is a ${t && t[1]} with ${t && t[2]} flat faces`); });
is(things.find(r => r.id === 'T7').lying && !things.find(r => r.id === 'T2').lying, 'the can comes standing and lying');
is(!things.some(r => ['ball', 'orange', 'butter', 'package'].includes(r.object)), 'no refused picture (ball, orange, butter, package)');
/* every picture exists at its exact path, and no theme is a BW one */
const exact = (rel) => { const parts = rel.split('/'); let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
Object.keys(C.OBJ).forEach(o => { const d = C.OBJ[o].dir; is(exact(d + '/' + o + '@2x.webp'), `picture ${d}/${o} exists (case-exact)`); is(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(d), `${d}: a colour theme`); });
/* box outlines from their silhouettes: the front corner inside the picture, the hidden corner inside the silhouette */
Object.keys(C.OBJ).forEach(o => { const ob = C.OBJ[o]; if (!ob.hex) { is(ob.cyl && ob.cyl.bot > ob.cyl.top && ob.cyl.rx > 0.1, `${o}: a cylinder outline`); return; } const ol = C.boxOutline(ob.hex); is(inside(ol.front, ob.hex) && inside(ol.back, ob.hex), `${o}: the front and hidden corners fall inside its silhouette`); is(ol.hid.length === 3 && ol.vis.length === 9, `${o}: nine visible edges, three hidden`); });

/* 5. order: a permutation, never the previous order, the same answer never three rounds running */
['sort', 'faces', 'things'].forEach(t => {
  const pool = C.rounds(t); let bad = 0, same = 0, three = 0, prev = null, x = 42;
  for (let run = 0; run < 3000; run++) {
    const o = C.order(pool, () => { x = (x * 1103515245 + 12345) % 2147483648; return x / 2147483648; }, prev);
    if (o.slice().sort((a, b) => a - b).join() !== pool.map((_, i) => i).join()) bad++;
    if (prev && o.join() === prev.join()) same++;
    for (let q = 2; q < o.length; q++) { const a = pool[o[q]].answer; if (a != null && a === pool[o[q - 1]].answer && a === pool[o[q - 2]].answer) three++; }
    prev = o;
  }
  is(bad === 0 && same === 0, `${t}: every order is a fresh permutation`);
  is(three === 0, `${t}: never the same answer three rounds running (${three})`);
});
is(C.task('nope') === 'sort' && C.task('things') === 'things', 'task() defaults to sort');

/* 6. sort state */
(function () {
  const r = sort[0], st = C.newState(r, null), ids = st.bag.slice(), fl = id => C.byId(r, id).flat;
  is(!C.edgeOnAllowed(st), 'nothing turns edge-on before Check');
  is(C.check(st).result === 'empty' && C.hint(st) === 'hintBag' && st.misses === 0, 'Check with shapes in the bag asks — not a miss');
  is(!C.move(st, ids[0], 'shelf') && !C.move(st, 'zz', 'letter'), 'no move to nowhere, no unknown shape');
  ids.forEach((id, i) => C.move(st, id, i < 2 ? (fl(id) ? 'parcel' : 'letter') : (fl(id) ? 'letter' : 'parcel')));
  const wrong = ids.slice(0, 2);
  is(st.bag.length === 0, 'everything on a tray');
  const res = C.check(st);
  is(res.result === 'wrong' && wrong.every(id => st.bag.includes(id)) && st.bag.length === 2 && st.misses === 1 && st.help === 1, 'Check: the two wrong shapes bounce back to the bag (miss 1)');
  is(C.hint(st) === 'hintLine' && st.show, 'miss 1: "a flat shape is a line on its edge"');
  is(ids.slice(2).every(id => fl(id) ? st.posted.includes(id) : st.shelved.includes(id)), 'the right ones are posted or shelved');
  is(!C.move(st, st.posted[0] || st.shelved[0], 'bag'), 'a posted or shelved shape stays put');
  C.move(st, wrong[0], fl(wrong[0]) ? 'parcel' : 'letter');
  is(!st.show && st.help === 1 && !st.bounced.includes(wrong[0]), 'a new move clears the showing — the help level stays');
  C.move(st, wrong[1], fl(wrong[1]) ? 'parcel' : 'letter'); C.check(st);
  is(st.misses === 2 && st.help === 2 && C.hint(st) === 'hintArrows', 'miss 2: "follow the arrows"');
  st.bag.slice().forEach(id => C.move(st, id, fl(id) ? 'letter' : 'parcel'));
  is(C.check(st).result === 'ok' && st.done && C.edgeOnAllowed(st), 'all right: done, and free play may turn shapes edge-on');
  is(!C.move(st, st.posted[0], 'bag'), 'after the win nothing moves');
  const s2 = C.newState(sort[1], null);
  for (let i = 0; i < 7; i++) C.move(s2, s2.bag[0], 'letter');
  is(s2.trays.letter.length === 6 && s2.bag.length === 0, 'a tray holds every shape of a bag');
  const s3 = C.newState({ id: 'X', task: 'sort', items: Array.from({ length: 8 }, (_, i) => ({ id: 'p' + i, kind: 'circle', flat: true })) }, null);
  for (let i = 0; i < 8; i++) C.move(s3, s3.bag[0], 'letter');
  is(s3.trays.letter.length === C.TRAY_MAX && C.TRAY_MAX === 6, 'a tray holds six');
})();

/* 7. faces state */
(function () {
  const r = faces.find(x => x.id === 'F1'), st = C.newState(r, null);
  is(C.check(st).result === 'empty' && C.hint(st) === 'hintTab' && st.misses === 0, 'Check before opening asks — not a miss');
  is(C.stamp(st, 0) === null, 'nothing to stamp before the solid is opened');
  const y0 = st.pose.yaw; is(C.turn(st) && st.pose.yaw === (y0 + 90) % 360, 'turn: a quarter turn');
  is(C.unfold(st) && st.unfolded && !C.turn(st), 'pull the tab: it opens flat; an open net does not turn');
  is(C.check(st).result === 'empty' && C.hint(st) === 'hintChip', 'no number: asks');
  is(!C.setChip(st, 0) && !C.setChip(st, 10) && C.setChip(st, 5), 'chips 1–9 only');
  C.stamp(st, 0); C.stamp(st, 1);
  is(C.check(st).result === 'wrong' && st.misses === 1 && st.help === 1 && C.hint(st) === 'hintFaces', 'wrong number: miss 1, "stamp every face"');
  is(C.stamp(st, 2) === 'on' && !st.show && st.help === 1, 'a new stamp clears the showing, not the help');
  C.check(st);
  is(st.help === 2 && C.hint(st) === 'hintNumbers', 'miss 2: "count along with the numbers"');
  C.setChip(st, 6);
  is(C.check(st).result === 'unpaid' && st.misses === 2 && !st.done && C.hint(st) === 'hintFaces', 'the right number with faces unstamped: the net bumps back — not a miss');
  is(!C.netFitsSlot(st), 'the net does not fit the slot with a face unstamped');
  for (let i = 3; i < 6; i++) C.stamp(st, i);
  is(C.netFitsSlot(st) && C.check(st).result === 'ok' && st.done, 'every face stamped, the right number: posted');
  is(C.stamp(st, 0) === null && !C.setChip(st, 3), 'after the win the stamps and the chips rest');
  is(C.fold(st) && !st.unfolded && C.unfold(st), 'free play: fold it up and open it again');
  /* every net, every round: one face short is never paid; all faces is */
  faces.concat(things).forEach(rr => { const s = C.newState(rr, null); C.unfold(s); const flat = s.net.faces.map((f, i) => f.curved ? -1 : i).filter(i => i >= 0); flat.slice(0, -1).forEach(i => C.stamp(s, i)); is(!C.netFitsSlot(s), `${rr.id}: one face short of paid does not fit the slot`); C.stamp(s, flat[flat.length - 1]); is(C.netFitsSlot(s), `${rr.id}: every flat face stamped fits the slot`); });
  const tn = C.newState(r, null); C.setChip(tn, 4); C.turn(tn); C.unfold(tn); C.stamp(tn, 0);
  is(tn.chip === 4 && tn.stamps.length === 1, 'turning the solid keeps the chosen number');
  const s2 = C.newState(r, null); C.unfold(s2); is(C.stamp(s2, 0) === 'on' && C.stamp(s2, 0) === 'off' && s2.stamps.length === 0, 'a second tap takes the stamp off');
  const cy = C.newState(faces.find(x => x.id === 'F3'), null); C.unfold(cy);
  const sheet = cy.net.faces.findIndex(f => f.curved);
  is(C.stamp(cy, sheet) === 'curl' && cy.stamps.length === 0, 'the curved sheet curls and takes no stamp');
  cy.net.faces.forEach((f, i) => { if (!f.curved) C.stamp(cy, i); }); C.setChip(cy, 2);
  is(C.netFitsSlot(cy) && C.check(cy).result === 'ok', 'a cylinder: two stamped circles, 2 — posted');
  const th = C.newState(things[0], null);
  is(th.net && th.net.faces.length === 6 && th.pose === null && !C.turn(th), 'a thing has its solid\'s net and no turntable turn');
})();

/* 8. the strings */
const ctx = { window: {}, PostSlotCore: C, document: undefined }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'post-slot-activity.js'), 'utf8') + '\n;this.__A = PostSlotActivity;', ctx);
const A = ctx.__A, S = A.strings, SRC = fs.readFileSync(path.join(ROOT, 'mini tools', 'post-slot-activity.js'), 'utf8');
/* reachable = named in the activity's code after the strings, or returned by the core's hint() */
const CORE_SRC = fs.readFileSync(path.join(DIR, 'post-slot-core.js'), 'utf8').replace(/\r\n/g, '\n');
const hintFn = CORE_SRC.slice(CORE_SRC.indexOf('function hint(st)'), CORE_SRC.indexOf('\n  }\n', CORE_SRC.indexOf('function hint(st)')));
is(hintFn.length > 100, 'the core\'s hint() was found');
const code = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + hintFn;
Object.keys(S).forEach(k => {
  L.forEach(l => is(typeof S[k][l] === 'string' && S[k][l].trim().length > 0, `${k}.${l} present`));
  const ph = (S[k].en.match(/\{\w+\}/g) || []).sort().join();
  L.forEach(l => is(((S[k][l] || '').match(/\{\w+\}/g) || []).sort().join() === ph, `${k}.${l}: the placeholders of en`));
  const used = k === 'title' || k === 'instruction' || new RegExp("'" + k + "'").test(code) || (k.startsWith('ok_') && /'ok_' \+ r\.object/.test(code) && Object.keys(C.OBJ).includes(k.slice(3)));
  is(used, `${k}: reached from the code`);
});
Object.keys(C.OBJ).forEach(o => is(!!S['ok_' + o], `ok_${o}: a win line for every object`));
for (const k in S) for (const l of L) {
  const s = S[k][l] || '';
  is(!/  /.test(s) && !/undefined/.test(s), `${k}.${l}: clean`);
  if (l === 'fr') is(!/ [!?:;]/.test(s), `${k}.fr: U+202F before ! ? : ;`);
  const FREE = { en: 'free', de: 'kostenlos|gratis|frei', fr: 'gratuit\\w*|libre', es: 'gratis|libre', pt: 'gr[aá]tis|livre', it: 'gratis|libero|gratuit\\w*', nl: 'gratis|vrij', sv: 'gratis|ledig|fri', da: 'gratis|ledig|fri', no: 'gratis|ledig|fri', fi: 'ilmai\\w*|vapaa' }[l];
  is(!new RegExp('(?<!\\p{L})(' + FREE + ')(?!\\p{L})', 'iu').test(s), `${k}.${l}: no word for "free"`);
  if (l === 'es') is(!/(?<!\p{L})(vosotros|cogé|coge|ordenador|mola)(?!\p{L})/iu.test(s), `${k}.es: Mexican, not peninsular`);
}
const banPoison = (l, s) => new RegExp('(?<!\\p{L})(' + { pt: 'gr[aá]tis|livre', fr: 'gratuit\\w*|libre' }[l] + ')(?!\\p{L})', 'iu').test(s);
is(banPoison('pt', 'é livre') && !banPoison('fr', 'le livre a 6 faces'), 'the ban is poisoned both ways (pt "livre" fires, fr "livre" passes)');
/* the sound-off law: no shape is named on the board — an item's label never carries its kind */
is(!/ariaShape'[^;]*kind/.test(code), 'a shape is announced by its number, never its name');
is(A.settings.length === 1 && A.settings[0].options.map(o => o.value).join() === 'sort,faces,things', 'one setting: the task (sort / faces / things)');

/* 9. layout: taps and nets fit */
[320, 360, 412, 704, 768, 1024, 1366].forEach(W => {
  ['sort', 'faces', 'things'].forEach(t => {
    const stage = W >= 704 ? Math.min(W, 820) - 56 : W - 32, Ly = C.layout(stage, t);
    is(Ly.chip >= 44 && Ly.trayCell >= 44 && Ly.cell >= 44, `${W} ${t}: chips, bag and tray cells ≥ 44 px`);
    if (t === 'sort') is(Ly.cell * 6 + 5 * 6 <= Ly.counterW - 20 || Ly.mode !== 'wide', `${W}: a bag of six fits one row on a wide counter`);
    if (t !== 'sort') Object.keys(FACES).forEach(k => {
      const n = C.netOf(k), tw = (Ly.mode === 'wide' ? Ly.counterW : stage) - 12 - 12 - 12, sc = C.netScale(n, tw, Ly.netH - 12);
      const minDim = Math.min(...n.faces.map(f => { const xs = f.pts.map(p => p[0]), ys = f.pts.map(p => p[1]); return f.round ? Math.max(...xs) - Math.min(...xs) : Math.min(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)); })) * sc;
      is(minDim >= 44, `${W} ${k} net: every face ≥ 44 px across (${minDim.toFixed(1)})`);
    });
  });
});

console.log(`verify-post-slot-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
