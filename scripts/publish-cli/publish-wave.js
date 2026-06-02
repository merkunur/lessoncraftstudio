#!/usr/bin/env node
/**
 * publish-wave.js — ONE-COMMAND deck-wave publisher (the standing deck SEO path).
 *
 * Per CLAUDE.md §21 (Content Publishing SEO Standard): when the operator says
 * "publish these decks", the FULL SEO treatment is implied and automatic. This
 * orchestrator runs every step end-to-end so no step is ever forgotten or has to
 * be asked for. The flow is one-command even for wordy non-EN waves:
 *
 *   0. PRE-FLIGHT  — §A.14.8 manifest theme reconciliation on the staged ZIPs
 *                    (rewrite-manifest-theme.js --dry-run --themeless-ok
 *                    --fail-on-rewrite). Detection-only; never auto-mutates.
 *                    Legitimately-themeless decks (cryptogram) pass via
 *                    --themeless-ok; recoverable theme-emit defects HALT (operator
 *                    salvages, then re-runs) since PREBAND rebuilds SEO from the
 *                    manifest theme.
 *   1. PREBAND     — preband-staged-descriptions.js. Pre-publish re-band of the
 *                    SEO <head>: descriptions to the 120-170 band (wordy locales
 *                    overflow publish-bulk's 170-char HALT) + variant_id title
 *                    disambiguation. Mutates the staged ZIPs (makes a backup);
 *                    runs --dry-run in preview mode.
 *   2. PUBLISH     — index.js publish-bulk (its own dry-run pre-flight + the
 *                    §15.16 + §17.8.17 HALT gates run inside; native slug ×11,
 *                    canonical, OG, JSON-LD, hashes all emitted here).
 *   3. OG IMAGES   — regenerate-og-images.js (two-column composite + XMP).
 *   4. ALT-TEXT    — rewrite-deck-html-alt-text.js (worksheet alt + app aria-label
 *                    + deckend-thumb alts; the apps emit empty alt). Idempotent.
 *   4b. IMG-DIMS   — rewrite-deck-html-img-dimensions.js. Injects intrinsic
 *                    width/height on the worksheet <img> (decoded from the inline
 *                    JPEG) so non-square decks don't shift on load (mobile CLS).
 *                    Idempotent; runs AFTER alt-text (shares the same img tag).
 *   4c. LAZY-DECKEND — rewrite-deck-html-lazy-deckend.js. Lazy-loads the 6 below-fold
 *                    suggestion thumbnails (~900KB eager → deferred) — the fix that
 *                    takes deck mobile to ≥85 — and keeps the Fredoka font
 *                    render-blocking (reverts an earlier async build that caused
 *                    font-swap CLS). Zero quality loss; idempotent.
 *   5. END-LINKS   — inject-deck-end-topic-links.js per wave locale. Backfills the
 *                    localized end-of-deck "Want more?" topic-links aside on any deck
 *                    missing it (idempotent) so every deck carries per-locale internal
 *                    links opening that language's pages (§16.5 / §17.8.2).
 *   6. EMBED-HIDE  — inject-embed-hide-style.js per wave locale. Injects the
 *                    body.lcs-embedded hide rule so the in-deck internal link sections
 *                    do NOT render inside an embed iframe (idempotent).
 *   7. HREFLANG    — populate-and-inject-hreflang.js across the FULL 11-locale set
 *                    (cross-locale sibling blocks need every locale, not just the
 *                    wave's). Runs AFTER embed-hide so the hreflang block stays last
 *                    in <head> per §17.8.1.5.
 *   8. AUDIT       — audit-deck-html.js (invariants) over the wave's locales.
 *
 * RUNS ON HETZNER. Steps 2-6 read DATABASE_URL + /var/www/lcs-media/decks; STEP 1
 * reads DATABASE_URL too (existing-title collision check; skip with --no-db-check).
 * Invoke with the env loaded, e.g.:
 *   cd /opt/lessoncraftstudio/frontend && set -a && source .env.production && set +a \
 *     && node ../scripts/publish-cli/publish-wave.js <staging-folder> --locales=fr --confirm
 *
 * Without --confirm every step runs in dry-run/report mode (publishes NOTHING and
 * mutates NOTHING — PREBAND previews) so you can preview the whole wave. With
 * --confirm it publishes for real.
 *
 * Usage:
 *   node scripts/publish-cli/publish-wave.js <staging-folder> --locales=<csv> [--confirm]
 *        [--decks-root=<path>] [--updates-manifest=<path>] [--batch-id=<id>]
 *        [--skip-preflight] [--skip-preband] [--skip-alt-text] [--skip-audit]
 *        [--no-db-check]
 *
 * Exit 0 only if every executed step succeeds; non-zero (and STOPS) at the first
 * failing step, naming it.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const HERE = __dirname;
const NODE = process.execPath;

// Cross-locale hreflang siblings need the FULL published-locale set, not just
// the wave's locales — passing only the wave locale makes STEP 5 a no-op for
// cross-locale linking. The canonical 11 per §6.
const HREFLANG_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

function parseArgs(argv) {
  const args = {
    folder: null,
    locales: null,
    confirm: false,
    decksRoot: '/var/www/lcs-media/decks',
    updatesManifest: null,
    batchId: null,
    skipPreflight: false,
    skipPreband: false,
    skipAltText: false,
    skipAudit: false,
    noDbCheck: false,
  };
  for (const a of argv.slice(2)) {
    if (a === '--confirm') args.confirm = true;
    else if (a === '--skip-preflight') args.skipPreflight = true;
    else if (a === '--skip-preband') args.skipPreband = true;
    else if (a === '--skip-alt-text') args.skipAltText = true;
    else if (a === '--skip-img-dims') args.skipImgDims = true;
    else if (a === '--skip-lazy-deckend') args.skipLazyDeckend = true;
    else if (a === '--skip-audit') args.skipAudit = true;
    else if (a === '--no-db-check') args.noDbCheck = true;
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
  --skip-preband          skip the pre-publish SEO re-band (NOT recommended for non-EN)
  --skip-alt-text         skip the post-publish alt-text retrofit (NOT recommended)
  --skip-img-dims         skip the worksheet-img width/height retrofit (NOT recommended; mobile CLS)
  --skip-lazy-deckend     skip the deckend-thumb lazy-load + font-async retrofit (NOT recommended; mobile LCP)
  --skip-audit            skip the post-publish deck.html audit
  --no-db-check           pass through to PREBAND (skip existing-title collision check)

Runs on Hetzner with DATABASE_URL + .env.production loaded.
hreflang (STEP 5) always uses the full 11-locale set regardless of --locales.`);
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

  // STEP 0 — PRE-FLIGHT: §A.14.8 manifest theme reconciliation (detection only;
  // never auto-mutates). --themeless-ok waves legitimately-themeless decks
  // (cryptogram) through; --fail-on-rewrite halts on recoverable theme-emit
  // defects so the operator salvages BEFORE PREBAND (which rebuilds SEO from the
  // manifest theme). halt-ambiguous / halt-seometa / corruption still halt.
  if (!args.skipPreflight) {
    runStep('PRE-FLIGHT — manifest theme reconciliation (§A.14.8)', 'rewrite-manifest-theme.js', [args.folder, '--dry-run', '--themeless-ok', '--fail-on-rewrite']);
  } else {
    console.log('\n(skipping pre-flight per --skip-preflight)');
  }

  // STEP 1 — PREBAND: pre-publish SEO <head> re-band on the staged ZIPs. Bands
  // descriptions into 120-170 (wordy locales overflow publish-bulk's 170-char
  // HALT) + disambiguates colliding titles via variant_id, preserving the
  // __CANONICAL_URL__ placeholder. In --confirm it MUTATES the ZIPs (makes a
  // .preband-backup, idempotent); in dry-run it previews only (no mutation).
  if (!args.skipPreband) {
    const prebandArgs = [args.folder];
    if (!args.confirm) prebandArgs.push('--dry-run');
    if (args.noDbCheck) prebandArgs.push('--no-db-check');
    runStep(`PREBAND — preband-staged-descriptions (${args.confirm ? 'apply' : 'dry-run'})`, 'preband-staged-descriptions.js', prebandArgs);
  } else {
    console.log('\n(skipping pre-publish SEO re-band per --skip-preband)');
  }

  // STEP 2 — PUBLISH. publish-bulk runs its own dry-run pre-flight + reconciliation
  // HALT gates internally (§15.13, §15.16, §17.8.17). --confirm publishes; otherwise
  // --dry-run previews. Native slug / canonical / OG / JSON-LD / hashes emitted here.
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
    console.log('DRY-RUN complete. NOTE: STEP 1 PREBAND ran in preview mode (it did NOT');
    console.log('mutate the staged ZIPs), so publish-bulk above operated on UN-prebanded');
    console.log('ZIPs — any DESCRIPTION_LENGTH_TOO_LONG / TITLE_NON_UNIQUE errors it');
    console.log('reported are EXPECTED and are auto-fixed by PREBAND under --confirm.');
    console.log('Post-publish steps (og-images, alt-text, end-links, embed-hide, hreflang,');
    console.log('audit) are skipped in dry-run. Re-run with --confirm to publish + run the');
    console.log('full SEO finalization.');
    process.exit(0);
  }

  // STEP 3 — OG IMAGES (two-column composite + XMP) for the wave's locales.
  runStep('OG IMAGES — regenerate-og-images', 'regenerate-og-images.js', [`--locales=${localesCsv}`, `--decks-root=${args.decksRoot}`]);

  // STEP 4 — ALT-TEXT retrofit (worksheet alt + app aria-label + deckend-thumb
  // alts). The apps emit empty body alt; this fills it. Idempotent; preserves an
  // already-injected hreflang block (STEP 5 runs after, so no conflict).
  if (!args.skipAltText) {
    runStep('ALT-TEXT — rewrite-deck-html-alt-text', 'rewrite-deck-html-alt-text.js', ['--confirm', `--locales=${localesCsv}`, `--decks-root=${args.decksRoot}`]);
  } else {
    console.log('\n(skipping alt-text retrofit per --skip-alt-text)');
  }

  // STEP 4b — IMG-DIMS: inject intrinsic width/height on the worksheet <img> so
  // non-square decks don't shift on load (mobile CLS — measured deck-A 0.313→0.008).
  // Decodes the inline JPEG SOF marker; purely additive; idempotent. MUST run AFTER
  // alt-text: alt-text's regex matches the same img tag by class+id+alt, and running
  // img-dims first would insert width/height between id and alt and break that match.
  // Per page-speed audit 2026-06.
  if (!args.skipImgDims) {
    runStep('IMG-DIMS — rewrite-deck-html-img-dimensions', 'rewrite-deck-html-img-dimensions.js', ['--confirm', `--locales=${localesCsv}`, `--decks-root=${args.decksRoot}`]);
  } else {
    console.log('\n(skipping img-dims retrofit per --skip-img-dims)');
  }

  // STEP 4c — LAZY-DECKEND: four zero-quality-loss deck mobile-perf tweaks that take
  // deck mobile from ~70 to ~95+ (page-speed audit 2026-06): R1 lazy-loads the 6
  // below-fold suggestion thumbnails (~900KB, ~83% of a deck's mobile bytes — LCP);
  // R2 makes the Fredoka font non-render-blocking (FCP ~3.2s→~1.6s); R3 un-hides the
  // suggestions section (its hidden→shown load transition shifted layout — CLS); R4
  // sets .lcs-bar to flex-wrap:nowrap (it wrapped to 2 lines and shoved the worksheet
  // down ~52px — CLS, AND this is what makes R2's async font CLS-safe). Idempotent,
  // visually neutral. Runs after alt-text/img-dims and before hreflang (hreflang must
  // stay last in <head>; this touches the font <link>/bar CSS mid-head + the deckend
  // <img>/section in <body>).
  if (!args.skipLazyDeckend) {
    runStep('LAZY-DECKEND — rewrite-deck-html-lazy-deckend', 'rewrite-deck-html-lazy-deckend.js', ['--confirm', `--locales=${localesCsv}`, `--decks-root=${args.decksRoot}`]);
  } else {
    console.log('\n(skipping lazy-deckend retrofit per --skip-lazy-deckend)');
  }

  // END-LINKS: backfill the localized end-of-deck "Want more?" topic-links
  // aside on any deck missing it. Per-locale (the script takes a single --locale);
  // idempotent — decks that already baked the aside (autoInjectEndDeckLinks +
  // substitute.js) are skipped fast. Guarantees per-locale internal links on every
  // deck, every wave (the operator's "always apply it" standing rule). Runs BEFORE
  // hreflang so the hreflang block stays last in <head>.
  for (const loc of args.locales) {
    runStep(`END-LINKS — inject-deck-end-topic-links (${loc})`, 'inject-deck-end-topic-links.js', [`--locale=${loc}`]);
  }

  // STEP 6 — EMBED-HIDE: hide the in-deck internal link sections (end-deck links +
  // suggestion reel) when the deck loads inside an embed iframe. Per-locale;
  // idempotent (marker-guarded); inserts at the top of <head>.
  for (const loc of args.locales) {
    runStep(`EMBED-HIDE — inject-embed-hide-style (${loc})`, 'inject-embed-hide-style.js', [`--locale=${loc}`]);
  }

  // STEP 7 — HREFLANG cross-locale sibling injection. ALWAYS the full 11-locale
  // set (siblings span every locale; passing only the wave locale is a no-op).
  runStep('HREFLANG — populate-and-inject-hreflang (all 11 locales)', 'populate-and-inject-hreflang.js', ['--confirm', `--locales=${HREFLANG_LOCALES.join(',')}`, `--decks-root=${args.decksRoot}`]);

  // STEP 8 — POST-PUBLISH AUDIT over the wave's locales.
  if (!args.skipAudit) {
    runStep('AUDIT — audit-deck-html', 'audit-deck-html.js', [`--locales=${localesCsv}`, `--decks-root=${args.decksRoot}`]);
  } else {
    console.log('\n(skipping post-publish audit per --skip-audit)');
  }

  console.log(`\n${'═'.repeat(64)}`);
  console.log('✓ WAVE COMPLETE — decks published with full SEO treatment:');
  console.log('  native slug ×locale · canonical · banded description · disambiguated');
  console.log('  title · OG (14 tags + composite image) · LearningResource+ImageObject');
  console.log('  JSON-LD · rich alt-text · per-locale end-deck topic links · embed-hide');
  console.log('  · cross-locale hreflang · sitemap (auto via ID-parity shard) · audited.');
  console.log(`${'═'.repeat(64)}\n`);
  console.log('Next: spot-check a few live deck URLs (curl 200 + grep <title>/og:image),');
  console.log('and remember Cloudflare 5-min TTL before edge reflects new bytes.');
}

main();
