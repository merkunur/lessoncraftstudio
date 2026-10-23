#!/usr/bin/env node
/* =====================================================================
   verify-plate-stack-core.js — the gate of ACTIVITY #75, DAISY'S PLATE
   STACK (L.K.1.c, 11 locales). Its own ground truth, never read off the core:
     1. every round's [singular, plural] is the library label of its picture
        (read here from mini tools/pictures/*.json), and the gate's OWN split
        of that pair decides the class: stem + ending (the singular may lose
        one last vowel), or a word that changes inside, or one that stays
        the same; the right move builds exactly the plural, the start shows
        exactly the singular
     2. no wrong tile builds the plural, the singular, or a plural on the
        refusal list (attested alternative plurals); nothing living rides a
        plate (animals and the elf sit on stools); every picture is in a
        colour theme; every level has ≥ 7 rounds in every locale
     3. the answer slot: each slot exactly 3 of 9 per level; the bots
        "always the first tile", "always the A ending", "always flip" stay
        under their caps
     4. the tickets: 2–5 to build (pt sentences 3–5), back to one = 1 from
        3–5; every sentence carries its own number word (fi: none — Finnish
        numerals take the partitive singular)
     5. the machine: one holder keeps the slot shut; the second opens it;
        an ending will not seat on a word that changes inside; the flip tile
        will not change a regular word; back to one with the ending on, the
        tile stays (rattles) and Check says so; every miss reason; the
        second miss lights the right tile; Write it spells the ending
     6. 500 passes never repeat the last order or start with its last
        round; strings × 11 and used; the manifest mirror, the tool
        repointed, the six frozen locales, the five new ones
   Usage: node scripts/verify-plate-stack-core.js  (PS_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools');
const DIR = process.env.PS_CORE_DIR || MT;
const cx = { module: { exports: {} } }; cx.self = cx; vm.createContext(cx);
vm.runInContext(fs.readFileSync(path.join(DIR, 'plate-stack-core.js'), 'utf8'), cx);
const C = cx.module.exports;
const ACT = (() => { const c = { window: {}, PlateStackCore: C }; vm.createContext(c); vm.runInContext(fs.readFileSync(path.join(DIR, 'plate-stack-activity.js'), 'utf8') + '\nthis.__A = PlateStackActivity;', c); return c.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= +(process.env.PS_SHOW || 60)) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'], LVS = ['l1', 'l2', 'l3', 'l4', 'l5'];
const PIC = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) if (f.endsWith('.json') && f[0] !== '_') { const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); PIC[j.dir] = j; }
const LIVING = ['farm animals', 'animals', 'forest creatures', 'birds', 'birds 2', 'pets', 'spring/bird', 'christmas/elf'];
const living = (th, key) => LIVING.includes(th) || LIVING.includes(th + '/' + key);
/* attested alternative plurals a wrong tile must never build (and words refused for having two plurals) */
const REFUSED = { nl: ['Appel', 'Sinaasappel', 'Aardappel', 'Wortel'], de: ['Pizza'], en: ['Fish'], it: ['Frutto'] };
const VOW = /[aeiouyäöüåæøéèêàâîôûíóúãõ]/i;
/* the gate's own split of a [singular, plural] pair */
function split(s, p) {
  if (s === p) return { cls: 'same' };
  let i = 0; while (i < s.length && s[i] === p[i]) i++;
  const stem = s.slice(0, i), a = s.slice(i), b = p.slice(i);
  if (stem.length < 2) return { cls: 'flip' };
  if (!a && b.length >= 1 && b.length <= 3 && !(b[0] === stem[stem.length - 1] && !VOW.test(b[0]))) return { cls: 'end', stem, a, b };
  if (a.length === 1 && VOW.test(a) && b.length >= 1 && b.length <= 3 && VOW.test(b[0])) return { cls: 'end', stem, a, b };
  return { cls: 'flip' };
}
const build = (st, r, t) => { while (st.holders < r.target) C.add(st); while (st.holders > r.target) C.remove(st); };

/* 1 + 2 */
for (const loc of LOCS) for (const lv of LVS) {
  const ids = C.ids(loc, lv);
  is(ids.length >= 7, `${loc} ${lv}: ≥ 7 rounds (${ids.length})`);
  for (const i of ids) {
    const r = C.round(loc, lv, i), tag = `${loc} ${lv} ${r.sing}`;
    const e = PIC[r.theme] && PIC[r.theme].nouns[r.key], lab = e && e.labels[loc];
    is(!!lab && lab[0] === r.sing && lab[1] === r.plural, `${tag}: the library's own pair (${lab && lab.slice(0, 2)})`);
    if (!lab) continue;
    is(!/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i.test(r.theme), `${tag}: a colour theme`);
    is((r.holder === 'stool') === living(r.theme, r.key), `${tag}: ${living(r.theme, r.key) ? 'a customer on a stool' : 'on a plate'} (${r.holder})`);
    const g = split(lab[0], lab[1]);
    is(g.cls === r.cls, `${tag}: class ${g.cls} (core ${r.cls})`);
    is(!(REFUSED[loc] || []).includes(r.sing), `${tag}: not a word with two plurals`);
    /* the start shows the singular (or, back to one, the plural); the right move builds the target word */
    const st = C.newState(r, 'tiles');
    is(C.word(st) === (r.back ? r.plural : r.sing) && st.holders === r.start, `${tag}: starts as «${C.word(st)}» with ${st.holders}`);
    build(st, r);
    if (r.back) { if (r.cls === 'flip') C.drop(st, 'flip'); else C.pull(st); } else C.drop(st, r.right);
    is(C.word(st) === (r.back ? r.sing : r.plural) && C.check(st).ok, `${tag}: the right move builds «${C.word(st)}»`);
    /* every wrong tile builds something else — never the plural, never the singular */
    if (!r.back) for (const t of r.tray) {
      if (t === r.right) continue;
      const s2 = C.newState(r, 'tiles'); build(s2, r); C.drop(s2, t); const w = C.word(s2);
      /* a word that stays the same already READS as its plural: there the rule is that Check refuses the move */
      is((r.cls === 'same' || w !== r.plural) && !C.check(s2).ok, `${tag}: the wrong tile ${t} is not the answer («${w}»)`);
      if (t.startsWith('e:') && r.cls === 'end') is(w !== r.sing, `${tag}: the wrong tile ${t} does not make the singular`);
    }
    /* the tray: three tiles, the right one in its slot; a flip word's tray has the flip tile; a word that stays the same has the empty tile */
    is(r.tray.length === 3 && r.tray[r.slot] === r.right && new Set(r.tray).size === 3, `${tag}: three different tiles, the right one in slot ${r.slot}`);
    is(r.cls !== 'flip' || r.right === 'flip', `${tag}: a word that changes inside is flipped`);
    is(r.cls !== 'same' || (r.right === 'none' && r.tray.includes('flip')), `${tag}: a word that stays the same takes the empty tile`);
  }
}

/* 3 — the answer slot and the bots */
for (const loc of LOCS) for (const lv of ['l1', 'l2', 'l3', 'l5']) {
  const rs = C.ids(loc, lv).map(i => C.round(loc, lv, i)), cnt = [0, 0, 0];
  rs.forEach(r => cnt[r.slot]++);
  is(rs.length === 9 ? cnt.every(n => n === 3) : true, `${loc} ${lv}: the right tile 3/3/3 by slot (${cnt})`);
  const first = rs.filter(r => r.tray[0] === r.right).length;
  is(first <= 3, `${loc} ${lv}: "always the first tile" wins ${first}/9 ≤ 3`);
  const A = 'e:' + C.endOf(C.DATA.POOLS[loc].A), alwaysA = rs.filter(r => r.right === A).length;
  if (lv === 'l2') is(alwaysA <= 5, `${loc} l2: "always ${A}" wins ${alwaysA}/9 ≤ 5`);
  if (lv === 'l3') { const fl = rs.filter(r => r.right === 'flip').length; is(fl <= 6, `${loc} l3: "always flip" wins ${fl}/9 ≤ 6`); }
}

/* 4 — tickets and sentences */
for (const loc of LOCS) for (const lv of LVS) for (const i of C.ids(loc, lv)) {
  const r = C.round(loc, lv, i), tag = `${loc} ${lv} ${r.sing}`;
  if (lv === 'l4') is(r.target === 1 && r.start >= 3 && r.start <= 5, `${tag}: back to one from ${r.start}`);
  else is(r.start === 1 && r.target >= (lv === 'l5' && loc === 'pt' ? 3 : 2) && r.target <= 5, `${tag}: build ${r.target} from one`);
  if (lv === 'l5') {
    is(typeof r.sentence === 'string' && r.sentence.split('___').length === 2, `${tag}: a sentence with one gap`);
    const NUM = { en: 'two three four five', de: 'zwei drei vier fünf', nl: 'twee drie vier vijf', da: 'to tre fire fem', sv: 'två tre fyra fem', no: 'to tre fire fem', es: 'dos tres cuatro cinco', it: 'due tre quattro cinque', pt: 'dois três quatro cinco', fr: 'deux trois quatre cinq' };
    if (loc === 'fi') is(!/\b(kaksi|kolme|neljä|viisi)\b/i.test(r.sentence), `${tag}: no numeral before the noun in fi`);
    else { const want = NUM[loc].split(' ')[r.target - 2]; is(new RegExp('(^|[^\\p{L}])' + want + '([^\\p{L}]|$)', 'iu').test(r.sentence), `${tag}: the sentence says ${want} («${r.sentence}»)`); }
  } else is(!r.sentence, `${tag}: no sentence outside Level 5`);
}

/* 5 — the machine */
const pick = (loc, lv, f) => { const i = C.ids(loc, lv).find(i => f(C.round(loc, lv, i))); return i === undefined ? null : C.round(loc, lv, i); };
for (const loc of LOCS) {
  const r = pick(loc, 'l2', x => x.cls === 'end' && x.target >= 3); if (!r) { is(false, loc + ': an l2 end round with a ticket ≥ 3'); continue; }
  let st = C.newState(r, 'tiles');
  is(C.check(st).reason === 'empty' && st.misses === 0 && C.hint(st) === 'hEmpty', `${loc}: an empty Check is no miss`);
  is(!C.open(st) && C.drop(st, r.right).reason === 'one' && !st.tile, `${loc}: one holder — the slot is shut, the tile does not seat`);
  C.add(st);
  is(C.open(st) && C.slotText(st) === '' && C.word(st) === r.stem, `${loc}: the second holder opens the slot («${C.word(st)}»)`);
  is(C.check(st).reason === 'count' && st.misses === 1 && st.help === 1 && C.hint(st) === 'hCount', `${loc}: the wrong count → miss 1, its own hint (no glow yet)`);
  build(st, r);
  is(C.check(st).reason === 'noEnding', `${loc}: an empty slot → no ending`);
  const wrong = r.tray.find(t => t !== r.right && t.startsWith('e:'));
  C.drop(st, wrong); const why = C.check(st).reason;
  const vg = (x) => (String(x).toLowerCase().match(/[aeiouyäöüåæøéèêàâîôûíóúãõ]+/g) || []).length;
  is(why === (vg(C.word(st)) !== vg(r.plural) ? 'beats' : 'wrongEnding'), `${loc}: a wrong ending → ${why} (beats ${vg(C.word(st))} vs ${vg(r.plural)})`);
  is(C.hint(st) === 'hMiss2' && st.help === 2, `${loc}: the second miss lights the way`);
  is(C.drop(st, 'flip').reason === 'nochange' && !st.flipped, `${loc}: the flip tile does not change a regular word`);
  C.drop(st, r.right); is(C.check(st).ok && st.done, `${loc}: the right ending — served`);
  /* holders: never below one, never above five */
  st = C.newState(r, 'tiles'); is(C.remove(st) === false, `${loc}: the last holder never leaves`);
  for (let k = 0; k < 9; k++) C.add(st); is(st.holders === 5, `${loc}: five at most (${st.holders})`);
  /* a word that changes inside */
  const f = pick(loc, 'l3', x => x.cls === 'flip');
  if (f) {
    st = C.newState(f, 'tiles'); build(st, f);
    is(C.drop(st, f.tray.find(t => t.startsWith('e:'))).reason === 'changes' && C.open(st) === false, `${loc}: an ending does not seat on a word that changes inside`);
    is(C.check(st).reason === 'changes', `${loc}: unflipped → changes`);
    C.drop(st, 'flip'); is(C.word(st) === f.plural && C.check(st).ok, `${loc}: flipped → «${f.plural}»`);
  }
  const sm = pick(loc, 'l3', x => x.cls === 'same');
  if (sm) { st = C.newState(sm, 'tiles'); build(st, sm); is(C.drop(st, 'flip').reason === 'same' && C.open(st) && C.drop(st, 'none').seated && C.check(st).ok, `${loc}: ${sm.sing} stays the same — the flip tile says so, the empty tile serves it`); }
  /* back to one */
  const b = pick(loc, 'l4', x => x.cls === 'end');
  st = C.newState(b, 'tiles');
  is(C.check(st).reason === 'emptyBack' && st.misses === 0, `${loc}: back to one — an empty Check is no miss`);
  while (st.holders > 2) C.remove(st);
  const rt = C.remove(st);
  is(rt.rattle && st.tile === b.right && C.word(st) === b.plural, `${loc}: back to one with the ending on — it stays and rattles`);
  is(C.check(st).reason === 'stillOn', `${loc}: Check → still on`);
  C.pull(st); is(C.word(st) === b.sing && C.check(st).ok, `${loc}: ending off → «${b.sing}»`);
  /* write it */
  const w = pick(loc, 'l1', x => x.cls === 'end');
  st = C.newState(w, 'write');
  is(C.writes(st) && C.type(st, w.pEnd[0]) === false, `${loc}: write — no letter with one holder`);
  build(st, w); for (const ch of w.pEnd) C.type(st, ch);
  is(C.word(st) === w.plural && C.check(st).ok, `${loc}: write — «${C.word(st)}»`);
  is(w.pEnd.split('').every(ch => C.keys(loc).includes(ch)) && C.keys(loc).length >= 8, `${loc}: the keys hold the ending's letters (${C.keys(loc).join('')})`);
  const wb = pick(loc, 'l4', x => x.cls === 'end'); st = C.newState(wb, 'write');
  is(st.typed === wb.pEnd && C.word(st) === wb.plural, `${loc}: write, back to one — starts written`);
}

/* 6 — order, strings, manifest */
{
  let prev = C.plan('de', 'l2', Math.random, null), ok = true;
  for (let i = 0; i < 500; i++) { const o = C.plan('de', 'l2', Math.random, prev); if (o.join() === prev.join() || o[0] === prev[prev.length - 1]) ok = false; prev = o; }
  is(ok, '500 passes: never the last order, never its last round first');
}
const KEYS = Object.keys(ACT.strings), SRC = fs.readFileSync(path.join(DIR, 'plate-stack-activity.js'), 'utf8').replace(/strings: \{[\s\S]*?\n  \},\n/, '') + fs.readFileSync(path.join(DIR, 'plate-stack-core.js'), 'utf8');
for (const k of KEYS) {
  is(LOCS.every(l => typeof ACT.strings[k][l] === 'string' && ACT.strings[k][l].trim()), `string ${k}: all 11 locales`);
  is(k === 'title' || /^l[1-5]$|^a(Tiles|Write)$/.test(k) || new RegExp("['\"]" + k + "['\"]").test(SRC), `string ${k} is used`);
}
for (const loc of LOCS) is(!/\bfree\b|gratis|kostenlos|gratuit|gratuito|ilmai/i.test(KEYS.map(k => ACT.strings[k][loc]).join(' ')), `${loc}: no "free" in the activity text`);
for (const loc of LOCS) for (const k of ['okAdd', 'okFlip', 'okBack']) is(ACT.strings[k][loc].includes('{w}'), `${loc} ${k}: names the word`);
const man = JSON.parse(fs.readFileSync(path.join(MT, 'daisy-plate-stack-activities.json'), 'utf8'))[0];
is(man.tool === 'plate-stack-activity' && man.id === 'daisy-plate-stack.plurals.l-k-1-c', 'the row runs the Plate Stack');
const FROZEN = ['en', 'de', 'fr', 'pt', 'it', 'nl'];
const h = crypto.createHash('sha1').update(JSON.stringify(FROZEN.map(l => [man.slug[l], man.page_title[l], man.page_intro[l]]))).digest('hex');
is(h === '2e0b1e936cde94c0d28f3ace43f86f84817f9b27', `en/de/fr/pt/it/nl metadata frozen (${h})`);
for (const l of LOCS) is(man.slug[l] && /^[a-z0-9-]+$/.test(man.slug[l]) && man.page_title[l] && man.page_intro[l], `${l}: slug, title, intro`);
for (const l of LOCS) for (const lv of LVS) is(man.params.byLocale[l][lv] === C.ids(l, lv).map(i => { const x = C.round(l, lv, i); return x.sing + '>' + x.plural; }).join(' '), `${l} ${lv}: the manifest mirror`);
const W = C.layout(648), N = C.layout(312);
is(W.mode === 'wide' && W.pic >= 96 && N.mode === 'narrow' && N.pic >= 64 && W.tile >= 44 && N.tile >= 44, 'layout: pictures 96 / 64, tiles ≥ 44');

console.log(`verify-plate-stack-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
