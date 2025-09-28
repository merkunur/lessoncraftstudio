// Writing App - Professional Spanish Translation
// Total: 103 unique translation keys
// Approach: Natural, educational Spanish as if originally developed in a Spanish-speaking country
// App name: "Generador de Ejercicios de Escritura" (Writing Exercises Generator - standard educational term)

const WRITING_SPANISH_TRANSLATIONS = {
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
    "settings.textTools": "Herramientas de Texto",

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

    // ===== 8. IMAGE LIBRARY (11 items) =====
    "library.imageMode": "Modo de Imagen:",
    "imageMode.exercise": "Imagen de Ejercicio",
    "imageMode.custom": "Imágenes Personalizadas",
    "library.pickExercise": "Elegir una imagen de ejercicio (opcional):",
    "library.searchPlaceholder": "Buscar imágenes...",
    "library.selectedStatus": "Seleccionado: {word}",
    "library.selectUpload": "Seleccionar imagen(es) para subir:",
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
    "toolbar.delete": "Eliminar",

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

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
    "message.selectBackgroundTheme": "Seleccione un tema para los fondos.",
    "message.selectBorderTheme": "Seleccione un tema para los marcos.",
    "message.noImages": "No se encontraron imágenes. Seleccione un tema o intente otra búsqueda.",
    "message.themeLoadError": "Error al cargar los temas de {type}:",
    "message.selectTheme": "Seleccione un tema.",
    "message.loading": "Cargando...",
    "message.loadError": "Error al cargar {type}.",
    "message.preparingPdf": "Preparando PDF...",
    "message.preparingJpeg": "Preparando JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "¿Está seguro de que desea borrar la hoja de ejercicios? Esta acción no se puede deshacer.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "VERSIÓN GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIÓN GRATUITA"
  }
};

// Helper functions
function getTranslation(key, locale = 'es', params = {}) {
  const translation = WRITING_SPANISH_TRANSLATIONS[locale]?.[key] || key;
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
    WRITING_SPANISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}