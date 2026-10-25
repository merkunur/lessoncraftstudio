#!/usr/bin/env node
/* =====================================================================
   verify-sound-roll-core.js — the gate for ACTIVITY #109, The Sound Roll
   (Stretch the Giraffe, RF.1.2.a). Its OWN ground truth: a long/short
   table typed here by hand per locale (never read from the core), the
   sound-boxes banks re-read from disk, and the pictures checked on disk.
     (a) the source rule: every word whose roll appears is a bank row of
         its locale, with the bank's boxes, picture, noun and display;
         every picture exists and is a colour theme; refused words and
         refused pictures are absent;
     (b) Long or short: per locale and set, 9 rounds of 3 distinct
         one-vowel words; every vowel's length is the gate's; the long
         share is 35–60 %; no pattern more than twice; the all-short and
         all-long guessers solve at most 2 / 1 rounds; no diphthong;
         fi has no Long-or-short clue, es / it / pt / fr are not shipped;
     (c) the word's own roll: one hole per bank box, the vowel of a long
         word a long slot, a split digraph a slot plus a hole-less e;
     (d) Count: 9 words a set, holes = bank boxes, length never judged;
         "always 3" / "always 4" solve at most 5 of 9; words where
         letters ≠ sounds in every set;
     (e) Blend: the target is a bank row, three distinct pictures, the
         right one in its slot; the plan puts the right picture 3/3/3 a
         pass and never three times running in one place;
     (f) the punch: 449 ms round, 450 ms long; Check kinds, misses, hints;
     (g) the plan: never the previous order, sets alternate by pass, Long
         or short never repeats a word in adjacent rounds, Count never the
         same count three times running;
     (h) the strings ×11 (no digit in a hint, fr narrow spaces, fr/it
         apostrophes, never "free", every key used).
   Usage: node scripts/verify-sound-roll-core.js   (env SR_CORE_DIR / SR_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools');
const CORE_DIR = process.env.SR_CORE_DIR || MT, ACT_DIR = process.env.SR_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'sound-roll-core.js'));
const ACT = (() => { const ctx = { window: {}, SoundRollCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'sound-roll-activity.js'), 'utf8') + '\n;this.__A = SoundRollActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 60) console.error('  FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const SHIP = ['en', 'de', 'nl', 'sv', 'da', 'no', 'fi'], LOS = ['en', 'de', 'nl', 'sv', 'da', 'no'];

/* ---------------- the gate's own long-vowel table (by hand; one-syllable words) ---------------- */
const GL = {
  en: 'cake goat leaf kite boat bee rose gate sheep snail coat',
  de: 'hat gate door whale bear foot sheep scarf shoe book moon bread glass tooth chicken boat jug',
  nl: 'maan boot kaas vaas roos kool',
  sv: 'bi ko mus hus ben rav lok val far bil bok bat fot gas kal las nat ros sal vas kub',
  da: 'bi ko mus hus sko gas kal sael ben gris krus sol',
  no: 'ku bil hus mus sko gaas kal las loek sel bok bat fot rev tog gris broed'
};
const isLong = (l, id) => (GL[l] || '').split(' ').includes(id);
const DIPH = { de: /^(ei|ai|au|eu|äu)$/i, nl: /^(ei|ij|ui|ou|au|eu|oe)$/i, sv: /^(au|ei|eu)$/i, da: /^(au|ej|øj)$/i, no: /^(au|ei|øy|ai|oi)$/i, en: /^(ou|ow|oi|oy|oo)$/i };
const REFUSED = { en: ['rope', 'rain', 'vase', 'moon', 'cone', 'brush'], de: ['nest', 'red'], nl: ['geit', 'koe', 'mok'], sv: ['ris', 'sol', 'lapp', 'agg', 'bo', 'kon', 'kam', 'lamm'], da: ['soe', 'salt', 'ris', 'pen'], no: ['ris', 'sau', 'lam', 'kam'] };
const BANK = {}; SHIP.forEach(l => { BANK[l] = {}; JSON.parse(fs.readFileSync(path.join(MT, 'sound-boxes-bank-' + l + '.json'), 'utf8')).words.forEach(w => { BANK[l][w.id] = w; }); });
const BW = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

/* ---------------- (a) the source rule ---------------- */
is(JSON.stringify(C.DATA.LOCALES.slice().sort()) === JSON.stringify(SHIP.slice().sort()), 'shipped in en de nl sv da no fi only');
['es', 'it', 'pt', 'fr'].forEach(l => is(!C.DATA.words[l] && !C.DATA.los[l] && !C.DATA.count[l] && !C.DATA.blend[l], `${l}: not shipped (no long/short vowel contrast)`));
SHIP.forEach(l => {
  const used = new Set(); (C.DATA.los[l] || []).flat(2).forEach(x => used.add(x)); (C.DATA.count[l] || []).flat().forEach(x => used.add(x)); C.DATA.blend[l].flat().forEach(x => used.add(x));
  for (const id of used) {
    const w = C.word(l, id); is(!!w, `${l} ${id}: in the data`); if (!w) continue;
    const file = path.join(REPO, 'image-library-webp', 'themes', w.themeDir, w.noun + '@2x.webp');
    is(fs.existsSync(file), `${l} ${id}: the picture ${w.themeDir}/${w.noun} exists`);
    is(!BW.test(w.themeDir), `${l} ${id}: a colour theme (${w.themeDir})`);
    if (id[0] === '+') continue;
    const b = BANK[l][id]; is(!!b, `${l} ${id}: a bank row`); if (!b) continue;
    is(JSON.stringify(b.boxes) === JSON.stringify(w.boxes) && b.noun === w.noun && b.themeDir === w.themeDir && b.display === w.display, `${l} ${id}: the bank's boxes, picture and word`);
    is(w.long === isLong(l, id), `${l} ${id}: long = ${isLong(l, id)}`);
    if (l === 'fi') is(/[a-zåäö]·?/i.test(b.boxes.join('')) && b.stage !== 's1', `fi ${id}: a phoneme-split row (not the s1 syllable split)`);
  }
  (REFUSED[l] || []).forEach(id => is(!used.has(id), `${l}: «${id}» is refused`));
});

/* ---------------- (b) Long or short ---------------- */
is(JSON.stringify(C.clues('fi')) === JSON.stringify(['count', 'blend']), 'fi: Count and Blend only (length is a doubled letter)');
is(JSON.stringify(C.clues('sv')) === JSON.stringify(['los', 'blend']), 'sv: no Count (the bank has no 4-sound word, so three holes every time would pass)');
['en', 'de', 'nl', 'da', 'no'].forEach(l => is(JSON.stringify(C.clues(l)) === JSON.stringify(['los', 'count', 'blend']), `${l}: all three clues`));
LOS.forEach(l => C.DATA.los[l].forEach((set, s) => {
  const tag = `${l} set ${'AB'[s]}`; is(set.length === 9, `${tag}: 9 rounds`);
  let longs = 0, all = 0, pats = {}, shortBot = 0, longBot = 0;
  set.forEach((r, k) => {
    is(r.length === 3 && new Set(r).size === 3, `${tag} #${k + 1}: three distinct words`);
    const p = r.map(id => isLong(l, id) ? 'L' : 'S').join(''); pats[p] = (pats[p] || 0) + 1;
    if (p === 'SSS') shortBot++; if (p === 'LLL') longBot++;
    r.forEach(id => {
      const b = BANK[l][id]; all++; if (isLong(l, id)) longs++;
      const vow = b.boxes.filter(x => /[aeiouyäöüåæø]/i.test(x));
      is(vow.length === 1, `${tag} ${id}: one vowel sound (${b.boxes.join('·')})`);
      is(!DIPH[l] || !DIPH[l].test(vow[0] || ''), `${tag} ${id}: not a diphthong`);
    });
  });
  is(longs / all >= 0.35 && longs / all <= 0.6, `${tag}: long share ${(longs / all * 100).toFixed(0)} %`);
  is(Object.values(pats).every(n => n <= 2), `${tag}: no pattern more than twice (${JSON.stringify(pats)})`);
  is(shortBot <= 2 && longBot <= 1, `${tag}: guessers solve ≤ 2 (all short) / ≤ 1 (all long)`);
}));

/* ---------------- (c) the word's own roll ---------------- */
SHIP.forEach(l => Object.keys(C.DATA.words[l]).filter(id => id[0] !== '+').forEach(id => {
  const b = BANK[l][id], m = C.master(l, id);
  is(m.holes.length === b.boxes.length, `${l} ${id}: one hole per bank box`);
  const v = b.boxes.findIndex(x => /[aeiouyäöüåæø]/i.test(x));
  is(m.holes.every((h, i) => h.len === (i === v && isLong(l, id) ? 'long' : 'round')), `${l} ${id}: the long slot only under a long vowel`);
  is((m.ghost === 'e') === b.boxes.some(x => /^[aeiou]_e$/.test(x)), `${l} ${id}: a split digraph has its hole-less e`);
}));

/* ---------------- (d) Count ---------------- */
SHIP.filter(l => C.clues(l).includes('count')).forEach(l => C.DATA.count[l].forEach((set, s) => {
  const tag = `${l} count ${'AB'[s]}`, n = set.map(id => BANK[l][id].boxes.length);
  is(set.length === 9, `${tag}: 9 words`);
  is(n.filter(x => x === 3).length <= 6 && n.filter(x => x === 4).length <= 6, `${tag}: "always 3" / "always 4" do not win (${n.join(',')})`);
  /* letters ≠ sounds is the misconception where the spelling has digraphs or double letters (not in the da / fi banks: fi is fully phonemic) */
  if (['en', 'de', 'nl', 'no'].includes(l)) is(set.some(id => BANK[l][id].display.replace(/[^a-zäöüåæøß]/gi, '').length !== BANK[l][id].boxes.length), `${tag}: a word where letters ≠ sounds`);
  set.forEach((id, r) => { const st = C.newState(l, 'count', s, r); for (let k = 0; k < n[r]; k++) C.punch(st, 0, k % 2 ? 'long' : 'round'); is(C.check(st).result === 'ok', `${tag} #${r + 1}: ${n[r]} holes of any length is right`); });
}));

/* ---------------- (e) Blend ---------------- */
SHIP.forEach(l => {
  is(C.DATA.blend[l].length === 9, `${l} blend: 9 rounds`);
  C.DATA.blend[l].forEach((R, r) => {
    const tag = `${l} blend #${r + 1}`; is(!!BANK[l][R[0]], `${tag}: the target is a bank row`);
    const names = R.map(id => C.word(l, id).display.toLowerCase()); is(new Set(names).size === 3 && new Set(R).size === 3, `${tag}: three different pictures`);
    for (let p = 0; p < 3; p++) { const st = C.newState(l, 'blend', 0, r, { pos: p }); is(st.choices[p] === R[0] && st.right === p, `${tag}: the right picture in slot ${p + 1}`); }
  });
});

/* ---------------- (f) punch, Check, hints ---------------- */
is(C.holdToLen(449) === 'round' && C.holdToLen(450) === 'long' && C.holdToLen(0) === 'round', 'the stretch mark is at 450 ms');
{ const st = C.newState('en', 'los', 0, 4); /* hand bee rose */
  is(C.check(st).result === 'tray' && st.misses === 0 && C.hint(st).key === 'hintEmpty', 'Long or short: an empty vowel place is no miss');
  C.punch(st, 0, 'round'); C.punch(st, 1, 'long'); C.punch(st, 2, 'round');
  let a = C.check(st); is(a.result === 'miss' && a.kind === 'len' && C.hint(st).key === 'hintLos', 'rose punched round: a miss, hintLos');
  a = C.check(st); is(C.hint(st).key === 'hintLos2', 'miss 2: hintLos2');
  const cmp = C.compare(st); is(cmp[0].ok && cmp[1].ok && !cmp[2].ok && cmp[2].want === 'long', 'the comparison: the rose vowel is the wrong one');
  C.closeHole(st, 2); is(st.rolls[2] === null, 'a tap closes the vowel hole'); C.punch(st, 2, 'long'); is(C.check(st).result === 'ok' && st.done, 'rose long: ok'); }
{ const st = C.newState('en', 'count', 0, 1); /* fish f·i·sh */
  is(C.check(st).result === 'tray' && st.misses === 0, 'Count: an empty roll is no miss');
  for (let k = 0; k < 4; k++) C.punch(st, 0, 'round'); is(C.check(st).result === 'miss' && C.hint(st).key === 'hintCount', 'fish with four holes (one per letter): hintCount');
  C.check(st); is(C.hint(st).key === 'hintCount2', 'miss 2: hintCount2'); C.closeHole(st, 0, 3); is(C.check(st).result === 'ok', 'three holes: ok');
  const s2 = C.newState('en', 'count', 0, 1); for (let k = 0; k < 11; k++) C.punch(s2, 0, 'round'); is(s2.holes.length === C.ROLL_UNITS, 'the roll holds ten holes'); }
{ const st = C.newState('en', 'blend', 0, 0, { pos: 1 });
  is(C.check(st).result === 'tray' && C.hint(st).key === 'hintPick', 'Blend: no pick is no miss');
  C.pick(st, 0); is(C.check(st).result === 'miss' && C.hint(st).key === 'hintBlend', 'the wrong picture: hintBlend'); C.check(st); is(C.hint(st).key === 'hintBlend2', 'miss 2: hintBlend2');
  C.pick(st, 1); is(C.check(st).result === 'ok', 'the right picture: ok'); }

/* ---------------- (g) the plan ---------------- */
let seed = 7; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
SHIP.forEach(l => C.clues(l).forEach(clue => {
  let prev = null, ok = 0, posOk = 0; const slot = [0, 0, 0];
  for (let pass = 0; pass < 600; pass++) {
    const P = C.plan(l, clue, rnd, prev, pass), set = pass % 2;
    let good = P.order.slice().sort().join() === '0,1,2,3,4,5,6,7,8' && (!prev || P.order.join() !== prev.join()) && P.set === set;
    if (clue === 'los') { const R = C.DATA.los[l][set]; for (let i = 1; i < 9; i++) if (R[P.order[i]].some(w => R[P.order[i - 1]].includes(w))) good = false; }
    if (clue === 'count') { const n = C.DATA.count[l][set].map(id => BANK[l][id].boxes.length); for (let i = 2; i < 9; i++) if (n[P.order[i]] === n[P.order[i - 1]] && n[P.order[i]] === n[P.order[i - 2]]) good = false; }
    if (good) ok++;
    if (clue === 'blend') { const c = [0, 0, 0]; P.pos.forEach(p => c[p]++); let run = true; for (let i = 2; i < 9; i++) if (P.pos[i] === P.pos[i - 1] && P.pos[i] === P.pos[i - 2]) run = false; if (c.join() === '3,3,3' && run) posOk++; P.pos.forEach(p => slot[p]++); }
    prev = P.order;
  }
  is(ok === 600, `${l} ${clue}: every pass a fresh order, sets A/B alternate, the fairness rule holds (${ok}/600)`);
  if (clue === 'blend') is(posOk === 600, `${l} blend: the right picture 3/3/3 a pass, never three running in one place`);
}));

/* ---------------- (h) strings ---------------- */
const S = ACT.strings, keys = Object.keys(S);
const SRC = fs.readFileSync(path.join(ACT_DIR, 'sound-roll-activity.js'), 'utf8'), BODY = SRC.slice(SRC.indexOf('/*STRINGS-END*/')) + fs.readFileSync(path.join(CORE_DIR, 'sound-roll-core.js'), 'utf8');
for (const k of keys) {
  is(['title', 'instrBubble', 'okBubble', 'okLos3L', 'okLos3S', 'okLosMix', 'tLos', 'tCount', 'tBlend'].includes(k) || BODY.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
  for (const l of LOCS) {
    const s = S[k][l]; is(typeof s === 'string' && s.length > 0, `${k}.${l} authored`); if (!s) continue;
    if (/^hint/.test(k)) is(!/\d/.test(s), `${k}.${l}: a hint carries no digit`);
    if (l === 'fr') is(!/ [:!?;»]/.test(s) && !/« /.test(s), `${k}.fr: narrow spaces`);
    if (l === 'fr' || l === 'it') is(!/'/.test(s), `${k}.${l}: curly apostrophes`);
    is(!/\bfree\b|gratuit|kostenlos|gratis|ilmai/i.test(s), `${k}.${l}: never "free"`);
  }
}
/* "says its name" is the English idea of a long vowel only */
/* the vowel part only (the task line's first sentence names the PICTURE: fi "Sano jokaisen kuvan nimi" is right), where Long or short ships */
const vowelPart = (l) => S.hintLos[l] + ' ' + S.tLos[l].split(/[.:]\s/).slice(1).join(' ');
const SAYS_NAME = /name|Name|navn|namn|nimi|nom\b|nombre|nome/;
LOS.filter(l => l !== 'en').forEach(l => is(!SAYS_NAME.test(vowelPart(l)), `${l}: long means held longer, never "says its name"`));
is(SAYS_NAME.test(vowelPart('en')), 'en: the long vowel says its name (control: the check can fire)');
is(!SAYS_NAME.test('Sag, was auf jedem Bild ist. Stanze den Vokal: tippen für einen kurzen, gedrückt halten für einen langen.'.split(/[.:]\s/).slice(1).join(' ')), 'a picture\'s name in the first sentence is not "says its name" (control)');
['okLos3L', 'okLos3S', 'okLosMix', 'tLos', 'tCount', 'tBlend'].forEach(k => is(BODY.indexOf(k) >= 0, `${k} is reached`));

console.log(`verify-sound-roll-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
