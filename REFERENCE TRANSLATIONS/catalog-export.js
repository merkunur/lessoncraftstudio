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
 *   window.LCSCatalogExport.export(opts)                 → Promise<{deckId, zipFileName}>
 *   window.LCSCatalogExport.buildSeoHead(opts)           → string of SEO <head> HTML
 *   window.LCSCatalogExport.buildEndDeckLinks()          → string of end-deck links HTML
 *   window.LCSCatalogExport.buildSrRows(opts)            → string of per-row sr-only HTML (Group A)
 *   window.LCSCatalogExport.buildSrPuzzleSummary(opts)   → string of deck-level sr-only HTML (Group B/C)
 *   window.LCSCatalogExport.buildShareAffordance(opts)   → string of in-deck share affordance HTML+CSS+JS
 *   window.LCSCatalogExport.buildEmbedAffordance(opts)   → string of in-deck embed affordance HTML+CSS+JS
 *   window.LCSCatalogExport.HREFLANG_MARKER              → string, hreflang insertion-point comment
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
   * Build a screen-reader-only section listing per-row exercise descriptions.
   * Group A pattern (CLAUDE.md §17.8.4 / Brief A §5.4) — used by multi-row
   * apps where the deck.html contains repeating exercise rows.
   *
   * The shared helper owns the structural <section> + <ol> + <li> wrapping
   * and HTML-escaping. Per-app code stays responsible for building the
   * per-row strings (because exercise data shape varies per app —
   * {operandA, operandB} for addition, {clue, answer} for crossword, etc.).
   *
   * Translation-key naming convention:
   *
   *   PATTERN                  | SCOPE              | LOCATION
   *   ─────────────────────────┼────────────────────┼─────────────────────────
   *   srExercise<App>          | per-row template   | per-app translations file
   *                            | for default mode   |
   *                            | (e.g. srExerciseAddition,
   *                            |       srExerciseSubtraction)
   *   srExercise<App><Mode>    | per-row template   | per-app translations file
   *                            | for non-default    |
   *                            | mode variant       |
   *                            | (e.g. srExerciseAdditionFindAddend)
   *   srPuzzle<App>            | deck-level summary | per-app translations file
   *                            | for single-puzzle  |
   *                            | apps (wordsearch,  |
   *                            | sudoku, etc.)      |
   *   srWorksheetQuestions     | section aria-label | per-app translations file
   *                            | (universal label)  |
   *   srOperator<Name>         | arithmetic operator| per-app translations file
   *                            | words substituted  | (currently single-
   *                            | inside per-row sr  | consumer in
   *                            | construction (e.g. | math-worksheet; promote
   *                            | srOperatorPlus,    | to shared if/when a
   *                            | srOperatorMinus,   | second consumer arrives)
   *                            | srOperatorEquals)  |
   *   srShape<Slug>            | shape-name slug    | translations-shared.js
   *                            | → localized noun.  | (≥2 consumers from day
   *                            | Slug = camelCased  | one: missing-pieces
   *                            | shape id, first    | (6 piece shapes),
   *                            | letter uppercased  | prepositions (6 unique
   *                            | ('rectPortrait' →  | default backdrop shapes;
   *                            | 'RectPortrait')    | reuses missing-pieces'
   *                            |                    | srShapeSquare and
   *                            |                    | srShapeCircle). 12
   *                            |                    | unique slugs total.)
   *
   * Convention rule:
   *   - Single-consumer keys live in the consuming app's translation file.
   *   - ≥2-consumer keys live as a shared keyset in translations-shared.js.
   *   - srShape* is the originating shared example.
   *   - When a single-consumer key gains a second consumer, MIGRATE it to
   *     translations-shared.js in the same commit that introduces the
   *     second consumer (don't leave duplicated definitions).
   *   - Shared keys CAN be overridden per-app (per-app file loads first,
   *     wins on collision via hasOwnProperty check), but this is an
   *     explicit choice; any unintended collision logs a console.warn
   *     from translations-shared.js during init.
   *   - Cache-buster versions on translations-shared.js bump independently
   *     from per-app translation file versions. When a future commit adds
   *     a shared key, only translations-shared.js's ?v= bumps; per-app
   *     translation file versions remain unchanged unless their own
   *     content changes.
   *
   * opts = {
   *   label?: string    // optional aria-label; omitted → bare section
   *   rows:  string[]   // pre-formatted localized row strings, one per exercise
   * }
   *
   * Returns an empty string when rows is missing or empty (caller can append
   * the result without conditional checks).
   */
  function buildSrRows(opts) {
    if (!opts || !Array.isArray(opts.rows) || opts.rows.length === 0) return '';
    var lis = opts.rows.map(function (r) { return '<li>' + escapeHtml(String(r)) + '</li>'; }).join('');
    var label = opts.label ? String(opts.label) : '';
    if (label) {
      return '<section class="lcs-sr" aria-label="' + escapeAttr(label) + '"><ol>' + lis + '</ol></section>';
    }
    return '<section class="lcs-sr"><ol>' + lis + '</ol></section>';
  }

  /**
   * Build a screen-reader-only paragraph describing a single-puzzle deck.
   * Group B / Group C pattern (CLAUDE.md §17.8.5 / Brief A §5.4 R4) — used
   * by single-puzzle apps where the deck.html renders one puzzle as a whole
   * (wordsearch, sudoku, picture-path, treasure-hunt, etc.). For Group C
   * apps with semantically distinct element text (crossword clues,
   * find-objects targets), this helper covers the deck-level summary;
   * additional per-element sr-only spans are layered on top.
   *
   * Translation-key naming convention for callers to follow:
   *   srPuzzle<App>            deck-level summary template for the app
   *                            (e.g., srPuzzleWordsearch, srPuzzleTreasureHunt)
   *
   * opts = {
   *   label?:  string    // optional aria-label; omitted → bare <p>
   *   summary: string    // localized puzzle summary built from app data
   * }
   *
   * Returns an empty string when summary is missing or empty.
   */
  function buildSrPuzzleSummary(opts) {
    if (!opts || !opts.summary) return '';
    var summary = String(opts.summary);
    var label = opts.label ? String(opts.label) : '';
    if (label) {
      return '<section class="lcs-sr" aria-label="' + escapeAttr(label) + '"><p>' + escapeHtml(summary) + '</p></section>';
    }
    return '<p class="lcs-sr">' + escapeHtml(summary) + '</p>';
  }

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
  // Emits the end-deck-links section per Brief A §5.5. Default behavior:
  // returns empty string, so direct-download decks (operator's "Download
  // → Interactive HTML" button) don't ship raw placeholder text. Pass
  // {includePlaceholders: true} from a publish-cli-aware code path (e.g.
  // the future catalog-export ZIP flow) to emit the placeholder block
  // that publish-cli will substitute at upload time per §17.8.5.
  function buildEndDeckLinks(opts) {
    if (!opts || opts.includePlaceholders !== true) return '';
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

  /**
   * Resolve a vocabulary-canonical key from a worksheet image. Used by
   * per-app bundle code that needs to look up vocab via ImageVocab.
   *
   * Accepts either a path string or an image object with {path, word, name}.
   * Returns a string suitable for ImageVocab.singular/plural/gender, or null.
   *
   * Three real-world image source forms (each surfaces different bug
   * modes if mis-handled):
   *
   *   1. Theme images: img.path = "/images/<theme>/<filename>.png" with
   *      a clean filename matching IMAGE_VOCABULARY entries directly.
   *      ImageVocab.keyFromPath returns the bare key.
   *
   *   2. Server-stored uploaded images: img.path = "/images/<theme>/<file>"
   *      with filename suffixed by -<13digit-timestamp>-<hash>.
   *      ImageVocab.keyFromPath strips the suffix to recover the bare key.
   *      LCSImageRef.parseImagePath leaves the suffix intact and breaks
   *      vocab lookup downstream — the eb510be4 / eb510be4.1 bug family.
   *
   *   3. Client-side FileReader uploaded images: img.path = "data:image/...;base64,...".
   *      Neither keyFromPath nor parseImagePath produces a meaningful
   *      key (they operate on path components that don't exist in data
   *      URLs). Fall back to img.word / img.name (the original filename
   *      the upload form captured).
   *
   * Single helper covers all three so callers don't replicate the
   * dispatch logic per-app.
   */
  function vocabKeyFromImage(img) {
    if (img == null) return null;
    if (typeof img === 'string') img = { path: img };
    if (typeof img !== 'object') return null;
    var path = img.path || '';

    // Real URL path (forms 1 + 2): use ImageVocab.keyFromPath which
    // strips both -N variant and -<13digit>-<hash> upload suffixes.
    if (path && path.indexOf('data:') !== 0 && typeof ImageVocab !== 'undefined') {
      var key = ImageVocab.keyFromPath(path);
      if (key) return key;
    }

    // Data URL (form 3) or pathless: derive from filename word/name.
    var raw = String(img.word || img.name || '').toLowerCase().trim();
    if (!raw) return null;
    return raw
      .replace(/\.\w+$/, '')                 // .png/.jpg/.webp etc
      .replace(/-\d{13}-[a-z0-9]+$/, '')     // upload timestamp + hash
      .replace(/-\d+$/, '');                 // -N numeric variant
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
   * Build the in-deck share affordance: a 40×40 icon button placed in
   * lcs-bar after lcs-mute, plus a desktop overlay containing 5 platform
   * buttons (Facebook, WhatsApp, Pinterest, email, copy-link).
   *
   * Click behavior: navigator.share when available (mobile primarily); else
   * the overlay opens with the 5-platform row.
   *
   * Returns a self-contained string of HTML+CSS+inline-JS for embedding
   * into deck.html chrome at generation time. No runtime dependency on
   * catalog-export.js — deck.html stays self-contained per §14.1.
   *
   * Resolution order for canonicalURL:
   *   1. opts.canonicalURL provided AND not a __PLACEHOLDER__ literal → use as-is
   *   2. canonicalURL absent/placeholder, opts.locale + opts.title both
   *      present → construct https://lessoncraftstudio.com/<locale>/decks/<slugify(title)>/
   *   3. Insufficient inputs → return empty string (defensive skip per §17.8.11)
   *
   * Placeholder detection per §17.8.5 publish-cli substitution-token convention:
   * tokens match /^__[A-Z_]+__$/ (e.g., __CANONICAL_URL__, __EDUCATIONAL_LEVEL__).
   *
   * Predicted-slug trade-off: if publish-cli's de-duplication appends a numeric
   * suffix on slug collision (per §17.8.5), the predicted slug differs from
   * the published slug. v1-acceptable risk per Sub-phase A authorization;
   * filed in deferred queue under social-share-v1 family. Retire when
   * publish-cli ships and starts substituting __CANONICAL_URL__.
   *
   * Translation keys consumed (from translations-shared.js, baked at
   * generation time — strings appear as static text in the deck.html output):
   *   srShareNative, srShareTo, srShareCopyLink, srShareCopied,
   *   srShareAriaFacebook, srShareAriaWhatsApp, srShareAriaPinterest,
   *   srShareAriaEmail, srShareAriaCopyLink
   *
   * Per-app integration in renderStandaloneHTML() (Sub-phase B):
   *   parts.push('    ' + LCSCatalogExport.buildShareAffordance({
   *       locale: lang,
   *       title: title
   *   }));
   * Place inside lcs-bar, after the lcs-mute button emission.
   */
  function buildShareAffordance(opts) {
    opts = opts || {};
    var canonicalURL = opts.canonicalURL;
    var locale = opts.locale || 'en';
    var title = opts.title || '';

    function isPlaceholder(s) {
      return typeof s === 'string' && /^__[A-Z_]+__$/.test(s);
    }

    var url = null;
    if (canonicalURL && typeof canonicalURL === 'string' && !isPlaceholder(canonicalURL)) {
      url = canonicalURL;
    } else if (locale && title) {
      var slug = slugify(title);
      if (slug) {
        url = 'https://www.lessoncraftstudio.com/' + locale + '/decks/' + slug + '/';
      }
    }

    // ANSWER-BEARING-style hygiene (§17.8.11 defensive skip): no real URL
    // means the share button has no meaningful target. Empty string skips
    // emission entirely. Do NOT render a degraded variant.
    if (!url) return '';

    // Read localized strings at generation time. window.translations is
    // populated by per-app translations-<app>.js + translations-shared.js
    // (both loaded before catalog-export.js per the apps' script-tag order).
    // Strings bake into the deck.html output as static text — no runtime
    // translation lookup needed in the self-contained deck.html.
    var t = (typeof translations !== 'undefined' && translations[locale]) || {};
    var ten = (typeof translations !== 'undefined' && translations.en) || {};
    function str(key, fallback) { return t[key] || ten[key] || fallback; }

    var labelShare = str('srShareNative', 'Share');
    var labelShareTo = str('srShareTo', 'Share to');
    var labelCopy = str('srShareCopyLink', 'Copy link');
    var labelCopied = str('srShareCopied', 'Copied!');
    var ariaFacebook = str('srShareAriaFacebook', 'Share on Facebook');
    var ariaWhatsApp = str('srShareAriaWhatsApp', 'Share on WhatsApp');
    var ariaPinterest = str('srShareAriaPinterest', 'Share on Pinterest');
    var ariaEmail = str('srShareAriaEmail', 'Share via email');
    var ariaCopyLink = str('srShareAriaCopyLink', 'Copy link');

    function escAttr(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;');
    }
    function escHtml(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    var encodedURL = encodeURIComponent(url);
    var encodedTitle = encodeURIComponent(title);

    return [
      '<div class="lcs-share-wrap">',
      '  <button type="button" class="lcs-share" id="lcs-share"',
      '          aria-label="' + escAttr(labelShare) + '" aria-haspopup="true" aria-expanded="false">',
      '    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '      <circle cx="18" cy="5" r="3"/>',
      '      <circle cx="6" cy="12" r="3"/>',
      '      <circle cx="18" cy="19" r="3"/>',
      '      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>',
      '      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
      '    </svg>',
      '  </button>',
      '  <div class="lcs-share-overlay" id="lcs-share-overlay" hidden role="dialog" aria-label="' + escAttr(labelShareTo) + '">',
      '    <div class="lcs-share-sheet">',
      '      <a href="https://www.facebook.com/sharer/sharer.php?u=' + encodedURL + '" target="_blank" rel="noopener noreferrer" class="lcs-share-platform" aria-label="' + escAttr(ariaFacebook) + '">',
      '        <span class="lcs-share-icon" aria-hidden="true">📘</span><span>Facebook</span>',
      '      </a>',
      '      <a href="https://api.whatsapp.com/send?text=' + encodedURL + '" target="_blank" rel="noopener noreferrer" class="lcs-share-platform" aria-label="' + escAttr(ariaWhatsApp) + '">',
      '        <span class="lcs-share-icon" aria-hidden="true">💬</span><span>WhatsApp</span>',
      '      </a>',
      '      <a href="https://pinterest.com/pin/create/button/?url=' + encodedURL + '&description=" target="_blank" rel="noopener noreferrer" class="lcs-share-platform" aria-label="' + escAttr(ariaPinterest) + '">',
      '        <span class="lcs-share-icon" aria-hidden="true">📌</span><span>Pinterest</span>',
      '      </a>',
      '      <a href="mailto:?subject=' + encodedTitle + '&body=' + encodedURL + '" class="lcs-share-platform" aria-label="' + escAttr(ariaEmail) + '">',
      '        <span class="lcs-share-icon" aria-hidden="true">✉️</span><span>Email</span>',
      '      </a>',
      '      <button type="button" class="lcs-share-platform" id="lcs-share-copy" aria-label="' + escAttr(ariaCopyLink) + '" data-label-default="' + escAttr(labelCopy) + '" data-label-copied="' + escAttr(labelCopied) + '">',
      '        <span class="lcs-share-icon" aria-hidden="true">🔗</span><span id="lcs-share-copy-label">' + escHtml(labelCopy) + '</span>',
      '      </button>',
      '    </div>',
      '  </div>',
      '</div>',
      '<style>',
      '.lcs-share-wrap{position:relative;display:inline-flex;flex-shrink:0}',
      '.lcs-share{width:40px;height:40px;border-radius:10px;border:2px solid #DCE1E6;background:#FFF;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;color:#545458;flex-shrink:0}',
      '.lcs-share:hover{background:#FEFAF3}',
      '.lcs-share:focus-visible{outline:3px solid #4E5FE8;outline-offset:2px}',
      '.lcs-share svg{width:20px;height:20px;pointer-events:none}',
      '.lcs-share-overlay{position:absolute;top:calc(100% + 8px);right:0;z-index:100;min-width:200px}',
      '.lcs-share-overlay[hidden]{display:none}',
      '.lcs-share-sheet{background:#FFF;border:2px solid #DCE1E6;border-radius:12px;box-shadow:0 4px 18px rgba(28,28,30,.18);padding:8px;display:grid;gap:4px}',
      '.lcs-share-platform{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;text-decoration:none;color:#1C1C1E;font-family:inherit;font-size:15px;font-weight:500;border:none;background:transparent;cursor:pointer;text-align:left;width:100%}',
      '.lcs-share-platform:hover{background:#F4F6FB}',
      '.lcs-share-platform:focus-visible{outline:2px solid #4E5FE8;outline-offset:-2px}',
      '.lcs-share-icon{font-size:18px;line-height:1;flex-shrink:0}',
      '</style>',
      '<script>(function(){',
      'var btn=document.getElementById("lcs-share");',
      'var overlay=document.getElementById("lcs-share-overlay");',
      'var copyBtn=document.getElementById("lcs-share-copy");',
      'var copyLabel=document.getElementById("lcs-share-copy-label");',
      'if(!btn||!overlay)return;',
      'var url=' + JSON.stringify(url) + ';',
      'var title=' + JSON.stringify(title) + ';',
      'function showOverlay(){overlay.hidden=false;btn.setAttribute("aria-expanded","true");setTimeout(function(){document.addEventListener("click",outside,true);},0);}',
      'function hideOverlay(){overlay.hidden=true;btn.setAttribute("aria-expanded","false");document.removeEventListener("click",outside,true);}',
      'function outside(e){if(!overlay.contains(e.target)&&e.target!==btn&&!btn.contains(e.target))hideOverlay();}',
      'btn.addEventListener("click",function(e){',
      'e.stopPropagation();',
      'if(navigator.share){navigator.share({title:title,url:url}).catch(function(){});}',
      'else{if(overlay.hidden)showOverlay();else hideOverlay();}',
      '});',
      'if(copyBtn&&copyLabel){',
      'copyBtn.addEventListener("click",function(e){',
      'e.preventDefault();e.stopPropagation();',
      'var labelDefault=copyBtn.getAttribute("data-label-default");',
      'var labelCopied=copyBtn.getAttribute("data-label-copied");',
      'var done=function(){copyLabel.textContent=labelCopied;setTimeout(function(){copyLabel.textContent=labelDefault;hideOverlay();},2000);};',
      'if(navigator.clipboard&&navigator.clipboard.writeText){',
      'navigator.clipboard.writeText(url).then(done).catch(function(){});',
      '}else{',
      'var ta=document.createElement("textarea");ta.value=url;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");done();}catch(e){}document.body.removeChild(ta);',
      '}',
      '});',
      '}',
      '})();<\/script>'
    ].join('\n');
  }

  /**
   * buildEmbedAffordance — returns a self-contained string of HTML+CSS+inline-JS
   * for embedding inside lcs-bar (top-right, immediately after the share button)
   * as a 40×40 icon button with .lcs-embed class. Click → opens an overlay with:
   *   - Header text ("Embed this worksheet on your site")
   *   - Width + Height number inputs (default 800 × 600)
   *   - Live-updated <textarea> showing the iframe snippet
   *   - Copy button with progressive Clipboard API → execCommand fallback
   *   - Helper text + Close button
   *
   * Width/height inputs update the textarea on input/change events. Copy button
   * uses a 2-second feedback state matching the share affordance's copy-link
   * pattern at §17.8.15.
   *
   * Resolution order for canonicalURL — same as buildShareAffordance:
   *   1. opts.canonicalURL provided AND not __PLACEHOLDER__-shape → use as-is
   *   2. canonicalURL absent/placeholder, locale + title both present →
   *      construct https://lessoncraftstudio.com/<locale>/decks/<slugify(title)>/
   *   3. Insufficient inputs → return empty string (defensive skip per §17.8.11)
   *
   * Per §17.8.15 in-iframe attribution-only convention: the embed snippet itself
   * is bare iframe markup; in-iframe lcs-attrib-link (§14.3) carries the
   * attribution. No duplicate attribution in the snippet.
   *
   * Per operator-locked adjudications (Layer-2 commission, 2026-05-05):
   *   - Default 800×600 (4:3 desktop classroom-blog standard)
   *   - In-iframe attribution only; embed snippet is bare iframe
   *   - No embed-tracking instrumentation in v1
   *   - Free for any visitor (no signup gate)
   *
   * Translation keys consumed (from translations-shared.js, baked at generation
   * time per the §17.8.14 srLang-keyed lookup convention):
   *   embedHeader, embedHelper, embedWidthLabel, embedHeightLabel,
   *   embedCopyButton, embedCopiedFeedback, embedClose, embedButtonTooltip
   *
   * Per-app integration in renderStandaloneHTML(): immediately after the
   * buildShareAffordance call in lcs-bar markup:
   *   parts.push('    ' + LCSCatalogExport.buildEmbedAffordance({
   *       locale: lang,
   *       title: title
   *   }));
   */
  function buildEmbedAffordance(opts) {
    opts = opts || {};
    var canonicalURL = opts.canonicalURL;
    var locale = opts.locale || 'en';
    var title = opts.title || '';
    var defaultWidth = opts.defaultWidth || 800;
    var defaultHeight = opts.defaultHeight || 1400;

    function isPlaceholder(s) {
      return typeof s === 'string' && /^__[A-Z_]+__$/.test(s);
    }

    var url = null;
    if (canonicalURL && typeof canonicalURL === 'string' && !isPlaceholder(canonicalURL)) {
      url = canonicalURL;
    } else if (locale && title) {
      var slug = slugify(title);
      if (slug) {
        url = 'https://www.lessoncraftstudio.com/' + locale + '/decks/' + slug + '/';
      }
    }

    // Defensive skip per §17.8.11: no real URL means no meaningful embed target.
    if (!url) return '';

    // Bare-translations lookup per §17.8.14 srLang-keyed convention.
    var t = (typeof translations !== 'undefined' && translations[locale]) || {};
    var ten = (typeof translations !== 'undefined' && translations.en) || {};
    function str(key, fallback) { return t[key] || ten[key] || fallback; }

    var labelHeader = str('embedHeader', 'Embed this worksheet on your site');
    var labelHelper = str('embedHelper', "Paste this into your website's HTML");
    var labelWidth = str('embedWidthLabel', 'Width');
    var labelHeight = str('embedHeightLabel', 'Height');
    var labelCopy = str('embedCopyButton', 'Copy code');
    var labelCopied = str('embedCopiedFeedback', 'Copied!');
    var labelClose = str('embedClose', 'Close');
    var labelTooltip = str('embedButtonTooltip', 'Embed this worksheet');

    // Attribution caption strings per the canonical snippet shape locked at the
    // 2026-05-05 design-spec follow-up. The snippet emits two <a href> backlinks
    // OUTSIDE the iframe (Google's link-equity model treats iframes as non-
    // backlinks; only outside <a href> elements count). First link points to
    // the deck URL with brand-anchor text; second points to homepage with
    // keyword-anchor text — anchor-diversity to avoid over-optimization
    // signals + concentrate ranking signal on the long-tail deck page.
    var attribPrefix = str('embedAttributionPrefix', 'Worksheet from');
    var attribBrand = str('embedAttributionBrand', 'LessonCraftStudio');
    var attribSeparator = str('embedAttributionSeparator', ' — ');
    var attribKeyword = str('embedAttributionKeyword', 'free printable worksheets');
    var homepageURL = 'https://www.lessoncraftstudio.com';

    function escAttr(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;');
    }
    function escHtml(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    // HTML-escape the localized attribution strings at generation time so the
    // snippet output is HTML-safe when pasted into a host page. The textarea
    // shows the escaped form; copy-paste preserves it; browser renders normally.
    var attribPrefixHtml = escHtml(attribPrefix);
    var attribBrandHtml = escHtml(attribBrand);
    var attribSeparatorHtml = escHtml(attribSeparator);
    var attribKeywordHtml = escHtml(attribKeyword);

    return [
      '<div class="lcs-embed-wrap">',
      '  <button type="button" class="lcs-embed" id="lcs-embed"',
      '          aria-label="' + escAttr(labelTooltip) + '" aria-haspopup="dialog" aria-expanded="false">',
      '    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '      <polyline points="16 18 22 12 16 6"/>',
      '      <polyline points="8 6 2 12 8 18"/>',
      '    </svg>',
      '  </button>',
      '  <div class="lcs-embed-overlay" id="lcs-embed-overlay" hidden role="dialog" aria-label="' + escAttr(labelHeader) + '">',
      '    <div class="lcs-embed-sheet">',
      '      <div class="lcs-embed-header">' + escAttr(labelHeader) + '</div>',
      '      <div class="lcs-embed-dims">',
      '        <label class="lcs-embed-dim">',
      '          <span class="lcs-embed-dim-label">' + escAttr(labelWidth) + '</span>',
      '          <input type="number" id="lcs-embed-width" value="' + defaultWidth + '" min="200" max="2000" step="10">',
      '        </label>',
      '        <label class="lcs-embed-dim">',
      '          <span class="lcs-embed-dim-label">' + escAttr(labelHeight) + '</span>',
      '          <input type="number" id="lcs-embed-height" value="' + defaultHeight + '" min="200" max="2000" step="10">',
      '        </label>',
      '      </div>',
      '      <textarea id="lcs-embed-snippet" readonly aria-label="' + escAttr(labelHeader) + '"></textarea>',
      '      <div class="lcs-embed-helper">' + escAttr(labelHelper) + '</div>',
      '      <div class="lcs-embed-actions">',
      '        <button type="button" class="lcs-embed-copy" id="lcs-embed-copy" data-label-default="' + escAttr(labelCopy) + '" data-label-copied="' + escAttr(labelCopied) + '">' + escAttr(labelCopy) + '</button>',
      '        <button type="button" class="lcs-embed-close" id="lcs-embed-close">' + escAttr(labelClose) + '</button>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
      '<style>',
      '.lcs-embed-wrap{position:relative;display:inline-flex;flex-shrink:0}',
      '.lcs-embed{width:40px;height:40px;border-radius:10px;border:2px solid #DCE1E6;background:#FFF;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;color:#545458;flex-shrink:0}',
      '.lcs-embed:hover{background:#FEFAF3}',
      '.lcs-embed:focus-visible{outline:3px solid #4E5FE8;outline-offset:2px}',
      '.lcs-embed svg{width:20px;height:20px;pointer-events:none}',
      '.lcs-embed-overlay{position:absolute;top:calc(100% + 8px);right:0;z-index:100;min-width:340px;max-width:calc(100vw - 32px)}',
      '.lcs-embed-overlay[hidden]{display:none}',
      '.lcs-embed-sheet{background:#FFF;border:2px solid #DCE1E6;border-radius:12px;box-shadow:0 4px 18px rgba(28,28,30,.18);padding:16px;display:grid;gap:12px}',
      '.lcs-embed-header{font-family:inherit;font-size:15px;font-weight:600;color:#1C1C1E;line-height:1.3}',
      '.lcs-embed-dims{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
      '.lcs-embed-dim{display:flex;flex-direction:column;gap:4px}',
      '.lcs-embed-dim-label{font-family:inherit;font-size:13px;font-weight:500;color:#545458}',
      '.lcs-embed-dim input{font-family:inherit;font-size:14px;padding:8px 10px;border-radius:8px;border:2px solid #DCE1E6;background:#FFF;color:#1C1C1E;width:100%;-webkit-appearance:none;appearance:none}',
      '.lcs-embed-dim input:focus-visible{outline:none;border-color:#4E5FE8;box-shadow:0 0 0 3px rgba(78,95,232,.18)}',
      '#lcs-embed-snippet{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;line-height:1.4;padding:10px;border-radius:8px;border:2px solid #DCE1E6;background:#F4F6FB;color:#1C1C1E;width:100%;min-height:80px;resize:vertical;-webkit-appearance:none;appearance:none}',
      '#lcs-embed-snippet:focus-visible{outline:none;border-color:#4E5FE8;box-shadow:0 0 0 3px rgba(78,95,232,.18)}',
      '.lcs-embed-helper{font-family:inherit;font-size:12px;color:#545458;line-height:1.4}',
      '.lcs-embed-actions{display:flex;gap:8px;justify-content:flex-end}',
      '.lcs-embed-copy,.lcs-embed-close{font-family:inherit;font-size:14px;font-weight:600;padding:9px 16px;border-radius:8px;cursor:pointer;border:none;transition:background-color .15s}',
      '.lcs-embed-copy{background:#4E5FE8;color:#FFF}',
      '.lcs-embed-copy:hover{background:#3F4FD0}',
      '.lcs-embed-copy:focus-visible{outline:3px solid #4E5FE8;outline-offset:2px}',
      '.lcs-embed-close{background:transparent;color:#1C1C1E;border:2px solid #DCE1E6}',
      '.lcs-embed-close:hover{background:#FEFAF3}',
      '.lcs-embed-close:focus-visible{outline:3px solid #4E5FE8;outline-offset:2px}',
      '</style>',
      '<script>(function(){',
      'var btn=document.getElementById("lcs-embed");',
      'var overlay=document.getElementById("lcs-embed-overlay");',
      'var widthInput=document.getElementById("lcs-embed-width");',
      'var heightInput=document.getElementById("lcs-embed-height");',
      'var snippet=document.getElementById("lcs-embed-snippet");',
      'var copyBtn=document.getElementById("lcs-embed-copy");',
      'var closeBtn=document.getElementById("lcs-embed-close");',
      'if(!btn||!overlay||!widthInput||!heightInput||!snippet)return;',
      'var url=' + JSON.stringify(url) + ';',
      'var homeURL=' + JSON.stringify(homepageURL) + ';',
      'var prefixText=' + JSON.stringify(attribPrefixHtml) + ';',
      'var brandText=' + JSON.stringify(attribBrandHtml) + ';',
      'var sepText=' + JSON.stringify(attribSeparatorHtml) + ';',
      'var keywordText=' + JSON.stringify(attribKeywordHtml) + ';',
      // Read deck canvas dimensions from DECK_BUNDLE.page at runtime to
      // compute exact-fit iframe height. Empirical chrome=200 lets the
      // sticky-bottom Check Answers footer pull UP over the lcs-app
      // padding-bottom region (the 120px dead-space between worksheet and
      // footer). With chrome=200, iframe is shorter than total flow height
      // (1300) → sticky-bottom activates → footer covers the padding gap →
      // visually: worksheet meets Check Answers with ~24px breathing room.
      //
      // Chrome breakdown (200):
      //   60  lcs-bar (sticky-top)
      //   8   worksheet-wrap padding-top
      //   24  lcs-footer margin-top
      //   108 lcs-footer height (16+16 padding + button + spacing)
      //   = 200 (excludes lcs-app padding-bottom 120, which is what gets
      //         covered by sticky-bottom positioning)
      //
      // Image area: lcs-app padding 0 12 (24 horizontal); image renders at
      // (iframeWidth - 24) wide, scaled by source aspect.
      //   iframeHeight = round((iframeWidth - 24) / pW * pH) + 200
      // For Letter portrait 612×792 at 800 wide: 1004 + 200 = 1204.
      // (Operator empirical 2026-05-06: ~10% shorter than chrome=320 case;
      // matches "frame should be at least 10 procent shorter" feedback.)
      'var userTouchedHeight=false;',
      'function deckPage(){var p=(typeof DECK_BUNDLE!=="undefined"&&DECK_BUNDLE&&DECK_BUNDLE.page)||null;if(p&&p.width&&p.height)return p;return null;}',
      'function computeHeight(w){var p=deckPage();if(p)return Math.round(Math.max(0,w-24)/p.width*p.height)+200;return ' + defaultHeight + ';}',
      // Canonical snippet shape per 2026-05-05 design spec: wrapper div with
      // max-width matching iframe + iframe with visible border + <p> caption
      // with TWO <a href> backlinks (deck-URL with brand-anchor; homepage with
      // keyword-anchor). All inline-styled. No <style> tags. No <script> tags.
      // No classes. Survives strict HTML sanitizers (WordPress, Squarespace,
      // Wix, Medium). Iframes alone are NOT backlinks per Google\'s link-equity
      // model; the outside <a href> elements ARE the SEO surface.
      // Snippet emits responsive-width iframe + tiny <script> for postMessage
      // auto-resize. Layered approach:
      //   1. CSS aspect-ratio = static fallback fit (works without script)
      //   2. <script> listener = exact-fit when the deck posts its actual
      //      content height via postMessage (works when sanitizer allows
      //      <script>)
      // Most CMSes that allow embed-via-iframe also allow embed-via-iframe-
      // plus-resizer-script (WordPress.com Premium, Squarespace, Wix, Webflow,
      // Ghost, Substack). Strict-sanitizer fallback: aspect-ratio CSS gives
      // a close-but-not-perfect fit.
      'function buildSnippet(){',
      'var w=parseInt(widthInput.value,10)||' + defaultWidth + ';',
      'var h=parseInt(heightInput.value,10)||computeHeight(w);',
      'var iframeId=\'lcs-embed-\'+Math.random().toString(36).slice(2,10);',
      'var lines=[];',
      'lines.push(\'<div style="max-width: \'+w+\'px; margin: 0 auto;">\');',
      'lines.push(\'  <iframe id="\'+iframeId+\'" src="\'+url+\'" frameborder="0" style="display: block; width: 100%; max-width: \'+w+\'px; aspect-ratio: \'+w+\' / \'+h+\'; border: 1px solid #e0d8c5; border-radius: 8px;"></iframe>\');',
      'lines.push(\'  <p style="font-size: 13px; color: #6b6357; text-align: center; margin: 8px 0 0; font-family: system-ui, sans-serif;">\');',
      'lines.push(\'    \'+prefixText+\' <a href="\'+url+\'" style="color: #6b6357; text-decoration: underline;">\'+brandText+\'</a>\'+sepText+\'<a href="\'+homeURL+\'" style="color: #6b6357; text-decoration: underline;">\'+keywordText+\'</a>\');',
      'lines.push(\'  </p>\');',
      'lines.push(\'</div>\');',
      'lines.push(\'<script>(function(){var f=document.getElementById("\'+iframeId+\'");if(!f)return;window.addEventListener("message",function(e){if(!e.data||e.data.type!=="lcs-embed-resize")return;if(e.data.url&&f.src&&e.data.url.split("?")[0]!==f.src.split("?")[0])return;f.style.aspectRatio="auto";f.style.height=e.data.height+"px";});})();<\\/script>\');',
      'return lines.join("\\n");',
      '}',
      'function refreshSnippet(){snippet.value=buildSnippet();}',
      'function syncHeightInput(){if(!userTouchedHeight){var w=parseInt(widthInput.value,10)||' + defaultWidth + ';heightInput.value=computeHeight(w);}}',
      'function showOverlay(){syncHeightInput();refreshSnippet();overlay.hidden=false;btn.setAttribute("aria-expanded","true");setTimeout(function(){document.addEventListener("click",outside,true);},0);}',
      'function hideOverlay(){overlay.hidden=true;btn.setAttribute("aria-expanded","false");document.removeEventListener("click",outside,true);}',
      'function outside(e){if(!overlay.contains(e.target)&&e.target!==btn&&!btn.contains(e.target))hideOverlay();}',
      'btn.addEventListener("click",function(e){e.stopPropagation();if(overlay.hidden)showOverlay();else hideOverlay();});',
      'widthInput.addEventListener("input",function(){syncHeightInput();refreshSnippet();});',
      'heightInput.addEventListener("input",function(){userTouchedHeight=true;refreshSnippet();});',
      'if(closeBtn){closeBtn.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();hideOverlay();});}',
      'if(copyBtn){',
      'copyBtn.addEventListener("click",function(e){',
      'e.preventDefault();e.stopPropagation();',
      'var labelDefault=copyBtn.getAttribute("data-label-default");',
      'var labelCopied=copyBtn.getAttribute("data-label-copied");',
      'var done=function(){copyBtn.textContent=labelCopied;setTimeout(function(){copyBtn.textContent=labelDefault;},2000);};',
      'var text=snippet.value;',
      'if(navigator.clipboard&&navigator.clipboard.writeText){',
      'navigator.clipboard.writeText(text).then(done).catch(function(){});',
      '}else{',
      'snippet.select();try{document.execCommand("copy");done();}catch(e){}',
      '}',
      '});',
      '}',
      'refreshSnippet();',
      // ?embed=open auto-open handler — closes the EmbedViralityCTA landing flow
      // gap per a793d7c9 (Arc 3 above-fold integration). The homepage CTA appends
      // ?embed=open to deck-page links; this handler picks up the param at deck
      // load and triggers showOverlay() so the embed UX is visible without a
      // separate button click. Reuses showOverlay() — no duplication of open
      // logic. Gated on window.parent === window so embedded iframe contexts
      // (which carry the param down through the src URL) don't auto-open their
      // own nested overlay; the param is meaningful only at top-level deck-page
      // landing. try/catch defensive: a malformed URL or missing URLSearchParams
      // never throws into the surrounding setup.
      'try{',
      'if(window.parent===window){',
      'var lcsEmbedParams=new URLSearchParams(window.location.search);',
      'if(lcsEmbedParams.get("embed")==="open")showOverlay();',
      '}',
      '}catch(e){}',
      // postMessage iframe-resize emitter + iframe-context body class.
      // When deck is loaded inside an embed iframe:
      //   1. Add body.lcs-embedded class so embedded-only CSS rules apply
      //      (removes the lcs-app padding-bottom 120px dead-space between
      //      worksheet and sticky-footer Check Answers button — that padding
      //      exists to clear the sticky button when scrolled normally; in
      //      iframe with auto-resize, content matches viewport so the button
      //      always shows + the padding becomes pure dead space)
      //   2. Inject a <style> block that targets body.lcs-embedded
      //   3. Post body.scrollHeight to parent window
      // The snippet\'s inline <script> listens and auto-resizes the iframe to
      // exact content height. Falls back gracefully to CSS aspect-ratio if
      // the snippet\'s script is stripped by host-side HTML sanitizer.
      // Only fires when window.parent !== window (inside an iframe) so
      // standalone deck.html viewing is unaffected.
      'if(window.parent!==window){',
      'document.body.classList.add("lcs-embedded");',
      'var lcsEmbeddedStyle=document.createElement("style");',
      // Critical: body min-height:0 prevents the auto-resize feedback loop
      // where body{min-height:100vh} fills iframe viewport, scrollHeight
      // reports iframe height (not content height), and iframe never
      // shrinks below its starting aspect-ratio. With min-height:0, body
      // collapses to actual content height; scrollHeight reports correctly.
      // Other rules tighten chrome paddings for compact embed appearance.
      'lcsEmbeddedStyle.textContent="body.lcs-embedded{min-height:0}"+',
      '"body.lcs-embedded #lcs-app{padding-bottom:0}"+',
      '"body.lcs-embedded .lcs-bar{padding:4px 4px}"+',
      '"body.lcs-embedded .lcs-worksheet-wrap{padding-top:0}"+',
      '"body.lcs-embedded .lcs-footer{margin-top:0;padding:8px 12px;border-top:none}"+',
      '"body.lcs-embedded .lcs-btn{min-height:40px;padding:10px 22px;font-size:15px}";',
      'document.head.appendChild(lcsEmbeddedStyle);',
      'function lcsEmitHeight(){try{window.parent.postMessage({type:"lcs-embed-resize",height:document.body.scrollHeight,url:location.href},"*");}catch(e){}}',
      'if(document.readyState==="complete")lcsEmitHeight();',
      'else window.addEventListener("load",lcsEmitHeight);',
      'window.addEventListener("resize",lcsEmitHeight);',
      'if(typeof ResizeObserver!=="undefined"){try{new ResizeObserver(lcsEmitHeight).observe(document.body);}catch(e){}}',
      '}',
      '})();<\/script>'
    ].join('\n');
  }

  /**
   * buildResponsiveFitSnippet — returns embedded <style> + <script> that
   * activate a compact landscape-mobile layout: on a phone in landscape
   * orientation viewing a landscape worksheet, hide the title bar and
   * topic-link footer, float the Check Answers button as a compact FAB,
   * and size the worksheet via JS-set explicit pixel width/height so the
   * worksheet fits the visible viewport without scroll.
   *
   * Strict scope per operator request (2026-04-30):
   * "As long as the changes you will make don't change anything on different
   * devices and it doesn't change anything for portrait worksheets even on
   * mobile phone you can do it. The changes should effect only horizontal
   * worksheets only on mobile phone."
   *
   * Two CSS gates + one body-class gate, ALL must hold for the compact layout
   * to apply:
   *   1. Phone-sized viewport in landscape — CSS
   *      `(max-width: 1024px) and (orientation: landscape)`
   *      (max-width caps out tablets/iPads; orientation caps out portrait)
   *   2. Worksheet baked landscape — JS adds `body.lcs-worksheet-landscape`
   *      class when img.naturalWidth > img.naturalHeight; all rules are
   *      scoped under this class so portrait-image decks are unaffected.
   *
   * Intentionally NOT gated on `(hover: none) and (pointer: coarse)`. Samsung
   * Galaxy phones with S Pen (Note, Ultra, Tab) report `hover: hover` because
   * the S Pen supports air-hover, and that single condition was making the
   * whole @media block fail on those devices. Verified 2026-05-01 by patching
   * a generated deck.html in place and confirming the operator's Samsung
   * landscape test passed.
   *
   * Sizing approach: JS computes `w = visualViewport.height × imgAspect`,
   * `h = visualViewport.height` (clamped to visualViewport.width if it would
   * exceed), then sets those as inline pixel styles on `.lcs-worksheet`. No
   * reliance on CSS aspect-ratio + max-width/max-height — that combo behaves
   * inconsistently across Chromium versions (Samsung Internet was letterboxing
   * the image inside an oversized container, which broke overlay-percentage
   * math and made answer boxes appear to overlap adjacent worksheet content).
   *
   * Plus three smaller hardening passes:
   *   - All compact-mode CSS rules use !important so per-app inline CSS can\'t
   *     sneak past via cascade.
   *   - .lcs-overlay descendants get min-width:0; min-height:0 to defeat any
   *     cached pre-`5de1e373` CSS that imposed pixel floors on slots.
   *   - sanitizeSlots() rewrites cached `slot.style.width = "max(N%, Mpx)"`
   *     back to `"N%"` at runtime if it shows up.
   *
   * Browser support: visualViewport API requires Safari 13+, Chrome 61+,
   * Firefox 91+, Samsung Internet 8+. Falls back to window.innerWidth /
   * innerHeight on older browsers (still correct, just doesn\'t track URL-bar
   * transitions as smoothly).
   *
   * Place inside renderStandaloneHTML() output, just before </body>:
   *   parts.push(LCSCatalogExport.buildResponsiveFitSnippet());
   * Defensive form for forwards-compat with older catalog-export.js:
   *   parts.push((window.LCSCatalogExport && LCSCatalogExport.buildResponsiveFitSnippet)
   *     ? LCSCatalogExport.buildResponsiveFitSnippet() : '');
   */
  function buildResponsiveFitSnippet() {
    return [
      '<style>',
      /* Compact landscape-mobile mode. Trigger by viewport size + orientation only;
       * intentionally NOT gated on (hover:none)/(pointer:coarse) because Samsung
       * phones with S Pen (Note, Ultra, Tab) report hover:hover and break that
       * gate. The body class lcs-worksheet-landscape (set by JS only when the
       * worksheet image itself is landscape) keeps the rules properly scoped. */
      '@media (max-width:1024px) and (orientation:landscape) {',
      '  body.lcs-worksheet-landscape { overflow: hidden; margin: 0; padding: 0; }',
      '  body.lcs-worksheet-landscape #lcs-app {',
      '    max-width: none !important;',
      '    padding: 0 !important;',
      '    margin: 0 !important;',
      '    min-height: 0 !important;',
      '    display: block !important;',
      '  }',
      '  body.lcs-worksheet-landscape .lcs-bar,',
      '  body.lcs-worksheet-landscape .lcs-end-deck,',
      '  body.lcs-worksheet-landscape .lcs-sr {',
      '    display: none !important;',
      '  }',
      '  body.lcs-worksheet-landscape .lcs-worksheet-wrap {',
      '    padding: 0 !important;',
      '    margin: 0 !important;',
      '    display: block !important;',
      '  }',
      /* .lcs-worksheet width and height are set inline by JS (see fit() below).
       * No aspect-ratio + max-width/max-height combo here — that combo behaves
       * inconsistently across Chromium versions and was producing letterboxed
       * worksheets on Samsung Internet, which broke overlay-percentage math. */
      '  body.lcs-worksheet-landscape .lcs-worksheet {',
      '    margin: 0 auto !important;',
      '    box-shadow: none !important;',
      '    border-radius: 0 !important;',
      '  }',
      '  body.lcs-worksheet-landscape .lcs-worksheet__img {',
      '    width: 100% !important;',
      '    height: 100% !important;',
      '    object-fit: contain !important;',
      '    border-radius: 0 !important;',
      '  }',
      '  body.lcs-worksheet-landscape .lcs-overlay,',
      '  body.lcs-worksheet-landscape .lcs-overlay * {',
      '    box-sizing: border-box !important;',
      '    min-width: 0 !important;',
      '    min-height: 0 !important;',
      '  }',
      '  body.lcs-worksheet-landscape .lcs-overlay input,',
      '  body.lcs-worksheet-landscape .lcs-overlay button {',
      '    font-size: clamp(10px, 2.6vh, 16px) !important;',
      '    padding: 0 2px !important;',
      '    border-width: 2px !important;',
      '    line-height: 1 !important;',
      '  }',
      '  body.lcs-worksheet-landscape .lcs-footer {',
      '    position: fixed !important;',
      '    bottom: 8px !important;',
      '    right: 8px !important;',
      '    background: transparent !important;',
      '    border-top: 0 !important;',
      '    backdrop-filter: none !important;',
      '    -webkit-backdrop-filter: none !important;',
      '    padding: 0 !important;',
      '    margin: 0 !important;',
      '    width: auto !important;',
      '    z-index: 100 !important;',
      '    justify-content: flex-end !important;',
      '  }',
      '  body.lcs-worksheet-landscape .lcs-footer .lcs-btn {',
      '    min-height: 36px !important;',
      '    min-width: 0 !important;',
      '    padding: 8px 14px !important;',
      '    font-size: 13px !important;',
      '    box-shadow: 0 4px 12px rgba(0,0,0,.3) !important;',
      '  }',
      '}',
      '<\/style>',
      '<script>',
      '(function(){',
      '  "use strict";',
      '  var MQ = "(max-width:1024px) and (orientation:landscape)";',
      '  function getViewport(){',
      '    var w = (window.visualViewport && window.visualViewport.width) || window.innerWidth;',
      '    var h = (window.visualViewport && window.visualViewport.height) || window.innerHeight;',
      '    return { w: w, h: h };',
      '  }',
      /* Defensive: rewrite any cached pre-fix inline slot widths like
       * "max(8%, 64px)" → "8%". No-op when slots already use bare percentages.
       * Handles decks generated against pre-`5de1e373` app code that hadn\'t
       * yet dropped the px floors on slot dimensions. */
      '  function sanitizeSlots(){',
      '    var slots = document.querySelectorAll(".lcs-slot");',
      '    for (var i = 0; i < slots.length; i++) {',
      '      var s = slots[i];',
      '      ["width","height"].forEach(function(prop){',
      '        var v = s.style[prop];',
      '        if (v && v.indexOf("max(") !== -1) {',
      '          var m = v.match(/([0-9]*\\.?[0-9]+)\\s*%/);',
      '          if (m) s.style[prop] = m[1] + "%";',
      '        }',
      '      });',
      '    }',
      '  }',
      '  function fit(){',
      '    var img = document.querySelector(".lcs-worksheet__img");',
      '    var ws = document.querySelector(".lcs-worksheet");',
      '    if (!img || !ws) return;',
      '    if (!img.naturalWidth || !img.naturalHeight) return;',
      '    var isLandscapeWs = img.naturalWidth > img.naturalHeight;',
      '    if (isLandscapeWs) document.body.classList.add("lcs-worksheet-landscape");',
      '    else document.body.classList.remove("lcs-worksheet-landscape");',
      '    var compact = window.matchMedia(MQ).matches && isLandscapeWs;',
      '    if (!compact) {',
      '      ws.style.width = "";',
      '      ws.style.height = "";',
      '      ws.style.maxWidth = "";',
      '      ws.style.maxHeight = "";',
      '      return;',
      '    }',
      '    sanitizeSlots();',
      '    var v = getViewport();',
      '    var aspect = img.naturalWidth / img.naturalHeight;',
      /* Fit by visible-viewport height first (landscape phones are wider than tall). */
      '    var w = v.h * aspect;',
      '    var h = v.h;',
      '    if (w > v.w) { w = v.w; h = v.w / aspect; }',
      '    ws.style.width = w + "px";',
      '    ws.style.height = h + "px";',
      '    ws.style.maxWidth = "none";',
      '    ws.style.maxHeight = "none";',
      '  }',
      '  document.addEventListener("DOMContentLoaded", fit);',
      '  window.addEventListener("load", fit);',
      '  window.addEventListener("resize", fit);',
      '  window.addEventListener("orientationchange", fit);',
      '  if (window.visualViewport) {',
      '    window.visualViewport.addEventListener("resize", fit);',
      '  }',
      '  var img = document.querySelector(".lcs-worksheet__img");',
      '  if (img) img.addEventListener("load", fit);',
      '})();',
      '<\/script>'
    ].join('\n');
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
    buildSrRows: buildSrRows,
    buildSrPuzzleSummary: buildSrPuzzleSummary,
    buildShareAffordance: buildShareAffordance,
    buildEmbedAffordance: buildEmbedAffordance,
    buildResponsiveFitSnippet: buildResponsiveFitSnippet,
    vocabKeyFromImage: vocabKeyFromImage,
    HREFLANG_MARKER: HREFLANG_MARKER,
    export: exportCatalog
  };
}(typeof window !== 'undefined' ? window : this));
