#!/usr/bin/env node
/**
 * audit-launch-coverage.js — every page, not a sample. Run on the server after a deploy (operator goal 2026-11-06: every
 * worksheet, deck and topic page leads to its maker; Google needs real images for the 647 landings).
 *
 *   node scripts/makers/audit-launch-coverage.js decks        every deck.html carries the band and its link is live
 *   node scripts/makers/audit-launch-coverage.js landings     every static worksheet landing and Level Set hub has the band
 *   node scripts/makers/audit-launch-coverage.js topics       every topic URL in the sitemap renders the band
 *   node scripts/makers/audit-launch-coverage.js images       every image in sitemap shard 10 exists; share images are 1200×630
 *
 * Reads the disk and the local Next port, so nothing here waits on Cloudflare. Exit 1 on any miss.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const DECKS = '/var/www/lcs-media/decks';
const LANDINGS = '/var/www/lcs-media/landings';
const PREVIEWS = '/var/www/lcs-media/maker-previews';
const REPO = path.join(__dirname, '..', '..');
const links = require('../lib/maker-links');
const MARK = 'LCS_MAKER_RIBBON_START';

function fail(list, label) {
  if (!list.length) return false;
  console.log(`FAIL ${label}: ${list.length}`);
  for (const x of list.slice(0, 12)) console.log('  ' + x);
  return true;
}

function get(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { headers: { 'x-forwarded-proto': 'https', host: 'www.lessoncraftstudio.com' } }, (res) => {
      const parts = [];
      res.on('data', (d) => parts.push(d));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(parts).toString('utf8'), location: res.headers.location }));
    });
    req.on('error', (e) => resolve({ status: 0, body: String(e.message) }));
    req.setTimeout(60000, () => req.destroy(new Error('timeout')));
  });
}

async function decks() {
  const live = new Set();
  for (const l of LOCALES) {
    const copy = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend/content/maker-landings', `copy.${l}.json`), 'utf8'));
    for (const id of Object.keys(copy)) live.add(`/${l}/worksheet-makers/${copy[id].slug}`);
    live.add(`/${l}/worksheet-makers`);
  }
  let total = 0, maker = 0, hub = 0;
  const miss = [], dead = [], wrong = [];
  for (const l of LOCALES) {
    const seen = new Set();
    const dir = path.join(DECKS, l);
    for (const e of fs.readdirSync(dir)) {
      if (e.startsWith('.')) continue;
      let real;
      try { real = fs.realpathSync(path.join(dir, e)); } catch (_) { continue; }
      if (seen.has(real)) continue;
      seen.add(real);
      const f = path.join(real, 'deck.html');
      if (!fs.existsSync(f)) continue;
      const s = fs.readFileSync(f, 'utf8');
      total++;
      const at = s.indexOf(MARK);
      if (at === -1) { miss.push(`${l}/${e}`); continue; }
      const block = s.slice(at, s.indexOf('LCS_MAKER_RIBBON_END', at));
      const hrefs = [...block.matchAll(/href="https:\/\/www\.lessoncraftstudio\.com([^"]+)"/g)].map((m) => m[1]);
      for (const h of hrefs) {
        if (!live.has(h)) dead.push(`${l}/${e} -> ${h}`);
        if (!h.startsWith(`/${l}/`)) wrong.push(`${l}/${e} -> ${h}`);
      }
      if (hrefs.some((h) => h !== `/${l}/worksheet-makers`)) maker++; else hub++;
    }
    console.log(`${l}: done, running total ${total}`);
  }
  console.log(`decks ${total}: to a maker ${maker}, to the hub ${hub}`);
  const a = fail(miss, 'no band'), b = fail(dead, 'link to no landing'), c = fail(wrong, 'wrong language');
  return !(a || b || c);
}

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (e.name.endsWith('.html')) out.push(f);
  }
  return out;
}

async function landings() {
  let total = 0;
  const miss = [];
  for (const l of LOCALES) {
    const files = walk(path.join(LANDINGS, l), []);
    for (const f of files) {
      total++;
      if (!fs.readFileSync(f, 'utf8').includes('lcs-maker-ribbon')) miss.push(path.relative(LANDINGS, f));
    }
    console.log(`${l}: ${files.length} static pages`);
  }
  console.log(`static landings and hubs ${total}`);
  return !fail(miss, 'no band');
}

async function sitemapUrls() {
  const urls = [];
  for (const shard of ['2', '3']) {
    const r = await get(`http://127.0.0.1:3000/sitemap/${shard}.xml`);
    for (const m of r.body.matchAll(/<loc>https:\/\/www\.lessoncraftstudio\.com([^<]+)<\/loc>/g)) urls.push(m[1]);
  }
  return [...new Set(urls)];
}

async function topics() {
  const all = await sitemapUrls();
  const topicUrls = all.filter((u) => /^\/[a-z]{2}\/topic(\/|$)/.test(u));
  console.log(`topic URLs in the sitemap: ${topicUrls.length}`);
  const miss = [], bad = [];
  let i = 0, done = 0;
  async function worker() {
    while (i < topicUrls.length) {
      const u = topicUrls[i++];
      const r = await get('http://127.0.0.1:3000' + u);
      done++;
      if (r.status !== 200) bad.push(`${r.status} ${u}`);
      else if (!/class="mrb[ "]/.test(r.body)) miss.push(u);
      if (done % 2000 === 0) console.log(`  ${done}`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  const a = fail(bad, 'not 200'), b = fail(miss, 'no band');
  return !(a || b);
}

async function images() {
  const sharp = require(path.join(REPO, 'frontend/node_modules/sharp'));
  const r = await get('http://127.0.0.1:3000/sitemap/10.xml');
  const imgs = [...r.body.matchAll(/<image:loc>https:\/\/www\.lessoncraftstudio\.com\/maker-previews\/([^<]+)<\/image:loc>/g)].map((m) => m[1]);
  const pages = [...r.body.matchAll(/<loc>/g)].length;
  const missing = imgs.filter((p) => !fs.existsSync(path.join(PREVIEWS, p)));
  console.log(`sitemap shard 10: ${pages} pages, ${imgs.length} images`);
  const bad = [];
  let og = 0;
  for (const maker of fs.readdirSync(PREVIEWS)) {
    const d = path.join(PREVIEWS, maker);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const l of fs.readdirSync(d)) {
      const f = path.join(d, l, 'og.jpg');
      if (!fs.existsSync(f)) continue;
      og++;
      const m = await sharp(f).metadata();
      const size = fs.statSync(f).size;
      if (m.width !== 1200 || m.height !== 630 || size < 20000 || size > 400000) bad.push(`${maker}/${l} ${m.width}x${m.height} ${size}`);
    }
  }
  console.log(`share images ${og}`);
  const a = fail(missing, 'image in the sitemap not on disk'), b = fail(bad, 'share image off spec');
  const c = og !== 647 ? (console.log(`FAIL expected 647 share images, found ${og}`), true) : false;
  return !(a || b || c);
}

const jobs = { decks, landings, topics, images };
const job = jobs[process.argv[2]];
if (!job) { console.log('usage: audit-launch-coverage.js decks|landings|topics|images'); process.exit(2); }
job().then((ok) => { console.log(ok ? 'PASS' : 'FAIL'); process.exit(ok ? 0 : 1); });
void links;
