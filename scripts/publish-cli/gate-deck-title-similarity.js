#!/usr/bin/env node
/**
 * gate-deck-title-similarity.js <staging-folder> [--fail=0.80] [--warn=0.65] [--top=15]
 *
 * Cross-variant similarity gate for staged DECK titles + meta descriptions.
 *
 * WHY THIS EXISTS. Deck title and description uniqueness is enforced by EXACT
 * HASH only (seo-reconciliation predicates 1 and 2, backed by
 * @@unique([language, titleHash])). Two variations of one worksheet type can
 * therefore ship copy that differs by a single word and every gate in the
 * pipeline passes, because the hashes differ. That is tolerable when a family
 * has one face; this batch gives some families eight, so near-duplicate copy is
 * the most likely way for it to fail the quality bar.
 *
 * It is made worse by how the description is composed: build-seo-head pulls the
 * skill sentence from the FAMILY key, so every face of a family shares it, and
 * the per-face `instruction` is the only sentence that differs. If the panels
 * write near-identical instructions, the descriptions come out near-identical.
 *
 * The metric is the house one, imported rather than re-implemented:
 * gate-teaching-similarity's word-3-gram Jaccard, FAIL >= 0.80 / WARN >= 0.65 —
 * the same thresholds §22.1 locks for the landing gate. THE GAUGE IS NEVER
 * MOVED TO CLEAR A PAIR: a FAIL means the copy gets fixed.
 *
 * Pairs are compared within a GROUP (same exercise_type + same language), since
 * that is where cannibalisation actually happens; two different families sharing
 * a phrase is not the concern here.
 *
 * Read-only. Exit 0 = no FAIL, 1 = at least one FAIL, 2 = usage.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { grams, jaccard } = require('./gate-teaching-similarity.js');
const { descriptionOf } = require('./scan-staged-desc-band.js');

const TITLE_RE = /<h1[^>]*>([\s\S]*?)<\/h1>/i;

function titleOf(html) {
  const m = TITLE_RE.exec(html);
  return m ? m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

function load(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.toLowerCase().endsWith('.zip')).sort()) {
    const zip = new AdmZip(path.join(dir, f));
    const he = zip.getEntry('deck.html'); const me = zip.getEntry('manifest.json');
    if (!he) continue;
    const html = he.getData().toString('utf8');
    let m = {}; try { m = JSON.parse(me.getData().toString('utf8')); } catch (e) { /* {} */ }
    out.push({
      file: f,
      lang: m.language || 'xx',
      family: m.exercise_type || 'unknown',
      title: titleOf(html),
      desc: descriptionOf(html) || '',
    });
  }
  return out;
}

function main() {
  const dir = process.argv[2];
  if (!dir) { console.error('usage: gate-deck-title-similarity.js <staging-folder> [--fail=0.80] [--warn=0.65]'); process.exit(2); }
  const arg = (n, d) => { const a = process.argv.find((x) => x.startsWith('--' + n + '=')); return a ? parseFloat(a.split('=')[1]) : d; };
  const FAIL = arg('fail', 0.80), WARN = arg('warn', 0.65), TOP = arg('top', 15);

  const rows = load(dir);
  if (!rows.length) { console.error('no readable .zip in ' + dir); process.exit(2); }

  const groups = new Map();
  for (const r of rows) {
    const k = r.family + '|' + r.lang;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(r);
  }

  const pairs = [];
  for (const [k, g] of groups) {
    for (const r of g) { r._t = grams(r.title); r._d = grams(r.title + ' ' + r.desc); }
    for (let i = 0; i < g.length; i++) for (let j = i + 1; j < g.length; j++) {
      pairs.push({
        group: k,
        a: g[i], b: g[j],
        title: jaccard(g[i]._t, g[j]._t),
        whole: jaccard(g[i]._d, g[j]._d),
        exactTitle: g[i].title && g[i].title === g[j].title,
        exactDesc: g[i].desc && g[i].desc === g[j].desc,
      });
    }
  }

  const fails = pairs.filter((p) => p.whole >= FAIL || p.exactTitle || p.exactDesc);
  const warns = pairs.filter((p) => !fails.includes(p) && p.whole >= WARN);
  pairs.sort((x, y) => y.whole - x.whole);

  console.log(`scanned ${rows.length} decks in ${groups.size} (family x language) groups, ${pairs.length} within-group pairs`);
  console.log(`thresholds: FAIL >= ${FAIL}, WARN >= ${WARN}`);
  console.log(`top ${Math.min(TOP, pairs.length)} pairs by title+description similarity:`);
  for (const p of pairs.slice(0, TOP)) {
    console.log(`  ${p.whole.toFixed(3)} (title ${p.title.toFixed(3)})  ${p.group}`);
    console.log(`      ${p.a.title}`);
    console.log(`      ${p.b.title}`);
  }
  for (const p of warns) console.log(`  WARN ${p.whole.toFixed(3)} ${p.group}: "${p.a.title}" ~ "${p.b.title}"`);
  for (const p of fails) {
    const why = p.exactTitle ? 'IDENTICAL TITLE' : p.exactDesc ? 'IDENTICAL DESCRIPTION' : `similarity ${p.whole.toFixed(3)}`;
    console.error(`  FAIL ${why} ${p.group}: "${p.a.title}" ~ "${p.b.title}"  (${p.a.file} / ${p.b.file})`);
  }
  console.log(`\n${fails.length} FAIL, ${warns.length} WARN`);
  process.exit(fails.length ? 1 : 0);
}

module.exports = { load, titleOf };
if (require.main === module) main();
