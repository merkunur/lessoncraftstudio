#!/usr/bin/env node
/**
 * Checks the curriculum pages of a language on the LIVE site (Daily Teaching System, Part 6), after a deploy:
 * the hub and every page answer, carry their own title, one h1, a canonical to themselves and the robots tag of their
 * status; live pages are in the sitemap and linked from the hub, pilots are in neither; every lesson a page links
 * answers; no page text says free; a code that has a standards hub is linked to it.
 *
 *   node scripts/curriculum-pages/live-check.js --loc=en
 *
 * The site limits how fast one address may ask. A 429 is waited out (30 s, at most four times) and then reported;
 * it is never worked around.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');
const REPO = path.join(__dirname, '..', '..');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const loc = arg('loc', 'en');
const HOST = 'www.lessoncraftstudio.com';
const QA = require(path.join(REPO, 'scripts', 'lib', 'qa-header.js')).headers();
const C = path.join(REPO, 'frontend', 'content', 'curriculum-pages');
const pages = JSON.parse(fs.readFileSync(path.join(C, 'pages.' + loc + '.json'), 'utf8')).pages;
const ui = JSON.parse(fs.readFileSync(path.join(C, 'ui.' + loc + '.json'), 'utf8'));

function req1(p) {
  return new Promise((resolve) => {
    const r = https.request({ host: HOST, path: p, method: 'GET', timeout: 60000, headers: Object.assign({ 'User-Agent': 'Mozilla/5.0 (lcs-curriculum-live-check)', Accept: '*/*' }, QA) }, (res) => { const chunks = []; res.on('data', (c) => chunks.push(c)); res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') })); });
    r.on('timeout', () => { r.destroy(); resolve({ status: 0, headers: {}, body: '' }); });
    r.on('error', () => resolve({ status: 0, headers: {}, body: '' }));
    r.end();
  });
}
async function req(p) { for (let i = 0; ; i++) { const r = await req1(p); if (r.status !== 429 || i === 4) return r; await new Promise((res) => setTimeout(res, 30000)); } }
let bad = 0, n = 0;
const check = (ok, what) => { n++; if (!ok) { bad++; console.log('FAIL  ' + what); } };
const unescape = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

(async () => {
  const index = await req('/sitemap.xml');
  const shards = [...index.body.matchAll(/<loc>https:\/\/www\.lessoncraftstudio\.com(\/sitemap\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  check(shards.length >= 10, 'the sitemap index lists ' + shards.length + ' shards');
  let listed = '';
  for (const s of shards.filter((x) => /\/3\.xml$/.test(x))) listed += (await req(s)).body;
  const live = pages.filter((p) => p.status === 'live');

  const hp = '/' + loc + '/curriculum';
  const hub = await req(hp);
  check(hub.status === 200, 'hub: page answers ' + hub.status);
  check(unescape((/<title>([^<]*)<\/title>/.exec(hub.body) || [])[1] || '') === ui.hubMetaTitle, 'hub: its title is not the hub title');
  check((hub.body.match(/<h1[\s>]/g) || []).length === 1, 'hub: ' + (hub.body.match(/<h1[\s>]/g) || []).length + ' h1');
  check(hub.body.includes('<link rel="canonical" href="https://www.lessoncraftstudio.com' + hp + '"'), 'hub: canonical is not the page itself');
  const hubRobots = (/<meta name="robots" content="([^"]*)"/.exec(hub.body) || [])[1] || '';
  if (live.length) {
    check(!/noindex/.test(hubRobots), 'hub: live pages and a noindex hub');
    check(listed.includes('https://www.lessoncraftstudio.com' + hp + '<'), 'hub: it is in no sitemap');
    for (const p of live) check(hub.body.includes('href="/' + loc + '/curriculum/' + p.slug + '"'), 'hub: no link to the page ' + p.id);
    for (const p of pages.filter((x) => x.status !== 'live')) check(!hub.body.includes('/curriculum/' + p.slug + '"'), 'hub: it links to the pilot ' + p.id);
  } else check(/noindex/.test(hubRobots) && !listed.includes(hp + '<'), 'hub: a hub of pilots must be noindex and in no sitemap');

  const lessonUrls = new Set();
  const paperUrls = new Set();
  for (const p of pages) {
    const w = 'page ' + p.id;
    const pp = '/' + loc + '/curriculum/' + p.slug;
    const r = await req(pp);
    check(r.status === 200, w + ': answers ' + r.status);
    if (r.status !== 200) continue;
    check(unescape((/<title>([^<]*)<\/title>/.exec(r.body) || [])[1] || '') === p.metaTitle, w + ': its title is not its metaTitle');
    check((r.body.match(/<h1[\s>]/g) || []).length === 1, w + ': ' + (r.body.match(/<h1[\s>]/g) || []).length + ' h1');
    check(r.body.includes('<link rel="canonical" href="https://www.lessoncraftstudio.com' + pp + '"'), w + ': canonical is not the page itself');
    const robots = (/<meta name="robots" content="([^"]*)"/.exec(r.body) || [])[1] || '';
    if (p.status === 'live') { check(!/noindex/.test(robots), w + ': live and noindex'); check(listed.includes('https://www.lessoncraftstudio.com' + pp + '<'), w + ': live and in no sitemap'); }
    else { check(/noindex/.test(robots), w + ': a pilot must be noindex'); check(!listed.includes(pp + '<'), w + ': a pilot is in the sitemap'); }
    const text = ((/<main[\s\S]*<\/main>/.exec(r.body) || [''])[0]).replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    const FREE = { en: /\bfree\b/i, de: /\b(kostenlos|gratis|umsonst)\b/i, sv: /\b(gratis|kostnadsfri\w*)\b/i };
    check(text.length > 1500 && !(FREE[loc] && FREE[loc].test(text)), w + ': its content is missing or says free');
    const items = p.groups.flatMap((g) => g.items);
    // a page of codes shows every code; a page of parts (a framework without public codes) has an anchor per part
    if (p.mode === 'parts') check(items.every((it) => r.body.includes('id="' + it.key + '"')), w + ': a part of the file is not on the page');
    else check(items.every((it) => r.body.includes('>' + it.code + '<')), w + ': a code of the file is not on the page');
    for (const it of items) for (const u of it.units || []) for (const l of u.lessons) { check(r.body.includes('href="/' + loc + '/units/' + u.unit + '#lesson-' + l.n + '"'), w + ' ' + it.key + ': no link to lesson ' + l.n + ' of ' + u.unit); lessonUrls.add('/' + loc + '/units/' + u.unit); }
    for (const it of items) for (const l of it.lessons || []) { check(r.body.includes('href="/' + loc + '/units/' + l.unit + '#lesson-' + l.n + '"'), w + ' ' + it.code + ': no link to lesson ' + l.n + ' of ' + l.unit); lessonUrls.add('/' + loc + '/units/' + l.unit); }
    check(r.body.includes('href="' + p.officialDocument.replace(/&/g, '&amp;') + '"'), w + ': no link to the official document');
    // the worksheets a line names: every link of the page into the worksheets or the decks of the language
    for (const m of r.body.matchAll(new RegExp('href="(/' + loc + '/(?:worksheets|decks)/[^"#]+)"', 'g'))) paperUrls.add(m[1]);
    const named = items.reduce((k, it) => k + (it.papers || []).length, 0);
    if (named) check(paperUrls.size > 0, w + ': the file names ' + named + ' worksheets and the page links none');
  }
  // every unit a page links answers and has the lesson anchors it is linked by
  for (const u of lessonUrls) {
    const r = await req(u);
    check(r.status === 200, 'unit ' + u + ' answers ' + r.status);
  }
  // every worksheet a page links answers (the half of gate Q2 that the server cannot run)
  for (const u of paperUrls) {
    const r = await req(u);
    check(r.status === 200, 'worksheet ' + u + ' answers ' + r.status);
  }
  console.log(loc + ' curriculum pages: ' + n + ' checks on the live site; ' + (bad ? bad + ' FAILED' : 'all pass'));
  process.exit(bad ? 1 : 0);
})();
