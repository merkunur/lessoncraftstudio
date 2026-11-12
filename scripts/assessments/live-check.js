#!/usr/bin/env node
/**
 * Checks the unit checks of a language on the LIVE site (Daily Teaching System, Part 7), after a deploy: every live
 * check has its section on the unit's page with its parts and its five files; a student form is handed out through
 * the metered path (a visitor who is not signed in is sent to sign-up, never given a 404); the answer keys and the
 * teacher pages are Teacher-only (the same visitor is sent to sign-up); a key can NOT be fetched as a form; a check
 * that is not live is not on its unit's page.
 *
 *   node scripts/assessments/live-check.js --loc=en
 *
 * A 429 is waited out (30 s, at most four times) and then reported; it is never worked around.
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
const checks = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'assessments', 'checks.' + loc + '.json'), 'utf8')).checks;
const ui = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'content', 'assessments', 'ui.' + loc + '.json'), 'utf8'));

function req1(p) {
  return new Promise((resolve) => {
    const r = https.request({ host: HOST, path: p, method: 'GET', timeout: 60000, headers: Object.assign({ 'User-Agent': 'Mozilla/5.0 (lcs-checks-live-check)', Accept: '*/*' }, QA) }, (res) => { const chunks = []; res.on('data', (c) => chunks.push(c)); res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') })); });
    r.on('timeout', () => { r.destroy(); resolve({ status: 0, headers: {}, body: '' }); });
    r.on('error', () => resolve({ status: 0, headers: {}, body: '' }));
    r.end();
  });
}
async function req(p) { for (let i = 0; ; i++) { const r = await req1(p); if (r.status !== 429 || i === 4) return r; await new Promise((res) => setTimeout(res, 30000)); } }
let bad = 0, n = 0;
const check = (ok, what) => { n++; if (!ok) { bad++; console.log('FAIL  ' + what); } };
const amp = (s) => s.replace(/&/g, '&amp;');
const dl = (kind, file) => '/api/quota/dl?kind=' + kind + '&loc=' + loc + '&file=' + encodeURIComponent(file);

(async () => {
  for (const c of checks) {
    const w = 'check ' + c.unit;
    const page = await req('/' + loc + '/units/' + c.slug);
    check(page.status === 200, w + ': the unit page answers ' + page.status);
    const has = page.body.includes('id="unit-check"');
    if (c.status !== 'live') { check(!has, w + ': a check that is not live is on its unit\'s page'); continue; }
    check(has, w + ': no section on the unit page');
    for (const p of c.parts) check(page.body.includes('href="#lesson-' + p.lesson + '"'), w + ' part ' + p.part + ': no link to its lesson');
    const files = [['form', 'check-a'], ['form', 'check-b'], ['teacher', 'key-a'], ['teacher', 'key-b'], ['teacher', 'teacher-pages']];
    for (const [kind, name] of files) {
      const href = dl(kind, 'checks/' + c.unit + '/' + name);
      check(page.body.includes('href="' + amp(href) + '"'), w + ': no link to ' + name);
      const r = await req(href);
      const to = r.headers.location || '';
      // a visitor who is not signed in: the form is a metered download (sign-up, or the file where metering lets it
      // through); a Teacher-only file is never handed out
      if (kind === 'form') check((r.status === 302 && /\/auth\/signup\?from=download|\/pricing\?from=download-limit/.test(to)) || (r.status === 200 && /pdf/.test(r.headers['content-type'] || '')), w + ' ' + name + ': answers ' + r.status + ' ' + to);
      else check(r.status === 302 && /\/auth\/signup\?from=teacher-file/.test(to), w + ' ' + name + ': a Teacher-only file answers ' + r.status + ' ' + to);
    }
    // a key can not be fetched as a form
    check((await req(dl('form', 'checks/' + c.unit + '/key-a'))).status === 400, w + ': the key is handed out through the form path');
  }
  check((await req(dl('form', 'checks/no-such-unit/check-a'))).status === 404, 'a form of a unit that does not exist is not a 404');
  check(!!ui.sectionHonest, 'the honest sentence is missing');
  // the hub (Part 7.4): one page that lists every live check and links to its unit; indexable, self-canonical, in the sitemap
  const liveChecks = checks.filter((c) => c.status === 'live');
  if (liveChecks.length && ui.hubTitle) {
    const hub = await req('/' + loc + '/assessments');
    check(hub.status === 200, 'the hub answers ' + hub.status);
    check(hub.body.includes('<link rel="canonical" href="https://' + HOST + '/' + loc + '/assessments"'), 'the hub has no canonical of its own');
    check(/<meta name="robots" content="index, follow/.test(hub.body), 'the hub is not indexable');
    check(hub.body.includes(amp(ui.hubHonest)) || hub.body.includes(ui.hubHonest.replace(/'/g, '&#x27;')), 'the hub does not say what a unit check is not');
    for (const c of liveChecks) check(hub.body.includes('href="/' + loc + '/units/' + c.slug + '#unit-check"'), 'the hub does not link to the check of ' + c.unit);
    const units = await req('/' + loc + '/units');
    check(units.body.includes('href="/' + loc + '/assessments"'), 'the units hub does not link to the assessments hub');
    const sm = await req('/sitemap/3.xml');
    check(sm.body.includes('<loc>https://' + HOST + '/' + loc + '/assessments</loc>'), 'the hub is not in the sitemap');
  }
  const live = checks.filter((c) => c.status === 'live').length;
  console.log(loc + ' unit checks: ' + live + ' live of ' + checks.length + ', ' + n + ' checks on the live site; ' + (bad ? bad + ' FAILED' : 'all pass'));
  process.exit(bad ? 1 : 0);
})();
