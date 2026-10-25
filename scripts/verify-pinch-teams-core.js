#!/usr/bin/env node
/* =====================================================================
   verify-pinch-teams-core.js — the gate for ACTIVITY #112, The Talking
   Clasp (Build Vowel-Team Words, RF.1.3; en de nl fr). Its OWN ground
   truth: a lock list and a word table typed here by hand per locale
   (never read from the core), the sound-boxes banks re-read from disk,
   and the pictures on disk.
     (a) the words: each word's display and teams equal the gate's table;
         words that are bank rows agree with the bank's boxes; every
         picture exists in a colour theme; refused words absent; only
         en de nl fr ship;
     (b) the clasp: all ordered pairs of the tray's vowels lock exactly
         when the gate's list says (oa locks, ao does not);
     (c) the talker: English oa / ai / ee / ea light their FIRST letter;
         every other team, and every other locale, lights as one sound;
     (d) the tray: holds every letter the word's teams need (capitals for a
         capitalised word that starts with its team); never a team's two
         letters side by side in team order;
     (e) Check: the word's teams → right; any other locked team → wrong;
         a lone vowel → single; en ee for ea (or ea for ee) → spelling,
         the word's card shown and the child's team sent back; an empty
         socket → no miss; miss 2 → the badge (en talker letter) and only
         the right team's letters bright; a new move takes the help away;
     (f) Same sound? (en): ee and ea only, the long-E words only;
     (g) the plan: fresh order, sets alternate, the same team never more
         than two running (or the shortest run the set allows — fr); Same sound? ee on the left 4 or 5 of nine, never three
         running;
     (h) the strings (en de nl fr; no digit in a hint; never "free"; fr
         narrow spaces and curly apostrophes; every key asked for).
   Usage: node scripts/verify-pinch-teams-core.js   (env PT_CORE_DIR / PT_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.PT_CORE_DIR || MT, ACT_DIR = process.env.PT_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'pinch-teams-core.js'));
const ACT = (() => { const ctx = { window: {}, PinchTeamsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'pinch-teams-activity.js'), 'utf8') + '\n;this.__A = PinchTeamsActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const SHIP = ['en', 'de', 'nl', 'fr'];
/* the gate's own lock lists: the vowel teams of each language a Grade-1 class meets */
const LOCK = {
  en: 'oa ai ee ea oo ie ue oe ou au oi ei ui',
  de: 'ie au eu ei ai oo aa ee',
  nl: 'aa ee oo uu oe ui eu ie ei ou au ai oi',
  fr: 'ou oi ai au ei eu'
};
/* the gate's own word table: id → display / teams */
const W = {
  en: { boat: 'boat/oa', goat: 'goat/oa', coat: 'coat/oa', train: 'train/ai', snail: 'snail/ai', bee: 'bee/ee', sheep: 'sheep/ee', leaf: 'leaf/ea', seal: 'seal/ea', jeep: 'jeep/ee',
    nail: 'nail/ai', teapot: 'teapot/ea', eagle: 'eagle/ea', beaver: 'beaver/ea', toaster: 'toaster/oa', mailbox: 'mailbox/ai', oatmeal: 'oatmeal/oa,ea', sailboat: 'sailboat/ai,oa',
    cheese: 'cheese/ee', peacock: 'peacock/ea' },
  de: { pig: 'Schwein/ei', leg: 'Bein/ei', mouse: 'Maus/au', house: 'Haus/au', fence: 'Zaun/au', car: 'Auto/Au', owl: 'Eule/Eu', dress: 'Kleid/ei', bee: 'Biene/ie', goat: 'Ziege/ie', boat: 'Boot/oo' },
  nl: { maan: 'maan/aa', boot: 'boot/oo', boek: 'boek/oe', muis: 'muis/ui', uil: 'uil/ui', deur: 'deur/eu', kaas: 'kaas/aa', huis: 'huis/ui', vaas: 'vaas/aa', roos: 'roos/oo',
    neus: 'neus/eu', voet: 'voet/oe', duif: 'duif/ui', kool: 'kool/oo' },
  fr: { loup: 'loup/ou', chou: 'chou/ou', souris: 'souris/ou', poule: 'poule/ou', bouche: 'bouche/ou', poire: 'poire/oi', etoile: 'étoile/oi', four: 'four/ou', ours: 'ours/ou' }
};
const TALKERS = { oa: 'o', ai: 'a', ee: 'e', ea: 'e' };
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
let rnd = (() => { let s = 777; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();

/* ---------------- (a) the words ---------------- */
is(JSON.stringify(C.LOCALES) === JSON.stringify(SHIP), 'only en de nl fr ship');
['es', 'it', 'pt', 'sv', 'da', 'fi', 'no'].forEach(l => is(C.locale(l) === 'en' && !C.WORDS[l], `${l}: not shipped`));
SHIP.forEach(l => {
  const bank = {}; JSON.parse(fs.readFileSync(path.join(MT, 'sound-boxes-bank-' + l + '.json'), 'utf8')).words.forEach(w => { bank[w.id] = w; });
  Object.keys(C.WORDS[l]).forEach(id => {
    const w = C.word(l, id), mine = W[l][id];
    is(!!mine, `${l} ${id}: in the gate's table`); if (!mine) return;
    const [disp, teams] = mine.split('/');
    is(w.display === disp && w.teams.join(',') === teams, `${l} ${id}: ${disp} / ${teams} (core ${w.display} / ${w.teams.join(',')})`);
    is(fs.existsSync(path.join(IMG, w.pic + '@2x.webp')) && !BW.test(w.pic.split('/')[0].trim()), `${l} ${id}: picture ${w.pic}`);
    const b = bank[id];
    if (b) { is(b.display === w.display, `${l} ${id}: the bank's word`); w.teams.forEach(t => is(b.boxes.indexOf(t) >= 0, `${l} ${id}: the bank writes ${t} as one box (${b.boxes.join('·')})`)); }
  });
  C.BUILD[l].forEach((set, i) => { is(set.length >= 7 && new Set(set).size === set.length, `${l} set ${i}: ≥ 7 distinct words`); set.forEach(id => is(!!C.WORDS[l][id], `${l} ${id}: a word`)); });
});
['rain', 'beetle', 'cow'].forEach(id => is(!C.WORDS.en[id], `${id} is refused`));

/* ---------------- (b) the clasp ---------------- */
SHIP.forEach(l => {
  const list = LOCK[l].split(' '), V = 'aeiou';
  for (const a of V) for (const b of V) { const p = a + b; is(C.isTeam(l, p) === list.includes(p), `${l} ${p}: ${list.includes(p) ? 'locks' : 'refused'}`); is(C.isTeam(l, p.toUpperCase()[0] + b) === list.includes(p), `${l} ${p}: capitals lock alike`); }
  is(C.TEAMS[l].slice().sort().join() === list.slice().sort().join(), `${l}: the lock list is the gate's`);
});

/* ---------------- (c) the talker ---------------- */
SHIP.forEach(l => C.TEAMS[l].forEach(t => is(C.talker(l, t) === (l === 'en' ? TALKERS[t] || null : null), `${l} ${t}: talker ${l === 'en' ? TALKERS[t] || 'none' : 'none'}`)));

/* ---------------- (d) the tray + (e) Check ---------------- */
SHIP.forEach(l => C.BUILD[l].forEach((set, si) => set.forEach(id => {
  const w = C.word(l, id), need = {};
  w.teams.forEach(t => t.split('').forEach(c => { need[c] = (need[c] || 0) + 1; }));
  let fair = true, shape = true;
  for (let k = 0; k < 300; k++) {
    const st = C.newState(l, 'build', si, id, { rnd }), have = {};
    st.tray.forEach(x => { have[x.c] = (have[x.c] || 0) + 1; });
    if (Object.keys(need).some(c => (have[c] || 0) < need[c])) shape = false;
    for (let q = 1; q < st.tray.length; q++) for (const t of w.teams) if (st.tray[q - 1].c.toLowerCase() === t[0].toLowerCase() && st.tray[q].c.toLowerCase() === t[1].toLowerCase()) fair = false;
  }
  is(shape, `${l} ${id}: the tray holds every letter the teams need (with their capitals)`);
  is(fair, `${l} ${id}: never a team's letters side by side in team order`);
  /* pour the right teams: right */
  const right = C.newState(l, 'build', si, id, { rnd }), take = (st, c) => st.tray.findIndex((x, i) => x.c === c && C.usedAt(st, i) < 0);
  is(C.check(right).result === 'tray' && right.misses === 0, `${l} ${id}: Check with empty sockets → no miss`);
  w.teams.forEach((t, s) => { const r1 = C.drop(right, take(right, t[0]), s), r2 = C.drop(right, take(right, t[1]), s); is(r1 === 'placed' && r2 === 'locked', `${l} ${id}: ${t} locks in socket ${s + 1}`); });
  is(C.check(right).result === 'ok', `${l} ${id}: the word's teams are right`);
  /* every other locking pair in socket 1 → wrong (or spelling for en ee/ea) */
  const vowels = [...new Set(C.newState(l, 'build', si, id, { rnd }).tray.map(x => x.c))];
  for (const a of vowels) for (const b of vowels) {
    const st = C.newState(l, 'build', si, id, { rnd }), ta = take(st, a); C.drop(st, ta, 0); const tb = take(st, b); if (tb < 0) continue;
    const r = C.drop(st, tb, 0), pair = a + b, locks = LOCK[l].split(' ').includes(pair.toLowerCase());
    is(r === (locks ? 'locked' : 'refused'), `${l} ${id} ${pair}: ${locks ? 'locks' : 'refused'} (${r})`);
    if (!locks) { is(st.sockets[0].tiles.length === 1, `${l} ${id} ${pair}: the refused vowel goes back`); continue; }
    w.teams.slice(1).forEach((t, s) => { C.drop(st, take(st, t[0]), s + 1); C.drop(st, take(st, t[1]), s + 1); });
    const want = w.teams[0], res = C.check(st);
    const kind = pair.toLowerCase() === want.toLowerCase() ? 'ok' : (l === 'en' && ['ee', 'ea'].includes(pair) && ['ee', 'ea'].includes(want.toLowerCase())) ? 'spelling' : 'wrong';
    is(st.last === kind, `${l} ${id} ${pair}: ${kind} (${st.last})`);
    if (kind === 'spelling') is(st.reveal && st.reveal[0] === 0 && st.sockets[0].tiles.length === 0 && C.hint(st).key === 'hintSpelling', `${l} ${id} ${pair}: the word's card shown, the team sent back`);
    if (kind === 'wrong') {
      is(C.badge(st) === null && C.bright(st) === null, `${l} ${id} ${pair}: no badge, no dimming at miss 1`);
      C.check(st);
      const tk = l === 'en' ? TALKERS[want.toLowerCase()] : null;
      is(C.badge(st) === (tk ? tk.toUpperCase() : null), `${l} ${id}: miss 2 badge ${tk ? tk.toUpperCase() : 'none'}`);
      is(JSON.stringify(C.bright(st)) === JSON.stringify(want.toLowerCase().split('')), `${l} ${id}: miss 2 leaves ${want} bright`);
      is(C.hint(st).key === (tk ? 'hintWrong2' : 'hintWrong2Team'), `${l} ${id}: miss 2 hint`);
      C.clearSock(st, 0); is(st.last === null && C.hint(st) === null && C.badge(st) === null, `${l} ${id}: a new move takes the help away`);
    }
    void res;
  }
  /* a lone vowel */
  const lone = C.newState(l, 'build', si, id, { rnd }); w.teams.forEach((t, s) => C.drop(lone, take(lone, t[0]), s));
  is(C.check(lone).result === 'miss' && lone.last === 'single' && C.hint(lone).key === 'hintSingle', `${l} ${id}: a lone vowel → single`);
})));

/* ---------------- (f) Same sound? ---------------- */
is(JSON.stringify(C.clues('en')) === '["build","same"]' && ['de', 'nl', 'fr'].every(l => JSON.stringify(C.clues(l)) === '["build"]'), 'Same sound? is English only');
C.SAME.forEach(id => {
  const w = C.word('en', id); is(w.teams.length === 1 && ['ee', 'ea'].includes(w.teams[0]), `same ${id}: one team, ee or ea`);
  for (const pos of [0, 1]) {
    const st = C.newState('en', 'same', 0, id, { pos });
    is(st.tray.length === 2 && st.tray[pos].c === 'ee' && st.tray[1 - pos].c === 'ea', `same ${id} pos ${pos}: ee and ea in their slots`);
    const wrongT = st.tray.findIndex(x => x.c !== w.teams[0]), rightT = 1 - wrongT;
    C.drop(st, wrongT, null); is(C.check(st).kind === 'spelling', `same ${id}: the other spelling → spelling`);
    C.drop(st, rightT, null); is(C.check(st).result === 'ok', `same ${id}: its own spelling → right`);
  }
});

/* ---------------- (g) the plan ---------------- */
SHIP.forEach(l => { for (const clue of C.clues(l)) {
  let prev = null, ok = 0;
  for (let p = 0; p < 300; p++) {
    const P = C.plan(l, clue, rnd, prev, p), set = clue === 'build' ? p % C.BUILD[l].length : 0, ids = clue === 'same' ? C.SAME : C.BUILD[l][set];
    const firsts = P.order.map(id => C.word(l, id).teams[0].toLowerCase()), cnt = {}; firsts.forEach(x => { cnt[x] = (cnt[x] || 0) + 1; }); const mx = Math.max(...Object.values(cnt)), lim = Math.max(2, Math.ceil(mx / (firsts.length - mx + 1))); let run = 1, three = false; for (let i = 1; i < firsts.length; i++) { run = firsts[i] === firsts[i - 1] ? run + 1 : 1; if (run > lim) three = true; }
    let good = JSON.stringify(P.order.slice().sort()) === JSON.stringify(ids.slice().sort()) && P.set === set && JSON.stringify(P.order) !== JSON.stringify(prev) && !three;
    if (clue === 'same') { const left = P.pos.filter(x => x === 0).length, t3 = P.pos.some((x, i) => i >= 2 && x === P.pos[i - 1] && x === P.pos[i - 2]); good = good && (left === 4 || left === 5) && !t3; }
    if (good) ok++; prev = P.order;
  }
  is(ok === 300, `${l} ${clue} plan: fresh order, sets alternate, the same team never three running (${ok}/300)`);
} });

/* ---------------- (h) strings ---------------- */
const S = ACT.strings, keys = Object.keys(S);
const SRC = fs.readFileSync(path.join(ACT_DIR, 'pinch-teams-activity.js'), 'utf8'), BODY = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + fs.readFileSync(path.join(CORE_DIR, 'pinch-teams-core.js'), 'utf8');
const VIA = ['title', 'instrBubble', 'okBubble', 'hintWrong2', 'hintWrong2Team', 'hintSpelling', 'hintSingle', 'hintWrong', 'okTalkSame', 'okTalk'];
for (const k of keys) {
  is(VIA.includes(k) || BODY.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
  for (const l of SHIP) {
    const s = S[k][l]; is(typeof s === 'string' && s.length > 0, `${k}.${l} authored`); if (!s) continue;
    if (/^hint/.test(k)) is(!/\d/.test(s), `${k}.${l}: a hint carries no digit`);
    if (l === 'fr') is(!/ [:!?;»]/.test(s) && !/'/.test(s), `${k}.fr: narrow spaces, curly apostrophes`);
    is(!/\bfree\b|gratuit|kostenlos|gratis/i.test(s), `${k}.${l}: never "free"`);
  }
}
is(/team\[0\] === team\[1\] \? 'okTalkSame' : 'okTalk'/.test(SRC) && /'hintWrong2' : 'hintWrong2Team'|key: 'hintWrong2'/.test(BODY) && /'hintSpelling'/.test(BODY) && /'hintSingle' : 'hintWrong'/.test(BODY), 'the composed keys are reached');

console.log(`verify-pinch-teams-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
