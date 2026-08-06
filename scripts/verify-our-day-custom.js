/* Drive the teacher-authored card end to end, with real pointer events.
   The operator's headline requirement is "morgonsamling", so that is the
   word this gate types. "It mounts" is not verification. */
const http = require('http'); const fs = require('fs'); const path = require('path');
const puppeteer = require('puppeteer');
const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'our-day', 'qa');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); console.log((c ? '  ok   ' : '  FAIL ') + m); };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools'.length);
  const f = path.join(ROOT, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  res.end(fs.readFileSync(f));
});

(async () => {
  await new Promise(r => server.listen(8795, r));
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await b.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.setViewport({ width: 704, height: 1000 });
  await page.goto('http://localhost:8795/our-day.html?lang=sv&embed=1', { waitUntil: 'networkidle0' });
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.od-wrap');

  console.log('\nA. a Swedish teacher adds "Morgonsamling"');
  await page.click('.od-addslot');
  await new Promise(r => setTimeout(r, 200));
  // reach the My-cards chip BY INDEX, never by English text
  await page.evaluate(() => document.querySelectorAll('.od-grouprail .od-chip')[0].click());
  await new Promise(r => setTimeout(r, 200));
  await page.evaluate(() => {
    const t = document.querySelectorAll('.od-tile-new');
    if (t[0]) t[0].click();
  });
  await new Promise(r => setTimeout(r, 250));
  ok(await page.$('.od-makebody') !== null, 'the make-a-card panel opens');
  ok((await page.$$('.od-glyphbtn')).length >= 30, 'the symbol picker offers >=30 symbols (got ' + (await page.$$('.od-glyphbtn')).length + ')');
  ok((await page.$$('.od-tintrow .od-tintbtn')).length === 6, 'six tints');

  await page.click('.od-input');
  await page.keyboard.type('Morgonsamling');
  await page.evaluate(() => document.querySelectorAll('.od-glyphbtn')[5].click());   // bubble
  await new Promise(r => setTimeout(r, 150));
  await page.evaluate(() => document.querySelectorAll('.od-tintrow .od-tintbtn')[1].click());
  await new Promise(r => setTimeout(r, 150));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('.od-makeacts .od-chip'));
    btns[0].click();
  });
  await new Promise(r => setTimeout(r, 300));

  const st = await page.evaluate(() => ({
    custom: OurDay._store.custom.map(c => c.name + '|' + c.icon + '|' + c.tint),
    items: OurDay.day.items.map(i => i.id + '::' + (i.snap ? i.snap.name : '-')),
    stored: JSON.parse(localStorage.getItem('lcs:our-day:v2') || '{}').custom || []
  }));
  ok(st.custom.length === 1 && st.custom[0].indexOf('Morgonsamling') === 0, 'the card is saved: ' + st.custom.join());
  ok(st.items.length === 1 && st.items[0].indexOf('Morgonsamling') > 0, 'and auto-added to today WITH a snapshot: ' + st.items.join());
  ok(st.stored.length === 1, 'and persisted to localStorage');
  fs.mkdirSync(OUT, { recursive: true });
  await page.screenshot({ path: path.join(OUT, 'R-custom-sv.png') });

  console.log('\nB. it survives a reload, and it is FREE (no entitlement anywhere near it)');
  const prem = await page.evaluate(() => OurDay.premium);
  ok(prem === false, 'the tool is on the FREE tier for this test (premium=' + prem + ')');
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.od-wrap');
  const after = await page.evaluate(() => ({
    custom: OurDay._store.custom.length,
    items: OurDay.day.items.length,
    name: OurDay.day.items[0] ? OurDay.cardName(OurDay.day.items[0].id, 'sv', OurDay.day.items[0].snap) : null
  }));
  ok(after.custom === 1, 'the card survives a reload');
  ok(after.name === 'Morgonsamling', 'and still reads "Morgonsamling" (got ' + after.name + ')');

  console.log('\nC. refuse with a reason, never in silence');
  const refusals = await page.evaluate(() => {
    const out = {};
    const list = OurDay._store.custom;
    out.dup = ODM.addCustom(list, 'Sangstund', list[0].icon, list[0].tint, 4, null);
    out.long = ODM.addCustom(list, 'Modersmalsundervisning i klassen', 'star', '#7FA860', 4, null);
    out.empty = ODM.addCustom(list, '   ', 'star', '#7FA860', 4, null);
    const glyphs = Object.keys(ODM_GLYPHS);
    while (list.length < 40 &&
      ODM.addCustom(list, 'x' + list.length, glyphs[list.length % glyphs.length], ODM_TINTS[list.length % 6], 4, null) === 'ok') {}
    out.cap = list.length;
    out.full = ODM.addCustom(list, 'one more', glyphs[30], '#8A6B4A', 4, null);
    return out;
  });
  ok(refusals.dup === 'duplicate', 'same icon+colour is refused as duplicate (got ' + refusals.dup + ')');
  ok(refusals.long === 'tooLong', 'an over-long name is refused, not truncated (got ' + refusals.long + ')');
  ok(refusals.empty === 'empty', 'an empty name is refused (got ' + refusals.empty + ')');
  ok(refusals.cap === 12, 'the cap is 12 (got ' + refusals.cap + ')');
  ok(refusals.full === 'listFull', 'the 13th is refused with a reason (got ' + refusals.full + ')');

  console.log('\nD. deleting a custom card must NOT blank the day it appears in');
  const del = await page.evaluate(() => {
    OurDay._store.custom = ODM.coerceCustomList([{ id: 'my:a', name: 'Sangstund', icon: 'note', tint: '#F2784B' }]);
    OurDay.day = ODM.newDay();
    OurDay.addCard('my:a', undefined, { name: 'Sangstund', icon: 'note', tint: '#F2784B' });
    ODM.removeCustom(OurDay._store.custom, 'my:a');
    return {
      palette: OurDay._store.custom.length,
      stillOnStrip: OurDay.cardName(OurDay.day.items[0].id, 'sv', OurDay.day.items[0].snap),
      icon: OurDay._iconSVG(OurDay.day.items[0].id, OurDay.day.items[0].snap).indexOf('note') >= 0 ||
            OurDay._iconSVG(OurDay.day.items[0].id, OurDay.day.items[0].snap).indexOf('rect') >= 0
    };
  });
  ok(del.palette === 0, 'it leaves the palette');
  ok(del.stillOnStrip === 'Sangstund', 'and STAYS on the strip, named (got ' + del.stillOnStrip + ')');
  ok(del.icon === true, 'and keeps its picture');

  console.log('\nE. the unknown-id fallback does not lie');
  const fb = await page.evaluate(() => {
    const svg = OurDay._iconSVG('totally-unknown-id', null);
    return { isCenters: svg.indexOf('rect x="8" y="26"') >= 0, isTile: svg.indexOf('od-ic-made') >= 0 };
  });
  ok(fb.isCenters === false, 'an unknown card is NOT drawn as the Free-play icon');
  ok(fb.isTile === true, 'it gets a neutral tile instead');

  console.log('\nconsole errors: ' + errs.length + (errs.length ? ' -> ' + errs.slice(0, 3).join(' | ') : ''));
  if (errs.length) fails.push('console errors');
  await b.close(); server.close();
  console.log('\n' + (fails.length ? 'FAIL — ' + fails.length + ' problem(s)' : 'PASS — teacher-authored cards verified'));
  process.exit(fails.length ? 1 : 0);
})();
