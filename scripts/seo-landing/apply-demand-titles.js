#!/usr/bin/env node
/**
 * apply-demand-titles.js — write the demand-keyed title + metaDescription onto
 * every landing page.
 *
 * DRY-RUN BY DEFAULT. Writing requires an explicit --write.
 *
 * Mutates ONLY `title` and `metaDescription` in
 * frontend/content/seo-landing/<locale>.json. h1, p1/p2/p3, slug, coordinate,
 * canonicalDeckSlug, carousel, slotTokens, standard and strand are never touched —
 * the prose is good (pairwise similarity 0.13-0.31) and the H1s are already
 * unique; only the two machine-generated fields are broken.
 *
 * FAILS CLOSED. Every pre-check below exists because the unguarded version
 * produced exactly that defect during development, so they are assertions about
 * real past failures rather than hypothetical hygiene:
 *
 *   raw-key artifacts   230 titles in en/de/sv alone read "Animals-vs-birds
 *                       Picture Sorting" before the composer used the engines'
 *                       own themeDisplay().
 *   dead vocabulary     nl "om uit te printen", sv "med facit", pt "fichas"
 *                       (signals Portugal, not Brazil), da/no "regneark" (means
 *                       spreadsheet) — all verified dead or wrong-market.
 *   shared prefixes     the defect being fixed: ~50 siblings sharing the first 52
 *                       characters all present the SAME truncated title in the SERP.
 *   meta band           metas outside 120-170 make the §21.2 preband step
 *                       non-idempotent.
 *
 * Usage:
 *   node scripts/seo-landing/apply-demand-titles.js --locale=en
 *   node scripts/seo-landing/apply-demand-titles.js --all --write
 */
const fs = require('fs');
const path = require('path');
const C = require('./compose-title-meta.js');

const ROOT = path.resolve(__dirname, '..', '..');
const LANDING_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing');
const MATCH_DIR = path.join(ROOT, 'docs', 'audit-results', 'demand-match');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'nl', 'pt', 'sv', 'da', 'no', 'fi'];

const PREFIX_LEN = 50;
const RAW_KEY = /-vs-|_bw|_/;

const argVal = (n, d) => {
  const a = process.argv.find((x) => x.startsWith(`--${n}=`));
  return a ? a.split('=').slice(1).join('=') : d;
};
const hasFlag = (n) => process.argv.includes(`--${n}`);

function buildContext(locale) {
  const engine = C.loadEngine(locale);
  const ctx = {
    locale,
    engine,
    overrides: C.loadOverrides(locale),
    corpus: C.loadCorpus(locale),
    themeAxis: typeof engine.loadTaxonomyThemes === 'function' ? engine.loadTaxonomyThemes() : {},
  };
  ctx.leadMap = C.buildLeadMap(locale, ctx.overrides, ctx.corpus);
  return ctx;
}

function runLocale(locale, opts) {
  const file = path.join(LANDING_DIR, `${locale}.json`);
  const matchFile = path.join(MATCH_DIR, `${locale}.json`);
  if (!fs.existsSync(file)) return { locale, error: 'no landing file' };
  if (!fs.existsSync(matchFile)) {
    return { locale, error: 'no demand-match report — run match-demand.js first' };
  }

  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const landings = data.landings || [];
  const rows = new Map(JSON.parse(fs.readFileSync(matchFile, 'utf8')).rows.map((r) => [r.slug, r]));
  const ctx = buildContext(locale);
  const S = C.SURFACE[locale] || C.SURFACE.en;

  const composed = [];
  for (const l of landings) composed.push({ l, out: C.composeOne(l, rows.get(l.slug), ctx) });

  // ---- pre-checks, all fail-closed ------------------------------------------
  const problems = [];

  const rawKey = composed.filter((c) => RAW_KEY.test(c.out.title));
  if (rawKey.length) {
    problems.push(`${rawKey.length} titles contain a raw-key artifact, e.g. "${rawKey[0].out.title}"`);
  }

  for (const dead of S.NEVER || []) {
    const hits = composed.filter((c) => c.out.title.toLowerCase().includes(dead.toLowerCase()));
    if (hits.length) problems.push(`${hits.length} titles contain the dead/wrong-market string "${dead}"`);
  }

  const byPrefix = new Map();
  for (const c of composed) {
    const k = c.out.title.slice(0, PREFIX_LEN).toLowerCase().trim();
    if (!byPrefix.has(k)) byPrefix.set(k, []);
    byPrefix.get(k).push(c.l.slug);
  }
  const collisions = [...byPrefix.entries()].filter(([, v]) => v.length > 1);
  if (collisions.length) {
    const worst = collisions.sort((a, b) => b[1].length - a[1].length)[0];
    problems.push(`${collisions.length} shared ${PREFIX_LEN}-char title prefixes ` +
      `(worst: ${worst[1].length} pages on "${worst[0]}…")`);
  }

  const outOfBand = composed.filter((c) => {
    const n = c.out.metaDescription.length;
    return n < C.META_MIN || n > C.META_MAX;
  });
  if (outOfBand.length) {
    problems.push(`${outOfBand.length} metas outside ${C.META_MIN}-${C.META_MAX} ` +
      `(e.g. ${outOfBand[0].out.metaDescription.length} chars on ${outOfBand[0].l.slug})`);
  }

  const empty = composed.filter((c) => !c.out.title.trim() || !c.out.metaDescription.trim());
  if (empty.length) problems.push(`${empty.length} pages produced an empty title or meta`);

  // ---- report ---------------------------------------------------------------
  const distinctTitles = new Set(composed.map((c) => c.out.title.toLowerCase())).size;
  const demoted = composed.filter((c) => c.out.demoted).length;
  const usedLead = composed.filter((c) => c.out.usedLead).length;

  console.log(`\n[${locale}] ${landings.length} landings`);
  console.log(`   distinct titles ${distinctTitles}/${landings.length}` +
    ` | demand-keyed lead ${usedLead} | type demoted to tail ${demoted}`);
  console.log(`   shared-${PREFIX_LEN}-prefix groups ${collisions.length}` +
    ` | metas out of band ${outOfBand.length} | raw-key titles ${rawKey.length}`);

  if (opts.samples) {
    const seen = new Set();
    for (const c of composed) {
      const t = c.l.coordinate && c.l.coordinate.type;
      if (seen.has(t) || seen.size >= opts.samples) continue;
      seen.add(t);
      console.log(`   [${t}]`);
      console.log(`     OLD ${c.l.title || '(none)'}`);
      console.log(`     NEW ${c.out.title}`);
    }
  }

  if (problems.length) {
    console.log(`   REFUSING TO WRITE — ${problems.length} problem(s):`);
    for (const p of problems) console.log(`     - ${p}`);
    return { locale, wrote: false, problems, distinctTitles, total: landings.length };
  }

  if (!opts.write) {
    console.log('   PASS (dry-run — pass --write to apply)');
    return { locale, wrote: false, problems: [], distinctTitles, total: landings.length };
  }

  for (const { l, out } of composed) {
    l.title = out.title;
    l.metaDescription = out.metaDescription;
  }
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`   WROTE ${file} — only title + metaDescription mutated.`);
  return { locale, wrote: true, problems: [], distinctTitles, total: landings.length };
}

(function main() {
  const locales = hasFlag('all') ? LOCALES : [argVal('locale', null)].filter(Boolean);
  if (!locales.length) {
    console.error('Usage: node apply-demand-titles.js --locale=<loc> | --all [--write] [--samples=N]');
    process.exit(1);
  }
  const opts = { write: hasFlag('write'), samples: Number(argVal('samples', '0')) || 0 };
  const results = locales.map((loc) => runLocale(loc, opts));
  const blocked = results.filter((r) => r.problems && r.problems.length);
  console.log(`\n${results.length} locale(s) processed | ${blocked.length} blocked by pre-checks` +
    ` | ${results.filter((r) => r.wrote).length} written`);
  if (blocked.length) process.exitCode = 1;
})();
