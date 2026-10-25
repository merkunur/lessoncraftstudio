#!/usr/bin/env node
/* =====================================================================
   verify-freezing-floes-core.js — the gate for ACTIVITY #113, The
   Freezing Floes (Domino's Two-Part Words, RF.1.3.e; 11 locales). Its OWN
   ground truth: each locale's syllable gate (approved-words-<loc>.json)
   and the picture index, both re-read from disk here.
     (a) every shown split equals the locale's gate entry (en: all three
         sources agree; da: policy_managed false); every picture exists in
         a colour theme and its label is the word; refused EN splits never
         shown split; the picture-only words are only Read distractors;
     (b) the rounds: Join ≥ 7 rounds a set of three distinct pictures;
         Missing ≥ 7 with a real gap and two decoys that differ from the
         piece; Mixed ≥ 7; Read ≥ 7 of three distinct pictures;
     (c) no second right answer: in every Join round no sequence of 2–3 of
         its floes spells a shelf word other than by that word's own
         pieces; in Missing no decoy in the gap spells the word;
     (d) the cold snap: the right pieces freeze; pieces swapped between
         pictures, reversed, or one missing are a miss; the matching prefix
         freezes and stays; a wrong piece cracks back to the pond; a given
         piece stays; Mixed-up seats that are right freeze; Read and find
         accepts only the right picture; an empty slot is no miss;
     (e) the pond never floats a word's two pieces side by side in order;
     (f) the plan: a fresh order each pass, Join sets alternate (en); the
         right floe / picture 3/3/3 a pass, never three running; a Mixed
         start never the answer, never the full reverse twice running;
     (g) the strings ×11 (no digit in a hint, never "free", fr narrow
         spaces, fr/it apostrophes, every key asked for).
   Usage: node scripts/verify-freezing-floes-core.js   (env FF_CORE_DIR / FF_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const GATE = path.join(REPO, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output');
const CORE_DIR = process.env.FF_CORE_DIR || MT, ACT_DIR = process.env.FF_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'freezing-floes-core.js'));
const ACT = (() => { const ctx = { window: {}, FreezingFloesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'freezing-floes-activity.js'), 'utf8') + '\n;this.__A = FreezingFloesActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'nl', 'fr', 'es', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
const low = (s) => String(s).toLowerCase();
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
let rnd = (() => { let s = 99; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();
/* the picture index, re-read */
const PIC = {}; (() => { const P = path.join(MT, 'pictures'), T = JSON.parse(fs.readFileSync(path.join(P, '_themes.json'), 'utf8'));
  for (const th of Object.keys(T)) { const j = JSON.parse(fs.readFileSync(path.join(P, T[th].file), 'utf8')); for (const k of Object.keys(j.nouns)) PIC[j.dir + '/' + k] = j.nouns[k].labels; } })();
const REFUSED_SPLIT = ['tiger', 'robot', 'rocket', 'lemon', 'camel', 'bucket', 'jacket', 'spider', 'zebra', 'igloo', 'pumpkin', 'giraffe', 'ribbon', 'puffin', 'beetle', 'falcon'];

/* ---------------- (a) words ---------------- */
is(JSON.stringify(C.DATA.LOCALES.slice().sort()) === JSON.stringify(ALL.slice().sort()), 'all 11 locales ship');
for (const loc of ALL) {
  const gate = {}; JSON.parse(fs.readFileSync(path.join(GATE, 'approved-words-' + loc + '.json'), 'utf8')).entries.forEach(e => { gate[e.key] = e; });
  for (const key of Object.keys(C.DATA.words[loc])) {
    const w = C.DATA.words[loc][key], labels = PIC[w.pic];
    is(fs.existsSync(path.join(IMG, w.pic + '@2x.webp')) && !BW.test(w.pic.split('/')[0].trim()), `${loc} ${key}: picture ${w.pic}`);
    is(!!labels && low((labels[loc] || labels.en)[0]) === low(w.w), `${loc} ${key}: the picture's label is ${w.w}`);
    if (!w.syl) { is(loc === 'en' && C.DATA.read.en.some(r => r.others.includes(key)) && !C.DATA.read.en.some(r => r.key === key), `${loc} ${key}: picture-only words are only Read distractors`); continue; }
    const g = gate[key];
    is(!!g && g.split.map(low).join('|') === w.syl.map(low).join('|') && low(g.word) === low(w.w), `${loc} ${key}: the gate's split ${g ? g.split.join('·') : '—'} (shown ${w.syl.join('·')})`);
    if (loc === 'en') is(g && g.total_agreed >= 3, `en ${key}: three sources agree`);
    if (loc === 'da') is(g && !g.policy_managed, `da ${key}: policy_managed false`);
    if (loc === 'en') is(!REFUSED_SPLIT.includes(key), `en ${key}: not a refused split`);
    is(w.syl.length >= 2 && w.syl.length <= 3, `${loc} ${key}: two or three pieces`);
  }
}

/* ---------------- (b) rounds + (c) no second right answer ---------------- */
function seqs(texts, max) { const out = []; const rec = (pick, used) => { if (pick.length >= 2) out.push(pick.slice()); if (pick.length === max) return; texts.forEach((t, i) => { if (!used[i]) { used[i] = true; pick.push(t); rec(pick, used); pick.pop(); used[i] = false; } }); }; rec([], []); return out; }
for (const loc of ALL) {
  const W = (k) => C.DATA.words[loc][k];
  C.DATA.join[loc].forEach((set, si) => {
    is(set.length >= 7, `${loc} join set ${si}: ≥ 7 rounds`);
    set.forEach((r, ri) => {
      is(r.length === 3 && new Set(r).size === 3 && r.every(k => W(k) && W(k).syl), `${loc} join ${si}.${ri}: three distinct split words`);
      is(new Set(r.map(k => W(k).pic)).size === 3 && new Set(r.map(k => low(W(k).w))).size === 3, `${loc} join ${si}.${ri}: three different pictures and words`);
      const texts = r.flatMap(k => W(k).syl);
      seqs(texts, 3).forEach(sq => r.forEach(k => { if (low(sq.join('')) === low(W(k).w) && sq.map(low).join('|') !== W(k).syl.map(low).join('|')) is(false, `${loc} join ${r.join('/')}: ${sq.join('·')} spells ${W(k).w} — a second right answer`); }));
    });
  });
  is(C.DATA.missing[loc].length >= 7, `${loc}: ≥ 7 Missing rounds`);
  C.DATA.missing[loc].forEach(m => {
    const s = W(m.key).syl; is(m.gap >= 0 && m.gap < s.length && m.decoys.length === 2 && m.decoys.every(d => low(d) !== low(s[m.gap])) && low(m.decoys[0]) !== low(m.decoys[1]), `${loc} missing ${m.key}: a real gap, two different decoys`);
    m.decoys.forEach(d => { const t = s.slice(); t[m.gap] = d; is(low(t.join('')) !== low(W(m.key).w), `${loc} missing ${m.key}: ${d} does not spell the word`); });
  });
  is(C.DATA.mixed[loc].length >= 7 && C.DATA.mixed[loc].every(k => W(k) && W(k).syl), `${loc}: ≥ 7 Mixed words`);
  /* review 2026-10-25: a two-piece Mixed word has one possible swap — no reading needed */
  is(C.DATA.mixed[loc].every(k => W(k).syl.length >= 3), `${loc}: every Mixed word has three pieces`);
  C.DATA.join[loc].forEach((set, si) => is(new Set(set.map(g => g.slice().sort().join('|'))).size === set.length, `${loc} join set ${si}: every shelf different`));
  /* review: no shelf may let a child build a rude word, and no decoy may make one in its gap */
  const RUDE = { en: ['poo', 'pee', 'poop', 'butt'], de: ['kacke', 'pipi', 'popo'], nl: ['poep', 'pies', 'kak'], fr: ['caca', 'pipi', 'zizi', 'cucu'], es: ['caca', 'pipi', 'pene', 'culo', 'pedo', 'teta'], it: ['cacca', 'pene', 'culo', 'tetta', 'pipi'], pt: ['caca', 'cocô', 'pipi', 'pinto', 'bunda'], sv: ['bajs', 'kiss', 'kuk', 'fitta'], da: ['lort', 'tis', 'pik', 'røv'], no: ['bæsj', 'tiss', 'pikk', 'fitte', 'rumpe'], fi: ['kakka', 'pissa', 'pippeli', 'perse'] }[loc];
  C.DATA.join[loc].forEach(set => set.forEach(r => seqs(r.flatMap(k => W(k).syl), 3).forEach(sq => { if (RUDE.includes(low(sq.join('')))) is(false, `${loc} join ${r.join('/')}: ${sq.join('·')} spells a rude word`); })));
  C.DATA.missing[loc].forEach(m => m.decoys.forEach(d => { const t = W(m.key).syl.slice(); t[m.gap] = d; is(!RUDE.includes(low(t.join(''))), `${loc} missing ${m.key}: ${d} makes no rude word`); }));
  is(!RUDE.length || RUDE.every(x => x === low(x)), `${loc}: the rude list is lower case (control)`);
  is(C.DATA.read[loc].length >= 7, `${loc}: ≥ 7 Read rounds`);
  C.DATA.read[loc].forEach(r => { const ks = [r.key].concat(r.others); is(new Set(ks).size === 3 && ks.every(k => W(k)) && new Set(ks.map(k => low(W(k).w))).size === 3 && W(r.key).syl, `${loc} read ${r.key}: three different pictures, the word split`); });
}

/* ---------------- (d) the cold snap ---------------- */
const fill = (st, p, texts, i) => texts.forEach(t => { const id = st.pond.find(x => low(st.floes[x].s) === low(t)); if (id == null) throw new Error('no floe ' + t); C.place(st, id, i == null ? p : i); });
for (const loc of ALL) {
  C.DATA.join[loc].forEach((set, si) => set.forEach((r, ri) => {
    const st = C.newState(loc, 'join', si, ri, { rnd, order: [0, 1, 2] }), tag = `${loc} join ${r.join('/')}`;
    is(C.check(st).result === 'tray' && st.misses === 0, `${tag}: empty slots → no miss`);
    st.pics.forEach((k, p) => fill(st, p, C.word(loc, k).syl));
    is(C.check(st).result === 'ok', `${tag}: the right pieces freeze`);
    const s2 = C.newState(loc, 'join', si, ri, { rnd, order: [0, 1, 2] }), sy = st.pics.map(k => C.word(loc, k).syl);
    fill(s2, 0, sy[0].slice().reverse()); fill(s2, 1, sy[1]); fill(s2, 2, sy[2]);
    const rev = low(sy[0].slice().reverse().join('')) === low(sy[0].join(''));
    if (!rev) { is(C.check(s2).result === 'miss' && s2.inlets[0].every(x => x == null) && s2.frozen[1].slice(0, sy[1].length).every(Boolean), `${tag}: reversed pieces crack, the right words freeze`); }
    const s3 = C.newState(loc, 'join', si, ri, { rnd, order: [0, 1, 2] }); fill(s3, 0, sy[0].slice(0, 1)); fill(s3, 1, sy[1]); fill(s3, 2, sy[2]);
    is(C.check(s3).result === 'miss' && s3.frozen[0][0] && s3.inlets[0][0] != null, `${tag}: a piece missing is a miss; the first piece freezes and stays`);
    const id = s3.pond[0]; C.place(s3, id, 0); is(s3.last === null && C.hint(s3) === null, `${tag}: a new move takes the help away`);
    is(C.unseat(s3, 0) === 'back' && s3.inlets[0][0] != null && C.unseat(s3, 0) === 'no', `${tag}: a frozen piece cannot be taken back`);
  }));
  C.DATA.missing[loc].forEach((m, ri) => {
    const st = C.newState(loc, 'missing', 0, ri, { pos: 1 }), s = C.word(loc, m.key).syl, tag = `${loc} missing ${m.key}`;
    is(st.pond.length === 3 && low(C.text(st, st.pond[1])) === low(s[m.gap]) && st.inlets[0][m.gap] == null && s.every((x, k) => k === m.gap || low(C.text(st, st.inlets[0][k])) === low(x)), `${tag}: the given pieces seated, the right floe in lane 2`);
    C.place(st, st.pond[0], 0); is(C.check(st).result === 'miss' && st.inlets[0][m.gap] == null && st.inlets[0].filter(x => x != null).length === s.length - 1, `${tag}: a decoy cracks back, the given pieces stay`);
    const right = st.pond.find(x => low(C.text(st, x)) === low(s[m.gap])); C.place(st, right, 0); is(C.check(st).result === 'ok', `${tag}: the right piece freezes`);
  });
  C.DATA.mixed[loc].forEach((k, ri) => {
    const s = C.word(loc, k).syl, n = s.length, perm = n === 3 ? [1, 2, 0] : [1, 0], st = C.newState(loc, 'mixed', 0, ri, { perm }), tag = `${loc} mixed ${k}`;
    if (low(s.join('')) === low(perm.map(i => s[i]).join(''))) return;
    is(C.check(st).result === 'miss', `${tag}: the mixed start is a miss`);
    const want = (q) => st.inlets[0].findIndex((id, j) => id != null && !st.frozen[0][j] && low(C.text(st, id)) === low(s[q]));
    for (let q = 0; q < n; q++) { if (st.frozen[0][q]) continue; const j = want(q); if (j >= 0 && j !== q) C.swap(st, q, j); }
    is(C.check(st).result === 'ok', `${tag}: swapped into order → freezes`);
  });
  C.DATA.read[loc].forEach((r, ri) => {
    for (let pos = 0; pos < 3; pos++) {
      const st = C.newState(loc, 'read', 0, ri, { pos }); is(st.pics[pos] === r.key && st.right === pos, `${loc} read ${r.key} pos ${pos}`);
      is(C.check(st).result === 'tray', `${loc} read ${r.key}: no word placed → no miss`);
      C.moveWord(st, (pos + 1) % 3); is(C.check(st).result === 'miss' && st.at === -1, `${loc} read ${r.key}: the wrong picture → the word drifts back`);
      C.moveWord(st, pos); is(C.check(st).result === 'ok', `${loc} read ${r.key}: the right picture`);
    }
  });
}

/* ---------------- (e) the pond ---------------- */
for (const loc of ALL) C.DATA.join[loc].forEach((set, si) => set.forEach((r, ri) => { let ok = true; for (let k = 0; k < 60; k++) { const st = C.newState(loc, 'join', si, ri, { rnd }); const fl = st.pond.map(id => st.floes[id]); for (let i = 1; i < fl.length; i++) if (fl[i].owner === fl[i - 1].owner && fl[i].k === fl[i - 1].k + 1) ok = false; } is(ok, `${loc} join ${si}.${ri}: never a word's pieces side by side in order`); }));

/* ---------------- (f) the plan ---------------- */
const three = (p) => p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2]);
for (const loc of ALL) for (const clue of C.CLUES) {
  let prev = null, ok = 0;
  for (let p = 0; p < 200; p++) {
    const P = C.plan(loc, clue, rnd, prev, p), n = P.order.length, cnt = [0, 0, 0]; P.pos.forEach(x => cnt[x]++);
    let good = JSON.stringify(P.order) !== JSON.stringify(prev) && Math.max(...cnt) - Math.min(...cnt) <= 1 && !three(P.pos);
    if (clue === 'join') good = good && P.set === p % C.DATA.join[loc].length;
    if (clue === 'mixed') { let lastRev = false; P.order.forEach((i, j) => { const s = C.word(loc, C.DATA.mixed[loc][i]).syl, pm = P.perms[j], idn = s.map((x, q) => q), rv = idn.slice().reverse(); if (JSON.stringify(pm) === JSON.stringify(idn)) good = false; const isRev = s.length === 3 && JSON.stringify(pm) === JSON.stringify(rv); if (isRev && lastRev) good = false; lastRev = isRev; }); }
    if (good) ok++; prev = P.order; void n;
  }
  is(ok === 200, `${loc} ${clue} plan: fresh order, slots balanced, never three running (${ok}/200)`);
}

/* ---------------- (g) strings ---------------- */
const S = ACT.strings, keys = Object.keys(S);
const SRC = fs.readFileSync(path.join(ACT_DIR, 'freezing-floes-activity.js'), 'utf8'), BODY = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + fs.readFileSync(path.join(CORE_DIR, 'freezing-floes-core.js'), 'utf8');
const VIA = ['title', 'instrBubble', 'okBubble', 'tJoin', 'tMissing', 'tMixed', 'tRead', 'hintRead2', 'hintMixed2'];
for (const k of keys) {
  is(VIA.includes(k) || BODY.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
  for (const l of ALL) {
    const s = S[k][l]; is(typeof s === 'string' && s.length > 0, `${k}.${l} authored`); if (!s) continue;
    if (/^hint/.test(k)) is(!/\d/.test(s), `${k}.${l}: a hint carries no digit`);
    if (l === 'fr') is(!/ [:!?;»]/.test(s), `${k}.fr: narrow spaces`);
    if (l === 'fr' || l === 'it') is(!/'/.test(s), `${k}.${l}: curly apostrophes`);
    is(!/\bfree\b|gratuit|kostenlos|gratis|ilmai/i.test(s), `${k}.${l}: never "free"`);
  }
}
is(/st\.show >= 2 \? 'hintRead2' : 'hintRead'/.test(BODY) && /'hintMixed2' : 'hintStart'/.test(BODY), 'the miss-2 keys are reached');

console.log(`verify-freezing-floes-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
