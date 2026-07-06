#!/usr/bin/env node
/* =====================================================================
   prove-tenant-play.js — the TENANT PLAYER proof: a worksheet exercise
   placed in a teacher story RENDERS in the accountless player through the
   tokened /api/play/<link>/ base (the round-5 fix: ctx.storyBase was
   hard-coded to the operator static tree, so the SEP descriptor 404'd and
   the preview showed "only the scene").

   Flow (API via fetch + the REAL player via puppeteer):
     create story → import a minimal SEP exercise (FormData) → set the
     page's interaction to sb-worksheet-exercise → save → open
     /mini-tools/storybook.html?src=/api/play/<previewLink>/ accountless →
     assert the worksheet board builds (.sbwe-visual loads; no '!' glyph)
     → delete the story.

   ENV: LCS_BASE_URL (default http://127.0.0.1:3000) + LCS_TEST_TOKEN
        (or LCS_TEST_EMAIL/LCS_TEST_PASSWORD).
   USAGE: node scripts/storybook/prove-tenant-play.js
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');

const BASE = (process.env.LCS_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const EMAIL = process.env.LCS_TEST_EMAIL;
const PASSWORD = process.env.LCS_TEST_PASSWORD;

const fails = [];
let passes = 0;
function check(name, cond, detail) {
  if (cond) { passes++; console.log('  PASS  ' + name); }
  else { fails.push(name); console.log('  FAIL  ' + name + (detail ? ' — ' + detail : '')); }
}

const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

async function j(method, path, { token, body, raw, form } = {}) {
  const headers = {};
  if (token) headers.Authorization = 'Bearer ' + token;
  let payload;
  if (form) payload = form;
  else if (raw) payload = raw;
  else if (body !== undefined) { headers['Content-Type'] = 'application/json'; payload = JSON.stringify(body); }
  const res = await fetch(BASE + path, { method, headers, body: payload });
  let data = null;
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) { try { data = await res.json(); } catch (e) {} }
  return { status: res.status, data, headers: res.headers };
}

(async () => {
  let token = process.env.LCS_TEST_TOKEN || null;
  if (!token && (!EMAIL || !PASSWORD)) {
    console.error('Set LCS_TEST_TOKEN, or LCS_TEST_EMAIL + LCS_TEST_PASSWORD.');
    process.exit(2);
  }
  if (!token) {
    const login = await j('POST', '/api/auth/signin', { body: { email: EMAIL, password: PASSWORD } });
    token = login.data && login.data.accessToken;
    if (!token) { console.error('signin failed: ' + login.status); process.exit(2); }
  }

  /* 1. story */
  const created = await j('POST', '/api/studio/stories', {
    token, body: { title: 'Prove Tenant Play ' + Date.now(), gradeBand: 'K', locale: 'en' },
  });
  check('create story', created.status === 201 && !!created.data.previewLinkId, 'status ' + created.status);
  const sid = created.data && created.data.id;
  const link = created.data && created.data.previewLinkId;
  if (!sid) return finish(null);

  /* 2. a minimal but PLAYABLE family-A SEP package */
  const descriptor = {
    formatVersion: 'sep-1', appType: 'word-guess', family: 'A',
    meta: { contentLanguage: 'en' }, page: { width: 2480, height: 3508 },
    crop: { x: 0, y: 0, w: 400, h: 200, pad: 16 },
    visual: { file: 'visual@2x.webp', format: 'webp', scale: 2, width: 800, height: 400 },
    input: { policy: 'tap-palette', tapPalette: { case: 'upper', letters: ['A', 'B', 'C'] } },
    elements: { slots: [{ id: 's1', expected: 'A', rect: { x: 10, y: 10, w: 40, h: 40 } }] },
    locales: { en: { prompt: 'Tap the letter', success: 'Nice!', tryAgain: 'Try again', hint: null } },
  };
  const form = new FormData();
  form.append('descriptor', JSON.stringify(descriptor));
  form.append('visual@2x.webp', new Blob([TINY_PNG], { type: 'image/webp' }), 'visual@2x.webp');
  const exUp = await j('POST', '/api/studio/stories/' + sid + '/exercises', { token, form });
  check('exercise intake', exUp.status === 200 && /^exercises\//.test(exUp.data.package || ''), 'status ' + exUp.status);
  const pkg = exUp.data && exUp.data.package;
  if (!pkg) return finish(sid, token);

  /* 3. place it as page 1's interaction + save */
  const got = await j('GET', '/api/studio/stories/' + sid, { token });
  const doc = got.data.story;
  const strings = got.data.strings;
  doc.pages[0].interaction = {
    moduleType: 'sb-worksheet-exercise',
    zone: { x: 100, y: 110, w: 1400, h: 840 },
    completionMode: 'check',
    taskData: { package: pkg },
  };
  const save = await j('PUT', '/api/studio/stories/' + sid, {
    token, body: { story: doc, strings, baseEtag: got.data.etag },
  });
  check('save with the placed exercise', save.status === 200, 'status ' + save.status);

  /* 4. the REAL player, accountless, through the tokened link */
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErrs = [];
  page.on('pageerror', (e) => consoleErrs.push(String(e).slice(0, 160)));
  await page.setViewport({ width: 960, height: 720 });
  const playUrl = BASE + '/mini-tools/storybook.html?src=' + encodeURIComponent('/api/play/' + link + '/') +
    '&lang=en&embed=1&debug=1&sound=off&page=1';
  await page.goto(playUrl, { waitUntil: 'domcontentloaded' });
  const boardOk = await page.waitForFunction(() => {
    const im = document.querySelector('.sbwe-visual');
    return im && im.naturalWidth > 0;
  }, { timeout: 30000 }).then(() => true).catch(() => false);
  check('the worksheet BOARD builds in the tenant player (descriptor + visual served via /api/play/<link>/m/)',
    boardOk, consoleErrs.join(' | ') || 'no .sbwe-visual with naturalWidth>0');
  if (!boardOk) {
    const glyph = await page.evaluate(() => {
      const ld = document.querySelector('.sbwe-load');
      return ld ? ld.textContent : '(no .sbwe-load)';
    }).catch(() => '(gone)');
    console.log('        loading glyph: ' + glyph);
  }
  const slots = await page.evaluate(() => document.querySelectorAll('.sbwe-cell, .sbwe-slot').length).catch(() => 0);
  check('interactive elements rendered (' + slots + ')', boardOk ? slots >= 1 : true);
  await browser.close();

  return finish(sid, token);

  async function finish(storyId, tk) {
    if (storyId && tk) await j('DELETE', '/api/studio/stories/' + storyId, { token: tk }).catch(() => {});
    console.log('\n[prove-tenant-play] ' + passes + ' passed, ' + fails.length + ' failed');
    process.exit(fails.length ? 1 : 0);
  }
})().catch((e) => { console.error('[prove-tenant-play] crashed: ' + e.stack); process.exit(1); });
