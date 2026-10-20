#!/usr/bin/env node
/* =====================================================================
   verify-silbenbogen-core.js — the build gate for ACTIVITY #43, die
   Schwungbahn (RF.K.2.B, German). Its own oracle, never read off the core:
     1. every word's syllables = approved-words-de.json → split for its key,
        read here (a word missing from the gated file fails the build), with
        ≥ 4 sources agreeing; the picture label (mini tools/pictures, de) =
        the word; the picture exists (exact case); never fruits/peach or
        around the house/brush (ruled unusable);
     2. ride() ok iff bows = syllables AND the beds read the syllables in
        order; the reason is exact for every bows 1–6 × every placement of
        the cards for words ≤ 4 syllables (exhaustive), sampled for 5;
     3. cards are lower case; the finished word's first letter is upper case;
     4. the tray: never in reading order nor reversed for 3+ syllables; the
        first syllable's position balanced ±1 per (level, syllable count);
        "take the left card first" / "the right card first" each ≤ half of a
        level's multi-syllable rounds per pass, exactly half over two passes;
     5. the 29 words (Schinken dropped at review), each once, in the design's levels and counts;
     6. the hint ladder, swing/remove/place/lift rules; 7. the order rules;
     8. layout floors; 9. strings de; 10. the manifest mirrors the core and
        keeps the frozen metadata.
   Usage: node scripts/verify-silbenbogen-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.SB_CORE_DIR || MT, 'silbenbogen-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };

/* ---------- the oracle ---------- */
const APPROVED = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-de.json'), 'utf8'));
const GATED = {}; APPROVED.entries.forEach(e => { GATED[e.key] = e; });
const DESIGN = {
  kurz: 'Bär 1 · Fisch 1 · Fuchs 1 · Buch 1 · Schal 1 · Katze 2 · Apfel 2 · Socke 2 · Glocke 2 · Drachen 2',
  mittel: 'Bäcker 2 · Eichel 2 · Birne 2 · Kuchen 2 · Schneemann 2 · Leuchtturm 2 · Handschuh 2 · Seestern 2 · Flugzeug 2 · Erdbeere 3 · Halskette 3 · Banane 3',
  lang: 'Schmetterling 3 · Pfannkuchen 3 · Regenschirm 3 · Krankenwagen 4 · Regenbogen 4 · Sonnenblume 4 · Wassermelone 5'
};
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };

/* 1 + 5. words, splits, pictures, levels */
const seen = new Set();
for (const lv of ['kurz', 'mittel', 'lang']) {
  const R = C.rounds(lv), want = DESIGN[lv].split(' · ').map(x => x.split(' '));
  is(R.length === want.length && R.map(r => r.word.word).sort().join() === want.map(x => x[0]).sort().join(), `${lv}: the design's ${want.length} words`);
  want.forEach(([w, n]) => { const r = R.find(x => x.word.word === w); is(!!r && r.n === +n, `${lv} ${w}: ${n} syllable(s)`); });
  R.forEach(r => {
    const w = r.word, g = GATED[w.key];
    is(!seen.has(w.key), `${w.word}: once across the levels`); seen.add(w.key);
    is(!!g, `${w.word}: in approved-words-de.json`);
    if (g) { is(g.split.join('-') === w.syl.join('-'), `${w.word}: split ${w.syl.join('-')} = gated ${g.split.join('-')}`); is(g.word === w.word, `${w.word}: the gated word`); is(g.total_agreed >= 4, `${w.word}: ${g.total_agreed} sources agree`); }
    is(w.syl.join('') === w.word.toLowerCase(), `${w.word}: the syllables spell the word`);
    const lab = PIC[w.pic] && PIC[w.pic].de && PIC[w.pic].de[0];
    is(lab === w.word, `${w.word}: picture ${w.pic} is labelled "${lab}"`);
    is(exact(w.pic + '@2x.webp'), `${w.word}: picture exists`);
    is(w.pic !== 'fruits/peach' && w.pic !== 'around the house/brush', `${w.word}: not a ruled-out picture`);
    is(w.syl.every(s => s === s.toLowerCase()), `${w.word}: lower-case cards`);
    is(w.word[0] === w.word[0].toUpperCase() && w.word[0] !== w.word[0].toLowerCase(), `${w.word}: the noun's capital`);
  });
}
is(seen.size === 29, `29 words (${seen.size}); Schinken dropped — the ham roll reads as Wurst, one syllable`); is(!seen.has('ham'), 'Schinken is not used');

/* 2. the ride — exhaustive for ≤ 4 syllables */
function perms(a) { if (a.length <= 1) return [a]; const out = []; a.forEach((x, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).forEach(p => out.push([x].concat(p)))); return out; }
function expect(n, bows, placed) {
  /* placed: array of length bows, entries = syllable index or null; the tray holds the rest */
  const inBows = placed.filter(x => x !== null).length, tray = n - inBows, empty = placed.filter(x => x === null).length;
  if (bows === 0) return 'noBows';
  if (tray && empty) return 'unplaced';
  if (tray) return 'tooFew';
  if (empty) return 'tooMany';
  for (let i = 0; i < n; i++) if (placed[i] !== i) return 'order';
  return 'ok';
}
let rides = 0, bad = 0;
const all = ['kurz', 'mittel', 'lang'].flatMap(lv => C.rounds(lv));
const samples = []; [1, 2, 3, 4, 5].forEach(n => { const r = all.find(x => x.n === n); if (r) samples.push(r); });
for (const r of samples) {
  const n = r.n;
  for (let bows = 0; bows <= 6; bows++) {
    /* every way to put a subset of the cards, in every order, into the bows */
    const choices = [];
    const rec = (b, used, acc) => { if (b === bows) { choices.push(acc.slice()); return; } acc.push(null); rec(b + 1, used, acc); acc.pop(); for (let s = 0; s < n; s++) if (!used.has(s)) { used.add(s); acc.push(s); rec(b + 1, used, acc); acc.pop(); used.delete(s); } };
    rec(0, new Set(), []);
    const list = n >= 5 ? choices.filter((_, i) => i % 97 === 0) : choices;
    for (const placed of list) {
      const st = C.newState(r, 0);
      for (let b = 0; b < bows; b++) C.swing(st);
      placed.forEach((s, b) => { if (s !== null) { const c = st.cards.find(x => x.s === s); C.place(st, c.id, b); } });
      const res = C.ride(st), want = expect(n, bows, placed);
      rides++;
      if ((res.ok ? 'ok' : res.reason) !== want) { bad++; if (bad < 5) console.error(`  ${r.word.word} bows ${bows} ${JSON.stringify(placed)} → ${res.ok ? 'ok' : res.reason}, want ${want}`); }
      if (want === 'order' && res.stopAt !== placed.findIndex((x, i) => x !== i)) bad++;
    }
  }
}
is(bad === 0, `ride: the verdict is exact over ${rides} arrangements`);

/* 3. a finished word */
(() => { const r = C.rounds('lang').find(x => x.word.key === 'butterfly'), st = C.newState(r, 0); for (let i = 0; i < 3; i++) C.swing(st); [0, 1, 2].forEach(s => C.place(st, st.cards.find(c => c.s === s).id, s)); const res = C.ride(st); is(res.ok && st.done, 'Schmetterling: three bows, schmet-ter-ling — ok'); })();

/* 4. the tray */
for (const lv of ['kurz', 'mittel', 'lang']) {
  const R = C.rounds(lv), multi = R.filter(r => r.n > 1);
  let lfTot = 0, rfTot = 0;
  for (let p = 0; p < 2; p++) {
    let lf = 0, rf = 0; const pos = {};
    R.forEach(r => {
      const d = C.deal(r, p), id = d.map((_, i) => i);
      is(d.slice().sort((a, b) => a - b).join() === id.join(), `${lv} ${r.word.word} pass ${p}: the tray holds every card once`);
      if (r.n >= 3) is(d.join() !== id.join() && d.join() !== id.slice().reverse().join(), `${lv} ${r.word.word} pass ${p}: 3+ syllables never in reading order nor reversed (${d})`);
      if (r.n > 1) { if (d.join() === id.join()) lf++; if (d.join() === id.slice().reverse().join()) rf++; const k = r.n + ':' + d.indexOf(0); pos[k] = (pos[k] || 0) + 1; }
    });
    for (const n of [2, 3, 4]) { const g = R.filter(r => r.n === n); if (g.length < 2) continue; const c = []; for (let i = 0; i < n; i++) c.push(pos[n + ':' + i] || 0); is(Math.max(...c) - Math.min(...c) <= 1, `${lv} pass ${p}: first-syllable positions for ${n} syllables balanced (${c})`); }
    is(lf <= Math.ceil(multi.length / 2) && rf <= Math.ceil(multi.length / 2), `${lv} pass ${p}: left-first ${lf}, right-first ${rf} of ${multi.length}`);
    lfTot += lf; rfTot += rf;
  }
  is(lfTot <= multi.length && rfTot <= multi.length, `${lv}: over two passes left-first ${lfTot}, right-first ${rfTot} ≤ ${multi.length}`);
  R.filter(r => r.n >= 2).forEach(r => is(C.deal(r, 0).join() !== C.deal(r, 1).join() || r.n === 1, `${lv} ${r.word.word}: the tray is re-dealt between passes`));
  /* a child plays many passes: the reading-order / reverse rule holds on every one of them, not just the first two */
  R.filter(r => r.n >= 3).forEach(r => { const id = r.word.syl.map((_, i) => i); let bad = 0; for (let p = 0; p < 12; p++) { const d = C.deal(r, p).join(); if (d === id.join() || d === id.slice().reverse().join()) bad++; } is(bad === 0, `${lv} ${r.word.word}: never in reading order nor reversed over passes 0–11 (${bad})`); });
}

/* 6. the hand and the ladder */
(() => {
  const r = C.rounds('lang').find(x => x.word.key === 'butterfly');
  let st = C.newState(r, 0);
  is(C.ride(st).reason === 'noBows' && st.misses === 0 && C.hint(st) === 'hintSwing', 'no bows: asks to swing, no miss');
  C.swing(st); C.swing(st); C.swing(st);
  is(C.ride(st).reason === 'unplaced' && st.misses === 0 && C.hint(st) === 'hintPlace', 'bows and cards left: asks to place, no miss');
  for (let i = 0; i < 7; i++) C.swing(st); is(st.bows === C.MAX_BOWS, `at most ${C.MAX_BOWS} bows`);
  const c0 = st.cards.find(c => c.s === 0);
  C.place(st, c0.id, 0); is(C.removeBow(st, 0) === false && st.bows === 6, 'a bow with a card cannot be removed');
  is(C.removeBow(st, 5) === true && st.bows === 5 && st.beds.length === 5, 'an empty bow can be removed');
  C.lift(st, 0); is(st.tray.includes(c0.id) && st.beds[0] === null, 'lift puts the card back in the tray');
  st = C.newState(r, 0); C.swing(st); C.swing(st);
  const ids = [0, 1].map(s => st.cards.find(c => c.s === s).id);
  C.place(st, ids[0], 0); C.place(st, ids[1], 1);
  is(C.ride(st).reason === 'tooFew' && st.misses === 1 && C.hint(st) === 'hintTooFew', 'two bows for three syllables: a bow is missing (miss 1)');
  C.swing(st); is(!st.show && C.hint(st) === null, 'a new move takes the help away');
  C.swing(st); C.place(st, st.tray[0], 2);
  is(C.ride(st).reason === 'tooMany' && st.help === 2 && C.hint(st) === 'hintSwingN', 'four bows for three syllables: miss 2 — swing along n times');
  C.removeBow(st, 3);
  const swap = C.newState(r, 0); C.swing(swap); C.swing(swap); C.swing(swap);
  const sid = [2, 1, 0].map(s => swap.cards.find(c => c.s === s).id); sid.forEach((id, b) => C.place(swap, id, b));
  is(C.ride(swap).reason === 'order' && swap.last.stopAt === 0 && swap.last.built === 'lingterschmet' && C.hint(swap) === 'hintOrder', 'reversed: the ride stops at bow 1 and shows "lingterschmet"');
  C.place(swap, sid[2], 0); is(swap.beds[0] === sid[2] && swap.beds[2] === sid[0], 'a full bow swaps');
  C.place(swap, sid[0], 1); C.place(swap, sid[2], 2);
  const o2 = C.ride(swap); is(!o2.ok && swap.help === 2 && C.hint(swap) === 'hintSlices', 'a second order miss shows the picture slices');
  [0, 1, 2].forEach(s => C.place(swap, swap.cards.find(c => c.s === s).id, s));
  is(C.ride(swap).ok && swap.done && C.swing(swap) === false, 'right order rides; a finished word rests');
})();

/* 7. order */
(() => {
  let s = 7; const rnd = () => { s = (s * 1103515245 + 12345) >>> 0; return s / 4294967296; };
  for (const lv of ['kurz', 'mittel', 'lang']) {
    const R = C.rounds(lv); let bad = 0, rep = 0, prev = null;
    for (let t = 0; t < 3000; t++) {
      const o = C.order(R, rnd, prev);
      if (o.slice().sort((a, b) => a - b).join() !== R.map((_, i) => i).join()) bad++;
      if (lv === 'kurz') for (let i = 1; i < 4; i++) if (R[o[i]].n === R[o[i - 1]].n) bad++;
      if (prev && prev.join() === o.join()) rep++;
      prev = o;
    }
    is(bad === 0, `${lv}: every order is a permutation${lv === 'kurz' ? ', the first four alternate 1 and 2 syllables' : ''}`);
    is(rep === 0, `${lv}: never the previous order`);
  }
})();

/* 8. layout */
for (let W = 280; W <= 1366; W += 4) {
  const L = C.layout(W);
  for (let b = 1; b <= C.MAX_BOWS; b++) { const bw = C.bowWidth(L, b); if (bw < 44 || bw * b > L.track + 1) { is(false, `layout ${W}: ${b} bows of ${bw} px fit the ${L.track} px track`); break; } }
  if (L.pic < (L.mode === 'wide' ? 96 : 64)) is(false, `layout ${W}: picture ${L.pic}`);
}
is(true, 'layout: every bow count fits, bows ≥ 44 px, pictures above the floor');

/* 9. strings */
const A = (() => { const ctx = { window: {}, SilbenbogenCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'silbenbogen-activity.js'), 'utf8') + '\n;this.__A = SilbenbogenActivity;', ctx); return ctx.__A; })();
const ph = (x) => (x.match(/\{\w+\}/g) || []).sort().join();
for (const k of Object.keys(A.strings)) { const v = A.strings[k]; is(!!v.de && !!v.en && ph(v.de) === ph(v.en), `strings ${k}: de + en, same placeholders`); is(!/\b(kostenlos|gratis|free)\b/i.test(v.de + v.en), `strings ${k}: no price word`); }
const src = fs.readFileSync(path.join(MT, 'silbenbogen-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
const viaHint = ['hintSwing', 'hintPlace', 'hintTooFew', 'hintTooMany', 'hintOrder', 'hintSwingN', 'hintSlices'];
for (const k of Object.keys(A.strings)) is(['title', 'instruction', 'prompt'].includes(k) || viaHint.includes(k) || src.includes("'" + k + "'"), `string ${k} is referenced`);
for (const k of viaHint) is(fs.readFileSync(path.join(process.env.SB_CORE_DIR || MT, 'silbenbogen-core.js'), 'utf8').includes("'" + k + "'"), `hint ${k} is returned by the core`);

/* 10. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'silbenbogen-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.bau-das-wort-aus-silben.rf-k-2-b' && rows[0].tool === 'silbenbogen-activity', 'manifest: the kept id, the new tool');
for (const lv of ['kurz', 'mittel', 'lang']) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show 2916d464:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-silbenbogen-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
