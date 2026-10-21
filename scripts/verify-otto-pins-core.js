#!/usr/bin/env node
/* =====================================================================
   verify-otto-pins-core.js — the gate of ACTIVITY #67, OTTO'S PROOF PINS
   (Otto's Picture Book, RL.K.7, 11 locales). Its own ground truth:
     1. Which picture? — the gate reads every strip's pins and every
        panel's features itself: in EVERY locale and both Sentences
        settings, each strip sticks in exactly ONE of its story's four
        panels, that panel is the strip's target, and the core's check
        agrees for every strip × panel
     2. Fill the blank — the right word's pin sticks in the scene and
        the two others do not; every other pin of the sentence sticks;
        the core agrees for each choice; with letters the right spelling
        sticks and a wrong one does not; the tiles hold the word's
        letters + two others and never spell it in order
     3. True or false? — the gate decides truth from the pins: per
        setting exactly four true and four false, in every locale; the
        core's truth and check agree
     4. Read and color — the gate's own table of what each instruction
        asks (which tiles, which color); the right painting passes, and
        on 4,000 seeded paintings per round the core and the gate agree;
        every part's count token shows the number, the noun is pictured
     5. the deals and the order: a pass is a permutation, never the last
        one, never starts with the round just played; the right word's
        place in the bank 3/3/2 and never three running; True or false?
        never three answers the same running (10,000 seeds)
     6. hints by task and miss; miss 2 help; no help at rest
     7. texts × 11: every key, one blank per fill sentence, the color
        names, no 0, fr non-breaking spaces; strings × 11; the pictures
        (exist, colour, labelled); the floors (96 at 704, 64 on a phone);
        the manifest, its mirror, frozen en..nl metadata, the new
        sv da no fi slugs, titles, intros
   Usage: node scripts/verify-otto-pins-core.js  (OP_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.OP_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'otto-pins-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, OttoPinsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'otto-picture-book-activity.js'), 'utf8') + '\nthis.__A = OttoPictureBookActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const FROZEN = 'd20796cd0f91e071c6a548cefae2ba30f966bb22';
/* the gate's own reading of a sentence: the tags in [word:tag] */
const pinsOf = (s) => { const out = []; s.replace(/\[([^\]:]+):([^\]]+)\]/g, (_, w, t) => { out.push(t); return ''; }); return out; };
const sticks = (tags, f) => tags.every(t => Object.prototype.hasOwnProperty.call(f, t));
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const picOk = (p) => p && fs.existsSync(path.join(IMG, p.split('/').slice(0, -1).join('/'), p.split('/').pop() + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]);
const D = C.DATA, TX = D.TEXT;

/* 1 — Which picture? */
const STORIES = ['boat', 'acorn', 'sandcastle', 'apple', 'raincoat', 'ball', 'snow', 'butterfly'];
is(JSON.stringify(D.STORY_ORDER) === JSON.stringify(STORIES), 'the eight stories, in the gate\'s order');
for (const loc of LOCS) for (const two of [false, true]) {
  const R = C.rounds(loc, 'which', two);
  is(R.length === 8 && R.every(r => r.strips.length === (two ? 2 : 1)), `${loc} which ${two ? 2 : 1}: 8 stories, ${two ? 2 : 1} strip(s) each`);
  for (const r of R) {
    const S = D.STORIES[r.story];
    is(r.panels.length === 4, `${loc} ${r.id}: four panels`);
    r.strips.forEach((s, k) => {
      const tags = pinsOf(TX[loc].which[r.story][k]), fits = S.panels.map(p => sticks(tags, p.f));
      is(tags.length >= 1, `${loc} ${r.id} strip ${k + 1}: carries pins`);
      is(fits.filter(Boolean).length === 1 && fits[s.target], `${loc} ${r.id} strip ${k + 1}: sticks in exactly one panel, the target (${fits})`);
      for (let p = 0; p < 4; p++) {
        const st = C.newState(r, {}); r.strips.forEach((x, q) => C.dock(st, q, q === k ? p : x.target));
        const res = C.check(st);
        is(!!res.ok === fits[p], `${loc} ${r.id} strip ${k + 1} under panel ${p + 1}: core ${res.ok ? 'sticks' : 'dangles'}, gate ${fits[p] ? 'sticks' : 'dangles'}`);
        if (!fits[p]) is(res.strips[k].some(x => !x.stuck) && res.strips[k].filter(x => !x.stuck).every(x => !Object.prototype.hasOwnProperty.call(S.panels[p].f, x.tag)), `${loc} ${r.id} strip ${k + 1} panel ${p + 1}: the dangling pins are exactly the words the panel does not show`);
      }
    });
    if (two) is(r.strips[0].target !== r.strips[1].target, `${loc} ${r.id}: the two strips go under different panels`);
    for (const p of S.panels) for (const t of p.t) is(picOk(t[0]), `${r.story}: ${t[0]} exists, colour, labelled`);
  }
  /* the targets are not all in one place */
  const pos = R.map(r => r.strips[0].target), c = [0, 0, 0, 0]; pos.forEach(x => c[x]++);
  is(Math.max(...c) <= 3, `${loc} which ${two ? 2 : 1}: the first strip's panel is spread over the four places (${c})`);
}

/* 2 — Fill the blank */
for (const loc of LOCS) for (const two of [false, true]) {
  const R = C.rounds(loc, 'fill', two);
  is(R.length === 8, `${loc} fill: 8 rounds`);
  for (const r of R) {
    const F = D.FILL.find(x => x.id === r.key), sc = D.SCENES[F.scene], src = TX[loc].fill[r.key];
    is((src[0].match(/\{_\}/g) || []).length === 1, `${loc} ${r.id}: one blank`);
    is(src[1].length === 3 && new Set(src[1].map(w => w.toLocaleLowerCase(loc))).size === 3, `${loc} ${r.id}: three different words in the bank`);
    is(sticks(pinsOf(src[0]), sc.f), `${loc} ${r.id}: every other pin of the sentence sticks in the scene`);
    is(F.bank.map(t => Object.prototype.hasOwnProperty.call(sc.f, t)).join() === 'true,false,false', `${loc} ${r.id}: only the right word's pin sticks (${F.bank})`);
    is(picOk(D.SCENES[F.scene].t[0][0]), `${r.key}: its scene's pictures exist`);
    for (let i = 0; i < 3; i++) {
      if (r.letters) break;
      const st = C.newState(r, { bank: [0, 1, 2] }); C.choose(st, i); const res = C.check(st);
      is(!!res.ok === (i === 0), `${loc} ${r.id}: the word «${r.bank[i].word}» ${i === 0 ? 'sticks' : 'dangles'}`);
    }
    if (r.letters) {
      const w = Array.from(r.word);
      is(w.length <= 5 && two && F.letters, `${loc} ${r.id}: letter boxes only for a short word in Two parts`);
      for (let seed = 0; seed < 200; seed++) {
        const rnd = C.seeded(loc + r.key + seed), dl = C.deal([r], [0], rnd)[0];
        is(dl.letters.length === w.length + 2 && dl.letters.slice(0, w.length).join('') !== r.word && w.every(ch => dl.letters.filter(x => x === ch).length >= w.filter(x => x === ch).length) && dl.letters.filter(x => !w.includes(x)).length === 2 && dl.letters.every(x => TX[loc].letters.includes(x) || w.includes(x)), `${loc} ${r.id} seed ${seed}: tiles = the word's letters + two others, never in order (${dl.letters.join('')})`);
        const st = C.newState(r, dl);
        w.forEach(ch => C.putLetter(st, st.tiles.findIndex((t, i) => t === ch && st.spelled.indexOf(i) < 0)));
        is(C.spelled(st) === r.word && C.check(st).ok, `${loc} ${r.id} seed ${seed}: the right spelling sticks`);
        const st2 = C.newState(r, dl); for (let b = 0; b < w.length; b++) C.putLetter(st2, st2.tiles.findIndex((t, i) => st2.spelled.indexOf(i) < 0 && !(t === w[b])));
        if (C.spelled(st2) !== r.word) is(!C.check(st2).ok, `${loc} ${r.id} seed ${seed}: a wrong spelling dangles (${C.spelled(st2)})`);
        if (seed > 20) break;
      }
    }
  }
}

/* 3 — True or false? */
for (const loc of LOCS) for (const two of [false, true]) {
  const R = C.rounds(loc, 'tf', two), truths = R.map(r => sticks(pinsOf(TX[loc].tf[r.key][two ? 1 : 0]), D.SCENES[D.TF.find(x => x.id === r.key).scene].f));
  is(truths.filter(Boolean).length === 4 && R.length === 8, `${loc} tf ${two ? 2 : 1}: four true, four false (${truths.map(x => x ? 'T' : 'F').join('')})`);
  R.forEach((r, i) => {
    is(r.truth === truths[i], `${loc} ${r.id}: core truth ${r.truth}, gate ${truths[i]}`);
    for (const v of [true, false]) { const st = C.newState(r, {}); C.chooseTF(st, v); is(!!C.check(st).ok === (v === truths[i]), `${loc} ${r.id}: choosing ${v} → ${v === truths[i] ? 'right' : 'miss'}`); }
    if (two && !truths[i]) is(pinsOf(TX[loc].tf[r.key][1]).filter(t => !Object.prototype.hasOwnProperty.call(D.SCENES[D.TF.find(x => x.id === r.key).scene].f, t)).length >= 1, `${loc} ${r.id}: a false sentence has a pin that dangles`);
  });
}

/* 4 — Read and color: the gate's own table of what each instruction asks */
const ASK = {
  rc1: [['count', 'balloon', 'red', 3]], rc2: [['count', 'pear', 'green', 2]], rc3: [['nth', 'fish', 'blue', 2]], rc4: [['between', 'fish', 'yellow', 'crab']],
  rc5: [['all', 'truck', 'orange']], rc6: [['firstlast', 'duck', 'yellow']], rc7: [['count', 'dog', 'brown', 1]], rc8: [['count', 'star', 'yellow', 4]],
  rc9: [['count', 'apple', 'red', 2], ['count', 'pear', 'green', 1]], rc10: [['first', 'car', 'blue'], ['last', 'truck', 'red']],
  rc11: [['count', 'fish', 'orange', 3], ['all', 'crab', 'red']], rc12: [['nth', 'balloon', 'green', 2], ['count', 'kite', 'yellow', 2]],
  rc13: [['count', 'cat', 'orange', 1], ['count', 'dog', 'brown', 2]], rc14: [['betweenFirstTwo', 'duck', 'yellow', 'hen'], ['last', 'hen', 'red']],
  rc15: [['count', 'star', 'yellow', 4], ['count', 'moon', 'blue', 1]]
};
/* the tiles a positional part names, read off the row by the gate */
const named = (tiles, a) => {
  const of = (n) => tiles.map((x, i) => x === n ? i : -1).filter(i => i >= 0);
  if (a[0] === 'nth') return [of(a[1])[a[3] - 1]];
  if (a[0] === 'first') return [of(a[1])[0]];
  if (a[0] === 'last') return [of(a[1]).slice(-1)[0]];
  if (a[0] === 'firstlast') return [of(a[1])[0], of(a[1]).slice(-1)[0]];
  if (a[0] === 'between') return of(a[1]).filter(i => tiles[i - 1] === a[3] && tiles[i + 1] === a[3]);
  if (a[0] === 'betweenFirstTwo') { const o = of(a[3]); return of(a[1]).filter(i => i > o[0] && i < o[1]); }
  return null;
};
const gateOk = (tiles, asks, paint) => {
  for (const a of asks) {
    const at = named(tiles, a);
    if (at) { if (at.length < 1 || at.some(i => paint[i] !== a[2])) return false; }
    else { const hits = tiles.filter((x, i) => x === a[1] && paint[i] === a[2]).length, want = a[0] === 'all' ? tiles.filter(x => x === a[1]).length : a[3]; if (hits !== want) return false; }
  }
  for (const k of Object.keys(paint)) {
    const i = +k, ok = asks.some(a => a[1] === tiles[i] && a[2] === paint[i] && (!named(tiles, a) || named(tiles, a).includes(i)));
    if (!ok) return false;
  }
  return true;
};
is(Object.keys(ASK).join() === D.COLOR.map(r => r.id).join(), 'the gate asks about every color round');
for (const two of [false, true]) {
  const R = C.rounds('en', 'color', two);
  is(R.length >= 7, `color ${two ? 2 : 1}: ≥7 rounds (${R.length})`);
  for (const r of R) {
    const asks = ASK[r.key];
    is(asks.length === r.parts.length && asks.length === (two ? 2 : 1), `${r.key}: ${two ? 2 : 1} part(s)`);
    for (const a of asks) { const at = named(r.tiles, a); if (at) is(at.length === (a[0] === 'firstlast' ? 2 : 1) && at.every(i => i !== undefined), `${r.key}: the place «${a[0]} ${a[1]}» names one tile each`); }
    for (const n of new Set(r.tiles)) is(picOk(D.NOUN_PIC[n]), `${r.key}: ${n} is pictured (${D.NOUN_PIC[n]})`);
    is(gateOk(r.tiles, asks, C.rightTiles(r)) && C.colorFault(r, C.rightTiles(r)) === null, `${r.key}: the right painting passes in gate and core`);
    const rnd = C.seeded('paint' + r.key); let agree = 0, ok = 0;
    for (let t = 0; t < 4000; t++) {
      const paint = {}, base = t % 3 === 0 ? C.rightTiles(r) : {};
      Object.assign(paint, base);
      const flips = 1 + Math.floor(rnd() * 3);
      for (let f = 0; f < flips; f++) { const i = Math.floor(rnd() * r.tiles.length), c = rnd() < .15 ? null : C.COLORS[Math.floor(rnd() * 6)]; if (c) paint[i] = c; else delete paint[i]; }
      if (!Object.keys(paint).length) continue;
      const g = gateOk(r.tiles, asks, paint), core = C.colorFault(r, paint) === null;
      if (g === core) agree++; else if (FAIL < 60) is(false, `${r.key}: painting ${JSON.stringify(paint)} — gate ${g}, core ${core}`);
      if (g) ok++;
    }
    is(agree > 0, `${r.key}: gate and core agree on random paintings (${agree})`);
    for (const loc of LOCS) {
      const s = TX[loc].col[r.key], tg = pinsOf(s);
      r.parts.forEach((P, k) => {
        const p = k + 1;
        is(tg.includes('o' + p) && tg.includes('c' + p) && (P.kind === 'at' ? tg.includes('p' + p) : P.kind === 'all' || tg.includes('n' + p)), `${loc} ${r.key} part ${p}: names the thing, the color and the ${P.kind === 'at' ? 'place' : 'number'}`);
        if (P.kind === 'count') is(new RegExp('\\[' + P.n + ':n' + p + '\\]').test(s), `${loc} ${r.key} part ${p}: shows the number ${P.n} as a numeral`);
      });
      is(TX[loc].colors && C.COLORS.every(c => TX[loc].colors[c]), `${loc}: every color has a name`);
    }
  }
}

/* 5 — the deals and the order */
for (const task of C.TASKS) for (const two of [false, true]) {
  const R = C.rounds('en', task, two), n = R.length;
  for (let seed = 0; seed < (task === 'fill' ? 3000 : 1500); seed++) {
    const rnd = C.seeded(task + two + seed), o = C.order(R, rnd, null), o2 = C.order(R, rnd, o);
    is(new Set(o).size === n && o.length === n && o2.join() !== o.join() && o[n - 1] !== o2[0], `${task} ${two} seed ${seed}: a permutation; the next pass never repeats it and never starts with the round just played`);
    if (task === 'tf') is(o.every((k, i) => i < 2 || !(R[k].truth === R[o[i - 1]].truth && R[k].truth === R[o[i - 2]].truth)), `tf seed ${seed}: never three answers the same running`);
    if (task === 'fill') {
      const Dl = C.deal(R, o, rnd), slot = o.map(k => Dl[k].bank.indexOf(0)), c = [0, 0, 0]; slot.forEach(x => c[x]++);
      is(o.every(k => Dl[k].bank.slice().sort().join() === '0,1,2'), `fill seed ${seed}: the bank holds each word once`);
      is(Math.max(...c) <= 3 && Math.min(...c) >= 2, `fill seed ${seed}: the right word's place is 3/3/2 (${c})`);
      is(slot.every((x, i) => i < 2 || !(x === slot[i - 1] && x === slot[i - 2])), `fill seed ${seed}: never in the same place three running`);
    }
  }
}

/* 6 — hints */
{
  const w = C.rounds('en', 'which', true)[0], st = C.newState(w, {});
  is(C.hint(st) === null && C.helpOf(st) === null, 'no hint at rest');
  is(!C.check(st).ok && C.hint(st) === 'emptyWhich' && st.misses === 0, 'an empty check names the empty task, no miss');
  w.strips.forEach((s, k) => C.dock(st, k, (s.target + 1) % 4)); C.check(st);
  is(st.misses === 1 && C.hint(st) === 'hintWhich' && C.helpOf(st) === null, 'which miss 1 → hintWhich, no help');
  C.dock(st, 0, (w.strips[0].target + 2) % 4); C.check(st);
  const h = C.helpOf(st); is(st.misses === 2 && C.hint(st) === 'hintWhich2' && h && h.panel === w.strips[h.strip].target, 'which miss 2 → hintWhich2 and points at the right panel');
  w.strips.forEach((s, k) => C.dock(st, k, s.target)); is(C.check(st).ok && st.done && C.hint(st) === null, 'which right → done');
  for (const two of [false, true]) {
    const f = C.rounds('en', 'fill', two).find(r => r.letters === two) || C.rounds('en', 'fill', two)[0], sf = C.newState(f, { bank: [0, 1, 2], letters: f.letters ? Array.from(f.word).concat(['x', 'q']) : undefined });
    const miss = () => { if (f.letters) { sf.spelled = sf.spelled.map(() => null); [1, 0].concat(Array.from(f.word).map((_, i) => i + 2)).slice(0, f.word.length).forEach(i => C.putLetter(sf, i)); } else C.choose(sf, 1); C.check(sf); };
    miss(); is(sf.misses === 1 && C.hint(sf) === 'hintFill', `fill ${two}: miss 1 → hintFill`);
    miss(); is(sf.misses === 2 && C.hint(sf) === (f.letters ? 'hintSpell2' : 'hintFill2') && (f.letters ? C.helpOf(sf).word === f.word : C.helpOf(sf).glow === 0), `fill ${two}: miss 2 → ${f.letters ? 'spell the word shown' : 'the right word glows'}`);
  }
  const t = C.rounds('en', 'tf', false)[0], s3 = C.newState(t, {}); C.chooseTF(s3, !t.truth); C.check(s3);
  is(C.hint(s3) === 'hintTF' && C.helpOf(s3) === null, 'tf miss 1 → hintTF'); C.check(s3); is(C.hint(s3) === 'hintTF2' && C.helpOf(s3).pins, 'tf miss 2 → the pins fire');
  const cr = C.rounds('en', 'color', false), rc1 = cr.find(r => r.key === 'rc1'), s4 = C.newState(rc1, {});
  C.pickPot(s4, 'red'); C.paint(s4, 0); C.check(s4); is(C.hint(s4) === 'hintCount' && C.hintArgs(s4).noun === 'balloons' && C.hintArgs(s4).color === 'red', 'color: too few → hintCount naming the balloons and red');
  C.paint(s4, 1); C.check(s4); is(C.hint(s4) === 'hintColor2' && C.helpOf(s4).rings, 'color miss 2 → the right tiles ringed');
  { const s9 = C.newState(rc1, {}); C.pickPot(s9, 'red'); C.paint(s9, 5); C.paint(s9, 7); C.check(s9); C.check(s9); const g = C.helpOf(s9).rings, ks = Object.keys(g).map(Number).sort((x, y) => x - y); is(ks.length === 3 && g[5] === 'red' && g[7] === 'red' && ks.every(i => rc1.tiles[i] === 'balloon'), 'color miss 2: the rings keep the two balloons the child painted right and add one (' + ks + ')'); }
  const rc3 = cr.find(r => r.key === 'rc3'), s5 = C.newState(rc3, {}); C.pickPot(s5, 'blue'); C.paint(s5, 3); C.check(s5); is(C.hint(s5) === 'hintPlace', 'color: the wrong fish → hintPlace');
  const s6 = C.newState(rc1, {}); C.pickPot(s6, 'green'); [0, 2, 3].forEach(i => C.paint(s6, i)); C.check(s6); is(C.hint(s6) === 'hintColor', 'color: the right balloons in the wrong color → hintColor');
  const rc5 = cr.find(r => r.key === 'rc5'), s7 = C.newState(rc5, {}); C.pickPot(s7, 'orange'); C.paint(s7, 1); C.check(s7); is(C.hint(s7) === 'hintNoun', 'color: not all the trucks → hintNoun');
  const s8 = C.newState(rc1, {}); C.pickPot(s8, 'red'); [0, 2, 3, 1].forEach(i => C.paint(s8, i)); C.check(s8); is(C.hint(s8) === 'hintNoun', 'color: three balloons and a kite painted → hintNoun');
}

/* 7 — texts, strings, pictures, floors, manifest */
for (const loc of LOCS) {
  const T = TX[loc];
  is(STORIES.every(s => T.which[s] && T.which[s].length === 2), `${loc}: two sentences per story`);
  is(D.FILL.every(f => T.fill[f.id]) && D.TF.every(f => T.tf[f.id] && T.tf[f.id].length === 2) && D.COLOR.every(r => T.col[r.id]), `${loc}: every fill, tf and color text`);
  const all = JSON.stringify(T);
  is(!/(^|[^\d])0([^\d]|$)/.test(all.replace(/"letters":"[^"]*"/, '')), `${loc}: no 0 in the texts`);
  if (loc === 'fr') is(!/ [?!:;»]|« /.test(all), 'fr: non-breaking spaces before ? ! : ; and inside « »');
}
for (const [k, v] of Object.entries(A.strings)) for (const loc of LOCS) is(typeof v[loc] === 'string' && v[loc].trim(), `string ${k}: ${loc}`);
is(picOk(C.OTTO), 'Otto is a library picture');
for (const s of Object.values(D.SCENES)) for (const t of s.t) is(picOk(t[0]), `scene picture ${t[0]}`);
is(C.layout(704).unit === 96 && C.layout(704).tile === 96 && C.layout(360).unit === 64 && C.layout(360).tile === 64, 'the floors: 96 at 704, 64 on a phone');
{
  const row = JSON.parse(fs.readFileSync(path.join(MT, 'otto-picture-book-activities.json'), 'utf8'))[0];
  const h = crypto.createHash('sha1').update(JSON.stringify(['slug', 'page_title', 'page_intro'].map(k => ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'].map(l => row[k][l])))).digest('hex');
  is(h === FROZEN, `the frozen en..nl metadata is untouched (${h})`);
  is(row.tool === 'otto-picture-book-activity' && !row.params.rounds, 'the row runs the pins core, its params a mirror');
  for (const loc of LOCS) for (const t of C.TASKS) for (const two of [false, true]) is(row.params.byLocale[loc][t + (two ? 2 : 1)] === C.rounds(loc, t, two).length, `mirror ${loc} ${t}${two ? 2 : 1}`);
  for (const loc of ['sv', 'da', 'no', 'fi']) is(row.slug[loc] && /^[a-z0-9-]+$/.test(row.slug[loc]) && row.page_title[loc] && row.page_intro[loc], `${loc}: slug, title, intro`);
}
console.log(`verify-otto-pins-core: ${PASS} passed, ${FAIL} failed`);
process.exit(FAIL ? 1 : 0);
