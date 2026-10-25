#!/usr/bin/env node
/* =====================================================================
   verify-root-stencil-core.js — the gate for ACTIVITY #114, The Root
   Stencil (Build Words with Endings, RF.1.3.f; en de nl fr es pt sv da no
   fi — it refused). Its OWN ground truth: each locale's real endings and
   sleeves written out here, and the picture index re-read from disk.
     (a) the words: every picture exists in a colour theme, its label is
         the root (or the root's -ing/-y form); every built word is root +
         a sleeve by plain concatenation; Find: four distinct cards, every
         look-alike shares the root's first two letters and is NOT root +
         a real ending (plain: does not even start with the whole root);
         every round holds another root + ending card (decomposed and
         re-checked); Tricky (en only): a trap that starts with the whole
         root and whose leftover is not an ending, never a relative of the
         root (booklet, drummer, rainbow …); ≥ 7 rounds per clue; Add: one
         gap, the signal word in the sentence, endings balanced;
     (b) the bots: "pick a card with an ending" ≤ 4.5 of 9, the longest /
         shortest card ≤ 2.5; Tricky: "starts with the root" ≤ 5;
     (c) the stencil: the right card fits flat; every look-alike shows a
         wrong letter; a trap fits but finds no sleeve; an empty frame is
         no miss; Peel: only the root's own end is right; Add: only the
         answer sleeve, a wrong one pops off; the help leaves with a new
         move; the letters show only from miss 2;
     (d) the plan: a fresh order each pass; the built card's slot 2–3 times
         a pass per slot, never twice running; Add: the right sleeve's slot
         balanced; the slot the plan asks for is where the card is;
     (e) the strings ×10 (every key, no digit in a hint, never "free", fr
         narrow spaces and apostrophes) and the manifest row (it absent).
   Usage: node scripts/verify-root-stencil-core.js   (env RS_CORE_DIR / RS_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.RS_CORE_DIR || MT, ACT_DIR = process.env.RS_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'root-stencil-core.js'));
const ACT = (() => { const ctx = { window: {}, RootStencilCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'root-stencil-activity.js'), 'utf8') + '\n;this.__A = RootStencilActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'fr', 'es', 'pt', 'sv', 'da', 'no', 'fi'];
const low = (s) => String(s).toLowerCase();
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
/* the gate's own endings: the sleeves per clue, and every real ending (a look-alike or a trap's leftover must not be one) */
const OWN = {
  en: { find: ['s', 'ing', 'ed'], add: ['s', 'ing', 'ed'], real: ['s', 'es', 'ing', 'ed', 'd'] },
  de: { find: ['e', 'en', 's'], add: ['e', 'st', 't'], real: ['e', 'en', 'n', 's', 'er', 'es', 'st', 't', 'se', 'nen'] },
  nl: { find: ['en', 's'], add: ['t', 'en', 'te'], real: ['en', 's', 't', 'te', 'de', 'ten', 'den', 'e', 'je'] },
  fr: { find: ['s', 'x'], add: ['s', 'e', 'nt'], real: ['s', 'x', 'e', 'es', 'nt', 'ent'] },
  es: { find: ['s', 'es'], add: ['s', 'es'], real: ['s', 'es'] },
  pt: { find: ['s', 'es'], add: ['s', 'es'], real: ['s', 'es'] },
  sv: { find: ['ar', 'er'], add: ['ar', 'r', 'de'], real: ['ar', 'or', 'er', 'r', 'n', 'en', 'et', 'na', 'de', 'te', 't'] },
  da: { find: ['e', 'er'], add: ['er', 'r', 'de'], real: ['e', 'er', 'r', 'n', 'en', 'et', 'ne', 'de', 'te', 'ede'] },
  no: { find: ['er', 'en'], add: ['er', 'r', 't'], real: ['er', 'r', 'e', 'en', 'et', 'a', 'ene', 'te', 't'] },
  fi: { find: ['t'], add: ['t', 'ssa', 'ssä'], real: ['t', 'n', 'a', 'ä', 'ssa', 'ssä', 'sta', 'stä', 'lla', 'llä', 'lle', 'ja', 'jä', 'ksi'] }
};
/* relatives of a root are not traps (calling them "not built from the root" would teach a false boundary) */
const RELATIVE = ['booklet', 'drummer', 'jumpy', 'fishy', 'rainbow', 'raincoat', 'drumstick', 'buses'];
const rnd = (() => { let s = 7; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();
const PIC = {}; (() => { const P = path.join(MT, 'pictures'), T = JSON.parse(fs.readFileSync(path.join(P, '_themes.json'), 'utf8'));
  for (const th of Object.keys(T)) { const j = JSON.parse(fs.readFileSync(path.join(P, T[th].file), 'utf8')); for (const k of Object.keys(j.nouns)) PIC[j.dir + '/' + k] = j.nouns[k].labels; } })();
const isReal = (loc, w, root) => OWN[loc].real.some(e => low(w) === low(root) + e);
const builtFrom = (loc, card, base) => OWN[loc].real.some(e => card === base + e) || (/e$/.test(base) && ['ing', 'ed'].some(e => card === base.slice(0, -1) + e));

/* ---------------- (a) the words ---------------- */
is(JSON.stringify(C.DATA.LOCALES) === JSON.stringify(LOCS), 'the ten locales ship, it refused');
is(!C.DATA.it, 'no Italian data (its endings replace the last vowel)');
for (const loc of LOCS) {
  const D = C.DATA[loc], O = OWN[loc];
  is(JSON.stringify(D.endsFind) === JSON.stringify(O.find) && JSON.stringify(D.endsAdd) === JSON.stringify(O.add), `${loc}: the sleeves are the locale's (${D.endsFind} / ${D.endsAdd})`);
  const picOk = (root, pic, tag) => {
    const lab = PIC[pic], l0 = lab && (lab[loc] || [])[0];
    is(fs.existsSync(path.join(IMG, pic + '@2x.webp')) && !BW.test(pic.split('/')[0].trim()), `${loc} ${tag}: colour picture ${pic}`);
    is(!!l0 && (low(l0) === low(root) || low(l0) === low(root) + 'ing' || low(l0) === low(root) + 'y'), `${loc} ${tag}: the picture's label «${l0}» is ${root}`);
  };
  const built = (r, tag, ends) => is(r.built === r.root + r.end && ends.indexOf(r.end) >= 0, `${loc} ${tag}: ${r.built} = ${r.root} + -${r.end}, a sleeve`);
  is(D.find.length >= 7 && D.peel.length >= 7 && D.add.length >= 7, `${loc}: ≥ 7 rounds per clue`);
  is(new Set(D.find.map(r => r.root)).size >= 7 && new Set(D.peel.map(r => r.built)).size === D.peel.length, `${loc}: Find ≥ 7 different roots, Peel words all different`);
  D.find.forEach((r, i) => {
    const tag = 'find ' + i; picOk(r.root, r.pic, tag); built(r, tag, O.find);
    is(r.cards.length === 4 && r.cards[0] === r.built && new Set(r.cards.map(low)).size === 4, `${loc} ${tag}: four different cards, the built word among them`);
    r.cards.slice(1).forEach(w => {
      is(low(w).slice(0, 2) === low(r.root).slice(0, 2), `${loc} ${tag}: ${w} shares the first two letters of ${r.root}`);
      is(!isReal(loc, w, r.root) && low(w) !== low(r.root), `${loc} ${tag}: ${w} is not ${r.root} + an ending (a second right answer)`);
      is(!low(w).startsWith(low(r.root)), `${loc} ${tag}: plain look-alike ${w} does not start with the whole root`);
    });
    const oth = Object.keys(r.other || {});
    is(oth.length >= 1 && oth.every(k => r.cards.indexOf(k) > 0 && builtFrom(loc, k, r.other[k]) && low(r.other[k]) !== low(r.root)), `${loc} ${tag}: another card is a root + ending (${oth.map(k => k + '=' + r.other[k]).join(', ')})`);
  });
  if (loc === 'en') {
    is(D.findB && D.findB.length >= 7, 'en: ≥ 7 Tricky rounds');
    D.findB.forEach((r, i) => {
      const tag = 'tricky ' + i; picOk(r.root, r.pic, tag); built(r, tag, O.find);
      is(r.cards.length === 4 && r.cards[0] === r.built && r.cards[1] === r.trap && new Set(r.cards).size === 4, `en ${tag}: four cards with one trap`);
      is(r.trap.startsWith(r.root) && O.real.indexOf(r.trap.slice(r.root.length)) < 0 && RELATIVE.indexOf(r.trap) < 0, `en ${tag}: the trap ${r.trap} starts with ${r.root}, its rest is no ending, not a relative`);
      r.cards.slice(2).forEach(w => is(low(w).slice(0, 2) === low(r.root).slice(0, 2) && !isReal(loc, w, r.root), `en ${tag}: look-alike ${w}`));
      const oth = Object.keys(r.other || {}); is(oth.length >= 1 && oth.every(k => builtFrom(loc, k, r.other[k])), `en ${tag}: another root + ending card`);
    });
  } else is(!D.findB, `${loc}: no Tricky set`);
  D.peel.forEach((r, i) => { picOk(r.root, r.pic, 'peel ' + i); built(r, 'peel ' + i, O.find); });
  const cnt = {};
  D.add.forEach((a, i) => {
    const tag = 'add ' + i;
    is(a.s.split('{gap}').length === 2 && a.s.replace('{gap}', '').indexOf(a.sig) >= 0, `${loc} ${tag}: one gap, the signal «${a.sig}» in the sentence`);
    is(O.add.indexOf(a.end) >= 0 && !/\d/.test(a.s), `${loc} ${tag}: -${a.end} is a sleeve; no digits`);
    if (a.pic) picOk(a.root, a.pic, tag);
    is(D.why[a.end] && D.why[a.end].indexOf('{sig}') >= 0 && D.why[a.end].indexOf('-' + a.end) < 0 && !/\d/.test(D.why[a.end]), `${loc} ${tag}: the miss-2 line names the signal, not the ending`);
    cnt[a.end] = (cnt[a.end] || 0) + 1;
  });
  const cs = O.add.map(e => cnt[e] || 0); is(Math.min(...cs) >= 1 && Math.max(...cs) - Math.min(...cs) <= 1, `${loc} add: endings balanced (${cs})`);

  /* ---------------- (b) the bots ---------------- */
  const E = (w) => O.find.some(e => low(w).endsWith(e) && w.length > e.length + 1);
  const bot = (rounds, pick) => rounds.reduce((s, r) => s + pick(r), 0);
  const share = (r, test) => { const hits = r.cards.filter(test); return hits.length ? (test(r.built) ? 1 / hits.length : 0) : 1 / 4; };
  const ext = (r, f) => { const m = f(...r.cards.map(c => c.length)), hits = r.cards.filter(c => c.length === m); return hits.indexOf(r.built) >= 0 ? 1 / hits.length : 0; };
  const sets = [['plain', D.find]].concat(D.findB ? [['tricky', D.findB]] : []);
  sets.forEach(([nm, R]) => {
    const n = R.length, sc = (v) => v * 9 / n;
    is(sc(bot(R, r => share(r, E))) <= 4.5, `${loc} ${nm}: the ending-spotting bot ${sc(bot(R, r => share(r, E))).toFixed(2)} ≤ 4.5 of 9`);
    is(sc(bot(R, r => ext(r, Math.max))) <= 2.5 && sc(bot(R, r => ext(r, Math.min))) <= 2.5, `${loc} ${nm}: longest ${sc(bot(R, r => ext(r, Math.max))).toFixed(2)} / shortest ${sc(bot(R, r => ext(r, Math.min))).toFixed(2)} ≤ 2.5`);
    if (nm === 'tricky') is(sc(bot(R, r => share(r, w => low(w).startsWith(low(r.root))))) <= 5, `${loc} tricky: the starts-with-the-root bot ≤ 5`);
  });

  /* ---------------- (c) the stencil ---------------- */
  sets.forEach(([nm, R]) => R.forEach((r, ri) => {
    const look = nm, tag = `${loc} ${nm} ${ri}`;
    const st0 = C.newState(loc, 'find', look, ri, { pos: 0, rnd });
    is(st0.cards[0] === r.built, `${tag}: the plan's slot holds the built word`);
    let st = C.newState(loc, 'find', look, ri, { pos: 2, rnd });
    is(st.cards[2] === r.built && st.right === 2, `${tag}: slot 2 holds the built word`);
    let a = C.check(st); is(a.result === 'tray' && st.misses === 0, `${tag}: an empty frame is no miss`);
    st.cards.forEach((w, i) => {
      if (i === st.right) return;
      const s2 = C.newState(loc, 'find', look, ri, { pos: 2, rnd }); C.lay(s2, s2.cards.indexOf(w)); const b = C.check(s2);
      const want = low(w).startsWith(low(r.root)) && w.slice(0, r.root.length) === r.root ? 'fakeEnding' : 'wrongLetter';
      is(b.result === 'miss' && b.kind === want && s2.misses === 1 && !s2.done, `${tag}: ${w} → ${want} (${b.kind})`);
      if (want === 'wrongLetter') is(s2.marks.windows.some(x => !x.ok) && s2.marks.windows.length === r.root.length, `${tag}: ${w}: a window shows a wrong letter`);
      is(!C.reveal(s2) && C.hint(s2).key === (want === 'fakeEnding' ? 'hintTrap' : 'hintLetter'), `${tag}: ${w}: miss 1 hides the stencil's letters`);
      C.check(s2); is(C.reveal(s2) && C.hint(s2).key === 'hintFind2', `${tag}: miss 2 shows the stencil's letters`);
      C.lay(s2, s2.right); is(!C.reveal(s2) && s2.last === null, `${tag}: a new move takes the help away`);
    });
    C.lay(st, st.right); a = C.check(st); is(a.result === 'ok' && st.done, `${tag}: ${r.built} fits flat`);
    is(C.lay(st, 0) === 'no', `${tag}: nothing moves after it is solved`);
  }));
  D.peel.forEach((r, ri) => {
    const tag = `${loc} peel ${ri}`;
    for (let g = 1; g < r.built.length; g++) {
      const st = C.newState(loc, 'peel', 'plain', ri); C.setGap(st, g); const b = C.check(st);
      if (g === r.root.length) is(b.result === 'ok', `${tag}: the line after ${r.root} is right`);
      else is(b.result === 'miss' && b.kind === 'wrongSplit' && st.marks.inside === (g < r.root.length), `${tag}: the line after letter ${g} is a miss`);
    }
    const st = C.newState(loc, 'peel', 'plain', ri); is(C.check(st).result === 'tray' && st.misses === 0, `${tag}: no line is no miss`);
    is(C.setGap(st, 0) === 'no' && C.setGap(st, r.built.length) === 'no', `${tag}: the line stays between letters`);
  });
  D.add.forEach((r, ri) => {
    const tag = `${loc} add ${ri}`, S = O.add.length;
    for (let p = 0; p < S; p++) { const st = C.newState(loc, 'add', 'plain', ri, { pos: p }); is(st.sleeves[p] === r.end && st.sleeves.length === S && new Set(st.sleeves).size === S, `${tag}: slot ${p} holds -${r.end}`); }
    O.add.forEach(e => {
      const st = C.newState(loc, 'add', 'plain', ri, { pos: 1 }); C.fit(st, e); const b = C.check(st);
      if (e === r.end) is(b.result === 'ok', `${tag}: -${e} is right`);
      else {
        is(b.result === 'miss' && st.sleeve === null && st.marks.sleeve === e, `${tag}: -${e} pops off`);
        is(C.hint(st).key === 'hintAdd', `${tag}: miss 1 → hintAdd`);
        C.fit(st, e); C.check(st); const h = C.hint(st);
        is(h.key === 'hintAdd2' && h.args.why.indexOf(r.sig) >= 0, `${tag}: miss 2 names «${r.sig}»`);
      }
    });
    const st = C.newState(loc, 'add', 'plain', ri); is(C.check(st).result === 'tray' && st.misses === 0, `${tag}: no sleeve is no miss`);
  });

  /* ---------------- (d) the plan ---------------- */
  [['find', 'plain', 4], ['find', 'tricky', 4], ['peel', 'plain', 1], ['add', 'plain', O.add.length]].forEach(([clue, look, slots]) => {
    if (look === 'tricky' && !D.findB) return;
    let prev = null;
    for (let t = 0; t < 30; t++) {
      const P = C.plan(loc, clue, look, rnd, prev), n = P.order.length;
      is(new Set(P.order).size === n && n === C.rounds(loc, clue, look).length && (!prev || JSON.stringify(P.order) !== JSON.stringify(prev)), `${loc} ${clue}/${look}: a fresh full order each pass`);
      if (slots > 1) {
        const c = Array(slots).fill(0); P.pos.forEach(p => c[p]++);
        is(Math.max(...c) - Math.min(...c) <= 1, `${loc} ${clue}/${look}: slots balanced (${c})`);
        const run = clue === 'find' || slots === 3 ? 2 : 3;
        let ok = true; for (let q = run - 1; q < P.pos.length; q++) { let same = true; for (let j = 1; j < run; j++) if (P.pos[q - j] !== P.pos[q]) same = false; if (same) ok = false; }
        is(ok, `${loc} ${clue}/${look}: never ${run} running in one slot (${P.pos})`);
      }
      prev = P.order;
    }
  });
}

/* ---------------- (e) the strings, the settings, the manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'root-stencil-activity.js'), 'utf8'), CORE_SRC = fs.readFileSync(path.join(CORE_DIR, 'root-stencil-core.js'), 'utf8');
const SH = ['title', 'instruction', 'instrBubble', 'okBubble'];
for (const k of Object.keys(ACT.strings)) {
  for (const loc of LOCS) {
    const v = ACT.strings[k][loc];
    is(typeof v === 'string' && (v.length > 0 || k === 'okSay' && loc !== 'en'), `${k}.${loc} authored`);
    if (/^hint|^nudge/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/\b(free|gratis|kostenlos|gratuit|ilmai)/i.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and apostrophes`);
  }
  is(SH.indexOf(k) >= 0 || CORE_SRC.indexOf("'" + k + "'") >= 0 || SRC.split("'" + k + "'").length > 2 || new RegExp("\\b" + k + "\\b").test(SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '')), `string ${k} is asked for`);
}
for (const loc of LOCS) { const D = C.DATA[loc]; Object.keys(D.mean).concat(Object.keys(D.why)).forEach(e => { if (loc === 'fr') is(!/ [:!?;»]|« /.test(D.mean[e] + D.why[e]), `fr ${e}: narrow spaces in why / mean`); }); }
const ctx = { lang: 'en' }; const S0 = ACT.settings.length;
const mk = (lang) => { const o = Object.create(ACT); o.settings = ACT.settings.slice(); o.init({ lang, settings: {}, t: (k) => k }); return o.settings.map(s => s.key).join(','); };
is(mk('en') === 'clue,look' && mk('de') === 'clue' && mk('fi') === 'clue', 'the look-alikes setting is offered only where a Tricky set exists'); void ctx; void S0;
const row = JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).find(r => r.id === 'syllable-builder.build-endings.rf-1-3-f');
is(row && row.tool === 'root-stencil-activity', 'the manifest row points at the stencil');
is(row && JSON.stringify(Object.keys(row.slug).sort()) === JSON.stringify(LOCS.slice().sort()) && !row.slug.it, 'the row ships the ten locales, not it');
is(row && row.slug.en === 'build-words-with-endings' && row.page_title.en === 'Build Words with Endings — Reading -s, -ed, and -ing', 'the en metadata is frozen');

console.log(`verify-root-stencil-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
