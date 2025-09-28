// Treasure Hunt App - Professional Spanish Translation
// Total: 80+ translation keys (75 unique)
// Approach: Natural, educational Spanish as if originally developed in Spain/Latin America
// App name: "Generador de Búsqueda del Tesoro" (Treasure Hunt Generator - engaging educational term)

const TREASURE_HUNT_SPANISH_TRANSLATIONS = {
  es: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Generador de Búsqueda del Tesoro",
    "settings.title": "Configuración de la Actividad",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Configuración de Idioma",
    "settings.pageSetup": "Configuración de Página",
    "settings.textTools": "Herramientas de Texto",
    "settings.puzzleSetup": "Configuración del Juego",
    "library.title": "Biblioteca de Imágenes",
    "library.uploadTitle": "Subir Imágenes Propias",

    // ===== 3. LANGUAGE SECTION (12 items) =====
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
    "lang.fi": "Suomi (Finlandés)",

    // ===== 4. PAGE SETUP (17 items) =====
    "settings.pageSize": "Tamaño de Página:",
    "pageSize.letterPortrait": "Carta Vertical (612×792)",
    "pageSize.letterLandscape": "Carta Horizontal (792×612)",
    "pageSize.a4Portrait": "A4 Vertical (595×842)",
    "pageSize.a4Landscape": "A4 Horizontal (842×595)",
    "pageSize.square": "Cuadrado (1200×1200)",
    "pageSize.custom": "Personalizado",
    "settings.width": "Ancho (px):",
    "settings.height": "Alto (px):",
    "settings.pageColor": "Color de Página:",
    "decoration.backgroundTheme": "Tema de Fondo:",
    "decoration.none": "Ninguno",
    "decoration.backgroundOpacity": "Opacidad del Fondo:",
    "decoration.borderTheme": "Tema del Marco:",
    "decoration.borderOpacity": "Opacidad del Marco:",
    "button.applySize": "Aplicar Tamaño",
    "settings.grayscale": "Escala de grises",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Contenido:",
    "text.placeholder": "¡Hola!",
    "button.addText": "Añadir Texto",
    "text.color": "Color:",
    "text.size": "Tamaño:",
    "text.font": "Fuente:",
    "text.default": "Nuevo Texto",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Generar desde un Tema (Reemplaza la Selección Manual):",
    "puzzle.selectTheme": "-- Selecciona un Tema para la Actividad --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Seleccionar Tema del Diccionario:",
    "library.search": "Buscar Imágenes:",
    "library.searchPlaceholder": "ej: manzana, coche",
    "library.availableImages": "Imágenes Disponibles (Haz clic para añadir a la selección manual):",
    "library.selectUpload": "Selecciona imágenes para subir:",
    "library.uploadedImages": "Tus Imágenes Subidas (Haz Clic para Seleccionar):",
    "library.selectedCount": "Seleccionadas: {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Capas",
    "toolbar.bringForward": "Traer Adelante",
    "toolbar.sendBackward": "Enviar Atrás",
    "toolbar.delete": "Eliminar Selección",
    "toolbar.align": "Alinear",
    "toolbar.center": "Centrar",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generar",
    "button.generateWorksheet": "Generar Actividad",
    "button.generateAnswer": "Generar Solución",
    "button.download": "Descargar",
    "button.worksheetJpeg": "Actividad (JPEG)",
    "button.answerJpeg": "Solución (JPEG)",
    "button.worksheetPdf": "Actividad (PDF)",
    "button.answerPdf": "Solución (PDF)",
    "button.clearAll": "Borrar Todo",
    "button.downloadJpeg": "Descargar JPEG",
    "button.downloadPdf": "Descargar PDF",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Hoja de Actividades",
    "tab.answerKey": "Solución",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Texto añadido.",
    "message.formCleared": "Formulario borrado.",
    "message.worksheetGenerated": "¡Actividad generada!",
    "message.answerGenerated": "¡Solución generada!",
    "message.downloadStarted": "¡Descarga iniciada!",
    "message.pdfDownloaded": "¡PDF descargado!",
    "message.pdfSuccess": "¡PDF descargado!",
    "message.jpegDownloaded": "¡Descarga JPEG iniciada!",
    "message.assetAdded": "{type} añadido.",
    "message.downloadInitiated": "¡Descarga iniciada!",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "No se pudieron cargar los temas.",
    "message.maxImages": "Máximo de 6 imágenes seleccionadas.",
    "message.themeNoImages": 'El tema "{theme}" no tiene imágenes.',
    "message.themeLoadError": "Error al cargar las imágenes del tema.",
    "message.selectSixImages": "Selecciona exactamente 6 imágenes manualmente, o elige un tema para generar automáticamente.",
    "message.noPuzzleData": "No se generaron datos del juego.",
    "message.generateFirst": "Primero genera una actividad.",
    "message.canvasEmpty": "El área de trabajo está vacía.",
    "message.jpegError": "Error al preparar el JPEG.",
    "message.pdfError": "Error al crear el PDF.",
    "message.pdfCreateError": "Error al crear el PDF.",
    "message.generateContent": "Primero genera contenido.",
    "message.generateWorksheet": "Primero genera una actividad.",
    "message.jpegPrepError": "Error al preparar el JPEG.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Selecciona un tema para ver los marcos.",
    "message.selectBackgroundTheme": "Selecciona un tema para los fondos.",
    "message.loading": "Cargando...",
    "message.typeToSearch": "Escribe para buscar en todas las imágenes.",
    "message.searchError": "Error durante la búsqueda.",
    "message.imagesError": "Error al cargar las imágenes.",
    "message.noImages": "No se encontraron imágenes.",
    "message.uploadedHere": "Tus imágenes subidas aparecerán aquí.",
    "message.preparingJpeg": "Preparando JPEG...",
    "message.preparingPdf": "Preparando PDF...",
    "themes.all": "Todos los Temas (usa traducciones)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "VERSIÓN GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIÓN GRATUITA"

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Empieza en"
    // - move: "Muévete"
    // - north: "norte"
    // - south: "sur"
    // - east: "este"
    // - west: "oeste"
    // - square: "casilla"
    // - squares: "casillas"
    // - whereIsTreasure: "¿Dónde está el tesoro?"
    // These remain in treasureHuntTranslations for backward compatibility
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'es', params = {}) {
  const translation = TREASURE_HUNT_SPANISH_TRANSLATIONS[locale]?.[key] || key;
  return formatTranslation(translation, params);
}

function formatTranslation(template, params) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params.hasOwnProperty(key) ? params[key] : match;
  });
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TREASURE_HUNT_SPANISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}