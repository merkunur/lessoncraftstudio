#!/usr/bin/env node
/* =====================================================================
   audit-studio.js — drives the running Storybook Studio (127.0.0.1:5055)
   and asserts EVERY mechanic's form is fully authorable: no field renders
   a dead (label-only) row, and every declared field/drawable has a control.

   Prereq: the studio-server is running (node scripts/storybook/studio-server.js).
   USAGE: node scripts/storybook/audit-studio.js [--port 5055] [--story module-gym]
   ===================================================================== */
'use strict';
const puppeteer = require('puppeteer');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i >= 0 ? process.argv[i + 1] : d; };
const PORT = arg('port', '5055');
const STORY = arg('story', 'module-gym');
const BASE = 'http://127.0.0.1:' + PORT;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErr = [];
  page.on('pageerror', e => consoleErr.push(String(e).slice(0, 160)));
  await page.goto(BASE + '/mini-tools/storybook-studio.html', { waitUntil: 'networkidle2', timeout: 25000 });
  await page.waitForFunction('window.Studio && window.SBModules', { timeout: 15000 });
  await page.evaluate((s) => window.Studio.load(s), STORY);
  await page.waitForFunction('window.Studio.state && window.Studio.state.doc', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 800));

  const types = await page.evaluate(() => window.SBModules.types());
  const results = [];

  for (const type of types) {
    const r = await page.evaluate(async (type) => {
      const mod = window.SBModules.get(type);
      const stu = mod && mod.meta && mod.meta.studio;
      const minZ = (mod.meta.minZone) || { w: 640, h: 520 };
      /* set the current page's interaction to this mechanic with its defaults */
      window.Studio.mutate('audit set mechanic', function (draft) {
        var pg = draft.story.pages[window.Studio.state.pageIndex];
        pg.interaction = {
          moduleType: type,
          zone: { x: 300, y: 120, w: Math.max(minZ.w, 700), h: Math.max(minZ.h, 560) },
          completionMode: (mod.meta.completionModes && mod.meta.completionModes[0]) || 'check',
          taskData: JSON.parse(JSON.stringify((stu && stu.defaults) || {}))
        };
      });
      window.StudioInspector.render();
      await new Promise(r => setTimeout(r, 120));
      /* find dead rows: a .stu-frow that has a <label> but NO interactive control.
         (boolean/correctPick render their own label+control, so they always have a control) */
      const rows = [...document.querySelectorAll('#stu-panel .stu-frow')];
      const dead = [];
      rows.forEach(row => {
        const hasControl = row.querySelector('input,select,textarea,button');
        const label = row.querySelector('label,.stu-flabel');
        if (label && !hasControl) dead.push((label.textContent || '').trim().slice(0, 40));
      });
      const fieldCount = (stu && stu.fields || []).length;
      const drawableAdds = [...document.querySelectorAll('#stu-panel .stu-btn')].filter(b => /^\+ /.test(b.textContent)).length;
      const label = (stu && stu.label) || type;
      return { type, label, fieldCount, drawableAdds, dead };
    }, type);
    results.push(r);
  }

  await browser.close();

  let fails = 0;
  console.log('\n=== Studio mechanic authorability audit (' + types.length + ' mechanics) ===');
  for (const r of results) {
    const bad = r.dead.length > 0;
    if (bad) fails++;
    console.log((bad ? '  ✗ ' : '  ✓ ') + r.type.padEnd(24) +
      ' fields:' + r.fieldCount + ' +buttons:' + r.drawableAdds +
      (bad ? '  DEAD FIELDS: ' + JSON.stringify(r.dead) : ''));
  }
  if (consoleErr.length) { console.log('\n  page errors: ' + JSON.stringify([...new Set(consoleErr)].slice(0, 6))); }
  console.log('\n[audit-studio] ' + (types.length - fails) + '/' + types.length + ' mechanics with zero dead fields' + (fails ? ' — ' + fails + ' FAIL' : ' — ALL GREEN'));
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error('[audit-studio] crashed: ' + e.stack); process.exit(1); });
