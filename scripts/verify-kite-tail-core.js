#!/usr/bin/env node
/* =====================================================================
   verify-kite-tail-core.js — the build gate for ACTIVITY #45, the Kite
   Tail (RF.K.2.B, en). Its OWN whitelist, typed here:
     1. the 34-word whitelist (the design's 35 less ball): each split = the core's = approved-words-en.json, with TeX
        among the agreeing sources; label = word; picture exists; never
        toys/kite (the apparatus) nor toys/ball (a soccer ball: three beats);
        the levels and their beat spreads;
     2. count: every 0–4 bows on every word — steady iff bows = beats; too
        few → the leftovers all on the LAST bow (spin); too many → exactly
        (bows − beats) blank (sag); untouched one bow on a longer word asks;
     3. tie: every placement of the box's bows on the knots — steady only in
        word order, the foreign bow always sent back, the tangle at the first
        wrong knot, a partial right tail asks;
     4. the box: two beats in reading order exactly half the time over two
        passes, three never in order nor reversed; the foreign bow's place
        moves; bots "tie left to right" ≤ 0.25 and "first box bow is the
        first beat" ≤ 0.35; no two on-screen bows spell another whitelist word;
     5. fix: missing knots first/middle/last, the answer's box slot rotates,
        a same-word bow is sent back; scramble starts never in order (three
        bows: a derangement); miss 2 flies the first wrong bow home;
     6. the fence: fit iff kite bows = beats for every card × kite;
     7. the tassels: one per typed grapheme (er/or one sound); bots;
     8. write: only the gated split rides; the split hints by kind;
     9. order, deterministic never-repeat; 10. strings; 11. the manifest.
   Usage: node scripts/verify-kite-tail-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.KT_CORE_DIR || MT, 'kite-tail-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };

/* ---------- the oracle ---------- */
const WHITE = 'fish rab-bit but-ter-fly drum pen-guin um-brel-la snow-man straw-ber-ry bus dol-phin muf-fin car-rot bal-loon pen-cil trac-tor rain-bow cup-cake air-plane gin-ger-bread drag-on-fly lad-der mit-ten bas-ket sail-boat ham-mer pop-corn bas-ket-ball frog train pan-da rac-coon piz-za mon-key ot-ter'.split(' ');
const SPLIT = {}; WHITE.forEach(s => { SPLIT[s.replace(/-/g, '')] = s; });
const LEVEL_WORDS = {
  count: 'fish rabbit butterfly drum penguin umbrella snowman strawberry bus dolphin',
  tie: 'muffin carrot balloon pencil tractor rainbow cupcake airplane gingerbread dragonfly',
  fix: 'ladder hammer mitten popcorn basket umbrella sailboat basketball strawberry butterfly',
  fence: 'bus frog train panda raccoon pizza butterfly dragonfly strawberry'
};
const SOUNDS = { drum: 'd r u m', panda: 'p a n|d a', tractor: 't r a c|t or', frog: 'f r o g', rainbow: 'r ai n|b ow', dragonfly: 'd r a g|o n|f l y', fish: 'f i sh', dolphin: 'd o l|ph i n', monkey: 'm o n|k ey' };
const KIND = { muffin: 'double', carrot: 'double', balloon: 'double', pencil: 'slow', tractor: 'slow', rainbow: 'compound', cupcake: 'compound', airplane: 'compound', gingerbread: 'compound', dragonfly: 'compound' };
const APPROVED = {}; JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-en.json'), 'utf8')).entries.forEach(e => { APPROVED[e.key] = e; });
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
const sylOf = (k) => SPLIT[k].split('-');

/* 1. words */
const keys = Object.keys(C.WORDS);
is(keys.length === WHITE.length && keys.every(k => SPLIT[k]), `the core's words = the ${WHITE.length}-word whitelist (${keys.length})`);
is(!C.WORDS.ball, 'ball is not used (toys/ball is a soccer ball: a child says three beats)');
is(!C.FENCE.concat(C.FENCE23).includes('basketball'), 'basketball is not a fence card (sorted by picture: an orange ball reads "ball")');
keys.forEach(k => {
  const w = C.WORDS[k], g = APPROVED[k], lab = PIC[w.pic] && PIC[w.pic].en && PIC[w.pic].en[0];
  is(w.syl.join('-') === SPLIT[k], `${k}: split ${w.syl.join('-')} = oracle ${SPLIT[k]}`);
  is(!!g && g.split.join('-') === SPLIT[k] && g.sources_agreed.includes('TeX'), `${k}: approved-words-en.json, TeX agrees (${g && g.split.join('-')}; ${g && g.sources_agreed.join(',')})`);
  is(!!lab && lab.toLowerCase() === k, `${k}: picture ${w.pic} labelled "${lab}"`);
  is(exact(w.pic + '@2x.webp'), `${k}: picture exists`);
  is(w.pic !== 'toys/kite' && w.pic !== 'toys/ball', `${k}: not the kite picture, not the soccer ball`);
});
for (const lv of Object.keys(LEVEL_WORDS)) is(C.rounds(lv).map(r => r.w.key).join(' ') === LEVEL_WORDS[lv], `${lv}: the level's words`);
(() => { const c = {}; C.rounds('count').forEach(r => { const n = r.w.syl.length; c[n] = (c[n] || 0) + 1; }); is(c[1] === 3 && c[2] === 4 && c[3] === 3, `count beats 1×3, 2×4, 3×3 (${JSON.stringify(c)})`); })();
(() => { const c = {}; C.rounds('fence').forEach(r => { const n = r.w.syl.length; c[n] = (c[n] || 0) + 1; }); is(c[1] === 3 && c[2] === 3 && c[3] === 3, 'fence 3 + 3 + 3'); const d = {}; C.rounds('fence', { kites: '23' }).forEach(r => { const n = r.w.syl.length; d[n] = (d[n] || 0) + 1; }); is(d[2] === 4 && d[3] === 4 && !d[1], 'fence "two or three": 4 + 4, no one-beat card'); })();

/* 2. count */
for (const r of C.rounds('count')) {
  const n = r.w.syl.length, syl = sylOf(r.w.key);
  for (let k = 0; k <= C.MAX_BOWS; k++) {
    const st = C.newState(r, 0);
    is(st.bows === 1, `${r.w.key}: the tail starts with one bow`);
    if (k > 1) for (let i = 1; i < k; i++) C.tie(st); else if (k === 0) C.untie(st);
    else { C.tie(st); C.untie(st); }
    const res = C.gust(st);
    if (k === 0) { is(res.flight === 'none' && st.misses === 0, `${r.w.key} 0 bows: asks`); continue; }
    if (k === n) { is(res.flight === 'steady', `${r.w.key} ${k} bows: steady`); continue; }
    const p = st.last.printed;
    if (k < n) is(res.flight === 'spin' && p[k - 1].join() === syl.slice(k - 1).join() && p.slice(0, k - 1).every((x, i) => x.join() === syl[i]), `${r.w.key} ${k} bows: spin, leftovers on the last bow (${JSON.stringify(p)})`);
    else is(res.flight === 'sag' && p.filter(x => !x.length).length === k - n, `${r.w.key} ${k} bows: sag, ${k - n} blank (${JSON.stringify(p)})`);
  }
  const fresh = C.newState(r, 0), g = C.gust(fresh);
  is(n === 1 ? g.flight === 'steady' : (g.flight === 'none' && fresh.misses === 0), `${r.w.key}: Check untouched — ${n === 1 ? 'one beat flies' : 'asks, no miss'}`);
}
is(C.tie(C.newState(C.rounds('count')[0], 0)) && (() => { const s = C.newState(C.rounds('count')[0], 0); for (let i = 0; i < 6; i++) C.tie(s); return s.bows === C.MAX_BOWS; })(), `at most ${C.MAX_BOWS} bows`);

/* 3. tie: every placement */
function perms(a) { if (a.length <= 1) return [a]; const out = []; a.forEach((x, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).forEach(p => out.push([x].concat(p)))); return out; }
let placements = 0, bad = 0;
for (const r of C.rounds('tie')) {
  const base = C.newState(r, 0), ids = base.bowsAll.map(b => b.id), n = r.w.syl.length;
  for (const p of perms(ids)) for (let len = 1; len <= n; len++) {
    const st = C.newState(r, 0), use = p.slice(0, len);
    use.forEach((id, i) => C.tieBow(st, id, i));
    const s = st.knots.map(x => x ? C.bow(st, x).s : null), res = C.gust(st); placements++;
    const want = s.includes(-1) ? 'tangle-foreign' : s.every((x, i) => x === i) ? 'steady' : s.some((x, i) => x !== null && x !== i) ? 'tangle' : 'none';
    const got = res.flight === 'tangle' ? (st.last.result === 'foreign' ? 'tangle-foreign' : 'tangle') : res.flight;
    if (got !== want) { bad++; if (bad < 4) console.error(`  ${r.w.key} ${JSON.stringify(s)} → ${got}, want ${want}`); }
    if (want === 'tangle-foreign' && st.knots.some(x => x && C.bow(st, x).s === -1)) bad++;
    if (want === 'tangle' && st.last.tangleAt !== s.findIndex((x, i) => x !== i)) bad++;
    if ((want === 'none' || want === 'steady') && st.misses !== 0) bad++;
  }
}
is(bad === 0, `tie: verdict, foreign and tangle point exact over ${placements} placements`);

/* 4. the box */
(() => {
  const R = C.rounds('tie'); let two = 0, twoRead = 0, lr = 0, first = 0, total = 0;
  R.forEach(r => {
    const n = r.w.syl.length, at = new Set();
    for (let p = 0; p < 10; p++) {
      const d = C.dealTie(r, p), syl = d.filter(x => x >= 0);
      if (n === 2 && p < 2) { two++; if (syl.join() === '0,1') twoRead++; }
      if (n >= 3) is(syl.join() !== '0,1,2' && syl.join() !== '2,1,0', `${r.w.key} pass ${p}: three beats never in order nor reversed`);
      at.add(d.indexOf(-1)); total++;
      if (d.slice(0, n).every((x, i) => x === i)) lr++;
      if (d[0] === 0) first++;
    }
    is(at.size >= 2, `${r.w.key}: the foreign bow's place moves`);
  });
  is(twoRead * 2 === two, `two beats in reading order exactly half the time over two passes (${twoRead}/${two})`);
  is(lr / total <= 0.25, `bot "tie the box left to right": ${(lr / total).toFixed(2)} ≤ 0.25`);
  is(first / total <= 0.35, `bot "the first box bow is the first beat": ${(first / total).toFixed(2)} ≤ 0.35`);
  R.forEach(r => { const texts = r.w.syl.concat([r.foreign]), hits = []; for (const a of texts) for (const b of texts) if (a !== b) { const w = a + b; if (SPLIT[w] && w !== r.w.key) hits.push(w); for (const c of texts) if (c !== a && c !== b && SPLIT[a + b + c] && a + b + c !== r.w.key) hits.push(a + b + c); } is(!hits.length, `${r.w.key}: no two bows on screen spell another word (${hits})`); });
})();

/* 5. fix */
(() => {
  const R = C.rounds('fix'), A = R.filter(r => r.t === 'a'), B = R.filter(r => r.t === 'b');
  const BARE = { ladder: 1, mitten: 0, basket: 1, sailboat: 0, strawberry: 1 };   /* the design's pass: last, first, last, first, middle */
  A.forEach(r => is(r.bare === BARE[r.w.key], `${r.w.key}: the missing beat is knot ${BARE[r.w.key]} (${r.bare})`));
  const pos = new Set(A.map(r => r.bare === 0 ? 'first' : r.bare === r.w.syl.length - 1 ? 'last' : 'middle'));
  is(pos.size === 3, `missing beats first, middle and last (${[...pos]})`);
  A.forEach(r => {
    const slots = new Set([0, 1, 2, 3].map(p => C.dealFix(r, p).indexOf(r.w.syl[r.bare]))); is(slots.size === 4, `${r.w.key}: the answer's box slot visits all four places`);
    let st = C.newState(r, 0); const same = st.bowsAll.find(b => b.s === -2), foreign = st.bowsAll.find(b => b.s === -1), ans = st.bowsAll.find(b => b.s === r.bare);
    is(C.tieBow(st, ans.id, (r.bare + 1) % r.w.syl.length) === false, `${r.w.key}: only the bare knot takes a bow`);
    C.tieBow(st, same.id, r.bare); C.gust(st); is(st.last.result === 'sameword' && st.box.includes(same.id) && st.knots[r.bare] === null, `${r.w.key}: a same-word bow is sent back`);
    C.tieBow(st, foreign.id, r.bare); C.gust(st); is(st.last.result === 'foreign' && st.box.includes(foreign.id), `${r.w.key}: a foreign bow is sent back`);
    C.tieBow(st, ans.id, r.bare); is(C.gust(st).flight === 'steady', `${r.w.key}: the missing beat — steady`);
  });
  B.forEach(r => {
    const n = r.w.syl.length;
    is(!r.start.every((s, i) => s === i), `${r.w.key}: the scramble does not start in order`);
    if (n === 3) is(r.start.every((s, i) => s !== i), `${r.w.key}: a three-bow start is a derangement`);
    const st = C.newState(r, 0);
    is(C.gust(st).flight === 'none' && st.misses === 0, `${r.w.key}: Check untouched asks`);
    C.swap(st, 0, 0); C.swap(st, 0, n - 1); C.swap(st, 0, n - 1);
    const g1 = C.gust(st); if (g1.flight !== 'steady') { const g2 = C.gust(st); is(st.help === 2 && st.last.autoFixed != null && st.order[st.last.autoFixed] === st.last.autoFixed, `${r.w.key}: miss 2 flies the first wrong bow home`); }
    while (!st.order.every((s, i) => s === i)) { const i = st.order.findIndex((s, j) => s !== j); C.swap(st, i, st.order.indexOf(i)); }
    is(C.gust(st).flight === 'steady', `${r.w.key}: swapped into order — steady`);
  });
})();

/* 6. the fence */
for (const kites of ['123', '23']) for (const r of C.rounds('fence', { kites })) r.kites.forEach((bows, k) => {
  const st = C.newState(r, 0), res = C.tryCard(st, k), n = r.w.syl.length;
  is(res.result === (bows === n ? 'fit' : n > bows ? 'spin' : 'sag'), `${r.id} on the ${bows}-bow kite: ${res.result}`);
});
(() => { const R = C.rounds('fence'); is(R.filter(r => r.w.syl.length === 2).length / R.length <= 3 / 9, 'bot "always the two-bow kite" ≤ 3/9'); })();

/* 7. the tassels */
(() => {
  const R = C.rounds('tassels'); let three = 0, two = 0;
  R.forEach(r => {
    const want = SOUNDS[r.w.key].split('|').map(s => s.split(' '));
    is(JSON.stringify(r.sounds) === JSON.stringify(want), `${r.w.key}: tassels ${JSON.stringify(r.sounds)} = oracle`);
    is(r.sounds.map(g => g.join('')).join('-') === r.w.syl.join('-'), `${r.w.key}: the graphemes spell the beats`);
    const run = (k) => { const st = C.newState(r, 0); r.sounds.forEach((g, i) => { for (let t = 0; t < k(g); t++) C.tassel(st, i, 1); }); return C.gust(st).flight === 'steady'; };
    is(run(g => g.length), `${r.w.key}: one tassel per sound — steady`);
    is(!run(g => g.length + 1) && !run(g => Math.max(1, g.length - 1)), `${r.w.key}: one too many / too few — not steady`);
    if (run(() => 3)) three++; if (run(() => 2)) two++;
  });
  is(three <= 2 && two <= 2, `bots "always 3" ${three}/9, "always 2" ${two}/9 (≤ 2)`);
  is(C.TASSELS.tractor[1].includes('or'), 'or is one sound (one tassel)');
  Object.keys(C.TASSELS).forEach(k => { const g = C.TASSELS[k]; for (let i = 0; i + 1 < g.length; i++) is(g[i][g[i].length - 1] !== g[i + 1][0], `${k}: no sound shared across the break (a doubled consonant is ONE sound)`); });
})();

/* 8. write */
for (const r of C.rounds('tie')) {
  const st = C.newState(r, 0, { write: true }), w = r.w.word, syl = r.w.syl;
  syl.forEach((s, i) => C.type(st, i, s)); is(C.gust(st).flight === 'steady', `${r.w.key} written ${syl.join('-')}: steady`);
  const alt = C.newState(r, 0, { write: true });
  const cut = syl[0].length + 1; const parts = [w.slice(0, cut)].concat(syl.length > 2 ? [w.slice(cut, cut + syl[1].length), w.slice(cut + syl[1].length)] : [w.slice(cut)]);
  parts.forEach((s, i) => C.type(alt, i, s)); C.gust(alt);
  is(alt.last.result === 'split' && alt.last.kind === KIND[r.w.key], `${r.w.key} written ${parts.join('-')}: the ${KIND[r.w.key]} hint (${alt.last.kind})`);
  const sp = C.newState(r, 0, { write: true }); C.type(sp, 0, 'zz'); C.gust(sp); is(sp.last.result === 'spell', `${r.w.key}: wrong letters — "use the letters"`);
}

/* 9. order */
(() => { const seeded = (k) => { let s = k; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }; for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let same = 0, bad = 0; for (let k = 1; k <= 50; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; if (a.slice().sort((x, y) => x - y).join() !== R.map((_, i) => i).join()) bad++; } is(!same && !bad, `${lv}: orders are permutations and never repeat the previous one (${same})`); } })();

/* 10. strings */
const A = (() => { const ctx = { window: {}, KiteTailCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'kite-tail-activity.js'), 'utf8') + '\n;this.__A = KiteTailActivity;', ctx); return ctx.__A; })();
const coreSrc = fs.readFileSync(path.join(process.env.KT_CORE_DIR || MT, 'kite-tail-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'kite-tail-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) { is(!!A.strings[k].en, `strings ${k}: en`); is(!/\bfree\b/i.test(A.strings[k].en), `strings ${k}: no price word`); is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`); }

/* 11. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'kite-tail-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.build-words-from-syllables.rf-k-2-b' && rows[0].tool === 'kite-tail-activity', 'manifest: the kept id, the new tool');
for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show 33d4ad16:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-kite-tail-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
