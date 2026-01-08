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
    previewImageSrc: '/samples/english/writing/writing.jpeg',
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
    items: [
      {
        id: '1',
        worksheetSrc: '/samples/english/writing/writing.jpeg',
        answerKeySrc: '',
        altText: 'Atividade de caligrafia com letra inicial e palavra para educação infantil',
        pdfDownloadUrl: '/samples/english/writing/writing.pdf',
      },
      {
        id: '2',
        worksheetSrc: '/samples/english/writing/writing custom.jpeg',
        answerKeySrc: '',
        altText: 'Atividade de caligrafia com texto personalizado para ensino fundamental',
        pdfDownloadUrl: '/samples/english/writing/writing custom.pdf',
      },
      {
        id: '3',
        worksheetSrc: '/samples/english/writing/writing beginning letter.jpeg',
        answerKeySrc: '',
        altText: 'Atividade de caligrafia com letra inicial e setas direcionais',
        pdfDownloadUrl: '/samples/english/writing/writing beginning letter.pdf',
      },
    ],
  },

  // Features Grid - FULL text from writing.md feature sections
  features: {
    sectionTitle: 'Recursos do Gerador de Atividades de Caligrafia',
    sectionDescription: 'Nosso gerador de atividades de caligrafia oferece recursos completos para professores. Cada função foi pensada para economizar tempo e garantir qualidade. Você controla todos os aspectos das suas atividades para imprimir. Veja abaixo os principais recursos disponíveis.',
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
        description: `A criação de atividades de alfabetização nunca foi tão simples. Primeiro, escolha o tipo de conteúdo que deseja. Segundo, selecione o estilo de fonte preferido. Terceiro, clique em gerar e sua ficha aparece instantaneamente.

O processo leva menos de um minuto do início ao fim. Você não precisa de habilidades de design gráfico. Não precisa de programas complicados como Photoshop. O gerador de pontilhado faz todo o trabalho pesado por você. Basta escolher as opções e baixar o resultado.

Para atividades educação infantil, selecione o modo "vazio" com formas básicas. Para atividades 1º ano, escolha letras ou palavras completas. O sistema adapta automaticamente o tamanho e espaçamento. Tudo fica proporcional e profissional.`,
        highlighted: false,
      },
      {
        id: '2',
        icon: '✏️',
        title: 'Atividades Totalmente Editáveis',
        description: `Cada elemento das suas atividades de coordenação motora pode ser editado. Arraste imagens para qualquer posição na página. Redimensione textos com um simples movimento do mouse. Gire elementos para criar layouts únicos e interessantes.

O sistema de edição funciona como um canvas profissional. Você vê exatamente como a ficha vai ficar quando impressa. Todas as mudanças aparecem em tempo real na tela. Não há surpresas desagradáveis na hora de imprimir.

As linhas de escrita também são ajustáveis. Configure a altura das linhas conforme a idade dos alunos. Adicione ou remova linhas guia conforme necessário. Cada atividade para imprimir fica perfeita para seu público específico.`,
        highlighted: false,
      },
      {
        id: '3',
        icon: '🔤',
        title: 'Cinco Estilos de Fonte Diferentes',
        description: `O gerador oferece cinco estilos de fonte para diferentes etapas do desenvolvimento da escrita. A fonte "Bastão Regular" mostra letras sólidas para traçar por cima. A fonte "Bastão com Setas" adiciona indicadores direcionais.

A fonte "Pontilhado" apresenta letras em linhas tracejadas. Os alunos conectam os pontos para formar a letra. A fonte "Pontilhado com Setas" combina traços e direção. A fonte "Cursiva" usa letra manuscrita conectada para alunos mais avançados.

Escolha também o modo de prática: Traçar, Esmaecimento ou Cópia Guiada. No modo Traçar, as letras aparecem em opacidade total. No Esmaecimento, ficam parcialmente visíveis. Na Cópia Guiada, só a primeira letra está completa.`,
        highlighted: true,
      },
      {
        id: '4',
        icon: '🌍',
        title: 'Atividades em 11 Idiomas',
        description: `Professores bilíngues valorizam nosso suporte a 11 idiomas. A interface está disponível em português, inglês, alemão, francês, espanhol, italiano, holandês, dinamarquês, sueco, norueguês e finlandês. Cada botão e menu aparece traduzido corretamente.

Para atividades de alfabetização com vocabulário em outro idioma, isso é essencial. Os nomes dos arquivos de imagem geram texto automaticamente no idioma selecionado. Crie fichas de coordenação motora bilíngues sem esforço extra.

Escolas internacionais usam esse recurso diariamente. Programas de imersão linguística também se beneficiam. Suas atividades educação infantil podem incluir palavras em qualquer um dos 11 idiomas suportados.`,
        highlighted: false,
      },
      {
        id: '5',
        icon: '📤',
        title: 'Upload de Imagens Próprias',
        description: `O upload de imagens personalizadas transforma suas atividades vogais. Envie fotos dos próprios alunos para fichas de nome. Carregue imagens específicas do seu projeto pedagógico. Combine fotos pessoais com nossa biblioteca de 3000 imagens.

O sistema aceita múltiplos arquivos de uma vez. Formatos JPEG, PNG e GIF são suportados. Suas imagens aparecem em uma galeria organizada. Basta clicar para adicionar qualquer imagem à ficha.

Imagine atividades alfabeto com fotos de objetos da sala de aula. Ou fichas de letra cursiva com imagens do mascote da escola. A personalização não tem limites. Cada atividade para imprimir fica única e especial.`,
        highlighted: false,
      },
      {
        id: '6',
        icon: '💰',
        title: 'Licença Comercial POD Incluída',
        description: `Sua assinatura Acesso Completo inclui licença comercial completa. Venda suas atividades 1º ano no Teachers Pay Teachers. Comercialize fichas de atividades 2º ano na Hotmart. Crie produtos para Amazon KDP sem pagar royalties adicionais.

A qualidade de 300 DPI garante impressões profissionais. Nenhum marca d'água aparece nos downloads. Você mantém todos os direitos sobre suas criações. A licença cobre uso comercial print-on-demand sem restrições.

Professores empreendedores faturam entre R$1.000 e R$10.000 por mês. Suas atividades para imprimir podem se tornar uma fonte de renda. O investimento de R$99/mês se paga rapidamente com as primeiras vendas.`,
        highlighted: true,
      },
      {
        id: '7',
        icon: '🎨',
        title: 'Biblioteca com 3000+ Imagens',
        description: `Nossa biblioteca contém mais de 3000 imagens infantis. Todas organizadas por temas como animais, frutas, transportes e profissões. A busca por palavra-chave encontra exatamente o que você precisa. Cada imagem é adequada para crianças.

Para atividades educação infantil, escolha temas coloridos e atraentes. Combine imagens com as linhas de escrita automaticamente. Crie fichas de pontilhado com ilustrações que motivam os pequenos. A biblioteca está sempre crescendo com novos conteúdos.

Bordas decorativas também estão incluídas. Fundos temáticos para datas comemorativas. Elementos visuais para deixar suas atividades alfabeto mais bonitas. Tudo incluído na assinatura sem custos extras por imagem.`,
        highlighted: false,
      },
      {
        id: '8',
        icon: '🖨️',
        title: 'Qualidade Profissional 300 DPI',
        description: `A resolução de 300 DPI garante nitidez máxima. Cada linha de pontilhado aparece perfeitamente definida. As setas direcionais ficam claras e fáceis de seguir. Nenhum detalhe se perde na impressão.

Suas atividades de letra cursiva podem ser baixadas em PDF ou JPEG. O formato PDF mantém vetores para qualidade superior. A opção escala de cinza economiza tinta colorida. Ambos os formatos funcionam em qualquer impressora.

A qualidade é idêntica às atividades para imprimir vendidas em grandes editoras. Seus alunos recebem material de primeira linha. Sua reputação profissional se fortalece. E você economiza horas de trabalho manual toda semana.`,
        highlighted: false,
      },
    ],
  },

  // How-To Guide - FULL text from writing.md step sections
  howTo: {
    sectionTitle: 'Como Criar Atividades de Caligrafia em 5 Passos',
    sectionDescription: 'Criar atividades de alfabetização profissionais leva menos de 3 minutos. Este guia mostra cada etapa do processo. Você aprenderá a usar todos os recursos do gerador. Suas fichas de letra cursiva ficarão perfeitas desde a primeira tentativa.',
    ctaText: 'Comece Agora',
    badgeText: 'Como Funciona',
    stepLabel: 'Passo',
    completionTitle: 'Pronto!',
    completionSubtitle: 'Sua atividade está pronta',
    readyTime: 'Pronto em menos de 3 minutos',
    noSkillsNeeded: 'Sem habilidades de design necessárias',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Escolha o Conteúdo das Atividades',
        description: `O primeiro passo é decidir o que sua atividade para imprimir vai conter. Você tem quatro opções principais de conteúdo. Cada opção atende a um objetivo pedagógico diferente. Escolha conforme o nível dos seus alunos.

A opção "Vazio" cria linhas de escrita sem letras. Perfeita para atividades de coordenação motora livre. Os alunos praticam traços básicos como linhas e círculos. Ideal para atividades educação infantil na fase pré-escrita.

A opção "Letra Inicial" repete uma única letra na linha. Ótima para atividades vogais focadas em uma letra por vez. A opção "Nome do Arquivo" usa o nome da imagem selecionada. A opção "Texto Personalizado" permite digitar qualquer conteúdo.`,
      },
      {
        id: '2',
        number: 2,
        title: 'Configure o Estilo de Pontilhado',
        description: `Após escolher o conteúdo, configure o estilo visual. O gerador oferece cinco estilos de fonte diferentes. Cada estilo desenvolve aspectos específicos da coordenação motora. Selecione conforme a etapa de aprendizado.

A fonte "Bastão Regular" mostra letras sólidas para traçar por cima. Ideal para primeiras atividades de pontilhado com modelo claro. A fonte "Bastão com Setas" adiciona indicadores direcionais. As setas mostram exatamente por onde começar cada traço.

A fonte "Pontilhado" apresenta letras em linhas tracejadas. A fonte "Pontilhado com Setas" combina traços e direção. A fonte "Cursiva" usa letra manuscrita conectada. Atividades 2º ano frequentemente usam este estilo.`,
      },
      {
        id: '3',
        number: 3,
        title: 'Gere Suas Atividades',
        description: `Com conteúdo e estilo definidos, clique no botão "Adicionar Linha". Uma nova linha de escrita aparece instantaneamente na ficha. Você vê exatamente como ficará quando impressa. A visualização é em tempo real.

Para atividades vogais completas, adicione cinco linhas. Configure cada linha com uma vogal diferente. A, E, I, O, U aparecem em sequência lógica. Suas atividades alfabeto ficam organizadas e progressivas.

Adicione quantas linhas precisar na mesma ficha. Combine diferentes tipos de conteúdo se desejar. Uma linha com letra A, outra com palavra "abelha". A flexibilidade é total para suas atividades para imprimir.`,
      },
      {
        id: '4',
        number: 4,
        title: 'Personalize no Canvas',
        description: `Após gerar as linhas, personalize cada detalhe no canvas. Clique em qualquer elemento para selecioná-lo. Arraste para mover, puxe os cantos para redimensionar. A edição é intuitiva como no PowerPoint.

Adicione imagens da biblioteca de 3000 ilustrações. Escolha temas como animais, frutas ou transportes. Para atividades educação infantil, imagens coloridas motivam os pequenos. Posicione as imagens onde preferir na página.

Insira textos personalizados como títulos e instruções. Configure fonte, tamanho e cor do texto. Adicione bordas decorativas para datas comemorativas. Fundos temáticos transformam suas atividades de alfabetização.`,
      },
      {
        id: '5',
        number: 5,
        title: 'Baixe em PDF de Alta Qualidade',
        description: `Sua atividade de letra cursiva está pronta. Clique no botão "Baixar" no canto superior direito. Escolha entre formato PDF ou JPEG. Ambos têm qualidade profissional de 300 DPI.

O formato PDF é ideal para atividades para imprimir em larga escala. Mantém vetores nítidos em qualquer tamanho. Perfeito para enviar para gráficas ou copiadoras. Suas atividades de coordenação motora ficam impecáveis.

A opção "Escala de Cinza" converte cores para preto e branco. Economiza tinta colorida na impressora. Ideal para atividades de pontilhado do dia a dia. Suas atividades alfabeto ficam mais econômicas.`,
      },
    ],
  },

  // Use Cases - FULL text from writing.md user types sections
  useCases: {
    sectionTitle: 'Quem Usa o Gerador de Atividades de Caligrafia',
    sectionDescription: 'Nosso gerador de atividades para imprimir atende diversos públicos. Professores de todas as etapas usam a ferramenta. Pais que educam em casa também se beneficiam. Veja como cada grupo aproveita os recursos de coordenação motora.',
    badgeText: 'Quem Usa',
    readMoreLabel: 'Leia mais',
    showLessLabel: 'Mostrar menos',
    items: [
      {
        id: '1',
        icon: '👶',
        title: 'Professores de Educação Infantil',
        subtitle: 'Atividades Educação Infantil com Coordenação Motora',
        description: `Professores de educação infantil são nossos usuários mais frequentes. Eles precisam de atividades de alfabetização diariamente. O gerador economiza horas de preparação toda semana. As fichas ficam prontas em minutos.

Na pré-escola, o foco está na coordenação motora fina. Os pequenos praticam traços básicos antes das letras. Linhas verticais, horizontais e círculos preparam a mão. Nossas atividades educação infantil atendem exatamente essa necessidade.

Na última etapa antes do 1º ano, as atividades vogais ganham destaque. As crianças começam a reconhecer A, E, I, O, U. Traçar as vogais desenvolve memória muscular. O gerador cria fichas de pontilhado perfeitas para essa fase.`,
      },
      {
        id: '2',
        icon: '🏫',
        title: 'Professores do Ensino Fundamental',
        subtitle: 'Atividades 1º Ano e 2º Ano com Letra Cursiva',
        description: `Professores de 1º ano enfrentam o desafio da alfabetização formal. As atividades 1º ano precisam cobrir todo o alfabeto. Nosso gerador cria fichas para cada letra individualmente. Ou para grupos de letras em sequência progressiva.

O trabalho com atividades alfabeto é intensivo nessa fase. Maiúsculas e minúsculas precisam de prática separada. Letra bastão vem antes da letra cursiva. O gerador permite configurar cada detalhe conforme sua metodologia.

Para atividades 2º ano, a letra cursiva ganha protagonismo. Os alunos já dominam a letra bastão. Agora aprendem a conexão entre letras. Fichas de pontilhado com fonte cursiva são essenciais. Nossa ferramenta oferece exatamente isso.`,
      },
      {
        id: '3',
        icon: '🏠',
        title: 'Pais que Educam em Casa',
        subtitle: 'Atividades para Imprimir Personalizadas para Homeschool',
        description: `O homeschool cresce no Brasil a cada ano. Pais educadores precisam de materiais de qualidade. Nosso gerador oferece atividades de coordenação motora profissionais. Sem depender de editoras ou materiais prontos.

Pais podem criar atividades vogais personalizadas com nomes da família. Fichas com fotos dos avós, pets e lugares favoritos. A aprendizagem se conecta com a vida real. A motivação das crianças aumenta significativamente.

O custo-benefício atrai famílias homeschool. Uma assinatura substitui dezenas de livros de atividades. Atividades para imprimir ilimitadas por um valor fixo mensal. Economia real no orçamento educacional da família.`,
      },
      {
        id: '4',
        icon: '🌎',
        title: 'Professores de Idiomas e ESL',
        subtitle: 'Atividades de Alfabetização Bilíngue em 11 Idiomas',
        description: `Escolas bilíngues valorizam nosso suporte multilíngue. Atividades de alfabetização em inglês e português na mesma aula. O gerador alterna entre idiomas instantaneamente. Fichas bilíngues ficam prontas em segundos.

Professores de ESL criam vocabulário visual com escrita. A imagem da maçã aparece junto com "apple" para traçar. Atividades alfabeto em inglês seguem a mesma qualidade. O aprendizado integra visual, leitura e escrita.

Escolas internacionais usam todos os 11 idiomas disponíveis. Alemão, francês, espanhol, italiano e mais. Atividades para imprimir em qualquer idioma com a mesma facilidade. A qualidade permanece consistente em todas as línguas.`,
      },
      {
        id: '5',
        icon: '🧩',
        title: 'Professores de Educação Especial',
        subtitle: 'Atividades Educação Infantil Adaptadas com Pontilhado',
        description: `Educação especial exige materiais personalizados. Cada aluno tem necessidades únicas de aprendizagem. Nosso gerador permite adaptações ilimitadas. Atividades educação infantil ficam sob medida para cada caso.

Linhas de escrita maiores ajudam alunos com dificuldades motoras. O gerador ajusta a altura das linhas facilmente. Menos letras por linha reduzem sobrecarga cognitiva. Cada atividade de coordenação motora respeita o ritmo individual.

Fichas com reforço visual beneficiam alunos com TEA. Imagens claras e consistentes trazem previsibilidade. Atividades vogais com a mesma estrutura toda semana. A rotina visual facilita o engajamento.`,
      },
      {
        id: '6',
        icon: '💼',
        title: 'Professores Empreendedores',
        subtitle: 'Licença Comercial POD para Venda Online',
        description: `Professores empreendedores transformam conhecimento em renda. Plataformas como Hotmart e Teachers Pay Teachers aceitam materiais digitais. Nossas atividades 1º ano têm qualidade comercial. A licença POD está incluída na assinatura.

Criar produtos para venda é simples com o gerador. Atividades alfabeto completas em pacotes temáticos. Atividades de letra cursiva para séries específicas. Cada produto pode ser vendido repetidamente.

O investimento se paga rapidamente com as primeiras vendas. Uma assinatura Acesso Completo custa $240/ano. Um único pacote de atividades para imprimir pode render R$500 ou mais. O retorno sobre investimento é excelente.`,
      },
    ],
  },

  // Subscription Reasons - FULL text from writing.md subscription section
  pricing: {
    title: 'Acesso Completo',
    price: '$240',
    priceInterval: '/ano',
    benefits: [
      'Ensino multilíngue - Atividades para imprimir em 11 idiomas para escolas bilíngues',
      'Licença comercial POD - Venda atividades educação infantil na Hotmart e Amazon',
      'Economia de tempo - Atividades vogais e alfabeto prontas em 3 minutos',
      'Acesso a todos os 33 geradores da plataforma',
      'Criação ilimitada de atividades de caligrafia',
      'Qualidade 300 DPI para impressão profissional',
    ],
    ctaText: 'Assinar Agora',
    guaranteeText: 'Garantia de 30 dias - devolução total',
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
    items: [
      {
        id: '1',
        question: 'O Gerador de Atividades de Caligrafia É Gratuito?',
        answer: `O gerador de atividades para imprimir requer assinatura Acesso Completo. O custo é $240 por ano ou $25 por mês. Sua assinatura oferece criação ilimitada sem taxas por ficha. Gere quantas atividades de coordenação motora precisar.

O Acesso Completo inclui todos os 33 geradores da plataforma. Além de caligrafia, acesse matemática, caça-palavras e muito mais. Atividades educação infantil ilimitadas em todos os aplicativos. O valor cobre uso completo sem restrições.

A assinatura Pacote Essencial custa $144 por ano e inclui 10 aplicativos populares. O Acesso Completo custa $240 por ano e inclui todos os 33 geradores. Ambas incluem licença comercial, suporte a 11 idiomas e qualidade 300 DPI.`,
      },
      {
        id: '2',
        question: 'Posso Imprimir Atividades de Caligrafia em Casa?',
        answer: `Sim, suas atividades vogais imprimem perfeitamente em qualquer impressora. O formato PDF mantém qualidade em impressoras jato de tinta. Impressoras laser também funcionam sem problemas. A resolução 300 DPI garante nitidez.

Papel sulfite comum A4 funciona bem para uso diário. Para atividades alfabeto especiais, use papel mais grosso. A opção escala de cinza economiza tinta colorida. Suas atividades para imprimir ficam profissionais em casa.`,
      },
      {
        id: '3',
        question: 'Preciso de Habilidades de Design para Criar Atividades?',
        answer: `Não precisa de nenhuma habilidade de design. Nossas atividades 1º ano ficam prontas com poucos cliques. A interface é simples como usar o Word. Qualquer professor consegue criar fichas profissionais.

O sistema faz todo o trabalho técnico automaticamente. Linhas de escrita aparecem perfeitamente espaçadas. Fontes de caligrafia já estão configuradas. Suas atividades de alfabetização parecem feitas por designer.`,
      },
      {
        id: '4',
        question: 'Posso Usar Atividades de Caligrafia na Sala de Aula?',
        answer: `A assinatura Acesso Completo inclui uso ilimitado em sala de aula. Imprima quantas cópias precisar para seus alunos. Atividades educação infantil podem ser distribuídas livremente. Nenhuma restrição de quantidade por turma.

Use as fichas em aulas presenciais ou remotas. Compartilhe versões digitais em plataformas de ensino. Atividades de coordenação motora para toda a escola. A licença educacional está incluída na assinatura.`,
      },
      {
        id: '5',
        question: 'Em Quais Idiomas Posso Criar Atividades?',
        answer: `Atividades de alfabetização estão disponíveis em 11 idiomas. Português, inglês, alemão, francês, espanhol e italiano. Também holandês, dinamarquês, sueco, norueguês e finlandês. A interface e o conteúdo mudam conforme selecionado.

Para fichas bilíngues, alterne entre idiomas facilmente. Atividades vogais em português e inglês na mesma aula. O vocabulário visual adapta automaticamente. Suas atividades para imprimir atendem qualquer contexto linguístico.`,
      },
      {
        id: '6',
        question: 'Posso Vender Atividades que Criar com Este Gerador?',
        answer: `Sim, a assinatura Acesso Completo inclui licença comercial completa. Venda suas atividades 2º ano em qualquer plataforma. Hotmart, Teachers Pay Teachers e Amazon KDP liberados. Nenhuma taxa adicional sobre vendas.

A qualidade 300 DPI atende padrões comerciais. Gráficas profissionais imprimem sem problemas. Atividades de coordenação motora viram produtos lucrativos. A licença POD está totalmente incluída.`,
      },
      {
        id: '7',
        question: 'Como Personalizo Atividades para Meus Alunos?',
        answer: `A personalização de atividades alfabeto é completa. Digite qualquer texto para as linhas de escrita. Nomes dos alunos, vocabulário específico, frases do currículo. Tudo aparece nas fichas instantaneamente.

Escolha entre cinco estilos de fonte diferentes. Configure maiúsculas, minúsculas ou mistas. Selecione modo traçar, esmaecimento ou cópia guiada. Cada atividade para imprimir fica sob medida.

Adicione imagens da biblioteca ou envie fotos próprias. Bordas decorativas para datas comemorativas. Fundos temáticos para projetos especiais. Atividades educação infantil totalmente personalizadas.`,
      },
      {
        id: '8',
        question: 'Quais Faixas Etárias Funcionam com Atividades de Pontilhado?',
        answer: `Atividades de pontilhado atendem desde a creche até o 3º ano. Para os menores (2-3 anos), formas básicas como círculos. Na pré-escola (4-5 anos), atividades vogais simples. No 1º ano (6-7 anos), alfabeto completo.

Atividades 1º ano focam em letra bastão e formação. Atividades 2º ano introduzem letra cursiva conectada. Atividades de coordenação motora se adaptam a cada fase. O gerador oferece opções para todos os níveis.`,
      },
      {
        id: '9',
        question: 'Posso Enviar Minhas Próprias Imagens?',
        answer: `Sim, o upload de imagens personalizadas está disponível. Envie fotos dos alunos para fichas de nome. Carregue imagens do projeto pedagógico atual. Atividades educação infantil ficam únicas e relevantes.

O sistema aceita JPEG, PNG e GIF. Múltiplos arquivos podem ser enviados de uma vez. Combine fotos próprias com nossa biblioteca de 3000 imagens. Atividades para imprimir totalmente personalizadas.`,
      },
      {
        id: '10',
        question: 'Quanto Tempo Leva para Criar Atividades de Caligrafia?',
        answer: `Atividades de alfabetização ficam prontas em menos de 3 minutos. Selecione configurações com poucos cliques. Adicione linhas de escrita instantaneamente. O download acontece em segundos.

Professores experientes criam ainda mais rápido. Com prática, atividades de coordenação motora levam 1-2 minutos. Pacotes completos de atividades vogais em 15 minutos. A economia de tempo é significativa.`,
      },
      {
        id: '11',
        question: 'Quais Estilos de Fonte Estão Disponíveis?',
        answer: `Cinco estilos de fonte atendem atividades 1º ano e outras séries. Letra bastão regular para traçar sobre modelo sólido. Letra bastão com setas mostrando direção dos traços. Letra pontilhada para conectar pontos.

Letra pontilhada com setas combina traços e direção. Letra cursiva para escrita manuscrita conectada. Cada estilo desenvolve aspectos específicos. Suas atividades alfabeto cobrem todas as necessidades.`,
      },
      {
        id: '12',
        question: 'Posso Criar Atividades sobre Temas do Currículo?',
        answer: `Sim, atividades para imprimir se adaptam a qualquer tema. Digite vocabulário específico do seu currículo. Palavras de ciências, estudos sociais ou literatura. Atividades de alfabetização integradas ao conteúdo.

Combine com imagens temáticas da biblioteca. Animais para projeto de zoologia. Frutas para alimentação saudável. Profissões para semana das carreiras. Atividades educação infantil conectadas ao planejamento.`,
      },
    ],
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
      guarantee: 'Garantia de 30 dias',
      securePayment: 'Pagamento seguro',
      cancelAnytime: 'Cancele quando quiser',
    },
    apps: [
      {
        id: '1',
        name: 'Atividades de Matemática',
        description: 'Atividades de matemática complementam perfeitamente a caligrafia. Os alunos praticam escrita de números junto com letras. Fichas integradas desenvolvem múltiplas habilidades simultaneamente.',
        icon: '🔢',
      },
      {
        id: '2',
        name: 'Desenhos para Colorir',
        description: 'Desenhos para colorir motivam crianças pequenas a completar atividades. Adicione uma ilustração para colorir acima das linhas de escrita. A criança colore primeiro e depois pratica letras.',
        icon: '🎨',
      },
      {
        id: '3',
        name: 'Atividades de Adição',
        description: 'Crie fichas onde alunos traçam números de 0 a 9. Combine com linhas para escrever o nome do número por extenso. Atividades de matemática se integram naturalmente ao treino de escrita.',
        icon: '➕',
      },
      {
        id: '4',
        name: 'Trem do Alfabeto',
        description: 'Combine atividades de caligrafia com reconhecimento de letras. O Trem do Alfabeto reforça a sequência alfabética. Perfeito para educação infantil e pré-escola.',
        icon: '🚂',
      },
    ],
  },
};

export default writingPtContent;
