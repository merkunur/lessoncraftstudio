#!/usr/bin/env node
/* =====================================================================
   baseline-sep.js — per-app SEP-output golden (Phase-2 regression guard).

   Captures each app's __sepGenerate output for a fixed canonical spec as a committed
   reference (normalized-descriptor sha1 + visual sha1 + element counts), and on --check
   re-generates and diffs — exit 1 on drift. This is the "output-unchanged" guard: it
   catches ANY unintended change to an app's SEP output across future edits (complements
   the seed-repro same-run check + the "no existing day-job code path touched" guarantee).

   USAGE:
     node scripts/storybook/baseline-sep.js --capture [--app=X | all]   # write baselines/<app>.json
     node scripts/storybook/baseline-sep.js --check   --app=X           # diff vs committed baseline (exit 1 on drift)
   npm: "test:storybook:baseline" = --capture all.
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { run } = require('./sep-generate.js');

const REPO = path.join(__dirname, '..', '..');
const STORIES = path.join(REPO, 'mini tools', 'stories');
const MATRIX = path.join(REPO, 'docs', 'storybook', 'app-coverage-matrix.json');
const BASE_DIR = path.join(__dirname, 'baselines');

/* canonical spec per app — MUST match prove-app-sep's params for a stable golden */
const APP_PARAMS = {
  'word-guess': { theme: 'animals', vocabKeys: ['cat'] },
  'word-scramble': { theme: 'animals', vocabKeys: ['cat'] },
  'grid-match': { theme: 'animals' },
  'matching': { theme: 'animals' },
  'find-and-count': { theme: 'animals' },
  'missing-pieces': { theme: 'animals' },
};
const SEED = 7;

function sha1(b) { return crypto.createHash('sha1').update(b).digest('hex'); }
function stable(o) {
  if (o === null || typeof o !== 'object') return JSON.stringify(o);
  if (Array.isArray(o)) return '[' + o.map(stable).join(',') + ']';
  return '{' + Object.keys(o).sort().map(k => JSON.stringify(k) + ':' + stable(o[k])).join(',') + '}';
}
function normDescriptor(d) {
  const c = JSON.parse(JSON.stringify(d));
  delete c.createdAt; delete c.generatedAt;
  if (c.meta) { delete c.meta.createdAt; delete c.meta.generatedAt; }
  return stable(c);
}
function meta(app) {
  const m = JSON.parse(fs.readFileSync(MATRIX, 'utf8'));
  const row = (m.apps || []).find(a => a.app === app);
  if (!row || !row.interactive) throw new Error(app + ' not an interactive app');
  return row;
}

async function fingerprint(app) {
  const row = meta(app);
  const family = (row.mapper && row.mapper[0]) || row.family;
  const params = APP_PARAMS[app] || { theme: 'animals' };
  const story = 'sep-base-' + app;
  fs.rmSync(path.join(STORIES, story), { recursive: true, force: true });
  const results = await run([{ app, family, params, seed: SEED, locale: 'en', exId: 'b' }], story);
  const d = results[0].descriptor;
  const visPath = path.join(STORIES, story, 'exercises', 'b', d.visual.file);
  const fp = {
    app, family, spec: { params, seed: SEED, locale: 'en' },
    descriptorSha1: sha1(normDescriptor(d)),
    visualSha1: fs.existsSync(visPath) ? sha1(fs.readFileSync(visPath)) : null,
    elementCounts: Object.fromEntries(Object.entries(d.elements || {}).map(([k, v]) => [k, Array.isArray(v) ? v.length : (v ? 1 : 0)])),
  };
  fs.rmSync(path.join(STORIES, story), { recursive: true, force: true });
  return fp;
}

(async () => {
  const arg = (k) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : null; };
  const capture = process.argv.includes('--capture');
  const check = process.argv.includes('--check');
  let app = arg('app');
  fs.mkdirSync(BASE_DIR, { recursive: true });

  if (capture) {
    const list = (!app || app === 'all')
      ? JSON.parse(fs.readFileSync(MATRIX, 'utf8')).apps.filter(a => a.interactive && a.hooks).map(a => a.app)
      : [app];
    for (const a of list) {
      try { const fp = await fingerprint(a); fs.writeFileSync(path.join(BASE_DIR, a + '.json'), JSON.stringify(fp, null, 2)); console.log('  captured ' + a + ' (descriptor ' + fp.descriptorSha1.slice(0, 10) + ')'); }
      catch (e) { console.log('  SKIP ' + a + ': ' + e.message.slice(0, 100)); }
    }
    process.exit(0);
  }

  if (check) {
    if (!app) { console.error('--check needs --app=X'); process.exit(1); }
    const basePath = path.join(BASE_DIR, app + '.json');
    if (!fs.existsSync(basePath)) { console.log('no baseline for ' + app + ' (run --capture)'); process.exit(2); }
    const base = JSON.parse(fs.readFileSync(basePath, 'utf8'));
    const fp = await fingerprint(app);
    const drift = [];
    if (fp.descriptorSha1 !== base.descriptorSha1) drift.push('descriptor ' + base.descriptorSha1.slice(0, 8) + '→' + fp.descriptorSha1.slice(0, 8));
    if (fp.visualSha1 !== base.visualSha1) drift.push('visual ' + String(base.visualSha1).slice(0, 8) + '→' + String(fp.visualSha1).slice(0, 8));
    if (drift.length) { console.log('  DRIFT ' + app + ': ' + drift.join(', ')); process.exit(1); }
    console.log('  clean ' + app); process.exit(0);
  }

  console.error('usage: baseline-sep.js --capture [--app=X|all] | --check --app=X');
  process.exit(1);
})().catch(e => { console.error('[baseline-sep] crashed: ' + e.stack); process.exit(1); });
