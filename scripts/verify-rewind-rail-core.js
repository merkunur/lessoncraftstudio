#!/usr/bin/env node
/* =====================================================================
   verify-rewind-rail-core.js — the gate of ACTIVITY #74, THE REWIND RAIL
   (Snippy's Letter Trace, L.K.1.a, 11 locales). Its own ground truth,
   written here, never read off the core:
     1. every set's letters in every locale (hand-written lists; a locale
        letter joins the set of its base letter), each set ≥ 7 letters
     2. writers built from the glyph data the gate loads itself: the oracle
        (every stroke from its start, the right way, in order — straight and
        WOBBLY by ±3 units) is right on every letter of every set in every
        locale; reversed → 'direction' at that stroke; begun at the wrong
        place → 'start'; strokes 1 and 2 swapped → 'order' at the first
        stroke; a stroke left out → 'shape'; a scribble → 'shape'; the whole
        letter 20 units off → not right
     3. the nearest-dot-first writer (no handwriting knowledge: the starts by
        their distance to the top-left corner) — its fail rate per set is
        MEASURED and frozen as a ratchet; a dot-tapper with no line fails all
     4. the replay: a timeline is every stroke's length in turn with a lift
        between; u = 0 shows nothing, u = 1 everything, the strokes shown
        never decrease with u; the bands are one per stroke, in that stroke's
        colour, chevrons on a reversed stroke, grey on a lost one; on a miss
        the rewind stops INSIDE the offending stroke, on a right letter at 1
     5. the steps: guided and the road are judged by the live tracer (a line
        from the wrong end is pale and earns nothing; a formed letter is
        shown, then the next step); on my own an empty Check is no miss, a
        miss names the first disagreement, a second miss puts the road step
        back before "on my own"; a right letter ends the round
     6. the start dots: guided = the next one numbered with its arrow; the
        road = the next one, no number; on my own = every start, unnumbered
     7. 500 later passes never repeat the last order or start with its last
        letter; the word table: every picture exists in a colour theme and
        its label carries the letter (capital: it starts the label;
        lowercase: it starts the lowercased label, in de it stands inside
        the noun after the capital); strings × 11 and reachable; the
        manifest mirror, the tool repointed, en/fr metadata frozen, the nine
        new locales
   Usage: node scripts/verify-rewind-rail-core.js  (RR_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const DIR = process.env.RR_CORE_DIR || MT;
const ctx = { window: {} }; ctx.self = ctx.window; vm.createContext(ctx);
for (const f of ['alphabet-trace-core.js', 'stroke-trace-core.js']) vm.runInContext(fs.readFileSync(path.join(MT, f), 'utf8'), ctx);
const wcx = { window: ctx.window, AlphabetTraceCore: ctx.window.AlphabetTraceCore, StrokeTraceCore: ctx.window.StrokeTraceCore, module: { exports: {} } }; wcx.self = wcx; vm.createContext(wcx);
vm.runInContext(fs.readFileSync(path.join(MT, 'writing-carriage-core.js'), 'utf8'), wcx);
const W = wcx.module.exports, S = ctx.window.StrokeTraceCore, G52 = ctx.window.AlphabetTraceCore.GLYPHS;
const rcx = { window: ctx.window, WritingCarriageCore: W, StrokeTraceCore: S, module: { exports: {} } }; rcx.self = rcx; vm.createContext(rcx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'rewind-rail-core.js'), 'utf8'), rcx);
const C = rcx.module.exports;
const ACT = (() => { const c = { window: {}, RewindRailCore: C }; vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(DIR, 'rewind-rail-activity.js'), 'utf8') + '\nthis.__A = RewindRailActivity;', c); return c.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= +(process.env.RR_SHOW || 60)) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const SETS = ['s1', 's2', 's3', 's4', 'st', 'sl', 'cu', 'bs'];
const d = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/* 1 — the gate's own sets */
const BASE = { s1: 'c s i t a d j b f', s2: 'o g q e u l h', s3: 'n m r p k v w', s4: 'b d p q x y z', st: 'L T I E F H N', sl: 'A K M V W X Y Z', cu: 'C O Q G S U J', bs: 'B D P R J N Z' };
const EXTRA = {
  de: { s1: 'ä ß', s2: 'ö ü', sl: 'Ä', cu: 'Ö Ü' }, es: { s3: 'ñ', st: 'Ñ' },
  sv: { s1: 'ä å', s2: 'ö', sl: 'Ä Å', cu: 'Ö' }, fi: { s1: 'ä å', s2: 'ö', sl: 'Ä Å', cu: 'Ö' },
  da: { s1: 'å æ', s2: 'ø', sl: 'Å Æ', cu: 'Ø' }, no: { s1: 'å æ', s2: 'ø', sl: 'Å Æ', cu: 'Ø' }
};
for (const loc of LOCS) for (const set of SETS) {
  const want = BASE[set] + (EXTRA[loc] && EXTRA[loc][set] ? ' ' + EXTRA[loc][set] : '');
  const got = C.letters(loc, set).join(' ');
  is(got === want, `${loc} ${set}: the letters (${got} ≠ ${want})`);
  is(C.letters(loc, set).length >= 7, `${loc} ${set}: ≥ 7 letters`);
}
const ALL = {}; for (const loc of LOCS) { const u = new Set(); for (const set of SETS) C.letters(loc, set).forEach(c => u.add(c)); ALL[loc] = u; }
is([...ALL.en].filter(c => /[a-z]/.test(c)).length === 26 && [...ALL.en].filter(c => /[A-Z]/.test(c)).length === 26, 'en: every letter, both cases, in some set');
is(['Å', 'Ä', 'Ö', 'å', 'ä', 'ö'].every(c => ALL.sv.has(c)) && ['Æ', 'Ø', 'Å', 'æ', 'ø', 'å'].every(c => ALL.da.has(c) && ALL.no.has(c)) && ['Ä', 'Ö', 'Ü', 'ä', 'ö', 'ü', 'ß'].every(c => ALL.de.has(c)) && ALL.es.has('Ñ') && ALL.es.has('ñ'), 'the locale letters, both cases');

/* 2 — writers from the gate's own glyph data */
const glyph = ch => W.DATA.EXTRA[ch] || G52[ch];
const lanesOf = ch => S.prepare(glyph(ch));
const fwd = (L, step) => L.pts.filter((p, i) => i % (step || 3) === 0 || i === L.pts.length - 1).map(p => ({ x: p.x, y: p.y }));
let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
const wob = (pts, a) => pts.map((p, i) => i === 0 ? p : { x: p.x + (rnd() - 0.5) * 2 * a, y: p.y + (rnd() - 0.5) * 2 * a });
const isRing = L => !L.isDot && d(L.pts[0], L.pts[L.pts.length - 1]) < 1.2;
let rings = 0, multi = 0;
for (const loc of LOCS) for (const set of SETS) for (const ch of C.letters(loc, set)) {
  const tag = `${loc} ${set} ${ch}`, r = C.round(loc, set, ch, 'all'), Ls = lanesOf(ch);
  is(JSON.stringify(r.strokes) === JSON.stringify(glyph(ch)) && r.kinds.join() === 'guided,ckpt,own', `${tag}: the round carries the letter's own strokes and three steps`);
  const ok = C.grade(r.strokes, Ls.map(L => fwd(L)));
  is(ok.ok, `${tag}: the oracle is right (${ok.kind} at ${ok.child})`);
  const ok2 = C.grade(r.strokes, Ls.map(L => L.isDot ? fwd(L, 1) : wob(fwd(L), 3)));
  is(ok2.ok, `${tag}: a wobbly oracle (±3) is right (${ok2.kind} at ${ok2.child})`);
  const far = C.grade(r.strokes, Ls.map(L => fwd(L).map(p => ({ x: p.x + 20, y: p.y + 4 }))));
  is(!far.ok, `${tag}: the letter 20 units off is not right`);
  const k = Ls.findIndex(L => !L.isDot && L.total > 12);
  if (k >= 0) {
    const rev = Ls.map((L, i) => i === k ? fwd(L).reverse() : fwd(L));
    const g = C.grade(r.strokes, rev);
    is(!g.ok && g.kind === 'direction' && g.child === k, `${tag}: stroke ${k + 1} backwards → direction at ${k} (${g.kind} at ${g.child})`);
    const stop = C.stopAt(rev, g), tl = C.timeline(rev).segs[k];
    is(stop > tl.u0 && stop < tl.u1, `${tag}: the rewind stops inside the reversed stroke (${stop.toFixed(3)} in ${tl.u0.toFixed(3)}..${tl.u1.toFixed(3)})`);
    /* begun at the wrong place: a ring from its far side, the same way; a line from its middle */
    const L = Ls[k], half = Math.floor(L.pts.length / 2);
    const moved = isRing(L) ? L.pts.slice(half).concat(L.pts.slice(1, half + 1)) : L.pts.slice(half);
    if (isRing(L)) rings++;
    const ws = Ls.map((M, i) => i === k ? moved.filter((p, j) => j % 3 === 0) : fwd(M));
    const g2 = C.grade(r.strokes, ws);
    is(!g2.ok && g2.kind === 'start' && g2.child === k, `${tag}: stroke ${k + 1} begun at its ${isRing(L) ? 'far side' : 'middle'} → start (${g2.kind} at ${g2.child})`);
    if (L.total > 30) {
      const shortL = Ls.map((M, i) => i === k ? fwd(M).slice(0, Math.max(2, Math.floor(fwd(M).length * 0.4))) : fwd(M));
      const gs = C.grade(r.strokes, shortL);
      is(!gs.ok && gs.kind === 'shape' && gs.child === k, `${tag}: stroke ${k + 1} stopped at 40 % → shape (${gs.kind} at ${gs.child})`);
    }
    const drop = Ls.map(M => fwd(M)).filter((x, i) => i !== Ls.length - 1);
    const g3 = C.grade(r.strokes, drop.length ? drop : [[{ x: 4, y: 4 }, { x: 6, y: 6 }]]);
    is(!g3.ok && g3.kind === 'shape', `${tag}: the last stroke left out → shape (${g3.kind})`);
  }
  if (Ls.length > 1 && !Ls[0].isDot && !Ls[1].isDot) {
    multi++;
    const sw = Ls.map(L => fwd(L)); const t = sw[0]; sw[0] = sw[1]; sw[1] = t;
    const g = C.grade(r.strokes, sw);
    is(!g.ok && g.kind === 'order' && g.child === 0 && g.model === 0, `${tag}: strokes 1 and 2 swapped → order at the first stroke (${g.kind} at ${g.child})`);
    const bb = C.bands(sw, g.al);
    is(bb[0].color === C.DATA.COLORS[1] && bb[1].color === C.DATA.COLORS[0], `${tag}: the swapped strokes' bands wear the colours of the strokes they lie on`);
  }
  const scrib = [[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ x: 4 + (i % 2) * 8, y: 4 + i * 1.2 }))];
  is(!C.grade(r.strokes, scrib).ok && C.grade(r.strokes, scrib).kind === 'shape', `${tag}: a scribble in the corner → shape`);
  is(!C.grade(r.strokes, Ls.map(L => [{ x: L.pts[0].x, y: L.pts[0].y }])).ok, `${tag}: tapping the start dots writes nothing`);
}
is(rings >= 20 && multi >= 60, `the sample has rings (${rings}) and multi-stroke letters (${multi})`);

/* 3 — the nearest-dot-first writer, measured; the ratchet may only shrink the pass rate */
const HOMER_FAILS = { s1: 4, s2: 0, s3: 2, s4: 1, st: 1, sl: 3, cu: 0, bs: 0 };   /* en, measured 2026-10-23 */
for (const set of SETS) {
  let f = 0;
  for (const ch of C.letters('en', set)) {
    const Ls = lanesOf(ch), ord = Ls.map((L, i) => ({ i, d: d(L.pts[0], { x: 0, y: 0 }) })).sort((a, b) => a.d - b.d).map(o => o.i);
    if (!C.grade(glyph(ch), ord.map(i => fwd(Ls[i]))).ok) f++;
  }
  is(f >= HOMER_FAILS[set], `en ${set}: the nearest-dot-first writer fails ${f} (ratchet ≥ ${HOMER_FAILS[set]})`);
}

/* 4 — the replay */
for (const ch of ['a', 'E', 'i', 'Ø', 'm']) {
  const Ls = lanesOf(ch), polys = C.modelPolys(glyph(ch)); let prev = -1, mono = true;
  is(polys.length === Ls.length, `${ch}: one replay line per stroke`);
  for (let u = 0; u <= 1.0001; u += 0.01) { const s = C.scrub(polys, Math.min(1, u)), n = s.done.length + (s.cur !== null ? s.cur / 100 + 0.001 : 0); if (n < prev - 1e-9) mono = false; prev = n; }
  is(mono, `${ch}: the strokes shown never decrease as Snippy moves on`);
  is(C.scrub(polys, 0).done.length === 0 && C.scrub(polys, 0).cur === null && C.scrub(polys, 1).done.length === Ls.length, `${ch}: u 0 shows nothing, u 1 every stroke`);
  const tl = C.timeline(polys);
  is(tl.segs.length === Ls.length && tl.segs.every((s, i) => i === 0 || s.u0 > tl.segs[i - 1].u1) && Math.abs(tl.segs[tl.segs.length - 1].u1 - 1) < 1e-9, `${ch}: the timeline is the strokes in turn, a lift between`);
  const b = C.bands(polys, null);
  is(b.length === Ls.length && b.every((x, i) => x.color === C.DATA.COLORS[i % 6] && !x.reversed), `${ch}: Snippy's bands — one per stroke, stroke k in colour k`);
  const rev = Ls.map(L => fwd(L).reverse()), al = C.align(glyph(ch), rev), br = C.bands(rev, al);
  is(br.every((x, i) => Ls[i].isDot || x.reversed), `${ch}: a backwards stroke's band carries the chevrons`);
}
const lost = C.bands([[{ x: 2, y: 2 }, { x: 9, y: 3 }]], C.align(glyph('a'), [[{ x: 2, y: 2 }, { x: 9, y: 3 }]]));
is(lost[0].lost && lost[0].color === null, 'a stray mark is a grey (lost) band');
is(C.DATA.COLORS.length === 6 && new Set(C.DATA.COLORS).size === 6, 'six distinct stroke colours');
is(C.stopAt([[{ x: 0, y: 0 }, { x: 9, y: 0 }]], { ok: true }) === 1, 'a right letter rewinds to the end');

/* 5 + 6 — the steps */
const trace = (st) => { const L = st.tr.lanes[st.tr.idx]; C.down(st, L.pts[0]); for (let i = 1; i < L.pts.length; i++) C.move(st, L.pts[i]); return C.up(st); };
{
  const r = C.round('en', 's1', 'a', 'all'), st = C.newState(r);
  let dots = C.startDots(st);
  is(dots.length === 1 && dots[0].n === 1 && dots[0].arrow === true && C.roads(st).length === 2, 'guided: the next dot, numbered, with its arrow; the road shown');
  const L0 = st.tr.lanes[0]; C.down(st, L0.pts[L0.pts.length - 1]); for (let i = L0.pts.length - 2; i >= 0; i -= 2) C.move(st, L0.pts[i]); const ru = C.up(st);
  is(ru.res === 'incomplete' && st.ink[0].pale && st.tr.idx === 0 && st.misses === 0, 'guided: a line from the wrong end stays pale and earns nothing, no miss');
  is(C.hint(st) === 'hWrongEnd', 'the wrong-end hint');
  is(C.check(st).reason === 'unfinished' && st.misses === 0, 'guided: Check on an unfinished letter is a hint, no miss');
  is(trace(st).res === 'stroke' && trace(st).res === 'letter' && !!st.shown && st.shown.rec.length === 2, 'guided: the formed letter is shown with its recording (the pale line left out)');
  is(C.down(st, { x: 50, y: 50 }) === null && C.check(st).reason === 'busy', 'during the showing nothing is written or checked');
  C.advance(st);
  dots = C.startDots(st);
  is(C.kind(st) === 'ckpt' && dots.length === 1 && dots[0].n === null && !dots[0].arrow && C.roads(st).length === 2, 'the road step: the next dot, no number, no arrow; the road shown');
  trace(st); trace(st); C.advance(st);
  dots = C.startDots(st);
  is(C.kind(st) === 'own' && dots.length === 2 && dots.every(x => x.n === undefined) && C.roads(st).length === 0, 'on my own: every start dot, unnumbered, no road');
  is(C.check(st).reason === 'empty' && st.misses === 0 && C.hint(st) === 'hEmpty', 'on my own: an empty Check is no miss');
  const Ls = st.tr ? null : C.lanes(r.strokes);
  const write = (pl) => pl.forEach(p => { C.down(st, p[0]); p.slice(1).forEach(q => C.move(st, q)); C.up(st); });
  write([fwd(Ls[1]), fwd(Ls[0])]);
  let res = C.check(st);
  is(!res.ok && res.reason === 'order' && st.misses === 1 && C.hint(st) === 'hOrder' && C.kind(st) === 'own', 'on my own: stick first → miss 1, order');
  C.down(st, Ls[0].pts[0]);
  is(st.ink.length === 1 && st.cleared, 'the first stroke after a miss starts a clean page');
  C.up(st); C.erase(st);
  write([fwd(Ls[1]), fwd(Ls[0])]);
  res = C.check(st);
  is(!res.ok && res.back && C.kind(st) === 'ckpt' && st.kinds.join() === 'guided,ckpt,ckpt,own' && st.ghost && C.hint(st) === 'hMiss2' && !!st.tr, 'a second miss → the road step back before "on my own", with the spark');
  trace(st); trace(st); C.advance(st);
  is(C.kind(st) === 'own' && !st.ghost && st.tries === 0, 'after the road step: on my own again, the spark gone');
  write(Ls.map(L => fwd(L)));
  res = C.check(st);
  is(res.ok && st.done && res.graded.stop === 1, 'on my own: the right letter ends the round');
}
{
  const st = C.newState(C.round('en', 'cu', 'O', 'own'));
  is(st.kinds.join() === 'own' && C.newState(C.round('en', 'cu', 'O', 'p')).kinds.join() === 'guided,own', 'Steps: on my own only / road, then on my own');
  const L = C.lanes(st.r.strokes)[0]; C.down(st, L.pts[0]); L.pts.slice(1).forEach(p => C.move(st, p)); C.up(st); C.erase(st);
  is(st.ink.length === 0, 'Rub out clears the pad');
}

/* 7 — order, words, strings, manifest */
{
  let prev = C.plan('de', 's1', Math.random, null), ok = true;
  is(prev.slice().sort().join() === C.letters('de', 's1').slice().sort().join(), 'a pass is the set, reordered');
  for (let i = 0; i < 500; i++) { const o = C.plan('de', 's1', Math.random, prev); if (o.join() === prev.join() || o[0] === prev[prev.length - 1]) ok = false; prev = o; }
  is(ok, '500 passes: never the last order, never its last letter first');
}
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) if (f.endsWith('.json') && f[0] !== '_') { const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); PIC[j.dir] = j; }
const BW = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
let words = 0;
for (const loc of LOCS) for (const ch of ALL[loc]) {
  const w = C.word(loc, ch); if (!w) continue; words++;
  const th = PIC[w.theme], e = th && th.nouns[w.key];
  is(!!e && !BW.test(w.theme), `${loc} ${ch}: the picture ${w.theme}/${w.key} exists in a colour theme`);
  if (!e) continue;
  const lab = e.labels[loc] && e.labels[loc][0], up = ch === ch.toLocaleUpperCase(loc) && ch !== 'ß';
  const ok = up ? lab[0] === ch : loc === 'de' ? lab.indexOf(ch, 1) > 0 : lab.toLocaleLowerCase(loc)[0] === ch;
  is(!!lab && ok, `${loc} ${ch}: «${lab}» carries the letter`);
  is(fs.existsSync(path.join(ROOT, 'image-library-webp', e.src.replace(/^\/image-library-webp\//, ''))) || !fs.existsSync(path.join(ROOT, 'image-library-webp')), `${loc} ${ch}: the picture file exists`);
}
is(words >= 500, `the word table covers the letters (${words})`);
/* the letters with NO honest picture word, measured 2026-10-23 after the native review (a refusal is a ruling, not a gap to fill):
   a ratchet — a letter may leave this list (it gained a word), never join it */
const NOPIC = { en: '', de: 'cqhYÄSÖÜ', nl: 'qyYQ', da: 'åqwyWYÅQ', sv: 'qwyzWYZQ', no: 'åæqwyzWYZÅÆQ', es: 'uñÑU', it: '', pt: 'hyHY', fr: 'cquwWCQU', fi: 'åqöwxzWXZÅQÖ' };
for (const loc of LOCS) { const none = [...ALL[loc]].filter(ch => !C.word(loc, ch)); is(none.every(ch => NOPIC[loc].includes(ch)), `${loc}: no letter lost its picture (without: ${none.join('')})`); }
const KEYS = Object.keys(ACT.strings), SRC = fs.readFileSync(path.join(DIR, 'rewind-rail-activity.js'), 'utf8').replace(/strings: \{[\s\S]*?\n  \},\n/, '') + fs.readFileSync(path.join(DIR, 'rewind-rail-core.js'), 'utf8');   /* hint keys are named by the core */
for (const k of KEYS) {
  is(LOCS.every(l => typeof ACT.strings[k][l] === 'string' && ACT.strings[k][l].trim() && !/TODO/.test(ACT.strings[k][l])), `string ${k}: all 11 locales`);
  const reached = ['title'].includes(k) || new RegExp("['\"]" + k + "['\"]").test(SRC) || (/^c\d$/.test(k) && /'c' \+/.test(SRC)) || (/^(s1|s2|s3|s4|st|sl|cu|bs|pAll|pP|pOwn)$/.test(k));
  is(reached, `string ${k} is used`);
}
is(KEYS.filter(k => /^c\d$/.test(k)).length === C.DATA.COLORS.length, 'a colour name for every stroke colour');
for (const loc of LOCS) is(!/\bfree\b|gratis|kostenlos|gratuit|gratuito|ilmai/i.test(KEYS.map(k => ACT.strings[k][loc]).join(' ')), `${loc}: no "free" in the activity text`);
const man = JSON.parse(fs.readFileSync(path.join(MT, 'snippy-activities.json'), 'utf8'))[0];
is(man.tool === 'rewind-rail-activity' && man.id === 'snippy.letter-formation.l-k-1-a', 'the row runs the Rewind Rail');
const frozen = crypto.createHash('sha1').update(JSON.stringify(['en', 'fr'].map(l => [man.slug[l], man.page_title[l], man.page_intro[l]]))).digest('hex');
is(frozen === 'bb18fe031a81099157772d2da24ec670035d0f3c', `en/fr metadata frozen (${frozen})`);
for (const l of LOCS) is(man.slug[l] && /^[a-z0-9-]+$/.test(man.slug[l]) && man.page_title[l] && man.page_intro[l], `${l}: slug, title, intro`);
for (const l of LOCS) for (const s of SETS) is(man.params.byLocale[l][s] === C.letters(l, s).join(' '), `${l} ${s}: the manifest mirror`);
const L704 = C.layout(648), L360 = C.layout(312), L320 = C.layout(272);
is(L704.mode === 'wide' && L704.scale * 40 >= 110 && L704.pw * 2 + L704.gap <= 648 && L704.pic >= 96 && L704.knob >= 96, `704: two pads, x-height ${Math.round(L704.scale * 40)} px, pictures 96+`);
is(L360.mode === 'narrow' && L360.scale * 40 >= 80 && L360.pw <= 312 && L360.pic >= 64 && L320.scale * 40 >= 70, `phones: one pad, x-height ${Math.round(L360.scale * 40)} / ${Math.round(L320.scale * 40)} px`);

console.log(`verify-rewind-rail-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
