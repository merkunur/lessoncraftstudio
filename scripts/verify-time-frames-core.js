#!/usr/bin/env node
/* =====================================================================
   verify-time-frames-core.js — the gate for ACTIVITY #125, Photo,
   Window, Envelope (The Clock Tower, L.1.1.e; all 11 locales). Its OWN
   ground truth, written here independently of the core:
     · the map time → opening (past → album, present → window, future →
       post slot) and tense → frame (past photo, present window, future
       envelope; fi present = a window with a shutter that fits the window
       AND the post slot — Finnish has no future tense);
     · each locale's FUTURE marker (en will, de werden/wird …, nl zullen/
       zal …, sv ska, da/no skal, pt vão/vai/irão, fr/es/it future
       endings) and its IN-PROGRESS present time word (en Right now, de
       gerade, fr en ce moment, es ahora mismo, pt neste momento, it in
       questo momento, nl op dit moment, sv just nu, da lige nu, no akkurat
       nå) — never a bare "now" (jetzt / nu / maintenant) that would let
       the future in;
     · each locale's base forms for the find levels (its own lemma table).
   It asserts:
     (a) the rounds: every picture exists (exact case, colour theme);
         exactly one card fits in every pick and time round; NO future
         round deals the present card (the present also talks about
         tomorrow) and no level-3 present sentence is offered the future
         time word; en present cards are progressive (are …ing) except be
         and have; the future card carries the locale's future marker,
         the others never do; the three forms differ; fi deals two cards,
         singular subjects, past ≠ present;
     (b) the model: drop / back, develop, the fits matrix, Check's
         reasons (derived from the opening), the hints, the glow from
         miss 2; level 4 (pairs lock, wrong ones come off); levels 5–6
         (the verb found, the base form written);
     (c) balance: every pick / time level right 3/3/3 (fi level 3 by its
         two times), the plan's tray puts the right card in each slot
         about equally, never three alike in a row; the bots under caps
         (longest card, always "will", always "-ed", always slot 1, level
         4 first-letter matching);
     (d) level 4: three different pairs per round, base ≠ past, no
         same-spelling pair; levels 5–6: the base form is the lemma's;
     (e) the strings ×11, the prose quotes, the manifest row.
   Usage: node scripts/verify-time-frames-core.js   (env VT_CORE_DIR / VT_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.VT_CORE_DIR || MT, ACT_DIR = process.env.VT_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'time-frames-core.js'));
const ACT = (() => { const ctx = { window: {}, TimeFramesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'time-frames-activity.js'), 'utf8') + '\n;this.__A = window.TimeFramesActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const lc = (s) => String(s).toLocaleLowerCase().trim();

/* ---------------- the own tables ---------------- */
const OPENING = { past: 'album', present: 'window', future: 'post' };
const FRAME = (loc, t) => t === 'past' ? 'photo' : t === 'future' ? 'envelope' : loc === 'fi' ? 'shutter' : 'window';
const FITS = { photo: ['album'], window: ['window'], envelope: ['post'], shutter: ['window', 'post'] };
const FUTURE = { en: /^will /, de: /^(werden|wird) … /, nl: /^(zullen|zal) … /, sv: /^ska /, da: /^skal /, no: /^skal /, pt: /^(vão|vai) |^irão$/, fr: /(ront|ra)$/, es: /(rán|rá)$/, it: /(ranno|rà)$/, fi: /^$/ };
const NOW = { en: 'right now', de: 'gerade', fr: 'en ce moment', es: 'ahora mismo', pt: 'neste momento', it: 'in questo momento', nl: 'op dit moment', sv: 'just nu', da: 'lige nu', no: 'akkurat nå', fi: 'juuri nyt' };
/* sv ska / da, no skal + infinitive also means "is about to": a present round never deals the future card, a future
   sentence is never offered the present time word, and every past round withholds one card too */
const MODAL = ['sv', 'da', 'no'];
const BAD_NOW = ['now', 'jetzt', 'maintenant', 'ahora', 'agora', 'adesso', 'nu', 'nå'];
const PICS = { sailboat: 'vehicles/sailboat', jumping: 'activities/jumping', girl: 'toys/girl', seagull: 'beach/seagull', cat: 'pets/cat', frog: 'camping/frog', duck: 'farm animals/duck', dog: 'pets/dog', bird: 'spring/bird' };
const LEMMA = {
  en: { rode: 'ride', ran: 'run', swam: 'swim', 'will sleep': 'sleep', has: 'have', went: 'go', jumped: 'jump', was: 'be', sang: 'sing' },
  de: { fuhren: 'fahren', rannte: 'rennen', schwammen: 'schwimmen', schlafen: 'schlafen', hat: 'haben', liefen: 'laufen', sprangen: 'springen', war: 'sein', sangen: 'singen' },
  fr: { 'ont fait': 'faire', 'a couru': 'courir', 'ont nagé': 'nager', dormiront: 'dormir', a: 'avoir', 'sont rentrés': 'rentrer', 'ont sauté': 'sauter', 'était': 'être', 'ont chanté': 'chanter' },
  es: { anduvieron: 'andar', 'corrió': 'correr', nadaron: 'nadar', 'dormirán': 'dormir', tiene: 'tener', fueron: 'ir', saltaron: 'saltar', estaba: 'estar', cantaron: 'cantar' },
  pt: { andaram: 'andar', correu: 'correr', nadaram: 'nadar', 'vão dormir': 'dormir', tem: 'ter', foram: 'ir', pularam: 'pular', estava: 'estar', cantaram: 'cantar' },
  it: { 'sono andate': 'andare', 'ha corso': 'correre', 'hanno nuotato': 'nuotare', dormiranno: 'dormire', ha: 'avere', 'sono tornati': 'tornare', 'hanno saltato': 'saltare', era: 'essere', 'hanno cantato': 'cantare' },
  nl: { reden: 'rijden', rende: 'rennen', zwommen: 'zwemmen', slapen: 'slapen', heeft: 'hebben', gingen: 'gaan', sprongen: 'springen', was: 'zijn', zongen: 'zingen' },
  sv: { cyklade: 'cykla', sprang: 'springa', simmade: 'simma', 'ska sova': 'sova', har: 'ha', gick: 'gå', hoppade: 'hoppa', var: 'vara', 'sjöng': 'sjunga' },
  da: { cyklede: 'cykle', 'løb': 'løbe', 'svømmede': 'svømme', 'skal sove': 'sove', har: 'have', gik: 'gå', hoppede: 'hoppe', var: 'være', sang: 'synge' },
  no: { syklet: 'sykle', 'løp': 'løpe', 'svømte': 'svømme', 'skal sove': 'sove', har: 'ha', gikk: 'gå', hoppet: 'hoppe', var: 'være', sang: 'synge' },
  fi: { ajoi: 'ajaa', juoksi: 'juosta', ui: 'uida', nukkuu: 'nukkua', on: 'olla', meni: 'mennä', 'hyppäsi': 'hypätä', oli: 'olla', lauloi: 'laulaa' }
};

/* ---------------- (a) the rounds ---------------- */
const pics = new Set();
for (const loc of ALL) {
  is(JSON.stringify(C.levels()) === JSON.stringify(['1', '2', '3', '4', '5', '6']), `${loc}: six levels`);
  const tw = C.DATA[loc].tw;
  is(lc(tw.present) === NOW[loc] && BAD_NOW.indexOf(lc(tw.present)) < 0, `${loc}: the present time word «${tw.present}» means in progress`);
  for (const lvl of ['1', '2', '3']) {
    const k = C.kind(lvl), times = {};
    for (const r of C.rounds()) {
      const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1} «${rd.sentence}»`;
      is(PICS[rd.picKey] === rd.pic && rd.n >= 1, `${tag}: picture ${rd.picKey}`); pics.add(rd.pic);
      if (loc === 'fi') is(rd.n === 1, `${tag}: fi subjects are singular`);
      const time = k === 'pick' ? rd.time : rd.tense; times[time] = (times[time] || 0) + 1;
      if (k === 'pick') {
        const tw0 = (rd.sentence.match(/\[([^\]]+)\]/) || [])[1];
        is(lc(tw0) === lc(tw[rd.time]), `${tag}: the time word «${tw0}» is the ${rd.time} word`);
        const tenses = rd.cards.map(c => c.tense).sort().join();
        if (loc === 'fi') is(tenses === 'past,present', `${tag}: fi deals two cards, past and present`);
        else if (rd.time === 'future') is(tenses === 'future,past', `${tag}: a future round deals past + future only`);
        else if (MODAL.includes(loc) && rd.time === 'present') is(tenses === 'past,present', `${tag}: ${loc} — a present round never deals the ska/skal card`);
        else if (MODAL.includes(loc)) is(rd.cards.length === 2, `${tag}: ${loc} — a past round deals two cards`);
        else is(rd.cards.length >= 2 && rd.cards.some(c => c.tense === rd.time), `${tag}: the right card is dealt`);
        const words = rd.cards.map(c => lc(c.w)); is(new Set(words).size === words.length, `${tag}: the forms differ`);
        for (const c of rd.cards) {
          is(FUTURE[loc].test(c.w) === (c.tense === 'future'), `${tag}: «${c.w}» ${c.tense === 'future' ? 'carries' : 'does not carry'} the future marker`);
          if (loc === 'en' && c.tense === 'present') is(/^(are|is) \S+ing$/.test(c.w) || /^(are|is|has|have)$/.test(c.w), `${tag}: en present «${c.w}» is progressive (or be/have)`);
        }
        /* exactly one card fits */
        const want = loc === 'fi' && rd.time === 'future' ? 'present' : rd.time;
        is(rd.right === want, `${tag}: right ${rd.right} = ${want}`);
        const fitting = rd.cards.filter(c => FITS[FRAME(loc, c.tense)].indexOf(OPENING[rd.time]) >= 0).map(c => c.tense);
        is(fitting.length === 1 && fitting[0] === want, `${tag}: exactly one card fits the ${OPENING[rd.time]} (${fitting.join()})`);
      } else {
        const tenses = rd.cards.map(c => c.tense).sort().join();
        if (loc === 'fi') is(tenses === 'past,present' && rd.tense !== 'future', `${tag}: fi level 3 — Eilen / Juuri nyt only`);
        else if (rd.tense === 'present') is(tenses === 'past,present', `${tag}: a present sentence is never offered the future time word`);
        else if (MODAL.includes(loc) && rd.tense === 'future') is(tenses === 'future,past', `${tag}: ${loc} — a future sentence is never offered the present time word`);
        else if (MODAL.includes(loc)) is(rd.cards.length === 2 && rd.cards.some(c => c.tense === 'past'), `${tag}: ${loc} — a past sentence is offered two time words`);
        else is(tenses === 'future,past,present', `${tag}: all three time words`);
        const fitting = rd.cards.filter(c => FITS[FRAME(loc, rd.tense)].indexOf(OPENING[c.tense]) >= 0).map(c => c.tense);
        is(fitting.length === 1 && fitting[0] === rd.tense, `${tag}: exactly one time word fits (${fitting.join()})`);
        const verbFuture = loc !== 'fi' && new RegExp('(^|\\s)(will|werden|zullen|ska|skal|vão)(\\s|$)|(ront|rán|ranno)(\\s|\\.|$)').test(rd.sentence);
        is(verbFuture === (rd.tense === 'future'), `${tag}: the verb's form says ${rd.tense}`);
        if (loc === 'en' && rd.tense === 'present') is(/ are \w+ing /.test(rd.sentence), `${tag}: an en present verb is progressive`);
      }
    }
    if (loc === 'fi' && lvl === '3') is(Object.values(times).every(n => n >= 4), `${loc} L${lvl}: past and present each ≥ 4 (${JSON.stringify(times)})`);
    else is(times.past === 3 && times.present === 3 && times.future === 3, `${loc} L${lvl}: 3 / 3 / 3 (${JSON.stringify(times)})`);
  }
  /* (d) level 4 */
  const fl = []; let flHits = 0, flTotal = 0;
  for (const r of C.rounds()) {
    const rd = C.round(loc, '4', r), tag = `${loc} L4.${r + 1}`;
    is(rd.pairs.length === 3 && new Set(rd.pairs.map(p => lc(p.base))).size === 3 && new Set(rd.pairs.map(p => lc(p.past))).size === 3, `${tag}: three different pairs`);
    rd.pairs.forEach(p => is(lc(p.base) !== lc(p.past), `${tag}: ${p.base} ≠ ${p.past}`));
    /* the first-letter bot: each window takes the first photo whose first letter matches */
    rd.pairs.forEach(p => { const m = rd.pairs.find(q => lc(q.past).replace(/^il (est |a )?/, '').charAt(0) === lc(p.base).replace(/^il /, '').charAt(0)); flTotal++; if (m === p) flHits++; });
  }
  is(flHits / flTotal <= 0.67, `${loc} L4: the first-letter bot matches ${flHits}/${flTotal}`);
  /* levels 5–6 */
  for (const lvl of ['5', '6']) for (const r of C.rounds()) {
    const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1} «${rd.sentence}»`;
    is(LEMMA[loc][lc(rd.verb)] === rd.base, `${tag}: ${rd.verb} → ${rd.base} (own: ${LEMMA[loc][lc(rd.verb)]})`);
    is(rd.words.filter(w => w.verb).length === 1 && rd.words.filter(w => w.w).length >= 2, `${tag}: one verb among the words`);
    if (lvl === '5') { pics.add(rd.pic); is(PICS[rd.picKey] === rd.pic, `${tag}: picture`); }
  }
}
for (const p of pics) { const d = p.slice(0, p.lastIndexOf('/')), f = p.slice(p.lastIndexOf('/') + 1); is(fs.readdirSync(IMG).includes(d) && fs.readdirSync(path.join(IMG, d)).includes(f + '@2x.webp'), `picture ${p} exists (exact case)`); is(!BW.test(d), `${p}: a colour theme`); }

/* ---------------- (b) the model ---------------- */
for (const f of ['photo', 'window', 'envelope', 'shutter']) for (const o of ['album', 'window', 'post']) is(C.fits(f, o) === (FITS[f].indexOf(o) >= 0), `fits(${f}, ${o})`);
for (const loc of ALL) {
  for (const lvl of ['1', '2', '3']) for (const r of C.rounds()) {
    const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1}`;
    const s0 = C.newState(loc, lvl, r);
    is(C.check(s0).result === 'empty' && s0.misses === 0 && C.hint(s0) === (lvl === '3' ? 'hintTime' : 'hintEmpty'), `${tag}: an empty gap is no miss`);
    for (const c of rd.cards) {
      const st = C.newState(loc, lvl, r); is(C.drop(st, c.tense) === 'in' && st.gap === c.tense, `${tag}: drop ${c.tense}`);
      const d = C.develop(st), wantFrame = FRAME(loc, lvl === '3' ? rd.tense : c.tense), wantOp = OPENING[lvl === '3' ? c.tense : rd.time];
      is(d.frame === wantFrame && d.opening === wantOp, `${tag}: ${c.tense} develops into ${d.frame} for the ${d.opening}`);
      const res = C.check(st), right = c.tense === rd.right;
      is((res.result === 'ok') === right, `${tag}: ${c.tense} ${right ? 'files in' : 'bumps'}`);
      if (right) continue;
      is(res.reason === wantOp && C.hint(st) === { album: 'missAlbum', post: 'missPost', window: 'missWindow' }[wantOp] && !C.glow(st), `${tag}: ${c.tense} → the ${wantOp} hint`);
      C.check(st); is(C.glow(st) && C.hint(st) === 'missGlow', `${tag}: miss 2 glows`);
      C.drop(st, rd.right); is(!C.glow(st) && C.check(st).result === 'ok', `${tag}: a new move takes the help away; the right card files in`);
    }
    const s2 = C.newState(loc, lvl, r); C.drop(s2, rd.right); is(C.drop(s2, rd.right) === 'back' && s2.gap === null && C.back(s2) === 'no', `${tag}: the same card again comes back`);
  }
  for (const r of C.rounds()) {
    const tag = `${loc} L4.${r + 1}`, st = C.newState(loc, '4', r, [2, 0, 1]), rd = st.rd;
    is(C.check(st).result === 'empty' && C.hint(st) === 'hintPair', `${tag}: windows without photos — the hint, no miss`);
    /* photo slot i shows pair rd.photos[i]: put each photo on the WRONG window */
    for (let i = 0; i < 3; i++) { C.pickPhoto(st, i); C.toPane(st, (rd.photos[i] + 1) % 3); }
    const c1 = C.check(st); is(c1.result === 'miss' && st.link.every(x => x === null) && !st.locked.some(Boolean) && C.hint(st) === 'missPair', `${tag}: wrong photos come off`);
    for (let i = 0; i < 3; i++) { C.pickPhoto(st, i); C.toPane(st, rd.photos[i]); }
    is(C.check(st).result === 'ok' && st.locked.every(Boolean), `${tag}: the right photos lock`);
  }
  for (const lvl of ['5', '6']) for (const r of C.rounds()) {
    const tag = `${loc} L${lvl}.${r + 1}`, st = C.newState(loc, lvl, r), rd = st.rd, vi = rd.words.findIndex(w => w.verb), ni = rd.words.findIndex(w => w.w && !w.verb);
    is(C.check(st).result === 'empty' && C.hint(st) === 'hintFind', `${tag}: no word tapped — the hint`);
    C.tapWord(st, ni); const c1 = C.check(st); is(c1.result === 'miss' && c1.reason === 'notVerb' && C.hint(st) === 'missVerb', `${tag}: another word stays plain`);
    C.tapWord(st, vi); const c2 = C.check(st);
    if (lvl === '5') is(c2.result === 'ok' && st.found, `${tag}: the verb → its base form`);
    else {
      is(c2.result === 'found' && !st.done && C.hint(st) === 'foundType', `${tag}: the verb found — now write`);
      C.type(st, rd.base + 'x'); is(C.check(st).reason === 'spell' && C.hint(st) === (st.show >= 2 ? 'missGlowW' : 'missSpell'), `${tag}: a wrong spelling`);
      C.type(st, ' ' + rd.base.toLocaleUpperCase() + ' '); is(C.check(st).result === 'ok', `${tag}: the base form (any case, trimmed) solves`);
    }
  }
}

/* ---------------- (c) the plan and the bots ---------------- */
let seed = 13; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (const loc of ALL) for (const lvl of C.levels()) {
  let prev = null, bad = 0, rep = 0; const slot = {};
  for (let i = 0; i < 200; i++) {
    const P = C.plan(loc, lvl, rnd, prev), o = P.order;
    if (o.slice().sort((a, b) => a - b).join() !== '0,1,2,3,4,5,6,7,8') bad++;
    if (C.runs(loc, lvl, o)) bad++;
    if (prev && prev.join() === o.join()) rep++; prev = o;
    if (C.kind(lvl) === 'pick' || C.kind(lvl) === 'time') for (const r of o) { const rd = C.round(loc, lvl, r, P.trays[r]); const at = rd.cards.findIndex(c => c.tense === rd.right); const key = rd.cards.length + ':' + at; slot[key] = (slot[key] || 0) + 1; }
  }
  is(bad === 0 && rep === 0, `${loc} L${lvl}: 200 plans — every round once, never three alike, a fresh order (${bad}/${rep})`);
  for (const n of [2, 3]) { const v = [0, 1, 2].slice(0, n).map(j => slot[n + ':' + j] || 0), tot = v.reduce((a, b) => a + b, 0); if (tot) is(Math.max(...v) - Math.min(...v) <= tot * 0.25, `${loc} L${lvl}: the right card sits in every slot of ${n} about equally (${v.join('/')})`); }
}
/* The time-word-blind bot that reads only WHICH cards are dealt and picks, per card set, its most frequent answer.
   FLOOR = 6 of 9, proved: a future round can never deal the present (the present also talks about tomorrow), so the
   three future answers all sit in the {past, future} set (max ≥ 3); the three present answers spread over the two other
   sets, each of which holds at most a split with the pasts — the sum of the per-set maxima is never below 6. Every
   other blind bot (longest card, two-word card) is bounded by this one. */
const BLIND_FLOOR = 6;
for (const loc of ALL) for (const lvl of ['1', '2', '3']) {
  const R = C.rounds().map(r => C.round(loc, lvl, r)), sets = {};
  R.forEach(rd => { const k = rd.cards.map(c => c.tense).sort().join('+'); (sets[k] = sets[k] || {})[rd.right] = (sets[k][rd.right] || 0) + 1; });
  const blind = Object.values(sets).reduce((a, s) => a + Math.max(...Object.values(s)), 0);
  is(blind <= BLIND_FLOOR, `${loc} L${lvl}: the card-set bot wins ${blind}/9 (floor ${BLIND_FLOOR})`);
  if (loc !== 'fi' && lvl !== '3') {
    is(!sets['future+present'], `${loc} L${lvl}: no tray of present + future (it would always mean present)`);
    const two = R.filter(rd => rd.time !== 'future' && rd.cards.length === 2).length;
    is(two === (MODAL.includes(loc) ? 6 : 3), `${loc} L${lvl}: ${MODAL.includes(loc) ? 'every round deals two cards' : 'three of the six past/present rounds deal two cards'}, so the card count never tells (${two})`);
  }
  const longest = R.filter(rd => rd.cards.slice().sort((a, b) => b.w.length - a.w.length)[0].tense === rd.right).length;
  is(longest <= BLIND_FLOOR, `${loc} L${lvl}: the longest-card bot wins ${longest}/9`);
}
for (const lvl of ['1', '2']) {
  const R = C.rounds().map(r => C.round('en', lvl, r));
  const will = R.filter(rd => rd.right === 'future').length, ed = R.filter(rd => { const c = rd.cards.find(x => /ed$/.test(x.w)); return c && c.tense === rd.right; }).length;
  is(will <= 3, `en L${lvl}: always-will wins ${will}/9`); is(ed <= (lvl === '1' ? 3 : 2), `en L${lvl}: always-ed wins ${ed}/9`);
}

/* ---------------- (e) strings, prose, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'time-frames-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'time-frames-core.js'), 'utf8');
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '');
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 50, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^miss|^ok|^t\d|^found/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(['title', 'instruction', 'instrBubble', 'okBubble'].indexOf(k) >= 0 || /^[tl]\d$/.test(k) || CSRC.indexOf("'" + k + "'") >= 0 || body.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
const QUOTE = { en: /"([^"]+)"/g, de: /„([^“]+)“/g, fr: /« ?([^»]+?) ?»/g, es: /«([^»]+)»/g, pt: /“([^”]+)”/g, it: /«([^»]+)»/g, nl: /‘([^‘’]+)’/g, sv: /”([^”]+)”/g, da: /”([^”]+)”/g, no: /«([^»]+)»/g, fi: /”([^”]+)”/g };
const ID = 'tense.past-present-future.l-1-1-e';
for (const loc of ALL) {
  const pr = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', loc + '.json'), 'utf8')).prose[ID];
  is(!!pr && ['about', 'practices', 'howToPlay', 'learningGoals'].every(k => Array.isArray(pr[k]) && pr[k].length >= 3), `${loc}: the prose entry`);
  const known = new Set(); for (const lvl of ['1', '2']) for (const r of C.rounds()) { const rd = C.round(loc, lvl, r); known.add(lc(C.filled(rd, rd.right).replace(/[.!]$/, '')).replace(/’/g, "'")); }
  const text = pr ? Object.values(pr).flat().join(' ') : '', qs = [...text.matchAll(QUOTE[loc])].map(m => lc(m[1].replace(/ /g, ' ').replace(/[.!]$/, '').trim()).replace(/’/g, "'"));
  is(qs.filter(x => known.has(x)).length >= 1, `${loc}: the prose quotes the activity (${qs.filter(x => known.has(x)).length} of ${qs.length})`);
  if (loc !== 'en') is(!/common core|L\.1\.1/i.test(text), `${loc}: no Common Core in the prose`);
}
const row = JSON.parse(fs.readFileSync(path.join(MT, 'tense-activities.json'), 'utf8')).find(x => x.id === ID);
is(row && row.tool === 'time-frames-activity', 'the manifest row points at the time frames');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'verb-tense-past-present-future' && row.page_title.en === 'The Clock Tower — Verb Tense: Past, Present & Future (Grade 1)', 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ level: ['1', '2', '3', '4', '5', '6'], rounds: { '1': 9, '2': 9, '3': 9, '4': 9, '5': 9, '6': 9 } }), "the row's params mirror the core");
console.log(`verify-time-frames-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
