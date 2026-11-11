#!/usr/bin/env node
/**
 * After a deploy: are the units and sub packs live as they should be? (Daily Teaching System, Part 3.) PC only (it
 * sends the QA header). It checks what an ANONYMOUS visitor and a crawler get:
 *
 *   - every unit and pack page answers 200 with its own title, one h1 and a self canonical; a pilot is
 *     `noindex, follow` and is in no sitemap shard; a live one is indexable
 *   - an address that names no unit answers 404
 *   - the Teacher-only gate: the probe says { ok: false } with the sign-up address; the file itself is a 302 to
 *     sign-up, never the PDF; a file that does not exist is 404; a malformed name is 400
 *   - saving to collections without an account is refused (401)
 *
 * What a SUBSCRIBER gets (the PDF, the bundle, the saved collection) needs a signed-in browser: the hand-over walk.
 *
 *   node scripts/units/live-check.js --loc=en
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
const C = path.join(REPO, 'frontend', 'content');
const units = readJson(path.join(C, 'units', 'units.' + loc + '.json'), { units: [] }).units;
const packs = readJson(path.join(C, 'sub-plans', 'packs.' + loc + '.json'), { packs: [] }).packs;

function req(p, method = 'GET', body = null) {
  return new Promise((resolve) => {
    const headers = Object.assign({ 'User-Agent': 'Mozilla/5.0 (lcs-units-live-check)', Accept: '*/*' }, QA, body ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } : {});
    const r = https.request({ host: HOST, path: p, method, timeout: 60000, headers }, (res) => { const chunks = []; res.on('data', (c) => chunks.push(c)); res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') })); });
    r.on('timeout', () => { r.destroy(); resolve({ status: 0, headers: {}, body: '' }); });
    r.on('error', () => resolve({ status: 0, headers: {}, body: '' }));
    if (body) r.write(body);
    r.end();
  });
}
let bad = 0, n = 0;
const check = (ok, what) => { n++; if (!ok) { bad++; console.log('FAIL  ' + what); } };

(async () => {
  // the sitemap: which addresses are listed
  const index = await req('/sitemap.xml');
  const shards = [...index.body.matchAll(/<loc>https:\/\/www\.lessoncraftstudio\.com(\/sitemap\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  check(shards.length >= 10, 'the sitemap index lists ' + shards.length + ' shards');
  let listed = '';
  for (const s of shards) listed += (await req(s)).body;

  const pages = [...units.map((u) => ['units', u, 'units/' + u.id + '/teacher-guide']), ...packs.map((p) => ['sub-plans', p, 'sub-plans/' + p.id + '/guest-teacher-pages'])];
  for (const [seg, x, file] of pages) {
    const p = '/' + loc + '/' + seg + '/' + x.slug;
    const r = await req(p);
    const who = seg + ' ' + x.id;
    check(r.status === 200, who + ': page answers ' + r.status);
    const title = (/<title>([^<]*)<\/title>/.exec(r.body) || [])[1] || '';
    check(title.replace(/&amp;/g, '&') === x.metaTitle, who + ': title is "' + title + '"');
    check((r.body.match(/<h1[\s>]/g) || []).length === 1, who + ': ' + (r.body.match(/<h1[\s>]/g) || []).length + ' h1');
    check(r.body.includes('<link rel="canonical" href="https://www.lessoncraftstudio.com' + p + '"'), who + ': canonical is not the page itself');
    const robots = (/<meta name="robots" content="([^"]*)"/.exec(r.body) || [])[1] || '';
    if (x.status === 'pilot') { check(/noindex/.test(robots) && /follow/.test(robots) && !/nofollow/.test(robots), who + ': a pilot must be noindex, follow; robots is "' + robots + '"'); check(!listed.includes(p + '<'), who + ': a pilot is in a sitemap'); }
    else check(!/noindex/.test(robots), who + ': a live page is noindex');
    // tier truth: nothing a visitor reads in the page's own content says free
    const mainText = ((/<main[\s\S]*<\/main>/.exec(r.body) || [''])[0]).replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    check(mainText.length > 500 && !/\bfree\b/i.test(mainText), who + ': the page\'s content is missing or says free');
    // the gate, as an anonymous visitor
    const gate = '/api/quota/dl?kind=teacher&loc=' + loc + '&file=' + encodeURIComponent(file);
    const probe = await req(gate + '&probe=1');
    let pj = {}; try { pj = JSON.parse(probe.body); } catch (e) { /* not JSON */ }
    check(probe.status === 200 && pj.ok === false && /\/auth\/signup/.test(pj.to || ''), who + ': the probe for an anonymous visitor answers ' + probe.status + ' ' + probe.body.slice(0, 80));
    const dl = await req(gate);
    check(dl.status === 302 && /\/auth\/signup/.test(dl.headers.location || '') && !/pdf/.test(dl.headers['content-type'] || ''), who + ': the file for an anonymous visitor answers ' + dl.status + ' ' + (dl.headers['content-type'] || '') + ' → ' + (dl.headers.location || ''));
    check(/noindex/.test(dl.headers['x-robots-tag'] || ''), who + ': the gate does not say noindex');
  }
  const none = await req('/' + loc + '/units/no-such-unit-here');
  check(none.status === 404, 'an address that names no unit answers ' + none.status);
  const none2 = await req('/' + loc + '/sub-plans/no-such-pack-here');
  check(none2.status === 404, 'an address that names no pack answers ' + none2.status);
  const missing = await req('/api/quota/dl?kind=teacher&loc=' + loc + '&file=' + encodeURIComponent('units/no-such-unit/teacher-guide'));
  check(missing.status === 404, 'a Teacher-only file that does not exist answers ' + missing.status);
  for (const f of ['../../etc/passwd', 'units/x/../../y', 'decks/x/y', 'units/X/teacher-guide']) { const r = await req('/api/quota/dl?kind=teacher&loc=' + loc + '&file=' + encodeURIComponent(f)); check(r.status === 400, 'the malformed file name "' + f + '" answers ' + r.status); }
  const direct = await req('/teacher-files/' + loc + '/units/' + (units[0] ? units[0].id : 'x') + '/teacher-guide.pdf');
  check(direct.status === 404 || direct.status === 410, 'the folder of Teacher-only files is reachable by address (' + direct.status + ')');
  if (units[0]) { const save = await req('/api/collections/from-pack', 'POST', JSON.stringify({ kind: 'unit', locale: loc, slug: units[0].slug })); check(save.status === 401, 'saving to collections without an account answers ' + save.status); }
  console.log(loc + ': ' + n + ' checks on the live site; ' + (bad ? bad + ' FAILED' : 'all pass'));
  process.exit(bad ? 1 : 0);
})();
