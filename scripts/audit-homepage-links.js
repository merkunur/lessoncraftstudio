/**
 * Homepage link gate — every link, every locale, actually fetched.
 *
 * The operator found a dead CTA: the Studio pointed at `/worksheet-creators`
 * when the route is `/worksheet-makers`. Nothing caught it —
 * audit-homepage-link-count.js only COUNTS anchors, and the responsive and
 * label gates never leave the page. A link that 404s is indistinguishable
 * from a link that works if all you do is count it.
 *
 * So this resolves them. For each locale it loads the homepage, extracts every
 * internal href, and fetches it. Anything that is not finally 200 is a
 * failure — 404 and 410 loudest, because 410 is this codebase's teardown
 * marker and a live CTA pointing into the teardown is invisible until a user
 * clicks it.
 *
 * Localized slugs mean a URL that works in `en` can be dead in `fi`, which is
 * exactly why this runs per locale rather than once.
 *
 * Usage:
 *   node scripts/audit-homepage-links.js --base=https://www.lessoncraftstudio.com \
 *     [--locales=en,de,...] [--path=/{locale}] [--concurrency=6] [--sample=0]
 *
 * --sample=N checks only the first N distinct links per locale (smoke mode).
 * Exit 1 on any dead link.
 */
const puppeteer = require('puppeteer');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const BASE = (args.base || 'http://localhost:3000').replace(/\/$/, '');
const PATH_TEMPLATE = args.path || '/{locale}';
const LOCALES = String(args.locales || 'en,de,es,fr,it,pt,nl,sv,da,no,fi').split(',').filter(Boolean);
const CONCURRENCY = Number(args.concurrency || 3);
const SAMPLE = Number(args.sample || 0);
/* Anchors that legitimately leave the site or do not resolve to a document. */
const SKIP = /^(mailto:|tel:|javascript:|#)/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ⚠ Be polite. The first version fired 8 concurrent requests per locale and
   the site's own per-IP rate limiter answered 429 to 130 of them — my audit
   reporting the rate limiter working correctly as "dead links". A 429 is a
   statement about the CLIENT, never about the link, so back off and retry
   rather than record it as a failure. */
async function headOrGet(url, attempt = 0) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'lcs-link-audit' } });
  if (res.status === 429 && attempt < 4) {
    await sleep(1200 * (attempt + 1));
    return headOrGet(url, attempt + 1);
  }
  return { status: res.status, finalUrl: res.url };
}

(async () => {
  console.log(`Homepage links — ${BASE}${PATH_TEMPLATE}  locales ${LOCALES.join(',')}`);
  const browser = await puppeteer.launch({ headless: 'new' });
  let failed = false;
  let checkedTotal = 0;

  for (const locale of LOCALES) {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (r) => (/favicon/.test(r.url()) ? r.abort() : r.continue()));
    await page.setViewport({ width: 1366, height: 900 });
    const url = BASE + PATH_TEMPLATE.replace(/\{locale\}/g, locale);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 180000 });

    const hrefs = await page.evaluate(
      (base) =>
        [...new Set(
          [...document.querySelectorAll('a[href]')]
            .map((a) => a.getAttribute('href') || '')
            .filter((h) => h && !/^(mailto:|tel:|javascript:|#)/i.test(h))
            .map((h) => (h.startsWith('http') ? h : new URL(h, location.origin).href))
            .filter((h) => h.startsWith(base) || h.startsWith(location.origin)),
        )],
      BASE,
    );
    await page.close();

    const list = SAMPLE ? hrefs.slice(0, SAMPLE) : hrefs;
    const bad = [];
    let i = 0;
    await Promise.all(
      Array.from({ length: Math.min(CONCURRENCY, list.length) }, async () => {
        while (i < list.length) {
          const u = list[i++];
          try {
            const { status } = await headOrGet(u);
            if (status !== 200) bad.push(`${status}  ${u.replace(BASE, '')}`);
          } catch (e) {
            bad.push(`ERR  ${u.replace(BASE, '')}  (${e.message})`);
          }
        }
      }),
    );
    checkedTotal += list.length;
    /* Per-locale non-vacuity. The first version only failed when NO locale
       yielded links, so a locale that returned zero — blocked, challenged, or
       simply broken — printed PASS. A locale checking nothing has verified
       nothing. */
    if (list.length === 0) {
      failed = true;
      console.log(`  ${locale.padEnd(3)}    0 links  FAIL — extracted no links at all (page blocked or broken?)`);
      continue;
    }
    if (bad.length) failed = true;
    console.log(
      `  ${locale.padEnd(3)} ${String(list.length).padStart(4)} links  ${bad.length ? `FAIL ${bad.length} dead` : 'PASS'}` +
        (bad.length ? `\n        ${bad.slice(0, 10).join('\n        ')}` : ''),
    );
  }
  await browser.close();

  // Non-vacuity: a run that found no links has verified nothing.
  if (checkedTotal === 0) {
    console.log('\nFAIL: no links were found at all — the audit checked nothing.');
    process.exit(1);
  }
  console.log(failed ? '\nFAIL: dead links on the homepage.' : `\nPASS: all ${checkedTotal} links resolve, in every locale.`);
  process.exit(failed ? 1 : 0);
})();
