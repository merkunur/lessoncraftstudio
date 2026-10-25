#!/usr/bin/env node
/* =====================================================================
   verify-reach-back-e-core.js — the gate for ACTIVITY #111, The Reach-
   Back e (Add the Magic e, RF.1.3, en only). Its OWN ground truth: a table
   typed here by hand — every word with its vowel and whether a final e
   makes it long (never read from the core) — and the pictures on disk.
     (a) the words: each set has 5 words that take the e and 4 that do
         not; every word's vowel and e-flag are the gate's; every picture
         exists in a colour theme; refused words / pictures are absent
         (cone, vase, dice, flute, the pencil filed as around-the-house/pen);
     (b) the arm: in every rail the hand lands on the vowel socket — two
         places left of the end socket, over exactly one letter; the vowel
         shows its name face only with the e on and a vowel seated;
     (c) Check: every vowel × end (none / e / decoy) of every round is
         right exactly when the gate says; the kinds and hints follow; the
         badge never shows at rest and shows the right face at miss 2;
         miss 2 on a vowel → hintVowel2, never the badge;
     (d) the tray: Pick — the right vowel, a different vowel, the e;
         Given — the vowel seated, the e and a decoy;
     (e) Read and find: exactly one picture is named by the built word;
         the right picture sits where the plan says;
     (f) the plan: a fresh order each pass, sets alternate, the e answer
         never three running; the e tile's slot and Read's right picture
         3/3/3 a pass and never three running in one place; the right
         vowel first in 4 or 5 of nine, never three running;
     (g) the strings: en only, no digit in a hint, never "free", every key
         asked for.
   Usage: node scripts/verify-reach-back-e-core.js   (env RB_CORE_DIR / RB_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.RB_CORE_DIR || MT, ACT_DIR = process.env.RB_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'reach-back-e-core.js'));
const ACT = (() => { const ctx = { window: {}, ReachBackECore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'reach-back-e-activity.js'), 'utf8') + '\n;this.__A = ReachBackEActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
/* the gate's own truth: word → [vowel, takes the final e] */
const TRUTH = {
  kite: ['i', 1], cake: ['a', 1], rose: ['o', 1], cap: ['a', 0], cube: ['u', 1], hat: ['a', 0], pig: ['i', 0], mop: ['o', 0], nose: ['o', 1],
  cape: ['a', 1], plate: ['a', 1], pot: ['o', 0], globe: ['o', 1], slide: ['i', 1], cup: ['u', 0], van: ['a', 0], pen: ['e', 0], whale: ['a', 1]
};
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
let rnd = (() => { let s = 4242; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();

/* ---------------- (a) the words ---------------- */
C.FINISH.forEach((set, si) => {
  is(set.length === 9, `set ${si}: nine words`);
  is(set.filter(([w]) => TRUTH[w] && TRUTH[w][1]).length === 5 && set.filter(([w]) => TRUTH[w] && !TRUTH[w][1]).length === 4, `set ${si}: 5 take the e, 4 do not`);
  set.forEach(([w, other]) => {
    const t = TRUTH[w], s = C.shape(w);
    is(!!t, `${w}: in the gate's table`); if (!t) return;
    is(s.vowel === t[0] && s.needsE === !!t[1] && !((w === 'kite' || w === 'van') && other !== 'u'), `${w}: vowel ${t[0]}, ${t[1] ? 'takes' : 'no'} e (core: ${s.vowel}, ${s.needsE})`);
    is(other !== t[0] && 'aeiou'.indexOf(other) >= 0, `${w}: the other vowel is a different vowel`);
    is(s.base + (s.needsE ? 'e' : '') === w, `${w}: the rail spells the word`);
  });
});
const allWords = new Set(C.FINISH.flat().map(x => x[0]).concat(C.READ.flat()));
allWords.forEach(w => { const p = C.PICS[w]; is(!!p && fs.existsSync(path.join(IMG, p + '@2x.webp')), `${w}: picture on disk (${p})`); is(p && !BW.test(p.split('/')[0].trim()), `${w}: a colour theme`); });
const SRCS = fs.readFileSync(path.join(CORE_DIR, 'reach-back-e-core.js'), 'utf8');
['cone', 'vase', 'dice', 'flute'].forEach(w => is(!allWords.has(w) && !C.PICS[w], `${w} is refused`));
is(C.PICS.pen === 'classroom/pen' && !/'around the house\/pen'/.test(SRCS), 'pen is classroom/pen, never the pencil');

/* ---------------- (b) the arm ---------------- */
C.FINISH.forEach((set, si) => set.forEach((x, r) => {
  const st = C.newState('finish', si, r, {});
  is(C.armTarget(st) === st.vIdx && C.endIdx(st) - C.armTarget(st) === 2 && st.rail[C.armTarget(st)] === null, `${x[0]}: the arm lands on the vowel socket, over one letter`);
  is(C.vowelFace(st) === 'short', `${x[0]}: empty rail → short face`);
  C.setEnd(st, 'e'); is(C.vowelFace(st) === 'short', `${x[0]}: e with no vowel → no name face (the hand waits)`);
  C.setVowel(st, st.answer); is(C.vowelFace(st) === 'name', `${x[0]}: e + vowel → name face`);
  C.clearEnd(st); is(C.vowelFace(st) === 'short', `${x[0]}: e removed → short face again`);
}));

/* ---------------- (c) Check ---------------- */
C.FINISH.forEach((set, si) => set.forEach((x, r) => {
  const [v, e] = TRUTH[x[0]];
  for (const vow of 'aeiou') for (const end of [null, 'e', C.DECOY]) {
    const st = C.newState('finish', si, r, {}); C.setVowel(st, vow); if (end) C.setEnd(st, end);
    const want = vow === v && (end === 'e') === !!e && end !== C.DECOY;
    const res = C.check(st);
    is((res.result === 'ok') === want, `${x[0]} ${vow}${end || ''}: ${want ? 'right' : 'a miss'}`);
    const kind = vow !== v ? 'vowel' : end === C.DECOY ? 'end' : end === 'e' && !e ? 'eExtra' : end !== 'e' && e ? 'eMissing' : 'ok';
    is(st.last === kind, `${x[0]} ${vow}${end || ''}: kind ${kind} (${st.last})`);
    if (kind !== 'ok') {
      is(C.badge(st) === null, `${x[0]} ${vow}${end || ''}: no badge at miss 1`);
      C.check(st);
      const bd = C.badge(st);
      if (kind === 'eExtra' || kind === 'eMissing') is(bd && bd.face === (e ? 'name' : 'short') && bd.vowel === v, `${x[0]}: miss 2 badge shows ${e ? 'name' : 'short'} ${v}`);
      else is(bd === null, `${x[0]} ${kind}: no badge`);
      if (kind === 'vowel') is(C.hint(st).key === 'hintVowel2', `${x[0]}: miss 2 on a vowel → hintVowel2`);
      const h = C.hint(st).key; is(/^hint/.test(h) && ACT.strings[h], `${x[0]} ${kind}: hint ${h} exists`);
      C.setVowel(st, v); is(st.last === null && C.hint(st) === null, `${x[0]}: a new move takes the help away`);
    }
  }
  const s0 = C.newState('finish', si, r, {}); is(C.check(s0).result === 'tray' && s0.misses === 0 && C.hint(s0).key === 'hintEmpty', `${x[0]}: Check with no vowel → hintEmpty, no miss`);
}));

/* ---------------- (d) the tray ---------------- */
C.FINISH.forEach((set, si) => set.forEach((x, r) => {
  for (let slot = 0; slot < 3; slot++) for (const vf of [true, false]) {
    const st = C.newState('finish', si, r, { slot, vFirst: vf });
    const vs = st.tray.filter(t => t.k === 'v').map(t => t.c);
    is(st.tray.length === 3 && st.tray[slot].k === 'e' && vs.length === 2 && vs.includes(TRUTH[x[0]][0]) && vs.includes(x[1]) && (vs[0] === TRUTH[x[0]][0]) === vf, `${x[0]} slot ${slot}: right vowel, other vowel, e in its slot`);
  }
  const g = C.newState('finish', si, r, { vowel: 'given', slot: 1 });
  is(g.given && g.vowel === TRUTH[x[0]][0] && g.tray.length === 2 && g.tray.some(t => t.k === 'e') && g.tray.some(t => t.k === 'c') && C.setVowel(g, 'a') === 'no', `${x[0]}: Vowel given — vowel seated and locked, e + decoy`);
}));

/* ---------------- (e) Read and find ---------------- */
C.READ.forEach((R, i) => {
  is(R.filter(w => w === R[0]).length === 1 && new Set(R).size === 3, `read ${R[0]}: exactly one picture is the word`);
  is(R.every(w => C.PICS[w]), `read ${R[0]}: every picture is listed`);
  for (let pos = 0; pos < 3; pos++) {
    const st = C.newState('read', 0, i, { pos });
    is(st.choices[pos] === R[0] && st.right === pos && C.spelled(st) === R[0], `read ${R[0]} pos ${pos}: the built word and its picture`);
    C.pick(st, (pos + 1) % 3); is(C.check(st).result === 'miss' && C.hint(st).key === 'hintRead', `read ${R[0]}: a wrong picture → hintRead`);
    C.check(st); is(C.hint(st).key === 'hintRead2', `read ${R[0]}: miss 2 → hintRead2`);
    C.pick(st, pos); is(C.check(st).result === 'ok', `read ${R[0]}: the right picture`);
  }
});

/* ---------------- (f) the plan ---------------- */
const three = (p) => p.some((x, i) => i >= 2 && x === p[i - 1] && x === p[i - 2]);
for (const clue of ['finish', 'read']) {
  let prev = null, ok = 0;
  for (let p = 0; p < 400; p++) {
    const P = C.plan(clue, rnd, prev, p), cnt = [0, 0, 0]; P.pos.forEach(x => cnt[x]++);
    let good = JSON.stringify(P.order) !== JSON.stringify(prev) && JSON.stringify(P.order.slice().sort()) === JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8]) && cnt.every(c => c === 3) && !three(P.pos);
    if (clue === 'finish') {
      good = good && P.set === p % 2 && !three(P.order.map(i => TRUTH[C.FINISH[P.set][i][0]][1]));
      const f = P.vFirst.filter(Boolean).length; good = good && (f === 4 || f === 5) && !three(P.vFirst);
    }
    if (good) ok++; prev = P.order;
  }
  is(ok === 400, `${clue} plan: fresh order, sets alternate, slots 3/3/3 never three running, e answer never three running (${ok}/400)`);
}

/* ---------------- (g) strings ---------------- */
const S = ACT.strings, keys = Object.keys(S);
const SRC = fs.readFileSync(path.join(ACT_DIR, 'reach-back-e-activity.js'), 'utf8'), BODY = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + SRCS;
const VIA = ['title', 'instrBubble', 'okBubble', 'hintVowel2', 'hintBadgeShort', 'hintBadgeName', 'hintRead2'];
for (const k of keys) {
  is(VIA.includes(k) || BODY.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
  is(Object.keys(S[k]).join() === 'en' && typeof S[k].en === 'string' && S[k].en.length > 0, `${k}: en only, authored`);
  if (/^hint/.test(k)) is(!/\d/.test(S[k].en), `${k}: a hint carries no digit`);
  is(!/\bfree\b/i.test(S[k].en), `${k}: never "free"`);
}
is(/two \? 'hintVowel2'/.test(SRCS) && /two \? 'hintBadgeShort'/.test(SRCS) && /two \? 'hintBadgeName'/.test(SRCS) && /two \? 'hintRead2'/.test(SRCS), 'the miss-2 keys are reached');
const manifest = JSON.parse(fs.readFileSync(path.join(MT, 'cvc-builder-activities.json'), 'utf8')).find(r => r.id === 'cvc-builder.build-magic-e.rf-1-3-silent-e');
is(manifest && manifest.tool === 'reach-back-e-activity' && Object.keys(manifest.slug).join() === 'en', 'the row ships in en only, on this tool');

console.log(`verify-reach-back-e-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
