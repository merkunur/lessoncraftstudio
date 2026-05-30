#!/usr/bin/env node
/**
 * publish-wave.js — ONE-COMMAND deck-wave publisher (the standing deck SEO path).
 *
 * Per CLAUDE.md §21 (Content Publishing SEO Standard): when the operator says
 * "publish these decks", the FULL SEO treatment is implied and automatic. This
 * orchestrator runs every step end-to-end so no step is ever forgotten or has to
 * be asked for:
 *
 *   0. PRE-FLIGHT  — §A.14.8 manifest checklist on the staged ZIPs (theme-emit
 *                    detection). Detection-only; HALTS on defect so the operator
 *                    can salvage (rewrite-manifest-theme.js) before anything is
 *                    published. Never auto-mutates ZIPs.
 *   1. PUBLISH     — index.js publish-bulk (its own dry-run pre-flight + the
 *                    §15.16 + §17.8.17 HALT gates run inside; native slug ×11,
 *                    canonical, OG, JSON-LD, alt-text, hashes all emitted here).
 *   2. OG IMAGES   — regenerate-og-images.js (two-column composite + XMP).
 *   3. HREFLANG    — populate-and-inject-hreflang.js (cross-locale sibling block).
 *   4. AUDIT       — audit-deck-html.js (10 invariants) over the wave's locales.
 *
 * RUNS ON HETZNER. Steps 1-4 read DATABASE_URL + /var/www/lcs-media/decks. Invoke
 * with the env loaded, e.g.:
 *   cd /opt/lessoncraftstudio/frontend && set -a && source .env.production && set +a \
 *     && node ../scripts/publish-cli/publish-wave.js <staging-folder> --locales=en,de --confirm
 *
 * Without --confirm every step runs in dry-run/report mode (publishes NOTHING) so
 * you can preview the whole wave. With --confirm it publishes for real.
 *
 * Usage:
 *   node scripts/publish-cli/publish-wave.js <staging-folder> --locales=<csv> [--confirm]
 *        [--decks-root=<path>] [--updates-manifest=<path>] [--batch-id=<id>]
 *        [--skip-preflight] [--skip-audit]
 *
 * Exit 0 only if every executed step succeeds; non-zero (and STOPS) at the first
 * failing step, naming it.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const HERE = __dirname;
const NODE = process.execPath;

function parseArgs(argv) {
  const args = {
    folder: null,
    locales: null,
    confirm: false,
    decksRoot: '/var/www/lcs-media/decks',
    updatesManifest: null,
    batchId: null,
    skipPreflight: false,
    skipAudit: false,
  };
  for (const a of argv.slice(2)) {
    if (a === '--confirm') args.confirm = true;
    else if (a === '--skip-preflight') args.skipPreflight = true;
    else if (a === '--skip-audit') args.skipAudit = true;
    else if (a === '--help' || a === '-h') args.help = true;
    else if (a.startsWith('--locales=')) args.locales = a.slice('--locales='.length).split(',').map((s) => s.trim()).filter(Boolean);
    else if (a.startsWith('--decks-root=')) args.decksRoot = a.slice('--decks-root='.length);
    else if (a.startsWith('--updates-manifest=')) args.updatesManifest = a.slice('--updates-manifest='.length);
    else if (a.startsWith('--batch-id=')) args.batchId = a.slice('--batch-id='.length);
    else if (!a.startsWith('--') && !args.folder) args.folder = a;
    else {
      console.error(`Unknown or misplaced argument: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

function usage() {
  console.log(`publish-wave.js — one-command deck-wave publisher (CLAUDE.md §21)

  node scripts/publish-cli/publish-wave.js <staging-folder> --locales=<csv> [--confirm] [options]

Required:
  <staging-folder>        directory of staged deck .zip files (positional)
  --locales=en,de,...     locales present in this wave (drives og + hreflang + audit)

Options:
  --confirm               publish for real (default: dry-run/report every step)
  --decks-root=<path>     published decks root (default: /var/www/lcs-media/decks)
  --updates-manifest=<p>  UPDATE-mode manifest passed through to publish-bulk
  --batch-id=<id>         batch id passed through to publish-bulk
  --skip-preflight        skip the §A.14.8 manifest pre-flight (NOT recommended)
  --skip-audit            skip the post-publish deck.html audit

Runs on Hetzner with DATABASE_URL + .env.production loaded.`);
}

let STEP = 0;
function banner(label) {
  STEP += 1;
  const line = '═'.repeat(64);
  console.log(`\n${line}\n  STEP ${STEP} — ${label}\n${line}`);
}

/** Run a publish-cli script; inherit stdio; HALT the wave on non-zero exit. */
function runStep(label, scriptName, scriptArgs) {
  banner(label);
  const scriptPath = path.join(HERE, scriptName);
  console.log(`$ node ${scriptName} ${scriptArgs.join(' ')}\n`);
  try {
    execFileSync(NODE, [scriptPath, ...scriptArgs], { stdio: 'inherit', env: process.env });
  } catch (e) {
    const code = e.status != null ? e.status : 1;
    console.error(`\n✖ HALT — step "${label}" failed (exit ${code}). Wave stopped; nothing further ran.`);
    process.exit(code || 1);
  }
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) { usage(); process.exit(0); }

  if (!args.folder) { console.error('ERROR: missing <staging-folder>.\n'); usage(); process.exit(2); }
  if (!fs.existsSync(args.folder)) { console.error(`ERROR: staging folder not found: ${args.folder}`); process.exit(2); }
  if (!args.locales || !args.locales.length) { console.error('ERROR: --locales=<csv> is required.\n'); usage(); process.exit(2); }

  const zipCount = fs.readdirSync(args.folder).filter((f) => f.toLowerCase().endsWith('.zip')).length;
  const localesCsv = args.locales.join(',');
  const mode = args.confirm ? 'CONFIRM (publishing for real)' : 'DRY-RUN (no changes — re-run with --confirm to publish)';

  console.log(`\n┌${'─'.repeat(62)}┐`);
  console.log(`│ publish-wave — ${mode}`);
  console.log(`│ staging : ${args.folder} (${zipCount} .zip)`);
  console.log(`│ locales : ${localesCsv}`);
  console.log(`│ decks   : ${args.decksRoot}`);
  console.log(`└${'─'.repeat(62)}┘`);

  if (!zipCount) { console.error('ERROR: no .zip files in staging folder.'); process.exit(2); }

  // STEP 0 — PRE-FLIGHT: §A.14.8 manifest checklist (detection only; halt on defect).
  // rewrite-manifest-theme.js --dry-run classifies every ZIP and exits non-zero on
  // any halt-class (theme-emit defect). We deliberately do NOT auto-rewrite — the
  // operator salvages, then re-runs the wave.
  if (!args.skipPreflight) {
    runStep('PRE-FLIGHT — manifest theme reconciliation (§A.14.8)', 'rewrite-manifest-theme.js', [args.folder, '--dry-run']);
  } else {
    console.log('\n(skipping pre-flight per --skip-preflight)');
  }

  // STEP 1 — PUBLISH. publish-bulk runs its own dry-run pre-flight + reconciliation
  // HALT gates internally (§15.13, §15.16, §17.8.17). --confirm publishes; otherwise
  // --dry-run previews. Native slug / canonical / OG / JSON-LD / alt-text / hashes
  // are all emitted in this step.
  const publishArgs = [
    'publish-bulk',
    args.folder,
    args.confirm ? '--confirm' : '--dry-run',
  ];
  if (args.updatesManifest) publishArgs.push('--updates-manifest', args.updatesManifest);
  if (args.batchId) publishArgs.push('--batch-id', args.batchId);
  runStep(`PUBLISH — publish-bulk (${args.confirm ? 'confirm' : 'dry-run'})`, 'index.js', publishArgs);

  // The post-publish steps only make sense once decks actually exist on disk/DB.
  if (!args.confirm) {
    console.log(`\n${'─'.repeat(64)}`);
    console.log('DRY-RUN complete. publish-bulk previewed above. Post-publish steps');
    console.log('(og-images, hreflang, audit) are skipped in dry-run because they');
    console.log('operate on already-published decks. Re-run with --confirm to publish');
    console.log('the wave and run the full SEO finalization automatically.');
    process.exit(0);
  }

  // STEP 2 — OG IMAGES (two-column composite + XMP) for the wave's locales.
  runStep('OG IMAGES — regenerate-og-images', 'regenerate-og-images.js', [`--locales=${localesCsv}`, `--decks-root=${args.decksRoot}`]);

  // STEP 3 — HREFLANG cross-locale sibling injection.
  runStep('HREFLANG — populate-and-inject-hreflang', 'populate-and-inject-hreflang.js', ['--confirm', `--locales=${localesCsv}`, `--decks-root=${args.decksRoot}`]);

  // STEP 4 — POST-PUBLISH AUDIT (10 invariants) over the wave's locales.
  if (!args.skipAudit) {
    runStep('AUDIT — audit-deck-html', 'audit-deck-html.js', [`--locales=${localesCsv}`, `--decks-root=${args.decksRoot}`]);
  } else {
    console.log('\n(skipping post-publish audit per --skip-audit)');
  }

  console.log(`\n${'═'.repeat(64)}`);
  console.log('✓ WAVE COMPLETE — decks published with full SEO treatment:');
  console.log('  native slug ×locale · canonical · OG (14 tags + composite image)');
  console.log('  · LearningResource+ImageObject JSON-LD · alt-text · cross-locale');
  console.log('  hreflang · sitemap (auto via ID-parity shard) · audited.');
  console.log(`${'═'.repeat(64)}\n`);
  console.log('Next: spot-check a few live deck URLs (curl 200 + grep <title>/og:image),');
  console.log('and remember Cloudflare 5-min TTL before edge reflects new bytes.');
}

main();
