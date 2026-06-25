#!/usr/bin/env node
/*
 * check-deck-url-drift.js — FAST (DB-only, no filesystem) recurrence guard for the
 * deck URL-column drift fixed in the 2026-06-25 SEO recovery.
 *
 * Counts published decks whose stored URL columns (pdf_url / answer_key_url /
 * thumbnail_url / html_url / manifest_url) do NOT embed `/decks/<slug>/` or the
 * canonical `<slug>-printable.pdf` / `<slug>-answer-key.pdf` filename. This is the
 * exact predicate the one-shot Part-1 aggregate used, as a recurring gate.
 *
 * IMPORTANT: live deck-card/landing links are SLUG-DERIVED (canonicalDeckAssets /
 * deckAssets), so any drift reported here is AT-REST ONLY — it does not break live
 * links. It signals a re-slug op (salvage-*.js / migrate-native-mode-slugs.js)
 * that forgot to canonicalize the columns; fix with:
 *   node scripts/publish-cli/fix-deck-url-columns.js --locales=<loc> --apply
 *
 * WARN-ONLY by design: always exits 0 (wired non-blocking into deploy.sh). The
 * slow, FS+manifest deep auditor is scripts/publish-cli/audit-slug-fs-db-consistency.js.
 *
 * Usage (Hetzner, env loaded):
 *   cd frontend && set -a && source .env.production && set +a && cd ..
 *   node scripts/publish-cli/check-deck-url-drift.js
 */
'use strict';

var db = require('./db');

async function main() {
  var p = db.client();
  // Path/filename predicate is host-agnostic (LIKE '%/<slug>/…') so apex-vs-www
  // host differences never false-flag. Postgres `count(*) FILTER (...)`.
  var rows = await p.$queryRawUnsafe(
    "SELECT language," +
    " count(*)::int AS total," +
    " count(*) FILTER (WHERE pdf_url IS NULL OR pdf_url NOT LIKE '%/' || slug || '-printable.pdf')::int AS pdf_drift," +
    " count(*) FILTER (WHERE answer_key_url IS NOT NULL AND answer_key_url NOT LIKE '%/' || slug || '-answer-key.pdf')::int AS ak_drift," +
    " count(*) FILTER (WHERE thumbnail_url IS NULL OR thumbnail_url NOT LIKE '%/' || slug || '/thumbnail.png')::int AS thumb_drift," +
    " count(*) FILTER (WHERE html_url IS NULL OR html_url NOT LIKE '%/' || slug || '/deck.html')::int AS html_drift," +
    " count(*) FILTER (WHERE manifest_url IS NULL OR manifest_url NOT LIKE '%/' || slug || '/manifest.json')::int AS manifest_drift" +
    " FROM decks WHERE status='published' GROUP BY language ORDER BY language"
  );

  var grand = 0;
  var lines = [];
  rows.forEach(function (r) {
    var d = r.pdf_drift + r.ak_drift + r.thumb_drift + r.html_drift + r.manifest_drift;
    grand += d;
    if (d > 0) {
      lines.push('  [' + r.language + '] drift=' + d +
        ' (pdf=' + r.pdf_drift + ' ak=' + r.ak_drift + ' thumb=' + r.thumb_drift +
        ' html=' + r.html_drift + ' manifest=' + r.manifest_drift + ') / ' + r.total + ' published');
    }
  });

  console.log('=== deck URL-column drift (DB-only; at-rest — live links are slug-derived) ===');
  if (grand === 0) {
    console.log('  OK — 0 drift across all locales.');
  } else {
    lines.forEach(function (l) { console.log(l); });
    console.log('  WARN: ' + grand + ' drifted column(s). Live links are unaffected (slug-derived), but run:');
    console.log('        node scripts/publish-cli/fix-deck-url-columns.js --locales=<loc> --apply');
  }

  await db.disconnect();
  process.exit(0); // WARN-only — never block a deploy.
}

main().catch(function (e) {
  console.error('check-deck-url-drift: ' + e.message);
  process.exit(0); // never block a deploy, even on error
});
