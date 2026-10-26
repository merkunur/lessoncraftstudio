#!/usr/bin/env node
/* =====================================================================
   verify-bea-two-bookshelves-core.js — the gate for ACTIVITY #118, The
   Shaker Shelf and the Ribbon Shelf (Bea's Two Bookshelves, RL.1.5; all
   11 locales). Its OWN ground truth: which books are stories, which
   topics pair up, each locale's beginning / ending words, sequence words,
   character names and fact-sounding title words are written out here.
     (a) the books: fifteen per locale, distinct titles; every story has
         three pages, the first opening with a beginning, the last with an
         ending, its marks on its pages; every fact page has a heading, no
         sequence word, no character's name — so a shaken fact book still
         makes sense and the shaker shelf never lies; every picture exists
         in a colour theme;
     (b) the rounds: Bea asks = the kept rounds; every ask round has
         exactly one book of the asked kind; Same topic has a same-topic
         pair of opposite kinds; Fill has two of each kind, a pair, every
         book two or three times;
     (c) the shelves: for EVERY book of EVERY round of EVERY level and
         locale — the ribbon ties only a story, the shaker keeps only a fact
         book upright; an empty Check is no miss; a wrong book comes back to
         the desk; the help only from miss 2 and gone after a new move; Fill
         is solved only by the one right arrangement; the off shelf takes
         nothing; shaking never leaves the pages as they were and closing
         puts them back;
     (d) the bots: the asked book's slot ≤ 3 of 8; the title-word bot's
         expected score ≤ 5 of 8 per level and locale;
     (e) the plan: a fresh order every pass, the slot table moved by one;
     (f) the strings ×11 and the manifest row.
   Usage: node scripts/verify-bea-two-bookshelves-core.js   (env BS_CORE_DIR / BS_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.BS_CORE_DIR || MT, ACT_DIR = process.env.BS_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'bea-two-bookshelves-core.js'));
const ACT = (() => { const ctx = { window: {}, BeaShelvesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'bea-two-bookshelves-activity.js'), 'utf8') + '\n;this.__A = window.BeaTwoBookshelvesActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'], LV = ['ask', 'topic', 'fill'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const rnd = (() => { let s = 7; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();
const W = (list) => new RegExp('(?<!\\p{L})(' + list + ')(?!\\p{L})', 'u');
const WI = (list) => new RegExp('(?<!\\p{L})(' + list + ')(?!\\p{L})', 'iu');

/* ---------------- this gate's truth ---------------- */
const STORIES = ['dragons', 'bunny', 'boat', 'goblin', 'pip', 'buzz', 'treewalk', 'digby'];
const FACTS = ['bugs', 'diggers', 'bones', 'trees', 'bees', 'rabbits', 'boats'];
const PAIR = { bees: 'buzz', rabbits: 'bunny', boats: 'boat', trees: 'treewalk', diggers: 'digby' };
const KIND = (id) => STORIES.indexOf(id) >= 0 ? 'story' : FACTS.indexOf(id) >= 0 ? 'fact' : null;
const EN_L1 = [['story', 'dragons bugs diggers'], ['story', 'bones bunny trees'], ['story', 'bees bones boat'], ['story', 'trees goblin diggers'], ['fact', 'bunny goblin bees'], ['fact', 'bones dragons pip'], ['fact', 'bunny boat trees'], ['fact', 'dragons diggers goblin']];
/* the kept en titles (two retitled at review: 'All About Real Bugs' → 'All About Insects' because a bug is not always an insect; 'How Tall Trees Grow' → 'All About Trees' because no page is about growing) */
const EN_KEPT = { dragons: 'The Sleepy Dragons', bugs: 'All About Insects', diggers: 'Diggers and Cranes', bones: 'Bones in Your Body', bunny: "Bunny's Lost Mitten", trees: 'All About Trees', bees: 'How Bees Make Honey', boat: 'The Brave Red Boat', goblin: "Goblin's Sock Hunt", pip: "Pip's Lucky Acorns" };
const BEGIN = { en: /^(One |Once upon a time|Every night)/, de: /^(Eines |An einem |Es war einmal)/, fr: /^(Un |Une |Il était une fois|Chaque )/, es: /^(Una |Un |Había una vez)/, pt: /^(Uma |Um |Num |Numa |Era uma vez)/,
  it: /^(Una |Un |C’era una volta)/, nl: /^(Op een |Er was eens)/, sv: /^(En |Det var en gång)/, da: /^(En |Der var engang)/, no: /^(En |Det var en gang)/, fi: /^(Eräänä |Olipa kerran)/ };
const END = { en: /^(At last|In the morning|In spring|By morning)/, de: /^(Endlich|Am Morgen|Im Frühling)/, fr: /^(Enfin|Le matin|Au printemps|Au matin)/, es: /^(Por fin|En la mañana|En la primavera)/, pt: /^(Por fim|De manhã|Na primavera)/,
  it: /^(Alla fine|La mattina dopo|In primavera)/, nl: /^(Eindelijk|De volgende ochtend|In de lente)/, sv: /^(Till slut|På morgonen|På våren)/, da: /^(Til sidst|Om morgenen|Om foråret)/, no: /^(Til slutt|Om morgenen|Om våren)/, fi: /^(Lopulta|Aamulla|Keväällä)/ };
const SEQ = { en: WI('first|then|next|after that|later|at last|finally|in the end'), de: WI('zuerst|dann|danach|später|endlich|schließlich|am Ende'), fr: WI('d’abord|puis|ensuite|après|enfin|plus tard|à la fin'),
  es: WI('primero|luego|después|más tarde|por fin|al final|finalmente'), pt: WI('primeiro|depois|em seguida|mais tarde|por fim|no final|finalmente'), it: WI('prima|poi|dopo|più tardi|alla fine|infine|finalmente'),
  nl: WI('eerst|toen|daarna|later|eindelijk|tot slot|ten slotte|dan'), sv: WI('först|sedan|sen|efter det|senare|till slut|äntligen|sist'), da: WI('først|så|derefter|bagefter|senere|til sidst|endelig'),
  no: WI('først|så|deretter|etterpå|senere|til slutt|endelig'), fi: WI('ensin|sitten|sen jälkeen|myöhemmin|lopulta|vihdoin|lopuksi') };
const NAMES = { en: 'Bunny|Gobbo|Pip|Buzz|Digby', de: 'Hoppel|Flix|Pip|Summsi|Baggi', fr: 'Lapin|Lulu|Pip|Zézette|Pelline', es: 'Tito|Lucho|Nico|Pip|Zumbi|Cavi', pt: 'Téo|Lito|Zeca|Pipo|Zuzu|Cavu',
  it: 'Tito|Nino|Pip|Zizì|Scavino', nl: 'Flap|Puk|Pip|Zoem|Graafje', sv: 'Nilla|Ville|Pip|Surr|Grävis', da: 'Hoppe|Nis|Pip|Summe|Gravo', no: 'Hoppe|Nils|Pip|Surre|Gravus', fi: 'Pomppu|Topi|Pip|Surri|Kaivuri' };
/* the words that make a title sound like a fact book (the shortcut a non-reader would take) */
const FACTY = { en: /\b(How|All About|Real|Why)\b/, de: /(Wie |Alles|echte|Echte|Warum)/, fr: /(Tout |Comment|Pourquoi|vrais)/, es: /(Todo|Cómo|Por qué|de verdad)/, pt: /(Tudo|Como|Por que|de verdade)/,
  it: /(veri|Come |Perché|Tutto|Le grandi)/, nl: /(Alles|Hoe |Waarom|echte|Echte|Zo werken)/, sv: /(Allt om|Hur |riktiga|Riktiga)/, da: /(Alt om|Sådan|rigtige|Rigtige)/, no: /(Alt om|Slik|ekte|Ekte)/, fi: /(Kaikki|Miten|Miksi|Oikeat|oikeista)/ };

/* ---------------- (a) the books ---------------- */
const IDS = Object.keys(C.DATA.BOOKS);
is(IDS.length === 15 && STORIES.concat(FACTS).every(id => IDS.indexOf(id) >= 0), 'fifteen books, the gate\'s own list');
IDS.forEach(id => {
  is(C.DATA.BOOKS[id].kind === KIND(id), `${id}: its kind is the gate's (${KIND(id)})`);
  const pic = C.DATA.BOOKS[id].pic; is(fs.existsSync(path.join(IMG, pic + '@2x.webp')) && !BW.test(pic.split('/')[0]), `${id}: the picture ${pic} exists in a colour theme`);
});
is(fs.existsSync(path.join(IMG, 'insects and bugs/worm@2x.webp')), 'Bea\'s picture exists');
for (const id of Object.keys(EN_KEPT)) is(C.book('en', id).t === EN_KEPT[id], `en ${id}: the kept title`);
for (const loc of ALL) {
  const titles = new Set(), names = W(NAMES[loc]);
  for (const id of IDS) {
    const b = C.book(loc, id); titles.add(b.t);
    is(b.t && b.b && b.p && b.p.length === 3, `${loc} ${id}: a title, a blurb and three pages`);
    if (!b.p || b.p.length !== 3) continue;
    if (KIND(id) === 'story') {
      is(BEGIN[loc].test(b.p[0].s), `${loc} ${id}: page one opens with a beginning («${b.p[0].s}»)`);
      is(END[loc].test(b.p[2].s), `${loc} ${id}: page three opens with an ending («${b.p[2].s}»)`);
      is(!END[loc].test(b.p[0].s) && !BEGIN[loc].test(b.p[2].s), `${loc} ${id}: the beginning and the ending are not swapped`);
      is(b.p.every(pg => !pg.h), `${loc} ${id}: a story's pages have no headings`);
      is(b.mk.length >= 2 && b.mk.every(m => b.p[m[0]] && b.p[m[0]].s.indexOf(m[1]) >= 0) && b.mk.some(m => m[0] === 0) && b.mk.some(m => m[0] === 2), `${loc} ${id}: its marks sit on pages one and three`);
    } else {
      b.p.forEach((pg, i) => {
        is(pg.h && pg.h.trim().length > 1 && pg.s.trim().length > 8, `${loc} ${id} p${i + 1}: a heading and a fact`);
        is(!SEQ[loc].test(pg.s) && !SEQ[loc].test(pg.h), `${loc} ${id} p${i + 1}: no sequence word («${pg.s}»)`);
        is(!names.test(pg.s) && !names.test(pg.h), `${loc} ${id} p${i + 1}: no character's name`);
      });
      if (loc === 'en') is(b.p.every(pg => !/^(It|They|This|These|That|He|She)\b/.test(pg.s)), `en ${id}: no page leans on another page`);
    }
    if (loc === 'fr' || loc === 'it') is(![b.t, b.b].concat(b.p.map(pg => pg.s), b.p.map(pg => pg.h || '')).some(s => /'/.test(s)), `${loc} ${id}: ’ in the text`);
    if (loc === 'fr') is(![b.t, b.b].concat(b.p.map(pg => pg.s), b.p.map(pg => pg.h || '')).some(s => / [:!?;»]/.test(s)), `fr ${id}: narrow spaces`);
  }
  is(titles.size === 15, `${loc}: fifteen distinct titles`);
}

/* ---------------- (b) the rounds ---------------- */
is(JSON.stringify(C.DATA.L1.map(r => [r.ask, r.books.join(' ')])) === JSON.stringify(EN_L1), 'Bea asks = the kept rounds');
['L1', 'L2'].forEach(L => C.DATA[L].forEach((R, i) => {
  is(R.books.length === 3 && new Set(R.books).size === 3 && R.books.filter(id => KIND(id) === R.ask).length === 1, `${L} r${i + 1}: three books, exactly one ${R.ask}`);
  if (L === 'L2') { const right = R.books.find(id => KIND(id) === R.ask); is(R.books.some(id => id !== right && (PAIR[id] === right || PAIR[right] === id)), `L2 r${i + 1}: the right book has a same-topic twin of the other kind`); }
}));
for (const L of ['L1', 'L2']) { const n = C.DATA[L].filter(r => r.ask === 'story').length; is(n === 4, `${L}: four story asks and four fact asks`); }
const cnt = {};
C.DATA.L3.forEach((set, i) => {
  is(set.length === 4 && new Set(set).size === 4 && set.filter(id => KIND(id) === 'story').length === 2, `L3 r${i + 1}: two stories and two fact books`);
  is(set.some(a => set.some(b => PAIR[a] === b)), `L3 r${i + 1}: a same-topic pair`);
  set.forEach(id => cnt[id] = (cnt[id] || 0) + 1);
});
is(IDS.every(id => cnt[id] >= 2 && cnt[id] <= 3), `L3: every book two or three times a pass (${JSON.stringify(cnt)})`);
is(new Set(C.DATA.L3.map(s => s.slice().sort().join())).size === 8, 'L3: no set twice');

/* ---------------- (c) the shelves ---------------- */
const shelfFor = (kind) => kind === 'story' ? 'ribbon' : 'shaker';
for (const id of IDS) { is(C.ribbonTest(id).tied === (KIND(id) === 'story'), `${id}: the ribbon ties only a story`); is(C.shakerTest(id).upright === (KIND(id) === 'fact'), `${id}: the shaker keeps only a fact book upright`); }
for (const loc of ALL) for (const lv of LV) for (const r of C.rounds()) for (let slot = 0; slot < (lv === 'fill' ? 4 : 3); slot++) {
  const tag = `${loc} ${lv} r${r + 1} slot ${slot}`;
  const fresh = () => C.newState(loc, lv, r, { slot });
  let st = fresh();
  if (lv !== 'fill') {
    const R = C.DATA[lv === 'topic' ? 'L2' : 'L1'][r], right = R.books.find(id => KIND(id) === R.ask), asked = shelfFor(R.ask), other = asked === 'ribbon' ? 'shaker' : 'ribbon';
    is(st.desk.length === 3 && st.desk.slice().sort().join() === R.books.slice().sort().join() && st.desk[slot] === right && st.right === right, `${tag}: the desk, the asked book at its slot`);
    is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st).key === (R.ask === 'story' ? 'hintEmptyStory' : 'hintEmptyFact'), `${tag}: an empty Check → the empty hint, no miss`);
    is(C.put(st, right, other) === 'no' && !st.place[right], `${tag}: the other shelf takes nothing`);
    for (const id of st.desk) {
      st = fresh(); C.open(st, id); is(C.put(st, id, asked) === 'in' && st.place[id] === asked, `${tag} ${id}: onto the asked shelf`);
      const a = C.check(st);
      if (id === right) is(a.result === 'ok' && st.done && a.tests.length === 1 && a.tests[0].pass, `${tag} ${id}: the shelf's test passes → solved`);
      else {
        is(a.result === 'miss' && !st.done && st.misses === 1 && st.place[id] === null && C.onShelf(st, asked).length === 0, `${tag} ${id}: the test fails → back to the desk, one miss`);
        is(st.last === (asked === 'shaker' ? 'storyOnShaker' : 'factOnRibbon') && C.hint(st).key === (asked === 'shaker' ? 'hintStoryOnShaker' : 'hintFactOnRibbon') && !C.help(st), `${tag} ${id}: the shelf's own hint, no help yet`);
        C.put(st, id, asked); C.check(st);
        is(st.misses === 2 && C.help(st) && C.helpBook(st) === right && C.hint(st).key === 'hintMiss2', `${tag} ${id}: miss 2 → the asked book opens with its marks`);
        C.open(st, right); is(!C.help(st), `${tag} ${id}: a new move takes the help away`);
      }
    }
    /* one book at a time: a second one sends the first back */
    st = fresh(); const [x, y] = st.desk.filter(id => id !== right); C.put(st, x, asked); C.put(st, y, asked);
    is(C.onShelf(st, asked).join() === y && st.place[x] === null, `${tag}: one book at a time on the asked shelf`);
    is(C.put(st, y, asked) === 'out' && st.place[y] === null, `${tag}: the same shelf again takes it back`);
  } else {
    const set = C.DATA.L3[r];
    is(st.desk.length === 4 && st.desk.slice().sort().join() === set.slice().sort().join() && st.ask === null, `${tag}: four books, no ask`);
    is(st.desk.map(id => KIND(id)[0]).join('') === C.FILL[r].split('').map((c, k) => C.FILL[r][(k + 4 - slot) % 4]).join(''), `${tag}: laid out by the round's pattern, moved by the pass`);
    C.put(st, st.desk[0], 'ribbon'); is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st).key === 'hintEmptyFill', `${tag}: Check before every book is on a shelf → the fill hint, no miss`);
    /* every 2+2 arrangement: only the right one is solved; the right books stay, the wrong ones come back */
    const combos = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
    for (const c of combos) {
      st = fresh(); const rib = c.map(k => st.desk[k]), sha = st.desk.filter((id, k) => c.indexOf(k) < 0);
      rib.forEach(id => C.put(st, id, 'ribbon')); sha.forEach(id => C.put(st, id, 'shaker'));
      const ok = rib.every(id => KIND(id) === 'story'), a = C.check(st);
      if (ok) is(a.result === 'ok' && st.done, `${tag} ${rib}: the right arrangement → solved`);
      else {
        const bad = rib.filter(id => KIND(id) === 'fact').concat(sha.filter(id => KIND(id) === 'story'));
        is(a.result === 'miss' && bad.every(id => st.place[id] === null) && st.desk.filter(id => bad.indexOf(id) < 0).every(id => st.place[id] && st.locked[id]), `${tag} ${rib}: the wrong books back, the right ones stay`);
        is(C.put(st, st.desk.find(id => st.locked[id]), 'ribbon') === 'no', `${tag} ${rib}: a book that passed its test stays put`);
      }
    }
    /* three on a shelf: the first goes back */
    st = fresh(); st.desk.slice(0, 3).forEach(id => C.put(st, id, 'ribbon'));
    is(C.onShelf(st, 'ribbon').length === 2 && st.place[st.desk[0]] === null, `${tag}: two books a shelf`);
  }
  /* open, shake, close */
  st = fresh(); const b0 = st.desk[0]; C.open(st, b0); let o0 = [0, 1, 2];
  for (let k = 0; k < 6; k++) { const o = C.shake(st, rnd); is(o && o.slice().sort().join() === '0,1,2' && o.join() !== o0.join(), `${tag}: a shake always changes the order`); o0 = o; }
  C.close(st); is(st.shake === null && st.sel === null, `${tag}: closing puts the pages back in order`);
  C.open(st, b0); is(st.shake === null, `${tag}: a book opens in order`);
}
/* the marks the help underlines */
for (const loc of ALL) for (const id of IDS) {
  const m = C.marks(loc, id), b = C.book(loc, id);
  if (KIND(id) === 'fact') is(m.length === 3 && m.every((x, i) => x[0] === i && x[1] === b.p[i].h), `${loc} ${id}: the marks are the three headings`);
  else is(m.some(x => x[0] === 0) && m.some(x => x[0] === 2), `${loc} ${id}: the marks are its beginning and its ending`);
}

/* ---------------- (d) the bots ---------------- */
for (const lv of ['ask', 'topic']) {
  const n = [0, 0, 0]; C.SLOTS[lv].forEach(x => n[x]++); is(Math.max(...n) <= 3, `${lv}: the asked book's slot balanced (${n})`);
  for (const loc of ALL) {
    let exp = 0;
    C.DATA[lv === 'topic' ? 'L2' : 'L1'].forEach(R => {
      const right = R.books.find(id => KIND(id) === R.ask), facty = R.books.filter(id => FACTY[loc].test(C.book(loc, id).t));
      const pool = R.ask === 'fact' ? (facty.length ? facty : R.books) : (R.books.length - facty.length ? R.books.filter(id => facty.indexOf(id) < 0) : R.books);
      exp += pool.indexOf(right) >= 0 ? 1 / pool.length : 0;
    });
    is(exp <= 5 + 1e-9, `${loc} ${lv}: the title-word bot expects ${exp.toFixed(2)} of 8 (≤ 5)`);
  }
}
for (let r = 0; r < 8; r++) for (let k = 0; k < 4; k++) { /* fill: each slot holds each kind four times a pass */ }
for (let k = 0; k < 4; k++) is(C.FILL.filter(p => p[k] === 's').length === 4, `fill: slot ${k + 1} holds a story in four of eight rounds`);

/* ---------------- (e) the plan ---------------- */
for (const loc of ['en', 'fi']) for (const lv of LV) {
  let prev = null;
  for (let pass = 0; pass < 6; pass++) {
    const P = C.plan(loc, lv, rnd, prev, pass);
    is(P.order.length === 8 && new Set(P.order).size === 8, `${loc} ${lv}: a pass is the eight rounds`);
    if (prev) is(P.order.join() !== prev.join(), `${loc} ${lv} pass ${pass}: a fresh order`);
    is(P.slots.every((x, r) => x === (lv === 'fill' ? pass % 4 : (C.SLOTS[lv][r] + pass) % 3)), `${loc} ${lv} pass ${pass}: the slot table moves by one each pass`);
    prev = P.order;
  }
}
const firsts = new Set(); for (let k = 0; k < 40; k++) firsts.add(C.plan('en', 'ask', Math.random, null, 0).order[0]); is(firsts.size >= 4, 'the first round varies between visits');

/* ---------------- (f) strings, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'bea-two-bookshelves-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'bea-two-bookshelves-core.js'), 'utf8');
const SH = ['title', 'instruction', 'instrBubble', 'okBubble'];
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 38, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^nudge|^ask|^ok/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(SH.indexOf(k) >= 0 || CSRC.indexOf("'" + k + "'") >= 0 || SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '').indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
for (const loc of ALL) { is(/\{title\}/.test(ACT.strings.okStory[loc]) && /\{title\}/.test(ACT.strings.okFact[loc]), `${loc}: the success lines name the book`); }
const row = JSON.parse(fs.readFileSync(path.join(MT, 'bea-two-bookshelves-activities.json'), 'utf8')).find(x => x.id === 'bea-two-bookshelves.story-or-fact.rl-1-5');
is(row && row.tool === 'bea-two-bookshelves-activity', 'the manifest row');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'bea-two-bookshelves' && row.page_title.en === "Bea's Two Bookshelves — Story Book or Fact Book? (Grade 1)", 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ books: ['ask', 'topic', 'fill'], pages: ['closed', 'open'], rounds: 8 }), 'the row\'s params mirror the core');

console.log(`verify-bea-two-bookshelves-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
