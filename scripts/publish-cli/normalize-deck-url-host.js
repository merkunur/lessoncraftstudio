#!/usr/bin/env node
/* =====================================================================
   normalize-deck-url-host.js — apex → www on the deck URL columns.
   ---------------------------------------------------------------------
   WHY. `publish.js` defined `CANONICAL_URL_BASE = 'https://lessoncraftstudio.com'`
   (apex) while every other publish-cli module used www. It fed the DB URL columns,
   so every deck published on that path stored apex URLs. The literal was fixed on
   2026-07-31, which stops NEW rows — but the existing ones stay wrong.

   Measured on production the same day (all five columns, same row set):
       apex_thumb 1842 | apex_html 1842 | apex_pdf 1842 | apex_ak 1842 | apex_manifest 1842
   (1,504 of those rows are `published`.)

   Apex 301s to www, so nothing is broken — but these are at-rest values that other
   code copies verbatim. The deck-end suggestion strip did exactly that until it was
   taught to normalize at read time; the next consumer might not.

   WHY NOT `fix-deck-url-columns.js`. That script is documented HOST-PRESERVING by
   design ("apex stays apex, www stays www") — it repairs the PATH after a re-slug
   and deliberately will not touch the host. It cannot do this job.

   SAFETY. Only rewrites the exact prefix `https://lessoncraftstudio.com/` →
   `https://www.lessoncraftstudio.com/`. Paths are untouched, so this cannot
   interact with slug drift. Idempotent: a second run finds 0 rows. Dry-run by
   default; `--apply` to write.

   Usage (on Hetzner, env loaded):
     node scripts/publish-cli/normalize-deck-url-host.js
     node scripts/publish-cli/normalize-deck-url-host.js --apply
   ===================================================================== */
'use strict';

var db = require('./db');

var APEX = 'https://lessoncraftstudio.com/';
var WWW = 'https://www.lessoncraftstudio.com/';
var COLUMNS = ['thumbnailUrl', 'htmlUrl', 'pdfUrl', 'answerKeyUrl', 'manifestUrl'];

var APPLY = process.argv.indexOf('--apply') !== -1;

function fix(v) {
  if (typeof v !== 'string' || v.indexOf(APEX) !== 0) return null;
  return WWW + v.slice(APEX.length);
}

async function main() {
  var p = db.client();

  var rows = await p.deck.findMany({
    where: {
      OR: COLUMNS.map(function (c) {
        var w = {};
        w[c] = { startsWith: APEX };
        return w;
      }),
    },
    select: {
      id: true, slug: true, language: true, status: true,
      thumbnailUrl: true, htmlUrl: true, pdfUrl: true, answerKeyUrl: true, manifestUrl: true,
    },
  });

  console.log('mode: ' + (APPLY ? 'APPLY' : 'DRY-RUN'));
  console.log('rows with at least one apex URL column: ' + rows.length);
  if (!rows.length) {
    console.log('nothing to do — already normalized.');
    await db.disconnect();
    return;
  }

  var perColumn = {};
  COLUMNS.forEach(function (c) { perColumn[c] = 0; });
  var byStatus = {};
  var changed = 0;

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var data = {};
    COLUMNS.forEach(function (c) {
      var next = fix(row[c]);
      if (next) { data[c] = next; perColumn[c]++; }
    });
    if (!Object.keys(data).length) continue;
    byStatus[row.status] = (byStatus[row.status] || 0) + 1;
    changed++;
    if (i < 3) {
      console.log('  e.g. ' + row.language + '/' + row.slug + ' [' + row.status + ']');
      console.log('       ' + row.thumbnailUrl + '\n    -> ' + (data.thumbnailUrl || '(unchanged)'));
    }
    if (APPLY) await p.deck.update({ where: { id: row.id }, data: data });
  }

  console.log('');
  console.log('rows ' + (APPLY ? 'updated' : 'that would be updated') + ': ' + changed);
  console.log('by status: ' + JSON.stringify(byStatus));
  console.log('per column: ' + JSON.stringify(perColumn));
  if (!APPLY) console.log('\nre-run with --apply to write.');

  await db.disconnect();
}

main().catch(function (e) {
  console.error('FATAL: ' + e.message);
  process.exit(1);
});
