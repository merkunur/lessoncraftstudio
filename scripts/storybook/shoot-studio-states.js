#!/usr/bin/env node
/* =====================================================================
   shoot-studio-states.js — capture the Studio's 5 canonical UI states
   for the canvas-first redesign's before/after evidence:
     1-empty-canvas · 2-page-composition · 3-mechanic-config ·
     4-generator-embedded · 5-preview
   USAGE: node scripts/storybook/shoot-studio-states.js --out=before
          (writes docs/audit-results/storybook/studio-redesign/<out>/)
   Optional extra states (post-redesign): --focus adds 6-focus-mode +
   7-zoomed when the zoom API exists.
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { srv } = require('./studio-server.js');

const REPO = path.join(__dirname, '..', '..');
const STORIES = path.join(REPO, 'mini tools', 'stories');
const OUT = (process.argv.find(a => a.startsWith('--out=')) || '--out=before').split('=')[1];
const WANT_FOCUS = process.argv.includes('--focus');
const DIR = path.join(REPO, 'docs', 'audit-results', 'storybook', 'studio-redesign', OUT);

(async () => {
  fs.mkdirSync(DIR, { recursive: true });
  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  /* scratch copy of pips-picnic (the prove-studio.js pattern) */
  const SCRATCH = 'studio-shoot';
  fs.rmSync(path.join(STORIES, SCRATCH), { recursive: true, force: true });
  fs.mkdirSync(path.join(STORIES, SCRATCH), { recursive: true });
  for (const f of ['story.json', 'strings.json']) {
    const docTxt = fs.readFileSync(path.join(STORIES, 'pips-picnic', f), 'utf8');
    fs.writeFileSync(path.join(STORIES, SCRATCH, f), docTxt.replace(/pips-picnic(?!\/)/g, SCRATCH));
  }
  const sj = JSON.parse(fs.readFileSync(path.join(STORIES, SCRATCH, 'story.json'), 'utf8'));
  sj.id = SCRATCH;
  for (const k in sj.assets) sj.assets[k].src = sj.assets[k].src.replace('/stories/' + SCRATCH + '/', '/stories/pips-picnic/');
  sj.reward.id = 'story.' + SCRATCH;
  fs.writeFileSync(path.join(STORIES, SCRATCH, 'story.json'), JSON.stringify(sj, null, 2));

  const shot = async (name) => {
    await new Promise(r => setTimeout(r, 450));
    await page.screenshot({ path: path.join(DIR, name + '.png') });
    console.log('  shot ' + name);
  };
  const clickPanelBtn = (label) => page.evaluate((l) => {
    const b = [...document.querySelectorAll('#stu-panel .stu-btn')].find(x => x.textContent.indexOf(l) >= 0);
    if (b) b.click(); return !!b;
  }, label);

  await page.goto(base + '/mini-tools/storybook-studio.html?story=' + SCRATCH, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction('window.Studio && Studio.state.doc !== null', { timeout: 15000 });
  await page.waitForSelector('.stu-stage .stu-char img', { timeout: 15000 });

  /* 2 — page composition (page 2 has pip on the picnic scene) */
  await page.evaluate(() => { Studio.state.pageIndex = 1; StudioCanvas.select(null); });
  await new Promise(r => setTimeout(r, 700));
  await shot('2-page-composition');

  /* 1 — empty canvas: duplicate the last page, then strip scene + characters */
  await page.evaluate(() => { Studio.state.pageIndex = Studio.state.doc.story.pages.length - 1; StudioCanvas.select(null); });
  await clickPanelBtn('Duplicate page');
  await new Promise(r => setTimeout(r, 300));
  await page.evaluate(() => {
    Studio.mutate('blank for shoot', (draft) => {
      const pg = draft.story.pages[Studio.state.pageIndex];
      pg.scene = null; pg.characters = [];
    });
  });
  await shot('1-empty-canvas');

  /* 3 — mechanic config: choose "Listen and tap" */
  await clickPanelBtn('Choose an activity');
  await page.waitForSelector('.stu-card', { timeout: 8000 });
  await page.evaluate(() => {
    [...document.querySelectorAll('.stu-card')].find(c => c.textContent.indexOf('Listen and tap') >= 0).click();
  });
  await new Promise(r => setTimeout(r, 400));
  await shot('3-mechanic-config');

  /* 4 — generator embedded: Change… → Worksheet activities → Missing letters */
  await clickPanelBtn('Change…');
  await page.waitForSelector('.stu-tab', { timeout: 8000 });
  await page.evaluate(() => {
    [...document.querySelectorAll('.stu-tab')].find(t => t.textContent.indexOf('Worksheet') >= 0).click();
  });
  await page.waitForFunction(() => {
    return [...document.querySelectorAll('.stu-card')].some(c => c.textContent.indexOf('Missing letters') >= 0);
  }, { timeout: 10000 });
  await page.evaluate(() => {
    [...document.querySelectorAll('.stu-card')].find(c => c.textContent.indexOf('Missing letters') >= 0).click();
  });
  await page.waitForSelector('.stu-genframe', { timeout: 8000 });
  await new Promise(r => setTimeout(r, 3500));   /* let the app boot + render */
  await shot('4-generator-embedded');
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('.stu-genov button')].find(x => /Close|Schließen/.test(x.textContent));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 300));

  /* 5 — preview drawer */
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('#stu-topbar .stu-btn, #stu-topbar button')].find(x => x.textContent.indexOf('▶') >= 0);
    if (b) b.click();
  });
  await page.waitForSelector('.stu-preview', { timeout: 8000 });
  await new Promise(r => setTimeout(r, 2500));
  await shot('5-preview');
  await page.evaluate(() => { const x = document.querySelector('.stu-drawer .stu-x'); if (x) x.click(); });

  /* post-redesign extras */
  if (WANT_FOCUS) {
    await page.evaluate(() => { if (window.StudioInspector && StudioInspector.setShell) StudioInspector.setShell({ rail: false, panel: false, top: false }); });
    await shot('6-focus-mode');
    await page.evaluate(() => { if (window.StudioInspector && StudioInspector.setShell) StudioInspector.setShell({ rail: true, panel: true, top: true }); });
    await page.evaluate(() => { if (window.StudioCanvas && StudioCanvas.setZoom) StudioCanvas.setZoom(2); });
    await shot('7-zoomed');
  }

  await browser.close();
  srv.close();
  fs.rmSync(path.join(STORIES, SCRATCH), { recursive: true, force: true });
  console.log('[shoot-studio-states] wrote ' + DIR);
  process.exit(0);
})().catch(e => { console.error('[shoot-studio-states] crashed: ' + e.stack); process.exit(1); });
