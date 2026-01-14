import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Caça-Palavras (Word Search) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/caca-palavras-fichas.ts
 * URL: /pt/apps/caca-palavras-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'caca-palavras-fichas',
    appId: 'word-search',
    title: 'Gerador de Caça-Palavras Grátis | Atividades para Imprimir e Atividades de Alfabetização',
    description: 'Crie caça-palavras personalizados em poucos cliques. Baixe atividades para imprimir em PDF para educação infantil e ensino fundamental. Atividades de alfabetização com gabarito. Coordenação motora e desenvolvimento cognitivo.',
    keywords: 'caça-palavras, atividades para imprimir, atividades de alfabetização, educação infantil, ensino fundamental, 1º ano, 2º ano, coordenação motora, vogais, alfabeto, tabuada, letra cursiva, pontilhado, desenhos para colorir',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/caca-palavras-fichas',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-3
  hero: {
    title: 'Gerador de Caça-Palavras Grátis',
    subtitle: 'Atividades para Imprimir e Atividades de Alfabetização para Educação Infantil',
    description: `Crie caça-palavras personalizados em poucos cliques. O gerador de caça-palavras da LessonCraft Studio oferece uma versão gratuita com marca d'água. Para uso comercial e recursos completos, a assinatura Pacote Essencial custa R$720 por ano. Baixe fichas pedagógicas prontas em PDF. Economize horas de preparação de aulas.

O caça-palavras é uma das atividades mais queridas nas escolas brasileiras. Professores de educação infantil e ensino fundamental usam diariamente. Crianças adoram encontrar palavras escondidas na grade. Essa atividade desenvolve vocabulário e concentração.

Nosso gerador cria atividades para imprimir em segundos. Escolha entre mais de 3000 imagens da biblioteca. Selecione temas como animais, frutas ou profissões. O sistema gera automaticamente a grade de letras. Tudo pronto para baixar em PDF de alta qualidade.`,
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Exemplos de Caça-Palavras',
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

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Quem Usa o Gerador de Caça-Palavras',
    sectionDescription: 'O gerador de caça-palavras atende diversos públicos. Professores, pais e empreendedores usam diariamente. Cada grupo encontra benefícios específicos. Descubra como a ferramenta pode ajudar você.',
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
    sectionDescription: 'Crie pacotes de aprendizagem completos combinando caça-palavras com estes geradores complementares.',
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

export default wordSearchPtContent;
