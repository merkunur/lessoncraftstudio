#!/usr/bin/env node
/**
 * verify-talk-verbs.js — the family gate of talk-verbs.js (K-728 Walk, March, Tiptoe: Act It Out; G1-678 Book Talk:
 * Listen, Then Add On), Daily Teaching System Stage E-0, 2026-11-25. Runs without a browser over 400 seeds a level of
 * the instance seeds the publisher uses; the page check inside each type (verify, in the browser) measures the layout.
 *
 *   K-728  every row: two (level 3: three) different words of ONE family, exactly one keyed, the keyed word the end of
 *          the family's scale the picture names (quiet / slow = the low end, loud / fast = the high end); march and walk
 *          never in one row; level 1 walking words only, level 2 none; every page shows the four pictures once.
 *          TELLS, measured on every word and every place over all pages: the keyed word stands first in exactly half the
 *          rows (level 3: each place 20-46 %); the keyed word is the longer word in 35-65 % of pairs; no word is keyed in
 *          more than 70 % of the rows it appears in AT THE SAME PICTURE'S SCALE END is by construction (the low word of a
 *          pair is always keyed at the low end) — so the tell measured is the one a child could use: the word ALONE.
 *          For every word: the share of its appearances in which it is keyed must stay within 20-80 %.
 *   G1-678 level 2: two replies, three choices each, one keyed; the keyed one names the tale, the other two do not; the
 *          two right replies stand in different places; over all pages each place holds the right reply 25-42 %; the
 *          keyed reply is the longest of its three in at most 50 % of items. Levels 1 and 3 have no closed item.
 * Poisons in both directions: each check must FAIL on a spoiled page and PASS on the clean control.
 *   node scripts/worksheet-gen/qa/verify-talk-verbs.js
 */
'use strict';
const path = require('path');
const WG = path.join(__dirname, '..');
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const TV = require(path.join(WG, 'types', '_shared', 'talk-verbs.js'));
const SEEDS = 400;
let asserts = 0;
const fails = [];
const ok = (c, m) => { asserts++; if (!c) fails.push(m); };

const build = (t, lv, v) => t.build({ theme: null, difficulty: lv, locale: 'en', unit: null }, { rng: makeRng(instanceSeed({ typeId: t.id, theme: null, difficulty: lv, seedEpoch: 1, variant: v })), variant: v, seedVariant: v }).bodyHtml;
const attrs = (tag) => { const o = {}; tag.replace(/data-lcs-([a-z]+)(?:="([^"]*)")?/g, (_, k, v) => { o[k] = v === undefined ? true : v; }); return o; };

/** K-728: read the rows of a page from its html */
function verbRows(html) {
  const rows = [];
  const re = /<div (data-lcs-vrow="[^>]*)>([\s\S]*?)<\/div><\/div>/g; let m;
  while ((m = re.exec(html))) {
    const a = attrs(m[1]);
    const words = [...m[2].matchAll(/<span data-lcs-word="([^"]+)"( data-lcs-ok="1")?/g)].map((x) => ({ w: x[1], ok: !!x[2] }));
    rows.push({ cue: a.cue, want: a.want, scale: a.scale, series: (a.series || '').split('|'), words });
  }
  return rows;
}
function checkVerbPage(html, lv) {
  const f = [];
  const rows = verbRows(html);
  if (rows.length !== 4) f.push(rows.length + ' rows');
  const k = lv === 3 ? 3 : 2;
  const fam = (w) => TV.FAMILY[w] || 'other';
  rows.forEach((r, n) => {
    const keyed = r.words.filter((w) => w.ok);
    if (r.words.length !== k || keyed.length !== 1 || new Set(r.words.map((w) => w.w)).size !== k) f.push(`row ${n + 1}: not ${k} different words with one keyed`);
    if (keyed[0] && keyed[0].w !== r.want) f.push(`row ${n + 1}: keyed ${keyed[0] && keyed[0].w}, wanted ${r.want}`);
    const low = ['quiet', 'slow'].includes(r.cue);
    if (r.want !== (low ? r.series[0] : r.series[r.series.length - 1])) f.push(`row ${n + 1}: ${r.cue} keys ${r.want}, not the ${low ? 'low' : 'high'} end of ${r.series}`);
    if (TV.SCALE[r.scale].indexOf(r.cue) < 0) f.push(`row ${n + 1}: the picture ${r.cue} is not on the ${r.scale} scale`);
    if (r.words.some((w) => w.w === 'march') && r.words.some((w) => w.w === 'walk')) f.push(`row ${n + 1}: march and walk together`);
    // a plain word (walk, talk, eat ...) is never keyed and never an end of a row (US reviewer 2026-11-25: "loud = talk", "quiet = walk")
    if (keyed[0] && TV.PLAIN.includes(keyed[0].w)) f.push(`row ${n + 1}: the plain word ${keyed[0].w} is keyed`);
    if (TV.PLAIN.includes(r.series[0]) || TV.PLAIN.includes(r.series[r.series.length - 1])) f.push(`row ${n + 1}: a plain word at an end of ${r.series}`);
    if (r.words.some((w) => fam(w.w) === 'other')) f.push(`row ${n + 1}: a word of no family`);
    if (lv === 1 && r.words.some((w) => fam(w.w) !== 'feet')) f.push(`row ${n + 1}: level 1 holds a word that is not a walking word`);
    if (lv === 2 && r.words.some((w) => fam(w.w) === 'feet')) f.push(`row ${n + 1}: level 2 holds a walking word`);
  });
  if (new Set(rows.map((r) => r.cue)).size !== 4) f.push('the page does not show the four pictures once each');
  const keyedWords = rows.map((r) => r.want); if (new Set(keyedWords).size !== keyedWords.length) f.push('a word is the answer of two rows: ' + keyedWords.join(', '));
  return { f, rows };
}
/** G1-678 level 2: the replies to judge */
function judges(html) {
  const out = [];
  const re = /<div data-lcs-judge="(\d)" data-lcs-want="(\d)"[\s\S]*?<div data-lcs-choices[^>]*>([\s\S]*?)<\/div><\/div>/g; let m;
  while ((m = re.exec(html))) out.push({ want: +m[2], choices: [...m[3].matchAll(/<span data-lcs-choice="(\d)"( data-lcs-ok="1")?[^>]*>([^<]*)<\/span>/g)].map((x) => ({ i: +x[1], ok: !!x[2], text: x[3].replace(/&amp;/g, '&') })) });
  return out;
}
function checkTalkPage(html, lv, taleOf) {
  const f = [];
  const js = judges(html);
  if (js.length !== (lv === 2 ? 2 : 0)) f.push(js.length + ' replies to judge');
  const tale = taleOf(html);
  js.forEach((j, n) => {
    const keyed = j.choices.filter((c) => c.ok);
    if (j.choices.length !== 3 || keyed.length !== 1 || keyed[0].i !== j.want || new Set(j.choices.map((c) => c.text)).size !== 3) f.push(`reply ${n + 1}: not three with the keyed one right`);
    if (!tale) { f.push('no tale named on the page'); return; }
    const mine = TV.TALE_WORDS[tale.id];
    const names = (s) => (s.toLowerCase().replace(/’s/g, '').match(/[a-z]+/g) || []).some((w) => mine.some((m) => w.startsWith(m)));
    if (keyed[0] && !names(keyed[0].text)) f.push(`reply ${n + 1}: the keyed reply names nothing of ${tale.tale}`);
    j.choices.filter((c) => !c.ok).forEach((c) => { if (names(c.text)) f.push(`reply ${n + 1}: a wrong reply names ${tale.tale} too ("${c.text}")`); });
  });
  if (js.length === 2 && js[0].want === js[1].want) f.push('both right replies stand in one place');
  return { f, js };
}
const taleOf = (html) => TV.TALES.find((t) => html.includes('(about ' + t.tale + ')')) || null;

// ---------- the sweep ----------
const K = loadType('K-728'), G = loadType('G1-678');
for (const lv of [1, 2, 3]) {
  const place = [0, 0, 0], longer = [0, 0], word = {}; let rowsN = 0;
  for (let v = 1; v <= SEEDS; v++) {
    const html = build(K, lv, v);
    const { f, rows } = checkVerbPage(html, lv);
    ok(!f.length, `K-728 L${lv} copy ${v}: ${f.join('; ')}`);
    for (const r of rows) {
      rowsN++; const at = r.words.findIndex((w) => w.ok); if (at >= 0) place[at]++;
      if (r.words.length === 2) { const kw = r.words.find((w) => w.ok), ow = r.words.find((w) => !w.ok); if (kw && ow && kw.w.length !== ow.w.length) longer[kw.w.length > ow.w.length ? 0 : 1]++; }
      // the middle word of a row of three is between the two ends by meaning, so it is never the end a picture names: that
      // IS the lesson (jog is neither the slowest nor the fastest). The tell measured is among the words a child must
      // choose between: the ends of the row's series.
      const ends = [r.series[0], r.series[r.series.length - 1]];
      for (const w of r.words) { if (!ends.includes(w.w)) continue; word[w.w] = word[w.w] || [0, 0]; word[w.w][1]++; if (w.ok) word[w.w][0]++; }
    }
  }
  // the copies the publisher makes (1-4): every end word of the level's bank is the answer of at least one of them
  { const bank = lv === 1 ? TV.PAIRS1 : lv === 2 ? TV.PAIRS2 : TV.TRIPLES; const keyed = new Set();
    for (let v = 1; v <= 4; v++) for (const r of verbRows(build(K, lv, v))) keyed.add(r.want);
    for (const p of bank) for (const e of [p.w[0], p.w[p.w.length - 1]]) ok(keyed.has(e), `K-728 L${lv}: ${e} is the answer on none of copies 1-4`); }
  const k = lv === 3 ? 3 : 2;
  if (k === 2) ok(place[0] === place[1], `K-728 L${lv}: the keyed word stands first in ${place[0]} rows and second in ${place[1]}`);
  else place.forEach((p, i) => ok(p / rowsN >= 0.20 && p / rowsN <= 0.46, `K-728 L3: place ${i + 1} holds the keyed word in ${(100 * p / rowsN).toFixed(1)} % of rows`));
  if (k === 2) { const s = longer[0] / (longer[0] + longer[1]); ok(s >= 0.35 && s <= 0.65, `K-728 L${lv}: the keyed word is the longer one in ${(100 * s).toFixed(1)} % of pairs`); }
  for (const [w, [a, b]] of Object.entries(word)) ok(a / b >= 0.2 && a / b <= 0.8, `K-728 L${lv}: "${w}" is keyed in ${(100 * a / b).toFixed(1)} % of the rows it stands in (a child could answer from the word alone)`);
  console.log(`K-728 level ${lv}: ${SEEDS} pages; keyed word by place ${place.slice(0, k).join(' / ')}; keyed share per word ${Object.entries(word).map(([w, [a, b]]) => w + ' ' + Math.round(100 * a / b)).join(', ')}`);
}
for (const lv of [1, 2, 3]) {
  const place = [0, 0, 0]; let items = 0, longest = 0, shortest = 0;
  for (let v = 1; v <= SEEDS; v++) {
    const html = build(G, lv, v);
    const { f, js } = checkTalkPage(html, lv, taleOf);
    ok(!f.length, `G1-678 L${lv} copy ${v}: ${f.join('; ')}`);
    ok((lv === 3) === !html.includes('data-lcs-model'), `G1-678 L${lv} copy ${v}: the model talk is ${lv === 3 ? 'on' : 'missing from'} the page`);
    for (const j of js) { items++; place[j.want]++; const L = j.choices.map((c) => c.text.length); if (L[j.want] === Math.max(...L)) longest++; if (L[j.want] === Math.min(...L)) shortest++; }
  }
  if (lv === 2) {
    place.forEach((p, i) => ok(p / items >= 0.25 && p / items <= 0.42, `G1-678 L2: place ${i + 1} holds the right reply in ${(100 * p / items).toFixed(1)} %`));
    ok(longest / items >= 0.2 && longest / items <= 0.5, `G1-678 L2: the right reply is the longest in ${(100 * longest / items).toFixed(1)} % of items`);
    ok(shortest / items >= 0.15 && shortest / items <= 0.5, `G1-678 L2: the right reply is the shortest in ${(100 * shortest / items).toFixed(1)} % of items`);
    console.log(`G1-678 level 2: ${items} replies; right reply by place ${place.join(' / ')}; the longest ${Math.round(100 * longest / items)} %, the shortest ${Math.round(100 * shortest / items)} %`);
  } else console.log(`G1-678 level ${lv}: ${SEEDS} pages, no closed item`);
}
{ let refused = 0; for (const t of [K, G]) { try { t.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { if (/English/.test(e.message)) refused++; } } ok(refused === 2, 'a page is built in German'); }

// ---------- poisons: each must FAIL (on the check it is aimed at); the clean control must PASS ----------
const clean = build(K, 1, 7), clean3 = build(K, 3, 7), cleanT = build(G, 2, 7);
const P = [
  ['K: the other word keyed', () => { const r = verbRows(clean)[0]; return clean.replace(`data-lcs-word="${r.want}" data-lcs-ok="1"`, `data-lcs-word="${r.want}"`).replace(new RegExp(`data-lcs-word="(${r.words.find((w) => !w.ok).w})"`), 'data-lcs-word="$1" data-lcs-ok="1"'); }, (h) => checkVerbPage(h, 1).f.length > 0],
  ['K: the wrong end keyed', () => clean.replace(/data-lcs-cue="quiet"/, 'data-lcs-cue="loud"'), (h) => checkVerbPage(h, 1).f.length > 0],
  ['K: a plain word keyed', () => { const r = verbRows(clean)[0]; return clean.split(`data-lcs-want="${r.want}"`).join('data-lcs-want="walk"').replace(`data-lcs-word="${r.want}" data-lcs-ok="1"`, 'data-lcs-word="walk" data-lcs-ok="1"').replace(`data-lcs-series="${r.series.join('|')}"`, `data-lcs-series="${['quiet', 'slow'].includes(r.cue) ? ['walk', r.series[1]].join('|') : [r.series[0], 'walk'].join('|')}"`); }, (h) => checkVerbPage(h, 1).f.some((x) => /plain word/.test(x))],
  ['K: a day 2 word on level 1', () => { const r = verbRows(clean)[0], o = r.words.find((w) => !w.ok).w; return clean.replace(`data-lcs-word="${o}"`, 'data-lcs-word="gobble"'); }, (h) => checkVerbPage(h, 1).f.some((x) => /not a walking word/.test(x))],
  ['K: one word the answer of two rows', () => { const rs = verbRows(clean); const a = rs[0], b = rs.find((r, i) => i && r.words.some((w) => !w.ok)); const o = b.words.find((w) => !w.ok).w; return clean.replace(`data-lcs-want="${b.want}"`, `data-lcs-want="${a.want}"`).replace(`data-lcs-word="${b.want}" data-lcs-ok="1"`, `data-lcs-word="${b.want}"`).replace(`data-lcs-word="${o}"`, `data-lcs-word="${a.want}" data-lcs-ok="1"`); }, (h) => checkVerbPage(h, 1).f.some((x) => /two rows/.test(x))],
  ['K: a picture shown twice', () => clean.replace(/data-lcs-cue="(quiet|slow)"/, 'data-lcs-cue="loud"'), (h) => checkVerbPage(h, 1).f.length > 0],
  ['K3: a middle word keyed', () => { const r = verbRows(clean3)[0]; return clean3.replace(`data-lcs-want="${r.want}"`, `data-lcs-want="${r.series[1]}"`).replace(`data-lcs-word="${r.want}" data-lcs-ok="1"`, `data-lcs-word="${r.want}"`).replace(`data-lcs-word="${r.series[1]}"`, `data-lcs-word="${r.series[1]}" data-lcs-ok="1"`); }, (h) => checkVerbPage(h, 3).f.length > 0],
  ['T: the keyed reply moved', () => cleanT.replace(/data-lcs-want="(\d)"/, (m, d) => `data-lcs-want="${(+d + 1) % 3}"`), (h) => checkTalkPage(h, 2, taleOf).f.length > 0],
  ['T: a wrong reply keyed', () => { const j = judges(cleanT)[0]; const bad = j.choices.find((c) => !c.ok); return cleanT.replace(/( data-lcs-ok="1")/, '').replace(`data-lcs-choice="${bad.i}"`, `data-lcs-choice="${bad.i}" data-lcs-ok="1"`); }, (h) => checkTalkPage(h, 2, taleOf).f.length > 0],
  ['T: both right replies in one place', () => { const js = judges(cleanT); return js[0].want === js[1].want ? cleanT : cleanT.replace(`data-lcs-judge="2" data-lcs-want="${js[1].want}"`, `data-lcs-judge="2" data-lcs-want="${js[0].want}"`); }, (h) => checkTalkPage(h, 2, taleOf).f.length > 0],
  ['T: an off-topic reply names the tale', () => { const t = taleOf(cleanT), j = judges(cleanT)[0], bad = j.choices.find((c) => !c.ok); return cleanT.replace(bad.text, bad.text.replace(/\.$/, ' and the ' + TV.TALE_WORDS[t.id][0] + '.')); }, (h) => checkTalkPage(h, 2, taleOf).f.length > 0],
];
ok(checkVerbPage(clean, 1).f.length === 0 && checkVerbPage(clean3, 3).f.length === 0 && checkTalkPage(cleanT, 2, taleOf).f.length === 0, 'the clean control fails');
let killed = 0;
for (const [name, spoil, caught] of P) { const h = spoil(); const dif = h !== clean && h !== clean3 && h !== cleanT; ok(dif, `poison "${name}" did not change the page`); if (dif && caught(h)) killed++; else fails.push(`poison "${name}" was not caught`); asserts++; }
console.log(`poisons: ${killed}/${P.length} caught; the clean control passes`);
console.log(`${asserts} assertions, ${fails.length} failed`);
if (fails.length) { console.log(fails.slice(0, 30).join('\n')); process.exit(1); }
