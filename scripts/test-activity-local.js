#!/usr/bin/env node
/*
 * test-activity-local.js — the LOCAL-test gate for ONE activity, all locales.
 * -----------------------------------------------------------------------------
 * Standing-workflow tool (CLAUDE.md §20 activity-build commission, Rule 2):
 * an activity is built in all 11 languages and VERIFIED LOCALLY before the
 * single deploy. This is a thin orchestrator over the two existing audit
 * scripts — it does not re-implement them:
 *
 *   1. scripts/audit-activity-mobile.js  (§A.13.55 mobile-layout gate)
 *   2. scripts/audit-activity-pages.js   (SEO thin-page floor)
 *
 * Both already accept --base=http://localhost:3000, so this points them at the
 * local dev server and judges ONLY the target activity's results (the pages
 * audit has no id filter, so we filter its JSON by activity id here — pre-
 * existing failures in OTHER activities must not fail this gate).
 *
 * PRE-REQ: a local server serving the activity pages + the mini-tools iframe,
 * e.g. `npm run dev` in frontend/ (after the §14.5 sitemap wart toggle), or any
 * server exposing /<locale>/activities/<slug>/. The mini-tools served copy must
 * be fresh — run scripts/master-sync.bat (or cp "mini tools"/* frontend/public/
 * mini-tools/) after editing the activity.
 *
 * USAGE:
 *   node scripts/test-activity-local.js --activity=next-number
 *   node scripts/test-activity-local.js --activity=next-number --locales=en,de,fi
 *   node scripts/test-activity-local.js --activity=next-number --base=http://localhost:3000
 *
 * Exit 0 = the target activity passes BOTH gates in every requested locale.
 * Exit 1 = a hard failure (and the offending records are printed).
 */
'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ALL_LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

function parseArgs(argv) {
  const args = { base: 'http://localhost:3000', locales: ALL_LOCALES, activity: null };
  for (const a of argv.slice(2)) {
    if (a.startsWith('--activity=')) args.activity = a.slice('--activity='.length);
    else if (a.startsWith('--base=')) args.base = a.slice('--base='.length).replace(/\/$/, '');
    else if (a.startsWith('--locales=')) args.locales = a.slice('--locales='.length).split(',').map((s) => s.trim()).filter(Boolean);
  }
  return args;
}

function run(script, scriptArgs) {
  // Inherit stdio so the child's own progress prints live; we judge from JSON.
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...scriptArgs], { stdio: 'inherit' });
  return r.status; // may be 1 if OTHER activities fail — we re-judge from JSON
}

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return null; }
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.activity) {
    console.error('ERROR: --activity=<id substring> is required (e.g. --activity=next-number).');
    process.exit(2);
  }
  const outRel = 'docs/audit-results/activity-local';
  const outDir = path.join(__dirname, '..', outRel);
  fs.mkdirSync(outDir, { recursive: true });
  const localesCsv = args.locales.join(',');

  console.log(`\n=== LOCAL ACTIVITY GATE — "${args.activity}" @ ${args.base} (${localesCsv}) ===\n`);

  // Gate 1 — mobile layout (filtered to our activity by --activities substring).
  console.log('--- Gate 1/2: mobile layout (audit-activity-mobile.js) ---');
  run('audit-activity-mobile.js', [
    `--base=${args.base}`, `--locales=${localesCsv}`, `--activities=${args.activity}`, `--out=${outRel}`,
  ]);
  // The mobile script was already scoped by --activities=<id>, so every record
  // it wrote is for our activity (no second filter needed).
  const mobile = readJson(path.join(outDir, 'mobile-activity-audit.json')) || [];
  const mobileMine = mobile;
  const mobileFails = mobileMine.filter((r) => r.pass === false);

  // Gate 2 — SEO thin-page floor (no id filter in the script → filter JSON here).
  console.log('\n--- Gate 2/2: SEO floor (audit-activity-pages.js) ---');
  run('audit-activity-pages.js', [`--base=${args.base}`, `--locales=${localesCsv}`, `--out=${outRel}`]);
  const pages = readJson(path.join(outDir, 'activity-page-audit.json')) || [];
  const pagesMine = pages.filter((p) => (p.id || '').includes(args.activity));
  const pagesFails = pagesMine.filter((p) => p.pass === false);

  // Verdict.
  console.log('\n=== VERDICT ===');
  console.log(`mobile: ${mobileMine.length} renders, ${mobileFails.length} fail`);
  console.log(`pages : ${pagesMine.length} pages,   ${pagesFails.length} fail`);
  if (!pagesMine.length) {
    console.error(`\nWARNING: 0 pages matched id "${args.activity}". Is the activity deployed locally + the slug live? (server: ${args.base})`);
  }
  const fail = mobileFails.length > 0 || pagesFails.length > 0 || pagesMine.length === 0;
  if (mobileFails.length) {
    console.error('\nMOBILE FAILS:');
    for (const r of mobileFails) console.error(`  ${r.locale} ${r.slug} @${r.width || '?'}: ${(r.fails || []).join(', ')}`);
  }
  if (pagesFails.length) {
    console.error('\nPAGE FAILS:');
    for (const p of pagesFails) console.error(`  ${p.locale} ${p.slug}: ${(p.failed || [p.error]).join(', ')}`);
  }
  console.log(fail ? '\nRESULT: FAIL — fix before deploy.\n' : '\nRESULT: PASS — all locales clear; ready for the single deploy.\n');
  process.exit(fail ? 1 : 0);
}

main();
