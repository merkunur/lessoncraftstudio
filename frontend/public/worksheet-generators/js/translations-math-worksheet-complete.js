/**
 * PROFESSIONAL MATH WORKSHEET TRANSLATIONS - ALL LANGUAGES
 * =========================================================
 * Complete multi-language translation system for Math Worksheet Generator
 * Created: December 2024
 * Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
 */

// Define translation function if not already defined
if (typeof t === 'undefined') {
    window.t = function(key) {
        if (typeof translations === 'undefined') {
            console.warn('Translations not loaded, returning key:', key);
            return key;
        }
        const locale = window.currentLocale || 'en';
        const translation = (translations[locale] && translations[locale][key]) ||
                           (translations.en && translations.en[key]) ||
                           key;
        return translation;
    };
}

// Format translation with placeholders
if (typeof formatTranslation === 'undefined') {
    window.formatTranslation = function(text, ...values) {
        let result = text;
        values.forEach((value) => {
            result = result.replace('{}', value);
        });
        return result;
    };
}

const translations = {
    en: {
        // App Metadata & Title
        "mathWorksheetGenerator": "Math Worksheet Generator",
        "worksheetSettings": "Worksheet Settings",

        // Language Settings
        "languageSettings": "Language Settings",
        "selectLanguage": "Select Language",
        "language": "Language:",

        // Page Setup
        "pageSetup": "Page Setup",
        "pageSize": "Page Size:",
        "letterPortrait": "Letter Portrait (8.5×11\")",
        "letterLandscape": "Letter Landscape (11×8.5\")",
        "a4Portrait": "A4 Portrait (210×297mm)",
        "a4Landscape": "A4 Landscape (297×210mm)",
        "defaultWorksheet": "Default Worksheet (800×1000)",
        "square": "Square (1200×1200)",
        "custom": "Custom",
        "widthPx": "Width (px):",
        "heightPx": "Height (px):",
        "applySize": "Apply Size",
        "pageColor": "Page Color:",

        // Background Settings
        "background": "Background",
        "backgroundTheme": "Background Theme:",
        "none": "None",
        "common.none": "None",
        "allThemes": "All Themes",
        "backgroundOpacity": "Background Opacity:",
        "selectThemeForBackgrounds": "Select a theme for backgrounds.",

        // Border Settings
        "border": "Border",
        "borderTheme": "Border Theme:",
        "borderOpacity": "Border Opacity:",
        "selectThemeToSeeBorders": "Select a theme to see borders.",

        // Problem Settings
        "problemSettings": "Problem Settings",
        "problemType": "Problem Type:",
        "addition": "Addition",
        "subtraction": "Subtraction",
        "multiplication": "Multiplication",
        "division": "Division",
        "mixed": "Mixed",
        "numberRange": "Number Range:",
        "minNumber": "Min:",
        "maxNumber": "Max:",
        "numberOfProblems": "Number of Problems:",
        "problemsPerRow": "Problems per Row:",

        // Layout Options
        "layoutOptions": "Layout Options",
        "showGridLines": "Show Grid Lines",
        "includeNameField": "Include Name Field",
        "includeDateField": "Include Date Field",
        "includeScoreField": "Include Score Field",

        // Style Options
        "styleOptions": "Style Options",
        "fontSize": "Font Size:",
        "fontFamily": "Font Family:",
        "textColor": "Text Color:",
        "problemSpacing": "Problem Spacing:",

        // Actions
        "generate": "Generate",
        "generateWorksheet": "Generate Worksheet",
        "generateAnswerKey": "Generate Answer Key",
        "download": "Download",
        "downloadWorksheetJPEG": "Download Worksheet (JPEG)",
        "downloadWorksheetPDF": "Download Worksheet (PDF)",
        "downloadAnswerKeyJPEG": "Download Answer Key (JPEG)",
        "downloadAnswerKeyPDF": "Download Answer Key (PDF)",
        "clearAll": "Clear All",

        // Messages
        "generatingWorksheet": "Generating worksheet...",
        "generatingAnswerKey": "Generating answer key...",
        "worksheetGenerated": "Worksheet generated successfully!",
        "answerKeyGenerated": "Answer key generated successfully!",
        "pleaseGenerateWorksheetFirst": "Please generate worksheet first.",
        "errorGenerating": "Error generating worksheet.",
        "downloadStarted": "Download started.",

        // Tool Labels
        "addText": "Add Text",
        "addShape": "Add Shape",
        "uploadImage": "Upload Image",
        "undo": "Undo",
        "redo": "Redo",
        "deleteSelected": "Delete Selected"
    },

    de: {
        // App Metadata & Title
        "mathWorksheetGenerator": "Mathe-Arbeitsblatt-Generator",
        "worksheetSettings": "Arbeitsblatt-Einstellungen",

        // Language Settings
        "languageSettings": "Spracheinstellungen",
        "selectLanguage": "Sprache auswählen",
        "language": "Sprache:",

        // Page Setup
        "pageSetup": "Seiteneinrichtung",
        "pageSize": "Seitengröße:",
        "letterPortrait": "Letter Hochformat (8,5×11\")",
        "letterLandscape": "Letter Querformat (11×8,5\")",
        "a4Portrait": "A4 Hochformat (210×297mm)",
        "a4Landscape": "A4 Querformat (297×210mm)",
        "defaultWorksheet": "Standard-Arbeitsblatt (800×1000)",
        "square": "Quadrat (1200×1200)",
        "custom": "Benutzerdefiniert",
        "widthPx": "Breite (px):",
        "heightPx": "Höhe (px):",
        "applySize": "Größe anwenden",
        "pageColor": "Seitenfarbe:",

        // Background Settings
        "background": "Hintergrund",
        "backgroundTheme": "Hintergrundthema:",
        "none": "Keines",
        "common.none": "Kein",
        "allThemes": "Alle Themen",
        "backgroundOpacity": "Hintergrund-Deckkraft:",
        "selectThemeForBackgrounds": "Wählen Sie ein Thema für Hintergründe.",

        // Border Settings
        "border": "Rahmen",
        "borderTheme": "Rahmenthema:",
        "borderOpacity": "Rahmen-Deckkraft:",
        "selectThemeToSeeBorders": "Wählen Sie ein Thema für Rahmen.",

        // Problem Settings
        "problemSettings": "Aufgabeneinstellungen",
        "problemType": "Aufgabentyp:",
        "addition": "Addition",
        "subtraction": "Subtraktion",
        "multiplication": "Multiplikation",
        "division": "Division",
        "mixed": "Gemischt",
        "numberRange": "Zahlenbereich:",
        "minNumber": "Min:",
        "maxNumber": "Max:",
        "numberOfProblems": "Anzahl der Aufgaben:",
        "problemsPerRow": "Aufgaben pro Zeile:",

        // Layout Options
        "layoutOptions": "Layout-Optionen",
        "showGridLines": "Gitterlinien anzeigen",
        "includeNameField": "Namensfeld einschließen",
        "includeDateField": "Datumsfeld einschließen",
        "includeScoreField": "Punktefeld einschließen",

        // Style Options
        "styleOptions": "Stil-Optionen",
        "fontSize": "Schriftgröße:",
        "fontFamily": "Schriftart:",
        "textColor": "Textfarbe:",
        "problemSpacing": "Aufgabenabstand:",

        // Actions
        "generate": "Generieren",
        "generateWorksheet": "Arbeitsblatt generieren",
        "generateAnswerKey": "Lösungsschlüssel generieren",
        "download": "Herunterladen",
        "downloadWorksheetJPEG": "Arbeitsblatt herunterladen (JPEG)",
        "downloadWorksheetPDF": "Arbeitsblatt herunterladen (PDF)",
        "downloadAnswerKeyJPEG": "Lösungsschlüssel herunterladen (JPEG)",
        "downloadAnswerKeyPDF": "Lösungsschlüssel herunterladen (PDF)",
        "clearAll": "Alles löschen",

        // Messages
        "generatingWorksheet": "Arbeitsblatt wird generiert...",
        "generatingAnswerKey": "Lösungsschlüssel wird generiert...",
        "worksheetGenerated": "Arbeitsblatt erfolgreich generiert!",
        "answerKeyGenerated": "Lösungsschlüssel erfolgreich generiert!",
        "pleaseGenerateWorksheetFirst": "Bitte zuerst Arbeitsblatt generieren.",
        "errorGenerating": "Fehler beim Generieren des Arbeitsblatts.",
        "downloadStarted": "Download gestartet.",

        // Tool Labels
        "addText": "Text hinzufügen",
        "addShape": "Form hinzufügen",
        "uploadImage": "Bild hochladen",
        "undo": "Rückgängig",
        "redo": "Wiederholen",
        "deleteSelected": "Ausgewählte löschen"
    },

    fr: {
        // App Metadata & Title
        "mathWorksheetGenerator": "Générateur de Feuilles de Maths",
        "worksheetSettings": "Paramètres de la feuille",

        // Language Settings
        "languageSettings": "Paramètres de langue",
        "selectLanguage": "Sélectionner la langue",
        "language": "Langue :",

        // Page Setup
        "pageSetup": "Configuration de page",
        "pageSize": "Taille de page :",
        "letterPortrait": "Lettre Portrait (8,5×11\")",
        "letterLandscape": "Lettre Paysage (11×8,5\")",
        "a4Portrait": "A4 Portrait (210×297mm)",
        "a4Landscape": "A4 Paysage (297×210mm)",
        "defaultWorksheet": "Feuille par défaut (800×1000)",
        "square": "Carré (1200×1200)",
        "custom": "Personnalisé",
        "widthPx": "Largeur (px) :",
        "heightPx": "Hauteur (px) :",
        "applySize": "Appliquer la taille",
        "pageColor": "Couleur de page :",

        // Background Settings
        "background": "Arrière-plan",
        "backgroundTheme": "Thème d'arrière-plan :",
        "none": "Aucun",
        "common.none": "Aucun",
        "allThemes": "Tous les thèmes",
        "backgroundOpacity": "Opacité de l'arrière-plan :",
        "selectThemeForBackgrounds": "Sélectionnez un thème pour les arrière-plans.",

        // Border Settings
        "border": "Bordure",
        "borderTheme": "Thème de bordure :",
        "borderOpacity": "Opacité de la bordure :",
        "selectThemeToSeeBorders": "Sélectionnez un thème pour les bordures.",

        // Problem Settings
        "problemSettings": "Paramètres des problèmes",
        "problemType": "Type de problème :",
        "addition": "Addition",
        "subtraction": "Soustraction",
        "multiplication": "Multiplication",
        "division": "Division",
        "mixed": "Mixte",
        "numberRange": "Plage de nombres :",
        "minNumber": "Min :",
        "maxNumber": "Max :",
        "numberOfProblems": "Nombre de problèmes :",
        "problemsPerRow": "Problèmes par ligne :",

        // Layout Options
        "layoutOptions": "Options de mise en page",
        "showGridLines": "Afficher les lignes de grille",
        "includeNameField": "Inclure le champ nom",
        "includeDateField": "Inclure le champ date",
        "includeScoreField": "Inclure le champ score",

        // Style Options
        "styleOptions": "Options de style",
        "fontSize": "Taille de police :",
        "fontFamily": "Police :",
        "textColor": "Couleur du texte :",
        "problemSpacing": "Espacement des problèmes :",

        // Actions
        "generate": "Générer",
        "generateWorksheet": "Générer la feuille",
        "generateAnswerKey": "Générer le corrigé",
        "download": "Télécharger",
        "downloadWorksheetJPEG": "Télécharger la feuille (JPEG)",
        "downloadWorksheetPDF": "Télécharger la feuille (PDF)",
        "downloadAnswerKeyJPEG": "Télécharger le corrigé (JPEG)",
        "downloadAnswerKeyPDF": "Télécharger le corrigé (PDF)",
        "clearAll": "Tout effacer",

        // Messages
        "generatingWorksheet": "Génération de la feuille...",
        "generatingAnswerKey": "Génération du corrigé...",
        "worksheetGenerated": "Feuille générée avec succès !",
        "answerKeyGenerated": "Corrigé généré avec succès !",
        "pleaseGenerateWorksheetFirst": "Veuillez d'abord générer la feuille.",
        "errorGenerating": "Erreur lors de la génération.",
        "downloadStarted": "Téléchargement démarré.",

        // Tool Labels
        "addText": "Ajouter du texte",
        "addShape": "Ajouter une forme",
        "uploadImage": "Téléverser une image",
        "undo": "Annuler",
        "redo": "Refaire",
        "deleteSelected": "Supprimer la sélection"
    },

    es: {
        // App Metadata & Title
        "mathWorksheetGenerator": "Generador de Hojas de Matemáticas",
        "worksheetSettings": "Configuración de la hoja",

        // Language Settings
        "languageSettings": "Configuración de idioma",
        "selectLanguage": "Seleccionar idioma",
        "language": "Idioma:",

        // Page Setup
        "pageSetup": "Configuración de página",
        "pageSize": "Tamaño de página:",
        "letterPortrait": "Carta Vertical (8.5×11\")",
        "letterLandscape": "Carta Horizontal (11×8.5\")",
        "a4Portrait": "A4 Vertical (210×297mm)",
        "a4Landscape": "A4 Horizontal (297×210mm)",
        "defaultWorksheet": "Hoja predeterminada (800×1000)",
        "square": "Cuadrado (1200×1200)",
        "custom": "Personalizado",
        "widthPx": "Ancho (px):",
        "heightPx": "Alto (px):",
        "applySize": "Aplicar tamaño",
        "pageColor": "Color de página:",

        // Background Settings
        "background": "Fondo",
        "backgroundTheme": "Tema de fondo:",
        "none": "Ninguno",
        "common.none": "Ninguno",
        "allThemes": "Todos los temas",
        "backgroundOpacity": "Opacidad del fondo:",
        "selectThemeForBackgrounds": "Seleccione un tema para fondos.",

        // Border Settings
        "border": "Borde",
        "borderTheme": "Tema del borde:",
        "borderOpacity": "Opacidad del borde:",
        "selectThemeToSeeBorders": "Seleccione un tema para bordes.",

        // Problem Settings
        "problemSettings": "Configuración de problemas",
        "problemType": "Tipo de problema:",
        "addition": "Suma",
        "subtraction": "Resta",
        "multiplication": "Multiplicación",
        "division": "División",
        "mixed": "Mixto",
        "numberRange": "Rango de números:",
        "minNumber": "Mín:",
        "maxNumber": "Máx:",
        "numberOfProblems": "Número de problemas:",
        "problemsPerRow": "Problemas por fila:",

        // Layout Options
        "layoutOptions": "Opciones de diseño",
        "showGridLines": "Mostrar líneas de cuadrícula",
        "includeNameField": "Incluir campo de nombre",
        "includeDateField": "Incluir campo de fecha",
        "includeScoreField": "Incluir campo de puntuación",

        // Style Options
        "styleOptions": "Opciones de estilo",
        "fontSize": "Tamaño de fuente:",
        "fontFamily": "Tipo de letra:",
        "textColor": "Color del texto:",
        "problemSpacing": "Espaciado de problemas:",

        // Actions
        "generate": "Generar",
        "generateWorksheet": "Generar hoja",
        "generateAnswerKey": "Generar clave de respuestas",
        "download": "Descargar",
        "downloadWorksheetJPEG": "Descargar hoja (JPEG)",
        "downloadWorksheetPDF": "Descargar hoja (PDF)",
        "downloadAnswerKeyJPEG": "Descargar clave (JPEG)",
        "downloadAnswerKeyPDF": "Descargar clave (PDF)",
        "clearAll": "Borrar todo",

        // Messages
        "generatingWorksheet": "Generando hoja...",
        "generatingAnswerKey": "Generando clave de respuestas...",
        "worksheetGenerated": "¡Hoja generada con éxito!",
        "answerKeyGenerated": "¡Clave de respuestas generada con éxito!",
        "pleaseGenerateWorksheetFirst": "Por favor, genere primero la hoja.",
        "errorGenerating": "Error al generar la hoja.",
        "downloadStarted": "Descarga iniciada.",

        // Tool Labels
        "addText": "Añadir texto",
        "addShape": "Añadir forma",
        "uploadImage": "Subir imagen",
        "undo": "Deshacer",
        "redo": "Rehacer",
        "deleteSelected": "Eliminar selección"
    },

    it: {
        // App Metadata & Title
        "mathWorksheetGenerator": "Generatore di Schede di Matematica",
        "worksheetSettings": "Impostazioni scheda",

        // Language Settings
        "languageSettings": "Impostazioni lingua",
        "selectLanguage": "Seleziona lingua",
        "language": "Lingua:",

        // Page Setup
        "pageSetup": "Impostazione pagina",
        "pageSize": "Dimensione pagina:",
        "letterPortrait": "Lettera Verticale (8.5×11\")",
        "letterLandscape": "Lettera Orizzontale (11×8.5\")",
        "a4Portrait": "A4 Verticale (210×297mm)",
        "a4Landscape": "A4 Orizzontale (297×210mm)",
        "defaultWorksheet": "Scheda predefinita (800×1000)",
        "square": "Quadrato (1200×1200)",
        "custom": "Personalizzato",
        "widthPx": "Larghezza (px):",
        "heightPx": "Altezza (px):",
        "applySize": "Applica dimensione",
        "pageColor": "Colore pagina:",

        // Background Settings
        "background": "Sfondo",
        "backgroundTheme": "Tema sfondo:",
        "none": "Nessuno",
        "common.none": "Nessuno",
        "allThemes": "Tutti i temi",
        "backgroundOpacity": "Opacità sfondo:",
        "selectThemeForBackgrounds": "Seleziona un tema per gli sfondi.",

        // Border Settings
        "border": "Bordo",
        "borderTheme": "Tema bordo:",
        "borderOpacity": "Opacità bordo:",
        "selectThemeToSeeBorders": "Seleziona un tema per i bordi.",

        // Problem Settings
        "problemSettings": "Impostazioni problemi",
        "problemType": "Tipo di problema:",
        "addition": "Addizione",
        "subtraction": "Sottrazione",
        "multiplication": "Moltiplicazione",
        "division": "Divisione",
        "mixed": "Misto",
        "numberRange": "Intervallo numeri:",
        "minNumber": "Min:",
        "maxNumber": "Max:",
        "numberOfProblems": "Numero di problemi:",
        "problemsPerRow": "Problemi per riga:",

        // Layout Options
        "layoutOptions": "Opzioni layout",
        "showGridLines": "Mostra griglia",
        "includeNameField": "Includi campo nome",
        "includeDateField": "Includi campo data",
        "includeScoreField": "Includi campo punteggio",

        // Style Options
        "styleOptions": "Opzioni stile",
        "fontSize": "Dimensione carattere:",
        "fontFamily": "Tipo di carattere:",
        "textColor": "Colore testo:",
        "problemSpacing": "Spaziatura problemi:",

        // Actions
        "generate": "Genera",
        "generateWorksheet": "Genera scheda",
        "generateAnswerKey": "Genera soluzioni",
        "download": "Scarica",
        "downloadWorksheetJPEG": "Scarica scheda (JPEG)",
        "downloadWorksheetPDF": "Scarica scheda (PDF)",
        "downloadAnswerKeyJPEG": "Scarica soluzioni (JPEG)",
        "downloadAnswerKeyPDF": "Scarica soluzioni (PDF)",
        "clearAll": "Cancella tutto",

        // Messages
        "generatingWorksheet": "Generazione scheda...",
        "generatingAnswerKey": "Generazione soluzioni...",
        "worksheetGenerated": "Scheda generata con successo!",
        "answerKeyGenerated": "Soluzioni generate con successo!",
        "pleaseGenerateWorksheetFirst": "Per favore genera prima la scheda.",
        "errorGenerating": "Errore nella generazione.",
        "downloadStarted": "Download avviato.",

        // Tool Labels
        "addText": "Aggiungi testo",
        "addShape": "Aggiungi forma",
        "uploadImage": "Carica immagine",
        "undo": "Annulla",
        "redo": "Ripeti",
        "deleteSelected": "Elimina selezione"
    },

    pt: {
        // App Metadata & Title
        "mathWorksheetGenerator": "Gerador de Folhas de Matemática",
        "worksheetSettings": "Configurações da folha",

        // Language Settings
        "languageSettings": "Configurações de idioma",
        "selectLanguage": "Selecionar idioma",
        "language": "Idioma:",

        // Page Setup
        "pageSetup": "Configuração de página",
        "pageSize": "Tamanho da página:",
        "letterPortrait": "Carta Vertical (8.5×11\")",
        "letterLandscape": "Carta Horizontal (11×8.5\")",
        "a4Portrait": "A4 Vertical (210×297mm)",
        "a4Landscape": "A4 Horizontal (297×210mm)",
        "defaultWorksheet": "Folha padrão (800×1000)",
        "square": "Quadrado (1200×1200)",
        "custom": "Personalizado",
        "widthPx": "Largura (px):",
        "heightPx": "Altura (px):",
        "applySize": "Aplicar tamanho",
        "pageColor": "Cor da página:",

        // Background Settings
        "background": "Fundo",
        "backgroundTheme": "Tema de fundo:",
        "none": "Nenhum",
        "common.none": "Nenhum",
        "allThemes": "Todos os temas",
        "backgroundOpacity": "Opacidade do fundo:",
        "selectThemeForBackgrounds": "Selecione um tema para fundos.",

        // Border Settings
        "border": "Borda",
        "borderTheme": "Tema da borda:",
        "borderOpacity": "Opacidade da borda:",
        "selectThemeToSeeBorders": "Selecione um tema para bordas.",

        // Problem Settings
        "problemSettings": "Configurações de problemas",
        "problemType": "Tipo de problema:",
        "addition": "Adição",
        "subtraction": "Subtração",
        "multiplication": "Multiplicação",
        "division": "Divisão",
        "mixed": "Misto",
        "numberRange": "Intervalo de números:",
        "minNumber": "Mín:",
        "maxNumber": "Máx:",
        "numberOfProblems": "Número de problemas:",
        "problemsPerRow": "Problemas por linha:",

        // Layout Options
        "layoutOptions": "Opções de layout",
        "showGridLines": "Mostrar linhas de grade",
        "includeNameField": "Incluir campo nome",
        "includeDateField": "Incluir campo data",
        "includeScoreField": "Incluir campo pontuação",

        // Style Options
        "styleOptions": "Opções de estilo",
        "fontSize": "Tamanho da fonte:",
        "fontFamily": "Tipo de fonte:",
        "textColor": "Cor do texto:",
        "problemSpacing": "Espaçamento dos problemas:",

        // Actions
        "generate": "Gerar",
        "generateWorksheet": "Gerar folha",
        "generateAnswerKey": "Gerar gabarito",
        "download": "Baixar",
        "downloadWorksheetJPEG": "Baixar folha (JPEG)",
        "downloadWorksheetPDF": "Baixar folha (PDF)",
        "downloadAnswerKeyJPEG": "Baixar gabarito (JPEG)",
        "downloadAnswerKeyPDF": "Baixar gabarito (PDF)",
        "clearAll": "Limpar tudo",

        // Messages
        "generatingWorksheet": "Gerando folha...",
        "generatingAnswerKey": "Gerando gabarito...",
        "worksheetGenerated": "Folha gerada com sucesso!",
        "answerKeyGenerated": "Gabarito gerado com sucesso!",
        "pleaseGenerateWorksheetFirst": "Por favor, gere a folha primeiro.",
        "errorGenerating": "Erro ao gerar folha.",
        "downloadStarted": "Download iniciado.",

        // Tool Labels
        "addText": "Adicionar texto",
        "addShape": "Adicionar forma",
        "uploadImage": "Carregar imagem",
        "undo": "Desfazer",
        "redo": "Refazer",
        "deleteSelected": "Excluir seleção"
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}

// Make translations globally available
window.translations = translations;

console.log('Math Worksheet translations loaded!', Object.keys(translations));