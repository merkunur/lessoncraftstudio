#!/usr/bin/env node
/**
 * Which hosts does a browser talk to when it opens pages a child reaches through a class link? (Legal decision of
 * 2026-11-14, condition E3: none but this site.) A dev run on the PC against the LIVE site; read only.
 *
 *   node scripts/class-results/tests/live-hosts.js [--origin] [address ...]
 *
 * Without addresses it opens a deck page with a screen, an activity page and a maker play page of the list below.
 * Every request the browser makes is recorded (also the ones a stylesheet starts: font files). The run fails when a
 * request goes to another host, or when a page's own fonts did not load (a page that fell back to the device's font
 * would pass the first check for the wrong reason).
 */
'use strict';
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const HOST = 'www.lessoncraftstudio.com';
const pages = process.argv.slice(2).filter((a) => /^https:/.test(a));
// --beacon: also check the analytics (needs patch-nginx-class-beacon.py on the server): the first address is opened a
// second time as a class visit
const BEACON = process.argv.includes('--beacon');
const LIST = pages.length ? pages : [
  ...(BEACON ? ['https://' + HOST + '/en/decks/addition-image-image/#lcs=abcdefghjkmnpqrstuvw'] : []),
  'https://' + HOST + '/en/decks/addition-image-image/',
  'https://' + HOST + '/de/decks/fehlersuchbilder-schwer-k397-20/',
  'https://' + HOST + '/mini-tools/ten-frame-activity.html',
];
(async () => {
  // Cloudflare answers an automated browser with a challenge page (403). --origin opens the same addresses on the
  // origin server itself: the name is resolved to the server, whose own certificate is one only Cloudflare trusts.
  const ORIGIN = process.argv.includes('--origin');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--disable-blink-features=AutomationControlled'].concat(ORIGIN ? ['--host-resolver-rules=MAP ' + HOST + ' 65.108.5.250', '--ignore-certificate-errors'] : []) });
  let bad = 0;
  for (const url of LIST) {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36');
    const hosts = {}; const fonts = []; const paths = [];
    page.on('request', (rq) => { let h; try { h = new URL(rq.url()).host; } catch (e) { return; } if (/^(data|blob|about):/.test(rq.url())) return; hosts[h] = (hosts[h] || 0) + 1; try { paths.push(new URL(rq.url()).pathname); } catch (e) { /* not an address */ } });
    page.on('response', (rs) => { if (/\.woff2?(\?|$)/.test(rs.url())) fonts.push(rs.status() + ' ' + new URL(rs.url()).host); });
    let status = 0;
    try { const r = await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 }); status = r ? r.status() : 0; } catch (e) { status = -1; }
    await new Promise((r) => setTimeout(r, 1500));
    const loaded = await page.evaluate(() => (document.fonts ? [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')) : [])).catch(() => []);
    const other = Object.keys(hosts).filter((h) => h !== HOST);
    // the analytics: counted on an ordinary visit, silent on a class visit (an address with #lcs=<token>, or /c/…)
    // --poison: every visit is judged as a class visit, so the ordinary ones (which ARE counted) must fail the check
    const classVisit = process.argv.includes('--poison') || /#lcs=[a-z2-9]{20}/.test(url) ||/\/c\//.test(new URL(url).pathname);
    const core = paths.includes('/lcs-insights-core.js'), sent = paths.includes('/api/send');
    // (a page that carries no analytics tag at all, like an activity's own file, has nothing to count)
    const tagged = await page.evaluate(() => !!document.querySelector('script[src*="lcs-insights.js"]')).catch(() => false);
    const beaconOk = BEACON ? (classVisit || !tagged ? !core && !sent : core && sent) : true;
    const ok = status === 200 && !other.length && fonts.length > 0 && fonts.every((f) => f.startsWith('200 ' + HOST)) && beaconOk;
    if (!ok) bad++;
    console.log((ok ? 'ok    ' : 'FAIL  ') + url + '\n        status ' + status + ' · requests ' + JSON.stringify(hosts) + ' · font files ' + fonts.length + (fonts.length ? ' (' + [...new Set(fonts)].join(', ') + ')' : '') + ' · families shown: ' + [...new Set(loaded)].join(', ') + (BEACON ? ' · ' + (classVisit ? 'class visit' : tagged ? 'ordinary visit' : 'no analytics tag') + ': analytics script ' + (core ? 'loaded' : 'not loaded') + ', visit ' + (sent ? 'sent' : 'not sent') : ''));
    await page.close();
  }
  await browser.close();
  console.log(bad ? '\n' + bad + ' page(s) FAILED' : '\nevery page talks to ' + HOST + ' only, and its fonts loaded');
  process.exit(bad ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
