#!/usr/bin/env node
/* verify-fractions-interaction.js — drive the REAL iframe and prove the
   partition mechanic end-to-end (render + tap + answer-logic + circle path),
   not by-construction. Usage: node scripts/verify-fractions-interaction.js [--base=http://localhost:3000] [--locale=en] [--slug=make-equal-parts] */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const BASE = arg('base', 'http://localhost:3000');
const LOCALE = arg('locale', 'en');
// Resolve the per-locale native slug from the manifest (native slugs differ
// per locale — hardcoding one slug for all locales 404s the non-EN routes).
let SLUG = arg('slug', '');
if (!SLUG) {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'fractions-activities.json'), 'utf8'));
  SLUG = manifest[0].slug[LOCALE];
  if (!SLUG) { console.error(`no manifest slug for locale "${LOCALE}"`); process.exit(1); }
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const consoleErrors = [];
  // Ignore pre-existing dev-environment noise unrelated to the activity:
  // the CategoryNav duplicate-key React warning + DB-backed 500s (no local
  // Postgres). We only care about errors attributable to the tool/iframe.
  const PREEXISTING = [
    'Encountered two children with the same key',
    'Failed to load resource',
    'prisma', "Can't reach database", 'localhost:5432',
    'Download the React DevTools', 'caniuse-lite', 'fonts.googleapis',
  ];
  const isNoise = (s) => PREEXISTING.some(p => s.includes(p));
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) consoleErrors.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) consoleErrors.push('pageerror: ' + e.message); });

  const url = `${BASE}/${LOCALE}/activities/${SLUG}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const frameH = await page.waitForSelector('iframe', { timeout: 20000 });
  const frame = await frameH.contentFrame();

  // wait for the tool + first task render (manifest fetch is async)
  await frame.waitForFunction(() => {
    const t = window.FractionsActivity;
    return t && Array.isArray(t.tasks) && t.tasks.length === 5 &&
      document.querySelector('.frac-svg') && document.querySelectorAll('.frac-line').length > 0;
  }, { timeout: 20000 });

  const fail = [];
  const shapesSeen = new Set();
  let wrongPathProven = false;

  // helpers run INSIDE the iframe
  const clickCand = (id) => frame.evaluate((id) => {
    const g = document.querySelector('g.frac-cand[data-id="' + id + '"]');
    const hit = g && g.querySelector('.frac-hit');
    if (!hit) return false;
    hit.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return true;
  }, id);
  const clickCheck = () => frame.evaluate(() => {
    const b = document.querySelector('.lcs-activity-check');
    if (!b || b.hidden) return false;
    b.click(); return true;
  });
  const clickNext = () => frame.evaluate(() => {
    const b = document.querySelector('.lcs-activity-next');
    if (!b || b.hidden) return false;
    b.click(); return true;
  });
  const snapshot = () => frame.evaluate(() => {
    const t = window.FractionsActivity;
    return {
      shape: t.shape, n: t.n, cut: t.cut,
      correctIds: t.correctIds.slice(),
      candIds: t.candidates.map(c => c.id),
      distractorIds: t.candidates.filter(c => c.kind === 'distractor').map(c => c.id),
      lineCount: document.querySelectorAll('.frac-line').length,
      bodyCount: document.querySelectorAll('.frac-svg > rect, .frac-svg > circle').length,
      promptCelebrate: !!document.querySelector('.lcs-activity-prompt.celebrate'),
      promptTryagain: !!document.querySelector('.lcs-activity-prompt.tryagain'),
      hint: (document.querySelector('.lcs-activity-prompt-hint') || {}).textContent || '',
      promptText: (document.querySelector('.lcs-activity-prompt-text') || {}).textContent || ''
    };
  });

  for (let r = 0; r < 5; r++) {
    let s = await snapshot();
    shapesSeen.add(s.shape);

    // render integrity
    if (s.lineCount < s.candIds.length) fail.push(`round ${r} (${s.shape}): only ${s.lineCount} lines rendered for ${s.candIds.length} candidates`);
    if (s.bodyCount < 1) fail.push(`round ${r} (${s.shape}): no shape body rendered`);
    if (!s.promptText) fail.push(`round ${r}: empty prompt text`);
    if (s.correctIds.length !== (s.n === 4 ? 2 : 1)) fail.push(`round ${r} (${s.shape}/n${s.n}): correctIds=${s.correctIds.length}, expected ${s.n === 4 ? 2 : 1}`);

    // WRONG PATH (prove once, on the first round that has a distractor):
    // commit a distractor → Check must FAIL with a non-empty hint.
    if (!wrongPathProven && s.distractorIds.length) {
      await clickCand(s.distractorIds[0]);
      await clickCheck();
      await new Promise(res => setTimeout(res, 150));
      const w = await snapshot();
      if (w.promptCelebrate) fail.push(`round ${r}: committing a DISTRACTOR wrongly passed Check`);
      if (!w.promptTryagain) fail.push(`round ${r}: wrong answer did not enter try-again state`);
      if (!w.hint) fail.push(`round ${r}: wrong answer produced no hint`);
      wrongPathProven = true;
      // undo the distractor so the board is clean for the correct commit
      await clickCand(s.distractorIds[0]);
    }

    // CORRECT PATH: commit exactly the correct set → Check must celebrate.
    for (const id of s.correctIds) await clickCand(id);
    await clickCheck();
    await new Promise(res => setTimeout(res, 150));
    const after = await snapshot();
    if (!after.promptCelebrate) fail.push(`round ${r} (${s.shape}/n${s.n}): correct partition did NOT pass Check (celebrate=false)`);

    if (r < 4) {
      const advanced = await clickNext();
      if (!advanced) fail.push(`round ${r}: Next button not available after correct Check`);
      await new Promise(res => setTimeout(res, 250));
    }
  }

  // every shape family must have rendered (rect, square, circle) incl. the novel circle path
  for (const want of ['rect', 'square', 'circle']) {
    if (!shapesSeen.has(want)) fail.push(`shape "${want}" never rendered across the 5 rounds`);
  }
  if (consoleErrors.length) fail.push('console/page errors: ' + consoleErrors.slice(0, 5).join(' | '));

  await browser.close();

  if (fail.length) {
    console.error(`FAIL (${LOCALE}) — ${fail.length} issue(s):`);
    fail.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`PASS (${LOCALE}) — 5 rounds rendered (shapes: ${[...shapesSeen].join(', ')}); tap→commit works; correct set celebrates; distractor fails with a hint; circle render path proven on the live artifact.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
