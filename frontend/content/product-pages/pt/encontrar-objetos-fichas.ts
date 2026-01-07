import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Encontrar Objetos (Find Objects) - Brazilian Portuguese Content
 *
 * File: frontend/content/product-pages/pt/encontrar-objetos-fichas.ts
 * URL: /pt/apps/encontrar-objetos-fichas
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/Portuguese/find-objects.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Full Access ($240/year) - NOT Core Bundle
 */

export const findObjectsPtContent: ProductPageContent = {
  // SEO Metadata
  seo: {
    slug: 'encontrar-objetos-fichas',
    appId: 'find-objects',
    title: 'Atividades para Imprimir de Encontrar Objetos - Atividades Educação Infantil e Atividades de Alfabetização',
    description: 'Crie atividades para imprimir profissionais de encontrar objetos com nosso gerador de fichas educativas. Sua assinatura Acesso Completo permite criar atividades educação infantil ilimitadas sem taxas adicionais. Produza atividades de alfabetização personalizadas que desenvolvem atenção visual e concentração.',
    keywords: 'encontrar objetos, atividades para imprimir, atividades educação infantil, atividades de alfabetização, atividades de matemática, coordenação motora, desenhos para colorir, atividades 1º ano, atividades 2º ano, atividades vogais, tabuada, letra cursiva, pontilhado',
    canonicalUrl: 'https://www.lessoncraftstudio.com/pt/apps/encontrar-objetos-fichas',
  },

  // Hero Section
  hero: {
    title: 'Atividades para Imprimir de Encontrar Objetos',
    subtitle: 'Atividades Educação Infantil e Atividades de Alfabetização',
    description: `Crie atividades para imprimir profissionais de encontrar objetos com nosso gerador de fichas educativas. Sua assinatura Acesso Completo permite criar atividades educação infantil ilimitadas sem taxas adicionais. Produza atividades de alfabetização personalizadas que desenvolvem atenção visual e concentração. Baixe fichas em PDF de alta qualidade em menos de 3 minutos.

O gerador de atividades para imprimir de encontrar objetos oferece dois modos de atividade distintos. O modo "Eu Espio" desafia as crianças a encontrar objetos escondidos entre distratores visuais. O modo "Qual é o Diferente" pede que identifiquem imagens sem par. Ambos os modos desenvolvem habilidades cognitivas essenciais para atividades educação infantil e atividades 1º ano.`,
    previewImageSrc: '/samples/english/find objects/find objects portrait.jpeg',
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

  // Sample Gallery
  samples: {
    sectionTitle: 'Exemplos de Atividades de Encontrar Objetos',
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
        worksheetSrc: '/samples/english/find objects/find objects portrait.jpeg',
        answerKeySrc: '/samples/english/find objects/find objects portrait answer_key.jpeg',
        altText: 'Atividade de encontrar objetos formato retrato para educação infantil',
        pdfDownloadUrl: '/samples/english/find objects/find objects portrait.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/find objects/find objects landscape.jpeg',
        answerKeySrc: '/samples/english/find objects/find objects landscape answer_key.jpeg',
        altText: 'Atividade de encontrar objetos formato paisagem para atividades de alfabetização',
        pdfDownloadUrl: '/samples/english/find objects/find objects landscape.pdf',
      },
    ],
  },

  // Features Grid
  features: {
    sectionTitle: 'Recursos do Gerador de Atividades para Imprimir',
    sectionDescription: 'O gerador de atividades de encontrar objetos oferece recursos completos para professores de educação infantil e ensino fundamental. Cada recurso foi desenvolvido pensando na praticidade do dia a dia escolar. Crie atividades para imprimir profissionais sem precisar de habilidades de design. A interface intuitiva permite criar fichas em menos de 3 minutos.',
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
        title: 'Criação Simples de Atividades para Imprimir em 3 Cliques',
        description: `O processo de criação de atividades para imprimir é extremamente simples. Primeiro, selecione o modo de atividade desejado. Segundo, escolha as imagens da biblioteca ou faça upload das suas. Terceiro, clique em criar e sua atividade está pronta. Não precisa de conhecimento técnico ou experiência em design gráfico.

O modo "Eu Espio" permite selecionar de 8 a 12 imagens distratoras. Adicione de 1 a 5 objetos para as crianças encontrarem. O modo "Qual é o Diferente" trabalha com 8 a 12 pares de imagens. Escolha de 1 a 3 imagens ímpares para identificação.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Atividades de Alfabetização com Edição Completa no Canvas',
        description: `Cada elemento das atividades de alfabetização pode ser editado diretamente no canvas. Arraste imagens para reposicioná-las onde preferir. Redimensione objetos para ajustar o tamanho conforme necessário. Gire elementos para criar composições visuais mais interessantes.

A barra de ferramentas oferece controles de camadas completos. Traga objetos para frente ou envie para trás. Alinhe múltiplos elementos horizontalmente ou verticalmente. Centralize objetos na página com um clique. Delete elementos indesejados facilmente.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🎯',
        title: 'Atividades Educação Infantil com Dois Modos de Jogo',
        description: `Professores de educação infantil precisam de variedade nas atividades para imprimir. Nosso gerador oferece o modo clássico de objetos escondidos e o modo de encontrar o diferente. O modo "Eu Espio" usa de 8 a 12 distratores e de 1 a 5 objetos escondidos. As crianças desenvolvem atenção visual enquanto procuram os itens específicos.

O modo "Qual é o Diferente" é excelente para atividades de matemática visual. Configure o número de pares de imagens primeiro. Crianças precisam identificar quais imagens não têm correspondente. Essa atividade desenvolve raciocínio lógico e atenção visual.`,
        highlighted: true,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Atividades de Matemática em 11 Idiomas Diferentes',
        description: `O gerador suporta interface e conteúdo em 11 idiomas. Português brasileiro, inglês, alemão, francês, espanhol e italiano estão incluídos. Holandês, sueco, dinamarquês, norueguês e finlandês também. Perfeito para atividades de matemática em escolas bilíngues.

Os nomes das imagens aparecem no idioma selecionado. Professores de línguas estrangeiras usam para ensinar vocabulário. Escolas internacionais criam materiais multilíngues facilmente. Programas de educação bilíngue encontram recursos valiosos aqui.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '📤',
        title: 'Atividades Educação Infantil com Upload de Imagens Personalizadas',
        description: `Professores de educação infantil podem fazer upload de imagens próprias. O sistema aceita arquivos JPEG, PNG e GIF. Faça upload de múltiplos arquivos de uma só vez. Combine suas imagens com a biblioteca de 3000+ imagens incluídas.

Use fotos dos próprios alunos para personalizar as atividades educação infantil. Adicione imagens de projetos escolares específicos. Inclua mascotes ou personagens da sua escola. As imagens enviadas ficam disponíveis durante toda a sessão de trabalho.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '💰',
        title: 'Coordenação Motora e Licença Comercial POD Incluída',
        description: `Sua assinatura Acesso Completo inclui licença comercial para impressão sob demanda. Venda suas atividades de coordenação motora no Teachers Pay Teachers. Crie produtos para Etsy ou Amazon KDP sem taxas extras. A licença comercial está incluída no valor da assinatura.

Professores empreendedores geram renda extra com seus materiais. Não precisa pagar royalties ou taxas de licenciamento. Cada atividade de coordenação motora que você cria é 100% sua para comercializar. Qualidade profissional de 300 DPI garante excelentes resultados de impressão.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🎨',
        title: 'Desenhos para Colorir com Biblioteca de 3000+ Imagens',
        description: `A biblioteca contém mais de 3000 imagens temáticas para desenhos para colorir e atividades de busca. Todas as imagens são adequadas para crianças e uso educacional. Organize por temas como animais, alimentos, transportes ou natureza. Use a busca por palavras-chave para encontrar imagens específicas.

Cada tema oferece dezenas de opções diferentes. Fundos decorativos infantis estão incluídos. Bordas temáticas complementam suas atividades. Combine elementos de diferentes temas para criar composições únicas.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🖨️',
        title: 'Atividades 1º Ano com Qualidade Profissional 300 DPI',
        description: `Todas as atividades 1º ano são exportadas em qualidade profissional de 300 DPI. Essa resolução garante impressões nítidas e claras. Perfeito para materiais que serão vendidos ou distribuídos. A qualidade é idêntica a produtos comerciais profissionais.

Escolha entre formato JPEG ou PDF para download. A opção de escala de cinza economiza tinta colorida. Exporte a ficha de atividades e o gabarito separadamente. O gabarito mostra exatamente onde estão os objetos escondidos.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide
  howTo: {
    sectionTitle: 'Como Criar Atividades para Imprimir de Encontrar Objetos em 5 Passos',
    sectionDescription: 'Criar atividades para imprimir profissionais nunca foi tão fácil. O processo completo leva menos de 3 minutos do início ao download. Siga este guia passo a passo para criar suas primeiras atividades educação infantil. Não precisa de experiência em design ou conhecimento técnico.',
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
        title: 'Escolha o Modo de Atividade para Atividades de Alfabetização',
        description: `O primeiro passo é selecionar o modo de atividade desejado. O gerador oferece duas opções principais para atividades de alfabetização. O modo "Eu Espio" é ideal para busca de objetos escondidos. O modo "Qual é o Diferente" trabalha com pares e identificação de elementos ímpares.

Para atividades de alfabetização tradicionais, escolha o modo "Eu Espio". Selecione imagens que representem palavras do vocabulário atual. Crianças procuram objetos enquanto reforçam o reconhecimento visual. Cada imagem tem nome no idioma selecionado.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personalize a Página com Coordenação Motora em Mente',
        description: `O segundo passo envolve configurar as opções de página e cena. Escolha o tamanho de página adequado para suas atividades de coordenação motora. Formato Carta retrato é ideal para uso em sala de aula. Formato A4 é padrão em muitos países.

Ative a opção "Usar Decorações Infantis" para fundos coloridos. Selecione um tema de fundo da lista disponível. Ajuste a opacidade do fundo conforme preferência. Fundos mais claros facilitam a visualização dos objetos.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Gere sua Atividade de Atividades Vogais e Alfabeto',
        description: `O terceiro passo é clicar no botão "Criar" para gerar a atividade. O sistema processa suas seleções instantaneamente. Sua atividade de atividades vogais aparece na área de visualização. O canvas mostra exatamente como ficará a impressão.

Para atividades alfabeto, verifique se todos os objetos estão visíveis. Confira se as imagens estão bem distribuídas na página. O modo de visualização permite avaliar a dificuldade. Ajuste se necessário antes de continuar.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Edite no Canvas para Atividades 1º Ano Personalizadas',
        description: `O quarto passo permite edições completas no canvas. Todas as atividades 1º ano podem ser personalizadas após geração. Clique em qualquer elemento para selecioná-lo. Use a barra de ferramentas para opções de edição.

Arraste imagens para reposicioná-las na página. Redimensione objetos arrastando os cantos. Gire elementos usando o controle de rotação. Delete itens indesejados com o botão de lixeira.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe Atividades para Imprimir em PDF ou JPEG',
        description: `O quinto e último passo é baixar sua atividade pronta. Clique no menu de download para ver as opções. Escolha entre formato JPEG ou PDF para atividades para imprimir. Ambos os formatos têm qualidade profissional de 300 DPI.

Baixe a ficha de atividade e o gabarito separadamente. A opção de escala de cinza economiza tinta colorida. Atividades para imprimir em preto e branco são ideais para cópias. Arquivos PDF são perfeitos para impressão profissional.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases
  useCases: {
    sectionTitle: 'Quem Usa Atividades para Imprimir de Encontrar Objetos',
    sectionDescription: 'Professores, pais e educadores de todo o Brasil usam nosso gerador de atividades para imprimir. Cada grupo encontra benefícios específicos para suas necessidades. Das creches às escolas particulares, as atividades educação infantil se adaptam a qualquer contexto.',
    badgeText: 'Para Quem',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👩‍🏫',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades de Alfabetização para Pré-Escola',
        description: `Professores de educação infantil encontram recursos valiosos para pré-escola. As atividades de alfabetização desenvolvem reconhecimento visual de imagens e palavras. Crianças de 4 e 5 anos adoram buscar objetos escondidos. A atividade prende a atenção enquanto ensina vocabulário.

O modo "Eu Espio" é perfeito para atividades de alfabetização na pré-escola. Selecione imagens de objetos do cotidiano infantil. Crianças associam imagens a palavras naturalmente. Use temas como animais, frutas ou brinquedos familiares.`,
        quote: 'Meus alunos adoram procurar os objetos escondidos!',
      },
      {
        id: '2',
        icon: '📚',
        title: 'Professores do Ensino Fundamental',
        subtitle: 'Atividades de Matemática para 1º ao 3º Ano',
        description: `Professores do ensino fundamental usam atividades de matemática integradas. O modo de busca visual reforça conceitos de contagem. Peça que alunos contem quantos objetos de cada tipo encontraram. Atividades de matemática visuais complementam exercícios tradicionais.

Para turmas de 1º ano, configure atividades de matemática com poucos elementos. Para 2º e 3º ano, aumente a complexidade gradualmente. O modo "Qual é o Diferente" trabalha conceitos de pares e correspondência. Raciocínio lógico se desenvolve através da brincadeira.`,
        quote: 'A progressão de dificuldade acompanha o desenvolvimento dos alunos.',
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Pais que Fazem Homeschool',
        subtitle: 'Atividades Vogais e Alfabeto em Casa',
        description: `Famílias que praticam educação domiciliar encontram recursos essenciais. Atividades vogais e alfabeto complementam o currículo caseiro. Pais criam materiais personalizados para cada filho. O gerador economiza tempo precioso de planejamento.

Para atividades alfabeto personalizadas, use fotos da família. Faça upload de imagens de objetos da própria casa. Crianças reconhecem elementos familiares nas atividades vogais. A personalização aumenta o engajamento.`,
        quote: 'Uma ferramenta perfeita para educação domiciliar.',
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Professores de Línguas Estrangeiras',
        subtitle: 'Atividades 2º Ano Bilíngues',
        description: `Professores de inglês e espanhol usam atividades 2º ano para ensinar vocabulário. Os nomes das imagens aparecem no idioma selecionado. Crianças aprendem palavras novas enquanto buscam objetos. Atividades 2º ano bilíngues são altamente eficazes.

Escolas com programas de imersão linguística se beneficiam especialmente. Configure o gerador no idioma alvo da aula. Atividades 2º ano em língua estrangeira reforçam aprendizado. A associação visual-verbal acelera a memorização.`,
        quote: 'O suporte multilíngue é essencial para meu programa bilíngue.',
      },
      {
        id: '5',
        icon: '💜',
        title: 'Professores de Educação Especial',
        subtitle: 'Pontilhado para Necessidades Especiais',
        description: `Professores de educação especial adaptam atividades com pontilhado para diferentes necessidades. Ajuste a quantidade de elementos conforme cada aluno. Use imagens maiores para crianças com dificuldades visuais. Atividades pontilhado simplificadas atendem necessidades específicas.

O modo de edição permite personalização completa. Aumente espaçamento entre elementos quando necessário. Reduza distratores para alunos com TDAH. Atividades de pontilhado adaptadas respeitam ritmos individuais.`,
        quote: 'Posso adaptar rapidamente as atividades para cada aluno.',
      },
      {
        id: '6',
        icon: '💰',
        title: 'Professores Empreendedores',
        subtitle: 'Atividades para Imprimir para Venda Online',
        description: `Professores que vendem materiais digitais encontram oportunidade comercial. Atividades para imprimir criadas no gerador podem ser vendidas. A licença comercial POD está incluída na assinatura Acesso Completo. Plataformas como Teachers Pay Teachers aceitam os materiais.

Crie pacotes temáticos de atividades para imprimir para venda. Combine diferentes modos e temas em coleções. A qualidade 300 DPI atende padrões profissionais. Atividades para imprimir comerciais geram renda extra.`,
        quote: 'Minha assinatura se pagou no primeiro mês de vendas!',
      },
    ],
  },

  // FAQ Section
  faq: {
    sectionTitle: 'Perguntas Frequentes sobre Atividades de Encontrar Objetos',
    sectionDescription: 'Reunimos as dúvidas mais comuns sobre o gerador de atividades para imprimir. Cada resposta ajuda você a entender melhor a ferramenta. Descubra como criar atividades educação infantil profissionais.',
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
        question: 'O Gerador de Atividades de Alfabetização é Gratuito?',
        answer: 'O gerador de atividades de alfabetização requer assinatura Acesso Completo. O custo é de R$1.200 por ano ou R$125 por mês. Sua assinatura permite criar atividades de alfabetização ilimitadas sem taxas adicionais. Não há cobrança por atividade gerada ou baixada. O Acesso Completo inclui todos os 33 geradores de atividades disponíveis. A assinatura Pacote Essencial custa R$720 por ano e inclui 10 aplicativos populares. O gerador de encontrar objetos está disponível apenas no Acesso Completo. Ambas as assinaturas incluem licença comercial e suporte a 11 idiomas.',
      },
      {
        id: '2',
        question: 'Posso Imprimir Atividades Educação Infantil em Casa?',
        answer: 'Sim, todas as atividades educação infantil podem ser impressas em impressoras domésticas comuns. A qualidade 300 DPI garante resultados profissionais em qualquer impressora. Impressoras jato de tinta ou laser funcionam igualmente bem. Use papel sulfite comum para economia. Para atividades educação infantil coloridas, impressoras coloridas são recomendadas. A opção de escala de cinza permite imprimir em preto e branco. Isso economiza tinta significativamente para uso diário.',
      },
      {
        id: '3',
        question: 'Preciso de Habilidades de Design para Atividades de Matemática?',
        answer: 'Não precisa de nenhuma habilidade de design para criar atividades de matemática. O gerador automatiza todo o processo de criação. Selecione imagens, clique em criar, e sua atividade está pronta. A interface é intuitiva para qualquer usuário. Mesmo professores sem experiência em computadores criam atividades de matemática profissionais. Os temas e layouts são pré-configurados para resultados garantidos.',
      },
      {
        id: '4',
        question: 'Posso Usar Coordenação Motora na Sala de Aula?',
        answer: 'Sua assinatura Acesso Completo inclui uso ilimitado em sala de aula. Atividades de coordenação motora podem ser impressas para todos os alunos. Não há limite de cópias ou distribuição para fins educacionais. Use as atividades em quantas turmas precisar. Cada atividade de coordenação motora pode ser reimpressa indefinidamente. Faça cópias para alunos, para a biblioteca de classe, ou para tarefas de casa.',
      },
      {
        id: '5',
        question: 'Quais Idiomas Estão Disponíveis para Desenhos para Colorir?',
        answer: 'Os desenhos para colorir e atividades de busca estão disponíveis em 11 idiomas. Português brasileiro é totalmente suportado como idioma nativo. Inglês, alemão, francês, espanhol e italiano estão incluídos. Holandês, sueco, dinamarquês, norueguês e finlandês completam a lista. Os nomes das imagens nos desenhos para colorir aparecem no idioma selecionado. Professores de línguas estrangeiras usam para ensinar vocabulário visual.',
      },
      {
        id: '6',
        question: 'Posso Vender Atividades Vogais e Alfabeto que Eu Criar?',
        answer: 'Sim, sua assinatura Acesso Completo inclui licença comercial completa para impressão sob demanda. Atividades vogais e alfabeto podem ser vendidas em qualquer plataforma. Teachers Pay Teachers, Etsy e Amazon KDP são opções populares. Não há taxas extras ou royalties a pagar. A licença comercial para atividades alfabeto está incluída no preço da assinatura. Você mantém 100% dos lucros das vendas.',
      },
      {
        id: '7',
        question: 'Como Personalizar Letra Cursiva para Meus Alunos?',
        answer: 'A personalização de atividades com letra cursiva acontece em múltiplas etapas. Primeiro, selecione imagens relevantes para sua turma. Segundo, adicione texto personalizado usando a ferramenta de texto. Terceiro, edite no canvas para ajustes finais. Para atividades de letra cursiva específicas, use o campo de texto para instruções. Escolha entre 7 fontes adequadas para crianças. Ajuste tamanho e cor conforme necessidade.',
      },
      {
        id: '8',
        question: 'Qual Faixa Etária Funciona Melhor com Pontilhado?',
        answer: 'Atividades com pontilhado funcionam melhor para crianças de 3 a 8 anos. A pré-escola e educação infantil são faixas ideais. O 1º e 2º ano do ensino fundamental também se beneficiam. Ajuste a complexidade conforme a idade. Para crianças menores, use menos elementos e objetos maiores no pontilhado. Para crianças mais velhas, aumente a quantidade de distratores.',
      },
      {
        id: '9',
        question: 'Posso Fazer Upload de Minhas Imagens para Atividades 1º Ano?',
        answer: 'Sim, o upload de imagens personalizadas está disponível para atividades 1º ano. O sistema aceita arquivos JPEG, PNG e GIF. Faça upload de múltiplos arquivos simultaneamente. Combine suas imagens com a biblioteca de 3000+ imagens. Use fotos de projetos escolares em atividades 1º ano personalizadas. Inclua imagens de mascotes ou personagens da escola.',
      },
      {
        id: '10',
        question: 'Quanto Tempo para Criar Atividades 2º Ano?',
        answer: 'Atividades 2º ano ficam prontas em menos de 3 minutos. O processo é rápido do início ao download. Selecione o modo de atividade em segundos. Escolha imagens da biblioteca ou por tema automaticamente. A geração de atividades 2º ano é instantânea após clicar em criar. Edições no canvas adicionam alguns minutos se desejado. Comparado a 30-60 minutos de criação manual, a economia é enorme.',
      },
      {
        id: '11',
        question: 'Atividades de Tabuada Incluem Gabarito de Respostas?',
        answer: 'Sim, todas as atividades incluindo tabuada visual têm gabarito automático. Após criar a atividade principal, gere o gabarito com um clique. O sistema marca automaticamente a localização dos objetos. Para tabuada no modo "Qual é o Diferente", destaca as imagens ímpares. O gabarito de atividades tabuada pode ser baixado separadamente. Professores usam para correção rápida e precisa.',
      },
      {
        id: '12',
        question: 'Posso Cancelar Minha Assinatura a Qualquer Momento?',
        answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas. Continue usando o gerador até o fim do período já pago integralmente. Suas atividades de encontrar objetos baixadas permanecem suas para sempre. Crie atividades enquanto sua assinatura estiver ativa. Reative quando quiser sem perder configurações ou preferências salvas.',
      },
    ],
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
      'Todos os 33 geradores',
      '11 idiomas suportados',
      '3000+ imagens temáticas',
      'Qualidade de impressão 300 DPI',
    ],
    ctaText: 'Comece Agora',
    guaranteeText: 'Garantia de reembolso de 30 dias',
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Combine com Outros Geradores de Atividades',
    sectionDescription: 'Crie pacotes de aprendizagem completos combinando encontrar objetos com estes geradores complementares.',
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
        slug: 'encontre-conte-fichas',
        name: 'Encontre e Conte',
        category: 'Matemática',
        icon: '🔢',
        description: 'Combine busca visual com atividades de matemática para aprendizado integrado de contagem.',
      },
      {
        id: '2',
        slug: 'desenhos-colorir-fichas',
        name: 'Desenhos para Colorir',
        category: 'Criativo',
        icon: '🎨',
        description: 'Adicione desenhos para colorir às suas fichas de busca visual para atividades mais completas.',
      },
      {
        id: '3',
        slug: 'tracar-linhas-fichas',
        name: 'Grafomotricidade',
        category: 'Coordenação',
        icon: '✍️',
        description: 'Desenvolva coordenação motora combinando encontrar objetos com exercícios de traçado de linhas.',
      },
      {
        id: '4',
        slug: 'ligar-fichas',
        name: 'Pareamento',
        category: 'Lógica',
        icon: '🔗',
        description: 'Combine busca de objetos com pareamento para habilidades visuais e raciocínio lógico completos.',
      },
    ],
  },
};

export default findObjectsPtContent;
