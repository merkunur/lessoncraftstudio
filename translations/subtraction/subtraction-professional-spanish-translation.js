// Subtraction App - Professional Spanish Translation
// Total: 145 translation keys (140 unique)
// Approach: Natural, educational Spanish as if originally developed in Spain/Latin America
// App name: "Fichas de Resta" (Subtraction Worksheets - universal educational term)

const SUBTRACTION_SPANISH_TRANSLATIONS = {
  es: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Generador de Fichas de Resta",
    "settings.title": "Configuración de la Ficha",

    // ===== 2. ACCORDION HEADERS (7 items) =====
    "settings.language": "Configuración de Idioma",
    "settings.pageSetup": "Configuración de Página",
    "settings.textTools": "Herramientas de Texto",
    "settings.exerciseConfig": "Configuración de Ejercicios",
    "library.title": "Biblioteca de Imágenes",
    "decoration.title": "Bordes y Fondos",
    "problemSettings": "Configuración de Problemas",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "selectLanguage": "Seleccionar idioma",
    "language": "Idioma:",
    "lang.en": "English (Inglés)",
    "lang.de": "Deutsch (Alemán)",
    "lang.fr": "Français (Francés)",
    "lang.es": "Español",
    "lang.pt": "Português (Portugués)",
    "lang.it": "Italiano",
    "lang.nl": "Nederlands (Neerlandés)",
    "lang.sv": "Svenska (Sueco)",
    "lang.da": "Dansk (Danés)",
    "lang.no": "Norsk (Noruego)",
    "lang.fi": "Suomi (Finés)",

    // ===== 4. PAGE SETUP (24 items) =====
    "pageSize": "Tamaño de página:",
    "pageSize.usLetterPortrait": "Carta US (Vertical)",
    "pageSize.usLetterLandscape": "Carta US (Horizontal)",
    "pageSize.a4Portrait": "A4 (Vertical)",
    "pageSize.a4Landscape": "A4 (Horizontal)",
    "pageSize.a3Portrait": "A3 (Vertical)",
    "pageSize.a3Landscape": "A3 (Horizontal)",
    "pageSize.tabloidPortrait": "Tabloide (Vertical)",
    "pageSize.tabloidLandscape": "Tabloide (Horizontal)",
    "pageSize.legalPortrait": "Oficio (Vertical)",
    "pageSize.legalLandscape": "Oficio (Horizontal)",
    "pageSize.custom": "Personalizado",
    "widthPx": "Ancho (px):",
    "heightPx": "Alto (px):",
    "applySize": "Aplicar tamaño",
    "pageColor": "Color de página:",
    "background": "Fondo",
    "backgroundTheme": "Tema de fondo:",
    "selectBackgroundTheme": "Seleccione un tema para los fondos.",
    "backgroundOpacity": "Opacidad del fondo:",
    "border": "Borde",
    "borderTheme": "Tema de borde:",
    "selectBorderTheme": "Seleccione un tema para los bordes.",
    "borderOpacity": "Opacidad del borde:",

    // ===== 5. COMMON (2 items) =====
    "none": "Ninguno",
    "grayscale": "Escala de grises",

    // ===== 6. DOWNLOAD OPTIONS (7 items) =====
    "settings.downloadOptions": "Opciones de Descarga de Imagen",
    "settings.quality": "Calidad:",
    "quality.standard": "Estándar (100%)",
    "quality.high": "Alta Resolución (200%)",
    "quality.ultra": "Ultra HD (300%)",
    "quality.max": "Máxima (400%)",
    "settings.grayscale": "Escala de grises",

    // ===== 7. TEXT TOOLS (12 items) =====
    "addNewText": "Añadir nuevo texto",
    "content": "Contenido:",
    "enterTextHerePlaceholder": "Escriba el texto aquí...",
    "addTextToPage": "Añadir texto a la página",
    "selectedTextProperties": "Propiedades del texto seleccionado",
    "color": "Color:",
    "size": "Tamaño:",
    "font": "Fuente:",
    "outlineColor": "Color del contorno:",
    "outlineWidth": "Contorno (0-10):",
    "text.strokeColor": "Color del trazo:",
    "text.strokeWidth": "Ancho:",

    // ===== 8. FONTS (7 items) =====
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ===== 9. EXERCISE CONFIGURATION (5 items) =====
    "config.exerciseCount": "Número de ejercicios:",
    "config.maxMinuend": "Minuendo máximo:",
    "config.includeNameDate": "Incluir Nombre y Fecha",
    "config.includeExerciseNumbers": "Incluir números de ejercicio",
    "config.useFriendlyBox": "Usar formato amigable",

    // ===== 10. IMAGE LIBRARY (13 items) =====
    "imageLibrary": "Biblioteca de imágenes",
    "imageTheme": "Tema de imágenes:",
    "searchImagesPlaceholder": "Buscar imágenes...",
    "selectThemeFromDropdown": "Seleccione un tema del menú desplegable superior.",
    "selectedImages": "Imágenes seleccionadas",
    "selectedCount": "Seleccionadas: {count} / {max}",
    "selectedImagesWillAppear": "Sus imágenes seleccionadas aparecerán aquí.",
    "multipleChoice": "Opción múltiple (hoja de respuestas con todas las respuestas correctas)",
    "orderMatters": "El orden importa (orden fijo de imágenes)",
    "randomSelect": "Selección aleatoria",
    "clearSelection": "Borrar selección",
    "themes.all": "Todos los temas",
    "library.selectedCount": "Seleccionadas: {x} / {y}",

    // ===== 11. UPLOAD SECTION (3 items) =====
    "selectImagesToUpload": "Seleccionar imágenes para subir:",
    "yourUploadedImages": "Sus imágenes subidas (esta sesión)",
    "uploadedImagesWillAppear": "Sus imágenes subidas aparecerán aquí.",

    // ===== 12. PROBLEM SETTINGS (6 items) =====
    "numberOfProblems": "Número de problemas (1-30):",
    "columns": "Columnas (1-6):",
    "imageSize": "Tamaño de imagen (px, 20-200):",
    "spacingBetweenImages": "Espacio entre imágenes (px, 0-50):",
    "verticalSpacing": "Espacio vertical entre problemas (px, 0-100):",
    "includeNameDateFields": "Incluir campos de Nombre/Fecha",

    // ===== 13. ACTION BUTTONS (14 items) =====
    "generate": "Generar",
    "generateWorksheet": "Generar ficha",
    "generateAnswerKey": "Generar hoja de respuestas",
    "download": "Descargar",
    "worksheetJpeg": "Ficha (JPEG)",
    "answerKeyJpeg": "Hoja de respuestas (JPEG)",
    "worksheetPdf": "Ficha (PDF)",
    "answerKeyPdf": "Hoja de respuestas (PDF)",
    "clearAll": "Borrar todo",
    "button.generate": "Generar ficha",
    "button.generateAnswer": "Generar hoja de respuestas",
    "button.downloadJpeg": "Descargar JPEG",
    "button.downloadPdf": "Descargar PDF",
    "button.clearAll": "Borrar todo",

    // ===== 14. TABS (2 items) =====
    "worksheet": "Ficha",
    "answerKey": "Hoja de respuestas",

    // ===== 15. TOOLBAR (15 items) =====
    "layers": "Capas",
    "bringForward": "Traer al frente",
    "sendBackward": "Enviar atrás",
    "align": "Alinear",
    "alignSelected": "Alinear selección:",
    "alignToPage": "Alinear a la página:",
    "deleteSelected": "Eliminar selección",
    "toolbar.alignLeft": "Alinear a la izquierda",
    "toolbar.centerH": "Centrar horizontalmente",
    "toolbar.alignRight": "Alinear a la derecha",
    "toolbar.alignTop": "Alinear arriba",
    "toolbar.centerV": "Centrar verticalmente",
    "toolbar.alignBottom": "Alinear abajo",
    "toolbar.centerPageH": "Centrar horizontalmente en la página",
    "toolbar.centerPageV": "Centrar verticalmente en la página",

    // ===== 16. SUCCESS MESSAGES (10 items) =====
    "textAdded": "Texto añadido.",
    "formCleared": "Formulario borrado.",
    "worksheetGeneratedSuccessfully": "¡Ficha generada con éxito!",
    "answerKeyGenerated": "¡Hoja de respuestas generada!",
    "downloadInitiated": "¡Descarga iniciada!",
    "pdfDownloaded": "¡PDF descargado!",
    "jpegDownloadInitiated": "¡Descarga de JPEG iniciada!",
    "message.pdfSuccess": "¡PDF descargado!",
    "message.backgroundAdded": "Fondo añadido.",
    "message.worksheetGenerated": "¡Ficha generada con éxito!",

    // ===== 17. ERROR MESSAGES (15 items) =====
    "couldNotLoadThemes": "No se pudieron cargar los temas.",
    "errorLoadingThemes": "Error al cargar los temas.",
    "errorDuringSearch": "Error durante la búsqueda.",
    "errorLoadingImages": "Error al cargar las imágenes.",
    "maxImagesSelected": "Máximo de {count} imagen(es) seleccionada(s).",
    "pleaseSelectImagesFirst": "Por favor, seleccione primero algunas imágenes, ya sea de la biblioteca o subiendo sus propias imágenes.",
    "pleaseGenerateWorksheetFirst": "Por favor, genere primero una ficha.",
    "canvasIsEmpty": "El área de trabajo está vacía. No hay nada que descargar.",
    "errorPreparingJpeg": "Error al preparar JPEG: {error}",
    "pleaseGenerateContentFirst": "Por favor, genere primero el contenido.",
    "errorCreatingPdf": "Error al crear el PDF.",
    "message.pdfError": "Error al crear el PDF.",
    "message.jpegError": "Error al preparar el JPEG.",
    "message.imageLoadFailed": "No se pudo cargar la imagen de borde/fondo.",
    "message.pdfCreateError": "Error al crear el PDF: {error}",

    // ===== 18. INFO MESSAGES (9 items) =====
    "loadingDefaultTheme": "Cargando tema predeterminado...",
    "searching": "Buscando...",
    "loadingImagesForTheme": "Cargando imágenes para el tema...",
    "noImagesFound": "No se encontraron imágenes{query}.",
    "preparingFile": "Preparando {filename}...",
    "preparingPdf": "Preparando PDF...",
    "preparingJpeg": "Preparando JPEG...",
    "message.loading": "Cargando...",
    "message.preparingDownload": "Preparando descarga...",

    // ===== 19. NAME/DATE FIELDS (2 items) =====
    "form.nameField": "Nombre: _________________________",
    "form.dateField": "Fecha: ____________",

    // ===== 20. WATERMARKS (2 items) =====
    "watermark.free": "VERSIÓN GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIÓN GRATUITA",

    // ===== 21. PREVIEW (1 item) =====
    "preview.title": "Vista previa",

    // ===== 22. SUBTRACTION-SPECIFIC FEATURES =====
    // Note: Mathematical terms and visual concepts
    // - Imágenes tachadas para la resta visual
    // - Minuendo/Sustraendo como términos matemáticos
    // - Formato amigable en lugar de "Friendly Box"
    // - Líneas de respuesta para los estudiantes
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'es', params = {}) {
  const translation = SUBTRACTION_SPANISH_TRANSLATIONS[locale]?.[key] || key;
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
    SUBTRACTION_SPANISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}