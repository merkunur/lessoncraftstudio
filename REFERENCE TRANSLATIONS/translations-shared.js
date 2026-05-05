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
    "srShareAriaCopyLink": "Copy link",

    // Embed v1 — labels for the in-deck embed affordance
    // (LCSCatalogExport.buildEmbedAffordance). Authored 2026-05-05 per
    // operator-locked snippet design spec; canonical snippet emits two
    // backlinks per the §1 SEO+embed-virality acquisition flywheel.
    "embedHeader": "Embed this worksheet on your site",
    "embedHelper": "Paste this into your website's HTML",
    "embedWidthLabel": "Width",
    "embedHeightLabel": "Height",
    "embedCopyButton": "Copy code",
    "embedCopiedFeedback": "Copied!",
    "embedClose": "Close",
    "embedButtonTooltip": "Embed this worksheet",
    "embedAttributionPrefix": "Worksheet from",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "free printable worksheets"
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
    "srShareAriaCopyLink": "Link kopieren",

    // Embed v1 — labels for the in-deck embed affordance.
    "embedHeader": "Dieses Arbeitsblatt auf Ihrer Website einbetten",
    "embedHelper": "Fügen Sie dies in den HTML-Code Ihrer Website ein",
    "embedWidthLabel": "Breite",
    "embedHeightLabel": "Höhe",
    "embedCopyButton": "Code kopieren",
    "embedCopiedFeedback": "Kopiert!",
    "embedClose": "Schließen",
    "embedButtonTooltip": "Dieses Arbeitsblatt einbetten",
    "embedAttributionPrefix": "Arbeitsblatt von",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "kostenlose druckbare Arbeitsblätter"
  },

  // Tier-1+2 + Tier-4 Romance locales — operator-best-effort embed authoring
  // (Claude has stronger quality assessment in these languages per §17.5).
  // Embed keys only; existing srShare/srShape keys for these locales fall
  // through to en via §17.8.14 srLang-keyed lookup convention.
  "es": {
    "embedHeader": "Incrustar esta hoja de trabajo en tu sitio",
    "embedHelper": "Pega esto en el HTML de tu sitio web",
    "embedWidthLabel": "Ancho",
    "embedHeightLabel": "Alto",
    "embedCopyButton": "Copiar código",
    "embedCopiedFeedback": "¡Copiado!",
    "embedClose": "Cerrar",
    "embedButtonTooltip": "Incrustar esta hoja de trabajo",
    "embedAttributionPrefix": "Hoja de trabajo de",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "hojas de trabajo imprimibles gratis"
  },
  "nl": {
    "embedHeader": "Dit werkblad op je site insluiten",
    "embedHelper": "Plak dit in de HTML van je website",
    "embedWidthLabel": "Breedte",
    "embedHeightLabel": "Hoogte",
    "embedCopyButton": "Code kopiëren",
    "embedCopiedFeedback": "Gekopieerd!",
    "embedClose": "Sluiten",
    "embedButtonTooltip": "Dit werkblad insluiten",
    "embedAttributionPrefix": "Werkblad van",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "gratis printbare werkbladen"
  },
  "fr": {
    "embedHeader": "Intégrer cette fiche sur votre site",
    "embedHelper": "Collez ceci dans le HTML de votre site web",
    "embedWidthLabel": "Largeur",
    "embedHeightLabel": "Hauteur",
    "embedCopyButton": "Copier le code",
    "embedCopiedFeedback": "Copié !",
    "embedClose": "Fermer",
    "embedButtonTooltip": "Intégrer cette fiche",
    "embedAttributionPrefix": "Fiche de",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "fiches imprimables gratuites"
  },
  "it": {
    "embedHeader": "Incorpora questa scheda sul tuo sito",
    "embedHelper": "Incolla questo nell'HTML del tuo sito web",
    "embedWidthLabel": "Larghezza",
    "embedHeightLabel": "Altezza",
    "embedCopyButton": "Copia codice",
    "embedCopiedFeedback": "Copiato!",
    "embedClose": "Chiudi",
    "embedButtonTooltip": "Incorpora questa scheda",
    "embedAttributionPrefix": "Scheda di",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "schede stampabili gratuite"
  },
  "pt": {
    // Brazilian Portuguese canonical per §6 (single 'pt' locale code; BR register).
    "embedHeader": "Incorporar esta atividade no seu site",
    "embedHelper": "Cole isto no HTML do seu site",
    "embedWidthLabel": "Largura",
    "embedHeightLabel": "Altura",
    "embedCopyButton": "Copiar código",
    "embedCopiedFeedback": "Copiado!",
    "embedClose": "Fechar",
    "embedButtonTooltip": "Incorporar esta atividade",
    "embedAttributionPrefix": "Atividade de",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "atividades gratuitas para imprimir"
  },

  // Nordic locales — operator-best-effort embed authoring + NSR-flagged
  // per §17.5.1 (Claude's quality assessment in sv/da/no/fi is weaker).
  // Future native-speaker review pass refines these without re-shipping the
  // full Embed Layer-2 commission.
  "sv": {
    "embedHeader": "Bädda in detta arbetsblad på din webbplats",
    "embedHelper": "Klistra in detta i din webbplats HTML",
    "embedWidthLabel": "Bredd",
    "embedHeightLabel": "Höjd",
    "embedCopyButton": "Kopiera kod",
    "embedCopiedFeedback": "Kopierat!",
    "embedClose": "Stäng",
    "embedButtonTooltip": "Bädda in detta arbetsblad",
    "embedAttributionPrefix": "Arbetsblad från",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "gratis utskrivbara arbetsblad"
  },
  "da": {
    "embedHeader": "Indlejr dette arbejdsark på dit websted",
    "embedHelper": "Indsæt dette i HTML'en på dit websted",
    "embedWidthLabel": "Bredde",
    "embedHeightLabel": "Højde",
    "embedCopyButton": "Kopiér kode",
    "embedCopiedFeedback": "Kopieret!",
    "embedClose": "Luk",
    "embedButtonTooltip": "Indlejr dette arbejdsark",
    "embedAttributionPrefix": "Arbejdsark fra",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "gratis printbare arbejdsark"
  },
  "no": {
    // Bokmål canonical per §6 (single 'no' locale code).
    "embedHeader": "Bygg inn dette arbeidsarket på nettstedet ditt",
    "embedHelper": "Lim dette inn i HTML-koden på nettstedet ditt",
    "embedWidthLabel": "Bredde",
    "embedHeightLabel": "Høyde",
    "embedCopyButton": "Kopier kode",
    "embedCopiedFeedback": "Kopiert!",
    "embedClose": "Lukk",
    "embedButtonTooltip": "Bygg inn dette arbeidsarket",
    "embedAttributionPrefix": "Arbeidsark fra",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "gratis utskrivbare arbeidsark"
  },
  "fi": {
    "embedHeader": "Upota tämä työarkki sivustollesi",
    "embedHelper": "Liitä tämä sivustosi HTML-koodiin",
    "embedWidthLabel": "Leveys",
    "embedHeightLabel": "Korkeus",
    "embedCopyButton": "Kopioi koodi",
    "embedCopiedFeedback": "Kopioitu!",
    "embedClose": "Sulje",
    "embedButtonTooltip": "Upota tämä työarkki",
    "embedAttributionPrefix": "Työarkki:",
    "embedAttributionBrand": "LessonCraftStudio",
    "embedAttributionSeparator": " — ",
    "embedAttributionKeyword": "ilmaiset tulostettavat työarkit"
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
