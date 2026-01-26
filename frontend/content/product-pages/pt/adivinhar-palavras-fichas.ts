import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Adivinhar Palavras (Word Guess) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/adivinhar-palavras-fichas.ts
 * URL: /pt/apps/adivinhar-palavras-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/word-guess.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Word Guess = Full Access ($240/year) - NOT Core Bundle
 */

export const wordGuessPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'adivinhar-palavras-fichas',
    appId: 'word-guess',
    title: 'Adivinhar Palavras - Gerador de Atividades Grátis para Crianças',
    description: 'Crie atividades grátis de adivinhar palavras com nosso gerador. Imprimíveis grátis em PDF para educação infantil e ensino fundamental. Atividade para crianças.',
    keywords: 'atividade grátis, atividades grátis, adivinhar palavras, atividade para crianças, atividade para educação infantil, imprimíveis grátis, atividade grátis para crianças, alfabetização',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/adivinhar-palavras-fichas',
      },

  // Hero Section
  hero: {
    title: 'Atividade Grátis de Adivinhar Palavras para Crianças',
    subtitle: 'Atividades Grátis para Imprimir - Atividade para Educação Infantil',
    description: `Crie atividades de adivinhar palavras profissionais com nosso gerador exclusivo. Sua assinatura Acesso Completo permite criar atividades para imprimir ilimitadas sem taxas adicionais. Gere fichas pedagógicas personalizadas perfeitas para educação infantil, 1º ano e 2º ano. Baixe PDFs de alta qualidade em menos de 3 minutos.

O gerador de adivinhar palavras transforma a aprendizagem de vocabulário em experiências envolventes. Cada atividade mostra uma imagem com pistas visuais. O aluno precisa descobrir a palavra que corresponde à imagem. Letras parcialmente reveladas ajudam conforme o nível de dificuldade escolhido.

Este gerador cria atividades para imprimir que combinam reconhecimento de imagens com soletração. Os alunos observam a imagem-pista e preenchem as letras que formam a palavra. Isso desenvolve consciência fonológica enquanto praticam a escrita. As atividades de alfabetização ficam mais divertidas quando há mistério e descoberta envolvidos.`,
    previewImageSrc: '/samples/portuguese/word-guess/sample-1.jpeg',
    ctaLabels: {
      tryFree: 'Experimente Grátis',
      viewSamples: 'Ver Exemplos',
    },
    trustBadges: {
      languages: '11 Idiomas',
      images: '3000+ Imagens',
      license: 'Licença Comercial',
    },
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    floatingStats: {
      time: '3 min',
      action: 'Crie e Baixe',
      quality: '300 DPI',
    },
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Veja como funciona',
        modalTitle: 'Visão geral das funções',
      },
      appSpecific: {
        videoId: 'DSwX_p4dRNM',
        buttonText: 'Funções Adivinhe a palavra',
        modalTitle: 'Tutorial Adivinhe a palavra',
      },
    },
  },

  // Sample Gallery - Portuguese samples
  samples: {
    sectionTitle: 'Atividade Grátis para Crianças - Atividades Grátis e Imprimíveis Grátis',
    sectionDescription: 'Baixe imprimíveis grátis - Atividade grátis para crianças de qualidade profissional. Atividades grátis e atividade para crianças perfeitas para atividade para educação infantil. Atividade grátis para crianças e atividade para crianças incluem material educativo. Atividade grátis disponível',
    downloadLabel: 'Baixar Exemplo Grátis',
    worksheetLabel: 'Atividade',
    answerKeyLabel: 'Gabarito',
    viewAllLabel: 'Ampliar',
    noPdfLabel: 'Apenas prévia',
    freePdfCountLabel: 'downloads gratuitos',
    badgeText: 'Exemplos Grátis',
    downloadingLabel: 'Baixando...',
    ofLabel: 'de',
    items: [],
    
  },

  // Features Grid
  features: {
    sectionTitle: 'Atividades Grátis e Atividade para Crianças - Imprimíveis Grátis e Atividade para Educação Infantil',
    sectionDescription: 'O gerador de adivinhar palavras oferece recursos completos para educadores. Cada função foi projetada pensando em professores ocupados. Crie atividades para imprimir personalizadas sem conhecimento técnico. A interface intuitiva permite gerar fichas profissionais em minutos.',
    highlightBadgeText: 'Recurso Principal',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    badgeText: 'Recursos',
    trustBadges: {
      allFeatures: 'Todos os recursos incluídos',
      noHiddenFees: 'Sem taxas ocultas',
      cancelAnytime: 'Cancele quando quiser',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide
  howTo: {
    sectionTitle: 'Atividade Grátis para Crianças Criar - Atividade para Educação Infantil',
    sectionDescription: 'Criar atividades para imprimir profissionais leva menos de 3 minutos. Este guia mostra cada etapa do processo. Siga os passos e produza fichas pedagógicas de qualidade. Nenhuma experiência em design é necessária.',
    ctaText: 'Comece Agora',
    badgeText: 'Como Funciona',
    stepLabel: 'Passo',
    completionTitle: 'Pronto!',
    completionSubtitle: 'Sua atividade está pronta',
    readyTime: 'Pronta em menos de 3 minutos',
    noSkillsNeeded: 'Não precisa de habilidades técnicas',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Escolha Seu Conteúdo - Atividade Grátis',
        description: `O primeiro passo define o conteúdo das suas atividades educação infantil. Você tem três opções principais para escolher palavras e imagens.

Opção A - Seleção por Tema: Acesse a biblioteca de imagens no painel lateral. Escolha um tema como animais, frutas ou objetos. O gerador mostra todas as imagens disponíveis naquele tema. Clique nas imagens desejadas para selecioná-las. Selecione até 10 imagens por worksheet.

Opção B - Busca por Palavra: Use o campo de busca para encontrar imagens específicas. Digite "maçã" e veja resultados instantâneos. Combine imagens de diferentes temas. Crie coleções personalizadas de vocabulário.

Opção C - Lista de Palavras Personalizadas: Ative a opção de lista personalizada. Digite até 8 palavras de sua escolha. O gerador cria exercícios apenas com texto. Perfeito para vocabulário técnico.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure as Opções - Atividade para Crianças',
        description: `O segundo passo ajusta dificuldade e formato das atividades. Personalize cada aspecto conforme sua turma.

Número de Exercícios: Escolha de 1 a 10 puzzles por página. Atividades 1º ano e 2º ano geralmente usam 6 a 8 exercícios. Turmas de educação infantil podem preferir 4 a 6 com imagens maiores.

Nível de Dificuldade: Quatro opções controlam quantas letras aparecem como pistas. Sem pistas coloca caixas completamente vazias. Fácil mostra metade das letras já preenchidas. Normal revela um quarto das letras. Difícil mostra apenas uma ou duas letras.

Exclusão de Letras: Configure letras que nunca aparecem como pistas. Digite "AEIOU" para nunca mostrar vogais. Isso força prática intensiva de vogais específicas.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Gere Sua Atividade - Atividades Grátis',
        description: `Clique no botão "Gerar" e suas atividades para imprimir aparecem instantaneamente. O processo leva segundos. Visualize o resultado imediatamente na tela.

Layout Automático: O gerador calcula o melhor arranjo automaticamente. Páginas em retrato organizam puzzles em coluna única. Páginas em paisagem podem usar duas colunas. Exercícios de coordenação motora ficam bem distribuídos.

Prévia em Tempo Real: Veja exatamente como sua ficha ficará impressa. Alterne entre aba de worksheet e gabarito. O gabarito mostra todas as respostas preenchidas.

Regeneração Rápida: Não gostou do resultado? Clique em gerar novamente. Novas imagens são selecionadas aleatoriamente do seu conjunto. Letras-pista aparecem em posições diferentes.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edite no Canvas - Atividade para Educação Infantil',
        description: `Após gerar, personalize cada elemento das atividades de alfabetização. O canvas oferece edição completa e flexível.

Movimentação Livre: Arraste qualquer elemento para nova posição. Redimensione imagens arrastando os cantos. Gire elementos usando a alça de rotação. Posicione cada puzzle exatamente onde preferir.

Adicione Elementos Extras: Insira texto personalizado como instruções ou títulos. Escolha fontes adequadas para crianças. Adicione campo de nome e data se necessário.

Organize Camadas: Traga elementos para frente quando sobrepostos. Envie decorações para trás do conteúdo principal. Alinhe múltiplos objetos automaticamente.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe e Imprima',
        description: `O passo final exporta suas atividades educação infantil em alta qualidade. Múltiplos formatos atendem diferentes necessidades.

Formato PDF: Escolha PDF para máxima qualidade de impressão. Resolução de 300 DPI garante nitidez profissional. Ideal para impressão em papel ou envio para gráfica.

Formato JPEG: Escolha JPEG para compartilhamento digital rápido. Envie por WhatsApp ou e-mail facilmente. Publique em plataformas de ensino online.

Worksheet e Gabarito Separados: Baixe a ficha do aluno sem respostas. Baixe o gabarito com todas as letras preenchidas. Use o gabarito para correção rápida.

Opção Escala de Cinza: Ative para converter imagens coloridas em preto e branco. Economize tinta colorida nas impressões.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases
  useCases: {
    sectionTitle: 'Atividade Grátis para Crianças - Atividade para Educação Infantil com Imprimíveis Grátis. Atividade para Crianças',
    sectionDescription: 'O gerador de adivinhar palavras atende educadores diversos. Cada perfil encontra recursos específicos para suas necessidades. Descubra como diferentes profissionais aproveitam a ferramenta.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section
  faq: {
    sectionTitle: 'FAQ - Atividade Grátis para Crianças e Atividade para Educação Infantil. Atividade para Crianças',
    sectionDescription: 'Professores têm dúvidas comuns sobre o gerador. Esta seção responde às perguntas mais frequentes.',
    showMoreText: 'Mostrar mais perguntas',
    showLessText: 'Mostrar menos',
    badgeText: 'FAQ',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    secureCheckout: 'Pagamento seguro',
    cancelAnytime: 'Cancele quando quiser',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing
  pricing: {
    title: 'Acesso Completo',
    price: 'R$1.200',
    priceInterval: '/ano',
    priceSuffix: 'Cobrado anualmente',
    benefits: [
      'Criação ilimitada de atividades',
      'Licença comercial incluída',
      '11 idiomas suportados',
      '3000+ imagens temáticas',
      'Qualidade de impressão 300 DPI',
      'Gabaritos incluídos',
      'Todos os 33 geradores',
    ],
    ctaText: 'Comece Agora',
    bundleDescription: 'Sua assinatura inclui acesso a todos os 33 geradores de fichas:',
    bundleApps: [
      'Adição Ilustrada',
      'Trenzinho do Alfabeto',
      'Grande ou Pequeno',
      'Bingo Ilustrado',
      'Gráficos para Contar',
      'Adição Codificada',
      'Páginas para Colorir',
      'Palavras Cruzadas Ilustradas',
      'Criptograma Ilustrado',
      'Desenhar e Colorir',
      'Traçar Linhas',
      'Procurar e Contar',
      'Encontre os Objetos',
      'Grade de Correspondência',
      'Jogos de Correspondência',
      'Desafio Matemático',
      'Atividades de Matemática',
      'Peças Faltando',
      'Mais ou Menos',
      'Qual é o Diferente',
      'Trenzinho de Sequências',
      'Atividades de Padrões',
      'Caminho Ilustrado',
      'Classificar Imagens',
      'Preposições',
      'Jogo das Sombras',
      'Subtração',
      'Sudoku Infantil',
      'Caça ao Tesouro',
      'Adivinhe a Palavra',
      'Palavras Embaralhadas',
      'Caça-Palavras',
      'Prática de Escrita',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Atividades Grátis Combinar - Atividade para Crianças e Imprimíveis Grátis',
    sectionDescription: 'Crie pacotes de aprendizagem completos combinando adivinhar palavras com estes geradores complementares.',
    ctaTitle: 'Pronto para Criar Atividades Incríveis?',
    ctaDescription: 'Junte-se a milhares de educadores que criam atividades profissionais. Geração ilimitada, licença comercial incluída.',
    primaryCtaText: 'Iniciar Teste Gratuito',
    secondaryCtaText: 'Ver Todos os 33 Geradores',
    badgeText: 'Funciona Perfeitamente Com',
    exploreText: 'Explorar todas as aplicações',
    trustBadges: {
      securePayment: 'Pagamento seguro',
      cancelAnytime: 'Cancele quando quiser',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default wordGuessPtContent;
