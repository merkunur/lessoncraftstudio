#!/usr/bin/env node
/* =====================================================================
   verify-mending-basket-core.js — the gate for ACTIVITY #115, The Thread
   That Snaps (Granny's Mending Basket, RF.1.4.a; all 11 locales). Its OWN
   ground truth: the en answers, keystones, wrong words, truth values, Do
   operations and story answers written out here; the picture index
   re-read from disk.
     (a) the rounds: nine per clue in every locale; every keystone / cue is
         a word of its sentence (once); Fill's keystone comes before the
         gap; three different pieces; the soup minimal pair (same pieces,
         opposite answers); every picture exists in a colour theme;
     (b) the en truth: answers, keystones, wrong words, truth, ops, stories;
         every locale shares the en scenes, truth and proofs;
     (c) Do: enumerating EVERY ring / placement, the rounds are satisfied in
         exactly the expected number of ways (index rounds once, "two" in
         C(5,2) ways, places once) and nothing else passes;
     (d) the thread: every piece but the answer snaps at the keystone and
         the hole; Fix: a right word "fixed" snaps between it and the
         keystone; True: only the right tool sews / cuts; an empty Check is
         no miss; the help (keystone glow, proof, counts) only from miss 2
         and gone after a new move; the healed sentence;
     (e) the bots: always-longest / always-shortest piece ≤ 4 of 9;
     (f) the plan: a fresh order, the right piece's slot 3/3/3 never twice
         running, True never four of one running, story questions in story
         order;
     (g) the strings ×11 (no digit in a hint, never "free", fr narrow
         spaces, fr/it ’), the manifest row (en frozen, 11 locales).
   Usage: node scripts/verify-mending-basket-core.js   (env MB_CORE_DIR / MB_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.MB_CORE_DIR || MT, ACT_DIR = process.env.MB_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'mending-basket-core.js'));
const ACT = (() => { const ctx = { window: {}, MendingBasketCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'mending-basket-activity.js'), 'utf8') + '\n;this.__A = MendingBasketActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'nl', 'fr', 'es', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
const low = (s) => String(s).toLowerCase();
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const rnd = (() => { let s = 11; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();
const PIC = {}; (() => { const P = path.join(MT, 'pictures'), T = JSON.parse(fs.readFileSync(path.join(P, '_themes.json'), 'utf8'));
  for (const th of Object.keys(T)) { const j = JSON.parse(fs.readFileSync(path.join(P, T[th].file), 'utf8')); for (const k of Object.keys(j.nouns)) PIC[j.dir + '/' + k] = j.nouns[k].labels; } })();
const picOk = (p) => !!PIC[p] && fs.existsSync(path.join(IMG, p + '@2x.webp')) && !BW.test(p.split('/')[0].trim());

/* ---------------- the gate's own truth (en) ---------------- */
const OWN = {
  fill: { ans: ['carefully', 'cool', 'warm', 'lamp', 'sky', 'coat', 'tree', 'water', 'hot'], key: ['tiny', 'hot', 'cold', 'dark', 'flew', 'cold', 'nest', 'thirsty', 'melted'] },
  fix: { ans: ['dry', 'warm', 'short', 'slow', 'dark', 'full', 'wet', 'happy', 'sleepy'], wrong: ['wet', 'cold', 'tall', 'fast', 'bright', 'empty', 'dry', 'sad', 'awake'] },
  who: { ans: ['the dog', 'the mouse', 'the seeds', 'the cup', 'the frog', 'they', 'the cow', 'the dog', 'Mia'] },
  truth: [false, true, false, true, false, true, false, true, true],
  ops: [
    [['place', 'animals/cat', 'under']], [['place', 'animals/cat', 'on']], [['place', 'toys/ball', 'beside']],
    [['ring', 'red', 'count', 2]], [['ring', 'blue', 'index', 2]], [['ring', 'yellow', 'index', 1]],
    [['place', 'beach/sun', 'above'], ['place', 'animals/cat', 'front']], [['ring', 'red', 'count', 1], ['ring', 'blue', 'count', 2]],
    [['place', 'camping/frog', 'on'], ['place', 'spring/bird', 'above']]
  ],
  ways: [1, 1, 1, 10, 1, 1, 1, 30, 1],
  story: ['a seed', 'one morning', 'by the window', 'Mia', 'the wind blew hard', 'a long stick', 'it rained', 'whales', 'jumped in the puddles'],
  proof: [[0], [2], [3], [2, 3], [1], [2], [0, 1], [1], [3]]
};

/* ---------------- (a) + (b) the rounds ---------------- */
is(JSON.stringify(C.DATA.LOCALES.slice().sort()) === JSON.stringify(ALL.slice().sort()), 'all 11 locales ship');
const en = C.DATA.en;
en.fill.forEach((r, i) => { is(r.ans === OWN.fill.ans[i] && low(C.word(r.tok, r.key)) === OWN.fill.key[i], `en fill ${i}: ${r.ans} / keystone ${OWN.fill.key[i]}`); });
en.fix.forEach((r, i) => { is(r.ans === OWN.fix.ans[i] && r.tok[r.wrong].t === OWN.fix.wrong[i], `en fix ${i}: [${OWN.fix.wrong[i]}] → ${r.ans}`); });
en.who.forEach((r, i) => is(r.ans === OWN.who.ans[i], `en who ${i}: ${r.ans}`));
en.story.forEach((r, i) => is(r.ans === OWN.story[i] && JSON.stringify(r.proof) === JSON.stringify(OWN.proof[i]), `en story ${i}: ${r.ans}, proof ${OWN.proof[i]}`));
C.DATA.SH.true.forEach((s, i) => is(s.truth === OWN.truth[i], `true ${i}: ${OWN.truth[i]}`));
C.DATA.SH.do.forEach((s, i) => is(JSON.stringify(s.ops.map(o => o.op === 'place' ? ['place', o.sticker, o.zone] : ['ring', o.colour, o.count != null ? 'count' : 'index', o.count != null ? o.count : o.index])) === JSON.stringify(OWN.ops[i]), `do ${i}: the operations`));
is(OWN.truth.filter(Boolean).length === 5, 'True or not: five true, four not');
for (const loc of ALL) {
  const L = C.DATA[loc];
  for (const k of C.CLUES) is(L[k].length === 9, `${loc} ${k}: nine rounds`);
  const word = (tok, i) => C.word(tok, i);
  ['fill', 'who'].forEach(k => L[k].forEach((r, i) => {
    is(r.tok.filter(t => t.gap).length === 1 && r.tok[r.gap].gap, `${loc} ${k} ${i}: one gap`);
    const kw = word(r.tok, r.key); is(kw && r.tok.filter(t => t.t != null && low(C.word([t], 0)) === low(kw)).length === 1, `${loc} ${k} ${i}: the keystone «${kw}» is one word of the sentence`);
    if (k === 'fill') is(r.key < r.gap, `${loc} fill ${i}: the keystone comes before the gap`);
    is(r.pieces.length === 3 && r.pieces[0] === r.ans && new Set(r.pieces.map(low)).size === 3, `${loc} ${k} ${i}: three different pieces`);
    r.pics.forEach(p => is(picOk(p.pic), `${loc} ${k} ${i}: colour picture ${p.pic}`));
  }));
  is(JSON.stringify(L.fill[1].pieces.slice().sort()) === JSON.stringify(L.fill[2].pieces.slice().sort()) && L.fill[1].ans !== L.fill[2].ans && L.fill[1].ans === L.fill[2].pieces[1] && L.fill[2].ans === L.fill[1].pieces[1], `${loc}: the soup minimal pair (same pieces, opposite answers)`);
  L.fix.forEach((r, i) => {
    is(r.tok.filter(t => t.fix).length === 1 && r.tok[r.wrong].fix && r.key !== r.wrong, `${loc} fix ${i}: one wrong word, not the keystone`);
    is(r.pieces[0] === r.ans && new Set(r.pieces.map(low)).size === 3 && low(r.tok[r.wrong].t) !== low(r.ans), `${loc} fix ${i}: three pieces, the right one is not the wrong word`);
    r.pics.forEach(p => is(picOk(p.pic), `${loc} fix ${i}: colour picture ${p.pic}`));
  });
  L.do.forEach((r, i) => {
    is(r.cue.length === C.DATA.SH.do[i].ops.length, `${loc} do ${i}: a cue per operation`);
    r.cue.forEach(c => Object.keys(c).forEach(k => is(Number.isInteger(c[k]) && r.tok[c[k]] && r.tok[c[k]].t != null, `${loc} do ${i}: the ${k} cue is a word of the instruction`)));
  });
  L.true.forEach((r, i) => is(r.tok[r.key] && r.tok[r.key].t != null, `${loc} true ${i}: the deciding word is in the sentence`));
  L.story.forEach((r, i) => {
    is(r.s.length === 4 && JSON.stringify(r.proof) === JSON.stringify(OWN.proof[i]), `${loc} story ${i}: four sentences, the en proof`);
    is(r.pieces[0] === r.ans && new Set(r.pieces.map(low)).size === 3, `${loc} story ${i}: three different answers`);
  });
  for (const c of ['red', 'blue', 'yellow', 'green']) is(!!L.colours[c], `${loc}: the crayon ${c} has a name`);
  /* (e) the bots */
  for (const k of ['fill', 'fix', 'who', 'story']) {
    const ext = (f) => L[k].reduce((s, r) => { const m = f(...r.pieces.map(p => p.length)), h = r.pieces.filter(p => p.length === m); return s + (h.indexOf(r.ans) >= 0 ? 1 / h.length : 0); }, 0);
    is(ext(Math.max) <= 4 && ext(Math.min) <= 4, `${loc} ${k}: the longest bot ${ext(Math.max).toFixed(2)}, the shortest ${ext(Math.min).toFixed(2)} ≤ 4 of 9`);
  }
}
Object.values(C.DATA.SH.do).forEach((s, i) => [...(s.row || []), ...(s.anchor ? [s.anchor] : []), ...(s.stickers || [])].forEach(p => is(picOk(p), `do ${i}: colour picture ${p}`)));
C.DATA.SH.true.forEach((s, i) => [...(s.row || []), ...(s.anchor ? [s.anchor] : []), ...(s.placed || []).map(x => x[0])].forEach(p => is(picOk(p), `true ${i}: colour picture ${p}`)));

/* ---------------- (c) Do: every ring / placement enumerated ---------------- */
C.DATA.SH.do.forEach((S, i) => {
  let pass = 0, total = 0;
  if (S.row) {
    const n = S.row.length, K = S.crayons.length + 1;
    for (let code = 0; code < Math.pow(K, n); code++) {
      const st = C.newState('en', 'do', i); let x = code, any = false;
      for (let p = 0; p < n; p++) { const c = x % K; x = Math.floor(x / K); if (c) { st.rings[p] = S.crayons[c - 1]; any = true; } }
      total++; if (!any) continue; if (C.check(st).result === 'ok') pass++;
    }
  } else {
    const k = S.stickers.length, Z = ['none'].concat(C.ZONES);
    for (let code = 0; code < Math.pow(Z.length, k); code++) {
      const st = C.newState('en', 'do', i); let x = code, clash = false, used = {};
      for (let p = 0; p < k; p++) { const z = Z[x % Z.length]; x = Math.floor(x / Z.length); if (z !== 'none') { if (used[z]) clash = true; used[z] = 1; st.placed[S.stickers[p]] = z; } }
      if (clash || !Object.keys(st.placed).length) continue; total++; if (C.check(st).result === 'ok') pass++;
    }
  }
  is(pass === OWN.ways[i], `do ${i}: satisfied in exactly ${OWN.ways[i]} way(s) of ${total} (${pass})`);
  /* the gate's own solution passes: rings exactly where OWN says (counted from the child's left), stickers in OWN's places */
  const own = C.newState('en', 'do', i);
  OWN.ops[i].forEach(o => { if (o[0] === 'place') own.placed[o[1]] = o[2]; else if (o[2] === 'index') own.rings[o[3]] = o[1]; else { let n = o[3]; for (let p = 0; n && p < S.row.length; p++) if (own.rings[p] == null) { own.rings[p] = o[1]; n--; } } });
  is(C.check(own).result === 'ok', `do ${i}: the gate's own solution passes`);
});

/* ---------------- (d) the thread ---------------- */
for (const loc of ALL) {
  const L = C.DATA[loc];
  ['fill', 'who', 'story'].forEach(k => L[k].forEach((r, i) => {
    const tag = `${loc} ${k} ${i}`;
    let st = C.newState(loc, k, i, { pos: 1, rnd }); is(st.pieces[1] === r.ans && st.right === 1, `${tag}: the plan's slot holds the answer`);
    [0, 2].forEach(p => { const sp = C.newState(loc, k, i, { pos: p, rnd }); is(sp.pieces[p] === r.ans && sp.right === p, `${tag}: slot ${p} holds the answer`); });
    is(C.check(st).result === 'tray' && st.misses === 0, `${tag}: an empty Check is no miss`);
    st.pieces.forEach((p, j) => {
      const s2 = C.newState(loc, k, i, { pos: 1, rnd }); C.mend(s2, j); const a = C.check(s2);
      if (p === r.ans) { is(a.result === 'ok' && s2.done, `${tag}: ${p} holds`); if (k !== 'story') is(C.healed(s2).indexOf(p) >= 0, `${tag}: the healed sentence reads ${p}`); return; }
      is(a.result === 'miss' && s2.snap.b === 'hole' && s2.snap.a === (k === 'story' ? 'proof' : r.key), `${tag}: ${p} snaps at the ${k === 'story' ? 'proof' : 'keystone'}`);
      is(!C.help(s2) && C.hint(s2).key === (k === 'story' ? 'hintStory' : 'hintSnap'), `${tag}: ${p}: miss 1, no help yet`);
      C.check(s2); is(C.help(s2) && C.hint(s2).key === (k === 'story' ? 'hintStory2' : 'hintKey'), `${tag}: ${p}: miss 2 shows the ${k === 'story' ? 'proof' : 'keystone'}`);
      C.mend(s2, j); is(!C.help(s2) && s2.last === null, `${tag}: a new move takes the help away`);
    });
  }));
  L.fix.forEach((r, i) => {
    const tag = `${loc} fix ${i}`, right = 0;
    let st = C.newState(loc, 'fix', i, { pos: 0, rnd });
    is(C.mend(st, 0) === 'no', `${tag}: no piece before a word is unpicked`);
    is(C.check(st).result === 'tray', `${tag}: nothing unpicked is no miss`);
    r.tok.forEach((t, j) => {
      if (t.t == null || t.gap) return;
      const s2 = C.newState(loc, 'fix', i, { pos: 0, rnd }); C.unpick(s2, j); C.mend(s2, s2.pieces.indexOf(r.ans)); const a = C.check(s2);
      if (j === r.wrong) is(a.result === 'ok', `${tag}: unpicking «${t.t}» and mending ${r.ans} holds`);
      else is(a.result === 'miss' && s2.snap.kind === 'word' && s2.snap.b === j && s2.snap.a === r.key && C.hint(s2).key === 'hintFixWord', `${tag}: «${C.word(r.tok, j)}» is not the wrong word — it snaps against the keystone`);
    });
    r.pieces.forEach(p => { if (p === r.ans) return; const s3 = C.newState(loc, 'fix', i, { pos: 0, rnd }); C.unpick(s3, r.wrong); C.mend(s3, s3.pieces.indexOf(p)); is(C.check(s3).result === 'miss' && s3.snap.b === 'hole', `${tag}: ${p} snaps`); });
    void right;
  });
  L.true.forEach((r, i) => {
    const S = C.DATA.SH.true[i];
    ['sew', 'cut'].forEach(t => { const st = C.newState(loc, 'true', i); C.chooseTool(st, t); const a = C.check(st); is((a.result === 'ok') === ((t === 'sew') === S.truth), `${loc} true ${i}: the ${t} tool ${(t === 'sew') === S.truth ? 'is right' : 'snaps'}`); if (a.result === 'miss') is(st.snap.a === r.key, `${loc} true ${i}: it snaps at the deciding word`); });
    const st = C.newState(loc, 'true', i); is(C.check(st).result === 'tray', `${loc} true ${i}: no tool is no miss`);
  });
  L.do.forEach((r, i) => {
    const S = C.DATA.SH.do[i], st = C.newState(loc, 'do', i);
    is(C.check(st).result === 'tray', `${loc} do ${i}: nothing done is no miss`);
    if (S.row) { C.pickCrayon(st, S.crayons.find(c => !S.ops.some(o => o.colour === c))); C.ring(st, 0); const a = C.check(st); is(a.result === 'miss' && a.snap.part === 'colour' && a.snap.a === r.cue[0].colour, `${loc} do ${i}: a wrong colour snaps at the colour word`); }
    else { C.lift(st, S.ops[0].sticker); C.place(st, S.ops[0].zone === 'beside' ? 'above' : 'beside'); const a = C.check(st); is(a.result === 'miss' && a.snap.a === r.cue[0].zone, `${loc} do ${i}: a wrong place snaps at the place word`); }
  });
}
/* the ring is a halo: the library picture is never recoloured */
is(!/hue-rotate|sepia|mix-blend|background-blend/.test(fs.readFileSync(path.join(ACT_DIR, 'mending-basket-activity.js'), 'utf8')), 'the crayon only rings a picture; it never recolours it');

/* ---------------- (f) the plan ---------------- */
for (const loc of ['en', 'fi']) for (const clue of C.CLUES) {
  let prev = null;
  for (let t = 0; t < 25; t++) {
    const P = C.plan(loc, clue, rnd, prev);
    is(new Set(P.order).size === 9 && (!prev || JSON.stringify(P.order) !== JSON.stringify(prev)), `${loc} ${clue}: a fresh full order`);
    if (['fill', 'fix', 'who', 'story'].includes(clue)) {
      const c = [0, 0, 0]; P.pos.forEach(p => c[p]++); is(c.every(x => x === 3), `${loc} ${clue}: the right piece left / middle / right three times each (${c})`);
      is(P.pos.every((p, q) => !q || P.pos[q - 1] !== p), `${loc} ${clue}: never the same place twice running`);
    }
    if (clue === 'true') { const tv = P.order.map(i => C.DATA.SH.true[i].truth); let ok = true; for (let q = 3; q < tv.length; q++) if (tv[q] === tv[q - 1] && tv[q] === tv[q - 2] && tv[q] === tv[q - 3]) ok = false; is(ok, `${loc} true: never four of one answer running`); }
    if (clue === 'story') is([0, 3, 6].every(q => P.order[q] % 3 === 0 && P.order[q + 1] === P.order[q] + 1 && P.order[q + 2] === P.order[q] + 2), `${loc} story: each story's questions in order`);
    prev = P.order;
  }
}

/* ---------------- (g) strings, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'mending-basket-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'mending-basket-core.js'), 'utf8');
const SH = ['title', 'instruction', 'instrBubble', 'okBubble'];
for (const k of Object.keys(ACT.strings)) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^nudge/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/\b(free|gratis|kostenlos|gratuit|ilmai|gratuito)\b/i.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(SH.indexOf(k) >= 0 || CSRC.indexOf("'" + k + "'") >= 0 || SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '').indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
for (const loc of ['fr', 'it']) ['fill', 'fix', 'who', 'do', 'true'].forEach(k => C.DATA[loc][k].forEach((r, i) => is(!r.tok.some(t => t.t && /'/.test(t.t)), `${loc} ${k} ${i}: ’ in the sentence`)));
const row = JSON.parse(fs.readFileSync(path.join(MT, 'mending-basket-activities.json'), 'utf8'))[0];
is(row && row.tool === 'mending-basket-activity' && row.id === 'mending-basket.mend-page.rf-1-4-a', 'the manifest row');
is(row && Object.keys(row.slug).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'mending-basket' && row.page_title.en === "Granny's Mending Basket — Read for Meaning (Grade 1)", 'the en metadata is frozen');

console.log(`verify-mending-basket-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
