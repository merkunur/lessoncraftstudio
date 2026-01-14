import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Trenzinho do Alfabeto (Alphabet Train) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/trem-alfabeto-fichas.ts
 * URL: /pt/apps/trem-alfabeto-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/alphabet-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Pricing: Core Bundle (Pacote Essencial) - R$144/year or R$15/month
 */

export const alphabetTrainPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'trem-alfabeto-fichas',
    appId: 'alphabet-train',
    title: 'Gerador Trenzinho do Alfabeto - Atividades de Alfabetização para Imprimir com Educação Infantil',
    description: 'Crie atividades de alfabetização profissionais com nosso gerador de trenzinho do alfabeto. Sua assinatura Pacote Essencial oferece criação ilimitada de atividades para imprimir sem taxas extras. Produza atividades vogais e alfabeto personalizadas em menos de 3 minutos.',
    keywords: 'atividades de alfabetização, atividades para imprimir, atividades educação infantil, atividades vogais, alfabeto, coordenação motora, desenhos para colorir, letra cursiva, pontilhado, 1º ano, 2º ano, trenzinho do alfabeto',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/trem-alfabeto-fichas',
  },

  // Hero Section - FULL text from alphabet-train.md
  hero: {
    title: 'Gerador Trenzinho do Alfabeto',
    subtitle: 'Atividades de Alfabetização para Imprimir com Educação Infantil',
    description: `Crie atividades de alfabetização profissionais com nosso gerador de trenzinho do alfabeto. Com sua assinatura Pacote Essencial, você gera atividades para imprimir ilimitadas sem taxas extras. Produza atividades vogais e alfabeto personalizadas em menos de 3 minutos. Baixe PDFs de alta qualidade prontos para a sala de aula.

O trenzinho do alfabeto transforma o aprendizado das letras em diversão. Cada vagão carrega uma letra diferente. As crianças adoram esse formato lúdico. Ideal para atividades educação infantil e atividades 1º ano.

O gerador de trenzinho do alfabeto cria fichas educativas de forma rápida. Selecione 11 letras para formar seu trem. Associe cada letra a uma imagem correspondente. O sistema oferece mais de 3000 imagens para escolher.`,
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

  // Sample Gallery - REAL file paths from samples/english/alphabet train/
  samples: {
    sectionTitle: 'Exemplos de Atividades do Trenzinho do Alfabeto',
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

  // Use Cases - FULL text from alphabet-train.md use case sections
  useCases: {
    sectionTitle: 'Quem Usa o Gerador de Trenzinho do Alfabeto',
    sectionDescription: 'O gerador de trenzinho do alfabeto atende diversos perfis de educadores. Professores de atividades educação infantil encontram recursos ideais. Pais que educam em casa ganham materiais profissionais. Descubra como cada grupo usa atividades para imprimir do trenzinho.',
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
    sectionDescription: 'Crie pacotes de aprendizagem completos combinando o trenzinho do alfabeto com estes geradores complementares.',
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

export default alphabetTrainPtContent;
