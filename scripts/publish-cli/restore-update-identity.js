#!/usr/bin/env node
/**
 * restore-update-identity.js <list> --at=<ISO time of the identity baseline> [--confirm]
 *
 * An in-place republish (publish-cli UPDATE) writes a fresh <head>. On a LANDING-LESS deck page (self-canonical, its own
 * indexable surface) that changes the search identity of an existing indexed page (docs/daily-teaching-system/PLAN.md
 * §5 rule 1): the title loses its demand tail (append-demand-title-tail.js) and the meta description changes with the
 * page's instruction. This script gives every page named in <list> the TITLE and the DESCRIPTION it had at the moment
 * the identity baseline was taken (docs/SEO/daily-system-baseline/baseline.json → "captured"; pass it as --at).
 *
 * Which state is that? A version folder's printable PDF is written once, at publish, so its time is the publish time.
 *   A. the live version was published BEFORE --at (the page was not republished since): the baseline saw this very
 *      version, so nothing is owed: SKIPPED. Only with --undo-overshoot=<file> (the one-time repair of 2026-11-18, see
 *      LESSON) the tail is taken off again, and a page named in <file> (lines "<locale> <slug>") gets the description
 *      the Deck row keeps (description.<locale>, written at publish and never rewritten).
 *   B. the live version was published AFTER --at: the baseline saw the newest retained version published before --at.
 *      Its deck.html is untouched since it was superseded: title and description are read from it. No such version
 *      retained (pruned) → reported, nothing changed.
 * Landing-backed pages are skipped (their canonical is the landing). Replacements are made in the html-escaped,
 * JSON-escaped and raw forms (title, og, twitter, JSON-LD); titleHash and descriptionHash follow. Dry-run by default.
 * Every change is written to --journal=<file> (JSON lines: locale, slug, title and description before and after).
 *
 * LESSON (2026-11-18): "the earlier version carried a tail" is NOT the reference. 1,262 pages had lost their tail over
 * many republish rounds; most of them before the baseline, which recorded them bare. Giving all of them the tail and
 * the oldest description back moved five sampled pages AWAY from the baseline. The reference is a point in time.
 *
 * <list> = lines "<locale> <slug> […]" (scan-lost-tails.js writes it; keep a copy before any tail is restored).
 * Usage (Hetzner, DATABASE_URL in env):
 *   node scripts/publish-cli/restore-update-identity.js /root/lost-tails-restored.txt --at=2026-11-13T06:51:33Z [--confirm]
 */
'use strict';
var fs = require('fs');
var path = require('path');
var db = require('./db');
var hashTitleOrDescription = require('./seo-reconciliation').hashTitleOrDescription;

var D = '/var/www/lcs-media/decks/';
var TAILS = JSON.parse(fs.readFileSync(path.join(__dirname, 'demand-title-tails.json'), 'utf8'));
var argv = process.argv.slice(2);
var LIST = argv.filter(function (a) { return a.indexOf('--') !== 0; })[0];
var CONFIRM = argv.indexOf('--confirm') !== -1;
var atArg = argv.filter(function (a) { return a.indexOf('--at=') === 0; })[0];
var AT = atArg ? Date.parse(atArg.slice(5)) : NaN;
var undoArg = argv.filter(function (a) { return a.indexOf('--undo-overshoot=') === 0; })[0];
var UNDO = undoArg ? new Set(fs.readFileSync(undoArg.slice(17), 'utf8').split(/\r?\n/).map(function (x) { return x.trim().split(/\s+/).slice(0, 2).join(' '); }).filter(Boolean)) : null;
var jArg = argv.filter(function (a) { return a.indexOf('--journal=') === 0; })[0];
var JOURNAL = jArg ? jArg.slice(10) : null;
if (!LIST || !(AT > 0)) { console.error('usage: restore-update-identity.js <list> --at=<ISO time> [--confirm]'); process.exit(2); }

function dec(s) { return s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'); }
function htmlEscape(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function jsonEscapeFragment(s) { return JSON.stringify(String(s)).slice(1, -1); }
function replaceAll(h, needle, repl) { if (!needle || h.indexOf(needle) === -1) return { text: h, count: 0 }; var p = h.split(needle); return { text: p.join(repl), count: p.length - 1 }; }
function headOf(f) { var fd; try { fd = fs.openSync(f, 'r'); } catch (e) { return null; } var b = Buffer.alloc(16384); var n = fs.readSync(fd, b, 0, 16384, 0); fs.closeSync(fd); return b.slice(0, n).toString('utf8'); }
function titleRawOf(h) { var m = h && /<title>([^<]*)<\/title>/.exec(h); return m ? m[1].trim() : null; }
function descRawOf(h) { var m = h && /<meta name="description" content="([^"]*)"/.exec(h); return m ? m[1] : null; }
function canonOf(h) { var m = h && /<link\s+rel="canonical"\s+href="([^"]+)"/.exec(h); return m ? m[1] : null; }
/** publish time of a version folder = the time of its printable PDF (written once); manifest.json when there is none */
function publishedAt(dir) {
  var names; try { names = fs.readdirSync(dir); } catch (e) { return NaN; }
  var f = names.filter(function (n) { return /printable\.pdf$/.test(n); })[0] || (names.indexOf('manifest.json') !== -1 ? 'manifest.json' : null);
  return f ? fs.statSync(path.join(dir, f)).mtimeMs : NaN;
}
/** swap `from` for `to` in every form the head and the JSON-LD carry it */
function swap(html, fromRaw, toRaw) {
  var total = 0; var seen = {}; var ft = dec(fromRaw), tt = dec(toRaw);
  [[fromRaw, toRaw], [htmlEscape(ft), htmlEscape(tt)], [jsonEscapeFragment(ft), jsonEscapeFragment(tt)], [ft, tt]].forEach(function (p) {
    if (seen[p[0]]) return; seen[p[0]] = true;
    var r = replaceAll(html, p[0], p[1]); html = r.text; total += r.count;
  });
  return { html: html, count: total };
}

async function main() {
  var prisma = db.client();
  var lines = fs.readFileSync(LIST, 'utf8').split(/\r?\n/).map(function (l) { return l.trim().split(/\s+/); }).filter(function (p) { return p.length >= 2 && p[0]; });
  var st = { named: lines.length, caseA: 0, caseB: 0, alreadyRight: 0, titleSet: 0, tailRemoved: 0, descSet: 0, landing: 0, noReference: 0, collision: 0, noRow: 0, notFound: 0, errors: 0 };
  var shown = 0;
  for (var i = 0; i < lines.length; i++) {
    var l = lines[i][0], s = lines[i][1];
    try {
      var tails = TAILS[l] ? [TAILS[l].full, TAILS[l].short].filter(Boolean) : [];
      var cur = fs.readlinkSync(D + l + '/' + s); var m = /-v(\d+)$/.exec(cur); var v = m ? +m[1] : 0;
      var live = D + l + '/' + s + '/deck.html';
      var ch = headOf(live); var curTitle = titleRawOf(ch), curDesc = descRawOf(ch);
      if ((canonOf(ch) || '').indexOf('/' + l + '/decks/' + s) === -1) { st.landing++; continue; }
      var row = await prisma.deck.findFirst({ where: { language: l, slug: s, status: 'published' }, select: { id: true, description: true } });
      if (!row) { st.noRow++; console.error('ERROR ' + l + '/' + s + ': no published row'); continue; }
      var wantTitle = null, wantDesc = null;
      if (publishedAt(D + l + '/' + s + '-v' + v) <= AT) {
        st.caseA++;
        if (!UNDO) continue;
        var tail = tails.filter(function (x) { return dec(curTitle).slice(-x.length) === x; })[0];
        wantTitle = tail ? htmlEscape(dec(curTitle).slice(0, -tail.length)) : curTitle;
        var d = row.description && (typeof row.description === 'string' ? row.description : row.description[l]);
        wantDesc = d && UNDO.has(l + ' ' + s) ? htmlEscape(d) : curDesc;
      } else {
        st.caseB++;
        for (var k = v - 1; k >= 1; k--) {
          var t = publishedAt(D + l + '/' + s + '-v' + k);
          if (!(t > 0)) continue;
          if (t <= AT) { var ph = headOf(D + l + '/' + s + '-v' + k + '/deck.html'); wantTitle = titleRawOf(ph); wantDesc = descRawOf(ph); break; }
        }
        if (wantTitle === null || wantDesc === null) { st.noReference++; console.log('NO-REFERENCE ' + l + '/' + s + ': no retained version from before the baseline'); continue; }
      }
      var tDiff = dec(wantTitle) !== dec(curTitle), dDiff = dec(wantDesc) !== dec(curDesc);
      if (!tDiff && !dDiff) { st.alreadyRight++; continue; }
      if (shown < 6) { shown++; console.log('PLAN ' + l + '/' + s + (tDiff ? '\n  title: "' + dec(curTitle) + '"\n      →  "' + dec(wantTitle) + '"' : '') + (dDiff ? '\n  description: "' + dec(curDesc) + '"\n            →  "' + dec(wantDesc) + '"' : '')); }
      var data = {};
      if (tDiff) { data.titleHash = hashTitleOrDescription(wantTitle); st.titleSet++; if (dec(curTitle).length > dec(wantTitle).length && dec(curTitle).indexOf(dec(wantTitle)) === 0) st.tailRemoved++; }
      if (dDiff) { data.descriptionHash = hashTitleOrDescription(wantDesc); st.descSet++; }
      if (JOURNAL) fs.appendFileSync(JOURNAL, JSON.stringify({ applied: CONFIRM, loc: l, slug: s, titleBefore: dec(curTitle), titleAfter: dec(wantTitle), descBefore: dec(curDesc), descAfter: dec(wantDesc) }) + '\n');
      if (!CONFIRM) continue;
      for (var key in data) {
        var q = { language: l, NOT: { id: row.id } }; q[key] = data[key];
        var clash = await prisma.deck.findFirst({ where: q, select: { slug: true } });
        if (clash) { st.collision++; console.log('SKIP-collision ' + l + '/' + s + ' (' + key + ' is now that of ' + clash.slug + ')'); data = null; break; }
      }
      if (!data) continue;
      var html = fs.readFileSync(live, 'utf8'); var n = 0;
      if (tDiff) { var a = swap(html, curTitle, wantTitle); html = a.html; n += a.count; }
      if (dDiff) { var b = swap(html, curDesc, wantDesc); html = b.html; n += b.count; }
      if (!n) { st.notFound++; console.error('ERROR ' + l + '/' + s + ': the live title / description was not found in the page'); continue; }
      var real = fs.realpathSync(live); var own = fs.statSync(real); var tmp = real + '.tmp-ident';
      fs.writeFileSync(tmp, html, 'utf8'); fs.chownSync(tmp, own.uid, own.gid); fs.chmodSync(tmp, own.mode & 0o777); fs.renameSync(tmp, real);
      await prisma.deck.update({ where: { id: row.id }, data: data });
    } catch (e) { st.errors++; console.error('ERROR ' + l + '/' + s + ': ' + e.message); }
  }
  console.log('=== restore-update-identity ' + (CONFIRM ? 'APPLIED' : 'DRY-RUN') + ' (baseline ' + new Date(AT).toISOString() + ') ===\n' + JSON.stringify(st));
  await db.disconnect();
  process.exit(st.errors || st.notFound || st.noRow ? 1 : 0);
}
main().catch(function (e) { console.error(e); process.exit(1); });
