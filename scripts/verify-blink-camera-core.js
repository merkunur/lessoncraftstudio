#!/usr/bin/env node
/* =====================================================================
   verify-blink-camera-core.js — build gate for ACTIVITY #60, The Blink
   Camera (mini tools/blink-camera-core.js, RF.K.3.c, 11 locales). Its OWN
   ground truth (never read off the core's answers):
     0. every story picture exists on disk, is a colour drawing, is not a
        refused drawing, and the story names it (a word that begins with
        the library's or the vocabulary's own name for it in that locale)
     1. the word sets: 8 per locale, the targets unique; every look-alike
        is a different word, shares a letter with the target, and is on
        the gate's own reviewed word list for that locale; in every round
        a look-alike starts with the target's first letter (a glance at
        the first letter is never enough)
     2. the bots: "the card that shares the most letters with the others"
        wins ≤ 3 of 8 rounds per locale (ties split)
     3. Find every one: each deal holds exactly the round's copies of the
        word and the rest are its look-alikes; copies are 3, 4 or 5 and all
        three occur; each slot holds a copy 2–4 times a pass; no row or
        column holds every copy (4-wide and 3-wide); Snap and find: the word
        sits in each slot twice a pass
     4. In the story: the gate's own tokenizer and counter — the copies of
        the word (any case, never an elided l’ / d’ …) = the round's copies,
        2 or 3; in ≥ 2 places of a sentence; a look-alike in every story;
        a capital copy in ≥ 4 of 8 stories; the core's tokens = the gate's
     5. the round: the shutter (cards face down while open, re-snapping is
        never a miss), choose, check (empty → no miss; wrong → miss, the
        card flips back at miss 1, the photo only at miss 2), the hunts
        (brackets on look-alikes fall off, a found grid asks for the count
        without a miss, the count = the copies), the capital glow at miss 1
        and the dashed frames at miss 2, a move clears the help; diff()
        letter by letter; the blink ladder
     6. order() never repeats
     7. strings × 11, every hint key the core returns is authored, the same
        placeholders in every locale, nothing "free"; the manifest row runs
        the camera and mirrors the core; frozen metadata unchanged; the new
        fi slug / title / intro present; url-safe slugs
   Usage: node scripts/verify-blink-camera-core.js  (BCM_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.BCM_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'blink-camera-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, BlinkCameraCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(fs.existsSync(path.join(DIR, 'blink-camera-activity.js')) ? DIR : MT, 'blink-camera-activity.js'), 'utf8') + '\nthis.__A = BlinkCameraActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['camping/lake', 'easter/egg', 'At the Supermarket/egg', 'zoo animals/bear', 'forest creatures/bear', 'bakery/cake', 'At the Supermarket/cake', 'At the Supermarket/plum', 'At the Supermarket/butter', 'shapes/moon', 'kitchen tools/pan', 'around the house/glass', 'farm animals/ox', 'At the Supermarket/water', 'weather/sun', 'body parts/lip', 'clothing/pants', 'spring/rain', 'shapes/cone', 'At the Supermarket/milk', 'At the Supermarket/juice', 'fruits/cherry', 'fruits/peach', 'fruits/plum', 'christmas/tree', 'farm animals/chicken'];
/* the reviewed words per locale (targets and look-alikes): a word not on this list is not shipped */
const WORDS = {
  en: 'was saw want with the they then that of off for on you your yes use see she say so and an hand band go got good dog like lick likes lime',
  de: 'der dem den die und uns ein um ist im isst fast ich in dich mich das dass was Glas Bein eins sein mit Mut mir Mitte auf aus Lauf Kauf',
  nl: 'de die den te het heet hen heeft een en geen teen ik in is uit op om of ook met mee meet net niet niets nieuw kan kant kat kam',
  da: 'og om op os er en et der jeg jer leg lege det den de på pas så nå med mod dem ned han hans hus hun var vare varm far',
  sv: 'är ärt år en har och ost oss som jag ja jaga dag det detta dem ett ena ens in på påse så då med mig dem mer inte inne inom inre',
  no: 'det den der de er en et ert jeg jo ja jul med men mer mor har han hun hus ikke like ikon isen var vår vil ved på påske så tå',
  es: 'el ella le del la las una ya los dos sol con cono como cosa por par pero poco uno luna unos mi mil mis ti su sus sur tu',
  pt: 'com como sem cor não mão são nos que quem quente queda uma umas rima luva você vocês voar vela meu meus mel mar de dia dei do é e eu ele',
  fr: 'les des mes le une un lune ne et en de il ils lit fil elle elles belle ville dans sans dent danse avec avoir avant avion pour pourquoi cour jour',
  it: 'il in li si la le ala va un uno una tu che chi cena cane con come cono conta non nono noi nove per pera pere penna sono suono sano sole',
  fi: 'ja jo jaa jano ne on en oli ovi ei eli oi se sen me hän hana häntä hai mutta matto mitta mato kun kuu kuin kana tämä tuo tämän nämä'
};
const FROZEN = 'ebe02a7164ac370f91dd9595b8abfbbe1d05377f';
const low = (s) => String(s).normalize('NFC').toLocaleLowerCase();
const base = (s) => String(s).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase();

/* ---- picture names (library labels + vocabulary) ---- */
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
const VOC = (() => { const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8') + ';this.V = typeof IMAGE_VOCABULARY !== "undefined" ? IMAGE_VOCABULARY : window.IMAGE_VOCABULARY;', ctx); return ctx.V; })();
const names = (p, loc) => { const n = p.split('/').pop(), out = []; const lab = (LABEL[p] || {})[loc]; if (lab) out.push(lab[0]); if (VOC[n] && VOC[n][loc]) out.push(VOC[n][loc][0]); return out.map(low); };

/* ---- the gate's own tokenizer: words (an elided form ending in an apostrophe is its own word) ---- */
function gateWords(text) {
  const out = [];
  String(text).split(/(?<=[.!?])\s+/).forEach((sen, si) => {
    const ws = sen.replace(/[’']/g, '’ ').split(/\s+/).map(w => w.replace(/^[^\p{L}]+|[^\p{L}’]+$/gu, '')).filter(Boolean);
    ws.forEach((w, i) => out.push({ w, sen: si, elided: /’$/.test(w), pos: i === 0 ? 'first' : i === ws.length - 1 ? 'last' : 'middle' }));
  });
  return out;
}
const shared = (a, b) => { const m = {}; for (const c of base(a)) m[c] = (m[c] || 0) + 1; let n = 0; for (const c of base(b)) if (m[c]) { m[c]--; n++; } return n; };

for (const loc of LOCS) {
  is(JSON.stringify(C.games(loc)) === JSON.stringify(['snap', 'hunt', 'story']), `${loc}: all three games shown`);
  const S = C.rounds(loc, 'snap'), H = C.rounds(loc, 'hunt'), T = C.rounds(loc, 'story');
  is(S.length === 8 && H.length === 8 && T.length === 8, `${loc}: 8 rounds per game`);
  is(new Set(S.map(r => low(r.target))).size === 8, `${loc}: the 8 targets are different words`);
  const ok = new Set(WORDS[loc].split(' '));
  /* 1 — the word sets */
  let bot = 0;
  S.forEach(r => {
    is(r.cards.length === 4 && r.cards[0] === r.target && r.looks.length === 3, `${loc} ${r.target}: four cards, the word and three look-alikes`);
    is(new Set(r.cards.map(low)).size === 4, `${loc} ${r.target}: four different words`);
    r.cards.forEach(w => is(ok.has(w), `${loc} ${r.target}: «${w}» is on the reviewed word list`));
    r.looks.forEach(w => { is(low(w) !== low(r.target), `${loc} ${r.target}: «${w}» is another word`); is(shared(w, r.target) >= 1, `${loc} ${r.target}: «${w}» shares a letter with the word`); });
    is(r.looks.some(w => base(w)[0] === base(r.target)[0]), `${loc} ${r.target}: a look-alike starts with the same letter (the first letter is never enough)`);
    /* 2 — the most-shared-letters bot */
    const sc = r.cards.map(c => r.cards.reduce((s, d) => d === c ? s : s + shared(c, d), 0)), mx = Math.max(...sc);
    if (sc[0] === mx) bot += 1 / sc.filter(x => x === mx).length;
  });
  is(bot <= 3 + 1e-9, `${loc}: the most-shared-letters bot wins ${bot.toFixed(2)} of 8 (≤ 3)`);
  /* 3 — the deals */
  is(JSON.stringify(H.map(r => r.copies).sort()) !== '' && [3, 4, 5].every(n => H.some(r => r.copies === n)), `${loc}: hunt copies cover 3, 4 and 5`);
  H.forEach(r => is([3, 4, 5].includes(r.copies) && r.target === S[r.i].target, `${loc} hunt ${r.target}: 3–5 copies, the Snap word`));
  for (let seed = 0; seed < 60; seed++) {
    const rnd = C.seeded(loc + seed), D = C.dealGrids(H, rnd), use = Array(12).fill(0);
    D.forEach((tiles, k) => {
      const r = H[k], at = tiles.map((w, i) => w === r.target ? i : -1).filter(i => i >= 0);
      is(tiles.length === 12 && at.length === r.copies, `${loc} hunt ${r.target} seed ${seed}: exactly ${r.copies} copies in 12 tiles`);
      is(tiles.every(w => w === r.target || r.looks.includes(w)), `${loc} hunt ${r.target}: the other tiles are its look-alikes`);
      at.forEach(i => use[i]++);
      for (const cols of [4, 3]) {
        for (let row = 0; row * cols < 12; row++) is(at.filter(i => Math.floor(i / cols) === row).length < r.copies, `${loc} hunt ${r.target} seed ${seed}: no ${cols}-wide row holds every copy`);
        for (let col = 0; col < cols; col++) is(at.filter(i => i % cols === col).length < r.copies, `${loc} hunt ${r.target} seed ${seed}: no ${cols}-wide column holds every copy`);
      }
    });
    is(use.every(u => u >= 2 && u <= 4), `${loc} hunt seed ${seed}: each slot holds a copy 2–4 times a pass (${use.join(',')})`);
    const SD = C.dealCards(S, rnd), slot = [0, 0, 0, 0];
    SD.forEach((cards, k) => { is(cards.slice().sort().join() === S[k].cards.slice().sort().join(), `${loc} snap ${S[k].target}: the deal is the round's four words`); slot[cards.indexOf(S[k].target)]++; });
    is(slot.every(n => n === 2), `${loc} snap seed ${seed}: the word sits in each slot twice a pass (${slot.join(',')})`);
  }
  /* 4 — the stories */
  let caps = 0;
  T.forEach(r => {
    const P = r.pic, f = path.join(IMG, P.split('/').slice(0, -1).join('/'), P.split('/').pop() + '@2x.webp');
    is(fs.existsSync(f), `${loc} story ${r.target}: ${P} exists`);
    is(!BW.test(P.split('/')[0]) && !REFUSED.includes(P), `${loc} story ${r.target}: ${P} is a colour drawing and not refused`);
    const W = gateWords(r.text), nm = names(P, loc);
    is(nm.length && W.some(x => nm.some(n => low(x.w).startsWith(n.slice(0, Math.max(3, n.length - 3))))), `${loc} story ${r.target}: the story names its picture (${nm.join('/')})`);
    const cp = W.filter(x => !x.elided && low(x.w) === low(r.target));
    is(cp.length === r.copies && (r.copies === 2 || r.copies === 3), `${loc} story ${r.target}: ${cp.length} copies (core ${r.copies}), 2 or 3`);
    is(new Set(cp.map(x => x.pos)).size >= 2, `${loc} story ${r.target}: the word sits in ≥ 2 places of a sentence`);
    is(W.some(x => r.looks.some(l => low(l) === low(x.w))), `${loc} story ${r.target}: a look-alike in the story`);
    is(!W.some(x => x.elided && low(x.w.replace('’', '')) === low(r.target)), `${loc} story ${r.target}: no elided form of the word`);
    if (cp.some(x => x.w !== low(x.w))) caps++;
    is(JSON.stringify(r.tokens.filter(t => t.word).map(t => t.t.replace("'", '’'))) === JSON.stringify(W.map(x => x.w)), `${loc} story ${r.target}: the core's words = the gate's words`);
  });
  is(caps >= 4, `${loc}: a capital copy in ${caps} of 8 stories (≥ 4)`);
}

/* 5 — the round */
{
  const r = C.rounds('en', 'snap').find(x => x.target === 'was'), st = C.newState(r, { cards: ['saw', 'was', 'want', 'with'] });
  is(!C.visible(st) && !C.choose(st, 1), 'snap: the cards lie face down before the first snap');
  let res = C.check(st); is(!res.ok && res.kase === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', 'snap: Check before snapping asks, no miss');
  C.snap(st); is(st.open && !C.visible(st) && !C.choose(st, 1), 'snap: the cards are face down while the shutter is open');
  C.shut(st); is(C.visible(st), 'snap: the shutter shuts, the cards flip up');
  C.snap(st); is(!C.visible(st) && !C.choose(st, 1), 'snap: a second snap turns the face-up cards down again while the shutter is open'); C.shut(st); is(st.misses === 0 && st.snaps === 2, 'snap: snapping again is never a miss');
  C.choose(st, 0); res = C.check(st);
  is(!res.ok && res.kase === 'wrong' && st.misses === 1 && st.chosen === null && res.reflash && !C.photoOn(st) && C.hint(st) === 'hintLook', 'snap: miss 1 — the card flips back, the camera looks again, no photo');
  C.choose(st, 3); res = C.check(st);
  is(st.misses === 2 && st.chosen === 3 && C.photoOn(st) && !res.reflash && C.hint(st) === 'hintPhoto', 'snap: miss 2 — the photo sits beside the cards, the card stays');
  is(JSON.stringify(st.last.diff) === JSON.stringify({ glow: [1, 2], extra: [3], missing: 0 }), 'snap: miss 2 glows the letters of «with» that differ from «was»');
  C.choose(st, 2); is(!C.photoOn(st) && !C.hint(st), 'snap: a new move takes the help away');
  C.choose(st, 1); res = C.check(st); is(res.ok && st.done, 'snap: «was» → right');
  is(JSON.stringify(C.diff('was', 'saw')) === JSON.stringify({ glow: [0, 2], extra: [], missing: 0 }), 'diff was/saw: two letters glow');
  is(JSON.stringify(C.diff('the', 'then')) === JSON.stringify({ glow: [], extra: [3], missing: 0 }), 'diff the/then: one extra letter');
  is(JSON.stringify(C.diff('and', 'an')) === JSON.stringify({ glow: [], extra: [], missing: 1 }), 'diff and/an: one letter missing');
  is(JSON.stringify(C.diff('é', 'e')) === JSON.stringify({ glow: [0], extra: [], missing: 0 }), 'diff é/e: the accent is a letter');
  is(C.blinkFor('short', 0) === 700 && C.blinkFor('medium', 0) === 1200 && C.blinkFor('long', 0) === 2000, 'blink: short 0.7 s · medium 1.2 s · long 2.0 s');
  is(C.blinkFor('short', 1) === 1200 && C.blinkFor('short', 2) === 2000 && C.blinkFor('long', 3) === 2000 && C.blinkFor('medium', 1) === 2000, 'blink: each miss one step longer, never past long');
}
{
  const r = C.rounds('en', 'hunt').find(x => x.target === 'the'), tiles = ['they', 'the', 'then', 'that', 'the', 'they', 'then', 'the', 'that', 'the', 'they', 'the'];
  const st = C.newState(r, { tiles }); C.snap(st); C.shut(st);
  is(r.copies === 5 && C.copiesAt(st).join() === '1,4,7,9,11', 'hunt: the copies of «the»');
  let res = C.check(st); is(res.kase === 'empty' && st.misses === 0, 'hunt: Check with nothing bracketed asks, no miss');
  C.toggle(st, 0); C.toggle(st, 1); res = C.check(st);
  is(res.kase === 'hunt' && st.misses === 1 && JSON.stringify(st.brackets) === '[1]' && JSON.stringify(res.wrong) === '[0]' && C.hint(st) === 'hintWrongMore', 'hunt: a bracket on «they» falls off; more copies to find');
  is(!C.framed(st).length && !C.photoOn(st), 'hunt: no frames and no photo at miss 1');
  [4, 7].forEach(i => C.toggle(st, i)); res = C.check(st);
  is(st.misses === 2 && C.photoOn(st) && JSON.stringify(C.framed(st)) === '[9,11]' && C.hint(st) === 'hintFrames', 'hunt: miss 2 — the photo, dashed frames on the copies still to find');
  C.toggle(st, 9); is(!C.framed(st).length, 'hunt: a move takes the frames away');
  C.toggle(st, 11); res = C.check(st);
  is(res.kase === 'found' && st.phase === 'count' && st.misses === 2 && C.hint(st) === 'hintCount' && !st.done, 'hunt: every copy found → how many? (no miss)');
  is(!C.toggle(st, 0), 'hunt: the brackets are fixed while counting');
  res = C.check(st); is(res.kase === 'count-empty' && st.misses === 2, 'hunt: Check with no number asks, no miss');
  C.pickCount(st, 4); res = C.check(st); is(res.kase === 'count' && st.misses === 3 && C.hint(st) === 'hintCountAgain' && !st.done, 'hunt: 4 for 5 copies → count the brackets (miss)');
  C.pickCount(st, 6); res = C.check(st); is(!res.ok && !st.done, 'hunt: 6 for 5 copies → not right');
  C.pickCount(st, 5); res = C.check(st); is(res.ok && st.done, 'hunt: 5 → right');
  is(!C.pickCount(C.newState(r, { tiles }), 3), 'hunt: no count before the grid is found');
}
{
  const r = C.rounds('en', 'story').find(x => x.target === 'the'), st = C.newState(r);
  C.snap(st); C.shut(st);
  const idx = (w, k) => r.tokens.map((t, i) => [t, i]).filter(([t]) => t.word && t.t === w)[k || 0][1];
  C.toggle(st, idx('the', 0)); C.toggle(st, idx('the', 1)); C.toggle(st, idx('Then'));
  let res = C.check(st);
  is(res.kase === 'hunt' && JSON.stringify(res.wrong) === JSON.stringify([idx('Then')]) && JSON.stringify(res.missing) === JSON.stringify([idx('The')]), 'story: «Then» is a look-alike; «The» is still to find');
  is(JSON.stringify(C.capGlow(st)) === JSON.stringify([idx('The')]) && C.hint(st) === 'hintWrongMore', 'story: miss 1 — the capital «The» glows');
  C.toggle(st, idx('The')); res = C.check(st); is(res.ok && st.done, 'story: «The» counts → right (no count step)');
  const st2 = C.newState(r); C.snap(st2); C.shut(st2); C.toggle(st2, idx('the', 0)); C.toggle(st2, idx('the', 1)); C.check(st2);
  is(C.hint(st2) === 'hintCap', 'story: only the capital copy missing → the capital hint');
  C.toggle(st2, idx('the', 0)); C.toggle(st2, idx('the', 0)); C.check(st2);
  is(st2.help === 2 && !C.capGlow(st2).length && JSON.stringify(C.framed(st2)) === JSON.stringify([idx('The')]), 'story: miss 2 — no capital glow, a dashed frame instead');
  const fr = C.rounds('fr', 'story').find(x => x.target === 'dans'); is(fr.copies === 2 && fr.tokens.some(t => t.word && t.elided && t.t === 'l’'), 'story fr: « l’ » is a word of its own and never counts');
  const it = C.rounds('it', 'story').find(x => x.target === 'la'); is(it.copies === 3 && it.tokens.some(t => t.word && t.elided && t.t === 'l’'), 'story it: «l’uovo» is a word of its own; «La … La … la» = 3');
}

/* 6 — order */
for (const loc of ['en', 'fi']) {
  const R = C.rounds(loc, 'snap'), fixed = () => 0.37, o1 = C.order(R, fixed, null), o2 = C.order(R, fixed, o1);
  is(o1.join() !== o2.join() && new Set(o2).size === R.length, `${loc}: order() refuses the previous order even when the draw repeats`);
  let prev = null; for (let t = 0; t < 200; t++) { const o = C.order(R, Math.random, prev); is(!prev || o.join() !== prev.join(), `${loc}: order never repeats`); is(new Set(o).size === R.length, `${loc}: order is a permutation`); prev = o; }
}

/* 7 — strings, manifest, metadata */
const S = A.strings, KEYS = Object.keys(S);
for (const k of KEYS) {
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  for (const loc of LOCS) {
    is(typeof S[k][loc] === 'string' && S[k][loc].trim(), `strings.${k}.${loc} authored`);
    is(ph(S[k][loc]) === ph(S[k].en), `strings.${k}.${loc}: same placeholders as en`);
    is(!/\b(free|gratis|kostenlos|gratuit|gratuito|grátis|ilmainen|gratuita)\b/i.test(S[k][loc] || ''), `strings.${k}.${loc}: nothing "free"`);
    if (loc === 'fr') is(!/ [:;!?»]/.test(S[k][loc]) && !/« /.test(S[k][loc]), `strings.${k}.fr: no plain space before French punctuation`);
  }
}
const HINTS = ['hintEmpty', 'hintLook', 'hintPhoto', 'hintWrong', 'hintWrongMore', 'hintMore', 'hintCap', 'hintFrames', 'hintWrongPhoto', 'hintCount', 'hintCountAgain'];
HINTS.forEach(h => is(KEYS.includes(h), `hint ${h} authored`));
['pSnap', 'pHunt', 'pStory', 'okSnap', 'okHunt', 'okStory', 'okAlbum', 'gSnap', 'gHunt', 'gStory', 'bLong', 'bMedium', 'bShort'].forEach(k => is(KEYS.includes(k), `string ${k} authored`));
const SRC = fs.readFileSync(path.join(DIR, 'blink-camera-core.js'), 'utf8');
HINTS.forEach(h => is(SRC.includes("'" + h + "'"), `core can return ${h}`));
const M = JSON.parse(fs.readFileSync(path.join(MT, 'choice-board-activities.json'), 'utf8')).find(r => r.id === 'choice-board.read-sight-word.rf-k-3-c');
is(M && M.tool === 'blink-camera-activity' && M.task_template === 'blink-camera', 'manifest row runs blink-camera-activity');
is(M && M.alignment.code === 'RF.K.3.c' && M.alignment.grade === 'K', 'manifest alignment RF.K.3.c, grade K');
for (const loc of LOCS) {
  const want = {}; C.games(loc).forEach(g => { want[g] = C.rounds(loc, g).length; });
  is(M && JSON.stringify(M.params.byLocale[loc]) === JSON.stringify(want), `manifest mirrors the core for ${loc}`);
  is(M && /^[a-z0-9-]+$/.test(M.slug[loc] || ''), `slug ${loc} url-safe`);
  is(M && (M.page_title || {})[loc] && (M.page_intro || {})[loc], `title and intro ${loc} present`);
}
const FZ = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no'].map(l => [l, M.slug[l], M.page_title[l], M.page_intro[l]]);
is(crypto.createHash('sha1').update(JSON.stringify(FZ)).digest('hex') === FROZEN, 'frozen slugs, titles and intros (10 locales) unchanged');
is(!/ilmai|gratis/i.test(M.page_title.fi + M.page_intro.fi), 'fi metadata: nothing "free"');

console.log(`verify-blink-camera-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
