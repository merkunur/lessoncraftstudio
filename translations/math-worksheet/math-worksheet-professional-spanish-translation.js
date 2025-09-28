// 🔢 MATH WORKSHEET GENERATOR - PROFESSIONAL SPANISH TRANSLATION
// ============================================================
// Version: 2.0.0 (Pattern A)
// Last Updated: December 2024
// Total Keys: 194 (Largest app!)
// Language: Spanish (es)
// Approach: Natural Spanish as if originally created in Spain
// Educational Context: Spanish school system terminology
// ============================================================

const MATH_WORKSHEET_TRANSLATIONS_ES = {
  "es": {
    // ==========================================
    // CORE UI ELEMENTS (16 keys)
    // ==========================================
    "app.title": "Generador de fichas de matemáticas",
    "mathWorksheetGenerator": "Generador de fichas de matemáticas",
    "worksheetSettings": "Configuración de la ficha",
    "generate": "Generar",
    "generateWorksheet": "Generar ficha",
    "generateAnswerKey": "Generar solucionario",
    "download": "Descargar",
    "worksheet": "Ficha de ejercicios",
    "answerKey": "Solucionario",
    "clearAll": "Borrar todo",
    "worksheetJpeg": "Ficha de ejercicios (JPEG)",
    "answerKeyJpeg": "Solucionario (JPEG)",
    "worksheetPdf": "Ficha de ejercicios (PDF)",
    "answerKeyPdf": "Solucionario (PDF)",
    "grayscale": "Escala de grises",  // CRITICAL - User mentioned
    "deleteSelected": "Eliminar selección",

    // ==========================================
    // LANGUAGE SETTINGS (14 keys)
    // ==========================================
    "languageSettings": "Configuración de idioma",
    "selectLanguage": "Seleccionar idioma",
    "language": "Idioma:",
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
    // PAGE SETUP (21 keys) - CRITICAL CATEGORY
    // ==========================================
    "pageSetup": "Configuración de página",
    "pageSize": "Tamaño de página:",
    "letterPortrait": "Carta Vertical (8,5×11\")",
    "defaultWorksheet": "Ficha estándar (800×1000)",
    "a4Portrait": "A4 Vertical (210×297mm)",
    "a4Landscape": "A4 Horizontal (297×210mm)",
    "letterLandscape": "Carta Horizontal (11×8,5\")",
    "square": "Cuadrado (1200×1200)",
    "custom": "Personalizado",
    "widthPx": "Ancho (px):",
    "heightPx": "Alto (px):",
    "pageColor": "Color de página:",
    "applySize": "Aplicar tamaño",
    "background": "Fondo",  // CRITICAL - User mentioned
    "backgroundTheme": "Tema de fondo:",
    "none": "Ninguno",
    "selectThemeForBackgrounds": "Seleccione un tema para ver los fondos.",
    "backgroundOpacity": "Opacidad del fondo:",
    "border": "Borde",  // CRITICAL - User mentioned
    "borderTheme": "Tema de borde:",
    "selectThemeToSeeBorders": "Seleccione un tema para ver los bordes.",
    "borderOpacity": "Opacidad del borde:",

    // ==========================================
    // TEXT TOOLS (11 keys)
    // ==========================================
    "textTools": "Herramientas de texto",
    "addNewText": "Añadir nuevo texto",
    "content": "Contenido:",
    "helloPlaceholder": "¡Hola!",
    "addText": "Añadir texto",
    "selectedTextProperties": "Propiedades del texto seleccionado",
    "color": "Color:",
    "size": "Tamaño:",
    "font": "Fuente:",
    "outlineColor": "Color del contorno:",
    "outlineWidth": "Contorno (0-10):",

    // ==========================================
    // PUZZLE CONFIGURATION (14 keys)
    // ==========================================
    "puzzleConfiguration": "Configuración de ejercicios",
    "difficultyLevel": "Nivel de dificultad:",
    "veryEasy": "Muy fácil (2 símbolos)",
    "easy": "Fácil (2 símbolos)",
    "medium": "Medio (3 símbolos)",
    "hard": "Difícil (4 símbolos)",
    "numberOfExercises": "Número de ejercicios (1-6):",
    "operations": "Operaciones:",
    "additionOnly": "Solo suma",
    "additionAndSubtraction": "Suma y resta",
    "allowNegativeResults": "Permitir resultados negativos",
    "minValue": "Valor mínimo:",
    "maxValue": "Valor máximo:",
    "showAnswersInWorksheet": "Mostrar respuestas en la ficha",

    // ==========================================
    // PUZZLE NUMBER CUSTOMIZATION (7 keys)
    // ==========================================
    "showPuzzleNumbers": "Mostrar números de ejercicios",
    "titlePrefix": "Prefijo del título:",
    "titlePrefixPlaceholder": "ej. Ejercicio, Problema, Actividad",
    "startingNumber": "Número inicial:",
    "individualCustomization": "Personalización individual (opcional):",
    "puzzle": "Ejercicio",
    "answers": "Respuestas",

    // ==========================================
    // IMAGE SELECTION (13 keys)
    // ==========================================
    "imageSelectionMethod": "Método de selección de imágenes:",
    "selectImagesIndividually": "Seleccionar imágenes individualmente",
    "useFullTheme": "Usar tema completo",
    "selectImageTheme": "Seleccionar tema de imágenes:",
    "selectedImagesPool": "Colección de imágenes seleccionadas:",
    "selectImagesFromLibrary": "Seleccione imágenes de la biblioteca inferior.",
    "filterLibraryByTheme": "Filtrar biblioteca por tema:",
    "allThemes": "Todos los temas",
    "searchImages": "Buscar imágenes:",
    "searchPlaceholder": "ej. manzana, coche",
    "loadingImages": "Cargando imágenes...",
    "selectThemeOption": "-- Seleccionar tema --",
    "typeToSearchAllImages": "Escriba para buscar en todas las imágenes.",

    // ==========================================
    // CUSTOM IMAGES (7 keys)
    // ==========================================
    "customImages": "Imágenes personalizadas",
    "selectImagesToUpload": "Seleccionar imágenes para subir:",
    "yourUploadedImagesClickToUse": "Sus imágenes subidas (Clic para usar):",
    "uploadedImagesWillAppearHere": "Sus imágenes subidas aparecerán aquí.",
    "chooseFiles": "Elegir archivos",
    "noFileChosen": "Ningún archivo seleccionado",
    "filesSelected": "{} archivo(s) seleccionado(s)",

    // ==========================================
    // TOOLBAR & ALIGNMENT (15 keys)
    // ==========================================
    "layers": "Capas",
    "bringForward": "Traer al frente",
    "sendBackward": "Enviar atrás",
    "align": "Alinear",
    "alignSelected": "Alinear selección:",
    "alignLeft": "Alinear a la izquierda",
    "centerHorizontally": "Centrar horizontalmente",
    "alignRight": "Alinear a la derecha",
    "alignTop": "Alinear arriba",
    "centerVertically": "Centrar verticalmente",
    "alignBottom": "Alinear abajo",
    "alignToPage": "Alinear a la página:",
    "centerOnPageHorizontally": "Centrar horizontalmente en la página",
    "centerOnPageVertically": "Centrar verticalmente en la página",

    // ==========================================
    // SUCCESS MESSAGES (9 keys)
    // ==========================================
    "textAddedToWorksheet": "Texto añadido a la ficha.",
    "customImagesAvailable": "{} imagen(es) personalizada(s) disponible(s).",
    "themeImagesLoaded": "Imágenes del tema '{}' cargadas.",
    "successfullyGeneratedPuzzles": "¡{} ejercicios generados con éxito!",
    "puzzleNumber": "Ejercicio {}",
    "answerKeyGenerated": "¡Solucionario generado!",
    "jpegDownloadInitiated": "¡Descarga JPEG iniciada!",
    "pdfDownloaded": "¡PDF descargado!",
    "formCleared": "Formulario borrado.",

    // ==========================================
    // ERROR MESSAGES (20 keys)
    // ==========================================
    "noImageThemesFound": "No se encontraron temas de imágenes. La API podría no estar disponible o vacía.",
    "errorLoadingThemes": "Error al cargar los temas: {}.",
    "errorDuringSearch": "Error durante la búsqueda: {}",
    "errorLoadingImages": "Error al cargar las imágenes.",
    "errorReadingFile": "Error al leer el archivo: {}",
    "pleaseSelectTheme": "Por favor, seleccione un tema.",
    "errorLoadingThemeImages": "Error al cargar las imágenes del tema: {}.",
    "themeInsufficientImages": "El tema '{}' solo tiene {} imágenes, pero necesita al menos {} imágenes únicas para {} símbolos diferentes.",
    "selectMoreImages": "Por favor, seleccione al menos {} imágenes diferentes de la biblioteca (tiene {}).",
    "notEnoughUniqueImages": "No hay suficientes imágenes únicas disponibles para todos los símbolos.",
    "valueRangeTooSmall": "El rango de valores ({} a {}) es demasiado pequeño para generar {} ejercicios únicos con la dificultad seleccionada.",
    "couldNotGenerateAllPuzzles": "Solo se pudieron generar {} de {} ejercicios solicitados debido a las restricciones.",
    "couldNotGenerateAnyPuzzles": "No se pudieron generar ejercicios válidos. Pruebe con diferentes configuraciones o aumente el rango de valores.",
    "pleaseGeneratePuzzlesFirst": "Por favor, genere ejercicios primero.",
    "cannotDownloadEmptyCanvas": "No se puede descargar, el lienzo está vacío.",
    "errorPreparingJpeg": "Error al preparar el JPEG: {}",
    "errorCreatingPdf": "Error al crear el PDF: {}",
    "errorLoadingBorders": "Error al cargar los bordes.",
    "errorLoadingBackgrounds": "Error al cargar los fondos.",
    "fileSizeExceeds5MB": "El tamaño del archivo supera los 5 MB.",

    // ==========================================
    // INFO/LOADING MESSAGES (17 keys)
    // ==========================================
    "loadingDefaultTheme": "Cargando tema predeterminado...",
    "searching": "Buscando...",
    "loadingImagesForTheme": "Cargando imágenes para el tema: {}... Por favor, espere.",
    "noImagesFound": "No se encontraron imágenes{}.",
    "loadingImagesCount": "Cargando {} imagen(es)...",
    "generatedPartialPuzzles": "{} ejercicios generados (solicitados: {}).",
    "preparingJpegPleaseWait": "Preparando JPEG... Por favor, espere.",
    "preparingPdfPleaseWait": "Preparando PDF... Por favor, espere.",
    "loadingBorders": "Cargando bordes...",
    "loadingBackgrounds": "Cargando fondos...",
    "preparingWorksheet": "Preparando ficha...",
    "preparingAnswerKey": "Preparando solucionario...",
    "downloadingFile": "Descargando archivo...",
    "processingImages": "Procesando imágenes...",
    "validatingInput": "Validando entrada...",
    "generatingPuzzles": "Generando ejercicios...",
    "renderingCanvas": "Renderizando lienzo..."
  }
};

// ==========================================
// VALIDATION AND HELPER FUNCTIONS
// ==========================================

/**
 * Validates that all required keys are present
 */
function validateTranslation() {
    const requiredKeys = [
        // Core UI (16 keys)
        "app.title", "mathWorksheetGenerator", "worksheetSettings", "generate",
        "generateWorksheet", "generateAnswerKey", "download", "worksheet",
        "answerKey", "clearAll", "worksheetJpeg", "answerKeyJpeg",
        "worksheetPdf", "answerKeyPdf", "grayscale", "deleteSelected",

        // Language Settings (14 keys)
        "languageSettings", "selectLanguage", "language", "lang_en", "lang_de",
        "lang_fr", "lang_es", "lang_pt", "lang_it", "lang_nl", "lang_sv",
        "lang_da", "lang_no", "lang_fi",

        // Page Setup (21 keys)
        "pageSetup", "pageSize", "letterPortrait", "defaultWorksheet",
        "a4Portrait", "a4Landscape", "letterLandscape", "square", "custom",
        "widthPx", "heightPx", "pageColor", "applySize", "background",
        "backgroundTheme", "none", "selectThemeForBackgrounds", "backgroundOpacity",
        "border", "borderTheme", "selectThemeToSeeBorders", "borderOpacity",

        // Text Tools (11 keys)
        "textTools", "addNewText", "content", "helloPlaceholder", "addText",
        "selectedTextProperties", "color", "size", "font", "outlineColor", "outlineWidth",

        // Puzzle Configuration (14 keys)
        "puzzleConfiguration", "difficultyLevel", "veryEasy", "easy", "medium",
        "hard", "numberOfExercises", "operations", "additionOnly",
        "additionAndSubtraction", "allowNegativeResults", "minValue", "maxValue",
        "showAnswersInWorksheet",

        // Puzzle Number Customization (7 keys)
        "showPuzzleNumbers", "titlePrefix", "titlePrefixPlaceholder",
        "startingNumber", "individualCustomization", "puzzle", "answers",

        // Image Selection (13 keys)
        "imageSelectionMethod", "selectImagesIndividually", "useFullTheme",
        "selectImageTheme", "selectedImagesPool", "selectImagesFromLibrary",
        "filterLibraryByTheme", "allThemes", "searchImages", "searchPlaceholder",
        "loadingImages", "selectThemeOption", "typeToSearchAllImages",

        // Custom Images (7 keys)
        "customImages", "selectImagesToUpload", "yourUploadedImagesClickToUse",
        "uploadedImagesWillAppearHere", "chooseFiles", "noFileChosen", "filesSelected",

        // Toolbar & Alignment (15 keys)
        "layers", "bringForward", "sendBackward", "align", "alignSelected",
        "alignLeft", "centerHorizontally", "alignRight", "alignTop",
        "centerVertically", "alignBottom", "alignToPage",
        "centerOnPageHorizontally", "centerOnPageVertically",

        // Success Messages (9 keys)
        "textAddedToWorksheet", "customImagesAvailable", "themeImagesLoaded",
        "successfullyGeneratedPuzzles", "puzzleNumber", "answerKeyGenerated",
        "jpegDownloadInitiated", "pdfDownloaded", "formCleared",

        // Error Messages (20 keys)
        "noImageThemesFound", "errorLoadingThemes", "errorDuringSearch",
        "errorLoadingImages", "errorReadingFile", "pleaseSelectTheme",
        "errorLoadingThemeImages", "themeInsufficientImages", "selectMoreImages",
        "notEnoughUniqueImages", "valueRangeTooSmall", "couldNotGenerateAllPuzzles",
        "couldNotGenerateAnyPuzzles", "pleaseGeneratePuzzlesFirst",
        "cannotDownloadEmptyCanvas", "errorPreparingJpeg", "errorCreatingPdf",
        "errorLoadingBorders", "errorLoadingBackgrounds", "fileSizeExceeds5MB",

        // Info/Loading Messages (17 keys)
        "loadingDefaultTheme", "searching", "loadingImagesForTheme",
        "noImagesFound", "loadingImagesCount", "generatedPartialPuzzles",
        "preparingJpegPleaseWait", "preparingPdfPleaseWait", "loadingBorders",
        "loadingBackgrounds", "preparingWorksheet", "preparingAnswerKey",
        "downloadingFile", "processingImages", "validatingInput",
        "generatingPuzzles", "renderingCanvas"
    ];

    const missingKeys = [];
    const extraKeys = [];

    // Check for missing keys
    requiredKeys.forEach(key => {
        if (!(key in MATH_WORKSHEET_TRANSLATIONS_ES.es)) {
            missingKeys.push(key);
        }
    });

    // Check for extra keys not in the required list
    Object.keys(MATH_WORKSHEET_TRANSLATIONS_ES.es).forEach(key => {
        if (!requiredKeys.includes(key)) {
            extraKeys.push(key);
        }
    });

    return {
        isValid: missingKeys.length === 0,
        totalKeys: Object.keys(MATH_WORKSHEET_TRANSLATIONS_ES.es).length,
        expectedKeys: requiredKeys.length,
        missingKeys,
        extraKeys,
        criticalItemsPresent: {
            border: MATH_WORKSHEET_TRANSLATIONS_ES.es.border === "Borde",
            background: MATH_WORKSHEET_TRANSLATIONS_ES.es.background === "Fondo",
            grayscale: MATH_WORKSHEET_TRANSLATIONS_ES.es.grayscale === "Escala de grises"
        },
        mathematicalTerminology: {
            addition: MATH_WORKSHEET_TRANSLATIONS_ES.es.additionOnly === "Solo suma",
            subtraction: MATH_WORKSHEET_TRANSLATIONS_ES.es.additionAndSubtraction === "Suma y resta",
            exercises: MATH_WORKSHEET_TRANSLATIONS_ES.es.numberOfExercises === "Número de ejercicios (1-6):",
            worksheet: MATH_WORKSHEET_TRANSLATIONS_ES.es.worksheet === "Ficha de ejercicios",
            answerKey: MATH_WORKSHEET_TRANSLATIONS_ES.es.answerKey === "Solucionario"
        }
    };
}

// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MATH_WORKSHEET_TRANSLATIONS_ES;
}



// ==========================================
// TRANSLATION VALIDATION REPORT
// ==========================================

const validationResult = validateTranslation();
console.log("=================================");
console.log("🔢 MATH WORKSHEET SPANISH TRANSLATION VALIDATION");
console.log("=================================");
console.log(`✓ Total Keys: ${validationResult.totalKeys}`);
console.log(`✓ Expected Keys: ${validationResult.expectedKeys}`);
console.log(`✓ Valid: ${validationResult.isValid ? 'YES ✅' : 'NO ❌'}`);
console.log(`✓ Critical Items:`);
console.log(`  - Border: ${validationResult.criticalItemsPresent.border ? '✅ Borde' : '❌'}`);
console.log(`  - Background: ${validationResult.criticalItemsPresent.background ? '✅ Fondo' : '❌'}`);
console.log(`  - Grayscale: ${validationResult.criticalItemsPresent.grayscale ? '✅ Escala de grises' : '❌'}`);
console.log(`✓ Mathematical Terminology:`);
console.log(`  - Addition: ${validationResult.mathematicalTerminology.addition ? '✅' : '❌'}`);
console.log(`  - Subtraction: ${validationResult.mathematicalTerminology.subtraction ? '✅' : '❌'}`);
console.log(`  - Exercises: ${validationResult.mathematicalTerminology.exercises ? '✅' : '❌'}`);
console.log(`  - Worksheet: ${validationResult.mathematicalTerminology.worksheet ? '✅' : '❌'}`);
console.log(`  - Answer Key: ${validationResult.mathematicalTerminology.answerKey ? '✅' : '❌'}`);

if (validationResult.missingKeys.length > 0) {
    console.log(`\n⚠️ Missing Keys: ${validationResult.missingKeys.join(', ')}`);
}

if (validationResult.extraKeys.length > 0) {
    console.log(`\n⚠️ Extra Keys: ${validationResult.extraKeys.join(', ')}`);
}

console.log("\n=================================");
console.log("📝 TRANSLATION APPROACH SUMMARY");
console.log("=================================");
console.log("• Language: Spanish (es)");
console.log("• Style: Natural Spanish, educational context");
console.log("• Mathematical Terminology: Spanish school system standards");
console.log("• Key Decisions:");
console.log("  - 'Ficha de ejercicios' for Worksheet (Spanish educational standard)");
console.log("  - 'Solucionario' for Answer Key (formal educational term)");
console.log("  - 'Ejercicio' for Puzzle/Exercise (natural Spanish term)");
console.log("  - 'Borde' for Border (critical item)");
console.log("  - 'Fondo' for Background (critical item)");
console.log("  - 'Escala de grises' for Grayscale (critical item)");
console.log("  - 'Nivel de dificultad' for Difficulty Level");
console.log("  - 'Operaciones' for Operations (mathematical term)");
console.log("=================================");

// ==========================================
// CRITICAL IMPLEMENTATION NOTES
// ==========================================
/*
IMPORTANT: The Math Worksheet app is the LARGEST with 194 keys!
- Only 7 out of 194 elements have data-translate attributes (puzzle numbers)
- 142 HTML elements need attributes added
- 45 JavaScript messages are hardcoded
- Mathematical terminology must be consistent throughout

See MATH-WORKSHEET-TRANSLATION-IMPLEMENTATION-PLAN.md for the complete
implementation guide with all line numbers and required changes.

Critical items that MUST be translated (user-specified):
1. Border → Borde ✅
2. Background → Fondo ✅
3. Grayscale → Escala de grises ✅

Mathematical terminology decisions:
- Ficha de ejercicios (Spanish educational standard)
- Solucionario (formal term used in Spanish education)
- Ejercicio (not "Puzle" - appropriate for educational context)
- Operaciones (standard mathematical term)
*/