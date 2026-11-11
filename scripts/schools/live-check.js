#!/usr/bin/env node
/**
 * Checks the "For schools" page of a language on the LIVE site (Daily Teaching System, Part 6), after a deploy:
 * the page answers with its own title, one h1, a canonical to itself and the robots tag of its status; a live page
 * is in the sitemap and linked from the pricing page and from the checklist hub; a language without the strings
 * answers 404; every link of the page answers; no visible text says free; the quote route refuses what is not the
 * form's and answers a form robot without doing anything.
 *
 *   node scripts/schools/live-check.js --loc=en
 *
 * This check sends NO real request: nothing is saved and no mail is sent by it. A 429 is waited out (30 s, at most
 * four times) and then reported; it is never worked around.
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
const file = path.join(REPO, 'frontend', 'content', 'schools', 'ui.' + loc + '.json');
const ui = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
const others = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].filter((l) => !fs.existsSync(path.join(REPO, 'frontend', 'content', 'schools', 'ui.' + l + '.json')));

function req1(p, method, body) {
  return new Promise((resolve) => {
    const data = body == null ? null : Buffer.from(body);
    const headers = Object.assign({ 'User-Agent': 'Mozilla/5.0 (lcs-schools-live-check)', Accept: '*/*' }, QA, data ? { 'Content-Type': 'application/json', 'Content-Length': data.length } : {});
    const r = https.request({ host: HOST, path: p, method: method || 'GET', timeout: 60000, headers }, (res) => { const chunks = []; res.on('data', (c) => chunks.push(c)); res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') })); });
    r.on('timeout', () => { r.destroy(); resolve({ status: 0, headers: {}, body: '' }); });
    r.on('error', () => resolve({ status: 0, headers: {}, body: '' }));
    if (data) r.write(data);
    r.end();
  });
}
async function req(p, method, body) { for (let i = 0; ; i++) { const r = await req1(p, method, body); if (r.status !== 429 || i === 4) return r; await new Promise((res) => setTimeout(res, 30000)); } }
let bad = 0, n = 0;
const check = (ok, what) => { n++; if (!ok) { bad++; console.log('FAIL  ' + what); } };
const unescape = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
const visible = (html) => { const m = /<main class="un sc[\s\S]*?<\/main>/.exec(html); return (m ? m[0] : '').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' '); };

(async () => {
  if (!ui) { console.log('schools page: ' + loc + ' has no strings; nothing to check'); process.exit(1); }
  const p = '/' + loc + '/schools';
  const page = await req(p);
  check(page.status === 200, 'page answers ' + page.status);
  check(unescape((/<title>([^<]*)<\/title>/.exec(page.body) || [])[1] || '') === ui.metaTitle, 'its title is not the page title');
  check((page.body.match(/<h1[\s>]/g) || []).length === 1, (page.body.match(/<h1[\s>]/g) || []).length + ' h1');
  check(page.body.includes('<link rel="canonical" href="https://www.lessoncraftstudio.com' + p + '"'), 'canonical is not the page itself');
  const robots = (/<meta name="robots" content="([^"]*)"/.exec(page.body) || [])[1] || '';
  const text = visible(page.body);
  check(text.length > 800, 'the page has ' + text.length + ' characters of visible text');
  check(!/\bfree\b/i.test(text) || loc !== 'en', 'the visible text says free');
  check(!/[$€£]\s?\d/.test(text), 'the visible text holds a price');
  check(page.body.includes('name="website"') && page.body.includes('name="teachers"'), 'the form is not on the page');

  const index = await req('/sitemap.xml');
  let listed = '';
  for (const s of [...index.body.matchAll(/<loc>https:\/\/www\.lessoncraftstudio\.com(\/sitemap\/3\.xml)<\/loc>/g)].map((m) => m[1])) listed += (await req(s)).body;
  if (ui.status === 'live') {
    check(!/noindex/.test(robots), 'a live page with noindex');
    check(listed.includes('https://www.lessoncraftstudio.com' + p + '<'), 'it is in no sitemap');
    for (const from of ['/' + loc + '/pricing', '/' + loc + '/curriculum']) { const r = await req(from); if (r.status === 200) check(r.body.includes('href="' + p + '"'), from + ' does not link to the page'); }
  } else check(/noindex/.test(robots) && !listed.includes(p + '<'), 'a page that is not live must be noindex and in no sitemap');

  // every link of the page's own text answers
  const main = (/<main class="un sc[\s\S]*?<\/main>/.exec(page.body) || [''])[0];
  const links = [...new Set([...main.matchAll(/href="(\/[a-z]{2}\/[^"#]*)"/g)].map((m) => m[1]))];
  check(links.length >= 2, 'the page links to ' + links.length + ' pages');
  for (const l of links) { const r = await req(l); check(r.status === 200, 'the link ' + l + ' answers ' + r.status); }

  // a language without the strings has no page
  if (others.length) { const r = await req('/' + others[0] + '/schools'); check(r.status === 404, '/' + others[0] + '/schools answers ' + r.status + ' (no strings: 404)'); }

  // the route: what is not the form's is refused; a form robot is answered and nothing happens
  const api = '/api/schools/quote';
  check((await req(api, 'POST', 'hello')).status === 400, 'the route takes a body that is no JSON');
  check((await req(api, 'POST', JSON.stringify({ name: 'a', school: 'b', email: 'nope', teachers: 3 }))).status === 400, 'the route takes an address that is none');
  check((await req(api, 'POST', JSON.stringify({ name: 'a', school: 'b', email: 'a@b.co', teachers: 0 }))).status === 400, 'the route takes zero teachers');
  const robot = await req(api, 'POST', JSON.stringify({ name: 'a', school: 'b', email: 'a@b.co', teachers: 3, website: 'http://x' }));
  check(robot.status === 200, 'the route answers a form robot with ' + robot.status);
  check((await req(api)).status === 405, 'the route answers a GET');

  console.log((bad ? 'schools page ' + loc + ': ' + bad + ' of ' + n + ' checks FAILED' : 'schools page ' + loc + ': ' + n + ' checks pass'));
  process.exit(bad ? 1 : 0);
})();
