#!/usr/bin/env node
/**
 * Answers a child could find without the skill (2026-11-17 audit of the makers' new versions):
 *   rc      G2-254, G2-269 … G2-273 Reading Comprehension — the right letter sat under the same place on most stories
 *           ("Story 5" level 1: B, C, A on every new version); now each copy places its answers (placeAnswers)
 *   wc      G1-497 Parts of Speech in Sentences — the verb was the 4th word of every sentence, the adjective mostly the 2nd
 *   place   G2-399 Which Place Decides? — level 2 was decided by the tens on every card of every copy
 *   count   G1-308 Read and Do — "write how many" answered 2 on nine rows in ten at levels 2 and 3
 *   number  G1-411 Stop at the Number — level 1 asked 2 on every card
 *
 *   node qa/verify-answer-places.js            every language, no browser
 *   node qa/verify-answer-places.js --poison   the same checks must FAIL on planted faults
 */
'use strict';
const path = require('path');
const fs = require('fs');
const WG = path.join(__dirname, '..');
const POISON = process.argv.includes('--poison');
const LOCALES = ['en', 'de', 'sv', 'fr', 'no', 'nl', 'fi', 'da', 'it', 'es', 'pt'];
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const typeOf = (id) => { const dir = path.join(WG, 'types', id.startsWith('K-') ? 'k' : id.slice(0, 2).toLowerCase()); return require(path.join(dir, fs.readdirSync(dir).find((f) => f.startsWith(id + '-')))); };
const cat = (type, level, loc, v, theme, x) => type.build({ theme: theme || null, difficulty: level, locale: loc, unit: null },
  { rng: makeRng(instanceSeed({ typeId: type.id, theme: theme || null, difficulty: level, seedEpoch: 1, variant: v, unit: null })), variant: v, ...(x || {}) });
const share = (arr) => { const n = {}; arr.forEach((x) => { n[x] = (n[x] || 0) + 1; }); const top = Math.max(0, ...Object.values(n)); return { n, top, share: arr.length ? top / arr.length : 0 }; };
const WARN = [];

function run(fault) {
  const fails = [];
  WARN.length = 0;
  // ---- rc: the letters of the reading comprehension faces (the maker's copies: ctx.maker, the copy number)
  const RC = ['G2-254', 'G2-269', 'G2-270', 'G2-271', 'G2-272', 'G2-273'];
  // every face carries its own copy of the base's methods (`...base`): load them all before a fault is planted, plant it
  // in each, and give each its own back
  const faces = RC.map(typeOf), keepBL = faces.map((t) => t._buildLevel);
  if (fault === 'rc-authored') faces.forEach((t, i) => { t._buildLevel = function (d, l, s, tier) { return keepBL[i].call(this, d, l, s, tier, null); }; });
  const { storyById } = require(path.join(WG, 'data', 'literacy', 'reading-passages-levels.js'));
  try {
    for (const id of RC) {
      const type = typeOf(id);
      for (const loc of LOCALES) for (const level of [1, 2, 3]) {
        const byPos = [];
        for (let k = 0; k < 36; k++) {
          const v = 2 + k * 7;
          let b;
          try { b = type.build({ difficulty: level, locale: loc }, { rng: makeRng('rc'), variant: v, maker: true }); } catch (e) { fails.push(`rc ${id} ${loc} L${level} copy ${v}: ${e.message}`); continue; }
          const qs = (b.meta.questions || []).filter((q) => q.kind !== 'write');
          if (!qs.length) { fails.push(`rc ${id} ${loc} L${level} copy ${v}: no questions`); continue; }
          let letters = qs.map((q) => q.correct);
          if (fault === 'rc-same-letter') letters = letters.map(() => 1);
          if (qs.length <= 3 && new Set(letters).size !== qs.length) fails.push(`rc ${id} ${loc} L${level} copy ${v}: two questions answer under one letter (${letters.join(',')})`);
          letters.forEach((x, i) => (byPos[i] = byPos[i] || []).push(x));
          // the printed right answer is the story's right answer, and the page marks it
          const story = storyById(loc, b.meta.passage);
          const authored = level === 1 ? story.l1 : level === 3 ? story.l3.mc : story.core;
          qs.forEach((q, i) => {
            const a = authored.find((x) => x.q === q.q);
            if (!a || a.choices[a.correct] !== q.choices[q.correct]) fails.push(`rc ${id} ${loc} L${level} copy ${v}: question ${i + 1} marks another answer than the story's`);
            if (!a || [...a.choices].sort().join('|') !== [...q.choices].sort().join('|')) fails.push(`rc ${id} ${loc} L${level} copy ${v}: question ${i + 1} prints other choices`);
          });
          const marked = [...b.bodyHtml.matchAll(/data-lcs-choice="(\d+)"( data-lcs-correct="1")?/g)];
          const qPos = []; let qi = -1;
          for (const m of marked) { if (m[1] === '0') qi++; if (m[2]) qPos[qi] = +m[1]; }
          if (qPos.join() !== qs.map((q) => q.correct).join()) fails.push(`rc ${id} ${loc} L${level} copy ${v}: the page marks ${qPos.join(',')}, its questions ${qs.map((q) => q.correct).join(',')}`);
        }
        byPos.forEach((arr, i) => { const s = share(arr); if (s.share > 0.6) fails.push(`rc ${id} ${loc} L${level}: question ${i + 1} answers under one letter on ${s.top} of ${arr.length} new versions`); });
      }
    }
  } finally { faces.forEach((t, i) => { t._buildLevel = keepBL[i]; }); }

  // ---- wc: where the asked words stand (G1-497 levels 2 and 3; every copy but the published level-2 one)
  const GT = require(path.join(WG, 'data', 'grammar', 'grammar-tables.js'));
  const keepWC = GT.WORD_CLASS_SENTENCES.en;
  if (fault === 'wc-no-extra') GT.WORD_CLASS_SENTENCES.en = [];
  try {
    const wc = typeOf('G1-497');
    for (const loc of LOCALES) for (const level of [2, 3]) {
      const shares = [];
      for (let v = 2; v <= 41; v++) {
        const b = cat(wc, level, loc, fault === 'wc-published' && level === 2 ? 1 : v);
        const places = [];
        for (const s of b.meta.sentences) s.split(' ').filter((w) => w !== '.').forEach((w, i) => { if (/^\[.*\]$/.test(w)) places.push(i + 1); });
        shares.push(share(places).share);
      }
      const over = shares.filter((x) => x > 0.5).length;
      const msg = `wc G1-497 ${loc} L${level}: ${over} of 40 pages hold more than half their answers in one place (mean top share ${(shares.reduce((a, b) => a + b, 0) / shares.length).toFixed(2)})`;
      // English has the sentences for it (WORD_CLASS_SENTENCES); the other banks await theirs (sentences-needed list)
      if (loc === 'en') { if (over) fails.push(msg); } else if (over) WARN.push(msg);
    }
  } finally { GT.WORD_CLASS_SENTENCES.en = keepWC; }

  // ---- place: G2-399 the deciding place
  const g399 = typeOf('G2-399');
  const keepDec = [g399.difficulty[2].decide, g399.difficulty[3].decide];
  if (fault === 'place-fixed') { delete g399.difficulty[2].decide; delete g399.difficulty[3].decide; }
  try {
    for (const loc of LOCALES) {
      const first = cat(g399, 2, loc, 1);
      const p1 = [...first.bodyHtml.matchAll(/data-lcs-place="[^"]*:(\d)"/g)].map((m) => +m[1]);
      if (p1.some((x) => x !== 1)) fails.push(`place G2-399 ${loc}: copy 1 of level 2 is not the published page (tens on every card)`);
      for (const level of [2, 3]) {
        const all = [];
        for (let v = 2; v <= 41; v++) all.push(...[...cat(g399, level, loc, v).bodyHtml.matchAll(/data-lcs-place="[^"]*:(\d)"/g)].map((m) => +m[1]));
        const s = share(all);
        if (s.share > (level === 2 ? 0.4 : 0.55) || Object.keys(s.n).length < 3) fails.push(`place G2-399 ${loc} L${level}: the deciding places ${JSON.stringify(s.n)} over 40 copies`);
      }
    }
  } finally { g399.difficulty[2].decide = keepDec[0]; g399.difficulty[3].decide = keepDec[1]; }

  // ---- count: G1-308 "write how many"
  const g308 = typeOf('G1-308');
  const keepCW = [g308.difficulty[2].countWant, g308.difficulty[3].countWant];
  if (fault === 'count-fixed') { delete g308.difficulty[2].countWant; delete g308.difficulty[3].countWant; }
  try {
    for (const loc of LOCALES) for (const level of [2, 3]) {
      const ans = [];
      for (let v = 2; v <= 41; v++) {
        let b; try { b = cat(g308, level, loc, v, 'animals', { answerKey: true }); } catch (e) { fails.push(`count G1-308 ${loc} L${level} copy ${v}: ${String(e.message).slice(0, 100)}`); continue; }
        ans.push(...[...b.bodyHtml.matchAll(/data-lcs-answer="(\d+)"/g)].map((m) => m[1]));
      }
      const s = share(ans);
      if (ans.length < 20 || s.share > 0.5) fails.push(`count G1-308 ${loc} L${level}: "write how many" answers ${JSON.stringify(s.n)} over 40 copies`);
    }
  } finally { g308.difficulty[2].countWant = keepCW[0]; g308.difficulty[3].countWant = keepCW[1]; }

  // ---- number: G1-411 level 1
  const g411 = typeOf('G1-411');
  const keepMax = g411.difficulty[1].nMax;
  if (fault === 'number-fixed') g411.difficulty[1].nMax = 2;
  try {
    for (const loc of LOCALES) {
      const ns = [];
      for (let v = 1; v <= 40; v++) {
        let b; try { b = cat(g411, 1, loc, v, 'animals bw'); } catch (e) { fails.push(`number G1-411 ${loc} copy ${v}: ${String(e.message).slice(0, 100)}`); continue; }
        const n = [...b.bodyHtml.matchAll(/data-lcs-n="(\d+)"/g)].map((m) => +m[1]);
        if (n.some((x) => x >= g411.difficulty[1].pool)) fails.push(`number G1-411 ${loc} copy ${v}: asks as many as the card shows`);
        ns.push(...n);
      }
      const s = share(ns);
      if (Object.keys(s.n).length < 2 || s.share > 0.7) fails.push(`number G1-411 ${loc} L1: the numbers ${JSON.stringify(s.n)} over 40 copies`);
    }
  } finally { g411.difficulty[1].nMax = keepMax; }
  return fails;
}

if (!POISON) {
  const fails = run(null);
  fails.slice(0, 30).forEach((f) => console.log('FAIL  ' + f));
  WARN.forEach((w) => console.log('WARN  ' + w));
  console.log(fails.length ? `answer places: ${fails.length} problem(s)` : `answer places: 10 templates, 11 languages; all checks pass${WARN.length ? ` (${WARN.length} warnings: banks that cannot do better yet)` : ''}`);
  process.exit(fails.length ? 1 : 0);
} else {
  let bad = 0;
  const faults = ['rc-authored', 'rc-same-letter', 'wc-no-extra', 'wc-published', 'place-fixed', 'count-fixed', 'number-fixed'];
  for (const f of faults) {
    const n = run(f).length;
    console.log((n ? 'caught   ' : 'MISSED   ') + f + (n ? ` (${n} reports)` : ''));
    if (!n) bad++;
  }
  console.log(bad ? `${bad} planted fault(s) not caught` : `${faults.length} of ${faults.length} planted faults caught`);
  process.exit(bad ? 1 : 0);
}
