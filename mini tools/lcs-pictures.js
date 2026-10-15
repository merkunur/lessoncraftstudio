/* =====================================================================
   lcs-pictures.js — the ONE way an activity shows a picture.
   ---------------------------------------------------------------------
   Activity law rule 4 (docs/activities-rebuild/LAW.md): pictures come
   only from the image library, colour themes only, labelled from
   image-vocabulary.js in the page locale. This helper reads the per-theme
   index that scripts/build-activity-picture-index.js writes to
   /mini-tools/pictures/<dir>.json and REFUSES rather than substitutes:
   a key without a picture throws, so a round can never render a word
   over blank space (the b3 `pictureFor` rule).

     LCSPictures.load('animals')            → Promise<theme>  (cached)
     LCSPictures.url(theme, key)            → '/image-library-webp/themes/animals/cat@2x.webp'
     LCSPictures.label(theme, key, 'de', {plural:true}) → 'Katzen'
     LCSPictures.keys(theme)                → ['bat','camel','cat',…]
     LCSPictures.img(theme, key, lang, {size, plural}) → <img> element with
                                              alt = the locale label, decoding async,
                                              draggable false, width/height set.
   No DOM is touched on load; no global state beyond the cache.
   ===================================================================== */
(function (global) {
  'use strict';
  var cache = {};
  function fileFor(dir) { return String(dir).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.json'; }
  function load(dir) {
    if (cache[dir]) return cache[dir];
    var url = '/mini-tools/pictures/' + fileFor(dir);
    cache[dir] = fetch(url).then(function (r) {
      if (!r.ok) throw new Error('picture index missing for theme "' + dir + '" (' + r.status + ')');
      return r.json();
    }).catch(function (e) { delete cache[dir]; throw e; });
    return cache[dir];
  }
  function entry(theme, key) {
    var e = theme && theme.nouns && theme.nouns[key];
    if (!e) throw new Error('no library picture for "' + key + '" in theme "' + (theme && theme.dir) + '"');
    return e;
  }
  function url(theme, key) { return entry(theme, key).src; }
  function label(theme, key, lang, opts) {
    var e = entry(theme, key);
    var l = String(lang || 'en').slice(0, 2);
    var row = e.labels[l] || e.labels.en;
    return (opts && opts.plural) ? row[1] : row[0];
  }
  function keys(theme) { return Object.keys((theme && theme.nouns) || {}).sort(); }
  function img(theme, key, lang, opts) {
    opts = opts || {};
    var el = document.createElement('img');
    el.src = url(theme, key);
    el.alt = label(theme, key, lang, { plural: !!opts.plural });
    el.decoding = 'async';
    el.draggable = false;
    if (opts.size) { el.width = opts.size; el.height = opts.size; }
    return el;
  }
  var api = { load: load, url: url, label: label, keys: keys, img: img, _fileFor: fileFor };
  global.LCSPictures = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof window !== 'undefined' ? window : globalThis));
