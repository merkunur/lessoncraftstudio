#!/usr/bin/env node
/**
 * append-demand-title-tail.js (2026-07 long-tail SEO program, Phase 5): appends
 * a per-locale demand-qualifier tail to the rendered titles of LANDING-LESS
 * self-canonical decks.
 *
 *   "Kreuzworträtsel — Tiere — 1. Klasse"
 *     →  "Kreuzworträtsel — Tiere — 1. Klasse — zum Ausdrucken (PDF kostenlos)"
 *
 * WHY: ~13k landing-less decks are the indexed surface for their queries
 * (sitemap shards 0/1, self-canonical) but their titles carry NO demand
 * qualifiers (printable/free/PDF), unlike every other surface. Landing-HAVING
 * decks canonical→/worksheets/ landings (which are demand-keyed) — their deck
 * titles must NOT compete, so they are skipped.
 *
 * ELIGIBILITY DISCRIMINATOR (verified): the baked <link rel="canonical"> in
 * deck.html. `…/<locale>/decks/<slug>/` = landing-less → eligible;
 * `…/worksheets/…` = landing-having → SKIP. (repoint-deck-canonical.js rewrites
 * the canonical when a landing exists, so the file itself is the SoT.)
 *
 * Tails per locale live in demand-title-tails.json (authored from the
 * docs/SEO/demand-map-<locale>.md research). Ladder: try `full`, else
 * `short`, else skip+report (budget: unescaped rendered title ≤ 72 chars —
 * the ~60-char SERP display clips the TAIL, never the keyword head).
 *
 * Mechanics (clone of retitle-hash-suffix-decks.js, §15.17 doctrine):
 *   - enumerate published decks per locale from DB
 *   - read deck.html head (title + canonical) cheaply
 *   - idempotent: skip when the title already ends with any configured tail
 *   - uniqueness: new titleHash gated against the per-language published
 *     titleHash universe; collision → skip + report (never auto-suffix §15.13)
 *   - rewrite old title in html-escaped / json-escaped / raw forms
 *     (<title>/og:title/twitter:title/JSON-LD name); URLs/canonical/PDF hrefs
 *     NEVER touched; atomic tmp+rename
 *   - DB update: titleHash ONLY (DB display title stays bare — catalog cards
 *     must not grow tails; retitle-hash-suffix convention)
 *
 * Usage (on Hetzner, from /opt/lessoncraftstudio, DATABASE_URL in env):
 *   node scripts/publish-cli/append-demand-title-tail.js --locales=de --dry-run
 *   node scripts/publish-cli/append-demand-title-tail.js --locales=all --confirm [--limit=N]
 *
 * Forward path: landings are authored AFTER publish and repointed retroactively,
 * so tails are NOT baked into build-seo-head.js — re-run this idempotent
 * retrofit after publish waves / landing repoints instead.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var db = require('./db');
var hashTitleOrDescription = require('./seo-reconciliation').hashTitleOrDescription;

var DECKS_DIR = '/var/www/lcs-media/decks';
var ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
var TAILS = require('./demand-title-tails.json');
// Unescaped rendered title incl. tail. The tail sits LAST, so a title beyond
// Google's ~60-char SERP display clips the tail (not the keyword head) yet the
// full title is still indexed for ranking — so a generous 80 lets the demand
// qualifier reach more titles; only genuinely runaway titles are skipped.
var MAX_TITLE_CHARS = 80;

function parseArgs(argv) {
  var out = { locales: null, dryRun: false, confirm: false, limit: 0 };
  argv.slice(2).forEach(function (a) {
    if (a.indexOf('--locales=') === 0) {
      var v = a.slice('--locales='.length);
      out.locales = v === 'all' ? ALL_LOCALES.slice() : v.split(',');
    } else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--confirm') out.confirm = true;
    else if (a.indexOf('--limit=') === 0) out.limit = parseInt(a.slice('--limit='.length), 10) || 0;
    else { console.error('Unknown flag: ' + a); process.exit(2); }
  });
  if (!out.locales) { console.error('USAGE: --locales=<csv|all> and --dry-run or --confirm'); process.exit(2); }
  if (!out.dryRun && !out.confirm) { console.error('USAGE: --dry-run or --confirm required'); process.exit(2); }
  out.locales.forEach(function (l) {
    if (!TAILS[l] || !TAILS[l].full) { console.error('No tail configured for locale "' + l + '" in demand-title-tails.json'); process.exit(2); }
  });
  return out;
}

function htmlEscape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function jsonEscapeFragment(s) { return JSON.stringify(String(s)).slice(1, -1); }
function replaceAll(haystack, needle, replacement) {
  if (!needle || haystack.indexOf(needle) === -1) return { text: haystack, count: 0 };
  var parts = haystack.split(needle);
  return { text: parts.join(replacement), count: parts.length - 1 };
}
function deckHtmlPath(language, slug) { return path.join(DECKS_DIR, language, slug, 'deck.html'); }

/** Read <title> + <link rel="canonical" href> from the first 16KB of deck.html. */
function readHead(htmlPath) {
  var fd;
  try {
    fd = fs.openSync(htmlPath, 'r');
    var buf = Buffer.alloc(16384);
    var n = fs.readSync(fd, buf, 0, 16384, 0);
    var head = buf.slice(0, n).toString('utf8');
    var tm = /<title>([\s\S]*?)<\/title>/.exec(head);
    var cm = /<link\s+rel="canonical"\s+href="([^"]+)"/.exec(head);
    return { title: tm ? tm[1].trim() : null, canonical: cm ? cm[1] : null };
  } catch (e) {
    return { title: null, canonical: null };
  } finally {
    if (fd !== undefined) try { fs.closeSync(fd); } catch (e2) {}
  }
}

function atomicWrite(filePath, content) {
  var real = fs.realpathSync(filePath);
  var tmp = real + '.tmp-tail';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, real);
}

/** HTML-unescape the few entities htmlEscape produces, for length budgeting. */
function unescapeLen(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").length;
}

async function main() {
  var args = parseArgs(process.argv);
  var prisma = db.client();

  var rows = await prisma.deck.findMany({
    where: { status: 'published', language: { in: args.locales } },
    select: { id: true, language: true, slug: true, titleHash: true }
  });
  console.log('published rows in scope: ' + rows.length);

  var allRows = args.locales.length === ALL_LOCALES.length ? rows : await prisma.deck.findMany({
    where: { status: 'published' },
    select: { language: true, titleHash: true }
  });
  var hashesByLang = {};
  allRows.forEach(function (r) {
    if (!hashesByLang[r.language]) hashesByLang[r.language] = new Set();
    if (r.titleHash) hashesByLang[r.language].add(r.titleHash);
  });

  var stats = { scanned: 0, eligible: 0, rewritten: 0, skippedLanding: 0, skippedAlready: 0, skippedBudget: 0, skippedCollision: 0, skippedNoFile: 0, errors: 0 };
  var perLocale = {};
  var processed = 0;
  var planSamples = 0;

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var lang = r.language;
    perLocale[lang] = perLocale[lang] || { eligible: 0, rewritten: 0, budget: 0 };
    var tails = TAILS[lang];
    var htmlPath = deckHtmlPath(lang, r.slug);
    var head = readHead(htmlPath);
    stats.scanned++;
    if (!head.title || !head.canonical) { stats.skippedNoFile++; continue; }

    // Discriminator: only self-canonical /decks/ pages are the indexed surface.
    var selfCanonical = head.canonical.indexOf('/' + lang + '/decks/' + r.slug) !== -1;
    if (!selfCanonical) { stats.skippedLanding++; continue; }

    // Idempotence: already tailed (full or short).
    if ((tails.full && head.title.slice(-tails.full.length) === tails.full) ||
        (tails.short && head.title.slice(-tails.short.length) === tails.short)) {
      stats.skippedAlready++;
      continue;
    }

    stats.eligible++;
    perLocale[lang].eligible++;
    if (args.limit && processed >= args.limit) continue;

    // Budget ladder: full tail, else short, else skip+report.
    var baseLen = unescapeLen(head.title);
    var tail = null;
    if (baseLen + tails.full.length <= MAX_TITLE_CHARS) tail = tails.full;
    else if (tails.short && baseLen + tails.short.length <= MAX_TITLE_CHARS) tail = tails.short;
    if (!tail) {
      stats.skippedBudget++;
      perLocale[lang].budget++;
      if (stats.skippedBudget <= 15) console.log('SKIP-budget ' + lang + '/' + r.slug + ' (' + baseLen + 'c) "' + head.title + '"');
      continue;
    }

    var newTitle = head.title + tail;
    var newHash = hashTitleOrDescription(newTitle);
    var universe = hashesByLang[lang] || new Set();
    if (universe.has(newHash)) {
      stats.skippedCollision++;
      console.log('SKIP-collision ' + lang + '/' + r.slug + ' → "' + newTitle + '"');
      continue;
    }

    if (args.dryRun) {
      processed++;
      stats.rewritten++;
      perLocale[lang].rewritten++;
      universe.add(newHash);
      if (r.titleHash) universe.delete(r.titleHash);
      if (planSamples < 25) {
        planSamples++;
        console.log('PLAN ' + lang + '/' + r.slug + '\n  "' + head.title + '" →\n  "' + newTitle + '"');
      }
      continue;
    }

    try {
      var html = fs.readFileSync(htmlPath, 'utf8');
      var total = 0;
      var seen = {};
      [htmlEscape(head.title), jsonEscapeFragment(head.title), head.title].forEach(function (needle, idx) {
        if (seen[needle]) return;
        seen[needle] = true;
        var repl = idx === 0 ? htmlEscape(newTitle) : idx === 1 ? jsonEscapeFragment(newTitle) : newTitle;
        var res = replaceAll(html, needle, repl);
        html = res.text; total += res.count;
      });
      if (total === 0) {
        stats.errors++;
        console.error('ERROR ' + lang + '/' + r.slug + ': rendered title not found in body — skipped');
        continue;
      }
      atomicWrite(htmlPath, html);
      await prisma.deck.update({ where: { id: r.id }, data: { titleHash: newHash } });
      universe.add(newHash);
      if (r.titleHash) universe.delete(r.titleHash);
      stats.rewritten++;
      perLocale[lang].rewritten++;
      processed++;
    } catch (e) {
      stats.errors++;
      console.error('ERROR ' + lang + '/' + r.slug + ': ' + e.message);
    }
  }

  console.log('\n=== append-demand-title-tail ' + (args.dryRun ? 'DRY-RUN' : 'APPLIED') + ' ===');
  console.log(JSON.stringify(stats));
  Object.keys(perLocale).sort().forEach(function (l) {
    console.log('  ' + l + ': rewritten ' + perLocale[l].rewritten + '/' + perLocale[l].eligible + ' eligible (budget-skips ' + perLocale[l].budget + ')');
  });
  await db.disconnect();
}

main().catch(function (e) { console.error(e); process.exit(1); });
