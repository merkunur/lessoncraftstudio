#!/usr/bin/env node
/**
 * b6-prepare-upload.js <locale> [--check]
 *
 * nt5-F (b6) Phase I, PC side — ONE command per locale that builds the publish-ready ZIPs and pools them into
 * the folder the upload step copies to Hetzner:
 *
 *   1. regenerate the locale's two waves (gen-b6-waves.js --locales=<loc>)
 *   2. clear out/staging/wave-b6-<loc> and out/staging/wave-b6var-<loc> — cli.js SKIPS a ZIP that already exists,
 *      so a stale ZIP from before a fix round would otherwise ship (nt10-E memory: "clear staging before regenerating")
 *   3. cli.js generate for both waves (each deck passes the render QA gate or is not written)
 *   4. pool every ZIP into out/upload/wave-b6-<loc>-all/ (emptied first)
 *   5. check: the pooled count equals the locale's SHIPPED face count in docs/worksheet-gen/b6-designs/
 *      hub-expectations.json, no generation failures — otherwise exit 2 and say what is wrong
 *
 * --check skips 1-4 and only re-checks an existing pool.
 * Prints the one-line summary a non-technical operator pastes back: "READY <loc>: N/N ZIPs in <dir>".
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const loc = process.argv[2];
const checkOnly = process.argv.includes('--check');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
if (!LOCALES.includes(loc)) { console.error('usage: node scripts/worksheet-gen/tools/b6-prepare-upload.js <' + LOCALES.join('|') + '> [--check]'); process.exit(2); }

const HUB = path.join(ROOT, '..', '..', 'docs', 'worksheet-gen', 'b6-designs', 'hub-expectations.json');
const hub = JSON.parse(fs.readFileSync(HUB, 'utf8'));
/** the locale's expected shipped deck count, summed over the five family keys (the hub gate's own numbers) */
function expectedCount() {
  let n = 0;
  for (const per of Object.values(hub.keys || {})) if (typeof per[loc] === 'number') n += per[loc];
  return n;
}

const node = (args) => execFileSync(process.execPath, args, { cwd: ROOT, stdio: 'inherit' });
const waves = ['b6', 'b6var'].map((k) => ({ k, file: path.join('waves', `wave-${k}-${loc}.json`) }));
const upload = path.join(ROOT, 'out', 'upload', `wave-b6-${loc}-all`);

if (!checkOnly) {
  console.log(`== 1. waves for ${loc}`);
  node([path.join('tools', 'gen-b6-waves.js'), `--locales=${loc}`]);
  for (const w of waves) {
    const id = JSON.parse(fs.readFileSync(path.join(ROOT, w.file), 'utf8')).id;
    const stage = path.join(ROOT, 'out', 'staging', id);
    console.log(`== 2. clearing ${path.relative(ROOT, stage)}`);
    fs.rmSync(stage, { recursive: true, force: true });
    console.log(`== 3. generating ${w.file}`);
    node(['cli.js', 'generate', '--wave', w.file]);
  }
  console.log(`== 4. pooling into ${path.relative(ROOT, upload)}`);
  fs.rmSync(upload, { recursive: true, force: true });
  fs.mkdirSync(upload, { recursive: true });
  for (const w of waves) {
    const id = JSON.parse(fs.readFileSync(path.join(ROOT, w.file), 'utf8')).id;
    const stage = path.join(ROOT, 'out', 'staging', id);
    for (const f of fs.readdirSync(stage).filter((x) => x.endsWith('.zip'))) fs.copyFileSync(path.join(stage, f), path.join(upload, f));
  }
}

// 5. check
const problems = [];
for (const w of waves) {
  const id = JSON.parse(fs.readFileSync(path.join(ROOT, w.file), 'utf8')).id;
  const st = path.join(ROOT, 'out', 'staging', id, '_state.json');
  if (!fs.existsSync(st)) { problems.push(`no ${path.relative(ROOT, st)} (the wave was not generated)`); continue; }
  const state = JSON.parse(fs.readFileSync(st, 'utf8'));
  const failed = state.failed || [];
  if (failed.length) problems.push(`${id}: ${failed.length} deck(s) FAILED generation: ${failed.slice(0, 5).map((f) => f.deckId + ' (' + String(f.error || (f.qa || []).join('; ')).slice(0, 120) + ')').join(' | ')}`);
}
const zips = fs.existsSync(upload) ? fs.readdirSync(upload).filter((x) => x.endsWith('.zip')) : [];
const want = expectedCount();
if (!want) problems.push(`could not read ${loc}'s expected count from ${path.relative(ROOT, HUB)}`);
else if (zips.length !== want) problems.push(`${zips.length} ZIPs pooled but ${want} expected for ${loc}`);
if (problems.length) {
  console.log(`\nNOT READY ${loc}:`);
  problems.forEach((p) => console.log('  - ' + p));
  process.exit(2);
}
console.log(`\nREADY ${loc}: ${zips.length}/${want} ZIPs in ${path.relative(path.join(ROOT, '..', '..'), upload)}`);
