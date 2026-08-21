/**
 * force-reband-staged.js — staged-ZIP SEO rebuild with COLLISION-AWARE forced
 * disambiguation, for REPLACEMENT batches routed via --updates-manifest.
 *
 * Why not stock preband (preband-staged-descriptions.js): its collision check
 * keys on TITLE hashes only (a desc-only collision with a live sibling slips
 * through and halts publish with DESC_NON_UNIQUE), it has no self-exclusion for
 * the ZIP's own UPDATE target, and a later plain preband pass would rebuild the
 * block and UNDO any pre-applied disambiguation. This script replaces preband
 * for such batches (run the wave with --skip-preband afterwards):
 *
 *   1. classify each staged ZIP (manifest + deck.html, marker Class A);
 *   2. compose the projected SEO block via the SAME engine preband uses
 *      (republish-seo.buildSeoOpts + build-seo-head.buildSeoHead — banding and
 *      the title-overhaul differentiator come along);
 *   3. hash the projected <title> + meta description (sha1-normalized per
 *      §17.8.18) and compare against ALL published rows of that language
 *      EXCLUDING the ZIP's own update target (from the updates-manifest);
 *   4. ZIPs colliding on title OR description are rebuilt WITH
 *      seoOpts.disambiguator = the target slug's trailing token, and that token
 *      is also written to manifest.variant_id; clean ZIPs are rebuilt plain
 *      (banded) exactly as preband would have done.
 *
 * Usage (Hetzner, from frontend/ with .env.production sourced):
 *   node ../scripts/publish-cli/force-reband-staged.js <folder> \
 *     --updates-manifest=<file> (--dry-run | --confirm)
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require(path.resolve(__dirname, '..', '..', 'node_modules', 'adm-zip'));
var db = require('./db');
var republish = require('./republish-seo');
var buildSeoHeadMod = require('./build-seo-head');
var seoRecon = require('./seo-reconciliation');

var SEO_MARKER_START = republish.SEO_MARKER_START;
var SEO_MARKER_END = republish.SEO_MARKER_END;
var SEO_BLOCK_REGEX = new RegExp(
  SEO_MARKER_START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' +
  SEO_MARKER_END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

function classifyZip(zip) {
  var me = zip.getEntry('manifest.json');
  var he = zip.getEntry('deck.html');
  if (!me || !he) throw new Error('missing manifest.json or deck.html');
  var manifest = JSON.parse(zip.readAsText(me));
  var html = zip.readAsText(he);
  if (html.indexOf(SEO_MARKER_START) === -1 || html.indexOf(SEO_MARKER_END) === -1) {
    throw new Error('no SEO markers (Class B) — unexpected for app-generated deck');
  }
  return {
    manifest: manifest, html: html, locale: manifest.language,
    slug: manifest.deck_id || '', seoClass: 'A',
    traceClass: manifest.seo_trace ? 'A.1' : 'A.2/B', hasCelebrationH1: false
  };
}

function blockTitle(block) {
  var m = /<title>([\s\S]*?)<\/title>/i.exec(block);
  return m ? m[1].trim() : null;
}
function blockDesc(block) {
  var m = /<meta\s+name="description"\s+content="([^"]*)"/i.exec(block);
  return m ? m[1] : null;
}
function suffixOf(slug) {
  var m = /-([0-9a-z]{2,6})$/.exec(slug);
  return m ? m[1] : slug.slice(-4);
}
function spliceBlock(c, disambiguator) {
  var seoOpts = republish.buildSeoOpts(c);
  if (disambiguator) seoOpts.disambiguator = String(disambiguator);
  var block = buildSeoHeadMod.buildSeoHead(seoOpts);
  if (block.indexOf(SEO_MARKER_START) !== 0) throw new Error('block not marker-wrapped');
  var out = c.html.replace(SEO_BLOCK_REGEX, function () { return block; });
  out = out.split('\n').map(function (line) {
    if (line.indexOf('lcs-celebration__title') === -1) return line;
    return line.replace(/<h1 /g, '<h2 ').replace(/<\/h1>/g, '</h2>');
  }).join('\n');
  return { html: out, block: block };
}

async function main() {
  var argv = process.argv.slice(2);
  var dryRun = argv.indexOf('--dry-run') !== -1;
  var confirm = argv.indexOf('--confirm') !== -1;
  var umArg = argv.filter(function (a) { return a.indexOf('--updates-manifest=') === 0; })[0];
  var folder = argv.filter(function (a) { return a.indexOf('--') !== 0; })[0];
  if (!folder || !umArg || (!dryRun && !confirm)) {
    console.error('USAGE: <folder> --updates-manifest=<file> (--dry-run|--confirm)');
    process.exit(2);
  }
  var updates = JSON.parse(fs.readFileSync(umArg.slice('--updates-manifest='.length), 'utf8'));
  var zips = fs.readdirSync(folder).filter(function (f) { return f.toLowerCase().endsWith('.zip'); }).sort();

  // live hash maps per language: hash -> [slug]
  var titleBySlugHash = {}, descBySlugHash = {}, langs = {};
  zips.forEach(function (zf) {
    var z = new AdmZip(path.join(folder, zf));
    var m = JSON.parse(z.readAsText(z.getEntry('manifest.json')));
    langs[m.language] = true;
  });
  for (var L in langs) {
    var rows = await db.client().deck.findMany({
      where: { language: L, status: 'published' },
      select: { slug: true, titleHash: true, descriptionHash: true }
    });
    titleBySlugHash[L] = {}; descBySlugHash[L] = {};
    rows.forEach(function (r) {
      if (r.titleHash) (titleBySlugHash[L][r.titleHash] = titleBySlugHash[L][r.titleHash] || []).push(r.slug);
      if (r.descriptionHash) (descBySlugHash[L][r.descriptionHash] = descBySlugHash[L][r.descriptionHash] || []).push(r.slug);
    });
    console.log('[force-reband] ' + L + ': ' + rows.length + ' published rows loaded');
  }

  var results = [];
  for (var i = 0; i < zips.length; i++) {
    var zf = zips[i];
    var target = updates[zf];
    if (!target) { console.error('SKIP (not in updates-manifest): ' + zf); continue; }
    var zip = new AdmZip(path.join(folder, zf));
    var c = classifyZip(zip);
    var plain = spliceBlock(c, null);
    var t = blockTitle(plain.block), d = blockDesc(plain.block);
    var th = seoRecon.hashTitleOrDescription(t), dh = seoRecon.hashTitleOrDescription(d);
    var tColl = (titleBySlugHash[c.locale][th] || []).filter(function (s) { return s !== target; });
    var dColl = (descBySlugHash[c.locale][dh] || []).filter(function (s) { return s !== target; });
    var needDisamb = tColl.length > 0 || dColl.length > 0;
    var code = needDisamb ? suffixOf(target) : null;
    var finalOut = needDisamb ? spliceBlock(c, code) : plain;
    var ft = blockTitle(finalOut.block), fd = blockDesc(finalOut.block);
    // post-check: the disambiguated head must be collision-free too
    var fth = seoRecon.hashTitleOrDescription(ft), fdh = seoRecon.hashTitleOrDescription(fd);
    var still = (titleBySlugHash[c.locale][fth] || []).concat(descBySlugHash[c.locale][fdh] || [])
      .filter(function (s) { return s !== target; });
    results.push({ zf: zf, target: target, needDisamb: needDisamb, code: code,
      tColl: tColl, dColl: dColl, still: still, title: ft, descLen: (fd || '').length });
    console.log((needDisamb ? 'DISAMB ' : 'plain  ') + zf + ' -> ' + target +
      (needDisamb ? ('  code=' + code + '  titleColl=[' + tColl.join(',') + ']  descColl=[' + dColl.join(',') + ']') : '') +
      '  | ' + ft + '  (desc ' + (fd || '').length + ' ch)');
    if (still.length) console.error('  !! STILL COLLIDING after disambiguation: ' + still.join(','));

    if (confirm) {
      zip.updateFile(zip.getEntry('deck.html'), Buffer.from(finalOut.html, 'utf8'));
      if (needDisamb) {
        var man = c.manifest; man.variant_id = code;
        zip.updateFile(zip.getEntry('manifest.json'), Buffer.from(JSON.stringify(man, null, 2), 'utf8'));
      }
      var p = path.join(folder, zf), tmp = p + '.tmp';
      zip.writeZip(tmp); fs.renameSync(tmp, p);
    }
  }
  var stillBad = results.filter(function (r) { return r.still.length; });
  console.log('\n[force-reband] ' + (confirm ? 'APPLY' : 'DRY-RUN') + ' — ' + results.length +
    ' ZIPs, disambiguated ' + results.filter(function (r) { return r.needDisamb; }).length +
    ', unresolved ' + stillBad.length);
  await db.disconnect();
  process.exit(stillBad.length ? 1 : 0);
}

main().catch(function (e) { console.error('FATAL', e && e.stack || e); process.exit(1); });
