#!/usr/bin/env node
/* =====================================================================
   audit-activity-tablet-reach.js — every control of every activity can be
   REACHED on a landscape tablet when the activity page IS the screen.
   ---------------------------------------------------------------------
   WHY (operator report 2026-10-30, "Mama's Roll Call is cut off at the
   bottom on tablet screens"): inside the site's iframe the frame grows to
   fit, so every gate we had passed. But an activity opened directly, put in
   fullscreen, or played from a student link fills a 1024×768 screen, and
   lcs-shell.css clipped it (`html, body { overflow:hidden }`): 25 of 204
   activities had Check below the screen with no way to reach it. Our
   visual-QA sweep never measured a landscape tablet height.

   For every activity, at 1024×768 and 1180×820, in three modes:
     standalone — the activity html opened on its own;
     fullscreen — the activity inside a site-like iframe (scrolling="no",
                  allow="fullscreen"), with the shell's fullscreen button
                  pressed by a real click;
     playlink   — the /play/a/<id> shape: an iframe at 100% of the screen.
   it asserts, using a REAL mouse wheel (not scrollTo, which works even when
   a user cannot scroll):
     TOP    — at rest the card's top is on screen (nothing clipped above);
     REACH  — after wheeling down, the lowest visible control is on screen.

   Usage: node scripts/audit-activity-tablet-reach.js [--only=<id,id>] [--modes=standalone,fullscreen,playlink]
          node scripts/audit-activity-tablet-reach.js --poison   (must FAIL: re-clips the page)
   Exit 0 = every activity reachable in every mode; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const H = require('./lib/activity-harness');

const ONLY = H.arg('only', '');
const MODES = H.arg('modes', 'standalone,fullscreen,playlink').split(',');
const POISON = process.argv.includes('--poison');
const VIEWPORTS = [[1024, 768], [1180, 820]];

/* every activity row whose html exists, with the global it mounts */
const rows = [];
for (const f of fs.readdirSync(H.MINI).filter((x) => /-activities\.json$/.test(x))) {
  let m; try { m = JSON.parse(fs.readFileSync(path.join(H.MINI, f), 'utf8')); } catch (e) { continue; }
  for (const r of (m.activities || m)) {
    const html = r.tool + '.html';
    if (!fs.existsSync(path.join(H.MINI, html))) continue;
    if (ONLY && !ONLY.split(',').includes(r.id)) continue;
    const src = fs.readFileSync(path.join(H.MINI, html), 'utf8');
    const g = (src.match(/LCS\.mount\((\w+)/) || [])[1];
    if (g) rows.push({ id: r.id, html, g });
  }
}
if (!rows.length) { console.error('FAIL: no activity matched' + (ONLY ? ' --only=' + ONLY : '')); process.exit(2); }

/* measured inside the activity document */
const MEASURE = () => {
  const vis = (e) => { const b = e.getBoundingClientRect(), s = getComputedStyle(e); return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const btns = [...document.querySelectorAll('.lcs-app button, .lcs-app [role=button]')].filter(vis);
  const low = btns.length ? Math.max(...btns.map((b) => b.getBoundingClientRect().bottom)) : 0;
  const app = document.querySelector('.lcs-app');
  return { low, top: app ? app.getBoundingClientRect().top : 0, vh: innerHeight, n: btns.length };
};
const CLIP = 'html,body{overflow:hidden!important}';

(async () => {
  const L = await H.local({ html: rows[0].html, id: rows[0].id, global: rows[0].g, ready: '#lcs-root' });
  const fails = []; let checks = 0;
  const one = async (r, mode, w, h) => {
    const page = await L.browser.newPage();
    await page.setViewport({ width: w, height: h });
    const url = L.base + '/' + r.html + '?activity=' + encodeURIComponent(r.id) + '&lang=en' + (mode === 'standalone' ? '' : '&embed=1');
    try {
      let frame;
      if (mode === 'standalone') {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        frame = page.mainFrame();
      } else {
        const attrs = mode === 'fullscreen' ? 'scrolling="no" allow="fullscreen; autoplay" style="display:block;border:0;width:100%;height:600px"'
          : 'allow="autoplay" allowfullscreen style="display:block;border:0;width:100%;height:100%"';
        await page.goto(L.base + '/lcs-shell.css', { waitUntil: 'domcontentloaded' }); /* same origin, a blank-enough page */
        await page.setContent(`<!DOCTYPE html><html><head><style>html,body{margin:0;height:100%;background:#FBF3E4}</style></head><body><iframe id="f" src="${url}" ${attrs}></iframe></body></html>`, { waitUntil: 'networkidle0', timeout: 30000 });
        frame = await (await page.$('#f')).contentFrame();
      }
      await frame.waitForFunction((g) => window[g] && document.querySelector('.lcs-app'), { timeout: 15000 }, r.g);
      if (POISON) await frame.addStyleTag({ content: CLIP });
      await H.wait(700);
      if (mode === 'fullscreen') {
        const fs0 = await frame.$$('.lcs-ctrl');
        let pressed = false;
        for (const b of fs0) { const l = await b.evaluate((e) => e.getAttribute('aria-label') || ''); if (/fullscreen/i.test(l)) { await b.click(); pressed = true; break; } }
        await H.wait(600);
        const isFs = await frame.evaluate(() => !!document.fullscreenElement);
        checks++; if (!pressed || !isFs) { fails.push(`${r.id} ${mode} ${w}x${h}: fullscreen did not engage (pressed ${pressed})`); return; }
      }
      const a = await frame.evaluate(MEASURE);
      checks++; if (a.top < -1) fails.push(`${r.id} ${mode} ${w}x${h}: TOP card top ${a.top.toFixed(0)} is above the screen`);
      checks++; if (!a.n) { fails.push(`${r.id} ${mode} ${w}x${h}: no visible control (nothing measured)`); return; }
      /* a real wheel over the card, the way a user scrolls */
      await page.mouse.move(w / 2, h / 2);
      for (let i = 0; i < 6; i++) { await page.mouse.wheel({ deltaY: 600 }); await H.wait(120); }
      await H.wait(300);
      const b = await frame.evaluate(MEASURE);
      checks++; if (b.low > b.vh + 1) fails.push(`${r.id} ${mode} ${w}x${h}: REACH lowest control ${b.low.toFixed(0)} > screen ${b.vh} after scrolling`);
    } catch (e) { fails.push(`${r.id} ${mode} ${w}x${h}: ERROR ${String(e).slice(0, 90)}`); }
    finally { await page.close(); }
  };
  for (const r of rows) for (const mode of MODES) for (const [w, h] of VIEWPORTS) await one(r, mode, w, h);
  await L.close();
  fails.forEach((f) => console.log('FAIL ' + f));
  console.log(`audit-activity-tablet-reach: ${rows.length} activities × ${MODES.length} modes × ${VIEWPORTS.length} screens — ${checks} checks, ${fails.length} failures${POISON ? ' (POISON run: failures expected)' : ''}`);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
