import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Caça ao Tesouro (Treasure Hunt) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/caca-ao-tesouro-fichas.ts
 * URL: /pt/apps/caca-ao-tesouro-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const treasureHuntPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'caca-ao-tesouro-fichas',
    appId: 'treasure-hunt',
    title: 'Gerador de Caça ao Tesouro - Atividades para Imprimir de Alfabetização e Orientação Espacial',
    description: 'Crie atividades de caça ao tesouro personalizadas com o gerador de fichas do LessonCraft Studio. Com sua assinatura Acesso Completo, você produz atividades para imprimir ilimitadas para educação infantil e ensino fundamental. Gere atividades de alfabetização em português brasileiro em menos de 3 minutos.',
    keywords: 'caça ao tesouro, atividades para imprimir, atividades educação infantil, atividades de alfabetização, atividades de matemática, coordenação motora, desenhos para colorir, atividades 1º ano, atividades 2º ano, atividades vogais, tabuada, letra cursiva, pontilhado, orientação espacial',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/caca-ao-tesouro-fichas',
  },

  // Hero Section - FULL text from treasure-hunt.md paragraphs 1-3
  hero: {
    title: 'Caça ao Tesouro Atividades',
    subtitle: 'Atividades para Imprimir de Alfabetização e Orientação Espacial',
    description: `Crie atividades de caça ao tesouro personalizadas com o gerador de fichas do LessonCraft Studio. Com sua assinatura Acesso Completo, você produz atividades para imprimir ilimitadas para educação infantil e ensino fundamental. Gere atividades de alfabetização em português brasileiro em menos de 3 minutos. Baixe PDFs profissionais em 300 DPI prontos para impressão.

O gerador de caça ao tesouro transforma o aprendizado de orientação espacial em brincadeira. Crianças seguem pistas direcionais para encontrar o tesouro escondido na grade. Perfeito para desenvolver coordenação motora, compreensão de leitura e vocabulário direcional. Suas atividades educação infantil ficam prontas para a sala de aula instantaneamente.

Esta ferramenta cria fichas que ensinam conceitos importantes. Alunos praticam seguir instruções passo a passo. Desenvolvem habilidades de raciocínio espacial essenciais para matemática. O vocabulário direcional prepara crianças para leitura de mapas. Atividades 1º ano e 2º ano ficam mais divertidas com esse formato de jogo educativo.`,
    previewImageSrc: '/samples/english/treasure hunt/up down.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/treasure hunt/
  samples: {
    sectionTitle: 'Exemplos de Atividades de Caça ao Tesouro',
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
        worksheetSrc: '/samples/english/treasure hunt/up down.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/up down answer_key.jpeg',
        altText: 'Atividade de caça ao tesouro com direções cima e baixo para educação infantil',
        pdfDownloadUrl: '/samples/english/treasure hunt/up down.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/treasure hunt/north south.jpeg',
        answerKeySrc: '/samples/english/treasure hunt/north south answer_key.jpeg',
        altText: 'Atividade de caça ao tesouro com pontos cardeais norte e sul para ensino fundamental',
        pdfDownloadUrl: '/samples/english/treasure hunt/north south.pdf',
      },
    ],
  },

  // Features Grid - FULL text from treasure-hunt.md feature sections
  features: {
    sectionTitle: 'Recursos do Gerador de Caça ao Tesouro',
    sectionDescription: 'O gerador de caça ao tesouro oferece recursos completos para criar atividades educação infantil e ensino fundamental. Cada funcionalidade foi desenvolvida pensando em professores brasileiros. Você cria atividades de alfabetização personalizadas sem conhecimento técnico. Todas as ferramentas funcionam de forma intuitiva e rápida.',
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
        description: `Produzir atividades para imprimir nunca foi tão simples. Selecione um tema da biblioteca de imagens. Clique em gerar e sua ficha aparece instantaneamente. O sistema cria automaticamente uma grade 5x5 com pistas direcionais. Baixe em PDF ou JPEG com qualidade profissional.

O processo leva menos de 3 minutos do início ao fim. Escolha entre direções básicas para educação infantil. Ou selecione pontos cardeais para atividades 1º ano e 2º ano. A ferramenta adapta o vocabulário para cada faixa etária automaticamente.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '📖',
        title: 'Atividades de Alfabetização com Vocabulário Direcional',
        description: `Suas atividades de alfabetização ganham uma dimensão extra. Crianças leem as pistas e seguem as instruções. Praticam compreensão de texto de forma lúdica. O formato de jogo mantém a atenção dos alunos por mais tempo.

Cada ficha trabalha vocabulário essencial. Palavras como cima, baixo, esquerda e direita. Ou norte, sul, leste e oeste para alunos mais avançados. As atividades vogais e alfabeto combinam perfeitamente com caça ao tesouro temática.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🧒',
        title: 'Atividades Educação Infantil com Orientação Espacial',
        description: `Para atividades educação infantil, o formato é ideal. Crianças pequenas adoram procurar tesouros. O conceito de seguir pistas desenvolve raciocínio lógico. Habilidades de orientação espacial são fundamentais para matemática futura.

Use temas coloridos e imagens atrativas. A biblioteca oferece milhares de desenhos para colorir e ilustrações. Combine sua caça ao tesouro com atividades de coordenação motora. Crie pacotes completos de aprendizagem para pré-escola.`,
        highlighted: true,
      },
      {
        id: '4',
        icon: '✏️',
        title: 'Coordenação Motora e Raciocínio Espacial',
        description: `O gerador cria fichas que desenvolvem coordenação motora fina. Alunos usam lápis para traçar o caminho até o tesouro. Praticam movimentos precisos enquanto seguem direções. A atividade prepara mãos para letra cursiva e pontilhado.

Combine caça ao tesouro com exercícios de tracejado. Crie sequências de atividades progressivas. Comece com direções simples para pré-escola. Avance para instruções complexas em atividades 2º ano.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '🎨',
        title: 'Biblioteca com 3000+ Desenhos para Colorir',
        description: `Acesse mais de 3000 desenhos para colorir e ilustrações. Todas as imagens são adequadas para crianças. Organize por temas como animais, frutas, transportes e profissões. Cada tema oferece dezenas de opções visuais.

As imagens aparecem na grade da caça ao tesouro. Crianças identificam figuras enquanto seguem pistas. Vocabulário visual reforça aprendizado de palavras. Combine com atividades de alfabetização para máximo impacto educacional.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '🧭',
        title: 'Atividades 1º Ano e 2º Ano com Pontos Cardeais',
        description: `Para atividades 1º ano, use direções básicas como introdução. Siga para pontos cardeais em atividades 2º ano. O currículo brasileiro introduz norte, sul, leste e oeste nessa fase. Suas fichas acompanham a progressão escolar naturalmente.

O gerador oferece dois modos de direção. Básico usa cima, baixo, esquerda, direita. Cardinal usa norte, sul, leste, oeste. Selecione o modo apropriado para sua turma. A transição entre modos é suave para os alunos.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🔢',
        title: 'Atividades de Matemática com Raciocínio Lógico',
        description: `Caça ao tesouro desenvolve habilidades de atividades de matemática. Alunos contam casas na grade. Seguem sequências de movimentos. Praticam orientação em plano cartesiano simplificado. Conceitos de geometria são introduzidos naturalmente.

Combine com exercícios de tabuada para reforço matemático. Use temas numéricos na biblioteca de imagens. Crie fichas que integram contagem com orientação espacial. O aprendizado multidisciplinar é mais efetivo.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🖨️',
        title: 'Qualidade 300 DPI para Impressão Profissional',
        description: `Todos os downloads saem em 300 DPI de resolução. Qualidade profissional para impressão em qualquer equipamento. Escolha entre PDF ou JPEG conforme sua necessidade. Opção escala de cinza economiza tinta da impressora.

Suas atividades para imprimir ficam nítidas e claras. Linhas da grade aparecem definidas no papel. Imagens mantêm qualidade mesmo em papel comum. Resultado profissional sem custo adicional por ficha.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from treasure-hunt.md step sections
  howTo: {
    sectionTitle: 'Como Criar Atividades de Caça ao Tesouro em 5 Passos',
    sectionDescription: 'Criar atividades educação infantil e ensino fundamental leva menos de 3 minutos. O processo é intuitivo e não exige conhecimento técnico. Siga estes 5 passos para gerar suas atividades de alfabetização personalizadas.',
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
        title: 'Escolha Imagens para Atividades Educação Infantil',
        description: `Comece selecionando as imagens para sua atividade educação infantil. O gerador oferece duas opções de seleção. Escolha um tema completo da biblioteca com milhares de desenhos para colorir. Ou selecione manualmente 6 imagens específicas para sua aula.

A opção por tema é mais rápida. Clique no menu suspenso e escolha entre animais, frutas, números ou transportes. O sistema seleciona automaticamente 6 imagens adequadas. Perfeito para criar atividades para imprimir rapidamente.

A seleção manual oferece mais controle. Navegue pela biblioteca de imagens por categoria. Clique em cada figura desejada. O contador mostra quantas já foram selecionadas. Você precisa de exatamente 6 imagens para gerar a ficha.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configure Direções para Atividades 1º Ano e 2º Ano',
        description: `Selecione o tipo de vocabulário direcional para sua turma. Atividades 1º ano funcionam melhor com direções básicas. Use cima, baixo, esquerda e direita para alunos iniciantes. Essa opção é ideal para educação infantil e pré-escola também.

Para atividades 2º ano, considere pontos cardeais. Norte, sul, leste e oeste aparecem no currículo nessa fase. O gerador traduz automaticamente para português brasileiro. Suas fichas acompanham a progressão escolar naturalmente.

Combine caça ao tesouro com atividades de matemática sobre orientação. Alunos praticam conceitos de geometria básica. Desenvolvem noção de plano cartesiano simplificado.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Personalize Layout e Desenhos para Colorir',
        description: `Configure o tamanho da página conforme sua necessidade. Escolha entre A4 retrato, A4 paisagem ou carta americana. O formato paisagem posiciona pistas à esquerda e grade à direita. O formato retrato empilha pistas sobre a grade.

Adicione bordas decorativas para deixar atividades para imprimir mais atrativas. A biblioteca oferece dezenas de opções temáticas. Ajuste a opacidade para equilibrar decoração e conteúdo. Bordas funcionam especialmente bem em desenhos para colorir.

Personalize a cor de fundo da página. O padrão é branco para economia de tinta. Cores suaves podem destacar a atividade. Use tons pastéis para atividades educação infantil mais alegres.`,
        icon: '🎨',
      },
      {
        id: '4',
        number: 4,
        title: 'Gere Atividades de Alfabetização com Coordenação Motora',
        description: `Clique no botão Criar para gerar sua atividade de alfabetização instantaneamente. O sistema monta a grade 5x5 com as imagens selecionadas. Pistas direcionais aparecem em português brasileiro natural. A posição do tesouro é determinada aleatoriamente.

A grade desenvolve coordenação motora enquanto alunos traçam caminhos. Movimentos precisos com lápis preparam para letra cursiva e pontilhado. O formato de jogo mantém crianças engajadas na atividade. Aprendizado acontece de forma natural e divertida.

Gere múltiplas versões com diferentes posições de tesouro. Cada clique produz uma nova configuração única. Crie conjuntos variados para evitar cópias entre alunos.`,
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe Atividades para Imprimir e Gabarito',
        description: `Clique em Download para salvar suas atividades para imprimir em alta resolução. Escolha entre formato PDF ou JPEG conforme necessidade. A qualidade 300 DPI garante impressão profissional. Linhas e imagens ficam nítidas em qualquer impressora.

Gere o gabarito com a localização do tesouro marcada. Clique em Criar Gabarito após gerar a ficha principal. Um círculo vermelho indica a posição correta. Baixe separadamente para facilitar conferência.

A opção escala de cinza economiza tinta colorida. Ative antes do download para versão monocromática. Qualidade se mantém mesmo sem cores. Ideal para impressão em massa de atividades educação infantil.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from treasure-hunt.md use case sections
  useCases: {
    sectionTitle: 'Quem Usa o Gerador de Caça ao Tesouro',
    sectionDescription: 'O gerador de caça ao tesouro atende diversos perfis de educadores. Cada profissional encontra aplicações específicas para suas necessidades. Descubra como diferentes usuários aproveitam a ferramenta para criar atividades educação infantil e ensino fundamental personalizadas.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades Educação Infantil com Coordenação Motora',
        description: `Educadores de pré-escola usam caça ao tesouro para atividades educação infantil diárias. O formato de jogo mantém crianças pequenas engajadas. Coordenação motora desenvolve naturalmente enquanto traçam caminhos. Mãozinhas praticam movimentos que preparam para escrita futura.

Combine com exercícios de letra cursiva e pontilhado para sequência completa. Trace linhas pontilhadas antes de seguir direções na grade. A progressão fortalece controle do lápis gradualmente. Atividades para imprimir ficam prontas para rotina diária.

Use temas coloridos que atraem atenção de crianças pequenas. Animais, frutas e brinquedos funcionam especialmente bem. Os desenhos para colorir na grade encantam os pequenos. Cada aula se torna aventura de descoberta.`,
        quote: 'Meus alunos adoram procurar o tesouro enquanto aprendem!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Alfabetizadores',
        subtitle: 'Atividades de Alfabetização e Atividades Vogais e Alfabeto',
        description: `Professores alfabetizadores integram caça ao tesouro com atividades de alfabetização sistemáticas. Crianças leem pistas e seguem instruções escritas. Praticam decodificação de texto em contexto significativo. O vocabulário direcional amplia repertório de palavras.

Crie fichas temáticas para atividades vogais e alfabeto específicas. Selecione imagens iniciadas pela mesma letra trabalhada. Abelha, árvore, avião para letra A. Bola, banana, borboleta para letra B. Cada ficha reforça consciência fonológica.

Combine com atividades de letra cursiva e pontilhado do mesmo tema. Trace a letra focal antes de jogar caça ao tesouro. A integração maximiza tempo de aprendizado. Suas atividades para imprimir formam pacotes completos de alfabetização.`,
        quote: 'A leitura das pistas reforça a alfabetização naturalmente.',
      },
      {
        id: '3',
        icon: '🎓',
        title: 'Professores de 1º e 2º Ano',
        subtitle: 'Atividades 1º Ano e 2º Ano com Tabuada',
        description: `Docentes do ensino fundamental usam caça ao tesouro para atividades 1º ano diferenciadas. Direções básicas introduzem vocabulário espacial necessário. Alunos desenvolvem habilidades de seguir instruções múltiplas. A base para leitura de mapas começa aqui.

Para atividades 2º ano, ative pontos cardeais no gerador. Norte, sul, leste e oeste acompanham currículo de geografia. Combine orientação espacial com atividades de matemática integradas. Alunos contam casas praticando numeração.

Integre exercícios de tabuada usando imagens numéricas na grade. Selecione figuras de números para reforço matemático. Crianças identificam resultados enquanto seguem pistas. A tabuada fica mais divertida no formato de jogo.`,
        quote: 'A progressão de dificuldade acompanha o currículo escolar.',
      },
      {
        id: '4',
        icon: '🔢',
        title: 'Professores de Matemática',
        subtitle: 'Atividades de Matemática com Raciocínio Espacial',
        description: `Educadores de matemática descobrem valor pedagógico na caça ao tesouro. Atividades de matemática ganham dimensão espacial importante. Alunos praticam contagem ao contar casas de movimento. Conceitos de plano cartesiano são introduzidos naturalmente.

Use a grade 5x5 para explorar coordenadas simplificadas. Posições podem ser descritas como linha e coluna. Prepare alunos para geometria analítica futura. Atividades para imprimir desenvolvem raciocínio lógico essencial.

Combine com exercícios de tabuada para prática de multiplicação. Crie problemas envolvendo cálculo de movimentos totais. Quantas casas ao todo se mover 3 norte e 2 leste? A matemática fica contextualizada e significativa.`,
        quote: 'A grade desenvolve noções de coordenadas naturalmente.',
      },
      {
        id: '5',
        icon: '🏠',
        title: 'Pais Homeschoolers',
        subtitle: 'Atividades para Imprimir em Casa com Desenhos para Colorir',
        description: `Famílias que educam em casa encontram recurso valioso no gerador. Atividades para imprimir chegam prontas para uso doméstico. Sem necessidade de preparo elaborado ou materiais especiais. Basta imprimir e a aula está pronta.

Combine caça ao tesouro com desenhos para colorir para sessões estendidas. Após encontrar o tesouro, crianças colorem as imagens da grade. Atividade única rende tempo prolongado de aprendizado. Economia de esforço para pais educadores.

Personalize temas conforme interesses do seu filho. Upload de fotos familiares torna fichas especiais. Atividades educação infantil ganham toque pessoal e afetivo. O aprendizado em casa fica mais significativo.`,
        quote: 'Uma ferramenta completa para educação domiciliar.',
      },
      {
        id: '6',
        icon: '💜',
        title: 'Terapeutas e Psicopedagogos',
        subtitle: 'Coordenação Motora e Letra Cursiva em Intervenções',
        description: `Profissionais de intervenção usam caça ao tesouro para desenvolver coordenação motora fina. O traçado de caminhos exercita controle grafomotor. Crianças com dificuldades praticam em contexto motivador. O formato de jogo reduz resistência a exercícios repetitivos.

Combine com atividades de letra cursiva e pontilhado específicas. Trace linhas pontilhadas seguindo direções da ficha. A integração multiplica benefícios terapêuticos. Sessões ficam mais produtivas e agradáveis.

Personalize dificuldade conforme necessidade individual. Comece com instruções curtas de 2-3 movimentos. Aumente gradualmente para 6 movimentos completos. Atividades para imprimir adaptam-se a cada caso clínico.`,
        quote: 'O formato lúdico facilita intervenções terapêuticas.',
      },
    ],
  },

  // FAQ Section - Selected FAQs from treasure-hunt.md
  faq: {
    sectionTitle: 'Perguntas Frequentes',
    sectionDescription: 'Encontre respostas para as dúvidas mais comuns sobre o gerador de caça ao tesouro. Cada pergunta aborda aspectos práticos de uso da ferramenta para criar atividades educação infantil e ensino fundamental de qualidade profissional.',
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
        question: 'Como criar atividades para imprimir de caça ao tesouro com atividades de alfabetização?',
        answer: 'Selecione imagens relacionadas ao tema de alfabetização que está trabalhando. O gerador cria automaticamente pistas em português brasileiro. Crianças leem instruções como "Comece na maçã" e "Mova 2 casas para cima". A leitura contextualizada fortalece atividades de alfabetização naturalmente. Baixe em PDF 300 DPI pronto para impressão.',
      },
      {
        id: '2',
        question: 'Posso usar o gerador para atividades educação infantil com coordenação motora?',
        answer: 'Sim, o formato é perfeito para atividades educação infantil focadas em desenvolvimento motor. Crianças traçam caminhos na grade praticando coordenação motora fina. O movimento do lápis segue direções precisas. A atividade prepara mãos para escrita futura. Use direções básicas como cima, baixo, esquerda, direita para pré-escola.',
      },
      {
        id: '3',
        question: 'O gerador inclui atividades de matemática com tabuada integrada?',
        answer: 'O gerador de caça ao tesouro desenvolve raciocínio matemático através de contagem espacial. Combine com atividades de matemática pedindo que alunos calculem movimentos totais. Integre tabuada perguntando "quantas casas se mover 3 vezes 2 norte?". A tabuada ganha contexto prático no formato de jogo. Use imagens numéricas na grade para reforço adicional.',
      },
      {
        id: '4',
        question: 'Como combinar caça ao tesouro com desenhos para colorir e atividades vogais?',
        answer: 'Após completar a caça ao tesouro, crianças podem colorir as imagens da grade. Selecione desenhos para colorir relacionados à letra trabalhada. Para atividades vogais e alfabeto, escolha imagens iniciadas pela vogal focal. Abelha, árvore, avião para letra A. O ciclo completo maximiza tempo de aprendizado com múltiplas habilidades.',
      },
      {
        id: '5',
        question: 'O gerador funciona para atividades 1º ano e 2º ano com pontos cardeais?',
        answer: 'Sim, o gerador oferece dois modos de direção. Para atividades 1º ano, use direções básicas como introdução espacial. Para atividades 2º ano, ative pontos cardeais norte, sul, leste, oeste. O currículo brasileiro introduz pontos cardeais nessa fase. A transição entre modos acompanha progressão escolar naturalmente.',
      },
      {
        id: '6',
        question: 'Posso integrar letra cursiva e pontilhado com caça ao tesouro?',
        answer: 'Combine caça ao tesouro com exercícios preparatórios de letra cursiva e pontilhado. Trace linhas pontilhadas na direção do próximo movimento antes de seguir. A sequência desenvolve controle grafomotor progressivamente. Crie pacotes com pontilhado, caça ao tesouro e colorir. A integração multiplica benefícios de coordenação motora.',
      },
      {
        id: '7',
        question: 'Quantas atividades para imprimir posso criar com a assinatura Acesso Completo?',
        answer: 'Atividades para imprimir são ilimitadas com a assinatura Acesso Completo. Crie quantas fichas precisar sem custo adicional por download. Cada arquivo sai em qualidade profissional 300 DPI. Gere versões diferentes do mesmo tema para evitar cópias. A biblioteca de 3000+ imagens oferece variedade infinita.',
      },
      {
        id: '8',
        question: 'O gerador é adequado para atividades de alfabetização e atividades educação infantil bilíngues?',
        answer: 'Sim, o gerador suporta 11 idiomas incluindo português brasileiro. Crie atividades de alfabetização em qualquer língua disponível. Atividades educação infantil podem alternar entre idiomas para escolas bilíngues. A biblioteca de imagens traz nomes em cada língua. Interface e conteúdo são totalmente traduzidos.',
      },
      {
        id: '9',
        question: 'Como usar caça ao tesouro para reforço de tabuada e atividades de matemática?',
        answer: 'Crie fichas com temas numéricos selecionando imagens de números. Peça que alunos calculem total de movimentos usando tabuada. "3 casas norte + 2 casas leste = quantas casas ao todo?" Atividades de matemática ficam contextualizadas e significativas. O formato lúdico motiva prática de cálculo mental.',
      },
      {
        id: '10',
        question: 'Posso criar atividades vogais e alfabeto com desenhos para colorir personalizados?',
        answer: 'Sim, faça upload de suas próprias imagens para atividades vogais e alfabeto customizadas. Use fotos de objetos da sala de aula ou comunidade local. Combine com desenhos para colorir da biblioteca padrão. Crie fichas temáticas para datas comemorativas ou projetos especiais. Cada imagem enviada fica disponível para seleção na grade.',
      },
      {
        id: '11',
        question: 'As atividades de caça ao tesouro incluem gabarito?',
        answer: 'Cada atividade gerada pode ter gabarito correspondente. Clique em "Gerar Gabarito" após criar a atividade. O sistema marca a posição correta do tesouro com círculo vermelho. Baixe gabarito separadamente ou junto com a atividade. Facilita correção rápida em sala de aula.',
      },
      {
        id: '12',
        question: 'As atividades de caça ao tesouro desenvolvem quais habilidades?',
        answer: 'As atividades desenvolvem múltiplas habilidades simultaneamente. Coordenação motora ao traçar caminhos. Compreensão de leitura ao seguir pistas escritas. Orientação espacial ao navegar na grade. Vocabulário direcional e raciocínio lógico. Ideal para desenvolvimento integral na educação infantil e ensino fundamental.',
      },
    ],
  },

  // Pricing
  pricing: {
    title: 'Acesso Completo',
    price: 'R$1200',
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
    sectionTitle: 'Combine com Outros Geradores de Atividades',
    sectionDescription: 'Crie pacotes de aprendizagem completos combinando atividades de caça ao tesouro com estes geradores complementares.',
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
    items: [
      {
        id: '1',
        slug: 'picture-path',
        name: 'Labirinto de Caminhos',
        category: 'Visual',
        icon: '🛤️',
        description: 'Combine caça ao tesouro com labirintos de caminhos para desenvolver orientação espacial e raciocínio lógico de forma complementar.',
      },
      {
        id: '2',
        slug: 'drawing-lines',
        name: 'Traçar Linhas',
        category: 'Coordenação',
        icon: '✏️',
        description: 'Reforce coordenação motora com exercícios de traçar linhas antes ou depois das atividades de caça ao tesouro.',
      },
      {
        id: '3',
        slug: 'pattern-train',
        name: 'Trem de Padrões',
        category: 'Lógica',
        icon: '🚂',
        description: 'Desenvolva raciocínio sequencial combinando caça ao tesouro com atividades de padrões e sequências.',
      },
      {
        id: '4',
        slug: 'matching',
        name: 'Ligar Imagens',
        category: 'Visual',
        icon: '🔗',
        description: 'Pratique associação visual com exercícios de ligar imagens usando os mesmos temas da caça ao tesouro.',
      },
    ],
  },
};

export default treasureHuntPtContent;
