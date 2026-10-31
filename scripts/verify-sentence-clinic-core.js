#!/usr/bin/env node
/* =====================================================================
   verify-sentence-clinic-core.js — the logic gate of ACTIVITY #176, "Dr.
   Plume's Sentence Clinic" (L.2.1 · L.2.2) → THE LISTENING LINE.
   Its own ground truth: the authors' sentences as written, with their
   real capitals (scripts/verify-sentence-clinic-authored.json) — the gate
   builds every cured text from them with its OWN rules (a mark per tune,
   es ¿ ¡, fr narrow no-break space), never from the core's transform; a
   frozen copy of the four repair rounds the old activity shipped
   (scripts/verify-sentence-clinic-kept.json).
   Checks: the patients (shapes, the eight tell/ask patterns of Level 1,
   the Level 2 seam spread and capital tells, the Level 3 kinds); the cured
   text in every round of every locale; the Listening Line on the
   untouched, the cured and every single wrong move (knot, kink, sag,
   run-off, flat gap, double beat, backward beat, off-key); exactly one
   right option; the capital that rises by itself; the hand; the
   reshuffle; the strings; the prose; the manifest; the html.
   Usage: node scripts/verify-sentence-clinic-core.js [--measure]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
/* the mutation harness hands in altered copies through these */
const C = require(process.env.SC_CORE || path.join(MT, 'sentence-clinic-core.js'));
const D = require(process.env.SC_DATA || path.join(MT, 'sentence-clinic-data.js'));
const ACT_PATH = process.env.SC_ACT || path.join(MT, 'sentence-clinic-activity.js');
const SRC = fs.readFileSync(ACT_PATH, 'utf8');
const MEASURE = process.argv.includes('--measure');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 200) console.log('  FAIL ' + m); } };

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const AUTH = JSON.parse(fs.readFileSync(path.join(__dirname, 'verify-sentence-clinic-authored.json'), 'utf8')).locales;
const KEPT = JSON.parse(fs.readFileSync(path.join(__dirname, 'verify-sentence-clinic-kept.json'), 'utf8')).rounds;
const MARK = { T: '.', A: '?', E: '!' };
const PATTERNS = ['TTT', 'TTA', 'TAT', 'ATT', 'AAT', 'ATA', 'TAA', 'AAA'];
/* my own cured text: each sentence with its mark; es opens ? ! with ¿ ¡; fr puts a narrow no-break space before ? ! */
const close = (l, s, m) => (l === 'es' && m !== '.' ? (m === '?' ? '¿' : '¡') : '') + s + (l === 'fr' && m !== '.' ? ' ' : '') + m;
const mine1 = (l, card) => card.map(([s, t]) => close(l, s, MARK[t])).join(' ');
const mine2 = (l, r) => close(l, r[0], MARK[r[1]]) + ' ' + close(l, r[2], MARK[r[3]]);
const normFr = (s) => s.replace(/ ([?!])$/, ' $1');
/* the second sentence of a run must not open with a word that is capitalised anyway (it would show the seam) */
const SEAM_OK = { de: /^(Können|Er|Sie|Wir|Das|Kannst|Es|Du|Ich|Ihr)$/ };
const NAMES = /^(I|Ben|Mia|Sam|Spot|Grandma)$/;

/* ---------------- A. the patients ---------------- */
ok(JSON.stringify(Object.keys(D).sort()) === JSON.stringify(LOCALES.slice().sort()), 'A: the patients hold exactly the 11 locales');
for (const l of LOCALES) {
  const L = D[l], W = AUTH[l];
  ok(L.L1.length === 8 && L.L2.length === 10 && L.L3.length === 10, `A[${l}]: 8 cards, 10 runs, 10 repairs`);
  /* Level 1: the eight tell/ask patterns, each once */
  const pats = L.L1.map((r) => r.units.map((u) => u.tune).join(''));
  ok(JSON.stringify(pats) === JSON.stringify(PATTERNS), `A[${l}] L1: the eight tell/ask patterns once each (${pats.join(' ')})`);
  for (let p = 0; p < 3; p++) ok(L.L1.filter((r) => r.units[p].tune === 'A').length === 4, `A[${l}] L1: position ${p + 1} is a question in exactly 4 of 8`);
  L.L1.forEach((r, k) => {
    ok(C.cured(l, 'one', r) === mine1(l, W.L1[k]), `A[${l}] L1 #${k + 1}: cured "${C.cured(l, 'one', r)}" = the authors' "${mine1(l, W.L1[k])}"`);
    ok(r.units.length === 3 && r.units.every((u, i) => u.from === (i ? r.units[i - 1].to + 1 : 0)) && r.units[2].to === r.tokens.length - 1, `A[${l}] L1 #${k + 1}: three units covering the card`);
  });
  /* Level 2: one seam, the spread, no capital tell */
  const lens = {};
  L.L2.forEach((r, k) => {
    const len = r.units[0].to + 1; lens[len] = (lens[len] || 0) + 1;
    ok(r.tokens.length <= 13, `A[${l}] L2 #${k + 1}: a run of at most 13 words (${r.tokens.length})`);
    ok(C.cured(l, 'two', r) === mine2(l, W.L2[k]), `A[${l}] L2 #${k + 1}: cured "${C.cured(l, 'two', r)}" = the authors' "${mine2(l, W.L2[k])}"`);
    const s2 = W.L2[k][2].split(' ')[0];
    ok(!NAMES.test(s2) && (!SEAM_OK[l] || SEAM_OK[l].test(s2)), `A[${l}] L2 #${k + 1}: the second sentence opens with "${s2}", a word that is lower-case in a run`);
    ok(r.tokens.slice(1).every((t, i) => t.charAt(0) === t.charAt(0).toLocaleLowerCase(l) || W.L2[k].slice(0, 3).join(' ').split(' ').some((w) => w === t)), `A[${l}] L2 #${k + 1}: no word after the first is capitalised in the run except where the authors capitalised it inside a sentence`);
    ok(r.tokens[r.units[1].from] === W.L2[k][2].split(' ')[0].charAt(0).toLocaleLowerCase(l) + W.L2[k][2].split(' ')[0].slice(1), `A[${l}] L2 #${k + 1}: the seam word shown lower-case in the run`);
  });
  const maxLen = Math.max(...Object.values(lens));
  if (MEASURE) console.log(`  ${l} L2 first-sentence lengths ${JSON.stringify(lens)}`);
  ok(maxLen <= 3, `A[${l}] L2: no first-sentence length in more than 3 of 10 runs (${JSON.stringify(lens)})`);
  const asks = L.L2.filter((r) => r.units.some((u) => u.tune === 'A')).length;
  ok(asks >= 3 && asks <= 7, `A[${l}] L2: "always a full stop" cures at most 7 of 10 (${10 - asks})`);
  /* Level 3 */
  const kinds = L.L3.map((r) => r.kind).sort().join();
  ok(kinds === 'excl,form,form,form,ins,ins,lift,lift,ord,ord', `A[${l}] L3: 3 forms, 2 inserts, 2 lifts, 2 orders, 1 "!" (${kinds})`);
  L.L3.forEach((r, k) => {
    ok(JSON.stringify(r.options || null) === JSON.stringify(W.L3opt[k]) && (!r.options || r.answer === W.L3opt[k][0]), `A[${l}] L3 #${k + 1}: the options are the signed list, the first one right`);
    const want = normFr(W.L3[k]);
    ok(C.cured(l, 'three', r) === want, `A[${l}] L3 #${k + 1}: cured "${C.cured(l, 'three', r)}" = the authors' "${want}"`);
  });
  /* Level 3: the right option is not the unique shortest or longest in more than 2 of the 5 option rounds */
  let short = 0, long = 0;
  L.L3.filter((r) => r.options).forEach((r) => { const ls = r.options.map((o) => o.length), a = r.answer.length; if (ls.filter((x) => x <= a).length === 1) short++; if (ls.filter((x) => x >= a).length === 1) long++; });
  if (MEASURE) console.log(`  ${l} L3 option length: right is unique shortest ${short}/5, unique longest ${long}/5`);
  ok(short <= 2 && long <= 2, `A[${l}] L3: the right option is the unique shortest ${short}/5 and longest ${long}/5 (≤ 2 each)`);
}
/* the old repair rounds live on as Level 3 rounds 1–4 */
const strip = (s) => s.replace(/[.?! ]+$/, '').replace(/\s+[.?!]$/, '').trim();
/* replaced on purpose (review 2026-10-31): en order-svo had two right orders ("The fast dog runs."); sv å→och is a spelling slip, not a word form */
const REPLACED = { 'en.order-svo': 'The dog runs home', 'sv.swap-agree': 'Hon springer till skolan' };
for (const l of Object.keys(KEPT)) {
  const cur = D[l].L3.map((r) => r.cured.join(' '));
  for (const id of Object.keys(KEPT[l])) {
    const rep = REPLACED[l + '.' + id];
    ok(rep ? cur.includes(rep) && !cur.includes(strip(KEPT[l][id])) : cur.includes(strip(KEPT[l][id])), `B[${l}] ${id}: the old round "${KEPT[l][id]}" ${rep ? 'is replaced by "' + rep + '"' : 'is still a Level 3 repair'}`);
  }
}
ok(Object.keys(REPLACED).length === 2, 'B: two old rounds replaced, each with its recorded reason');
ok(Object.keys(KEPT).length === 8, 'B: eight kept locales');

/* ---------------- C. the Listening Line ---------------- */
const types = (ev) => ev.map((e) => e.type);
const trouble = (ev) => C.troubles(ev).length;
const solve = (st) => {
  const r = st.round;
  if (st.level !== 'three') { r.units.forEach((u) => C.setMark(st, u.to, MARK[u.tune])); return st; }
  if (r.kind === 'form') C.setForm(st, r.answer);
  if (r.kind === 'ins') C.insertAt(st, r.at, r.answer);
  if (r.kind === 'lift') C.lift(st, r.at);
  if (r.kind === 'ord') { for (let i = 0; i < r.cured.length; i++) { const j = st.words.findIndex((w, x) => x >= i && w.w === r.cured[i]); if (j !== i) C.swap(st, i, j); } }
  if (st.mark !== r.mark) C.setMark(st, 'end', r.mark);
  return st;
};
for (const l of LOCALES) for (const lv of C.LEVELS) {
  const P = C.pool(l, lv, D);
  P.forEach((r, k) => {
    const tag = `C[${l} ${lv} #${k + 1}]`;
    const st0 = C.newState(l, lv, k, D);
    ok(trouble(C.listen(st0)) >= 1 && !C.isCured(st0), tag + ': the untouched patient stumbles');
    ok(C.check(C.newState(l, lv, k, D)).result === 'empty', tag + ': a check with nothing done is no miss');
    const st = solve(C.newState(l, lv, k, D));
    ok(trouble(C.listen(st)) === 0 && C.isCured(st) && C.render(st) === C.cured(l, lv, r), tag + ': the cured patient rests (' + C.render(st) + ')');
    if (lv === 'two') {
      const seam = r.units[0].to, end = r.tokens.length - 1, a = MARK[r.units[0].tune], b = MARK[r.units[1].tune];
      let s = C.newState(l, lv, k, D); C.setMark(s, end, b);
      ok(types(C.listen(s)).includes('knot') && C.listen(s).find((e) => e.type === 'knot').at === seam, tag + ': no stop in the seam → a knot at the seam');
      s = C.newState(l, lv, k, D); C.setMark(s, seam, a);
      ok(C.listen(s).some((e) => e.type === 'runoff' && e.at === end), tag + ': no end mark → it runs off');
      s = C.newState(l, lv, k, D); C.setMark(s, seam, a === '.' ? '?' : '.'); C.setMark(s, end, b);
      ok(C.listen(s).some((e) => e.type === 'kink' && e.at === seam), tag + ': the wrong mark in the seam → a kink');
      const wrong = seam > 0 ? seam - 1 : seam + 1;
      s = solve(C.newState(l, lv, k, D)); C.setMark(s, wrong, '.');
      ok(C.listen(s).some((e) => e.type === 'sag' && e.at === wrong), tag + ': a stop inside a thought → a sag');
      s = C.newState(l, lv, k, D); C.cut(s, seam); C.setMark(s, end, b);
      ok(C.listen(s).some((e) => e.type === 'runoff' && e.at === seam && e.cut), tag + ': scissors in the seam with no mark yet → it runs on there');
      s = C.newState(l, lv, k, D); C.setMark(s, seam, a);
      ok(C.render(s).split(' ')[seam + 1].replace(/^[¿¡]/, '').charAt(0) === r.tokens[seam + 1].charAt(0).toLocaleUpperCase(l), tag + ': a stop in the seam wakes the next word: its capital rises by itself');
      ok(r.tokens[seam + 1].charAt(0) !== r.tokens[seam + 1].charAt(0).toLocaleUpperCase(l), tag + ': the child is never asked to make that capital (it is lower-case in the run)');
    }
    if (lv === 'one') r.units.forEach((u) => { const s = C.newState(l, lv, k, D); C.setMark(s, u.to, u.tune === 'A' ? '.' : '?'); ok(C.listen(s).some((e) => e.type === 'kink' && e.at === u.to), tag + ': the wrong mark after "' + r.tokens[u.to] + '" → a kink'); });
    if (lv === 'one') { const s = C.newState(l, lv, k, D); ok(!C.setMark(s, 0, '.') && !C.setMark(s, r.units[0].to, '!'), tag + ': Level 1 takes only . ? and only at a sentence end'); }
    if (lv === 'three') {
      if (r.options) {
        const right = r.options.filter((o) => { const s = C.newState(l, lv, k, D); if (r.kind === 'form') C.setForm(s, o); else C.insertAt(s, r.at, o); if (s.mark !== r.mark) C.setMark(s, 'end', r.mark); return C.isCured(s); });
        ok(right.length === 1 && right[0] === r.answer, tag + ': exactly one option cures it (' + right.join('/') + ')');
        const wrongOpt = r.options.find((o) => o !== r.answer), s = C.newState(l, lv, k, D);
        if (r.kind === 'form') C.setForm(s, wrongOpt); else C.insertAt(s, r.at, wrongOpt);
        ok(types(C.listen(s)).includes('offkey'), tag + ': a wrong option sounds off-key');
      }
      if (r.kind === 'ins') ok(C.listen(st0).some((e) => e.type === 'flatgap' && e.at === r.at), tag + ': the missing word leaves a flat gap after word ' + (r.at + 1));
      if (r.kind === 'lift') ok(C.listen(st0).some((e) => e.type === 'doublebeat' && e.at === r.at), tag + ': the extra word beats twice');
      if (r.kind === 'ord') {
        ok(C.listen(st0).some((e) => e.type === 'backbeat'), tag + ': the muddled order beats backwards');
        /* a capital that the cured sentence also carries inside it (a de noun, a name) is not a start-word tell */
        const caps = r.words.filter((w) => w.charAt(0) !== w.charAt(0).toLocaleLowerCase(l) && !NAMES.test(w) && !r.cured.slice(1).includes(w));
        ok(r.words.slice().sort().join() === r.cured.slice().sort().join() && (caps.length === 0 ? NAMES.test(r.cured[0]) : caps.length === 1 && caps[0] === r.cured[0]), tag + ': the start word is the only one printed with its capital');
      }
      if (r.kind === 'excl') { const s = C.newState(l, lv, k, D); C.setMark(s, 'end', '.'); ok(C.listen(s).some((e) => e.type === 'kink'), tag + ': a full stop on the exclamation kinks'); }
      if (r.kind === 'form') ok(r.words[r.at] !== r.answer && C.listen(st0).some((e) => e.type === 'offkey' && e.at === r.at), tag + ': the wrong form is off-key');
    }
  });
}

/* ---------------- D. the hand ---------------- */
{
  let st = C.newState('en', 'two', 0, D);
  ok(C.setMark(st, 2, '.') && st.marks[2] === '.' && C.setMark(st, 2, '.') && !st.marks[2], 'D: the same mark again takes it away');
  C.cut(st, 2); ok(st.cuts[2] && !st.marks[2], 'D: scissors open a pause with no mark');
  C.setMark(st, 2, '.'); ok(st.marks[2] === '.' && !st.cuts[2], 'D: a mark in a cut fills the pause');
  st.shown = ['x']; C.setMark(st, 3, '.'); ok(st.shown === null, 'D: a new move clears the last listen (nothing is graded before Check)');
  ok(!C.cut(st, st.round.tokens.length - 1), 'D: no scissors after the last word');
  st = C.newState('en', 'two', 0, D); C.setMark(st, 6, '?');
  let res = C.check(st); ok(res.result === 'miss' && st.misses === 1 && !st.help && res.first.type === 'knot', 'D: miss 1 — the first trouble is the knot');
  ok(C.toolFor(st, res.first) === 'cut', 'D: the knot is mended by the scissors');
  res = C.check(st); ok(st.misses === 2 && st.help, 'D: miss 2 brings the help');
  C.setMark(st, 2, '.'); res = C.check(st); ok(res.result === 'ok' && st.done, 'D: mended: done');
  ok(C.check(st).result === 'no' && !C.setMark(st, 3, '.'), 'D: nothing after done');
  st = C.newState('en', 'two', 0, D); C.setMark(st, 1, '.'); C.setMark(st, 6, '?'); res = C.check(st);
  ok(res.first && res.first.type === 'knot', 'D: a sag beside a knot: the knot comes first (the sag is its doing)');
  st = C.newState('en', 'three', 3, D); ok(C.lift(st, 0) && st.lifted.length === 1 && C.unlift(st, 0) && st.words[0].w === 'My', 'D: a lifted word goes back to its place');
  ok(C.toolFor({ level: 'three', round: { kind: 'form' } }, { type: 'offkey' }) === 'wheel' && C.toolFor({ level: 'three', round: { kind: 'ins' } }, { type: 'offkey' }) === 'lift' && C.toolFor({ level: 'three', round: {} }, { type: 'backbeat' }) === 'swap' && C.toolFor({ level: 'three', round: {} }, { type: 'flatgap' }) === 'ins', 'D: each trouble names its tool');
  ok(C.locOf('pt-BR') === 'pt' && C.locOf('xx') === 'en' && C.levelOf('zz') === 'two', 'D: locale and level fall back (Level 2 is the default)');
  st = C.newState('es', 'two', 0, D); C.setMark(st, 1, '.'); C.setMark(st, 3, '?');
  ok(C.render(st) === 'Tengo hambre. ¿Cuándo comemos?', 'D[es]: the question opens with ¿ by itself');
  st = C.newState('fr', 'two', 0, D); C.setMark(st, 1, '.'); C.setMark(st, st.round.tokens.length - 1, '?');
  ok(/ \?$/.test(C.render(st)), 'D[fr]: a narrow no-break space before ? by itself');
}

/* ---------------- E. the reshuffle ---------------- */
{
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  let prev = null, perm = true, rep = false;
  for (let p = 0; p < 300; p++) { const o = C.plan(10, rnd, prev); if (o.slice().sort((a, b) => a - b).join() !== '0,1,2,3,4,5,6,7,8,9') perm = false; if (prev && prev.join() === o.join()) rep = true; prev = o; }
  ok(perm && !rep, 'E: 300 passes — permutations, never the previous order');
  const a = C.plan(8, () => 0.999999, null), b = C.plan(8, () => 0.999999, a);
  ok(a.join() !== b.join(), 'E: a stuck generator still never repeats the previous order');
}

/* ---------------- F. the strings ---------------- */
const m = SRC.match(/\/\*STRINGS-BEGIN\*\/strings: (\{[\s\S]*?\}),\/\*STRINGS-END\*\//);
const S = m ? (new Function('return ' + m[1]))() : {};
const KEYS = Object.keys(S);
ok(KEYS.length === 36, `F: 36 string keys (${KEYS.length})`);
for (const k of KEYS) {
  ok(JSON.stringify(Object.keys(S[k]).sort()) === JSON.stringify(LOCALES.slice().sort()), `F: ${k} in all 11 locales`);
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  for (const l of LOCALES) {
    ok(typeof S[k][l] === 'string' && S[k][l].trim().length > 0, `F: ${k}.${l} not empty`);
    ok(ph(S[k][l]) === ph(S[k].en), `F: ${k}.${l} keeps the placeholders ${ph(S[k].en)}`);
    if (l !== 'en') ok(!/common core|ccss|L\.2\./i.test(S[k][l]), `F: ${k}.${l} names no Common Core`);
  }
  ok(!/ [!?:;»]/.test(S[k].fr) && !/« /.test(S[k].fr), `F: ${k}.fr has no plain space before ! ? : ; or after «`);
}
const SHELL = ['title', 'instruction', 'checkBtn', 'instrBubble', 'okBubble'];
const MAPPED = ['qOne', 'qTwo', 'qThree', 'aFull', 'aQuest', 'aExcl', 'aCut', 'aIns', 'aLift', 'aSwap', 'aWheel'];
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, '');
for (const k of KEYS) if (!SHELL.includes(k) && !MAPPED.includes(k)) ok(new RegExp("'" + k + "'").test(body), `F: ${k} is used`);
ok(/Q_KEY: \{ one: 'qOne', two: 'qTwo', three: 'qThree' \}/.test(body) && /TOOL_KEY: \{ '\.': 'aFull', '\?': 'aQuest', '!': 'aExcl', cut: 'aCut', ins: 'aIns', lift: 'aLift', swap: 'aSwap', wheel: 'aWheel' \}/.test(body), 'F: the task lines and the tool names are reached through their maps');
ok(/OK_MS: 500,/.test(SRC), 'F: OK_MS 500');
ok((body.match(/if \(changed\) \{ this\._clearShown\(\);/g) || []).length >= 3 && /_putBack: function \(j\) \{ if \(SentenceClinicCore\.unlift\(this\.st, j\)\) \{ this\._clearShown\(\);/.test(body), 'F: every new move clears the frozen miss marks');
ok(/defaults: \{ level: 'two', line: 'check' \}/.test(SRC), 'F: Level 2 by default; the tune is NOT shown before Check by default');

/* ---------------- G. prose, manifest, html ---------------- */
const ID = 'sentence-clinic.fix-it.l-2-1';
for (const l of LOCALES) {
  const P = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/messages/activity-content/' + l + '.json'), 'utf8')).prose[ID];
  ok(P && P.about.length === 3 && P.practices.length === 4 && P.howToPlay.length === 3 && P.learningGoals.length === 3, `G[${l}]: prose about/practices/howToPlay/learningGoals`);
  const all = JSON.stringify(P || {});
  if (l === 'en') ok(/Common Core L\.2\.1/.test(all), 'G[en]: names Common Core L.2.1');
  else ok(!/common core|ccss|L\.2\.\d/i.test(all), `G[${l}]: no Common Core in the prose`);
  ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmai\p{L}*)(?!\p{L})/iu.test(all), `G[${l}]: no price words in the prose`);
  if (l === 'fr') ok(!/ [!?:;»]/.test(all.replace(/\\u202f/gi, ' ')), 'G[fr]: prose spacing before ! ? : ;');
}
const row = JSON.parse(fs.readFileSync(process.env.SC_MAN || path.join(MT, 'sentence-clinic-activities.json'), 'utf8'));
ok(row.length === 1 && row[0].id === ID && row[0].tool === 'sentence-clinic-activity' && row[0].task_template === 'listening-line' && JSON.stringify(row[0].params) === '{}', 'G: the manifest row (params {})');
for (const k of ['slug', 'page_title', 'page_intro']) ok(LOCALES.every((l) => row[0][k] && typeof row[0][k][l] === 'string' && row[0][k][l].length > 3), `G: ${k} in 11 locales`);
ok(LOCALES.every((l) => /^[a-z0-9-]+$/.test(row[0].slug[l])) && new Set(LOCALES.map((l) => l + '/' + row[0].slug[l])).size === 11, 'G: url-safe slugs');
ok(row[0].alignment.code === 'L.2.1' && row[0].alignment.grade === '2', 'G: aligned to L.2.1, grade 2');
for (const l of ['da', 'no', 'fi']) ok(!/common core|ccss|L\.2/i.test(row[0].page_title[l] + row[0].page_intro[l]), `G[${l}]: new title and intro name no Common Core`);
const HTML = fs.readFileSync(path.join(MT, 'sentence-clinic-activity.html'), 'utf8');
const at = (s) => HTML.indexOf('src="/mini-tools/' + s);
ok(/sentence-clinic-data\.js\?v=\d+/.test(HTML) && /sentence-clinic-core\.js\?v=\d+/.test(HTML) && /sentence-clinic-activity\.js\?v=\d+/.test(HTML) && at('sentence-clinic-data') > 0 && at('sentence-clinic-data') < at('sentence-clinic-core') && at('sentence-clinic-core') < at('sentence-clinic-activity.js'), 'G: the html loads data, core, then the activity, each with ?v=');
ok(!/height:\s*100%/.test(HTML) && !/fix-it-core/.test(HTML), 'G: the html does not pin the root height or load the old core');

console.log(`verify-sentence-clinic-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
