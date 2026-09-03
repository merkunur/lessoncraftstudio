#!/usr/bin/env node
/* =====================================================================
   audit-worksheet-formats.js — the ratchet under
   frontend/config/interactive-exercise-types.ts
   ---------------------------------------------------------------------
   That file claims which worksheet types run in a browser. It is a
   committed constant because two of its three consumers cannot reach a
   database (the deploy-time static landing renderer, and a route that
   deliberately runs no Prisma query). A committed constant with no gate
   is a guess with a version number, so this script re-derives the claim
   from production and fails when it drifts.

   THE RECONCILIATION
   ------------------
   Two independent signals must agree on every published deck:
     (1) exerciseType is in INTERACTIVE_EXERCISE_TYPES  — the app list;
     (2) answerKeyUrl IS NOT NULL                        — the DB column.
   Signal (2) is trustworthy because scripts/publish-cli/bundle.js:71
   makes answer_key_pdf a HARD requirement for every non-printable
   manifest, so an interactive publish cannot produce a NULL, and
   fix-deck-url-columns.js:118 preserves the NULL-ness across re-slugs.

   Measured 2026-09-03 over 44,981 published monolingual decks: 95 types,
   30 all-have / 65 none-have / **0 mixed**.

   ⚠ A MIXED TYPE IS THE INTERESTING FAILURE. It means the type-level
   claim is no longer expressible — some sheets of that generator ship an
   answer key and some do not — and the constant must become a per-deck
   lookup rather than being edited to "fix" the count.

   NON-VACUITY IS ASSERTED FIRST: a query that returns nothing would
   satisfy every comparison below, so the row count and the type count are
   checked against floors before anything else is compared.

   Run (on the server, or anywhere DATABASE_URL resolves):
     node scripts/audit-worksheet-formats.js
     node scripts/audit-worksheet-formats.js --json
   ===================================================================== */
'use strict';

const path = require('path');
const fs = require('fs');

const REPO = path.resolve(__dirname, '..');
const CONFIG = path.join(REPO, 'frontend', 'config', 'interactive-exercise-types.ts');

const argv = process.argv.slice(2);
const JSON_OUT = argv.includes('--json');

/* Floors below which the audit is vacuous rather than passing. The catalogue
   has ~45k decks and 95 types; anything near zero means the query, the env or
   the filter is wrong, not that the catalogue shrank. */
const MIN_DECKS = 10000;
const MIN_TYPES = 50;

// The SAME reader the static landing renderer uses, so the audit cannot pass
// against a set the renderer does not actually see. Its own non-vacuity guard
// throws on a broken parse rather than returning an empty set.
const { interactiveTypes: readCommittedSet } = require(path.join(REPO, 'scripts', 'lib', 'interactive-types.js'));

async function main() {
  const { PrismaClient } = require(path.join(REPO, 'frontend', 'node_modules', '@prisma', 'client'));
  const prisma = new PrismaClient();
  const problems = [];
  try {
    const where = { status: 'published', contentLanguage: null };
    const [total, all, withAk] = await Promise.all([
      prisma.deck.count({ where }),
      prisma.deck.groupBy({ by: ['exerciseType'], where, _count: { _all: true } }),
      prisma.deck.groupBy({
        by: ['exerciseType'],
        where: { ...where, answerKeyUrl: { not: null } },
        _count: { _all: true },
      }),
    ]);

    // ---- non-vacuity first ----
    if (total < MIN_DECKS) problems.push(`only ${total} published decks (floor ${MIN_DECKS}) — the query or the env is wrong`);
    if (all.length < MIN_TYPES) problems.push(`only ${all.length} exercise types (floor ${MIN_TYPES}) — the query is wrong`);

    const akByType = new Map(withAk.map((r) => [r.exerciseType, r._count._all]));
    const rows = all.map((r) => ({
      type: r.exerciseType,
      n: r._count._all,
      ak: akByType.get(r.exerciseType) || 0,
    }));

    const mixed = rows.filter((r) => r.ak > 0 && r.ak < r.n);
    const dbInteractive = new Set(rows.filter((r) => r.ak === r.n).map((r) => r.type));
    const dbPrintOnly = rows.filter((r) => r.ak === 0);

    // ---- the load-bearing assertion ----
    if (mixed.length > 0) {
      problems.push(
        `${mixed.length} MIXED type(s) — interactivity is no longer a type-level property, so the ` +
        `committed constant must become a per-deck lookup (do NOT just edit the set): ` +
        mixed.map((m) => `${m.type} ${m.ak}/${m.n}`).join(', ')
      );
    }

    // ---- the committed set must equal the database's answer ----
    const committed = readCommittedSet();
    // picture-path / picture-trail are the same app under two locale axis keys;
    // a locale may legitimately have published under only one of them, so a
    // committed key with no decks at all is a warning, not a failure.
    const missingFromConfig = [...dbInteractive].filter((t) => !committed.has(t));
    const staleInConfig = [...committed].filter((t) => !dbInteractive.has(t));
    const stalePublished = staleInConfig.filter((t) => rows.some((r) => r.type === t));

    if (missingFromConfig.length) {
      problems.push(
        `${missingFromConfig.length} interactive type(s) in the DB are NOT in the committed set — they ` +
        `would render as "PDF only" and lose their Play button: ${missingFromConfig.sort().join(', ')}`
      );
    }
    if (stalePublished.length) {
      problems.push(
        `${stalePublished.length} committed type(s) have published decks with NO answer key — they would ` +
        `render a Play button onto a static page: ${stalePublished.sort().join(', ')}`
      );
    }

    const unpublished = staleInConfig.filter((t) => !rows.some((r) => r.type === t));

    const report = {
      decks: total,
      types: rows.length,
      interactiveTypes: dbInteractive.size,
      printOnlyTypes: dbPrintOnly.length,
      printOnlyDecks: dbPrintOnly.reduce((a, b) => a + b.n, 0),
      mixed: mixed.length,
      committed: committed.size,
      unpublishedCommitted: unpublished.sort(),
      problems,
    };

    if (JSON_OUT) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      console.log('worksheet-format reconciliation');
      console.log(`  published monolingual decks : ${report.decks}`);
      console.log(`  exercise types              : ${report.types}`);
      console.log(`  interactive (all have AK)   : ${report.interactiveTypes}`);
      console.log(`  print-only  (none have AK)  : ${report.printOnlyTypes}  (${report.printOnlyDecks} decks)`);
      console.log(`  MIXED                       : ${report.mixed}`);
      console.log(`  committed set               : ${report.committed}`);
      if (unpublished.length) {
        console.log(`  committed but unpublished   : ${unpublished.join(', ')}  (locale-conditional axis keys — fine)`);
      }
      if (problems.length) {
        console.log('\nFAIL');
        problems.forEach((p) => console.log('  ✗ ' + p));
      } else {
        console.log('\nPASS — both signals agree on every published deck.');
      }
    }
    await prisma.$disconnect();
    process.exit(problems.length ? 1 : 0);
  } catch (e) {
    await prisma.$disconnect().catch(() => {});
    console.error('audit-worksheet-formats: ' + e.message);
    process.exit(1);
  }
}

main();
