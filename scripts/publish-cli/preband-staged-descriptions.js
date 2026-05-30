#!/usr/bin/env node
/**
 * preband-staged-descriptions.js — pre-publish SEO re-band + title-disambiguation
 * for STAGED deck ZIPs.
 *
 * WHY (§A.14.8 + §15.17 salvage pattern). The app-gen path bakes the LEGACY
 * (unbanded) meta description carrying the `__EDUCATIONAL_LEVEL_LOCALIZED__`
 * placeholder — by design (catalog-export.js: levelProvided=false branch). The
 * 120-170 "banding" that fits the description to a complete sentence is the
 * RETROFIT's job (republish-seo.js via build-seo-head.js bandedDescription).
 * The forward publish path (substitute.js) only fills the placeholder, so for
 * wordy locales (fr/it/pt/...) the substituted description overflows the gate's
 * 170-char ceiling (seo-reconciliation.js Predicate 8 / Commission 16b, a HALT).
 * republish-seo.js is post-publish, but the gate blocks the initial publish — so
 * we band the staged deck.html BEFORE publishing.
 *
 * HOW. For each staged ZIP we reuse republish-seo.buildSeoOpts + build-seo-head's
 * buildSeoHead (republish-seo.computeNewHtml Steps 1-3 WITHOUT its Step 4
 * substitute — we must NOT substitute here, the native slug is unknown
 * pre-publish; computeNewHtml's Step 4 would bake a deck_id-based canonical and
 * consume the `__CANONICAL_URL__` placeholder). The re-emitted SEO `<head>`
 * (Class A: replace between SEO_INSERTION_POINT markers) carries a banded ≤170
 * description (resolved level + skill sentence) + catalog-consistent title, while
 * canonical/og:url stay as the `__CANONICAL_URL__` PLACEHOLDER for publish-cli.
 *
 * TITLE DISAMBIGUATION. The catalog-style title engine drops the per-deck
 * `variant_id` in favour of a content differentiator, which for some apps does
 * NOT differ between sibling decks (e.g. all themeless cryptograms → one title;
 * two same-theme/level big-small decks → one title). Title-uniqueness is a HALT
 * predicate (@@unique([language, titleHash])). So we run a scan pass: any deck
 * whose plain (no-disambiguator) title collides — within this batch OR against an
 * already-published deck of the same language — gets its unique `variant_id` fed
 * to buildSeoOpts.disambiguator (build-seo-head renders + never drops it),
 * yielding a unique title. Descriptions already carry the "(Série NNN)" variant
 * tail, so they stay unique — only titles need this.
 *
 * Pure-ish: buildSeoOpts/buildSeoHead read i18n + taxonomy only. The existing-
 * title check reads Deck.titleHash (read-only). Repack via adm-zip updateFile +
 * writeZip(tmp) + atomic rename (mirrors rewrite-manifest-theme.js). Makes a
 * one-time `<folder>.preband-backup` sibling.
 *
 * Usage:
 *   node scripts/publish-cli/preband-staged-descriptions.js <folder> --dry-run
 *   node scripts/publish-cli/preband-staged-descriptions.js <folder>            # apply
 *   flags: --force (apply despite residual halts/out-of-band)
 *          --no-db-check (skip the existing-published-title collision check)
 *
 * Exit 0 if clean (no halts, no residual out-of-band) OR --force; non-zero otherwise.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));
var republish = require('./republish-seo');
var buildSeoHeadMod = require('./build-seo-head');
var seoRecon = require('./seo-reconciliation');
var db = require('./db');

var SEO_MARKER_START = '<!-- SEO_INSERTION_POINT_START -->';
var SEO_MARKER_END = '<!-- SEO_INSERTION_POINT_END -->';
var SEO_BLOCK_REGEX = /<!-- SEO_INSERTION_POINT_START -->[\s\S]*?<!-- SEO_INSERTION_POINT_END -->/;

function descContent(html) {
  var m = /<meta name="description" content="([^"]*)"/.exec(html);
  return m ? m[1] : '';
}
function titleContent(html) {
  var m = /<title>([^<]*)<\/title>/.exec(html);
  return m ? m[1] : '';
}

/** Build the classification object buildSeoOpts expects, from a ZIP's entries. */
function classifyZip(zip) {
  var me = zip.getEntry('manifest.json');
  var he = zip.getEntry('deck.html');
  if (!me || !he) return { halt: 'missing manifest.json or deck.html entry' };
  var manifest;
  try { manifest = JSON.parse(zip.readAsText(me)); }
  catch (e) { return { halt: 'manifest.json parse error: ' + e.message }; }
  var html = zip.readAsText(he);
  var hasMarkers = html.indexOf(SEO_MARKER_START) !== -1 && html.indexOf(SEO_MARKER_END) !== -1;
  var hasHead = /<\/head>/i.test(html);
  if (!hasMarkers && !hasHead) return { halt: 'no SEO markers and no </head> anchor' };
  return {
    manifest: manifest,
    html: html,
    locale: manifest.language,
    slug: manifest.deck_id || '',
    seoClass: hasMarkers ? 'A' : 'B',
    traceClass: manifest.seo_trace ? 'A.1' : 'A.2/B',
    hasCelebrationH1: false
  };
}

/**
 * Re-emit the SEO `<head>` block with a banded ≤170 description + (optionally
 * disambiguated) title, PRESERVING the `__CANONICAL_URL__` placeholder. Returns
 * { html, title }. `disambiguator` (a deck's variant_id) is fed only when the
 * caller has determined the plain title would collide.
 */
function rebandHtml(c, disambiguator) {
  if (c.seoClass !== 'A') throw new Error('Class B (no SEO markers) — unexpected for app-generated deck');
  var seoOpts = republish.buildSeoOpts(c);
  if (disambiguator) seoOpts.disambiguator = String(disambiguator);
  var block = buildSeoHeadMod.buildSeoHead(seoOpts);
  if (block.indexOf(SEO_MARKER_START) !== 0) throw new Error('buildSeoHead block not marker-wrapped');
  var out = c.html.replace(SEO_BLOCK_REGEX, function () { return block; });
  out = out.split('\n').map(function (line) {
    if (line.indexOf('lcs-celebration__title') === -1) return line;
    return line.replace(/<h1 /g, '<h2 ').replace(/<\/h1>/g, '</h2>');
  }).join('\n');
  return { html: out, title: titleContent(block) };
}

async function main() {
  var argv = process.argv.slice(2);
  var dryRun = argv.indexOf('--dry-run') !== -1;
  var force = argv.indexOf('--force') !== -1;
  var noDbCheck = argv.indexOf('--no-db-check') !== -1;
  var folder = argv.filter(function (a) { return a.indexOf('--') !== 0; })[0];

  if (!folder) { console.error('ERROR: missing <folder>.'); process.exit(2); }
  if (!fs.existsSync(folder)) { console.error('ERROR: folder not found: ' + folder); process.exit(2); }
  var zips = fs.readdirSync(folder).filter(function (f) { return f.toLowerCase().endsWith('.zip'); }).sort();
  if (!zips.length) { console.error('ERROR: no .zip files in ' + folder); process.exit(2); }

  console.log('[preband] ' + zips.length + ' ZIPs in ' + folder + (dryRun ? '  (DRY-RUN — no writes)' : '  (APPLY)'));

  // ---- existing-published title hashes (per-language; titleHash is @@unique([language, titleHash])) ----
  var existingHashByLang = {};      // lang -> Set(titleHash)
  if (!noDbCheck) {
    try {
      var langs = {};
      // language set comes from the manifests; cheap pre-scan of just manifests
      zips.forEach(function (zf) {
        try {
          var z0 = new AdmZip(path.join(folder, zf));
          var m0 = JSON.parse(z0.readAsText(z0.getEntry('manifest.json')));
          if (m0 && m0.language) langs[m0.language] = true;
        } catch (e) { /* ignore; classify halts surface later */ }
      });
      var langList = Object.keys(langs);
      for (var li = 0; li < langList.length; li++) {
        var L = langList[li];
        var rows = await db.client().deck.findMany({
          where: { language: L, status: 'published' },
          select: { titleHash: true }
        });
        existingHashByLang[L] = new Set(rows.map(function (r) { return r.titleHash; }).filter(Boolean));
        console.log('[preband] existing published ' + L + ' titleHashes: ' + existingHashByLang[L].size);
      }
    } catch (e) {
      console.warn('[preband] WARN existing-title check skipped (DB error): ' + e.message);
      existingHashByLang = {};
    }
  }

  // ---- Pass A (scan): plain (no-disambiguator) title per deck + collision detection ----
  var halts = [];
  var stillBad = [];
  var oldOutOfBand = 0;
  var newLenBuckets = { '<120': 0, '120-170': 0, '>170': 0 };
  var titleCount = Object.create(null);            // plain title -> count
  var perDeck = [];                                // {zf, lang, plainTitle, plainHash, variantId}

  for (var i = 0; i < zips.length; i++) {
    var zf = zips[i];
    var c = classifyZip(new AdmZip(path.join(folder, zf)));
    if (c.halt) { halts.push({ zf: zf, reason: c.halt }); continue; }

    var oldDesc = descContent(c.html);
    if (oldDesc.length > 170 || oldDesc.length < 120) oldOutOfBand++;

    var r;
    try { r = rebandHtml(c, null); }
    catch (e) { halts.push({ zf: zf, reason: 'reband threw: ' + e.message }); continue; }

    var nd = descContent(r.html);
    if (nd.length < 120) newLenBuckets['<120']++;
    else if (nd.length > 170) newLenBuckets['>170']++;
    else newLenBuckets['120-170']++;
    if (nd.length > 170 || nd.length < 120) stillBad.push({ zf: zf, len: nd.length, desc: nd });

    var plainTitle = r.title;
    titleCount[plainTitle] = (titleCount[plainTitle] || 0) + 1;
    perDeck.push({
      zf: zf, lang: c.locale, plainTitle: plainTitle,
      plainHash: seoRecon.hashTitleOrDescription(plainTitle),
      variantId: c.manifest.variant_id || null
    });

    if ((i + 1) % 500 === 0) console.log('  scanned ' + (i + 1) + '/' + zips.length);
  }

  // A deck needs a disambiguator when its plain title is non-unique within the
  // batch, OR collides with an already-published same-language title.
  var needDisamb = {};   // zf -> variantId (the disambiguator)
  var noVariant = [];    // collisions we cannot disambiguate (no variant_id)
  perDeck.forEach(function (d) {
    var dupInBatch = titleCount[d.plainTitle] > 1;
    var existing = existingHashByLang[d.lang] && d.plainHash && existingHashByLang[d.lang].has(d.plainHash);
    if (dupInBatch || existing) {
      if (d.variantId) needDisamb[d.zf] = d.variantId;
      else noVariant.push(d.zf);
    }
  });

  console.log('\n[preband] === classification ===');
  console.log('  classify halts:               ' + halts.length);
  console.log('  OLD desc out-of-band:         ' + oldOutOfBand);
  console.log('  NEW desc lengths:             <120=' + newLenBuckets['<120'] + '  120-170=' + newLenBuckets['120-170'] + '  >170=' + newLenBuckets['>170']);
  console.log('  NEW desc STILL out-of-band:   ' + stillBad.length);
  console.log('  titles needing disambiguator: ' + Object.keys(needDisamb).length + ' (via variant_id)');
  console.log('  collisions w/o variant_id:    ' + noVariant.length);

  if (stillBad.length) { console.log('  -- sample still-out-of-band --'); stillBad.slice(0, 10).forEach(function (s) { console.log('   (' + s.len + ') ' + s.zf); }); }
  if (halts.length) { console.log('  -- sample halts --'); halts.slice(0, 10).forEach(function (h) { console.log('   ' + h.zf + ': ' + h.reason); }); }
  if (noVariant.length) { console.log('  -- collisions w/o variant_id (need manual review) --'); noVariant.slice(0, 10).forEach(function (z) { console.log('   ' + z); }); }

  var blocking = (halts.length > 0 || stillBad.length > 0 || noVariant.length > 0) && !force;
  if (dryRun) {
    console.log('\n[preband] DRY-RUN complete — no writes.' + (blocking ? '  (would NOT apply: resolve issues or pass --force)' : '  (ready to apply)'));
    if (!noDbCheck) await db.disconnect();
    process.exit(blocking ? 1 : 0);
  }
  if (blocking) {
    console.error('\n[preband] REFUSING to apply (halts/still-bad/no-variant). Pass --force to override.');
    if (!noDbCheck) await db.disconnect();
    process.exit(1);
  }

  // ---- Pass B (apply): backup once, then re-emit + repack each deck.html ----
  var backup = folder.replace(/[\\/]+$/, '') + '.preband-backup';
  if (!fs.existsSync(backup)) {
    console.log('[preband] creating backup: ' + backup);
    require('child_process').execFileSync('cp', ['-a', folder.replace(/[\\/]+$/, ''), backup], { stdio: 'inherit' });
  } else {
    console.log('[preband] backup already exists, leaving as-is: ' + backup);
  }

  var written = 0, skipped = 0;
  for (var j = 0; j < zips.length; j++) {
    var f = zips[j];
    var p = path.join(folder, f);
    var z = new AdmZip(p);
    var cc = classifyZip(z);
    if (cc.halt) { skipped++; continue; }
    var rr;
    try { rr = rebandHtml(cc, needDisamb[f] || null); }
    catch (e) { skipped++; continue; }
    if (rr.html === cc.html) { skipped++; continue; }
    z.updateFile(z.getEntry('deck.html'), Buffer.from(rr.html, 'utf8'));
    var tmp = p + '.tmp';
    z.writeZip(tmp);
    fs.renameSync(tmp, p);
    written++;
    if (written % 500 === 0) console.log('  repacked ' + written + '/' + zips.length);
  }
  console.log('\n[preband] APPLY complete — repacked ' + written + ', skipped ' + skipped + ', disambiguated ' + Object.keys(needDisamb).length + '. Backup at ' + backup);
  if (!noDbCheck) await db.disconnect();
}

main().catch(function (e) { console.error('FATAL', e && e.stack || e); process.exit(1); });
