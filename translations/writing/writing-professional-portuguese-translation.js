// Writing App - Professional Portuguese Translation
// Total: 103 unique translation keys
// Approach: Natural, educational Portuguese as if originally developed in a Portuguese-speaking country
// App name: "Gerador de Fichas de Caligrafia" (Handwriting Worksheets Generator - standard educational term)

const WRITING_PORTUGUESE_TRANSLATIONS = {
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
    "settings.textTools": "Ferramentas de Texto",

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

    // ===== 8. IMAGE LIBRARY (11 items) =====
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
    "toolbar.delete": "Eliminar",

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

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
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
    "watermark.freeShort": "VERSÃO GRATUITA"
  }
};

// Helper functions
function getTranslation(key, locale = 'pt', params = {}) {
  const translation = WRITING_PORTUGUESE_TRANSLATIONS[locale]?.[key] || key;
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
    WRITING_PORTUGUESE_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}