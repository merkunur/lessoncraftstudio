/* ============================================================================
   storybook-loader.js — SBLoader: story asset loading, prefetch + texture ledger.

   Wraps PIXI.Assets (v7). Owns which textures are resident:
   - Resident set = current page + prefetched next page + the base atlases of
     every character appearing on either. Clips atlases are TRANSIENT
     (loaded just-in-time for the page that uses them, released at page exit)
     and NEVER loaded on tiers with policy.maxPerformers === 0 — degradation
     as a *loading* decision.
   - Refcounted per-URL release; PIXI.Assets.unload destroys GPU textures.
   - VRAM ledger (RGBA8 estimate). Prefetch is refused (not failed) when it
     would exceed policy.vramBudget — the page then loads on demand instead.

   API:
     SBLoader.init(story, policy)
     SBLoader.urlFor(assetId) -> string            (throws on unknown id)
     SBLoader.loadPage(pageIndex, onProgress) -> Promise<void>
     SBLoader.prefetchPage(pageIndex) -> Promise<void>   (best-effort, silent)
     SBLoader.releaseExcept(keepPageIndices) -> void
     SBLoader.texture(assetId) -> PIXI.Texture | null
     SBLoader.sheet(assetId) -> PIXI.Spritesheet | null
     SBLoader.vramBytes() -> number
   ========================================================================= */
(function (global) {
  'use strict';

  var PIXI = null;
  var _story = null;
  var _policy = null;
  var _loaded = {};      /* url -> {result, bytes, refs:Set<pageIndex|'page:N'>} */
  var _pageUrls = {};    /* pageIndex -> [url] */
  var _loadingPages = {};/* pageIndex -> Promise */

  function _assetDef(assetId) {
    var def = _story && _story.assets && _story.assets[assetId];
    if (!def) throw new Error('[SBLoader] unknown assetId: ' + assetId);
    return def;
  }

  function urlFor(assetId) {
    var def = _assetDef(assetId);
    if (!def.src) throw new Error('[SBLoader] asset has no src: ' + assetId);
    return def.src;
  }

  /* Which asset ids does page `i` need on the Pixi side?
     (SEP exercise visuals + module images are DOM <img>, not loaded here.) */
  function _pageAssetIds(i) {
    var page = _story.pages[i];
    if (!page) return [];
    var ids = [];
    if (page.scene) {
      if (page.scene.image) ids.push(page.scene.image);
      var layers = page.scene.layers || [];
      for (var l = 0; l < layers.length; l++) ids.push(layers[l].image);
    }
    var castById = {};
    (_story.cast || []).forEach(function (c) { castById[c.id] = c; });
    var chars = page.characters || [];
    var needClips = {};
    if (page.success && page.success.clip) needClips[page.success.clip.characterId] = true;
    for (var c = 0; c < chars.length; c++) {
      var def = castById[chars[c].characterId];
      if (!def) continue;
      if (def.atlasBase) ids.push(def.atlasBase);
      /* clips: only when this page's success beat names a clip for this
         character AND the tier allows any clip performer at all */
      if (def.atlasClips && needClips[def.id] && _policy.maxPerformers > 0) {
        ids.push(def.atlasClips);
      }
    }
    /* de-dupe */
    var seen = {}, out = [];
    for (var k = 0; k < ids.length; k++) {
      if (!seen[ids[k]]) { seen[ids[k]] = 1; out.push(ids[k]); }
    }
    return out;
  }

  function _bytesOf(result) {
    try {
      if (result && result.baseTexture) {           /* Texture */
        return result.baseTexture.width * result.baseTexture.height * 4;
      }
      if (result && result.textures && result.baseTexture === undefined) {
        /* Spritesheet — count its base texture(s) incl. multipack links */
        var bt = result.baseTexture || (result.textures && Object.keys(result.textures).length &&
                 result.textures[Object.keys(result.textures)[0]].baseTexture);
        if (bt) return bt.width * bt.height * 4;
      }
    } catch (e) {}
    return 0;
  }

  function vramBytes() {
    var total = 0;
    for (var url in _loaded) total += _loaded[url].bytes || 0;
    return total;
  }

  function _retain(url, tag) {
    if (_loaded[url]) { _loaded[url].refs[tag] = 1; return Promise.resolve(_loaded[url].result); }
    return PIXI.Assets.load(url).then(function (result) {
      if (!_loaded[url]) {
        _loaded[url] = { result: result, bytes: _bytesOf(result), refs: {} };
      }
      _loaded[url].refs[tag] = 1;
      return result;
    });
  }

  function _loadPageInternal(i, onProgress, silent) {
    if (_loadingPages[i]) return _loadingPages[i];
    var ids = _pageAssetIds(i);
    var urls = ids.map(urlFor);
    _pageUrls[i] = urls;
    var doneCount = 0;
    var p = Promise.all(urls.map(function (url) {
      return _retain(url, 'page:' + i).then(function (r) {
        doneCount++;
        if (onProgress) onProgress(doneCount / Math.max(1, urls.length));
        return r;
      });
    })).then(function () { delete _loadingPages[i]; })
      .catch(function (err) {
        delete _loadingPages[i];
        if (silent) { try { console.warn('[SBLoader] prefetch failed for page', i, err); } catch (e) {} return; }
        throw err;
      });
    _loadingPages[i] = p;
    return p;
  }

  function loadPage(i, onProgress) { return _loadPageInternal(i, onProgress, false); }

  function prefetchPage(i) {
    if (!_story.pages[i]) return Promise.resolve();
    /* refuse (skip) prefetch that would blow the VRAM budget — the page will
       simply load on demand behind its loading beat instead */
    if (_policy.vramBudget && vramBytes() > _policy.vramBudget * 0.7) {
      return Promise.resolve();
    }
    return _loadPageInternal(i, null, true);
  }

  function releaseExcept(keepPages) {
    var keep = {};
    (keepPages || []).forEach(function (i) { keep['page:' + i] = 1; });
    for (var url in _loaded) {
      var refs = _loaded[url].refs;
      for (var tag in refs) {
        if (tag.indexOf('page:') === 0 && !keep[tag]) delete refs[tag];
      }
      if (Object.keys(refs).length === 0) {
        try { PIXI.Assets.unload(url); } catch (e) {}
        delete _loaded[url];
      }
    }
  }

  function _get(assetId) {
    var url;
    try { url = urlFor(assetId); } catch (e) { return null; }
    return _loaded[url] ? _loaded[url].result : null;
  }

  function texture(assetId) {
    var r = _get(assetId);
    if (!r) return null;
    if (r.baseTexture) return r;                       /* already a Texture */
    return null;
  }

  function sheet(assetId) {
    var r = _get(assetId);
    if (r && r.textures) return r;                     /* Spritesheet */
    return null;
  }

  function init(story, policy) {
    PIXI = global.PIXI;
    if (!PIXI) throw new Error('[SBLoader] PIXI missing — load vendor-pixi.min.js first');
    _story = story;
    _policy = policy || {};
    _loaded = {}; _pageUrls = {}; _loadingPages = {};
  }

  global.SBLoader = {
    init: init,
    urlFor: urlFor,
    loadPage: loadPage,
    prefetchPage: prefetchPage,
    releaseExcept: releaseExcept,
    texture: texture,
    sheet: sheet,
    vramBytes: vramBytes,
    _pageAssetIds: _pageAssetIds   /* exposed for the validator/QA harness */
  };
}(typeof window !== 'undefined' ? window : this));
