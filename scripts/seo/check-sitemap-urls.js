#!/usr/bin/env node
/**
 * Every URL the sitemap submits must be one Google can index: 200 (no redirect), no `noindex` in the
 * robots meta or the X-Robots-Tag header, and a canonical that names the URL itself.
 *
 * WHY (2026-11-26). Search Console's Page indexing, filtered to the sitemap, reported 711 submitted URLs
 * "Excluded by 'noindex' tag". A sitemap that submits pages it also tells Google not to index sends two
 * contradicting signals and teaches Google to trust the sitemap less. Nothing checked this: the identity
 * snapshot (scripts/seo/identity-snapshot.js) compares ~280 sampled pages with a baseline, so a page that
 * was ALREADY noindex in the baseline, or a new route that lists noindex pages, passes it.
 *
 * It reads what is SERVED (the live shards and the live pages through nginx), never the source.
 *
 * Usage (on Hetzner):
 *   node scripts/seo/check-sitemap-urls.js --origin=127.0.0.1               sample: N URLs per shard x section (default 4)
 *   node scripts/seo/check-sitemap-urls.js --origin=127.0.0.1 --sample=20
 *   node scripts/seo/check-sitemap-urls.js --origin=127.0.0.1 --full --out=/root/sitemap-check.txt
 *        every URL; static pages (decks, landings) 4 at a time, Next.js pages ONE at a time with a pause,
 *        because an uncached grade topic page takes ~12 s to render and 8 parallel requests raised the load.
 *   node scripts/seo/check-sitemap-urls.js --self-test                       the judge, both directions
 * Exit: 0 every checked URL is indexable · 1 at least one is not · 3 could not measure (a shard failed to
 * load, or fewer URLs than a sitemap of this site must hold) — never a pass.
 */
'use strict';
const fs = require('fs');
const https = require('https');
const zlib = require('zlib');

const HOSTNAME = 'www.lessoncraftstudio.com';
const BASE = 'https://' + HOSTNAME;
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const has = (k) => process.argv.includes('--' + k);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ORIGIN = arg('origin', '');
let QA = {};
try { QA = require('../lib/qa-header').headers(); } catch { /* on the server the origin needs no QA header */ }

/** The sitemap of this site has held 55,000+ page URLs since 11 Nov 2026; far fewer means the read failed. */
const MIN_URLS = 40000;

function get(url) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const req = https.request({
      host: ORIGIN || u.hostname, servername: u.hostname, port: 443, path: u.pathname + u.search, method: 'GET', timeout: 60000,
      headers: Object.assign({ Host: u.hostname, 'User-Agent': 'Mozilla/5.0 (lcs-sitemap-check)', Accept: 'text/html,application/xml', 'Accept-Encoding': 'gzip' }, QA),
      rejectUnauthorized: !ORIGIN,
    }, (res) => {
      const c = []; res.on('data', (x) => c.push(x));
      res.on('end', () => {
        let buf = Buffer.concat(c);
        if (/gzip/i.test(res.headers['content-encoding'] || '')) { try { buf = zlib.gunzipSync(buf); } catch { /* judged as unreadable below */ } }
        resolve({ status: res.statusCode, headers: res.headers, body: buf.toString('utf8') });
      });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', (e) => resolve({ status: 0, headers: {}, body: '', error: e.message }));
    req.end();
  });
}
async function getRetry(url) {
  for (let i = 0; i < 3; i++) {
    const r = await get(url);
    if (r.status && r.status !== 429 && r.status < 500) return r;
    await sleep(3000 * (i + 1));
  }
  return get(url);
}

function attr(tag, name) { const m = new RegExp('\\b' + name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\')', 'i').exec(tag); return m ? (m[2] !== undefined ? m[2] : m[3]) : null; }

/** The problems of one fetched URL; an empty list means Google may index it. */
function judge(url, res) {
  const out = [];
  if (res.status !== 200) {
    out.push(res.status >= 300 && res.status < 400 ? `redirect ${res.status} -> ${res.headers.location || '?'}` : `status ${res.status || res.error || 'none'}`);
    return out;
  }
  const xr = String(res.headers['x-robots-tag'] || '');
  if (/noindex/i.test(xr)) out.push(`X-Robots-Tag: ${xr}`);
  const head = (/<head[\s\S]*?<\/head>/i.exec(res.body) || [res.body])[0];
  for (const m of head.match(/<meta\b[^>]*>/gi) || []) {
    const name = (attr(m, 'name') || '').toLowerCase();
    if ((name === 'robots' || name === 'googlebot') && /noindex/i.test(attr(m, 'content') || '')) out.push(`meta ${name}: ${attr(m, 'content')}`);
  }
  const canon = (head.match(/<link\b[^>]*>/gi) || []).find((l) => (attr(l, 'rel') || '').toLowerCase() === 'canonical');
  const href = canon ? attr(canon, 'href') : null;
  if (!href) out.push('no canonical');
  else if (href !== url) out.push(`canonical -> ${href}`);
  return out;
}

/** decks and landings are files nginx serves without Next.js; everything else is rendered */
const isStatic = (u) => /^https:\/\/[^/]+\/[a-z]{2}\/(decks|worksheets)\/[^/?]+\/?$/.test(u);
const section = (u) => { const p = new URL(u).pathname.split('/').filter(Boolean); return p.length > 1 ? p[1] : '(root)'; };

function selfTest() {
  let bad = 0;
  const page = (head, headers = {}, status = 200) => ({ status, headers, body: `<html><head>${head}</head><body><p>noindex is a word on this page</p></body></html>` });
  const U = 'https://www.lessoncraftstudio.com/en/topic/addition';
  const C = `<link rel="canonical" href="${U}">`;
  const cases = [
    ['an indexable page passes', page(C + '<meta name="robots" content="index, follow">'), 0],
    ['the word noindex in the body text passes (ban not too wide)', page(C), 0],
    ['content before name still parses', page(C + '<meta content="noindex, follow" name="robots">'), 1],
    ['a noindex meta fails', page(C + '<meta name="robots" content="noindex, follow">'), 1],
    ['a googlebot noindex meta fails', page(C + '<meta name="googlebot" content="noindex">'), 1],
    ['a noindex header fails', page(C, { 'x-robots-tag': 'noindex, indexifembedded' }), 1],
    ['a nofollow-only header passes', page(C, { 'x-robots-tag': 'nofollow' }), 0],
    ['a redirect fails', page('', { location: U + '/' }, 308), 1],
    ['a 404 fails', page('', {}, 404), 1],
    ['a 404 that carries a perfect canonical still fails (the status alone decides)', page(C, {}, 404), 1],
    ['a 308 that carries a perfect canonical still fails', page(C, { location: U + '/' }, 308), 1],
    ['a missing canonical fails', page(''), 1],
    ['a canonical to another URL fails', page(`<link rel="canonical" href="${U}/">`), 1],
  ];
  for (const [name, res, want] of cases) {
    const got = judge(U, res).length > 0 ? 1 : 0;
    if (got !== want) { bad++; console.log(`FAIL  ${name}: judged ${got ? 'not indexable' : 'indexable'}`); }
    else console.log(`ok    ${name}`);
  }
  if (!isStatic('https://www.lessoncraftstudio.com/de/decks/x-k027/') || isStatic(U)) { bad++; console.log('FAIL  static/rendered split'); }
  console.log(bad ? `${bad} self-test case(s) FAILED` : 'self-test: all cases pass');
  return bad ? 1 : 0;
}

async function main() {
  if (has('self-test')) process.exit(selfTest());
  const full = has('full');
  const sampleN = Number(arg('sample', '4'));
  const pauseMs = Number(arg('pause-ms', full ? '250' : '50'));

  const idx = await getRetry(BASE + '/sitemap.xml');
  if (idx.status !== 200) { console.log(`COULD NOT MEASURE: sitemap index answered ${idx.status}`); process.exit(3); }
  const shards = [...idx.body.matchAll(/<sitemap>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [];
  for (const s of shards) {
    const r = await getRetry(s);
    if (r.status !== 200) { console.log(`COULD NOT MEASURE: ${s} answered ${r.status}`); process.exit(3); }
    /* a <url> entry's own <loc> only, never the <image:loc> inside it */
    const locs = [...r.body.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
    for (const u of locs) urls.push({ shard: s.replace(BASE, ''), url: u });
  }
  if (urls.length < MIN_URLS) { console.log(`COULD NOT MEASURE: only ${urls.length} URLs in ${shards.length} shards`); process.exit(3); }

  let pick = urls;
  if (!full) {
    const by = new Map();
    for (const x of urls) { const k = x.shard + ' ' + section(x.url); if (!by.has(k)) by.set(k, []); by.get(k).push(x); }
    pick = [];
    for (const list of by.values()) {
      const n = Math.min(sampleN, list.length);
      for (let j = 0; j < n; j++) pick.push(list[Math.floor((j * list.length) / n)]); // evenly spread, so all languages appear
    }
  }
  console.log(`${urls.length} URLs in ${shards.length} shards; checking ${pick.length}${full ? ' (full)' : ` (sample ${sampleN} per shard x section)`}`);

  const fails = [];
  const tally = new Map();
  const count = (k, ok) => { const t = tally.get(k) || { ok: 0, bad: 0 }; t[ok ? 'ok' : 'bad']++; tally.set(k, t); };
  const check = async (x) => {
    const res = await getRetry(x.url);
    const p = judge(x.url, res);
    count(x.shard + ' ' + section(x.url), p.length === 0);
    if (p.length) fails.push(`${x.shard}\t${x.url}\t${p.join('; ')}`);
  };
  const stat = pick.filter((x) => isStatic(x.url));
  const rend = pick.filter((x) => !isStatic(x.url));
  for (let i = 0; i < stat.length; i += 4) await Promise.all(stat.slice(i, i + 4).map(check));
  for (const x of rend) { await check(x); await sleep(pauseMs); }

  for (const [k, t] of [...tally].sort()) if (t.bad || full) console.log(`  ${k.padEnd(40)} ok ${t.ok}  NOT INDEXABLE ${t.bad}`);
  const out = arg('out', '');
  if (out) fs.writeFileSync(out, fails.join('\n') + '\n');
  if (fails.length) {
    console.log(`\n${fails.length} of ${pick.length} sitemap URL(s) are NOT indexable:`);
    for (const f of fails.slice(0, 40)) console.log('  ' + f);
    process.exit(1);
  }
  console.log(`PASS: all ${pick.length} checked sitemap URLs are 200, indexable and self-canonical.`);
}
main().catch((e) => { console.log('COULD NOT MEASURE: ' + e.message); process.exit(3); });
