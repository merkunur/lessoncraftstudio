/**
 * material-generator-shared.js — shared substrate for the Phase 3 material generators
 * (flashcards / picture-cards / sentence-strips / matching-mat / answer-key /
 * parent-take-home-letter / manipulative-cut-outs / vocabulary-tracing-strips).
 *
 * Per docs/lesson-plans/image-library-access-patterns.md §7. Does NOT modify the
 * existing /api/images endpoint (per CLAUDE.md §10.3); consumes existing surface.
 *
 * Loaded by each generator HTML via <script src="js/material-generator-shared.js?v=1">.
 * Synced into frontend/public/worksheet-generators/js/ by scripts\master-sync.bat.
 *
 * Public API (window.LCSMaterialGenerators):
 *   getThemeAssets(themeName, locale, count?)  → Promise<ImageAsset[]>
 *   lookupVocabulary(key, locale)              → {singular, plural, gender?} | null
 *   imageToVocabKey(image)                     → string | null
 *   getThemeDisplayName(themeName, locale)     → Promise<string>
 *   localizedLabel(key, locale, opts?)         → string  (handles case + simple article)
 *   localizedArticle(key, locale, opts?)       → string  (definite | indefinite per locale)
 *   LCS_LOCALES                                 → frozen string[]
 *   PAPER_SIZES                                 → frozen { letter, a4 } in points (1/72in)
 *   initCanvas(canvasEl, paperSize, opts?)     → fabric.Canvas (with paper-size dimensions)
 *   renderGrid(canvas, items, opts)            → void  (lays N items into cardsPerPage grid)
 *   renderCardBorder(canvas, x, y, w, h, opts) → void  (rounded/thin/thick/none)
 *   addCutGuides(canvas, cols, rows, x, y, w, h) → void
 *   emitPdf(canvas, filename, opts?)           → void  (jsPDF emit; multi-page if pages>1)
 *
 * Pre-locked decisions:
 *   - Pure browser-side (Fabric.js + jsPDF in operator's PC; no server-side rendering).
 *   - Theme-asset fetch via /api/images?theme=&locale=; no new endpoint.
 *   - Vocabulary lookup against pre-loaded global IMAGE_VOCABULARY (no async fetch).
 *   - Article auto-resolution: implemented for the locale set per LCS_LOCALES_WITH_ARTICLES;
 *     fi has no articles (returns ''); other locales use lookup table on gender code.
 */

(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  var LCS_LOCALES = Object.freeze([
    'en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi',
  ]);

  // Paper sizes in PDF points (1pt = 1/72in). jsPDF native unit.
  var PAPER_SIZES = Object.freeze({
    letter: Object.freeze({ portrait: { w: 612, h: 792 }, landscape: { w: 792, h: 612 } }),
    a4: Object.freeze({ portrait: { w: 595, h: 842 }, landscape: { w: 842, h: 595 } }),
  });

  // Article tables — definite + indefinite per locale per gender.
  // Gender codes per IMAGE_VOCABULARY: m / f / n / d / h / t.
  // Finnish (fi) has no articles → returns ''.
  var ARTICLES = {
    en: { definite: function () { return 'the'; }, indefinite: indefiniteEn },
    de: {
      definite: function (g) { return g === 'm' ? 'der' : g === 'f' ? 'die' : g === 'n' ? 'das' : 'das'; },
      indefinite: function (g) { return g === 'm' ? 'ein' : g === 'f' ? 'eine' : g === 'n' ? 'ein' : 'ein'; },
    },
    fr: {
      definite: function (g, word) {
        if (word && /^[aeiouhAEIOUH]/.test(word)) return "l'";
        return g === 'm' ? 'le' : 'la';
      },
      indefinite: function (g) { return g === 'm' ? 'un' : 'une'; },
    },
    es: {
      definite: function (g) { return g === 'm' ? 'el' : 'la'; },
      indefinite: function (g) { return g === 'm' ? 'un' : 'una'; },
    },
    pt: {
      definite: function (g) { return g === 'm' ? 'o' : 'a'; },
      indefinite: function (g) { return g === 'm' ? 'um' : 'uma'; },
    },
    it: {
      definite: function (g, word) {
        if (word && /^[aeiouAEIOU]/.test(word)) return "l'";
        return g === 'm' ? 'il' : 'la';
      },
      indefinite: function (g) { return g === 'm' ? 'un' : 'una'; },
    },
    nl: {
      definite: function (g) { return g === 'h' ? 'het' : 'de'; },
      indefinite: function () { return 'een'; },
    },
    sv: {
      definite: function () { return ''; }, // suffix-article in Swedish; gloss form
      indefinite: function (g) { return g === 't' ? 'ett' : 'en'; },
    },
    da: {
      definite: function () { return ''; },
      indefinite: function (g) { return g === 'n' ? 'et' : 'en'; },
    },
    no: {
      definite: function () { return ''; },
      indefinite: function (g) { return g === 'n' ? 'et' : g === 'f' ? 'ei' : 'en'; },
    },
    fi: { definite: function () { return ''; }, indefinite: function () { return ''; } },
  };

  function indefiniteEn(g, word) {
    if (!word) return 'a';
    return /^[aeiouAEIOU]/.test(word.charAt(0)) ? 'an' : 'a';
  }

  // NUMBER_WORDS — number-word forms 1-20 per locale.
  // Per CC adjudication (Arc 3 Phase 1): Romance gender variants ('uno'/'una';
  // 'um'/'uma'; 'un'/'une') default to MASCULINE. Nordic gender variants
  // ('en'/'ett'; 'en'/'et') default to COMMON-GENDER 'en'. Future Arc 4+ may
  // add gender-toggle parameter. Finnish defaults to NOMINATIVE single-form
  // ('yksi'/'kaksi'/...); accusative/partitive case morphology for counting
  // frames is NSR-flagged (extends per project_k3_phrasing_native_speaker_review).
  var NUMBER_WORDS = Object.freeze({
    en: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
         'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'],
    de: ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn',
         'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn', 'zwanzig'],
    es: ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
         'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'],
    fr: ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
         'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt'],
    pt: ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
         'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte'],
    it: ['', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci',
         'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove', 'venti'],
    nl: ['', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien',
         'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien', 'twintig'],
    sv: ['', 'en', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio',
         'elva', 'tolv', 'tretton', 'fjorton', 'femton', 'sexton', 'sjutton', 'arton', 'nitton', 'tjugo'],
    da: ['', 'en', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti',
         'elleve', 'tolv', 'tretten', 'fjorten', 'femten', 'seksten', 'sytten', 'atten', 'nitten', 'tyve'],
    no: ['', 'en', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti',
         'elleve', 'tolv', 'tretten', 'fjorten', 'femten', 'seksten', 'sytten', 'atten', 'nitten', 'tjue'],
    fi: ['', 'yksi', 'kaksi', 'kolme', 'neljä', 'viisi', 'kuusi', 'seitsemän', 'kahdeksan', 'yhdeksän', 'kymmenen',
         'yksitoista', 'kaksitoista', 'kolmetoista', 'neljätoista', 'viisitoista', 'kuusitoista', 'seitsemäntoista', 'kahdeksantoista', 'yhdeksäntoista', 'kaksikymmentä'],
  });

  /**
   * Get the localized number-word for a numeral 1-20.
   * @param {number} n - integer 1-20
   * @param {string} locale - one of LCS_LOCALES
   * @returns {string} - number-word in target locale; falls back to digit string if out of range
   */
  function localizedNumberWord(n, locale) {
    var words = NUMBER_WORDS[locale] || NUMBER_WORDS.en;
    if (typeof n !== 'number' || n < 1 || n > 20 || !Number.isFinite(n)) {
      return String(n);
    }
    return words[n] || String(n);
  }

  /**
   * Fetch theme assets in current locale via existing /api/images.
   * @param {string} themeName - theme name from image_themes.name (e.g., "animals", "food_bw").
   * @param {string} locale - ISO 639-1; one of LCS_LOCALES.
   * @param {number|null} [count] - optional cap. null = all.
   * @returns {Promise<Array>} - {path, url, name, word, theme}[].
   */
  function getThemeAssets(themeName, locale, count) {
    if (!themeName || !locale) {
      return Promise.reject(new Error('getThemeAssets: themeName and locale required'));
    }
    var url = '/api/images?theme=' + encodeURIComponent(themeName)
      + '&locale=' + encodeURIComponent(locale)
      + (count ? '&limit=' + encodeURIComponent(count) : '');
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('getThemeAssets: fetch failed (' + res.status + ')');
      return res.json();
    }).then(function (data) {
      var images = data.images || [];
      if (count && images.length > count) images = images.slice(0, count);
      return images;
    });
  }

  /**
   * Lookup vocabulary entry from pre-loaded IMAGE_VOCABULARY global.
   * @param {string} key - vocab key (e.g., "cat").
   * @param {string} locale
   * @returns {{singular:string, plural:string, gender?:string}|null}
   */
  function lookupVocabulary(key, locale) {
    if (typeof IMAGE_VOCABULARY === 'undefined') return null;
    if (!key || !locale) return null;
    var entry = IMAGE_VOCABULARY[key];
    if (!entry) return null;
    var t = entry[locale] || entry.en || null;
    if (!t || !Array.isArray(t)) return null;
    var result = { singular: t[0] || '', plural: t[1] || '' };
    if (t.length >= 3 && t[2]) result.gender = t[2];
    return result;
  }

  /**
   * Resolve a vocabulary key from any image form. Wraps LCSCatalogExport.vocabKeyFromImage
   * if available; falls back to inline regex.
   * @param {string|object} image
   * @returns {string|null}
   */
  function imageToVocabKey(image) {
    if (typeof window.LCSCatalogExport !== 'undefined' && window.LCSCatalogExport.vocabKeyFromImage) {
      return window.LCSCatalogExport.vocabKeyFromImage(image);
    }
    if (!image) return null;
    var img = typeof image === 'string' ? { path: image } : image;
    var pathOrName = img.path || img.word || img.name || '';
    if (!pathOrName) return null;
    var base = pathOrName.split('/').pop() || pathOrName;
    base = base.replace(/\.\w+$/, '');
    base = base.replace(/-\d{13}-[a-z0-9]+$/i, '');
    base = base.replace(/-\d+$/, '');
    return base || null;
  }

  // Cache for theme display names — single fetch per (theme, locale) per session.
  var THEME_NAME_CACHE = {};

  /**
   * Fetch the localized display name for a theme. Uses /api/images first-image's
   * `theme` field as the lookup key; for the actual displayName, returns the theme
   * name itself (in the locale's language) once /api/themes ships. Until then,
   * returns the Title-Cased themeName.
   */
  function getThemeDisplayName(themeName, locale) {
    var key = themeName + '|' + locale;
    if (THEME_NAME_CACHE[key]) return Promise.resolve(THEME_NAME_CACHE[key]);
    // No /api/themes yet — return the theme name Title-Cased as fallback.
    var fallback = themeName.split(/[_-]/).map(function (w) {
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(' ');
    THEME_NAME_CACHE[key] = fallback;
    return Promise.resolve(fallback);
  }

  /**
   * Get a localized label for a vocab key with optional case + article.
   * @param {string} key
   * @param {string} locale
   * @param {object} [opts]
   * @param {string} [opts.form='singular'] - 'singular' | 'plural'
   * @param {string} [opts.case='lowercase'] - 'lowercase' | 'Title Case' | 'UPPERCASE'
   * @param {string} [opts.article] - 'definite' | 'indefinite' | undefined
   * @returns {string}
   */
  function localizedLabel(key, locale, opts) {
    opts = opts || {};
    var vocab = lookupVocabulary(key, locale);
    if (!vocab) return key;
    var word = opts.form === 'plural' ? vocab.plural : vocab.singular;
    if (opts.article) {
      var art = localizedArticle(key, locale, { type: opts.article });
      if (art) word = art + ' ' + word;
    }
    return applyCase(word, opts.case);
  }

  /**
   * Get a localized article for a vocab key.
   * @param {string} key
   * @param {string} locale
   * @param {object} [opts]
   * @param {string} [opts.type='definite'] - 'definite' | 'indefinite'
   * @returns {string}
   */
  function localizedArticle(key, locale, opts) {
    opts = opts || {};
    var rules = ARTICLES[locale] || ARTICLES.en;
    var fn = opts.type === 'indefinite' ? rules.indefinite : rules.definite;
    var vocab = lookupVocabulary(key, locale);
    var gender = vocab ? vocab.gender : undefined;
    var word = vocab ? vocab.singular : '';
    return fn(gender, word) || '';
  }

  function applyCase(s, caseMode) {
    if (!s) return s;
    if (caseMode === 'UPPERCASE') return s.toUpperCase();
    if (caseMode === 'Title Case') {
      return s.split(/\s+/).map(function (w) {
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      }).join(' ');
    }
    return s.toLowerCase();
  }

  /**
   * Initialize a Fabric.js canvas with paper-size dimensions.
   * @param {HTMLCanvasElement|string} canvasEl - element or id.
   * @param {string} paperSize - 'letter' | 'a4'
   * @param {object} [opts]
   * @param {string} [opts.orientation='portrait'] - 'portrait' | 'landscape'
   * @param {string} [opts.backgroundColor='#FFFFFF']
   * @returns {fabric.Canvas}
   */
  function initCanvas(canvasEl, paperSize, opts) {
    if (typeof fabric === 'undefined') {
      throw new Error('initCanvas: fabric.js must be loaded before this function');
    }
    opts = opts || {};
    var orient = opts.orientation || 'portrait';
    var dims = (PAPER_SIZES[paperSize] || PAPER_SIZES.a4)[orient];
    var canvas = new fabric.Canvas(canvasEl, {
      width: dims.w,
      height: dims.h,
      backgroundColor: opts.backgroundColor || '#FFFFFF',
      preserveObjectStacking: true,
    });
    canvas.lcsPaperSize = paperSize;
    canvas.lcsOrientation = orient;
    canvas.lcsDims = dims;
    return canvas;
  }

  /**
   * Lay items into a grid of N rows × M columns within the page bounds.
   * Each item is rendered by callbackFn(canvas, item, x, y, w, h).
   *
   * @param {fabric.Canvas} canvas
   * @param {Array} items
   * @param {object} opts
   * @param {number} opts.cols
   * @param {number} opts.rows
   * @param {number} [opts.marginPt=36] - 0.5in margin in pts
   * @param {number} [opts.gapPt=18] - 0.25in inter-cell gap
   * @param {Function} opts.renderItem - callback(canvas, item, x, y, w, h, idx)
   */
  function renderGrid(canvas, items, opts) {
    opts = opts || {};
    var margin = opts.marginPt != null ? opts.marginPt : 36;
    var gap = opts.gapPt != null ? opts.gapPt : 18;
    var cols = opts.cols;
    var rows = opts.rows;
    if (!cols || !rows) throw new Error('renderGrid: cols and rows required');
    var paperW = canvas.lcsDims.w;
    var paperH = canvas.lcsDims.h;
    var gridW = paperW - 2 * margin - (cols - 1) * gap;
    var gridH = paperH - 2 * margin - (rows - 1) * gap;
    var cellW = gridW / cols;
    var cellH = gridH / rows;
    var renderItem = opts.renderItem;
    if (!renderItem) throw new Error('renderGrid: renderItem callback required');
    items.forEach(function (item, idx) {
      if (idx >= cols * rows) return;
      var col = idx % cols;
      var row = Math.floor(idx / cols);
      var x = margin + col * (cellW + gap);
      var y = margin + row * (cellH + gap);
      renderItem(canvas, item, x, y, cellW, cellH, idx);
    });
  }

  /**
   * Render a card border (rect or rounded rect).
   * @param {fabric.Canvas} canvas
   * @param {number} x, y, w, h
   * @param {object} [opts]
   * @param {string} [opts.style='thin'] - 'thin' | 'thick' | 'rounded' | 'none'
   * @param {boolean} [opts.roundedCorners=true]
   * @param {number} [opts.cornerRadius=8]
   * @param {string} [opts.stroke='#333333']
   */
  function renderCardBorder(canvas, x, y, w, h, opts) {
    opts = opts || {};
    var style = opts.style || 'thin';
    if (style === 'none') return;
    var strokeWidth = style === 'thick' ? 3 : 1;
    var fabricOpts = {
      left: x,
      top: y,
      width: w,
      height: h,
      fill: '',
      stroke: opts.stroke || '#333333',
      strokeWidth: strokeWidth,
      selectable: false,
      evented: false,
    };
    var rounded = opts.roundedCorners !== false;
    if (rounded) {
      fabricOpts.rx = opts.cornerRadius || 8;
      fabricOpts.ry = opts.cornerRadius || 8;
    }
    canvas.add(new fabric.Rect(fabricOpts));
  }

  /**
   * Render dashed cut-guide lines between cells of a grid. Lines drawn at
   * inter-cell midpoints (half-gap on either side).
   */
  function addCutGuides(canvas, cols, rows, x, y, w, h, opts) {
    opts = opts || {};
    var stroke = opts.stroke || '#999999';
    var dashArray = opts.dashArray || [4, 4];
    var cellW = w / cols;
    var cellH = h / rows;
    var i;
    for (i = 1; i < cols; i++) {
      var lx = x + i * cellW;
      canvas.add(new fabric.Line([lx, y, lx, y + h], {
        stroke: stroke, strokeWidth: 0.75, strokeDashArray: dashArray,
        selectable: false, evented: false,
      }));
    }
    for (i = 1; i < rows; i++) {
      var ly = y + i * cellH;
      canvas.add(new fabric.Line([x, ly, x + w, ly], {
        stroke: stroke, strokeWidth: 0.75, strokeDashArray: dashArray,
        selectable: false, evented: false,
      }));
    }
  }

  /**
   * Emit the canvas as a PDF via jsPDF. Single-page emit; multi-page support
   * lands in Phase 3b when sentence-strips needs it.
   * @param {fabric.Canvas} canvas
   * @param {string} filename
   * @param {object} [opts]
   * @param {Array<fabric.Canvas>} [opts.additionalPages] - extra pages to append
   */
  function emitPdf(canvas, filename, opts) {
    opts = opts || {};
    if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
      throw new Error('emitPdf: jsPDF must be loaded before this function');
    }
    var jsPDFCtor = (window.jspdf && window.jspdf.jsPDF) || (typeof jspdf !== 'undefined' && jspdf.jsPDF);
    var dims = canvas.lcsDims;
    var orient = canvas.lcsOrientation || 'portrait';
    var format = canvas.lcsPaperSize === 'letter' ? 'letter' : 'a4';
    var pdf = new jsPDFCtor({ unit: 'pt', format: format, orientation: orient });
    canvas.renderAll();
    var dataUrl = canvas.toDataURL({ format: 'jpeg', quality: 0.92, multiplier: 2 });
    pdf.addImage(dataUrl, 'JPEG', 0, 0, dims.w, dims.h);
    if (opts.additionalPages && Array.isArray(opts.additionalPages)) {
      opts.additionalPages.forEach(function (extraCanvas) {
        pdf.addPage(extraCanvas.lcsPaperSize === 'letter' ? 'letter' : 'a4', extraCanvas.lcsOrientation || 'portrait');
        extraCanvas.renderAll();
        var extraUrl = extraCanvas.toDataURL({ format: 'jpeg', quality: 0.92, multiplier: 2 });
        pdf.addImage(extraUrl, 'JPEG', 0, 0, extraCanvas.lcsDims.w, extraCanvas.lcsDims.h);
      });
    }
    pdf.save(filename);
  }

  /**
   * Async helper: load an image into a Fabric.Image, returning a promise.
   * Wraps fabric.Image.fromURL in a promise.
   */
  function loadFabricImage(url, opts) {
    opts = opts || {};
    return new Promise(function (resolve, reject) {
      fabric.Image.fromURL(url, function (img) {
        if (!img) return reject(new Error('loadFabricImage: load failed for ' + url));
        resolve(img);
      }, opts);
    });
  }

  window.LCSMaterialGenerators = {
    LCS_LOCALES: LCS_LOCALES,
    PAPER_SIZES: PAPER_SIZES,
    NUMBER_WORDS: NUMBER_WORDS,
    getThemeAssets: getThemeAssets,
    lookupVocabulary: lookupVocabulary,
    imageToVocabKey: imageToVocabKey,
    getThemeDisplayName: getThemeDisplayName,
    localizedLabel: localizedLabel,
    localizedArticle: localizedArticle,
    localizedNumberWord: localizedNumberWord,
    initCanvas: initCanvas,
    renderGrid: renderGrid,
    renderCardBorder: renderCardBorder,
    addCutGuides: addCutGuides,
    emitPdf: emitPdf,
    loadFabricImage: loadFabricImage,
  };
})();
