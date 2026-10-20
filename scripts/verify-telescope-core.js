#!/usr/bin/env node
/* =====================================================================
   verify-telescope-core.js — the gate for ACTIVITY #46, Kikkerten
   (RF.K.2.B, da). It holds its OWN ground truth — the 29 words with their
   splits, pictures and levels typed out here — and checks the core
   against it and against approved-words-da.json + the picture labels:
     1. every word: split = oracle = approved-words-da.json, NOT
        policy_managed (the Danish K-1 pool), picture exists, its da label
        is the word; klokke is the bell, never the clock (ur);
     2. pull: starts collapsed; Kig! at 0 asks (no miss); sharp iff the
        rings = the syllables, for 1…4 rings; too few → the last ring
        carries the rest; too many → blank rings; never sharp before Kig!;
        push(i) shuts ring i and every ring beyond it; counts 1×2 2×3 3×3 4×2;
     3. build: every arrangement of the rack: sharp only in word order;
        right rings stay, wrong rings pop; the decoy always pops first;
        the rack never starts in word order for 3+, two rings in order in
        exactly half the two-ring rounds over two passes; miss 2 locks the
        FIRST syllable; no decoy makes a Danish word with the rack;
     4. gap: candidates = answer + a syllable of the word + a foreign one;
        sharp only for the answer; the same-word branch; the answer's slot
        balanced 3/3/3 every pass; hollow last ×4 / first ×3 / middle ×2;
     5. the hint ladder; 6. order, deterministic never-repeat;
     7. strings (en + da, every key reached, no price word); 8. manifest.
   Usage: node scripts/verify-telescope-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.TS_CORE_DIR || MT, 'telescope-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };

/* ---------- the oracle ---------- */
const ORACLE = {
  fisk: 'fisk|animals/fish', banan: 'ba-nan|At the Supermarket/banana', 'lænestol': 'læ-ne-stol|around the house/armchair', hus: 'hus|miscellaneous/house',
  kanin: 'ka-nin|easter/bunny', telefon: 'te-le-fon|around the house/telephone', ambulance: 'am-bu-lan-ce|hospital/ambulance', pingvin: 'ping-vin|animals/penguin',
  gorilla: 'go-ril-la|zoo animals/gorilla', motorcykel: 'mo-tor-cy-kel|vehicles/motorcycle', engel: 'en-gel|christmas/angel', ballon: 'bal-lon|Things That Fly/balloon',
  klokke: 'klok-ke|christmas/bell', cykel: 'cy-kel|spring/bicycle', kjole: 'kjo-le|clothing/dress', zebra: 'ze-bra|animals/zebra', delfin: 'del-fin|animals/dolphin',
  'spøgelse': 'spø-gel-se|miscellaneous/ghost', xylofon: 'xy-lo-fon|music/xylophone', ballerina: 'bal-le-ri-na|occupations/ballerina', traktor: 'trak-tor|vehicles/tractor',
  panda: 'pan-da|animals/panda', 'bælte': 'bæl-te|accessories/belt', lampe: 'lam-pe|around the house/lamp', tromme: 'trom-me|music/drum', radise: 'ra-di-se|vegetables/radish',
  medalje: 'me-dal-je|accessories/medal', 'køleskab': 'kø-le-skab|around the house/fridge', 'græshoppe': 'græs-hop-pe|forest creatures/grasshopper'
};
const LEVEL_WORDS = {
  pull: 'fisk banan lænestol hus kanin telefon ambulance pingvin gorilla motorcykel',
  build: 'engel ballon klokke cykel kjole zebra delfin spøgelse xylofon ballerina',
  gap: 'traktor panda bælte lampe tromme radise medalje køleskab græshoppe'
};
const GAP_AT = { traktor: 1, panda: 0, 'bælte': 1, lampe: 0, tromme: 1, radise: 1, medalje: 0, 'køleskab': 2, 'græshoppe': 1 };
const AP = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-da.json'), 'utf8')).entries;
const APPROVED = {}; AP.forEach(e => { APPROVED[e.word] = e; });
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
/* every Danish word the library and the syllable list know — a decoy must never make one */
const DA_WORDS = new Set(AP.map(e => e.word)); Object.values(PIC).forEach(l => { if (l.da) { DA_WORDS.add(l.da[0].toLowerCase()); DA_WORDS.add(l.da[1].toLowerCase()); } });

/* 1. words */
const keys = Object.keys(C.WORDS);
is(keys.length === 29 && keys.length === Object.keys(ORACLE).length && keys.every(k => ORACLE[k]), `the core's words = the 29-word oracle (${keys.length})`);
keys.forEach(k => {
  const w = C.WORDS[k], [split, pic] = (ORACLE[k] || '|').split('|'), g = APPROVED[k], lab = PIC[w.pic] && PIC[w.pic].da && PIC[w.pic].da[0];
  is(w.syl.join('-') === split && w.pic === pic, `${k}: ${w.syl.join('-')} on ${w.pic} = oracle ${split} on ${pic}`);
  is(!!g && g.split.join('-') === split, `${k}: approved-words-da.json agrees (${g && g.split.join('-')})`);
  is(!!g && g.policy_managed !== true, `${k}: not policy_managed (written = spoken syllables, the K-1 pool)`);
  is(!!lab && lab.toLowerCase() === k, `${k}: picture ${w.pic} labelled "${lab}"`);
  is(exact(w.pic + '@2x.webp'), `${k}: picture exists`);
  is(!/clock/.test(w.pic), `${k}: never the clock picture (a clock is "ur")`);
  is(!/pelican/.test(w.pic) && !['badekar', 'papegøje'].includes(k), `${k}: no pelican (drawn like a stork), no badekar / papegøje (said bad-kar, pap-gøj-e)`);
});
is(C.WORDS.klokke && C.WORDS.klokke.pic === 'christmas/bell', 'klokke is the bell');
for (const lv of Object.keys(LEVEL_WORDS)) is(C.rounds(lv).map(r => r.w.key).join(' ') === LEVEL_WORDS[lv], `${lv}: the level's words`);
is(C.LEVEL_KEYS.join() === 'pull,build,gap', 'three levels');

/* 2. pull */
(() => {
  const R = C.rounds('pull'), count = {};
  R.forEach(r => { const n = ORACLE[r.w.key].split('|')[0].split('-').length; count[n] = (count[n] || 0) + 1; });
  is(JSON.stringify(count) === '{"1":2,"2":3,"3":3,"4":2}', `pull counts 1×2 2×3 3×3 4×2 (${JSON.stringify(count)})`);
  for (const r of R) {
    const syl = ORACLE[r.w.key].split('|')[0].split('-'), n = syl.length;
    let st = C.newState(r, 0); is(st.out === 0, `${r.w.key}: starts collapsed`);
    let res = C.look(st); is(!res.sharp && st.misses === 0 && st.last.result === 'empty', `${r.w.key}: Kig! at 0 rings asks, no miss`);
    for (let k = 1; k <= C.MAX_RINGS; k++) {
      st = C.newState(r, 0); for (let i = 0; i < k; i++) C.pull(st);
      is(st.out === k && !C.sharp(st), `${r.w.key} ${k} rings: no focus before Kig!`);
      res = C.look(st);
      if (k === n) { is(res.sharp && st.done && C.sharp(st), `${r.w.key} ${k} rings: sharp`); continue; }
      const want = []; for (let i = 0; i < k; i++) want.push(i < n ? [syl[i]] : []); if (k < n) want[k - 1] = syl.slice(k - 1);
      is(!res.sharp && !st.done && st.misses === 1 && st.last.result === (k < n ? 'short' : 'long') && JSON.stringify(st.last.engraved) === JSON.stringify(want) && st.last.blank === Math.max(0, k - n), `${r.w.key} ${k} rings: ${k < n ? 'the last ring carries ' + want[k - 1].join('·') : (k - n) + ' blank'} (${JSON.stringify(st.last.engraved)})`);
    }
    st = C.newState(r, 0); for (let i = 0; i < 4; i++) C.pull(st);
    is(!C.pull(st) && st.out === 4, `${r.w.key}: four rings is the most`);
    C.push(st, 1); is(st.out === 1, `${r.w.key}: push(1) shuts ring 1 and every ring beyond it`);
    is(!C.push(st, 1), `${r.w.key}: a ring that is in cannot be pushed`);
  }
})();

/* 3. build */
const perms = (a) => a.length <= 1 ? [a] : a.flatMap((x, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).map(p => [x].concat(p)));
(() => {
  const R = C.rounds('build');
  let inOrder2 = 0, twos = 0, ltr = 0, firstFirst = 0, total = 0;
  for (const r of R) {
    const syl = ORACLE[r.w.key].split('|')[0].split('-'), n = syl.length;
    is(syl.indexOf(r.decoy) < 0 && !!r.decoy, `${r.w.key}: the decoy "${r.decoy}" is not a syllable of the word`);
    is(keys.some(k => k !== r.w.key && C.WORDS[k].syl.includes(r.decoy)), `${r.w.key}: the decoy is a syllable of another pool word`);
    const made = []; syl.forEach(s => { made.push(r.decoy + s, s + r.decoy); }); perms(syl.concat(r.decoy)).forEach(p => made.push(p.join('')));
    is(!made.some(m => DA_WORDS.has(m)), `${r.w.key}: no decoy + ring makes a Danish word (${made.filter(m => DA_WORDS.has(m)).join(',')})`);
    /* three or more rings: never in reading order nor reversed, over every rotation the deal can reach */
    if (n >= 3) for (let pass = 0; pass < 24; pass++) { const o = C.dealBuild(r, pass, false); is(o.join() !== syl.map((_, i) => i).join() && o.join() !== syl.map((_, i) => n - 1 - i).join(), `${r.w.key} pass ${pass}: never in order nor reversed (${o})`); }
    for (const pass of [0, 1]) for (const extra of [false, true]) {
      const st = C.newState(r, pass, { extra }), order = st.all.map(x => x.s).filter(s => s >= 0);
      is(st.rack.length === n + (extra ? 1 : 0) && st.all.filter(x => x.s === -1).length === (extra ? 1 : 0), `${r.w.key} p${pass}${extra ? ' extra' : ''}: the rack (${st.rack.length})`);
      if (n >= 3) is(order.join() !== syl.map((_, i) => i).join() && order.join() !== syl.map((_, i) => n - 1 - i).join(), `${r.w.key} p${pass}: three or more rings never in order nor reversed (${order})`);
      if (!extra) { total++; if (order.join() === syl.map((_, i) => i).join()) ltr++; if (order[0] === 0) firstFirst++; if (n === 2) { twos++; if (order[0] === 0) inOrder2++; } }
    }
    /* every arrangement: sharp only in word order; right rings stay, wrong ones pop */
    for (const p of perms(syl.map((_, i) => i))) {
      const st = C.newState(r, 0); p.forEach(s => C.fit(st, st.all.find(x => x.s === s).id));
      const res = C.look(st), word = p.every((s, i) => s === i);
      is(!!res.sharp === word, `${r.w.key} ${p.join('')}: ${word ? 'sharp' : 'blurred'}`);
      if (!word) is(st.segs.every((x, i) => p[i] === i ? !!x && C.ring(st, x).s === i : x === null) && st.rack.length === p.filter((s, i) => s !== i).length, `${r.w.key} ${p.join('')}: right rings stay, wrong rings pop`);
    }
    /* the decoy always pops, before anything else is judged */
    const sd = C.newState(r, 0, { extra: true }); const dec = sd.all.find(x => x.s === -1);
    syl.forEach((_, i) => C.fit(sd, sd.all.find(x => x.s === i).id)); C.unfit(sd, n - 1); C.fit(sd, dec.id);
    C.look(sd); is(sd.last.result === 'decoy' && sd.rack.includes(dec.id) && !sd.segs.includes(dec.id) && !sd.done, `${r.w.key}: the decoy pops out`);
    /* miss 2 locks the FIRST syllable on ring 0 */
    const sm = C.newState(r, 0); const rev = syl.map((_, i) => n - 1 - i);
    rev.forEach(s => C.fit(sm, sm.all.find(x => x.s === s).id)); C.look(sm);
    rev.forEach(s => { const x = sm.all.find(y => y.s === s); if (sm.rack.includes(x.id)) C.fit(sm, x.id); }); C.look(sm);
    is(sm.help === 2 && sm.locked === 0 && C.ring(sm, sm.segs[0]).s === 0 && !C.unfit(sm, 0), `${r.w.key}: miss 2 locks the first syllable "${syl[0]}" on ring 0`);
    syl.forEach((_, i) => { const x = sm.all.find(y => y.s === i); if (sm.rack.includes(x.id)) C.fit(sm, x.id); });
    is(C.look(sm).sharp, `${r.w.key}: then the rest in order — sharp`);
    /* taking a ring off closes up the rings beyond it */
    const su = C.newState(r, 0); syl.forEach((_, i) => C.fit(su, su.all.find(x => x.s === i).id)); C.unfit(su, 0);
    is(su.segs.filter(Boolean).length === n - 1 && C.ring(su, su.segs[0]).s === 1 && su.segs[n - 1] === null, `${r.w.key}: unfit(0) — the rings beyond close up`);
  }
  is(twos > 0 && inOrder2 * 2 === twos, `two-ring racks in reading order in exactly half the rounds over two passes (${inOrder2}/${twos})`);
  console.log(`  build bots (measured, no extra ring): fit left-to-right solves ${ltr}/${total}; first ring = first syllable ${firstFirst}/${total}`);
  is(ltr / total <= 0.36 && firstFirst / total <= 0.5, `build: fit-left-to-right ≤ 0.36 (chance on the two-ring words), first-ring-first ≤ 0.5 (${ltr}/${total}, ${firstFirst}/${total})`);
})();

/* 4. gap */
(() => {
  const R = C.rounds('gap'), pos = { first: 0, middle: 0, last: 0 };
  for (const r of R) {
    const syl = ORACLE[r.w.key].split('|')[0].split('-'), n = syl.length, ans = syl[GAP_AT[r.w.key]];
    is(r.gap === GAP_AT[r.w.key], `${r.w.key}: the hollow is ring ${GAP_AT[r.w.key]}`);
    pos[r.gap === 0 ? 'first' : r.gap === n - 1 ? 'last' : 'middle']++;
    is(syl.includes(r.same) && r.same !== ans && !syl.includes(r.foreign), `${r.w.key}: candidates ${ans} (answer), ${r.same} (same word), ${r.foreign} (foreign)`);
    const st = C.newState(r, 0);
    is(st.segs.filter(x => x === null).length === 1 && st.segs[r.gap] === null && st.all.length === 3, `${r.w.key}: one hollow, three candidates`);
    is(C.look(st).sharp === false && st.misses === 0, `${r.w.key}: Kig! with the hollow empty asks`);
    for (const c of st.all) {
      const s2 = C.newState(r, 0); C.fit(s2, c.id); const res = C.look(s2);
      const want = c.text === ans ? 'sharp' : c.text === r.same ? 'sameword' : 'foreign';
      is(want === 'sharp' ? res.sharp : (!res.sharp && s2.last.result === want && s2.rack.includes(c.id) && s2.segs[r.gap] === null), `${r.w.key} ${c.text}: ${want}`);
      if (want === 'sameword') is(s2.last.home === syl.indexOf(r.same), `${r.w.key} ${c.text}: shows its own place (ring ${s2.last.home})`);
    }
  }
  is(pos.last === 4 && pos.first === 3 && pos.middle === 2, `hollow last ×4, first ×3, middle ×2 (${JSON.stringify(pos)})`);
  for (const pass of [0, 1, 2]) { const slots = [0, 0, 0]; R.forEach(r => { const st = C.newState(r, pass); slots[st.all.findIndex(x => x.text === r.w.syl[r.gap])]++; }); is(slots.join() === '3,3,3', `pass ${pass}: the answer's slot 3/3/3 (${slots})`); }
})();

/* 5. hints */
(() => {
  const H = (lv, i, fn) => { const r = C.rounds(lv)[i], st = C.newState(r, 0); fn(st, r); return C.hint(st); };
  is(H('pull', 1, (st) => C.look(st)) === 'hintPull', 'pull, nothing: hintPull');
  is(H('pull', 2, (st) => { C.pull(st); C.look(st); }) === 'hintShort', 'pull, short: hintShort');
  is(H('pull', 1, (st) => { for (let i = 0; i < 3; i++) C.pull(st); C.look(st); }) === 'hintLong', 'pull, one too many: hintLong');
  is(H('pull', 0, (st) => { for (let i = 0; i < 3; i++) C.pull(st); C.look(st); }) === 'hintLong2', 'pull, two too many: hintLong2');
  is(H('pull', 2, (st) => { C.pull(st); C.look(st); C.pull(st); C.look(st); }) === 'hintClap', 'pull, miss 2: hintClap');
  is(H('pull', 2, (st) => { C.pull(st); C.look(st); C.pull(st); }) === null, 'a move takes the help away');
  is(H('build', 0, (st) => C.look(st)) === 'hintBuild', 'build, nothing: hintBuild');
  is(H('build', 0, (st) => { C.fit(st, st.all.find(x => x.s === 1).id); C.fit(st, st.all.find(x => x.s === 0).id); C.look(st); }) === 'hintNoneRight', 'build, none right: hintNoneRight');
  is(H('build', 7, (st) => { [0, 2, 1].forEach(s => C.fit(st, st.all.find(x => x.s === s).id)); C.look(st); }) === 'hintGlow', 'build, some right: hintGlow');
  is(H('gap', 0, (st) => C.look(st)) === 'hintGap', 'gap, nothing: hintGap');
})();

/* 6. order */
(() => { const seeded = (k) => { let s = k; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }; for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let same = 0, bad = 0; for (let k = 1; k <= 50; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; if (a.slice().sort((x, y) => x - y).join() !== R.map((_, i) => i).join()) bad++; } is(!same && !bad, `${lv}: orders are permutations and never repeat the previous one (${same})`); } })();

/* 7. strings */
const A = (() => { const ctx = { window: {}, TelescopeCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'telescope-activity.js'), 'utf8') + '\n;this.__A = TelescopeActivity;', ctx); return ctx.__A; })();
const coreSrc = fs.readFileSync(path.join(process.env.TS_CORE_DIR || MT, 'telescope-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'telescope-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) {
  is(!!A.strings[k].en && !!A.strings[k].da, `strings ${k}: en + da`);
  is(!/\bfree\b|gratis/i.test(A.strings[k].en + A.strings[k].da), `strings ${k}: no price word`);
  is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`);
}

/* 8. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'telescope-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.byg-ordet-af-stavelser.da.rf-k-2-b' && rows[0].tool === 'telescope-activity', 'manifest: the kept id, the new tool');
for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show 33d4ad16:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-telescope-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
