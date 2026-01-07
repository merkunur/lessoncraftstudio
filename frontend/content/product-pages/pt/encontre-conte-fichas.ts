import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Encontre e Conte (Find and Count) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/encontre-conte-fichas.ts
 * URL: /pt/apps/encontre-conte-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/find-and-count.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findAndCountPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'encontre-conte-fichas',
    appId: 'find-and-count',
    title: 'Encontre e Conte - Gerador de Atividades para Imprimir - Fichas de Objetos Escondidos para Educação Infantil',
    description: 'Crie fichas de encontre e conte profissionais com nosso gerador de atividades para imprimir. Com sua assinatura Pacote Essencial, você gera atividades ilimitadas sem taxas por ficha. Produza atividades educação infantil personalizadas com objetos escondidos em menos de 3 minutos.',
    keywords: 'encontre e conte, atividades para imprimir, atividades de matemática, educação infantil, objetos escondidos, coordenação motora, contagem visual, atividades de alfabetização, atividades vogais, 1º ano, 2º ano, desenhos para colorir',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/encontre-conte-fichas',
  },

  // Hero Section - FULL text from find-and-count.md paragraphs 1-3
  hero: {
    title: 'Encontre e Conte - Gerador de Atividades para Imprimir',
    subtitle: 'Fichas de Objetos Escondidos para Educação Infantil',
    description: `Crie fichas de encontre e conte profissionais com nosso gerador de atividades para imprimir. Com sua assinatura Pacote Essencial, você gera atividades ilimitadas sem taxas por ficha. Produza atividades educação infantil personalizadas com objetos escondidos em menos de 3 minutos. Baixe PDFs de alta qualidade prontos para usar na sala de aula.

Professores de educação infantil buscam atividades de contagem envolventes. Nosso gerador cria fichas de encontre e conte em segundos. Cada atividade desenvolve habilidades de contagem e observação visual. Crianças procuram objetos escondidos enquanto praticam atividades de matemática básica.

Nossa ferramenta gera grades de 5x5 até 10x10 com imagens variadas. Selecione de 1 a 4 imagens para serem os objetos escondidos. A grade é preenchida automaticamente com essas imagens e outras do tema. Crianças contam quantas vezes cada objeto aparece.`,
    previewImageSrc: '/samples/english/find and count/find and count portrait.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
  samples: {
    sectionTitle: 'Exemplos de Fichas de Encontre e Conte',
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
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/find and count/find and count portrait.jpeg',
        answerKeySrc: '/samples/english/find and count/find and count portrait answer_key.jpeg',
        altText: 'Ficha de encontre e conte formato retrato para educação infantil',
        pdfDownloadUrl: '/samples/english/find and count/find and count portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/find and count/find and count landscape.jpeg',
        answerKeySrc: '/samples/english/find and count/find and count landscape answer_key.jpeg',
        altText: 'Ficha de encontre e conte formato paisagem para contagem visual',
        pdfDownloadUrl: '/samples/english/find and count/find and count landscape.pdf',
      },
    ],
  },

  // Features Grid - FULL text from find-and-count.md feature sections
  features: {
    sectionTitle: 'Recursos do Gerador de Encontre e Conte',
    sectionDescription: 'Nosso gerador de encontre e conte oferece recursos completos para educadores. Crie atividades para imprimir personalizadas em minutos. Cada ferramenta foi desenvolvida pensando em professores de educação infantil. Descubra como transformar sua rotina de preparação de materiais com fichas de objetos escondidos.',
    highlightBadgeText: 'Recurso Principal',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    badgeText: 'Recursos',
    trustBadges: {
      allFeatures: 'Todos os recursos incluídos',
      noHiddenFees: 'Sem taxas ocultas',
      cancelAnytime: 'Cancele quando quiser',
    },
    items: [
      {
        id: '1',
        icon: '⚡',
        title: 'Crie Atividades em 3 Cliques',
        description: `Selecione um tema da biblioteca de imagens. Escolha de 1 a 4 imagens para serem os objetos escondidos. Clique em gerar e sua ficha de encontre e conte aparece instantaneamente. A grade é preenchida automaticamente com seus objetos e imagens extras.

Todo o processo leva menos de 3 minutos. Professores de educação infantil economizam horas de trabalho. Crie atividades de matemática visual sem complicação.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Atividades Totalmente Editáveis',
        description: `Cada elemento na tela é completamente editável. Arraste, gire e redimensione qualquer imagem. Delete elementos que não deseja na grade. Ajuste a opacidade de cada objeto.

Organize camadas movendo itens para frente ou para trás. Suas fichas de encontre e conte ficam exatamente como você imaginou. Atividades para imprimir únicas toda vez.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🔢',
        title: 'Grade Configurável de 5x5 a 10x10',
        description: `Configure grades de 5x5 até 10x10 para diferentes níveis. Grades menores para crianças mais novas. Grades maiores para desafios de contagem avançados. Desenvolva conceitos de tabuada através de grupos visuais.

Atividades de matemática adaptadas para cada faixa etária. Contagem progressiva que acompanha o desenvolvimento. Encontre e conte para todos os níveis.`,
        highlighted: true,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Atividades em 11 Idiomas',
        description: `Interface disponível em português brasileiro e mais 10 idiomas. Biblioteca de imagens traduzida para facilitar buscas. Crie fichas de encontre e conte com vocabulário internacional.

Ideal para atividades de alfabetização em escolas bilíngues. Suporte a alemão, francês, espanhol, italiano e mais. Perfeito para programas de imersão linguística.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '📤',
        title: 'Upload de Imagens Próprias',
        description: `Envie suas próprias imagens para o gerador. Aceita formatos JPEG, PNG e GIF. Faça upload de múltiplos arquivos de uma vez. Combine fotos da turma com imagens da biblioteca.

Crie atividades educação infantil com rostos familiares. Personalize encontre e conte para cada aluno. Objetos escondidos com significado pessoal.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '💰',
        title: 'Licença Comercial POD Incluída',
        description: `Sua assinatura Pacote Essencial inclui licença comercial completa. Venda fichas de encontre e conte no Teachers Pay Teachers. Comercialize atividades para imprimir na Etsy.

Publique no Amazon KDP sem taxas extras. Exportação em 300 DPI para qualidade profissional. Crie um negócio com suas atividades de matemática visual.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🎨',
        title: 'Biblioteca com 3000+ Imagens',
        description: `Acesse mais de 3000 imagens infantis organizadas por tema. Encontre ilustrações para atividades vogais e alfabeto. Imagens de animais, frutas, transportes e profissões.

Busque por palavra-chave em português. Todas as imagens são adequadas para crianças. Crie fichas de encontre e conte variadas sem repetição.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🖨️',
        title: 'Qualidade Profissional 300 DPI',
        description: `Exporte em JPEG ou PDF com resolução profissional. Qualidade 300 DPI perfeita para impressão. Opção escala de cinza para economizar tinta.

Ideal para cópias em grande quantidade. Fichas de encontre e conte com linhas nítidas e definidas. Atividades para imprimir que impressionam pais e coordenadores.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from find-and-count.md step sections
  howTo: {
    sectionTitle: 'Como Criar Fichas de Encontre e Conte em 5 Passos',
    sectionDescription: 'Aprenda a criar fichas de encontre e conte profissionais em menos de 3 minutos. Este guia passo a passo mostra como produzir atividades para imprimir de qualidade. Ideal para professores de educação infantil e ensino fundamental.',
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
        title: 'Escolha Seu Conteúdo',
        description: `O primeiro passo é selecionar as imagens para sua ficha de encontre e conte. Você tem opções flexíveis para criar atividades educação infantil personalizadas.

Escolha um tema da lista suspensa como animais, frutas ou transportes. Todas as imagens relacionadas aparecem automaticamente na biblioteca. Selecione de 1 a 4 imagens para serem seus objetos escondidos.

A grade será preenchida com essas imagens e outras do tema. Ideal para atividades de matemática temáticas e organizadas.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure as Opções de Página',
        description: `Após escolher as imagens, configure o formato da página. Selecione entre Carta retrato, Carta paisagem, A4 retrato ou A4 paisagem.

Configure a grade de 5x5 até 10x10 linhas e colunas. Grades menores são ideais para crianças pequenas. Grades maiores desafiam alunos mais avançados.

Escolha bordas temáticas decorativas para suas fichas. Adicione fundos coloridos ou neutros conforme preferência.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Gere Sua Ficha',
        description: `Com as configurações definidas, hora de gerar sua ficha. Clique no botão "Gerar" e sua ficha aparece instantaneamente. A grade é preenchida com seus objetos escondidos e imagens extras.

Distribuição aleatória garante fichas únicas toda vez. Desenvolva coordenação motora com atividades de busca visual. Atividades educação infantil prontas em segundos.

O gerador cria automaticamente a folha de respostas. Cada objeto escondido aparece destacado com círculo colorido.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edite e Personalize',
        description: `O gerador oferece controles completos de edição na tela. Arraste qualquer imagem para nova posição na grade. Redimensione arrastando os cantos do objeto.

Gire imagens para composições mais interessantes. Delete elementos que não deseja na ficha. Adicione texto personalizado com ferramentas simples e intuitivas.

Crie títulos para atividades 1º ano e 2º ano. Inclua campos "Nome:" e "Data:" para organização.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe e Imprima',
        description: `O último passo é exportar seu trabalho finalizado. Exporte como JPEG para uso digital e compartilhamento. Escolha PDF para impressão física de alta qualidade.

Qualidade 300 DPI profissional para cópias nítidas. Ative escala de cinza para economizar tinta colorida. Exporte tanto a ficha quanto o gabarito separadamente.

Entregue a atividade aos alunos para contagem. Guarde o gabarito para correção rápida posterior.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from find-and-count.md use case sections
  useCases: {
    sectionTitle: 'Quem Usa Encontre e Conte',
    sectionDescription: 'Nosso gerador de encontre e conte atende diversos perfis de educadores brasileiros. De professores de educação infantil a empreendedores educacionais. Descubra como cada grupo utiliza atividades para imprimir em sua rotina pedagógica.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades de Matemática e Coordenação Motora na Pré-Escola',
        description: `Educadores de creche e pré-escola usam encontre e conte para desenvolver habilidades essenciais. Crianças de 3 a 5 anos praticam contagem de forma lúdica e visual. Atividades de matemática se tornam brincadeiras de busca e descoberta.

O desenvolvimento da coordenação motora acontece naturalmente ao circular objetos. Professores de pré-escola desenvolvem coordenação motora através de fichas de encontre e conte. Grades menores de 5x5 são ideais para os pequenos.

Combine contagem com reconhecimento de imagens para atividades vogais e alfabeto. Crianças identificam objetos cujos nomes começam com vogais específicas.`,
        quote: 'Meus alunos adoram procurar os objetos escondidos!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professores do 1º e 2º Ano',
        subtitle: 'Tabuada Visual e Contagem em Grupos',
        description: `Docentes do ensino fundamental usam encontre e conte para reforçar conceitos matemáticos. Atividades 1º ano integram contagem com reconhecimento numérico. Professores de 2º ano avançam para grupos e conceitos de tabuada.

Crie fichas de encontre e conte para ensinar tabuada visualmente. Alunos contam grupos de objetos iguais desenvolvendo multiplicação. Grades maiores desafiam alunos mais avançados.

Desenvolva atividades de alfabetização integrando contagem e vocabulário. Alunos identificam e contam objetos escrevendo os nomes.`,
        quote: 'A progressão de dificuldade acompanha o desenvolvimento dos alunos.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Pais Homeschoolers',
        subtitle: 'Atividades para Imprimir Personalizadas em Casa',
        description: `Famílias que educam em casa valorizam encontre e conte pela versatilidade. Pais criam materiais personalizados para cada filho. Atividades para imprimir economizam tempo de preparação.

Personalize fichas de encontre e conte com fotos da família. Adicione exercícios de letra cursiva e pontilhado na mesma página. Crie atividades para imprimir únicas para cada criança.

Desenvolva coordenação motora com fichas de encontre e conte caseiras. Combine com desenhos para colorir após a contagem.`,
        quote: 'Uma ferramenta perfeita para educação domiciliar.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Professores de Idiomas',
        subtitle: 'Atividades de Alfabetização Bilíngue',
        description: `Educadores de línguas usam encontre e conte para ensinar vocabulário visual. Atividades de alfabetização funcionam em qualquer dos 11 idiomas suportados. Alunos aprendem palavras novas enquanto praticam contagem.

Crie fichas de encontre e conte com vocabulário em inglês ou espanhol. Alunos contam objetos e aprendem nomes em outro idioma. Perfeito para escolas internacionais no Brasil.

Desenvolva atividades vogais e alfabeto em múltiplos idiomas simultaneamente.`,
        quote: 'O suporte multilíngue é essencial para meu programa bilíngue.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Professores de Educação Especial',
        subtitle: 'Coordenação Motora e Atividades Adaptadas',
        description: `Educadores de inclusão adaptam encontre e conte para necessidades especiais. Desenvolvimento de coordenação motora em ritmo individualizado. Grades menores para alunos com dificuldades visuais.

Crie fichas de encontre e conte com níveis de complexidade variados. Adapte atividades para imprimir para cada aluno individualmente. Desenvolva coordenação motora respeitando limites pessoais.

Ensine tabuada através de grupos visuais concretos. Atividades de matemática com suporte visual constante.`,
        quote: 'Posso adaptar rapidamente as atividades para cada aluno.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Professores Empreendedores',
        subtitle: 'Venda Atividades para Imprimir Online',
        description: `Educadores empreendedores criam produtos digitais para venda. Fichas de encontre e conte são populares em plataformas educacionais. Atividades de matemática têm alta demanda no mercado brasileiro.

Crie pacotes de encontre e conte para venda em plataformas brasileiras. Desenvolva atividades para imprimir temáticas para cada estação. Exporte em 300 DPI para qualidade comercial profissional.

Combine encontre e conte com desenhos para colorir em pacotes completos. Venda internacionalmente no Teachers Pay Teachers e Etsy.`,
        quote: 'Minha assinatura se pagou no primeiro mês de vendas!',
      },
    ],
  },

  // FAQ Section - Selected FAQs from find-and-count.md
  faq: {
    sectionTitle: 'Perguntas Frequentes',
    sectionDescription: 'Reunimos as dúvidas mais comuns sobre o gerador de encontre e conte. Se sua pergunta não estiver aqui, entre em contato.',
    showMoreText: 'Mostrar mais perguntas',
    showLessText: 'Mostrar menos',
    badgeText: 'FAQ',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    secureCheckout: 'Pagamento seguro',
    cancelAnytime: 'Cancele quando quiser',
    items: [
      {
        id: '1',
        question: 'Quanto custa o gerador de encontre e conte?',
        answer: 'O acesso ao gerador de encontre e conte está incluído no Pacote Essencial. A assinatura custa R$720 por ano ou R$72 por mês. Você recebe acesso a 10 geradores populares de atividades de matemática e muito mais. Não há taxas por ficha gerada ou limite de downloads mensais. Crie atividades ilimitadas durante toda sua assinatura ativa.',
      },
      {
        id: '2',
        question: 'Posso usar encontre e conte para atividades comerciais?',
        answer: 'Sim, sua assinatura inclui licença comercial completa e irrestrita. Venda fichas de encontre e conte e atividades com tabuada no Hotmart, Eduzz, Etsy ou Teachers Pay Teachers. Publique livros de atividades para imprimir no Amazon KDP sem taxas extras. A licença comercial permite uso em qualquer plataforma brasileira ou internacional.',
      },
      {
        id: '3',
        question: 'Quais formatos de download estão disponíveis?',
        answer: 'Exporte suas fichas de encontre e conte em JPEG ou PDF de alta qualidade. Ambos os formatos têm resolução 300 DPI profissional para impressão nítida. Opção de escala de cinza disponível para economizar tinta em atividades educação infantil. Baixe tanto a ficha de atividade quanto o gabarito com respostas separadamente.',
      },
      {
        id: '4',
        question: 'Quantas fichas de encontre e conte posso criar?',
        answer: 'Não há limite de fichas durante sua assinatura ativa. Crie quantas atividades de encontre e conte para coordenação motora precisar. Gere fichas diferentes todos os dias para sua turma inteira. Downloads ilimitados em JPEG e PDF sem restrições. Use o gerador quantas vezes quiser durante o ano letivo completo.',
      },
      {
        id: '5',
        question: 'Preciso de habilidades de design para criar fichas?',
        answer: 'Não, o gerador foi desenvolvido para professores sem experiência em design gráfico. Selecione imagens, configure a grade e clique em gerar para fichas prontas. Adicione elementos de texto com ferramentas simples e intuitivas. Interface em português brasileiro fácil de entender e usar. Qualquer professor consegue criar atividades profissionais em minutos.',
      },
      {
        id: '6',
        question: 'Quais idiomas são suportados?',
        answer: 'O gerador suporta 11 idiomas completos com interface e biblioteca traduzidas. Disponível em português brasileiro, inglês, alemão, francês, espanhol, italiano, holandês, sueco, dinamarquês, norueguês e finlandês. Crie atividades de alfabetização e atividades vogais e alfabeto em qualquer idioma. Perfeito para escolas bilíngues e programas de imersão linguística no Brasil.',
      },
      {
        id: '7',
        question: 'Posso combinar encontre e conte com outras atividades?',
        answer: 'Sim, o gerador oferece ferramentas de texto e edição completas. Adicione elementos de desenhos para colorir extras às suas fichas de contagem. Inclua campos para letra cursiva e pontilhado na mesma página de atividade. Personalize cada ficha de encontre e conte conforme sua necessidade pedagógica. Combine múltiplas habilidades em uma única atividade integrada.',
      },
      {
        id: '8',
        question: 'Posso usar as fichas na sala de aula?',
        answer: 'Sua assinatura Pacote Essencial inclui uso ilimitado em sala de aula. Imprima quantas cópias precisar para seus alunos. Distribua atividades de encontre e conte diariamente sem restrições. Use em qualquer contexto educacional institucional. Escolas públicas e privadas permitidas.',
      },
      {
        id: '9',
        question: 'Posso fazer upload de imagens próprias?',
        answer: 'O sistema aceita upload de imagens personalizadas. Carregue JPEG, PNG ou GIF do seu computador. Faça upload de múltiplos arquivos simultaneamente. Combine imagens próprias com a biblioteca do sistema. Use fotos de alunos para atividades personalizadas. Adicione imagens temáticas de projetos escolares.',
      },
      {
        id: '10',
        question: 'Quanto tempo leva para criar uma ficha?',
        answer: 'O processo completo leva menos de 3 minutos. Selecione imagens em 30 segundos. Configure a grade em mais 30 segundos. Gere e baixe em 2 minutos. Fichas de encontre e conte profissionais prontas rapidamente. Comparado a 30-60 minutos de criação manual, a economia é enorme.',
      },
      {
        id: '11',
        question: 'As fichas incluem gabarito?',
        answer: 'Cada ficha gerada pode ter gabarito correspondente. Clique em "Gerar Gabarito" após criar a atividade. O sistema destaca todos os objetos escondidos automaticamente com círculos coloridos. A quantidade correta é exibida ao lado de cada imagem. Baixe gabarito separadamente ou junto com a atividade.',
      },
      {
        id: '12',
        question: 'Posso cancelar minha assinatura a qualquer momento?',
        answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas. Continue usando o gerador até o fim do período já pago integralmente. Suas fichas de encontre e conte baixadas permanecem suas para sempre. Crie atividades enquanto sua assinatura estiver ativa. Reative quando quiser sem perder configurações ou preferências salvas.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Pacote Essencial',
    price: 'R$720',
    priceInterval: '/ano',
    priceSuffix: 'Cobrado anualmente',
    benefits: [
      'Criação ilimitada de atividades',
      'Licença comercial incluída',
      '11 idiomas suportados',
      '3000+ imagens temáticas',
      'Qualidade de impressão 300 DPI',
      'Gabaritos incluídos',
    ],
    ctaText: 'Comece Agora',
    guaranteeText: 'Garantia de reembolso de 30 dias',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine com Outros Geradores de Atividades',
    sectionDescription: 'Crie pacotes de aprendizagem completos combinando encontre e conte com estes geradores complementares.',
    ctaTitle: 'Pronto para Criar Atividades Incríveis?',
    ctaDescription: 'Junte-se a milhares de educadores que criam atividades profissionais. Geração ilimitada, licença comercial incluída.',
    primaryCtaText: 'Iniciar Teste Gratuito',
    secondaryCtaText: 'Ver Todos os 33 Geradores',
    badgeText: 'Funciona Perfeitamente Com',
    exploreText: 'Explorar todas as aplicações',
    trustBadges: {
      guarantee: 'Garantia de reembolso 30 dias',
      securePayment: 'Pagamento seguro',
      cancelAnytime: 'Cancele quando quiser',
    },
    items: [
      {
        id: '1',
        slug: 'matching-app',
        name: 'Associação',
        category: 'Visual',
        icon: '🔗',
        description: 'Combine encontre e conte com atividades de associação para desenvolver observação visual e raciocínio lógico.',
      },
      {
        id: '2',
        slug: 'coloring',
        name: 'Desenhos para Colorir',
        category: 'Criativo',
        icon: '🎨',
        description: 'Adicione desenhos para colorir às suas fichas de contagem para atividades mais completas e envolventes.',
      },
      {
        id: '3',
        slug: 'addition',
        name: 'Adição',
        category: 'Matemática',
        icon: '➕',
        description: 'Expanda a contagem para operações de adição visual com imagens dos mesmos temas.',
      },
      {
        id: '4',
        slug: 'drawing-lines',
        name: 'Grafomotricidade',
        category: 'Coordenação',
        icon: '✍️',
        description: 'Desenvolva coordenação motora combinando encontre e conte com exercícios de traçado de linhas.',
      },
    ],
  },
};

export default findAndCountPtContent;
