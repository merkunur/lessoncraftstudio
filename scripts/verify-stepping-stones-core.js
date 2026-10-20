#!/usr/bin/env node
/* =====================================================================
   verify-stepping-stones-core.js — the gate for ACTIVITY #48, Stenarna i
   bäcken (RF.K.2.B, sv). It holds its OWN ground truth — every word with
   its split and picture, the three levels and the hidden-word table typed
   out here — and checks the core against it and against
   approved-words-sv.json + the picture labels:
     1. every word: split = oracle; the level words (and every compound)
        = approved-words-sv.json, including the förskoleklass sound-out
        splits klock·a, äng·el, äpp·le; every picture exists and its sv
        label is the word; never a library bear (all teddies → "nalle"),
        never toys/girl (flicka), weather/sun, the paintbrush as borste,
        the water bottle as vatten, the orange animals/fish as fisk;
     2. count: k = 0…6 laid stones — right iff one per syllable; too few →
        the last carries the rest; too many → the extras stay blank; never
        more than six; counts 1×2 2×3 3×3 4×2; the spacing depends only on
        the number of stones;
     3. build: EVERY row of distinct stones up to n + 1 long, with and
        without the trick stone — the frog keeps exactly the longest right
        beginning, the stones from the first wrong one float back to the
        pile, right only for the word, a right-but-short row asks (no
        miss); miss 2 glows ONLY the next stone; the trick stone is not a
        syllable of the word, is one of another pool word, and never makes
        a Swedish word with the word's stones;
     4. the pile (2,000 deals): three or more stones never in word order
        nor reversed; two at chance;
     5. hidden: EVERY subset of lifted stones — made = the kept syllables;
        right iff made = the target; the far bank shows a picture / a
        written word / no word exactly as the table says, and NO subset
        makes another Swedish word; the lifted stones splash back after a
        miss; miss 2 glows the stones to keep; "lift the first stone" and
        "lift one stone" never pass the level;
     6. the hint ladder; 7. order, never-repeat; 8. strings (en + sv, every
        key reached, no price word); 9. manifest (frozen fields).
   Usage: node scripts/verify-stepping-stones-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.SST_CORE_DIR || MT, 'stepping-stones-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };
const seeded = (k) => { let s = k >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };

/* ---------- the oracle ---------- */
const ORACLE = {
  katt: 'katt|animals/cat', 'äpple': 'äpp-le|fruits/apple', pannkaka: 'pann-ka-ka|breakfast/pancake', hund: 'hund|animals/dog', cykel: 'cy-kel|vehicles/bicycle',
  'fågelholk': 'få-gel-holk|spring/birdhouse', helikopter: 'he-li-kop-ter|vehicles/helicopter', sebra: 'se-bra|animals/zebra', 'sköldpadda': 'sköld-pad-da|animals/turtle', motorcykel: 'mo-tor-cy-kel|vehicles/motorcycle',
  klocka: 'klock-a|christmas/bell', 'ängel': 'äng-el|christmas/angel', skjorta: 'skjor-ta|clothing/shirt', banan: 'ba-nan|fruits/banana', panda: 'pan-da|animals/panda',
  tiger: 'ti-ger|animals/tiger', 'klänning': 'klän-ning|clothing/dress', blomma: 'blom-ma|spring/flower', choklad: 'cho-klad|easter/chocolate', paraply: 'pa-ra-ply|weather/umbrella',
  solros: 'sol-ros|flowers/sunflower', ros: 'ros|flowers/rose', sol: 'sol|beach/sun', 'sjöstjärna': 'sjö-stjär-na|beach/starfish', 'stjärna': 'stjär-na|christmas/star', 'sjö': 'sjö|camping/lake',
  husbil: 'hus-bil|camping/camper', hus: 'hus|miscellaneous/house', bil: 'bil|vehicles/car', tandborste: 'tand-bors-te|around the house/toothbrush', tand: 'tand|body parts/tooth', borste: 'bors-te|', te: 'te|',
  'flodhäst': 'flod-häst|animals/hippopotamus', 'häst': 'häst|animals/horse', flod: 'flod|camping/river', fladdermus: 'flad-der-mus|animals/bat', mus: 'mus|forest creatures/mouse', fladder: 'flad-der|',
  bokhylla: 'bok-hyl-la|furniture/bookcase', bok: 'bok|classroom/book', hylla: 'hyl-la|furniture/shelf', vattenmelon: 'vat-ten-me-lon|fruits/watermelon', melon: 'me-lon|At the Supermarket/melon', vatten: 'vat-ten|',
  'gräshoppa': 'gräs-hop-pa|forest creatures/grasshopper', 'gräs': 'gräs|spring/grass', hoppa: 'hop-pa|', hop: 'hop|', guldfisk: 'guld-fisk|pets/goldfish', fisk: 'fisk|At the Supermarket/fish', guld: 'guld|'
};
const LEVEL_WORDS = {
  count: 'katt äpple pannkaka hund cykel fågelholk helikopter sebra sköldpadda motorcykel',
  build: 'klocka ängel skjorta banan panda tiger klänning blomma choklad paraply',
  hidden: 'solros sjöstjärna husbil tandborste flodhäst fladdermus bokhylla vattenmelon gräshoppa guldfisk'
};
const DECOYS = { klocka: 'nan', 'ängel': 'da', skjorta: 'ger', banan: 'el', panda: 'ning', tiger: 'klad', 'klänning': 'tor', blomma: 'ply', choklad: 'ta', paraply: 'ti' };
/* compound → [target, the stones to lift, { made word: picture | '' (written only) }] */
const HIDDEN = {
  solros: ['ros', [0], { sol: 'beach/sun' }], 'sjöstjärna': ['stjärna', [0], { 'sjö': 'camping/lake' }], husbil: ['hus', [1], { bil: 'vehicles/car' }],
  tandborste: ['tand', [1, 2], { borste: '', te: '' }], 'flodhäst': ['häst', [0], { flod: 'camping/river' }], fladdermus: ['mus', [0, 1], { fladder: '' }],
  bokhylla: ['bok', [1, 2], { hylla: 'furniture/shelf' }], vattenmelon: ['melon', [0, 1], { vatten: '' }], 'gräshoppa': ['gräs', [1, 2], { hoppa: '', hop: '' }], guldfisk: ['fisk', [0], { guld: '' }]
};
const SPLIT = (k) => ORACLE[k].split('|')[0].split('-');
const AP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-sv.json'), 'utf8')).entries;
const APPROVED = {}; AP.forEach(e => { APPROVED[e.word] = e; });
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
/* every Swedish word the syllable list and the library know — a trick stone or a lift must never make one by accident */
const SV_WORDS = new Set(AP.map(e => e.word).concat(
  /* real Swedish words a stone combination could make, found in build and review (neither list carries them) */
  ['maning', 'fladder', 'te', 'hop', 'hoppa', 'guld', 'tvätt', 'vatten', 'borste', 'hylla', 'bil', 'sol', 'sjö', 'flod', 'gräs', 'ger', 'el', 'da', 'ta', 'ma', 'para']));
Object.values(PIC).forEach(l => { if (l.sv) { SV_WORDS.add(l.sv[0].toLowerCase()); SV_WORDS.add(l.sv[1].toLowerCase()); } });

/* 1. words */
const keys = Object.keys(C.WORDS);
is(keys.length === Object.keys(ORACLE).length && keys.every(k => ORACLE[k]) && Object.keys(ORACLE).every(k => C.WORDS[k]), `the core's words = the oracle (${keys.length})`);
keys.forEach(k => {
  const w = C.WORDS[k], [split, pic] = (ORACLE[k] || '|').split('|');
  is(w.syl.join('-') === split && (w.pic || '') === pic, `${k}: ${w.syl.join('-')} on ${w.pic} = oracle ${split} on ${pic || '(written)'}`);
  if (w.pic) {
    const lab = PIC[w.pic] && PIC[w.pic].sv && PIC[w.pic].sv[0];
    is(!!lab && lab.toLowerCase() === k, `${k}: picture ${w.pic} labelled "${lab}"`);
    is(exact(w.pic + '@2x.webp'), `${k}: picture exists`);
  }
  is(!/bear$|toys\/girl|weather\/sun|house\/brush|\/water$|^animals\/fish$/.test(w.pic || ''), `${k}: never a teddy bear, toys/girl, weather/sun, the paintbrush, a water bottle or the orange animals/fish (${w.pic})`);
  is(!['björn', 'tvättbjörn', 'flicka'].includes(k), `${k}: never björn / tvättbjörn (every library bear is a teddy: "nalle") or flicka (the toys girl reads as a doll)`);
});
/* the stones a child sees carry gated splits: every level word and every compound */
for (const lv of C.LEVEL_KEYS) for (const r of C.rounds(lv)) { const g = APPROVED[r.w.key]; is(!!g && g.split.join('-') === r.w.syl.join('-'), `${r.id}: approved-words-sv.json agrees (${g && g.split.join('-')})`); }
for (const k of ['klocka', 'ängel', 'äpple']) is(C.WORDS[k].syl.join('·') === { klocka: 'klock·a', 'ängel': 'äng·el', 'äpple': 'äpp·le' }[k], `${k}: the förskoleklass sound-out split stays (§A.13.57)`);
for (const lv of Object.keys(LEVEL_WORDS)) is(C.rounds(lv).map(r => r.w.key).join(' ') === LEVEL_WORDS[lv], `${lv}: the level's words`);
is(C.LEVEL_KEYS.join() === 'count,build,hidden', 'three levels');

/* 2. count */
(() => {
  const count = {};
  for (const r of C.rounds('count')) {
    const syl = SPLIT(r.w.key), n = syl.length; count[n] = (count[n] || 0) + 1;
    for (let k = 0; k <= 7; k++) {
      const st = C.newState(r, 0); let laid = 0; for (let i = 0; i < k; i++) if (C.lay(st)) laid++;
      is(laid === Math.min(k, 6) && st.laid === laid, `${r.id}: ${k} taps lay ${Math.min(k, 6)} stones (never more than six)`);
      if (k > 6) continue;
      const res = C.hop(st);
      if (k === 0) { is(!res.right && st.misses === 0 && st.last.result === 'empty', `${r.id}: Hoppa! with no stone asks`); continue; }
      if (k === n) { is(res.right && st.done, `${r.id} ${k}: right`); continue; }
      const want = []; for (let i = 0; i < k; i++) want.push(i < n ? [syl[i]] : []); if (k < n) want[k - 1] = syl.slice(k - 1);
      is(!res.right && st.misses === 1 && st.last.result === (k < n ? 'short' : 'long') && JSON.stringify(st.last.printed) === JSON.stringify(want) && st.last.blank === Math.max(0, k - n) && st.laid === k,
        `${r.id} ${k}: ${k < n ? 'the last carries ' + want[k - 1].join('·') : (k - n) + ' blank'} (${JSON.stringify(st.last.printed)})`);
    }
    const su = C.newState(r, 0); C.lay(su); C.lay(su); C.unlay(su); is(su.laid === 1, `${r.id}: a stone taken back`);
  }
  is(JSON.stringify(count) === '{"1":2,"2":3,"3":3,"4":2}', `count 1×2 2×3 3×3 4×2 (${JSON.stringify(count)})`);
  for (let n = 1; n <= 6; n++) { const a = C.spread(n, 100, 500); is(a.length === n && a.every((x, i) => i === 0 || Math.abs((x - a[i - 1]) - 400 / n) < 1e-9) && Math.abs(a[0] - 100 - 200 / n) < 1e-9, `${n} stones spread evenly (the spacing depends only on n)`); }
  for (const W of [280, 296, 336, 648, 656]) { const L = C.layout(W), xs = C.spread(6, L.x0, L.x1), w = C.stoneW(L, 6); is(w >= 44 && xs[1] - xs[0] >= w + 2, `@${W}: six stones ≥ 44 px wide never touch (${w} in ${(xs[1] - xs[0]).toFixed(1)})`); }
})();

/* 3. build: every row */
const seqs = (ids, max) => { const out = [[]]; const go = (cur) => { if (cur.length >= max) return; for (const id of ids) if (!cur.includes(id)) { const nx = cur.concat(id); out.push(nx); go(nx); } }; go([]); return out; };
for (const r of C.rounds('build')) {
  const syl = SPLIT(r.w.key), n = syl.length;
  is(r.decoy === DECOYS[r.w.key], `${r.id}: the trick stone is "${DECOYS[r.w.key]}"`);
  for (const dec of [false, true]) {
    const base = C.newState(r, 0, { decoy: dec, rnd: seeded(7) });
    is(base.stones.length === n + (dec ? 1 : 0) && base.stones.filter(s => s.s === -1).length === (dec ? 1 : 0) && base.pile.length === base.stones.length && !base.row.length, `${r.id} trick ${dec}: ${n} stones${dec ? ' + the trick stone' : ''}, all in the pile`);
    is(base.stones.filter(s => s.s >= 0).sort((a, b) => a.s - b.s).map(s => s.text).join('-') === syl.join('-'), `${r.id}: the word's stones carry its syllables`);
    const ids = base.stones.map(s => s.id), S = (id) => base.stones.find(s => s.id === id).s;
    let checked = 0;
    for (const seq of seqs(ids, Math.min(n + 1, ids.length))) {
      const st = C.newState(r, 0, { decoy: dec, rnd: seeded(7) });
      seq.forEach(id => C.place(st, id));
      const res = C.hop(st);
      let pre = 0; while (pre < seq.length && S(seq[pre]) === pre) pre++;
      checked++;
      if (!seq.length) { is(!res.right && st.misses === 0 && st.last.result === 'empty', `${r.id}: Hoppa! with no stone asks`); continue; }
      if (seq.length === n && pre === n) { is(res.right && st.done, `${r.id} ${seq.map(S).join('')}: right`); continue; }
      is(!res.right && !st.done, `${r.id} ${seq.map(S).join('')}: not right`);
      if (pre === seq.length) { is(st.misses === 0 && st.last.result === 'more' && st.row.join() === seq.join(), `${r.id} ${seq.map(S).join('')}: a right beginning asks for more, no miss`); continue; }
      const back = seq.slice(pre);
      is(st.misses === 1 && st.row.join() === seq.slice(0, pre).join() && st.last.result === (S(back[0]) === -1 ? 'decoy' : 'order') && JSON.stringify(st.last.tipped) === JSON.stringify(back) && back.every(id => st.pile.includes(id)) && st.pile.length + st.row.length === ids.length,
        `${r.id} ${seq.map(S).join('')}: the frog keeps ${pre}, the rest float back (${st.last.result})`);
      const nb = base.stones.find(s => s.s === pre);
      is(st.last.next === (nb ? nb.id : null) && !C.glow(st).length, `${r.id} ${seq.map(S).join('')}: miss 1 glows nothing`);
    }
    is(checked > n, `${r.id} trick ${dec}: ${checked} rows checked`);
  }
  /* miss 2 glows only the next stone; a move takes it away */
  const st = C.newState(r, 0, { decoy: true, rnd: seeded(3) }), byS = (s) => st.stones.find(x => x.s === s).id;
  C.place(st, byS(1)); C.hop(st); C.place(st, byS(1)); C.hop(st);
  is(st.help === 2 && C.glow(st).join() === byS(0), `${r.id}: miss 2 glows the first syllable's stone only`);
  C.place(st, byS(0)); is(!C.glow(st).length, `${r.id}: a move takes the glow away`);
  if (n >= 3) { C.place(st, byS(n - 1)); C.hop(st); is(C.glow(st).join() === byS(1) && st.row.join() === byS(0), `${r.id}: after a kept beginning, the glow is on the NEXT stone only`); }
  /* place at a gap, move within the row, take back */
  const sp = C.newState(r, 0, { rnd: seeded(5) }), w = sp.stones.filter(s => s.s >= 0).sort((a, b) => a.s - b.s).map(s => s.id);
  C.place(sp, w[1]); C.place(sp, w[0], 0); is(sp.row.join() === [w[0], w[1]].join(), `${r.id}: a stone dropped at gap 0 lands first`);
  C.place(sp, w[0], 2); is(sp.row.join() === [w[1], w[0]].join(), `${r.id}: a stone moved within the row`);
  C.unplace(sp, w[0]); is(sp.row.join() === w[1] && sp.pile.includes(w[0]), `${r.id}: a stone taken back to the pile`);
  /* the trick stone */
  is(!syl.includes(r.decoy), `${r.id}: trick stone "${r.decoy}" is not a syllable of the word`);
  is(keys.some(k => k !== r.w.key && LEVEL_WORDS.build.split(' ').concat(LEVEL_WORDS.count.split(' ')).includes(k) && C.WORDS[k].syl.includes(r.decoy)), `${r.id}: trick stone "${r.decoy}" is a syllable of another pool word`);
  const parts = syl.concat([r.decoy]), made = new Set();
  const build = (cur, left) => { if (cur.length > 1 && cur.includes(r.decoy)) made.add(cur.join('')); left.forEach((x, i) => build(cur.concat(x), left.slice(0, i).concat(left.slice(i + 1)))); };
  build([], parts);
  const bad = [...made].filter(m => SV_WORDS.has(m) && m !== r.w.word);
  is(!bad.length, `${r.id}: no trick stone + stones makes a Swedish word (${bad.join(',')})`);
}

/* 4. the pile */
for (const dec of [false, true]) {
  let two = 0, twoIn = 0, first = 0, N = 0, bad = 0, ltr = 0;
  const rnd = seeded(dec ? 11 : 13);
  for (let t = 0; t < 200; t++) for (const r of C.rounds('build')) {
    const st = C.newState(r, 0, { decoy: dec, rnd }), n = r.w.syl.length, seq = st.pile.map(id => C.stone(st, id).s).filter(s => s >= 0);
    const io = (o) => o.every((s, i) => s === i), rv = (o) => o.every((s, i) => s === o.length - 1 - i);
    N++;
    if (n >= 3 && (io(seq) || rv(seq))) bad++;
    if (n === 2 && !dec) { two++; if (io(seq)) twoIn++; }
    if (C.stone(st, st.pile[0]).s === 0) first++;
    /* the "place the pile left to right" bot */
    st.pile.slice().forEach(id => C.place(st, id)); if (C.hop(st).right) ltr++;
  }
  const tag = `build, trick stone ${dec ? 'on' : 'off'}`;
  is(bad === 0, `${tag}: three or more stones never lie in the pile in word order nor reversed (${bad})`);
  if (two) is(twoIn / two >= 0.35 && twoIn / two <= 0.65, `${tag}: two syllables in word order at chance (${(twoIn / two).toFixed(3)})`);
  if (dec) is(ltr === 0, `${tag}: "place the pile left to right" never passes with the trick stone (${ltr})`);
  console.log(`  ${tag}: left-to-right solves ${(ltr / N).toFixed(3)}; first pile stone = first syllable ${(first / N).toFixed(3)}`);
}

/* 5. hidden: every subset */
(() => {
  let firstBot = 0, oneBot = 0;
  for (const r of C.rounds('hidden')) {
    const [tgt, lift, others] = HIDDEN[r.w.key], syl = SPLIT(r.w.key), n = syl.length;
    is(r.target.key === tgt && JSON.stringify(r.lift) === JSON.stringify(lift) && JSON.stringify(r.others.slice().sort()) === JSON.stringify(Object.keys(others).sort()), `${r.id}: the table — ${tgt}, lift ${lift}, others ${Object.keys(others)}`);
    is(syl.filter((_, i) => !lift.includes(i)).join('') === tgt && tgt !== r.w.key, `${r.id}: the kept stones spell ${tgt}`);
    is(r.target.pic && exact(r.target.pic + '@2x.webp'), `${r.id}: the target has a picture`);
    for (let mask = 0; mask < (1 << n); mask++) {
      const st = C.newState(r, 0), L = []; for (let i = 0; i < n; i++) if (mask & (1 << i)) { C.lift(st, i); L.push(i); }
      const made = syl.filter((_, i) => !L.includes(i)).join(''), res = C.hop(st);
      if (!mask) { is(!res.right && st.misses === 0 && st.last.result === 'empty', `${r.id}: nothing lifted asks`); continue; }
      if (made === tgt) { is(res.right && st.done, `${r.id} lift ${L}: right`); continue; }
      const kind = made in others ? (others[made] ? 'picture' : 'word') : 'none';
      is(!res.right && st.misses === 1 && st.last.made === made && st.last.what.kind === kind && (st.last.what.pic || '') === (kind === 'picture' ? others[made] : '') && st.last.result === (kind === 'none' ? 'noword' : 'made'),
        `${r.id} lift ${L}: made "${made}" → ${kind}${kind === 'picture' ? ' ' + others[made] : ''}`);
      is(!st.lifted.length && JSON.stringify(st.last.lifted) === JSON.stringify(L), `${r.id} lift ${L}: the lifted stones splash back`);
      is(kind !== 'none' || !SV_WORDS.has(made), `${r.id} lift ${L}: "${made}" shown as no word is not a Swedish word`);
    }
    /* miss 2 glows the stones to keep */
    const st = C.newState(r, 0); const wrong = lift.includes(0) ? n - 1 : 0;
    C.lift(st, wrong); C.hop(st); C.lift(st, wrong); C.hop(st);
    is(st.help === 2 && C.glow(st).join() === st.stones.filter((_, i) => !lift.includes(i)).map(s => s.id).join(), `${r.id}: miss 2 glows the stones to keep`);
    C.lift(st, lift[0]); is(!C.glow(st).length, `${r.id}: a move takes the glow away`);
    const su = C.newState(r, 0); C.lift(su, 0); C.unlift(su, 0); is(!su.lifted.length, `${r.id}: a lifted stone goes back`);
    const b1 = C.newState(r, 0); C.lift(b1, 0); if (C.hop(b1).right) firstBot++;
    if (lift.length === 1) oneBot++;
  }
  is(firstBot / 10 <= 0.6 && firstBot < 8, `"lift the first stone" solves ${firstBot}/10 (≤ 6, never the level)`);
  is(oneBot / 10 <= 0.6 && oneBot < 8, `"lift one stone" can solve at most ${oneBot}/10 (≤ 6, never the level)`);
})();

/* 6. hints */
(() => {
  const R = (lv, i) => C.rounds(lv)[i];
  const H = (lv, i, fn, o) => { const r = R(lv, i), st = C.newState(r, 0, Object.assign({ rnd: seeded(2) }, o)); fn(st, (s) => st.stones.find(x => x.s === s).id); return C.hint(st); };
  is(H('count', 0, (st) => C.hop(st)) === 'hintCount', 'count, nothing: hintCount');
  is(H('build', 0, (st) => C.hop(st)) === 'hintBuild', 'build, nothing: hintBuild');
  is(H('hidden', 0, (st) => C.hop(st)) === 'hintLift', 'hidden, nothing: hintLift');
  is(H('count', 6, (st) => { C.lay(st); C.hop(st); }) === 'hintShort', 'count short: hintShort');
  is(H('count', 0, (st) => { C.lay(st); C.lay(st); C.hop(st); }) === 'hintLong', 'count one too many: hintLong');
  is(H('count', 0, (st) => { C.lay(st); C.lay(st); C.lay(st); C.hop(st); }) === 'hintLong2', 'count two too many: hintLong2');
  is(H('count', 6, (st) => { C.lay(st); C.hop(st); C.lay(st); C.hop(st); }) === 'hintNod', 'count miss 2: hintNod');
  is(H('count', 6, (st) => { C.lay(st); C.hop(st); C.lay(st); C.hop(st); C.lay(st); }) === null, 'a move takes the help away');
  is(H('build', 9, (st, by) => { C.place(st, by(0)); C.hop(st); }) === 'hintMore', 'a right beginning: hintMore');
  is(H('build', 9, (st, by) => { C.place(st, by(0)); C.place(st, by(2)); C.hop(st); }) === 'hintHolds', 'kept a beginning: hintHolds');
  is(H('build', 0, (st, by) => { C.place(st, by(1)); C.hop(st); }) === 'hintFirst', 'nothing kept: hintFirst');
  is(H('build', 0, (st, by) => { C.place(st, by(-1)); C.hop(st); }, { decoy: true }) === 'hintDecoy', 'the trick stone: hintDecoy');
  is(H('build', 0, (st, by) => { C.place(st, by(1)); C.hop(st); C.place(st, by(1)); C.hop(st); }) === 'hintNext', 'build miss 2: hintNext');
  is(H('hidden', 0, (st) => { C.lift(st, 1); C.hop(st); }) === 'hintMade', 'hidden, another word: hintMade');
  is(H('hidden', 5, (st) => { C.lift(st, 1); C.hop(st); }) === 'hintNoWord', 'hidden, no word: hintNoWord');
  is(H('hidden', 0, (st) => { C.lift(st, 1); C.hop(st); C.lift(st, 1); C.hop(st); }) === 'hintKeep', 'hidden miss 2: hintKeep');
})();

/* 7. order */
for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let same = 0, bad = 0; for (let k = 1; k <= 50; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; if (a.slice().sort((x, y) => x - y).join() !== R.map((_, i) => i).join()) bad++; } is(!same && !bad && R.length >= 7, `${lv}: ${R.length} rounds, orders are permutations and never repeat the previous one`); }

/* 8. strings */
const A = (() => { const ctx = { window: {}, SteppingStonesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'stepping-stones-activity.js'), 'utf8') + '\n;this.__A = SteppingStonesActivity;', ctx); return ctx.__A; })();
const coreSrc = fs.readFileSync(path.join(process.env.SST_CORE_DIR || MT, 'stepping-stones-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'stepping-stones-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) {
  is(!!A.strings[k].en && !!A.strings[k].sv, `strings ${k}: en + sv`);
  is(!/\bfree\b|gratis/i.test(A.strings[k].en + A.strings[k].sv), `strings ${k}: no price word`);
  is(!/(?<!\p{L})grupp/iu.test(A.strings[k].sv), `strings ${k}: never «grupp» (the sv counting word)`);
  is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`);
}

/* five Gömda ord rounds lift TWO stones: the copy never asks for one stone (review 2026-10-20) */
for (const k of ['instruction', 'pHidden', 'hintLift', 'hintNoWord']) is(!/(?<!\p{L})(bort en sten|sten ska bort)(?!\p{L})|a stone out|which stone/iu.test(A.strings[k].sv + ' ' + A.strings[k].en), `strings ${k}: Gömda ord asks for a part, never one stone`);

/* 9. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'stepping-stones-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.bygg-ordet-av-stavelser.rf-k-2-b' && rows[0].tool === 'stepping-stones-activity', 'manifest: the kept id, the new tool');
for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show a45eec82:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-stepping-stones-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
