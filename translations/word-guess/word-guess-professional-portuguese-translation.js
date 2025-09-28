// Word Guess App - Professional Portuguese Translation
// Total: 93 unique translation keys
// Approach: Natural, educational Portuguese balanced for Brazil and Portugal
// App name: "Gerador de Palavras Enigma" (Enigma Words Generator - engaging educational term)

const WORD_GUESS_PORTUGUESE_TRANSLATIONS = {
  pt: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Gerador de Palavras Enigma",
    "settings.title": "Configurações de Palavras Enigma",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Configurações de Idioma",
    "settings.pageSetup": "Configuração da Página",
    "settings.textTools": "Ferramentas de Texto",
    "settings.exerciseConfig": "Configuração do Exercício",
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

    // ===== 4. PAGE SETUP (16 items) =====
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
    "button.applySize": "Aplicar Tamanho",
    "decoration.backgroundTheme": "Tema de Fundo:",
    "decoration.none": "Nenhum",
    "decoration.backgroundOpacity": "Opacidade do Fundo:",
    "decoration.borderTheme": "Tema da Moldura:",
    "decoration.borderOpacity": "Opacidade da Moldura:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Conteúdo:",
    "text.placeholder": "Olá!",
    "button.addText": "Adicionar Texto",
    "text.color": "Cor:",
    "text.size": "Tamanho:",
    "text.font": "Fonte:",
    "text.outlineColor": "Cor do Contorno:",
    "text.outlineWidth": "Espessura do Contorno (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Número de Enigmas (1–10):",
    "config.difficulty": "Dificuldade (Quantidade de Dicas)",
    "difficulty.noClues": "Sem dicas",
    "difficulty.easy": "Fácil (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Difícil (1/6)",
    "config.excludeLetters": "Excluir Letras das Dicas:",
    "config.excludePlaceholder": "ex: AEIOU",
    "config.letterCase": "Tipo de Letra",
    "case.uppercase": "Maiúsculas",
    "case.lowercase": "Minúsculas",
    "config.includeNameDate": "Incluir Nome e Data",
    "config.includeExerciseNumbers": "Numerar os Exercícios",

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Selecionar Tema:",
    "library.search": "Pesquisar Imagens:",
    "library.searchPlaceholder": "ex: maçã, carro",
    "library.availableImages": "Imagens Disponíveis:",
    "library.selectedImages": "Imagens Selecionadas para os Enigmas:",
    "library.selectUpload": "Selecionar imagens para enviar:",
    "library.uploadedImages": "Suas Imagens Enviadas (Esta Sessão):",
    "library.selectedCount": "Selecionadas: {x} / {y}",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Camadas",
    "toolbar.bringForward": "Trazer para Frente",
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
    "toolbar.delete": "Eliminar Seleção",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Gerar",
    "button.generateWorksheet": "Criar Ficha de Exercícios",
    "button.generateAnswer": "Criar Gabarito",
    "button.download": "Baixar",
    "button.worksheetJpeg": "Ficha de Exercícios (JPEG)",
    "button.answerJpeg": "Gabarito (JPEG)",
    "button.worksheetPdf": "Ficha de Exercícios (PDF)",
    "button.answerPdf": "Gabarito (PDF)",
    "settings.grayscale": "Escala de Cinza",
    "button.clearAll": "Limpar Tudo",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Ficha de Exercícios",
    "tab.answerKey": "Gabarito",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} imagem(ns) personalizada(s) disponível(is).",
    "message.generatingWorksheet": "Gerando ficha de exercícios...",
    "message.worksheetGenerated": "Ficha de exercícios criada com sucesso!",
    "message.generatingAnswer": "Gerando gabarito...",
    "message.answerGenerated": "Gabarito criado!",
    "message.assetAdded": "{type} adicionado.",
    "message.formCleared": "Formulário limpo.",
    "message.downloadStarted": "Download iniciado!",
    "message.pdfDownloaded": "PDF baixado!",
    "message.pdfSuccess": "PDF baixado!",
    "message.jpegDownloaded": "Download JPEG iniciado!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Não foi possível carregar os temas.",
    "message.maxImages": "Você pode selecionar no máximo {count} imagens.",
    "message.selectImages": "Por favor, selecione algumas imagens ou escolha um tema com imagens.",
    "message.generateFirst": "Por favor, crie primeiro uma ficha de exercícios.",
    "message.cannotDownloadEmpty": "Não é possível baixar o arquivo vazio: {fileName}.",
    "message.imageError": "Erro ao preparar a imagem: {error}",
    "message.generateContent": "Por favor, gere o conteúdo primeiro.",
    "message.pdfError": "Erro ao criar o PDF.",
    "message.generateWorksheet": "Por favor, crie primeiro uma ficha de exercícios.",
    "message.jpegError": "Erro ao preparar o JPEG.",
    "message.pdfCreateError": "Erro ao criar o PDF: {error}",
    "message.imagesError": "Erro ao carregar as imagens.",
    "message.borderError": "Erro ao carregar as molduras.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Todos os Temas (usa traduções)",
    "message.loading": "Carregando...",
    "message.typeToSearch": "Digite para pesquisar em todas as imagens.",
    "message.noImages": "Nenhuma imagem encontrada {query}.",
    "message.uploadedHere": "Suas imagens enviadas aparecem aqui.",
    "message.preparing": "Preparando {format}...",
    "message.preparingPdf": "Preparando PDF...",
    "message.preparingJpeg": "Preparando JPEG...",
    "decoration.allBorders": "Todas as Molduras",
    "message.selectBorderTheme": "Selecione um tema para ver as molduras.",
    "message.loadingBorders": "Carregando molduras de {theme}...",
    "message.noBorders": "Nenhuma moldura encontrada.",
    "decoration.allBackgrounds": "Todos os Fundos",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Nome: ________________",
    "form.dateField": "Data: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "VERSÃO GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSÃO GRATUITA"
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'pt', params = {}) {
  const translation = WORD_GUESS_PORTUGUESE_TRANSLATIONS[locale]?.[key] || key;
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
    WORD_GUESS_PORTUGUESE_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}