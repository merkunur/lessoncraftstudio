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
  // every page of a one-word template has its OWN word (operator 2026-10-31: added pages could not be changed)
  const sels = await p.$$eval('.mk-page-word select', (ss) => ss.map((x) => x.value));
  check('each page has its own word list, page 2 starts on another word', sels.length === 2 && sels[0] !== sels[1], sels);
  const other = words.find((w) => !sels.includes(w));
  await p.evaluate((w) => { const s = document.querySelectorAll('.mk-page-word select')[1]; s.value = w; s.dispatchEvent(new Event('change', { bubbles: true })); }, other); await settle();
  const b5b = await pageHtml();
  check('changing page 2\'s word changes page 2 only', b5b[0] === b5[0] && b5b[1] !== b5[1] && (await p.$$eval('.mk-page-word select', (ss) => ss[1].value)) === other);
  await p.evaluate(() => document.querySelector('.mk-page [data-act=remove]').click()); await settle();
  const after = await p.$$eval('.mk-page-word select', (ss) => ss.map((x) => x.value));
  check('removing page 1 keeps page 2 with its own word', after.length === 1 && after[0] === other, after);
  await p.click('#mk-add'); await settle();
  b5 = await pageHtml();
  // duplicate + move (every page's copy, word, swaps and texts move together)
  const wordsNow = () => p.$$eval('.mk-page-word select', (ss) => ss.map((x) => x.value));
  const w2 = await wordsNow();
  await p.evaluate(() => document.querySelectorAll('.mk-page [data-act=duplicate]')[0].click()); await settle();
  const d1 = await pageHtml(); const w3 = await wordsNow();
  check('duplicate: page 1 is copied right after it, same page, same word', d1.length === 3 && d1[1] === d1[0] && d1[2] === b5[1] && w3[1] === w3[0] && w3[2] === w2[1], { n: d1.length, w3 });
  await p.evaluate(() => document.querySelectorAll('.mk-page [data-act=up]')[2].click()); await settle();
  const m1 = await pageHtml(); const w4 = await wordsNow();
  check('move up: page 3 and page 2 swap, words with them', m1[1] === d1[2] && m1[2] === d1[1] && w4[1] === w3[2] && w4[2] === w3[1]);
  const ends = await p.evaluate(() => { const ups = document.querySelectorAll('.mk-page [data-act=up]'); const downs = document.querySelectorAll('.mk-page [data-act=down]'); return ups[0].disabled && downs[downs.length - 1].disabled && !ups[1].disabled; });
  check('the first page cannot move up and the last cannot move down', ends);
  // back to two pages for the checks below
  await p.evaluate(() => document.querySelectorAll('.mk-page [data-act=remove]')[1].click()); await settle();
  b5 = await pageHtml();
  // "More options": paper + border (ARCHITECTURE §4.1 decor — drawn in the paper margin, printed)
  const closed = await p.$$eval('.mk-group', (gs) => gs.map((g) => g.getAttribute('aria-label')));
  check('More options is closed at first (Paper is not on the first screen)', !closed.includes('Papier'), closed);
  await p.click('.mk-more'); await settle(300);
  const opened = await p.$$eval('.mk-group', (gs) => gs.map((g) => g.getAttribute('aria-label')));
  check('More options shows Paper and Border', opened.includes('Papier') && opened.includes('Rahmen'), opened);
  const frameW = () => p.$eval('.mk-sheet iframe', (f) => f.style.width);
  const wA4 = await frameW();
  await p.evaluate(() => [...document.querySelectorAll('.mk-group')].find((g) => g.getAttribute('aria-label') === 'Rahmen').querySelectorAll('.mk-chip')[3].click()); await settle();
  const decor = await p.evaluate(() => { const d = document.querySelector('.mk-sheet iframe').contentDocument; const s = d.querySelector('style[data-lcs-decor]'); return s ? getComputedStyle(d.querySelector('.ws-page')).outlineStyle : null; });
  check('a border is drawn round the page (dotted)', decor === 'dotted', decor);
  await p.evaluate(() => [...document.querySelectorAll('.mk-group')].find((g) => g.getAttribute('aria-label') === 'Papier').querySelectorAll('.mk-chip')[0].click()); await settle();
  const wLetter = await frameW();
  check('paper: the preview is the sheet of paper (A4 794 px wide, US Letter 816 px)', wA4 === '794px' && wLetter === '816px', { wA4, wLetter });
  await p.click('#mk-print'); await settle(800);
  const printDecor = await p.evaluate(() => { const f = document.querySelector('#mk-print-host iframe'); return !!(f && f.contentDocument.querySelector('style[data-lcs-decor]')); });
  check('the border is printed too', printDecor);
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
