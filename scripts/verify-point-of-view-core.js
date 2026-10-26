#!/usr/bin/env node
/* =====================================================================
   verify-point-of-view-core.js — the gate for ACTIVITY #119, The Window
   That Shows What It Sees (Lumen's Lighthouse Windows, RL.1.6; all 11
   locales). Its OWN ground truth: the en answer table (each round's view
   and answer creature), each locale's view words (high / middle / low)
   and each creature's closed body-part list, with the parts two
   creatures share banned outright, are written out here.
     (a) Level 1: twelve rounds; views 4/4/4; the answer creature 3/3/3/3;
         an event object is never also a window creature; every line holds
         its own view's words and none of the other two views'; the marks
         sit in the line; every picture exists in a colour theme;
     (b) Level 2: eight stories; every part line names a part from its
         teller's list and from no other creature's; no banned shared part;
         every view line holds its teller's window's words; one creature
         tells two parts in exactly two stories; part 1 is the high
         window's in at most three stories;
     (c) the windows: for EVERY round and EVERY window — only the view's
         window solves; an empty Check is no miss; the views side by side
         only from miss 2, gone after a new choice; Level 2 — EVERY one of
         the 27 ways to hang three parts: only the right one solves, the
         right parts stay, the wrong ones come back, the hint names the
         creature at the wrong window and the part it lacks;
     (d) the plan: a fresh order; Level 1 never asks one window three
         rounds in a row;
     (e) the strings ×11 and the manifest row.
   Usage: node scripts/verify-point-of-view-core.js   (env PV_CORE_DIR / PV_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.PV_CORE_DIR || MT, ACT_DIR = process.env.PV_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'point-of-view-core.js'));
const ACT = (() => { const ctx = { window: {}, LumenWindowsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'point-of-view-activity.js'), 'utf8') + '\n;this.__A = window.PointOfViewActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'], WINS = ['high', 'mid', 'low'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const rnd = (() => { let s = 11; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();
const W = (list) => new RegExp('(?<!\\p{L})(' + list + ')(?!\\p{L})', 'iu');

/* ---------------- this gate's truth ---------------- */
const EN = { boat: ['high', 'gull'], fish: ['high', 'mouse'], sail: ['high', 'rabbit'], whale: ['high', 'crab'], crab: ['low', 'mouse'], jelly: ['low', 'rabbit'],
  dolphin: ['low', 'mouse'], pelican: ['low', 'crab'], kite: ['mid', 'rabbit'], balloon: ['mid', 'gull'], heli: ['mid', 'crab'], butterfly: ['mid', 'gull'] };
const CREATURE_PIC = { gull: 'beach/seagull', mouse: 'forest creatures/mouse', rabbit: 'forest creatures/rabbit', crab: 'beach/crab' };
const VIEW = {
  en: { high: 'tiny|teeny-tiny|far below|far away', mid: 'straight across|not up, not down|not higher, not lower|just as high as', low: 'huge|big|close|under me|over my head|up into my face' },
  de: { high: 'winzig\\p{L}*|weit weg|tief unten', mid: 'genau gegenüber|nicht höher und nicht tiefer', low: 'riesig|groß|ganz nah|unter mir|über meinen Kopf|ins Gesicht' },
  fr: { high: 'tout petit|minuscule\\p{L}*|loin|tout en bas', mid: 'juste en face|ni plus haut ni plus bas', low: 'énorme|grosse|tout près|sous moi|au-dessus de ma tête|à la figure|sur ma figure' },
  es: { high: 'puntito|pequeñit\\p{L}*|lejos|allá abajo', mid: 'justo enfrente|ni más arriba ni más abajo', low: 'enorme|grande|muy cerca|debajo de mí|por encima de mi cabeza|en la cara' },
  pt: { high: 'pontinho|pequenininh\\p{L}*|longe|lá embaixo', mid: 'bem em frente|nem mais alto, nem mais baixo', low: 'enorme|grande|pertinho|embaixo de mim|por cima da minha cabeça|na minha cara' },
  it: { high: 'puntino|piccolissim\\p{L}*|lontano|laggiù in basso', mid: 'proprio di fronte|né più su né più giù', low: 'enorme|grande|vicinissim\\p{L}*|sotto di me|sopra la mia testa|in faccia' },
  nl: { high: 'piepklein\\p{L}*|ver weg|diep beneden', mid: 'recht tegenover|niet hoger en niet lager', low: 'enorm|groot|vlakbij|onder me|over mijn hoofd|in mijn gezicht' },
  sv: { high: 'pyttelit\\p{L}*|pyttesmå|långt där nere|långt bort', mid: 'mitt emot|inte högre och inte lägre', low: 'jättestor\\p{L}*|stor|alldeles nära|under mig|över mitt huvud|i ansiktet' },
  da: { high: 'bitte lille|bitte små|langt nede|langt væk', mid: 'lige over for|hverken højere eller lavere', low: 'kæmpestor\\p{L}*|stor|helt tæt på|under mig|over hovedet på mig|i ansigtet' },
  no: { high: 'bitteliten|bittesmå|langt der nede|langt borte', mid: 'rett overfor|verken høyere eller lavere', low: 'kjempestor\\p{L}*|stor|helt nær|under meg|over hodet mitt|i ansiktet' },
  fi: { high: 'pikkurui\\p{L}*|kaukana', mid: 'suoraan vastapäätä|ei ylempänä eikä alempana', low: 'valtava\\p{L}*|iso|ihan lähellä|minun allani|pääni yli|kasvoilleni' }
};
/* each creature's closed list (a part, or the way only it moves or calls), and the parts two creatures share */
const PARTS = {
  en: { gull: 'wings?|beak', mouse: 'long thin tail|squeak\\p{L}*', rabbit: 'long ears|big back feet|hopped', crab: 'pincers|shell|scuttled sideways', ban: 'whiskers|nose|claws|sniff\\p{L}*|nibbl\\p{L}*' },
  de: { gull: 'Flügel\\p{L}*|Schnabel', mouse: 'Schwanz|piepse', rabbit: 'Ohren|Hinterbein\\p{L}*|hüpfe', crab: 'Scheren|Panzer|seitwärts', ban: 'Schnurrhaar\\p{L}*|Nase|Krallen|schnupper\\p{L}*|knabber\\p{L}*' },
  fr: { gull: 'ailes?|bec', mouse: 'queue|couine', rabbit: 'oreilles|pattes arrière|saute', crab: 'pinces|carapace|de côté', ban: 'moustaches|nez|griffes|renifl\\p{L}*|grignot\\p{L}*' },
  es: { gull: 'alas?|pico', mouse: 'cola|chillo', rabbit: 'orejas|patas traseras|brincando', crab: 'pinzas|caparazón|de lado', ban: 'bigotes|nariz|garras|olfate\\p{L}*|mordisque\\p{L}*' },
  pt: { gull: 'asas?|bico', mouse: 'rabo|guincho', rabbit: 'orelhas|patas de trás|pulando', crab: 'pinças|carapaça|de lado', ban: 'bigodes|nariz|garras|fareja\\p{L}*|mordisca\\p{L}*' },
  it: { gull: 'ali|ala|becco', mouse: 'coda|squittisco', rabbit: 'orecchie|zampe posteriori|saltellando', crab: 'chele|guscio|di lato', ban: 'baffi|naso|artigli|annus\\p{L}*|rosicchi\\p{L}*' },
  nl: { gull: 'vleugels?|snavel', mouse: 'staart|piep', rabbit: 'oren|achterpoten|hop', crab: 'scharen|schild|zijwaarts', ban: 'snorharen|neus|klauwen|snuffel\\p{L}*|knabbel\\p{L}*' },
  sv: { gull: 'vingar\\p{L}*|vingen|näbb\\p{L}*', mouse: 'svans|piper', rabbit: 'öron|bakfötter|skuttar', crab: 'skal\\p{L}*|sidled', ban: 'morrhår|nos|klor|nosa\\p{L}*|gnag\\p{L}*|knapr\\p{L}*' },
  da: { gull: 'vinger\\p{L}*|vingen|næb\\p{L}*', mouse: 'hale|piber', rabbit: 'ører|bagben|hopper', crab: 'skjold\\p{L}*|sidelæns', ban: 'knurhår|næse|kløer|snuse\\p{L}*|gnave\\p{L}*' },
  no: { gull: 'vinge\\p{L}*|nebb\\p{L}*', mouse: 'halen|hale|piper', rabbit: 'ørene|ører|bakbein\\p{L}*|hopper', crab: 'skall\\p{L}*|sidelengs', ban: 'værhår|nese|klør|snuse\\p{L}*|gnage\\p{L}*' },
  fi: { gull: 'siip\\p{L}*|siive\\p{L}*|nokka\\p{L}*', mouse: 'hän\\p{L}*|vingun', rabbit: 'korv\\p{L}*|takajal\\p{L}*|hypin', crab: 'saks\\p{L}*|kuor\\p{L}*|sivuttain', ban: 'viiks\\p{L}*|nenä\\p{L}*|kynn\\p{L}*|nuuhk\\p{L}*|nakert\\p{L}*' }
};
const CREATURES = ['gull', 'mouse', 'rabbit', 'crab'];

/* ---------------- (a) Level 1 ---------------- */
is(C.DATA.L1.length === 12 && C.DATA.L1.every(m => EN[m.id] && EN[m.id][0] === m.view), 'twelve rounds, each with the gate\'s view');
for (const m of C.DATA.L1) {
  is(m.chars[m.view] === EN[m.id][1], `${m.id}: the ${m.view} window's creature is the gate's (${EN[m.id][1]})`);
  is(WINS.every(w => CREATURES.indexOf(m.chars[w]) >= 0) && new Set(WINS.map(w => m.chars[w])).size === 3, `${m.id}: three different creatures`);
  is(WINS.every(w => CREATURE_PIC[m.chars[w]] !== m.pic), `${m.id}: the event object is not a window creature`);
  is(fs.existsSync(path.join(IMG, m.pic + '@2x.webp')) && !BW.test(m.pic.split('/')[0]), `${m.id}: the picture ${m.pic} exists in a colour theme`);
  is(/^#[0-9A-F]{6}$/i.test(m.dot), `${m.id}: a dot colour for the high view`);
}
const vc = {}, ac = {}; C.DATA.L1.forEach(m => { vc[m.view] = (vc[m.view] || 0) + 1; ac[m.chars[m.view]] = (ac[m.chars[m.view]] || 0) + 1; });
is(WINS.every(w => vc[w] === 4), `views 4/4/4 (${JSON.stringify(vc)})`);
is(CREATURES.every(k => ac[k] === 3), `the answer creature 3/3/3/3 (${JSON.stringify(ac)})`);
for (const k of Object.values(CREATURE_PIC).concat(['birds 2/owl'])) is(fs.existsSync(path.join(IMG, k + '@2x.webp')), `${k} exists`);
for (const loc of ALL) {
  const V = VIEW[loc];
  C.rounds('window').forEach(r => {
    const R = C.round1(loc, r), tag = `${loc} L1 ${R.id}`;
    is(R.event && R.line, `${tag}: an event and a line`);
    is(W(V[R.view]).test(R.line), `${tag}: the line holds its ${R.view} view's words («${R.line}»)`);
    WINS.filter(w => w !== R.view).forEach(w => is(!W(V[w]).test(R.line), `${tag}: no ${w} view words in a ${R.view} line («${(R.line.match(W(V[w])) || [])[0]}»)`));
    is(R.marks.length >= 1 && R.marks.every(mk => R.line.indexOf(mk) >= 0 && W(V[R.view]).test(mk)), `${tag}: its marks are its view words, in the line`);
  });
}

/* ---------------- (b) Level 2 ---------------- */
is(C.DATA.L2.length === 8, 'eight stories');
let twice = 0, firstHigh = 0;
C.DATA.L2.forEach((m, i) => {
  is(new Set(WINS.map(w => m.chars[w])).size === 3 && m.tellers.every(t => WINS.some(w => m.chars[w] === t)), `story ${i + 1}: three creatures, every teller at a window`);
  if (new Set(m.tellers).size < 3) twice++;
  if (C.winOf(m.chars, m.tellers[0]) === 'high') firstHigh++;
});
is(twice === 2, `one creature tells two parts in exactly two stories (${twice})`);
is(firstHigh <= 3, `part 1 belongs to the high window in ${firstHigh} of 8 stories (≤ 3)`);
for (const loc of ALL) {
  const P = PARTS[loc], V = VIEW[loc];
  C.rounds('tellers').forEach(r => {
    const S = C.round2(loc, r);
    S.lines.forEach((l, j) => {
      const tag = `${loc} L2 s${r + 1}.${j + 1}`, has = CREATURES.filter(k => W(P[k]).test(l.t));
      is(!W(P.ban).test(l.t), `${tag}: no part two creatures share («${(l.t.match(W(P.ban)) || [])[0]}»)`);
      is(l.mk && l.t.indexOf(l.mk) >= 0, `${tag}: its mark is in the line`);
      if (l.clue === 'part') {
        is(has.length === 1 && has[0] === l.teller, `${tag}: names a part of ${l.teller} only (found: ${has.join(',') || 'none'}) «${l.t}»`);
        is(W(P[l.teller]).test(l.mk) && l.hp, `${tag}: the mark is the part, the hint has a phrase`);
      } else {
        const w = C.winOf(S.chars, l.teller);
        is(has.length === 0, `${tag}: a view line names no part (${has.join(',')})`);
        is(W(V[w]).test(l.t) && WINS.filter(x => x !== w).every(x => !W(V[x]).test(l.t)), `${tag}: a view line holds only its ${w} window's words «${l.t}»`);
      }
    });
  });
  is(CREATURES.every(k => C.name(loc, k)) && new Set(CREATURES.map(k => C.name(loc, k))).size === 4, `${loc}: four names`);
  if (loc === 'fi') is(CREATURES.every(k => /(lla|llä)$/.test(C.DATA.fi.nameAd[k])), 'fi: the names in the adessive');
}

/* ---------------- (c) the windows ---------------- */
for (const loc of ALL) {
  C.rounds('window').forEach(r => {
    const tag = `${loc} L1 r${r + 1}`, view = C.DATA.L1[r].view;
    let st = C.newState(loc, 'window', r);
    is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st).key === 'hintEmptyWindow', `${tag}: an empty Check → the empty hint, no miss`);
    for (const w of WINS) {
      st = C.newState(loc, 'window', r); C.choose(st, w); const a = C.check(st);
      if (w === view) is(a.result === 'ok' && st.done, `${tag} ${w}: the view's window solves`);
      else {
        is(a.result === 'miss' && !st.done && st.misses === 1 && C.hint(st).key === 'hintL1Miss1' && !C.help(st), `${tag} ${w}: a miss, the view hint, no side-by-side yet`);
        C.check(st); is(st.misses === 2 && C.help(st) && C.hint(st).key === 'hintL1Miss2', `${tag} ${w}: miss 2 → the three views side by side`);
        C.choose(st, WINS.find(x => x !== w)); is(!C.help(st), `${tag} ${w}: a new choice takes it away`);
      }
    }
  });
  C.rounds('tellers').forEach(r => {
    const S = C.round2(loc, r), right = S.lines.map(l => C.winOf(S.chars, l.teller));
    for (let k = 0; k < 27; k++) {
      const ways = [WINS[k % 3], WINS[Math.floor(k / 3) % 3], WINS[Math.floor(k / 9)]], tag = `${loc} L2 s${r + 1} ${ways}`;
      const st = C.newState(loc, 'tellers', r);
      ways.forEach((w, i) => { C.pick(st, i); C.hang(st, w); });
      const a = C.check(st), ok = ways.every((w, i) => w === right[i]);
      if (ok) { is(a.result === 'ok' && st.done, `${tag}: the right way solves`); continue; }
      is(a.result === 'miss' && !st.done && ways.every((w, i) => (w === right[i]) === (st.hang[i] === w && st.locked[i])) && ways.every((w, i) => w === right[i] || st.hang[i] === null), `${tag}: the right parts stay, the wrong ones come back`);
      const first = ways.findIndex((w, i) => w !== right[i]), h = C.hint(st), l = S.lines[first];
      is(h.name === S.chars[ways[first]] && h.key === (l.clue === 'part' ? 'hintPart' : 'hintView') && (l.clue !== 'part' || h.hp === l.hp), `${tag}: the hint names the creature at the wrong window${l.clue === 'part' ? ' and the part it lacks' : ''}`);
      is(C.pick(st, ways.findIndex((w, i) => w === right[i])) === 'no' || ways.every((w, i) => w !== right[i]), `${tag}: a part that stayed cannot be moved`);
    }
    /* empty, one part at a time, the same window again takes it off */
    const st = C.newState(loc, 'tellers', r);
    C.pick(st, 0); C.hang(st, 'high'); is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st).key === 'hintEmptyTellers', `${loc} L2 s${r + 1}: Check before every part is given → no miss`);
    is(C.hang(st, 'mid') === 'no', `${loc} L2 s${r + 1}: no part picked, a window takes nothing`);
    C.pick(st, 0); is(C.hang(st, 'high') === 'off' && st.hang[0] === null, `${loc} L2 s${r + 1}: a part on its window again comes off`);
  });
}

/* ---------------- (d) the plan ---------------- */
for (const lv of ['window', 'tellers']) {
  let prev = null;
  for (let pass = 0; pass < 30; pass++) {
    const P = C.plan(lv, rnd, prev), n = lv === 'window' ? 12 : 8;
    is(P.order.length === n && new Set(P.order).size === n, `${lv}: a pass is every round`);
    if (prev) is(P.order.join() !== prev.join(), `${lv} pass ${pass}: a fresh order`);
    if (lv === 'window') is(!C.threeInRow(P.order) && P.order.every((x, i) => i < 2 || !(C.DATA.L1[x].view === C.DATA.L1[P.order[i - 1]].view && C.DATA.L1[x].view === C.DATA.L1[P.order[i - 2]].view)), `window pass ${pass}: never one window three rounds in a row`);
    prev = P.order;
  }
}
const firsts = new Set(); for (let k = 0; k < 40; k++) firsts.add(C.plan('window', Math.random, null).order[0]); is(firsts.size >= 4, 'the first round varies between visits');

/* ---------------- (e) strings, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'point-of-view-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'point-of-view-core.js'), 'utf8');
const SH = ['title', 'instruction', 'instrBubble', 'okBubble'];
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 38, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^nudge|^ok/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(SH.indexOf(k) >= 0 || CSRC.indexOf("'" + k + "'") >= 0 || SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '').indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
for (const loc of ALL) is(/\{name\}/.test(ACT.strings.okHigh[loc]) && (loc === 'fi' ? /\{nameAd\}/ : /\{name\}/).test(ACT.strings.hintPart[loc]) && /\{hp\}/.test(ACT.strings.hintPart[loc]), `${loc}: the success and part hints carry their names`);
for (const loc of ['fr', 'it']) C.rounds('window').forEach(r => { const R = C.round1(loc, r); is(!/'/.test(R.event + R.line), `${loc} L1 r${r + 1}: ’ in the text`); });
const row = JSON.parse(fs.readFileSync(path.join(MT, 'point-of-view-activities.json'), 'utf8')).find(x => x.id === 'point-of-view.who-told.rl-1-6');
is(row && row.tool === 'point-of-view-activity', 'the manifest row');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'point-of-view-who-is-telling' && row.page_title.en === "Lumen's Lighthouse Windows — Point of View (Grade 1)", 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ task: ['window', 'tellers'], views: ['after', 'all'], rounds: { window: 12, tellers: 8 } }), 'the row\'s params mirror the core');

console.log(`verify-point-of-view-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
