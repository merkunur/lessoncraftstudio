/**
 * PDF /Info metadata + clickable link-back annotation injection.
 *
 * Per external SEO audit (2026-05-27): Google indexes PDFs directly and
 * relies on the /Info dict (Title, Author, Subject, Keywords, Creator,
 * Producer) for snippet generation + topic determination. The audit also
 * flagged the absence of a clickable link back to the canonical landing
 * page — without one, a teacher's printed-then-photographed-then-shared
 * PDF carries zero backlink authority to lessoncraftstudio.com.
 *
 * Architectural pattern: publish-cli post-processing at the asset
 * boundary (precedent: og-image-xmp.js + Sharp.withXmp for OG image
 * metadata; see CLAUDE.md §A.14.10).
 *
 * Image alt text inside the PDF is structurally infeasible — current
 * PDFs are flat JPEG snapshots (one `pdf.addImage` call per page; no
 * image-object granularity for /Alt entries). HTML landing page covers
 * that surface per §17.8.2.
 *
 * pdf-lib API notes:
 *   - .setTitle/setAuthor/setSubject/setKeywords/setCreator/setProducer
 *     write the /Info dict directly.
 *   - Link annotations require dict construction via context.obj since
 *     pdf-lib doesn't ship a high-level Page.addLink() method. The
 *     annotation Rect is in PDF points, origin bottom-left.
 *
 * Idempotency: calling enhancePdf on an already-enhanced PDF overwrites
 * /Info fields cleanly and appends a duplicate link annotation. The
 * retrofit path uses the LCS_LINK_ANNOT_TAG marker key to detect +
 * remove prior annotations before re-adding, so multi-run is safe.
 */

'use strict';

var pdfLib = require('pdf-lib');
var PDFDocument = pdfLib.PDFDocument;
var PDFName = pdfLib.PDFName;
var PDFString = pdfLib.PDFString;

// Marker on link annotations so we can identify + replace ours on
// re-runs without disturbing third-party annotations operators added.
var LCS_LINK_ANNOT_TAG = 'LCSCanonicalLink';

/**
 * Inject /Info metadata + clickable link annotation into a PDF buffer.
 *
 * @param {Buffer} buffer - input PDF bytes
 * @param {object} opts
 * @param {string} opts.title          - /Title (deck name in locale)
 * @param {string} opts.author         - /Author ("LessonCraftStudio")
 * @param {string} [opts.subject]      - /Subject (deck description in locale)
 * @param {string} [opts.keywords]     - /Keywords (comma-joined)
 * @param {string} [opts.creator]      - /Creator (defaults to "LessonCraftStudio (publish-cli)")
 * @param {string} [opts.producer]     - /Producer (defaults to "pdf-lib")
 * @param {string} opts.canonicalUrl   - URI target for clickable link annotation
 * @returns {Promise<Buffer>}          - enhanced PDF bytes
 */
async function enhancePdf(buffer, opts) {
  if (!buffer || !buffer.length) {
    throw new Error('pdf-metadata.enhancePdf: empty buffer');
  }
  if (!opts || typeof opts.title !== 'string' || !opts.title) {
    throw new Error('pdf-metadata.enhancePdf: opts.title required');
  }
  if (!opts.canonicalUrl || typeof opts.canonicalUrl !== 'string') {
    throw new Error('pdf-metadata.enhancePdf: opts.canonicalUrl required');
  }

  var doc = await PDFDocument.load(buffer, { updateMetadata: false });

  // /Info dict — pdf-lib's setters write into doc.context.trailerInfo.
  doc.setTitle(opts.title);
  doc.setAuthor(opts.author || 'LessonCraftStudio');
  if (opts.subject) doc.setSubject(opts.subject);
  if (opts.keywords) {
    // PDF /Keywords spec is a single text string; convention is comma-separated.
    // pdf-lib's setKeywords(string[]) joins with space, which is non-canonical
    // for the comma convention search engines expect. Pass the comma-joined
    // string as a 1-element array so pdf-lib writes it verbatim.
    var keywordsString = Array.isArray(opts.keywords)
      ? opts.keywords.join(', ')
      : String(opts.keywords);
    doc.setKeywords([keywordsString]);
  }
  doc.setCreator(opts.creator || 'LessonCraftStudio (publish-cli)');
  doc.setProducer(opts.producer || 'pdf-lib');
  // ModDate auto-updated by pdf-lib on save; CreationDate preserved if present.

  // Link annotation on every page — bottom-center band overlaying the
  // baked "Made with LessonCraftStudio.com" attribution text per §14.3.
  // 200pt wide × 18pt tall, centered horizontally, 6pt from page bottom.
  var pages = doc.getPages();
  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    addOrReplaceCanonicalLinkAnnotation(doc, page, opts.canonicalUrl);
  }

  // updateMetadata:false on .save() prevents pdf-lib from overwriting our
  // /Info dict with its defaults. Tested in pdf-lib >=1.17.
  var bytes = await doc.save({ updateFieldAppearances: false });
  return Buffer.from(bytes);
}

/**
 * Add (or replace if previously injected by us) a clickable URI link
 * annotation in the bottom-center attribution band of a page.
 */
function addOrReplaceCanonicalLinkAnnotation(doc, page, url) {
  var pageWidth = page.getWidth();
  // 200×18pt band centered horizontally at 6pt from bottom. The baked
  // attribution text in the JPEG is approximately 14pt tall, centered;
  // this band over-covers it modestly so click target is forgiving.
  var bandWidth = 200;
  var bandHeight = 18;
  var bandX = (pageWidth - bandWidth) / 2;
  var bandY = 6;

  // Build annotation dict (PDF spec: /Annot subtype /Link with /A URI action).
  var annot = doc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [bandX, bandY, bandX + bandWidth, bandY + bandHeight],
    Border: [0, 0, 0],  // No visible border (covers baked text)
    F: 4,               // /F flag bit 3 = Print (annotation prints with page)
    NM: PDFString.of(LCS_LINK_ANNOT_TAG),  // Identifier for idempotent retrofit
    A: doc.context.obj({
      Type: 'Action',
      S: 'URI',
      URI: PDFString.of(url),
    }),
  });
  var annotRef = doc.context.register(annot);

  // Existing /Annots array on page?
  var annotsKey = PDFName.of('Annots');
  var annots = page.node.lookup(annotsKey);
  if (!annots) {
    page.node.set(annotsKey, doc.context.obj([annotRef]));
    return;
  }

  // Strip any prior LCS link annotation so multi-runs don't duplicate.
  // The Annots array can hold either refs or inline dicts; handle both.
  var keptItems = [];
  var existingItems = annots.asArray ? annots.asArray() : [];
  for (var j = 0; j < existingItems.length; j++) {
    var item = existingItems[j];
    var resolved = item;
    try {
      resolved = doc.context.lookup(item) || item;
    } catch (e) {
      resolved = item;
    }
    var isOurs = false;
    try {
      var nm = resolved && resolved.get && resolved.get(PDFName.of('NM'));
      if (nm && typeof nm.decodeText === 'function' && nm.decodeText() === LCS_LINK_ANNOT_TAG) {
        isOurs = true;
      } else if (nm && typeof nm.asString === 'function' && nm.asString() === LCS_LINK_ANNOT_TAG) {
        isOurs = true;
      }
    } catch (e) { /* not ours */ }
    if (!isOurs) keptItems.push(item);
  }
  keptItems.push(annotRef);
  page.node.set(annotsKey, doc.context.obj(keptItems));
}

module.exports = {
  enhancePdf: enhancePdf,
  LCS_LINK_ANNOT_TAG: LCS_LINK_ANNOT_TAG,
};
