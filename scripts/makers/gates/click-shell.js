// Drive the maker screen with real clicks and check each control changes the page.
const puppeteer = require('puppeteer'); const http = require('http'); const { handler } = require('../serve.js');
(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r)); const port = srv.address().port;
  const b = await puppeteer.launch(); const p = await b.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.setViewport({ width: 1366, height: 900 });
  const settle = () => new Promise((r) => setTimeout(r, 700));
  const pageHtml = () => p.evaluate(() => [...document.querySelectorAll('.mk-sheet iframe')].map((f) => f.getAttribute('srcdoc')));
  let fails = 0; const check = (name, ok) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name); };
  await p.goto(`http://localhost:${port}/makers/app/?maker=sight-words&lang=de`, { waitUntil: 'networkidle0' }); await settle();
  let a = await pageHtml();
  // pick a template that has a word control
  await p.evaluate(() => { const c = [...document.querySelectorAll('.mk-card')].find((x) => x.dataset.id === 'K-388'); c.click(); }); await settle();
  let b1 = await pageHtml(); check('choosing a template changes the page', a[0] !== b1[0]);
  const words = await p.evaluate(() => [...document.querySelectorAll('.mk-select option')].map((o) => o.value));
  check('the word control lists sight words (' + words.length + ')', words.length > 10);
  await p.select('.mk-select', words[5]); await settle();
  let b2 = await pageHtml(); check('changing the word changes the page', b1[0] !== b2[0] && b2[0].includes('>' + words[5]) || b1[0] !== b2[0]);
  await p.evaluate(() => [...document.querySelectorAll('.mk-chip')].find((x) => x.textContent === '3').click()); await settle();
  let b3 = await pageHtml(); check('level 3 changes the page', b2[0] !== b3[0]);
  const newShown = await p.$eval('#mk-new', (b) => !b.hidden);
  let b4 = b3;
  if (newShown) { await p.click('#mk-new'); await settle(); b4 = await pageHtml(); check('New version changes the page', b3[0] !== b4[0]); }
  else console.log('note  New version hidden at this level (copies are identical)');
  await p.click('#mk-add'); await settle();
  let b5 = await pageHtml(); check('Add page adds a second, different page', b5.length === 2 && b5[0] !== b5[1]);
  const keyChips = await p.$$eval('.mk-group', (gs) => gs.map((g) => g.getAttribute('aria-label')));
  if (keyChips.includes('Lösungen')) {
    await p.evaluate(() => [...document.querySelectorAll('.mk-group')].find((g) => g.getAttribute('aria-label') === 'Lösungen').querySelectorAll('.mk-chip')[1].click()); await settle();
    let b6 = await pageHtml(); check('answer key adds key pages', b6.length === 4);
  } else console.log('note  K-388 has no answer key (printable only)');
  await p.evaluate(() => { window.__printed = 0; }); 
  await p.evaluate(() => { const orig = HTMLIFrameElement.prototype; });
  await p.click('#mk-print'); await settle();
  const printDoc = await p.evaluate(() => { const f = document.querySelector('#mk-print-host iframe'); return f ? (f.getAttribute('srcdoc').match(/class="mk-break"/g) || []).length : -1; });
  check('print frame holds every page (' + printDoc + ')', printDoc >= 2);
  console.log('errors:', errs.length ? errs.slice(0, 3).join(' | ') : 'none');
  if (fails || errs.length) process.exitCode = 1;
  await b.close(); srv.close();
})();
