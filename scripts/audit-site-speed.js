/**
 * Site-wide speed gate — every public page TYPE, on a real device profile.
 *
 * Why this exists: the homepage was optimised three times while the rest of the
 * site went unmeasured. This walks one representative URL per page type and
 * reports LCP / CLS / TBT / transfer against Core Web Vitals budgets.
 *
 *   node scripts/audit-site-speed.js                 # low-end Android, median of 3
 *   node scripts/audit-site-speed.js --runs=5
 *   node scripts/audit-site-speed.js --device=all    # every device class
 *   node scripts/audit-site-speed.js --save=base.json --compare=base.json
 *
 * ⚠ MEDIANS, NEVER A SINGLE RUN. On a 6x-throttled headless browser the same
 * URL varies by ~70% run to run; an early single-run pass here produced a
 * physically impossible NEGATIVE cost for an embed. One run is not evidence.
 *
 * ⚠ The UA is deliberately NOT overridden to a mobile string: that trips the
 * Cloudflare bot challenge and you end up timing an interstitial. Device class
 * is set by viewport + CPU throttle + network shaping, which is what matters.
 */
const fs = require('fs');
const puppeteer = require('puppeteer');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const BASE = (args.base || 'https://www.lessoncraftstudio.com').replace(/\/$/, '');
const RUNS = Number(args.runs || 3);

const NET = {
  slow: { downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8, latency: 150 },
  fast: { downloadThroughput: (4 * 1024 * 1024) / 8, uploadThroughput: (3 * 1024 * 1024) / 8, latency: 20 },
  cable: { downloadThroughput: (20 * 1024 * 1024) / 8, uploadThroughput: (5 * 1024 * 1024) / 8, latency: 5 },
};
const DEVICES = [
  { name: 'Low-end Android', w: 360, h: 740, dpr: 2, cpu: 6, net: 'slow' },
  { name: 'Mid Android', w: 412, h: 915, dpr: 2.6, cpu: 4, net: 'slow' },
  { name: 'iPhone-class', w: 390, h: 844, dpr: 3, cpu: 2, net: 'fast' },
  { name: 'Tablet', w: 820, h: 1180, dpr: 2, cpu: 2, net: 'fast' },
  { name: 'Laptop', w: 1366, h: 768, dpr: 1, cpu: 1, net: 'cable' },
];

/* One representative URL per public page TYPE. Deck and landing are the two
   served outside Next, and they are the control: if they regress, the cause is
   nginx or the generator, not React. */
const PAGES = [
  ['homepage', '/en/'],
  ['worksheets landing', '/en/worksheets/beginning-sounds-4th-of-july-b'],
  ['worksheets hub', '/en/worksheets/'],
  ['deck (nginx)', '/en/decks/find-and-count-letter-spotting-4th-of-july/'],
  ['activity', '/en/activities/count-to-10-with-animals'],
  ['activities index', '/en/activities/'],
  ['tool', '/en/tools/ten-frame'],
  ['tools hub', '/en/tools/'],
  ['topic page', '/en/topic/addition/'],
  ['worksheet-makers', '/en/worksheet-makers/'],
  ['standards hub', '/en/standards/'],
  ['pricing', '/en/pricing/'],
];

const BUDGET = { lcp: 2500, cls: 0.1, tbt: 300 };
const median = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];

async function measure(browser, dev, url) {
  const page = await browser.newPage();
  const cdp = await page.target().createCDPSession();
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, ...NET[dev.net] });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: dev.cpu });
  await page.setViewport({ width: dev.w, height: dev.h, deviceScaleFactor: dev.dpr, isMobile: dev.cpu > 1, hasTouch: dev.cpu > 1 });
  let bytes = 0;
  page.on('response', async (r) => { try { bytes += (await r.buffer()).length; } catch { /* redirects, aborts */ } });
  await page.evaluateOnNewDocument(() => {
    window.__lt = []; window.__cls = 0; window.__lcp = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push(e.duration); }).observe({ type: 'longtask', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  let failed = false;
  try { await page.goto(url, { waitUntil: 'networkidle2', timeout: 180000 }); }
  catch { failed = true; }
  await new Promise((r) => setTimeout(r, 2500));
  const m = failed ? null : await page.evaluate(() => ({
    lcp: Math.round(window.__lcp),
    cls: +window.__cls.toFixed(3),
    tbt: Math.round(window.__lt.reduce((a, d) => a + Math.max(0, d - 50), 0)),
  }));
  await page.close();
  return m ? { ...m, kb: Math.round(bytes / 1024) } : null;
}

(async () => {
  const devices = args.device === 'all' ? DEVICES : [DEVICES[0]];
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const out = {};
  let over = 0, measured = 0;

  for (const dev of devices) {
    console.log(`\n=== ${dev.name} (${dev.w}px, ${dev.cpu}x CPU, ${dev.net}) — median of ${RUNS} ===`);
    console.log('  page                  LCP       CLS      TBT       transfer  over budget');
    for (const [name, path] of PAGES) {
      const runs = [];
      for (let i = 0; i < RUNS; i++) {
        const r = await measure(browser, dev, `${BASE}${path}${path.includes('?') ? '&' : '?'}cb=${Date.now()}${i}`);
        if (r) runs.push(r);
      }
      if (!runs.length) { console.log(`  ${name.padEnd(21)} ALL RUNS FAILED`); over++; continue; }
      const r = { lcp: median(runs.map((x) => x.lcp)), cls: median(runs.map((x) => x.cls)), tbt: median(runs.map((x) => x.tbt)), kb: median(runs.map((x) => x.kb)) };
      out[`${dev.name}|${name}`] = r;
      measured++;
      const bad = [r.lcp > BUDGET.lcp && 'LCP', r.cls > BUDGET.cls && 'CLS', r.tbt > BUDGET.tbt && 'TBT'].filter(Boolean);
      if (bad.length) over++;
      console.log(`  ${name.padEnd(21)} ${String(r.lcp + 'ms').padEnd(9)} ${String(r.cls).padEnd(8)} ${String(r.tbt + 'ms').padEnd(9)} ${String(r.kb + 'KB').padEnd(9)} ${bad.join(' ') || '—'}`);
    }
  }
  await browser.close();

  /* Non-vacuity: a run that measured nothing must not report success. */
  if (measured === 0) { console.log('\nFAIL: measured nothing — the harness is broken, not the site.'); process.exit(1); }

  if (args.save) { fs.writeFileSync(args.save, JSON.stringify(out, null, 2)); console.log(`\nSaved baseline -> ${args.save}`); }
  if (args.compare) {
    const before = JSON.parse(fs.readFileSync(args.compare, 'utf8'));
    console.log('\n=== vs baseline (negative = faster) ===');
    for (const k of Object.keys(out)) {
      const b = before[k]; if (!b) continue;
      const d = (f) => { const v = out[k][f] - b[f]; return (v > 0 ? '+' : '') + v; };
      console.log(`  ${k.padEnd(34)} LCP ${d('lcp').padStart(6)}ms  TBT ${d('tbt').padStart(6)}ms  ${d('kb').padStart(5)}KB`);
    }
  }
  console.log(`\n${over} of ${measured} page/device combinations exceed a Core Web Vitals budget.`);
})();
