#!/usr/bin/env node
/* =====================================================================
   verify-about-strings-core.js — the build gate of ACTIVITY #79, The
   About-Strings (The Wobble Museum, W.K.2). It keeps its OWN ground truth —
   per locale the stems of each room's word and its door word, the pronoun
   each room's "they/it" card must use, the word the ambulance trap shares
   with a drift, and a truth table of which picture each mystery fact is true
   of — and never reads an expectation off the core. It proves:
     (a) every namer's about-word names the room, every drift's names the
         door thing, every pronoun card's about-word is the right pronoun
         (es/it/pt: the first word, a verb, naming nothing), all 11 locales;
     (b) every trap names the door thing or shares the drift's word, and is
         still about the room; no mystery fact contains the room's word;
     (c) Check accepts a wall IFF every string goes to what its card is
         about — every hook assignment of every Catch-the-drift room
         (exhaustive), every cart choice of every Make-the-page room, every
         shelf picture of every Name-the-room room; a loose string or an empty
         frame is never a miss; a drift may stay on the cart;
     (d) Name the room: the room's picture fits all three facts, the door's
         at most one (the authored near-miss), an unrelated one none — so
         exactly one picture is right; the facts that refuse a picture are
         exactly the ones the gate's table says;
     (e) the deal: the pronoun card always after a card that names the room;
         the drift's hook uniform; the room picture's shelf slot uniform; a
         pass holds every room once and never repeats the order;
     (f) the page: the room's facts only, the pronoun card right after a
         namer; miss 2 points every wrong string at its own sign;
     (g) every picture exists, no black-and-white theme; fr narrow spaces.
   Usage: node scripts/verify-about-strings-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const MT = path.join(__dirname, '..', 'mini tools');
const C = require(path.join(process.env.AS_CORE_DIR || MT, 'about-strings-core.js'));   /* AS_CORE_DIR: the mutation harness points this at a mutated copy */
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };

/* ---- the gate's own truth ---- */
const ROOMS = ['frogs', 'moon', 'ambulances', 'rain', 'dogs', 'bees', 'trees', 'hands'];
const STEM = {   /* [room stems, door stems] — matched at the start of a word */
  en: { frogs: [['frog'], ['lake']], moon: [['moon'], ['sun']], ambulances: [['ambulance'], ['bell']], rain: [['rain'], ['flower']], dogs: [['dog'], ['cat']], bees: [['bee'], ['ant']], trees: [['tree'], ['bird']], hands: [['hand'], ['feet', 'foot']] },
  de: { frogs: [['frosch', 'frösch'], ['see']], moon: [['mond'], ['sonne']], ambulances: [['krankenwagen'], ['glocke']], rain: [['regen'], ['blume']], dogs: [['hund'], ['katze']], bees: [['biene'], ['ameise']], trees: [['baum', 'bäum'], ['vogel', 'vögel']], hands: [['hand', 'händ'], ['fuß', 'füß']] },
  nl: { frogs: [['kikker'], ['meer', 'meren']], moon: [['maan'], ['zon']], ambulances: [['ambulance'], ['klok']], rain: [['regen'], ['bloem']], dogs: [['hond'], ['kat']], bees: [['bij'], ['mier']], trees: [['boom', 'bomen'], ['vogel']], hands: [['hand'], ['voet']] },
  da: { frogs: [['frø'], ['sø']], moon: [['måne'], ['sol']], ambulances: [['ambulance'], ['klokke']], rain: [['regn'], ['blomst']], dogs: [['hund'], ['kat']], bees: [['bier'], ['myre']], trees: [['træ'], ['fugl']], hands: [['hånd', 'hænd'], ['fød']] },
  sv: { frogs: [['grod'], ['sjö']], moon: [['mån'], ['sol']], ambulances: [['ambulans'], ['klock']], rain: [['regn'], ['blomm']], dogs: [['hund'], ['katt']], bees: [['bin'], ['myr']], trees: [['träd'], ['fågl', 'fåg']], hands: [['hand', 'händ'], ['föt', 'fot']] },
  no: { frogs: [['frosk'], ['innsjø']], moon: [['mån'], ['sol']], ambulances: [['ambulanse', 'ambulanser'], ['bjelle', 'bjeller']], rain: [['regn'], ['blomst']], dogs: [['hund'], ['katt']], bees: [['bier'], ['maur']], trees: [['trær', 'tre'], ['fugl']], hands: [['hånd', 'hend'], ['føtt', 'fot']] },
  es: { frogs: [['rana'], ['lago']], moon: [['luna'], ['sol']], ambulances: [['ambulancia'], ['campana']], rain: [['lluvia'], ['flor']], dogs: [['perro'], ['gato']], bees: [['abeja'], ['hormiga']], trees: [['árbol'], ['pájaro']], hands: [['mano'], ['pie']] },
  it: { frogs: [['rana', 'rane'], ['lag']], moon: [['luna'], ['sole']], ambulances: [['ambulanz'], ['campan']], rain: [['pioggia'], ['fior']], dogs: [['cani', 'cane'], ['gatt']], bees: [['api', 'ape'], ['formic']], trees: [['alber'], ['uccell']], hands: [['mani', 'mano'], ['pied']] },
  pt: { frogs: [['rã'], ['lago']], moon: [['lua'], ['sol']], ambulances: [['ambulânc'], ['sino']], rain: [['chuva'], ['flor']], dogs: [['cachorr'], ['gato']], bees: [['abelha'], ['formiga']], trees: [['árvore'], ['pássaro']], hands: [['mão'], ['pé']] },
  fr: { frogs: [['grenouille'], ['lac']], moon: [['lune'], ['soleil']], ambulances: [['ambulance'], ['cloche']], rain: [['pluie'], ['fleur']], dogs: [['chien'], ['chat']], bees: [['abeille'], ['fourmi']], trees: [['arbre'], ['oiseau']], hands: [['main'], ['pied']] },
  fi: { frogs: [['sammak'], ['järv']], moon: [['kuu'], ['aurinko']], ambulances: [['ambulans'], ['kello']], rain: [['sade', 'satee'], ['kuk']], dogs: [['koir'], ['kiss']], bees: [['mehiläi'], ['muurahai']], trees: [['puut', 'puil', 'puis'], ['lin']], hands: [['käd', 'käs'], ['jal']] }
};
const PRON = {   /* the pronoun of each room's "they/it" card, in room order (es/it/pt drop it) */
  en: ['They', 'It', 'They', 'It', 'They', 'They', 'They', 'They'], de: ['Sie', 'Er', 'Sie', 'Er', 'Sie', 'Sie', 'Sie', 'Sie'],
  nl: ['Ze', 'Hij', 'Ze', 'Hij', 'Ze', 'Ze', 'Ze', 'Ze'], da: ['De', 'Den', 'De', 'Den', 'De', 'De', 'De', 'De'],
  sv: ['De', 'Den', 'De', 'Det', 'De', 'De', 'De', 'De'], no: ['De', 'Den', 'De', 'Det', 'De', 'De', 'De', 'De'],
  fr: ['Elles', 'Elle', 'Elles', 'Elle', 'Ils', 'Elles', 'Ils', 'Elles'], fi: ['Ne', 'Se', 'Ne', 'Se', 'Ne', 'Ne', 'Ne', 'Ne']
};
const FI_CASES = { Ne: ['Ne', 'Niillä', 'Niissä'], Se: ['Se', 'Siinä'] };
const SHARED = { en: 'loud', de: 'laut', nl: 'luid', da: 'høj', sv: 'högljudd', no: 'høylytt', es: 'fuerte', it: 'forte', pt: 'barulhent', fr: 'bruyant', fi: 'kovaääni' };   /* the ambulance trap's word in common with a drift */
/* which mystery facts each picture is TRUE of (room order of TOPICS; 'all' = all three) */
const TRUE_OF = {
  frogs: { 'forest-creatures/frog': 'all', 'camping/lake': [] },
  moon: { 'camping/moon': 'all', 'weather/sunny': [0] },
  ambulances: { 'vehicles/ambulance': 'all', 'christmas/bell': [] },
  rain: { 'weather/rainy': 'all', 'spring/flower': [] },
  dogs: { 'pets/dog': 'all', 'pets/cat': [] },
  bees: { 'insects-and-bugs/bee': 'all', 'insects-and-bugs/ant': [] },
  trees: { 'tree/apple': 'all', 'things-that-fly/bird': [] },
  hands: { 'body-parts/hand': 'all', 'body-parts/foot': [] }
};
const FINGERS_ARE_TOES = ['es', 'it', 'pt', 'fr'];   /* dedos / dita / doigts — "five fingers" is true of feet there */
const BW = /(^|[\s_-])(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const startsWord = (text, stem) => new RegExp('(?<!\\p{L})' + stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu').test(text);
const anyStem = (text, stems) => stems.some(s => startsWord(text, s));
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

/* ---- (a)(b) the words ---- */
C.LOCALES.forEach(loc => ROOMS.forEach((room, ri) => {
  const w = C.words(loc, room), [rs, ds] = STEM[loc][room], tag = `${loc} ${room}`;
  const ab = (s) => { const p = C.parse(s); return p.text.slice(p.about[0], p.about[1]); };
  [0, 2, 3, 4].forEach(i => { is(anyStem(ab(w.facts[i]), rs), `${tag}: fact ${i} is about the room — [${ab(w.facts[i])}] in «${w.facts[i]}»`); });
  w.drifts.forEach((s, i) => { is(anyStem(ab(s), ds) && !anyStem(ab(s), rs), `${tag}: drift ${i} is about the door thing — [${ab(s)}]`); });
  const pro = [w.facts[1]].concat(w.mystery);
  if (PRON[loc]) {
    const want = PRON[loc][ri], ok = loc === 'fi' ? FI_CASES[want] : [want];
    pro.forEach(s => is(ok.indexOf(ab(s)) >= 0, `${tag}: the pronoun is ${ok.join('/')} — [${ab(s)}] in «${s}»`));
  } else pro.forEach(s => { const p = C.parse(s); is(p.about[0] === 0 && !anyStem(ab(s), rs.concat(ds)) && /^\p{Lu}/u.test(ab(s)), `${tag}: the dropped-pronoun card's about-word is its opening verb — [${ab(s)}] in «${s}»`); });
  const trap = C.parse(w.facts[2]).text;
  if (room === 'ambulances') is(trap.toLowerCase().indexOf(SHARED[loc]) >= 0 && w.drifts.some(d => d.toLowerCase().indexOf(SHARED[loc]) >= 0), `${tag}: the trap shares «${SHARED[loc]}» with a drift`);
  else is(anyStem(trap.slice(C.parse(w.facts[2]).about[1]), ds), `${tag}: the trap names the door thing after its subject — «${trap}»`);
  w.mystery.forEach(s => is(!anyStem(C.parse(s).text, rs), `${tag}: the mystery fact never says the room's word — «${s}»`));
  [].concat(w.facts, w.drifts, w.mystery).forEach(s => { const p = C.parse(s); is(p.about[1] > p.about[0] && !/[[\]]/.test(p.text) && /[.!?]$/.test(p.text), `${tag}: «${s}» parses`); });
  is(!!w.plate && !!w.door && !!w.title, `${tag}: plate, door and title`);
  is(anyStem(w.title, rs), `${tag}: the page title names the room — «${w.title}»`);
  if (loc === 'fr') is([].concat(w.facts, w.drifts, w.mystery, [w.title]).every(s => !/ [!?:;]/.test(s)), `${tag}: fr narrow spaces`);
}));

/* ---- (c) Check ---- */
let combos = 0;
C.ids().forEach(i => ['4', '3'].forEach(n => {
  const r = C.round('l1', i, n), tag = `l1.${i}/${n}`, opts = [null, 'topic', 'door'];
  is(r.cards.filter(c => c.about === 'door').length === 1 && r.cards.length === +n, `${tag}: one drift among ${n} cards`);
  const total = Math.pow(3, r.cards.length); let agree = 0;
  for (let m = 0; m < total; m++) {
    const st = C.newState(r, rng(i + 1)); let x = m, want = true, loose = false;
    st.wall.forEach(id => { const h = opts[x % 3]; x = Math.floor(x / 3); C.hookTo(st, id, h); if (!h) loose = true; else if (h !== (id.charAt(0) === 'd' ? 'door' : 'topic')) want = false; });
    const res = C.check(st); combos++;
    if (loose) { if (!res.ok && res.reason === 'loose' && st.misses === 0) agree++; else is(false, `${tag}: a loose string is a hint, never a miss`); }
    else if (!!res.ok === want) agree++; else is(false, `${tag}: Check ${res.ok} for hooks ${m}`);
  }
  is(agree === total, `${tag}: Check agrees on all ${total} hook sets`);
}));
C.ids().forEach(i => ['4', '3'].forEach(n => {
  const r = C.round('l2', i, n), tag = `l2.${i}/${n}`, cart = r.cart.map(c => c.id), K = cart.length;
  is(r.hung.id === 'f3' && r.cart.filter(c => c.about === 'topic').length === 2, `${tag}: one fact hung, two room facts on the cart`);
  for (let m = 0; m < (1 << K); m++) {                      /* every set of cart cards hung */
    const up = cart.filter((c, b) => m & (1 << b)); if (up.length > +n - 1) continue;
    for (let h = 0; h < (1 << (up.length + 1)); h++) {        /* every topic/door choice for the wall */
      const st = C.newState(r, rng(m * 7 + h)); up.forEach(id => C.hang(st, id));
      const wallIds = st.wall.filter(Boolean); let want = true;
      wallIds.forEach((id, b) => { const s = (h >> b) & 1 ? 'door' : 'topic'; C.hookTo(st, id, s); if (s !== (id.charAt(0) === 'd' ? 'door' : 'topic')) want = false; });
      if (cart.some(id => id.charAt(0) === 'f' && up.indexOf(id) < 0)) want = false;
      const res = C.check(st); combos++;
      is(!!res.ok === want, `${tag}: Check ${res.ok} for hung [${up.join(',')}] hooks ${h} (want ${want})`);
    }
  }
  const s2 = C.newState(r, rng(5)); cart.filter(id => id.charAt(0) === 'f').forEach(id => C.hang(s2, id)); s2.wall.forEach(id => id && C.hookTo(s2, id, 'topic'));
  is(C.check(s2).ok && C.leaving(s2).length === 0, `${tag}: the drifts may stay on the cart`);
}));
C.ids().forEach(i => C.LOCALES.forEach(loc => {
  const r = C.round('l3', i, '4'), t = r.topic, tag = `l3.${i} ${loc}`, table = TRUE_OF[t.id];
  const fits = (pic) => { if (table[pic] === 'all') return [0, 1, 2]; if (pic === t.door) return t.id === 'hands' && FINGERS_ARE_TOES.indexOf(loc) >= 0 ? [0] : table[pic]; return []; };
  [t.pic, t.door].concat(t.others).forEach(pic => {
    const st = C.newState(r, rng(3)); st.shelf = [t.pic, t.door, pic === t.pic || pic === t.door ? t.others[0] : pic];
    C.check(st); is(st.misses === 0 && st.last.reason === 'frame', `${tag}: an empty frame is a hint, never a miss`);
    C.place(st, pic); const res = C.check(st); combos++;
    is(!!res.ok === (pic === t.pic), `${tag}: Check ${res.ok} with ${pic} in the frame`);
    const f = fits(pic); is(pic === t.pic ? f.length === 3 : pic === t.door ? f.length <= 1 : f.length === 0, `${tag}: ${pic} fits ${f.length} facts`);
    if (!res.ok) { const ref = C.refuses(st, loc).map(id => +id.slice(1)).sort().join(); is(ref === [0, 1, 2].filter(k => f.indexOf(k) < 0).join(), `${tag}: ${pic} — the sagging facts are exactly those it is not true of (${ref})`); }
  });
  is(JSON.stringify(C.doorFits(loc, i).sort()) === JSON.stringify(fits(t.door).slice().sort()), `${tag}: the door's near-miss is authored right`);
}));
console.log('  checked ' + combos + ' walls');

/* ---- (e) the deal and the order ---- */
C.ids().forEach(i => ['4', '3'].forEach(n => {
  const r = C.round('l1', i, n), R = rng(1000 + i), N = 4000, at = [0, 0, 0, 0];
  for (let s = 0; s < N; s++) {
    const st = C.newState(r, R); let named = false, bad = false;
    st.wall.forEach(id => { const c = C.find(r, id); if (c.role === 'namer' || c.role === 'trap') named = true; if (c.role === 'pronoun' && !named) bad = true; });
    if (bad) { is(false, `l1.${i}/${n}: the pronoun card came before every namer [${st.wall}]`); break; }
    at[st.wall.indexOf('d0')]++;
  }
  at.slice(0, +n).forEach((k, h) => is(Math.abs(k / N - 1 / +n) <= 0.03, `l1.${i}/${n}: the drift on hook ${h} ${(k / N).toFixed(3)}`));
}));
C.ids().forEach(i => { const r = C.round('l3', i, '4'), R = rng(2000 + i), N = 3000, at = [0, 0, 0]; for (let s = 0; s < N; s++) at[C.newState(r, R).shelf.indexOf(r.topic.pic)]++; at.forEach((k, h) => is(Math.abs(k / N - 1 / 3) <= 0.04, `l3.${i}: the room's picture in shelf slot ${h} ${(k / N).toFixed(3)}`)); });
{ const R = rng(9); let prev = null, rep = 0; for (let s = 0; s < 500; s++) { const o = C.plan(R, prev); is(o.slice().sort().join() === C.ids().join(), 'a pass holds every room once'); if (prev && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) rep++; prev = o; } is(rep === 0, 'a pass never repeats the order or starts with the last room'); }

/* ---- (f) the page, the pronoun, the help ---- */
C.ids().forEach(i => {
  const r = C.round('l1', i, '4'), R = rng(i);
  for (let s = 0; s < 50; s++) {
    const st = C.newState(r, R); st.wall.forEach(id => C.hookTo(st, id, 'topic')); C.check(st);
    const p = st.wall.find(id => C.find(r, id).role === 'pronoun'), to = C.pointsTo(st, p), tc = to && C.find(r, to);
    is(!!tc && (tc.role === 'namer' || tc.role === 'trap') && st.wall.indexOf(to) < st.wall.indexOf(p), `l1.${i}: "they" points back to a namer before it`);
    is(C.lit(st, false).length === st.wall.length && C.lit(st, true).join() === st.wall.filter(id => id.charAt(0) === 'd').join(), `l1.${i}: miss 1 lights every about-word (only the wrong card's with help on)`);
    C.check(st); const th = C.threads(st); is(th.length === 1 && th[0].card === 'd0' && th[0].to === 'door', `l1.${i}: miss 2 points the drift's string at the door`);
    C.hookTo(st, 'd0', 'door'); is(C.threads(st).length === 0 && C.lit(st, false).length === 0, `l1.${i}: a move takes the help away`);
    is(C.check(st).ok, `l1.${i}: then the wall is right`);
    const pg = C.page(st); is(pg.length === 3 && pg.every(id => C.find(r, id).about === 'topic') && C.find(r, pg[1]).role === 'pronoun' && C.find(r, pg[0]).role !== 'pronoun', `l1.${i}: the page holds the room's facts, "they" right after a namer`);
    is(C.leaving(st).join() === 'd0', `l1.${i}: the drift leaves through the door`);
  }
});

/* ---- (g) pictures ---- */
C.DATA.TOPICS.forEach(t => [t.pic, t.door].concat(t.others).forEach(p => {
  const [th, n] = p.split('/'); let ok = false; try { ok = !!JSON.parse(fs.readFileSync(path.join(MT, 'pictures', th + '.json'), 'utf8')).nouns[n]; } catch (e) {}
  is(ok, `${p}: in the library index`); is(!BW.test(th), `${p}: not black-and-white`);
}));
is(C.DATA.TOPICS.map(t => t.id).join() === ROOMS.join(), 'the eight rooms');
const UNFIT = { moon: ['toys/ball', 'music/drum', 'kitchen-tools/cup', 'around-the-house/clock'], frogs: ['toys/ball'], ambulances: ['vehicles/bus'], dogs: ['pets/cat'] };   /* round things are round like the moon; a ball bounces; a bus carries people */
C.DATA.TOPICS.forEach(t => is(!(UNFIT[t.id] || []).some(p => t.others.indexOf(p) >= 0) && t.others.indexOf(t.pic) < 0 && t.others.indexOf(t.door) < 0, `${t.id}: no unrelated shelf picture is true of a mystery fact`));
[320, 360, 559].forEach(w => { const L = C.layout(w); is(L.sign >= 64 && L.door >= 64 && L.shelf >= 64, `layout ${w}: pictures at least 64`); });
[560, 704, 1024].forEach(w => { const L = C.layout(w); is(L.sign >= 96 && L.door >= 96 && L.shelf >= 96, `layout ${w}: pictures at least 96`); });

console.log(`verify-about-strings-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
