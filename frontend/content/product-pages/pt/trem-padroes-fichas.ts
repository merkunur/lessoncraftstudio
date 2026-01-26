import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Trenzinho de Padrões (Pattern Train) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/trem-padroes-fichas.ts
 * URL: /pt/apps/trem-padroes-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/pattern-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Pricing: Full Access (Acesso Completo) - R$240/year or R$25/month
 *
 * SEO Optimized: Universal keywords distributed throughout
 * - Atividade grátis
 * - Atividade grátis para crianças
 * - Atividades grátis
 * - Imprimíveis grátis
 * - Atividade para crianças
 * - Atividade para educação infantil
 */

export const patternTrainPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'trem-padroes-fichas',
    appId: 'pattern-train',
    title: 'Atividade Grátis de Trenzinho de Padrões | Planilhas Grátis',
    description: 'Crie atividades grátis de sequência lógica com tema de trenzinho em poucos cliques. Atividade grátis para crianças com sua assinatura Acesso Completo.',
    keywords: 'atividade grátis, atividade grátis para crianças, atividades grátis, imprimíveis grátis, atividade para crianças, atividade para educação infantil, atividade, atividades de sequência lógica, atividades para imprimir, coordenação motora, raciocínio lógico, padrões, trenzinho de padrões',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/trem-padroes-fichas',
      },

  // Hero Section - FULL text from pattern-train.md
  hero: {
    title: 'Atividade Grátis de Trenzinho de Padrões - Atividade Grátis para Crianças e Imprimíveis Grátis',
    subtitle: 'Gerador de Atividade Grátis para Educação Infantil com Sequência Lógica',
    description: `Crie atividades grátis de sequência lógica com tema de trenzinho em poucos cliques. Com sua assinatura Acesso Completo, você gera quantas atividades quiser sem taxas adicionais. Baixe imprimíveis grátis de alta qualidade prontas para usar na sala de aula ou em casa. O formato PDF permite impressão em qualquer impressora doméstica.

O Trenzinho de Padrões é uma atividade grátis para crianças que desenvolve habilidades de reconhecimento de sequências. Cada vagão do trenzinho mostra uma imagem que faz parte de um padrão. A criança identifica qual imagem completa a sequência. É uma atividade para educação infantil perfeita para coordenação motora e raciocínio lógico.

Este gerador oferece 5 tipos de padrões diferentes para atividades grátis. Você escolhe entre padrões AB, AAB, ABB, ABC e AABB. Cada tipo representa um nível de dificuldade. Atividade grátis para crianças da educação infantil começam com padrões AB simples. Alunos do 1º ano e 2º ano avançam para padrões mais complexos como AABB.`,
    previewImageSrc: '/samples/portuguese/pattern-train/sample-1.jpeg',
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
        videoId: '5A4aHvcC5u4',
        buttonText: 'Funções Trenzinho de Sequências',
        modalTitle: 'Tutorial Trenzinho de Sequências',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/portuguese/pattern-train/
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

  // Features Grid - FULL text from pattern-train.md feature sections
  features: {
    sectionTitle: 'Atividades Grátis e Atividade para Crianças - Imprimíveis Grátis e Atividade para Educação Infantil',
    sectionDescription: 'O gerador de Trenzinho de Padrões oferece recursos completos para criar atividade grátis de qualidade. Cada funcionalidade foi desenvolvida pensando em educadores brasileiros. Crie atividade grátis para crianças personalizadas em minutos. Professores de educação infantil e ensino fundamental usam diariamente.',
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

  // How-To Guide - FULL text from pattern-train.md step sections
  howTo: {
    sectionTitle: 'Atividade Grátis para Crianças Criar - Atividade para Educação Infantil',
    sectionDescription: 'Criar atividade grátis de sequência lógica nunca foi tão simples. O processo completo leva menos de 3 minutos. Siga estes 5 passos e tenha suas atividades grátis prontas. Professores de educação infantil economizam horas de trabalho manual.',
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
        title: 'Escolha o Tipo de Padrão para Atividade Grátis - Atividade para Educação Infantil',
        description: `O primeiro passo para sua atividade grátis é selecionar o tipo de padrão desejado. O gerador oferece 5 opções de complexidade crescente. Cada padrão desenvolve coordenação motora e raciocínio lógico de forma diferente.

**Padrão AB** é o mais simples para atividade grátis para crianças. Alterna entre duas imagens: maçã, banana, maçã, banana. Ideal para crianças da educação infantil iniciando em padrões. Desenvolve reconhecimento básico de sequências.

**Padrão AAB** adiciona repetição. Duas imagens iguais seguidas de uma diferente. Exemplo: maçã, maçã, banana, maçã, maçã, banana. Aumenta levemente a dificuldade para alunos intermediários.

**Padrão ABC** usa três elementos diferentes. Exemplo: maçã, banana, uva, maçã, banana, uva. Exige mais memória de trabalho. Indicado para alunos do 1º ano e 2º ano.`,
        icon: '🔤',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure Atividade Grátis para Crianças - Quantidade e Formato das Atividades Grátis',
        description: `Depois de escolher o padrão para sua atividade grátis, defina as configurações do worksheet. Cada opção personaliza suas imprimíveis grátis conforme a necessidade.

**Número de exercícios**: Escolha entre 4 e 10 trenzinhos por página. Menos exercícios para crianças menores. Mais exercícios para alunos avançados. Ajuste conforme o tempo de aula disponível.

**Tamanho do papel**: Selecione Letter ou A4 para atividade grátis para crianças. Versões retrato ou paisagem disponíveis. Formato quadrado para atividades especiais. Dimensões personalizadas também são possíveis.

**Campos de nome e data**: Marque a opção para incluir. Espaços aparecem no topo da página. Facilita organização de atividade para educação infantil dos alunos. Útil para arquivamento em portfólios.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Selecione Imagens para Atividades Grátis - Atividade para Crianças com Biblioteca',
        description: `A seleção de imagens define o conteúdo visual da atividade grátis. Você tem três opções para criar atividades grátis personalizadas.

**Opção 1 - Seleção por tema**: Escolha um tema como "Animais da Fazenda". O gerador seleciona imagens aleatoriamente do tema. Rápido e fácil para atividade grátis para crianças variadas.

**Opção 2 - Seleção manual**: Navegue pela biblioteca de 3000+ imagens para imprimíveis grátis. Clique nas imagens desejadas para selecionar. Crie combinações específicas para seus objetivos. Ideal para atividade para educação infantil temáticas.

**Opção 3 - Upload de imagens**: Faça upload de suas próprias imagens. Fotos da turma, mascotes ou símbolos. Combine com imagens da biblioteca. Máxima personalização para atividades grátis únicas.`,
        icon: '🖼️',
      },
      {
        id: '4',
        number: 4,
        title: 'Gere e Edite Atividade Grátis no Canvas - Imprimíveis Grátis Personalizadas',
        description: `Com configurações definidas, clique em "Criar" sua atividade grátis. O worksheet aparece instantaneamente na tela. Agora você pode editar livremente no canvas.

**Movimentação de elementos**: Arraste qualquer objeto para reposicionar. Mova o trenzinho para cima ou para baixo. Ajuste espaçamento entre exercícios. Tudo com cliques simples do mouse.

**Redimensionamento**: Clique e arraste os cantos para redimensionar atividade grátis para crianças. Aumente imagens para destaque. Diminua para caber mais conteúdo. Proporções são mantidas automaticamente.

**Adição de texto**: Inclua instruções personalizadas em atividades grátis. Adicione nome do professor ou escola. Insira títulos criativos. Escolha fontes, cores e tamanhos.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe Atividade para Educação Infantil em PDF - Atividades Grátis com Gabarito',
        description: `O passo final é exportar sua atividade grátis. Escolha o formato ideal para suas atividade para crianças e matemática.

**Formato JPEG**: Ideal para visualização rápida de atividades grátis. Compartilhe por WhatsApp ou email. Poste em grupos de professores. Arquivo leve e universal.

**Formato PDF**: Perfeito para impressão profissional de imprimíveis grátis. Mantém qualidade em qualquer escala. Ideal para venda em plataformas. Padrão para atividade grátis para crianças comerciais.

**Worksheet e Gabarito**: Baixe a atividade grátis do aluno separadamente. Baixe também o gabarito com respostas. Use o gabarito para correção rápida. Ou envie para pais verificarem em casa.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from pattern-train.md use case sections
  useCases: {
    sectionTitle: 'Atividade Grátis para Crianças - Atividade para Educação Infantil com Imprimíveis Grátis. Atividade para Crianças',
    sectionDescription: 'O gerador de Trenzinho de Padrões atende diversos perfis de educadores brasileiros. Professores de atividade para educação infantil usam diariamente. Atividade grátis serve múltiplos contextos educacionais. Veja como usar esta ferramenta para atividades grátis de alfabetização e muito mais.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL text from pattern-train.md FAQ sections
  faq: {
    sectionTitle: 'Perguntas sobre Atividades Grátis - Dúvidas sobre Atividade para Crianças do Trenzinho de Padrões',
    sectionDescription: 'Professores têm dúvidas comuns sobre o gerador de atividade grátis. Esta seção responde às perguntas mais frequentes. Atividades grátis para imprimir são o foco principal. Encontre respostas sobre imprimíveis grátis e atividade para educação infantil.',
    showMoreText: 'Mostrar mais perguntas',
    showLessText: 'Mostrar menos',
    badgeText: 'Perguntas Frequentes',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    secureCheckout: 'Pagamento seguro',
    cancelAnytime: 'Cancele quando quiser',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - Full Access for Pattern Train
  pricing: {
    title: 'Acesso Completo',
    price: 'R$240',
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
    sectionTitle: 'Combine Atividade Grátis do Trenzinho de Padrões - Imprimíveis Grátis para Educação Infantil',
    sectionDescription: 'Maximize o valor do seu Acesso Completo combinando geradores. Crie pacotes completos de atividades grátis de alfabetização e coordenação motora usando múltiplos apps para atividade grátis para crianças.',
    ctaTitle: 'Pronto para Criar Atividade Grátis de Trenzinho de Padrões Incríveis?',
    ctaDescription: 'Junte-se a milhares de educadores que criam atividade grátis para crianças profissionais. Geração ilimitada de imprimíveis grátis, licença comercial incluída.',
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

export default patternTrainPtContent;
