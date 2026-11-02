#!/usr/bin/env node
/**
 * Gate 8 `settings-space` (ARCHITECTURE §15; task 4 of the ten, 2026-11-01): guessability + answer position over EVERY
 * exposed control value of every built maker — level · pictures (colour + B&W) · word · copy ("New version") · language.
 * "Where the answer sits is content" (memory 2026-10-06): a child must not be able to score by position or by a tell.
 *
 * Per built maker × template × locale (en + fi; --locales=) × level: a POOL of pages over the template's control values
 * (lib/maker-pages settingsSpace: 2 themes × 2 words × copies) is built with the maker's own runtime, mounted in
 * Chromium, and every answer the template's screen grades is read from the rendered page:
 *   - a `screen: 'marks'` template → its screen build, read by screen.js derive (type / choice / select / pair / place)
 *   - an `interactive` template → its interactive build, read by the type's own `interactive` spec
 *   - a writing / material template → no graded answer: nothing to measure (counted, listed)
 * lib/guess-maker measures every no-knowledge strategy against chance (the qa/guessability constants, never moved):
 * slot / rotation / number rank / length / shared tokens / the biggest box / the most pictures (choice); halves and
 * alternation (select); constant answer / box index / card index / previous + 1 / echo of a printed number (type);
 * item k ↔ target k / same row / nearest (pair); always bin k / alternate / nearest (place).
 *
 * Non-vacuity: a template that declares a screen must yield ≥ 1 graded answer per page — "measured nothing" fails.
 * Poisons, both directions, every run: K-002 with the right chip moved to the FIRST slot of every card must FAIL;
 * K-006 with every write box answering its own card number must FAIL; a synthetic pair page where item k ↔ target k
 * must FAIL; a place page that always answers bin 0 must FAIL; the real K-002 / K-006 pools must PASS.
 *
 *   node scripts/makers/gates/settings-space.js [--makers=a,b] [--locales=en,fi] [--copies=6] [--quick] [--ids=G1-232] [--json=out.json]
 *   (quick: en only, 3 copies)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const MP = require('./lib/maker-pages.js');
const GM = require('./lib/guess-maker.js');
const screen = require('../screen.js');

const A = MP.args();

/*
 * EXEMPT — a strategy that IS the skill the page teaches is not a tell (main session, 2026-11-01, each checked against the
 * template's own instruction). Only the named strategy of the named template is dropped; every other strategy of that
 * template still counts, and the verdict is recomputed from the rest. Never add an entry to make a run pass: an entry
 * names WHY the pattern is the lesson.
 */
const EXEMPT = {
  'K-008': [/^(imgs|area)-max$/, 'circle the group that has MORE: the most pictures IS the answer'],
  'K-009': [/^(imgs|area)-min$/, 'circle the group that has FEWER: the fewest pictures IS the answer'],
  'G1-455': [/^alternate-/, 'colour every even number on a chart: even numbers alternate on any number row'],
  'G3-356': [/^const-(0|30)$/, 'add and subtract whole hours (level 1) or half hours (level 2): the minutes of every answer are :00 (and :30) by the level — keeping the minutes is part of the skill; the screen grades them in their own box, pooled here with the hours 1-12'],
  'G1-479': [/^(first-half|second-half|alternate-[01])$/, 'shade the quarters the minute hand has passed: they always start at 12 and run clockwise (quarter past = the top right, half past = the right half) — where the shaded quarters sit IS the lesson'],
  'G2-228': [/^alternate-/, 'colour ONE HALF: any half of the parts is right (graded "any N"), so every other part is a right answer, not a guess'],
  'G3-316': [/^alternate-/, 'colour n of d parts: any n parts are right (graded "any N")'],
  'G1-137': [/^slot-[02]$/, 'the symbols stand in their fixed order < = >; without equal pairs two outcomes remain — the child still compares'],
  'G2-219': [/^slot-[02]$/, 'the symbols stand in their fixed order < = >; the child still compares'],
  'G1-434': [/^prev\+1$/,'missing numbers on a 120 chart: the next number IS the answer — the counting sequence is the lesson'],
  'G1-436': [/^prev\+1$/,'fill in the number chart in order, box by box: counting on is the lesson'],
  'G2-394': [/^prev\+1$/,'missing numbers on a number chart: the counting sequence is the lesson'],
  'G1-449': [/^(const-1|echo|same-as-prev)$/, 'near doubles: write the double of the printed number (echo / a repeated part) and the "+ 1" box is always 1 — the strategy is the lesson'],
  'G2-409': [/^(const-\d+|same-as-prev|prev\+1)$/, 'the two numerators make the whole (1/3 shaded, 2/3 not), level 1 shows unit fractions (numerator 1); the shaded and the unshaded fraction share their denominator, which the level draws from one or two part counts'],
  'G1-351': [/^(const-|same-as-prev$)/,'sorting numbers into the odd and even house: the bins are read as set placeholders, not typed answers'],
  'G1-456': [/^(const-|same-as-prev$)/, 'cut and sort into the odd and even house: set placeholders (the house repeats)'],
  'G3-387': [/^(const-|same-as-prev$)/, 'sorting into round-up / round-down bins: set placeholders (the bin repeats)'],
  'G1-113': [/^(echo|same-as-prev|const-\d+)$/, 'fact families: the four sentences use the same three numbers, printed by the two groups'],
  'G1-369': [/^(same-as-prev|const-[01])$/, 'a fair share: each friend gets the same number, and what is left over is 0 or 1 — that IS odd or even'],
  'G2-351': [/^(same-as-prev|const-[01])$/, 'two EQUAL addends: the two boxes hold the same number, and the left-over box is 0 or 1 — that IS odd or even'],
  // [regex, why, locales?] — a third element scopes the entry to the locales whose own data make the pattern the lesson
  'K-031': [/^prev\+1$/, 'write the position counting from the arrow: two marked pictures side by side ARE n and n + 1 — counting on is the lesson'],
  'K-389': [/^(same-as-prev|const-.+)$/, 'one sight word per page: the title names the word and every gap takes it — writing it again IS the practice'],
  'K-437': [/^const-\p{L}$/u, "the missing letter is the word's own: vowels are the most frequent letters of any sight-word list, and 'always a' fills one gap in six, never a word"],
  // one entry per template: a second 'G1-439' key further down silently replaced this one, so card-index counted again (2026-11-02)
  'G1-439': [/^(card-index|const-\d)$/, 'the two jump boxes hold the steps to and past the ten (1-9), so a card number (1-4) is sometimes a step by chance; the third box (the result, 20-100) never is — the strategy solves no card; and the make-ten bridge starts just below ten (6–9), so the jump to the ten is always 1–4 — the strategy is the lesson'],
  'G1-266': [/^const-\d+$/, 'number walls to 10 with bases 1-3: the sums of small numbers cluster on 3 and 4 (the level range is 2-8) — every new page caps one number at an eighth of its bricks where the range allows, and one number never completes a wall'],
  'G1-267': [/^(const-\d+|prev\+1|same-as-prev)$/, 'four-course walls of small numbers: the sums cluster on 3-5, and two neighbouring sums differ by the difference of the outer bricks ("one more than the brick before" is arithmetic; two bricks over mirrored bases — 1 2 1 → 3 3 — are equal) — the generator spreads every new page; one number never completes a wall'],
  'K-444': [/^same-as-prev$/, 'count on: the worked trail writes each number counted on, so the total repeats the last trail box'],
  // the size pages: the child circles the biggest / tallest / longest picture — "pick the biggest" IS the skill
  'K-032': [/^area-max$/, 'circle the BIGGEST picture in each row: picking the biggest is the task'],
  'K-035': [/^area-max$/, 'circle the TALLEST picture in each row: the tallest of one picture drawn at several sizes is its biggest'],
  'K-037': [/^area-max$/, 'circle the LONGEST picture in each row: the longest of one picture drawn at several sizes is its biggest'],
  'K-079': [/^area-max$/, 'circle the BIGGEST shape in each row: picking the biggest is the task'],
  'K-445': [/^same-as-prev$/, 'same number? both groups are counted; on the "yes" rows the two counts are equal'],
  'K-452': [/^same-as-prev$/, 'three ways to show ONE number: the number repeats'],
  'K-448': [/^echo$/, 'teen numbers: write the number, then 10 + ones = that number (it is printed back)'],
  'K-456': [/^index-rev$/, 'a number house lists every split in order, so the missing part counts down floor by floor — the pattern is the lesson'],
  'G1-451': [/^echo$/, 'double and half machines: the half of a double is the number printed at the start'],
  'G1-442': [/^const-10$/, 'a facts drill samples the facts within 10 evenly, and more facts make 10 than any other sum'],
  'G3-409': [/^(same-as-prev|const-\d+)$/, 'fact of the day: one fact per page, written every way — its numbers and its product fill several boxes'],
  'G3-407': [/^index$/, 'a multiplication square: the row of 1 repeats the column numbers'],
  'G3-389': [/^const-\d+$/, 'level 1 numbers stay within 50, so they round to the four tens 20–50'],
  'G2-206': [/^const-1$/, 'make A ten: 11–19 ones bundle into one ten — the tens box is 1 by the task'],
};
// EXEMPT is an object literal: a template written twice keeps only its LAST entry (2026-11-02: G1-439 lost card-index that
// way) — the gate refuses to run with a duplicate key
{
  const src = fs.readFileSync(__filename, 'utf8'), at = src.indexOf('const EXEMPT = {');
  const keys = [...src.slice(at, src.indexOf('\n};', at)).matchAll(/^\s*'([A-Z0-9-]+)':/gm)].map((m) => m[1]);
  const dup = keys.filter((k, i) => keys.indexOf(k) !== i);
  if (dup.length || keys.length !== Object.keys(EXEMPT).length) { console.log('FAIL EXEMPT lists ' + (dup.join(', ') || 'a template') + ' twice — merge the entries'); process.exit(1); }
}
function exemptFor(id, r, locale) {
  const ex = EXEMPT[id];
  if (!ex || !r.strategies) return r;
  if (ex[2] && !ex[2].includes(locale)) return r;   // an entry scoped to the locales whose data make the pattern the lesson
  const kept = r.strategies.filter((st) => !ex[0].test(st.name));
  if (kept.length === r.strategies.length) return r;
  const rank = { FAIL: 2, WARN: 1, PASS: 0 };
  let worst = null;
  for (const st of kept) if (!worst || rank[st.v] > rank[worst.v] || (rank[st.v] === rank[worst.v] && st.score > worst.score)) worst = st;
  return { ...r, strategies: kept, worst, verdict: worst ? worst.v : 'PASS', exempted: ex[1] };
}
const QUICK = !!A.quick;
const LOCS = String(A.locales || (QUICK ? 'en' : 'en,fi')).split(',');
const COPIES = Number(A.copies || (QUICK ? 3 : 6));

(async () => {
  const makers = MP.builtMakers(A.makers);
  const m = await new MP.Mounter().open();
  let fails = 0, groups = 0, pagesN = 0, questions = 0, noInstrument = 0;
  const report = [];
  const fail = (s) => { fails++; if (fails <= 60) console.log('FAIL ' + s); };

  /** read the graded answers of one page html (marks or declared) → bundle list */
  async function readPage(html, mode, spec) {
    const page = await m.mount(html, 703);
    if (mode === 'marks') {
      const model = await page.evaluate(screen.derive);
      if (model.errors && model.errors.length) return { err: model.errors.join('; ') };
      return { bundles: (await page.evaluate(GM.enrichMarks, model)).bundles };
    }
    const b = await page.evaluate(GM.readDeclared, spec);
    if (b === null) return { skip: 'kind ' + spec.kind + ' has no position instrument' };
    return { bundles: b };
  }

  /** the pool of one template × locale × level: pages over the control values (copies per theme × word), read */
  async function poolsFor({ maker, t, type, tj, loc, d, mode, copies, sample }) {
    const space = MP.settingsSpace(t, loc, { themes: 2, units: 2, copies, levels: [d], sample });
    // an unthemed, wordless template has one axis (the copy): give it the whole pool on that axis
    const opts = (!t.themed && !(t.units && t.units[loc] && t.units[loc].length) && (t.copiesDiffer || []).includes(d)) ? Array.from({ length: copies * 2 }, (_, i) => ({ difficulty: d, theme: null, unit: null, variant: i + 1 + sample * copies * 2 })) : space;
    const pools = [];
    let skip = null, empty = 0;
    for (const o of opts) {
      let html;
      // the page the maker shows: this seed, or one of runtime.generate's fresh-seed retries (a seed that cannot be built
      // is never shown — 2026-11-02: the money G2-292 / G2-293 seeds that ran out of distinct questions failed here)
      let err = null;
      for (const sv of [null, '.1', '.2', '.3', '.4']) {
        const oo = sv ? { ...o, seedVariant: o.variant + sv } : o;
        try { html = mode === 'marks' ? MP.buildPage(t, type, tj, loc, oo, { screen: true }).screenHtml : MP.buildDeclaredScreen(t, type, tj, loc, oo).html; break; } catch (e) { err = err || e; }
      }
      if (!html) { fail(`${maker} ${t.id} ${loc} L${d} ${JSON.stringify(o)}: build — ${err.message}`); continue; }
      const r = await readPage(html, mode, type.interactive);
      if (r.skip) { skip = r.skip; break; }
      if (r.err) { fail(`${maker} ${t.id} ${loc} L${d} v${o.variant} ${o.theme || ''}: ${r.err}`); continue; }
      pagesN++;
      // the PUBLISHED page (level 2, copy 1) of a declared-screen template is rebuilt exactly as it shipped, with no
      // screen build (its interactive version is the catalogue's own deck): no graded answer there is by design.
      // Every other page must yield one. (main session 2026-11-01: 45 "measured nothing" lines were all this page)
      const publishedDeclared = mode !== 'marks' && Number(o.difficulty) === 2 && Number(o.variant || 1) === 1;
      if ((!r.bundles.length || !r.bundles.some((b) => b.items.length)) && !publishedDeclared) empty++;
      pools.push(r.bundles);
    }
    return { pools, skip, empty };
  }
  const tpl = {};

  /** measure one pool and report (an exempt strategy of that template is dropped before the verdict — EXEMPT) */
  function judge(tag, pools, extra) {
    const res = GM.measure(pools).map((r) => exemptFor((extra && extra.id) || tag.split(' ')[1], r, extra && extra.locale));
    const out = [];
    for (const r of res) {
      groups++; questions += r.questions;
      const w = r.worst;
      const line = `${tag} ${r.kind.padEnd(6)} pages=${String(r.pages).padStart(3)} q=${String(r.questions).padStart(4)} chance=${(r.chance * 100).toFixed(0).padStart(3)}%` + (w ? ` worst ${w.name}=${(w.score * 100).toFixed(0)}% z=${w.z.toFixed(1)}` : '');
      report.push({ tag, ...extra, kind: r.kind, pages: r.pages, questions: r.questions, chance: r.chance, verdict: r.verdict, worst: w ? { name: w.name, score: w.score, z: w.z, pagesSolved: w.pagesSolved } : null });
      if (r.verdict === 'FAIL') console.log('FAIL ' + line);   // counted after the replication check below
      else if (r.verdict === 'WARN') console.log('WARN ' + line);
      else if (A.verbose) console.log('ok   ' + line);
      out.push(r);
    }
    return out;
  }

  for (const { maker, tj } of makers) {
    let mk = 0;
    for (const t of tj.templates) {
      if (A.ids && !String(A.ids).split(',').includes(t.id)) continue;   // --ids=G1-232,… (a quick re-measure of named templates)
      const type = MP.loadType(t);
      const mode = t.screen === 'marks' ? 'marks' : t.interactive ? 'declared' : null;
      if (!mode) { noInstrument++; continue; }
      for (const loc of LOCS.filter((l) => t.locales.includes(l))) {
        const lv = mode === 'marks' ? t.screenLevels : t.levels;
        // each locale is an INDEPENDENT sample (other themes, words and copy numbers → other seeds): the seed does not
        // know the locale, so the same themes and copies would re-measure the same numbers under other labels
        const sample = LOCS.indexOf(loc);
        for (const d of lv) {
          const got = await poolsFor({ maker, t, type, tj, loc, d, mode, copies: COPIES, sample });
          if (got.skip) { noInstrument++; console.log(`note ${maker} ${t.id} ${loc} L${d}: ${got.skip} — reported, not measured`); continue; }
          const pools = got.pools;
          if (!pools.length) continue;
          if (got.empty) fail(`${maker} ${t.id} ${loc} L${d}: measured nothing on ${got.empty}/${pools.length} pages (a screen with no graded answer)`);
          judge(`${maker} ${t.id} ${loc} L${d}`, pools, { maker, id: t.id, locale: loc, level: d, mode });
          tpl[t.id] = { maker, t, type, tj, mode };
          mk++;
        }
      }
    }
    console.log(`${maker}: ${mk} template × locale × level groups measured`);
  }

  // ---- poisons, both directions
  {
    const K002 = require(path.join(MP.REPO, 'scripts/worksheet-gen/types/k/K-002-count-and-circle.js'));
    const K006 = require(path.join(MP.REPO, 'scripts/worksheet-gen/types/k/K-006-count-scattered-write.js'));
    const tj = makers.find((x) => x.maker === 'counting') ? makers.find((x) => x.maker === 'counting').tj : { answerKey: { en: 'Answer key' } };
    const t2 = { id: 'K-002', themed: true, themes: ['animals', 'fruits'], levels: [2], copiesDiffer: [2], locales: ['en'] };
    const t6 = { id: 'K-006', themed: true, themes: ['animals', 'fruits'], levels: [2], copiesDiffer: [2], locales: ['en'] };
    const space = MP.settingsSpace(t2, 'en', { themes: 2, copies: 6, levels: [2] });
    const good2 = [], bad2 = [], good6 = [], bad6 = [];
    for (const o of space) {
      const h2 = MP.buildPage(t2, K002, tj, 'en', o, { screen: true }).screenHtml;
      good2.push((await readPage(h2, 'marks')).bundles);
      // every card's right chip moved to its FIRST chip
      const p2 = h2.replace(/<div class="ws-choices">([\s\S]*?)<\/div>/g, (m0, inner) => '<div class="ws-choices">' + inner.replace(/ data-lcs-correct="1"/g, '').replace('<span class="ws-chip"', '<span class="ws-chip" data-lcs-correct="1"') + '</div>');
      if (p2 === h2) throw new Error('poison 1: the chip rows were not found');
      bad2.push((await readPage(p2, 'marks')).bundles);
      const h6 = MP.buildPage(t6, K006, tj, 'en', o, { screen: true }).screenHtml;
      good6.push((await readPage(h6, 'marks')).bundles);
      // every write box answers its own card number
      let k = 0;
      const p6 = h6.replace(/data-lcs-answer="\d+"/g, () => `data-lcs-answer="${++k}"`);
      if (p6 === h6) throw new Error('poison 2: the write boxes were not found');
      bad6.push((await readPage(p6, 'marks')).bundles);
    }
    const v = (pools) => GM.measure(pools).map((r) => r.verdict);
    const ok1 = v(bad2).includes('FAIL'), ok1c = !v(good2).includes('FAIL');
    const ok2 = v(bad6).includes('FAIL'), ok2c = !v(good6).includes('FAIL');
    if (!ok1) fail('poison 1: K-002 with the right chip always first PASSED');
    if (!ok1c) fail('poison control: the real K-002 pool FAILS (' + JSON.stringify(GM.measure(good2).map((r) => r.worst && r.worst.name)) + ')');
    if (!ok2) fail('poison 2: K-006 with every answer = its card number PASSED');
    if (!ok2c) fail('poison control: the real K-006 pool FAILS');
    // pair + place on data (the readers are exercised by 1 and 2): item k ↔ target k must fail, a shuffled pairing must pass
    const rngP = (s) => () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    const pairPages = (shuffled) => { const r = rngP(7); return Array.from({ length: 12 }, () => { const n = 6; const ids = Array.from({ length: n }, (_, i) => 't' + i); const perm = ids.slice(); if (shuffled) for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; } return [{ kind: 'pair', items: ids.map((_, i) => ({ x: 10, y: 10 + i * 12, answer: perm[i] })), targets: ids.map((id, i) => ({ x: 70, y: 10 + i * 12, id })) }]; }); };
    if (!v(pairPages(false)).includes('FAIL')) fail('poison 3: a pair page with item k ↔ target k PASSED');
    if (v(pairPages(true)).includes('FAIL')) fail('poison 3 control: a shuffled pair page FAILS');
    const placePages = (fixed) => { const r = rngP(11); return Array.from({ length: 12 }, () => { const bins = ['a', 'b', 'c'].map((id, i) => ({ id, x: 10 + i * 30, y: 90 })); return [{ kind: 'place', items: Array.from({ length: 8 }, (_, i) => ({ x: 10 + (i % 4) * 20, y: 10 + Math.floor(i / 4) * 20, answer: fixed ? 'a' : bins[Math.floor(r() * 3)].id })), bins }]; }); };
    if (!v(placePages(true)).includes('FAIL')) fail('poison 4: a place page that always answers bin a PASSED');
    if (v(placePages(false)).includes('FAIL')) fail('poison 4 control: a random place page FAILS');
    // optional write boxes ("leave it empty if the sum is right"): a page whose boxes are empty 6 times in 8 must FAIL on
    // "leave every box empty"; one with 4 in 8 empty, numbers spread, must PASS — and must not fail on "the same as the box
    // before" where two empty boxes meet (the 2026-11-01 G1-447 measure)
    const optPages = (empty) => { const r = rngP(23); return Array.from({ length: 12 }, () => { const blanks = new Set(); while (blanks.size < empty) blanks.add(Math.floor(r() * 8)); return [{ kind: 'type', items: Array.from({ length: 8 }, (_, i) => ({ answer: blanks.has(i) ? '' : String(3 + Math.floor(r() * 15)), idx: i, cardIdx: i, cardNums: [], optional: true, x: 50, y: 10 + i * 10 })) }]; }); };
    if (!v(optPages(6)).includes('FAIL')) fail('poison 5: optional boxes empty 6 times in 8 PASSED');
    if (v(optPages(4)).includes('FAIL')) fail('poison 5 control: optional boxes empty 4 times in 8 FAIL (' + JSON.stringify(GM.measure(optPages(4)).map((r) => r.worst && r.worst.name)) + ')');
  }

  await m.close();
  if (m.errors.length) fail('page errors: ' + m.errors.slice(0, 3).join(' | '));
  // REPLICATION (memory 2026-10-06, qa/guessability-builders --epoch): a tell is the generator's when it shows in every
  // independent sample (each locale is one); a FAIL in one sample with a PASS in the other is the luck of those pages
  // and is REPORTED as "once", never counted as a defect — and never re-salted until it passes
  const byKey = {};
  for (const r of report) (byKey[`${r.maker} ${r.id} L${r.level} ${r.kind}`] = byKey[`${r.maker} ${r.id} L${r.level} ${r.kind}`] || []).push(r);
  const tells = [], once = [];
  for (const [k, rs] of Object.entries(byKey)) {
    const vs = rs.map((r) => r.verdict);
    if (!vs.includes('FAIL')) continue;
    const replicated = rs.length === 1 ? 'single sample' : vs.every((v) => v !== 'PASS') ? 'replicated' : 'once';
    const line = `${k}: ${rs.map((r) => `${r.locale} ${r.verdict} ${r.worst ? r.worst.name + '=' + (r.worst.score * 100).toFixed(0) + '%' : ''}`).join(' · ')}`;
    if (replicated === 'once') once.push(line); else tells.push(line + ` (${replicated})`);
  }
  // the per-sample FAILs above are printed, not counted; the gate's verdict is the replicated set
  fails += tells.length;
  if (tells.length) { console.log('\nTELLS (replicated in every sample, or a single sample):'); tells.forEach((l) => console.log('FAIL ' + l)); }
  if (once.length) { console.log('\nonce (FAIL in one sample, PASS in the other — luck of those pages; re-check with more copies):'); once.forEach((l) => console.log('note ' + l)); }
  if (A.json) fs.writeFileSync(A.json, JSON.stringify({ report, tells, once }, null, 1));
  const warning = report.filter((r) => r.verdict === 'WARN').length;
  console.log(`settings space: ${pagesN} pages, ${groups} groups, ${questions} graded answers measured; ${noInstrument} template groups with no graded answer (writing / material / an unread kind); ${tells.length} tells, ${once.length} once, ${warning} WARN` + (fails ? `; ${fails} failing` : '; poisons fire both ways'));
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('settings space: error — ' + e.stack); process.exit(1); });
