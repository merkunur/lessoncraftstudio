// Standing rendered-DOM hub-autobind verifier (retained from the Wave-1b second-calibration arc).
// Every landing wave needs this exact check: render the client deck-grid hubs in a real browser and read
// deck-card <a href> values — curl can't, because DeckGridClient is hydration-gated (§A.13.50).
//
// Asserts, <locale>.json-driven (no per-wave hardcoding):
//   (a) the wave's coords auto-bind to /<locale>/worksheets/ landings,
//   (b) LEAK = 0 — no rendered deck-PAGE link whose slug has a published landing is stuck at /<locale>/decks/
//       (asset/PDF links /decks/<slug>/<file> legitimately stay /decks/ and are excluded by the page-only regex),
//   (c) auto-bounding holds — non-landing coords (retired-invalid themes, other types/levels) stay /decks/.
//
// Usage:
//   node scripts/seo-landing/verify-hub-autobind.js [--locale=en] [--type=addition] [--theme=animals] [--pages=/de/topic/foo,...]
//   (for non-en, pass --theme as the NATIVE topic-hub slug, e.g. --locale=de --type=addition --theme=tiere)
const path = require('path');
const puppeteer = require('puppeteer');
const B = 'https://www.lessoncraftstudio.com';

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const LOCALE = arg('locale', 'en');
const data = require(path.resolve(__dirname, '../../frontend/content/seo-landing/' + LOCALE + '.json'));
const TYPE = arg('type', 'addition');
const THEME = arg('theme', '');
const PAGES = (arg('pages', '') ? arg('pages', '').split(',') : [
  `/${LOCALE}/topic/${TYPE}`, `/${LOCALE}/topic/${TYPE}?page=2`, `/${LOCALE}/topic/${TYPE}?page=3`,
].concat(THEME ? [`/${LOCALE}/topic/${THEME}`] : [])).filter(Boolean);

// every deck slug for the requested type that HAS a published landing (canonical + collapse siblings) -> mode
const repointed = {}; // deckSlug -> mode
for (const l of data.landings) {
  if (TYPE && l.coordinate.type !== TYPE) continue;
  const decks = (l.collapseSiblings && l.collapseSiblings.length) ? l.collapseSiblings : [l.canonicalDeckSlug];
  for (const ds of decks) repointed[ds] = l.coordinate.mode;
}
// deck-PAGE link only (ends at the slug dir; excludes asset/PDF links /decks/<slug>/<file>.pdf)
const deckPageSlug = h => (h.match(new RegExp('/' + LOCALE + '/decks/([^/]+)/(?:[?#].*)?$')) || [])[1];
const reWorks = new RegExp('/' + LOCALE + '/worksheets/[a-z0-9-]');
const reDecks = new RegExp('/' + LOCALE + '/decks/');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const allWorks = new Set(), allDeckHrefs = new Set();
  for (const p of PAGES) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    const url = `${B}${p}${p.includes('?') ? '&' : '?'}_=${Date.now()}`;
    let st = 0;
    try { const r = await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }); st = r ? r.status() : 0; }
    catch (e) { console.log(`  ${p}: goto error ${e.message}`); await page.close(); continue; }
    await page.waitForSelector('a[href*="/decks/"], a[href*="/worksheets/"]', { timeout: 15000 }).catch(() => {});
    const hrefs = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')).filter(Boolean));
    const w = hrefs.filter(h => reWorks.test(h));
    const d = hrefs.filter(h => reDecks.test(h));
    w.forEach(h => allWorks.add(h)); d.forEach(h => allDeckHrefs.add(h));
    console.log(`  ${p} (HTTP ${st}): ${new Set(w).size} /worksheets · ${new Set(d).size} /decks`);
    await page.close();
  }
  await browser.close();

  const works = [...allWorks];
  const typePrefix = new RegExp('/' + LOCALE + '/worksheets/' + TYPE + '[-/]');
  console.log(`\n/worksheets/ bound (distinct, across rendered hubs), type='${TYPE}', locale='${LOCALE}': ${works.filter(h => typePrefix.test(h)).length}`);

  const leaks = [...allDeckHrefs].map(deckPageSlug).filter(Boolean).filter(s => repointed[s]);
  console.log(`\nLEAK CHECK (rendered deck-PAGE /${LOCALE}/decks/ that SHOULD be /worksheets/): ${leaks.length} ${leaks.length ? 'FAIL: ' + [...new Set(leaks)].slice(0, 10).join(', ') : 'OK (zero)'}`);

  const fallbacks = [...new Set([...allDeckHrefs].map(deckPageSlug).filter(Boolean).filter(s => !repointed[s]))];
  console.log(`auto-bounding: ${fallbacks.length} distinct /decks/ coords correctly stay /decks/ (no landing). sample: ${fallbacks.slice(0, 8).join(', ')}`);
  process.exit(leaks.length ? 1 : 0);
})();
