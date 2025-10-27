// Writing App - Complete Multi-Language Translations
// Compiled from professional translation files
// Total: 103 unique translation keys across 11 languages
// Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI

const translations = {
  en: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Writing Worksheet Generator",
    "settings.title": "Writing Worksheet",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    // NOTE: MUST ADD LANGUAGE SELECTOR TO APP
    "settings.languageLabel": "Language:",
    "lang.en": "English",
    "lang.de": "Deutsch (German)",
    "lang.fr": "Français (French)",
    "lang.es": "Español (Spanish)",
    "lang.pt": "Português (Portuguese)",
    "lang.it": "Italiano (Italian)",
    "lang.nl": "Nederlands (Dutch)",
    "lang.sv": "Svenska (Swedish)",
    "lang.da": "Dansk (Danish)",
    "lang.no": "Norsk (Norwegian)",
    "lang.fi": "Suomi (Finnish)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Page Setup",
    "library.title": "Image Library",
    "library.uploadTitle": "Upload Custom Images",
    "settings.textTools": "Text Tools",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Page Size:",
    "pageSize.letterPortrait": "Letter Portrait (8.5×11\")",
    "pageSize.letterLandscape": "Letter Landscape (11×8.5\")",
    "pageSize.a4Portrait": "A4 Portrait (210×297mm)",
    "pageSize.a4Landscape": "A4 Landscape (297×210mm)",
    "pageSize.custom": "Custom",
    "settings.width": "Width (px):",
    "settings.height": "Height (px):",
    "decoration.backgroundTheme": "Background Theme:",
    "decoration.none": "None",
    "decoration.backgroundOpacity": "Background Opacity:",
    "decoration.borderTheme": "Border Theme:",
    "decoration.borderOpacity": "Border Opacity:",
    "decoration.background": "Background",
    "decoration.border": "Border",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Row {number}",
    "row.type": "Row Type:",
    "rowType.trace": "Trace",
    "rowType.fadingTrace": "Fading Trace",
    "rowType.guidedCopy": "Guided Copy",
    "rowType.fill": "Fill",
    "row.fontStyle": "Font Style:",
    "fontStyle.printRegular": "Print Regular",
    "fontStyle.printRegularArrow": "Print Regular Arrow",
    "fontStyle.printTracing": "Print Tracing",
    "fontStyle.printTracingArrow": "Print Tracing Arrow",
    "fontStyle.cursive": "Cursive",
    "row.content": "Content:",
    "content.empty": "Empty",
    "content.beginningLetter": "Beginning Letter",
    "content.wholeFileName": "Whole File Name",
    "content.customText": "Custom Text",
    "content.preWriting": "Pre-writing",
    "row.customTextPlaceholder": "Enter custom trace text here...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Case:",
    "case.uppercase": "Upper-case",
    "case.lowercase": "Lower-case",
    "case.titleCase": "Title Case",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Stroke Type:",
    "stroke.vertical": "Vertical Line",
    "stroke.horizontal": "Horizontal Line",
    "stroke.circle": "Circle",
    "stroke.zigzag": "Zig-Zag Line",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Image Mode:",
    "imageMode.exercise": "Exercise Image",
    "imageMode.custom": "Custom Images",
    "library.pickExercise": "Pick an exercise image (optional):",
    "library.allThemes": "All Themes",
    "library.searchPlaceholder": "Search images...",
    "library.selectedStatus": "Selected: {word}",
    "library.selectUpload": "Select image(s) to upload:",
    "library.chooseFiles": "Choose Files",
    "library.noFileChosen": "No file chosen",
    "library.filesSelected": "{x} file(s) selected",
    "library.uploadedImages": "Your Uploaded Images:",
    "button.unselectImage": "Unselect Image",
    "button.clearSelection": "Clear Selection",
    "button.addSelectedImage": "Add Selected Image",

    // ===== 9. TEXT TOOLS (10 items) =====
    "text.addNewTitle": "Add New Text",
    "text.content": "Content:",
    "text.placeholder": "New Text",
    "text.selectedProperties": "Selected Text Properties",
    "text.color": "Color:",
    "text.size": "Size:",
    "text.font": "Font:",
    "text.outlineColor": "Outline Color:",
    "text.outlineWidth": "Outline (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Bring Forward",
    "toolbar.sendBackward": "Send Backward",
    "toolbar.align": "Align",
    "toolbar.alignLeft": "Align Left",
    "toolbar.centerH": "Center Horizontally",
    "toolbar.alignRight": "Align Right",
    "toolbar.alignTop": "Align Top",
    "toolbar.centerV": "Center Vertically",
    "toolbar.alignBottom": "Align Bottom",
    "toolbar.centerPageH": "Center on Page Horizontally",
    "toolbar.centerPageV": "Center on Page Vertically",
    "toolbar.cropOverflow": "Crop Overflow",
    "toolbar.lock": "Lock",
    "toolbar.unlock": "Unlock",
    "toolbar.delete": "Delete",
    "toolbar.zoomIn": "Zoom In",
    "toolbar.zoomOut": "Zoom Out",
    "toolbar.resetZoom": "Reset Zoom",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Delete Row",
    "button.addRow": "Add Row",
    "button.addText": "Add Text to Worksheet",
    "button.deleteSelectedText": "Delete Selected Text",
    "button.download": "Download",
    "button.downloadPdf": "Download as PDF",
    "button.downloadJpeg": "Download as JPEG",
    "settings.grayscale": "Grayscale",
    "button.clearAll": "Clear All",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Row cropped successfully.",
    "message.worksheetCleared": "Worksheet cleared.",
    "message.pdfDownloaded": "PDF downloaded!",
    "message.jpegDownloaded": "JPEG download initiated!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Cropping is not supported for this row type.",
    "message.noContentToCrop": "This row has no content to crop.",
    "message.noOverflow": "No overflow to crop.",
    "message.generateContent": "Please generate content first.",
    "message.pdfError": "Error creating PDF.",
    "message.generateWorksheet": "Please generate a worksheet first.",
    "message.jpegError": "Error preparing JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (10 items) =====
    "message.selectBackgroundTheme": "Select a theme for backgrounds.",
    "message.selectBorderTheme": "Select a theme to see borders.",
    "message.noImages": "No images found. Select a theme or try a different search.",
    "message.themeLoadError": "Error loading {type} themes:",
    "message.selectTheme": "Select a theme.",
    "message.selectImageToInclude": "Please select an image to include.",
    "message.loading": "Loading...",
    "message.loadError": "Error loading {type}.",
    "message.preparingPdf": "Preparing PDF...",
    "message.preparingJpeg": "Preparing JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Are you sure you want to clear the worksheet? This cannot be undone.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "FREE VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "FREE VERSION",
  },

  de: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Schreibübungs-Generator",
    "settings.title": "Schreibübungsblatt",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Sprache:",
    "lang.en": "English (Englisch)",
    "lang.de": "Deutsch",
    "lang.fr": "Français (Französisch)",
    "lang.es": "Español (Spanisch)",
    "lang.pt": "Português (Portugiesisch)",
    "lang.it": "Italiano (Italienisch)",
    "lang.nl": "Nederlands (Niederländisch)",
    "lang.sv": "Svenska (Schwedisch)",
    "lang.da": "Dansk (Dänisch)",
    "lang.no": "Norsk (Norwegisch)",
    "lang.fi": "Suomi (Finnisch)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Seiteneinrichtung",
    "library.title": "Bilderbibliothek",
    "library.uploadTitle": "Eigene Bilder Hochladen",
    "settings.textTools": "Textbearbeitung",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Papierformat:",
    "pageSize.letterPortrait": "Letter Hochformat (8,5×11\")",
    "pageSize.letterLandscape": "Letter Querformat (11×8,5\")",
    "pageSize.a4Portrait": "A4 Hochformat (210×297mm)",
    "pageSize.a4Landscape": "A4 Querformat (297×210mm)",
    "pageSize.custom": "Benutzerdefiniert",
    "settings.width": "Breite (px):",
    "settings.height": "Höhe (px):",
    "decoration.backgroundTheme": "Hintergrundthema:",
    "decoration.none": "Keines",
    "decoration.backgroundOpacity": "Hintergrund-Deckkraft:",
    "decoration.borderTheme": "Rahmenthema:",
    "decoration.borderOpacity": "Rahmen-Deckkraft:",
    "decoration.background": "Hintergrund",
    "decoration.border": "Rahmen",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Zeile {number}",
    "row.type": "Zeilentyp:",
    "rowType.trace": "Nachspuren",
    "rowType.fadingTrace": "Verblassendes Nachspuren",
    "rowType.guidedCopy": "Geführtes Abschreiben",
    "rowType.fill": "Ausfüllen",
    "row.fontStyle": "Schriftstil:",
    "fontStyle.printRegular": "Druckschrift",
    "fontStyle.printRegularArrow": "Druckschrift mit Pfeilen",
    "fontStyle.printTracing": "Druckschrift zum Nachspuren",
    "fontStyle.printTracingArrow": "Druckschrift zum Nachspuren mit Pfeilen",
    "fontStyle.cursive": "Schreibschrift",
    "row.content": "Inhalt:",
    "content.empty": "Leer",
    "content.beginningLetter": "Anfangsbuchstabe",
    "content.wholeFileName": "Vollständiger Dateiname",
    "content.customText": "Eigener Text",
    "content.preWriting": "Schwungübungen",
    "row.customTextPlaceholder": "Eigenen Text zum Nachspuren eingeben...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Groß-/Kleinschreibung:",
    "case.uppercase": "Großbuchstaben",
    "case.lowercase": "Kleinbuchstaben",
    "case.titleCase": "Anfangsbuchstabe groß",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Strichtyp:",
    "stroke.vertical": "Senkrechte Linie",
    "stroke.horizontal": "Waagerechte Linie",
    "stroke.circle": "Kreis",
    "stroke.zigzag": "Zickzack-Linie",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Bildmodus:",
    "imageMode.exercise": "Übungsbild",
    "imageMode.custom": "Eigene Bilder",
    "library.pickExercise": "Übungsbild auswählen (optional):",
    "library.allThemes": "Alle Themen",
    "library.searchPlaceholder": "Bilder suchen...",
    "library.selectedStatus": "Ausgewählt: {word}",
    "library.selectUpload": "Bild(er) zum Hochladen auswählen:",
    "library.chooseFiles": "Dateien auswählen",
    "library.noFileChosen": "Keine Datei ausgewählt",
    "library.filesSelected": "{x} Datei(en) ausgewählt",
    "library.uploadedImages": "Ihre hochgeladenen Bilder:",
    "button.unselectImage": "Auswahl aufheben",
    "button.clearSelection": "Auswahl löschen",
    "button.addSelectedImage": "Ausgewähltes Bild hinzufügen",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Neuen Text hinzufügen",
    "text.content": "Inhalt:",
    "text.placeholder": "Neuer Text",
    "text.selectedProperties": "Eigenschaften des ausgewählten Textes",
    "text.color": "Farbe:",
    "text.size": "Größe:",
    "text.font": "Schriftart:",
    "text.outlineColor": "Umrissfarbe:",
    "text.outlineWidth": "Umriss (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Nach vorne",
    "toolbar.sendBackward": "Nach hinten",
    "toolbar.align": "Ausrichten",
    "toolbar.alignLeft": "Links ausrichten",
    "toolbar.centerH": "Horizontal zentrieren",
    "toolbar.alignRight": "Rechts ausrichten",
    "toolbar.alignTop": "Oben ausrichten",
    "toolbar.centerV": "Vertikal zentrieren",
    "toolbar.alignBottom": "Unten ausrichten",
    "toolbar.centerPageH": "Auf Seite horizontal zentrieren",
    "toolbar.centerPageV": "Auf Seite vertikal zentrieren",
    "toolbar.cropOverflow": "Überlauf abschneiden",
    "toolbar.lock": "Sperren",
    "toolbar.unlock": "Entsperren",
    "toolbar.delete": "Löschen",
    "toolbar.zoomIn": "Vergrößern",
    "toolbar.zoomOut": "Verkleinern",
    "toolbar.resetZoom": "Zoom zurücksetzen",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Zeile löschen",
    "button.addRow": "Zeile hinzufügen",
    "button.addText": "Text zum Arbeitsblatt hinzufügen",
    "button.deleteSelectedText": "Ausgewählten Text löschen",
    "button.download": "Herunterladen",
    "button.downloadPdf": "Als PDF herunterladen",
    "button.downloadJpeg": "Als JPEG herunterladen",
    "settings.grayscale": "Graustufen",
    "button.clearAll": "Alles zurücksetzen",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Zeile erfolgreich zugeschnitten.",
    "message.worksheetCleared": "Arbeitsblatt gelöscht.",
    "message.pdfDownloaded": "PDF heruntergeladen!",
    "message.jpegDownloaded": "JPEG-Download gestartet!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Zuschneiden wird für diesen Zeilentyp nicht unterstützt.",
    "message.noContentToCrop": "Diese Zeile hat keinen Inhalt zum Zuschneiden.",
    "message.noOverflow": "Kein Überlauf zum Abschneiden vorhanden.",
    "message.generateContent": "Bitte erst Inhalt erstellen.",
    "message.pdfError": "Fehler beim Erstellen der PDF.",
    "message.generateWorksheet": "Bitte erst ein Arbeitsblatt erstellen.",
    "message.jpegError": "Fehler beim Vorbereiten des JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (10 items) =====
    "message.selectBackgroundTheme": "Wählen Sie ein Thema für Hintergründe.",
    "message.selectBorderTheme": "Wählen Sie ein Thema für Rahmen.",
    "message.noImages": "Keine Bilder gefunden. Wählen Sie ein Thema oder versuchen Sie eine andere Suche.",
    "message.themeLoadError": "Fehler beim Laden der {type}-Themen:",
    "message.selectTheme": "Wählen Sie ein Thema.",
    "message.selectImageToInclude": "Bitte wählen Sie ein Bild zum Einfügen aus.",
    "message.loading": "Lädt...",
    "message.loadError": "Fehler beim Laden von {type}.",
    "message.preparingPdf": "PDF wird vorbereitet...",
    "message.preparingJpeg": "JPEG wird vorbereitet...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Möchten Sie das Arbeitsblatt wirklich löschen? Dies kann nicht rückgängig gemacht werden.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "KOSTENLOSE VERSION",
  },

  fr: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Générateur d'Exercices d'Écriture",
    "settings.title": "Feuille d'Exercices d'Écriture",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Langue :",
    "lang.en": "English (Anglais)",
    "lang.de": "Deutsch (Allemand)",
    "lang.fr": "Français",
    "lang.es": "Español (Espagnol)",
    "lang.pt": "Português (Portugais)",
    "lang.it": "Italiano (Italien)",
    "lang.nl": "Nederlands (Néerlandais)",
    "lang.sv": "Svenska (Suédois)",
    "lang.da": "Dansk (Danois)",
    "lang.no": "Norsk (Norvégien)",
    "lang.fi": "Suomi (Finnois)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Configuration de la Page",
    "library.title": "Bibliothèque d'Images",
    "library.uploadTitle": "Télécharger Vos Images",
    "settings.textTools": "Options de texte",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Format de Page :",
    "pageSize.letterPortrait": "Letter Portrait (8,5×11\")",
    "pageSize.letterLandscape": "Letter Paysage (11×8,5\")",
    "pageSize.a4Portrait": "A4 Portrait (210×297mm)",
    "pageSize.a4Landscape": "A4 Paysage (297×210mm)",
    "pageSize.custom": "Personnalisé",
    "settings.width": "Largeur (px) :",
    "settings.height": "Hauteur (px) :",
    "decoration.backgroundTheme": "Thème de Fond :",
    "decoration.none": "Aucun",
    "decoration.backgroundOpacity": "Opacité du Fond :",
    "decoration.borderTheme": "Thème de Bordure :",
    "decoration.borderOpacity": "Opacité de la Bordure :",
    "decoration.background": "Arrière-plan",
    "decoration.border": "Bordure",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Ligne {number}",
    "row.type": "Type de Ligne :",
    "rowType.trace": "Tracer",
    "rowType.fadingTrace": "Tracé Progressif",
    "rowType.guidedCopy": "Copie Guidée",
    "rowType.fill": "Compléter",
    "row.fontStyle": "Style d'Écriture :",
    "fontStyle.printRegular": "Écriture Script",
    "fontStyle.printRegularArrow": "Écriture Script avec Flèches",
    "fontStyle.printTracing": "Script à Tracer",
    "fontStyle.printTracingArrow": "Script à Tracer avec Flèches",
    "fontStyle.cursive": "Écriture Cursive",
    "row.content": "Contenu :",
    "content.empty": "Vide",
    "content.beginningLetter": "Lettre Initiale",
    "content.wholeFileName": "Nom Complet du Fichier",
    "content.customText": "Texte Personnalisé",
    "content.preWriting": "Graphisme",
    "row.customTextPlaceholder": "Entrez le texte à tracer...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Casse :",
    "case.uppercase": "Majuscules",
    "case.lowercase": "Minuscules",
    "case.titleCase": "Première Lettre en Majuscule",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Type de Trait :",
    "stroke.vertical": "Ligne Verticale",
    "stroke.horizontal": "Ligne Horizontale",
    "stroke.circle": "Cercle",
    "stroke.zigzag": "Ligne Zigzag",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Mode Image :",
    "imageMode.exercise": "Image d'Exercice",
    "imageMode.custom": "Images Personnalisées",
    "library.pickExercise": "Choisir une image d'exercice (optionnel) :",
    "library.allThemes": "Tous les Thèmes",
    "library.searchPlaceholder": "Rechercher des images...",
    "library.selectedStatus": "Sélectionné : {word}",
    "library.selectUpload": "Sélectionner image(s) à télécharger :",
    "library.chooseFiles": "Choisir des fichiers",
    "library.noFileChosen": "Aucun fichier choisi",
    "library.filesSelected": "{x} fichier(s) sélectionné(s)",
    "library.uploadedImages": "Vos Images Téléchargées :",
    "button.unselectImage": "Désélectionner l'Image",
    "button.clearSelection": "Effacer la Sélection",
    "button.addSelectedImage": "Ajouter l'Image Sélectionnée",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Ajouter un Nouveau Texte",
    "text.content": "Contenu :",
    "text.placeholder": "Nouveau Texte",
    "text.selectedProperties": "Propriétés du Texte Sélectionné",
    "text.color": "Couleur :",
    "text.size": "Taille :",
    "text.font": "Police :",
    "text.outlineColor": "Couleur du Contour :",
    "text.outlineWidth": "Contour (0-10) :",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Mettre au Premier Plan",
    "toolbar.sendBackward": "Mettre à l'Arrière-Plan",
    "toolbar.align": "Aligner",
    "toolbar.alignLeft": "Aligner à Gauche",
    "toolbar.centerH": "Centrer Horizontalement",
    "toolbar.alignRight": "Aligner à Droite",
    "toolbar.alignTop": "Aligner en Haut",
    "toolbar.centerV": "Centrer Verticalement",
    "toolbar.alignBottom": "Aligner en Bas",
    "toolbar.centerPageH": "Centrer sur la Page Horizontalement",
    "toolbar.centerPageV": "Centrer sur la Page Verticalement",
    "toolbar.cropOverflow": "Recadrer le Débordement",
    "toolbar.lock": "Verrouiller",
    "toolbar.unlock": "Déverrouiller",
    "toolbar.delete": "Supprimer",
    "toolbar.zoomIn": "Zoomer",
    "toolbar.zoomOut": "Dézoomer",
    "toolbar.resetZoom": "Réinitialiser le Zoom",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Supprimer la Ligne",
    "button.addRow": "Ajouter une Ligne",
    "button.addText": "Ajouter du Texte à la Feuille",
    "button.deleteSelectedText": "Supprimer le Texte Sélectionné",
    "button.download": "Télécharger",
    "button.downloadPdf": "Télécharger en PDF",
    "button.downloadJpeg": "Télécharger en JPEG",
    "settings.grayscale": "Niveaux de Gris",
    "button.clearAll": "Tout Effacer",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Ligne recadrée avec succès.",
    "message.worksheetCleared": "Feuille d'exercices effacée.",
    "message.pdfDownloaded": "PDF téléchargé !",
    "message.jpegDownloaded": "Téléchargement JPEG lancé !",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Le recadrage n'est pas pris en charge pour ce type de ligne.",
    "message.noContentToCrop": "Cette ligne n'a pas de contenu à recadrer.",
    "message.noOverflow": "Aucun débordement à recadrer.",
    "message.generateContent": "Veuillez d'abord générer du contenu.",
    "message.pdfError": "Erreur lors de la création du PDF.",
    "message.generateWorksheet": "Veuillez d'abord générer une feuille d'exercices.",
    "message.jpegError": "Erreur lors de la préparation du JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (10 items) =====
    "message.selectBackgroundTheme": "Sélectionnez un thème pour les fonds.",
    "message.selectBorderTheme": "Sélectionnez un thème pour les bordures.",
    "message.noImages": "Aucune image trouvée. Sélectionnez un thème ou essayez une autre recherche.",
    "message.themeLoadError": "Erreur lors du chargement des thèmes {type} :",
    "message.selectTheme": "Sélectionnez un thème.",
    "message.selectImageToInclude": "Veuillez sélectionner une image à inclure.",
    "message.loading": "Chargement...",
    "message.loadError": "Erreur lors du chargement de {type}.",
    "message.preparingPdf": "Préparation du PDF...",
    "message.preparingJpeg": "Préparation du JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Êtes-vous sûr de vouloir effacer la feuille d'exercices ? Cette action ne peut pas être annulée.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "VERSION GRATUITE - LessonCraftStudio.com",
    "watermark.freeShort": "VERSION GRATUITE",
  },

  es: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Generador de Ejercicios de Escritura",
    "settings.title": "Hoja de Ejercicios de Escritura",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Idioma:",
    "lang.en": "English (Inglés)",
    "lang.de": "Deutsch (Alemán)",
    "lang.fr": "Français (Francés)",
    "lang.es": "Español",
    "lang.pt": "Português (Portugués)",
    "lang.it": "Italiano",
    "lang.nl": "Nederlands (Holandés)",
    "lang.sv": "Svenska (Sueco)",
    "lang.da": "Dansk (Danés)",
    "lang.no": "Norsk (Noruego)",
    "lang.fi": "Suomi (Finés)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Configuración de Página",
    "library.title": "Biblioteca de Imágenes",
    "library.uploadTitle": "Subir Imágenes Propias",
    "settings.textTools": "Opciones de texto",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Tamaño de Página:",
    "pageSize.letterPortrait": "Carta Vertical (8,5×11\")",
    "pageSize.letterLandscape": "Carta Horizontal (11×8,5\")",
    "pageSize.a4Portrait": "A4 Vertical (210×297mm)",
    "pageSize.a4Landscape": "A4 Horizontal (297×210mm)",
    "pageSize.custom": "Personalizado",
    "settings.width": "Ancho (px):",
    "settings.height": "Alto (px):",
    "decoration.backgroundTheme": "Tema de Fondo:",
    "decoration.none": "Ninguno",
    "decoration.backgroundOpacity": "Opacidad del Fondo:",
    "decoration.borderTheme": "Tema del Marco:",
    "decoration.borderOpacity": "Opacidad del Marco:",
    "decoration.background": "Fondo",
    "decoration.border": "Borde",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Línea {number}",
    "row.type": "Tipo de Línea:",
    "rowType.trace": "Trazar",
    "rowType.fadingTrace": "Trazo Progresivo",
    "rowType.guidedCopy": "Copia Guiada",
    "rowType.fill": "Completar",
    "row.fontStyle": "Estilo de Letra:",
    "fontStyle.printRegular": "Letra de Imprenta",
    "fontStyle.printRegularArrow": "Letra de Imprenta con Flechas",
    "fontStyle.printTracing": "Imprenta para Trazar",
    "fontStyle.printTracingArrow": "Imprenta para Trazar con Flechas",
    "fontStyle.cursive": "Letra Cursiva",
    "row.content": "Contenido:",
    "content.empty": "Vacío",
    "content.beginningLetter": "Letra Inicial",
    "content.wholeFileName": "Nombre Completo del Archivo",
    "content.customText": "Texto Personalizado",
    "content.preWriting": "Grafomotricidad",
    "row.customTextPlaceholder": "Ingrese el texto para trazar...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Tipo de Letra:",
    "case.uppercase": "Mayúsculas",
    "case.lowercase": "Minúsculas",
    "case.titleCase": "Primera Letra en Mayúscula",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Tipo de Trazo:",
    "stroke.vertical": "Línea Vertical",
    "stroke.horizontal": "Línea Horizontal",
    "stroke.circle": "Círculo",
    "stroke.zigzag": "Línea en Zigzag",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Modo de Imagen:",
    "imageMode.exercise": "Imagen de Ejercicio",
    "imageMode.custom": "Imágenes Personalizadas",
    "library.pickExercise": "Elegir una imagen de ejercicio (opcional):",
    "library.allThemes": "Todos los Temas",
    "library.searchPlaceholder": "Buscar imágenes...",
    "library.selectedStatus": "Seleccionado: {word}",
    "library.selectUpload": "Seleccionar imagen(es) para subir:",
    "library.chooseFiles": "Elegir archivos",
    "library.noFileChosen": "Ningún archivo elegido",
    "library.filesSelected": "{x} archivo(s) seleccionado(s)",
    "library.uploadedImages": "Sus Imágenes Subidas:",
    "button.unselectImage": "Deseleccionar Imagen",
    "button.clearSelection": "Limpiar Selección",
    "button.addSelectedImage": "Añadir Imagen Seleccionada",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Añadir Nuevo Texto",
    "text.content": "Contenido:",
    "text.placeholder": "Texto Nuevo",
    "text.selectedProperties": "Propiedades del Texto Seleccionado",
    "text.color": "Color:",
    "text.size": "Tamaño:",
    "text.font": "Fuente:",
    "text.outlineColor": "Color del Contorno:",
    "text.outlineWidth": "Contorno (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Traer al Frente",
    "toolbar.sendBackward": "Enviar Atrás",
    "toolbar.align": "Alinear",
    "toolbar.alignLeft": "Alinear a la Izquierda",
    "toolbar.centerH": "Centrar Horizontalmente",
    "toolbar.alignRight": "Alinear a la Derecha",
    "toolbar.alignTop": "Alinear Arriba",
    "toolbar.centerV": "Centrar Verticalmente",
    "toolbar.alignBottom": "Alinear Abajo",
    "toolbar.centerPageH": "Centrar en la Página Horizontalmente",
    "toolbar.centerPageV": "Centrar en la Página Verticalmente",
    "toolbar.cropOverflow": "Recortar Desbordamiento",
    "toolbar.lock": "Bloquear",
    "toolbar.unlock": "Desbloquear",
    "toolbar.delete": "Eliminar",
    "toolbar.zoomIn": "Acercar",
    "toolbar.zoomOut": "Alejar",
    "toolbar.resetZoom": "Restablecer Zoom",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Eliminar Línea",
    "button.addRow": "Añadir Línea",
    "button.addText": "Añadir Texto a la Hoja",
    "button.deleteSelectedText": "Eliminar Texto Seleccionado",
    "button.download": "Descargar",
    "button.downloadPdf": "Descargar como PDF",
    "button.downloadJpeg": "Descargar como JPEG",
    "settings.grayscale": "Escala de Grises",
    "button.clearAll": "Borrar Todo",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Línea recortada con éxito.",
    "message.worksheetCleared": "Hoja de ejercicios borrada.",
    "message.pdfDownloaded": "¡PDF descargado!",
    "message.jpegDownloaded": "¡Descarga JPEG iniciada!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "El recorte no está disponible para este tipo de línea.",
    "message.noContentToCrop": "Esta línea no tiene contenido para recortar.",
    "message.noOverflow": "No hay desbordamiento para recortar.",
    "message.generateContent": "Por favor, primero genere contenido.",
    "message.pdfError": "Error al crear el PDF.",
    "message.generateWorksheet": "Por favor, primero genere una hoja de ejercicios.",
    "message.jpegError": "Error al preparar el JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (10 items) =====
    "message.selectBackgroundTheme": "Seleccione un tema para los fondos.",
    "message.selectBorderTheme": "Seleccione un tema para los marcos.",
    "message.noImages": "No se encontraron imágenes. Seleccione un tema o intente otra búsqueda.",
    "message.themeLoadError": "Error al cargar los temas de {type}:",
    "message.selectTheme": "Seleccione un tema.",
    "message.selectImageToInclude": "Por favor, seleccione una imagen para incluir.",
    "message.loading": "Cargando...",
    "message.loadError": "Error al cargar {type}.",
    "message.preparingPdf": "Preparando PDF...",
    "message.preparingJpeg": "Preparando JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "¿Está seguro de que desea borrar la hoja de ejercicios? Esta acción no se puede deshacer.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "VERSIÓN GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIÓN GRATUITA",
  },

  it: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Creatore di Schede di Scrittura",
    "settings.title": "Scheda di Scrittura",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Lingua:",
    "lang.en": "English (Inglese)",
    "lang.de": "Deutsch (Tedesco)",
    "lang.fr": "Français (Francese)",
    "lang.es": "Español (Spagnolo)",
    "lang.pt": "Português (Portoghese)",
    "lang.it": "Italiano",
    "lang.nl": "Nederlands (Olandese)",
    "lang.sv": "Svenska (Svedese)",
    "lang.da": "Dansk (Danese)",
    "lang.no": "Norsk (Norvegese)",
    "lang.fi": "Suomi (Finlandese)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Impostazione Pagina",
    "library.title": "Raccolta Immagini",
    "library.uploadTitle": "Carica le Tue Immagini",
    "settings.textTools": "Opzioni di testo",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Formato Pagina:",
    "pageSize.letterPortrait": "Letter Verticale (8,5×11\")",
    "pageSize.letterLandscape": "Letter Orizzontale (11×8,5\")",
    "pageSize.a4Portrait": "A4 Verticale (210×297mm)",
    "pageSize.a4Landscape": "A4 Orizzontale (297×210mm)",
    "pageSize.custom": "Personalizzato",
    "settings.width": "Larghezza (px):",
    "settings.height": "Altezza (px):",
    "decoration.backgroundTheme": "Tema Sfondo:",
    "decoration.none": "Nessuno",
    "decoration.backgroundOpacity": "Opacità Sfondo:",
    "decoration.borderTheme": "Tema Cornice:",
    "decoration.borderOpacity": "Opacità Cornice:",
    "decoration.background": "Sfondo",
    "decoration.border": "Bordo",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Riga {number}",
    "row.type": "Tipo di Riga:",
    "rowType.trace": "Ricalco",
    "rowType.fadingTrace": "Ricalco Sfumato",
    "rowType.guidedCopy": "Copia Guidata",
    "rowType.fill": "Completamento",
    "row.fontStyle": "Stile di Scrittura:",
    "fontStyle.printRegular": "Stampatello",
    "fontStyle.printRegularArrow": "Stampatello con Frecce",
    "fontStyle.printTracing": "Stampatello da Ricalcare",
    "fontStyle.printTracingArrow": "Stampatello da Ricalcare con Frecce",
    "fontStyle.cursive": "Corsivo",
    "row.content": "Contenuto:",
    "content.empty": "Vuoto",
    "content.beginningLetter": "Lettera Iniziale",
    "content.wholeFileName": "Nome Completo del File",
    "content.customText": "Testo Personalizzato",
    "content.preWriting": "Pregrafismo",
    "row.customTextPlaceholder": "Inserisci il testo da ricalcare...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Tipo di Carattere:",
    "case.uppercase": "Maiuscolo",
    "case.lowercase": "Minuscolo",
    "case.titleCase": "Iniziale Maiuscola",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Tipo di Tracciato:",
    "stroke.vertical": "Linea Verticale",
    "stroke.horizontal": "Linea Orizzontale",
    "stroke.circle": "Cerchio",
    "stroke.zigzag": "Linea a Zigzag",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Modalità Immagine:",
    "imageMode.exercise": "Immagine di Esercizio",
    "imageMode.custom": "Immagini Personalizzate",
    "library.pickExercise": "Scegli un'immagine di esercizio (opzionale):",
    "library.searchPlaceholder": "Cerca immagini...",
    "library.selectedStatus": "Selezionato: {word}",
    "library.selectUpload": "Seleziona immagine/i da caricare:",
    "library.uploadedImages": "Le Tue Immagini Caricate:",
    "button.unselectImage": "Deseleziona Immagine",
    "button.clearSelection": "Cancella Selezione",
    "button.addSelectedImage": "Aggiungi Immagine Selezionata",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Aggiungi Nuovo Testo",
    "text.content": "Contenuto:",
    "text.placeholder": "Nuovo Testo",
    "text.selectedProperties": "Proprietà del Testo Selezionato",
    "text.color": "Colore:",
    "text.size": "Dimensione:",
    "text.font": "Carattere:",
    "text.outlineColor": "Colore Contorno:",
    "text.outlineWidth": "Contorno (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Porta Avanti",
    "toolbar.sendBackward": "Porta Indietro",
    "toolbar.align": "Allinea",
    "toolbar.alignLeft": "Allinea a Sinistra",
    "toolbar.centerH": "Centra Orizzontalmente",
    "toolbar.alignRight": "Allinea a Destra",
    "toolbar.alignTop": "Allinea in Alto",
    "toolbar.centerV": "Centra Verticalmente",
    "toolbar.alignBottom": "Allinea in Basso",
    "toolbar.centerPageH": "Centra sulla Pagina Orizzontalmente",
    "toolbar.centerPageV": "Centra sulla Pagina Verticalmente",
    "toolbar.cropOverflow": "Ritaglia Eccedenza",
    "toolbar.lock": "Blocca",
    "toolbar.unlock": "Sblocca",
    "toolbar.delete": "Elimina",
    "toolbar.zoomIn": "Ingrandisci",
    "toolbar.zoomOut": "Riduci",
    "toolbar.resetZoom": "Ripristina Zoom",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Elimina Riga",
    "button.addRow": "Aggiungi Riga",
    "button.addText": "Aggiungi Testo alla Scheda",
    "button.deleteSelectedText": "Elimina Testo Selezionato",
    "button.download": "Scarica",
    "button.downloadPdf": "Scarica come PDF",
    "button.downloadJpeg": "Scarica come JPEG",
    "settings.grayscale": "Scala di Grigi",
    "button.clearAll": "Cancella Tutto",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Riga ritagliata con successo.",
    "message.worksheetCleared": "Scheda cancellata.",
    "message.pdfDownloaded": "PDF scaricato!",
    "message.jpegDownloaded": "Download JPEG avviato!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Il ritaglio non è supportato per questo tipo di riga.",
    "message.noContentToCrop": "Questa riga non ha contenuto da ritagliare.",
    "message.noOverflow": "Nessuna eccedenza da ritagliare.",
    "message.generateContent": "Per favore, crea prima il contenuto.",
    "message.pdfError": "Errore nella creazione del PDF.",
    "message.generateWorksheet": "Per favore, crea prima una scheda.",
    "message.jpegError": "Errore nella preparazione del JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (10 items) =====
    "message.selectBackgroundTheme": "Seleziona un tema per gli sfondi.",
    "message.selectBorderTheme": "Seleziona un tema per le cornici.",
    "message.noImages": "Nessuna immagine trovata. Seleziona un tema o prova un'altra ricerca.",
    "message.themeLoadError": "Errore nel caricamento dei temi {type}:",
    "message.selectTheme": "Seleziona un tema.",
    "message.loading": "Caricamento...",
    "message.loadError": "Errore nel caricamento di {type}.",
    "message.preparingPdf": "Preparazione PDF...",
    "message.preparingJpeg": "Preparazione JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Sei sicuro di voler cancellare la scheda? Questa azione non può essere annullata.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "VERSIONE GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIONE GRATUITA",
  },

  pt: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Gerador de Fichas de Caligrafia",
    "settings.title": "Ficha de Caligrafia",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Idioma:",
    "lang.en": "English (Inglês)",
    "lang.de": "Deutsch (Alemão)",
    "lang.fr": "Français (Francês)",
    "lang.es": "Español (Espanhol)",
    "lang.pt": "Português",
    "lang.it": "Italiano",
    "lang.nl": "Nederlands (Holandês)",
    "lang.sv": "Svenska (Sueco)",
    "lang.da": "Dansk (Dinamarquês)",
    "lang.no": "Norsk (Norueguês)",
    "lang.fi": "Suomi (Finlandês)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Configuração da Página",
    "library.title": "Biblioteca de Imagens",
    "library.uploadTitle": "Carregar Imagens Personalizadas",
    "settings.textTools": "Opções de texto",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Tamanho da Página:",
    "pageSize.letterPortrait": "Carta Vertical (8,5×11\")",
    "pageSize.letterLandscape": "Carta Horizontal (11×8,5\")",
    "pageSize.a4Portrait": "A4 Vertical (210×297mm)",
    "pageSize.a4Landscape": "A4 Horizontal (297×210mm)",
    "pageSize.custom": "Personalizado",
    "settings.width": "Largura (px):",
    "settings.height": "Altura (px):",
    "decoration.backgroundTheme": "Tema de Fundo:",
    "decoration.none": "Nenhum",
    "decoration.backgroundOpacity": "Opacidade do Fundo:",
    "decoration.borderTheme": "Tema de Moldura:",
    "decoration.borderOpacity": "Opacidade da Moldura:",
    "decoration.background": "Fundo",
    "decoration.border": "Borda",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Linha {number}",
    "row.type": "Tipo de Linha:",
    "rowType.trace": "Traçar",
    "rowType.fadingTrace": "Traço Progressivo",
    "rowType.guidedCopy": "Cópia Orientada",
    "rowType.fill": "Preencher",
    "row.fontStyle": "Estilo de Letra:",
    "fontStyle.printRegular": "Letra de Imprensa",
    "fontStyle.printRegularArrow": "Letra de Imprensa com Setas",
    "fontStyle.printTracing": "Imprensa para Traçar",
    "fontStyle.printTracingArrow": "Imprensa para Traçar com Setas",
    "fontStyle.cursive": "Letra Cursiva",
    "row.content": "Conteúdo:",
    "content.empty": "Vazio",
    "content.beginningLetter": "Letra Inicial",
    "content.wholeFileName": "Nome Completo do Ficheiro",
    "content.customText": "Texto Personalizado",
    "content.preWriting": "Grafismo",
    "row.customTextPlaceholder": "Introduza o texto para traçar...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Tipo de Letra:",
    "case.uppercase": "Maiúsculas",
    "case.lowercase": "Minúsculas",
    "case.titleCase": "Inicial Maiúscula",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Tipo de Traço:",
    "stroke.vertical": "Linha Vertical",
    "stroke.horizontal": "Linha Horizontal",
    "stroke.circle": "Círculo",
    "stroke.zigzag": "Linha em Ziguezague",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Modo de Imagem:",
    "imageMode.exercise": "Imagem de Exercício",
    "imageMode.custom": "Imagens Personalizadas",
    "library.pickExercise": "Escolha uma imagem de exercício (opcional):",
    "library.searchPlaceholder": "Pesquisar imagens...",
    "library.selectedStatus": "Selecionado: {word}",
    "library.selectUpload": "Selecionar imagem(ns) para carregar:",
    "library.uploadedImages": "As Suas Imagens Carregadas:",
    "button.unselectImage": "Desselecionar Imagem",
    "button.clearSelection": "Limpar Seleção",
    "button.addSelectedImage": "Adicionar Imagem Selecionada",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Adicionar Novo Texto",
    "text.content": "Conteúdo:",
    "text.placeholder": "Texto Novo",
    "text.selectedProperties": "Propriedades do Texto Selecionado",
    "text.color": "Cor:",
    "text.size": "Tamanho:",
    "text.font": "Tipo de Letra:",
    "text.outlineColor": "Cor do Contorno:",
    "text.outlineWidth": "Contorno (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Trazer para a Frente",
    "toolbar.sendBackward": "Enviar para Trás",
    "toolbar.align": "Alinhar",
    "toolbar.alignLeft": "Alinhar à Esquerda",
    "toolbar.centerH": "Centrar Horizontalmente",
    "toolbar.alignRight": "Alinhar à Direita",
    "toolbar.alignTop": "Alinhar ao Topo",
    "toolbar.centerV": "Centrar Verticalmente",
    "toolbar.alignBottom": "Alinhar à Base",
    "toolbar.centerPageH": "Centrar na Página Horizontalmente",
    "toolbar.centerPageV": "Centrar na Página Verticalmente",
    "toolbar.cropOverflow": "Recortar Excesso",
    "toolbar.lock": "Bloquear",
    "toolbar.unlock": "Desbloquear",
    "toolbar.delete": "Eliminar",
    "toolbar.zoomIn": "Ampliar",
    "toolbar.zoomOut": "Reduzir",
    "toolbar.resetZoom": "Redefinir Zoom",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Eliminar Linha",
    "button.addRow": "Adicionar Linha",
    "button.addText": "Adicionar Texto à Ficha",
    "button.deleteSelectedText": "Eliminar Texto Selecionado",
    "button.download": "Transferir",
    "button.downloadPdf": "Transferir como PDF",
    "button.downloadJpeg": "Transferir como JPEG",
    "settings.grayscale": "Escala de Cinzentos",
    "button.clearAll": "Limpar Tudo",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Linha recortada com sucesso.",
    "message.worksheetCleared": "Ficha limpa.",
    "message.pdfDownloaded": "PDF transferido!",
    "message.jpegDownloaded": "Transferência JPEG iniciada!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "O recorte não é suportado para este tipo de linha.",
    "message.noContentToCrop": "Esta linha não tem conteúdo para recortar.",
    "message.noOverflow": "Não há excesso para recortar.",
    "message.generateContent": "Por favor, gere primeiro o conteúdo.",
    "message.pdfError": "Erro ao criar o PDF.",
    "message.generateWorksheet": "Por favor, gere primeiro uma ficha.",
    "message.jpegError": "Erro ao preparar o JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (10 items) =====
    "message.selectBackgroundTheme": "Selecione um tema para os fundos.",
    "message.selectBorderTheme": "Selecione um tema para as molduras.",
    "message.noImages": "Nenhuma imagem encontrada. Selecione um tema ou tente outra pesquisa.",
    "message.themeLoadError": "Erro ao carregar os temas de {type}:",
    "message.selectTheme": "Selecione um tema.",
    "message.loading": "A carregar...",
    "message.loadError": "Erro ao carregar {type}.",
    "message.preparingPdf": "A preparar PDF...",
    "message.preparingJpeg": "A preparar JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Tem a certeza de que deseja limpar a ficha? Esta ação não pode ser anulada.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "VERSÃO GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSÃO GRATUITA",
    "library.allThemes": "Todos os Temas",
    "library.chooseFiles": "Escolher arquivos",
    "library.noFileChosen": "Nenhum arquivo escolhido",
    "library.filesSelected": "{x} arquivo(s) selecionado(s)",
    "message.selectImageToInclude": "Por favor, selecione uma imagem para incluir.",
  },

  nl: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Schrijfoefeningen Generator",
    "settings.title": "Schrijfwerkblad",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Taal:",
    "lang.en": "English (Engels)",
    "lang.de": "Deutsch (Duits)",
    "lang.fr": "Français (Frans)",
    "lang.es": "Español (Spaans)",
    "lang.pt": "Português (Portugees)",
    "lang.it": "Italiano (Italiaans)",
    "lang.nl": "Nederlands",
    "lang.sv": "Svenska (Zweeds)",
    "lang.da": "Dansk (Deens)",
    "lang.no": "Norsk (Noors)",
    "lang.fi": "Suomi (Fins)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Pagina-instellingen",
    "library.title": "Afbeeldingen Bibliotheek",
    "library.uploadTitle": "Eigen Afbeeldingen Uploaden",
    "settings.textTools": "Tekstopties",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Paginaformaat:",
    "pageSize.letterPortrait": "Letter Staand (8,5×11\")",
    "pageSize.letterLandscape": "Letter Liggend (11×8,5\")",
    "pageSize.a4Portrait": "A4 Staand (210×297mm)",
    "pageSize.a4Landscape": "A4 Liggend (297×210mm)",
    "pageSize.custom": "Aangepast",
    "settings.width": "Breedte (px):",
    "settings.height": "Hoogte (px):",
    "decoration.backgroundTheme": "Achtergrondthema:",
    "decoration.none": "Geen",
    "decoration.backgroundOpacity": "Achtergronddekking:",
    "decoration.borderTheme": "Randthema:",
    "decoration.borderOpacity": "Randdekking:",
    "decoration.background": "Achtergrond",
    "decoration.border": "Rand",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Regel {number}",
    "row.type": "Regeltype:",
    "rowType.trace": "Overtrekken",
    "rowType.fadingTrace": "Vervagende Overtrek",
    "rowType.guidedCopy": "Begeleid Overschrijven",
    "rowType.fill": "Invullen",
    "row.fontStyle": "Schrijfstijl:",
    "fontStyle.printRegular": "Blokletters",
    "fontStyle.printRegularArrow": "Blokletters met Pijlen",
    "fontStyle.printTracing": "Blokletters om Over te Trekken",
    "fontStyle.printTracingArrow": "Blokletters om Over te Trekken met Pijlen",
    "fontStyle.cursive": "Schoonschrift",
    "row.content": "Inhoud:",
    "content.empty": "Leeg",
    "content.beginningLetter": "Beginletter",
    "content.wholeFileName": "Volledige Bestandsnaam",
    "content.customText": "Eigen Tekst",
    "content.preWriting": "Voorbereidend Schrijven",
    "row.customTextPlaceholder": "Voer tekst in om over te trekken...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Lettertype:",
    "case.uppercase": "Hoofdletters",
    "case.lowercase": "Kleine Letters",
    "case.titleCase": "Beginhoofdletter",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Haaltype:",
    "stroke.vertical": "Verticale Lijn",
    "stroke.horizontal": "Horizontale Lijn",
    "stroke.circle": "Cirkel",
    "stroke.zigzag": "Zigzaglijn",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Afbeeldingsmodus:",
    "imageMode.exercise": "Oefenafbeelding",
    "imageMode.custom": "Eigen Afbeeldingen",
    "library.pickExercise": "Kies een oefenafbeelding (optioneel):",
    "library.searchPlaceholder": "Zoek afbeeldingen...",
    "library.selectedStatus": "Geselecteerd: {word}",
    "library.selectUpload": "Selecteer afbeelding(en) om te uploaden:",
    "library.uploadedImages": "Uw Geüploade Afbeeldingen:",
    "button.unselectImage": "Deselecteer Afbeelding",
    "button.clearSelection": "Selectie Wissen",
    "button.addSelectedImage": "Geselecteerde Afbeelding Toevoegen",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Nieuwe Tekst Toevoegen",
    "text.content": "Inhoud:",
    "text.placeholder": "Nieuwe Tekst",
    "text.selectedProperties": "Eigenschappen Geselecteerde Tekst",
    "text.color": "Kleur:",
    "text.size": "Grootte:",
    "text.font": "Lettertype:",
    "text.outlineColor": "Omlijning Kleur:",
    "text.outlineWidth": "Omlijning (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Naar Voren",
    "toolbar.sendBackward": "Naar Achteren",
    "toolbar.align": "Uitlijnen",
    "toolbar.alignLeft": "Links Uitlijnen",
    "toolbar.centerH": "Horizontaal Centreren",
    "toolbar.alignRight": "Rechts Uitlijnen",
    "toolbar.alignTop": "Boven Uitlijnen",
    "toolbar.centerV": "Verticaal Centreren",
    "toolbar.alignBottom": "Onder Uitlijnen",
    "toolbar.centerPageH": "Horizontaal Centreren op Pagina",
    "toolbar.centerPageV": "Verticaal Centreren op Pagina",
    "toolbar.cropOverflow": "Overloop Bijsnijden",
    "toolbar.lock": "Vergrendelen",
    "toolbar.unlock": "Ontgrendelen",
    "toolbar.delete": "Verwijderen",
    "toolbar.zoomIn": "Inzoomen",
    "toolbar.zoomOut": "Uitzoomen",
    "toolbar.resetZoom": "Zoom Resetten",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Regel Verwijderen",
    "button.addRow": "Regel Toevoegen",
    "button.addText": "Tekst aan Werkblad Toevoegen",
    "button.deleteSelectedText": "Geselecteerde Tekst Verwijderen",
    "button.download": "Downloaden",
    "button.downloadPdf": "Downloaden als PDF",
    "button.downloadJpeg": "Downloaden als JPEG",
    "settings.grayscale": "Grijswaarden",
    "button.clearAll": "Alles Wissen",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Regel succesvol bijgesneden.",
    "message.worksheetCleared": "Werkblad gewist.",
    "message.pdfDownloaded": "PDF gedownload!",
    "message.jpegDownloaded": "JPEG download gestart!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Bijsnijden wordt niet ondersteund voor dit regeltype.",
    "message.noContentToCrop": "Deze regel heeft geen inhoud om bij te snijden.",
    "message.noOverflow": "Geen overloop om bij te snijden.",
    "message.generateContent": "Genereer eerst de inhoud.",
    "message.pdfError": "Fout bij het maken van de PDF.",
    "message.generateWorksheet": "Genereer eerst een werkblad.",
    "message.jpegError": "Fout bij het voorbereiden van de JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (10 items) =====
    "message.selectBackgroundTheme": "Selecteer een thema voor achtergronden.",
    "message.selectBorderTheme": "Selecteer een thema voor randen.",
    "message.noImages": "Geen afbeeldingen gevonden. Selecteer een thema of probeer een andere zoekopdracht.",
    "message.themeLoadError": "Fout bij het laden van {type} thema's:",
    "message.selectTheme": "Selecteer een thema.",
    "message.loading": "Bezig met laden...",
    "message.loadError": "Fout bij het laden van {type}.",
    "message.preparingPdf": "PDF voorbereiden...",
    "message.preparingJpeg": "JPEG voorbereiden...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Weet u zeker dat u het werkblad wilt wissen? Dit kan niet ongedaan worden gemaakt.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSIE - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSIE",
    "library.allThemes": "Alle Thema\'s",
    "library.chooseFiles": "Bestanden kiezen",
    "library.noFileChosen": "Geen bestand gekozen",
    "library.filesSelected": "{x} bestand(en) geselecteerd",
    "message.selectImageToInclude": "Selecteer een afbeelding om toe te voegen.",
  },

  sv: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Skrivövningar Generator",
    "settings.title": "Skrivarbetsblad",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Språk:",
    "lang.en": "English (Engelska)",
    "lang.de": "Deutsch (Tyska)",
    "lang.fr": "Français (Franska)",
    "lang.es": "Español (Spanska)",
    "lang.pt": "Português (Portugisiska)",
    "lang.it": "Italiano (Italienska)",
    "lang.nl": "Nederlands (Nederländska)",
    "lang.sv": "Svenska",
    "lang.da": "Dansk (Danska)",
    "lang.no": "Norsk (Norska)",
    "lang.fi": "Suomi (Finska)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Sidinställningar",
    "library.title": "Bildbibliotek",
    "library.uploadTitle": "Ladda upp Egna Bilder",
    "settings.textTools": "Textalternativ",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Sidstorlek:",
    "pageSize.letterPortrait": "Letter Stående (8,5×11\")",
    "pageSize.letterLandscape": "Letter Liggande (11×8,5\")",
    "pageSize.a4Portrait": "A4 Stående (210×297mm)",
    "pageSize.a4Landscape": "A4 Liggande (297×210mm)",
    "pageSize.custom": "Anpassad",
    "settings.width": "Bredd (px):",
    "settings.height": "Höjd (px):",
    "decoration.backgroundTheme": "Bakgrundstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Bakgrundsopacitet:",
    "decoration.borderTheme": "Ramtema:",
    "decoration.borderOpacity": "Ramopacitet:",
    "decoration.background": "Bakgrund",
    "decoration.border": "Kant",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Rad {number}",
    "row.type": "Radtyp:",
    "rowType.trace": "Skriva Över",
    "rowType.fadingTrace": "Gradvis Överskrivning",
    "rowType.guidedCopy": "Guidad Avskrivning",
    "rowType.fill": "Fylla I",
    "row.fontStyle": "Skrivstil:",
    "fontStyle.printRegular": "Textning",
    "fontStyle.printRegularArrow": "Textning med Pilar",
    "fontStyle.printTracing": "Textning för Överskrivning",
    "fontStyle.printTracingArrow": "Textning för Överskrivning med Pilar",
    "fontStyle.cursive": "Skrivstil",
    "row.content": "Innehåll:",
    "content.empty": "Tom",
    "content.beginningLetter": "Begynnelsebokstav",
    "content.wholeFileName": "Hela Filnamnet",
    "content.customText": "Egen Text",
    "content.preWriting": "Förberedande Skrivning",
    "row.customTextPlaceholder": "Skriv in text att skriva över...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Bokstavstyp:",
    "case.uppercase": "Versaler",
    "case.lowercase": "Gemener",
    "case.titleCase": "Inledande Versal",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Strecktyp:",
    "stroke.vertical": "Lodrät Linje",
    "stroke.horizontal": "Vågrät Linje",
    "stroke.circle": "Cirkel",
    "stroke.zigzag": "Sicksacklinje",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Bildläge:",
    "imageMode.exercise": "Övningsbild",
    "imageMode.custom": "Egna Bilder",
    "library.pickExercise": "Välj en övningsbild (valfritt):",
    "library.searchPlaceholder": "Sök bilder...",
    "library.selectedStatus": "Vald: {word}",
    "library.selectUpload": "Välj bild(er) att ladda upp:",
    "library.uploadedImages": "Dina Uppladdade Bilder:",
    "button.unselectImage": "Avmarkera Bild",
    "button.clearSelection": "Rensa Val",
    "button.addSelectedImage": "Lägg Till Vald Bild",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Lägg Till Ny Text",
    "text.content": "Innehåll:",
    "text.placeholder": "Ny Text",
    "text.selectedProperties": "Egenskaper för Markerad Text",
    "text.color": "Färg:",
    "text.size": "Storlek:",
    "text.font": "Typsnitt:",
    "text.outlineColor": "Konturfärg:",
    "text.outlineWidth": "Kontur (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Flytta Framåt",
    "toolbar.sendBackward": "Flytta Bakåt",
    "toolbar.align": "Justera",
    "toolbar.alignLeft": "Vänsterjustera",
    "toolbar.centerH": "Centrera Horisontellt",
    "toolbar.alignRight": "Högerjustera",
    "toolbar.alignTop": "Justera Upptill",
    "toolbar.centerV": "Centrera Vertikalt",
    "toolbar.alignBottom": "Justera Nedtill",
    "toolbar.centerPageH": "Centrera på Sidan Horisontellt",
    "toolbar.centerPageV": "Centrera på Sidan Vertikalt",
    "toolbar.cropOverflow": "Beskär Överflöd",
    "toolbar.lock": "Lås",
    "toolbar.unlock": "Lås Upp",
    "toolbar.delete": "Ta Bort",
    "toolbar.zoomIn": "Zooma In",
    "toolbar.zoomOut": "Zooma Ut",
    "toolbar.resetZoom": "Återställ Zoom",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Ta Bort Rad",
    "button.addRow": "Lägg Till Rad",
    "button.addText": "Lägg Till Text på Arbetsbladet",
    "button.deleteSelectedText": "Ta Bort Markerad Text",
    "button.download": "Ladda Ner",
    "button.downloadPdf": "Ladda Ner som PDF",
    "button.downloadJpeg": "Ladda Ner som JPEG",
    "settings.grayscale": "Gråskala",
    "button.clearAll": "Rensa Allt",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Raden har beskurits.",
    "message.worksheetCleared": "Arbetsbladet har rensats.",
    "message.pdfDownloaded": "PDF nedladdad!",
    "message.jpegDownloaded": "JPEG-nedladdning påbörjad!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Beskärning stöds inte för denna radtyp.",
    "message.noContentToCrop": "Denna rad har inget innehåll att beskära.",
    "message.noOverflow": "Inget överflöd att beskära.",
    "message.generateContent": "Vänligen skapa innehåll först.",
    "message.pdfError": "Fel vid skapande av PDF.",
    "message.generateWorksheet": "Vänligen skapa ett arbetsblad först.",
    "message.jpegError": "Fel vid förberedelse av JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (10 items) =====
    "message.selectBackgroundTheme": "Välj ett tema för bakgrunder.",
    "message.selectBorderTheme": "Välj ett tema för ramar.",
    "message.noImages": "Inga bilder hittades. Välj ett tema eller prova en annan sökning.",
    "message.themeLoadError": "Fel vid laddning av {type}-teman:",
    "message.selectTheme": "Välj ett tema.",
    "message.loading": "Laddar...",
    "message.loadError": "Fel vid laddning av {type}.",
    "message.preparingPdf": "Förbereder PDF...",
    "message.preparingJpeg": "Förbereder JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Är du säker på att du vill rensa arbetsbladet? Detta kan inte ångras.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "GRATISVERSION - LessonCraftStudio.com",
    "watermark.freeShort": "GRATISVERSION",
    "library.allThemes": "Alla Teman",
    "library.chooseFiles": "Välj filer",
    "library.noFileChosen": "Ingen fil vald",
    "library.filesSelected": "{x} fil(er) valda",
    "message.selectImageToInclude": "Vänligen välj en bild att inkludera.",
  },

  da: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Skriveøvelser Generator",
    "settings.title": "Skrivearbejdsark",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Sprog:",
    "lang.en": "English (Engelsk)",
    "lang.de": "Deutsch (Tysk)",
    "lang.fr": "Français (Fransk)",
    "lang.es": "Español (Spansk)",
    "lang.pt": "Português (Portugisisk)",
    "lang.it": "Italiano (Italiensk)",
    "lang.nl": "Nederlands (Hollandsk)",
    "lang.sv": "Svenska (Svensk)",
    "lang.da": "Dansk",
    "lang.no": "Norsk",
    "lang.fi": "Suomi (Finsk)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Sideopsætning",
    "library.title": "Billedbibliotek",
    "library.uploadTitle": "Upload Egne Billeder",
    "settings.textTools": "Tekstindstillinger",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Sidestørrelse:",
    "pageSize.letterPortrait": "Letter Stående (8,5×11\")",
    "pageSize.letterLandscape": "Letter Liggende (11×8,5\")",
    "pageSize.a4Portrait": "A4 Stående (210×297mm)",
    "pageSize.a4Landscape": "A4 Liggende (297×210mm)",
    "pageSize.custom": "Tilpasset",
    "settings.width": "Bredde (px):",
    "settings.height": "Højde (px):",
    "decoration.backgroundTheme": "Baggrundstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Baggrundsdekning:",
    "decoration.borderTheme": "Rammetema:",
    "decoration.borderOpacity": "Rammedekning:",
    "decoration.background": "Baggrund",
    "decoration.border": "Ramme",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Række {number}",
    "row.type": "Rækketype:",
    "rowType.trace": "Efterskrive",
    "rowType.fadingTrace": "Gradvis Efterskrivning",
    "rowType.guidedCopy": "Guidet Afskrivning",
    "rowType.fill": "Udfylde",
    "row.fontStyle": "Skrifttype:",
    "fontStyle.printRegular": "Trykte Bogstaver",
    "fontStyle.printRegularArrow": "Trykte Bogstaver med Pile",
    "fontStyle.printTracing": "Trykte Bogstaver til Efterskrivning",
    "fontStyle.printTracingArrow": "Trykte Bogstaver til Efterskrivning med Pile",
    "fontStyle.cursive": "Håndskrift",
    "row.content": "Indhold:",
    "content.empty": "Tom",
    "content.beginningLetter": "Begyndelsesbogstav",
    "content.wholeFileName": "Hele Filnavnet",
    "content.customText": "Egen Tekst",
    "content.preWriting": "Forberedende Skrivning",
    "row.customTextPlaceholder": "Indtast tekst til efterskrivning...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Bogstavtype:",
    "case.uppercase": "Store Bogstaver",
    "case.lowercase": "Små Bogstaver",
    "case.titleCase": "Stort Begyndelsesbogstav",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Stregtype:",
    "stroke.vertical": "Lodret Linje",
    "stroke.horizontal": "Vandret Linje",
    "stroke.circle": "Cirkel",
    "stroke.zigzag": "Zigzaglinje",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Billedtilstand:",
    "imageMode.exercise": "Øvelsesbillede",
    "imageMode.custom": "Egne Billeder",
    "library.pickExercise": "Vælg et øvelsesbillede (valgfrit):",
    "library.searchPlaceholder": "Søg billeder...",
    "library.selectedStatus": "Valgt: {word}",
    "library.selectUpload": "Vælg billede(r) til upload:",
    "library.uploadedImages": "Dine Uploadede Billeder:",
    "button.unselectImage": "Fravælg Billede",
    "button.clearSelection": "Ryd Valg",
    "button.addSelectedImage": "Tilføj Valgt Billede",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Tilføj Ny Tekst",
    "text.content": "Indhold:",
    "text.placeholder": "Ny Tekst",
    "text.selectedProperties": "Egenskaber for Valgt Tekst",
    "text.color": "Farve:",
    "text.size": "Størrelse:",
    "text.font": "Skrifttype:",
    "text.outlineColor": "Konturfarve:",
    "text.outlineWidth": "Kontur (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Flyt Fremad",
    "toolbar.sendBackward": "Flyt Bagud",
    "toolbar.align": "Juster",
    "toolbar.alignLeft": "Venstrejuster",
    "toolbar.centerH": "Centrer Vandret",
    "toolbar.alignRight": "Højrejuster",
    "toolbar.alignTop": "Juster Øverst",
    "toolbar.centerV": "Centrer Lodret",
    "toolbar.alignBottom": "Juster Nederst",
    "toolbar.centerPageH": "Centrer på Siden Vandret",
    "toolbar.centerPageV": "Centrer på Siden Lodret",
    "toolbar.cropOverflow": "Beskær Overløb",
    "toolbar.lock": "Lås",
    "toolbar.unlock": "Lås Op",
    "toolbar.delete": "Slet",
    "toolbar.zoomIn": "Zoom Ind",
    "toolbar.zoomOut": "Zoom Ud",
    "toolbar.resetZoom": "Nulstil Zoom",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Slet Række",
    "button.addRow": "Tilføj Række",
    "button.addText": "Tilføj Tekst til Arbejdsark",
    "button.deleteSelectedText": "Slet Valgt Tekst",
    "button.download": "Download",
    "button.downloadPdf": "Download som PDF",
    "button.downloadJpeg": "Download som JPEG",
    "settings.grayscale": "Gråtoner",
    "button.clearAll": "Ryd Alt",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Rækken er blevet beskåret.",
    "message.worksheetCleared": "Arbejdsarket er ryddet.",
    "message.pdfDownloaded": "PDF downloadet!",
    "message.jpegDownloaded": "JPEG-download startet!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Beskæring understøttes ikke for denne rækketype.",
    "message.noContentToCrop": "Denne række har intet indhold at beskære.",
    "message.noOverflow": "Intet overløb at beskære.",
    "message.generateContent": "Opret venligst indhold først.",
    "message.pdfError": "Fejl ved oprettelse af PDF.",
    "message.generateWorksheet": "Opret venligst et arbejdsark først.",
    "message.jpegError": "Fejl ved forberedelse af JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (10 items) =====
    "message.selectBackgroundTheme": "Vælg et tema til baggrunde.",
    "message.selectBorderTheme": "Vælg et tema til rammer.",
    "message.noImages": "Ingen billeder fundet. Vælg et tema eller prøv en anden søgning.",
    "message.themeLoadError": "Fejl ved indlæsning af {type}-temaer:",
    "message.selectTheme": "Vælg et tema.",
    "message.loading": "Indlæser...",
    "message.loadError": "Fejl ved indlæsning af {type}.",
    "message.preparingPdf": "Forbereder PDF...",
    "message.preparingJpeg": "Forbereder JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Er du sikker på, at du vil rydde arbejdsarket? Dette kan ikke fortrydes.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSION",
    "library.allThemes": "Alle Temaer",
    "library.chooseFiles": "Vælg filer",
    "library.noFileChosen": "Ingen fil valgt",
    "library.filesSelected": "{x} fil(er) valgt",
    "message.selectImageToInclude": "Vælg venligst et billede, der skal medtages.",
  },

  no: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Skrivetrening Generator",
    "settings.title": "Skriveoppgaver",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Språk:",
    "lang.en": "English (Engelsk)",
    "lang.de": "Deutsch (Tysk)",
    "lang.fr": "Français (Fransk)",
    "lang.es": "Español (Spansk)",
    "lang.pt": "Português (Portugisisk)",
    "lang.it": "Italiano (Italiensk)",
    "lang.nl": "Nederlands (Nederlandsk)",
    "lang.sv": "Svenska (Svensk)",
    "lang.da": "Dansk",
    "lang.no": "Norsk",
    "lang.fi": "Suomi (Finsk)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Sideoppsett",
    "library.title": "Bildebibliotek",
    "library.uploadTitle": "Last Opp Egne Bilder",
    "settings.textTools": "Tekstinnstillinger",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Sidestørrelse:",
    "pageSize.letterPortrait": "Letter Stående (8,5×11\")",
    "pageSize.letterLandscape": "Letter Liggende (11×8,5\")",
    "pageSize.a4Portrait": "A4 Stående (210×297mm)",
    "pageSize.a4Landscape": "A4 Liggende (297×210mm)",
    "pageSize.custom": "Tilpasset",
    "settings.width": "Bredde (px):",
    "settings.height": "Høyde (px):",
    "decoration.backgroundTheme": "Bakgrunnstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Bakgrunnsdekkevne:",
    "decoration.borderTheme": "Rammetema:",
    "decoration.borderOpacity": "Rammedekkevne:",
    "decoration.background": "Bakgrunn",
    "decoration.border": "Ramme",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Linje {number}",
    "row.type": "Linjetype:",
    "rowType.trace": "Følge Etter",
    "rowType.fadingTrace": "Gradvis Etterfølging",
    "rowType.guidedCopy": "Veiledet Avskrift",
    "rowType.fill": "Fylle Inn",
    "row.fontStyle": "Skriftstil:",
    "fontStyle.printRegular": "Blokkbokstaver",
    "fontStyle.printRegularArrow": "Blokkbokstaver med Piler",
    "fontStyle.printTracing": "Blokkbokstaver for Etterfølging",
    "fontStyle.printTracingArrow": "Blokkbokstaver for Etterfølging med Piler",
    "fontStyle.cursive": "Løkkeskrift",
    "row.content": "Innhold:",
    "content.empty": "Tom",
    "content.beginningLetter": "Begynnelsesbokstav",
    "content.wholeFileName": "Hele Filnavnet",
    "content.customText": "Egen Tekst",
    "content.preWriting": "Førskriving",
    "row.customTextPlaceholder": "Skriv inn tekst for etterfølging...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Bokstavtype:",
    "case.uppercase": "Store Bokstaver",
    "case.lowercase": "Små Bokstaver",
    "case.titleCase": "Stor Forbokstav",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Strektype:",
    "stroke.vertical": "Loddrett Linje",
    "stroke.horizontal": "Vannrett Linje",
    "stroke.circle": "Sirkel",
    "stroke.zigzag": "Sikksakklinje",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Bildemodus:",
    "imageMode.exercise": "Øvingsbilde",
    "imageMode.custom": "Egne Bilder",
    "library.pickExercise": "Velg et øvingsbilde (valgfritt):",
    "library.searchPlaceholder": "Søk bilder...",
    "library.selectedStatus": "Valgt: {word}",
    "library.selectUpload": "Velg bilde(r) for opplasting:",
    "library.uploadedImages": "Dine Opplastede Bilder:",
    "button.unselectImage": "Fjern Valg av Bilde",
    "button.clearSelection": "Tøm Valg",
    "button.addSelectedImage": "Legg Til Valgt Bilde",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Legg Til Ny Tekst",
    "text.content": "Innhold:",
    "text.placeholder": "Ny Tekst",
    "text.selectedProperties": "Egenskaper for Valgt Tekst",
    "text.color": "Farge:",
    "text.size": "Størrelse:",
    "text.font": "Skrifttype:",
    "text.outlineColor": "Omrissfarge:",
    "text.outlineWidth": "Omriss (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Flytt Fremover",
    "toolbar.sendBackward": "Flytt Bakover",
    "toolbar.align": "Juster",
    "toolbar.alignLeft": "Venstrejuster",
    "toolbar.centerH": "Sentrer Horisontalt",
    "toolbar.alignRight": "Høyrejuster",
    "toolbar.alignTop": "Juster Øverst",
    "toolbar.centerV": "Sentrer Vertikalt",
    "toolbar.alignBottom": "Juster Nederst",
    "toolbar.centerPageH": "Sentrer på Siden Horisontalt",
    "toolbar.centerPageV": "Sentrer på Siden Vertikalt",
    "toolbar.cropOverflow": "Beskjær Overflødig",
    "toolbar.lock": "Lås",
    "toolbar.unlock": "Lås Opp",
    "toolbar.delete": "Slett",
    "toolbar.zoomIn": "Zoom Inn",
    "toolbar.zoomOut": "Zoom Ut",
    "toolbar.resetZoom": "Tilbakestill Zoom",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Slett Linje",
    "button.addRow": "Legg Til Linje",
    "button.addText": "Legg Til Tekst på Arbeidsarket",
    "button.deleteSelectedText": "Slett Valgt Tekst",
    "button.download": "Last Ned",
    "button.downloadPdf": "Last Ned som PDF",
    "button.downloadJpeg": "Last Ned som JPEG",
    "settings.grayscale": "Gråtoner",
    "button.clearAll": "Slett alt",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Linjen er beskåret.",
    "message.worksheetCleared": "Arbeidsarket er tømt.",
    "message.pdfDownloaded": "PDF lastet ned!",
    "message.jpegDownloaded": "JPEG-nedlasting startet!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Beskjæring støttes ikke for denne linjetypen.",
    "message.noContentToCrop": "Denne linjen har ikke innhold å beskjære.",
    "message.noOverflow": "Ingenting overflødig å beskjære.",
    "message.generateContent": "Vennligst opprett innhold først.",
    "message.pdfError": "Feil ved opprettelse av PDF.",
    "message.generateWorksheet": "Vennligst opprett et arbeidsark først.",
    "message.jpegError": "Feil ved klargjøring av JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (10 items) =====
    "message.selectBackgroundTheme": "Velg et tema for bakgrunner.",
    "message.selectBorderTheme": "Velg et tema for rammer.",
    "message.noImages": "Ingen bilder funnet. Velg et tema eller prøv et annet søk.",
    "message.themeLoadError": "Feil ved lasting av {type}-temaer:",
    "message.selectTheme": "Velg et tema.",
    "message.loading": "Laster...",
    "message.loadError": "Feil ved lasting av {type}.",
    "message.preparingPdf": "Klargjør PDF...",
    "message.preparingJpeg": "Klargjør JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Er du sikker på at du vil tømme arbeidsarket? Dette kan ikke angres.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSJON - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSJON",
    "library.allThemes": "Alle Temaer",
    "library.chooseFiles": "Velg filer",
    "library.noFileChosen": "Ingen fil valgt",
    "library.filesSelected": "{x} fil(er) valgt",
    "message.selectImageToInclude": "Vennligst velg et bilde å inkludere.",
  },

  fi: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Kirjoitusharjoitusten Luoja",
    "settings.title": "Kirjoitustehtävä",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Kieli:",
    "lang.en": "English (Englanti)",
    "lang.de": "Deutsch (Saksa)",
    "lang.fr": "Français (Ranska)",
    "lang.es": "Español (Espanja)",
    "lang.pt": "Português (Portugali)",
    "lang.it": "Italiano (Italia)",
    "lang.nl": "Nederlands (Hollanti)",
    "lang.sv": "Svenska (Ruotsi)",
    "lang.da": "Dansk (Tanska)",
    "lang.no": "Norsk (Norja)",
    "lang.fi": "Suomi",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Sivun Asetukset",
    "library.title": "Kuvakirjasto",
    "library.uploadTitle": "Lataa Omia Kuvia",
    "settings.textTools": "Tekstivaihtoehdot",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Sivun Koko:",
    "pageSize.letterPortrait": "Letter Pysty (8,5×11\")",
    "pageSize.letterLandscape": "Letter Vaaka (11×8,5\")",
    "pageSize.a4Portrait": "A4 Pysty (210×297mm)",
    "pageSize.a4Landscape": "A4 Vaaka (297×210mm)",
    "pageSize.custom": "Mukautettu",
    "settings.width": "Leveys (px):",
    "settings.height": "Korkeus (px):",
    "decoration.backgroundTheme": "Taustateema:",
    "decoration.none": "Ei mitään",
    "decoration.backgroundOpacity": "Taustan läpinäkyvyys:",
    "decoration.borderTheme": "Reunusteema:",
    "decoration.borderOpacity": "Reunuksen läpinäkyvyys:",
    "decoration.background": "Tausta",
    "decoration.border": "Reunus",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Rivi {number}",
    "row.type": "Rivityyppi:",
    "rowType.trace": "Jäljentäminen",
    "rowType.fadingTrace": "Häivytetty Jäljentäminen",
    "rowType.guidedCopy": "Ohjattu Kopiointi",
    "rowType.fill": "Täyttäminen",
    "row.fontStyle": "Kirjoitustyyli:",
    "fontStyle.printRegular": "Tekstaus",
    "fontStyle.printRegularArrow": "Tekstaus Nuolilla",
    "fontStyle.printTracing": "Jäljennystekstaus",
    "fontStyle.printTracingArrow": "Jäljennystekstaus Nuolilla",
    "fontStyle.cursive": "Kaunokirjoitus",
    "row.content": "Sisältö:",
    "content.empty": "Tyhjä",
    "content.beginningLetter": "Alkukirjain",
    "content.wholeFileName": "Koko Tiedostonimi",
    "content.customText": "Oma Teksti",
    "content.preWriting": "Kirjoitusvalmiudet",
    "row.customTextPlaceholder": "Kirjoita jäljennettävä teksti...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Kirjaintyyppi:",
    "case.uppercase": "Isot Kirjaimet",
    "case.lowercase": "Pienet Kirjaimet",
    "case.titleCase": "Iso Alkukirjain",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Viivatyyppi:",
    "stroke.vertical": "Pystyviiva",
    "stroke.horizontal": "Vaakaviiva",
    "stroke.circle": "Ympyrä",
    "stroke.zigzag": "Siksak-viiva",

    // ===== 8. IMAGE LIBRARY (14 items) =====
    "library.imageMode": "Kuvatila:",
    "imageMode.exercise": "Harjoituskuva",
    "imageMode.custom": "Omat Kuvat",
    "library.pickExercise": "Valitse harjoituskuva (valinnainen):",
    "library.allThemes": "Kaikki Teemat",
    "library.searchPlaceholder": "Hae kuvia...",
    "library.selectedStatus": "Valittu: {word}",
    "library.selectUpload": "Valitse ladattava(t) kuva(t):",
    "library.chooseFiles": "Valitse tiedostot",
    "library.noFileChosen": "Ei valittua tiedostoa",
    "library.filesSelected": "{x} tiedosto(a) valittu",
    "library.uploadedImages": "Ladatut Kuvat:",
    "button.unselectImage": "Poista Kuvan Valinta",
    "button.clearSelection": "Tyhjennä Valinta",
    "button.addSelectedImage": "Lisää Valittu Kuva",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Lisää Uusi Teksti",
    "text.content": "Sisältö:",
    "text.placeholder": "Uusi Teksti",
    "text.selectedProperties": "Valitun Tekstin Ominaisuudet",
    "text.color": "Väri:",
    "text.size": "Koko:",
    "text.font": "Kirjasintyyppi:",
    "text.outlineColor": "Ääriviivan Väri:",
    "text.outlineWidth": "Ääriviiva (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Tuo Eteen",
    "toolbar.sendBackward": "Vie Taakse",
    "toolbar.align": "Tasaa",
    "toolbar.alignLeft": "Tasaa Vasemmalle",
    "toolbar.centerH": "Keskitä Vaakasuunnassa",
    "toolbar.alignRight": "Tasaa Oikealle",
    "toolbar.alignTop": "Tasaa Ylös",
    "toolbar.centerV": "Keskitä Pystysuunnassa",
    "toolbar.alignBottom": "Tasaa Alas",
    "toolbar.centerPageH": "Keskitä Sivulle Vaakasuunnassa",
    "toolbar.centerPageV": "Keskitä Sivulle Pystysuunnassa",
    "toolbar.cropOverflow": "Rajaa Ylimääräinen",
    "toolbar.lock": "Lukitse",
    "toolbar.unlock": "Avaa Lukitus",
    "toolbar.delete": "Poista",
    "toolbar.zoomIn": "Lähennä",
    "toolbar.zoomOut": "Loitonna",
    "toolbar.resetZoom": "Palauta Zoomaus",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Poista Rivi",
    "button.addRow": "Lisää Rivi",
    "button.addText": "Lisää Teksti Tehtävälle",
    "button.deleteSelectedText": "Poista Valittu Teksti",
    "button.download": "Lataa",
    "button.downloadPdf": "Lataa PDF-muodossa",
    "button.downloadJpeg": "Lataa JPEG-muodossa",
    "settings.grayscale": "Harmaasävy",
    "button.clearAll": "Tyhjennä Kaikki",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Rivi rajattu onnistuneesti.",
    "message.worksheetCleared": "Tehtävä tyhjennetty.",
    "message.pdfDownloaded": "PDF ladattu!",
    "message.jpegDownloaded": "JPEG-lataus aloitettu!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Rajaaminen ei ole tuettu tälle rivityypille.",
    "message.noContentToCrop": "Tällä rivillä ei ole rajattavaa sisältöä.",
    "message.noOverflow": "Ei ylimääräistä rajattavaa.",
    "message.generateContent": "Luo ensin sisältö.",
    "message.pdfError": "Virhe PDF:n luomisessa.",
    "message.generateWorksheet": "Luo ensin tehtävä.",
    "message.jpegError": "Virhe JPEG:n valmistelussa.",

    // ===== 14. INFO/LOADING MESSAGES (11 items) =====
    "message.selectBackgroundTheme": "Valitse taustateema.",
    "message.selectBorderTheme": "Valitse reunusteema.",
    "message.selectImageToInclude": "Valitse kuva sisällytettäväksi.",
    "message.noImages": "Kuvia ei löytynyt. Valitse teema tai kokeile toista hakua.",
    "message.themeLoadError": "Virhe ladattaessa {type}-teemoja:",
    "message.selectTheme": "Valitse teema.",
    "message.loading": "Ladataan...",
    "message.loadError": "Virhe ladattaessa {type}.",
    "message.preparingPdf": "Valmistellaan PDF:ää...",
    "message.preparingJpeg": "Valmistellaan JPEG:iä...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Haluatko varmasti tyhjentää tehtävän? Tätä ei voi perua.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "ILMAISVERSIO - LessonCraftStudio.com",
    "watermark.freeShort": "ILMAISVERSIO",
  }
};

// Expose translations to window for BulletproofLoader compatibility
window.translations = translations;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = translations;
}
