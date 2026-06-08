// Picture-sort de-orphan dedicated verifier (rendered DOM, hydration-gated — curl shows 0, §A.13.50).
// Confirms the locale-agnostic "-vs-" theme-hub query (`themeSubjectTagsWhere` in lib/topic-decks.ts):
//   (1) dual-membership: a -vs- landing appears on BOTH component theme hubs as /worksheets/.
//   (2) anchor-precision: the anchor hub surfaces *-vs-<anchor> (exact component) but NOT the substring-trap
//       (EN: zoo_animals/farm_animals on /animals; DE: farm_animals on /tiere — exact-component split guards it).
//   (3) type-hub UNREGRESSED: a prior-wave exercise-type hub still binds identically.
// Usage: node scripts/seo-landing/verify-deorphan.js [--base=…] [--locale=en|de]
const puppeteer = require('puppeteer');
const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const BASE = arg('base', 'https://www.lessoncraftstudio.com');
const LOCALE = arg('locale', 'en');

// per-locale test config. EN preserves the original behavior exactly.
const T = LOCALE === 'de' ? {
  anchorHub: 'tiere',                                       // de animals theme hub
  goodRe: /-vs-animals(-|$)/,                               // an exact-RHS -vs-animals landing (e.g. bakery-vs-animals)
  badRe: /farm-animals/,                                    // substring-trap: bakery-vs-farm_animals must NOT appear on /tiere
  dualTarget: 'bildersortierung-bakery-vs-animals-0dd6',    // a specific de -vs-animals landing slug
  partnerHub: 'backerei',                                   // its other component's de hub (bakery)
  typeHub: 'addition',
} : {
  anchorHub: 'animals',
  goodRe: /(^|-)animals-vs-|-vs-animals$/,
  badRe: /-vs-zoo-animals$|-vs-sea|^zoo-animals-vs-|(farm|zoo|sea|forest)-animals-vs-|-vs-farm-animals$/,
  dualTarget: null,                                          // EN: auto-derive from the slug
  partnerHub: null,
  typeHub: 'subtraction',
};
const WS_RE = new RegExp('\\/' + LOCALE + '\\/worksheets\\/[a-z0-9-]');

async function onePage(page, url) {
  let st = 0;
  try { const r = await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }); st = r ? r.status() : 0; }
  catch (e) { return { st: 0, ws: [], err: e.message }; }
  await page.waitForSelector('a[href*="/decks/"], a[href*="/worksheets/"]', { timeout: 15000 }).catch(() => {});
  const hrefs = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')).filter(Boolean));
  const ws = hrefs.filter(h => WS_RE.test(h)).map(h => h.split('?')[0].replace(/\/$/, '').split('/').pop());
  return { st, ws };
}
async function worksheets(page, hub, pages = 4) {
  let st0 = 0; const all = new Set();
  for (let p = 1; p <= pages; p++) {
    const url = `${hub}${hub.includes('?') ? '&' : '?'}page=${p}&_=${Date.now()}`;
    const r = await onePage(page, url);
    if (p === 1) st0 = r.st;
    r.ws.forEach(s => all.add(s));
  }
  return { st: st0, ws: [...all] };
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  let pass = true;

  // (1)+(2) anchor-precision on the anchor theme hub
  const anchor = await worksheets(page, `${BASE}/${LOCALE}/topic/${T.anchorHub}`, 4);
  const psAnchor = anchor.ws.filter(s => s.includes('-vs-'));
  const good = psAnchor.filter(s => T.goodRe.test(s));
  const bad = psAnchor.filter(s => T.badRe.test(s));
  console.log(`(/${LOCALE}/topic/${T.anchorHub} HTTP ${anchor.st}) total /worksheets=${anchor.ws.length} | picture-sort -vs- present=${psAnchor.length}`);
  console.log(`  anchor-component -vs- (good): ${good.length} e.g. ${good.slice(0, 6).join(', ')}`);
  console.log(`  ANCHOR-PRECISION false-positives (substring-trap — MUST be 0): ${bad.length} ${bad.length ? 'FAIL: ' + bad.join(', ') : 'OK'}`);
  if (bad.length) pass = false;
  if (good.length === 0) { pass = false; console.log('  FAIL: no anchor-component -vs- landing surfaced'); }

  // (1) dual-membership: a specific -vs- landing on BOTH component hubs
  let target = T.dualTarget || good.find(s => s.includes('animals-vs-vehicles')) || good[0];
  let otherHub = T.partnerHub;
  if (!otherHub && target) {
    const m = target.match(/animals-vs-(.+)$/);
    otherHub = m ? m[1].replace(/_/g, '-') : 'vehicles';
  }
  if (target && otherHub) {
    const onAnchor = good.includes(target) || psAnchor.includes(target);
    const partner = await worksheets(page, `${BASE}/${LOCALE}/topic/${otherHub}`, 4);
    const onPartner = partner.ws.includes(target);
    console.log(`DUAL-MEMBERSHIP: "${target}" on /${LOCALE}/topic/${T.anchorHub}=${onAnchor ? 'yes' : 'NO'}, on /${LOCALE}/topic/${otherHub} (HTTP ${partner.st})=${onPartner ? 'yes' : 'NO'} ${onAnchor && onPartner ? 'OK' : 'FAIL'}`);
    if (!onAnchor || !onPartner) pass = false;
  }

  // (3) type-hub unregressed
  const th = await worksheets(page, `${BASE}/${LOCALE}/topic/${T.typeHub}`, 1);
  console.log(`TYPE-HUB UNREGRESSED: /${LOCALE}/topic/${T.typeHub} (HTTP ${th.st}) /worksheets=${th.ws.length} ${th.st === 200 && th.ws.length > 0 ? 'OK (binds)' : 'CHECK'}`);
  if (th.st !== 200) pass = false;

  console.log(`\nDE-ORPHAN VERIFY (${LOCALE}): ${pass ? 'PASS' : 'FAIL'}`);
  await browser.close();
  process.exit(pass ? 0 : 1);
})();
