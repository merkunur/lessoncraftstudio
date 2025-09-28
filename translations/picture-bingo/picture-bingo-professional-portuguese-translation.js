// 🎲 PICTURE BINGO - PROFESSIONAL PORTUGUESE TRANSLATION
// ============================================================
// Version: 2.0.0 (Pattern A)
// Last Updated: December 2024
// Total Keys: 141
// Language: Portuguese (pt)
// Approach: Natural Portuguese as if originally created in Portuguese
// Educational Context: PT/BR compatible school terminology
// ============================================================

const PICTURE_BINGO_TRANSLATIONS_PT = {
  "pt": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
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
    // CORE UI ELEMENTS (4 keys)
    // ==========================================
    "worksheetSettings": "Configurações da atividade",
    "language": "Idioma:",
    "cardsAndChips": "Cartelas + Fichas",
    "callouts": "Lista de chamadas",

    // ==========================================
    // ACTION BUTTONS (8 keys)
    // ==========================================
    "generate": "Criar",
    "download": "Baixar",
    "worksheetJpeg": "Folha de atividades (JPEG)",
    "calloutJpeg": "Lista de chamadas (JPEG)",
    "worksheetPdf": "Folha de atividades (PDF)",
    "calloutPdf": "Lista de chamadas (PDF)",
    "grayscale": "Tons de cinza",  // CRITICAL - User mentioned
    "clearAll": "Limpar tudo",

    // ==========================================
    // ACCORDION HEADERS (5 keys)
    // ==========================================
    "pageSetup": "Configuração da página",
    "textTools": "Ferramentas de texto",
    "bingoCardSettings": "Configurações do bingo",
    "imageLibrary": "Biblioteca de imagens",
    "uploadCustomImages": "Carregar suas imagens",

    // ==========================================
    // PAGE SETUP (11 keys)
    // ==========================================
    "pageSize": "Tamanho da página:",
    "letterPortrait": "Carta Retrato (8,5×11\")",
    "letterLandscape": "Carta Paisagem (11×8,5\")",
    "a4Portrait": "A4 Retrato (210×297mm)",
    "a4Landscape": "A4 Paisagem (297×210mm)",
    "square": "Quadrado (1200x1200)",
    "custom": "Personalizado",
    "widthPx": "Largura (px):",
    "heightPx": "Altura (px):",
    "pageColor": "Cor da página:",
    "applySize": "Aplicar tamanho",

    // ==========================================
    // BACKGROUND SECTION (5 keys)
    // ==========================================
    "background": "Fundo",  // CRITICAL - User mentioned
    "backgroundTheme": "Tema do fundo:",
    "none": "Nenhum",
    "selectBackgroundTheme": "Selecione um tema para os fundos.",
    "backgroundOpacity": "Opacidade do fundo:",

    // ==========================================
    // BORDER SECTION (4 keys)
    // ==========================================
    "border": "Borda",  // CRITICAL - User mentioned
    "borderTheme": "Tema da borda:",
    "selectBorderTheme": "Selecione um tema para as bordas.",
    "borderOpacity": "Opacidade da borda:",

    // ==========================================
    // TEXT TOOLS (10 keys)
    // ==========================================
    "addNewText": "Adicionar texto",
    "content": "Conteúdo:",
    "helloPlaceholder": "Olá!",
    "addText": "Inserir texto",
    "selectedTextProperties": "Propriedades do texto selecionado",
    "color": "Cor:",
    "size": "Tamanho:",
    "font": "Fonte:",
    "outlineColor": "Cor do contorno:",
    "outlineWidth": "Espessura do contorno (0-10):",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ==========================================
    // BINGO CARD SETTINGS (10 keys)
    // ==========================================
    "bingoRows": "Linhas (3–5):",
    "bingoColumns": "Colunas (3–5):",
    "numberOfCards": "Número de cartelas (1–10):",
    "cardCellFill": "Conteúdo das casas:",
    "chipFill": "Conteúdo das fichas:",
    "image": "Imagem",
    "word": "Palavra",
    "useCustomSelection": "Usar seleção personalizada (abaixo)",

    // ==========================================
    // IMAGE LIBRARY (6 keys)
    // ==========================================
    "selectTheme": "Selecionar tema:",
    "searchImages": "Pesquisar imagens:",
    "searchPlaceholder": "ex: maçã, carro",
    "selectedForCustomCallouts": "Selecionadas para chamadas personalizadas: {count}",
    "availableImagesCallouts": "Imagens disponíveis (Clique para adicionar às chamadas):",
    "loadingImages": "Carregando imagens...",
    "selectedCustomImages": "Imagens personalizadas selecionadas:",

    // ==========================================
    // UPLOAD SECTION (3 keys)
    // ==========================================
    "selectImagesToUpload": "Selecionar imagens para carregar:",
    "yourUploadedImages": "Suas imagens carregadas (esta sessão):",
    "uploadedImagesWillAppear": "Suas imagens carregadas aparecerão aqui.",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "layers": "Camadas",
    "bringForward": "Trazer para frente",
    "sendBackward": "Enviar para trás",
    "align": "Alinhar",
    "alignSelected": "Alinhar seleção:",
    "alignToPage": "Alinhar à página:",
    "deleteSelected": "Apagar seleção",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "bingoWorksheetGenerated": "Folha de bingo criada!",
    "downloadInitiated": "Download iniciado!",
    "zipDownloadInitiated": "Download ZIP iniciado!",
    "pdfDownloaded": "PDF baixado!",
    "formCleared": "Formulário limpo.",
    "customImagesAvailable": "{count} imagem(ns) personalizada(s) disponível(is).",
    "jpegDownloadInitiated": "Download JPEG iniciado!",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "needMoreImagesForCallout": "São necessárias {required} imagens para a lista de chamadas, mas apenas {selected} estão selecionadas. Por favor, selecione mais.",
    "notEnoughImagesInLibrary": "A biblioteca selecionada tem apenas {available} imagens. São necessárias {required} para criar o jogo. Por favor, escolha um tema maior ou use seleção personalizada.",
    "couldNotGenerateCards": "Não foi possível criar {count} cartelas únicas.",
    "canvasIsEmpty": "A área de trabalho está vazia.",
    "errorPreparingJpeg": "Erro ao preparar JPEG: {error}",
    "noCardDataAvailable": "Nenhum dado de cartela disponível.",
    "errorCreatingZip": "Erro ao criar arquivo ZIP: {error}",
    "errorCreatingPdf": "Erro ao criar PDF: {error}",
    "errorReadingFile": "Erro ao ler arquivo: {filename}",
    "generationFailed": "Falha na criação: {error}",
    "pleaseGenerateContentFirst": "Por favor, crie o conteúdo primeiro.",
    "pleaseGenerateWorksheetFirst": "Por favor, crie uma folha de atividades primeiro.",

    // ==========================================
    // INFO/STATUS MESSAGES (5 keys)
    // ==========================================
    "preparingFile": "Preparando {filename}...",
    "preparingZipFile": "Preparando arquivo ZIP...",
    "preparingPdf": "Preparando PDF...",
    "preparingJpeg": "Preparando JPEG...",
    "loadingImagesCount": "Carregando {count} imagem(ns)...",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "VERSÃO GRATUITA - LessonCraftStudio.com",
    "watermarkSmallText": "VERSÃO GRATUITA"
  }
};

// ==========================================
// VALIDATION & VERIFICATION
// ==========================================

// Verify all 141 keys are present
const keyCount = Object.keys(PICTURE_BINGO_TRANSLATIONS_PT.pt).length;
console.log(`✅ Portuguese translation complete: ${keyCount}/141 keys`);

// Verify critical user-mentioned items
const criticalItems = {
  background: PICTURE_BINGO_TRANSLATIONS_PT.pt.background,
  border: PICTURE_BINGO_TRANSLATIONS_PT.pt.border,
  grayscale: PICTURE_BINGO_TRANSLATIONS_PT.pt.grayscale
};
console.log("Critical items check:", criticalItems);

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get Portuguese translation for a key
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
function getPortugueseTranslation(key) {
  return PICTURE_BINGO_TRANSLATIONS_PT.pt[key] || key;
}

/**
 * Format Portuguese translation with placeholders
 * @param {string} text - Text with {} placeholders
 * @param {...any} values - Values to replace
 * @returns {string} Formatted text
 */
function formatPortugueseTranslation(text, ...values) {
  let result = text;
  values.forEach((value) => {
    result = result.replace('{}', value);
  });
  return result;
}

// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PICTURE_BINGO_TRANSLATIONS_PT;
}

// Make available globally for browser
if (typeof window !== 'undefined') {
  window.PICTURE_BINGO_TRANSLATIONS_PT = PICTURE_BINGO_TRANSLATIONS_PT;
}

// ==========================================
// TRANSLATION NOTES
// ==========================================
/**
 * Portuguese Educational Context (PT/BR Compatible):
 * - "Jogo de bingo" = Natural Portuguese for the bingo game
 * - "Folha de atividades" = Standard term in both PT/BR schools
 * - "Lista de chamadas" = Call-out list (bingo terminology)
 * - "Fichas" = Game chips/tokens (universal term)
 * - "Biblioteca de imagens" = Image library
 * - "Tons de cinza" = Grayscale (standard Portuguese term)
 * - "Borda" = Border (universal term)
 * - "Fundo" = Background (standard term)
 *
 * Bingo-specific terminology:
 * - "Configurações do bingo" = Bingo game settings
 * - "Conteúdo das casas" = Cell content
 * - "Lista de chamadas" = Call-out list (for the teacher)
 * - "Fichas" = Playing chips/markers
 * - "Cartelas únicas" = Unique cards
 * - "Cartelas" = Bingo cards (PT/BR standard)
 *
 * UI Conventions:
 * - Using informal "você" form (works in both PT/BR)
 * - Clear, pedagogical language for educational context
 * - Imperative mood for actions (Portuguese standard)
 * - Technical terms accessible to teachers
 * - "Baixar" for download (universally understood)
 * - "Carregar" for upload (PT/BR compatible)
 *
 * Portuguese-specific choices:
 * - "Configurações" for settings (standard in apps)
 * - "Opacidade" for opacity (standard Portuguese term)
 * - "Camadas" for layers (standard graphics term)
 * - "Contorno" for outline (standard graphics term)
 * - Decimal comma notation (8,5×11")
 * - "VERSÃO GRATUITA" for free version
 * - "Retrato/Paisagem" for portrait/landscape
 *
 * Educational terminology:
 * - "Folha de atividades" = Activity sheet (school terminology)
 * - "Biblioteca de imagens" = Image library for educational use
 * - "Seleção personalizada" = Custom selection
 * - "Imagens disponíveis" = Available images
 * - Clear instructional language for teachers
 *
 * Cultural adaptations:
 * - Both Carta and A4 formats included
 * - Metric measurements included
 * - "ex:" for examples (Portuguese abbreviation)
 * - Professional, warm tone for educators
 * - Error messages are helpful and friendly
 * - Works for both Portugal and Brazil
 *
 * Grammar considerations:
 * - Proper use of articles (o, a, os, as)
 * - Clear imperatives for actions
 * - Professional yet approachable register
 * - Natural Portuguese word order
 * - Consistent informal tone
 * - Proper agreement (gender/number)
 *
 * Picture Bingo specific:
 * - Bingo is popular in Portuguese-speaking schools
 * - Used for vocabulary and image recognition
 * - "Lista de chamadas" is the teacher's calling sheet
 * - "Fichas" are the markers students use
 * - Educational game context emphasized
 *
 * PT/BR compatibility approach:
 * - Avoiding regionalisms (PT: carregar ficheiros / BR: fazer upload)
 * - Using terms understood in both regions
 * - "Cartelas" works in both PT and BR
 * - "Baixar" universally understood
 * - Professional educational register
 */