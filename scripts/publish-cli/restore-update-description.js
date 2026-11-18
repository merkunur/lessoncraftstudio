#!/usr/bin/env node
/**
 * restore-update-description.js <list> [--confirm]
 *
 * Companion of scan-lost-tails.js + append-demand-title-tail.js --slugs-file (2026-11-18). An in-place republish
 * (publish-cli UPDATE) writes a fresh <head>: a landing-less deck page (self-canonical, its own indexable surface) then
 * shows a new meta description, because the description takes the page's instruction as its middle sentence and the
 * republish corrected that instruction. The search identity of an existing indexed page must not change
 * (docs/daily-teaching-system/PLAN.md §5 rule 1; metadata is corrected only when the operator asks), so this script
 * puts back the description the page carried in its retained earlier version.
 *
 * <list> = lines "<locale> <slug> [full|short]" (the file scan-lost-tails.js wrote BEFORE the tails were restored; keep a
 * copy: the scan finds nothing once the tails are back). For each page: the reference is the nearest retained earlier
 * version whose title ends with a demand tail (the state before the republish). Where the live description differs, it
 * is replaced in its html-escaped, JSON-escaped and raw forms (meta description, og:description, twitter:description,
 * JSON-LD description); the Deck row's descriptionHash follows. Landing-backed pages are skipped (their canonical is the
 * landing; their deck head is not the search identity). Without --confirm it only reports.
 *
 * Usage (Hetzner, DATABASE_URL in env): node scripts/publish-cli/restore-update-description.js /root/lost-tails-restored.txt [--confirm]
 */
'use strict';
var fs = require('fs');
var path = require('path');
var db = require('./db');
var hashTitleOrDescription = require('./seo-reconciliation').hashTitleOrDescription;

var D = '/var/www/lcs-media/decks/';
var TAILS = JSON.parse(fs.readFileSync(path.join(__dirname, 'demand-title-tails.json'), 'utf8'));
var LIST = process.argv.slice(2).filter(function (a) { return a.indexOf('--') !== 0; })[0];
var CONFIRM = process.argv.indexOf('--confirm') !== -1;
if (!LIST) { console.error('usage: restore-update-description.js <list> [--confirm]'); process.exit(2); }

function dec(s) { return s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'); }
function htmlEscape(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function jsonEscapeFragment(s) { return JSON.stringify(String(s)).slice(1, -1); }
function replaceAll(h, needle, repl) { if (!needle || h.indexOf(needle) === -1) return { text: h, count: 0 }; var p = h.split(needle); return { text: p.join(repl), count: p.length - 1 }; }
function headOf(f) { var fd; try { fd = fs.openSync(f, 'r'); } catch (e) { return null; } var b = Buffer.alloc(16384); var n = fs.readSync(fd, b, 0, 16384, 0); fs.closeSync(fd); return b.slice(0, n).toString('utf8'); }
function titleOf(h) { var m = h && /<title>([^<]*)<\/title>/.exec(h); return m ? dec(m[1]) : null; }
function descRawOf(h) { var m = h && /<meta name="description" content="([^"]*)"/.exec(h); return m ? m[1] : null; }
function canonOf(h) { var m = h && /<link\s+rel="canonical"\s+href="([^"]+)"/.exec(h); return m ? m[1] : null; }

async function main() {
  var prisma = db.client();
  var lines = fs.readFileSync(LIST, 'utf8').split(/\r?\n/).map(function (l) { return l.trim().split(/\s+/); }).filter(function (p) { return p.length >= 2 && p[0]; });
  var st = { named: lines.length, same: 0, restored: 0, noReference: 0, landing: 0, notFoundInBody: 0, collision: 0, noRow: 0, errors: 0 };
  var shown = 0;
  for (var i = 0; i < lines.length; i++) {
    var l = lines[i][0], s = lines[i][1];
    var tails = TAILS[l] ? [TAILS[l].full, TAILS[l].short].filter(Boolean) : [];
    var cur; try { cur = fs.readlinkSync(D + l + '/' + s); } catch (e) { st.errors++; console.error('ERROR ' + l + '/' + s + ': not a live page'); continue; }
    var m = /-v(\d+)$/.exec(cur); var v = m ? +m[1] : 0;
    var live = D + l + '/' + s + '/deck.html';
    var ch = headOf(live);
    var canon = canonOf(ch) || '';
    if (canon.indexOf('/' + l + '/decks/' + s) === -1) { st.landing++; continue; }
    var refRaw = null;
    for (var k = v - 1; k >= Math.max(1, v - 3); k--) {
      var ph = headOf(D + l + '/' + s + '-v' + k + '/deck.html'); var pt = titleOf(ph);
      if (pt && tails.some(function (x) { return pt.slice(-x.length) === x; })) { refRaw = descRawOf(ph); break; }
    }
    var curRaw = descRawOf(ch);
    if (refRaw === null || curRaw === null) { st.noReference++; continue; }
    var refText = dec(refRaw), curText = dec(curRaw);
    if (refText === curText) { st.same++; continue; }
    if (shown < 4) { shown++; console.log('PLAN ' + l + '/' + s + '\n  live: "' + curText + '"\n  back: "' + refText + '"'); }
    if (!CONFIRM) { st.restored++; continue; }
    try {
      var row = await prisma.deck.findFirst({ where: { language: l, slug: s, status: 'published' }, select: { id: true, descriptionHash: true } });
      if (!row) { st.noRow++; console.error('ERROR ' + l + '/' + s + ': no published row'); continue; }
      // (the hash is taken over the description as the head carries it: measured 2026-11-18, the row's hash equals the hash of the live attribute)
      var newHash = hashTitleOrDescription(refRaw);
      var clash = await prisma.deck.findFirst({ where: { language: l, descriptionHash: newHash, NOT: { id: row.id } }, select: { slug: true } });
      if (clash) { st.collision++; console.log('SKIP-collision ' + l + '/' + s + ': the earlier description is now the description of ' + clash.slug); continue; }
      var html = fs.readFileSync(live, 'utf8'); var total = 0; var seen = {};
      [[curRaw, refRaw], [htmlEscape(curText), htmlEscape(refText)], [jsonEscapeFragment(curText), jsonEscapeFragment(refText)], [curText, refText]].forEach(function (pair) {
        if (seen[pair[0]]) return; seen[pair[0]] = true;
        var r = replaceAll(html, pair[0], pair[1]); html = r.text; total += r.count;
      });
      if (!total) { st.notFoundInBody++; console.error('ERROR ' + l + '/' + s + ': the live description was not found in the page'); continue; }
      var real = fs.realpathSync(live); var own = fs.statSync(real); var tmp = real + '.tmp-desc';
      fs.writeFileSync(tmp, html, 'utf8'); fs.chownSync(tmp, own.uid, own.gid); fs.chmodSync(tmp, own.mode & 0o777); fs.renameSync(tmp, real);
      await prisma.deck.update({ where: { id: row.id }, data: { descriptionHash: newHash } });
      st.restored++;
    } catch (e) { st.errors++; console.error('ERROR ' + l + '/' + s + ': ' + e.message); }
  }
  console.log('=== restore-update-description ' + (CONFIRM ? 'APPLIED' : 'DRY-RUN') + ' ===\n' + JSON.stringify(st));
  await db.disconnect();
  process.exit(st.errors || st.notFoundInBody || st.noRow ? 1 : 0);
}
main().catch(function (e) { console.error(e); process.exit(1); });
