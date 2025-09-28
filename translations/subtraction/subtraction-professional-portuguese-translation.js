// Subtraction App - Professional Portuguese Translation
// Total: 145 translation keys (140 unique)
// Approach: Natural, educational Portuguese balanced for PT and BR
// App name: "Fichas de Subtração" (Subtraction Worksheets - works for both PT/BR)

const SUBTRACTION_PORTUGUESE_TRANSLATIONS = {
  pt: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Gerador de Fichas de Subtração",
    "settings.title": "Configurações da Ficha",

    // ===== 2. ACCORDION HEADERS (7 items) =====
    "settings.language": "Configurações de Idioma",
    "settings.pageSetup": "Configuração da Página",
    "settings.textTools": "Ferramentas de Texto",
    "settings.exerciseConfig": "Configuração de Exercícios",
    "library.title": "Biblioteca de Imagens",
    "decoration.title": "Bordas e Fundos",
    "problemSettings": "Configurações de Problemas",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "selectLanguage": "Selecionar idioma",
    "language": "Idioma:",
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

    // ===== 4. PAGE SETUP (24 items) =====
    "pageSize": "Tamanho da página:",
    "pageSize.usLetterPortrait": "Carta US (Vertical)",
    "pageSize.usLetterLandscape": "Carta US (Horizontal)",
    "pageSize.a4Portrait": "A4 (Vertical)",
    "pageSize.a4Landscape": "A4 (Horizontal)",
    "pageSize.a3Portrait": "A3 (Vertical)",
    "pageSize.a3Landscape": "A3 (Horizontal)",
    "pageSize.tabloidPortrait": "Tabloide (Vertical)",
    "pageSize.tabloidLandscape": "Tabloide (Horizontal)",
    "pageSize.legalPortrait": "Ofício (Vertical)",
    "pageSize.legalLandscape": "Ofício (Horizontal)",
    "pageSize.custom": "Personalizado",
    "widthPx": "Largura (px):",
    "heightPx": "Altura (px):",
    "applySize": "Aplicar tamanho",
    "pageColor": "Cor da página:",
    "background": "Fundo",
    "backgroundTheme": "Tema de fundo:",
    "selectBackgroundTheme": "Selecione um tema para os fundos.",
    "backgroundOpacity": "Opacidade do fundo:",
    "border": "Borda",
    "borderTheme": "Tema de borda:",
    "selectBorderTheme": "Selecione um tema para as bordas.",
    "borderOpacity": "Opacidade da borda:",

    // ===== 5. COMMON (2 items) =====
    "none": "Nenhum",
    "grayscale": "Escala de cinza",

    // ===== 6. DOWNLOAD OPTIONS (7 items) =====
    "settings.downloadOptions": "Opções de Download de Imagem",
    "settings.quality": "Qualidade:",
    "quality.standard": "Padrão (100%)",
    "quality.high": "Alta Resolução (200%)",
    "quality.ultra": "Ultra HD (300%)",
    "quality.max": "Máxima (400%)",
    "settings.grayscale": "Escala de cinza",

    // ===== 7. TEXT TOOLS (12 items) =====
    "addNewText": "Adicionar novo texto",
    "content": "Conteúdo:",
    "enterTextHerePlaceholder": "Digite o texto aqui...",
    "addTextToPage": "Adicionar texto à página",
    "selectedTextProperties": "Propriedades do texto selecionado",
    "color": "Cor:",
    "size": "Tamanho:",
    "font": "Fonte:",
    "outlineColor": "Cor do contorno:",
    "outlineWidth": "Contorno (0-10):",
    "text.strokeColor": "Cor do traço:",
    "text.strokeWidth": "Largura:",

    // ===== 8. FONTS (7 items) =====
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ===== 9. EXERCISE CONFIGURATION (5 items) =====
    "config.exerciseCount": "Número de exercícios:",
    "config.maxMinuend": "Minuendo máximo:",
    "config.includeNameDate": "Incluir Nome e Data",
    "config.includeExerciseNumbers": "Incluir números dos exercícios",
    "config.useFriendlyBox": "Usar formato simplificado",

    // ===== 10. IMAGE LIBRARY (13 items) =====
    "imageLibrary": "Biblioteca de imagens",
    "imageTheme": "Tema de imagens:",
    "searchImagesPlaceholder": "Pesquisar imagens...",
    "selectThemeFromDropdown": "Selecione um tema no menu acima.",
    "selectedImages": "Imagens selecionadas",
    "selectedCount": "Selecionadas: {count} / {max}",
    "selectedImagesWillAppear": "As suas imagens selecionadas aparecerão aqui.",
    "multipleChoice": "Escolha múltipla (folha de respostas com todas as respostas corretas)",
    "orderMatters": "A ordem importa (ordem fixa de imagens)",
    "randomSelect": "Seleção aleatória",
    "clearSelection": "Limpar seleção",
    "themes.all": "Todos os temas",
    "library.selectedCount": "Selecionadas: {x} / {y}",

    // ===== 11. UPLOAD SECTION (3 items) =====
    "selectImagesToUpload": "Selecionar imagens para carregar:",
    "yourUploadedImages": "As suas imagens carregadas (esta sessão)",
    "uploadedImagesWillAppear": "As suas imagens carregadas aparecerão aqui.",

    // ===== 12. PROBLEM SETTINGS (6 items) =====
    "numberOfProblems": "Número de problemas (1-30):",
    "columns": "Colunas (1-6):",
    "imageSize": "Tamanho da imagem (px, 20-200):",
    "spacingBetweenImages": "Espaço entre imagens (px, 0-50):",
    "verticalSpacing": "Espaço vertical entre problemas (px, 0-100):",
    "includeNameDateFields": "Incluir campos de Nome/Data",

    // ===== 13. ACTION BUTTONS (14 items) =====
    "generate": "Gerar",
    "generateWorksheet": "Gerar ficha",
    "generateAnswerKey": "Gerar folha de respostas",
    "download": "Descarregar",
    "worksheetJpeg": "Ficha (JPEG)",
    "answerKeyJpeg": "Folha de respostas (JPEG)",
    "worksheetPdf": "Ficha (PDF)",
    "answerKeyPdf": "Folha de respostas (PDF)",
    "clearAll": "Limpar tudo",
    "button.generate": "Gerar ficha",
    "button.generateAnswer": "Gerar folha de respostas",
    "button.downloadJpeg": "Descarregar JPEG",
    "button.downloadPdf": "Descarregar PDF",
    "button.clearAll": "Limpar tudo",

    // ===== 14. TABS (2 items) =====
    "worksheet": "Ficha",
    "answerKey": "Folha de respostas",

    // ===== 15. TOOLBAR (15 items) =====
    "layers": "Camadas",
    "bringForward": "Trazer para frente",
    "sendBackward": "Enviar para trás",
    "align": "Alinhar",
    "alignSelected": "Alinhar seleção:",
    "alignToPage": "Alinhar à página:",
    "deleteSelected": "Eliminar seleção",
    "toolbar.alignLeft": "Alinhar à esquerda",
    "toolbar.centerH": "Centrar horizontalmente",
    "toolbar.alignRight": "Alinhar à direita",
    "toolbar.alignTop": "Alinhar ao topo",
    "toolbar.centerV": "Centrar verticalmente",
    "toolbar.alignBottom": "Alinhar em baixo",
    "toolbar.centerPageH": "Centrar horizontalmente na página",
    "toolbar.centerPageV": "Centrar verticalmente na página",

    // ===== 16. SUCCESS MESSAGES (10 items) =====
    "textAdded": "Texto adicionado.",
    "formCleared": "Formulário limpo.",
    "worksheetGeneratedSuccessfully": "Ficha gerada com sucesso!",
    "answerKeyGenerated": "Folha de respostas gerada!",
    "downloadInitiated": "Download iniciado!",
    "pdfDownloaded": "PDF descarregado!",
    "jpegDownloadInitiated": "Download de JPEG iniciado!",
    "message.pdfSuccess": "PDF descarregado!",
    "message.backgroundAdded": "Fundo adicionado.",
    "message.worksheetGenerated": "Ficha gerada com sucesso!",

    // ===== 17. ERROR MESSAGES (15 items) =====
    "couldNotLoadThemes": "Não foi possível carregar os temas.",
    "errorLoadingThemes": "Erro ao carregar os temas.",
    "errorDuringSearch": "Erro durante a pesquisa.",
    "errorLoadingImages": "Erro ao carregar as imagens.",
    "maxImagesSelected": "Máximo de {count} imagem(ns) selecionada(s).",
    "pleaseSelectImagesFirst": "Por favor, selecione primeiro algumas imagens, da biblioteca ou carregando as suas próprias imagens.",
    "pleaseGenerateWorksheetFirst": "Por favor, gere primeiro uma ficha.",
    "canvasIsEmpty": "A área de trabalho está vazia. Nada para descarregar.",
    "errorPreparingJpeg": "Erro ao preparar JPEG: {error}",
    "pleaseGenerateContentFirst": "Por favor, gere primeiro o conteúdo.",
    "errorCreatingPdf": "Erro ao criar o PDF.",
    "message.pdfError": "Erro ao criar o PDF.",
    "message.jpegError": "Erro ao preparar o JPEG.",
    "message.imageLoadFailed": "Não foi possível carregar a imagem de borda/fundo.",
    "message.pdfCreateError": "Erro ao criar o PDF: {error}",

    // ===== 18. INFO MESSAGES (9 items) =====
    "loadingDefaultTheme": "A carregar tema padrão...",
    "searching": "A pesquisar...",
    "loadingImagesForTheme": "A carregar imagens para o tema...",
    "noImagesFound": "Nenhuma imagem encontrada{query}.",
    "preparingFile": "A preparar {filename}...",
    "preparingPdf": "A preparar PDF...",
    "preparingJpeg": "A preparar JPEG...",
    "message.loading": "A carregar...",
    "message.preparingDownload": "A preparar download...",

    // ===== 19. NAME/DATE FIELDS (2 items) =====
    "form.nameField": "Nome: _________________________",
    "form.dateField": "Data: ____________",

    // ===== 20. WATERMARKS (2 items) =====
    "watermark.free": "VERSÃO GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSÃO GRATUITA",

    // ===== 21. PREVIEW (1 item) =====
    "preview.title": "Pré-visualização",

    // ===== 22. SUBTRACTION-SPECIFIC FEATURES =====
    // Note: Mathematical terms and visual concepts
    // - Imagens riscadas para a subtração visual
    // - Minuendo/Subtraendo como termos matemáticos
    // - Formato simplificado em vez de "Friendly Box"
    // - Linhas de resposta para os alunos
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'pt', params = {}) {
  const translation = SUBTRACTION_PORTUGUESE_TRANSLATIONS[locale]?.[key] || key;
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
    SUBTRACTION_PORTUGUESE_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}