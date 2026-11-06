#!/usr/bin/env node
/**
 * audit-old-landings-live.js — all 363 old maker landings as served by the app (run on the server): 200, self-canonical, the
 * frozen title still in <title>, a link to the new makers, and none of the account claims the operator had removed on 2026-11-06.
 *
 *   node scripts/makers/audit-old-landings-live.js            check every page
 *   node scripts/makers/audit-old-landings-live.js --urls     print the URLs, one per line
 */
'use strict';
const fs = require('fs');
const http = require('http');
const path = require('path');
const DIR = path.join(__dirname, '..', '..', 'frontend', 'messages', 'maker-content');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const CLAIMS = /\b(no login|no account|kein Login|ohne Anmeldung|sans inscription|sin registro|sem cadastro|senza registrazione|zonder inloggen|ingen inloggning|uden login|uten innlogging|ei kirjautumista)\b/i;

const pages = [];
for (const l of LOCALES) {
  const j = JSON.parse(fs.readFileSync(path.join(DIR, `${l}.json`), 'utf8'));
  for (const id of Object.keys(j)) if (j[id] && j[id].slug) pages.push({ l, id, path: `/${l}/tools/${j[id].slug}`, title: j[id].metaTitle });
}
if (process.argv.includes('--urls')) { console.log(pages.map((p) => 'https://www.lessoncraftstudio.com' + p.path).join('\n')); process.exit(0); }

const get = (u) => new Promise((resolve) => {
  const req = http.get(u, { headers: { 'x-forwarded-proto': 'https', host: 'www.lessoncraftstudio.com' } }, (res) => {
    const parts = [];
    res.on('data', (d) => parts.push(d));
    res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(parts).toString('utf8') }));
  });
  req.on('error', (e) => resolve({ status: 0, body: e.message }));
  req.setTimeout(60000, () => req.destroy(new Error('timeout')));
});
const unescape = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

(async () => {
  const bad = [];
  let i = 0;
  async function worker() {
    while (i < pages.length) {
      const p = pages[i++];
      const r = await get('http://127.0.0.1:3000' + p.path);
      if (r.status !== 200) { bad.push(`${r.status} ${p.path}`); continue; }
      const head = r.body.slice(0, r.body.indexOf('</head>'));
      const main = r.body.slice(r.body.indexOf('<main'), r.body.lastIndexOf('</main>'));
      const title = unescape((head.match(/<title[^>]*>([^<]*)/) || [])[1] || '');
      const desc = unescape((head.match(/<meta name="description" content="([^"]*)/) || [])[1] || '');
      if (p.title && !title.includes(p.title)) bad.push(`title changed ${p.path}: ${title.slice(0, 60)}`);
      if (!head.includes(`rel="canonical" href="https://www.lessoncraftstudio.com${p.path}"`)) bad.push(`canonical ${p.path}`);
      if (CLAIMS.test(desc) || CLAIMS.test(main)) bad.push(`claim ${p.path}`);
      if (!main.includes('/worksheet-makers')) bad.push(`no link to the makers ${p.path}`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  console.log(`old landings ${pages.length}: ${bad.length} findings`);
  bad.slice(0, 12).forEach((x) => console.log('  ' + x));
  process.exit(bad.length ? 1 : 0);
})();
