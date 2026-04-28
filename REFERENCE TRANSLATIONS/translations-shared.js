/**
 * Shared translations — keys consumed by ≥2 apps.
 *
 * Loaded universally by all 29 apps AFTER each per-app translations file
 * but BEFORE any code that calls t(). Merges SHARED_TRANSLATIONS into
 * window.translations on init.
 *
 * Naming convention table — see JSDoc on buildSrRows in catalog-export.js.
 *
 * Currently shared:
 *   srShape* — shape-name slug → localized noun. ≥2 consumers from day
 *   one: missing-pieces (6 piece shapes), prepositions (6 unique default
 *   backdrop shapes; reuses missing-pieces' srShapeSquare and
 *   srShapeCircle). 12 unique slugs total. Surfaced as the shared keyset
 *   from day one of Brief A 5A.3.
 *
 * Cache-buster versions on this file bump independently from per-app
 * translation file versions. When a future commit adds a shared key,
 * only this file's ?v= bumps; per-app translation file versions remain
 * unchanged unless their own content changes.
 *
 * Collision behavior: per-app keys win (per-app file loads first); shared
 * keys fill missing slots only (checked via hasOwnProperty so an
 * intentional empty/null/falsy per-app value is preserved, not overwritten).
 * Collisions log a console.warn with JSON.stringify'd values so empty
 * strings, null, etc. are visible rather than ambiguous blanks.
 */

const SHARED_TRANSLATIONS = {
  "en": {
    "srShapeSquare": "square",
    "srShapeCircle": "circle",
    "srShapeRectPortrait": "tall rectangle",
    "srShapeRectLandscape": "wide rectangle",
    "srShapeEllipsePortrait": "tall oval",
    "srShapeEllipseLandscape": "wide oval",
    "srShapeCube": "cube",
    "srShapeCylinder": "cylinder",
    "srShapeHeart": "heart",
    "srShapeHexagon": "hexagon",
    "srShapeStar": "star",
    "srShapeTriangle": "triangle",

    // Social-share v1 — labels for the in-deck share affordance
    // (LCSCatalogExport.buildShareAffordance, social-share-v1 brief Sub-phase A).
    // Consumed by all 29 apps that load translations-shared.js.
    "srShareNative": "Share",
    "srShareTo": "Share to",
    "srShareCopyLink": "Copy link",
    "srShareCopied": "Copied!",
    "srShareAriaFacebook": "Share on Facebook",
    "srShareAriaWhatsApp": "Share on WhatsApp",
    "srShareAriaPinterest": "Share on Pinterest",
    "srShareAriaEmail": "Share via email",
    "srShareAriaCopyLink": "Copy link"
  },
  "de": {
    "srShapeSquare": "Quadrat",
    "srShapeCircle": "Kreis",
    "srShapeRectPortrait": "hochkantes Rechteck",
    "srShapeRectLandscape": "breites Rechteck",
    "srShapeEllipsePortrait": "hochkantes Oval",
    "srShapeEllipseLandscape": "breites Oval",
    "srShapeCube": "Würfel",
    "srShapeCylinder": "Zylinder",
    "srShapeHeart": "Herz",
    "srShapeHexagon": "Sechseck",
    "srShapeStar": "Stern",
    "srShapeTriangle": "Dreieck",

    // Social-share v1 — labels for the in-deck share affordance
    // (LCSCatalogExport.buildShareAffordance, social-share-v1 brief Sub-phase C).
    // Consumed by all 29 apps that load translations-shared.js.
    "srShareNative": "Teilen",
    "srShareTo": "Teilen mit",
    "srShareCopyLink": "Link kopieren",
    "srShareCopied": "Kopiert!",
    "srShareAriaFacebook": "Auf Facebook teilen",
    "srShareAriaWhatsApp": "Auf WhatsApp teilen",
    "srShareAriaPinterest": "Auf Pinterest teilen",
    "srShareAriaEmail": "Per E-Mail teilen",
    "srShareAriaCopyLink": "Link kopieren"
  }
};

if (typeof window !== 'undefined') {
  window.SHARED_TRANSLATIONS = SHARED_TRANSLATIONS;

  // Merge-on-load: per-app keys win on collision (per-app file already
  // loaded above when this script runs). Use hasOwnProperty to distinguish
  // "key absent" (merge-fill) from "key intentionally set to any value
  // including empty/null/falsy" (per-app's choice; preserve).
  if (typeof window.translations === 'object' && window.translations !== null) {
    Object.keys(SHARED_TRANSLATIONS).forEach(function (locale) {
      if (!window.translations[locale]) {
        window.translations[locale] = {};
      }
      var localeBlock = SHARED_TRANSLATIONS[locale];
      Object.keys(localeBlock).forEach(function (key) {
        if (!Object.prototype.hasOwnProperty.call(window.translations[locale], key)) {
          window.translations[locale][key] = localeBlock[key];
        } else if (window.translations[locale][key] !== localeBlock[key]) {
          console.warn(
            '[translations-shared] Collision: per-app "' + locale + '.' + key +
            '" = ' + JSON.stringify(window.translations[locale][key]) +
            ' overrides shared ' + JSON.stringify(localeBlock[key])
          );
        }
        // perAppValue === sharedValue: harmless duplicate, no warn
      });
    });
  } else {
    console.warn(
      '[translations-shared] window.translations not defined when shared merge ran. ' +
      'This indicates a script-tag ordering bug: translations-shared.js must load AFTER ' +
      'the per-app translations-<app>.js file. Check the affected app HTML script-tag order.'
    );
  }
}
