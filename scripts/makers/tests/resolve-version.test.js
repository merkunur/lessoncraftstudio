#!/usr/bin/env node
/**
 * Tests for shell/resolve-version.js (re-route after a content fix) and lib/versions.js (the ledger).
 *   node scripts/makers/tests/resolve-version.test.js        exit 1 on any failure
 * Poison both ways: every "re-routes" case has a twin that must NOT re-route.
 */
'use strict';
const path = require('path');
const { pathToFileURL } = require('url');
const { appendHistory } = require('../lib/versions.js');

let pass = 0; const fails = [];
const eq = (name, got, want) => { const g = JSON.stringify(got), w = JSON.stringify(want); if (g === w) pass++; else fails.push(`${name}\n   got  ${g}\n   want ${w}`); };

(async () => {
  const { resolveVersion } = await import(pathToFileURL(path.join(__dirname, '..', 'shell', 'resolve-version.js')).href);

  const versions = { current: 'h3', currentData: 'd3', history: [
    { n: 1, hash: 'h1', data: 'd1', at: 't1' }, { n: 2, hash: 'h2', data: 'd2', at: 't2' }, { n: 3, hash: 'h3', data: 'd3', at: 't3' }] };
  const recipe = (v, d, tpls) => ({ maker: 'counting', makerVersion: v, dataVersion: d, pages: tpls.map((template) => ({ template })) });
  const fix = (at, templates, kind = 'content-fix', date = '2026-11-20', note = 'n') => ({ at, templates, kind, note, date });
  const run = (r, migrations) => resolveVersion({ recipe: r, versions, migrations, current: 'h3' });
  const pinned = (v, d) => ({ makerVersion: v, dataVersion: d, rerouted: false, fixes: [] });

  // a content fix on a page's template re-routes …
  eq('content fix on page template re-routes', run(recipe('h1', 'd1', ['K-002', 'K-006']), [fix('h2', ['K-002'])]),
    { makerVersion: 'h3', dataVersion: 'd3', rerouted: true, fixes: [{ date: '2026-11-20', note: 'n', templates: ['K-002'] }] });
  // … a content fix on ANOTHER template does not
  eq('content fix on other template stays', run(recipe('h1', 'd1', ['K-006']), [fix('h2', ['K-002'])]), pinned('h1', 'd1'));
  // polish never re-routes (same template, same position)
  eq('polish stays', run(recipe('h1', 'd1', ['K-002']), [fix('h2', ['K-002'], 'polish')]), pinned('h1', 'd1'));
  // a fix recorded AT the recipe's version stays; BEFORE it stays; AFTER it moves
  eq('fix at the pinned version stays', run(recipe('h2', 'd2', ['K-002']), [fix('h2', ['K-002'])]), pinned('h2', 'd2'));
  eq('fix before the pinned version stays', run(recipe('h3', 'd3', ['K-002']), [fix('h2', ['K-002'])]), pinned('h3', 'd3'));
  eq('fix after the pinned version moves', run(recipe('h2', 'd2', ['K-002']), [fix('h3', ['K-002'])]).rerouted, true);
  // unknown version → current, no banner
  eq('unknown version loads current', run(recipe('hX', 'dX', ['K-002']), []), { makerVersion: 'h3', dataVersion: 'd3', rerouted: true, fixes: [] });
  eq('known hash, unknown data → current', run(recipe('h1', 'dX', ['K-002']), []).rerouted, true);
  // several fixes, listed in date order whatever the file order
  eq('multiple fixes in date order', run(recipe('h1', 'd1', ['K-002', 'K-006']), [fix('h3', ['K-006'], 'content-fix', '2026-12-01', 'b'), fix('h2', ['K-002'], 'content-fix', '2026-11-20', 'a')]).fixes.map((f) => f.note), ['a', 'b']);
  // empty / missing migrations
  eq('empty migrations stays', run(recipe('h1', 'd1', ['K-002']), []), pinned('h1', 'd1'));
  eq('missing migrations stays', run(recipe('h1', 'd1', ['K-002']), undefined), pinned('h1', 'd1'));
  // a migration at a version the ledger does not know is ignored, without a crash
  eq('migration at unknown version ignored', run(recipe('h1', 'd1', ['K-002']), [fix('hZ', ['K-002'])]), pinned('h1', 'd1'));
  // a data-only fix: same bundle hash, new data hash, is an ordered version of its own
  const v2 = { current: 'h1', currentData: 'd9', history: [{ n: 1, hash: 'h1', data: 'd1' }, { n: 2, hash: 'h1', data: 'd9' }] };
  const dataFix = { at: 'h1', atData: 'd9', templates: ['K-002'], kind: 'content-fix', note: 'bank', date: '2026-11-21' };
  eq('data-only fix re-routes to the new data', resolveVersion({ recipe: recipe('h1', 'd1', ['K-002']), versions: v2, migrations: [dataFix], current: 'h1' }),
    { makerVersion: 'h1', dataVersion: 'd9', rerouted: true, fixes: [{ date: '2026-11-21', note: 'bank', templates: ['K-002'] }] });
  eq('data-only fix does not touch a recipe saved after it', resolveVersion({ recipe: recipe('h1', 'd9', ['K-002']), versions: v2, migrations: [dataFix], current: 'h1' }), pinned('h1', 'd9'));

  // the ledger
  let L = appendHistory({}, 'counting', 'a', 'd1', 'T1');
  L = appendHistory(L, 'counting', 'a', 'd1', 'T2');
  eq('same hash twice adds one entry', L.counting.history, [{ n: 1, hash: 'a', data: 'd1', at: 'T1' }]);
  L = appendHistory(L, 'counting', 'b', 'd1', 'T3');
  eq('a new hash adds n+1', L.counting.history.map((h) => [h.n, h.hash]), [[1, 'a'], [2, 'b']]);
  eq('current follows the build', [L.counting.current, L.counting.currentData], ['b', 'd1']);
  L = appendHistory(L, 'counting', 'b', 'd2', 'T4');
  eq('same hash, new data adds n+1', L.counting.history.map((h) => [h.n, h.data]), [[1, 'd1'], [2, 'd1'], [3, 'd2']]);
  const before = JSON.stringify(L);
  appendHistory(L, 'ten-frames', 'z', 'd2', 'T5');
  eq('appendHistory does not mutate its input', JSON.stringify(L), before);
  L = appendHistory(L, 'counting', 'a', 'd1', 'T6');
  eq('rebuilding an old pair adds nothing and never removes', L.counting.history.length, 3);

  console.log(`resolve-version: ${pass} passed, ${fails.length} failed`);
  if (fails.length) { console.log(fails.join('\n')); process.exit(1); }
})().catch((e) => { console.error(e); process.exit(1); });
