// Word Guess App - Professional Spanish Translation
// Total: 93 unique translation keys
// Approach: Natural, educational Spanish as if originally developed in a Spanish-speaking country
// App name: "Generador de Palabras Ocultas" (Hidden Words Generator - engaging educational term)

const WORD_GUESS_SPANISH_TRANSLATIONS = {
  es: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Generador de Palabras Ocultas",
    "settings.title": "Configuración de Palabras Ocultas",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Configuración de Idioma",
    "settings.pageSetup": "Configuración de Página",
    "settings.textTools": "Herramientas de Texto",
    "settings.exerciseConfig": "Configuración del Ejercicio",
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
    "lang.fi": "Suomi (Finés)",

    // ===== 4. PAGE SETUP (16 items) =====
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
    "button.applySize": "Aplicar Tamaño",
    "decoration.backgroundTheme": "Tema de Fondo:",
    "decoration.none": "Ninguno",
    "decoration.backgroundOpacity": "Opacidad del Fondo:",
    "decoration.borderTheme": "Tema del Marco:",
    "decoration.borderOpacity": "Opacidad del Marco:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Contenido:",
    "text.placeholder": "¡Hola!",
    "button.addText": "Añadir Texto",
    "text.color": "Color:",
    "text.size": "Tamaño:",
    "text.font": "Fuente:",
    "text.outlineColor": "Color del Contorno:",
    "text.outlineWidth": "Grosor del Contorno (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Número de Acertijos (1–10):",
    "config.difficulty": "Dificultad (Cantidad de Pistas)",
    "difficulty.noClues": "Sin pistas",
    "difficulty.easy": "Fácil (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Difícil (1/6)",
    "config.excludeLetters": "Excluir Letras de las Pistas:",
    "config.excludePlaceholder": "ej: AEIOU",
    "config.letterCase": "Tipo de Letra",
    "case.uppercase": "Mayúsculas",
    "case.lowercase": "Minúsculas",
    "config.includeNameDate": "Incluir Nombre y Fecha",
    "config.includeExerciseNumbers": "Numerar los Ejercicios",

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Seleccionar Tema:",
    "library.search": "Buscar Imágenes:",
    "library.searchPlaceholder": "ej: manzana, coche",
    "library.availableImages": "Imágenes Disponibles:",
    "library.selectedImages": "Imágenes Seleccionadas para los Acertijos:",
    "library.selectUpload": "Seleccionar imágenes para subir:",
    "library.uploadedImages": "Tus Imágenes Subidas (Esta Sesión):",
    "library.selectedCount": "Seleccionadas: {x} / {y}",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Capas",
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
    "toolbar.delete": "Eliminar Selección",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generar",
    "button.generateWorksheet": "Crear Ficha de Trabajo",
    "button.generateAnswer": "Crear Solucionario",
    "button.download": "Descargar",
    "button.worksheetJpeg": "Ficha de Trabajo (JPEG)",
    "button.answerJpeg": "Solucionario (JPEG)",
    "button.worksheetPdf": "Ficha de Trabajo (PDF)",
    "button.answerPdf": "Solucionario (PDF)",
    "settings.grayscale": "Escala de Grises",
    "button.clearAll": "Borrar Todo",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Ficha de Trabajo",
    "tab.answerKey": "Solucionario",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} imagen(es) personalizada(s) disponible(s).",
    "message.generatingWorksheet": "Generando ficha de trabajo...",
    "message.worksheetGenerated": "¡Ficha de trabajo creada con éxito!",
    "message.generatingAnswer": "Generando solucionario...",
    "message.answerGenerated": "¡Solucionario creado!",
    "message.assetAdded": "{type} añadido.",
    "message.formCleared": "Formulario borrado.",
    "message.downloadStarted": "¡Descarga iniciada!",
    "message.pdfDownloaded": "¡PDF descargado!",
    "message.pdfSuccess": "¡PDF descargado!",
    "message.jpegDownloaded": "¡Descarga JPEG iniciada!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "No se pudieron cargar los temas.",
    "message.maxImages": "Puede seleccionar un máximo de {count} imágenes.",
    "message.selectImages": "Por favor, seleccione algunas imágenes o elija un tema con imágenes.",
    "message.generateFirst": "Por favor, primero cree una ficha de trabajo.",
    "message.cannotDownloadEmpty": "No se puede descargar el archivo vacío: {fileName}.",
    "message.imageError": "Error al preparar la imagen: {error}",
    "message.generateContent": "Por favor, primero genere contenido.",
    "message.pdfError": "Error al crear el PDF.",
    "message.generateWorksheet": "Por favor, primero cree una ficha de trabajo.",
    "message.jpegError": "Error al preparar el JPEG.",
    "message.pdfCreateError": "Error al crear el PDF: {error}",
    "message.imagesError": "Error al cargar las imágenes.",
    "message.borderError": "Error al cargar los marcos.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Todos los Temas (usa traducciones)",
    "message.loading": "Cargando...",
    "message.typeToSearch": "Escriba para buscar en todas las imágenes.",
    "message.noImages": "No se encontraron imágenes {query}.",
    "message.uploadedHere": "Tus imágenes subidas aparecen aquí.",
    "message.preparing": "Preparando {format}...",
    "message.preparingPdf": "Preparando PDF...",
    "message.preparingJpeg": "Preparando JPEG...",
    "decoration.allBorders": "Todos los Marcos",
    "message.selectBorderTheme": "Seleccione un tema para ver los marcos.",
    "message.loadingBorders": "Cargando marcos de {theme}...",
    "message.noBorders": "No se encontraron marcos.",
    "decoration.allBackgrounds": "Todos los Fondos",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Nombre: ________________",
    "form.dateField": "Fecha: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "VERSIÓN GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIÓN GRATUITA"
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'es', params = {}) {
  const translation = WORD_GUESS_SPANISH_TRANSLATIONS[locale]?.[key] || key;
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
    WORD_GUESS_SPANISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}