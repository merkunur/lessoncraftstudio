/**
 * Missing Pieces Portuguese Translation
 * Professional UI Translation with Natural Language
 * Covers: European Portuguese & Brazilian Portuguese (neutral version)
 * Total Keys: 176+ (100% coverage)
 *
 * Translation Philosophy:
 * - Natural Portuguese that sounds native, not translated
 * - Using "você" form (informal but respectful, standard in Brazil)
 * - Neutral Portuguese that works for both PT and BR markets
 * - Clear educational terminology familiar to teachers
 * - Consistent terminology throughout
 */

const MISSING_PIECES_PORTUGUESE = {
  pt: {
    // ============= 1. Language Names (11 keys) =============
    "language.english": "Inglês",
    "language.german.full": "Alemão",
    "language.french.full": "Francês",
    "language.spanish.full": "Espanhol",
    "language.portuguese.full": "Português",
    "language.italian.full": "Italiano",
    "language.dutch.full": "Holandês",
    "language.swedish.full": "Sueco",
    "language.danish.full": "Dinamarquês",
    "language.norwegian.full": "Norueguês",
    "language.finnish.full": "Finlandês",

    // ============= 2. Page Title & Headers (8 keys) =============
    "missingpieces.page.title": "Gerador de Fichas de Peças em Falta",
    "missingpieces.title": "Peças em Falta",
    "missingpieces.language.settings": "Configurações de Idioma",
    "missingpieces.page.setup": "Configuração de Página",
    "missingpieces.text.tools": "Ferramentas de Texto",
    "missingpieces.puzzle.config": "Configuração do Puzzle",
    "missingpieces.image.library": "Biblioteca de Imagens",
    "missingpieces.upload.custom": "Carregar Imagens Próprias",

    // ============= 3. Page Setup (19 keys) =============
    "missingpieces.select.language": "Selecionar Idioma",
    "missingpieces.language.label": "Idioma:",
    "missingpieces.page.size": "Tamanho da Página:",
    "page.size.letter.portrait": "Carta Vertical (8,5×11\")",
    "page.size.default": "Ficha Padrão (800x1000)",
    "page.size.a4.portrait": "A4 Vertical (210×297mm)",
    "page.size.a4.landscape": "A4 Horizontal (297×210mm)",
    "page.size.letter.landscape": "Carta Horizontal (11×8,5\")",
    "page.size.square": "Quadrado (1200x1200)",
    "page.size.custom": "Personalizado",
    "missingpieces.width.label": "Largura (px):",
    "missingpieces.height.label": "Altura (px):",
    "missingpieces.page.color": "Cor da Página:",
    "missingpieces.apply.size": "Aplicar Tamanho",
    "missingpieces.background.title": "Fundo",
    "missingpieces.background.theme": "Tema de Fundo:",
    "missingpieces.background.message": "Selecione um tema para fundos.",
    "missingpieces.background.opacity": "Opacidade do Fundo:",
    "missingpieces.border.title": "Moldura",
    "missingpieces.border.theme": "Tema de Moldura:",
    "missingpieces.border.message": "Selecione um tema para ver molduras.",
    "missingpieces.border.opacity": "Opacidade da Moldura:",

    // ============= 4. Text Tools (15 keys) =============
    "missingpieces.text.add.new": "Adicionar Novo Texto",
    "missingpieces.text.content": "Conteúdo:",
    "missingpieces.text.placeholder": "Olá!",
    "missingpieces.text.add.button": "Adicionar Texto",
    "missingpieces.text.properties": "Propriedades do Texto Selecionado",
    "missingpieces.text.color": "Cor:",
    "missingpieces.text.size": "Tamanho:",
    "missingpieces.text.font": "Fonte:",
    "missingpieces.text.outline.color": "Cor do Contorno:",
    "missingpieces.text.outline.width": "Contorno (0-10):",
    "missingpieces.text.default": "Novo Texto",
    "missingpieces.msg.text.added": "Texto adicionado à ficha.",
    "missingpieces.msg.text.updated": "Propriedades do texto atualizadas.",
    "missingpieces.msg.text.deleted": "Texto eliminado.",
    "missingpieces.msg.form.cleared": "Formulário limpo.",

    // ============= 5. Puzzle Configuration (9 keys) =============
    "missingpieces.missing.count": "Peças em Falta (1-5):",
    "missingpieces.solution.options": "Opções de Solução (2-6):",
    "missingpieces.piece.shape": "Forma das Peças:",
    "missingpieces.msg.select.image": "Por favor, selecione primeiro uma imagem para o puzzle.",
    "missingpieces.msg.pieces.range": "As peças em falta devem ser entre 1 e 5.",
    "missingpieces.msg.options.range": "As opções de solução devem ser entre 2 e 6.",
    "missingpieces.msg.pieces.less": "O número de peças em falta deve ser menor que as opções de solução.",
    "missingpieces.msg.distinct.pieces": "Não foi possível encontrar peças distintas suficientes.",
    "missingpieces.msg.image.failed": "Falha ao carregar a imagem selecionada.",

    // ============= 6. Shape Options (6 keys) =============
    "shape.square": "Quadrado",
    "shape.circle": "Círculo",
    "shape.rect.portrait": "Retângulo (Vertical)",
    "shape.rect.landscape": "Retângulo (Horizontal)",
    "shape.ellipse.portrait": "Elipse (Vertical)",
    "shape.ellipse.landscape": "Elipse (Horizontal)",

    // ============= 7. Image Library (7 keys) =============
    "missingpieces.select.theme": "Selecionar Tema:",
    "missingpieces.search.images": "Procurar Imagens:",
    "missingpieces.search.placeholder": "ex: maçã, carro",
    "missingpieces.available.images": "Imagens Disponíveis:",
    "missingpieces.loading.images": "A carregar imagens...",
    "missingpieces.selected.image": "Imagem Selecionada para o Puzzle:",
    "missingpieces.msg.none.selected": "Nenhum item selecionado.",

    // ============= 8. Upload Section (4 keys) =============
    "missingpieces.upload.select": "Selecione imagem(ns) para carregar:",
    "missingpieces.uploaded.images": "Suas Imagens Carregadas (Esta Sessão):",
    "missingpieces.uploaded.placeholder": "As suas imagens carregadas aparecerão aqui.",
    "missingpieces.msg.images.loaded": "{count} imagem(ns) carregada(s).",

    // ============= 9. Font Options (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 10. Toolbar Actions (20 keys) =============
    "toolbar.layers": "Camadas",
    "toolbar.bring.forward": "Trazer para Frente",
    "toolbar.send.backward": "Enviar para Trás",
    "toolbar.align": "Alinhar",
    "toolbar.align.selected": "Alinhar Selecionados:",
    "toolbar.align.left": "Alinhar à Esquerda",
    "toolbar.center.h": "Centrar Horizontalmente",
    "toolbar.align.right": "Alinhar à Direita",
    "toolbar.align.top": "Alinhar ao Topo",
    "toolbar.center.v": "Centrar Verticalmente",
    "toolbar.align.bottom": "Alinhar ao Fundo",
    "toolbar.align.to.page": "Alinhar à Página:",
    "toolbar.center.page.h": "Centrar na Página Horizontalmente",
    "toolbar.center.page.v": "Centrar na Página Verticalmente",
    "toolbar.delete": "Eliminar Selecionados",
    "toolbar.msg.aligned": "Objetos alinhados.",
    "toolbar.msg.layer.changed": "Ordem das camadas alterada.",
    "toolbar.msg.deleted": "Objetos selecionados eliminados.",
    "toolbar.msg.select.first": "Por favor, selecione primeiro um objeto.",
    "toolbar.msg.nothing.selected": "Nenhum objeto selecionado.",

    // ============= 11. Action Buttons (13 keys) =============
    "missingpieces.generate": "Gerar",
    "missingpieces.generate.worksheet": "Gerar Ficha",
    "missingpieces.generate.answer": "Gerar Folha de Respostas",
    "missingpieces.download": "Descarregar",
    "missingpieces.download.worksheet.jpeg": "Ficha (JPEG)",
    "missingpieces.download.answer.jpeg": "Folha de Respostas (JPEG)",
    "missingpieces.download.worksheet.pdf": "Ficha (PDF)",
    "missingpieces.download.answer.pdf": "Folha de Respostas (PDF)",
    "common.grayscale": "Escala de Cinza",
    "missingpieces.clear.all": "Limpar Tudo",
    "missingpieces.msg.generate.complete": "Puzzle gerado com sucesso!",
    "missingpieces.msg.cleared": "Todo o conteúdo foi limpo.",
    "missingpieces.msg.download.ready": "Download pronto.",

    // ============= 12. Tab Labels (2 keys) =============
    "missingpieces.tab.worksheet": "Ficha de Exercícios",
    "missingpieces.tab.answer": "Folha de Respostas",

    // ============= 13. Theme Messages (9 keys) =============
    "missingpieces.themes.all": "Todos os Temas",
    "missingpieces.msg.themes.error": "Não foi possível carregar os temas.",
    "missingpieces.msg.loading.default": "A carregar o tema padrão...",
    "missingpieces.msg.type.search": "Digite para procurar todas as imagens.",
    "missingpieces.msg.searching": "A procurar...",
    "missingpieces.msg.no.images": "Nenhuma imagem encontrada{query}",
    "missingpieces.msg.theme.loaded": "Tema carregado com sucesso.",
    "missingpieces.msg.search.error": "Erro durante a pesquisa.",
    "missingpieces.msg.loading.theme": "A carregar imagens do tema...",

    // ============= 14. Puzzle Generation Messages (10 keys) =============
    "missingpieces.msg.generating": "A gerar dados do puzzle...",
    "missingpieces.msg.generation.failed": "Falha na geração do puzzle. Por favor, verifique as suas seleções.",
    "missingpieces.msg.worksheet.success": "Ficha gerada com sucesso!",
    "missingpieces.msg.unexpected.error": "Ocorreu um erro inesperado durante a geração.",
    "missingpieces.msg.validation.error": "Por favor, verifique a configuração do puzzle.",
    "missingpieces.msg.processing.image": "A processar imagem para o puzzle...",
    "missingpieces.msg.creating.pieces": "A criar peças do puzzle...",
    "missingpieces.msg.arranging.solution": "A organizar opções de solução...",
    "missingpieces.msg.finalizing": "A finalizar disposição do puzzle...",
    "missingpieces.msg.ready": "Puzzle pronto para impressão.",

    // ============= 15. Answer Key Messages (4 keys) =============
    "missingpieces.msg.generate.first": "Por favor, gere primeiro uma ficha.",
    "missingpieces.msg.generating.answer": "A gerar folha de respostas...",
    "missingpieces.msg.answer.generated": "Folha de respostas gerada!",
    "missingpieces.msg.answer.error": "Ocorreu um erro durante a geração da folha de respostas.",

    // ============= 16. Download & Export Messages (20 keys) =============
    "missingpieces.msg.canvas.empty": "A área de trabalho está vazia. Gere conteúdo primeiro.",
    "missingpieces.msg.preparing.jpeg": "A preparar JPEG de alta qualidade... Por favor, aguarde.",
    "missingpieces.msg.jpeg.success": "JPEG de alta qualidade descarregado!",
    "missingpieces.msg.jpeg.error": "Erro ao preparar JPEG: {error}",
    "missingpieces.watermark.main": "VERSÃO GRATUITA - LessonCraftStudio.com",
    "missingpieces.watermark.text": "VERSÃO GRATUITA",
    "missingpieces.msg.generate.content": "Por favor, gere conteúdo primeiro.",
    "missingpieces.msg.preparing.pdf": "A preparar PDF...",
    "missingpieces.msg.pdf.success": "PDF descarregado!",
    "missingpieces.msg.pdf.error": "Erro ao criar PDF.",
    "missingpieces.msg.generate.worksheet.first": "Por favor, gere primeiro uma ficha.",
    "missingpieces.msg.preparing.jpeg.simple": "A preparar JPEG...",
    "missingpieces.msg.jpeg.initiated": "Download de JPEG iniciado!",
    "missingpieces.msg.jpeg.error.simple": "Erro ao preparar JPEG.",
    "missingpieces.msg.preparing.pdf.quality": "A preparar PDF de alta qualidade... Por favor, aguarde.",
    "missingpieces.msg.pdf.quality.success": "PDF de alta qualidade descarregado!",
    "missingpieces.msg.pdf.error.detailed": "Erro ao criar PDF: {error}",
    "missingpieces.msg.export.progress": "Progresso da exportação: {percent}%",
    "missingpieces.msg.export.complete": "Exportação concluída.",
    "missingpieces.msg.export.cancelled": "Exportação cancelada.",

    // ============= 17. Common Terms (3 keys) =============
    "common.none": "Nenhum",
    "common.loading": "A carregar...",
    "common.error": "Erro",

    // ============= 18. Placeholders (4 keys) =============
    "placeholder.search": "Procurar...",
    "placeholder.enter.text": "Insira o texto aqui",
    "placeholder.custom.width": "Largura",
    "placeholder.custom.height": "Altura",

    // ============= 19. Error Messages (30+ keys) =============
    "error.invalid.dimensions": "Dimensões inválidas. Por favor, verifique a largura e altura.",
    "error.no.image.selected": "Por favor, selecione uma imagem para o puzzle.",
    "error.no.theme.selected": "Por favor, selecione primeiro um tema.",
    "error.upload.failed": "Falha no carregamento. Por favor, tente novamente.",
    "error.file.too.large": "Tamanho do ficheiro muito grande. Máximo é 5MB.",
    "error.invalid.file.type": "Tipo de ficheiro inválido. Por favor, carregue apenas ficheiros de imagem.",
    "error.canvas.creation": "Erro ao criar área de trabalho.",
    "error.export.failed": "Falha na exportação. Por favor, tente novamente.",
    "error.network": "Erro de rede. Por favor, verifique a sua conexão.",
    "error.puzzle.generation": "Não foi possível gerar o puzzle. Por favor, tente configurações diferentes.",
    "error.invalid.configuration": "Configuração do puzzle inválida.",
    "error.shape.not.supported": "A forma selecionada não é suportada.",
    "error.pieces.overlap": "As peças sobrepõem-se. Por favor, ajuste a configuração.",
    "error.solution.conflict": "As opções de solução conflituam com o número de peças em falta.",
    "error.image.loading": "Erro ao carregar imagem.",
    "error.theme.loading": "Erro ao carregar tema.",
    "error.border.loading": "Erro ao carregar moldura.",
    "error.background.loading": "Erro ao carregar fundo.",
    "error.text.empty": "Por favor, insira conteúdo de texto.",
    "error.object.selection": "Por favor, selecione um objeto para modificar.",
    "error.alignment": "Erro ao alinhar objetos.",
    "error.layer.operation": "Erro ao alterar ordem das camadas.",
    "error.delete.operation": "Erro ao eliminar objetos.",
    "error.color.invalid": "Valor de cor inválido.",
    "error.size.invalid": "Valor de tamanho inválido.",
    "error.outline.invalid": "Largura de contorno inválida.",
    "error.opacity.invalid": "Valor de opacidade inválido.",
    "error.theme.not.found": "Tema não encontrado.",
    "error.api.connection": "Não foi possível conectar ao servidor.",
    "error.session.expired": "Sessão expirada. Por favor, atualize a página.",
    "error.browser.unsupported": "O seu navegador não é suportado. Por favor, use um navegador moderno.",
    "error.feature.unavailable": "Esta funcionalidade não está disponível na versão gratuita."
  }
};

// ==========================================
// HELPER FUNCTIONS FOR PORTUGUESE
// ==========================================

/**
 * Get Portuguese translation for a key
 * @param {string} key - Translation key
 * @param {object} params - Parameters for interpolation
 * @returns {string} Translated text in Portuguese
 */
function getPortugueseTranslation(key, params = {}) {
  const translation = MISSING_PIECES_PORTUGUESE.pt[key] || key;
  return formatPortugueseTranslation(translation, params);
}

/**
 * Format Portuguese translation with parameters
 * @param {string} text - Text with placeholders
 * @param {object} params - Parameters to replace
 * @returns {string} Formatted text
 */
function formatPortugueseTranslation(text, params) {
  let formattedText = text;
  for (const [key, value] of Object.entries(params)) {
    formattedText = formattedText.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return formattedText;
}

/**
 * Validate Portuguese translations completeness
 * @returns {object} Validation result
 */
function validatePortugueseTranslations() {
  const requiredKeys = 176; // Based on master template
  const actualKeys = Object.keys(MISSING_PIECES_PORTUGUESE.pt).length;

  return {
    complete: actualKeys >= requiredKeys,
    coverage: `${((actualKeys / requiredKeys) * 100).toFixed(1)}%`,
    missingKeys: requiredKeys - actualKeys,
    actualKeys: actualKeys,
    requiredKeys: requiredKeys
  };
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MISSING_PIECES_PORTUGUESE,
    getPortugueseTranslation,
    formatPortugueseTranslation,
    validatePortugueseTranslations
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MISSING_PIECES_PORTUGUESE = MISSING_PIECES_PORTUGUESE;
  window.getPortugueseTranslation = getPortugueseTranslation;
  window.formatPortugueseTranslation = formatPortugueseTranslation;
  window.validatePortugueseTranslations = validatePortugueseTranslations;
}

// Validation check
console.log('Portuguese Translation Validation:', validatePortugueseTranslations());