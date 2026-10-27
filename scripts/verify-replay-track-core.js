#!/usr/bin/env node
/* =====================================================================
   verify-replay-track-core.js — the build gate for ACTIVITY #136, The
   Replay Track (Story Problems, 2.OA.A.1 · 1.OA.A.1 · 3.OA.A.3), all 11
   locales.
   ---------------------------------------------------------------------
   It does NOT trust the core's answers. Its own ground truth:
     · the design's answer table (§6), typed in here;
     · its own script runner (lanes, set/add/sub/rep, flags) — the one
       number in 0…200 that lands every flag must be the table's answer;
     · the story TEXT: the told numbers are read off every locale's text;
     · the shipped stories (rounds 1–8 within 100) read from git at the
       commit before this build — byte-identical in all 11 locales.
   Then: the bots (add the told numbers, subtract small from big, the
   keyword reader, always multiply / divide) sit at or below chance and
   never beat it; no answer is a told number; no 0; every answer inside
   its ruler. The model: empty replay is no miss, miss → miss 2 → help,
   a digit takes the help away, success, free replays after it. The
   plan: every pass a fresh permutation, never two of one story type in
   a row, never three of one operation. Pictures exist, colour only.
   The equation per locale (× · ÷ :) is true; the bond adds up. Strings
   ×11, prose, the manifest.
   Usage: node scripts/verify-replay-track-core.js   (RT_CORE / RT_ACT / RT_MANIFEST override the files)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), { execSync } = require('child_process'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const CORE = process.env.RT_CORE || path.join(MINI, 'replay-track-core.js');
const ACTF = process.env.RT_ACT || path.join(MINI, 'replay-track-activity.js');
const MAN = process.env.RT_MANIFEST || path.join(MINI, 'number-bond-activities.json');
const ID = 'numberbond.story-problem.2-oa-a-1', BEFORE = 'b1b7b623';
const C = require(CORE);
const ACT = (() => { const ctx = { window: {}, ReplayTrackCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(ACTF, 'utf8') + '\n;this.__A = window.ReplayTrackActivity;', ctx); return ctx.__A; })();
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
let PASS = 0, FAIL = 0;
const ok = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 80) console.error('  FAIL: ' + m); } };

/* ---------- the gate's own truth ---------- */
const TABLE = {
  w100: [50, 20, 39, 50, 25, 14, 18, 47, 28, 35, 26, 36, 33, 61],
  w20: [7, 4, 7, 12, 15, 9, 8, 18, 9, 15],
  two: [29, 14, 43, 35, 8, 10, 30, 22],
  groups: [30, 32, 21, 24, 18, 6, 7, 9, 7, 6]
};
/* the operation that solves each round (the design's table) */
const OPS = {
  w100: ['+', '-', '+', '+', '-', '-', '-', '+', '-', '+', '-', '+', '-', '+'],
  w20: ['+', '-', '-', '+', '+', '-', '-', '+', '-', '+'],
  groups: ['*', '*', '*', '*', '*', '/', '/', '/', '/', '/']
};
const TOPS = { w20: 20, w100: 100, two: 60, groups: 50 };
/* my runner: returns the lanes' ends and whether every flag is hit */
function run(rd, x) {
  const e = { A: 0, B: 0, C: 0 }, told = rd.told; let hit = true, flags = 0;
  const v = (r) => r === '?' ? x : r[0] === 't' ? told[+r.slice(1)] : r[0] === '=' ? e[r.slice(1)] : NaN;
  for (const s of rd.s) {
    const [L, op] = s;
    if (op === 'set') e[L] = v(s[2]);
    else if (op === 'add') e[L] = e[L] + v(s[2]);
    else if (op === 'sub') e[L] = e[L] - v(s[2]);
    else if (op === 'rep') e[L] = e[L] + v(s[2]) * v(s[3]);
    else if (op === 'flag') { flags++; if (e[L] !== v(s[2])) hit = false; }
  }
  return { hit: hit && flags > 0, flags, e };
}

/* ---------- 1. every round: one number lands every flag, and it is the table's ---------- */
for (const set of C.SETS) {
  const rs = C.rounds(set);
  ok(rs.length === TABLE[set].length, `${set}: ${TABLE[set].length} rounds`);
  rs.forEach((rd, i) => {
    const tag = `${set} ${i + 1}`, want = TABLE[set][i];
    const sols = []; for (let x = 0; x <= 200; x++) if (run(rd, x).hit) sols.push(x);
    ok(sols.length === 1 && sols[0] === want, `${tag}: exactly one number lands every flag, ${want} (got ${sols.join(',')})`);
    ok(C.answer(rd) === want, `${tag}: the core's answer is the table's`);
    const P = C.play(rd, want), Pu = C.play(rd, want + 1), Pd = C.play(rd, want - 1);
    ok(P.ok && P.flags.every(f => f.hit), `${tag}: play(answer) hits every flag`);
    ok(!Pu.ok && !Pd.ok, `${tag}: one more and one less each miss a flag`);
    ok(want > 0 && rd.told.every(t => t > 0), `${tag}: no 0`);
    ok(rd.told.indexOf(want) < 0, `${tag}: the answer is never a told number`);
    const top = TOPS[set], peak = Math.max.apply(null, [want].concat(rd.told, Object.values(run(rd, want).e)));
    ok(peak <= top, `${tag}: inside the 0–${top} ruler (${peak})`);
    if (set === 'groups') ok(run(rd, want).e.A <= 50, `${tag}: the product is at most 50`);
    /* the equation: the gate's own evaluation, glyphs per locale */
    for (const l of LOCS) {
      const eq = C.equation(rd, l), flat = eq.replace(/[\[\]]/g, '');
      ok(eq.indexOf('[' + want + ']') >= 0, `${tag}/${l}: the equation carries the answer`);
      const dot = /^(de|sv|da|no|fi)$/.test(l), col = /^(de|nl|da|no|fi|fr|it)$/.test(l), sl = l === 'sv';
      if (/\*/.test(rd.eq)) ok(flat.indexOf(dot ? '·' : '×') >= 0 && flat.indexOf(dot ? '×' : '·') < 0, `${tag}/${l}: the times sign is the school's`);
      if (/\//.test(rd.eq)) ok(flat.indexOf(sl ? '/' : col ? ':' : '÷') >= 0, `${tag}/${l}: the divide sign is the school's`);
      const [lhs, rhs] = flat.split('=').map(s => s.trim()), calc = (s) => Function('return ' + s.replace(/×|·/g, '*').replace(/÷|:/g, '/').replace(/−/g, '-'))();
      ok(calc(lhs) === calc(rhs), `${tag}/${l}: the equation is true (${flat})`);
    }
    const B = C.bond(rd);
    if (set === 'two') ok(B === null, `${tag}: two steps show the equation, no bond`);
    else ok(B && B.parts.reduce((a, b) => a + b, 0) === B.whole && (B.whole === want || B.parts.indexOf(want) >= 0 || set === 'groups'), `${tag}: the bond adds up and holds the answer`);
  });
}

/* ---------- 2. the stories: told numbers read off every locale's text; the shipped ones verbatim ---------- */
const STO = ACT.stories;
const before = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/number-bond-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 })).find(x => x.id === ID);
for (const set of C.SETS) for (const l of LOCS) {
  const arr = STO[set] && STO[set][l]; ok(Array.isArray(arr) && arr.length === C.rounds(set).length, `stories.${set}.${l}: one story per round`);
  if (!arr) continue;
  arr.forEach((t, i) => {
    const nums = (t.match(/\d+/g) || []).map(Number);
    ok(nums.join() === C.rounds(set)[i].told.join(), `stories.${set}.${l}.${i + 1}: the numbers in the text are the told numbers, in order (${nums.join()})`);
    ok(!/free|gratis|kostenlos|gratuit/i.test(t), `stories.${set}.${l}.${i + 1}: never says free`);
  });
}
for (const l of LOCS) for (let i = 0; i < 8; i++) ok(STO.w100[l][i] === before.params.byLocale[l].rounds[i].text, `stories.w100.${l}.${i + 1}: the shipped story, byte for byte`);
/* the shipped rounds keep their numbers too */
for (let i = 0; i < 8; i++) { const o = before.params.byLocale.en.rounds[i], w = o.whole; ok([o.first, o.second, o.whole].indexOf(TABLE.w100[i]) >= 0, `w100 ${i + 1}: the shipped bond's numbers hold the answer`); }

/* ---------- 3. the bots sit at or below chance ---------- */
const PLUS = /\b(in all|together|more|came|come|comes|found|get on|gets on|hop on|drive in|sail in|got)\b/gi, MINUS = /\b(left|rest|away|gave|give|gives|fewer|eaten|eats|pop|off)\b/gi;
function keywordOp(t) {
  const sc = (s) => (s.match(PLUS) || []).length - (s.match(MINUS) || []).length;
  let v = sc(t); if (v === 0) { const q = t.split(/(?<=[.?!])\s+/).pop(); v = sc(q); }
  return v >= 0 ? '+' : '-';
}
for (const set of ['w100', 'w20']) {
  const rs = C.rounds(set), n = rs.length; let add = 0, sub = 0, kw = 0, told = 0, plus = 0;
  rs.forEach((rd, i) => {
    const a = rd.told[0], b = rd.told[1], want = TABLE[set][i];
    if (a + b === want) add++; if (Math.abs(a - b) === want) sub++; if (rd.told.indexOf(want) >= 0) told++;
    const k = keywordOp(STO[set].en[i]); if ((k === '+' ? a + b : Math.abs(a - b)) === want) kw++;
    if (OPS[set][i] === '+') plus++;
    ok(C.opOf(rd) === OPS[set][i], `${set} ${i + 1}: the solving operation is ${OPS[set][i]}`);
  });
  ok(plus * 2 === n, `${set}: add and subtract are exactly even (${plus} : ${n - plus})`);
  ok(add * 2 <= n && sub * 2 <= n && kw * 2 <= n && told === 0, `${set}: add-the-numbers ${add}/${n}, subtract ${sub}/${n}, keyword ${kw}/${n}, a told number ${told}/${n} — none beats a coin`);
}
{ const rs = C.rounds('two'); let addAll = 0, subBS = 0;
  rs.forEach((rd, i) => { const s = rd.told.reduce((x, y) => x + y, 0); if (s === TABLE.two[i]) addAll++; if (Math.max.apply(null, rd.told) - Math.min.apply(null, rd.told) === TABLE.two[i]) subBS++; });
  ok(addAll === 0 && subBS === 0, `two: adding all ${addAll}/8, big minus small ${subBS}/8`); }
{ const rs = C.rounds('groups'); let mul = 0, div = 0, addAll = 0, nm = 0;
  rs.forEach((rd, i) => { const [a, b] = rd.told, w = TABLE.groups[i]; if (a * b === w) mul++; if (Math.max(a, b) / Math.min(a, b) === w) div++; if (a + b === w) addAll++; if (rd.type === 'mul') nm++; ok(C.opOf(rd) === OPS.groups[i], `groups ${i + 1}: the operation`); });
  ok(nm === 5 && mul === 5 && div === 5 && addAll === 0, `groups: multiply ${mul}/10, divide ${div}/10, add ${addAll}/10, 5 multiply rounds`);
  ok(rs.filter(r => r.type === 'share').length === 3 && rs.filter(r => r.type === 'grp').length === 2, 'groups: three sharing and two making-groups rounds');
  /* sharing deals a told number of segments of the child's size; grouping cuts segments of a told size */
  rs.forEach((rd, i) => { const s = rd.s.find(x => x[1] === 'rep'); if (rd.type === 'share') ok(s[2][0] === 't' && s[3] === '?', `groups ${i + 1}: sharing — the told number of shares, each the child's number`); if (rd.type === 'grp') ok(s[2] === '?' && s[3][0] === 't', `groups ${i + 1}: grouping — the child's number of groups, each a told size`); }); }

/* ---------- 4. the model ---------- */
for (const set of C.SETS) C.rounds(set).forEach((rd, i) => {
  const tag = `${set} ${i + 1}`, want = TABLE[set][i], st = C.newState(set, i);
  ok(C.replay(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hEmpty', `${tag}: Replay with an empty box is no miss`);
  String(want + 1).split('').forEach(d => C.type(st, d));
  let r = C.replay(st); ok(r.result === 'miss' && st.misses === 1 && !st.help, `${tag}: a wrong number is a miss`);
  /* the gate's own first missed flag: is it a told one? */
  const told1 = (() => { const e = { A: 0, B: 0, C: 0 }, x = want + 1; for (const s of rd.s) { const v = (q) => q === '?' ? x : q[0] === 't' ? rd.told[+q.slice(1)] : e[q.slice(1)]; if (s[1] === 'set') e[s[0]] = v(s[2]); else if (s[1] === 'add') e[s[0]] += v(s[2]); else if (s[1] === 'sub') e[s[0]] -= v(s[2]); else if (s[1] === 'rep') e[s[0]] += v(s[2]) * v(s[3]); else if (s[1] === 'flag' && e[s[0]] !== v(s[2])) return s[2][0] === 't'; } return null; })();
  ok(C.hint(st) === (told1 ? 'miss1' : 'miss1End'), `${tag}: miss 1 names ${told1 ? 'the told flag' : 'the story end'}`);
  r = C.replay(st); ok(r.result === 'miss' && st.misses === 2 && st.help && C.hint(st) === (told1 ? 'miss2' : 'miss2End'), `${tag}: miss 2 brings the help`);
  const rw = C.rewind(rd); ok(rw.region && rw.back.every(f => !f.yours), `${tag}: the help is the story without the child's step, the child's place outlined`);
  C.type(st, '1'); ok(!st.help, `${tag}: a new digit takes the help away`);
  while (st.typed) C.del(st);
  String(want).split('').forEach(d => C.type(st, d));
  r = C.replay(st); ok(r.result === 'ok' && st.done, `${tag}: the answer solves it`);
  const m = st.misses; C.del(st); C.type(st, '9'); r = C.replay(st); ok(r.result === 'free' && st.misses === m && st.done, `${tag}: after success a replay is free play, no judging`);
});
/* the bots' numbers are judged misses: add everything, big minus small, multiply */
for (const set of C.SETS) C.rounds(set).forEach((rd, i) => {
  const want = TABLE[set][i], t = rd.told, guesses = [t.reduce((x, y) => x + y, 0), Math.max.apply(null, t) - Math.min.apply(null, t), t.reduce((x, y) => x * y, 1)];
  guesses.filter(g => g !== want && g > 0 && g < 1000).forEach(g => { const st = C.newState(set, i); String(g).split('').forEach(d => C.type(st, d)); ok(C.replay(st).result === 'miss' && !st.done, `${set} ${i + 1}: the bot's ${g} is a miss`); });
});
{ const st = C.newState('w100', 0); ['1', '2', '3', '4'].forEach(d => C.type(st, d)); ok(st.typed === '123', 'the box holds three digits'); }
{ const st = C.newState('w100', 0); C.type(st, '0'); C.type(st, '5'); ok(st.typed === '5', 'a leading 0 is replaced'); ok(C.type(st, 'x') === 'no', 'only digits type'); }

/* ---------- 5. the plan ---------- */
let seed = 7; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const myOp = (set, i) => set === 'two' ? null : OPS[set][i];
for (const set of C.SETS) {
  const rs = C.rounds(set), n = rs.length, firsts = {}; let prev = null, rule = 0;
  for (let p = 0; p < 1500; p++) {
    const o = C.plan(set, rnd, prev).order;
    ok(o.slice().sort((a, b) => a - b).join() === rs.map((_, i) => i).join(), `${set}: a pass is every round once`);
    if (prev) ok(o.join() !== prev.join(), `${set}: never the order of the pass before`);
    prev = o; firsts[o[0]] = (firsts[o[0]] || 0) + 1;
    if (set !== 'two') {
      for (let j = 1; j < n; j++) if (rs[o[j]].type === rs[o[j - 1]].type) rule++;
      for (let j = 2; j < n; j++) { const a = myOp(set, o[j]); if (a === myOp(set, o[j - 1]) && a === myOp(set, o[j - 2])) rule++; }
    }
  }
  ok(rule === 0, `${set}: never two of one story type in a row, never three of one operation (${rule} breaks)`);
  ok(Object.keys(firsts).length === n, `${set}: every round can open a pass (${Object.keys(firsts).length}/${n})`);
}

/* ---------- 6. pictures: on disk, colour only ---------- */
for (const set of C.SETS) C.rounds(set).forEach((rd, i) => [rd.pic, rd.pic2].filter(Boolean).forEach(p => {
  ok(fs.existsSync(path.join(REPO, 'image-library-webp', 'themes', p + '@2x.webp')), `${set} ${i + 1}: the picture ${p} exists`);
  ok(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i.test(p), `${set} ${i + 1}: ${p} is a colour picture`);
}));

/* ---------- 7. strings ---------- */
const S = ACT.strings, src = fs.readFileSync(ACTF, 'utf8').replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '') + fs.readFileSync(CORE, 'utf8');
const KEYS = Object.keys(S); ok(KEYS.length >= 28, 'strings: the set is there');
const HINTS = ['hEmpty', 'miss1', 'miss1End', 'miss2', 'miss2End'];
const FREE = /(?<!\p{L})(free|kostenlos\w*|gratis|gratuit\w*|grátis|ilmai\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*|gratuito|gratuita)(?!\p{L})/iu;
for (const k of KEYS) for (const l of LOCS) {
  const v = S[k][l]; ok(typeof v === 'string' && v.length > 0, `strings.${k}.${l} present`); if (typeof v !== 'string') continue;
  ok(!FREE.test(v), `strings.${k}.${l} never says free`);
  if (HINTS.indexOf(k) >= 0) ok(!/\d/.test(v), `strings.${k}.${l}: no digit in a hint`);
  if (l === 'fr' || l === 'it') ok(v.indexOf("'") < 0, `strings.${k}.${l}: typographic apostrophe`);
  if (l === 'fr') ok(!/ [:!?;»]/.test(v) && !/« /.test(v), `strings.${k}.fr: a narrow space before : ! ? ; and inside « »`);
}
for (const l of LOCS) {
  ok(/\{guess\}/.test(S.miss1[l]) && /\{flag\}/.test(S.miss1[l]) && /\{flag\}/.test(S.miss2[l]) && /\{guess\}/.test(S.miss1End[l]), `${l}: the miss lines name the child's number and the flag`);
  ok(!/\{answer\}|\{guess\}/.test(S.miss2[l] + S.miss2End[l]), `${l}: the help never prints a number of the answer`);
  ok(/\{answer\}/.test(S.ok[l]), `${l}: the success line names the answer`);
}
const BYSHELL = ['title', 'instruction', 'instrBubble', 'okBubble'], BYSETTING = ['setStory', 'sW20', 'sW100', 'sTwo', 'sGroups', 'setFlags', 'fFirst', 'fReplay'];
for (const k of KEYS) ok(BYSHELL.concat(BYSETTING).indexOf(k) >= 0 || new RegExp("'" + k + "'").test(src), `strings.${k} is reached`);

/* ---------- 8. prose + manifest ---------- */
for (const l of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', l + '.json'), 'utf8')), p = j.prose[ID];
  ok(p && p.about && p.about.length === 3 && p.practices.length === 4 && p.howToPlay.length === 3 && p.learningGoals.length === 3, `prose.${l}: the whole entry`);
  if (!p) continue;
  const all = [].concat(p.about, p.practices, p.howToPlay, p.learningGoals).join(' ');
  ok(!FREE.test(all), `prose.${l}: never says free`);
  ok(l === 'en' ? /Common Core/.test(all) : !/Common Core/.test(all), `prose.${l}: the framework name`);
  ok(all.indexOf('28 + 17 = 45') >= 0 && all.indexOf('62') >= 0, `prose.${l}: quotes the marbles round the activity really shows (28 + 17 = 45; 62 overshoots)`);
  if (l === 'fr' || l === 'it') ok(all.indexOf("'") < 0, `prose.${l}: typographic apostrophes`);
}
const rows = JSON.parse(fs.readFileSync(MAN, 'utf8')), row = rows.find(x => x.id === ID);
const headRows = JSON.parse(execSync(`git show ${BEFORE}:"mini tools/number-bond-activities.json"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 1e8 }));
ok(row && row.tool === 'replay-track-activity', 'manifest: the row points at the replay track');
ok(row && row.params.story.join() === 'w20,w100,two,groups' && row.params.flags.join() === 'first,replay' && C.SETS.every(s => row.params.rounds[s] === C.rounds(s).length), 'manifest: params match the core');
['slug', 'page_title', 'page_intro', 'alignment', 'id', 'task_template', 'kid_prompt_template', 'theme'].forEach(k => ok(JSON.stringify(row[k]) === JSON.stringify(before[k]), `manifest: ${k} frozen`));
rows.forEach(x => { if (x.id !== ID) ok(JSON.stringify(x) === JSON.stringify(headRows.find(y => y.id === x.id)), `manifest: the other row ${x.id} is untouched`); });

console.log(`verify-replay-track-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
