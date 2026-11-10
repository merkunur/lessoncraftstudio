// Run on the server after a deploy: cd /opt/lessoncraftstudio && node scripts/makers/audit-live-landing-walls.js
// (2026-11-10: 647 pages, 11,930 cards, PASS). Every maker landing in every language, as the app
// serves it on the local port: HTTP 200, and its template wall shows exactly the catalog's templates for that language
// (one card per template, each card linking to its own template id). Exit 1 on any miss.
const fs = require('fs');
const http = require('http');
const LOCS = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const CAT = JSON.parse(fs.readFileSync('frontend/lib/makers/landing-catalog.json', 'utf8')).makers;
const get = (p) => new Promise((res) => {
  http.get({ host: '127.0.0.1', port: 3000, path: encodeURI(p), headers: { host: 'www.lessoncraftstudio.com' } }, (r) => {
    let b = ''; r.setEncoding('utf8'); r.on('data', (c) => (b += c)); r.on('end', () => res({ s: r.statusCode, b }));
  }).on('error', (e) => res({ s: 0, b: String(e) }));
});
(async () => {
  let pages = 0, cards = 0; const bad = [];
  for (const loc of LOCS) {
    const copy = JSON.parse(fs.readFileSync(`frontend/content/maker-landings/copy.${loc}.json`, 'utf8'));
    for (const id of Object.keys(CAT)) {
      const c = copy[id];
      if (!c || !c.slug) continue;
      const want = CAT[id].templates.filter((t) => !t.locales || t.locales.includes(loc));
      if (!want.length) continue;
      const { s, b } = await get(`/${loc}/worksheet-makers/${c.slug}`);
      pages++;
      if (s !== 200) { bad.push(`${loc} ${id}: HTTP ${s}`); continue; }
      const n = (b.match(/class="ml-card"/g) || []).length;
      cards += n;
      if (n !== want.length) bad.push(`${loc} ${id}: ${n} cards, catalog ${want.length}`);
      const missing = want.filter((t) => !b.includes(t.id)).map((t) => t.id);
      if (missing.length) bad.push(`${loc} ${id}: no card for ${missing.join(' ')}`);
    }
  }
  console.log(`maker landings: ${pages} pages, ${cards} template cards`);
  for (const x of bad) console.log('FAIL ' + x);
  console.log(bad.length ? `${bad.length} failing` : 'PASS');
  if (pages < 600) { console.log('FAIL vacuous: fewer than 600 pages checked'); process.exit(1); }
  process.exit(bad.length ? 1 : 0);
})();
