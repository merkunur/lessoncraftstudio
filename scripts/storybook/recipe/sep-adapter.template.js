/* =====================================================================
   sep-adapter.template.js — copy-paste reference for wiring an app to SEP.
   NOT loaded anywhere; a template. See docs/storybook/sep-rollout-recipe.md.

   Replace the <PLACEHOLDERS>. Place this block per the recipe's "WHERE to place it"
   (top-level if the vars are top-level; else early inside init(), right after the
   canvas is created and BEFORE any hanging await). All identifiers must be in scope.
   ===================================================================== */

// --- headless detection (for apps whose init runs a concurrent generate) ---
var __sbHeadless = (typeof location !== 'undefined') && /[?&]__sbHeadless/.test(location.search || '');

(function () {
  function sepOpts(cropRect, returnPackage) {
    return {
      canvas: /*<CANVAS VAR>*/ worksheetCanvas,
      extractBundle: /*<extractDeckBundle fn>*/ extractDeckBundle,
      exerciseObjects: function (c) { return c.getObjects().filter(function (o) { return /*<PREDICATE — this app's generated answer objects>*/ o.isGeneratedItem === true; }); },
      family: /*<'A'|'C'|'E'|'F'|'B'|'D'>*/ 'A',
      // numeric: true,   // number-fill (Family A digit palette)
      // tapOnly: true,   // Family C: drop tiny legend count-blanks (density)
      exerciseMode: null, cropRect: cropRect, returnPackage: returnPackage, noDownload: returnPackage
    };
  }
  var _b = document.getElementById('sepExportBtn');
  if (_b) _b.addEventListener('click', function () { window.LCSCatalogExport.exportStorybookExercise(sepOpts(null, false)); });
  window.__sepExport = function (cropRect) { return window.LCSCatalogExport.exportStorybookExercise(sepOpts(cropRect, true)); };

  window.__sepGenerate = async function (spec) {
    spec = spec || {};
    var loc = spec.locale || 'en';
    window.currentLocale = loc; try { currentLocale = loc; } catch (e) {}
    var theme = spec.theme || (spec.params && spec.params.theme) || 'animals';

    // (a) DIRECT-SEED: fetch the pool + set generation inputs; do NOT call the UI-init generate.
    try {
      var _res = await fetch('/api/images?theme=' + encodeURIComponent(theme) + '&locale=' + loc);
      var _d = await _res.json();
      /*<POOL VAR>*/ currentThemeImages = _d.images || _d || [];
    } catch (e) {}
    var rng = window.LCSCatalogExport._sepRng(spec.seed || 1);
    // ...select items / set theme+mode inputs here, seeded from rng, exactly as the app's core needs...
    // window.__sbAllowSmall = true;  // + set a below-floor grid/count if this app has a hard floor >1

    // (b) Force-load web fonts if this app lays out LIVE-MEASURED text (else metrics jitter → non-repro).
    try {
      if (document.fonts && document.fonts.load) {
        await Promise.all(['Baloo 2', 'Fredoka', 'Nunito', 'Lexend Deca', 'Quicksand'].reduce(function (a, f) {
          a.push(document.fonts.load('400 24px "' + f + '"').catch(function () {}));
          a.push(document.fonts.load('700 24px "' + f + '"').catch(function () {}));
          return a;
        }, []));
        await document.fonts.ready;
      }
    } catch (e) {}

    // (c) Seed + fire-and-poll with a re-seeded retry (deterministic regardless of which attempt wins).
    var _r = Math.random;
    var _ready = function () { return /*<CANVAS VAR>*/ worksheetCanvas && worksheetCanvas.problemsData && worksheetCanvas.getObjects().filter(function (o) { return /*<PREDICATE>*/ o.isGeneratedItem === true; }).length >= 1; };
    try {
      for (var _att = 0; _att < 3; _att++) {
        Math.random = window.LCSCatalogExport._sepRng(spec.seed || 1);
        try { await /*<CORE generate fn>*/ generateWorksheet(); } catch (e) {}
        var _ok = false;
        for (var _i = 0; _i < 300; _i++) { if (_ready()) { _ok = true; break; } await new Promise(function (r) { setTimeout(r, 50); }); }
        if (_ok) break;
      }
    } finally { Math.random = _r; }
    return window.LCSCatalogExport.exportStorybookExercise(sepOpts(null, true));
  };
}());

// (d) headless isolation: right AFTER the adapter above, inside init(), skip the concurrent init tail:
//     if (__sbHeadless) return;   // so the init's own generate never races the seeded __sepGenerate
