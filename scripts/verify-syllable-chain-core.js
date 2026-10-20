#!/usr/bin/env node
/* =====================================================================
   verify-syllable-chain-core.js — the gate for ACTIVITY #49, La catena
   delle sillabe (RF.K.2.B, it). It holds its OWN ground truth — every word
   with its split and picture, every chain typed out here — and checks the
   core against it and against approved-words-it.json + the picture labels:
     1. every word: split = oracle = approved-words-it.json; the picture
        exists and its it label is the word; never sofà (the library sofa
        is a "divano");
     2. chains: every step joins (last syllable of the previous word = first
        syllable of the answer); no chain revisits a picture; every basket
        holds three different cards, exactly ONE starts with the clasp
        syllable, the trick picture ends with it and does not start with
        it, no card is already on the chain; with the trick picture off no
        card ends with the syllable; trick pictures in 15 of 18 short steps
        and 26 of 27 long steps;
     3. hooking EVERY card at EVERY step: it closes iff its first syllable
        is the clasp's; a trick card is told apart; two wrong hooks = miss
        2, every card shows its first syllable; a right hook resets the
        help; only the last link unhooks, never the start link;
     4. the basket (2,000 deals): "take the left card" ≤ 0.36; "same first
        letter" ≤ 0.4; "a card that contains the syllable anywhere" never
        passes the level;
     5. Conta e forma: sockets 1…5 — right iff one per syllable, too few →
        the last holds the rest, too many → the extras stay empty; EVERY
        fill order of the tiles — right only in word order, the right
        sockets lock, the wrong tiles return, miss 2 places the next tile;
        three or more tiles never start in word order nor reversed; counts
        2×2 3×3 4×3 5×2;
     6. the hint ladder; 7. order, never-repeat; 8. strings (en + it, every
        key reached, no price word); 9. manifest (frozen fields).
   Usage: node scripts/verify-syllable-chain-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.SCN_CORE_DIR || MT, 'syllable-chain-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };
const seeded = (k) => { let s = k >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };

/* ---------- the oracle ---------- */
const ORACLE = {
  'palla': 'pal-la|toys/ball', 'lama': 'la-ma|farm animals/llama', 'scala': 'sca-la|tools/ladder', 'luna': 'lu-na|camping/moon', 'mano': 'ma-no|body parts/hand',
  'piuma': 'piu-ma|easter/feather', 'mora': 'mo-ra|fruits/blackberry', 'ape': 'a-pe|farm animals/bee', 'pera': 'pe-ra|At the Supermarket/pear', 'volpe': 'vol-pe|animals/fox',
  'rana': 'ra-na|camping/frog', 'regalo': 're-ga-lo|christmas/present', 'chiave': 'chia-ve|around the house/key', 'vestito': 've-sti-to|clothing/dress', 'nave': 'na-ve|vehicles/ship',
  'topo': 'to-po|forest creatures/mouse', 'letto': 'let-to|around the house/bed', 'tazza': 'taz-za|around the house/cup', 'naso': 'na-so|body parts/nose', 'nido': 'ni-do|spring/nest',
  'sole': 'so-le|beach/sun', 'vaso': 'va-so|around the house/vase', 'sedia': 'se-dia|around the house/chair', 'gufo': 'gu-fo|animals/owl', 'foca': 'fo-ca|ocean life/seal',
  'fico': 'fi-co|fruits/fig', 'fiore': 'fio-re|easter/flower', 'cane': 'ca-ne|animals/dog', 'mucca': 'muc-ca|farm animals/cow', 'corona': 'co-ro-na|accessories/crown',
  'lumaca': 'lu-ma-ca|spring/snail', 'carota': 'ca-ro-ta|vegetables/carrot', 'coniglio': 'co-ni-glio|animals/rabbit', 'tavolo': 'ta-vo-lo|around the house/table', 'torta': 'tor-ta|4th of July/cake',
  'tenda': 'ten-da|camping/tent', 'scopa': 'sco-pa|around the house/broom', 'pala': 'pa-la|around the house/shovel', 'arpa': 'ar-pa|music/harp', 'penna': 'pen-na|around the house/pen',
  'nuvola': 'nu-vo-la|spring/cloud', 'pecora': 'pe-co-ra|farm animals/sheep', 'rosa': 'ro-sa|flowers/rose', 'chitarra': 'chi-tar-ra|music/guitar', 'gallina': 'gal-li-na|farm animals/hen',
  'gatto': 'gat-to|animals/cat', 'bruco': 'bru-co|forest creatures/caterpillar', 'colomba': 'co-lom-ba|birds 2/dove', 'banana': 'ba-na-na|At the Supermarket/banana', 'erba': 'er-ba|spring/grass',
  'bottiglia': 'bot-ti-glia|kitchen tools/bottle', 'stella': 'stel-la|christmas/star', 'libro': 'li-bro|classroom/book', 'matita': 'ma-ti-ta|classroom/pencil', 'zebra': 'ze-bra|animals/zebra',
  'farfalla': 'far-fal-la|easter/butterfly', 'fragola': 'fra-go-la|fruits/strawberry', 'ombrello': 'om-brel-lo|accessories/umbrella', 'tartaruga': 'tar-ta-ru-ga|animals/turtle', 'girasole': 'gi-ra-so-le|flowers/sunflower',
  'bicicletta': 'bi-ci-clet-ta|vehicles/bicycle', 'arcobaleno': 'ar-co-ba-le-no|easter/rainbow', 'elicottero': 'e-li-cot-te-ro|vehicles/helicopter'
};
/* every chain as words, start first */
const CHAINS = {
  short: ['palla lama mano', 'ape pera rana', 'chiave vestito topo', 'luna naso sole', 'gufo foca cane', 'lumaca carota tavolo', 'scopa pala lama', 'penna nave vestito'],
  long: ['ape pecora rana nave', 'chitarra rana naso sole', 'gallina nave vestito topo', 'pera rana nave vestito', 'bruco corona naso sole', 'colomba banana naso sole', 'volpe pecora rana naso', 'stella lama matita tavolo', 'scopa pala lama mano']
};
const BUILD_WORDS = 'cane zebra farfalla fragola ombrello tartaruga girasole bicicletta arcobaleno elicottero';
const SPLIT = (k) => ORACLE[k].split('|')[0].split('-');
const FIRST = (k) => SPLIT(k)[0], LAST = (k) => SPLIT(k)[SPLIT(k).length - 1];
const AP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-it.json'), 'utf8')).entries;
const APPROVED = {}; AP.forEach(e => { APPROVED[e.word] = e; });
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };

/* 1. words */
const keys = Object.keys(C.WORDS);
is(keys.length === Object.keys(ORACLE).length && keys.every(k => ORACLE[k]) && Object.keys(ORACLE).every(k => C.WORDS[k]), `the core's words = the oracle (${keys.length})`);
keys.forEach(k => {
  const w = C.WORDS[k], [split, pic] = (ORACLE[k] || '|').split('|'), g = APPROVED[k], lab = PIC[w.pic] && PIC[w.pic].it && PIC[w.pic].it[0];
  is(w.syl.join('-') === split && w.pic === pic, `${k}: ${w.syl.join('-')} on ${w.pic} = oracle ${split} on ${pic}`);
  is(!!g && g.split.join('-') === split, `${k}: approved-words-it.json agrees (${g && g.split.join('-')})`);
  is(!!lab && lab.toLowerCase() === k, `${k}: picture ${w.pic} labelled "${lab}"`);
  is(exact(w.pic + '@2x.webp'), `${k}: picture exists`);
  is(k !== 'sofà' && !/\/sofa$/.test(w.pic), `${k}: never the sofa (a child says "divano")`);
});
is(C.LEVEL_KEYS.join() === 'short,long,build', 'three levels');
is(C.rounds('build').map(r => r.w.key).join(' ') === BUILD_WORDS, 'build: the level\'s words');

/* 2 + 3. chains */
let lureSteps = { short: 0, long: 0 }, allSteps = { short: 0, long: 0 };
for (const lv of ['short', 'long']) {
  const R = C.rounds(lv);
  is(R.length === CHAINS[lv].length && R.length >= 7, `${lv}: ${R.length} chains`);
  R.forEach((r, ri) => {
    const want = CHAINS[lv][ri].split(' ');
    is([r.start].concat(r.steps.map(s => s.answer)).join(' ') === want.join(' '), `${r.id}: the chain is ${want.join(' → ')}`);
    is(new Set(want).size === want.length, `${r.id}: no picture comes back in the same chain`);
    r.steps.forEach((s, k) => {
      allSteps[lv]++; if (s.lure) lureSteps[lv]++;
      is(s.syl === LAST(want[k]) && FIRST(want[k + 1]) === s.syl, `${r.id} step ${k + 1}: ${want[k]} ends with "${s.syl}", ${want[k + 1]} starts with it`);
      for (const lure of [true, false]) {
        const st = C.newState(r, 0, { lure, rnd: seeded(ri * 7 + k) });
        for (let q = 0; q < k; q++) C.hook(st, want[q + 1]);
        is(st.step === k && C.clasp(st) === s.syl, `${r.id} step ${k + 1}: the open clasp shows "${s.syl}"`);
        const b = st.basket.slice(), onChain = want.slice(0, k + 1);
        is(b.length === 3 && new Set(b).size === 3 && b.includes(s.answer), `${r.id} step ${k + 1} lure ${lure}: three different cards with the answer`);
        is(b.filter(c => FIRST(c) === s.syl).length === 1, `${r.id} step ${k + 1} lure ${lure}: exactly one card starts with "${s.syl}" (${b})`);
        is(!b.some(c => onChain.includes(c)), `${r.id} step ${k + 1}: no card is already on the chain (${b})`);
        const lures = b.filter(c => LAST(c) === s.syl && FIRST(c) !== s.syl);
        if (lure && s.lure) is(lures.length === 1 && lures[0] === s.lure && b.includes(s.lure), `${r.id} step ${k + 1}: the trick picture ${s.lure} ends with "${s.syl}"`);
        if (!lure) is(!lures.length, `${r.id} step ${k + 1}: trick picture off — no card ends with "${s.syl}" (${b})`);
        const ons = (x) => x.match(/^[^aeiouàèéìòù]*/)[0];
        if (ons(s.syl)) is(b.some(c => c !== s.answer && ons(FIRST(c)) === ons(s.syl)), `${r.id} step ${k + 1} lure ${lure}: a plain card starts with the same sound as "${s.syl}" (${b})`);
        /* review 2026-10-20: pen·na beside «pe», tor·ta beside «to» — a card whose spoken start IS the clasp syllable */
        is(!b.some(c => c !== s.answer && FIRST(c).slice(0, s.syl.length) === s.syl), `${r.id} step ${k + 1} lure ${lure}: no other card starts with "${s.syl}" when spoken (${b})`);
        /* review 2026-10-20: answers a child names otherwise */
        is(!['vespa', 'tastiera', 'remo', 'lago', 'toro', 'sofà'].includes(s.answer), `${r.id} step ${k + 1}: the answer ${s.answer} is never the wasp ("ape"), the keyboard ("pianola"), the oar, the lake, the calf-like bull or the sofa`);
        /* hook every card */
        for (const c of b) {
          const t = C.newState(r, 0, { lure, rnd: seeded(ri * 7 + k) }); for (let q = 0; q < k; q++) C.hook(t, want[q + 1]);
          const res = C.hook(t, c);
          if (FIRST(c) === s.syl) is(res.closes && t.chain.length === k + 2 && t.misses === 0 && (k + 1 === r.steps.length ? t.done : C.clasp(t) === LAST(c)), `${r.id} step ${k + 1}: ${c} closes the clasp`);
          else is(!res.closes && t.chain.length === k + 1 && t.misses === 1 && t.last.result === (LAST(c) === s.syl ? 'lure' : 'wrong') && t.last.first === FIRST(c) && res.cardFirst === FIRST(c) && res.clasp === s.syl, `${r.id} step ${k + 1}: ${c} will not close (${LAST(c) === s.syl ? 'the trick' : 'wrong'})`);
        }
      }
    });
    /* miss 2 shows every card's first syllable; a right hook resets; only the last link unhooks */
    const st = C.newState(r, 0, { rnd: seeded(ri) }), s0 = r.steps[0], wrong = st.basket.filter(c => c !== s0.answer);
    C.hook(st, wrong[0]); is(!C.tags(st), `${r.id}: miss 1 shows no tags`);
    C.hook(st, wrong[1]); const tg = C.tags(st);
    is(st.help === 2 && tg && tg.length === 3 && tg.every(x => x.first === FIRST(x.word)), `${r.id}: miss 2 — every card shows its first syllable`);
    C.hook(st, s0.answer); is(st.misses === 0 && st.help === 0 && !C.tags(st), `${r.id}: a right hook takes the help away`);
    is(!C.unhookLast(C.newState(r, 0)), `${r.id}: the start link never unhooks`);
    C.unhookLast(st); is(st.chain.join() === r.start && st.step === 0 && st.basket.includes(s0.answer), `${r.id}: unhook takes the LAST link off and its step comes back`);
    const st2 = C.newState(r, 0, { rnd: seeded(ri + 50) }); C.hook(st2, r.steps[0].answer); C.hook(st2, r.steps[1].answer); C.unhookLast(st2);
    if (r.steps.length >= 3) is(st2.chain.join() === [r.start, r.steps[0].answer].join() && st2.step === 1, `${r.id}: with two links hooked, unhook takes off the second, never the first`);
    for (let q = 0; q < r.steps.length; q++) C.hook(st, r.steps[q].answer);
    is(st.done && st.chain.length === r.steps.length + 1 && !C.unhookLast(st), `${r.id}: the whole chain closes; a closed chain stays`);
  });
}
is(lureSteps.short === 15 && allSteps.short === 16, `short: a trick picture in 15 of 16 steps (${lureSteps.short}/${allSteps.short})`);
is(lureSteps.long === 27 && allSteps.long === 27, `long: a trick picture in all 27 steps (${lureSteps.long}/${allSteps.long})`);

/* 4. the basket bots */
for (const lv of ['short', 'long']) {
  let N = 0, left = 0, letter = 0, anyLevel = 0, deals = 0;
  const rnd = seeded(lv === 'short' ? 21 : 23);
  for (let t = 0; t < 200; t++) for (const r of C.rounds(lv)) {
    deals++;
    const st = C.newState(r, 0, { rnd }); let all = true;
    for (const s of r.steps) {
      N++;
      if (st.basket[0] === s.answer) left++;
      const sameLetter = st.basket.filter(c => c[0] === s.syl[0]);
      if (sameLetter.length === 1 && sameLetter[0] === s.answer) letter++;
      const contains = st.basket.filter(c => SPLIT(c).includes(s.syl));
      if (!(contains.length === 1 && contains[0] === s.answer)) all = false;
      C.hook(st, s.answer);
    }
    if (all) anyLevel++;
  }
  is(left / N <= 0.36, `${lv}: "take the left card" ${(left / N).toFixed(3)} ≤ 0.36`);
  is(letter / N <= 0.4, `${lv}: "same first letter" (when it picks one card) ${(letter / N).toFixed(3)} ≤ 0.4`);
  is(anyLevel / deals <= 0.25, `${lv}: "a card with the syllable anywhere" solves ${(anyLevel / deals).toFixed(3)} of whole chains (≤ 0.25)`);
  console.log(`  ${lv}: left ${(left / N).toFixed(3)}, same letter ${(letter / N).toFixed(3)}, syllable-anywhere whole chains ${(anyLevel / deals).toFixed(3)}`);
}

/* 5. Conta e forma */
const perms = (n) => { const out = []; const go = (cur, left) => { if (!left.length) { out.push(cur); return; } left.forEach((x, i) => go(cur.concat(x), left.slice(0, i).concat(left.slice(i + 1)))); }; go([], [...Array(n).keys()]); return out; };
(() => {
  const count = {};
  for (const r of C.rounds('build')) {
    const syl = SPLIT(r.w.key), n = syl.length; count[n] = (count[n] || 0) + 1;
    const s0 = C.newState(r, 0); is(s0.phase === 'count' && s0.sockets === 1, `${r.id}: one socket to start`);
    is(!C.setSockets(s0, 0) && !C.setSockets(s0, 6), `${r.id}: sockets stay 1…5`);
    for (let k = 1; k <= 5; k++) {
      const st = C.newState(r, 0); C.setSockets(st, k); const res = C.countCheck(st);
      if (k === n) { is(res.right && st.phase === 'build' && st.tiles.length === n && st.filled.length === n && st.misses === 0, `${r.id} ${k} sockets: right, the tiles come`); continue; }
      const want = []; for (let i = 0; i < k; i++) want.push(i < n ? [syl[i]] : []); if (k < n) want[k - 1] = syl.slice(k - 1);
      is(!res.right && st.phase === 'count' && st.misses === 1 && st.last.result === (k < n ? 'short' : 'long') && JSON.stringify(st.last.printed) === JSON.stringify(want), `${r.id} ${k} sockets: ${k < n ? 'the last holds ' + want[k - 1].join('·') : (k - n) + ' empty'}`);
    }
    /* every fill order */
    let checked = 0;
    for (const p of perms(n)) {
      const st = C.newState(r, 0, { rnd: seeded(5) }); C.setSockets(st, n); C.countCheck(st);
      p.forEach((s, at) => C.fill(st, 't' + s, at));
      const res = C.buildCheck(st), right = p.every((s, i) => s === i);
      checked++;
      if (right) { is(res.right && st.done, `${r.id} ${p.join('')}: right`); continue; }
      const ok = p.map((s, i) => s === i ? i : -1).filter(i => i >= 0);
      is(!res.right && !st.done && st.misses === 1 && JSON.stringify(st.locked.slice().sort()) === JSON.stringify(ok) && st.filled.every((id, i) => ok.includes(i) ? id === 't' + i : id === null), `${r.id} ${p.join('')}: ${ok.length} lock, the rest return`);
    }
    is(checked === perms(n).length, `${r.id}: ${checked} fill orders checked`);
    /* miss 2 places the next tile itself */
    const st = C.newState(r, 0, { rnd: seeded(9) }); C.setSockets(st, n); C.countCheck(st);
    const wrongFill = (s) => { s.filled.forEach((x, i) => { if (x === null) { const t = s.tiles.find(tt => !s.filled.includes(tt.id) && tt.s !== i); if (t) C.fill(s, t.id, i); } }); };
    C.fill(st, 't' + (n - 1), 0); C.buildCheck(st); C.fill(st, 't' + (n - 1), 0); const r2 = C.buildCheck(st);
    is(st.help === 2 && st.filled[0] === 't0' && st.locked.includes(0) && st.last.auto === 0 && !r2.right, `${r.id}: miss 2 — the next tile flies in by itself`);
    void wrongFill;
    is(!C.unfill(st, 0), `${r.id}: a locked socket keeps its tile`);
  }
  is(JSON.stringify(count) === '{"2":2,"3":3,"4":3,"5":2}', `counts 2×2 3×3 4×3 5×2 (${JSON.stringify(count)})`);
  let bad = 0, two = 0, twoIn = 0, ltr = 0, N = 0;
  const rnd = seeded(31);
  for (let t = 0; t < 400; t++) for (const r of C.rounds('build')) {
    const n = r.w.syl.length, o = C.tileOrder(n, rnd), io = o.every((s, i) => s === i), rv = o.every((s, i) => s === n - 1 - i);
    N++; if (n >= 3 && (io || rv)) bad++; if (n === 2) { two++; if (io) twoIn++; } if (io) ltr++;
  }
  is(bad === 0, `three or more tiles never start in word order nor reversed (${bad})`);
  is(two && twoIn / two >= 0.35 && twoIn / two <= 0.65, `two tiles in word order at chance (${(twoIn / two).toFixed(3)})`);
  is(ltr / N <= 0.2, `"place the tiles in basket order" solves ${(ltr / N).toFixed(3)} ≤ 0.2`);
})();

/* 6. hints */
(() => {
  const R = C.rounds('short')[0], B = C.rounds('build')[8];
  const H = (r, fn) => { const st = C.newState(r, 0, { rnd: seeded(4) }); fn(st); return C.hint(st); };
  is(H(R, (st) => C.ask(st)) === 'hintFind', 'chain, nothing hooked: hintFind');
  is(H(R, (st) => C.hook(st, 'scala')) === 'hintLure', 'chain, the trick picture: hintLure');
  is(H(R, (st) => C.hook(st, 'luna')) === 'hintWrong', 'chain, a wrong picture: hintWrong');
  is(H(R, (st) => { C.hook(st, 'luna'); C.hook(st, 'scala'); }) === 'hintSlow', 'chain miss 2: hintSlow');
  is(H(R, (st) => { C.hook(st, 'luna'); C.ask(st); }) === 'hintFind', 'chain, asking after a miss: hintFind');
  is(H(B, (st) => { C.setSockets(st, 3); C.countCheck(st); }) === 'hintShort', 'count short: hintShort');
  is(H(C.rounds('build')[0], (st) => { C.setSockets(st, 3); C.countCheck(st); }) === 'hintLong', 'count long: hintLong');
  is(H(C.rounds('build')[0], (st) => { C.setSockets(st, 4); C.countCheck(st); }) === 'hintLong2', 'count two too many: hintLong2');
  is(H(B, (st) => { C.setSockets(st, 3); C.countCheck(st); C.setSockets(st, 4); C.countCheck(st); }) === 'hintClap', 'count miss 2: hintClap');
  is(H(B, (st) => { C.setSockets(st, 3); C.countCheck(st); C.setSockets(st, 4); }) === null, 'a move takes the help away');
  is(H(B, (st) => { C.setSockets(st, 5); C.countCheck(st); C.buildCheck(st); }) === 'hintFill', 'build, nothing placed: hintFill');
  is(H(B, (st) => { C.setSockets(st, 5); C.countCheck(st); C.fill(st, 't0'); C.buildCheck(st); }) === 'hintMore', 'build, a right beginning: hintMore');
  is(H(B, (st) => { C.setSockets(st, 5); C.countCheck(st); C.fill(st, 't1', 0); C.buildCheck(st); }) === 'hintGlow', 'build miss 1: hintGlow');
  is(H(B, (st) => { C.setSockets(st, 5); C.countCheck(st); C.fill(st, 't1', 0); C.buildCheck(st); C.fill(st, 't1', 0); C.buildCheck(st); }) === 'hintAuto', 'build miss 2: hintAuto');
})();

/* 7. order */
for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let same = 0, bad = 0; for (let k = 1; k <= 50; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; if (a.slice().sort((x, y) => x - y).join() !== R.map((_, i) => i).join()) bad++; } is(!same && !bad && R.length >= 7, `${lv}: ${R.length} rounds, orders are permutations and never repeat the previous one`); }

/* 8. strings */
const A = (() => { const ctx = { window: {}, SyllableChainCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'syllable-chain-activity.js'), 'utf8') + '\n;this.__A = SyllableChainActivity;', ctx); return ctx.__A; })();
const coreSrc = fs.readFileSync(path.join(process.env.SCN_CORE_DIR || MT, 'syllable-chain-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'syllable-chain-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) {
  is(!!A.strings[k].en && !!A.strings[k].it, `strings ${k}: en + it`);
  is(!/\bfree\b|gratis|gratuit/i.test(A.strings[k].en + A.strings[k].it), `strings ${k}: no price word`);
  is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`);
}

/* 9. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'syllable-chain-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.forma-la-parola-con-le-sillabe.rf-k-2-b' && rows[0].tool === 'syllable-chain-activity', 'manifest: the kept id, the new tool');
for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show 1113b2b7:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-syllable-chain-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
