#!/usr/bin/env node
/* =====================================================================
   verify-dough-press-core.js — the logic gate of ACTIVITY #171, The
   Dough Press ("Same Size, Different Shape", 2.G.A.3). Its ground truth
   is the design file (docs/activities-rebuild/designs/171-choice-board.md):
   the figure catalogue's cut percentages and staircase vertices, the three
   round tables and the design's own MEASURED shaded-share line — parsed
   here — with this gate's own piece construction and shoelace, never the
   tool's. It checks:
     · every figure's piece areas (built here) = the core's; the "mixed"
       figures have equal areas but pieces of different shapes; the step's
       two pieces are congruent to each other, not to the straight halves;
       no uneven figure has a piece of exactly 1/n;
     · MATCH (16): exactly one tile has the model's count AND equal shares,
       and it is the design's ✓; the ✓ is not always the tile with the most
       (or the fewest) pieces;
     · FAIR (8): the fair set = the design's ✓ set; 2–3 fair per round;
     · WHICH (9): the shaded shares = the design's measured line; exactly one
       tile shows the card; no distractor within 0.04 of its card;
     · the press: patty radius ∝ √area (equal patties ⇔ equal areas); the
       squash keeps the area within 0.5 % at every step; the stack fit;
     · answer positions: MATCH 4/4/4/4 per pass, WHICH 2/2/2/3 per pass,
       FAIR never all in one row or one column; the plan (no repeat, no slot
       three rounds running, a stuck random source);
     · Check: nothing chosen → a reminder; a wrong tile → miss 1, miss 2 =
       help; a new choice clears the showing; the right → done;
     · the activity layer in node: every line in 11 locales for every board,
       read setting and round, no "{", "undefined" or "free"; the fraction
       words complete; no dead strings; Next after 0.5 s; the manifest.
   Env overrides (the mutation script): DP_CORE, DP_ACT, DP_MAN.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..');
const C = require(process.env.DP_CORE || path.join(REPO, 'mini tools', 'dough-press-core.js'));
const ACT = process.env.DP_ACT || path.join(REPO, 'mini tools', 'dough-press-activity.js');
const MAN = process.env.DP_MAN || path.join(REPO, 'mini tools', 'choice-board-activities.json');
let pass = 0, fail = 0;
const is = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL: ' + m); } };
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* ---------- the design, parsed ---------- */
const md = fs.readFileSync(path.join(REPO, 'docs', 'activities-rebuild', 'designs', '171-choice-board.md'), 'utf8');
const sec = (a, b) => md.slice(md.indexOf(a), md.indexOf(b, md.indexOf(a)));
const rows = (txt, re) => txt.split('\n').filter((l) => re.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
const cat = sec('**Figure catalogue**', '**Board MATCH');
const pct = (re) => (cat.match(re) || [])[1].split(/[^\d.]+/).filter(Boolean).map(Number);
const U = { halves: pct(/-halves-uneq` \(cut at ([\d %,.]+)\)/), thirds: pct(/-thirds-uneq` \(strips at ([\d %,.]+)/), fourths: pct(/-fourths-uneq` \(vertical at ([\d %,.]+)/) };
is(U.halves.join() === '34' && U.thirds.join() === '24,60' && U.fourths.join() === '14,38,66', 'the uneven cuts parse from the catalogue (' + JSON.stringify(U) + ')');
const STEP = (cat.match(/pieces (\(0,0\)[\d(),]+)/) || [])[1].match(/\((\d+),(\d+)\)/g).map((p) => p.slice(1, -1).split(',').map(Number));
is(STEP.length === 8, 'the staircase piece parses: ' + STEP.length + ' vertices');
const DM = rows(sec('**Board MATCH', '**Board FAIR'), /^\| \d+ \|/).map((c) => ({ model: c[1], ok: c[2], dis: c[3].split('·').map((x) => x.trim()) }));
const DF = rows(sec('**Board FAIR', '**Board WHICH'), /^\| F\d \|/).map((c) => c[1].split('·').map((x) => x.trim()).map((x) => ({ fig: x.replace(' ✓', ''), ok: /✓/.test(x) })));
const DW = rows(sec('**Board WHICH', '- **Answer position**'), /^\| W\d \|/).map((c) => ({ card: c[1].split('/').map(Number) }));
const meas = (md.match(/\*\*Measured shaded shares \(✓ first\):\*\* ([^)]*?)—/) || [])[1];
const MW = meas.split('·').map((s) => s.trim().replace(/^W\d /, '').split(/[| ]+/).filter(Boolean).map(Number));
is(DM.length === 16 && DF.length === 8 && DW.length === 9 && MW.length === 9 && MW.every((x) => x.length === 4), 'the round tables parse: 16 match, 8 fair, 9 which, 9 measured share rows');
/* F6's second uneven halves is drawn at a 28 % offset (the design's note under the table) */
is(/F6 has two `rect-halves-uneq` drawn at different seeded offsets 34 % \/ 28 %/.test(md), 'the design names F6\'s second uneven halving at 28 %');

/* ---------- this gate's own pieces (areas only, from the design's words) ---------- */
const area = (P) => { let s = 0; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length]; s += a[0] * b[1] - b[0] * a[1]; } return Math.abs(s) / 2; };
const ownAreas = (id) => {
  const [base, at] = id.split('@'), [kind, ...rest] = base.split('-'), cut = rest.join('-'), W = 100, H = kind === 'sq' ? 100 : 60, T = W * H;
  const strips = (cuts) => { const xs = [0, ...cuts, 100]; return xs.slice(1).map((x, i) => (x - xs[i]) / 100 * T); };
  switch (cut) {
    case 'halves-v': case 'halves-h': case 'halves-diag': return [T / 2, T / 2];
    case 'halves-uneq': return strips([at ? +at : U.halves[0]]);
    case 'thirds-v': case 'thirds-h': return [T / 3, T / 3, T / 3];
    case 'thirds-uneq': return strips(U.thirds);
    case 'fourths-grid': case 'fourths-strips': case 'fourths-diag': return [T / 4, T / 4, T / 4, T / 4];
    case 'fourths-uneq': return strips(U.fourths);
    case 'notsplit': return [T];
    case 'fourths-mixed': return [T / 4, T / 4, T / 4, T / 4];
    case 'thirds-mixed': return [T / 3, (T * 2 / 3) / 2, (T * 2 / 3) / 2];
    case 'halves-step': { const a = area(STEP); return [a, T - a]; }
  }
  throw new Error('unknown figure ' + id);
};
const sortN = (a) => a.slice().sort((x, y) => x - y);
const eqShares = (A) => { const m = A.reduce((s, x) => s + x, 0) / A.length; return A.length > 1 && A.every((x) => Math.abs(x - m) <= 0.001 * m); };
const ALLFIGS = new Set(); DM.forEach((r) => [r.model, r.ok, ...r.dis].forEach((f) => ALLFIGS.add(f))); DF.forEach((r) => r.forEach((t) => ALLFIGS.add(t.fig === 'rect-halves-uneq' ? t.fig : t.fig))); ['rect-halves-uneq@28', 'rect-fourths-mixed'].forEach((f) => ALLFIGS.add(f));
C.rounds('which').forEach((r) => r.tiles.forEach((t) => ALLFIGS.add(t.fig)));
for (const id of ALLFIGS) {
  const own = ownAreas(id), core = C.areas(C.figure(id));
  is(sortN(own).every((x, i) => Math.abs(x - sortN(core)[i]) < 1e-6) && own.length === core.length, id + ': the core\'s piece areas = this gate\'s (' + sortN(core).map((x) => x.toFixed(0)) + ')');
  is(Math.abs(core.reduce((s, x) => s + x, 0) - C.total(C.figure(id))) < 1e-6, id + ': the pieces fill the whole');
  is(C.isEqualShares(C.figure(id)) === eqShares(own), id + ': equal shares as computed here (' + eqShares(own) + ')');
  if (/uneq/.test(id)) { const n = own.length, T = own.reduce((s, x) => s + x, 0); is(own.every((x) => Math.abs(x - T / n) > 0.001 * T), id + ': no uneven piece is exactly 1/' + n + ' (within the 0.1 % that defines equal)'); }
}
/* mixed figures: equal areas, different shapes (side-length signatures); the step's pieces congruent to each other only */
const sig = (P) => { const L = P.map((p, i) => { const q = P[(i + 1) % P.length]; return Math.round(Math.hypot(q[0] - p[0], q[1] - p[1]) * 100) / 100; }); return sortN(L).join(','); };
for (const id of ['sq-fourths-mixed', 'rect-thirds-mixed', 'rect-fourths-mixed']) { const f = C.figure(id), S = new Set(f.pieces.map(sig)); is(C.isEqualShares(f) && S.size >= 2, id + ': equal shares, but pieces of ' + S.size + ' different shapes'); }
{ const st = C.figure('rect-halves-step'), h = C.figure('rect-halves-h'); is(sig(st.pieces[0]) === sig(st.pieces[1]) && sig(st.pieces[0]) !== sig(h.pieces[0]), 'rect-halves-step: its two pieces are congruent to each other, not to the straight halves'); is(st.pieces.every((p) => Math.abs(area(p) - 3000) < 1e-9), 'rect-halves-step: each piece is exactly 3000 = 1/2 of 6000'); }

/* ---------- the rounds ---------- */
const RM = C.rounds('match'), RF = C.rounds('fair'), RW = C.rounds('which');
is(RM.length === 16 && RM.every((r, i) => r.model === DM[i].model && r.tiles[0].fig === DM[i].ok && r.tiles.slice(1).map((t) => t.fig).join() === DM[i].dis.join()), 'MATCH = the design (16 rounds, ✓ and distractors)');
let mostOk = 0, fewestOk = 0;
RM.forEach((r, i) => {
  const mn = ownAreas(r.model).length, ok = r.tiles.map((t) => { const A = ownAreas(t.fig); return A.length === mn && eqShares(A); });
  is(ok.filter(Boolean).length === 1 && ok[0], 'MATCH #' + (i + 1) + ': exactly one tile has ' + mn + ' equal shares — the design\'s ✓');
  const cnt = r.tiles.map((t) => ownAreas(t.fig).length), mx = Math.max(...cnt), mi = Math.min(...cnt);
  if (cnt[0] === mx && cnt.filter((c) => c === mx).length === 1) mostOk++; if (cnt[0] === mi && cnt.filter((c) => c === mi).length === 1) fewestOk++;
});
is(mostOk < 16 && fewestOk < 16, 'MATCH: the ✓ is not always the tile with the most (' + mostOk + ') or the fewest (' + fewestOk + ') pieces');
is(RF.length === 8, 'FAIR: 8 rounds');
RF.forEach((r, i) => {
  const d = DF[i]; is(r.tiles.map((t) => t.fig.split('@')[0]).join() === d.map((t) => t.fig).join(), 'FAIR F' + (i + 1) + ': the tiles = the design');
  const fair = r.tiles.map((t) => eqShares(ownAreas(t.fig)));
  is(fair.join() === d.map((t) => t.ok).join() && r.tiles.every((t, j) => t.ok === fair[j]), 'FAIR F' + (i + 1) + ': the fair set computed here = the design\'s ✓ (' + fair.filter(Boolean).length + ')');
  is(fair.filter(Boolean).length >= 2 && fair.filter(Boolean).length <= 3, 'FAIR F' + (i + 1) + ': 2–3 fair tiles');
});
is(RW.length === 9 && RW.every((r, i) => r.card.join() === DW[i].card.join()), 'WHICH = the design\'s cards');
RW.forEach((r, i) => {
  const shares = r.tiles.map((t) => C.share(C.figure(t.fig), t.shaded));
  is(shares.every((s, j) => Math.abs(s - MW[i][j]) <= 0.0006), 'WHICH W' + (i + 1) + ': the shaded shares = the design\'s measured line (' + shares.map((x) => x.toFixed(3)) + ' vs ' + MW[i] + ')');
  const want = r.card[0] / r.card[1], shows = r.tiles.map((t, j) => eqShares(ownAreas(t.fig)) && Math.abs(MW[i][j] - want) < 0.001);
  is(shows.filter(Boolean).length === 1 && shows[0] && r.tiles.every((t, j) => C.shows(C.figure(t.fig), t.shaded, r.card) === shows[j]), 'WHICH W' + (i + 1) + ': exactly one tile shows ' + r.card.join('/') + ' — the ✓');
  is(MW[i].slice(1).every((s) => Math.abs(s - want) >= 0.04), 'WHICH W' + (i + 1) + ': no distractor within 0.04 of the card');
});

/* ---------- the press ---------- */
for (const id of ALLFIGS) {
  const f = C.figure(id), A = C.areas(f), R = C.patties(f);
  R.forEach((r, j) => is(Math.abs(r * r / A[j] - C.K / Math.PI) < 1e-9, id + ' piece ' + j + ': patty radius² ∝ area'));
  for (const t of [0, 0.25, 0.5, 0.75, 1]) f.pieces.forEach((p, j) => { const m = C.morph(p, t); if (Math.abs(area(m) - A[j]) > 0.005 * A[j]) is(false, id + ' piece ' + j + ': the squash keeps the area at t=' + t + ' (' + area(m).toFixed(1) + ' vs ' + A[j].toFixed(1) + ')'); else pass++; });
  f.pieces.forEach((pc, j) => { const m = C.morph(pc, 1), xs = m.map((p) => p[0]), ys = m.map((p) => p[1]), c = [(Math.max(...xs) + Math.min(...xs)) / 2, (Math.max(...ys) + Math.min(...ys)) / 2], d = m.map((p) => Math.hypot(p[0] - c[0], p[1] - c[1])); is(Math.max(...d) - Math.min(...d) < 0.02 * Math.max(...d), id + ' piece ' + j + ': the squash ends as a circle'); });
}
{ const L = [3, 2, 2], fit = (r) => C.stackFit(L, r).map((x) => x.fit).join();
  is(fit([3, 2, 2]) === 'ok,ok,ok' && fit([4, 2, 1]) === 'over,ok,under' && fit([3, 2]) === 'ok,ok,missing' && fit([3, 2, 2, 1]) === 'ok,ok,ok,extra', 'the stack fit: ok / over / under / missing / extra'); }

/* ---------- answer positions ---------- */
const okIdx = (st, board) => st.tiles.findIndex((t, i) => C.tileRight(st, i));
for (let p = 0; p < 4; p++) {
  const m = [0, 0, 0, 0]; RM.forEach((r) => m[okIdx(C.newState('match', r.k, p), 'match')]++); is(m.join() === '4,4,4,4', 'MATCH pass ' + (p + 1) + ': the ✓ in each slot 4 times (' + m + ')');
  const w = [0, 0, 0, 0]; RW.forEach((r) => w[okIdx(C.newState('which', r.k, p), 'which')]++); is(w.slice().sort().join() === '2,2,2,3', 'WHICH pass ' + (p + 1) + ': the ✓ slots 2/2/2/3 (' + w + ')');
}
RM.forEach((r) => { const sl = [0, 1, 2, 3].map((p) => okIdx(C.newState('match', r.k, p))); is(new Set(sl).size === 4, 'MATCH #' + (r.k + 1) + ': the ✓ moves slot every pass (' + sl + ')'); });
RF.forEach((r) => { let ok = true; for (let n = 0; n < 200; n++) { const st = C.newState('fair', r.k, 0), fair = st.tiles.map((t, i) => C.tileRight(st, i) ? i : -1).filter((i) => i >= 0), rowsF = new Set(fair.map((s) => Math.floor(s / 3))), colsF = new Set(fair.map((s) => s % 3)); if (rowsF.size < 2 || colsF.size < 2) ok = false; } is(ok, 'FAIR F' + (r.k + 1) + ': the fair tiles never all in one row or one column'); });
for (const b of C.BOARDS) {
  let prev = null, ok = true, runs = true;
  for (let n = 0; n < 1000; n++) {
    const pass = n % 4, p = C.plan(b, Math.random, prev, pass);
    if (prev && p.join() === prev.join()) ok = false;
    if (p.slice().sort((x, y) => x - y).join() !== C.rounds(b).map((r) => r.k).join()) ok = false;
    if (b !== 'fair') { const sl = p.map((k) => okIdx(C.newState(b, k, pass))); for (let i = 2; i < sl.length; i++) if (sl[i] === sl[i - 1] && sl[i - 1] === sl[i - 2]) runs = false; }
    prev = p;
  }
  is(ok, b + ': 1000 plans, each a permutation, never the previous order');
  if (b !== 'fair') is(runs, b + ': the ✓ never in one slot three rounds running');
  const s1 = C.plan(b, () => 0, null, 0); is(C.plan(b, () => 0, s1, 0).join() !== s1.join(), b + ': a stuck random source still changes the order');
}

/* ---------- Check ---------- */
for (const b of ['match', 'which']) C.rounds(b).forEach((r) => {
  const tag = b + ' #' + (r.k + 1), st = C.newState(b, r.k, 0), right = okIdx(st), wrong = st.tiles.findIndex((t, i) => i !== right);
  let res = C.check(st); is(res.result === 'note' && res.key === 'hintPick' && !st.misses, tag + ': nothing chosen → a reminder');
  C.select(st, wrong); res = C.check(st); is(res.result === 'miss' && st.misses === 1 && !st.help && C.hint(st) === (b === 'match' ? 'hintPatties' : 'hintCard'), tag + ': a wrong tile → miss 1');
  C.check(st); is(st.help && C.hint(st) === 'hintCompare', tag + ': miss 2 → help');
  C.select(st, right); is(st.verdict === null, tag + ': a new choice clears the showing');
  res = C.check(st); is(res.result === 'ok' && st.done, tag + ': the right tile → done');
});
RF.forEach((r) => {
  const tag = 'fair F' + (r.k + 1), st = C.newState('fair', r.k, 0), fair = st.tiles.map((t, i) => C.tileRight(st, i));
  let res = C.check(st); is(res.result === 'note' && res.key === 'hintRibbon', tag + ': no ribbon → a reminder');
  const u = fair.indexOf(false), f0 = fair.indexOf(true); C.ribbon(st, u); C.ribbon(st, f0); res = C.check(st);
  is(res.result === 'miss' && st.ribbons.indexOf(u) < 0 && st.ribbons.indexOf(f0) >= 0 && C.hint(st, res) === 'hintFair', tag + ': an unfair ribbon → a miss, its ribbon slips off, the fair one stays');
  res = C.check(st); is(res.result === 'miss' && C.hint(st, res) === 'hintCompare', tag + ': fair ones still missing → miss 2, help');
  fair.forEach((f, i) => { if (f && st.ribbons.indexOf(i) < 0) C.ribbon(st, i); }); res = C.check(st); is(res.result === 'ok' && st.done, tag + ': every fair shape ribboned → done');
});
{ const st = C.newState('fair', 0, 0), fair = st.tiles.map((t, i) => C.tileRight(st, i)); C.ribbon(st, fair.indexOf(true)); const res = C.check(st); is(C.hint(st, res) === 'hintMore', 'fair: only fair ribbons but some missing → hintMore'); }

/* ---------- the activity layer in node ---------- */
const src = fs.readFileSync(ACT, 'utf8');
const ctx = { DoughPressCore: C, console }; vm.createContext(ctx);
vm.runInContext(src.replace(/function injectDoughPressCSS\(\)[\s\S]*$/, '') + ';this.A = DoughPressActivity;', ctx);
const A = ctx.A;
for (const k of Object.keys(A.strings)) is(LOCS.every((l) => typeof A.strings[k][l] === 'string' && A.strings[k][l]), 'string ' + k + ' in 11 locales');
const AM = ['1/2', '1/3', '2/3', '1/4', '2/4', '3/4'];
is(LOCS.every((l) => A.FRAC[l] && [2, 3, 4].every((n) => A.FRAC[l].plural[n] && A.FRAC[l].into[n]) && AM.every((x) => A.FRAC[l].amount[x])), 'the fraction words complete in 11 locales');
const asked = new Set();
for (const loc of LOCS) for (const b of C.BOARDS) for (const read of ['words', 'numbers']) C.rounds(b).forEach((r) => {
  const a = Object.create(A); a.api = { lang: loc, settings: { board: b, read }, t: (k) => { asked.add(k); return (A.strings[k] || {})[loc] || k; }, sound: () => {}, announce: () => {} };
  a._view = { note: '' }; a._paint = () => {}; a._qs = () => null; a.FAST = true; a.st = C.newState(b, r.k, 0);
  const lines = [a._taskLine()];
  a._check(); lines.push(a._view.note);
  const right = a.st.tiles.findIndex((t, i) => C.tileRight(a.st, i)), wrong = a.st.tiles.findIndex((t, i) => !C.tileRight(a.st, i));
  if (b === 'fair') { a._tap(wrong); a._tap(right); } else a._tap(wrong);
  a._check(); lines.push(a._view.note); a._check(); lines.push(a._view.note);
  if (b === 'fair') { a.st.tiles.forEach((t, i) => { if (C.tileRight(a.st, i) && a.st.ribbons.indexOf(i) < 0) C.ribbon(a.st, i); a.st.ribbons = a.st.ribbons.filter((j) => C.tileRight(a.st, j)); }); } else C.select(a.st, right);
  C.check(a.st); lines.push(a._okLine());
  lines.forEach((ln) => { const bad = !ln || /\{|undefined|NaN|null/.test(ln) || /\bfree\b|gratis|kostenlos|gratuit/i.test(ln); if (bad) is(false, loc + ' ' + b + '/' + read + ' #' + (r.k + 1) + ': «' + ln + '»'); else pass++; });
  if (b === 'fair') { const f2 = Object.create(A); f2.api = a.api; f2._view = { note: '' }; f2._paint = () => {}; f2._qs = () => null; f2.FAST = true; f2.st = C.newState('fair', r.k, 0); f2._tap(f2.st.tiles.findIndex((t, i) => C.tileRight(f2.st, i))); f2._check(); is(f2._view.note === A.strings.hintMore[loc], loc + ' fair F' + (r.k + 1) + ': only fair ribbons, some missing → hintMore'); }
  if (b === 'which') { const c = r.card, t = lines[0]; is(read === 'numbers' ? t.indexOf(c[0] + '/' + c[1]) >= 0 : t.indexOf(A.FRAC[loc].amount[c[0] + '/' + c[1]]) >= 0, loc + ' which/' + read + ' W' + (r.k + 1) + ': the task names the card as ' + read); }
});
['title', 'instruction', 'instrBubble', 'okBubble', 'checkBtn', 'setBoard', 'bMatch', 'bFair', 'bWhich', 'setRead', 'rWords', 'rNumbers'].forEach((k) => asked.add(k));
const body = src.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, '');
const dead = Object.keys(A.strings).filter((k) => !asked.has(k) && !new RegExp("['\"]" + k + "['\"]").test(body));
is(!dead.length, 'no dead strings (' + dead + ')');
is(A.OK_MS === 500, 'Next follows success after 0.5 s');

/* ---------- the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = (man.activities || man).find((x) => x.id === 'choice-board.fraction-noncongruent.2-g-a-3');
is(row && row.tool === 'dough-press-activity' && row.task_template === 'dough-press' && row.params && !Object.keys(row.params).length, 'the manifest row points at the new tool, old params dropped');
is(row && LOCS.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'the row ships in 11 locales');

console.log(`verify-dough-press-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
