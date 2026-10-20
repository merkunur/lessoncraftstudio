#!/usr/bin/env node
/* =====================================================================
   verify-blend-magnets-core.js — the gate for ACTIVITY #54, The Blending
   Magnets (RF.K.2.c, 11 locales). It holds its OWN ground truth — every
   locale's Level 1 triples and Level 2 sound strips are typed out here,
   with the gate's own vowel lists and the single-sound spellings each
   language allows — and checks the core against it and the picture labels:
     1. per locale: the core's rounds = the oracle; every word is pictured
        in a colour theme, its label in that locale is the word, the file
        exists, and none of the struck drawings is used;
     2. Level 1: the target splits into first sound + rest by the gate's
        rule (fi: the first consonant only); the rhyme partner has the same
        rest and another first sound; the same-onset partner the same first
        sound and another rest; the magnet test attracts on every part
        ONLY for the target, rhyme → «ends stick», onset → «first sounds
        stick»; en never puts c against k;
     3. Level 2: every part is ONE sound by the locale's list (no sh/th;
        ck, au, sch … as one magnet); the parts spell the word; only the
        target attracts on every part;
     4. the gallery deal: the target in each slot a third of a pass (±1),
        the rhyme beside it about half the time;
     5. the magnets: the pull zone snaps (strong wider than gentle), a
        snapped pair pulls apart; Check refuses until snapped and until a
        picture is chosen (no miss); miss 2 shows the first letters; a
        move or a new choice takes the help away;
     6. hints; 7. order; 8. strings (11 locales each, reached, no price
        word, fr typography); 9. manifest (en/de/nl/da frozen, the 7 new
        locales present, url-safe).
   Usage: node scripts/verify-blend-magnets-core.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const C = require(path.join(process.env.BMG_CORE_DIR || MT, 'blend-magnets-core.js'));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('FAIL: ' + m); } };
const seeded = (k) => { let s = (Math.imul(k + 1, 2654435761) >>> 0); const r = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; for (let i = 0; i < 8; i++) r(); return r; };

/* ---------- the oracle ---------- */
const ORACLE = {
  en: {
    l1: ['cat bat cup', 'hat cat ham', 'bag flag bus', 'bed sled bun', 'pig fig pen', 'car jar cat', 'jar car jam', 'fan van fox', 'hen pen hat', 'bun sun bed', 'mug jug map', 'sun bun sock', 'flag bag flower', 'sled bed slide', 'star car stool'],
    l2: ['c·a·t c·a·p b·a·t', 'p·i·g f·i·g p·e·n', 's·u·n b·u·n s·o·ck', 'd·o·g l·o·g d·u·ck', 'b·u·s b·u·n c·u·p', 'h·e·n p·e·n h·a·m', 'm·o·p m·a·p m·u·g', 'f·r·o·g f·l·a·g d·o·g', 'c·r·a·b c·a·p c·ar', 'd·r·u·m d·u·ck d·o·g', 'f·l·a·g f·a·n b·a·g']
  },
  de: {
    l1: ['maus haus mund', 'haus maus hund', 'hund mund hahn', 'fisch tisch feige', 'topf kopf tisch', 'nase vase netz', 'kamm lamm kopf', 'kuh schuh kamm', 'rose hose reis', 'zahn hahn zug', 'bein schwein bett', 'glocke socke glas'],
    l2: ['m·au·s h·au·s m·u·n·d', 'h·u·n·d m·u·n·d h·u·t', 'f·i·sch t·i·sch f·u·ß', 'k·a·mm l·a·mm k·o·pf', 't·o·pf k·o·pf t·i·sch', 'r·o·s·e h·o·s·e r·ei·s', 'n·a·s·e v·a·s·e n·e·tz', 'b·ei·n b·e·tt h·au·s']
  },
  nl: {
    l1: ['hond mond huis', 'muis huis mond', 'sok rok sap', 'kam lam kip', 'pan kan pen', 'pen hen pan', 'jas tas jurk', 'vaas kaas vos', 'peer beer pot', 'boek broek bus', 'kip schip kam', 'bus mus boek', 'pot slot peer', 'maan haan muis'],
    l2: ['k·i·p k·a·m s·ch·i·p', 'p·e·n h·e·n p·a·n', 's·o·k r·o·k s·a·p', 'k·a·m l·a·m k·i·p', 'b·u·s m·u·s b·a·l', 'v·o·s b·o·s v·i·s', 'j·a·s t·a·s j·u·r·k', 'h·o·n·d m·o·n·d h·a·n·d']
  },
  da: {
    l1: ['hat kat hund', 'mus hus mund', 'kat hat kam', 'sok kok sol', 'hest vest hus', 'gås lås ged', 'lam kam lås', 'gris ris gryde', 'sol stol sok', 'ko sko kop', 'kop knop kat', 'tand sand tog'],
    l2: ['k·a·t h·a·t k·a·m', 'l·a·m k·a·m l·å·s', 'g·r·i·s r·i·s g·å·s', 'h·u·s m·u·s h·a·t', 's·o·k k·o·k s·o·l', 'b·e·n p·e·n b·u·s', 's·o·l s·t·o·l s·o·k', 'm·u·s b·u·s k·a·t']
  },
  sv: {
    l1: ['katt hatt kam', 'gris ris gryta', 'sol stol sand', 'kopp mopp katt', 'gås lås gaffel', 'hus mus hatt', 'häst väst hus', 'kål skål ko', 'tand hand tåg', 'ko sko kopp', 'mus hus mopp'],
    l2: ['k·a·tt h·a·tt k·a·m', 'g·r·i·s r·i·s g·å·s', 's·o·l s·t·o·l s·k·o', 'k·o·pp m·o·pp k·a·m', 'm·u·s h·u·s m·o·pp', 'k·o s·k·o k·a·m', 'h·ä·s·t v·ä·s·t h·a·tt', 'b·e·n b·i·l b·o·k']
  },
  no: {
    l1: ['katt hatt kam', 'sokk kokk sol', 'hest vest hus', 'gås lås gaffel', 'kopp mopp katt', 'mus hus mopp', 'lam kam lås', 'gris ris gryte', 'sol stol sokk', 'hatt katt hest', 'bein stein bil'],
    l2: ['k·a·tt h·a·tt k·a·m', 'g·r·i·s r·i·s g·å·s', 's·o·l s·t·o·l s·o·kk', 'k·o·pp m·o·pp k·a·m', 'm·u·s h·u·s m·o·pp', 'h·e·s·t v·e·s·t h·a·tt', 'l·a·m k·a·m l·å·s', 'b·i·l b·ei·n b·o·k']
  },
  es: {
    l1: ['gato pato gorro', 'luna cuna lobo', 'foca boca faro', 'mono cono mesa', 'toro loro taza', 'zorro gorro zapato', 'mesa fresa mono', 'cama llama casa', 'papa mapa pato', 'sol col silla', 'lobo globo luna'],
    l2: ['g·a·t·o p·a·t·o g·o·rr·o', 'l·u·n·a c·u·n·a l·o·b·o', 'f·o·c·a b·o·c·a f·a·r·o', 'm·o·n·o c·o·n·o m·e·s·a', 't·o·r·o l·o·r·o t·a·z·a', 'm·a·p·a c·a·p·a m·a·n·o', 'c·a·m·a ll·a·m·a c·a·s·a', 's·o·l c·o·l s·a·l']
  },
  it: {
    l1: ['cane pane casa', 'torta porta tazza', 'vaso naso volpe', 'mucca zucca mela', 'sacco pacco sale', 'tavolo cavolo tenda', 'cubo tubo cane', 'bocca brocca borsa', 'naso vaso nave'],
    l2: ['c·a·n·e p·a·n·e c·a·s·a', 'v·a·s·o n·a·s·o v·o·l·p·e', 'm·u·cc·a z·u·cc·a m·e·l·a', 't·o·r·t·a p·o·r·t·a t·a·zz·a', 'c·u·b·o t·u·b·o c·a·s·a', 'l·u·n·a l·u·p·o l·a·m·a', 'p·e·r·a p·a·n·e m·e·l·a', 'n·a·v·e n·a·s·o c·a·n·e']
  },
  pt: {
    l1: ['gato rato galo', 'vaca faca vela', 'dente pente dedo', 'porta torta pato', 'foca boca faca', 'bola cola bolo', 'janela panela jarra', 'mão pão mapa', 'mapa capa mesa', 'pato gato pão'],
    l2: ['g·a·t·o p·a·t·o g·a·l·o', 'v·a·c·a f·a·c·a v·e·l·a', 'b·o·l·a c·o·l·a b·o·l·o', 'd·en·t·e p·en·t·e d·e·d·o', 'm·a·p·a c·a·p·a m·e·s·a', 'f·o·c·a b·o·c·a f·a·c·a', 'r·a·t·o g·a·t·o r·i·o', 'l·o·b·o g·l·o·b·o l·u·a']
  },
  fr: {
    l1: ['main pain moto', 'gilet filet girafe', 'bouche louche bol', 'gâteau râteau gant', 'chaise fraise chou', 'poussin coussin pain', 'robe globe riz', 'pain train poussin', 'clou chou clé'],
    l2: ['m·ain p·ain m·o·t·o', 'p·ain m·ain b·u·s', 't·r·ain p·ain f·ou·r', 'b·u·s b·o·l s·a·c', 'b·o·l b·u·s c·o·q', 'ch·ou c·l·ou f·ou·r', 'c·l·ou ch·ou c·o·q', 's·a·c b·u·s c·o·q']
  },
  fi: {
    l1: ['kukka sukka kana', 'lammas hammas lukko', 'kukko lukko kuu', 'kuu suu kissa', 'kana hana kala', 'kannu pannu kakku', 'bussi tussi banaani', 'juna muna jalka', 'raketti paketti rapu', 'kolmio solmio koira', 'makkara jakkara muna'],
    l2: ['k·uu s·uu k·a·n·a', 'k·a·n·a h·a·n·a k·a·l·a', 'm·u·n·a j·u·n·a m·u·k·i', 'k·a·l·a k·a·n·a k·a·n·i', 'k·u·kk·a s·u·kk·a k·u·kk·o', 'l·u·kk·o k·u·kk·o l·a·s·i', 'k·a·nn·u p·a·nn·u k·a·n·a', 'k·i·ss·a k·a·ss·i k·uu']
  }
};
const VOW = { en: 'aeiouy', de: 'aeiouäöüy', nl: 'aeiouy', da: 'aeiouyæøå', sv: 'aeiouyåäö', no: 'aeiouyæøå', fi: 'aeiouyäö', es: 'aeiouáéíóú', it: 'aeiouàèéìòù', pt: 'aeiouáâãéêíóôõú', fr: 'aeiouyàâéèêëîïôûüœ' };
/* the spellings each language may put on ONE sound magnet beside single letters */
const ONE_SOUND = { en: ['ck', 'ar'], de: ['au', 'ei', 'sch', 'mm', 'pf', 'tz', 'tt', 'ß'], nl: ['ch'], da: ['tt', 'pp', 'kk'], sv: ['tt', 'pp', 'kk'], no: ['tt', 'pp', 'kk', 'ei'], es: ['rr', 'll'], it: ['cc', 'zz'], pt: ['en'], fr: ['ain', 'ou', 'ch'], fi: ['uu', 'kk', 'nn', 'ss'] };
const NEVER_PIC = ['At the Supermarket/cake', 'At the Supermarket/plum', 'camping/lake', 'forest creatures/bear', 'bakery/cake', 'spring/nest'];
const SPLIT = (loc, w) => { let i = 0; while (i < w.length && !VOW[loc].includes(w[i])) i++; if (loc === 'fi' && i > 1) i = 1; return [w.slice(0, i), w.slice(i)]; };
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) PIC[j.dir + '/' + k] = v.labels; }
const exact = (rel) => { let cur = path.join(ROOT, 'image-library-webp', 'themes'); for (const p of rel.split('/')) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; };
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];

/* 1-3. per locale */
is(JSON.stringify(C.LOCALES.slice().sort()) === JSON.stringify(LOCS.slice().sort()), `the core covers the 11 locales (${C.LOCALES.join(',')})`);
for (const loc of LOCS) {
  const o = ORACLE[loc], L1 = C.rounds(loc, 'onset'), L2 = C.rounds(loc, 'sounds');
  is(JSON.stringify(L1.map(r => r.pics.map(p => p.word).join(' '))) === JSON.stringify(o.l1), `${loc}: Level 1 = the oracle`);
  is(JSON.stringify(L2.map(r => r.pics.map(p => p.parts.join('·')).join(' '))) === JSON.stringify(o.l2), `${loc}: Level 2 = the oracle`);
  is(L1.length >= 7 && L2.length >= 7, `${loc}: ≥ 7 rounds in each level (${L1.length}, ${L2.length})`);
  const words = new Set(); L1.concat(L2).forEach(r => r.pics.forEach(p => words.add(p.word + '|' + p.pic)));
  for (const wp of words) {
    const [w, pic] = wp.split('|'), lab = PIC[pic] && PIC[pic][loc] && PIC[pic][loc][0];
    is(!!lab && lab.toLowerCase() === w && exact(pic + '@2x.webp') && !BW.test(pic.split('/')[0]) && !NEVER_PIC.includes(pic), `${loc} ${w}: ${pic} labelled "${lab}", exists, colour, not a struck drawing`);
  }
  L1.forEach(r => {
    const [t, rh, on] = r.pics, [to, tr] = SPLIT(loc, t.word), [ro, rr] = SPLIT(loc, rh.word), [oo, or] = SPLIT(loc, on.word);
    is(r.parts.join('|') === to + '|' + tr && t.parts.join('|') === to + '|' + tr && rh.parts.join('|') === ro + '|' + rr && on.parts.join('|') === oo + '|' + or, `${loc} ${r.id}: the parts follow the gate's split (${to}|${tr})`);
    is(to && tr && rr === tr && ro !== to, `${loc} ${r.id}: ${rh.word} rhymes (same rest «${tr}», other first sound)`);
    is(oo === to && or !== tr, `${loc} ${r.id}: ${on.word} has the same first sound «${to}» and another rest`);
    if (loc === 'en') is(![ro, oo].some(x => (x === 'k' && to === 'c') || (x === 'c' && to === 'k')), `en ${r.id}: never c against k`);
    const test = (p) => C.testPic(r, p);
    is(test(t).every(x => x.attract) && !test(rh).every(x => x.attract) && !test(on).every(x => x.attract), `${loc} ${r.id}: only the target attracts on every part`);
    is(!test(rh)[0].attract && test(rh)[1].attract && test(on)[0].attract && !test(on)[1].attract, `${loc} ${r.id}: the rhyme's end sticks and its start pushes; the same-onset picture the other way round`);
  });
  L2.forEach(r => {
    const ok = (p) => /^.$/u.test(p) || ONE_SOUND[loc].includes(p);
    r.pics.forEach(p => is(p.parts.every(ok) && p.parts.join('') === p.word, `${loc} ${r.id} ${p.word}: ${p.parts.join('·')} — each part one sound, they spell the word`));
    is(r.parts.length >= 2 && r.parts.length <= 5, `${loc} ${r.id}: 2–5 sound magnets`);
    is(C.testPic(r, r.pics[0]).every(x => x.attract) && r.pics.slice(1).every(p => !C.testPic(r, p).every(x => x.attract)), `${loc} ${r.id}: only the target attracts on every sound`);
  });
}
is(C.display('de', 'maus') === 'Maus' && C.display('en', 'cat') === 'cat' && C.display('fr', 'chat') === 'chat', 'the success line: German nouns capitalised, the others as written');
for (const s of ['sh', 'th', 'ch']) is(!C.rounds('en', 'sounds').some(r => r.pics.some(p => p.parts.includes(s))), `en Level 2: no «${s}» magnet`);

/* 4. the gallery deal */
for (const n of [8, 10, 11, 15]) {
  let badSlot = 0, adj = 0, tot = 0;
  for (let k = 0; k < 2000; k++) {
    const d = C.deal(n, seeded(k)), cnt = [0, 0, 0];
    d.forEach(lay => { const t = lay.indexOf(0), rh = lay.indexOf(1); cnt[t]++; tot++; if (Math.abs(t - rh) === 1) adj++; if (lay.slice().sort().join() !== '0,1,2') badSlot += 100; });
    if (cnt.some(c => Math.abs(c - n / 3) > 1)) badSlot++;
  }
  is(badSlot === 0, `${n} rounds: the target sits in each slot a third of a pass (±1) (${badSlot} bad)`);
  is(adj / tot > 0.42 && adj / tot < 0.58, `${n} rounds: the rhyme beside the target about half the time (${(adj / tot).toFixed(3)})`);
}

/* 5. the magnets */
(() => {
  const r = C.rounds('en', 'onset')[0], st = C.newState(r, { layout: [0, 1, 2] });
  is(st.gaps.length === 1 && st.gaps[0] === 1 && !C.whole(st), 'the magnets start apart');
  let res = C.check(st); is(!res.ok && res.kase === 'snap' && st.misses === 0, 'Check before the magnets snap asks (no miss)');
  C.move(st, 0, C.PULL.strong - 0.01); is(st.gaps[0] === 0 && C.whole(st), 'strong pull: inside the zone the magnet snaps');
  const g = C.newState(r, { pull: 'gentle' }); C.move(g, 0, C.PULL.strong - 0.01); is(g.gaps[0] > 0, 'gentle pull: the same distance does not snap');
  C.move(g, 0, C.PULL.gentle - 0.01); is(g.gaps[0] === 0, 'gentle pull: only very close snaps');
  is(C.PULL.gentle < C.PULL.strong, 'the gentle zone is smaller');
  res = C.check(st); is(!res.ok && res.kase === 'choose' && st.misses === 0, 'snapped but no picture chosen asks (no miss)');
  C.choose(st, 1); res = C.check(st); is(res.kase === 'rhyme' && st.misses === 1 && !C.helpOn(st), 'the rhyme chosen: miss 1, no help yet');
  C.choose(st, 2); is(!st.show, 'a new choice takes the help away');
  res = C.check(st); is(res.kase === 'onset' && st.help === 2 && C.helpOn(st), 'the same-onset chosen: miss 2, the first letters show');
  C.separate(st, 0); is(st.gaps[0] > 0 && !C.helpOn(st), 'pulling the magnets apart takes the help away');
  C.move(st, 0, 0); C.choose(st, 0); is(C.check(st).ok && st.done, 'the target: right');
  const r2 = C.rounds('en', 'sounds')[7], s2 = C.newState(r2, { layout: [0, 1, 2] });
  is(s2.gaps.length === r2.parts.length - 1, 'Level 2: one gap between each two sound magnets');
  C.move(s2, 0, 0); is(!C.whole(s2) && C.check(s2).kase === 'snap', 'Level 2: all magnets must be one bar');
  s2.gaps.forEach((_, i) => C.move(s2, i, 0)); C.choose(s2, 1); const rs = C.check(s2); const dp = C.picAt(s2, 1).parts, wantStick = dp.filter((x, i) => x === r2.parts[i]).length;
  is(rs.kase === 'sounds' && s2.last.stick === wantStick && s2.last.stick + s2.last.apart === Math.max(r2.parts.length, dp.length), `Level 2: «${s2.last.stick} stick, ${s2.last.apart} push apart»`);
  is(C.dots(1) === 6 && C.dots(0) === 0, 'the pause dots: six for the full gap, none when snapped');
})();

/* 6. hints */
(() => {
  const H = (lv, fn) => { const st = C.newState(C.rounds('en', lv)[0], { layout: [0, 1, 2] }); fn(st); return C.hint(st); };
  is(H('onset', st => C.check(st)) === 'hintSnap', 'apart: hintSnap');
  is(H('onset', st => { C.move(st, 0, 0); C.check(st); }) === 'hintChoose', 'no picture: hintChoose');
  is(H('onset', st => { C.move(st, 0, 0); C.choose(st, 1); C.check(st); }) === 'hintRhyme', 'the rhyme: hintRhyme');
  is(H('onset', st => { C.move(st, 0, 0); C.choose(st, 2); C.check(st); }) === 'hintOnset', 'the same-onset picture: hintOnset');
  is(H('onset', st => { C.move(st, 0, 0); C.choose(st, 2); C.check(st); C.choose(st, 1); C.check(st); }) === 'hintHelp', 'miss 2: hintHelp');
  is(H('sounds', st => { st.gaps.forEach((_, i) => C.move(st, i, 0)); C.choose(st, 1); C.check(st); }) === 'hintSounds', 'Level 2: hintSounds');
})();

/* 7. order */
for (const loc of LOCS) for (const lv of C.LEVEL_KEYS) { const R = C.rounds(loc, lv); let same = 0, bad = 0; for (let k = 1; k <= 30; k++) { const a = C.order(R, seeded(k), null), b = C.order(R, seeded(k), a); if (a.join() === b.join()) same++; if (a.slice().sort((x, y) => x - y).join() !== R.map((_, i) => i).join()) bad++; } is(!same && !bad, `${loc} ${lv}: orders are permutations and never repeat the previous one`); }

/* 8. strings */
const A = (() => { const ctx = { window: {}, BlendMagnetsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'blend-magnets-activity.js'), 'utf8') + '\n;this.__A = BlendMagnetsActivity;', ctx); return ctx.__A; })();
const coreSrc = fs.readFileSync(path.join(process.env.BMG_CORE_DIR || MT, 'blend-magnets-core.js'), 'utf8'), actSrc = fs.readFileSync(path.join(MT, 'blend-magnets-activity.js'), 'utf8').split('/*STRINGS-END*/')[1];
for (const k of Object.keys(A.strings)) {
  const s = A.strings[k];
  is(LOCS.every(l => !!s[l]), `strings ${k}: all 11 locales`);
  is(!/\bfree\b|gratis|grátis|gratuit|ilmai|kostenlos|gratuito/i.test(Object.values(s).join(' ')), `strings ${k}: no price word`);
  is(!/ [:!?;]/.test(s.fr) && !/[^  \s«][!?;:]/.test(s.fr.replace(/\{\w+\}/g, 'x').replace(/^\{?\w+\}?/, '')), `strings ${k}: fr typography`);
  is(['title', 'instruction'].includes(k) || coreSrc.includes("'" + k + "'") || actSrc.includes("'" + k + "'"), `string ${k} is reached`);
}

/* 9. manifest */
const rows = JSON.parse(fs.readFileSync(path.join(MT, 'blend-magnets-activities.json'), 'utf8'));
is(rows.length === 1 && rows[0].id === 'choice-board.onset-rime-blend.rf-k-2-c' && rows[0].tool === 'blend-magnets-activity', 'manifest: the kept id, the new tool');
for (const loc of LOCS) for (const lv of C.LEVEL_KEYS) is(JSON.stringify(rows[0].params.byLocale[loc][lv].map(x => x.id)) === JSON.stringify(C.rounds(loc, lv).map(r => r.id)), `manifest ${loc} ${lv}: mirrors the core`);
is(!JSON.parse(fs.readFileSync(path.join(MT, 'choice-board-activities.json'), 'utf8')).some(x => x.id === rows[0].id), 'the row left choice-board-activities.json');
const HEADROW = (() => { try { return JSON.parse(cp.execSync('git show 17cf80db:"mini tools/choice-board-activities.json"', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).find(x => x.id === rows[0].id); } catch (e) { return null; } })();
if (HEADROW) {
  for (const l of ['en', 'de', 'nl', 'da']) for (const k of ['slug', 'page_title', 'page_intro']) is(HEADROW[k][l] === rows[0][k][l], `manifest ${k}.${l}: frozen`);
  is(JSON.stringify(HEADROW.alignment) === JSON.stringify(rows[0].alignment), 'manifest alignment: frozen');
} else is(false, 'manifest: the frozen row could be read from git');
for (const l of LOCS) is(/^[a-z0-9-]+$/.test(rows[0].slug[l] || '') && !!(rows[0].page_title[l] && rows[0].page_intro[l]), `manifest ${l}: slug (url-safe), title and intro`);

console.log(`verify-blend-magnets-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
