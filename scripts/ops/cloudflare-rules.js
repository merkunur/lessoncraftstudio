#!/usr/bin/env node
/**
 * cloudflare-rules.js — the site's Cloudflare security configuration, kept as data in git.
 *
 * WHY (2026-11-26): Cloudflare Pro was bought for the scraper fleets but only one custom rule had
 * been set by hand. This script reads and writes the zone's rules through the Cloudflare API so
 * every rule is versioned here, reviewed before it goes live, and can be checked for drift.
 * Plan + measurements: memory project_cloudflare_pro_setup.md.
 *
 * Token: ~/.lcs-secrets/cloudflare-api-token.txt (zone-scoped: Zone Read, Zone WAF Edit,
 * Bot Management Edit, Transform Rules Edit, Zone Settings Read, Analytics Read). Never printed.
 * The QA-header secret (~/.lcs-secrets/cf-qa-header.txt) is substituted into the rule at apply
 * time and masked in every printout; it is never written into this file.
 *
 *   node scripts/ops/cloudflare-rules.js --show            read-only: print the live configuration
 *   node scripts/ops/cloudflare-rules.js --backup          read-only: save the live configuration to
 *                                                          ~/lcs-backups/cloudflare/rules-<utc>.json
 *   node scripts/ops/cloudflare-rules.js --plan            read-only: what --apply would change, per phase
 *   node scripts/ops/cloudflare-rules.js --apply [--phase=<phase>]
 *                                                          back up the live config, then write DESIRED
 *                                                          (one phase, or all). Cloudflare validates each
 *                                                          phase as a whole: a rejected phase changes nothing.
 *   node scripts/ops/cloudflare-rules.js --check           exit 1 when the live rules differ from DESIRED
 *   node scripts/ops/cloudflare-rules.js --restore=<backup.json> [--phase=<phase>]
 *                                                          put a backup's rules back (rollback)
 *
 * Rule order inside a phase is the order Cloudflare evaluates them: skips first.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const https = require('https');

const SECRETS = path.join(os.homedir(), '.lcs-secrets');
const BACKUPS = path.join(os.homedir(), 'lcs-backups', 'cloudflare');
const ZONE_NAME = 'lessoncraftstudio.com';
const PHASES = ['http_request_firewall_custom', 'http_request_firewall_managed', 'http_ratelimit', 'http_request_late_transform'];

function readSecret(name) {
  try { return fs.readFileSync(path.join(SECRETS, name), 'utf8').replace(/^﻿/, '').trim(); } catch (e) { return ''; }
}
const TOKEN = readSecret('cloudflare-api-token.txt');
const QA = readSecret('cf-qa-header.txt');
const mask = (s) => (QA ? String(s).split(QA).join('<QA-SECRET>') : String(s));
const QA_PLACEHOLDER = '<QA-SECRET>';

/* ------------------------------------------------------------------ the desired configuration --- */
// Every skip rule lets its traffic past ALL the protections below it: the remaining custom rules,
// Super Bot Fight Mode, rate limiting and the managed rules.
const SKIP_ALL = { ruleset: 'current', phases: ['http_request_sbfm', 'http_ratelimit', 'http_request_firewall_managed'] };
const P = 'http.request.uri.path';
const UA = 'lower(http.user_agent)';
const uaAny = (list) => list.map((s) => UA + ' contains "' + s + '"').join(' or ');

const DESIRED = {
  http_request_firewall_custom: [
    { description: 'Skip bot checks for our QA scripts', action: 'skip', action_parameters: SKIP_ALL,
      expression: 'http.request.headers["x-lcs-qa"][0] eq "' + QA_PLACEHOLDER + '"' },
    { description: 'Skip bot checks for payment webhooks', action: 'skip', action_parameters: SKIP_ALL,
      expression: 'starts_with(' + P + ', "/api/webhooks/")' },
    // A User-Agent that claims a search engine but Cloudflare cannot verify is a fake. Real search
    // engines are verified (cf.client.bot), so this costs them nothing. It also closes the meter
    // bypass: frontend/lib/quota.ts lets any "bot" User-Agent past the download/play limits.
    { description: 'Block fake search-engine crawlers', action: 'block',
      expression: '(' + uaAny(['googlebot', 'bingbot', 'applebot', 'yandexbot', 'duckduckbot', 'baiduspider']) + ') and not cf.client.bot' },
    // Operator ruling 2026-11-26: block SEO-tool crawlers and AI-training crawlers. Search engines
    // (Google, Bing, Apple, DuckDuckGo, Yandex) and AI search/assistant fetchers (OAI-SearchBot,
    // ChatGPT-User, PerplexityBot, Claude-User, Claude-SearchBot) stay allowed.
    { description: 'Block SEO-tool and AI-training crawlers', action: 'block',
      expression: 'cf.verified_bot_category in {"AI Crawler" "Search Engine Optimization"} or ' +
        uaAny(['ahrefsbot', 'semrushbot', 'dotbot', 'mj12bot', 'dataforseobot', 'blexbot', 'serpstatbot', 'barkrowler',
          'gptbot', 'ccbot', 'bytespider', 'meta-externalagent', 'claudebot', 'omgilibot', 'imagesiftbot', 'timpibot', 'diffbot']) },
    { description: 'Challenge stale-Chrome scraper fleet', action: 'managed_challenge',
      expression: '(http.user_agent contains "Chrome/9" or http.user_agent contains "Chrome/10" or http.user_agent contains "Chrome/11" or http.user_agent contains "Chrome/12" or http.user_agent contains "Chrome/130." or http.user_agent contains "Chrome/131." or http.user_agent contains "Chrome/132." or http.user_agent contains "Chrome/133." or http.user_agent contains "Chrome/134." or http.user_agent contains "Chrome/135." or http.user_agent contains "Chrome/136." or http.user_agent contains "Chrome/137." or http.user_agent contains "Chrome/138.") and not cf.client.bot' },
    // Every current browser sends Sec-Fetch-Mode on a page load (Chrome 76+, Firefox 90+, Safari 16.4+),
    // also inside an embed iframe. Measured 2026-11-25: 2,414 of 2,424 Google-referred page views sent it
    // (the 10 without were Safari 14-16.3; they get a challenge they normally pass); ~12k page fetches a
    // day claiming to be Chrome did not. Files (PDF, images, .html tools), POSTs, the API (except the
    // metered download link), Next internals, ACME and the auth pages are left alone.
    { description: 'Challenge page requests without browser fetch headers', action: 'managed_challenge',
      expression: 'http.request.method eq "GET" and http.request.uri.path.extension eq ""' +
        ' and (not starts_with(' + P + ', "/api/") or starts_with(' + P + ', "/api/quota/dl"))' +
        ' and not starts_with(' + P + ', "/_next/") and not starts_with(' + P + ', "/.well-known/")' +
        ' and not ' + P + ' contains "/auth/"' +
        ' and not any(lower(http.request.headers.names[*])[*] eq "sec-fetch-mode")' +
        ' and not cf.client.bot' },
    { description: 'Challenge hub filter scrapers', action: 'managed_challenge',
      expression: '(' + P + ' contains "/worksheets" or ' + P + ' contains "/topic/" or ' + P + ' contains "/activities") and http.request.uri.query ne "" and not http.request.uri.query contains "_rsc=" and not cf.client.bot' },
  ],
  http_request_firewall_managed: [
    // The content managers post HTML, which the XSS signatures flag; these pages are operator-only.
    { description: 'Managed rules: skip the operator-only admin pages', action: 'skip', action_parameters: { ruleset: 'current' },
      expression: 'starts_with(' + P + ', "/admin/") or starts_with(' + P + ', "/api/admin/")' },
    { description: 'Cloudflare Managed Ruleset', action: 'execute', action_parameters: { id: 'efb7b8c949ac4650a09736fc376e9aee' },
      expression: 'true' },
  ],
  http_ratelimit: [
    // Measured 2026-11-25: real visitors send at most 4 of these a day per IP. Our own checks skip this.
    { description: 'Rate-limit sign-in, sign-up and password endpoints', action: 'block',
      expression: 'starts_with(' + P + ', "/api/auth/signin") or starts_with(' + P + ', "/api/auth/register") or starts_with(' + P + ', "/api/auth/forgot-password") or starts_with(' + P + ', "/api/auth/reset-password")',
      ratelimit: { characteristics: ['ip.src', 'cf.colo.id'], period: 60, requests_per_period: 20, mitigation_timeout: 600 } },
  ],
  http_request_late_transform: [
    // Measurement only: the origin log records it as as=<ASN> (scripts/publish-cli/patch-nginx-log-geo.py).
    { description: 'Pass the visitor network number (ASN) to the origin log', action: 'rewrite',
      action_parameters: { headers: { 'x-lcs-asn': { operation: 'set', expression: 'to_string(ip.src.asnum)' } } },
      expression: 'true' },
  ],
};

// The comparable shape of a rule (Cloudflare adds ids, versions and timestamps we do not own).
function norm(r) {
  const o = { description: r.description || '', action: r.action, expression: mask(r.expression), enabled: r.enabled !== false };
  if (r.action_parameters) o.action_parameters = JSON.parse(mask(JSON.stringify(r.action_parameters)));
  if (r.ratelimit) o.ratelimit = { characteristics: r.ratelimit.characteristics, period: r.ratelimit.period, requests_per_period: r.ratelimit.requests_per_period, mitigation_timeout: r.ratelimit.mitigation_timeout };
  return JSON.stringify(o, Object.keys(o).sort().concat(['characteristics', 'period', 'requests_per_period', 'mitigation_timeout', 'ruleset', 'phases', 'id', 'headers', 'x-lcs-asn', 'operation', 'expression']));
}
function diffPhase(liveRs, want) {
  const have = (liveRs && liveRs.rules) || [];
  const a = have.map(norm), b = want.map(norm);
  const lines = [];
  b.forEach((w, i) => { const j = a.indexOf(w); if (j === -1) { const same = have.find((h) => (h.description || '') === want[i].description); lines.push((same ? '  ~ change ' : '  + add    ') + want[i].description); } else if (j !== i) lines.push('  ↕ move   ' + want[i].description + ' (to position ' + (i + 1) + ')'); });
  have.forEach((h, j) => { if (!b.includes(a[j]) && !want.some((w) => w.description === (h.description || ''))) lines.push('  - remove ' + (h.description || '(no description)')); });
  return lines;
}
function toApi(rule) {
  const r = { description: rule.description, action: rule.action, expression: rule.expression.split(QA_PLACEHOLDER).join(QA), enabled: rule.enabled !== false };
  if (rule.action_parameters) r.action_parameters = rule.action_parameters;
  if (rule.ratelimit) r.ratelimit = rule.ratelimit;
  return r;
}

function api(method, p, body) {
  return new Promise((resolve) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      host: 'api.cloudflare.com', path: '/client/v4' + p, method, timeout: 30000,
      headers: Object.assign({ Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
    }, (res) => {
      const c = [];
      res.on('data', (d) => c.push(d));
      res.on('end', () => { let j = null; try { j = JSON.parse(Buffer.concat(c).toString('utf8')); } catch (e) { /* not JSON */ } resolve({ status: res.statusCode, json: j }); });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', (e) => resolve({ status: 0, json: null, error: e.message }));
    if (data) req.write(data);
    req.end();
  });
}
const errs = (r) => (r.json && r.json.errors && r.json.errors.length ? r.json.errors.map((e) => e.code + ' ' + e.message).join('; ') : 'HTTP ' + r.status + (r.error ? ' ' + r.error : ''));

async function zoneId() {
  const r = await api('GET', '/zones?name=' + ZONE_NAME);
  if (!r.json || !r.json.success || !r.json.result.length) throw new Error('cannot read the zone with this token: ' + errs(r));
  return r.json.result[0];
}

async function readLive(zid) {
  const live = { captured: new Date().toISOString(), zone: zid, phases: {}, bot_management: null, settings: {} };
  for (const ph of PHASES) {
    const r = await api('GET', '/zones/' + zid + '/rulesets/phases/' + ph + '/entrypoint');
    live.phases[ph] = r.status === 404 ? null : (r.json && r.json.success ? r.json.result : { error: errs(r) });
  }
  const b = await api('GET', '/zones/' + zid + '/bot_management');
  live.bot_management = b.json && b.json.success ? b.json.result : { error: errs(b) };
  for (const s of ['browser_check', 'security_level', 'challenge_ttl', 'always_use_https', 'ssl']) {
    const r = await api('GET', '/zones/' + zid + '/settings/' + s);
    live.settings[s] = r.json && r.json.success ? r.json.result.value : { error: errs(r) };
  }
  return live;
}

function show(live) {
  for (const [ph, rs] of Object.entries(live.phases)) {
    console.log('\n== ' + ph + (rs === null ? ' — (no ruleset yet)' : rs.error ? ' — ERROR ' + rs.error : ' — ' + (rs.rules || []).length + ' rule(s)'));
    if (rs && rs.rules) rs.rules.forEach((r, i) => {
      console.log('  ' + (i + 1) + '. [' + (r.enabled === false ? 'OFF ' : '') + r.action + '] ' + (r.description || '(no description)'));
      console.log('     expr: ' + mask(r.expression));
      if (r.action_parameters) console.log('     params: ' + mask(JSON.stringify(r.action_parameters)));
      if (r.ratelimit) console.log('     ratelimit: ' + JSON.stringify(r.ratelimit));
    });
  }
  console.log('\n== bot_management: ' + JSON.stringify(live.bot_management));
  console.log('== settings: ' + JSON.stringify(live.settings));
}

(async () => {
  if (!TOKEN) { console.error('No token at ' + path.join(SECRETS, 'cloudflare-api-token.txt')); process.exit(2); }
  const args = process.argv.slice(2);
  const z = await zoneId();
  console.log('zone ' + z.name + ' · plan ' + (z.plan && z.plan.name) + ' · status ' + z.status);
  const live = await readLive(z.id);
  if (args.includes('--show')) show(live);
  const backup = () => {
    fs.mkdirSync(BACKUPS, { recursive: true });
    const f = path.join(BACKUPS, 'rules-' + live.captured.replace(/[:.]/g, '-') + '.json');
    fs.writeFileSync(f, JSON.stringify(live, null, 1));
    console.log('backed up the live configuration to ' + f);
    return f;
  };
  if (args.includes('--backup')) backup();

  const phaseArg = (args.find((a) => a.startsWith('--phase=')) || '').slice(8);
  if (phaseArg && !DESIRED[phaseArg]) { console.error('unknown phase ' + phaseArg + ' (one of ' + Object.keys(DESIRED).join(', ') + ')'); process.exit(2); }
  const phases = phaseArg ? [phaseArg] : Object.keys(DESIRED);

  if (args.includes('--plan') || args.includes('--check') || args.includes('--apply')) {
    let drift = 0;
    for (const ph of phases) {
      const d = diffPhase(live.phases[ph], DESIRED[ph]);
      drift += d.length;
      console.log('\n' + ph + (d.length ? '' : ' — matches'));
      d.forEach((l) => console.log(l));
    }
    if (args.includes('--check')) { console.log(drift ? '\nDRIFT: ' + drift + ' difference(s)' : '\nOK — live rules match the versioned ones'); process.exit(drift ? 1 : 0); }
    if (args.includes('--apply')) {
      if (!drift) { console.log('\nnothing to apply'); return; }
      if (!QA) { console.error('no QA secret at ' + path.join(SECRETS, 'cf-qa-header.txt') + ' — refusing (the QA skip rule needs it)'); process.exit(2); }
      backup();
      for (const ph of phases) {
        if (!diffPhase(live.phases[ph], DESIRED[ph]).length) continue;
        const r = await api('PUT', '/zones/' + z.id + '/rulesets/phases/' + ph + '/entrypoint', { rules: DESIRED[ph].map(toApi) });
        if (!r.json || !r.json.success) { console.error('\n' + ph + ': REJECTED by Cloudflare — this phase is unchanged: ' + mask(errs(r))); process.exit(1); }
        console.log('\n' + ph + ': applied (' + r.json.result.rules.length + ' rules, version ' + r.json.result.version + ')');
      }
    }
  }

  const restoreArg = (args.find((a) => a.startsWith('--restore=')) || '').slice(10);
  if (restoreArg) {
    const b = JSON.parse(fs.readFileSync(restoreArg, 'utf8'));
    backup();
    for (const ph of phases) {
      const rules = (b.phases[ph] && b.phases[ph].rules) || [];
      const r = await api('PUT', '/zones/' + z.id + '/rulesets/phases/' + ph + '/entrypoint', { rules: rules.map((x) => { const o = { description: x.description, action: x.action, expression: x.expression, enabled: x.enabled !== false }; if (x.action_parameters) o.action_parameters = x.action_parameters; if (x.ratelimit) o.ratelimit = x.ratelimit; return o; }) });
      console.log(ph + ': ' + (r.json && r.json.success ? 'restored (' + rules.length + ' rules)' : 'FAILED ' + mask(errs(r))));
    }
  }
})().catch((e) => { console.error('FAILED: ' + mask(e.message)); process.exit(1); });
