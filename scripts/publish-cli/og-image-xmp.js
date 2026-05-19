/**
 * XMP packet builder for og-image.png embedded metadata (Phase 3 SEO-thumbnail
 * commission 2026-05-19).
 *
 * Embeds Adobe Extensible Metadata Platform (XMP) into the og-image PNG via
 * Sharp's `.withXmp(Buffer)`. XMP is the canonical machine-readable image
 * metadata format Google + image-search engines recognize for attribution,
 * licensing, and contextual signals. Per the SEO-thumbnail research report:
 * Google's documented stance is that XMP/IPTC metadata has minimal direct
 * ranking impact but IS used for image-licensing badges and image-search
 * context. Lightweight win at ~1-2KB per image.
 *
 * Fields embedded:
 *   dc:title       — deck title (brand suffix stripped)
 *   dc:description — rendered meta description
 *   dc:creator     — LessonCraftStudio
 *   dc:rights      — copyright + free-to-use statement
 *   dc:subject     — bag of axis-key strings (exercise-type, theme, level + "worksheet")
 *   xmpRights:Marked — "True" (image is rights-managed; LCS retains attribution claim)
 *
 * No EXIF, no IPTC — XMP packet supersets both for our needs and Sharp natively
 * supports `.withXmp()` without external dependencies.
 */

'use strict';

function escapeXml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stripBrandSuffix(s) {
  return String(s || '').replace(/\s*\|\s*LessonCraftStudio\s*$/i, '').trim();
}

/**
 * Build an XMP packet (UTF-8 string) for embedding via Sharp.withXmp().
 *
 * opts = {
 *   title:        'Bingo Worksheet — Animals — Kindergarten | LessonCraftStudio'
 *                 (brand suffix stripped automatically)
 *   description:  'Free interactive Bingo Worksheet (Animals) for Kindergarten. Print or play online.'
 *   exerciseType: 'Bingo' (localized)        — included in dc:subject Bag
 *   themeName:    'Animals' (localized)      — included in dc:subject Bag (if present)
 *   levelName:    'Kindergarten' (localized) — included in dc:subject Bag
 *   locale:       'en' | 'es' | 'pt'         — informational
 * }
 *
 * Returns: string XMP packet (without xpacket BOM wrapper — Sharp adds it).
 */
function buildXmpPacket(opts) {
  opts = opts || {};
  var title = stripBrandSuffix(opts.title || '');
  var description = opts.description || '';
  var creator = 'LessonCraftStudio';
  var rights = '© LessonCraftStudio. Free for educational use.';

  var subjects = [];
  function pushSubject(s) {
    if (!s) return;
    var v = String(s).trim();
    if (!v) return;
    // Dedup case-insensitively.
    for (var i = 0; i < subjects.length; i++) {
      if (subjects[i].toLowerCase() === v.toLowerCase()) return;
    }
    subjects.push(v);
  }
  pushSubject(opts.exerciseType);
  pushSubject(opts.themeName);
  pushSubject(opts.levelName);
  pushSubject('worksheet');

  var subjectLi = subjects.map(function (s) {
    return '<rdf:li>' + escapeXml(s) + '</rdf:li>';
  }).join('');

  // XMP packet body. The xpacket header + trailer are added by Sharp/libvips
  // when withXmp() is called; we provide only the rdf:RDF root content.
  // Per Adobe XMP Specification Part 1 (ISO 16684-1), the rdf:RDF root with
  // a single rdf:Description carries Dublin Core fields (dc:*) + xmpRights:*.
  var xmp = [
    '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>',
    '<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="LessonCraftStudio-SEO-1.0">',
    '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">',
    '<rdf:Description rdf:about=""',
    ' xmlns:dc="http://purl.org/dc/elements/1.1/"',
    ' xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">',
    '<dc:title><rdf:Alt><rdf:li xml:lang="x-default">' + escapeXml(title) + '</rdf:li></rdf:Alt></dc:title>',
    '<dc:description><rdf:Alt><rdf:li xml:lang="x-default">' + escapeXml(description) + '</rdf:li></rdf:Alt></dc:description>',
    '<dc:creator><rdf:Seq><rdf:li>' + escapeXml(creator) + '</rdf:li></rdf:Seq></dc:creator>',
    '<dc:rights><rdf:Alt><rdf:li xml:lang="x-default">' + escapeXml(rights) + '</rdf:li></rdf:Alt></dc:rights>',
    subjects.length ? '<dc:subject><rdf:Bag>' + subjectLi + '</rdf:Bag></dc:subject>' : '',
    '<xmpRights:Marked>True</xmpRights:Marked>',
    '</rdf:Description>',
    '</rdf:RDF>',
    '</x:xmpmeta>',
    '<?xpacket end="w"?>'
  ].filter(Boolean).join('\n');

  return xmp;
}

module.exports = {
  buildXmpPacket: buildXmpPacket,
  stripBrandSuffix: stripBrandSuffix
};
