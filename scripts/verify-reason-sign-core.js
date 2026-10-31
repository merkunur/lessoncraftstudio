#!/usr/bin/env node
/* =====================================================================
   verify-reason-sign-core.js — the logic gate of ACTIVITY #175, "Pearl's
   Opinion Page" (RI.2.8) → THE SIGN THAT STANDS ON ITS REASONS.
   Its own ground truth: a card's role comes from its key (R1/R2 = reason,
   S = restatement, O = off-topic) — never read off the core's ROLE map;
   its own modal-verb and word-stem tables per locale; a frozen copy of the
   points the old activity shipped in 7 locales; its own copy of the
   reviewer-signed Level 2 pair table.
   Checks: the pages (11 locales × 8 points × 4 cards, the bridge word,
   the lower-cased "because" forms), the kept points byte-equal, the
   card-writing rules (restatements mostly without the modal, every
   off-topic card sharing a word with its point, reasons sharing words
   too), the surface-cue bots under measured ceilings, every round of every
   level and pass, the slot table, the hand (place, take, the tide, the
   misses, the help), the reshuffle, the strings, the "because" assembly
   (French elision), the prose, the manifest, the html, the picture.
   Usage: node scripts/verify-reason-sign-core.js [--measure]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const MT = path.join(ROOT, 'mini tools');
/* the mutation harness hands in altered copies through these */
const C = require(process.env.RS_CORE || path.join(MT, 'reason-sign-core.js'));
const D = require(process.env.RS_DATA || path.join(MT, 'reason-sign-data.js'));
const ACT_PATH = process.env.RS_ACT || path.join(MT, 'pearl-opinion-page-activity.js');
const SRC = fs.readFileSync(ACT_PATH, 'utf8');
const MEASURE = process.argv.includes('--measure');
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; if (fail < 200) console.log('  FAIL ' + m); } };

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const IDS = ['park', 'helmet', 'read', 'garden', 'water', 'lights', 'dogs', 'dishes'];
const ROLE = { R1: 'reason', R2: 'reason', S: 'restate', O: 'off' };
/* the bridge word: a coordinating "because" that keeps the card's main-clause order — never the clause-final ones */
const BECAUSE = { en: 'because', de: 'denn', fr: 'parce que', es: 'porque', pt: 'porque', it: 'perché', nl: 'want', sv: 'för', da: 'for', no: 'for', fi: 'koska' };
const NEVER = { de: /^weil$/, nl: /^omdat$/, sv: /^eftersom$/, da: /^fordi$/, no: /^fordi$/ };
/* de keeps the capital of a card that opens with a noun */
const KEEP = { de: ['read.R2', 'read.S', 'water.R1', 'lights.R2', 'dogs.R2', 'dishes.S', 'dishes.O'] };
/* the frozen copy of the points the old activity shipped (2026-10-31) */
const FROZEN = JSON.parse(fs.readFileSync(path.join(__dirname, 'verify-reason-sign-kept.json'), 'utf8')).points;
/* the Level 2 pairs as the reviewer signed them: no reason on the cards supports the other sign (all 11 locales, 2026-10-31) */
const PAIRS = [
  ['park', 'helmet', 'R1', 'R1', 'park', 'helmet'], ['read', 'water', 'R1', 'R2', 'water', 'read'], ['garden', 'lights', 'R2', 'R1', 'garden', 'lights'], ['dogs', 'dishes', 'R1', 'R2', 'dishes', 'dogs'],
  ['park', 'read', 'R2', 'R2', 'read', 'park'], ['helmet', 'garden', 'R2', 'R1', 'helmet', 'garden'], ['water', 'dogs', 'R1', 'R2', 'dogs', 'water'], ['lights', 'dishes', 'R2', 'R2', 'lights', 'dishes']
];

/* ---- my own words: content words, a 4-letter stem, a prefix match; the modal verbs ---- */
const STOP = {
  en: 'a an the and or of to in on at for with is are be it its our we you your my some every each when that this there their they them can has have get gets from into even all so very will would',
  de: 'der die das den dem des ein eine einen einem einer und oder zu im in an am auf aus mit für ist sind sein es wir du ihr unser unsere unserer unseren mein meine man wenn das dass beim bei jeden jede jeder jedem von vom zum zur sich auch noch schon',
  fr: 'le la les un une des de du d l à au aux et ou en dans sur pour par avec est sont c ce ça on nous notre nos vous votre mon ma mes son sa ses leur leurs qui que qu n ne pas y il elle chaque quand',
  es: 'el la los las un una unos unas de del a al y o en con por para es son su sus nuestro nuestra nuestros mi mis te se lo le que cada si cuando no',
  pt: 'o a os as um uma de do da dos das em no na nos nas num numa e ou com por para é são seu sua nossa nosso meu minha que se te gente todo toda cada quando não ao às mais',
  it: 'il lo la i gli le un una uno di del della dei delle a al alla ai da dal e o in nel nella con per è sono suo sua nostra nostro mia mio che si ci ogni quando non',
  nl: 'de het een en of van in op aan met voor is zijn je jij we wij onze ons mijn er als dat die elk elke te om uit bij naar ook',
  sv: 'en ett den det de och eller av i på till med för är vår vårt våra min man om när som att från alla varje ut ur',
  da: 'en et den det de og eller af i på til med for er vores min man hvis når som at fra alle hver ud',
  no: 'en et den det de og eller av i på til med for er vår vårt min man hvis når som at fra alle hver ut',
  fi: 'ja tai on ovat ei se ne me te jos kun joka jokaisen jota ihan'
};
const MODAL = {
  en: /(?<!\p{L})(should|must|needs?|ought)(?!\p{L})/iu, de: /(?<!\p{L})(sollt\p{L}*|soll|sollen|muss|müssen)(?!\p{L})/iu,
  fr: /(?<!\p{L})(devr\p{L}*|doi[st]|doiv\p{L}*|faut)(?!\p{L})/iu, es: /(?<!\p{L})(deber\p{L}*|deben?|debes|hay que)(?!\p{L})/iu,
  pt: /(?<!\p{L})(dever\p{L}*|devia\p{L}*|devemos|deve|precis\p{L}*)(?!\p{L})/iu, it: /(?<!\p{L})(dovr\p{L}*|dev[eio]\p{L}*|bisogna)(?!\p{L})/iu,
  nl: /(?<!\p{L})(moet\p{L}*|zou\p{L}*)(?!\p{L})/iu, sv: /(?<!\p{L})(borde|ska|bör|måste)(?!\p{L})/iu,
  da: /(?<!\p{L})(bør|skal|må)(?!\p{L})/iu, no: /(?<!\p{L})(bør|skal|må)(?!\p{L})/iu, fi: /(?<!\p{L})(pitäisi|kannattaa|täytyy)(?!\p{L})/iu
};
/* stems that bend inside the word: fi lapset/lasten, vesi/veden; en bikes/biking; it cane/cani */
const ALIAS = { fi: { last: 'laps', vede: 'vesi' }, en: { biki: 'bike' }, it: { cane: 'cani' } };
const stops = {}; for (const l in STOP) stops[l] = new Set(STOP[l].split(' '));
const words = (l, s) => (String(s).toLowerCase().replace(/[’']/g, ' ').match(/\p{L}+/gu) || []).filter((w) => w.length >= 2 && !stops[l].has(w));
const stem = (l, w) => { const s = w.length > 4 ? w.slice(0, 4) : w; return (ALIAS[l] && ALIAS[l][s]) || s; };
const same = (l, a, b) => { if (stem(l, a) === stem(l, b)) return true; const [x, y] = a.length <= b.length ? [a, b] : [b, a]; return x.length >= 2 && y.startsWith(x); };
const shared = (l, p, t) => { const pw = words(l, p), seen = new Set(); for (const w of words(l, t)) if (pw.some((q) => same(l, q, w))) seen.add(stem(l, w)); return seen.size; };
const modal = (l, s) => MODAL[l].test(s);
/* the evaluative "it is right / great / perfect" words a restatement leans on (the reviewer's tell, 2026-10-31) */
const EVAL = {
  en: /(?<!\p{L})(right|great|perfect|ideal|best|good)(?!\p{L})/iu, de: /(?<!\p{L})(richtig|toll\p{L}*|super|perfekt|ideal|gut)(?!\p{L})/iu,
  fr: /(?<!\p{L})(parfait\p{L}*|super|bon|bonne|idéal\p{L}*|génial\p{L}*)(?!\p{L})/iu, es: /(?<!\p{L})(ideal|perfect\p{L}*|mejor|correcto|gran|buen\p{L}*)(?!\p{L})/iu,
  pt: /(?<!\p{L})(cert[oa]|ótim[oa]|perfeit\p{L}*|melhor|ideal)(?!\p{L})/iu, it: /(?<!\p{L})(giust\p{L}*|perfett\p{L}*|bel|bell[ao]|ottim\p{L}*|ideale)(?!\p{L})/iu,
  nl: /(?<!\p{L})(goed|juist\p{L}*|precies|perfect|prima)(?!\p{L})/iu, sv: /(?<!\p{L})(rätt|lagom|toppen\p{L}*|bra|perfekt)(?!\p{L})/iu,
  da: /(?<!\p{L})(rigtig\p{L}*|godt?|tilpas|perfekt)(?!\p{L})/iu, no: /(?<!\p{L})(rett\p{L}*|godt?|passe|kjempegod|perfekt)(?!\p{L})/iu,
  fi: /(?<!\p{L})(sopi\p{L}*|hyv\p{L}*|loistav\p{L}*|oikea)(?!\p{L})/iu
};
const evalw = (l, s) => EVAL[l].test(s);
/* poison my own tools once, both ways */
ok(shared('en', 'Our town should build a new park.', 'Our town has a library.') === 1 && shared('en', 'Our town should build a new park.', 'Bikes are red.') === 0, 'W: the shared-word count fires and stays quiet');
ok(evalw('sv', 'Det är rätt.') && !evalw('sv', 'Det är fel.') && evalw('it', 'un bel posto') && !evalw('it', 'un posto'), 'W: the evaluative test fires and stays quiet');
ok(modal('de', 'Kinder sollten helfen.') && !modal('de', 'Kinder helfen gern.') && modal('fi', 'Lasten pitäisi lukea.') && !modal('fi', 'Lenkki pitää koiran iloisena.'), 'W: the modal test fires and stays quiet (fi pitää = keeps)');

/* ---------------- A. the pages ---------------- */
ok(JSON.stringify(Object.keys(D).sort()) === JSON.stringify(LOCALES.slice().sort()), 'A: the pages hold exactly the 11 locales');
for (const l of LOCALES) {
  const L = D[l];
  ok(L.because === BECAUSE[l], `A[${l}]: the bridge word is "${BECAUSE[l]}" (${L.because})`);
  ok(!NEVER[l] || !NEVER[l].test(L.because), `A[${l}]: the bridge word is not a clause-final conjunction`);
  ok(JSON.stringify(Object.keys(L.points)) === JSON.stringify(IDS), `A[${l}]: the eight points in order`);
  const all = [];
  for (const id of IDS) {
    const P = L.points[id];
    for (const k of ['p', 'R1', 'R2', 'S', 'O']) { ok(typeof P[k] === 'string' && P[k] === P[k].trim() && /[.!]$/.test(P[k]) && P[k].length >= 18 && !/[{}]/.test(P[k]), `A[${l}] ${id}.${k}: a whole sentence "${P[k]}"`); all.push(P[k]); }
    for (const k of ['R1', 'R2', 'S', 'O']) {
      const want = (KEEP[l] || []).includes(id + '.' + k) ? P[k] : P[k].charAt(0).toLocaleLowerCase(l) + P[k].slice(1);
      ok(P.b && P.b[k] === want, `A[${l}] ${id}.${k}: the "because" form`);
    }
    ok(P.p !== P.S && P.R1 !== P.R2, `A[${l}] ${id}: the restatement is not the point itself, the two reasons differ`);
  }
  ok(new Set(all).size === all.length, `A[${l}]: no sentence used twice`);
}
for (const l of Object.keys(FROZEN)) for (const id of IDS) ok(D[l].points[id].p === FROZEN[l][id], `B[${l}] ${id}: the kept point is unchanged`);
ok(Object.keys(FROZEN).length === 7, 'B: seven kept locales');

/* ---------------- C. the card-writing rules + the surface-cue bots (ceilings measured; they may only shrink) ---------------- */
const CEIL = { sModal: 2, long: 3, short: 3, mid: 3, most: 2.5, nomodal: 3.25, comb: 4, few: 5, legsLong: 3, legsShort: 3 };
for (const l of LOCALES) {
  let sMod = 0, oShare = 0, r1 = 0, r2 = 0;
  for (const id of IDS) { const P = D[l].points[id]; if (modal(l, P.S)) sMod++; if (shared(l, P.p, P.O) > 0) oShare++; if (shared(l, P.p, P.R1) > 0) r1++; if (shared(l, P.p, P.R2) > 0) r2++; }
  ok(sMod <= CEIL.sModal, `C[${l}]: restatements carrying a modal ${sMod}/8 (≤ ${CEIL.sModal})`);
  ok(oShare === 8, `C[${l}]: every off-topic card shares a word with its point (${oShare}/8)`);
  ok(r1 >= 5 && r2 >= 5, `C[${l}]: reasons share a word with the point (R1 ${r1}/8, R2 ${r2}/8, each ≥ 5)`);
  { let se = 0, oe = 0; for (const id of IDS) { const P = D[l].points[id]; if (evalw(l, P.S)) se++; if (evalw(l, P.R1) || evalw(l, P.R2) || evalw(l, P.O)) oe++; }
    ok(se <= 2 && oe >= 1, `C[${l}]: an evaluative word ("right", "perfect"…) is no restatement tell — restatements ${se}/8 (≤ 2), other cards ${oe} (≥ 1)`); }
  for (const v of ['R1', 'R2']) {
    const b = { long: 0, short: 0, mid: 0, most: 0, few: 0, nomodal: 0, comb: 0 };
    for (const id of IDS) {
      const P = D[l].points[id], cards = { R: P[v], S: P.S, O: P.O }, ks = ['R', 'S', 'O'];
      const len = (k) => cards[k].length, sh = (k) => shared(l, P.p, cards[k]);
      const share = (pick) => (pick.includes('R') ? 1 / pick.length : 0);
      const mx = Math.max(...ks.map(len)), mn = Math.min(...ks.map(len));
      b.long += share(ks.filter((k) => len(k) === mx)); b.short += share(ks.filter((k) => len(k) === mn));
      b.mid += share(ks.filter((k) => len(k) !== mx && len(k) !== mn));
      const smx = Math.max(...ks.map(sh)), smn = Math.min(...ks.map(sh));
      b.most += share(ks.filter((k) => sh(k) === smx)); b.few += share(ks.filter((k) => sh(k) === smn));
      const nm = ks.filter((k) => !modal(l, cards[k])); b.nomodal += share(nm.length ? nm : ks);
      const rest = ks.filter((k) => sh(k) !== smx), pool = rest.length ? rest : ks, rmn = Math.min(...pool.map(len));
      b.comb += share(pool.filter((k) => len(k) === rmn));
    }
    if (MEASURE) console.log(`  ${l} ${v}: ` + Object.entries(b).map(([k, x]) => k + ' ' + x.toFixed(2)).join(', '));
    for (const k of Object.keys(b)) ok(b[k] <= CEIL[k] + 1e-9, `C[${l} ${v}]: the "${k}" bot finds the reason ${b[k].toFixed(2)}/8 (≤ ${CEIL[k]})`);
  }
  /* Level 3: "the two longest" / "the two shortest" pick both reasons */
  let two = { L: 0, S: 0 };
  for (const id of IDS) {
    const P = D[l].points[id], c = [['R', P.R1], ['R', P.R2], ['S', P.S], ['O', P.O]];
    const byLen = c.slice().sort((a, b2) => a[1].length - b2[1].length);
    if (byLen[2][0] === 'R' && byLen[3][0] === 'R') two.L++;
    if (byLen[0][0] === 'R' && byLen[1][0] === 'R') two.S++;
  }
  if (MEASURE) console.log(`  ${l} legs: two longest ${two.L}, two shortest ${two.S}`);
  ok(two.L <= CEIL.legsLong && two.S <= CEIL.legsShort, `C[${l}]: Level 3 — the two longest are both reasons ${two.L}/8, the two shortest ${two.S}/8 (≤ 3)`);
}

/* ---------------- D. every round of every level and pass ---------------- */
ok(JSON.stringify(C.PAIRS.map((p) => [p.signs[0], p.signs[1], p.reasons[0], p.reasons[1], p.s, p.o])) === JSON.stringify(PAIRS), 'D: the Level 2 pairs are the reviewer-signed table');
{
  const asSign = {}; PAIRS.forEach((p) => { asSign[p[0]] = (asSign[p[0]] || 0) + 1; asSign[p[1]] = (asSign[p[1]] || 0) + 1; });
  ok(IDS.every((id) => asSign[id] === 2), 'D: every point is a Level 2 sign exactly twice');
  ok(PAIRS.every((p) => p[0] !== p[1] && [p[0], p[1]].includes(p[4]) && [p[0], p[1]].includes(p[5]) && p[4] !== p[5]), 'D: each pair: two points, the restatement of one, the off-topic of the other');
  ok(!PAIRS.some((p) => (p[0] === 'dishes' && p[2] === 'R1') || (p[1] === 'dishes' && p[3] === 'R1')), 'D: dishes R1 ("care for their home") never sits beside another sign');
}
for (const l of ['en', 'de', 'fi', 'pt']) for (let pass = 0; pass < 4; pass++) {
  const slots = { one: [0, 0, 0], two: [0, 0, 0, 0], legs: [0, 0, 0, 0] };
  for (let pos = 0; pos < 8; pos++) for (let k = 0; k < 8; k++) {
    for (const lv of C.LEVELS) {
      const r = C.round(l, lv, k, pass, pos, D);
      const role = (c) => ROLE[c.key], tag = `D[${l} ${lv} k${k} pass${pass} pos${pos}]`;
      if (lv === 'one') {
        ok(r.signs.length === 1 && r.signs[0] === IDS[k] && r.cards.length === 3, tag + ': one sign, three cards');
        ok(r.cards.every((c) => c.point === IDS[k] && c.t === D[l].points[c.point][c.key]), tag + ': the cards are the point\'s own');
        ok(r.cards.map(role).sort().join() === 'off,reason,restate' && r.cards.some((c) => c.key === (pass % 2 ? 'R2' : 'R1')), tag + ': a reason (R' + (pass % 2 ? 2 : 1) + '), the restatement, the off-topic card');
      } else if (lv === 'legs') {
        ok(r.signs[0] === IDS[k] && r.cards.length === 4 && r.cards.map((c) => c.key).sort().join() === 'O,R1,R2,S' && r.cards.every((c) => c.point === IDS[k]), tag + ': one sign, R1 R2 S O');
      } else {
        const p = PAIRS[k];
        ok(JSON.stringify(r.signs) === JSON.stringify([p[0], p[1]]) && r.cards.length === 4, tag + ': the pair\'s two signs, four cards');
        const want = [p[0] + '.' + p[2], p[1] + '.' + p[3], p[4] + '.S', p[5] + '.O'].sort().join();
        ok(r.cards.map((c) => c.id).sort().join() === want, tag + ': the pair\'s cards ' + want);
      }
      if (k === 0) r.cards.forEach((c, i) => { if (role(c) === 'reason') slots[lv][i]++; });
    }
  }
  /* each pos was dealt with k = 0..7 — the slot depends only on (pos + pass), so count each pos once (k = 0) */
  ok(Math.max(...slots.one) <= 3, `D[${l} pass${pass}]: Level 1 — no slot holds the reason more than 3/8 (${slots.one})`);
  ok(Math.max(...slots.two) <= 5 && Math.max(...slots.legs) <= 5, `D[${l} pass${pass}]: Levels 2–3 — no slot holds a reason more than 5/8 (${slots.two} · ${slots.legs})`);
}
{
  const a = C.round('en', 'one', 0, 0, 0, D).cards.map((c) => c.key).join(), b = C.round('en', 'one', 0, 1, 0, D).cards.map((c) => c.key).join();
  ok(a !== b, 'D: the next pass moves the cards (rotated slot table)');
}

/* ---------------- E. the hand ---------------- */
{
  const find = (st, key) => st.round.cards.find((c) => c.key === key).id;
  let st = C.newState('en', 'one', 0, 0, 0, D);
  ok(st.sockets.length === 1 && !st.done && st.shown === null, 'E: Level 1 starts with one empty socket');
  let res = C.tide(st);
  ok(res.result === 'empty' && C.hint(st, res) === 'hintEmpty' && st.misses === 0, 'E: the tide with nothing placed is no miss (hintEmpty)');
  ok(C.place(st, find(st, 'S')) && st.shown === null, 'E: placing a card shows nothing yet — the tide decides');
  res = C.tide(st);
  ok(res.result === 'miss' && res.read.show[0] === 'copy' && !res.read.signs[0].dry && C.hint(st, res) === 'hintRestate' && st.misses === 1 && !st.help, 'E: a restatement is a copy of the sign, soaked (hintRestate)');
  ok(C.place(st, find(st, 'O')) && st.shown === null && C.socketOf(st, find(st, 'O')) === 0 && C.socketOf(st, find(st, 'S')) < 0, 'E: a new card swaps the old one out');
  res = C.tide(st);
  ok(res.result === 'miss' && res.read.show[0] === 'lonely' && C.hint(st, res) === 'hintOff' && st.help, 'E: an off-topic card is a lonely post; the second miss brings the help');
  ok(C.take(st, 0) && C.empty(st), 'E: a placed card comes back');
  C.place(st, find(st, 'R1')); res = C.tide(st);
  ok(res.result === 'ok' && st.done && res.read.show[0] === 'post' && res.read.signs[0].dry && C.hint(st, res) === null, 'E: the reason is a post; the sign stays dry: done');
  ok(C.tide(st).result === 'no' && !C.place(st, find(st, 'S')) && !C.take(st, 0), 'E: nothing after done');
  /* Level 2 */
  st = C.newState('en', 'two', 0, 0, 0, D);
  ok(st.sockets.length === 2 && st.sockets[0].sign === 0 && st.sockets[1].sign === 1, 'E: Level 2 has one socket under each sign');
  ok(!C.place(st, 'park.R1'), 'E: Level 2 needs a sign to place under');
  C.place(st, 'helmet.R1', 0); res = C.tide(st);
  ok(res.result === 'empty' && res.key === 'hintEmpty2' && st.misses === 0, 'E: Level 2 with one sign bare is no miss (hintEmpty2)');
  C.place(st, 'park.R1', 1); res = C.tide(st);
  ok(res.result === 'miss' && res.read.show[0] === 'lean' && res.read.show[1] === 'lean' && C.hint(st, res) === 'hintWrong', 'E: reasons under the wrong signs lean (hintWrong)');
  C.place(st, 'park.R1', 0); C.place(st, 'helmet.R1', 1); res = C.tide(st);
  ok(res.result === 'ok' && res.read.signs.every((g) => g.dry), 'E: each reason under its own sign: both dry');
  st = C.newState('en', 'two', 0, 0, 0, D); C.place(st, 'park.R1', 0); C.place(st, 'park.S', 1); res = C.tide(st);
  ok(res.result === 'miss' && res.read.signs[0].dry && !res.read.signs[1].dry && C.hint(st, res) === 'hintRestate', 'E: one sign right, the other on a restatement: still a miss');
  /* Level 3 */
  st = C.newState('en', 'legs', 0, 0, 0, D);
  C.place(st, find(st, 'R1')); res = C.tide(st);
  ok(res.result === 'miss' && res.read.signs[0].tilt && C.hint(st, res) === 'hintOneLeg', 'E: one reason: the sign tilts (hintOneLeg)');
  C.place(st, find(st, 'S')); res = C.tide(st);
  ok(res.result === 'miss' && res.read.signs[0].tilt && C.hint(st, res) === 'hintRestate' && st.help, 'E: a reason and a restatement: tilts, the restatement named; miss 2 helps');
  C.place(st, find(st, 'R2'), 1); res = C.tide(st);
  ok(res.result === 'ok' && res.read.signs[0].dry && !res.read.signs[0].tilt, 'E: two reasons: it stands level and dry');
  st = C.newState('en', 'legs', 0, 0, 0, D); C.place(st, find(st, 'O')); C.place(st, find(st, 'S')); res = C.tide(st);
  ok(res.result === 'miss' && !res.read.signs[0].tilt && !res.read.signs[0].dry, 'E: no reason at all: flat and soaked, no tilt');
  ok(C.locOf('pt-BR') === 'pt' && C.locOf('xx') === 'en' && C.levelOf('zz') === 'one', 'E: locale and level fall back');
  ok(C.round('en', 'one', 8, 0, 0, D).key === 'park', 'E: the round index wraps');
}

/* ---------------- F. the reshuffle ---------------- */
{
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  let prev = null, perm = true, rep = false;
  for (let p = 0; p < 300; p++) { const o = C.plan(8, rnd, prev); if (o.slice().sort().join() !== '0,1,2,3,4,5,6,7') perm = false; if (prev && prev.join() === o.join()) rep = true; prev = o; }
  ok(perm && !rep, 'F: 300 passes — permutations, never the previous order');
  const stuck = () => 0.999999, a = C.plan(8, stuck, null), b = C.plan(8, stuck, a);
  ok(a.join() !== b.join() && b.slice().sort().join() === '0,1,2,3,4,5,6,7', 'F: a stuck generator still never repeats the previous order');
}

/* ---------------- G. the strings ---------------- */
const m = SRC.match(/\/\*STRINGS-BEGIN\*\/strings: (\{[\s\S]*?\}),\/\*STRINGS-END\*\//);
const S = m ? (new Function('return ' + m[1]))() : {};
const KEYS = Object.keys(S);
ok(KEYS.length === 38, `G: 38 string keys (${KEYS.length})`);
for (const k of KEYS) {
  ok(JSON.stringify(Object.keys(S[k]).sort()) === JSON.stringify(LOCALES.slice().sort()), `G: ${k} in all 11 locales`);
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  for (const l of LOCALES) {
    ok(typeof S[k][l] === 'string' && S[k][l].trim().length > 0, `G: ${k}.${l} not empty`);
    ok(ph(S[k][l]) === ph(S[k].en), `G: ${k}.${l} keeps the placeholders ${ph(S[k].en)}`);
    if (l !== 'en') ok(!/common core|ccss|RI\.2/i.test(S[k][l]), `G: ${k}.${l} names no Common Core`);
  }
  ok(!/ [!?:;»]/.test(S[k].fr) && !/« /.test(S[k].fr), `G: ${k}.fr has no plain space before ! ? : ; or after «`);
}
const SHELL = ['title', 'instruction', 'checkBtn', 'instrBubble', 'okBubble'];
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*?\/\*STRINGS-END\*\//, '');
const MAPPED = ['qOne', 'qTwo', 'qLegs', 'aPost', 'aCopy', 'aLonely', 'aLean', 'hintEmpty', 'hintEmpty2', 'hintRestate', 'hintOff', 'hintWrong', 'hintOneLeg'];
for (const k of KEYS) if (!SHELL.includes(k) && !MAPPED.includes(k)) ok(new RegExp("'" + k + "'").test(body), `G: ${k} is used`);
ok(/Q_KEY: \{ one: 'qOne', two: 'qTwo', legs: 'qLegs' \}/.test(body) && /SHOW_KEY: \{ post: 'aPost', copy: 'aCopy', lonely: 'aLonely', lean: 'aLean' \}/.test(body), 'G: the task lines and the after-tide labels are reached through their maps');
{ const CORE = fs.readFileSync(process.env.RS_CORE || path.join(MT, 'reason-sign-core.js'), 'utf8');
  ok(/var WHY_KEY = \{ restate: 'hintRestate', off: 'hintOff', wrong: 'hintWrong', oneLeg: 'hintOneLeg' \};/.test(CORE) && /key: st\.level === 'two' \? 'hintEmpty2' : 'hintEmpty'/.test(CORE), 'G: the miss and empty hints are named by the core'); }

/* ---------------- H. the "because" line, run through the activity itself ---------------- */
{
  const ctx = { window: {}, ReasonSignCore: C, ReasonSignData: D }; vm.createContext(ctx);
  vm.runInContext(SRC.replace(/injectReasonSignCSS\(\);/, '') + '\n;this.__A = PearlOpinionPageActivity;', ctx);
  const A = ctx.__A;
  for (const l of LOCALES) {
    A.api = { lang: l };
    for (const id of IDS) for (const k of ['R1', 'R2']) {
      const b = D[l].points[id].b[k], got = A._because(b);
      const want = l === 'fr' && /^[aeiouyhàâéèêîôû]/i.test(b) ? 'parce qu’' + b : BECAUSE[l] + ' ' + b;
      ok(got === want, `H[${l}] ${id}.${k}: "${got}"`);
    }
  }
  A.api = { lang: 'en', settings: { bridge: 'on', level: 'two' } };
  ok(A._bridgeOn() === true && A._level() === 'two', 'H: the bridge and level settings are read');
  A.api = { lang: 'en', settings: { bridge: 'off' } };
  ok(A._bridgeOn() === false && A._level() === 'one', 'H: bridge off / level falls back to one');
  A.api = { lang: 'fr' };
  ok(A._because('un casque protège.') === 'parce qu’un casque protège.' && A._because('les enfants lisent.') === 'parce que les enfants lisent.', 'H[fr]: "parce que" elides before a vowel only');
  ok(A._typo('Oui !') === 'Oui !' && A._typo('« oui »') === '« oui »', 'H[fr]: French spacing on display');
}

/* ---------------- I. prose, manifest, html, picture ---------------- */
const ID = 'pearl-opinion-page.back-it-up.ri-2-8';
for (const l of LOCALES) {
  const P = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend/messages/activity-content/' + l + '.json'), 'utf8')).prose[ID];
  ok(P && P.about.length === 3 && P.practices.length === 4 && P.howToPlay.length === 3 && P.learningGoals.length === 3, `I[${l}]: prose about/practices/howToPlay/learningGoals`);
  const all = JSON.stringify(P || {});
  if (l === 'en') ok(/Common Core RI\.2\.8/.test(all), 'I[en]: names Common Core RI.2.8');
  else ok(!/common core|ccss|RI\.2\.8/i.test(all), `I[${l}]: no Common Core in the prose`);
  ok(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmai\p{L}*)(?!\p{L})/iu.test(all), `I[${l}]: no price words in the prose`);
  ok(all.includes(BECAUSE[l]), `I[${l}]: the prose names the bridge word "${BECAUSE[l]}"`);
  if (l === 'fr') ok(!/ [!?:;»]/.test(all.replace(/\\u202f/gi, ' ')), 'I[fr]: prose spacing before ! ? : ;');
}
const row = JSON.parse(fs.readFileSync(process.env.RS_MAN || path.join(MT, 'pearl-opinion-page-activities.json'), 'utf8'));
ok(row.length === 1 && row[0].id === ID && row[0].tool === 'pearl-opinion-page-activity' && row[0].task_template === 'reason-sign' && JSON.stringify(row[0].params) === '{}', 'I: the manifest row (params {})');
for (const k of ['slug', 'page_title', 'page_intro']) ok(LOCALES.every((l) => row[0][k] && typeof row[0][k][l] === 'string' && row[0][k][l].length > 3), `I: ${k} in 11 locales`);
ok(LOCALES.every((l) => /^[a-z0-9-]+$/.test(row[0].slug[l])) && new Set(LOCALES.map((l) => l + '/' + row[0].slug[l])).size === 11, 'I: url-safe slugs');
ok(row[0].alignment.code === 'RI.2.8' && row[0].alignment.grade === '2', 'I: aligned to RI.2.8, grade 2');
for (const l of ['sv', 'da', 'no', 'fi']) ok(!/common core|ccss|RI\.2/i.test(row[0].page_title[l] + row[0].page_intro[l]), `I[${l}]: new title and intro name no Common Core`);
const HTML = fs.readFileSync(path.join(MT, 'pearl-opinion-page-activity.html'), 'utf8');
const at = (s) => HTML.indexOf('src="/mini-tools/' + s);
ok(/reason-sign-data\.js\?v=\d+/.test(HTML) && /reason-sign-core\.js\?v=\d+/.test(HTML) && /pearl-opinion-page-activity\.js\?v=\d+/.test(HTML) && at('reason-sign-data') < at('reason-sign-core') && at('reason-sign-core') < at('pearl-opinion-page-activity.js') && at('reason-sign-data') > 0, 'I: the html loads data, core, then the activity, each with ?v=');
ok(!/height:\s*100%/.test(HTML) && !/reason-support-core/.test(HTML), 'I: the html does not pin the root height or load the old core');
ok(/OK_MS: 500,/.test(SRC), 'I: OK_MS 500');
const pic = (SRC.match(/PICS: \{ pearl: '([^']+)' \}/) || [])[1] || '';
ok(pic === 'zoo animals/seal' && fs.existsSync(path.join(ROOT, 'frontend/public/image-library-webp/themes', pic + '@2x.webp')) && !/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?\//i.test(pic), 'I: Pearl is the colour zoo-animals seal');

console.log(`verify-reason-sign-core: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
