/**
 * Missing Pieces Professional Spanish Translation
 * Version: 1.0.0
 * Date: 2024-12-20
 *
 * Spanish (es) - Complete Professional Translation
 * Total Keys: 176+
 *
 * Translation Philosophy:
 * - Natural Spanish as if originally developed in Spanish-speaking countries
 * - Uses informal "tú" form for modern educational software
 * - Educational terminology familiar to Spanish teachers and parents
 * - Neutral Spanish comprehensible in all Spanish-speaking regions
 */

const MISSING_PIECES_SPANISH_TRANSLATIONS = {
  es: {
    // ============= 1. Language Names (11 keys) =============
    "language.english": "Inglés",
    "language.german.full": "Alemán (Deutsch)",
    "language.french.full": "Francés (Français)",
    "language.spanish.full": "Español",
    "language.portuguese.full": "Portugués (Português)",
    "language.italian.full": "Italiano",
    "language.dutch.full": "Neerlandés (Nederlands)",
    "language.swedish.full": "Sueco (Svenska)",
    "language.danish.full": "Danés (Dansk)",
    "language.norwegian.full": "Noruego (Norsk)",
    "language.finnish.full": "Finlandés (Suomi)",

    // ============= 2. Page Title & Headers (8 keys) =============
    "missingpieces.page.title": "Generador de fichas - Piezas faltantes",
    "missingpieces.title": "Piezas faltantes",
    "missingpieces.language.settings": "Configuración de idioma",
    "missingpieces.page.setup": "Configuración de página",
    "missingpieces.text.tools": "Herramientas de texto",
    "missingpieces.puzzle.config": "Configuración del rompecabezas",
    "missingpieces.image.library": "Biblioteca de imágenes",
    "missingpieces.upload.custom": "Subir imágenes propias",

    // ============= 3. Page Setup (19 keys) =============
    "missingpieces.select.language": "Seleccionar idioma",
    "missingpieces.language.label": "Idioma:",
    "missingpieces.page.size": "Tamaño de página:",
    "page.size.letter.portrait": "Carta Vertical (8,5×11\")",
    "page.size.default": "Ficha estándar (800x1000)",
    "page.size.a4.portrait": "A4 Vertical (210×297mm)",
    "page.size.a4.landscape": "A4 Horizontal (297×210mm)",
    "page.size.letter.landscape": "Carta Horizontal (11×8,5\")",
    "page.size.square": "Cuadrado (1200x1200)",
    "page.size.custom": "Personalizado",
    "missingpieces.width.label": "Ancho (px):",
    "missingpieces.height.label": "Alto (px):",
    "missingpieces.page.color": "Color de página:",
    "missingpieces.apply.size": "Aplicar tamaño",
    "missingpieces.background.title": "Fondo",
    "missingpieces.background.theme": "Tema de fondo:",
    "missingpieces.background.message": "Selecciona un tema para los fondos.",
    "missingpieces.background.opacity": "Opacidad del fondo:",
    "missingpieces.border.title": "Marco",
    "missingpieces.border.theme": "Tema de marco:",
    "missingpieces.border.message": "Selecciona un tema para los marcos.",
    "missingpieces.border.opacity": "Opacidad del marco:",

    // ============= 4. Text Tools (15 keys) =============
    "missingpieces.text.add.new": "Añadir texto nuevo",
    "missingpieces.text.content": "Contenido:",
    "missingpieces.text.placeholder": "¡Hola!",
    "missingpieces.text.add.button": "Añadir texto",
    "missingpieces.text.properties": "Propiedades del texto seleccionado",
    "missingpieces.text.color": "Color:",
    "missingpieces.text.size": "Tamaño:",
    "missingpieces.text.font": "Fuente:",
    "missingpieces.text.outline.color": "Color del contorno:",
    "missingpieces.text.outline.width": "Grosor del contorno (0-10):",
    "missingpieces.text.default": "Texto nuevo",
    "missingpieces.msg.text.added": "Texto añadido a la ficha.",
    "missingpieces.msg.text.updated": "Propiedades del texto actualizadas.",
    "missingpieces.msg.text.deleted": "Texto eliminado.",
    "missingpieces.msg.form.cleared": "Formulario limpiado.",

    // ============= 5. Puzzle Configuration (9 keys) =============
    "missingpieces.missing.count": "Piezas faltantes (1–5):",
    "missingpieces.solution.options": "Opciones de solución (2–6):",
    "missingpieces.piece.shape": "Forma de las piezas:",
    "missingpieces.msg.select.image": "Por favor, selecciona primero una imagen para el rompecabezas.",
    "missingpieces.msg.pieces.range": "Las piezas faltantes deben ser entre 1 y 5.",
    "missingpieces.msg.options.range": "Las opciones de solución deben ser entre 2 y 6.",
    "missingpieces.msg.pieces.less": "El número de piezas faltantes debe ser menor que las opciones de solución.",
    "missingpieces.msg.distinct.pieces": "No se pudieron encontrar suficientes piezas distintas.",
    "missingpieces.msg.image.failed": "Error al cargar la imagen seleccionada.",

    // ============= 6. Shape Options (6 keys) =============
    "shape.square": "Cuadrado",
    "shape.circle": "Círculo",
    "shape.rect.portrait": "Rectángulo (Vertical)",
    "shape.rect.landscape": "Rectángulo (Horizontal)",
    "shape.ellipse.portrait": "Elipse (Vertical)",
    "shape.ellipse.landscape": "Elipse (Horizontal)",

    // ============= 7. Image Library (7 keys) =============
    "missingpieces.select.theme": "Seleccionar tema:",
    "missingpieces.search.images": "Buscar imágenes:",
    "missingpieces.search.placeholder": "ej. manzana, coche",
    "missingpieces.available.images": "Imágenes disponibles:",
    "missingpieces.loading.images": "Cargando imágenes...",
    "missingpieces.selected.image": "Imagen seleccionada para el rompecabezas:",
    "missingpieces.msg.none.selected": "No hay elementos seleccionados.",

    // ============= 8. Upload Section (4 keys) =============
    "missingpieces.upload.select": "Seleccionar imágenes para subir:",
    "missingpieces.uploaded.images": "Tus imágenes subidas (esta sesión):",
    "missingpieces.uploaded.placeholder": "Tus imágenes subidas aparecerán aquí.",
    "missingpieces.msg.images.loaded": "{count} imagen(es) cargada(s).",

    // ============= 9. Font Options (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 10. Toolbar Actions (20 keys) =============
    "toolbar.layers": "Capas",
    "toolbar.bring.forward": "Traer adelante",
    "toolbar.send.backward": "Enviar atrás",
    "toolbar.align": "Alinear",
    "toolbar.align.selected": "Alinear selección:",
    "toolbar.align.left": "Alinear a la izquierda",
    "toolbar.center.h": "Centrar horizontalmente",
    "toolbar.align.right": "Alinear a la derecha",
    "toolbar.align.top": "Alinear arriba",
    "toolbar.center.v": "Centrar verticalmente",
    "toolbar.align.bottom": "Alinear abajo",
    "toolbar.align.to.page": "Alinear a la página:",
    "toolbar.center.page.h": "Centrar horizontalmente en la página",
    "toolbar.center.page.v": "Centrar verticalmente en la página",
    "toolbar.delete": "Eliminar selección",
    "toolbar.msg.aligned": "Objetos alineados.",
    "toolbar.msg.layer.changed": "Orden de capas modificado.",
    "toolbar.msg.deleted": "Objetos seleccionados eliminados.",
    "toolbar.msg.select.first": "Por favor, selecciona primero un objeto.",
    "toolbar.msg.nothing.selected": "No hay objetos seleccionados.",

    // ============= 11. Action Buttons (13 keys) =============
    "missingpieces.generate": "Generar",
    "missingpieces.generate.worksheet": "Generar ficha",
    "missingpieces.generate.answer": "Generar hoja de respuestas",
    "missingpieces.download": "Descargar",
    "missingpieces.download.worksheet.jpeg": "Ficha (JPEG)",
    "missingpieces.download.answer.jpeg": "Hoja de respuestas (JPEG)",
    "missingpieces.download.worksheet.pdf": "Ficha (PDF)",
    "missingpieces.download.answer.pdf": "Hoja de respuestas (PDF)",
    "common.grayscale": "Escala de grises",
    "missingpieces.clear.all": "Limpiar todo",
    "missingpieces.msg.generate.complete": "¡Rompecabezas generado con éxito!",
    "missingpieces.msg.cleared": "Todo el contenido ha sido limpiado.",
    "missingpieces.msg.download.ready": "Descarga lista.",

    // ============= 12. Tab Labels (2 keys) =============
    "missingpieces.tab.worksheet": "Ficha de trabajo",
    "missingpieces.tab.answer": "Hoja de respuestas",

    // ============= 13. Theme Messages (9 keys) =============
    "missingpieces.themes.all": "Todos los temas",
    "missingpieces.msg.themes.error": "No se pudieron cargar los temas.",
    "missingpieces.msg.loading.default": "Cargando tema predeterminado...",
    "missingpieces.msg.type.search": "Escribe para buscar en todas las imágenes.",
    "missingpieces.msg.searching": "Buscando...",
    "missingpieces.msg.no.images": "No se encontraron imágenes{query}",
    "missingpieces.msg.theme.loaded": "Tema cargado con éxito.",
    "missingpieces.msg.search.error": "Error durante la búsqueda.",
    "missingpieces.msg.loading.theme": "Cargando imágenes del tema...",

    // ============= 14. Puzzle Generation Messages (10 keys) =============
    "missingpieces.msg.generating": "Generando datos del rompecabezas...",
    "missingpieces.msg.generation.failed": "Error al generar el rompecabezas. Por favor, verifica tus selecciones.",
    "missingpieces.msg.worksheet.success": "¡Ficha generada con éxito!",
    "missingpieces.msg.unexpected.error": "Ocurrió un error inesperado durante la generación.",
    "missingpieces.msg.validation.error": "Por favor, verifica la configuración del rompecabezas.",
    "missingpieces.msg.processing.image": "Procesando imagen para el rompecabezas...",
    "missingpieces.msg.creating.pieces": "Creando las piezas del rompecabezas...",
    "missingpieces.msg.arranging.solution": "Organizando las opciones de solución...",
    "missingpieces.msg.finalizing": "Finalizando el diseño del rompecabezas...",
    "missingpieces.msg.ready": "Rompecabezas listo para imprimir.",

    // ============= 15. Answer Key Messages (4 keys) =============
    "missingpieces.msg.generate.first": "Por favor, genera primero una ficha.",
    "missingpieces.msg.generating.answer": "Generando hoja de respuestas...",
    "missingpieces.msg.answer.generated": "¡Hoja de respuestas generada!",
    "missingpieces.msg.answer.error": "Ocurrió un error al generar la hoja de respuestas.",

    // ============= 16. Download & Export Messages (20 keys) =============
    "missingpieces.msg.canvas.empty": "El área de trabajo está vacía. Genera contenido primero.",
    "missingpieces.msg.preparing.jpeg": "Preparando JPEG de alta calidad... Por favor, espera.",
    "missingpieces.msg.jpeg.success": "¡JPEG de alta calidad descargado!",
    "missingpieces.msg.jpeg.error": "Error al preparar el JPEG: {error}",
    "missingpieces.watermark.main": "VERSIÓN GRATUITA - LessonCraftStudio.com",
    "missingpieces.watermark.text": "VERSIÓN GRATUITA",
    "missingpieces.msg.generate.content": "Por favor, genera contenido primero.",
    "missingpieces.msg.preparing.pdf": "Preparando PDF...",
    "missingpieces.msg.pdf.success": "¡PDF descargado!",
    "missingpieces.msg.pdf.error": "Error al crear el PDF.",
    "missingpieces.msg.generate.worksheet.first": "Por favor, genera primero una ficha.",
    "missingpieces.msg.preparing.jpeg.simple": "Preparando JPEG...",
    "missingpieces.msg.jpeg.initiated": "¡Descarga de JPEG iniciada!",
    "missingpieces.msg.jpeg.error.simple": "Error al preparar el JPEG.",
    "missingpieces.msg.preparing.pdf.quality": "Preparando PDF de alta calidad... Por favor, espera.",
    "missingpieces.msg.pdf.quality.success": "¡PDF de alta calidad descargado!",
    "missingpieces.msg.pdf.error.detailed": "Error al crear el PDF: {error}",
    "missingpieces.msg.export.progress": "Progreso de exportación: {percent}%",
    "missingpieces.msg.export.complete": "Exportación completada.",
    "missingpieces.msg.export.cancelled": "Exportación cancelada.",

    // ============= 17. Common Terms (3 keys) =============
    "common.none": "Ninguno",
    "common.loading": "Cargando...",
    "common.error": "Error",

    // ============= 18. Placeholders (4 keys) =============
    "placeholder.search": "Buscar...",
    "placeholder.enter.text": "Ingresa el texto aquí",
    "placeholder.custom.width": "Ancho",
    "placeholder.custom.height": "Alto",

    // ============= 19. Error Messages (30+ keys) =============
    "error.invalid.dimensions": "Dimensiones inválidas. Por favor, verifica el ancho y el alto.",
    "error.no.image.selected": "Por favor, selecciona una imagen para el rompecabezas.",
    "error.no.theme.selected": "Por favor, selecciona primero un tema.",
    "error.upload.failed": "Error al subir. Por favor, intenta de nuevo.",
    "error.file.too.large": "Archivo demasiado grande. El tamaño máximo es 5MB.",
    "error.invalid.file.type": "Tipo de archivo inválido. Por favor, sube solo imágenes.",
    "error.canvas.creation": "Error al crear el área de trabajo.",
    "error.export.failed": "Error al exportar. Por favor, intenta de nuevo.",
    "error.network": "Error de red. Por favor, verifica tu conexión.",
    "error.puzzle.generation": "No se pudo generar el rompecabezas. Prueba con diferentes configuraciones.",
    "error.invalid.configuration": "Configuración del rompecabezas inválida.",
    "error.shape.not.supported": "La forma seleccionada no está soportada.",
    "error.pieces.overlap": "Las piezas se superponen. Por favor, ajusta la configuración.",
    "error.solution.conflict": "Las opciones de solución entran en conflicto con el número de piezas faltantes.",
    "error.image.loading": "Error al cargar la imagen.",
    "error.theme.loading": "Error al cargar el tema.",
    "error.border.loading": "Error al cargar el marco.",
    "error.background.loading": "Error al cargar el fondo.",
    "error.text.empty": "Por favor, ingresa contenido de texto.",
    "error.object.selection": "Por favor, selecciona un objeto para modificar.",
    "error.alignment": "Error al alinear los objetos.",
    "error.layer.operation": "Error al cambiar el orden de las capas.",
    "error.delete.operation": "Error al eliminar los objetos.",
    "error.color.invalid": "Valor de color inválido.",
    "error.size.invalid": "Valor de tamaño inválido.",
    "error.outline.invalid": "Grosor de contorno inválido.",
    "error.opacity.invalid": "Valor de opacidad inválido.",
    "error.theme.not.found": "Tema no encontrado.",
    "error.api.connection": "No se pudo conectar con el servidor.",
    "error.session.expired": "Sesión expirada. Por favor, recarga la página.",
    "error.browser.unsupported": "Tu navegador no está soportado. Por favor, usa un navegador moderno.",
    "error.feature.unavailable": "Esta función no está disponible en la versión gratuita."
  }
};

// Helper functions for translation management
function getTranslation(key, locale = 'es', params = {}) {
  const translation = MISSING_PIECES_SPANISH_TRANSLATIONS[locale]?.[key] ||
                     key;

  // Handle parameter interpolation
  let formattedText = translation;
  for (const [param, value] of Object.entries(params)) {
    formattedText = formattedText.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
  }
  return formattedText;
}

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MISSING_PIECES_SPANISH_TRANSLATIONS;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MISSING_PIECES_SPANISH_TRANSLATIONS = MISSING_PIECES_SPANISH_TRANSLATIONS;
}