#!/usr/bin/env node
/* =====================================================================
   verify-linc-fact-chain-core.js — the gate of ACTIVITY #71, THE DOMINO
   TRACK (Linc's Fact Chain, RI.K.3, 11 locales). Its own ground truth:
     1. the answer table — written here, never read off the core: per
        level the round ids, the gap side (next and so: after; because:
        before; chain: two gaps after the first fact), which card is right
        in each gap, and the lure roles (next: order + unrelated; so:
        same-word + unrelated; because: same-word + direction; chain:
        story + unrelated). For every round × locale × EVERY way to fill
        the gaps from the tray (with More and with Fewer): the chain falls
        all the way only for the table's answer; anything else stops at
        the first false link, the miss shows the two facts of that link,
        and the wrong cards go back to the tray while right ones stay
     2. the swapped chain (third card first) breaks at the first gap; a
        because-round's direction lure in the gap breaks it; Fewer drops
        exactly the unrelated (next, so) / same-word (because) / unrelated
        (chain) lure and keeps the lure that teaches
     3. a pass — every round once, never one cause direction three times
        in a row, never the last pass's order nor its last round first
        (2,000 seeds); the right card's tray slot balanced (±1); trays
        vary; the dealt slot honoured
     4. texts — joined sentences authored (never a concatenation of the
        two cards), every card distinct, no card text equals the given
        fact; the right card longest in ≤ 40 % of next+cause rounds and
        in ≤ 4 of 7 chains; the same-word lure ≥ the right card's length
        in ≥ half of the cause rounds; the same-word lure shares a word
        with the given fact (so) or the right cause (because) (en)
     5. hints, the miss-2 preview, empty Check, strings × 11, no digit, fr
        narrow no-break spaces, the picture, floors, the manifest mirror,
        the frozen en..nl metadata, the new sv da no fi metadata
   Usage: node scripts/verify-linc-fact-chain-core.js  (LF_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.LF_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'linc-fact-chain-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, LincFactChainCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'linc-fact-chain-activity.js'), 'utf8') + '\nthis.__A = LincFactChainActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const FROZEN = '79bcd8ae5e4a611aab67f757a34c332cad7d4a50';
const seeded = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; };
/* the gate's own table */
const GT = {
  next: { ids: ['seed', 'egg', 'wash', 'sleepy', 'caterpillar', 'bath', 'snow'], side: 'after', right: ['r'], lures: { o: 'order', u: 'unrelated' }, drop: 'u' },
  so: { ids: ['sun', 'rain', 'swing', 'freeze'], side: 'after', right: ['r'], lures: { s: 'same', x: 'unrelated' }, drop: 'x' },
  because: { ids: ['icecream', 'puppy', 'plant', 'kite'], side: 'before', right: ['r'], lures: { s: 'same', x: 'direction' }, drop: 's' },
  chain: { ids: ['flower', 'chick', 'puddles', 'bread', 'snowman', 'balloon', 'butterfly'], side: 'after2', right: ['b', 'c'], lures: { l1: 'story', l2: 'unrelated' }, drop: 'l2' }
};
const kindOf = (lv, id) => lv === 'cause' ? (GT.so.ids.includes(id) ? 'so' : 'because') : lv;
const LEVELS = ['next', 'cause', 'chain'];
const idsOf = (lv) => lv === 'cause' ? GT.so.ids.concat(GT.because.ids) : GT[lv].ids;
/* every way to fill g gaps from the tray (distinct cards) */
function fills(keys, g) { if (g === 1) return keys.map(k => [k]); const out = []; keys.forEach(a => keys.forEach(b => { if (a !== b) out.push([a, b]); })); return out; }

/* 1 + 2 — the answer table, every filling */
for (const lv of LEVELS) is(JSON.stringify(C.ids(lv).slice().sort()) === JSON.stringify(idsOf(lv).slice().sort()), `${lv}: the rounds are the table's`);
for (const loc of LOCS) for (const lv of LEVELS) for (const id of idsOf(lv)) {
  const K = kindOf(lv, id), T = GT[K], r = C.round(loc, lv, id), tag = `${loc} ${lv}/${id}`;
  is(r.dir === K, `${tag}: direction ${r.dir} (want ${K})`);
  const gapAt = r.places.map((p, i) => p.gap !== undefined ? i : -1).filter(i => i >= 0), factAt = r.places.map((p, i) => p.fact !== undefined ? i : -1).filter(i => i >= 0);
  is(T.side === 'after' ? (gapAt.join() === '1' && factAt.join() === '0') : T.side === 'before' ? (gapAt.join() === '0' && factAt.join() === '1') : (gapAt.join() === '1,2' && factAt.join() === '0'), `${tag}: the gap stands ${T.side}`);
  is(JSON.stringify(r.answer) === JSON.stringify(T.right), `${tag}: the right card(s) ${r.answer}`);
  const all = Object.keys(r.cards).sort(), want = T.right.concat(Object.keys(T.lures)).sort();
  is(JSON.stringify(all) === JSON.stringify(want), `${tag}: cards ${all} (want ${want})`);
  const texts = Object.values(r.cards).concat(r.places.filter(p => p.fact).map(p => p.fact));
  is(new Set(texts).size === texts.length && texts.every(t => t && t.trim()), `${tag}: every card distinct, none the given fact`);
  for (const fewer of [false, true]) {
    const keys = C.trayKeys(r, fewer);
    is(fewer ? (keys.length === all.length - 1 && !keys.includes(T.drop) && T.right.every(k => keys.includes(k))) : keys.length === all.length, `${tag}: ${fewer ? 'Fewer drops ' + T.drop : 'More keeps all'}`);
    for (const f of fills(keys, r.gaps)) {
      const st = C.newState(r, keys); f.forEach((k, g) => C.stand(st, k, g));
      const res = C.check(st), right = JSON.stringify(f) === JSON.stringify(T.right);
      is(res.ok === right && st.done === right, `${tag} ${f}: ok ${res.ok}, want ${right}`);
      if (!right) {
        /* the first false link: the gate's own walk */
        let broken = -1; const okAt = (i) => r.places[i].fact !== undefined || f[r.places[i].gap] === T.right[r.places[i].gap];
        for (let i = 1; i < r.places.length && broken < 0; i++) if (!okAt(i - 1) || !okAt(i)) broken = i;
        const txt = (i) => r.places[i].fact !== undefined ? r.places[i].fact : r.cards[f[r.places[i].gap]];
        is(res.broken === broken && res.pair[0] === txt(broken - 1) && res.pair[1] === txt(broken) && res.falls.every((x, i) => x === (i < broken)), `${tag} ${f}: stops at place ${broken} with its two facts`);
        is(st.misses === 1 && C.hint(st) === (res.link === 'linkThen' ? 'hintMiss1Next' : 'hintMiss1So'), `${tag} ${f}: miss 1 → the read-together hint`);
        C.clearWrong(st);
        is(st.placed.every((k, g) => k === null || k === T.right[g]) && f.every((k, g) => k !== T.right[g] || st.placed[g] === k), `${tag} ${f}: the wrong cards go back, the right ones stay`);
      } else is(res.joined === r.joined, `${tag}: success shows the authored joined sentence`);
    }
  }
  if (K === 'chain') { const st = C.newState(r); C.stand(st, 'c', 0); C.stand(st, 'b', 1); const res = C.check(st); is(!res.ok && res.broken === 1, `${tag}: the swapped chain breaks at the first gap`); }
  if (K === 'because') { const st = C.newState(r); C.stand(st, 'x', 0); const res = C.check(st); is(!res.ok && res.pair[0] === r.cards.x && res.pair[1] === r.places[1].fact, `${tag}: the direction lure before the fact breaks the push`); }
}

/* 3 — a pass, slots, trays */
{
  let bad = 0, repeat = 0, slotBad = 0; const trays = new Set();
  for (let s = 0; s < 2000; s++) {
    const rnd = seeded('plan' + s);
    for (const lv of LEVELS) {
      const a = C.plan(lv, rnd, null), b = C.plan(lv, rnd, a);
      for (const o of [a, b]) { if (new Set(o).size !== idsOf(lv).length) bad++; if (lv === 'cause') for (let i = 2; i < o.length; i++) { const k = (x) => kindOf('cause', x); if (k(o[i]) === k(o[i - 1]) && k(o[i]) === k(o[i - 2])) bad++; } }
      if (a.join() === b.join() || a[a.length - 1] === b[0]) repeat++;
    }
    for (const [k, n] of [[3, 7], [3, 8], [2, 7], [4, 7]]) { const sl = C.slots(rnd, k, n), cnt = Array(k).fill(0); sl.forEach(x => cnt[x]++); if (Math.max(...cnt) - Math.min(...cnt) > 1) slotBad++; }
    const r = C.round('en', 'next', 'seed'); for (let slot = 0; slot < 3; slot++) { const d = C.deal(r, rnd, slot, false); if (d[slot] !== 'r' || new Set(d).size !== 3) slotBad++; trays.add(d.join()); }
    const ch = C.round('en', 'chain', 'flower'), dc = C.deal(ch, rnd, 2, true); if (dc[2] !== 'b' || dc.includes('l2') || dc.length !== 3) slotBad++;
  }
  is(!bad, `2,000 passes per level: every round once, never one direction three in a row (${bad} bad)`);
  is(!repeat, `the next pass never repeats the order nor starts with the last round (${repeat})`);
  is(!slotBad, `the right card's slot balanced and honoured (${slotBad} bad)`);
  is(trays.size >= 4, `the lures shuffle round the right card (${trays.size} trays)`);
}

/* 4 — texts */
for (const loc of LOCS) {
  let n12 = 0, l12 = 0, lch = 0, same = 0;
  for (const lv of LEVELS) for (const id of idsOf(lv)) {
    const r = C.round(loc, lv, id), K = kindOf(lv, id), cards = Object.values(r.cards), mx = Math.max(...cards.map(s => s.length));
    const right = GT[K].right.map(k => r.cards[k]), hit = right.some(t => t.length === mx);
    if (K === 'chain') { if (hit) lch++; } else { n12++; if (hit) l12++; }
    if (K === 'so' || K === 'because') { if (r.cards.s.length >= r.cards.r.length) same++; }
    const parts = r.places.filter(p => p.fact).map(p => p.fact).concat(right);
    const naive = [parts.join(' '), parts.map(s => s.replace(/[.!]$/, '')).join(', ') + '.'];
    is(r.joined && !naive.includes(r.joined) && /[.!]$/.test(r.joined.replace(/ !$/, '!')), `${loc} ${id}: the joined sentence is authored («${r.joined}»)`);
    /* so: the lure shares a word with the given fact (the snow falls / melts); because: with the right cause (the day is cold / hot) */
    if (loc === 'en' && (K === 'so' || K === 'because')) { const g = (K === 'so' ? r.places.find(p => p.fact).fact : r.cards.r).toLowerCase().match(/[a-z]+/g), sw = r.cards.s.toLowerCase().match(/[a-z]+/g).filter(w => w.length > 3); is(sw.some(w => g.includes(w)), `en ${id}: the same-word lure shares a word with the ${K === 'so' ? 'given fact' : 'right cause'}`); }
  }
  is(l12 / n12 <= 0.4 && lch <= 4 && same >= 4, `${loc}: right card longest ${l12}/${n12} (≤ 40 %), chains ${lch}/7 (≤ 4), same-word lure ≥ right ${same}/8 (≥ 4)`);
  const strs = []; for (const lv of LEVELS) for (const id of idsOf(lv)) { const r = C.round(loc, lv, id); strs.push(r.joined, ...Object.values(r.cards), ...r.places.filter(p => p.fact).map(p => p.fact)); }
  const all = strs.join(' ');
  is(!/\d/.test(all), `${loc}: no digits in the texts`);
  if (loc === 'fr') is(!/ [?!:;»]|« /.test(all), 'fr: narrow no-break spaces in the texts');
}

/* 5 — hints, preview, strings, picture, floors, manifest */
{
  const r = C.round('en', 'cause', 'icecream'), st = C.newState(r);
  is(C.check(st).reason === 'empty' && C.hint(st) === 'hintEmpty' && st.misses === 0, 'an empty Check is no miss');
  C.stand(st, 'x', 0); C.check(st); C.clearWrong(st); C.stand(st, 's', 0); C.check(st); is(st.help === 2 && C.hint(st) === 'hintMiss2', 'miss 2 → hintMiss2');
  const pv = C.preview(r, [null], 0, 'r'); is(pv.pair[0] === r.cards.r && pv.pair[1] === r.places[1].fact && pv.link === 'linkSo', 'the miss-2 preview reads the card before the fact in a because-round');
  const ch = C.round('en', 'chain', 'bread'), pv2 = C.preview(ch, ['b', null], 1, 'c'); is(pv2.pair[0] === ch.cards.b && pv2.pair[1] === ch.cards.c, 'the chain preview reads the second gap after the first card');
  const s2 = C.newState(ch); C.stand(s2, 'b', 0); C.stand(s2, 'b', 1); is(s2.placed[0] === null && s2.placed[1] === 'b', 'a card moved to another gap leaves its old one');
  for (const k of ['instr', 'tabNext', 'tabSo', 'tabBecause', 'tabChain', 'linkThen', 'linkSo', 'check', 'hintEmpty', 'hintMiss1Next', 'hintMiss1So', 'hintMiss2', 'okTail', 'setLevel', 'lNext', 'lCause', 'lChain', 'setChoices', 'cFewer', 'cMore', 'ariaLinc', 'ariaFact', 'ariaGapBefore', 'ariaGapAfter', 'ariaStopped', 'title']) is(A.strings[k], `string ${k} exists`);
}
for (const [k, v] of Object.entries(A.strings)) for (const loc of LOCS) { is(typeof v[loc] === 'string' && v[loc].trim(), `string ${k}: ${loc}`); if (loc === 'fr') is(!/ [?!:;»]|« /.test(v[loc]), `fr string ${k}: narrow no-break space`); }
{
  const LABEL = {}; for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }
  const p = C.LINC; is(p && fs.existsSync(path.join(IMG, p + '@2x.webp')) && LABEL[p] && !BW.test(p.split('/')[0]), `${p} exists, colour, labelled`);
}
is(C.layout(704, 3).linc >= 96 && C.layout(360, 3).linc >= 64 && C.layout(290, 3).linc >= 64, 'Linc at its floor: 96 at 704, 64 on a phone');
is(C.layout(704, 2).dw >= 84 && C.layout(290, 3).dw >= 80 && C.layout(290, 3).dtext >= 14 && C.layout(290, 3).ctext >= 14, 'dominoes ≥ 80 wide, text ≥ 14 px');
{
  const row = JSON.parse(fs.readFileSync(path.join(MT, 'linc-fact-chain-activities.json'), 'utf8'))[0];
  const h = crypto.createHash('sha1').update(JSON.stringify(['slug', 'page_title', 'page_intro'].map(k => ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl'].map(l => row[k][l])))).digest('hex');
  is(h === FROZEN, `the frozen en..nl metadata is untouched (${h})`);
  is(row.tool === 'linc-fact-chain-activity' && !row.params.rounds && !row.params.roundsL10n, 'the row runs the domino core, its params a mirror');
  for (const loc of LOCS) for (const lv of LEVELS) is(row.params.byLocale[loc][lv] === C.ids(lv).length, `mirror ${loc} ${lv}`);
  for (const loc of ['sv', 'da', 'no', 'fi']) is(row.slug[loc] && /^[a-z0-9-]+$/.test(row.slug[loc]) && row.page_title[loc] && row.page_intro[loc], `${loc}: slug, title, intro`);
}
console.log(`verify-linc-fact-chain-core: ${PASS} passed, ${FAIL} failed`);
process.exit(FAIL ? 1 : 0);
