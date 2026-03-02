/**
 * Template Engine — shared worksheet generation engine
 * =====================================================
 * Provides token-based template resolution, seeded PRNG,
 * grammar helpers, and layout primitives for worksheet apps.
 *
 * Dependencies (loaded before this file via <script> tags):
 *   - image-vocabulary.js  (IMAGE_VOCABULARY, ImageVocab)
 *   - vocab-indices.js     (VOCAB_INDEX, VocabQuery)
 *   - name-pools.js        (NAME_POOLS, NameHelper)
 *
 * Usage:
 *   const resolver = TemplateEngine.createResolver(tokenSchema, { locale: 'en', seed: 42 });
 *   const result = resolver.resolve('<word> has <count> letters.');
 *   // → "Cat has 3 letters."
 */

/* eslint-disable */
// @ts-nocheck

var TemplateEngine = (function() {
  'use strict';

  // ============================================================
  // 1. SEEDED PRNG — Mulberry32
  // ============================================================

  /**
   * Seeded pseudo-random number generator (Mulberry32).
   * Same seed always produces the same sequence.
   * @param {number} seed - Integer seed
   */
  function SeededRNG(seed) {
    this._seed = seed | 0;
    this._initial = this._seed;
  }

  SeededRNG.prototype = {
    /** Get next float in [0, 1) */
    next: function() {
      this._seed |= 0;
      this._seed = this._seed + 0x6D2B79F5 | 0;
      var t = Math.imul(this._seed ^ this._seed >>> 15, 1 | this._seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    },

    /** Get random integer in [min, max] inclusive */
    int: function(min, max) {
      return min + Math.floor(this.next() * (max - min + 1));
    },

    /** Pick a random element from an array */
    pick: function(arr) {
      if (!arr || arr.length === 0) return undefined;
      return arr[Math.floor(this.next() * arr.length)];
    },

    /** Fisher-Yates shuffle (in-place, returns the array) */
    shuffle: function(arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(this.next() * (i + 1));
        var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
      }
      return arr;
    },

    /** Get the initial seed (useful for answer key generation) */
    getSeed: function() {
      return this._initial;
    },

    /** Reset to initial seed */
    reset: function() {
      this._seed = this._initial;
    }
  };


  // ============================================================
  // 2. TOKEN TYPE REGISTRY
  // ============================================================

  var _tokenTypes = {};

  /**
   * Register a token type.
   * @param {string} name - Type name
   * @param {Object} definition
   * @param {function} definition.resolve - function(tokenDef, context) → resolved value
   * @param {function} [definition.deps] - function(tokenDef) → array of token IDs this depends on
   */
  function registerTokenType(name, definition) {
    _tokenTypes[name] = definition;
  }


  // ============================================================
  // 3. BUILT-IN TOKEN TYPES
  // ============================================================

  // --- random_number ---
  registerTokenType('random_number', {
    resolve: function(def, ctx) {
      var min = def.min !== undefined ? def.min : 1;
      var max = def.max !== undefined ? def.max : 10;
      return ctx.rng.int(min, max);
    },
    deps: function() { return []; }
  });

  // --- vocabulary_lookup ---
  registerTokenType('vocabulary_lookup', {
    resolve: function(def, ctx) {
      // Build filter query from token definition
      var filters = {};
      if (def.semantic) filters.semantic = def.semantic;
      if (def.cvc) filters.cvc = def.cvc;
      if (def.wordFamily) filters.wordFamily = def.wordFamily;
      if (def.difficulty) filters.difficulty = def.difficulty;
      if (def.letterCount) filters.letterCount = def.letterCount;
      if (def.beginSound) filters.beginSound = def.beginSound;
      if (def.theme) filters.theme = def.theme;
      if (def.pattern) filters.pattern = def.pattern;
      if (def.syllable) filters.syllable = def.syllable;
      if (def.countable) filters.countable = true;
      if (def.vocabType) filters.type = def.vocabType;

      var candidates = VocabQuery.query(filters);

      // Exclude already-used keys to avoid duplicates on the same worksheet
      if (ctx._usedVocab && ctx._usedVocab.size > 0) {
        candidates = candidates.filter(function(k) { return !ctx._usedVocab.has(k); });
      }

      if (candidates.length === 0) {
        // Fallback: retry without exclusions
        candidates = VocabQuery.query(filters);
      }

      if (candidates.length === 0) return '';

      var key = ctx.rng.pick(candidates);

      // Track used vocabulary to prevent duplicates
      if (!ctx._usedVocab) ctx._usedVocab = new Set();
      ctx._usedVocab.add(key);

      // Return the vocab key (not the translated word — use grammar tokens for that)
      return key;
    },
    deps: function() { return []; }
  });

  // --- computed ---
  registerTokenType('computed', {
    resolve: function(def, ctx) {
      var expr = def.expr;
      if (typeof expr === 'function') {
        return expr(ctx.resolved);
      }
      // Simple arithmetic: "a + b", "a - b", "a * b"
      if (typeof expr === 'string') {
        var parts = expr.split(/\s*([+\-*\/])\s*/);
        if (parts.length === 3) {
          var a = Number(ctx.resolved[parts[0]]) || 0;
          var op = parts[1];
          var b = Number(ctx.resolved[parts[2]]) || 0;
          switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? Math.floor(a / b) : 0;
          }
        }
        // Single reference
        return ctx.resolved[expr] !== undefined ? ctx.resolved[expr] : expr;
      }
      return '';
    },
    deps: function(def) {
      if (typeof def.expr === 'string') {
        // Extract token references from expression
        return def.expr.split(/\s*[+\-*\/]\s*/).filter(function(p) { return p && !/^\d+$/.test(p); });
      }
      if (def.dependsOn) return def.dependsOn;
      return [];
    }
  });

  // --- name_pool ---
  registerTokenType('name_pool', {
    resolve: function(def, ctx) {
      var gender = def.gender || ctx.rng.pick(['male', 'female']);
      var locale = ctx.locale || 'en';

      // Avoid duplicates with other name tokens
      if (def.exclude && def.exclude.length > 0) {
        var excluded = new Set(def.exclude.map(function(id) { return ctx.resolved[id]; }).filter(Boolean));
        var pool = NameHelper.all(locale, gender);
        var available = pool.filter(function(n) { return !excluded.has(n); });
        return ctx.rng.pick(available) || ctx.rng.pick(pool);
      }

      return NameHelper.pick(locale, gender, ctx.rng);
    },
    deps: function(def) {
      return def.exclude || [];
    }
  });

  // --- image_reference ---
  registerTokenType('image_reference', {
    resolve: function(def, ctx) {
      var vocabKey = ctx.resolved[def.source];
      if (!vocabKey) return '';
      // Return an image reference object that renderers can use
      return {
        key: vocabKey,
        // Apps construct the actual URL based on their image loading strategy
        toString: function() { return vocabKey; }
      };
    },
    deps: function(def) {
      return [def.source];
    }
  });

  // --- transform ---
  registerTokenType('transform', {
    resolve: function(def, ctx) {
      var source = String(ctx.resolved[def.source] || '');
      var locale = ctx.locale || 'en';

      // If source is a vocab key, get the word in the current locale
      if (def.asWord && typeof IMAGE_VOCABULARY !== 'undefined' && IMAGE_VOCABULARY[source]) {
        source = ImageVocab.singular(source, locale);
      }

      switch (def.op) {
        case 'scramble':
          return ctx.rng.shuffle(source.split('')).join('');

        case 'blank_at':
          // Replace character at position with underscore
          var pos = def.position;
          if (pos === 'random') pos = ctx.rng.int(0, source.length - 1);
          if (pos === 'vowel') {
            // Find first vowel position
            var vowels = 'aeiouyAEIOUY';
            for (var i = 0; i < source.length; i++) {
              if (vowels.indexOf(source[i]) >= 0) { pos = i; break; }
            }
          }
          if (typeof pos !== 'number') pos = 0;
          return source.substring(0, pos) + '_' + source.substring(pos + 1);

        case 'split_letters':
          return source.split('');

        case 'first_letter':
          return source.charAt(0);

        case 'uppercase':
          return source.toUpperCase();

        case 'lowercase':
          return source.toLowerCase();

        case 'capitalize':
          return source.charAt(0).toUpperCase() + source.slice(1).toLowerCase();

        case 'reverse':
          return source.split('').reverse().join('');

        case 'length':
          return source.replace(/\s/g, '').length;

        default:
          return source;
      }
    },
    deps: function(def) {
      return [def.source];
    }
  });

  // --- grammar ---
  registerTokenType('grammar', {
    resolve: function(def, ctx) {
      var vocabKey = ctx.resolved[def.source];
      if (!vocabKey) return '';
      var locale = ctx.locale || 'en';

      switch (def.form) {
        case 'singular':
          return ImageVocab.singular(vocabKey, locale);
        case 'plural':
          return ImageVocab.plural(vocabKey, locale);
        case 'gender':
          return ImageVocab.gender(vocabKey, locale) || '';
        case 'article':
          return ImageVocab.defArticle(vocabKey, locale) || '';
        case 'article_singular':
          var art = ImageVocab.defArticle(vocabKey, locale);
          var sing = ImageVocab.singular(vocabKey, locale);
          return art ? (art + ' ' + sing) : sing;
        case 'count_agreement':
          var count = def.countToken ? Number(ctx.resolved[def.countToken]) : 1;
          if (count === 1) return ImageVocab.singular(vocabKey, locale);
          return ImageVocab.plural(vocabKey, locale);
        default:
          return ImageVocab.singular(vocabKey, locale);
      }
    },
    deps: function(def) {
      var d = [def.source];
      if (def.countToken) d.push(def.countToken);
      return d;
    }
  });

  // --- choice_set ---
  registerTokenType('choice_set', {
    resolve: function(def, ctx) {
      var correct = ctx.resolved[def.correct];
      if (correct === undefined) return [correct];

      var locale = ctx.locale || 'en';
      var count = def.count || 3; // total choices including correct

      // Get the correct answer as a word
      var correctWord;
      if (typeof IMAGE_VOCABULARY !== 'undefined' && IMAGE_VOCABULARY[correct]) {
        correctWord = ImageVocab.singular(correct, locale);
      } else {
        correctWord = String(correct);
      }

      var distractors = [];

      if (def.strategy === 'same_family' && typeof IMAGE_VOCABULARY !== 'undefined') {
        // Same word family distractors
        var correctPhonics = ctx._phonicsLookup ? ctx._phonicsLookup(correct) : null;
        if (correctPhonics && correctPhonics.wf) {
          var familyKeys = VocabQuery.byWordFamily(correctPhonics.wf);
          familyKeys = familyKeys.filter(function(k) { return k !== correct; });
          ctx.rng.shuffle(familyKeys);
          for (var i = 0; i < familyKeys.length && distractors.length < count - 1; i++) {
            distractors.push(ImageVocab.singular(familyKeys[i], locale));
          }
        }
      }

      if (def.strategy === 'same_sound' && typeof IMAGE_VOCABULARY !== 'undefined') {
        // Same beginning sound distractors
        var correctPhonics2 = ctx._phonicsLookup ? ctx._phonicsLookup(correct) : null;
        if (correctPhonics2 && correctPhonics2.onset) {
          var soundKeys = VocabQuery.byBeginSound(correctPhonics2.onset);
          soundKeys = soundKeys.filter(function(k) { return k !== correct; });
          ctx.rng.shuffle(soundKeys);
          for (var j = 0; j < soundKeys.length && distractors.length < count - 1; j++) {
            distractors.push(ImageVocab.singular(soundKeys[j], locale));
          }
        }
      }

      if (def.strategy === 'same_semantic' && typeof IMAGE_VOCABULARY !== 'undefined') {
        // Same semantic category distractors
        var rawEntry = typeof _rawVocab !== 'undefined' ? _rawVocab[correct] : null;
        if (rawEntry && rawEntry._semantic && rawEntry._semantic.length > 0) {
          var tag = rawEntry._semantic[0];
          var semanticKeys = VocabQuery.bySemantic(tag);
          semanticKeys = semanticKeys.filter(function(k) { return k !== correct; });
          ctx.rng.shuffle(semanticKeys);
          for (var m = 0; m < semanticKeys.length && distractors.length < count - 1; m++) {
            distractors.push(ImageVocab.singular(semanticKeys[m], locale));
          }
        }
      }

      // Fill remaining with random vocabulary if needed
      if (distractors.length < count - 1 && typeof IMAGE_VOCABULARY !== 'undefined') {
        var allKeys = Object.keys(IMAGE_VOCABULARY);
        ctx.rng.shuffle(allKeys);
        var usedWords = new Set(distractors);
        usedWords.add(correctWord);
        for (var n = 0; n < allKeys.length && distractors.length < count - 1; n++) {
          var w = ImageVocab.singular(allKeys[n], locale);
          if (!usedWords.has(w)) {
            distractors.push(w);
            usedWords.add(w);
          }
        }
      }

      // Build choices array: correct + distractors, shuffled
      var choices = [correctWord].concat(distractors.slice(0, count - 1));
      ctx.rng.shuffle(choices);

      return {
        choices: choices,
        correct: correctWord,
        correctIndex: choices.indexOf(correctWord),
        toString: function() { return choices.join(', '); }
      };
    },
    deps: function(def) {
      return [def.correct];
    }
  });


  // ============================================================
  // 4. RESOLUTION PIPELINE
  // ============================================================

  /**
   * Topological sort of token IDs based on dependencies.
   * @param {Object} schema - Token schema { id: { type, ... }, ... }
   * @returns {string[]} Ordered token IDs
   */
  function topoSort(schema) {
    var ids = Object.keys(schema);
    var visited = {};
    var order = [];

    function visit(id) {
      if (visited[id] === 'done') return;
      if (visited[id] === 'visiting') {
        throw new Error('Circular dependency detected at token: ' + id);
      }
      visited[id] = 'visiting';

      var def = schema[id];
      var typeDef = _tokenTypes[def.type];
      var deps = typeDef && typeDef.deps ? typeDef.deps(def) : [];

      for (var i = 0; i < deps.length; i++) {
        if (schema[deps[i]]) visit(deps[i]);
      }

      visited[id] = 'done';
      order.push(id);
    }

    for (var i = 0; i < ids.length; i++) {
      visit(ids[i]);
    }

    return order;
  }

  /**
   * Parse template string for <tokenId> references.
   * @param {string} template
   * @returns {string[]} Token IDs found
   */
  function parseTokenRefs(template) {
    var refs = [];
    var re = /<([a-zA-Z_][a-zA-Z0-9_]*)>/g;
    var match;
    while ((match = re.exec(template)) !== null) {
      if (refs.indexOf(match[1]) === -1) refs.push(match[1]);
    }
    return refs;
  }

  /**
   * Substitute resolved values into template string.
   * @param {string} template - Template with <tokenId> placeholders
   * @param {Object} resolved - Map of tokenId → resolved value
   * @returns {string}
   */
  function substitute(template, resolved) {
    return template.replace(/<([a-zA-Z_][a-zA-Z0-9_]*)>/g, function(match, id) {
      var val = resolved[id];
      if (val === undefined) return match; // Leave unresolved
      return String(val);
    });
  }

  /**
   * Post-process resolved text.
   * - Capitalize after sentence-ending punctuation
   * - Fix double spaces
   * - Locale-specific adjustments
   */
  function postProcess(text, locale) {
    // Fix double spaces
    text = text.replace(/  +/g, ' ').trim();

    // Capitalize after sentence-ending punctuation
    text = text.replace(/([.!?]\s+)([a-z\u00e0-\u024f])/g, function(m, punct, letter) {
      return punct + letter.toUpperCase();
    });

    // Capitalize first character
    if (text.length > 0) {
      text = text.charAt(0).toUpperCase() + text.slice(1);
    }

    return text;
  }


  // ============================================================
  // 5. RESOLVER
  // ============================================================

  /**
   * Create a resolver instance.
   * @param {Object} tokenSchema - Token definitions { id: { type, ... }, ... }
   * @param {Object} [options]
   * @param {string} [options.locale] - Locale code (default: 'en')
   * @param {number} [options.seed] - RNG seed (default: random)
   * @returns {Object} Resolver instance
   */
  function createResolver(tokenSchema, options) {
    options = options || {};
    var locale = options.locale || 'en';
    var seed = options.seed !== undefined ? options.seed : (Date.now() ^ (Math.random() * 0xFFFFFFFF));
    var rng = new SeededRNG(seed);
    var schema = {};

    // Copy schema so we can modify it
    for (var id in tokenSchema) {
      if (tokenSchema.hasOwnProperty(id)) {
        schema[id] = tokenSchema[id];
      }
    }

    var resolver = {
      _schema: schema,
      _locale: locale,
      _rng: rng,
      _usedVocab: new Set(),

      /**
       * Resolve all tokens and substitute into template.
       * @param {string} [template] - Template string with <tokenId> placeholders.
       *                               If omitted, just resolves all tokens and returns the resolved map.
       * @returns {Object} { text, resolved, seed }
       */
      resolve: function(template) {
        // Compute resolution order
        var order = topoSort(this._schema);

        // Build context
        var ctx = {
          rng: this._rng,
          locale: this._locale,
          resolved: {},
          _usedVocab: this._usedVocab,
        };

        // Resolve in dependency order
        for (var i = 0; i < order.length; i++) {
          var id = order[i];
          var def = this._schema[id];
          var typeDef = _tokenTypes[def.type];
          if (typeDef) {
            ctx.resolved[id] = typeDef.resolve(def, ctx);
          }
        }

        var result = {
          resolved: ctx.resolved,
          seed: this._rng.getSeed(),
        };

        if (template) {
          result.text = postProcess(substitute(template, ctx.resolved), this._locale);
        }

        return result;
      },

      /**
       * Resolve multiple exercises (calls resolve N times, maintaining vocab uniqueness).
       * @param {string} template - Template string
       * @param {number} count - Number of exercises
       * @returns {{ exercises: Object[], seed: number }}
       */
      resolveMany: function(template, count) {
        var exercises = [];
        for (var i = 0; i < count; i++) {
          exercises.push(this.resolve(template));
        }
        return { exercises: exercises, seed: this._rng.getSeed() };
      },

      /** Change locale */
      setLocale: function(newLocale) {
        this._locale = newLocale;
      },

      /** Set/change RNG seed */
      setSeed: function(newSeed) {
        this._rng = new SeededRNG(newSeed);
      },

      /** Reset used vocabulary tracking (for new worksheet) */
      resetVocab: function() {
        this._usedVocab = new Set();
      },

      /** Update schema (merge overrides) */
      updateSchema: function(overrides) {
        for (var id in overrides) {
          if (overrides.hasOwnProperty(id)) {
            this._schema[id] = overrides[id];
          }
        }
      },

      /** Get current locale */
      getLocale: function() { return this._locale; },

      /** Get current seed */
      getSeed: function() { return this._rng.getSeed(); },

      /** Get the RNG instance */
      getRNG: function() { return this._rng; }
    };

    return resolver;
  }


  // ============================================================
  // 6. GRAMMAR HELPERS
  // ============================================================

  var grammar = {
    /** Get the definite article for a vocab key */
    article: function(vocabKey, locale) {
      return ImageVocab.defArticle(vocabKey, locale) || '';
    },

    /** Get singular form */
    singular: function(vocabKey, locale) {
      return ImageVocab.singular(vocabKey, locale);
    },

    /** Get plural form */
    plural: function(vocabKey, locale) {
      return ImageVocab.plural(vocabKey, locale);
    },

    /** Get grammatical gender */
    gender: function(vocabKey, locale) {
      return ImageVocab.gender(vocabKey, locale) || '';
    },

    /** Get count-appropriate form (singular if 1, plural otherwise) */
    countAgreement: function(vocabKey, count, locale) {
      return count === 1 ? ImageVocab.singular(vocabKey, locale) : ImageVocab.plural(vocabKey, locale);
    },

    /** Get the "all the" quantifier for an array of vocab keys */
    quantifier: function(vocabKeys, locale) {
      return ImageVocab.pluralQuantifier(vocabKeys, locale);
    },

    /** Check if a vocab key exists in the dictionary */
    exists: function(vocabKey) {
      return typeof IMAGE_VOCABULARY !== 'undefined' && IMAGE_VOCABULARY[vocabKey] !== undefined;
    }
  };


  // ============================================================
  // 7. VOCABULARY HELPERS
  // ============================================================

  var vocab = {
    /** Get a word in the specified locale */
    word: function(key, locale, form) {
      form = form || 'singular';
      if (form === 'plural') return ImageVocab.plural(key, locale);
      return ImageVocab.singular(key, locale);
    },

    /** Get letters of a word as an array */
    letters: function(key, locale) {
      var word = ImageVocab.singular(key, locale);
      return word ? word.toLowerCase().split('') : [];
    },

    /** Get letter count of a word */
    letterCount: function(key, locale) {
      var word = ImageVocab.singular(key, locale);
      return word ? word.replace(/\s/g, '').length : 0;
    },

    /** Check if vocab key exists */
    exists: function(key) {
      return typeof IMAGE_VOCABULARY !== 'undefined' && IMAGE_VOCABULARY[key] !== undefined;
    }
  };


  // ============================================================
  // 8. NAME HELPERS
  // ============================================================

  var names = {
    pick: function(locale, gender, rng) {
      return NameHelper.pick(locale, gender, rng);
    },
    pickUnique: function(locale, gender, count, rng) {
      return NameHelper.pickUnique(locale, gender, count, rng);
    },
    pickPair: function(locale, rng) {
      return NameHelper.pickPair(locale, rng);
    },
    all: function(locale, gender) {
      return NameHelper.all(locale, gender);
    }
  };


  // ============================================================
  // 9. LAYOUT PRIMITIVES — data descriptors
  // ============================================================

  var layouts = {
    /**
     * Row of boxes, one letter per box, with optional blanks.
     * @param {Object} opts
     * @param {string} opts.word - The word to display
     * @param {number[]} [opts.blanks] - Indices of letters to leave blank
     * @param {number} [opts.boxSize] - Box size in pixels (default: 40)
     * @returns {Object} Layout descriptor
     */
    letterBoxes: function(opts) {
      var word = opts.word || '';
      var letters = word.split('');
      var blanks = new Set(opts.blanks || []);
      return {
        type: 'letterBoxes',
        letters: letters.map(function(l, i) {
          return { char: l, blank: blanks.has(i), index: i };
        }),
        boxSize: opts.boxSize || 40,
        word: word,
        blankCount: blanks.size
      };
    },

    /**
     * N×M grid of images with optional labels.
     * @param {Object} opts
     * @param {Array} opts.items - Array of { key, label? } objects
     * @param {number} [opts.cols] - Number of columns (default: auto)
     * @param {number} [opts.imageSize] - Image size in pixels (default: 100)
     * @param {boolean} [opts.showLabels] - Show labels below images (default: false)
     * @returns {Object} Layout descriptor
     */
    imageGrid: function(opts) {
      var items = opts.items || [];
      var cols = opts.cols || Math.ceil(Math.sqrt(items.length));
      return {
        type: 'imageGrid',
        items: items,
        cols: cols,
        rows: Math.ceil(items.length / cols),
        imageSize: opts.imageSize || 100,
        showLabels: opts.showLabels || false
      };
    },

    /**
     * Two columns with connection points for matching exercises.
     * @param {Object} opts
     * @param {Array} opts.left - Left column items (images or text)
     * @param {Array} opts.right - Right column items (shuffled order)
     * @param {Array} opts.answers - Correct pairing indices
     * @returns {Object} Layout descriptor
     */
    matchingColumns: function(opts) {
      return {
        type: 'matchingColumns',
        left: opts.left || [],
        right: opts.right || [],
        answers: opts.answers || [],
        dotRadius: opts.dotRadius || 6
      };
    },

    /**
     * Rectangular pool of word choices.
     * @param {Object} opts
     * @param {string[]} opts.words - Words to display in the bank
     * @param {number} [opts.cols] - Number of columns (default: auto)
     * @returns {Object} Layout descriptor
     */
    wordBank: function(opts) {
      var words = opts.words || [];
      return {
        type: 'wordBank',
        words: words,
        cols: opts.cols || Math.min(words.length, 4)
      };
    },

    /**
     * Text with inline blanks and/or inline images.
     * @param {Object} opts
     * @param {string} opts.text - Text with ___ for blanks and [img:key] for images
     * @param {string} [opts.answer] - The correct answer for the blank
     * @returns {Object} Layout descriptor
     */
    sentenceFrame: function(opts) {
      return {
        type: 'sentenceFrame',
        text: opts.text || '',
        answer: opts.answer || '',
        fontSize: opts.fontSize || 20
      };
    },

    /**
     * Vertically stacked exercise rows.
     * @param {Object} opts
     * @param {Array} opts.exercises - Array of layout descriptors (one per row)
     * @param {number} [opts.spacing] - Vertical spacing between rows (default: 20)
     * @returns {Object} Layout descriptor
     */
    exerciseRows: function(opts) {
      return {
        type: 'exerciseRows',
        exercises: opts.exercises || [],
        spacing: opts.spacing || 20
      };
    }
  };


  // ============================================================
  // 10. LAYOUT RENDERERS — Fabric.js converters
  // ============================================================

  var renderers = {
    /**
     * Render letter boxes on a Fabric.js canvas.
     * @param {Object} descriptor - From layouts.letterBoxes()
     * @param {fabric.Canvas} canvas - Target canvas
     * @param {Object} pos - { x, y } position
     * @param {Object} [style] - Override styles
     * @returns {fabric.Group} The rendered group
     */
    letterBoxes: function(descriptor, canvas, pos, style) {
      if (typeof fabric === 'undefined') return null;
      style = style || {};
      var boxSize = style.boxSize || descriptor.boxSize;
      var gap = style.gap || 4;
      var fontSize = style.fontSize || Math.floor(boxSize * 0.55);
      var objects = [];

      for (var i = 0; i < descriptor.letters.length; i++) {
        var letter = descriptor.letters[i];
        var x = pos.x + i * (boxSize + gap);

        // Box
        var rect = new fabric.Rect({
          left: x, top: pos.y,
          width: boxSize, height: boxSize,
          fill: style.fill || '#FFFFFF',
          stroke: style.stroke || '#333333',
          strokeWidth: style.strokeWidth || 1.5,
          rx: style.rx || 3, ry: style.ry || 3,
        });
        objects.push(rect);

        // Letter (or blank)
        if (!letter.blank) {
          var text = new fabric.Text(letter.char.toUpperCase(), {
            left: x + boxSize / 2,
            top: pos.y + boxSize / 2,
            fontSize: fontSize,
            fontFamily: style.fontFamily || 'Arial',
            fill: style.textFill || '#333333',
            originX: 'center', originY: 'center',
            selectable: false,
          });
          objects.push(text);
        }
      }

      var group = new fabric.Group(objects, { selectable: false });
      canvas.add(group);
      return group;
    },

    /**
     * Render an image grid on a Fabric.js canvas.
     * @param {Object} descriptor - From layouts.imageGrid()
     * @param {fabric.Canvas} canvas - Target canvas
     * @param {Object} pos - { x, y } position
     * @param {Object} [style] - Override styles
     * @param {function} loadImage - function(key, callback) to load images
     * @returns {Promise} Resolves when all images loaded
     */
    imageGrid: function(descriptor, canvas, pos, style, loadImage) {
      if (typeof fabric === 'undefined') return Promise.resolve(null);
      style = style || {};
      var imgSize = style.imageSize || descriptor.imageSize;
      var gap = style.gap || 15;
      var labelHeight = descriptor.showLabels ? 25 : 0;
      var cellH = imgSize + labelHeight + gap;
      var cellW = imgSize + gap;

      var promises = descriptor.items.map(function(item, idx) {
        var col = idx % descriptor.cols;
        var row = Math.floor(idx / descriptor.cols);
        var x = pos.x + col * cellW;
        var y = pos.y + row * cellH;

        return new Promise(function(resolve) {
          loadImage(item.key, function(img) {
            if (img) {
              img.scaleToWidth(imgSize);
              img.set({ left: x, top: y, selectable: false });
              canvas.add(img);
            }
            if (descriptor.showLabels && item.label) {
              var label = new fabric.Text(item.label, {
                left: x + imgSize / 2, top: y + imgSize + 5,
                fontSize: style.labelFontSize || 14,
                fontFamily: style.fontFamily || 'Arial',
                fill: style.labelFill || '#333333',
                originX: 'center', selectable: false,
              });
              canvas.add(label);
            }
            resolve();
          });
        });
      });

      return Promise.all(promises);
    },

    /**
     * Render matching columns on a Fabric.js canvas.
     * @param {Object} descriptor - From layouts.matchingColumns()
     * @param {fabric.Canvas} canvas - Target canvas
     * @param {Object} pos - { x, y } position
     * @param {Object} [style] - Override styles
     * @returns {fabric.Group}
     */
    matchingColumns: function(descriptor, canvas, pos, style) {
      if (typeof fabric === 'undefined') return null;
      style = style || {};
      var rowHeight = style.rowHeight || 50;
      var colWidth = style.colWidth || 200;
      var dotR = style.dotRadius || descriptor.dotRadius;
      var objects = [];

      for (var i = 0; i < descriptor.left.length; i++) {
        var y = pos.y + i * rowHeight;

        // Left item
        var leftText = new fabric.Text(String(descriptor.left[i]), {
          left: pos.x, top: y,
          fontSize: style.fontSize || 16,
          fontFamily: style.fontFamily || 'Arial',
          fill: style.textFill || '#333333',
          selectable: false,
        });
        objects.push(leftText);

        // Left dot
        var leftDot = new fabric.Circle({
          left: pos.x + colWidth - 20, top: y + 8,
          radius: dotR, fill: style.dotFill || '#666666',
          selectable: false,
        });
        objects.push(leftDot);
      }

      for (var j = 0; j < descriptor.right.length; j++) {
        var yr = pos.y + j * rowHeight;

        // Right dot
        var rightDot = new fabric.Circle({
          left: pos.x + colWidth + 20, top: yr + 8,
          radius: dotR, fill: style.dotFill || '#666666',
          selectable: false,
        });
        objects.push(rightDot);

        // Right item
        var rightText = new fabric.Text(String(descriptor.right[j]), {
          left: pos.x + colWidth + 40, top: yr,
          fontSize: style.fontSize || 16,
          fontFamily: style.fontFamily || 'Arial',
          fill: style.textFill || '#333333',
          selectable: false,
        });
        objects.push(rightText);
      }

      var group = new fabric.Group(objects, { selectable: false });
      canvas.add(group);
      return group;
    },

    /**
     * Render a word bank on a Fabric.js canvas.
     * @param {Object} descriptor - From layouts.wordBank()
     * @param {fabric.Canvas} canvas - Target canvas
     * @param {Object} pos - { x, y } position
     * @param {Object} [style] - Override styles
     * @returns {fabric.Group}
     */
    wordBank: function(descriptor, canvas, pos, style) {
      if (typeof fabric === 'undefined') return null;
      style = style || {};
      var fontSize = style.fontSize || 16;
      var padding = style.padding || 12;
      var colWidth = style.colWidth || 120;
      var rowHeight = style.rowHeight || 30;
      var objects = [];

      // Background
      var totalWidth = descriptor.cols * colWidth + padding * 2;
      var totalRows = Math.ceil(descriptor.words.length / descriptor.cols);
      var totalHeight = totalRows * rowHeight + padding * 2;

      var bg = new fabric.Rect({
        left: pos.x, top: pos.y,
        width: totalWidth, height: totalHeight,
        fill: style.bgFill || '#F5F5F5',
        stroke: style.stroke || '#CCCCCC',
        strokeWidth: 1, rx: 5, ry: 5,
      });
      objects.push(bg);

      // Words
      for (var i = 0; i < descriptor.words.length; i++) {
        var col = i % descriptor.cols;
        var row = Math.floor(i / descriptor.cols);
        var text = new fabric.Text(descriptor.words[i], {
          left: pos.x + padding + col * colWidth + colWidth / 2,
          top: pos.y + padding + row * rowHeight + rowHeight / 2,
          fontSize: fontSize,
          fontFamily: style.fontFamily || 'Arial',
          fill: style.textFill || '#333333',
          originX: 'center', originY: 'center',
          selectable: false,
        });
        objects.push(text);
      }

      var group = new fabric.Group(objects, { selectable: false });
      canvas.add(group);
      return group;
    },

    /**
     * Render a sentence frame on a Fabric.js canvas.
     * @param {Object} descriptor - From layouts.sentenceFrame()
     * @param {fabric.Canvas} canvas - Target canvas
     * @param {Object} pos - { x, y } position
     * @param {Object} [style] - Override styles
     * @returns {fabric.Group}
     */
    sentenceFrame: function(descriptor, canvas, pos, style) {
      if (typeof fabric === 'undefined') return null;
      style = style || {};
      var fontSize = style.fontSize || descriptor.fontSize;

      // Replace ___ with underline segments
      var displayText = descriptor.text.replace(/___+/g, '________');

      var text = new fabric.Text(displayText, {
        left: pos.x, top: pos.y,
        fontSize: fontSize,
        fontFamily: style.fontFamily || 'Arial',
        fill: style.textFill || '#333333',
        selectable: false,
      });

      canvas.add(text);
      return text;
    }
  };


  // ============================================================
  // 11. PUBLIC API
  // ============================================================

  return {
    /** Create a new resolver instance */
    createResolver: createResolver,

    /** Create a standalone RNG */
    createRNG: function(seed) {
      return new SeededRNG(seed !== undefined ? seed : (Date.now() ^ (Math.random() * 0xFFFFFFFF)));
    },

    /** Register a custom token type */
    registerTokenType: registerTokenType,

    /** Grammar helpers (wraps ImageVocab) */
    grammar: grammar,

    /** Vocabulary helpers */
    vocab: vocab,

    /** Name pool helpers */
    names: names,

    /** Layout descriptor creators */
    layouts: layouts,

    /** Fabric.js layout renderers */
    renderers: renderers,

    /** Utility: parse token refs from template string */
    parseTokenRefs: parseTokenRefs,

    /** Utility: substitute values into template */
    substitute: substitute,

    /** Utility: topological sort of token schema */
    topoSort: topoSort,

    /** SeededRNG constructor (for advanced usage) */
    SeededRNG: SeededRNG
  };

})();
