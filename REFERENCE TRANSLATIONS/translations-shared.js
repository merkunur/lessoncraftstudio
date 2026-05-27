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
    "embedAttributionKeyword": "free printable worksheets",

    // Deck-end-suggestion strip v1 (Commission B Phase 3) — header above the
    // 6-slot suggestion strip rendered inside the celebration overlay.
    // Substituted into deck.html via __DECK_END_SUGGESTIONS_HEADER__ at
    // publish-cli upload time. Nordic locales (sv/da/no/fi) NSR-flagged
    // per §17.5.1 Nordic-tier review posture.
    "deckEndSuggestionsHeader": "Try one of these next:",

    // SEO description fragments — consumed by all 29 apps' bundle.seoMeta
    // builders (freeInteractive / forWord / printOrPlay). Previously only
    // populated in translations-treasure-hunt.js (en+de); other 28 apps fell
    // through to t()-returns-key-on-miss, baking raw 'seoFreeInteractive' /
    // 'seoFor' / 'seoPrintOrPlayOnline' tokens into their <meta description>
    // surfaces. Promoted to shared per §14.3a ≥2-consumer rule (29 consumers).
    "seoFreeInteractive": "Free interactive",
    "seoFor": "for",
    "seoPrintOrPlayOnline": "Print or play online",
    "worksheet": "Worksheet",

    // Runtime UI v1 — labels for the embedded interactive runtime inside
    // deck.html (buttons, progress, celebration overlay, score card).
    // Previously baked into each app's per-app STRINGS object with only
    // English entries — non-en decks displayed English UI overlay regardless
    // of contentLanguage. Promoted to shared per §14.3a (all 29 apps consume).
    "runtimeCheckAnswers": "Check Answers",
    "runtimeTryAgain": "Try Again",
    "runtimeAllCorrect": "All correct!",
    "runtimeYouDidIt": "You did it!",
    "runtimeDoAnother": "Do Another",
    "runtimePrintMyWorksheet": "Print my worksheet",
    "runtimeMute": "Mute sounds",
    "runtimeUnmute": "Turn sounds on",
    "runtimeCorrect": "correct",
    "runtimeScore": "{n} of {total} correct",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "first-try stars",

    // Download UI v1 — labels for the worksheet-generator app download
    // dropdown. Consumed by all 33 apps. Previously per-app translation
    // files omitted these keys; t()-returns-key-on-miss leaked raw
    // "exportToCatalog"/"interactiveWorksheetHtml"/"common.grayscale"
    // into the UI. Promoted to shared per §14.3a ≥2-consumer rule.
    "download": "Download",
    "exportToCatalog": "Export to catalog",
    "pdfWorksheet": "PDF Worksheet",
    "pdfAnswerKey": "Answer Key (PDF)",
    "interactiveWorksheetHtml": "Interactive Worksheet (HTML)",
    "jpegImage": "JPEG Image",
    "grayscale": "Grayscale",

    // Alt-text SEO commission 2026-05-27 (Dimension 2 + Dimension 1):
    // iframeEmbedTitle drives the WCAG-required <iframe title>; emitted
    // by buildEmbedAffordance + by ActivityIframe. {deckTitle}
    // interpolates the per-deck title.
    // celebrationMiniAlt drives the celebration mini worksheet image alt
    // (was hardcoded English "Your completed worksheet" pre-commission).
    "iframeEmbedTitle": "{deckTitle} — interactive worksheet from LessonCraftStudio",
    "celebrationMiniAlt": "Your completed worksheet"
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
    "embedAttributionKeyword": "kostenlose druckbare Arbeitsblätter",
    "deckEndSuggestionsHeader": "Probiere als Nächstes eines davon:",
    "seoFreeInteractive": "Kostenloses interaktives",
    "seoFor": "für",
    "seoPrintOrPlayOnline": "Drucken oder online spielen",
    "worksheet": "Arbeitsblatt",
    "runtimeCheckAnswers": "Antworten prüfen",
    "runtimeTryAgain": "Erneut versuchen",
    "runtimeAllCorrect": "Alles richtig!",
    "runtimeYouDidIt": "Geschafft!",
    "runtimeDoAnother": "Noch eins",
    "runtimePrintMyWorksheet": "Mein Arbeitsblatt drucken",
    "runtimeMute": "Töne stummschalten",
    "runtimeUnmute": "Töne einschalten",
    "runtimeCorrect": "richtig",
    "runtimeScore": "{n} von {total} richtig",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "Sterne im ersten Versuch",

    // Download UI v1
    "download": "Herunterladen",
    "exportToCatalog": "Zum Katalog exportieren",
    "pdfWorksheet": "PDF-Arbeitsblatt",
    "pdfAnswerKey": "Lösungsbogen (PDF)",
    "interactiveWorksheetHtml": "Interaktives Arbeitsblatt (HTML)",
    "jpegImage": "JPEG-Bild",
    "grayscale": "Graustufen",
    "iframeEmbedTitle": "{deckTitle} — interaktives Arbeitsblatt von LessonCraftStudio",
    "celebrationMiniAlt": "Dein ausgefülltes Arbeitsblatt"
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
    "embedAttributionKeyword": "hojas de trabajo imprimibles gratis",
    "deckEndSuggestionsHeader": "Prueba uno de estos a continuación:",
    "seoFreeInteractive": "Hoja interactiva gratuita",
    "seoFor": "para",
    "seoPrintOrPlayOnline": "Imprimir o jugar en línea",
    "worksheet": "Ficha",
    "runtimeCheckAnswers": "Comprobar respuestas",
    "runtimeTryAgain": "Intentar de nuevo",
    "runtimeAllCorrect": "¡Todo correcto!",
    "runtimeYouDidIt": "¡Lo lograste!",
    "runtimeDoAnother": "Hacer otra",
    "runtimePrintMyWorksheet": "Imprimir mi hoja",
    "runtimeMute": "Silenciar sonidos",
    "runtimeUnmute": "Activar sonidos",
    "runtimeCorrect": "correctas",
    "runtimeScore": "{n} de {total} correctas",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "estrellas al primer intento",

    // Download UI v1
    "download": "Descargar",
    "exportToCatalog": "Exportar al catálogo",
    "pdfWorksheet": "Ficha PDF",
    "pdfAnswerKey": "Soluciones (PDF)",
    "interactiveWorksheetHtml": "Ficha interactiva (HTML)",
    "jpegImage": "Imagen JPEG",
    "grayscale": "Escala de grises",
    "iframeEmbedTitle": "{deckTitle} — hoja interactiva de LessonCraftStudio",
    "celebrationMiniAlt": "Tu hoja de ejercicios completada"
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
    "embedAttributionKeyword": "gratis printbare werkbladen",
    "deckEndSuggestionsHeader": "Probeer hierna een van deze:",
    "seoFreeInteractive": "Gratis interactief",
    "seoFor": "voor",
    "seoPrintOrPlayOnline": "Print of speel online",
    "worksheet": "Werkblad",
    "runtimeCheckAnswers": "Antwoorden controleren",
    "runtimeTryAgain": "Opnieuw proberen",
    "runtimeAllCorrect": "Alles goed!",
    "runtimeYouDidIt": "Gelukt!",
    "runtimeDoAnother": "Nog een",
    "runtimePrintMyWorksheet": "Mijn werkblad printen",
    "runtimeMute": "Geluid uit",
    "runtimeUnmute": "Geluid aan",
    "runtimeCorrect": "goed",
    "runtimeScore": "{n} van {total} goed",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "sterren in eerste poging",

    // Download UI v1
    "download": "Downloaden",
    "exportToCatalog": "Exporteren naar catalogus",
    "pdfWorksheet": "Werkblad (PDF)",
    "pdfAnswerKey": "Antwoordsleutel (PDF)",
    "interactiveWorksheetHtml": "Interactief werkblad (HTML)",
    "jpegImage": "JPEG-afbeelding",
    "grayscale": "Grijswaarden",
    "iframeEmbedTitle": "{deckTitle} — interactief werkblad van LessonCraftStudio",
    "celebrationMiniAlt": "Jouw voltooide werkblad"
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
    "embedAttributionKeyword": "fiches imprimables gratuites",
    "deckEndSuggestionsHeader": "Essaie l'un de ceux-ci ensuite :",
    "seoFreeInteractive": "Fiche interactive gratuite",
    "seoFor": "pour",
    "seoPrintOrPlayOnline": "Imprimer ou jouer en ligne",
    "worksheet": "Fiche",
    "runtimeCheckAnswers": "Vérifier les réponses",
    "runtimeTryAgain": "Réessayer",
    "runtimeAllCorrect": "Tout est correct !",
    "runtimeYouDidIt": "Bravo !",
    "runtimeDoAnother": "Faire une autre",
    "runtimePrintMyWorksheet": "Imprimer ma fiche",
    "runtimeMute": "Couper le son",
    "runtimeUnmute": "Activer le son",
    "runtimeCorrect": "correct",
    "runtimeScore": "{n} sur {total} correct",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "étoiles au premier essai",

    // Download UI v1
    "download": "Télécharger",
    "exportToCatalog": "Exporter vers le catalogue",
    "pdfWorksheet": "Fiche PDF",
    "pdfAnswerKey": "Corrigé (PDF)",
    "interactiveWorksheetHtml": "Fiche interactive (HTML)",
    "jpegImage": "Image JPEG",
    "grayscale": "Niveaux de gris",
    "iframeEmbedTitle": "{deckTitle} — fiche interactive de LessonCraftStudio",
    "celebrationMiniAlt": "Ta fiche d'exercices terminée"
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
    "embedAttributionKeyword": "schede stampabili gratuite",
    "deckEndSuggestionsHeader": "Prova uno di questi dopo:",
    "seoFreeInteractive": "Scheda interattiva gratuita",
    "seoFor": "per",
    "seoPrintOrPlayOnline": "Stampa o gioca online",
    "worksheet": "Scheda",
    "runtimeCheckAnswers": "Controlla risposte",
    "runtimeTryAgain": "Riprova",
    "runtimeAllCorrect": "Tutto corretto!",
    "runtimeYouDidIt": "Bravo!",
    "runtimeDoAnother": "Fai un'altra",
    "runtimePrintMyWorksheet": "Stampa la mia scheda",
    "runtimeMute": "Silenzia suoni",
    "runtimeUnmute": "Attiva suoni",
    "runtimeCorrect": "corretto",
    "runtimeScore": "{n} su {total} corretto",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "stelle al primo tentativo",

    // Download UI v1
    "download": "Scarica",
    "exportToCatalog": "Esporta nel catalogo",
    "pdfWorksheet": "Scheda PDF",
    "pdfAnswerKey": "Soluzioni (PDF)",
    "interactiveWorksheetHtml": "Scheda interattiva (HTML)",
    "jpegImage": "Immagine JPEG",
    "grayscale": "Scala di grigi",
    "iframeEmbedTitle": "{deckTitle} — scheda interattiva di LessonCraftStudio",
    "celebrationMiniAlt": "La tua scheda di esercizi completata"
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
    "embedAttributionKeyword": "atividades gratuitas para imprimir",
    "deckEndSuggestionsHeader": "Experimente um destes a seguir:",
    "seoFreeInteractive": "Atividade interativa gratuita",
    "seoFor": "para",
    "seoPrintOrPlayOnline": "Imprimir ou jogar online",
    "worksheet": "Atividade",
    "runtimeCheckAnswers": "Verificar respostas",
    "runtimeTryAgain": "Tentar de novo",
    "runtimeAllCorrect": "Tudo correto!",
    "runtimeYouDidIt": "Você conseguiu!",
    "runtimeDoAnother": "Fazer outra",
    "runtimePrintMyWorksheet": "Imprimir minha atividade",
    "runtimeMute": "Silenciar sons",
    "runtimeUnmute": "Ativar sons",
    "runtimeCorrect": "correto",
    "runtimeScore": "{n} de {total} correto",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "estrelas na primeira tentativa",

    // Download UI v1
    "download": "Baixar",
    "exportToCatalog": "Exportar para o catálogo",
    "pdfWorksheet": "Atividade PDF",
    "pdfAnswerKey": "Gabarito (PDF)",
    "interactiveWorksheetHtml": "Atividade interativa (HTML)",
    "jpegImage": "Imagem JPEG",
    "grayscale": "Escala de cinza",
    "iframeEmbedTitle": "{deckTitle} — ficha interativa do LessonCraftStudio",
    "celebrationMiniAlt": "Sua folha de exercícios concluída"
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
    "embedAttributionKeyword": "gratis utskrivbara arbetsblad",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "deckEndSuggestionsHeader": "Prova en av dessa härnäst:",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "seoFreeInteractive": "Gratis interaktivt",
    "seoFor": "för",
    "seoPrintOrPlayOnline": "Skriv ut eller spela online",
    "worksheet": "Övningsblad",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "runtimeCheckAnswers": "Kontrollera svar",
    "runtimeTryAgain": "Försök igen",
    "runtimeAllCorrect": "Allt rätt!",
    "runtimeYouDidIt": "Du klarade det!",
    "runtimeDoAnother": "Gör en till",
    "runtimePrintMyWorksheet": "Skriv ut mitt arbetsblad",
    "runtimeMute": "Stäng av ljud",
    "runtimeUnmute": "Slå på ljud",
    "runtimeCorrect": "rätt",
    "runtimeScore": "{n} av {total} rätt",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "stjärnor på första försöket",

    // Download UI v1 — NSR-flagged per §17.5.1 Nordic-tier review posture
    "download": "Ladda ner",
    "exportToCatalog": "Exportera till katalog",
    "pdfWorksheet": "PDF-arbetsblad",
    "pdfAnswerKey": "Facit (PDF)",
    "interactiveWorksheetHtml": "Interaktivt arbetsblad (HTML)",
    "jpegImage": "JPEG-bild",
    "grayscale": "Gråskala",
    "iframeEmbedTitle": "{deckTitle} — interaktivt arbetsblad från LessonCraftStudio",
    "celebrationMiniAlt": "Ditt klara arbetsblad"
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
    "embedAttributionKeyword": "gratis printbare arbejdsark",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "deckEndSuggestionsHeader": "Prøv en af disse næst:",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "seoFreeInteractive": "Gratis interaktivt",
    "seoFor": "for",
    "seoPrintOrPlayOnline": "Print eller spil online",
    "worksheet": "Opgaveark",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "runtimeCheckAnswers": "Kontroller svar",
    "runtimeTryAgain": "Prøv igen",
    "runtimeAllCorrect": "Alt rigtigt!",
    "runtimeYouDidIt": "Du klarede det!",
    "runtimeDoAnother": "Lav en til",
    "runtimePrintMyWorksheet": "Udskriv mit arbejdsark",
    "runtimeMute": "Slå lyd fra",
    "runtimeUnmute": "Slå lyd til",
    "runtimeCorrect": "rigtigt",
    "runtimeScore": "{n} ud af {total} rigtigt",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "stjerner i første forsøg",

    // Download UI v1 — NSR-flagged per §17.5.1 Nordic-tier review posture
    "download": "Download",
    "exportToCatalog": "Eksportér til katalog",
    "pdfWorksheet": "PDF-arbejdsark",
    "pdfAnswerKey": "Facitliste (PDF)",
    "interactiveWorksheetHtml": "Interaktivt arbejdsark (HTML)",
    "jpegImage": "JPEG-billede",
    "grayscale": "Gråtoner",
    "iframeEmbedTitle": "{deckTitle} — interaktivt arbejdsark fra LessonCraftStudio",
    "celebrationMiniAlt": "Dit færdige arbejdsark"
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
    "embedAttributionKeyword": "gratis utskrivbare arbeidsark",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "deckEndSuggestionsHeader": "Prøv en av disse neste:",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "seoFreeInteractive": "Gratis interaktivt",
    "seoFor": "for",
    "seoPrintOrPlayOnline": "Skriv ut eller spill på nett",
    "worksheet": "Oppgaveark",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "runtimeCheckAnswers": "Sjekk svar",
    "runtimeTryAgain": "Prøv igjen",
    "runtimeAllCorrect": "Alt riktig!",
    "runtimeYouDidIt": "Du klarte det!",
    "runtimeDoAnother": "Gjør en til",
    "runtimePrintMyWorksheet": "Skriv ut arbeidsarket",
    "runtimeMute": "Slå av lyd",
    "runtimeUnmute": "Slå på lyd",
    "runtimeCorrect": "riktig",
    "runtimeScore": "{n} av {total} riktig",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "stjerner på første forsøk",

    // Download UI v1 — NSR-flagged per §17.5.1 Nordic-tier review posture
    "download": "Last ned",
    "exportToCatalog": "Eksporter til katalog",
    "pdfWorksheet": "PDF-arbeidsark",
    "pdfAnswerKey": "Fasit (PDF)",
    "interactiveWorksheetHtml": "Interaktivt arbeidsark (HTML)",
    "jpegImage": "JPEG-bilde",
    "grayscale": "Gråtoner",
    "iframeEmbedTitle": "{deckTitle} — interaktivt arbeidsark fra LessonCraftStudio",
    "celebrationMiniAlt": "Ditt ferdige arbeidsark"
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
    "embedAttributionKeyword": "ilmaiset tulostettavat työarkit",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "deckEndSuggestionsHeader": "Kokeile yhtä näistä seuraavaksi:",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "seoFreeInteractive": "Ilmainen interaktiivinen",
    "seoFor": "tasolle",
    "seoPrintOrPlayOnline": "Tulosta tai pelaa verkossa",
    "worksheet": "Tehtävämoniste",
    // NSR-flagged per §17.5.1 Nordic-tier review posture
    "runtimeCheckAnswers": "Tarkista vastaukset",
    "runtimeTryAgain": "Yritä uudelleen",
    "runtimeAllCorrect": "Kaikki oikein!",
    "runtimeYouDidIt": "Sinä teit sen!",
    "runtimeDoAnother": "Tee toinen",
    "runtimePrintMyWorksheet": "Tulosta työarkkini",
    "runtimeMute": "Mykistä äänet",
    "runtimeUnmute": "Avaa äänet",
    "runtimeCorrect": "oikein",
    "runtimeScore": "{n}/{total} oikein",
    "runtimeProgressLabel": "{n} / {total}",
    "runtimeFirstTryStars": "tähteä ensimmäisellä yrityksellä",

    // Download UI v1 — NSR-flagged per §17.5.1 Nordic-tier review posture
    "download": "Lataa",
    "exportToCatalog": "Vie luetteloon",
    "pdfWorksheet": "PDF-työarkki",
    "pdfAnswerKey": "Vastaukset (PDF)",
    "interactiveWorksheetHtml": "Interaktiivinen työarkki (HTML)",
    "jpegImage": "JPEG-kuva",
    "grayscale": "Harmaasävy",
    "iframeEmbedTitle": "{deckTitle} — interaktiivinen tehtäväarkki LessonCraftStudio-palvelusta",
    "celebrationMiniAlt": "Valmis tehtäväarkkisi"
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
