#!/usr/bin/env node
/* =====================================================================
   verify-trundle-wheel-core.js — the logic gate of ACTIVITY #169, The
   Trundle Wheel ("Sort Shapes by Sides", 2.G.A.1). Its ground truth is
   the design file's own §6 catalogue and round tables (docs/activities-
   rebuild/designs/169-sort-bins.md), parsed here, with this gate's own
   geometry (shoelace orientation, angles, lengths) — never the tool's.
   It checks:
     · the catalogue = the design's vertices; every shape convex; sides,
       square corners (|angle − 90°| ≤ 0.5°) and equal sides recomputed
       here equal the design's columns and the core's; no corner within
       3° of 90° unless it is 90°;
     · the roll: from EVERY start side a full roll prints n dashes and n
       marks, returns to the start with a total turn of 360°, dash lengths
       = side lengths, square marks exactly at square corners; tickets of
       one shape at different turns are cyclic shifts; the dock picks the
       lowest side; poseAt keeps the pivot on the ground (no sliding);
     · every round = the design's tray (ids and turns), crates, drawer;
       crates never empty (1–4 shapes), the measured counts; Q1–Q4 fill
       all four cells; Q5–Q8 drawers have exactly one fitting candidate;
       rings: every region occupied every round and a one-rule bot misses
       in every round; every cabinet round holds a square;
     · Check: a shape left in the tray → a reminder; a wrong place → miss
       1 (wrong shapes come home with a ticket, right ones stay); Check
       again unchanged → a reminder; miss 2 = help; right → done;
     · the plan (never the same order twice; a stuck random source); the
       tray order (no three neighbours share a place); crate positions;
     · the activity layer in node: every task and success line in 11
       locales, no "{", "0", "undefined" or "free"; no dead strings; the
       success list (1 takes the singular; fi partitive); the manifest.
   Env overrides (the mutation script): TW_CORE, TW_ACT, TW_MAN.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..');
const C = require(process.env.TW_CORE || path.join(REPO, 'mini tools', 'trundle-wheel-core.js'));
const ACT = process.env.TW_ACT || path.join(REPO, 'mini tools', 'trundle-wheel-activity.js');
const MAN = process.env.TW_MAN || path.join(REPO, 'mini tools', 'sort-bins-activities.json');
let pass = 0, fail = 0;
const is = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL: ' + m); } };
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- the design, parsed ---------- */
const md = fs.readFileSync(path.join(REPO, 'docs', 'activities-rebuild', 'designs', '169-sort-bins.md'), 'utf8');
const sec = (a, b) => md.slice(md.indexOf(a), md.indexOf(b, md.indexOf(a)));
const rows = (txt, re) => txt.split('\n').filter((l) => re.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
const REG = (s) => s.match(/\[([\d,]+)\]/)[1].split(',').map(Number).map((a) => [50 + 40 * Math.cos(a * Math.PI / 180), 50 - 40 * Math.sin(a * Math.PI / 180)]);
const CAT = {};
rows(sec('**Shape catalogue', '**Board A'), /^\| (tri|quad|pent|hex)_/).forEach((c) => {
  const id = c[0].split(' ')[0], v = /_reg/.test(c[2]) ? REG(c[2]) : (c[2].match(/\([\d.]+,[\d.]+\)/g) || []).map((p) => p.slice(1, -1).split(',').map(Number));
  CAT[id] = { n: +c[1], v, sq: +c[3], eq: c[4] };
});
is(Object.keys(CAT).length === 22, 'the design catalogue parses: 22 shapes (' + Object.keys(CAT).length + ')');
const tray = (s) => s.split('·').map((x) => x.trim()).filter(Boolean).map((x) => { const m = x.match(/^(\w+)(?:@(\d+))?/); return { id: m[1], rot: m[2] ? +m[2] : 0 }; });
const DA = rows(sec('**Board A', '**Board B'), /^\| A\d \|/).map((c) => ({ crates: c[1].split('·').map((x) => +x.trim()), tray: tray(c[2]) }));
const DB = rows(sec('**Board B', '**Board C'), /^\| Q\d \|/).map((c) => { const t = c[1].split('→')[0]; const o = { tray: tray(t.replace(/\(size [\d.]+\)/, '')) }; if (/✓/.test(c[2])) { o.drawer = tray(c[2].replace(/✓/g, '')); o.fit = tray(c[2].split('·').find((x) => /✓/.test(x)).replace('✓', ''))[0]; } return o; });
const DC = rows(sec('**Board C', '- **Answer position**'), /^\| C\d \|/).map((c) => ({ tray: c[1].split('·').map((x) => { const m = x.trim().match(/^(\w+)(?:@(\d+))? (A|B|AB|out)$/); return { id: m[1], rot: m[2] ? +m[2] : 0, region: m[3] }; }) }));
is(DA.length === 9 && DB.length === 8 && DC.length === 8, 'the round tables parse: 9 crate, 8 cabinet, 8 ring rounds');

/* ---------- this gate's own geometry ---------- */
const area2 = (v) => v.reduce((s, p, i) => { const q = v[(i + 1) % v.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0);
const L = (v) => v.map((p, i) => { const q = v[(i + 1) % v.length]; return Math.hypot(q[0] - p[0], q[1] - p[1]); });
const ANG = (v) => { const n = v.length; return v.map((p, i) => { const a = v[(i + n - 1) % n], b = v[(i + 1) % n]; const u = [a[0] - p[0], a[1] - p[1]], w = [b[0] - p[0], b[1] - p[1]]; return Math.acos((u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w))) * 180 / Math.PI; }); };
const isConvex = (v) => { const s = Math.sign(area2(v)); return v.every((p, i) => { const a = v[i], b = v[(i + 1) % v.length], c = v[(i + 2) % v.length]; return Math.sign((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0])) === s; }); };
const own = (v) => { const l = L(v), a = ANG(v), m = l.reduce((x, y) => x + y) / l.length; return { n: v.length, sq: a.filter((x) => Math.abs(x - 90) <= 0.5).length, allSq: a.every((x) => Math.abs(x - 90) <= 0.5), eq: l.every((x) => Math.abs(x - m) <= 0.01 * m), ang: a, len: l }; };
const rot = (v, d) => { const c = [v.reduce((s, p) => s + p[0], 0) / v.length, v.reduce((s, p) => s + p[1], 0) / v.length], a = d * Math.PI / 180; return v.map((p) => [c[0] + (p[0] - c[0]) * Math.cos(a) - (p[1] - c[1]) * Math.sin(a), c[1] + (p[0] - c[0]) * Math.sin(a) + (p[1] - c[1]) * Math.cos(a)]); };
const ownPlace = (board, id, r) => { const o = own(rot(CAT[id].v, r)); if (board === 'sides') return o.n; if (board === 'quads') return (o.eq ? 'T' : 'B') + (o.allSq ? 'L' : 'R'); const a = o.n === 4, b = o.sq > 0; return a && b ? 'AB' : a ? 'A' : b ? 'B' : 'out'; };

/* ---------- the catalogue ---------- */
for (const id of Object.keys(CAT)) {
  const d = CAT[id], v = C.SHAPES[id], o = own(d.v), ci = C.info(v);
  is(!!v && v.length === d.v.length && v.every((p, i) => Math.abs(p[0] - d.v[i][0]) < 1e-6 && Math.abs(p[1] - d.v[i][1]) < 1e-6), id + ': vertices = the design');
  is(isConvex(d.v) && C.convex(v), id + ': convex');
  is(o.n === d.n && o.sq === d.sq, id + ': ' + d.n + ' sides, ' + d.sq + ' square corners (design) = own (' + o.n + ', ' + o.sq + ')');
  is(ci.n === o.n && ci.squares === o.sq && ci.allEqual === o.eq, id + ': the core\'s sides / square corners / equal sides = own');
  is(o.eq === /^all/.test(d.eq), id + ': equal sides = the design\'s "' + d.eq + '"');
  is(o.ang.every((a) => Math.abs(a - 90) <= 0.5 || Math.abs(a - 90) >= 3), id + ': no corner within 3° of 90° unless it is 90° (' + o.ang.map((a) => a.toFixed(1)) + ')');
  /* the roll from every start side, at several turns */
  for (const r of [0, 37, 90, 200]) {
    const vr = C.verts(id, r), oo = own(vr);
    for (let s = 0; s < vr.length; s++) {
      const p = C.rollPlan(vr, s);
      if (p.order.length !== oo.n || p.marks.length !== oo.n) is(false, id + '@' + r + ' from side ' + s + ': n dashes and n marks');
      if (Math.abs(C.totalTurn(p) - 360) > 0.01) is(false, id + '@' + r + ' from side ' + s + ': a full turn of 360°');
      if (p.order[0] !== s || new Set(p.order).size !== oo.n) is(false, id + '@' + r + ': the roll starts on side ' + s + ' and lands on every side once');
      p.order.forEach((side, k) => { if (Math.abs(p.dashes[k] - oo.len[side]) > 1e-6) is(false, id + ': dash ' + k + ' = side length'); });
      /* the corner after each dash: square iff that corner is 90° (own angles) */
      const cornerAfter = (k) => { const a = p.order[k], b = p.order[(k + 1) % oo.n]; return (a + 1) % oo.n === b ? b : a; };
      p.marks.forEach((m, k) => { const sq = Math.abs(oo.ang[cornerAfter(k)] - 90) <= 0.5; if ((m === 'sq') !== sq) is(false, id + '@' + r + ': mark ' + k + ' ' + m + ' at a ' + oo.ang[cornerAfter(k)].toFixed(1) + '° corner'); });
      /* the pose: after each tip the side that just landed lies on the ground, the body above */
      for (let k = 0; k <= oo.n; k++) { const pose = C.poseAt(p, k, 0).pts, side = p.order[k % oo.n], a = pose[side], b = pose[(side + 1) % oo.n]; if (Math.abs(a[1]) > 1e-6 || Math.abs(b[1]) > 1e-6 || pose.some((q) => q[1] > 1e-6)) { is(false, id + '@' + r + ' s' + s + ': after tip ' + k + ' the landing side is on the ground, the body above'); break; } }
      pass++;
    }
    /* tickets at different turns are cyclic shifts of each other */
    const t0 = C.ticketOf({ id, rot: 0 }), t1 = C.ticketOf({ id, rot: r }), key = (t) => t.dashes.map((d, i) => d.toFixed(4) + t.marks[i]);
    const k0 = key(t0), k1 = key(t1), dbl = k0.concat(k0).join('|');
    is(dbl.indexOf(k1.join('|')) >= 0, id + ': the ticket at ' + r + '° is a cyclic shift of the ticket at 0°');
    const vb = C.verts(id, r), bs = C.bottomSide(vb), my = (i) => (vb[i][1] + vb[(i + 1) % vb.length][1]) / 2;
    is(vb.every((_, i) => my(i) <= my(bs) + 1e-9), id + '@' + r + ': the dock lands it on its lowest side');
  }
}

/* the square-corner rule itself, on synthetic parallelograms: 85°, 87° and 95° corners are not square, 89.6° and 90.4° are */
for (const [deg, sq] of [[85, false], [87, false], [95, false], [89.6, true], [90.4, true]]) {
  const a = (180 - deg) * Math.PI / 180, v = [[0, 0], [60, 0], [60 + 40 * Math.cos(a), -40 * Math.sin(a)], [40 * Math.cos(a), -40 * Math.sin(a)]];
  is((C.info(v).squares === 4) === sq, 'a ' + deg + '° parallelogram has ' + (sq ? 'four' : 'no') + ' square corners (' + C.info(v).angles.map((x) => x.toFixed(1)) + ')');
}

/* ---------- the rounds = the design ---------- */
const DESIGN = { sides: DA, quads: DB, rings: DC };
for (const b of C.BOARDS) {
  const pool = C.rounds(b), D = DESIGN[b];
  is(pool.length === D.length, b + ': ' + pool.length + ' rounds = the design\'s ' + D.length);
  pool.forEach((r, i) => {
    const d = D[i], tag = b + ' #' + (i + 1); if (!d) return;
    is(r.tray.map((x) => x.id + '@' + x.rot).join() === d.tray.map((x) => x.id + '@' + x.rot).join(), tag + ': the tray = the design');
    if (b === 'sides') {
      is(r.crates.join() === d.crates.join(), tag + ': crates ' + d.crates);
      const cnt = d.crates.map((n) => d.tray.filter((x) => ownPlace('sides', x.id, x.rot) === n).length);
      is(cnt.every((k) => k >= 1 && k <= 4), tag + ': every crate gets 1–4 shapes (' + cnt + ')');
      is(d.tray.every((x) => d.crates.indexOf(ownPlace('sides', x.id, x.rot)) >= 0), tag + ': every shape has its crate');
      is(d.tray.some((x) => x.rot !== 0 || /45|house|obtuse|irreg|long|lopsided|para|trap/.test(x.id)), tag + ': a shape off its tidy pose');
    }
    if (b === 'quads') {
      const cells = d.tray.map((x) => ownPlace('quads', x.id, x.rot));
      is(d.tray.concat(d.drawer || []).some((x) => x.id === 'quad_square' || x.id === 'quad_square45'), tag + ': a square is in the round (the success line names it)');
      /* the column headers are "four square corners" and "no square corner": a shape with 1–3 square corners would match neither */
      d.tray.concat(d.drawer || []).forEach((x) => { const q = own(rot(CAT[x.id].v, x.rot)).sq; is(q === 0 || q === 4, tag + ': ' + x.id + ' has 0 or 4 square corners (' + q + ')'); });
      if (!d.drawer) is(['TL', 'TR', 'BL', 'BR'].every((c) => cells.indexOf(c) >= 0), tag + ': all four cells are filled');
      else {
        const missing = ['TL', 'TR', 'BL', 'BR'].filter((c) => cells.indexOf(c) < 0);
        is(missing.length === 1 && C.missingCell(r) === missing[0], tag + ': exactly one cell empty (' + missing + ')');
        const fits = d.drawer.filter((x) => ownPlace('quads', x.id, x.rot) === missing[0]);
        is(fits.length === 1 && fits[0].id === d.fit.id && fits[0].rot === d.fit.rot, tag + ': exactly one drawer candidate fits, the ✓ one');
        is(r.drawer.map((x) => x.id + '@' + x.rot).join() === d.drawer.map((x) => x.id + '@' + x.rot).join(), tag + ': the drawer = the design');
      }
    }
    if (b === 'rings') {
      d.tray.forEach((x) => is(ownPlace('rings', x.id, x.rot) === x.region, tag + ': ' + x.id + ' belongs to ' + x.region));
      is(['A', 'B', 'AB', 'out'].every((g) => d.tray.some((x) => x.region === g)), tag + ': every region occupied');
      const bot1 = d.tray.filter((x) => (own(rot(CAT[x.id].v, x.rot)).n === 4 ? 'A' : 'out') !== x.region).length, bot2 = d.tray.filter((x) => (own(rot(CAT[x.id].v, x.rot)).sq ? 'B' : 'out') !== x.region).length;
      is(bot1 > 0 && bot2 > 0, tag + ': a one-rule bot misplaces a shape (four sides only: ' + bot1 + ', square corner only: ' + bot2 + ')');
    }
    r.tray.concat(r.drawer || []).forEach((x) => is(C.placeFor(b, C.infoOf(x)) === ownPlace(b, x.id, x.rot), tag + ': the core places ' + x.id + ' where this gate does'));
  });
}

/* ---------- Check ---------- */
for (const b of C.BOARDS) C.rounds(b).forEach((r, i) => {
  const tag = b + ' #' + (i + 1), st = C.newState(b, i, () => 0.4), right = (it) => C.placeFor(b, C.infoOf(it));
  let res = C.check(st); is(res.result === 'note' && res.key === 'hintPlace' && !st.misses, tag + ': shapes left in the tray → a reminder, no miss');
  const trayItems = st.items.filter((it) => it.from === 't');
  trayItems.forEach((it) => C.put(st, it.key, right(it)));
  if (st.missing) { res = C.check(st); is(res.result === 'note' && res.key === 'hintPlace', tag + ': the empty drawer still empty → a reminder'); }
  /* one shape wrong: the first tray shape in another place (or the drawer filled with a wrong candidate) */
  const places = C.places(st), w = trayItems[0], wrongPlace = places.find((p) => p !== right(w));
  C.put(st, w.key, wrongPlace);
  if (st.missing) { const bad = st.items.find((it) => it.from === 'd' && right(it) !== st.missing); C.put(st, bad.key, st.missing); }
  res = C.check(st);
  is(res.result === 'miss' && st.misses === 1 && !st.help && w.place == null && !!w.ticket, tag + ': a wrong place → miss 1, the shape comes home with its ticket');
  is(trayItems.slice(1).every((it) => it.place === right(it)), tag + ': the right shapes stay placed');
  res = C.check(st); is(res.result === 'note' && res.key === 'hintPlace' && st.misses === 1, tag + ': Check again → the shape is home, a reminder, never a second miss');
  C.put(st, w.key, wrongPlace); if (st.missing) { const bad2 = st.items.find((it) => it.from === 'd' && right(it) !== st.missing); C.put(st, bad2.key, st.missing); }
  res = C.check(st); is(res.result === 'miss' && st.help, tag + ': miss 2 → help');
  C.put(st, w.key, right(w));
  if (st.missing) { st.items.filter((it) => it.from === 'd').forEach((it) => C.put(st, it.key, 'tray')); const good = st.items.find((it) => it.from === 'd' && right(it) === st.missing); C.put(st, good.key, st.missing); }
  res = C.check(st); is(res.result === 'ok' && st.done, tag + ': every shape in its place → done');
});
/* rolling: a full roll by the hand prints the ticket and sends the shape home */
{ const st = C.newState('sides', 0, () => 0.5), it = st.items[0], n = C.infoOf(it).n; C.put(st, it.key, 'dock'); let r; for (let k = 0; k < n; k++) r = C.roll(st, 1); is(r === 'done' && st.docked == null && it.ticket && it.ticket.dashes.length === n, 'a full roll by the hand: ' + n + ' tips → the ticket, back to the tray'); }
{ const st = C.newState('sides', 0, () => 0.5), it = st.items[0]; C.put(st, it.key, 'dock'); C.roll(st, 1); C.roll(st, -1); is(st.step === 0 && st.docked === it.key && !C.roll(st, -1), 'rolling back un-rolls, never below the start'); }

/* ---------- the plan, the tray order, the crates ---------- */
for (const b of C.BOARDS) {
  let prev = null, ok = true; for (let n = 0; n < 1000; n++) { const p = C.plan(b, Math.random, prev); if (prev && p.join() === prev.join()) ok = false; if (p.slice().sort((x, y) => x - y).join() !== C.rounds(b).map((r) => r.k).join()) ok = false; prev = p; }
  is(ok, b + ': 1000 plans, each a permutation, never the previous order');
  const s1 = C.plan(b, () => 0, null); is(C.plan(b, () => 0, s1).join() !== s1.join(), b + ': a stuck random source still changes the order');
  C.rounds(b).forEach((r, i) => { let ok3 = true; for (let n = 0; n < 50; n++) { const st = C.newState(b, i); const pl = st.items.filter((it) => it.from === 't').map((it) => String(C.placeFor(b, C.infoOf(it)))); for (let j = 2; j < pl.length; j++) if (pl[j] === pl[j - 1] && pl[j - 1] === pl[j - 2]) ok3 = false; } is(ok3, b + ' #' + (i + 1) + ': no three tray neighbours share a place'); });
}
C.rounds('sides').forEach((r, i) => { const pos = {}; for (let n = 0; n < 600; n++) { const st = C.newState('sides', i); st.crates.forEach((c, j) => { pos[c + ':' + j] = (pos[c + ':' + j] || 0) + 1; }); } const want = 600 / r.crates.length; is(Object.values(pos).every((x) => Math.abs(x - want) < want * 0.25), 'sides #' + (i + 1) + ': each crate stands in each position about equally'); });

/* ---------- the activity layer in node ---------- */
const src = fs.readFileSync(ACT, 'utf8');
const ctx = { TrundleWheelCore: C, console }; vm.createContext(ctx);
vm.runInContext(src.replace(/function injectTrundleWheelCSS\(\)[\s\S]*$/, '') + ';this.A = TrundleWheelActivity;', ctx);
const A = ctx.A;
for (const k of Object.keys(A.strings)) is(LOCS.every((l) => typeof A.strings[k][l] === 'string' && A.strings[k][l]), 'string ' + k + ' in 11 locales');
is(LOCS.every((l) => [3, 4, 5, 6].every((n) => A.NOUNS[l] && A.NOUNS[l][n] && A.NOUNS[l][n].length === 4 && A.NOUNS[l][n][3].replace(/­/g, '').toLowerCase() === A.NOUNS[l][n][1].toLowerCase())), 'the shape names in 11 locales; each crate label is its plural with soft hyphens');
const asked = new Set();
for (const loc of LOCS) for (const b of C.BOARDS) C.rounds(b).forEach((r, i) => {
  const a = Object.create(A); a.api = { lang: loc, settings: { board: b, crates: 'both' }, t: (k) => { asked.add(k); return (A.strings[k] || {})[loc] || k; } }; a._view = {}; a.st = C.newState(b, i, () => 0.5);
  a.st.items.forEach((it) => { if (it.from === 't') it.place = C.placeFor(b, C.infoOf(it)); });
  const lines = [a._taskLine(), a._t(C.hint(a.st)), a._okLine()]; a.st.help = true; lines.push(a._t(C.hint(a.st)));
  lines.forEach((ln) => { const bad = /\{|undefined|NaN|null/.test(ln) || /\bfree\b|gratis|kostenlos|gratuit/i.test(ln) || /(^|[^\d])0([^\d]|$)/.test(ln); if (bad) is(false, loc + ' ' + b + ' #' + (i + 1) + ': «' + ln + '»'); else pass++; });
  if (b === 'sides') { const ok = a._okLine(); C.counts(a.st).forEach((c) => { const nn = A.NOUNS[loc][c.n]; is(ok.indexOf(c.k + ' ' + (c.k === 1 ? nn[0] : nn[2])) >= 0, loc + ' sides #' + (i + 1) + ': the success names ' + c.k + ' ' + (c.k === 1 ? nn[0] : nn[2])); }); }
});
['title', 'instruction', 'instrBubble', 'okBubble', 'checkBtn', 'setBoard', 'bSides', 'bQuads', 'bRings', 'setCrates', 'cBoth', 'cNum', 'cName', 'hintPlace'].forEach((k) => asked.add(k));
const body = src.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, '');
const dead = Object.keys(A.strings).filter((k) => !asked.has(k) && !new RegExp("['\"]" + k + "['\"]").test(body) && !(/^aCell|^aRing/.test(k) && /'aCell' \+|'aRing' \+/.test(body)));
is(!dead.length, 'no dead strings (' + dead + ')');
is(A.OK_MS === 500, 'Next follows success after 0.5 s');

/* ---------- the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = (man.activities || man).find((x) => x.id === 'sort-bins.sort-by-sides.2-g-a-1');
is(row && row.tool === 'trundle-wheel-activity' && row.task_template === 'trundle-wheel' && row.params && !Object.keys(row.params).length, 'the manifest row points at the new tool, old params dropped');
is(row && LOCS.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'the row ships in 11 locales');

console.log(`verify-trundle-wheel-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
