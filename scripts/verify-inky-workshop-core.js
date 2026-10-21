#!/usr/bin/env node
/* =====================================================================
   verify-inky-workshop-core.js — the gate of ACTIVITY #66, THE TWO INKS
   (Inky's Book Workshop, RL.K.6, 11 locales). Its own ground truth:
     1. the gate's own table of inks (the author makes words, the
        illustrator makes a picture, the reader has none); for EVERY page
        of every book in both Jobs settings and EVERY person, the gate
        says whether the page is finished and where the wrong ink lands
        (words in the box / a picture on the lines / the reader at the
        gap / a finished page that nobody can fill), and the core agrees
     2. the books: every page has exactly one empty half (or none: the
        finished page that goes to the reader, only in Jobs: 3); the
        missing half alternates (the first page of a book needs a picture
        in four books, words in the other four), so per pass author and
        illustrator each finish 8 pages; every picture exists, colour,
        labelled, not refused; the cover is the book's first picture
     3. the cover: only the author on the words slot and the illustrator
        on the picture slot are stamped; a wrong slot is a miss; the
        reader never goes on the cover; both stamped → the book is done
     4. the deals: the person who finishes page 1 sits in every seat
        equally often (4/4 with two desks, 3/3/2 with three) and never in
        the same seat three books running; the cover slots swap 4/4 and
        never three running; the order of a pass is a permutation that
        never repeats and never starts with the book just made
     5. the round: hints by mistake; miss 2 opens the doors and pulses
        the missing half; a right delivery resets the misses and turns
        the page; the last page opens the cover
     6. texts × 11 (24 sentences, mascot, the formal plates), no 0, fr
        non-breaking spaces, plates kept (es Autor/Ilustrador/Lector …);
        strings × 11; the manifest, its mirror, the frozen en..nl metadata
        (hash), the new sv da no fi slugs, titles, intros
   Usage: node scripts/verify-inky-workshop-core.js  (IW_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.IW_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'inky-workshop-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, InkyWorkshopCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'inky-book-workshop-activity.js'), 'utf8') + '\nthis.__A = InkyBookWorkshopActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['weather/stormy', 'weather/sun', 'occupations/author', 'farm animals/duckling', 'christmas/tree'];
const FROZEN = '812c08809669d755cb59a05c11040938d30b1d59';
/* the gate's own tables */
const BOOKS = ['boat', 'dragon', 'balloon', 'moon', 'farm', 'whale', 'garden', 'kite'];
const FIRST_MISSING = { boat: 'picture', dragon: 'words', balloon: 'picture', moon: 'words', farm: 'picture', whale: 'words', garden: 'picture', kite: 'words' };
const MAKES = { author: 'words', illustrator: 'picture', reader: null };
const PLATES = { en: ['Author', 'Illustrator', 'Reader'], de: ['Autor', 'Illustrator', 'Leser'], nl: ['Schrijver', 'Illustrator', 'Lezer'], da: ['Forfatter', 'Illustrator', 'Læser'], sv: ['Författare', 'Illustratör', 'Läsare'], no: ['Forfatter', 'Illustratør', 'Leser'], es: ['Autor', 'Ilustrador', 'Lector'], it: ['Autore', 'Illustratore', 'Lettore'], pt: ['Autor', 'Ilustrador', 'Leitor'], fr: ['Auteur', 'Illustrateur', 'Lecteur'], fi: ['Kirjailija', 'Kuvittaja', 'Lukija'] };
const MASCOT = { pt: 'Tinoco', it: 'Nino' };
const oracle = (role, missing) => {
  if (role === 'reader') return missing === 'none' ? { ok: true, landed: 'read' } : { ok: false, landed: 'gap', reason: 'reader-gap' };
  if (missing === 'none') return { ok: false, landed: 'hover', reason: 'done-page' };
  if (MAKES[role] === missing) return { ok: true, landed: missing === 'words' ? 'lines' : 'box' };
  return { ok: false, landed: MAKES[role] === 'words' ? 'box' : 'lines', reason: role === 'author' ? 'author-box' : 'illus-lines' };
};
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const picOk = (p) => p && fs.existsSync(path.join(IMG, p.split('/').slice(0, -1).join('/'), p.split('/').pop() + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]) && !REFUSED.includes(p);
const TX = C.DATA.TEXT;
is(JSON.stringify(C.DATA.ORDER) === JSON.stringify(BOOKS), 'the eight books, in the gate\'s order');

/* 1 + 2 — every page, every person; the books */
for (const j of ['2', '3']) {
  const R = C.rounds('en', j);
  let author = 0, illus = 0;
  for (const r of R) {
    is(r.pages.length === (j === '3' ? 3 : 2), `${r.id}: ${j === '3' ? 3 : 2} pages`);
    is(r.pages[0].missing === FIRST_MISSING[r.book] && r.pages[1].missing === (FIRST_MISSING[r.book] === 'picture' ? 'words' : 'picture') && (j === '2' || r.pages[2].missing === 'none'), `${r.id}: page 1 needs ${FIRST_MISSING[r.book]}, page 2 the other half${j === '3' ? ', page 3 is finished' : ''}`);
    is(r.cover === r.pages[0].pic, `${r.id}: the cover is the book's first picture`);
    r.pages.forEach((p, i) => {
      is(picOk(p.pic), `${r.id} page ${i + 1}: ${p.pic} exists, colour, labelled, not refused`);
      for (const role of r.roles) {
        const st = C.newState(r, { seats: r.roles }); st.page = i;
        const want = oracle(role, p.missing), got = C.deliver(st, role);
        is(got && got.ok === want.ok && got.landed === want.landed && (want.ok ? st.page === i + 1 : st.page === i && st.last.reason === want.reason), `${r.id} page ${i + 1} (${p.missing} missing) → ${role}: ${want.ok ? 'finished' : want.reason} at ${want.landed} — core ${JSON.stringify(got)}`);
      }
      if (p.missing === 'words') author++; if (p.missing === 'picture') illus++;
    });
    is(C.deliver(C.newState(r, {}), 'nobody') === null, `${r.id}: nobody outside the workshop takes a page`);
  }
  is(author === 8 && illus === 8, `Jobs ${j}: per pass the author finishes 8 pages and the illustrator 8 (${author}/${illus})`);
}
for (const p of [C.INKY].concat(Object.values(C.PEOPLE))) is(picOk(p), `${p} exists, colour, labelled`);
is(C.PEOPLE.author === 'activities/writing' && C.PEOPLE.illustrator === 'occupations/artist' && C.PEOPLE.reader === 'activities/reading', 'the three people are the writer at a desk, the child at an easel, the girl reading');

/* 3 — the cover */
for (const r of C.rounds('en', '3')) {
  const st = C.newState(r, {}); is(C.placePortrait(st, 'author', 'words') === null, `${r.id}: no cover before the pages are done`);
  while (st.phase === 'page') C.deliver(st, C.roleFor(C.current(st).missing));
  is(st.phase === 'cover' && !st.done, `${r.id}: the last page opens the cover`);
  is(C.placePortrait(st, 'reader', 'words') === null, `${r.id}: the reader never goes on the cover`);
  let res = C.placePortrait(st, 'author', 'picture');
  is(res && !res.ok && res.smear === 'letters' && st.cover.picture === null && C.hint(st) === 'hintCoverAuthor' && st.misses === 1, `${r.id}: the author on the picture slot scribbles letters and slides back (miss)`);
  res = C.placePortrait(st, 'illustrator', 'words');
  is(res && !res.ok && res.smear === 'paint' && st.cover.words === null && C.hint(st) === 'hintCoverIllus', `${r.id}: the illustrator on the words slot smears paint and slides back (miss)`);
  is(C.placePortrait(st, 'author', 'words').ok && !st.done, `${r.id}: the author stamps the words slot`);
  is(C.placePortrait(st, 'author', 'words') === null, `${r.id}: a stamped portrait cannot be placed twice`);
  { const m0 = st.misses; is(C.placePortrait(st, 'author', 'picture') === null && st.misses === m0 && st.cover.picture === null, `${r.id}: the stamped author cannot be moved to the other slot (no miss)`); }
  is(C.placePortrait(st, 'illustrator', 'picture').ok && st.done && st.phase === 'done', `${r.id}: the illustrator stamps the picture slot — the book is done`);
}

/* 4 — the deals and the order */
for (const j of ['2', '3']) {
  const R = C.rounds('en', j), m = j === '3' ? 3 : 2;
  for (let seed = 0; seed < 800; seed++) {
    const rnd = C.seeded(j + 'd' + seed), o = C.order(R, rnd, null), D = C.deal(R, o, rnd);
    const seats = o.map(k => D[k].seats.indexOf(C.roleFor(R[k].pages[0].missing))), swaps = o.map(k => D[k].coverSwap), c = new Array(m).fill(0);
    seats.forEach(x => c[x]++);
    is(o.every(k => D[k].seats.slice().sort().join() === R[k].roles.slice().sort().join()), `jobs ${j} seed ${seed}: every desk is in the workshop once`);
    is(Math.max(...c) - Math.min(...c) <= 1 && Math.max(...c) / 8 <= (m === 3 ? .4 : .5), `jobs ${j} seed ${seed}: page 1's person sits in every seat equally (${c})`);
    is(seats.every((x, i) => i < 2 || !(x === seats[i - 1] && x === seats[i - 2])), `jobs ${j} seed ${seed}: never the same seat three books running`);
    is(swaps.filter(Boolean).length === 4 && swaps.every((x, i) => i < 2 || !(x === swaps[i - 1] && x === swaps[i - 2])), `jobs ${j} seed ${seed}: the cover slots swap 4/4, never three running`);
    const o2 = C.order(R, rnd, o);
    is(new Set(o).size === 8 && o2.join() !== o.join() && R[o[7]].book !== R[o2[0]].book, `jobs ${j} seed ${seed}: a permutation; the next pass never repeats it and never starts with the book just made`);
  }
}

/* 5 — the round */
for (const loc of ['en', 'fi']) for (const j of ['2', '3']) for (const r of C.rounds(loc, j)) {
  const st = C.newState(r, {}), p = r.pages[0], wrong = p.missing === 'picture' ? 'author' : 'illustrator';
  is(C.hint(st) === null && C.helpOf(st) === null, `${loc} ${r.id}: no hint at rest`);
  C.deliver(st, wrong); is(st.misses === 1 && C.hint(st) === (wrong === 'author' ? 'hintAuthor' : 'hintIllus') && C.helpOf(st) === null, `${loc} ${r.id}: the wrong maker → its hint, no help yet`);
  if (j === '3') { C.deliver(st, 'reader'); is(st.misses === 2 && C.hint(st) === 'hintLook', `${loc} ${r.id}: miss 2 → look at what is missing`); }
  else { C.deliver(st, wrong); is(st.misses === 2 && C.hint(st) === 'hintLook', `${loc} ${r.id}: miss 2 → look at what is missing`); }
  const h = C.helpOf(st); is(h && h.open && h.pulse === p.missing, `${loc} ${r.id}: miss 2 opens the doors and pulses the missing ${p.missing}`);
  C.deliver(st, C.roleFor(p.missing)); is(st.page === 1 && st.misses === 0 && !st.show && C.helpOf(st) === null, `${loc} ${r.id}: the right maker turns the page and clears the misses`);
  if (j === '3') {
    while (st.page < 2) C.deliver(st, C.roleFor(C.current(st).missing));
    C.deliver(st, 'author'); is(C.hint(st) === 'hintDone' && st.last.reason === 'done-page', `${loc} ${r.id}: a finished page to the author → nothing to do here`);
    C.deliver(st, 'author'); is(C.hint(st) === 'hintDone', `${loc} ${r.id}: still "this page is finished" at miss 2`);
    C.deliver(st, 'reader'); is(st.phase === 'cover', `${loc} ${r.id}: the reader enjoys the finished page — the cover opens`);
  }
}

/* 6 — texts, strings, manifest */
for (const loc of LOCS) {
  const L = TX[loc];
  is(L.inky === (MASCOT[loc] || 'Inky'), `${loc}: the mascot is ${MASCOT[loc] || 'Inky'}`);
  is(JSON.stringify([L.roles.author, L.roles.illustrator, L.roles.reader]) === JSON.stringify(PLATES[loc]), `${loc}: the formal plates ${PLATES[loc].join(' / ')}`);
  const all = [];
  for (const b of BOOKS) { is(L.s[b] && L.s[b].length === 3 && L.s[b].every(x => x && x.trim()), `${loc} ${b}: three sentences`); all.push(...(L.s[b] || [])); }
  is(new Set(all).size === 24, `${loc}: 24 different sentences`);
  is(!all.some(x => /(^|\D)0(\D|$)/.test(x)), `${loc}: no 0`);
  if (loc === 'fr') is(!all.some(x => / [?!:;»]/.test(x)), 'fr: non-breaking spaces in the sentences');
}
const SS = A.strings;
for (const k of Object.keys(SS)) for (const loc of LOCS) {
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  is(typeof SS[k][loc] === 'string' && SS[k][loc].trim(), `strings.${k}.${loc} authored`);
  is(ph(SS[k][loc]) === ph(SS[k].en), `strings.${k}.${loc}: same placeholders as en`);
  is(!/\b(free|gratis|kostenlos|gratuit|gratuito|grátis|ilmainen|gratuita)\b/i.test(SS[k][loc] || ''), `strings.${k}.${loc}: nothing "free"`);
  if (loc === 'fr') is(!/ [?!:;»]/.test(SS[k][loc]), `strings.${k}.fr: non-breaking spaces`);
}
for (const loc of LOCS) is(SS.title[loc].includes(TX[loc].inky), `${loc}: the title names ${TX[loc].inky}`);
const L1 = C.layout(648), L2 = C.layout(328), L3 = C.layout(288);
is(L1.unit >= 96 && L1.person >= 96 && L1.inky >= 96 && [L2, L3].every(L => L.unit >= 64 && L.person >= 64 && L.inky >= 64), 'every library picture at its floor (704 / phone)');
const M = JSON.parse(fs.readFileSync(path.join(MT, 'inky-book-workshop-activities.json'), 'utf8')).find(r => r.id === 'inky-book-workshop.author-illustrator.rl-k-6');
is(M && M.tool === 'inky-book-workshop-activity' && M.alignment.code === 'RL.K.6', 'manifest row: inky-book-workshop-activity, RL.K.6');
for (const loc of LOCS) {
  const want = { jobs2: C.rounds(loc, '2').length, jobs3: C.rounds(loc, '3').length };
  is(JSON.stringify(M.params.byLocale[loc]) === JSON.stringify(want) && Object.values(want).every(v => v >= 7), `manifest mirrors the core for ${loc} (≥ 7 books a setting)`);
  is(/^[a-z0-9-]+$/.test(M.slug[loc] || '') && M.page_title[loc] && M.page_intro[loc], `slug, title, intro ${loc}`);
  if (['sv', 'da', 'no', 'fi'].includes(loc)) is(!/gratis|ilmai|\bfree\b|uden login|utan inloggning|uten innlogging/i.test(M.page_title[loc] + ' ' + M.page_intro[loc]), `${loc}: nothing "free"`);
}
is(new Set(Object.values(M.slug)).size === LOCS.length, 'eleven different slugs');
const FZ = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'].map(l => [l, M.slug[l], M.page_title[l], M.page_intro[l]]);
is(crypto.createHash('sha1').update(JSON.stringify(FZ)).digest('hex') === FROZEN, 'frozen en de fr es pt it nl slugs, titles and intros unchanged');

console.log(`verify-inky-workshop-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
