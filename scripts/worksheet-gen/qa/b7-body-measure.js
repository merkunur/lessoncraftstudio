// b7-body-measure.js — for every b7 print page (all 11 locales) the shell body box, the content stack and the gap above the footer, in the browser.
// The instrument behind the page-fill rule (operator 2026-10-10): the body is what the shell leaves between the instruction and the footer rule —
// 766 px with a 1-2-line title and instruction, 733 at the tallest shipped chrome; build to it, never to a worst-case guess. Usage: node qa/b7-body-measure.js
const puppeteer = require('puppeteer'); const fs = require('fs'); const path = require('path');
const R = require('path').join(__dirname, '..', 'out', 'b7-sweep');
const IDS = ['K-395','K-397','K-398','G1-412','G2-388','G1-413','G1-414','G1-415','K-399','K-400','G2-389','K-396','K-401','K-402','K-403','G1-416','K-404','G1-417','G1-418','G1-419','G2-390','G2-391'];
const LOCS = ['en','de','es','pt','fr','it','nl','sv','da','no','fi'];
(async () => { const browser = await puppeteer.launch({ headless: 'new' }); const page = await browser.newPage(); await page.setViewport({ width: 794, height: 1123 });
  const rows = {};
  for (const id of IDS) for (const loc of LOCS) { const f = path.join(R, loc, `${id}-null-d2-${loc}.html`); if (!fs.existsSync(f)) continue;
    await page.goto('file:///' + f.split(String.fromCharCode(92)).join('/'), { waitUntil: 'networkidle0', timeout: 60000 });
    const m = await page.evaluate(() => { const b = document.querySelector('[data-lcs-body]').getBoundingClientRect(); const c = document.querySelector('[data-ws-content]'); const cb = c ? c.getBoundingClientRect() : null; const ft = document.querySelector('.ws-foot').getBoundingClientRect(); const pg = document.querySelector('.ws-page') ? document.querySelector('.ws-page').getBoundingClientRect() : { height: 0 };
      // the lowest descendant of the content (an absolutely placed tab can sit below the content box)
      let low = cb ? cb.bottom : 0; c && c.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (r.height && r.bottom > low) low = r.bottom; });
      return { bodyTop: b.top, bodyH: b.height, bodyBottom: b.bottom, footTop: ft.top, contentBottom: low, contentTop: cb ? cb.top : 0, pageH: pg.height }; });
    (rows[id] = rows[id] || []).push({ loc, ...m }); }
  await browser.close();
  for (const id of IDS) { const r = rows[id]; if (!r) continue; const minAvail = Math.min(...r.map((x) => x.footTop - x.bodyTop)); const maxHeader = Math.max(...r.map((x) => x.bodyTop)); const used = r.find((x) => x.loc === 'en'); const worst = r.reduce((a, x) => (x.footTop - x.contentBottom > a.gap ? { gap: x.footTop - x.contentBottom, loc: x.loc } : a), { gap: -1 });
    console.log(`${id.padEnd(7)} bodyTop max ${Math.round(maxHeader)} (${r.find((x) => x.bodyTop === maxHeader).loc}) | avail min ${Math.round(minAvail)} | en content ${Math.round(used.contentTop)}→${Math.round(used.contentBottom)} (${Math.round(used.contentBottom - used.contentTop)} tall) gap to footer ${Math.round(used.footTop - used.contentBottom)} | widest gap ${Math.round(worst.gap)} (${worst.loc}) | foot ${Math.round(used.footTop)} page ${Math.round(used.pageH)}`); }
})();
