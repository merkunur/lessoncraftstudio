/**
 * SUDOKU COMPLETE TRANSLATIONS
 * Complete Translation System for Sudoku for Kids App
 * Version: 1.0.0
 * Generated: 2025-09-29T05:08:06.955Z
 *
 * Languages Supported:
 * - English (en)
 * - German (de)
 * - French (fr)
 * - Spanish (es)
 * - Italian (it)
 * - Portuguese (pt)
 * - Dutch (nl)
 * - Swedish (sv)
 * - Danish (da)
 * - Norwegian (no)
 * - Finnish (fi)
 *
 * Total Keys: 174 per language
 */

const SUDOKU_TRANSLATIONS = {
  "en": {
    // ============= LANGUAGE NAMES =============
    "lang_en": "English",
    "lang_de": "Deutsch (German)",
    "lang_fr": "Français (French)",
    "lang_es": "Español (Spanish)",
    "lang_pt": "Português (Portuguese)",
    "lang_it": "Italiano (Italian)",
    "lang_nl": "Nederlands (Dutch)",
    "lang_sv": "Svenska (Swedish)",
    "lang_da": "Dansk (Danish)",
    "lang_no": "Norsk (Norwegian)",
    "lang_fi": "Suomi (Finnish)",

    // ============= CORE UI =============
    "sudoku.page.title": "Sudoku for Kids - Create Colorful Visual Sudoku Puzzles",
    "sudoku.settings.title": "Sudoku Settings",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Sudoku for Kids",
    "sudoku.tab.worksheet": "Worksheet",
    "sudoku.tab.answer": "Answer Key",

    // ============= LANGUAGE SETTINGS =============
    "sudoku.language.select": "Select Language",
    "sudoku.language.label": "Language:",
    "sudoku.language.description": "Image names and themes will be displayed in the selected language.",

    // ============= PAGE & SCENE SECTION =============
    "sudoku.page.scene.title": "Page & Scene",
    "sudoku.page.setup": "Page Setup",
    "sudoku.page.size.label": "Page Size:",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.custom": "Custom",
    "sudoku.page.width": "Width (px):",
    "sudoku.page.height": "Height (px):",
    "sudoku.page.apply": "Apply Size",

    // ============= BACKGROUND SECTION =============
    "sudoku.background.title": "Background",  // CRITICAL - User mentioned
    "sudoku.background.color": "Fallback Color:",
    "sudoku.background.theme.label": "Background Theme:",
    "sudoku.background.none": "None (Use Fallback Color)",
    "sudoku.background.select.message": "Select a theme for backgrounds.",
    "sudoku.background.opacity": "Background Opacity:",

    // ============= BORDER SECTION =============
    "sudoku.border.title": "Border",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Border Theme:",
    "common.none": "None",
    "none": "None",
    "sudoku.border.select.message": "Select a theme to see borders.",
    "sudoku.border.opacity": "Border Opacity:",

    // ============= SUDOKU SETTINGS =============
    "sudoku.difficulty.title": "Difficulty",
    "sudoku.blanks.label": "Number of blank cells:",
    "sudoku.difficulty.easy": "Easy (4 blanks)",
    "sudoku.difficulty.medium": "Medium (6 blanks)",
    "sudoku.difficulty.hard": "Hard (8 blanks)",

    // ============= TEXT TOOLS =============
    "sudoku.text.tools": "Text Tools",
    "sudoku.text.add.title": "Add New Text",
    "sudoku.text.content.label": "Content:",
    "sudoku.text.placeholder": "Title, Instructions...",
    "sudoku.text.add.button": "Add Text",
    "sudoku.text.properties": "Selected Text Properties",
    "sudoku.text.color": "Color:",
    "sudoku.text.size": "Size:",
    "sudoku.text.font": "Font:",
    "sudoku.text.outline.color": "Outline Color:",
    "sudoku.text.outline.width": "Outline (0-10):",
    "sudoku.text.default": "New Text",

    // ============= FONT OPTIONS =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= IMAGE LIBRARY =============
    "sudoku.image.library": "Image Library",
    "sudoku.image.source": "Image Source for Puzzle",
    "sudoku.generate.theme": "Generate from Theme:",
    "sudoku.select.individual": "-- Or Select Individual Images Below --",
    "sudoku.image.individual": "Individual Image Selection",
    "sudoku.filter.theme": "Filter by Theme:",
    "sudoku.search.label": "Search Images:",
    "sudoku.search.placeholder": "e.g., apple, car",
    "sudoku.available.images": "Available Images (Requires 4):",
    "sudoku.loading.images": "Loading images...",
    "sudoku.selected.images": "Selected Images:",
    "sudoku.themes.all": "All Themes",

    // ============= UPLOAD SECTION =============
    "sudoku.upload.title": "Upload Custom Images",
    "sudoku.upload.select": "Select image(s) to upload:",
    "sudoku.uploaded.images": "Your Uploaded Images (This Session):",
    "sudoku.upload.placeholder": "Your uploaded images will appear here.",
    "sudoku.upload.button": "Choose files",
    "sudoku.upload.no.file": "No file chosen",
    "sudoku.upload.files.selected": "{count} file(s) selected",

    // ============= TOOLBAR =============
    "toolbar.bring.forward": "Bring Forward",
    "toolbar.send.backward": "Send Backward",
    "toolbar.align.selected": "Align Selected:",
    "toolbar.align.page": "Align to Page:",
    "toolbar.layers": "Layers",
    "toolbar.align": "Align",
    "toolbar.delete.selected": "Delete Selected",

    // ============= ACTION BUTTONS =============
    "sudoku.generate": "Generate",
    "sudoku.generate.worksheet": "Generate Worksheet",
    "sudoku.generate.answer": "Generate Answer Key",
    "sudoku.download": "Download",
    "sudoku.download.worksheet.jpeg": "Worksheet (JPEG)",
    "sudoku.download.answer.jpeg": "Answer Key (JPEG)",
    "sudoku.download.worksheet.pdf": "Worksheet (PDF)",
    "sudoku.download.answer.pdf": "Answer Key (PDF)",
    "common.grayscale": "Grayscale",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Clear All",

    // ============= SUCCESS MESSAGES =============
    "sudoku.msg.worksheet.success": "Worksheet generated successfully!",
    "sudoku.msg.answer.generated": "Answer key generated!",
    "sudoku.msg.download.started": "Download initiated!",
    "sudoku.msg.pdf.success": "PDF downloaded!",
    "sudoku.msg.cleared": "All settings cleared.",
    "sudoku.msg.individual.mode": "Switched to individual image selection mode.",
    "sudoku.msg.uploads.ready": "{count} custom image(s) available. Click them to select.",

    // ============= ERROR MESSAGES =============
    "sudoku.msg.worksheet.error": "Error generating worksheet: {message}",
    "sudoku.msg.generate.first": "Please generate a worksheet first.",
    "sudoku.msg.theme.insufficient": "Theme '{theme}' needs at least {count} images.",
    "sudoku.msg.select.minimum": "Please select or upload at least {count} images.",
    "sudoku.msg.render.error": "Error rendering worksheet: {message}",
    "sudoku.msg.clear.theme": "Clear 'Generate from Theme' to select individual images.",
    "sudoku.msg.max.selection": "You can only select {count} images.",
    "sudoku.msg.file.error": "Error reading file: {filename}",
    "sudoku.msg.generate.content": "Please generate content for this canvas first.",
    "sudoku.msg.jpeg.error": "Error preparing JPEG.",
    "sudoku.msg.pdf.error": "Error creating PDF.",
    "sudoku.asset.failed": "Failed to load {asset} image.",

    // ============= INFO/STATUS MESSAGES =============
    "sudoku.msg.select.to.begin": "Select {REQUIRED_IMAGES} images or a theme to begin.",
    "sudoku.msg.loading.animals": "Loading animals theme...",
    "sudoku.msg.searching": "Searching...",
    "sudoku.msg.loading.theme": "Loading theme...",
    "sudoku.msg.no.images": "No images found{query}.",
    "sudoku.msg.loading.specific": "Loading theme '{theme}'...",
    "sudoku.msg.theme.selected": "Puzzle will generate using random images from the '{theme}' theme.",
    "sudoku.msg.loading.uploads": "Loading {count} image(s)...",
    "sudoku.msg.preparing": "Preparing {filename}...",
    "sudoku.asset.select": "Select a theme to see {type}.",
    "sudoku.asset.loading": "Loading {theme} {type}...",
    "sudoku.asset.empty": "No {type} in this theme.",

    // ============= WATERMARK TEXT =============
    "watermarkText": "FREE VERSION - LessonCraftStudio.com",
    "watermarkSmallText": "FREE VERSION"
  },

  "de": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI (6 keys)
    // ==========================================
    "sudoku.page.title": "Kinder-Sudoku - Bunte Bilder-Sudokus erstellen",
    "sudoku.settings.title": "Sudoku-Einstellungen",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Kinder-Sudoku",
    "sudoku.tab.worksheet": "Arbeitsblatt",
    "sudoku.tab.answer": "Lösungsblatt",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "sudoku.language.select": "Sprache auswählen",
    "sudoku.language.label": "Sprache:",
    "sudoku.language.description": "Bildnamen und Themen werden in der gewählten Sprache angezeigt.",

    // ==========================================
    // PAGE & SCENE SECTION (10 keys)
    // ==========================================
    "sudoku.page.scene.title": "Seite & Szene",
    "sudoku.page.setup": "Seiteneinrichtung",
    "sudoku.page.size.label": "Seitengröße:",
    "page.size.letter.landscape": "Letter Querformat (11×8,5\")",
    "page.size.letter.portrait": "Letter Hochformat (8,5×11\")",
    "page.size.a4.landscape": "A4 Querformat (297×210mm)",
    "page.size.a4.portrait": "A4 Hochformat (210×297mm)",
    "page.size.custom": "Benutzerdefiniert",
    "sudoku.page.width": "Breite (px):",
    "sudoku.page.height": "Höhe (px):",
    "sudoku.page.apply": "Größe anwenden",

    // ==========================================
    // BACKGROUND SECTION (6 keys)
    // ==========================================
    "sudoku.background.title": "Hintergrund",  // CRITICAL - User mentioned
    "sudoku.background.color": "Grundfarbe:",
    "sudoku.background.theme.label": "Hintergrundthema:",
    "sudoku.background.none": "Kein (Grundfarbe verwenden)",
    "sudoku.background.select.message": "Wählen Sie ein Thema für Hintergründe.",
    "sudoku.background.opacity": "Hintergrund-Transparenz:",

    // ==========================================
    // BORDER SECTION (5 keys)
    // ==========================================
    "sudoku.border.title": "Rahmen",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Rahmenthema:",
    "common.none": "Kein",
    "none": "Kein",
    "sudoku.border.select.message": "Wählen Sie ein Thema für Rahmen.",
    "sudoku.border.opacity": "Rahmen-Transparenz:",

    // ==========================================
    // SUDOKU SETTINGS (5 keys)
    // ==========================================
    "sudoku.difficulty.title": "Schwierigkeitsgrad",
    "sudoku.blanks.label": "Anzahl leerer Felder:",
    "sudoku.difficulty.easy": "Einfach (4 Leerfelder)",
    "sudoku.difficulty.medium": "Mittel (6 Leerfelder)",
    "sudoku.difficulty.hard": "Schwer (8 Leerfelder)",

    // ==========================================
    // TEXT TOOLS (12 keys)
    // ==========================================
    "sudoku.text.tools": "Textwerkzeuge",
    "sudoku.text.add.title": "Neuen Text hinzufügen",
    "sudoku.text.content.label": "Inhalt:",
    "sudoku.text.placeholder": "Titel, Anleitung...",
    "sudoku.text.add.button": "Text einfügen",
    "sudoku.text.properties": "Eigenschaften des markierten Texts",
    "sudoku.text.color": "Farbe:",
    "sudoku.text.size": "Größe:",
    "sudoku.text.font": "Schriftart:",
    "sudoku.text.outline.color": "Konturfarbe:",
    "sudoku.text.outline.width": "Konturstärke (0-10):",
    "sudoku.text.default": "Neuer Text",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (12 keys)
    // ==========================================
    "sudoku.image.library": "Bildsammlung",
    "sudoku.image.source": "Bildquelle für das Rätsel",
    "sudoku.generate.theme": "Aus Thema erstellen:",
    "sudoku.select.individual": "-- Oder einzelne Bilder unten auswählen --",
    "sudoku.image.individual": "Einzelbildauswahl",
    "sudoku.filter.theme": "Nach Thema filtern:",
    "sudoku.search.label": "Bilder suchen:",
    "sudoku.search.placeholder": "z.B. Apfel, Auto",
    "sudoku.available.images": "Verfügbare Bilder (4 benötigt):",
    "sudoku.loading.images": "Bilder werden geladen...",
    "sudoku.selected.images": "Ausgewählte Bilder:",
    "sudoku.themes.all": "Alle Themen",

    // ==========================================
    // UPLOAD SECTION (7 keys)
    // ==========================================
    "sudoku.upload.title": "Eigene Bilder hochladen",
    "sudoku.upload.select": "Bilder zum Hochladen auswählen:",
    "sudoku.uploaded.images": "Ihre hochgeladenen Bilder (diese Sitzung):",
    "sudoku.upload.placeholder": "Ihre hochgeladenen Bilder erscheinen hier.",
    "sudoku.upload.button": "Dateien auswählen",
    "sudoku.upload.no.file": "Keine Datei ausgewählt",
    "sudoku.upload.files.selected": "{count} Datei(en) ausgewählt",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "toolbar.bring.forward": "Nach vorne",
    "toolbar.send.backward": "Nach hinten",
    "toolbar.align.selected": "Auswahl ausrichten:",
    "toolbar.align.page": "An Seite ausrichten:",
    "toolbar.layers": "Ebenen",
    "toolbar.align": "Ausrichten",
    "toolbar.delete.selected": "Auswahl löschen",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "sudoku.generate": "Erstellen",
    "sudoku.generate.worksheet": "Arbeitsblatt erstellen",
    "sudoku.generate.answer": "Lösungsblatt erstellen",
    "sudoku.download": "Speichern",
    "sudoku.download.worksheet.jpeg": "Arbeitsblatt (JPEG)",
    "sudoku.download.answer.jpeg": "Lösungsblatt (JPEG)",
    "sudoku.download.worksheet.pdf": "Arbeitsblatt (PDF)",
    "sudoku.download.answer.pdf": "Lösungsblatt (PDF)",
    "common.grayscale": "Graustufen",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Alles löschen",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "sudoku.msg.worksheet.success": "Arbeitsblatt erfolgreich erstellt!",
    "sudoku.msg.answer.generated": "Lösungsblatt erstellt!",
    "sudoku.msg.download.started": "Download gestartet!",
    "sudoku.msg.pdf.success": "PDF heruntergeladen!",
    "sudoku.msg.cleared": "Alle Einstellungen gelöscht.",
    "sudoku.msg.individual.mode": "Zur Einzelbildauswahl gewechselt.",
    "sudoku.msg.uploads.ready": "{count} eigene(s) Bild(er) verfügbar. Klicken Sie zum Auswählen.",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "sudoku.msg.worksheet.error": "Fehler beim Erstellen des Arbeitsblatts: {message}",
    "sudoku.msg.generate.first": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "sudoku.msg.theme.insufficient": "Thema '{theme}' benötigt mindestens {count} Bilder.",
    "sudoku.msg.select.minimum": "Bitte wählen Sie mindestens {count} Bilder aus oder laden Sie welche hoch.",
    "sudoku.msg.render.error": "Fehler beim Rendern des Arbeitsblatts: {message}",
    "sudoku.msg.clear.theme": "Löschen Sie 'Aus Thema erstellen' zur Einzelbildauswahl.",
    "sudoku.msg.max.selection": "Sie können nur {count} Bilder auswählen.",
    "sudoku.msg.file.error": "Fehler beim Lesen der Datei: {filename}",
    "sudoku.msg.generate.content": "Bitte erstellen Sie zuerst Inhalt für diese Arbeitsfläche.",
    "sudoku.msg.jpeg.error": "Fehler bei der JPEG-Vorbereitung.",
    "sudoku.msg.pdf.error": "Fehler beim Erstellen der PDF-Datei.",
    "sudoku.asset.failed": "{asset}-Bild konnte nicht geladen werden.",

    // ==========================================
    // INFO/STATUS MESSAGES (13 keys)
    // ==========================================
    "sudoku.msg.select.to.begin": "Wählen Sie {REQUIRED_IMAGES} Bilder oder ein Thema zum Starten.",
    "sudoku.msg.loading.animals": "Tiere-Thema wird geladen...",
    "sudoku.msg.searching": "Suche läuft...",
    "sudoku.msg.loading.theme": "Thema wird geladen...",
    "sudoku.msg.no.images": "Keine Bilder gefunden{query}.",
    "sudoku.msg.loading.specific": "Thema '{theme}' wird geladen...",
    "sudoku.msg.theme.selected": "Rätsel wird mit zufälligen Bildern aus dem Thema '{theme}' erstellt.",
    "sudoku.msg.loading.uploads": "{count} Bild(er) werden geladen...",
    "sudoku.msg.preparing": "{filename} wird vorbereitet...",
    "sudoku.asset.select": "Wählen Sie ein Thema für {type}.",
    "sudoku.asset.loading": "{theme} {type} werden geladen...",
    "sudoku.asset.empty": "Keine {type} in diesem Thema.",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "watermarkSmallText": "KOSTENLOSE VERSION"
  },
  "fr": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI (6 keys)
    // ==========================================
    "sudoku.page.title": "Sudoku pour enfants - Créer des sudokus visuels colorés",
    "sudoku.settings.title": "Paramètres du sudoku",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Sudoku pour enfants",
    "sudoku.tab.worksheet": "Fiche d'exercice",
    "sudoku.tab.answer": "Corrigé",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "sudoku.language.select": "Sélectionner la langue",
    "sudoku.language.label": "Langue :",
    "sudoku.language.description": "Les noms d'images et les thèmes s'afficheront dans la langue sélectionnée.",

    // ==========================================
    // PAGE & SCENE SECTION (10 keys)
    // ==========================================
    "sudoku.page.scene.title": "Page et scène",
    "sudoku.page.setup": "Mise en page",
    "sudoku.page.size.label": "Format de page :",
    "page.size.letter.landscape": "Letter Paysage (11×8,5\")",
    "page.size.letter.portrait": "Letter Portrait (8,5×11\")",
    "page.size.a4.landscape": "A4 Paysage (297×210mm)",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.custom": "Personnalisé",
    "sudoku.page.width": "Largeur (px) :",
    "sudoku.page.height": "Hauteur (px) :",
    "sudoku.page.apply": "Appliquer le format",

    // ==========================================
    // BACKGROUND SECTION (6 keys)
    // ==========================================
    "sudoku.background.title": "Arrière-plan",  // CRITICAL - User mentioned
    "sudoku.background.color": "Couleur de base :",
    "sudoku.background.theme.label": "Thème d'arrière-plan :",
    "sudoku.background.none": "Aucun (utiliser la couleur de base)",
    "sudoku.background.select.message": "Sélectionnez un thème pour les arrière-plans.",
    "sudoku.background.opacity": "Opacité de l'arrière-plan :",

    // ==========================================
    // BORDER SECTION (5 keys)
    // ==========================================
    "sudoku.border.title": "Bordure",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Thème de bordure :",
    "common.none": "Aucun",
    "none": "Aucun",
    "none": "Aucun",
    "none": "Aucun",
    "sudoku.border.select.message": "Sélectionnez un thème pour les bordures.",
    "sudoku.border.opacity": "Opacité de la bordure :",

    // ==========================================
    // SUDOKU SETTINGS (5 keys)
    // ==========================================
    "sudoku.difficulty.title": "Niveau de difficulté",
    "sudoku.blanks.label": "Nombre de cases vides :",
    "sudoku.difficulty.easy": "Facile (4 cases vides)",
    "sudoku.difficulty.medium": "Moyen (6 cases vides)",
    "sudoku.difficulty.hard": "Difficile (8 cases vides)",

    // ==========================================
    // TEXT TOOLS (12 keys)
    // ==========================================
    "sudoku.text.tools": "Outils de texte",
    "sudoku.text.add.title": "Ajouter du texte",
    "sudoku.text.content.label": "Contenu :",
    "sudoku.text.placeholder": "Titre, consignes...",
    "sudoku.text.add.button": "Insérer le texte",
    "sudoku.text.properties": "Propriétés du texte sélectionné",
    "sudoku.text.color": "Couleur :",
    "sudoku.text.size": "Taille :",
    "sudoku.text.font": "Police :",
    "sudoku.text.outline.color": "Couleur du contour :",
    "sudoku.text.outline.width": "Épaisseur du contour (0-10) :",
    "sudoku.text.default": "Nouveau texte",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (12 keys)
    // ==========================================
    "sudoku.image.library": "Bibliothèque d'images",
    "sudoku.image.source": "Source d'images pour la grille",
    "sudoku.generate.theme": "Générer à partir du thème :",
    "sudoku.select.individual": "-- Ou sélectionnez des images individuelles ci-dessous --",
    "sudoku.image.individual": "Sélection d'images individuelles",
    "sudoku.filter.theme": "Filtrer par thème :",
    "sudoku.search.label": "Rechercher des images :",
    "sudoku.search.placeholder": "ex. : pomme, voiture",
    "sudoku.available.images": "Images disponibles (4 requises) :",
    "sudoku.loading.images": "Chargement des images...",
    "sudoku.selected.images": "Images sélectionnées :",
    "sudoku.themes.all": "Tous les thèmes",

    // ==========================================
    // UPLOAD SECTION (7 keys)
    // ==========================================
    "sudoku.upload.title": "Importer vos images",
    "sudoku.upload.select": "Sélectionner les images à importer :",
    "sudoku.uploaded.images": "Vos images importées (cette session) :",
    "sudoku.upload.placeholder": "Vos images importées apparaîtront ici.",
    "sudoku.upload.button": "Choisir des fichiers",
    "sudoku.upload.no.file": "Aucun fichier choisi",
    "sudoku.upload.files.selected": "{count} fichier(s) sélectionné(s)",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "toolbar.bring.forward": "Mettre au premier plan",
    "toolbar.send.backward": "Mettre à l'arrière-plan",
    "toolbar.align.selected": "Aligner la sélection :",
    "toolbar.align.page": "Aligner sur la page :",
    "toolbar.layers": "Calques",
    "toolbar.align": "Aligner",
    "toolbar.delete.selected": "Supprimer la sélection",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "sudoku.generate": "Créer",
    "sudoku.generate.worksheet": "Créer la fiche",
    "sudoku.generate.answer": "Créer le corrigé",
    "sudoku.download": "Télécharger",
    "sudoku.download.worksheet.jpeg": "Fiche d'exercice (JPEG)",
    "sudoku.download.answer.jpeg": "Corrigé (JPEG)",
    "sudoku.download.worksheet.pdf": "Fiche d'exercice (PDF)",
    "sudoku.download.answer.pdf": "Corrigé (PDF)",
    "common.grayscale": "Niveaux de gris",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Tout effacer",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "sudoku.msg.worksheet.success": "Fiche d'exercice créée avec succès !",
    "sudoku.msg.answer.generated": "Corrigé créé !",
    "sudoku.msg.download.started": "Téléchargement lancé !",
    "sudoku.msg.pdf.success": "PDF téléchargé !",
    "sudoku.msg.cleared": "Tous les paramètres effacés.",
    "sudoku.msg.individual.mode": "Mode sélection individuelle activé.",
    "sudoku.msg.uploads.ready": "{count} image(s) personnalisée(s) disponible(s). Cliquez pour sélectionner.",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "sudoku.msg.worksheet.error": "Erreur lors de la création de la fiche : {message}",
    "sudoku.msg.generate.first": "Veuillez d'abord créer une fiche d'exercice.",
    "sudoku.msg.theme.insufficient": "Le thème '{theme}' nécessite au moins {count} images.",
    "sudoku.msg.select.minimum": "Veuillez sélectionner au moins {count} images ou en importer.",
    "sudoku.msg.render.error": "Erreur lors du rendu de la fiche : {message}",
    "sudoku.msg.clear.theme": "Effacez 'Générer à partir du thème' pour sélectionner des images individuelles.",
    "sudoku.msg.max.selection": "Vous ne pouvez sélectionner que {count} images.",
    "sudoku.msg.file.error": "Erreur lors de la lecture du fichier : {filename}",
    "sudoku.msg.generate.content": "Veuillez d'abord créer du contenu pour cette zone de travail.",
    "sudoku.msg.jpeg.error": "Erreur lors de la préparation du JPEG.",
    "sudoku.msg.pdf.error": "Erreur lors de la création du PDF.",
    "sudoku.asset.failed": "Impossible de charger l'image {asset}.",

    // ==========================================
    // INFO/STATUS MESSAGES (13 keys)
    // ==========================================
    "sudoku.msg.select.to.begin": "Sélectionnez {REQUIRED_IMAGES} images ou un thème pour commencer.",
    "sudoku.msg.loading.animals": "Chargement du thème animaux...",
    "sudoku.msg.searching": "Recherche en cours...",
    "sudoku.msg.loading.theme": "Chargement du thème...",
    "sudoku.msg.no.images": "Aucune image trouvée{query}.",
    "sudoku.msg.loading.specific": "Chargement du thème '{theme}'...",
    "sudoku.msg.theme.selected": "La grille sera créée avec des images aléatoires du thème '{theme}'.",
    "sudoku.msg.loading.uploads": "Chargement de {count} image(s)...",
    "sudoku.msg.preparing": "Préparation de {filename}...",
    "sudoku.asset.select": "Sélectionnez un thème pour voir {type}.",
    "sudoku.asset.loading": "Chargement {type} {theme}...",
    "sudoku.asset.empty": "Aucun(e) {type} dans ce thème.",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "VERSION GRATUITE - LessonCraftStudio.com",
    "watermarkSmallText": "VERSION GRATUITE"
  },

  "es": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI (6 keys)
    // ==========================================
    "sudoku.page.title": "Sudoku para niños - Crea sudokus visuales coloridos",
    "sudoku.settings.title": "Configuración del sudoku",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Sudoku para niños",
    "sudoku.tab.worksheet": "Hoja de ejercicios",
    "sudoku.tab.answer": "Hoja de respuestas",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "sudoku.language.select": "Seleccionar idioma",
    "sudoku.language.label": "Idioma:",
    "sudoku.language.description": "Los nombres de imágenes y temas aparecerán en el idioma seleccionado.",

    // ==========================================
    // PAGE & SCENE SECTION (10 keys)
    // ==========================================
    "sudoku.page.scene.title": "Página y escenario",
    "sudoku.page.setup": "Configuración de página",
    "sudoku.page.size.label": "Tamaño de página:",
    "page.size.letter.landscape": "Carta Horizontal (11×8,5\")",
    "page.size.letter.portrait": "Carta Vertical (8,5×11\")",
    "page.size.a4.landscape": "A4 Horizontal (297×210mm)",
    "page.size.a4.portrait": "A4 Vertical (210×297mm)",
    "page.size.custom": "Personalizado",
    "sudoku.page.width": "Ancho (px):",
    "sudoku.page.height": "Alto (px):",
    "sudoku.page.apply": "Aplicar formato",

    // ==========================================
    // BACKGROUND SECTION (6 keys)
    // ==========================================
    "sudoku.background.title": "Fondo",  // CRITICAL - User mentioned
    "sudoku.background.color": "Color base:",
    "sudoku.background.theme.label": "Tema de fondo:",
    "sudoku.background.none": "Ninguno (usar color base)",
    "sudoku.background.select.message": "Seleccione un tema para fondos.",
    "sudoku.background.opacity": "Transparencia del fondo:",

    // ==========================================
    // BORDER SECTION (5 keys)
    // ==========================================
    "sudoku.border.title": "Borde",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Tema de borde:",
    "common.none": "Ninguno",
    "none": "Ninguno",
    "none": "Ninguno",
    "none": "Ninguno",
    "sudoku.border.select.message": "Seleccione un tema para bordes.",
    "sudoku.border.opacity": "Transparencia del borde:",

    // ==========================================
    // SUDOKU SETTINGS (5 keys)
    // ==========================================
    "sudoku.difficulty.title": "Nivel de dificultad",
    "sudoku.blanks.label": "Número de casillas vacías:",
    "sudoku.difficulty.easy": "Fácil (4 casillas vacías)",
    "sudoku.difficulty.medium": "Medio (6 casillas vacías)",
    "sudoku.difficulty.hard": "Difícil (8 casillas vacías)",

    // ==========================================
    // TEXT TOOLS (12 keys)
    // ==========================================
    "sudoku.text.tools": "Herramientas de texto",
    "sudoku.text.add.title": "Añadir texto",
    "sudoku.text.content.label": "Contenido:",
    "sudoku.text.placeholder": "Título, instrucciones...",
    "sudoku.text.add.button": "Insertar texto",
    "sudoku.text.properties": "Propiedades del texto seleccionado",
    "sudoku.text.color": "Color:",
    "sudoku.text.size": "Tamaño:",
    "sudoku.text.font": "Fuente:",
    "sudoku.text.outline.color": "Color del contorno:",
    "sudoku.text.outline.width": "Grosor del contorno (0-10):",
    "sudoku.text.default": "Nuevo texto",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (12 keys)
    // ==========================================
    "sudoku.image.library": "Biblioteca de imágenes",
    "sudoku.image.source": "Fuente de imágenes para la cuadrícula",
    "sudoku.generate.theme": "Generar desde tema:",
    "sudoku.select.individual": "-- O seleccione imágenes individuales abajo --",
    "sudoku.image.individual": "Selección individual de imágenes",
    "sudoku.filter.theme": "Filtrar por tema:",
    "sudoku.search.label": "Buscar imágenes:",
    "sudoku.search.placeholder": "ej. manzana, coche",
    "sudoku.available.images": "Imágenes disponibles (4 requeridas):",
    "sudoku.loading.images": "Cargando imágenes...",
    "sudoku.selected.images": "Imágenes seleccionadas:",
    "sudoku.themes.all": "Todos los temas",

    // ==========================================
    // UPLOAD SECTION (7 keys)
    // ==========================================
    "sudoku.upload.title": "Suba sus propias imágenes",
    "sudoku.upload.select": "Seleccionar imagen(es) para subir:",
    "sudoku.uploaded.images": "Sus imágenes subidas (esta sesión):",
    "sudoku.upload.placeholder": "Sus imágenes subidas aparecerán aquí.",
    "sudoku.upload.button": "Elegir archivos",
    "sudoku.upload.no.file": "Ningún archivo seleccionado",
    "sudoku.upload.files.selected": "{count} archivo(s) seleccionado(s)",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "toolbar.bring.forward": "Traer al frente",
    "toolbar.send.backward": "Enviar atrás",
    "toolbar.align.selected": "Alinear seleccionado:",
    "toolbar.align.page": "Alinear a página:",
    "toolbar.layers": "Capas",
    "toolbar.align": "Alinear",
    "toolbar.delete.selected": "Eliminar seleccionado",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "sudoku.generate": "Generar",
    "sudoku.generate.worksheet": "Generar hoja de ejercicios",
    "sudoku.generate.answer": "Generar hoja de respuestas",
    "sudoku.download": "Descargar",
    "sudoku.download.worksheet.jpeg": "Hoja de ejercicios (JPEG)",
    "sudoku.download.answer.jpeg": "Hoja de respuestas (JPEG)",
    "sudoku.download.worksheet.pdf": "Hoja de ejercicios (PDF)",
    "sudoku.download.answer.pdf": "Hoja de respuestas (PDF)",
    "common.grayscale": "Escala de grises",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Borrar todo",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "sudoku.msg.worksheet.success": "¡Hoja de ejercicios creada con éxito!",
    "sudoku.msg.answer.generated": "¡Hoja de respuestas generada!",
    "sudoku.msg.download.started": "¡Descarga iniciada!",
    "sudoku.msg.pdf.success": "¡PDF descargado!",
    "sudoku.msg.cleared": "Configuración borrada.",
    "sudoku.msg.individual.mode": "Modo de selección individual activado.",
    "sudoku.msg.uploads.ready": "{count} imagen(es) propia(s) disponible(s). Haga clic para seleccionar.",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "sudoku.msg.worksheet.error": "Error al generar la hoja de ejercicios: {message}",
    "sudoku.msg.generate.first": "Por favor, genere primero una hoja de ejercicios.",
    "sudoku.msg.theme.insufficient": "El tema '{theme}' necesita al menos {count} imágenes.",
    "sudoku.msg.select.minimum": "Por favor, seleccione o suba al menos {count} imágenes.",
    "sudoku.msg.render.error": "Error al renderizar la hoja de ejercicios: {message}",
    "sudoku.msg.clear.theme": "Desactive 'Generar desde tema' para seleccionar imágenes individuales.",
    "sudoku.msg.max.selection": "Solo puede seleccionar {count} imágenes.",
    "sudoku.msg.file.error": "Error al leer el archivo: {filename}",
    "sudoku.msg.generate.content": "Por favor, genere primero contenido para este lienzo.",
    "sudoku.msg.jpeg.error": "Error al preparar el JPEG.",
    "sudoku.msg.pdf.error": "Error al crear el PDF.",
    "sudoku.asset.failed": "No se pudo cargar la imagen {asset}.",

    // ==========================================
    // INFO/STATUS MESSAGES (13 keys)
    // ==========================================
    "sudoku.msg.select.to.begin": "Seleccione {REQUIRED_IMAGES} imágenes o un tema para comenzar.",
    "sudoku.msg.loading.animals": "Cargando tema de animales...",
    "sudoku.msg.searching": "Buscando...",
    "sudoku.msg.loading.theme": "Cargando tema...",
    "sudoku.msg.no.images": "No se encontraron imágenes{query}.",
    "sudoku.msg.loading.specific": "Cargando tema '{theme}'...",
    "sudoku.msg.theme.selected": "El puzle se generará con imágenes aleatorias del tema '{theme}'.",
    "sudoku.msg.loading.uploads": "Cargando {count} imagen(es)...",
    "sudoku.msg.preparing": "Preparando {filename}...",
    "sudoku.asset.select": "Seleccione un tema para ver {type}.",
    "sudoku.asset.loading": "Cargando {type} de {theme}...",
    "sudoku.asset.empty": "No hay {type} en este tema.",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "VERSIÓN GRATUITA - LessonCraftStudio.com",
    "watermarkSmallText": "VERSIÓN GRATUITA"
  },

  "it": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI (6 keys)
    // ==========================================
    "sudoku.page.title": "Sudoku per bambini - Crea colorati sudoku visivi",
    "sudoku.settings.title": "Impostazioni sudoku",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Sudoku per bambini",
    "sudoku.tab.worksheet": "Scheda di lavoro",
    "sudoku.tab.answer": "Soluzioni",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "sudoku.language.select": "Seleziona lingua",
    "sudoku.language.label": "Lingua:",
    "sudoku.language.description": "I nomi delle immagini e i temi appariranno nella lingua selezionata.",

    // ==========================================
    // PAGE & SCENE SECTION (10 keys)
    // ==========================================
    "sudoku.page.scene.title": "Pagina e scena",
    "sudoku.page.setup": "Formato pagina",
    "sudoku.page.size.label": "Dimensione pagina:",
    "page.size.letter.landscape": "Letter Orizzontale (11×8,5\")",
    "page.size.letter.portrait": "Letter Verticale (8,5×11\")",
    "page.size.a4.landscape": "A4 Orizzontale (297×210mm)",
    "page.size.a4.portrait": "A4 Verticale (210×297mm)",
    "page.size.custom": "Personalizzato",
    "sudoku.page.width": "Larghezza (px):",
    "sudoku.page.height": "Altezza (px):",
    "sudoku.page.apply": "Applica formato",

    // ==========================================
    // BACKGROUND SECTION (6 keys)
    // ==========================================
    "sudoku.background.title": "Sfondo",  // CRITICAL - User mentioned
    "sudoku.background.color": "Colore base:",
    "sudoku.background.theme.label": "Tema sfondo:",
    "sudoku.background.none": "Nessuno (usa colore base)",
    "sudoku.background.select.message": "Seleziona un tema per gli sfondi.",
    "sudoku.background.opacity": "Trasparenza sfondo:",

    // ==========================================
    // BORDER SECTION (5 keys)
    // ==========================================
    "sudoku.border.title": "Bordo",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Tema bordo:",
    "common.none": "Nessuno",
    "none": "Nessuno",
    "none": "Nessuno",
    "none": "Nessuno",
    "sudoku.border.select.message": "Seleziona un tema per i bordi.",
    "sudoku.border.opacity": "Trasparenza bordo:",

    // ==========================================
    // SUDOKU SETTINGS (5 keys)
    // ==========================================
    "sudoku.difficulty.title": "Livello di difficoltà",
    "sudoku.blanks.label": "Numero di caselle vuote:",
    "sudoku.difficulty.easy": "Facile (4 caselle vuote)",
    "sudoku.difficulty.medium": "Medio (6 caselle vuote)",
    "sudoku.difficulty.hard": "Difficile (8 caselle vuote)",

    // ==========================================
    // TEXT TOOLS (12 keys)
    // ==========================================
    "sudoku.text.tools": "Strumenti testo",
    "sudoku.text.add.title": "Aggiungi testo",
    "sudoku.text.content.label": "Contenuto:",
    "sudoku.text.placeholder": "Titolo, istruzioni...",
    "sudoku.text.add.button": "Inserisci testo",
    "sudoku.text.properties": "Proprietà del testo selezionato",
    "sudoku.text.color": "Colore:",
    "sudoku.text.size": "Dimensione:",
    "sudoku.text.font": "Carattere:",
    "sudoku.text.outline.color": "Colore contorno:",
    "sudoku.text.outline.width": "Spessore contorno (0-10):",
    "sudoku.text.default": "Nuovo testo",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (12 keys)
    // ==========================================
    "sudoku.image.library": "Raccolta immagini",
    "sudoku.image.source": "Fonte immagini per la griglia",
    "sudoku.generate.theme": "Genera dal tema:",
    "sudoku.select.individual": "-- Oppure seleziona immagini singole qui sotto --",
    "sudoku.image.individual": "Selezione immagini singole",
    "sudoku.filter.theme": "Filtra per tema:",
    "sudoku.search.label": "Cerca immagini:",
    "sudoku.search.placeholder": "es. mela, auto",
    "sudoku.available.images": "Immagini disponibili (4 richieste):",
    "sudoku.loading.images": "Caricamento immagini...",
    "sudoku.selected.images": "Immagini selezionate:",
    "sudoku.themes.all": "Tutti i temi",

    // ==========================================
    // UPLOAD SECTION (7 keys)
    // ==========================================
    "sudoku.upload.title": "Carica le tue immagini",
    "sudoku.upload.select": "Seleziona immagine/i da caricare:",
    "sudoku.uploaded.images": "Le tue immagini caricate (questa sessione):",
    "sudoku.upload.placeholder": "Le tue immagini caricate appariranno qui.",
    "sudoku.upload.button": "Scegli file",
    "sudoku.upload.no.file": "Nessun file scelto",
    "sudoku.upload.files.selected": "{count} file selezionato/i",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "toolbar.bring.forward": "Porta avanti",
    "toolbar.send.backward": "Porta indietro",
    "toolbar.align.selected": "Allinea selezionato:",
    "toolbar.align.page": "Allinea alla pagina:",
    "toolbar.layers": "Livelli",
    "toolbar.align": "Allinea",
    "toolbar.delete.selected": "Elimina selezionato",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "sudoku.generate": "Crea",
    "sudoku.generate.worksheet": "Crea scheda di lavoro",
    "sudoku.generate.answer": "Genera soluzioni",
    "sudoku.download": "Scarica",
    "sudoku.download.worksheet.jpeg": "Scheda di lavoro (JPEG)",
    "sudoku.download.answer.jpeg": "Soluzioni (JPEG)",
    "sudoku.download.worksheet.pdf": "Scheda di lavoro (PDF)",
    "sudoku.download.answer.pdf": "Soluzioni (PDF)",
    "common.grayscale": "Scala di grigi",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Cancella tutto",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "sudoku.msg.worksheet.success": "Scheda creata con successo!",
    "sudoku.msg.answer.generated": "Soluzioni generate!",
    "sudoku.msg.download.started": "Download avviato!",
    "sudoku.msg.pdf.success": "PDF scaricato!",
    "sudoku.msg.cleared": "Tutte le impostazioni cancellate.",
    "sudoku.msg.individual.mode": "Modalità selezione singola attivata.",
    "sudoku.msg.uploads.ready": "{count} immagine/i personalizzata/e disponibile/i. Clicca per selezionare.",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "sudoku.msg.worksheet.error": "Errore nella creazione della scheda: {message}",
    "sudoku.msg.generate.first": "Prima genera una scheda di lavoro.",
    "sudoku.msg.theme.insufficient": "Il tema '{theme}' richiede almeno {count} immagini.",
    "sudoku.msg.select.minimum": "Seleziona o carica almeno {count} immagini.",
    "sudoku.msg.render.error": "Errore nel rendering della scheda: {message}",
    "sudoku.msg.clear.theme": "Disattiva 'Genera dal tema' per selezionare immagini singole.",
    "sudoku.msg.max.selection": "Puoi selezionare solo {count} immagini.",
    "sudoku.msg.file.error": "Errore nella lettura del file: {filename}",
    "sudoku.msg.generate.content": "Prima genera contenuto per questa area di lavoro.",
    "sudoku.msg.jpeg.error": "Errore nella preparazione del JPEG.",
    "sudoku.msg.pdf.error": "Errore nella creazione del PDF.",
    "sudoku.asset.failed": "Impossibile caricare l'immagine {asset}.",

    // ==========================================
    // INFO/STATUS MESSAGES (13 keys)
    // ==========================================
    "sudoku.msg.select.to.begin": "Seleziona {REQUIRED_IMAGES} immagini o un tema per iniziare.",
    "sudoku.msg.loading.animals": "Caricamento tema animali...",
    "sudoku.msg.searching": "Ricerca in corso...",
    "sudoku.msg.loading.theme": "Caricamento tema...",
    "sudoku.msg.no.images": "Nessuna immagine trovata{query}.",
    "sudoku.msg.loading.specific": "Caricamento tema '{theme}'...",
    "sudoku.msg.theme.selected": "Il puzzle verrà generato con immagini casuali dal tema '{theme}'.",
    "sudoku.msg.loading.uploads": "Caricamento di {count} immagine/i...",
    "sudoku.msg.preparing": "Preparazione {filename}...",
    "sudoku.asset.select": "Seleziona un tema per vedere {type}.",
    "sudoku.asset.loading": "Caricamento {type} {theme}...",
    "sudoku.asset.empty": "Nessun {type} in questo tema.",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "VERSIONE GRATUITA - LessonCraftStudio.com",
    "watermarkSmallText": "VERSIONE GRATUITA"
  },

  "pt": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI (6 keys)
    // ==========================================
    "sudoku.page.title": "Sudoku para crianças - Crie sudokus visuais coloridos",
    "sudoku.settings.title": "Configurações do sudoku",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Sudoku para crianças",
    "sudoku.tab.worksheet": "Folha de exercícios",
    "sudoku.tab.answer": "Folha de respostas",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "sudoku.language.select": "Selecionar idioma",
    "sudoku.language.label": "Idioma:",
    "sudoku.language.description": "Os nomes das imagens e temas aparecerão no idioma selecionado.",

    // ==========================================
    // PAGE & SCENE SECTION (10 keys)
    // ==========================================
    "sudoku.page.scene.title": "Página e cenário",
    "sudoku.page.setup": "Configuração da página",
    "sudoku.page.size.label": "Tamanho da página:",
    "page.size.letter.landscape": "Carta Horizontal (11×8,5\")",
    "page.size.letter.portrait": "Carta Vertical (8,5×11\")",
    "page.size.a4.landscape": "A4 Horizontal (297×210mm)",
    "page.size.a4.portrait": "A4 Vertical (210×297mm)",
    "page.size.custom": "Personalizado",
    "sudoku.page.width": "Largura (px):",
    "sudoku.page.height": "Altura (px):",
    "sudoku.page.apply": "Aplicar formato",

    // ==========================================
    // BACKGROUND SECTION (6 keys)
    // ==========================================
    "sudoku.background.title": "Fundo",  // CRITICAL - User mentioned
    "sudoku.background.color": "Cor base:",
    "sudoku.background.theme.label": "Tema de fundo:",
    "sudoku.background.none": "Nenhum (usar cor base)",
    "sudoku.background.select.message": "Selecione um tema para fundos.",
    "sudoku.background.opacity": "Opacidade do fundo:",

    // ==========================================
    // BORDER SECTION (5 keys)
    // ==========================================
    "sudoku.border.title": "Borda",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Tema de borda:",
    "common.none": "Nenhum",
    "none": "Nenhum",
    "none": "Nenhum",
    "none": "Nenhum",
    "sudoku.border.select.message": "Selecione um tema para bordas.",
    "sudoku.border.opacity": "Opacidade da borda:",

    // ==========================================
    // SUDOKU SETTINGS (5 keys)
    // ==========================================
    "sudoku.difficulty.title": "Nível de dificuldade",
    "sudoku.blanks.label": "Número de células vazias:",
    "sudoku.difficulty.easy": "Fácil (4 células vazias)",
    "sudoku.difficulty.medium": "Médio (6 células vazias)",
    "sudoku.difficulty.hard": "Difícil (8 células vazias)",

    // ==========================================
    // TEXT TOOLS (12 keys)
    // ==========================================
    "sudoku.text.tools": "Ferramentas de texto",
    "sudoku.text.add.title": "Adicionar texto",
    "sudoku.text.content.label": "Conteúdo:",
    "sudoku.text.placeholder": "Título, instruções...",
    "sudoku.text.add.button": "Inserir texto",
    "sudoku.text.properties": "Propriedades do texto selecionado",
    "sudoku.text.color": "Cor:",
    "sudoku.text.size": "Tamanho:",
    "sudoku.text.font": "Fonte:",
    "sudoku.text.outline.color": "Cor do contorno:",
    "sudoku.text.outline.width": "Espessura do contorno (0-10):",
    "sudoku.text.default": "Novo texto",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (12 keys)
    // ==========================================
    "sudoku.image.library": "Biblioteca de imagens",
    "sudoku.image.source": "Fonte de imagens para a grelha",
    "sudoku.generate.theme": "Gerar do tema:",
    "sudoku.select.individual": "-- Ou selecione imagens individuais abaixo --",
    "sudoku.image.individual": "Seleção individual de imagens",
    "sudoku.filter.theme": "Filtrar por tema:",
    "sudoku.search.label": "Procurar imagens:",
    "sudoku.search.placeholder": "ex. maçã, carro",
    "sudoku.available.images": "Imagens disponíveis (4 necessárias):",
    "sudoku.loading.images": "A carregar imagens...",
    "sudoku.selected.images": "Imagens selecionadas:",
    "sudoku.themes.all": "Todos os temas",

    // ==========================================
    // UPLOAD SECTION (7 keys)
    // ==========================================
    "sudoku.upload.title": "Carregue suas próprias imagens",
    "sudoku.upload.select": "Selecionar imagem(ns) para carregar:",
    "sudoku.uploaded.images": "Suas imagens carregadas (esta sessão):",
    "sudoku.upload.placeholder": "Suas imagens carregadas aparecerão aqui.",
    "sudoku.upload.button": "Escolher ficheiros",
    "sudoku.upload.no.file": "Nenhum ficheiro escolhido",
    "sudoku.upload.files.selected": "{count} ficheiro(s) selecionado(s)",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "toolbar.bring.forward": "Trazer para frente",
    "toolbar.send.backward": "Enviar para trás",
    "toolbar.align.selected": "Alinhar selecionado:",
    "toolbar.align.page": "Alinhar à página:",
    "toolbar.layers": "Camadas",
    "toolbar.align": "Alinhar",
    "toolbar.delete.selected": "Eliminar selecionado",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "sudoku.generate": "Gerar",
    "sudoku.generate.worksheet": "Gerar folha de exercícios",
    "sudoku.generate.answer": "Gerar folha de respostas",
    "sudoku.download": "Descarregar",
    "sudoku.download.worksheet.jpeg": "Folha de exercícios (JPEG)",
    "sudoku.download.answer.jpeg": "Folha de respostas (JPEG)",
    "sudoku.download.worksheet.pdf": "Folha de exercícios (PDF)",
    "sudoku.download.answer.pdf": "Folha de respostas (PDF)",
    "common.grayscale": "Escala de cinza",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Limpar tudo",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "sudoku.msg.worksheet.success": "Folha de exercícios criada com sucesso!",
    "sudoku.msg.answer.generated": "Folha de respostas gerada!",
    "sudoku.msg.download.started": "Download iniciado!",
    "sudoku.msg.pdf.success": "PDF descarregado!",
    "sudoku.msg.cleared": "Todas as configurações limpas.",
    "sudoku.msg.individual.mode": "Modo de seleção individual ativado.",
    "sudoku.msg.uploads.ready": "{count} imagem(ns) personalizada(s) disponível(is). Clique para selecionar.",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "sudoku.msg.worksheet.error": "Erro ao gerar a folha de exercícios: {message}",
    "sudoku.msg.generate.first": "Por favor, gere primeiro uma folha de exercícios.",
    "sudoku.msg.theme.insufficient": "O tema '{theme}' precisa de pelo menos {count} imagens.",
    "sudoku.msg.select.minimum": "Por favor, selecione ou carregue pelo menos {count} imagens.",
    "sudoku.msg.render.error": "Erro ao renderizar a folha de exercícios: {message}",
    "sudoku.msg.clear.theme": "Desative 'Gerar a partir do tema' para selecionar imagens individuais.",
    "sudoku.msg.max.selection": "Você pode selecionar apenas {count} imagens.",
    "sudoku.msg.file.error": "Erro ao ler o arquivo: {filename}",
    "sudoku.msg.generate.content": "Por favor, gere primeiro conteúdo para esta área de trabalho.",
    "sudoku.msg.jpeg.error": "Erro ao preparar o JPEG.",
    "sudoku.msg.pdf.error": "Erro ao criar o PDF.",
    "sudoku.asset.failed": "Não foi possível carregar a imagem {asset}.",

    // ==========================================
    // INFO/STATUS MESSAGES (13 keys)
    // ==========================================
    "sudoku.msg.select.to.begin": "Selecione {REQUIRED_IMAGES} imagens ou um tema para começar.",
    "sudoku.msg.loading.animals": "A carregar tema de animais...",
    "sudoku.msg.searching": "A procurar...",
    "sudoku.msg.loading.theme": "A carregar tema...",
    "sudoku.msg.no.images": "Nenhuma imagem encontrada{query}.",
    "sudoku.msg.loading.specific": "A carregar tema '{theme}'...",
    "sudoku.msg.theme.selected": "O puzzle será gerado com imagens aleatórias do tema '{theme}'.",
    "sudoku.msg.loading.uploads": "A carregar {count} imagem(ns)...",
    "sudoku.msg.preparing": "A preparar {filename}...",
    "sudoku.asset.select": "Selecione um tema para ver {type}.",
    "sudoku.asset.loading": "A carregar {type} de {theme}...",
    "sudoku.asset.empty": "Sem {type} neste tema.",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "VERSÃO GRATUITA - LessonCraftStudio.com",
    "watermarkSmallText": "VERSÃO GRATUITA"
  },

  "nl": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI (6 keys)
    // ==========================================
    "sudoku.page.title": "Kinder-sudoku - Maak kleurrijke beeldsudoku's",
    "sudoku.settings.title": "Sudoku-instellingen",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Kinder-sudoku",
    "sudoku.tab.worksheet": "Werkblad",
    "sudoku.tab.answer": "Antwoordblad",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "sudoku.language.select": "Selecteer taal",
    "sudoku.language.label": "Taal:",
    "sudoku.language.description": "Afbeeldingsnamen en thema's worden weergegeven in de geselecteerde taal.",

    // ==========================================
    // PAGE & SCENE SECTION (10 keys)
    // ==========================================
    "sudoku.page.scene.title": "Pagina en scène",
    "sudoku.page.setup": "Pagina-instelling",
    "sudoku.page.size.label": "Paginaformaat:",
    "page.size.letter.landscape": "Letter Liggend (11×8,5\")",
    "page.size.letter.portrait": "Letter Staand (8,5×11\")",
    "page.size.a4.landscape": "A4 Liggend (297×210mm)",
    "page.size.a4.portrait": "A4 Staand (210×297mm)",
    "page.size.custom": "Aangepast",
    "sudoku.page.width": "Breedte (px):",
    "sudoku.page.height": "Hoogte (px):",
    "sudoku.page.apply": "Formaat toepassen",

    // ==========================================
    // BACKGROUND SECTION (6 keys)
    // ==========================================
    "sudoku.background.title": "Achtergrond",  // CRITICAL - User mentioned
    "sudoku.background.color": "Basiskleur:",
    "sudoku.background.theme.label": "Achtergrondthema:",
    "sudoku.background.none": "Geen (gebruik basiskleur)",
    "sudoku.background.select.message": "Selecteer een thema voor achtergronden.",
    "sudoku.background.opacity": "Achtergrondtransparantie:",

    // ==========================================
    // BORDER SECTION (5 keys)
    // ==========================================
    "sudoku.border.title": "Rand",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Randthema:",
    "common.none": "Geen",
    "none": "Geen",
    "none": "Geen",
    "none": "Geen",
    "sudoku.border.select.message": "Selecteer een thema voor randen.",
    "sudoku.border.opacity": "Randtransparantie:",

    // ==========================================
    // SUDOKU SETTINGS (5 keys)
    // ==========================================
    "sudoku.difficulty.title": "Moeilijkheidsgraad",
    "sudoku.blanks.label": "Aantal lege vakjes:",
    "sudoku.difficulty.easy": "Makkelijk (4 lege vakjes)",
    "sudoku.difficulty.medium": "Gemiddeld (6 lege vakjes)",
    "sudoku.difficulty.hard": "Moeilijk (8 lege vakjes)",

    // ==========================================
    // TEXT TOOLS (12 keys)
    // ==========================================
    "sudoku.text.tools": "Tekstgereedschap",
    "sudoku.text.add.title": "Tekst toevoegen",
    "sudoku.text.content.label": "Inhoud:",
    "sudoku.text.placeholder": "Titel, instructies...",
    "sudoku.text.add.button": "Tekst invoegen",
    "sudoku.text.properties": "Eigenschappen van geselecteerde tekst",
    "sudoku.text.color": "Kleur:",
    "sudoku.text.size": "Grootte:",
    "sudoku.text.font": "Lettertype:",
    "sudoku.text.outline.color": "Omlijningskleur:",
    "sudoku.text.outline.width": "Omlijningsdikte (0-10):",
    "sudoku.text.default": "Nieuwe tekst",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (12 keys)
    // ==========================================
    "sudoku.image.library": "Afbeeldingencollectie",
    "sudoku.image.source": "Afbeeldingsbron voor rooster",
    "sudoku.generate.theme": "Genereren uit thema:",
    "sudoku.select.individual": "-- Of selecteer losse afbeeldingen hieronder --",
    "sudoku.image.individual": "Losse afbeeldingen selecteren",
    "sudoku.filter.theme": "Filteren op thema:",
    "sudoku.search.label": "Zoek afbeeldingen:",
    "sudoku.search.placeholder": "bijv. appel, auto",
    "sudoku.available.images": "Beschikbare afbeeldingen (4 vereist):",
    "sudoku.loading.images": "Afbeeldingen laden...",
    "sudoku.selected.images": "Geselecteerde afbeeldingen:",
    "sudoku.themes.all": "Alle thema's",

    // ==========================================
    // UPLOAD SECTION (7 keys)
    // ==========================================
    "sudoku.upload.title": "Upload je eigen afbeeldingen",
    "sudoku.upload.select": "Selecteer afbeelding(en) om te uploaden:",
    "sudoku.uploaded.images": "Je geüploade afbeeldingen (deze sessie):",
    "sudoku.upload.placeholder": "Je geüploade afbeeldingen verschijnen hier.",
    "sudoku.upload.button": "Bestanden kiezen",
    "sudoku.upload.no.file": "Geen bestand gekozen",
    "sudoku.upload.files.selected": "{count} bestand(en) geselecteerd",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "toolbar.bring.forward": "Naar voren",
    "toolbar.send.backward": "Naar achteren",
    "toolbar.align.selected": "Geselecteerde uitlijnen:",
    "toolbar.align.page": "Uitlijnen naar pagina:",
    "toolbar.layers": "Lagen",
    "toolbar.align": "Uitlijnen",
    "toolbar.delete.selected": "Geselecteerde verwijderen",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "sudoku.generate": "Genereren",
    "sudoku.generate.worksheet": "Werkblad genereren",
    "sudoku.generate.answer": "Antwoordblad genereren",
    "sudoku.download": "Download",
    "sudoku.download.worksheet.jpeg": "Werkblad (JPEG)",
    "sudoku.download.answer.jpeg": "Antwoordblad (JPEG)",
    "sudoku.download.worksheet.pdf": "Werkblad (PDF)",
    "sudoku.download.answer.pdf": "Antwoordblad (PDF)",
    "common.grayscale": "Grijstinten",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Alles wissen",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "sudoku.msg.worksheet.success": "Werkblad succesvol aangemaakt!",
    "sudoku.msg.answer.generated": "Antwoordblad gemaakt!",
    "sudoku.msg.download.started": "Download gestart!",
    "sudoku.msg.pdf.success": "PDF gedownload!",
    "sudoku.msg.cleared": "Alle instellingen gewist.",
    "sudoku.msg.individual.mode": "Losse selectiemodus geactiveerd.",
    "sudoku.msg.uploads.ready": "{count} eigen afbeelding(en) beschikbaar. Klik om te selecteren.",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "sudoku.msg.worksheet.error": "Fout bij aanmaken werkblad: {message}",
    "sudoku.msg.generate.first": "Maak eerst een werkblad aan.",
    "sudoku.msg.theme.insufficient": "Thema '{theme}' heeft minstens {count} afbeeldingen nodig.",
    "sudoku.msg.select.minimum": "Selecteer of upload minstens {count} afbeeldingen.",
    "sudoku.msg.render.error": "Fout bij weergeven werkblad: {message}",
    "sudoku.msg.clear.theme": "Schakel 'Genereren uit thema' uit voor losse selectie.",
    "sudoku.msg.max.selection": "Je kunt maar {count} afbeeldingen selecteren.",
    "sudoku.msg.file.error": "Fout bij lezen bestand: {filename}",
    "sudoku.msg.generate.content": "Maak eerst inhoud voor dit werkgebied.",
    "sudoku.msg.jpeg.error": "Fout bij voorbereiden JPEG.",
    "sudoku.msg.pdf.error": "Fout bij aanmaken PDF.",
    "sudoku.asset.failed": "Kan afbeelding {asset} niet laden.",

    // ==========================================
    // INFO/STATUS MESSAGES (13 keys)
    // ==========================================
    "sudoku.msg.select.to.begin": "Selecteer {REQUIRED_IMAGES} afbeeldingen of een thema om te beginnen.",
    "sudoku.msg.loading.animals": "Dierenthema laden...",
    "sudoku.msg.searching": "Zoeken...",
    "sudoku.msg.loading.theme": "Thema laden...",
    "sudoku.msg.no.images": "Geen afbeeldingen gevonden{query}.",
    "sudoku.msg.loading.specific": "Thema '{theme}' laden...",
    "sudoku.msg.theme.selected": "De puzzel wordt gemaakt met willekeurige afbeeldingen uit thema '{theme}'.",
    "sudoku.msg.loading.uploads": "{count} afbeelding(en) laden...",
    "sudoku.msg.preparing": "{filename} voorbereiden...",
    "sudoku.asset.select": "Selecteer een thema om {type} te zien.",
    "sudoku.asset.loading": "{theme} {type} laden...",
    "sudoku.asset.empty": "Geen {type} in dit thema.",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "GRATIS VERSIE - LessonCraftStudio.com",
    "watermarkSmallText": "GRATIS VERSIE"
  },

  "sv": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI (6 keys)
    // ==========================================
    "sudoku.page.title": "Sudoku för barn - Skapa färgglada bildsudoku",
    "sudoku.settings.title": "Sudokuinställningar",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Sudoku för barn",
    "sudoku.tab.worksheet": "Arbetsblad",
    "sudoku.tab.answer": "Facit",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "sudoku.language.select": "Välj språk",
    "sudoku.language.label": "Språk:",
    "sudoku.language.description": "Bildnamn och teman visas på det valda språket.",

    // ==========================================
    // PAGE & SCENE SECTION (10 keys)
    // ==========================================
    "sudoku.page.scene.title": "Sida och scen",
    "sudoku.page.setup": "Sidformat",
    "sudoku.page.size.label": "Sidstorlek:",
    "page.size.letter.landscape": "Letter Liggande (11×8,5\")",
    "page.size.letter.portrait": "Letter Stående (8,5×11\")",
    "page.size.a4.landscape": "A4 Liggande (297×210mm)",
    "page.size.a4.portrait": "A4 Stående (210×297mm)",
    "page.size.custom": "Anpassad",
    "sudoku.page.width": "Bredd (px):",
    "sudoku.page.height": "Höjd (px):",
    "sudoku.page.apply": "Använd format",

    // ==========================================
    // BACKGROUND SECTION (6 keys)
    // ==========================================
    "sudoku.background.title": "Bakgrund",  // CRITICAL - User mentioned
    "sudoku.background.color": "Grundfärg:",
    "sudoku.background.theme.label": "Bakgrundstema:",
    "sudoku.background.none": "Ingen (använd grundfärg)",
    "sudoku.background.select.message": "Välj ett tema för bakgrunder.",
    "sudoku.background.opacity": "Bakgrundens transparens:",

    // ==========================================
    // BORDER SECTION (5 keys)
    // ==========================================
    "sudoku.border.title": "Ram",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Ramtema:",
    "common.none": "Ingen",
    "none": "Ingen",
    "none": "Ingen",
    "none": "Ingen",
    "sudoku.border.select.message": "Välj ett tema för ramar.",
    "sudoku.border.opacity": "Ramens transparens:",

    // ==========================================
    // SUDOKU SETTINGS (5 keys)
    // ==========================================
    "sudoku.difficulty.title": "Svårighetsgrad",
    "sudoku.blanks.label": "Antal tomma rutor:",
    "sudoku.difficulty.easy": "Lätt (4 tomma rutor)",
    "sudoku.difficulty.medium": "Medel (6 tomma rutor)",
    "sudoku.difficulty.hard": "Svår (8 tomma rutor)",

    // ==========================================
    // TEXT TOOLS (12 keys)
    // ==========================================
    "sudoku.text.tools": "Textverktyg",
    "sudoku.text.add.title": "Lägg till text",
    "sudoku.text.content.label": "Innehåll:",
    "sudoku.text.placeholder": "Rubrik, instruktioner...",
    "sudoku.text.add.button": "Infoga text",
    "sudoku.text.properties": "Egenskaper för markerad text",
    "sudoku.text.color": "Färg:",
    "sudoku.text.size": "Storlek:",
    "sudoku.text.font": "Typsnitt:",
    "sudoku.text.outline.color": "Konturfärg:",
    "sudoku.text.outline.width": "Konturtjocklek (0-10):",
    "sudoku.text.default": "Ny text",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (12 keys)
    // ==========================================
    "sudoku.image.library": "Bildsamling",
    "sudoku.image.source": "Bildkälla för rutnätet",
    "sudoku.generate.theme": "Skapa från tema:",
    "sudoku.select.individual": "-- Eller välj enskilda bilder nedan --",
    "sudoku.image.individual": "Val av enskilda bilder",
    "sudoku.filter.theme": "Filtrera efter tema:",
    "sudoku.search.label": "Sök bilder:",
    "sudoku.search.placeholder": "t.ex. äpple, bil",
    "sudoku.available.images": "Tillgängliga bilder (4 krävs):",
    "sudoku.loading.images": "Laddar bilder...",
    "sudoku.selected.images": "Valda bilder:",
    "sudoku.themes.all": "Alla teman",

    // ==========================================
    // UPLOAD SECTION (7 keys)
    // ==========================================
    "sudoku.upload.title": "Ladda upp egna bilder",
    "sudoku.upload.select": "Välj bild(er) att ladda upp:",
    "sudoku.uploaded.images": "Dina uppladdade bilder (denna session):",
    "sudoku.upload.placeholder": "Dina uppladdade bilder visas här.",
    "sudoku.upload.button": "Välj filer",
    "sudoku.upload.no.file": "Ingen fil vald",
    "sudoku.upload.files.selected": "{count} fil(er) valda",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "toolbar.bring.forward": "Flytta framåt",
    "toolbar.send.backward": "Flytta bakåt",
    "toolbar.align.selected": "Justera markerat:",
    "toolbar.align.page": "Justera till sida:",
    "toolbar.layers": "Lager",
    "toolbar.align": "Justera",
    "toolbar.delete.selected": "Ta bort markerad",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "sudoku.generate": "Skapa",
    "sudoku.generate.worksheet": "Skapa arbetsblad",
    "sudoku.generate.answer": "Skapa facit",
    "sudoku.download": "Ladda ner",
    "sudoku.download.worksheet.jpeg": "Arbetsblad (JPEG)",
    "sudoku.download.answer.jpeg": "Facit (JPEG)",
    "sudoku.download.worksheet.pdf": "Arbetsblad (PDF)",
    "sudoku.download.answer.pdf": "Facit (PDF)",
    "common.grayscale": "Gråskala",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Rensa allt",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "sudoku.msg.worksheet.success": "Arbetsblad skapat!",
    "sudoku.msg.answer.generated": "Facit skapat!",
    "sudoku.msg.download.started": "Nedladdning startad!",
    "sudoku.msg.pdf.success": "PDF nedladdad!",
    "sudoku.msg.cleared": "Alla inställningar rensade.",
    "sudoku.msg.individual.mode": "Läge för enskilda bilder aktiverat.",
    "sudoku.msg.uploads.ready": "{count} egen(a) bild(er) tillgänglig(a). Klicka för att välja.",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "sudoku.msg.worksheet.error": "Fel vid skapande av arbetsblad: {message}",
    "sudoku.msg.generate.first": "Skapa först ett arbetsblad.",
    "sudoku.msg.theme.insufficient": "Temat '{theme}' behöver minst {count} bilder.",
    "sudoku.msg.select.minimum": "Välj eller ladda upp minst {count} bilder.",
    "sudoku.msg.render.error": "Fel vid rendering av arbetsblad: {message}",
    "sudoku.msg.clear.theme": "Avmarkera 'Skapa från tema' för att välja enskilda bilder.",
    "sudoku.msg.max.selection": "Du kan bara välja {count} bilder.",
    "sudoku.msg.file.error": "Fel vid läsning av fil: {filename}",
    "sudoku.msg.generate.content": "Skapa först innehåll för denna arbetsyta.",
    "sudoku.msg.jpeg.error": "Fel vid förberedelse av JPEG.",
    "sudoku.msg.pdf.error": "Fel vid skapande av PDF.",
    "sudoku.asset.failed": "Kunde inte ladda bilden {asset}.",

    // ==========================================
    // INFO/STATUS MESSAGES (13 keys)
    // ==========================================
    "sudoku.msg.select.to.begin": "Välj {REQUIRED_IMAGES} bilder eller ett tema för att börja.",
    "sudoku.msg.loading.animals": "Laddar djurtema...",
    "sudoku.msg.searching": "Söker...",
    "sudoku.msg.loading.theme": "Laddar tema...",
    "sudoku.msg.no.images": "Inga bilder hittades{query}.",
    "sudoku.msg.loading.specific": "Laddar tema '{theme}'...",
    "sudoku.msg.theme.selected": "Pusslet skapas med slumpmässiga bilder från temat '{theme}'.",
    "sudoku.msg.loading.uploads": "Laddar {count} bild(er)...",
    "sudoku.msg.preparing": "Förbereder {filename}...",
    "sudoku.asset.select": "Välj ett tema för att se {type}.",
    "sudoku.asset.loading": "Laddar {theme} {type}...",
    "sudoku.asset.empty": "Inga {type} i detta tema.",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "GRATISVERSION - LessonCraftStudio.com",
    "watermarkSmallText": "GRATISVERSION"
  },

  "da": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI (6 keys)
    // ==========================================
    "sudoku.page.title": "Sudoku for børn - Lav farverige billedsudoku",
    "sudoku.settings.title": "Sudoku-indstillinger",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Sudoku for børn",
    "sudoku.tab.worksheet": "Arbejdsark",
    "sudoku.tab.answer": "Facit",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "sudoku.language.select": "Vælg sprog",
    "sudoku.language.label": "Sprog:",
    "sudoku.language.description": "Billednavne og temaer vises på det valgte sprog.",

    // ==========================================
    // PAGE & SCENE SECTION (10 keys)
    // ==========================================
    "sudoku.page.scene.title": "Side og scene",
    "sudoku.page.setup": "Sideopsætning",
    "sudoku.page.size.label": "Sideformat:",
    "page.size.letter.landscape": "Letter Liggende (11×8,5\")",
    "page.size.letter.portrait": "Letter Stående (8,5×11\")",
    "page.size.a4.landscape": "A4 Liggende (297×210mm)",
    "page.size.a4.portrait": "A4 Stående (210×297mm)",
    "page.size.custom": "Tilpasset",
    "sudoku.page.width": "Bredde (px):",
    "sudoku.page.height": "Højde (px):",
    "sudoku.page.apply": "Anvend format",

    // ==========================================
    // BACKGROUND SECTION (6 keys)
    // ==========================================
    "sudoku.background.title": "Baggrund",  // CRITICAL - User mentioned
    "sudoku.background.color": "Grundfarve:",
    "sudoku.background.theme.label": "Baggrundstema:",
    "sudoku.background.none": "Ingen (brug grundfarve)",
    "sudoku.background.select.message": "Vælg et tema for baggrunde.",
    "sudoku.background.opacity": "Baggrunds gennemsigtighed:",

    // ==========================================
    // BORDER SECTION (5 keys)
    // ==========================================
    "sudoku.border.title": "Ramme",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Rammetema:",
    "common.none": "Ingen",
    "none": "Ingen",
    "none": "Ingen",
    "none": "Ingen",
    "sudoku.border.select.message": "Vælg et tema for rammer.",
    "sudoku.border.opacity": "Ramme gennemsigtighed:",

    // ==========================================
    // SUDOKU SETTINGS (5 keys)
    // ==========================================
    "sudoku.difficulty.title": "Sværhedsgrad",
    "sudoku.blanks.label": "Antal tomme felter:",
    "sudoku.difficulty.easy": "Let (4 tomme felter)",
    "sudoku.difficulty.medium": "Mellem (6 tomme felter)",
    "sudoku.difficulty.hard": "Svær (8 tomme felter)",

    // ==========================================
    // TEXT TOOLS (12 keys)
    // ==========================================
    "sudoku.text.tools": "Tekstværktøjer",
    "sudoku.text.add.title": "Tilføj tekst",
    "sudoku.text.content.label": "Indhold:",
    "sudoku.text.placeholder": "Titel, instruktioner...",
    "sudoku.text.add.button": "Indsæt tekst",
    "sudoku.text.properties": "Egenskaber for valgt tekst",
    "sudoku.text.color": "Farve:",
    "sudoku.text.size": "Størrelse:",
    "sudoku.text.font": "Skrifttype:",
    "sudoku.text.outline.color": "Konturfarve:",
    "sudoku.text.outline.width": "Konturtykkelse (0-10):",
    "sudoku.text.default": "Ny tekst",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (12 keys)
    // ==========================================
    "sudoku.image.library": "Billedsamling",
    "sudoku.image.source": "Billedkilde til gitter",
    "sudoku.generate.theme": "Opret fra tema:",
    "sudoku.select.individual": "-- Eller vælg enkelte billeder nedenfor --",
    "sudoku.image.individual": "Vælg enkelte billeder",
    "sudoku.filter.theme": "Filtrer efter tema:",
    "sudoku.search.label": "Søg billeder:",
    "sudoku.search.placeholder": "f.eks. æble, bil",
    "sudoku.available.images": "Tilgængelige billeder (4 påkrævet):",
    "sudoku.loading.images": "Indlæser billeder...",
    "sudoku.selected.images": "Valgte billeder:",
    "sudoku.themes.all": "Alle temaer",

    // ==========================================
    // UPLOAD SECTION (7 keys)
    // ==========================================
    "sudoku.upload.title": "Upload dine egne billeder",
    "sudoku.upload.select": "Vælg billede(r) at uploade:",
    "sudoku.uploaded.images": "Dine uploadede billeder (denne session):",
    "sudoku.upload.placeholder": "Dine uploadede billeder vises her.",
    "sudoku.upload.button": "Vælg filer",
    "sudoku.upload.no.file": "Ingen fil valgt",
    "sudoku.upload.files.selected": "{count} fil(er) valgt",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "toolbar.bring.forward": "Bring frem",
    "toolbar.send.backward": "Send tilbage",
    "toolbar.align.selected": "Juster valgte:",
    "toolbar.align.page": "Juster til side:",
    "toolbar.layers": "Lag",
    "toolbar.align": "Juster",
    "toolbar.delete.selected": "Slet valgte",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "sudoku.generate": "Opret",
    "sudoku.generate.worksheet": "Opret arbejdsark",
    "sudoku.generate.answer": "Opret facit",
    "sudoku.download": "Download",
    "sudoku.download.worksheet.jpeg": "Arbejdsark (JPEG)",
    "sudoku.download.answer.jpeg": "Facit (JPEG)",
    "sudoku.download.worksheet.pdf": "Arbejdsark (PDF)",
    "sudoku.download.answer.pdf": "Facit (PDF)",
    "common.grayscale": "Gråtoner",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Ryd alt",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "sudoku.msg.worksheet.success": "Arbejdsark oprettet!",
    "sudoku.msg.answer.generated": "Facit oprettet!",
    "sudoku.msg.download.started": "Download startet!",
    "sudoku.msg.pdf.success": "PDF downloadet!",
    "sudoku.msg.cleared": "Alle indstillinger ryddet.",
    "sudoku.msg.individual.mode": "Tilstand for enkelte billeder aktiveret.",
    "sudoku.msg.uploads.ready": "{count} eget/egne billede(r) tilgængelig(e). Klik for at vælge.",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "sudoku.msg.worksheet.error": "Fejl ved oprettelse af arbejdsark: {message}",
    "sudoku.msg.generate.first": "Opret først et arbejdsark.",
    "sudoku.msg.theme.insufficient": "Temaet '{theme}' kræver mindst {count} billeder.",
    "sudoku.msg.select.minimum": "Vælg eller upload mindst {count} billeder.",
    "sudoku.msg.render.error": "Fejl ved gengivelse af arbejdsark: {message}",
    "sudoku.msg.clear.theme": "Fravælg 'Opret fra tema' for at vælge enkelte billeder.",
    "sudoku.msg.max.selection": "Du kan kun vælge {count} billeder.",
    "sudoku.msg.file.error": "Fejl ved læsning af fil: {filename}",
    "sudoku.msg.generate.content": "Opret først indhold til dette arbejdsområde.",
    "sudoku.msg.jpeg.error": "Fejl ved forberedelse af JPEG.",
    "sudoku.msg.pdf.error": "Fejl ved oprettelse af PDF.",
    "sudoku.asset.failed": "Kunne ikke indlæse billedet {asset}.",

    // ==========================================
    // INFO/STATUS MESSAGES (13 keys)
    // ==========================================
    "sudoku.msg.select.to.begin": "Vælg {REQUIRED_IMAGES} billeder eller et tema for at begynde.",
    "sudoku.msg.loading.animals": "Indlæser dyretema...",
    "sudoku.msg.searching": "Søger...",
    "sudoku.msg.loading.theme": "Indlæser tema...",
    "sudoku.msg.no.images": "Ingen billeder fundet{query}.",
    "sudoku.msg.loading.specific": "Indlæser tema '{theme}'...",
    "sudoku.msg.theme.selected": "Puslespillet oprettes med tilfældige billeder fra temaet '{theme}'.",
    "sudoku.msg.loading.uploads": "Indlæser {count} billede(r)...",
    "sudoku.msg.preparing": "Forbereder {filename}...",
    "sudoku.asset.select": "Vælg et tema for at se {type}.",
    "sudoku.asset.loading": "Indlæser {theme} {type}...",
    "sudoku.asset.empty": "Ingen {type} i dette tema.",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "GRATIS VERSION - LessonCraftStudio.com",
    "watermarkSmallText": "GRATIS VERSION"
  },

  "no": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI (6 keys)
    // ==========================================
    "sudoku.page.title": "Sudoku for barn - Lag fargerike bildesudoku",
    "sudoku.settings.title": "Sudokuinnstillinger",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Sudoku for barn",
    "sudoku.tab.worksheet": "Oppgaveark",
    "sudoku.tab.answer": "Fasit",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "sudoku.language.select": "Velg språk",
    "sudoku.language.label": "Språk:",
    "sudoku.language.description": "Bildenavn og temaer vises på det valgte språket.",

    // ==========================================
    // PAGE & SCENE SECTION (10 keys)
    // ==========================================
    "sudoku.page.scene.title": "Side og scene",
    "sudoku.page.setup": "Sideoppsett",
    "sudoku.page.size.label": "Sidestørrelse:",
    "page.size.letter.landscape": "Letter Liggende (11×8,5\")",
    "page.size.letter.portrait": "Letter Stående (8,5×11\")",
    "page.size.a4.landscape": "A4 Liggende (297×210mm)",
    "page.size.a4.portrait": "A4 Stående (210×297mm)",
    "page.size.custom": "Egendefinert",
    "sudoku.page.width": "Bredde (px):",
    "sudoku.page.height": "Høyde (px):",
    "sudoku.page.apply": "Bruk format",

    // ==========================================
    // BACKGROUND SECTION (6 keys)
    // ==========================================
    "sudoku.background.title": "Bakgrunn",  // CRITICAL - User mentioned
    "sudoku.background.color": "Grunnfarge:",
    "sudoku.background.theme.label": "Bakgrunnstema:",
    "sudoku.background.none": "Ingen (bruk grunnfarge)",
    "sudoku.background.select.message": "Velg et tema for bakgrunner.",
    "sudoku.background.opacity": "Bakgrunnens gjennomsiktighet:",

    // ==========================================
    // BORDER SECTION (5 keys)
    // ==========================================
    "sudoku.border.title": "Ramme",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Rammetema:",
    "common.none": "Ingen",
    "none": "Ingen",
    "none": "Ingen",
    "none": "Ingen",
    "sudoku.border.select.message": "Velg et tema for rammer.",
    "sudoku.border.opacity": "Rammens gjennomsiktighet:",

    // ==========================================
    // SUDOKU SETTINGS (5 keys)
    // ==========================================
    "sudoku.difficulty.title": "Vanskelighetsgrad",
    "sudoku.blanks.label": "Antall tomme ruter:",
    "sudoku.difficulty.easy": "Lett (4 tomme ruter)",
    "sudoku.difficulty.medium": "Middels (6 tomme ruter)",
    "sudoku.difficulty.hard": "Vanskelig (8 tomme ruter)",

    // ==========================================
    // TEXT TOOLS (12 keys)
    // ==========================================
    "sudoku.text.tools": "Tekstverktøy",
    "sudoku.text.add.title": "Legg til tekst",
    "sudoku.text.content.label": "Innhold:",
    "sudoku.text.placeholder": "Overskrift, instruksjoner...",
    "sudoku.text.add.button": "Sett inn tekst",
    "sudoku.text.properties": "Egenskaper for valgt tekst",
    "sudoku.text.color": "Farge:",
    "sudoku.text.size": "Størrelse:",
    "sudoku.text.font": "Skrifttype:",
    "sudoku.text.outline.color": "Omrissfarge:",
    "sudoku.text.outline.width": "Omrisstykkelse (0-10):",
    "sudoku.text.default": "Ny tekst",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (12 keys)
    // ==========================================
    "sudoku.image.library": "Bildesamling",
    "sudoku.image.source": "Bildekilde for rutenettet",
    "sudoku.generate.theme": "Lag fra tema:",
    "sudoku.select.individual": "-- Eller velg enkeltbilder nedenfor --",
    "sudoku.image.individual": "Valg av enkeltbilder",
    "sudoku.filter.theme": "Filtrer etter tema:",
    "sudoku.search.label": "Søk etter bilder:",
    "sudoku.search.placeholder": "f.eks. eple, bil",
    "sudoku.available.images": "Tilgjengelige bilder (4 påkrevd):",
    "sudoku.loading.images": "Laster inn bilder...",
    "sudoku.selected.images": "Valgte bilder:",
    "sudoku.themes.all": "Alle temaer",

    // ==========================================
    // UPLOAD SECTION (7 keys)
    // ==========================================
    "sudoku.upload.title": "Last opp egne bilder",
    "sudoku.upload.select": "Velg bilde(r) å laste opp:",
    "sudoku.uploaded.images": "Dine opplastede bilder (denne økten):",
    "sudoku.upload.placeholder": "Dine opplastede bilder vises her.",
    "sudoku.upload.button": "Velg filer",
    "sudoku.upload.no.file": "Ingen fil valgt",
    "sudoku.upload.files.selected": "{count} fil(er) valgt",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "toolbar.bring.forward": "Flytt fremover",
    "toolbar.send.backward": "Flytt bakover",
    "toolbar.align.selected": "Juster valgte:",
    "toolbar.align.page": "Juster til side:",
    "toolbar.layers": "Lag",
    "toolbar.align": "Juster",
    "toolbar.delete.selected": "Slett valgte",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "sudoku.generate": "Lag",
    "sudoku.generate.worksheet": "Lag oppgaveark",
    "sudoku.generate.answer": "Lag fasit",
    "sudoku.download": "Last ned",
    "sudoku.download.worksheet.jpeg": "Oppgaveark (JPEG)",
    "sudoku.download.answer.jpeg": "Fasit (JPEG)",
    "sudoku.download.worksheet.pdf": "Oppgaveark (PDF)",
    "sudoku.download.answer.pdf": "Fasit (PDF)",
    "common.grayscale": "Gråtoner",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Tøm alt",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "sudoku.msg.worksheet.success": "Oppgaveark opprettet!",
    "sudoku.msg.answer.generated": "Fasit laget!",
    "sudoku.msg.download.started": "Nedlasting startet!",
    "sudoku.msg.pdf.success": "PDF lastet ned!",
    "sudoku.msg.cleared": "Alle innstillinger tømt.",
    "sudoku.msg.individual.mode": "Enkeltbildemodus aktivert.",
    "sudoku.msg.uploads.ready": "{count} eget/egne bilde(r) tilgjengelig(e). Klikk for å velge.",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "sudoku.msg.worksheet.error": "Feil ved opprettelse av oppgaveark: {message}",
    "sudoku.msg.generate.first": "Lag et oppgaveark først.",
    "sudoku.msg.theme.insufficient": "Temaet '{theme}' krever minst {count} bilder.",
    "sudoku.msg.select.minimum": "Velg eller last opp minst {count} bilder.",
    "sudoku.msg.render.error": "Feil ved gjengivelse av oppgaveark: {message}",
    "sudoku.msg.clear.theme": "Deaktiver 'Lag fra tema' for å velge enkeltbilder.",
    "sudoku.msg.max.selection": "Du kan bare velge {count} bilder.",
    "sudoku.msg.file.error": "Feil ved lesing av fil: {filename}",
    "sudoku.msg.generate.content": "Lag først innhold for dette arbeidsområdet.",
    "sudoku.msg.jpeg.error": "Feil ved klargjøring av JPEG.",
    "sudoku.msg.pdf.error": "Feil ved opprettelse av PDF.",
    "sudoku.asset.failed": "Kunne ikke laste inn bildet {asset}.",

    // ==========================================
    // INFO/STATUS MESSAGES (13 keys)
    // ==========================================
    "sudoku.msg.select.to.begin": "Velg {REQUIRED_IMAGES} bilder eller et tema for å starte.",
    "sudoku.msg.loading.animals": "Laster inn dyretema...",
    "sudoku.msg.searching": "Søker...",
    "sudoku.msg.loading.theme": "Laster inn tema...",
    "sudoku.msg.no.images": "Ingen bilder funnet{query}.",
    "sudoku.msg.loading.specific": "Laster inn tema '{theme}'...",
    "sudoku.msg.theme.selected": "Puslespillet lages med tilfeldige bilder fra temaet '{theme}'.",
    "sudoku.msg.loading.uploads": "Laster inn {count} bilde(r)...",
    "sudoku.msg.preparing": "Klargjør {filename}...",
    "sudoku.asset.select": "Velg et tema for å se {type}.",
    "sudoku.asset.loading": "Laster inn {theme} {type}...",
    "sudoku.asset.empty": "Ingen {type} i dette temaet.",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "GRATISVERSJON - LessonCraftStudio.com",
    "watermarkSmallText": "GRATISVERSJON"
  },

  "fi": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI (6 keys)
    // ==========================================
    "sudoku.page.title": "Lasten sudoku - Luo värikkäitä kuvasudokuja",
    "sudoku.settings.title": "Sudokun asetukset",
    "sudoku.accordion.label": "Sudoku",
    "sudoku.kids.title": "Lasten sudoku",
    "sudoku.tab.worksheet": "Tehtäväsivu",
    "sudoku.tab.answer": "Vastaukset",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "sudoku.language.select": "Valitse kieli",
    "sudoku.language.label": "Kieli:",
    "sudoku.language.description": "Kuvien nimet ja teemat näytetään valitulla kielellä.",

    // ==========================================
    // PAGE & SCENE SECTION (10 keys)
    // ==========================================
    "sudoku.page.scene.title": "Sivu ja näkymä",
    "sudoku.page.setup": "Sivun asetukset",
    "sudoku.page.size.label": "Sivun koko:",
    "page.size.letter.landscape": "Letter Vaaka (11×8,5\")",
    "page.size.letter.portrait": "Letter Pysty (8,5×11\")",
    "page.size.a4.landscape": "A4 Vaaka (297×210mm)",
    "page.size.a4.portrait": "A4 Pysty (210×297mm)",
    "page.size.custom": "Mukautettu",
    "sudoku.page.width": "Leveys (px):",
    "sudoku.page.height": "Korkeus (px):",
    "sudoku.page.apply": "Käytä kokoa",

    // ==========================================
    // BACKGROUND SECTION (6 keys)
    // ==========================================
    "sudoku.background.title": "Tausta",  // CRITICAL - User mentioned
    "sudoku.background.color": "Pohjaväri:",
    "sudoku.background.theme.label": "Taustateema:",
    "sudoku.background.none": "Ei mitään (käytä pohjaväriä)",
    "sudoku.background.select.message": "Valitse teema taustoille.",
    "sudoku.background.opacity": "Taustan läpinäkyvyys:",

    // ==========================================
    // BORDER SECTION (5 keys)
    // ==========================================
    "sudoku.border.title": "Reunus",  // CRITICAL - User mentioned
    "sudoku.border.theme.label": "Reunusteema:",
    "common.none": "Ei mitään",
    "none": "Ei mitään",
    "none": "Ei mitään",
    "none": "Ei mitään",
    "sudoku.border.select.message": "Valitse teema reunuksille.",
    "sudoku.border.opacity": "Reunuksen läpinäkyvyys:",

    // ==========================================
    // SUDOKU SETTINGS (5 keys)
    // ==========================================
    "sudoku.difficulty.title": "Vaikeustaso",
    "sudoku.blanks.label": "Tyhjien ruutujen määrä:",
    "sudoku.difficulty.easy": "Helppo (4 tyhjää ruutua)",
    "sudoku.difficulty.medium": "Keskitaso (6 tyhjää ruutua)",
    "sudoku.difficulty.hard": "Vaikea (8 tyhjää ruutua)",

    // ==========================================
    // TEXT TOOLS (12 keys)
    // ==========================================
    "sudoku.text.tools": "Tekstityökalut",
    "sudoku.text.add.title": "Lisää tekstiä",
    "sudoku.text.content.label": "Sisältö:",
    "sudoku.text.placeholder": "Otsikko, ohjeet...",
    "sudoku.text.add.button": "Lisää teksti",
    "sudoku.text.properties": "Valitun tekstin ominaisuudet",
    "sudoku.text.color": "Väri:",
    "sudoku.text.size": "Koko:",
    "sudoku.text.font": "Fontti:",
    "sudoku.text.outline.color": "Ääriviivan väri:",
    "sudoku.text.outline.width": "Ääriviivan paksuus (0-10):",
    "sudoku.text.default": "Uusi teksti",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (12 keys)
    // ==========================================
    "sudoku.image.library": "Kuvakirjasto",
    "sudoku.image.source": "Kuvalähde ruudukolle",
    "sudoku.generate.theme": "Luo teemasta:",
    "sudoku.select.individual": "-- Tai valitse yksittäisiä kuvia alta --",
    "sudoku.image.individual": "Yksittäisten kuvien valinta",
    "sudoku.filter.theme": "Suodata teeman mukaan:",
    "sudoku.search.label": "Etsi kuvia:",
    "sudoku.search.placeholder": "esim. omena, auto",
    "sudoku.available.images": "Saatavilla olevat kuvat (4 vaaditaan):",
    "sudoku.loading.images": "Ladataan kuvia...",
    "sudoku.selected.images": "Valitut kuvat:",
    "sudoku.themes.all": "Kaikki teemat",

    // ==========================================
    // UPLOAD SECTION (7 keys)
    // ==========================================
    "sudoku.upload.title": "Lisää omat kuvasi",
    "sudoku.upload.select": "Valitse kuva/kuvia ladattavaksi:",
    "sudoku.uploaded.images": "Ladatut kuvasi (tämä istunto):",
    "sudoku.upload.placeholder": "Ladatut kuvasi näkyvät täällä.",
    "sudoku.upload.button": "Valitse tiedostot",
    "sudoku.upload.no.file": "Ei tiedostoa valittuna",
    "sudoku.upload.files.selected": "{count} tiedosto(a) valittu",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "toolbar.bring.forward": "Tuo eteen",
    "toolbar.send.backward": "Vie taakse",
    "toolbar.align.selected": "Kohdista valittu:",
    "toolbar.align.page": "Kohdista sivulle:",
    "toolbar.layers": "Tasot",
    "toolbar.align": "Kohdista",
    "toolbar.delete.selected": "Poista valittu",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "sudoku.generate": "Luo",
    "sudoku.generate.worksheet": "Luo tehtäväsivu",
    "sudoku.generate.answer": "Luo vastaukset",
    "sudoku.download": "Lataa",
    "sudoku.download.worksheet.jpeg": "Tehtäväsivu (JPEG)",
    "sudoku.download.answer.jpeg": "Vastaukset (JPEG)",
    "sudoku.download.worksheet.pdf": "Tehtäväsivu (PDF)",
    "sudoku.download.answer.pdf": "Vastaukset (PDF)",
    "common.grayscale": "Harmaasävy",  // CRITICAL - User mentioned
    "sudoku.clear.all": "Tyhjennä kaikki",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "sudoku.msg.worksheet.success": "Tehtäväsivu luotu onnistuneesti!",
    "sudoku.msg.answer.generated": "Vastaukset luotu!",
    "sudoku.msg.download.started": "Lataus aloitettu!",
    "sudoku.msg.pdf.success": "PDF ladattu!",
    "sudoku.msg.cleared": "Kaikki asetukset tyhjennetty.",
    "sudoku.msg.individual.mode": "Yksittäiskuvatila aktivoitu.",
    "sudoku.msg.uploads.ready": "{count} oma(a) kuva(a) saatavilla. Klikkaa valitaksesi.",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "sudoku.msg.worksheet.error": "Virhe tehtäväsivun luomisessa: {message}",
    "sudoku.msg.generate.first": "Luo ensin tehtäväsivu.",
    "sudoku.msg.theme.insufficient": "Teema '{theme}' vaatii vähintään {count} kuvaa.",
    "sudoku.msg.select.minimum": "Valitse tai lataa vähintään {count} kuvaa.",
    "sudoku.msg.render.error": "Virhe tehtäväsivun piirtämisessä: {message}",
    "sudoku.msg.clear.theme": "Poista 'Luo teemasta' käytöstä valitaksesi yksittäisiä kuvia.",
    "sudoku.msg.max.selection": "Voit valita vain {count} kuvaa.",
    "sudoku.msg.file.error": "Virhe tiedoston lukemisessa: {filename}",
    "sudoku.msg.generate.content": "Luo ensin sisältöä tälle työalueelle.",
    "sudoku.msg.jpeg.error": "Virhe JPEG:n valmistelussa.",
    "sudoku.msg.pdf.error": "Virhe PDF:n luomisessa.",
    "sudoku.asset.failed": "Kuvan {asset} lataaminen epäonnistui.",

    // ==========================================
    // INFO/STATUS MESSAGES (13 keys)
    // ==========================================
    "sudoku.msg.select.to.begin": "Valitse {REQUIRED_IMAGES} kuvaa tai teema aloittaaksesi.",
    "sudoku.msg.loading.animals": "Ladataan eläinteemaa...",
    "sudoku.msg.searching": "Etsitään...",
    "sudoku.msg.loading.theme": "Ladataan teemaa...",
    "sudoku.msg.no.images": "Kuvia ei löytynyt{query}.",
    "sudoku.msg.loading.specific": "Ladataan teemaa '{theme}'...",
    "sudoku.msg.theme.selected": "Pulmapeli luodaan satunnaisilla kuvilla teemasta '{theme}'.",
    "sudoku.msg.loading.uploads": "Ladataan {count} kuva(a)...",
    "sudoku.msg.preparing": "Valmistellaan {filename}...",
    "sudoku.asset.select": "Valitse teema nähdäksesi {type}.",
    "sudoku.asset.loading": "Ladataan {theme} {type}...",
    "sudoku.asset.empty": "Ei {type} tässä teemassa.",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "ILMAISVERSIO - LessonCraftStudio.com",
    "watermarkSmallText": "ILMAISVERSIO"
  }
};

/**
 * HELPER FUNCTIONS
 */

/**
 * Get translation for a key in specified locale
 * @param {string} key - Translation key
 * @param {string} locale - Language locale code
 * @param {object} params - Optional parameters for placeholder replacement
 * @returns {string} Translated text
 */
function getTranslation(key, locale = 'en', params = {}) {
  const translation = SUDOKU_TRANSLATIONS[locale]?.[key] ||
                     SUDOKU_TRANSLATIONS['en'][key] ||
                     key;

  return formatTranslation(translation, params);
}

/**
 * Format translation with placeholder replacement
 * @param {string} text - Text with placeholders
 * @param {object} params - Parameters to replace
 * @returns {string} Formatted text
 */
function formatTranslation(text, params) {
  let formatted = text;
  for (const [key, value] of Object.entries(params)) {
    formatted = formatted.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return formatted;
}

/**
 * Validate translations for a locale
 * @param {string} locale - Locale to validate
 * @returns {object} Validation results
 */
function validateTranslations(locale) {
  const englishKeys = Object.keys(SUDOKU_TRANSLATIONS.en);
  const localeKeys = Object.keys(SUDOKU_TRANSLATIONS[locale] || {});

  const missing = englishKeys.filter(key => !localeKeys.includes(key));
  const extra = localeKeys.filter(key => !englishKeys.includes(key));

  return {
    locale,
    totalKeys: englishKeys.length,
    translatedKeys: localeKeys.length,
    missingKeys: missing,
    extraKeys: extra,
    coverage: ((localeKeys.length / englishKeys.length) * 100).toFixed(1) + '%',
    isComplete: missing.length === 0
  };
}

/**
 * Get all supported locales
 * @returns {array} Array of locale codes
 */
function getSupportedLocales() {
  return Object.keys(SUDOKU_TRANSLATIONS);
}

/**
 * Check if a locale is supported
 * @param {string} locale - Locale code to check
 * @returns {boolean} True if supported
 */
function isLocaleSupported(locale) {
  return locale in SUDOKU_TRANSLATIONS;
}

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SUDOKU_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    validateTranslations,
    getSupportedLocales,
    isLocaleSupported
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.SUDOKU_TRANSLATIONS = SUDOKU_TRANSLATIONS;
  window.translations = SUDOKU_TRANSLATIONS; // Alias for compatibility
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
}