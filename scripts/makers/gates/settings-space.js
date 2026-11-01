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
 *   node scripts/makers/gates/settings-space.js [--makers=a,b] [--locales=en,fi] [--copies=6] [--quick] [--json=out.json]
 *   (quick: en only, 3 copies)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const MP = require('./lib/maker-pages.js');
const GM = require('./lib/guess-maker.js');
const screen = require('../screen.js');

const A = MP.args();
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

  /** measure one pool and report */
  function judge(tag, pools, extra) {
    const res = GM.measure(pools);
    const out = [];
    for (const r of res) {
      groups++; questions += r.questions;
      const w = r.worst;
      const line = `${tag} ${r.kind.padEnd(6)} pages=${String(r.pages).padStart(3)} q=${String(r.questions).padStart(4)} chance=${(r.chance * 100).toFixed(0).padStart(3)}%` + (w ? ` worst ${w.name}=${(w.score * 100).toFixed(0)}% z=${w.z.toFixed(1)}` : '');
      report.push({ tag, ...extra, kind: r.kind, pages: r.pages, questions: r.questions, chance: r.chance, verdict: r.verdict, worst: w ? { name: w.name, score: w.score, z: w.z, pagesSolved: w.pagesSolved } : null });
      if (r.verdict === 'FAIL') fail(line);
      else if (r.verdict === 'WARN') console.log('WARN ' + line);
      else if (A.verbose) console.log('ok   ' + line);
      out.push(r);
    }
    return out;
  }

  for (const { maker, tj } of makers) {
    let mk = 0;
    for (const t of tj.templates) {
      const type = MP.loadType(t);
      const mode = t.screen === 'marks' ? 'marks' : t.interactive ? 'declared' : null;
      if (!mode) { noInstrument++; continue; }
      for (const loc of LOCS.filter((l) => t.locales.includes(l))) {
        const lv = mode === 'marks' ? t.screenLevels : t.levels;
        // each locale is an INDEPENDENT sample (other themes, words and copy numbers → other seeds): the seed does not
        // know the locale, so the same themes and copies would re-measure the same numbers under other labels
        const sample = LOCS.indexOf(loc);
        for (const d of lv) {
          const space = MP.settingsSpace(t, loc, { themes: 2, units: 2, copies: COPIES, levels: [d], sample });
          // an unthemed, wordless template has one axis (the copy): give it the whole pool on that axis
          const opts = (!t.themed && !(t.units && t.units[loc] && t.units[loc].length) && (t.copiesDiffer || []).includes(d)) ? Array.from({ length: COPIES * 2 }, (_, i) => ({ difficulty: d, theme: null, unit: null, variant: i + 1 + sample * COPIES * 2 })) : space;
          const pools = [];
          let skip = null, empty = 0;
          for (const o of opts) {
            let html;
            try {
              if (mode === 'marks') html = MP.buildPage(t, type, tj, loc, o, { screen: true }).screenHtml;
              else html = MP.buildDeclaredScreen(t, type, tj, loc, o).html;
            } catch (e) { fail(`${maker} ${t.id} ${loc} L${d} ${JSON.stringify(o)}: build — ${e.message}`); continue; }
            const r = await readPage(html, mode, type.interactive);
            if (r.skip) { skip = r.skip; break; }
            if (r.err) { fail(`${maker} ${t.id} ${loc} L${d} v${o.variant} ${o.theme || ''}: ${r.err}`); continue; }
            pagesN++;
            if (!r.bundles.length || !r.bundles.some((b) => b.items.length)) empty++;
            pools.push(r.bundles);
          }
          if (skip) { noInstrument++; console.log(`note ${maker} ${t.id} ${loc} L${d}: ${skip} — reported, not measured`); continue; }
          if (!pools.length) continue;
          if (empty) fail(`${maker} ${t.id} ${loc} L${d}: measured nothing on ${empty}/${pools.length} pages (a screen with no graded answer)`);
          judge(`${maker} ${t.id} ${loc} L${d}`, pools, { maker, id: t.id, locale: loc, level: d, mode });
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
  // the per-sample FAILs above counted toward `fails`; the gate's verdict is the replicated set
  fails -= report.filter((r) => r.verdict === 'FAIL').length;
  fails += tells.length;
  if (tells.length) { console.log('\nTELLS (replicated in every sample, or a single sample):'); tells.forEach((l) => console.log('FAIL ' + l)); }
  if (once.length) { console.log('\nonce (FAIL in one sample, PASS in the other — luck of those pages; re-check with more copies):'); once.forEach((l) => console.log('note ' + l)); }
  if (A.json) fs.writeFileSync(A.json, JSON.stringify({ report, tells, once }, null, 1));
  const warning = report.filter((r) => r.verdict === 'WARN').length;
  console.log(`settings space: ${pagesN} pages, ${groups} groups, ${questions} graded answers measured; ${noInstrument} template groups with no graded answer (writing / material / an unread kind); ${tells.length} tells, ${once.length} once, ${warning} WARN` + (fails ? `; ${fails} failing` : '; poisons fire both ways'));
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('settings space: error — ' + e.stack); process.exit(1); });
