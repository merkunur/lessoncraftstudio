import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Atividades de Ligar (Matching/MatchUp Maker) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/ligar-fichas.ts
 * URL: /pt/apps/ligar-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/matching.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const matchingPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'ligar-fichas',
    appId: 'matching-app',
    title: 'Atividades de Ligar para Imprimir - Gerador de Atividades de Alfabetização para Educação Infantil',
    description: 'Crie atividades de ligar profissionais em menos de 3 minutos. Com sua assinatura Pacote Essencial, você tem acesso ilimitado ao gerador de atividades para imprimir. Produza fichas educativas personalizadas sem taxas por atividade.',
    keywords: 'atividades de ligar, atividades para imprimir, atividades de alfabetização, educação infantil, coordenação motora, associação, atividades vogais, 1º ano, 2º ano, desenhos para colorir, letra cursiva, pontilhado',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/ligar-fichas',
  },

  // Hero Section - FULL text from matching.md paragraphs 1-3
  hero: {
    title: 'Atividades de Ligar para Imprimir',
    subtitle: 'Gerador de Atividades de Alfabetização para Educação Infantil',
    description: `Crie atividades de ligar profissionais em menos de 3 minutos. Com sua assinatura Pacote Essencial, você tem acesso ilimitado ao gerador de atividades para imprimir. Produza fichas educativas personalizadas sem taxas por atividade. Baixe em PDF de alta qualidade prontas para usar em sala de aula.

O gerador de atividades de ligar é a solução completa para professores de educação infantil e ensino fundamental. Crie exercícios onde os alunos conectam imagens com letras iniciais, palavras ou outras imagens. Perfeito para atividades de alfabetização e desenvolvimento da coordenação motora.

Desenvolva materiais didáticos que associam imagens a letras iniciais. Ideal para crianças em fase de alfabetização. O sistema oferece biblioteca com mais de 3000 imagens educativas organizadas por temas.`,
    previewImageSrc: '',
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
  },

  // Sample Gallery - REAL file paths from samples/english/matching/
  samples: {
    sectionTitle: 'Exemplos de Atividades de Ligar',
    sectionDescription: 'Baixe exemplos gratuitos para ver nossa qualidade profissional',
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

  // Use Cases - FULL text from matching.md use case sections
  useCases: {
    sectionTitle: 'Quem Usa Atividades de Ligar',
    sectionDescription: 'O gerador de atividades de ligar atende diversos perfis de educadores. Professores de escola, pais e profissionais encontram valor nesta ferramenta. Cada grupo utiliza as atividades para imprimir de formas diferentes.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [],
    ctaText: 'Comece Agora',
    bundleDescription: 'Sua assinatura inclui acesso a 10 geradores de fichas:',
    bundleApps: [
      'Adicao com Imagens',
      'Trem do Alfabeto',
      'Paginas para Colorir',
      'Fichas de Matematica',
      'Palavras Embaralhadas',
      'Encontre e Conte',
      'Jogo de Associacao',
      'Tracar Linhas',
      'Bingo de Imagens',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine com Outros Geradores de Atividades',
    sectionDescription: 'Maximize o valor do seu Pacote Essencial combinando geradores. Crie pacotes completos de atividades para imprimir usando múltiplos apps.',
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
    items: [],
  },
};

export default matchingPtContent;
