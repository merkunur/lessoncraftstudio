#!/usr/bin/env node
/* =====================================================================
   verify-snip-tape-core.js — the gate for ACTIVITY #155, The Snip-Out
   Tape (2.MD.A.4). The gate keeps its OWN oracle: the design's round
   tables are written here, the ink boxes are re-measured here from the
   real pixels (sharp), every gap is recomputed, and every bot is played
   here — never read off the tool.
   A the rounds (gaps, never a length, balance, loose starts) · B the
   pictures (theme, colour, allow-list, exact turns, ink from pixels) ·
   C one scale: size on the board, fits the stage (measured stage widths)
   · D check exhaustively against the own oracle (clips × typed) · E loose
   starts · F the bots · G the plan · H strings ×11 and reachability ·
   I drawing rules · J the manifest row.
   ST_CORE / ST_ACT / ST_MANIFEST let mutate-snip-tape.js aim it at a
   mutated copy.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const CORE_PATH = process.env.ST_CORE || path.join(ROOT, 'mini tools', 'snip-tape-core.js');
const ACT_PATH = process.env.ST_ACT || path.join(ROOT, 'mini tools', 'snip-tape-activity.js');
const MAN_PATH = process.env.ST_MANIFEST || path.join(ROOT, 'mini tools', 'span-length-gap-activities.json');
const C = require(CORE_PATH);
const SRC = fs.readFileSync(ACT_PATH, 'utf8'), CORE = fs.readFileSync(CORE_PATH, 'utf8');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 60) console.error('  FAIL ' + m); } };

/* ---------- the gate's own tables (design §6) ---------- */
const OWN = {
  12: [['caterpillar', 5, 'centipede', 7], ['key', 7, 'glue', 10], ['airplane', 11, 'car', 6], ['snail', 4, 'goldfish', 5], ['pinecone', 9, 'grasshopper', 5], ['stapler', 12, 'frog', 7], ['wand', 10, 'truck', 6], ['train', 5, 'spoon', 12], ['lizard', 7, 'fish', 8]],
  20: [['corn', 18, 'brush', 16], ['stapler', 15, 'pinecone', 10], ['spoon', 16, 'caterpillar', 6], ['goldfish', 6, 'parsnip', 17], ['centipede', 9, 'wand', 16], ['grasshopper', 7, 'lizard', 9], ['frog', 8, 'truck', 12], ['airplane', 14, 'fish', 10], ['car', 9, 'glue', 12]]
};
/* the believable REAL length of each thing in cm (toys at toy sizes): every round length must sit inside it (review 2026-10-29) */
const REAL = { caterpillar: [3, 7], centipede: [5, 10], key: [5, 8], glue: [8, 14], airplane: [6, 20], car: [5, 12], snail: [3, 6], goldfish: [4, 8], pinecone: [6, 12], grasshopper: [4, 8], stapler: [10, 18], frog: [5, 10],
  wand: [10, 30], truck: [5, 15], train: [5, 15], spoon: [11, 20], lizard: [6, 12], fish: [5, 12], corn: [15, 22], brush: [15, 25], parsnip: [15, 25] };
const THEME = { caterpillar: 'insects and bugs', centipede: 'insects and bugs', snail: 'insects and bugs', key: 'around the house', brush: 'around the house', glue: 'classroom', stapler: 'classroom', airplane: 'toys', car: 'toys', train: 'toys', truck: 'toys',
  goldfish: 'pets', fish: 'pets', pinecone: 'miscellaneous', grasshopper: 'forest creatures', lizard: 'forest creatures', frog: 'camping', wand: 'accessories', spoon: 'kitchen tools', corn: 'vegetables', parsnip: 'vegetables' };
const UPRIGHT = ['key', 'glue', 'pinecone', 'spoon', 'corn', 'brush', 'wand', 'parsnip'];   /* drawn standing: laid down by exactly 90° */
/* the stage widths measured in the browser at 704/768/1024, 360 and 320 (scripts/local-test-snip-tape.js re-measures them) and the floors for the picture's short side */
const STAGES = [[647, 96], [656, 96], [328, 50], [288, 44]];

(async () => {
  /* ---------- A. the rounds ---------- */
  for (const L of ['12', '20']) {
    const R = C.rounds(L), own = OWN[L];
    ok(R.length === own.length && R.length >= 7, 'A: ruler ' + L + ' has the design\'s ' + own.length + ' rounds (≥ 7)');
    ok(R.map((r) => [r.a.obj, r.a.len, r.b.obj, r.b.len].join()).join('|') === own.map((x) => x.join()).join('|'), 'A: ruler ' + L + ' rounds are the design table');
    ok(R.every((r) => r.max === +L), 'A: ruler ' + L + ' goes to ' + L);
    R.forEach((r, i) => {
      const g = Math.abs(own[i][1] - own[i][3]);
      ok(r.gap === g && g >= 1, 'A: ' + L + '/' + i + ' gap is ' + g + ' (never 0)');
      ok(g !== own[i][1] && g !== own[i][3], 'A: ' + L + '/' + i + ' the gap never equals either length');
      ok(own[i][1] + own[i][3] > +L + 1 || own[i][1] + own[i][3] !== g, 'A: ' + L + '/' + i + ' the sum is never the gap');
      ok(r.a.len <= +L && r.b.len <= +L && r.a.len >= 1 && r.b.len >= 1, 'A: ' + L + '/' + i + ' both things fit the ruler');
      ok(r.longer === (own[i][1] > own[i][3] ? 'a' : 'b'), 'A: ' + L + '/' + i + ' the longer one is known');
      for (const t of [r.a, r.b]) ok(REAL[t.obj] && t.len >= REAL[t.obj][0] && t.len <= REAL[t.obj][1], 'A: ' + L + '/' + i + ' ' + t.obj + ' ' + t.len + ' cm is a believable real length');
      /* loose starts */
      const sa = r.a.loose, sb = r.b.loose;
      ok([1, 2, 3].includes(sa) && [1, 2, 3].includes(sb) && sa !== sb, 'A: ' + L + '/' + i + ' loose starts are 1–3 and never equal (' + sa + ',' + sb + ')');
      ok(sa + r.a.len <= +L + 1 && sb + r.b.len <= +L + 1, 'A: ' + L + '/' + i + ' a loose thing never runs past the tape');
    });
    const top = R.filter((r) => r.longer === 'a').length;
    ok(top / R.length >= 0.4 && top / R.length <= 0.6, 'A: ruler ' + L + ': the longer one is on top in ' + top + '/' + R.length);
    const smallStart = R.filter((r) => r[r.longer].loose < r[r.longer === 'a' ? 'b' : 'a'].loose).length;
    ok(smallStart >= 4 && smallStart <= 5, 'A: ruler ' + L + ': in loose starts the longer one starts nearer the wall in ' + smallStart + '/9 (never always)');
    ok(new Set(R.map((r) => r.gap)).size >= 5, 'A: ruler ' + L + ' gaps vary');
    const lenOf = {}; R.forEach((r) => [r.a, r.b].forEach((t) => { (lenOf[t.obj] = lenOf[t.obj] || new Set()).add(t.len); }));
    ok(Object.values(lenOf).every((x) => x.size === 1), 'A: ruler ' + L + ': each picture has ONE length in the set');
  }

  /* ---------- B. the pictures ---------- */
  const sharp = require('sharp');
  const used = new Set([].concat(...Object.values(OWN).map((T) => T.map((x) => [x[0], x[2]]))).flat());
  ok([...used].every((o) => THEME[o]), 'B: every noun is on the allow-list');
  ok(Object.keys(C.PICS).sort().join() === [...used].sort().join(), 'B: the core carries exactly the pictures the rounds use');
  for (const obj of used) {
    const th = THEME[obj], p = C.PICS[obj];
    ok(p && p.theme === th, 'B: ' + obj + ' comes from ' + th);
    ok(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(th), 'B: ' + obj + ' is a colour theme');
    const j = path.join(ROOT, 'mini tools', 'pictures', th.replace(/ /g, '-') + '.json');
    ok(fs.existsSync(j) && JSON.parse(fs.readFileSync(j, 'utf8')).nouns[obj], 'B: ' + obj + ' is a labelled library picture');
    ok(p && p.ang === (UPRIGHT.includes(obj) ? 90 : 0), 'B: ' + obj + (UPRIGHT.includes(obj) ? ' is laid down by exactly 90°' : ' is used as drawn'));
    const file = path.join(ROOT, 'image-library-webp', 'themes', th, obj + '@2x.webp');
    const S = (await sharp(file).metadata()).width;
    const { data, info } = await sharp(file).ensureAlpha().rotate(p.ang, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).raw().toBuffer({ resolveWithObject: true });
    let x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 40) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    const own = { l: (x0 - info.width / 2) / S, r: (x1 + 1 - info.width / 2) / S, t: (y0 - info.height / 2) / S, b: (y1 + 1 - info.height / 2) / S };
    ok(['l', 'r', 't', 'b'].every((k) => Math.abs(own[k] - p[k]) < 0.006), 'B: ' + obj + ': the stored ink box matches the pixels');
    ok((own.r - own.l) > (own.b - own.t), 'B: ' + obj + ' lies along the tape (longer across than tall)');
  }

  /* ---------- C. one scale on the board, and it fits ---------- */
  const sandbox = {};
  new Function('window', 'document', 'SnipTapeCore', SRC.replace(/injectSnipTapeCSS\(\);/, '') + ';window.X=SnipTapeActivity;')(sandbox, undefined, C);
  const A = sandbox.X;
  for (const L of ['12', '20']) for (const r of C.rounds(L)) for (const [W, floor] of STAGES) {
    A.st = C.newState(L, r.k, 'lined');
    const g = A._geometry(W);
    ok(g.tapeEnd + g.park <= W + 0.5 && g.padX >= 2, 'C: ' + L + '/' + r.k + ' @' + W + ': the tape, the wall and the clip park fit the stage');
    ok(Math.abs(g.x(r.a.len) - g.x(0) - r.a.len * g.u) < 1e-9, 'C: one cm is u px along the whole tape');
    for (const w of ['a', 'b']) {
      const t = r[w], p = C.PICS[t.obj], short = t.len * g.u * (p.b - p.t) / (p.r - p.l);
      ok(short >= floor, 'C: ' + L + '/' + r.k + ' @' + W + ' ' + t.obj + ' is ' + short.toFixed(1) + ' px across (≥ ' + floor + ')');
      ok(short <= g.laneH, 'C: ' + L + '/' + r.k + ' @' + W + ' ' + t.obj + ' fits its lane');
    }
    ok(g.laneBY + g.laneH < g.H && g.tapeY > g.laneAY + g.laneH, 'C: the tape lies between the two lanes');
  }

  /* ---------- D. check, exhaustively, against the own oracle ---------- */
  for (const L of ['12', '20']) for (const r of C.rounds(L)) {
    const e0 = C.newState(L, r.k, 'lined');
    ok(C.check(e0).key === 'hintClips' && e0.misses === 0 && e0.verdict === null, 'D: ' + L + '/' + r.k + ' nothing done → hintClips, never a miss');
    for (let a = 0; a <= r.max; a++) for (let b = 0; b <= r.max; b++) for (const typed of [null, r.gap, r.gap + 1, r.a.len, r.b.len, r.a.len + r.b.len]) {
      if (typed !== null && (typed < 1 || typed > 99)) continue;
      const st = C.newState(L, r.k, 'lined');
      C.placeClip(st, 'a', a); C.placeClip(st, 'b', b);
      if (typed !== null) String(typed).split('').forEach((d) => C.typeDigit(st, d));
      const x = C.check(st);
      const want = a !== r.a.len ? 'clipA' : b !== r.b.len ? 'clipB' : typed === null ? 'note' : typed !== r.gap ? 'number' : 'ok';
      const got = x.result === 'miss' ? x.kind : x.result;
      if (got !== want) ok(false, 'D: ' + L + '/' + r.k + ' clips ' + a + ',' + b + ' typed ' + typed + ' → ' + got + ', want ' + want);
      else pass++;
      if (want === 'note') ok(x.key === 'hintType' && st.misses === 0, 'D: clips right, nothing typed → hintType, never a miss');
    }
  }
  (() => {
    const st = C.newState('12', 0, 'lined');   /* caterpillar 5 / centipede 7 */
    C.placeClip(st, 'a', 5); C.placeClip(st, 'b', 7); C.typeDigit(st, '1'); C.typeDigit(st, '2');
    ok(C.check(st).kind === 'number' && C.hint(st) === 'hintGhost' && st.verdict.typed === 12, 'D: 12 (the sum) → a number miss, hintGhost, the ghost is 12');
    C.backspace(st); ok(st.verdict === null && st.typed === 1, 'D: a keypad move clears the verdict');
    C.backspace(st); C.typeDigit(st, '7'); C.check(st); ok(st.help && C.hint(st) === 'hintDots', 'D: miss 2 → hintDots');
    C.backspace(st); C.typeDigit(st, '2'); ok(C.check(st).result === 'ok' && st.done, 'D: 2 → solved');
    ok(C.check(st).result === 'no' && !C.typeDigit(st, '5') && !C.backspace(st), 'D: a solved round is locked');
    ok(C.placeClip(st, 'a', 9), 'D: after success the clips still slide (free play)');
    const t = C.newState('12', 0, 'lined'); C.placeClip(t, 'a', 4); C.placeClip(t, 'b', 7); C.typeDigit(t, '3'); C.check(t);
    ok(C.hint(t) === 'hintClipA', 'D: the orange clip one short → hintClipA');
    const u = C.newState('12', 0, 'lined'); C.placeClip(u, 'a', 5); C.placeClip(u, 'b', 8); C.check(u); ok(C.hint(u) === 'hintClipB', 'D: the green clip one long → hintClipB');
    const k = C.newState('12', 0, 'lined');
    ok(!C.typeDigit(k, '0') && k.typed === null, 'D: no leading zero');
    C.typeDigit(k, '1'); C.typeDigit(k, '0'); ok(!C.typeDigit(k, '5') && k.typed === 10, 'D: at most two digits');
    ok(!C.placeClip(k, 'a', NaN) && k.clipA === null, 'D: a NaN never places a clip');
    C.placeClip(k, 'a', 99); ok(k.clipA === 13, 'D: a clip is clamped to the tape (0 … max + 1)');
    C.placeClip(k, 'a', -4); ok(k.clipA === 0, 'D: … and never left of 0');
  })();

  /* ---------- E. loose starts ---------- */
  for (const L of ['12', '20']) for (const r of C.rounds(L)) {
    const st = C.newState(L, r.k, 'loose');
    ok(st.startA === r.a.loose && st.startB === r.b.loose && !C.atWall(st), 'E: ' + L + '/' + r.k + ' starts loose');
    ok(C.check(st).key === 'hintWall' && st.misses === 0, 'E: ' + L + '/' + r.k + ' nothing done → push to the wall FIRST (before any clip)');
    C.placeClip(st, 'a', r.a.len); C.placeClip(st, 'b', r.b.len); String(r.gap).split('').forEach((d) => C.typeDigit(st, d));
    const x = C.check(st);
    ok(x.result === 'note' && x.key === 'hintWall' && st.misses === 0, 'E: ' + L + '/' + r.k + ' nothing is graded before the push, never a miss');
    C.placeClip(st, 'a', C.endOf(st, 'a')); C.placeClip(st, 'b', C.endOf(st, 'b'));
    ok(C.check(st).key === 'hintWall', 'E: clips on the loose ENDS are still not graded');
    C.pushToWall(st, 'a'); ok(C.check(st).which === 'b', 'E: one pushed, the other still off → hintWall names it');
    C.pushToWall(st, 'b'); ok(C.atWall(st), 'E: both against the wall');
    C.placeClip(st, 'a', r.a.len); C.placeClip(st, 'b', r.b.len);
    ok(C.check(st).result === 'ok', 'E: pushed and clipped at the ends → solved');
    const m = C.newState(L, r.k, 'loose');
    ok(!C.moveThing(m, 'a', 99) || m.startA === r.max + 1 - r.a.len, 'E: a thing never slides past the tape');
    const lined = C.newState(L, r.k, 'lined'); ok(!C.moveThing(lined, 'a', 2) && lined.startA === 0, 'E: lined-up things never move');
  }

  /* ---------- F. the bots ---------- */
  for (const L of ['12', '20']) {
    const R = C.rounds(L);
    const play = (pick) => R.filter((r) => { const st = C.newState(L, r.k, 'lined'); C.placeClip(st, 'a', r.a.len); C.placeClip(st, 'b', r.b.len); String(pick(r)).split('').forEach((d) => C.typeDigit(st, d)); return C.check(st).result === 'ok'; }).length;
    ok(play((r) => Math.max(r.a.len, r.b.len)) === 0, 'F: ' + L + ' "type the longer length" never wins');
    ok(play((r) => Math.min(r.a.len, r.b.len)) === 0, 'F: ' + L + ' "type the shorter length" never wins');
    ok(play((r) => r.a.len + r.b.len) === 0, 'F: ' + L + ' "type the sum" never wins');
    ok(play((r) => r.a.len) === 0 && play((r) => r.b.len) === 0, 'F: ' + L + ' "read one clip" never wins');
    ok(play((r) => Math.abs(r.a.len - r.b.len) + 1) === 0, 'F: ' + L + ' "count the tick lines" never wins');
    ok(play((r) => r.gap) === R.length, 'F: ' + L + ' the subtraction wins every round');
    const best = Math.max(...[1, 2, 3, 4, 5, 6, 7, 8, 10, 13].map((n) => play(() => n)));
    ok(best <= 2, 'F: ' + L + ' the best "always type the same number" bot wins ' + best + ' of 9');
  }

  /* ---------- G. the plan ---------- */
  for (const L of ['12', '20']) {
    let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    let prev = null, same = 0; const seen = new Set();
    for (let p = 0; p < 300; p++) { const o = C.plan(L, p, rnd, prev); ok(o.slice().sort((a, b) => a - b).join() === C.rounds(L).map((r) => r.k).join(), 'G: ' + L + ' pass ' + p + ' is its pool reordered'); if (prev && prev.join() === o.join()) same++; seen.add(o.join()); prev = o; }
    ok(same === 0, 'G: ' + L + ' never repeats the previous order');
    ok(seen.size > 100, 'G: ' + L + ' orders really shuffle (' + seen.size + ' different orders in 300 passes)');
    const stream = (sd) => { let x = sd; return () => { x = (x * 16807) % 2147483647; return x / 2147483647; }; };
    for (let sd = 1; sd < 25; sd++) { const o1 = C.plan(L, 0, stream(sd), null), o2 = C.plan(L, 0, stream(sd), o1); ok(o1.join() !== o2.join(), 'G: ' + L + ' replayed stream ' + sd + ' gives a new order'); }
  }

  /* ---------- H. strings ×11 and reachability ---------- */
  const strBlock = SRC.slice(SRC.indexOf('/*STRINGS-BEGIN*/'), SRC.indexOf('/*STRINGS-END*/'));
  const keys = [...strBlock.matchAll(/^\s{4}(\w+): \{/gm)].map((m) => m[1]);
  const STR = A.strings;
  ok(keys.length >= 25, 'H: the strings block parsed (' + keys.length + ' keys)');
  const body = SRC.replace(strBlock, '') + CORE;
  keys.forEach((k) => {
    LOCALES.forEach((l) => ok(typeof STR[k][l] === 'string' && STR[k][l].trim().length > 0, 'H: ' + k + '.' + l + ' authored'));
    const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
    LOCALES.forEach((l) => ok(ph(STR[k][l]) === ph(STR[k].en), 'H: ' + k + '.' + l + ' keeps the placeholders of en'));
    ok(body.includes("'" + k + "'") || ['title', 'instruction'].includes(k), 'H: ' + k + ' is reached by the code');
  });
  ['hintClips', 'hintWall', 'hintType', 'hintClipA', 'hintClipB', 'hintGhost', 'hintDots', 'okTop', 'okBottom', 'taskLine'].forEach((k) => ok(keys.includes(k), 'H: ' + k + ' exists'));
  LOCALES.forEach((l) => ['okTop', 'okBottom'].forEach((k) => ok(/\{a\}.*\{b\}.*\{a\}\s*−\s*\{b\}\s*=\s*\{gap\}.*\{gap\}/.test(STR[k][l]), 'H: ' + l + ' ' + k + ' says a, b, a − b = gap (U+2212)')));
  LOCALES.forEach((l) => keys.forEach((k) => ok(!/\d/.test(STR[k][l].replace(/\{\w+\}/g, '').replace(/0\D{1,6}(12|20)/g, '')), 'H: ' + l + ' ' + k + ' carries no answer number')));
  ok(keys.every((k) => !/ [?:!;»]|« /.test(STR[k].fr)), 'H: every fr string uses U+202F before ? : ! ; and inside « »');
  ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|ilmai\w*)(?!\p{L})/iu.test(strBlock), 'H: no "free" in the activity text');
  const INCH = /(?<!\p{L})(inch|inches|feet|foot|zoll|pouce|pulgada|polegada|pollice|duim|tum|tomme|tuuma)(?!\p{L})/iu;
  ok(keys.every((k) => LOCALES.every((l) => !INCH.test(STR[k][l]))), 'H: metric only');
  ok(INCH.test('3 inches') && !INCH.test('tumme'), 'H: the inch ban fires on inches and passes the Swedish thumb');
  ok(!/metre|centimetre/.test(keys.map((k) => STR[k].en).join(' ')), 'H: en uses US spelling');
  ok(!/coral|teal/i.test(keys.map((k) => STR[k].en).join(' ')), 'H: en names the clips by colours a child says (orange, green)');

  /* ---------- I. the drawing rules ---------- */
  const ACT_BODY = SRC.replace(strBlock, '');
  ok(/d="M' \+ g\.x0 \+ ' ' \+ gy \+ 'H' \+ \(g\.x0 \+ gl\)/.test(ACT_BODY), 'I: the dashed strip starts at the tray\'s zero, never at a clip');
  ok(/for \(var d = 0; d < r\.gap; d\+\+\)/.test(ACT_BODY) && /\(d \+ 0\.5\) \* u/.test(ACT_BODY), 'I: one dot in each centimetre SPACE (gap dots, at the middle of each space)');
  ok(/S = len \/ \(p\.r - p\.l\)/.test(ACT_BODY), 'I: a picture is scaled by its ink box, not its image box');
  ok(/snipped = !!\(st\.done \|\| \(st\.verdict && st\.verdict\.kind === 'number'\)\)/.test(ACT_BODY), 'I: the tape is snipped only by a number miss or a success');
  ok(/if \(st\.help\) for \(var d = 0/.test(ACT_BODY), 'I: the dots come only with help (miss 2)');
  ok(!/st-glow[^\n]*r\.gap|r\.gap[^\n]*st-glow/.test(ACT_BODY), 'I: the glow follows the clips, never the answer');
  const ghosts = [...ACT_BODY.matchAll(/data-ghost="' \+ ([\w.]+)/g)].map((m) => m[1]);
  ok(ghosts.length >= 2 && ghosts.every((x) => x === 'st.verdict.typed') && /var gl = st\.verdict\.typed \* u/.test(ACT_BODY), 'I: every dashed strip (straight and buckled) is the child\'s own number (' + ghosts.join(',') + ')');

  /* ---------- J. the manifest row ---------- */
  const man = JSON.parse(fs.readFileSync(MAN_PATH, 'utf8')), list = Array.isArray(man) ? man : man.activities;
  const row = list.find((x) => x.id === 'span-length-gap.how-much-longer.2-md-a-4');
  ok(row && row.tool === 'snip-tape-activity' && row.task_template === 'snip-tape', 'J: the row points at the snip-out tape');
  ok(row && row.alignment.code === '2.MD.A.4', 'J: the alignment stays');
  ok(row && LOCALES.every((l) => row.slug[l] && row.page_title[l] && row.page_intro[l]), 'J: the row ships in all 11 locales (slug, title, intro)');
  ok(row && new Set(Object.values(row.slug)).size === 11 && Object.values(row.slug).every((s) => /^[a-z0-9-]+$/.test(s)), 'J: 11 different url-safe slugs');

  console.log(`verify-snip-tape-core: ${pass} pass, ${fail} fail`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
