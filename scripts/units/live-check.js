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
const unitsFile = readJson(path.join(C, 'units', 'units.' + loc + '.json'), { units: [] });
const units = unitsFile.units;
const plans = unitsFile.plans || [];
const uiU = readJson(path.join(C, 'units', 'ui.' + loc + '.json'), {});
const uiS = readJson(path.join(C, 'sub-plans', 'ui.' + loc + '.json'), {});
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

  const pages = [...units.map((u) => ['units', u, 'units/' + u.id + '/teacher-guide']), ...plans.map((p) => ['units', p, 'units/' + p.id + '/scope-and-sequence']), ...packs.map((p) => ['sub-plans', p, 'sub-plans/' + p.id + '/guest-teacher-pages'])];
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
    else { check(!/noindex/.test(robots), who + ': a live page is noindex'); check(listed.includes('https://www.lessoncraftstudio.com' + p + '<'), who + ': a live page is in no sitemap'); }
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
  // the hub (Part 4.4): it lists every live unit and plan; with no live unit it is noindex and in no sitemap
  const liveUnits = units.filter((u) => u.status === 'live');
  if (units.length) {
    const hp = '/' + loc + '/units';
    const hub = await req(hp);
    check(hub.status === 200, 'hub: page answers ' + hub.status);
    check(((/<title>([^<]*)<\/title>/.exec(hub.body) || [])[1] || '').replace(/&amp;/g, '&') === uiU.hubMetaTitle, 'hub: its title is not the hub title');
    check((hub.body.match(/<h1[\s>]/g) || []).length === 1, 'hub: ' + (hub.body.match(/<h1[\s>]/g) || []).length + ' h1');
    check(hub.body.includes('<link rel="canonical" href="https://www.lessoncraftstudio.com' + hp + '"'), 'hub: canonical is not the page itself');
    const hubRobots = (/<meta name="robots" content="([^"]*)"/.exec(hub.body) || [])[1] || '';
    if (liveUnits.length) {
      check(!/noindex/.test(hubRobots), 'hub: live units and a noindex hub');
      check(listed.includes('https://www.lessoncraftstudio.com' + hp + '<'), 'hub: it is in no sitemap');
      for (const u of liveUnits) check(hub.body.includes('href="/' + loc + '/units/' + u.slug + '"'), 'hub: no link to the unit ' + u.id);
      for (const u of units.filter((x) => x.status !== 'live')) check(!hub.body.includes('/units/' + u.slug + '"'), 'hub: it links to the pilot ' + u.id);
      for (const p of plans.filter((x) => x.status === 'live')) check(hub.body.includes('href="/' + loc + '/units/' + p.slug + '"'), 'hub: no link to the plan ' + p.id);
    } else check(/noindex/.test(hubRobots) && !listed.includes(hp + '<'), 'hub: a hub of pilots must be noindex and in no sitemap');
    const hubText = ((/<main[\s\S]*<\/main>/.exec(hub.body) || [''])[0]).replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    check(hubText.length > 500 && !/\bfree\b/i.test(hubText), 'hub: its content is missing or says free');
  }
  // the sub plans hub (Part 5): it lists every live pack; with no live pack it is noindex and in no sitemap
  if (packs.length) {
    const hp = '/' + loc + '/sub-plans';
    const hub = await req(hp);
    const livePacks = packs.filter((p) => p.status === 'live');
    check(hub.status === 200, 'sub plans hub: page answers ' + hub.status);
    check(((/<title>([^<]*)<\/title>/.exec(hub.body) || [])[1] || '').replace(/&amp;/g, '&') === uiS.hubMetaTitle, 'sub plans hub: its title is not the hub title');
    check((hub.body.match(/<h1[\s>]/g) || []).length === 1, 'sub plans hub: ' + (hub.body.match(/<h1[\s>]/g) || []).length + ' h1');
    check(hub.body.includes('<link rel="canonical" href="https://www.lessoncraftstudio.com' + hp + '"'), 'sub plans hub: canonical is not the page itself');
    const robots = (/<meta name="robots" content="([^"]*)"/.exec(hub.body) || [])[1] || '';
    if (livePacks.length) {
      check(!/noindex/.test(robots), 'sub plans hub: live packs and a noindex hub');
      check(listed.includes('https://www.lessoncraftstudio.com' + hp + '<'), 'sub plans hub: it is in no sitemap');
      for (const p of livePacks) check(hub.body.includes('href="/' + loc + '/sub-plans/' + p.slug + '"'), 'sub plans hub: no link to the pack ' + p.id);
      for (const p of packs.filter((x) => x.status !== 'live')) check(!hub.body.includes('/sub-plans/' + p.slug + '"'), 'sub plans hub: it links to the pilot ' + p.id);
    } else check(/noindex/.test(robots) && !listed.includes(hp + '<'), 'sub plans hub: a hub of pilots must be noindex and in no sitemap');
    const text = ((/<main[\s\S]*<\/main>/.exec(hub.body) || [''])[0]).replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    check(text.length > 500 && !/\bfree\b/i.test(text), 'sub plans hub: its content is missing or says free');
  }
  // the "in a lesson plan" block: on one worksheet landing and one activity page of a live unit, and on no page of a pilot
  let land = null, act = null;
  for (const u of liveUnits) for (const l of u.lessons) {
    if (!land) { const p = l.paper.find((x) => x.landing); if (p) land = { slug: p.landing, unit: u }; }
    if (!act && l.screen && l.screen.kind === 'activity') act = { slug: l.screen.slug, unit: u };
  }
  if (land) { const r = await req('/' + loc + '/worksheets/' + land.slug); check(r.status === 200 && r.body.includes('/' + loc + '/units/' + land.unit.slug + '#lesson-'), 'the worksheet page ' + land.slug + ' does not link to its unit (' + r.status + ')'); }
  if (act) { const r = await req('/' + loc + '/activities/' + act.slug); check(r.status === 200 && r.body.includes('/' + loc + '/units/' + act.unit.slug + '#lesson-'), 'the activity page ' + act.slug + ' does not link to its unit (' + r.status + ')'); }
  // a language without units has no hub
  const other = ['fi', 'da', 'no'].find((l) => l !== loc && !fs.existsSync(path.join(C, 'units', 'units.' + l + '.json')));
  if (other) { const r = await req('/' + other + '/units'); check(r.status === 404, 'the hub of a language without units (' + other + ') answers ' + r.status); }
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
