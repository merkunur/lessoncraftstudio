#!/usr/bin/env node
/* =====================================================================
   verify-cm-cutter-core.js — the gate for ACTIVITY #153, The CM Cutter
   (2.MD.A.1). The gate keeps its OWN oracle: the rounds, the cutter's
   physics (pieces, stub, air, tail) and every bot are written here, never
   read off the tool.
   A the rounds (the design's tables) · B the window · C the hand · D the
   cutter · E check against the own oracle over every placement · F the
   bots (read without fixing, push to the table edge, read the broken
   end, take the first / longest ruler) · G misses and hints · H no
   alignment lamp (the snapshot carries no "aligned"/distance field) ·
   I the plan (order + rack positions) · J geometry · K strings ×11 and
   reachability · L the manifest row.
   CC_CORE / CC_ACT / CC_MANIFEST let mutate-cm-cutter.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.CC_CORE || path.join(ROOT, 'mini tools', 'cm-cutter-core.js');
const ACT_PATH = process.env.CC_ACT || path.join(ROOT, 'mini tools', 'cm-cutter-activity.js');
const MAN_PATH = process.env.CC_MANIFEST || path.join(ROOT, 'mini tools', 'tildy-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6) ---------- */
const OWN_ALIGN = [['ribbon', 0, 7, 3], ['leather', 0, 5, 2], ['yarn', 0, 4, 1], ['cord', 0, 9, -2], ['denim', 0, 8, 4], ['felt', 2, 8, 1], ['lace', 1, 11, 0], ['braid', 5, 8, 3], ['elastic', 2, 13, 4]];
const OWN_TRICKY = [['broken', 2, 8, { b: 2 }], ['broken', 3, 7, { b: 3 }], ['broken', 1, 10, { b: 1 }], ['fix', 0, 7, { z: 1, len: 12, says: 6 }], ['fix', 0, 10, { z: 0, len: 9, says: 9, rack: [7, 9, 12] }],
  ['pick', 0, 11, { rack: [6, 9, 12] }], ['pick', 0, 8, { rack: [5, 7, 10] }], ['pick', 0, 14, { rack: [10, 12, 15] }]];
/* the gate's own cutter: the ruler's 0 at Z, length len, over the strip [s, e] */
const ownSnip = (s, e, Z, len) => ({ pieces: Math.max(0, Math.min(e, Z + len) - Math.max(s, Z)), stub: Math.max(0, Z - s), air: Math.max(0, s - Z), tail: Math.max(0, e - Z - len) });
const ownVerdict = (s, e, Z, len, reading) => { const c = ownSnip(s, e, Z, len); return c.tail ? 'short' : c.stub ? 'inside' : c.air ? 'before' : reading !== e - s ? 'misread' : 'ok'; };

/* ---------- A. the rounds ---------- */
const A1 = C.rounds('align'), A2 = C.rounds('tricky');
ok(A1.map((r) => [r.strip, r.s, r.e, r.z].join()).join('|') === OWN_ALIGN.map((x) => x.join()).join('|'), 'A: level 1 is the design\'s nine rounds');
ok(A1.every((r) => r.len === 12 && r.kind === 'align'), 'A: level 1 rulers are 12 cm');
ok(A2.map((r) => r.kind + r.s + '-' + r.e).join() === OWN_TRICKY.map((x) => x[0] + x[1] + '-' + x[2]).join(), 'A: level 2 is the design\'s eight rounds');
A2.forEach((r, i) => { const o = OWN_TRICKY[i][3]; ok(Object.keys(o).every((k) => JSON.stringify(r[k]) === JSON.stringify(o[k])), 'A: level 2 round ' + (i + 1) + ' carries ' + JSON.stringify(o)); });
ok(new Set(A1.map((r) => r.e - r.s)).size === 9 && new Set(A2.map((r) => r.e - r.s)).size === 8, 'A: lengths distinct within each level');
ok(A1.concat(A2).every((r) => r.e - r.s >= 1), 'A: no strip of length 0');
const offs = A1.map((r) => r.z - r.s);
ok(offs.some((x) => x > 0) && offs.some((x) => x < 0) && offs.every((x) => x !== 0), 'A: the cat always moves the 0, both ways (' + offs.join(',') + ')');
ok(A1.some((r) => r.z - r.s === 1), 'A: a round where the 0 sits on the 1 ("not the 1!")');
ok(A1.every((r) => r.e - r.s <= 12), 'A: the 12-cm ruler reaches every level-1 strip once aligned');
A2.filter((r) => r.rack).forEach((r) => ok(r.rack.filter((L) => L >= r.e - r.s).length === 1, 'A: rack ' + r.rack.join('·') + ' for ' + (r.e - r.s) + ' cm has exactly one ruler long enough'));
ok(A2.filter((r) => r.kind === 'fix').every((r) => r.says !== r.e - r.s), 'A: Tildy\'s readings are wrong');

/* ---------- B. the window ---------- */
A1.concat(A2).forEach((r) => {
  const w0 = C.windowLeft(r), z = r.kind === 'broken' || r.kind === 'pick' ? r.s : r.z, lo = Math.min(r.s, z), hi = Math.max(r.e, z);
  ok(w0 === lo - 1 && hi <= w0 + C.WIN, 'B: ' + r.level + ' ' + r.k + ': the strip and the ruler\'s 0 fit the 16-cm window [' + w0 + ', ' + (w0 + C.WIN) + ']');
  ok(r.s - w0 >= 1 && r.s - w0 <= 3, 'B: ' + r.level + ' ' + r.k + ': the strip starts ' + (r.s - w0) + ' cm in (never at the table edge)');
});

/* ---------- C. the hand ---------- */
(() => {
  const st = C.newState('align', 0);
  ok(st.zero === 3 && st.len === 12 && st.reading === null, 'C: round 1 starts with the 0 where the cat left it');
  ok(!C.slide(st, 3) && C.slide(st, 0) && st.zero === 0, 'C: slide moves the 0 to a whole centimetre; the same place is no move');
  C.slide(st, -40); ok(st.zero === st.w0, 'C: the 0 stays inside the window (left)');
  C.slide(st, 99); ok(st.zero === st.w0 + C.WIN - 1, 'C: and on the right');
  ok(C.read(st, 7) && st.reading === 7 && !C.read(st, 7), 'C: a numeral is read once');
  C.read(st, 40); ok(st.reading === 12, 'C: a reading is on the ruler');
  ok(!C.stitch(st, 2) && !C.pick(st, 0), 'C: no stitches or rack in level 1');
  const b = C.newState('tricky', 0);
  ok(!C.slide(b, 3) && !C.read(b, 8), 'C: a broken ruler cannot slide or be read');
  ok(C.stitch(b, 2) && b.stitches.join() === '2' && C.stitch(b, 2) && b.stitches.length === 0, 'C: a stitch toggles');
  ok(!C.stitch(b, 1) && !C.stitch(b, 12), 'C: stitches only where the broken ruler lies');
  const p = C.newState('tricky', 5);
  ok(p.len === null && C.check(p).key === 'hintPick' && p.misses === 0, 'C: a pick round starts with no ruler, and Check asks for one');
  ok(C.pick(p, 0) && p.len === p.rack[0] && p.zero === p.w0 && p.zero !== p.round.s, 'C: a picked ruler lands at the table edge, not at the strip');
})();

/* ---------- D. the cutter ---------- */
for (let s = -2; s <= 6; s++) for (let e = s + 1; e <= s + 12; e++) for (let Z = s - 3; Z <= s + 4; Z++) for (const len of [5, 9, 12]) {
  const st = { round: { kind: 'align', s, e }, zero: Z, len };
  const a = C.snip(st), b = ownSnip(s, e, Z, len);
  ok(a.pieces === b.pieces && a.stub === b.stub && a.air === b.air && a.tail === b.tail, 'D: snip ' + [s, e, Z, len].join(','));
}
(() => {
  const st = C.newState('tricky', 0); [2, 3, 4, 9].forEach((k) => C.stitch(st, k));
  const c = C.snip(st);
  ok(c.pieces === 3 && c.air === 1 && c.gaps === 3, 'D: a broken ruler cuts only the stitched spaces (3 pieces, 1 air, 3 left whole) — the jar never shows the true length for free');
})();

/* ---------- E. check against the own oracle ---------- */
A1.concat(A2.filter((r) => r.kind !== 'broken')).forEach((r) => {
  const lens = r.rack ? r.rack : [r.len];
  lens.forEach((len, li) => {
    for (let Z = C.windowLeft(r); Z < C.windowLeft(r) + C.WIN; Z++) for (let m = 0; m <= len; m++) {
      const st = C.newState(r.level, r.k); if (r.rack) C.pick(st, li); else st.len = len;
      st.zero = Z; C.read(st, m); st.reading = m;
      const x = C.check(st), want = ownVerdict(r.s, r.e, Z, len, m);
      ok(want === 'ok' ? x.result === 'ok' && st.done : x.result === 'miss' && st.verdict.kind === want, 'E: ' + r.level + r.k + ' ruler ' + len + ' 0 at ' + Z + ' reads ' + m + ' → ' + want);
    }
  });
});
A2.filter((r) => r.kind === 'broken').forEach((r) => {
  const want = []; for (let k = r.s; k < r.e; k++) want.push(k);
  const st = C.newState('tricky', r.k); want.forEach((k) => C.stitch(st, k));
  ok(C.check(st).result === 'ok', 'E: broken ' + r.k + ': stitching exactly the strip\'s spaces solves it');
  const s2 = C.newState('tricky', r.k); want.concat([r.e]).forEach((k) => C.stitch(s2, k)); C.check(s2);
  ok(s2.verdict && s2.verdict.kind === 'miscount' && s2.verdict.extra === 1, 'E: broken ' + r.k + ': one stitch past the end is a miscount');
  const s3 = C.newState('tricky', r.k); want.slice(1).forEach((k) => C.stitch(s3, k)); C.check(s3);
  ok(s3.verdict && s3.verdict.missing === 1, 'E: broken ' + r.k + ': a missing stitch is a miscount');
  ok(C.check(C.newState('tricky', r.k)).key === 'hintStitch', 'E: broken ' + r.k + ': no stitches is a note');
});
ok(C.check(C.newState('align', 0)).key === 'hintRead', 'E: no reading is a note');

/* ---------- F. the bots ---------- */
const solve = (r, Z, m) => { const st = C.newState(r.level, r.k); st.zero = Z; st.reading = m; return C.check(st).result === 'ok'; };
const readNoFix = A1.filter((r) => solve(r, r.z, Math.min(12, r.e - r.z))).length;
ok(readNoFix === 0, 'F: "read without fixing the 0" wins ' + readNoFix + '/9');
const edge = A1.filter((r) => { const w0 = C.windowLeft(r); return solve(r, w0, Math.min(12, r.e - w0)); }).length;
ok(edge === 0, 'F: "push the ruler to the table edge" wins ' + edge + '/9');
const brokenEnd = A2.filter((r) => r.kind === 'broken').filter((r) => { const st = C.newState('tricky', r.k); for (let k = r.b; k < r.b + r.e; k++) C.stitch(st, k); return C.check(st).result === 'ok'; }).length;
ok(brokenEnd === 0, 'F: "count to the end number from the broken end" wins ' + brokenEnd + '/3');
const startAt1 = A1.filter((r) => solve(r, r.s - 1, r.e - r.s + 1)).length;
ok(startAt1 === 0, 'F: "start at the 1" wins ' + startAt1 + '/9');
const picks = A2.filter((r) => r.kind === 'pick' || r.rack);
const longest = picks.filter((r) => { const i = r.rack.indexOf(Math.max(...r.rack)); const st = C.newState('tricky', r.k); C.pick(st, i); st.zero = r.s; st.reading = r.e - r.s; return C.check(st).result === 'ok'; }).length;
ok(longest === picks.length, 'F: "take the longest ruler" is a correct strategy (' + longest + '/' + picks.length + '); the reading is what is graded');

/* ---------- G. misses and hints ---------- */
(() => {
  const st = C.newState('align', 0);   /* ribbon 0 → 7, 0 left at 3 */
  C.read(st, 4); C.check(st);
  ok(st.misses === 1 && !st.help && C.hint(st) === 'hintStub' && st.cut.stub === 3 && st.cut.pieces === 4, 'G: 0 inside → a 3-cm stub, 4 pieces, hintStub');
  C.slide(st, 2); ok(st.verdict === null && st.cut === null, 'G: a move takes the cut and the verdict away');
  C.check(st); ok(st.help && C.hint(st) === 'hintPin', 'G: miss 2 → hintPin');
  C.slide(st, 0); C.read(st, 7); ok(C.check(st).result === 'ok' && st.done, 'G: the right placement still wins after help');
  ok(C.check(st).result === 'no', 'G: a finished round is locked');
  const b = C.newState('align', 3); C.read(b, 11); C.check(b); ok(C.hint(b) === 'hintAir' && b.cut.air === 2, 'G: 0 before the strip → 2 air snips, hintAir');
  const m = C.newState('align', 1); C.slide(m, 0); C.read(m, 6); C.check(m); ok(C.hint(m) === 'hintJar' && m.cut.pieces === 5, 'G: aligned but misread → hintJar with the jar\'s count'); C.check(m); ok(C.hint(m) === 'hintEnd', 'G: … then hintEnd');
  const s = C.newState('tricky', 4); C.read(s, 9); C.check(s); ok(C.hint(s) === 'hintShort' && s.cut.tail === 1, 'G: Tildy\'s 9-cm ruler → a 1-cm tail, hintShort'); C.check(s); ok(C.hint(s) === 'hintLonger', 'G: … then hintLonger');
  const bb = C.newState('tricky', 0); C.stitch(bb, 2); C.stitch(bb, 9); C.check(bb); ok(C.hint(bb) === 'hintStitchPast', 'G: a stitch off the strip → hintStitchPast');
  const bm = C.newState('tricky', 0); C.stitch(bm, 2); C.check(bm); ok(C.hint(bm) === 'hintStitchMissing', 'G: too few stitches → hintStitchMissing'); C.check(bm); ok(C.hint(bm) === 'hintCount', 'G: … then hintCount');
  ok(C.taskKey(A2[0]) === 'tBroken' && C.taskKey(A2[3]) === 'tFix' && C.taskKey(A2[5]) === 'tPick' && C.taskKey(A1[0]) === 'oP_ribbon', 'G: the task line follows the round');
  ok(C.okKey(A2[0]) === 'okBroken' && C.okKey(A1[4]) === 'ok_denim', 'G: the success line follows the round');
})();

/* ---------- H. no alignment lamp ---------- */
(() => {
  const near = C.newState('align', 0), far = C.newState('align', 0);
  C.slide(near, 0); C.slide(far, 5);
  const keysOf = (o) => Object.keys(o).sort().join();
  ok(keysOf(near) === keysOf(far) && !keysOf(near).match(/align|dist|close|near|ok\b/), 'H: the state has no aligned / distance field (' + keysOf(near) + ')');
  const strip = (o) => JSON.stringify(Object.assign({}, o, { zero: 0 }));
  ok(strip(near) === strip(far), 'H: aligned and misaligned states differ only in where the 0 is, until Check');
  ok(near.verdict === null && near.cut === null && far.verdict === null, 'H: no verdict before Check');
})();

/* ---------- I. the plan ---------- */
(() => {
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (const L of ['align', 'tricky']) {
    let prev = null, same = 0;
    for (let p = 0; p < 300; p++) { const o = C.plan(L, p, rnd, prev).order; ok(o.slice().sort((x, y) => x - y).join() === C.rounds(L).map((r) => r.k).join(), 'I: ' + L + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; prev = o; }
    ok(same === 0, 'I: ' + L + ' never repeats the previous order');
    /* the same random stream twice: only the never-repeat guard can make the second order differ */
    const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
    for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(L, 0, stream(sd), null).order, o2 = C.plan(L, 0, stream(sd), o1).order; ok(o1.join() !== o2.join(), 'I: ' + L + ' replayed stream ' + sd + ' gives a new order'); }
  }
  const pos = [0, 0, 0]; let n = 0;
  for (let p = 0; p < 30; p++) { const P = C.plan('tricky', p, rnd, null); A2.filter((r) => r.rack).forEach((r) => { const rk = P.racks[r.k]; ok(rk.slice().sort((a, b) => a - b).join() === r.rack.slice().sort((a, b) => a - b).join(), 'I: the rack is its rulers reshuffled'); const want = rk.findIndex((L) => L >= r.e - r.s && rk.filter((x) => x >= r.e - r.s).length === 1); pos[want]++; n++; }); }
  pos.forEach((c, i) => ok(c / n >= 0.2 && c / n <= 0.47, 'I: the long-enough ruler sits in position ' + (i + 1) + ' in ' + Math.round(100 * c / n) + '% of racks (20–47 %)'));
  const st = C.newState('tricky', 5, [12, 6, 9]); ok(st.rack.join() === '12,6,9', 'I: a round takes its rack order from the plan');
})();

/* ---------- J. geometry ---------- */
for (const [vw, W] of [[704, 647], [360, 328], [320, 288]]) {
  const g = C.geo(W);
  ok(g.pad >= 8 && g.pad + C.WIN * g.ppc <= W - 8, 'J: @' + vw + ' the 16-cm window fits with room for its numerals (' + g.ppc + ' px/cm)');
  ok(15 * g.ppc <= C.WIN * g.ppc, 'J: @' + vw + ' the 15-cm ruler fits the window');
  ok(g.ppc >= 16, 'J: @' + vw + ' a centimetre is at least 16 px');
}
ok(fs.existsSync(path.join(ROOT, 'image-library-webp', 'themes', 'occupations', 'tailor@2x.webp')) && fs.existsSync(path.join(ROOT, 'image-library-webp', 'themes', 'pets', 'cat@2x.webp')), 'J: Tildy and the cat are library pictures on disk');

/* ---------- K. strings ×11 and reachability ---------- */
const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
const sandbox = {}; new Function('window', 'document', 'CmCutterCore', SRC.replace(/injectCmCutterCSS\(\);/, '') + ';window.X=CmCutterActivity;')(sandbox, undefined, C);
const STR = sandbox.X.strings;
ok(keys.length >= 45, 'K: the strings block parsed (' + keys.length + ' keys)');
const body = SRC.replace(strBlock, '') + CORE;
keys.forEach((k) => {
  LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'K: ' + k + '.' + l + ' authored'));
  const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
  LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'K: ' + k + '.' + l + ' keeps the placeholders of en'));
  const built = /^oP_/.test(k) && body.includes("'oP_' + r.strip") || /^ok_/.test(k) && body.includes("'ok_' + r.strip");
  ok(body.includes("'" + k + "'") || built || ['title', 'instruction'].includes(k), 'K: ' + k + ' is reached by the code');
});
C.STRIPS.forEach((s) => ok(keys.includes('oP_' + s) && keys.includes('ok_' + s), 'K: ' + s + ' has its task line and its success line'));
ok(A1.concat(A2).every((r) => C.STRIPS.includes(r.strip)), 'K: every round\'s strip is named');
LOCALES.forEach((l) => C.STRIPS.forEach((s) => ok((STR['ok_' + s][l].match(/\{n\}/g) || []).length === 3, 'K: ' + l + ' ok_' + s + ' names the end, the length and the pieces')));
ok(LOCALES.every((l) => STR.tFix[l].includes('{m}') && STR.hintJar[l].includes('{n}')), 'K: Tildy\'s reading and the jar count reach their sentences');
ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'K: every fr string uses U+202F before ? : ! ; and inside « »');
ok(!/\b(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)\b/i.test(strBlock), 'K: no "free" in the activity text');
ok(!/\b(inch|inches|zoll|pouce|pulgada|polegada|pollice|duim|tum|tomme|tuuma)\w*/i.test(strBlock), 'K: no inch anywhere — centimeters only');
ok(['fr'].every((l) => keys.every((k) => !/Tildy/.test(STR[k][l]))), 'K: fr carries no tailor name (its page names none)');
ok(keys.every((k) => !/Tildy/.test(STR[k].nl)) && STR.tFix.nl.includes('Fien'), 'K: nl calls her Fien, as its page does');

/* ---------- the drawing rules (the activity file) ---------- */
const ACT_BODY = SRC.replace(strBlock, '');
ok(!/st\.zero\s*===\s*r\.s|r\.s\s*===\s*st\.zero|st\.zero\s*==\s*r\.s/.test(ACT_BODY), 'K: no alignment lamp — the drawing never compares the 0 with the strip\'s start');
ok(/if \(cut && cut\.stub\)/.test(ACT_BODY) && /if \(cut && cut\.tail\)/.test(ACT_BODY), 'K: the stub and the tail are drawn after a snip');
ok(/var n = Math\.round\(t - st\.zero\);/.test(ACT_BODY), 'K: a tapped numeral is read off the ruler (it moves with the ruler), never off the table');
ok(/r\.result === 'note'\) \{ v\.note = this\._t\(r\.key\)/.test(ACT_BODY) && /CmCutterCore\.hint\(st\)|C\.hint\(st\)/.test(ACT_BODY), 'K: notes and hints reach the screen');
ok(/if \(!this\._orders\.some/.test(ACT_BODY), 'K: a win hangs the strip on the order rack');

/* ---------- L. the manifest row ---------- */
const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
const row = list.find((x) => x.id === 'tildy.measure-ruler.2-md-a-1');
ok(row && row.tool === 'cm-cutter-activity' && row.task_template === 'cm-cutter', 'L: the row points at the cm cutter');
ok(row && row.alignment.code === '2.MD.A.1', 'L: the alignment stays');
ok(row && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'L: the row ships in all 11 locales (slug, title, intro)');
ok(row && new Set(Object.values(row.slug)).size === 11, 'L: 11 different slugs');

console.log(`verify-cm-cutter-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
