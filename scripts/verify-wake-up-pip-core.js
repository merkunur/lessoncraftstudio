#!/usr/bin/env node
/* =====================================================================
   verify-wake-up-pip-core.js — the gate of ACTIVITY #64, THE FLIPBOOK
   (Wake Up, Pip!, RL.K.2, 11 locales). Its own ground truth:
     1. the gate's own story table (true order, the beat the 3-page book
        drops); for EVERY permutation of every story's 3 and 4 pages the
        gate computes where the flip stops (the first page that comes
        before the one shown just ahead of it) and the core must agree —
        and the true order is the only stack that plays through
     2. the books: every picture exists, colour, labelled, not refused;
        at most two pictures a page; the story moves FORWARD through its
        pages (sun up, kite down, water up, the plant grows, each story's
        stage advances); every card of a round looks different from the
        others (a child can tell the pages apart)
     3. The missing page: the trivial page is a DEAD frame (its main
        picture exactly where the neighbour page has it), its thing is in
        no page of the story; the foreign thing is in no page of ANY
        story; the empty slot is first / middle / end 2 / 4 / 2; the key
        page's tray slot is balanced 3/3/2 per pass; trivial → dead,
        foreign → foreign, the key → plays through
     4. Fix the flipbook: the book arrives broken exactly as authored, the
        flip stops at the authored place, the fault spreads over the
        slots, and the repair plays through
     5. Story order: the loose pages never arrive in order or reversed;
        the order of a pass never repeats a book back to back across
        passes and never the previous order
     6. the round: an empty slot asks (no miss); a break is a miss; miss
        2 ghosts the right page into the first wrong slot; locked pages
        stay; a picked page swaps; Match the sentences: the strips never
        arrive in order, wrong ones slide back (a miss), all right wins;
        the retell ribbon is a starter OVER each page's own sentence
     7. strings × 11, the texts of every locale (8 × 4 captions, the
        trivial and foreign sentences, four starters), no 0 outside the
        count-down, fr narrow spaces; the manifest, its mirror, the frozen
        en..nl metadata (hash), the new sv da no fi slugs, titles, intros
   Usage: node scripts/verify-wake-up-pip-core.js  (WUP_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.WUP_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'wake-up-pip-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, WakeUpPipCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'wake-up-pip-activity.js'), 'utf8') + '\nthis.__A = WakeUpPipActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['spring/sun', 'camping/pine_tree', 'spring/watering_can', 'kitchen tools/jar', 'beach/rock', 'bakery/cake', 'desserts and sweets/cake', 'farm animals/duckling', 'beach/water', 'weather/sun', 'easter/duckling'];
const FROZEN = 'b6ccd070ef82eec4dc509502ceef615bb7bccd67';
/* the gate's own story table: the beat the 3-page book drops (1-based) */
const DROP = { sun: 3, kite: 3, crow: 3, seed: 2, rocket: 3, cake: 3, duckling: 1, sandcastle: 1 };
const STORIES = Object.keys(DROP);
const EMPTY = { sun: 1, kite: 3, crow: 2, seed: 4, rocket: 2, cake: 4, duckling: 1, sandcastle: 3 };
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const picOk = (p) => p && fs.existsSync(path.join(IMG, p.split('/').slice(0, -1).join('/'), p.split('/').pop() + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]) && !REFUSED.includes(p);
const perms = (a) => a.length < 2 ? [a] : a.flatMap((x, i) => perms(a.slice(0, i).concat(a.slice(i + 1))).map(p => [x].concat(p)));
const S = C.DATA.STORIES, TX = C.DATA.TEXT;

/* 1 — the order and where a flip stops */
for (const s of STORIES) for (const n of [3, 4]) {
  const P = C.storyPages('en', s, n), beats = P.map(p => p.beat);
  const want = [0, 1, 2, 3].filter(b => n === 4 || b + 1 !== DROP[s]);
  is(JSON.stringify(beats) === JSON.stringify(want), `${s} @${n}: the pages are beats ${want.map(b => b + 1)} (the 3-page book drops beat ${DROP[s]})`);
  const r = C.rounds('en', 'order', n).find(x => x.story === s);
  let plays = 0;
  for (const p of perms(P.map(x => x.id))) {
    const pos = p.map(id => P.findIndex(x => x.id === id));
    let at = -1; for (let i = 1; i < pos.length; i++) if (pos[i] < pos[i - 1]) { at = i; break; }
    const br = C.breakOf(r, p);
    is(at < 0 ? br === null : (br && br.at === at && br.kind === 'backwards'), `${s} @${n} ${pos.join('')}: the flip stops at ${at < 0 ? 'nothing' : at} (core ${JSON.stringify(br)})`);
    if (!br) plays++;
  }
  is(plays === 1, `${s} @${n}: only the true order plays through (${plays})`);
}

/* 2 — the books */
const cueKeys = ['ray', 'count', 'peep', 'seed', 'wave', 'water', 'pebbles', 'sky', 'shake'];
const sig = (f) => f.t.slice().sort((a, b) => a[1] - b[1]).map(t => [t[0], t[4] || 0, !!t[5], Math.round(Math.max(0, Math.min(1, (96 - t[2]) / 60)) * 4)].join(':')).join('|') + '#' + cueKeys.map(k => k + '=' + (f.d[k] === undefined ? '' : f.d[k])).join(',');
for (const s of STORIES) {
  S[s].beats.forEach((b, i) => {
    is(b.t.length >= 1 && b.t.length <= 2 && b.m >= 0 && b.m < b.t.length, `${s} beat ${i + 1}: one or two pictures, a main one`);
    b.t.forEach(t => is(picOk(t[0]) && t[0] !== C.PIP || (s === 'sun' && t[0] === C.PIP), `${s} beat ${i + 1}: ${t[0]} exists, colour, labelled, not refused`));
    b.t.forEach(t => is(t[3] >= 1, `${s} beat ${i + 1}: ${t[0]} at least the floor size`));
  });
  /* the story moves forward */
  const prog = S[s].prog, vals = S[s].beats.map(b => prog.pic ? ((b.t.find(t => t[0] === prog.pic) || [])[2]) : prog.draw === 'plant' ? b.d.plant : b.d[prog.draw]);
  const seen = vals.filter(v => v !== undefined);
  is(seen.length >= 3 && seen.every((v, i) => !i || (prog.dir > 0 ? v >= seen[i - 1] : v <= seen[i - 1])) && seen[seen.length - 1] !== seen[0], `${s}: the story moves forward through its pages (${seen.join(' → ')})`);
  for (const n of [3, 4]) {
    const cards = C.storyPages('en', s, n).concat([C.oddPage('en', s, n, 'trivial'), C.oddPage('en', s, n, 'foreign')]);
    is(new Set(cards.map(p => sig(p.frame))).size === cards.length, `${s} @${n}: every card of the round looks different`);
  }
}
is(picOk(C.PIP) && C.PIP === 'forest creatures/hedgehog', 'Pip is the library hedgehog');

/* 3 — The missing page */
const allStoryPics = new Set(); STORIES.forEach(s => S[s].beats.forEach(b => b.t.forEach(t => allStoryPics.add(t[0]))));
const where = { first: 0, middle: 0, end: 0 };
for (const s of STORIES) {
  const [e, tv, fo] = C.DATA.MISSING[s];
  is(e === EMPTY[s], `${s}: the empty slot is ${EMPTY[s]}`);
  where[e === 1 ? 'first' : e === 4 ? 'end' : 'middle']++;
  is(picOk(tv) && picOk(fo), `${s}: ${tv} and ${fo} exist, colour, labelled`);
  is(!S[s].beats.some(b => b.t.some(t => t[0] === tv)), `${s}: the trivial ${tv} is no page's picture (it stands in the background)`);
  is(!allStoryPics.has(fo), `${s}: the foreign ${fo} is in no page of any story`);
  for (const n of [3, 4]) {
    const r = C.rounds('en', 'missing', n).find(x => x.story === s), slot = Math.min(e, n) - 1;
    is(r.empty === slot, `${s} @${n}: the empty slot is ${slot + 1}`);
    const nb = r.pages[slot - 1] || r.pages[slot + 1], main = nb.frame.t[nb.frame.m];
    is(JSON.stringify(r.trivial.frame.t[0]) === JSON.stringify(main) && r.trivial.frame.t[1][0] === tv, `${s} @${n}: the trivial page is a dead frame (${main[0]} exactly as on its neighbour, plus ${tv})`);
    is(r.foreign.frame.t[1][0] === fo, `${s} @${n}: the foreign page brings ${fo}`);
    for (const [id, kind] of [[r.trivial.id, 'dead'], [r.foreign.id, 'foreign'], [r.pages[slot].id, null]]) {
      const st = C.newState(r, { tray: [r.pages[slot].id, r.trivial.id, r.foreign.id] });
      is(st.locked.filter(Boolean).length === n - 1 && st.sockets[slot] === null, `${s} @${n}: ${n - 1} pages locked, slot ${slot + 1} empty`);
      C.pick(st, id); C.put(st, slot); const res = C.flip(st);
      is(kind ? (!res.ok && res.kase === kind && res.at === slot) : res.ok, `${s} @${n}: ${id} → ${kind || 'plays through'} (${JSON.stringify(res)})`);
    }
  }
}
is(where.first === 2 && where.middle === 4 && where.end === 2, `The missing page: first / middle / end ${where.first}/${where.middle}/${where.end}`);
for (const n of [3, 4]) { const R = C.rounds('en', 'missing', n); for (let seed = 0; seed < 200; seed++) { const D = C.deal(R, C.seeded('m' + n + seed)), c = [0, 0, 0]; D.forEach((d, k) => { is(d.tray.slice().sort().join() === [R[k].pages[R[k].empty].id, R[k].trivial.id, R[k].foreign.id].sort().join(), `missing@${n}: the tray holds the key, the trivial and the foreign page`); c[d.tray.indexOf(R[k].pages[R[k].empty].id)]++; }); is(c.slice().sort().join() === '2,3,3', `missing@${n} seed ${seed}: the key page's slot 3/3/2 (${c})`); } }

/* 4 — Fix the flipbook */
const faults = new Set();
for (const s of STORIES) for (const n of [3, 4]) {
  const r = C.rounds('en', 'fix', n).find(x => x.story === s), st = C.newState(r, C.deal([r], C.seeded(s))[0]), f = C.DATA.FIX[s], ids = r.pages.map(p => p.id);
  if (f[0] === 'swap') {
    let a = Math.min(f[1], n), b = Math.min(f[2], n); if (a === b) a = b - 1;
    const want = ids.slice(); [want[a - 1], want[b - 1]] = [want[b - 1], want[a - 1]];
    is(JSON.stringify(st.sockets) === JSON.stringify(want) && !st.tray.length, `${s} @${n}: arrives with pages ${a} and ${b} swapped`);
    if (n === 4) { faults.add(a); faults.add(b); }
    let res = C.flip(st); is(!res.ok && res.kase === 'backwards' && res.at === b - 1, `${s} @${n}: the flip stops at slot ${b} (${JSON.stringify(res)})`);
    C.pick(st, st.sockets[a - 1]); C.put(st, b - 1); res = C.flip(st); is(res.ok, `${s} @${n}: swapped back, it plays through`);
  } else {
    const at = Math.min(f[1], n) - 1, want = ids.slice(); want[at] = r.foreign.id;
    is(JSON.stringify(st.sockets) === JSON.stringify(want) && st.tray.join() === ids[at], `${s} @${n}: arrives with a foreign page in slot ${at + 1}, the real page loose`);
    if (n === 4) faults.add(at + 1);
    let res = C.flip(st); is(!res.ok && res.kase === 'foreign' && res.at === at, `${s} @${n}: the flip stops at the foreign page`);
    C.pick(st, ids[at]); C.put(st, at); is(st.tray.join() === r.foreign.id, `${s} @${n}: the foreign page swaps out to the loose pages`);
    res = C.flip(st); is(res.ok, `${s} @${n}: repaired, it plays through`);
  }
}
is([1, 2, 3, 4].every(k => faults.has(k)), `Fix the flipbook: the faults touch every slot (${[...faults].sort()})`);

/* 5 — deals and order */
for (const n of [3, 4]) { const R = C.rounds('en', 'order', n); for (let seed = 0; seed < 300; seed++) { const D = C.deal(R, C.seeded('o' + n + seed)); D.forEach((d, k) => { const ids = R[k].pages.map(p => p.id); is(d.tray.slice().sort().join() === ids.slice().sort().join() && d.tray.join() !== ids.join() && d.tray.join() !== ids.slice().reverse().join(), `order@${n}: the loose pages are the story's, never in order or reversed`); }); } }
for (const lv of C.LEVELS) { const R = C.rounds('en', lv, 4); for (let seed = 0; seed < 200; seed++) { const o = C.order(R, C.seeded(lv + seed), null), o2 = C.order(R, C.seeded(lv + seed), o); is(new Set(o).size === 8 && o2.join() !== o.join() && R[o[o.length - 1]].story !== R[o2[0]].story, `${lv}: a permutation; the next pass never repeats it and never starts with the book just played`); } }

/* 6 — the round */
for (const loc of ['en', 'fi']) for (const n of [3, 4]) for (const r of C.rounds(loc, 'order', n)) {
  const ids = r.pages.map(p => p.id), st = C.newState(r, { tray: ids.slice().reverse() });
  let res = C.flip(st); is(res.kase === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', `${loc} ${r.id}: an empty slot asks, no miss`);
  ids.slice().reverse().forEach((id, i) => { C.pick(st, id); C.put(st, i); });
  res = C.flip(st); is(!res.ok && res.kase === 'backwards' && res.at === 1 && st.misses === 1 && C.hint(st) === 'hintBack' && !C.helpOf(st), `${loc} ${r.id}: reversed → stops at slot 2, miss 1`);
  res = C.flip(st); const h = C.helpOf(st);
  is(st.misses === 2 && C.hint(st) === 'hintMiss2' && h && h.ghost === 0 && h.page === ids[0], `${loc} ${r.id}: miss 2 ghosts page 1 into slot 1`);
  C.pick(st, st.sockets[0]); C.put(st, 1); is(st.sockets[1] === ids[n - 1] && st.sockets[0] === ids[n - 2], `${loc} ${r.id}: a picked page swaps with the one in the slot`);
  is(C.back(st, st.sockets[0]) && st.sockets[0] === null && st.tray.length === 1, `${loc} ${r.id}: a page taken out goes back to the loose pages`);
  st.tray = []; st.sockets = ids.slice(); res = C.flip(st); is(res.ok && st.done, `${loc} ${r.id}: in order, it plays through`);
  const rt = C.retell(r), S4 = TX[loc].st, lab = n === 4 ? S4 : [S4[0], S4[1], S4[3]];
  is(rt.length === n && rt.every((x, i) => x.starter === lab[i] && x.caption === r.pages[i].caption), `${loc} ${r.id}: the ribbon puts ${lab.join(' / ')} over each page's own sentence`);
  /* Match the sentences */
  const s2 = C.newState(r, { tray: [] }); s2.withCaptions = true; s2.sockets = ids.slice();
  res = C.flip(s2); is(res.kase === 'pages' && s2.phase === 'captions' && !s2.done, `${loc} ${r.id}: with sentences, the right order opens the sentence step`);
  C.startCaptions(s2, C.seeded(r.id)); is(s2.strips.length === n && s2.strips.join() !== ids.join(), `${loc} ${r.id}: the strips never arrive in order`);
  res = C.flip(s2); is(res.kase === 'capEmpty' && s2.misses === 0, `${loc} ${r.id}: an empty sentence slot asks`);
  s2.strips.slice().forEach((id, i) => { C.pickStrip(s2, id); C.putStrip(s2, i); });
  const wrongN = s2.caps.filter((c, i) => c !== ids[i]).length;
  res = C.flip(s2); is(wrongN ? (!res.ok && res.kase === 'capWrong' && res.wrong.length === wrongN && s2.caps.filter(Boolean).length === n - wrongN && s2.misses === 1) : res.ok, `${loc} ${r.id}: wrong sentences slide back (${wrongN})`);
  if (!s2.done) { s2.strips.slice().forEach(id => { C.pickStrip(s2, id); C.putStrip(s2, ids.indexOf(id)); }); res = C.flip(s2); }
  is(s2.done, `${loc} ${r.id}: every sentence under its picture — done`);
}
/* miss 2 ghosts the page that belongs in the FIRST wrong slot — here slot 2, not slot 1 */
for (const r of C.rounds('en', 'order', 4)) {
  const ids = r.pages.map(p => p.id), st = C.newState(r, { tray: [] }); st.sockets = [ids[0], ids[2], ids[1], ids[3]];
  C.flip(st); C.flip(st); const h = C.helpOf(st);
  is(h && h.ghost === 1 && h.page === ids[1], `${r.id}: pages 1 3 2 4 — miss 2 ghosts page 2 into slot 2`);
}
{ const r = C.rounds('en', 'missing', 4)[0], st = C.newState(r, { tray: [r.pages[r.empty].id, r.trivial.id, r.foreign.id] }), lockedId = st.sockets[(r.empty + 1) % 4];
  is(!C.pick(st, lockedId) && !C.back(st, lockedId), 'a locked page can be neither picked nor taken out'); }

/* 7 — texts, strings, manifest */
for (const loc of LOCS) {
  const L = TX[loc];
  is(L && L.st && L.st.length === 4 && L.st.every(x => x && x.trim()), `${loc}: four starters`);
  is(STORIES.every(s => L.c[s] && L.c[s].length === 4 && L.c[s].every(x => x && x.trim()) && L.tv[s] && L.fo[s]), `${loc}: 8 × 4 captions, the trivial and the foreign sentences`);
  const all = [].concat(...STORIES.map(s => L.c[s].concat([L.tv[s], L.fo[s]])), L.st);
  is(!all.some(x => /(^|\D)0(\D|$)/.test(x)), `${loc}: no 0 anywhere`);
  is(L.c.rocket[1].includes('3, 2, 1'), `${loc}: the count-down is numerals`);
  if (loc === 'fr') is(!all.some(x => / [?!:;»]/.test(x)), 'fr: narrow spaces in the stories');
  is(new Set(STORIES.map(s => L.c[s].join('|'))).size === 8, `${loc}: eight different stories`);
}
const SS = A.strings;
for (const k of Object.keys(SS)) for (const loc of LOCS) {
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  is(typeof SS[k][loc] === 'string' && SS[k][loc].trim(), `strings.${k}.${loc} authored`);
  is(ph(SS[k][loc]) === ph(SS[k].en), `strings.${k}.${loc}: same placeholders as en`);
  is(!/\b(free|gratis|kostenlos|gratuit|gratuito|grátis|ilmainen|gratuita)\b/i.test(SS[k][loc] || ''), `strings.${k}.${loc}: nothing "free"`);
  if (loc === 'fr') is(!/ [?!:;»]/.test(SS[k][loc]), `strings.${k}.fr: narrow spaces`);
}
const L1 = C.layout(704, 4), L2 = C.layout(330, 4), L3 = C.layout(290, 4);
is(L1.unit >= 96 && L1.viewUnit >= 96 && L2.unit >= 64 && L2.viewUnit >= 64 && L3.unit >= 64 && L3.viewUnit >= 64, 'every library picture at its floor (cards and viewer, 704 / phone)');
is([L1, L2, L3].every(L => L.unit * L.capS <= L.cardH), 'the tallest card picture fits its card');
const M = JSON.parse(fs.readFileSync(path.join(MT, 'wake-up-pip-activities.json'), 'utf8')).find(r => r.id === 'wake-up-pip.retell-story.rl-k-2');
is(M && M.tool === 'wake-up-pip-activity' && M.task_template === 'retell-story' && M.alignment.code === 'RL.K.2', 'manifest row: wake-up-pip-activity, RL.K.2');
for (const loc of LOCS) {
  const want = {}; C.LEVELS.forEach(lv => [3, 4].forEach(n => { want[lv + n] = C.rounds(loc, lv, n).length; }));
  is(JSON.stringify(M.params.byLocale[loc]) === JSON.stringify(want) && Object.values(want).every(v => v >= 7), `manifest mirrors the core for ${loc} (≥ 7 rounds a game)`);
  is(/^[a-z0-9-]+$/.test(M.slug[loc] || '') && M.page_title[loc] && M.page_intro[loc], `slug, title, intro ${loc}`);
  if (['sv', 'da', 'no', 'fi'].includes(loc)) is(!/gratis|ilmai|\bfree\b|uden login|utan inloggning|uten innlogging/i.test(M.page_title[loc] + ' ' + M.page_intro[loc]), `${loc}: nothing "free"`);
}
is(new Set(Object.values(M.slug)).size === LOCS.length, 'eleven different slugs');
const FZ = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'].map(l => [l, M.slug[l], M.page_title[l], M.page_intro[l]]);
is(crypto.createHash('sha1').update(JSON.stringify(FZ)).digest('hex') === FROZEN, 'frozen en de fr es pt it nl slugs, titles and intros unchanged');

console.log(`verify-wake-up-pip-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
