// Wave-1 STEP-3 live verify — render the client-grid topic hubs in a real browser
// and read the deck-card <a href> values (curl can't: DeckGridClient is hydration-gated, §A.13.50).
const puppeteer = require('puppeteer');
const B = 'https://www.lessoncraftstudio.com';
const PAGES = ['/en/topic/addition', '/en/preview/landing-hub'];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  for (const p of PAGES) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    const url = `${B}${p}?_=${Date.now()}`;
    let httpStatus = 0;
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
      httpStatus = resp ? resp.status() : 0;
    } catch (e) { console.log(`${p}: goto error ${e.message}`); await page.close(); continue; }
    // wait for any deck-card anchor to appear (client grid mount)
    await page.waitForSelector('a[href*="/decks/"], a[href*="/worksheets/"]', { timeout: 15000 }).catch(() => {});
    const hrefs = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')).filter(Boolean));
    const decks = [...new Set(hrefs.filter(h => /\/en\/decks\//.test(h)))];
    const works = [...new Set(hrefs.filter(h => /\/en\/worksheets\/[a-z0-9-]/.test(h)))];
    const worksAddImg = works.filter(h => /worksheets\/addition-image-image/.test(h));
    console.log(`\n=== ${p} (HTTP ${httpStatus}) ===`);
    console.log(`  deck-card -> /worksheets/ landings: ${works.length} distinct`);
    console.log(`  deck-card -> /decks/ assets:        ${decks.length} distinct`);
    console.log(`  wave-1 (addition-image-image -> /worksheets/): ${worksAddImg.length}`);
    const bug = decks.filter(h => /decks\/addition-image-image/.test(h));
    console.log(`  *** UNREPOINTED wave-1 (decks/addition-image-image left as /decks/): ${bug.length} ${bug.length ? 'FAIL: ' + bug.slice(0,5).join(' | ') : 'OK'}`);
    console.log(`  sample /worksheets/: ${works.slice(0, 6).join(' | ') || '(none)'}`);
    await page.close();
  }
  await browser.close();
})();
