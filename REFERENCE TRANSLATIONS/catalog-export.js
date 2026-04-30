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
        url = 'https://lessoncraftstudio.com/' + locale + '/decks/' + slug + '/';
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
   * buildResponsiveFitSnippet — returns an embedded <script> snippet that, on
   * touch devices in landscape orientation viewing a landscape worksheet,
   * scales #lcs-app via CSS `zoom` so the whole worksheet fits the viewport
   * without scrolling. Other orientation combos (portrait phone, portrait
   * worksheet, desktop browser) preserve the natural width-fit + vertical-
   * scroll behavior — no scaling applied.
   *
   * Per HOMEPAGE-IMPLEMENTATION-PROMPT (operator request, 2026-04-30):
   * "when phone is in landscape AND worksheet is landscape, scale #lcs-app to
   * fit BOTH the viewport's width AND height so the whole worksheet is visible
   * without scrolling."
   *
   * Detection at deck-load time, not generation time — all 29 apps can produce
   * either orientation depending on the operator's canvas-type selection, so
   * the runtime reads img.naturalWidth/naturalHeight to decide whether the
   * baked worksheet is landscape.
   *
   * Touch-device gate via `(hover: none) and (pointer: coarse)` — phones and
   * tablets only, not desktop browsers resized narrow.
   *
   * Recomputes on resize and orientationchange, RAF-debounced. The first
   * scale apply may produce a one-shot CLS reflow; acceptable per spec.
   *
   * Place inside renderStandaloneHTML() output, just before </body>:
   *   parts.push(LCSCatalogExport.buildResponsiveFitSnippet());
   * Defensive form for forwards-compat with older catalog-export.js:
   *   parts.push((window.LCSCatalogExport && LCSCatalogExport.buildResponsiveFitSnippet)
   *     ? LCSCatalogExport.buildResponsiveFitSnippet() : '');
   */
  function buildResponsiveFitSnippet() {
    return [
      '<script>',
      '(function(){',
      '  "use strict";',
      '  var rafToken=null;',
      '  function fit(){',
      '    var app=document.getElementById("lcs-app");',
      '    if(!app)return;',
      '    var img=document.querySelector(".lcs-worksheet__img");',
      '    if(!img||!img.naturalWidth||!img.naturalHeight)return;',
      '    app.style.zoom="1";',
      '    var vw=document.documentElement.clientWidth;',
      '    var vh=document.documentElement.clientHeight;',
      '    if(!vw||!vh)return;',
      '    if(!window.matchMedia("(hover: none) and (pointer: coarse)").matches)return;',
      '    var phoneLandscape=vw>vh;',
      '    var worksheetLandscape=img.naturalWidth>img.naturalHeight;',
      '    if(!phoneLandscape||!worksheetLandscape)return;',
      '    var w=app.scrollWidth,h=app.scrollHeight;',
      '    if(!w||!h)return;',
      '    var scale=Math.min(vw/w,vh/h,1);',
      '    if(scale<0.999)app.style.zoom=scale;',
      '  }',
      '  function schedule(){',
      '    if(rafToken)return;',
      '    rafToken=requestAnimationFrame(function(){rafToken=null;fit();});',
      '  }',
      '  document.addEventListener("DOMContentLoaded",schedule);',
      '  window.addEventListener("load",schedule);',
      '  window.addEventListener("resize",schedule);',
      '  window.addEventListener("orientationchange",schedule);',
      '  var img=document.querySelector(".lcs-worksheet__img");',
      '  if(img)img.addEventListener("load",schedule);',
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
    buildResponsiveFitSnippet: buildResponsiveFitSnippet,
    vocabKeyFromImage: vocabKeyFromImage,
    HREFLANG_MARKER: HREFLANG_MARKER,
    export: exportCatalog
  };
}(typeof window !== 'undefined' ? window : this));
