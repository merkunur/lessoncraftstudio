/* =====================================================================
   qa-header.js — lets our own production checks (live-verify-*, any
   puppeteer run against www.lessoncraftstudio.com) pass Cloudflare's
   Super Bot Fight Mode, which challenges headless Chrome.

   Cloudflare carries a custom rule "Skip bot checks for our QA scripts":
   a request whose `x-lcs-qa` header equals the secret skips Super Bot
   Fight Mode. The secret lives OUTSIDE the repo:
     $LCS_QA_HEADER, or ~/.lcs-secrets/cf-qa-header.txt (PC only).
   It is never committed and never printed by this module.

   The header is added ONLY to requests for our own host — never to
   Google Fonts, CDNs or any third party (a custom header there would
   trigger a CORS preflight and leak the secret).

   Usage:  await require('./lib/qa-header').apply(page);   // before page.goto
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const HOST = /^https:\/\/(www\.)?lessoncraftstudio\.com(\/|$)/;

function secret() {
  if (process.env.LCS_QA_HEADER) return process.env.LCS_QA_HEADER.trim();
  try { return fs.readFileSync(path.join(os.homedir(), '.lcs-secrets', 'cf-qa-header.txt'), 'utf8').trim(); } catch (e) { return ''; }
}

async function apply(page) {
  const s = secret();
  if (!s) { console.warn('qa-header: no secret found — production pages may answer with a bot challenge'); return false; }
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.isInterceptResolutionHandled && req.isInterceptResolutionHandled()) return;
    if (HOST.test(req.url())) req.continue({ headers: Object.assign({}, req.headers(), { 'x-lcs-qa': s }) });
    else req.continue();
  });
  return true;
}

/* the same header for a plain https request to our own host (status checks): curl/node are "definitely automated" to SBFM */
function headers() { const s = secret(); return s ? { 'x-lcs-qa': s } : {}; }

module.exports = { apply, headers, hasSecret: () => !!secret() };
