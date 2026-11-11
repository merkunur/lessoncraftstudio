#!/usr/bin/env node
/**
 * Does every page, file and link a unit or a sub pack names answer on the LIVE site? (Daily Teaching System, the one
 * gate of PLAN.md §4: "every referenced asset exists and answers 200 in that locale".) PC only: it sends the QA
 * header (scripts/lib/qa-header.js) so that Cloudflare lets a script through.
 *
 *   node scripts/units/check-live.js --loc=en
 *
 * Checked per worksheet page: the page itself, its thumbnail and its printable PDF; per tool, activity and maker:
 * the page. One request at a time, 150 ms apart; a 429 or a 5xx is waited out once and then reported, never forced.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const QA = require('../lib/qa-header').headers();
const HOST = 'www.lessoncraftstudio.com';
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (e) { return d; } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const C = path.join(REPO, 'frontend', 'content');
const units = readJson(path.join(C, 'units', 'units.' + loc + '.json'), { units: [] }).units;
const packs = readJson(path.join(C, 'sub-plans', 'packs.' + loc + '.json'), { packs: [] }).packs;

function head(p, method = 'HEAD') {
  return new Promise((resolve) => {
    const req = https.request({ host: HOST, path: encodeURI(p), method, timeout: 30000, headers: Object.assign({ 'User-Agent': 'Mozilla/5.0 (lcs-units-check-live)', Accept: '*/*' }, QA) }, (res) => { res.resume(); resolve({ status: res.statusCode, type: res.headers['content-type'] || '' }); });
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, type: 'timeout' }); });
    req.on('error', (e) => resolve({ status: 0, type: e.code || 'error' }));
    req.end();
  });
}

(async () => {
  const want = new Map();   // path → [who names it, the content type it must have]
  const add = (p, who, type) => { if (!want.has(p)) want.set(p, [who, type]); };
  const page = (slug, who, landing) => {
    add('/' + loc + '/decks/' + slug + '/', who, 'html');
    add('/' + loc + '/decks/' + slug + '/thumbnail.png', who, 'image');
    add('/' + loc + '/decks/' + slug + '/' + slug + '-printable.pdf', who, 'pdf');
    if (landing) add('/' + loc + '/worksheets/' + landing, who, 'html');
  };
  for (const u of units) for (const l of u.lessons) {
    const who = u.id + ' lesson ' + l.n;
    for (const p of l.paper) { page(p.core, who, p.landing); if (p.easy) page(p.easy, who); if (p.hard) page(p.hard, who); }
    if (l.exit) page(l.exit.slug, who);
    if (l.screen && l.screen.kind === 'page') page(l.screen.slug, who);
    if (l.screen && l.screen.kind === 'activity') add('/' + loc + '/activities/' + l.screen.slug, who, 'html');
    if (l.tool) add('/' + loc + '/tools/' + l.tool.slug, who, 'html');
    if (l.maker) add('/' + loc + '/worksheet-makers/' + l.maker.slug, who, 'html');
  }
  for (const p of packs) for (const b of p.blocks) { const who = p.id + ' block ' + b.key; page(b.core, who); if (b.easy) page(b.easy, who); if (b.hard) page(b.hard, who); }
  let bad = 0, n = 0;
  for (const [p, [who, type]] of want) {
    let r = await head(p);
    if (r.status === 405 || r.status === 403) r = await head(p, 'GET');
    if (r.status === 429 || r.status >= 500 || r.status === 0) { await sleep(20000); r = await head(p, 'GET'); }
    n++;
    const ok = r.status === 200 && r.type.includes(type);
    if (!ok) { bad++; console.log('FAIL  ' + r.status + ' ' + r.type.split(';')[0] + '  ' + p + '  (' + who + ')'); }
    await sleep(150);
  }
  console.log(loc + ': ' + n + ' addresses of ' + units.length + ' unit(s) and ' + packs.length + ' pack(s) checked on the live site; ' + (bad ? bad + ' do not answer as they should' : 'all answer'));
  process.exit(bad ? 1 : 0);
})();
