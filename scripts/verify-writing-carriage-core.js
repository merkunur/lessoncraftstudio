#!/usr/bin/env node
/* =====================================================================
   verify-writing-carriage-core.js — the gate of ACTIVITY #73, THE WRITING
   CARRIAGE (Penny's Alphabet Trace, L.K.1.a, 11 locales). Its own ground
   truth, written here, never read off the core:
     1. every locale's alphabet in school order, both cases (hand-written
        lists: de Ä Ö Ü + ß lowercase only; es Ñ after N; sv/fi Å Ä Ö; da/no
        Æ Ø Å; it J K W X Y the foreign letters), and every set (the ranges,
        the vowels, the first letters, the padding of a short vowel set)
     2. an on-path oracle traces AND writes every letter of every alphabet
        in every locale; the paper (the step) only moves on a formed letter
     3. a reversed tracer, a wrong-start tracer, a scribbler, an
        out-of-order tracer, a single tap and two taps earn nothing
     4. Ä Ö Ü Å Ñ Ø: the base letter's strokes first, unchanged, the mark
        LAST (above the letter; Ø's slash through the bowl)
     5. the write step is judged at 1.3 × the trace corridor on the hidden
        path: a hand 10 units off writes, the same hand traces nothing
     6. the steps by Practice; a pad round is write-only; Check with nothing
        drawn is no miss, an unfinished letter is a miss with its help
        (light / shadow / spark), a second miss in writing turns the step
        back into tracing; a wrong-end line is pale with its hint, no miss
     7. pass 1 is alphabet order; 500 later passes never repeat the last
        order or start with its last letter; the ruling is Letter Studio's
        own table; layout floors; strings × 11; the manifest mirror, the
        tool repointed, the frozen en..nl metadata, the new fr sv da no fi
   Usage: node scripts/verify-writing-carriage-core.js  (WC_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const DIR = process.env.WC_CORE_DIR || MT;
const ctx = { window: {} }; ctx.self = ctx.window; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(MT, 'alphabet-trace-core.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(MT, 'stroke-trace-core.js'), 'utf8'), ctx);
const core = { window: ctx.window, AlphabetTraceCore: ctx.window.AlphabetTraceCore, StrokeTraceCore: ctx.window.StrokeTraceCore, module: { exports: {} } }; core.self = core; core.exports = core.module.exports; vm.createContext(core);
vm.runInContext(fs.readFileSync(path.join(DIR, 'writing-carriage-core.js'), 'utf8'), core);
const C = core.module.exports, S = ctx.window.StrokeTraceCore, G = ctx.window.AlphabetTraceCore.GLYPHS;
const A = (() => { const c = { window: {}, WritingCarriageCore: C }; vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(DIR, 'writing-carriage-activity.js'), 'utf8') + '\nthis.__A = WritingCarriageActivity;', c); return c.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= +(process.env.WC_SHOW || 60)) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const FROZEN = '040f15ffc7d317329317473aed230afd0d09f58c';

/* 1 — the gate's own alphabets and sets */
const AZ = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
const UP = { en: AZ, nl: AZ, it: AZ, pt: AZ, fr: AZ, de: AZ + ' Ä Ö Ü', es: 'A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z', sv: AZ + ' Å Ä Ö', fi: AZ + ' Å Ä Ö', da: AZ + ' Æ Ø Å', no: AZ + ' Æ Ø Å' };
const VOW = { en: 'A E I O U O~2 U~2', nl: 'A E I O U O~2 U~2', it: 'A E I O U O~2 U~2', pt: 'A E I O U O~2 U~2', es: 'A E I O U O~2 U~2', fr: 'A E I O U Y O~2', de: 'A E I O U Ä Ö Ü', sv: 'A E I O U Y Å Ä Ö', fi: 'A E I O U Y Ä Ö', da: 'A E I O U Y Æ Ø Å', no: 'A E I O U Y Æ Ø Å' };
const SZ = { sv: 'S T U V W X Y Z Å Ä Ö', fi: 'S T U V W X Y Z Å Ä Ö', da: 'S T U V W X Y Z Æ Ø Å', no: 'S T U V W X Y Z Æ Ø Å' };
for (const loc of LOCS) {
  const up = UP[loc], lo = up.split(' ').map(c => c.toLocaleLowerCase()).join(' ') + (loc === 'de' ? ' ß' : '');
  is(C.alphabet(loc, 'upper').join(' ') === up, `${loc}: capitals in school order`);
  is(C.alphabet(loc, 'lower').join(' ') === lo, `${loc}: lowercase in school order`);
  is(C.ids(loc, 'upper', 'all').join(' ') === up && C.ids(loc, 'lower', 'all').join(' ') === lo, `${loc}: "All" is the whole alphabet`);
  is(C.ids(loc, 'upper', 'af').join(' ') === 'A B C D E F' && C.ids(loc, 'upper', 'gl').join(' ') === 'G H I J K L', `${loc}: A–F, G–L`);
  is(C.ids(loc, 'upper', 'mr').join(' ') === (loc === 'es' ? 'M N Ñ O P Q R' : 'M N O P Q R'), `${loc}: M–R`);
  is(C.ids(loc, 'upper', 'sz').join(' ') === (SZ[loc] || 'S T U V W X Y Z'), `${loc}: the S set`);
  is(C.ids(loc, 'upper', 'vowels').join(' ') === VOW[loc] && C.ids(loc, 'upper', 'vowels').length >= 7, `${loc}: vowels (${C.ids(loc, 'upper', 'vowels').join(' ')})`);
  is(C.ids(loc, 'lower', 'vowels').join(' ') === VOW[loc].split(' ').map(x => x.replace(/^./, c => c.toLocaleLowerCase())).join(' '), `${loc}: lowercase vowels`);
  is(C.ids(loc, 'upper', 'first').join(' ') === 'L T I E H F O C' && C.ids(loc, 'lower', 'first').join(' ') === 'l t i o c a d', `${loc}: first letters`);
  is(JSON.stringify(C.foreign(loc)) === JSON.stringify(loc === 'it' ? ['J', 'K', 'W', 'X', 'Y'] : []), `${loc}: foreign letters`);
}

/* 2 + 3 — the oracle writes every letter; the cheats earn nothing */
const oracleStroke = (st) => { const L = st.tr.lanes[st.tr.idx]; C.down(st, L.pts[0]); for (let i = 1; i < L.pts.length; i++) C.move(st, L.pts[i]); return C.up(st); };
const off = (pts, dx, dy) => pts.map(p => ({ x: p.x + dx, y: p.y + dy }));
for (const loc of LOCS) for (const lv of C.LEVELS) for (const id of C.ids(loc, lv, 'all')) {
  const r = C.round(loc, lv, 'all', id, 'tw'), tag = `${loc} ${lv} ${id}`;
  is(r.letter === id && JSON.stringify(r.steps) === '["trace","write"]' && r.strokes.length >= 1, `${tag}: one letter, trace then write`);
  const st = C.newState(r); let ok = true, moved = 0;
  for (let step = 0; step < 2 && ok; step++) for (let k = 0; k < r.strokes.length; k++) {
    const u = oracleStroke(st);
    const want = k < r.strokes.length - 1 ? 'stroke' : step === 0 ? 'letter' : 'round';
    if (!u || u.res !== want) { ok = false; break; }
    if (u.res !== 'stroke') moved++;
  }
  is(ok && st.done && moved === 2 && st.inks.length === 2 && st.misses === 0, `${tag}: the oracle traces and writes it`);
  /* reversed: earns nothing on any stroke longer than a dot */
  const L0 = S.prepare(r.strokes), long = L0.findIndex(l => !l.isDot && l.total > 20);
  if (L0[0] && !L0[0].isDot && L0[0].total > 20) {
    const s2 = C.newState(r), pts = L0[0].pts.slice().reverse();
    C.down(s2, pts[0]); for (let i = 1; i < pts.length; i++) C.move(s2, pts[i]); const u2 = C.up(s2);
    is(u2.res === 'incomplete' && s2.tr.idx === 0 && s2.tr.u === 0 && s2.step === 0 && C.hint(s2) === 'hWrongEnd' && s2.misses === 0, `${tag}: a reversed stroke earns nothing (wrong-end hint, no miss)`);
    /* wrong start: from the middle to the end */
    /* wrong start: from the middle to the end (on strokes long enough that the middle is beyond the tracer's start window) */
    if (L0[0].total > 40) { const s3 = C.newState(r), half = L0[0].pts.slice(Math.floor(L0[0].pts.length / 2));
    C.down(s3, half[0]); for (let i = 1; i < half.length; i++) C.move(s3, half[i]); is(C.up(s3).res === 'incomplete' && s3.tr.idx === 0 && C.hint(s3) === 'hWrongEnd', `${tag}: a stroke started in the middle earns nothing (wrong-end hint)`); }
    /* scribble beside the letter */
    const s4 = C.newState(r); C.down(s4, { x: 2, y: 2 }); for (let i = 0; i < 20; i++) C.move(s4, { x: 2 + (i % 3), y: 2 + i }); is(C.up(s4).res === 'incomplete' && s4.tr.u === 0, `${tag}: a scribble earns nothing`);
    /* two taps: the start, then the end */
    const s5 = C.newState(r), P0 = L0[0].pts; C.down(s5, P0[0]); C.up(s5); C.down(s5, P0[P0.length - 1]); is(C.up(s5).res === 'incomplete' && s5.tr.idx === 0, `${tag}: two taps earn nothing`);
  }
  if (r.strokes.length >= 2 && !L0[1].isDot) {
    const s6 = C.newState(r), P1 = L0[1].pts; C.down(s6, P1[0]); for (let i = 1; i < P1.length; i++) C.move(s6, P1[i]); is(C.up(s6).res === 'incomplete' && s6.tr.idx === 0, `${tag}: the second stroke first earns nothing`);
  }
}

/* 4 — the marks are written last */
const MARK = { 'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'Å': 'A', 'Ñ': 'N', 'Ø': 'O', 'ä': 'a', 'ö': 'o', 'ü': 'u', 'å': 'a', 'ñ': 'n', 'ø': 'o' };
for (const [ch, base] of Object.entries(MARK)) {
  const g = C.glyph(ch), b = G[base], top = Math.min(...b.flat().map(p => p.y));
  is(g && g.length > b.length && JSON.stringify(g.slice(0, b.length)) === JSON.stringify(b), `${ch}: the ${base} strokes first, unchanged`);
  const marks = g.slice(b.length);
  if ('Øø'.includes(ch)) is(marks.length === 1 && marks[0][0].y > marks[0][marks[0].length - 1].y, `${ch}: one slash through the bowl, last`);
  else is(marks.every(m => Math.max(...m.map(p => p.y)) < top), `${ch}: the mark above the letter, last`);
}
for (const ch of ['Æ', 'æ', 'ß']) { const st = C.newState(C.round(ch === 'ß' ? 'de' : 'da', ch === 'Æ' ? 'upper' : 'lower', 'all', ch, 't')); let n = 0; while (!st.done && n++ < 9) oracleStroke(st); is(st.done, `${ch}: an authored glyph the oracle writes`); }
is(Math.min(...C.glyph('ß').flat().map(p => p.y)) < 44 && Math.abs(Math.max(...C.glyph('ß').flat().map(p => p.y)) - 84) < 0.6, 'ß reaches the ascender and stands on the baseline (German school print does not descend)');

/* 5 — the write step: the hidden path at 1.3 × the corridor */
is(Math.abs(C.WRITE_CORRIDOR - S.CORRIDOR * 1.3) < 0.06, `the write corridor is 1.3 × (${C.WRITE_CORRIDOR})`);
{
  const r = C.round('en', 'upper', 'all', 'L', 'tw'), st = C.newState(r), dx = (S.CORRIDOR + C.WRITE_CORRIDOR) / 2;
  const L0 = st.tr.lanes[0].pts, shifted = off(L0, dx, 0);
  C.down(st, shifted[0]); for (let i = 1; i < shifted.length; i++) C.move(st, shifted[i]); is(C.up(st).res === 'incomplete', 'a hand ' + dx.toFixed(1) + ' units off traces nothing');
  C.erase(st); oracleStroke(st); oracleStroke(st); is(C.kind(st) === 'write', 'then the write step');
  const L1 = st.tr.lanes[0].pts, sh1 = off(L1, dx, 0); C.down(st, sh1[0]); for (let i = 1; i < sh1.length; i++) C.move(st, sh1[i]);
  is(C.up(st).res === 'stroke', 'the same hand ' + dx.toFixed(1) + ' units off writes');
  const st2 = C.newState(C.round('en', 'upper', 'all', 'L', 'tw')); oracleStroke(st2); oracleStroke(st2);
  const sh2 = off(st2.tr.lanes[0].pts, C.WRITE_CORRIDOR + 3, 0); C.down(st2, sh2[0]); for (let i = 1; i < sh2.length; i++) C.move(st2, sh2[i]);
  is(C.up(st2).res === 'incomplete', 'a hand outside the write corridor writes nothing');
}

/* 6 — steps, Check, help */
for (const loc of LOCS) {
  is(JSON.stringify(C.round(loc, 'upper', 'all', 'B', 'tww').steps) === '["trace","write","write"]' && JSON.stringify(C.round(loc, 'upper', 'all', 'B', 't').steps) === '["trace"]', `${loc}: steps by Practice`);
}
is(JSON.stringify(C.round('en', 'upper', 'vowels', 'O~2', 'tw').steps) === '["write"]' && C.round('en', 'upper', 'vowels', 'O~2', 'tw').letter === 'O', 'a pad round is write-only, the letter O');
is(JSON.stringify(C.round('en', 'upper', 'vowels', 'O~2', 't').steps) === '["trace"]', 'a pad round under Trace only is traced');
{
  const st = C.newState(C.round('en', 'upper', 'all', 'E', 'tw'));
  let c = C.check(st); is(!c.ok && c.reason === 'empty' && st.misses === 0 && C.hint(st) === 'hEmpty' && !C.helpOf(st), 'Check with nothing drawn: a hint, no miss');
  const p = st.tr.lanes[0].pts; C.down(st, p[0]); for (let i = 1; i < 4; i++) C.move(st, p[i]); C.up(st);
  c = C.check(st); is(c.reason === 'unfinished' && st.misses === 1 && C.hint(st) === 'hUnfinished' && C.helpOf(st).light && C.helpOf(st).stroke === 0, 'an unfinished trace: miss 1, the travelling light');
  c = C.check(st); is(st.misses === 2 && C.hint(st) === 'hMiss2' && C.helpOf(st).spark, 'miss 2: the spark');
  C.down(st, p[0]); is(!C.helpOf(st), 'a new stroke takes the help away');
  C.up(st);
  const w = C.newState(C.round('en', 'upper', 'all', 'L', 'tw')); oracleStroke(w); oracleStroke(w);
  is(C.kind(w) === 'write', 'the write step');
  C.down(w, { x: 70, y: 30 }); for (let i = 0; i < 12; i++) C.move(w, { x: 70 + i, y: 30 + i }); C.up(w);
  c = C.check(w); is(c.reason === 'off' && C.hint(w) === 'hOff' && C.helpOf(w).shadow && w.misses === 1, 'writing off the path: miss 1, the shadow letter');
  c = C.check(w); is(c.reason === 'toTrace' && C.kind(w) === 'trace' && w.ink.length === 0 && C.hint(w) === 'hMiss2', 'miss 2 in writing: the step turns back into tracing');
  oracleStroke(w); is(w.tr.idx === 1 && !w.done, 'and the trace goes on'); oracleStroke(w); is(w.done, 'the letter finishes');
  const e = C.newState(C.round('en', 'upper', 'all', 'T', 'tw')); C.down(e, e.tr.lanes[0].pts[0]); for (let i = 1; i < 5; i++) C.move(e, e.tr.lanes[0].pts[i]); C.up(e); C.erase(e); is(e.ink.length === 0 && e.tr.u === 0 && e.misses === 0, 'the eraser clears this letter only, no miss');
  is(C.check(C.newState(C.round('en', 'upper', 'all', 'T', 'tw'))).reason === 'empty', 'Check before anything: empty');
}

/* 7 — plan, ruling, layout, strings, manifest */
{
  let bad = 0;
  for (let s = 0; s < 500; s++) {
    const rnd = C.seeded('p' + s);
    for (const loc of ['en', 'sv', 'es']) for (const lv of C.LEVELS) for (const set of C.SETS) {
      const a = C.plan(loc, lv, set, rnd, null, 0), b = C.plan(loc, lv, set, rnd, a, 1), c2 = C.plan(loc, lv, set, rnd, b, 2);
      if (a.join() !== C.ids(loc, lv, set).join()) bad++;
      if (b.join() === a.join() || b[0] === a[a.length - 1] || c2.join() === b.join() || c2[0] === b[b.length - 1] || b.slice().sort().join() !== a.slice().sort().join()) bad++;
    }
  }
  is(!bad, `pass 1 in alphabet order, every later pass a new order of the same letters (${bad})`);
}
{
  const lines = fs.readFileSync(path.join(MT, 'letter-studio.js'), 'utf8').split('\n');
  const a = lines.findIndex(l => l.startsWith('var LetterStudio = {')), b = lines.findIndex((l, i) => i > a && l === '};');
  const c = { window: {} }; vm.createContext(c); vm.runInContext(lines.slice(a, b + 1).join('\n') + '\nthis.LS = LetterStudio;', c);
  for (const loc of LOCS) is(JSON.stringify(C.ruling(loc)) === JSON.stringify(c.LS.rulingFor(loc)), `${loc}: the ruling is Letter Studio's (${C.ruling(loc).system})`);
}
is(C.layout(704).xh === 84 && C.layout(360).xh === 64 && C.layout(300).xh === 58 && C.layout(704).scale * 40 === 84, 'x-height 84 px at 704, 64 on a phone, 58 below 320');
for (const [k, v] of Object.entries(A.strings)) for (const loc of LOCS) { is(typeof v[loc] === 'string' && v[loc].trim(), `string ${k}: ${loc}`); if (loc === 'fr') is(!/ [?!:;»]|« /.test(v[loc]), `fr string ${k}: narrow no-break space`); }
{
  const row = JSON.parse(fs.readFileSync(path.join(MT, 'penny-alphabet-trace-activities.json'), 'utf8'))[0];
  const h = crypto.createHash('sha1').update(JSON.stringify(['slug', 'page_title', 'page_intro'].map(k => ['en', 'de', 'es', 'pt', 'it', 'nl'].map(l => row[k][l])))).digest('hex');
  is(h === FROZEN, `the frozen en..nl metadata is untouched (${h})`);
  is(row.tool === 'writing-carriage-activity' && !row.params.rounds, 'the row runs the carriage, its params a mirror');
  for (const loc of LOCS) for (const lv of C.LEVELS) for (const set of C.SETS) is(row.params.byLocale[loc][lv][set] === C.ids(loc, lv, set).length, `mirror ${loc} ${lv} ${set}`);
  for (const loc of ['fr', 'sv', 'da', 'no', 'fi']) is(row.slug[loc] && /^[a-z0-9-]+$/.test(row.slug[loc]) && row.page_title[loc] && row.page_intro[loc], `${loc}: slug, title, intro`);
}
console.log(`verify-writing-carriage-core: ${PASS} passed, ${FAIL} failed`);
process.exit(FAIL ? 1 : 0);
