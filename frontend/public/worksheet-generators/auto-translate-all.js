/**
 * Automatic Translation System for ALL UI Elements
 * This script automatically translates ALL text in the DOM
 */

(function() {
    'use strict';

    // Wait for translations to be loaded
    function waitForTranslations(callback) {
        if (window.translations && window.translations[window.currentLocale || 'en']) {
            callback();
        } else {
            setTimeout(() => waitForTranslations(callback), 100);
        }
    }

    // Comprehensive translation function
    function translateEverything() {
        const locale = window.currentLocale || 'en';

        if (locale === 'en') {
            console.log('[AutoTranslate] Skipping - using English');
            return;
        }

        if (!window.translations || !window.translations[locale]) {
            console.warn(`[AutoTranslate] No translations for locale: ${locale}`);
            return;
        }

        const trans = window.translations[locale];

        // Create a comprehensive mapping of English to German
        const comprehensiveMap = {
            // Page titles
            'Addition Worksheet': 'Additions-Arbeitsblatt',
            'Word Scramble': trans.wordScramble || 'Wörter-Mix',
            'Settings': trans.settings || 'Einstellungen',
            'Addition Only': trans.additionOnly || 'Nur Addition',
            'Alphabet Train Worksheet App': 'Buchstabenzug-Arbeitsblatt',
            'Big & Small Worksheet Generator': 'Groß & Klein Arbeitsblatt-Generator',
            'Coloring Page Designer': 'Malvorlagen-Designer',
            'Drawing Lines Worksheet Generator': 'Linien zeichnen Arbeitsblatt-Generator',
            'Find and Count Worksheet Generator': 'Finden und Zählen Arbeitsblatt-Generator',
            'Grid-Match Worksheet Generator': 'Gitter-Zuordnung Arbeitsblatt-Generator',
            'Image Addition Worksheet Generator': 'Bilder-Addition Arbeitsblatt-Generator',
            'Image Crossword Generator': 'Bilder-Kreuzworträtsel Generator',
            'Image Cryptogram Worksheet Generator': 'Bilder-Kryptogramm Arbeitsblatt-Generator',
            'Image Subtraction Worksheet Generator': 'Bilder-Subtraktion Arbeitsblatt-Generator',
            'Image Sudoku Generator': 'Bilder-Sudoku Generator',
            'Image Word Scramble Worksheet': 'Bilder-Wörter-Mix Arbeitsblatt',
            'Math Worksheet Generator': 'Mathe-Arbeitsblatt Generator',
            'Missing Pieces Worksheet Generator': 'Fehlende Teile Arbeitsblatt-Generator',
            'Odd-One-Out Worksheet Generator': 'Was passt nicht? Arbeitsblatt-Generator',
            'Pattern Train Worksheet App': 'Musterzug-Arbeitsblatt',
            'Pattern Worksheet Generator': 'Muster-Arbeitsblatt Generator',
            'Picture Bingo Worksheet Generator': 'Bilder-Bingo Arbeitsblatt-Generator',
            'Picture Pathway': 'Bilderpfad',
            'Picture Sort Worksheet Generator': 'Bilder sortieren Arbeitsblatt-Generator',
            'Prepositions Worksheet Generator': 'Präpositionen Arbeitsblatt-Generator',
            'Shadow Match Worksheet Generator': 'Schatten-Zuordnung Arbeitsblatt-Generator',
            'Subtraction Worksheet Generator': 'Subtraktions-Arbeitsblatt Generator',
            'Treasure Hunt Worksheet Generator': 'Schatzsuche Arbeitsblatt-Generator',
            'Word Search Generator': 'Wortsuche Generator',
            'Writing Worksheet Generator': 'Schreib-Arbeitsblatt Generator',
            'Sudoku for Kids': 'Sudoku für Kinder',

            // Common UI elements
            'Loading images...': trans.loadingImages || 'Bilder werden geladen...',
            'No images found': trans.noImagesFound || 'Keine Bilder gefunden',
            'Choose files': trans.chooseFiles || 'Dateien auswählen',
            'No file chosen': trans.noFileChosen || 'Keine Datei ausgewählt',
            'Apply Size': trans.applySize || 'Format anwenden',
            'Clear Selection': trans.clearSelection || 'Auswahl löschen',
            'Clear Selections': 'Auswahl löschen',
            'Clear Selections for This Exercise': 'Auswahl für diese Übung löschen',
            'Generate Worksheet': trans.generateWorksheet || 'Arbeitsblatt erstellen',
            'Generate Answer Key': trans.generateAnswerKey || 'Lösungsschlüssel erstellen',
            'Download PDF': trans.downloadPdf || 'PDF herunterladen',
            'Download as PDF': trans.downloadPdf || 'Als PDF herunterladen',
            'Download as JPEG': 'Als JPEG herunterladen',
            'Download Image': trans.downloadImage || 'Bild herunterladen',

            // Button text
            'Add Handwriting Lines': 'Schreiblinien hinzufügen',
            'Add PDF': 'PDF hinzufügen',
            'Add Selected Image': 'Ausgewähltes Bild hinzufügen',
            'Add Text to Page': 'Text zur Seite hinzufügen',
            'Add Text to Worksheet': 'Text zum Arbeitsblatt hinzufügen',
            'All Files': 'Alle Dateien',
            'Bingo Card Settings': 'Bingo-Karten Einstellungen',
            'Blog Posts': 'Blog-Beiträge',
            'Bring Forward': 'Nach vorne bringen',
            'Check English Version': 'Englische Version prüfen',
            'Check Swedish Version': 'Schwedische Version prüfen',
            'Classroom Helpers': 'Klassenzimmer-Helfer',
            'Clear Cache': 'Cache löschen',
            'Create Theme': 'Thema erstellen',
            'Delete Row': 'Zeile löschen',
            'Delete Selected Text': 'Ausgewählten Text löschen',
            'Drawing Tool': 'Zeichenwerkzeug',
            'Edit JSON': 'JSON bearbeiten',
            'Exercise Configuration': 'Übungskonfiguration',
            'Exercise Settings': 'Übungseinstellungen',
            'Fix': 'Korrigieren',
            'Flip Vertical': 'Vertikal spiegeln',
            'Hidden Object Questions': 'Versteckte Objekt-Fragen',
            'HTML Editor': 'HTML-Editor',
            'Image Assignment': 'Bildzuweisung',
            'Image Assets': 'Bild-Assets',
            'Image Selection': 'Bildauswahl',
            'Item Configuration': 'Element-Konfiguration',
            'Language Selection': 'Sprachauswahl',
            'Language Settings': 'Spracheinstellungen',
            'Load Animals Theme': 'Tierthema laden',
            'Next': 'Weiter',
            'Object Selection': 'Objektauswahl',
            'Open': 'Öffnen',
            'Optional Settings': 'Optionale Einstellungen',
            'Page Setup': 'Seiteneinrichtung',
            'Pathway Configuration': 'Pfad-Konfiguration',
            'Pattern Configuration': 'Muster-Konfiguration',
            'Pattern Settings': 'Mustereinstellungen',
            'PDF Manager': 'PDF-Manager',
            'Pick Img': 'Bild auswählen',
            'Previous': 'Zurück',
            'Problem Settings': 'Aufgabeneinstellungen',
            'Puzzle Configuration': 'Puzzle-Konfiguration',
            'Puzzle Rules': 'Puzzle-Regeln',
            'Puzzle Setup': 'Puzzle-Einrichtung',
            'Reload Backgrounds': 'Hintergründe neu laden',
            'Reload Borders': 'Rahmen neu laden',
            'Run All Tests': 'Alle Tests ausführen',
            'Save Changes': 'Änderungen speichern',
            'Save Post': 'Beitrag speichern',
            'Save Theme': 'Thema speichern',
            'Select Tool': 'Werkzeug auswählen',
            'Send Backward': 'Nach hinten senden',
            'Sorting Categories': 'Kategorien sortieren',
            'Test': 'Test',
            'Test All APIs': 'Alle APIs testen',
            'Test Batch Load': 'Batch-Laden testen',
            'Test Pagination': 'Seitenaufteilung testen',
            'Test Search': 'Suche testen',
            'Train Templates': 'Zug-Vorlagen',
            'Translations': 'Übersetzungen',
            'Unselect Image': 'Bildauswahl aufheben',
            'Upload Custom Image': 'Eigenes Bild hochladen',
            'Upload Custom Images': 'Eigene Bilder hochladen',
            'View': 'Ansicht',
            'Worksheet Configuration': 'Arbeitsblatt-Konfiguration',
            'Worksheet Content': 'Arbeitsblatt-Inhalt',
            'Worksheet Setup': 'Arbeitsblatt-Einrichtung',
            'Worksheet Templates': 'Arbeitsblatt-Vorlagen',

            // Labels
            'Image Selection Method:': trans.imageSelectionMethod || 'Bildauswahlmethode:',
            'Select Images Individually': trans.selectImagesIndividually || 'Bilder einzeln auswählen',
            'Use Full Theme': trans.useFullTheme || 'Vollständiges Thema verwenden',
            'Selected Images Pool:': trans.selectedImagesPool || 'Ausgewählte Bilder Pool:',
            'Filter Library By Theme:': trans.filterLibraryByTheme || 'Bibliothek nach Thema filtern:',
            'Custom Images': trans.customImages || 'Benutzerdefinierte Bilder',
            'Allow negative results': trans.allowNegativeResults || 'Negative Ergebnisse zulassen',
            'Min value:': trans.minValue || 'Mindestwert:',
            'Max value:': trans.maxValue || 'Höchstwert:',
            'Show Answers in Worksheet': trans.showAnswersInWorksheet || 'Antworten im Arbeitsblatt anzeigen',
            'Select Language': trans.selectLanguage || 'Sprache auswählen',
            'Image Theme:': trans.imageTheme || 'Bildthema:',
            'Add image as:': 'Bild hinzufügen als:',
            'Add New Text:': 'Neuer Text:',
            'Assigned Images:': 'Zugewiesene Bilder:',
            'Author': 'Autor',
            'Available Borders:': 'Verfügbare Rahmen:',
            'Available Images:': 'Verfügbare Bilder:',
            'Available Images (click to add to exercise below):': 'Verfügbare Bilder (zum Hinzufügen klicken):',
            'Available Images (Click to add to manual selection):': 'Verfügbare Bilder (zur manuellen Auswahl hinzufügen):',
            'Available Images (Click to add):': 'Verfügbare Bilder (zum Hinzufügen klicken):',
            'Available Images (click to assign):': 'Verfügbare Bilder (zum Zuweisen klicken):',
            'Available Images (Click to assign):': 'Verfügbare Bilder (zum Zuweisen klicken):',
            'Available Images (Click to select for custom call-outs):': 'Verfügbare Bilder (für benutzerdefinierte Hinweise auswählen):',
            'Available Images (Click to select):': 'Verfügbare Bilder (zum Auswählen klicken):',
            'Available Images (Requires 4):': 'Verfügbare Bilder (4 erforderlich):',
            'Background Theme': 'Hintergrund-Thema',
            'Background Theme:': 'Hintergrund-Thema:',
            'Blog Post': 'Blog-Beitrag',
            'Border Style': 'Rahmenstil',
            'Border Theme:': 'Rahmen-Thema:',
            'Brush Color:': 'Pinselfarbe:',
            'Brush Size:': 'Pinselgröße:',
            'Card Cell Fill:': 'Kartenfeld-Füllung:',
            'Case:': 'Groß-/Kleinschreibung:',
            'Category': 'Kategorie',
            'Chip Fill:': 'Chip-Füllung:',
            'Choose Files...': 'Dateien auswählen...',
            'Clue Cells (%)': 'Hinweiszellen (%)',
            'Color:': 'Farbe:',
            'Columns (2–4):': 'Spalten (2–4):',
            'Columns:': 'Spalten:',
            'Content:': 'Inhalt:',
            'Custom Dimensions:': 'Benutzerdefinierte Abmessungen:',
            'Difficulty Level:': 'Schwierigkeitsgrad:',
            'Exercise Type:': 'Übungstyp:',
            'Font Family:': 'Schriftart:',
            'Font Size:': 'Schriftgröße:',
            'Grid Size:': 'Gittergröße:',
            'Height (px):': 'Höhe (px):',
            'Include Name/Date Fields': 'Name/Datum Felder einschließen',
            'Language:': 'Sprache:',
            'Maximum Sum:': 'Maximale Summe:',
            'Number of Problems:': 'Anzahl der Aufgaben:',
            'Number of Clues (3-11):': 'Anzahl der Hinweise (3-11):',
            'Opacity:': 'Deckkraft:',
            'Page Color:': 'Seitenfarbe:',
            'Page Size:': 'Seitengröße:',
            'Paper Size:': 'Papierformat:',
            'Pattern Type:': 'Mustertyp:',
            'Rows:': 'Zeilen:',
            'Search Images:': 'Bilder suchen:',
            'Select Prepositions': 'Präpositionen auswählen',
            'Selected Images:': 'Ausgewählte Bilder:',
            'Show Equation Lines:': 'Gleichungslinien anzeigen:',
            'Template:': 'Vorlage:',
            'Theme:': 'Thema:',
            'Width (px):': 'Breite (px):',
            'Your Uploaded Images:': 'Ihre hochgeladenen Bilder:',

            // Instructions
            'Select images from the library.': trans.selectImagesFromTheLibrary || 'Wählen Sie Bilder aus der Bibliothek aus.',
            'Select images from the library above.': trans.selectImagesFromTheLibraryAbove || 'Wählen Sie Bilder aus der Bibliothek oben aus.',
            'Your Uploaded Images (Click to use):': trans.yourUploadedImagesClickToUse || 'Ihre hochgeladenen Bilder (zum Verwenden klicken):',
            'Your Uploaded Images (This Session)': trans.yourUploadedImagesThisSession || 'Ihre hochgeladenen Bilder (diese Sitzung)',
            'Image names and themes will be displayed in the selected language.': trans.imageNamesAndThemesWillBeDisplayed || 'Bildnamen und Themen werden in der ausgewählten Sprache angezeigt.',

            // Common words
            'Selected': 'Ausgewählt',
            'Selected:': trans.selected || 'Ausgewählt:',
            'Selected: 0 / 6': 'Ausgewählt: 0 / 6',
            'Width': trans.width || 'Breite',
            'Height': trans.height || 'Höhe',
            'Content': trans.content || 'Inhalt',
            'Color': trans.color || 'Farbe',
            'Size': trans.size || 'Größe',
            'Font': trans.font || 'Schriftart',
            'Theme': trans.theme || 'Thema',
            'Language': trans.language || 'Sprache',

            // Error & Status Messages
            'Error loading animals theme': 'Fehler beim Laden des Tierthemas',
            'Error loading backgrounds': 'Fehler beim Laden der Hintergründe',
            'Error loading borders': 'Fehler beim Laden der Rahmen',
            'Error loading images': 'Fehler beim Laden der Bilder',
            'Error loading themes': 'Fehler beim Laden der Themen',
            'Failed to load images': 'Bilder konnten nicht geladen werden',
            'Failed to load images. Please try again': 'Bilder konnten nicht geladen werden. Bitte erneut versuchen',
            'Failed to load theme': 'Thema konnte nicht geladen werden',
            'Loading...': 'Wird geladen...',
            'Loading animals theme...': 'Tierthema wird geladen...',
            'Loading default theme...': 'Standardthema wird geladen...',
            'Loading themes...': 'Themen werden geladen...',
            'No backgrounds found': 'Keine Hintergründe gefunden',
            'No borders found': 'Keine Rahmen gefunden',
            'No image selected': 'Kein Bild ausgewählt',
            'No images selected': 'Keine Bilder ausgewählt',
            'No uploaded images': 'Keine hochgeladenen Bilder',
            'None selected': 'Nichts ausgewählt',
            'Searching...': 'Suche läuft...',
            'Select a theme for backgrounds': 'Wählen Sie ein Thema für Hintergründe',
            'Select a theme to see borders': 'Wählen Sie ein Thema für Rahmen',
            'Select a theme': 'Wählen Sie ein Thema',
            'Your uploaded images will appear here': 'Ihre hochgeladenen Bilder erscheinen hier',

            // Placeholder text
            'Hello!': 'Hallo!',
            'Search...': 'Suchen...',
            'Search images...': 'Bilder suchen...',
            'Type to search...': 'Zum Suchen eingeben...',
            'e.g., apple, car': 'z.B. Apfel, Auto',
            'e.g., cat, apple': 'z.B. Katze, Apfel',
            'e.g. AEIOU': 'z.B. AEIOU',
            'Enter custom trace text here...': 'Benutzerdefinierten Text hier eingeben...',
            'Enter display name': 'Anzeigename eingeben',
            'Worksheet Title...': 'Arbeitsblatt-Titel...',
            'Title, Instructions...': 'Titel, Anweisungen...',
            'New Text': 'Neuer Text',
            'Search item images...': 'Artikelbilder suchen...',
            'Search shape images...': 'Formbilder suchen...',
            'Find the hidden objects!': 'Finde die versteckten Objekte!',
            'Search blog posts...': 'Blog-Beiträge suchen...',
            'education, worksheet, learning': 'Bildung, Arbeitsblatt, Lernen',
            'Picture Sort Worksheet': 'Bilder sortieren Arbeitsblatt',
            'Sort the pictures into the correct categories': 'Sortiere die Bilder in die richtigen Kategorien',
            'The quick brown fox...': 'Der schnelle braune Fuchs...',

            // Option/Select Values
            'All Themes': 'Alle Themen',
            'Custom': 'Benutzerdefiniert',
            'None': 'Keine',
            'Manual Selection': 'Manuelle Auswahl',
            'Manual Image Selection': 'Manuelle Bildauswahl',
            'No Theme (Use Manual Selection)': 'Kein Thema (Manuelle Auswahl verwenden)',
            'Or Select Individual Images Below': 'Oder wählen Sie einzelne Bilder unten aus',
            'Select a post': 'Beitrag auswählen',
            'Select Theme': 'Thema auswählen',
            'Select Theme for Worksheet': 'Thema für Arbeitsblatt auswählen',
            'Use Random Theme': 'Zufälliges Thema verwenden',
            'Letter Portrait (8.5×11")': 'Letter Hochformat (8.5×11")',
            'Letter Landscape (11×8.5")': 'Letter Querformat (11×8.5")',
            'A4 Portrait (210×297mm)': 'A4 Hochformat (210×297mm)',
            'A4 Landscape (297×210mm)': 'A4 Querformat (297×210mm)',

            // Headings
            'Add New Image': 'Neues Bild hinzufügen',
            'Add New Text': 'Neuer Text hinzufügen',
            'Add New Theme': 'Neues Thema hinzufügen',
            'Add PDF Worksheet': 'PDF-Arbeitsblatt hinzufügen',
            'API Test Results': 'API-Testergebnisse',
            'Auto-Fixed Controls': 'Automatisch korrigierte Steuerelemente',
            'Automatic Generation (Optional)': 'Automatische Generierung (Optional)',
            'Background': 'Hintergrund',
            'Border': 'Rahmen',
            'Border & Background Selection': 'Rahmen- & Hintergrundauswahl',
            'Browse & Select Images Manually': 'Bilder manuell durchsuchen & auswählen',
            'Clue Grid Settings': 'Hinweisgitter-Einstellungen',
            'Coloring Designer': 'Malvorlagen-Designer',
            'Comparison Worksheet Maker': 'Vergleichs-Arbeitsblatt Ersteller',
            'Configuration': 'Konfiguration',
            'Create/Edit Theme': 'Thema erstellen/bearbeiten',
            'Crossword Settings': 'Kreuzworträtsel-Einstellungen',
            'Custom Images': 'Benutzerdefinierte Bilder',
            'Difficulty': 'Schwierigkeit',
            'Drop PDF files here or click to browse': 'PDF-Dateien hier ablegen oder zum Durchsuchen klicken',
            'Edit Blog Post': 'Blog-Beitrag bearbeiten',
            'Edit Blog Post Content': 'Blog-Beitrag Inhalt bearbeiten',
            'Edit Item': 'Element bearbeiten',
            'Exercise Selections': 'Übungsauswahlen',
            'Global Settings': 'Globale Einstellungen',
            'Graph Settings': 'Diagramm-Einstellungen',
            'Grid Dimensions': 'Gitterabmessungen',
            'Grid Drawing': 'Gitterzeichnung',
            'HTML Content': 'HTML-Inhalt',
            'Image Addition': 'Bilder-Addition',
            'Image Loading Debug': 'Bildlade-Debug',
            'Image Source for Puzzle': 'Bildquelle für Puzzle',
            'Individual Image Selection': 'Individuelle Bildauswahl',
            'Individual Puzzle Settings': 'Individuelle Puzzle-Einstellungen',
            'Manual Image Selection & Browse': 'Manuelle Bildauswahl & Durchsuchen',
            'MatchUp Maker': 'Zuordnungs-Ersteller',
            'Missing Pieces': 'Fehlende Teile',
            'Odd One Out': 'Was passt nicht?',
            'Options': 'Optionen',
            'Page Setup': 'Seiteneinrichtung',
            'PDF Worksheet Library': 'PDF-Arbeitsblatt Bibliothek',
            'Pick an Image': 'Wählen Sie ein Bild',
            'Quick Tests': 'Schnelltests',
            'Relations': 'Beziehungen',
            'Search Library': 'Bibliothek durchsuchen',
            'Selected Images': 'Ausgewählte Bilder',
            'Selected Text Properties': 'Ausgewählte Texteigenschaften',
            'Settings': 'Einstellungen',
            'SpotWorks': 'SpotWorks',
            'Sudoku Settings': 'Sudoku-Einstellungen',
            'Symbol Display': 'Symbolanzeige',
            'Template': 'Vorlage',
            'Text Tools': 'Textwerkzeuge',
            'Theme Images': 'Themenbilder',
            'Themes': 'Themen',
            'Translation Manager': 'Übersetzungsmanager',
            'Translation Test': 'Übersetzungstest',
            'Upload Files': 'Dateien hochladen',
            'Upload Your Own': 'Eigene hochladen',
            'Uploaded PDFs': 'Hochgeladene PDFs',
            'Worksheet Settings': 'Arbeitsblatt-Einstellungen',
            'Writing Worksheet': 'Schreib-Arbeitsblatt',
            'Your Selected Images': 'Ihre ausgewählten Bilder',

            // Page specific
            'Page Dimensions': trans.pageDimensions || 'Seitenabmessungen',
            'Problems per Page': trans.problemsPerPage || 'Aufgaben pro Seite',
            'Problem Type': trans.problemType || 'Aufgabentyp',
            'Max Sum': trans.maxSum || 'Max. Summe',
            'Allow Negative': trans.allowNegative || 'Negativ erlauben',
            'Show Answer Key': trans.showAnswerKey || 'Lösungsschlüssel anzeigen',
            'Include Border': trans.includeBorder || 'Rahmen einschließen',
            'Include Background': trans.includeBackground || 'Hintergrund einschließen',
            'Border Opacity': trans.borderOpacity || 'Rahmen-Deckkraft',
            'Background Opacity': trans.backgroundOpacity || 'Hintergrund-Deckkraft',
            'Answer Key': trans.answerKey || 'Lösungsschlüssel',

            // MISSING TRANSLATIONS - Additional strings
            'grayscale': 'Graustufen',
            'Number of exercises': 'Anzahl der Übungen',
            'Number of Exercises': 'Anzahl der Übungen',
            'Number of puzzles': 'Anzahl der Rätsel',
            'Number of Puzzles': 'Anzahl der Rätsel',
            'Selected Images for Puzzles': 'Ausgewählte Bilder für Rätsel',
            'Grid Rows': 'Gitterzeilen',
            'Grid Columns': 'Gitterspalten',
            'Template and images': 'Vorlage und Bilder',
            'Select Drawing Template': 'Zeichenvorlage auswählen',
            'Assign image pairs': 'Bildpaare zuweisen',
            'Auto-fill images from selected theme': 'Bilder aus gewähltem Thema automatisch einfügen',
            'Easy (4 blanks)': 'Einfach (4 Lücken)',
            'Medium (6 Blanks)': 'Mittel (6 Lücken)',
            'Hard (8 blanks)': 'Schwer (8 Lücken)',
            'Filter by Theme': 'Nach Thema filtern',
            'Worksheet Image Source': 'Arbeitsblatt-Bildquelle',
            'Manual Selection Below': 'Manuelle Auswahl unten',
            'Generation Method': 'Generierungsmethode',
            'Use Manually Selected Images': 'Manuell ausgewählte Bilder verwenden',
            'Select a theme to randomly generate problems each time you click \'Generate\'. Or, use the Image Library to pick specific images': 'Wählen Sie ein Thema für zufällige Aufgaben oder nutzen Sie die Bildbibliothek für spezifische Bilder',
            'Show numbers for each problem': 'Nummern für jede Aufgabe anzeigen',
            'Selected Image': 'Ausgewähltes Bild',
            'No image selected.': 'Kein Bild ausgewählt.',
            'Your Uploaded Image': 'Ihr hochgeladenes Bild',
            'No image uploaded.': 'Kein Bild hochgeladen.',
            'Use Child-Friendly Decorations': 'Kinderfreundliche Dekorationen verwenden',
            'Other Content': 'Weitere Inhalte',
            'Distractors (Select 8–12)': 'Ablenkungen (8–12 auswählen)',
            'Or Select Theme for Distractors:': 'Oder Thema für Ablenkungen wählen:',
            'No Theme (Use Manual Selection)': 'Kein Thema (Manuelle Auswahl verwenden)',
            'Hidden Objects (Select 1–5)': 'Versteckte Objekte (1–5 auswählen)',
            'Or Select Theme for Hidden Objects:': 'Oder Thema für versteckte Objekte wählen:',
            'page': 'Seite',
            'gridOptions': 'Gitteroptionen',
            'Rows (2-4)': 'Zeilen (2-4)',
            'Number of Clue Cells (1-5):': 'Anzahl der Hinweiszellen (1-5):',
            'Generate from Theme:': 'Aus Thema generieren:',
            'Or Select Individual Images Below': 'Oder einzelne Bilder unten auswählen',
            'Selected Images (for individual mode):': 'Ausgewählte Bilder (für Einzelmodus):',
            'Phrases (one per line):': 'Phrasen (eine pro Zeile):',
            'Letters to Reveal:': 'Zu enthüllende Buchstaben:',
            'Max Lines per Puzzle:': 'Max. Zeilen pro Rätsel:',
            'Auto-assign images': 'Bilder automatisch zuweisen',
            'Select a letter to assign an image:': 'Buchstaben für Bildzuweisung wählen:',
            'None Selected': 'Nichts ausgewählt',
            'Missing Pieces (1–5):': 'Fehlende Teile (1–5):',
            'Solution Options (2–6):': 'Lösungsoptionen (2–6):',
            'Piece Shape:': 'Teilform:',
            'Square': 'Quadrat',
            'Circle': 'Kreis',
            'Rectangle (Portrait)': 'Rechteck (Hochformat)',
            'Rectangle (Landscape)': 'Rechteck (Querformat)',
            'Ellipse (Portrait)': 'Ellipse (Hochformat)',
            'Ellipse (Landscape)': 'Ellipse (Querformat)',
            'Pick 1–5 images': '1–5 Bilder auswählen',
            '5 exercises': '5 Übungen',
            '6 Exercises': '6 Übungen',
            '7 Exercises': '7 Übungen',
            '8 Exercises': '8 Übungen',
            '9 Exercises': '9 Übungen',
            '10 Exercises': '10 Übungen',
            'identical (3+1 from same theme)': 'Identisch (3+1 aus gleichem Thema)',
            'Similar (3 from Theme A, 1 from Theme B)': 'Ähnlich (3 aus Thema A, 1 aus Thema B)',
            'Configure Exercise:': 'Übung konfigurieren:',
            'Exercise 1': 'Übung 1',
            'Exercise 2': 'Übung 2',
            'Exercise 3': 'Übung 3',
            'Exercise 4': 'Übung 4',
            'Exercise 5': 'Übung 5',
            'Exercise 6': 'Übung 6',
            'Mode for this Exercise:': 'Modus für diese Übung:',
            'Use Global Mode': 'Globalen Modus verwenden',
            'Theme A (for Similar/Identical):': 'Thema A (für Ähnlich/Identisch):',
            'Theme B (for Similar Mode Odd One Out):': 'Thema B (für Ähnlich-Modus Ausreißer):',
            'Common Images (3):': 'Gemeinsame Bilder (3):',
            'Odd Image (1):': 'Abweichendes Bild (1):',
            'Select a pattern type:': 'Mustertyp auswählen:',
            'OR Select theme for auto-picking (Optional):': 'ODER Thema für automatische Auswahl (Optional):',
            'Manual Image Selection': 'Manuelle Bildauswahl',
            'Number of Clues (4-10):': 'Anzahl der Hinweise (4-10):',
            'Image Theme (for dictionary):': 'Bildthema (für Wörterbuch):',
            'All Themes (for dictionary)': 'Alle Themen (für Wörterbuch)',
            'Type to search all images.': 'Eingeben, um alle Bilder zu durchsuchen.',
            'Search Images for manuel selection': 'Bilder für manuelle Auswahl suchen',
            'Select a theme.': 'Ein Thema auswählen.',
            'Overall Worksheet Theme:': 'Gesamt-Arbeitsblatt-Thema:',
            'None (Use Individual settings)': 'Keines (Individuelle Einstellungen verwenden)',
            'Use Overall Worksheet Theme': 'Gesamt-Arbeitsblatt-Thema verwenden',
            'Start from random element': 'Mit zufälligem Element beginnen',
            'Configure Puzzle:': 'Rätsel konfigurieren:',
            'Puzzle 1 Settings': 'Rätsel 1 Einstellungen',
            'Puzzle 2 Settings': 'Rätsel 2 Einstellungen',
            'Puzzle 3 Settings': 'Rätsel 3 Einstellungen',
            'Blank Box': 'Leeres Feld',
            'Choose From Options': 'Aus Optionen wählen',
            'Images for Selected Puzzle': 'Bilder für ausgewähltes Rätsel',
            'All Images (Search required)': 'Alle Bilder (Suche erforderlich)',

            // App specific titles that were missed
            'Matchup Maker': 'Zuordnungs-Ersteller',
            'Big Small App': 'Groß Klein App',
            'Picture Path': 'Bilderpfad',
            'Picture Bingo': 'Bilder-Bingo',
            'Chart Count Color': 'Diagramm Zählen Farbe',
            'Code Addition': 'Code-Addition',
            'Draw and Color': 'Zeichnen und Malen',
            'Find Objects': 'Objekte finden',
            'Grid Match': 'Gitter-Zuordnung',
            'Image Crossword': 'Bilder-Kreuzworträtsel',
            'Image Cryptogram': 'Bilder-Kryptogramm',
            'More Less': 'Mehr Weniger',
            'Pattern Train': 'Musterzug',
            'Pattern Worksheet': 'Muster-Arbeitsblatt',

            // Word Scramble specific strings
            'Image Word Scramble Worksheet': 'Bilder-Wörter-Mix Arbeitsblatt',
            'Square (1200x1200)': 'Quadrat (1200x1200)',
            'Outline Color:': 'Umrissfarbe:',
            'Outline (0-10):': 'Umriss (0-10):',
            'Number of Puzzles (1–10):': 'Anzahl der Rätsel (1–10):',
            'Difficulty (Number of Clues)': 'Schwierigkeit (Anzahl der Hinweise)',
            'No clues': 'Keine Hinweise',
            'Easy (1/2)': 'Einfach (1/2)',
            'Normal (1/4)': 'Normal (1/4)',
            'Tough (1/6)': 'Schwer (1/6)',
            'Letter Case': 'Buchstabengröße',
            'Uppercase': 'Großbuchstaben',
            'Lowercase': 'Kleinbuchstaben',
            'Letter Colors': 'Buchstabenfarben',
            'Color Coded (Vowel/Consonant)': 'Farbcodiert (Vokal/Konsonant)',
            'All Black': 'Alle schwarz',
            'Available Images:': 'Verfügbare Bilder:',
            'Your Uploaded Images (This Session):': 'Ihre hochgeladenen Bilder (diese Sitzung):',
            'Align Selected:': 'Ausgewählte ausrichten:',
            'Align to Page:': 'An Seite ausrichten:',
            'Clear All': 'Alles löschen',
            'Worksheet': 'Arbeitsblatt',
            'Answer Key': 'Lösungsschlüssel',
            'Selected Images for Puzzles:': 'Ausgewählte Bilder für Rätsel:',
            'Grayscale': 'Graustufen',

            // Title attributes (tooltips)
            'Layers': 'Ebenen',
            'Align': 'Ausrichten',
            'Align Left': 'Links ausrichten',
            'Center Horizontally': 'Horizontal zentrieren',
            'Align Right': 'Rechts ausrichten',
            'Align Top': 'Oben ausrichten',
            'Center Vertically': 'Vertikal zentrieren',
            'Align Bottom': 'Unten ausrichten',
            'Center on Page Horizontally': 'Horizontal auf Seite zentrieren',
            'Center on Page Vertically': 'Vertikal auf Seite zentrieren',
            'Delete Selected': 'Ausgewählte löschen',

            // Dynamic messages
            'Generating worksheet...': 'Arbeitsblatt wird erstellt...',
            'Please select some images or choose a theme with images.': 'Bitte wählen Sie Bilder aus oder wählen Sie ein Thema mit Bildern.',
            'Worksheet generated successfully!': 'Arbeitsblatt erfolgreich erstellt!',
            'Generating answer key...': 'Lösungsschlüssel wird erstellt...',
            'Answer key generated!': 'Lösungsschlüssel erstellt!',
            'Download Initiated!': 'Download gestartet!',
            'Please generate content first.': 'Bitte erstellen Sie zuerst Inhalte.',
            'Preparing PDF...': 'PDF wird vorbereitet...',
            'PDF downloaded!': 'PDF heruntergeladen!',
            'PDF Downloaded!': 'PDF heruntergeladen!',
            'Error creating PDF.': 'Fehler beim Erstellen der PDF.',
            'Please generate a worksheet first.': 'Bitte erstellen Sie zuerst ein Arbeitsblatt.',
            'Preparing JPEG...': 'JPEG wird vorbereitet...',
            'JPEG download initiated!': 'JPEG-Download gestartet!',
            'Error preparing JPEG.': 'Fehler beim Vorbereiten der JPEG-Datei.'
        };

        // Function to recursively translate all text nodes
        function translateNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent.trim();
                if (text && comprehensiveMap[text]) {
                    node.textContent = comprehensiveMap[text];
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Skip script and style elements
                if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
                    return;
                }

                // Translate placeholders
                if (node.placeholder) {
                    const placeholderText = node.placeholder.trim();
                    if (comprehensiveMap[placeholderText]) {
                        node.placeholder = comprehensiveMap[placeholderText];
                    }
                }

                // Translate button values
                if (node.tagName === 'INPUT' && node.type === 'button' && node.value) {
                    const buttonText = node.value.trim();
                    if (comprehensiveMap[buttonText]) {
                        node.value = comprehensiveMap[buttonText];
                    }
                }

                // Translate option elements
                if (node.tagName === 'OPTION' && node.textContent) {
                    const optionText = node.textContent.trim();
                    if (comprehensiveMap[optionText]) {
                        node.textContent = comprehensiveMap[optionText];
                    }
                }

                // Translate title attributes
                if (node.title) {
                    const titleText = node.title.trim();
                    if (comprehensiveMap[titleText]) {
                        node.title = comprehensiveMap[titleText];
                    }
                }

                // Translate alt attributes
                if (node.alt) {
                    const altText = node.alt.trim();
                    if (comprehensiveMap[altText]) {
                        node.alt = comprehensiveMap[altText];
                    }
                }

                // Recursively translate child nodes
                for (let child of node.childNodes) {
                    translateNode(child);
                }
            }
        }

        // Start translation from body
        translateNode(document.body);

        // Also translate document title
        if (document.title && comprehensiveMap[document.title]) {
            document.title = comprehensiveMap[document.title];
        }

        // Set up observer for dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                        translateNode(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributeFilter: ['placeholder', 'value', 'title', 'alt']
        });

        // Override specific dynamic updates for selected count
        const selectedCountMsg = document.getElementById('selectedCountMsg');
        if (selectedCountMsg) {
            const originalTextContent = Object.getOwnPropertyDescriptor(Element.prototype, 'textContent');
            Object.defineProperty(selectedCountMsg, 'textContent', {
                set: function(value) {
                    if (locale !== 'en' && value && value.includes('Selected:')) {
                        value = value.replace(/Selected: (\d+) \/ (\d+)/, 'Ausgewählt: $1 / $2');
                    }
                    originalTextContent.set.call(this, value);
                },
                get: function() {
                    return originalTextContent.get.call(this);
                }
            });
        }

        console.log('[AutoTranslate] Translation complete for locale:', locale);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            waitForTranslations(translateEverything);
            wrapDynamicFunctions();
        });
    } else {
        waitForTranslations(translateEverything);
        wrapDynamicFunctions();
    }

    // Wrap dynamic message functions to auto-translate
    function wrapDynamicFunctions() {
        // Common dynamic message translations
        const dynamicMessages = {
            'Images selected': 'Bilder ausgewählt',
            'Image selected': 'Bild ausgewählt',
            'No images selected': 'Keine Bilder ausgewählt',
            'Please select at least': 'Bitte wählen Sie mindestens',
            'images': 'Bilder',
            'image': 'Bild',
            'Selected': 'Ausgewählt',
            'Loading...': 'Wird geladen...',
            'Error': 'Fehler',
            'Success': 'Erfolg',
            'Warning': 'Warnung',
            'Please select': 'Bitte auswählen',
            'Required': 'Erforderlich',
            'Invalid': 'Ungültig',
            'Complete': 'Vollständig',
            'Processing...': 'Verarbeitung...',
            'Saved': 'Gespeichert',
            'Deleted': 'Gelöscht',
            'Updated': 'Aktualisiert',
            'Added': 'Hinzugefügt',
            'Removed': 'Entfernt',
            'Choose files': 'Dateien auswählen',
            'No file chosen': 'Keine Datei ausgewählt',
            'of': 'von'
        };

        // Wrap showMessage if it exists
        if (typeof window.showMessage === 'function') {
            const originalShowMessage = window.showMessage;
            window.showMessage = function(message, type) {
                const locale = window.currentLocale || 'en';
                if (locale !== 'en') {
                    // Try to translate the message
                    let translatedMessage = message;

                    // Handle "Selected: X / Y" pattern
                    translatedMessage = translatedMessage.replace(/Selected: (\d+) \/ (\d+)/g, 'Ausgewählt: $1 / $2');

                    for (const [eng, ger] of Object.entries(dynamicMessages)) {
                        translatedMessage = translatedMessage.replace(new RegExp(eng, 'gi'), ger);
                    }
                    // Also check comprehensive map for exact matches
                    if (comprehensiveMap && comprehensiveMap[message]) {
                        translatedMessage = comprehensiveMap[message];
                    }
                    return originalShowMessage.call(this, translatedMessage, type);
                }
                return originalShowMessage.call(this, message, type);
            };
        }

        // Also handle native file input labels
        document.querySelectorAll('input[type="file"]').forEach(input => {
            const locale = window.currentLocale || 'en';
            if (locale === 'de') {
                // Create custom button if not already created
                if (!input.hasAttribute('data-custom-button')) {
                    input.setAttribute('data-custom-button', 'true');
                    input.style.display = 'none';

                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'custom-file-button';
                    button.textContent = 'Dateien auswählen';
                    button.onclick = () => input.click();

                    const label = document.createElement('span');
                    label.className = 'file-label';
                    label.textContent = 'Keine Datei ausgewählt';

                    input.addEventListener('change', () => {
                        if (input.files.length > 0) {
                            label.textContent = input.files.length > 1
                                ? `${input.files.length} Dateien ausgewählt`
                                : input.files[0].name;
                        } else {
                            label.textContent = 'Keine Datei ausgewählt';
                        }
                    });

                    input.parentNode.insertBefore(button, input);
                    input.parentNode.insertBefore(label, input);
                }
            }
        });
    }

    // Export for manual triggering
    window.AutoTranslate = {
        translate: translateEverything,
        wrapDynamic: wrapDynamicFunctions
    };
})();