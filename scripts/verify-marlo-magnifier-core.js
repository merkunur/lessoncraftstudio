#!/usr/bin/env node
/* =====================================================================
   verify-marlo-magnifier-core.js — the gate for ACTIVITY #117, The Lens
   That Finds, Then Focuses (Marlo's Magnifier, RL.1.3; all 11 locales).
   Its OWN ground truth: the en proofs, answers and their sentences are
   written out here; the bots are re-measured with this gate's own
   tokenizer, not the builder's.
     (a) the rounds: eight per locale; one ringed word in every claim and
         question; every clue that comes from the story shares a word with
         the sentence it names; no did-not-happen card is a story sentence;
         every picture exists in a colour theme;
     (b) the en truth;
     (c) the lens: for EVERY card of EVERY case — a did-not-happen card
         fogs (found nowhere), an in-story card lights its own sentence, only
         the right card brings focus and finishes; an empty Check is no miss;
         one card under the lens at a time; the help (the key sentence
         underlined) only from miss 2 and gone after a new move; the sweep
         hops the sentences in order up to the one it finds;
     (d) the bots: the right card is never the longest / shortest / most
         story-like in more than 3 of 8 rounds, per case and locale;
     (e) the plan: a fresh order every pass, the right card's slot balanced
         and moved by one each pass;
     (f) the strings ×11 (no digit in a hint, never "free", fr narrow spaces,
         fr/it ’, every key asked for), the manifest row (en frozen, 11
         locales).
   Usage: node scripts/verify-marlo-magnifier-core.js   (env MM_CORE_DIR / MM_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.MM_CORE_DIR || MT, ACT_DIR = process.env.MM_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'marlo-magnifier-core.js'));
const ACT = (() => { const ctx = { window: {}, MarloLensCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'marlo-magnifier-activity.js'), 'utf8') + '\n;this.__A = window.MarloMagnifierActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'], LV = ['proof', 'detail', 'questions'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const rnd = (() => { let s = 5; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();
/* this gate's own tokenizer: content words (its own function-word lists), first four letters — a word-matching child
   matches the story's names and things, not its "the" and "in" */
const FN = {
  en: 'a an and as at be by for from had has he her his in into is it its no not of off on or out she so that the their them then they this to up was when with',
  de: 'als am an auf bei das dass dem den der des die ein eine einem einen einer er es hat hatte ihm ihn ihr ihre im in ist mit nicht noch oder sich sie so und von vor war was wie zu',
  fr: 'a au aux avec ce d dans de des du elle en est et il ils l la le les lui n ne pas plus qu que qui s sa se ses son sur un une y',
  es: 'a al con de del el en era es fue la las le lo los muy no o que se su sus un una unos y',
  pt: 'a as com da das de do dos e ela ele em era foi na nas no nos não o os para que se sua seu um uma é',
  it: 'a al alla che con da del della di e era gli ha i il in la lo non o per si su sua suo un una uno è',
  nl: 'aan dat de een en er had haar heeft het hij in is met niet of om op te van voor was ze zich zij zijn',
  sv: 'att av de den det en ett för hade han hon i inte med och på sin sina sitt som till var är',
  da: 'af at de den det en er et for han havde hun i ikke med og på sin sine sit som til var',
  no: 'av de den det en er et for hadde han hun i ikke med og på sin sine sitt som til var å',
  fi: 'ei että hän hänen ja kun oli on se sen sitä'
};
let STOPW = new Set();
const toks = (s) => [...new Set(String(s).toLowerCase().normalize('NFC').split(/[^\p{L}\p{N}]+/u).filter(w => w.length >= 2 && !STOPW.has(w)).map(w => w.slice(0, 4)))];
const share = (a, b) => { const B = toks(b); return toks(a).filter(w => B.includes(w)).length; };
const text = (c) => c.pre + c.word + c.post;

/* ---------------- (b) the en truth ---------------- */
const EN = [
  ['Mira is brave.', 'She went right into the dark cave.', 0, 'Where did Mira go?', 'into the dark cave', 0],
  ['Sam is kind.', 'Sam gave the new kid some of his food.', 1, 'Who sat all alone at lunch?', 'a new kid', 0],
  ['Lena is curious.', 'She asked the teacher how the rock was made.', 2, 'What did Lena find?', 'a strange, shiny rock', 0],
  ['Theo is careful.', 'He walked with tiny, slow steps.', 1, 'Why did Theo walk slowly?', 'The floor was slippery and wet.', 0],
  ['Ada is patient.', 'She waited and waited until it grew.', 2, 'When did Ada water the seed?', 'every single morning', 1],
  ['Bo is honest.', 'He told his mom the truth.', 0, 'What did Bo break?', 'a vase', 1],
  ['Nina is generous.', 'She handed two of her stickers over.', 2, 'How many stickers did Nina give away?', 'two', 2],
  ['Max is hardworking.', 'He raked leaves all afternoon long.', 0, 'How long did Max rake the leaves?', 'all afternoon', 0]
];
C.DATA.en.forEach((F, i) => {
  const T = EN[i];
  is(text(F.claim) === T[0] && F.proof.t === T[1] && F.proof.s === T[2], `en r${i + 1}: the claim and its proof`);
  is(text(F.q) === T[3] && F.ans.t === T[4] && F.ans.s === T[5], `en r${i + 1}: the question and its answer`);
});

/* ---------------- (a) the rounds ---------------- */
is(JSON.stringify(C.DATA.LOCALES) === JSON.stringify(ALL), 'the eleven locales');
for (const loc of ALL) {
  STOPW = new Set(FN[loc].split(" ")); const R = C.DATA[loc]; is(R && R.length === 8, `${loc}: eight rounds`);
  const src = [0, 0, 0];
  R.forEach((F, i) => {
    const tag = `${loc} r${i + 1}`;
    is(F.story.length === 3 && F.story.every(s => s.length > 8), `${tag}: three sentences`);
    for (const c of [F.claim, F.q]) is(c.word && c.word.trim() && !/[\[\]]/.test(text(c)), `${tag}: one ringed word «${c.word}»`);
    is(toks(F.claim.word).every(w => !toks(F.proof.t).includes(w)), `${tag}: the proof does not name the trait`);
    for (const [c, what] of [[F.proof, 'proof'], [F.ins, 'in-story card'], [F.ans, 'answer']].concat(F.wr.map(w => [w, 'wrong answer']))) {
      is(c.s >= 0 && c.s <= 2 && share(c.t, F.story[c.s]) >= 1, `${tag}: the ${what} «${c.t}» comes from sentence ${c.s + 1}`);
    }
    src[F.proof.s]++;
    F.dnh.forEach(d => is(!F.story.some(s => s.replace(/[.!?\s ]+$/, '') === d.replace(/[.!?\s ]+$/, '')), `${tag}: «${d}» is not a story sentence`));
    is(F.dnh.some(d => share(d, F.story.join(' ')) >= 2), `${tag}: a did-not-happen card reuses the story's words`);
    is(F.wr.every(w => w.t !== F.ans.t), `${tag}: no wrong card is the answer`);
    if (F.pic) is(fs.existsSync(path.join(IMG, F.pic + '@2x.webp')) && !BW.test(F.pic.split('/')[0].trim()), `${tag}: picture ${F.pic} exists in a colour theme`);
  });
  is(Math.max(...src) <= 3, `${loc}: the proofs come from every sentence (${src})`);
}

/* ---------------- (c) the lens ---------------- */
for (const loc of ALL) for (const lv of LV) for (let r = 0; r < 8; r++) for (let slot = 0; slot < 3; slot++) {
  const tag = `${loc} ${lv} r${r + 1} slot ${slot + 1}`, s0 = C.newState(loc, lv, r, { slot }), F = s0.F;
  is(s0.cards.length === 3 && s0.cards[slot].ok && s0.right === slot && s0.cards.filter(c => c.ok).length === 1, `${tag}: the right card at its slot`);
  const want = lv === 'questions' ? [F.ans.t].concat(F.wr.map(w => w.t)) : lv === 'detail' ? [F.proof.t, F.ins.t, F.dnh[0]] : [F.proof.t, F.dnh[0], F.dnh[1]];
  is(s0.cards.map(c => c.t).sort().join('|') === want.slice().sort().join('|') && s0.cards[slot].t === want[0], `${tag}: the case's three cards`);
  if (slot) continue;
  const e = C.newState(loc, lv, r); is(C.check(e).result === 'empty' && e.misses === 0 && C.hint(e).key === 'hintEmpty', `${tag}: an empty Check is no miss`);
  s0.cards.forEach((c, i) => {
    const st = C.newState(loc, lv, r, { slot: 0 });
    is(C.drop(st, i) === 'in' && st.clip === i && st.found === null && !st.focus, `${tag}: a card under the lens, nothing found before Check`);
    C.drop(st, (i + 1) % 3); is(st.clip === (i + 1) % 3, `${tag}: one card at a time`); C.drop(st, i);
    const res = C.check(st);
    const inStory = want.indexOf(c.t) !== -1 && !(lv !== 'questions' && F.dnh.includes(c.t));
    const srcOf = c.t === F.proof.t ? F.proof.s : c.t === F.ins.t ? F.ins.s : c.t === F.ans.t ? F.ans.s : (F.wr.find(w => w.t === c.t) || {}).s;
    if (!inStory) is(res.result === 'miss' && st.fog && st.found === null && !st.focus && C.hint(st).key === 'hintFog', `${tag}: «${c.t}» did not happen → the lens fogs`);
    else is(st.found === srcOf && !st.fog, `${tag}: «${c.t}» → the lens finds sentence ${srcOf + 1}`);
    const right = c.t === want[0];
    is((res.result === 'ok') === right && st.done === right && st.focus === right, `${tag}: «${c.t}» → ${right ? 'focus, solved' : 'no focus'}`);
    if (inStory && !right) is(C.hint(st).key === (lv === 'questions' ? 'hintNotAnswer' : 'hintNotProof'), `${tag}: the in-story hint`);
    const sw = C.sweep(st);
    if (st.found == null) is(sw.join() === '0,1,2,fog', `${tag}: the sweep passes every sentence, then fogs`);
    else is(sw.slice(0, -1).join() === Array.from({ length: srcOf + 1 }, (x, k) => k).join() && sw[sw.length - 1] === 'claim', `${tag}: the sweep hops to sentence ${srcOf + 1}, then the claim`);
    if (!right) {
      is(!C.help(st), `${tag}: no help at miss 1`);
      C.check(st); is(C.help(st) && C.keySentence(st) === want.indexOf(want[0]) + (lv === 'questions' ? F.ans.s : F.proof.s) && C.hint(st).key === (lv === 'questions' ? 'hintMiss2Q' : 'hintMiss2'), `${tag}: miss 2 underlines the key sentence`);
      C.drop(st, (i + 1) % 3); is(!C.help(st), `${tag}: a new move takes the help away`);
    }
  });
}

/* ---------------- (d) the bots ---------------- */
for (const loc of ALL) for (const lv of LV) {
  STOPW = new Set(FN[loc].split(" ")); let long = 0, short = 0, over = 0;
  for (let r = 0; r < 8; r++) {
    const st = C.newState(loc, lv, r), L = st.cards.map(c => c.t.length), m = L[st.right], all = st.F.story.join(' ');
    const O = st.cards.map(c => share(c.t, all)), top = (v) => { const b = Math.max(...v); const t = v.map((x, i) => x === b ? i : -1).filter(i => i >= 0); return t.includes(st.right) ? 1 / t.length : 0; };
    long += top(L); short += top(L.map(x => -x)); if (lv !== 'questions') over += top(O);
  }
  is(long <= 3 && short <= 3, `${loc} ${lv}: the right card longest ${long.toFixed(2)} / shortest ${short.toFixed(2)} of 8 (≤ 3)`);
  if (lv !== 'questions') is(over <= 3, `${loc} ${lv}: the most story-like card is right ${over.toFixed(2)} of 8 (≤ 3)`);
}

/* ---------------- (e) the plan ---------------- */
for (const loc of ALL) for (const lv of LV) {
  let prev = null;
  for (let pass = 0; pass < 6; pass++) {
    const P = C.plan(loc, lv, rnd, prev, pass);
    is(P.order.length === 8 && new Set(P.order).size === 8, `${loc} ${lv}: a pass is the eight rounds`);
    if (prev) is(P.order.join() !== prev.join(), `${loc} ${lv} pass ${pass}: a fresh order`);
    const n = [0, 0, 0]; P.slots.forEach(x => n[x]++); is(Math.max(...n) <= 3, `${loc} ${lv} pass ${pass}: the right card's slot balanced (${n})`);
    is(P.slots.every((x, r) => x === (C.SLOTS[lv][r] + pass) % 3), `${loc} ${lv} pass ${pass}: the slot table moves by one each pass`);
    prev = P.order;
  }
}
const firsts = new Set(); for (let k = 0; k < 40; k++) firsts.add(C.plan('en', 'proof', Math.random, null, 0).order[0]); is(firsts.size >= 4, 'the first story varies between visits');

/* ---------------- (f) strings, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'marlo-magnifier-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'marlo-magnifier-core.js'), 'utf8');
const SH = ['title', 'instruction', 'instrBubble', 'okBubble'];
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 28, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^nudge/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(SH.indexOf(k) >= 0 || CSRC.indexOf("'" + k + "'") >= 0 || SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '').indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
for (const loc of ['fr', 'it']) C.DATA[loc].forEach((F, i) => is(![text(F.claim), text(F.q), F.proof.t, F.ins.t, F.ans.t].concat(F.dnh, F.story, F.wr.map(w => w.t)).some(s => /'/.test(s)), `${loc} r${i + 1}: ’ in the text`));
const row = JSON.parse(fs.readFileSync(path.join(MT, 'marlo-magnifier-activities.json'), 'utf8')).find(x => x.id === 'marlo-magnifier.trait-evidence.rl-1-3');
is(row && row.tool === 'marlo-magnifier-activity', 'the manifest row');
is(row && Object.keys(row.slug).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'marlos-magnifier' && row.page_title.en === "Marlo's Magnifier — Show Me the Proof (Grade 1)", 'the en metadata is frozen');

console.log(`verify-marlo-magnifier-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
