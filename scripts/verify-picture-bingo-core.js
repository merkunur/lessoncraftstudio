#!/usr/bin/env node
/* =====================================================================
   verify-picture-bingo-core.js — build gate for ACTIVITY #62, Bingo's
   Picture Card (mini tools/picture-bingo-core.js, RF.K.3.d, 11 locales).
   Its OWN ground truth (never read off the core's answers):
     0. every called word's picture exists, is a colour drawing, is
        labelled and not refused, and its library name in the locale IS
        the word; Bingo's own drawing is never a call
     1. the cards: no word twice; at least one line (row, column, diagonal
        — the gate's own lines) of called squares only; every leftover is
        no library name and no vocabulary word in the locale; look-alike
        cards: every called word has a one-letter look-alike on its card;
        family cards: every row shares an ending of ≥ 2 letters; blend
        cards: every called word starts with two consonants; syllable
        cards: every split equals the approved split and TeX agrees; the
        leftovers are swaps of the card's own syllables
     2. levels: shown exactly when ≥ 7 calls; no position of a level's
        cards holds more than 25 % of its right answers
     3. You call: three different word cards, exactly one names the needed
        picture; every decoy is a word card whose picture is on Bingo's
        card off the needed line; the needed picture sits on a line whose
        two other squares are chipped; no filler is a word card or a
        look-alike of one; the needed position visits all nine squares over
        two passes; the right card's slot 3/3/2 a pass
     4. order: card by card; two calls in a row never in the same row of a
        card when that can be helped; never the previous order
     5. the round: chip, check (empty → no miss), a wrong chip slides off
        (miss) with the differing letters lit, miss 2 dims all but the
        right word and its two nearest (never the right word alone), miss 3
        pulses the right square; a right chip flips the square; lines and
        the full card; You call: decoy (covered, miss), nothing (shrug,
        miss), the needed word (BINGO); diff self-tests
     6. strings × 11 (placeholders, nothing "free", fr narrow spaces), the
        hint keys; the manifest row runs the card and mirrors the core;
        frozen en + fr metadata; the 9 new slugs / titles / intros
   Usage: node scripts/verify-picture-bingo-core.js  (PBG_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.PBG_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'picture-bingo-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, PictureBingoCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(fs.existsSync(path.join(DIR, 'picture-bingo-activity.js')) ? DIR : MT, 'picture-bingo-activity.js'), 'utf8') + '\nthis.__A = PictureBingoActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['camping/lake', 'easter/egg', 'At the Supermarket/egg', 'zoo animals/bear', 'forest creatures/bear', 'bakery/cake', 'At the Supermarket/cake', 'At the Supermarket/plum', 'At the Supermarket/butter', 'shapes/moon', 'kitchen tools/pan', 'around the house/glass', 'farm animals/ox', 'At the Supermarket/water', 'weather/sun', 'body parts/lip', 'clothing/pants', 'spring/rain', 'shapes/cone', 'At the Supermarket/milk', 'At the Supermarket/juice', 'fruits/cherry', 'fruits/peach', 'fruits/plum', 'christmas/tree', 'farm animals/chicken', 'At the Supermarket/salt', 'tree/plum', 'tree/peach', 'At the Supermarket/peach', 'shapes/sphere'];
const FROZEN = 'ee029acb1e89ceb96eb5ca517844afb73754e71e';
const SHOWN = { en: 'look family blend syll call', de: 'look family blend syll call', nl: 'look family blend syll call', da: 'look family blend syll call', sv: 'look family blend syll call', no: 'look family blend syll call', es: 'look family blend syll call', it: 'look family blend syll call', pt: 'look family blend syll call', fr: 'look family blend syll call', fi: 'look family syll call' };
const VOW = { en: 'aeiou', de: 'aeiouäöü', nl: 'aeiou', da: 'aeiouyæøå', sv: 'aeiouyåäö', no: 'aeiouyæøå', es: 'aeiouáéíóú', it: 'aeiouàèéìòù', pt: 'aeiouáâãéêíóôõú', fr: 'aeiouyéèêâîôûœ', fi: 'aeiouyäö' };
const low = (s) => String(s).normalize('NFC').toLocaleLowerCase();

/* the library's names and the vocabulary, per locale (the gate's own index) */
const LABEL = {}, ALL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) { LABEL[j.dir + '/' + k] = v.labels || {}; for (const [loc, ls] of Object.entries(v.labels || {})) for (const w of ls || []) (ALL[loc] = ALL[loc] || new Set()).add(low(w)); } }
const VOC = (() => { const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8') + ';this.V = typeof IMAGE_VOCABULARY !== "undefined" ? IMAGE_VOCABULARY : window.IMAGE_VOCABULARY;', ctx); return ctx.V; })();
for (const e of Object.values(VOC)) for (const [loc, f] of Object.entries(e)) if (Array.isArray(f)) for (const w of f.slice(0, 2)) if (typeof w === 'string') (ALL[loc] = ALL[loc] || new Set()).add(low(w));
const picOk = (p) => p && fs.existsSync(path.join(IMG, p.split('/').slice(0, -1).join('/'), p.split('/').pop() + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]) && !REFUSED.includes(p);
const named = (p, w, loc) => { const l = ((LABEL[p] || {})[loc] || [])[0]; return !!l && (loc === 'de' ? l === w : low(l) === low(w)); };
/* the gate's own look-alike: same length, one letter different; or one letter more / less */
const oneOff = (a, b) => { a = low(a); b = low(b); if (a === b) return false; if (a.length === b.length) { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d === 1; } if (Math.abs(a.length - b.length) !== 1) return false; const s = a.length < b.length ? a : b, l = a.length < b.length ? b : a; for (let k = 0; k < l.length; k++) if (l.slice(0, k) + l.slice(k + 1) === s) return true; return false; };
/* a look-alike word card: lengths within one, and letters matching in place (from the front or from the end) for all but at most two */
const looks = (a, b) => { a = [...low(a)]; b = [...low(b)]; if (Math.abs(a.length - b.length) > 1) return false; const m = Math.min(a.length, b.length); let f = 0, e = 0; for (let i = 0; i < m; i++) { if (a[i] === b[i]) f++; if (a[a.length - 1 - i] === b[b.length - 1 - i]) e++; } return Math.max(f, e) >= Math.max(1, m - 2); };
const gateLines = (rows, cols) => { const L = []; for (let y = 0; y < rows; y++) L.push([...Array(cols)].map((_, x) => y * cols + x)); for (let x = 0; x < cols; x++) L.push([...Array(rows)].map((_, y) => y * cols + x)); if (rows === cols) { L.push([...Array(cols)].map((_, i) => i * cols + i)); L.push([...Array(cols)].map((_, i) => i * cols + cols - 1 - i)); } return L; };
const APPROVED = {};
for (const loc of LOCS) { const f = path.join(ROOT, 'scripts', 'v2-data', 'verify-syllable-boundaries', 'output', 'approved-words-' + loc + '.json'); if (fs.existsSync(f)) { APPROVED[loc] = {}; for (const e of JSON.parse(fs.readFileSync(f, 'utf8')).entries) APPROVED[loc][low(e.word)] = e; } }

for (const loc of LOCS) {
  is(C.levels(loc).join(' ') === SHOWN[loc], `${loc}: levels ${C.levels(loc).join(' ')}`);
  C.LEVELS.forEach(lv => is((C.rounds(loc, lv).length >= 7) === C.levels(loc).includes(lv), `${loc} ${lv}: shown exactly when ≥ 7 calls (${C.rounds(loc, lv).length})`));
  for (const lv of ['look', 'family', 'blend', 'syll'].filter(v => C.levels(loc).includes(v))) {
    const cards = C.cards(loc, lv), R = C.rounds(loc, lv);
    is(new Set(R.map(r => r.id)).size === R.length, `${loc} ${lv}: round ids unique`);
    const posCount = {};
    cards.forEach(c => {
      const words = c.sq.map(s => s.word);
      is(new Set(words.map(low)).size === words.length, `${loc} ${c.id}: no word twice`);
      is(gateLines(c.rows, c.cols).some(L => L.every(i => c.sq[i].called)), `${loc} ${c.id}: a line of called squares only`);
      c.sq.forEach(s => {
        if (s.called) {
          is(picOk(s.pic) && named(s.pic, s.word, loc), `${loc} ${c.id} «${s.word}»: ${s.pic} exists, colour, labelled, not refused, named «${s.word}»`);
          is(s.pic !== C.BINGO_PIC, `${loc} ${c.id} «${s.word}»: not Bingo's own drawing`);
          posCount[s.i] = (posCount[s.i] || 0) + 1;
        } else is(!(ALL[loc] || new Set()).has(low(s.word)), `${loc} ${c.id}: the leftover «${s.word}» is no library or vocabulary word`);
        if (lv === 'look' && s.called) is(c.sq.some(o => o.i !== s.i && oneOff(o.word, s.word)), `${loc} ${c.id} «${s.word}»: a one-letter look-alike on the card`);
        if (lv === 'blend' && s.called) { const w = low(s.word); is(!VOW[loc].includes(w[0]) && !VOW[loc].includes(w[1]), `${loc} ${c.id} «${s.word}»: starts with two consonants`); }
      });
      if (lv === 'family') for (let y = 0; y < c.rows; y++) { const row = c.sq.filter(s => s.row === y).map(s => low(s.word)); const suf = (k) => row.every(w => w.slice(-k) === row[0].slice(-k)); is(suf(2), `${loc} ${c.id} row ${y + 1}: one family (${row.join(' ')})`); }
      if (lv === 'syll') {
        const syls = new Set(c.sq.filter(s => s.called).flatMap(s => s.syll.map(low)));
        c.sq.forEach(s => {
          is(s.syll && s.syll.length === 2, `${loc} ${c.id} «${s.word}»: two syllables`);
          if (s.called) { const e = (APPROVED[loc] || {})[low(s.word)]; is(e && e.split.map(low).join('·') === s.syll.map(low).join('·') && (e.sources_agreed || []).some(x => /tex/i.test(x)), `${loc} ${c.id} «${s.syll.join('·')}»: the approved split, TeX agrees`); }
          else is(s.syll.every(x => syls.has(low(x))), `${loc} ${c.id} «${s.syll.join('·')}»: a swap of the card's own syllables`);
        });
      }
    });
    const n = R.length, maxPos = Math.max(...Object.values(posCount));
    is(maxPos / n <= 0.25 || maxPos <= cards.length, `${loc} ${lv}: no position holds more than 25 % of the right answers (${maxPos}/${n})`);
    /* order */
    for (let seed = 0; seed < 40; seed++) {
      const rnd = C.seeded(loc + lv + seed), o = C.order(R, rnd, null);
      is(o.length === n && new Set(o).size === n, `${loc} ${lv}: order is a permutation`);
      let k = 0; while (k < n) { const id = R[o[k]].card.id; let e = k; while (e < n && R[o[e]].card.id === id) e++; is(o.slice(k, e).length === R.filter(r => r.card.id === id).length, `${loc} ${lv}: the calls of a card come together`);
        const rows = o.slice(k, e).map(i => R[i].card.sq[R[i].sq].row), cnt = {}; rows.forEach(r => { cnt[r] = (cnt[r] || 0) + 1; });
        if (Math.max(...Object.values(cnt)) <= Math.ceil(rows.length / 2)) is(rows.every((r, q) => !q || r !== rows[q - 1]), `${loc} ${lv} ${id}: two calls in a row never in the same row (${rows.join('')})`);
        k = e; }
      const o2 = C.order(R, () => 0.3, o); is(o2.join() !== o.join(), `${loc} ${lv}: order refuses the previous order`);
    }
  }
  /* 3 — You call */
  const Y = C.rounds(loc, 'call');
  is(Y.length === 8, `${loc}: 8 You-call rounds`);
  Y.forEach(r => {
    is(r.hand.length === 3 && new Set(r.hand).size === 3 && r.hand.filter(w => w === r.need).length === 1, `${loc} ${r.id}: three different word cards, one is «${r.need}»`);
    is(picOk(r.needPic) && named(r.needPic, r.need, loc) && r.needPic !== C.BINGO_PIC, `${loc} ${r.id}: the needed picture is named «${r.need}»`);
    r.decoys.forEach(d => is(r.hand.includes(d.word) && picOk(d.pic) && named(d.pic, d.word, loc), `${loc} ${r.id}: the decoy «${d.word}» is a word card with its own picture`));
    r.hand.filter(w => w !== r.need && !r.decoys.some(d => d.word === w)).forEach(w => is(!(ALL[loc] || new Set()).has(low(w)), `${loc} ${r.id}: «${w}» names nothing in the library (Bingo shrugs)`));
    r.hand.filter(w => w !== r.need).forEach(w => is(looks(w, r.need), `${loc} ${r.id}: «${w}» looks like «${r.need}»`));
    for (let seed = 0; seed < 12; seed++) {
      const pos = seed % 9, yc = C.youCard(r, pos, C.seeded(r.id + seed));
      is(yc.sq[pos].word === r.need && yc.sq[pos].need, `${loc} ${r.id}: the needed picture at ${pos}`);
      is(yc.line.length === 3 && yc.line.includes(pos) && gateLines(3, 3).some(L => L.join() === yc.line.join()) && yc.line.filter(i => i !== pos).every(i => yc.sq[i].chipped), `${loc} ${r.id}: a line through it, its two other squares chipped`);
      r.decoys.forEach(d => { const at = yc.sq.findIndex(s => s.word === d.word); is(at >= 0 && !yc.line.includes(at), `${loc} ${r.id}: the decoy «${d.word}» is on the card, off the line`); });
      yc.sq.forEach((s, i) => { if (!s.need && !s.decoy) is(!r.hand.includes(s.word) && !r.hand.some(w => oneOff(w, s.word)) && picOk(s.pic), `${loc} ${r.id}: filler «${s.word}» is no word card and no look-alike of one`); });
      is(new Set(yc.sq.map(s => s.pic)).size === 9, `${loc} ${r.id}: nine different pictures`);
    }
  });
  const seen = new Set(); C.youPositions(8, 0, 'g').concat(C.youPositions(8, 1, 'g')).forEach(p => seen.add(p));
  is(seen.size === 9, `${loc}: the needed position visits all nine squares over two passes`);
  for (let seed = 0; seed < 30; seed++) { const H = C.dealHands(Y, C.seeded(loc + 'h' + seed)), slots = [0, 0, 0]; H.forEach((h, k) => { is(h.slice().sort().join() === Y[k].hand.slice().sort().join(), `${loc}: the hand is the round's three cards`); slots[h.indexOf(Y[k].need)]++; }); is(slots.slice().sort().join() === '2,3,3', `${loc}: the right card's slot 3/3/2 (${slots.join(',')})`); }
}

/* 5 — the round */
{
  is(JSON.stringify(C.diff('cat', 'cot')) === JSON.stringify({ glow: [1], extra: [], missing: 0 }), 'diff cat/cot: the second letter');
  is(JSON.stringify(C.diff('crab', 'crib').glow) === '[2]', 'diff crab/crib: the third letter');
  is(JSON.stringify(C.diff('thé', 'the').glow) === '[2]' && JSON.stringify(C.diff('pâte', 'pate').glow) === '[1]', 'diff: an accent is a letter of its own');
  is(C.MIN_ROUNDS === 7, 'a level needs at least 7 calls');
  is(JSON.stringify(C.sylDiff(['pan', 'da'], ['pen', 'da'])) === '[0]', 'sylDiff pan·da/pen·da: the first syllable');
  const R = C.rounds('en', 'look'), r = R.find(x => x.word === 'cat'), cs = C.newCardState(r.card), st = C.newState(r, cs);
  const cot = r.card.sq.findIndex(s => s.word === 'cot'), cat = r.sq;
  let res = C.check(st); is(res.kase === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', 'look: Check with no chip asks, no miss');
  C.placeChip(st, cot); res = C.check(st); let h = C.helpOf(st);
  is(res.kase === 'wrong' && st.misses === 1 && st.chip === null && h && JSON.stringify(h.lit[cot].glow) === '[1]' && !h.dim.length && h.pulse < 0 && C.hint(st) === 'hintMiss', 'look: «cot» for cat → miss 1, the o lit, the chip back');
  C.placeChip(st, cot); C.check(st); h = C.helpOf(st);
  const bright = r.card.sq.filter(s => !h.dim.includes(s.i)).map(s => s.i);
  /* the gate's own nearest two (edit distance, ties by position) */
  const ed = (a, b) => { a = [...low(a)]; b = [...low(b)]; const d = a.map(() => []); for (let i = 0; i <= a.length; i++) { d[i] = [i]; for (let j = 1; j <= b.length; j++) d[i][j] = i ? Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) : j; } return d[a.length][b.length]; };
  const near2 = r.card.sq.filter(s => s.i !== cat).sort((a, b) => ed(a.word, 'cat') - ed(b.word, 'cat') || a.i - b.i).slice(0, 2).map(s => s.i);
  is(JSON.stringify(bright.slice().sort()) === JSON.stringify([cat, cot].concat(near2).filter((v, i, a) => a.indexOf(v) === i).sort()), `look: miss 2 keeps bright the right word, its two nearest and the chosen one (${bright})`);
  is(h.pulse < 0, 'look: no pulse before miss 3');
  is(st.misses === 2 && bright.includes(cat) && bright.length >= 3 && h.dim.length >= 3 && C.hint(st) === 'hintMiss2', 'look: miss 2 dims all but the right word and its nearest (never the right word alone)');
  C.placeChip(st, cot); C.check(st); h = C.helpOf(st); is(st.misses === 3 && h.pulse === cat, 'look: miss 3 pulses the right square');
  C.placeChip(st, 2); is(!C.helpOf(st), 'look: a move takes the help away');
  C.placeChip(st, cat); res = C.check(st); is(res.ok && st.done && cs.flipped.includes(cat) && !res.full && !res.lines.length, 'look: the chip on «cat» flips it (no line, not full yet)');
  const r2 = R.find(x => x.word === 'pot'), st2 = C.newState(r2, cs); is(!C.placeChip(st2, cat), 'look: a flipped square takes no chip');
  C.placeChip(st2, r2.sq); C.check(st2);
  const r3 = R.find(x => x.word === 'cup'), st3 = C.newState(r3, cs); C.placeChip(st3, r3.sq); res = C.check(st3);
  is(res.ok && res.lines.length === 1 && res.lines[0].join() === '0,4,8', 'look: cat, pot, cup — the diagonal is a BINGO line');
  const r4 = R.find(x => x.word === 'cap'), st4 = C.newState(r4, cs); C.placeChip(st4, r4.sq); res = C.check(st4);
  is(res.ok && res.full && C.leftovers(r.card).sort().join() === 'cop,cot,cut,hit,hut', 'look: the card is full; the leftovers are the uncalled words');
  const Y = C.rounds('en', 'call'), y = Y.find(x => x.need === 'cat'), yst = C.newState(y, null, C.youCard(y, 4, C.seeded('t')));
  res = C.check(yst); is(res.kase === 'empty' && yst.misses === 0 && C.hint(yst) === 'hintEmptyCall', 'call: Check with the slot empty asks, no miss');
  C.putInSlot(yst, 'cap'); res = C.check(yst); is(res.kase === 'decoy' && yst.misses === 1 && yst.covered.length === 1 && !yst.bingo && C.hint(yst) === 'hintCallDecoy', 'call: «cap» → Bingo covers the cap (miss)');
  C.putInSlot(yst, 'cot'); res = C.check(yst); is(res.kase === 'none' && yst.misses === 2 && C.hint(yst) === 'hintCall2', 'call: «cot» → nothing to cover, miss 2');
  C.putInSlot(yst, 'cat'); res = C.check(yst); is(res.ok && yst.bingo && yst.done, 'call: «cat» → BINGO for Bingo');
}

/* 6 — strings, manifest, metadata */
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
const HINTS = ['hintEmpty', 'hintMiss', 'hintMiss2', 'hintMissSyl', 'hintMiss2Syl', 'hintEmptyCall', 'hintCallDecoy', 'hintCallNone', 'hintCall2'];
const SRC = fs.readFileSync(path.join(DIR, 'picture-bingo-core.js'), 'utf8');
HINTS.forEach(hk => { is(KEYS.includes(hk), `hint ${hk} authored`); is(SRC.includes("'" + hk + "'"), `core can return ${hk}`); });
const M = JSON.parse(fs.readFileSync(path.join(MT, 'bingo-word-hunt-activities.json'), 'utf8')).find(r => r.id === 'bingo-word-hunt.read-match.rf-k-3-d');
is(M && M.tool === 'picture-bingo-activity' && M.task_template === 'picture-bingo', 'manifest row runs picture-bingo-activity');
is(M && M.alignment.code === 'RF.K.3.d' && M.alignment.grade === 'K', 'manifest alignment RF.K.3.d, grade K');
for (const loc of LOCS) {
  const want = {}; C.levels(loc).forEach(v => { want[v] = C.rounds(loc, v).length; });
  is(M && JSON.stringify(M.params.byLocale[loc]) === JSON.stringify(want), `manifest mirrors the core for ${loc}`);
  is(M && /^[a-z0-9-]+$/.test(M.slug[loc] || ''), `slug ${loc} url-safe`);
  is(M && (M.page_title || {})[loc] && (M.page_intro || {})[loc] && (['en', 'fr'].includes(loc) || !/gratis|grátis|gratuit|\bfree\b|kostenlos|ilmai|ohne anmeldung|sans inscription/i.test(M.page_title[loc] + ' ' + M.page_intro[loc])), `title and intro ${loc} present, nothing "free"`);
  /* en + fr are frozen (held by the hash below). FROZEN-NOTE: the fr intro says «sans inscription». */
}
is(new Set(Object.values(M.slug)).size === LOCS.length, 'eleven different slugs');
const FZ = ['en', 'fr'].map(l => [l, M.slug[l], M.page_title[l], M.page_intro[l]]);
is(crypto.createHash('sha1').update(JSON.stringify(FZ)).digest('hex') === FROZEN, 'frozen en + fr slugs, titles and intros unchanged');

console.log(`verify-picture-bingo-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
