#!/usr/bin/env node
/* =====================================================================
   verify-glow-ruler-core.js — the gate for ACTIVITY #152, The Glow Ruler
   (2.MD.A.1). The gate keeps its OWN oracle: the rounds and the real-size
   ranges are written here, the pictures' ink boxes are measured here from
   the real pixels (sharp, alpha > 40), and the registration, the reading
   and the verdict are worked out here — never read off the tool.
   A the rounds (the design's tables, real sizes, level 2 never a multiple
   of 5) · B ink boxes from pixels + the lie-flat rotation · C registration
   and the picture floors at 704 / 360 / 320 · D printed numbers, snap,
   spaces · E check · F misses, help, free play · G hints · H the plan ·
   I strings ×11 and reachability · J the activity's drawing rules ·
   K the manifest row.
   GR_CORE / GR_ACT / GR_MANIFEST let mutate-glow-ruler.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.GR_CORE || path.join(ROOT, 'mini tools', 'glow-ruler-core.js');
const ACT_PATH = process.env.GR_ACT || path.join(ROOT, 'mini tools', 'glow-ruler-activity.js');
const MAN_PATH = process.env.GR_MANIFEST || path.join(ROOT, 'mini tools', 'choice-board-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables ---------- */
const OWN = {
  every: [['snail', 4], ['seashell', 5], ['car', 6], ['lemon', 7], ['key', 8], ['centipede', 9], ['glue', 11], ['popsicle', 13]],
  fives: [['seashell', 4], ['kiwi', 6], ['train', 7], ['centipede', 8], ['airplane', 9], ['popsicle', 11], ['popsicle', 12], ['glue', 13]]
};
/* how long the real thing believably is, in cm (the critic's real-size rule) */
const REAL = { snail: [3, 5], seashell: [4, 7], car: [6, 8], lemon: [7, 9], key: [6, 8], centipede: [3, 10], glue: [9, 13], popsicle: [11, 14], kiwi: [5, 7], train: [6, 10], airplane: [8, 15] };
const THEME = { snail: 'spring', seashell: 'beach', car: 'toys', lemon: 'fruits', key: 'around the house', centipede: 'insects and bugs', glue: 'classroom', popsicle: 'desserts and sweets', kiwi: 'fruits', train: 'toys', airplane: 'toys' };
const UPRIGHT = ['key', 'glue', 'popsicle'];   /* drawn standing: turned 90° clockwise to lie flat */
/* the stage widths the shell gives at the viewports the floors are judged at (measured in the browser) */
const STAGE = { 704: 647, 360: 328, 320: 288 };

(async () => {
  /* ---------- A. the rounds ---------- */
  for (const L of ['every', 'fives']) {
    const R = C.rounds(L);
    ok(R.map((r) => r.obj + r.len).join() === OWN[L].map((x) => x[0] + x[1]).join(), 'A: ' + L + ': the design\'s eight rounds (' + R.map((r) => r.obj + r.len).join() + ')');
    ok(R.length >= 7, 'A: ' + L + ': at least seven rounds');
    R.forEach((r) => ok(r.len >= REAL[r.obj][0] && r.len <= REAL[r.obj][1], 'A: ' + L + ' ' + r.obj + ' at ' + r.len + ' cm is a believable real length (' + REAL[r.obj].join('–') + ')'));
    R.forEach((r) => ok(r.theme === THEME[r.obj] && r.rot === (UPRIGHT.includes(r.obj) ? 90 : 0), 'A: ' + L + ' ' + r.obj + ' comes from ' + THEME[r.obj] + (UPRIGHT.includes(r.obj) ? ', turned to lie flat' : '')));
    ok(new Set(R.map((r) => r.len)).size === R.length, 'A: ' + L + ': every length differs (the end is never in the same place twice)');
    ok(R.every((r) => r.len >= 1 && r.len <= 15), 'A: ' + L + ': every end is on the 15-cm ruler and never 0');
    const per = {}; R.forEach((r) => { per[r.obj] = (per[r.obj] || 0) + 1; });
    ok(Object.values(per).every((n) => n <= 2), 'A: ' + L + ': a picture appears at most twice');
  }
  ok(C.rounds('fives').every((r) => r.len % 5 !== 0), 'A: level 2 never ends on a printed number (every reading counts on)');
  const e = C.rounds('every'), f = C.rounds('fives');
  ok(!e.some((a) => f.some((b) => a.obj === b.obj && a.len === b.len)), 'A: no picture at the same length in both levels (a remembered size never answers)');
  ok(new Set(e.map((r) => r.len)).size >= 7 && Math.max(...e.map((r) => r.len)) - Math.min(...e.map((r) => r.len)) >= 8, 'A: the ends spread across the ruler');

  /* ---------- B. the ink boxes, measured from the pixels ---------- */
  const sharp = require('sharp'), INK = {};
  for (const obj of Object.keys(REAL)) {
    const file = path.join(ROOT, 'image-library-webp', 'themes', THEME[obj], obj + '@2x.webp');
    const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 40) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    const W = info.width, H = info.height, b = [(x1 - x0 + 1) / W, x0 / W, (y1 - y0 + 1) / H, y0 / H];
    INK[obj] = b;
    ok(C.PICS[obj] && C.PICS[obj].ink.every((v, i) => Math.abs(v - b[i]) < 0.003), 'B: ' + obj + ': the stored ink box matches the pixels (' + b.map((v) => v.toFixed(3)).join(',') + ')');
    ok(C.PICS[obj] && C.PICS[obj].rot === (UPRIGHT.includes(obj) ? 90 : 0), 'B: ' + obj + ' ' + (UPRIGHT.includes(obj) ? 'stands, so it is turned' : 'lies as drawn'));
    /* the gate's own lie-flat box: 90° clockwise maps (x, y) → (1 − y, x) */
    const own = UPRIGHT.includes(obj) ? { w: b[2], x: 1 - b[3] - b[2], h: b[0], y: b[1] } : { w: b[0], x: b[1], h: b[2], y: b[3] };
    const got = C.inkFlat(obj);
    ok(['w', 'x', 'h', 'y'].every((k) => Math.abs(own[k] - got[k]) < 0.003), 'B: ' + obj + ': the flat ink box is the turned box');
    ok(own.w > own.h, 'B: ' + obj + ' lies longer than it is thick once flat');
  }

  /* ---------- C. registration and the picture floors ---------- */
  for (const [vw, W] of Object.entries(STAGE)) {
    const g = C.geo(W);
    ok(g.x0 >= 10 && g.x0 + 15 * g.ppc <= W - 10, 'C: @' + vw + ' the whole ruler 0–15 fits the stage with room for its numerals');
    ok(g.ppc <= 40 && g.ppc >= 17, 'C: @' + vw + ' a centimeter is ' + g.ppc + ' px');
    for (const L of ['every', 'fives']) for (const r of C.rounds(L)) {
      const b = INK[r.obj], p = C.place(r.obj, r.len, g.ppc, g.x0, 200);
      /* where the ink really lands, from the square box the tool places */
      const inkL = UPRIGHT.includes(r.obj) ? p.left + (1 - b[3] - b[2]) * p.S : p.left + b[1] * p.S;
      const inkR = UPRIGHT.includes(r.obj) ? p.left + (1 - b[3]) * p.S : p.left + (b[1] + b[0]) * p.S;
      const inkB = UPRIGHT.includes(r.obj) ? p.top + (b[1] + b[0]) * p.S : p.top + (b[3] + b[2]) * p.S;
      const thick = (UPRIGHT.includes(r.obj) ? b[0] : b[2]) * p.S;
      const tick0 = g.x0, tickN = g.x0 + r.len * g.ppc;
      ok(Math.abs(inkL - tick0) < 0.5 && Math.abs(inkR - tickN) < 0.5, 'C: @' + vw + ' ' + L + ' ' + r.obj + ': ink from tick 0 to tick ' + r.len + ' (' + (inkL - tick0).toFixed(2) + ', ' + (inkR - tickN).toFixed(2) + ')');
      ok(Math.abs(inkB - 200) < 0.5, 'C: @' + vw + ' ' + L + ' ' + r.obj + ' lies on the ruler');
      const floor = +vw >= 700 ? 96 : 64;
      ok(thick >= floor, 'C: @' + vw + ' ' + L + ' ' + r.obj + ' is ' + thick.toFixed(1) + ' px thick (≥ ' + floor + ')');
      if (+vw >= 700) ok(thick <= 210, 'C: @704 ' + L + ' ' + r.obj + ' is ≤ 210 px thick (' + thick.toFixed(1) + ')');
    }
  }

  /* ---------- D. printed numbers, snap, spaces ---------- */
  ok(C.printed('every').join() === '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15', 'D: level 1 prints every centimeter');
  ok(C.printed('fives').join() === '0,5,10,15', 'D: level 2 prints only 0, 5, 10, 15');
  for (let n = 1; n <= 15; n++) ok(C.nearestPrinted(n, 'fives') === Math.floor(n / 5) * 5 && C.nearestPrinted(n, 'every') === n, 'D: the printed number at or below ' + n);
  for (let i = 0; i < 2000; i++) {
    const ppc = 17 + (i % 24), x0 = 10 + (i % 7), px = -30 + (i * 37) % (ppc * 17 + 60);
    const own = Math.max(0, Math.min(15, Math.round((px - x0) / ppc)));
    ok(C.snap(px, x0, ppc) === own, 'D: snap ' + px + ' (x0 ' + x0 + ', ' + ppc + ' px/cm) → ' + own);
  }
  for (let n = 0; n <= 15; n++) {
    const s = C.spaces(n);
    ok(s.length === n && s.every((x, i) => x.count === i + 1 && x.from === i && x.to === i + 1), 'D: the light for ' + n + ' fills ' + n + ' spaces, the first counted 1 between tick 0 and tick 1');
  }

  /* ---------- E. check ---------- */
  for (const L of ['every', 'fives']) for (const r of C.rounds(L)) for (let m = 0; m <= 15; m++) {
    const st = C.newState(L, r.k);
    ok(st.marker === 0 && st.lit === 0 && !st.done, 'E: ' + L + ' ' + r.obj + ': the marker starts parked at 0');
    C.setMarker(st, m); const x = C.check(st);
    const want = m === 0 ? 'note' : m === r.len ? 'ok' : m > r.len ? 'over' : 'under';
    if (want === 'note') ok(x.result === 'note' && x.key === 'hintStart' && st.misses === 0 && st.lit === 0, 'E: ' + L + ' ' + r.obj + ' marker 0 → a note, no miss');
    else if (want === 'ok') ok(x.result === 'ok' && st.done && st.lit === r.len, 'E: ' + L + ' ' + r.obj + ' marker ' + m + ' → solved');
    else ok(x.result === 'miss' && st.verdict.kind === want && st.verdict.by === Math.abs(m - r.len) && st.lit === m && !st.done, 'E: ' + L + ' ' + r.obj + ' marker ' + m + ' → ' + want + ' by ' + Math.abs(m - r.len));
  }
  ok(!C.setMarker(C.newState('every', 0), 0), 'E: a move to the same tick is no move');
  (() => { const st = C.newState('every', 0); C.setMarker(st, 22); ok(st.marker === 15, 'E: the marker stops at 15'); C.setMarker(st, -3); ok(st.marker === 0, 'E: and at 0'); })();

  /* ---------- F. misses, help, free play ---------- */
  (() => {
    const st = C.newState('every', 2);   /* the toy car, 6 cm */
    C.setMarker(st, 7); C.check(st); ok(st.misses === 1 && !st.help && st.lit === 7, 'F: miss 1, no help, the light ran to 7');
    C.setMarker(st, 5); ok(st.verdict === null && st.lit === 0, 'F: a new move takes the light and the verdict away');
    C.check(st); ok(st.misses === 2 && st.help && st.verdict.kind === 'under', 'F: miss 2 brings help');
    C.setMarker(st, 6); ok(C.check(st).result === 'ok' && st.done, 'F: the right end still wins after help');
    ok(C.check(st).result === 'no', 'F: a finished round does not check again');
    C.setMarker(st, 9); ok(st.done && st.lit === 9 && st.verdict === null, 'F: after the win the light follows the marker (free play, never graded)');
  })();

  /* ---------- G. hints ---------- */
  (() => {
    const h = (L, k, m, n) => { const st = C.newState(L, k); C.setMarker(st, m); for (let i = 0; i < (n || 1); i++) C.check(st); return C.hint(st); };
    ok(h('every', 3, 8) === 'hintOver', 'G: too far → hintOver');
    ok(h('every', 3, 6) === 'hintUnder', 'G: too short → hintUnder');
    ok(h('every', 3, 8, 2) === 'hintDrop1', 'G: miss 2 at level 1 → hintDrop1');
    ok(h('fives', 6, 10, 2) === 'hintDrop5', 'G: miss 2 at level 2 → hintDrop5');
    ok(h('fives', 0, 6, 2) === 'hintDrop0', 'G: miss 2 at level 2 below 5 → hintDrop0 (count from 0, nothing to count on from)');
    ok(C.hint(C.newState('every', 0)) === null, 'G: no verdict, no hint');
  })();

  /* ---------- H. the plan ---------- */
  (() => {
    let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (const L of ['every', 'fives']) {
      let prev = null, same = 0;
      for (let p = 0; p < 300; p++) { const o = C.plan(L, p, rnd, prev).order; ok(o.slice().sort((x, y) => x - y).join() === C.rounds(L).map((r) => r.k).join(), 'H: ' + L + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; prev = o; }
      ok(same === 0, 'H: ' + L + ' never repeats the previous order');
      const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
      for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(L, 0, stream(sd), null).order, o2 = C.plan(L, 0, stream(sd), o1).order; ok(o1.join() !== o2.join(), 'H: ' + L + ' replayed stream ' + sd + ' gives a new order'); }
    }
  })();

  /* ---------- I. strings ×11 and reachability ---------- */
  const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
  const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
  const sandbox = {}; new Function('window', 'document', 'GlowRulerCore', SRC.replace(/injectGlowRulerCSS\(\);/, '') + ';window.X=GlowRulerActivity;')(sandbox, undefined, C);
  const STR = sandbox.X.strings;
  ok(keys.length >= 40, 'I: the strings block parsed (' + keys.length + ' keys)');
  const ACT_BODY = SRC.replace(strBlock, ''), body = ACT_BODY + CORE;
  keys.forEach((k) => {
    LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'I: ' + k + '.' + l + ' authored'));
    const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
    LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'I: ' + k + '.' + l + ' keeps the placeholders of en'));
    const built = /^oA_/.test(k) && body.includes("this._t('oA_' + this.st.round.obj)") || /^ok_/.test(k) && body.includes("this._t('ok_' + r.obj");
    ok(body.includes("'" + k + "'") || built || ['title', 'instruction'].includes(k), 'I: ' + k + ' is reached by the code');
  });
  Object.keys(REAL).forEach((o) => ok(keys.includes('oA_' + o) && keys.includes('ok_' + o), 'I: ' + o + ' has its name and its success sentence'));
  LOCALES.forEach((l) => Object.keys(REAL).forEach((o) => ok((STR['ok_' + o][l].match(/\{n\}/g) || []).length >= 2 && /\b0\b/.test(STR['ok_' + o][l]), 'I: ' + l + ' ok_' + o + ' says it starts at 0 and names the end and the length')));
  ok(['hintStart', 'hintUnder'].every((k) => LOCALES.every((l) => STR[k][l].includes('{o}'))) && LOCALES.every((l) => STR.hintDrop5[l].includes('{m}')), 'I: the hints carry the object and the count-on number');
  ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'I: every fr string uses U+202F before ? : ! ; and inside « »');
  ok(!/\b(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)\b/i.test(strBlock), 'I: no "free" in the activity text');
  ok(!/\b(inch|inches|zoll|pouce|pulgada|polegada|pollice|duim|tum|tomme|tuuma)\w*/i.test(strBlock), 'I: no inch anywhere — centimeters only');

  /* ---------- J. the drawing rules (the light counts SPACES; the answer is never drawn before it is earned) ---------- */
  ok(/x="' \+ \(\(x\(s\.from\) \+ x\(s\.to\)\) \/ 2\)/.test(ACT_BODY), 'J: each count is drawn in the middle of its space, never on a tick');
  ok(/GlowRulerCore\.place\(r\.obj, r\.len, g\.ppc, g\.x0, g\.top\)/.test(ACT_BODY) && /C\.inkFlat\(r\.obj\)/.test(ACT_BODY), 'J: the picture is placed by its measured ink box');
  ok(/g\.x\(r\.len\) - 1\.5/.test(ACT_BODY) && /if \(st\.help && !st\.done\)/.test(ACT_BODY), 'J: the drop line falls from the end, and only at help');
  ok(/for \(var c = m \+ 1; c <= r\.len; c\+\+\)/.test(ACT_BODY), 'J: the count-on numerals start after the printed number');
  ok(/if \(st\.done && v\.win\)/.test(ACT_BODY), 'J: the length tag appears only after the win');
  ok(/r\.result === 'note'\) \{ v\.note = this\._t\(r\.key/.test(ACT_BODY) && /C\.hint\(st\)/.test(ACT_BODY), 'J: notes and hints reach the screen');
  ok(/if \(!this\._shelf\.some/.test(ACT_BODY) && /_success: function/.test(ACT_BODY), 'J: a win puts the object on the shelf');

  /* ---------- K. the manifest row ---------- */
  const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
  const row = list.find((x) => x.id === 'choice-board.read-ruler.2-md-a-1');
  ok(row && row.tool === 'glow-ruler-activity' && row.task_template === 'glow-ruler', 'K: the row points at the glow ruler');
  ok(row && row.alignment.code === '2.MD.A.1' && Object.keys(row.slug).length === 11, 'K: the alignment and 11 slugs stay');

  console.log(`verify-glow-ruler-core: ${pass} pass, ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
