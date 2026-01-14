import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Atividades de Caligrafia (Writing Worksheets) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/caligrafia-fichas.ts
 * URL: /pt/apps/caligrafia-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/writing.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const writingPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'caligrafia-fichas',
    appId: 'writing-app',
    title: 'Atividades de Caligrafia para Imprimir - Gerador de Letra Cursiva e Pontilhado para Alfabetização',
    description: 'Crie atividades de caligrafia profissionais com nosso gerador de fichas de escrita. Sua assinatura Acesso Completo oferece criação ilimitada de atividades para imprimir sem taxas adicionais. Gere atividades de alfabetização personalizadas em menos de 3 minutos.',
    keywords: 'atividades de caligrafia, atividades para imprimir, letra cursiva, pontilhado, alfabetização, educação infantil, 1º ano, 2º ano, coordenação motora, atividades vogais, atividades alfabeto',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/caligrafia-fichas',
  },

  // Hero Section - FULL text from writing.md paragraphs 1-3
  hero: {
    title: 'Atividades de Caligrafia para Imprimir',
    subtitle: 'Gerador de Letra Cursiva e Pontilhado para Alfabetização',
    description: `Crie atividades de caligrafia profissionais com nosso gerador de fichas de escrita. Sua assinatura Acesso Completo oferece criação ilimitada de atividades para imprimir sem taxas adicionais por ficha. Gere atividades de alfabetização personalizadas em menos de 3 minutos. Baixe PDFs de alta qualidade prontos para usar em sala de aula.

Professores de educação infantil e ensino fundamental precisam de atividades de escrita de qualidade. Nossa ferramenta oferece exatamente isso. Você cria fichas de pontilhado e letra cursiva em poucos cliques. Cada atividade é personalizável do início ao fim.

O gerador de atividades para imprimir inclui cinco estilos de fonte diferentes. Você encontra letra bastão regular, letra bastão com setas direcionais, letra para cobrir pontilhada, letra pontilhada com setas e letra cursiva completa. Cada estilo atende a uma etapa diferente do desenvolvimento da escrita.`,
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

  // Sample Gallery - REAL file paths from samples/english/writing/
  samples: {
    sectionTitle: 'Exemplos de Atividades de Caligrafia',
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

  // Use Cases - FULL text from writing.md user types sections
  useCases: {
    sectionTitle: 'Quem Usa o Gerador de Atividades de Caligrafia',
    sectionDescription: 'Nosso gerador de atividades para imprimir atende diversos públicos. Professores de todas as etapas usam a ferramenta. Pais que educam em casa também se beneficiam. Veja como cada grupo aproveita os recursos de coordenação motora.',
    badgeText: 'Quem Usa',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [],
    ctaText: 'Assinar Agora',
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

  // FAQ Section - FULL text from writing.md FAQ section
  faq: {
    sectionTitle: 'Perguntas Frequentes sobre Atividades de Caligrafia',
    sectionDescription: 'Reunimos as dúvidas mais comuns sobre nosso gerador de atividades de alfabetização. Cada resposta ajuda você a entender melhor a ferramenta. Tire suas dúvidas sobre coordenação motora, formatos e recursos disponíveis.',
    showMoreText: 'Mostrar mais perguntas',
    showLessText: 'Mostrar menos',
    badgeText: 'Perguntas Frequentes',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    secureCheckout: 'Pagamento seguro',
    cancelAnytime: 'Cancele quando quiser',
    items: [],
  },

  // Related Apps - Combine with other generators
  relatedApps: {
    sectionTitle: 'Combine Caligrafia com Outros Geradores',
    sectionDescription: 'Sua assinatura Acesso Completo inclui 33 geradores de atividades. Combine caligrafia com atividades de matemática para aprendizado integrado. Adicione desenhos para colorir às suas fichas de escrita. Crie pacotes completos com tabuada e muito mais.',
    ctaTitle: 'Pronto para Criar Atividades Profissionais?',
    ctaDescription: 'Junte-se a milhares de professores criando atividades de caligrafia de qualidade.',
    primaryCtaText: 'Comece Agora',
    secondaryCtaText: 'Ver Todos os 33 Apps',
    badgeText: 'Combine Com',
    exploreText: 'Explorar todos os apps',
    trustBadges: {
      securePayment: 'Pagamento seguro',
      cancelAnytime: 'Cancele quando quiser',
    },
    items: [],
  },
};

export default writingPtContent;
