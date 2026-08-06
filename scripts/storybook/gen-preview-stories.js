#!/usr/bin/env node
/* =====================================================================
   gen-preview-stories.js — build PLAYABLE preview stories for local testing.

   For every interactive app (SoT: docs/storybook/app-coverage-matrix.json), generate
   its SEP exercise headless (via sep-generate) and wrap it in a one-page storybook you
   can play in the browser (Pip + the pips-picnic scene + the exercise in a zone). One
   story per app under `mini tools/stories/preview-<app>/`, so the preview server can
   list them and you can pick which to test. Resilient: a failing app is logged + skipped.

   USAGE: node scripts/storybook/gen-preview-stories.js [--only=wordsearch,chart-count]
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { serve, generateOne } = require('./sep-generate.js');
const { APP_PARAMS } = require('./prove-app-sep.js');

const REPO = path.join(__dirname, '..', '..');
const STORIES = path.join(REPO, 'mini tools', 'stories');
const MATRIX = JSON.parse(fs.readFileSync(path.join(REPO, 'docs', 'storybook', 'app-coverage-matrix.json'), 'utf8'));

const onlyArg = (process.argv.find(a => a.startsWith('--only=')) || '').split('=')[1];
const ONLY = onlyArg ? onlyArg.split(',').map(s => s.trim()) : null;

/* one-page playable story wrapping exercises/p-en — mirrors prove-app-sep's buildProofStory */
function writeStory(story, app, family) {
  const dir = path.join(STORIES, story);
  const zone = { x: 340, y: 70, w: 920, h: 860 };
  const s = {
    schemaVersion: 'sb-1', id: story, title: '@t', locales: ['en'],
    theme: { letterboxColor: '#FBF3E4', transition: 'crossfade' },
    cast: [{ id: 'pip', name: '@n', role: 'guide', atlasBase: 'a', poses: ['neutral'] }],
    assets: {
      a: { kind: 'atlas', src: '/mini-tools/stories/pips-picnic/cast/pip/pip.base.json' },
      sc: { kind: 'image', src: '/mini-tools/stories/pips-picnic/scenes/page-01.webp', size: { w: 1600, h: 1000 } }
    },
    reward: { id: 'story.' + story, label: { en: 'x' }, emoji: '📄' },
    pages: [{
      id: 'p01', scene: { image: 'sc' },
      characters: [{ characterId: 'pip', pose: 'neutral', anchor: { x: 200, y: 890 }, scale: 0.7, flip: false }],
      narration: { gate: 'end', cues: [{ id: 'l1', characterId: 'pip' }] },
      interaction: { moduleType: 'sb-worksheet-exercise', zone, completionMode: 'check', taskData: { package: 'exercises/p-en' } },
      success: { celebration: 'burst', holdMs: 800 }
    }]
  };
  fs.writeFileSync(path.join(dir, 'story.json'), JSON.stringify(s, null, 2));
  fs.writeFileSync(path.join(dir, 'strings.json'), JSON.stringify(
    { t: { en: app + '  (family ' + family + ')' }, n: { en: 'Pip' }, l1: { en: 'Try this one!' } }, null, 2));
}

(async () => {
  const apps = (MATRIX.apps || []).filter(a => a.interactive && (!ONLY || ONLY.indexOf(a.app) >= 0));
  const srv = await serve();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const ok = [], fail = [];
  for (const row of apps) {
    const app = row.app;
    const family = (row.mapper && row.mapper[0]) || row.family;
    const params = APP_PARAMS[app] || { theme: 'animals' };
    const story = 'preview-' + app;
    const dir = path.join(STORIES, story);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const spec = { app, family, params, seed: 7, locale: 'en', exId: 'p-en' };
    try {
      await generateOne(browser, base, spec, dir);
      writeStory(story, app, family);
      ok.push(app);
      console.log('  ✓ ' + app + ' (family ' + family + ') → preview-' + app);
    } catch (e) {
      fail.push(app);
      fs.rmSync(dir, { recursive: true, force: true });
      console.log('  ✗ ' + app + ' — ' + String(e.message).slice(0, 120));
    }
  }
  await browser.close(); srv.close();
  console.log('\n[gen-preview] ' + ok.length + ' story(ies) ready' + (fail.length ? ', ' + fail.length + ' failed: ' + fail.join(',') : ''));
})().catch(e => { console.error('[gen-preview] crashed: ' + e.stack); process.exit(1); });
