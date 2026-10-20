#!/usr/bin/env node
/* =====================================================================
   verify-clay-snake-core.js — the build gate for ACTIVITY #44, de
   kleislang (RF.K.2.B, Dutch). Its OWN copy of the 28 splits, typed here:
     1. each = the core's split = approved-words-nl.json (≥ 3 sources); the
        picture label (nl) = the word; the picture exists; the three
        ambiguous pictures (meisje, schoorsteen, tapijt) never appear; the
        levels and the hak count spread (1×2, 2×3, 3×3, 4×2);
     2. hak: for every word and every 1–6 pieces the stamp is exact — right
        iff pieces = klankgroepen; too few → the leftovers all on the LAST
        piece; too many → exactly (pieces − n) blank pieces; one piece on a
        longer word asks (no miss); cuts within 36 px refused; ≤ 6 pieces;
     3. plak: every arrangement of the lumps (with the decoy in every
        place) — a joint sticks iff its pair is consecutive in the split;
        right only in reading order; the decoy never sticks and is sent back;
        true lumps left in the tub ask (no miss); miss 2 locks the FIRST;
     4. letters: seams at the typed cell gaps; "ij" one cell; an inner cut
        heals; bij right with zero cuts, every other word asks;
     5. the tub: two lumps in reading order exactly half the time over two
        passes, three or more never in reading order nor reversed; the decoy's
        place moves; 6. no decoy + lumps spell another library word;
     7. the hint ladder; 8. order; 9. strings; 10. the manifest.
   Usage: node scripts/verify-clay-snake-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.CS_CORE_DIR || MT, 'clay-snake-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };

/* ---------- the oracle ---------- */
const ORACLE = {
  hak: 'kat · ze-bra · re-gen-boog · fiets · vlin-der · zon-ne-bloem · he-li-kop-ter · sneeuw-pop · vuur-to-ren · ver-re-kij-ker',
  plak: 'pan-da · ko-nijn · zee-ster · aard-bei · boe-ken-kast · pan-nen-koek · pa-ra-plu · wa-ter-me-loen · vleer-muis · dol-fijn',
  letters: 'vlieg-tuig · tij-ger · bal-lon · en-gel · hand-schoen · koek-je · trac-tor · bij'
};
const SEAMS = { vliegtuig: [5], tijger: [2], ballon: [3], engel: [2], handschoen: [4], koekje: [4], tractor: [4], bij: [] };
const DECOYS = { panda: 'ster', konijn: 'pan', zeester: 'da', aardbei: 'koek', boekenkast: 'muis', pannenkoek: 'bei', paraplu: 'ken', watermeloen: 'plu', vleermuis: 'zee', dolfijn: 'ra' };
const APPROVED = {}; JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-nl.json'), 'utf8')).entries.forEach(e => { APPROVED[e.key] = e; });
const PIC = {}, LABELS = new Set(); for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) { PIC[j.dir + '/' + k] = v.labels; if (v.labels.nl) LABELS.add(v.labels.nl[0].toLowerCase()); } }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };

/* 1. words */
for (const lv of C.LEVEL_KEYS) {
  const want = ORACLE[lv].split(' · '), R = C.rounds(lv);
  is(R.length === want.length, `${lv}: ${want.length} words`);
  R.forEach((r, i) => {
    const w = r.word, g = APPROVED[w.key], lab = PIC[w.pic] && PIC[w.pic].nl && PIC[w.pic].nl[0];
    is(w.syl.join('-') === want[i], `${lv} ${w.word}: split ${w.syl.join('-')} = oracle ${want[i]}`);
    is(!!g && g.split.join('-') === w.syl.join('-') && g.total_agreed >= 3, `${lv} ${w.word}: = approved-words-nl.json (${g && g.split.join('-')}, ${g && g.total_agreed} sources)`);
    is(!!lab && lab.toLowerCase() === w.word, `${lv} ${w.word}: picture ${w.pic} labelled "${lab}"`);
    is(exact(w.pic + '@2x.webp'), `${lv} ${w.word}: picture exists`);
    is(w.syl.join('') === w.word && w.word === w.word.toLowerCase(), `${lv} ${w.word}: lower case, the parts spell the word`);
    if (lv === 'plak') is(w.decoy === DECOYS[w.word], `${lv} ${w.word}: decoy ${w.decoy}`);
  });
}
const allKeys = C.LEVEL_KEYS.flatMap(lv => C.rounds(lv).map(r => r.word.key));
is(new Set(allKeys).size === 28, '28 different words');
is(!allKeys.some(k => ['girl', 'chimney', 'carpet'].includes(k)), 'meisje, schoorsteen and tapijt are not used (each picture has two right names)');
(() => { const c = {}; C.rounds('hak').forEach(r => { c[r.n] = (c[r.n] || 0) + 1; }); is(c[1] === 2 && c[2] === 3 && c[3] === 3 && c[4] === 2, `hak counts 1×2, 2×3, 3×3, 4×2 (${JSON.stringify(c)})`); })();

/* 2. hak: the stamp */
for (const r of C.rounds('hak')) {
  const n = r.n, syl = r.word.syl;
  for (let k = 1; k <= C.MAX_PIECES; k++) {
    const st = C.newState(r, 0);
    for (let i = 1; i < k; i++) is(C.chop(st, i / k).result === 'cut', `${r.word.word}: cut ${i}/${k}`);
    const res = C.check(st);
    if (k === 1 && n > 1) { is(res.result === 'empty' && st.misses === 0, `${r.word.word} 1 piece: asks, no miss`); continue; }
    if (k === n) { is(res.result === 'ok', `${r.word.word} ${k} pieces: right`); continue; }
    const p = st.last.pieces;
    if (k < n) {
      is(res.result === 'short' && st.misses === 1, `${r.word.word} ${k} pieces: too few (miss)`);
      is(p.length === k && p.slice(0, k - 1).every((x, i) => x.length === 1 && x[0] === syl[i]) && p[k - 1].join() === syl.slice(k - 1).join(), `${r.word.word} ${k} pieces: the leftovers all on the last piece (${JSON.stringify(p)})`);
    } else {
      is(res.result === 'long' && st.misses === 1, `${r.word.word} ${k} pieces: too many (miss)`);
      is(p.filter(x => !x.length).length === k - n && p.slice(0, n).every((x, i) => x.join() === syl[i]), `${r.word.word} ${k} pieces: exactly ${k - n} blank (${JSON.stringify(p)})`);
    }
  }
}
(() => {
  const r = C.rounds('hak')[0];
  let st = C.newState(r, 0);
  is(C.chop(st, 0.03).result === 'refused' && C.chop(st, 0.97).result === 'refused', 'a cut within 36 px of an end is refused');
  C.chop(st, 0.5); is(C.chop(st, 0.5 + 30 / 440).result === 'refused' && C.chop(st, 0.5 + 40 / 440).result === 'cut', 'a cut within 36 px of another is refused, beyond it allowed');
  st = C.newState(r, 0); [0.15, 0.3, 0.45, 0.6, 0.75].forEach(x => C.chop(st, x)); is(C.chop(st, 0.9).result === 'refused' && st.cuts.length === 5, 'at most 6 pieces');
  is(C.knead(st, 0) && st.cuts.length === 4, 'knead removes a cut');
  const one = C.rounds('hak').find(x => x.n === 1), s1 = C.newState(one, 0);
  is(C.check(s1).result === 'ok', `${one.word.word}: one klankgroep — zero cuts is right`);
})();

/* 3. plak: every arrangement */
function perms(a) { if (a.length <= 1) return [a]; const out = []; a.forEach((x, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).forEach(p => out.push([x].concat(p)))); return out; }
let arr = 0, bad = 0;
for (const r of C.rounds('plak')) {
  for (const decoy of [false, true]) {
    const base = C.newState(r, 0, { decoy });
    const ids = base.lumps.map(l => l.id);
    is(ids.length === r.n + (decoy ? 1 : 0), `${r.word.word}: ${ids.length} lumps with the decoy ${decoy ? 'on' : 'off'}`);
    for (const p of perms(ids)) {
      for (const len of [p.length, p.length - 1].filter(x => x >= 1)) {
        const st = C.newState(r, 0, { decoy }), use = p.slice(0, len);
        use.forEach(id => C.place(st, id));
        const s = use.map(id => C.lump(st, id).s), J = C.joints(st);
        arr++;
        const wantJ = s.slice(1).map((x, i) => s[i] >= 0 && x === s[i] + 1);
        if (J.join() !== wantJ.join()) bad++;
        const res = C.check(st), hasDecoy = s.includes(-1), trueLeft = r.n - s.filter(x => x >= 0).length;
        const want = hasDecoy ? 'decoy' : trueLeft ? 'tub' : (s.every((x, i) => x === i) ? 'ok' : 'joints');
        if (res.result !== want) { bad++; if (bad < 4) console.error(`  ${r.word.word} ${JSON.stringify(s)} → ${res.result}, want ${want}`); }
        if (want === 'decoy' && st.row.some(id => C.lump(st, id).s < 0)) bad++;
        if ((want === 'tub' || want === 'ok') && st.misses !== 0) bad++;
      }
    }
  }
}
is(bad === 0, `plak: joints, decoy and verdict exact over ${arr} arrangements`);
(() => {
  const r = C.rounds('plak').find(x => x.word.word === 'boekenkast'), st = C.newState(r, 0);
  ['l2', 'l1', 'l0'].forEach(id => C.place(st, id)); C.check(st); is(C.hint(st) === 'hintJoint', 'plak miss 1: a wrong joint');
  C.check(st); is(st.help === 2 && st.row.join() === 'l0' && st.locked === 'l0' && C.hint(st) === 'hintFirst', 'plak miss 2: the FIRST klankgroep locks at the start');
  is(C.remove(st, 'l0') === false, 'the locked lump stays');
  C.place(st, 'l2', 0); is(st.row[0] === 'l0', 'nothing goes before the locked lump');
})();

/* 4. letters */
for (const r of C.rounds('letters')) {
  const w = r.word, nc = C.cells(w.word).length;
  is(JSON.stringify(C.seams(w)) === JSON.stringify(SEAMS[w.word]), `${w.word}: seams ${JSON.stringify(C.seams(w))} = oracle ${JSON.stringify(SEAMS[w.word])}`);
  if (w.word.includes('ij')) is(C.cells(w.word).includes('ij') && C.cells(w.word).join('') === w.word, `${w.word}: "ij" is one letter cell`);
  let st = C.newState(r, 0);
  const z = C.check(st);
  is(SEAMS[w.word].length ? (z.result === 'empty' && st.misses === 0) : z.result === 'ok', `${w.word}: zero cuts — ${SEAMS[w.word].length ? 'asks' : 'right'}`);
  for (let g = 1; g < nc; g++) {
    st = C.newState(r, 0); C.chop(st, g / nc); const res = C.check(st), atSeam = SEAMS[w.word].includes(g), all = SEAMS[w.word].length === 1 && atSeam;
    if (all) is(res.result === 'ok', `${w.word} cut at ${g}: right`);
    else { is(res.result !== 'ok' && st.misses === 1, `${w.word} cut at ${g}: a miss`); is(st.cuts.every(c => SEAMS[w.word].includes(c)), `${w.word} cut at ${g}: an inner cut heals`); }
  }
}
(() => { const r = C.rounds('letters').find(x => x.word.word === 'bij'), st = C.newState(r, 0); C.chop(st, 0.5); is(C.check(st).result === 'oneOnly' && C.hint(st) === 'hintOneOnly', 'bij chopped: "één klankgroep, niet hakken"'); })();

/* 5. the tub */
for (const decoy of [false, true]) {
  const R = C.rounds('plak'); let two = 0, twoRead = 0;
  R.forEach(r => {
    const reads = [0, 1].map(p => { const d = C.deal(r, p, decoy).filter(x => x >= 0); return d.join() === d.slice().sort((a, b) => a - b).join(); });
    if (r.n === 2) { two += 2; twoRead += reads.filter(Boolean).length; }
    else for (let p = 0; p < 12; p++) { const d = C.deal(r, p, decoy).filter(x => x >= 0), id = d.slice().sort((a, b) => a - b); is(d.join() !== id.join() && d.join() !== id.slice().reverse().join(), `${r.word.word} pass ${p}: 3+ lumps never in reading order nor reversed`); }
    if (decoy) { const at = new Set([0, 1, 2, 3].map(p => C.deal(r, p, true).indexOf(-1))); is(at.size >= 2, `${r.word.word}: the decoy's place moves (${[...at]})`); }
  });
  is(twoRead * 2 === two, `two lumps: in reading order exactly half the time over two passes (${twoRead}/${two}, decoy ${decoy})`);
}

/* 6. decoys never spell a library word with the lumps */
for (const r of C.rounds('plak')) {
  const parts = r.word.syl.concat([r.word.decoy]);
  const subsets = []; for (let m = 1; m < (1 << parts.length); m++) { const s = parts.filter((_, i) => m & (1 << i)); if (s.includes(r.word.decoy) && s.length >= 2) subsets.push(s); }
  const hits = []; subsets.forEach(s => perms(s).forEach(p => { const w = p.join(''); if (LABELS.has(w)) hits.push(w); }));
  is(!hits.length, `${r.word.word}: the decoy ${r.word.decoy} spells no library word (${hits.join(',')})`);
}

/* 7. ladder: a new move takes the help away */
(() => {
  const r = C.rounds('hak').find(x => x.word.word === 'regenboog'); const st = C.newState(r, 0);
  C.chop(st, 0.5); C.check(st); is(C.hint(st) === 'hintShort', 'hak too few: hintShort');
  C.chop(st, 0.25); is(!st.show && C.hint(st) === null, 'a new move takes the help away');
  C.chop(st, 0.75); C.check(st); is(st.help === 2 && C.hint(st) === 'hintClap', 'hak miss 2: clap and chop where it lights up');
})();

/* 8. order */
(() => { let s = 3; const rnd = () => { s = (s * 1103515245 + 12345) >>> 0; return s / 4294967296; }; for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let prev = null, rep = 0, bad = 0; for (let t = 0; t < 2000; t++) { const o = C.order(R, rnd, prev); if (o.slice().sort((a, b) => a - b).join() !== R.map((_, i) => i).join()) bad++; if (prev && prev.join() === o.join()) rep++; prev = o; } is(!bad && !rep, `${lv}: every order a permutation, never the previous one`); } })();

/* 8b. the never-repeat rule, deterministically: the SAME random stream with the previous order must still give a different
   order (a random trial almost never draws the same permutation twice, so sampling alone cannot see this rule) */
(() => { const seeded = (k) => { let s = k; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }; for (const lv of C.LEVEL_KEYS) { const R = C.rounds(lv); let same = 0; for (let k = 1; k <= 50; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; } is(same === 0, `${lv}: the same stream with the previous order never gives that order again (${same}/50)`); } })();

/* 9. strings */
const A = (() => { const ctx = { window: {}, ClaySnakeCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'clay-snake-activity.js'), 'utf8') + '\n;this.__A = ClaySnakeActivity;', ctx); return ctx.__A; })();
const ph = (x) => (x.match(/\{\w+\}/g) || []).sort().join();
for (const k of Object.keys(A.strings)) { const v = A.strings[k]; is(!!v.nl && !!v.en && ph(v.nl) === ph(v.en), `strings ${k}: nl + en, same placeholders`); is(!/\b(gratis|free)\b/i.test(v.nl + v.en), `strings ${k}: no price word`); }
const coreSrc = fs.readFileSync(path.join(process.env.CS_CORE_DIR || MT, 'clay-snake-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'clay-snake-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`);

/* 10. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'clay-snake-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'syllable-builder.bouw-het-woord-met-klankgroepen.rf-k-2-b' && rows[0].tool === 'clay-snake-activity', 'manifest: the kept id, the new tool');
for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.levels[lv].map(x => x.id)) === JSON.stringify(C.rounds(lv).map(r => r.id)), `manifest ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left syllable-builder-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show 355227c2:"mini tools/syllable-builder-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) for (const k of ['slug', 'page_title', 'page_intro', 'alignment']) is(JSON.stringify(HEADROW[k]) === JSON.stringify(rows[0][k]), `manifest ${k}: frozen`);
else is(false, 'manifest: the frozen row could be read from git');

console.log(`verify-clay-snake-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
