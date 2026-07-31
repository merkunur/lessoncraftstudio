#!/usr/bin/env node
/* =====================================================================
   preflight-indexable-routes.js — BUILD-FAILING indexability gate
   ---------------------------------------------------------------------
   CLAUDE.md §10 indexable-route rule:

     Any new route or static HTML file that returns text/html must, before
     merge, declare either a <link rel="canonical"> or a <meta name="robots">
     directive. Utility surfaces, embeds, iframe targets, and app shells
     default to `noindex, follow`. A route with neither tag is a build
     failure.

   WHY THIS EXISTS
   ---------------
   The 2026-07 tool-pages launch shipped ~450 /mini-tools/*.html URLs whose
   entire <head> was a <title>. They were saved only because someone later
   added an nginx X-Robots-Tag by hand. Nothing in the build would have
   caught it, and nothing would catch the next one.

   WHAT IT CHECKS
   --------------
   (A) STATIC HTML under frontend/public/ — every *.html file must carry a
       robots meta, a canonical link, OR be covered by a directory-level
       nginx X-Robots-Tag (the NGINX_COVERED list below). This project
       genuinely enforces several directives at the header layer, and a
       header directive is equivalent to the meta tag for every crawler —
       so header coverage SATISFIES the rule rather than bypassing it.
       Each NGINX_COVERED entry names the patch script that installs it, so
       the claim stays auditable and a dropped nginx block is traceable.

   (B) APP ROUTES under frontend/app/ — every page.tsx that is publicly
       reachable must resolve robots or canonical metadata. A route
       satisfies this by any of: an `alternates.canonical` / `robots:` key
       in its own generateMetadata or exported `metadata`, importing one of
       the shared robots constants, or inheriting from a layout in an
       ancestor directory that does so.

   Exit 0 = clean; exit 1 = a route that would ship with no indexability
   directive at all. Run before every deploy (wired into deploy.sh).

   Flags:
     --json     machine-readable output
     --quiet    only print failures
   ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(REPO, 'frontend', 'public');
const APP_DIR = path.join(REPO, 'frontend', 'app');

const argv = process.argv.slice(2);
const JSON_OUT = argv.includes('--json');
const QUIET = argv.includes('--quiet');

/**
 * Directories served with a directory-level `X-Robots-Tag` by nginx. A header
 * directive is equivalent to the meta tag, so these SATISFY the rule.
 * Each entry MUST name the script that installs the block — if that script is
 * ever dropped from the nginx rebuild, this list is the audit trail. deploy.sh's
 * nginx-contract check separately asserts the /mini-tools/ location still exists.
 *
 * KEEP THIS LIST MINIMAL. A prefix entry exempts every file beneath it forever, so
 * it manufactures coverage for files nobody has looked at. Only list a prefix whose
 * files genuinely CANNOT carry the tag themselves: the 176 `mini tools/*.html` carry
 * no in-file robots meta by design and rely wholly on the header. `REFERENCE APPS/`
 * was listed here at first and removed — all 33 carry the meta in-file, so a prefix
 * entry only hid them from per-file verification (a poison-test proved a new ungated
 * file there went undetected).
 */
const NGINX_COVERED = [
  {
    prefix: 'mini-tools/',
    header: 'X-Robots-Tag: noindex',
    installedBy: 'scripts/publish-cli/patch-nginx-minitools-noindex.py',
  },
];

/** Static HTML paths that are never served as a page (fragments, templates). */
const STATIC_IGNORE = [/^_/, /\/_/, /\.min\.html$/];

/**
 * PERMANENTLY exempt — these MUST NOT carry a robots directive to work.
 * Search-engine ownership-verification files are served verbatim and are fetched
 * by the verifier, not indexed as content.
 */
const PERMANENT_EXEMPT = [/^google[0-9a-f]+\.html$/i, /^BingSiteAuth\.xml$/i, /^yandex_[0-9a-f]+\.html$/i];

/**
 * ── RATCHET BASELINE — pre-existing debt, NOT approval ──────────────────────
 *
 * Surfaces that already shipped without their own indexability directive when this
 * gate was introduced (2026-07-31). They are listed so the gate can FAIL on anything
 * NEW while remaining runnable against today's tree.
 *
 * THIS LIST MAY ONLY SHRINK. Never add an entry to make a build pass — fix the
 * surface instead. Removing an entry that is still ungated re-fails the build, which
 * is the point.
 *
 * Verified live 2026-07-31, all HTTP 200 with no X-Robots-Tag and no robots meta:
 * the /public/*.html debug, test and content-manager surfaces below are publicly
 * indexable today. The app routes below have no directive of their OWN and therefore
 * inherit the root layout's default `index, follow` — which is why /upload,
 * /en/test and /en/test-simple are live, indexable pages. Both classes want an
 * operator decision (noindex vs delete vs nginx header); neither is fixed here,
 * because this spec's scope is the guardrail, not the cleanup.
 */
const KNOWN_UNGATED = new Set([
  // --- static HTML under frontend/public/ (15) ---
  'frontend/public/big-small-debug.html',
  'frontend/public/big-small-final.html',
  'frontend/public/check-tier.html',
  'frontend/public/clear-device-and-test.html',
  'frontend/public/easy-page-manager.html',
  'frontend/public/find-count-borders-only.html',
  'frontend/public/homepage-content-manager-v2.html',
  'frontend/public/homepage-content-manager-v3-fixed.html',
  'frontend/public/homepage-content-manager-v3.html',
  'frontend/public/homepage-content-manager.html',
  'frontend/public/static-pages/en/pages/cryptopicpuzzlestudio.html',
  'frontend/public/test-auth.html',
  'frontend/public/test-device-conflict.html',
  'frontend/public/test-watermark.html',
  'frontend/public/user-control.html',
  // --- app routes with no own robots/canonical (13) ---
  'frontend/app/dashboard/account/page.tsx',
  'frontend/app/dashboard/activity/page.tsx',
  'frontend/app/dashboard/admin/page.tsx',
  'frontend/app/dashboard/generators/page.tsx',
  'frontend/app/dashboard/page.tsx',
  'frontend/app/dashboard/profile/page.tsx',
  'frontend/app/dashboard/settings/page.tsx',
  'frontend/app/help/page.tsx',
  'frontend/app/page.tsx',
  'frontend/app/test/page.tsx',
  'frontend/app/upload/page.tsx',
  'frontend/app/[locale]/test/page.tsx',
  'frontend/app/[locale]/test-simple/page.tsx',
]);

const ROBOTS_RE = /<meta[^>]+name=["']robots["']/i;
const CANONICAL_RE = /<link[^>]+rel=["']canonical["']/i;

function walk(dir, filterFn, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.next') continue;
      walk(full, filterFn, out);
    } else if (filterFn(full)) {
      out.push(full);
    }
  }
  return out;
}

const rel = (p) => path.relative(REPO, p).split(path.sep).join('/');

// ---------------------------------------------------------------- check (A)
/**
 * SERVED static-HTML sources, enumerated from GIT — never by walking the filesystem.
 *
 * Walking was the first implementation and it was wrong in both directions on the
 * server: `frontend/public/{admin,mini-tools,worksheet-generators}` are symlinks
 * (readdirSync reports them as symlinks, not directories, so the whole mini-tools
 * class was silently NEVER checked), while an untracked stray `frontend/public/public/
 * public/` duplicate tree got walked three times over and produced 41 phantom
 * failures. Git-tracked enumeration is identical on every machine and matches the
 * rule's "before merge" semantics.
 *
 * `servedPrefix` maps a repo path to the URL prefix it is served under, so
 * NGINX_COVERED can be matched against where the file actually lives on the web.
 */
const HTML_SOURCES = [
  { repoPrefix: 'frontend/public/', servedPrefix: '' },
  { repoPrefix: 'mini tools/', servedPrefix: 'mini-tools/' },
  { repoPrefix: 'REFERENCE APPS/', servedPrefix: 'worksheet-generators/' },
];

function gitTrackedHtml() {
  const { execFileSync } = require('child_process');
  let out = '';
  try {
    // TRACKED FILES ONLY. `--others` was tried and reverted: the Hetzner working
    // tree carries years of untracked cruft (a stray `frontend/public/public/public/`
    // duplicate tree alone produced 40 failures there while the local tree was
    // clean), so including untracked files makes the gate machine-dependent — the
    // exact property that made the first version useless. The rule is "before
    // merge", and a file must be committed to merge, so tracked-only loses nothing.
    out = execFileSync('git', ['ls-files', '-z', '--cached', '*.html'], {
      cwd: REPO,
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch (err) {
    console.error('FATAL: `git ls-files` failed — cannot enumerate served HTML.');
    console.error('  ' + (err && err.message));
    process.exit(1);
  }
  const files = out.split(' ').filter(Boolean);
  const served = [];
  for (const f of files) {
    const src = HTML_SOURCES.find((h) => f.startsWith(h.repoPrefix));
    if (!src) continue; // not a served surface (blog drafts, tpt exports, fixtures)
    served.push({ repoPath: f, urlPath: src.servedPrefix + f.slice(src.repoPrefix.length) });
  }
  return served;
}

function checkStaticHtml() {
  const failures = [];
  const baseline = [];
  let checked = 0;
  let coveredByNginx = 0;

  for (const { repoPath, urlPath } of gitTrackedHtml()) {
    if (STATIC_IGNORE.some((re) => re.test(urlPath))) continue;
    if (PERMANENT_EXEMPT.some((re) => re.test(urlPath))) continue;
    checked++;

    let html = '';
    try {
      html = fs.readFileSync(path.join(REPO, repoPath), 'utf8');
    } catch {
      continue;
    }
    if (ROBOTS_RE.test(html) || CANONICAL_RE.test(html)) continue;

    if (NGINX_COVERED.some((c) => urlPath.startsWith(c.prefix))) {
      coveredByNginx++;
      continue;
    }

    const entry = {
      kind: 'static-html',
      file: repoPath,
      reason: 'no <meta name="robots">, no <link rel="canonical">, and not under an X-Robots-Tag-covered prefix',
    };
    if (KNOWN_UNGATED.has(entry.file)) baseline.push(entry);
    else failures.push(entry);
  }
  return { checked, coveredByNginx, baseline, failures };
}

// ---------------------------------------------------------------- check (B)
const META_HINT_RE =
  /\brobots\s*:|INDEXABLE_ROBOTS|NOINDEX_ROBOTS|alternates\s*:[\s\S]{0,400}?canonical|canonicalUrl\(|generateMetadata/;

/**
 * Does an ancestor layout BELOW the root declare per-segment metadata?
 *
 * The root `frontend/app/layout.tsx` is deliberately EXCLUDED. It always exports
 * site-wide metadata (title template, default openGraph), so counting it would make
 * every route inherit coverage and this check could never fail — it was written that
 * way first and a poison-test proved it green on a route with no metadata at all.
 * Root-layout metadata also cannot express a per-route canonical, which is the thing
 * the rule actually requires. Only a segment layout below the root counts.
 */
function inheritsMetadata(startDir) {
  let dir = startDir;
  while (dir.startsWith(APP_DIR) && dir !== APP_DIR) {
    for (const name of ['layout.tsx', 'layout.ts']) {
      const f = path.join(dir, name);
      if (fs.existsSync(f)) {
        try {
          if (META_HINT_RE.test(fs.readFileSync(f, 'utf8'))) return true;
        } catch {
          /* unreadable: treat as no coverage */
        }
      }
    }
    dir = path.dirname(dir);
  }
  return false;
}

function checkAppRoutes() {
  const failures = [];
  const baseline = [];
  let checked = 0;

  const pages = walk(APP_DIR, (f) => /[\\/]page\.tsx$/.test(f));
  for (const file of pages) {
    const routeRel = rel(file);
    // Route groups/segments that never render an indexable public page.
    if (/[\\/](api|_[^\\/]+)[\\/]/.test(routeRel)) continue;
    checked++;

    let src = '';
    try {
      src = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    if (META_HINT_RE.test(src)) continue;
    if (inheritsMetadata(path.dirname(file))) continue;

    const entry = {
      kind: 'app-route',
      file: routeRel,
      reason: 'no robots/canonical of its own — inherits the root layout default (index, follow)',
    };
    if (KNOWN_UNGATED.has(entry.file)) baseline.push(entry);
    else failures.push(entry);
  }
  return { checked, baseline, failures };
}

// ---------------------------------------------------------------------- main
const a = checkStaticHtml();
const b = checkAppRoutes();
const failures = [...a.failures, ...b.failures];
const baseline = [...a.baseline, ...b.baseline];

if (JSON_OUT) {
  console.log(JSON.stringify({ static: a, appRoutes: b, baseline, failures }, null, 2));
} else {
  if (!QUIET) {
    console.log('preflight-indexable-routes — CLAUDE.md §10 indexable-route rule');
    console.log(
      `  static HTML : ${a.checked} checked, ${a.coveredByNginx} covered by an X-Robots-Tag prefix`
    );
    console.log(`  app routes  : ${b.checked} checked`);
    console.log(
      `  baseline    : ${baseline.length} pre-existing ungated surface(s) — debt, see KNOWN_UNGATED`
    );
  }
  if (failures.length) {
    console.error('');
    console.error(`FAIL — ${failures.length} surface(s) would ship with no indexability directive:`);
    for (const f of failures) console.error(`  [${f.kind}] ${f.file}\n      ${f.reason}`);
    console.error('');
    console.error('Fix: add <meta name="robots"> or <link rel="canonical"> (utility surfaces,');
    console.error('embeds and iframe targets default to "noindex, follow"), or — if the');
    console.error('directive is enforced at nginx — add the prefix to NGINX_COVERED in this');
    console.error('script, naming the patch script that installs the header.');
  } else if (!QUIET) {
    console.log('✅ every text/html surface declares robots or canonical');
  }
}

process.exit(failures.length ? 1 : 0);
