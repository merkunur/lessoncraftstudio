#!/usr/bin/env node
/* =====================================================================
   verify-field-guide-core.js — the gate for ACTIVITY #121, The Book That
   Only Opens Where You Send It (Detective Dewey's Field Guide, 1.RI.5;
   all 11 locales). Its OWN ground truth, written here independently of
   the core: the three invented creatures, each part's job (as a per-locale
   word stem), every round's right answer, and the pictures' right labels.
     (a) the book: three creatures, three parts each, their page numbers;
         every locale has every part, question, picture and tool line; es/pt
         books have no index; no invented name is a real word (a blocklist +
         every image-vocabulary word of that locale);
     (b) one right answer: a part's contents line, heading, index topic,
         glossary meaning and FACT sentence all carry its job stem; its first
         sentence does not; no other part of the same creature carries it;
         every question's [key] carries the answer's stem and no other line's;
         a picture's [key] is in the right caption and in no other caption or
         label;
     (c) the model, every locale, every round, every choice: only the answer
         opens right / is found; only the answer's SECOND sentence ends a
         round; a wrong choice is one miss (once per choice); the hints by
         kind and miss count; the underlines and the contrast;
     (d) glossary and index alphabetical in the locale's own collation; the
         index lists topics, never part names;
     (e) the bots: no answer position wins more than 3 of 8 in any level and
         locale; "tap the first sentence" never ends a round;
     (f) the plan: a fresh order; Level D draws one A, one B and two
         different C rounds;
     (g) the pictures exist (colour themes) and every label points at a
         drawn pixel;
     (h) the strings ×11, the prose quotes, the manifest row.
   Usage: node scripts/verify-field-guide-core.js   (env FG_CORE_DIR / FG_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.FG_CORE_DIR || MT, ACT_DIR = process.env.FG_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'field-guide-core.js'));
const ACT = (() => { const ctx = { window: {}, FieldGuideCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'field-guide-activity.js'), 'utf8') + '\n;this.__A = window.FieldGuideActivity;', ctx); return ctx.__A; })();
const VOC = (() => { const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8') + ';this.V = typeof IMAGE_VOCABULARY !== "undefined" ? IMAGE_VOCABULARY : window.IMAGE_VOCABULARY;', ctx); return ctx.V; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'], NOIDX = ['es', 'pt'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const rnd = (() => { let s = 7; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();
const plain = s => String(s).replace(/[\[\]]/g, '');
const key = s => { const m = /\[([^\]]+)\]/.exec(s); return m ? m[1] : null; };

/* ---------------- this gate's truth ---------------- */
const CRE = { gribbet: [['snoud', 4], ['frell', 9], ['mipp', 14]], wuzzle: [['blorp', 5], ['gleen', 10], ['fipp', 15]], nim: [['quib', 3], ['plib', 8], ['vorl', 12]] };
const PARTS = [].concat(...Object.values(CRE).map(x => x.map(y => y[0])));
const CRE_OF = {}; Object.keys(CRE).forEach(c => CRE[c].forEach(([p]) => CRE_OF[p] = c));
/* each part's job, as the word stem every locale writes it with */
const STEM = {
  en: { snoud: 'swim', frell: 'glow', mipp: 'dig', blorp: 'float', gleen: 'sting', fipp: 'climb', quib: 'jump', plib: 'hid', vorl: 'spark' },
  de: { snoud: 'schwimm', frell: 'leucht', mipp: 'gr[aä]b', blorp: 'schweb', gleen: 'stech|sticht', fipp: 'kletter', quib: 'spring', plib: 'versteck', vorl: 'funke' },
  fr: { snoud: 'nag', frell: 'brill', mipp: 'creus', blorp: 'flott', gleen: 'piqu', fipp: 'grimp', quib: 'saut', plib: 'cach', vorl: 'étincel' },
  es: { snoud: 'nad', frell: 'brill', mipp: 'escarb', blorp: 'flot', gleen: '(?<!\\p{L})pic', fipp: 'trep', quib: 'salt', plib: 'escond', vorl: 'chisp' },
  pt: { snoud: 'nad', frell: 'brilh', mipp: '(?<!\\p{L})cav', blorp: 'flutu', gleen: '(?<!\\p{L})pic', fipp: 'escal', quib: 'pul', plib: 'escond', vorl: 'fa[ií]s[cq]' },
  it: { snoud: 'nuot', frell: 'brill', mipp: 'scav', blorp: 'gallegg', gleen: 'pung', fipp: 'arrampic', quib: 'salt', plib: 'nascond', vorl: 'scintill' },
  nl: { snoud: 'zwem', frell: 'gloei', mipp: 'gra[av]', blorp: 'drij[vf]', gleen: 'prik', fipp: 'klim', quib: 'spring', plib: 'verstop', vorl: 'vonk' },
  sv: { snoud: '(?<!\\p{L})sim', frell: 'lys', mipp: 'gräv', blorp: 'sväv', gleen: 'stick', fipp: 'klätt', quib: 'hopp', plib: 'göm', vorl: 'gnist' },
  da: { snoud: 'svøm', frell: 'lys', mipp: 'grav', blorp: 'svæv', gleen: 'stik', fipp: 'klatr', quib: 'hop', plib: 'gem', vorl: 'gnist' },
  no: { snoud: 'svøm', frell: 'lys', mipp: 'grav', blorp: 'svev', gleen: 'stikk', fipp: 'klatr', quib: 'hopp', plib: 'gjem', vorl: 'gnist' },
  fi: { snoud: '(?<!\\p{L})ui(?!\\p{L})|uimi|uida', frell: 'hehku', mipp: 'kaiv', blorp: 'kellu', gleen: 'pist', fipp: 'kiip|kiiv', quib: 'hyp', plib: 'piilo', vorl: 'kipin' }
};
const hasStem = (loc, part, s) => new RegExp(STEM[loc][part], 'iu').test(s);
/* the right answers, round by round */
const ANS = {
  A: ['frell', 'plib', 'fipp', 'snoud', 'mipp', 'blorp', 'vorl', 'gleen'],
  B: ['frell', 'gleen', 'vorl', 'mipp', 'quib', 'IDX0', 'IDX1', 'IDX2'], Bnoidx: ['frell', 'gleen', 'vorl', 'mipp', 'quib', 'fipp', 'plib', 'blorp'],
  C: ['claws', 'ears', 'feet', 'foot', 'antennae', 'flipper', 'arms', 'quills'], D: ['gloss', 'toc', 'search', 'listen']
};
const KIND = { A: ['toc', 'toc', 'toc', 'toc', 'head', 'head', 'head', 'head'], B: ['gloss', 'gloss', 'bold', 'bold', 'gloss', 'index', 'index', 'index'] };
const PICS = { crab: 'beach/crab', elephant: 'animals/elephant', pelican: 'birds 2/pelican', snail: 'forest creatures/snail', butterfly: 'forest creatures/butterfly', narwhal: 'ocean life/narwhal', octopus: 'ocean life/octopus', porcupine: 'forest creatures/porcupine' };
const BLOCK = ['sten', 'tarn', 'snood', 'fid'];
const NAMES = ['gribbet', 'wuzzle'].concat(PARTS, ['gline']);

/* ---------------- (a) the book ---------------- */
is(Object.keys(C.DATA.CRE).join() === Object.keys(CRE).join(), 'three creatures, the gate\'s');
for (const c of Object.keys(CRE)) is(JSON.stringify(C.DATA.CRE[c].parts) === JSON.stringify(CRE[c].map(x => x[0])) && JSON.stringify(C.DATA.CRE[c].pages) === JSON.stringify(CRE[c].map(x => x[1])), `${c}: its parts and pages are the gate's`);
const fold = s => String(s).toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
for (const loc of ALL) {
  const L = C.DATA[loc];
  is(!!L && PARTS.every(p => L.parts[p] && L.parts[p].length === 6), `${loc}: every part authored`);
  is(NOIDX.includes(loc) ? !L.feat.index : !!L.feat.index, `${loc}: ${NOIDX.includes(loc) ? 'no back index (es/pt books)' : 'an index'}`);
  is(C.hasIndex(loc) === !NOIDX.includes(loc), `${loc}: the core agrees on the index`);
  const vocab = new Set(); Object.values(VOC).forEach(v => { const x = v && v[loc]; if (x) [x[0], x[1]].forEach(w => w && fold(w).split(/[^\p{L}]+/u).forEach(t => t && vocab.add(t))); });
  is(vocab.size > 500, `${loc}: the vocabulary loads (${vocab.size} words)`);
  const names = NAMES.filter(n => n !== 'gline' || ['fr', 'es', 'pt', 'it'].includes(loc));
  is(L.cre.nim === (loc === 'fi' ? 'Nimu' : 'Nim'), `${loc}: the Nim's name (fi Nimu: Nim inflects into forms of nimi)`);
  for (const n of names.concat(PARTS.map(p => L.parts[p][0]), Object.values(L.cre))) { const f = fold(n); is(!vocab.has(f) && !vocab.has(f + 's') && BLOCK.indexOf(f) < 0, `${loc}: "${n}" is not a real word`); }
}

/* ---------------- (b) one right answer ---------------- */
for (const loc of ALL) {
  const L = C.DATA[loc];
  for (const p of PARTS) {
    const a = L.parts[p], sib = CRE[CRE_OF[p]].map(x => x[0]).filter(x => x !== p);
    is(hasStem(loc, p, key(a[1]) || '') && hasStem(loc, p, key(a[2]) || '') && hasStem(loc, p, key(a[3]) || ''), `${loc} ${p}: its contents line, index topic and meaning carry its job ("${STEM[loc][p]}")`);
    is(hasStem(loc, p, a[5]), `${loc} ${p}: the fact sentence carries its job — "${a[5]}"`);
    is(!hasStem(loc, p, a[4]), `${loc} ${p}: the first sentence does not answer — "${a[4]}"`);
    for (const o of sib) is(![1, 2, 3, 5].some(i => hasStem(loc, p, L.parts[o][i])), `${loc}: ${o} never carries ${p}'s job`);
    is(!new RegExp('(?<!\\p{L})' + a[0] + '(?!\\p{L})', 'iu').test(plain(a[2])), `${loc} ${p}: the index lists a topic, not the part's name`);
  }
  const qs = { toc: L.q.toc, head: L.q.head, gloss: L.q.gloss, idx: L.q.idx };
  for (const k of Object.keys(qs)) for (const p of Object.keys(qs[k])) {
    const q = qs[k][p], kk = key(q); is(!!kk && hasStem(loc, p, kk), `${loc} ${k} ${p}: the question's key carries the answer's job — "${q}"`);
    for (const o of CRE[CRE_OF[p]].map(x => x[0]).filter(x => x !== p)) is(!hasStem(loc, o, q), `${loc} ${k} ${p}: the question carries no other part's job (${o})`);
  }
  for (const p of ['vorl', 'mipp']) is(fold(key(L.q.bold[p])) === fold(p) && new RegExp(p, 'i').test(key(L.boldText[p])), `${loc} bold ${p}: the bold word is the asked word`);
  for (const pic of Object.keys(PICS)) {
    const Q = L.pics[pic], rd = C.DATA.ROUNDS.C.find(x => x.pic === pic), ans = ANS.C[C.DATA.ROUNDS.C.indexOf(rd)], kk = key(Q[0]);
    /* the same word, or two forms of one verb (de schützt / schützen): a shared stem of at least four letters */
    const rk = fold(key(Q[1][ans][1]) || ''), qk = fold(kk || ''); let pre = 0; while (pre < rk.length && rk[pre] === qk[pre]) pre++;
    const stemK = rk === qk ? qk : qk.slice(0, pre);
    is(!!kk && (rk === qk || pre >= 4), `${loc} ${pic}: the right caption carries the question's key "${kk}"`);
    for (const o of rd.order.filter(x => x !== ans)) is(!new RegExp('(?<!\\p{L})' + stemK, 'iu').test(fold(plain(Q[1][o][1]))) && !/\[/.test(Q[1][o][1]), `${loc} ${pic}: the ${o} caption does not answer`);
    for (const o of rd.order) is(!new RegExp(kk, 'iu').test(Q[1][o][0]), `${loc} ${pic}: the ${o} label does not give the key away`);
  }
}

/* ---------------- (c) the model ---------------- */
const answerOf = (loc, lvl, r) => { const A = lvl === 'B' ? (NOIDX.includes(loc) ? ANS.Bnoidx : ANS.B)[r] : ANS[lvl][r]; return /^IDX/.test(A) ? C.DATA.IDX[loc][+A.slice(3)] : A; };
for (const loc of ALL) {
  for (const lvl of ['A', 'B', 'C', 'D']) for (let r = 0; r < 8; r++) {
    if (lvl === 'D' && r >= 4) continue;
    const rd = C.round(loc, lvl, r), A = answerOf(loc, lvl, r), tag = `${loc} ${lvl}${r + 1}`;
    if (lvl === 'A' || lvl === 'B') is(rd.k === (lvl === 'B' && r >= 5 && NOIDX.includes(loc) ? 'gloss' : KIND[lvl][r]), `${tag}: a ${rd.k} round`);
    is(C.answer(rd) === A, `${tag}: the right answer is the gate's (${A})`);
    if (rd.k === 'toc' || rd.k === 'index') {
      const ls = C.lines(loc, rd); is(ls.length === 3 && ls.every(l => CRE_OF[l.part] === CRE_OF[A]), `${tag}: the creature's three lines`);
      for (const l of ls) {
        const st = C.newState(loc, lvl, r);
        const res = C.send(st, l.part);
        is(res === (l.part === A ? 'right' : 'wrong') && st.opened === l.part, `${tag}: ${l.part} opens its page, ${res}`);
        is(C.pageOf(l.part) === CRE[CRE_OF[l.part]].find(x => x[0] === l.part)[1] && l.p === C.pageOf(l.part), `${tag}: ${l.part} line shows its page number`);
        is(C.sentence(st, l.part, 0) === 'read', `${tag}: the first sentence of ${l.part} is reading, not the end`);
        is(C.sentence(st, l.part, 1) === (l.part === A ? 'found' : 'read') && st.done === (l.part === A), `${tag}: only the answer's fact ends the round (${l.part})`);
        if (l.part !== A) { is(st.misses === 1 && C.hint(st).key === 'hintLine1' && C.contrast(st) === l.part && !C.underline(st), `${tag}: a wrong line is one miss, hint 1, the contrast`); C.send(st, l.part); is(st.misses === 1, `${tag}: the same wrong line again is no new miss`); }
      }
      const st2 = C.newState(loc, lvl, r), wr = ls.filter(l => l.part !== A);
      C.send(st2, wr[0].part); C.send(st2, wr[1].part);
      is(st2.misses === 2 && C.hint(st2).key === 'hintLine2' && C.underline(st2) && C.marksMatch(st2) && C.contrast(st2) === null, `${tag}: miss 2 underlines, marks the match, hint 2`);
      is(C.back(st2) === 'back' && st2.opened === null, `${tag}: the ribbon closes the book back`);
      is(C.sentence(st2, A, 1) === 'no', `${tag}: a sentence on a page that is not open does nothing`);
      C.send(st2, A); is(!C.underline(st2) && st2.last === null, `${tag}: a new choice takes the help away`);
    } else if (rd.k === 'head') {
      const ls = C.lines(loc, rd); is(ls.map(l => l.part).join() === rd.flaps.join() && ls.every(l => CRE_OF[l.part] === CRE_OF[A]), `${tag}: the flaps as written, one creature`);
      for (const l of ls) { const st = C.newState(loc, lvl, r); is(C.flap(st, l.part) === (l.part === A ? 'right' : 'wrong') && st.flap === l.part, `${tag}: flap ${l.part}`); is(C.sentence(st, l.part, 1) === (l.part === A ? 'found' : 'read'), `${tag}: only the right section's fact ends it (${l.part})`); }
      const st = C.newState(loc, lvl, r); C.flap(st, ls.find(l => l.part !== A).part); is(C.hint(st).key === 'hintHead1', `${tag}: heading hint 1`); C.flap(st, ls.filter(l => l.part !== A)[1].part); is(C.hint(st).key === 'hintLine2', `${tag}: heading hint 2`);
    } else if (rd.k === 'gloss' || rd.k === 'bold') {
      const ls = C.lines(loc, rd); is(ls.length === 3 && ls.every(l => CRE_OF[l.part] === CRE_OF[A]), `${tag}: the creature's glossary`);
      if (rd.k === 'bold') { const st = C.newState(loc, lvl, r); is(C.entry(st, A) === 'no', `${tag}: the glossary is shut until the bold word is tapped`); is(C.bold(st) === 'open' && st.glossOpen, `${tag}: the bold word opens it`); is(C.entry(st, A) === 'found', `${tag}: then the entry ends it`); }
      for (const l of ls) { const st = C.newState(loc, lvl, r); if (rd.k === 'bold') C.bold(st); is(C.entry(st, l.part) === (l.part === A ? 'found' : 'wrong'), `${tag}: entry ${l.part}`); if (l.part !== A) is(C.hint(st).key === 'hintGloss1' && C.contrast(st) === l.part, `${tag}: glossary hint 1`); }
    } else if (rd.k === 'label') {
      is(rd.order.indexOf(A) >= 0 && rd.ans === A, `${tag}: the answer is a label`);
      for (const k of rd.order) { const st = C.newState(loc, lvl, r); is(C.caption(st, k) === 'no', `${tag}: a closed caption cannot be chosen`); is(C.label(st, k) === 'open', `${tag}: the label opens`); is(C.caption(st, k) === (k === A ? 'found' : 'wrong'), `${tag}: caption ${k}`); if (k !== A) is(C.hint(st).key === 'hintLabel1', `${tag}: label hint 1`); }
    } else if (rd.k === 'tab') {
      const T = C.tabs(loc).map(t => t.id); is(T.join() === (NOIDX.includes(loc) ? 'toc,gloss' : 'toc,gloss,index'), `${tag}: the book's tabs`);
      for (const t of T) { const st = C.newState(loc, lvl, r); is(C.tab(st, t) === (t === A ? 'found' : 'wrong') && st.tab === t, `${tag}: tab ${t} opens that part`); if (t !== A) { is(C.hint(st).key === 'hintTab1', `${tag}: tab hint 1`); const o = T.find(x => x !== A && x !== t); if (o) { C.tab(st, o); is(C.hint(st).tool === 'explainTabs', `${tag}: tab miss 2 explains the tabs`); } } }
    } else if (rd.k === 'icon') {
      is(rd.icons.slice().sort().join() === 'home,listen,next,search', `${tag}: four buttons`);
      for (const ic of rd.icons) { const st = C.newState(loc, lvl, r); is(C.icon(st, ic) === (ic === A ? 'found' : 'wrong') && st.icon === ic, `${tag}: button ${ic}`); }
      const st = C.newState(loc, lvl, r); C.icon(st, 'next'); is(st.screen === 1, `${tag}: the arrow turns the page`); C.icon(st, 'home'); is(st.screen === -1, `${tag}: the house goes back to the cover`); is(C.hint(st).tool === 'explainIcons', `${tag}: button miss 2 explains the buttons`);
    }
  }
  /* the help from the start: underlines everywhere, no match marked */
  const sh = C.newState(loc, 'A', 0, null, true); is(C.underline(sh) && !C.marksMatch(sh), `${loc}: help from the start underlines without marking the match`);
}

/* ---------------- (d) alphabetical ---------------- */
for (const loc of ALL) {
  const col = new Intl.Collator(loc, { sensitivity: 'base' });
  for (const c of Object.keys(CRE)) {
    const rdG = { k: 'gloss', part: CRE[c][0][0] }, g = C.lines(loc, rdG).map(l => l.name);
    is(g.join() === g.slice().sort((a, b) => col.compare(a, b)).join(), `${loc} ${c}: the glossary is alphabetical (${g})`);
    if (C.hasIndex(loc)) { const ix = C.lines(loc, { k: 'index', part: CRE[c][0][0] }).map(l => plain(l.topic)); is(ix.join() === ix.slice().sort((a, b) => col.compare(a, b)).join(), `${loc} ${c}: the index is alphabetical (${ix})`); }
  }
}

/* ---------------- (e) the bots ---------------- */
for (const loc of ALL) for (const lvl of ['A', 'B', 'C', 'D']) {
  const pos = [0, 1, 2, 3, 4, 5, 6, 7].map(r => C.answerPos(loc, C.round(loc, lvl, r))), n = [1, 2, 3].map(x => pos.filter(y => y === x).length);
  is(pos.every(p => p >= 1) && Math.max(...n) <= 3, `${loc} ${lvl}: no answer position wins more than 3 of 8 (${pos})`);
}

/* ---------------- (f) the plan ---------------- */
for (const lvl of ['A', 'B', 'C', 'D']) {
  let prev = null;
  for (let pass = 0; pass < 30; pass++) {
    const P = C.plan(lvl, rnd, prev);
    is(P.order.length === 8 && new Set(P.order).size === 8, `${lvl}: a pass is every round`);
    if (prev) is(P.order.join() !== prev.join(), `${lvl} pass ${pass}: a fresh order`);
    if (lvl === 'D') { const R = P.refs; is(R[4].lvl === 'A' && R[5].lvl === 'B' && R[6].lvl === 'C' && R[7].lvl === 'C' && R[6].r !== R[7].r && [4, 5, 6, 7].every(k => R[k].r >= 0 && R[k].r < 8), `D pass ${pass}: one A, one B, two different C`); for (const loc of ['en', 'es']) { const st = C.newState(loc, 'D', 6, R[6]); is(st.kind === 'label' && st.lvl === 'D', `D ${loc}: a drawn round plays as its own kind`); } }
    prev = P.order;
  }
}

/* ---------------- (h) strings, prose, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'field-guide-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'field-guide-core.js'), 'utf8');
const SH = ['title', 'instruction', 'instrBubble', 'okBubble'];
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 40, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^nudge|^read|^ok(Head|Gloss|Label)/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(SH.indexOf(k) >= 0 || CSRC.indexOf("'" + k + "'") >= 0 || SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '').indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
for (const loc of ALL) {
  const T = C.DATA[loc].tool; is(['qMeaning', 'qTopic', 'qSearch', 'qListen', 'okMeaning', 'okTopic', 'okSearch', 'okListen', 'explainTabs', 'explainIcons'].every(k => T[k] && !/\d/.test(T[k])), `${loc}: the tool lines, no digits`);
  is(NOIDX.includes(loc) ? !new RegExp('index', 'i').test(T.explainTabs) && T.explainTabs.split(':').length === 3 : T.explainTabs.split(/[:：]/).length === 4, `${loc}: the tab explanation names the book's own tabs`);
  if (loc === 'fr') { const all = JSON.stringify(C.DATA.fr); is(!/ [:!?;»]/.test(all.replace(/\\u202f/g, '')) && !/'/.test(all), 'fr data: narrow spaces and ’'); }
}
/* every quoted span in the prose is a heading, a sentence or a feature name of that locale */
const PR = {}; for (const loc of ALL) PR[loc] = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', loc + '.json'), 'utf8')).prose['field-guide.text-features.1-ri-5'];
const QUOTE = { en: /"([^"]+)"/g, de: /„([^“]+)“/g, fr: /« ?([^»]+?) ?»/g, es: /«([^»]+)»/g, pt: /“([^”]+)”/g, it: /«([^»]+)»/g, nl: /‘([^’]+(?:’s[^’]*)?)’/g, sv: /”([^”]+)”/g, da: /”([^”]+)”/g, no: /«([^»]+)»/g, fi: /”([^”]+)”/g };
for (const loc of ALL) {
  const L = C.DATA[loc], known = new Set([].concat(PARTS.map(p => C.heading(loc, p)).map(plain), PARTS.map(p => L.parts[p][4]), PARTS.map(p => L.parts[p][5]), Object.values(L.feat).filter(Boolean)));
  is(!!PR[loc] && ['about', 'practices', 'howToPlay', 'learningGoals'].every(k => Array.isArray(PR[loc][k]) && PR[loc][k].length >= 3), `${loc}: the prose entry`);
  const text = PR[loc] ? Object.values(PR[loc]).flat().join(' ') : '', qs = [...text.matchAll(QUOTE[loc])].map(m => m[1].replace(/ /g, ' ').trim());
  is(qs.length >= 2, `${loc}: the prose quotes the book (${qs.length})`);
  for (const q of qs) is([...known].some(k => k.replace(/ /g, ' ') === q), `${loc}: the prose quote is in the book — "${q}"`);
  is(!/common core|1\.RI\.5/i.test(loc === 'en' ? '' : text), `${loc}: no Common Core in the prose`);
}
const row = JSON.parse(fs.readFileSync(path.join(MT, 'field-guide-activities.json'), 'utf8')).find(x => x.id === 'field-guide.text-features.1-ri-5');
is(row && row.tool === 'field-guide-activity', 'the manifest row');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'detective-deweys-field-guide', 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ tools: ['A', 'B', 'C', 'D'], help: ['after', 'start'], rounds: { A: 8, B: 8, C: 8, D: 8 } }), 'the row\'s params mirror the core');

/* ---------------- (g) the pictures: they exist, and every label points at a drawn pixel ---------------- */
(async () => {
  let sharp = null; try { sharp = require(path.join(REPO, 'frontend', 'node_modules', 'sharp')); } catch (e) {}
  const pics = Object.values(PICS).concat([C.DATA.DEWEY]);
  for (const p of pics) { is(fs.existsSync(path.join(IMG, p + '@2x.webp')), `picture ${p} exists`); is(!BW.test(p.split('/')[0]), `picture ${p} is in a colour theme`); }
  for (const pic of Object.keys(PICS)) {
    is(C.DATA.PICS[pic].pic === PICS[pic], `${pic}: the picture is the gate's`);
    if (!sharp) continue;
    const { data, info } = await sharp(path.join(IMG, PICS[pic] + '@2x.webp')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (const [k, at] of Object.entries(C.DATA.PICS[pic].at)) {
      const x = Math.round(at[0] * info.width), y = Math.round(at[1] * info.height); let best = 0;
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const i = ((y + dy) * info.width + (x + dx)) * 4 + 3; if (i > 0 && i < data.length) best = Math.max(best, data[i]); }
      is(best > 180, `${pic} ${k}: the label points at a drawn pixel (${at})`);
    }
  }
  is(!!sharp, 'sharp loads (the anchor check ran)');
  console.log(`verify-field-guide-core: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})();
