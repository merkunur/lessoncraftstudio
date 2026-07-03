#!/usr/bin/env node
/**
 * IndexNow submitter — notifies Bing / Yandex (+ Seznam) to recrawl key URLs.
 *
 * WHY THIS EXISTS: Google retired its sitemap-ping endpoint in 2023, so the old
 * deploy.sh `google.com/ping?sitemap=…` call was a no-op. IndexNow is the live
 * protocol Bing & Yandex honor for near-real-time recrawl. Google does NOT use
 * IndexNow — the Google index is recovered via the GSC console (see
 * docs/seo/index-recovery-runbook.md). This script covers the other engines and
 * gives the post-pivot clean pages a fast Bing recrawl nudge.
 *
 * The verification key is published at https://www.lessoncraftstudio.com/<KEY>.txt
 * (frontend/public/<KEY>.txt), carved out of the middleware matcher so it is
 * served as a static file.
 *
 * Usage:
 *   node scripts/indexnow-submit.js                 # submit the default priority set
 *   node scripts/indexnow-submit.js <url> [url...]  # submit specific URLs
 *
 * Never exits non-zero — a recrawl nudge must never fail a deploy.
 * Requires Node 18+ (global fetch).
 */

const HOST = 'www.lessoncraftstudio.com';
const KEY = process.env.INDEXNOW_KEY || 'f261bd8eb7ea657cdb8051d5d8e3bc4c';
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// The 11 supported locales (CLAUDE.md §6).
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Default priority set: the locale homepages + the worksheet-maker hubs. These
// slugs are stable (locale root + a fixed path), so the set is always correct;
// Bing follows their links to the per-tool maker landings.
function defaultUrls() {
  const urls = [];
  for (const loc of LOCALES) {
    urls.push(`${ORIGIN}/${loc}`);
    urls.push(`${ORIGIN}/${loc}/worksheet-makers`);
  }
  return urls;
}

async function main() {
  if (typeof fetch !== 'function') {
    console.log('IndexNow: global fetch unavailable (need Node 18+) — skipping (non-fatal).');
    return;
  }
  const argv = process.argv.slice(2);
  const urlList = argv.length ? argv : defaultUrls();
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    // 200 = accepted; 202 = accepted, key validation pending; 4xx = problem (logged, non-fatal).
    console.log(`IndexNow: submitted ${urlList.length} URL(s) → HTTP ${res.status}`);
  } catch (err) {
    console.log(`IndexNow: submit failed (non-fatal): ${err && err.message}`);
  }
}

main();
