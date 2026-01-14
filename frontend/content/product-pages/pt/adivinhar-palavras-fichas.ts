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
    title: 'Gerador de Atividades para Imprimir com Adivinhar Palavras | Atividades de Alfabetização',
    description: 'Crie atividades de adivinhar palavras profissionais com nosso gerador. Atividades para imprimir em PDF para educação infantil, 1º ano e 2º ano. Atividades de alfabetização com gabarito.',
    keywords: 'adivinhar palavras, atividades para imprimir, atividades de alfabetização, educação infantil, 1º ano, 2º ano, coordenação motora, vogais, alfabeto, tabuada, letra cursiva, pontilhado, desenhos para colorir',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/adivinhar-palavras-fichas',
  },

  // Hero Section
  hero: {
    title: 'Adivinhar Palavras Grátis',
    subtitle: 'Atividades para Imprimir - Atividades de Alfabetização para Educação Infantil',
    description: `Crie atividades de adivinhar palavras profissionais com nosso gerador exclusivo. Sua assinatura Acesso Completo permite criar atividades para imprimir ilimitadas sem taxas adicionais. Gere fichas pedagógicas personalizadas perfeitas para educação infantil, 1º ano e 2º ano. Baixe PDFs de alta qualidade em menos de 3 minutos.

O gerador de adivinhar palavras transforma a aprendizagem de vocabulário em experiências envolventes. Cada atividade mostra uma imagem com pistas visuais. O aluno precisa descobrir a palavra que corresponde à imagem. Letras parcialmente reveladas ajudam conforme o nível de dificuldade escolhido.

Este gerador cria atividades para imprimir que combinam reconhecimento de imagens com soletração. Os alunos observam a imagem-pista e preenchem as letras que formam a palavra. Isso desenvolve consciência fonológica enquanto praticam a escrita. As atividades de alfabetização ficam mais divertidas quando há mistério e descoberta envolvidos.`,
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

  // Sample Gallery - REAL file paths from samples/english/word guess/
  samples: {
    sectionTitle: 'Exemplos de Atividades de Adivinhar Palavras',
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

  // Use Cases
  useCases: {
    sectionTitle: 'Quem Usa o Gerador de Atividades de Alfabetização',
    sectionDescription: 'O gerador de adivinhar palavras atende educadores diversos. Cada perfil encontra recursos específicos para suas necessidades. Descubra como diferentes profissionais aproveitam a ferramenta.',
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
    sectionTitle: 'Combine Adivinhar Palavras com Outros Geradores',
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
    items: [],
  },
};

export default wordGuessPtContent;
