#!/usr/bin/env node
/**
 * identity-snapshot.js — proves that EXISTING indexed pages kept their search identity.
 *
 * Daily Teaching System, PLAN.md §5 rule 1: no part of that programme may change the title,
 * meta description, canonical, robots directive, h1 or hreflang set of a page that is already
 * live, and no sitemap shard may lose a URL. This script records those fields for a FIXED
 * sample of live URLs (taken from every sitemap shard + a short hand list) and compares a
 * later capture with the recorded one.
 *
 *   --build-sample [--per-shard=24]   read the live sitemaps, write the fixed sample
 *   --capture --out=<file>            fetch every sample URL + every shard, write a snapshot
 *   --compare=<baseline>              capture again and diff against <baseline>
 *                                       exit 0 identical · 1 a field or a shard changed
 *                                       exit 3 INCONCLUSIVE (a URL could not be measured)
 *   --self-test                       poison test: a changed field MUST fail, an identical
 *                                       snapshot MUST pass, a short measurement MUST be inconclusive
 *   --origin=127.0.0.1                (on Hetzner) talk to nginx directly instead of Cloudflare
 *
 * From the PC the request carries the QA header (scripts/lib/qa-header.js); without it
 * Cloudflare challenges automated requests.
 *
 * Limits, stated so nobody over-reads a PASS: it is a sample (about 280 of ~55,700 URLs),
 * and nginx caches static landings for up to an hour, so a compare run right after a deploy
 * can read the pre-deploy bytes of a landing. Re-run it an hour later before calling a
 * landing change-free.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..', '..');
const DIR = path.join(ROOT, 'docs', 'SEO', 'daily-system-baseline');
const SAMPLE = path.join(DIR, 'sample.json');
const HOSTNAME = 'www.lessoncraftstudio.com';
const BASE = 'https://' + HOSTNAME;
const QA = require('../lib/qa-header').headers();

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const has = (k) => process.argv.includes('--' + k);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ORIGIN = arg('origin', '');

/* pages that are not in any sitemap but whose directives must not move either */
const EXTRA = [
  '/en/worksheets', '/de/worksheets', '/fi/worksheets', '/en/worksheets/sets', '/en/worksheets/sets/k002', '/de/worksheets/sets/g1245',
  '/en/activities', '/sv/activities',
  '/en/tools', '/en/worksheet-makers', '/en/pricing', '/de/pricing', '/en/standards/K.CC.B.4', '/es/standards/K.CC.B.4',
  '/en', '/de', '/fr', '/es', '/pt', '/it', '/nl', '/sv', '/da', '/no', '/fi',
];

function get(url) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const opts = {
      host: ORIGIN || u.hostname, servername: u.hostname, port: 443, path: u.pathname + u.search, method: 'GET', timeout: 30000,
      headers: Object.assign({ Host: u.hostname, 'User-Agent': 'Mozilla/5.0 (lcs-identity-snapshot)', Accept: 'text/html,application/xml' }, QA),
      rejectUnauthorized: !ORIGIN,
    };
    const req = https.request(opts, (res) => {
      const c = []; res.on('data', (x) => c.push(x));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(c).toString('utf8') }));
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

const strip = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
function attr(tag, name) { const m = new RegExp('\\b' + name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\')', 'i').exec(tag); return m ? (m[2] !== undefined ? m[2] : m[3]) : null; }
function tags(html, re) { return html.match(re) || []; }

/** the identity fields of one HTML document */
function identity(res) {
  const html = res.body || '';
  const head = (/<head[\s\S]*?<\/head>/i.exec(html) || [html])[0];
  const metas = tags(head, /<meta\b[^>]*>/gi);
  const links = tags(head, /<link\b[^>]*>/gi);
  const metaBy = (n) => { const t = metas.find((m) => (attr(m, 'name') || '').toLowerCase() === n); return t ? attr(t, 'content') : null; };
  const canon = links.find((l) => (attr(l, 'rel') || '').toLowerCase() === 'canonical');
  const hreflang = links.filter((l) => (attr(l, 'rel') || '').toLowerCase() === 'alternate' && attr(l, 'hreflang'))
    .map((l) => attr(l, 'hreflang') + ' ' + attr(l, 'href')).sort();
  const h1s = tags(html, /<h1\b[^>]*>[\s\S]*?<\/h1>/gi);
  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(head);
  return {
    status: res.status,
    location: res.headers.location || null,
    title: title ? strip(title[1]) : null,
    description: metaBy('description'),
    canonical: canon ? attr(canon, 'href') : null,
    robots: metaBy('robots'),
    xRobotsTag: res.headers['x-robots-tag'] || null,
    h1Count: h1s.length,
    h1: h1s.length ? strip(h1s[0]) : null,
    hreflang,
  };
}
const FIELDS = ['status', 'location', 'title', 'description', 'canonical', 'robots', 'xRobotsTag', 'h1Count', 'h1', 'hreflang'];

async function shardList() {
  const idx = await getRetry(BASE + '/sitemap.xml');
  if (idx.status !== 200) throw new Error('sitemap index answered ' + idx.status);
  return [...idx.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
async function shardUrls(loc) {
  const r = await getRetry(loc);
  if (r.status !== 200) return null;
  /* a <url> entry's own <loc> only — never the <image:loc> lines inside it */
  return [...r.body.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function buildSample() {
  const per = +arg('per-shard', 24);
  const shards = await shardList();
  const urls = [];
  for (const loc of shards) {
    const all = await shardUrls(loc);
    if (!all || !all.length) throw new Error('shard unreadable: ' + loc);
    const sorted = [...all].sort();
    const k = Math.min(per, sorted.length);
    for (let i = 0; i < k; i++) urls.push({ url: sorted[Math.floor((i * sorted.length) / k)], shard: loc.replace(BASE, '') });
    console.log(loc.replace(BASE, ''), all.length, 'urls →', k, 'sampled');
  }
  /* a hand-listed page that a shard already gave us is kept once (with its shard) */
  const seen = new Set(urls.map((u) => u.url));
  for (const p of EXTRA) if (!seen.has(BASE + p)) { seen.add(BASE + p); urls.push({ url: BASE + p, shard: null }); }
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(SAMPLE, JSON.stringify({ built: new Date().toISOString().slice(0, 10), perShard: per, urls }, null, 1));
  console.log('sample:', urls.length, 'urls →', path.relative(ROOT, SAMPLE));
}

async function capture() {
  if (!fs.existsSync(SAMPLE)) throw new Error('no sample — run --build-sample first');
  const sample = JSON.parse(fs.readFileSync(SAMPLE, 'utf8'));
  const snap = { captured: new Date().toISOString(), via: ORIGIN ? 'origin ' + ORIGIN : 'edge', shards: {}, pages: {}, unmeasured: [] };
  const shardSets = {};
  for (const loc of await shardList()) {
    const all = await shardUrls(loc); const key = loc.replace(BASE, '');
    if (!all) { snap.unmeasured.push(key); continue; }
    snap.shards[key] = all.length; shardSets[key] = new Set(all);
  }
  let n = 0;
  for (const s of sample.urls) {
    const r = await getRetry(s.url);
    if (!r.status || r.status === 429 || r.status >= 500) { snap.unmeasured.push(s.url); continue; }
    const id = identity(r);
    id.inShard = s.shard ? !!(shardSets[s.shard] && shardSets[s.shard].has(s.url)) : null;
    snap.pages[s.url] = id;
    if (++n % 40 === 0) process.stdout.write(n + ' ');
    await sleep(+arg('delay', 150));
  }
  console.log('\nmeasured', Object.keys(snap.pages).length, 'of', sample.urls.length, 'pages;', Object.keys(snap.shards).length, 'shards');
  return snap;
}

/** pure: every difference between two snapshots */
function diff(base, now) {
  const out = [];
  for (const [k, n] of Object.entries(base.shards)) {
    if (!(k in now.shards)) continue; // reported as unmeasured
    if (now.shards[k] < n) out.push({ kind: 'shard-shrank', where: k, was: n, is: now.shards[k] });
  }
  for (const [url, b] of Object.entries(base.pages)) {
    const c = now.pages[url]; if (!c) continue; // reported as unmeasured
    for (const f of FIELDS) {
      const x = JSON.stringify(b[f]), y = JSON.stringify(c[f]);
      if (x !== y) out.push({ kind: 'field', where: url, field: f, was: b[f], is: c[f] });
    }
    if (b.inShard === true && c.inShard === false) out.push({ kind: 'left-sitemap', where: url });
  }
  return out;
}
/** pure: what the baseline holds that the new capture could not measure */
function missing(base, now) {
  return Object.keys(base.pages).filter((u) => !now.pages[u]).concat(Object.keys(base.shards).filter((k) => !(k in now.shards)));
}
function verdict(base, now) {
  const d = diff(base, now), m = missing(base, now);
  return { diffs: d, missing: m, code: d.length ? 1 : (m.length ? 3 : 0) };
}

function selfTest() {
  const base = {
    shards: { '/sitemap/0.xml': 100 },
    pages: { 'https://x/a': { status: 200, location: null, title: 'T', description: 'D', canonical: 'https://x/a', robots: 'index, follow', xRobotsTag: null, h1Count: 1, h1: 'H', hreflang: ['en https://x/a'], inShard: true } },
  };
  const clone = () => JSON.parse(JSON.stringify(base));
  const cases = [];
  const expect = (name, got, want) => cases.push({ name, ok: got === want, got, want });
  expect('identical snapshot passes', verdict(base, clone()).code, 0);
  for (const f of FIELDS) {
    const p = clone(); const page = p.pages['https://x/a'];
    page[f] = f === 'hreflang' ? ['en https://x/a', 'de https://x/de/a'] : (typeof page[f] === 'number' ? page[f] + 1 : 'CHANGED');
    expect('a changed ' + f + ' fails', verdict(base, p).code, 1);
  }
  { const p = clone(); p.shards['/sitemap/0.xml'] = 99; expect('a shard that lost a URL fails', verdict(base, p).code, 1); }
  { const p = clone(); p.shards['/sitemap/0.xml'] = 140; expect('a shard that GREW passes (new pages are allowed)', verdict(base, p).code, 0); }
  { const p = clone(); p.pages['https://x/a'].inShard = false; expect('a page that left its sitemap fails', verdict(base, p).code, 1); }
  { const p = clone(); delete p.pages['https://x/a']; expect('an unmeasured page is INCONCLUSIVE, not a pass', verdict(base, p).code, 3); }
  { const p = clone(); delete p.shards['/sitemap/0.xml']; expect('an unmeasured shard is INCONCLUSIVE, not a pass', verdict(base, p).code, 3); }
  {
    const html = '<html><head><title> A  title </title><meta name="description" content="Desc"><meta content="noindex, follow" name="robots"><link rel="canonical" href="https://x/c"><link rel="alternate" hreflang="de" href="https://x/de"><link rel="alternate" hreflang="en" href="https://x/en"></head><body><h1 class="a">One <em>two</em></h1></body></html>';
    const id = identity({ status: 200, headers: { 'x-robots-tag': 'noindex' }, body: html });
    expect('parser reads the title', id.title, 'A title');
    expect('parser reads the description', id.description, 'Desc');
    expect('parser reads robots with attributes in either order', id.robots, 'noindex, follow');
    expect('parser reads the canonical', id.canonical, 'https://x/c');
    expect('parser reads the h1 text', id.h1, 'One two');
    expect('parser sorts hreflang', id.hreflang.join('|'), 'de https://x/de|en https://x/en');
    expect('parser reads the header directive', id.xRobotsTag, 'noindex');
  }
  let bad = 0;
  for (const c of cases) { if (!c.ok) bad++; console.log((c.ok ? 'PASS ' : 'FAIL ') + c.name + (c.ok ? '' : '  got ' + c.got + ', want ' + c.want)); }
  console.log(bad ? bad + ' self-test case(s) FAILED' : 'self-test: ' + cases.length + ' cases pass');
  process.exit(bad ? 1 : 0);
}

(async () => {
  if (has('self-test')) return selfTest();
  if (has('build-sample')) return buildSample();
  if (has('capture')) {
    const out = arg('out'); if (!out) throw new Error('--capture needs --out=<file>');
    const snap = await capture();
    fs.writeFileSync(path.resolve(out), JSON.stringify(snap, null, 1));
    if (snap.unmeasured.length) { console.log('UNMEASURED (' + snap.unmeasured.length + '):\n  ' + snap.unmeasured.join('\n  ')); process.exit(3); }
    return;
  }
  const basePath = arg('compare');
  if (basePath) {
    const base = JSON.parse(fs.readFileSync(path.resolve(basePath), 'utf8'));
    const now = await capture();
    const v = verdict(base, now);
    for (const d of v.diffs) console.log('CHANGED  ' + d.kind + '  ' + d.where + (d.field ? '  [' + d.field + ']' : '') + '\n    was: ' + JSON.stringify(d.was) + '\n    is:  ' + JSON.stringify(d.is));
    for (const [k, n] of Object.entries(now.shards)) if (base.shards[k] !== undefined && n > base.shards[k]) console.log('grew     ' + k + '  ' + base.shards[k] + ' → ' + n + '  (allowed)');
    if (v.missing.length) console.log('UNMEASURED (' + v.missing.length + '):\n  ' + v.missing.join('\n  '));
    console.log(v.code === 0 ? 'IDENTITY PASS — ' + Object.keys(base.pages).length + ' pages and ' + Object.keys(base.shards).length + ' shards unchanged'
      : v.code === 1 ? 'IDENTITY FAIL — ' + v.diffs.length + ' difference(s)' : 'INCONCLUSIVE — ' + v.missing.length + ' item(s) could not be measured; this is NOT a pass');
    process.exit(v.code);
  }
  console.log('usage: --build-sample | --capture --out=<file> | --compare=<baseline> | --self-test');
  process.exit(2);
})().catch((e) => { console.error('identity-snapshot: ' + e.message); process.exit(2); });
