#!/usr/bin/env node
/**
 * Embed LICENSABLE-IMAGE metadata into each deck's PNG image files (thumbnail.png + og-image.png).
 *
 * WHY. Search Console's "Image Metadata" report validates an image on its LICENSING fields, not on
 * a title/description. It is fed two ways: on-page ImageObject structured data (handled separately
 * in the landing route) AND the IPTC/XMP embedded in the image FILE — and the file path is read by
 * Googlebot-Image when it fetches the image from the sitemap's <image:image> entries, a channel
 * INDEPENDENT of the throttled HTML-page crawl. So embedding the fields into the file is the part
 * of this that can pay off even while page crawl is scarce.
 *
 * Our og-image.png already carried dc:title/description/subject/rights XMP; the thumbnail.png was
 * completely bare. Neither carried the licensing fields Google actually validates on. This walker
 * writes an XMP packet (via og-image-xmp.js, now with xmpRights:WebStatement + plus:Licensor +
 * photoshop:Credit) into BOTH pngs, sourcing the localized title/description/keywords from the
 * deck.html <head> the page already serves.
 *
 * HOW — PNG iTXt chunk surgery, NOT a Sharp re-encode. The XMP is inserted as an `XML:com.adobe.xmp`
 * iTXt chunk; every pixel byte (IHDR/IDAT/PLTE/…) is copied verbatim, so the rendered image is
 * provably identical (only the metadata chunk changes). This is faster than decode+encode and
 * carries zero colour-profile / recompression risk.
 *
 * SAFE: writes a one-time <file>.bak, writes atomically (<file>.new → rename), idempotent (a png
 * already carrying the exact target XMP is left byte-untouched), per-locale, low-traffic-first.
 *
 * Usage:
 *   node write-image-metadata.js --locales=en[,de,...] [--sample=N] [--dry-run] [--decks-root=/var/www/lcs-media/decks]
 */
'use strict';

var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var X = require('./og-image-xmp.js');

var HOST = 'https://www.lessoncraftstudio.com';
var XMP_KEYWORD = 'XML:com.adobe.xmp';

/* --------------------------------------------------------------- CRC32 (PNG) */
var CRC_TABLE = (function () {
  var t = new Int32Array(256);
  for (var n = 0; n < 256; n++) {
    var c = n;
    for (var k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  var c = 0xffffffff;
  for (var i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/* ---------------------------------------------------------- PNG chunk parsing */
var PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function parseChunks(buf) {
  if (buf.length < 8 || !buf.slice(0, 8).equals(PNG_SIG)) throw new Error('not a PNG');
  var chunks = [];
  var off = 8;
  while (off + 8 <= buf.length) {
    var len = buf.readUInt32BE(off);
    var type = buf.toString('latin1', off + 4, off + 8);
    var dataStart = off + 8;
    var dataEnd = dataStart + len;
    if (dataEnd + 4 > buf.length) throw new Error('truncated PNG chunk');
    chunks.push({ type: type, data: buf.slice(dataStart, dataEnd) });
    off = dataEnd + 4; // skip CRC
    if (type === 'IEND') break;
  }
  return chunks;
}

/** Build a complete iTXt chunk buffer (length + type + data + crc) carrying an uncompressed XMP. */
function buildXmpItxtChunk(xmpText) {
  var keyword = Buffer.from(XMP_KEYWORD, 'latin1');
  var text = Buffer.from(xmpText, 'utf8');
  var data = Buffer.concat([
    keyword, Buffer.from([0x00]), // keyword + null
    Buffer.from([0x00]),          // compression flag: 0 = uncompressed
    Buffer.from([0x00]),          // compression method
    Buffer.from([0x00]),          // language tag (empty) + null
    Buffer.from([0x00]),          // translated keyword (empty) + null
    text,
  ]);
  var typeBuf = Buffer.from('iTXt', 'latin1');
  var len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  var crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

/** Text of an existing XMP iTXt chunk, or null. Only reads uncompressed iTXt (what we write). */
function existingXmpText(chunks) {
  for (var i = 0; i < chunks.length; i++) {
    if (chunks[i].type !== 'iTXt') continue;
    var d = chunks[i].data;
    var nul = d.indexOf(0x00);
    if (nul < 0) continue;
    if (d.toString('latin1', 0, nul) !== XMP_KEYWORD) continue;
    var compFlag = d[nul + 1];
    // layout: keyword \0 compFlag compMethod lang \0 transKw \0 text
    var p = nul + 3;
    var langEnd = d.indexOf(0x00, p); if (langEnd < 0) continue;
    var transEnd = d.indexOf(0x00, langEnd + 1); if (transEnd < 0) continue;
    var textBuf = d.slice(transEnd + 1);
    if (compFlag === 1) { try { textBuf = zlib.inflateSync(textBuf); } catch (e) { return null; } }
    return textBuf.toString('utf8');
  }
  return null;
}

/** Reassemble a PNG whose XMP iTXt is exactly `xmpText` — every non-XMP chunk copied verbatim. */
function setPngXmp(buf, xmpText) {
  var chunks = parseChunks(buf);
  var out = [PNG_SIG];
  var inserted = false;
  function chunkBytes(c) {
    var typeBuf = Buffer.from(c.type, 'latin1');
    var len = Buffer.alloc(4); len.writeUInt32BE(c.data.length, 0);
    var crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, c.data])), 0);
    return Buffer.concat([len, typeBuf, c.data, crc]);
  }
  for (var i = 0; i < chunks.length; i++) {
    var c = chunks[i];
    // Drop any pre-existing XMP iTXt; we re-insert a fresh one after IHDR.
    if (c.type === 'iTXt') {
      var nul = c.data.indexOf(0x00);
      if (nul >= 0 && c.data.toString('latin1', 0, nul) === XMP_KEYWORD) continue;
    }
    out.push(chunkBytes(c));
    if (c.type === 'IHDR' && !inserted) { out.push(buildXmpItxtChunk(xmpText)); inserted = true; }
  }
  if (!inserted) throw new Error('no IHDR — refusing to write');
  return Buffer.concat(out);
}

/* --------------------------------------------------- deck.html head extraction */
function decodeEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#x2F;/gi, '/');
}
function metaContent(html, matcher) {
  var re = new RegExp('<meta[^>]+(?:property|name)=["\']' + matcher + '["\'][^>]*>', 'i');
  var m = html.match(re);
  if (!m) return '';
  var c = m[0].match(/content=["']([\s\S]*?)["']/i);
  return c ? decodeEntities(c[1].trim()) : '';
}
function readHead(html) {
  var title = metaContent(html, 'og:title');
  if (!title) { var mt = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i); title = mt ? decodeEntities(mt[1].trim()) : ''; }
  var description = metaContent(html, 'og:description') || metaContent(html, 'description');
  // Subjects: the LearningResource JSON-LD `keywords` (a comma list like
  // "Addition, 4th of July, kindergarten, Worksheet, ...") is the richest source; the deck.html
  // carries no <meta name="keywords">. Fall back to any meta keywords if the JSON-LD field moves.
  var kw = '';
  var ld = html.match(/"keywords"\s*:\s*"([^"]*)"/i);
  if (ld) kw = decodeEntities(ld[1]);
  if (!kw) kw = metaContent(html, 'keywords');
  var subjects = kw ? kw.split(',').map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 8) : [];
  return { title: title, description: description, subjects: subjects };
}

/* --------------------------------------------------------------- deck walking */
function walkDecks(rootDir, locale) {
  var localeDir = path.join(rootDir, locale);
  if (!fs.existsSync(localeDir)) return [];
  return fs.readdirSync(localeDir).filter(function (n) {
    if (n.charAt(0) === '.') return false;
    var st; try { st = fs.lstatSync(path.join(localeDir, n)); } catch (e) { return false; }
    return st.isDirectory() && /-v\d+$/.test(n);
  }).map(function (n) {
    return { slug: n.replace(/-v\d+$/, ''), dir: path.join(localeDir, n) };
  });
}

/* ------------------------------------------------------------------ one image */
function processPng(file, xmpText, dryRun) {
  if (!fs.existsSync(file)) return 'absent';
  var buf = fs.readFileSync(file);
  var current;
  try { current = existingXmpText(parseChunks(buf)); } catch (e) { return 'error:' + e.message; }
  if (current === xmpText) return 'skip';       // already exactly this — byte-untouched
  if (dryRun) return current == null ? 'would-add' : 'would-update';
  var next;
  try { next = setPngXmp(buf, xmpText); } catch (e) { return 'error:' + e.message; }
  var bak = file + '.bak';
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, buf);   // one-time original
  var tmp = file + '.new';
  fs.writeFileSync(tmp, next);
  fs.renameSync(tmp, file);
  return current == null ? 'added' : 'updated';
}

/* ------------------------------------------------------------------ per deck */
function processDeck(entry, locale, dryRun) {
  var htmlPath = path.join(entry.dir, 'deck.html');
  if (!fs.existsSync(htmlPath)) return { thumbnail: 'no-html', ogImage: 'no-html' };
  var head = readHead(fs.readFileSync(htmlPath, 'utf8'));
  var licenseUrl = HOST + '/' + locale + '/license';
  var acquire = HOST + '/' + locale + '/decks/' + entry.slug + '/';
  var xmp = X.buildXmpPacket({
    title: head.title, description: head.description, subjects: head.subjects,
    licenseUrl: licenseUrl, acquireLicensePage: acquire, locale: locale,
  });
  return {
    thumbnail: processPng(path.join(entry.dir, 'thumbnail.png'), xmp, dryRun),
    ogImage: processPng(path.join(entry.dir, 'og-image.png'), xmp, dryRun),
  };
}

/* ----------------------------------------------------------------------- main */
function parseArgs(argv) {
  var a = { locales: [], sample: 0, dryRun: false, decksRoot: '/var/www/lcs-media/decks' };
  argv.slice(2).forEach(function (arg) {
    if (arg === '--dry-run') a.dryRun = true;
    else if (arg.indexOf('--locales=') === 0) a.locales = arg.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (arg.indexOf('--sample=') === 0) a.sample = parseInt(arg.slice(9), 10) || 0;
    else if (arg.indexOf('--decks-root=') === 0) a.decksRoot = arg.slice(13);
  });
  return a;
}

function main() {
  var args = parseArgs(process.argv);
  if (!args.locales.length) { console.error('need --locales=en[,de,...]'); process.exit(1); }
  console.log('[img-meta] locales=' + args.locales.join(',') + (args.dryRun ? ' (dry-run)' : '') + (args.sample ? ' sample=' + args.sample : ''));
  var grand = {};
  function bump(k) { grand[k] = (grand[k] || 0) + 1; }
  for (var li = 0; li < args.locales.length; li++) {
    var loc = args.locales[li];
    var entries = walkDecks(args.decksRoot, loc);
    if (args.sample) entries = entries.slice(0, args.sample);
    var per = {};
    function pbump(k) { per[k] = (per[k] || 0) + 1; }
    for (var i = 0; i < entries.length; i++) {
      var r = processDeck(entries[i], loc, args.dryRun);
      pbump('thumb:' + r.thumbnail); pbump('og:' + r.ogImage);
      bump('thumb:' + r.thumbnail); bump('og:' + r.ogImage);
      if (i && i % 2000 === 0) console.log('[img-meta] ' + loc + ' ' + i + '/' + entries.length);
    }
    console.log('[img-meta] ' + loc + ' (' + entries.length + ' decks): ' + JSON.stringify(per));
  }
  console.log('[img-meta] TOTAL: ' + JSON.stringify(grand));
}

if (require.main === module) main();
module.exports = { setPngXmp: setPngXmp, existingXmpText: existingXmpText, parseChunks: parseChunks, readHead: readHead, buildXmpItxtChunk: buildXmpItxtChunk };
