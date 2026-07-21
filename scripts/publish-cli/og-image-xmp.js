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
 * LICENSABLE-IMAGE fields (added 2026-07-21, opts.licenseUrl / opts.acquireLicensePage):
 *   xmpRights:WebStatement   — URL of the license terms   → schema.org `license`
 *   xmpRights:UsageTerms     — human-readable usage grant
 *   photoshop:Credit         — credit line                → schema.org `creditText`
 *   plus:Licensor/LicensorURL — where to obtain the image → schema.org `acquireLicensePage`
 * These are the fields Google's Image-metadata / licensable-images feature validates on; the
 * dc: and rights fields above are recommended but NOT sufficient to mark an image "valid". Emitted
 * only when opts.licenseUrl is supplied, so existing og-image callers are byte-unchanged.
 *
 * No EXIF — the XMP packet supersets IPTC for our needs and Sharp natively supports `.withXmp()`
 * without external dependencies; Google reads these XMP rights fields as the IPTC equivalents.
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
  var licenseUrl = opts.licenseUrl || '';              // → xmpRights:WebStatement (schema license)
  var acquireUrl = opts.acquireLicensePage || '';      // → plus:LicensorURL (schema acquireLicensePage)
  var usageTerms = 'Free for personal, classroom, homeschool, and paid-instruction use. Not for resale or redistribution as a standalone product.';

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
  // Raw keyword list (e.g. parsed from a deck's <meta name="keywords">), used by callers that
  // don't have the three axis fields separated. Each is deduped against the above.
  if (Array.isArray(opts.subjects)) opts.subjects.forEach(pushSubject);
  pushSubject('worksheet');

  var subjectLi = subjects.map(function (s) {
    return '<rdf:li>' + escapeXml(s) + '</rdf:li>';
  }).join('');

  // XMP packet body. The xpacket header + trailer are added by Sharp/libvips
  // when withXmp() is called; we provide only the rdf:RDF root content.
  // Per Adobe XMP Specification Part 1 (ISO 16684-1), the rdf:RDF root with
  // a single rdf:Description carries Dublin Core fields (dc:*) + xmpRights:*.
  // Licensable-image block (Google validates on these) — only when a license URL is supplied.
  var licensing = licenseUrl ? [
    '<xmpRights:WebStatement>' + escapeXml(licenseUrl) + '</xmpRights:WebStatement>',
    '<xmpRights:UsageTerms><rdf:Alt><rdf:li xml:lang="x-default">' + escapeXml(usageTerms) + '</rdf:li></rdf:Alt></xmpRights:UsageTerms>',
    '<photoshop:Credit>' + escapeXml(creator) + '</photoshop:Credit>',
    acquireUrl
      ? '<plus:Licensor><rdf:Seq><rdf:li rdf:parseType="Resource"><plus:LicensorName>' + escapeXml(creator) +
        '</plus:LicensorName><plus:LicensorURL>' + escapeXml(acquireUrl) + '</plus:LicensorURL></rdf:li></rdf:Seq></plus:Licensor>'
      : ''
  ].filter(Boolean) : [];

  var xmp = [
    '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>',
    '<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="LessonCraftStudio-SEO-1.0">',
    '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">',
    '<rdf:Description rdf:about=""',
    ' xmlns:dc="http://purl.org/dc/elements/1.1/"',
    ' xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"',
    ' xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"',
    ' xmlns:plus="http://ns.useplus.org/ldf/xmp/1.0/">',
    '<dc:title><rdf:Alt><rdf:li xml:lang="x-default">' + escapeXml(title) + '</rdf:li></rdf:Alt></dc:title>',
    '<dc:description><rdf:Alt><rdf:li xml:lang="x-default">' + escapeXml(description) + '</rdf:li></rdf:Alt></dc:description>',
    '<dc:creator><rdf:Seq><rdf:li>' + escapeXml(creator) + '</rdf:li></rdf:Seq></dc:creator>',
    '<dc:rights><rdf:Alt><rdf:li xml:lang="x-default">' + escapeXml(rights) + '</rdf:li></rdf:Alt></dc:rights>',
    subjects.length ? '<dc:subject><rdf:Bag>' + subjectLi + '</rdf:Bag></dc:subject>' : '',
    '<xmpRights:Marked>True</xmpRights:Marked>'
  ].concat(licensing).concat([
    '</rdf:Description>',
    '</rdf:RDF>',
    '</x:xmpmeta>',
    '<?xpacket end="w"?>'
  ]).filter(Boolean).join('\n');

  return xmp;
}

module.exports = {
  buildXmpPacket: buildXmpPacket,
  stripBrandSuffix: stripBrandSuffix
};
