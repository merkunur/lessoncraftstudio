// Treasure Hunt App - Professional Portuguese Translation
// Total: 80+ translation keys (75 unique)
// Approach: Natural, educational Portuguese working for both Brazil and Portugal
// App name: "Gerador de Caça ao Tesouro" (Treasure Hunt Generator - engaging educational term)

const TREASURE_HUNT_PORTUGUESE_TRANSLATIONS = {
  pt: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Gerador de Caça ao Tesouro",
    "settings.title": "Configurações da Atividade",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Configurações de Idioma",
    "settings.pageSetup": "Configuração da Página",
    "settings.textTools": "Ferramentas de Texto",
    "settings.puzzleSetup": "Configuração do Jogo",
    "library.title": "Biblioteca de Imagens",
    "library.uploadTitle": "Enviar Suas Imagens",

    // ===== 3. LANGUAGE SECTION (12 items) =====
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

    // ===== 4. PAGE SETUP (17 items) =====
    "settings.pageSize": "Tamanho da Página:",
    "pageSize.letterPortrait": "Carta Retrato (612×792)",
    "pageSize.letterLandscape": "Carta Paisagem (792×612)",
    "pageSize.a4Portrait": "A4 Retrato (595×842)",
    "pageSize.a4Landscape": "A4 Paisagem (842×595)",
    "pageSize.square": "Quadrado (1200×1200)",
    "pageSize.custom": "Personalizado",
    "settings.width": "Largura (px):",
    "settings.height": "Altura (px):",
    "settings.pageColor": "Cor da Página:",
    "decoration.backgroundTheme": "Tema de Fundo:",
    "decoration.none": "Nenhum",
    "decoration.backgroundOpacity": "Opacidade do Fundo:",
    "decoration.borderTheme": "Tema da Moldura:",
    "decoration.borderOpacity": "Opacidade da Moldura:",
    "button.applySize": "Aplicar Tamanho",
    "settings.grayscale": "Escala de cinza",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Conteúdo:",
    "text.placeholder": "Olá!",
    "button.addText": "Adicionar Texto",
    "text.color": "Cor:",
    "text.size": "Tamanho:",
    "text.font": "Fonte:",
    "text.default": "Novo Texto",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Gerar a partir de um Tema (Substitui a Seleção Manual):",
    "puzzle.selectTheme": "-- Selecione um Tema para a Atividade --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Selecionar Tema do Dicionário:",
    "library.search": "Buscar Imagens:",
    "library.searchPlaceholder": "ex: maçã, carro",
    "library.availableImages": "Imagens Disponíveis (Clique para adicionar à seleção manual):",
    "library.selectUpload": "Selecione imagens para enviar:",
    "library.uploadedImages": "Suas Imagens Enviadas (Clique para Selecionar):",
    "library.selectedCount": "Selecionadas: {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Camadas",
    "toolbar.bringForward": "Trazer para Frente",
    "toolbar.sendBackward": "Enviar para Trás",
    "toolbar.delete": "Excluir Seleção",
    "toolbar.align": "Alinhar",
    "toolbar.center": "Centralizar",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Gerar",
    "button.generateWorksheet": "Gerar Atividade",
    "button.generateAnswer": "Gerar Gabarito",
    "button.download": "Baixar",
    "button.worksheetJpeg": "Atividade (JPEG)",
    "button.answerJpeg": "Gabarito (JPEG)",
    "button.worksheetPdf": "Atividade (PDF)",
    "button.answerPdf": "Gabarito (PDF)",
    "button.clearAll": "Limpar Tudo",
    "button.downloadJpeg": "Baixar JPEG",
    "button.downloadPdf": "Baixar PDF",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Folha de Atividades",
    "tab.answerKey": "Gabarito",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Texto adicionado.",
    "message.formCleared": "Formulário limpo.",
    "message.worksheetGenerated": "Atividade gerada!",
    "message.answerGenerated": "Gabarito gerado!",
    "message.downloadStarted": "Download iniciado!",
    "message.pdfDownloaded": "PDF baixado!",
    "message.pdfSuccess": "PDF baixado!",
    "message.jpegDownloaded": "Download JPEG iniciado!",
    "message.assetAdded": "{type} adicionado.",
    "message.downloadInitiated": "Download iniciado!",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "Não foi possível carregar os temas.",
    "message.maxImages": "Máximo de 6 imagens selecionadas.",
    "message.themeNoImages": 'O tema "{theme}" não possui imagens.',
    "message.themeLoadError": "Erro ao carregar as imagens do tema.",
    "message.selectSixImages": "Selecione exatamente 6 imagens manualmente, ou escolha um tema para gerar automaticamente.",
    "message.noPuzzleData": "Nenhum dado do jogo foi gerado.",
    "message.generateFirst": "Primeiro gere uma atividade.",
    "message.canvasEmpty": "A área de trabalho está vazia.",
    "message.jpegError": "Erro ao preparar o JPEG.",
    "message.pdfError": "Erro ao criar o PDF.",
    "message.pdfCreateError": "Erro ao criar o PDF.",
    "message.generateContent": "Primeiro gere o conteúdo.",
    "message.generateWorksheet": "Primeiro gere uma atividade.",
    "message.jpegPrepError": "Erro ao preparar o JPEG.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Selecione um tema para ver as molduras.",
    "message.selectBackgroundTheme": "Selecione um tema para os fundos.",
    "message.loading": "Carregando...",
    "message.typeToSearch": "Digite para buscar em todas as imagens.",
    "message.searchError": "Erro durante a busca.",
    "message.imagesError": "Erro ao carregar as imagens.",
    "message.noImages": "Nenhuma imagem encontrada.",
    "message.uploadedHere": "Suas imagens enviadas aparecerão aqui.",
    "message.preparingJpeg": "Preparando JPEG...",
    "message.preparingPdf": "Preparando PDF...",
    "themes.all": "Todos os Temas (usa traduções)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "VERSÃO GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSÃO GRATUITA"

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Começar em"
    // - move: "Mover"
    // - north: "norte"
    // - south: "sul"
    // - east: "leste"
    // - west: "oeste"
    // - square: "casa"
    // - squares: "casas"
    // - whereIsTreasure: "Onde está o tesouro?"
    // These remain in treasureHuntTranslations for backward compatibility
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'pt', params = {}) {
  const translation = TREASURE_HUNT_PORTUGUESE_TRANSLATIONS[locale]?.[key] || key;
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
    TREASURE_HUNT_PORTUGUESE_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}