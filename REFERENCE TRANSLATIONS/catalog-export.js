/*
 * catalog-export.js — shared module for the "Export to catalog" workflow
 *
 * Bundles five artifacts (manifest.json, deck.html, printable.pdf, answer-key.pdf,
 * thumbnail.png) into a single <deck_id>.zip file the operator publishes through
 * the catalog pipeline (CLAUDE.md §15.2). The schema of manifest.json matches the
 * generation.json layer described in CLAUDE.md §15.1.
 *
 * Loaded same-origin alongside the other shared worksheet-generator modules
 * (access-guard.js, attribution-manager.js, image-reference.js). Depends on JSZip
 * 3.10.1 — load that first.
 *
 * Public API:
 *   window.LCSCatalogExport.export(opts)         → Promise<{deckId, zipFileName}>
 *   window.LCSCatalogExport.buildSeoHead(opts)   → string of SEO <head> HTML
 *   window.LCSCatalogExport.buildEndDeckLinks()  → string of end-deck links HTML
 *
 * The export either succeeds completely or throws — never produces a partial ZIP.
 * The caller wraps the call in try/catch and surfaces the error message via the
 * app's existing toast/showMessage helper.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  PLACEHOLDER SUBSTITUTION CONTRACT (CLAUDE.md §17.8 / Brief A §6 / Brief B)
 * ─────────────────────────────────────────────────────────────────────────────
 *  buildSeoHead() and buildEndDeckLinks() emit deck.html content that contains
 *  the placeholder tokens listed below. publish-cli (Brief B) substitutes them
 *  at upload time. Do not change these tokens without updating publish-cli in
 *  lockstep — mismatch fails silently.
 *
 *    __CANONICAL_URL__               canonical URL per §17.8
 *    __EDUCATIONAL_LEVEL__           "Kindergarten" / "Grade 1" / etc. (English)
 *    __EDUCATIONAL_LEVEL_LOCALIZED__ "Vorschule" / "Maternelle" / etc.
 *    <!-- HREFLANG_INSERTION_POINT --> hreflang block (or empty in v1)
 *    __LINK_MORE_TYPE__              URL of "more <type> worksheets" topic page
 *    __LINK_MORE_THEME__             URL of "more <theme>" topic page (or null)
 *    __LINK_MORE_LEVEL__             URL of "more for <level>" topic page
 *    __LINK_BROWSE_ALL__             URL of catalog landing
 *    __LINK_TEXT_MORE_TYPE__         localized "More addition worksheets"
 *    __LINK_TEXT_MORE_THEME__        localized "More animal-themed worksheets"
 *    __LINK_TEXT_MORE_LEVEL__        localized "More worksheets for kindergarten"
 *    __LINK_TEXT_BROWSE_ALL__        localized "Browse all worksheets"
 *    __END_DECK_HEADING__            localized "Want more?"
 *
 *  The hreflang marker MUST be the LAST element inside <head> (placement is
 *  load-bearing for publish-cli's string replacement).
 */

(function (global) {
  'use strict';

  var SCHEMA_VERSION = '1.0';
  var THUMB_WIDTH = 480;
  var THUMB_HEIGHT = 620;
  var ASSET_NAMES = {
    html: 'deck.html',
    pdf: 'printable.pdf',
    answer_key_pdf: 'answer-key.pdf',
    thumbnail: 'thumbnail.png'
  };

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }

  /** UTC timestamp formatted as YYYYMMDDHHMMSS — used in deck_id. */
  function utcStamp(date) {
    var d = date || new Date();
    return '' + d.getUTCFullYear()
      + pad2(d.getUTCMonth() + 1)
      + pad2(d.getUTCDate())
      + pad2(d.getUTCHours())
      + pad2(d.getUTCMinutes())
      + pad2(d.getUTCSeconds());
  }

  /** ISO-8601 UTC timestamp (e.g. 2026-04-26T14:30:00Z) — used in manifest.generated_at. */
  function isoUtc(date) {
    var d = date || new Date();
    return d.getUTCFullYear() + '-'
      + pad2(d.getUTCMonth() + 1) + '-'
      + pad2(d.getUTCDate()) + 'T'
      + pad2(d.getUTCHours()) + ':'
      + pad2(d.getUTCMinutes()) + ':'
      + pad2(d.getUTCSeconds()) + 'Z';
  }

  /** Lowercase ASCII letters/digits/hyphen only; collapse runs of hyphens; trim ends. */
  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Build the deck_id per brief §9: <exercise_type>-<exercise_mode>-<language>-<UTC YYYYMMDDHHMMSS>.
   * exercise_mode is omitted when null/empty so the id stays clean.
   */
  function buildDeckId(exerciseType, exerciseMode, language, date) {
    var parts = [slugify(exerciseType)];
    var modeSlug = slugify(exerciseMode);
    if (modeSlug) parts.push(modeSlug);
    parts.push(slugify(language));
    parts.push(utcStamp(date));
    return parts.filter(Boolean).join('-');
  }

  /**
   * Render the worksheet snapshot (a dataURL at production resolution) into a
   * 480×620 PNG Blob via an offscreen canvas. White background ensures the
   * thumbnail isn't transparent if the source has an alpha channel.
   */
  function renderThumbnail(snapshotDataUrl) {
    return new Promise(function (resolve, reject) {
      if (!snapshotDataUrl || typeof snapshotDataUrl !== 'string') {
        reject(new Error('Worksheet snapshot is empty.'));
        return;
      }
      var img = new Image();
      img.onload = function () {
        try {
          var off = document.createElement('canvas');
          off.width = THUMB_WIDTH;
          off.height = THUMB_HEIGHT;
          var ctx = off.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, THUMB_WIDTH, THUMB_HEIGHT);
          ctx.drawImage(img, 0, 0, THUMB_WIDTH, THUMB_HEIGHT);
          off.toBlob(function (blob) {
            if (blob) resolve(blob);
            else reject(new Error('Thumbnail toBlob returned null.'));
          }, 'image/png');
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = function () { reject(new Error('Failed to load worksheet snapshot for thumbnail.')); };
      img.src = snapshotDataUrl;
    });
  }

  function assertProducers(producers) {
    if (!producers) throw new Error('catalogExport: producers object is required.');
    var required = ['pdf', 'answerKey', 'deckHtml', 'worksheetSnapshot'];
    for (var i = 0; i < required.length; i++) {
      if (typeof producers[required[i]] !== 'function') {
        throw new Error('catalogExport: producers.' + required[i] + ' must be a function.');
      }
    }
  }

  function buildManifest(opts, deckId, generatedAt) {
    var meta = opts.metadata || {};
    var manifest = {
      schema_version: SCHEMA_VERSION,
      deck_id: deckId,
      generated_at: generatedAt,
      generator: {
        app: opts.app && opts.app.name ? opts.app.name : null,
        app_version: opts.app && opts.app.version ? opts.app.version : null,
        bundle_version: opts.app && (opts.app.bundleVersion != null) ? opts.app.bundleVersion : null
      },
      language: opts.language || null,
      exercise_type: opts.exerciseType || null,
      exercise_mode: opts.exerciseMode || null,
      settings: meta.settings || {},
      theme: meta.theme != null ? meta.theme : null,
      images_used: Array.isArray(meta.images_used) ? meta.images_used : [],
      vocabulary: Array.isArray(meta.vocabulary) ? meta.vocabulary : [],
      exercises: Array.isArray(meta.exercises) ? meta.exercises : [],
      assets: {
        html: ASSET_NAMES.html,
        pdf: ASSET_NAMES.pdf,
        answer_key_pdf: ASSET_NAMES.answer_key_pdf,
        thumbnail: ASSET_NAMES.thumbnail
      },
      // Reserved per CLAUDE.md §17.8.7 — always null in v1; the v2 translate-
      // this-deck workflow populates it for cross-language sibling tracking.
      content_family_id: null
    };
    // Round-trip check per brief §5: schema must JSON-serialize cleanly.
    JSON.parse(JSON.stringify(manifest));
    return manifest;
  }

  // ───────────────────────────────────────────────────────────────────────────
  //  SEO surface helpers (CLAUDE.md §17.8 / Brief A)
  // ───────────────────────────────────────────────────────────────────────────

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Build the SEO content for a deck.html <head>. Returns a string that the
   * per-app renderStandaloneHTML() injects between the existing viewport/theme-
   * color metas and the font preconnects. The hreflang marker MUST end up as
   * the last element inside <head> — keep that constraint in mind when wiring
   * the call site.
   *
   * opts = {
   *   language:           'en' | 'de' | ...,        // ISO 639-1
   *   exerciseTypeName:   'Addition',               // localized
   *   exerciseTypeSlug:   'addition',               // raw slug, used in JSON-LD "teaches"
   *   themeName:          'Animals' | null,         // localized; null if no theme
   *   worksheetWord:      'Worksheet',              // localized t('worksheet')
   *   instruction:        'Add the numbers ...',    // localized instruction sentence
   *   freeInteractive:    'Free interactive',       // t('seoFreeInteractive')
   *   forWord:            'for',                    // t('seoFor')
   *   printOrPlay:        'Print or play online'    // t('seoPrintOrPlayOnline')
   * }
   *
   * Returns: string of HTML, newline-separated, no leading/trailing whitespace.
   */
  function buildSeoHead(opts) {
    if (!opts) throw new Error('buildSeoHead: opts is required.');
    var language        = String(opts.language || 'en');
    var typeName        = String(opts.exerciseTypeName || '');
    var typeSlug        = String(opts.exerciseTypeSlug || '');
    var themeName       = opts.themeName ? String(opts.themeName) : null;
    var worksheetWord   = String(opts.worksheetWord || 'Worksheet');
    var instruction     = String(opts.instruction || '');
    var freeInteractive = String(opts.freeInteractive || 'Free interactive');
    var forWord         = String(opts.forWord || 'for');
    var printOrPlay     = String(opts.printOrPlay || 'Print or play online');

    // Title: "{Type} {Worksheet} — {Theme} — __EDUCATIONAL_LEVEL_LOCALIZED__ | LessonCraftStudio"
    // Theme segment + its em-dashes are omitted when no theme is set.
    var titleSegments = [typeName + ' ' + worksheetWord];
    if (themeName) titleSegments.push(themeName);
    titleSegments.push('__EDUCATIONAL_LEVEL_LOCALIZED__');
    var titleCore = titleSegments.join(' — ');
    var titleFull = titleCore + ' | LessonCraftStudio';

    // Description: "{freeInteractive} {type} {worksheet} ({theme}) {for} __EDUCATIONAL_LEVEL_LOCALIZED__. {instruction}. {printOrPlay}."
    // Preserve input casing — German requires capitalized nouns; lowercasing
    // breaks grammar in 5+ of the 11 supported languages.
    var descLead = freeInteractive + ' ' + typeName + ' ' + worksheetWord;
    if (themeName) descLead += ' (' + themeName + ')';
    descLead += ' ' + forWord + ' __EDUCATIONAL_LEVEL_LOCALIZED__';
    var description = descLead + '.' + (instruction ? ' ' + instruction + (/[.!?]$/.test(instruction) ? '' : '.') : '') + ' ' + printOrPlay + '.';

    // Schema.org LearningResource. Placeholders sit INSIDE string-quoted JSON
    // values so JSON.parse stays valid both before and after publish-cli's
    // literal-token substitution (CLAUDE.md §17.8.1.6 / Brief A §4.6).
    var ld = {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: titleCore,
      description: description,
      learningResourceType: 'Worksheet',
      educationalLevel: '__EDUCATIONAL_LEVEL__',
      teaches: typeSlug,
      inLanguage: language,
      isAccessibleForFree: true,
      creator: {
        '@type': 'Organization',
        name: 'LessonCraftStudio',
        url: 'https://lessoncraftstudio.com'
      },
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student'
      },
      url: '__CANONICAL_URL__'
    };

    // The hreflang marker is NOT included here — it MUST be the LAST element
    // inside <head>, while the SEO content typically belongs earlier (before
    // font preconnects and <style>). Callers push HREFLANG_MARKER separately
    // as the last element of <head>.
    return [
      '<title>' + escapeHtml(titleFull) + '</title>',
      '<meta name="description" content="' + escapeAttr(description) + '">',
      '<link rel="canonical" href="__CANONICAL_URL__">',
      '<script type="application/ld+json">' + JSON.stringify(ld) + '<\/script>'
    ].join('\n');
  }

  // Hreflang insertion-point marker. publish-cli (Brief B) replaces this
  // string with the hreflang block (or empty string in v1). Per CLAUDE.md
  // §17.8.1.5 it MUST be the last element inside <head>.
  var HREFLANG_MARKER = '<!-- HREFLANG_INSERTION_POINT -->';

  /**
   * Build the end-of-deck internal-links section (CLAUDE.md §17.8.2 / Brief A
   * §5.5). Returns a string of HTML containing only placeholder tokens — Brief
   * B's publish-cli substitutes them at upload time with the localized link
   * text and the topic-destination-page URLs.
   *
   * The caller inserts the returned HTML inside the existing celebration-
   * screen DOM (typically immediately before the closing </div> of
   * .lcs-celebration__inner, after the existing call-to-action buttons).
   */
  function buildEndDeckLinks() {
    return [
      '<div class="end-deck-links">',
      '  <h2>__END_DECK_HEADING__</h2>',
      '  <ul>',
      '    <li><a href="__LINK_MORE_TYPE__">__LINK_TEXT_MORE_TYPE__</a></li>',
      '    <li><a href="__LINK_MORE_THEME__">__LINK_TEXT_MORE_THEME__</a></li>',
      '    <li><a href="__LINK_MORE_LEVEL__">__LINK_TEXT_MORE_LEVEL__</a></li>',
      '    <li><a href="__LINK_BROWSE_ALL__">__LINK_TEXT_BROWSE_ALL__</a></li>',
      '  </ul>',
      '</div>'
    ].join('\n');
  }

  function triggerDownload(blob, fileName) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /**
   * Main entry point.
   *
   * opts = {
   *   app: { name, version, bundleVersion },
   *   language: 'en' | 'de' | ...,
   *   exerciseType: 'addition',
   *   exerciseMode: 'image-image' | null,
   *   producers: {
   *     pdf:               () => Promise<Blob>,
   *     answerKey:         () => Promise<Blob>,
   *     deckHtml:          () => Promise<string>,
   *     worksheetSnapshot: () => Promise<string>   // production-resolution dataURL
   *   },
   *   metadata: { settings, theme, images_used, vocabulary, exercises }
   * }
   *
   * Returns: Promise<{ deckId, zipFileName }>
   * Throws if any step fails — no partial ZIP is produced.
   */
  function exportCatalog(opts) {
    return Promise.resolve().then(function () {
      if (typeof global.JSZip !== 'function') {
        throw new Error('JSZip is not loaded. Ensure jszip-3.10.1.min.js loads before catalog-export.js.');
      }
      if (!opts) throw new Error('catalogExport: opts is required.');
      assertProducers(opts.producers);

      var now = new Date();
      var deckId = buildDeckId(opts.exerciseType, opts.exerciseMode, opts.language, now);
      var manifest = buildManifest(opts, deckId, isoUtc(now));

      return Promise.all([
        Promise.resolve(opts.producers.pdf()),
        Promise.resolve(opts.producers.answerKey()),
        Promise.resolve(opts.producers.deckHtml()),
        Promise.resolve(opts.producers.worksheetSnapshot()).then(renderThumbnail)
      ]).then(function (results) {
        var pdfBlob = results[0];
        var answerKeyBlob = results[1];
        var deckHtml = results[2];
        var thumbnailBlob = results[3];

        if (!pdfBlob || !(pdfBlob instanceof Blob)) {
          throw new Error('PDF producer did not return a Blob.');
        }
        if (!answerKeyBlob || !(answerKeyBlob instanceof Blob)) {
          throw new Error('Answer-key producer did not return a Blob.');
        }
        if (typeof deckHtml !== 'string' || deckHtml.length === 0) {
          throw new Error('Interactive HTML producer did not return a string.');
        }
        if (!thumbnailBlob || !(thumbnailBlob instanceof Blob)) {
          throw new Error('Thumbnail producer did not return a Blob.');
        }

        var zip = new global.JSZip();
        zip.file('manifest.json', JSON.stringify(manifest, null, 2));
        zip.file(ASSET_NAMES.html, deckHtml);
        zip.file(ASSET_NAMES.pdf, pdfBlob);
        zip.file(ASSET_NAMES.answer_key_pdf, answerKeyBlob);
        zip.file(ASSET_NAMES.thumbnail, thumbnailBlob);

        return zip.generateAsync({ type: 'blob' }).then(function (zipBlob) {
          var zipFileName = deckId + '.zip';
          triggerDownload(zipBlob, zipFileName);
          return { deckId: deckId, zipFileName: zipFileName };
        });
      });
    });
  }

  global.LCSCatalogExport = {
    SCHEMA_VERSION: SCHEMA_VERSION,
    THUMB_WIDTH: THUMB_WIDTH,
    THUMB_HEIGHT: THUMB_HEIGHT,
    ASSET_NAMES: ASSET_NAMES,
    buildDeckId: buildDeckId,
    utcStamp: utcStamp,
    isoUtc: isoUtc,
    slugify: slugify,
    buildSeoHead: buildSeoHead,
    buildEndDeckLinks: buildEndDeckLinks,
    HREFLANG_MARKER: HREFLANG_MARKER,
    export: exportCatalog
  };
}(typeof window !== 'undefined' ? window : this));
